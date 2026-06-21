# VALIDATION COMMANDS

- **Local Server:** `python -m http.server 8000`
- **Check 404s:** `Invoke-WebRequest -Uri "http://localhost:8000/data/production-release-candidate.json"`
- **Large file check (Powershell):** `Get-ChildItem -Recurse | Where-Object { $_.Length -gt 25MB }`
- **Browser Audit (Practice):** Open DevTools and run `window.NEXUS_V237_CHUNK_TYPE_COVERAGE_AUDIT()`
