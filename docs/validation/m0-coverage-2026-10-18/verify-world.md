# m0-coverage / verify-world — can M0, as it stands, carry the WORLD level? (the need-by-need table)

**Lane:** m0-coverage/verify-world (opus; J394, Fable-validated). A verifier: one row per primitive, invariant, limit,
record, operator or budget the WORLD level (docs/volumes/V13-world.md: W0–W9, P1–P5, the world document, the port, the
lenses) asks of the kernel or the base, set against M0's scope (plat/docs/build/M0.md), its §4b deferrals, the close
gate (plat/docs/build/M0-world-sites-gate.md; docs/AMENDMENTS-2026-10-16j.md item 140) and the kernel as built. Started
2026-10-18 09:29Z; landed 09:44Z. Every claim carries a cite and is marked **READ** (seen in the text or code at the cite) or
**INFERRED** (my reading across cites, flagged). No git command was run; no Node 24 is on PATH (`/opt/node22/bin/node`
v22.22.0) or in the scratchpad's `m0-coverage/node24`, so **no test was run**: a "tested" cell names a test file read
or listed, and the gate's 20 tests are as their checker recorded them (checks/M0-world-sites-gate.md:21-28).

## Inputs read

| file | lines | md5 (at 09:33Z) | how read |
|---|---|---|---|
| docs/validation/m0-coverage-2026-10-18/read-m0.md | 205 | — | whole |
| docs/validation/m0-coverage-2026-10-18/read-base.md | 392 | — | whole |
| docs/validation/m0-coverage-2026-10-18/read-v13.md | 383 | — | whole |
| docs/validation/m0-coverage-2026-10-18/read-v14.md | 367 | — | whole |
| docs/validation/m0-coverage-2026-10-18/read-kernel.md | 617 | — | whole |
| docs/volumes/V13-world.md | 4465 | d0de9ad8dadfeccc89ac86f2ea4d62f4 (same as read-v13's) | re-read at every passage relied on: :199, :604-613, :995-1007, :1420-1426, :1727-1747, :2196-2201, :2709-2740 (§3.15 (2) the import's extent rule, read for this lane) |
| plat/docs/build/M0.md | 1287 | aedbbcee664af3705dd1cf2acbd66ab4 | §4b whole (:834-877) re-read |
| plat/docs/build/M0-world-sites-gate.md | 45 | b6c5be2a5d89fbd19035a3c606194fb9 | whole |
| plat/docs/build/checks/M0-world-sites-gate.md | 476 | 1e29aadca96f2cfcb96cdbe82c0181ef | K10 (:183-199), K12 (:221-236), M1–M6 (:259-341) re-read |
| docs/AMENDMENTS-2026-10-16j.md | 282 | 5e0f4ad98fb1ef6638dd8155d77db21d | items 140 and 141 (:206-260) whole |
| docs/ARCHITECTURE.md | 24462 | 1f871a01961de8a4994125d7bb1993be | re-read at A:309, A:971, A:3546, A:9703, A:10179, A:18266, A:20916-20922, A:21670, A:21707 |
| plat/packages/kernel/src/adapters/delaunator.ts | 104 | — | whole |
| plat/packages/kernel/src/geom/path.ts | 295 | — | whole |
| plat/packages/kernel/src/geom/heap.ts | — | — | :1-40 (the tie rule) |
| plat/packages/kernel/src/num/{frame,snap}.ts | 40 / 19 | — | whole |
| plat/packages/kernel/src/dmath/index.ts | 33 | — | whole |
| plat/packages/kernel/src/noise/index.ts | — | — | :1-120 whole, the exported signatures after |
| plat/packages/kernel/src/index/{index,grid}.ts | — | — | index.ts :1-35; grid.ts :1-44 |
| plat/packages/kernel/src/rng/mixer.ts | — | — | :141-153 (packComponents' checks) |
| plat/packages/site/src/hydro/{field,flood}.ts | 155 / 159 | — | whole |
| plat/packages/site/src/terrain/range.ts | 88 | — | whole |
| plat/packages/site/src/terrain/strategy.ts | — | — | :28-52 (`siteFrame`) |
| plat/packages/model/src/identity/lineage.ts | — | — | :57-100, :125-135 |
| plat/packages/model/src/stage/decl.ts | — | — | :95-107 |
| plat/packages/model/src/records/site.ts | — | — | :23-31 (`HydroGrid`) |
| plat/packages/tables/src/workLimits/counters.ts | — | — | :12-35 |
| plat/docs/build/summaries/M0-e-06.json, M0-d-06.json | — | — | `pass`, `verdicts`, `seeds`; leg statuses (script) |
| kernel/test/medial/delaunay.test.ts | — | — | :43-130 (cases and coordinate ranges) |
| kernel/test/geom/path.test.ts, kernel/test/noise/fbm.test.ts | — | — | case titles |

## Method — what each status means here

- **SUPPORTED-NOW**: M0 (its spec, the gate or a built item) holds the piece, it is in the code, and a test (or, for a
  gate row the gate verified by reading, that reading) pins it.
- **SPEC-NOT-YET-BUILT**: in M0's scope, not landed or mid-flight; the item or round is named.
- **AFTER-M-1-BY-DESIGN** (the label as the task names it — "M0 defers it on purpose"): M0 leaves it to M1 or a world
  milestone by a text — a §4b row, the gate's rule that a model row "is recorded now and is M1's to change"
  (M0-world-sites-gate.md:6-7, READ), or the base's own build plan placing it at M1's API pass or at M-W0h / M-W0 – M-W5
  (A:309, A:21670, READ) together with M0's rule that it builds no volume ("the volumes a milestone builds (M0: none)",
  M0.md:70-72 per read-m0 A6, READ there). **§4b names no world row** (read-m0 A34, INFERRED there from §4b read whole;
  confirmed: §4b :834-877 re-read, no row names V13, the world, a placement or a charter — READ), so most world rows
  rest on the gate's rule or the base's build plan, and the cell says which.
- **CARRIED-TO-M1**: one of the five gate rows the checker carried (K10, K12, M1, M2, M4; checks/M0-world-sites-gate.md:30-34, READ via read-m0 B8).
- **MISSING** / **FORECLOSED**: as the task defines them; a foreclosure is claimed only with the exact limit and the
  exact need in numbers or types.

## The need-by-need table (the WORLD level)

### A. Raster and hydrology primitives

| # | need (and its cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| W-01 | An Int32 cm DEM written through a range check that clamps to ± the size row's relief limit and reports `W_HEIGHT_CLAMPED`; the limit is 6 000 / 8 000 / 10 000 m by rung (V13:997-999, :1445-1446, READ) | M0-e-01 builds the height raster "Int32 cm above datumCm; reliefLimitCm 10 km … clamps and reports W_HEIGHT_CLAMPED" (M0-work.json M0-e-01, per read-m0 C20, READ there); C-0251: the range check is `@plat/site`'s one door (choices.md:260, per read-m0 E9) | `heightWriter(heights, limitCm)` accepts any integer limit 1 … 2³¹ − 1 and clamps to ± it (site/src/terrain/range.ts:53-70, :77-88, READ); the continent's 1 000 000 cm is inside (INFERRED, arithmetic) | site/test/terrain/range.test.ts (listed); M0-e-06's `noClamp` verdict `pass` (summaries/M0-e-06.json `verdicts`, READ) | **SUPPORTED-NOW** |
| W-02 | The base's priority flood with exact flats run unchanged at the world cell size (V13:1474-1478, :1539-1547, READ) over 1.02 M / 4.1 M / 9.2 M fine cells (V13:1006, READ) and ± 10 km of relief | M0-e-02: hydrology and rivers by descent (M0.md:562-570 per read-m0 A27) | bucket-queue flood, one bucket per cm between the lowest and highest height (`new Uint32Array(hi − lo + 1)`, flood.ts:56-65, READ): at ± 1 000 000 cm that is ≤ 2 000 001 buckets, 8 MB; cells linked through `Uint32Array(n)` with `NONE = 0xffffffff` (flood.ts:43, :66, READ), so n ≤ 4 294 967 294 cells — 9.2 M is inside (INFERRED, arithmetic). Time at world scale unmeasured: the base measured 25.3–26.5 ms at METROPOLIS's 160 000 cells (A:1013-1024, per read-base 44); ×57.6 cells gives ≈ 1.5 s against W4's 1 800 ms continent row (V13:3451-3462 per read-v13 F209) — INFERRED, linear scaling assumed | site/test/hydro/pipeline.test.ts, relief-bar.test.ts (listed); M0-e-06 `d8` and `bedMonotone` `pass` on 8 of the 200 seeds the item asks (summaries/M0-e-06.json `seeds` {first 1, count 8}, READ) | **SUPPORTED-NOW** (the mechanism; its world-scale time PLAUSIBLE) |
| W-03 | Flood seeds other than the grid border: W2 seeds the ocean cells (V13:1474, READ via read-v13 F119); a charter frame seeds its border at `downstreamHeadCm` except at the `in` crossings (V13:2504-2511 per read-v13 F179) | not in M0 (S1's own edge rule) | `priorityFlood(grid, lakeThresholdCm)` seeds every border cell at its own height and nothing else (flood.ts:49, :70-80, READ); a head below the field's minimum would index the bucket array below 0 (flood.ts:56-65, :76, READ) | — | **AFTER-M-1-BY-DESIGN** (the lift at M-W0h, A:20916, READ; the charter's reading at M-W1, A:5920-5921 per read-base 254). Not foreclosed: a seed-list parameter with `lo := min(lo, heads)` (INFERRED from flood.ts:56-80) |
| W-04 | Two-gradient flat resolution, D8 in the fixed order E, NE, N, NW, W, SW, S, SE, accumulation, at world scale (V13:1543-1551 per read-v13 F127-F128) | M0-e-02; the bar "D8 defined on 100 % of the hydrology grid's land cells" (M0.md:240-243 per read-m0 A15) | the D8 codes are the tie order (field.ts:8-12, :19-24, READ); `flatRank` and `flowAccum` are `Uint32Array` (field.ts:32-47, READ) — counts to 4.29 × 10⁹, above 9.2 M (INFERRED); `resolveFlats`, `d8`, `accumulate` exported (flats.ts:51, d8.ts:61, :95 per read-kernel's export list, READ there) | M0-e-06 `d8` `pass` (READ, as W-02) | **SUPPORTED-NOW** |
| W-05 | The hydro core (field, flood, flats, D8, accumulation) lifted into `@plat/world/hydro` "with their tests, the same names", `@plat/site` then depending on `@plat/world` (BCR-V13-1; V13:498, :3906-3915 per read-v13 F26, F225) | M0's chain is `kernel ← model ← tables ← {site} ← layout` (M0.md:790-794 per read-m0 A31); no `world` package (M0.md:751-773 per read-m0 A30) | the core imports `ratio` from `@plat/kernel`, `Cm`/`HydroGrid`/`PointCm`/`Terrain` from `@plat/model`, and `../terrain/range.js` and `../terrain/sampler.js` (field.ts:13-17, READ; flood.ts:14, READ); `fieldOf(grid, heights, limit)` is a raw-height entry needing no `Terrain` (field.ts:147-154, READ); `HydroGrid` is `{ cellCm; cols; rows; originX; originY }` with no rung type (model/src/records/site.ts:23-31, READ) | — | **AFTER-M-1-BY-DESIGN** ("the hydro lift at M-W0h", A:20916, READ). Not foreclosed; note N3: the lift also needs the range check's `heightWriter`, which BCR-V13-1's list does not name (INFERRED from field.ts:15, flood.ts:14) |
| W-06 | The hydrology code that is lifted is the hardened one: the S1 terrain and hydrology hardening rounds | M0's hardening phase (PROGRESS:449, J390, per read-m0 F7) | rounds `e-01 s1` (wip/child-e01s1, "held") and `e-02 s1` (wip/child-e02s1) stopped at CHECKPOINT lines on 2026-10-14, branches unchanged (PROGRESS:449 per read-m0 F7, read-kernel I1, I5: e-01 s1 6 notes, L27 (a); e-02 s1 8 notes, L27 (b)) | — | **SPEC-NOT-YET-BUILT** (rounds e-01 s1 and e-02 s1; J391 (3): the resume waits for the owner's word, PROGRESS:450 per read-m0 F9) |
| W-07 | The carve's delta kept (`carveDeltaCm`, sparse; item 140 M2) so the pre-carve height is recoverable (V13:665, :1553-1558; BCR-V13-2 V13:3916-3926, per read-v13 F53, F129, F227) | gate M2 (M0-world-sites-gate.md:36, READ) | `carveCourse` writes in place and returns a count; the pre-carve heights are not kept (checks/M0-world-sites-gate.md:280-296, READ) | gate reading | **CARRIED-TO-M1** (smallest addition `CarveResult.before`, checks :294-296, READ) |
| W-08 | Water surfaces as records separate from the ground (`WaterSurface`, item 140 M2) (V13:683-686 per read-v13 F55) | gate M2's second half (M0-world-sites-gate.md:36, READ) | separable today: the river's surface its own array, the flood's surface its own array, `WaterBody.depthCm` on the record (checks/M0-world-sites-gate.md:286-290, READ) | gate reading (CONFIRMED in part) | **SUPPORTED-NOW** (the separation); the `WaterSurface` record itself is declared at M1's API pass (A:971, READ) |
| W-09 | The water table through one function, `waterTableAt(doc, p, when?)`, and the groundwater field (BCR-V13-3; V13:2513-2523 per read-v13 F180) | gate M4 (M0-world-sites-gate.md:38, READ) | no function; the stand-in `LOW_BAND_M` is read inline (checks/M0-world-sites-gate.md:310-317, READ) | gate reading | **CARRIED-TO-M1** |
| W-10 | The datum read through one accessor, `datumOf(doc)` — a derived reading on a placed frame (V13:899-908 per read-v13 F64; A:962 per read-base 33) | gate M3 (M0-world-sites-gate.md:37, READ) | `Terrain.datumCm` written once, read by no other code (checks/M0-world-sites-gate.md:298-308, READ) | gate reading (PLAUSIBLE) | **AFTER-M-1-BY-DESIGN** (a model row "is M1's to change", M0-world-sites-gate.md:6-7, READ; "Nothing forecloses; smallest addition (M1 …)", checks :306-308, READ) |
| W-11 | The frame's terrain and hydrology records readable by the world (P2 re-bases the frame's DEM into the world's; P4 (8) puts the table on "the frame's hydro grid") (V13:2117-2128, :2140-2170 per read-v13 F153, F155) | M0-m-01: `Terrain`, `HydroGrid`, `TerrainSampler`, `WaterBody`, `Outfall` (M0.md:439-448 per read-m0 A21) | `Terrain` with `datumCm`, `heightCm: Int32Array`, `reliefLimitCm`, `seaLevelCm`, the raster geometry and `HydroGrid` (model/src/records/site.ts:22-77 per read-kernel C2; :23-31 READ) | model tests (folder listed) | **SUPPORTED-NOW** |

### B. Triangulation, path search and the integer-metre range

| # | need (and its cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| W-12 | **The integer-metre range invariant at the continent rung.** W7's Delaunay of the seats "computed by the kernel's deterministic triangulation … over the seats' positions handed to it in integer metres (`originCm ÷ 100`, rounded; the continent rung's far corner at 3.84 × 10⁶ m lies inside §3.2 (1)'s range invariant of 2²³ at every rung)" (V13:1727-1732, READ); "no world coordinate reaches a kernel primitive except as integer metres inside §3.2 (1)'s range invariant" (V13:604-608, READ); a request may give its own extent "inside [0.5, 2] × the row's" (V13:1006-1007, READ; the width and height clamped separately, V13:1424-1425, READ) | M0-a-12 the delaunator adapter (read-kernel B1; delaunator.ts:2, READ); M0-a-01's door refuses `!(Math.abs(v) < 2**23)` (M0-work.json M0-a-01 per read-m0 C6) | `delaunay(points)` refuses any off-lattice coordinate (`offLattice`, delaunator.ts:44-46, geom/common.ts:55-61, READ), merges duplicates (:48-67), hands the library coordinates relative to the bounding-box corner (:75-85, READ). Numbers: the kernel admits \|v\| ≤ 8 388 607 m; the continent row's far corner is 3 840 000 m; at 2 × the row 7 680 000 m — inside, with 708 608 m to spare (INFERRED, arithmetic on V13:999, :1007 and snap.ts:15) | kernel/test/medial/delaunay.test.ts:82-89 refuses 8 388 608 (READ); :119 onward triangulates inputs translated by up to ± 4 × 10⁶ identically (READ); :55-60 collinear sites at 8 × 10⁶ (READ) | **SUPPORTED-NOW** (see note N1 for the import band beyond the largest row) |
| W-13 | World centimetres never reach a kernel predicate (SW-16; V13:604-608, READ) | §3.2 (1), (7): the kernel's one door (A:4365-4374, A:4409-4413 per read-base 77, 82) | every geometry service refuses an off-lattice coordinate as `E_OUT_OF_RANGE` (geom/common.ts:55-61, READ; snap.ts:13-18, READ), so a world cm value ≥ 2²³ handed by mistake is refused, never wrapped (INFERRED) | delaunay.test.ts:82-89 (READ) | **SUPPORTED-NOW** |
| W-14 | Deterministic path search for W7's routes and the trails: "each edge is one A* run … integer costs — the cost × 1 000 rounded — … ties by (f, cell index), so deterministic", "one Dijkstra to the route set" (V13:1737-1750, READ); "every Dijkstra and flood keyed on (cost × 1 000 rounded, cell index)" (V13:2806-2809 per read-v13 F200); §1.1 names "`@plat/kernel`'s `delaunay` and path search (§3.1)" for W7 (V13:199, READ) | M0-a-10: path search (path.ts:4, READ) | `astar` / `dijkstra` / `dijkstraTree` over a `SearchGraph` or a `CostRaster` (path.ts:17-40, :234-275, READ); the heap breaks ties by the smaller item (= node id = cell index on a raster), whatever the push order (heap.ts:1-4, :28-33, READ); a distance is replaced only by a strictly smaller one, edges relaxed in stored order (path.ts:6-9, :167-175, READ); a caller's heuristic is accepted (:244-251, READ); weights are doubles, exact on integers below 2⁵³ (INFERRED) | kernel/test/geom/path.test.ts:46 ("ties by the smaller item, whatever the push order"), :72 (brute-force reference on 10³ graphs), :136 (rasters) (titles READ) | **SUPPORTED-NOW** (see note N2: V13:1738 names "the lifted bucket queue" instead) |
| W-15 | The kernel's `index` among the five kernel parts the world calls (V13:611-613, READ) — V13 names no use for it | M0-a-03 the spatial index (index/index.ts:1-4, READ) | the public index is per arena (`attachIndex`, read-kernel B21); the generic `createGrid(cellCm)`'s type is marked kernel-internal (grid.ts:27, :39-44, READ); its cells are packed with a 2²⁴ offset and 2²⁵ stride (grid.ts:14-16, READ), so world cm up to 7.68 × 10⁸ fit at any cell ≥ 46 cm (INFERRED, 7.68 × 10⁸ ÷ 2²⁴ = 45.8) | kernel/test/index (folder listed) | **SUPPORTED-NOW** (as far as a need is stated; note N6) |
| W-16 | The kernel's edge index over L0–L3 on the frame, for the flood spread's barriers (V13:2529-2540 per read-v13 F181) | M0-a-03 | static partitions per level plus the dynamic grid (index/spatial.ts:1-14 per read-kernel B21); `query`, `segmentMeetsBox`, `pointLocate` exported (index/index.ts:67 per this lane's grep, READ) | kernel/test/index (listed) | **SUPPORTED-NOW** |
| W-17 | The kernel's `hull` for W9's level-2 glyph outline, frame side (V13:2036 per read-v13 F261) | M0 (a) "OBB / hull / LIR" (M0.md:125-130 per read-m0 A9) | `hull` in the geometry services (API.md:706-756 per read-kernel A25) | kernel/test/geom/hull-obb.test.ts (listed) | **SUPPORTED-NOW** |

### C. Determinism primitives and registries

| # | need (and its cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| W-18 | "Every floating operation goes through the kernel's `dmath`" (V13:2806-2807 per read-v13 F200): sine and cosine for the placement transform (V13:614-618, READ via read-v13 F46) and W3's seasons (V13:1510-1515), a real power for W4's hydraulic geometry w = a·Q^b (V13:1564 per read-v13 F130) | M0-d-03 dmath (dmath/index.ts:1, READ) | `pow`, `log`, `exp`, `sin`, `cos`, `atan2`, `atan` — fdlibm 5.3 to the bit (dmath/index.ts:8-33, READ); "Not ported yet: asin, acos, tan, log1p, expm1 … each when a reader lands" (:6-7, READ) — no V13 passage this lane read asks for one of those (INFERRED, the passages above) | kernel/test/dmath/kat.test.ts with vectors for arm64 and x86-64 (listed; dmath/index.ts:3, READ) | **SUPPORTED-NOW** |
| W-19 | Noise at a world position in metres, 2–8 octaves (W1's `noise` op, V13:1460, READ) | M0-e-01's noise module (noise/index.ts:1, READ) | `noiseStream(stream, shape, octaves)` with `MAX_NOISE_OCTAVES = 16` (noise/index.ts:27, :85-108, READ); a sample is a function of the stream's state and the point alone (:9-10, READ), sampled by `fbm(x, y, octaves, stream)` at any double (exported signature, READ) | kernel/test/noise/fbm.test.ts (titles READ: byte-identical runs, pinned SHA-256 sample, octave refusal outside 1 … 16) | **SUPPORTED-NOW** (note N8 on the two texts of W1's noise) |
| W-20 | Fixed-key draws and structured keys through the one mixer; position-keyed values as the low 64 bits of `H128` over (op seed, cell x, cell y) (V13:2793-2809 per read-v13 F196-F200); `surfaceSetDigest` = low 64 bits of `H128` over the surfaces in force (V13:1306-1308 per read-v13 F93) | M0-d-01/02 RNG and hashing (read-m0 A13) | `H128`, `murmur128`, `LaneWriter` exported (hash/index.ts:4-8, READ); stream components packed as stage u16, concern u16, reroll u16, salt u16, epoch u32, attempt u8 (mixer.ts:7-14, :141-153, READ) | kernel/test/rng/kat.test.ts, kernel/test/hash/murmur3.test.ts (listed) | **SUPPORTED-NOW** |
| W-21 | BCR-V13-35: entropy "in [1, 32 767] for the reroll and [1, 65 534] for the salt, the ranges the kernel packs"; "The kernel is unchanged" (V13:4208-4213 per read-v13 F254) | the stream key (M0-d-01) | reroll and salt each refused unless u16 (mixer.ts:149-153, READ; lineage.ts:77 for the lineage reroll, READ) — both ranges lie inside 0 … 65 535 (INFERRED) | rng KAT (listed) | **SUPPORTED-NOW** |
| W-22 | Stage ids `W0` … `W9` (with `W6a`, `W6b`, `W7a`, `W7b`, `W8a`, `W8b`), `WORLD_PLACE`, `WORLD_CASCADE`; concerns `world.recipe`, `world.climate`, `world.resources`, `world.siting`, `world.polity`, `world.patrol`, `place.search`; `water.delta` and `naming` gaining readers (BCR-V13-8; V13:3973-3988 per read-v13 F233) | gate K6 (M0-world-sites-gate.md:22, READ) | the stage registry has 25 rows, append-only, ids u16 never renumbered (stages.json:2 per read-kernel B26, B28); a stream on an unregistered stage or concern is refused (mixer.ts:142, READ); stage rank u8, 0 … 255 (read-kernel B7): 25 + 18 world ids = 43 rows (INFERRED, counting BCR-V13-8's list, V13:3973-3988 per read-v13 F233) | kernel/test/gate/registries.test.ts (K6: append keeps every id; a new stream distinct; read-kernel G5) | **AFTER-M-1-BY-DESIGN** (the rows "appended at M1's API pass (K6; file k item 615)", A:10179, READ); the append mechanism SUPPORTED-NOW by the K6 test |
| W-23 | "A world generated twice from one `Recipe.world` on every §13.2 platform is byte-identical per stage" (T-V13-1; V13:2809-2811, :3545 per read-v13 F201, F216) — resting on the five engines agreeing on `dmath`, the mixer and integer arithmetic | M0 (d): the cross-host harness over Node arm64, Node x64/Rosetta, Chromium, Firefox, WebKit, workers on/off, 100 seeds (M0.md:215-225 per read-m0 A13); §16's exit "digests identical across the five engines on 100 seeds" (A:21686 per read-base 277) | M0-d-06: 2 legs ran, 8 blocked, `verdict` incomplete (summaries/M0-d-06.json leg statuses, READ; read-m0 D6); M0-d-09: 2 seeds of 100 (read-m0 D7) | the KAT vectors of both architectures hold `dmath` and the RNG (W-18, W-20) | **SPEC-NOT-YET-BUILT** (M0-d-06 and M0-d-09's cross-host bars; the Mac-only steps sequenced after pass B, J391 (5), PROGRESS:450 per read-m0 F9) |
| W-24 | The §6.5 (3) Math lint and the comparator lint over `@plat/world` (V13:2805-2806; T-V13-32 V13:3554, per read-v13 F199, F223) | M0's lint: model-package Math allowlist, `**`, `Math.random`, `Date` … forbidden (M0.md:804-816 per read-m0 A32) | the lint over the model packages (kernel/test/dmath/lint.test.ts listed); "enforced by a lint rule in the host project" (API.md:276-277 per read-kernel A15) | dmath/lint.test.ts (listed) | **SUPPORTED-NOW** (a new package joins the list; INFERRED) |
| W-25 | Work limits "as laws over the extent's cell counts (§5.1 (5): the unit `frameCells` reads the fine or coarse grid)" (V13:1385-1386, :2812-2818 per read-v13 F102, F202) | M0 §2.2's counters; "A counter an item needs beyond these is a new row" (M0.md:618-624 per read-m0 A29) | `WORK_UNITS` includes `'frameCells'` (tables/src/workLimits/counters.ts:15-25, READ); the world's counters are new rows (INFERRED from M0.md:618-624) | tables/test/workLimits (folder listed) | **SUPPORTED-NOW** (the unit; the world's rows land with its stages) |

### D. The frame, the charter and placement

| # | need (and its cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| W-26 | The frame purely local, centred on (0, 0), +y north, so `toWorld(pl, p) = pl.originCm + R(pl.bearingCdeg) · M(pl.mirrored) · p` maps it (V13:614-618 per read-v13 F46) | gate K3 (M0-world-sites-gate.md:19, READ) | `Frame { widthCm, heightCm, aspect, marginShare }`, centred on (0, 0) with +y north (frame.ts:9-24, READ) | gate K3 CONFIRMED by reading (checks :90-98 per read-m0 B11) | **SUPPORTED-NOW** |
| W-27 | Many placed frames beside one world, each its own document and arenas, a mirror or move never changing a frame's arenas (V13:1408-1414, :2267-2273, :2471-2483 per read-v13 F106, F165, F175) | gate K2, K8 | parts and frames independent per `PlatKey` (read-kernel G4) | kernel/test/gate/parts.test.ts (K2/K8: ground/0, ground/7, underground/3 over their own frames, encode/decode byte for byte) | **SUPPORTED-NOW** |
| W-28 | "A placement is in the world's digest and in no arena's" (bar 3; T-V13-2; V13:1294-1305 per read-v13 F92) | gate M6, kernel half (M0-world-sites-gate.md:40, READ) | the arena digest is a function of layer code, part, level and lattice content only (levelDigest.ts:772, as checks :334-336 cite it, READ) | gate M6 CONFIRMED (kernel) by reading (checks :332-341, READ); parts.test.ts pins per-arena digests (read-kernel G4) | **SUPPORTED-NOW** |
| W-29 | A `Placement` record per placed arena set, in the world document (item 140 M6; V13:739-740 per read-v13 F58) | gate M6, model half | record kinds a closed table whose registry "is M1's" (checks :336-341, READ) | gate reading (PLAUSIBLE) | **AFTER-M-1-BY-DESIGN** (gate spec :6-7; "reservable at M1", checks :339-341, READ) |
| W-30 | S0's size step `frameOf(size, aspect)` "a pure table reading callable without a document" (BCR-V13-4; V13:2075-2087 per read-v13 F150) | M0-a-01 `frameOf`; M0-e-01 `siteFrame` | `frameOf(areaM2, aspect, marginShare)` pure (frame.ts:25-40, READ); `siteFrame(size, rung, tables)` reads only the ladder table and the request, no document (strategy.ts:34-47, READ) | kernel num tests (folder listed) | **SUPPORTED-NOW** (INFERRED that `siteFrame` is the "pure table reading" BCR-V13-4 names) |
| W-31 | P4's charter edges: stations every `stationCm` "along the arena's outer ring", each mapped by `toWorld` (V13:2140-2170 per read-v13 F155) | the kernel's read services | `sampleBoundary`, `faceRings` among the geometry services (API.md:706-756 per read-kernel A25) | kernel/test/geom/boundary.test.ts (listed) | **SUPPORTED-NOW** |
| W-32 | The charter as S1's one input record (item 140 M5; BCR-V13-4; V13:3933-3940 per read-v13 F229) | gate M5 (M0-world-sites-gate.md:39, READ) | one authored record, three entry points (checks :319-330, READ) | gate reading (PLAUSIBLE) | **AFTER-M-1-BY-DESIGN** ("Smallest addition (M1, M0-x-04's registration)", checks :328-330, READ) |
| W-33 | S1 under a charter: the field blended to `charter.edges`, `datumCm` from the charter, the flood's border head, inflow seeding `seedCells = round(Q ÷ r_cell)`, and the fBm "position-keyed on the world" (BCR-V13-4, BCR-V13-29; V13:2212-2232, :4154-4162 per read-v13 F160-F161, F250) | not in M0 (S1 (1), (3) at their basic forms, C-0048) | S1's noise is the town root's `terrain.noise` stream (noise/index.ts:6-7, READ; site/src/terrain/strategy.ts:1-2, READ); the flood seeds the border at its own heights (W-03) | — | **AFTER-M-1-BY-DESIGN** ("the charter's reading lands at M-W1", A:5920-5921 per read-base 254; T-V13-13's two-frame fixture "expected-fail until this rule lands at M-W1", A:10163 per read-base 258). Not foreclosed: a stream keyed by the world root and sampled at `toWorld(p)` gives one field across frames (INFERRED from noise/index.ts:9-10, :85-108) |
| W-34 | **The transient `charterFor`**: `charterFor(world, pl: Placement \| TransientPlacement)` with `TransientPlacement { originCm: WorldPointCm; bearingCdeg: 0; mirrored: false; frame: { widthCm; heightCm; marginCm } }`, writing nothing — "a view read" — for V14's 100 m crop frame, ≤ 10 ms (`WORLD-9`) (V13:2196-2201, READ; V13:3482-3492 per read-v13 F212) | not in M0 (world code) | world code; the kernel parts it reads are `dmath` (W-18) and the frame's locality (W-26); `frameOf` admits a 100 m frame (no lower bound but a positive area, frame.ts:26-28, READ) | — | **AFTER-M-1-BY-DESIGN** (the world at M-W1, A:309, READ; WORLD-9's row, A:18429-18438 per read-base 240). Note: its `frame` is V13's own `{ widthCm; heightCm; marginCm }`, not the kernel's `Frame` (frame.ts:9-16, READ) |
| W-35 | **Placement operators as §7.3 local operators**: P1–P5 "§7.3 local operators of the placement edits, run by those edits' folds and by nothing else — never by `generate` or a Re-derive"; one stage id `WORLD_PLACE` (V13:1377-1381 per read-v13 F100); the locality table's placement row (BCR-V13-10; A:11717 per read-base 219) | §4b: "`RH32` (§8.1), rendering, labels, exports, edits → M1 – M3a, hook —" (M0.md:861, READ) | the runner builds scope `all` only; "a scoped re-derivation is the edit log's (M2a)" (layout/src/pipeline/runner.ts:1-29 per read-kernel E4) | — | **AFTER-M-1-BY-DESIGN** (§4b M0.md:861; the placement row at M-W1, A:11717). The kernel part — P1–P5 write no arena (V13:1408-1414) — is W-28 |
| W-36 | `worldWins`: the frame's Re-derive from S1 with §6.3's carry-over (V13:2274-2279 per read-v13 F166) | Re-derive is the edit log's (M2a) | refused by name in the runner (runner.ts:1-29 per read-kernel E4) | — | **AFTER-M-1-BY-DESIGN** (§4b M0.md:861) |

### E. The world document beside the settlement frames; identity; the version table and digests

| # | need (and its cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| W-37 | **The world document** — a `Document` of product `world`, its rasters as `fields` chunks, its records in the entities block, a `.plat` container; a frame's `Document.worldRef`, `Recipe.charter` (V13:1313-1319, :910-915 per read-v13 F95, F65; A:3861, A:3894-3895, A:4200 per read-base 54, 59-60, 69) | §4b: "the `.plat` document, `zod` schemas, the unit lint → M1, hook the arena block (C-0037)" (M0.md:844, READ) | the arena block only (M0-a-15 per read-m0 A25); the façade is "doc-less at M0: a map of PlatKey → Plat" (M0-work.json M0-a-16 per read-m0 C12) | — | **AFTER-M-1-BY-DESIGN** (§4b M0.md:844) |
| W-38 | World stages with `txForm: 'records'` — "a stage that writes records and rasters and no arena — never a kernel transaction, so K12's journal does not see it" (BCR-V13-7; V13:1369-1373, :3963-3972 per read-v13 F97, F232; A:9703, READ) | not in M0 | `txForm: 'declared' \| 'callback'` (model/src/stage/decl.ts:104, READ); `budgetMs: Record<Rung, number>` over the settlement rungs (decl.ts:97, READ; Rung at model/src/types/vocabulary.ts:33 per read-kernel C7) | — | **AFTER-M-1-BY-DESIGN** (the world's stages at M-W1, A:309 and A:21670, READ; M0 builds no volume, M0.md:70-72). Not foreclosed: a union widening of an M0 type before any world stage exists (INFERRED) |
| W-39 | The `world` product: `ProductDecl.coordinateRegime: 'frame'\|'world'`, `LadderRouter` routing by `Recipe.product` "never by population" (BCR-V13-7; V13:1376-1377 per read-v13 F99; A:387-388 per read-base 246) | M0-x-02 defers "LadderRouter and the village product → V-M0 / V07" (M0-work.json per read-m0 C27) | `stageOrder(registry, product: 'base' \| 'village')` (layout/src/pipeline/order.ts:147 per read-kernel E5) | — | **AFTER-M-1-BY-DESIGN** (M0-x-02's defer; A:309) |
| W-40 | The address namespace segment, so a world, its frames and its sites never collide (BCR-V13-6; V13:1196-1207 per read-v13 F83) | gate M1 (M0-world-sites-gate.md:35, READ) | the prefix names the arena only; "two documents generated from one seed mint identical lineage hashes and identical addresses" (checks :259-278, READ) | gate reading | **CARRIED-TO-M1** |
| W-41 | World entities' lineage: the world root's creation key `(world, the recipe's seed)` as "the world's town-root equivalent", cell- and key-based creation keys, the lineage units `placement` and `territory` (V13:1211-1231 per read-v13 F84-F85; BCR-V13-28 V13:4139-4153 per read-v13 F249) | M0-d-05 lineage and addresses (read-m0 C15) | the lineage key's ten lanes start with an arena lane — a `Layer` code and a part — and a u16 stage (lineage.ts:57-88, READ); the town root's key is on `GROUND` (lineage.ts:125-135, READ); `mintTownRoot` only, no world-root minting function (read-kernel C8) | model identity tests (folder listed) | **AFTER-M-1-BY-DESIGN** (the world's registry rows "from M-W1", A:3825 per read-base 253; `EntityKind` gaining `placement` and `territory`, A:10602 per read-base 193). Note N4: V13 names no arena lane for an entity that lives on no arena |
| W-42 | **The version table**: "every world document names every version it depends on (item 140 K10)" (V13:1273-1277 per read-v13 F88) | gate K10 (M0-world-sites-gate.md:26, READ) | the chunk header names `FORMAT_VERSION` and `ROLE_REGISTRY_VERSION` only; `ENGINE_VERSION` and the stage registry's version are persisted nowhere (checks :183-199, READ) | gate reading | **CARRIED-TO-M1** (smallest addition: the M1 manifest names them, checks :194-199, READ) |
| W-43 | **The digests**: "The model digest (§6.2) gains a layer node `world` for a world document" (V13:1289-1294 per read-v13 F91) | gate M6's model half (M0-world-sites-gate.md:40, READ) | eleven layer nodes `site … plats`, "no `world`" (model/src/digest/leaf.ts:15-27 as checks :336-338 cite it, READ) | gate reading (PLAUSIBLE) | **AFTER-M-1-BY-DESIGN** (gate spec :6-7; "it moves the model root (every new kind does)", checks :341, READ). Not foreclosed: §4b sends goldens to M1 (M0.md:862, READ), so no signed golden moves (INFERRED) |
| W-44 | Records outside the model digest and inside the records digest: the `ReasonRecord`s (≤ 10⁵ at the continent rung), the charter as a recorded input (V13:789-791, :1294-1305 per read-v13 F62, F92) | M0-d-04: "the kernel's per-level route digests, model tree, records tree" (M0.md:505-507 per read-m0 A26); gate M8 | `DerivationRecord` persisted outside the model digest, inside the records digest (checks :354-361 per read-m0 B29) | gate M8 CONFIRMED (model) by reading | **SUPPORTED-NOW** (the records tree) |
| W-45 | The reason record's inputs "from the kernel's commit journal (K12) for a frame stage that runs a kernel transaction" (V13:780-784 per read-v13 F61) | gate K12 (M0-world-sites-gate.md:28, READ) | `CommitRecord` has no stage, batch scope, concern or reads (checks :221-236, READ; tx/types.ts:99-122 per read-kernel H6) | gate reading | **CARRIED-TO-M1** |
| W-46 | The `ReasonRecord` kind itself, declared once and shared with V14 (item 140 M8; V13:780 per read-v13 F61) | gate M8 | none built | — | **AFTER-M-1-BY-DESIGN** ("reserved at M1's API pass, its frame-side writers from M-W0h", A:3546, READ) |
| W-47 | A placed frame's model digest reading neither `worldRef` nor `Recipe.charter`; `datumOf`, `windOf`, `sunAt` derived readings (T-V13-2; V13:899-908, :1294-1305 per read-v13 F64, F92) | the document and its recipe are M1's (§4b M0.md:844) | the model digest at M0 hashes the eleven layer nodes and no recipe (W-43) | — | **AFTER-M-1-BY-DESIGN** (§4b M0.md:844; W-10 for `datumOf`) |
| W-48 | The world is no `Layer` and no plat arena; the kernel stays two-dimensional; "item 131 (b) rules the world is no plat arena and K13 keeps elevation out of the kernel" (V13:3779, :611-613 per read-v13 F264, F44) | gates K1, K13 (M0-world-sites-gate.md:17, :29, READ) | `Layer = 'underground' \| 'ground' \| 'sky'` (types/ids.ts:14 per read-m0 B9); `'world' as Layer` throws (layers.test.ts per read-kernel G3); `LatticePoint = { x; y }` (read-m0 B21) | kernel/test/gate/layers.test.ts, no-elevation.test.ts (read whole by read-kernel G3, G6) | **SUPPORTED-NOW** |

### F. V13 §6's budgets

| # | need (and its cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| W-49 | One-click world totals re-declared 900 / 3 000 / 7 000 ms (province / realm / continent), W4 180 / 760 / 1 800 ms, W7 60 / 200 / 520 ms (V13:3451-3469 per read-v13 F209-F210); register `WORLD-1` (A:18429 per read-base 240) | none (M0's bars are the kernel's, the fusion gate and the site spike: read-base 242) | — | — | **AFTER-M-1-BY-DESIGN** (`WORLD-1` at M-W4, A:18429-18438 per read-base 240) |
| W-50 | The world document's memory line "≤ 300 MB on the high tier (the `continent` rung refused below it)" (BCR-V13-14; V13:3470-3479 per read-v13 F211; A:18266, READ) | none | the flood's working arrays are 13 B per cell (heights Int32, filled Int32, `next` Uint32, `closed` Uint8; flood.ts:63-67, READ) — 120 MB at 9.2 M cells plus ≤ 8 MB of buckets, inside the line (INFERRED, arithmetic) | — | **AFTER-M-1-BY-DESIGN** (A:18266 "M-W1; file k item 631", READ) |
| W-51 | Placement, edit and view budgets: a placement edit ≤ 250 ms (P1 ≤ 40 ms "360 bearings × the edge ring's 400 stations × 6 terms, integer"), `nearestLawful` ≤ 600 ms, the cascade at a frame ≤ 1.5 × S1's water operator, transient `charterFor` ≤ 10 ms, a score pass ≤ 230 ms (V13:3482-3492, :3509-3523 per read-v13 F212, F215) | none | — | — | **AFTER-M-1-BY-DESIGN** (`WORLD-2` … `WORLD-10`, A:18429-18438 per read-base 240) |
| W-52 | The frame's additions inside S1's row with "§12.3's laws unchanged — C13-09: the constants are not raised": the surface step ≤ 3 ms and the groundwater step ≤ 30 ms at METROPOLIS budgeted inside S1's p95 (V13:3494-3502 per read-v13 F213; A:17951 per read-base 230) — so the room inside S1's measured cost decides whether the world's frame steps fit | M0 (e)'s TIMING "S1 + S4 + S6 ≤ 50 ms at CITY" with R12-5's coarsening switch (M0.md:247-251 per read-m0 A16) | M0-e-06 ran 8 of 200 seeds, contended, every R12-4 row `exceeds: true` (read-m0 D8; `pass: false`, READ); the timing phase M0-t-00 … t-02 has no landed record (read-m0 D1) | — | **SPEC-NOT-YET-BUILT** (the timing phase M0-t-00/01/02 and M0-e-06's 200-seed run) |

### G. The port, the lenses, the verbs and the 2.5D drawables

| # | need (and its cite) | what M0's spec says | built today | gated or tested | STATUS |
|---|---|---|---|---|---|
| W-53 | `WorldPort`, "the base's fifth host door" (BCR-V13-11; V13:2299-2310 per read-v13 F168-F169) — no kernel need: the feed admits integers with a unit and `WorldPointCm`s (V13:2308-2310) | none; the dossier port is M1's (`Identity.dossier` refused until "the M1 dossier port", checks :271-273, READ) | — | — | **AFTER-M-1-BY-DESIGN** (A:309 "the world port" at M-W0 – M-W5, READ) |
| W-54 | The lenses: `LensPlate` in `Document.lensPlates` beside `derived`, outside every digest (BCR-V13-38; V13:472 per read-v13 F39; A:3881 per read-base 58) — no kernel need | none | — | — | **AFTER-M-1-BY-DESIGN** (M-W5 "the lenses, after M-W2", A:309, READ) |
| W-55 | The two verbs `happened` / `alwaysSo` and the cascade as §7.3 local operators over the dirty watersheds with the border pinned (BCR-V13-9, -10; V13:2641-2669 per read-v13 F191-F193; A:11716 per read-base 218) | §4b: edits → M1 – M3a (M0.md:861, READ); S1's water operator → M3a (M0.md:851, READ) | `KernelTx.clearRegion` / `prepared` `notBuilt('M3a')` (notBuilt.ts:55-75 per read-m0 B35) | — | **AFTER-M-1-BY-DESIGN** (§4b M0.md:851, :861; the world's water row at M-W0h, A:11716) |
| W-56 | The world's drawables with their `ZDecl` rows (item 140 M9) and the projection and exaggeration as view state (M11) (V13:3103-3116 per read-v13 F204-F207) | gate M9, M11 (M0-world-sites-gate.md:43, :45, READ) | no projection state; M9's gap list (checks :363-405 per read-m0 B30, B32) | gate reading (PLAUSIBLE) | **AFTER-M-1-BY-DESIGN** (gate spec :6-7; `ZDecl` rows "written at M1's API pass", A:3778 per read-base 252) |


## Counts (56 rows, counted by script over the STATUS column)

| status | rows | which |
|---|---|---|
| SUPPORTED-NOW | 24 | W-01, W-02, W-04, W-08, W-11, W-12, W-13, W-14, W-15, W-16, W-17, W-18, W-19, W-20, W-21, W-24, W-25, W-26, W-27, W-28, W-30, W-31, W-44, W-48 |
| SPEC-NOT-YET-BUILT | 3 | W-06, W-23, W-52 |
| AFTER-M-1-BY-DESIGN | 24 | W-03, W-05, W-10, W-22, W-29, W-32, W-33, W-34, W-35, W-36, W-37, W-38, W-39, W-41, W-43, W-46, W-47, W-49, W-50, W-51, W-53, W-54, W-55, W-56 |
| CARRIED-TO-M1 | 5 | W-07 (M2), W-09 (M4), W-40 (M1), W-42 (K10), W-45 (K12) |
| MISSING | 0 | — |
| FORECLOSED | 0 | — |

## Blockers

**MISSING rows: none. FORECLOSED rows: none.** For each candidate foreclosure the exact limit was set against the
exact need:

| candidate | the limit M0 fixed | the need | verdict |
|---|---|---|---|
| the coordinate range | \|x\|, \|y\| < 2²³ = 8 388 608 in the unit handed in (snap.ts:13-18; delaunator.ts:44-46, READ) | seats in integer metres up to 3 840 000 m (continent row) or 7 680 000 m (2 × the row) (V13:999, :1007, :1424-1425, :1730, READ) | inside, 708 608 m to spare (INFERRED, arithmetic) — not foreclosed; the import band is note N1 |
| the flood's bucket queue | one `Uint32` bucket per cm of relief, `Uint32` cell links with `0xffffffff` reserved (flood.ts:43, :63-66, READ) | ± 10 km of relief, 9.2 M fine cells (V13:999, :1006, READ) | 2 000 001 buckets (8 MB) and 9.2 M ≪ 4 294 967 294 links — not foreclosed (INFERRED) |
| the accumulation and flat counters | `Uint32Array` (field.ts:42, :46, READ) | counts ≤ 9.2 M at continent | not foreclosed |
| the height type and limit | Int32 cm, limit any integer 1 … 2³¹ − 1 (range.ts:77-88, READ) | ± 1 000 000 cm at continent (V13:999) | not foreclosed |
| the stream-key lanes | stage u16, concern u16, reroll u16, salt u16, epoch u32, attempt u8 (mixer.ts:14, :141-153, READ) | 18 new stage ids, 7 concerns (V13:3973-3988), reroll ≤ 32 767, salt ≤ 65 534 (V13:4208-4213) | not foreclosed |
| the stage rank | u8, 0 … 255 (read-kernel B7) | 25 rows today + 18 world ids = 43 (INFERRED); world stages run no kernel transaction, so no rank is read for them (V13:1369-1373) | not foreclosed |
| the noise sampler | ≤ 16 octaves (noise/index.ts:27, READ) | 2 – 8 octaves (V13:1460, READ) | not foreclosed |
| the Layer union | closed, three values (types/ids.ts:14) | the world needs no layer: "the world is no plat arena" (V13:3779 per read-v13 F264) | no need, so nothing to foreclose |
| the frame | a centred rectangle whose arena stays inside 2²³ cm, ≤ ≈ 104.9 km a side at margin 0.3 (frame.ts:35-38, READ; read-kernel B5) | placed frames are settlement frames (METROPOLIS ≈ 8 km a side, read-kernel F2) and V14's 100 m crop; no world-sized frame is asked (V13:611-613) | not foreclosed |
| the model digest's eleven nodes | a closed list (leaf.ts:15-27 per checks :336-338) | a twelfth node `world` (V13:1289-1294) | adding a node moves the model root; §4b holds no golden before M1 (M0.md:862) — not foreclosed (INFERRED) |

**SPEC-NOT-YET-BUILT rows this level depends on.** None of them stops the world's *design*; each is a precondition
of the world's *build*, which the base starts only after M0 closes (M-W0h after M4, M-W0 – M-W5 after M-SF; A:309,
A:21670, READ):

| row | what is mid-flight | why the world needs it | what M0 would need (its own form) |
|---|---|---|---|
| W-06 | hardening rounds e-01 s1 (terrain, 6 notes, "held") and e-02 s1 (hydrology, 8 notes) stopped 2026-10-14 (PROGRESS:449) | BCR-V13-1 lifts the site package's field, flood, flats, D8 and accumulation "with their tests, the same names" (V13:3906-3915): the lifted code should be the hardened code | nothing new: the two rounds land (J391 (3) waits for the owner's word) |
| W-23 | M0-d-06's cross-host legs (2 of 10 ran) and M0-d-09's seeds (2 of 100) (summaries/M0-d-06.json, READ; read-m0 D6-D7) | T-V13-1's "byte-identical per stage on every §13.2 platform" rests on the same engines agreeing on `dmath`, the mixer and integer arithmetic | nothing new: the Mac-only steps run (J391 (5)) and M0 (d)'s bar is met |
| W-52 | the timing phase M0-t-00/01/02 (no landed record) and M0-e-06's 200-seed run (8 seeds, `pass: false`, contended) | V13 fits its frame steps (surface ≤ 3 ms, groundwater ≤ 30 ms at METROPOLIS) inside S1's row without raising §12.3's constants (C13-09; V13:3494-3502); the headroom is unknown until S1 is measured | nothing new: the timing phase runs; if S1 fills its row, V13's own pre-decided change (a D-18 amendment, SP-W5's lazy-first-read fallback) applies (V13:3499-3502 per read-v13 F213) |

**CARRIED-TO-M1 rows the world needs before it starts** (not M0 blockers by the gate's rule, M0-world-sites-gate.md:6-7;
listed so the verdict seat sees them in one place): K10 (W-42, the version table), K12 (W-45, a reason record's inputs
for frame stages), M1 (W-40, the namespace segment), M2 (W-07, the carve delta), M4 (W-09, the water table). Each has
its smallest addition named in the gate check (checks :194-199, :232-236, :272-278, :294-296, :315-317, READ).

## Notes for the verdict seat (text findings; none needs an M0 change)

- **N1 — the import band beyond the largest row (a V13 text edge, not an M0 limit).** V13 says the seats' integer
  metres lie "inside §3.2 (1)'s range invariant of 2²³ at every rung" (V13:1730-1731, READ). The size rows and the 2 ×
  request satisfy it (W-12). But the map import keeps "the declared size" with a coarser fine cell and is "refused
  (`refuse.import.extent`) only when all three are declined or the far corner leaves the int32 lane" (V13:2735-2737,
  READ), and V13 itself cites a 9 270 km imported map (V13:1003, READ). The int32 lane in cm reaches 2 147 483 647 cm =
  21 474 836 m; the kernel refuses ≥ 8 388 608 m (delaunator.ts:44-46 via snap's literal, READ). So for an imported
  world 8 389 – 21 475 km wide, W7's hand-off as written (`originCm ÷ 100` from the south-west corner) would be refused
  `E_OUT_OF_RANGE` (INFERRED, arithmetic). The kernel need not change: centring the seats (an exact integer
  translation, admitted to 16 777 km) or handing them in 10 m units (to 83 886 km) meets it on V13's side (INFERRED).
- **N2 — which path search W7 uses.** V13 §1.1 gives W7 "`@plat/kernel`'s `delaunay` and path search (§3.1)" (V13:199,
  READ); V13 §3.8 (4) runs "the lifted bucket queue with integer costs" (V13:1738, READ). The kernel's heap search already
  meets §3.8's tie rule (W-14). The flood's bucket queue as built is one dense bucket per key unit between the lowest
  and highest key (flood.ts:63-65, READ); keyed on cost × 1 000 over a continent-length edge its span is millions of
  units (INFERRED; V13's route cost is 0.001 per metre at its base, V13:965-968 per read-v13 F75), so "the lifted bucket
  queue" for A* is a V13 design point, not a lift as-is. Also: the kernel search allocates 14 B per raster cell per run
  (path.ts:151-153, :204, READ) — ≈ 129 MB on the whole 9.2 M-cell continent raster — so V13's ellipse confinement means
  handing a cropped `CostRaster` (its `originCm`, path.ts:38-39, READ) (INFERRED).
- **N3 — the lift needs the range check too.** The lifted field and flood import `../terrain/range.js`
  (`heightWriter`) and the field imports `../terrain/sampler.js` (field.ts:15-16, flood.ts:14, READ); BCR-V13-1 and
  A:20916-20922 name field, flood, flats, D8 and accumulation only (READ). INFERRED: the range check (C-0251's one door)
  must move with them or be shared; `fieldOf` (field.ts:147-154) is the entry that needs no `Terrain`.
- **N4 — the arena lane of a world entity's lineage.** The model's lineage key begins with an arena (a `Layer` code and a
  part) and refuses anything else (lineage.ts:57-61, READ); a world entity lives on no arena (V13:611-613). V13 §2.5
  gives the world root's creation key `(world, the recipe's seed)` (V13:1211 per read-v13 F84) and names no arena lane.
  INFERRED: the town root's `GROUND` (lineage.ts:125-135) serves by convention; a sentence in V13 §2.5 would settle it.
- **N5 — the distance transform.** The base lists "the distance transform" among the kernel's built pieces (A:4293-4309
  per read-base 72); M0 (a)'s list does not name one (M0.md:125-130 per read-m0 A9) and no kernel module holds one
  (this lane's grep of kernel/src/geom and arr: none, READ). V13's distance fields are "true Euclidean distance
  transforms (the two-pass method …)" (V13:1593-1596 per read-v13 F132) and V13 asks the kernel only for its five
  parts (V13:611-613): the world builds its own, so no world row rests on it.
- **N6 — the kernel `index`.** V13 lists `index` among the five kernel parts it calls (V13:612, READ) without a use; the
  public index is per arena and the generic grid's type is kernel-internal (W-15).
- **N7 — the kernel `simplify`.** V13's coastlines and routes are simplified "by Visvalingam" (V13:1481-1482 per read-v13 F120; V13:1743-1744,
  READ); the kernel's `simplify` is Visvalingam–Whyatt on lattice chains with obstacles and pins (kernel/src/warp/
  simplify.ts:1, :36, READ), so world cm (≥ 2²³) cannot be handed to it; V13 does not ask the kernel for it (its
  five-part list), so this is the world's own code (INFERRED).
- **N8 — W1's noise has two texts.** W1's `noise` op goes "through the kernel's `noise` (§14) at the cell's world
  position in metres" (V13:1460, READ); §3.17 says "the noise value at a fine cell is the low 64 bits of `H128` over the
  structured components (the op's seed, the cell's world x and y) through the one mixer" (V13:2796-2797 per read-v13
  F196). Both primitives exist (W-19, W-20); which one W1 uses is V13's to settle.

## Gaps (what this lane did not do)

1. **No test was run** (no Node 24 on PATH or in `m0-coverage/node24`); every "tested" cell names a file read or
   listed, and the gate's 20 tests are as their checker recorded them.
2. **Test files were read by case title** (delaunay.test.ts :43-130 in part, path.test.ts and fbm.test.ts titles); the
   hydrology, terrain-range, index, dmath-KAT and model-identity tests were **listed, not opened**.
3. **Code read in part**: flats.ts and d8.ts by their exports only; `heap.ts` to :40; `noise/index.ts` to :120 plus the
   exported signatures; `mixer.ts` at :1-14 and :141-153; `lineage.ts` at :57-100 and :125-135; `grid.ts` to :44.
   Facts about other kernel, model and site files are the reader records' (cited as such).
4. **V13 not re-read whole**: the passages named in the inputs table were re-read; every other V13 cite is read-v13's
   (cited "per read-v13 Fn"). V13 §3.15 (2) (:2729-2740) was read by this lane for N1 and is outside read-v13's sections.
5. **The world-scale timing and memory figures (W-02, W-50, N2) are arithmetic**, not measurements.
6. The **mid-flight hardening branches** (wip/child-e01s1, wip/child-e02s1) were not inspected (no git); their content is
   known only from J390 and the round specs' heads (read-kernel I5).
