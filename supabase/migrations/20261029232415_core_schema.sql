-- Profiles ---------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'member' check (role in ('member','agent','admin')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Listings ---------------------------------------------------------------
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  category text not null check (category in ('buy','rent','malazi')),
  title text not null check (char_length(title) between 3 and 90),
  description text check (char_length(description) <= 2000),
  location text not null,
  property_type text not null default 'House' check (property_type in ('House','Apartment','Villa','Land','Room')),
  beds int not null default 0 check (beds between 0 and 50),
  baths int not null default 0 check (baths between 0 and 50),
  size_m2 int check (size_m2 between 1 and 100000),
  max_guests int check (max_guests between 1 and 100),
  price bigint not null check (price > 0),
  status text not null default 'pending' check (status in ('pending','published','rejected','archived')),
  featured_until timestamptz,
  cover_url text,
  sort_order int not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index listings_public_idx on public.listings (status, category, location);
create index listings_owner_idx on public.listings (owner_id);

-- owners cannot publish or feature their own listings; only admins can
create or replace function public.protect_listing_fields() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then
    if tg_op = 'INSERT' then
      new.status := 'pending'; new.featured_until := null; new.sort_order := 100; new.owner_id := auth.uid();
    else
      new.status := case when old.status = 'published' then 'pending' else old.status end; -- edits go back to review
      new.featured_until := old.featured_until; new.sort_order := old.sort_order; new.owner_id := old.owner_id;
    end if;
  end if;
  new.updated_at := now();
  return new;
end; $$;
create trigger listings_protect before insert or update on public.listings for each row execute function public.protect_listing_fields();

-- Media ------------------------------------------------------------------
create table public.listing_media (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  kind text not null check (kind in ('photo','video')),
  url text not null,
  storage_path text,
  position int not null default 0,
  created_at timestamptz not null default now()
);
create index listing_media_listing_idx on public.listing_media (listing_id, position);

-- Favourites, enquiries, agents, featured requests ----------------------
create table public.favourites (
  user_id uuid not null references auth.users(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  name text not null check (char_length(name) between 2 and 80),
  phone text check (char_length(phone) <= 30),
  email text check (char_length(email) <= 120),
  message text check (char_length(message) <= 1000),
  channel text not null default 'form' check (channel in ('form','whatsapp')),
  created_at timestamptz not null default now()
);
create index enquiries_listing_idx on public.enquiries (listing_id);

create table public.agents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  agency text,
  area text,
  specialties text[] not null default '{}',
  photo_url text,
  listings_count int not null default 0,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.featured_requests (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('7d','30d')),
  amount int not null check (amount > 0),
  provider text not null check (provider in ('mpesa','tigopesa','airtelmoney','halopesa')),
  phone text not null check (char_length(phone) between 9 and 15),
  status text not null default 'awaiting_payment' check (status in ('awaiting_payment','paid','cancelled')),
  created_at timestamptz not null default now()
);
create index featured_requests_listing_idx on public.featured_requests (listing_id);
create index featured_requests_user_idx on public.featured_requests (user_id);
create index favourites_listing_idx on public.favourites (listing_id);
create index enquiries_user_idx on public.enquiries (user_id);

-- Row level security -----------------------------------------------------
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_media enable row level security;
alter table public.favourites enable row level security;
alter table public.enquiries enable row level security;
alter table public.agents enable row level security;
alter table public.featured_requests enable row level security;

create policy "own profile read" on public.profiles for select to authenticated using (id = (select auth.uid()) or public.is_admin());
create policy "own profile update" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()) and role = (select p.role from public.profiles p where p.id = (select auth.uid())));

create policy "published listings are public" on public.listings for select to anon, authenticated using (status = 'published' or owner_id = (select auth.uid()) or public.is_admin());
create policy "members create listings" on public.listings for insert to authenticated with check (owner_id = (select auth.uid()));
create policy "owners edit listings" on public.listings for update to authenticated using (owner_id = (select auth.uid()) or public.is_admin()) with check (owner_id = (select auth.uid()) or public.is_admin());
create policy "owners delete listings" on public.listings for delete to authenticated using (owner_id = (select auth.uid()) or public.is_admin());

create policy "media visible with listing" on public.listing_media for select to anon, authenticated using (exists (select 1 from public.listings l where l.id = listing_id and (l.status = 'published' or l.owner_id = (select auth.uid()) or public.is_admin())));
create policy "owners add media" on public.listing_media for insert to authenticated with check (exists (select 1 from public.listings l where l.id = listing_id and l.owner_id = (select auth.uid())));
create policy "owners remove media" on public.listing_media for delete to authenticated using (exists (select 1 from public.listings l where l.id = listing_id and (l.owner_id = (select auth.uid()) or public.is_admin())));

create policy "own favourites" on public.favourites for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

create policy "anyone can enquire on published listings" on public.enquiries for insert to anon, authenticated
  with check ((user_id is null or user_id = (select auth.uid())) and exists (select 1 from public.listings l where l.id = listing_id and l.status = 'published'));
create policy "listing owners and enquirers read enquiries" on public.enquiries for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin() or exists (select 1 from public.listings l where l.id = listing_id and l.owner_id = (select auth.uid())));

create policy "agents are public" on public.agents for select to anon, authenticated using (true);

create policy "owners request featuring" on public.featured_requests for insert to authenticated
  with check (user_id = (select auth.uid()) and status = 'awaiting_payment' and exists (select 1 from public.listings l where l.id = listing_id and l.owner_id = (select auth.uid())));
create policy "own featured requests" on public.featured_requests for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());

-- Storage: public bucket, each member writes only inside their own folder --
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('listing-media', 'listing-media', true, 52428800, array['image/jpeg','image/png','image/webp','video/mp4','video/quicktime','video/webm'])
on conflict (id) do nothing;

create policy "members upload to own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'listing-media' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "members delete own files" on storage.objects for delete to authenticated
  using (bucket_id = 'listing-media' and (storage.foldername(name))[1] = (select auth.uid())::text);
