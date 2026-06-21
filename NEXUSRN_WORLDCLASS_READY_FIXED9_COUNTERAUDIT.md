# NEXUSRN WORLDCLASS READY FIXED9 COUNTER-AUDIT

## Decision

`CLEAN_APP_V12_REMOVE14_STRIP_NR_WORLDCLASS_READY_FIXED9_READY_FOR_HOSSAM_BROWSER_RETEST`

## ZIP fingerprint

- File: `CLEAN_APP_V12_REMOVE14_STRIP_NR_WORLDCLASS_READY_FIXED9.zip`
- SHA-256: `A5879E4FE8BE9059C470CC1B42869747008D34336E3E6DA3B08E00045E6B1A48`
- Size: `39111765` bytes
- Entries: `436`
- Backslash ZIP paths: `0`

## Payment-link integration

| Check | Result |
|---|---:|
| Landing direct Stripe hrefs | 0 |
| Beta-access production Stripe link count | 1 |
| Beta-access $1 test Stripe link count | 1 |
| Production link secure attrs | True |
| Test link secure attrs | True |
| $1 test disclaimer on beta-access | True |
| $1 test notice on success page | True |
| $1 test notice on cancelled page | True |

## Static content gates

| Check | Result |
|---|---:|
| JS syntax failures | 0 |
| Inline script syntax failures | 0 |
| Active standalone | 5086 |
| Unique standalone IDs | 5086 |
| Duplicate active IDs | 0 |
| Clean14 active | 0 |
| Bad14 active | 0 |
| Highlight items | 140 |
| Old NR_HIGHLIGHT active | 0 |
| Highlight index NR hits | 0 |
| Highlight full chunk NR hits | 0 |
| Unfolding cases | 1056 |
| Unfolding children | 6336 |
| Index/chunk resolve failures | 0 |
| Data-bank changed vs FIXED8 | 0 |
| Public/dev wording hits | 0 |
| Associated Supabase/GitHub/Vercel account hits | 0 |

## Notes

- The `$1` Stripe link is integrated only on `beta-access.html` as `Test $1 Checkout`.
- The test checkout is explicitly marked as payment-flow testing only and does not grant 3-month beta access.
- The production `$30 / 3 months` Stripe link remains the primary `Start Beta Checkout` route.
- Stripe Dashboard configuration was not verified from this ZIP; exact amount/product/currency/live mode must be checked in Stripe Dashboard before public use.
