# WORKSTATION PRO README

This project is separated into two modes:
1. **Public Deploy**: A clean, minified, chunk-loaded frontend application for Vercel.
2. **Private Source / Workstation**: The complete repository including source databases, tools, design references, and backup materials.

**How to Rebuild Clean Public Deploy ZIP:**
Follow the steps in `REBUILD_PUBLIC_DEPLOY_CHECKLIST.md`.

**Local Server:**
Run `python -m http.server 8000` in the directory you wish to serve.

**Validations:**
Follow commands in `VALIDATION_COMMANDS.md`.

**Updating Chunks Safely:**
Use the `workstation-beta` or `tools` scripts to chunk the DB. NEVER copy full JSON DBs to Vercel.

**NEVER Copy to Vercel:**
- `data/questions-current.json`
- `data/production-release-candidate.json`
- `data-bank-backup/`
- `tools/`, `scratch/`, `workstation-pro/`
