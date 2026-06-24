# NexusRN FIXED18I Production Approval Checklist

This supersedes the FIXED18H checklist. FIXED18I removes user-editable metadata as an entitlement source and requires server-controlled `app_metadata` or `public.beta_entitlements`.

# NexusRN FIXED18H Production Approval Checklist

Status: final app-side learner flow and pricing cleanup candidate.

Do not call FULLY PRODUCTION APPROVED until all live checks pass:

1. Vercel redeploys this exact package.
2. Custom domain loads over HTTPS: https://nexusrn.healthqualityleader.com.
3. Supabase Auth redirects include the custom domain and localhost:9009 callbacks.
4. Supabase beta_entitlements table or user metadata entitlement is configured.
5. Workstation Pro blocks unpaid signed-in accounts in production and allows paid/entitled accounts.
6. Stripe Dashboard confirms: $30 amount, correct currency, 3-month beta product, live/test mode as intended, success URL, cancel URL, receipt/support settings.
7. Public Demo remains open without sign-in.
8. Landing CTAs route correctly: signed-out/unpaid to Join Beta; paid/entitled to Workstation Pro and Decision Lab.

Protected content rule: data-bank/ must not be mutated.
