# Buy | Rent | Malazi

Property listing platform for Tanzania, starting in Dar es Salaam: homes to **buy**, properties to **rent**, and **Malazi** (short-stay accommodation). English and Kiswahili.

Buy Rent Malazi is a listing platform, not an estate agency.

## Repository layout

| Folder | What it is |
|---|---|
| `site/` | The live website that Vercel serves (static: `index.html`, `img/`, `vercel.json`, `robots.txt`). |
| `src/` | Build sources: page scripts (`site.js`, `pages.js`, `i18n.js`, `live.js`), styles, the logo assets and the original design file. |
| `supabase/migrations/` | Database schema, security rules and sample data for the Supabase backend. |
| `preview/` | Local single-file preview build (not committed). |

## Build

```bash
python3 src/build_site.py
```

This writes `site/` (live, connected to Supabase, real page addresses) and `preview/index.html` (self-contained preview with embedded images).

## Pages

`/` · `/buy` · `/rent` · `/malazi` · `/agents` · `/about` · `/about/faq` · `/account`

All routes are served by `site/index.html` (see `site/vercel.json`). Search engines are blocked (`noindex` and `robots.txt`) until launch.

## Backend (Supabase)

- Project ref: `sjudccfjcvqwehuwxqpe` (eu-central-1)
- Tables: `profiles`, `listings`, `listing_media`, `favourites`, `enquiries`, `agents`, `featured_requests`. Row-level security is on for all of them.
- New listings are always saved as `pending`, and only admins can publish or feature them (enforced by a database trigger).
- Storage bucket `listing-media`: public read; members upload only into their own folder; 50 MB per file on the free tier.
- The site uses the **publishable** key only. Never put the service-role key in this repo.

### Make an account an admin

```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

### Approve a listing

```sql
update public.listings set status = 'published' where id = '…';
```

## Before launch

- Supabase → Authentication → URL Configuration: set **Site URL** to the live domain.
- Set up a custom SMTP sender for auth emails (the built-in sender is rate-limited).
- Have the listing terms reviewed by a Tanzanian lawyer, and the Kiswahili wording reviewed by a native speaker.
- Connect a mobile-money provider (Selcom, AzamPay or DPO) to take payments for featured listings.
- Remove `noindex` from `site/index.html` and `site/vercel.json`, and allow crawling in `robots.txt`.
