-- Portfolio feedback: visitors can insert a rating and comment, nobody can
-- read them through the public API. Read them in the Supabase dashboard
-- (Table Editor, or SQL: select * from portfolio_feedback order by created_at desc).

create table if not exists public.portfolio_feedback (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  rating      smallint not null check (rating between 1 and 5),
  comment     text check (char_length(comment) <= 1000),
  name        text check (char_length(name) <= 60),
  page        text check (char_length(page) <= 100)
);

alter table public.portfolio_feedback enable row level security;

-- Insert only. With no select/update/delete policy, the publishable key used
-- by the site can add rows but never see, change, or remove them.
drop policy if exists "Visitors can send feedback" on public.portfolio_feedback;
create policy "Visitors can send feedback"
  on public.portfolio_feedback
  for insert
  to anon
  with check (true);

-- Table privileges: anon may insert, nothing else.
revoke all on public.portfolio_feedback from anon, authenticated;
grant insert on public.portfolio_feedback to anon;
