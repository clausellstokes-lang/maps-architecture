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
