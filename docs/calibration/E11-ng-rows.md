# E11 — NG ⟨M-1⟩ rows, blocks, pairing, party walls, Moran, time (work item W-11)

Lane `m1/W-11`, 2026-10-03, on the owner's Mac. Research side only: nothing here entered `plat/`, no third-party site
was touched, and no captured program bundle was read. Numbers, metric ids and our own words only. Inputs: the four
2026-09-25 NG vertex captures (`captures/neighbourhood/2026-09-25T10-55-{19,36,47,59}`, build `itch:11441280`, seeds 7171
and 7172 per template at `medium`) and, for time only, the stored CPU-profile totals of `2026-09-21T05-04-54` and
`2026-09-21T07-20-25`. Numbers: `docs/calibration/E11-ng-rows.json` (sha256 `4efbbca0…`, deterministic).

## Outcome

**The row's checker passes (CONFIRMED, executed).** The twin, which is our adapter writing `MeasureInput` files plus our
measurement code reading only those files, reproduces the following byte for byte:
- `README-vertices.md`'s 36 table rows (40 lines with the separators);
- all 8 rows of `plot_granularity_baseline.py` under that script's own definitions, compared against its live output.

Detour and cycles are reported per template and seed: detour differs by 0.1–6.2 % between the two seeds (all-pairs
median 1.0–6.0 %), cycles per area by 7–33 %. 41 internal checks pass. Both runs are byte-identical, and two planted faults each turn the checker red.

**A finding that changes how NG captures must be read (CONFIRMED).** NG paints the road layer and the footprint layer
on separate offscreen canvases. Each canvas is sized to its own content and composited later, and the composite
placement is not recorded. So the two layers' recorded pixel frames differ by an integer offset: (−1, 2) px in ring
7171 and up to (31, 18) and (24, −29) px elsewhere. Unregistered, road centrelines cross 88–484 footprints in seven of
the eight maps (1 in ring 7171).

The adapter now locates both canvases in each generation's own screenshot and moves the footprints into the road
frame. After that, 0–1 footprints are crossed per map. Every footprint-to-road measure (built blocks, court share,
frontage gaps, footprint frontage) depends on this step. Road-only and footprint-only measures do not, and neither do
W-10's numbers, which use face areas and footprint medians only. The NG programme's 44 recordings (W-04) will need the
same step; it runs automatically when `gen-N.png` is kept.

**Nothing here is a crossing-ready row yet.** All values are twin fixtures on recorded seeds. Plan-check PC-04 applies:
C7 needs W-04's plan seeds or a recorded-sample ruling. The metre-scale metrics use a declared conversion (PC-03), and
the time values carry no §12.1 ratio (PC-11). Section 6 lists the rulings owed.

## 1 What was run

| step | command | result |
|---|---|---|
| adapter | `python3 research/baselines/adapters/ng.py` | 8 files `research/baselines/inputs/NG/itch-11441280/<capture>.gen-<g>.metric.geojson.gz`, 0.86 MB in all; 0 degenerate drops (no zero-area footprint, no duplicate vertex, shortest edge 0.02 px) |
| measure | `python3 research/baselines/measure_ng.py --json docs/calibration/E11-ng-rows.json --check` | exit 0; `T1 PASS`, `T2 PASS`, `internal checks: 41/41 pass`, `CHECKER PASS`; ≈ 80 s |
| determinism | adapter and measure re-run into scratch | 8 input files sha256-identical; E11 JSON byte-identical; stdout identical |
| red A | footprints of one map moved 20 px (an unregistered input) | exit 1: the registration check fails (381 footprints crossed) |
| red B | one footprint vertex moved 0.5 px | exit 1: T1 fails on the lot-table row of street 7171 (T2's rounded columns do not move at 0.5 px) |
| content scan | `python3 docs/validation/bench/doc_checks.py --doc docs/calibration/E11-ng-rows.md --heads docs/ARCHITECTURE.md` | C1 0, C2 0, C4 0, S1 0, S2 0; C3 42 hits, 40 unreviewed, all read: every one a capture folder name or date, a digit run, or a short common-English phrase that also occurs in our own findings text; none a reference word list, palette, grammar or identifier. Exit 1 by that count; this record is outside the design set, so no allow rows are added (W-10's practice) |
| disk | `df -h /Users/cstokes` | 15 GB free before and after; no capture folder made |

## 2 Method and declared rules

**MeasureInput (V12 §2.2, `scale: 'relative'`).**
- *Ways.* Every drawn road centreline is a way. A junction end (a street end within 3 × its own half-width of another
  road) is moved onto the crossed centreline by the rule the bent-cut scripts use, and the landing point becomes a
  shared vertex of the crossed road. This yields 206 / 170 / 133 / 111 / 57 / 60 / 31 / 43 junction ends with 0
  fallback snaps; faces and open faces equal E10's per map.
- *Blocks.* Blocks are the bounded faces of that planar graph, drawn centrelines with street corridors not inset. The
  hood outline is not drawn, so land at the hood edge belongs to no block.
- *Plots and buildings.* Both are the footprint outlines, the lot after set-back, which is the closest thing to a lot NG
  draws.
- *Sidecar.* A research-side sidecar keeps the drawn polylines' draw order and widths, the roof faces and the
  registration receipt. No metric reads it, and it never crosses.

**Layer registration.** Each canvas is located in `gen-N.png` by an integer search: footprint outlines against dark ink,
and road corridors (centrelines at their drawn widths) against road-coloured pixels. Footprints move by the difference.
- The footprint fit is sharp: hit share 0.45–0.78, against 0.29–0.51 one pixel away.
- The road fit is shallow: 0.67–0.86, against 0.65–0.82 one pixel away. Precision is therefore about ±1 px, so every
  cross-layer measure is repeated at the four ±1 px neighbours.
- At those neighbours, built-block counts and court shares are identical, and gaps move by ≤ 0.07 per 100 m.
- The two layers' paint scales differ by ≤ 0.0002 (under 0.3 px across a map), which is negligible.

**Scale (PC-03, declared).** Model units (mu) are canvas px divided by the map's paint scale. Every constant V12 states
in metres uses 0.35 m per mu, ARCHITECTURE §4.6 step 5's inference: the 2 m merge, the 10 m arm, the 100 m detour
minimum, the 2 m gap, the 100 m frontage unit, km² and the 1 mm merge. Every such key is suffixed `declared` in the JSON.
Relative variants are given beside them: per median footprint short side or area. The median footprint short side is
20.3–20.8 mu (≈ 7.1–7.3 m declared) and its area 586–605 mu². These are type-7 medians; the nearest-rank medians
reproduce E10's per-map values, which is a check.

**Definitions declared here (V12 states none, or leaves a choice).**
- **Junction census and `junction.*`.** Topological nodes (degree ≠ 2) within 2 m (declared) merge. A chain with both
  ends in one merged cluster and no longer than 4 m is internal. Arms run to the point 10 m along each chain.
  - *End-on T:* a degree-3 cluster holding a landing point.
  - *Geometric T:* a degree-3 cluster whose largest arm angle is ≥ 160°.
- **Court (hollow block), `block.courtShare`.**
  - *Deep:* the largest inscribed circle of the face polygon has radius > 1.5 × the median short side (computed to 1 %
    of that side).
  - *Interior:* the face, less every footprint dilated by 5 % of that side, rasterised at half the dilation distance.
  - *Court:* an interior component of ≥ 0.5 × the median footprint area that touches no block edge. Components use
    4-adjacency; touching the edge uses 8-adjacency.
- **`fg.streetwallGap100`.**
  - *Frontage:* each built block's centreline outline.
  - *Walled:* rays cast inward every 5 % of the median short side are walled when they meet a footprint within 1.0 ×
    that side.
  - *Count:* gaps longer than 2 m (declared) per 100 m (declared). Gap length per 100 m, the wording of
    `docs/improvements/ng.md`, is reported beside it.
  - *Why the band is 1.0:* it lies beyond the front row's measured setback (p90 0.52–0.60 × the short side) and short of
    the row's back edge (≈ 1.7). The count is flat across bands of 0.75 / 1.0 / 1.25 (± 0.12). An earlier band of 0.5
    fell inside the setback spread and gave a fragile count.
- **`bldg.pairing`.** *Sharing* means within the party-wall tolerance, 1 % of the footprint's own short side.
  - *Reading B (primary):* exactly one neighbour both shares ≥ 50 % of one of the footprint's edges and has an area
    within ± 25 %.
  - *Reading A:* exactly one neighbour shares ≥ 50 % of an edge, and its area is within ± 25 %.
  - *Mutual pairs* are reported too.
- **Shared-edge adjacency for `plot.moran`.** Shared length ≥ 10 % of the smaller footprint's short side, with unit
  weights.
- **`bldg.attached`.** Any shared length > 0, V12's literal wording. With the adjacency minimum it is 0–0.002 lower per
  map (0.978–0.996).
- **Built outline (`street.cyclesPerKm2`).** The convex hull of every footprint vertex.
- **`block.areaRel` bins.** Declared relative edges, 0.5 × 2^(i/2), i = 0…16; the catalogue's are owed.
- **`street.detour` stream.** 200 pairs by `random.Random(sha256('street.detour|<capture>|gen-<g>'))`. The all-pairs
  median is reported beside it.

## 3 The twin checks (receipts)

| check | rule | result |
|---|---|---|
| T1 | `paths_stats.py --md`'s four tables, re-implemented on the MeasureInput files (drawn polylines recovered from the sidecar), against `README-vertices.md` | PASS: 40 / 40 lines byte-identical, 36 header and map rows |
| T2 | `plot_granularity_baseline.py`'s row under its own rules (shared wall = collinear overlap ≥ 2 px within 0.1 px, pooled length ratio; Moran with 8 nearest centroids), against the script's live output | PASS: 8 / 8 rows byte-identical (party walls 95–99 % with ≥ 1 wall, 39–43 % of perimeter; Moran −0.04 … +0.03) |
| graph | way graph from MeasureInput = the adapter's graph; Euler E − V + C = faces − components | 8 / 8 and 8 / 8 |
| registration | footprints crossed by a centreline ≤ 2 | 8 / 8 (0, 1, 1, 0, 0, 0, 0, 0) |
| footprints | each counted once (in a block or in none) | 8 / 8 |
| E10 | footprint short-side and area medians equal E10's (same rectangle rule) | 8 / 8 |
| time | stored totals reproduce the profiler finding's tables | regeneration 52.2 / 38.8 / 47.1 / 10.4 / 96.0 / 77.7 ms, model 31.6 / 19.4 / 21.2 / 6.0 / 55.0 / 43.5 ms |

## 4 Results (fixture values per template and seed; `medium`)

| template / seed | footprints | `bldg.partyShare` (median) | `bldg.attached` | `bldg.pairing` B / A / mutual | `plot.moran` (shared edge) | `junction.angles` median / p5 ° | `junction.share4` | `street.detour` (200 / all pairs) | cycles | `street.cyclesPerKm2` (declared) | built blocks | `block.courtShare` | gaps > 2 m per 100 m (declared) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ring / 7171 | 1334 | 0.461 | 0.992 | 0.410 / 0.088 / 0.181 | −0.183 | 91.7 / 86.4 | 0.051 | 1.246 / 1.249 | 85 | 389.5 | 76 | 32 / 74 = 0.432 | 2.52 |
| ring / 7172 | 1270 | 0.463 | 0.987 | 0.413 / 0.091 / 0.169 | −0.158 | 91.5 / 86.0 | 0.043 | 1.230 / 1.234 | 67 | 323.6 | 59 | 24 / 59 = 0.407 | 2.61 |
| area / 7171 | 950 | 0.461 | 0.980 | 0.425 / 0.095 / 0.206 | −0.159 | 90.9 / 86.7 | 0.047 | 1.265 / 1.257 | 48 | 241.3 | 44 | 18 / 42 = 0.429 | 2.49 |
| area / 7172 | 858 | 0.464 | 0.988 | 0.429 / 0.094 / 0.184 | −0.014 | 91.0 / 87.1 | 0.047 | 1.267 / 1.278 | 42 | 279.8 | 40 | 20 / 40 = 0.500 | 2.47 |
| street / 7171 | 449 | 0.456 | 0.996 | 0.439 / 0.116 / 0.192 | −0.051 | 91.0 / 87.9 | 0.000 | 1.271 / 1.260 | 18 | 232.1 | 17 | 5 / 17 = 0.294 | 2.72 |
| street / 7172 | 447 | 0.453 | 0.978 | 0.403 / 0.092 / 0.188 | −0.084 | 91.1 / 87.9 | 0.053 | 1.250 / 1.273 | 20 | 248.8 | 18 | 8 / 18 = 0.444 | 2.41 |
| square / 7171 | 258 | 0.451 | 0.996 | 0.450 / 0.128 / 0.225 | −0.082 | 90.8 / 88.5 | 0.000 | 1.322 / 1.322 | 8 | 175.0 | 7 | 5 / 7 = 0.714 | 2.25 |
| square / 7172 | 295 | 0.419 | 0.990 | 0.464 / 0.132 / 0.210 | +0.053 | 92.9 / 88.1 | 0.024 | 1.242 / 1.244 | 14 | 243.8 | 11 | 3 / 11 = 0.273 | 3.15 |

**Distributions (JSON, per map).**
- *`plot.minWidth`:* p50 7.09–7.28 m declared (≈ 1.00 × the median short side), p10 5.2–5.5 m, p90 9.1–9.5 m. The
  histogram uses the catalogue's 0.25 m bins.
- *`block.areaRel` (built blocks / median footprint area):* p50 22.6–29.2, p10 15.5–20.7, p90 34.2–45.3.
- *`block.area`:* p50 1 659–2 107 m² declared, on the catalogue's log bins.

**Seed stability (reported, as the checker asks).**
- *Detour:* differs by 1.3 % (ring), 0.1 % (area), 1.7 % (street) and 6.2 % (square) between the two seeds. All-pairs
  medians differ by 1.0–6.0 %. Moving the 100 m minimum to 50 or 200 m changes the all-pairs median by ≤ 0.07, most
  in the street template.
- *Cycles per declared km²:* differs by 18 % (ring), 15 % (area), 7 % (street) and 33 % (square). The square template
  has only 8 and 14 cycles.

**Junction census (PC-10's T versus crossroads).**
- In all 8 maps the raw graph has **0** degree-4 nodes, and every degree-3 junction is end-on: 186, 156, 121, 101, 57,
  54, 31 and 41 after the merge. The 361 / 361 T reading of §13.5 holds on this data.
- 96–100 % of degree-3 junctions are also geometric T's.
- `junction.share4`'s 0–0.053 comes only from the declared 2 m merge joining two opposite end-on T's (10, 7, 6, 5, 0, 3,
  0, 1). **Its value is a property of the merge distance, not of NG's network**, so it needs a ruling (section 6).

**Courts.**
- Pooled over the eight maps: 115 of 268 deep built blocks hold a court (0.43). No shallow block holds one.
- 2 120 of 5 861 footprints (36 %) lie in no bounded face, because the hood edge is not drawn. Built-block counts are
  therefore interior counts: 76 / 59 (ring), 44 / 40 (area), 17 / 18 (street), 7 / 11 (square).

**Do lot cuts bend at party walls? (CONFIDENCE §6 #10.)** Of the footprint vertices turning by 1–10° (interior angle
170–190°), only 1–8 % lie on a party wall: ring 7171, for example, has 25 of 598. The bent-edge vertices that
README-vertices.md headline 4 left open are almost all on free edges, street fronts or rears, not between neighbours.

**For W-12 (descriptive, relative units).**
- *Built blocks' minor extent:* minimum-area-rectangle short side, p50 5.2–6.2 × the median footprint short side.
- *Footprints against their nearest block edge:*
  - width along the edge, p50 1.18–1.27;
  - depth across it, p50 1.29–1.36;
  - least distance to the centreline, p50 0.40–0.46 and p90 0.52–0.60;
  - 97–100 % of footprints in blocks lie within 1.0 × the short side of an edge (front row).

## 5 Shifts declared (old definition → V12's)

| metric | old (the script's own, reproduced by T2) | V12's definition, same captures | note |
|---|---|---|---|
| `bldg.partyShare` | 39–43 % of perimeter, pooled; overlap ≥ 2 px within 0.1 px | per-footprint median 0.419–0.464; pooled 0.406–0.448 | the tolerance (1 % of the short side, ≈ 0.11–0.23 px) and the per-footprint median raise it |
| `bldg.attached` | 95–99 % with ≥ 1 wall of ≥ 2 px | 0.978–0.996 | §13.5's 95–99 % cell would read 98–100 % |
| `plot.moran` | −0.04 … +0.03 (8 nearest centroids) | −0.183 … +0.053 (shared-edge adjacency) | neighbours across a party wall are more often unlike in area than neighbours by distance; §13.5's weakness cell reads the old number |
| `junction.angles` | 361 / 361 T (count) | median 90.8–92.9°, p5 86.0–88.5° | arms 10 m out read fillets and bends, hence slightly over 90° |

## 6 Rulings owed (for a Fable seat; recorded, not decided here)

1. **PC-03 scale rule.**
   - *Covers* `street.detour`, `street.cyclesPerKm2`, `plot.minWidth` and `fg.streetwallGap100`, plus
     `junction.angles`' 2 m and 10 m constants.
   - *Options:* accept the declared 0.35 m per mu with its provenance, or rule relative constants. Otherwise these are
     `notApplicable` on a relative input (V12 §3.5.6), and the ⟨M-1⟩ cells go descriptive with `known-defects.json`
     entries.
   - *Owed by the catalogue:* `street.cyclesPerKm2` and `fg.streetwallGap100` also need a unit (per km² and per 100 m
     are not in `MetricUnit`).
2. **PC-04 sample.** Every value is on recorded seeds 7171 / 7172. Rows need W-04's plan seeds (5 per template at
   `medium`), or a recorded-sample ruling on the Fantasy Manor precedent.
3. **`bldg.pairing` reading.** B (primary) gives 0.40–0.46 and A gives 0.09–0.13. The sentence admits both.
4. **`junction.share4`.** Raw it is 0 in every map; merged it is 0–0.053, from the declared merge distance only.
   Decide whether the NG target is the raw count (0, the cut-tree identity, now counted) or the merged one.
5. **`fg.streetwallGap100`'s operational definition** (section 2). "Dense frontages" and the band are not defined by V12.
6. **The built outline** for `street.cyclesPerKm2` (convex hull here), and the edge blocks for `block.countTemplate`.
   36 % of footprints sit in hood-edge land, which no face closes.
7. **`block.areaRel` bin edges** (catalogue `edges: null`; declared edges used).
8. **`plot.moran` and `bldg.partyShare` shifts** (section 5). §13.5's cells were stated on the old definitions.
9. **`time.model` (PC-11).** The six values below have a host but no §12.1 ratio, and they are CPU-profile totals
   (sampling under the profiler). They are fixture values feeding no row.

## 7 Time fixtures (`time.model`, NG; stored analyser totals, Apple M1 × 8; no row)

| capture | gen | template | how | regeneration ms (model + view) | model ms |
|---|---|---|---|---|---|
| 2026-09-21T05-04-54 | 0 | square | cold load | 52.2 | 31.6 |
| 2026-09-21T05-04-54 | 1 | street | regeneration | 38.8 | 19.4 |
| 2026-09-21T05-04-54 | 2 | area | regeneration | 47.1 | 21.2 |
| 2026-09-21T05-04-54 | 3 | street | regeneration | 10.4 | 6.0 |
| 2026-09-21T07-20-25 | 0 | ring | cold load | 96.0 | 55.0 |
| 2026-09-21T07-20-25 | 1 | ring | regeneration | 77.7 | 43.5 |

## 8 Hand-offs

- **W-04.** Keep `gen-N.png` in every recording, because the adapter registers from it. The adapter needs no template
  widths, unlike the bent-cut scripts' per-seed constant.
- **PC-01 (`ng-faces.json`) and any per-face footprint content.** Use the registered frame.
- **W-12.** Use section 4's minor extents, footprint frontage and depth.
- **W-15.** Rows come from `E11-ng-rows.json`'s `perSeed` once the rulings above land.
- **W-17.** The junction-census and court definitions in section 2 are the ones the digest cites (PC-10).
- **Not done here.** PC-13's NG `draw.*` rows (`hatched` target, roof ratios) are outside W-11's row. The plan was not
  amended to add them.

## 9 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):**
- the twin checks;
- the layer offsets, and the crossing counts before and after registration;
- every number in sections 4, 5 and 7;
- determinism and the red tests;
- the junction census;
- the ±1 px and band-depth sensitivities.

**PLAUSIBLE (reasoning):**
- that the offset comes from content-sized offscreen canvases composited later (the recorded canvas sizes and sub-pixel
  translations fit it, and the screenshot fit confirms the offsets, but the compositing step itself was not observed);
- that the more negative Moran's I reflects unlike neighbours across party walls;
- the ±1 px precision figure for road registration.

## 10 W-11b — the NG values on W-04's plan seeds (lane `m1/W-11b`, 2026-10-03 from 20:08 EDT; landing time in `docs/lane-events.log`)

Lane `m1/W-11b` appended this section; sections 1–9 above are W-11's record and were not edited. Research side only:
nothing was written into `plat/`, no third-party site was touched, no captured program bundle was read, no benchmark or
timing was run (M0's build seats shared the machine), and no git command changed state. Numbers, metric ids and our own
words only. Numbers: `docs/calibration/E11-ng-rows.plan.json` (sha256 `5a30648e…`, 2.06 MB, deterministic); hood
outlines: `research/baselines/candidates/ng-faces.hoods.json` (`7530098b…`).

**Outcome: the row's checker passes (CONFIRMED, executed).**
- *The fixture run still reproduces T1 and T2.* After every change below, `measure_ng.py --check` on the 2026-09-25
  fixtures prints T1 PASS (40 / 40 lines), T2 PASS (8 / 8 rows) and 41 / 41 internal checks, and its JSON is byte-identical
  to the landed `E11-ng-rows.json` (`4efbbca0…`). The adapter's eight fixture files re-run byte-identical too.
- *Registration on all 44 recordings.* Road centrelines cross at most 2 footprints per map at the registered offset (38
  maps 0, five maps 1, one map 2); at the four ±1 px neighbours the maximum is 3. Built-block counts are equal at every
  neighbour on every map; the court share moves by at most 0.0625 and the gap count by at most 0.30 per 100 m.
- *Samples.* Every `medium` family's measured indices are exactly [0, 5) and every `small` / `large` family's [0, 3);
  nothing failed, so no `sample.failed` entry exists.

Further checks of this lane's own, all PASS: each map is its `plan.json` entry (label, seed, folder, template, size,
index; the input header `declared` with `unitM` = 0.35 ÷ the map's paint scale and `seedLabel` the plan label); the way
graph equals the adapter's and Euler's identity holds on 44 / 44; paths_stats' four tables rebuilt from the plan-seed
`MeasureInput` files equal W-04's `paths-stats.md` (176 rows and 4 headers, byte for byte); the 20 hood outlines pass plan
§7b's research-side checks. Two full runs (three worker processes each) wrote byte-identical files. Seven planted faults
turn the checks red (a 20 px footprint shift: 417 crossed against 0; a missing index 4; a wrong `seedLabel`; a footprint
vertex moved 0.5 px; a self-crossing ring, a non-integer coordinate and a hood without `referenceBuild`), and the three
controls (the true header, the true map, a square hood) stay green.

### 10.1 What was run

| step | command | result |
|---|---|---|
| adapter, plan seeds | `python3 research/baselines/adapters/ng.py --plan --jobs 3` | 44 files under `research/baselines/inputs/NG/itch-11441280/plan-seeds/` (4.2 MB) and its `index.json` (label, folder, sha256, registration receipt, census) |
| adapter, fixtures | `adapters/ng.py --out <scratch>` | the eight landed files, byte-identical (sha256 compared) |
| measure, plan seeds | `python3 research/baselines/measure_ng.py --plan --jobs 3 --check` | exit 0, `CHECKER PASS`; ≈ 7 min wall on the shared machine; run twice, byte-identical |
| measure, fixtures | `measure_ng.py --check --json <scratch>` | exit 0; T1 PASS, T2 PASS, 41 / 41; JSON = `4efbbca0…` |
| red tests | `measure_ng.py --red` | 10 / 10 as expected (7 planted faults red, 3 controls green) |
| content scan | `doc_checks.py --doc docs/calibration/E11-ng-rows.md --heads docs/ARCHITECTURE.md` | section 10.9 |

**Tool changes (both scripts, our own code).** `adapters/ng.py` gained `--plan`: the 44 entries of `plan.json`'s twelve NG
families in plan order, each resolved through the programme index and cross-checked against its `meta.json` (seed, template,
size, build), written to a subfolder so the fixture run's directory listing is unchanged. `measure_ng.py` gained `--plan`
(the same per-map measurement, `measure_map`, unchanged, plus the additions of 10.2) and `--red`. The fixture mode's output
is unchanged byte for byte.

**A defect found and fixed in the adapter's face graph (CONFIRMED).** The first plan run failed its graph check on four
maps. (a) On three maps (`square/medium/3`, `area/large/1`, `square/large/1`) a fallback snap — the foot of the
perpendicular, used when a street end's extension misses — laid a street's last segment exactly on the crossed road's
segment, so two ways carried the same edge. Kept twice, the two copies sort to the same angle at both ends, the half-edge
walk sees a twisted rotation, and the faces on either side merge: `square/medium/3` showed 14 blocks where 16 exist
(Euler predicted 19 faces, the walk found 15). (b) On `square/large/2` two way vertices lay 0.0017 px (0.9 mm declared)
apart; the measured graph merges them by V12 §3.2.2's 1 mm rule, the adapter's did not. The adapter now merges way
vertices within 1 mm and collapses duplicate edges, counting both in the census (`duplicateWaySegmentsCollapsed` 2 / 1 / 1,
`wayVerticesMerged1mm` 1) only when non-zero; the fixtures have neither, so their files are unchanged. After the fix the
three maps hold 16, 66 and 129 blocks (was 14, 65 and 128) and every check passes. The other 40 inputs are byte-identical
before and after. **For W-10b:** the bent-cut scripts' face construction is the same, so `square/medium/3` (in W-10b's 20)
needs the same collapse before its faces are read.

### 10.2 The rulings applied

| ruling | applied as |
|---|---|
| R-01 | metres at 0.35 m per model unit, every such key suffixed `declared`; input header `scale: 'declared'` with `unitM` (DC-01); `block.areaRel`'s edges 0.5 × 1000^(i/24), i = 0 … 24, with underflow and overflow |
| R-05 | `bldg.pairing` reading B; reading A and the mutual-pair share as companions |
| R-06 | `junction.share4` with nodes merged within 2 m; the raw degree-4 count as a companion |
| R-07 | the ray definition of `fg.streetwallGap100` (band 1.0 × the median short side; 0.75 and 1.25 beside) |
| R-08 | `block.countTemplate` = bounded built faces, the share of footprints in no face beside; the built outline (`street.cyclesPerKm2`) and the hood outline = the convex hull of every drawn road and footprint vertex (`outlineKind` 1); section 2's footprint-only hull beside |
| R-23 | `plot.cvDistrict` = the hood's footprint-area CV (population standard deviation ÷ mean; ≥ 30 plots, met by all 20) |
| R-47 (d) | `spreadKS.p90` per template subset on `block.area` (and `block.areaRel`, `plot.minWidth`): V12 §3.5.3's p90 of the seed-pair KS distances, KS on the binned CDFs at the catalogue edges (V12 §3.4.2); the raw-ECDF KS beside |
| R-19 | `block.courtShare` pooled both ways: the type-7 median over the 20 hoods and the count ratio |
| R-44 | NG `time.model`: descriptive in C-0116's form, `values.n` 0, reason `contended` (W-04's per-generation wall times were taken beside M0's seats, E04 §4 (5)); no value here |
| R-47 (a) | measured values only; W-15 forms the rows. Each value block carries its sample (family, indices [0, 5), usable 5, failed none, the five capture folders in index order) |

### 10.3 Values at `medium` (five seeds per template: [min, max] and median; pooled: type-7 p10 – p90 and median over 20)

| metric | area | street | square | ring | pooled 20 |
|---|---|---|---|---|---|
| `bldg.pairing` (B) | 0.415–0.481 (0.439) | 0.389–0.454 (0.418) | 0.379–0.432 (0.423) | 0.388–0.453 (0.410) | 0.389–0.453 (0.421) |
| `street.detour` | 1.243–1.301 (1.277) | 1.140–1.292 (1.222) | 1.273–1.366 (1.289) | 1.221–1.250 (1.232) | 1.219–1.304 (1.254) |
| `junction.share4` (merged) | 0.040–0.060 (0.052) | 0.000–0.118 (0.062) | 0.037–0.077 (0.062) | 0.026–0.077 (0.038) | 0.026–0.077 (0.052) |
| `street.cyclesPerKm2` (decl.) | 138.5–291.7 (261.1) | 30.3–272.7 (84.7) | 99.0–270.3 (193.5) | 178.0–658.1 (330.1) | 81.4–331.2 (197.9) |
| `fg.streetwallGap100` (decl.) | 2.25–2.53 (2.40) | 1.69–2.85 (2.47) | 2.05–2.88 (2.43) | 1.99–3.11 (2.48) | 2.01–2.85 (2.45) |
| `block.courtShare` | 0.438–0.667 (0.457) | 0.250–0.500 (0.455) | 0.300–0.538 (0.400) | 0.242–0.486 (0.479) | 0.295–0.542 (0.457) |
| `block.countTemplate` | 16–57 (39) | 2–17 (6) | 5–23 (10) | 33–116 (59) | 5–61 (20) |
| `junction.angles` median ° | 90.2–90.7 (90.7) | 91.0–92.2 (91.1) | 90.6–93.9 (91.4) | 91.1–92.0 (91.3) | 90.6–92.0 (91.1) |
| `junction.angles` p5 ° | 87.7–88.1 (87.8) | 84.2–88.2 (86.6) | 84.2–88.1 (87.6) | 84.6–87.1 (86.0) | 84.5–88.1 (87.1) |
| `bldg.partyShare` (median) | 0.422–0.448 (0.435) | 0.371–0.453 (0.438) | 0.399–0.468 (0.415) | 0.418–0.487 (0.447) | 0.409–0.463 (0.441) |
| `bldg.attached` | 0.986–0.996 (0.989) | 0.980–0.993 (0.987) | 0.966–0.988 (0.986) | 0.984–0.992 (0.990) | 0.983–0.992 (0.987) |
| `plot.moran` | −0.111–+0.230 (−0.098) | −0.361–+0.000 (−0.234) | −0.230–+0.081 (+0.025) | −0.214–−0.088 (−0.148) | −0.235–+0.064 (−0.101) |
| `plot.cvDistrict` | 0.341–0.420 (0.365) | 0.296–0.494 (0.399) | 0.299–0.630 (0.432) | 0.373–0.531 (0.411) | 0.300–0.497 (0.393) |

The per-seed values, every companion and the per-map records are in the JSON (`medium`, `mediumPooled`, `maps`).
Companions in brief: pairing reading A 0.069–0.142 and the mutual share 0.141–0.288; detour all-pairs medians 1.140–1.356
(four hoods have fewer than 200 eligible pairs — street 3 and 4 with 72 and 84, square 0 and 1 with 135 and 160 — so
their sample is every pair);
`fg.streetwallGap100` gap length 12.6–47.4 m per 100 m; the footprint-only hull gives cycles per km² 32.7–684.0 (the R-08
hull is 1.04–1.43 times its area); the old script's definitions on these seeds give ≥ 1 shared wall 91.8–99.0 %, shared
length 36.3–45.1 % of perimeter and Moran's I (k = 8) −0.090 … +0.076.

**Distributions.** Built-block areas per seed: median 1 121–3 925 m² declared; `block.area`'s `spreadKS.p90` per template
(10 seed pairs each; binned / raw ECDF): area 0.327 / 0.356, street 1.000 / 1.000, square 0.703 / 0.840, ring 0.819 /
0.871; over the 20 hoods (190 pairs, across templates) 0.801 / 0.865. `block.areaRel` (median per seed 18.0–41.7 median
footprint areas): 0.383, 0.850, 0.580, 0.524 binned. `plot.minWidth` (median per seed 6.73–8.74 m declared; 12 482
footprints): 0.195, 0.348, 0.270, 0.388 binned. No block area fell outside 50–50 000 m² and none outside 0.5–500 median
footprint areas.

**Junction census.** 1 674 merged nodes of degree ≥ 3 over the 20 maps; the raw graph has one degree-4 node in all 20 (at
`square/medium/3`), and it is a snapping artefact: a fallback landing point placed on another street's drawn end, 0.67 px
(0.22 m declared) from that street's own landing on the road. Every merged degree-4 node joins two end-on T junctions within
the 2 m merge (`deg4FromTwoEndOn` equals the merged count on every map), as on the fixtures.

**Courts (R-19's input).** 276 of 597 deep built blocks hold a court (0.462); the type-7 median over the 20 hoods is
0.457. No shallow block holds one. The fixtures gave 0.43 (115 of 268).

### 10.4 Formula values against the recorded numbers (R-03: the formula row stands; the design number is corrected)

| cell | recorded (fixtures or §13.5) | formula seeds | beyond the row's floor? |
|---|---|---|---|
| `bldg.partyShare` (DC-24's new text) | per-footprint median 0.42–0.46 | 0.37–0.49 per seed (pooled p10–p90 0.41–0.46) | yes (floor 0.02) |
| `bldg.attached` (DC-24) | 0.98–1.00 | 0.966–0.996 | no (0.014 < 0.02) |
| §13.5 party walls under the old script | 39–43 % of perimeter, 95–99 % attached | 36–45 %, 92–99 % | yes |
| `plot.moran` (DC-25's new text) | −0.18 … +0.05 | −0.36 … +0.23 per seed (pooled p10–p90 −0.24 … +0.06) | yes (floor 0.05) |
| §13.5 Moran (8 nearest, the old rule) | −0.04 … +0.03 | −0.09 … +0.08 | yes |
| `junction.share4` (DC-04's new text) | 0–5 % 4-way under the 2 m merge | 0–12 % per seed (pooled p10–p90 3–8 %) | yes |
| `junction.angles` p5 | 86.0–88.5° (fixtures) | 84.2–88.2° | yes (floor 1°); the §13.5 bar (p5 ≥ 30°) is far off |
| `bldg.pairing` (fixtures) | 0.40–0.46 | 0.38–0.48 | at the floor |

DC-04, DC-24 and DC-25 were written from the fixtures; under R-03 the design seat should carry the formula ranges. This
lane edits no design file: the list is routed through the session to `design/m1-corrections-1` (or its successor).

### 10.5 D3: block minor extents by size (for W-12; every family's sample [0, n), nothing failed)

| template | `small` (3 seeds) p10 · p50 · p90 | `medium` (5) | `large` (3) |
|---|---|---|---|
| area | 4.53 · 5.62 · 7.24 × (35.1 · 44.1 · 56.7 m), 28 blocks | 3.93 · 5.35 · 7.43 × (30.0 · 39.7 · 54.6 m), 194 | 4.00 · 5.32 · 7.20 × (27.5 · 38.5 · 54.5 m), 158 |
| street | 4.44 · 5.52 · 6.50 × (33.7 · 41.6 · 49.1 m), 8 | 3.48 · 5.34 · 7.93 × (24.1 · 39.5 · 56.5 m), 40 | 3.99 · 5.31 · 8.36 × (28.4 · 39.0 · 60.8 m), 98 |
| square | 4.60 · 5.82 · 6.69 × (33.2 · 43.2 · 47.6 m), 8 | 4.06 · 5.20 · 8.06 × (30.5 · 40.7 · 60.8 m), 57 | 3.75 · 4.99 · 6.62 × (26.1 · 35.1 · 49.6 m), 195 |
| ring | 4.44 · 5.58 · 9.08 × (31.8 · 40.0 · 64.1 m), 66 | 3.88 · 5.29 · 7.71 × (26.5 · 38.4 · 58.1 m), 317 | 3.91 · 5.40 · 7.60 × (30.6 · 43.0 · 60.8 m), 266 |

The relative unit is the map's median footprint short side (6.7–8.7 m declared at `medium`). One `small` street hood
(`street/small/1`) has no built block at all: its roads close no face around a footprint. The per-seed values, the block
areas and the footprint frontage and depth that W-12 also reads are in `sizeSweepD3`.

### 10.6 The hood outlines (plan §7b `hoods[]`; R-08; N-02)

`research/baselines/candidates/ng-faces.hoods.json` holds the 20 `medium` hoods as §7b's records — `id` 0–19 in plan
order (area 0–4, street 5–9, square 10–14, ring 15–19), `referenceBuild` on every hood, `template`, `seedLabel` (the plan
label), `capture` (the folder) and `outlineCm` — plus a research-side sidecar per hood (input file and sha256, paint scale,
cm per px, area). The frame is the registered road frame of the plan-seed inputs: cm = road-canvas px ÷ paint scale × 35,
rounded half to even; rings closed. Rings have 13–31 vertices; the hulls cover 3.95–23.4 ha declared. Coordinates reach
60 934 cm, so the hood records alone stay below six consecutive digits; the built blocks' areas in cm² run to seven to
nine digits (654–10 011 m² at `medium`), so N-03's string-only colour reading still applies to the assembled file.

### 10.7 Readings for the seats that use these values (CONFIRMED as measurements; their use is W-15's and W-12's)

1. **The street template's block row has almost no power at n = 5.** Its hoods hold 2–17 built blocks, so two seeds'
   block-area distributions barely overlap: `spreadKS.p90` is 1.000 (binned and raw), and a band of 1.25 × 1.000 can
   never fail. Square (0.703) and ring (0.819) are wide too. W-15 should know this before it forms `block.area`'s
   per-template rows; the counts row (`block.countTemplate`, 2–17) carries the street template's information.
2. **R-07's band choice holds on 19 of 20 maps.** The front row's set-back p90 is 0.45–0.79 × the short side on 18
   maps, 0.91 on one and 1.06 on `street/medium/1`, so the 1.0 band no longer lies beyond it everywhere (the fixtures gave
   0.52–0.60). The count moves by at most 0.11 per 100 m from 1.0 to 1.25 (median 0.01), but by up to 0.50 from 1.0 to 0.75
   (median 0.04), where the narrower band cuts into the set-back spread.
3. **R-08's hull counts road stubs.** Including drawn road vertices enlarges the outline by 4–43 %, most in the street
   template, whose roads run on past the last houses; cycles per km² fall accordingly (pooled median 197.9 against 231.0
   with the footprint-only hull).
4. **Fallback snaps are rare: about 1 in 400 junction ends** (10 of 4 135 over the 44 maps, on 7 maps); the fixtures had
   none.
5. **36 % of footprints lay in no face on the fixtures; on the formula seeds the share is 13–82 % per hood**, highest in
   the street template (53–82 %), which R-08's note on `block.countTemplate` should quote.

### 10.8 Hand-offs

- **W-10b:** the plan-seed inputs (`plan-seeds/index.json`) are the registered frame; the hood ids its `faces[].hood` will
  reference are 10.6's; collapse duplicate edges before the face walk (10.1's defect, `square/medium/3`).
- **W-12:** `sizeSweepD3` (minor extents in both units per family and per seed, footprint frontage and depth),
  `mediumPooled.scalars['block.courtShare']` (`r19Median20` 0.457, the count ratio 0.462).
- **W-15:** `medium` and `mediumPooled` (per-seed values in index order, the samples, the companions for each row's note,
  `spreadKS`); NG `time.model` descriptive (`timeModel`); 10.7 (1).
- **The design seat (through the session):** 10.4's formula ranges for DC-04, DC-24 and DC-25.
- **The session (N-03):** none new; the hood coordinates stay below six digits.

### 10.9 Content scan and disk

`doc_checks.py --doc docs/calibration/E11-ng-rows.md --heads docs/ARCHITECTURE.md` before this section: C1 0, C2 0, C4 0,
S1 0, S2 0, C3 40 hits with 38 unreviewed (section 1's 42 / 40 then; corpus drift). After it: see the result file
`results/W-11b.json`. The seat was relaunched at 21:09 before its result was written; the relaunched seat re-ran the
adapter (fixtures and plan seeds), the fixture checker, the plan-seed checker and the red tests into scratch and compared
every output with the files named here (the result file lists the receipts). Disk: 13 GB free at the start, 12 GB after (the inputs add 4.2 MB, the JSON 2.1 MB).

### 10.10 Calls made under delegation (vetoable, J122)

1. **The adapter's graph fix (10.1).** Collapsing a duplicate edge and merging vertices within 1 mm change no drawn
   geometry; the alternative, leaving the twisted walk, would have lost three blocks on three maps. The census records each.
2. **KS on binned CDFs as the primary `spreadKS`.** V12 §3.4.2 says the KS distance runs on the binned CDFs at the
   catalogue edges; the raw-ECDF value sits beside it for W-15.
3. **`plot.cvDistrict` with the population standard deviation** (the earlier script's CV) and the hood as the district (R-23).
4. **The plan-seed inputs in a subfolder** and `E11-ng-rows.plan.json` beside `E11-ng-rows.json`, so wave 1's fixture
   files and record stay as they landed.
5. **Hood rings closed and rounded half to even**, the GeoJSON convention of the inputs; §7b states neither.

### 10.11 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** every number in 10.1–10.7; the fixture reproduction; the registration counts and ±1 px
neighbours; the samples; the graph defect, its cause (Euler's face count against the walk's) and its fix; determinism; the
red tests. **PLAUSIBLE (reasoning):** that the raw degree-4 node is a snapping artefact rather than a drawn crossroads (the
geometry fits; the drawing order was not traced); that `street/small/1`'s faceless hood is NG's own layout rather than a
registration or snap effect (its roads were not inspected by eye); that the street template's weak block row comes from its
few blocks per hood, so more seeds would not strengthen it.
