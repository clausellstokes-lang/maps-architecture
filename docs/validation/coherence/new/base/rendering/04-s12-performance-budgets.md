## §12 Performance budgets

*In plain words.* Each size of town gets a rule rather than one number — a fixed part plus a cost per building — because
a bigger town has more buildings. By those rules the first map appears in under a quarter of a second for any town,
under 0.6 s for any city and within about a second for a metropolis of up to about 48 000 people; the largest
metropolises, up to 120 000 people, take up to about 2.3 s (§12.5). Building the model alone meets the improvement plan's
targets — a tenth of a second for a town, three tenths for a city, one second for a metropolis — for 19 runs in 20 up to
about 4 500, 17 700 and 58 800 people, and is slower above them (§12.3). Both misses are stated for the owner to veto
rather than hidden behind a half-finished picture or a thinner town. Every step has its own budget, measured on one named
machine. Against MFCG drawing the same number of buildings, PLAT takes about twice as long for towns and cities and five
times as long for a metropolis, because it builds what MFCG does not — real terrain and rivers, plots with yards, a plan
for every plot, trades placed by rule, greenery and non-colliding labels (§12.9); that trade is declared too. Receipts
named `fixall_*.out` below are in `docs/validation/bench/`.

### 12.1 Reference hardware and how budgets are measured (SCL-15)

* **Reference machine:** Apple M1 (4 performance + 4 efficiency cores) in a MacBook Air (MacBookAir10,1, fanless), 16 GB,
  macOS 14.7, Chrome stable and Node 24 — the machine on which every MFCG, FTG and NG bar in this document was recorded
  and the named mechanisms were timed (redteam-scale §7). The capture record (`captures/mfcg/2026-09-21T11-25-32/meta.json`)
  holds the CPU, 8 cores, arm64 and Node v24.12.0 but no memory size and no Chrome version; the model, memory and OS were
  read from the same host on 2026-09-25 (`fixall_rendering_r2_host.out`, N-27 b). Because the host is fanless, every
  timing batch starts after 30 s idle and runs ≤ 60 s, with `bench/calibrate` before and after it; a batch whose two
  scores differ by more than 5 % is re-run.
* **Low-end device** (O12 b's ≥ 30 fps clause; the `low` hardware tier): Intel Core i3-10110U (2 cores, 4 threads, UHD
  Graphics 620), 8 GB, Chrome stable — or any machine whose calibration score is within ± 15 % of it.
* **Calibration benchmark** (`bench/calibrate`, fixed inputs): 5-octave fBm over 256² cells, a bucket-queue priority flood
  over 256², a 20 000-node Dijkstra, a 100 000-element typed-array sort, and, in browser runs, a Canvas2D raster of 32
  fixed tiles (≈ 40 ms; the part that also picks the hardware tier at app start, §8.8). Every score is stored with the
  host's CPU model and core counts, memory size, OS version, Node version and browser name and version (from the
  user-agent client hints), so a stored score always names its machine (N-27 b). CI divides every timing by (runner
  score ÷ reference score) before comparing it with a budget; the reference score is stored with the goldens.
* **Where each budget is measured (N-27 a):** model budgets in Node 24 (worker_threads for the pool) on every tier, and —
  in the nightly tier (§13.8) — again inside Chrome's worker on the same seeds and sizes; where the two figures differ by
  more than ± 15 %, the Chrome figure is the one checked against the budget (the product runs in browsers) and both
  numbers are reported. Frame, tile, first-map and label budgets are measured in Chrome (Playwright, GPU on). p50 and
  p95 are over B-CITY's seeds per rung and water setting.
* **Timing on shared runners.** A CI timing that gates a budget — the cost-model sweeps (§13.2), the first-map, settle and
  query runs (§12.5, §8.9), the export runs (§12.7), the pool comparison and the re-timing of a max-clause outlier (§12.3)
  — is taken in the **timing phase**: last in its tier, alone on the runner (no other suite, generation or browser
  running), in batches of ≤ 60 s with `bench/calibrate` before and after each, a batch whose two scores differ by more
  than 5 % re-run, and the pool size recorded with every timing. A timing taken while other suites share the runner —
  the nightly B-CITY set, which runs beside the invariant suite, B-FUZZ and B-EDIT (§13.8) — screens and never gates: a
  generation it flags is re-timed in the timing phase (§12.3). The phase costs ≤ 20 min of the nightly budget: the sweeps
  and the first-map runs are nine sizes × five seeds in Node and in Chrome (≈ 1–2 min of generating), and re-timing
  takes at most 20 generations × 3 runs per rung (≤ ≈ 3.5 min at the band tops) (J-R49).
* **Confirming milestones.** Each budget of §12.3–§12.8 is confirmed by one row of §12.10's register — its measuring
  milestone and suite, its pass bar, its pre-decided change if it misses and whether the miss goes to the owner's veto
  (D-18) — and cites that row (E-18).
* **Budgets never change output.** A missed budget is reported, never answered at run time by computing something
  coarser (F-BUDGET-TIME is reporting-only, GEO-2); the pre-decided changes are configuration decisions taken once at a
  milestone and reported, and none of them changes the model.

### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2)

The rungs' population bands and targets, buildings at the target and frame areas are §1.1's rung table (frames: §3.2
(9)); this table adds the matched MFCG reference at each rung and the cap above METROPOLIS's target.

| rung (§1.1) | matched MFCG size (plain options, seed 555001) | MFCG buildings / walled ha | MFCG generation (the app's own stage timings) |
|---|---|---|---|
| TOWN | 40 | 1 475 / 58 | 57 ms |
| CITY | 80 | 5 242 / 220 | 131 ms |
| METROPOLIS | 130 | 13 091 / 548 | 156 ms |
| METROPOLIS above its target — up to the population cap of 120 000: ≤ 35 000 buildings, a frame ≤ 153.6 km² (≤ 12.4 × 12.4 km) | 200 (a stress comparison) | 31 951 / 1 274 | 236 ms |

* Buildings at the target are derived at ≈ 3.4 persons per building for the core plus the hinterland (PLAUSIBLE). **The
  default request** of a rung is its target population, whose building count §1.1's rung table gives as a range; a band's
  bottom and top are its population ends at 3.4 persons per building (in buildings: §12.5's table).
* Within a rung the frame scales with the requested population; the cap's frame and its headroom are §3.2 (9)'s.
  Requests outside the ladder are routed or clamped by §1.1's `LadderRouter`; a dossier's are §7.7 item 15's.
* The matched counts come from the MFCG size sweep (`captures/mfcg/exports-sweep-2026-09-25/README.md`). MFCG's GeoJSON
  export is in metres and only its SVG uses its 4 m internal unit (road width 8 in the JSON, 2 in the SVG). MFCG counts
  with shanty town, river or coast switched on (15 392 buildings at size 80; 13 349–36 480 in its profile) are stress
  comparisons, not the CITY bar.

### 12.3 Model budgets on the one-click path

The primary configuration is one generation worker plus the **derivation pool** (up to three workers, §4.1) for the
per-district stages — S10 plots, S10b placement, S11 site plans, per-district greenery — with the hinterland unit on the
generation worker concurrently, merged in district lineage order (§4.1, §6.3). The single-worker column is the
pre-decided fallback: on the low tier, in hosts that forbid extra workers, and at every size where the pool measures
slower than a single worker or fails the digest check (*Which configuration is primary*, below).

| rung | model p50 / p95 (pool) | per building at p95 | MFCG at the matched size | ratio at p95 | single-worker fallback p95 |
|---|---|---|---|---|---|
| TOWN | 78 / 100 ms | 75 µs | 57 ms (39 µs per building) | 1.8× | 115 ms |
| CITY | 262 / 300 ms | 58 µs | 131 ms (25 µs) | 2.3× | 400 ms |
| METROPOLIS | 624 / 800 ms | 59 µs | 156 ms (12 µs) | 5.1× | 1 000 ms |

**Per-rung cost laws** (p95; used for every size inside a band, and fitted by the cost-model tests, §13.2): with the pool,
TOWN ≤ 20 ms + 60 µs × buildings; CITY ≤ 40 ms + 50 µs × buildings; METROPOLIS ≤ 100 ms + 52 µs × buildings (at the
35 000-building cap: ≤ 1.9 s). Single-worker, through the fallback column's p95 at the same building counts: TOWN
≤ 20 ms + 71 µs × buildings; CITY ≤ 40 ms + 69 µs; METROPOLIS ≤ 100 ms + 67 µs. The table's rows are these laws at
1 333, 5 200 and 13 460 buildings — so its per-building column is 100 ÷ 1 333 = 75 µs, 300 ÷ 5 200 = 58 µs and
800 ÷ 13 460 = 59 µs — and its p50 column is §12.4's critical path, the pool's frozen copies with their static index
partitions, S12c and S11's light placement included (J-A72.82), re-declared at M2b with the daylight term's row (§12.4);
§12.5 adds the first frame to them.

**Where O3 (d)'s bars hold, and the declared miss.** `docs/IMPROVEMENTS.md` O3 (d) asks for model time "p50 / p95 /
max per size class within budget" at TOWN ≤ 100 ms, CITY ≤ 300 ms and METROPOLIS ≤ 1 s. Size follows population inside a
rung (§1.1), so — as for the first map (§12.5) — the bars are read over every size a rung builds, never at its target
alone, and checked against the laws above. The **max clause**: no generation takes more than 1.25 × its own law,
T_i ≤ 1.25 × L(B_i) with B_i its building count. p50 has no law of its own; since p50 ≤ p95, the bar is claimed for p50
wherever it holds for p95. Values (`fixall_rendering_r3_budgets.out`):

| rung (O3 (d) bar) | p95 at the band bottom / the default request / the top | p95 bar holds up to | max bound at the top | max bar holds up to | single worker: p95 bar holds up to |
|---|---|---|---|---|---|
| TOWN (100 ms) | 46 ms / 92–110 ms / 196 ms | B ≤ 1 333 (≈ 4 500 people) | 246 ms | B ≤ 1 000 (≈ 3 400 people) | B ≤ 1 127 (≈ 3 800 people) |
| CITY (300 ms) | 187 ms / 265–340 ms / 481 ms | B ≤ 5 200 (≈ 17 700 people) | 601 ms | B ≤ 4 000 (≈ 13 600 people) | B ≤ 3 768 (≈ 12 800 people) |
| METROPOLIS (1 s) | 559 ms / 724–880 ms / 1 920 ms | B ≤ 17 300 (≈ 58 800 people) | 2 400 ms | B ≤ 13 460 (≈ 45 800 people) | B ≤ 13 433 (≈ 45 700 people) |

The band ends are §12.5's; the default request (§12.2) lands at 92–110 ms for TOWN and 265–340 ms for CITY — the first
table's 100 and 300 ms are the laws at 1 333 and 5 200 buildings.

**Declared for the owner's veto:** every plot, site plan and building stays on the one-click model path at every size
(J-R7, J-I2, J-R38; the owner's plot-model ruling) rather than O3 (d)'s bars being held across each band, so the bars
are met for p95 up to the sizes in the table and missed above them — by up to 96 ms at the TOWN band top (196 ms),
181 ms at the CITY top (481 ms) and 0.92 s at the METROPOLIS cap (1.92 s) — and met for the max up to the smaller sizes
of the fifth column. The model's cost is linear in buildings at 50–60 µs each, while holding the bars at the band tops
would need a p95 of ≤ 27 µs (TOWN), ≤ 30 µs (CITY) and ≤ 26 µs (METROPOLIS) per building — MFCG's own range (§12.9) —
which only taking plot and site-plan detail off the one-click path could reach. Reversal cost: high as a mechanism (the
plot model leaves the one-click path, against the owner's ruling); nil as a reading (reading O3 (d) at the targets alone
reports "met" with the same numbers and hides the miss). D-18 and §15.2's O3 (d) row refer to this declaration.

**Measurement and fallback:** R12-1 (the laws), R12-2 (the configuration), R12-3 (the max clause) of §12.10; each
generation is read against the law at its own building count, since a size's building count varies with the seed.

**Which configuration is primary.** At the same milestones the timing phase runs every size of the sweep — the
band's bottom, target and top — with the pool (three workers) and with a single worker (pool size 0) on the same
generations (B-CITY-lite's 50 seeds × 4 water settings at that size, paired by seed and water setting), and the golden
run generates 200 seeds at pool sizes 0–3. The pool is primary at a size when (a) it passes R12-1's sweep rule against
the pooled law, (b) its p95 there is below the single worker's p95 on the same generations, and (c) the model digests are
identical for pool sizes 0–3 on the 200 seeds. The outcomes are pre-decided:

* **(c) fails, or the single worker is faster at all three sizes of a rung** → the single-worker column becomes that
  rung's declared budget, the tables of this section are restated from the single-worker law, and O3 (d)'s clause is
  reported missed by the difference;
* **(b) fails at one or two sizes only** → each size range runs the configuration that was faster at the nearest measured
  size — the switch at the midpoint, in buildings, between two measured sizes whose winners differ — chosen at S0 from the
  request's population ÷ 3.4 persons per building (§12.2); pool size never changes the model (§3.3 step 5), so the choice
  is configuration, not output, and each range is budgeted by its configuration's law;
* **only (a) fails** → the pooled law is re-declared at the measured p95 as a D-18 amendment (the fallback above), and the
  pool stays primary wherever (b) holds.

A pool that runs exactly at its law passes (a): the default CITY request lands at 265–340 ms (the law at 4 500–6 000
buildings), where the single worker's law gives 351–454 ms, so the rule keeps the faster configuration (J-R18, J-R44).

**The max clause, judged on confirmed outliers.** The nightly B-CITY run (1 000 seeds × 4 water settings per rung,
§13.8) **screens** the clause: it records every generation's ratio T_i ÷ L(B_i) with its pool size. Those timings are
taken beside other suites, so each generation whose ratio exceeds 1.25 is **re-timed** three times in §12.1's timing
phase — alone on the runner, at its recorded pool size, with the calibration before and after — and is a **confirmed
outlier** when the median of its three re-timed ratios exceeds 1.25. When more than 20 generations of a rung exceed 1.25,
the 20 with the highest ratios are re-timed and the flagged count is reported: a regression slows most generations, so
the highest confirm it, while a contended runner flags a handful. The same rule judges the clause at its confirming
milestones (R12-3; J-R56).

### 12.4 CITY per-stage split (SCL-3)

Each stage's mechanism is its stage section's (§4); this table holds the work and the time each budget assumes.

| stage | mechanism | work at CITY; rates the budget assumes | p50 |
|---|---|---|---|
| S0 blueprint | parameter expansion, stream set-up | — | 2 ms |
| S1 site | §4.2 S1 (1), (3); hydrology grid §2.3; no contours here (extracted per render tile, §8.2) | ≈ 0.3 M noise evaluations at ≈ 27 ns; ≈ 102 000 hydrology cells (flood, flats, D8 and accumulation measured 15.9–17.2 ms, `fixall_kernel_r2_hydro.out`) | 25 ms |
| S2 / S3 programme, siting, reservations, the stage-1 boundary and trace | §4.2 S2–S3, §10.2; the S4 lattice and edge costs are built here (§4.3) | the roster on its Δ = 10 grid (≤ 100 classes); ≈ 2 000 candidate centres; the plaza-rooted Dijkstra and the gate-route solves ≈ 7 ms; the one travel-cost field `T` with the stage-1 level set, gates, castle weld and trace ≈ 4 ms (+ ≈ 4 ms only when a moat is carved and `T` is recomputed after S3's L0 batch) | 16 ms |
| S4 backbone | §4.3 (the lattice built at S3; S3's shortest-path tree reused for every plaza-anchored route at epoch 0) | ≈ 46 000 nodes | 10 ms |
| S5 growth (S5a–S5d per stage) | §4.4 (later boundaries are level sets of S3's one travel-cost field, re-settled incrementally — no per-stage field) | ≤ 8 µs per insertion including snap, attraction and re-walk (M0); ≈ 5 000 proposals | 40 ms |
| S6 districts + fields | §4.5 | 3 × 62 500 cells | 17 ms |
| S6's daylight term, pass 1 (g item 102 (a)–(c): terrain and wall shade) | §4.5 *Fields*, §8.4's `sunPath` | 62 500 field cells × 9 sun positions, one horizon sweep per sun direction over the terrain field and the wall, gatehouse, castle and tower prisms at ≈ 20 ns per cell and sun (PLAUSIBLE); the island strips at pass 2 are V05 §6's; budget TOWN ≤ 5 ms, CITY ≤ 12 ms, METROPOLIS ≤ 30 ms (R12-29) | 11 ms |
| S7 fortification furniture | §4.8 (one L1 batch per enceinte) | — | 4 ms |
| S8 infill | §4.6 | ≈ 1 500 cuts at ≈ 12 µs per cut | 20 ms |
| S9 corridors | `corridorUnion` on the kernel's arrangement per district (§3.7) — one engine on every host, no WebAssembly | per district: the kernel's M0 bar (§3.7) | 25 ms |
| S7b district and S10a block allocation (eager, LC-2) | §4.5, §4.7 | ≈ 80 classes × 25 districts; inside them from M5 S7c's fabric selection ≤ 1.8 ms with its reconcile ≤ 1 ms, and S9b's block dispatch ≤ 5 ms (V01 §6; file f item 474) | 8 ms |
| S7b's underground forecast (II.7; V04 §3.3; from M6-U, file f item 475) | §4.5 | the network's graph, tree and sizing on S4–S6's ways, the void capacities, the undercity's existence, the voids' access chances | 3 ms (6 at METROPOLIS, 1 at a village rung) |
| S12a hinterland siting (eager, no geometry) | §4.9 | — | 1 ms |
| S10 (0) shared-edge bands (eager, before the freeze; J-I9) | §4.7 S10 (0), §3.3 (then the rebuild of the L3 static partitions it touched) | ≈ 3 ms for the bands on the wall traces and ≈ 6 km of perimeter (the margin bands included) + ≈ 2.3 ms for the L3 partition rebuild of the ≈ 9 000 items it made (§3.3 pool step 1; build rate measured, `fixall_kernel_r3_bench.out` A) | 5 ms |
| S10 + S10b + S11 + per-district greenery (pooled) | §4.7, §4.9 | S10 ≈ 10 µs per plot of geometry plus ≈ 2 µs for the context vector (distance rasters at 16 m: ≈ 7 ms once; the siting feature rasters of V11 §3.3.3 — at the fields' 32 m cell where every reading row's radius is ≥ 60 m, else 16 m, at most 32 — ≤ 10 ms at CITY, ≤ 26 ms at METROPOLIS, ≤ 4 ms at TOWN, the row's p50 re-declared at M2b by *Re-declared rows*, below; file f item 477); S11 ≤ 5 µs median per plot — its geometry share within the kernel's M0 bar (§3.7) plus rule evaluation ≤ 2 µs; compound ≤ 40 µs (25 + 15); mean ≤ 6 µs; yard planting and parks ≈ 1 µs per plot; S10b's relation and supply scoring (§4.7; item 16): one more distance transform per producing class present (≈ 10–30 classes at CITY, ≈ 4–10 ms once, PLAUSIBLE) and ≤ r relation rows per candidate at O(1) raster reads each, absorbed in this row's p50 within its imbalance margin until M2b measures it (below); S11's light placement (§4.7 *Light sources*; item 68): ≈ 8 000 lights at CITY (§8.1 item 6's sizing) at ≈ 1 µs each — its rule row, its site test on the index, its address — plus one spacing bisection through `dmath` per lit way, ≈ 10 ms of work (PLAUSIBLE); the cluster packing (§4.7, item 70) only on a shanty district's cluster plots — none on the default request — each structure a building (§2.6) at S11's per-plot rate, so §12.3's per-building laws carry it; ≈ 126 ms of work on ≈ 5 500 plots, on 3 workers with 25 % imbalance | 53 ms |
| the hinterland unit's S10–S12b (generation worker, concurrent with the pool) | §4.1, §4.9 | ≈ 1 600 FTG-sized furlongs (≈ 2.5 ha) in the 39 km² margin at ≈ 8 µs per insertion (≈ 12 ms); outside plots and driveways ≈ 3 ms | (≈ 15 ms, hidden by the pool) |
| merge | §4.1, §3.3 (the frozen arena copied once to each pool worker; the overlays and the hinterland unit merged in lineage order) | the **frozen arena copies**, each with the static index partitions: ≤ ≈ 15 MB each at the one-click freeze (≈ 20 MB at a freeze after edits; ≈ 37 MB at METROPOLIS), ≈ 1.5 ms each at CITY (measured, `fixall_kernel_r4_bench.out` A) | 13 ms (8 merge + 5 copies) |
| S12c character (item 72; eager, town-wide, on the generation worker after the merge, before S13a) | §4.5 (2) and (4) | per district (≈ 25 at CITY), significance-weighted sums over its placed instances (≈ 5 500 plots, each read once for its family, power and sector weights), the frontage-times-trade-weight sum, the anchors it lies near and the identity rows; draw-free (PLAUSIBLE until M2b) | 2 ms |
| the underground tail (II.7; after the first map, §4.1; from M6-U, file f item 475) | II.7 and V04 §6 | the network, the void systems, the sewer-front and undercity neighbourhoods, the ruins, the arch vaults, the access pass, the links and the reconcile: p95 ≤ 10 ms at each village rung; p50 26 · 71 · 162 ms at TOWN · CITY · METROPOLIS historical, p95 36 · 112 · 253; navigable p95 61 · 192 · 343; a hidden layer costs nothing to draw | (tail) |
| the sky (V05; from M6-sky, file f item 476) | V05 §3 | not on the one-click path; with three islands V05 §6's rows | (staged) |
| S13a names + label candidates | §4.10, §9 | ≈ 3 500 names, ≈ 60 skeleton spines, way-label anchors, address numbering, names for every quarter-tree node | 12 ms |
| statistics core record | O(n) counts, sums and histograms (the expensive metrics on demand or in the bench; SCL-21) | — | 4 ms |
| model digest | per-batch digests inside each stage (SCL-1); finalisation | — | 5 ms |
| **critical path** | | | **≈ 273 ms p50 (≈ 262 without the daylight term; + 3 ms from M6-U); p95 ≤ 300 ms** |
| S14 city band (outside the model budget; counted in the first frame) | columnar build for every district (§8.1) | ≈ 60 000 marks | 20 ms |

Stated assumptions: stage rates include stream-key derivation and model-digest maintenance within §6.1's and §6.2's
bounds (the rows were costed at 0.3 µs per key, SCL-12), and no whole-level static index rebuild per commit (SCL-2). There is one geometry engine on
every host (§3.7): S9 and S11 are budgeted once, for it, and the generation report names the engine that ran (SCL-22).
The single-worker CITY path is ≈ 346 ms p50 (the pooled 53 ms becomes 126 ms, the hinterland unit's ≈ 15 ms joins the
critical path, and no arena copies are made). METROPOLIS: raster and lattice work × ≈ 2.6 (frame area), entity work
× 2.5 — ≈ 624 ms p50 with the pool (copies ≈ 3.9 ms each, measured; + ≈ 29 ms for the daylight term, + 6 ms from
M6-U), ≈ 831 ms single-worker. TOWN: ≈ 78 ms p50 with the pool (+ ≈ 5 ms for the daylight term). S12c, the light
placement and the daylight term are costed rows, not absorbed: S12c and the daylight term run serially (after the merge,
and in S6), where the pool's imbalance allowance does not reach, and the light placement's ≈ 10 ms of work is costed
where it runs (J-A72.82). The rows stay PLAUSIBLE until the fusion gate and the M0 site-and-fields spike measure them
(R12-4, R12-5); the p95 laws of §12.3 are the budget.

**Re-declared rows (items 16, 26, g item 102; J-A16.81).** S10b's scoring, the siting feature rasters and the daylight
term are measured at M2b on B-CITY-lite, where the relation templates, the one solver and the term ship at generation
(§4.7, §4.5, §16); a row whose p50 then exceeds its figure is restated at the measured value and §12.3's p50 column with
it — the p95 laws are the budget and stay where they are (R12-4). The hinterland
unit's row is unchanged: item 26's "drawn after" is a dependency order the pipeline already realises, and the unit's concurrent
execution stands (J-A26.41).

**M0 site-and-fields spike** (beside the fusion gate, which covers S4 + S5 + S8): S1 + S4 + S6 ≤ 50 ms at CITY with these
mechanisms, starting from redteam-scale §7's scripts (R12-5).

### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6)

**The first map is a law of the building count (N-2).** Size follows population inside a rung (§1.1), so the first-map
budget is a function of B, the number of buildings the request generates (≈ population ÷ 3.4, §12.2), never one number
per rung. Time to first map — click → the complete city band on screen, Canvas2D `ink`, the reference viewport — is
§12.3's model law plus the **first-frame law**

  F(B) ≤ 20 ms + 10 µs × B

made of S14's city band (≈ 4 µs per building, §12.4), the delivery of the column slices to the tile worker (≈ 1 µs), the
city-band raster (≈ 5 µs per building plus 0.25 ms per tile position), S13b at the first stop (≤ 2 ms), the label
composition (≈ 0.1 ms per position plus ≈ 1 µs per glyph) and the commit of the composed tiles (≈ 0.1 ms per position),
for the **reference viewport** — 1 440 × 900 CSS px at device pixel ratio 2, whose worst tile alignment covers P = 35
positions of 512² device px (§8.8) — so the fixed terms sum to ≈ 19 ms. Laws and values
(`fixall_rendering_r2_budgets.out`; bottom and top: the band ends, §12.2):

| rung | buildings B, band bottom → top | time to first map T(B), pool | T at the band's bottom / the default request / the top | the rung's bar holds up to | single-worker fallback |
|---|---|---|---|---|---|
| TOWN | 440 → 2 940 | ≤ 40 ms + 70 µs × B | 71 ms / 124–145 ms / 246 ms | 150 ms: B ≤ 1 570 (≈ 5 300 people) | ≤ 40 ms + 81 µs × B (138–162 ms at the default) |
| CITY | 2 940 → 8 820 | ≤ 60 ms + 60 µs × B | 236 ms / 330–420 ms / 589 ms | 0.4 s: B ≤ 5 670 (≈ 19 300 people) | ≤ 60 ms + 79 µs × B (416–535 ms) |
| METROPOLIS | 8 820 → 35 000 | ≤ 120 ms + 62 µs × B | 667 ms / 864–1 050 ms / 2 290 ms | 1 s: B ≤ 14 190 (≈ 48 000 people) | ≤ 120 ms + 77 µs × B (1.04–1.27 s; 1 s up to B ≈ 11 400) |

**Where O12 (g)'s one second holds, and the declared miss.** The first map is under one second for every TOWN and every
CITY request (their band tops are 246 ms and 589 ms) and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people); the
default METROPOLIS request (50 000 people) lands at 0.86–1.05 s across its building range. Above ≈ 14 200 buildings the
first map grows by 62 µs per building, to ≈ 2.3 s at the 35 000-building cap (120 000 people). **Declared for the
owner's veto:** the one-click path stays complete at every size — every plot, site plan and building at city-band detail,
no preview (J-R7, J-I2, J-R35) — rather than one second being held above the knee: the model's cost is linear in
buildings (§12.3), and the only ways under the bar there are a partial picture, whose figure-ground differs from the
finished map (MFP-1), or dropping plot and site-plan detail from the one-click path, which the owner's plot-model ruling
forbids. Reversing costs ≈ 1 person-week: above the knee, the city band would appear district by district as the pool
finishes them, with the labels last. With the single-worker fallback the knee is ≈ 11 400 buildings (≈ 39 000 people).

**Measurement and fallback (N-2, N-27 c):** R12-6; the table is re-derived from the measured laws and the knee re-stated
to the owner.

**Interaction** in O12 (b)'s stress view of 40 000 buildings and 200 000 trees (above the request cap of §12.2, so a bench
fixture, not a generated request): **pan** ≥ 60 fps on the reference machine and ≥ 30 fps on the low-end device
(compositing cached tiles; ≤ 4 ms of main-thread work per frame); **zoom gestures** at the same rates (scaled cached
tiles). **Settle:** the visible tiles re-rastered at the new stop within ≤ 150 ms for a CITY view and ≤ 250 ms for a
METROPOLIS view, centre-out, in the tile worker — assuming P ≤ 35 positions, the city band at 0.25 ms per position + 5 µs
per visible building, the district band at 0.25 ms per position + 12 µs per visible building, and 0.2 ms per position to
compose and commit (a whole-CITY city-band view ≈ 42 ms, a whole-METROPOLIS view ≈ 83 ms, a district-band view of 3 000
buildings ≈ 52 ms); hairline fidelity at every settled view (§8.3). **Confirmation (N-27 c):** R12-7; pan and zoom rates
have §8.9's WebGL2 compositor as theirs.

**Draw calls:** ≤ 80 Canvas2D path fill and stroke calls per tile whatever the building count (batched per program and
semantic), so ≤ 80 × P per view (≤ 2 800 at the reference viewport), plus one sprite draw per visible crown and per placed
glyph (from the atlas). **Uploads (N-5):** while a pan or zoom gesture runs, ≤ 4 new composed bitmaps are committed per
animation frame, centre-out (baselines: NG 528 uploads per hood, MFCG 590 per city); at the first map and at settle every
ready tile is committed in the frame it arrives — one composed bitmap per position (§8.8), so a first frame commits ≤ P
bitmaps, not 2P, and no cap stretches it over frames; roof computations per frame after warm-up = 0 (derived roofs
cached, §8.1). **Re-raster** at the district band ≤ 12 ms per 1 000 buildings (MFCG's replay costs 11–15 ms per 1 000).
**Neighbourhood band:** opening one district ≤ NG's 10–96 ms at comparable counts; from M5 (V01 §6; file f item 474):
opening one district — model and display list ≤ 6 ms + 0.06 ms × its buildings (a `ring` district ≤ 10 ms + 0.07 ms × B),
its first visible tiles rastered ≤ NG's 73–111 ms, against NG's 10–52 ms (78–96 ms for ring) at comparable counts;
≈ 25 canvas operations per wing as the `hatched` ceiling. No size rung depends on WebGL2 for its marks; the light
ladder's rungs 1–2 need a GPU context and rung 3 does not (§8.4 (g); RIC-05).

**Lighting (item 68; §8.4).** The first map above is composed unlit and its time never includes the light (§8.5; the
laws stand); the surface layers with their pyramids and the light maps of the visible tiles follow centre-out, then the
first ring's heights and the ring blocks (§8.8), lighting the view within the settle bound above (≤ 150 ms for a CITY
view, ≤ 250 ms for a METROPOLIS view, §12.7's bake, first ring and blocks inside it). Blocks are cached per stop, so a
pan pays only for those it exposes; at a new stop they cost ≈ 1 µs per city-band mark the window reaches (§12.7), up to
≈ 85 ms at CITY and ≈ 181 ms at the METROPOLIS target where a low sun over high relief reaches the whole frame from the
1:500 stop (`amendc_repair_rendering_r3_blocks.out` (6)) — PLAUSIBLE until R12-8 measures them. While the pointer moves the cursor sun or the hand lantern, the
global light's term — and, underground, the lantern's — runs every frame on the GPU: ≤ 1 ms of main-thread work per frame
(its uniforms and one draw per visible tile set) inside the ≤ 4 ms above, and the GPU pass ≤ 8 ms per frame at the
reference viewport on the reference machine (rung 1: the global light's traversal of §8.4 (c) per pixel — 17–22 cells at
the median and ≤ 62 at the 99th percentile on the seeded town of `amendc_repair_rendering_r2_traversal.out` (4) at the
1:500 stop — and the lantern's over the ≈ 113 m² its radius lights (§8.4 (b)), ≤ 0.5 ms of it), ≤ 16 ms per frame for the
low-end device (PLAUSIBLE until R12-9), so pan and the moving sun keep ≥ 60 fps and ≥ 30 fps; the moving pointer
re-rasters and re-bakes nothing (§8.8's keys).

### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9)

* **Scoped regeneration:** ≤ 3 ms + 60 µs × the buildings in scope (a district of ≤ 450 buildings in ≤ 30 ms), plus the
  S13a and S14 deltas ≤ 3 ms; the dirty tiles re-raster in the tile worker off the edit path (§12.5's re-raster rate);
  edit-to-redraw < 100 ms.
* **A single plot edit:** ≤ 5 ms of model work plus ≤ 2 ms of deltas.
* **Assignments, dossier events and the evolution hooks (items 16–22, 30, 31; PLAUSIBLE until M3a's B-EDIT sequences
  time them):** a post-build placement of one item — an `assign`, a `placeAt`, a dossier addition or the re-placement a
  `rejectSite` triggers (§4.7 S10b, §7.7) — ≤ 30 ms of model work at CITY, one multi-source Dijkstra per provider class
  over the L1 way graph included, plus one designation mutation per placed plot (§4.7 S11) at the single-plot edit's
  bound above and the deltas; a use opened, closed or relocated by hand (§4.11) at most two such mutations; a
  `sealPassage` or `openPassage` the block's re-derivation at the scoped-regeneration law; a terrain or water conversion
  (`reclaim`, `siltReach`, `shiftCourse`, `digCanal`) the coarse-edit bound below; a due block's re-cut (fusion or splitting,
  §4.11, through §7.1's `split` and `join`) a block regeneration of its buildings with its neighbours fixed; `resizeIsland`,
  `settleIsland`, `fallIsland` and `refloatIsland` their footprint like a carve, and `raiseIsland` its new island's
  districts at the scoped-regeneration law on its own arena; a `relet` one re-cut step of a stored plan inside the
  event, an unstored plan only marked stale (§12.7; J-A28.72) (R12-10). A replace close-up costs the scoped law × its
  template's factor (V01 §6; M5, file f item 474).
* **Coarse edits** (PLAUSIBLE; measured with §13.2's B-EDIT coarse-edit sequences): a course-knot, moved-shore or
  drawn-water edit ≤ 60 ms of model work at CITY for a re-traced reach ≤ 500 m (re-trace and carve ≈ 5 ms, crossing
  search ≈ 1 ms, the L1 batch of kept-way routes, deck vertices and cuts ≈ 5 ms, S4 re-route of ≤ 3 arterials ≈ 5 ms, S5
  regrowth in ≤ 4 cells, F-REDERIVE of the touched blocks at the scoped-regeneration law); a terrain stroke ≤ 3 ms + 1 µs
  per re-based entity + the field-brush law for the blocks its drivers re-derive (R12-11).
* **Scope invariance:** the same scope costs the same at TOWN, CITY and METROPOLIS within ± 20 % (R12-12).
* **Replay and load verification (N-16, N-1).** A replay (§7.3 item 2's replay mode) folds the log on the model through
  the session's code path, and the view stages run once at the end (§7.3 item 2) — S13a's scoped delta at each event
  that re-derives names costs ≤ 3 ms per such event. Its cost is therefore a sum over the log, not a constant:

  V = M(B) + Σ c(e) + S14(B) + 5 ms

  where M(B) is §12.3's model law for the document's size (the recipe is replayed from S0; checkpoints are session
  memory, §7.4, and are not saved), S14(B) ≈ 4 µs × B is one display-list build, 5 ms finalises the model and records
  digests, and c(e) is each event's replay cost — its model scope cost, plus succession matching (§6.3's budget), plus S13a's delta when it re-derives names: ≤ 0.5 ms for an event that re-derives nothing (attribute,
  label, lock, pin, style and table-row edits whose slices no entity reads); ≤ 8 ms for a plot-scale edit; the
  scoped-regeneration law above + matching + 3 ms for a scoped regeneration, a local operator (§7.3) or a
  `'grow-by-stage'` epoch; an epoch of the history engine its recomputation — V06 §6.1's per-rung compute plus its
  participants', their island events at V05's per-event rows included (≈ 0.4 s at CITY in an epoch without one; a
  century of history verifies within V06 §6.2's century bound, ≤ 115 s at CITY, off the path to the picture; M6-E, file
  f item 478); ≤ M(B) for a Re-derive from Sk. For the **reference verification mix** of 300 edits on a CITY document of
  5 200 buildings — 200 light edits, 80 plot-scale edits, 15 block regenerations of ≤ 60 buildings and 5 district
  regenerations of ≤ 450 buildings — V ≈ 1.4 s p95 (`fixall_rendering_r2_budgets.out`); a log of 300 district
  regenerations takes ≈ 11 s. Verification never delays the picture or an edit (§2.9 step 3, which holds open-to-editable
  ≤ T(B); the recomputation of the saved copy's model and records trees measured ≈ 35–38 ms at CITY on a synthetic
  document, `fixall_det_r4_loaddigest.out`, `fixall_det_r5_recordsdigest.out`); the report shows the law's estimate and
  the progress (R12-13; J-R36).
* **Warp preview:** ≥ 30 fps for a brush radius ≤ 150 m at the district band (§8.8); Apply ≤ the scoped-regeneration
  budget of the touched faces, counting §2.6's wing carry and check inside the whole-step validation — ≈ 0.4 ms per
  validation pass for 450 buildings on an assumed core mix and ≈ 3.6 ms in the worst case of a step and eight halvings
  (`fixall_pipeline_r5_wingcost.out`; §2.6 rule 4) (R12-14).
* **Proxy thumbnails:** §7.8's budget.
* **The SettlementForge stage:** V08 §6's rows — the host client, the tab's thumbnail, the frame's boot, load, the hash,
  the digest, creation, absorbs, the refresh queue, memory and storage per map record (file f item 480).

* **Previews and the authoring toolkit (item 101).** A declaration's preview — its dry run with the ghost, the handles
  and the count badge (§7.1, §8.2's `live.ghost`, §9.5, §11.2's `preview`) — costs its scope's edit budget above (a
  quarter or a fill the scoped regeneration's law over the buildings it holds; for a place the single-plot bound, for a road the
  coarse-edit bound), plus ≤ 3 ms to deliver the ghost; while a declaration is drawn the preview re-runs at most once per
  settle of the pointer (120 ms after it stops), the latest winning. T1 `intend`'s sliders are basic-panel controls whose
  change is a regeneration — within §12.3's model law and §12.5's first-map law, as any Adjust of an early parameter
  (§7.8's proxies for the site cards) (R12-15).

### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)

* **Labels:** S13a 12 ms at CITY and ≤ 30 ms at METROPOLIS (model); S13b ≤ 2 ms per zoom stop for ≤ 2 000 visible
  candidates — ≈ 1 µs per candidate, the rate an export's placement is budgeted at too — run in resumable steps of one
  decision (§8.9, §9.2), the knowledge filter a one-byte test per row inside the candidate set's unit, no pass of its own; a tile's label composition ≤ 3 ms at ≤ 150 glyph runs (measurement and fallback: §8.9).
* **Trees:** placement ≤ 1 µs per instance (stamp, scale, rounding and point-in-polygon) and drawing ≤ 2 µs per instance
  as a sprite (§8.10). A district-band view with 10 000 visible trees composes in one 16 ms frame from cached tiles, and
  its tiles raster in ≤ 30 ms of tile-worker time (O19 e); the 200 000 trees of a METROPOLIS are never all instantiated —
  only visible tiles generate instances. The stamp-tile asset (§8.10) is loaded and hash-checked at worker start in
  ≤ 5 ms per worker per session, never on a settle (≈ 0.03–0.06 ms for 8–16 classes, measured cost model,
  `fixall_rendering_r4_stamptiles.out`); nothing is sampled or ranked at run time, so the first zoom to the district band
  carries no library build. **The crown library:** its build (20 crowns per class per style, once per session) and, on
  the vector rung in `lit` with a `path` sun, each light step's bake run in the tile worker as one-sprite units (§8.9), ≤ 20 ms of
  tile-worker time per (style, light step) for eight crown classes (PLAUSIBLE: ≈ 20–60 µs per sprite on Canvas2D,
  ≈ 3–10 ms for 160 sprites), started when the style loads so the first district-band raster finds it ready; a light
  step's bake runs at the head of §8.4's light-step pass, inside its settle bound (R12-17).
* **Lighting (item 68; §8.4).** In the tile worker, per visible tile after its base: the **surface layer** ≤ the base
  raster's own time at the band (the same draw sequence writing normals, heights and coverage; PLAUSIBLE), and the
  **light-map bake** ≤ 2 ms per tile for up to 50 lights reaching it and ≤ 4 ms for up to 200 (PLAUSIBLE: 256² texels ×
  the lights whose radius covers them × §8.4 (c)'s traversal toward each, plus the eight-direction occlusion), each light a unit of
  §8.9's class 3; then per **first-ring position** its heights raster ≤ the surface layer's time at the band (the same
  draw sequence writing heights alone), and per **ring block** ≈ 1 µs per city-band mark meeting it, ≈ 2 ns per
  terrain-field sample meeting it and ≤ 0.05 ms for its ≤ 21 845 cells (PLAUSIBLE; one block per unit of class 3) — each mark read
  by about one block of a view's partition, so the blocks of a window reaching a whole frame from the 1:500 stop cost
  ≈ 39 / 85 / 181 / 433 ms at the TOWN, CITY and METROPOLIS targets and the population cap
  (`amendc_repair_rendering_r3_blocks.out` (6)), cached per stop and paid again only for the blocks a pan exposes or a
  delta dirties; so a lit settle stays within §12.5's settle bound for the city and district bands of the golden views
  (the mountainous fixture's: §12.5).
  **A lit export** adds the CPU reference light pass: ≤ 60 ms per 512² tile of the export (PLAUSIBLE: ≈ 262 000 pixels ×
  §8.4 (c)'s global-light traversal, the baked point lights and the occlusion, in float64, with its window's first ring
  and blocks, §8.8 — its first ring rastered per tile, and each block computed a single time as long as the export's
  16-MB block cache holds it, at the ring block's rate above), so A2 at 300 dpi of a
  CITY lit takes ≤ 30 s with the view idle (unlit, the ≤ 20 s below) (R12-18).
* **SVG** at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for
  837–1 512 buildings, 6.3 MB for 15 392) plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB per distinct
  glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face, checked against the bundled files) (N-13) — and
  ≤ 60 000 elements, written in ≤ 2 s in the generation worker: the transient list's build (≈ 4 µs per building,
  ≈ 54 ms at the METROPOLIS target), S13b at the export stop (≤ 2 ms per 2 000 candidates) and the writing (§11.1).
  Inkscape opens it within §11.1's CI bound.
* **PNG:** A2 at 300 dpi of a CITY in ≤ 20 s on the reference machine **with the view idle**, the peak canvas one tile
  band. Inside it: the transient list's build in the generation worker (≈ 4 µs per building at the city band — ≈ 21 ms
  at CITY — and more at the finer band a large print's scale selects; §8.7, §11.1); the export's placement in the tile
  worker (≈ 1 µs per candidate in the frame — ≤ 20 ms for 20 000 candidates, more than a whole CITY's label rows at any
  band: ≈ 3 500 names, §12.4, one address per building and the repeats of long street names — in class-4 steps, §8.9);
  and the encoding (§8.8's per-row filter rule, then the deflate), measured on a synthetic A2 map in Node 24
  (`fixall_rendering_r5_png.out`) at 3.5 s for flat `ink`-like colours, 5.4 s under smooth relief shading and 10.5 s for a
  textured `lit`-like look, of which the filter pass takes 2.7 to 3.4 s and the deflate the rest (PLAUSIBLE for browsers,
  whose filter pass is the same JavaScript and whose deflate is native code behind `CompressionStream`). View work
  pre-empts the export's steps (§8.9), so a pan or zoom during an export lengthens it by that work, which the export
  dialog's progress shows, and an animated view still leaves it one step in every 100 ms.
* **Confirmation of the export budgets (N-27 c; R12-19).** The SVG and PNG budgets are measured at M1 on B-CITY-lite's TOWN and
  CITY seeds and at M2b on METROPOLIS. Pre-decided fallbacks, taken once and reported: an SVG size or element miss at the
  city band writes path coordinates with one decimal of the export's unit instead of two and merges compound paths per
  (semantic, quarter of the city cut) instead of per (semantic, district), re-keying the `<metadata>` map; a district-band
  SVG that misses its estimate draws woods and orchards as their outlines instead of crowns; a PNG time miss is answered
  per host, the same pixels in a larger file each time: **on every host** the row filter is fixed to type None for every
  row instead of §8.8's per-row rule — on the synthetic A2 the filter pass disappears and the unfiltered rows also deflate
  faster, so encoding falls from 3.5, 5.4 and 10.5 s to 0.6, 1.3 and 4.4 s for the flat, relief and textured looks, the
  file 4 % smaller to 10 % larger; **in Node**, whose `zlib` takes a level, a miss that remains deflates at level 3
  instead of 6 (a further 0.35–2.5 s on the synthetic looks, the file 8–51 % larger); **in browsers**, whose
  `CompressionStream` takes a format and no options — in Node 24's implementation of the same standard a `{ level }` option
  is ignored, 5.3 MiB with none, level 1 and level 9 alike — a miss that remains after the filter change re-declares the
  PNG budget at the measured p95 as a D-18 amendment for the owner's veto. On the synthetic looks None is faster than the
  fixed Sub filter and no larger (Sub spends ≈ 0.2 s filtering, deflates as slowly as the default, and its files are
  7–30 % larger than the default's), and the per-row rule gives the smallest file wherever rows carry gradients or
  texture — 6–9 % smaller than None's on the relief and textured looks (J-R53).
* **Export beside the view:** R12-20. **The stamp-tile load:** R12-21.
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (the kernel's
  M0 bar, §3.7; §12.4's S11 row); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per
  building median over the town, ≤ 60 µs median and ≤ 250 µs p99 over its composed classes, and ≤ 12 µs mean (V02 §6.1),
  and its registration re-declares S11's row of §12.4 by the measured difference (§2.6, §3.7; file f item 223; R12-22);
  `compose()` ≤ 1 ms per building median at `wings`, in the derivation pool as §4.1's policy says (§8.6, §8.9), streamed
  to the tiles centre-out — one tile's compositions within 16 ms of pool time, amortised (a tile draws the outline until its
  compositions arrive). A research-side restatement of the Fantasy Manor model (build 890, version 1.0.0), run as a test
  instrument, takes roughly 0.08 ms for each building warm and about 0.6 ms with view geometry included — so the 1 ms
  `compose()` bound has headroom (item 59).
* **Plan rung (§2.6; item 28; J-A28.83):** `plan()` at most 5 ms at the median and 20 ms at p95 for one building on the
  reference hardware (§12.1), run by the derivation pool as §4.1's policy says — one plan for each click, inside a
  single 16 ms pool frame amortised across clicks; the
  count covers the programme's allocation, the seed clip where the storey's wings overlap (one `tileRings` overlay),
  opening the storey's transient arena (O(seed vertices)), the cuts and the read-back (§3.4). A re-cut — of a `stale`
  plan at its click, or of a stored plan inside the event that changes its
  inputs (§7.3; J-A28.72) — runs as §2.6's chain of such steps along item 28 (f)'s interior ladder: one per band row
  crossed and one per household added or removed, from the as-built plan's row and count for a stale plan (the canonical
  chain) or from the stored plan's, fewer where the cache holds a memoised step (§2.9); its length — at most the band
  set's rows less one (five: the default set has six rows, §2.6) plus the building's capacity less one (none for a building of capacity 0, which houses no household; §2.6) — is known
  before the first open; budgeted at ≤ 5 ms × steps median and ≤ 20 ms × steps p95 (R12-23); a miss at run time is
  reported, never answered by a coarser plan (§12.1).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker (R12-24); never
  on the one-click path.

### 12.8 Memory (what is counted, per rung)

Counted: the JS heap, typed arrays and WebAssembly memory of every thread (generation worker, pool, tile worker, main),
with canvas backing stores budgeted separately by §8.8's canvas budget, which depends on the viewport, not the rung.
**Model working set, all threads, excluding canvases:** TOWN ≤ 40 MB, CITY ≤ 110 MB, METROPOLIS ≤ 260 MB.

What each thread holds is §8.9's (the tile worker holds no model) and §8.1 item 6's (the display list in the tile worker,
its 24-B index in the generation worker); the tile worker also holds the
decoration memo and the placement memo, its glyph atlases and crown sprites being canvases; the derivation pool holds its
per-worker overlays (§4.1); the generation worker holds the elaboration cache (§8.6, §2.9) and the close-up caches. The lines assume one kernel arena per
layer (≈ 20 MB at CITY with its typed lookup tables, its spatial index and the index's home column, §2.2; PLAUSIBLE until
M1) plus one frozen arena copy per pool worker (§12.4's merge row) and each district overlay until it merges (§3.3), the
compact entity store and the scoped
undo records of §2 and §7.4 (SCL-5), people derived on demand, tree instances never stored, and the display list at
≈ 11.4 MB at CITY across the two threads that hold any of it. The pool's frozen arena copies are ≈ 45 MB at CITY with
three workers at the one-click freeze and ≈ 60 MB at a freeze after edits (typed tables; `Map`-based tables would cost
each worker more heap and ≈ 10–20 ms of rebuild). While a loaded document is verified, one pool worker holds the replay's
model in place of the frozen copies (no frozen copy is made then, §4.1), its arena and entity columns about the copies'
size — or, with pool size 0, the generation worker holds it beside the working state (§2.9 step 3). **M2a's memory
measurement** (the milestone that builds the log and load verification over M1's document format, §16) includes the load
verification of the reference 300-edit CITY document with a district regeneration and a Re-derive from S3 made during
it; the load's digest trees (at CITY the model tree ≈ 1 MB — ≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and
their interior nodes at 16 B each — and the records tree ≈ 0.25 MB, §6.2) sit in the entity-store line, and a bridged
client that took the replayed town keeps the `doc.load` bytes (≤ 3 MB at CITY) until the mismatch is settled (§11.3).
The lines stay PLAUSIBLE until R12-25 measures them.

**The elaboration cache (item 28; J-A28.83).** ≤ 1 KB per building at the `wings` rung and ≤ 4 KB for each storey of a
plan (rings and walls as integer cm, openings, windows and furniture as offsets along their walls or in cm; file f item
232), LRU-capped at 8 MB per document
in the generation worker — a session line counted on top of each rung's working set, never inside the rung lines above,
and evicting a rung to `absent`, which loses nothing because each rung is derived purely from its building's committed
state (§4.1); its persisted chunks (§2.9) count toward the document's size budget as non-canonical data and are dropped
first when that budget binds (R12-27).

**The clerk's scratch document (V10 §6.2; M3c, file f item 481).** A scratch copy the built-in clerk opens for an
authoring turn (§11.2's `scratch`) is a session line counted on top of each rung's working set, beside the elaboration
cache: at most TOWN 20 MB, CITY 55 MB, METROPOLIS 130 MB, held only during an authoring turn and while its proposal
waits, released on accept, drop, stale or close; a device that cannot hold it runs the clerk in overlay mode (V10
§3.19).

**The underground parts (V04; M6-U, file f item 475).** Part 0 ≤ 1 MB historical and ≤ 3 MB navigable at CITY; a ruin
part ≤ 2 MB; each other part ≤ 1.5 MB — in the rung's entity-store line.

**The CITY line, itemised (≤ 110 MB).** At the one-click freeze the fixed items are the arena (≈ 20 MB), three frozen
copies (≈ 45 MB) and the display list (≈ 11.4 MB across the tile worker's copy and the generation worker's index) —
≈ 76 MB — leaving ≈ 34 MB for the **entity-store line** — the compact entity store with the load's digest trees
(≈ 1.25 MB) and, on a bridged client during a load mismatch, the kept `doc.load` bytes (≤ 3 MB) — and for the terrain,
hydrology and field rasters, the district overlays until they merge, the scoped undo records, the decoration and
placement memos and each thread's runtime baseline. At a freeze after edits the copies are ≈ 60 MB and the fixed items
≈ 91 MB, leaving ≈ 19 MB; that case has its own first fallback step below. All PLAUSIBLE until M1 measures them.

**Export-time peak.** An export that draws holds a transient display list while it runs (§11.1) — SVG in the generation
worker while it writes; PNG, print and the `.dd2vtt` image in the tile worker, to which the list is transferred with the
request, until the last band is encoded (§8.9): ≈ 1.9 KB per building at the city band (§8.1 item 6's ≈ 10 MB for
≈ 5 200 buildings) — ≈ 2.6 MB at the TOWN target, ≈ 10 MB at CITY, ≈ 26 MB at the METROPOLIS target and ≈ 67 MB at the
35 000-building cap (`fixall_rendering_r3_budgets.out`) — plus the file being written (≤ 650 B per building for SVG at the
city band, §12.7; a PNG's streamed bytes), both released when the file is transferred out. It is counted on top of each
rung's line as a peak, not in the steady working set, and one export runs at a time. A district-band export's list — a
district-band SVG, or a large print whose scale selects the district band (§8.7) — enters the size estimate the export
dialog shows before it starts; its size per band is measured with the export budgets. A raster export also holds
canvases: one band (width × 512 × 4 B, ≈ 14 MB at A2 300 dpi, §8.8), the canvas of the tile job in progress (1 MB) and,
in `lit` with a `path` sun, the crown set it holds until it completes (§8.9), counted with the canvases below (R12-26).

**Canvases during a raster export.** The view's need is §8.8's canvas need, whose 7 MB of scratch holds the drawn light
step's crown set with the atlases. A raster export's ≈ 15 MB of
band and tile canvases count on top of that need. The crown set an export in `lit` with a `path` sun holds (§8.9) is the
drawn step's set while the view keeps that step and adds nothing; from the first light pass that completes while the
export runs (§8.4) it is one more set, bounded by §8.8's ≤ 5 MB crown-and-atlas scratch, which holds one set with the
atlases (a set is §12.7's 160 sprites). The reference viewport on the mid tier (112 + 15 ≤ 128 MB) and the low-end
1 366 × 768 view (43 + 15 ≤ 72 MB) hold both, the latter with the extra set too (43 + 15 + 5 ≤ 72 MB); where the sum
passes the tier's ceiling — the low tier at 1 920 × 1 080 (67 + 15 > 72 MB), and the mid tier's reference viewport once the
extra set is held (112 + 15 + 5 > 128 MB) — the coarser-stop fallback set is dropped for the export's duration (the need
falls to 2P + 7 MB: 47 + 15 = 62 MB on the low tier, 77 + 15 + 5 = 97 MB on the mid tier), and the export dialog refuses
a width whose band does not fit beside the reduced need, naming the widest that does. Lit on rungs 1–2 the need is
4.25P + 7 MB + Q, and 3.25P + 7 MB + Q without the coarser-stop set; such a view bakes no light-step crown set (§8.4's
light steps serve the vector rung), so it holds no extra one: the high tier's lit reference viewport (DPR 2, 172.75 + 15 =
187.75 ≤ 192 MB) holds both, while the mid tier's (DPR 1.5, 123.25 + 15 = 138.25 > 128 MB) and the low-end 1 366 × 768
view, lit at DPR 1 (68.75 + 15 = 83.75 > 72 MB), drop their coarser-stop sets for the export's duration (99.25 + 15 =
114.25 MB; 56.75 + 15 = 71.75 MB; `amendc_repair_rendering_r3_blocks.out` (5)).

**Measurement and fallback:** R12-25 (the lines and the canvases). The document's size budget is §2.9's.

**Lighting (item 68).** The light pass's textures on the main thread — per position the surface layer, its pyramid and
the light map, and the first ring's heights and the ring blocks — are canvases, counted by §8.8's canvas budget
(J-A68.89), never in the rung lines above; the `light` marks' rows sit in the display list's line (≤ 36 B per light,
§8.1 item 6). A lit raster export holds, beside its band canvas, one export tile's window — its float32 surface and pyramid, its
first ring's heights and its block cache, within §8.8's bound (≤ 30 MB at 1:500 and 300 dpi, ≤ 33 MB at 1:100 and 600 dpi) (§8.8;
`amendc_repair_rendering_r3_blocks.out` (3)), the surface and first ring released per tile and the cache when the
export completes — and a lit export's transient list carries the city band's casters over its window (at most a whole
city band's, ≈ 1.9 KB per building; §11.1); both count with the export-time peak above (R12-28).

### 12.9 Reference comparisons and the declared trade

* **MFCG at matched building counts** (§12.2): model time 1.8× (TOWN), 2.3× (CITY) and 5.1× (METROPOLIS) MFCG's
  generation (§12.3's table); time to first map, by §12.5's laws at MFCG's counts, ≈ 2× MFCG's generation plus canvas
  replay at TOWN and CITY (143 ms against 73–79 ms at 1 475 buildings; 374 ms against 189–210 ms at 5 242; MFCG's replay
  ≈ 11–15 µs per building, from its size-80 profile) and ≈ 3× at METROPOLIS (932 ms against 300–352 ms at 13 091); at
  MFCG's size-200 stress count (31 951 buildings, 236 ms plus replay) PLAT's law gives ≈ 2.1 s, ≈ 3–3.6×.
* **FTG.** The side-by-side sizes are FTG's BIG_TOWN and BIG_CITY, from M-1's free captures (§13.6, D-31), and
  METROPOLIS per D-31. FTG's CITY preset (9 500 people, 2 798 buildings), as captured: the server answers in 2.9–3.2 s,
  the client is building the scene 6.4–7.0 s after the click, and loading a finished settlement costs 2.0 s of busy time
  (ftg-payload-visual; its 4.6 s "client busy during create" figure is not a time to first map). PLAT's first map at that size (the TOWN law at 2 798 buildings) is ≈ 0.24 s, ≈ 27–30× sooner; FTG's
  creator gives ≈ 10 s to render a metropolis (49 500 people) client-side, ≈ 10× PLAT's ≈ 1.0 s at that population. M-1's
  BIG_TOWN and BIG_CITY captures add their timings to §13.5's timing row.
* **Declared trade (MFP-5, N-2).** A per-building cost of ≈ 58–75 µs at p95 (§12.3's laws at 1 333, 5 200 and
  13 460 buildings) is chosen over matching MFCG's 12–39 µs, because PLAT builds what MFCG does not — a heightfield with
  hydrology, frontage-first plots with yards and party walls, site plans with heights, roster siting, greenery by rule and
  collision-checked labels — which D-7 ranks above speed. Its consequences are the two misses declared for the owner's
  veto: model time above §12.3's sizes and the first map above §12.5's knee (O12 (g)). Reversing the trade would mean
  dropping plot and site-plan detail from the one-click path, which the owner's plot-model ruling forbids (J-R17).

### 12.10 The budget register (E-18)

Every measured budget of this section has one row: the budget (at its home), where and when it is measured, its pass
bar, the pre-decided change taken once at that milestone if it misses, and whether the miss goes to the owner's veto
(a D-18 amendment). Every miss is reported; a change is configuration or a declared shift, never a run-time answer
(§12.1).

| row | budget (home) | measured at | pass | pre-decided change on a miss | owner's veto |
|---|---|---|---|---|---|
| R12-1 | the per-rung model laws (§12.3) | the cost-model sweeps (§13.2, §13.8): every band's bottom, target and top, five seeds each, in §12.1's timing phase; M1 (TOWN, CITY), M2b (METROPOLIS) | at every size, the p95 of T_i ÷ L(B_i) over the size's generations ≤ 1.10 | the law re-declared at the measured p95; §12.3's and §12.5's tables re-derived from it | yes |
| R12-2 | the primary configuration (§12.3) | the same sweeps at pool sizes 3 and 0 on the same generations (B-CITY-lite's 50 seeds × 4 water settings per size, paired by seed and water setting); the golden run's 200 seeds at pool sizes 0–3; R12-1's milestones | (a) R12-1 against the pooled law; (b) the pool's p95 below the single worker's; (c) identical digests at pool sizes 0–3 | §12.3's three pre-decided outcomes | a re-declared law: yes; O3 (d)'s clause reported missed by the difference |
| R12-3 | the max clause T_i ≤ 1.25 × L(B_i) (§12.3) | screened nightly by B-CITY (1 000 seeds × 4 water settings per rung, §13.8); every flagged generation re-timed three times in the timing phase at its pool size (the 20 highest when more than 20 flag, the count reported); judged at M1 (TOWN, CITY) and M2b (METROPOLIS) | no confirmed outlier (the median of three re-timed ratios > 1.25) | the clause re-declared at the largest confirmed median ratio (for example 1.4 × the law); §12.3's max columns re-derived | yes |
| R12-4 | the CITY split's rows (§12.4) | the fusion gate and the M0 site-and-fields spike; S10b's scoring, the siting feature rasters and the daylight term at M2b on B-CITY-lite | the p95 laws of §12.3 (the rows are assumptions) | a row whose p50 exceeds its figure restated at the measured value with §12.3's p50 column; the p95 laws stay | no |
| R12-5 | the M0 site-and-fields spike, S1 + S4 + S6 ≤ 50 ms at CITY (§12.4) | M0, from redteam-scale §7's scripts | ≤ 50 ms | raster cells coarsen one step — fields and the margin 32 → 48 m; hydrology 25 → 32 m at CITY, 32 → 40 m at METROPOLIS, 16 → 20 m at TOWN — and the spike re-runs | no |
| R12-6 | the first-map laws (§12.5) | B-CITY's browser runs, five seeds each on the reference machine, at each band's bottom, default request and top: TOWN at 1 500 / 5 000 / 9 900 people and CITY at 10 000 / 20 000 / 29 900 at M1, METROPOLIS at 30 000 / 50 000 / 120 000 at M2b; both terms of each law fitted | every p95 within its law + 10 % | a raster-side miss (the first frame above F(B)) steps the tier's tile DPR down one level for every view (2 → 1.5; P from 35 to 24, a third off the per-position terms), fixed at the milestone, and the run repeats; a model-side miss is R12-1's or R12-2's | a model law: yes; the knee re-stated to the owner |
| R12-7 | settle and re-raster (§12.5) | with the first map: M1 on the reference and low-end devices at TOWN and CITY, M2b at METROPOLIS | ≤ 150 ms (CITY view), ≤ 250 ms (METROPOLIS view) | one tile-DPR step down on the tier that missed | no |
| R12-8 | the lit settle, ring blocks included (§12.5) | M2b's settle runs on §8.3's mountainous fixture | within the settle bound | the tier draws the view lit once its visible tiles and first ring are and adds the blocks after the settle, nearest first, each far shadow appearing when its block arrives, their time counted in the view telemetry — the settle's content changes, never a picture | no |
| R12-9 | the GPU frame: ≤ 8 ms (reference), ≤ 16 ms (low end), ≤ 1 ms of main-thread work (§12.5) | M2b in B-CITY's browser runs — the pointer sweeping the reference and low-end views at every rung and §8.3's mountainous fixture under its 15° and 7° suns; M4 on the underground hook fixture of §8.3's hand-lantern row, the lantern on | the frame bounds | the tier drops one rung of §8.4's ladder (1 → 2 → 3), fixed at the milestone, and the run repeats | no |
| R12-10 | the plot edit, assignments, dossier events and hooks (§12.6) | M3a's B-EDIT sequences (the base's hand forms); the hooks with the engine at M4 | the stated bounds | the row re-declared at the measured p95 | yes |
| R12-11 | the coarse edits (§12.6) | §13.2's B-EDIT coarse-edit sequences, at the milestone §16 gives them | the stated bounds | the row re-declared at the measured p95, as R12-10 | yes |
| R12-12 | scope invariance within ± 20 % (§12.6) | B-EDIT (§13.2): TOWN → CITY from M2a, TOWN → METROPOLIS from M2b | within ± 20 % | the per-rung scope costs re-declared at the measured p95, as R12-10 | yes |
| R12-13 | replay and load verification, V (§12.6) | B-EDIT's reference mix at M2a | ≤ V + 10 % | the per-kind costs c(e) re-declared at their measured p95 and the reference mix's V restated (no mechanism changes: the wait is off the path to the picture) | yes |
| R12-14 | the warp's Apply (§12.6) | M3a: a 150 m brush over a CITY core on B-CITY-lite seeds, the carry and check counted | within the scoped-regeneration budget of the touched faces | the wing check leaves the whole-step validation — it runs once after the final step, and a building that fails it is re-derived by S11 on its plot (F-REDERIVE, reported) instead of halving the step (§2.6 rule 4) | no |
| R12-15 | previews (§12.6) | B-EDIT at M3a, where the toolkit's area tools ship | the scope's edit budget + ≤ 3 ms | the preview re-runs only on release | no |
| R12-16 | labels: S13b per stop, a tile's label composition (§12.7) | §8.9's measurement at M1 | ≤ 2 ms per stop; ≤ 3 ms per tile | §8.9's (whole words cached as bitmaps; `step(4)`) | no |
| R12-17 | the crown library and each light step's bake (§12.7) | M2b's moving-sun runs (§8.4), where `lit` ships | ≤ 20 ms per (style, light step) for eight classes | §8.4's: with a `path` sun the lit programs and the crowns hold the sheet's fixed sun, the library baked once | no |
| R12-18 | the light-map bake and the lit export (§12.7) | M2b, where the light pass ships with `lit`: METROPOLIS views, B-CITY's A2 exports and §8.3's mountainous fixture | ≤ 2 ms per tile up to 50 lights, ≤ 4 ms up to 200; ≤ 60 ms per export tile; a CITY's lit A2 300 dpi ≤ 30 s | a bake miss resolves §8.4 (c)'s point-light traversal one pyramid level coarser on every host and in the CPU reference alike, a declared view shift (§13.3), never a per-device change; an export miss computes its light pass at half resolution, bilinearly upsampled — the reference defined at that resolution on every host, a declared view shift (§13.3) | no |
| R12-19 | SVG and PNG (§12.7) | M1 on B-CITY-lite's TOWN and CITY seeds; M2b on METROPOLIS | the size, element and time budgets | §12.7's (SVG: one decimal and per-quarter compound paths; a district-band SVG's woods and orchards as outlines; PNG: filter None on every host, then zlib level 3 in Node) | a browser PNG miss that remains: yes |
| R12-20 | an export beside the view (§12.7) | B-CITY's browser run in the timing phase: at M1 a scripted pan and zoom during an A2 300-dpi CITY export; from M2b a `lit` CITY export while a `path` sun advances one step per frame | every settle within §12.5's bound; the export completes; its PNG byte-identical to the export made with the view idle, to one during which an edit is made (§8.9, §11.1) and, for the `lit` export, to the export with the sun stopped at the request's time | §8.9's `step(4)` | no |
| R12-21 | the stamp-tile load, ≤ 5 ms per worker per session (§12.7) | timed with the first map at M1, per worker from worker start to the library ready | ≤ 5 ms | the per-session hash check moves to CI and the release build, leaving typed-array views over the bundled bytes | no |
| R12-22 | stage 3's `outline()` and `compose()` admission (§12.7) | the stage-3 intake (M6) | the admission bounds | V02 §6.1 (a)–(b)'s fallbacks first; if those still miss, `outline()` runs the generator's own massing step (§2.6) | no |
| R12-23 | the plan rung (§12.7) | §13.2's T28-8 on B-PLAN's fixtures, confirmed at the stage-3 intake | ≤ 5 ms × steps median, ≤ 20 ms × steps p95 | the class's wing-local module row doubles (50 → 100 cm), a declared view shift (§13.3, a plan being derived data), and the measurement re-runs | no |
| R12-24 | the simulation module's hour (§12.7) | its cost-model test (§13.2), with the module (§10.3) | ≤ 50 ms for 50 000 people | the cost re-declared at the measured p95 (never on the one-click path) | yes |
| R12-25 | the rung lines and the canvases (§12.8) | B-CITY's browser runs at M1 (TOWN, CITY), M2a (the reference 300-edit CITY document under load verification, with a district regeneration and a Re-derive from S3 made during it) and M2b (METROPOLIS); canvases in the scripted pan and zoom runs | within the lines; within §8.8's tier ceilings | CITY over its line at M1 or M2a: the provenance and lifecycle-history columns leave the working set for the document's on-demand block (SCL-20's archive), decoded only when inspected; still over at a freeze after edits: that freeze makes §3.3 step 1's laziness-contract copy — L0–L2, every L3 partition, only the L4 partitions of the districts the pool derives; still over: the pool shrinks by one worker per step (identical digests by construction, §3.3) and the memory test re-runs. Canvases over a tier's ceiling: its coarser-stop fallback set is dropped (the need falls to 2P + 7 MB), a gesture showing the next coarser cached tiles only where they remain | no |
| R12-26 | the export-time peak (§12.8) | with the export budgets (M1 TOWN and CITY, M2b METROPOLIS) | within the stated figure + 25 % | the transient list built with only the attribute columns the sheet's programs read at the export band, for every export that draws (up to ≈ 2.4 of the ≈ 10 MB at CITY, §8.1 item 6); the figure re-stated at the new measurement and used by the export dialog's size estimate | no |
| R12-27 | the elaboration cache, ≤ 8 MB per document (§12.8) | the stage-3 intake on B-PLAN's fixtures (§13.2) | within the cap | the cap halves and the persisted chunks keep only the `current` plans of the buildings the view state's `favourites` and view pins name (an `edited` plan is model data, §2.6, needing no chunk) | no |
| R12-28 | the light pass's memory (§12.8) | the canvas runs at M2b | §8.8's bounds | the tier's rung drops (§8.4's ladder) or its tile DPR steps down, as §8.8 states | no |
| R12-29 | the daylight term (g item 102 (g); §12.4): TOWN ≤ 5 ms, CITY ≤ 12 ms, METROPOLIS ≤ 30 ms | M2b on B-CITY-lite, with R12-4 | within the rung's budget | the nine sun directions are swept in the derivation pool, three per worker, their bits OR-ed in sun order — the same bits (§6), off the serial path | no |

The budgets of §8 keep their own measurement clauses at their homes (§8.2's random-style confirmation, §8.4's projected
shadows, moving sun and light steps, §8.5's recoverability, §8.9's compositor, text and queries), as does §11.1's
CityJSON extension.
