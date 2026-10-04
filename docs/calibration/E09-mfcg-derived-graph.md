# E09 — MFCG cluster blocks, the derived street graph, the court share and the variety vectors (W-09)

Lane `m1/W-09`, 2026-10-04 00:02 – 03:07 EDT (cut by the 02:15 pause and continued from its files at 02:23), on the
owner's Mac. This is a research-side record (`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it). It carries
numbers, metric ids and our own words only: no place name, colour value, identifier, word list or code. The numbers
are in four files beside it, all written by the tool below:

| file | what it holds | reader |
|---|---|---|
| `E09-mfcg-derived-graph.json` (sha256 `512e682c…`) | the sample, the five fixtures, the per-family summaries with their CVs, the pooled court counts, the checks | W-13, W-14, W-15 |
| `E09-mfcg-derived-graph.seeds.json` (sha256 `9f23b5fb…`, 6.4 MB) | every measured map's full record, with one row per intramural block (area, minimum-area rectangle sides, inscribed radius, deep, court) | W-12, W-13, W-14, W-08 |
| `E09-mfcg-derived-graph.vectors.json` (sha256 `b97cd75f…`) | the R-10 signature vector of every usable plain seed per size, with the lane companion beside it | W-15 (the dispersion step, R-40) |
| `E09-mfcg-derived-graph.selftest.json` | the tool's self-test receipt (S0–S5) | — |

**These are measured values, not rows.** W-15 is the sole writer of `rows.py`. It forms the rows, the bands and both
variety dispersions (R-40, R-47 (a)).

**Outcome.** `research/baselines/derived_graph.py` (sha256 `6eccbc9b…`) is built and run on the five 2026-09-25
fixtures and on all 35 captured files of the M-1 sweep. **Every check of the W-09 row passes** (CONFIRMED,
executed; 7 of 7 PASS, exit 0):

* **Planarity.** 0 proper crossings on all 40 maps.
* **Face count.** The skeleton's and the raw graph's Euler numbers equal the street space's on all 40 maps. Spur
  pruning keeps every face. The node merge removes only faces closed by internal edges of at most 4 m: 71 of 24 230,
  every such edge 3.82 m or shorter.
* **Block area.** The intramural blocks' area sum stays at or below the walled area: largest ratio 0.7741, overlap 0 m².
* **CV handed to W-14.** The seed-to-seed CV of `sgd.*` and `blockc.*` is present for all four families over their
  usable seeds (16 of 16).
* **Vectors.** One R-10 vector per usable plain seed per size: 10 / 10 / 10.

Two further checks also pass: the cluster partition equals `measure_ftg.py`'s on all 40 maps, and the sample check
holds (section 4). The tool's self-test passes S0–S5. A re-measurement of six maps in a separate process is identical
field for field. The red run plants one fault per check, and all 7 checks go red.

The per-size values serve D11 (`sgd.tShare`, `sgd.deadEnds`, `blockc.perHa`, `blockc.lotsPer`), D5 and D32 (MFCG's
inner-plot removal, `block.courtShare`) and D16 (the vectors, with no dispersion, R-40). Two findings are routed onward
(section 9.2), and neither blocks this item:

* **F1 (minor, design text).** The granularity table's anchor "MFCG ≈ 18.6 plots per block" counts a different
  quantity. The measured value is about 9 footprints per cluster block.
* **F2 (for W-15's ruling).** R-10's density components read MFCG's exported roads only, while V12 §3.4.1 says that a
  lane-reading metric on MFCG reads the derived graph. Both vectors are written.

## 1 What was built and run

| file | what |
|---|---|
| `research/baselines/derived_graph.py` (new, our own code: the standard library and PIL) | the cluster blocks, the street space, the thinning, the graph, the spur pruning and node merge, the five metrics, the court test, the vectors, the checks, `--red`, `--from-seeds`, `--selftest`, and the W-14 sensitivity switches (`--step`, `--spur`, `--merge`, `--fixtures`, `--only`). It imports `measure_ftg.py` (the R-10 vector and the cluster union-find), `measure_ng.py` (the minimum-area rectangle) and `measure_mfcg.py` (the plan sample, V12 §3.5.1's estimators), all unchanged |

The tool reads only the `MeasureInput` files that `adapters/mfcg.py` wrote
(`research/baselines/inputs/MFCG/itch-12710731/*.metric.geojson.gz`), plus `plan.json` and the sweep's
`export-check.json` (through `measure_mfcg.plan_families`). It never opens a captured program bundle, touches no site
and writes nothing under `plat/`.

Runs, all on 2026-10-04:

| run | command (project root) | result |
|---|---|---|
| final | `python3 research/baselines/derived_graph.py` | 40 maps (5 fixtures + 35 sweep files), 7 of 7 PASS, exit 0 (run at nice 10; no timing is taken or claimed) |
| self-test | `… --selftest --json docs/calibration/E09-mfcg-derived-graph.selftest.json` | S0–S5 ALL PASS, exit 0 |
| red | `… --red` (reads the stored per-seed file; writes nothing) | 7 of 7 FAIL, exit 1 |
| reproduction | `… --from-seeds docs/calibration/E09-mfcg-derived-graph.seeds.json --json <scratch>` | reproduces the JSON exactly: every key equal (summaries, pooled courts, checks, head), 7 of 7 PASS, exit 0 |
| determinism | `… --only <6 maps> --json/--seeds/--vectors <scratch>` (a separate process) | 6 of 6 per-seed records identical to the final run in every field, block rows included; 3 of 3 vectors identical |

The self-test (S0–S5) checks the tool's speed-ups and shared functions against their plain forms:

* **S1.** The lookup-table closing equals PIL's 13-cell maximum then minimum filter, cell for cell, on all 305 cluster
  rasters of two fixtures.
* **S2.** The run-length hole fill equals PIL's flood fill on the same 305 rasters.
* **S3.** The tiled thinning equals whole-raster thinning, cell for cell and in pass count (72 / 72 and 107 / 107).
* **S4 and S5.** `cluster_blocks_lut` and the R-10 vector computed with it equal `measure_ftg.py`'s unmodified
  functions on eight maps. S5 compares the whole returned record.
* **S0.** Gray's bit-quad Euler number is right on four synthetic shapes, before and after thinning.

A first full run (00:50–01:47, not landed) failed the face count on 5 maps. The causes were found and fixed before the
final run (section 9.1, D6, D8 and D9), and its numbers are superseded.

## 2 The derivation as built — the declared twin of V12 §3.4.1 (version 1.0.0, R-22)

V12 §3.4.1 defines the two derived features. R-22 declares the M-1 twin: a raster medial axis at 0.5 m with 8 m spur
pruning and 2 m node merge. Where V12 or R-22 leave a step open, the tool decides it as below. Each such decision is a
call under J122, vetoable, and is listed again in section 9.

1. **Clusters.** Footprints whose rings lie within 1.0 m of each other join one cluster. The union-find is
   `measure_ftg.py`'s own (the same ring distance, grid and order), so the blocks here and the vector's block-area CV
   read one partition (check `clusterTwin`).
2. **The block.** A cluster's footprints are filled on a 0.5 m raster aligned to the map's grid and closed by a 3 m
   square kernel (six 3 × 3 dilations, then six erosions; cell for cell the same as PIL's 13-cell maximum then minimum
   filter, self-test S1). The block is that closed set **with its holes filled**: the region its outline bounds. The
   interior it encloses, holes included, is where `block.courtShare` looks for courts; it is not street space.
3. **Intramural.** A block is inside the walls when the area-weighted centroid of its footprints lies inside the
   outermost enclosure (the city ring).
4. **The domain and the street space.** The domain is the enclosure. On a water setting the sea polygons and the river
   corridors (the centreline at the export's width) are taken out of it as well, so no street runs on water (the stress
   family only; descriptive). The street space is the domain less every block.
5. **The skeleton.** The street space is thinned to idempotence by eight-direction sequential thinning (the Golay L
   elements, one lookup table per direction, north to north-west). The result is a homotopic skeleton centred in the
   street space: the raster medial axis of R-22. It keeps a branch into every convex corner of the street space, which
   the spur rule prunes. The tool thins the whole raster for twelve passes and then only the tiles still changing; this
   gives the same cells and the same pass count as whole-raster thinning (self-test S3).
6. **The graph.** Cells are joined by mixed adjacency: 4-neighbours, and diagonal neighbours whose two common
   4-neighbours are both off the skeleton. A cell whose degree is not 2, or a cell of a full 2 × 2 quad, is a node cell.
   Node cells that touch form one node at their mean position, and every chain of the other cells is one edge. A node
   whose cells ring a street-space hole of a few cells keeps that hole as a self-loop of zero length, so the graph keeps
   the skeleton's topology.
7. **Spurs.** An edge with a degree-1 end shorter than 8 m (measured on its simplified line) is removed, and the
   degree-2 nodes left are dissolved. This repeats until no such edge is left.
8. **Merge.** Nodes within 2 m (single linkage) become one node at their mean position. An edge with both ends in one
   merged node and no longer than 4 m is internal and removed (E11's junction rule); a longer one stays as a self-loop.
   The faces such edges bounded collapse, and the tool counts them. The spur rule then runs once more, because the
   merge moves an end by up to 2 m. Each edge's polyline (node, cell centres, node) is finally simplified once by
   Douglas-Peucker at 0.5 m.
9. **The derived graph** is the skeleton of the street space's parts that reach the domain's edge: the curtain, or the
   water on a water setting, where a river crossing the walled area makes two banks and so two parts. A part enclosed
   by blocks alone is a pocket of a few cells. Pockets are counted and reported (number and area), not measured.

**Metrics** (V12 §3.4.2's definitions, read on the graph and the blocks above):
* `sgd.tShare`: degree-3 nodes with two arms within 20° of straight ÷ degree-3 nodes. An arm's direction runs from the
  node to the point 10 m along its edge (the far end if the edge is shorter), as `junction.angles` reads arms.
* `sgd.deadEnds`: degree-1 nodes per km of the graph's length.
* `blockc.perHa`: intramural blocks per hectare of the enclosure.
* `blockc.lotsPer`: footprints per intramural block; per seed the type-7 median.
* `block.courtShare`: E11 §2's definition on the intramural blocks. A block is deep when its largest inscribed circle's
  radius exceeds 1.5 × the seed's median footprint short side (the minimum-area rectangle's, over every footprint of the
  seed). A deep block holds a court when the block less every footprint dilated by 5 % of that side leaves a component
  of at least 0.5 × the median footprint area that touches no block edge. The court raster is the block raster
  subdivided until a cell is at most half the dilation distance, with components 4-adjacent and edge contact
  8-adjacent. The radius is the Euclidean distance from a cell centre to the nearest background cell centre, less half
  a cell. The chessboard and city-block erosion depths decide it where they bracket it; otherwise the exact distance
  transform decides it. Each intramural block also carries its minimum-area rectangle's sides in metres, which are
  W-12's block extents. This is MFCG's inner-plot removal (R-19).
* **The R-10 vector**: `measure_ftg.m_signature` on MFCG's `MeasureInput`, unchanged, with its cluster blocks computed
  by `cluster_blocks_lut` (`measure_ftg`'s function with the lookup-table closing; the whole returned record equals the
  unmodified function's on eight maps, self-test S4 and S5). MFCG's ways are its exported roads, all of class arterial.
  Beside it, the tool writes a **companion** for W-15's ruling (not the R-10 vector): components 2–5 read over the
  street space's lanes, which are the derived graph's edges inside the enclosure and the exported roads outside it.

## 3 The sample

| family (rung) | indices | usable | failed (carried) |
|---|---|---|---|
| `capture/MFCG/40/plain` (TOWN) | [0, 10) | 10 | none |
| `capture/MFCG/80/plain` (CITY) | [0, 10) | 10 | none |
| `capture/MFCG/130/plain` (METROPOLIS) | [0, 11), R-13's extension | 10 | index 8, `no-export` (2 loads, no files) |
| `capture/MFCG/80/river+coast` (CITY, stress, descriptive) | [0, 5) | 3 (0, 2, 3) | indices 1 and 4, `retry` (2 and 3 attempts): measured and kept in the per-seed file, excluded from every summary |

The five 2026-09-25 fixtures check the tool and enter no summary (PC-04: rows come from plan seeds). Each per-family
summary is V12 §3.5.1's: `type7` (median with p10 and p90) at n = 10, and `minmax` at n = 3.

## 4 The checker column (W-09 row)

| check | result |
|---|---|
| planarity: no two edges of the derived graph cross | 40 of 40 maps with 0 proper crossings: **PASS** |
| face count | **PASS** on 40 of 40 maps. On every map the street space's Euler number (Gray's bit quads), the skeleton's and the raw graph's are equal, so the raw graph's faces E − V + C equal the street space's holes (24 230 in all). Spur pruning keeps every face. The merge removes 1 078 internal edges in 992 merged groups; they close 71 faces on 34 maps (their cycle rank), every such edge ≤ 3.82 m (the rule's limit is 4 m), and the final count is the pruned count less exactly those (24 159). 0 chain anomalies. Two zero-length hole loops are kept on `size130-plain-10`, where a node's cells ring a street-space hole |
| the blocks' area sum ≤ the walled area | 40 of 40 maps: **PASS**; largest intramural sum ÷ enclosure 0.7741; overlap between intramural blocks 0.00 m² on every map |
| the seed-to-seed CV handed to W-14 | 16 of 16 (four metrics × four families) over the usable seeds: **PASS**; values in section 6.2, in the JSON's summaries (sample and population SD), and reproducible from the per-seed file |
| one vector per usable seed per size | 10 / 10 / 10 vectors at TOWN / CITY / METROPOLIS, exactly the usable plain seeds, none for a failed seed: **PASS** |
| the cluster twin (lane check) | the clusters equal `measure_ftg.py`'s own (count, singletons, largest cluster) on 40 of 40 maps: **PASS** |
| the sample (lane check) | 44 summaries (11 metric keys × 4 families); each one's seeds plus its not-applicable list equal the usable list; no failed seed in any; the failed indices listed: **PASS** |
| red run | seven plants, one per check: a crossing in one fixture, a face too many in another, one block-area sum past its enclosure, one family's CV dropped, a vector dropped, one map's twin unequal, and a failed seed in a summary. Result: 7 FAIL, exit 1: **PASS** |

## 5 The fixtures (tool checks; in no summary)

| fixture | intramural blocks | `blockc.perHa` | `blockc.lotsPer` | `sgd.tShare` | `sgd.deadEnds` | graph km | faces | `block.courtShare` (court / deep) | area ratio | street-space parts / pockets |
|---|---|---|---|---|---|---|---|---|---|---|
| s555001-size40-gates0 | 99 | 1.70 | 8.0 | 0.392 | 2.24 | 17.41 | 99 | 0.707 (29 / 41) | 0.7572 | 1 / 0 |
| s555001-size40-gates1 | 156 | 2.68 | 9.0 | 0.384 | 2.46 | 21.96 | 156 | 0.819 (59 / 72) | 0.7013 | 1 / 0 |
| s555001-size40-gates4 | 137 | 2.35 | 9.0 | 0.421 | 2.29 | 20.05 | 137 | 0.719 (46 / 64) | 0.7263 | 1 / 0 |
| s555001-size40-gates9 | 97 | 1.68 | 11.0 | 0.453 | 3.09 | 17.47 | 97 | 0.850 (51 / 60) | 0.7360 | 1 / 0 |
| s777001-size80-river-coast | 515 | 2.08 | 9.0 | 0.429 | 1.28 | 76.43 | 514 | 0.734 (190 / 259) | 0.6844 | 2 / 0 |

The river-and-coast fixture's street space has two parts, one per river bank, and the graph has one part on each bank.
No map has a pocket (a street-space part enclosed by blocks alone).

## 6 D11 — the derived-graph and cluster-block values per size

### 6.1 The summaries (median [p10, p90] by `type7` at n = 10; [min, max] by `minmax` at n = 3)

| metric | TOWN (40; n = 10, type7) | CITY (80; n = 10, type7) | METROPOLIS (130; n = 10, type7) | CITY (80, river and coast; n = 3, minmax) |
|---|---|---|---|---|
| `sgd.tShare` | 0.441 [0.405, 0.494] | 0.454 [0.422, 0.483] | 0.457 [0.449, 0.471] | 0.448 [0.447, 0.476] |
| `sgd.deadEnds` | 2.32 [1.66, 2.73] | 1.43 [1.11, 1.78] | 0.96 [0.80, 1.11] | 1.39 [0.90, 1.89] |
| `blockc.perHa` | 2.56 [2.20, 2.75] | 2.31 [2.03, 3.16] | 2.53 [2.41, 2.81] | 2.33 [2.19, 2.35] |
| `blockc.lotsPer` | 9.0 [8.0, 9.1] | 9.0 [7.0, 10.0] | 9.0 [8.9, 10.0] | 9.0 [9.0, 10.0] |
| `block.courtShare` | 0.810 [0.745, 0.856] | 0.810 [0.716, 0.845] | 0.814 [0.788, 0.851] | 0.824 [0.687, 0.830] |
| `graph.lengthKm` | 20.0 [19.1, 22.1] | 69.2 [65.8, 77.3] | 181.2 [170.9, 191.5] | 86.8 [68.9, 111.8] |
| `graph.faces` | 141 [129, 166] | 486 [437, 644] | 1350 [1285, 1534] | 600 [484, 815] |
| `blockc.perHa.blocks` | 141 [129, 166] | 486 [437, 644] | 1350 [1285, 1530] | 596 [484, 816] |
| `blockc.lotsPer.mean` | 8.63 [8.04, 9.40] | 8.94 [7.52, 9.86] | 9.50 [8.95, 9.90] | 9.34 [8.84, 10.01] |
| `block.courtShare.deep` | 63 [53, 72] | 228 [199, 264] | 700 [650, 765] | 336 [249, 420] |
| `block.courtShare.courtDeep` | 48 [44, 60] | 188 [150, 227] | 568 [539, 637] | 279 [171, 346] |

The first five rows are the metrics. The other six are context for W-13 and W-15: the graph's length, its faces, the
block count behind `perHa`, the mean footprints per block, and the deep blocks and courts behind the court share.
`blockc.lotsPer`'s per-seed value is a median of integer counts, so it moves in steps of 0.5 or 1. The per-seed file
also carries the mean, p90, maximum and singleton share. On a water setting the domain excludes the sea and the river
corridor, so where the river cuts the walled area in two the stress family's graph has one part per bank (2 parts on 3
of its 5 maps). On `size80-rivercoast-2`, a
third street-space part thins to one cell and carries no edge.

### 6.2 The seed-to-seed CV handed to W-14 (sample SD ÷ mean; the population SD is beside it in the JSON)

| metric | TOWN (40; n = 10) | CITY (80; n = 10) | METROPOLIS (130; n = 10) | CITY (80, stress; n = 3) |
|---|---|---|---|---|
| `sgd.tShare` | 0.080 (mean 0.447) | 0.056 (mean 0.450) | 0.023 (mean 0.459) | 0.036 (mean 0.457) |
| `sgd.deadEnds` | 0.255 (mean 2.330) | 0.176 (mean 1.443) | 0.150 (mean 0.958) | 0.352 (mean 1.395) |
| `blockc.perHa` | 0.106 (mean 2.509) | 0.182 (mean 2.450) | 0.069 (mean 2.575) | 0.039 (mean 2.291) |
| `blockc.lotsPer` | 0.078 (mean 8.700) | 0.125 (mean 8.600) | 0.062 (mean 9.100) | 0.062 (mean 9.333) |
| `block.courtShare` | 0.056 (mean 0.801) | 0.068 (mean 0.796) | 0.031 (mean 0.820) | 0.104 (mean 0.780) |

No plain family's CV exceeds S-V12-2's 0.3; the largest is `sgd.deadEnds` at TOWN, 0.255. The stress family's
`sgd.deadEnds` reaches 0.352 at n = 3, but that family is descriptive by the plan whatever its CV. The ⟨M-1⟩ decision is
W-14's, with the step and spur sensitivity. R-47 (g) says that sensitivity is a *proxy* for the raster-against-skeleton
bias, which T-V12-3 decides at M1.

## 7 D5 and D32 — MFCG's inner-plot removal (`block.courtShare` on the cluster blocks)

| family | deep blocks | with a court | pooled count ratio | median of the per-seed shares (n) |
|---|---|---|---|---|
| capture/MFCG/40/plain | 619 | 496 | 0.8013 | 0.8101 (10) |
| capture/MFCG/80/plain | 2320 | 1852 | 0.7983 | 0.8098 (10) |
| capture/MFCG/130/plain | 7076 | 5809 | 0.8209 | 0.8143 (10) |
| capture/MFCG/80/river+coast | 1005 | 796 | 0.7920 | 0.8238 (3) |
| plain (all three sizes) | 10015 | 8157 | 0.8145 | 0.8135 (30) |

The thresholds are relative to each seed's median footprint. The deep radius is 1.5 × the median short side, 18.0–26.7 m
over the 40 maps. The dilation is 5 % of that side, 0.60–0.89 m. The court raster's cell is 0.25 m (subdivision 2)
on every map, within half the dilation everywhere. The exact distance transform decided 5 956 of 24 151 intramural
blocks; the chessboard and city-block brackets decided the rest. A shallow block can also hold an interior component
of court size (2 040 such blocks over the 40 maps), but by the definition only deep blocks count.

MFCG keeps an unbuilt interior in about four of five deep cluster blocks: 0.81 at every size, and 0.8145 pooled over
10 015 deep blocks of the 30 plain seeds. NG's figure on the fixtures is 0.43 (R-19, E11). R-19 has W-12 calibrate the
`MFCG` preset's court cell from this value, and report it beside NG's `modest` fit. Each intramural block's
minimum-area rectangle sides (metres) are in the per-seed file's block rows, for W-12's depth rows per size.

## 8 D16 — the MFCG signature vectors (vectors only; no dispersion, R-40)

R-10's eight components are, in order: radial share, orthogonality, way density in the inner, middle and outer annulus
(km per km²), cluster-block area CV, enclosed share, and `outline.r90cv`. The medians per size over the ten usable plain
seeds are:

| family | n | radial | orthogonality | density inner | middle | outer | block-area CV | enclosed | outline |
|---|---|---|---|---|---|---|---|---|---|
| capture/MFCG/40/plain | 10 | 0.8465 | 0.222 | 8.392 | 4.077 | 2.443 | 0.5946 | 0.9046 | 0.1591 |
| capture/MFCG/40/plain companion | 10 | 0.8465 | 0.1041 | 33.48 | 33.08 | 28.25 | 0.5946 | 0.9046 | 0.1591 |
| capture/MFCG/80/plain | 10 | 0.8576 | 0.1772 | 7.056 | 3.269 | 2.121 | 0.5282 | 0.9045 | 0.09415 |
| capture/MFCG/80/plain companion | 10 | 0.8576 | 0.1024 | 32.48 | 31.17 | 28.52 | 0.5282 | 0.9045 | 0.09415 |
| capture/MFCG/130/plain | 10 | 0.8266 | 0.0912 | 5.482 | 2.755 | 2.027 | 0.4912 | 0.9235 | 0.05645 |
| capture/MFCG/130/plain companion | 10 | 0.8266 | 0.09125 | 33.83 | 33.07 | 30.46 | 0.4912 | 0.9235 | 0.05645 |

The "companion" rows are the lane companion (section 2): components 2–5 read over the derived graph inside the
enclosure and the exported roads outside it, and components 1 and 6–8 as R-10. Every seed's vector, its
`measureInputSha256`, its R (the built radius) and its companion are in the vectors file. W-15 forms the dispersions
at TOWN, CITY and METROPOLIS with the pooled deviations over MFCG ∪ FTG (R-40). Note that B-2's earlier allowance to
compute METROPOLIS from MFCG alone at W-09 is withdrawn by R-40, because the premium programme gives METROPOLIS an
FTG sample of 4 slots (R-33).

## 9 Decisions and findings

### 9.1 Decisions taken under the delegation (J122; each vetoable, none changes a design cell or a ruling)

* **D1.** The clusters are `measure_ftg.py`'s union-find, run in the same order. The blocks here and the vector's
  block-area CV therefore read one partition, which the twin check verifies.
* **D2.** A block is its closed footprint set *with its holes filled*. Its interior courts are block, not street space.
  Otherwise every court would be a pocket of street space inside its own block.
* **D3.** A block is intramural when the area-weighted centroid of its footprints lies inside the enclosure (V12 §2.2's
  enclosure; the city ring).
* **D4.** On a water setting the sea polygons and the river corridors (centreline at the export's width) leave the
  domain. Streets do not run on water. This applies to the stress family only, which is descriptive.
* **D5.** R-22's "raster medial axis" is built as eight-direction sequential thinning with the Golay L elements. That
  is a homotopic skeleton centred in the street space, not a distance-ridge axis. Its bias against the straight
  skeleton is T-V12-3's question at M1, and W-14's step and spur runs are the proxy.
* **D6.** The graph is read on mixed adjacency, so that no path bypasses a junction cell and no three cells form a face.
  A full 2 × 2 quad is a node. Touching node cells form one node. A node whose cells ring a street-space hole keeps that
  hole as a zero-length self-loop. This was added after the first run, where `size130-plain-10` lost two faces at
  extraction.
* **D7.** Spur length is measured on the Douglas-Peucker-simplified line (0.5 m). The pruning repeats to a fixed point,
  then runs once more after the merge, because the merge moves an end by up to 2 m.
* **D8.** The merge is single linkage at 2 m. An edge with both ends in one merged node and at most 4 m long is internal
  and removed (E11's junction rule), and the faces it bounded are counted as collapsed. The first run did not count
  the collapse, and 5 maps failed the face count by 1–2 faces each.
* **D9.** The derived graph is the skeleton of every street-space part that reaches the domain's edge, so both river
  banks count. A part enclosed by blocks alone would be a pocket, reported but not measured; none occurred. The first
  run kept only the longest component, which dropped one bank on the water maps.
* **D10.** In `sgd.tShare`, an arm's direction is taken 10 m along its edge, as `junction.angles` reads arms.
* **D11.** `block.courtShare` follows E11 §2. Its relative thresholds use the median over *every* footprint of the seed,
  as `bldg.*` reads footprints, not the intramural ones only.
* **D12.** The vector is R-10, computed by `measure_ftg.m_signature` unchanged. The lane companion is written beside it,
  not instead of it (F2).
* **D13.** The CV is the sample SD (n − 1) ÷ the mean. The population form is beside it in the JSON for W-14.
* **D14.** Retries are measured and kept in the per-seed file, but excluded from every summary, as in W-07b.

### 9.2 Findings (routed; none blocks this item)

* **F1 (minor; design text; for the next design seat's intake).** ARCHITECTURE's granularity table names "MFCG ≈ 18.6
  plots per block" as the `prosperous` band's anchor. That figure is a profiler count: the generator's partition leaves
  per partitioned region (`research/findings/profile-mfcg.md`, about line 299). It is not a per-block count of the
  output. The output's footprints per cluster block (`blockc.lotsPer`) have per-seed medians of 9.0 [8.0, 9.1] / 9.0
  [7.0, 10.0] / 9.0 [8.9, 10.0] at TOWN / CITY / METROPOLIS, and the per-seed means have medians 8.6 / 8.9 / 9.5.
  Recommendation: the cell should name its quantity ("leaves per partitioned region, profiler"), or cite
  `blockc.lotsPer`'s measured value at W-15's shift record. This research-side seat writes no design file, so the fix
  belongs to the design seat (CONFIRMED: both numbers read or measured).
* **F2 (for W-15's dispersion step; a ruling is owed between two decided texts).** MFCG exports no lanes, and R-10's
  components 2–5 read "way chords". On MFCG's `MeasureInput` the ways are the exported roads (class arterial), so its
  density profile is 8.4 / 4.1 / 2.4 km per km² at TOWN, against 33.5 / 33.1 / 28.3 over the derived lanes (the
  companion). FTG's all-way densities on E05 §6's two CITY fixtures are 36.8 / 27.2 / 9.4 and 27.6 / 24.8 / 10.7.
  V12 §3.4.1 says "a metric that reads blocks or lanes on MFCG reads these" (the derived features). Under that sentence,
  the companion is the conformant MFCG vector for components 2–5. Pooling deviations over MFCG ∪ FTG with the R-10 form
  would put a between-reference offset into the pooled deviation and shrink both dispersions in z. Both vectors are
  written. W-15 (or the rulings round, if it judges R-10's text to need amending) picks one. The seat's lean is the
  companion, as V12 §3.4.1 directs (PLAUSIBLE: reasoning on the definitions; the offset is measured).
* **F3 (information for W-12).** MFCG's court share among deep cluster blocks is about 0.81 (section 7), far above NG's
  0.43. R-19's ratio rule applies to NG's `modest` fit only; the MFCG value is the `MFCG` preset's court cell, so
  nothing here moves another band.

## 10 Hand-offs

| reader | reads | from |
|---|---|---|
| W-12 | each intramural block's `areaM2`, `mrrLongM`, `mrrShortM`, `deep`, `court` per seed (the block extents per size) and the pooled court counts | the seeds file (`perSeed.<stem>.block.courtShare.rows`); the JSON's `courtPooled` |
| W-13 | the per-seed metric values of every usable seed per family | the seeds file; the summaries in the JSON (`--from-seeds` reproduces them) |
| W-14 | the CVs (section 6.2), and the sensitivity runs: `--fixtures --step 0.25`, `--fixtures --spur 6` and `--spur 10` print one JSON line per map with `sgd.*`, `blockc.*`, the graph and the face counts | the JSON's summaries; the tool |
| W-15 | the measured values (section 6.1, 7) and the 30 vectors (R-10 and the companion; F2) | the JSON; the vectors file |
| W-08 | the cluster blocks per seed (for `fg.streetwall` on cluster blocks) | the seeds file's block rows (footprint count, area, centroid, extents); for geometry, the tool's `Map` class (its partition and block rasters) on the same `MeasureInput` |
| W-17 / M0-c-07a | the derivation of section 2, for R-20 (7)'s digest entry (like with like: our side derives the same way) | this record, section 2 (W-17 restates it in our own words for the digest) |

## 11 CONFIRMED versus PLAUSIBLE

* **CONFIRMED (executed).** Every number in sections 4–8: the final run, self-test, red run, reproduction and
  determinism re-run listed in section 1 produced them, and a scratch script printed the tables from the written JSON
  files. Also confirmed: the sample in section 3 (from `plan.json` and `export-check.json` through
  `measure_mfcg.plan_families`), `plan.py --check` SAME after the run (plan.json da68f069, metrics.m-1.json 8a0efa7e)
  and again at landing (plan.json 6ad28659 after the FTG recording seat's slot binds; the MFCG sample read through it is
  unchanged, compared key for key), and the content scan of this record (`doc_checks.py --doc
  docs/calibration/E09-mfcg-derived-graph.md --heads docs/ARCHITECTURE.md`: C1 0, C2 0, C4 0, S1 0, S2 0; C3 28 hits
  with 26 unreviewed, all read: common phrases of our own text and digit runs of our own numbers, none a reference word
  list, palette, grammar or identifier).
* **CONFIRMED (read).** F1's two numbers; V12 §3.4.1's sentence quoted in F2; R-10, R-19, R-22, R-40 and R-47 as cited.
* **PLAUSIBLE (reasoning only).** That the thinning's skeleton lies within T-V12-3's tolerance of the straight skeleton
  (D5; M1 decides). F2's lean that the companion is the conformant vector, and that the R-10 form would shrink the
  dispersions. That the 71 collapsed faces (0.29 % of all faces, each bounded by edges ≤ 3.82 m) are artefacts of the
  raster at street junctions rather than real blocks; their size bound is measured, their reading is not.
