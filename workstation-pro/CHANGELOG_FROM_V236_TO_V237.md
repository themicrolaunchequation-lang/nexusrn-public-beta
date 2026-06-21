# CHANGELOG FROM V236 TO V237

**Baseline:** `NexusRN-v236-public-db-purge-confirm.zip`

**Changes:**
- Purged `data/production-release-candidate.json` and `questions-current.json` from the public deploy.
- Aligned `data/runtime-manifest.json` version to `v237-external-agent-complete-handover`.
- Balanced Chunk Loader Fix: Ensured `NEXUS_V237_CHUNK_TYPE_COVERAGE_AUDIT()` properly aliases the `v238` native batch loader, which correctly mixes item types (Bow-Tie, Matrix, etc.) instead of naively filling the first 300 grid slots with `Unfolding Case`.
- Split project into clean public deploy vs private archive.

**Known Limitations:**
- Public-preview only. Paid launch requires auth, backend, Lemon Squeezy integration, and protected item delivery.
