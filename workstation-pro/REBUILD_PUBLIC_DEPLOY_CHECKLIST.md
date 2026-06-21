# REBUILD PUBLIC DEPLOY CHECKLIST

1. [ ] Create a clean staging folder.
2. [ ] Copy only allowed files: `index.html`, `practice/`, `public-demo/`, `pricing/`, `assets/`, `data/`, `data-bank/`, `vercel.json`, root HTMLs.
3. [ ] Verify `data/questions-current.json` and `production-release-candidate.json` are absent.
4. [ ] Run `python -m http.server 8000` in staging folder.
5. [ ] Verify localhost routes (Home, Practice, Demo, 404 on DBs).
6. [ ] Zip the staging folder.
7. [ ] Push to GitHub / Vercel.
