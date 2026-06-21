# NEXUSRN $1 ACCESS TEST WORKFLOW AUDIT — FIXED10

## Decision

`$1 access test workflow added for local browser QA.`

## Purpose

Hossam requested that the second Stripe link be used as an access test, not merely a payment smoke test.

The package now treats the `$1` Stripe link as an **access-flow test checkout**:

1. Open `$1` Stripe checkout from `beta-access.html`.
2. Confirm the `$1` payment in Stripe Dashboard during QA.
3. Open `beta-test-access.html`.
4. Activate temporary local test access.
5. Continue to `beta-sign-in.html?testAccess=1`.
6. Open `workstation-pro/index.html?betaTestAccess=1` for beta workspace routing test.

## Files added or modified

- Added: `beta-test-access.html`
- Modified: `beta-access.html`
- Modified: `beta-sign-in.html`
- Modified: `beta-success.html`
- Modified: `beta-cancelled.html`
- Updated: `NEXUSRN_BETA_PAYMENT_PROCESS_AUDIT.md`
- Updated: `NEXUSRN_SIGNIN_SIGNUP_PAYMENT_WORKFLOW_AUDIT.md`

## Safety model

This is a **localhost-only simulated entitlement** for QA.

It uses browser `localStorage` key:

`nexusrn_beta_test_access`

The test entitlement expires after 24 hours.

This does **not** grant production beta access and must not be used as real authorization.

## Why this is still not production auth

A static ZIP cannot securely verify Stripe payment or create a real account entitlement by itself. For real automatic access, NexusRN needs:

- real sign-up/sign-in backend
- Stripe webhook verification
- server-side entitlement record
- 90-day beta expiry attached to user account
- server-side authorization checks

## Stripe links

Production beta checkout:

`https://buy.stripe.com/5kQ4gy8uRbFLaYV7KGdnW00`

$1 access test checkout:

`https://buy.stripe.com/dRm00i6mJ1173wt9SOdnW01`

## QA behavior

`beta-test-access.html` enables activation only on:

- `localhost`
- `127.0.0.1`
- `0.0.0.0`

Outside localhost, the activation button is blocked.

## Final status

Ready for Hossam local browser retest only.

Do not claim production paid-access launch until Stripe Dashboard and backend/webhook entitlement are configured and tested.
