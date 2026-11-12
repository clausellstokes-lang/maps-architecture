# Step 11 — THE LADDER: P′ (X laid, no rule) with the construction as its second rung

THE CODE (`kerb.LAD.ts` → ladder-kerb.diff against S20's kerb.ts; `bandUnion.LAD.ts` → ladder-bandUnion.diff against the
head's bandUnion.ts; mirrors probeLD/ (counters) and treeLD/ (the suite)):
- `kerb(F)`: rung 1 = the lay of X (P′ as step 10 builds it: X handed to the engine, the view with its own work, simple-loop
  and `whole` read-back, the placeholder entity; NO rule R, no P0, no snap — X as exactRegionOfKey gives it); if the lay
  refuses (any engine refusal), rung 2 = `constructionRead(F)` (today's readKerb body) and its kerb is served.
- S9 (`bandCore`, so corridorUnion and bandUnion): rung 1 = the engine on X reads; if the op refuses, rung 2 = the SAME op
  again with every read the construction's (a module flag makes readKerb answer `constructionRead` while it runs).
  A lay calls the engine without the ladder. CONFIRMED BY THE CODE that rung 1's writes are undone before rung 2: every
  refusal inside bandCore's loop returns through `rollback(t, save, …)` of the op's own savepoint — with one exception:
  `if (!dropSpurs(…)) return overLimit(t)` (a work-limit refusal) dooms the batch without a rollback; the ladder then takes
  no second rung (`t.failed` set; counted `opsSkipped`: 0 in every run).

## 1. B-FUZZ at seed 20261112 — results/step11/bfuzz.log, bfuzz.lstats.json
Command: from probeLD/plat, `P2B_LSTATS=… PLAT_FUZZ_SEED=20261112 corepack pnpm exec vitest run --maxWorkers=1
--silent=false --project kernel packages/kernel/test/arr/bands/bfuzz.test.ts` — 3/3 GREEN.
    B-FUZZ bands: 10000 networks, 9997 committed; refusals per operation {"kerb":{"insertChain":0,"own":0},"corridorUnion":{"insertChain":2,"own":1},"bandUnion":{"insertChain":0,"own":1}} …; by cause {"corridorUnion":{"own":1,"replays":2},"bandUnion":{"own":1}}; closings {"chord":0,"along":27,"pinned":2,"folded":2,"longestChordCm":0}
    B-FUZZ bands (widened): 2000 networks, 2000 committed, 732 faces with a hole; refusals per operation all 0; closings {"chord":0,"along":5,"pinned":0,"folded":20,…}
| refused NETWORKS | BASE | P | P′ + R+ | **the ladder** |
|---|---|---|---|---|
| main / widened committed | 9 984 / 1 987 | 9 985 / 1 999 | 9 994 / 1 989 | **9 997 / 2 000** |
| networks refused | 34 | 45 | 24 | **4** |
| … that BASE commits | – | 37 | 20 | **0** |
| BASE-refused networks the ladder commits | | | | **30 of 34** |
**THE BAR "no network BASE commits is refused" HOLDS.** The 4 the ladder refuses BASE (and P) refuse too: corridorUnion
'own' "a kept face of the dry-run holds a point of a part deeper than an insertion moves a boundary point" (KEPT_DEEP:
the construction's own post-condition at rung 2), bandUnion 'own' "a part edge no route laid crosses a face of F deeper …"
(UNLAID_DEEP, rung 2), and two corridorUnion 'no route … keeps clearance' (both rungs). The kerb row: 0 refusals (a read
refuses only where both rungs refuse: 0).
By rung (the whole run, bfuzz's own reads and ops; replays of refused cases included): **reads rung 1: 28 673, rung 2: 9,
both refused: 0; ops rung 1: 22 654, rung 2: 44, both refused: 4.** The 9 rung-2 reads are the 9 lay refusals of step 9
(8 'no route', 1 dangling tip); the 44 rung-2 ops are the P / P′ commit refusals (29 bandUnion, 15 corridorUnion) and the
widened dangling tip, each now committed by the construction.

## 2. The harness: S8 ≡ S9 — results/step11/s9/LD-*.json (`probes/s9b.ts --mode lay` on probeLD)
| run | cuts / blocks (BASE) | exact share (BASE) | beyond | max cm | reads rung 2 / ops rung 2 | S8 / S9 refused | 'unresolved' | lay vs X beyond 73.5 (thin) / thicker | non-exact blocks |
|---|---|---|---|---|---|---|---|---|---|
| fusion 1 TEST | 105 / 103 (105 / 103) | **0.973** (0.964) | 0 | 20.62 | 0 / 0 | 0 / 0 | 0 | 68 (68) / 0 | bz9accnftq4f6 20.62 (BASE 19.21), 4tcyysa2pjw37 1.41 (BASE 1.41), ajgw6pd6x7wxa 0.80 |
| fusion 2 TEST | 105 / 99 (108 / 103) | **1.000** (0.991) | 0 | 0 | 0 / 0 | 0 / 0 | 0 | 67 (67) / 0 | none |
| integrated 1 TEST | 167 / 174 (170 / 176) | **0.983** (0.961) | 0 | 19.75 | 0 / 0 | 0 / 0 | 0 | 167 (167) / 0 | 7rcep04waf4zz 1.13 (BASE 1.13), arwexc9jr6hr4 19.75 (BASE 18.44), 5n4dj7k2avcpd 0.80 |
| integrated 2 TEST | 166 / 171 (166 / 170) | **1.000** (0.989) | 0 | 0 | 0 / 0 | 0 / 0 | 0 | 150 (150) / 0 | none |
| fusion 3 CITY | 1 203 / 1 051 (1 207 / 1 057) | **0.998** (0.987) | 0 | 3.61 | 0 / 0 | 0 / 0 | 0 | 546 (546) / 0 | 83e99n49a18tv 3.61 (BASE 3.61), 48hrv6xt8h2e0 1.00 |
| integrated 4 CITY | 1 373 / 1 303 (1 373 / 1 310) | **0.999** (0.989) | 0 | 2.15 | 0 / 0 | 0 / 0 | 0 | 825 (825) / 0 | 837bernbadxhq 2.15 |
**No read and no op fell to rung 2 at any harness seed: the figures are P′'s (step 8) exactly.** Every non-exact block's
difference is thin (0.4 – 9 cm thick); the blocks not non-exact under BASE (ajgw6pd6x7wxa, 5n4dj7k2avcpd, 48hrv6xt8h2e0,
837bernbadxhq — the last unchecked against BASE's i4 list) differ by one sliver 'planned, not committed' 0.4 – 1 cm thick
(39 – 898 cm²): the lone lay against the district's commit, a hot pixel apart. Repeats of a key: 235 / 255 at CITY, laid
alike every time. Needle refusals 1 (f3), 2 (i4), 2 (i2 TEST); needle-floor reads refused: 0.
Cost (source mode): a read = the lay's X 3.62 ms + the lay 8.33 ms = **11.95 ms** (fusion 3; integrated 4: 3.50 + 7.92 =
11.42 ms); 6.0 / 5.5 insertChain and 286 / 260 work units a lay; **S8 34.5 ms a cut** (41 526 / 1 203; integrated 4: 36.8)
— against P 21.0, P′ 42.2 (step 8, a busier box) and the construction 98.0 (step 6).

## 3. A face read on rung 1 whose district commits on rung 2 (and the reverse) — results/step11/q3.log, q3-table.txt
`probes/p2b-ladder3.test.ts` on probeLD over the 46 distinct networks P refused or P′'s lay refused (results/step11-inputs.json):
per face the lone ladder read in an L1 batch, then corridorUnion (the ladder) at L2; the read's kerb against the face's
committed blocks (BandResult.blocks inside it; F itself where `whole`): observer.ts `hausdorffFast`, and every piece of
the two-way difference judged thin (erosion by 13 cm empty). (corridorUnion only — bandUnion has no lay.)
- corridorUnion ops: rung 1 on 30 networks, **rung 2 on 13**, both refused on 3.
- **Faces read on rung 1 (the lay of X) in a district committed on rung 2 (the construction): 44 faces in 13 networks.**
  Hausdorff: 0 on 23; ≤ 1 cm on 3; 1 – 73.5 cm on 16; **over 73.5 cm on 2 (299.0 and 514.05 cm)**. **Every difference
  piece thin: 44 of 44.** The large two are needles: X's lay keeps a sliver along F's boundary that the construction's
  commit attracted away (or the reverse) — plan and commit then differ beyond the bound in Hausdorff, by a thin piece.
- **The reverse — a face whose lone lay fell to rung 2 while its district commits on rung 1: 2 faces** (networks `{a 9977,
  b 7967, hw 17}, {a 8915, b 31, hw 19, …}` — Hausdorff 0 — and `{a 3776, b 8026, hw 1}, {a 12880, b 7972, hw 253, …}, …`
  face 1 — **406.67 cm**, thin).
So THE LADDER'S PRICE: where the two rungs differ for one district, S8 ≡ S9 can break the `beyond` bound by a needle's
length (2 + 1 faces of 46 networks here), though never by a thick piece.

## 4. Q152's six and M0-a-06's three tx files under the ladder (the suite's chunks 001 and 002 — results/step2/LD/001.json, 002.json)
- **Q152's six: all six RED**, with the same first assertions as under P, P′ and P′ + R+ (step2/{P,L,R}/001.json): closing's
  shrunk counterexample of seed 20261011 (`expected 'none' to be 'taken'` — LastRead.faithful: no faithful read on the
  served path), closing's seed 20261011 draw 1109 (`expected [] to match … kind: 'along'` — the planted outline's along
  closing no longer happens), dryrun's draws 389 and 1109 (`wholeBand [1, 3]` for `[3]`), hardening-s15's network 561 (a
  nesting ring literal), restage's N1 and N2 (the restaged read's kerb literals). None goes green; each pins the
  construction's served read (re-point to `constructionRead`) or a literal on X (re-judge).
- **kernel/test/tx: cost.test.ts GREEN, oracle.test.ts GREEN, savepoint.test.ts RED** (both the kernel and the
  kernel-tiny project): :425 'S8 line 4 (d): the frame observer over named frame shapes — a kerb read inside an op …'
  `expected 0 to be greater than or equal to 2` — `clean('dry-run', 2)`: a kerb() read under the ladder opens the LAY's op
  frames (opSave), not 'dry-run' frames (support.ts classes a frame 'dry-run' by `dryInsert` on the stack), except where it
  falls to rung 2. Under P′ (no rule) all three were red (savepoint :471 and cost :171 'lay: the face has no owner' before the
  placeholder; oracle :402 0 dry-run frames); under P′ + R+ cost green, savepoint :425 and oracle :402 red.
