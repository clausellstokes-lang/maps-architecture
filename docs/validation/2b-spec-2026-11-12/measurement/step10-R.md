# Step 10 — R+ (the v2 design's rule, section 11, with review-3's T-1, T-2 (P0), T-3, T-8) measured: M1 – M4

THE RULE AS RUN: `kerb.R.ts` (diff against S20's kerb.ts: `r.diff`; `kerb.R-asw.ts` = R as section 11 writes it, not
run): in `readKerb`, X ← R+(X, B) with B = `f.rings` (the read's own L1 route rings: spine centre lines and bridges
included), so the lay lays R+(X) and S9 commits R+(X). The lay (P′) as v2 3.3: its read HANDED to its engine (readKerb
returns the handed KerbRead for its face while the engine runs: no second X), a view with its own work from 0, `failed`
null, level max(2, t.level); an unowned face laid under the placeholder entity 'kerb-lay:placeholder'; the read-back as
step 9's second run (simple loops; a `whole` face → F's own rings). Mirrors: probeRR/ (with the inert counters) and
treeR/ (for the suite). `P2B_SERVE=x` serves P + R+ (no lay), the default P′ + R+.

WHERE SECTION 11 / REVIEW-3 COULD NOT BE TAKEN AS WRITTEN (findings; what I did):
1. **T-3's radius fails T-3's own pin.** Erosion by A/2 − 2·HOT_PIXEL_CM − 2 = **9.58 cm** calls a 2000 × 26 cm strip NOT
   thin (also 25 cm; 19 and 20 cm thin) — results/step10/strips-pin.txt (probes/strips.ts, the kernel's bufferParts and
   exactRegion). Erosion by **A/2 = 13 cm** gives 26 thin, 27 not (and 13.4 cm the same). **The runs use 13 cm**
   (`R_EROSION_CM`; the formula kept as `R_EROSION_FORMULA_CM`). Thinner radii only make more things "not thin".
2. **The erosion test leaves lattice residue.** On a sliver about 26 cm wide, `exactRegion(piece, bufferParts(…, 13))`
   leaves a residue ring under 1 cm wide (e.g. the triangle (1217, 2225) (2169, 3987) (2168, 3987) inside the piece
   `1180,2183 1226,2215 2184,3988 2185,4000 2161,4000`; probes/thick.ts) — so "empty" fails on pieces whose inscribed disc
   is ≈ 26 cm. P1 is conservative because of it (keeps some 26 cm components); the "every difference piece thin" count
   below is inflated by it (see the X Δ R(X) row).
3. **T-1's "meet B only at points within 1 cm of B"** is read as: no proper crossing (exact) of a moved vertex's two edges
   with any edge of B, and each such edge's midpoint inside F or on its boundary (exact winding on the half-integer
   midpoint). Moves undone for this reason are counted (`undoneLeavesF`).
4. **T-8's slack** π·(A/2)²·max(0, h − 1) is an area; added to the area2 side as 2·π·(A/2)²·max(0, h − 1).
5. **S's order**: the pass's vertex order is read once at its start (y, x, ring, index), each vertex then addressed by
   identity (a moved or dropped vertex keeps or loses its turn); P0 and P2 re-read the order after every drop, as written.
6. **"Direction" for the start / direction test**: reversing a ring flips its orientation (an outer ring would read as a
   hole), so the 1 % sample rotates every ring's start to its middle vertex and REVERSES THE RING LIST's order.

## M1 (P + R+) and M2 (P′ + R+): B-FUZZ at seed 20261112 — results/step10/bfuzz-M1.log, bfuzz-M2.log
Command: from probeRR/plat, `P2B_SERVE=x|lay P2B_RCHECK=1 P2B_RSTATS=… PLAT_FUZZ_SEED=20261112 corepack pnpm exec vitest
run --maxWorkers=1 --silent=false --project kernel packages/kernel/test/arr/bands/bfuzz.test.ts` (both 3/3 green).
    M1  B-FUZZ bands: 10000 networks, 9994 committed; refusals per operation {"kerb":{"insertChain":0,"own":0},"corridorUnion":{"insertChain":6,"own":0},"bandUnion":{"insertChain":7,"own":0}} …; by cause {"bandUnion":{"replays":7},"corridorUnion":{"replays":6}}; closings {"chord":0,"along":24,"pinned":1,"folded":2,…}
    M1  (widened): 2000 networks, 1989 committed …; {"kerb":{"insertChain":0,"own":0},"corridorUnion":{"insertChain":0,"own":11},"bandUnion":{"insertChain":0,"own":0}}
    M2  B-FUZZ bands: 10000 networks, 9994 committed; refusals per operation {"kerb":{"insertChain":0,"own":1},"corridorUnion":{"insertChain":6,"own":0},"bandUnion":{"insertChain":7,"own":0}} …; closings {"chord":0,"along":24,"pinned":1,"folded":2,…}
    M2  (widened): 2000 networks, 1989 committed …; {"kerb":{"insertChain":0,"own":11},"corridorUnion":{"insertChain":0,"own":11},"bandUnion":{"insertChain":0,"own":0}}

| refused NETWORKS, seed 20261112 | BASE | P | rule (b) | **R+ (M1 = M2)** |
|---|---|---|---|---|
| main: kerb read / lay | 11 | 0 | 0 | 0 (M2: 1 lay) |
| main: corridorUnion | 16 | 15 | 4 | **6** |
| main: bandUnion | 5 | 29 | 3 | **7** (above BASE) |
| widened: kerb read / lay | 12 | 0 | 0 | 0 (M2: 11 lays) |
| widened: corridorUnion | 13 (12 + own 1) | 1 (own) | 1 (own) | **11 (all own: 'dangling tip')** |
| networks refused in all | 34 | 45 | 8 | **24** |
| … of them COMMITTED by BASE | – | 37 | 4 | **20** |
| committed main / widened | 9 984 / 1 987 | 9 985 / 1 999 | 9 996 / 1 999 | 9 994 / **1 989** |
**THE BAR "no network BASE commits is refused" FAILS under R+: 20 networks** (9 main, 11 widened); bandUnion's refused
networks (7) are above BASE's (5). R+ does WORSE than step 9's rule (b) (4 such networks). results/step10/refused-table.txt
lists all 24 with their BASE outcome, operation, message and shape.
- **A NEW CLASS: 11 widened networks refused with "outline: piece k of the face f ends on a dangling tip … off the
  face's boundary (N-57 (2))"** — all dead-end / bent / ring ways (antennae inside a face), all committed by BASE and by P,
  P′, rule (b). R+'s S snaps kerb vertices onto B, and B holds the antenna's own route (a bridge of F's walk); the outline
  piece then ends on the antenna instead of F's boundary as the closing reads it, and the post-condition refuses. (T-1's
  check does not prevent it: the edge does not cross B, it ends on it.)
- **T-4 (the dangling-tip network of step 9, (1149, 2640)) is COMMITTED under R+** (not in M2's refused list).
- **T-12, the shapes of the 13 main refusals left** (probes/p2b-dissect.test.ts in probeRR and probeB, results/step10/
  dissect-RL.log / dissect-RB.log; a network may carry several): an edge convergence at a shallow angle (< 10°, 1 – 26 cm
  apart, no vertex near) 12; a vertex-near configuration 5; other 6 (no piece feature under the classes near the
  refused segment). 4 of the 13 BASE refuses too. Every main one is 'no route … keeps clearance (§3.10) within the
  fidelity bound' — the door's own refusal on edges X lays almost along F's boundary (the frame) or along another piece:
  **R+ cannot reach a shallow convergence of two long edges** (S moves vertices, P0 / P1 / P2 drop them; none moves an
  edge whose ends are far from B).
- **Lay reads refused (M2): 12** (main 1, widened 11) — each on a network whose corridorUnion refuses (the 11 dangling
  tips; and 1 main). Lone lay refusing while the district commit succeeds: 0 here (every lay refusal sits in a network
  the commit refuses); commits refused where every lone lay succeeded: the main family's other corridorUnion refusals
  (6 − 1 = 5) and bandUnion's 7 (bandUnion has no lay).

THE RULE'S OWN FIGURES (M1; M2 identical within a read count — results/step10/bfuzz-M{1,2}.rstats.json, written every 200
reads: the last ≤ 199 reads uncounted):
| per read (143 400 reads) | value |
|---|---|
| reads R+ changed | 42 225 |
| S: vertices snapped / moves undone / of them because an edge would cross or leave F (T-1) | 79 052 / 40 138 / **10 628** |
| rings dropped (area 0 after a move) | 207 |
| P1: components removed / holes filled | 1 974 / 0 |
| P0: vertices dropped (straight-through rounding vertices) | 31 738 |
| P2: tips dropped, with P0 / without P0 | **538 / 518** |
| P2 drops at a corner whose apex angle is over 5°, with P0 / without P0 | **21 / 23** |
| passes in all / the most a read | 186 637 / 5 |
| R+ ms (all 143 400 reads) | 5 678 ms (0.040 ms a read) |
| **idempotent: R+(R+(X)) ≠ R+(X)** | **0** of 143 400 |
| **start / order dependence** (1 434 sampled: rings rotated, list reversed) | **0** |
| rule (b)'s 2A/P < 26 components / of them kept by P1 (holding a 26 cm disc) | 4 633 / **2 396** |
| pieces of X Δ R+(X) / not thin by the erosion test | 39 384 / **2 894** — the four examined are lattice residue (finding 2): a ring under 1 cm wide left by the erosion of a ≈ 26 cm sliver |

## M3 (the L3 variant: B also holds the edges of levels 2 … n−1 inside F at a read of level n ≥ 3)
The network `{a 3698, b 7999, hw 22}, {a 11642, b 5116, hw 596, knots [597, 596]}, {a 14212, b 42, hw 26}`
(results/step10/m3-net.log; P2B_R_L3=1): **still REFUSED** — bandUnion 'no route from (4000, 3707) to (3795, 1279) …
the design route's farthest vertex (4000, 3707), 11.0 cm off'. X's band pieces are 2-vertex chords 1 275 – 2 720 cm long
(`4000,3853 → 3805,1271`) with no vertex within 26 cm of the L2 kerb edge (4000, 3707) – (3848, 1981): the convergence is
between two EDGES; S (a vertex snap) cannot reach it. The whole B-FUZZ main family under M3: results/step10/bfuzz-M3.log
— SEE M3's addendum below.

### M3 addendum — the whole B-FUZZ population with the L3 variant (P2B_R_L3=1, P′ + R+; results/step10/bfuzz-M3.log)
    B-FUZZ bands: 10000 networks, 9994 committed; refusals per operation {"kerb":{"insertChain":0,"own":1},"corridorUnion":{"insertChain":6,"own":0},"bandUnion":{"insertChain":7,"own":0}} …; closings {"chord":0,"along":23,"pinned":1,"folded":2,…}
    (widened): 2000 networks, 1989 committed …; {"kerb":{"insertChain":0,"own":11},"corridorUnion":{"insertChain":0,"own":11},"bandUnion":{"insertChain":0,"own":0}}; closings {…"along":3,…,"folded":7,…}
Identical refusals to M2 (the same 24 networks); only the closings move by one (along 24 → 23; widened folded 8 → 7).
**The L3 variant commits nothing more**: the one network it was meant for stays refused (above).

## M4 (P′ + R+): S8 ≡ S9 at the four TEST seeds and CITY fusion 3 / integrated 4 — results/step10/s9/RL-*.json
Command: from probeRR/plat, `P2B_RCHECK=1 corepack pnpm exec tsx --conditions=plat-source ../../probes/s9b.ts --mode lay
--run <run> --seed <n> [--frame-ha 900 --walled-ha 30] --out …` (one process each, beside one other).
| run | cuts / blocks (BASE) | exact share (BASE) | beyond | max cm | S8 / S9 refused | lay reads / refused | kerb-caused 'unresolved' rungs | L2 edges at S8's end | lay vs X: beyond 73.5 (all thin?) / thicker piece | R+ vs X: difference pieces / not thin | R+ idempotent / order-free |
|---|---|---|---|---|---|---|---|---|---|---|---|
| fusion 1 TEST | 105 / 103 (105 / 103) | **0.973** 109/112 (0.964) | 0 | 20.62 | 0 / 0 | 232 / 0 | 0 | 0 | 65 (all) / 0 | 103 / 0 | 232 / 3 sampled, 0 |
| fusion 2 TEST | 105 / 99 (108 / 103) | **1.000** 112/112 (0.991) | 0 | 0 | 0 / 0 | 238 / 0 | 0 | 0 | 64 (all) / 0 | 128 / 0 | yes / 0 |
| integrated 1 TEST | 167 / 174 (170 / 176) | **0.983** 175/178 (0.961) | 0 | 19.75 | 0 / 0 | 374 / 0 | 0 | 0 | 151 (all) / 0 | 275 / 0 | yes / 0 |
| integrated 2 TEST | 166 / 171 (166 / 170) | **1.000** 178/178 (0.989) | 0 | 0 | 0 / 0 | 385 / 0 | 0 | 0 | 146 (all) / 0 | 237 / 0 | yes / 0 |
| fusion 3 CITY | 1 207 / 1 052 (1 207 / 1 057) | **0.9992** 1 238/1 239 (0.987) | 0 | 1.00 | 0 / 0 | 2 758 / 0 | 0 | 0 | 528 (all) / 0 | 1 663 / 0 | 2 758 / 28 sampled, 0 |
| integrated 4 CITY | 1 368 / 1 314 (1 373 / 1 310) | **1.000** 1 418/1 418 (0.989) | 0 | 0 | 0 / 0 | 3 107 / 0 | 0 | 0 | 713 (all) / 0 | 2 026 / 0 | 3 107 / 32 sampled, 0 |
Every bar of the M4 kind holds at every seed: `beyond` 0, the exact share ≥ 0.95 (and above BASE's), 0 lay refusals, 0
'unresolved' rungs (BASE 0 too at fusion 3, step 9), L2 empty at S8's end, every laid-vs-X and R+-vs-X difference piece
thin (by the erosion test at 13 cm: 0 exceptions here), R+ idempotent and order-free on every read / sample. Every block's
seed on a face of its own (seeds rows: notOnFace 0, shared 0, every run). Needle-floor reads that refuse (F1-5; counted in
bentCutFabric at its `kerb()` of each child): **0** at every seed (the counter never set). 'needle' refusals: fusion 3
1 (on a thin/small component: 1), integrated 4 6 (1), integrated 2 TEST 2.
THE NON-EXACT BLOCKS (P′ + R+: fusion 1 TEST 3, integrated 1 TEST 3, fusion 3 CITY 1) with BASE beside — results/step10/s9/NE-*.json:
(probes/s9b.ts now lists every non-exact block; results/step10/s9/nonexact.txt, NE-RL-*.json / NE-B-*.json)
| run | P′ + R+ non-exact blocks | BASE non-exact blocks |
|---|---|---|
| fusion 1 TEST | 3: bz9accnftq4f6 20.62 cm (BASE 19.21), 4tcyysa2pjw37 1.41 (BASE 1.41), **ajgw6pd6x7wxa 0.80** (not non-exact under BASE) | 4 |
| integrated 1 TEST | 3: 7rcep04waf4zz 1.13 (BASE 1.13), arwexc9jr6hr4 19.75 (BASE 18.44), **5n4dj7k2avcpd 0.80** (not under BASE) | 7 |
| fusion 3 CITY | 1: **48hrv6xt8h2e0 1.00** (not under BASE) | 16 (max 28.94) |
THE THREE BLOCKS NOT NON-EXACT UNDER BASE (exact there, or not a block of BASE's — block ids are content-derived and S8's
outcome moves; I did not check which): each differs by one thin sliver 'planned, not committed' of 39 – 129 cm², 0.4 – 0.5
cm thick (Hausdorff 0.8 – 1.0 cm): the lone lay and the district's commit put one vertex a hot pixel apart. Not dissected
further: the probable cause is the commit laying the district's faces together (another face's piece placed first) where
the lay laid the face alone (review-2 S-6/S-7's mechanism, at 1 cm).

THE RULE AND THE LAY, a read (S8's own reads; source mode, beside one other process):
| run | X ms | R+ ms | lay ms | insertChain / lay | lay work units / lay | S8 ms a cut (P′ step 8; P) |
|---|---|---|---|---|---|---|
| fusion 3 CITY | (15 954 − 2 285) ⁄ 2 758 = 4.96 | 2 285 ⁄ 2 758 = **0.83** | 24 525 ⁄ 2 758 = 8.89 | 6.33 | 275.8 | 50 369 ⁄ 1 207 = **41.7** (42.2; 21.0) |
| integrated 4 CITY | (19 008 − 3 744) ⁄ 3 107 = 4.91 | 3 744 ⁄ 3 107 = **1.21** | 26 655 ⁄ 3 107 = 8.58 | 5.79 | 251.7 | 61 799 ⁄ 1 368 = **45.2** (43.7) |
(X ms here = the lay's readKerb time less R+'s; R+'s P2-without-P0 and idempotence checks are excluded from its ms.)
R+'s own figures at fusion 3 CITY (2 758 reads): changed 2 627; snapped 304, undone 754 (T-1: 70); P1 components 3,
holes 0; P0 dropped 32 868; P2 dropped 22 with P0 / 24 without, at an apex over 5°: 10 / 10; at most 3 passes.
integrated 4 CITY (3 107): snapped 488, undone 1 051 (T-1: 56); P1 52 / 0; P0 33 319; P2 74 / 75 (over 5°: 11 / 11).
