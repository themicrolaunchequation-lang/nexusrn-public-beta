# NexusRN Sign-In / Sign-Up / Payment Workflow Audit — FIXED8

## Decision
`CLEAN_APP_V12_REMOVE14_STRIP_NR_WORLDCLASS_READY_FIXED8_READY_FOR_HOSSAM_BROWSER_RETEST`

## Auth reality check
No live backend authentication provider was found inside the static ZIP. No Supabase URL, Supabase anon key, GitHub repository URL, Vercel project URL, `.env`, `vercel.json`, or auth configuration file was found in the packaged app.

Therefore, this patch does **not** create fake username/password forms and does **not** claim automatic access unlocking.

## Workflow implemented

### Public visitor
`Landing -> Try Public Demo -> curated public demo`

No sign-up required.

### New paid beta user
`Landing -> Join Beta -> beta-access.html -> Start Beta Checkout -> Stripe Payment Link -> beta-success.html or Stripe confirmation -> manual onboarding/access instructions`

### Existing beta user
`Landing -> Sign In -> beta-sign-in.html`

Because no secure auth backend exists in this ZIP, `beta-sign-in.html` is an honest onboarding/access-status page, not a fake login form.

## Payment link
Stripe Payment Link used only from the beta access workflow page:

`https://buy.stripe.com/5kQ4gy8uRbFLaYV7KGdnW00`

The landing page no longer sends users directly to Stripe. It sends them to `beta-access.html` first so the account/onboarding process is explained before checkout.

## CTA routing matrix

| CTA | Final route/action | Notes |
|---|---|---|
| Try Public Demo | `public-demo/index.html` | Free, no sign-up required |
| Join Beta | `beta-access.html` | Explains beta identity + checkout |
| Create Account / Sign Up | `beta-access.html` | Safe account-first workflow page |
| Sign In | `beta-sign-in.html` | Honest static sign-in/onboarding status page |
| Start Beta Checkout | Stripe link only on `beta-access.html` | Opens in new tab with `noopener noreferrer` |
| Public-demo Join Beta buttons | `../beta-access.html` | No full-bank exposure |
| Start Practicing Now, if intercepted publicly | `public-demo/index.html` | Prevents unrestricted full-bank route |

## Security notes
- No passwords are collected in static HTML.
- No client-side entitlement unlock is implemented.
- No secret keys are exposed by this patch.
- Manual onboarding remains the only truthful fulfillment model unless a backend/webhook is later implemented.
- For production automation, implement Stripe webhook fulfillment and server-side entitlement checks.

## Regression claims
- Clinical/data-bank files were not modified.
- Public demo remains available.
- Payment success/cancel pages remain non-authoritative and do not falsely prove payment.
- Stripe Dashboard configuration was not verified from this environment.

## FIXED9 payment workflow addition

A second Stripe Payment Link was integrated for **testing only**:

- Test checkout URL: `https://buy.stripe.com/dRm00i6mJ1173wt9SOdnW01`
- Location: `beta-access.html`
- Button label: `Test $1 Checkout`
- Semantics: payment-flow smoke test only; does not grant Beta Plan access.
- Production purchase remains: `https://buy.stripe.com/5kQ4gy8uRbFLaYV7KGdnW00` with button label `Start Beta Checkout`.
- Landing page still avoids direct Stripe checkout links and continues routing paid CTAs through the account-first `beta-access.html` page.
- No fake login or client-side entitlement unlocking was added.


## FIXED10 update — $1 access test

The second Stripe link is now treated as an access-flow test checkout, not just a payment smoke test.

- `$1` checkout link: `https://buy.stripe.com/dRm00i6mJ1173wt9SOdnW01`
- Local activation page: `beta-test-access.html`
- Local sign-in test page: `beta-sign-in.html?testAccess=1`
- Beta workspace test route: `workstation-pro/index.html?betaTestAccess=1`

The access test is intentionally localhost-only and creates a 24-hour localStorage test entitlement after manual Stripe Dashboard confirmation. It is not production authorization.
