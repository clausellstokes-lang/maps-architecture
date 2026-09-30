# Consistency rewrite — RENDERING part: inline rationale and history removed from §8, §9, §11, §12 (verbatim)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Status: COMPLETE (2026-09-26). Companion of `rewrite-rendering.md`. The consistency pass removes from the normative text the inline "Chose … because …" passages of the rendering part (they now live as rows J-R1–J-R56 of the Judgment calls, which the scope rewriter moves to `docs/ARCHITECTURE-RATIONALE.md`; the new text leaves "(J-Rx)" behind) and the history narration (the validation record keeps it). Several inline passages are longer than their J rows (measurements, alternatives weighed), so this file keeps every removed passage **verbatim, as whole source lines** of `docs/ARCHITECTURE.md` as it stood on 2026-09-26 (line numbers given), so nothing is lost; a line may also carry neighbouring normative text, which the new sections state at its home. Rows J-R55 (RENDERING-321) and J-R56 (RENDERING-515) are new J ids the canon assigned; the scope rewriter adds them from the passages below.

| source lines | inventory ids | where it goes |
|---|---|---|
| l.6907–6920 | RENDERING-040, RENDERING-041, RENDERING-042, RENDERING-043 | RENDERING-040: J-R1; RENDERING-041: J-R2; RENDERING-042: J-R19; RENDERING-043: J-R20 |
| l.6997–6999 | RENDERING-058 | RENDERING-058: history (dropped; validation record) |
| l.7003–7005 | RENDERING-061 | RENDERING-061: J-R30 |
| l.7033–7039 | RENDERING-065, RENDERING-066, RENDERING-067 | RENDERING-065: J-R3; RENDERING-066: J-R29; RENDERING-067: J-R28 |
| l.7188–7193 | RENDERING-104, RENDERING-105 | RENDERING-104: J-R39; RENDERING-105: J-R39 |
| l.7228–7230 | RENDERING-119 | RENDERING-119: J-R4 |
| l.7348–7354 | RENDERING-176, RENDERING-177 | RENDERING-176: J-R54; RENDERING-177: J-R54 |
| l.7396–7398 | RENDERING-189 | RENDERING-189: J-R5 |
| l.7412–7414 | RENDERING-193 | RENDERING-193: J-R6 |
| l.7419–7422 | RENDERING-196 | RENDERING-196: J-R7 |
| l.7487–7490 | RENDERING-214 | RENDERING-214: J-R21 |
| l.7520–7522 | RENDERING-224 | RENDERING-224: J-R22 |
| l.7528–7531 | RENDERING-227 | RENDERING-227: J-R8 |
| l.7561–7563 | RENDERING-236 | RENDERING-236: J-R9 |
| l.7680–7683 | RENDERING-269 | RENDERING-269: J-R40 |
| l.7684–7695 | RENDERING-270, RENDERING-271, RENDERING-272 | RENDERING-270: J-R40; RENDERING-271: J-R46; RENDERING-272: J-R51 |
| l.7696–7698 | RENDERING-273 | RENDERING-273: J-R10 |
| l.7699–7702 | RENDERING-274 | RENDERING-274: J-R23 |
| l.7765–7773 | RENDERING-292, RENDERING-293 | RENDERING-292: J-R50; RENDERING-293: J-R50 |
| l.7788–7793 | RENDERING-298, RENDERING-299 | RENDERING-298: history (dropped; validation record); RENDERING-299: J-R42 |
| l.7809–7812 | RENDERING-305 | RENDERING-305: J-R52 |
| l.7855–7857 | RENDERING-316 | RENDERING-316: J-R24 |
| l.7870–7885 | RENDERING-319, RENDERING-320, RENDERING-321, RENDERING-322, RENDERING-323 | RENDERING-319: J-R11; RENDERING-320: J-R25; RENDERING-321: J-R55 (new row); RENDERING-322: J-R48; RENDERING-323: J-R50 |
| l.7935–7938 | RENDERING-336 | RENDERING-336: J-R12 |
| l.8041–8056 | RENDERING-359, RENDERING-360, RENDERING-361, RENDERING-362, RENDERING-363 | RENDERING-359: J-R26; RENDERING-360: J-R45; RENDERING-361: J-R45; RENDERING-362: J-R27; RENDERING-363: J-R51 |
| l.8116–8118 | RENDERING-379 | RENDERING-379: J-R28 |
| l.8128–8130 | RENDERING-382 | RENDERING-382: history (dropped; validation record) |
| l.8165–8168 | RENDERING-392 | RENDERING-392: J-R13 |
| l.8441–8444 | RENDERING-426 | RENDERING-426: J-R31 |
| l.8449–8452 | RENDERING-428 | RENDERING-428: J-R32 |
| l.8476–8483 | RENDERING-434, RENDERING-435 | RENDERING-434: J-R41; RENDERING-435: J-R47 |
| l.8500–8501 | RENDERING-440 | RENDERING-440: J-R43 |
| l.8525–8527 | RENDERING-445 | RENDERING-445: J-R14 |
| l.8582–8585 | RENDERING-454 | RENDERING-454: J-R33 |
| l.8650–8652 | RENDERING-469 | RENDERING-469: J-R34 |
| l.8697–8699 | RENDERING-478 | RENDERING-478: J-R15 |
| l.8700–8702 | RENDERING-479 | RENDERING-479: J-R16 |
| l.8757–8759 | RENDERING-490 | RENDERING-490: J-R49 |
| l.8789–8789 | RENDERING-498 | RENDERING-498: history (dropped; validation record) |
| l.8871–8874 | RENDERING-512 | RENDERING-512: J-R44 |
| l.8885–8891 | RENDERING-515 | RENDERING-515: J-R56 (new row) |
| l.8923–8924 | RENDERING-530 | RENDERING-530: history (dropped; validation record) |
| l.8928–8933 | RENDERING-532 | RENDERING-532: history (dropped; validation record) |
| l.9008–9009 | RENDERING-548 | RENDERING-548: J-R35 |
| l.9044–9045 | RENDERING-556 | RENDERING-556: history (dropped; validation record) |
| l.9054–9057 | RENDERING-559 | RENDERING-559: J-R36 |
| l.9160–9165 | RENDERING-583 | RENDERING-583: history (dropped; validation record) |
| l.9245–9250 | RENDERING-599 | RENDERING-599: J-R18 |

## l.6907–6920 — RENDERING-040, RENDERING-041, RENDERING-042, RENDERING-043

```text
Chose a columnar, transferable mark table over `Mark[]` objects because a 60 000-object list costs the receiving thread
≈ 140 ms to deserialise (redteam-scale §7.3) while typed arrays transfer in constant time and slice cheaply into deltas;
chose world-aligned tile rasters over per-district rasters because district boundaries are streets (GEO-28) and a
district bitmap cannot follow continuous zoom (SCL-7). Chose the entity key's low 64 bits as the one render-time key
over the bare lineage hash, the address and the interned handle: over the lineage hash because it contains no seed, so
every town would repeat the same looks at the same derivation positions (VD2-6), while the entity key is the key every
stream of the entity is drawn from (§6.1), so the entity's render-time and model draws change together; over the
address because a New random that re-rolls a building's shape must also re-roll its look, where the address would
keep a re-rolled building's old colour; and over the interned handle because handles are session-local (NF-D10).
Chose 64 of the entity key's 128 bits because `RH32` folds 32-bit words and two words make an accidental repeat
between two entities of one town negligible (≈ 3 × 10⁻¹⁰ per 10⁵ entities, §6.1) at 8 B per mark. Chose a slot-major order with passes inside each slot over the
pass-major order ("every fill, then every casing, then every body") because pass-major drew every road casing over the
masses, fields, woods and shadows, against the slot table's own reasons (N-7), while slot-major keeps GEO-28's guarantee
through the separate casing and body slots.
```

## l.6997–6999 — RENDERING-058

```text
and the report says so. The loop ends by construction (≤ 300 steps), where the old rule — raise the lighter role until
every pair passes — could cycle (raising `ground` for ground / building lowers road / ground) or never end (a darker
role above L* 50 against a ΔL* 50 floor). Measured on 2 000 seeded draws per family with every row of the matrix
```

## l.7003–7005 — RENDERING-061

```text
pre-decided fallback: the L* window narrows from ± 12 to ± 8 and the run repeats. Chose a bounded repair with redraws
and a shipped-palette floor over the unbounded raise because O12 (f) asks that every presented style meet the floors
and only a bounded procedure can promise an answer.
```

## l.7033–7039 — RENDERING-065, RENDERING-066, RENDERING-067

```text
(`field` is the highest at 17.3) (IMPROVEMENTS O12 restraint: one ink, 4–8 roles). Chose low-chroma value steps over
saturated hues for the default because the restraint clause asks for one ink and a few roles, and eight tones meet
every floor. Chose to draw walls in the ink itself and courts as `ground` at the city band over a ninth city-band tone
because the restraint clause names one ink and 4–8 roles, and at city zoom a court is enclosed by masses on every side,
where its small step from `ground` adds noise rather than information (N-25). Chose to darken `lit`'s and `hatched`'s
ink (L* 25 → 17 and 18 → 14) over lowering the outline floors because building outlines and text over masses need the
separation the `ink` family already has (N-3).
```

## l.7188–7193 — RENDERING-104, RENDERING-105

```text
so no document holds a sheet whose order two loaders could read differently. Chose explicit passes with
most-specific-wins over one slot per semantic, because a way's casing and body must sit in different slots (N-7)
while a river's share one, and over an order fixed in code, because sheets are data (G-R2) and must say where every
casing goes. Chose to place the raised under-copy and the projected shadows as `derived` per-tile operations over
the caster marks over emitting marks of their own, because they are unions computed per tile from the casters'
geometry and heights (§8.4), so extra marks would add a row per caster to the list for no information.
```

## l.7228–7230 — RENDERING-119

```text
otherwise; authored in M2b (≈ 1 person-week). Chose Canvas2D as `lit`'s reference backend over WebGL2 because one drawing path keeps screen, PNG
and print identical (O12 c), removes the duplicate render path both creators warned about, and every part of the lit
look has a vector or per-tile raster form inside the tile budgets; normal-mapped relief is the only loss.
```

## l.7348–7354 — RENDERING-176, RENDERING-177

```text
  only the shadows follow the path — and the report says so. Chose quantised light steps for the lit programs over the
  1° sun because every 1° step would then re-raster the `under` and `over` layers too — a full settle per frame of an
  animated sun — while a 15° / 5° step moves each face's tone in whole steps that every tile shares, a few times per
  simulated hour; and over holding the fixed sun as the primary, because shadows that swing with the hour beside roofs
  whose light never moves contradict each other (the fallback accepts that, reported). Chose to let a light pass
  finish over latest-wins cancellation, which the shadow steps use, because a light pass is a whole settle and an
  animated sun would otherwise cancel it before it completes, leaving tiles of several light steps side by side.
```

## l.7396–7398 — RENDERING-189

```text
frontage run ≥ 6 m (detached, compound, hovel, vacant and green frontages) and the metric is re-run. Chose the ground
tone over kerb hairlines as the primary because a kerb line doubles the linework at city zoom and fights the casing
idiom, while a value step separates street from block the way FTG's paving tone and NG's street stripe do.
```

## l.7412–7414 — RENDERING-193

```text
the district band, where a crown is ≥ 4 px. Check: no tree mark covers a tier-1/2 casing at the city band. Chose "not
drawn" over a thin green line inside the corridor because at city zoom a corridor is ≈ 2 px, where a line fuses with the
casing and adds a ninth tone.
```

## l.7419–7422 — RENDERING-196

```text
Proxy thumbnails (§7.8) draw S0–S4 marks in a distinct preview style and are never presented as the map. Chose no
preview over an S9 block preview because §12.5's first-map laws hold the one-second bar without one for every TOWN and
CITY request and for METROPOLIS up to ≈ 14 200 buildings, the slower first map above that is declared for the owner's
veto (§12.5) rather than hidden, and a preview's figure-ground differs from the finished picture (MFP-1 item 4).
```

## l.7487–7490 — RENDERING-214

```text
  and `over`, through §8.4's light pass. Chose composition in the tile worker over two tile layers
  committed separately to the main thread because it halves the bitmaps committed at first paint and the main thread's
  draws per frame at the same memory (the worker keeps the base the labels are composed on), while a label change still
  never re-rasters the map.
```

## l.7520–7522 — RENDERING-224

```text
  Chose a budget derived from the viewport over fixed per-tier numbers because the old low tier's 24 MB equalled the
  visible base and label tiles of a 1 366 × 768 view with nothing left for the fallback stop and the scratch buffers
  (N-9 b), and the mid tier's 64 MB could not hold the reference view at DPR 2.
```

## l.7528–7531 — RENDERING-227

```text
  and at settle every ready tile is committed in the frame it arrives (§12.5). Chose settling on exact 2^¼ stops over
  re-rastering at arbitrary scales because an arbitrary-scale raster defeats the cache and the per-stop label placement;
  the settled scale is within ± 9 % of the requested one, and every settled view has exact hairlines, exact casings and
  a collision-free label set.
```

## l.7561–7563 — RENDERING-236

```text
  glyph outlines by default, or as text in the embedded face on request (§11.1, N-13). Chose Canvas2D glyphs composed
  onto the tiles over SDF text because, once tiles are composited, text never needs to be drawn by the GPU, and one text
  path keeps text identical on every output. Measurement at M1: a tile's label composition ≤ 3 ms at ≤ 150 glyph runs;
```

## l.7680–7683 — RENDERING-269

```text
  export step's share of a settle. Chose queries answered in the tile worker over copying the marks' kinds and vertices
  into the main thread's hit-test slices, because the slices would then carry model-sized geometry to the main thread
  (N-4, SCL-6), and over placing furniture in the generation worker, because its 24-B index has no kinds, vertices or
  placed labels.
```

## l.7684–7695 — RENDERING-270, RENDERING-271, RENDERING-272

```text
  Chose a resumable job — `begin`, `step`, `finish` — over the synchronous `raster()` call it replaces, because a
  synchronous raster makes a query wait for the longest tile in progress and J-R40's one frame cannot be met by an
  implementation that follows it, and over splitting batched calls to bound the overrun, because a batched fill split
  in two draws anti-aliasing seams between same-role neighbours (NR3-2). Chose four fixed classes with a bounded export
  share over first-come order, because an A2 print's bands (up to ≈ 20 s, §12.7) would otherwise sit ahead of newly
  exposed tiles and every settle during the export would miss §12.5's bound, and over strict priority alone, because an
  animated view never empties class 3 and would stop an export for as long as it runs (NR3-6); chose to apply deltas
  and band answers ahead of the view's rasters, where the verifier's order put band answers after them, because
  applying one is O(changed marks) copying and every tile that waits for it is visible work. Chose to step S13b one
  decision at a time — the view's in class 3, an export's in class 4 — over running it whole as one unit, because a
  large print's placement grows with the candidates in its frame and would hold a query and the view behind it, while
  the strict order with its memo makes every unit boundary a safe stop that leaves the result unchanged (NR4-2).
```

## l.7696–7698 — RENDERING-273

```text
  Chose a handle-and-tiles boundary over sending the document or `Mark[]` objects to the main thread because
  structured-cloning a CITY entity table costs the receiver ≈ 162 ms and a 60 000-mark object list ≈ 140 ms
  (redteam-scale §7.3) — both inside the first-frame budget — while bitmaps and typed arrays transfer in constant time.
```

## l.7699–7702 — RENDERING-274

```text
  Chose to run every model-reading step — providers, overrides, on-demand bands, `compose()`, close-ups — where the
  model is, and to hand the tile worker display-list tables only, over a model replica in the tile worker, because a
  replica would double the CITY working set (§12.8) and have to follow every edit, while the tables cross as the same
  typed-array deltas the marks already use (N-4).
```

## l.7765–7773 — RENDERING-292, RENDERING-293

```text
  class's band and four tiles build in ≈ 19.5 ms (measured cost model, `fixall_rendering_r5_seamstrip.out`). Chose to
  cut the band from a full tile over sampling it by Bridson restricted to the band, because a band sampled on its own
  packs points against its inner edge — measured, 4.7–5.3 points per 100 m² in the band against 2.8–3.6 in the ring
  inside it, a density stripe along every lattice line — while a cut keeps a full tile's density (3.6–4.4 in the band,
  3.6–4.4 elsewhere); the price is slightly larger holes along the band's inner edge (the largest empty circle 1.20 × r₀
  against ≤ 1.08 × r₀ elsewhere; 0.11 % of a tile's area could take one more point, against 0.04 % in an independent
  tile). Chose a band of r₀ ÷ 2 over one of r₀ because both give 0 close pairs across seams — two points outside a
  half-width band are already r₀ apart — while the narrower band repeats ≈ 12 % of a tile's points in every cell
  instead of ≈ 23 % (NR4-1).
```

## l.7788–7793 — RENDERING-298, RENDERING-299

```text
  scale. The shared band (NR4-1) changed the construction before any asset or golden existed (goldens start at M1,
  §13.3), so it moves no recorded hash and needs no shift record. Chose a
  constant key over the seed or the document because the tiles are a library shared by every document, session and
  host — the per-town variety comes from the stamp's offset, rotation and spacing, drawn from the entity's
  `render.instances` stream, and from the seed-dependent tile variant — and a seed-keyed library would have to be
  rebuilt per document for no visible gain.
```

## l.7809–7812 — RENDERING-305

```text
  five-engine golden run compares one, §13.3). Chose integer-centimetre world positions computed with `dmath` over
  double positions from the engine's `Math.cos` because the model-format exporters write these positions and promise
  byte-identical files, and a last-bit difference in a cosine can move a coordinate across a GeoJSON file's 7-decimal
  (≈ 1 cm) rounding; the centimetre is the model's own lattice (§3.2), so the face test is exact as well (NR4-3).
```

## l.7855–7857 — RENDERING-316

```text
  is a batch of instance events (COV-FTG-M04). Chose to apply by ordinal only while the lineage and the position both
  hold over applying by ordinal whenever the address survives, because under §6.3 a carried successor keeps the address
  but not the lineage, so its stamp — drawn from the lineage-keyed stream — puts the same ordinal on a different tree.
```

## l.7870–7885 — RENDERING-319, RENDERING-320, RENDERING-321, RENDERING-322, RENDERING-323

```text
Chose the stamped, ranked tile over per-entity Bridson sampling because sampling costs ≈ 12 µs per tree (a 36 ha wood
takes 170 ms; redteam-scale §7.2) while a stamp costs under 1 µs, and ranked tiles give every band a subset of the finer
band by construction. Chose bit-reversal ranks for the jittered layouts over a second blue-noise ranking of their points
because the van der Corput order is a pure function of the ordinal, so the rank is as stable as the ordinal itself
(N-10). Chose to build the tiles at build time and ship them over building them in each session because the session
build ran on the interaction path — the first zoom to the district band, under §12.5's ≤ 150 ms settle — with no
budget, in both workers, and NR-6 had already made the tiles a constant, so a build-time asset costs a bundled ≈ 31 KB
and a hash check instead (NR3-7). Chose one set of tiles per class scaled by the entity's spacing over one set per
(class, spacing) because the spacing is drawn per entity in whole centimetres, so a per-spacing library has hundreds of
members per class (≈ 19 ms each in the session, measured cost model; megabytes as an asset), while uniform scaling
keeps the blue-noise property and the ordinals and costs one multiplication per point (NR3-7). Chose four
seam-compatible variants sharing a border band over one larger toroidal tile per class (MFCG's and VG's single tile,
here 128 m at r₀) — which has no seams by construction — because a single tile repeats every instance position on a
periodic lattice, while the variants keep ≈ 88 % of each cell's points varying among four tiles at the same asset
size, for the price of one band per class and slightly larger holes along the band's inner edge; and over the
independent variants they replace, whose seams put 3.5–5 pairs of trees per 64-m seam closer than the spacing (NR4-1).
```

## l.7935–7938 — RENDERING-336

```text
Chose "placement is view data, measured with our own font metrics" (GEO-29's options b and a together) over fitting
placement into the model because collisions change with the zoom inside a band (SCL-10), so a model placement would be
wrong between stops or recomputed per zoom anyway; and over measuring with the host's text engine because Chromium,
Gecko, WebKit and headless Node shape text differently.
```

## l.8041–8056 — RENDERING-359, RENDERING-360, RENDERING-361, RENDERING-362, RENDERING-363

```text
Chose fixed pins at their own and finer stops and yielding candidates at coarser ones over pins fixed at every stop,
because a pixel-sized box grows in world units as the view zooms out, so a pin fixed everywhere would collide at coarse
stops with other pins and higher labels, against "0 collisions at every zoom" (N-28). Chose a pin pass at placement
time over refusing, in their dry runs, the warps, renames, rerolls and style changes that bring two pins together,
because those edits are not about labels — a warp is continuous and a rename is the user's wording — so refusing them
for a label overlap would block edits the user means, while hiding a pin is a reported view change the user can undo
by moving either pin (NR3-3). Chose the `moveLabel` order over the greedy's priority order because `moveLabel`'s guard
already makes a new pin give way to the pins already there, so the pass keeps the pin that stood first, and a stored
`seq` does not change when a later edit changes a target's priority or area; the price is a `seq` on the pinned
placement and a 4-B `pinSeq` column (NR3-3). Chose to decide rung (5) from
geometry before the greedy over letting it fall out of collisions inside the greedy, because the quarter candidate must
have a fixed place in the strict order that the local evaluation relies on, and a candidate whose existence depended on
later outcomes would break that order (N-11). Chose a resumable placement job whose unit is one decision over running
S13b whole at a stop, because a large print's placement over its whole frame — tens of thousands of candidates at a
fine band — would be one unbounded unit in the tile worker, against §8.9's rule that a query waits for at most one
step, while an explicit stack with the memo makes every unit boundary a safe stop without changing the result (NR4-2).
```

## l.8116–8118 — RENDERING-379

```text
  the failing text / halo pairs. Chose `ground` as the one fallback over a per-family choice (`paper` in `lit`) because
  the matrix already guarantees ink / ground in every accepted palette, so the rule needs no family table, and a
  ground-toned halo over a mass reads as the block showing through.
```

## l.8128–8130 — RENDERING-382

```text
  screen, and the check re-runs. (The old bar, ≥ min(12, number of districts), failed by construction where the cut is
  smaller than 12 — at 7 500 and 10 000 inhabitants, `docs/validation/bench/fixall_pipeline_r2_quarters.out` — and its
  "MFCG size 80 draws 17" was not the plain sweep's 12.)
```

## l.8165–8168 — RENDERING-392

```text
  `rerollLayer('naming.emblem')`; NF-D12); off by default; drawn in the legend or a corner. Chose a minimal own
  generator plus import over import only because the legend should be able to carry an emblem with one click (MFCG
  fetches one from a third-party service), at a fraction of a person-week; chose it over a full blazon engine because
  heraldic depth is not a map-parity item.
```

## l.8441–8444 — RENDERING-426

```text
`<name>.metric.json` giving the origin, the unit, the axes, the document id and the anchor if one is set. Chose a strict
WGS84 default with a documented default anchor over the local metric CRS with a `crs` member because the latter cannot
pass an RFC 7946 validator and would be read by GIS tools as degrees, placing the town at meaningless coordinates; the
metric file keeps the lossless path for tools that agree to it.
```

## l.8449–8452 — RENDERING-428

```text
Chose outlines as the default over embedded text because only outlines draw the same glyphs in every consumer — an
embedded `@font-face` is honoured by browsers but not reliably by desktop editors (PLAUSIBLE; CI renders each variant
in the consumer it targets, §11.1's SVG row), and a substituted face at our per-glyph positions changes widths and can
collide — which is what "text identical on every output" (§8.9) requires.
```

## l.8476–8483 — RENDERING-434, RENDERING-435

```text
export dialog shows the bands done out of the bands total. Chose a transient list in the generation worker over
handing SVG to the tile worker because the SVG writer also reads the document (addresses, the supersedes table, layer
and entity metadata), which the tile worker never holds (N-4), and over keeping a second full list resident because
exports are occasional and the list is rebuilt in tens of milliseconds. Chose a transient list for raster exports as
well over rastering them from the view's list, because an A2 print takes up to ≈ 20 s and longer while the view
pre-empts it (§8.9), so an edit made meanwhile would reach the view's list between two bands and tear the picture —
bands above and below the edit drawn from two model states — and because the view's list holds the finer bands only
for the districts the view has visited, while the transient list is one model state, complete for the frame (NR3-6).
```

## l.8500–8501 — RENDERING-440

```text
so. Chose a declared extension over a sidecar as the primary because it keeps the anchor inside the one file a GIS
user moves around, and the sidecar as the fallback because it leaves the CityJSON file valid by construction.
```

## l.8525–8527 — RENDERING-445

```text
Chose to build CityJSON over leaving it deferred (D-8) because its integer-vertex-plus-transform encoding carries our
centimetre lattice losslessly, so the exporter is a thin view (≤ 1 person-week, M3b), and it gives GIS users a standard
3-D city path that GeoJSON cannot.
```

## l.8582–8585 — RENDERING-454

```text
true`) with its own confirmation. `cancel` drops the token. Chose confirmation by token plus fate equality over a
fire-and-forget call with a "force" flag because §7.3 requires the user to see and confirm every fate other than *kept*,
and a replay that computes different fates must report a mismatch — so the committed event must carry exactly the fates
and renames the user saw.
```

## l.8650–8652 — RENDERING-469

```text
  the roles they name, the rest being listed in that viewer's style dialog. Chose a separate preset key over treating
  the canonical style as a last-writer-wins view key because a viewer's look must neither rewrite the shared style nor
  silently diverge from it.
```

## l.8697–8699 — RENDERING-478

```text
* Chose host-as-store over our own sync service because the product is a standalone, backend-free library (D-4, D-21), a
  host already owns accounts and storage, and §11.3's protocol makes any host a correct store; reversing means writing a
  service that plays the host's role (low cost).
```

## l.8700–8702 — RENDERING-479

```text
* Chose a transport-agnostic bridge plus the static VTT exports over building a Roll20 extension because an extension
  needs a Roll20 account and store publishing (outside a standalone program), and FTG's extension only relays the same
  messages that `MessagePortTransport` carries.
```

## l.8757–8759 — RENDERING-490

```text
  generating), while re-timing takes at most 20 generations × 3 runs per rung (≤ ≈ 3.5 min at the band tops). Chose one
  timing phase over a noise rule per check because runner contention inflates every gating timing the same way — a
  five-seed p95 is in effect a maximum — so every check that compares a time with a bound is protected once.
```

## l.8789–8789 — RENDERING-498

```text
  bar. The earlier TOWN bar at MFCG size 25 (≈ 411 buildings) is replaced by size 40.
```

## l.8871–8874 — RENDERING-512

```text
buildings), where the single worker's law gives 351–454 ms, so the rule keeps the faster configuration. Chose to keep
the pool wherever it measures faster than a single worker, judged against its own law, over one bar at the target (the
pool's p95 ≤ 300 ms), because the law itself puts the default CITY request above 300 ms, so that bar would have
replaced the pool by the slower single worker exactly when the pool met its budget (NR3-1).
```

## l.8885–8891 — RENDERING-515

```text
law) as a D-18 amendment, and this section's max columns are re-derived from it. Chose a max clause relative to each
generation's own law over one absolute maximum per rung because a generation's building count varies with its seed,
so only a ratio to its own law separates a slow generation from a large one. Chose confirmation by the median of three
solo re-timings over the maximum of the contended screen because one garbage-collection pause or scheduling stall of
≈ 60 ms on a ≈ 240-ms CITY generation — exactly the tail a maximum over 12 000 contended timings picks up — would
otherwise fail the gate with no change to the generator, and its fallback would then loosen the owner-facing promise
on noise; a generation that is really slow is slow three times out of three (NR3-4).
```

## l.8923–8924 — RENDERING-530

```text
(§3.7): S9 and S11 are budgeted once, for it, and the generation report names the engine that ran (SCL-22); the earlier
"pure-JS boolean fallback at 2.5×" assumption is withdrawn with the fallback itself (integration record C-8). The
```

## l.8928–8933 — RENDERING-532

```text
with the pool. (Round 1's integration added the S7b row and the single travel-cost field, +6 ms at CITY; round 2 moved
the gate routes and the stage-1 field into S3 (net 0), added S12a's siting, the eager shared-edge step and the pool's
arena copies (+6 ms at CITY); round 3 added step (0)'s L3 partition rebuild before the freeze (+2.3 ms at CITY, +5.8 ms
at METROPOLIS, ≈ +1 ms at TOWN; VK2-1); round 4 counted the static index partitions in the pool's copies (+2 ms at CITY,
+3 ms at METROPOLIS; TOWN's partitions add ≈ 0.3 ms; the single-worker path makes no copies; VK3-6); all PLAUSIBLE until
the fusion gate and the M0 site-and-fields spike measure them. The p95 laws of §12.3 are unchanged.)
```

## l.9008–9009 — RENDERING-548

```text
No rung depends on WebGL2 (§8.9). Chose laws of the building count over one bar per rung because a single number held
only at each rung's target population while the ladder builds every population in the band (N-2).
```

## l.9044–9045 — RENDERING-556

```text
  law replaces the earlier "300 edits in ≤ 1 s", which assumed checkpoints a saved document does not have. Verification
  never delays the picture or an edit: the saved model is displayed at once, editable once its own digest is recomputed
```

## l.9054–9057 — RENDERING-559

```text
  owner's veto (the verification wait is off the path to the picture, so no mechanism changes). Chose to state the bound
  as a law of the log over saving checkpoints because a checkpoint holds the arena chunks changed since the last one,
  which would multiply the 3 MB CITY document (§2.9) for edit-heavy files, while the verification wait is already off
  the path to the picture.
```

## l.9160–9165 — RENDERING-583

```text
at CITY across the two threads that hold any of it. The earlier "≈ 6 MB per thread that holds it" undercounted the fixed
columns — 46 B per mark, now 54 B with the render key (N-9 c; §8.1 item 5) — and assumed a full copy in both the
generation worker and the tile worker (≈ 12 MB); keeping one full copy brings the corrected display list back under that
figure. The pool's frozen arena copies (≈ 45 MB at CITY with three workers at the one-click freeze, ≈ 60 MB at a freeze
after edits; `Map`-based tables would have cost each worker more heap and ≈ 10–20 ms of rebuild, VK2-9) are new in round
2 (§3.3); while a loaded document is verified, one pool worker holds the replay's model in their place — no frozen copy
```

## l.9245–9250 — RENDERING-599

```text
* Chose the derivation pool as the primary configuration over a single worker because after LC-2's eager allocation the
  per-district stages are pure functions of eager upstream state and their own district's sub-stream, so they run in
  parallel without shared writes; by the laws the pool keeps CITY's p95 within 300 ms up to ≈ 5 200 buildings (≈ 17 700
  people), where a single worker holds it only up to ≈ 3 770, and moves the METROPOLIS one-second knee from ≈ 11 400 to
  ≈ 14 200 buildings (§12.5). M1 and M2b keep it primary only at the sizes where it measures faster than a single
  worker, with identical digests (§12.3; NR3-1).
```
