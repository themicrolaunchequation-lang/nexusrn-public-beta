# NexusRN Public Demo Current-Base Sample Selection Audit

Decision: UPDATED_CURRENT_BASE_CURATED_SAMPLES

Scope: public-demo routing and allowlist only. No clinical data-bank item/case content was mutated.

## Selection criteria

- active in the current FIXED10 base package
- resolves through current chunk/index metadata
- has answer key / scoring metadata
- has rationale or teaching feedback
- richer EHR/chart/clinical cues preferred
- old demo placeholders and mismatched examples replaced
- public demo remains restricted by allowlist and fixed guided sample routes

## Selected routes

| Public demo card | Selected current-base target | Why selected |
|---|---|---|
| Arthur Case | `nexus-unfolding-6q-dka-adolescent-cerebral-edema-001` | Current 6-question DKA/cerebral edema unfolding case with all CJMM phases, potassium/dehydration/neuro deterioration cues, and active case index resolution. |
| Jamal Bow-Tie | `nexus_bow_mission5_ef3d` | Real Jamal Washington STEMI Bow-Tie item with condition/action/monitoring scoring and rationale. |
| ECG Standalone | `nexus_multip_ngn_d1d3` | Current STEMI ECG/SVG item with answer key, rationale, and rendered rhythm media. |
| Matrix Multiple Choice | `921c8f6a-9bba-4ec9-a962-456cac54cee8` | Burn injury/fluid resuscitation matrix item with expected vs unexpected findings and strong scoring map. |
| Drop-down / Cloze | `f3070943-15c9-4eac-b8c3-8fd5123df0b8` | Acute pulmonary edema cloze item with clear four-blank clinical reasoning path and simple correctMap. |
| Highlight Text/Table | `HIGHLIGHT_001_SEPSIS_SHOCK` | Current Highlight-140 item with rich EHR notes, vitals, labs, I/O, radiology, orders, and no NR metadata. |
| Ordered Response | `nexus_drag_sepsispa_d5cc` | Rich ordered-response item sequencing sepsis progression with chart cues, labs, orders, and rationale. |
| Trend Item | `trend_rebuild_004_aki_hyperkalemia` | Current trend-rebuild item with potassium/ECG/urine-output trend and priority hyperkalemia action. |
| Matrix Multiple Response | `mmr_021_renal_transplant_rejection_tacrolimus_infection_prioritize_hypotheses` | Current batch4 MMR with transplant rejection/tacrolimus/infection/hyperkalemia matrix reasoning. |
| ABC Trap | `mmr_024_pediatric_airway_anaphylaxis_epiglottitis_asthma_foreign_body_take_action` | Real current pediatric airway-emergency matrix sample used as restricted ABC-trap practice route. |
| Method Playbook | `slides.html?deck=method&publicDemo=1&accessMatrix=1` | Restricted current guided preview route. |
| Priority Models | `slides.html?deck=priority&publicDemo=1&accessMatrix=1` | Restricted current priority preview route. |
| Readiness Compass | `slides.html?deck=readiness&publicDemo=1&accessMatrix=1` | Restricted current readiness preview route. |
| Study Planner | `slides.html?deck=study&publicDemo=1&accessMatrix=1` | Restricted current study-planning preview route. |
| Stress Reset | `slides.html?deck=stress&publicDemo=1&accessMatrix=1` | Restricted current stress-reset preview route. |
| Interactive Guided Preview | `workstation-pro/index.html?publicDemo=1&caseId=nexus-unfolding-6q-dka-adolescent-cerebral-edema-001` | Added explicit interactive restricted workstation preview using the same current flagship case. |

## Replaced outdated / weaker targets

- Warfarin intracranial bleeding unfolding case was replaced by current DKA/cerebral edema flagship case.
- Fat embolism Bow-Tie route was replaced by actual Jamal Washington STEMI Bow-Tie.
- Matrix mismatch route was replaced by burn-resuscitation matrix item matching the card label.
- Cloze mismatch route was replaced by acute pulmonary edema cloze with simple scoring metadata.
- Older highlight route was replaced by `HIGHLIGHT_001_SEPSIS_SHOCK` from the 140 current Highlight lane.
- Older ordered/trend/MMR samples were replaced by richer current-base rebuild/batch4 items.
- ABC Trap now opens a real current airway-priority item rather than an old standalone Decision Lab-only placeholder.

## Safety

- Full bank browsing remains disabled in public demo mode.
- Public demo allowlist was updated to the selected targets only.
- Selectors and raw tab remain locked by existing publicDemoMode logic.
- data-bank clinical content was not modified.


## Report synchronization

This file was refreshed in FIXED11 to remove stale FIXED10 demo target references. Source of truth: `NEXUSRN_PUBLIC_DEMO_CURRENT_BASE_SAMPLE_SELECTION.md`.
