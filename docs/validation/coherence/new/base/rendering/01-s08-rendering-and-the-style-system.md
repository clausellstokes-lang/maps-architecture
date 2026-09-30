## §8 Rendering and the style system

*In plain words.* The town becomes one list of drawing instructions that every output uses — screen, SVG, PNG, print and
3-D. A style sheet is a data file saying how each kind of thing is painted, so one town can look like MFCG's clean ink
map, FTG's lit textured map or Neighbourhood's hatched close-up, and a new look is a file, not code. At city zoom the map
reads like MFCG's although our blocks hold plots and yards: blocks get their own ground tone so streets and squares are
the only paper-coloured gaps, walls, towers and gates are drawn at a legible symbol size (the model keeps their real
sizes), and houses too small to see merge into masses. Zoom uses a pyramid of picture tiles, so lines stay crisp; trees
keep their places at every zoom and can be moved one by one. One renderer (the browser's 2-D canvas) draws every look,
so screen, PNG and print agree. Layers and heights are the hooks for the staged sewers and floating islands (§8.4).
Receipts named `fixall_*.out` are in `docs/validation/bench/`.

### 8.1 The display list (renderer-independent, columnar, incremental)

```ts
// LodBand, Role (§8.2), ZoomStop (§8.8), and LabelTable, StringTable and GeomTable with §9.2's LabelRows, are declared in
// @plat/model (§14), so @plat/labels and @plat/render share them without either importing the other's code (N-22)
type LodBand = 'city'|'district'|'neighbourhood'|'building';
type MarkKind = 'area'|'ribbon'|'outline'|'hatch'|'glyph'|'text'|'instances'|'shadow'|'field'|'shore'|'light';
// one row per mark; every column a typed array, so any slice is transferable (§8.9); bytes per mark on the right
interface MarkTable {
  count: number;
  kind: Uint8Array;                    // MarkKind index                                                          1
  semantic: Uint16Array;               // index into DisplayList.semantics ('water.sea', 'ground.block', 'way.primary', …)   2
  entity: Uint32Array;                 // interned handle (§2.1): session-local; routes deltas, hit-tests, edits; never hashed   4
  key: Uint32Array;                    // 2 per mark: the render key (item 5)                                     8
  layer: Uint8Array; z: Int32Array;    // model layer (§2.1) and order inside it                                  1 + 4
  lodMask: Uint8Array;                 // one bit per LodBand in which the mark exists; geometry never changes with the band   1
  pass: Uint8Array;                    // 0 fills · 1 casings · 2 bodies · 3 linework and symbols · 4 overlay: the order within a slot (item 3)   1
  group: Uint32Array;                  // district handle: unit of delivery and invalidation, never of raster caching   4
  bbox: Int32Array;                    // 4 per mark, world cm                                                    16
  geomStart: Uint32Array; geomLen: Uint32Array;   // into GeomTable (face rings, chain, point set, text spine) or FieldRaster ids   8
  revision: Uint32Array;               // low 32 bits of the entity's §6.2 leaf digest (its inputs' content revision): the cache key (LC-23)   4
  attrs: Record<string, Float32Array | Uint32Array>;   // named columns, 4 B per mark each: heightCm, baseCm, eaveCm, ridgeCm, prosperity, class, block, bankKind, waterKind, exposure, knownTo, concealed, worksStage, worksKind, material, tintKey, …
}                                                        // fixed columns: 54 B per mark
interface GeomTable { rings: Uint32Array /* ring start offsets into coords */; coords: Int32Array /* x, y cm pairs */ }
interface FieldRaster { id: number; originX: Cm; originY: Cm; cellCm: Cm; cols: number; rows: number;
  values: Float32Array | Int16Array; meaning: 'heightCm'|'shoreDistanceCm'|'depthCm'|'daylightShare' /* the `live.shade` provider's, from `fieldDriver('daylight')`, read by its stepped `ramp` veils (§8.2) */ }
interface StringTable { utf8: Uint8Array; offsets: Uint32Array }                 // names and species kinds as one transferable UTF-8 blob
interface LabelTable {                // one row per LabelEntity drawn at the band (§9.1) — all S13b reads (§9.2); ≤ 97 B per row plus geometry and text
  count: number; mark: Uint32Array /* its text mark */; key: Uint32Array /* 2 per row: render key (item 5) */; kind: Uint8Array; lodMask: Uint8Array;
  priority: Float32Array; areaM2: Float32Array /* the target's area: the order's second key (§9.2) */; text: Uint32Array; shortText: Uint32Array /* StringTable rows; ~0 = none */;
  spines: Uint32Array /* 2 per row: GeomTable ring range, in preference order */; anchors: Uint32Array /* 2 per row: point-anchor range */; breakAt: Uint32Array /* 2 per row: glyph-index range */;
  parent: Uint32Array /* row of the parent QuarterNode's label (§9.4 rung 5); ~0 at the root */;
  pinStop: Int8Array /* −1 = not pinned */; pinSizePx: Float32Array; pinAnchor: Int32Array /* 2 per row, world cm */; pinSpine: Uint32Array /* 2 per row: GeomTable range */;
  pinDirCdeg: Int32Array /* PinnedPlacement.dirCdeg: a pinned point label's direction */; pinLines: Uint8Array /* PinnedPlacement.lines: 1 | 2 */;   // both written by S14 from LabelEntity.pinned (§9.1), read by §9.2's pin pass; the row stays ≤ 97 B
  pinSeq: Uint32Array /* the pin's moveLabel seq (PinnedPlacement.seq, §9.1): the order of §9.2's pin pass */;
  knownTo: Uint8Array /* 0 public · 1 local · 2 secret: the target's knownTo as §9.2's knowledge filter fills and reads it — read by that filter and by nothing else */;
  hidden: Uint8Array; revision: Uint32Array }
interface InstanceTable {             // one row per `instances` mark (§8.10), ≤ 40 B per row
  count: number; mark: Uint32Array; layout: Uint8Array /* stamp | grid | line */; offset: Int32Array /* 2 per row, cm */; rotationCdeg: Int32Array; spacingCm: Int32Array;
  species: Uint32Array /* 2 per row: range into speciesRows */; overrides: Uint32Array /* 2 per row: range into overrideRows */;
  speciesRows: { kind: Uint32Array /* StringTable row */; inner: Float32Array; outer: Float32Array; leafType: Uint8Array };                         // ≤ 16 B per row
  overrideRows: { ordinal: Uint32Array /* 2 per row */; op: Uint8Array; x: Int32Array; y: Int32Array; style: Uint32Array /* 2 per row: InstanceStyle fields */;
                  state: Uint8Array /* byOrdinal | rematched | orphaned (§8.10) */ } }                                                              // ≤ 32 B per row
interface LightTable {                // one row per `light` mark (§8.4; item 68): a placed LightSource (§2.7) or a derived light (a lit window, a room light, a shaft); ≤ 36 B per row
  count: number; mark: Uint32Array; x: Int32Array; y: Int32Array /* the source, world cm */; zCm: Int32Array /* its height above the datum: host ground + LightSource.heightCm */;
  intensityCd: Float32Array; radiusCm: Int32Array /* §8.4's cutoff */; sizeCm: Uint16Array /* the flame's or orb's radius: its penumbra */; colour: Uint32Array /* 0xRRGGBB */;
  flags: Uint8Array /* bit 0 fire (else magic) · bit 1 flicker · bit 2 lit at the drawn week and state · bit 3 downward (a shaft) · bit 4 underground */ }
interface DisplayList { marks: MarkTable; geom: GeomTable; rasters: FieldRaster[]; semantics: string[]; strings: StringTable; labels: LabelTable; instances: InstanceTable; lights: LightTable;
  salts: Record<RerollableConcern, number> /* §6.1's effective salt of every rerollable concern; type generated from the concern registry */; layers: LayerSpec[]; bounds: Box; version: number;
  surfaceTopCm: Cm /* the greatest elevation above the document's datum (`Terrain.datumCm`, §2.3) that a caster of the city band's list writes into the surface layer, a pyramid or the slab list (a slab's top: an island's, a span mark's, a deck's; §8.4 (a), §8.8) — the cursor sun's floor (§8.4 (d)); S14 derives it on the city band's list, which carries every caster (item 2), a delta raising it and a full build re-deriving it, and every other list — a finer band's, an export's transient one — carries that value, never one of its own (item 6; J-A68.93) */;
  surfaceLayerTopCm: Cm /* the same over the surface layers and pyramids only, without the slab list — §8.4 (c)'s Z, the reach of the global light's window; derived, carried and raised exactly as `surfaceTopCm` (M6-sky; file f item 416) */ }
interface DisplayDelta { version: number; groups: number[]; removed: Uint32Array /* entity handles */; marks: MarkTable; geom: GeomTable; rasters?: FieldRaster[] /* new or changed field rasters, as §8.9's delta row carries */;
  strings: StringTable; labels: LabelTable; instances: InstanceTable; lights: LightTable; dirty: Box[]; surfaceTopCm?: Cm; surfaceLayerTopCm?: Cm /* each present when the delta raises it */ }
interface DisplayListBuilder {                                   // S14; runs in the generation worker on the read-only model
  build(model: ModelView, band: LodBand, groups?: number[]): DisplayList;             // full build (generation, load), or one band for the named districts (on-demand bands, §8.9)
  update(model: ModelView, changed: Set<EntityHandle>, band: LodBand): DisplayDelta;   // edits, scoped regeneration, override resolution (§8.10)
}
```

1. **Built by S14** from the model through the entity registry (each type → marks per band); backends never read the
   model. Footprint geometry is identical in every band (O12 a; O17 i); only the marks emitted and the programs run
   change.
2. **Kinds.** `field` marks carry a world-space raster (terrain height for hillshade and contours, distance to shore
   for water ramps and foam, depth) and cost nothing when no program reads them (VIS-12). `shore` marks are chains, one
   per maximal run of equal attributes along a water face's boundary: `bankKind` (§2.3), `waterKind`, `exposure` and
   `shoreClass` (bay / headland / straight, §2.3; read by the shore programs' per-class rows). `exposure` = `sheltered`
   where the segment bounds a harbour basin, moat, canal or pond or its fetch (longest straight run across water within
   ± 30° of the outward normal) is below 300 m, `river` on river and tributary faces, else `open` (VIS-13). `instances`
   marks carry a face or chain and one `InstanceTable` row — the offset, rotation and spacing S14 draws from the
   entity's `render.instances` stream, the species mix, the resolved overrides; their points are generated at raster
   time (§8.10), never stored. `text` marks carry one `LabelTable` row each, so S13b needs only the display list (N-4) — except a room label,
   which the plan draw sets inside its own room (building band only) and which S13b reads only as a protected obstacle,
   through `ObstacleSource.protectedExtents` kind `room`, implemented by `@plat/render` from these marks (§14; §8.5, §9.2;
   J-A28.85). `light` marks carry one `LightTable` row each (§8.4): a placed `LightSource` record's (§2.7)
   position, height, intensity, radius, colour and flicker, or a derived light's (a live layer's window, the plan draw's
   room light, a shaft); the light pass reads them and nothing else draws them but the vector rung's `glow` sprite
   (§8.2). A building's `eaveCm` and `ridgeCm` columns (its wing's, for a wing mark; §2.6) let the surface layer (§8.4)
   rebuild each roof face's elevation from the roof's own construction without the model. **The city band carries every
   caster (item 68; J-A68.93).** Every caster of §8.4's *Shadow casters* has a mark in the city band's list — a tree
   line's `instances` mark too, its city-band rank subset empty so that band draws none of its crowns (§8.5's line
   greenery, §8.10); each base wing of a building of several has a caster mark in the city band carrying its own `Heights`, drawn by no program there (as a tree line's crowns), a building of one wing casting by its footprint mark; and the city band carries the caster marks of every composition's wings and towers and every close-up's casters that the elaboration cache holds (§2.9, §8.6) — added in the `DisplayDelta` that answers the band request deriving them, removed with the cache entry, and included in every full build — a composed building's replacing its base wings'; so the city band carries every caster any band draws at the heights that band draws, and the ring blocks (§8.8) and `surfaceTopCm` read them from the one list the tile worker always holds.
3. **Slot, pass, draw order (N-7).** The order is **slot-major across the whole scene**: every mark of slot s of the
   style's layer-order table (§8.2) draws before any mark of slot s + 1, in every tile; within a slot by `pass`, then
   `z`, then `key`. A mark's slot comes from its (semantic, pass) by §8.2's slot resolution, cached per style version as
   a (semantic index, pass) → slot table. S14 emits one mark per pass an entity draws in, as the registry declares per
   band: a cased ribbon is a pass-1 casing mark plus a pass-2 body mark over one geometry range (≈ 60 B for the second
   mark, never a second geometry copy; one extra mark per drawn way, a few thousand at CITY). The raised under-copy
   (slot 11) and projected shadows (`shadowPass`, slot 10) are not marks but per-tile operations over the caster marks,
   placed by `derived` entries (§8.2). Way casings (slot 5) and way bodies (slot 6) are separate slots holding every way
   class, so every casing precedes every body across the scene and no district's drawing puts a casing over another's
   body (GEO-28); masses, fields, woods and shadows keep their slots after the roads (K16, NG's shadow order, MFCG's
   wards after roads). `group` only delivers and invalidates; rasters are cached per world-aligned tile (§8.8).
4. **Incremental.** After an edit or scoped regeneration the builder gets the changed handles (§7.3's locality closure)
   and emits a `DisplayDelta`: removed marks; new marks for the changed entities and those whose marks depend on them (a
   way's marks when a junction on it moved; a district's ground mark when one of its blocks changed); their label and
   instance rows; and dirty world boxes = the old and new marks' bboxes dilated by the largest cross-tile effect (§8.8).
   Cost O(changed marks). During a replay the builder is suppressed and runs once at the end (§7.3 item 2; SCL-9).
5. **Cache keys and render-time keys (LC-23).** Every derived artefact — roof geometry, label spine, footprint
   mass, instance set, tile raster, glyph run — is keyed by (the entity's `key` or the tile address, content revision,
   band, style version, roof construction where it applies), never by id alone: a `setAttr` on floors changes the
   building's revision and so its roof; a changed boundary street dirties both its sides. **Every render-time hash** — a
   multi-colour role's index, weathering, a stamp's tile variant, grid jitter, crown index, colour and scale jitter, hatch
   phase, roof detail, the `ruin` dash — is `RH32(tag, key, salt[, ordinal or cell][, style id])`: a tag, an index into the
   fixed **render-tag table** — `role.<name>` (one per multi-colour role: its pick, §8.2), `weathering` (§8.2),
   `hatch.phase` (the `hatch` program), `ruin.dash` (the entity-keyed dash of the `ruin`, `trace` and dashed state rows),
   `stamp.variant`, `grid.jitter.x`, `grid.jitter.y`, `line.jitter.along`, `line.jitter.across`, `crown.species`,
   `crown.index`, `crown.tone`, `crown.scale` and `roof.detail` (§8.10), each read by the program it names; a new tag is
   appended, so no existing look moves; the **render key** `key` = the low 64 bits (words 0 and 1) of the entity key (§6.1), cached
   in the arena beside the lineage hash; the concern's salt (§6.1); and the style id only for looks (colours, crowns,
   hatch), never positions. `RH32`, the render hash (distinct from §13.6's string hash `H32`), folds the words through
   MurmurHash3's 32-bit finaliser and never reads the interned handle, which changes with interning order. The entity key
   is a pure function of model data, so an unchanged model renders pixel-identically after a reload (§6.2) and golden
   PNGs hold (§13.3); a render rule that orders entities (the tint colouring, §8.2) uses address order (§6.3). A look
   thus follows its entity's lineage and the seed (§6.3).
6. **Size (N-9 c).** 54 B per mark in the fixed columns, plus 4 B per mark per attribute column carried, plus the label
   and instance tables and geometry: a CITY city band of ≈ 60 000 marks is ≈ 3.2 MB of fixed columns, ≈ 2.4 MB of
   attributes, ≈ 4 MB of coordinates and ≤ 0.5 MB of label, instance and string rows — ≈ 10 MB; the undrawn caster marks of item 2 add 54 B each and their coordinates, and the slab list (§8.8) 16 B per record and 8 B per outline vertex, both counted on B-CITY at M2b; its light rows add ≤ 36 B
   per light (≈ 0.3 MB for 8 000 lights, PLAUSIBLE until §4.7's light table runs on B-CITY). The tile worker holds the
   only full copy; after each transfer the generation worker keeps only the **24-B index** — the columns `update()`, `hit`
   and `inView` read (`entity`, `bbox`, `group`: 24 B per mark, ≈ 1.4 MB at CITY) — and the city band's two surface tops,
   which every export's list carries (the `DisplayList` comment). An export that draws (SVG, PNG, print, the `.dd2vtt`
   image) builds its own **transient list** in the generation worker: SVG writes from it there; a raster export transfers
   it to the tile worker with its request; each releases it when done — the one statement of its lifecycle, which §8.9,
   §11.1 and §12.8 cite.
7. **The drawn week, and concealed marks (items 67, 63).** The display list is built at the **drawn week** (§4.11's
   *Which week is drawn*; the view key `week`, §2.9): S14 writes
   a Works target's `worksStage` column from `stageAt(works, w)`, its `worksKind` column from the running Works' kind (§4.11's
   `WorksRow.kind`, read by the `states` rows of §8.2 that name one) and its height columns from `heightsAt` (§4.11), and emits
   the stage's marks (a dashed footprint, a pit, walls without a roof, a scaffold ring, rubble; §8.2's `states` rows) and
   the Works' pending and staked plot lines. When the drawn week changes — the clock advancing, a host's `view.set
   { week }`, a scrub — the generation worker re-emits, as a `DisplayDelta`, only the marks of the targets whose stage or
   heights differ between the two weeks and of the lights whose lit bit changes (O(changed Works)); no digest moves (§6.2).
   A mark of a concealed part — a concealed room, the concealed entrance's tick, a concealed access point or link down
   (item 63; §2.6, II.7.4) — carries `concealed` = 1 and the concealed use's `knownTo`, so the raster draws it only for a
   viewer whose knowledge key admits that use at the band (§9.2; the key then joins the tile key, §8.8); the building's
   mass and every public part carry the building's own `knownTo` and always draw. **A light draws only where its host
   draws (items 63 (c), 64, 68; J-A63.82).** A `light` mark carries its host mark's `concealed` and `knownTo` columns, so
   the light of a concealed room, a lit window of one, a `LightSource` hosted by a concealed part or by an `AccessPoint`
   or `UndergroundLink` (II.7.4, II.7.6) and the shaft of such an access (§8.4 (b)) are taken by the light pass, the
   light-map bake, the vector rung's `glow` and every export's lights (§11.1) where their host draws at the band under
   the viewer's knowledge key (§9.2; §8.2's `access` and `link` rows), that key then joining the tile key and the
   light-map key (§8.8); a key that does not admit the host sees none of their light, glow or shaft, while a light
   whose host always draws always lights.

Judgment calls: J-R1, J-R2, J-R19, J-R20, J-A67.81, J-A67.83, J-A63.81, J-A63.82, J-A68.90, J-A68.93.

### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)

A style sheet maps (semantic, attribute predicates, band) to **paint programs** over a palette of **roles** and a
**symbolisation table**:

```ts
interface StyleSheet {
  id: string; version: string; family: 'ink'|'lit'|'hatched'|'painterly';
  palette: Record<Role, Color | Color[]>;                               // multi-colour roles: the pick rule below
  variants?: Partial<Record<CvdVariant, Partial<Record<Role, Color | Color[]>>>>;   // the checked colour-deficiency variants (item 112, below)
  symbols: Record<string /* semantic */, Partial<Record<LodBand, Symbolisation>>>;
  order: Record<LodBand, OrderSlot[]>;                                   // draw order per band, with reasons
  programs: Record<string /* semantic */, Partial<Record<LodBand, PaintProgram[]>>>;
  roofConstruction: 'plain'|'skeletonHip'|'skeletonGable'|'fakeGablePerWing'|'roofscape';   // over stored wings (§2.6); 'roofscape' (V02 §5.2): every shipped family's default once stage 3 registers (M6; file f item 406)
  roads?: { mode: 'full'|'outlined'|'dashed'|'hidden'; widthRatio: number /* hatched 0.4 */ };   // the close-up's road surfaces (V01 §5.1; M5, file f item 405)
  hatch?: { pitchM: number /* a world length, calibrated at M5 */; minPx: number /* 1.5: below it every second line */; details: boolean };   // the per-facet hatch (V01 §5.1; M5)
  closeup?: { vignette: 'none'|'fade'|'plateau' };                       // the close-up's framing (V01 §5.1; M5)
  plate?: { waterQualifier: boolean; populationRound: number /* 1; 10 under the `VG` preset */ };   // the title plate (§9.5; V07 §5.3; the village product, file f item 424)
  labels: LabelStyle;                                                    // faces, floors, halo rule (§9.4)
  light: LightingSpec;                                                   // the lighting model, its sun and moon and the vector rung's look (§8.4; item 68)
  raised: { on: boolean; offsetM: [number, number]; minPx: number; maxPx: number;
            ratio: { semantic?: string; classes?: string[]; ratio: number }[] };   // K06: the base offset × the first matching class row's ratio (below; item 54)
  overrides: ThematicRow[];                                              // thematic layers, materials, season, weather, tints
  states: StateRow[];                                                    // decline, condition, Works-stage and layer-state classes (the table below); a family defines every row
  post: PostOp[];                                                        // per-tile post operations
  referenceBackend: 'canvas2d';                                          // every shipped preset (§8.9)
}
type CvdVariant = 'protan'|'deutan'|'tritan';
interface LabelStyle { face: string /* the label face (§17.2) */; smallCapsCut?: string /* the family's bundled OFL small-caps cut, where one exists (§9.2's per-face path) */;
  floorsPx?: Partial<Record<LabelEntity['kind'], number>> /* raises §9.4's floors per kind; never below them */; haloPx: number /* 1.5, §9.4 */;
  leaders: 'small'|'always' /* §9.3: 'small' the 12-px rule */ }       // read by S13b (§9.2) and the tile worker's composition (§8.8)
interface ThematicRow { id: string; key: 'prosperity'|'use'|'epoch'|'owner'|'material'|'identity'|'power'|'sector'|'bandRange'|'season'|'weather'|'condition'|'favourite';
  match: string | [number, number];      // the attribute value, or a numeric range
  bands?: LodBand[]; paint: Partial<{ role: Role; colour: Color; pattern: string; alpha: number }>;   // the tone or texture laid over the mark's programs
  cue?: { kind: 'pattern'|'lineStyle'|'label'|'shape'; value: string };   // item 112's second cue (below)
  legend?: string }                      // the legend key's words (§9.5); absent: the row draws no key
type PostOp = { op: 'greyscale'|'sepia' } | { op: 'wash'; colour: Color; strength: number } | { op: 'edgeFade'; strength: number }
  | { op: 'pixelate'; cellPx: number } | { op: 'dotScreen'; cellPx: number; angleCdeg: number } | { op: 'scanline'; periodPx: number; alpha: number }
  | { op: 'crosshatchNoise'; periodPx: number; alpha: number };  // read by the tile worker, the GPU pass and the CPU reference in §8.4 (f)'s order
interface Symbolisation { mode: 'model'|'paper'; k?: number /* drawn = k × model width */; minPx?: number; maxPx?: number; px?: number /* paper width at 1× */ }
interface OrderSlot {
  slot: number;                     // its row of the layer-order table below; several entries may share a row
  semantic: string;                 // a semantic ('way.pier') or a dotted prefix ending in '.*' ('way.*')
  passes?: number[];                // the MarkTable passes (§8.1) of that semantic this entry places; absent = every pass
  derived?: 'raised'|'shadow';      // instead of the matched marks' draws: the per-tile raised under-copy or projected shadows over them (§8.4)
  seamClose?: boolean;              // its fills also get a ½-px same-colour stroke underneath (§8.8's seam rule); set in the shipped sheets on ground.block, masses, yard parts and the `shadow` entry; read by the tile backend's draw sequence (§8.9)
  reason: string; recordedAs?: string /* the reference step it matches, for order parity (§8.3) */ }
interface StateRow {                 // one row per (kind, state) that §2.8's ladders and the state fields of §2.5 to §2.7 can produce, the undeclined defaults excepted (§8.3's census); the shipped rows are the table below
  kind: 'building'|'wall'|'gate'|'tunnel'|'island'|'passage'|'plotLine'|'access'|'gallery'|'chamber'|'link'|'retaining'|'raised'|'deck'|'skyAccess'|'landUse';
  state: string /* an Existence value (§2.8), Building.condition (§2.6), SkyIsland.state (§2.7), 'superseded' for an enceinte whose supersededBy is set (§2.7), 'sealed' for a passage whose Passage.sealed is set (§2.5);
    a `WorksStage` (§4.11) for a target under a Works at the drawn week — the mark's `worksStage` column, §8.1 — which wins over the ladder state while the Works runs (item 67); 'pendingRemoval' or 'staked' for a plot line in transition (item 67 (g));
    an `AccessPoint.state` (II.7.4; item 64); a gallery's or chamber's system kind with its state (II.7.6; item 65); an `UndergroundLink.kind` (II.7.6; item 65) */;
  worksKind?: WorksRow['kind'] /* the row matches only a target whose running Works is of this kind (§8.1's `worksKind` column) and is an `override` laid over the row the stage resolves without it (J-A67.83) */;
  bands?: LodBand[] /* absent: every band the kind is drawn at */; paint: 'replace'|'override'; programs: PaintProgram[] }   // replace: drawn instead of the entity's programs; override: the row's tone, alpha, glyph and roof-construction changes laid over them
```

**Roles.** `paper` (margin, background), `road` (way bodies, squares, bridges; = `paper` in the ink family, so streets
are negative space), `ground` (built-block ground, yards at the city band, settled ground), `court` (enclosed in-block
courts), `garden` (private planted yard parts), `green` (parks, greens, commons, churchyards), `tree`, `field`, `verge`,
`water`, `building`, `roof`, `wall`, `ink` (every outline and text), `label`, `shadow`, `ambience`, `light`, `sand`,
`plank`, `grid`, `snow`, `glow`; the wall-material roles `wall.dry_stone`, `wall.earth_bank` and `wall.timber_crib` (item
110 (a); file f item 412); `furniture` (the plan draw's furniture, V03 §5.1; M6-P); `rock` and `void` (the underground's
halo and floors, V04 §5; M6-U); `sky.ground` (a sky island's land, never `ground` itself, V05 §5.1; M6-sky). A role never
changes meaning across the bands or the presets of one family; the reference schemas (MFCG 13 keys, NG 26, VG 40) map
onto it without loss. **The light roles (item 68):** `shadow` is the vector rung's shadow tone (the ink at the family's
alpha); `ambience` the vector rung's night wash and the two-tone roof's dark mix; `light` a lit window's or a light mark's
glyph tone; `glow` the vector rung's glow sprite (E-16). On rungs 1–2 of §8.4's ladder the light pass computes light over
the albedo instead of those tones. **Night and season variants:** a role's `@night` value is read by the vector rung when
the view is night (rungs 1–2 light the day albedo, so a family's night look is its day palette under the night's light);
a sheet may state it, else it is derived — the day value in linear light × 0.4, mixed 20 % toward `ambience` — with
`ink`, `label`, `light` and `glow` keeping their day values (labels are composed after the light, §8.4 (f)). `tree@autumn`
re-skins deciduous crowns (below); winter draws the bare-crown symbol in `tree`.

**Contrast matrix (O12 f).** Pairs that must separate wherever both roles are drawn (the city band unless the row says
otherwise):

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
| snow / road (snow lies on ground, fields and roofs while `road` keeps its value) | 8 | 5 |
| sand / water; plank / water | 8 | — |
| grid / paper | 10 | — |

Checked on every palette when loaded (built-in, user-edited, random) and on rendered city-band images in B-ZOOM (the
mean CIELAB of the pixels whose top mark, read from the pick buffer, has each role, for every pair in the view). A failing
user edit is shown with the failing pair and kept only with an explicit "accept low contrast" flag, recorded in the
report. MFCG's default palette has garden = building (ΔE2000 0.6) and tree = water (0.0) — reference weaknesses not to
copy (VIS-2).

**Random styles and their bounded repair (N-26).** A random style draws each role's L* within ± 12 of the family's
shipped value, chroma in [0, 34] in `ink` and [0, 60] otherwise (the families' role caps, below), any hue, keeping `road` = `paper` where the family ties
them — a style-time draw from the `style.random` stream (§6.1) written into the `setStyle` event as row operations, so a
replay never re-draws it. A failing draw is repaired in bounded steps: take the first failing pair in the matrix's row
order; raise its lighter role's L* by 1 (up to 97), or, if that is at 97, lower its darker role's L* by 1 (down to 3);
re-check every pair; stop when all pass or after 100 steps; the result must still pass after conversion to sRGB. A draw
whose repair fails is redrawn (attempts 0–2); after three failures the family's shipped palette is used and the report
says so — ≤ 300 steps by construction (J-R30). On 2 000 seeded draws per family around the role values below
(`docs/validation/bench/amendc_rendering_palette.out`): 9–27 % pass as drawn, 96–97 % after the first repair (median 4–12
steps, p95 16–39), 100 % within three attempts; the fallback does not fire. **Confirmation (M3b, where random styles ship):** shipped-palette fallback ≤ 2 % of 10 000 draws
per family; pre-decided fallback: the L* window narrows to ± 8 and the run repeats.

**Role values** (our own; calibratable rows; placed on the palette targets below, item 69). Every matrix
pair, outline rows included, passes on these sRGB values (`docs/validation/bench/amendc_rendering_palette.out`, re-running
the pair check of `fixall_rendering_r2_palette.py` on them; e.g. `ink` road / ground 8.4 / 8.9, ground / building
16.7 / 21.2, tree / water 29.2, court / ground 4.7, ink / building 42.5 / 48.8; `lit` ink / building 41.4 / 46.1;
`hatched` 37.4 / 40.7), and every shipped family's paper and ink sit on the targets — paper luma 235.3 and warmth 36, the
ink's luma 35.8–36.3 and warmth 20:

| role | `ink` (default) | `lit` | `hatched` |
|---|---|---|---|
| paper | `#F7EAD3` | `#F7EAD3` | `#F7EAD3` |
| road | `#F7EAD3` (= paper) | `#DDCFC1` | `#C4A683` |
| ground | `#E8CFA6` | `#D4B78F` | `#F7EAD3` (= paper) |
| court | `#F4DFAC` | `#D8C4A3` | `#B5BC6A` |
| building / roof (lit side) | `#AE947B` | `#BD855B` | `#B9723D` |
| ink / label | `#2D2219` | `#2C2218` | `#2C2218` |
| wall | `#2D2219` (= ink) | `#8B7964` | `#74593D` |
| water | `#9ABDD1` | `#2DA0D3` | `#71B4D3` |
| green | `#B4CC94` | `#8AB85D` | `#A9B951` |
| garden | `#C4CF96` | `#7BAF43` | `#9DB541` |
| tree | `#70946A` | `#447F33` | `#5E9434` |
| field | `#F5DEA0` | `#E3BC5D` | `#F3D580` |
| verge | `#D7DEB1` | `#A5BF7C` | `#B7C278` |
| shadow (the vector rung) | ink at α 0.35 | ink at α 0.45 | ink at α 0.40 |
| ambience | `#5A5048` | `#3E4A63` | `#4A4A5A` |
| light | `#FFF1CF` (a value, `mono`) | `#F5C45A` | `#F2C15A` |
| glow | `light`, α 0.6 at the centre falling to 0 at the sprite's radius | the same | the same |
| sand | `#EADBB0` | `#E6CF96` | `#EDDCA9` |
| plank | `#B39B78` | `#9A7650` | `#A07A4C` |
| grid | ink at α 0.25 | ink at α 0.25 | ink at α 0.25 |
| snow | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| tree@autumn | `#9A8A5E` | `#B8782F` | `#B0843C` |
| wall.dry_stone / wall.earth_bank / wall.timber_crib | `wall` / `ground` lerped 30 % toward ink / `plank` | `#8E8574` / `#9C8460` / `#8A6A45` | `#7E6A50` / `#8C7450` / `#7A5A38` |
| furniture; rock; void; sky.ground | ink at α 0.5; V04 §5 (the 40 %-ink cross-hatch at 1.2 paper px); `paper`; one step lighter than `ground` | a wood tone of the sheet (`plank`); V04 §5 (a dark stone fill); V04 §5; `ground`'s albedo | ink at α 0.5; V04 §5 (its dense hatch); V04 §5; the patch tone (V05 §5.1) |

The matrix's snow, sand, plank and grid rows pass on these values (snow / road ΔE2000 10.7 / 12.6 / 25.1, ΔL* 6.8 / 16.1
/ 30.1 in `ink` / `lit` / `hatched`; sand / water ≥ 29.0; plank / water ≥ 28.5; `tree@autumn` against water, green and
ink ≥ 21.2 / 21.2 / 38.3; each wall-material role against water ≥ 28.5; computed by our CIEDE2000 on the sRGB values, the
loader re-checking them).
`ink` keeps its character by value steps (O12's restraint: one ink, 4–8 roles): eight city-band colours — paper
(= road), ground, building, ink (= wall = label), water, green, tree, field; courts drawn as `ground` at the city band
(§8.5); the raised under-copy and the vector rung's shadows the ink at an alpha, and its light a change of value only
(`LightingSpec.mono`, §8.4); no role above CIELAB chroma 34 (`field` highest, 33.3) — the cap the palette targets set
(below; J-A69.82); walls in ink and courts as ground at the city band (J-R28, J-R29).

**Palette targets — the owner-opened corpus bands (item 69; owner: "Adopt the corpus measured color targets"; J-A69.81 –
J-A69.84).** The owner released these bands of the corpus's measured palette on 2026-09-27 (item 69 (a); PROGRESS J64):
the only corpus content in this design, every other corpus fact staying with the staged calibration phase (§13.9) and
no corpus file read by the program (the bands came as figures within the owner's item). They are **targets** — bands a
rendered plate must land in — never a palette to copy; the role values above are our own, placed inside them.

| axis | the measure (our definition, J-A69.81) | band | target | provenance |
|---|---|---|---|---|
| paper lightness | the Rec. 601 luma of the median 8-bit sRGB colour of the pixels whose top mark (the pick buffer) is `paper` | 226–244 | 235 | `corpus`, "owner-opened corpus palette exception, 2026-09-27 (item 69)" |
| paper warmth | R − B of that median colour, in 8-bit sRGB units | 20–50 | pinned at 36 | the same |
| darkest ink | the Rec. 601 luma of the darkest 0.5 % of all pixels ("full ink") | ≤ 45 | — | the same |
| ink warmth | the mean R − B of those pixels | 15–25 (our tolerance) | 20 | the same; the tolerance `own` |
| plate chroma | the mean CIELAB C*ab (D65) over every pixel | 18–70 | median 43; `ink` 20–30 (J-A69.82; J-C2) | the same; `ink`'s range `own` |

**Where they bind.** Every shipped family's paper and ink take the paper and ink targets (J-A69.84) — hence one paper
value for all three; the `ink` family's other roles keep their L* and hue and take the least chroma scale whose
plate chroma reaches 20, never past 30, keeping MFCG's restraint in the default map with the corpus's colour at its lower range
(J-A69.82; J-C2); `lit`, `hatched`, `parchment` — a shipping ink-family variant (the presets table) whose plate is the one
exception to `ink`'s 20–30 (RIC-01) — and the reserved `painterly` aim at the median (43), each by the chroma
scale nearest it that clips no role in sRGB and puts none above C* 60 (J-A69.83), which on today's values lands `lit`
at ≈ 29 and `hatched` at ≈ 30 — inside the band, short of the median; the dependent roles (road = paper, ground,
court, field, building, the shadow alpha) move with them and every contrast-matrix pair is re-checked by the bounded
repair's L* steps, which leave the new warmths as they are. The plate figures here are a **plate model**'s — the
city-band role shares of a plate-framed render, stated in the receipt — PLAUSIBLE until the **measurement render**
confirms them: a fixed render of the `ink`, `lit` and `hatched` families at plate-equivalent resolution and framing
(the golden TOWN and CITY of §13.3 framed by §9.5's framing rule at 300 dpi on A3, labels and furniture on, default view,
day, no pointer), measured on the resolution-stable axes only (paper luma and warmth, darkest-ink luma and warmth,
plate chroma) by our own measurement code written from the definitions above — no corpus instrument enters `plat/`.
Each family's chroma scale is re-found on that render by a scripted sweep at the milestone that ships its four bands
(`ink` at M1, where its values ship, and M2b; `lit` at M2b; the ink-family variants at M3b; `hatched` at M5; §13.4's
bar), the sweep and its receipt re-signing the table's values. The bands were measured by the corpus's own instrument,
whose definitions are not in this program's reach: a definitional mismatch is re-signed at the reconciliation stage
(§13.9), never by opening the corpus earlier. MFCG parity stays judged by style class (the `MFCG` preset needs no MFCG
colours), and §17.1 (5)'s palette audit — no three colours within ΔE2000 2 of a reference palette — compares with the
references' palettes only (the corpus is the owner's material, no reference).

**Symbolisation table (VIS-1).** Drawn width px = clamp(k × model width × px per metre, minPx, maxPx) in `model` mode, or
a fixed paper width at 1× (× the device pixel ratio) in `paper` mode; no length is written in any reference's private
unit. Exaggeration never enters the model, GeoJSON, VTT, glTF or CityJSON (model widths); styled SVG and PNG carry drawn
widths. The `ink` rows are calibrated on MFCG's metre-unit export at the matched view scale (MFCG size 40 at 0.816 px/m,
1.23 m/px): walls 7.6 m wide, towers 15.2 m across, road cores 8 m, piers 4.8 m; its SVG writes them in its 4 m internal
unit (wall 1.9, road 2) (MN-1, MFP-8).

| semantic | bands | mode | rule | at MFCG size 40's scale |
|---|---|---|---|---|
| `wall.curtain` | city, district | model | k = 3 on the band thickness (2.5 m → 7.5 m), minPx 2, maxPx 12 | ≈ 6.1 px (MFCG 6.2) |
| `wall.tower` | city, district | model | diameter = 2 × drawn wall width, never below the model diameter | ≈ 12.2 px (MFCG 12.4) |
| `wall.gate` | city, district | model | a gap in the wall stroke = max(model opening, 1.2 × drawn wall), flanked by two square blocks of side 2 × drawn wall | ≈ 12 px blocks |
| `way.through`, `way.primary` body | all | model | k = 1, minPx 1.5 | 8 m core ≈ 6.5 px |
| `way.secondary`, lane symbol body | city | model | k = 1, minPx 1 | — |
| way casing | all | paper | h = 0.5 px each side (casing = body + 2h) | — |
| `way.pier`, bridge deck | city, district | model | k = 1, minPx 1 | 4.8 m ≈ 3.9 px |
| raised way (`way.*` on a ground part ≥ 1; item 110 (b)) | all | model | deck k = 1, minPx 1.5, a parapet line each side at the outline weight; piers their model footprints, minPx 1 | — |
| retaining wall (item 110 (a)) | all | paper | city band: one line at 2 × the building outline weight with low-side ticks 1 px long every 4 px; district and finer: the `retaining` program | — |
| stair and ramp intervals of a way (item 110 (a)) | district and finer | paper | the `way.stair` program over the way's body | — |
| building outline | city | paper | 0.5 px × clamp(s ÷ 8, ⅓, 1), s = median footprint side in px at the zoom stop (MFCG's Thin lines as a law) | — |
| building outline | district and finer | paper | 0.5 px | — |
| raised under-copy offset | city, district | model | (+0.4 m, −1.0 m) east / north × the class ratio — `raised.ratio`'s first matching row: landmark footprints (the landmark semantic of slot 12, `building.landmark`: keeps, temples, churches, halls) 2, the farmstead class and its outbuildings 0.6, every other building 1 (provenance `ref:MFCG 12710731 raise ratios (code)`, P15; item 54), read from the mark's semantic and `class` column (§8.1), no model field — drawn length clamped to [0.3 px, 2.5 px] × the ratio | — |
| informal cluster structure (a plot of §4.7 S11's `cluster` arrangement; item 70) | city | model | each structure its own small roof mark over the plot's footpath web drawn in `ground`, never closed into one mass across the paths (§8.5 (2)'s exception); a structure below the 2-px floor a settlement dot; from the district band a footprint with its entrance tick like any building | — |
| boundary treatment (fence, hedge, yard wall, railing) | district and finer | paper | ≤ ½ the building outline weight, never filled, gaps at gates | — |
| entrance tick (`Entrance.role`, §2.6; item 29) | district and finer | paper | a tick across the footprint edge at the entrance vertex: `main` 1.5 px long at the outline weight; `side`, `rear`, `yard` and `service` 1 px at ½ the outline weight; at the building band the plan's door leaf | — |
| frontage treatment (`BuildingSlot.frontage`, §2.5; item 19) | district and finer | paper | a run along the main slot's frontage edge at ≤ ½ the outline weight: `lean_to` and `stall` as short ticks at bay spacing, `shopfront` a bar inset ½ px, `arcade` arcs at bay spacing; `none`, `gate` and `wall` draw nothing beyond the boundary treatment | — |
| passage arch (a `passage` face, §2.5; item 30) | district, neighbourhood | paper | an arch glyph on the front building's outline (`Passage.frontBuilding`; none while the passage has none, §2.6's `BaseWing.spans`) at each end of the face — where it meets its way and its court — 3 px wide at 1×, never below 2 px; the face's floor takes `road`; none at the city band, where the spanning building's mass covers it (§8.5 (2); J-A30.84, J-A30.87) | — |
| minimum feature | all | — | 2 px, met by masses and settlement dots (§8.5), never by enlarging one footprint | — |

Curtain walls draw after footprints, and the wall symbol is clipped on its inner side to the band's inner edge minus the
setback, so it overhangs only outward (berm, moat, glacis) and never covers a plot. **Dry ditch:** the `ditch` residue on
the town side of an `on_enceinte` bailey (§4.7 S10 (0), §4.8) takes the glacis parts' role in a dry-ditch variant — fill
5 ΔL* darker than the glacis fill and, at the district band and finer, a short inward hachure along its inner edge; at
the city band the glacis parts' plain fill; the overhang rule covers it.

**Paint programs.** `fill`; `stroke(width by symbolisation, join, cap)`; `casing(w, h)` (ink at `w + 2h` in the casing
pass, body at `w` in the body pass); `bands(N, W, exponent, ramp)` (VG's water law); `raised(offset, classRatio)`;
`shadowPass(mode, colour, alpha, penumbraPx)` (§8.4); `hatch(angle | ridge, pitch, taper)`; `roof(construction,
dark = lit × lerp(ambience, shadow, α))`; `crown(library)`; `halo(role rule)` (§9.4); `glyphAlongSpine`;
`pattern(texture, tintRole, metresPerTile)` (tinted seamless textures); `faceLight(dir)` (a per-face tone from the face
normal and the light: roof faces from the skeleton or the wings, wall sides); `ramp(field, stops)` (per-tile pixels from
a field raster: water depth, terrain colour); `hillshade(sun, strength)` (Lambert on bilinear-interpolated cell normals
of the terrain field, water masked, strength from the `shadow` role's alpha, multiply-composited after fills and way
bodies and before buildings and trees, no blur); `contourMarks(levels, mode: contour | hachure | grass)`;
`foam(widthM, alpha)` (from the shore-distance field on `open` segments, half alpha on `river`, none on `sheltered` and
`quay`); `feather(widthM)` (three inset vector bands at α ⅔, ⅓, 0 toward open ground, no bitmap blur; COV-FTG-I05);
`outlineMix(factor)` (an outline's ink lerped toward its district's tint by `factor`: the tint rule's 0.3, below);
`tint(method, strength)`; `weathering(amplitude)`; `instances(library)` (§8.10); `vignette` (a program: the painterly
family's spotlight vignette, drawn per mark in its slot; distinct from the post operation `edgeFade`, E-16);
`retaining` (item 110 (a): the wall as a double line in `wall` — its face and its coping — with short ticks toward the low
side every 1 m, buttresses as small filled rectangles on the low side; drawn by its run's state row); `raisedWay` (item
110 (b): the deck body in `road` — an aqueduct's channel in `water` between two `wall` lines — with a parapet line in
`wall` along each side, the piers as filled footprints in `wall`, the spans' openings as a dashed outline in the strip at
the district band and finer; the MFCG under-copy keeps the name `raised`); `way.stair` (item 110 (a): a way's stair
interval draws step ticks across the way over the interval only, every 1.2 m of ground length at the thin stroke; a ramp
interval draws the way's body with two hairlines converging toward its upper end; neither changes the way's shape or its
other marks); `roofscape(tone)`, `dormer`, `porch`, `towerRoof` (V02 §5.3; M6); `surface(kind)` (a shared stamp tile per
road-surface kind), `steps`, the hood pin symbols and the ground-access symbols (V01 §5.1; M5); `planWallShade` (a soft
band inside each plan wall, broken at openings; V03 §5.1; M6-P);
`ruin` (outline dashed by an entity-keyed pattern, fill at 30 % alpha, rubble stipple: the `ruined` state's program, with
the `none` roof kind, §2.6); `trace(kind)` (a footprint, ring or centreline drawn as a broken hairline with no fill — a
cleared building, a superseded wall's old line, a closed tunnel — at the district band and finer); `vault` (a barrel-vault
hatch along an underground cell's long axis over the `flat` roof kind, II.7.3); `symbol(glyph)` (a point symbol for every
`Pin.kind` of §2.7, for every `AccessPoint.kind` of II.7.4 where the point breaks the surface, for each end of a `passage`
face (an arch, §8.3) and for §8.5's change marker); `glow(radiusPx, role)` (the vector rung's light sprite at a `light`
mark, §8.4); the **Works programs** (item 67) — `stake` (a dashed footprint with a material-pile glyph in the yard),
`pit` (a cellar pit or trench: a darker ground fill with a hachured rim, and a spoil-heap stipple beside it),
`scaffold(ringPx)` (a hatch ring outside a footprint's walls), `frame` (the roof construction's lines without fill:
rafters and ridge) and `charred` (a blackened roofless shell); and the **underground system programs** (item 65) —
`ossuary` (a catacomb gallery's band with niche ticks), `cavern` (a natural gallery's irregular fill with a rock
stipple), `quarry` (a worked gallery's band with pillar squares, laid at `roomM` pitch with side √pillarShare × `roomM`
along a `workings` chamber's OBB axis, V04 §5), `ruinMasonry` (g item 109 (g): an ancient ruin system's double-lined
masonry walls 30 cm apart, 60 cm column dots in halls and temples, rubble stipple where collapsed; M6-U, file f item
407), `unexcavated` (g item 109 (j) (2): dashed kerbs at 40 % alpha, no fill, no light; drawn only for a `secret` key
while the view key `showUnexcavated` is on; M6-U) and `chamber` (a chamber's floor, the undercity's in
`ground` with its buildings drawn as buildings). Which states select these programs and which tone overrides they take
is the `states` table below, keyed by §2.8's ladders and §4.11's Works stages. On rungs 1–2 of §8.4's ladder
`faceLight`, the two-tone `roof`, `hillshade` and the `lit` crowns emit the albedo — the lit side's tone, no face
shading — and write their normals into the surface layer, and the light pass lights them once; on rung 3 they light as
written here (J-A68.87). In the state the ladders leave undeclined, a tunnel draws by
its `Tunnel.kind` — a cased band for a `main`, a hairline pair for a `drain` or `culvert`, a `passage` as a `main` with
arch glyphs at its ends — and an underground building (one on the underground arena) draws its footprint in
`building`, a vault class with the `vault` hatch, both through the underground layer's cut-away (§8.4); access points and gratings are `symbol`s on the
ground layer where they break the surface. A lane's body and casing end square at
the kerb of the way it meets; the junction wedge belongs to the higher-class way (GEO-21's renderer half). Hairlines and
casings are in paper px; ribbons and symbols follow the symbolisation table.

**Relief tier (VN-029, VN-031; base should-have, optional, off by default).** Contour, hachure and grass marks are
extracted per render tile from the terrain `field` by marching squares over the tile's cells plus a margin, then
resampled evenly along each level line, and clipped to the land faces in vector space before emission, so no contour
crosses a shore (F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2)); `hillshade` runs on the same field.
VG-specific looks (spotlight vignette, dramatic forest) stay in the reserved `painterly` family.

**Multi-colour roles (XB17).** A role may hold a list: an individual mark (building, roof, tree, stall) takes index
`RH32(role, key, salt[, instance ordinal], style id) mod n` (§8.1 item 5); aggregate fills (block ground, city-band
masses, wood fills) take index 0.

**Tints and weathering (K12).** `tint`: per district a hue from a greedy colouring of the district adjacency graph in
address order (§6.3) — hue = base + 137.5° × colour index, stepped by 30° until every neighbour differs by ≥ 30°; method
`spectrum` (hue at fixed saturation and value), `brightness` (value scaled) or `overlay` (blend toward the hue), strength
0–1; applied to the roofs of built districts; outlines take lerp(ink, tint, 0.3) (`outlineMix(0.3)`); recomputed when the
palette changes; off in `ink` by default. S14 writes each mark's district colouring index into the `tintKey` column
(§8.1), which the `tint` and `outlineMix` programs read. `weathering`: each roof's RGB × (1 + u·w), u ∈ [−1, 1] from
`RH32('weathering', key, salt, style id)`, w = 0.04 (ink), 0.06 (hatched), 0.08 (lit).

**Materials, season, weather (COV-FTG-F20, K06).** Override rows may key roof and wall colours by `roof.material` and the
enceinte's wall material. A material is a rendering attribute only (§2.6; item 19): its rows change colour and texture
roles and never a mark's geometry, so a `setAttr` of a material re-keys the same marks' look and moves nothing.
**Wealth in the roof's colour, as FTG draws it (§2.6; items 19, 23; J-A19.81).** The `lit` family's default
sheet keys the `roof` role by the building's prosperity band — one override row per band of the band set
`prosperity.bands` (§4.5), keyed by the band's name and read from the mark's `prosperity` column banded by §4.5's rule
(the field, as labels and descriptions read it; never `builtBand`, below) — the richest roofs the deepest clay, the
poorest the greyest: `rich` `#C17C46`, `prosperous` `#C08051`, `comfortable` `#BD855B` (the role's own value),
`modest` `#BA8765`, `poor` `#B48B6E`, `squalid` `#AF8E78` — our own calibratable rows, moved by `lit`'s chroma scale with
its role values (item 69; `amendc_rendering_palette.out`), each passing every
contrast-matrix pair of the `building` role whose value the lit roof side shares (ground, road, garden, green, ink),
which the loader checks as it checks any palette. In `lit` the material picks the roof's `pattern` texture and the band
row its tint, so the two never contend; a sheet that also keys a roof colour by material applies it after the band
row; a band without a row of its own takes §4.5's interpolation between the nearest rowed bands. `ink` keeps MFCG's
one roof role and `hatched` NG's two tones. The view keys `season` ∈ {spring, summer, autumn, winter} and `weather` ∈
{clear, overcast, snow} (§2.9) select override rows: autumn and winter re-skin deciduous crowns (by `leafType`,
deciduous when absent) through role variants (`tree@autumn`; winter a bare-crown symbol); snow lays the `snow` role over
ground, fields and roofs while `road` keeps its value; overcast removes the global light's direct term — its shadows go,
the ambient and the occlusion stay, and on the vector rung projected shadows are off (the raised under-copy stays). The
retaining walls' material roles (`wall.dry_stone`, `wall.earth_bank`, `wall.timber_crib`) are picked by
`RetainingWall.material` (V11's `MaterialRow` key) as the wall-material rows are. The model and its hash are untouched.

**Post operations (K07; `PostOp`).** `greyscale`, `sepia`, `wash(colour, strength)` (a whole-tile tint), `edgeFade` (the
view's vignette), `pixelate(cellPx)`, `dotScreen(cellPx, angle)`, `scanline(periodPx, alpha)`,
`crosshatchNoise(periodPx, alpha)` — named apart from the per-mark programs `tint` and `vignette` (E-16) — each applied once to a
tile's base picture (slots 1–20, below), never to the labels, live overlays and furniture composed over it: by Canvas2D
in the tile worker after the base's marks (≈ 1–2 ms per 512² tile) where the light pass does not run, and after the light
pass where it does, in the order §8.4 (f) states, so no light re-colours a greyscale, sepia or tinted base. The cell operations
(`pixelate`, `dotScreen`) take their cells and weights by §8.4 (f), so a view and an export of one frame agree. PNG export
applies them per tile; SVG carries greyscale, sepia and wash as one colour-matrix filter over its lit base — the wrapper
group of §11.1's SVG row — and omits the pixel operations, which the export report lists.

**Live layers (K13, N-4).** `interface LiveLayerProvider { id: string; target: 'base'|'overlay'; readsElaborations?: boolean; marks(view: ViewState, model: ModelView, region: Box, elaborations?: readonly ElaborationRecord[]): MarkTable }`
adds display-list groups that are view data (never hashed). Providers run in the generation worker, which calls one when
the view state it reads, the model, the visible region (dilated by one tile) or — for a provider that declares
`readsElaborations`, such as `live.stale` — the elaboration records (`Document.derived.elaborations`, §2.8, §2.9; passed
to it as `elaborations`) change, so a click that writes only the cache (§7.3) re-runs it; it delivers its marks as a
`DisplayDelta` of group `live.<id>` (§8.9). `overlay` marks are drawn in the tile worker's composition step (§8.8), so a
selection or a moving person re-composes tiles without re-rastering; a `base` provider (a thematic recolouring) is part
of the tile key (§8.8). Shipped: `live.selection` (overlay); `live.stale` (overlay: §8.5's change markers, one glyph per building or district whose
elaboration record reads `stale`, read from `Document.derived.elaborations` beside the model view, outside every digest;
J-A28.81); `live.favourites` (base: the view state's `favourites` as a
thematic override); `live.ghost` (overlay; item 101: the pending dry run's preview — the derived shape of a points form,
the plots and buildings the declaration would make or move in `ink` at α 0.5, its handles and the anchor of §9.5's count
badge — delivered while a declaration is being drawn or a clerk's proposal waits, removed on commit or cancel, never a
model change; R1, R3, R14); `live.windows` (base; item 68: a `light` mark for each lit window at the view's hour and
drawn week by §10.3's rule, read by the light-map bake, §8.4); `live.shade` (base; g item 102 (f): the daylight-share
driver's raster as six stepped ink veils under the building fills, an island's shade strip outlined by V05's
`sky.island.shadeStrip` and `sky.island.shadePending` rows — V09 §5.4); `live.links` (overlay; g item 105 (j): the bound
supply links as curved provider-to-consumer arcs by volume and good — V09 §5.4); `live.coverage` (overlay; g item 103 (f):
for a selected class, the catchments that lack a member, from V01's `catchmentOf`); `live.voids` (overlay: the
underground systems' footprints on the ground with the districts above them, from V01's `districtsAbove`, admitted by
§9.2's function); `live.history` (overlay; V06 §5: then-and-now between two weeks — `live.history.added`, `.removed` as
a dashed ghost from the earlier frame, `.changed` as a tint; M6-E); and `live.people` (overlay: favourite persons'
positions from the occupancy at the view-state hour, one categorical colour per person), which the simulation module
registers through §14's `LiveLayerProvider` registry (§10.3). The model view a provider receives offers
`fieldDriver(id: 'daylight'): { cellCm: number; origin: PointCm; w: number; h: number; values: Uint8Array }` — the
field's driver raster as §4.5 holds it, or computed on demand by g item 102 (a)'s sampler and cached per document state
when the field skipped it; read-only (file f item 411). A ghost a clerk's `preview` delivers carries `source: 'clerk'` and
draws the AI mark beside its count badge (R19; file f item 518).

**Thematic layers.** FTG D7's matchers are override rows (`ThematicRow`) keyed by entity attributes (`prosperity`, `use`,
`epoch`, `owner`, `material`) — data, not code; the tile worker applies them over a mark's programs from its `attrs`
columns, and §9.5's legend reads their `legend` and `cue` cells. A row keyed by `use` or `owner` skips a mark whose
`knownTo` column (§8.1) §9.2's admission function does not admit at the band, drawing it unthemed, and a theme's legend key lists only
the values drawn, so no theme colour and no legend key names a withheld purpose; while such a row is active the
knowledge key joins the tile key (§8.8) (J-A30.85). A front's building themes as its front, and its concealed use
(item 63; §9.2) has no theme colour and no legend key for a key that does not admit it. **Character themes (item 72; J-A72.81):**
rows keyed by a district's `identity`, by the share of a power (`CircumstanceSlice.powers`, §7.7) or of a sector among
its significance-weighted plots, and by its band range (§4.5) — data rows like FTG D7's matchers, which stay override rows
of the same kind. **Conditions (item 88; staged):** a `ConditionOverlay` (§2.7) is drawn as a settlement-wide thematic
row — a settlement-wide `wash` plus a legend row, keyed by its archetype and severity, no geometry — the rows
schema-complete and empty in the base until the port fills the records; the shipped rows `condition.siege`,
`condition.quarantine` and `condition.occupation`, the view `supplyChains` (a chain drawn only when §9.2's function admits
every joined node) and the `states` row `worked-out` are V08 §5.2's, in every shipped family (SettlementForge stage; file f
item 410). **Oases (g item 111):** a spring-fed water body draws as water with a `symbol('spring')` at its spring point;
its grove is a `Greenery` wood drawn by the `instances` program with the climate row's species; its irrigated gardens
are `garden` and `field` land-use faces with their channels as `water` hairlines — existing roles and programs, one new
point symbol (§8.3's catalogue).

**Colour-deficiency safety (g item 112; J122).** Every family and thematic view that encodes a meaning in colour carries a
second cue, so no meaning rests on hue alone:

| colour-coded meaning | second cue |
|---|---|
| district tints (`tint`) | the district's name label (§9.4) and, at a tint change, the district boundary's line style |
| prosperity (`lit`'s roof-by-band rows; the prosperity theme) | a hatch density by band — none for the richest band, one step denser per band down |
| ownership (`owner`-keyed rows) | a pattern per owner category (dots, stripes, crosshatch, grid, wave, cycling in legend order) |
| knowledge (the admitted tiers of a thematic or game-master view) | the outline's line style: `local` dashed, `secret` dotted |
| the underground's systems (§8.2's gallery, chamber and link rows) | the system's program glyph (niche ticks, rock stipple, pillar squares, masonry double lines, vault hatch) |
| water classes (`waterKind`) | the shore program's line style and the water body's label |
| ground classes (land-use kinds) | the land-use `pattern` texture in textured families, a glyph stipple per kind in `ink` |

The cues are drawn at the legend-bearing zoom stops (those at which §9.5's legend shows the meaning) and in every
thematic view; elsewhere the default sheets keep their look. Each such sheet ships a checked variant per common
deficiency — `StyleSheet.variants` for `protan`, `deutan` and `tritan`: role substitutions the loader lays over the
palette — selected by the per-viewer view key `cvdVariant` (`'none'` default; V09's view settings), which joins the tile
key (§8.8). A missing variant draws the sheet's palette with its cues and is reported by the loader. §13's style check
(the simulated-deficiency contrast between every pair of categories a legend distinguishes, against its table threshold)
measures every variant; §9.5's legend shows each category's cue.

**Decline, condition and layer states (items 8, 11, 31; II.6, II.7; J-A8.81).** `StyleSheet.states` is a rule table
keyed by kind × state, read after an entity's programs are resolved: a `replace` row draws its programs instead of the
entity's at the row's bands, an `override` row lays its changes over them. The shipped rows, one set per family (`ink`
shown; `lit` and `hatched` keep the same geometry and glyphs with their own tones):

| kind | state (§2.8's value unless noted) | bands | row |
|---|---|---|---|
| building | `abandoned` (vacant) | all | override: roof tone lerped 30 % toward `ground`, no raised under-copy |
| building | `decayed` (derelict, roofless: `RoofSpec.kind 'none'`, §2.6) | all | override: no roof construction, the outline dashed by the entity-keyed pattern, fill at 60 % alpha |
| building | `ruined` | all | replace: the `ruin` program, with the `none` roof kind |
| building | `cleared` (a footprint trace) | district and finer | replace: `trace('footprint')` — a broken hairline, no fill; no mass at the city band |
| building | `reused` (a trace worked as the kind `Building.reusedAs` names — garden, orchard or field, §2.6; J-A8.22) | all | replace: the trace's face filled as that kind — `garden` (`ground` at the city band, a yard there), an orchard's `grid` instances, `field` — with `trace('footprint')` over it at the district band and finer; no mass; a successor raised on the old foundations is a building of its own (`Building.predecessor`) and takes its class's programs |
| building | `condition` `worn` / `neglected` (§2.6; item 31) | district and finer | override: `weathering` amplitude × 2 / × 4 and, at the neighbourhood band and finer, a roof `pattern` variant with patched courses — texture and colour only (item 19); no change at the city band |
| wall, gate | `abandoned` (neglected) | all | override: the wall stroke's casing dropped, its tone 20 % toward `ground` |
| wall, gate | `decayed` (breached or partly dismantled) | all | override: a gap glyph over each `breached` run of `Enceinte.condition` (§2.7; file f item 575); the towers of each `dismantled` run as trace discs |
| wall | `superseded` (`Enceinte.supersededBy` set, §2.7) | all | replace: `trace('ring')` — the old line as a hairline lighter than a wall, under the new ring's stroke |
| tunnel (II.7) | `abandoned` (silted) / `decayed` (caved in) / `ruined` (`Tunnel.closure` collapsed or sealed) | the underground layer | override: the band dashed / the band broken at the caved stretch with rubble stipple / the band as `trace('centreline')` with a closure glyph at each sealed end |
| island (II.6) | `floating` / `waning` / `settled` (`SkyIsland.state`, §2.7) | the sky layer | override: none / the layer's alpha × 0.8 / × 0.6 — under `ghost` occlusion the island drawn at (1 − `ghostAlpha`) × that factor, the covered ground showing through at the rest (no separate raise) (§8.4); the shadow follows `elevationCm` by itself |
| island | `fallen` | the ground layer (the `fallen_island` decoration's members, V05 §3.16) | replace: the `ruin` program's rubble stipple over the members' faces and bands (M6-sky; file f item 408) |
| island | `removed` | the sky layer | replace: nothing drawn, no label, no shadow (V05 §4.2) |
| skyAccess | its states (V05 §5.1) | the sky and ground layers | V05 §5.1's rows (M6-sky; file f item 415) |
| retaining (item 110 (a)) | per run of `RetainingWall.state` (§2.7): `standing` / `decayed` / `ruined` | all | override: none / a bulged, broken stretch (the double line wavered, ticks broken) / replace: the bank alone (the low side's ticks as a hachure, no wall line) |
| raised (item 110 (b)) | in use / `abandoned` (neglected: no traffic, weathered; an aqueduct run dry) / a span `ruined` (fallen) / supports alone | all | override: none / the deck's casing dropped, its tone 20 % toward `ground` / replace the span: rubble stipple at the span's foot, the arch gone, the supports standing; a vault under a fallen span not drawn (collapsed) / the piers alone as filled footprints |
| deck (item 110 (d)) | its host's existence (file f item 246): `decayed` / `ruined` | all | override: a charred timber deck (the deck in `ground` lerped 40 % toward ink) / replace: the carriageway broken (dashed), the piers or the mole standing; the buildings on its deck plots by their own ruined rows until tombstoned |
| landUse (a deposit) | `worked-out` (V08 §5.2) | district and finer | as V08 §5.2 states (SettlementForge stage) |
| passage | `sealed` (`Passage.sealed`, §2.5; item 30) | district, neighbourhood | override: the arch glyph at each end drawn closed (a bar across the arch); the plots behind it take their buildings' own rows (vacant, §4.11) |
| building | Works `staked` (item 67; §4.11) | all | replace: `stake`; no mass at the city band, the stage glyph (§8.5) on the dashed footprint |
| building | Works `groundBroken` | all | replace: `pit` over the footprint; the stage glyph at the city band |
| building | Works `foundations` | district and finer | replace: the footprint's walls as low wall bands (outline weight × 2) or a sill frame, no roof; the city band a mass at 40 % alpha with the stage glyph |
| building | Works `wallsRising` | all | override: no roof construction, the interior floor in `ground`, `scaffold` round the walls; the heights of `heightsAt` (§4.11), so shadows grow storey by storey |
| building | Works `roofFramed` / `roofed` | all | override: `frame` without fill and `scaffold` / the roof drawn with `scaffold` still up; a work yard in `ground` |
| building | Works `emptied` / `stripped` / `rooflessShell` / `rubble` (a demolition) | all | override: openings as gaps / `frame` over bare rafters / the `decayed` row with rubble stipple inside / the `ruin` program as wall stubs with rubble heaps; `cleared` is the existing row |
| building | Works `decaying` (on the way to `decayed`) | all | override: the roof with gaps along its ridge, the outline dashed at 30 % |
| building | Works `roofless` / `collapsed` / `overgrown` (a decay Works' ruin stages, item 67 (f); §4.11's *Works* (4)) | all | as the `decayed` row / as the `ruined` row / replace: the footprint as a grassy mound — a `green` stipple fill, `trace('footprint')` over it at the district band and finer — with no mass |
| building | a `repair` Works at any stage of the decay ladder — `abandoned`, `decaying`, `roofless`, `collapsed`, `overgrown` (`worksKind: 'repair'`; §4.11's *Works* (4): the decay stages backwards under a scaffold; item 67) | all | override, laid over the row the stage resolves: `scaffold` round the walls and a work yard in `ground`; the city band's stage glyph (§8.5) |
| building | `charred` (a fire, item 67) | all | replace: `charred` — the blackened roofless shell, until a clearance or repair Works starts |
| building | Works `refit` (a conversion without a geometry step) | district and finer | override: `scaffold` along the frontage |
| plotLine | `pendingRemoval` / `staked` (item 67 (g); §4.11's Works lines) | district and finer | replace: the old boundary treatment dashed / the new line as stakes, dashed, until its fence or wall stands |
| access | `open` / `locked` / `bricked` (`AccessPoint.state`, II.7.4; item 64) / collapsed (its derived reading while its element is closed, II.6) | the ground layer where it breaks the surface, and the underground layer | override: the kind's `symbol` / with a bar / filled solid in `wall` / as a trace with rubble stipple; a secret one drawn only for a key that admits it (§9.2) |
| gallery | its system's kind — `catacomb`, `cavern`, `quarry`, `vaults`, `buried` (a buried old town's street), `dug` — or an undercity walkway (II.7.5, II.7.6; item 65), with the closure states of II.6's table | the underground layer | replace: `ossuary`, `cavern`, `quarry`, the `vault` hatch, the old street as a lane's body in `ground` with its buried shells as `trace` outlines, a dug passage as a `passage` tunnel, a walkway as a lane's body in `ground`; its closure states as the tunnel row above, `flooded` in `water` |
| chamber | its `Chamber.kind` (V04's `ChamberKind`; II.7.6, II.7.5) | the underground layer | replace: `chamber` with the kind's fill — `ossuary` niche ticks densening with its complex's `fill`, `workings` the quarry pillars, `cistern` in `water`, `streetVault` and `bridgeVault` the `vault` hatch, `storey` and `square` as buried-town floors, `cellar` and `storage` as `dug`, the ruin's kinds by `ruinMasonry`; a flooded chamber in `water`; a collapsed one as a trace with rubble stipple; an unexcavated one by `unexcavated` (M6-U; file f item 407) |
| link | `UndergroundLink.kind` — `open` / `gated` / `secret` / `collapsed` / `flooded` (II.7.6; item 65) | the underground layer | replace: a hairline pair / with a gate bar / dashed and drawn only for a key that admits it / broken with rubble stipple / in `water` |

A Works stage named like a ladder state — the decay Works' `abandoned` and the demolition's `cleared` — takes that
state's row above; `before` draws the target's prior state and `finished` the target's own programs, the two stages
§8.3's census exempts as undeclined (item 67 (f)). A row that names a `worksKind` is the one exception to one row per
(kind, state): it matches only a target whose running Works is of that kind and is laid over the row its stage resolves
without it (J-A67.83), so a repair draws the decay stages backwards under its scaffold.
No reference draws a declined, worn or hidden state, a building in progress or an underground (item 23): the rows are
ours, they act only on an entity that carries the state or a running Works, and a town that never passes an epoch, a
scheduled edit or a hand conversion renders as the references' would.
`builtBand` and the geometry floor (§4.11) are read by no render rule: condition follows `Building.condition`, and
labels and descriptions follow the prosperity field (J-P1).

**Layer order** (data; `ink` shown; one list for the city and district bands). MFCG's recorded order (water → road casing
→ road body → river → landmarks → wards → piers → fields → walls → towers → grid → scale bar → compass → labels → title) is
a subsequence (order parity, §8.3); NG 1.2.2's (greens → roads → shadows → buildings → props → large-tree pins under buildings,
block trees above them → title; item 58 (d)) is a subsequence of the `hatched` sheet's slots.

| # | slot | reason |
|---|---|---|
| 1 | paper | background; streets and squares are paper by omission |
| 2 | water | MFCG: water |
| 3 | ground.block | new: the figure-ground contract (§8.5) |
| 4 | relief (hillshade, contour marks; off by default) | new: under everything built (VG) |
| 5 | way casings (`way.*`, pass 1), every class drawn at the band | MFCG: road casing |
| 6 | way bodies (`way.*`, pass 2) | MFCG: road body |
| 7 | river casing and body | MFCG: river |
| 8 | shore marks | new: on the water edge, after water and river |
| 9 | greens, parks, yard parts by role | new: the plot model |
| 9b | retaining walls (`retaining`; item 110 (a)) | new: over the ground they hold, under the shadows |
| 10 | projected shadows — the vector rung only (§8.4; `derived: 'shadow'` over the casters) | new: after roads, before buildings (NG) |
| 11 | raised under-copy (`derived: 'raised'` over footprints and masses) | part of MFCG's building draw |
| 12 | landmark footprints (solid ink); raised-way piers (in `wall`) | MFCG: landmarks |
| 13 | building masses / footprints / roof detail — each building's wings in stack order (`BaseWing.on`, §8.6), a tier over the tier below | MFCG: wards |
| 14 | piers and bridges; raised decks (`raisedWay`), on the vector rung their shadows drawn in a derived pass just before this slot over everything below, roofs included | MFCG: piers; a deck may stand above the roofs beside it |
| 15 | fields and hinterland land use | MFCG: fields |
| 16 | trees: wood fills and crowns | MFCG's tree slot: after fields, before walls; woods may cover track casings (K16) |
| 17 | boundary treatments (district band) | new: over yards, under curtain walls |
| 18 | curtain walls | MFCG: walls, after buildings |
| 19 | towers and gate blocks | MFCG: towers |
| 20 | grid | MFCG: grid |
| 21 | scale bar | MFCG: scale bar |
| 22 | compass | MFCG: compass |
| 23 | labels (glyphs composed onto each tile, §8.8) | MFCG: labels |
| 24 | title, legend, emblem | MFCG: title |
| 25 | live layers, annotations, measure overlay | new: view data on top |

A bridge or pier (slot 14) is cased along its sides only — its ends are open where it meets its way — so no later casing
crosses an earlier body. Slots 1–20 are the base raster; slot 23 and slot 25's world-space live marks and annotations are
composed onto each tile by the tile worker (§8.8); slots 21, 22, 24 and the measure overlay are screen-space furniture
drawn by the main thread over the composed tiles (§9.5). **The light pass** (§8.4; item 68) runs over slots 1–20 and
before slot 21: labels, live overlays and furniture are never lit. §8.3's census checks every tile's draw calls against
this table.

**Slot resolution.** When a sheet is loaded (built-in, user-edited, random, host-supplied) the loader takes, per band,
every (semantic, pass) pair the entity registry says S14 emits at that band and the sheet paints, and resolves it against
the band's entries without `derived`: candidates are the entries whose pattern matches the semantic (equal, or a prefix
`x.*` with the semantic under `x.`) and whose `passes` include the pass or are absent; the winner is the most specific —
an exact semantic before any prefix, a longer prefix before a shorter. The sheet is **refused** when a pair has no
candidate, when two candidates tie at the highest specificity, or when one `derived` kind is placed in two slots of a
band. The result is §8.1 item 3's table, cached per style version. Shipped sheets: `{ slot: 5, semantic: 'way.*',
passes: [1] }` and `{ slot: 6, semantic: 'way.*', passes: [2] }` for way casings and bodies; exact pier, bridge-deck and
raised-deck entries in slot 14 outranking the prefix, and `way.stair` in slot 6's pass 3; one entry with no `passes` for a
river's casing and body in slot 7; and the sky's entries in every shipped sheet (`ink`, `lit`, `hatched`, `night` and the
parity presets) — `sky.island.land` slot 3, `sky.island.underside` slot 2, `sky.island.rim` and `sky.mist` slot 8,
`sky.island.shadow` slot 10, `sky.island.tether` slot 17, `sky.fall` and `sky.access.*` slot 19,
`sky.island.shadeStrip` and `sky.island.shadePending` slot 25, each with the per-family facts of V05 §5.1's slot table
(M6-sky; file f item 408). A CI test
loads every shipped sheet at every band (§8.3). A refused user edit is shown in the style dialog with each unresolved or
ambiguous pair and not applied; a `setStyle` event carrying a refused sheet fails its dry run with the conflict action
`invalid` (§7.1), so no document holds a sheet two loaders could order differently (J-R39).

**Presets — each family defines all four bands with invariant roles (VIS-9).** Detail is added band by band, never
re-coloured, and cross-fades over the band's hysteresis interval (α 0 → 1, §8.5). **Role continuity:** B-ZOOM checks mean
roof and mean ground colour ΔE2000 < 2 across every band switch within a family, from the milestone that ships the
family's four bands: `ink` and `lit` at M2b, the ink-family variants at M3b, `hatched` at M5 (§13.4, §16; N-23).

| family | city | district | neighbourhood | building (stage-3 hook) |
|---|---|---|---|---|
| **`ink`** (default; MFCG family) | figure-ground contract (§8.5), masses, symbolised walls / towers / gates, raised under-copy on (K06), the lighting model's cast shadows on in value only (§8.4; J-A68.81), casings `w + 2h` with round joins and caps, hairline furrows, quarter and district labels in letter-spaced small caps, grid, scale bar with old-style figures, 8-ray compass | footprints with thin outlines, yards by role, boundary treatments, every way stroked, way names, library crowns | ink close-up: ridge hairlines by the roof construction (`skeletonHip` by default), tapered ticks in ink at α 0.5 on the roof colour, cast shadows by the light pass (prism shadows at ink α 0.25 on the vector rung), cobbles as ink stipple, pins as ink symbols, every named way labelled | wings as ink outlines; the plan rung's storey (§8.5): walls by kind as hairlines (exterior at the outline weight, partitions at ½), openings as gaps with a door tick, windows as wall breaks, the stair core's flights, chimney squares, abstract furniture at ink α 0.5, room labels |
| **`lit`** (FTG family; second preset) | tinted pattern textures at city scale, flat roof tones, raised under-copy with a 2-px penumbra, filled corridors in `road` over `ground` | + `faceLight` on roofs, soft cast shadows (§8.4), hedgerow instances along field bounds, stone-patterned wall band with tower nodes, harbour basin tone with pontoon bars, water `ramp` and `foam` | + pre-shaded crowns per instance, depth-sorted trees, props | wings with per-face light; the plan as `ink`'s, the storey's floor in the roof's lit tone |
| **`hatched`** (NG family; the stage-2 close-up) | masses in the lit roof tone, ground = paper, the street stripe in `road`, wood fills | two-tone roofs by `fakeGablePerWing`; by `roofscape` once stage 3 registers (V02 §5.3) | hatching per roof facet of the sheet's roof construction at a world pitch (`StyleSheet.hatch`), each sloped facet's lines parallel to its eave and clipped to the facet (a gable or hip wing's parallel to its ridge), with two ridge tapers per ridge-bearing wing (15–20 triangles per gable or hip wing), one prism shadow pass, lobed crowns in two greens, large-tree pins under the buildings and block trees above them (item 58 (d)), chimneys, pin and ground-access symbols, road surfaces and modes, stepped ticks; its neighbourhood and building bands take V01 §5.1's order list (the `pins` and `trees` layers named; slot 8b retaining walls, the piers in slot 11, raised decks in slot 14 with their shadow pass before it, slot 12's stack order with tier shadows) (M5; file f item 405) | per-wing hatching; the plan as `ink`'s |
| `parchment`, `bw-print`, `night` | ink-family variants: parchment texture role, its plate chroma aimed at the median (above); monochrome; `night` — the `ink` family whose sheet opens the view at night (`LightingSpec.defaultLight`, §8.4 (e)), its `@night` roles and `glow` sprites on the vector rung | same | same | same |
| `painterly` (reserved; VG family for the village product) | colour ramps, water bands, relief tier on, spotlight vignette, selective outlining | same | same | same |

Faces follow §17.2 (the default label face, D-1); small caps and old-style figures come by §9.2's per-face path (N-12).

**Light by family (item 68; the model is §8.4's).** `ink` and `lit` are lit by the field model with the cursor sun by
default and cast shadows on (J-A68.81; J-C1): `ink` in value only (`mono`) and gently (ambient 1.3, so a day shadow on
open ground keeps roughly two thirds of its lit value — the ink family's shadow alpha 0.35), `lit` in colour (ambient
0.85); `hatched` by its own vector prism pass (`LightingSpec.model 'vector'`, §8.4 (g); the look of NG 1.2.2, §8.4 (h))
with its night glow (RIC-02); each family's night is its
day albedo under the night's light (its `@night` roles on the vector rung). The `MFCG` preset draws no cast shadow and
no light; the `FTG` preset draws FTG's sun, moon, weather rule and entrance window lights (§8.4 (h)).

**`lit` on the reference backend (VIS-7).** Every `lit` program — every mark of every family — runs on Canvas2D: the
lighting comes as a post operation over the Canvas2D base, never a second drawing path (§8.4; J-R4, J-A68.82).
Textures are `pattern` fills of greyscale seamless tiles tinted by the role colour (multiply); rungs 1–2 light them as
*Paint programs* states; on the vector rung lighting is `faceLight` per face
from stored geometry, one directional light from the sheet's sun (with a `path` sun, its light step, §8.4), and soft
shadows are `shadowPass` polygons
with `penumbraPx` — the shadow polygon plus two outward offset rings at ½ and 1 penumbra with α ⅔ and ⅓, vector, no
bitmap filter (avoiding Fantasy Manor's ≈ 90 % bitmap-shadow cost); canopy shading is baked into the crown sprites per
(style, light step) (§8.10); water depth ramp and foam are `ramp` and `foam` over the shore-distance field, per tile
(≈ 1.3 ms per 512² tile). Relief lighting across roofs and walls comes from the light pass and the surface layer's
normals; the programs draw no normal-map texture, and on the vector rung the style dialog says the light is per
face (J-R4). **Texture set** (our own, procedural: generated by
`plat/tools/textures/` in the product repository (§17.1 (3)) with fixed seeds; every file in `plat/assets/textures/`
names that script and its seed (§17.1 (5)); no third-party texture): tilled soil, grain, pasture, meadow, orchard
ground, marsh, sand, pebble, rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment
— 15 greyscale 256 × 256 px toroidal tiles (≈ 1 MB raw, ≈ 0.6 MB as PNG), metres per tile per band in the sheet; crop and
livestock variants of the arable and pasture tiles chosen by `LandUse.crop` and `LandUse.livestock` when present (VS27),
by the land-use kind otherwise; authored in M2b (≈ 1 person-week).

**Style constraints.** The contrast matrix; the option-interaction matrix test (no option silently disables another —
MFCG's Block mode dropping trees); every preset survives a render with no fills and one with no outlines (R13).

### 8.3 Symbol catalogue and draw-style census

**Catalogue.** Filled faces with hairline outlines; cased ribbons with square lane ends at kerbs; shore marks per bank
segment; repeated-offset shoreline bands; raised under-copies and prism shadows from heights; library crowns (§8.10);
clipped hatching at a per-face angle and tapered ticks; one composited shadow pass per layer; tinted pattern textures with
per-face light; field-raster ramps, hillshade and contour / hachure marks; curved per-glyph text with a role halo; a
point symbol for every `Pin.kind` of §2.7; screen-space furniture (§9.5); door ticks by entrance role, frontage-treatment runs and the passage arch (§8.2's rows;
items 19, 29, 30); trace hairlines, the vault hatch and the overrides of §8.2's `states` table; access-point symbols on
the ground layer (II.7.4); the change marker (§8.5); the Works programs — stakes, pits, scaffolds, roof frames, the
charred shell — and the underground systems' programs (item 65, 67; §8.2); the vector rung's glow sprite at each light
mark and the lit picture of §8.4's light pass (item 68); retaining walls, raised decks and piers, stair ticks and ramp
hairlines (item 110); the spring symbol (g item 111); the `occupation` symbol (V08 §5.2); each colour-coded category's
second cue (g item 112, §8.2). Every semantic visible at a band has exactly one registry glyph, from which the legend is
generated (O12 d).

**Draw-style census** (G-R2 / G-R18): a regression suite per preset, run on the golden suite (§13.3) and in B-ZOOM
(§13.4). **Order parity** (VIS-16): the reference's recorded order is a subsequence of the preset's, and every semantic the
reference never drew sits at a declared slot with a reason (§8.2's `OrderSlot`s).

| check | presets | pass |
|---|---|---|
| casing Δ = 2h on every ribbon, at every settled view | all | ± 0.1 px (hairline fidelity) |
| 0.5-px hairline ink coverage at 1× | ink | 50 % ± 10 % |
| round joins and caps | ink | ≥ 99.9 % |
| drawn wall, tower, road-core, gate-block and pier widths and the gate gap against MFCG at the matched scale (MFCG size 40, 0.816 px/m) | ink | within ± 15 % of 6.2 / 12.4 / 6.5 / 12 / 3.9 px; the gate gap = max(model opening, 1.2 × drawn wall) within ± 0.5 px |
| outline share of footprint pixels at the city band, default view, every rung | ink | ≤ 25 % |
| walls after buildings; wall-symbol pixels inside plots | ink | order holds; 0 pixels |
| order parity | all | subsequence and declared slots |
| draw order: the (slot, pass) sequence of every tile's draw calls, logged by an instrumented raster (N-7) | all | non-decreasing in the slot table, then in pass, in every tile |
| sliced rasters: per preset and band, the golden views' densest district- and neighbourhood-band tiles and a whole-CITY city-band view, each tile rastered by one `step(Infinity)`, by `step(1)` until done, and by `step(1)` with another tile's job, a furniture query and a band answer for districts outside the tile served between every two steps (§8.9) | all | pixel-identical in the three runs; logged (slot, pass, z, key) call sequence identical |
| sliced placement: per preset, every golden view's stop and the stop of an A2 300-dpi export of a golden CITY, S13b by one `step(Infinity)` and by one unit per step, with a furniture query, a raster step and a band answer for districts outside the view served between every two steps (§8.9, §9.2) | all | identical placement digests (§13.3) |
| light steps (the vector rung): a METROPOLIS view in `lit` on rung 3 with `prism` shadows and a `path` sun advanced one 1° step per frame across three light steps, then stopped, on a tier with shadow layers and one without, both at tile DPR 1 (§8.4, §8.8) | lit | after the stop every cached `under` and `over` (or `base`) tile carries the final light step; the two tiers' tiles equal outside the projected-shadow pixels; the view pixel-identical to a fresh render at the final sun |
| slot resolution by §8.2's rule | every shipped sheet at every band in CI; every sheet at load | 0 unresolved, 0 ambiguous; each `derived` kind in one slot per band |
| contrast matrix (§8.2) on the rendered city band | all | every pair present at or above its floors |
| text against its halo, every placed glyph (N-3) | all | the label floor (§8.2), halo role by §9.4's rule |
| foam on `quay` and `sheltered` shore segments | lit | 0 % |
| tree marks over a tier-1/2 casing at the city band | all | 0 pixels |
| casing pixels inside junction mouths on district boundaries | all | 0 |
| role continuity across band switches | each family | §8.2's bar |
| decoration stability over a city → neighbourhood → city sweep, for stamped classes (woods, gardens, parks, scatter) and `grid` (orchards) and `line` (avenues, hedgerows) classes (N-10) | all | each instance appears at most once and keeps its position; every coarser band's set is a subset of the finer's; an unchanged view re-renders pixel-identically |
| render-time keys: an unchanged model saved, reloaded and rendered, and derived in two district orders | all | tiles pixel-identical to the first render |
| render keys across seeds: two B-CITY-lite seeds per rung, every pair of entities with equal lineage hashes | all | the render keys differ for every pair |
| stamp tiles: the H128 of each (class, tile index) tile of the shipped asset — its points' cm coordinates and ranks in point-index order (§8.10) | all | as loaded in the generation and tile workers: equal to the stored value (PR tier; every session checks it too, §8.10); as rebuilt by `plat/tools/stamptiles/`: byte-identical to the shipped asset on the five engines (Node x86 / arm64, Chromium, Firefox, WebKit; nightly); a moved stored value is a view shift (§13.3) |
| stamp-tile seams: per stamped class, all 256 2 × 2 arrangements of cells drawing its four tiles (every ordered pair side by side in both directions, every corner), for the full point sets and each band's rank subset (§8.10's r < s_b) | all | 0 pairs of points in different cells closer than r₀ (an integer test on tile cm); `plat/tools/stamptiles/` refuses to write a failing asset, and the PR tier re-runs the check on the loaded asset |
| roof lines outside their footprint (the F-SKELETON plain downgrade) | all | 0 |
| per wing, `hatched` | hatched | 15–20 hatch triangles per wing, counting the two filled tapers laid along the ridge, each 30 to 50 per cent of its length (item 58 (e)); no ridge stroke; outline = footprint only (NG BG-3; N35) |
| two-tone roof law with our palette | hatched | dark = lit × lerp(ambience, shadow, α) within ± 0.02 (IMP-15) |
| water bands | painterly | band widths follow W · (i / N)^1.5 for our N and W within 1e-4 |
| label floors, counts, collisions | all | §9.4 |
| street-edge recoverability, access ways drawn | ink | §8.5 |
| states: every (kind, state) pair that §2.8's ladders, `Building.condition`, `SkyIsland.state`, `Enceinte.supersededBy`, `Enceinte.condition`, `RetainingWall.state`, the raised parts' and decks' conditions and `Passage.sealed` can produce — other than the undeclined defaults (`kept`, and the Existence values `generated`, `built`, `altered` and `converted`), which draw the entity's own programs, and `demolished`, a tombstone that is never drawn — resolves one `states` row (§8.2) per band the kind is drawn at, in every shipped sheet (CI, and at every sheet load) | all | 0 unresolved; a golden TOWN converted by hand once through every building, wall, gate and passage conversion of §4.11 draws those kinds' rows, and a hand-built CITY fixture holding one tunnel, one island record, one retaining wall and one raised way with a deck plot in each state (§2.7's schema) draws their rows until their stages register |
| hidden courts (item 30): on B-CITY-lite seeds whose hidden share is > 0, every court face reached only through a passage (§4.6), at the city band | ink | drawn in `ground` under its block's masses and enclosed by drawn masses or outlines on ≥ 3 sides; 0 hidden plots drawn as `road` or `paper` voids; §8.5's figure-ground metrics within 0.01 of the same seeds at hidden share 0 |
| knowledge (item 30): a golden CITY rendered at the `public` tier and at `secret` under the shipped `knowledge.admit` rows (§9.2), with no thematic row and with a `use`-keyed one (§8.2) | all | with no theme the base tiles pixel-identical, with the `use` theme differing only on the marks of places `public` does not admit, which draw unthemed; the composed tiles differ only where label glyphs lie; at `public` no glyph run of a `local` name at the city or district band, none of a `secret` name above the building band and no legend key of a withheld use; each tier's per-stop placement digests equal §13.3's |
| entrances (item 29): the golden views' district-band tiles | all | exactly one `main` tick per building, placed where §2.6's rule 1 puts it (its frontage, the court or path from the plot's street gate, or a hidden plot's access face); every `side` or `rear` tick on an access edge of its plot beyond the frontage, every `yard` or `service` tick facing a yard or court part of its plot (§2.6's rules 2–3) |
| change markers (item 28): B-ZOOM over a document holding three `stale` rungs (a designation change, a re-let, a dossier event) | all | a marker at every band for each stale building and one for its district at the city band; none after the click; the base tiles unchanged by the marker |
| plots-only view (item 28; §8.5): the golden views at the city and district bands with `plotsOnly` on | all | every plot boundary drawn, 0 building marks; the default view's base tiles pixel-identical once the key is off |
| passages (item 30; §8.5 (2)): B-CITY-lite seeds whose hidden share is > 0, every passage with a `frontBuilding` | ink | at the city band the span ring of every base wing that spans it (§8.5 (2)) inside its block's mass (0 `ground`, `road` or `paper` pixels over any); at the district band its floor in `road` with an arch glyph at each end, drawn closed where `Passage.sealed` |
| passages left uncovered (item 30; §8.2's row; §2.6's `BaseWing.spans`): B-CITY-lite seeds whose hidden share is > 0, every front building over a passage cleared by hand (`clear`), then each clear undone | ink | while a passage has no `frontBuilding`, no span mark over it in any band's mark table and no arch glyph at any band, its floor in `road` at the district band; after the undos every tile pixel-identical to the render before the clears |
| the plan draw (item 28; §8.5, §8.6): every B-PLAN fixture of §13.2, building band, `ink` and its `night` variant | all | every drawn room label inside its room's ring at a cap height within §9.4's room-label range, a room left unlabelled only where its label does not fit at the range's bottom or where it is a structural face (a stack, a shaft, a column; V03 §2.4; file f item 482), and 0 S13b glyphs over one; one light per lit room, at its spine summit, and none in an unlit room; one stack per `Chimney` and no decorative chimney on the building |
| roof by band (items 19, 23; §8.2): the `lit` default sheet on a golden CITY, textures off | lit | each building's roof tone, read through the pick buffer, is its prosperity band's row; every row passes the contrast matrix's `building` pairs |
| raised under-copy by class (item 54; §8.2's symbolisation row): a golden TOWN holding houses, landmarks and a farmstead | ink | each footprint's under-copy offset = the base offset × its class row's ratio (house 1, landmark 2, farm building 0.6) within ± 0.1 px before the clamp; the same offsets by day, at night and on every rung |
| palette targets on the measurement render (item 69; §8.2) — the check; the gate is §13.4's B-ZOOM bar | ink, lit, hatched | paper luma 226–244 and warmth 20–50 (at 36 ± 2 for the shipped values); darkest-0.5 % luma ≤ 45 and warmth 15–25; plate chroma 18–70, `ink` 20–30 |
| lighting, one spot lit from every side (item 68; §8.4 (c)): a caster at the centre of four equal lights at its four sides — the receipt's three fixtures (4 × 4 m casters 6 m and 4 m tall, a 6 × 6 m caster 8 m tall) — night, CPU reference | ink, lit | at every ground pixel within the lights' radius outside the caster the summed visibility-weighted term ≥ 0.5 of the unoccluded sum — the lights the caster does not block carry at least half of every such pixel's light (`docs/validation/bench/amendc_repair_rendering_r1_light.out` (A): worst 0.60) — so no dark shadow; each light's own term alone shows the caster's shadow away from it |
| lighting, a shadow never climbs a taller roof (item 68): a 4 m hovel beside a 30 m tower, the sun at 64 azimuths × 3 altitudes and the cursor sun at 100 pointer positions, CPU reference | ink, lit | 0 pixels of the tower's roof whose sun term the hovel lowers |
| lighting, the shadow on a lower roof is shortened by that roof's height (item 68): the same fixture | ink, lit | where the tower's shadow crosses the hovel's roof, its tip lies at the similar-triangles position — d × (h_tower − h_roof) ÷ (H − h_tower) past the tower for a source at height H and ground distance d, (h_tower − h_roof) × cot(altitude) for the fixed sun — within max(1 px, the diagonal of §8.4 (c)'s floor cell at that distance), and it continues beyond the hovel onto the ground |
| lighting, the cursor sun (§8.4 (d)): 200 pointer positions and `sunHeight` 1, 4, 64 on a golden TOWN | ink | every caster's shadow tip at d · h ÷ (H − h) beyond the caster — d · H ÷ (H − h) from the sun's ground point G, d the caster's distance from G — within max(1 px, the diagonal of §8.4 (c)'s floor cell at that distance); wherever \|G − V\| > D, the largest angle between two casters' shadow bearings ≤ 2 · asin(D ÷ \|G − V\|) + 0.1° — the angle the view subtends from G, which falls as `sunHeight` rises (`amendc_repair_rendering_r1_light.out` (B)); nearer, the shadows are radial and the bearing bar is void |
| lighting, long shadows across tile lines (item 68; §8.4 (c)'s window): a 45 m tower and a 20 m house at the 1:500 stop, tile DPR 2 and 1, under the fixed sun and a 15° path sun, each rendered with the tile grid offset by 0, ¼, ½ and ¾ of a tile side, CPU reference and GPU pass | ink, lit | the shadow's start on the caster's centre line (V = 0.5) within max(1 px, the diagonal of §8.4 (c)'s floor cell there) of the similar-triangles point h ÷ (m − σ ÷ 2) past the caster's near face, lengthened never shortened, identical at all four offsets — no step at any tile line (`docs/validation/bench/amendc_repair_rendering_r2_traversal.out` (1): the law's start within 1 px of the exact texel law's, which lies within 1 px of that point; +13 px against a 16-px cell at 169 m, and at most the cell's diagonal under a diagonal sun — 1.33 × its side under a 15° sun, `amendc_verify_rendering_r2_diag.out`) |
| lighting, narrow casters (item 68; §8.4 (c)'s traversal): towers 2, 6 and 12 m wide and 30 m tall under a 15° path sun at the 1:500 stop, tile DPR 1 and 2 | ink, lit | one unbroken shadow along each tower's axis with no lit pixel inside its similar-triangles shadow (receipt (2)); across the shadow at distance t, its width within one floor cell's diagonal per side of the caster's (receipt (3)) |
| lighting, a mountainous site (item 68; §8.4 (c), §8.8's first ring and ring blocks): a golden CITY whose site request is `mountainous` with a hill primitive whose top stands 3 000 m over the datum inside its frame (§4.2 S1), the view at the 1:500 stop in the valley on the hill's shadow side at tile DPR 2 and 1, under a 15° path sun and one at 7°, the tile grid at offsets 0 and ½ of a side, CPU reference and GPU pass; and an A2 300-dpi lit export of the view's area at the 1:500 scale | ink, lit | the hill's shadow edge across the view at its similar-triangles position within max(1 px, the diagonal of §8.4 (c)'s floor cell there), identical at both offsets and equal to a CPU-reference render with every level held everywhere (no blocks; `amendc_repair_rendering_r3_blocks.out` (1)); every block cell equal to that cell in a pyramid built at any band, the city band carrying every caster at the heights its band draws (§8.1 item 2); a building of two base wings — a 10 m hall and a 30 m tower — two rings outside the view at the building band (and, from their stages, a composed building and a close-up's caster), its shadow in the view identical before and after a pan brings it into the first ring; first-ring positions and blocks within §8.8's counts, their memory within B; the GPU pass within §13.4's tolerance of the reference; the lit settle within §12.5's bound, or its pre-decided fallback taken and reported; the export within §12.7's lit-export bound, its window within §8.8's, its shadow edge where the view's reference render puts it |
| hand lantern (item 68; §8.4 (b), (f)): the underground layer of a golden CITY at the depth band holding a tunnel with frontage plots (§8.4's default band), `handLantern` on at nine pointer points and off, CPU reference and GPU pass, and each export of that view | ink, lit | the GPU within §13.4's tolerance of the reference, which evaluates the lantern by §8.4 (c)'s law at each given pointer point; 0 lit pixels from the lantern's term beyond its radius (§8.4 (b)) of the pointer's floor point; with `handLantern` off, every pixel equal to the render without it; no lantern term in any export |
| island shadow (item 68; §8.4 (a), (c); II.6): a hand-built island record 100 m above a golden TOWN whose highest roof is ≈ 40 m, `ghost` occlusion, the fixed sun, the view at the 1:500 stop with the island inside it and again two rings outside it, CPU reference and GPU pass | ink, lit | the shadow's near edge at the similar-triangles distance past the outline within max(1 px, the diagonal of §8.4 (c)'s floor cell there), equal in both placements, the GPU within §13.4's tolerance |
| lighting, which sun draws (item 68; §8.4 (d)): a golden TOWN in the `FTG` preset with a viewer's `sunMode` `cursor`, and in `ink` under each of the three modes, each with a pointer, without one (a still, an export, a touch screen's first map) and on rung 3 | FTG, ink | `FTG` draws its fixed or path sun whatever the key; `ink` the viewer's mode; with no pointer, and on rung 3, `fixed` — each render's tiles equal to a render at the mode §8.4 (d)'s rule names |
| lighting, the sheet's default light (item 68; §8.4 (e)): a viewer whose view state holds no `light` value choosing the `night` preset as its `stylePreset`, then setting `light` to `day`; and a document drawn in its own `night` style opened by such a viewer | night | the view opens at night (its tiles equal to a render at `light` `night`); the viewer's `day` holds after the change and after its view state is reloaded; every other shipped sheet opens at §2.9's `day` |
| post operations after the light (item 68; §8.4 (f)): `greyscale`, `sepia`, `wash`, `pixelate` and `dotScreen` on a golden CITY at night under coloured point lights — a rungs 1–2 view against the CPU-reference export of the same frame, and on rung 3 | ink, lit | base pixels grey (R = G = B), sepia or washed after the light, the view within §13.4's tolerance of the export; label, halo and overlay pixels equal to the render without the operation; the cell operations' cells on each tile's own grid, weighted as §8.4 (f) states, in view and export alike |
| item 110's marks (the second known-city fixture of §13, M3a): its retaining walls, raised way and aqueduct, stairs, ramps, deck plots and stepped temple at every band in `ink` and `lit`, day and night, on every rung | ink, lit | every retaining wall drawn with its low-side ticks and a shadow on its low side only; every raised deck over the ways it crosses (0 junction marks where they cross) with its piers in slot 12; each tier of a stepped building its own shadow (rungs 1–2: a shadow on the tier below from each tier's eave; rung 3: one prism per tier); every stair or ramp interval drawn by `way.stair` |
| colour-deficiency variants (g item 112; §8.2): every shipped sheet with a colour-coded row, each of `protan`, `deutan`, `tritan`, at a legend-bearing stop and in each thematic view | all | every category pair a legend distinguishes passes §13's style check in the variant; each category's second cue drawn; the default view's tiles pixel-identical with `cvdVariant` `none` |
| light-map keys (item 68; §8.4 (f), §8.8): a lit view of a golden CITY at night holding a concealed front and a secret access, through `plotsOnly`, `depthBand`, a model-layer toggle and a knowledge-key change, each toggled on and then off | all | after each toggle every lit tile equal to a fresh render of that view state; a pointer move or a zoom inside a stop re-bakes no light map (counted) |
| lighting, CPU reference and GPU pass (item 68; §6.5 (9), §13.4): the golden views, day and night, fixed sun | ink, lit | the CPU reference byte-identical on the five engines; the GPU pass within §13.4's tolerance of it on the reference and low-end devices |
| lighting, the fallback ladder (F-LIGHT): each golden view forced onto each of the three rungs in turn, plus a lost GPU context mid-pan | all | a frame on every rung; the rung counted in the telemetry; no error; the model digest unchanged |
| lighting, night legibility (item 68; §9.4): the golden views at night | all | every placed glyph's text / halo pair at the label floor, read from the rendered pixels (labels composed after the pass) |
| night light by the rows (item 68; §4.7's light table; T68 schedules it): B-CITY-lite seeds at night, CPU reference | ink | the ground illuminance at every 2 m sample along each lit way's centre line ≥ its row's target at the way's band value; 0 lit pixels on a hidden or clandestine plot that no row lights |
| Works stages (item 67; §8.2's rows, §8.1 item 7): a golden TOWN with one Works of every kind — a `repair` begun on a `collapsed` building among them — scrubbed week by week forward and back through its span | ink, lit | every (kind, stage) other than `before` and `finished` (§8.2) resolves one `states` row, and each decay stage the repair passes draws that row with the `repair` row's `scaffold` laid over it; the tiles at a week byte-identical whether reached directly or by scrubbing; a pending plot line dashed until its clearing stage |
| informal clusters (item 70; §8.5 (2)): B-CITY-lite seeds whose shanty districts hold clusters, city band | ink | every structure ≥ 1 `building` pixel or a settlement dot; the footpath web in `ground`; 0 masses closed across a footpath; no cluster plot left as a blank block |
| concealed parts (item 63; §9.2): a golden CITY with one front of each mode, at the `public` tier and at `secret` | all | at `public` 0 pixels of a concealed room, the concealed entrance's tick, a concealed access point or link at every band, the building's mass and public parts drawn; at `secret` all drawn; the base tiles otherwise pixel-identical |
| concealed parts at night and underground (items 63 (c), 64, 68; §8.1 item 7): the same CITY with one secret access — its shaft and a lamp at its foot — at the `public` and `secret` tiers, night, the underground layer shown at the access's depth band, CPU reference and GPU pass, and each tier's `.dd2vtt`, glTF and GeoJSON exports | all | at `public` every pixel equal to the render with those hosts' lights removed — 0 pixels lit by a concealed or secret host's light, glow or shaft — and no such light in any export; at `secret` the lights drawn and exported |
| access points and the underground systems (items 64, 65; §8.2's rows, §8.4's depth bands): a hand-built CITY fixture holding one access of each state, one gallery and chamber of each system and one link of each kind, the underground layer shown at each depth band | all | every (kind, state) resolves one row; a crossing of two parts drawn with the deeper one's trace under the upper; 0 pixels of a `secret` link or access at `public` |

### 8.4 Layers, shadows, heights

* **Layers** draw in `zOrder`: `underground` marks (sewers) through a cut-away mask or a translucent overlay; `sky`
  marks above, their shadows projected onto the ground layer. Occlusion policy (VIS-17):

  ```ts
  interface LayerSpec { id: Layer; zOrder: number; elevationCm: Cm; visible: boolean;
    castsShadowOnto?: Layer;                // rung 3: the layer whose base this layer's projected shadows are composited into (the sky's onto the ground); absent: its own
    exportSeparately: boolean;              // read by §11.1's layered exports (its *Layers* rule)
    showCircuit?: boolean;                  // the wall layer: each committed enceinte's barrier-closed arcs as a faint dashed line with anchor ticks (g item 106 (g)); off by default; V09 §5.4 (M3a; file f item 413)
    underView?: 'cutaway'|'overlay'|'solo'; // the underground layer: the ground ghosted beneath, the ground at full, or the underground alone; default cutaway (M6-U; file f item 413)
    occlusion: 'opaque'|'ghost'|'offset';   // how a sky layer treats the ground it covers
    ghostAlpha: number;                     // ghost: the covered ground shows through at this share (default 0.35)
    offsetPerMetre?: [number, number] }     // offset: the layer drawn displaced by elevation × this screen vector (default [0, 0.25] px per m, up the screen), tethered to its ground footprint
  ```

  `opaque` hides the ground beneath; `ghost` (the default for `sky`) draws the layer at alpha 1 − g so the covered
  district stays readable; `offset` moves the whole layer clear of its footprint. Island placement is §4.2 S1 (2)'s,
  `SkyIsland.placement`'s (§2.7) and II.6's; B-ZOOM reports the ground area sky layers occlude. The island generator is
  owner-staged; these fields are its hook. **The underground layer is one layer over several systems (item 65; II.7.6; J-A65.81):**
  the sewer network in arena part 0 and each other system — catacombs, caverns, quarries and mine voids, vaults, a
  buried old town, dug passages — in its own part, the undercity in the part of its void (II.7.5), so their topologies stay apart while the view draws them as one layer: every item of every
  part is grouped into the depth bands of `depthBandCm` by the band that holds its floor, the cut-away draws the chosen
  band in full and the items of the bands directly above and below it as `trace` hairlines at α 0.5, and inside one band
  a shallower item draws over a deeper one (`z` by `elevationCm`). Where two parts cross in plan, the crossing therefore
  reads over and under — the upper passage drawn, the lower one's trace passing beneath it — and every link between parts
  (`UndergroundLink`, II.7.6) draws at its own depth with its kind's row (§8.2's `states`).
* **Toggles are visibility; existence is model** (the rule's home is II.7.1 and II.6; J-A12.81): the sewer control and
  the island toggle set `LayerSpec.visible`, so hiding a layer changes no digest. The per-viewer view key
  `showUnexcavated` (§2.9) draws unexcavated voids for a key that admits them (file f item 413; the `unexcavated`
  program, §8.2). The `underground`
  layer is hidden by default at every rung; when shown, the cut-away or overlay draws one **depth band** at a time
  (`depthBandCm`, II.7.3): the per-viewer view key `depthBand` (§2.9) names it, default the shallowest band holding a
  tunnel with frontage plots, else the shallowest tunnel; every underground entity's `elevationCm` is its depth below the
  datum (§2.1, II.7.3), and a tunnel, cell or vault is drawn — and exported, §11.1 — on its own level, the band that holds its
  floor, `z` ordering the bands across the underground layer's parts (§2.1's `PlatKey`, one arena each in §3.4). The `sky` layer's `visible` shows the islands a
  settlement has; a waning or settled island keeps its lowered `elevationCm` (II.6), so its shadow falls from its lowered underside (the
  lighting model's slab, below) and §8.2's `states` row lowers its alpha. A hidden layer's lights and casters are not
  drawn and light nothing on the visible layers, and they still exist (J-A12.81, J-A15.41).
* **Two different things (K06).** The **raised under-copy** (`raised`) is MFCG's Raised: a dark copy of each footprint
  beneath it, swept by an offset read from a class row (§8.2's symbolisation row; item 54) — ON by default in `ink`; not a shadow and not sun-dependent, so it is drawn identically by day, at night and on every
  rung of the ladder below. **Cast shadows** are the lighting model's (below): height-derived, the absence of one
  source's light.
* **The lighting model (item 68; owner: "a daytime view is the default. the global light is the cursor" … "shadows
  are gradients affected by light sources"; underground: "they don't have the sun or moon").** One model, stated here; its view keys are §2.9's (`light`, `sunMode`, `sunHeight`,
  `handLantern`, with their controls in §7.8), its records §2.7's (`LightSource`), its placement §4.7's light table, its
  failure row §5.2's F-LIGHT, its determinism §6.5 (9)'s and its budgets §12.5, §12.7 and §8.8's.

  ```ts
  interface LightingSpec {                // StyleSheet.light (§8.2)
    model: 'field'|'vector'|'none';       // field: the light pass (every rung of the ladder below); vector: rung 3 by the sheet's own choice (`hatched`); none: no cast shadow and no light (the `MFCG` preset)
    castShadows: boolean;                 // the one switch for the global light's shadows: true in every shipped family, false under the `MFCG` preset (J-A68.81)
    mono: boolean;                        // light changes value only, never hue: true in `ink` (its restraint, J-R3), false in `lit` and `hatched`
    sun: SunSpec; moon: MoonSpec;
    ambient: { day: number; night: number; underground: number };   // the sky's light relative to the global light's direct term on a surface facing it — by day ink 1.3, lit 0.85, hatched 1.05; at night 0.10; underground 0.02 (own)
    occlusion: { radiusM: number; strength: number };               // ambient occlusion from the surface: 6 m, 0.5 (own)
    bounce: { radiusM: number; share: number };                     // the indirect spill: 4 m, 0.15 (own)
    exposure: { nightLux: number };                                 // E_key at night and underground: 2 lx drawn at the albedo's full value (own); by day E_key is derived, (c)
    defaultLight?: 'day'|'night'|'time';                            // the `light` key a viewer takes when this sheet becomes its drawn style, (e): `night` in the `night` preset; absent in every other shipped sheet
    vector: { projected: 'drop'|'prism'; penumbraPx: number } }     // rung 3's look, and `hatched`'s own at every rung
  type SunSpec = { mode: 'cursor'|'fixed'|'path' /* the family's default */; admits: ('cursor'|'fixed'|'path')[] /* the modes a viewer's `sunMode` may choose, (d): all three by default; a parity preset only its own */; azimuthCdeg: number; altitudeCdeg: number /* the fixed sun: 31 500, 4 500 */;
    heightRatio: number /* h₀ of the cursor sun: 1 */; discCdeg: number /* the apparent radius: 27 */; colour: Color; intensityLux: number /* 100 000 */;
    latitudeDeg: number /* path mode; the view's default is the latitude in force — the recipe's `Intent.latitudeDeg` (g item 102; DR29), else 50 — while the model-side sampler reads the recipe's latitude itself (§4.5) (file f items 296, 391) */ };
  type MoonSpec = { colour: Color; intensityLux: number /* a full moon: 0.25 */; phase: { at: number /* 0 new … 0.5 full … 1 */; factor: number }[] /* interpolated */; discCdeg: number /* 26 */ };
  ```

  (a) **The surface.** The tile worker rasters, beside each tile's base, a **surface layer** from the same marks
  (§8.8): per pixel the surface normal, its height above the tile's datum (the tile's lowest terrain sample) and the
  unlit coverage (below). Its writers: terrain `field` marks (height and normal from the field); roofs as surfaces from
  the roof construction of §8.6 — eave, ridge and the construction's own faces, never the straight skeleton directly, so
  §3.8's readers stay three (J-A28.32, KERNEL-C05); flat roofs, walls, towers and gatehouses as the tops of their prisms;
  bridge and pier decks at `deckCm`; tree crowns as domes to their crown height (the top-down view never shows the
  ground beneath a crown); water at its level; a building under Works at its stage heights (`heightsAt`, §4.11; item
  67); a retaining wall as the top of its prism at its high side's level (its step from `stepProfile`, §2.7); raised-way
  piers as prisms; on the underground layer each floor, its walls and its ceiling. **The slab list** holds what a single
  height per pixel cannot — a caster whose covered ground the view draws: a sky island, under every occlusion mode, as
  its underside's tiers (V05 §3.9), each a slab (M6-sky; file f item 415), the span marks of a building over a passage
  (§8.5 (2); their `baseCm` column the underside), a bridge or pier deck over drawn water and a raised way's deck over
  the ground (its soffit the underside; item 110 (b)) — each a **slab** of the document's slab list (§8.8): its
  outline, its top and its underside, so the ground beneath is shaded from above and lit from the side, and an island's
  shadow falls from its underside (J-A68.83).
  (b) **The sources.** The **global light** — the sun by day, the moon at night (`LightingSpec.sun`, `.moon`); the
  **placed lights** — `LightSource` records (§2.7), placed by §4.7's light table or by hand (`placeLight`, §7.1), each a
  `light` mark (§8.1) with its height, intensity (cd), radius, colour and flicker; the **derived lights**, never
  records (J-A68.72) — lit windows (`live.windows`, §8.2's live layers, by §10.3's rule at the view's hour and week), the
  room lights of the plan rung (building band, §8.5), and **light shafts** (II.7.3, II.7.5, II.7.6: every access,
  grate, well or opening that breaks the surface, a downward source at its underground end whose intensity is the
  current global light's × the opening's `areaM2` × its `lightTransmission` (V04's `UnderLayoutRule.openings`) × its
  direct-light visibility — the ground pass's shadow term at its `ground.at` under the current sun, every caster
  included, a sky island's slabs among them (V05 §5.3 (1)) — plus its sky-ambient share, a cosine lobe whose radius is
  its depth plus 4 m (M6-U; file f item 414: the render's shadow term only, never item 102's model share)); finally the
  **hand lantern** — the viewer's own light (`handLantern`, underground only, off by default: a 20 cd source 1.5 m above
  the pointer's floor point, radius 6 m), never a record. Every light lights only where its host draws (§8.1 item 7).
  (c) **Brightness.** At a pixel with albedo `A` (the base raster's colour in linear light), normal `n` and height `z`:
  L = A ⊙ (a · (1 − O) · E_g · c_g + Σ_s E_s · V_s · c_s + β · Spill) ÷ E_key. The sum runs over the global light —
  E = its intensity × max(0, n · l), no fall-off, since it stands for the sky's sun or moon — and over every point light
  whose radius reaches the pixel — E = I_s · max(0, n · l_s) ÷ d_s² × f(d_s ÷ r_s), the inverse-square law with the
  smooth cutoff f(x) = (max(0, 1 − x⁴))², so a light fades with distance and ends at its radius (the owner's "optimal
  distances and gradients of effectiveness"); `c` gives each source's colour; `a` the family's ambient share for day, night
  or underground; `O` the ambient occlusion — the mean over eight directions of the sine of the surface's horizon angle
  within `occlusion.radiusM`, × `occlusion.strength` (narrow alleys, courts and the foot of tall walls receive less sky);
  `Spill` = max(0, B(D) − D), D the pixel's direct sum (the Σ term) and B its blur over `bounce.radiusM` (three box
  passes, margin included), weighted by `bounce.share` — the indirect light that "also helps to illuminate": light
  bounced from lit surroundings into a darker pixel, nothing on uniformly lit ground and never a darkening; `E_key` by day
  is the illuminance of an unshadowed level surface under the fixed sun — E_g · (a + sin 45°), exactly, since such ground
  takes neither spill nor occlusion — so open level ground shows exactly its albedo and §8.2's palette targets hold on the
  lit map, a shadow there keeping a ÷ (a + sin 45°) of it before the spill's lift (≈ 0.65 in `ink`, the ink family's
  shadow alpha 0.35; ≈ 0.55 in `lit`; `docs/validation/bench/amendc_repair_rendering_r1_light.out` (C)), a surface near
  the cursor sun reading a little brighter; at night and underground `E_key` is
  `exposure.nightLux`. In a `mono` family the bracket's colour is replaced by its luminance
  (Rec. 709 weights), so light moves value and never hue. The result is encoded back to sRGB and clamped.
  **Visibility** `V_s` is found along the ray from the pixel toward the source, over the surface layer's heights and the
  slab list, the ray's height rising linearly from `z` to the source's height with slope m: V_s = clamp(min over the ray
  of (z_ray − h) ÷ (t · σ_s), 0, 1), with `t` the ground distance along the ray and `σ_s` the source's apparent size as a
  slope (the sun's or moon's disc; a flame's radius ÷ its distance). **The traversal** — one law, used alike by the CPU
  reference, the GPU pass and the light map's bake (J-A68.83) — takes that minimum over the surface as a field of
  constant-height texels, read through the **max-height pyramid** each surface layer carries (§8.8: level 0 its texels,
  each level above never lower than the four cells beneath it, up to one cell per tile, and beyond the view's first ring
  the **ring blocks**, whose levels continue above that; each tile's and block's heights raised by its datum, so every
  cell compares in one frame). A cell the ray crosses over [t_a, t_b] whose greatest height
  h_max lies above `z` bounds every value inside it from below by (z + t_a · m − h_max) ÷ (t_a · σ_s); the cell is
  **resolved** — that bound taken as its value — at level 0, where the bound is the texel's exact minimum, or at the
  **resolution floor** ℓ(t_a) = max(0, ⌊log₂(4 · t_a ÷ S)⌋), S the tile side (§8.8's world-aligned tiles at the stop and
  DPR drawn; for the point lights one level more on every host once §12.7's pre-decided bake fallback is taken), and is
  otherwise divided into its four cells. So a caster within half a tile side of the pixel is resolved to its texel and one
  at distance t to a **floor cell** of side at most t ÷ 128, its shadow lengthened by at most that cell's diagonal —
  √2 × its side (≤ t ÷ 90), the chord a ray crossing it corner to corner runs — and never shortened, the same length at
  every stop to within it. Evaluated front to back from the pixel, a cell whose bound
  cannot lower the minimum found so far is skipped whole, and the traversal ends at V_s = 0; neither changes the value,
  since no cell's bound exceeds its four cells'; the result is therefore the law's, whatever the order of evaluation, and
  every caster the ray crosses is met, however narrow (`docs/validation/bench/amendc_repair_rendering_r2_traversal.out` (2): one
  unbroken shadow behind towers 2, 6 and 12 m wide under a 15° sun). The ray runs to the **window** R: for a point light
  its ground distance from the pixel; for the global light the distance past which the ray clears the highest surface the
  document holds by t · σ_s, so no penumbra is cut — R = (Z − z) ÷ (m − σ_s), Z − z being the display list's
  `surfaceLayerTopCm` (§8.1) less the pixel's elevation, with m = max(tan altitude, ⅛) for the fixed and path suns (*Sun*'s cap
  of a shadow at 8 × its caster's height, below) and, for the cursor sun, m = (H − z) ÷ |P − G| toward its ground point
  G, R there at most |P − G| and |P − G| itself where m ≤ σ_s (P the pixel's ground point); the ray also ends where it
  leaves the list's `bounds` (§8.1), beyond which nothing is drawn. The window is a world distance, so a shadow crosses every tile
  line at its similar-triangles length and never depends on the tile grid (receipt (1): the start within 1 px of the
  similar-triangles point on every grid offset, the floor adding at most its cell's diagonal — 1.33 × its side under a
  15° diagonal sun, `amendc_verify_rendering_r2_diag.out`). Each slab whose shadow sweep — its outline swept away from
  the sun from (underside − z) ÷ m to (top − z) ÷ (m − σ_s) — crosses the ray's plan is tested exactly by its outline
  over that reach, whatever R is, and a tile culls the slabs whose sweep's bounding box misses it (V05 §5.3 (2); file f
  item 416). R, the floor and the resolved cells depend on the source, the pixel and the surface
  only — never on the device, the rung, the frame time or the view's extent, and never on where a cell is held (a visible
  tile's pyramid, a first-ring position's or a ring block, §8.8), since each is held from a level at or below the floor
  it serves and every level is a greatest height by one rule (`amendc_repair_rendering_r3_blocks.out` (1): 0 of 672
  pixels differ from the law over a pyramid held whole, a 3 000 m hill under a 7° sun among them) — so the CPU reference
  and the GPU pass resolve the same cells and differ only by the GPU's arithmetic and the encoding of the surface, its
  pyramids and the blocks, which §13.4's tolerance bounds; §12.5 and §12.7 cost this traversal and restate none of its terms. So a
  **shadow is one source's absence** and a gradient, never one shade: its edge softens with the source's size and
  distance; a spot every side of which other lights reach has no shadow; the spill lifts a shadow from its lit surroundings, a narrow one most. And it is
  **height-aware** (the owner's point 4): a tall caster's shadow falls on a lower roof wherever the ray from that roof
  passes below the caster's top — shortened there by that roof's height — and continues beyond it onto open ground or the
  neighbouring building; a lower caster's shadow never climbs a taller neighbour, whose roof's rays pass above it; the shadow's
  length follows the source's height and distance.
  (d) **The cursor sun** (`SunSpec.mode 'cursor'`, the default; the owner: "the cursor moves the global light which
  creates different angles for every shadow"). With `V` the view centre on the ground, `D` the view's half-diagonal in
  metres, `C` the pointer's ground point, u = C − V and s = `sunHeight` (≥ 1; default 1), the sun stands at
  G = V + s · u, height H = max(h₀ · D · s, 1.5 × the list's `surfaceTopCm` above the view's ground whenever the sky layer
  is visible and the document holds an island that is not fallen, whatever is in view) (h₀ = `sun.heightRatio`; the
  floor V05 §5.3 (4), M6-sky). At s = 1 it stands over the pointer, and every caster's
  shadow falls straight away from it; a caster of height h at horizontal distance d from G throws its tip to
  d · h ÷ (H − h) beyond it (similar triangles), capped where the view ends when h ≥ H. As `sunHeight` rises the sun
  recedes along the line from `V` through `C` and rises in proportion, so the shadows turn from radial toward parallel,
  the pointer then setting the sun's bearing (from the view centre toward the pointer) and its elevation
  (atan(h₀ · D ÷ |u|)) — "very high: nearly parallel, realistic; lower: dramatic and radial". **Which sun draws** (one
  rule; J-A68.84): the sheet's `SunSpec.mode` is the family's default and `SunSpec.admits` the modes it offers — a parity
  preset admits only its own, the `FTG` preset `fixed` and `path`; the per-viewer `sunMode` (§2.9) chooses among the
  admitted modes, and a value the sheet does not admit (the key's `cursor` default under the `FTG` preset) draws the
  sheet's `SunSpec.mode`; a drawn `cursor` sun where there is no pointer — the first map, a touch screen, every export, a
  still, a headless render — or on rung 3 is `fixed` (`SunSpec`'s fixed sun). The pointer is a transient input,
  never stored, logged or hashed (§6.2). Because H scales with the view, a zoom changes the on-screen shadow lengths of
  the radial sun; the lengths of the fixed and path suns never depend on zoom (J-A68.84). The **moon** follows the same
  geometry at the night view's intensity and colour, its intensity × the `phase` row's factor at the phase of the drawn
  week and the `time` key's day on a 29.53-day cycle from week 0 (our stylisation).
  (e) **Day and night.** The per-viewer key `light` (§2.9): `day` (the default) — the sun; `night` — the moon and every
  point light, the scene dark but for them; `time` — day or night by the path sun's altitude at the `time` key, night
  below −6°, the two blended over −6° to +6°. A sheet may carry `LightingSpec.defaultLight`: when that sheet becomes a
  viewer's drawn style — chosen as its `stylePreset` (§11.3), or the document's own style opened by a viewer whose view
  state holds no `light` value — the viewer's `light` key is set to it, a view change like any other that the viewer can
  change back; so the `night` preset opens at night and §2.9's `day` default stands everywhere else. By day point lights contribute nothing on the ground and sky layers (a lamp
  post stays a symbol). **Underground there is no global light at any setting** — the ambient is `ambient.underground`
  (near zero) and every lux comes from the point lights, the shafts and the hand lantern, dense in the undercity and
  around the dwellings below ground by the light table's underground rows (§4.7; II.7.3, II.7.5). How much light a night has is not a style value: it
  is the light table's rows (§4.7) with the era, `magic` and prosperity rows, so rich streets and magical districts are
  lit and poor alleys and hidden courts stay dark.
  (f) **The light pass** — one function with two implementations (J-A68.82). It is a **post operation over the base**
  (slots 1–20 of §8.2's order; what it never lights is §8.2's layer-order rule), so the label floor holds at night
  (§9.4): the tile worker composes labels and `overlay` marks into the tile's
  one bitmap (J-R21) and writes their pixels' coverage into the surface layer's unlit coverage, and the
  pass leaves a covered pixel at its composed colour (lit ⊕ composed, weighted by that coverage). **§8.2's post operations
  run after the light** wherever it runs (J-A68.87): on rungs 1–2 the tile worker leaves them off the base it rasters and
  the GPU pass applies them to the lit base after the global term and the baked light; an export or still applies them
  after its CPU reference pass, band by band, before its labels are composed (§8.8); on rung 3, and under a sheet with no
  light, the tile worker applies them to the base after its marks. On every path they act on the base picture alone — a
  covered pixel keeps its composed colour — and a **cell operation** (`pixelate`, `dotScreen`) takes its cells on each
  tile's own grid from the tile's corner (a partial cell at its far edges where the cell does not divide the tile) and
  averages only the base in each, every pixel weighted by 1 − its unlit coverage — the tile worker and the CPU reference
  taking the coverage of the labels and overlays they will compose, the GPU the coverage the surface layer carries — and
  puts that average into the cell's uncovered share alone (J-A68.91); so a coloured light never re-colours a greyscale,
  sepia or tinted base, and a view agrees with a CPU-reference export of the same frame. The **CPU reference**
  runs in the tile worker for every export and still, the goldens and the tests, in float64 with its transcendentals
  through `dmath`, every sum in a fixed order — byte-identical on the five engines (§6.5 (9); J-A68.62). The **GPU pass**
  (WebGL2, WebGPU where available) is the main-thread compositor's (§8.9) for the interactive view and is held to
  the reference by §13.4's tolerance. The static lights and the occlusion are **baked** per tile into a **light map**
  (the Σ over point lights of their terms with their visibility, and `O`) by the tile worker, once per **light-map key** (§8.8): its tile's surface key — §8.8's base key, its content version
  taken over the tile dilated by the largest radius among the lights that reach it — plus the revisions of the `light`
  marks reaching the tile, the drawn week, the drawn hour and the `light` key, so a view switch or an edit that changes the
  surface a light's traversal reads or the lights that draw (a model-layer toggle, `plotsOnly`, `storey`, `depthBand`, the
  knowledge key while a concealed mark, a mark drawn only for a key that admits it or a light whose host is either lies in
  the dilated tile, §8.1 item 7) re-bakes it — a light entering a tile's bake only when its
  radius reaches the tile, its traversal reading the surface of the tile dilated by that radius — so thousands of torches
  cost only what is on screen. Per frame the global light's term — and, underground with `handLantern` on, the hand
  lantern's, a point light by (c)'s law and traversal over the pixels within its radius (J-A68.92) — is evaluated on the
  GPU over the visible tiles' surface layers and pyramids, assembled into one view texture with the first ring's
  positions and the ring blocks round them that the global light's window reaches (§8.8), so a shadow crosses tile edges
  seamlessly; an export or still, which has no pointer, draws no lantern, and the CPU reference evaluates the lantern
  only at a pointer point a test supplies, by (c)'s law and traversal, as it evaluates the cursor sun for §13.4's
  stills (§8.3's hand-lantern row; J-A68.92). A fire light's **flicker**
  scales its baked term in the view by a pure function of its render key and the view's time (J-A68.61); the CPU
  reference draws it at its mean. A tile an island's drawn land face touches carries a second base and surface layer for
  the sky, lit by the same law at the island's true position and composed by the occlusion mode; a tile no island's land
  touches is re-lit where an island's shadow falls (V05 §5.3 (2); M6-sky).
  (g) **The fallback ladder** (F-LIGHT, §5.2; J-A68.85). Rung 1 — the GPU pass at the tile DPR; rung 2 — the GPU pass with
  the global term at half resolution, upsampled by the surface layer's normals and heights; rung 3 — the **vector rung**:
  projected shadows (§8.2's `shadowPass` program, `drop` or `prism` by `vector.projected`, `vector.penumbraPx`) from the fixed or path sun, the family's
  night role variants (`@night`, §8.2) with a `glow` sprite at each light mark, and the light step (below) for
  `faceLight`, the two-tone roof, `hillshade` and the crowns. A tier's rung is chosen at app start from §8.8's canvas
  budget and the measured frame time (§12.5), lowered at run time on a lost GPU context or three consecutive frames over
  the pass's budget, never raised mid-session; every change is counted in the view telemetry, never an error and never a
  model change; these are F-LIGHT's triggers (§5.2 cites them). **A tier whose GPU pass misses §13.4's tolerance** at its milestone transfers its surface layers at full
  precision — the height and the octahedral normal's two components in float32 with the unlit coverage byte beside them,
  13 B per pixel (3.25 MB per position at 512² instead of 1 MB) — and its pyramids, its first ring's heights and its ring
  blocks in 16 bits: whole centimetres above each one's datum, rounded up, 2 B per cell, the step widening to
  ⌈range ÷ 65 535⌉ cm only where one's range passes 655.35 m (§8.8 counts them in Q_f). The GPU then reads every height
  the reference reads to within one step — 1 cm wherever a range stays under 655.35 m — whereas one byte's square-root
  step, ≈ 0.67 m at 45 m, would move a far caster's shadow tip by that step × cot(altitude) (≈ 10 px at the 1:500 stop
  under the fixed sun). The traversal is unchanged, since the reference resolves the same cells ((c)); the tier is
  re-measured and, still missing, draws rung 3 (J-A68.85). Every export and still takes the CPU reference; an SVG draws rung 3's vector shadows, or with the export
  option `lighting: 'raster'` one embedded raster lighting layer from the CPU reference (§11.1). The `hatched` family
  draws rung 3 at every rung — its look is the prism pass of NG 1.2.2, below — while its night lights still come from the
  light marks.
  (h) **The parity presets and the families** (item 23; J-A23.71). `MFCG` — `model: 'none'`: the raised under-copy only
  (K06, above), no cast shadow, no night view and no light — our preset's behaviour, with no claim about the reference's
  (J-A68.86); `FTG` — the fixed or path sun and a low-intensity moon on the same path at night, one ambient term and the
  directional term only, and with it every shadow present only under `clear` or `snow` weather, and one window light
  at each lit building's main entrance (the anchor at which the FTG client as captured on 25 September 2026 draws its
  night lights, item 50; provenance `ref:FTG client (captured 25 September 2026) ambient-and-directional light (code)`, P22); `hatched` — the
  prism pass of NG 1.2.2, which offsets one shadow per wing by height against the light, shadows trees and pins the same
  way and multiplies them at the sheet's alpha, and at night an ambience wash with a glow per lit building (`ref:NG 1.2.2 prism shadow and night glow (code)`, P23); the stage-3 building band under the parity presets — the
  per-facet diffuse-and-specular shading from one light, with a swept-silhouette shadow, as Fantasy Manor build 890 draws it
  (`ref:FM build 890 facet shading (code)`, P24). No constant of
  those readings enters a cell. Every default row of ours — the field model, the cursor sun, the moon, the point lights,
  the ambient, occlusion and spill terms — carries the `extension` marker, so the parity presets switch it off.
* **Shadow casters** (WC5; the surface layer's and the slab list's writers on rungs 1–2, projected on rung 3): buildings and wings (prism from `baseCm` to eave and ridge, a wing's foundation skirt, §2.6,
  included; a building over a passage also casts its span marks, §8.5 (2) — each a prism from its wing's `baseCm`
  plus the passage's `headroomCm` to that wing's eave over its span ring, projected from its underside like a bridge
  deck), towers and gatehouses (prism), curtain walls (prism of the band), bridges and piers (deck prism over water),
  trees (crown offset by the crown height), sky layers (each island's underside tiers projected from their undersides,
  at rung 3 in the `prism` form whatever `vector.projected` says, V05 §5.3 (3)), retaining walls (a prism from the low
  side's ground to the high side's level, casting onto the low side only), raised ways (piers as prisms; the deck a slab
  projected from its soffit, like a bridge deck), a stepped building's tiers (each tier from its own base — the top of
  the tier below — so each casts its own shadow, onto the tier below and beyond; item 110 (c)); a building under
  Works casts at its stage heights (§4.11). On rung 3 every caster projects along the sun vector from its base elevation
  (`baseCm`, FTG-13) onto the ground; the ground under a footprint lies within FTG-13's plinth tolerance, so a flat
  projection from the base is exact to that tolerance — the height-aware receivers of (c) are rungs 1–2's. Rung 3's
  shadows are unioned per layer and composited once per layer per tile — into the base raster in `fixed` sun mode, into
  a per-tile shadow layer of their own in `path` mode where the tier's canvas budget admits it (§8.8), so a moving sun
  re-rasters only shadows. `drop` offsets each caster's footprint by height × cot(altitude) along the sun's azimuth;
  `prism` draws the swept prism; both from the same heights.
* **Sun (K05).** `SunSpec` (above; which mode draws is (d)'s rule): the `fixed` sun (light from the upper left); in
  `path` mode from `sunPath(latitudeDeg, dayOfYear, hour)` (solar declination and hour angle with `dmath`), driven by the
  view-state time (§2.9's `time` key; the simulation module's clock when it runs), the hemisphere following the latitude's
  sign. The same `sunPath` is the model's daylight sampler (§4.5 *Fields*, g item 102 (a)), evaluated at the site latitude
  on the model's fixed hours and never at the view's time, latitude or sun mode, so no view setting moves a model value
  (g item 102; file f item 296). Projected shadows
  read the path-mode sun quantised to 1° in azimuth and altitude (§8.8, N-8); every other program that reads the sun —
  `faceLight`, the two-tone `roof`, `hillshade`, the `lit` crown bake (§8.2, §8.10) — reads its **light step**, the
  path-mode sun quantised to 15° of azimuth and 5° of altitude — on rung 3 (on rungs 1–2, §8.2's *Paint programs*).
  Below −6° the view is night by (e). Shadow length is
  capped at 8 × height near sunrise and sunset for the fixed and path suns. Rung 3's shadows are vector with no
  shadow-resolution setting; rungs 1–2's are resolved by (c)'s traversal at the surface layer's resolution, to its floor
  cell beyond half a tile side (§8.8).
* **Budget (AM-3; rung 3).** Projected shadows cost ≤ 20 % of a tile's raster time (vector offsets, one union per layer;
  `penumbraPx` is two vector rings, not a blur). **Measurement:** M2b times it on METROPOLIS tiles with `prism` shadows.
  **Pre-decided fallback:** a rung that misses draws `drop` instead of `prism` (same heights, one offset polygon per
  caster), reported. **A moving sun (N-8):** in `path` mode one 1° step re-rasters and re-composes the visible tiles'
  shadow layers — ≤ 20 % of the view's settle raster plus ≈ 0.2 ms per tile, inside §12.5's settle budget — and a newer
  step cancels an older one's pending tiles (latest wins); on a tier with no room for shadow layers the step re-rasters
  the base tiles within the same settle budget. **Measurement:** M2b times steps on METROPOLIS views, one step per frame,
  on the reference and low-end devices. **Pre-decided fallback:** a tier whose step misses quantises the path sun to 3°
  instead of 1°, reported.
* **Light steps (rung 3).** When the path sun enters a new light step, a **light-step pass** bakes the `lit` crown sprites for it
  (§8.10), then re-rasters the visible tiles' `under` and `over` layers (or `base` on a tier without shadow layers) at
  that step, centre-out like a settle and within §12.5's settle bound, each tile swapped in when ready. A light-step pass is
  never cancelled by a newer light step: the newest waits and starts its own pass when the running one completes,
  skipping steps between, so the view reaches one light step within two settles; 1° shadow steps go on beside it (latest
  wins). Every raster of the view uses its **drawn light step** — the running pass's, or the last completed pass's —
  passed to each raster job as `TileRasterOpts.lightStep` (§8.9), so a tile exposed during a pass is rastered at the
  pass's step. Once a pass completes no tile keeps another light step, and tiers with and without shadow layers draw the
  same roof and crown tones (§8.3's light-step row). **Measurement (M2b, the moving-sun runs):** every light-step pass
  within the settle bound and the crown bake within §12.7's budget. **Pre-decided fallback:** in `path` mode `faceLight`, the
  two-tone roofs, `hillshade` and the crowns hold the sheet's fixed sun — only shadows follow the path — reported (J-R54).
* **Heights** are §2.6's (at a Works stage §4.11's stage heights), so the surface layer, the shadows, glTF and CityJSON
  agree (O17 g).

### 8.5 Level of detail, the city-band figure-ground contract, way selection, first map

**Bands.** **city** — water; block ground; footprint masses and landmarks; tier-1/2 ways cased and access-critical lanes
(below); symbolised walls, towers and gates; bridges; parks and greens ≥ 0.3 ha in `green`; wood fills; fields; quarter
labels (the city cut, §4.5, §9.4), water, major landmarks, gates. **district** — district names; footprints with
outlines, entrance ticks by role and frontage-treatment runs (§8.2's rows; items 19, 29); yards by role; boundary treatments; every way stroked; courts; greens; crowns; way names.
**neighbourhood** — the family's close-up (§8.2); every named way; addresses; pins; stage 2 composes here (§8.6).
**building** (entered at the stop nearest 1:700, §8.8) — wings and, once its plan rung exists (§2.6; item 28), the floor plan one storey at a time — the
per-viewer view key `storey` (§2.9) names it, default the ground storey, a basement or an upper storey by choice, the
other storeys' wing outlines faded beneath it — with walls by kind, openings and every entrance's door (§2.6's entrance
set), windows, the stair core, chimneys, abstract furniture by room role, room labels and lights (below; §8.2's presets) —
a clandestine building's concealed rooms, concealed door and way down only for a viewer whose knowledge key admits its
concealed use (§8.1 item 7, §9.2; item 63); a building
whose plan rung is `absent` draws its wings, a `stale` one its cached plan under the change marker below (J-A28.82). Way tiers: 1 = `through`, `primary`; 2 = `secondary`, `quay`; 3 = `lane`,
`cul_de_sac`, `alley`, `track`, `path`; `pier`, `bridge` and `ford` draw with their way. Continuous zoom selects the band
with hysteresis — entered at its entry stop (§8.8), left one stop past it; added detail cross-fades across that
interval; no feature pops more than once across a zoom sweep (B-ZOOM). A band's detail is fixed by its programs and
§8.10's rank thinning; the hardware tier acts through the tile DPR and the light rung (§8.8, §8.4 (g)), so no separate
per-band detail budget exists (the style sheet's former `budgets` field, which nothing read, is withdrawn).

**Room labels and lights at the building band (item 28; J-A28.32, J-A28.85, J-A28.87).** The plan draw sets each room's label
itself: the room's role (§2.6's `RoomRole`, a §10.2 row's name) along the room's label spine — §3.8's `spine` reader on
the room's ring, its sampled medial axis on a downgrade — at the largest cap height in §9.4's room-label range whose
glyph boxes fit within the room's ring, and not at all below that range (hover still names the room). A room label is
a `text` mark with no `LabelTable` row (§8.1 item 2) and
never an S13b candidate: each lies inside its own room and the rooms of a storey never overlap (§3.10's seed-tiling
row), so room labels never collide with one another, and S13b reads their boxes as protected obstacles at the building
band (`ObstacleSource` kind `room`, §14; §9.2), so no placed label crosses one. A lit room (`Room.lit`, §2.6) has one light point at its spine summit —
the axis point of greatest clearance — a derived light of §8.4's light pass at the building band (on the vector rung a
`glow` sprite in the night variants, §8.2's presets) and exported as the storey scene's light (§11.1). A derived plan's chimneys are drawn by
the roof construction (§8.6).

**The city-band figure-ground contract (MFP-1).**
1. Every L2 built block is filled with `ground` at every band; at the city band yards are not subdivided (parks and greens
   ≥ 0.3 ha show in `green`; enclosed courts stay `ground` and take `court` from the district band, keeping `ink`'s eight
   city-band tones, §8.2, N-25 — a hidden court reached only through a passage or a sealed one, §4.6, item 30, is such a
   court: it reads as a court behind the block's masses and never as a paper void, §8.3's census row), so inside the built area streets and squares are the only `road`-role voids — a block of content `square` (V01 §3.5) is such a square, its face drawn in `road` at every band, and a `green` block's in `green` (M5; file f item 417).
2. At the city band footprints are drawn over the ground as **masses**: per block, closed across gaps narrower than 1.5 px
   at the zoom stop (offset +r then −r, r = 0.75 px × metres per px, in the kernel's integer offset, computed and cached
   per (block, stop, revision) in the tile worker from the footprint marks, which carry their block in the `block`
   column), never across the corridor of a way drawn at the band (the closing is clipped by those corridors, so an
   access-critical alley stays open), filled with `building` and outlined at the band's outline width; party lines
   between one mass's footprints at one third of that width, only where the footprint's short side is ≥ 4 px. **A
   building over a passage** (`Passage.frontBuilding`, §2.5) adds a **span mark** to its block's closing: one per base
   wing that spans the passage (`BaseWing.spans`, which a composed wing inherits as `Wing.spans`; a stepped front's
   quads each), that wing's span ring — §2.6's cut of the `Passage` face under it — so its upper storeys cover the
   passage at the city band (J-A30.84, J-A30.87). S14 emits the span mark at every band, its `block` column the
   building's, its `baseCm` column the spanning wing's base plus the passage's `headroomCm` and its `heightCm` column
   that wing's `eaveCm` less that `headroomCm`, so the mark's top is that wing's eave; only the city band paints it,
   the finer bands reading it as a shadow caster alone (§8.4) while the passage's floor draws in `road` under its arch
   glyphs (§8.2). **An informal cluster is the exception (item 70; J-A70.81).** A plot of §4.7 S11's `cluster`
   arrangement is not closed into one mass across its footpaths: each shack, tent or lean-to draws as its own small roof
   mark in `building` with the band's outline (a structure below the 2-px floor as a settlement dot, item 3), and the
   footpath web between them in `ground` — a dense speckle of small roofs over a ground-toned path web, never an empty
   block and never a solid mass; the closing's other rules hold for every other plot of the block.
3. A mass smaller than (2 px)² that merged with nothing is a 2-px **settlement dot** in `building` with an ink rim — a
   symbol at the centroid, never an enlarged footprint (O12 a's 2-px floor).
4. Access-critical lanes are drawn as below.

**Metrics** (B-ZOOM, city band, default view, every rung). **Street-edge recoverability** — the share of intramural street
length (sampled every 2 px along corridor centrelines) with a road / non-road transition within (half-width + 1 px) on
both sides — ≥ MFCG's value on its size-40 / 80 / 130 plain sweep renders less 0.03; MFCG's value is measured
research-side at M-1 by this metric (§13.5 ⟨M-1⟩), and the product's implementation is cross-checked against it on M1's
golden renders within 0.01. Road / ground contrast is the matrix's (§8.2); gross footprint cover inside the walls is
reported beside MFCG's as information, not a target (§13.5; yards are the owner's plot-model ruling). **Pre-decided
fallback** if recoverability fails at M1: the ink city band adds kerb hairlines (0.25 px, `ink`) along every open
frontage run ≥ 6 m (detached, compound, hovel, vacant and green frontages) and re-runs the metric (J-R5).

**Way selection at the city band (VIS-3, N-6).** Tiers 1–2 are always drawn. A tier-3 way is **bounded** when the
footprint-covered share of its frontage is ≥ 0.8 on **both** sides and its width is at least the closing's 1.5 px at the
stop (the gap between two continuous masses already reads as a street). It is drawn when **access-critical** — some plot
has all its access edges on it and fronts no other drawn way — and not bounded, i.e. covered below 0.8 on at least one
side (a lane with a row on one side and open gardens on the other) or narrower than the closing. Drawn tier-3 ways take
the lane symbol (body = max(model width, 1 px), casing h / 2); bounded intramural lanes and alleys stay unstroked gaps
between masses. Suburb offshoots, ribbon back lanes, farm tracks and extramural lanes are therefore drawn. Metric: the
share of city-band plots whose access way is drawn or bounded ≥ 95 %.

**Line greenery (VIS-14).** Avenues and street trees are not drawn at the city band; they appear from the district band,
where a crown is ≥ 4 px. Check: no tree mark covers a tier-1/2 casing at the city band (§8.3; J-R6).

**Works stages by band (item 67; owner: "we should consider things being roofless or other visuals").** A building under a Works (§4.11) draws its stage at the drawn week (§8.1 item 7) by §8.2's
`states` rows: at the **city band** a **stage glyph** on its footprint mass — a scaffold hatch for the build, extension
and repair stages, a rubble stipple for the demolition stages, the ladder's rows for decay — cheap and legible; at the
**district** and **neighbourhood** bands the stage itself: the staked footprint, the pit, the low walls, the walls
rising without a roof inside a scaffold ring, the bare roof frame, the roof under scaffold, the stripped shell, the
rubble; at the **building band** the plan in progress (walls without doors or furniture; a ruin's fallen walls and open
rooms, §2.6). A plot boundary in transition draws dashed from the district band — the old line until the work clears it,
the new one as stakes (§4.11's *Works*, its step 7). Heights, and so shadows, follow the stage (§8.4).

**Views that are not the default (item 28; J-A28.42).** `plotsOnly`, a per-viewer view key
(§2.9), is the cadastral view: at the city and district bands it draws every plot's boundary (§2.5's cadastral outline
group) over the block ground and no building mark — masses, footprints, entrance ticks and roof detail off; walls,
ways, water, greenery and labels as they are. It is never the default: the default at city zoom is every footprint, MFCG's look, as J-A28.42 rules (§4.1).

**Change markers (item 28; J-A28.81).** A building whose elaboration record (§2.8) reads `stale` — an input of its wings
or plan rung changed since it was derived (§4.1) — carries a marker glyph at the building, neighbourhood and district
bands; a district holding any stale building carries one marker at the city band, so the user sees where the simulator
or the dossier has moved on — a Works stage changed since the building was last viewed among the inputs (item 67 (j)) —
and clicks at their own pace. The marker is the `live.stale` overlay layer (§8.2): composed
onto the tiles without re-rastering a base, never hashed, read from the records outside every digest; it vanishes when
the click re-derives the rung from its canonical prior — for a plan the stored plan, else the as-built plan carried
along §2.6's interior ladder; for wings the stored or as-built wings — never from the cache (§2.6, §7.3; J-A28.71).

**First map.** The one-click first map is the complete city band — S0–S13a for every district and S14's city band —
with no S9 block preview on the one-click path (SCL-4; J-R7); at a village rung it is the complete district band of the
one village district, framed on the perimeter's bounding box × 1.6 (at least 400 m on a side; V07 §5.2), the township
one zoom-out away (the village product; file f item 418). Lazy work is only what the city band does not draw: yard
sub-parts, entrance ticks (the entrance set itself is S11's, §2.6), roof ridges and hatching, street names and addresses (view data, §9), crowns and scatter (§8.10), and the stage-3 rungs — wings and plans — by
click or by view (§4.1). **An unlit first map (item 68; J-A68.88):** the first map is composed without the light —
with the raised under-copy (K06, §8.4) — and the tiles' surface layers and light maps follow
centre-out within §12.5's settle bound, the view then lit by the fixed sun until the pointer moves (§8.4 (d)); the time
to first map (§12.5) never includes them.
Proxy thumbnails (§7.8) draw S0–S4 marks in a distinct preview style and are never presented as the map.

### 8.6 Stage-2 render tier and stage-3 LOD

The neighbourhood band of every family (§8.2) is the stage-2 render tier (IMPROVEMENTS S5): `hatched` is NG's family, and
the stage-2 side-by-side against NG shows `hatched` with the `ink` close-up alongside, so a default-ink user opening a
district sees the same palette with more detail (VIS-9). Close-up content (PART II) is derived when §4.1's trigger
policy says, from the district's committed state and sub-seed, in the derivation pool, or in the generation worker when
the pool is off (it needs the kernel and the model), and reaches the tile worker as `DisplayDelta` slices answering the
tile's band request (§8.9; under `'click'` from the elaboration cache, §2.9), into the same mark tables and tile pyramid;
a neighbourhood not yet opened draws the base's marks at the neighbourhood band, without close-up content. Stage 3 plugs
in at the building band: marks from `BuildingGenerator.compose(…)` and `plan(…)` (taking a `Kernel` and a
`BuildingInput` with a `TerrainSampler`, §2.6), derived there as §4.1's policy says and kept in the elaboration cache
(§2.9), the only cache of derived rungs — no per-session (entity key, revision, lod) memo beside it; a
rung whose record (§2.8) reads `stale` is served from the cache until the click re-derives it from its canonical
prior, never from the cache, which only memoises the chain's steps (§2.6, §7.3; J-A28.71; item 28 (c)); the tile draws the outline until its compositions arrive, and every other band draws the outline, which equals the
union of the composed wings by contract (SCL-13), so the footprint hash is the same at every band. The tile worker never
runs `compose()`, `plan()` or close-up derivation (§8.9).

With stage 3 registered, the `roofscape` construction (V02 §5.2) draws each building's roof plan from all its wings at
once — ends, valleys, walls and towers resolved, the facets planar and non-overlapping — and the light pass's surface
layer takes its roofs from it; the per-wing constructions below stay for the parity presets' sheets and as the per-wing
downgrade (M6; file f item 406). A wing that stands on another (`BaseWing.on`) is drawn after it, its ring clipping the
lower wing's roof, and a solid stair's `shed` facet carries tread lines by V02's `stairTreads` (V02 §2.6, §5.6); the
per-wing constructions draw a building's wings in that stack order (item 110 (c); M3a; file f item 419).
Roof construction (§8.2) runs per stored wing (VIS-10) by its `BaseWing.kind` (§2.6): a `rect` wing takes exact OBB
ridges with hips from its four corners (`BaseWing.corners` when its sides carry other vertices), a rect a warp
de-rectangled being a `quad` by §2.6's carry rule; a `quad` takes the exact OBB path when it passes the near-rectangle
test (§3.8), the validated skeleton otherwise, and the gable constructions draw its stored ridge (the arc-length
midpoints of the two side chains its `ridgeAxis` names, sides delimited by `BaseWing.corners`, §2.6); a `polygon` wing
takes a pyramid, cone or dome; the plain roof (no ridge or hip lines) is the downgrade (§3.8). Two-tone lit / shadow
faces are assigned per roof face by its normal against the light (`faceLight`) for any face set a construction yields.
The derived-roof cache key includes the construction (§8.1 item 5), so switching `ink`'s hipped roofs to `hatched`'s
per-wing gables needs no regeneration. A derived plan's chimneys (`Chimney`, §2.6) rise through the roof at their
columns, each drawn as a small stack in the roof tone with an ink rim at the neighbourhood and building bands; the roof
detail (§8.10) draws no decorative chimney on a building whose plan rung is not `absent` (J-A28.85).

**A building in progress at the building band (item 67).** A building under a Works draws its wings at their stage
heights (`heightsAt`, §4.11) and, where its plan rung exists, the plan in progress — walls without doors or furniture,
a ruin's fallen walls and open rooms (§2.6) — from the committed composition, the parts §4.11's mutation steps have
reached at the drawn week drawn and the rest not yet; the composition is never re-derived per week, and a stage change
marks the rung stale through its elaboration record (§8.5's change markers; item 67 (j)).

### 8.7 Export resolution

SVG is resolution-free and layered, written at a declared band (§11.1). PNG and print render by §8.8's band-streamed
tile assembly at any DPI, with labels placed at a zoom stop computed for the export's own scale (§9.2); paper-unit rules
keep hairlines at their paper width at every scale, and symbol widths come from the symbolisation table (§8.2) at the
export scale. VTT exports carry model widths only, on a declared grid with exact pixels per cell (§11.1). The scale bar's
accuracy is §9.5's.

### 8.8 Tiles, zoom stops, print and the canvas budget

* **Pyramid (N-9 a).** Zoom stops at 2^¼ steps of scale (four per doubling) cover B-ZOOM's 1:50 000 → 1:500 in 27 stops
  (k = 0 … 26), and eight building-band stops continue the same step to ≈ 1:125 (k = 27 … 34), drawn only for buildings
  whose plan draws, with the plan's detail ladder by stop (V03 §5.1; M6-P, file f item 420). Stop k has
  m_k = 0.132 29 m × 2^((26 − k) ÷ 4) metres per **CSS** pixel — stop 26 is 1:500 at 96 CSS px per inch, stop 0
  ≈ 1:45 255 — `interface ZoomStop { k: number; mPerCssPx: number /* m_k */; band: LodBand /* the band a zoom-in reaches
  at it */ }` (declared in `@plat/model`, §8.1's comment). **Band entry stops** (our own; calibratable; B-ZOOM checks the
  pops at M1 and M2b): the city band from stop 0, the district band at stop 16 (≈ 1:2 828), the neighbourhood band at 20
  (≈ 1:1 414), the building band at 24 (≈ 1:707) — read by §8.5's hysteresis and §9.2's placement. Tiles are 512 × 512 device px at the view's **tile DPR** d
  (the device pixel ratio after the tier's cap, below), **world-aligned** per (stop, d): tile (i, j) covers the world
  square of side 512 × m_k ÷ d metres with corner (i, j) × 512 × m_k ÷ d from the world origin — stable under panning,
  shared between views and exports at that stop and DPR. The view settles on exact stops: the settled scale is within
  ± 9 % of the requested one, and every settled view has exact hairlines, exact casings and a collision-free label set
  (J-R8).
* **Content (GEO-28, N-7).** A tile draws every mark whose bbox meets the tile dilated by m = the largest of the casing
  half-width, the drawn wall half-width, the projected shadows' length, the largest crown radius and the halo width at the
  stop — and, for a light map, the largest radius among the lights that reach the tile (§8.4 (f)) — in §8.1 item 3's order, identical in every tile; each tile clips to its own square, so both sides of an edge yield
  the same pixels — no seams, no casing bar across a junction on a district boundary. Fills of one semantic within a tile
  are one `Path2D` with the non-zero rule (no anti-aliasing seam between same-role neighbours); the order entries marked
  `OrderSlot.seamClose` (§8.2) also get a ½-px same-colour stroke underneath (NG's seam dilation). Tested by §8.3's
  junction-mouth and draw-order rows.
* **Layers of a tile and composition (N-5).** The tile worker rasters and keeps a **base** layer per tile (slots 1–20 of
  §8.2), then **composes** the base, the glyphs of the labels placed at that stop (§9.2) and the `overlay` live marks
  into one bitmap per tile position, transferred to the main thread. A label edit or toggle, a selection or a moving
  person re-composes the tiles it touches (§12.5's composition cost) and never re-rasters a base. In `path` sun mode
  (§8.4), on a tier whose budget admits it, the base is rastered as `under` (slots 1–9) and `over` (slots 11–20) with the
  projected shadows (slot 10) in their own layer at half resolution (256² per tile, bilinear-scaled when composed), so a
  1° sun step re-rasters only the shadow layers and only a new light step re-rasters `under` and `over`, through §8.4's
  light-step pass (J-R21) — the vector rung's machinery. **On rungs 1–2 of §8.4's ladder (item 68)** the tile worker
  also rasters, from the same draw sequence, the tile's **surface layer** — 4 B per pixel at the tile DPR: the octahedral
  normal in two bytes, the height above the tile's datum in one byte on a square-root scale to T (h = (v ÷ 255)² × T; at
  T = 160 m ≈ 0.2 m steps at 5 m, ≈ 1.0 m at 100 m; T is 160 m, or the tile's own range above its datum rounded up to the
  metre where that is greater — a steep tile at a coarse stop — carried beside the datum, so no height clamps; J-A68.94),
  and the unlit coverage in one
  byte (the coverage of the label glyphs, halos and `overlay` marks it composed, so the light pass leaves them as
  composed) — and bakes its **light map** at half resolution (256² × 4 B: the point lights' term in three channels, the
  ambient occlusion in the fourth); both are transferred to the main thread with the composed bitmap, whose one bitmap
  per tile position stands (J-R21). Each surface layer carries its **max-height pyramid** (§8.4 (c)): level 0 its own
  heights; levels 1–9 per cell the greatest height of the city band's caster marks (§8.1 item 2) whose outlines — an `instances` mark's dilated by its
  largest crown radius — meet the cell and of the terrain field's samples whose field cells meet it — never below the
  level-0 heights it covers — written by the same writer from the marks, in one byte on the height's square-root scale
  rounded up (⅓ of the height byte: 1⁄12 MB per position). The GPU pass reads the visible tiles' surfaces and pyramids and,
  round them, what the global light's window reaches (§8.4 (c)) — the view holding what its drawn sun can need, for the
  cursor sun the largest window a pointer anywhere in the view gives, for the fixed and path suns their altitude's, so a
  moving pointer rasters nothing and a sinking path sun adds blocks as a pan adds tiles. A tile position's **ring** is its
  distance in positions from the visible set (the greater of its two index offsets). The **first ring** (2(a + b) + 4
  positions) is held per position from level 0, its heights rastered with their pyramid (⅓ MB) from the marks of the
  view's band, requested for its districts like a visible tile's (§8.9), its shadows completing when the band answer
  arrives. Every farther position is held by a **ring block** (J-A68.90): the world-aligned square of 2^m × 2^m
  positions whose indices agree once shifted right by m, taken at the largest order m whose every position lies in ring
  2^m + 1 or beyond, and held from level max(m + 2, ⌊log₂(4(r − 1))⌋), r its nearest position's ring — the level §8.4
  (c)'s floor resolves there for the nearest visible pixel — so at most 128 × 128 cells at that level (1⁄48 MB with the
  levels above it, at one byte) whatever its order, its levels continuing above level 9 (a cell there spanning 2^(ℓ − 9)
  tile sides) to one cell per block. A block's cells take the pyramid's rule over the **city band's** marks, which the
  tile worker holds for the whole document and which carry every caster (§8.1 item 2; J-A68.93), with its own datum
  and scale top (above); so a block's cell equals the same cell of any pyramid, and no block waits for
  a band answer. The **slab list** is one per document — every slab of the city band's casters (§8.4 (a)), each its outline, top and underside — held whole by the tile worker, transferred to the main thread with the first surface layer and again with any delta that changes a slab, and read by the traversal wherever the ray runs within R; its memory is counted with the display list (§8.1 item 6), since it is held once, not per tile position. The visible tiles, the first ring and the blocks partition the window, the blocks' number growing with
  the logarithm of its reach and the frame bounding them: at most 326 first-ring positions and blocks together at the
  reference viewport (§12.5), and 437 at any view up to tile DPR 3, for a window reaching the whole frame of any rung to the
  population cap, the blocks together ≤ B (the canvas budget, below;
  `amendc_repair_rendering_r3_blocks.out` (2)), where every position held out to R grew with the window's square (5 440
  positions for 300 m of relief under a 15° sun at the 1:500 stop, `amendc_verify_rendering_r2_rings.out`). So a shadow
  cast from beyond the view falls inside it at its full length, and where a cell is held never changes its value (§8.4
  (c)). The CPU reference computes its surface from the marks directly into float32 arrays (height and octahedral
  normal, 12 B per pixel; its arithmetic in float64) and its pyramids, first ring and blocks in float32 by the same rule,
  never from an encoding, which is the GPU pass's approximation within §13.4's tolerance.
* **Cache and invalidation (LC-23, N-8).** Tile key = (stop, i, j, tile DPR d, tile layer — `base`, or in path mode
  `under`, `shadow`, `over` —, style version, the view-state switches that change the layer's pixels: season, weather,
  shadows on or off and their mode, model-layer toggles, `plotsOnly` (city and district bands), `storey` (building
  band), `depthBand` (the underground layer), the knowledge key while a `use`- or `owner`-keyed thematic row is active
  (§8.2) or while the tile holds a concealed mark, a mark drawn only for a key that admits it (§8.2's `access` and `link`
  rows) or a light whose host is either (§8.1 item 7), the drawn week where the tile holds a Works mark (§8.1
  item 7), the `light` key on the vector rung (its `@night` roles), `base` live layers; for the `shadow` layer — or, while projected
  shadows are on, `base` on a tier without shadow layers — the path-mode sun quantised to the tier's sun step (1°, or 3°
  after §8.4's fallback); for `under` and `over` — or `base` on a tier without shadow layers — of a sheet whose programs
  at the band read the light (`faceLight`, the two-tone `roof`, `hillshade`, `lit` crowns), the light step (§8.4); in
  `fixed` mode the sheet's sun belongs to the style version). Content version = the combination of the drawn marks'
  `revision`s. A composed bitmap is keyed by its base key plus the stop's label-placement revision and the `overlay`
  providers' versions. A `DisplayDelta`'s dirty boxes invalidate every cached tile and ring block they meet, at every stop and DPR. In
  path mode a new 1° step invalidates only the layers keyed by it, and a newer 1° step cancels an older one's pending
  re-rasters (latest wins); a new light step invalidates the layers keyed by it, which §8.4's light-step pass re-rasters
  to completion. A `surface` layer and its pyramid are keyed as their tile's base, a first-ring position's heights and
  pyramid likewise (always from level 0); a **ring block** by (stop, its order, its indices, tile DPR, its level) and the
  switches of a `base` key that change which casters draw or their heights (model-layer toggles, `plotsOnly`, the drawn
  week over a Works mark), its content version the combination of the `revision`s of the city band's marks meeting it —
  a held block serving any view whose floor at its nearest position is at or above its level (§8.4 (c)), so a pan that
  brings a position nearer takes the finer block it now needs, never a coarser one found for the same position; a
  **light map** by its **light-map key** (§8.4 (f)) — its tile's
  surface key, whose content version is taken over the tile dilated by the largest radius among the lights that reach
  it, plus the revisions of the `light` marks reaching the tile, the drawn week, the drawn hour and the `light` key — and a
  dirty box invalidates every light map whose dilated tile it meets; so a view switch that changes a surface or the lights
  that draw (a model-layer toggle, `plotsOnly`, `storey`, `depthBand`, the knowledge key over a concealed mark, a mark
  drawn only for a key that admits it or a light whose host is either) re-bakes the light maps that read it, while a moving
  pointer, a new `sunHeight` or a zoom inside a stop invalidates nothing cached: only the GPU's per-frame terms — the
  global light's and the hand lantern's (§8.4 (f)) — move.
* **Canvas budget per hardware tier (N-9 b).** Counted: per visible tile position the worker's base (1 MB at 512²) and
  the main thread's composed bitmap (1 MB); the next coarser stop's composed bitmaps kept for gestures (≤ 1 MB per visible
  position); fixed scratch — the shadow and post-operation buffers (2 MB), and the crown sprites and glyph atlases
  (≤ 5 MB), the crown sprites with a `path` sun in `lit` being one set per cached light step (the drawn step's set always,
  earlier sets while they fit, §8.10; a set a running export holds counts with that export's canvases, §12.8). With P the
  worst-case number of tile positions covering a W × H CSS-px view at tile DPR d,
  P = a × b = (⌈W·d ÷ 512⌉ + 1) × (⌈H·d ÷ 512⌉ + 1), the need is **3P + 7 MB**, and **4.25P + 7 MB** with path-mode shadow layers
  (`under` and `over` replace the base; the shadow layer adds ¼ MB), and **4.25P + 7 MB + Q** with the light pass on rungs
  1–2 (item 68: per position the main thread's surface layer, 1 MB, and light map, ¼ MB; the path-mode shadow layers
  are the vector rung's and are then not held; Q = P ÷ 12 + (2(a + b) + 4) ÷ 3 + B, the pyramids, first ring and ring
  blocks above — 1⁄12 MB per position, ⅓ MB per first-ring position — 2(a + b) + 4 of them — plus B, the blocks' bound:
  3.75 MB at tile DPR 1, 4.25 at 1.5, 4.75 at 2 and 5.5 at 3, whatever the window (`amendc_repair_rendering_r3_blocks.out`
  (2): at most 3.60, 4.09, 4.58 and 5.46 MB over every view, frame to the population cap and placement)), and
  **6.5P + 7 MB + Q_f** on a tier that took §8.4 (g)'s full-precision surface (3.25 MB per position instead of 1 MB, and
  16-bit pyramids, first ring and blocks, each twice its byte size: Q_f = 2Q; J-A68.89). Tier ceilings: low 72 MB, mid 128 MB, high 192 MB;
  tile-DPR caps: low 1, mid 2, high 3. The tile DPR is the device's pixel ratio capped by the tier, then stepped down
  (3 → 2 → 1.5 → 1) until 3P + 7 MB fits the ceiling — and, while the light pass is on, until 4.25P + 7 MB + Q — at full precision 6.5P + 7 MB + Q_f — fits, the view
  taking the vector rung where that fails at DPR 1 (J-A68.89); path-mode shadow layers are used only where 4.25P + 7 MB
  also fits, otherwise a sun step re-rasters the base. Worked cases (`fixall_rendering_r2_budgets.out`): the reference
  viewport (§12.5) has P = 35 and needs 112 MB (156 MB with shadow layers) — mid or high tier; the low-end
  device at 1 366 × 768 or 1 920 × 1 080 at DPR 1 needs 43 or 67 MB — inside the low tier's 72 MB, fallback stop, scratch
  and atlases counted. Lit (rungs 1–2; each case the base need + Q, `amendc_repair_rendering_r3_blocks.out` (5)): the
  reference viewport keeps DPR 2 on the high tier (P = 35, 155.75 + 17 = 172.75 MB), steps to DPR 1.5 on the mid tier
  (P = 24, 109 + 14.25 = 123.25 MB); the low-end device at 1 366 × 768 is lit at DPR 1 (P = 12, 58 + 10.75 = 68.75 MB) and
  at 1 920 × 1 080 (P = 20, 92 + 12.75 = 104.75 MB) draws the vector rung; at full precision (base + Q_f) the reference
  view is lit at DPR 1.5 on the high tier (P = 24, 163 + 28.5 = 191.5 MB) and at DPR 1 on the mid tier (P = 12,
  85 + 21.5 = 106.5 MB), and the low-end device draws the vector rung (all PLAUSIBLE until M2b's canvas measurement, §12.8). These formulae and cases are the canvas need's one statement; §12.8 cites them. Cached tiles beyond the visible and fallback sets are evicted least-recently-used by bytes. The
  tier is chosen at app start from the Canvas2D part of `bench/calibrate` (§12.1) and the host's reported device memory,
  can be overridden in the advanced panel, and is shown with the tile DPR in the view status (J-R22).
* **Gestures (SCL-7, VIS-6).** During a pinch or wheel zoom the compositor shows the nearest cached stop's composed tiles
  scaled (the labels scale with them); 120 ms after input stops the view animates (≤ 150 ms) to the nearest stop and the
  tile worker re-rasters the visible tiles centre-out, swapping each in when ready. Panning composites cached tiles and
  shows newly exposed ones from the next coarser cached stop until rastered. While a gesture runs at most 4 new bitmaps
  are committed per animation frame; at the first map and at settle every ready tile is committed in the frame it arrives
  (§12.5).
* **Print and large PNG (O12 e).** Horizontal bands of tiles (512 device px high) are rastered and composed at the export
  scale; each band's scanlines are streamed into the PNG encoder — each row filtered by the **per-row rule** (of PNG's
  five filter types, the one whose filtered bytes have the smallest sum of absolute values, bytes read as signed), then
  one zlib stream (`CompressionStream` in browsers, `zlib` at level 6 in Node) — and written as IDAT chunks band by band;
  §12.7 holds the encoding's time and fallback. Peak canvas memory is one band (A2 at 300 dpi: 7 016 px × 512 px × 4 B
  ≈ 14 MB); no canvas is larger than a tile band. A lit export (item 68) runs §8.4's CPU reference light pass tile by tile, each
  export tile over its own **window**, its first ring and ring blocks taken round the export tile as round a view of one
  position: the tile's float32 surface (12 B per pixel, 3 MB) and pyramid, its first ring's float32 heights and pyramids
  (8 positions, 10.67 MB) and its blocks in float32 (4 B per cell) — ≤ 14 MB plus its blocks whatever R — the blocks ≤ 13.1 MB at the 1:500 scale and 300 dpi over the frame at the population cap (`amendc_repair_rendering_r3_blocks.out` (3)) and ≤ 1.7 MB more per halving of the export tile's world side (18.52 MB at 1:100 and 600 dpi, `amendc_verify_rendering_r3_exportscale.out`), never
  a whole band's surface. The blocks come from the export's **block cache**, which keeps every block the export has
  computed while they fit in max(16 MB, the tile in progress's blocks) (the tile in progress's held, the least recently used released first), a cached block
  serving each export tile after it whose floor there is at or above its level; each first-ring position's heights are
  rastered for every band whose tiles it borders; the light-map bake reads the
  tile dilated by the largest light radius. The export then runs §8.2's post operations (§8.4 (f)) and composes its labels,
  one band's canvas (≈ 14 MB at A2 300 dpi) and one tile's window held at a time (§12.8); its transient list (§8.1 item
  6) carries what its first rings, light maps and blocks read beyond the frame, the window's Z the city band's surface
  top the generation worker keeps, so a caster beyond the frame's edge still shades it. Per-layer transparent PNGs use the same
  path with the layer set restricted.
* **Warp preview (SCL-9).** While a warp brush is held, the moved L1 vertices are applied to a transient copy of the
  affected ways' and blocks' marks, and only tiles meeting the brush's dirty box re-raster (frame rate: §12.6). **Apply**
  commits the `warp` event (§7.1), whose invariants and re-derivation run then; **Discard** drops the copy (MFCG's staged
  warp, on our event model).

### 8.9 Backends, text, threads and the worker boundary

* **Canvas2D is the reference backend of every shipped preset** (`ink`, `lit`, `hatched` and variants), on an
  `OffscreenCanvas` in the tile worker through the resumable raster jobs below; programs render typed-array paths, one
  `Path2D` per (program, semantic, variant) per tile, sprites by `drawImage`. SVG is written from the same display list
  (§11.1).
* **WebGL2 draws no marks.** It composites and, on rungs 1–2 of §8.4's ladder, lights: it uploads the composed
  Canvas2D tiles, their surface layers and their light maps as textures, composites them with the view transform, runs
  §8.4's global-light term (underground, the hand lantern's too) and the composition of the baked light as fragment passes and then §8.2's post operations over the lit base (§8.4 (f)) —
  no stroke tessellation, no SDF text, no look that differs by backend (VIS-7): the lit picture is the CPU reference's,
  to which the GPU pass is held by §13.4's tolerance (J-A68.82). WebGPU, where the browser has it, runs the same passes.
  While the light pass is off or on the vector rung the WebGL2 compositor is the **pre-decided fallback compositor**:
  measured at M2b, pan and zoom frame rates of the Canvas2D compositor on the reference and low-end devices at
  METROPOLIS scale (§12.5); enabled for a hardware tier only if Canvas2D misses ≥ 60 fps (reference) or ≥ 30 fps (low
  end) there.
* **Text (DEF-6).** All text is drawn by Canvas2D in the tile worker's composition step (§8.8), glyph by glyph at the
  positions computed from the bundled font's own metrics (§9.2), through a glyph atlas per (face, size, stop): each glyph
  drawn once into the atlas and copied per placement. SVG writes the same per-glyph positions — as the face's glyph
  outlines by default, or as text in the embedded face on request (§11.1, N-13) (J-R9). Measured at M1 against §12.7's
  label-composition budget; pre-decided fallback: whole words cached as bitmaps per (text, size, stop) in the atlas.
* **Threads (N-4).** (1) The **generation worker** holds the document and the model and runs S0–S14; it also resolves
  instance overrides (§8.10), runs the live-layer providers (§8.2), builds on-demand bands (the district, neighbourhood
  and building bands of the districts a band request names, `DisplayListBuilder.build(model, band, groups)`), writes every
  export (§11.1), answers the API's `hit`, `hitStack` and `inView` queries (§11.2) from the model and its 24-B index
  (§8.1 item 6), holds the elaboration cache (§2.9), and hands stage-3 `compose()`, `plan()` and close-up
  derivation (§8.6) to the derivation pool as §4.1's policy says. (2) The **derivation pool** (up to three workers, §4.1) runs the per-district
  stages at every rung (§12.3) and, on request, `compose()`, `plan()` and close-up derivation from the committed state of the
  district it is handed; with the pool off the generation worker runs them. (3) The **tile worker holds no model and no
  terrain**: it holds the display list with its label, instance and string tables (the only full copy, §8.1 item 6) and
  from them rasters base layers and, with the light pass, surface layers with their pyramids, the first ring's heights,
  the ring blocks and light maps (§8.4, §8.8), runs S13b (§9.2)
  and decoration instancing (§8.10), composes labels and `overlay` live marks (§8.8), runs post operations and every
  export's CPU reference light pass; it answers the main thread's furniture and snap queries and rasters raster
  exports from the transient list each request carries (§11.1) — all through the queue below, with everything arriving
  through the table below (J-R23). (4) The **main thread** runs the UI, compositing of the transferred tiles, pointer
  hit-testing on the hit-test slices, screen-space furniture (§9.5; placement scores and ruler snaps asked of the tile
  worker), input and, on rungs 1–2, the GPU light pass over the transferred textures, re-evaluated per frame while the
  pointer moves the cursor sun or the hand lantern (§8.4 (d), (f)). Nothing model-sized reaches the main thread (J-R10).
* **What crosses (SCL-6, N-4).**

  | from → to | what | how | bound |
  |---|---|---|---|
  | generation → tile worker | display-list deltas: mark columns (with `key`), geometry, field rasters, and the changed rows of the label, instance and string tables (candidates, priority, parent node, pinned placement, `hidden` and `knownTo` per label; stamp parameters, species mix and resolved overrides per `instances` mark) | transferred: each slice copied into a fresh buffer and transferred; the generation worker keeps only the 24-B index columns (§8.1 item 6) | O(changed marks); ≤ 97 B per label row, ≤ 40 B per instance row, ≤ 16 B per species row, ≤ 32 B per override row, plus geometry and UTF-8 text |
  | generation ↔ tile worker (cross-origin-isolated hosts only) | the mark table | `SharedArrayBuffer` columns, no copy — optional, never required (needs COOP / COEP from the embedding host) | — |
  | tile worker → generation | band requests: the districts (group handles) and band that tiles entering the view — and, after the visible tiles', the first-ring positions round them (§8.8) — need and the tile worker lacks (the ring blocks read the city band, which it holds whole); the buildings whose rungs and the districts whose close-ups the band needs (`compose()`, `plan()`, close-up derivation) — derived on the request under `elaborate: 'view'`, and under `'click'` served only from the elaboration cache (§4.1, §8.6) | copied | ≤ 4 KB per request |
  | generation or pool → tile worker | answers: on-demand band marks, `compose()` wings and rooms, `plan()` storeys, close-up marks, as `DisplayDelta` slices naming the request | transferred | ≤ 1 MB per answer |
  | generation → tile worker | live-layer marks (`live.<id>` groups), when the view state a provider reads, the model, the visible region or — for a provider that reads them, `live.stale` — the elaboration records change (§8.2) | transferred | ≤ 256 KB per delivery |
  | tile worker → main | composed tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles + each mark's draw order and, for a raised way's spans, a way's crossings of retaining walls and a stepped building's tiers, the sub-part path — §11.2's `HitAnswer`; file f item 466); with the light pass on rungs 1–2, each tile's surface layer with its pyramid and its light map, and each first-ring position's heights with their pyramid and each ring block (§8.8), and the slab list (its records; §8.8) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile; + 1 MB surface (3.25 MB at full precision, §8.4 (g)), 1⁄12 MB pyramid (1⁄6 at full precision) and ¼ MB light map; ⅓ MB per first-ring position and ≤ 1⁄48 MB per ring block (⅔ and 1⁄24 at full precision) |
  | main → tile worker | furniture-placement queries (view, stop, ≤ 16 candidate boxes: the compass's eight, the title's and the legend's four corners) and snap queries (a pointer in world cm, a radius in px, the stop), each with a request id | copied | ≤ 4 KB per query |
  | tile worker → main | per candidate box its `ObstacleSource.coverage` record; the snapped point from `RoleIndex.snap`, or none | copied | ≤ 4 KB per answer, within one 16.7 ms frame |
  | generation → tile worker | raster-export requests (PNG, print, the `.dd2vtt` scene image): frame, scale, band, layers, post operations and the export's zoom stop (§8.7), and the look and view state at the request — the sheet (its id@version, or the viewer's `stylePreset` sheet with the document's rows, §11.3), §8.8's view-state switches (season, weather, shadow mode, model-layer toggles, `base` live layers, `plotsOnly`, `storey`, `depthBand`, the drawn week, `light`), the shadow sun, the light step, the lighting — the rung the export draws (the CPU reference for every raster export, §8.4 (g)) with its global light resolved to the fixed or path sun, since an export has no pointer — and the requesting viewer's knowledge key (§9.2, §11.3), which the tile worker keeps until the export completes and rasters every export tile with — each carrying the export's transient list (mark, geometry, label, instance and string tables for its band and frame, and for a lit export the city band's casters its ring blocks read; §11.1) | request copied; list columns transferred | ≤ 4 KB plus the list (§12.8's export-time peak) |
  | tile worker → generation | the encoded raster: PNG bytes streamed band by band (§8.8); a progress message per band (bands done, bands total) for the export dialog | bytes transferred; progress copied | the file's size; < 64 B per progress message |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.

  **Resumable rasters.** A worker serves its message queue only between two calls it makes, so a tile is rastered by a
  job the tile worker can stop and resume:

  ```ts
  // @plat/render — the tile and vector backends (§14 points here). A tile address is §8.8's (stop, i, j, tile DPR); an export's tiles are addressed at its stop and DPR
  type TileAddress = { stop: number; i: number; j: number; dpr: number };
  interface TileRasterOpts { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over'|'surface'|'lightMap'|'ringHeights'|'ringBlock'; block?: { order: number; level: number } /* 'ringBlock': the block of 2^order × 2^order positions whose indices shifted right by order are the address's i and j, held from `level` up from the city band's marks; 'ringHeights': a first-ring position's heights and pyramid from level 0, from the view's band (§8.8) */; shadows: 'off'|'drop'|'prism' /* the vector rung's: StyleSheet.light.vector.projected (§8.2, §8.4) */;
    sun?: { azimuthCdeg: number; altitudeCdeg: number };        // the shadow sun (§8.4's 1° step): read only by projected shadows (`shadowPass`)
    lightStep?: { azimuthCdeg: number; altitudeCdeg: number };  // the drawn light step (§8.4): read by faceLight, the two-tone roof, hillshade and the crowns on the vector rung
    lighting?: { rung: 1|2|3; light: 'day'|'night'; week: number; hour: number;   // item 68: rungs 1–2 draw albedo and write the surface; the `lightMap` layer bakes the tile's point lights at this week and hour
      reference?: { azimuthCdeg: number; altitudeCdeg: number } };                 // an export's or still's CPU reference light pass: the fixed or path global light
    tier: 'low'|'mid'|'high'; dpr: number }
  interface TileBackend { begin(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: TileRasterOpts): RasterJob }   // fixes the tile's draw sequence; draws nothing
  interface RasterJob {
    step(deadlineMs: number): boolean;   // runs the sequence on from where it stopped; returns after the first draw call ending deadlineMs or more after this call began; true when the tile is complete
    finish(): ImageBitmap;               // once step() returned true: the finished layer, its canvas transferred
    cancel(): void;                      // drops the job, frees its canvas: the tile left the view, a newer sun step, a delta that dirties the tile
    readonly spentMs: number;            // tile-worker time spent so far; the budgets and the census read it
  }
  interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }   // the SVG writer (§11.1): runs in the generation worker over the export's transient list
  ```

  The queue passes the view's drawn light step for `under`, `over` and `base` and the shadow sun wherever projected
  shadows are drawn; an export's jobs get its request's sheet, switches, shadow sun and light step. `begin` finds every
  mark whose bbox meets the dilated tile (§8.8) and fixes the **draw sequence**: the native calls in §8.1 item 3's
  (slot, pass, z, key) order, each a fill or stroke of one batched `Path2D` (§12.5's per-tile bound), a run of ≤ 64
  sprite draws (crowns, glyph copies), or a derived per-tile operation (projected shadows, raised under-copy, post
  operation; §8.2, §8.4). The JavaScript preparing a call (appending rings to its `Path2D`, generating a stamp's
  instances, §8.10) reads the clock after every mark and every 64 instances and can stop there; a native call is never
  split (a split batched fill would draw anti-aliasing seams, §8.8), and a derived operation, which uses the shared
  shadow and post-operation buffers (§8.8), runs whole inside one step — so the overrun past the deadline is at most one
  native call or derived operation. Each job owns its canvas and context state, and what it reads does not change under
  it: deltas are applied between steps, a removed mark becomes a dead row and an added mark a new row, and the tile
  worker compacts its list only while no job is live; a job whose tile a delta's dirty boxes meet is cancelled and
  queued again. Slicing changes when calls run, never which or in what order: a tile rastered whole and in 1-ms slices is
  pixel-identical (§8.3). The queue calls `step(8)` — `step(4)` after the pre-decided fallback below.

  **The tile worker's queue.** Between two steps the tile worker serves its message queue, then runs one step of the
  highest class with ready work:

  | class | work | why it stands there |
  |---|---|---|
  | 1 | furniture and snap queries (below) | an answer is due within one frame |
  | 2 | incoming deltas — edit deltas, band answers, live-layer deliveries — in arrival order; each O(changed marks), ≤ 1 MB per answer | a visible tile needing a band's marks cannot be rastered before its answer is applied, and a tile rastered before a pending delta that dirties it is rastered twice |
  | 3 | the visible view: S13b at the view's stop (§9.2); on the vector rung with a `path` sun, after a new light step, the `lit` crown bake (one sprite per unit) and §8.4's light-step pass; the visible tiles' raster jobs centre-out, their compositions and commits (§8.8); on rungs 1–2, after a tile's base, its surface layer with its pyramid and its light-map bake (one light per unit), then the next tile, and after the visible tiles the first ring's heights, then the ring blocks, nearest first, one block per unit (§8.8; their costs §12.7); re-compositions for label and `overlay` changes | the picture the user is looking at |
  | 4 | exports: first S13b at the export's stop over its transient list, its memo held by the job (§9.2, §11.1); in `lit` with a `path` sun on the vector rung, when the crown set of the request's light step is not cached, its bake (one sprite per unit), the set then held until the export completes; then, band by band, the band's raster jobs, its surface, its tiles' first rings and the blocks its block cache lacks (one block per unit) and the CPU reference light pass (64 rows per unit) when the export is lit, composition, read-back (64 rows per step) and encoding (§8.8) | an export waits for the view, never the reverse |

  A class runs only while every higher class is empty, one step at a time, and within a class the job in progress runs to
  completion before the next begins (at most one raster job per class live); a query waits at most one step, and a pan or
  zoom during an export pre-empts it within one step (newly exposed tiles are rastered at once, not behind the export's
  bands). **No starvation:** an export that has waited 100 ms since its last step runs its next step ahead of class 3
  (never ahead of classes 1 and 2) — at most one step in any 100 ms, ≤ 8 % of the worker — so an animated view (a
  `path`-mode sun, moving people, a live layer) slows an export but cannot stop it; a settle (§12.5) then contains at most
  two export steps at CITY and three at METROPOLIS, ≤ 16 and ≤ 24 ms. A newer sun step or a tile leaving the view cancels
  its job (latest wins; §8.4, §8.8). The export dialog shows the progress messages (bands done of total) and, while class
  3 holds the worker, that the export is waiting for the view (J-R46).

  **Placement and crown bakes are stepped like a raster.** S13b — the view's in class 3, an export's in class 4 — is a
  `PlacementJob` whose unit is one decision (§9.2), called with the queue's step limit; a crown bake is stepped one sprite
  per unit. A print's placement over its whole frame therefore runs as a few class-4 steps (§12.7) with queries, deltas
  and the view served between them, and every bound above holds while an export places its labels (J-R51).

  **Queries to the tile worker.** Compass, title and legend placement (§9.5) and the ruler's snapping read the display
  list, which only the tile worker holds; the main thread asks through the query rows above and the tile worker answers
  with `ObstacleSource.coverage` and `RoleIndex.snap` over its list — the implementations S13b uses (§14). A query is
  class 1: it runs at the next step boundary, so it waits ≤ 8 ms plus one native call or derived operation, runs in
  ≤ 4 ms of tile-worker time, and its answer arrives within one 16.7 ms frame; most tiles are one step (a city-band tile
  of a whole-CITY view rasters in ≈ 1.2 ms, §12.5). The ruler keeps one snap query in flight (a newer pointer position
  replaces a queued one) and shows the unsnapped point until the answer arrives; furniture placement is asked when the
  view settles, the furniture keeping its previous place until its answer arrives (J-R40). **Measurement** with the first
  map (M1 at TOWN and CITY, M2b at METROPOLIS) in B-CITY's browser runs: query round trip p95 ≤ 16 ms during a settle
  raster and ≤ 4 ms of tile-worker time per query, each tile's longest native call and derived operation logged beside it;
  exports beside the view are §12.7's run. **Pre-decided fallback:** the step limit falls from 8 ms to 4 ms (`step(4)`),
  halving a query's wait and an export step's share of a settle.

### 8.10 Decoration instances (trees, scatter, crowns, roof detail)

```ts
interface InstanceStyle { species?: string /* a species kind of the entity's mix */; crown?: number /* crown-library index */;
  scale?: number /* 0.5–1.5 */; tone?: number /* colour jitter, −1…1 */; leafType?: 'deciduous'|'evergreen';
  pinKind?: Pin['kind'] /* read only for a hood pin: the kind a restyle turns it into or an add creates (V01 §3.8.5; M5, file f item 421) */ }   // what a `restyle` or `add` override sets (§7.1)
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
  r₀ = 400 cm (≈ 162 points each at the textbook annulus, `fixall_rendering_r5_seamstrip.out`; ≈ 175–180 at the shipped
  annulus below, PLAUSIBLE until `plat/tools/stamptiles/` builds the asset), each point carrying a **progressive rank**
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
  (J-R42). **Sampling:** Bridson with k = 50 candidates, all evaluated, in the **candidate annulus** [r₀, (1 + a) r₀]
  on the torus the tile is, a = `poisson.annulus` = 0.1 — the thin annulus that packs the tile densely (provenance
  `ref:sampler annulus of MFCG 12710731, of NG 1.2.2, of VG 1.6.9 and of Dwellings itch 17195045 (code)`, P14; item 53; Bridson's
  textbook [r₀, 2 r₀], a = 1, is the alternative value, the one the measured receipts above used). Every accepted
  point is rounded at once to integer cm inside the 6 400-cm tile, so the spacing test is an exact integer comparison of
  squared toroidal distances with r₀². The first point is (`int(0, 6 399)`, `int(0, 6 399)`); the active point is
  `int(0, n − 1)` over the active list in insertion order, a retired point replaced by the list's last; each candidate
  lies at radius r₀ × (1 + a × `float01`) along angle 2π × `float01` (cosine and sine from `dmath`, §6.5), tried in draw
  order. **The band (creation index 4):** a full toroidal tile sampled as above, cut to its points with e < 200 cm, in
  index order. **Each tile (creation index 0–3):** the band's points pre-placed in that order (in the spacing grid and as
  the initial active list), sampling then continuing over e ≥ 200 cm — no first point drawn, a candidate with e < 200 cm
  rejected like one too close; the tile is the band's points followed by its own in acceptance order. **Ranking**, per
  tile: each point's energy is the sum over the other points, in point-index order, of exp(−d² ÷ (2σ²)) (d the toroidal
  distance in cm, σ = r₀, `dmath.exp`); the highest-energy point (tie: lower index) is removed and takes the highest free
  rank (n − 1 first), and every remaining point has the removed point's term subtracted, in point-index order — the
  **removal update**: ≈ 1.5 n² exponentials (n(n − 1) + n(n − 1) ÷ 2, O(n²)), never a re-sum per removal (O(n³):
  ≈ 53 ms per tile against ≈ 1.8 ms at 161 points, measured cost model; ≈ 2.2 ms at 178 points by the same n² law). A
  needed square root is `Math.sqrt`, exact by
  specification (§6.5 (2)). The crown library's shapes use `dmath` the same way, so only their rasterisation into
  sprites is engine-specific. A class's band and four tiles build in ≈ 19.5 ms at the textbook annulus (measured cost
  model, `fixall_rendering_r5_seamstrip.out`) and ≈ 24 ms at the shipped one (the n² law; PLAUSIBLE until the asset is
  built). The annulus changes the density of the packing, never the tile construction, the seam band or the ranking
  (J-R11, J-R48, J-R50, J-R55; J-A53.81).
* **The shipped asset.** `plat/assets/stamptiles/stamptiles.bin` holds, per stamped class in registry order, its four
  tiles — each self-contained, band points first: a point count, then per point x and y as int16 cm and its rank as u16
  (6 B per point, ≈ 1.1 KB per tile, ≈ 34 KB for eight classes) — with a header naming the asset version, the format
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
  junction) — jittered along and across the line the same way (tags `line.jitter.along`, `line.jitter.across`), rounded
  to whole cm; ordinal = i. Park paths are L3 `path`
  faces drawn by the path program, not instances.
* **Rank and band thinning (N-10).** Every instance has a normalised rank r ∈ [0, 1): a stamp point's progressive rank ÷
  its tile's point count; a `grid` point's the 32-bit bit-reversal of the Morton interleave of (u, v) ÷ 2³² (2-D van der
  Corput); a `line` point's the bit-reversal of i ÷ 2³² (J-R25). Band b draws the instances with r < s_b (city: none — the
  wood, orchard or green fill; district: 0.6; neighbourhood and finer: 1), so every coarser band is a subset of the finer
  for every layout: an instance keeps its position once visible and appears at most once in a zoom sweep (LC-20, VIS-5).
* **Per-instance look, keyed by (key, ordinal).** The species, drawn by its share from the entity's `Greenery.species` mix
  (inner or outer share by the point's distance from the edge; tag `crown.species`), picks the crown class; the crown
  index into the style's crown library, colour jitter and scale jitter ± 15 % are `RH32` draws over (render key, ordinal,
  the concern's salt) (tags `crown.index`, `crown.tone`, `crown.scale`), and `leafType` comes from the species when
  present, deciduous otherwise. Hatch phase and roof detail are keyed by the render key (tags `hatch.phase`,
  `roof.detail`). Nothing is keyed by band or interned handle. The **crown library** holds 20 crowns per class per style, built once
  per session from `rng.stream` keyed by the sheet's key (the hash of its id@version), `STAGE_VIEW`, the concern
  `style.crowns` with its salt, and the class and index i as the creation index (§6.1's structured components; the path
  form is a report rendering, §14), drawn as sprites. On rungs 1–2 of §8.4's ladder a crown sprite carries its albedo
  and writes a dome's normals into the surface layer, and the light pass lights it — one bake per style, whatever the
  sun (item 68). On the vector rung a `lit` sheet bakes its sprites per (style, light step): once with
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
  (§8.1, §8.9). A tree brush is a batch of instance events (COV-FTG-M04). A hood pin's **spacing** (the length the
  0.5 × spacing tests read) is `2 × clearanceM + sizeM[1]` of its `hood.pins` row (V01 §3.8.5); a hood pin's host entity
  is its `Block`, whose `overrides` field is §2.7's uniform one (M5; file f item 421).
* **Where it runs (N-4).** Instances are generated per tile in the tile worker from the `InstanceTable` row and memoised
  per (key, revision, style version) for the session; they are never written to the document except as overrides. The
  generation worker runs the same function on the same shipped tiles for entities carrying overrides (to resolve them)
  and for exports: the GeoJSON, glTF and CityJSON exporters call it at the finest band with overrides applied and write
  each instance's position, species, crown diameter and leaf type (§11.1; VN-158, XB32); the bench computes tree
  statistics from it (SCL-21). Budgets: §12.7.

### 8.11 Edges and combinations (principle (11))

Every outcome below is on §5's ladder (check, repair locally, retry that piece, simpler shape, substitute, leave out and
report — never a whole-map retry); the tests are census rows of §8.3's kind, registered by id in §13.2.

| id | mechanism at its limit | defined outcome and rung | test |
|---|---|---|---|
| T-ER-01 | the display list at the cap (§8.1): 35 000 buildings, the city band's marks, a METROPOLIS-cap export list (≈ 67 MB, §12.8) | sized by §8.1 item 6's per-mark figures; handles are 32-bit (never reached); a list over the tile worker's line takes R12-25's steps — check, then substitute (a configuration), reported | B-CITY at the cap: every band's list within item 6's figures + 25 %; 0 allocation failures |
| T-ER-02 | degenerate geometry at render time (§8.1–§8.3): S14 reads only committed kernel geometry, which holds none (§3.1; §5.1's general rule); an artefact that degenerates in a tile — a roof facet under 1 px, an inverted offset ring, a chain clipped to a point, a zero-length stair interval, a hatch over a zero-width facet | that draw is left out of the tile's sequence and counted in the census; a point symbol keeps its `minPx` (the 2-px floor); never an error — leave out and report | a fixture with a 1-cm roof sliver, a zero-length stair interval and a chain clipped to a point on a tile edge: every tile rasters, the counts reported, 0 errors, the seam rows of §8.3 pass |
| T-ER-03 | degenerate casters and slabs (§8.4): zero height, zero area, a slab whose top equals its underside, m ≤ σ_s | nothing cast; the slab dropped from the slab list; m ≤ σ_s is (c)'s stated window — leave out and report | CPU reference and GPU pass on the fixture: 0 shadow pixels from the degenerate casters; the rest equal to the render without them |
| T-ER-04 | the light's lifecycle (§8.4, §8.8, §8.9): save, load, undo, redo, regenerate, migrate | nothing of the light pass persists: its view keys persist with the view state (§2.9); surface layers, light maps, blocks, sprites and worker queues are caches keyed by §8.8's keys, rebuilt from the display list; a `LightSource`'s lifecycle is §2.7's and §7.4's | a lit CITY view saved and reloaded, an edit undone and redone, a scoped regeneration and a migrated document: every lit tile equal to a fresh render of that state |
| T-ER-05 | the city band's closing (§8.5 (2)) on a mass thinner than 2r, or a block with no footprint | the footprints stay unmerged; a mass under (2 px)² is a settlement dot; an empty block draws its `ground` — simpler shape | B-CITY-lite seeds with sub-pixel blocks: 0 masses closed across a drawn way, every structure a mass or a dot |
| T-ER-06 | the close-up and stage 3 at every rung (§8.6), THORP to the cap | every rung with a district opens its close-up at the neighbourhood band (a village rung its one district, §8.5's first map); a composition that fails the stage-3 contract draws the outline (§2.6; F-SKELETON's plain downgrade) — substitute, reported | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS fixtures opened at every band: every band draws; a forced contract failure draws the outline |
| T-ER-07 | an export with nothing to draw (§8.7): a frame over empty ground or beyond `bounds` | the paper, the furniture and the empty layer groups are written, the report saying so — never an error | each picture format over an empty frame: a valid file, the report line present |
| T-ER-08 | the pyramid at every rung (§8.8): stops and band entry are scales, the same at every rung; an empty tile is paper | every rung draws every stop; a frame smaller than the view shows paper beyond `bounds` | each rung from THORP to the cap swept through stops 0–34: 0 pops beyond B-ZOOM's bar, 0 errors |
| T-ER-09 | instances at their limits (§8.10): a face smaller than one spacing, a line shorter than one spacing, an override whose point left its host | zero instances (a valid set); the override orphaned and reported (J-R24) | fixtures of each: the empty sets drawn as their fill; the orphan reported |
| T-ER-10 | light × every physical feature (§8.4), at every rung each exists: cliffs and steep ground (the terrain field's heights and normals), rivers, coasts and moats (water at its level, no cast shadow; foam by shore class), bridges and raised ways (deck slabs, pier prisms), retaining walls (a step prism, shade on the low side only), deck plots (their buildings at the deck's surface height), squares (ground), an oasis (water at its level, the grove's crowns as domes), the frame's edge (the ray ends at `bounds`), terraced wards (terrain and retaining walls), V02's roofscape and crypts, V03's plans (the building band), V04's caverns, catacombs and voids (no global light: point lights, shafts, the lantern), V05's landfall (its fallen members as ground casters), village rungs (the same law) | one law for all; a feature a stage has not registered draws by its base marks | a fixture holding each feature at each rung where it exists, day and night, on each rung of the ladder: CPU reference = GPU within §13.4's tolerance, every shadow where (c)'s law puts it, 0 errors |
| T-ER-11 | labels × features (§9): cliffs and steep ground (no label effect; the plan view), moats and an oasis (`water` labels), raised ways (way labels along the raised way, as any way), retaining walls (unlabelled; not a protected obstacle), deck plots (their buildings' labels as any), the frame's edge (a candidate whose boxes leave the view's frame is not placed at that stop, rung (7) at the frame), terraced wards (district labels) | §9.2's greedy over the admitted candidates | the same fixture at every stop: 0 collisions, every label inside the frame |
| T-ER-12 | exports × features (§11.1): cliffs and steep ground (glTF's draped terrain, VTT `line_of_sight` cliffs), moats and an oasis (water bodies; `oasis`, `spring`), raised ways, retaining walls and deck plots (file f item 447's properties; V01-XCONF-2's VTT rule), the hinterland (`LandUse` faces in GeoJSON and CityJSON) | each by its format's row | the same fixture exported in every format at every rung: validators pass, every feature present with its properties |
