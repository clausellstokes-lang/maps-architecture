# Fix-all round 1 — RENDERING area (§8 rendering and style, §9 labels and furniture, §11 export and interop, §12 performance budgets)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-rendering-r1 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-rendering-r1` · 2026-09-25 · fix architect for the RENDERING area, round 1 (opus stand-in for the Fable
seat). Status: COMPLETE.

## 0. How to read this file

**In plain words.** The red team and the coverage audits found 64 things wrong or missing in the parts of the design
that draw the map, place its names, export it and set its speed targets. Under the owner's rule of 2026-09-25 ("no
defer … everything fixed as soon as possible") every one of them is decided here: 64 of 64 are FIXED — the replacement
text below contains the mechanism that defeats the failure — none is deferred, and none is declared invalid (one,
MFP-5, rests partly on a building count that the later MFCG size sweep corrected; the corrected numbers are used and the
residual defect is fixed). The biggest decisions, in one line each:

* **Streets stay readable at city zoom** because blocks get their own "ground" tone and streets and squares are the only
  paper-coloured gaps (MFP-1), with our own colour values checked pair by pair (VIS-2).
* **Drawn symbols are sized by a table in metres or screen pixels**, not in MFCG's private unit; walls, towers and gates
  are drawn at MFCG's weight without changing the model (VIS-1).
* **Tiles are a world-aligned pyramid, not one bitmap per district**, so zoom works, junctions stay clean and a poster
  prints without a giant canvas (SCL-7, VIS-6, GEO-28).
* **Label positions are a view product, not part of the town's fingerprint**, computed from the bundled fonts'
  own metrics so every browser and the headless tool agree (GEO-29, LC-17, SCL-10); names and label candidates stay model
  data.
* **Trees are stamped from a few precomputed patterns**, keep their positions at every zoom and can be edited one by one
  (SCL-8, LC-20, VIS-5).
* **The textured `lit` look runs on the same Canvas2D renderer as the default look**; WebGL2 is only a compositor
  fallback, so there is one drawing path and no SDF text (VIS-7, DEF-6, SCL-17).
* **The embedding host is the store** for multi-client use; there is no hosted sync service to wait for (FTG-12, DEF-12).
* **Speed targets are restated against MFCG at matched building counts** (sizes 40 / 80 / 130), with every stage's
  mechanism named, reference hardware defined and the per-building trade against MFCG declared (SCL-3, SCL-15, MFP-5,
  MN-1).

**Format.** §1 is the disposition table. §2 holds the replacement blocks, each starting with
`=== REPLACE <section and exact heading> ===` or `=== INSERT AFTER <section and exact heading> ===` and followed by
the complete new text of that subsection, written in the architecture's voice; each carries the PENDING FABLE REVIEW
banner under its heading so the marking survives integration. §3 lists the changes other areas must make (the
integrator applies them). Every new choice is recorded in its block as "chose X over Y because Z"; §3.4 asks the scope
area to mirror them as judgment-call rows.

**Evidence used (numbers only; no reference code, palette, grammar or content table is reproduced).** The seven
red-team lenses and four coverage audits; `docs/ARCHITECTURE-VALIDATION.md` §0.M; `captures/mfcg/exports-2026-09-25/README.md`
and `captures/mfcg/exports-sweep-2026-09-25/README.md` (building counts, walled areas, the app's own stage timings, SVG
bytes, the JSON-in-metres rule); `docs/validation/redteam-scale.md` §7 (benchmarks of the named mechanisms on the
capture machine); `research/findings/ftg-payload-visual.md` §1 and Critic-2 addendum part 2 (FTG timings);
`docs/IMPROVEMENTS.md` O12 acceptance. **Executed by this seat:** the ink, lit and hatched role values in §2 (block
8.2) were designed in CIELAB and every pair of the contrast matrix was computed as ΔE2000 and ΔL* on the sRGB values
(script in the session scratchpad, `palette.py`); every pair passes its floor; for comparison the same script gives
MFCG's published green-versus-roof pair ΔE2000 0.6 and tree-versus-water 0.0 (the collapses VIS-2 names). Everything
else in the blocks is PLAUSIBLE until M0–M2 measure it; each measurement and its pre-decided fallback is stated where the
choice is made.

## 1. Disposition table

| item | disposition | sections changed | mechanism (one line) |
|---|---|---|---|
| GEO-28 | FIX | §8.1, §8.8 | world-aligned tile pyramid: every tile draws every intersecting mark in one global program order (all casings before any body across the scene); same-semantic fills unioned per tile path; ½-px same-colour seam underlay; render test "0 casing pixels in junction mouths" |
| GEO-29 | FIX | §9.1, §9.2, §8.9 | label placement is view data (S13b), outside the model hash; text widths from the bundled OFL fonts' own metric tables parsed by our code, never the host text engine; headless-vs-browser hash and placement tests |
| GEO-39 | FIX | §9.3 | area-label spine = longest path of the maximum-clearance spanning tree of the hole-aware skeleton graph; topology-preserving simplification |
| GEO-40 | FIX | §11.1 (3-D row) | glTF ground = the plat's leaf faces exported once each, clipped to terrain cells and draped; rivers as sloped surfaces from per-station water levels, lakes and sea as level planes |
| LC-17 | FIX | §9.1, §9.2, §9.6 | names and label candidates are model data re-derived only inside a regenerated scope; placement is view data; uniqueness never renames an existing entity; test: a block reroll changes 0 names and 0 Label entities outside it |
| LC-20 | FIX | §8.10 | one instance set per entity from a stamped blue-noise tile, positions independent of the band, bands thin by stable rank prefix; `instance` override events replayed after regeneration |
| LC-23 | FIX | §8.1, §8.8 | every derived cache keyed (entity handle, content revision digest, band, style version, construction); tiles invalidated by dirty world regions from the changed marks |
| SCL-3 | FIX | §12.4 | CITY per-stage split re-budgeted with the mechanism named for every stage (coarse-grid fBm, 16 m hydrology, hex lattice, one plaza-rooted Dijkstra reused by growth, 32 m fields with O(N) blur, distance rasters for context vectors, top-k siting, render-time strips); site-and-fields spike in M0 |
| SCL-6 | FIX | §8.9, §11.2 | handle-based API; document stays in the generation worker; columnar display list delivered as transferred deltas; per-call crossing table; SharedArrayBuffer optional; main-thread receive ≤ 4 ms per delivery |
| SCL-7 | FIX | §8.8, §12.5 | 512-device-px tile pyramid at 2^¼ zoom stops, LRU canvas budget in bytes per tier, scaled interim tiles during gestures, progressive re-raster in the tile worker, print by streaming tile bands into the PNG encoder; zoom, pan, draw-call and upload budgets declared |
| SCL-8 | FIX | §8.10, §12.7 | tile stamp normative for every scatter class (Bridson k = 50 only builds the tiles once per session); crown library of 20 per class per style; instances generated per tile in the tile worker; ≤ 1 µs placement and ≤ 2 µs draw per tree |
| SCL-9 | FIX | §8.1, §9.2, §12.6 | S14 and S13a incremental over a dirty region; S13b recomputed per affected tile; replay mode builds the display list once at the end; warp preview on tiles at ≥ 30 fps with invariants on Apply; edit budgets stated as functions of scope size |
| SCL-10 | FIX | §9.2, §12.7 | S13 split: model-side candidates (zoom-independent) and view-side selection per zoom stop in the tile worker by local evaluation of the global priority greedy (≤ 2 ms per stop for ≤ 2 000 visible candidates); addresses and street names only for visible tiles |
| SCL-14 | FIX | §11.1 (SVG row), §12.7 | SVG export at the city band by default; compound paths per (semantic, district) with an id side table; trees as one path per green entity; ≤ 650 B per building and ≤ 60 000 elements at METROPOLIS; scripted Inkscape open check |
| SCL-15 | FIX | §12.1 | reference hardware = the capture machine (Apple M1, 8 cores, Chrome stable / Node 24); named low-end device; calibration benchmark normalises CI timings; each budget states where it is measured |
| SCL-17 | FIX | §12.5 | one first-map target per rung on the default Canvas2D backend (≤ 150 ms / 400 ms / 1 s); no rung depends on WebGL2 |
| VIS-1 | FIX | §8.2, §8.3, §8.5 | symbolisation table per semantic × band in m or paper px (no "u"); ink rows calibrated on MFCG's metre export at matched view scale; walls drawn after footprints and clipped inward to the setback; outlines thin by band; sub-floor footprints through masses; census ± 15 % and outline share ≤ 25 % |
| VIS-2 | FIX | §8.2 | roles `road`, `ground`, `court`, `garden`, `field`, `verge` added with our own values; pairwise ΔE2000 / ΔL* matrix replaces the luminance rule, checked on palettes (100 % of random styles) and on rendered city-band images |
| VIS-3 | FIX | §8.5 | city-band ways chosen by access need: every way that is a plot's only access and is not bounded by continuous frontage is drawn with a lane symbol; metric ≥ 95 % |
| VIS-4 | FIX | §9.4 | label legibility floor in px (area labels cap ≥ 7 px); quarter labels from a model-side merge tree; declared overflow ≤ 20 %; acceptance ≥ 12 on-map area labels per rung at the default view |
| VIS-5 | FIX (duplicate of LC-20) | §8.10 | as LC-20; crown shape, colour jitter and hatch phase keyed by (entity, ordinal) |
| VIS-6 | FIX (duplicate of SCL-7) | §8.8, §12.5 | as SCL-7; views settle on exact zoom stops, so hairlines and casings are exact at every settled view; hairline-fidelity check |
| VIS-7 | FIX | §8.2, §8.9 | `lit` specified as Canvas2D-runnable programs (tinted pattern textures, per-face directional tones, vector penumbra shadows with `penumbraPx`, pre-shaded crown sprites, field-raster water ramps and foam); Canvas2D is the reference backend of every preset; WebGL2 only composites Canvas2D tiles; our procedural texture set listed |
| VIS-9 | FIX | §8.2, §8.6 | every shipped family defines all four bands with invariant roles; detail cross-faded over the hysteresis interval; role-continuity check ΔE2000 < 2 |
| VIS-12 | FIX | §8.1, §8.2 | `field` mark kind with a raster geometry; hillshade, depth ramps and beach bands are programs over it |
| VIS-13 | FIX | §8.1, §8.2 | S14 emits shore marks per bank segment with `bankKind`, `waterKind`, `exposure`; foam, beach, cliff and quay programs select on them; census: foam on 0 % of quay and sheltered segments |
| VIS-14 | FIX | §8.5 | avenues are not drawn at the city band; check: no tree mark covers a tier-1/2 casing at the city band |
| VIS-15 | FIX | §9.4 | halo role = the role of the area mark under each glyph, looked up in the display-list index |
| VIS-16 | FIX | §8.2, §8.3 | order parity = the recorded order is a subsequence of the preset's order and each added semantic has a declared slot with a reason; NG's no-ridge-stroke and footprint-only outline checks and MFCG's walls-after-buildings rule added |
| VIS-17 | FIX | §8.4 | per-layer occlusion mode (opaque, ghost, offset view) in `LayerSpec`; island placement rule requested from pipeline (§3) |
| VIS-18 | FIX (duplicate of SCL-14) | §11.1, §12.7 | as SCL-14 |
| MFP-1 | FIX | §8.5, §8.2, §8.3 | city-band figure-ground contract: blocks in the `ground` role, footprints as masses, streets and squares the only `road` voids; the one-click first paint is the complete city band; street-edge recoverability and contrast metrics with kerb hairlines as the pre-decided fallback |
| MFP-5 | FIX | §12.2, §12.3, §12.9 | speed bars re-anchored at matched building counts (MFCG sizes 40 / 80 / 130: 57 / 131 / 156 ms); per-building budgets stated; the 1.8–5.1× model-time trade (≈ 2–3× to first map) declared with its reason; population cap above METROPOLIS; B-REF row requested (the finding's 13 349–36 480 size-80 counts came from cities with extra options — corrected per MN-1) |
| FTG-12 | FIX | §11.3 | the host is the store: `doc.load`, `doc.apply {baseStateId}` (accept or reject-and-rebase), `doc.changed`, `stateId` = hash(document id, log length, last event hash), version handshake, a view-state section outside the model hash with last-writer-wins, viewer role; convergence test |
| COV-MFCG-A06 | FIX | §9.5 | content-weighted framing: walled stage ∪ the 95th-percentile footprint radius, no letterbox; the same frame for exports unless set |
| COV-MFCG-J04 | FIX | §9.5 | gazetteer legend panel (title, numbered districts, lettered landmarks, scale bar, emblem), any corner or free position, border styles, units, three label modes |
| COV-MFCG-K06 | FIX | §8.2, §8.4 | ink's `raised` offset under-copy is on by default; only the projected shadow pass is off |
| COV-MFCG-K12 | FIX | §8.2 | `tint` program keyed by district (spectrum / brightness / overlay, strength, neighbours ≥ 30° apart by graph colouring) and per-roof weathering |
| COV-MFCG-K16 | FIX | §8.2 | ink order with trees after fields and before walls, forest over tracks |
| COV-MFCG-L10 | FIX | §9.5 | measure tool (distance and area, metres / feet, snapping to ways and faces) in furniture and `@plat/app` |
| COV-MFCG-M06 | FIX | §9.5 | emblem slot now: import (sanitised SVG / PNG) plus a minimal own procedural emblem; off by default |
| COV-VG-VN-029 | FIX | §8.2 | relief tier in the base (contour, hachure and grass marks extracted per render tile), optional and off by default; scope reconciles §15.1 / §16 / PART III (§3) |
| COV-VG-VN-031 | FIX | §8.2 | `hillshade(sun, strength)` over the terrain `field` mark, water exempt, strength from the shadow role; M2 slot requested (§3) |
| COV-VG-VN-158 | FIX | §11.1, §8.10 | GeoJSON, glTF and CityJSON instance trees from the same stamp function (seeded, reproducible, never stored) |
| COV-NG-XB08 | FIX | §9.5 | compass auto-placement by an occlusion score over eight frame positions, away from the centre; manual placement and rotation as view state |
| COV-NG-XB15 | FIX | §9.5 | grid kinds none / square / hex / mesh, cell size in metres or feet, colour role, skip-water option |
| COV-NG-XB17 | FIX | §8.2 | multi-colour pick rule: per individual by hash(style, role, entity[, ordinal]); aggregate fills take index 0 |
| COV-NG-XB32 | FIX (duplicate of COV-VG-VN-158) | §11.1 | as VN-158 |
| COV-FTG-I05 | FIX | §8.2 | `feather(widthM)` edge program as vector bands (no bitmap blur) for fields bordering open ground; on in `lit` |
| COV-FTG-K05 | FIX | §8.4 | `Sun` record and `sunPath(latitude, day, hour)`; view-state time drives an optional moving sun; night below −6° |
| COV-FTG-K06 | FIX | §8.2 | season and weather as view-state inputs selecting thematic override rows (deciduous re-skin, snow overlay with roads kept legible, overcast removes projected shadows) |
| COV-FTG-K07 | FIX | §8.2, §8.9 | `post` operations per tile (greyscale, sepia, tint, vignette, pixelate, dot screen, scanline, crosshatch-noise) on Canvas2D, PNG and the compositor; SVG carries the colour-matrix subset |
| COV-FTG-K13 | FIX | §8.2 | live layers through a `LiveLayerProvider` (favourite people from the module's occupancy, favourite buildings from view state) |
| COV-FTG-L08 | FIX (duplicate of COV-MFCG-L10) | §9.5 | as L10 |
| COV-FTG-N06 | FIX | §11.3 | transport-agnostic bridge (window postMessage and MessagePort transports) so any relay can carry it; static VTT exports for iframe-less hosts; no Roll20 extension built (decision recorded) |
| COV-FTG-N07 | FIX | §11.5 | `DocResolver` interface for `&doc=` links and publishing, viewer / editor / owner roles enforced by client and host; no hosted service (decision) |
| COV-VG-WC5 | FIX | §8.4 | shadow casters listed: buildings, wings, towers, walls, gatehouses, bridges, piers, trees, sky islands |
| COV-FTG-OBS5 | FIX | §12.9 | FTG comparator cites part 2: server 2.9–3.2 s, scene built 6.4–7.0 s after the click, loading a finished settlement 2.0 s busy |
| MN-1 | FIX | §12.2, §12.9, §8.2 | matched sizes and counts from the size sweep; MFCG's GeoJSON is in metres and only its SVG uses 4 m units; the size-80 15 392-building city is the options-confounded one |
| DEF-4 | FIX | §11.1 (VTT row) | the dd2vtt profile specified: format, grid units, line of sight from walls / footprints / yard walls, portals from entrances and gates, lights, embedded PNG, scene scope and size cap with splitting |
| DEF-5 | FIX | §11.1 (3-D row) | CityJSON 2.0 exporter built (integer vertices with a transform carry our centimetre lattice losslessly); D-8 amended (§3) |
| DEF-6 | FIX | §8.9 | no SDF text: every backend draws text into Canvas2D label tiles (the WebGL2 compositor uploads them); measured at M1 with a glyph-atlas fallback |
| DEF-11 | FIX | §11.4 | generic host-input contract decided (blueprint fields, events, tables copied with provenance `host`, providers double-run-checked and recorded); the SettlementForge mapping stays staged by the owner behind it |
| DEF-12 | FIX | §11.5 | decision: no hosted sync service in the product; the host-as-store bridge and the resolver provide sync and sharing |

**Counts.** 64 items: 64 FIX (6 of them duplicates fixed with their primary), 0 INVALID, 0 STAGED-BY-OWNER. VIS-17 and
COV-FTG-K13 touch owner-staged subjects (sky islands; the simulation module) but ask only for hooks, which are written
in full here, so they are FIXED rather than staged.

## 2. Replacement blocks

=== REPLACE §8 Rendering and the style system — the section heading and its *In plain words* paragraph (the text before 8.1) ===

## §8 Rendering and the style system

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

*In plain words.* The town is turned into one list of drawing instructions — "fill this block with the ground colour",
"stroke this street with a casing", "draw this roof with hatching" — that every output uses: the screen, SVG, PNG,
print and 3-D exports. A style sheet is a data file that says how each kind of thing is painted, so the same town can
look like MFCG's clean ink map, FTG's lit textured map or Neighbourhood's hatched close-up, and new looks are files, not
code. At city zoom the map must read the way MFCG's does even though our blocks hold plots and yards rather than solid
lots: blocks get their own ground tone so streets and squares are the only paper-coloured gaps, walls, towers and gates
are drawn at a legible symbol size taken from a table (the model keeps their real sizes), and houses too small to see
are drawn as merged masses. Zooming uses a pyramid of picture tiles, so lines stay crisp and nothing is recomputed;
trees keep their places at every zoom and can be moved one by one. One renderer (the browser's 2-D canvas) draws every
look, including the textured lit look, so the screen, a PNG and a printed poster agree. The list also carries layers
and heights, so the owner-staged sewer layer can be shown through the ground and floating islands can cast shadows
onto it (the hooks are §8.4's).

=== REPLACE 8.1 The display list (renderer-independent) ===

### 8.1 The display list (renderer-independent, columnar, incremental)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

```ts
type LodBand = 'city'|'district'|'neighbourhood'|'building';
type MarkKind = 'area'|'ribbon'|'outline'|'hatch'|'glyph'|'text'|'instances'|'shadow'|'field'|'shore';
// one row per mark; every column is a typed array, so any slice is transferable (§8.9)
interface MarkTable {
  count: number;
  kind: Uint8Array;                    // MarkKind index
  semantic: Uint16Array;               // index into DisplayList.semantics ('water.sea', 'ground.block', 'way.primary', 'building.footprint', 'shore.segment', …)
  entity: Uint32Array;                 // interned entity handle (§2.1)
  layer: Uint8Array; z: Int32Array;
  lodMask: Uint8Array;                 // one bit per LodBand in which the mark exists; geometry never changes with the band
  pass: Uint8Array;                    // 0 fills · 1 casings · 2 bodies · 3 linework and symbols · 4 overlay — the global program order (§8.8)
  group: Uint32Array;                  // district handle: the unit of delivery and invalidation, never a raster cache unit
  bbox: Int32Array;                    // 4 per mark, world cm
  geomStart: Uint32Array; geomLen: Uint32Array;   // into GeomTable (face rings, chain, point set, text spine) or FieldRaster ids
  revision: Uint32Array;               // content revision of the entity's inputs (low 32 bits of its §6 digest) — the cache key (LC-23)
  attrs: Record<string, Float32Array | Uint32Array>;   // named columns: heightCm, baseCm, prosperity, class, bankKind, waterKind, exposure, material, tintKey, instanceKey, …
}
interface GeomTable { rings: Uint32Array /* ring start offsets into coords */; coords: Int32Array /* x, y cm pairs */ }
interface FieldRaster { id: number; originX: Cm; originY: Cm; cellCm: Cm; cols: number; rows: number;
  values: Float32Array | Int16Array; meaning: 'heightCm'|'shoreDistanceCm'|'depthCm'|'custom' }
interface DisplayList { marks: MarkTable; geom: GeomTable; rasters: FieldRaster[]; semantics: string[]; layers: LayerSpec[]; bounds: Box; version: number }
interface DisplayDelta { version: number; groups: number[]; removed: Uint32Array /* entity handles */; marks: MarkTable; geom: GeomTable; dirty: Box[] }
interface DisplayListBuilder {                                   // S14; runs in the generation worker on the read-only model
  build(model: ModelView, band: LodBand): DisplayList;          // full build: generation, load
  update(model: ModelView, changed: Set<EntityHandle>, band: LodBand): DisplayDelta;   // edits, scoped regeneration
}
```

1. **Built by S14 from the model through the entity registry** (each type → marks per band); backends never read the
   model. Footprint geometry is identical in every band (O12 a; O17 i); only which marks are emitted and which programs
   run change.
2. **Kinds added.** `field` marks carry a raster in world space (terrain height for hillshade and contour marks,
   distance to shore for water ramps and foam, depth) and cost nothing when no program reads them (VIS-12). `shore`
   marks are chains, one per maximal run of equal attributes along a water face's boundary, with the attributes
   `bankKind` (§2.3), `waterKind` (the water body's kind), `exposure` and, when S1 provides it, `shoreForm` (bay /
   headland / straight); `exposure` = `sheltered` when the segment bounds a harbour basin, moat, canal or pond or when its
   fetch (the longest straight run across water within ± 30° of the outward normal) is below 300 m, `river` for river and
   tributary faces, else `open` (VIS-13). `instances` marks carry a face or chain plus the entity's instance key; their
   points are generated at raster time by §8.10, never stored in the list.
3. **Group and pass.** `group` is the district and is used only to deliver and to invalidate; rasters are cached per
   world-aligned tile (§8.8), never per district. `pass` fixes one global order across the whole scene — every fill,
   then every casing of every ribbon drawn at the band, then every body, then linework and symbols — so no district's
   drawing can put a casing over another district's body (GEO-28).
4. **Incremental.** After an edit or a scoped regeneration the builder receives the changed entity handles (the
   locality closure of §7.3) and emits a `DisplayDelta`: removed marks, new marks for changed entities and for the
   entities whose marks depend on them (a way's marks when a junction on it moved; a district's ground mark when a block
   in it changed), and the dirty world boxes = the old and new marks' bboxes dilated by the largest cross-tile effect
   (§8.8). Cost O(changed marks). During a replay (loading a log, undo beyond the scoped records, migration) the builder
   is suppressed and runs once at the end (SCL-9).
5. **Cache keys.** Every derived artefact — roof geometry, label spine, footprint mass, instance set, tile raster, glyph
   run — is keyed by (entity handle or tile address, content revision, band, style version, roof construction where it
   applies), never by id alone (LC-23): a `setAttr` on floors changes the building's revision and so its roof; a changed
   boundary street dirties the region on both of its sides.
6. **Size.** ≈ 24 B per mark in the fixed columns plus geometry: a CITY city band of ≈ 60 000 marks is ≈ 1.5 MB of
   columns and ≈ 4 MB of coordinates.

Chose a columnar, transferable mark table over `Mark[]` objects because a 60 000-object list costs the receiving thread
≈ 140 ms to deserialise (redteam-scale §7.3) while typed arrays transfer in constant time and slice cheaply into deltas;
chose world-aligned tile rasters over per-district rasters because district boundaries are streets (GEO-28) and a
district bitmap cannot follow continuous zoom (SCL-7).

=== REPLACE 8.2 Style sheets as data: paint programs, presets, layer order, thematic layers (G-R2) ===

### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

A style sheet maps (semantic, attribute predicates, band) to **paint programs**, over a palette of **roles** and a
**symbolisation table**:

```ts
interface StyleSheet {
  id: string; version: string; family: 'ink'|'lit'|'hatched'|'painterly'|'graphic';
  palette: Record<Role, Color | Color[]>;                               // multi-colour roles: the pick rule below
  symbols: Record<string /* semantic */, Partial<Record<LodBand, Symbolisation>>>;
  order: Record<LodBand, OrderSlot[]>;                                   // draw order per band, with reasons
  programs: Record<string /* semantic */, Partial<Record<LodBand, PaintProgram[]>>>;
  roofConstruction: 'plain'|'skeletonHip'|'skeletonGable'|'fakeGablePerWing';   // over stored wings (§2.6)
  labels: LabelStyle;                                                    // faces, floors, halo rule (§9.4)
  shadows: { projected: 'off'|'drop'|'prism'; penumbraPx: number; sun: SunSpec;
             raised: { on: boolean; offsetM: [number, number]; minPx: number; maxPx: number } };
  overrides: ThematicRow[];                                              // thematic layers, materials, season, weather, tints
  post: PostOp[];                                                        // per-tile post operations
  budgets: Record<LodBand, DetailBudget>;
  referenceBackend: 'canvas2d';                                          // every shipped preset (§8.9)
}
interface Symbolisation { mode: 'model'|'paper'; k?: number /* drawn = k × model width */; minPx?: number; maxPx?: number; px?: number /* paper width at 1× */ }
interface OrderSlot { semantic: string; reason: string; recordedAs?: string /* the reference step it matches, for order parity (§8.3) */ }
```

**Roles.** `paper` (margin and background), `road` (way bodies, squares, bridges — equal to `paper` in the ink family,
so streets are negative space), `ground` (built-block ground, yards at the city band, settled ground), `court` (enclosed
in-block courts), `garden` (private planted yard parts), `green` (parks, greens, commons, churchyards), `tree`, `field`,
`verge`, `water`, `building`, `roof`, `wall`, `ink` (every outline and text), `label`, `shadow`, `ambience`, `light`,
`sand`, `plank`, `grid`, `snow`, `lights`. A role never changes meaning across the bands or the presets of one family.
The reference schemas (MFCG 13 keys, NG 26, VG 40) map onto this set without loss.

**Contrast matrix (replaces the luminance rule; O12 f).** Pairs that must separate at the city band, with floors on
CIEDE2000 and on the lightness difference:

| pair | ΔE2000 ≥ | ΔL* ≥ |
|---|---|---|
| road / ground | 6 | 5 |
| ground / building | 12 | 12 |
| road / building | 15 | 15 |
| garden / building; green / building | 10 | — |
| tree / water | 10 | — |
| green / road; tree / green | 8 | — |
| water / road; water / ground | 8 | — |
| wall / water | 20 | — |
| field / road; field / ground; court / road | 4 | — |
| court / ground | 3 | — |
| ink / road; ink / ground (text and outlines) | 40 | 50 |

Checked (1) on every palette when it is loaded — built-in, user-edited or random: a random style that fails is repaired
by raising the lighter role's L* in steps of 1 until every pair passes; a user edit that fails is shown with the failing
pair and kept only with an explicit "accept low contrast" flag recorded in the report — and (2) on rendered city-band
images in B-ZOOM: the mean CIELAB of the pixels whose top mark has each role (read from the pick buffer), for every pair
present in the view. MFCG's default palette has garden = building (ΔE2000 0.6) and tree = water (0.0); both are recorded
as reference weaknesses not to copy (VIS-2).

**Role values (our own; PLAT 2026-09-25; calibratable table rows).** Every pair of the matrix was computed on these sRGB
values and passes its floor (computed for `docs/validation/fix-all/r1-rendering.md` §0; e.g. ink road/ground 6.9 / 10.0, ground/building 16.1 / 21.1,
tree/water 20.7, court/ground 4.2):

| role | `ink` (default) | `lit` | `hatched` |
|---|---|---|---|
| paper | `#F6EDDE` | `#DED6CC` | `#D4CABF` |
| road | `#F6EDDE` (= paper) | `#D8D0C8` | `#B6A99B` |
| ground | `#DED0BB` | `#CBB9A2` | `#D4CABF` (= paper) |
| court | `#ECE0C6` | `#D1C5B2` | `#B7B898` |
| building / roof (lit side) | `#A49689` | `#AD8A72` | `#9D7D68` |
| ink / label | `#292522` | `#46392F` | `#322B25` |
| wall | `#34302B` | `#857A6E` | `#685C51` |
| water | `#AABBC5` | `#6D9CB9` | `#98AFBB` |
| green | `#BCC8AB` | `#9AB37F` | `#B0B48C` |
| garden | `#C7CCAF` | `#8EA96D` | `#A8AF83` |
| tree | `#7E907A` | `#5B7A4F` | `#798C67` |
| field | `#ECDFBD` | `#D8BE89` | `#E5D6B5` |
| verge | `#D9DCC5` | `#ADBB95` | `#BBBEA1` |
| shadow | ink at α 0.35 | ink at α 0.45 | ink at α 0.40 |

The ink family keeps its character by value steps: eight visible tones at the city band (paper, ground, building, ink,
water, green, tree, field), no role with CIELAB chroma above 18 (IMPROVEMENTS O12 restraint: one ink, 4–8 roles). Chose
low-chroma value steps over saturated hues for the default because the restraint clause asks for one ink and a few
roles, and eight tones meet every floor.

**Symbolisation table (VIS-1).** Drawn width in px = clamp(k × model width × px per metre, minPx, maxPx) in `model`
mode, or a fixed paper width at 1× (times the device pixel ratio) in `paper` mode; no length is written in any
reference's private unit. Exaggeration never enters the model, GeoJSON, VTT, glTF or CityJSON (they carry model widths);
styled SVG and PNG carry drawn widths. The `ink` rows are calibrated on MFCG's metre-unit export at the matched view
scale (MFCG size 40 at 0.816 px/m, 1.23 m/px): MFCG draws walls 7.6 m wide, towers 15.2 m across, road cores 8 m and
piers 4.8 m; its SVG writes the same numbers in its 4 m internal unit (wall 1.9, road 2) (MN-1, MFP-8).

| semantic | bands | mode | rule | at MFCG size 40's scale |
|---|---|---|---|---|
| `wall.curtain` | city, district | model | k = 3 on the band thickness (2.5 m → 7.5 m), minPx 2, maxPx 12 | ≈ 6.1 px (MFCG 6.2) |
| `wall.tower` | city, district | model | diameter = 2 × the drawn wall width, never below the model diameter | ≈ 12.2 px (MFCG 12.4) |
| `wall.gate` | city, district | model | a gap in the wall stroke = max(model opening, 1.2 × drawn wall), flanked by two square blocks of side 2 × drawn wall | ≈ 12 px blocks |
| `way.through`, `way.primary` body | all | model | k = 1, minPx 1.5 | 8 m core ≈ 6.5 px |
| `way.secondary`, lane symbol body | city | model | k = 1, minPx 1 | — |
| way casing | all | paper | h = 0.5 px each side (casing = body + 2h) | — |
| `way.pier`, bridge deck | city, district | model | k = 1, minPx 1 | 4.8 m ≈ 3.9 px |
| building outline | city | paper | 0.5 px × clamp(s ÷ 8, ⅓, 1), s = the median footprint side in px at the zoom stop — outlines thin, then hold at one third (MFCG's Thin lines made a law) | — |
| building outline | district and finer | paper | 0.5 px | — |
| raised under-copy offset | city, district | model | (+0.4 m, −1.0 m) east / north, drawn length clamped to [0.3 px, 2.5 px] | — |
| boundary treatment (fence, hedge, yard wall, railing) | district and finer | paper | ≤ ½ of the building outline weight, never filled, gaps at gates | — |
| minimum feature | all | — | 2 px, met by masses and settlement dots (§8.5), never by enlarging one footprint | — |

Curtain walls draw after footprints (the order below) and the wall symbol is clipped on its inner side to the band's
inner edge minus the setback, so the exaggerated symbol overhangs only outward (over the ditch or glacis) and never
covers a plot.

**Paint programs (the vocabulary).** `fill`; `stroke(width by symbolisation, join, cap)`; `casing(w, h)` (ink at
`w + 2h` in the casing pass, body at `w` in the body pass — MFCG's most reusable trick); `bands(N, W, exponent, ramp)`
(VG's water law); `raised(offset)` (the constant-offset under-copy); `shadowPass(mode, colour, alpha, penumbraPx)`
(projected shadows, §8.4); `hatch(angle | ridge, pitch, taper)`; `roof(construction, dark = lit × lerp(ambience,
shadow, α))`; `crown(library)`; `halo(role rule)` (§9.4); `glyphAlongSpine`; `pattern(texture, tintRole, metresPerTile)`
(tinted seamless textures); `faceLight(dir)` (a per-face tone from the face normal and the light: roof faces from the
skeleton or the wings, wall sides); `ramp(field, stops)` (per-tile pixels from a field raster: water depth, terrain
colour); `hillshade(sun, strength)` (Lambert on bilinear-interpolated cell normals of the terrain field, water faces
masked, strength from the `shadow` role's alpha, multiply-composited after fills and way bodies and before buildings
and trees — VG's recipe without a blur); `contourMarks(levels, mode: contour | hachure | grass)`; `foam(widthM, alpha)`
(from the shore-distance field on `open` segments, half alpha on `river`, none on `sheltered` and `quay`);
`feather(widthM)` (three inset vector bands at α ⅔, ⅓, 0 toward open ground — no bitmap blur; COV-FTG-I05);
`outlineMix(factor)`; `tint(method, strength)`; `weathering(amplitude)`; `instances(library)` (§8.10); `vignette`;
`ruin` (outline dashed by an entity-keyed pattern, fill at 30 % alpha, rubble stipple — the hook for the owner-staged
ruined state); `symbol(glyph)` (point symbols: tent, stall, well, fountain, large tree, cross, shrine, pump, gallows,
fire pit, lamp post). Lane ends: a lane's body and casing end square at the kerb of the way it meets; the junction wedge
belongs to the higher-class way (the renderer half of GEO-21). Hairlines and casings are in paper px; ribbons and
symbols follow the symbolisation table — MFCG's two coordinate spaces, now stated.

**Relief tier (VN-029, VN-031; base should-have, optional, off by default).** Contour, hachure and grass marks are
extracted per render tile from the terrain `field` mark by marching squares over the tile's cells plus a margin, then
resampled evenly along each level line (`contourMarks`); `hillshade` runs on the same field. VG-specific looks (its
spotlight vignette and dramatic forest) stay in the reserved `painterly` family.

**Multi-colour roles (XB17).** A role may hold a list; an individual mark (a building, a roof, a tree, a stall) takes
index `hash(style id, role, entity handle[, instance ordinal]) mod n`; aggregate fills (block ground, city-band masses,
wood fills) take index 0. Deterministic, so two renders of one model are pixel-identical (§6.2).

**Tints and weathering (K12).** `tint`: per district a hue from a greedy colouring of the district adjacency graph in
id order (hue = base + 137.5° × colour index, stepped by 30° until every neighbour differs by ≥ 30°); method `spectrum`
(hue at fixed saturation and value), `brightness` (value scaled) or `overlay` (blend toward the hue), strength 0–1;
applied to the roofs of built districts; outlines take lerp(ink, tint, 0.3); recomputed when the palette changes; off in
`ink` by default. `weathering`: each roof's RGB scaled by 1 + u·w, u ∈ [−1, 1] from hash(entity), w = 0.04 (ink), 0.06
(hatched), 0.08 (lit).

**Materials, season, weather (COV-FTG-F20, K06).** Override rows may key roof and wall colours by `roof.material` and the
enceinte's wall material. The view state (§11.3) carries `season` ∈ {spring, summer, autumn, winter} and `weather` ∈
{clear, overcast, snow}; they select override rows: autumn and winter re-skin deciduous crowns (by the instance's
`leafType`, deciduous when absent) through role variants (`tree@autumn`; winter uses a bare-crown symbol); snow lays the
`snow` role over ground, fields and roofs while `road` keeps its value, so streets stay legible; overcast turns the
projected shadow pass off (the raised under-copy stays). Nothing in the model changes and the model hash is untouched.

**Post operations (K07).** `post` lists operations applied once per tile after its marks: `greyscale`, `sepia`,
`tint(colour, strength)`, `vignette` (on the view), `pixelate(cellPx)`, `dotScreen(cellPx, angle)`,
`scanline(periodPx, alpha)`, `crosshatchNoise(periodPx, alpha)`; Canvas2D on the tile's pixels in the tile worker
(≈ 1–2 ms per 512² tile); PNG export applies the same operations per tile; SVG carries greyscale, sepia and tint as
colour-matrix filters and omits the pixel operations, which the export report lists. This replaces the "WebGL2 post
hooks" pointer.

**Live layers (K13).** `interface LiveLayerProvider { id: string; marks(view: ViewState, model: ModelView, tile: TileAddress): MarkTable }`
adds display-list groups that are view data (never in the model hash): `live.selection`, `live.favourites` (favourite
buildings as a thematic override keyed by the view state's `favourites`) and, registered by the simulation module,
`live.people` (favourite persons' positions from the module's occupancy at the view-state hour, one categorical colour
per person). Providers run in the tile worker for the tiles they touch.

**Thematic layers.** FTG D7's matchers are override rows keyed by entity attributes (`prosperity`, `use`, `epoch`,
`owner`, `material`) — data, not code.

**Layer order (data; `ink` shown; the same list serves the city and district bands).** Each slot names its reason and
the reference step it matches; MFCG's recorded order (water → road casing → road body → river → landmarks → wards →
piers → fields → walls → towers → grid → scale bar → compass → labels → title) is a subsequence (order parity, §8.3):

| # | slot | reason |
|---|---|---|
| 1 | paper | background; streets and squares are paper by omission |
| 2 | water | MFCG: water |
| 3 | ground.block | new: the figure-ground contract (§8.5) |
| 4 | relief (hillshade, contour marks; off by default) | new: under everything built (VG) |
| 5 | way casings, every class drawn at the band | MFCG: road casing |
| 6 | way bodies | MFCG: road body |
| 7 | river casing and body | MFCG: river |
| 8 | shore marks | new: on the water edge, after water and river |
| 9 | greens, parks, yard parts by role | new: the plot model |
| 10 | projected shadows (off by default) | new: shadows after roads, before buildings (NG) |
| 11 | raised under-copy | part of MFCG's building draw |
| 12 | landmark footprints (solid ink) | MFCG: landmarks |
| 13 | building masses / footprints / roof detail | MFCG: wards |
| 14 | piers and bridges | MFCG: piers |
| 15 | fields and hinterland land use | MFCG: fields |
| 16 | trees: wood fills and crowns | MFCG's recorded tree slot: after fields, before walls; woods may cover track casings (K16) |
| 17 | boundary treatments (district band) | new: yard walls and fences over yards, under curtain walls |
| 18 | curtain walls | MFCG: walls, after buildings |
| 19 | towers and gate blocks | MFCG: towers |
| 20 | grid | MFCG: grid |
| 21 | scale bar | MFCG: scale bar |
| 22 | compass | MFCG: compass |
| 23 | labels (label tiles, §8.8) | MFCG: labels |
| 24 | title, legend, emblem | MFCG: title |
| 25 | live layers, annotations, measure overlay | new: view data on top |

NG's recorded order (greens → roads → shadows → buildings → props → trees depth-sorted → title) is the `hatched`
sheet's, again a subsequence of its slots. "Every casing before any body" holds across the scene through the pass column
(§8.1).

**Presets — each family defines all four bands with invariant roles (VIS-9).** Detail is added band by band, never
re-coloured; added detail cross-fades over the band's hysteresis interval (α 0 → 1 across it); B-ZOOM checks role
continuity (mean roof and mean ground colour ΔE2000 < 2 across every band switch within a family).

| family | city | district | neighbourhood | building (stage-3 hook) |
|---|---|---|---|---|
| **`ink`** (default; MFCG family) | figure-ground contract (§8.5), masses, symbolised walls / towers / gates, raised under-copy on (K06; the projected pass stays off), casings `w + 2h` with round joins and caps, hairline furrows, quarter and district labels in letter-spaced small caps, grid, scale bar with old-style figures, 8-ray compass | footprints with thin outlines, yards by role, boundary treatments, every way stroked, way names, library crowns | an ink close-up: ridge hairlines by the roof construction (`skeletonHip` by default), tapered ticks in the ink role at α 0.5 on the roof colour, prism shadows at ink α 0.25 when shadows are on, cobbles as ink stipple, pins as ink symbols, every named way labelled | wings and rooms as ink outlines |
| **`lit`** (FTG family; second preset) | tinted pattern textures at city scale, flat roof tones, raised under-copy with a 2-px penumbra, filled corridors in `road` over `ground` | + `faceLight` on roofs, soft projected shadows when on, hedgerow instances along field bounds, stone-patterned wall band with tower nodes, harbour basin tone with pontoon bars, water `ramp` and `foam` | + pre-shaded crowns per instance, depth-sorted trees, props | wings with per-face light |
| **`hatched`** (NG family; the stage-2 close-up) | masses in the lit roof tone, ground = paper, the street stripe in `road`, wood fills | two-tone roofs by `fakeGablePerWing` | tapered-triangle hatching from the ridge (≈ 17 per wing), one prism shadow pass, lobed crowns in two greens, depth-sorted trees, chimneys and wells | per-wing hatching |
| `parchment`, `bw-print`, `night` | ink-family variants: parchment texture role; monochrome; `lights` role with glow instances | same | same | same |
| `painterly` (reserved; VG family for the village product) | colour ramps, water bands, relief tier on, spotlight vignette, selective outlining | same | same | same |

Faces follow §17's font ruling; small caps and old-style figures come from the font's own substitution tables (§9.2).

**`lit` on the reference backend (VIS-7).** Every `lit` program runs on Canvas2D: textures are `pattern` fills of
greyscale seamless tiles tinted by the role colour (multiply); lighting is `faceLight` per face from stored geometry,
one directional light from the sheet's sun; soft shadows are `shadowPass` polygons with `penumbraPx`: the shadow polygon
plus two outward offset rings at ½ and 1 penumbra with α ⅔ and ⅓ — vector, no bitmap filter, so Fantasy Manor's ≈ 90 %
bitmap-shadow cost is avoided; canopy shading is baked into the crown sprites once per session per light direction; the
water depth ramp and foam are `ramp` and `foam` over the shore-distance field, per tile (≈ 1.3 ms per 512² tile). The one
thing not drawn is per-pixel normal-map relief on roofs and walls; `lit` uses per-face tones plus texture instead, and
the style dialog says so. **Texture set** (our own, procedural: `tools/textures/` with fixed seeds; provenance = script
and seed; no third-party texture): tilled soil, grain, pasture, meadow, orchard ground, marsh, sand, pebble,
rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment — 15 greyscale 256 × 256 px
toroidal tiles (≈ 1 MB raw, ≈ 0.6 MB as PNG), metres per tile per band in the sheet; crop and livestock variants of the
arable and pasture tiles are chosen by `LandUse.crop` when present (VS27) and by the land-use kind otherwise; authored in
M2 (≈ 1 person-week). Chose Canvas2D as `lit`'s reference backend over WebGL2 because one drawing path keeps screen, PNG
and print identical (O12 c), removes the duplicate render path both creators warned about, and every part of the lit
look has a vector or per-tile raster form inside the tile budgets; normal-mapped relief is the only loss.

**Style constraints.** The contrast matrix above; the option-interaction matrix test (no option silently disables
another — MFCG's Block mode dropping trees); every preset survives a render with no fills and one with no outlines (R13).

=== REPLACE 8.3 Symbol catalogue and draw-style census ===

### 8.3 Symbol catalogue and draw-style census

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

**Catalogue.** Filled faces with hairline outlines; cased ribbons with square lane ends at kerbs; shore marks per bank
segment; repeated-offset shoreline bands; raised under-copies and prism shadows from heights; library crowns (20 per
class per style, §8.10); clipped hatching at a per-face angle and tapered ticks; one composited shadow pass per layer;
tinted pattern textures with per-face light; field-raster ramps, hillshade and contour / hachure marks; curved per-glyph
text with a role halo; point symbols (tent, stall, well, fountain, large tree, cross, shrine, pump, gallows, fire pit,
lamp post); screen-space furniture (§9.5). Every semantic visible at a band has exactly one registry glyph, from which
the legend is generated (O12 d).

**Draw-style census** (G-R2 / G-R18): a regression suite per preset, run on the golden suite (§13.3) and in B-ZOOM
(§13.4). Order parity is defined, not assumed: *the reference's recorded order is a subsequence of the preset's order,
and every semantic the reference never drew sits at a declared slot with a reason* (§8.2's `OrderSlot`s) (VIS-16).

| check | presets | pass |
|---|---|---|
| casing Δ = 2h on every ribbon, at every settled view | all | ± 0.1 px (hairline fidelity) |
| 0.5-px hairline ink coverage at 1× | ink | 50 % ± 10 % |
| round joins and caps | ink | ≥ 99.9 % |
| drawn wall, tower and road-core widths against MFCG at the matched scale (MFCG size 40, 0.816 px/m) | ink | within ± 15 % of 6.2 / 12.4 / 6.5 px |
| outline share of footprint pixels at the city band, default view, every rung | ink | ≤ 25 % |
| walls after buildings; wall-symbol pixels inside plots | ink | order holds; 0 pixels |
| order parity | all | subsequence and declared slots, as defined above |
| contrast matrix (§8.2) on the rendered city band | all | every pair present at or above its floors |
| foam on `quay` and `sheltered` shore segments | lit | 0 % |
| tree marks over a tier-1/2 casing at the city band | all | 0 pixels |
| casing pixels inside junction mouths on district boundaries | all | 0 |
| role continuity across band switches | each family | mean roof and ground ΔE2000 < 2 |
| decoration stability over a city → neighbourhood → city sweep | all | each instance appears at most once and keeps its position; an unchanged view re-renders pixel-identically |
| roof lines outside their footprint (the F-SKELETON plain downgrade) | all | 0 |
| per wing, `hatched` | hatched | hatch triangles 15–20; no ridge stroke; outline = footprint only (NG BG-3; N35) |
| two-tone roof law with our palette | hatched | dark = lit × lerp(ambience, shadow, α) within ± 0.02 (IMP-15) |
| water bands | painterly | band widths follow W · (i / N)^1.5 for our N and W within 1e-4 |
| label floors, counts, collisions | all | §9.4 |
| street-edge recoverability, access ways drawn | ink | §8.5 |

=== REPLACE 8.4 Layers, shadows, heights ===

### 8.4 Layers, shadows, heights

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

* **Layers** draw in `zOrder`: `underground` marks (sewers) through a cut-away mask or a translucent overlay; `sky` marks
  above, with their shadows projected onto the ground layer. `LayerSpec` gains an occlusion policy (VIS-17):

  ```ts
  interface LayerSpec { id: Layer; zOrder: number; elevationCm: Cm; visible: boolean; castsShadowOnto?: Layer; exportSeparately: boolean;
    occlusion: 'opaque'|'ghost'|'offset';   // how a sky layer treats the ground it covers
    ghostAlpha: number;                     // ghost: the covered ground shows through at this share (default 0.35)
    offsetPerMetre?: [number, number] }     // offset: the layer is drawn displaced by elevation × this screen vector (default [0, 0.25] px per m, up the screen) with a tether line to its ground footprint
  ```

  `opaque` hides the ground beneath; `ghost` (the default for `sky`) draws the layer at alpha 1 − g so the covered
  district stays readable; `offset` moves the whole layer clear of its footprint so the ground is fully visible. Where an
  island is placed (over water, fields or outskirts by default; over the built core only by assignment) is §4.2 / II.1's
  rule; B-ZOOM reports the ground area occluded by sky layers. The island generator itself is owner-staged; these fields
  are its hook.
* **Two different things, stated separately (K06).** The **raised under-copy** (`raised`) is MFCG's Raised: a dark copy
  of each footprint beneath it at one constant offset (§8.2's symbolisation row) — ON by default in `ink`, not a shadow
  and not height-dependent. **Projected shadows** (`ShadowPass(layer, sun)`) are height-derived and OFF by default
  (owner: shadows optional).
* **Shadow casters** (WC5): buildings and wings (prism from `baseCm` to eave and ridge), towers and gatehouses (prism),
  curtain walls (prism of the band), bridges and piers (deck prism over water, which VG draws), trees (crown offset by the
  crown height), sky layers (the island outline projected by `elevationCm`). Every caster projects along the sun vector
  from its base elevation (`baseCm`, FTG-13) onto the ground; the ground under a footprint lies within the plinth
  tolerance of FTG-13's invariant, so a flat projection from the base is exact to that tolerance. Shadows are unioned per
  layer and composited once per layer per tile. `drop` mode offsets each caster's footprint by height × cot(altitude)
  along the sun's azimuth; `prism` mode draws the swept prism; both from the same heights.
* **Sun (K05).** `SunSpec = { azimuthCdeg; altitudeCdeg; colour: Color; intensity: number; mode: 'fixed'|'path' }`;
  fixed by default (azimuth 315°, altitude 45°: light from the upper left); in `path` mode azimuth and altitude come from
  `sunPath(latitudeDeg, dayOfYear, hour)` (solar declination and hour angle, evaluated with `dmath`), driven by the
  view-state time (§11.3; the simulation module's clock when it runs), the hemisphere following the latitude's sign;
  below −6° the sheet switches to its night variant (`night` roles; `lights` glow instances from the module); shadow
  length is capped at 8 × height near sunrise and sunset. Shadows are vector, so there is no shadow-resolution setting.
* **Budget (AM-3).** The projected pass costs ≤ 20 % of a tile's raster time (vector offsets and one union per layer);
  Fantasy Manor's ≈ 90 % bitmap-shadow cost is avoided by construction, and `penumbraPx` (§8.2) is two vector rings, not
  a blur.
* **Heights** come from §2.6 for every building, wing, tower and roof, so shadows, glTF and CityJSON agree (O17 g).

=== REPLACE 8.5 Level of detail, backends, tiles, the worker ===

### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

**Bands.** **city** — water; block ground; footprint masses and landmarks; tier-1/2 ways cased and access-critical
lanes (below); symbolised walls, towers and gates; bridges; parks and greens ≥ 0.3 ha in `green`; wood fills; fields;
quarter and district labels, water, major landmarks, gates. **district** — footprints with outlines and entrances; yards
by role; boundary treatments; every way stroked; courts; greens; crowns; way names. **neighbourhood** — the family's
close-up (§8.2); every named way; addresses; pins; stage 2 composes here (§8.6). **building** — wings and rooms (stage 3).
Way tiers: tier 1 = `through`, `primary`; tier 2 = `secondary`, `quay`; tier 3 = `lane`, `cul_de_sac`, `alley`, `track`,
`path`; `pier`, `bridge` and `ford` draw with their way. Continuous zoom selects the band with hysteresis (a band is
entered at its threshold stop and left one stop past it); added detail cross-fades across that interval; per-band
detail budgets by hardware tier; no feature pops more than once across a zoom sweep (B-ZOOM). Tiles, zoom stops and
backends are §8.8–§8.9; decoration is §8.10.

**The city-band figure-ground contract (MFP-1).**
1. Every L2 built block is filled with `ground` at every band; at the city band yards are not subdivided (parks and
   greens ≥ 0.3 ha show in `green`, enclosed courts in `court`), so inside the built area streets and squares are the only
   `road`-role voids.
2. Footprints are drawn over the ground as **masses** at the city band: per block, footprints are closed across gaps
   narrower than 1.5 px at the current zoom stop (offset by +r then −r with r = 0.75 px × metres per px, in the kernel's
   integer offset; cached per (block, stop, revision) in the tile worker), filled with `building` and outlined at the
   band's outline width; party lines between the footprints of one mass are drawn at one third of that width only where
   the footprint's short side is ≥ 4 px.
3. A mass smaller than (2 px)² that merged with nothing is drawn as a 2-px **settlement dot** in `building` with an ink
   rim — a symbol at the centroid, never an enlarged footprint (the 2-px floor of O12 a).
4. Access-critical lanes are drawn as below.

Metrics (B-ZOOM, city band, default view, every rung): **street-edge recoverability** — the share of intramural street
length (sampled every 2 px along corridor centrelines) that has a road / non-road transition within (half-width + 1 px)
on both sides — at least MFCG's value on its size-40 / 80 / 130 plain sweep renders measured at M1 with the same script,
less 0.03; road / ground contrast from the matrix (§8.2); gross footprint cover inside the walls reported next to MFCG's
0.60–0.64 (sizes 40–130) as information, not as a target (yards are the owner's plot-model ruling). **Pre-decided
fallback** if recoverability fails at M1: the ink city band adds kerb hairlines (0.25 px, `ink`) along every open
frontage run ≥ 6 m (detached, compound, hovel, vacant and green frontages) and the metric is re-run. Chose the ground
tone over kerb hairlines as the primary because a kerb line doubles the linework at city zoom and fights the casing
idiom, while a value step separates street from block the way FTG's paving tone and NG's street stripe do.

**Way selection at the city band (VIS-3).** Tiers 1–2 are always drawn. A tier-3 way is drawn when it is
**access-critical** — some plot has all its access edges on it and fronts no other drawn way — and is not **bounded** —
the footprint-covered share of frontage length on each of its sides is < 0.8. Access-critical lanes take the lane
symbol (body = max(model width, 1 px), casing h / 2); bounded intramural lanes and alleys stay unstroked gaps between
masses. Suburb offshoots, ribbon back lanes, farm tracks and extramural lanes are therefore drawn. Metric: the share of
plots at the city band whose access way is drawn or bounded ≥ 95 %.

**Line greenery at the city band (VIS-14).** Avenues and street trees are not drawn at the city band; they appear from
the district band, where a crown is ≥ 4 px. Check: no tree mark covers a tier-1/2 casing at the city band. Chose "not
drawn" over a thin green line inside the corridor because at city zoom a corridor is ≈ 2 px, where a line fuses with the
casing and adds a ninth tone.

**First paint.** The one-click first paint is the complete city band — S0–S13a for every district and S14's city band
— with no S9 block preview on the one-click path (SCL-4); lazy work is only what the city band does not draw: yard
sub-parts, entrances, roof ridges and hatching, street names and addresses (view data, §9), crowns and scatter (§8.10).
Proxy thumbnails (§7.8) draw S0–S4 marks in a distinct preview style and are never presented as the map. Chose no
preview over an S9 block preview because §12.5's first-map targets are met without one, and a preview's figure-ground
differs from the finished picture (MFP-1 item 4).

=== REPLACE 8.6 Stage-2 render tier and stage-3 LOD ===

### 8.6 Stage-2 render tier and stage-3 LOD

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

The neighbourhood band of every family (§8.2) is the stage-2 render tier (IMPROVEMENTS S5): `hatched` is NG's family,
and the stage-2 side-by-side against NG shows `hatched` with the `ink` close-up alongside, so a default-ink user who
opens a district sees the same palette with more detail (VIS-9). Close-up content (PART II) is derived lazily per
visible tile from the district's committed state and sub-seed; its marks enter the same mark tables and tile pyramid.
Stage 3 plugs in at the building band: its marks come from `BuildingGenerator.compose(…, 'wings' | 'rooms')`, computed
lazily per visible tile in the tile worker and cached by (entity, revision, lod); every other band draws the outline,
which equals the union of the composed wings by contract (SCL-13), so the footprint hash is the same at every band. Roof
construction (§8.2) runs per stored wing (VIS-10), and the derived-roof cache is keyed by (entity, revision,
construction), so switching from `ink`'s hipped roofs to `hatched`'s per-wing gables needs no regeneration.

=== REPLACE 8.7 Export resolution ===

### 8.7 Export resolution

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

SVG is resolution-free and layered, written at a declared band (the city band by default; §11.1). PNG and print render
by the band-streamed tile assembly of §8.8 at any DPI, with labels placed for the export's own scale (a zoom stop
computed at that scale, §9.2). Paper-unit rules keep hairlines at their paper width at every scale; symbol widths come
from the symbolisation table at the export scale. VTT export declares a grid scale (default 1 square = 5 ft = 1.5 m at
100 px), produces exact pixel-per-cell output (grid alignment error 0 px per cell, O11 g) and carries model widths only.
A 100 m scale bar is accurate to 0.5 % at every zoom (O6 c).

=== INSERT AFTER 8.7 Export resolution ===

### 8.8 Tiles, zoom stops, print and the canvas budget

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

* **Pyramid.** Zoom stops at 2^¼ steps of scale (four per doubling) cover B-ZOOM's 1:50 000 → 1:500 in 27 stops. Tiles are
  512 × 512 device px and **world-aligned** per stop: tile (i, j) of stop k covers the world square starting at
  (i, j) × 512 × m_k ÷ dpr, where m_k is the stop's metres per device pixel and the origin is the world origin — so tiles
  are stable under panning and shared between views and exports at that stop.
* **Content (GEO-28).** A tile draws every mark whose bbox meets the tile dilated by a margin m = the largest of the
  casing half-width, the drawn wall half-width, the projected-shadow length, the largest crown radius and the halo width
  at the stop, in the global order: §8.2's slot order × §8.1's pass (all fills, then every casing, then every body, then
  linework and symbols). Each tile clips to its own square, so the same scene clipped on both sides of an edge yields the
  same pixels: no seams and no casing bar across a junction on a district boundary. Fills of one semantic within a tile
  are one `Path2D` with the non-zero rule (a union: no anti-aliasing seam between same-role neighbours); semantics
  declared `seamClose` (ground, masses, yard parts, the shadow union) also get a ½-px same-colour stroke underneath (NG's
  seam dilation). Render test: 0 casing pixels inside junction mouths on district boundaries.
* **Two tile layers per stop:** base tiles and label tiles (the label placement of that stop, §9.2), so a label edit or a
  label toggle never re-rasters the map.
* **Cache and invalidation (LC-23).** Tile key = (stop, i, j, layer, style version, the view-state switches that change
  pixels: season, weather, shadows, layer toggles, live layers); content version = the combination of the `revision`s
  of the marks drawn. A `DisplayDelta`'s dirty boxes invalidate every cached tile they meet, at every stop. Eviction is
  least-recently-used by bytes under a **canvas budget per hardware tier** — low 24 MB, mid 64 MB, high 128 MB (a
  512² tile is 1 MB) — which also counts the shadow and post-operation buffers; the low tier caps the device pixel ratio
  at 1.
* **Gestures (SCL-7, VIS-6).** During a pinch or wheel zoom the compositor shows the nearest cached stop's tiles scaled
  (GPU-composited bitmaps; label tiles scale with them, which keeps labels apart); 120 ms after the input stops the view
  animates (≤ 150 ms) to the nearest stop and the tile worker re-rasters the visible tiles centre-out, swapping each one
  in when ready. Panning composites cached tiles and shows newly exposed ones from the next coarser cached stop until they
  are rastered. Chose settling on exact 2^¼ stops over re-rastering at arbitrary scales because an arbitrary-scale raster
  defeats the cache and the per-stop label placement; the settled scale is within ± 9 % of the requested one, and every
  settled view has exact hairlines, exact casings and a collision-free label set.
* **Print and large PNG (O12 e).** Horizontal bands of tiles (512 device px high) are rendered at the export scale and
  each band's scanlines are streamed into the PNG encoder (row filters, then a zlib stream through the platform's
  `CompressionStream` in browsers and `zlib` in Node), written as IDAT chunks band by band. Peak canvas memory is one band
  (A2 at 300 dpi: 7 016 px × 512 px × 4 B ≈ 14 MB); no canvas is larger than a tile band. Per-layer transparent PNGs use
  the same path with the layer set restricted.
* **Warp preview (SCL-9).** While a warp brush is held, the moved L1 vertices are applied to a transient copy of the
  affected ways' and blocks' marks, and only the tiles meeting the brush's dirty box re-raster (≥ 30 fps for a brush
  radius ≤ 150 m at the district band). **Apply** commits the `warp` event (§7.1), whose invariants and re-derivation run
  then; **Discard** drops the copy — MFCG's staged warp, on our event model.

### 8.9 Backends, text, threads and the worker boundary

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

* **Canvas2D is the reference backend of every shipped preset** (`ink`, `lit`, `hatched` and their variants), running
  on an `OffscreenCanvas` in the tile worker; programs render typed-array paths, one `Path2D` per (program, semantic,
  variant) per tile, sprites by `drawImage`.
* **SVG** is written from the same display list (§11.1).
* **WebGL2 draws no marks.** It exists only as a **pre-decided fallback compositor** that uploads the Canvas2D-rastered
  tiles as textures, composites them with the view transform and runs the post operations as one fragment pass — so
  there is no stroke tessellation, no SDF text and no look that differs by backend (VIS-7). Measurement at M2: pan and
  zoom frame rates of the Canvas2D compositor on the reference and low-end devices at METROPOLIS scale (§12.5); the WebGL2
  compositor is enabled for a hardware tier only if the Canvas2D compositor misses ≥ 60 fps (reference) or ≥ 30 fps
  (low end) there.
* **Text (DEF-6).** All text is drawn by Canvas2D into label tiles, glyph by glyph at the positions computed from the
  bundled font's own metrics (§9.2), through a glyph atlas per (face, size, stop): each glyph is drawn once into the atlas
  and copied per placement; SVG writes the same per-glyph positions. Chose Canvas2D label tiles over SDF text because,
  once tiles are composited, text never needs to be drawn by the GPU, and one text path keeps text identical on every
  output. Measurement at M1: a label tile rasters in ≤ 3 ms at ≤ 150 glyph runs; pre-decided fallback: whole words cached
  as bitmaps per (text, size, stop) in the atlas.
* **Threads.** (1) The **generation worker** holds the document and the model and runs S0–S14. (2) The **derivation
  pool** — up to three workers — runs the per-district stages at every rung (§12.3; the merge protocol of §4.1). (3) The
  **tile worker** rasters tiles, runs label placement (S13b), generates decoration instances (§8.10), live layers and post
  operations. (4) The **main thread** runs the UI, compositing, hit-testing and input. Nothing model-sized ever reaches
  the main thread.
* **What crosses (SCL-6).**

  | from → to | what | how | bound |
  |---|---|---|---|
  | generation → tile worker | display-list deltas (column slices) | transferred: the generation worker copies each slice into a fresh buffer and transfers it, so its own arrays stay attached while S10–S14 continue | O(changed marks) |
  | generation ↔ tile worker (cross-origin-isolated hosts only) | the mark table | `SharedArrayBuffer` columns, no copy — optional, never required (it needs COOP / COEP from the embedding host) | — |
  | tile worker → main | tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.
  Chose a handle-and-tiles boundary over sending the document or `Mark[]` objects to the main thread because
  structured-cloning a CITY entity table costs the receiver ≈ 162 ms and a 60 000-mark object list ≈ 140 ms
  (redteam-scale §7.3) — both inside the first-frame budget — while bitmaps and typed arrays transfer in constant time.

### 8.10 Decoration instances (trees, scatter, crowns, roof detail)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

* **One instance set per entity, independent of the band.** Every `instances` mark (a wood, garden, park, copse, orchard,
  avenue, hedgerow, yard planting or scatter class) has one set of positions: a **stamp** of a per-class blue-noise tile
  for areas, a **jittered grid** for orchards (6–8 m) and for avenues and hedgerows (8–12 m along the line).
* **Tiles.** Per (class, spacing): four toroidal blue-noise tiles of 64 × 64 m, built once per session by Bridson
  sampling (k = 50 candidates, all evaluated — the reference variant, now paid once per session instead of per tree),
  each point carrying a **progressive rank** (void-and-cluster order: every prefix of the ranked list is itself evenly
  spread); the tile variant used by a stamp cell is hash(entity, cell) mod 4, which breaks visible repetition.
* **Stamp.** Offset in [0, 64 m)² and rotation from the entity's stream (`render.instances/<entity>`); the cells (u, v) of
  the rotated lattice covering the entity's face; point p of cell (u, v) survives if it lies in the face (point-in-polygon
  with holes) and, for woods, passes the edge test of a domain-warped density evaluated once per point in world metres.
  **Ordinal** = (u, v, p): stable — editing the face's boundary changes only which edge points survive, never the
  interior's ordinals or positions.
* **Band thinning.** Band b draws the points with rank ≤ k_b (city: none — the wood or green fill; district: the first
  60 %; neighbourhood: all), so every coarser band is a prefix of the finer one: an instance keeps its position once
  visible and appears at most once in a zoom sweep (LC-20, VIS-5).
* **Per-instance look, keyed by (entity, ordinal).** The crown index into the style's **crown library** (20 crowns per
  class per style, built once per session from `style/<sheet>/crowns/<class>/<i>`, drawn as sprites), colour jitter,
  scale jitter ± 15 %, and `leafType` (from the species when present, deciduous otherwise). Hatch phase and roof detail are
  keyed by entity id. Nothing is keyed by band.
* **Edits (LC-20).** `{ t: 'instance', entity, ordinal | point, op: 'add'|'move'|'remove'|'restyle', to?, style? }` events
  (§7.1) apply after the set is generated: `remove` drops the ordinal, `move` replaces its position, `add` appends a user
  ordinal `u<n>`, `restyle` sets its attributes. After a regeneration: if the entity's id survived, overrides apply by
  ordinal; if the entity was superseded, each override re-matches to the nearest generated instance within 0.5 × the
  spacing, else it is kept `orphaned` and reported. A tree brush is a batch of instance events (COV-FTG-M04).
* **Where it runs.** Instances are generated per tile in the tile worker and memoised per (entity, revision, style) for
  the session; they are never written to the document except as overrides. The GeoJSON, glTF and CityJSON exporters call
  the same function (VN-158, XB32), and the bench computes tree statistics from it (SCL-21).
* **Budgets.** Placement ≤ 1 µs per instance (stamp plus point-in-polygon), drawing ≤ 2 µs per instance as a sprite
  (§12.7).

Chose the stamped, ranked tile over per-entity Bridson sampling because sampling costs ≈ 12 µs per tree (a 36 ha wood
takes 170 ms; redteam-scale §7.2) while a stamp costs under 1 µs, and ranked tiles give every band a subset of the finer
band by construction.

=== REPLACE §9 Labels and map furniture (the whole section, heading to the line before §10) ===

## §9 Labels and map furniture

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

*In plain words.* District names curve along the middle of their district, as MFCG's do, but never cross a river inside
it and never cover a gate, a bridge or the keep; where a district is too small for its name to be readable at city zoom,
it is labelled together with its neighbours as a named quarter. Street names appear as you zoom in. Labels never
collide, at any zoom. Every browser and the headless tool place labels identically, because the width of every letter
comes from the font files we ship, not from the browser. The names themselves are part of the town and never change
when something elsewhere is re-rolled; where a label sits is worked out for the view you are looking at. A scale bar,
compass, grid, title, legend, emblem and a ruler are drawn on top; each can be moved, restyled or switched off.

### 9.1 What is model and what is view

* **Model** (S13a; in the model hash; persisted): every entity's name and short form, and a `LabelEntity` per labelled
  thing with its candidates; the quarter merge tree (§9.4):

  ```ts
  interface LabelEntity { id: Id; target: Id; kind: 'district'|'quarter'|'way'|'landmark'|'water'|'wood'|'gate'|'title'|'annotation'|'address';
    text: NameRef; shortText?: NameRef; priority: number; lod: LodBand[];
    candidates: { spines: Polyline[] /* area and path labels, world cm, in order of preference */;
                  anchors: { p: Point; dirCdeg?: number }[] /* point labels */; breakAt?: number[] /* allowed two-line breaks */ };
    pinned?: Placement /* a user placement: model data */; hidden?: boolean }
  interface QuarterNode { id: Id; members: Id[] /* districts */; children: [Id, Id] | null; name: NameRef; spine: Polyline }
  ```

* **View** (S13b; never hashed; recomputed per zoom stop and cached, §9.2): which candidate each label uses, its size and
  glyph positions, the quarter cut, the halo roles. Pinned placements are honoured as fixed obstacles.
* **Consequences.** The model hash does not depend on fonts, viewport or device pixel ratio, so O2 (a) and O11 (f) hold
  (GEO-29) — tested on the golden suite: identical model hashes headless (Node) and in Chromium, Firefox and WebKit,
  and identical S13b placements across them at every zoom stop (§13.3). `moveLabel`, hide and pin change `LabelEntity.pinned` / `hidden` — model data, hashed and logged (§7.4). A
  scoped regeneration re-derives S13a only inside its scope (LC-17).

Chose "placement is view data, measured with our own font metrics" (GEO-29's options b and a together) over fitting
placement into the model because collisions change with the zoom inside a band (SCL-10), so a model placement would be
wrong between stops or recomputed per zoom anyway; and over measuring with the host's text engine because Chromium,
Gecko, WebKit and headless Node shape text differently.

### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally

* **Metrics.** `@plat/labels` parses the bundled OFL font files itself: `cmap`, `hmtx`, `kern` and GPOS pair adjustments
  (formats 1 and 2), and GSUB single substitutions for `smcp` (small caps) and `onum` (old-style figures). Advance widths
  and kerning in font units become world metres at a zoom stop; there is no contextual shaping (the label faces are Latin,
  ligatures off). Glyphs are placed and drawn one by one (§8.9), so what is drawn equals what was measured on every backend
  and in SVG.
* **Zoom stops.** Placement is computed per zoom stop (§8.8). At stop k each glyph box, in world units, is its pixel box ×
  the stop's metres per pixel; protected obstacles (gates, castle, plaza, bridges, walls — MFCG's measured defect) are
  their drawn symbol extents at that stop. Between stops the view uses the placement of the stop at or coarser than the
  current scale: zooming in only shrinks every label's world box, so no collision can appear, and crossing below a stop
  switches to that coarser stop's placement. Zero collisions therefore hold at every zoom, not only at the stops.
* **The greedy.** Candidates at a stop are totally ordered by priority (title > quarter / district > water > landmark >
  gate > way > address), then larger target area, then id. A candidate takes its first alternate (its spines in order,
  then the ladder of §9.4) that meets no placed higher candidate, no obstacle and no pinned label; otherwise it yields.
  This whole-map greedy is **evaluated locally**: deciding c first decides (memoised) every higher candidate whose
  alternate boxes meet c's; the dependency graph is acyclic because the order is strict, so the result is the same
  whichever tiles are computed first and whatever the viewport.
* **Scope.** Area and way labels for all candidates of the band; addresses and repeated street names only for candidates
  in visible tiles and their dependency closure. The memo is keyed by (stop, candidate id, candidate revision).
* **Incremental (SCL-9).** After an edit, memo entries of candidates whose boxes meet the dirty boxes are dropped and
  re-decided; a change propagates only through candidates whose outcome changes (the priority cascade stops when nothing
  more moves).
* **Budget (SCL-10).** ≤ 2 ms per stop for ≤ 2 000 visible candidates, in the tile worker (§12.7).

### 9.3 Spines and candidates

* **Area labels** (districts, quarters, water bodies, woods; GEO-39). The face is simplified with a topology-preserving
  Visvalingam (a vertex removal is refused when the new edge would cross another edge of the face or of its holes,
  checked in the kernel's index) to half the label's cap height at the band's coarsest stop. The hole-aware straight
  skeleton is a planar graph with cycles around holes; each skeleton edge's clearance is the smaller event time of its two
  ends; the **maximum-clearance spanning tree** (Kruskal on edges by clearance, descending, ties by edge index) drops the
  lowest-clearance edge of every cycle — the narrow passage beside an islet or a clearing; the spine is the **longest
  path of that tree** by length (two linear passes), smoothed (Visvalingam → centripetal Catmull-Rom) and
  curvature-limited to the glyph size. When the skeleton fails (F-SKELETON), the medial axis of boundary samples is
  processed the same way. Candidates per area, in order: the spine; the spine trimmed to its central 80 %; the OBB-axis
  straight line; the OBB arc.
* **Path labels** (streets — new to all four references —, rivers, walls): along the centreline at the district and
  neighbourhood bands, repeated per segment above 12 em of length, kept upright (flipped when the tangent points left).
* **Point labels** (gates, bridges, landmarks): eight anchor offsets; a leader line when the footprint is under 12 px.
* **Addresses:** the numbering is model data (S13a: monotone along each way, per side); the numbers are placed as view
  data at the neighbourhood band.

### 9.4 Sizes, floors, the ladder, quarters, overflow, halos

* **Legibility floors** (display px at 1×): area labels cap height ≥ 7 px (and ≤ 14 px, ∝ √area within the band); way
  labels cap ≥ 6 px; point labels ≥ 6 px; addresses ≥ 5 px. Area labels are letter-spaced small caps (0.15 em).
* **The F-LABEL ladder, view side** (every rung reached is counted in the report): (1) the preferred spine at the size
  ∝ √area, never below the floor; (2) the short name form; (3) a straight label on the OBB axis, on one line or on two
  lines broken at a space; (4) the OBB arc; (5) at the city band, the **quarter**: the label yields to the smallest quarter
  node containing its district whose spine fits the quarter's name at the floor; (6) a declared **overflow**: ≤ 20 % of the
  glyph area outside the face, never over a protected obstacle or another label; (7) a **legend entry**: a numbered disc on
  the face and a row in the legend (§9.5).
* **Quarters (VIS-4).** S13a builds, once per model, a merge tree of districts: it repeatedly merges the adjacent pair
  with the smallest combined area — a pair of different kinds counts 1 000 ha extra, so districts of one kind merge first
  — until one root remains; each internal node gets a name from the grammar, conditioned on its dominant kind and on the
  naming feature of its largest member (§10.4), and a spine from its union (§9.3). The names and spines are model data; the
  cut used at a stop (the finest nodes whose spine fits the floor) is view data.
* **Halo (VIS-15).** Each glyph's halo takes the role of the area mark under the glyph's centre, looked up in the
  display-list index at the label's band (`ground`, `road`, `water`, `field`, `green`, …), 1.5 px wide; SVG writes a
  paint-order stroke per glyph in the same colour; text against its halo role must pass the contrast matrix's ink floor.
* **Acceptance** (B-ZOOM; the default view of every rung; the bundled font): area labels on the map at or above the floor
  ≥ min(12, number of districts) (MFCG size 80 draws 17); 0 protected overlaps; 0 collisions at settled views and during a
  scripted zoom sweep; overflows and legend fallbacks reported; ≥ 99 % of all area-label glyph area inside its face
  (O13 a), which caps the overflow rung at 5 % of the on-map area labels; ≥ 90 % of named streets labelled at the neighbourhood band
  (O13 b). **Pre-decided fallback** if a rung shows fewer than 12 at M1: the default framing percentile (§9.5) tightens
  from 95 % to 85 %, which enlarges every district on screen, and the check re-runs.

### 9.5 Furniture, framing and tools

* **Scale bar:** metres ↔ feet, major and minor ticks, old-style figures (`onum`); accurate to 0.5 % at every zoom (O6 c).
* **Compass (XB08):** a procedural 8-ray design with ink and paper halves, rerollable per document
  (`style/compass/<document>`). Auto-placement: candidates are the four corners and the four edge midpoints, inset 24 px;
  score = the sum over the display-list marks the compass would cover at the view (labels × 3, protected features × 3,
  buildings × 1, ways × 1, water × 0.2, paper 0) plus 0.5 × (1 − distance from the view centre ÷ the half-diagonal); the
  lowest wins, ties broken in the order NE, NW, SE, SW, N, E, S, W; re-evaluated when the view settles. Dragging places
  it and the wheel rotates it; both are view state (§11.3) and pin the compass.
* **Grid (XB15):** kind none | square | hex (pointy or flat) | mesh (triangular); cell size in metres or feet (default: a
  round ground distance ≈ one tenth of the view's short side on a 1-2-5 sequence; for VTT 1.5 m / 5 ft); colour role
  `grid`; fades out below its legibility zoom (cell < 12 px); **skip water** clips grid strokes out of water faces (on by
  default for overview grids, off for VTT grids).
* **Title:** in the emptiest corner (NG's rule: the corner whose box covers the least mark area); movable.
* **Legend (J04):** a gazetteer panel — an embedded title, numbered districts (always in `legend` mode; in `labels` mode
  only for legend fallbacks), lettered landmarks, the scale bar and the emblem; border none | single | double rule;
  position any corner (default: the emptiest corner other than the title's) or free; metric or imperial; label modes
  `labels` (default), `legend` (districts numbered on the map, MFCG's Districts = Legend) and `hidden`; plus the symbol key
  generated from the registry (O12 d). Position, mode and border are view state.
* **Emblem (M06):** a furniture slot `Emblem = { source: 'none'|'import'|'generated'; svg?: string; png?: Uint8Array;
  generated?: EmblemSpec }`. Imports are sanitised (no scripts, no external references, ≤ 64 KB). The base ships a minimal
  generator of our own: `EmblemSpec` = a field tincture from the palette's roles, one of eight partitions or ordinaries
  (per pale, per fess, per bend, chevron, cross, saltire, chief, bordure) and zero or one geometric charge (roundel,
  lozenge, mullet), seeded by `naming/emblem/<town>`; off by default; drawn in the legend or a corner. Chose a minimal own
  generator plus import over import only because the legend should be able to carry an emblem with one click (MFCG
  fetches one from a third-party service), at a fraction of a person-week; chose it over a full blazon engine because
  heraldic depth is not a map-parity item.
* **Annotation layer** (numbered markers and a separate legend sheet); **north arrow**.
* **Measure tool (L10, L08):** an `@plat/app` ruler — click points for a polyline length in metres and feet; area mode for a
  polygon's area in m², ha and acres; snapping to way centrelines, face edges and vertices through the display-list index
  (8 px radius); exact in world centimetres; a measurement is view data and can be saved as an annotation.
* **Framing (A06):** the initial view and the default export frame are the circle centred on the settlement centre with
  radius max(the outer enceinte's radius, the 95th percentile of footprint distances from the centre) × 1.08, fitted to
  the viewport's short side (no letterbox: the long side shows more context). River tails and ribbon tips beyond the
  percentile are outside unless the user frames them; a user frame is view state. Furniture sizes are CSS px × a UI scale;
  device pixels are handled by the tiles.

### 9.6 Names

Names come from the original grammar of §10.4, conditioned on the model (a docks district for its water, a gate ward
for its gate, a street for its destination or trade — R16), and are drawn from `naming/<kind>/<entity id>` only.
**Uniqueness (LC-17)** within its kind — districts, quarters and water bodies per town; ways per district, and tier-1
ways town-wide: in a full generation names are resolved in id order, and a later entity whose draw repeats an earlier
name re-draws on its own `…/attempt=n` (≤ 8), then takes a distinguishing suffix; in a scoped regeneration or an edit,
entities outside the scope are fixed and only entities inside it re-draw. An existing entity is never renamed by another
entity's creation, and the locality oracle, which compares against a replay of the same log, resolves collisions the
same way. Feature-conditioned names are re-evaluated only inside a regenerated scope. Names are rerollable (a reroll
event on the entity), editable (`setAttr`) and persisted; the word lists are spell-checked in CI. **Test (B-EDIT):** a
block reroll changes 0 names and 0 `LabelEntity` records outside its scope; placement changes outside the scope are
counted and reported as view changes.

=== REPLACE §11 Export and interop (the whole section, heading to the line before §12) ===

## §11 Export and interop

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

*In plain words.* One saved file holds everything (the recipe, the edits, the town); every other format — SVG with
layers, PNG at print size, GeoJSON for GIS tools, virtual-tabletop scenes with walls and doors, 3-D models — is a view
of that file. The generator runs without a screen (for tests and batch work) and can be embedded in another web page:
the page keeps the town in a background worker and receives finished pictures, so it never stalls. When several people
share one town — a game master and players — the host program keeps the one true copy and each generator only proposes
changes to it, so everyone always sees the same town. Nothing depends on a server of ours.

### 11.1 Formats

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9; round trip byte-identical | the canonical form; import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | one FeatureCollection per layer in a local metric CRS (`crs` member with origin and scale; optional WGS84 affine anchor); one feature per entity with `id`, `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes; MultiPolygons for face unions; walls, towers, gates and bridges as typed features; boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (the §8.10 function at the finest band, overrides applied) with `crownM[]` and `leafType[]`, or one Feature per tree on request, or none (VN-158, XB32); model widths only, never symbol widths | validated with an open validator in CI; a scripted QGIS load is the acceptance (O11 d) |
| **SVG** | written from the display list at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions; halos by paint-order; hatching as compound paths; symbol widths; the colour-matrix post operations as filters (§8.2) | budgets at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for 837–1 512 buildings, 6.3 MB for 15 392) and ≤ 60 000 elements; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18) |
| **PNG / tiles** | the band-streamed tile assembly of §8.8 at any DPI; transparent background; per-layer transparent PNGs (the largest MFCG ask); print presets A4…A2 at 300 dpi | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer (underground / ground / sky) with its elevation | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing (skeleton or wings); walls, towers, gatehouses and bridges as prisms on their bases; trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces), `WaterBody`, `Road` (lines with class and width), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10), `LandUse`, `OtherConstruction` (walls, towers, gatehouses), `Bridge`, `TINRelief` (terrain); no `referenceSystem` (local metric CRS; the GeoJSON row's optional WGS84 anchor as an extension) (DEF-5) | validated against the CityJSON schema in CI |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots | the corpus-calibration input |
| **permalinks** | §6.4 | one line for unedited towns |

**The `.dd2vtt` profile (DEF-4).**
* **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares.
  One scene image is ≤ 8 192 px on a side at the declared grid (default 100 px per 1.5 m square, so ≈ 123 m); a larger
  scope is split into a grid of scenes aligned to grid lines, or the user lowers the pixels per square (≥ 50) — the export
  dialog shows the choice before writing.
* **Fields:** `format` 0.3; `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }`;
  `line_of_sight` — polylines in grid units from building footprint edges (minus door openings), enceinte faces, yard
  walls and hedges from boundary treatments (fences and railings do not block sight), and cliffs; `objects_line_of_sight`
  empty; `portals` — doors at building entrances (1.2 m openings) and gates (their opening), each
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }`; `lights` — the module's light sources
  in the scope, none otherwise, `{ position, range in squares, intensity: 1, color, shadows: true }`;
  `environment { baked_lighting: true, ambient_light }`; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in.
* **Per layer:** one file per model layer, its elevation in the file name and in a `plat` extension object; coordinates
  exact to the grid (O11 g).
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged),
  the same lights, a background image file, grid size and distance units, and journal entries from the gazetteer.

Chose to build CityJSON over leaving it deferred (D-8) because its integer-vertex-plus-transform encoding carries our
centimetre lattice losslessly, so the exporter is a thin view (≤ 1 person-week, M3), and it gives GIS users a standard
3-D city path that GeoJSON cannot.

### 11.2 The embedding API and the worker boundary (SCL-6)

```ts
type DocHandle = { readonly id: string };            // the document lives in the generation worker
interface PlatApi {
  generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void }): Promise<DocHandle>;
  open(bytes: ArrayBuffer, opts?: { readOnly?: boolean }): Promise<DocHandle>;             // .plat or CBOR twin; bytes transferred in
  edit(h: DocHandle, e: EditEvent | EditEvent[]): Promise<ApplyResult>;                    // Ok | Conflict(actions)
  regenerate(h: DocHandle, scope: Scope, mode: 'keep'|'adjust'|'newSeed'): Promise<ApplyResult>;
  undo(h: DocHandle): Promise<ApplyResult>; redo(h: DocHandle): Promise<ApplyResult>;
  query(h: DocHandle, q: Query): Promise<QueryResult>;                                     // gazetteer, hit-test, whereIs; ≤ 64 KB per page, paginated
  view(h: DocHandle, target: HTMLCanvasElement | OffscreenCanvas, opts?: ViewOpts): Promise<ViewHandle>;   // tiles flow from the tile worker
  setView(v: ViewHandle, patch: Partial<ViewState>): void;
  export(h: DocHandle, fmt: Format, opts?: ExportOpts): Promise<ArrayBuffer>;              // transferred out
  report(h: DocHandle): Promise<GenerationReport>;
  subscribe(h: DocHandle, handler: (e: ApiEvent) => void): Unsubscribe;
  close(h: DocHandle): void;
}
// @plat/api/node — the same API over worker_threads, plus by-value helpers for scripts and tests
declare function generateDocument(bp: Blueprint): Document;
declare function exportDocument(doc: Document, fmt: Format, opts?: ExportOpts): Uint8Array;
```

| call | crosses | copy or transfer | bound |
|---|---|---|---|
| `generate` | in: the blueprint; out: the handle, progress events | copy | < 64 KB; < 1 KB per event |
| `open` | in: the document bytes | transfer | the document's size |
| `edit`, `regenerate`, `undo`, `redo` | in: events; out: `ApplyResult` (ok, conflicts as actions, count of changed ids) | copy | < 64 KB per batch |
| `query` | out: one result page | copy | ≤ 64 KB |
| `view` | out: tile bitmaps and hit-test slices (§8.9) | transfer | ≤ 1 MB + 64 KB per tile |
| `export` | out: the file bytes | transfer | the format's size |
| `subscribe` | out: `ApiEvent`s (`doc.changed`, `view.changed`, report updates) | copy | < 64 KB |

The headless path runs the same worker code, and its model hash equals the browser's (text is not in the model, §9.1).

### 11.3 The host bridge — the host is the store (FTG-12)

* **Transport.** `interface BridgeTransport { send(msg: BridgeMessage): void; onMessage(h: (msg: BridgeMessage) => void): void }`.
  Shipped: `WindowPostMessageTransport` (iframe hosts; a fixed target origin; incoming origins checked against the embed's
  allowlist) and `MessagePortTransport` (any relay — a browser-extension content script, a SharedWorker, a chat-bus
  relay; COV-FTG-N06). Envelope: `{ plat: 1, type, session, seq, stateId?, body }`.
* **Vocabulary (our own terms, FTG-22).** Host → PLAT: `doc.load { bytes | ref, role }`,
  `doc.apply { baseStateId, events }`, `view.set { patch }`, `export.request { fmt, opts }`, `query { q }`. PLAT → host:
  `ready { generatorVersions, schemaVersion }`, `doc.changed { baseStateId, events }` (a local user's proposed events),
  `doc.applied { stateId }`, `doc.rejected { reason: 'stale'|'invalid'|'role'|'version', currentStateId, conflicts? }`,
  `view.changed { patch }`, `entity.selected { id, kind }`, `export.ready { bytes }`, `query.result`.
* **stateId** = a 128-bit hash of (document id, edit-log length, hash of the last event), in hex.
* **Convergence.** The host holds the canonical document and log. A client sends its user's edit as `doc.changed`
  against its `baseStateId`; the host accepts only when that base is the current stateId — it appends the events, advances
  the stateId and fans `doc.apply` out to every client, the sender included — and otherwise answers
  `doc.rejected { stale }`; the client then applies the host's pending `doc.apply` messages, re-runs its own events through
  the dry run (§7.1) on the new state and sends them again, or shows its user the conflicts. Every client applies the same
  events in the host's order on the same generator version, so every client's model hash is the same (§6.2). **Test
  (M3):** a host and three headless clients applying 1 000 interleaved random events converge to one model hash with 0
  lost accepted events.
* **Version handshake.** On `doc.load` the client compares the document's `generatorVersion` with the versions it can
  replay (announced in `ready`); when it cannot, it opens the snapshot read-only (its role drops to viewer, and it says
  so) — it never replays under another version silently.
* **View state.** Time, location, favourites, notes and public notes, view pins, layer choices, style, season, weather,
  frame, and the compass, legend and emblem settings live in the document's view section outside the model hash (§2.9);
  each key is last-writer-wins by (Lamport counter, session id) and travels as `view.set` / `view.changed`. FTG's time
  commands map to `view.set { time }` plus the simulation module's own command.
* **Roles.** `owner` | `editor` | `viewer`, given by `doc.load`. A viewer's client never emits `doc.changed` (model edits
  are disabled in the UI and dropped by the bridge) and emits only the view changes the host allows; the host enforces the
  roles as well.
* **Logging (LC-31).** Every model change over the bridge is a `doc.apply` of `EditEvent`s, logged one to one; there is no
  bridge command that changes the model any other way.

### 11.4 Host inputs (DEF-11)

A host may supply input only through these doors: (1) blueprint fields — seed, rung, population, intent, character,
circumstances, assignments — to `generate`; (2) edit events through the API or `doc.apply`, which are logged; (3) tables,
presets and styles as `editTable`, `editPreset` or `setStyle` events, whose content is copied into the document with
provenance `host` (source, date, version), so the document replays without the host; (4) a registered `ContentProvider`
(§14), accepted only after a **double-run check** (at registration it runs twice on the same input and stream; the two
outputs must be byte-identical, else it is refused), with every output it produces for a document recorded in the
document's `hostContent` block, keyed by (provider id, version, input hash), and read from there on replay. So a
document never needs its host to replay, and host code — which the model packages' lint (§6.5) cannot reach — is made
deterministic by the check and the record. The mapping of SettlementForge's own data onto these doors is owner-staged
(after the standalone generators are mastered); this contract is its hook.

### 11.5 Sharing and multi-client use without a hosted service (DEF-12, COV-FTG-N07)

* **Decision:** the product contains no hosted service. For multi-client use a host — a VTT module, a web page, or
  SettlementForge in its owner-staged phase — is the store (§11.3) and owns accounts and access.
* `interface DocResolver { resolve(ref: string): Promise<ArrayBuffer>; publish?(bytes: ArrayBuffer, access: 'private'|'link'|'public'): Promise<string> }`
  is configured by the embedding app. `&doc=<ref>` links are produced only when a resolver with `publish` is configured;
  otherwise the app offers the `.plat` file and, for a small edit log, the inline compressed log of §6.4. Access levels
  are the resolver's; the reference app ships a file resolver (local files and inline logs) and no network resolver.
* Chose host-as-store over our own sync service because the product is a standalone, backend-free library (D-4, D-21), a
  host already owns accounts and storage, and §11.3's protocol makes any host a correct store; reversing means writing a
  service that plays the host's role (low cost).
* Chose a transport-agnostic bridge plus the static VTT exports over building a Roll20 extension because an extension
  needs a Roll20 account and store publishing (outside a standalone program), and FTG's extension only relays the same
  messages that `MessagePortTransport` carries.

=== REPLACE §12 Performance budgets (the whole section, heading to the line before §13) ===

## §12 Performance budgets

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r1)

*In plain words.* A town must appear in well under a second, a city in under half a second and a metropolis in about a
second — the bar MFCG sets for itself and FTG misses by several seconds. Every step has its own budget, with the method
that makes the budget possible named beside it, measured on one named machine so the numbers can be checked. Compared
with MFCG drawing the same number of buildings, PLAT takes about twice as long for towns and cities and about five times
as long for a metropolis, because it builds what MFCG does not — real terrain and rivers, plots with yards, a plan for
every plot, a roster of trades placed by rule, greenery and non-colliding labels — and it still shows a metropolis in
under a second. That trade is stated here so the owner can veto it.

### 12.1 Reference hardware and how budgets are measured (SCL-15)

* **Reference machine:** Apple M1 (4 performance + 4 efficiency cores), 16 GB, macOS, Chrome stable and Node 24 — the
  machine on which every MFCG, FTG and NG bar in this document was recorded (`captures/mfcg/2026-09-21T11-25-32/meta.json`)
  and on which the named mechanisms were timed (redteam-scale §7).
* **Low-end device** (O12 b's ≥ 30 fps clause; the `low` hardware tier): Intel Core i3-10110U (2 cores, 4 threads, UHD
  Graphics 620), 8 GB, Chrome stable — or any machine whose calibration score is within ± 15 % of it.
* **Calibration benchmark** (`bench/calibrate`, fixed inputs): 5-octave fBm over 256² cells, a bucket-queue priority flood
  over 256², a 20 000-node Dijkstra, a 100 000-element typed-array sort, and, in browser runs, a Canvas2D raster of 32
  fixed tiles. CI divides every timing by (runner score ÷ reference score) before comparing it with a budget; the
  reference score is stored with the goldens.
* **Where each budget is measured:** model budgets in Node 24 (worker_threads for the pool), checked monthly inside
  Chrome's worker to within ± 15 %; frame, tile, first-map and label budgets in Chrome (Playwright, GPU on). p50 and p95
  are over B-CITY's seeds per rung and water setting.
* **Budgets never change output.** A missed budget is reported, never answered by computing something coarser
  (F-BUDGET-TIME is reporting-only, GEO-2).

### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2)

| rung | population band (target) | buildings at the target | frame side at the target (+ 30 % margin per side) | matched MFCG size (plain options, seed 555001) | MFCG buildings / walled ha | MFCG generation (the app's own stage timings) |
|---|---|---|---|---|---|---|
| TOWN | 2 000–10 000 (5 000) | 1 200–1 500 | 2 000 m | 40 | 1 475 / 58 | 57 ms |
| CITY | 10 000–30 000 (20 000) | 4 500–6 000 | 5 000 m | 80 | 5 242 / 220 | 131 ms |
| METROPOLIS | 30 000–120 000 (50 000) | 12 000–15 000 | 8 000 m | 130 | 13 091 / 548 | 156 ms |
| METROPOLIS above its target | up to the cap of 120 000 | ≤ 35 000 | ≤ 12 400 m | 200 (a stress comparison) | 31 951 / 1 274 | 236 ms |

* Buildings at the target are derived at ≈ 3.4 persons per building for the core plus the hinterland (PLAUSIBLE).
* Within a rung the frame side scales with √(population ÷ target). At the cap the frame is 12.4 km (16.1 km with the
  margin), inside §3.2's 2²³-cm range with more than 5× headroom. A request above the cap is clamped and
  `requestedVsBuilt` says so; a request below 2 000 people is clamped to 2 000 and reported (thorp to village belong to
  the village product's own ladder).
* The matched counts come from the MFCG size sweep (`captures/mfcg/exports-sweep-2026-09-25/README.md`). MFCG's GeoJSON
  export is in metres and only its SVG uses its 4 m internal unit (road width 8 in the JSON, 2 in the SVG). The
  15 392-building size-80 city of the earlier exports had shanty town, river and coast switched on; it and the
  13 349–36 480 size-80 counts of the MFCG profile belong to such option sets and are stress comparisons, not the CITY
  bar. The earlier TOWN bar at MFCG size 25 (≈ 411 buildings) is replaced by size 40.

### 12.3 Model budgets on the one-click path

The primary configuration is one generation worker plus a **derivation pool** of up to three workers for the
per-district stages (S10 plots, S10b placement, S11 site plans, per-district greenery), which run after the eager S10
allocation (LC-2) as pure functions of eager upstream state and their district's own sub-stream, merged in id order
(§4.1). The single-worker column is the pre-decided fallback: on the low tier, in hosts that forbid extra workers, and
everywhere if the pool fails its M1 measurement.

| rung | model p50 / p95 (pool) | per building at p95 | MFCG at the matched size | ratio at p95 | single-worker fallback p95 |
|---|---|---|---|---|---|
| TOWN | 72 / 100 ms | 74 µs | 57 ms (39 µs per building) | 1.8× | 115 ms |
| CITY | 240 / 300 ms | 57 µs | 131 ms (25 µs) | 2.3× | 400 ms |
| METROPOLIS | 570 / 800 ms | 59 µs | 156 ms (12 µs) | 5.1× | 1 000 ms |

**Per-rung cost laws** (p95, pool; used for sizes inside a band and above the target, and fitted by the cost-model tests,
§13.2): TOWN ≤ 20 ms + 60 µs × buildings; CITY ≤ 40 ms + 50 µs × buildings; METROPOLIS ≤ 100 ms + 52 µs × buildings (at
the 35 000-building cap: ≤ 1.9 s).

**Measurement and fallback.** M1 runs CITY with the pool and with a single worker on B-CITY-lite; the pool stays primary
if its p95 ≤ 300 ms and the model hashes are identical for pool sizes 0–3 on 200 seeds; otherwise the single-worker
column becomes the declared budget and O3 (d)'s CITY clause is reported as missed by the difference.

### 12.4 CITY per-stage split, with the mechanism each budget assumes (SCL-3)

| stage | mechanism the budget assumes (§4 follows it) | work at CITY | p50 |
|---|---|---|---|
| S0 blueprint | parameter expansion, stream set-up | — | 2 ms |
| S1 site | 5-octave fBm on a 32 m grid over frame + margin; the stored 8 m raster by bilinear refinement plus one fine octave inside the built extent; hydrology (bucket-queue priority flood on integer heights, D8, accumulation) on a 16 m frame raster; coast and river outlines; no contours here (extracted per render tile, §8.2); 2.5 m slope queries by on-demand interpolation | ≈ 0.3 M noise evaluations at ≈ 27 ns; ≈ 98 000 hydrology cells | 25 ms |
| S2 / S3 programme, siting | roster fixed point (≤ 6 iterations, ≤ 100 classes); ≈ 2 000 candidate centres | — | 5 ms |
| S4 backbone | jittered hexagonal lattice at 25 m with adjacency by construction (no Poisson-disc, no Lloyd, no Delaunay); edge costs once; one plaza-rooted Dijkstra whose shortest-path tree yields every plaza-anchored route at epoch 0 (other routes by A\*) | ≈ 46 000 nodes | 17 ms |
| S5 growth | ≤ 8 µs per insertion including snap and re-walk (the first M0 measurement); every stage boundary is a level set of S4's cost-distance field, so no new field is computed | ≈ 5 000 proposals | 40 ms |
| S6 districts + fields | three fields on 32 m cells over frame + margin; driver kernels splatted within their radius (or one distance transform per driver class); an O(N) three-box blur for σ ≈ 60 m; the second pass after typing; the grower | 3 × 62 500 cells | 17 ms |
| S7 fortification | trace, gates, towers, castle claim | — | 5 ms |
| S8 infill | ≈ 12 µs per cut | ≈ 1 500 cuts | 20 ms |
| S9 corridors | Clipper2 union per district (WebAssembly) | — | 25 ms |
| S10 allocation (eager, LC-2) | roster demand per class and band to districts and blocks from S9 capacity estimates | ≈ 80 classes × 25 districts | 6 ms |
| S10 + S10b placement + S11 + per-district greenery (pooled) | S10 ≈ 10 µs per plot of geometry plus ≈ 2 µs for the context vector, read from per-feature-class distance rasters (16 m; one linear distance transform per class, ≈ 7 ms once); S10b top-k over candidates pre-filtered by district affinity and requirement class, with incremental capacity; S11 ≤ 5 µs median, compound ≤ 40 µs, mean ≤ 6 µs per plot; yard planting and parks ≈ 1 µs per plot | ≈ 116 ms of work on ≈ 5 500 plots, on 3 workers with 25 % imbalance | 48 ms |
| S12 hinterland (generation worker, concurrent with the pool) | FTG-sized field faces (≈ 2.5 ha; ≈ 1 600 in the 39 km² margin) at ≈ 8 µs per insertion; open-field strips as render-time segmentation inside the field faces | — | (12 ms, hidden by the pool) |
| merge | per-worker arenas merged in id order (§4.1) | — | 8 ms |
| S13a names + label candidates | ≈ 3 500 names, ≈ 60 skeleton spines, way-label anchors, address numbering, the quarter merge tree (§9) | — | 12 ms |
| statistics core record | O(n) counts, sums and histograms (the expensive metrics run on demand or in the bench; SCL-21) | — | 4 ms |
| model digest | per-batch digests maintained inside each stage (SCL-1); finalisation | — | 5 ms |
| **critical path** | | | **≈ 239 ms p50; p95 ≤ 300 ms** |
| S14 city band (outside the model budget; counted in the first frame) | columnar build for every district | ≈ 60 000 marks | 20 ms |

Stated assumptions: stage rates include stream-key derivation at ≤ 0.3 µs per key (SCL-12) and no whole-level static
index rebuild per commit (SCL-2). WebAssembly is part of the embed contract for these budgets; with the pure-JS boolean
fallback S9 and S11 are budgeted at 2.5× and the report names the engine that ran (SCL-22). The single-worker CITY path
is ≈ 319 ms p50 (the pooled 48 ms becomes 116 ms and S12's 12 ms joins the critical path). METROPOLIS: raster work × ≈ 2.6
(frame area), entity work × 2.5 — ≈ 571 ms p50 with the pool, ≈ 761 ms single-worker. TOWN: ≈ 72 ms p50 with the pool.

**M0 site-and-fields spike** (beside the fusion gate, which covers S4 + S5 + S8): S1 + S4 + S6 ≤ 50 ms at CITY with these
mechanisms, starting from redteam-scale §7's scripts. Pre-decided fallback: raster cells coarsen one step (fields and the
margin 32 → 48 m; hydrology 16 → 24 m) and the spike re-runs.

### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6)

| rung | first city-band frame (S14 city band + delivery + the viewport's tiles) | time to first map (click → the complete city band on screen, Canvas2D `ink`) | single-worker fallback |
|---|---|---|---|
| TOWN | ≤ 40 ms | ≤ 150 ms | ≤ 160 ms |
| CITY | ≤ 90 ms | ≤ 400 ms | ≤ 500 ms |
| METROPOLIS | ≤ 180 ms | ≤ 1 s | ≤ 1.2 s |

No rung depends on WebGL2 (§8.9). O12 (g) (under one second) holds at every rung with the pool; the single-worker
METROPOLIS misses it by 0.2 s and reports that.

Interaction at 40 000 buildings and 200 000 trees (O12 b): **pan** ≥ 60 fps on the reference machine and ≥ 30 fps on the
low-end device (compositing cached tiles; ≤ 4 ms of main-thread work per frame); **zoom gestures** at the same rates
(scaled cached tiles); **settle**: the visible tiles re-rastered at the new stop within ≤ 150 ms for a CITY view and
≤ 250 ms for a METROPOLIS view, centre-out, in the tile worker; hairline fidelity at every settled view (§8.3). **Draw
calls:** ≤ 80 Canvas2D path fill and stroke calls per tile whatever the building count (batched per program and
semantic) — ≤ 8 per 1 000 buildings in a CITY view — plus one sprite draw per visible crown and per placed glyph (from the
atlas). **Uploads:** ≤ 4 new tile bitmaps committed per animation frame (baselines: NG 528 uploads per hood, MFCG 590 per
city); roof computations per frame after warm-up = 0 (derived roofs cached, §8.1). **Re-raster** at the district band
≤ 12 ms per 1 000 buildings (MFCG's replay costs 11–15 ms per 1 000). **Neighbourhood band:** opening one district
≤ NG's 10–96 ms at comparable counts; ≈ 25 canvas operations per wing as the `hatched` ceiling.

### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9)

* **Scoped regeneration:** ≤ 3 ms + 60 µs × the buildings in scope (a district of ≤ 450 buildings in ≤ 30 ms), plus the
  S13a and S14 deltas ≤ 3 ms; the dirty tiles re-raster in the tile worker off the edit path (≤ 12 ms per 1 000
  buildings); edit-to-redraw < 100 ms.
* **A single plot edit:** ≤ 5 ms of model work plus ≤ 2 ms of deltas.
* **Scope invariance:** the same scope costs the same at TOWN, CITY and METROPOLIS within ± 20 % (a B-EDIT test).
* **Replay** (load verification, migration, undo beyond the scoped records): the log is applied to the model with S13a
  and S14 suppressed, and they run once at the end; cost ≤ the sum of the scope costs plus one S13a / S14 pass, bounded
  by §7.4's checkpoints (SCL-5), so a CITY document with 300 edits verifies in ≤ 1 s.
* **Warp preview:** ≥ 30 fps for a brush radius ≤ 150 m; Apply ≤ the scoped-regeneration budget of the touched faces.
* **Proxy thumbnails:** §7.8's budget.

### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)

* **Labels:** S13a 12 ms at CITY and ≤ 30 ms at METROPOLIS (model); S13b ≤ 2 ms per zoom stop for ≤ 2 000 visible
  candidates; a label tile ≤ 3 ms (§8.9).
* **Trees:** placement ≤ 1 µs and drawing ≤ 2 µs per instance. A district-band view with 10 000 visible trees composes in
  one 16 ms frame from cached tiles, and its tiles raster in ≤ 30 ms of tile-worker time (O19 e, restated); the 200 000
  trees of a METROPOLIS are never all instantiated — only visible tiles generate instances.
* **SVG** at METROPOLIS, city band: ≤ 650 B per building, ≤ 60 000 elements, written in ≤ 2 s; Inkscape opens it within
  120 s (§11.1).
* **PNG:** A2 at 300 dpi of a CITY in ≤ 20 s on the reference machine, the peak canvas one tile band.

### 12.8 Memory (what is counted, per rung)

Counted: the JS heap, typed arrays and WebAssembly memory of every thread (generation worker, pool, tile worker, main),
with canvas backing stores budgeted separately.

| rung | model working set, all threads, excluding canvases | canvas budget (low / mid / high tier) |
|---|---|---|
| TOWN | ≤ 40 MB | 24 / 64 / 128 MB |
| CITY | ≤ 110 MB | 24 / 64 / 128 MB |
| METROPOLIS | ≤ 260 MB | 24 / 64 / 128 MB |

These assume the compact entity store and the scoped undo records of §2 and §7.4 (SCL-5), people derived on demand,
tree instances never stored and the columnar display list (≈ 6 MB at CITY per thread that holds it). Measured per rung in
B-CITY's browser runs; pre-decided fallback if CITY exceeds its line at M1: the provenance and lifecycle-history columns
leave the working set for the document's on-demand block (SCL-20's archive) and are decoded only when inspected. The
document's size budget is §2.9's.

### 12.9 Reference comparisons and the declared trade

* **MFCG at matched building counts** (§12.2): model time 1.8× (TOWN), 2.3× (CITY) and 5.1× (METROPOLIS) MFCG's
  generation; time to first map ≈ 2× MFCG's generation plus canvas replay at TOWN and CITY (replay ≈ 11–15 µs per
  building, from its size-80 profile) and ≈ 3× at METROPOLIS.
* **FTG** (CITY size — the only size comparable until the owner rules on a paid FTG account): the server answers in
  2.9–3.2 s, the client is building the scene 6.4–7.0 s after the click, and loading a finished settlement costs 2.0 s of
  busy time (ftg-payload-visual, Critic-2 addendum part 2; the 4.6 s "client busy during create" figure is not a time to
  first map). PLAT's CITY first map (≤ 0.4 s) is ≈ 16× faster; FTG's metropolis load of ≈ 10 s is ≈ 10× PLAT's.
* **Declared trade (MFP-5).** Chose a per-building cost of ≈ 57–74 µs at p95 over matching MFCG's 12–39 µs because PLAT
  builds what MFCG does not — a heightfield with hydrology, frontage-first plots with yards and party walls, site plans
  with heights, roster siting, greenery by rule and collision-checked labels — which D-7 ranks above speed, and every rung
  still shows its first map within one second; reversing it would mean dropping plot and site-plan detail from the
  one-click path, which the owner's plot-model ruling forbids.
* Chose the derivation pool as the primary configuration over a single worker because after LC-2's eager allocation the
  per-district stages are pure functions of eager upstream state and their own district's sub-stream, so they run in
  parallel without shared writes; the pool is what keeps CITY within 300 ms and METROPOLIS within one second to first map.

## 3. Cross-area requests

The rendering blocks above rely on these changes in sections other areas own. Each row says what text must change and
why; the integrator applies them with the owning area's blocks. Where a request touches an item that the other area owns,
the item id is given so the owner can confirm its own fix agrees.

### 3.1 To KERNEL (§3)

| section | request | items |
|---|---|---|
| §3.1 Poisson-disc row | Replace "a fixed 140-point tile stamped per area for scatter (MFCG's trick)" by: "Bridson with k = 50, all candidates evaluated, builds the per-class ranked blue-noise tiles of §8.10 once per session; per-instance placement is the §8.10 stamp (≤ 1 µs per instance)". | SCL-8 |
| §3.1 curves row | Add the topology-preserving Visvalingam variant (a removal is refused when the new edge would cross another edge of the face or its holes, checked in the index), used by §9.3. | GEO-39 |
| §3.1 skeleton row | Label spines: "the maximum-clearance spanning tree of the hole-aware skeleton graph (§9.3); medial axis of boundary samples as the downgrade". | GEO-39 |
| §3.1 marching-squares row | Contours are extracted per render tile (§8.2 relief tier), not in S1. | SCL-3, VN-029 |
| §3.1, §3.3, M0 benchmark | §12.4 assumes no whole-level static index rebuild per commit (SCL-2's fix) and budgets S9 / S11 at 2.5× with the pure-JS boolean fallback, WebAssembly being part of the embed contract for the primary budgets; the M0 benchmark times both engines on S9 and S11 workloads and the generation report names the engine. | SCL-2, SCL-22 |
| §3.4 `offsetFace` / `insetRing` | Confirm the operation is callable read-only from the tile worker at render time with a per-call radius (§8.5's mass closing: offset +r then −r). | MFP-1 |

### 3.2 To DETERMINISM (§5, §6, §7, §2.8–§2.9)

| section | request | items |
|---|---|---|
| §6.1 "Decoration" bullet | Replace with: "Decoration (trees, scatter, crowns, roof detail, hatch phase) is keyed by entity id and instance ordinal, never by LOD band (§8.10); stamp offset and rotation from `render.instances/<entity>`; nothing is stored except instance overrides." Concern registry: rename `render.trees` → `render.instances`; add `style.crowns`, `style.compass`, `naming.quarter`, `naming.emblem`. | LC-20, VIS-5, SCL-8 |
| §6.2 | The model hash excludes label placement (view data, §9.1), the document's view section and style; it includes names and `LabelEntity` records (text, candidates, `pinned`, `hidden`). | GEO-29, LC-17 |
| §7.1 `EditEvent` | Add `{ t: 'instance'; entity: Id; ordinal?: string; point?: Point; op: 'add'|'move'|'remove'|'restyle'; to?: Point; style?: Partial<InstanceStyle> }`; state that a `warp` event is committed on Apply of the §8.8 preview only. | LC-20, SCL-9 |
| §7.2 brushes | A tree brush is a batch of `instance` events (§8.10). | COV-FTG-M04 |
| §7.3 | Replace "re-run only the label and display stages globally" with: "S13a re-derives names and label candidates only inside the scope; S14 emits a `DisplayDelta` for the changed closure (§8.1); tiles meeting the dirty region are invalidated (§8.8); S13b re-decides only the placements whose boxes meet it (§9.2)". | LC-17, SCL-9 |
| §7.4 table | Split the `setLayer / setStyle / moveLabel` row: `moveLabel`, hide and pin change `LabelEntity.pinned` / `hidden` — model data, in the hash, honoured by S13b; `setLayer` / `setStyle` stay outside the model hash. Add an `instance` row (create: tree tools; read: the instance set; persist: the log; regenerate: applied by ordinal after the set is generated, re-matched by position within 0.5 × spacing when the entity was superseded, else `orphaned` and reported; undo: inverse; migrate: ordinals are geometry-stable, re-match by position). The regenerate row's undo uses SCL-5's scoped records (§12 no longer mentions a k = 8 ring); replay builds S13a / S14 once at the end. | LC-17, LC-20, SCL-5, SCL-9 |
| §5.2 F-LABEL row | The ladder runs view-side in S13b (§9.4, floors in px); "0 collisions" is a view invariant tested in B-ZOOM at settled views and during a zoom sweep. F-SKELETON's label downgrade is processed by §9.3. F-BUDGET-TIME is reporting-only (GEO-2) — §12.1 relies on it. | GEO-29, SCL-10, GEO-2 |
| §5.3 | Remove label collisions from the model invariant suite; keep name uniqueness (§9.6) and `LabelEntity` reference integrity. | GEO-29, LC-17 |
| §2.9 `Document` | Add `view: ViewState` (time, location, favourites, notes and public notes, view pins, layer choices, style id, season, weather, frame, compass, legend and emblem settings) outside the model hash, each key last-writer-wins by (Lamport counter, session id); add the `hostContent` block of §11.4; state the document size budget per rung in §2.9 (§12 no longer carries a document column); the compact twin is in world coordinates with the centre in its header (§11.1). | FTG-12, LC-30, LC-31, FTG-21, SCL-11, DEF-11 |
| digests and keys | §8.1 uses the low 32 bits of the entity digest (SCL-1) as the cache `revision`; §12.4 assumes per-batch incremental digests with finalisation ≤ 5 ms at CITY and stream-key derivation ≤ 0.3 µs per key (SCL-12). | LC-23, SCL-1, SCL-12 |
| §7.8 | State the proxy-thumbnail budget per rung (§12.6 points to it). | SCL-16 |
| §7 (LC-31) | §11.3 maps every bridge command to logged `EditEvent`s and §11.4 copies host tables with provenance `host` and double-run-checks providers; mirror the rule in §7. | LC-31, DEF-11 |

### 3.3 To PIPELINE (§4, §10, entity schemas, PART II, PART III)

| section | request | items |
|---|---|---|
| §4.1 bullets | First paint = the complete city band (S0–S13a for every district plus S14's city band; no S9 preview on the one-click path — §8.5); remove "the display list at city LOD is emitted as soon as S9 commits" and "S1–S9 → a city-LOD preview". "One generation worker" becomes: the generation worker plus a derivation pool of up to three workers for the per-district stages after the eager S10 allocation, at every rung, as the primary configuration, with the merge protocol written here and the single-worker path as the pre-decided fallback measured at M1 (§12.3) — this is the DEF-16 decision §12 is written for; the worker boundary is §8.9 / §11.2. | SCL-4, SCL-6, DEF-16, LC-2 |
| §4.10 | S13 = S13a (model: names, short forms, `LabelEntity` candidates, the quarter merge tree, address numbering) and S13b (view: placement per zoom stop, §9.2); S14 builds the columnar display list and emits deltas (§8.1). | GEO-29, LC-17, SCL-10 |
| §4.2 S1, §2.3 | Adopt §12.4's mechanisms: 5-octave fBm on a 32 m grid over frame + margin; the stored raster (5 / 8 / 10 m) by bilinear refinement plus one fine octave inside the built extent; hydrology on a 10 m (TOWN), 16 m (CITY), 20 m (METROPOLIS) raster with a bucket-queue priority flood on integer heights; contours per render tile; 2.5 m slope queries by on-demand interpolation. Add an optional `shoreForm` (bay / headland / straight) per shore segment, read by §8.1's shore marks. | SCL-3, COV-FTG-H06 |
| §4.3 S4 | A jittered hexagonal lattice with adjacency by construction (no Poisson-disc, Lloyd or Delaunay); one plaza-rooted Dijkstra gives every plaza-anchored route at epoch 0 (routes without a plaza end, and epoch > 0 routes with `existingFabricCost`, run A\*); its cost-distance field is reused by S5. | SCL-3 |
| §4.4 S5 | The stage boundary is a level set of S4's plaza-rooted cost-distance field (no separate field). | SCL-3 |
| §4.5 S6 | Fields on 32 m cells; driver kernels splatted within their radius or one distance transform per driver class; an O(N) three-box blur. | SCL-3 |
| §4.7 S10 / S10b | The eager S10 allocation (LC-2 / FTG-1) precedes pooled per-district placement; context-vector distances come from per-feature-class distance rasters (16 m) computed once; S10b is top-k over candidates filtered by district affinity and requirement class, with incremental capacity. | SCL-3, LC-2 |
| §4.9 | S12: open-field strips are render-time segmentation inside FTG-sized field faces (model faces ≈ 2.5 ha). "Trees at render" row: "every green entity: instanced by §8.10's ranked tile stamp (woods, gardens, parks, copses) or a jittered grid (orchards 6–8 m, avenues and hedgerows 8–12 m) — positions independent of the band; never stored". Restraint: avenues are not drawn at the city band (§8.5). O19 (e) as restated in §12.7. | SCL-3, SCL-8, VIS-14 |
| §4.8 | Bridges and piers carry deck heights, and every enceinte carries `setbackCm` (§8.2 clips the wall symbol inward to it). | COV-VG-WC5, VIS-1 |
| §2.7 | `Greenery.treeStream` → `instanceKey: StreamKey /* §8.10 stamp offset and rotation; instances never stored; overrides are instance events */`. Replace `Label` by §9.1's `LabelEntity` and add `QuarterNode`. Add `LandUse.crop?` (read by `lit`'s texture choice) and a `leafType` on species or greenery (read by §8.2's season rows). | LC-20, GEO-29, COV-NG-VS27, COV-FTG-I11 |
| §2.6 / FTG-13 | §8.4's shadows and §11.1's glTF / CityJSON read `baseCm`; please add it as FTG-13 asks (Building, Wing, Tower, Enceinte segments, Gate, Bridge; bridge deck elevation). §8.2's roof construction reads the stored wings of VIS-10. | FTG-13, VIS-10 |
| boundary treatments | §8.2 draws and §11.1 exports the boundary treatments VIS-8 adds to plot edges (VTT line of sight for walls and hedges; GeoJSON LineStrings). | VIS-8 |
| §10.4 | Name uniqueness per §9.6 (an existing entity is never renamed; the new entity re-draws on its own stream); add the `naming/quarter/<node>` and `naming/emblem/<town>` concerns. | LC-17, VIS-4, COV-MFCG-M06 |
| §4.2 / II.1 rule 5 (owner-staged islands) | Placement rule: an island's ground footprint lies over water, fields or outskirts by default and over the built core only by assignment; its occlusion is §8.4's `LayerSpec.occlusion`. | VIS-17, AM-2 |
| II.5 | "the per-district tile cache (§8.5)" → "the world-aligned tile pyramid (§8.8), invalidated by per-district dirty regions". | GEO-28, SCL-7 |
| MFP-10 | The district count law is unaffected by the rendering fix; city-band legibility is handled by §9.4's quarters. | MFP-10, VIS-4 |
| COV-FTG-E07, J05 | Tent, stall and fire-pit symbols exist in §8.2's symbol list; the site-plan rows that place them are yours. | COV-FTG-E07, COV-FTG-J05 |
| COV-NG-XA36 / VN-090 (owner-staged) | §8.2's `ruin` program is the drawing hook for the ruined lifecycle state. | COV-NG-XA36 |
| COV-MFCG-Q01 | §9.4's ladder supports two-line labels; state multi-line labels as supported. | COV-MFCG-Q01 |

### 3.4 To SCOPE (§1, §13–§17, the decision, judgment and deferral tables)

| section | request | items |
|---|---|---|
| §1.7 rows | Rendering backends: "Canvas2D — the reference backend of every preset including `lit`, with a world-aligned tile pyramid (§8.8); SVG; PNG and print by band-streamed tiles; WebGL2 only as the pre-decided tile-compositor fallback (§8.9)". Text: "Canvas2D label tiles from the bundled OFL fonts; widths from the fonts' own metric tables (§9.2); no SDF". Runtime targets: the Node CLI's PNG export uses `@napi-rs/canvas` as an optional CLI dependency. Persistence: "no hosted service; the host is the store (§11.3, §11.5)". | VIS-7, DEF-6, GEO-29, DEF-12 |
| §1.1 / AM-4 | Population bands per rung and the 120 000 cap (§12.2). | AM-4, MFP-5 |
| §1.4 units row | "≈ 3.7 m/unit" → 4.00 m per MFCG internal unit; MFCG's GeoJSON is in metres (§8.2's calibration uses it). | MFP-8, MN-1 |
| §13.2 | A memory test per rung with §12.8's definition (SCL-5); cost-model tests fit §12.3's per-rung laws on ≥ 6 sizes (SCL-19); the B-EDIT scope-invariance test of §12.6. | SCL-5, SCL-19, SCL-9 |
| §13.4 B-ZOOM | Add §8.3's checks (hairline fidelity, decoration stability, role continuity, tree marks over casings, junction mouths, the contrast matrix on renders), §9.4's label checks (floors, ≥ min(12, districts) area labels, 0 collisions at settled views and in a scripted sweep) and §8.5's metrics (street-edge recoverability; access ways drawn ≥ 95 %). | MFP-1, VIS-1–VIS-5, VIS-14 |
| §13.5 B-REF | A timing row at matched sizes 40 / 80 / 130 (57 / 131 / 156 ms; model and first-map ratios of §12.9); the draw-style row uses §8.3's order-parity definition, the ink symbolisation ± 15 % at MFCG size 40's scale and outline share ≤ 25 %; the labels row adds floors and counts; tree-scatter statistics come from §8.10's function (SCL-21). | MFP-5, MN-2, VIS-16, SCL-21 |
| §14 | Replace `Mark`, `DisplayList`, `DisplayListBuilder` by §8.1's; `StyleSheet` by §8.2's; `PlatApi` by §11.2's; drop the WebGL2-specific backend wording; add `LiveLayerProvider`, `BridgeTransport`, `DocResolver`, `LabelEntity`, `QuarterNode`, `LayerSpec` (with occlusion). `@plat/labels` gains the font-metrics reader; `@plat/render` the tile pyramid and the tile worker; `@plat/export` CityJSON and the streaming PNG writer; `@plat/api` the handle API and the bridge. | SCL-6, VIS-12, VIS-17, FTG-12 |
| §15.1 rows | MFCG B19 (§8.10 stamped tiles); C1 ("Lots look = masses and footprints over the ground role", §8.5); D3 (emblem slot and own generator, §9.5); E1 (roles, contrast matrix, tints); E2 (order parity); E4 (framing §9.5, zoom §8.8); FTG D2 (`lit` on Canvas2D); D6 ("§8.2 post operations per tile", replacing "§8.5 WebGL2 post hooks"); G2 (host-as-store bridge, no hosted service); VG R1–R17 (relief tier and hillshade are optional base programs, off by default; VG's grass and spotlight looks stay village-only). | VN-029, VN-031, K07, M06, A06 |
| §15.2 rows | O12 (b) → §12.5's pan, zoom, draw-call and upload budgets; O12 (f) → §8.2's contrast matrix replaces the luminance rule; O12 (g) → §12.5 per rung; O19 (e) → §12.7; O11 (h) → the Inkscape check; O12 extras → §8.2 relief tier, §8.8 tiled export, the low tier; O13 (a) collisions are a view invariant; O3 (d) carries §12.3's measurement and fallback. | VIS-2, SCL-7, SCL-17, SCL-8 |
| §16 | M0 adds the site-and-fields spike (§12.4). M1 exit adds the figure-ground metrics and the contrast matrix (MFP-1 d), the ink symbolisation census, label floors and counts, hairline fidelity, the pool measurement (§12.3) and the label-tile measurement (§8.9). M2: `lit` on Canvas2D with the procedural texture set (≈ 1 pw), the relief tier, the compositor measurement at METROPOLIS (§8.9) — remove "the lit preset and the WebGL2 tier". M3: the CityJSON exporter, the dd2vtt profile, the host bridge and resolver, the handle API. The M1 and M2 side-by-sides include the suburb against FTG's overview (VIS-3). Out-of-scope list: drop "host-application inputs" and "a hosted sync service" (decided in §11.4 and §11.5). | MFP-1, VIS-7, DEF-5, DEF-11, DEF-12, IMP-3 |
| Deferrals section | Remove "the dd2vtt profile details; CityJSON as a second 3-D format (D-8); WebGL2 SDF text; host inputs; a sync service" — each is now decided (§11.1, §8.9, §11.4, §11.5). | DEF-4, DEF-5, DEF-6, DEF-11, DEF-12 |
| Delegated decisions | D-1: `lit` runs on Canvas2D, the reference backend of every preset. D-8: "3-D export = glTF 2.0 (OBJ secondary) and CityJSON 2.0". D-11: k = 50 builds the per-class tiles once per session; per-instance placement is the stamp. D-18: budgets per §12.3 (the derivation pool primary, the single worker the fallback, the MFCG trade declared). | VIS-7, DEF-5, SCL-8, MFP-5 |
| Judgment calls | Add one row per "chose X over Y because Z" in the blocks: columnar display list (§8.1); world-aligned tiles (§8.1); low-chroma value-step roles (§8.2); `lit` on Canvas2D (§8.2); ground tone over kerb hairlines (§8.5); avenues not drawn at the city band (§8.5); no S9 preview (§8.5); settling on 2^¼ stops (§8.8); label tiles over SDF text (§8.9); the handle-and-tiles boundary (§8.9); stamped ranked tiles (§8.10); placement as view data with our own font metrics (§9.1); the minimal emblem generator (§9.5); CityJSON built (§11.1); host-as-store (§11.5); no Roll20 extension (§11.5); the per-building trade against MFCG (§12.9); the derivation pool as primary (§12.9). | all |
| §17 | Fonts per IMP-15's ruling (label widths are read from the bundled font files, §9.2). Dependency table: `@napi-rs/canvas` becomes an optional runtime dependency of the Node CLI (MIT); Inkscape is a CI tool, not linked; a CityJSON schema validator (dev); PNG streaming uses the platform's `CompressionStream` and Node's `zlib` (no new dependency); textures are generated by our own script (no third-party texture). | IMP-15, VIS-7, SCL-14 |
| FTG-22 | The bridge vocabulary is now our own (§11.3); §17 needs no relaxation for it. | FTG-22 |
| SCL-21 | The statistics core record is budgeted in §12.4 (4 ms at CITY); the expensive metrics run on demand or in the bench. | SCL-21 |
