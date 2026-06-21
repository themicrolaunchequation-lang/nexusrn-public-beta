# RUNTIME AUDITS

1. **`NEXUS_V237_CHUNK_TYPE_COVERAGE_AUDIT()`**
   - **Where:** `practice/index.html` Console
   - **Expected:** `{"balancedWindowingActive": true, ...}`
   - **Failure:** If it returns false or missing, the chunk loader fix isn't active.
