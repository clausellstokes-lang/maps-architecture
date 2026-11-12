# Step 9 — THE RISING 'replays' CLASS, P′'s B-FUZZ, and the reviewer's counts (review-2 S-1, S-2, S-3, S-7, S-8)

Seed 20261112 everywhere, PR size (10 000 main networks + 2 000 widened). Mirrors: base/ (BASE), tree/ (P), treeL/ (P′
pure: pprime.diff = kerb.Pprime.ts against S20's kerb.ts), probeR/ (P + a resolution rule chosen by the environment
variable P2B_RULE). Command form: `scripts/bfuzz-run.sh <mirror> <tag> [VAR=value]` = from <mirror>/plat
`PLAT_FUZZ_SEED=20261112 corepack pnpm exec vitest run --maxWorkers=1 --silent=false --project kernel
packages/kernel/test/arr/bands/bfuzz.test.ts`; logs results/step9/bfuzz-<tag>.log.

## 1. B-FUZZ BANDS under P′ beside BASE and P (one seed)

| census (main family) | BASE (step4/bfuzz-B.log) | P (step2/P/001.log) | P′ first run (step9/bfuzz-Pprime.v1.log) |
|---|---|---|---|
| committed | 9 984 | 9 985 | 9 985 |
| kerb: insertChain / own | 11 / 0 | 0 / 0 | 0 / **8** |
| corridorUnion: insertChain / own | 16 / 0 (no-route 2, replays 5, displaced 7, merged 2) | 15 / 0 (replays 15) | 15 / 0 (replays 15) |
| bandUnion: insertChain / own | 5 / 0 (displaced 3, no-route 1, replays 1) | 29 / 0 (replays 29) | 29 / 0 (replays 29) |
| closings chord / along / pinned / folded | 0 / 6 / 0 / 0 | 0 / 27 / 2 / 2 | 0 / 27 / 2 / 2 |
| widened: committed; kerb / corridorUnion / bandUnion | 1 987; 12 / 12 + own 1 / 0 | 1 999; 0 / own 1 / 0 | (stopped: see below) |

- **S-1 CONFIRMED.** P′'s S9 is P's S9 (readKerb = X): corridorUnion 15 and bandUnion 29 'replays', identical to P.
- **LAY READS REFUSE** — the kerb row under P′ is **8 'own' refusals** (bfuzz classes them 'own': its replay of a kerb read
  is the construction's dry run, which does not refuse there), every one the door's own message, e.g. `E_INVARIANT insert:
  no route from (0, 1040) to (0, 1729) keeps clearance (§3.10) within the fidelity bound (N-43)`; the 8 networks are 8 of
  the 15 that corridorUnion refuses (the same outlines, laid face by face). The construction's read refused none of these
  8 (BASE refused 11 OTHER networks' reads). The main property fails on its own cap (`refusals.kerb.own ≤ 1`: 8).
- **The P′ widened family FAILED its property on the 12th network** (first run): a lay read returned a ring that is not
  simple (bfuzz.test.ts:110 `simpleRing`) — the read-back took the L2 block's face walk as one ring, and a walk carries a
  hole touching the outer ring at a vertex as a loop of it. FIXED in the prototype (the walk split by `simpleLoops`,
  `unspiked`, canonical) — and the review's S-2 fix applied at the same time (below); the second P′ run
  (results/step9/bfuzz-Pprime.log) is: SEE THE ADDENDUM AT THE END.

## 2. THE RISING CLASS DISSECTED (results/step9/rising-table.txt; dissect-P.log, dissect-B.log)
`probes/p2b-dissect.test.ts` (in probeP and probeB; `P2B_INPUTS=results/step9/inputs.json`, the 71 distinct refused
networks of the P and BASE runs): each network rebuilt, corridorUnion at L2 then bandUnion at L3 exactly as bfuzz runs
them; for a refusal 'no route from (x1, y1) to (x2, y2)', every outline piece of X (outlinePieces of the op's own read) with
a point within 60 cm of those ends (or 30 cm of the segment), and its geometry: shortest edge, its vertices' distance off F's
boundary (beyond 1 cm), to another piece, the thickness 2·area⁄perimeter of the X ring holding it, a spike tip on it (two
neighbours nearer than 26 cm to each other while it stands farther from their chord).
Joined: **37 networks refused under P (and P′) that BASE commits** (P refuses 45: 37 + 8 BASE refuses too; BASE refuses 26
that P commits). Their classes (a network may carry several):
| shape class of the refused pieces | networks |
|---|---|
| a vertex off F's boundary but within attractCm of it | 32 |
| a thin component (X ring 2A/P < 26 cm) | 32 |
| an edge shorter than minEdge (25 cm) | 29 |
| a spike tip | 18 |
| all four at once | 17 |
| none of these (smallest feature 95.7 cm) | 1 |
| the widened own refusal (a dangling tip, N-57 (2); no piece near the point) | 1 |
Smallest feature per network: 1.7 – 13.4 cm in 33 of 37 (21.8 cm in one; 95.7 in the one outside the classes). The
typical case (network 2: `[{a 6794, b 7995, hw 10, knots [42, 7]}, {a 14271, b 45, hw 4}, {a 15684, b 8020, hw 1, …}]`):
face 2 is a sliver triangle (0, 316) – (36, 349) – (0, 1729) along the frame; X there is the 14 cm-wide needle
`0,1040 14,1050 0,1575`, laid as an open piece whose every vertex stands within attractCm of the frame — no route keeps
clearance; the next face's piece has 4 cm edges `0,1733 4,1733 4,1729`. BASE's construction laid its dry run through the
same door and was attracted: it never served those needles, so its commit never tried to lay them.

**THE PURE RESOLUTION RULES** (probeR; X replaced by the rule's output before it is served and laid; the rule lives in
`readKerb`, so S9 lays the same X′ — under P′ the lay and the commit both use it):
(a) consecutive vertices nearer than minEdge (25 cm) merged; (b) components thinner than attractCm (2A/P < 26 cm) removed,
and spikes cut off — repeatedly, a vertex whose two neighbours stand nearer than attractCm to each other while it stands
farther from their chord than that is dropped (a needle is eaten from its tip down to where it is 26 cm wide); (c) (b) then
(a).
| census (main / widened) | BASE | P | rule (a) | **rule (b)** | rule (c) |
|---|---|---|---|---|---|
| committed | 9 984 / 1 987 | 9 985 / 1 999 | 9 992 / 1 999 | **9 996 / 1 999** | 9 995 / **2 000** |
| corridorUnion replays (main) | 5 | 15 | 7 | **4** | 4 |
| bandUnion replays (main) | 1 | 29 | 12 | **3** | 3 |
| all insertChain refusals, main (kerb + corridorUnion + bandUnion) | 32 | 44 | 19 | **7** | 7 |
| own refusals (main + widened) | 1 | 1 | 5 on 3 networks, all RING_CROSSES (merging crossed a ring) | 1 (the dangling tip) | 3 on 2 networks, all RING_CROSSES |
| networks refused | 34 | 45 | 22 | **8** | 9 |
Logs: results/step9/bfuzz-rule-{a,b,c}.log. **Rule (b) brings the class BELOW BASE**: of the 37 rising networks it leaves 3
(+ the widened dangling tip); its 8 refused networks are all refused by P, 4 of them by BASE too. Rule (a) alone halves it
and adds self-crossing rings on 3 networks (merging vertices 25 cm apart can cross a ring: an own refusal); (c) = (b) plus (a)'s
crossings.
**WHAT IS NOT A RESOLUTION PROBLEM** (the 3 left under rule (b)):
- 2 networks (corridorUnion: `no route from (4000, 4000) to (3762, 0)` and `… to (3882, 0)`): X's pieces run with vertices
  3 – 12 cm off F's boundary (the frame) — 'a vertex within attractCm of F' — which (b) does not touch; a rule snapping such
  vertices onto F's boundary (or dropping them) is the obvious (d); not tried.
- 1 network (bandUnion at L3: `{a 3698, b 7999, hw 22}, {a 11642, b 5116, hw 596, knots [597, 596]}, {a 14212, b 42, hw
  26}`, `no route from (4000, 3707) to (3795, 1279)`): X's band pieces have no feature under 95.7 cm and no vertex within
  146 cm of the L2 content; but (4000, 3707) is a vertex of the L2 KERB corridorUnion committed just before, and the band
  piece `4000,3853 → 3805,1271` runs beside that L2 edge `4000,3707 – 3848,1981` at a shallow angle. **X does not read L2
  content** (by design); the L3 band commit must keep clearance from it. BASE's L3 read was a dry run that met the L2 kerb
  and was attracted to it. This is a missing input of X for bandUnion over a committed corridor, not a resolution problem.

### ADDENDUM — P′'s second B-FUZZ run (simple read-back rings, S-2's F-own-ring fix; results/step9/bfuzz-Pprime.log)
    B-FUZZ bands: 10000 networks, 9985 committed; refusals per operation {"kerb":{"insertChain":0,"own":8},"corridorUnion":{"insertChain":15,"own":0},"bandUnion":{"insertChain":29,"own":0}} …; by cause {"bandUnion":{"replays":29},"kerb":{"own":8},"corridorUnion":{"replays":15}}; closings {"chord":0,"along":27,"pinned":2,"folded":2,"longestChordCm":0}
    B-FUZZ bands (widened): 2000 networks, 1999 committed, 732 faces with a hole; refusals per operation {"kerb":{"insertChain":0,"own":1},"corridorUnion":{"insertChain":0,"own":1},"bandUnion":{"insertChain":0,"own":0}} …; closings {"chord":0,"along":5,"pinned":0,"folded":18,"longestChordCm":0}
The widened property now passes (every laid ring simple); its one lay refusal is the dangling-tip network corridorUnion
refuses ("outline: piece 0 of the face 3 ends on a dangling tip at (1149, 2640)"), now refused at plan time too. The main
property still FAILS on the kerb own cap (8 > 1): **9 lay-read refusals in all (8 + 1): on 7 networks corridorUnion (the
S9 commit of all faces in one op) refuses too, with the same cause; on 1 corridorUnion commits but bandUnion (L3) refuses;
and on 1 (`[{a 3776, b 8026, hw 1}, {a 12880, b 7972, hw 253, knots [363, 339]}, {a 4175, b 7971, hw 268, …}]`, 'no route
from (4000, 3972) to (3776, 0)') the LONE LAY REFUSES WHILE THE DISTRICT'S COMMIT SUCCEEDS (review-2 S-7's first
direction, seen once in 12 000). The reverse — the commit refusing where every lay read succeeded — holds on 8 of corridorUnion's
15 refused networks (their faces' lone lays succeed; the op over all faces refuses). The construction's read refused none of
the 9.** BASE's own kerb refusals (11 + 12) are dry-run 'no-route / displaced / merged' on other networks, which P′ commits.

## 3. The reviewer's counts (results/step9/s9/*.json; `probes/s9b.ts [--mode lay]` on probeL / probeP / probeB, scripts/laneT.sh)
P′ here is the prototype WITH the two fixes above (read-back rings split into simple loops; S-2: a `whole` face served as
F's own L1 walk, never X).
| run | P′ exact share | beyond | lay reads | lay refusals | S-2: lay reads on a face read back `whole` (of them X ≠ F's own ring) | S-8: lay reads differing from X by a piece ≥ attractCm thick | S-7: S8 'unresolved' rungs (BASE / P / P′) | repeats of a key / laid differently |
|---|---|---|---|---|---|---|---|---|
| fusion 1 TEST | 0.973 (109/112) | 0 | 232 | 0 | 0 (0) | 0 | – / – / 0 | 11 / 0 |
| fusion 2 TEST | 1.000 (112/112) | 0 | 240 | 0 | 0 (0) | 0 | – / – / 0 | 19 / 0 |
| integrated 1 TEST | 0.983 (175/178) | 0 | 376 | 0 | 0 (0) | 0 | – / – / 0 | 26 / 0 |
| integrated 2 TEST | 1.000 (178/178) | 0 | 385 | 0 | 0 (0) | 0 | – / – / 0 | 36 / 0 |
| fusion 3 CITY | 0.998 (1 233/1 235) | 0 | 2 747 | 0 | 0 (0) | 0 | 0 / 0 / 0 | 235 / 0 |
| integrated 4 CITY | 0.999 (1 422/1 423) | 0 | 3 132 | 0 | 0 (0) | 0 | – / – / 0 | 255 / 0 |
- **S-2:** no face is read back `whole` at these seeds (S8's faces all carry spines), so the served-X-instead-of-F case
  never occurs here; the prototype now serves F's own rings there regardless.
- **S-7:** S8's kerb-caused 'unresolved' rungs (bentCutFabric's `rungs.push({ rung: 'unresolved', outcome: 'block', why:
  kr.error })`, counted from the infill report) are 0 under BASE, P and P′ at fusion 3 CITY and 0 under P′ at every seed
  run; no lay read refused at any harness seed. The lone-lay / district-commit disagreement exists in B-FUZZ (section 1):
  one network where the lone lay refuses and both commits succeed; eight where corridorUnion refuses and every lone lay
  succeeds.
- **S-8:** every lay read that differs from X (2 659 of 2 747 at fusion 3; 3 005 of 3 132 at integrated 4) differs by
  pieces thinner than attractCm only — 0 reads with a thicker piece, at every seed (so no band face was read back as a
  block in these runs: a wrong read-back would differ by a band's width).
- **S-3:** CONFIRMED by the code: the prototype's `layRead` refuses `E_INVARIANT lay: the face has no owner` where F has no
  owner (it takes the outline rows' entity from F's owner); the P′ suite (savepoint.test.ts :470) shows its effect — see
  step2-redlist.md. (A real P′ needs a placeholder entity for the undone rows.)
- **S-9** (X computed twice a lay): true of the prototype (readKerb, then bandCore's own readOn).
