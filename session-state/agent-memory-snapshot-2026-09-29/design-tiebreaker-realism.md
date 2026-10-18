---
name: design-tiebreaker-realism
description: "Owner rule (2026-09-25) — when MFCG-style and FTG-style approaches conflict, lean toward realism (\"the corpus\") with constraint and precision"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3fbc58a0-613c-43b5-9c94-a4f47a8689a6
  modified: 2026-09-25T10:01:48.836Z
---

Owner, 2026-09-25: "if you have to make a decision between MCFG and FTG on which direction to take for coding, i would say lean into the corpus with constraint and precision."

Reading applied in the Maps program: where watabou's MFCG approach (partition space into wards, charm, one click) and Allerton's FTG approach (grow roads under constraints, real units, districts as objects) genuinely conflict at a stage, choose the one more faithful to how real historical settlements are constrained and laid out — explicit constraints (terrain, water, defence, land use, access, growth) and precise, real-world-unit geometry with measurable statistics — over the prettier or simpler one. Legibility and one-click usability stay a floor. The historical corpus (`~/Desktop/settlement-engine/map-corpus`) is still NOT read until the owner opens the reconciliation step; the rule is about direction.

**Why:** the built generators will later be reconciled against that historical/artistic corpus (see [[settlementforge-map-program-link]]); leaning toward realism now makes that step a calibration instead of surgery.
**How to apply:** it is written into `workflows/03-assess-design-validate.js` (GROUND "DESIGN TIEBREAKER", SPEC fusion thesis, parity judge) and the judgment table J8 in `docs/PROGRESS.md`; apply the same rule in the build phase. See [[maps-project-state]], [[owner-profile]].
