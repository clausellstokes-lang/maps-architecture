# rewrite-V06 routing notes (working file)

Source: docs/volumes/V06-evolution.md md5 95ed7b33e00cb9ad0a37548052555112, 4631 lines, 104 574 words (wc) / 106 357 (canon count).
Goal band after: 63 814 – 79 768 words (canon).

## Section plan (new text)
- 00 head: title, one marker line, Citations paragraph
- 01 §0 plain words (+ item 111 and item 113 plain words)
- 02 §1 (1.1 builds incl. items 111/113, 1.2 hooks, 1.3 out of scope — J-V6.4 bullet retired, XCONF-1)
- 03 §1b wiring table W1–W81 + new rows (W82 item 111; W83–W86 item 113), dossier trace with DR numbers
- 04 §2 data model (+ §2.14 the history replay's records: ReplayPlan etc.)
- 05.. §3.1–§3.19; §3.12.1 item 111; §3.20 history replay at generation (item 113); §3.21 edges
- §4–§6, §7 tests (new T-V6-70..), §8 plan, §9 decisions (J-V6.4 superseded mark; J-V6.92 reworded; new J-V6.126+),
  §10 pointers, §11 answered, §12 two paragraphs, §13 closed, Integration notes → folded (dropped)

## Base gaps found (new base parts lack a V06-requested fact) — V06 keeps its statement, cross-note to the base editor
- BCR-V6-5 / f 209: `EvolveOp` not in §4.11's ConversionOp union (determinism §7.1/§7.4 cite "V06's EvolveOp"); V06 §2.8 keeps the declaration.
- BCR-V6-4 / f 429: `Use.strain?` not on §2.7's Use (§10.2 cites "Use.strain (§2.7)"); V06 §2.9 keeps the declaration.
- BCR-V6-9 / f 343: `EpochInputs.wealthLevel?` and `.advance?` (with stoppedAt?, V06-ICONF-3) not on §4.11's EpochInputs; determinism cross-noted it to pipeline; V06 §2.3 keeps the field shapes.
- BCR-V6-18 / f 336: Regrowth-first's two history exceptions (overflow backlog stage; decrowding stage) absent from §4.11; V06 §3.6 keeps the rule.
- BCR-V6-23 / f 479: §4.11 (c) still says the strike pool decides whose households leave first; V06 §3.5.1 keeps the departure matching; pipeline to apply 479.
- BCR-V6-15 (c) / f 409: §10.4 naming feature `formerWall` absent from base (V11 row 68 has naming.formerWall); cross-note rendering/pipeline §10.4.
- BCR-V6-13 / f 275: §4.5's sentence "at and after an epoch the casters include the buildings as that epoch's mask records them": only line ~1922 names V06's mask; also base §4.5 (iv) "a mask whose digest differs is recomputed whole" vs V06 §2.6/§3.4 (5) "reads as zero building shade until the next epoch" — cross-note (the building mask is epoch-written model data).
## Applied in base (pointer OK)
317 runner (§4.11), 321 Works retirement (§4.11 (j)), 254 pathway (§2.7), 206 oxbow (§2.3), 209 formerClass (§2.4), 264 registry (§2.8; §7.1 mutate step),
342 EVO_* (§6.1), 443 lifespans (§10.3), 458 API (§11.2), 388 DR28 (§7.7), 339 GenerationReport.epochs (§5.4), 409 live.history, CSVs, APNG (§8.2, §11.1),
550 sewers per epoch (II.7.1), 335 §5.3 transit row (cites V06 §2.1), 293 suburb row (§4.4), 265 detail.why (§2.8), 266 epoch-spread mutation (§4.11),
478 §12.6 epoch cost, 260 suppress (§2.8), 290 generation (§4.3), 291 persistence rows raised/retaining 0.05 (§4.11), 573 events+CalamityRef (§4.11), 574 crowding hook (§4.11 (6)).

## Continuation 2026-09-30 (cloud, second run) — inputs re-gathered
Scratch (recompute if gone; dir /tmp/claude-0/-home-user-maps-architecture/<session>/scratchpad/coherence/):
canonV06.md (canon.md l.4682-4774), inv-V06.tsv (502 items + 36 terms with canon roles), edges-V06.md (edges.md l.867-981),
combos-V06.md (l.1774-1818), handoffs.md (19 rows of agreement.md), f-items-V06.tsv, base-4.11.md (new pipeline §4.11).
Marker line (V01-V04 form): "> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V6-evolution, its
revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84)."
New ids: T-V6-70 (edge suite), T-V6-71 (item 113 replay at generation), T-V6-72 (item 111 failing springs); J-V6.127+; W82+.
Base for item 113: new pipeline §4.11 *History-first generation* (1)-(7) owns peak, replay semantics, destruction/refounding,
burial, sewers reopen, edges; §7.7 DR36 (peak) DR37 (replay epochs/events) DR38 (destruction/refounding) DR39 (burial), DR40
oasis; §7.7 *The history replay's record* (V06's history record; §5.4 epochs list; V10); §6.1 *The history replay* (no new
concern; epoch component). V11 cells: history.epochYears, history.burialYears, history.symbolicQuantile, history.reuseCost,
history.replay; V11 event-to-epoch rows. V06 writes: ReplayPlan/ReplayRecord, coarse epochs runner, event->epoch mapping,
generation budget, lazy detail, lifecycle rows, tests, no-op pin, report/clerk story.
Conflicts: ICONF-1 repairWall no-stretch no-op line; ICONF-2 J-V6.92 reworded; ICONF-3 stoppedAt? in advance (f 343);
ICONF-4 'Open a copy from here' in §5.1; XCONF-1 retire J-V6.4 + §1.3 bullet, write g113; XCONF-2 DR28/DR29; AGREE-1 cite
V09 info.remove.holds {kind}, deck-plot variant V09's; CANON-C02 hood doc no clock, bend line (V09 row, V10 row), T-V6-23;
CANON-C03 §11 decisions table (Q1 (a) right after M4, J122).
Elegance: E-01 (stretch-state profile at §2.2 rule 5 — V06 keeps writer/reader cells), E-02 keep apart (lift rule f 260),
E-24 one mark 'superseded by X'/'amended by X', E-39 keep apart (LOST joins V04's access-state set).
Wiring: W-DOS-02 (wealthLevel via V08 §3.5 diff row; DR6), W-DOS-09 closed by g113 DR36-39, W-DOS-10d (DR33, DR34, DR35 by
number), V06-WGAP-1a/1b (V09/V10 rows; V06 cites), WGAP-2 (hand-off table closed).

## Owner items 114-116 (coordinator message 2026-09-30; canon "Dated ruling 2026-09-30", J127)
- 114 (V06 part): §3.7.7 new — NEED = the slice's threat (DR2, readiness folded in by V08) read from the log's epoch slices;
  MEANS = the wealth level in force (log) — classes low/mid/high by thresholds with hysteresis, sustained over V11 windows;
  local weight = the run's bounding districts' present mean prosperity vs the town's, scaling decay rates [0.5, 1.5] (no class
  flip). Ladder standing·worn·patched·breached·dismantled (base §2.7 via model; each run's material + epoch of last change).
  Transitions: neglected ring standing→worn (wearChancePerYear; neutral null = straight to breached as before)→breached;
  in use with means low sustained: worn/breached at poor rates; both low ×bothLowFactor; need returns + means low → breached
  runs patched (repairWall with a patch material drawn by V11 walls.patchMaterials kind×culture weights on
  stream(EVO_FORT, enceinte)); need + means → breached rebuilt robust, patched rebuilt oldest first ≤ rebuildRunsPerYear×years,
  worn restored; means high without need → in-use ring's worn restored, neglected keeps decaying; dismantled stays gap.
  V11 cells named: walls.condition.{needReturnYears, meansWindowYears, meansLow, meansHigh, meansHysteresis,
  wearChancePerYear, poorWearChancePerYear, poorBreachChancePerYear, bothLowFactor, rebuildRunsPerYear, localWeight};
  walls.patchMaterials. No-op pin: meansLow 0, wearChancePerYear null, needReturnYears 0 → pre-114 behaviour byte-identical.
  Test T-V6-73; decision J-V6.131; report walls.worn/patched/rebuilt; chronicle wallPatched/wallRebuilt/wallWorn.
- 115 (V06 part): §3.8.5 new — the grandeur ceiling read at the epoch's rung (the fold's) by every op that derives a building's
  design (S11 of a new stage, tier (3) rebuild/reuse…build, rung-3 rebuild/redevelopment, MutationPlan steps); standing
  buildings never reshaped by a rung change; a plan step beyond the ceiling after a hand-down cancels the plan (done steps
  standing); dossier-specified / hand-made designs kept. Test T-V6-74; decision J-V6.132.
- 116: no V06 part (V07, V09, V12, rendering); cross-note only (bounds grown by an epoch move the limit — §8.8's).
