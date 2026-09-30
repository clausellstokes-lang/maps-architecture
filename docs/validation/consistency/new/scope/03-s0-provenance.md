## §0 Provenance

### 0.1 What this document is built from

The ARCHITECTURE lane (workflow 03 run `wf_e306f20c-a9f`, 2026-09-25) built this design on
`docs/design/proposal-kernel.md`, the design panel's choice, with the grafts from the other two proposals (G-P1–G-P17,
G-R1–G-R15) and the repairs it owed (K-1–K-6 and the parity and improvement majors), each listed with its landing
section in `docs/design/judging.md` §3–§4. Five fix rounds and one consistency pass (2026-09-25/26) revised it; the
per-item dispositions are `docs/ARCHITECTURE-VALIDATION.md` and `docs/validation/`. The panel's scores, the reading
record, the completion record and the round-by-round history are in `docs/ARCHITECTURE-RATIONALE.md`. This file is one
design, not a concatenation: every mechanism appears once, under the section that owns it; where two proposals gave the
same mechanism the more precise wording was taken.

### 0.2 Where the seven late owner rules (`docs/AMENDMENTS-2026-09-25.md`) land

Every clause of every rule is checked at its landing; where a rule has several clauses its landing carries a clause
map.

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 1 greenery by prosperity | §4.9 S12b rule table (reads the prosperity field and the district kind; yard planting by plot class); §15.2 O19 | §4.9 |
| 2 floating islands (a toggle, staged by the owner) | §2.7 `SkyIsland` with its own terrain and a `reason` (prosperous quarter or unique institution); II.1 rule 5 (the sky call) and II.6 (the staged layers' hooks); §4.2 (island outline); §11 (per-layer export) | II.6 |
| 3 heights for shadows | §2.6 heights and the ground datum on every building, wing, tower and roof; §8.4 the shadow pass and the display list's shadow hook | §2.6 |
| 4 size ladders | §1.1 (both ladders; the `RungProfile` table; size within a rung follows population); §12.2 (bands and matched reference sizes); PART III (the village ladder THORP → HAMLET → VILLAGE and its ceiling) | §1.1 |
| 5 everything editable | §7.1 (the clause map, the edit-target table and its registry test), §7.2–§7.6, §2.8 (edit paths in the entity registry) | §7.1 |
| 6 prosperity a gradient and a band | §4.5 (the field, its drivers, bands only where a table needs one, continuous interpolation, evolution moves the field), §4.7 (interpolating rules), §7.2 (brush edits) | §4.5 |
| 7 adopted defaults | D-1–D-7, each FINAL and tied to its mechanism: the ink default and `lit` on Canvas2D; era rows refined by §13.9; the named fantasy toggles; the browser-first library under §17's checker; "mastered" through §13.6's protocol plus the parity numbers; naming through §10.4's packs; the weighting ordering the build (§16) | D-1–D-7 |

### 0.3 Evidence discipline

CONFIRMED = an executed measurement or a quotation verified at source by the lane cited. PLAUSIBLE = reasoning from
that evidence. Reference numbers used as calibration targets (FTG's 10.3 m quad side, NG's corner at 0.5 ± 0.1, MFCG's
casing law, FTG's 39 m tower spacing …) are CONFIRMED in the cited findings; this document's mechanisms, constants and
budgets are PLAUSIBLE until the M-1 and M0 spikes of §16 measure them (Appendix A). Where the evidence leaves a
reference's mechanism unknown (C13's bend-placement law, FTG's district scoring, NG's `isSmallEnough`), this design
says so and invents its own, calibrated to the measured outputs (`docs/CONFIDENCE.md` §5).

---
