# DEPLOYMENT NOTES VERCEL

- **Vercel-Only:** Netlify config is removed. Rely on `vercel.json`.
- **Commit Steps:** When pushing to GitHub Desktop, explicitly verify that `data/questions-current.json` and `data/production-release-candidate.json` show as DELETED.
- **Verify Deletions Live:** Navigate to `https://<custom-domain>/data/questions-current.json`. It MUST return 404.
