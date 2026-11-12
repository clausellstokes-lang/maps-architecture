# Step 5 — THE X ≠ X_U COLUMN (draft F0-10; review A / R-19)

Command (BASE mirror probeB = HEAD + S20 files + inert counters; the construction served, S20's `setReadShadow` hook read):
`cd probeB/plat && corepack pnpm exec tsx --conditions=plat-source ../../probes/xxu.ts --run fusion --seed 3 --out ../../results/step5/fusion-3-city.json`
(scripts/xxu-run.sh fusion 3 city; log results/step5/fusion-3-city.log; 2 294 s, one process). Per read: X (P's served
region) and X_U = exactRegion(f.rings, kerbParts(construction's spines, unreduced)) exactly as observer.ts computes it,
and the steps between them: V1 = the construction's spines with REDUCED (faithful, straightRun) parts; V2 = X's spine set
(edge + reaching on X_E), reduced parts, raw rings; X = V2 with the ring rule. Distances: observer.ts `hausdorffFast`.

## Reproduction of S20's column (validation)
Fusion 3 CITY: root db72c0bf0fa021ca873fd7f5f6f30d7b (= S20 T7), 5 242 reads (= T1), X ≠ X_U on **5 047** reads (= T2 f3),
max **165.06 cm** (= T2 f3's 165.06). Test size fusion 1: 456 reads, 413 unequal, max 1.61 cm (= T2 f1). (integrated 4 —
S20's 176.50 cm — is queued in laneB; not yet run at the time of writing.)

## The histogram (fusion 3 CITY, 5 242 reads)
| H(X, X_U) | reads |
|---|---|
| 0 (text-equal) | 195 |
| (0, 1) cm | 2 094 |
| [1, 5) cm | 2 920 |
| [5, 30) cm | 0 |
| [30, 75.5] cm | 0 |
| > 75.5 cm | 33 |
By step (the same reads): the parts' reduction XU→V1: (0,1) 2 094, [1,5) 2 920, >75.5 **33**; the spine set V1→V2: 0 on 4 962,
(0,1) on 85 (the sets differ on 85 reads — 39 a spine only in X's set, 46 only in the construction's — and move nothing by
1 cm); the ring rule V2→X: (0,1) on all 5 047.

## The classification of every read over 2 cm (the session's S / I / R)
56 reads over 2 cm: **S (the spine set moves the boundary > 2 cm): 0. I (a sliver component < 2.5 cm wide explains it): 3**
(max 2.23 cm). **R (the rest): 53** — 20 between 2 and 5 cm and **33 over 75.5 cm** (max 165.06). No read combines S and I.
The 33: every dissected one (10 distinct keys, 16 reads, faces 380 and 430 – 434 — the two places of the fusion-3 city
where the column exceeds 75.5 cm) is a NEEDLE: a spike of the main component running along F's boundary to an F ROUTE VERTEX,
apex angle 0.3 – 0.5°, width 0.13 – 0.23 cm at 25 cm from the apex, 0.27 – 0.45 cm at 50 cm, 0.54 – 0.91 cm at 100 cm
(results/step5/needles-f3.json, scripts/needle.py). It is present in ONE of X and X_U and absent in the other: the reduced
parts (straightRun drops a route vertex within the hot pixel, 0.71 cm) move the buffer's edge by under a centimetre where
the buffer's edge runs almost along F's spine-less boundary, and that sub-centimetre move opens or closes a needle 1.6 m long.
(A further run with every read over 2 cm dissected, `--top 300`, is queued: results/step5/fusion-3-city-all.json; the 20 R
reads between 2 and 5 cm and the 17 over 75.5 cm outside the ten dissected keys are not dissected individually here.)

## The largest of each class against the definition (witness points, definition.ts truthOfFace / truthAtOf / bufferDepth)
- **S:** none at fusion 3 (0 reads over 2 cm).
- **I** (2.23 cm, face 781, 3 reads): X_U holds a triangle 0.29 cm wide, 0.5 cm² that X does not. Its three inward points lie
  INSIDE way:frnq9j7hag44k's buffer (hw 170.58) by 0.27 – 0.69 cm, inside F 170 cm from its boundary: by the definition
  they are band — **X right**, X_U wrong by under 1 cm.
- **R, 165.06 cm** (face 380, X has the needle, apex F vertex (−26130, −75158), along way:7045nhbn2vnda hw 165.38, flat
  junction ends): the witnesses in the gap (J785's farPairs / witnessesOf; truthAtOf says 'undecided' at all 5: within
  MARGIN_CM) measured directly: inside F, 0.0 – 0.39 cm from F's boundary, **inside** way:7045's buffer by 0.10, 0.25,
  0.53 cm → by the definition band: **X wrong by ≤ 0.53 cm** across a 165 cm needle; X_U right there.
- **R, 159.85 cm** (faces 430 / 434: X_U has the needle, X not; apex (−4011, 68147)): witnesses inside F, 0.05 – 0.26 cm
  from its boundary, **outside** way:fnq2gbecbv14k's buffer (hw 159.56) by 0.34 – 0.42 cm → kerb by the definition: **X
  wrong by ≤ 0.42 cm** (X lacks a 160 cm needle of the definition, ≤ 0.9 cm wide).
- **R, 159.85 cm** (faces 432 / 433: X has the needle at the same apex, other keys): witnesses inside the buffer by 0.91 –
  0.94 cm → band: **X wrong by ≤ 0.94 cm**, X_U right.

## What this says
- The column is NOT a wrong census reach: the spine sets differ on 85 reads and never move a boundary by 1 cm (S = 0).
- Its large values are needles along F's spine-less boundary created or erased by sub-centimetre moves of a buffer edge
  (the reduced parts, a hot pixel). Measured against the definition at witness points, either side may be the wrong one,
  always by under 1 cm in depth (0.42 – 0.94 cm here) but over 1.6 m in length. In that sense X is right to the lattice
  (the review's reading) — and in the same sense X serves sub-centimetre needles that the definition does not hold (face
  380, 432), and lacks ones it does (face 430). A Hausdorff bar on X (or against X) reads such a needle as 1.6 m.
- These needles are the same class that makes S9's commit of X miss the plan beyond the bound (step 3: every far vertex
  is a planned vertex at an F route vertex).

## integrated 4 CITY (S20's 176.50 cm column) — `scripts/xxu-run.sh integrated 4 city` (results/step5/integrated-4-city.{json,log}, needles-i4.json; 3 090 s)
Root e9e96e0e6a2e88e587c968796e0ef03e (= S20 T7), 5 967 reads (= T1), X ≠ X_U on **5 690** (= T2 i4), max **176.50 cm** (= T2).
Histogram: 0: 277; (0,1): 2 482; [1,5): 3 158; [5,30): 3; [30,75.5]: 0; > 75.5: 47. The spine sets differ on 129 reads (72 a
spine only in X's set, 58 only in the construction's), moving nothing by 1 cm. Over 2 cm: **S 0, I 0, R 60** (47 over 75.5,
3 in [5, 30), 10 in [2, 5)). The ten largest distinct keys (faces 738 – 740, 559, 1026 / 1028, 869 / 877, 876; 176.50 –
165.86 cm): every one a NEEDLE whose apex is an F route vertex, apex angle 0.35 – 0.73°, width 0.15 – 0.32 cm at 25 cm,
0.61 – 1.27 cm at 100 cm. Witnesses (the definition's truth 'undecided' within its 4 cm margin; depths measured): X's needle
inside the buffer by 0.00 – 0.05 cm (738 – 740), 0.84 – 1.02 cm (1026 / 1028), 0.81 – 1.01 cm (869 / 877) — X wrong by ≤ 1.02
cm; X_U's needle outside the buffer by 0.74 – 1.05 cm (559) and 0.39 cm (876) — kerb by the definition, X lacking it: X wrong
by ≤ 1.05 cm. **Across both CITY seeds, X departs from the definition by at most 1.05 cm in depth wherever X and X_U differ by
more than 2 cm; never by a spine set.**
