-- Foodeez step 2: accounts and chef applications.
--
-- How to apply: Supabase dashboard → SQL Editor → paste this whole file → Run.
--
-- Model:
--   * Everyone signs up as a regular account (a "foodie"). A row in `profiles` is
--     created automatically for each new sign-up.
--   * Anyone signed in can apply to become a chef. Applications start as `pending`.
--   * Only Foodeez admins approve or reject (in the dashboard, or later an admin
--     screen). Approval is what turns on "chef mode" in the apps.
--   * Row Level Security means each person can only see and edit their own rows,
--     and nobody can approve themselves.

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text not null default '' check (char_length(full_name) <= 120),
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Read own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "Update own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- People may only change their name. is_admin can only be set in the dashboard.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;

-- Create a profile automatically when someone signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(left(new.raw_user_meta_data ->> 'full_name', 120), ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Chef applications
-- ---------------------------------------------------------------------------
create type public.chef_application_status as enum ('pending', 'approved', 'rejected');

create table public.chef_applications (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null unique references auth.users (id) on delete cascade,
  display_name      text not null check (char_length(display_name) between 2 and 80),
  phone             text not null check (char_length(phone) between 7 and 30),
  city              text not null check (char_length(city) between 2 and 80),
  state             text not null check (state in ('DC', 'MD', 'VA')),
  cuisines          text not null check (char_length(cuisines) between 2 and 200),
  experience_years  smallint not null check (experience_years between 0 and 80),
  bio               text not null check (char_length(bio) between 40 and 2000),
  food_safety_cert  boolean not null default false,
  links             text not null default '' check (char_length(links) <= 500),
  status            public.chef_application_status not null default 'pending',
  reviewer_notes    text not null default '',
  reviewed_at       timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table public.chef_applications enable row level security;

create policy "Read own application"
  on public.chef_applications for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Submit own application"
  on public.chef_applications for insert to authenticated
  with check ((select auth.uid()) = user_id and status = 'pending');

-- Applicants can edit their answers only while the application is still pending.
create policy "Edit own pending application"
  on public.chef_applications for update to authenticated
  using ((select auth.uid()) = user_id and status = 'pending')
  with check ((select auth.uid()) = user_id and status = 'pending');

-- Column-level rights: applicants can never touch status, reviewer notes or review dates.
revoke all on public.chef_applications from anon, authenticated;
grant select on public.chef_applications to authenticated;
grant insert (user_id, display_name, phone, city, state, cuisines, experience_years, bio, food_safety_cert, links)
  on public.chef_applications to authenticated;
grant update (display_name, phone, city, state, cuisines, experience_years, bio, food_safety_cert, links)
  on public.chef_applications to authenticated;

-- ---------------------------------------------------------------------------
-- Shared helpers
-- ---------------------------------------------------------------------------
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Stamp the review time whenever an admin changes an application's status.
create function public.set_reviewed_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status is distinct from old.status then
    new.reviewed_at = now();
  end if;
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger chef_applications_updated_at
  before update on public.chef_applications
  for each row execute function public.set_updated_at();

create trigger chef_applications_reviewed_at
  before update on public.chef_applications
  for each row execute function public.set_reviewed_at();

-- True when the signed-in person is an approved chef. Used by future tables
-- (experiences, menus) so only approved chefs can publish.
create function public.is_approved_chef()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.chef_applications
    where user_id = (select auth.uid()) and status = 'approved'
  );
$$;

grant execute on function public.is_approved_chef() to authenticated;
