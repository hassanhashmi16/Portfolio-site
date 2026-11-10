# Supabase setup (portfolio admin)

The site works without Supabase — it falls back to the bundled JSON files.
Once the variables below are set, the public pages read from the database and
the private `/admin` area becomes available.

## 1. Create the project

1. Sign in at <https://supabase.com> and create a **free** project.
2. Open **SQL Editor → New query**, paste the contents of [`schema.sql`](./schema.sql), and run it.
   This creates the tables, row-level security, the `media` storage bucket, and
   seeds your current projects/experience.

## 2. Copy the keys (new API keys)

Legacy `anon` / `service_role` keys are deprecated by the end of 2026. In
**Project Settings → API Keys → Publishable and secret API keys**, copy:

- **Project URL**
- **Publishable** key (`sb_publishable_…`) — safe in the browser, RLS applies
- **Secret** key (`sb_secret_…`) — server-only, bypasses RLS

If your project only shows legacy keys, click **Create new API keys**.

## 3. Add environment variables

Create `.env.local` in the project root (next to `package.json`):

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your-key
SUPABASE_SECRET_KEY=sb_secret_your-key

# Admin login (choose your own)
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=a-long-random-string
```

`SUPABASE_SECRET_KEY`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` are
server-only — never expose them to the browser. The legacy
`NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` names are still
read as a fallback during the transition, but prefer the new keys.

## 4. Restart

```
npm run dev
```

The public site now reads published rows from Postgres. `/admin` provides the
private editor.
