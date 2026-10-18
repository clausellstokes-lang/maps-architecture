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

## 9 W-10b — the NG trace rows, `cut.length` and the face records on W-04's plan seeds (lane `m1/W-10b`, 2026-10-03 from 21:40 EDT; landing time in `docs/lane-events.log`)

Lane `m1/W-10b` appended this section; sections 1–8 above are W-10's record and were not edited (their open points 7 (1),
(2), (4) and (5) are answered by R-14, R-15 with W-01b's registration, R-09, and 9.2 below). Research side only: nothing
was written into `plat/`, no third-party site was touched, no captured program bundle was read, no benchmark or timing
was run, no git command changed state, and `plan.json` / `metrics.m-1.json` were read only. Numbers, metric ids and our own
words only. Values: `docs/calibration/E10-ng-bentcut-faces.plan.json` (sha256 `267cfece…`); research-side per-face
records: `E10-ng-bentcut-faces.plan.faces.json` (`82cbaed2…`); the plan §7b candidate:
`research/baselines/candidates/ng-faces.json` (`eb0be059…`). All three are written by one deterministic run.

**Outcome: the row's checker passes (CONFIRMED, executed).**
- *The fixture run still prints 11 / 11.* `ng_faces_by_class.py --check` on the 2026-09-25 captures prints the eleven PASS
  lines, and its two JSON files are byte-identical to the landed ones (`7c185b17…`, `3b069c2d…`). The generalised template
  rule picks exactly W-10's template set on 8 / 8 fixture maps.
- *Each parent's area equals its leaves' sum on every map.* 380 rebuilt parents on the 20 `medium` maps, 0 violations at
  1e-6 relative and 1 cm² declared (largest gap 1.0e-6 cm²).
- *The formula σ against §13.5's 0.066 / 0.098.* Plain 0.084 (simple parents, the set the recorded numbers were measured
  on) and ring 0.094: both within the 0.02 floor (+0.018 and −0.004). Two other recorded numbers depart beyond their
  floor and are listed for DC-26's successor (9.4).

### 9.1 What was run

| step | command | result |
|---|---|---|
| plan seeds | `python3 research/baselines/ng_faces_by_class.py --plan` | exit 0, `W-10b CHECKER PASS: 13 / 13`, ≈ 33 s; writes the three files above |
| determinism | the same with `--out-json/--out-faces/--out-candidate/--md` into scratch | all four outputs byte-identical; stdout identical apart from elapsed seconds |
| fixtures | `ng_faces_by_class.py --check --json <scratch> --faces <scratch>` | exit 0; 11 PASS lines plus "template roads … = W-10's TEMPLATE_W sets on 8 / 8 maps; duplicate edges collapsed 0"; both JSON files equal the landed ones |
| red tests | `ng_faces_by_class.py --red` | exit 0, `19 / 19 as expected` (9.6) |
| content scan | `doc_checks.py --doc docs/calibration/E10-ng-bentcut-faces.md --heads docs/ARCHITECTURE.md` | 9.10 |

The inputs are W-11b's: `plan-seeds/index.json` (`ed973ee2…`, the registered road frame) and `ng-faces.hoods.json`
(`7530098b…`); the bent-cut scripts are pinned by sha256 in the JSON's `inputs` and were imported unmodified.

### 9.2 Tool changes (our own code; the fixture mode's outputs unchanged)

1. **Template roads by draw order and width class (R-09).** W-10's limit was real: `TEMPLATE_W` (the widths of seeds
   7171 / 7172) finds **no** template street on any of the 20 plan seeds, so the street template's main street and the
   square template's plaza roads would have entered the tree as cuts. The rule now used, measured on all 44 W-04
   recordings and the 8 fixture maps: the templates that lay roads down themselves draw them first, at one per-map width
   that is not the length law's; the template roads are the maximal draw-order prefix whose raw widths equal the first
   road's (to 0.001 mu), on `street` and `square` only (CA-2's k: one main street; three plaza roads, one of them the
   closed loop where it is drawn closed); `area` and `ring` lay none (their closed roads stay templates by shape). Result:
   `street` 1 road and `square` 3 roads on 44 / 44 recordings, no other street at that width on any map, and the script's
   own template set equals the rule's on every map (asserted). **Red test:** on the fixtures the rule's sets equal
   `TEMPLATE_W`'s on 8 / 8 maps and the 11 checks pass; planting "area lays its first street" or "street lays none"
   turns two checks red. Planting "square lays none" leaves the 11 checks green — the square template's roads are open
   and its one bent road has no measurable bend, so the fixture numbers cannot see them — and is caught only by the
   rule-equality check, which is why the fixture verification is both together.
2. **Duplicate edges.** E11 10.1's adapter defect is in the bent-cut scripts' graph too: on `square/medium/3` two mutual
   fallback snaps give two node pairs twice, and the face walk merged blocks (15 faces where the adapter has 17). A line
   trace on `bentcut_parent_face.analyse` collapses each repeated node pair after the edge list is built and before the
   walk (the file is not modified); the edge kept carries the later-drawn road, because the overlap is a short connector
   off the earlier road's line, and kept on the earlier road the script's collinear-insertion rule drops its landing
   node and the parent polygon loses a sliver (0.7 % of one face against its leaves, found by the identity check and
   fixed). After the collapse the face graph equals the adapter's (faces, open faces, blocks) on 20 / 20 maps.
3. **One degenerate cut.** On the same map the overlap fuses streets 22 and 23 into one path (22 ends on 23's start; 23
   starts on 22 just short of 22's end), so street 22 is a dead end once 23 is removed: the replay drops the zero-width
   spur it leaves in the merged face (2 edges; the tested script's polygon never holds one), and street 22 — its two
   sides one face at its removal, its parent without an inner cycle — is recorded **degenerate**: it stays in the
   face-free measures and in its ancestors' cut lists, and leaves the rebuilt-parent set (its face would repeat 23's).
   The fixtures have neither case.
4. **`--plan`, `--red`.** The plan mode reads W-11b's index (five `medium` seeds per template, plan order, each checked
   against its `meta.json`), checks the frame (every face-ring vertex on a `MeasureInput` way within 1e-6 px; the bounded
   faces' areas equal the input's blocks within 1e-9; W-11b's built rule re-derived on the faces equals E11 10's per-seed
   counts on 20 / 20), and writes the values, the research per-face file and the candidate.

### 9.3 Measured values (R-47 (a): W-15 forms the rows; per-seed values in plan order are in the JSON's `rows`)

`bounded` = cuts with a rebuilt parent (the faces the candidate carries); `all` = every non-template street. σ is the
pooled maximum-likelihood fit over the subset (the recorded-frame measure), "simple" its simple-parent subset.

| subset | seeds | bounded / all cuts | cut.sigma (ε) | simple (ε) | cut.cornerMid | cut.arrival85 all · bounded | cut.fillet all · bounded | cut.length m p10 · p50 · p90 | spreadKS.p90 binned · raw |
|---|---|---|---|---|---|---|---|---|---|
| pooled | 20 | 379 / 1 107 | 0.088 (0.03) | 0.090 (0) | 211 / 239 (88 %) | 97 % · 98 % | 393 / 731 (54 %) · 111 / 239 (46 %) | 37 · 55 · 89 | 0.936 · 1.000 |
| ring | 5 | 245 / 484 | 0.090 (0.05) | 0.094 (0) | 163 / 188 (87 %) | 97 % · 97 % | 49 % · 44 % | 35 · 54 · 90 | 0.496 · 0.558 |
| plain | 15 | 134 / 623 | 0.084 (0) | 0.084 (0) | 48 / 51 (94 %) | 98 % · 100 % | 58 % · 57 % | 44 · 58 · 86 | 1.000 · 1.000 |
| area | 5 | 106 / 349 | 0.078 (0) | 0.078 (0) | 32 / 34 (94 %) | 99 % · 100 % | 57 % · 53 % | 43 · 57 · 87 | 0.243 · 0.343 |
| street | 5 | 11 / 127 | 0.102 (0) | 0.102 (0) | 7 / 8 | 96 % · 21 / 22 | 62 % · 6 / 8 | 45 · 55 · 68 | 1.000 · 1.000 |
| square | 5 | 17 / 147 | 0.098 (0) | 0.098 (0) | 9 / 9 | 96 % · 34 / 34 | 57 % · 5 / 9 | 49 · 66 · 82 | 1.000 · 1.000 |

Per seed: σ is fitted only where a seed has ≥ 10 bounded cuts — area 0.062–0.082 (4 seeds), ring 0.062–0.108 (5);
`cut.cornerMid` 0.81–1.00 on the ring seeds; the all-cuts arrival share has type-7 p10–p90 0.904–1.000 over 20 seeds and
the fillet share 0.486–0.686. `cut.length` uses the registry's bins (`metrics.m-1.json`, W-01b: 5 m to 400 m plus
overflow; 0 cuts overflow); a companion over every cut with two snapped ends, open parents included (653 cuts), gives
p50 58 m and `spreadKS.p90` area 0.249, street 0.802, square 0.641, ring 0.355.

### 9.4 Formula values against the recorded numbers (R-03: the formula row stands; the design number is corrected)

| quantity | recorded (fixtures, §13.5) | formula seeds | difference | beyond the 0.02 floor? |
|---|---|---|---|---|
| `cut.sigma` plain, simple parents | 0.066 | 0.084 | +0.018 | no (near it) |
| `cut.sigma` ring, simple parents | 0.098 | 0.094 | −0.004 | no |
| `cut.sigma` all, simple parents | 0.088 | 0.090 | +0.002 | no |
| `cut.sigma` ring, rebuilt parents (DC-26's 0.100) | 0.100 | 0.090 | −0.010 | no |
| `cut.cornerMid`, simple parents | 99 / 120 = 0.825 | 0.888 | +0.063 | **yes** |
| arrivals ≥ 85°, all streets | 780 / 811 = 0.962 | 1 712 / 1 763 = 0.971 | +0.009 | no |
| filleted one-bend cuts | 200 / 378 = 0.529 | 393 / 731 = 0.538 | +0.009 | no |
| one-bend streets, all streets | 380 / 519 = 0.732 | 739 / 1 125 = 0.657 | −0.075 | **yes** |

**For DC-26's successor (routed through the session to the design seat; this lane edits no design file):** §13.5's
bent-cut signature should carry the formula values — corner within 0.10 of mid-course on 89 % of bent cuts (not 82 %),
one bend on 66 % of streets (not 73 %); σ 0.066 / 0.098 hold within the floor, the plain value moving to 0.084.

### 9.5 The five face classes (descriptive, R-09)

| class (flag) | bounded cuts | bent cuts | cut.sigma (ε) or f | cut.cornerMid | cut.fillet | blocks |
|---|---|---|---|---|---|---|
| holed | 5 (ring) | 2 | f 0.392, 0.419, 0.465, 0.661, 0.733 | 2 / 2 | 1 / 2 | 0 |
| C-shaped | 20 (ring) | 14 | 0.178 (0.4) | 11 / 14 | 9 / 14 | 3 |
| triangular | 18 (17 ring) | 17 | 0.092 (0) | 15 / 17 | 9 / 17 | 21 |
| curved | 263 | 203 | 0.090 (0.05) | 176 / 203 | 91 / 203 | 307 |
| round-joined | 172 | 135 | 0.090 (0) | 118 / 135 | 60 / 135 | 219 |
| plain (control) | 88 | 22 | 0.076 (0) | 21 / 22 | 14 / 22 | 139 |

The exclusive partition and the ring / plain / per-template subsets are in the JSON's `classes`. **Known-defects entry
(R-09):** only `holed` has fewer than 10 bounded bent cuts (2), so it stays descriptive with an E19 entry for M1's file;
C-shaped (14) and triangular (17) cleared the threshold on the formula seeds, against 12 and 7 on the fixtures. The
C-shaped σ fit puts 40 % of its mass in the uniform term: on a face that wraps around, f is not concentrated near mid.

### 9.6 The `ng-faces.json` candidate (plan §7b; R-14; N-02)

`research/baselines/candidates/ng-faces.json`: the §7b header (`schema`, **`referenceBuild` at the top**,
`metricsVersion` 1.0.0, `scaleDeclared` 0.35, `outlineKind` 1), W-11b's 20 hood records unchanged (each with
`referenceBuild`), and **374 face records, each with `referenceBuild`** — area 106, street 11, square 17, ring 240 — with
1 150 cut records (up to 59 per face) and 5 holes. No `crossing` key: W-20 writes it. 285 KB.

Conventions (calls under delegation, 9.9): rings are E1, the face as drawn (fillet arcs as chords, a junction node whose
two boundary edges lie on one road dropped), in the registered road frame at cm = px ÷ ctmScale × 35 rounded half to
even — W-11b's hood frame — closed, outer rings positive and holes negative; `blockAreasCm2` holds every bounded leaf
inside the face, by cumulative rounding along the union's final order so that each face's integers sum to its exact area
within 1 cm²; `cuts` lists the face's own cut first and then every cut inside it in drawing order; `cornerT` is t in
thousandths for a one-bend cut and −1 otherwise; `arrivalCdeg` is the smaller of the cut's two junction-end arrivals.
**Left out, recorded:** 5 C-shaped parents whose boundary runs along both sides of a slit (not simple at any resolution;
their cuts are in their annulus's record) and the degenerate cut of 9.2 (3).

Checks, all PASS: header; hoods unchanged with W-11b's §7b checks re-run; per face the §7b fields exactly, integer ids,
hood and template consistent, flags 0 / 1, integer coordinates, closed simple rings, holes inside, every ring vertex
inside its hood outline; every number an integer except the declared 0.35; **every string matching V12 §3.3 C2's
pattern for its field** (`seedLabel`, `capture`, `referenceBuild`) or the schema's enumeration (`template`) and constants;
no hex-delimited six-digit run in any string; **area:** the exact face area equals the exact leaves within 1.0e-6 cm², the
file's integer block areas sum to the exact area within 0.94 cm² with every face's leaf count right, and each integer
ring's own area lies within its coordinate-rounding bound of that sum (largest 1.7e-4 relative, median 2.6e-5).
**Red tests (`--red`, 19 / 19):** three planted template rules turn the fixture verification red and the true rule stays
green; fourteen planted faults on a copy of the candidate (a face, a hood or the header without `referenceBuild`; a
non-integer coordinate; a float block area; a self-crossing ring; a seedLabel outside C2; a free string; a six-hex run in
a string and one inside a C2-valid label; a block area dropped or moved by 2 cm²; a missing cut field; a face 2 cm² off
its leaves) are each refused, and the candidate as written passes.

**N-03 stands (for the session):** read literally, V12's "no six-hex-digit sequence anywhere" refuses every
`referenceBuild` string in the file (395 of them: `itch:11441280` holds an eight-digit run) and every block area of
six or more digits; the check here reads hex-delimited runs in string values only, as N-03 asks of M0-k-05.

### 9.7 Readings for the seats that use these values (CONFIRMED as measurements)

1. **The street and square templates are thin for every face-based row.** Their 10 hoods hold 28 rebuilt parents (two
   hoods none): σ cannot be fitted per seed, and `cut.length`'s per-template `spreadKS.p90` is 1.000 (4 seeds with cuts,
   6 pairs) — a band that can never fail. The area (0.243) and ring (0.496) subsets carry the information; the
   all-snapped-ends companion (0.802 / 0.641) is the only usable spread for street and square. W-15 should know this
   before it forms the per-template rows.
2. **Which cut set a row reads.** σ, `cut.cornerMid` and `cut.length` need the rebuilt parent. For `cut.arrival85` and
   `cut.fillet`, §13.5's recorded numbers were taken over every street and every one-bend cut, so the all-cuts values are
   the like-for-like replacement (R-03); the bounded values are the like-for-like comparison with M0's synthetic faces.
   Both are in the JSON; the choice is W-15's.
3. **Unbuilt leaves.** `blockAreasCm2` must hold every leaf for the area identity, and 35 of the 489 distinct leaves are
   unbuilt by W-11b's rule (no footprint centroid; plaza remnants and slivers), while W-11b's `block.area` row holds built
   blocks only. M0-b-05b's block-area KS should know the two populations differ by about 7 %.
4. **The rebuilt share is the ring's.** 245 of 379 rebuilt parents are ring faces; 727 of 1 107 cuts have an open parent.

### 9.8 Hand-offs

- **W-15:** `rows` (pooled, ring, plain, per template; per-seed values, estimates, `spreadKS`), `classes`, 9.7 (1)–(2).
- **W-20 / the session (N-02, with §7b to M0-k-05):** the candidate; its conventions (9.6) travel with §7b — the cut
  order, `arrivalCdeg` as the smaller end, `cornerT` −1 for non-one-bend cuts, every leaf in `blockAreasCm2`.
- **E19 (M1's known-defects file):** the `holed` class (2 bounded bent cuts).
- **The design seat, through the session:** 9.4's two departures for DC-26's successor.
- **W-12:** `cut.flattenM` reads these cut lengths and the per-face file.

### 9.9 Calls made under delegation (vetoable, J122)

1. **The template rule** (9.2 (1)) — the class is measured, and the template key decides only whether a template lays
   roads (CA-2).
2. **The duplicate edge kept on the later road, the spur drop and the degenerate cut** (9.2 (2)–(3)) — the alternative
   (the first copy kept) loses a sliver of one face; leaving the defect merges blocks.
3. **The slit C faces and the degenerate face left out of the candidate** — a slit boundary is not a simple ring at any
   resolution, and the degenerate face repeats another; no cut is lost.
4. **`arrivalCdeg` as the smaller end, `cornerT` −1 for two-bend cuts, the cut order, every leaf in `blockAreasCm2`** —
   §7b leaves each open.
5. **Cumulative rounding of the leaf areas** — the plan's "within one cm²" then holds in the file's integers.
6. **Hex-delimited reading of the colour rule** (N-03) for this file's strings.

### 9.10 Content scan and disk

`doc_checks.py --doc docs/calibration/E10-ng-bentcut-faces.md --heads docs/ARCHITECTURE.md` after this section: see the
result file `results/W-10b.json`. Disk: 12 GB free at the start and the end; this item's outputs are 1.2 MB.

### 9.11 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** every number in 9.1–9.7; the fixture reproduction and byte-identity; the template rule on 44
recordings; the graph equality with the adapter; the frame and built-count cross-checks; the area identities; the
candidate checks; determinism; the red tests. **PLAUSIBLE (reasoning):** that the square template's three roads and the
street template's one are what CA-2's k counts (the arithmetic is shown there, the identification inferred); that the
mutual fallback snap on `square/medium/3` is a drawing artefact rather than NG's own topology; that the C-shaped σ's
large contamination term reflects wrapping faces rather than too few cuts.
