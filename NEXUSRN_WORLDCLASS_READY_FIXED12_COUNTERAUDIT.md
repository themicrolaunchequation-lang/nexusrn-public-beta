# NexusRN FIXED12 Counter-Audit

Decision:

```text
CLEAN_APP_V12_REMOVE14_STRIP_NR_WORLDCLASS_READY_FIXED12_READY_FOR_HOSSAM_BROWSER_RETEST
```

## Supabase Auth Integration

- Supabase project ref: `yzlrekjjvenxzpenyily`
- Supabase URL configured: `True`
- Publishable key configured: `True`
- Service-role key present: `False`
- Auth method: `email/password`
- Test entitlement duration: `24 hours`

## New/updated access routes

- `auth-sign-up.html` — create account
- `auth-sign-in.html` — sign in
- `auth-callback.html` — confirmation/callback route
- `account.html` — account + local access status
- `beta-access.html` — session-gated Stripe checkout page
- `beta-test-access.html` — 24-hour localhost $1 access-test activation

## Core content gates

| Check | Result |
|---|---:|
| Active standalone | 5086 |
| Unique standalone IDs | 5086 |
| Duplicate active IDs | 0 |
| Highlight items | 140 |
| Old NR_HIGHLIGHT active | 0 |
| Unfolding cases | 1056 |
| Unfolding children | 6336 |
| Data-bank changed vs FIXED11 | 0 |

## Technical gates

| Check | Result |
|---|---:|
| JS syntax failures | 0 |
| Inline script syntax failures | 0 |
| Public/dev wording hits | 0 |
| Required auth files present | 8 / 8 |

## Payment/access truth

The $30 beta checkout and $1 access-test checkout are now account-first from `beta-access.html`. The buttons are enabled only after a Supabase session is detected in the browser.

The $1 access test creates a 24-hour local entitlement only after the tester manually confirms payment and clicks activation on `beta-test-access.html`. The local entitlement is tied to Supabase user ID/email and localhost.

Production automatic access still requires Stripe webhook fulfillment and a server-side Supabase entitlement table.

## Supabase Dashboard required

Add redirect URLs:

```text
http://127.0.0.1:9009/auth-callback.html
http://localhost:9009/auth-callback.html
https://nexusrn.healthqualityleader.com/auth-callback.html
```

Recommended Site URL:

```text
https://nexusrn.healthqualityleader.com
```
