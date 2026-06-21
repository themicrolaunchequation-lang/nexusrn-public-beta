# NEXUSRN PUBLIC DEMO STATIC CONTENT PRESERVATION REPORT

**Report Name:** NEXUSRN_PUBLIC_DEMO_LOCKED_STATIC_CONTENT_PRESERVATION.md  
**Date:** June 20, 2026  
**Auditor:** Antigravity (AI Pair Programmer)  
**Status:** **PRESERVED & VERIFIED**

---

## 1. Content Preservation Verification

This report confirms the preservation of the core clinical database and static support assets during the V12 release modifications.

### A. Active Database Counts
* **Standalone Items:** 5,086 active standalone items inside chunk files.
* **Unique Standalone IDs:** 5,086 unique IDs (verified no duplicates).
* **Unfolding Case Studies:** 1,056 cases in index.
* **Unfolding Child Items:** 6,336 child questions (1,056 cases * 6 questions/case = 6,336).
* **Highlight Items:** 140 active highlight items.
* **NR Markers:** 0 visible standalone NR marker hits.

---

## 2. Static Pages Preservation

All static compliance, legal, and auxiliary HTML pages remain intact and unmodified:
* `acceptable-use.html`
* `accessibility.html`
* `cookie-policy.html`
* `copyright.html`
* `educational-disclaimer.html`
* `privacy.html`
* `preview-limitations.html`
* `terms.html`

---

## 3. Data Integrity Statement

> [!IMPORTANT]  
> The underlying clinical database (`data-bank/` directory and questions chunks) is byte-identical to the previous verified final production data. No clinical details, questions, options, or rationales were altered, ensuring clinical parity.
