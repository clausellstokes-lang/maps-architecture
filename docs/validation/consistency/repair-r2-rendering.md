=== REPLACE ### 8.10 Decoration instances (trees, scatter, crowns, roof detail) ===
### 8.10 Decoration instances (trees, scatter, crowns, roof detail)

```ts
interface InstanceStyle { species?: string /* a species kind of the entity's mix */; crown?: number /* crown-library index */;
  scale?: number /* 0.5–1.5 */; tone?: number /* colour jitter, −1…1 */; leafType?: 'deciduous'|'evergreen' }   // what a `restyle` or `add` override sets (§7.1)
```

* **One instance set per entity, independent of the band.** Every `instances` mark (wood, garden, park, copse, orchard,
  avenue, hedgerow, yard planting, scatter class) has one set of positions in one of three layouts: a **stamp** of a
  per-class blue-noise tile for areas; a jittered **grid** for orchards (6–8 m); a jittered **line** for avenues and
  street trees — along the row §4.9 derives in the planting district's own half-corridor strip at `Greenery.along`'s
  `offsetCm` from the kerb (no plat edge) — and for hedgerows along their L3 field-boundary chains (8–12 m along the
  line). S14 draws the layout's offset, rotation and spacing (whole cm inside its class's range, §4.9: 300–500 cm for
  woods, 400–600 cm for gardens) from the entity's `render.instances` stream (§6.1) in the generation worker and carries
  them in the mark's `InstanceTable` row (§8.1).
* **Tiles.** Per stamped class, four toroidal blue-noise tiles of 6 400 × 6 400 cm at the **reference spacing**
  r₀ = 400 cm (≈ 162 points each; `fixall_rendering_r5_seamstrip.out`), each point carrying a **progressive rank**
  (void-and-cluster order: every prefix is itself evenly spread; the lowest-rank quarter keeps ≈ 1.5–1.8 × r₀ between
  any two points). The tiles are **seam-compatible**: they share one **border band** — every point whose edge distance
  e = min(x, 6 400 − x, y, 6 400 − y) is below r₀ ÷ 2 — and differ only inside it. An entity of spacing r stamps them
  scaled by s = r ÷ r₀ (scaled blue noise is blue noise at the scaled spacing), so one set serves every spacing of the
  class (a wood at 3 m stamps 48-m tiles, a garden at 6 m 96-m tiles). **No two instances of one stamp lie closer than the
  entity's spacing** (less ≤ 1.5 cm of rounding, *Stamp* below): inside a cell because each tile is spaced at r₀
  toroidally; across every seam, between any two variants, because a point outside the band lies ≥ r₀ ÷ 2 from its
  cell's edges, while a band point is present at the same position in the other point's own tile and was spaced against
  it there (toroidally, never farther than across the seam). Every band draws a subset (ranks below s_b), so this holds at
  every band. Measured on five seed sets (`fixall_rendering_r5_seamstrip.out`): 0 pairs closer than r₀ across cells in all
  256 arrangements of 2 × 2 cells, for all ranks and the rank < 0.6 and < 0.25 subsets, where four independent tiles have
  3.5–5 such pairs per 64-m seam. A stamp cell's tile variant is `RH32('stamp.variant', key, salt, u, v) mod 4` (§8.1
  item 5): only the band, ≈ 11–14 % of a tile's points, repeats in every cell. The tiles are built once, when the product
  is built, and shipped; nothing samples or ranks at run time (J-R11, J-R48, J-R50, J-R55).
* **One construction everywhere.** A class's band depends on the class alone, each tile on (class, tile index) and the
  band; all are built by `plat/tools/stamptiles/` (a build-time script in the product repository, like the texture set's)
  with `@plat/kernel`'s `poisson` module (§14), held to §6.5's allowlist lint, so any machine builds the same bytes. Its
  random source is `rng.stream` (§6.1, §14) under the `render.stampTiles` key and components of §6.1's registry entry
  (J-R42). **Sampling:** Bridson with k = 50 candidates, all evaluated. Every accepted
  point is rounded at once to integer cm inside the 6 400-cm tile, so the spacing test is an exact integer comparison of
  squared toroidal distances with r₀². The first point is (`int(0, 6 399)`, `int(0, 6 399)`); the active point is
  `int(0, n − 1)` over the active list in insertion order, a retired point replaced by the list's last; each candidate
  lies at radius r₀ × (1 + `float01`) along angle 2π × `float01` (cosine and sine from `dmath`, §6.5), tried in draw
  order. **The band (creation index 4):** a full toroidal tile sampled as above, cut to its points with e < 200 cm, in
  index order. **Each tile (creation index 0–3):** the band's points pre-placed in that order (in the spacing grid and as
  the initial active list), sampling then continuing over e ≥ 200 cm — no first point drawn, a candidate with e < 200 cm
  rejected like one too close; the tile is the band's points followed by its own in acceptance order. **Ranking**, per
  tile: each point's energy is the sum over the other points, in point-index order, of exp(−d² ÷ (2σ²)) (d the toroidal
  distance in cm, σ = r₀, `dmath.exp`); the highest-energy point (tie: lower index) is removed and takes the highest free
  rank (n − 1 first), and every remaining point has the removed point's term subtracted, in point-index order — the
  **removal update**: ≈ 1.5 n² exponentials (n(n − 1) + n(n − 1) ÷ 2, O(n²)), never a re-sum per removal (O(n³):
  ≈ 53 ms per tile against ≈ 1.8 ms at 161 points, measured cost model). A needed square root is `Math.sqrt`, exact by
  specification (§6.5 (2)). The crown library's shapes use `dmath` the same way, so only their rasterisation into
  sprites is engine-specific. A class's band and four tiles build in ≈ 19.5 ms (measured cost model,
  `fixall_rendering_r5_seamstrip.out`).
* **The shipped asset.** `plat/assets/stamptiles/stamptiles.bin` holds, per stamped class in registry order, its four
  tiles — each self-contained, band points first: a point count, then per point x and y as int16 cm and its rank as u16
  (6 B per point, ≈ 1 KB per tile, ≈ 31 KB for eight classes) — with a header naming the asset version, the format
  version, the generating script and its constant key words (§17.1 (5)) and the stored H128 of every tile.
  `@plat/render` bundles the bytes into both workers' code, so no host serves an extra file (§11.2); at worker start each
  worker takes typed-array views and checks every tile's H128 against the stored value (≈ 0.03–0.06 ms for 8–16 classes,
  measured cost model; budget §12.7). **Pre-decided fallback** when a tile's hash differs (a damaged bundle): that worker
  rebuilds the class's band and tiles with the same construction at start-up, before its first district-band raster
  (≈ 19.5 ms per class), reported; a rebuilt tile that still differs is a determinism defect, which the census's rebuild
  check (§8.3) fails in CI. **Release changes:** a new stamped class adds its four tiles and moves no stored hash (no
  drawn wood moves); a change to the construction (r₀, σ, k, the tile side, the band width, the key words) moves stored
  hashes and is a `render.stampTiles` view shift (§13.3); a new spacing needs nothing (a scale).
* **Stamp.** From the row: offset o ∈ [0, 6 400)² in whole reference cm, rotation `rotationCdeg` ∈ [0, 36 000) (S14 draws
  `int(0, 35 999)`), scale s = spacing ÷ 400 cm. R_θ's cosine and sine are `dmath.cos` and `dmath.sin` of `rotationCdeg`
  × (π ÷ 18 000), the factor a double literal. Tile point t of cell (u, v) lies at R_θ · (s · (6 400 · (u, v) + t + o)),
  each coordinate rounded to whole cm (`Math.round`): that integer point is the instance's **world position**, the one
  the face test, the density test, drawing, override resolution and every export read. The cells are those of the
  rotated, scaled lattice covering the entity's face (its bbox taken into lattice coordinates by the same cosine and sine,
  widened by one cell); a point survives if its world position is inside the face (exact point-in-polygon with holes on
  integer cm, §3.2) and, for woods, passes the edge test of a domain-warped density evaluated once per point at its world
  position in metres. Rounding moves a point ≤ 0.71 cm, so instances keep the entity's spacing less ≤ 1.5 cm. **Ordinal**
  = (u, v, p): stable — editing the face's boundary changes only which edge points survive, never interior ordinals or
  positions. **One result on every engine:** this whole function — stamp, grid and line layouts, the per-instance look
  draws and the density test, with everything they call — is held to §6.5 (3)'s allowlist lint, so every engine computes
  the same integer positions and draws, and a GeoJSON, glTF or CityJSON file with trees is byte-identical on every host
  (§11.1; the five-engine golden run compares one, §13.3) (J-R52).
* **Grid and line.** A `grid` places one point per cell (u, v) of the rotated lattice at the row's spacing, jittered
  ± 15 % of the spacing in x and y by two `RH32` draws over (key, salt, u, v) (tags `grid.jitter.x`, `grid.jitter.y`),
  rounded to whole cm, kept if inside the face; ordinal = (u, v). A `line` places point i at arc length (i + ½) × spacing
  from its start end — the end whose junction address sorts first (for an `along` row, the end at its way's first
  junction) — jittered along and across the line the same way, rounded to whole cm; ordinal = i. Park paths are L3 `path`
  faces drawn by the path program, not instances.
* **Rank and band thinning (N-10).** Every instance has a normalised rank r ∈ [0, 1): a stamp point's progressive rank ÷
  its tile's point count; a `grid` point's the 32-bit bit-reversal of the Morton interleave of (u, v) ÷ 2³² (2-D van der
  Corput); a `line` point's the bit-reversal of i ÷ 2³² (J-R25). Band b draws the instances with r < s_b (city: none — the
  wood, orchard or green fill; district: 0.6; neighbourhood and finer: 1), so every coarser band is a subset of the finer
  for every layout: an instance keeps its position once visible and appears at most once in a zoom sweep (LC-20, VIS-5).
* **Per-instance look, keyed by (key, ordinal).** The species, drawn by its share from the entity's `Greenery.species` mix
  (inner or outer share by the point's distance from the edge), picks the crown class; the crown index into the style's
  crown library, colour jitter, scale jitter ± 15 % and `leafType` (from the species when present, deciduous otherwise)
  are `RH32` draws over (render key, ordinal, the concern's salt). Hatch phase and roof detail are keyed by the render
  key. Nothing is keyed by band or interned handle. The **crown library** holds 20 crowns per class per style, built once
  per session from `rng.stream` keyed by the sheet's key (the hash of its id@version), `STAGE_VIEW`, the concern
  `style.crowns` with its salt, and the class and index i as the creation index (§6.1's structured components; the path
  form is a report rendering, §14), drawn as sprites. A `lit` sheet bakes its sprites per (style, light step): once with
  a `fixed` sun, and with a `path` sun again at each light step, in the tile worker as one-sprite units of §8.9's queue;
  the drawn step's set is always kept, a set a running export needs is held until that export completes (§8.9, class
  4), and earlier sets are kept while they fit §8.8's crown-and-atlas scratch.
* **Edits (LC-20).** `instance` events (§7.1) apply after the set is generated: `remove` drops the ordinal, `move`
  replaces its position, `add` appends a user ordinal `u<n>` at `point`, `restyle` sets its `InstanceStyle`; for an
  ordinal-addressed event the dry run records the instance's generated position in `point`. **Resolution** runs in the
  generation worker whenever a commit touches an entity carrying overrides (re-running this function for that entity
  only): an override **applies by ordinal** when the entity's lineage is unchanged since the event — no `carry` lifecycle
  event and no supersession recorded after the event's `seq` (§6.3) — **and** that ordinal's generated position lies
  within 0.5 × the spacing of the recorded `point`; otherwise — a carried successor with a fresh lineage, a superseded
  entity (its overrides move to the `supersededBy` successor), or an ordinal that moved (a line edited at its start end) —
  it **re-matches by position** to the nearest generated instance within 0.5 × the spacing of `point` that no other
  override has claimed (candidates in (distance, ordinal) order, overrides in log order), else it is kept **orphaned** and
  reported (J-R24). Resolution reads each positional override's current position from its entity's `overrides` table
  (§2.7) — a `move`'s `to`, an `add`'s `point`, for a `line` layout the recorded generated `point` — which the event
  writes when it applies and a warp or vertex move displaces with the host face (§7.4); for stamp and grid layouts the
  recorded generated `point` stays world-anchored, as their instances are. An `add` stays while its point lies in the
  face (or within 0.5 × the spacing of its line), and is orphaned otherwise. Resolved overrides — ordinal, op, position,
  style, state (`byOrdinal`, `rematched`, `orphaned`) — cross to the tile worker as the `InstanceTable`'s override rows
  (§8.1, §8.9). A tree brush is a batch of instance events (COV-FTG-M04).
* **Where it runs (N-4).** Instances are generated per tile in the tile worker from the `InstanceTable` row and memoised
  per (key, revision, style version) for the session; they are never written to the document except as overrides. The
  generation worker runs the same function on the same shipped tiles for entities carrying overrides (to resolve them)
  and for exports: the GeoJSON, glTF and CityJSON exporters call it at the finest band with overrides applied and write
  each instance's position, species, crown diameter and leaf type (§11.1; VN-158, XB32); the bench computes tree
  statistics from it (SCL-21). Budgets: §12.7.

=== REPLACE ### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9) ===
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
  TOWN → CITY from M2a, TOWN → METROPOLIS from M2b, §13.2).
* **Replay and load verification (N-16, N-1).** A replay (§7.3 item 2's replay mode) folds the log on the model through
  the session's code path, the view stages once at the end (§7.3 item 2) — S13a's scoped delta at each event that
  re-derives names costs ≤ 3 ms per such event. Its cost is therefore a sum over the log, not a constant:

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

=== REPLACE ### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14) ===
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
  A2 300-dpi export of a CITY, and from M2b, where `lit` ships, a `lit` export of a CITY while a `path` sun advances one
  step per frame — pass: every settle within §12.5's bound, the export completes, and its PNG matches, byte for byte,
  the export made with the view idle, one during which an edit is made (§8.9, §11.1) and, for the `lit` export, the
  export made with the sun stopped at the request's time; pre-decided fallback: §8.9's `step(4)`.
* **The stamp-tile load** is timed with the first map at M1, per worker from worker start to the library ready;
  pre-decided fallback on a miss: the per-session hash check moves to CI and the release build, leaving typed-array views
  over the bundled bytes.
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (≤ 3 µs per plot
  median, §12.4's S11 row; the kernel's M0 bar, §3.7); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per
  building median and its registration re-declares S11's row of §12.4 by the measured difference (§2.6, §3.7);
  `compose()` ≤ 1 ms per building median at `wings`, in the derivation pool on the tile's band request (§8.6, §8.9), one
  tile's compositions within 16 ms of pool time, amortised (a tile draws the outline until its compositions arrive).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker, with a cost-model
  test (§13.2); never on the one-click path.

=== REPLACE ### 12.8 Memory (what is counted, per rung) ===
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
it; the load's digest trees (at CITY the model tree ≈ 1 MB — ≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and
their interior nodes at 16 B each — and the records tree ≈ 0.25 MB, §6.2) sit in the entity-store line, and a bridged
client that took the replayed town keeps the `doc.load` bytes (≤ 3 MB at CITY) until the mismatch is settled (§11.3).
The lines stay PLAUSIBLE until M1 (generated towns at TOWN and CITY), M2a (that load-verification
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
43 or 67 MB), whose 7 MB of scratch holds the drawn light step's crown set with the atlases. A raster export's ≈ 15 MB of
band and tile canvases count on top of that need. The crown set an export in `lit` with a `path` sun holds (§8.9) is the
drawn step's set while the view keeps that step and adds nothing; from the first light pass that completes while the
export runs (§8.4) it is one more set, bounded by §8.8's ≤ 5 MB crown-and-atlas scratch, which holds one set with the
atlases (a set is §12.7's 160 sprites). The reference view on the mid tier (112 + 15 ≤ 128 MB) and the low-end
1 366 × 768 view (43 + 15 ≤ 72 MB) hold both, the latter with the extra set too (43 + 15 + 5 ≤ 72 MB); where the sum
passes the tier's ceiling — the low tier at 1 920 × 1 080 (67 + 15 > 72 MB), and the mid tier's reference view once the
extra set is held (112 + 15 + 5 > 128 MB) — the coarser-stop fallback set is dropped for the export's duration (the need
falls to 2P + 7 MB: 47 + 15 = 62 MB on the low tier, 77 + 15 + 5 = 97 MB on the mid tier), and the export dialog refuses
a width whose band does not fit beside the reduced need, naming the widest that does.

**Measurement and fallback.** Measured per rung in B-CITY's browser runs at M1 (TOWN, CITY) and M2b (METROPOLIS), and at
M2a on the reference 300-edit CITY document under load verification (§16). Pre-decided fallback if CITY exceeds its line
at M1 or M2a: the provenance and lifecycle-history columns leave the working set for the document's on-demand block
(SCL-20's archive) and are decoded only when inspected; if the line is still exceeded at a freeze after edits, that
freeze makes the laziness-contract copy of §3.3 step 1 — L0–L2, every L3 partition, and only the L4 partitions of the
districts the pool derives; if the line is still exceeded, the pool shrinks by one worker per step (identical digests by
construction, §3.3) and the memory test re-runs. If a tier's canvases exceed its ceiling in the scripted pan and zoom
runs, its coarser-stop fallback set is dropped (the need falls to 2P + 7 MB) and a gesture shows the next coarser cached
tiles only where they remain. The document's size budget is §2.9's.
