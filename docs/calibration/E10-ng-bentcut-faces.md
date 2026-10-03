# E10 — NG's bent cut per parent-face class (M-1 work item W-10, M0 (b)'s input)

Lane `m1/W-10`, 2026-10-03, on the owner's Mac. A research-side record: implementer seats do not read it
(`plat/CLEAN-ROOM.md` rule 2). It holds numbers, metric ids, file paths and our own words. Nothing here was written into
`plat/`, nothing touched a third-party site, no git command was run, and no capture bundle was read.

**Outcome.** The work item is done and every check of its row passes. The new tool
`research/baselines/ng_faces_by_class.py` re-measures NG's bent-cut signature on the four 2026-09-25 vertex captures
(itch build 11441280, NG 1.2.2; ring, area, street and square at `medium`, seeds 7171 and 7172). It sorts every cut whose
parent face can be rebuilt into five face classes (holed, C-shaped, triangular, curved, round-joined, plus a plain
control). The pooled numbers reproduce the row's checker exactly: **380 of 519** streets have one bend, **780 of 811**
junction ends (96.2 %) arrive at ≥ 85°, and **200 of 378** one-bend cuts are filleted. They also reproduce the σ that
§13.5 and §16 M0 (b) read: **0.066 on plain faces and 0.098 on ring faces** (0.088 pooled), with the same contamination
shares as the anchor test. All of this is CONFIRMED by execution. Three findings matter for M0 (b), all CONFIRMED on these
captures: (1) most of NG's rebuildable faces are curved: 140 of 168 have a side that bends more than 10°; (2) the
signature is not uniform across classes. C-shaped faces put the corner at mid-course in only 5 of 12 bent cuts, against
82 % pooled, and their σ is 0.114; (3) three of the five classes are thin on this data: holed 3, triangular 9 and C-shaped
16 parents, nearly all from the ring template. Four rulings are owed elsewhere (section 7). They concern crossing the
per-face file, registering a cut-length metric, the sample rule for rows built on non-formula seeds, and whether the thin
classes stay descriptive until W-04's medium seeds land.

## 1 What was built

| file | what it is |
|---|---|
| `research/baselines/ng_faces_by_class.py` | The W-10 tool; Python 3.9, standard library only. It imports `captures/neighbourhood/bentcut_parent_face.py`, `bentcut_geometry.py`, `bentcut_predict.py` and `bentcut_anchor.py` **unmodified**. It reads the parent-face rebuild's internal state at the return of `bentcut_parent_face.analyse` through a profile hook, so the cut tree is the one those scripts tested. It then replays the reverse-order union to give every cut its parent's boundary cycles and every bounded leaf face the cut that created it. Every simple parent it rebuilds must equal, vertex for vertex, the polygon `bentcut_predict` captures (E1 and the fillet-free E3), and every corner position must equal `bentcut_parent_face`'s; otherwise the run stops. `--check` exits 1 on any miss. |
| `docs/calibration/E10-ng-bentcut-faces.json` | The numbers: per map (CTM scale, median footprint area and short side), the class definitions, the pooled checker values, the census and the sensitivity counts, the measurement frames, and the rows. There is one row per set (each class flag, the exclusive partition, the open cuts, the pooled sets). Each row has the subsets all / ring / plain / per template, and each subset has `cut.sigma`, f, `cut.cornerMid`, `cut.arrival85`, `cut.fillet`, cut length and block area, with their distributions. 357 800 bytes, sha256 `7c185b17…`. |
| `docs/calibration/E10-ng-bentcut-faces.faces.json` | One record per rebuildable parent face (168). Each has its classes and shape measures, its outer ring and holes in model units, its own cut's measures, and its whole subtree: the block areas and every cut below it with t, f, arrivals, fillet flag, bends and length. This is the research-side form of what plan-check PC-01 calls `ng-faces.json`. **It is not that crossing file**: the crossing waits for a ruling (section 7). 249 643 bytes, sha256 `3b069c2d…`. |

**Not used.** `bentcut_forward.py` was read whole. It tests a conditioned prediction of the cut, which the pass-c code
reading has since superseded, so none of its outputs is a signature number. The row names it, but nothing of it enters
these rows.

## 2 The checker (W-10's row) and further receipts — executed 2026-10-03, CONFIRMED

`python3 research/baselines/ng_faces_by_class.py --check --json docs/calibration/E10-ng-bentcut-faces.json --faces
docs/calibration/E10-ng-bentcut-faces.faces.json` printed 11 PASS lines and exited 0:

| check | got | expected (source) |
|---|---|---|
| one-bend streets, all 519 streets of the 8 maps | 380 / 519 | 380 / 519 (row; BG-1) |
| junction ends arriving at ≥ 85° | 780 / 811 (96.2 %) | 96 % (row; BG-1's 780) |
| filleted one-bend cuts, the 378 non-template one-bend cuts | 200 / 378 | 200 of 378 (row; PF-2 (e)) |
| σ, plain faces (area + street + square, 59 bounded cuts) | 0.066, ε 0.05 | 0.066 (§13.5; AN-2; plan-check PC-02 (3)) |
| σ, ring faces (103 bounded cuts) | 0.098, ε 0 | 0.098 (§13.5; AN-2) |
| σ, all 162 bounded simple cuts | 0.088, ε 0.02 | 0.088 (AN-2) |
| corner within 0.10 of mid-course, bounded bent cuts | 99 / 120 | 99 / 120 (PF-2 (b)) |
| exclusive partition (classes + open cuts + template streets) re-sums the fillet count | 200 / 378 | 200 / 378 |
| the same partition re-sums the arrivals | 780 / 811 | 780 / 811 |
| the same partition covers every street once | 519 / 519 | 519 |
| each parent's area equals the sum of its leaf faces' areas (holes subtracted), 168 parents | 0 violations | 0 |

Further receipts:

| receipt | result |
|---|---|
| the existing scripts first, unmodified, from `captures/neighbourhood/` | `bentcut_geometry.py` prints bends 24/98, 28/75/1, 20/67, 22/48, 16/22/2, 14/27, 6/19 and 6/24, with ≥ 85° arrivals 200, 164, 126, 107, 55, 59, 30 and 39. `bentcut_parent_face.py` prints 512 cuts, 3 slits, 162 simple parents and 99 / 120 corners at mid; its arc-against-sharp section reads "all bent n=378 arc 200". `bentcut_anchor.py` prints N(0.5, s) σ 0.098 (ring), 0.066 ε 0.05 (plain) and 0.088 ε 0.02 (all). |
| the rebuild equals the tested scripts' | 162 / 162 simple parent polygons equal `bentcut_predict`'s E1 and E3 vertex for vertex; 120 / 120 corner positions t equal `bentcut_parent_face`'s (asserted inside the tool on every run) |
| red first | with one expectation changed (381 / 519) `--check` prints FAIL and exits 1; with the arrival gate moved to 86° the pooled count falls to 772 / 811, two checks FAIL, and it exits 1 |
| determinism | a second run wrote both JSON files byte-identical (sha256 equal) and identical stdout |
| classes look like their names | one sheet of up to 10 random parents per class, drawn from the per-face rings and viewed: holed = annuli with the inner ring as a hole; C-shaped = band pieces wrapping the centre, and the band after its first cut; triangular = three-cornered sectors with curved sides; curved, round-joined and plain as defined (two "curved" faces that look straight at thumbnail scale carry gentle arcs of 11° and 19°) |
| no bytecode written into `captures/` or `research/` | `PYTHONDONTWRITEBYTECODE` and `sys.dont_write_bytecode`; no `__pycache__` present after the runs |
| content scan of this record | `python3 docs/validation/bench/doc_checks.py --doc docs/calibration/E10-ng-bentcut-faces.md --heads docs/ARCHITECTURE.md` (9 690 JSON files, 940 891 corpus 3-grams, 806 lists): C1 identifiers 0, C2 colours 0, C4 lists 0, S1 tables 0, S2 pointers 0. C3 found 38 hits, 36 of them unreviewed. Each one is a capture path, a date, a digit run, or a phrase of our own findings and READMEs (for example "snapped to the crossed centreline", "streets are removed in reverse draw order"). None is a reference word list, grammar, palette or identifier. Exit 1 reflects that unreviewed count. This record is not in the design set, so no allow rows are added (the plan's own self-check precedent). |

## 3 How it measures (the frames; plan-check PC-10 asks these to be recorded)

* **Graph and tree.** `bentcut_parent_face.py`'s rebuild. Drawn centrelines are the roads; junction ends are extended to
  the crossed centreline; a half-edge walk finds the faces; faces touching the undrawn hood edge merge into one open
  face. Streets are removed in reverse draw order, and each removal's union is the cut's parent face. A road that still
  exists at that moment and has the parent on both sides is a slit: the cut that first opens a ring band leaves the band
  as a C whose boundary runs along both sides of that cut. The C is rebuilt that way here (`bentcut_parent_face.py`
  leaves these three parents unclassified, as non-simple).
* **σ (`cut.sigma`).** f is the drawn start e0, snapped to the crossed centreline, as a fraction of the parent's E1 OBB
  major axis. On a holed parent the OBB is the outer cycle's. σ is the maximum-likelihood N(0.5, σ) with an
  ε · U(0, 1) contamination term, on `bentcut_anchor.py`'s grids (σ 0.020–0.248 in steps of 0.002, ε on its 11-step grid).
  It is not fitted when a set has fewer than 10 cuts; those sets list their f values. NG's own retries cannot be told apart
  in a draw record, so "rotated retries included" (§13.5) applies to our side only. This is the frame M0 (b) must read
  ours in.
* **Corner at mid (`cut.cornerMid`).** t = |e0 Pv| ÷ (|e0 Pv| + |Pv eN|) between the snapped ends, with Pv the crossing
  of the two straight legs (fillet-free); the gate is |t − 0.5| ≤ 0.10. It is counted on one-bend cuts with a rebuilt
  parent.
* **Arrival (`cut.arrival85`).** Each junction end's acute angle to the road it meets (`bentcut_geometry.py`); the share
  ≥ 85°.
* **Fillet (`cut.fillet`).** One-bend cuts whose bend is drawn as a run of several vertices (an arc).
* **Cut length** (no catalogue id; section 7). The fillet-free course between the snapped ends, in model units, also ÷ the
  map's median footprint short side.
* **Block area.** Bounded leaf faces of the road graph. A class's blocks are those created by its cuts: the children
  that stopped. Areas are in model units², and `block.areaRel` divides them by the map's median footprint area (586–605
  mu² across the 8 maps). The per-face file also carries each parent's whole subtree.
* **Scale (plan-check PC-03).** NG's input is relative (E01). Model units are canvas px ÷ the map's CTM scale
  (0.5597–1.1137). Every row is reported in model units or relative units. Metres appear only as a declared conversion at
  0.35 m per model unit (the inference in ARCHITECTURE §4.6 step 5) under keys ending `_declared`, binned on V12's
  default edges for convenience. They are never a measured scale.

**The classes** (our definitions, declared; a face may carry several flags; "plain" carries none):

| class | definition | n (flag) | sensitivity |
|---|---|---|---|
| holed | the parent's boundary holds an inner cycle: the annulus each ring band is before its first cut | 3 | — |
| C-shaped | some contiguous boundary chain of the fillet-free polygon turns ≥ 120° net toward the outside | 16 | 24 at ≥ 90°, 13 at ≥ 135°, 8 at ≥ 180° |
| triangular | exactly three corners, a corner turning ≥ 45° (sides may be curved) | 9 | 6 at 30°, 11 at 60° |
| curved | ≥ 2 consecutive boundary vertices of a drawn road turning 1°–30° each, outside a complete fillet arc, together turning > 10° (a side the 10° run rule of GEO-22 cannot hold as one run) | 140 | 158 at > 5°, 111 at > 20° |
| round-joined | a complete fillet arc of a crossing street forms one of the corners | 78 | — |
| plain (control) | none of the above | 11 | — |

The exclusive partition takes the first flag in the order holed, C-shaped, triangular, curved, round-joined, plain:
3 + 16 + 9 + 112 + 17 + 11 = 168. Corner counts at 45° over the 168 parents: 0 corners 4, 2 corners 2, 3 corners 9,
4 corners 116, 5 corners 21, 6 or more 16.

## 4 Census — what can be classified

| | count |
|---|---|
| streets drawn (8 maps) | 519: 7 template streets + 512 cuts |
| cuts whose parent touches the undrawn hood edge (no parent polygon) | 344 |
| cuts with a rebuilt parent | 168: 162 simple, 3 annulus first cuts (holed), 3 cuts of the C left by those |
| bounded leaf faces (blocks) | 302: 205 created by a rebuilt parent's cut, 94 by an open parent's cut, 3 never cut |

The 344 open cuts still carry the face-free measures. Their arrivals are 453 / 471 (96 %) ≥ 85° and 138 / 253 one-bend
cuts are filleted (55 %). Their σ and corner position need a face and are not measured.

## 5 The per-class signature (flags; overlapping)

f values are listed where n < 10. Cut length is in model units, p10 · p50 · p90. Block areaRel is ÷ the median footprint
area, p10 · p50 · p90.

| class | subset | cuts | bends 0/1/2 | cut.sigma (ε) or f | cut.cornerMid | cut.arrival85 | cut.fillet | cut length | blocks | block areaRel |
|---|---|---|---|---|---|---|---|---|---|---|
| holed | all (ring) | 3 | 1/2/0 | f 0.427, 0.429, 0.432 | 2/2 | 6/6 | 1/2 | 148 · 204 · 393 | 0 | – |
| C-shaped | all (ring) | 16 | 4/12/0 | 0.114 (0) | 5/12 (42 %) | 32/32 (100 %) | 4/12 (33 %) | 173 · 276 · 503 | 4 | 13.9 · 39.0 · 116.5 |
| triangular | all | 9 | 2/7/0 | f 0.368, 0.441, 0.441, 0.474, 0.480, 0.495, 0.554, 0.648, 0.667 | 6/7 | 17/18 | 1/7 | 145 · 253 · 314 | 9 | 16.9 · 22.0 · 54.2 |
| triangular | ring | 8 | 2/6/0 | (as above without 0.474) | 5/6 | 15/16 | 1/6 | 145 · 279 · 314 | 8 | 16.9 · 22.0 · 23.6 |
| curved | all | 140 | 35/105/0 | 0.096 (0) | 86/105 (82 %) | 270/280 (96 %) | 51/105 (49 %) | 123 · 184 · 291 | 156 | 15.0 · 26.6 · 43.6 |
| curved | ring | 102 | 25/77/0 | 0.100 (0) | 60/77 (78 %) | 198/204 (97 %) | 35/77 (45 %) | 122 · 190 · 307 | 103 | 14.7 · 26.0 · 42.4 |
| curved | plain | 38 | 10/28/0 | 0.070 (0.05) | 26/28 (93 %) | 72/76 (95 %) | 16/28 (57 %) | 132 · 170 · 249 | 53 | 15.0 · 29.0 · 44.4 |
| round-joined | all | 78 | 21/57/0 | 0.084 (0.02) | 47/57 (82 %) | 148/156 (95 %) | 26/57 (46 %) | 123 · 171 · 279 | 103 | 15.8 · 25.1 · 44.5 |
| round-joined | ring | 49 | 13/36/0 | 0.094 (0) | 27/36 (75 %) | 93/98 (95 %) | 16/36 (44 %) | 123 · 174 · 314 | 57 | 18.4 · 26.1 · 42.4 |
| round-joined | plain | 29 | 8/21/0 | 0.064 (0.05) | 20/21 (95 %) | 55/58 (95 %) | 10/21 (48 %) | 127 · 164 · 208 | 46 | 15.0 · 24.0 · 44.4 |
| plain (control) | all | 11 | 4/7/0 | 0.070 (0) | 6/7 | 22/22 | 4/7 | 119 · 145 · 164 | 20 | 13.2 · 19.8 · 34.4 |
| **pooled, rebuilt parents** | all | 168 | 43/125/0 | 0.090 (0.02) | 103/125 (82 %) | 325/336 (97 %) | 62/125 (50 %) | 121 · 173 · 281 | 205 | 14.7 · 25.7 · 42.9 |
| pooled, rebuilt parents | ring | 109 | 27/82/0 | 0.100 (0) | 64/82 (78 %) | 212/218 (97 %) | 38/82 (46 %) | 120 · 187 · 303 | 116 | 14.7 · 24.5 · 42.4 |
| pooled, rebuilt parents | plain | 59 | 16/43/0 | 0.066 (0.05) | 39/43 (91 %) | 113/118 (96 %) | 24/43 (56 %) | 127 · 164 · 216 | 89 | 15.1 · 26.1 · 43.6 |

Per template (rebuilt parents): ring σ 0.100 on 109 cuts. Area σ 0.064 (ε 0.075) on 44, with corner at mid 32/35 and
fillet 18/35. Street has 9 cuts and square 6, with their f values listed in the JSON. The exclusive partition's rows, the
per-template subsets of every class and the full distributions (sorted cut lengths and relative block areas, and the V12
default bins of the declared metric values) are in `E10-ng-bentcut-faces.json` under `rows`.

## 6 Findings

1. **The pooled signature reproduces (CONFIRMED).** The checker's three numbers and σ 0.066 / 0.098 / 0.088 come out
   exactly, through the same rebuild the earlier tests used. The 6 parents those tests left out (the 3 annuli and the
   3 C's after them) raise the ring σ from 0.098 to 0.100 when they are included.
2. **Most of NG's rebuildable faces are curved (CONFIRMED).** 140 of 168 parents have a side that bends more than 10°.
   On ring faces these are the ring roads; on plain faces they are long fillet arcs of crossing streets that a later cut
   meets part-way. 78 have a rounded corner. Only 11 are straight-sided with sharp corners. M0 (b)'s plain-face numbers
   are therefore mostly curved-face numbers.
3. **The C-shaped faces depart from the pooled signature (CONFIRMED on n = 16; the reading is PLAUSIBLE).** The corner
   sits within 0.10 of mid-course in 5 of 12 bent cuts (42 %, against 82 % pooled), the fillet share is 4 of 12, the σ is
   0.114 and the cuts are longer (p50 276 mu against 173). All arrivals are ≥ 85°. Reading: on a face that wraps around,
   the minor-axis line meets the face more than once, so the corner's place along the course loosens. This is the case
   §4.6 step 3 settles for our side ("the segment containing the point nearest to it").
4. **The ring's wider σ is not only curvature (CONFIRMED).** Curved ring faces give 0.100, but curved plain faces give
   0.070, close to plain's 0.066. So the ring's 0.098 follows the template (the band law), not the curved sides alone.
5. **A band's first cut sits at f ≈ 0.43 (CONFIRMED on n = 3).** In all three annuli it is 0.427–0.432 along the outer
   ring's OBB. Three cuts cannot give a σ; it is reported as values only.
6. **Triangular faces exist only as curved sectors (CONFIRMED).** 8 of the 9 are ring sectors; the one plain triangle is
   in area 7171. On them the corner is at mid in 6 of 7 bent cuts and filleted in 1 of 7.
7. **Block sizes barely move with class (CONFIRMED).** Relative block area p50 is 19.8–29.0 median footprints in every
   class with ≥ 9 blocks. The C-shaped class's 4 blocks are larger (p50 39).

## 7 Open — rulings and work owed elsewhere (none blocks this landing)

1. **Crossing the per-face records (plan-check PC-01).** By PC-01's reading, M0's AFTER-M-1 (b) items ask for NG face
   rings with their blocks and cuts. `E10-ng-bentcut-faces.faces.json` holds exactly that, research-side, in model units. Crossing it into
   `plat/` (as `ng-faces.json`, integer cm through the declared 0.35 m per unit) conflicts with V12 §3.3 ("geometry never
   crosses") and is not in §17.1 (4)'s list. It needs a Fable ruling or an amendment; until then M0 reads M-1's statement
   that the file is not delivered.
2. **The cut-length metric has no catalogue id (PC-02 (1)).** The numbers are here under `cutLength`. A row needs a
   design amendment to V12 §3.4.2 and an entry in `metrics.m-1.json` first, with the relative bin edges that
   `block.areaRel` also still owes (E01).
3. **The sample rule (PC-04).** These rows are trace rows on recorded draws of seeds 7171 / 7172, not on the plan's
   formula seeds, so check C7 refuses them unless a Fable ruling declares a recorded sample, as for Fantasy Manor's 41.
   The formula-seed route is W-04's 20 `medium` seeds (five per template); the tool takes capture folders as arguments
   for that run.
4. **Thin classes.** Holed (3), triangular (9) and C-shaped (16) cannot carry a band on this data. Whether they stay
   descriptive by the ⟨M-1⟩ rule or wait for W-04's seeds (five seeds per template against two here, so about two and a
   half times the faces) is for the Fable seat.
5. **Before W-04's seeds run (documented, not a bug to re-find).** `bentcut_parent_face.py` recognises template streets
   by the two widths of seeds 7171 / 7172 (`TEMPLATE_W`). New seeds need that recognition generalised, in that script or
   in this tool, before their rows are trusted.

## 8 Reproduce

```
python3 research/baselines/ng_faces_by_class.py --check \
  --json docs/calibration/E10-ng-bentcut-faces.json --faces docs/calibration/E10-ng-bentcut-faces.faces.json
```

It reads only `captures/neighbourhood/2026-09-25T10-55-{19,36,47,59}` and writes the two files byte for byte as recorded
above. `df -h /Users/cstokes` read 16 GB free at the start and 15 GB at the end, other lanes' captures included; this
item's outputs are 0.6 MB.
