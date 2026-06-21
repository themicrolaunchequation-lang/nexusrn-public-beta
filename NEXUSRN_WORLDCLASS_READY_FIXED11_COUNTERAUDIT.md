# NexusRN FIXED11 Current-Base Public Demo Counter-Audit

ZIP: `CLEAN_APP_V12_REMOVE14_STRIP_NR_WORLDCLASS_READY_FIXED11.zip`

SHA-256: `CBB2A4159010CCA683B2E4A527038FE0D48F973807BDC2423BF97CFBD3BD8F8D`

Size: `39124124` bytes

Entries: `421`

Backslash ZIP paths: `0`

Decision: **CLEAN_APP_V12_REMOVE14_STRIP_NR_WORLDCLASS_READY_FIXED11_READY_FOR_HOSSAM_BROWSER_RETEST**

## Core gates

- standaloneActive: `5086`
- uniqueStandaloneIds: `5086`
- duplicateIds: `0`
- unfoldingCases: `1056`
- unfoldingChildren: `6336`
- highlightItems: `140`
- highlightNRHits: `0`
- directTargetCount: `16`
- selectedCaseExists: `True`
- allowlistContainsAllSelected: `True`

## Selected current-base sample integrity

| id | format | focus | index | full | answerKey | rationale | EHR |
|---|---|---|---:|---:|---:|---:|---:|
| `nexus_bow_mission5_ef3d` | bowtie | Acute Myocardial Infarction (STEMI) | True | True | True | True | True |
| `nexus_multip_ngn_d1d3` | multiple-response-sata | Acute Coronary Syndrome / MI | True | True | True | True | True |
| `921c8f6a-9bba-4ec9-a962-456cac54cee8` | matrix-multiple-choice | Burn Injury / Fluid Resuscitation | True | True | True | True | True |
| `f3070943-15c9-4eac-b8c3-8fd5123df0b8` | cloze-dropdown | Pneumonia / Oxygenation | True | True | True | True | True |
| `HIGHLIGHT_001_SEPSIS_SHOCK` | highlight | Sepsis / Septic Shock | True | True | True | True | True |
| `nexus_drag_sepsispa_d5cc` | ordered-response | Sepsis Pathophysiology | True | True | True | True | True |
| `trend_rebuild_004_aki_hyperkalemia` | new-trend | AKI: hyperkalemia with ECG trend | True | True | True | True | True |
| `mmr_021_renal_transplant_rejection_tacrolimus_infection_prioritize_hypotheses` | matrix-multiple-response | Renal transplant rejection, tacrolimus toxicity, opportunistic infection, and hyperkalemia | True | True | True | True | True |
| `mmr_024_pediatric_airway_anaphylaxis_epiglottitis_asthma_foreign_body_take_action` | matrix-multiple-response | Pediatric airway emergencies: anaphylaxis, epiglottitis, severe asthma, and foreign-body obstruction | True | True | True | True | True |

## Public-demo routes

- `case-arthur` → `../practice/index.html?publicDemo=1&caseId=nexus-unfolding-6q-dka-adolescent-cerebral-edema-001#public-demo-item`
- `bowtie-jamal` → `../practice/index.html?publicDemo=1&qid=nexus_bow_mission5_ef3d#public-demo-item`
- `ecg-sample` → `../practice/index.html?publicDemo=1&qid=nexus_multip_ngn_d1d3#public-demo-item`
- `matrix-sample` → `../practice/index.html?publicDemo=1&qid=921c8f6a-9bba-4ec9-a962-456cac54cee8#public-demo-item`
- `cloze-sample` → `../practice/index.html?publicDemo=1&qid=f3070943-15c9-4eac-b8c3-8fd5123df0b8#public-demo-item`
- `highlight-sample` → `../practice/index.html?publicDemo=1&qid=HIGHLIGHT_001_SEPSIS_SHOCK#public-demo-item`
- `ordered-sample` → `../practice/index.html?publicDemo=1&qid=nexus_drag_sepsispa_d5cc#public-demo-item`
- `trend-sample` → `../practice/index.html?publicDemo=1&qid=trend_rebuild_004_aki_hyperkalemia#public-demo-item`
- `matrix-mr-sample` → `../practice/index.html?publicDemo=1&qid=mmr_021_renal_transplant_rejection_tacrolimus_infection_prioritize_hypotheses#public-demo-item`
- `trap-abc` → `../practice/index.html?publicDemo=1&qid=mmr_024_pediatric_airway_anaphylaxis_epiglottitis_asthma_foreign_body_take_action#public-demo-item`
- `method-slides` → `slides.html?deck=method&publicDemo=1&accessMatrix=1`
- `priority-models` → `slides.html?deck=priority&publicDemo=1&accessMatrix=1`
- `readiness-slides` → `slides.html?deck=readiness&publicDemo=1&accessMatrix=1`
- `study-planner-slides` → `slides.html?deck=study&publicDemo=1&accessMatrix=1`
- `stress-slides` → `slides.html?deck=stress&publicDemo=1&accessMatrix=1`
- `interactive-guided-preview` → `../workstation-pro/index.html?publicDemo=1&caseId=nexus-unfolding-6q-dka-adolescent-cerebral-edema-001#public-demo-item`

## Blockers

None

## Notes

- data-bank clinical content compared byte-for-byte against FIXED10: no changes.
- This is ready for Hossam local browser retest, not final production closure.