# M0-x-06: the checker's minor notes for the hardening milestone M4 (lane `check/M0-x-06`, 2026-10-07)

These are the MINOR findings of the first check of M0-x-06 (`checks/M0-x-06.md`). None of them fails the item (J180,
N-45). Each is a known-issue row for the hardening pass, or a note routed to the item or the session it names. The
evidence is in the check file and in `~/maps-scratch/waves/check-M0-x-06/` (probe.json, probe5.json, mutants.jsonl,
the mutant logs `m/<id>.log`, run1000/run1000.out).

| # | note | evidence | route | label |
|---|---|---|---|---|
| 1 | **The pinned refused-safe cells whose planted batch did roll back are known shortfalls of their stages' ladders.** S1 zero-length (`E_DEGENERATE`), S3 and S5a zero-length (`E_DEGENERATE`) and self-touching (`E_INVARIANT`), S5b zero-length (`E_DEGENERATE`) and self-touching (`E_INVARIANT`), S6 zero-area (`E_INVARIANT`, "settlementPerimeter: the overlay's outer ring is not the boundary's offset"). Each stage refuses the planted kind whole with one bugs entry; the planted batch is uncommitted (probe P4 `batchCommitted: false`), the arena passes `checkCI`, and the later stages run without a throw (probe P2, through S6). No rung of the stage's class takes the kind at M0. This is fail-safe under N-45. The author's `ep01Known` lines name these cells. (The six cells whose planted batch stayed committed are blocker B1 of the check, not this note.) | probe.json P2, P4; probe5.json | M4 hardening; the stage owners M0-e-03 (S1), M0-c-01 / M0-c-02 (S3, S5a trace), M0-c-04 (S5b), M0-e-04 (S6) | CONFIRMED |
| 2 | **A stage's bug abort leaves the stage's earlier committed batches in the arena.** The runner drops the whole stage's outputs (C-0224 (5)), but the batches the stage had committed before the refusal stay: S3 refused leaves S3's map border (8 `border` edges, no S3 record); S5 refused at stage 2 leaves stage 1's trace, strips and growth (52 `wall`, 288 `setback`, 60 `way` edges, no `s5` record). §5.1 (8) speaks of the failing batch rolled back and the entity's tier-6 outcome while the stage goes on with its other entities. This is distinct from B1, which is about the planted batch itself. | probe5.json `S3 zero-length@7`, `S5a zero-length@7` | the session: M0-x-02 (runner) and the stage owners, for M4 | CONFIRMED |
| 3 | **S5c's and S5d's `laddered` reading takes any F-NUM rung in the growth record, not the planted proposal's.** `chainHandling` checks `insertRefused && fnum.length > 0`; it does not match the rung's `code` or `proposal` to the planted insert. Mutant M27 (the non-precision refusal's `rec.refused` count dropped) survived for that reason, and it is equivalent on today's plants: no planted kind gives a non-precision insert refusal there (P4: zero-length gives `E_BELOW_MIN_EDGE` → `re_propose`; the others insert ok or refuse the batch). A stricter judge would match `rec.rungs[i].code` to `plant.insert.code`. | mutants.jsonl M27; probe.json P4 | M4 hardening (M0-x-06) | CONFIRMED |
| 4 | **cliff × frame recomputes the hydrology grid.** `runCliffFrame` calls `hydroGridOver(rasterGeom(t), hydroParams(...).hydroCellCm)` itself rather than reading S1's stored `terrain.hydro`. A change to the stored grid alone would not be seen. | `edge/cells.ts` `runCliffFrame` | M4 hardening (M0-x-06) | CONFIRMED |
| 5 | **bridge × frame rarely meets a built span.** On the five probed seeds `built` was 0 every time and `routable` was 0 on four. The "a site beyond the frame is never spanned" half is live (mutant M22, every site built, was killed). The "every built span has both deck ends inside the frame" half is rarely exercised. A frame where S4 builds a span on most seeds would strengthen it. | probe.json P3 `cell/bridge×frame` | M4 hardening (M0-x-06) | CONFIRMED |
| 6 | **wall × frame accepts a trace on the frame line (inset ≥ 0) where EP-20 requires > 0. At M0 the trace is not inset by the outer strip.** The trace inset was 957–2 566 cm against a 1 500 cm outer strip (below it on 2 of 5 seeds), and the strips are cut at the map border (`stripInsetCm` 0). This matches C-0201 (1) and C-0226. C-0273 (9) declares the reading, so it is not a deviation of this item. | probe.json P3 `cell/wall×frame` | M4 hardening; S3 (6)'s inset to M0-c-01's successor | CONFIRMED |
| 7 | **EP-20's `requestedVsBuilt` clause has no milestone in the coverage table.** The fixture asserts `requestedVsBuilt` is `[]` (C-0224 (7)) and reads the shortfall from S3's report and S5d's record. The EP-20 row's `later` text lists the island, fjord and narrow-valley fixtures but not the `requestedVsBuilt` clause. | `edge/coverage.ts` EP_ROWS EP-20 | M4 hardening (M0-x-06) | CONFIRMED |
| 8 | **The edge suite costs much more than C-0100 estimated.** At the PR size (10 seeds) it took 537 CPU-s over the 14 files on this machine (the S5d file alone 164 s). At 1 000 seeds it took 15.6 CPU-hours (15 127 s wall on 4 workers; the S5d and bridge fixtures each took about 50 CPU-min). C-0100's estimate was "≈ 60 fixtures × 1 000 × milliseconds". §13.8's nightly budget is ≤ 4 h on 16 cores. These timings are informative only (not the reference machine), but M0-f-02b's nightly job should plan for them. | near.out; run1000.out | M0-f-02b; the session (tier budgets) | CONFIRMED (timing informative) |
| 9 | **The S5 driver's parity is pinned on SMALL_FLAT seeds 11 and 12 only.** Mutant M29 (the prune's warnings not forwarded) survived. It is equivalent on the surveyed seeds, because the prune emits no warning there. MID_FLAT and the EP-20 frame are not parity-checked. | mutants.jsonl M29; control.test.ts | M4 hardening (M0-x-06) | CONFIRMED |
| 10 | **A hang is judged after the run returns.** `runFixture` compares the elapsed time with `HANG_MS` once `f.run` comes back. A run that never returns is caught by the vitest timeout (`timeoutFor`), which is not attributed to a seed. | test/edge/support.ts | M4 hardening (M0-x-06) | CONFIRMED |
| 11 | **The deferred stubs hand-roll their error.** `notBuiltRun` throws `new Error("notBuilt('<m>'): …")` rather than using a project `notBuilt` helper (kernel's `facade/notBuilt.ts`). The message form matches C-0100's and the coverage test pins it. | edge/types.ts | M4 (style) | CONFIRMED |
| 12 | **S6's cells check the boundary was changed except for zero-length.** The `degraded === 0 && kind !== 'zero-length'` exemption is unnecessary (zero-length adds one vertex), and the check counts vertices only, not the kind's shape. `kinds.test.ts` holds `degenerateRing`'s shapes. | edge/ep01.ts runS6Cell | M4 hardening (M0-x-06) | CONFIRMED |
| 13 | **EP-26's milestone may be M-SF rather than M1.** S10b's dossier request with `W_DOSSIER_EDGE`; §13.8 schedules B-DOSSIER-lite (T125) at M-SF. Not verified against §16's row text. | coverage.ts EP_ROWS | the session, at M1 planning | PLAUSIBLE |
| 14 | **EP-16's τ at g = 1 is held within e_hi · 2⁻⁴⁸.** The planner's double product lands a few ulps below e_hi (C-0273 (10)), so the decision differs only for a minor extent within that ulp. Fail-safe. | edge/rows.ts runEp16 | M4 (M0-b-03's planner) | CONFIRMED |
| 15 | **Equivalent mutant M12.** `spawnPrimaries`' `want <= 0` changed to `want < 0` survived. It is equivalent, because the function draws only inside its `k < want` loop, so `want = 0` draws nothing and returns `[]`. No test is needed. | mutants.jsonl M12; growth/mainRoads.ts | — | CONFIRMED |

## Fix round 2 (lane `build/M0-x-06-fix2`, 2026-10-11/12) — the builder's census, re-pins and notes

The builder of fix round 2 (choices row C-0342, ledger row L-0482) writes this section; the checker's rows above are unchanged.

**The tree measured.** Main at `2d09aa13` (read through the GitHub tree API, no git). The tree's 18 foreign in-flight source
files (kernel `arena/{debug,index,plat,resolve,tables}.ts`, `arr/{bandUnion,buffer,insetRing,offsetFace,winding}.ts`,
model `match/*` (8)) were replaced in the run mirror by main's bytes, each blob sha verified; the item's own files are
the tree's.

**The 1 000-seed bar (72 fixtures × 1 000 = 72 000 runs; 12 harness shards, `--maxWorkers=1` each, 10:36–17:09, every
shard 9 files 15/15).** crash 0, hang 0, off 0, offOutcome 0; absorbed 25 155, laddered 21 812, left-out 1 995,
refused-safe 14 038, refused-lawful 0, defined 9 000; the four frame cells (cliff, river, bridge, wall) defined 1 000
each. Against this round's first final run (2026-10-12 05:14, the tree then): identical but `EP-01/S8/zero-length`
(laddered 433 → 434, refused-lawful 1 → 0: Q41 fixed by M0-b-03 s4, C-0329) and `cell/bridge×frame` (lawful refusals
34 → 19: Q40 fixed by M0-c-02 s4, C-0324).

**Every refused-safe cell, re-pinned on the committed tree (`test/edge/repins.test.ts`).** S1 zero-length 218369345
`E_DEGENERATE`; S1 zero-area 492415066 and collinear 3531121151 `E_INVARIANT` (rolled back); S1 self-touching 2651453823
`E_INVARIANT` (33 of 1 000, every seed named); S3 zero-length 2376620364 `E_DEGENERATE`; S3 zero-area 642402145 and
collinear 2401321442 `E_INVARIANT` (rolled back); S3 self-touching 2065051154; S5a zero-length 1924675773; S5a zero-area
2829448911 and collinear 716606205 (rolled back); S5a self-touching 3380957245; S5a coincident 1658509524 (5 of 1 000,
every seed named); S5b zero-length 3504584308 and self-touching 1745954339; S6 zero-area 3899199413 (996 of 1 000); S6
self-touching 4101706098 (2 of 1 000) and coincident 2708765650 (2 of 1 000). The six rolled-back cells (C-0278 (1)'s
residue cells) assert the planted batch committed and the arena bit-identical to the stage's start. Named outcomes: S6
self-touching 2191303060 absorbed; river × frame 1595424233 commits on its first state (the brief's 1595423433 is this
seed); S5a coincident 3443032966 and 2300104848 absorbed on the first state; S8 zero-length 2521534151 laddered
(`a:none:nextRung, a:refused:width, deep:refused:portal-gap, deep:refused:width`), no finding left.

**J264's census, BEFORE → AFTER.** Lawful-input refusals in the registered families: 51 (+1 refused-lawful) → 35 (+0).
None rose. Every one is in a fixture's PREPARED or CONTROL state (a stage before the home, or the home unplanted); the
fixture replaces the state (C-0278 (2)), so none fails the bar, and none is pinned as a pass. Classed by N-58: input
LAWFUL or OUR OWN INTERMEDIATE throughout, so every class is verdict (a) MAKE-IT-SUCCEED, for the session to route:

| class | source and code | count | owner (route) |
|---|---|---|---|
| A | S4: the spines' batch refused, §3.10 role consistency `(way, way:n) branches` (`E_INVARIANT`) | 7 | M0-c-03 |
| B | S5 / S3 `layStrips`: 'a side's lines closed no strip face' (17) or 'one face on both sides of the wall' (1) (`E_INVARIANT`) | 18 | M0-c-02 (Q37's class) |
| C | S3: 'gate gate:0 is not on the committed trace at its point' (`E_INVARIANT`) | 1 | M0-c-01 / M0-c-02 |
| D | S3 water: 'the crossing … has no clear chord between its two bank pins' (`E_INVARIANT`) | 4 | M0-c-02 (Q40's remainder, Q46) |
| E | S3 F-WALL: 'the trace touches / crosses … after the re-offset and union-simplify rungs; the later rungs are M1's' (`E_SELF_INTERSECT`) | 4 | M0-c-02; the M1 rungs (C-0085) |
| F | S3: the trace's insert `E_DEGENERATE` empty | 1 | M0-c-01 / M0-c-02 |

Each one, with the seed that replays it (the fixture's run at the fixture seed; the state seed is the attempt's):

| class | fixture | fixture seed | state seed | stage | where | code | the refusal (abridged) |
|---|---|---|---|---|---|---|---|
| A | EP-01/S4/self-touching | 4078456246 | 4078456246 | S4 | control | E_INVARIANT | S4: the spines' batch was refused (E_INVARIANT: (way, way:2) branches: a linear role forms simple chains or rings |
| A | EP-01/S5a/zero-area | 1104735897 | 1104735897 | S4 | preparation | E_INVARIANT | S4: the spines' batch was refused (E_INVARIANT: (way, way:0) branches: a linear role forms simple chains or rings |
| A | EP-01/S6/zero-length | 2787492733 | 2787492733 | S4 | preparation | E_INVARIANT | S4: the spines' batch was refused (E_INVARIANT: (way, way:0) branches: a linear role forms simple chains or rings |
| A | EP-05/S5d | 1625622056 | 1625622056 | S4 | preparation | E_INVARIANT | S4: the spines' batch was refused (E_INVARIANT: (way, way:2) branches: a linear role forms simple chains or rings |
| A | EP-20/M0 | 1334794515 | 1334794515 | S4 | preparation | E_INVARIANT | S4: the spines' batch was refused (E_INVARIANT: (way, way:10) branches: a linear role forms simple chains or rings |
| A | EP-20/M0 | 3068986432 | 3068986432 | S4 | preparation | E_INVARIANT | S4: the spines' batch was refused (E_INVARIANT: (way, way:0) branches: a linear role forms simple chains or rings |
| A | EP-20/M0 | 3296267945 | 3296267945 | S4 | preparation | E_INVARIANT | S4: the spines' batch was refused (E_INVARIANT: (way, way:0) branches: a linear role forms simple chains or rings |
| B | EP-01/S5a/coincident | 957349493 | 957349493 | S5 | control | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (8116, -15964) is gate:2's gate vertex (the face |
| B | EP-01/S5a/coincident | 2306189499 | 2306189499 | S5 | control | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (-8471, 15291) lies 681 cm inside gate:3's corri |
| B | EP-01/S5a/coincident | 4102748823 | 4102748823 | S5 | control | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (-8430, -15479) lies 679 cm inside gate:3's corr |
| B | EP-01/S5a/collinear | 4210924515 | 4210924515 | S5 | control | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (-16329, 1925) lies 675 cm inside gate:3's corri |
| B | EP-01/S5a/self-touching | 2806303556 | 2806303556 | S5 | control | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (8304, -15697) is gate:2's gate vertex (the face |
| B | EP-01/S5a/zero-area | 35167633 | 35167633 | S5 | control | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (-16759, -1107) is gate:3's gate vertex (the fac |
| B | EP-01/S6/coincident | 281949303 | 281949303 | S5 | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (17543, 188) lies 682 cm inside gate:2's corrido |
| B | EP-01/S6/zero-length | 1908460072 | 1908460072 | S5 | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (-5952, -15353) lies 675 cm inside gate:2's corr |
| B | EP-04/S5b | 3629930494 | 3629930494 | S5 (S5a:2) | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (8312, 15256) lies 586 cm inside gate:2's corrid |
| B | cell/bridge×frame | 636887255 | 636887255 | S3 | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the outer side: vertex (2026, 11906) is gate:0's gate vertex (the face  |
| B | cell/bridge×frame | 936491186 | 936491186 | S3 | preparation | E_INVARIANT | layStrips: one face on both sides of the wall |
| B | cell/bridge×frame | 1017919770 | 1017919770 | S3 | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the outer side: vertex (-10074, 6479) is gate:1's gate vertex (the face |
| B | cell/bridge×frame | 1140569634 | 1140569634 | S3 | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the outer side: vertex (-6137, -8461) is gate:0's gate vertex (the face |
| B | cell/bridge×frame | 1387994580 | 1387994580 | S3 | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the outer side: vertex (27386, 18519) lies 17742 cm from the trace, bey |
| B | cell/bridge×frame | 1387994580 | 3858926900 | S3 | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the outer side: vertex (-7579, 6695) lies 570 cm inside gate:0's corrid |
| B | cell/bridge×frame | 1409296145 | 62653028 | S3 | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (2293, 8749) lies 95 cm inside gate:0's corridor |
| B | cell/bridge×frame | 2303806328 | 2303806328 | S3 | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the inner side: vertex (10047, 6378) is gate:1's gate vertex (the face  |
| B | cell/bridge×frame | 2870428480 | 2870428480 | S3 | preparation | E_INVARIANT | layStrips: a side's lines closed no strip face — the outer side: vertex (1276, 14465) lies 398 cm inside gate:1's corrid |
| C | cell/bridge×frame | 1409296145 | 1409296145 | S3 | preparation | E_INVARIANT | trace: gate gate:0 is not on the committed trace at its point (§4.2 S3 (9)) |
| D | cell/bridge×frame | 396602230 | 396602230 | S3 | preparation | E_INVARIANT | water: the crossing from 256,-11472 to 1473,-11704 has no clear chord between its two bank pins (a main gate stands in t |
| D | cell/bridge×frame | 765046355 | 765046355 | S3 | preparation | E_INVARIANT | water: the crossing from -8906,8348 to -9791,6954 has no clear chord between its two bank pins (a main gate stands in th |
| D | cell/bridge×frame | 914597522 | 914597522 | S3 | preparation | E_INVARIANT | water: the crossing from 2087,-11668 to 3961,-11162 has no clear chord between its two bank pins (a main gate stands in  |
| D | cell/bridge×frame | 3484178840 | 3484178840 | S3 | preparation | E_INVARIANT | water: the crossing from -10646,5800 to -11731,3089 has no clear chord between its two bank pins (a main gate stands in  |
| E | cell/bridge×frame | 1523636832 | 3428569941 | S3 | preparation | E_SELF_INTERSECT | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) |
| E | cell/bridge×frame | 1785777080 | 1785777080 | S3 | preparation | E_SELF_INTERSECT | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) |
| E | cell/bridge×frame | 1918289972 | 1918289972 | S3 | preparation | E_SELF_INTERSECT | F-WALL: the trace crosses the core after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) |
| E | cell/bridge×frame | 3360356802 | 3360356802 | S3 | preparation | E_SELF_INTERSECT | F-WALL: the trace touches itself after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085) |
| F | cell/bridge×frame | 1933152649 | 1933152649 | S3 | preparation | E_DEGENERATE | empty |

The 14 038 refused-safe runs are the UNLAWFUL kinds the fixtures plant inside a stage's batch: verdict (c) REFUSE —
typed, one bugs entry, the arena rolled back whole; no user reaches them through §11.4's doors (generator-internal); each
pin's KI line (`ep01Known`) routes the stage's missing rung to the hardening pass.

**Self-check (fix), J183 — 14 targeted mutants in the lane mirror, the item's folder at the PR size (`--maxWorkers=1
--bail=1`), baseline 17 files 153/153.**

| mutant | line | the fault | result | killed by |
|---|---|---|---|---|
| X1 | L1 (B4 pins) | S1 zero-length pinned E_INVARIANT for E_DEGENERATE | killed (exit 1, 460s) | test/edge/ep01-s1-s3-s4.test.ts › EP-01/S1/zero-length |
| X2 | L1 (rare seeds) | S6 self-touching drops seed 4101706098 | killed (exit 1, 569s) | test/edge/repins.test.ts › a rare pin names every seed its share counts at 1 000 (the four rare cells, and only they) |
| X3 | L2 (S6 2191303060) | 2191303060 put back among S6 self-touching's refused seeds | killed (exit 1, 5s) | test/edge/repins.test.ts › a rare pin names every seed its share counts at 1 000 (the four rare cells, and only they) |
| X4 | L2 (river × frame) | the old river pin re-added (1595424233 among the missed states) | killed (exit 1, 609s) | test/edge/standing.test.ts › cell/river×frame at seed 1595424233 (S1 refuses the river unplanted) |
| X5 | L3 (Q22) | S5a coincident pinned on any seed (its seed list dropped: the old broad pin) | killed (exit 1, 580s) | test/edge/repins.test.ts › a rare pin names every seed its share counts at 1 000 (the four rare cells, and only they) |
| X6 | L3 (Q22) | the S5a coincident pin replayed with the old 'closed no strip face' words | killed (exit 1, 17s) | test/edge/repins.test.ts › EP-01/S5a/coincident at seed 1658509524: refused-safe E_INVARIANT, the arena bit-identical |
| X7 | L4 (Q14) | refusalHandling reads every refusal as rolled back | killed (exit 1, 689s) | test/edge/handling.test.ts › a bugs entry of the stage is refused-safe with its code only when the arena is bit-identic |
| X8 | L4 (Q14) | the pinned cells' rollback judge always passes | killed (exit 1, 8s) | test/edge/handling.test.ts › S1, S3 and S5a × zero-area and collinear are pinned refused-safe with their codes, rolledB |
| X9 | L4 (the six) | S3 collinear's rolledBack mark dropped | killed (exit 1, 7s) | test/edge/handling.test.ts › S1, S3 and S5a × zero-area and collinear are pinned refused-safe with their codes, rolledB |
| X10 | L5 (J264) | the runner stops counting lawful refusals | killed (exit 1, 738s) | test/edge/control.test.ts › the runner counts and names every lawful-input refusal a run met, whether the run passed o |
| X11 | L5 (J264) | firstStanding drops the replaced states' lawful refusals | killed (exit 1, 666s) | test/edge/repins.test.ts › Q37's three seeds: the unplanted state's strips are refused (S5, 'closed no strip face'),  |
| X12 | L5 (J264) | the summary's lawfulRefusals zeroed | killed (exit 1, 713s) | test/edge/control.test.ts › carries counts only, per fixture the seed count and the outcome counts, replacing a summar |
| X13 | S8 re-pin (Q41) | the Q41 finding restored for S8 zero-length 2521534151 | killed (exit 1, 701s) | test/edge/repins.test.ts › EP-01/S8/zero-length at 2521534151 ladders: S8's seam-portals refusal of the lawful arteri |
| X14 | refused-lawful judge | a lawful refusal passes on a seed no finding names | killed (exit 1, 699s) | test/edge/control.test.ts › the judge: a refused-lawful outcome passes only on a seed the cell names as a finding, wit |

14 of 14 killed; every mutated file restored from the tree and `cmp -s` clean before the next. The mirror is removed.

**Notes for the hardening pass (none fails the item).**

| # | note | route | label |
|---|---|---|---|
| r2-1 | The census counts lawful refusals of the fixtures' own preparation states, which the suite replaces by the next standing state; a stage fix that removes a class shifts the states the fixtures run (their outcome counts may move while every outcome stays allowed). | M4 (M0-x-06) | CONFIRMED |
| r2-2 | At the PR size the item's whole folder takes about 11 minutes on one worker here (informative only, not the reference machine); the 1 000-seed bar about 6.5 hours wall on 3–4 shards beside another seat. | M0-f-02b (nightly budget) | CONFIRMED (timing informative) |

## Closing check r2 (lane `check/M0-x-06-close-r2`, 2026-10-12/13) — the closing checker's notes

The closing checker of fix round 2 adds these rows (its verdict, PASS, is the last section of `checks/M0-x-06.md`). None
of them fails the item (rule (3) of the closing brief, N-45). The rows above are unchanged.

| # | note | evidence | route | label |
|---|---|---|---|---|
| c2-1 | **A rare pin's seed list is checked only at the nightly size.** A named seed that is wrong but keeps the count (mutant X12: S1 self-touching's 2287195388 → 2287195389) passes the whole NEAR folder at the PR size. Only the cell's first 10 seeds run there, and `repins.test.ts`'s share-to-seeds pin compares the list's length with the `share` text that the same author writes. The 1 000-seed bar catches it (`at seed 2287195388: refused E_INVARIANT on a seed the pin does not name`). A cheap PR-size guard would replay every named seed of the four rare pins (42 runs, about a minute here; this seat's probe P2) and assert each refuses with its pinned code. | `mutants.jsonl` X12, `x12-1000.out`, `probe.jsonl` | M4 (M0-x-06), or M0-f-02b's nightly job | CONFIRMED |
| c2-2 | **S8's cell rollback branch is unexercised on the committed tree.** `runS8Cell` runs S8 outside the runner, restores a refused S8 itself (`takeSavepoint` / `restoreSavepoint`), then judges the print. S8 refuses on no seed of its five cells at 100 or 1 000 (all absorbed or laddered), so deleting the restore, or breaking the print check there, would go unseen until S8 refuses. A fabricated-refusal unit test (like `handling.test.ts`'s fakes) would hold the branch. | the 100-seed replay (S8 cells 0 refused); the summary (S8 refused-safe 0, refused-lawful 0) | M4 (M0-x-06) | PLAUSIBLE (reasoned; mutant not run) |
| c2-3 | **The brief's river × frame seed `1595423433` is a transposition of `1595424233`.** 1595424233 is the first check's seed in the cell's family, and `repins.test.ts` pins it. Run as a fixture seed, 1595423433 is also `defined` on its first state. | `probe.jsonl` | the session (no action) | CONFIRMED |
| c2-4 | **The S5a coincident cell's 5 refusals are classed UNLAWFUL by the kernel's own answer.** `lawfulPlant` makes a coincident plant lawful only when the kernel took the doubled chain. On the 5 named seeds (1658509524, 3650193777, 3114039644, 2262416935, 57196073), the kernel attracts the second copy off the first and refuses the batch at commit by §3.10 role consistency (`(wall, enceinte:2) branches`), so the refusal counts as refused-safe (REFUSE), with the pin routing the kernel side to M0-a-05. §3.11 has a coincident chain absorbed as one shared stretch, and Q22/Q37 read "a lawful plant must commit". If the session reads the doubled trace as lawful input, these 5 are lawful-input refusals (MAKE-IT-SUCCEED, M0-a-05 / M0-c-02), and the census is 40, not 35. The item applies its declared rule (C-0342 (2), (3)) consistently, so this is the session's ruling to make, not a defect of the suite. | `ep01.ts` `lawfulPlant`, PINNED.S5a.coincident; `probe.jsonl` (the 5 seeds: `batchCommitted` false, refused-safe) | the session (N-58 ruling); M0-a-05 | CONFIRMED (facts); the classification is the session's |
