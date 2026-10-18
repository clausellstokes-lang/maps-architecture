# Digest entry 7 — the derived street graph: the twin derivation the MFCG rows were measured with

Implementer digest, entry (7) of nine. Written research-side at M-1 (2026-10-04) for the AFTER-M-1 run item
M0-c-07a (the MFCG street-signature rows that gate at M0: T / Y share, intramural dead ends, blocks per hectare); our
own words, numbers and `baselines.json` row ids only. Provenance label: `research:M-1/E09` (section 2), the
sensitivity of `research:M-1/E14` (sections 5 to 7), the figure-ground rows of `research:M-1/E08`, rows by
`research:M-1/E15`.

## 1 Why the derivation is stated

MFCG exports footprints and main roads but no blocks and no lanes, so every block- or lane-reading metric on MFCG reads
two derived features — cluster blocks and the derived street graph — and the same metric on our side reads the same
derivation from our footprints, never our true blocks or ways, so the comparison is like with like. The design defines
the derivation as the street space's straight skeleton (the street space being the enclosure less its cluster
blocks), with spurs under 8 m pruned and nodes within 2 m merged.
M-1's twin implements it as a **raster medial axis on a half-metre grid**, declared, under `metricVersion` 1.0.0; at M1 the
product's own derivation is checked against the twin (0.5 % or one printed unit), and where it differs the product's
value supersedes with a recorded shift. The rows' dead-end count is set by the pruning parameters at first order
(section 4), so the parameters below are part of the definition.

## 2 The derivation, step by step

1. **Clusters.** Footprints whose rings lie within 1.0 m of each other join one cluster (a union-find run in one fixed order; this
   same partition feeds the variety vector's block-area component).
2. **The block.** A cluster's footprints are filled on a half-metre raster in the map's grid alignment, then closed with a
   3 m square kernel (six 3 × 3 dilations, then six erosions). The block is that closed set **with its holes filled**: the
   region its outline bounds. Its interior courts are block, not street space.
3. **Intramural.** A block is inside the walls when the area-weighted centroid of its footprints lies inside the
   outermost enclosure (the city ring).
4. **The domain and the street space.** The domain is the enclosure; on a water setting the sea polygons and the river
   corridors (centreline at the export's width) are taken out of it. The street space is the domain less every block.
5. **The skeleton.** The street space is thinned to idempotence by eight-direction sequential thinning (one structuring
   element per direction, north to north-west): a homotopic skeleton centred in the street space — the raster medial
   axis. It keeps a branch into every convex corner of the street space, which the spur rule prunes.
6. **The graph.** Cells are joined by mixed adjacency (4-neighbours, and diagonal neighbours whose two common
   4-neighbours are both off the skeleton). A cell whose degree is not 2, or a cell belonging to a full 2 × 2 quad, is a node
   cell; touching node cells form one node at their mean position; every chain of the other cells is one edge. A node
   whose cells ring a hole of a few cells keeps that hole as a self-loop of zero length, so the graph keeps the skeleton's
   topology.
7. **Spurs.** An edge with a degree-1 end shorter than **8 m, measured on its line simplified at 0.5 m**, is removed and
   the degree-2 nodes left are dissolved; this repeats to a fixed point.
8. **Merge.** Nodes within **2 m** (single linkage) become one node at their mean position; an edge with both ends in
   one merged node and no longer than 4 m is internal and removed (the junction rule of entry 5), a longer one stays as a
   self-loop; the faces such edges bounded collapse (71 of 24 230 over 40 maps, every such edge ≤ 3.82 m). The spur
   rule then runs **once more**, because the merge moves an end by up to 2 m. Each edge's polyline is finally
   simplified once at 0.5 m.
9. **The derived graph** is the skeleton of every street-space part that reaches the domain's edge (the curtain, or
   the water on a water setting, where a river crossing the walled area makes two banks and two parts). A part
   enclosed by blocks alone is a pocket, counted and not measured (none occurred).

**The metrics on it.** `sgd.tShare`: degree-3 nodes with two arms within 20° of straight ÷ degree-3 nodes, an arm's
direction 10 m along its edge (the far end if shorter). `sgd.deadEnds`: degree-1 nodes per km of the graph's length.
`blockc.perHa`: intramural blocks per hectare of the enclosure. `blockc.lotsPer`: footprints per intramural block, per
seed the median. `block.courtShare`: entry 4's definition on the intramural blocks. The figure-ground rows read the
same objects: `fg.recoverability` samples the derived graph's edges inside the enclosure every 2 px, excluding samples
under a wall or tower body, and `fg.streetwall` traces the intramural cluster blocks' outlines on the same raster
(a segment is walled when its midpoint lies within half a metre of a footprint edge).

## 3 The numbers (ten plain seeds per size; p50 [p10, p90]; every seed-to-seed CV ≤ 0.2547, so all are target rows)

| row id | TOWN (size 40) | CITY (size 80) | METROPOLIS (size 130) |
|---|---|---|---|
| `mfcg/<size>/plain/sgd.tShare/all` | 0.4415 [0.4046, 0.4935]; band 0.3641–0.5429 | 0.4542 [0.4216, 0.4829]; band 0.3794–0.5312 | 0.4573 [0.4492, 0.4713]; band 0.3887–0.5259 |
| `mfcg/<size>/plain/sgd.deadEnds/all` (per km) | 2.3163 [1.6581, 2.7324]; band 1.4923–3.0056 | 1.4254 [1.1113, 1.7767]; band 1.0002–1.9544 | 0.957 [0.7963, 1.1068]; band 0.7167–1.2175 |
| `mfcg/<size>/plain/blockc.perHa/all` | 2.5599 [2.1988, 2.7453]; band 1.9789–3.0198 | 2.3064 [2.0283, 3.1639]; band 1.8255–3.4803 | 2.5313 [2.4083, 2.8113]; band 2.1516–3.0924 |
| `mfcg/<size>/plain/blockc.lotsPer/all` | 9 [8, 9.1]; band 7.2–10.35 | 9 [7, 10]; band 6.3–11 | 9 [8.9, 10]; band 7.65–11 |
| `mfcg/<size>/plain/fg.recoverability/all` | 0.8702 [0.847, 0.8776]; band ≥ 0.8402 | 0.7495 [0.7069, 0.7613]; band ≥ 0.7195 | 0.5236 [0.499, 0.5739]; band ≥ 0.4936 |
| `mfcg/<size>/plain/fg.streetwall/all` | 0.9233 [0.9191, 0.9297]; band ≥ 0.9233 | 0.9284 [0.9238, 0.9311]; band ≥ 0.9284 | 0.9243 [0.9214, 0.9274]; band ≥ 0.9243 |

The graph behind them: 20.0 / 69.2 / 181.2 km of length and 141 / 486 / 1 350 faces per city at the three sizes; the
intramural blocks' area is at most 0.7741 of the walled area; blocks never overlap. The lots-per-block row is read at M1
(plots exist then); the granularity table's anchor "about 18.6 plots per block" counts a different quantity (partition
leaves per region, a profiler count) and the measured footprints per cluster block are about 9 at every size.

## 4 The sensitivity (a proxy for the bias, not the bias: no product skeleton exists research-side; M1 decides)

On the five fixture cities, against the declared twin (step 0.5 m, spur 8 m, merge 2 m):

| variant | `sgd.tShare` | `sgd.deadEnds` | `blockc.perHa`, `blockc.lotsPer` |
|---|---|---|---|
| step 0.25 m | largest change 15.3 % (median 5.4 %); within tolerance on 0 of 5 | largest 39.4 % (median 23.4 %); 0 of 5 | invariant |
| spur 6 m | largest 17.3 % (median 11.7 %); 0 of 5 | largest 232.9 % (median 154.2 %); 0 of 5 | invariant |
| spur 10 m | largest 0.8 % (median 0.4 %); 3 of 5 | largest 32.9 % (median 27.3 %); 0 of 5 | invariant |

The dead-end row counts the thinning's branches longer than the spur threshold, and most branches are 6 to 10 m
long (the first fixture has 112 degree-1 nodes at 6 m, 39 at 8 m, 26 at 10 m), so the row depends on the spur law and
the step as much as on the map; a finer step lengthens branches measured on the simplified line, so the effective
spur threshold varies with the step too. The block rows come from the union-find and the centroid test, and the
raster never touches them. An implementation that states and follows the five parameters — the raster step, the spur
threshold measured on the simplified polyline, pruned until nothing changes and then once again after the merge, the single-
linkage merge with internal edges of at most 4 m removed, the thinning itself — is like with like; one that does not
will differ on `sgd.deadEnds` beyond the M1 tolerance (PLAUSIBLE), and then version 1.0.0 stands at M-1, the product's
own value superseding it with a recorded shift at M1.

## 5 Status

CONFIRMED by execution research-side: every number above; planarity on 40 of 40 maps; the face-count identity at every
stage (the skeleton's, the raw graph's and the street space's Euler numbers equal); the self-test of the speed-ups
against their plain forms; determinism across processes; the red runs. PLAUSIBLE: that the thinning's skeleton lies
within tolerance of the straight skeleton (M1 decides); that the 71 collapsed faces are raster artefacts at junctions
rather than real blocks.
