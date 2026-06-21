# DB CHUNKING ARCHITECTURE

- **Manifest:** `data-bank/manifest.json` directs the runtime.
- **Indices:** `-lite.json` indices load questions and cases safely without exposing full item data.
- **Balanced Windowing:** Avoids naïve `CASESETS.concat(Q)` loading, preventing practice grids from being 100% unfolding cases initially.
- **Security:** Full monolithic DBs must stay out of the public folder so they cannot be scraped or downloaded.
