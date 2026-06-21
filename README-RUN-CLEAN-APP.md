# NexusRN Clean Production App V12

## Quick Start
```
cd NEXUSRN-CLEAN-PRODUCTION-APP-V12
py -m http.server 9008 --bind 127.0.0.1
```

Then open: http://localhost:9008/

## Contents
- **Landing Page**: Polished NexusRN hero page with Start Practicing Now button.
- **Workstation Pro**: Production-Equivalent Static Workstation Pro at /workstation-pro/.
- **Standalone Mode**: 5,100 premium items (17 retired).
- **Unfolding Case Study Mode**: 1,056 active cases (3 retired) with 6,336 unique child items (0 duplicates).

## Quality-First Retirement Authority
- Retired Standalone: `derived_mcq_to_matrix_nexus-gen-evaluate-outcomes-1776452874858-2-2w8np` (Reason: STRUCTURAL_PROMPT_MISMATCH / WRONG_TOPIC_RATIONALE).
- Retired Cases: `205`, `222`, `378` (Reason: CASE_CHILD_DUPLICATE_UNSAFE).

## Rationale Wiring
- All rationale injection uses STRICT exact canonical itemId matching only.
- No title, topic, order, or chunkIndex fallback was used.
- Items with no verified rationale match are flagged in FINAL-RATIONALE-MISMATCH-SCAN.csv.

## Engine Status
- This is a Production-Equivalent Static Workstation Pro package.
- It uses the same scoring, rendering, and clinical logic as the production engine.
- It does not connect to a live backend server.