# PUBLIC DEPLOY EXCLUDE LIST

The following files and folders MUST NEVER be included in the public Vercel deploy:
- `data/questions-current.json`
- `data/production-release-candidate.json`
- Any file `> 25 MB` (except legitimate media assets)
- `diagnostics.html`, `diagnostics-v*.html`
- `data-bank-backup/`
- `scratch/`
- `data-governance/`
- `tools/`
- `design-reference/`
- `workstation-pro/`
- `NexusRN_complete_threads_and_handover_2026-05-28/`
- `rn_safe_hotspot_30_*/`
- `UPDATED_HOTSPOT_IMAGES_WITH_CONFIG_PACKAGE/`
- `petrov.json`, `proposed_nlp_fixes.json`
- `Microsoft.Services.Store.winmd`
- `*.bak`, `*.bak2`
- `netlify.toml`, `_redirects`
