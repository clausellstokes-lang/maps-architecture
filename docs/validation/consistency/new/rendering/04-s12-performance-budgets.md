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
* **Confirming milestones.** Each budget of §12.3–§12.8 names the milestone that confirms it and the pre-decided change
  taken if it misses.
* **Budgets never change output.** A missed budget is reported, never answered at run time by computing something
  coarser (F-BUDGET-TIME is reporting-only, GEO-2); the pre-decided changes are configuration decisions taken once at a
  milestone and reported, and none of them changes the model.

### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2)

| rung | population band (target) | buildings at the target | frame area at the target (a rectangle of the blueprint's aspect, §3.2 (9); the square at the default aspect 1; + 30 % margin per side) | matched MFCG size (plain options, seed 555001) | MFCG buildings / walled ha | MFCG generation (the app's own stage timings) |
|---|---|---|---|---|---|---|
| TOWN | 1 500–10 000 (5 000) | 1 200–1 500 | 4 km² (2 × 2 km) | 40 | 1 475 / 58 | 57 ms |
| CITY | 10 000–30 000 (20 000) | 4 500–6 000 | 25 km² (5 × 5 km) | 80 | 5 242 / 220 | 131 ms |
| METROPOLIS | 30 000–120 000 (50 000) | 12 000–15 000 | 64 km² (8 × 8 km) | 130 | 13 091 / 548 | 156 ms |
| METROPOLIS above its target | up to the cap of 120 000 | ≤ 35 000 | ≤ 153.6 km² (≤ 12.4 × 12.4 km) | 200 (a stress comparison) | 31 951 / 1 274 | 236 ms |

* Buildings at the target are derived at ≈ 3.4 persons per building for the core plus the hinterland (PLAUSIBLE). **The
  default request** of a rung is its target population, whose building count this table gives as a range; a band's
  bottom and top are its population ends at 3.4 persons per building (in buildings: §12.5's table).
* Within a rung the frame area scales with population ÷ target (the side with its square root). At the cap the square
  frame is 12.4 km (19.8 km with the margins); at the extreme aspect 2 it is 17.5 × 8.8 km and |x| ≤ 1.40 × 10⁶ cm with
  the margins — ≈ 6× headroom under §3.2's 2²³-cm range (§3.2 (1)). Requests outside the ladder are routed or clamped by
  §1.1's `LadderRouter`.
* The matched counts come from the MFCG size sweep (`captures/mfcg/exports-sweep-2026-09-25/README.md`). MFCG's GeoJSON
  export is in metres and only its SVG uses its 4 m internal unit (road width 8 in the JSON, 2 in the SVG). The
  15 392-building size-80 city of the earlier exports had shanty town, river and coast switched on; it and the
  13 349–36 480 size-80 counts of the MFCG profile belong to such option sets and are stress comparisons, not the CITY
  bar.

### 12.3 Model budgets on the one-click path

The primary configuration is one generation worker plus the **derivation pool** (up to three workers, §4.1) for the
per-district stages — S10 plots, S10b placement, S11 site plans, per-district greenery — with the hinterland unit on the
generation worker concurrently, merged in district lineage order (§4.1, §6.3). The single-worker column is the
pre-decided fallback: on the low tier, in hosts that forbid extra workers, and at every size where the pool measures
slower than a single worker or fails the digest check (*Which configuration is primary*, below).

| rung | model p50 / p95 (pool) | per building at p95 | MFCG at the matched size | ratio at p95 | single-worker fallback p95 |
|---|---|---|---|---|---|
| TOWN | 76 / 100 ms | 75 µs | 57 ms (39 µs per building) | 1.8× | 115 ms |
| CITY | 255 / 300 ms | 58 µs | 131 ms (25 µs) | 2.3× | 400 ms |
| METROPOLIS | 609 / 800 ms | 59 µs | 156 ms (12 µs) | 5.1× | 1 000 ms |

**Per-rung cost laws** (p95; used for every size inside a band, and fitted by the cost-model tests, §13.2): with the pool,
TOWN ≤ 20 ms + 60 µs × buildings; CITY ≤ 40 ms + 50 µs × buildings; METROPOLIS ≤ 100 ms + 52 µs × buildings (at the
35 000-building cap: ≤ 1.9 s). Single-worker, through the fallback column's p95 at the same building counts: TOWN
≤ 20 ms + 71 µs × buildings; CITY ≤ 40 ms + 69 µs; METROPOLIS ≤ 100 ms + 67 µs. The table's rows are these laws at
1 333, 5 200 and 13 460 buildings — so its per-building column is 100 ÷ 1 333 = 75 µs, 300 ÷ 5 200 = 58 µs and
800 ÷ 13 460 = 59 µs — and its p50 column is §12.4's critical path, the pool's frozen copies with their static index
partitions included; §12.5 adds the first frame to them.

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

**Measurement and fallback.** The laws are confirmed by the cost-model sweeps (§13.2, §13.8: every band's bottom, target
and top, five seeds each), taken in §12.1's timing phase, at M1 for TOWN and CITY and at M2b for METROPOLIS — pass: at
every size, the p95 of T_i ÷ L(B_i) over the size's generations ≤ 1.10, each generation read against the law at its own
building count, since a size's building count varies with the seed. **Pre-decided fallback:** a miss re-declares the law
at the measured p95 as a D-18 amendment for the owner's veto (§12.5's path), and the tables here and in §12.5 are
re-derived from it.

**Which configuration is primary.** At the same milestones the timing phase runs every size of the sweep — the
band's bottom, target and top — with the pool (three workers) and with a single worker (pool size 0) on the same
generations (B-CITY-lite's 50 seeds × 4 water settings at that size, paired by seed and water setting), and the golden
run generates 200 seeds at pool sizes 0–3. The pool is primary at a size when (a) it passes the sweep rule above against
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
the highest confirm it, while a contended runner flags a handful. Pass: no confirmed outlier. The same rule judges the
clause at its confirming milestones (M1 for TOWN and CITY, M2b for METROPOLIS). **Pre-decided fallback:** a confirmed
outlier re-declares the max clause at the largest confirmed median ratio (for example 1.4 × the law) as a D-18 amendment,
and this section's max columns are re-derived from it (J-R56).

### 12.4 CITY per-stage split (SCL-3)

Each stage's mechanism is its stage section's (§4); this table holds the work and the time each budget assumes.

| stage | mechanism | work at CITY; rates the budget assumes | p50 |
|---|---|---|---|
| S0 blueprint | parameter expansion, stream set-up | — | 2 ms |
| S1 site | §4.2 S1 (1), (3); hydrology grid §2.3; no contours here (extracted per render tile, §8.2) | ≈ 0.3 M noise evaluations at ≈ 27 ns; ≈ 102 000 hydrology cells (flood, flats, D8 and accumulation measured 15.9–17.2 ms, `fixall_kernel_r2_hydro.out`) | 25 ms |
| S2 / S3 programme, siting, reservations, the stage-1 boundary and trace | §4.2 S2–S3, §10.2; the S4 lattice and edge costs are built here (§4.3) | the roster on its Δ = 10 grid (≤ 100 classes); ≈ 2 000 candidate centres; the plaza-rooted Dijkstra and the gate-route solves ≈ 7 ms; the one travel-cost field `T` with the stage-1 level set, gates, castle weld and trace ≈ 4 ms (+ ≈ 4 ms only when a moat is carved and `T` is recomputed after S3's L0 batch) (NF-P1) | 16 ms |
| S4 backbone | §4.3 (the lattice built at S3; S3's shortest-path tree reused for every plaza-anchored route at epoch 0) | ≈ 46 000 nodes | 10 ms |
| S5 growth (S5a–S5d per stage) | §4.4 (later boundaries are level sets of S3's one travel-cost field, re-settled incrementally — no per-stage field) | ≤ 8 µs per insertion including snap, attraction and re-walk (the first M0 measurement); ≈ 5 000 proposals | 40 ms |
| S6 districts + fields | §4.5 | 3 × 62 500 cells | 17 ms |
| S7 fortification furniture | §4.8 (one L1 batch per enceinte) | — | 4 ms |
| S8 infill | §4.6 | ≈ 1 500 cuts at ≈ 12 µs per cut | 20 ms |
| S9 corridors | `corridorUnion` on the kernel's arrangement per district (§3.7) — one engine on every host, no WebAssembly | — | 25 ms |
| S7b district and S10a block allocation (eager, LC-2) | §4.5, §4.7 | ≈ 80 classes × 25 districts | 8 ms |
| S12a hinterland siting (eager, no geometry) | §4.9 | — | 1 ms |
| S10 (0) shared-edge bands (eager, before the freeze; J-I9) | §4.7 S10 (0), §3.3 (then the rebuild of the L3 static partitions it touched) | wall traces and ≈ 6 km of perimeter; ≈ 9 000 items re-partitioned (build rate measured, `fixall_kernel_r3_bench.out` A) | 5 ms |
| S10 + S10b + S11 + per-district greenery (pooled) | §4.7, §4.9 | S10 ≈ 10 µs per plot of geometry plus ≈ 2 µs for the context vector (distance rasters at 16 m: ≈ 7 ms once); S11 ≤ 5 µs median per plot — its geometry share ≤ 3 µs (the kernel's M0 bar, §3.7) plus rule evaluation ≤ 2 µs; compound ≤ 40 µs (25 + 15); mean ≤ 6 µs; yard planting and parks ≈ 1 µs per plot; ≈ 116 ms of work on ≈ 5 500 plots, on 3 workers with 25 % imbalance | 48 ms |
| the hinterland unit's S10–S12b (generation worker, concurrent with the pool) | §4.1, §4.9 | ≈ 1 600 FTG-sized furlongs (≈ 2.5 ha) in the 39 km² margin at ≈ 8 µs per insertion (≈ 12 ms); outside lots and driveways ≈ 3 ms | (≈ 15 ms, hidden by the pool) |
| merge | §4.1, §3.3 (the frozen arena copied once to each pool worker; the overlays and the hinterland unit merged in lineage order) | copies ≤ ≈ 15 MB each with the static index partitions, ≈ 1.5 ms each (measured, `fixall_kernel_r4_bench.out` A) | 13 ms (8 merge + 5 copies) |
| S13a names + label candidates | §4.10, §9 | ≈ 3 500 names, ≈ 60 skeleton spines, way-label anchors, address numbering, names for every quarter-tree node | 12 ms |
| statistics core record | O(n) counts, sums and histograms (the expensive metrics on demand or in the bench; SCL-21) | — | 4 ms |
| model digest | per-batch digests inside each stage (SCL-1); finalisation | — | 5 ms |
| **critical path** | | | **≈ 255 ms p50; p95 ≤ 300 ms** |
| S14 city band (outside the model budget; counted in the first frame) | columnar build for every district (§8.1) | ≈ 60 000 marks | 20 ms |

Stated assumptions: stage rates include stream-key derivation at ≤ 0.1 µs per key (§6.1; the rows were costed at
0.3 µs, SCL-12), model-digest maintenance ≤ 5 % of each batch's time with finalisation ≤ 5 ms and a full recompute
≤ 150 ms at CITY (§6.2), and no whole-level static index rebuild per commit (SCL-2). There is one geometry engine on
every host (§3.7): S9 and S11 are budgeted once, for it, and the generation report names the engine that ran (SCL-22).
The single-worker CITY path is ≈ 334 ms p50 (the pooled 48 ms becomes 116 ms, the hinterland unit's ≈ 15 ms joins the
critical path, and no arena copies are made). METROPOLIS: raster and lattice work × ≈ 2.6 (frame area), entity work
× 2.5 — ≈ 609 ms p50 with the pool (copies ≈ 37 MB, ≈ 3.9 ms each, measured), ≈ 801 ms single-worker. TOWN: ≈ 76 ms p50
with the pool. The rows stay PLAUSIBLE until the fusion gate and the M0 site-and-fields spike measure them; the p95 laws
of §12.3 are the budget.

**M0 site-and-fields spike** (beside the fusion gate, which covers S4 + S5 + S8): S1 + S4 + S6 ≤ 50 ms at CITY with these
mechanisms, starting from redteam-scale §7's scripts. Pre-decided fallback: raster cells coarsen one step (fields and the
margin 32 → 48 m; hydrology 25 → 32 m at CITY, METROPOLIS 32 → 40 m, TOWN 16 → 20 m) and the spike re-runs.

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

**Measurement and fallback (N-2, N-27 c).** B-CITY's browser runs time the first map at each band's bottom, default request
and top — TOWN at 1 500 / 5 000 / 9 900 people and CITY at 10 000 / 20 000 / 29 900 at M1, METROPOLIS at 30 000 / 50 000 /
120 000 at M2b — five seeds each on the reference machine, and fit both terms of each law. Pass: every p95 within its
law + 10 %. Pre-decided fallbacks: a raster-side miss (the measured first frame above F(B)) steps the tier's tile DPR down
one level for every view (2 → 1.5; P falls from 35 to 24, cutting the per-position terms by a third), fixed at the
milestone and reported, and the run repeats; a model-side miss is §12.3's (the single-worker column, or the model law
re-declared at the measured p95 as a D-18 amendment for the owner's veto), after which this table is re-derived from the
measured laws and the knee re-stated to the owner.

**Interaction** in O12 (b)'s stress view of 40 000 buildings and 200 000 trees (above the request cap of §12.2, so a bench
fixture, not a generated request): **pan** ≥ 60 fps on the reference machine and ≥ 30 fps on the low-end device
(compositing cached tiles; ≤ 4 ms of main-thread work per frame); **zoom gestures** at the same rates (scaled cached
tiles). **Settle:** the visible tiles re-rastered at the new stop within ≤ 150 ms for a CITY view and ≤ 250 ms for a
METROPOLIS view, centre-out, in the tile worker — assuming P ≤ 35 positions, the city band at 0.25 ms per position + 5 µs
per visible building, the district band at 0.25 ms per position + 12 µs per visible building, and 0.2 ms per position to
compose and commit (a whole-CITY city-band view ≈ 42 ms, a whole-METROPOLIS view ≈ 83 ms, a district-band view of 3 000
buildings ≈ 52 ms); hairline fidelity at every settled view (§8.3). **Confirmation (N-27 c):** settle and re-raster are
measured with the first map (M1 on the reference and low-end devices at TOWN and CITY, M2b at METROPOLIS), with the same
pre-decided fallback (one tile-DPR step down on the tier that missed); pan and zoom rates have §8.9's WebGL2 compositor as
theirs.

**Draw calls:** ≤ 80 Canvas2D path fill and stroke calls per tile whatever the building count (batched per program and
semantic), so ≤ 80 × P per view (≤ 2 800 at the reference viewport), plus one sprite draw per visible crown and per placed
glyph (from the atlas). **Uploads (N-5):** while a pan or zoom gesture runs, ≤ 4 new composed bitmaps are committed per
animation frame, centre-out (baselines: NG 528 uploads per hood, MFCG 590 per city); at first paint and at settle every
ready tile is committed in the frame it arrives — one composed bitmap per position (§8.8), so a first frame commits ≤ P
bitmaps, not 2P, and no cap stretches it over frames; roof computations per frame after warm-up = 0 (derived roofs
cached, §8.1). **Re-raster** at the district band ≤ 12 ms per 1 000 buildings (MFCG's replay costs 11–15 ms per 1 000).
**Neighbourhood band:** opening one district ≤ NG's 10–96 ms at comparable counts; ≈ 25 canvas operations per wing as the
`hatched` ceiling. No rung depends on WebGL2 (§8.9).

### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9)

* **Scoped regeneration:** ≤ 3 ms + 60 µs × the buildings in scope (a district of ≤ 450 buildings in ≤ 30 ms), plus the
  S13a and S14 deltas ≤ 3 ms; the dirty tiles re-raster in the tile worker off the edit path (§12.5's re-raster rate);
  edit-to-redraw < 100 ms.
* **A single plot edit:** ≤ 5 ms of model work plus ≤ 2 ms of deltas.
* **Coarse edits** (PLAUSIBLE; measured with §13.2's B-EDIT coarse-edit sequences): a course-knot, moved-shore or
  drawn-water edit ≤ 60 ms of model work at CITY for a re-traced reach ≤ 500 m (re-trace and carve ≈ 5 ms, crossing
  search ≈ 1 ms, the L1 batch of kept-way routes, deck vertices and cuts ≈ 5 ms, S4 re-route of ≤ 3 arterials ≈ 5 ms, S5
  regrowth in ≤ 4 cells, F-REDERIVE of the touched blocks at the scoped-regeneration law); a terrain stroke ≤ 3 ms + 1 µs
  per re-based entity + the field-brush law for the blocks its drivers re-derive.
* **Scope invariance:** the same scope costs the same at TOWN, CITY and METROPOLIS within ± 20 % (a B-EDIT test:
  TOWN → CITY from M2a, TOWN → METROPOLIS from M2b, §13.2; NF-S6).
* **Replay and load verification (N-16, N-1).** A replay (load verification, migration, undo beyond the scoped records,
  the undo of an upgrade after a reload) folds the log on the model through the session's code path (§7.3) — S13a's
  scoped delta at each event that re-derives names costs ≤ 3 ms per such event, and S14 and S13b run once at the end. Its cost is therefore a sum over the log, not a constant:

  V = M(B) + Σ c(e) + S14(B) + 5 ms

  where M(B) is §12.3's model law for the document's size (the recipe is replayed from S0; checkpoints are session
  memory, §7.4, and are not saved), S14(B) ≈ 4 µs × B is one display-list build, 5 ms finalises the model and records
  digests, and c(e) is each event's replay cost — its model scope cost, plus succession matching (≤ 2 µs per re-derived
  entity, §6.3), plus S13a's delta when it re-derives names: ≤ 0.5 ms for an event that re-derives nothing (attribute,
  label, lock, pin, style and table-row edits whose slices no entity reads); ≤ 8 ms for a plot-scale edit;
  ≤ 3 ms + 60 µs × the buildings in scope + matching + 3 ms for a scoped regeneration, a local operator (§7.3) or an
  epoch; ≤ M(B) for a Re-derive from Sk. For the **reference verification mix** of 300 edits on a CITY document of
  5 200 buildings — 200 light edits, 80 plot-scale edits, 15 block regenerations of ≤ 60 buildings and 5 district
  regenerations of ≤ 450 buildings — V ≈ 1.4 s p95 (`fixall_rendering_r2_budgets.out`); a log of 300 district
  regenerations takes ≈ 11 s. Verification never delays the picture or an edit (§2.9 step 3, which holds open-to-editable
  ≤ T(B); the recomputation of the saved copy's model and records trees measured ≈ 35–38 ms at CITY on a synthetic
  document, `fixall_det_r4_loaddigest.out`, `fixall_det_r5_recordsdigest.out`); the report shows the law's estimate and
  the progress. B-EDIT times the reference mix at M2a (pass: ≤ V + 10 %); pre-decided fallback: the per-kind costs c(e)
  are re-declared at their measured p95 and the reference mix's V restated here, reported for the owner's veto (the
  verification wait is off the path to the picture, so no mechanism changes) (J-R36).
* **Warp preview:** ≥ 30 fps for a brush radius ≤ 150 m at the district band (§8.8); Apply ≤ the scoped-regeneration
  budget of the touched faces, counting §2.6's wing carry and check inside the whole-step validation — ≈ 0.4 ms per
  validation pass for 450 buildings on an assumed core mix and ≈ 3.6 ms in the worst case of a step and eight halvings
  (`fixall_pipeline_r5_wingcost.out`; §2.6 rule 4). *Measurement (M3a):* the Apply time of a 150 m brush over a CITY core
  on B-CITY-lite seeds, the carry and check counted. *Pre-decided fallback* if it exceeds the budget: the wing check
  leaves the whole-step validation — it runs once after the final step, and a building that fails it is re-derived by
  S11 on its plot (F-REDERIVE, reported) instead of halving the step (§2.6 rule 4).
* **Proxy thumbnails:** §7.8's budget.

### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)

* **Labels:** S13a 12 ms at CITY and ≤ 30 ms at METROPOLIS (model); S13b ≤ 2 ms per zoom stop for ≤ 2 000 visible
  candidates — ≈ 1 µs per candidate, the rate an export's placement is budgeted at too — run in resumable steps of one
  decision (§8.9, §9.2); a tile's label composition ≤ 3 ms at ≤ 150 glyph runs (measurement and fallback: §8.9).
* **Trees:** placement ≤ 1 µs per instance (stamp, scale, rounding and point-in-polygon) and drawing ≤ 2 µs per instance
  as a sprite (§8.10). A district-band view with 10 000 visible trees composes in one 16 ms frame from cached tiles, and
  its tiles raster in ≤ 30 ms of tile-worker time (O19 e); the 200 000 trees of a METROPOLIS are never all instantiated —
  only visible tiles generate instances. The stamp-tile asset (§8.10) is loaded and hash-checked at worker start in
  ≤ 5 ms per worker per session, never on a settle (≈ 0.03–0.06 ms for 8–16 classes, measured cost model,
  `fixall_rendering_r4_stamptiles.out`); nothing is sampled or ranked at run time, so the first zoom to the district band
  carries no library build. **The crown library:** its build (20 crowns per class per style, once per session) and, in
  `lit` with a `path` sun, each light step's bake run in the tile worker as one-sprite units (§8.9), ≤ 20 ms of
  tile-worker time per (style, light step) for eight crown classes (PLAUSIBLE: ≈ 20–60 µs per sprite on Canvas2D,
  ≈ 3–10 ms for 160 sprites), started when the style loads so the first district-band raster finds it ready; a light
  step's bake runs at the head of §8.4's light pass, inside its settle bound. Measured with M2b's moving-sun runs (§8.4),
  where `lit` ships; pre-decided fallback: §8.4's (with a `path` sun the lit programs and the crowns hold the sheet's fixed
  sun, so the library is baked once), reported.
* **SVG** at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for
  837–1 512 buildings, 6.3 MB for 15 392) plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB per distinct
  glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face, checked against the bundled files) (N-13) — and
  ≤ 60 000 elements, written in ≤ 2 s in the generation worker: the transient list's build (≈ 4 µs per building,
  ≈ 54 ms at the METROPOLIS target), S13b at the export stop (≤ 2 ms per 2 000 candidates) and the writing, with the list
  released after it (§11.1). Inkscape opens it within §11.1's CI bound.
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
* **Confirmation of the export budgets (N-27 c).** The SVG and PNG budgets are measured at M1 on B-CITY-lite's TOWN and
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
* **Export beside the view.** B-CITY's browser run at M1 adds, in §12.1's timing phase, a scripted pan and zoom during an
  A2 300-dpi export of a CITY, and a `lit` export of a CITY while a `path` sun advances one step per frame — pass: every
  settle within §12.5's bound, the export completes, and its PNG matches, byte for byte, the export made with the view
  idle, one during which an edit is made (§8.9, §11.1) and, for the `lit` export, the export made with the sun stopped at
  the request's time; pre-decided fallback: §8.9's `step(4)`.
* **The stamp-tile load** is timed with the first map at M1, per worker from worker start to the library ready;
  pre-decided fallback on a miss: the per-session hash check moves to CI and the release build, leaving typed-array views
  over the bundled bytes.
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (≤ 3 µs per plot
  median, §3.7); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median and its registration
  re-declares S11's row of §12.4 by the measured difference (§2.6, §3.7); `compose()` ≤ 1 ms per building median at
  `wings`, in the derivation pool on the tile's band request (§8.6, §8.9), one tile's compositions within 16 ms of pool
  time, amortised (a tile draws the outline until its compositions arrive).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker, with a cost-model
  test (§13.2); never on the one-click path.

### 12.8 Memory (what is counted, per rung)

Counted: the JS heap, typed arrays and WebAssembly memory of every thread (generation worker, pool, tile worker, main),
with canvas backing stores budgeted separately by §8.8's canvas budget, which depends on the viewport, not the rung.
**Model working set, all threads, excluding canvases:** TOWN ≤ 40 MB, CITY ≤ 110 MB, METROPOLIS ≤ 260 MB.

What each thread holds is §8.9's (the tile worker holds no model) and §8.1 item 6's (the display list, ≈ 10 MB at CITY,
in the tile worker; the 24-B-per-mark index, ≈ 1.4 MB at CITY, in the generation worker); the tile worker also holds the
decoration memo and the placement memo, its glyph atlases and crown sprites being canvases; the derivation pool holds its
per-worker overlays (§4.1) and the on-demand `compose()` and close-up caches (§8.6). The lines assume one kernel arena per
layer (≈ 20 MB at CITY with its typed lookup tables, its spatial index and the index's home column, §2.2; PLAUSIBLE until
M1) plus one frozen arena copy per pool worker (≤ ≈ 15 MB each at CITY at the one-click freeze, ≈ 20 MB at a freeze after
edits; ≈ 37 MB at METROPOLIS) and each district overlay until it merges (§3.3), the compact entity store and the scoped
undo records of §2 and §7.4 (SCL-5), people derived on demand, tree instances never stored, and the display list at
≈ 11.4 MB at CITY across the two threads that hold any of it. The pool's frozen arena copies are ≈ 45 MB at CITY with
three workers at the one-click freeze and ≈ 60 MB at a freeze after edits (typed tables; `Map`-based tables would cost
each worker more heap and ≈ 10–20 ms of rebuild). While a loaded document is verified, one pool worker holds the replay's
model in place of the frozen copies (no frozen copy is made then, §4.1), its arena and entity columns about the copies'
size — or, with pool size 0, the generation worker holds it beside the working state (§2.9 step 3). **M2a's memory
measurement** (the milestone that builds the log and load verification over M1's document format, §16) includes the load
verification of the reference 300-edit CITY document with a district regeneration and a Re-derive from S3 made during
it; the load's digest trees (the model tree ≈ 1 MB and the records tree ≈ 0.25 MB at CITY, §6.2) sit in the entity-store
line, and a bridged client that took the replayed town keeps the `doc.load` bytes (≤ 3 MB at CITY) until the mismatch is
settled (§2.9 step 4). The lines stay PLAUSIBLE until M1 (generated towns at TOWN and CITY), M2a (that load-verification
case at CITY) and M2b (METROPOLIS) measure them, with the steps below as their pre-decided fallbacks.

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
in `lit` with a `path` sun, the crown set it holds until it completes (§8.9), counted with the canvases below. Measured
with the export budgets (M1 TOWN and CITY, M2b METROPOLIS, §12.7) — pass: within the stated figure + 25 %. Pre-decided
fallback: the transient list is built with only the attribute columns the sheet's programs read at the export band, for
every export that draws (the attribute columns are up to ≈ 2.4 of the ≈ 10 MB at CITY, §8.1 item 6), the figure is
re-stated at the new measurement, and the export dialog's size estimate uses it.

**Canvases during a raster export.** The view's need is §8.8's (3P + 7 MB; the reference view 112 MB, the low-end device
43 or 67 MB). A raster export's ≈ 15 MB of band and tile canvases, and its held crown set where it holds one, count on top
of that need: the reference view on the mid tier (112 + 15 ≤ 128 MB) and the low-end 1 366 × 768 view (43 + 15 ≤ 72 MB)
hold both; where the sum passes the tier's ceiling — the low tier at 1 920 × 1 080 (67 + 15 > 72 MB) — the coarser-stop
fallback set is dropped for the export's duration (the need falls to 2P + 7 MB: 47 + 15 = 62 MB), and the export dialog
refuses a width whose band does not fit beside the reduced need, naming the widest that does.

**Measurement and fallback.** Measured per rung in B-CITY's browser runs at M1 (TOWN, CITY) and M2b (METROPOLIS), and at
M2a on the reference 300-edit CITY document under load verification (§16). Pre-decided fallback if CITY exceeds its line
at M1 or M2a: the provenance and lifecycle-history columns leave the working set for the document's on-demand block
(SCL-20's archive) and are decoded only when inspected; if the line is still exceeded at a freeze after edits, that
freeze makes the laziness-contract copy of §3.3 step 1 — L0–L2, every L3 partition, and only the L4 partitions of the
districts the pool derives; if the line is still exceeded, the pool shrinks by one worker per step (identical digests by
construction, §3.3) and the memory test re-runs. If a tier's canvases exceed its ceiling in the scripted pan and zoom
runs, its coarser-stop fallback set is dropped (the need falls to 2P + 7 MB) and a gesture shows the next coarser cached
tiles only where they remain. The document's size budget is §2.9's.

### 12.9 Reference comparisons and the declared trade

* **MFCG at matched building counts** (§12.2): model time 1.8× (TOWN), 2.3× (CITY) and 5.1× (METROPOLIS) MFCG's
  generation (§12.3's table); time to first map, by §12.5's laws at MFCG's counts, ≈ 2× MFCG's generation plus canvas
  replay at TOWN and CITY (143 ms against 73–79 ms at 1 475 buildings; 374 ms against 189–210 ms at 5 242; MFCG's replay
  ≈ 11–15 µs per building, from its size-80 profile) and ≈ 3× at METROPOLIS (932 ms against 300–352 ms at 13 091); at
  MFCG's size-200 stress count (31 951 buildings, 236 ms plus replay) PLAT's law gives ≈ 2.1 s, ≈ 3–3.6×.
* **FTG (NF-S7).** The side-by-side sizes are FTG's BIG_TOWN and BIG_CITY, from M-1's free captures (§13.6, D-31), and
  METROPOLIS per D-31. The timed capture so far is FTG's CITY preset (9 500 people, 2 798 buildings): the server answers
  in 2.9–3.2 s, the client is building the scene 6.4–7.0 s after the click, and loading a finished settlement costs 2.0 s
  of busy time (ftg-payload-visual, Critic-2 addendum part 2; the 4.6 s "client busy during create" figure is not a time
  to first map). PLAT's first map at that size (the TOWN law at 2 798 buildings) is ≈ 0.24 s, ≈ 27–30× sooner; FTG's
  creator gives ≈ 10 s to render a metropolis (49 500 people) client-side, ≈ 10× PLAT's ≈ 1.0 s at that population. M-1's
  BIG_TOWN and BIG_CITY captures add their timings to §13.5's timing row.
* **Declared trade (MFP-5, N-2).** A per-building cost of ≈ 58–75 µs at p95 (§12.3's laws at 1 333, 5 200 and
  13 460 buildings) is chosen over matching MFCG's 12–39 µs, because PLAT builds what MFCG does not — a heightfield with
  hydrology, frontage-first plots with yards and party walls, site plans with heights, roster siting, greenery by rule and
  collision-checked labels — which D-7 ranks above speed. Its consequences are the two misses declared for the owner's
  veto: model time above §12.3's sizes and the first map above §12.5's knee (O12 (g)). Reversing the trade would mean
  dropping plot and site-plan detail from the one-click path, which the owner's plot-model ruling forbids (J-R17).
