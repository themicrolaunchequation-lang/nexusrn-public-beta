# NEXUSRN PUBLIC DEMO DEEP WORKFLOW AUDIT

**Date:** June 19, 2026  
**Auditor:** Antigravity (AI Pair Programmer)  
**Scope:** Try Public Demo Workflow, Routing, Styling, and Clinical Sample Alignment (V12)

---

## 1. Executive Summary

This deep audit evaluates the "Try Public Demo" subsystem in the verified `CLEAN_APP_V12_REMOVE14_STRIP_NR_FINAL` codebase. While the clinical database and underlying scoring engine are robust, the user interface and routing for the public demo present major friction points. 

### Critical Issues Identified:
1. **Dead/Broken Database Paths:** The targets in the demo list reference `data/public-demo-v217-preview-db.json` and `data/public-demo-v174-practice-db.json`. Neither of these database files exists in the production package.
2. **Broken practice redirect:** The redirect in `practice/index.html` is a hardcoded refresh meta tag to `../workstation-pro/index.html` which completely strips all query parameters (`publicDemo=1`, `qid`, `caseId`), resetting the learner to a default standalone item.
3. **Workstation query parameter mismatch:** The Workstation Pro script parses `id` and `type` but does not know how to handle `qid` or `caseId` parameters passed from the public demo cards.
4. **Incorrect isPublicDemoRoute check:** The workstation checks for `demo=1` or path `/workstation-demo/` but the public demo page passes `publicDemo=1`, failing to trigger the restricted public demo mode inside `workstation-pro/index.html`.
5. **No style definition for navigation and panel UI:** Elements like `.demoNavShell`, `.demoNav`, and `.demoRulePanel` have zero CSS definitions in `global-design.css`, leaving the navigation buttons in a raw, unstyled default browser format.
6. **Selector Mismatches in Public Demo Filter:** `PUBLIC_DEMO_TYPE_ORDER` references `new-calculation` and `new-trend` but `normalizeType` converts these to `calculation` and `trend`, causing the filter to return zero matches for calculation and trend items.

---

## 2. Route-by-Route Evaluation

Below is the detailed diagnostic map for each of the 14 public demo targets.

### 1. Arthur Case (Flagship Case Study)
* **URL:** `../practice/index.html?publicDemo=1&demoTarget=case&db=data/public-demo-v217-preview-db.json&caseId=ai-T30-V5-medication-reconciliation-polypharmacy-in-older-adults-case-mp148wgm-q0w30a&casePos=2#public-demo-item`
* **Entry Point:** Public Demo list index card (button `Open unfolding case`).
* **Expected Learner Action:** Launch directly into the workstation loaded with the Arthur Jenkins polypharmacy unfolding case.
* **Actual Learner Action:** Browser redirects to `../workstation-pro/index.html`, strips all parameters, and loads a default standalone item because the case ID is missing from `cases-index-lite.json` and query parameters are discarded.
* **Locked/Unlocked State:** Intended to be Unlocked.
* **Real Workspace or Slide:** Real workspace (Workstation Pro).
* **Settings/Filters:** Exposed and fully editable (violates locked public demo rules).
* **Scoring/Rationale:** Inactive for the target case because the case doesn't load.
* **Return Navigation:** Broken (leads back to landing instead of demo list).
* **Learner Value (5-sec check):** Fails (loads unrelated default question instead of case).

### 2. Jamal Bow-Tie
* **URL:** `../practice/index.html?publicDemo=1&demoTarget=question&db=data/public-demo-v217-preview-db.json&qid=nexus_bow_fatembol_a7a6#public-demo-item`
* **Entry Point:** Public Demo list index card.
* **Expected Learner Action:** Open the Bow-Tie item for Jamal Washington (Fat Embolism Syndrome).
* **Actual Learner Action:** Redirects to `workstation-pro/index.html` with query parameters stripped; fails to load the Bow-Tie item.
* **Locked/Unlocked State:** Unlocked.
* **Real Workspace or Slide:** Real workspace.
* **Settings/Filters:** Exposed (unlocked).
* **Return Navigation:** Broken (leads to landing).
* **Learner Value (5-sec check):** Fails.

### 3. Matrix Multiple Choice Sampler
* **URL:** `../practice/index.html?publicDemo=1&demoTarget=question&db=data/public-demo-v217-preview-db.json&qid=85beb1fc-4024-4c65-960a-ffea28bc1128#public-demo-item`
* **Status:** Broken target ID (`85beb1fc-4024-4c65-960a-ffea28bc1128` does not exist in production database).
* **Actual Learner Action:** Redirects to workstation, strips params, loads default.

### 4. Drop-down / Cloze Sampler
* **URL:** `../practice/index.html?publicDemo=1&demoTarget=question&db=data/public-demo-v217-preview-db.json&qid=nexus_drag_preterml_5d69#public-demo-item`
* **Status:** Broken target ID (`nexus_drag_preterml_5d69` does not exist in production database).
* **Actual Learner Action:** Redirects to workstation, strips params, loads default.

### 5. Highlight Text/Table Sampler
* **URL:** `../practice/index.html?publicDemo=1&demoTarget=question&db=data/public-demo-v217-preview-db.json&qid=nexus_multip_new_9552#public-demo-item`
* **Status:** Broken target ID (`nexus_multip_new_9552` does not exist in production database).
* **Actual Learner Action:** Redirects to workstation, strips params, loads default.

### 6. Ordered Response Sampler
* **URL:** `../practice/index.html?publicDemo=1&demoTarget=question&db=data/public-demo-v217-preview-db.json&qid=ai_ordere_4bd4860c#public-demo-item`
* **Status:** Broken target ID (`ai_ordere_4bd4860c` does not exist in production database).
* **Actual Learner Action:** Redirects to workstation, strips params, loads default.

### 7. Trend Item Sampler
* **URL:** `../practice/index.html?publicDemo=1&demoTarget=question&db=data/public-demo-v217-preview-db.json&qid=nexus_trend_trendhyp_0ce6#public-demo-item`
* **Status:** Broken target ID (`nexus_trend_trendhyp_0ce6` does not exist in production database).
* **Actual Learner Action:** Redirects to workstation, strips params, loads default.

### 8. Matrix Multiple Response Sampler
* **URL:** `../practice/index.html?publicDemo=1&demoTarget=question&db=data/public-demo-v217-preview-db.json&qid=c7079843-9383-4bfe-aab6-a95d3e4e8e18#public-demo-item`
* **Status:** Broken target ID (`c7079843-9383-4bfe-aab6-a95d3e4e8e18` does not exist in production database).
* **Actual Learner Action:** Redirects to workstation, strips params, loads default.

### 9. ABC Trap (Decision Lab Radar)
* **URL:** `../decision-lab-v3-005/index.html?publicDemo=1&module=trap-radar&trap=abc-tunnel-vision&unlocked=1`
* **Entry Point:** Public Demo list index card.
* **Locked/Unlocked State:** Unlocked (ABC module only, remaining modules are view-only/locked).
* **Real Workspace or Slide:** Real decision lab workspace.
* **Scoring/Feedback/Rationale:** Working correctly.
* **Return Navigation:** Working (returns to public demo index).
* **Learner Value (5-sec check):** Passes (clearly conveys cue trap concept).

### 10. Method Playbook Slide Route
* **URL:** `slides.html?deck=method&publicDemo=1&accessMatrix=1`
* **Entry Point:** Public Demo list index card.
* **Locked/Unlocked State:** Slide 1 Unlocked; Slides 2 & 3 show full lab locked panel.
* **Real Workspace or Slide:** Slide-style preview.
* **Return Navigation:** Working (Demo List button works).
* **Design/Aesthetic:** Weak spacing, unstyled navigation row, default browser buttons.
* **Learner Value (5-sec check):** Marginally passes (concept is clear, but visual presentation is basic).

### 11. Priority Models Slide Route
* **URL:** `slides.html?deck=priority&publicDemo=1&accessMatrix=1`
* **Locked/Unlocked State:** Slide 1 Unlocked; Slide 2 locked.
* **Real Workspace or Slide:** Slide-style preview.
* **Learner Value (5-sec check):** Marginally passes.

### 12. Readiness Compass Slide Route
* **URL:** `slides.html?deck=readiness&publicDemo=1&accessMatrix=1`
* **Locked/Unlocked State:** Slide 1 Unlocked; Slides 2 & 3 locked.
* **Real Workspace or Slide:** Slide-style preview.
* **Learner Value (5-sec check):** Marginally passes.

### 13. Study Planner Slide Route
* **URL:** `slides.html?deck=study&publicDemo=1&accessMatrix=1`
* **Locked/Unlocked State:** Slide 2 Unlocked; Slides 1 & 3 locked.
* **Real Workspace or Slide:** Slide-style preview.
* **Learner Value (5-sec check):** Marginally passes.

### 14. Stress Reset Slide Route
* **URL:** `slides.html?deck=stress&publicDemo=1&accessMatrix=1`
* **Locked/Unlocked State:** Slide 1 Unlocked.
* **Real Workspace or Slide:** Slide-style preview.
* **Learner Value (5-sec check):** Marginally passes.

---

## 3. Visual & Usability Defects

1. **Aesthetic Gap:** The landing/list page `public-demo/index.html` uses bright, raw default buttons for its header and navigation. It lacks the dark clinical premium look of Workstation Pro and `global-design.css` does not define styling for its specific demo panels.
2. **Contrast & Text Spacing:** The descriptions on cards run together. The "locked/unlocked" rules are printed in a basic thin border with poor visual spacing.
3. **Illogical Hover-Only Behavior:** Tooltips and slides have click events that trigger alert notices on disabled pathways, but do not provide descriptive indicators on focus states for screen reader users.
4. **Exposure of Database Selectors:** In public demo mode, the Workstation Pro still exposes all 5,086 item select options and the complete unfolding case drop-down. A public learner should only see the selected target sample, with all browsing selectors completely disabled or hidden.
5. **No Visual Back-link:** When in workstation, returning to the public demo list requires using the default "Back to Landing Page" link, which skips the public demo list entirely and deposits the user on the root index page.

---

## 4. Recommendations for Rebuilding

1. **Parameter Preservation:** Re-write the redirect logic in `practice/index.html` so it parses the window's search queries and passes them to `workstation-pro/index.html`.
2. **Workstation Parameter Support:** Extend `workstation-pro` JS (`nexusrn-workstation-pro-v242w.js`) to support parsing `qid` and `caseId` in its initialization lifecycle, allowing direct target locks.
3. **Curated Database Fallbacks:** Re-map the broken 6 sampler targets to actual high-reputation production items found in `questions-index-lite.json` (such as the DKA matrix-mr, alteplase matrix, and acute coronary trend items).
4. **Selector and Pill Locking:** Add JS to check if `publicDemoMode` is active. If so, hide the selectors panel, mode pills, and start/edit drill buttons, replacing them with a sleek public demo lock badge.
5. **Method Playbook Overhaul:** Redesign the slides layout and navigation in `slides.html` to introduce high-contrast clinical cards, modern tab selections, and clearly structured locked callout boxes.
