create schema if not exists private;
grant usage on schema private to anon, authenticated;
alter function public.is_admin() set schema private;
grant execute on function private.is_admin() to anon, authenticated;
create or replace function public.protect_listing_fields() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if not private.is_admin() then
    if tg_op = 'INSERT' then
      new.status := 'pending'; new.featured_until := null; new.sort_order := 100; new.owner_id := auth.uid();
    else
      new.status := case when old.status = 'published' then 'pending' else old.status end;
      new.featured_until := old.featured_until; new.sort_order := old.sort_order; new.owner_id := old.owner_id;
    end if;
  end if;
  new.updated_at := now();
  return new;
end; $$;
revoke execute on function public.protect_listing_fields() from anon, authenticated, public;
