# Red-team measurement scripts (preserved from the session scratchpad, 2026-09-25)

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B21.

Scripts the Opus stand-in red-team lenses ran on 2026-09-25 (Node 24.12 / Python 3.9, Apple M1 — the machine the
reference captures were recorded on). They are OUR OWN code: synthetic, schema-shaped workloads that measure the
architecture's cost model; no reference code or bundle is used. Outputs (`*.out`) are the runs quoted in the reports.

| script | used by | measures |
|---|---|---|
| bench_state.mjs | redteam-scale SCL-1, SCL-5, SCL-6, SCL-12 | canonical-serialisation hash cost, snapshot memory, structured-clone cost across the worker boundary, stream-key derivation |
| bench_index.mjs | redteam-scale SCL-2 | packed Hilbert R-tree (flatbush-style) rebuild cost per commit |
| bench_terrain.mjs | redteam-scale SCL-3 | terrain / smoothing / field costs vs stage budgets |
| bench_poisson_astar.mjs | redteam-scale SCL-8 (and street search) | Poisson-disc k = 50 per-point cost; A* costs |
| bench_siting_doc.mjs | redteam-scale SCL-11 | siting cost; document-size components (gzipped rasters, entity JSON, stream keys) |
| mfcg_orient.py, mfcg_ribbon.py, mfcg_wallalign.py, mfcg_cover.py | redteam-mfcg MFP-1, MFP-2 | measurements on MFCG's exported GeoJSON (captures/mfcg/exports-2026-09-25): lot orientation, ribbon development, wall alignment (84–92 % within 15°), building ink cover (0.57–0.66) |
| ftg_anisotropy.py, ftg_arith.py | redteam-ftg | FTG outline anisotropy along main roads; plot-size spread and budget arithmetic |

Run from this folder, e.g. `node bench_state.mjs`, `python3 mfcg_wallalign.py` (paths inside may assume the scratchpad
location; adjust the input path to captures/mfcg/exports-2026-09-25/ if needed).

## fixall/draft-pipeline-r1 (2026-09-25, opus stand-in, pending Fable review)
- `fixall_pipeline_ou_heading.py` → `.out`: drift distribution of the mean-reverting curvature heading model (§4.4 S5c; FTG-17). Stdlib only; deterministic (seeded).
- `fixall_pipeline_mfcg_fits.py` → `.out`: gate-count law `round(1 + 0.47·√walled_ha)` and quarter-count law `1.37·B^0.267` fitted on `captures/mfcg/exports-sweep-2026-09-25/README.md` (MFP-4, MFP-10).

## fixall/verify-rendering-r1 (2026-09-25, opus stand-in, pending Fable review)
- `fixall_verify_rendering_contrast.py` → `.out`: CIEDE2000 and ΔL* of every §8.2 contrast-matrix pair on the `ink`, `lit` and `hatched` role tables (all pass), role chroma (ink `field` 18.3), and the label-ink versus halo-role pairs of §9.4 (building and tree fail in every family). Stdlib only; sRGB → CIELAB with D65.

## fixall/verify-scope-r1 (2026-09-25, opus stand-in, pending Fable review)
- `fixall_verify_scope_o9c.py` → `.out`: O9 (c) as written in ARCHITECTURE §7.3 item 7 (iv) / §15.2 (each of four statistics inside the empirical central-95 % band of K from-scratch generations; campaign fails below 0.95 at p < 0.01, binomial) applied to a *perfect* regenerator: per-regeneration pass rate 0.912 (1 statistic, K = 50) and 0.70–0.79 (4 statistics, K = 50 / 100); campaign failure probability up to ≈ 1.00. Stdlib only; seeded.
- `fixall_verify_scope_o9c_rank.py` → `.out`: the calibrated replacement proposed for IMP-7 — per-statistic rank of the regeneration among K from-scratch generations, χ² on a 10-bin rank histogram with width-weighted expected counts, Holm over four statistics at 0.01: false campaign failures 0.0105 (K = 50) / 0.0110 (K = 99) on 2 000 perfect-regenerator campaigns of n = 400; a "too snug" regenerator (0.6 × spread) fails 100 / 100. Stdlib only; seeded; run as `python3 fixall_verify_scope_o9c_rank.py 50`.

## fixall/draft-determinism-r2 (2026-09-25, opus stand-in, pending Fable review)
- `fixall_det_r2_match.mjs` → `.out`: succession-matching cost of §6.3's anchor rule as specified in r2 (grid buckets of the kind's hysteresis radius per kind and class family, candidate pairs sorted by (distance, old id, fresh id), greedy one-to-one) on synthetic anchor sets — a 450-building district regeneration, a 30 000-entity CITY re-derive from S1 (perturbed and unrelated fresh towns) and an 80 000-entity METROPOLIS upgrade mapping at 2 m radius. Apple M1, Node 24 (the §12.1 reference machine): ≈ 0.4–0.6 µs per old entity median (NF-D7's ≤ 2 µs budget). Deterministic (seeded); plain Node, no dependencies.

## fixall/draft-scope-r2 (2026-09-25, opus stand-in, pending Fable review)
- `fixall_scope_r2_o9c_power.py` → `.out`: the O9 (c) rank test as restated in round 2 (K = 50 from-scratch generations per regenerated scope, n = 400 scopes per campaign, 10-bin χ², Holm over four statistics at 0.01) — calibration on a continuous statistic (false campaign failures 0.011) and on a discrete one with heavy ties (attached share of a six-plot block): 0.009 when ties among the K + 1 values are broken by a uniform draw, **1.000 when they are not** (so the randomised tie-break is part of the test); power against too-snug 0.8 × spread 0.995, too-loose 1.5 × 1.000, biased +0.25 sd 0.995, FTG-like 0.6 × 1.000. Stdlib only; seeded; ≈ 2 min.

## fixall/draft-rendering-r2 (2026-09-25, opus stand-in, pending Fable review)
- `fixall_rendering_r2_palette.py` (+ helper `fixall_rendering_r2_colour.py`) → `.out`: the round-2 role retune (`ink` field `#ECDFBF`, `ink` wall = ink, `lit` ink `#34281E`, `hatched` ink `#2A231D`) against every ARCHITECTURE §8.2 contrast-matrix row incl. the new ink / paper, ink / building and ink / tree rows (all pass in all three families); the §9.4 halo rule (local role if text passes the label floor, else `ground`) for every role; the bounded random-style repair of §8.2 on 2 000 seeded draws per family. Stdlib only; sRGB → CIELAB with D65; seeded.
- `fixall_rendering_r2_budgets.py` → `.out`: the §12.5 first-map laws (model law + first-frame law) at each band's bottom, default and top, the one-second knees, worst-case tile positions and canvas needs for seven viewports (§8.8), the first-frame and settle compositions, and the §12.6 verification law for the reference mix. Pure arithmetic from the architecture's own per-unit costs.
- `fixall_rendering_r2_host.out`: the reference host's model, cores, memory, OS, Chrome and Node versions, read on the capture machine (§12.1, N-27 b).

## fixall/draft-kernel-r2 (2026-09-25, opus stand-in, pending Fable review)
- `fixall_kernel_r1_attract_check.py` → `.out`: round 1's attraction measurement (cut endpoints on Chaikin×2 spines), committed from the round-1 scratchpad so §3.6's evidence is checkable (VK-17); re-running it reproduces the output byte for byte. Stdlib only; seeded.
- `fixall_kernel_r2_attract.py` → `.out`: the revised §3.6 attraction (endpoint rule; 0 sub-`minEdge` edges on 400 000 band samples, largest displacement 36.72 cm), the round-1 measurement under the revised rule, crossings next to a vertex 25–26 cm from the crossed edge (plain rounding 1 361 short edges in 200 000, the placement rule 0), the VK-10 notched near-rectangle, and `area2` with the 2⁵² flush against exact integers. Stdlib only; seeded.
- `fixall_kernel_r2_hydro.mjs` → `.out`: bucket-queue priority flood, two-gradient flats, D8 and accumulation on the old frame-only hydrology rasters, the chosen frame-and-margin grids (16 / 25 / 32 m, same cell counts and cost) and the rejected frame-and-margin grids at the old cells (VK-9). Plain Node; seeded; median of five runs per case.
- `fixall_kernel_r3_bench.mjs` → `.out`: round 3 (VK2-1, VK2-9): the packed-index rebuild of S10 step (0)'s L3 parts before the pool's freeze (≈ 9 000 items in 26 partitions: 2.29 ms; METROPOLIS 5.83 ms); per-worker `Map` rebuild of the role and owner heads (≈ 10–20 ms at CITY) against typed open-addressing tables; the frozen copy's memory-copy cost (1.09 ms at 12 MB).
- `fixall_kernel_r3_checks.py` → `.out`: round 3 (VK2-6, VK2-8, VK2-4): re-seats beside a vertex 25.0–25.7 cm from the route (plain rounding 12.93 % failures, placement rule 0; the 25.35 cm fixture); width profiles split between two knots (old re-key up to 8.47 m, cut knots ≤ 6.8 × 10⁻¹³ cm, re-join bit-exact); canonical face keys on the full ring against the level-n route.

## fixall/draft-determinism-r4 (2026-09-26, opus stand-in, pending Fable review)
- `fixall_det_r4_loaddigest.mjs` → `.out`: VD3-1 — the cost of recomputing the whole model digest tree from leaves on a decoded snapshot at load (§2.9 step 3, §6.2 (iii)): MurmurHash3 x86-128 written from the published algorithm in 32-bit lanes (timing only), over a synthetic, schema-shaped CITY (30 000 entity leaves of 104 B, 150 000 vertices, every half-edge walked once per level along a shuffled `next` permutation for the five per-level plat digests) and METROPOLIS (80 000 leaves, 400 000 vertices); interior nodes grouped by parent and sorted by address id. Apple M1, Node 24 (§12.1's reference machine): ≈ 31–34 ms at CITY and ≈ 95–101 ms at METROPOLIS (medians of seven, two runs), against §6.2's ≤ 150 ms CITY bar. Deterministic (seeded); plain Node, no dependencies.
- `fixall_det_r5_recordsdigest.mjs` → `.out`: VD4-6 — the cost of recomputing the **records digest** (§6.2) at load beside the model tree (§2.9 step 3): one leaf per persisted derivation record (≈ 256 B: id, kind, context and parameter digests, three field samples, band, allocation row, epoch and ≈ 8 cited slices of 6 words) and naming record (≈ 164 B: id, kind, salt, epoch and ≈ 6 cited slices), grouped under one node per static-index partition (sorted by address id, the sort included) and a root; MurmurHash3 x86-128 from the published algorithm in 32-bit lanes (timing only). Synthetic, schema-shaped CITY (≈ 10 900 derivation + 3 500 naming records, 23 partitions) and METROPOLIS (≈ 29 300 + 9 500, 46 partitions). Apple M1, Node 24.12 (§12.1's reference machine), medians of seven, two runs: ≈ 4.0 ms at CITY and ≈ 11.4 ms at METROPOLIS, root identical across runs. Deterministic (seeded); plain Node, no dependencies. (fixall/draft-determinism-r5, opus stand-in, pending Fable review.)

## fixall/draft-rendering-r4 (2026-09-26, opus stand-in, pending Fable review)
- `fixall_rendering_r4_stamptiles.mjs` → `.out`: NR3-7 — the stamp-tile library's cost as §8.10 specifies it (toroidal 64-m tile, Bridson k = 50 all evaluated, integer-cm points; void-and-cluster ranking with σ = the spacing, a software exponential standing in for `dmath.exp`): ≈ 161 points per tile at 4 m, ≈ 2.8 ms sampling + ≈ 1.8 ms ranking with the removal update (≈ 53 ms with a re-sum after every removal); a per-(class, spacing) session library ≈ 19 ms per spacing at 4 m; the shipped asset (6 B per point) ≈ 31 KB for 8 classes, loaded and hashed in ≈ 0.03–0.06 ms. Plain Node, no dependencies; seeded; a cost model, not the product's code.

## fixall/draft-pipeline-r5 (2026-09-26, opus stand-in, pending Fable review)
- `fixall_pipeline_r5_wingcost.mjs` → `.out`: cost of §2.6's wing carry and check per building per warp validation pass (NP4-6), by class (row quad, one-wing rect, tiled L / T / cross / U / inner-joint, overlapping T), the identity pairing's one-off cost, a 450-building core-mix estimate, and the agreement of the simple-counter-clockwise-with-pairing test with the full geometric edge test at 1 m and 8 m warp amplitude. Node, no dependencies; deterministic (seeded).

## Fable review (2026-09-27) — B21

**Verdict: CORRECTED** (Fable, lane `fable-review/main/evidence-review`; the full record with line citations is
`docs/fable-review/main/evidence-review.md` §B21). The eleven red-team scripts of 2026-09-25 17:07 and their ten `.out` files stand
as evidence; two statements above and one line of one `.out` do not, and are corrected here (existing text is left unchanged).

**Re-run, 2026-09-27, on the machine class this README names (Apple M1, Node v24.12.0, Python 3.9.6).**
`mfcg_orient.py`, `mfcg_ribbon.py`, `mfcg_wallalign.py` (from `captures/mfcg/exports-2026-09-25/`), `ftg_arith.py` and
`ftg_anisotropy.py` (from the project root; both payload `.bin` files and `tools/pb_raw.py` present) reproduce their `.out` **byte for
byte**. `bench_state.mjs` (CITY and METRO), `bench_index.mjs`, `bench_terrain.mjs`, `bench_poisson_astar.mjs` and `bench_siting_doc.mjs`
reproduce every count and size exactly and every timing a report quotes within 1–6 % (canonical hash 1 163 → 1 177 ms CITY; stream
keys 73 → 73 ms = 0.73 µs per key, the figure §6.1 of the design budgets against; index S11 total 13.37 → 13.39 s; S1 subtotal at 625²
125.5 → 127.6 ms; siting 97.8 → 99.6 ms per round; 25 667 / 65 632 Poisson points and 35 364 / 88 869 A* expansions identical).
`mfcg_cover.py`, which has no `.out` here, was re-run with the window and screenshots `docs/validation/redteam-visual.md` §0 records
(`captures/mfcg/2026-09-25T10-38-58/steps/047…, 049…, 051….png`, box 660,720,940,940) and reproduces its quoted result exactly:
paper share of land 0.246 (Lots) → 0.311 (Complex), figure 0.754 → 0.689, Block 0.249. The `.out` files are therefore kept as the
receipts the reports quote; they are not regenerated (judgment J-Fev2-2, vetoable).

**Correction 1 — attribution of the ink-cover figure.** The table above credits "building ink cover (0.57–0.66)" to `mfcg_cover.py`.
That script measures the paper share of MFCG *screenshots* by pixel class and produced the 0.246 → 0.311 figure used by
`redteam-visual.md` VIS-2, not the cover. The 0.57–0.66 gross footprint cover inside the wall came from `mfcg_stats.py` (rule stated in
`docs/validation/redteam-mfcg.md` §0; the file was not preserved). Fable re-derived it from the JSON exports with an independent
script (shoelace footprint area of every building whose centroid lies inside the wall ring ÷ ring area): 0.657 / 0.582 / 0.621 / 0.583
for seed 555001 size 40 with gates 0 / 1 / 4 / 9 and 0.569 for seed 777001 size 80 — exactly MFP-1's 65.7 / 58.2 / 62.1 / 58.3 / 56.9 %.
The figure is CONFIRMED; only its attribution was wrong.

**Correction 2 — one defective line in `bench_state.out`.** The CITY line "heap per entity-table copy ≈ −90 MB" is a measurement
failure (a negative heap delta: the forced GC before the second `heapUsed` read reclaimed more than the copy allocated). The re-run
gives ≈ 47 MB; the METRO line (≈ 117 MB, ≈ 2.1 KB per entity) is the same in both runs and is the figure SCL-5 rests on. Read the CITY
heap line as "≈ 47 MB (re-run)".

**Units.** The scripts treat the GeoJSON exports as metres, and that is right: the export metadata reads `roadWidth 8, towerRadius 7.6,
wallThickness 7.6` (MFCG's 2.0 u and 1.9 u at 4 m per internal unit) and the size-40 wall ring spans 919 × 866 units = 58 ha. The "1 unit
= 4 m" the queue row mentions is the SVG's internal unit (`redteam-mfcg.md` §0: 3.9998 m; the captures review's scale-bar check:
4.000 ± 0.001 m, J19). The two statements are consistent.

**Representativeness.** The synthetic CITY (5 500 plots, 6 000 buildings, 1 750 blocks, 3 000 ways, 25 districts, 60 000 vertices per
level; METRO ×2.5) sits at the top of the current §12 CITY band (4 500–6 000 buildings, 5.0 km frame) and of the METROPOLIS band
(12 000–15 000); the terrain grids are the design's frames, the S4 lattice its 25 m spacing. The workloads are cost models, not the
product's code, as the reports say.
