# Fix-all round 2 — RENDERING area (§8 rendering and style, §9 labels and furniture, §11 export and interop, §12 performance budgets)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-rendering-r2 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-rendering-r2` · 2026-09-25 · fix architect for the RENDERING area, round 2 (opus stand-in for the Fable
seat). Status: COMPLETE (2026-09-25).

## 0. How to read this file

**In plain words.** The check of round 1 left 27 things in the drawing, labelling, export and speed sections that were
still wrong or missing. All 27 are fixed here; none is put off and none is waved away. The ones an owner would notice:

* **The speed promise is now honest about size.** A bigger town has more buildings and takes longer, so each size has a
  rule instead of one number. Every town and every city still appears in under a second, and so does a metropolis of up
  to about 48 000 people; the largest ones, up to 120 000 people, take up to about 2.3 seconds. That is stated for the
  owner to veto instead of being hidden behind a half-drawn preview (N-2).
* **Labels stay readable over buildings and woods.** Each letter gets a thin outline in the block's ground colour
  wherever the colour underneath would be too close to the ink, and the textured and hatched looks got a slightly
  darker ink so outlines read over roofs (N-3).
* **The background thread that draws the map no longer needs a copy of the town.** Everything it draws — names,
  trees and their species, the user's tree edits, live markers — now reaches it as compact tables, and the work that
  needs the town itself runs where the town is (N-4).
* **The map appears as fast as it is drawn.** Names are painted onto each map tile before it is shown, so the screen
  receives half as many pictures, and the "at most four pictures per frame" limit now applies only while the user is
  dragging or zooming (N-5).
* **Colours, trees and roof details look identical after reopening a file**, because they are keyed by the building's
  permanent random-stream identity, not by a number the program makes up each session (NF-D10); tree edits stay on the
  tree the user meant after a regeneration (NF-D11).
* **Exports are standard.** GeoJSON is now true to its standard (longitude and latitude, placed at a default spot unless
  the user sets one), SVG draws the exact letters of our font everywhere, and every tree carries its species (N-14,
  N-13, COV-NG-XB32).
* **An app that embeds PLAT can now confirm "these edits will move or be lost" dialogs**, which it could not before
  (NF-D14).

**Format.** §1 is the disposition table. §2 holds the replacement blocks, each starting with
`=== REPLACE <section and exact heading> ===` and followed by the complete new text of that subsection, written in the
architecture's voice with its banner under the heading so the marking survives integration. §3 lists what other areas
must change (the integrator applies it), including the new judgment-call rows J-R19 – J-R37 and the amended D-18,
J-R7, J-R9, J-R17 and J-I2. Every new choice is recorded in its block as "chose X over Y because Z".

**Evidence (numbers only; no reference code, palette, grammar or content table is reproduced).** The round-1
verification `docs/validation/fix-all/r1-verify-rendering.md` (N-2 … N-28) and the determinism, pipeline and scope
verifications (NF-D10, NF-D11, NF-D13, NF-D14, NF-P12, NF-S7, NF-S11); `docs/validation/coverage-audit-ng-shared.md`
(XB32) and `coverage-audit-vg.md` (VN-158); the integrated `docs/ARCHITECTURE.md` (§1.1, §1.2, §2.1, §2.6, §2.7, §2.9,
§4.1, §4.2 S1, §4.10, §6.1–§6.3, §7.1–§7.4, §8–§12 in full, §13.2, §13.4, §13.8, §14, §16, §17.1–§17.2, II.6, the
decisions and judgment calls); `research/findings/ftg-payload-visual.md` (FTG's CITY preset, 9 500 people, 2 798
buildings, and its timings) and `ftg-posts-c.md` (the creator's ≈ 10 s metropolis render); `docs/IMPROVEMENTS.md` O12.
No `docs/validation/fix-all/r1-validate.md` exists at the time of writing.

**Executed by this seat (CONFIRMED):**
* `docs/validation/bench/fixall_rendering_r2_palette.py` → `.out` (our own code; stdlib): the retuned role values —
  `ink` field `#ECDFBF` (chroma 17.3), `ink` wall = ink, `lit` ink `#34281E`, `hatched` ink `#2A231D` — pass every row
  of the contrast matrix, the new ink / paper, ink / building and ink / tree rows included, in all three families; the
  halo rule of §9.4 gives every glyph a text / halo pair at or above the label floor in all three families; `ink` has 8
  city-band role colours with courts drawn as ground; the bounded random-style repair on 2 000 seeded draws per family:
  4–18 % pass as drawn, 77–83 % after the first repair, 99.1–99.6 % within three attempts, shipped-palette fallback
  0.4–0.9 %.
* `docs/validation/bench/fixall_rendering_r2_budgets.py` → `.out`: the first-map laws, their values at every band's
  bottom, default and top, the knees (TOWN 150 ms at 1 571 buildings, CITY 0.4 s at 5 667, METROPOLIS 1 s at 14 194;
  single-worker METROPOLIS 11 443), the cap value (2 290 ms), the worst-case tile positions and canvas needs for seven
  viewports, the first-frame and settle compositions, and the verification law (the reference mix ≈ 1 395 ms; 300
  district regenerations ≈ 11 125 ms); the MFCG and FTG ratios of §12.9 recomputed from those laws.
* `docs/validation/bench/fixall_rendering_r2_host.out`: the reference host read on 2026-09-25 — MacBookAir10,1, Apple M1
  (4 + 4 cores), 17 179 869 184 B (16 GB), macOS 14.7.8, Chrome 153 installed today, Node v24.12.0 — and the capture
  record's own fields (`chrome: null`, no memory size).

**PLAUSIBLE (reasoning only), each with its confirming milestone and pre-decided fallback in its block:** the
per-building and per-tile raster rates behind F(B) and the settle budget (M1 / M2b, tile-DPR step-down); the ≈ 3.4
persons per building behind the people figures (§12.2's own PLAUSIBLE); that the IM FELL Great Primer file lacks or
carries `smcp` / `onum` (the CI test picks the path); that desktop SVG editors do not honour an embedded `@font-face`
(CI renders each variant in its consumer); the per-kind replay costs of §12.6 (M2a, restated if missed); the canvas
scratch sizes (crowns and atlases ≤ 5 MB).

## 1. Disposition table

All 27 round-2 items are FIXED; none is INVALID, none is STAGED-BY-OWNER, none is deferred. Every mechanism below is in
the §2 blocks; items whose last step lies in another area's section also have a §3 request.

| item | disposition | sections changed | mechanism (one line) |
|---|---|---|---|
| NF-D10 | FIX | §8.1 (new `key` column, item 5), §8.2, §8.3, §8.10 | every render-time hash is `RH32(tag, key, salt[, ordinal / cell][, style id])` over the entity's 64-bit lineage hash carried in the mark table, never the session-local handle; tint order by address; a reload / two-derivation-order pixel-identity census row |
| NF-D11 | FIX | §8.10; §3 → §7.1, §7.4 | an override applies by ordinal only while no `carry` or supersession follows its event **and** the ordinal still lies within 0.5 × spacing of the recorded `point`; otherwise it re-matches by position (claim-once, log order), else orphaned; resolved in the generation worker |
| NF-D13 | FIX | §12.3 | "merged in district lineage order (§4.1, §6.3)" |
| NF-P12 | FIX (with NF-D13) | §12.3 | the same sentence |
| NF-D14 | FIX | §11.2, §11.3; §3 → §14 | `ApplyResult` = ok / conflict / `confirm { token, fates, counts, scope }`; `PlatApi.confirm(h, token, fates)` and `cancel`; resubmitting the event with `fates` filled is the same operation (commits only if a fresh dry run computes the same fates); `query({ kind: 'fates' })` pages; the bridge sends confirmed events with their fates |
| COV-NG-XB32 | FIX | §11.1, §8.10 | GeoJSON tree MultiPoint gains `species[]` (per-tree features `species`); CityJSON `SolitaryVegetationObject` per instance with `species`, `crownDiameter`, `height`; glTF instancing node per (green entity, crown class) with per-instance `species` in `extras` |
| N-2 | FIX | §12 intro, §12.3, §12.5, §12.9, §8.5; §3 → D-18, J-R17, J-R7, J-I2, §1.2, §4.1, §15.1, §16 | first map as laws of B: TOWN ≤ 40 ms + 70 µs × B, CITY ≤ 60 + 60, METROPOLIS ≤ 120 + 62 (model law + F(B) ≤ 20 ms + 10 µs × B); one second holds for every TOWN and CITY and METROPOLIS ≤ ≈ 14 200 buildings (≈ 48 000 people); ≈ 2.3 s at the cap declared for veto; B-CITY runs at band bottom / default / top (M1 TOWN, CITY; M2b METROPOLIS) with pre-decided fallbacks |
| N-3 | FIX | §8.2, §9.4, §8.3; §3 → §13.4 | halo = the local role when text passes the label floor, else `ground` (guaranteed by the ink / ground row); matrix gains ink / paper (label floor), ink / building (30 / 40), ink / tree (25 / 30); `lit` ink → `#34281E`, `hatched` ink → `#2A231D`; all pairs recomputed and passing; B-ZOOM checks every glyph |
| N-4 | FIX | §8.1 (`LabelTable`, `InstanceTable`, `StringTable`), §8.2 (live layers), §8.6, §8.9 (threads, crossing rows), §8.10, §12.7, §12.8 | providers, override resolution, on-demand bands, `compose()` and close-ups run in the generation worker or pool; the tile worker holds no model and receives label, instance and string rows and band answers as transferred `DisplayDelta` slices with stated bounds |
| N-5 | FIX | §8.8, §8.9, §12.5; §3 → §15.1 | base and labels composed into one bitmap per tile in the tile worker; the ≤ 4-per-frame cap applies to gestures only, first paint and settle commit every ready tile; tile count (P = 35 at 1 440 × 900 @2) and per-tile / per-building raster rates stated for first frame and settle; draw calls ≤ 80 × P per view |
| N-6 | FIX | §8.5 | bounded = covered share ≥ 0.8 on **both** sides and width ≥ the 1.5-px closing; drawn whenever access-critical and below 0.8 on either side; mass closing never crosses a drawn way's corridor; metric uses the same definition |
| N-7 | FIX | §8.1 item 3, §8.2 (order note), §8.8, §8.3 | slot-major across the scene, passes inside a slot; way casings / bodies are separate slots; bridges cased on their sides only; census asserts the logged (slot, pass) sequence is non-decreasing |
| N-8 | FIX | §8.4, §8.8 | path-mode sun quantised to 1° in the tile key; shadows in their own half-resolution per-tile layer between `under` and `over` base layers where the budget admits, so a step re-rasters only shadows; latest-wins; M2b measurement with a 3° fallback |
| N-9 | FIX | §8.8 (a, b), §8.1 item 6 and §12.8 (c), §8.4 (d) | (a) m_k per CSS px, tile side 512 × m_k ÷ d; (b) budget 3P + 7 MB from the viewport, tier ceilings 72 / 128 / 192 MB with a tile-DPR step-down rule; (c) 54 B per mark, ≈ 10 MB display list at CITY, one full copy; (d) §4.2 S1 (2), §2.7, II.6 |
| N-10 | FIX | §8.10, §8.3 | `grid` rank = bit-reversed Morton (2-D van der Corput), `line` rank = bit-reversed index; band b draws r < s_b; census covers all three layouts |
| N-11 | FIX | §9.2, §9.4, §8.1 (`LabelTable.parent`) | rung 5 decided per stop from geometry before the greedy; the ancestor QuarterNode's own label is one candidate per stop with the highest yielding member's priority, the node's area and id; yielding members suppressed and reported |
| N-12 | FIX | §9.2, §8.2; §3 → §17.2, §16 | PR-tier CI (from M1) asserts `cmap` / `hmtx` / `glyf` and reports `smcp` / `onum`; the path per face is chosen by the test: the face's own features, else the family's OFL SC cut, else synthetic small caps at 0.75 cap height; lining figures without `onum` |
| N-13 | FIX | §11.1, §12.7, §8.9; §3 → §17.2 | SVG text as glyph outlines (`<defs>` + `<use>`, text in `aria-label` / `<title>`) by default, or editable text in the unmodified face embedded as an `@font-face` data URI; both counted in the SVG budget; CI renders each in its target consumer |
| N-14 | FIX | §11.1 | default strict RFC 7946 WGS84 via an inverse transverse Mercator at the geo anchor (default 0° / 0° / 0°, `plat` foreign member, 7 decimals, no `crs`); metric variant by prior arrangement with a sidecar; CityJSON carries the anchor as `+platGeoAnchor` |
| N-15 | FIX | §11.3; §3 → §2.9 | the document style stays canonical (`setStyle`, owner / editor only); the view key becomes `stylePreset`, a per-viewer preset that never writes `setStyle` |
| N-16 | FIX | §12.6; §3 → §7.3, §2.9 (N-1 alignment) | V = M(B) + Σ c(e) + S14(B) + 5 ms with per-kind c(e); the reference mix (300 edits at CITY) ≈ 1.4 s; 300 district regenerations ≈ 11 s; measured at M2a with a pre-decided restatement |
| N-25 | FIX | §8.2, §8.5 | `ink` field → `#ECDFBF` (chroma 17.3); `ink` wall = ink; courts drawn as `ground` at the city band — eight city-band role colours, max chroma 17.3 |
| N-26 | FIX | §8.2; §3 → §6.1, §16 | bounded repair: fixed row order, ≤ 100 unit steps (raise lighter, else lower darker), sRGB re-check, ≤ 3 attempts from `style.random`, then the shipped palette; simulated fallback 0.4–0.9 %; M3b confirmation with a narrower-window fallback |
| N-27 | FIX | §12.1, §12.5, §12.7, §12.8; §3 → §13.8, §16 | (a) Chrome cross-check in the nightly tier, the Chrome figure governs a > 15 % gap; (b) `bench/calibrate` records memory, OS and browser versions (host facts read and recorded); (c) first map, settle, re-raster, SVG and PNG budgets confirmed at M1 / M2b with pre-decided fallbacks |
| N-28 | FIX | §9.1 (`Placement`), §9.2 | `Placement` = stop, size px, anchor, spine, direction, lines; fixed pin at its own and finer stops, a yielding candidate (hidden and reported) at coarser stops; the dry run refuses pin-on-pin collisions at a pin's stop |
| NF-S7 | FIX | §12.9 | FTG compared at BIG_TOWN and BIG_CITY from M-1 (METROPOLIS per D-31); the existing timing is FTG's CITY preset, restated against PLAT's law at its 2 798 buildings |
| NF-S11 | FIX | §8.2 | the texture generator is `plat/tools/textures/`; each asset names script and seed |

## 2. Replacement blocks


=== REPLACE 8.1 The display list (renderer-independent, columnar, incremental) ===

### 8.1 The display list (renderer-independent, columnar, incremental)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

```ts
type LodBand = 'city'|'district'|'neighbourhood'|'building';
type MarkKind = 'area'|'ribbon'|'outline'|'hatch'|'glyph'|'text'|'instances'|'shadow'|'field'|'shore';
// one row per mark; every column is a typed array, so any slice is transferable (§8.9); bytes per mark on the right
interface MarkTable {
  count: number;
  kind: Uint8Array;                    // MarkKind index                                                                              1
  semantic: Uint16Array;               // index into DisplayList.semantics ('water.sea', 'ground.block', 'way.primary', 'building.footprint', 'shore.segment', …)   2
  entity: Uint32Array;                 // interned entity handle (§2.1): session-local; routes deltas, hit-tests and edits; never hashed (item 5)   4
  key: Uint32Array;                    // 2 per mark: the entity's 64-bit lineage hash (§6.3) — the key of every render-time hash (item 5)         8
  layer: Uint8Array; z: Int32Array;    // model layer (§2.1) and order inside it                                                      1 + 4
  lodMask: Uint8Array;                 // one bit per LodBand in which the mark exists; geometry never changes with the band           1
  pass: Uint8Array;                    // 0 fills · 1 casings · 2 bodies · 3 linework and symbols · 4 overlay — the order within a slot (item 3)   1
  group: Uint32Array;                  // district handle: the unit of delivery and invalidation, never a raster cache unit            4
  bbox: Int32Array;                    // 4 per mark, world cm                                                                        16
  geomStart: Uint32Array; geomLen: Uint32Array;   // into GeomTable (face rings, chain, point set, text spine) or FieldRaster ids        8
  revision: Uint32Array;               // content revision of the entity's inputs (low 32 bits of its §6.2 leaf digest) — the cache key (LC-23)   4
  attrs: Record<string, Float32Array | Uint32Array>;   // named columns, 4 B per mark each where present: heightCm, baseCm, prosperity, class, block, bankKind, waterKind, exposure, material, tintKey, …
}                                                        // fixed columns: 54 B per mark
interface GeomTable { rings: Uint32Array /* ring start offsets into coords */; coords: Int32Array /* x, y cm pairs */ }
interface FieldRaster { id: number; originX: Cm; originY: Cm; cellCm: Cm; cols: number; rows: number;
  values: Float32Array | Int16Array; meaning: 'heightCm'|'shoreDistanceCm'|'depthCm'|'custom' }
interface StringTable { utf8: Uint8Array; offsets: Uint32Array }                 // names and species kinds as one transferable UTF-8 blob
interface LabelTable {                // one row per LabelEntity drawn at the band (§9.1) — everything S13b reads; ≤ 96 B per row plus geometry and text
  count: number; mark: Uint32Array /* its text mark */; key: Uint32Array /* 2 per row: the LabelEntity's lineage hash */; kind: Uint8Array; lodMask: Uint8Array;
  priority: Float32Array; areaM2: Float32Array /* the target's area: the order's second key (§9.2) */; text: Uint32Array; shortText: Uint32Array /* StringTable rows; ~0 = none */;
  spines: Uint32Array /* 2 per row: GeomTable ring range, in order of preference */; anchors: Uint32Array /* 2 per row: range of point anchors */; breakAt: Uint32Array /* 2 per row: range of glyph indices */;
  parent: Uint32Array /* the row of the parent QuarterNode's label (§9.1, §9.4 rung 5); ~0 at the root */;
  pinStop: Int8Array /* −1 = not pinned */; pinSizePx: Float32Array; pinAnchor: Int32Array /* 2 per row, world cm */; pinSpine: Uint32Array /* 2 per row: GeomTable range */;
  hidden: Uint8Array; revision: Uint32Array }
interface InstanceTable {             // one row per `instances` mark (§8.10), ≤ 40 B per row
  count: number; mark: Uint32Array; layout: Uint8Array /* stamp | grid | line */; offset: Int32Array /* 2 per row, cm */; rotationCdeg: Int32Array; spacingCm: Int32Array;
  species: Uint32Array /* 2 per row: range into speciesRows */; overrides: Uint32Array /* 2 per row: range into overrideRows */;
  speciesRows: { kind: Uint32Array /* StringTable row */; inner: Float32Array; outer: Float32Array; leafType: Uint8Array };                         // ≤ 16 B per row
  overrideRows: { ordinal: Uint32Array /* 2 per row */; op: Uint8Array; x: Int32Array; y: Int32Array; style: Uint32Array /* 2 per row: InstanceStyle fields */;
                  state: Uint8Array /* byOrdinal | rematched | orphaned (§8.10) */ } }                                                              // ≤ 32 B per row
interface DisplayList { marks: MarkTable; geom: GeomTable; rasters: FieldRaster[]; semantics: string[]; strings: StringTable; labels: LabelTable; instances: InstanceTable;
  salts: { instances: number; crowns: number; jitter: number } /* §6.1's effective non-geometry salts */; layers: LayerSpec[]; bounds: Box; version: number }
interface DisplayDelta { version: number; groups: number[]; removed: Uint32Array /* entity handles */; marks: MarkTable; geom: GeomTable;
  strings: StringTable; labels: LabelTable; instances: InstanceTable; dirty: Box[] }
interface DisplayListBuilder {                                   // S14; runs in the generation worker on the read-only model
  build(model: ModelView, band: LodBand, groups?: number[]): DisplayList;             // full build (generation, load), or one band for the named districts (on-demand bands, §8.9)
  update(model: ModelView, changed: Set<EntityHandle>, band: LodBand): DisplayDelta;   // edits, scoped regeneration, override resolution (§8.10)
}
```

1. **Built by S14 from the model through the entity registry** (each type → marks per band); backends never read the
   model. Footprint geometry is identical in every band (O12 a; O17 i); only which marks are emitted and which programs
   run change.
2. **Kinds added.** `field` marks carry a raster in world space (terrain height for hillshade and contour marks,
   distance to shore for water ramps and foam, depth) and cost nothing when no program reads them (VIS-12). `shore`
   marks are chains, one per maximal run of equal attributes along a water face's boundary, with the attributes
   `bankKind` (§2.3), `waterKind` (the water body's kind), `exposure` and `shoreClass` (bay / headland / straight, §2.3;
   read by the shore programs' per-class rows); `exposure` = `sheltered` when the segment bounds a harbour basin, moat,
   canal or pond or when its fetch (the longest straight run across water within ± 30° of the outward normal) is below
   300 m, `river` for river and tributary faces, else `open` (VIS-13). `instances` marks carry a face or chain and one
   `InstanceTable` row — the stamp's offset, rotation and spacing that S14 draws from the entity's `render.instances`
   stream, the species mix and the resolved overrides — and their points are generated at raster time by §8.10, never
   stored in the list. `text` marks carry one `LabelTable` row each, so label placement (S13b, §9.2) needs nothing but
   the display list (N-4).
3. **Slot, pass and the draw order (N-7).** The draw order is **slot-major across the whole scene**: every mark of
   slot s of the style's layer-order table (§8.2) is drawn before any mark of slot s + 1, in every tile; within a slot,
   marks draw in `pass` order (fills, casings, bodies, linework and symbols, overlay), then by `z`, then by `key`. Way
   casings (slot 5) and way bodies (slot 6) are separate slots that hold every way class, so every way casing precedes
   every way body across the scene and no district's drawing can put a casing over another district's body (GEO-28);
   masses, fields, woods and shadows keep their slots after the roads (K16, the NG shadow order, MFCG's wards after
   roads). `group` is the district and is used only to deliver and to invalidate; rasters are cached per world-aligned
   tile (§8.8), never per district.
4. **Incremental.** After an edit or a scoped regeneration the builder receives the changed entity handles (the
   locality closure of §7.3) and emits a `DisplayDelta`: removed marks, new marks for changed entities and for the
   entities whose marks depend on them (a way's marks when a junction on it moved; a district's ground mark when a block
   in it changed), the label and instance rows of those entities, and the dirty world boxes = the old and new marks'
   bboxes dilated by the largest cross-tile effect (§8.8). Cost O(changed marks). During a replay (loading a log, undo
   beyond the scoped records, migration) the builder is suppressed and runs once at the end (SCL-9) — S13a is model data
   and runs at each event's log position (§7.3 item 2); only S14 and S13b wait for the end.
5. **Cache keys and render-time keys (LC-23, NF-D10).** Every derived artefact — roof geometry, label spine, footprint
   mass, instance set, tile raster, glyph run — is keyed by (the entity's `key` or the tile address, content revision,
   band, style version, roof construction where it applies), never by id alone: a `setAttr` on floors changes the
   building's revision and so its roof; a changed boundary street dirties the region on both of its sides. **Every hash
   drawn at render time** — a multi-colour role's index, weathering, the stamp's tile variant, a grid's jitter, crown
   index and colour and scale jitter, hatch phase, roof detail, the `ruin` dash pattern — is
   `RH32(tag, key, salt[, ordinal or cell][, style id])`: a tag naming the use, the mark's lineage hash `key`, the
   concern's salt (§6.1), and the style id only for looks (colours, crowns, hatch), never for positions; `RH32` (the render
   hash; distinct from the string hash `H32` of §13.6) folds the words, the tag being an index into a fixed render-tag
   table, through MurmurHash3's 32-bit finaliser. It never reads the interned handle, which is session-local and changes
   with interning order across reloads and derivation orders. The lineage hash is model data (§6.2's leaf), the same in
   every session, derivation order and host, so an unchanged model renders pixel-identically after a reload (§6.2) and
   the golden PNGs hold (§13.3). Where a render rule orders entities (the tint colouring, §8.2) it uses address order
   (§6.3), which is stable too. A Regenerate (keep settings) re-mints the same lineage and so the same look; New random
   gives a successor a fresh lineage (§6.3) and so a fresh look — it is a new building under the old address.
6. **Size (N-9 c).** 54 B per mark in the fixed columns, plus 4 B per mark for each attribute column the slice carries,
   the label and instance tables and geometry: a CITY city band of ≈ 60 000 marks is ≈ 3.2 MB of fixed columns,
   ≈ 2.4 MB of attribute columns, ≈ 4 MB of coordinates and ≤ 0.5 MB of label, instance and string rows — ≈ 10 MB. The
   tile worker holds the only full copy; after each transfer the generation worker keeps just the columns `update()`
   reads (`entity`, `bbox`, `group`: 24 B per mark, ≈ 1.4 MB at CITY) (§8.9, §12.8).

Chose a columnar, transferable mark table over `Mark[]` objects because a 60 000-object list costs the receiving thread
≈ 140 ms to deserialise (redteam-scale §7.3) while typed arrays transfer in constant time and slice cheaply into deltas;
chose world-aligned tile rasters over per-district rasters because district boundaries are streets (GEO-28) and a
district bitmap cannot follow continuous zoom (SCL-7). Chose the lineage hash as the one render-time key over the
address because the lineage keys every other draw of the entity (§6.1), so a New random that re-rolls a building's
shape also re-rolls its look, where the address would keep a re-rolled building's old colour; and over the interned
handle because handles are session-local (NF-D10). Chose a slot-major order with passes inside each slot over the
pass-major order ("every fill, then every casing, then every body") because pass-major drew every road casing over the
masses, fields, woods and shadows, against the slot table's own reasons (N-7), while slot-major keeps GEO-28's guarantee
through the separate casing and body slots.

=== REPLACE 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2) ===

### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

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

**Contrast matrix (replaces the luminance rule; O12 f).** Pairs that must separate wherever both roles are drawn — the
city band unless the row says otherwise — with floors on CIEDE2000 and on the lightness difference:

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
| field / road; field / ground | 4 | — |
| court / road (district band and finer: courts are drawn as `ground` at the city band, §8.5) | 4 | — |
| court / ground (district band and finer) | 3 | — |
| ink / road; ink / ground; ink / paper (text, its halo and outlines: the **label floor**, §9.4) | 40 | 50 |
| ink / building (outlines and landmark rims; text crosses masses only on a halo, §9.4) | 30 | 40 |
| ink / tree (crown outlines) | 25 | 30 |

Checked (1) on every palette when it is loaded — built-in, user-edited or random — and (2) on rendered city-band images
in B-ZOOM: the mean CIELAB of the pixels whose top mark has each role (read from the pick buffer), for every pair
present in the view. A user edit that fails is shown with the failing pair and kept only with an explicit "accept low
contrast" flag recorded in the report. MFCG's default palette has garden = building (ΔE2000 0.6) and tree = water
(0.0); both are recorded as reference weaknesses not to copy (VIS-2).

**Random styles and their bounded repair (N-26).** *Random style* draws each role's L* within ± 12 of the family's
shipped value, chroma in [0, 18] in `ink` and [0, 30] otherwise, and any hue, keeping `road` = `paper` where the family
ties them; the draw comes from the `style.random` stream (§6.1) with the `setStyle` event's `seq` as its creation index
and the attempt (0–2) as its attempt component — a style-time draw whose result is written into the event as row
operations, so a replay never re-draws it. A
failing draw is **repaired in bounded steps**: take the first failing pair in the matrix's row order; raise its lighter
role's L* by 1 (up to 97), or, when that role is already at 97, lower its darker role's L* by 1 (down to 3); re-check
every pair; stop when all pass or after 100 steps; a repaired palette must still pass after conversion to sRGB. A draw
that fails its repair is redrawn on the next attempt; after three failed attempts the family's shipped palette is used
and the report says so. The loop ends by construction (≤ 300 steps), where the old rule — raise the lighter role until
every pair passes — could cycle (raising `ground` for ground / building lowers road / ground) or never end (a darker
role above L* 50 against a ΔL* 50 floor). Measured on 2 000 seeded draws per family with every row of the matrix
(`docs/validation/bench/fixall_rendering_r2_palette.out`): 4–18 % pass as drawn, 77–83 % after the first repair (median
5–17 steps), 99.1–99.6 % within three attempts; the shipped-palette fallback fires for 0.4–0.9 %. **Confirmation (M3b,
where random styles ship with O12's extras):** the shipped-palette fallback ≤ 2 % of 10 000 draws per family;
pre-decided fallback: the L* window narrows from ± 12 to ± 8 and the run repeats. Chose a bounded repair with redraws
and a shipped-palette floor over the unbounded raise because O12 (f) asks that every presented style meet the floors
and only a bounded procedure can promise an answer.

**Role values (our own; PLAT 2026-09-25, retuned by fix-all round 2; calibratable table rows).** Every pair of the matrix,
the outline rows included, was computed on these sRGB values and passes its floor
(`docs/validation/bench/fixall_rendering_r2_palette.out`; e.g. `ink` road / ground 6.9 / 10.0, ground / building
16.1 / 21.1, tree / water 20.7, court / ground 4.2, ink / building 41.9 / 47.9 — `lit` ink / building 37.8 / 43.0,
`hatched` 34.5 / 40.6):

| role | `ink` (default) | `lit` | `hatched` |
|---|---|---|---|
| paper | `#F6EDDE` | `#DED6CC` | `#D4CABF` |
| road | `#F6EDDE` (= paper) | `#D8D0C8` | `#B6A99B` |
| ground | `#DED0BB` | `#CBB9A2` | `#D4CABF` (= paper) |
| court | `#ECE0C6` | `#D1C5B2` | `#B7B898` |
| building / roof (lit side) | `#A49689` | `#AD8A72` | `#9D7D68` |
| ink / label | `#292522` | `#34281E` | `#2A231D` |
| wall | `#292522` (= ink) | `#857A6E` | `#685C51` |
| water | `#AABBC5` | `#6D9CB9` | `#98AFBB` |
| green | `#BCC8AB` | `#9AB37F` | `#B0B48C` |
| garden | `#C7CCAF` | `#8EA96D` | `#A8AF83` |
| tree | `#7E907A` | `#5B7A4F` | `#798C67` |
| field | `#ECDFBF` | `#D8BE89` | `#E5D6B5` |
| verge | `#D9DCC5` | `#ADBB95` | `#BBBEA1` |
| shadow | ink at α 0.35 | ink at α 0.45 | ink at α 0.40 |

The ink family keeps its character by value steps: eight role colours at the city band — paper (= road), ground,
building, ink (= wall = label), water, green, tree and field; courts are drawn as `ground` at the city band (§8.5), and the
raised under-copy and shadows are the ink at an alpha, not further colours — and no role with CIELAB chroma above 18
(`field` is the highest at 17.3) (IMPROVEMENTS O12 restraint: one ink, 4–8 roles). Chose low-chroma value steps over
saturated hues for the default because the restraint clause asks for one ink and a few roles, and eight tones meet
every floor. Chose to draw walls in the ink itself and courts as `ground` at the city band over a ninth city-band tone
because the restraint clause names one ink and 4–8 roles, and at city zoom a court is enclosed by masses on every side,
where its small step from `ground` adds noise rather than information (N-25). Chose to darken `lit`'s and `hatched`'s
ink (L* 25 → 17 and 18 → 14) over lowering the outline floors because building outlines and text over masses need the
separation the `ink` family already has (N-3).

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
ruined state, with the `none` roof kind, §2.6), beside two tone overrides keyed by the decline states of §2.8:
`existence = abandoned` (the roof tone lerped 30 % toward `ground`, no raised under-copy) and `existence = decayed` (the
outline dashed, the fill at 60 % alpha); `symbol(glyph)` (point symbols for the whole pin vocabulary of §2.7: tent, stall,
well, fountain, large tree, cross, market cross, shrine, pump, trough, gallows, statue, monument, bandstand, campfire,
fire pit, lamp post). Lane ends: a lane's body and casing end square at the kerb of the way it meets; the junction wedge
belongs to the higher-class way (the renderer half of GEO-21). Hairlines and casings are in paper px; ribbons and
symbols follow the symbolisation table — MFCG's two coordinate spaces, now stated.

**Relief tier (VN-029, VN-031; base should-have, optional, off by default).** Contour, hachure and grass marks are
extracted per render tile from the terrain `field` mark by marching squares over the tile's cells plus a margin, then
resampled evenly along each level line (`contourMarks`); `hillshade` runs on the same field. VG-specific looks (its
spotlight vignette and dramatic forest) stay in the reserved `painterly` family.

**Multi-colour roles (XB17).** A role may hold a list; an individual mark (a building, a roof, a tree, a stall) takes
index `RH32(role, key, salt[, instance ordinal], style id) mod n` over the mark's lineage key (§8.1 item 5); aggregate fills (block ground, city-band masses,
wood fills) take index 0. Deterministic, so two renders of one model are pixel-identical (§6.2).

**Tints and weathering (K12).** `tint`: per district a hue from a greedy colouring of the district adjacency graph in
address order (§6.3) (hue = base + 137.5° × colour index, stepped by 30° until every neighbour differs by ≥ 30°); method `spectrum`
(hue at fixed saturation and value), `brightness` (value scaled) or `overlay` (blend toward the hue), strength 0–1;
applied to the roofs of built districts; outlines take lerp(ink, tint, 0.3); recomputed when the palette changes; off in
`ink` by default. `weathering`: each roof's RGB scaled by 1 + u·w, u ∈ [−1, 1] from `RH32('weathering', key, salt, style id)`, w = 0.04 (ink), 0.06
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

**Live layers (K13, N-4).** `interface LiveLayerProvider { id: string; target: 'base'|'overlay'; marks(view: ViewState, model: ModelView, region: Box): MarkTable }`
adds display-list groups that are view data (never in the model hash). Providers run in the **generation worker**, which
holds the model: it calls a provider when the view state it reads, the model or the visible region (dilated by one
tile) changes, and delivers the marks as a `DisplayDelta` of group `live.<id>` (§8.9). An `overlay` provider's marks are
drawn in the tile worker's composition step with the labels (§8.8), so a selection or a moving person re-composes tiles
without re-rastering them; a `base` provider (a thematic recolouring) is part of the tile key (§8.8). Shipped:
`live.selection` (overlay), `live.favourites` (base: favourite buildings as a thematic override keyed by the view
state's `favourites`) and, registered by the simulation module, `live.people` (overlay: favourite persons' positions
from the module's occupancy at the view-state hour, one categorical colour per person).

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
| 23 | labels (glyphs composed onto each tile, §8.8) | MFCG: labels |
| 24 | title, legend, emblem | MFCG: title |
| 25 | live layers, annotations, measure overlay | new: view data on top |

NG's recorded order (greens → roads → shadows → buildings → props → trees depth-sorted → title) is the `hatched`
sheet's, again a subsequence of its slots. The order is **slot-major across the whole scene**, with casings before
bodies inside each slot (§8.1 item 3); "every casing before any body" holds for ways because their casings (slot 5) and
bodies (slot 6) are separate slots, and a bridge or pier (slot 14) is cased along its sides only — its ends are open
where it meets its way — so no later casing crosses an earlier body. Slots 1–20 are the base raster; slot 23 and slot
25's world-space live marks and annotations are composed onto each tile by the tile worker (§8.8); slots 21, 22, 24 and
the measure overlay are screen-space furniture drawn by the main thread over the composed tiles (§9.5). The census
checks that every tile's draw calls follow this table (§8.3).

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

Faces follow §17.2's ruling — the default label face is IM FELL Great Primer in every family; small caps and old-style
figures come from the font's own substitution tables, or from the family's small-caps cut and lining figures when a
face lacks them (§9.2, N-12).

**`lit` on the reference backend (VIS-7).** Every `lit` program runs on Canvas2D: textures are `pattern` fills of
greyscale seamless tiles tinted by the role colour (multiply); lighting is `faceLight` per face from stored geometry,
one directional light from the sheet's sun; soft shadows are `shadowPass` polygons with `penumbraPx`: the shadow polygon
plus two outward offset rings at ½ and 1 penumbra with α ⅔ and ⅓ — vector, no bitmap filter, so Fantasy Manor's ≈ 90 %
bitmap-shadow cost is avoided; canopy shading is baked into the crown sprites once per session per light direction; the
water depth ramp and foam are `ramp` and `foam` over the shore-distance field, per tile (≈ 1.3 ms per 512² tile). The one
thing not drawn is per-pixel normal-map relief on roofs and walls; `lit` uses per-face tones plus texture instead, and
the style dialog says so. **Texture set** (our own, procedural: generated by `plat/tools/textures/`, inside the product
repository (§17.1 (3)), with fixed seeds; every file in `plat/assets/textures/` names that script and its seed (§17.1
(5)); no third-party texture; NF-S11): tilled soil, grain, pasture, meadow, orchard ground, marsh, sand, pebble,
rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment — 15 greyscale 256 × 256 px
toroidal tiles (≈ 1 MB raw, ≈ 0.6 MB as PNG), metres per tile per band in the sheet; crop and livestock variants of the
arable and pasture tiles are chosen by `LandUse.crop` and `LandUse.livestock` when present (VS27) and by the land-use kind
otherwise; authored in M2b (≈ 1 person-week). Chose Canvas2D as `lit`'s reference backend over WebGL2 because one drawing path keeps screen, PNG
and print identical (O12 c), removes the duplicate render path both creators warned about, and every part of the lit
look has a vector or per-tile raster form inside the tile budgets; normal-mapped relief is the only loss.

**Style constraints.** The contrast matrix above; the option-interaction matrix test (no option silently disables
another — MFCG's Block mode dropping trees); every preset survives a render with no fills and one with no outlines (R13).

=== REPLACE 8.3 Symbol catalogue and draw-style census ===

### 8.3 Symbol catalogue and draw-style census

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

**Catalogue.** Filled faces with hairline outlines; cased ribbons with square lane ends at kerbs; shore marks per bank
segment; repeated-offset shoreline bands; raised under-copies and prism shadows from heights; library crowns (20 per
class per style, §8.10); clipped hatching at a per-face angle and tapered ticks; one composited shadow pass per layer;
tinted pattern textures with per-face light; field-raster ramps, hillshade and contour / hachure marks; curved per-glyph
text with a role halo; point symbols for the whole pin vocabulary of §2.7 (tent, stall, well, fountain, large tree,
cross, market cross, shrine, pump, trough, gallows, statue, monument, bandstand, campfire, fire pit, lamp post);
screen-space furniture (§9.5). Every semantic visible at a band has exactly one registry glyph, from which
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
| draw order: the (slot, pass) sequence of every tile's draw calls, logged by an instrumented raster (N-7) | all | non-decreasing in the style's slot table, then in pass, in every tile |
| contrast matrix (§8.2) on the rendered city band | all | every pair present at or above its floors |
| text against its halo, every placed glyph (N-3) | all | the label floor (ΔE2000 ≥ 40, ΔL* ≥ 50), halo role by §9.4's rule |
| foam on `quay` and `sheltered` shore segments | lit | 0 % |
| tree marks over a tier-1/2 casing at the city band | all | 0 pixels |
| casing pixels inside junction mouths on district boundaries | all | 0 |
| role continuity across band switches | each family | mean roof and ground ΔE2000 < 2 |
| decoration stability over a city → neighbourhood → city sweep, for stamped classes (woods, gardens, parks, scatter) and jittered `grid` (orchards) and `line` (avenues, hedgerows) classes (N-10) | all | each instance appears at most once and keeps its position; every coarser band's set is a subset of the finer band's; an unchanged view re-renders pixel-identically |
| render-time keys: an unchanged model saved, reloaded and rendered, and derived in two district orders (NF-D10) | all | tiles pixel-identical to the first render |
| roof lines outside their footprint (the F-SKELETON plain downgrade) | all | 0 |
| per wing, `hatched` | hatched | hatch triangles 15–20; no ridge stroke; outline = footprint only (NG BG-3; N35) |
| two-tone roof law with our palette | hatched | dark = lit × lerp(ambience, shadow, α) within ± 0.02 (IMP-15) |
| water bands | painterly | band widths follow W · (i / N)^1.5 for our N and W within 1e-4 |
| label floors, counts, collisions | all | §9.4 |
| street-edge recoverability, access ways drawn | ink | §8.5 |

=== REPLACE 8.4 Layers, shadows, heights ===

### 8.4 Layers, shadows, heights

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

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
  island is placed (over water, fields or outskirts by default; over the built core only by assignment) is decided by
  §4.2 S1 (2), `SkyIsland.placement` (§2.7) and II.6's placement rule (N-9 d); B-ZOOM reports the ground area occluded
  by sky layers. The island generator itself is owner-staged; these fields
  are its hook.
* **Two different things, stated separately (K06).** The **raised under-copy** (`raised`) is MFCG's Raised: a dark copy
  of each footprint beneath it at one constant offset (§8.2's symbolisation row) — ON by default in `ink`, not a shadow
  and not height-dependent. **Projected shadows** (`ShadowPass(layer, sun)`) are height-derived and OFF by default
  (owner: shadows optional).
* **Shadow casters** (WC5): buildings and wings (prism from `baseCm` to eave and ridge), towers and gatehouses (prism),
  curtain walls (prism of the band), bridges and piers (deck prism over water, which VG draws), trees (crown offset by the
  crown height), sky layers (the island outline projected by `elevationCm`). Every caster projects along the sun vector
  from its base elevation (`baseCm`, FTG-13) onto the ground; the ground under a footprint lies within the plinth
  tolerance of FTG-13's invariant, so a flat projection from the base is exact to that tolerance; a wing's foundation
  skirt (§2.6) is part of its prism. Shadows are unioned per layer and composited once per layer per tile — into the base raster
  in `fixed` sun mode, and into a per-tile shadow layer of their own in `path` mode where the tier's canvas budget admits
  it (§8.8), so a moving sun re-rasters only shadows. `drop` mode offsets each caster's footprint by height ×
  cot(altitude) along the sun's azimuth; `prism` mode draws the swept prism; both from the same heights.
* **Sun (K05).** `SunSpec = { azimuthCdeg; altitudeCdeg; colour: Color; intensity: number; mode: 'fixed'|'path'; latitudeDeg: number /* path mode; default 50 */ }`;
  fixed by default (azimuth 315°, altitude 45°: light from the upper left); in `path` mode azimuth and altitude come from
  `sunPath(latitudeDeg, dayOfYear, hour)` (solar declination and hour angle, evaluated with `dmath`), driven by the
  view-state time (§11.3; the simulation module's clock when it runs), the hemisphere following the latitude's sign;
  the tiles read the path-mode sun quantised to 1° in azimuth and altitude (§8.8, N-8);
  below −6° the sheet switches to its night variant (`night` roles; `lights` glow instances from the module); shadow
  length is capped at 8 × height near sunrise and sunset. Shadows are vector, so there is no shadow-resolution setting.
* **Budget (AM-3).** The projected pass costs ≤ 20 % of a tile's raster time (vector offsets and one union per layer);
  Fantasy Manor's ≈ 90 % bitmap-shadow cost is avoided by construction, and `penumbraPx` (§8.2) is two vector rings, not
  a blur. **Measurement:** M2b times the pass on METROPOLIS tiles with `prism` shadows on. **Pre-decided fallback:** a rung
  that misses the budget draws `drop` mode instead of `prism` (the same heights, one offset polygon per caster), and the
  report says so. **A moving sun (N-8):** in `path` mode one 1° step re-rasters the visible tiles' shadow layers and
  re-composes them — ≤ 20 % of the view's settle raster plus ≈ 0.2 ms per tile, inside the settle budget of §12.5 — and
  a newer step cancels an older step's pending tiles (latest wins); on a tier whose budget has no room for shadow layers
  the step re-rasters the base tiles instead, within the same settle budget. **Measurement:** M2b times steps on
  METROPOLIS views with the sun advancing one step per frame, on the reference and low-end devices. **Pre-decided
  fallback:** a tier whose step misses the settle budget quantises the path-mode sun to 3° instead of 1° (a third of the
  steps), and the report says so.
* **Heights** come from §2.6 for every building, wing, tower and roof, so shadows, glTF and CityJSON agree (O17 g).

=== REPLACE 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint ===

### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

**Bands.** **city** — water; block ground; footprint masses and landmarks; tier-1/2 ways cased and access-critical
lanes (below); symbolised walls, towers and gates; bridges; parks and greens ≥ 0.3 ha in `green`; wood fills; fields;
quarter labels (the city cut of the quarter tree, §4.5, §9.4), water, major landmarks, gates. **district** — district
names; footprints with outlines and entrances; yards
by role; boundary treatments; every way stroked; courts; greens; crowns; way names. **neighbourhood** — the family's
close-up (§8.2); every named way; addresses; pins; stage 2 composes here (§8.6). **building** — wings and rooms (stage 3).
Way tiers: tier 1 = `through`, `primary`; tier 2 = `secondary`, `quay`; tier 3 = `lane`, `cul_de_sac`, `alley`, `track`,
`path`; `pier`, `bridge` and `ford` draw with their way. Continuous zoom selects the band with hysteresis (a band is
entered at its threshold stop and left one stop past it); added detail cross-fades across that interval; per-band
detail budgets by hardware tier; no feature pops more than once across a zoom sweep (B-ZOOM). Tiles, zoom stops and
backends are §8.8–§8.9; decoration is §8.10.

**The city-band figure-ground contract (MFP-1).**
1. Every L2 built block is filled with `ground` at every band; at the city band yards are not subdivided (parks and
   greens ≥ 0.3 ha show in `green`; enclosed courts stay `ground` at the city band and take `court` from the district
   band, which keeps `ink`'s eight city-band tones, §8.2, N-25), so inside the built area streets and squares are the
   only `road`-role voids.
2. Footprints are drawn over the ground as **masses** at the city band: per block, footprints are closed across gaps
   narrower than 1.5 px at the current zoom stop (offset by +r then −r with r = 0.75 px × metres per px, in the kernel's
   integer offset, computed and cached per (block, stop, revision) in the tile worker from the footprint marks, which
   carry their block in the `block` attribute column), never across the corridor of a way drawn at the band — the
   closing is clipped by those corridors, so an access-critical alley inside a block stays open between the masses it
   separates — filled with `building` and outlined at the band's outline width; party lines between the footprints of one mass are drawn at one third of that width only where
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

**Way selection at the city band (VIS-3, N-6).** Tiers 1–2 are always drawn. A tier-3 way is **bounded** when the
footprint-covered share of its frontage length is ≥ 0.8 on **both** of its sides and its width is at least the mass
closing's 1.5 px at the stop: a continuous row on each side, so the gap between the two masses already reads as a
street. A tier-3 way is drawn when it is **access-critical** — some plot has all its access edges on it and fronts no
other drawn way — and not bounded, that is whenever its covered share is below 0.8 on at least one side (a lane with a
row on one side and open gardens on the other is drawn, because the plots on its open side reach the town only through
it) or it is narrower than the closing. Drawn tier-3 ways take the lane symbol (body = max(model width, 1 px), casing
h / 2); bounded intramural lanes and alleys stay unstroked gaps between masses. Suburb offshoots, ribbon back lanes,
farm tracks and extramural lanes are therefore drawn. Metric, with the same definitions: the share of plots at the city
band whose access way is drawn or bounded ≥ 95 %.

**Line greenery at the city band (VIS-14).** Avenues and street trees are not drawn at the city band; they appear from
the district band, where a crown is ≥ 4 px. Check: no tree mark covers a tier-1/2 casing at the city band. Chose "not
drawn" over a thin green line inside the corridor because at city zoom a corridor is ≈ 2 px, where a line fuses with the
casing and adds a ninth tone.

**First paint.** The one-click first paint is the complete city band — S0–S13a for every district and S14's city band
— with no S9 block preview on the one-click path (SCL-4); lazy work is only what the city band does not draw: yard
sub-parts, entrances, roof ridges and hatching, street names and addresses (view data, §9), crowns and scatter (§8.10).
Proxy thumbnails (§7.8) draw S0–S4 marks in a distinct preview style and are never presented as the map. Chose no
preview over an S9 block preview because §12.5's first-map laws hold the one-second bar without one for every TOWN and
CITY request and for METROPOLIS up to ≈ 14 200 buildings, the slower first map above that is declared for the owner's
veto (§12.5) rather than hidden, and a preview's figure-ground differs from the finished picture (MFP-1 item 4).

=== REPLACE 8.6 Stage-2 render tier and stage-3 LOD ===

### 8.6 Stage-2 render tier and stage-3 LOD

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

The neighbourhood band of every family (§8.2) is the stage-2 render tier (IMPROVEMENTS S5): `hatched` is NG's family,
and the stage-2 side-by-side against NG shows `hatched` with the `ink` close-up alongside, so a default-ink user who
opens a district sees the same palette with more detail (VIS-9). Close-up content (PART II) is derived on demand for the visible
tiles from the district's committed state and sub-seed — in the derivation pool, or in the generation worker when the
pool is off, because it needs the kernel and the model — and its marks reach the tile worker as `DisplayDelta` slices
answering the tile's band request (§8.9), into the same mark tables and tile pyramid. Stage 3 plugs in at the building
band: its marks come from `BuildingGenerator.compose(…, 'wings' | 'rooms')` (which takes a `Kernel` and a
`BuildingInput` with a `TerrainSampler`, §2.6), computed on demand for the buildings of the visible tiles in the same
place and cached there by (entity key, revision, lod); the tile draws the outline until its compositions arrive, and
every other band draws the outline, which equals the union of the composed wings by contract (SCL-13), so the
footprint hash is the same at every band. The tile worker never runs `compose()` or close-up derivation: it holds no
model and no terrain (N-4, §12.8). Roof
construction (§8.2) runs per stored wing (VIS-10) and reads the wing's `BaseWing.kind` (§2.6): a `rect` wing takes exact
OBB ridges with hips from its own corners; a `quad` wing takes the exact OBB path when it passes the near-rectangle
test, the validated skeleton otherwise, and the gable constructions draw its stored ridge (the midpoints of the two
sides its `ridgeAxis` names); a `polygon` wing takes a pyramid, cone or dome; the plain roof (no ridge or hip lines) is
the downgrade (§3.8); two-tone lit / shadow faces are assigned per roof face by its normal against the light (`faceLight`, §8.2) for any
face set a construction yields. The derived-roof cache is keyed by (entity, revision, construction), so switching from
`ink`'s hipped roofs to `hatched`'s per-wing gables needs no regeneration.

=== REPLACE 8.8 Tiles, zoom stops, print and the canvas budget ===

### 8.8 Tiles, zoom stops, print and the canvas budget

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

* **Pyramid (N-9 a).** Zoom stops at 2^¼ steps of scale (four per doubling) cover B-ZOOM's 1:50 000 → 1:500 in 27
  stops; stop k has a scale of m_k metres per **CSS** pixel. Tiles are 512 × 512 device px at the view's **tile DPR** d
  (the device pixel ratio after the tier's cap, below) and **world-aligned** per (stop, d): tile (i, j) covers the world
  square of side 512 × m_k ÷ d metres whose corner is (i, j) × 512 × m_k ÷ d from the world origin — so tiles are stable
  under panning and shared between views and exports at that stop and DPR.
* **Content (GEO-28, N-7).** A tile draws every mark whose bbox meets the tile dilated by a margin m = the largest of
  the casing half-width, the drawn wall half-width, the projected-shadow length, the largest crown radius and the halo
  width at the stop, in the slot-major order of §8.1 item 3 (every mark of a slot before any mark of the next, passes in
  order inside a slot), which is the same in every tile. Each tile clips to its own square, so the same scene clipped on
  both sides of an edge yields the same pixels: no seams and no casing bar across a junction on a district boundary.
  Fills of one semantic within a tile are one `Path2D` with the non-zero rule (a union: no anti-aliasing seam between
  same-role neighbours); semantics declared `seamClose` (ground, masses, yard parts, the shadow union) also get a ½-px
  same-colour stroke underneath (NG's seam dilation). Render tests: 0 casing pixels inside junction mouths on district
  boundaries; the census's draw-order check (§8.3).
* **Layers of a tile and composition (N-5).** The tile worker rasters a **base** layer per tile (slots 1–20 of §8.2)
  and keeps it; it then **composes** the tile — the base, the glyphs of the labels placed at that stop (§9.2) and the
  `overlay` live marks (§8.2) — into one bitmap and transfers that to the main thread, one bitmap per tile position. A
  label edit, a label toggle, a selection or a moving person re-composes the tiles it touches (≈ 0.1 ms per tile plus
  ≈ 1 µs per glyph) and never re-rasters a base. In `path` sun mode (§8.4), on a tier whose budget admits it, the base
  is rastered as `under` (slots 1–9) and `over` (slots 11–20) with the projected shadows (slot 10) in a layer of their
  own at half resolution (256² per tile; the penumbra rings already soften its edges; bilinear-scaled when composed), so
  a 1° step of the sun re-rasters only the shadow layers. Chose composition in the tile worker over two tile layers
  committed separately to the main thread because it halves the bitmaps committed at first paint and the main thread's
  draws per frame at the same memory (the worker keeps the base the labels are composed on), while a label change still
  never re-rasters the map.
* **Cache and invalidation (LC-23, N-8).** Tile key = (stop, i, j, tile DPR d, tile layer — `base`, or in path mode
  `under`, `shadow`, `over` —, style version, the view-state switches that change that layer's pixels: season, weather,
  shadows on or off and their mode, model-layer toggles and `base` live layers; and, for the `shadow` layer — or for the
  `base` layer on a tier without shadow layers — the path-mode sun's azimuth and altitude quantised to the tier's sun
  step (1°, or 3° after §8.4's fallback); in `fixed` mode the sheet's sun is part of the style version). Content version
  = the combination of the `revision`s of the marks drawn. A composed bitmap is keyed by its base key plus the label
  placement's revision at that stop and the `overlay` providers' versions. A `DisplayDelta`'s dirty boxes invalidate
  every cached tile they meet, at every stop and DPR. In path mode a step to a new quantised sun invalidates only the
  sun-keyed layers, and a newer step cancels an older one's pending re-rasters (latest wins).
* **Canvas budget per hardware tier (N-9 b).** Every canvas the view needs is counted: per visible tile position the
  worker's base (1 MB at 512²) and the main thread's composed bitmap (1 MB); the next coarser stop's composed bitmaps
  kept for gestures (≤ 1 MB per visible position); and fixed scratch — the shadow and post-operation buffers (2 MB), the
  crown library's sprites and the glyph atlases (≤ 5 MB). With P the worst-case number of tile positions covering a
  W × H CSS-px view at tile DPR d, P = (⌈W·d ÷ 512⌉ + 1) × (⌈H·d ÷ 512⌉ + 1), the need is **3P + 7 MB**, and
  **4.25P + 7 MB** with path-mode shadow layers (`under` and `over` replace the base; the shadow layer adds ¼ MB). Tier
  ceilings: low 72 MB, mid 128 MB, high 192 MB; tile-DPR caps: low 1, mid 2, high 3. The tile DPR is the device's pixel
  ratio capped by the tier, then stepped down (3 → 2 → 1.5 → 1) until 3P + 7 MB fits the ceiling; path-mode shadow
  layers are used only where 4.25P + 7 MB also fits, and otherwise a sun step re-rasters the base. Worked cases
  (`docs/validation/bench/fixall_rendering_r2_budgets.out`): the reference view, 1 440 × 900 CSS px at DPR 2, has
  P = 35 and needs 112 MB (156 MB with shadow layers) — mid or high tier; the low-end device at 1 366 × 768 or
  1 920 × 1 080 at DPR 1 needs 43 or 67 MB — inside the low tier's 72 MB with the fallback stop, the scratch buffers
  and the atlases counted. Cached tiles beyond the visible and fallback sets are evicted least-recently-used by bytes.
  The tier is chosen at start-up from the Canvas2D part of `bench/calibrate` (8 fixed tiles, ≈ 40 ms) and the host's
  reported device memory, can be overridden in the advanced panel, and is shown with the tile DPR in the view status.
  Chose a budget derived from the viewport over fixed per-tier numbers because the old low tier's 24 MB equalled the
  visible base and label tiles of a 1 366 × 768 view with nothing left for the fallback stop and the scratch buffers
  (N-9 b), and the mid tier's 64 MB could not hold the reference view at DPR 2.
* **Gestures (SCL-7, VIS-6).** During a pinch or wheel zoom the compositor shows the nearest cached stop's composed
  tiles scaled (GPU-composited bitmaps; the labels scale with them, which keeps them apart); 120 ms after the input stops
  the view animates (≤ 150 ms) to the nearest stop and the tile worker re-rasters the visible tiles centre-out, swapping
  each one in when ready. Panning composites cached tiles and shows newly exposed ones from the next coarser cached stop
  until they are rastered. While a gesture runs, at most 4 new bitmaps are committed per animation frame; at first paint
  and at settle every ready tile is committed in the frame it arrives (§12.5). Chose settling on exact 2^¼ stops over
  re-rastering at arbitrary scales because an arbitrary-scale raster defeats the cache and the per-stop label placement;
  the settled scale is within ± 9 % of the requested one, and every settled view has exact hairlines, exact casings and
  a collision-free label set.
* **Print and large PNG (O12 e).** Horizontal bands of tiles (512 device px high) are rastered and composed at the
  export scale and each band's scanlines are streamed into the PNG encoder (row filters, then a zlib stream through the
  platform's `CompressionStream` in browsers and `zlib` in Node), written as IDAT chunks band by band. Peak canvas memory
  is one band (A2 at 300 dpi: 7 016 px × 512 px × 4 B ≈ 14 MB); no canvas is larger than a tile band. Per-layer
  transparent PNGs use the same path with the layer set restricted.
* **Warp preview (SCL-9).** While a warp brush is held, the moved L1 vertices are applied to a transient copy of the
  affected ways' and blocks' marks, and only the tiles meeting the brush's dirty box re-raster (≥ 30 fps for a brush
  radius ≤ 150 m at the district band). **Apply** commits the `warp` event (§7.1), whose invariants and re-derivation run
  then; **Discard** drops the copy — MFCG's staged warp, on our event model.

=== REPLACE 8.9 Backends, text, threads and the worker boundary ===

### 8.9 Backends, text, threads and the worker boundary

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

* **Canvas2D is the reference backend of every shipped preset** (`ink`, `lit`, `hatched` and their variants), running
  on an `OffscreenCanvas` in the tile worker; programs render typed-array paths, one `Path2D` per (program, semantic,
  variant) per tile, sprites by `drawImage`.
* **SVG** is written from the same display list (§11.1).
* **WebGL2 draws no marks.** It exists only as a **pre-decided fallback compositor** that uploads the composed
  Canvas2D tiles as textures, composites them with the view transform and runs the post operations as one fragment pass
  — so there is no stroke tessellation, no SDF text and no look that differs by backend (VIS-7). Measurement at M2b: pan
  and zoom frame rates of the Canvas2D compositor on the reference and low-end devices at METROPOLIS scale (§12.5); the
  WebGL2 compositor is enabled for a hardware tier only if the Canvas2D compositor misses ≥ 60 fps (reference) or
  ≥ 30 fps (low end) there.
* **Text (DEF-6).** All text is drawn by Canvas2D in the tile worker's composition step (§8.8), glyph by glyph at the
  positions computed from the bundled font's own metrics (§9.2), through a glyph atlas per (face, size, stop): each glyph
  is drawn once into the atlas and copied per placement. SVG writes the same per-glyph positions — as the face's own
  glyph outlines by default, or as text in the embedded face on request (§11.1, N-13). Chose Canvas2D glyphs composed
  onto the tiles over SDF text because, once tiles are composited, text never needs to be drawn by the GPU, and one text
  path keeps text identical on every output. Measurement at M1: a tile's label composition ≤ 3 ms at ≤ 150 glyph runs;
  pre-decided fallback: whole words cached as bitmaps per (text, size, stop) in the atlas.
* **Threads (N-4).** (1) The **generation worker** holds the document and the model and runs S0–S14; it also resolves
  instance overrides (§8.10), runs the live-layer providers (§8.2), builds on-demand bands — the district, neighbourhood
  and building bands of the districts a band request names (`DisplayListBuilder.build(model, band, groups)`) — and hands
  stage-3 `compose()` and close-up derivation (§8.6) to the derivation pool. (2) The **derivation pool** — up to three
  workers — runs the per-district stages at every rung (§12.3; the merge protocol of §4.1) and, on request, `compose()`
  and close-up derivation from the committed state of the district it is handed; with the pool off the generation worker
  runs them itself. (3) The **tile worker holds no model**: it holds the display list with its label, instance and
  string tables — the only full copy (§8.1 item 6) — and from them rasters base layers, runs label placement (S13b,
  §9.2) and decoration instancing (§8.10), composes labels and `overlay` live marks onto each tile (§8.8) and runs the
  post operations; everything it needs arrives through the table below. (4) The **main thread** runs the UI, compositing
  of the transferred tiles, hit-testing, screen-space furniture (§9.5) and input. Nothing model-sized ever reaches the
  main thread.
* **What crosses (SCL-6, N-4).**

  | from → to | what | how | bound |
  |---|---|---|---|
  | generation → tile worker | display-list deltas: mark columns (with `key`), geometry, field rasters, and the rows of the label, instance and string tables they change (candidates, priority, parent node, pinned placement and `hidden` per label; stamp parameters, species mix and resolved overrides per `instances` mark) | transferred: the generation worker copies each slice into a fresh buffer and transfers it, and keeps only the 24-B index columns (§8.1 item 6) | O(changed marks); ≤ 96 B per label row, ≤ 40 B per instance row, ≤ 16 B per species row, ≤ 32 B per override row, plus geometry and UTF-8 text |
  | generation ↔ tile worker (cross-origin-isolated hosts only) | the mark table | `SharedArrayBuffer` columns, no copy — optional, never required (it needs COOP / COEP from the embedding host) | — |
  | tile worker → generation | band requests: the districts (group handles) and band that tiles entering the view need and the tile worker lacks, and the buildings needing `compose()` at the building band | copied | ≤ 4 KB per request |
  | generation or pool → tile worker | the answers: on-demand band marks, `compose()` wings and rooms, close-up marks, as `DisplayDelta` slices naming the request | transferred | ≤ 1 MB per answer |
  | generation → tile worker | live-layer marks (`live.<id>` groups), when the view state a provider reads, the model or the visible region changes | transferred | ≤ 256 KB per delivery |
  | tile worker → main | composed tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.
  Chose a handle-and-tiles boundary over sending the document or `Mark[]` objects to the main thread because
  structured-cloning a CITY entity table costs the receiver ≈ 162 ms and a 60 000-mark object list ≈ 140 ms
  (redteam-scale §7.3) — both inside the first-frame budget — while bitmaps and typed arrays transfer in constant time.
  Chose to run every model-reading step — providers, overrides, on-demand bands, `compose()`, close-ups — where the
  model is, and to hand the tile worker display-list tables only, over a model replica in the tile worker, because a
  replica would double the CITY working set (§12.8) and have to follow every edit, while the tables cross as the same
  typed-array deltas the marks already use (N-4).

=== REPLACE 8.10 Decoration instances (trees, scatter, crowns, roof detail) ===

### 8.10 Decoration instances (trees, scatter, crowns, roof detail)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

```ts
interface InstanceStyle { species?: string /* a species kind of the entity's mix */; crown?: number /* crown-library index */;
  scale?: number /* 0.5–1.5 */; tone?: number /* colour jitter, −1…1 */; leafType?: 'deciduous'|'evergreen' }   // what a `restyle` or `add` override sets (§7.1)
```

* **One instance set per entity, independent of the band.** Every `instances` mark (a wood, garden, park, copse, orchard,
  avenue, hedgerow, yard planting or scatter class) has one set of positions, in one of three layouts: a **stamp** of a
  per-class blue-noise tile for areas; a jittered **grid** for orchards (6–8 m); a jittered **line** for avenues and
  street trees — along the row §4.9 derives in the planting district's own half-corridor strip at `Greenery.along`'s
  `offsetCm` from the kerb (no plat edge) — and for hedgerows along their L3 field-boundary chains (8–12 m along the
  line). S14 draws the layout's parameters — offset, rotation, spacing — from the entity's
  `render.instances` stream (§6.1) in the generation worker and carries them in the mark's `InstanceTable` row (§8.1).
* **Tiles.** Per (class, spacing): four toroidal blue-noise tiles of 64 × 64 m, built once per session by Bridson
  sampling (k = 50 candidates, all evaluated — the reference variant, now paid once per session instead of per tree),
  each point carrying a **progressive rank** (void-and-cluster order: every prefix of the ranked list is itself evenly
  spread); the tile variant used by a stamp cell is `RH32('stamp.variant', key, salt, u, v) mod 4` (§8.1 item 5), which breaks
  visible repetition.
* **Stamp.** Offset in [0, 64 m)² and rotation from the row; the cells (u, v) of the rotated lattice covering the
  entity's face; point p of cell (u, v) survives if it lies in the face (point-in-polygon with holes) and, for woods,
  passes the edge test of a domain-warped density evaluated once per point in world metres. **Ordinal** = (u, v, p):
  stable — editing the face's boundary changes only which edge points survive, never the interior's ordinals or
  positions.
* **Grid and line.** A `grid` places one point per cell (u, v) of the rotated lattice at the row's spacing, jittered by
  ± 15 % of the spacing in x and y from two `RH32` draws over (key, salt, u, v) (tags `grid.jitter.x` and `grid.jitter.y`),
  kept if it lies in the face; ordinal = (u, v). A `line` places point i at arc length (i + ½) × spacing from the line's
  start end — the end whose junction address sorts first (for an `along` row, the end at its way's first junction) —
  jittered along and across the line the same way; ordinal = i. Park paths are L3 `path` faces drawn by the path
  program, not instances.
* **Rank and band thinning (N-10).** Every instance has a normalised rank r ∈ [0, 1): a stamp point's progressive rank
  ÷ its tile's point count; a `grid` point's r = the 32-bit bit-reversal of the Morton interleave of (u, v) ÷ 2³² — the
  two-dimensional van der Corput order, every prefix of which is evenly spread over the lattice; a `line` point's r = the
  bit-reversal of i ÷ 2³² — the van der Corput sequence along the line. Band b draws the instances with r < s_b (city:
  none — the wood, orchard or green fill; district: 0.6; neighbourhood and finer: 1), so every coarser band is a subset of
  the finer one for every layout: an instance keeps its position once visible and appears at most once in a zoom sweep
  (LC-20, VIS-5); the census covers all three layouts (§8.3).
* **Per-instance look, keyed by (key, ordinal).** The instance's species, drawn by its share from the entity's
  `Greenery.species` mix (inner or outer share by the point's distance from the edge), picks the crown class; the crown
  index into the style's **crown library** (20 crowns per class per style, built once per session from
  `style/<sheet>/crowns/<class>/<i>`, drawn as sprites), colour jitter, scale jitter ± 15 %, and `leafType` (from the
  species when present, deciduous otherwise) are `RH32` draws over (the entity's lineage `key`, ordinal, the concern's
  salt) (§8.1 item 5). Hatch phase and roof detail are keyed by the entity's `key`. Nothing is keyed by band or by the
  session's interned handle.
* **Edits (LC-20, NF-D11).** `{ t: 'instance', entity, ordinal | point, op: 'add'|'move'|'remove'|'restyle', to?, style? }`
  events (§7.1) apply after the set is generated: `remove` drops the ordinal, `move` replaces its position, `add` appends
  a user ordinal `u<n>` at `point`, `restyle` sets its `InstanceStyle`. For an ordinal-addressed event the dry run also
  records the instance's generated position in `point`. **Resolution** runs in the generation worker whenever a commit
  touches an entity that carries overrides (it re-runs this section's function for that entity only): an override
  **applies by ordinal** when the entity's lineage is unchanged since the event — no `carry` lifecycle event and no
  supersession of the entity is recorded after the event's `seq` (§6.3) — **and** that ordinal's generated position
  lies within 0.5 × the spacing of the recorded `point`; otherwise — a carried successor with a fresh lineage, a
  superseded entity (its overrides move to the `supersededBy` successor), or an ordinal that moved (a line edited at its
  start end) — it **re-matches by position** to the nearest generated instance within 0.5 × the spacing of `point` that
  no other override has claimed (candidates in (distance, ordinal) order, overrides in log order), and else is kept
  **orphaned** and reported. An `add` stays while its point lies in the entity's face (or within 0.5 × the spacing of its
  line) and is orphaned otherwise. The resolved overrides — ordinal, op, position, style and state (`byOrdinal`,
  `rematched`, `orphaned`) — cross to the tile worker as the `InstanceTable`'s override rows (§8.1, §8.9). A tree brush
  is a batch of instance events (COV-FTG-M04). Chose to apply by ordinal only while the lineage and the position both
  hold over applying by ordinal whenever the address survives, because under §6.3 a carried successor keeps the address
  but not the lineage, so its stamp — drawn from the lineage-keyed stream — puts the same ordinal on a different tree.
* **Where it runs (N-4).** Instances are generated per tile in the tile worker from the `InstanceTable` row and
  memoised per (key, revision, style version) for the session; they are never written to the document except as
  overrides. The generation worker runs the same function for entities that carry overrides (to resolve them) and for
  exports: the GeoJSON, glTF and CityJSON exporters call it at the finest band with the overrides applied and write each
  instance's position, species, crown diameter and leaf type (§11.1; VN-158, XB32); the bench computes tree statistics
  from it (SCL-21).
* **Budgets.** Placement ≤ 1 µs per instance (stamp plus point-in-polygon), drawing ≤ 2 µs per instance as a sprite
  (§12.7).

Chose the stamped, ranked tile over per-entity Bridson sampling because sampling costs ≈ 12 µs per tree (a 36 ha wood
takes 170 ms; redteam-scale §7.2) while a stamp costs under 1 µs, and ranked tiles give every band a subset of the finer
band by construction. Chose bit-reversal ranks for the jittered layouts over a second blue-noise ranking of their points
because the van der Corput order is a pure function of the ordinal, so the rank is as stable as the ordinal itself
(N-10).

=== REPLACE 9.1 What is model and what is view ===

### 9.1 What is model and what is view

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

* **Model** (S13a; in the model hash; persisted): every entity's name and short form, and a `LabelEntity` per labelled
  thing with its candidates; the quarter merge tree (§9.4):

  ```ts
  interface LabelEntity { id: Id; target: Id; kind: 'district'|'quarter'|'way'|'landmark'|'water'|'wood'|'gate'|'title'|'annotation'|'address';
    text: NameRef; shortText?: NameRef; priority: number; lod: LodBand[];
    candidates: { spines: Polyline[] /* area and path labels, world cm, in order of preference */;
                  anchors: { p: Point; dirCdeg?: number }[] /* point labels */; breakAt?: number[] /* allowed two-line breaks */ };
    pinned?: Placement /* a user placement: model data */; hidden?: boolean }
  interface QuarterNode { id: Id; members: Id[] /* districts */; children: [Id, Id] | null; name: NameRef; spine: Polyline;
    cityCut: boolean /* one of the N_q quarters of §4.5: the city band's area labels */ }   // the tree is built by S6 (§4.5), named by S13a; every node has its own LabelEntity (kind 'quarter')
  interface Placement {                    // a user placement, set by moveLabel (§7.1): model data (N-28)
    stop: number;                          // the zoom stop (§8.8) at which the user placed it
    sizePx: number;                        // cap height in display px at 1× (never below the kind's floor, §9.4)
    anchor: PointCm;                       // point labels: the text origin; area and path labels: the spine's midpoint
    spine?: PolylineCm;                    // area and path labels: the user's spine, world cm
    dirCdeg?: number; lines?: 1 | 2 }      // a point label's direction; two lines broken at the entity's first `breakAt`
  ```

* **View** (S13b; never hashed; recomputed per zoom stop and cached, §9.2): which candidate each label uses, its size and
  glyph positions, the quarter cut, the halo roles. Pinned placements are honoured by §9.2's pin rule: fixed at their own
  stop and finer stops, candidates that yield or hide at coarser ones.
* **Consequences.** The model hash does not depend on fonts, viewport or device pixel ratio, so O2 (a) and O11 (f) hold
  (GEO-29) — tested on the golden suite: identical model hashes headless (Node) and in Chromium, Firefox and WebKit,
  and identical S13b placements across them at every zoom stop (§13.3's per-stop placement digest). `moveLabel` (sets `LabelEntity.pinned`) and
  `hideLabel` (sets `hidden`) are logged model events (§7.1, §7.4), hashed. A
  scoped regeneration re-derives S13a only inside its scope (LC-17).

Chose "placement is view data, measured with our own font metrics" (GEO-29's options b and a together) over fitting
placement into the model because collisions change with the zoom inside a band (SCL-10), so a model placement would be
wrong between stops or recomputed per zoom anyway; and over measuring with the host's text engine because Chromium,
Gecko, WebKit and headless Node shape text differently.

=== REPLACE 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally ===

### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

* **Metrics.** `@plat/labels` parses the bundled OFL font files itself (the default label face is IM FELL Great Primer,
  §17.2): `cmap`, `hmtx`, `kern` and GPOS pair adjustments (formats 1 and 2), GSUB single substitutions for `smcp`
  (small caps) and `onum` (old-style figures), and `loca` / `glyf` for SVG's outline text (§11.1). Advance widths and
  kerning in font units become world metres at a zoom stop; there is no contextual shaping (the label faces are Latin,
  ligatures off). Glyphs are placed and drawn one by one (§8.9), so what is drawn equals what was measured on every
  backend and in SVG.
* **Font features, checked (N-12).** From M1, a PR-tier CI test asserts for each bundled label face that it carries
  `cmap`, `hmtx` and TrueType `glyf` outlines and reports whether its GSUB has `smcp` and `onum` single-substitution
  lookups for the Latin script. The label style then takes a **pre-decided path per face, chosen by that test, never by
  hand**: with `smcp`, small caps come from the face; without it, the family's OFL small-caps cut (for IM FELL Great
  Primer, its SC face, bundled unmodified, whose lower-case slots are small capitals) supplies them, measured by the
  same reader; where a family has no such cut (a user face), small caps are synthesised as the face's capitals scaled
  to 0.75 × the cap height with the letter-spacing kept, measured by the same reader; without `onum`, the scale bar
  uses the face's default figures. The report of the style names the path each face took, and the census's floors
  (§9.4) run on whichever path is active.
* **Zoom stops.** Placement is computed per zoom stop (§8.8). At stop k each glyph box, in world units, is its pixel box ×
  the stop's metres per pixel; protected obstacles (gates, castle, plaza, bridges, walls — MFCG's measured defect) are
  their drawn symbol extents at that stop. Between stops the view uses the placement of the stop at or coarser than the
  current scale: zooming in only shrinks every label's world box, so no collision can appear, and crossing below a stop
  switches to that coarser stop's placement. Zero collisions therefore hold at every zoom, not only at the stops.
* **The candidate set of a stop** is fixed before the greedy runs: every `LabelTable` row drawn at the band, minus the
  labels that §9.4's rung (5) hands to a quarter at this stop, plus one candidate per `QuarterNode` that rung (5)
  activates — created once however many members yield to it, and not again when the stop's cut already labels that node
  — with the highest priority among its yielding members, the node's area and the node's own label id (N-11). Rung (5)
  is decided from geometry alone (whether a label fits its own face at the floor), so the set is known before any
  collision is tested.
* **The greedy.** Candidates at a stop are totally ordered by priority (title > quarter / district > water > landmark >
  gate > way > address), then larger target area, then id. A candidate takes its first alternate (its spines in order,
  then the ladder of §9.4) that meets no placed higher candidate, no obstacle and no fixed pin; otherwise it yields.
  This whole-map greedy is **evaluated locally**: deciding c first decides (memoised) every higher candidate whose
  alternate boxes meet c's; the dependency graph is acyclic because the order is strict, so the result is the same
  whichever tiles are computed first and whatever the viewport.
* **Pinned labels (N-28).** A pinned label (`LabelEntity.pinned`, a `Placement`, §9.1) is shown only in its bands. At its
  own stop and at every finer stop it is placed first, exactly as the user left it, and is a **fixed pin**: an obstacle
  every candidate avoids. Its box is sized in pixels, so zooming in only shrinks it in world units and it cannot meet
  anything there that it did not meet at its own stop; `moveLabel`'s dry run (§7.1) refuses a placement whose box at its
  stop meets another pinned label's box at that stop, returning the nearest free position as the conflict's action, so
  pins never collide with each other at their own stops. At a **coarser** stop its world box grows, so it is not fixed
  there: it keeps its anchor and spine and enters the greedy as a candidate, at its entity's priority, whose only
  alternate is that placement — drawn when it meets no higher candidate, obstacle or fixed pin, and otherwise hidden at
  that stop and reported ("pinned label hidden at stops coarser than k"). Zero collisions therefore hold at every zoom
  with pins included.
* **Scope.** Area and way labels for all candidates of the band; addresses and repeated street names only for candidates
  in visible tiles and their dependency closure. The memo is keyed by (stop, candidate id, candidate revision).
* **Incremental (SCL-9).** After an edit, memo entries of candidates whose boxes meet the dirty boxes are dropped and
  re-decided; a change propagates only through candidates whose outcome changes (the priority cascade stops when nothing
  more moves).
* **Budget (SCL-10).** ≤ 2 ms per stop for ≤ 2 000 visible candidates, in the tile worker (§12.7), from the
  `LabelTable` alone (§8.1, §8.9).

Chose fixed pins at their own and finer stops and yielding candidates at coarser ones over pins fixed at every stop,
because a pixel-sized box grows in world units as the view zooms out, so a pin fixed everywhere would collide at coarse
stops with other pins and higher labels, against "0 collisions at every zoom" (N-28). Chose to decide rung (5) from
geometry before the greedy over letting it fall out of collisions inside the greedy, because the quarter candidate must
have a fixed place in the strict order that the local evaluation relies on, and a candidate whose existence depended on
later outcomes would break that order (N-11).

=== REPLACE 9.4 Sizes, floors, the ladder, quarters, overflow, halos ===

### 9.4 Sizes, floors, the ladder, quarters, overflow, halos

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

* **Legibility floors** (display px at 1×): area labels cap height ≥ 7 px (and ≤ 14 px, ∝ √area within the band); way
  labels cap ≥ 6 px; point labels ≥ 6 px; addresses ≥ 5 px. Area labels are letter-spaced small caps (0.15 em).
* **The F-LABEL ladder, view side** (every rung reached is counted in the report): (1) the preferred spine at the size
  ∝ √area, never below the floor; (2) the short name form; (3) a straight label on the OBB axis, on one line or on two
  lines broken at a space (multi-line labels are supported: two lines at a `breakAt` position); (4) the OBB arc; (5) the
  **quarter tree** (N-11) — decided per stop before the greedy, from geometry alone: when none of rungs (1)–(4) fits the
  label's own face at the floor at this stop, the label yields to the smallest ancestor `QuarterNode` (following
  `LabelTable.parent`, §8.1) whose spine fits that node's own name at the floor. The yielding label is suppressed at
  that stop and reported ("named by quarter Q at stops k…k′"), and the ancestor's own `LabelEntity` becomes a candidate
  at that stop — once, however many members yield to it, and not again when the stop's cut already labels that node —
  with the highest priority among its yielding members, the node's area and the node's label id, so its place in §9.2's
  strict order is fixed before the greedy runs; it then takes its own alternates (its spines and rungs (3), (4), (6),
  (7)) like any candidate, and members whose own rungs fit keep their labels and are obstacles to it like any placed
  label; (6) a declared **overflow**: ≤ 20 % of the glyph area outside the face, never over a protected obstacle or
  another label; (7) a **legend entry**: a numbered disc on the face and a row in the legend (§9.5).
* **Quarters (VIS-4, MFP-10).** S6 builds, once per model, the merge tree of districts by §4.5's rule — repeatedly merge
  the adjacent pair with the smallest combined area, a pair of different kind families counting 1 000 ha extra and a pair
  separated by a wall or water 10 000 ha extra, until one root remains, ties by id; S13a gives each internal node a name
  from the grammar, conditioned on its dominant kind and on the naming feature of its largest member (§10.4), and a spine
  from its union (§9.3). The names, spines and the **city cut** — the N_q nodes of §4.5's count law, MFCG's label count,
  flagged `cityCut` — are model data; the city band labels the city cut; a stop between the city and district bands may
  use a finer cut (the finest nodes whose spine fits the floor), which is view data; the district band labels districts.
* **Halo (VIS-15, N-3).** Each glyph's halo, 1.5 px wide, takes the role of the area mark under the glyph's centre,
  looked up in the display-list index at the label's band (`ground`, `road`, `water`, `field`, `green`, …), **when** the
  text colour against that role passes the **label floor** — the matrix's ink / ground row, ΔE2000 ≥ 40 and ΔL* ≥ 50
  (§8.2); **otherwise it takes `ground`**, which passes by that same row in every accepted palette. Text is therefore
  always separated from what it crosses: over masses and woods its halo is the block's ground tone. With the shipped
  palettes the local role is kept over paper, road, ground, court, field, verge and green in every family and over
  garden and water in `ink` and `hatched`; `ground` replaces building and tree in every family and garden and water in
  `lit` (`docs/validation/bench/fixall_rendering_r2_palette.out`). SVG writes the halo as a paint-order stroke per glyph
  in the halo's colour. A user palette accepted with "accept low contrast" (§8.2) may fail the floor; the report lists
  the failing text / halo pairs. Chose `ground` as the one fallback over a per-family choice (`paper` in `lit`) because
  the matrix already guarantees ink / ground in every accepted palette, so the rule needs no family table, and a
  ground-toned halo over a mass reads as the block showing through.
* **Acceptance** (B-ZOOM; the default view of every rung; the bundled font): **every node of the city cut** —
  min(N_q, number of districts), §4.5 — labelled on the map at or above the floor, and at the matched sizes within ± 1 of
  the 9 / 12 / 18 district labels MFCG's plain sweep draws at sizes 40 / 80 / 130
  (`captures/mfcg/exports-sweep-2026-09-25/README.md`); 0 protected overlaps; 0 collisions at settled views and during
  a scripted zoom sweep, pinned labels included; every placed glyph's text / halo pair at or above the label floor, read
  from the rendered pixels (§8.3); overflows, legend fallbacks, quarter substitutions and hidden pins reported; ≥ 99 % of
  all area-label glyph area inside its face (O13 a), which caps the overflow rung at 5 % of the on-map area labels; ≥ 90 %
  of named streets labelled at the neighbourhood band (O13 b). **Pre-decided fallback** if a rung labels fewer than its
  city cut at M1: the default framing percentile (§9.5) tightens from 95 % to 85 %, which enlarges every district on
  screen, and the check re-runs. (The old bar, ≥ min(12, number of districts), failed by construction where the cut is
  smaller than 12 — at 7 500 and 10 000 inhabitants, `docs/validation/bench/fixall_pipeline_r2_quarters.out` — and its
  "MFCG size 80 draws 17" was not the plain sweep's 12.)

=== REPLACE 11.1 Formats ===

### 11.1 Formats

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9; round trip byte-identical | the canonical form; import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer; one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (§3.6 (6)); MultiPolygons for face unions; walls, towers, gates and bridges as typed features; boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (the §8.10 function at the finest band, overrides applied) with `species[]` (the §8.10 draw: the species kind of each instance), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from the display list at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13) by default as **outlines** — each glyph used is written once in `<defs>` as a path from the bundled face's own `glyf` outlines (quadratic segments as SVG `Q`), and each placed glyph is a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with the option `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2); halos by paint-order in both; hatching as compound paths; symbol widths; the colour-matrix post operations as filters (§8.2) | budgets at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for 837–1 512 buildings, 6.3 MB for 15 392) plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB per distinct glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face, checked against the bundled files) — and ≤ 60 000 elements; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | the band-streamed tile assembly of §8.8 at any DPI; transparent background; per-layer transparent PNGs (the largest MFCG ask); print presets A4…A2 at 300 dpi | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer (underground / ground / sky) with its elevation | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6 — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases; bridge and pier decks at `deckCm`; trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces), `WaterBody`, `Road` (lines with class and width), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with the attributes `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses), `Bridge`, `TINRelief` (terrain); no `referenceSystem` (a local metric CRS; when the export has a geo anchor it is recorded in the extension property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`) (DEF-5) | validated against the CityJSON schema in CI |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots | the corpus-calibration input |
| **permalinks** | §6.4's format; `&doc=` references resolve through the `DocResolver` of §11.5 | one line for unedited towns; refused, with the `.plat` file or `&doc=` offered, when the town needs a non-shipped setting pack, host content or a non-shipped style sheet (§6.4) |

**The two GeoJSON variants (N-14).** RFC 7946 fixes WGS84 longitude and latitude and removed the `crs` member, so the
default export writes exactly that. A **geo anchor** `{ latDeg, lonDeg, bearingDeg }` places the settlement centre and
turns model north by the bearing; it is an export option, remembered per document in the view key `exportAnchor`
(§11.3), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never
mistaken for a real place. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator
easting and northing — scale 1 on the central meridian through the anchor, false origin at the anchor — and inverted
to WGS84 latitude and longitude with Krüger's published series to fourth order in the third flattening, evaluated with
`dmath` so the file is byte-identical on every host; coordinates are written with 7 decimals (≈ 1 cm), exterior rings
counter-clockwise and holes clockwise (RFC 7946 §3.1.6). Distances a GIS measures on the ellipsoid then match model
distances within a factor 1 + (d ÷ R)² ÷ 2 — at most 3.1 × 10⁻⁶, ≤ 5 cm, at the farthest corner of the largest frame
(≈ 15.7 km from the centre at aspect 2, §12.2). A foreign member
`plat` records the anchor, whether
it is the default, the document id and the output version. The **metric** variant — offered "by prior arrangement"
(RFC 7946 §4) for tools that want the model's own metres — writes x east and y north in metres from the settlement
centre with 2 decimals (the centimetre lattice exactly), no `crs` member, in `<name>.metric.geojson`, beside a sidecar
`<name>.metric.json` giving the origin, the unit, the axes, the document id and the anchor if one is set. Chose a strict
WGS84 default with a documented default anchor over the local metric CRS with a `crs` member because the latter cannot
pass an RFC 7946 validator and would be read by GIS tools as degrees, placing the town at meaningless coordinates; the
metric file keeps the lossless path for tools that agree to it.

**SVG text (N-13).** The export dialog offers `text: 'outlines'` (the default) or `'embedded'`. Outlines are read from
the same bundled face the labels were measured with (§9.2), so every consumer draws the glyphs S13b placed; the
embedded face travels unmodified inside the file (OFL-permitted; no subsetting, §17.2) for users who want editable text.
Chose outlines as the default over embedded text because only outlines draw the same glyphs in every consumer — an
embedded `@font-face` is honoured by browsers but not reliably by desktop editors (PLAUSIBLE; CI renders each variant
in the consumer it targets, §11.1's SVG row), and a substituted face at our per-glyph positions changes widths and can
collide — which is what "text identical on every output" (§8.9) requires.

**Identity in every export (LC-1, LC-28).** Every export carries entity addresses (§6.3) and the document's supersedes
table (tombstone → successor), so an outside tool that keyed data to an entity can follow it across re-derivations; ids
cross the API and bridge boundary as `<docId>/<id>`.

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
centimetre lattice losslessly, so the exporter is a thin view (≤ 1 person-week, M3b), and it gives GIS users a standard
3-D city path that GeoJSON cannot.

=== REPLACE 11.2 The embedding API and the worker boundary (SCL-6) ===

### 11.2 The embedding API and the worker boundary (SCL-6)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

```ts
type DocHandle = { readonly id: string };            // the document lives in the generation worker
interface PlatApi {
  generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void }): Promise<DocHandle>;
  open(bytes: ArrayBuffer, opts?: { readOnly?: boolean }): Promise<DocHandle>;             // .plat or CBOR twin; bytes transferred in
  edit(h: DocHandle, e: EditEvent | EditEvent[]): Promise<ApplyResult>;                    // an event may arrive with its `fates` filled (below)
  regenerate(h: DocHandle, scope: Scope, mode: 'keep'|'newRandom', opts?: { discardEdits?: boolean }): Promise<ApplyResult>;   // §7.1's Regenerate (keep settings) and New random
  adjust(h: DocHandle, param: string, value: unknown): Promise<ApplyResult>;                          // §7.1's Adjust, or Re-derive from Sk for a parameter consumed early
  confirm(h: DocHandle, token: string, fates: EditFate[]): Promise<ApplyResult>;                     // completes an action that returned `confirm` (NF-D14)
  cancel(h: DocHandle, token: string): void;                                                         // drops it; nothing was committed
  undo(h: DocHandle, of?: number): Promise<ApplyResult>;   // appends an `undo` event for the handle's session (§7.4); `of` only for the `owner` role; a conflict lists the dependent events
  redo(h: DocHandle): Promise<ApplyResult>;                  // appends a `redo` event for the handle's session (§7.4)
  query(h: DocHandle, q: Query): Promise<QueryResult>;                                     // gazetteer, hit-test, whereIs, fates; ≤ 64 KB per page, paginated (kinds below)
  view(h: DocHandle, target: HTMLCanvasElement | OffscreenCanvas, opts?: ViewOpts): Promise<ViewHandle>;   // tiles flow from the tile worker
  setView(v: ViewHandle, patch: Partial<ViewState>): void;
  export(h: DocHandle, fmt: Format, opts?: ExportOpts): Promise<ArrayBuffer>;              // transferred out
  report(h: DocHandle): Promise<GenerationReport>;
  subscribe(h: DocHandle, handler: (e: ApiEvent) => void): Unsubscribe;
  close(h: DocHandle): void;
}
type ApplyResult =
  | { status: 'ok'; logHead: string /* §2.9 */; changed: number /* addresses whose records changed */ }
  | { status: 'conflict'; actions: ConflictAction[] }                // §7.1's dry run: the nearest valid position, the blocking lock, a stale base …
  | { status: 'confirm'; token: string; fates: EditFate[] /* the first 1 000; the rest by query 'fates' */;
      counts: Record<EditFate['fate'], number>; scope: EditScope /* resolved */ };   // §7.3 item 4: nothing is committed until confirmed
type ConflictAction = { kind: 'moveTo'|'unlock'|'unassign'|'reroute'|'stale'|'invalid'; target?: Id; at?: PointCm; message: string };
type Query =
  | { kind: 'gazetteer'; text?: string; kinds?: string[]; page?: number }
  | { kind: 'people'; type?: string; race?: string; gender?: string; profession?: string; workplace?: Id; ageRange?: [number, number]; household?: Id; district?: Id; page?: number }   // COV-FTG-C13
  | { kind: 'hit'; view: ViewHandle; x: number; y: number } | { kind: 'whereIs'; person: Id; day: string; hour: number }
  | { kind: 'relations'; person: Id; up: number; down: number }   // the family-tree view (COV-FTG-C11), from the relation store
  | { kind: 'inView'; view: ViewHandle }                          // the "features in view" list (COV-FTG-A24; the non-visual route, J-S19)
  | { kind: 'fates'; token: string; page: number };               // the full fate list of a pending confirmation
// @plat/api/node — the same API over worker_threads, plus by-value helpers for scripts and tests
declare function generateDocument(bp: Blueprint): Document;
declare function exportDocument(doc: Document, fmt: Format, opts?: ExportOpts): Uint8Array;
```

**Confirming fates (NF-D14).** An action whose effective scope holds protected entities — Re-derive from Sk, Adjust of
an early parameter, a regeneration over locked, pinned, edited or assigned entities, "discard edits in scope" — runs
its dry run (§7.1) and returns `confirm` with the fate of every protected entity (§7.3 item 4) and a **token** =
H128(the document's `logHead` ‖ the canonical bytes of the event without its fates). Nothing is committed. `confirm(h,
token, fates)` commits the event with those fates when the token is still current (the `logHead` has not moved) and the
fates equal the dry run's list; if the state moved it re-runs the dry run and returns a fresh `confirm`, and a changed
list is never committed silently. Resubmitting the event through `edit` with its `fates` filled is the same operation —
the engine commits when a fresh dry run computes the same fates and otherwise returns `confirm` — which is how a host
bridge carries a confirmed action (§11.3). "Discard edits in scope" is a new request (`regenerate` with
`discardEdits: true`) with its own confirmation. `cancel` drops the token. Chose confirmation by token plus fate
equality over a fire-and-forget call with a "force" flag because §7.3 requires the user to see and confirm every fate
other than *kept*, and a replay that computes different fates must report a mismatch — so the committed event must
carry exactly the fates the user saw.

| call | crosses | copy or transfer | bound |
|---|---|---|---|
| `generate` | in: the blueprint; out: the handle, progress events | copy | < 64 KB; < 1 KB per event |
| `open` | in: the document bytes | transfer | the document's size |
| `edit`, `regenerate`, `adjust`, `confirm`, `undo`, `redo` | in: events or a token with fates; out: `ApplyResult` — `ok` (the new `logHead`, count of changed addresses), `conflict` (actions) or `confirm` (token, the first 1 000 fates, counts per fate, the resolved scope) | copy | < 64 KB per batch; longer fate lists by `query({ kind: 'fates' })` pages |
| `query` | out: one result page | copy | ≤ 64 KB |
| `view` | out: composed tile bitmaps and hit-test slices (§8.9) | transfer | ≤ 1 MB + 64 KB per tile |
| `export` | out: the file bytes | transfer | the format's size |
| `subscribe` | out: `ApiEvent`s (`doc.changed`, `view.changed`, report updates) | copy | < 64 KB |

The headless path runs the same worker code, and its model hash equals the browser's (text is not in the model, §9.1).
Ids cross this boundary as `<docId>/<id>` (§6.3). The derivation pool uses transferred copies, never
`SharedArrayBuffer` (§3.3), so no embedding host needs cross-origin isolation for generation; the tile worker's optional
shared columns (§8.9) remain the only use of shared memory. **Engine (§3.7, SCL-22):** the product bundle has no WebAssembly
dependency; if M0 triggers the kernel's pre-decided fallback (Clipper2-WASM as the single engine), WebAssembly becomes an
embed requirement and a host without it receives `E_ENGINE_UNAVAILABLE` from `generate` and `open`.

=== REPLACE 11.3 The host bridge — the host is the store (FTG-12) ===

### 11.3 The host bridge — the host is the store (FTG-12)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

* **Transport.** `interface BridgeTransport { send(msg: BridgeMessage): void; onMessage(h: (msg: BridgeMessage) => void): void }`.
  Shipped: `WindowPostMessageTransport` (iframe hosts; a fixed target origin; incoming origins checked against the embed's
  allowlist) and `MessagePortTransport` (any relay — a browser-extension content script, a SharedWorker, a chat-bus
  relay; COV-FTG-N06). Envelope: `{ plat: 1, type, session, seq, logHead?, body }`.
* **Vocabulary (our own terms, FTG-22).** Host → PLAT: `doc.load { bytes | ref, role }`,
  `doc.apply { baseLogHead, events }`, `view.set { patch }`, `export.request { fmt, opts }`, `query { q }`. PLAT → host:
  `ready { outputVersions, schemaVersion }`, `doc.changed { baseLogHead, events }` (a local user's proposed events),
  `doc.applied { logHead }`, `doc.rejected { reason: 'stale'|'invalid'|'role'|'version', currentLogHead, conflicts? }`,
  `view.changed { patch }`, `entity.selected { id, kind }`, `export.ready { bytes }`, `query.result`.
* **logHead** = a 128-bit hash of (document id, edit-log length, hash of the last event), in hex (§2.9; our own term, FTG-22).
* **Convergence.** The host holds the canonical document and log. A client sends its user's edit as `doc.changed`
  against its `baseLogHead`; the host accepts only when that base is the current `logHead` — it appends the events, advances
  the `logHead` and fans `doc.apply` out to every client, the sender included — and otherwise answers
  `doc.rejected { stale }`; the client then applies the host's pending `doc.apply` messages, re-runs its own events through
  the dry run (§7.1) on the new state and sends them again, or shows its user the conflicts. An action that needs its
  fates confirmed (§7.3 item 4, §11.2) is sent only after the local user confirmed them, as an event carrying its
  `fates`; if the state moved underneath it, the client's re-run returns a fresh confirmation for its user instead of
  resending, and every other client replays the event with those fates, reporting a mismatch if it computes different
  ones. Every client applies the same events in the host's order on the same output version, so every client's model
  hash is the same (§6.2). **Test (M3a):** a host and three headless clients applying 1 000 interleaved random events —
  undo and redo from every client and one owner undo through a chain among them — converge to one model hash with 0 lost
  accepted events.
* **Version handshake.** On `doc.load` the client compares the document's **`outputVersion`** (§6.4) — not the generator
  version — with the output versions it can replay (announced in `ready`); when it cannot, it opens the snapshot read-only (its role drops to viewer, and it says
  so) — it never replays under another version silently.
* **View state.** Time, location, favourites, notes and public notes, view pins, layer choices, `stylePreset`, season,
  weather, frame, rotation, the compass, legend and emblem settings and the `exportAnchor` (§11.1) live in the
  document's view section outside the model hash (§2.9); each key is last-writer-wins by (Lamport counter, session id)
  and travels as `view.set` / `view.changed`. FTG's time commands map to `view.set { time }` plus the simulation
  module's own command.
* **Style is canonical; the preset a viewer looks through is not (N-15).** The document's style (§2.9 `style`: the sheet
  and version, its row operations, the ground-cover regions) changes only through logged `setStyle` events, which the
  bridge carries in `doc.changed` / `doc.apply` like any edit and which only the `owner` and `editor` roles may send. The
  view key `stylePreset` is a per-viewer choice of preset (for example a player looking at the `lit` family while the
  document is drawn in `ink`): it never writes `setStyle`; the chosen preset replaces the document's sheet for that
  viewer only, and the document's own rows (thematic overrides, ground-cover regions) apply on top where the preset has
  the roles they name, the rest being listed in that viewer's style dialog. Chose a separate preset key over treating
  the canonical style as a last-writer-wins view key because a viewer's look must neither rewrite the shared style nor
  silently diverge from it.
* **Roles.** `owner` | `editor` | `viewer`, given by `doc.load`. A viewer's client never emits `doc.changed` (model edits
  are disabled in the UI and dropped by the bridge) and emits only the view changes the host allows; the host enforces the
  roles as well.
* **Logging (LC-31).** Every model change over the bridge is a `doc.apply` of `EditEvent`s, logged one to one; there is no
  bridge command that changes the model any other way. Undo and redo are `EditEvent`s (§7.4): they travel as
  `doc.changed` and `doc.apply` like any other event, the envelope's `session` is their `EditBase.session`, and a client
  never truncates a bridged log.

=== REPLACE §12 Performance budgets — the section heading and its *In plain words* paragraph (the text before 12.1) ===

## §12 Performance budgets

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

*In plain words.* A town must appear in well under a second, a city in under half a second and a metropolis of up to
about 48 000 people in about a second — the bar MFCG sets for itself and FTG misses by several seconds. Because a
bigger town has more buildings, each size gets a rule rather than a single number: a fixed part plus a cost per
building. Under that rule every town and every city appears within one second, and so does a metropolis of up to
about 48 000 people; the largest metropolises, up to 120 000 people, take up to about 2.3 seconds. That miss is stated
here for the owner to veto rather than hidden behind a half-finished picture. Every step has its own budget, with the
method that makes the budget possible named beside it, measured on one named machine so the numbers can be checked.
Compared with MFCG drawing the same number of buildings, PLAT takes about twice as long for towns and cities and about
five times as long for a metropolis, because it builds what MFCG does not — real terrain and rivers, plots with yards,
a plan for every plot, a roster of trades placed by rule, greenery and non-colliding labels. That trade is stated here
so the owner can veto it too.

=== REPLACE 12.1 Reference hardware and how budgets are measured (SCL-15) ===

### 12.1 Reference hardware and how budgets are measured (SCL-15)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

* **Reference machine:** Apple M1 (4 performance + 4 efficiency cores) in a MacBook Air (MacBookAir10,1, fanless), 16 GB,
  macOS 14.7, Chrome stable and Node 24 — the machine on which every MFCG, FTG and NG bar in this document was recorded
  and on which the named mechanisms were timed (redteam-scale §7). The capture record
  (`captures/mfcg/2026-09-21T11-25-32/meta.json`) holds the CPU, 8 cores, arm64 and Node v24.12.0 but no memory size and
  no Chrome version (`chrome: null`); the model, memory and OS were read from the same host on 2026-09-25
  (`docs/validation/bench/fixall_rendering_r2_host.out`, N-27 b). Because the host is fanless, every timing batch starts
  after 30 s idle and runs ≤ 60 s, with `bench/calibrate` run before and after it; a batch whose two scores differ by
  more than 5 % is re-run.
* **Low-end device** (O12 b's ≥ 30 fps clause; the `low` hardware tier): Intel Core i3-10110U (2 cores, 4 threads, UHD
  Graphics 620), 8 GB, Chrome stable — or any machine whose calibration score is within ± 15 % of it.
* **Calibration benchmark** (`bench/calibrate`, fixed inputs): 5-octave fBm over 256² cells, a bucket-queue priority flood
  over 256², a 20 000-node Dijkstra, a 100 000-element typed-array sort, and, in browser runs, a Canvas2D raster of 32
  fixed tiles. Every score is stored with the host's CPU model and core counts, memory size, OS version, Node version
  and browser name and version (from the user-agent client hints), so a stored score always names its machine (N-27 b).
  CI divides every timing by (runner score ÷ reference score) before comparing it with a budget; the reference score is
  stored with the goldens.
* **Where each budget is measured (N-27 a):** model budgets in Node 24 (worker_threads for the pool) on every tier, and —
  in the nightly tier (§13.8) — again inside Chrome's worker on the same seeds and sizes; where the two figures differ
  by more than ± 15 %, the Chrome figure is the one checked against the budget (the product runs in browsers) and the
  difference is reported with both numbers. Frame, tile, first-map and label budgets are measured in Chrome
  (Playwright, GPU on). p50 and p95 are over B-CITY's seeds per rung and water setting.
* **Confirming milestones.** Each budget of §12.3–§12.8 names the milestone that confirms it and the pre-decided change
  taken if it misses: model laws M1 (TOWN, CITY) and M2b (METROPOLIS), §12.3; first map, settle and re-raster M1 and
  M2b, §12.5; exports M1 (SVG, PNG) and M2b (METROPOLIS SVG), §12.7; memory M1 and M2b, §12.8.
* **Budgets never change output.** A missed budget is reported, never answered at run time by computing something
  coarser (F-BUDGET-TIME is reporting-only, GEO-2); the pre-decided changes are configuration decisions taken once at a
  milestone and reported, and none of them changes the model.

=== REPLACE 12.3 Model budgets on the one-click path ===

### 12.3 Model budgets on the one-click path

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

The primary configuration is one generation worker plus a **derivation pool** of up to three workers for the
per-district stages (S10 plots, S10b placement, S11 site plans, per-district greenery) — and the hinterland unit, which
runs the same stages on the generation worker concurrently (§4.1) — which run after the eager S10a allocation (LC-2) as
pure functions of eager upstream state and their district's own sub-stream, merged in district lineage order (§4.1,
§6.3; never address order, which a carried district does not share with its lineage — NF-D13, NF-P12). The
single-worker column is the pre-decided fallback: on the low tier, in hosts that forbid extra workers, and everywhere if
the pool fails its M1 measurement.

| rung | model p50 / p95 (pool) | per building at p95 | MFCG at the matched size | ratio at p95 | single-worker fallback p95 |
|---|---|---|---|---|---|
| TOWN | 74 / 100 ms | 74 µs | 57 ms (39 µs per building) | 1.8× | 115 ms |
| CITY | 245 / 300 ms | 57 µs | 131 ms (25 µs) | 2.3× | 400 ms |
| METROPOLIS | 585 / 800 ms | 59 µs | 156 ms (12 µs) | 5.1× | 1 000 ms |

**Per-rung cost laws** (p95; used for every size inside a band, and fitted by the cost-model tests, §13.2): with the
pool, TOWN ≤ 20 ms + 60 µs × buildings; CITY ≤ 40 ms + 50 µs × buildings; METROPOLIS ≤ 100 ms + 52 µs × buildings (at
the 35 000-building cap: ≤ 1.9 s). Single-worker, through the fallback column's p95 at the same building counts: TOWN
≤ 20 ms + 71 µs × buildings; CITY ≤ 40 ms + 69 µs; METROPOLIS ≤ 100 ms + 67 µs. The table's rows are these laws at
1 333, 5 200 and 13 460 buildings; §12.5 adds the first frame to them.

**Measurement and fallback.** M1 runs CITY with the pool and with a single worker on B-CITY-lite; the pool stays primary
if its p95 ≤ 300 ms and the model hashes are identical for pool sizes 0–3 on 200 seeds; otherwise the single-worker
column becomes the declared budget and O3 (d)'s CITY clause is reported as missed by the difference.

=== REPLACE 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6) ===

### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

**The first map is a law of the building count (N-2).** Size follows population inside a rung (§1.1), so the first-map
budget is a function of B, the number of buildings the request generates (≈ population ÷ 3.4, §12.2), never one number
per rung. Time to first map — click → the complete city band on screen, Canvas2D `ink`, the reference viewport — is
§12.3's model law plus the **first-frame law**

  F(B) ≤ 20 ms + 10 µs × B

made of S14's city band (≈ 4 µs per building, §12.4), the delivery of the column slices to the tile worker (≈ 1 µs),
the city-band raster (≈ 5 µs per building plus 0.25 ms per tile position), S13b at the first stop (≤ 2 ms), the label
composition (≈ 0.1 ms per position plus ≈ 1 µs per glyph) and the commit of the composed tiles (≈ 0.1 ms per position),
for the **reference viewport** — 1 440 × 900 CSS px at device pixel ratio 2, whose worst tile alignment covers P = 35
positions of 512² device px (§8.8), so the fixed terms sum to ≈ 19 ms. Laws and values
(`docs/validation/bench/fixall_rendering_r2_budgets.out`):

| rung | buildings B, band bottom → top | time to first map T(B), pool | T at the band's bottom / the default request / the top | the rung's bar holds up to | single-worker fallback |
|---|---|---|---|---|---|
| TOWN | 440 → 2 940 | ≤ 40 ms + 70 µs × B | 71 ms / 124–145 ms / 246 ms | 150 ms: B ≤ 1 570 (≈ 5 300 people) | ≤ 40 ms + 81 µs × B (138–162 ms at the default) |
| CITY | 2 940 → 8 820 | ≤ 60 ms + 60 µs × B | 236 ms / 330–420 ms / 589 ms | 0.4 s: B ≤ 5 670 (≈ 19 300 people) | ≤ 60 ms + 79 µs × B (416–535 ms) |
| METROPOLIS | 8 820 → 35 000 | ≤ 120 ms + 62 µs × B | 667 ms / 864–1 050 ms / 2 290 ms | 1 s: B ≤ 14 190 (≈ 48 000 people) | ≤ 120 ms + 77 µs × B (1.04–1.27 s; 1 s up to B ≈ 11 400) |

"The default request" is each rung's target population, whose building count §12.2 gives as a range (1 200–1 500,
4 500–6 000, 12 000–15 000); the bottom and top are the band's population ends at 3.4 persons per building.

**Where O12 (g)'s one second holds, and the declared miss.** The first map is under one second for every TOWN and
every CITY request (their band tops are 246 ms and 589 ms) and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000
people); the default METROPOLIS request (50 000 people) lands at 0.86–1.05 s across its building range. Above
≈ 14 200 buildings the first map grows by 62 µs per building, to ≈ 2.3 s at the 35 000-building cap (120 000 people).
**Declared for the owner's veto:** chose to keep the one-click path complete at every size — every plot, site plan and
building at city-band detail, no preview (J-R7, J-I2) — over holding one second above the knee, because the model's
cost is linear in buildings (§12.3), and the only ways under the bar there are a partial picture, whose figure-ground
differs from the finished map (MFP-1), or dropping plot and site-plan detail from the one-click path, which the
owner's plot-model ruling forbids. Reversing costs ≈ 1 person-week: above the knee, the city band would appear district
by district as the pool finishes them, with the labels last. With the single-worker fallback the knee is ≈ 11 400
buildings (≈ 39 000 people).

**Measurement and fallback (N-2, N-27 c).** B-CITY's browser runs time the first map at each band's bottom, default
request and top — TOWN at 1 500 / 5 000 / 9 900 people and CITY at 10 000 / 20 000 / 29 900 at M1, METROPOLIS at
30 000 / 50 000 / 120 000 at M2b — five seeds each on the reference machine, and fit both terms of each law. Pass:
every p95 within its law + 10 %. Pre-decided fallbacks: a raster-side miss (the measured first frame above F(B))
steps the tier's tile DPR down one level for every view (2 → 1.5; P falls from 35 to 24, cutting the per-position
terms by a third), fixed at the milestone and reported, and the run repeats; a model-side miss is §12.3's (the
single-worker column, or the model law re-declared at the measured p95 as a D-18 amendment for the owner's veto),
after which this table is re-derived from the measured laws and the knee re-stated to the owner.

**Interaction** at 40 000 buildings and 200 000 trees (O12 b): **pan** ≥ 60 fps on the reference machine and ≥ 30 fps
on the low-end device (compositing cached tiles; ≤ 4 ms of main-thread work per frame); **zoom gestures** at the same
rates (scaled cached tiles); **settle**: the visible tiles re-rastered at the new stop within ≤ 150 ms for a CITY view
and ≤ 250 ms for a METROPOLIS view, centre-out, in the tile worker — assuming P ≤ 35 positions, the city band at
0.25 ms per position + 5 µs per visible building, the district band at 0.25 ms per position + 12 µs per visible
building, and 0.2 ms per position to compose and commit (a whole-CITY city-band view ≈ 42 ms, a whole-METROPOLIS view
≈ 83 ms, a district-band view of 3 000 buildings ≈ 52 ms); hairline fidelity at every settled view (§8.3).
**Confirmation (N-27 c):** settle and re-raster are measured with the first map (M1 on the reference and low-end
devices at TOWN and CITY, M2b at METROPOLIS), with the same pre-decided fallback (one tile-DPR step down on the tier
that missed); pan and zoom rates have §8.9's WebGL2 compositor as theirs.

**Draw calls:** ≤ 80 Canvas2D path fill and stroke calls per tile whatever the building count (batched per program and
semantic), so ≤ 80 × P per view (≤ 2 800 at the reference viewport), plus one sprite draw per visible crown and per
placed glyph (from the atlas). **Uploads (N-5):** while a pan or zoom gesture runs, ≤ 4 new composed bitmaps are
committed per animation frame, centre-out (baselines: NG 528 uploads per hood, MFCG 590 per city); at first paint and
at settle every ready tile is committed in the frame it arrives — one composed bitmap per position (§8.8), so a first
frame commits ≤ P bitmaps, not 2P, and no cap stretches it over frames; roof computations per frame after warm-up = 0
(derived roofs cached, §8.1). **Re-raster** at the district band ≤ 12 ms per 1 000 buildings (MFCG's replay costs
11–15 ms per 1 000). **Neighbourhood band:** opening one district ≤ NG's 10–96 ms at comparable counts; ≈ 25 canvas
operations per wing as the `hatched` ceiling.

No rung depends on WebGL2 (§8.9). Chose laws of the building count over one bar per rung because a single number held
only at each rung's target population while the ladder builds every population in the band (N-2).

=== REPLACE 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9) ===

### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

* **Scoped regeneration:** ≤ 3 ms + 60 µs × the buildings in scope (a district of ≤ 450 buildings in ≤ 30 ms), plus the
  S13a and S14 deltas ≤ 3 ms; the dirty tiles re-raster in the tile worker off the edit path (≤ 12 ms per 1 000
  buildings); edit-to-redraw < 100 ms.
* **A single plot edit:** ≤ 5 ms of model work plus ≤ 2 ms of deltas.
* **Coarse edits** (PLAUSIBLE; measured with §13.2's B-EDIT coarse-edit sequences): a river-control-point or drawn-water
  edit ≤ 60 ms of model work at CITY for a re-traced reach ≤ 500 m (re-trace and carve ≈ 5 ms, crossing search ≈ 1 ms,
  S4 re-route of ≤ 3 arterials ≈ 5 ms, S5 regrowth in ≤ 4 cells, F-REDERIVE of the touched blocks at the
  scoped-regeneration law); a terrain stroke ≤ 3 ms + 1 µs per re-based entity + the field-brush law for the blocks its
  drivers re-derive.
* **Scope invariance:** the same scope costs the same at TOWN, CITY and METROPOLIS within ± 20 % (a B-EDIT test).
* **Replay and load verification (N-16, N-1).** Replay (load verification, migration, undo beyond the scoped records,
  the undo of an upgrade after a reload) folds the log on the model through the session's code path — S13a's scoped
  delta runs at each event that re-derives names, ≤ 3 ms per such event — and only S14 and S13b are suppressed and run
  once at the end (§7.3). Its cost is therefore a sum over the log, not a constant:

  V = M(B) + Σ c(e) + S14(B) + 5 ms

  where M(B) is §12.3's model law for the document's size (the recipe is replayed from S0; checkpoints are session
  memory, §7.4, and are not saved), S14(B) ≈ 4 µs × B is one display-list build, 5 ms finalises the digest, and c(e) is
  each event's replay cost — its model scope cost, plus succession matching (≤ 2 µs per re-derived entity, §6.3), plus
  S13a's delta when it re-derives names: ≤ 0.5 ms for an event that re-derives nothing (attribute, label, lock, pin,
  style and table-row edits whose slices no entity reads); ≤ 8 ms for a plot-scale edit; ≤ 3 ms + 60 µs × the buildings
  in scope + matching + 3 ms for a scoped regeneration, a local operator (§7.3) or an epoch; ≤ M(B) for a Re-derive from
  Sk. For the **reference verification mix** of 300 edits on a CITY document of 5 200 buildings — 200 light edits, 80
  plot-scale edits, 15 block regenerations of ≤ 60 buildings and 5 district regenerations of ≤ 450 buildings — V ≈ 1.4 s
  p95 (`docs/validation/bench/fixall_rendering_r2_budgets.out`); a log of 300 district regenerations takes ≈ 11 s. The
  law replaces the earlier "300 edits in ≤ 1 s", which assumed checkpoints a saved document does not have. Verification
  never delays the picture: the saved model is displayed at once and verified in the generation worker (§2.9), the
  report shows the law's estimate and the progress, and "trust the saved town" ends the wait (§2.9 load step 3). B-EDIT
  times the reference mix at M2a (pass: ≤ V + 10 %); pre-decided fallback: the per-kind costs c(e) are re-declared at
  their measured p95 and the reference mix's V restated here, reported for the owner's veto (the verification wait is
  off the path to the picture, so no mechanism changes). Chose to state the bound as a law of the log over saving
  checkpoints because a checkpoint holds the arena chunks changed since the last one, which would multiply the 3 MB
  CITY document (§2.9) for edit-heavy files, while the verification wait is already off the path to the picture.
* **Warp preview:** ≥ 30 fps for a brush radius ≤ 150 m; Apply ≤ the scoped-regeneration budget of the touched faces.
* **Proxy thumbnails:** §7.8's budget.

=== REPLACE 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14) ===

### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

* **Labels:** S13a 12 ms at CITY and ≤ 30 ms at METROPOLIS (model); S13b ≤ 2 ms per zoom stop for ≤ 2 000 visible
  candidates; a tile's label composition ≤ 3 ms at ≤ 150 glyph runs (§8.9).
* **Trees:** placement ≤ 1 µs and drawing ≤ 2 µs per instance. A district-band view with 10 000 visible trees composes in
  one 16 ms frame from cached tiles, and its tiles raster in ≤ 30 ms of tile-worker time (O19 e, restated); the 200 000
  trees of a METROPOLIS are never all instantiated — only visible tiles generate instances.
* **SVG** at METROPOLIS, city band: ≤ 650 B per building plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB
  per distinct glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face) (§11.1, N-13) — and ≤ 60 000
  elements, written in ≤ 2 s; Inkscape opens it within 120 s (§11.1).
* **PNG:** A2 at 300 dpi of a CITY in ≤ 20 s on the reference machine, the peak canvas one tile band.
* **Confirmation of the export budgets (N-27 c).** The SVG and PNG budgets are measured at M1 on B-CITY-lite's TOWN and
  CITY seeds and at M2b on METROPOLIS. Pre-decided fallbacks, taken once and reported: an SVG size or element miss at
  the city band writes path coordinates with one decimal of the export's unit instead of two and merges compound paths
  per (semantic, quarter of the city cut) instead of per (semantic, district), re-keying the `<metadata>` map; a
  district-band SVG that misses its estimate draws woods and orchards as their outlines instead of crowns; a PNG time
  miss encodes the bands with zlib level 3 instead of 6 (the same pixels, a larger file).
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (≤ 3 µs per plot
  median, §3.7); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median and its registration
  re-declares S11's row of §12.4 by the measured difference (§2.6, §3.7); `compose()` ≤ 1 ms per building median at
  `wings`, in the derivation pool on the tile's band request (§8.6, §8.9), one tile's
  compositions within 16 ms of pool time, amortised (a tile draws the outline until its compositions arrive).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker, with a cost-model
  test (§13.2); never on the one-click path.

=== REPLACE 12.8 Memory (what is counted, per rung) ===

### 12.8 Memory (what is counted, per rung)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

Counted: the JS heap, typed arrays and WebAssembly memory of every thread (generation worker, pool, tile worker, main),
with canvas backing stores budgeted separately.

| rung | model working set, all threads, excluding canvases | canvas budget: need at the reference viewport; tier ceilings low / mid / high |
|---|---|---|
| TOWN | ≤ 40 MB | 3P + 7 MB = 112 MB at P = 35; 72 / 128 / 192 MB |
| CITY | ≤ 110 MB | the same (the canvas need depends on the viewport, not the rung) |
| METROPOLIS | ≤ 260 MB | the same |

**The tile worker holds no model (N-4).** It holds the display list — the only full copy, ≈ 10 MB at CITY with its
label, instance and string tables (§8.1 item 6) — the decoration memo and the placement memo; its glyph atlases and
crown sprites are canvases, counted in the canvas budget. The generation worker holds the model and keeps a
24-B-per-mark index of the display list (≈ 1.4 MB at CITY); the derivation pool holds its per-worker overlays (§4.1)
and the on-demand `compose()` and close-up caches (§8.6). These lines assume one kernel arena per layer (≈ 10 MB at
CITY, §2.2; PLAUSIBLE until M0) plus one frozen arena copy per pool worker (≈ 10 MB each at CITY, ≈ 25 MB at
METROPOLIS) and each district overlay until it merges (§3.3), the compact entity store and the scoped undo records of
§2 and §7.4 (SCL-5), people derived on demand, tree instances never stored, and the display list at ≈ 11.4 MB at CITY
across the two threads that hold any of it. The earlier "≈ 6 MB per thread that holds it" undercounted the fixed
columns — 46 B per mark, now 54 B with the lineage key (N-9 c) — and assumed a full copy in both the generation worker
and the tile worker (≈ 12 MB); keeping one full copy brings the corrected display list back under that figure. The pool's
frozen arena copies (≈ 30 MB at CITY with three workers) are new in round 2 (§3.3); the lines are kept and stay
PLAUSIBLE until M1 measures them, with the pool-shrinking step below as their pre-decided fallback.

**Canvas budget (N-9 b).** The need is 3P + 7 MB (4.25P + 7 MB with path-mode shadow layers), P being the worst-case
tile positions of the viewport at the tile DPR; each tier has a ceiling, and the tile DPR steps down until the need
fits it (§8.8). The reference view (1 440 × 900 at DPR 2) needs 112 MB; the low-end device's 1 366 × 768 or
1 920 × 1 080 at DPR 1 needs 43 or 67 MB.

**Measurement and fallback.** Measured per rung in B-CITY's browser runs at M1 (TOWN, CITY) and M2b (METROPOLIS).
Pre-decided fallback if CITY exceeds its line at M1: the provenance and lifecycle-history columns leave the working set
for the document's on-demand block (SCL-20's archive) and are decoded only when inspected; if the line is still
exceeded, the pool shrinks by one worker per step (identical digests by construction, §3.3) and the memory test
re-runs. If a tier's canvases exceed its ceiling in the scripted pan and zoom runs, its coarser-stop fallback set is
dropped (the need falls to 2P + 7 MB) and a gesture shows the next coarser cached tiles only where they remain. The
document's size budget is §2.9's.

=== REPLACE 12.9 Reference comparisons and the declared trade ===

### 12.9 Reference comparisons and the declared trade

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r2); drafted by fixall/draft-rendering-r1

* **MFCG at matched building counts** (§12.2): model time 1.8× (TOWN), 2.3× (CITY) and 5.1× (METROPOLIS) MFCG's
  generation; time to first map, by §12.5's laws at MFCG's counts, ≈ 2× MFCG's generation plus canvas replay at TOWN
  and CITY (143 ms against 73–79 ms at 1 475 buildings; 374 ms against 189–210 ms at 5 242; MFCG's replay ≈ 11–15 µs per
  building, from its size-80 profile) and ≈ 3× at METROPOLIS (932 ms against 300–352 ms at 13 091); at MFCG's size-200
  stress count (31 951 buildings, 236 ms plus replay) PLAT's law gives ≈ 2.1 s, ≈ 3–3.6×.
* **FTG (NF-S7).** The side-by-side sizes are FTG's BIG_TOWN and BIG_CITY, from M-1's free captures (§13.6, D-31), and
  METROPOLIS per D-31. The timed capture so far is FTG's CITY preset (9 500 people, 2 798 buildings): the server answers
  in 2.9–3.2 s, the client is building the scene 6.4–7.0 s after the click, and loading a finished settlement costs 2.0 s
  of busy time (ftg-payload-visual, Critic-2 addendum part 2; the 4.6 s "client busy during create" figure is not a time
  to first map). PLAT's first map at that size (the TOWN law at 2 798 buildings) is ≈ 0.24 s, ≈ 27–30× sooner; FTG's
  creator gives ≈ 10 s to render a metropolis (49 500 people) client-side, ≈ 10× PLAT's ≈ 1.0 s at that population.
  M-1's BIG_TOWN and BIG_CITY captures add their timings to §13.5's timing row.
* **Declared trade (MFP-5, N-2).** Chose a per-building cost of ≈ 57–74 µs at p95 over matching MFCG's 12–39 µs because
  PLAT builds what MFCG does not — a heightfield with hydrology, frontage-first plots with yards and party walls, site
  plans with heights, roster siting, greenery by rule and collision-checked labels — which D-7 ranks above speed. The
  first map stays under one second for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings
  (≈ 48 000 people); above that it grows to ≈ 2.3 s at the 120 000 cap, a miss of O12 (g) declared in §12.5 for the
  owner's veto. Reversing the trade would mean dropping plot and site-plan detail from the one-click path, which the
  owner's plot-model ruling forbids.
* Chose the derivation pool as the primary configuration over a single worker because after LC-2's eager allocation the
  per-district stages are pure functions of eager upstream state and their own district's sub-stream, so they run in
  parallel without shared writes; the pool keeps CITY within 300 ms at its target and moves the METROPOLIS one-second
  knee from ≈ 11 400 to ≈ 14 200 buildings (§12.5).

## 3. Cross-area requests

The integrator applies these in the owning areas' sections. Each names the item it completes.

### 3.0 Requests to this area from the other round-2 drafts, and where they went

Read on 2026-09-25 from `r2-determinism.md` §3.3, `r2-kernel.md` "To RENDERING", `r2-pipeline.md` §3 RENDERING and
`r2-scope.md` §1 (its §3 was still being written). Folded into the §2 blocks, so the integrator applies them once, with
these blocks:

| from | request | folded into |
|---|---|---|
| determinism RR-1 (N-1, NF-D4, NF-D7) | §12.6 replay bullet | §12.6: S13a per naming event ≤ 3 ms, succession matching ≤ 2 µs per re-derived entity, the undo of an upgrade after a reload; the worked figure is N-16's (≈ 1.4 s for the reference mix) |
| determinism RR-2 (LC-7) | §12.6 coarse edits | §12.6's new *Coarse edits* bullet, verbatim in substance |
| determinism RR-3 (N-1) | §8.1 item 4 | §8.1 item 4 |
| determinism RR-4 (NF-D1) | §11.2 `undo(h, of?)`, `redo` | §11.2's interface |
| determinism RR-5 (NF-D1) | §11.3 undo / redo as bridged events; the M3a test | §11.3 *Logging* and *Convergence* |
| determinism RR-6 (NF-D2) | §11.1 permalinks row | §11.1 |
| determinism RR-7 (N-29) | none to write | §8.4's `LayerSpec` stays the one definition |
| kernel R4 (VK-5) | §12.7 stage-3 hook | §12.7 |
| kernel R5 (VK-3) | §12.8 assumptions and fallback | §12.8 |
| kernel R6 (VK-3) | §11.2 no `SharedArrayBuffer` for generation | §11.2 |
| pipeline R2 (NF-P8) | §12.3 hinterland unit | §12.3 |
| pipeline R3 (NF-P9) | §9.4 acceptance: the city cut; MFCG 9 / 12 / 18 | §9.4 (the "size 80 draws 17" parenthesis dropped for the sweep's numbers) |
| pipeline R4 (NF-P2) | roofs by `BaseWing.kind`; exports extrude each wing's `ring` | §8.6, §11.1 (3-D row); §8.1's cache key already carries the roof construction |
| pipeline R5 (NF-P3) | avenues along `Greenery.along`; hedgerows on L3 chains; park paths as faces | §8.10 |
| scope FTG-22 | §11.3 `baseLogHead` / `currentLogHead` | §11.2 and §11.3: `stateId` is `logHead` throughout |
| scope N-24 | §9.1 pointer to the placement digest | §9.1 |

**Not folded (applied directly to text this draft leaves unchanged):** kernel R1–R3 and pipeline R1 edit §12.4's rows,
which this draft does not replace; apply them as written (kernel R3's +3 ms makes the critical path ≈ 248 ms p50; p95
≤ 300 ms is unchanged, so §12.3's laws and §12.5's first-map laws stand). Scope NF-D12's §9.5 change (compass and emblem
draws keyed by the town root's entity key, never `docId`) edits §9.5, which this draft does not replace.

### 3.1 Determinism (§2.9, §6.1, §7.1, §7.3, §7.4)

| # | section | request |
|---|---|---|
| D1 | §2.9 `ViewState` comment and the **View state** bullet (N-15, N-14) | the key list reads: "time, location, favourites, notes and public notes, view pins, layer choices, `stylePreset` (a per-viewer preset that never writes `setStyle`, §11.3), season, weather, frame, map rotation, compass, legend and emblem settings and `exportAnchor` (§11.1)". The document's `style` stays canonical as it is. |
| D2 | §7.4 lifecycle table, row `instance (and the tree brush)`, column *regenerate* (NF-D11; r2-determinism's row already has the lineage clause — add the position clause, which catches a line edited at its start end) | "applied by ordinal while the entity's lineage is unchanged since the event (no `carry` or supersession recorded after its `seq`) and the ordinal's generated position lies within 0.5 × the spacing of the recorded `point`; otherwise re-matched by position to the nearest unclaimed instance within 0.5 × the spacing (a superseded entity's overrides move to its `supersededBy` successor), else orphaned and reported (§8.10)". Column *migrate* unchanged. |
| D3 | §7.1 `instance` event comment (NF-D11) | append: "for an ordinal-addressed event the dry run also fills `point` with the instance's generated position; `InstanceStyle` is §8.10's". |
| D4 | §7.3 item 2 and §2.9 load step 3 (N-16's replay law relies on N-1's change; r2-determinism already writes it, J-DET-21 — confirm on integration) | replay mode reads: "the log is folded on the model with S13a's scoped delta at each event's log position, and S14 and S13b run once at the end" — this is N-1's required change; §12.6 as drafted here states the replay cost on that basis. |
| D5 | §6.1 concern registry (N-26) | append the concern `style.random` (the random-style draw of §8.2: creation index = the `setStyle` event's `seq`, attempt = 0–2). Append-only, so no other key moves. |
| D6 | §7.4 lifecycle table, row `moveLabel / hideLabel`, column *create* (N-28) | append: "the dry run refuses a placement whose box at its stop meets another pinned label's box at that stop, returning the nearest free position (§9.2)". |
| D7 | §5.2 F-LABEL row (with N-17, determinism's own item) | when copying §9.4's seven rungs, use rung (5) as revised here: "the quarter tree, decided per stop from geometry; the ancestor's label is one candidate per stop". |

### 3.2 Pipeline (§4.1, §4.10)

| # | section | request |
|---|---|---|
| P1 | §4.1 bullet **The one-click first paint is the complete city LOD** (N-2) | replace "the METROPOLIS first map is met by the derivation pool below, and the single-worker fallback's miss is declared in §12.5" with "the first map is under one second with the derivation pool below for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings; the slower first map above that knee (≈ 2.3 s at the 120 000 cap) and the single-worker knee (≈ 11 400 buildings) are declared in §12.5 for the owner's veto rather than hidden behind a partial picture". |
| P2 | §4.1 bullet **The generation worker and the derivation pool**, the J-P10 sentence (N-2) | replace "the pool is what keeps CITY within 300 ms and METROPOLIS within one second to first map (§12.3, §12.5)" with "the pool keeps CITY within 300 ms at its target and moves METROPOLIS's one-second knee from ≈ 11 400 to ≈ 14 200 buildings (§12.3, §12.5)". (N-20, pipeline's own item, fixes the same bullet's "rendering happens on the main thread"; the coherent text is "the tile worker rasters and composes from the display list and the main thread composites the transferred tiles (§8.9)".) |
| P3 | §4.10, the S14 sentence (N-4) | "the finer bands lazily per tile" → "the finer bands on demand, per district, when the tile worker's band requests name them (§8.9)". |

### 3.3 Scope (§1.2, §1.7, §13.2, §13.4, §13.5, §13.8, §14, §15.1, §16, §17.2, Delegated decisions, Judgment calls)

| # | section | request |
|---|---|---|
| S1 | §1.2 (N-2) | "… is on screen within 150 ms of the click on the reference machine (§12.1; a CITY within 0.4 s and a METROPOLIS within 1 s, §12.5)" → "… is on screen within 150 ms of the click on the reference machine for the default 5 000-person TOWN (124–145 ms across §12.2's building range; §12.1); a CITY's and a METROPOLIS's default requests take ≈ 0.33–0.42 s and ≈ 0.86–1.05 s, and every size follows §12.5's laws of the building count". |
| S2 | §1.7 tech-stack row *text* (N-5) | "Canvas2D label tiles from the bundled OFL fonts" → "Canvas2D glyphs from the bundled OFL fonts, composed onto the tiles in the tile worker (§8.8–§8.9)". |
| S3 | §13.2 **Cost-model tests** (N-2) | append: "B-CITY's browser runs time the first map at each rung's band bottom, default request and top — TOWN 1 500 / 5 000 / 9 900, CITY 10 000 / 20 000 / 29 900, METROPOLIS 30 000 / 50 000 / 120 000 people — and fit §12.5's first-map laws (M1 for TOWN and CITY, M2b for METROPOLIS; nightly thereafter)". |
| S4 | §13.4 **B-ZOOM** bullet (N-3, N-7, N-10, NF-D10) | add to the checks: "every placed glyph's text / halo pair at the label floor (§9.4); the draw-order census (the logged (slot, pass) sequence non-decreasing, §8.3); decoration stability for stamped, `grid` and `line` classes; the reload and two-derivation-order pixel identity of render-time keys (§8.3)". |
| S5 | §13.5 timing row (NF-S7) | "first map ≥ 10 × faster than FTG at CITY" → "first map ≥ 10 × sooner than FTG at FTG's timed CITY preset (9 500 people, 2 798 buildings: PLAT's TOWN law ≈ 0.24 s against 6.4–7.0 s), and at BIG_TOWN and BIG_CITY from M-1's captures". |
| S6 | §13.8 nightly tier contents (N-27 a, N-2) | add: "the model budgets re-measured inside Chrome's worker on the same seeds (the Chrome figure governs a gap above ± 15 %, §12.1); the first-map runs at three sizes per rung (§12.5)". |
| S7 | §14 `@plat/edit` interface (NF-D14) | `EditEngine.apply`'s comment → `/* Ok | Conflict(actions) | Confirm(token, fates) — an event carrying fates commits only when a fresh dry run computes the same fates (§11.2) */`. |
| S8 | §14 `TileBackend` (N-9 a, N-8) | `raster(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over'; shadows: 'off'|'drop'|'prism'; sun?: { azimuthCdeg: number; altitudeCdeg: number }; tier: 'low'|'mid'|'high'; dpr: number }): ImageBitmap` (the shadow-mode names are N-22's, scope's own item). |
| S9 | §15.1 parity matrix, O12 row (N-2, N-5) | (b) "≤ 80 draw calls per tile and ≤ 4 uploads per frame (§12.5)" → "≤ 80 draw calls per tile (≤ 80 × P per view) and ≤ 4 uploads per frame during gestures, every ready tile at first paint and settle (§12.5)"; (g) "first map per rung ≤ 150 ms / 0.4 s / 1 s (§12.5)" → "first map by §12.5's laws of the building count: under 1 s for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings, the miss above declared for the owner's veto". |
| S10 | §16 build plan (N-2, N-12, N-16, N-26, N-27, N-8) | M1 exit adds: "the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7)". M2a exit adds: "the verification reference mix within §12.6's V + 10 %". M2b exit adds: "METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the moving-sun step budget (§8.4); the METROPOLIS SVG budget (§12.7)". M3b content adds: "random styles with the bounded repair (§8.2)"; M3b exit adds: "the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2)". M4 exit: "METROPOLIS first map ≤ 1 s" → "METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people (under 1 s up to ≈ 14 200 buildings)". |
| S11 | §17.2 Fonts (N-12, N-13) | append: "The bundled faces are TrueType-flavoured (`glyf`), whose outlines SVG's default text writes (§11.1); when the default face lacks `smcp`, the family's OFL small-caps cut is bundled unmodified beside it (§9.2); an SVG export may embed a face unmodified as a data URI (§11.1). CI checks all three (§9.2)." |
| S12 | §16 effort table, O12 line (N-5) | "label tiles" → "label composition". |
| S13 | Delegated decisions, row D-18 (N-2) | decision → "**Budgets per §12.3 as per-rung laws of the building count — model p95 TOWN ≤ 20 ms + 60 µs × B, CITY ≤ 40 ms + 50 µs × B, METROPOLIS ≤ 100 ms + 52 µs × B (100 / 300 / 800 ms at the targets) — with the derivation pool as the primary configuration and the single worker as the pre-decided fallback (measured at M1 at CITY and at M2b at METROPOLIS); time to first map per §12.5 — TOWN ≤ 40 ms + 70 µs × B, CITY ≤ 60 ms + 60 µs × B, METROPOLIS ≤ 120 ms + 62 µs × B — under one second for every TOWN and CITY and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), ≈ 2.3 s at the 120 000 cap, a declared miss of O12 (g); a per-building cost ≈ 2 × MFCG's at TOWN and CITY and ≈ 5 × at METROPOLIS declared as a trade (§12.9)** — *owner veto on the miss above the knee*"; rationale → add "size follows population inside a rung, so the budgets are laws, and the one-click path stays complete at every size"; alternative rejected → add "a preview or a coarser one-click path above the knee"; cost to reverse → "low (numbers); ≈ 1 pw for a district-by-district city band above the knee; medium (architecture) if M0 or M1 miss". |
| S14 | Judgment calls, row J-R17 (N-2) | "Chose a per-building cost of ≈ 57–74 µs at p95 over matching MFCG's 12–39 µs because PLAT builds what MFCG does not, which D-7 ranks above speed; the first map stays under one second for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), and the slower first map above that — ≈ 2.3 s at the 120 000 cap — is declared for the owner's veto rather than hidden behind a preview (§12.5, §12.9)." |
| S15 | Judgment calls, row J-R7 (N-2) | "Chose no S9 preview over a block preview because §12.5's laws hold the one-second bar without one for every TOWN and CITY and for METROPOLIS up to ≈ 14 200 buildings, the slower first map above is declared rather than hidden, and a preview's figure-ground differs from the finished picture (§8.5)." |
| S16 | Judgment calls, row J-I2 (N-2) | "… because the derivation pool meets the one-second bar at every TOWN and CITY and at METROPOLIS up to ≈ 14 200 buildings, a preview's figure-ground differs from the finished picture (MFP-1), and both the slower first map above that knee and the single-worker fallback's lower knee are declared in §12.5 instead of hidden behind a partial map (§4.1, §8.5; C-2)." |
| S17 | Judgment calls, row J-R9 (N-5) | "Chose Canvas2D glyphs composed onto the tiles over SDF text because once tiles are composited text never needs the GPU, and one text path keeps text identical on every output (§8.9)." |
| S18 | Judgment calls — append rows J-R19 … J-R37 (every new choice of this round; the full reasoning is in the named section) | see §3.4 |

### 3.4 New judgment-call rows (for the scope area to append after J-R18)

| id | row |
|---|---|
| J-R19 | Chose the entity's lineage hash as the one key of every render-time hash over the address and the interned handle, because the lineage keys every other draw of the entity so a New random re-rolls its look with its shape, and handles are session-local, which broke pixel identity across reloads (§8.1; NF-D10). |
| J-R20 | Chose a slot-major draw order with passes inside each slot over the pass-major order, because pass-major drew every road casing over masses, fields, woods and shadows against the slot table's reasons, while separate casing and body slots keep GEO-28's guarantee (§8.1; N-7). |
| J-R21 | Chose composing base and labels into one bitmap per tile in the tile worker over two tile layers committed to the main thread, because it halves first-paint commits and per-frame draws at the same memory while a label change still never re-rasters the map (§8.8; N-5). |
| J-R22 | Chose a canvas budget derived from the viewport (3P + 7 MB) with tier ceilings and a tile-DPR step-down over fixed per-tier numbers, because the fixed low and mid budgets could not hold their own worst-case views (§8.8; N-9). |
| J-R23 | Chose to run every model-reading render step — live-layer providers, override resolution, on-demand bands, `compose()`, close-ups — where the model is, and to give the tile worker display-list tables only, over a model replica in the tile worker, because a replica doubles the working set and must follow every edit (§8.9; N-4). |
| J-R24 | Chose to apply an instance override by ordinal only while the entity's lineage and the ordinal's position both hold over applying it whenever the address survives, because a carried successor keeps the address but not the lineage, so the same ordinal lands on another tree (§8.10; NF-D11). |
| J-R25 | Chose bit-reversal (van der Corput) ranks for jittered grids and lines over a second blue-noise ranking, because the rank is then a pure function of the ordinal and as stable as it (§8.10; N-10). |
| J-R26 | Chose pins fixed at their own and finer stops and yielding at coarser ones over pins fixed at every stop, because a pixel-sized pin grows in world units as the view zooms out and would collide there (§9.2; N-28). |
| J-R27 | Chose to decide the quarter-tree rung from geometry before the greedy, with one ancestor candidate per stop, over letting it arise from collisions inside the greedy, because the local evaluation needs every candidate's place in the strict order fixed in advance (§9.2, §9.4; N-11). |
| J-R28 | Chose `ground` as the one fallback halo role, and darker inks for `lit` and `hatched`, over per-family halo roles and lower floors, because the matrix already guarantees ink against ground in every accepted palette and outlines over masses need the separation (§8.2, §9.4; N-3). |
| J-R29 | Chose to draw `ink`'s walls in the ink and its courts as ground at the city band over a ninth city-band tone, because the restraint clause names one ink and 4–8 roles and an enclosed court's small step adds noise at city zoom (§8.2, §8.5; N-25). |
| J-R30 | Chose a bounded random-style repair — fixed row order, ≤ 100 steps, ≤ 3 draws, then the shipped palette — over the unbounded raise, because only a bounded procedure can promise that every presented style meets the floors (§8.2; N-26). |
| J-R31 | Chose a strict WGS84 GeoJSON by an inverse transverse Mercator at a documented default anchor, plus a metric file by prior arrangement, over a local metric CRS with a `crs` member, because the latter fails RFC 7946 and is read by GIS tools as degrees (§11.1; N-14). |
| J-R32 | Chose glyph outlines as SVG's default text over embedded text, keeping the embedded face as an option, because only outlines draw the same glyphs in every consumer (§11.1; N-13). |
| J-R33 | Chose fate confirmation by token and fate equality (or resubmission with fates filled) over a force flag, because the committed event must carry exactly the fates the user saw (§11.2; NF-D14). |
| J-R34 | Chose a per-viewer `stylePreset` view key over treating the canonical style as a last-writer-wins view key, because a viewer's look must neither rewrite the shared style nor silently diverge from it (§11.3; N-15). |
| J-R35 | Chose first-map budgets as laws of the building count, with the one-second knee and the miss above it declared, over one bar per rung, because size follows population inside a rung (§12.5; N-2). |
| J-R36 | Chose to state load verification as a law of the log (V = M(B) + Σ c(e) + S14 + 5 ms) over saving checkpoints, because checkpoints would multiply edit-heavy documents while the wait is already off the path to the picture (§12.6; N-16). |
| J-R37 | Chose to let a CI font test pick each face's small-caps and figure path — the face's features, the family's OFL SC cut, then synthesis — over assuming the GSUB features, because nothing in the project shows the default face carries them (§9.2; N-12). |
