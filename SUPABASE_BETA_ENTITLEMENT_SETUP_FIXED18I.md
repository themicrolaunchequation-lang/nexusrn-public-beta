# NexusRN FIXED18I — Supabase Beta Entitlement Setup

This file is deployment guidance only. It does not mutate `data-bank/`.

## Required table

Run in Supabase SQL editor before treating paid access as production-approved:

```sql
create table if not exists public.beta_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  plan text not null default 'beta_3_months',
  active boolean not null default true,
  stripe_customer_id text,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  starts_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '90 days'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint beta_entitlements_identity_check check (user_id is not null or email is not null)
);

create index if not exists beta_entitlements_user_id_idx on public.beta_entitlements(user_id);
create index if not exists beta_entitlements_email_idx on public.beta_entitlements(lower(email));
create index if not exists beta_entitlements_active_expires_idx on public.beta_entitlements(active, expires_at);

alter table public.beta_entitlements enable row level security;

drop policy if exists "Users can read own beta entitlements" on public.beta_entitlements;
create policy "Users can read own beta entitlements"
on public.beta_entitlements
for select
to authenticated
using (
  active = true
  and (expires_at is null or expires_at > now())
  and (
    user_id = auth.uid()
    or lower(email) = lower((auth.jwt() ->> 'email'))
  )
);
```

## Manual beta approval path

For manual onboarding after Stripe confirmation, insert one active row per paid learner:

```sql
insert into public.beta_entitlements (user_id, email, plan, active, expires_at, stripe_checkout_session_id)
values ('USER_UUID_HERE', 'learner@example.com', 'beta_3_months', true, now() + interval '90 days', 'cs_live_or_test_id_here');
```

## Security rule

Do not grant paid access from `user_metadata`. Authenticated users can modify user metadata. FIXED18I only accepts server-controlled `app_metadata` or rows from `public.beta_entitlements`.
