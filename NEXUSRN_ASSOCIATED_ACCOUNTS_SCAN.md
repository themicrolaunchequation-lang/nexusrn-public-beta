# NexusRN Associated Accounts Scan — FIXED8

## Scope
Scanned the packaged ZIP source for Supabase, GitHub, Vercel, deployment, environment, and account references.

## Result

### Supabase
No Supabase project URL, anon key, service-role key, auth client initialization, or environment variable was found in the static package.

### GitHub
No GitHub repository URL, remote origin, GitHub workflow, or GitHub account identifier was found in the static package.

### Vercel
Vercel is mentioned only in documentation/checklist files:
- `workstation-pro/WORKSTATION_PRO_README.md`
- `workstation-pro/DEPLOYMENT_NOTES_VERCEL.md`
- `workstation-pro/REBUILD_PUBLIC_DEPLOY_CHECKLIST.md`
- `workstation-pro/PUBLIC_DEPLOY_EXCLUDE_LIST.md`

No `vercel.json`, Vercel project ID, team ID, org/account name, production deployment URL, or environment variable was found in the package.

### Public domains/canonicals found
- `https://nexusrn.com/` in root landing metadata
- `https://nexusrn.healthqualityleader.com/` canonical/legal page URLs

## Interpretation
The app may have been connected to Supabase/GitHub/Vercel in another workspace or computer, but those account/project identifiers are not present in this uploaded ZIP. I cannot infer or safely invent account identities that are not in the files.
