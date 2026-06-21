# NexusRN Public Demo Locked Browser QA — FIXED11 Current-Base Target Refresh

Status: READY_FOR_HOSSAM_BROWSER_RETEST_PENDING_LOCAL_BROWSER_PASS

This FIXED11 patch updated only public-demo route targets, displayed card copy, and the public-demo allowlist. It did not mutate clinical item/case content.

## Routes requiring Hossam local browser retest

| Card | Route |
|---|---|
| Arthur Case | `practice/index.html?publicDemo=1&caseId=nexus-unfolding-6q-dka-adolescent-cerebral-edema-001#public-demo-item` |
| Jamal Bow-Tie | `practice/index.html?publicDemo=1&qid=nexus_bow_mission5_ef3d#public-demo-item` |
| ECG Standalone | `practice/index.html?publicDemo=1&qid=nexus_multip_ngn_d1d3#public-demo-item` |
| Matrix Multiple Choice | `practice/index.html?publicDemo=1&qid=921c8f6a-9bba-4ec9-a962-456cac54cee8#public-demo-item` |
| Drop-down / Cloze | `practice/index.html?publicDemo=1&qid=f3070943-15c9-4eac-b8c3-8fd5123df0b8#public-demo-item` |
| Highlight Text/Table | `practice/index.html?publicDemo=1&qid=HIGHLIGHT_001_SEPSIS_SHOCK#public-demo-item` |
| Ordered Response | `practice/index.html?publicDemo=1&qid=nexus_drag_sepsispa_d5cc#public-demo-item` |
| Trend Item | `practice/index.html?publicDemo=1&qid=trend_rebuild_004_aki_hyperkalemia#public-demo-item` |
| Matrix Multiple Response | `practice/index.html?publicDemo=1&qid=mmr_021_renal_transplant_rejection_tacrolimus_infection_prioritize_hypotheses#public-demo-item` |
| ABC Trap | `practice/index.html?publicDemo=1&qid=mmr_024_pediatric_airway_anaphylaxis_epiglottitis_asthma_foreign_body_take_action#public-demo-item` |
| Interactive Guided Preview | `workstation-pro/index.html?publicDemo=1&caseId=nexus-unfolding-6q-dka-adolescent-cerebral-edema-001#public-demo-item` |

## Required manual checks

- Public demo list displays 16 targets.
- Every practice target opens exactly one allowlisted real item/case.
- Full selectors remain hidden/disabled.
- Next/previous cannot browse full bank.
- Raw tab remains inaccessible.
- Check/score/rationale works for each item type.
- Slides remain restricted previews.
- No console-blocking errors.
