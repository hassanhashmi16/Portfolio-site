-- Portfolio content schema for Supabase (Postgres)
-- Run this once in the Supabase dashboard → SQL Editor → New query.

create extension if not exists pgcrypto;

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  type        text,
  lede        text,
  summary     text,
  highlights  jsonb not null default '[]'::jsonb,
  tags        jsonb not null default '[]'::jsonb,
  status      text,
  href        text,
  live        text,
  diagram     text,
  media       jsonb not null default '[]'::jsonb,
  published   boolean not null default false,
  position    int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
drop trigger if exists trg_projects_updated on public.projects;
create trigger trg_projects_updated before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- experience
-- ---------------------------------------------------------------------------
create table if not exists public.experience (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  year         text,
  date         text,
  role         text not null,
  organization text,
  description  text,
  type         text,
  published    boolean not null default true,
  position     int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
drop trigger if exists trg_experience_updated on public.experience;
create trigger trg_experience_updated before update on public.experience
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- writing (articles / milestones / build notes)
-- ---------------------------------------------------------------------------
create table if not exists public.writing (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  kind         text default 'build note',
  excerpt      text,
  body         text,
  cover_url    text,
  published    boolean not null default false,
  position     int not null default 0,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
drop trigger if exists trg_writing_updated on public.writing;
create trigger trg_writing_updated before update on public.writing
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- profile (single row)
-- ---------------------------------------------------------------------------
create table if not exists public.profile (
  id           int primary key default 1 check (id = 1),
  name         text,
  role         text,
  bio          text,
  email        text,
  availability text,
  socials      jsonb not null default '[]'::jsonb,
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security: public may read published content only.
-- The server uses the service_role key, which bypasses RLS, for admin writes.
-- ---------------------------------------------------------------------------
alter table public.projects   enable row level security;
alter table public.experience enable row level security;
alter table public.writing    enable row level security;
alter table public.profile    enable row level security;

drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects" on public.projects
  for select using (published = true);

drop policy if exists "public read published experience" on public.experience;
create policy "public read published experience" on public.experience
  for select using (published = true);

drop policy if exists "public read published writing" on public.writing;
create policy "public read published writing" on public.writing
  for select using (published = true);

drop policy if exists "public read profile" on public.profile;
create policy "public read profile" on public.profile
  for select using (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for media (public read, service_role write)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Seed with the current portfolio content (safe to re-run)
-- ---------------------------------------------------------------------------
insert into public.projects (slug, title, type, lede, summary, highlights, tags, status, href, live, diagram, media, published, position)
values
('whythediff', 'WhyTheDiff', 'AI product · evidence-led investigation', 'Follow public code changes back to why they happened.',
 'An application that follows public GitHub code, history, and discussions to produce cited explanations. Findings distinguish documented reasons, inferences, and unresolved questions.',
 '["Cited reports that separate documented, inferred, and unresolved findings","Bounded job queue, checkpoint recovery, and owner-scoped history","Quote and grounding checks before a claim survives"]'::jsonb,
 '["AI agents","Retrieval","Evidence"]'::jsonb, 'Local app · source available', 'https://github.com/hassanhashmi16/whythediff', null, 'request-flow',
 '[{"kind":"diagram","type":"request-flow"},{"kind":"stat","value":"4","label":"Prepared Flask cases","note":"documented · inferred · unresolved"}]'::jsonb,
 true, 1),
('eight-thousanders-rag', 'Eight-Thousanders RAG Assistant', 'Retrieval · evaluation', 'Answers over a focused corpus, with the retrieval exposed.',
 'A focused retrieval assistant for a mountain-climbing corpus, pairing dense and keyword search with reciprocal rank fusion and reranking, plus a 20-question evaluation harness.',
 '["Dense and keyword retrieval fused with reciprocal rank fusion","Cross-encoder reranking to narrow evidence before generation","Labelled evaluation comparing retrieval configurations"]'::jsonb,
 '["RAG","Reranking","Evaluation"]'::jsonb, 'Local app · source available', 'https://github.com/hassanhashmi16/rag-assistant', null, 'retrieval',
 '[{"kind":"diagram","type":"retrieval"},{"kind":"stat","value":"20","label":"Labelled evaluation questions","note":"recall@5 · MRR · nDCG"}]'::jsonb,
 true, 2),
('research-briefing-agent', 'Research Briefing Agent', 'Agent systems · CLI', 'Web research that survives being interrupted.',
 'A tool-based research workflow with checkpoints, session memory, execution budgets, and recovery when work is interrupted.',
 '["Validated tool dispatch through a typed registry","SQLite checkpoints that resume a run after a forced stop","Step and token budgets with no-progress stopping"]'::jsonb,
 '["Agents","Tool use","Reliability"]'::jsonb, 'Local CLI · source available', 'https://github.com/hassanhashmi16/research-agent', null, 'agent-loop',
 '[{"kind":"diagram","type":"agent-loop"},{"kind":"stat","value":"2","label":"Documented demos","note":"forced-stop resume · cross-run memory"}]'::jsonb,
 true, 3)
on conflict (slug) do nothing;

insert into public.experience (slug, year, date, role, organization, description, type, published, position)
values
('rahnor-labs', '2026', 'MAY — JUL 2026', 'Software Engineering Intern', 'Rahnor Labs · Remote',
 'Contributed to AI-powered CRM systems for businesses and SaaS products alongside senior engineers.', 'Internship', true, 1),
('independent-work', '2025', '2025 — PRESENT', 'Independent developer', 'Freelance · Lahore',
 'Building web products and exploring applied AI through independent projects and client work.', 'Independent', true, 2)
on conflict (slug) do nothing;
