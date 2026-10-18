# RULING draft N-57 — the cross-item reds of M0-c-06's 50-seed smoke (lane session/diagnosis-c06-smoke, 2026-10-11)

*(a Fable 5.1 diagnosis seat under J240/J244's ruling-seat pattern, the owner's zero-refusals rule J264 and the bedrock rule
J238; no code changed, no git command run — one read-only `git status --short` slipped into a shell pipeline at ~18:53Z,
its output discarded, recorded under CLEAN-ROOM rule 8; every probe in the scratch mirror `<scratch>/diag/plat` (cp -a of
plat/, relative pnpm links only, no path resolving into the real tree) with the probe `bench/probe/diag.ts` and one
record-only instrumentation of the mirror's `makeBlock` (an extra `spinesAtStop` / `rings1AtStop` field); outputs in
`<scratch>/diag/out/<run>-<seed>.{json,log}`. J284 and C-0320 named by the brief are not in the tree (PROGRESS ends at
J273, choices at C-0312); the builder's record is C-0312 and the BLOCKED checkpoint of 18:19.)*

## 0 How each seed was replayed

`derive(kind, seed)` of bench/src/fusion/runs.ts (the harness's own derivation, CITY), then the harness's `s8s9` (its L1 kerb
reads and its one-L2-batch-per-district `corridorUnion`), then `readKerb` of each named block's seed face (rings, route edges
with spine keys and half-widths, kerb rings, corridor_split chains) and the L2 face holding the seed, every ring vertex of
one ring farther than 1 cm from the other ring listed with the ways within 15 m and their mint order (`infill.live`). For the
integrated run S8 is replaced by a verbatim copy of `runS8`'s district loop that evaluates `seamPortalProblems` as the stage
does, records every problem with its geometry and RETURNS OK, so the derivation goes on and S8 ≡ S9 is measured on the
would-be output. Every replay reproduced the smoke's numbers exactly (block ids, distances, counts): the smoke is
deterministic and the findings are real, not pool or worker artefacts.


## 1 Finding (3) — FUSION 30 block:6eppwwjg267pw: the split block's second seed lies in a corridor (CONFIRMED)

Replay `<scratch>/diag/out/fusion-30.json` (derive 177 s; s8s9 reproduces the smoke: beyond 1, kerbReads 1, driftBeyond 2).
The block (mint 486, `how: stop`, 22-vertex stop kerb) took the deep-interior treatment `through_alley`: the spine
way:58xxd0cdnemv9 (mint 487, width 200.04 cm) split its L1 face into faces 198 (west) and 197 (east); the block record
carries two seeds, (−68331, −29476) in face 198 and (−66865, −28689) in face 197.
* Face 197's ring (10 vertices) runs along way:11 (hw 500) on the north, the alley 58xx (hw 100) on the west, the dead-end
  lane fawjwzgj72286 (hw 150) on the south, and THREE SPINELESS edges on the east/south-east ((−66566, −30715)→(−66387,
  −28811)→(−64885, −28852)→(−64819, −28154): the stand-in district's own coarse-face boundary). kerb(197) is one ring of
  8 vertices: a stem ≈ 8 m × 17 m plus a thin eastern arm 2 m wide; `readKerb` returns it with `ok`.
* The second seed is OUTSIDE that kerb (`sideOfRing` = out, by 9 cm beyond the kerb's top edge (−65831, −28531)→(−67256,
  −28762)): it lies inside way:11's band. The L2 face holding it after `corridorUnion` is face 1003 with ring
  [(−67343, −28270), (−67256, −28762), (−65831, −28531), (−64866, −28651), (−64857, −28552), (−64819, −28154), (−65915,
  −28017)] — way:11's half-corridor strip (every vertex at 400–500 cm from way:11 / way:10), not a block.
* Cause (code, bentCutFabric.ts `makeBlock` 962–983): the unsplit block's seed is `seedOf(kerbRings)` (the pole of
  inaccessibility of kerb(F), `localThickness`), but a split child's seed is `seedOf(canonicalRings(faceRings(run.p, 1, c)))`
  — the pole of the child's L1 FACE. Face 197's thickest part is the bar between way:11 and the spineless edge (5.8–8 m,
  of which way:11's 5 m band leaves a 0.9–2 m sliver), so the face's pole falls in the band. The first seed uses the kerb,
  the second the face: the record is inconsistent with its own definition ("a point inside each of its L1 faces (the
  inscribed circle's centre)", read by the harness and by S9 as "the L2 face holding the seed").
* Verdict: LAWFUL input (nothing in §4.6 forbids a child whose kerb is a stem plus a sliver); the WRONG value is the
  recorded seed, not the committed block: S9's blocks for both children equal kerb(F) of their faces (face 198: working ≡
  S9, Hausdorff 0; face 197's kerb is the 8-vertex ring the harness read). The harness's reading ("no working block read"
  → `beyond`, `kerbReads` 1) is the correct reading of a wrong record. OWNER: M0-b-03 (`makeBlock`).
* Fix shape: the child's seed from kerb(child) — read `kerb(run.o, c, spineWidthsOf(run.ctx.widths))`, take the largest
  component as `kerbFace` does, `seedOf` on it; a child whose kerb has no area (wholly band) contributes no seed and the
  block keeps the court record for it (detect-and-refuse stays for a slit, N-52 (4)). Pins: the smoke's face 197 ring with
  its three widths as a fixture (seed ∈ kerb(child) for every seed of every block; the harness's kerbReads 0 on fusion 30);
  a property over the fabric test faces: every `blockFaces.seeds[i]` lies strictly inside one ring of kerb(its L1 face).
  Shift: the `seeds` field of ≈ 9 133 / 51 310 split blocks per 50 seeds (fusion) changes value; no geometry, no way, no
  block face moves; `infill` is outside the model digest (C-0298 (6)) — no digest shift; M0-b-04's bentcut summaries carry
  no seed. Risk of a one-time output shift: none in committed geometry.

## 2 Finding (4) — the stop-kerb drift beyond the bound (CONFIRMED mechanism; no wrong committed block)

Replays fusion 30 (block:8ern91wcr4p11, 199.6 cm) and fusion 49 (block:63rwxr8gm4j28, 1 593.2 cm; block:dnzm4ncd3tdyf
74.0 cm) reproduce the smoke's numbers exactly, with working ≡ S9 at Hausdorff 0 on every one of them.
* WHAT S8 RECORDS AND WHEN: `blockFaces.kerb` is `fv.kf.rings[0]` at `makeBlock` — kerb(F) of the face as the ladder
  read it when the face stopped (`Run.kerbFace` → the kernel's `kerb(this.o, face, …)` on the district's open overlay),
  i.e. the kerb AT THE CUT; nothing re-records it at the block's commit or at the stage end (C-0237 (3), C-0270 (5)).
* WHAT CHANGES THE KERB LATER (fusion 30, face 904; the mirror's record-only `spinesAtStop` instrumentation): the spines
  at stop time and after S8 are IDENTICAL in route points and half-widths (way:d2rbq8evj319c hw 207.289 on the same
  straight line (−33499, 12906)→(−33442, 13302)→(−31327, 28001)→…; way:16 hw 300; way:0 hw 400; df30 hw 170.8); the
  face ring differs only by the T-junction vertices of five LATER lanes of the SAME district (mints 3324, 3339, 3343, 3350,
  3359 after the block's 3202) landing on d2rb, and three on way:16. Yet kerb(F) at the cut had its d2rb edge at 187.4
  (north corner (−31166, 27804)) to 158.2 cm (south tip (−32916, 15847)) from the centreline — 20 to 49 cm INSIDE the
  band — while kerb(F) after S8 has it at 206.8–207.6 cm on every vertex, pinned by the junctions' split feet
  ((−32332, 19559), (−31888, 22649), (−31554, 24968), (−31144, 27821)). So the kerb S8 planned and stopped on deviated
  from §3.7's kerb(F) = F − ⋃buffer by up to 2·attractCm along one unpinned 147 m edge (N-52's class (a), "a new strip
  corner pinning an attracted edge", measured here at 49 cm, not ≤ 39): the scratch overlay's attraction and merging of
  the band's long inner edge at its two end intersections (C-0212 (8)), with no vertex in between to hold it.
* WHY METRES: both drifted blocks end in a needle. Face 904's southern tip is the wedge of way:16 and d2rb (4° apart):
  the 49 cm edge offset moves the tip 199.6 cm along way:16's edge. Face 479 (fusion 49) is a 110 m triangle between two
  same-district lanes 3gkn (hw 171) and 0de4 (hw 164.4) converging at 0.8°: the stop kerb's needle ends where the two
  inner edges come within attractCm of each other ((−35650, 61438): 196.6 from 3gkn, on 0de4's edge; the stop edge from
  (−38307, 59499) is a chord 0.43° off 3gkn's edge), the working kerb's needle runs on to the split foot of the later lane
  c5xbt7g0j9wvg's T-junction (−34343, 62349) (174.8 / 164.8 cm from the two lanes), 15.93 m further — a ≈ 22 cm offset
  at 0.8° (22 / sin 0.8° ≈ 15.8 m). EVERY stop vertex lies within 1 cm of the working ring (the one-sided distance stop →
  working is 0.26 cm); the whole 1 593 cm is the working needle's extra length. fusion 30's 8ern91 also has 4 split-foot
  vertices 19–40 cm off the stop ring (class (a)).
* The other drifted blocks are the same figure (all replayed, all working ≡ S9 at 0): fusion 16 block:d7rhfb2zc3bp3
  (467.3 cm: stop tip (50021, −68426) 144.5 cm from lane fxjm (hw 160.6) on lane 19jw's edge; the later lane 0xmmp89qjj7zj,
  mint 3560 > 3558, pins the edge at (51247, −67598)); fusion 11 block:8fk3bgh0k73dt (149.5 cm: stop tip 158.9 cm from lane
  em21 (hw 163.5) on way:69's edge; later lane bhphb6ejsnx29, 4225 > 4179); fusion 22 block:0cgvty0w65ewh (299.0 cm: the
  working tip (−19323, −34498) at 158.9 / 160.4 cm from lanes 4xcq (hw 159.2) and ajgw (hw 160.75); later lane 014nfjybxg850,
  2413 > 2411); fusion 49 block:dnzm4ncd3tdyf (74.0 cm, the same at a 4-way corner); in every case the spines' points and
  half-widths at the cut equal the final ones (the mirror's `spinesAtStop`), the face ring gains only T-junction vertices. Integrated 36 block:c8na9d2ravyr6 (84.4 cm): the working ring's
  corner (30863, −28730) sits at 165.3 cm from lane d9ev (hw 185.6) on way:24's edge (300.5) — this time the FINAL kerb's
  corner carries the ≤ 2·attractCm attraction offset and the stop corner is 84 cm along the edge; the same class seen from
  the other side (working ≡ S9 at 0). The instrumented fusion 49 replay confirms it on the 15.9 m block: at the cut (arena version 24) lane
  3gkn's route was the 4 points (−35816, 54012), (−38207, 59360), (−31571, 64123), (−31433, 64222) at hw 170.98 and 0de4's its 4
  points at hw 164.4 — the same lines and half-widths as after S8, which only added the four T-junction vertices of lanes
  cev7, d60q, 2fp7 and c5xb to 3gkn's chain (the face ring 24 → 28 vertices).
* Verdict: LAWFUL. S9's committed block is kerb(F) of the final state on every drifted block (Hausdorff 0) — no wrong
  committed block anywhere in the 50 seeds (beyond 0 on all 100 runs apart from findings (2) and (3)). S8's record is
  right by its definition (the kerb at the cut). N-52 (1)'s "the stop kerb's drift … asserted within the same bound" is
  NOT met by re-recording at the stage end — that would make the clause vacuous (stop ≡ working by construction) and
  lose the only measurement of what S8 planned on — and it CANNOT be met by a Hausdorff bound at acute tips: a
  sub-degree needle turns a lawful ≤ 2·attractCm edge offset into metres. The number to bound is the edge offset.
  OWNER of the fix: M0-c-06 (measure.ts `s8s9`), with a notes row for M0-a-09's hardening KI (N-52 (1)'s exact-0 KI
  already covers "the read overlay and the commit see the same attractors"; the measured unpinned-edge offset is 49 cm).
* Fix shape (M0-c-06): the drift clause reads (i) the one-sided distance stop → working (every stop vertex and edge point
  within 2·√2·attractCm of the working ring: 0.26 cm here, 0 on most) — asserted; (ii) the sliver of working ∖ stop:
  for every working vertex beyond the bound from the stop ring, the width of the sliver at it (its distance to the stop
  ring measured perpendicular to the nearer working edge, or the area of the symmetric difference divided by half its
  perimeter) ≤ the bound — asserted; (iii) the Hausdorff distance stays REPORTED with the needle's length. A planted 1 m
  parallel shift of a whole edge still fails (i) and (ii). Pins: the two smoke blocks' stop and working rings as fixtures
  (both pass (i)/(ii) and fail the old Hausdorff), the planted shift, a synthetic 0.5° wedge. For split blocks `stopKerb`
  returns `final` so the drift is never measured there (C-0312 (1)'s "the child's kerb" is not implemented) — a gap to
  close in the same round: the child's stop kerb is kerb(child) at the split (recorded with the seed fix of §1).
  Shift: none (report fields only). Flag (M0-b-03, no ruling): a 0.8° wedge block whose kerb is a 16 m needle 10–26 cm
  wide is lawful under the floor rule (an OBB minor on a 110 m triangle) but is a block no later stage can use; the
  fabric's turned-frame / floor rungs do not see needle tips.


## 3 Finding (1) — INTEGRATED 20, 23, 39, 44: S8 refused whole by the seam-portals row (CONFIRMED; S8's cut wrong, the row right)

Replays `<scratch>/diag/out/integrated-{20,23,39,44}.json` with S8 copied into the probe so the problems are recorded with
their geometry and the derivation goes on. The whole stage is refused for ONE or TWO problems among ≈ 1 380 lanes and 130
seams a seed, and S8 ≡ S9 holds on the would-be output (seed 20: 0 of 1 434 beyond, drift beyond 0; seed 23: 0 of 1 424
beyond; seed 39: 0 of 1 432; seed 44: 0 of 1 470 — and the drift beyond 0 on all four). The refusal is the design's hard row (§5.3, C-0298) doing its job; the input is LAWFUL.
* Seed 20 — one `gap` on way:22 (an S4/S5 way, width 600, a seam spine of seam:cftwtksztpatj between districts
  47xb61jjvvnpd and dfmabwjq55k29): two `baseLane` portals OF THE SAME DISTRICT 47xb…, lanes mint 532 (portal:3gsfvhhhye3t9
  at (−19295, −45279), s = 44.2 cm along way:22, width 333.5) and mint 533 (portal:7hvtq15e5nfpc at (−19268, −45314),
  s = 0 — way:22's chain START vertex, shared with the way that continues it), 44.2 cm apart against a required gap of
  671.6 cm (2 × the wider lane). The planner's gap slide (`slideEnd`, planner.ts 829 / ladder.ts 140) reads the portals
  of the ONE spine the planned end lies on (`KerbSpine.portals` = `kerbPortals(…, wayId, portalAt)`, which keeps only
  portals whose vertex is a vertex of THAT way's chain); an end judged on the neighbouring way and landing on the shared
  boundary vertex never sees a portal 44 cm away around the chain boundary, while `portalInvariant` (rightly, §13.2
  "spaced by the portal gap" along each way chain) reads the shared vertex as s = 0 of way:22.
* Seed 23 — two problems: (i) a `gap` on way:52 (width 600; seam cftwtksztpatj of 2kzjx…/fw3g6…): portals of the same
  district 2kzjx…, lanes mint 327 and 328 (consecutive), at s = 13 268.2 and 13 378.4 — 110.2 cm apart against 644.1 (the
  second replay: lane 328's end is S5's junction:90, a junction row on way:52's chain through which no other way passes —
  the lane's `from` names it; `ladderOn` builds a fresh face view per item, so a stale portal list is excluded and the
  planner's end branch there is still to be traced);
  (ii) a `lane-end-without-portal`: lane way:b3fbe7pezkxd6 (district dh5m206kgqkcb, width 391) ends at (−2030, 35539),
  the junction vertex of way:2 (width 800, the district's seam spine, seam:73ceatyc9vgzs with sides 47xb…/dh5m…) and
  way:22 (width 600, in no seam here); the faces at the vertex belong to dh5m… (1326, 1289) and 47xb… (45). S8 typed the
  end as way:22's (its `spineIds[end.index]`, `portalSeam` → no seam → no portal) and the continuation rule
  (`continuationRefused`, bentCutFabric.ts 872: `bounding` read for the END'S spine only) admitted the crossroads on an
  interior spine — but the vertex is ON the boundary chain way:2 (step 10: "never across a district-boundary edge"), so a
  lane of dh5m… now meets the arterial at a vertex with no portal and no gap protection.
* Seed 39 — one `gap` on way:25 (width 600; seam cftwtksztpatj of 47xb…/6qkph…): the same figure as seed 20 — two
  portals of district 6qkph…, lanes mint 738 (portal:51x3x… at s = 62.4, a fresh S8 T-junction) and 739 (portal:10zs5… at
  s = 0: way:25's chain-start vertex (−30518, −22986), shared with way:5rtwr2ft1m83x and carrying S5's junction:126, which
  lane 739's record names as its `from` — a continuation onto a foreign junction), 62.4 cm apart against 680.3.
* Seed 44 — one `gap` on way:45 (width 600; seam 6ap2qt483stj1 of 1ddgq…/4n5jp…): portals of district 1ddgq…, lanes
  mint 202 (s = 106.1, a fresh T) and 203 (s = 0: way:45's chain-start vertex (5693, −53206), shared with the interior way
  6s48w43xr9dnp and carrying S5's junction:111, the lane's `from`), 106.1 cm apart against 656.0; every face at the vertex
  is 1ddgq…'s.
* Seed 20's second replay pins the planner path: portal 7hvtq… (lane 533, `from` = S5's junction:104) sits on way:22's
  chain-START vertex through which NO other way passes — way:22 is a dead-end S5 way whose tip the district face visits as
  a spike, i.e. an ANTENNA (§4.6 step 8, C-0237 (4)); `antennaCut` (ladder.ts 416–430) starts the lane AT the tip ("the tip
  itself the start junction") and slides only its far end `f` out of a portal gap, never the tip end `s`; `tryCandidate`
  then records the tip's portal via `antennaWay` (= way:22) in the seam — 44 cm from lane 532's portal. CONFIRMED path for
  the antenna variant. Seeds 39 and 44 are the other variant: the seam way starts at an S5 junction shared with an
  interior way (5rtw…, 6s48…), the lane's `from` is that foreign junction, and the end reached it as the interior way's
  end (a continuation onto a junction of a bounding chain, admitted because the end's own spine is interior).
* Confidence: the GEOMETRY of all five problems is CONFIRMED by replay (the two portals, their arc lengths, the shared
  vertex, the foreign S5 junction, the lanes' districts and mint order). The planner branch that let the end land there
  — the gap slide reading the adjoining interior way's portals, the continuation onto the foreign junction, or an
  antenna root (`antennaCut` slides only its far end) — is CONFIRMED for the antenna variant (seed 20) and PLAUSIBLE for the junction variant (seeds 39, 44, 23's
  continuation) from the code (planner.ts 829–866, ladder.ts 140–160 and 416–430, bentCutFabric.ts 690–715, 802–907), to
  be pinned by the fix round with the planner's end kind traced; in every reading the per-spine view is the common factor.
* Common mechanism: at an end vertex shared by two or more way chains (a way boundary, an existing junction), S8's three
  per-spine readings — the portal seam (`portalSeam(run, spineWay, v)`), the gap slide and the continuation verdict — use
  the planner's one spine, while the row (and the design's intent) read every chain through the vertex. The fusion run
  has no seams (`seams: []`), so its row is vacuous: 0 of 50 there, 4 of 50 integrated seeds (8 %). Not N-9 / Q15's
  class (the row unevaluated; C-0298 (3)'s multi-seam `lane-end-without-portal`): a new class the evaluated row found on
  the first 50-seed run of a real town set — the 9 base runs of C-0298 (5) never hit it.
* Verdict: the row is RIGHT (its arc-length reading is the §13.2 row's); S8's cut is WRONG at shared vertices; the
  input is LAWFUL, so under J264 (2) this is a defect to fix by making the stage succeed, not by softening the row.
  OWNER: M0-b-03 (planner.ts / ladder.ts `slideEnd`, bentCutFabric.ts `tryCandidate` end rows, `portalSeam`,
  `continuationRefused`; `kerbFace`'s `KerbSpine.portals`).
* Fix shape: (a) `antennaCut` slides (or refuses) its TIP end against the portals on the antenna's way exactly as the far
  end, and `kerbFace` gives each spine the portals of every way chain through its two end vertices too (arc length
  measured on the spine's own line through the shared vertex, i.e. negative or beyond-total positions clipped to the
  ends), so the slide sees a portal across a chain boundary; (b) at insertion, every way chain through the end vertex
  that bounds the district (seamsOfSpine non-empty with the district as a side) gets the portal record — `portalSeam`
  over all ways at `v`, not `spineWay` alone — and an end on a bounding chain's vertex whose spine was read as interior
  is refused as `continuation-boundary` (or slid) rather than admitted; (c) the stage-end row stays hard. Pins: the
  seeds-20/23 configurations as fixtures (a two-way seam run with a bend and a portal 44 cm past the bend; a lane end at
  an interior way's junction with a boundary arterial) — the planner slides or takes the next rung, the row holds, and
  the integrated smoke's four seeds complete S8; the fabric's existing seamPortalsRow tests unchanged. Shift: one-time,
  lane geometry on the affected seeds only (a lane end moves ≥ gap or the cut takes its next rung): 4 of 50 integrated
  seeds at CITY; the base fixtures (C-0298 (6)) should be re-stated by the round. The census's four `S8 refused whole`
  entries are lawful-input refusals (fix round), not to be kept.


## 4 Finding (2) — INTEGRATED 34 block:bjan449v4zkxj (431.7 cm) and 47 block:8byv4x0w5rw45 (157.9 cm): S9's L2 face is WRONG (CONFIRMED on both)

Replay `<scratch>/diag/out/integrated-34.json` (reproduces 431.74 cm; S8 ≡ S9 holds on the other 1 384 blocks).
* Face 871 (district face, mint 3293 `stop`) is bounded by way:71 (hw 400) on the south-east, by the dead-end lane
  way:1bzfw948gxbkz (mint 3288, width 327.7, hw 163.8; a T on way:71 at (54297, −48821), its `end` junction at (50618,
  −46881)) on the north-east, then by SPINELESS district-boundary edges from (50618, −46881) through (49823, −48814) …
  (45734, −60629), then lane 5vzp (hw 157.5). The lane's end vertex is a vertex of that spineless boundary.
* The WORKING kerb (S8's, read after S8; = the stop kerb, drift 0) runs along the lane at 163.1–163.9 cm ((53236, −48358)
  … (50580, −47042)), then (50557, −47030) — the point where the lane's round END cap (radius 163.8 about (50618, −46881))
  meets the boundary edge (50618, −46881)→(49823, −48814) (0.26 cm off it) — then along that boundary edge. kerb(F) is
  right: the lane's half-corridor strip is cut off by the kerb edge, the cap and the boundary.
* S9's L2 face holding the seed (face 5805, 45 vertices) is the block PLUS that strip: its ring runs along the lane's
  CENTRELINE ((54297, −48821), (53960, −48607), …, (50645, −46892), (50618, −46881)) — every one of those vertices 161–164
  cm off the kerb, the T vertex 431.7 cm — and carries the kerb edge (53872, −48745)→…→(50580, −47042) as a DANGLING
  chain walked forth and back ((50580, −47042) then (51261, −47336) again). The corridor_split at the T
  ((54297, −48821)→(53872, −48745)) is committed; the kerb piece's LAST segment, (50580, −47042)→(50557, −47030) — 26.0
  cm, its end the boundary contact — is missing, and the boundary edge is unsplit. Through that 26 cm gap the strip
  and the block are one L2 face.
* Seed 47 (`integrated-47.json`, reproduces 157.92 cm) is the same class: face 822's south edge is the dead-end lane
  way:ebz4hsk22v9mp (mint 3046, hw 157.5, `end` junction at (75866, −31708)) followed by spineless boundary edges; the
  working kerb runs along the lane at 157.5 to (75806, −31560) and reaches the boundary at (75831, −31554); S9's face 5350
  carries the kerb chain (72631, −32137)→…→(75806, −31560) DANGLING (walked forth and back) and runs along the lane's
  centreline (72653, −32291)…(75866, −31708), 155.6–157.9 cm off the kerb; the missing closing chord is 25.7 cm. Two
  blocks of 123 628 compared, both with a dead-end lane whose round end cap meets a spineless district edge.
* Cause: `corridorUnion` → `bandCore` (bandUnion.ts) commits the kerb's outline pieces off F's boundary as `kerb` edges by
  the kernel's own insertion, under attraction (attractCm 26) and minEdge (25): a closing chord of exactly attractCm,
  whose far end is the boundary contact, is attracted onto its own previous vertex and the contact is lost — N-52's class
  (b) ("the commit attracts a kerb piece's boundary contact … within attractCm", there measured as ≤ 73.5 cm of position
  error) here with a TOPOLOGICAL effect: an unclosed strip. The read (`readKerb`) and the commit disagree on the same
  geometry — exactly the exact-0 KI N-52 (1) left for the hardening phase, now shown to produce a silently wrong committed
  block (N-45 (a)) rather than a sub-bound re-snap.
* Verdict: the L2 face (corridorUnion's union) is WRONG; S8's working block is right; the harness's reading is right (the
  431.7 cm is the T vertex of the merged strip). LAWFUL input: a dead-end lane ending square on a spineless boundary is
  §4.6 step 7's "an end with no spine beyond it stays on its line" (C-0237 (10)); the round cap meeting the boundary at a
  grazing angle leaves a short last chord — ordinary geometry. OWNER: M0-a-09 (`bandCore` / `outlinePieces`, bandUnion.ts;
  the insertion of a kerb piece whose contact end is within attractCm of its last interior vertex).
* Fix shape: a kerb piece is committed with its BOUNDARY CONTACTS PINNED — the contact vertex is placed first (it lies on
  an F edge: a `splitThrough` of that edge), and an interior kerb vertex within attractCm of a contact is dropped before
  the insertion (the contact is the pinned one, never the reverse); a post-condition in `bandCore`: every open outline
  piece's two ends are vertices of F's boundary after the commit and every `kerb` edge separates a band face from a
  block face (a dangling `kerb` chain refuses the batch E_INVARIANT instead of committing a merged face: fail-safe,
  N-45). Pins: face 871's ring with its three widths as a fixture (corridorUnion's block ≡ kerb(F) at Hausdorff 0; no
  kerb edge with the same face on both sides); a synthetic dead-end lane whose round end cap meets a spineless boundary
  edge at 10–20° with the clipped last chord swept 20–40 cm (every case closes); the §13.2 contract test and the
  arr-bands oracle comparison with a dead-end spine on a spineless boundary. Shift: S9's committed blocks change only
  where a kerb piece's closing chord was lost (the smoke: 2 blocks of 60 424 + 63 204 compared); the committed pins of
  M0-a-09's oracle set may re-record (reported, never silently).


## 5 The 50-seed refusal census re-counted (from `<scratch>/c06/out50b/fusion/report.json`, the second smoke, 11 070 s)

| class | fusion (50 seeds) | integrated (50 seeds) | lawful-input? (J264) | route |
|---|---|---|---|---|
| S8 refused WHOLE (`bugs`, E_INVARIANT seam-portals) | 0 | 4 seeds (20, 23, 39, 44) — 1–2 `gap` / `lane-end-without-portal` problems each among ≈ 1 380 lanes | lawful input, S8's own cut breaches its row at shared way vertices (§3) | FIX ROUND M0-b-03; the row stays hard |
| S8 refused districts (`report.refused`) | 0 | 0 | — | — |
| S9 unions refused (corridorUnion) | 0 | 0 | — | — |
| kerb reads refused / no ring holding the seed | 1 (seed 30, the split block's second seed, §1) | 0 | lawful input, a wrong recorded seed | FIX ROUND M0-b-03 |
| S8 ≡ S9 beyond the bound (a wrong committed block) | 1 (seed 30 — the kerb read above, not a geometry miss) | 2 (seeds 34, 47 — S9's merged strip, §4) | lawful input, the kernel's commit loses a closing chord | FIX ROUND M0-a-09 |
| stop-kerb drift beyond the bound | 7 blocks on 5 seeds (11, 16, 22, 30 ×2, 49 ×2) | 1 (seed 36) | lawful; a needle-tip reading of a ≤ 2·attractCm edge offset (§2) | harness metric M0-c-06; hardening KI note M0-a-09 |
| corpus downgrades (roof = spine) | 3 of 1 597 district faces (seeds 28, 38, 47) | 5 of 2 419 (seeds 2, 28, 38 ×2, 47) | NOT re-run here (the reasons are not in the smoke's report; the bar holds at 0.19 % / 0.21 % ≤ 0.5 %); N-52 (3)'s spur class drained from 46 % / 32 % to this | KEEP as the descriptive corpus clause; the hardening census (M0-x-01) names the residual class |
| kernel downgrades, work-limit hits, unplaced, degraded | 0 | 0 | — | — |
| restarts, roads off N, lanes in a strip, cliff | 0 | 0 | — | — |

Every refusal the smoke met is a LAWFUL-INPUT refusal under J264: none is an unlawful-input (non-simple ring, bow-tie,
self-crossing) class. The ones that fail bars (the four whole-S8 refusals, the three `beyond` blocks) belong to fix
rounds of M0-b-03 and M0-a-09; the eight drift rows are a harness-metric reading, not a refusal.


## 6 The ruling row (N-57, M0-spec-notes.md's form: id | items | observation | handling)

| N-57 | M0-b-03 (bentCutFabric.ts `makeBlock` seeds, `tryCandidate` end rows, `portalSeam`, `continuationRefused`; planner.ts / ladder.ts `slideEnd`, `kerbFace`'s `KerbSpine.portals`; session fix round), M0-a-09 (bandUnion.ts `bandCore` / `outlinePieces`: the kerb pieces' boundary contacts; session fix round), M0-c-06 (measure.ts `s8s9` drift clause, `stopKerb` for split blocks; its own flow round after the two land), M0-x-01 / the hardening census (the KI numbers) | *(session diagnosis seat under J240/J244, J264, J238 on M0-c-06's BLOCKED 50-seed smoke; replays in `<scratch>/diag/out/`, probe `bench/probe/diag.ts` in the scratch mirror; every number reproduced exactly)* **(1)** Integrated 20, 23, 39, 44: S8 refused whole by its seam-portals row for 1–2 problems a seed (`gap`: two portals of ONE district 44–110 cm apart on a seam way, one at the way's chain-start vertex — seed 20 way:22 lanes 532/533, seed 23 way:52 lanes 327/328; `lane-end-without-portal`: a lane of dh5m… ending on the junction of way:2 (its seam spine) and way:22 (interior), typed as way:22's end — seed 23) — CONFIRMED: S8's per-spine readings (gap slide, portal seam, continuation verdict) see only the planned end's spine while the row reads every chain through a shared vertex; S8 ≡ S9 holds on the would-be output (beyond 0). The row is right; S8's cut wrong; LAWFUL input; a new class, not N-9 / Q15's (the row unevaluated) nor C-0298 (3)'s multi-seam class. **(2)** Integrated 34 block:bjan449v4zkxj (431.7 cm) and 47 block:8byv4x0w5rw45 (157.9 cm): S9's L2 face = the block + the half-corridor strip of a dead-end lane (1bzfw948gxbkz, ebz4hsk22v9mp) whose round end cap meets a spineless district edge: `bandCore`'s commit lost the kerb piece's last chord (26.0 / 25.7 cm, ≤ attractCm) to the boundary contact, the `kerb` chain is committed dangling and the strip merges with the block (the S9 ring runs on the lane's centreline, 155–164 cm off the kerb, the T vertex 431.7) — CONFIRMED; S8's working block right, the harness right; a silently wrong committed block (N-45 (a)), LAWFUL input. **(3)** Fusion 30 block:6eppwwjg267pw: the through-alley split's second seed is the pole of the child FACE ring (`seedOf(canonicalRings(faceRings(…)))`) while the unsplit seed is the pole of kerb(F); face 197's pole lies 9 cm inside way:11's band (hw 500), the L2 face holding it is way:11's half-corridor strip — CONFIRMED; the committed block (both children ≡ kerb(F)) is right, the record's seed wrong. **(4)** Stop-kerb drift beyond the bound (fusion 11, 16, 22, 30, 49; integrated 36): `blockFaces.kerb` is the kerb AT THE CUT; the spines' points and half-widths at the cut equal the final ones (mirror instrumentation), the face ring only gains later T-junction vertices; yet the kerb at the cut has an unpinned long edge 16–49 cm INSIDE its band (fusion 30 d2rb: 158–187 cm at hw 207.3) and the final kerb has it exact, pinned by the junctions' split feet (N-52 class (a), measured 49 cm not ≤ 39); at a 0.8°–4° needle tip between two same-district lanes this reads as 1.5–15.9 m of Hausdorff while every stop vertex lies within 1 cm of the working ring; working ≡ S9 at 0 on all — CONFIRMED; no wrong committed block, no stale record defect. **Census:** every refusal of the 100 runs is a lawful-input refusal (4 whole-S8, 1 kerb read, 3 beyond; 3 + 5 corpus downgrades not re-run, bar holding at 0.19 % / 0.21 %); 0 unlawful-input refusals. | **(1) M0-b-03 fix round:** at an end vertex shared by several way chains, the gap slide reads the portals of every chain through the spine's end vertices (positions on the spine's own line through the shared vertex), the portal record goes to every bounding chain's seam of the district at the vertex (`portalSeam` over all ways at `v`), and a continuation onto a vertex of a bounding chain is refused `continuation-boundary` (or slid); the row stays hard. Pins: seeds 20 / 23's configurations as fixtures (a two-way seam run with a bend and a portal 44 cm past it; an interior way's junction with a boundary arterial), the smoke's four seeds complete S8, seamPortalsRow tests unchanged. Shift: lane geometry on the affected seeds (4 of 50 integrated CITY seeds); base fixtures re-stated. **(2) M0-a-09 fix round:** `bandCore` pins a kerb piece's boundary contacts (the contact placed first by `splitThrough` of F's edge; an interior kerb vertex within attractCm of a contact dropped, never the contact) and asserts after the commit that every open piece ends on F's boundary and every `kerb` edge separates a band face from a block face — a dangling `kerb` chain refuses the batch E_INVARIANT (fail-safe). Pins: faces 871 / 822 with their widths (corridorUnion's block ≡ kerb(F), Hausdorff 0; no kerb edge with one face on both sides), a synthetic dead-end lane whose round cap meets a spineless edge at 10–20° with the last chord swept 20–40 cm, the §13.2 contract test and the arr-bands oracle with a dead-end spine on a spineless boundary. Shift: 2 of 123 628 blocks in the smoke; M0-a-09's oracle pins re-recorded only with their count reported. **(3) M0-b-03 (same round):** a split child's seed is the pole of kerb(child) (its largest component, as `kerbFace`), a child whose kerb has no area contributes no seed; property pin: every `blockFaces.seeds[i]` lies strictly inside one ring of kerb(its L1 face) over the fabric test faces; fusion 30's face 197 as a fixture; the harness's kerbReads 0 on it. Shift: a record field only (`infill` is outside the digest). **(4) M0-c-06 flow round (after (1)–(3) land):** the drift clause asserts the one-sided distance stop → working ≤ 2·√2·attractCm and the sliver width of working ∖ stop ≤ the same bound (perpendicular to the nearer working edge, or area / half-perimeter of the symmetric difference), and REPORTS the Hausdorff distance with the needle's length; a planted 1 m shift of a whole edge still fails; `stopKerb` for split blocks compares the child's kerb at the split (recorded with (3)) instead of `final`; pins: the smoke's drifted blocks' stop / working rings as fixtures, the planted shift, a 0.5° wedge. N-52 (1)'s sentence is read so; recording the kerb at S8's stage end is REJECTED (it would make the clause vacuous and lose what S8 planned on). Hardening KI (M0-x-01's census): the unpinned-edge offset of the kerb read before its T-junctions exist, measured 49 cm (> N-52 (a)'s 39) — exact-0's KI. **Flagged, no ruling:** a sub-degree wedge between two same-district lanes gives a block whose kerb is a 16 m needle 10–26 cm wide (fusion 49 face 479) — lawful under the OBB floor, unusable by any later stage; a fabric quality question for M0-b-03's hardening list. **Order:** (1)+(3) and (2) are independent fix rounds; M0-c-06's round and the 1 000-seed run (N-52 (6)) follow their landing and a green 50-seed smoke. |

## 7 Notes for the record

* Reproducibility: every replayed seed gave the smoke's block ids, distances and counts to the digit (integrated 20: 1 434
  compared, 0 beyond; fusion 30: beyond 1 / kerbReads 1 / driftBeyond 2; fusion 49: 1 593.16 cm; integrated 34: 431.74 cm;
  integrated 47: 157.92 cm; fusion 16: 467.33; fusion 11: 149.45; fusion 22: 298.99; integrated 36: 84.38).
* Not done: the corpus downgrades' reasons (3 + 5 faces) were not replayed (they fail no bar); the planner branch of §3 is
  named PLAUSIBLE, the rest CONFIRMED. The seeds' probe JSONs hold every ring quoted here.
* Procedure: no code or git state of the real tree was touched; the mirror carries the probe and one record-only field in
  its `makeBlock`; one read-only `git status --short` ran by mistake inside a shell pipeline (output discarded) and two
  CHECKPOINT stamps (19:16, 19:26) were written up to 10 minutes ahead of the clock — both recorded in the lane log.
