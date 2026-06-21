# GitHub + Vercel Deployment Guide

## 1. Create GitHub repository

Recommended repo name:

```text
nexusrn-public-beta
```

Recommended visibility:

```text
Private until final launch approval
```

Upload the **contents** of this folder to the repo root. Do not upload the ZIP as the only file.

## 2. Confirm repo root

The root should contain:

```text
index.html
auth-sign-in.html
auth-sign-up.html
beta-access.html
public-demo/
workstation-pro/
data-bank/
assets/
vercel.json
```

## 3. Import into Vercel

Vercel settings:

```text
Framework preset: Other / Static
Root directory: .
Build command: none
Output directory: .
Production branch: main
```

## 4. Add domain

Add:

```text
nexusrn.healthqualityleader.com
```

## 5. Add Supabase redirect URLs

In Supabase → Authentication → URL Configuration:

```text
Site URL: https://nexusrn.healthqualityleader.com
Redirect URLs:
http://127.0.0.1:9009/auth-callback.html
http://localhost:9009/auth-callback.html
https://nexusrn.healthqualityleader.com/auth-callback.html
```

## 6. Test after deploy

Test these routes:

```text
/
/public-demo/index.html
/auth-sign-up.html
/auth-sign-in.html
/account.html
/beta-access.html
/beta-test-access.html
/workstation-pro/index.html
```

## 7. Payment/access warning

The current app has Supabase browser auth and local 24-hour $1 test entitlement logic. It does not yet have production webhook-based paid entitlement enforcement.

Before paid launch, add Stripe webhook fulfillment that writes Supabase entitlements.
