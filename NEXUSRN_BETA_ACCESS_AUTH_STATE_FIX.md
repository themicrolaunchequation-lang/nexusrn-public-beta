# NexusRN FIXED14 Beta Access Auth-State Fix

## Purpose
Fixes beta-access.html so it recognizes the active Supabase browser session on Vercel.

## Changes
- Loads Supabase JS and `assets/js/nexusrn-supabase-auth.js` on `beta-access.html`.
- Shows signed-in email on the Beta Access page.
- Replaces the static Sign In-only nav with Account / Sign Out when authenticated.
- Requires sign-in before $30 beta checkout and $1 access-flow checkout.
- Preserves Public Demo without sign-in.
- Corrects local $1 test entitlement duration in auth helper from 48 hours to 24 hours.

## Limits
This does not yet create production entitlements. Real paid access still requires Stripe webhook fulfillment into Supabase `beta_entitlements`.
