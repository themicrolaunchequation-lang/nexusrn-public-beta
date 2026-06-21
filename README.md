# NexusRN Public Beta

GitHub/Vercel-ready static package for the NexusRN public demo, Supabase email/password sign-in/sign-up shell, beta access pages, Stripe checkout links, and protected local access-test workflow.

## Current build

`CLEAN_APP_V12_REMOVE14_STRIP_NR_WORLDCLASS_READY_FIXED13_GITHUB_READY`

This repository is intended to be deployed as a static site from the repository root.

## Important safety status

This package is ready for local/Vercel browser retest. It is **not** final paid production closure until Stripe Dashboard settings, Supabase redirect URLs, and webhook-based entitlement fulfillment are configured and tested.

Public Demo remains open without sign-in. Paid beta and the $1 access-test workflow require Supabase sign-in.

## Project root structure

The repository root should contain:

```text
index.html
auth-sign-in.html
auth-sign-up.html
auth-callback.html
account.html
beta-access.html
beta-test-access.html
beta-success.html
beta-cancelled.html
public-demo/
workstation-pro/
data-bank/
assets/
vercel.json
.gitignore
.env.example
```

## Local run

From the repository root:

```bash
python -m http.server 9009
```

Open:

```text
http://127.0.0.1:9009/index.html
```

Useful routes:

```text
http://127.0.0.1:9009/public-demo/index.html
http://127.0.0.1:9009/auth-sign-up.html
http://127.0.0.1:9009/auth-sign-in.html
http://127.0.0.1:9009/beta-access.html
http://127.0.0.1:9009/beta-test-access.html
```

## Supabase configuration

Supabase project:

```text
NEXT_PUBLIC_SUPABASE_URL=https://yzlrekjjvenxzpenyily.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_Adrh6-0rsw_OSOfNhN9dgg_qzf7ZSCx
```

Add these Supabase Auth redirect URLs:

```text
http://127.0.0.1:9009/auth-callback.html
http://localhost:9009/auth-callback.html
https://nexusrn.healthqualityleader.com/auth-callback.html
```

Recommended Supabase Site URL:

```text
https://nexusrn.healthqualityleader.com
```

Do not place Supabase service-role keys in this repository.

## Stripe links

Production beta checkout:

```text
https://buy.stripe.com/5kQ4gy8uRbFLaYV7KGdnW00
```

$1 access-test checkout:

```text
https://buy.stripe.com/dRm00i6mJ1173wt9SOdnW01
```

The $1 access test grants a local browser entitlement for **24 hours** after manual payment confirmation. This is a local test workflow, not production authorization.

## Vercel deployment settings

Use these settings when importing the GitHub repository into Vercel:

```text
Framework preset: Other / Static
Root directory: .
Build command: none
Output directory: .
Production branch: main
```

Production domain:

```text
nexusrn.healthqualityleader.com
```

## Required environment variables in Vercel

Public/browser-safe:

```text
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
```

Future backend/webhook-only secrets, not used by the static frontend and not included in this repo:

```text
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
SUPABASE_SERVICE_ROLE_KEY
```

## Auth/payment truth

The current static package supports real Supabase email/password sign-up/sign-in from the browser and local $1 access-test entitlement after manual confirmation. Production paid access still needs a server-side Stripe webhook that writes Supabase entitlements.

Recommended production entitlement model:

```text
User signs up/signs in
→ Stripe checkout
→ Stripe webhook verifies payment
→ Supabase entitlement is created
→ App checks active entitlement
→ Full beta workspace opens
```

## Do not commit

Do not commit:

```text
.env
.env.local
Stripe secret keys
Supabase service-role keys
Vercel tokens
```

