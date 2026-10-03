# E05 — FTG payload metrics (M-1 work item W-05: D14, D25, D26 and FTG's share of D16)

Lane `m1/W-05`, 2026-10-03, on the owner's Mac. A research-side record: implementer seats do not read it
(`plat/CLEAN-ROOM.md` rule 2). It holds numbers, metric ids, file paths and our own words; no district name, building
label, asset key or request identifier of the reference is written here. Nothing was written into `plat/`, nothing
touched a third-party site, no git command was run, and no captured program bundle was read (the inputs are the two
Fetch-intercepted layout payloads and the network indexes).

**Outcome.** The work item is done on the two existing CITY payloads, and every check of its row passes (CONFIRMED by
execution). The new adapter `research/baselines/adapters/ftg.py` turns each payload into a `MeasureInput` file, and the new
`research/baselines/measure_ftg.py` measures every FTG metric of D14, D25 and D26 on that file by V12 §3.4.2. Its twin
reproduces the existing numbers through the same decoder. `length_precision.out.txt` is reproduced line for line on both
payloads (31 / 31 and 26 / 26 lines), giving the runs **50.5 / 30.25 / 50.25 / 30.00 / 14.70 m**. The counts reproduce
(**2 798 and 2 813** buildings, **17 / 29** towers), and so do `_critic-ftg.md` §4 rows 7–9 on the payload they were
measured on (type-0 turn bins 12–18 = 28 / 19 / 16 / 0 / 0 / 1 / 0; junction arms p50 90.02°, n 5 213, 58.2 % in
80–100°; largest heading bin 7.8 %). The turning and entropy values agree with those rows under the criteria fixed before
the first run (section 3). The per-size rows (BIG_TOWN, BIG_CITY) and FTG's variety dispersion wait for the six W-02
captures, as the plan orders. The tool needs no change for them. Its provenance step, run read-only on the day-1
folder, gives W-02's own `referenceBuild` and server time; no geometry was measured there.

The re-measurement moves five numbers §13.5 states for FTG. Each one is CONFIRMED, and each needs a ruling or a
declared shift (section 8):
1. The tree nearest-neighbour median is **10.6 m, not 9.7 m**. The recorded figure dropped 320 of 4 125 trees (7.8 %),
   the isolated ones whose neighbour lay beyond its search block.
2. The "6 and 2 ungated crossings" include the wall's chain ends. Under V12's definition (arterials crossing the
   curtain) they are **3 and 1**; counting every way class, they are 4 and 1.
3. The 50 m water step holds on the 2026-09-21 payload. On the 2026-09-25 payload the coast is drawn at a finer step,
   and the pooled step is **15.7 m**.
4. Outline anisotropy by V12's definition is **0.365 / 0.333**, with a road ratio of **1.16 / 1.21**. The recorded
   0.20 / 0.33 and 1.26 / 1.65 came from 16 land-only sectors.
5. The 15° per-vertex cap is not absolute on the second payload. One type-0 vertex turns 16° (one of 178 by row 7's own
   method), and one trail vertex turns 15°.

## 1 What was built and run

| file | what it is |
|---|---|
| `research/baselines/adapters/ftg.py` | payload → `MeasureInput` (V12 §2.2), schema `research.measure-input/1` as the NG adapter writes it; standard library; decodes zig-zag centimetres; field and edge-type numbers from `research/findings/code-ftg-client.md` §2 |
| `research/baselines/inputs/FTG/ftg-2026-09-21_26c4ad3e075b/2026-09-21T05-23-58.metric.geojson.gz` | feature counts by kind: way 772; wall 1 (stretches); tower 17; building 2 798; water 4; pier 12; tree 4 125; field 203; district 4. 0 degenerate drops (182 KB) |
| `research/baselines/inputs/FTG/ftg-2026-09-25_ba02af9ca044/2026-09-25T10-13-51.metric.geojson.gz` | the same kinds: 617; 2; 29; 2 813; 4; 20; 3 844; 184; 3. 0 degenerate drops (179 KB) |
| `research/baselines/measure_ftg.py` | the twin and the metrics; standard library plus PIL (installed) for the cluster-block raster |
| `docs/calibration/E05-ftg-metrics.json` | every number below, per capture, with the checks and the pre-registered extension (sha256 `243bca8e…`) |

`referenceBuild` per capture is `ftg:<server date>+<sha256 of the exact PUT body, 12 hex>`, as W-02 forms it:
**`ftg:2026-09-21+26c4ad3e075b`** (274 293-byte body, sent in session `2026-09-21T05-08-07`; the payload is the 05:24
re-load of that settlement, same id, no PUT between) and **`ftg:2026-09-25+ba02af9ca044`** (274 294 bytes). Both payloads
are FTG's CITY preset (nominal 9 500 people, 5 km map) with coast and rivers on. The only differing request value is the
second stage's road length, 60 against 100 m. Both are fixtures. They are not plan slots (`plan.json`'s FTG slots are
the six BIG_TOWN / BIG_CITY captures), so no `baselines.json` row is built from them (C7).

Run (project root): `python3 research/baselines/adapters/ftg.py` then `python3 research/baselines/measure_ftg.py --check`
(≈ 50 s). For a new capture: `python3 research/baselines/adapters/ftg.py <stamp>` and
`python3 research/baselines/measure_ftg.py <stamp> --json <file>`. The checks of section 2 are tied to the two fixtures.

## 2 The twin — the existing numbers re-derived through the new decoder (CONFIRMED, executed)

| recorded number (source) | re-derived 2026-09-21 / 2026-09-25 | verdict |
|---|---|---|
| `roadlength100/length_precision.out.txt`, whole output except the name lines | 31 of 31 and 26 of 26 lines identical | reproduces |
| runs 50.5 / 30.25 / 50.25 / 30.00 / 14.70 m (row's checker; roadlength100 README) | stage-1 main runs 50.5 (×15) / 50.5 (×9); stage-2 street p50 30.25 / 50.25; suburb street p50 30.00 / 30.00; suburb short piece 14.70; lot outline 14.70 / 14.70 | reproduces |
| 2 798 and 2 813 buildings; 17 / 29 towers (row; roadlength100 README) | 2 798 / 2 813; 17 / 29 (also in each `MeasureInput`) | reproduces |
| edges / nodes / districts 5 326 / 4 303 / 4 and 4 811 / 4 045 / 3 | same | reproduces |
| `_critic-ftg.md` §4 row 2: degree 1: 83, 2: 2 678, 3: 969, 4: 561, 5: 10, 6: 2; 4-way 36.4 % (`ftg_arith.out` C) | same; 36.4 % (2026-09-25: 33.9 %) | reproduces |
| row 7: type-0 turn bins 12…18 = 28, 19, 16, 0, 0, 1, 0 | same (2026-09-25: 9, 23, 11, 0, **1**, 0, 0) | reproduces |
| row 8: junction arm p50 90.02°, n 5 213, 58.2 % in 80–100° | same (2026-09-25: 90.02°, 57.0 %) | reproduces |
| row 9: largest 10° heading bin 7.8 % | 7.8 % (2026-09-25: 8.4 %) | reproduces |
| rows 10–12: footprint median 102.7, p95 154 m²; quad side 10.34 m; worst corner median 0.68°, p95 22.9°, p99 42.2° | same (2026-09-25: 96.4, 189; 10.12; 0.56, 21.6, 42.3) | reproduces |
| row 18: water outline step 50.0 m on all four; rivers 2A/P ≈ 31 m (30.9, 31.0) | same; 2026-09-25: rivers 50.0 / 49.9 m step and 2A/P 47.7 / 47.6 m; **coast 15.0 m and basin 13.0 m step** | reproduces; second payload differs |
| row 20: tree NN median 9.66 m, minimum 0.14 m, mean 11.49 m | same (2026-09-25: 9.40, 0.10, 11.28) | reproduces the script; see section 8 (1) |
| wall probe: 17 / 17 towers on wall nodes, spacing along the wall n 16, 18.9 / 39.3 / 72.8 m; 29 / 29, n 27, 4.4 / 35.6 / 59.7 m | same | reproduces |
| plot census [N]: wall nodes with ≥ 2 street arms 6 and 2; 0 crossings without a shared node | same | reproduces; see section 8 (2) |
| plot census [M]: shared wall in rings, residential 2 % / 5 %, industrial 96 % / 98 % | same (n 888 / 51 and 1 213 / 61) | reproduces |
| `ftg_anisotropy.out`: land-sector r90 CV 0.20 / 0.33, road ratio 1.26 / 1.65, centres (4, 204) and (174, −405) m | same | reproduces |
| server time 2.9–3.2 s (PUT → layout OPTIONS; roadlength100 README, B17) | 3.234 / 2.897 s | reproduces |
| FTG persons per building 3.4 (§13.5) | 9 500 / 2 798 = 3.40 (2026-09-25: 3.38) | reproduces |

Further receipts: the stored `MeasureInput` files equal a fresh adapter run (both `True`). A second full run wrote a
byte-identical JSON (sha256 equal) and identical stdout. With one expectation changed (`--red`: run 50.5 → 50.0),
`--check` prints FAIL and exits 1 and writes nothing. The adapter's way chains cover every road edge exactly once: the
way features hold 1 499 and 1 157 segments, which equal the type 0 + 1 + 2 + 10 (+ 13) edge counts. The adapter's
`provenance()` was also run read-only on W-02's day-1 folder `2026-10-03T17-19-06`. It returned
`ftg:2026-10-03+aa8ba6c213b6` (274 285 bytes) and 2.553 s, the same values as that capture's README, so the hash rule
is W-02's.

## 3 The row's turning and entropy check — criteria fixed before the first V12 value (CONFIRMED)

The row asks that turning per 100 m and heading entropy "agree with rows 7–9 within the 10 m-resampling change
(declared)". Rows 7–9 are statements about one payload: `critic2/zigzag_rederive.py` reads only the 2026-09-21 payload.
The script fixed four criteria before the first run:
- (i) the raw way vertices of the V12 way set keep row 7's cliff, with the 15° and 16° bins empty;
- (ii) `junction.angles` by V12's definition has its median within the 1° angle floor of 90.02°;
- (iii) the length-weighted heading spectrum of the 10 m chords stays flat, with its largest 10° bin under twice the
  uniform 5.6 %;
- (iv) both new values exist.

| criterion | 2026-09-21 (rows 7–9's payload) | 2026-09-25 (pre-registered extension, not a row check) |
|---|---|---|
| (i) raw way-vertex bins 15° / 16° | 0 / 0 — pass | 1 / 1 — **fails by data**: the 16° vertex is a type-0 suburb vertex, which row 7's own method also finds on this payload (bins 15 / 16 = 0 / 1); the 15° vertex is on a trail (edge type 13, absent from the first payload) |
| (ii) junction median | 90.15° — pass | 90.52° — pass |
| (iii) largest heading bin | 10.5 % — pass | 9.7 % — pass |
| (iv) turn100, entropy50 | 8.021° per 100 m, 1.507 bits — pass | 8.494°, 1.180 bits — pass |

The row's check passes. The extension's failure is a fact about the reference rather than about the tool: the twin of row 7
and the V12 way set report the same 16° vertex. The declared change from resampling is that 10 m chords soften the
cliff. The resampled step histogram holds 1.03 % / 0.82 % of steps above 15°, at 15–18° and in the ≥ 45° overflow
(0.50 % / 0.23 %). Two vertices inside one chord add their turns, and one vertex turn spreads over two chords. Raw way
vertices show no mass at 15–16° on the first payload.

## 4 The V12 values per CITY payload (fixtures; CONFIRMED, executed on the `MeasureInput` files)

Way classes: arterial 96 / 51 ways (9.7 / 7.0 km), street 262 / 279 (11.8 / 13.1 km), lane 404 / 281 (18.2 / 13.4 km),
track 10 / 6 (5.3 / 4.7 km). Quantiles inside a seed are Hyndman and Fan type 7.

| metric | 2026-09-21 | 2026-09-25 | §13.5's recorded FTG number | change and its cause |
|---|---|---|---|---|
| `street.turn100` (° per 100 m, length-weighted median, ways ≥ 50 m) | **8.021** (228 ways); arterial 6.87, street 20.88, lane 11.30, track 8.02; without tracks 9.01 | **8.494** (245); 5.38, 11.72, 10.58, 8.63; without tracks 5.95 | — (⟨M-1⟩, new) | new; the street class halves where the second stage's road length is 100 m instead of 60 m (fewer capped vertices per 100 m) |
| `street.stepHist` (1° bins 0–45 + overflow) | n 4 163; 87.0 % in bin 0; 1.03 % above 15°; overflow 0.50 % | n 3 544; 87.5 %; 0.82 %; 0.23 % | "zero mass above 15° per step" (rows 7–9) | section 3 |
| `street.entropy50` (bits; 18 bins of 5°) | **1.507** (493 windows; 9 above 90°) | **1.180** (469; 1) | — (new) | new; maximum log₂ 18 = 4.17 |
| `junction.angles` (median, p5) | **90.15°, 69.65°** (n 1 303; 55.4 % in 80–100°) | **90.52°, 59.99°** (n 1 060; 56.2 %) | median 90.02°, 58 % in 80–100° | way graph only (lot outlines, fences, water outline and border no longer arms), nodes merged within 2 m (24 / 11 clusters), arms 10 m along |
| `junction.share4` | **0.279** (394 junctions) | **0.299** (318) | 36.4 % | the same way-graph change: 4-way share of junctions among ways only |
| `street.runs` (m, per-class median of junction-to-junction runs) | arterial **55.17** (96), street **41.98** (262), lane **40.24** (404), track 278.1 (10) | **57.60** (51), **49.61** (279), **44.69** (281), 317.0 (6) | main L + 0.5, district (L + 0.5) / 2, suburb 30.00, lot outlines 14.70 (edge and collinear-run modes) | different quantity: V12's runs end at every way junction and the median mixes run counts; the roadlength100 laws stay as recorded (section 2) |
| `bldg.area` (m², median, p95) | **102.67, 153.69** | **96.44, 188.97** | 103, 154 | type-7 quantiles; second payload new |
| `bldg.quadSide` (m) | **10.337** (2 514 quads) | **10.120** (2 532) | 10.3 | — |
| `bldg.worstCorner` (°, p95) | **22.93** | **21.54** | 22.9 | — |
| `bldg.partyShare` (median share of perimeter within 0.3 m of another footprint) | **0.000** (mean 0.037) | **0.000** (mean 0.067) | residences 0–5 %, industry 96–98 % (a different measure) | V12's per-footprint share; by category in rings: residential median 0, attached 2.4 % / 11.6 % (5.4 % without the 80 exact-duplicate records of the second payload); industrial median 0.51 / 0.40, attached 96.1 % / 98.4 % |
| `bldg.attached` | **0.072** | **0.110** | — | counts the second payload's 40 exact-duplicate pairs (kept: V12's degenerate rule does not drop duplicates; decision W05-D16) |
| `wall.towerSpacing` (m, p50 along the curtain) | **38.65** (n 16) | **35.59** (n 27) | 39 m | on the first payload's even count (16) type 7 averages the two middle spacings; the probe took the upper one (39.3); the second payload's odd count gives the probe's 35.6 |
| `wall.ungated` (arterial crossings of the curtain at no gate) | **3** (any way class 4) | **1** (any 1) | 6 and 2 | section 8 (2) |
| `gate.count` | **0** | **0** | — | the payload has no gate object |
| `water.step` (m, median spacing after dropping vertices turning < 1°, pooled) | **50.37** (n 172) | **15.69** (n 545) | 50 m | section 8 (3) |
| `water.riverWidth` (m, median of inward-normal bank widths) | **31.30** (1 148 samples; p25–p75 31.29–31.31) | **48.48** (1 123; 48.48–48.49) | ≈ 31 m | rivers are constant-width ribbons; the second payload's are wider |
| `tree.nnP1`, `tree.nnMedian` (m) | **0.901, 10.591** (4 125 trees; min 0.141) | **1.118, 10.570** (3 844; min 0.100) | median 9.7, min 0.14 | section 8 (1) |
| `tree.pcf` at 1, 2, 3, 4, 5 … 20 m | 36.3, 21.1, 16.1, 13.7, 12.2 … 6.40 (h 11.7 m) | 41.6, 24.2, 18.6, 15.8, 14.2 … 7.85 (h 12.1 m) | — (new) | the map square as window: trees fill a fraction of it, so g ≫ 1 throughout (clustering at the forest scale); declared parameters W05-D9 |
| `pop.perBuilding` | **3.395** (9 500 nominal / 2 798) | **3.377** | 3.4 | `populationSource: nominal` (no resident count in the payload) |
| `time.model` (ms, PUT sent → layout GET sent) | **4 267** (PUT → OPTIONS 3 234) | **3 717** (2 897) | server 2.9–3.2 s | W-02's definition (PUT → GET); §13.5's figure is PUT → OPTIONS, reproduced in section 2; no score ratio applies to a remote server; scene time not re-derivable here (the step log stamps a step's end after its profile settles, not the click) |
| `outline.r90cv` (36 sectors of 10°, all sectors ≥ 5 buildings) | **0.365** (36 sectors) | **0.333** (35) | 0.20–0.33 | section 8 (4) |
| `outline.roadRatio` | **1.160** (9 road sectors; 11 arterial exits) | **1.214** (11; 17) | 1.26–1.65 | section 8 (4) |

## 5 Wealth (D25) — member ids fixed here (W-05 fixes them, `metrics.m-1.json` `wealth.*`)

Member ids: **`wealth.tier1` … `wealth.tier6`**, the share of households requested in each lifestyle tier, lowest first
(request order; the residential pools step up in the same order, CONFIRMED by reading). Values, identical in both
requests: **0.0109, 0.0109, 0.2174, 0.4348, 0.2174, 0.1087** (weights 1, 1, 20, 40, 20, 10 of 92). They are inputs.
The payload has no per-household or per-building tier. Its residence buildings map to the request's residential pools,
and each building type sits in a pair of adjacent tiers. Only **tier pairs** (1–2, 3–4, 5–6) are recoverable, so the six
rows stay descriptive by design (plan section 8 (6)). The output proxy, as a descriptive note with no row: residence
buildings by tier pair **0.249 / 0.588 / 0.163** (2 039 residences, 0 unmapped) and **0.242 / 0.565 / 0.193** (2 031),
against requested pair shares 0.022 / 0.652 / 0.326. These are building counts, not households: the low pair has
11 times its requested share of buildings. `metrics.m-1.json` was not edited (W-01's landed file); W-15 registers the
six ids from this section.

## 6 Variety (D16, FTG) — the signature vector, defined here as a proposal (a ruling is owed, shared with W-09)

§7.7 names the components (radial share of arterials, orthogonality index, street-density profile, block-area CV,
enclosed share, outline anisotropy) but defines none; no volume does (grep, CONFIRMED). `measure_ftg.py`'s
`m_signature` implements this proposal on any `MeasureInput`. Let *R* be the 90th percentile of building-centroid
distance from the header centre; only 10 m way chords with their midpoint within *R* count.
1. **radialShare**: the length share of arterial chords whose direction lies within 30° of the radial direction.
2. **orthogonality**: |Σ ℓ e^{4iθ}| ÷ Σ ℓ over all way chords. This is `grid.r4`'s form.
3. **density profile**: way km per km² in the annuli 0–⅓R, ⅓–⅔R and ⅔–R (three components).
4. **blockAreaCV**: the coefficient of variation of the cluster-block areas (V12 §3.4.1: 1.0 m gap, 3 m closing,
   computed on a 0.5 m raster with a square kernel) of blocks whose seed footprint lies within *R*.
5. **enclosedShare**: the share of buildings inside the outermost enclosure. It is 0 where a source has none.
6. **outline**: `outline.r90cv`.

Vectors: 2026-09-21 **[0.507, 0.214, 36.78, 27.22, 9.40, 1.669, 0, 0.365]** (R 715 m); 2026-09-25 **[0.141, 0.201, 27.56,
24.83, 10.66, 1.857, 0, 0.333]** (R 686 m).

Two findings bear on the ruling, both CONFIRMED:
- FTG's constant ≈ 1.5 m gap between footprints exceeds V12's 1.0 m cluster gap. So 2 588 of 2 617 and 2 495 of 2 565
  cluster blocks are single footprints, and FTG's "block-area CV" is close to its footprint-area CV.
- FTG has no enclosure (its wall is an open chain from bank to coast), so component 5 is constant 0 for FTG.

**Why no dispersion now.** `variety.dispersion` is defined per matched rung (BIG_TOWN, BIG_CITY), standardised by the
rung's pooled deviations, and these are CITY fixtures. Two vectors standardised by their own deviations always lie √(2k)
apart. The FTG floor is therefore computed when the six captures land (three per size, `estimator: minmax`, n = 3), with
pooled deviations formed with W-09's MFCG vectors. The proposed `absFloor` for this z-distance metric, which V12 leaves
open, is 0.1, a tenth of a pooled deviation (W05-D18).

## 7 Decisions taken under the delegation (each vetoable; none changes a design cell)

| id | decision | why; effect |
|---|---|---|
| W05-D1 | edge types 2, 10, 13 (dirt road, small road, trail) → way class `track` | the plan maps three classes only; they are road-like and outside the town's stages. `turn100` without tracks: 9.01 / 5.95 (with: 8.02 / 8.49) |
| W05-D2 | a way = a maximal same-class chain of road edges through way-degree-2 nodes | FTG stores no way entity; this equals `street.runs`' runs. Long through-streets are split at junctions, and ways under 50 m (mostly single straight edges) leave `turn100` |
| W05-D3 | header centre = area-weighted footprint centroid | V12 §2.2's last fallback: no exported square, wall not a ring; (−0.4, 230.3) and (178.0, −409.7) m against the old script's trimmed centres (4, 204) and (174, −405) |
| W05-D4 | water class: reaches the map border with 2A/P ≥ 200 m → sea; reaches it below 200 m → river; else lake (the harbour basins) | 1 sea, 2 rivers, 1 basin in each |
| W05-D5 | `entropy50`: non-overlapping 50 m windows of five full 10 m chords; the window's net heading change, absolute; ≥ 90° counted in the last bin (counts reported) | V12 states bins, not windowing |
| W05-D6 | junction arms: direction from the merged node's centre to the point 10 m along the arm, stopping at the next junction | V12: "10 m along it" |
| W05-D7 | `riverWidth`: inward-normal rays from bank samples every 10 m; map-border cuts excluded | V12 states "the median river width" only |
| W05-D8 | `water.step`: one pass dropping vertices turning < 1°; spacing along the outline | — |
| W05-D9 | `tree.pcf`: Epanechnikov kernel, h = 0.15 / √λ, translation edge correction, the settlement border square as window, λ² = n(n − 1) / \|W\|² | Stoyan and Stoyan's estimator with its common constant; the window choice drives the level |
| W05-D10 | outline: population SD for the CV; arterial exits = sign changes of (distance − its sector's r90) along 10 m-resampled arterials, a sector under 5 buildings counting r90 0 | V12 states the sectors and the 5° rule only |
| W05-D11 | `wall.ungated`: a crossing is an interior curtain vertex with way arms on both sides, or a proper intersection (0 here); chain ends never cross | section 8 (2) |
| W05-D12 | `time.model` for FTG = PUT sent → layout GET sent, no score ratio | W-02's README definition, so all eight captures share one |
| W05-D13 | wealth member ids `wealth.tier1` … `.tier6` = request shares; tier-pair output shares a note | section 5 |
| W05-D14 | the signature vector's definitions | section 6; to be ruled together with W-09 |
| W05-D15 | `field` features from ground-cover texture ids 0, 1, 3, 11, 12, 13 | PLAUSIBLE identification (six groups match the six farm textures of the code reading by count and size); no metric of this item reads them |
| W05-D16 | exact-duplicate footprints kept | V12 §3.2.2's degenerate rule does not drop them; the split without them is reported |
| W05-D17 | quantiles inside a seed: type 7 | the same estimator V12 §3.5.1 uses across seeds |
| W05-D18 | proposed `absFloor` 0.1 for `variety.dispersion` | `metrics.m-1.json` marks it open for W-05 and W-09 |

## 8 Numbers §13.5 states for FTG that the re-measurement moves (each CONFIRMED; for the shift record and a Fable ruling)

1. **Tree nearest-neighbour median 9.7 m → 10.6 m.** The recorded script searched one 20 m cell around each tree and
   silently dropped trees with no neighbour in that block. That removed 320 of 4 125 trees (7.8 %), all with large
   neighbour distances. A brute-force check on 300 trees agrees with the new value to 0.0 m. The minimum (0.14 m) and the
   "not Poisson" reading stand. The weakness row's reference median becomes 10.59 / 10.57 m.
2. **"6 and 2 ungated crossings" → 3 and 1 arterial crossings (4 and 1 by any way class).** The census counted every
   wall node carrying two street arms. Two of the 2026-09-21 nodes and one of the 2026-09-25 nodes are the wall chain's
   ends, where a street passes round the wall's end and crosses nothing. The other four (2026-09-21) are side-tested
   crossings: three on main roads and one on a street. The weakness row's bar ("ungated crossings 0") is unaffected;
   its reference number changes.
3. **Water step 50 m holds on one payload only.** On the 2026-09-25 payload the rivers keep 50 m, but the coast polygon
   (478 vertices) is drawn at a 15 m step and the harbour basin at 13 m, so the pooled V12 step is 15.69 m. The target
   band "outline step ≤ 25 m" is ours; the reference number is per payload.
4. **Outline anisotropy 0.20–0.33 / 1.26–1.65 → 0.365 / 0.333 and 1.160 / 1.214.** The old script used 16 sectors,
   land sectors only (water < 0.2, ≥ 20 buildings), a vertex-mean trimmed centre and main-road edge midpoints in a
   400–1 500 m annulus. V12's definition uses 36 sectors and keeps water sectors, which raises the CV on a coastal
   town. Its road sectors are those where an arterial leaves the built outline, which lowers the ratio. The band is
   recomputed by the band rule once the six captures give per-size rows. §13.5's "monotone in the anisotropy row" is
   ours.
5. **The 15° cliff (rows 7–9, weakness).** It reproduces exactly on the 2026-09-21 payload. On the 2026-09-25 payload,
   one type-0 vertex turns 16° (row 7's own method, 1 of 178 type-0 turns under 45°), and after 10 m resampling ≈ 1 %
   of steps lie above 15° on both. The weakness clause "no cliff" is a property of ours and still reads; the wording
   "zero mass above 15° per step" for FTG should read "≤ 1 % above 15° per 10 m step; no raw vertex above 15° on the
   2026-09-21 payload, one at 16° on the 2026-09-25 payload".

Also new, not a §13.5 number: FTG's junction 4-way share among ways is 0.28 / 0.30, against 36.4 % over every edge
type. The weakness reference for organic presets should read the V12 value.

## 9 What waits for the six captures (sequencing by the plan, not a deferral of a finding)

The six W-02 payloads (day 1 landed `2026-10-03T17-19-06`; the task scoped this lane to the two CITY payloads) each get
`adapters/ftg.py <stamp>` and `measure_ftg.py <stamp>` the day they land. Three results follow from them:
- the per-size rows: BIG_TOWN and BIG_CITY, `estimator: minmax` at n = 3, `sample.captures` the plan's slots in order;
- FTG's `variety.dispersion` floor, with W-09's pooled deviations;
- the BIG_TOWN / BIG_CITY time rows (`time.model`, weakness), which are not contended only if W-02's machine note allows.

None of these needs new code. The fixture checks of section 2 stay tied to the two CITY payloads.

## 10 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read):
- every number in sections 2–6 and 8;
- the twin reproductions;
- the `referenceBuild` hashes;
- the duplicate count;
- that rows 7–9 come from one payload;
- the tree-search bias and the wall-end crossings;
- that the signature components are undefined in the design.

PLAUSIBLE (reasoning only):
- the farm-texture identification (W05-D15);
- why the second stage's road length lowers the street turning (fewer capped vertices per 100 m);
- that the wider rivers and finer coast of the second payload are generator variation rather than a request difference
  (the requests differ in one leaf);
- that the historical CITY server times were not contended.

## 11 Disk and housekeeping

`python3 docs/validation/bench/doc_checks.py --doc docs/calibration/E05-ftg-metrics.md --heads docs/ARCHITECTURE.md`
over the full corpus (10 174 colour files, 9 691 JSON files, 941 027 corpus 3-grams, 814 lists) reported C1 0, C2 0,
C4 0, S1 0 and S2 0. C3 reported 38 hits, 36 of them unreviewed: digit runs, dates, capture stamps and phrases of our
own records, none of them a reference word list, palette, grammar or identifier. The exit status 1 is that unreviewed
count. A first run found C4 2: a feature-count list on two lines that matched a corpus list's member set, so those
lines were reworded. This record is outside the design set, so no allow rows were added.
`df -h /Users/cstokes`: 15 GiB free before and after. The outputs are 0.36 MB of `MeasureInput` and 32 KB of JSON. No
capture folder was made, nothing was deleted, and no git command ran. Long outputs are in the session scratchpad
(`m1/w05-*.out`).
