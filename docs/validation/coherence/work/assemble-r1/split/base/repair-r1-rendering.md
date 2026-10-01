=== REPLACE ### 8.1 The display list (renderer-independent, columnar, incremental) ===
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
  attrs: Record<string, Float32Array | Uint32Array>;   // named columns, 4 B per mark each: heightCm, baseCm, eaveCm, ridgeCm, prosperity, class, block, bankKind, waterKind, exposure, knownTo, concealed, worksStage, worksKind, material, tintKey, season (item 8), …
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
   model. Footprint geometry is identical in every band (O12 a; O17 i); only the marks emitted and the programs run differ.
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
   caster (item 68; J-A68.93)** of §8.4's *Shadow casters*: a tree line's `instances` mark, its city-band rank subset
   empty so that band draws none of its crowns (§8.5's line greenery, §8.10); a caster mark per base wing of a building of
   several, carrying its own `Heights` and drawn by no program there (a building of one wing casts by its footprint mark);
   and the caster marks of every composition's wings and towers and every close-up's casters the elaboration cache holds
   (§2.9, §8.6) — added in the `DisplayDelta` that answers the band request deriving them, removed with the cache entry,
   included in every full build, a composed building's replacing its base wings'. So the city band carries every caster
   any band draws, at the heights that band draws, and the ring blocks (§8.8) and `surfaceTopCm` read them from the one
   list the tile worker always holds.
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
   building's revision and so its roof; a changed boundary street dirties both its sides. **Every render-time hash** is
   `RH32(tag, key, salt[, ordinal or cell][, style id])`: a tag, an index into the
   fixed **render-tag table** — `role.<name>` (one per multi-colour role: its pick, §8.2), `weathering` (§8.2),
   `hatch.phase` (the `hatch` program), `ruin.dash` (the entity-keyed dash of the `ruin`, `trace` and dashed state rows),
   `stamp.variant`, `grid.jitter.x`, `grid.jitter.y`, `line.jitter.along`, `line.jitter.across`, `crown.species`,
   `crown.index`, `crown.tone`, `crown.scale` and `roof.detail` (§8.10), `wall.rubble` (g item 114), `crown.leaf`,
   `crown.early`, `leaf.cover`, `creeper` and `ice.crack` (g item 117), and `festival.place` (g item 118; §8.2), each read by
   the program it names (a new tag is appended, so no existing look moves); the **render key** `key` = the low 64 bits
   (words 0 and 1) of the entity key (§6.1), cached
   in the arena beside the lineage hash; the concern's salt (§6.1); and the style id only for looks (colours, crowns,
   hatch), never positions. `RH32`, the render hash (distinct from §13.6's string hash `H32`), folds the words through
   MurmurHash3's 32-bit finaliser and never reads the interned handle, which changes with interning order. The entity key
   is a pure function of model data, so an unchanged model renders pixel-identically after a reload (§6.2) and golden
   PNGs hold (§13.3); a render rule that orders entities (the tint colouring, §8.2) uses address order (§6.3). A look
   thus follows its entity's lineage and the seed (§6.3).
6. **Size (N-9 c).** 54 B per mark in the fixed columns, plus 4 B per mark per attribute column carried, plus the label
   and instance tables and geometry: a CITY city band of ≈ 60 000 marks is ≈ 3.2 MB of fixed columns, ≈ 2.6 MB of
   attributes (item 8's `season` column among them), ≈ 4 MB of coordinates and ≤ 0.5 MB of label, instance and string rows — ≈ 10 MB; the undrawn caster marks of item 2 add 54 B each and their coordinates, and the slab list (§8.8) 16 B per record and 8 B per outline vertex, both counted on B-CITY at M2b; its light rows add ≤ 36 B
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
   A concealed part's mark — a concealed room, the concealed entrance's tick, a concealed access point or link down
   (item 63; §2.6, II.7.4) — carries `concealed` = 1 and the concealed use's `knownTo`, drawn only for a viewer whose
   knowledge key admits that use at the band (§9.2; the key then joins the tile key, §8.8); the building's mass and every
   public part carry the building's own `knownTo` and always draw. **A light draws only where its host
   draws (items 63 (c), 64, 68; J-A63.82).** A `light` mark carries its host mark's `concealed` and `knownTo` columns, so
   the light of a concealed room, a lit window of one, a `LightSource` hosted by a concealed part, an `AccessPoint` or an
   `UndergroundLink` (II.7.4, II.7.6) and such an access's shaft (§8.4 (b)) reach the light pass, the light-map bake, the
   vector rung's `glow` and every export's lights (§11.1) only where their host draws at the band under the viewer's
   knowledge key (§9.2; §8.2's `access` and `link` rows), that key then joining the tile key and the
   light-map key (§8.8); a key that does not admit the host sees none of their light, glow or shaft, while a light
   whose host always draws always lights.
8. **The year position (g item 117).** The display list holds no season: S14 writes, once and for every week, each
   mark's `season` column — in its low 16 bits the index of its V11 `season.surfaces` row (land-use, green, garden,
   orchard, vineyard, wood and crown marks), in its high 16 its ice kind (water marks, by §8.2's mapping), ~0 where it has
   none — and emits the `water.lead` marks — chains along a river's stretches whose course falls 2 m per km or more and
   along each water mill's frontage reach, and 12 m discs at spring points and outfalls — read only while their water is
   drawn frozen; the tile worker applies the week's looks (§8.2's season rows), so a change of the year position re-skins
   tiles and emits nothing, and no digest moves.

Judgment calls: J-R1, J-R2, J-R19, J-R20, J-A67.81, J-A67.83, J-A63.81, J-A63.82, J-A68.90, J-A68.93.
=== END ===

=== REPLACE ### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2) ===
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
    an `AccessPoint.state` (II.7.4; item 64); a gallery's or chamber's system kind with its state (II.7.6; item 65); an `UndergroundLink.kind` (II.7.6; item 65);
    a run's `Enceinte.condition` (§2.7; g item 114), the row then drawing that run of the trace alone */;
  worksKind?: WorksRow['kind'] /* the row matches only a target whose running Works is of this kind (§8.1's `worksKind` column) and is an `override` laid over the row the stage resolves without it (J-A67.83) */;
  bands?: LodBand[] /* absent: every band the kind is drawn at */; paint: 'replace'|'override'; programs: PaintProgram[];
  legend?: string /* the row's legend entry, a catalogue key (V09 §4.9) §9.5's legend draws while a mark in that state is on the map: the wall runs' `legend.wall.<state>` (g item 114); absent: no entry */ }   // replace: drawn instead of the entity's programs; override: the row's tone, alpha, glyph and roof-construction changes laid over them
```

**Roles.** `paper` (margin, background), `road` (way bodies, squares, bridges; = `paper` in the ink family, so streets
are negative space), `ground` (built-block ground, yards at the city band, settled ground), `court` (enclosed in-block
courts), `garden` (private planted yard parts), `green` (parks, greens, commons, churchyards), `tree`, `field`, `verge`,
`water`, `building`, `roof`, `wall`, `ink` (every outline and text), `label`, `shadow`, `ambience`, `light`, `sand`,
`plank`, `grid`, `snow`, `glow`; the wall-material roles `wall.dry_stone`, `wall.earth_bank` and `wall.timber_crib` (item
110 (a); file f item 412); `furniture` (the plan draw's furniture, V03 §5.1; M6-P); `rock` and `void` (the underground's
halo and floors, V04 §5; M6-U); `sky.ground` (a sky island's land, never `ground` itself, V05 §5.1; M6-sky); the
wall-condition role `wall.worn` and the six **patch looks** `patch.timber`, `patch.wattle`, `patch.earth`,
`patch.drystone`, `patch.stakes` and `patch.brush` (g item 114; each row of V11's `walls.patchMaterials` names its look);
the season roles `ice` and the eight **leaf colours** `leaf.gold`, `leaf.amber`, `leaf.orange`, `leaf.scarlet`,
`leaf.crimson`, `leaf.russet`, `leaf.bronze` and `leaf.brown` (g item 117; V11's `season.leaf` weights name them); the
festival roles `festival.a`, `festival.b`, `festival.c`, `festival.d` and `festival.sacred` (g item 118; V11's
`festival.motifs` rows name them, never a colour). A role never
changes meaning across the bands or the presets of one family; the reference schemas (MFCG 13 keys, NG 26, VG 40) map
onto it without loss. **The light roles (item 68):** `shadow` is the vector rung's shadow tone (the ink at the family's
alpha); `ambience` the vector rung's night wash and the two-tone roof's dark mix; `light` a lit window's or a light mark's
glyph tone; `glow` the vector rung's glow sprite. On rungs 1–2 of §8.4's ladder the light pass computes light over
the albedo instead of those tones. **Night variants:** the vector rung reads a role's `@night` value when the view is
night (rungs 1–2 light the day albedo, so a family's night is its day palette under the night's light); a sheet may state
it, else it is derived — the day value in linear light × 0.4, mixed 20 % toward `ambience` — `ink`, `label`, `light` and
`glow` keeping their day values (labels are composed after the light, §8.4 (f)). `tree@autumn` serves only the season
rows' off form (below).

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
| ice / water (frozen water reads apart from open water and its leads) | 10 | 8 |
| ice / road; ice / ground | 6 | — |
| patch.* / wall (a patch reads apart from the wall it mends, beside its narrower strip and its pattern); patch.* / ground | 8; 10 | — |
| leaf.* / water (fallen leaves on still water); ink / leaf.* (crown outlines, as ink / tree) | 10; 25 | —; 30 |
| festival.* / road; festival.* / ground | 15 | — |
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
| wall.worn (`wall` lerped 40 % toward ink, linear light) | `#2D2219` (= wall: its notches carry the state) | `#716250` | `#5F4932` |
| patch.timber / .wattle / .earth / .drystone / .stakes / .brush | `#B39B78` / `#BAA27E` / `#B8A380` / `#60584D` / `#A79070` / `#ABA77F` | `#A78F75` / `#A88F72` / `#A39175` / `#9C9280` / `#A59077` / `#99956A` | `#A6835A` / `#BBA080` / `#9B8668` / `#998871` / `#A28562` / `#B9BF98` |
| ice | `#DCE6EA` | `#C9E1EC` | `#D3E5EC` |
| leaf.gold / .amber / .orange / .scarlet / .crimson / .russet / .bronze / .brown | `#DEC489` / `#D5A878` / `#CE946F` / `#BB7366` / `#B5696B` / `#B6775D` / `#BD8C61` / `#A3785B` | `#D2AC3F` / `#D18D32` / `#D07432` / `#C24B3B` / `#B5444E` / `#AA5E3E` / `#A97649` / `#8D6448` | `#DDB749` / `#DD973D` / `#DC7E3C` / `#CE5544` / `#C14F57` / `#B56848` / `#B48152` / `#986E51` |
| festival.a / .b / .c / .d / .sacred | `#9E5652` / `#A38852` / `#15719F` / `#3C8463` / `#60578D` | `#B94142` / `#AD8617` / `#0872A1` / `#26865E` / `#605790` | as `lit` |
| furniture; rock; void; sky.ground | ink at α 0.5; V04 §5 (the 40 %-ink cross-hatch at 1.2 paper px); `paper`; one step lighter than `ground` | a wood tone of the sheet (`plank`); V04 §5 (a dark stone fill); V04 §5; `ground`'s albedo | ink at α 0.5; V04 §5 (its dense hatch); V04 §5; the patch tone (V05 §5.1) |

The matrix's snow, sand, plank and grid rows pass on these values (snow / road ΔE2000 10.7 / 12.6 / 25.1, ΔL* 6.8 / 16.1
/ 30.1 in `ink` / `lit` / `hatched`; sand / water ≥ 29.0; plank / water ≥ 28.5; `tree@autumn` against water, green and
ink ≥ 21.2 / 21.2 / 38.3; each wall-material role against water ≥ 28.5; computed by our CIEDE2000 on the sRGB values, the
loader re-checking them). The rows of items 114, 117 and 118 are placed by rule (`docs/validation/bench/
coh_repair_rendering_r1_palette.out`): a patch look is its material's tone (`plank`, a wall-material role, or `tree`, lerped
toward `ground` or `ink` by look) lifted toward `paper` until its L* is the wall's + 15, then darkened, hue and chroma kept,
to the lightness at which its grey ΔE2000 against `ground` is 11 where it would pass it (the wall states' greyscale bar,
below); a leaf colour its name's CIELCh hue at the family's lightness, its chroma under the family's cap (`ink` 34, the
others 60); `ice` a pale blue-grey; the festival roles five hues at L* 40–58 under the same caps. Their pairs pass: ice /
water ≥ 13.7 (ΔL* ≥ 15.9), ice / road ≥ 13.7, ice / ground ≥ 16.3, patch.* / wall ≥ 8.5, patch.* / ground ≥ 11.8,
leaf.* / water ≥ 32.0, ink / leaf.* ≥ 26.9 (ΔL* ≥ 30.9), festival.* / road ≥ 16.7 and / ground ≥ 18.9.
`ink` keeps its character by value steps (O12's restraint: one ink, 4–8 roles): eight city-band colours — paper
(= road), ground, building, ink (= wall = label), water, green, tree, field; courts drawn as `ground` at the city band
(§8.5); the raised under-copy and the vector rung's shadows the ink at an alpha, and its light a change of value only
(`LightingSpec.mono`, §8.4); no role above CIELAB chroma 34 (`field` highest, 33.3) — the cap the palette targets set
(below; J-A69.82); walls in ink and courts as ground at the city band (J-R28, J-R29).

**Palette targets — the owner-opened corpus bands (item 69; owner: "Adopt the corpus measured color targets"; J-A69.81 –
J-A69.84).** These bands of the corpus's measured palette, released by the owner (item 69 (a)), are the only corpus
content in this design: every other corpus fact stays with the staged calibration phase (§13.9), and the program reads no
corpus file (the bands came as figures within the owner's item). They are **targets** — bands a rendered plate must land
in — never a palette to copy; the role values above are our own, placed inside them.

| axis | the measure (our definition, J-A69.81) | band | target | provenance |
|---|---|---|---|---|
| paper lightness | the Rec. 601 luma of the median 8-bit sRGB colour of the pixels whose top mark (the pick buffer) is `paper` | 226–244 | 235 | `corpus`, "owner-opened corpus palette exception, 2026-09-27 (item 69)" |
| paper warmth | R − B of that median colour, in 8-bit sRGB units | 20–50 | pinned at 36 | the same |
| darkest ink | the Rec. 601 luma of the darkest 0.5 % of all pixels ("full ink") | ≤ 45 | — | the same |
| ink warmth | the mean R − B of those pixels | 15–25 (our tolerance) | 20 | the same; the tolerance `own` |
| plate chroma | the mean CIELAB C*ab (D65) over every pixel | 18–70 | median 43; `ink` 20–30 (J-A69.82; J-C2) | the same; `ink`'s range `own` |

**Where they bind.** Every shipped family's paper and ink take the paper and ink targets (J-A69.84), hence one paper
value for all three. The `ink` family's other roles keep their L* and hue and take the least chroma scale whose plate
chroma reaches 20, never past 30 — MFCG's restraint in the default map, the corpus's colour at its lower range
(J-A69.82; J-C2); `lit`, `hatched`, `parchment` (a shipping ink-family variant of the presets table, the one exception
to `ink`'s 20–30) and the reserved `painterly` aim at the median (43), each by the chroma scale nearest it that clips no
role in sRGB and puts none above C* 60 (J-A69.83) — on today's values `lit` ≈ 29 and `hatched` ≈ 30, inside the band,
short of the median. The dependent roles (road = paper, ground, court, field, building, the shadow alpha) move with them,
and the bounded repair's L* steps re-check every contrast-matrix pair, leaving the new warmths as they are. The plate
figures are a **plate model**'s — the city-band role shares of a plate-framed render, stated in the receipt — PLAUSIBLE
until the **measurement render** confirms them: a fixed render of the `ink`, `lit` and `hatched` families at
plate-equivalent resolution and framing (§13.3's golden TOWN and CITY framed by §9.5's rule at 300 dpi on A3, labels and
furniture on, default view, day, no pointer), measured on the resolution-stable axes only (paper luma and warmth,
darkest-ink luma and warmth, plate chroma) by our own code written from the definitions above — no corpus instrument
enters `plat/`. A scripted sweep re-finds each family's chroma scale on that render at the milestone that ships its four
bands (`ink` at M1, where its values ship, and M2b; `lit` at M2b; the ink-family variants at M3b; `hatched` at M5;
§13.4's bar), re-signing the table's values. The corpus's own instrument measured the bands, and its definitions are
beyond this program's reach: a definitional mismatch is re-signed at the reconciliation stage (§13.9), never by opening
the corpus earlier. MFCG parity stays judged by style class (the `MFCG` preset needs no MFCG colours), and §17.1 (5)'s
palette audit — no three colours within ΔE2000 2 of a reference palette — compares with the references' palettes only
(the corpus is the owner's material, no reference).

**Symbolisation table (VIS-1).** Drawn width px = clamp(k × model width × px per metre, minPx, maxPx) in `model` mode, or
a fixed paper width at 1× (× the device pixel ratio) in `paper` mode; no length is written in any reference's private
unit. Exaggeration never enters the model, GeoJSON, VTT, glTF or CityJSON (model widths); styled SVG and PNG carry drawn
widths. The `ink` rows are calibrated on MFCG's metre-unit export at the matched view scale (MFCG size 40 at 0.816 px/m,
1.23 m/px): walls 7.6 m wide, towers 15.2 m across, road cores 8 m, piers 4.8 m; its SVG writes them in its 4 m internal
unit (wall 1.9, road 2) (MN-1, MFP-8).

| semantic | bands | mode | rule | at MFCG size 40's scale |
|---|---|---|---|---|
| `wall.curtain` | city, district | model | k = 3 on each run's thickness — the enceinte's `thicknessCm` on a `full` run, the thickness its `walls.barriers` row gives on a `parapet` run (`stretchClass`, §2.7, §4.8), read along the trace by `sampleProfile` (§3.4) — 2.5 m → 7.5 m on a `full` run; minPx 2, maxPx 12 | ≈ 6.1 px (MFCG 6.2) |
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
| harbour-mouth chain (`Gate.mouth`, §2.7; g item 106 (e)) | district and finer; its towers at every band | paper | between the `water` gate's two towers, by the era row's `harbourChain` (V11's `EraRow`): `raised` — a solid line across the entrance in `wall` at ½ the drawn wall width (minPx 1), drawn with the gate (slot 19); `lowered` — the same line dashed (2 px on, 2 px off) in slot 7, under the shore marks and everything above the water | — |
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
family's spotlight vignette, drawn per mark in its slot; distinct from the post operation `edgeFade`);
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
`wallPatch(look)` (g item 114: a patched run's strip in its look's role and pattern, the wall rows below); `iceFill`,
`leafCover` and `creeper` (g item 117's season rows, above);
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
407), `unexcavated` (g item 109 (j) (2): dashed kerbs at 40 % alpha, no fill, no light; drawn for an `unexcavated` cluster
only for a `secret` key while the view key `showUnexcavated` is on, and for a `lost` cluster for every key that admits
its elements, whatever `showUnexcavated` (V04 §5.2; g item 113 (e)); M6-U) and `chamber` (a chamber's floor, the undercity's in
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

**Materials and weather (COV-FTG-F20, K06).** Override rows may key roof and wall colours by `roof.material` and the
enceinte's wall material. A material is a rendering attribute only (§2.6; item 19): its rows change colour and texture
roles, never a mark's geometry, so a `setAttr` of a material re-keys the same marks' look and moves nothing.
**Wealth in the roof's colour, as FTG draws it (§2.6; items 19, 23; J-A19.81).** The `lit` family's default sheet keys
the `roof` role by the building's prosperity band — one override row per band of `prosperity.bands` (§4.5), keyed by the
band's name and read from the mark's `prosperity` column banded by §4.5's rule (the field, as labels and descriptions
read it; never `builtBand`, below) — the richest roofs the deepest clay, the poorest the greyest: `rich` `#C17C46`,
`prosperous` `#C08051`, `comfortable` `#BD855B` (the role's own value), `modest` `#BA8765`, `poor` `#B48B6E`, `squalid`
`#AF8E78` — our own calibratable rows, moved by `lit`'s chroma scale with its role values (item 69;
`amendc_rendering_palette.out`), each passing, as the loader checks, every contrast-matrix pair of the `building` role
whose value the lit roof side shares (ground, road, garden, green, ink). In `lit` the material picks the roof's
`pattern` texture and the band row its tint, so the two never contend; a sheet that also keys a roof colour by material
applies it after the band row; a band without a row takes §4.5's interpolation between the nearest rowed bands. `ink`
keeps MFCG's one roof role and `hatched` NG's two tones. The retaining walls' material roles (`wall.dry_stone`, `wall.earth_bank`,
`wall.timber_crib`) are picked by `RetainingWall.material` (V11's `MaterialRow` key) as the wall-material rows are. The
view key `weather` ∈ {clear, overcast, snow} (§2.9): `snow` lays the `snow` role over ground, fields and roofs while
`road` keeps its value; `overcast` removes the global light's direct term — its shadows go, the ambient and the
occlusion stay, and on the vector rung projected shadows are off (the raised under-copy stays). The model and its hash
are untouched.

**Seasons (g item 117; J128): a look, never a change of the map.** The view's season is its **year position** — §2.9's
`yearWeek`, 0–51 from the first week of spring on SettlementForge's grid (spring 0–12, summer 13–25, autumn 26–38,
winter 39–51; the named seasons the picks of their middle weeks 6, 19, 32 and 45) — which follows the dossier's week
under §2.9's follow flag (§7.7's DR42) and is midsummer, 19, standalone; the look reads it with the biome's climate row
and its season columns (§4.2 S0, §10.2; V11 §3.25.6: the winter's severity and the bands of weeks of leaf colour, leaf
fall, blossom, growing, harvest, hay, ice and snow, a band wrapping the year's end when it starts after it ends; DR42's
height correction). Nothing below moves, adds or removes a mark's geometry or reaches a model value, a digest or a
save; the tile worker draws it from the display list (§8.1 item 8), so a week change re-skins tiles (§8.8's key; §12.5)
and re-emits nothing.
* **Surfaces through the year (item 117 (f)).** Each land-use, green, garden, orchard and vineyard face, each wood floor
  and each deciduous crown and hedge reads the V11 `season.surfaces` row its `season` column names (§8.1 item 8): at week w,
  the look of the row's last phase whose week — its anchor band's end, plus its offset — lies at or before w, read
  cyclically; a village field by its crop and rotation slot, its strips offset strip by strip (V07 §5.1). The looks,
  each a linear-light lerp of the family's own roles (our own, calibratable):

  | look | paint | pattern |
  |---|---|---|
  | `field.sown` | `ground` lerped 30 % toward `green` | drill rows: 1-px `field` lines every 3 px along the field's long axis |
  | `field.green` | `field` lerped 60 % toward `green` | — |
  | `field.ripe` | `field` | — |
  | `field.harvest` | `field` | stooks: 2-px `plank` dots in rows every 6 px |
  | `field.stubble` | `field` lerped 35 % toward `paper` | stubble rows: 1-px `field` lines every 3 px |
  | `field.ploughed` | `ground` lerped 18 % toward `ink` | furrows: 1-px lines every 3 px in `ground` lerped 30 % toward `ink` |
  | `meadow.green`, `grass.green`, `garden.green`, `orchard.leaf`, `vine.leaf`, `crown.leaf`, `wood.floor` | the mark's own role | — (the map as drawn) |
  | `meadow.high` | its fill lerped 25 % toward `tree` | tall-grass ticks: 1 × 2 px every 4 px |
  | `meadow.mown` | its fill lerped 40 % toward `field` | swaths: 2-px lines every 6 px |
  | `meadow.winter` | its fill lerped 55 % toward `verge` | — |
  | `meadow.dry` | its fill lerped 60 % toward `sand` | — |
  | `grass.autumn` | its fill lerped 45 % toward `field` | — |
  | `commons.bracken` | `green` lerped 45 % toward `leaf.russet` | bracken: 2-px `leaf.russet` ticks every 4 px |
  | `garden.bare` | `garden` lerped 55 % toward `ground` | — |
  | `orchard.blossom` | the crowns | 1-px `paper` dots over 30 % of each crown |
  | `orchard.fruit`, `vine.fruit` | the crowns; the vine rows | 1-px dots over 15 %, in `leaf.scarlet` (orchard) or `leaf.crimson` (vine) |
  | `orchard.colour`, `vine.colour`, `crown.colour` | each crown's leaf colour (below) | — |
  | `orchard.bare`, `vine.bare`, `crown.bare` | the bare-crown symbol in `tree`; a vine's rows as their stakes | — |
  | `wood.floor.leaves` | the wood's fill | the leaf cover (below) |

  "Its fill" is the face's own role (`green` or `field`, as the sheet fills that land use). A look stands where its role
  stands, so it takes that role's matrix rows — a field look the field / road and field / ground pairs, a meadow or grass
  look those of its fill, a garden look the `garden` ones, a crown look the `tree` ones —
  checked as the palette is; every look passes on the shipped families
  (`docs/validation/bench/coh_repair_rendering_r1_looks.out` (B)).
* **Autumn's covers (item 117 (f2)).** Through the leaf-colour band each deciduous crown — §8.10's instances whose
  `leafType` is deciduous, a hedge's, an orchard's, a vine's and a creeper's included — takes its own colour: the keyed
  draw `RH32('crown.leaf', key, salt, ordinal)` picks one of its species' `season.leaf` colours by weight, drawn in that
  `leaf.<colour>` role (a species with no row is evergreen and keeps its look all year); a crown stays green while
  `RH32('crown.early', key, salt, ordinal)` ÷ 2³² is under `earlyGreenShare` × (1 − t), t the share of the leaf-colour
  band elapsed up to its middle week (none past it). From the leaf-fall band's last third the crowns thin: each is drawn
  at alpha 1 − f over its bare-crown symbol, f rising from 0 to 1 across that third. **Fallen-leaf cover** lies by V11's
  `season.cover` rows on the marks of each surface — `underTrees` (a deciduous crown's footprint × 1.5), the way bodies
  of `street` and `lane` classes, green and lawn faces, garden yard parts, churchyard faces, roofs, and still water (the
  `pond`, `moat`, `millpond` and `lake` water marks): on a world-aligned grid of 1.5 m cells, a cell within the row's `driftM` of a
  deciduous crown (or under one) takes a 1-px leaf dot where `RH32('leaf.cover', key, salt, cell)` ÷ 2³² is under the
  row's share — `start` at the first leaf-fall week rising linearly to `end` at the last, then fading to none over
  `fadeWk` weeks, none while snow lies — × `edgeFactor` within 1 m of a wall line or a kerb; the dot takes the nearest
  deciduous crown's leaf colour, so the cover deepens week by week and gathers at walls and kerbs. **Creepers:** a
  building whose draw `RH32('creeper', key, salt)` ÷ 2³² is under 0.15 carries a creeper along its longest street-facing
  wall at the neighbourhood band and finer — in `green` through the leaf weeks, in its `season.leaf` creeper colour
  through the leaf-colour band, gone when bare. Bracken goes rust and stubble gold by their looks above.
* **Water in winter (item 117 (e)).** Each water mark's ice kind (§8.1 item 8's `season` column) — `pond` for a pond,
  an oxbow or a ditch; `moat`; `millpond` for a canal (a leat or a mill cut); `lake`; `slowRiver` for a river,
  tributary, distributary or islet channel whose course falls under 0.5 m per km on average, `river` for the rest;
  `harbourEdge` for a harbour basin; `seaShore` for a sea's or an estuary's `sheltered` shore segments (§8.1 item 2's
  exposure); none for a water body carrying a `spring`, an oasis, which never freezes — is frozen at week w when the climate's winter is at least its
  `season.water` row's `freezesFrom` and w lies in the climate's ice band shortened by the row's `lagWk` at each end
  (V11 §3.25.6), so still water freezes first and flowing water last; a `harbourEdge` freezes within 20 m of the basin's
  shore and a `seaShore` within 30 m of its segment, the rest of that water staying open (our own cells). A frozen face
  draws by `iceFill`: the `ice` role, crack lines — 1-px hairlines in `water`, three per 1 000 m² of face, each a
  three-segment polyline keyed by `RH32('ice.crack', key, salt, k)` — and, while snow lies, a `snow` stipple over 30 % of
  it. **Open leads** stay water over the ice: S14's `water.lead` marks (§8.1 item 8) — a river's stretches whose course
  falls 2 m per km or more (its fast current), each water mill's frontage reach (its weir and race), and a 12 m disc at each
  spring point and each outfall (§2.3; II.7.3) — drawn in `water` with a ragged rim. **Boats** (§8.10) are drawn hauled
  up on the bank while their water is frozen.
* **Snow and the sun (item 117 (g)).** While a viewer has set no `weather`, it is `snow` in the climate row's snow band
  when the winter is `cold` or `severe`, and `clear` otherwise — an arid row never snows by default; a viewer's value
  stands until the viewer changes it. The view sun's default height follows the week (§8.4's *Sun*); item 102's model
  daylight never does.
* **Checks and the off form.** Every look, leaf colour and the ice pass the contrast matrix (above) in every family; a
  season changes no legend meaning — its colours are looks, never legend categories — so the deficiency variants need
  nothing new and every colour-coded category keeps its second cue in every week. A document whose pinned tables hold no
  item-117 season rows (V11's off form) draws the four named seasons' override rows by the season its year position
  falls in — autumn re-skins deciduous crowns (by `leafType`, deciduous when absent) by `tree@autumn`, winter draws the
  bare-crown symbol in `tree`, spring and summer the map as drawn — and keeps the sheet's sun.

**Post operations (K07; `PostOp`).** `greyscale`, `sepia`, `wash(colour, strength)` (a whole-tile tint), `edgeFade` (the
view's vignette), `pixelate(cellPx)`, `dotScreen(cellPx, angle)`, `scanline(periodPx, alpha)`,
`crosshatchNoise(periodPx, alpha)` — named apart from the per-mark programs `tint` and `vignette` — each applied once to a
tile's base picture (slots 1–20, below), never to the labels, live overlays and furniture composed over it: by Canvas2D
in the tile worker after the base's marks (≈ 1–2 ms per 512² tile) where the light pass does not run, after it where it
does (§8.4 (f)'s order), so no light re-colours a greyscale, sepia or tinted base. The cell operations (`pixelate`,
`dotScreen`) take their cells and weights by §8.4 (f), so a view and an export of one frame agree. PNG export applies
them per tile; SVG carries greyscale, sepia and wash as one colour-matrix filter over its lit base (the wrapper group of
§11.1's SVG row) and omits the pixel operations, which the export report lists.

**Live layers (K13, N-4).** `interface LiveLayerProvider { id: string; target: 'base'|'overlay'; readsElaborations?: boolean; marks(view: ViewState, model: ModelView, region: Box, elaborations?: readonly ElaborationRecord[]): MarkTable }`
adds display-list groups that are view data (never hashed). Providers run in the generation worker, which calls one when
the view state it reads, the model, the visible region (dilated by one tile) or — for a provider declaring
`readsElaborations`, such as `live.stale` — the elaboration records (`Document.derived.elaborations`, §2.8, §2.9; passed
as `elaborations`) change, so a click that writes only the cache (§7.3) re-runs it; it delivers its marks as a
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
a dashed ghost from the earlier frame, `.changed` as a tint; M6-E); `live.people` (overlay: favourite persons' positions
from the occupancy at the view-state hour, one categorical colour per person; registered by the simulation module
through §14's `LiveLayerProvider` registry, §10.3); and `live.festival` (base; g item 118: the festival decorations,
below). The model view a provider receives offers
`fieldDriver(id: 'daylight'): { cellCm: number; origin: PointCm; w: number; h: number; values: Uint8Array }` — the
field's driver raster as §4.5 holds it, or computed on demand by g item 102 (a)'s sampler and cached per document state
when the field skipped it; read-only (file f item 411). A ghost a clerk's `preview` delivers carries `source: 'clerk'` and
draws the AI mark beside its count badge (R19; file f item 518).

**Festival decorations (g item 118; J129): a look, never a change of the map.** While the view's year position (the
season rows above) lies in a festival's weeks, the base live layer `live.festival` draws its decorations: the festivals
are §7.7's DR43 schedule of the dossier's `traditions` (each with its weeks, kind, staging places and deity, a window
wrapping the year's end when it ends before it starts) and the festival display is §2.9's (following the schedule, off,
or previewing one festival — standalone, one of V11's `festival.generic` rows); nothing reaches a model value, a digest
or a save, and with no festival shown nothing is drawn, the tiles byte-identical to the map without the layer (the
no-op pin).
* **What, by tier and band.** The rows of V11's `festival.decorations` for the map's rung (§10.2's shape; V11 §3.25.7),
  `SKY` on a sky island's land (V05): each tier draws its own rows and never a larger tier's, each from its row's `band`,
  the coarsest it shows at; a row with `alt` is one choice per festival, by `RH32('festival.place', the town root's key,
  salt, H32(festival id))` ÷ 2³² against its weight.
* **Where.** A row's place, as DR43 resolves the festival's staging (V11's `festival.staging` keywords, else its kind's
  `fallback` row; a place the dossier names wins), stands on the map as:

  | place | where it stands |
  |---|---|
  | `heart` | the root reservation's square (§4.2 S3); at a village rung V07's heart |
  | `square` | the main square (the root plaza); a staging `hall` key's square before the hall |
  | `market` | the market squares, highest `rank` first (§4.2) |
  | `green` | the greens, largest first; at a village rung V07's green |
  | `church`, `temple`, `deityTemple` | the plot of the largest church, or temple, use; `deityTemple` the festival deity's temple where one stands, else `temple` |
  | `waterfront` | the `quay` shore runs and the landings, with their boats (§8.10) |
  | `gate`, `gates` | the gates on `through` and `primary` ways |
  | `fairField` | the fair field where one stands (V07), else the largest green outside the walls |
  | `castle` | the castle's bailey |
  | `fieldEdge` | the edge of the arable land nearest the green |
  | `processionRoute` | the procession route: the shortest path on the part-0 way graph from the festival's religious place (`deityTemple`, else `church`) to the main square, along `through` and `primary` ways where they connect, ties broken by address order |
  | `doors` | the `main` entrance ticks along the main ways within 150 m of the heart |
  | `churchLane` | V07's church lane, else the shortest way from the church's door to the green |
  | `towers`, `walls` | the enceintes' towers and their `standing`, `worn` and `patched` runs |
  | `hall` | the front of the town hall's or guildhall's plot |
  | `mainWays` | the `through` and `primary` ways |
  | `boats` | the boats at the waterfront (§8.10) |
  | `rims`, `landings` | a sky island's rim chain and its landings (V05) |

  A place that does not stand takes the next of its kind's fallback places, and the heart when none stands.
* **Placement, keyed and stable.** An item's count is a keyed draw in its row's `count` range per its `per` unit (per
  place, per 100 m of run, per square, per tower, per boat). A point item — maypole, bonfire, stall, table, pavilion,
  stage, a garland at the heart — takes, in rank order, the cells of a 3 m world grid inside its place's face less 2 m
  from its edges, less every way's carriageway and every gate's passage (its opening and 4 m along its way each side),
  ranked by `RH32('festival.place', the place's render key, salt, H32(festival id) + 64 × item index + ordinal)`; a place
  too small for its count takes as many as fit and the count left out is reported in the view telemetry. A run item —
  bunting, lantern strings, lanterns, banners lining a way, garlands on doors, pennants along walls and rims — stands at
  its spacing along its chain from an offset drawn the same way; bunting spans a way from front to facing front, above its
  carriageway; banners and pennants stand on their gate, hall, tower or wall run. The seed (through the render keys), the
  festival's id and the place fix every decoration, so a festival draws the same in every view and export (byte-stable
  tiles per seed), and two festivals in one week both draw, in window order.
* **The glyphs** (our own; drawn in the festival's two colour roles, alternating along strings; each at least 3 px at
  1×, not drawn coarser than its row's band): `garland` a swag of five motif beads (3 m); `bonfire` a stacked-wood disc in
  `plank` with a flame star in the first role (3 m); `maypole` a 1 m disc with six ribbons 4 m long; `bunting` a line
  hung with triangular flags every 1 m; `stall` a 3 × 2 m rectangle under a striped canopy; `table` a 4 × 1 m `plank`
  rectangle with bench lines; `banner` a 1 × 2 m panel on a pole tick bearing a motif; `lanternString` a line beaded
  every 2 m; `lantern` a 1 m dot in a ring; `pennant` a 2 m triangle on a pole tick; `pavilion` a 6 m disc with radial
  seams; `stage` an 8 × 5 m `plank` platform with a front step; `boatDecor` a pennant on a boat's mast; `routeColour`
  the route's way bodies overlaid in the first role at α 0.5 with chevrons every 20 px along the route. **Motifs and
  colours:** the culture's `festival.motifs` row (`site.culture`, else `mixed`) gives the motif glyphs and the two
  colour roles — `festival.sacred` replacing them for a festival that names a deity — and the year position's
  `season/<name>` row adds its motifs; banners, pennants, pavilions and stall canopies carry a motif, and garlands and
  bunting string them, cycling the culture's then the season's by a keyed draw. The motif glyphs: `wreath` a ring of six
  dots; `ribbon` a bow; `knot` an interlace; `laurel` two leafed arcs; `lanternPierced` a dotted ring; `garlandFlower`
  and `flowers` five-dot flowers, strung or scattered; `canopy` a scalloped edge; `lanternPaper` a ribbed oval; `streamer`
  a wavy tail; `sunDisc` a rayed disc; `pennantSwallowtail` a forked pennant; `sheaf` three strokes tied; `evergreenBough`
  a feathered stroke.
* **Read without colour; never over a label or a passage (item 118 (c), (f)).** Every decoration is told by its glyph
  shape and the route colour by its chevrons (the colour-deficiency table above); the colours name no legend category.
  Nothing is placed in a gate's passage or stood on a carriageway, and the layer draws in slot 19b, under slot 23's labels
  and their halos (§9.4), so no decoration covers a label. Decorations add no light: the lanterns are glyphs (§8.4's
  lights are §2.7's records and the derived ones).
* **The layer.** `live.festival` runs in the generation worker (*Live layers* above) over the model (the places, the
  way graph, walls, towers, gates, the boats by §8.10's function), the view state and DR43's schedule; it delivers
  `glyph` and `ribbon` marks of semantics `festival.<item>` for the visible region dilated by one tile, re-run when the
  year position crosses a window's edge, the festival display changes, the model changes or the view moves — so
  decorations are made lazily, tile by tile as they come into view (§12.5) — and, a `base` layer, joins the tile key (§8.8).

**Thematic layers.** FTG D7's matchers are override rows (`ThematicRow`) keyed by entity attributes (`prosperity`, `use`,
`epoch`, `owner`, `material`) — data, not code; the tile worker applies them over a mark's programs from its `attrs`
columns, and §9.5's legend reads their `legend` and `cue` cells. A row keyed by `use` or `owner` draws unthemed a mark
whose `knownTo` column (§8.1) §9.2's admission function does not admit at the band, and a theme's legend key lists only
the values drawn, so no theme colour and no legend key names a withheld purpose; while such a row is active the
knowledge key joins the tile key (§8.8) (J-A30.85). A front's building themes as its front; its concealed use (item 63;
§9.2) has no theme colour and no legend key for a key that does not admit it. **Character themes (item 72; J-A72.81):**
override rows keyed by a district's `identity`, by the share of a power (`CircumstanceSlice.powers`, §7.7) or of a
sector among its significance-weighted plots, and by its band range (§4.5), like FTG D7's matchers. **Conditions
(item 88; staged):** a `ConditionOverlay` (§2.7) draws as a settlement-wide thematic row — a `wash` plus a legend row,
keyed by its archetype and severity, no geometry — the rows schema-complete and empty in the base until the port fills
the records; the shipped rows `condition.siege`,
`condition.quarantine` and `condition.occupation`, the view `supplyChains` (a chain drawn only when §9.2's function admits
every joined node) and the `states` row `worked-out` are V08 §5.2's, in every shipped family (SettlementForge stage; file f
item 410). **Oases (g item 111):** a spring-fed water body draws as water with a `symbol('spring')` at its spring point;
its grove is the `Greenery` of kind `grove`, drawn by the `instances` program with the climate row's species; its gardens
are `LandUse` faces of kind `garden`; a `water` hairline channel is drawn from the water body to each garden its `fedBy`
names, derived at render, never stored — existing roles and programs, one new point symbol (§8.3's catalogue).

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
| the procession route's colour (g item 118) | its chevrons; every other decoration its glyph shape |
| a wall run's condition (g item 114) | its line style: the solid band, the notched band, a patch look's pattern on a narrower strip, the gap with its rubble spill, the dashed trace (the wall rows below) |
| ground classes (land-use kinds) | the land-use `pattern` texture in textured families, a glyph stipple per kind in `ink` |

The cues are drawn at the legend-bearing zoom stops (those at which §9.5's legend shows the meaning) and in every
thematic view; elsewhere the default sheets keep their look. Each such sheet ships a checked variant per common
deficiency — `StyleSheet.variants` for `protan`, `deutan` and `tritan`: role substitutions the loader lays over the
palette — selected by the per-viewer view key `cvdVariant` (`'none'` default; V09's view settings), which joins the tile
key (§8.8). A missing variant draws the sheet's palette with its cues and is reported by the loader. **The style check**
measures every variant: under each of `protan`, `deutan` and `tritan` it simulates the swatches of every pair of
categories a legend distinguishes (Machado, Oliveira and Fernandes 2009 at severity 1.0, applied in linear sRGB — our own
code from the published matrices) and passes when their CIEDE2000 is at least **`cvdContrastMin`** — the
deficiency-contrast threshold, one cell of V11's `palette` table for every sheet: ΔE2000 10 (our own; calibratable at
M3b, V12's register line). §13.2's T112-1 reads it; item 114's greyscale bar (J-V12.91) compares the pairs' CIE L*
greys against the same cell (the wall states below). §9.5's legend shows each category's cue.

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
| wall, gate | `decayed` (a run of `Enceinte.condition` not `standing`, §2.7) | all | override: nothing on the enceinte as a whole — each run draws by its row below; a gate on a `breached` or `dismantled` run draws its blocks as that run's towers draw |
| wall | a run `worn` (`Enceinte.condition`, §2.7; file f item 575, g item 114) | district and finer | override the run: its stroke in `wall.worn`, its outer edge notched — a notch ⌈w ÷ 2⌉ px deep and 1 px long every 3 px of run from its first vertex, w the drawn wall width (the broken crenellations); its towers unchanged; at the city band the run draws as `standing`; legend `legend.wall.worn` |
| wall | a run `patched` | all | replace the run: `wallPatch(look)` — a strip 0.6 × w wide (minPx 1) centred on the trace in the look's role and line pattern (the patch looks below), the look the `look` of the V11 `walls.patchMaterials` row the run's `conditionMaterial` names (§2.7) — a material no row names (a pack withdrew it) takes the look of its wall kind's first row there and is reported; its towers stand; legend `legend.wall.patched`, one entry per look drawn, naming its row's `label` |
| wall | a run `breached` | all | replace the run: no wall stroke — a clear break — with a bar across the trace in `wall`, 1 px by w, at each end of the gap, and the **rubble spill**: 1-px dots in `ink` over the run's band and one band width outward, a pixel drawn where `RH32('wall.rubble', key, salt, cell)` ÷ 2³² < 0.40, `cell` the pixel's world-aligned cell at the stop (seamless across tiles); its towers stand; legend `legend.wall.breached` |
| wall | a run `dismantled` | all | replace the run: no wall stroke; a 1-px `ink` hairline along the trace, 2 px on and 2 px off from the run's first vertex; its towers as trace discs (`trace('ring')` on each tower's footprint); legend `legend.wall.dismantled` |
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
| chamber | its `Chamber.kind` (V04's `ChamberKind`; II.7.6, II.7.5) | the underground layer | replace: `chamber` with the kind's fill — `ossuary` niche ticks densening with its complex's `fill`, `workings` the quarry pillars, `cistern` in `water`, `streetVault` and `bridgeVault` the `vault` hatch, `archVault` the `vault` hatch (its floor at grade, its door a daylight opening; V04 §5.2), `market` as the undercity's plaza (the ring walkway and stalls; V04 §5.2), `storey` and `square` as buried-town floors, `cellar` and `storage` as `dug`, the ruin's kinds by `ruinMasonry`; a flooded chamber in `water`; a collapsed one as a trace with rubble stipple; an unexcavated one by `unexcavated` (M6-U; file f item 407) |
| link | `UndergroundLink.kind` — `open` / `gated` / `secret` / `collapsed` / `flooded` (II.7.6; item 65) | the underground layer | replace: a hairline pair / with a gate bar / dashed and drawn only for a key that admits it / broken with rubble stipple / in `water` |

**The patch looks and reading the wall without colour (g item 114 (e); item 112).** `wallPatch` draws its strip by the
look's pattern, along the run from its first vertex: `patch.timber` planks — the strip solid, a 1-px joint every 4 px;
`patch.wattle` a weave — diagonal bands 2 px wide every 4 px; `patch.earth` a bank — the strip solid, its outer edge
dotted (every second pixel); `patch.drystone` stones — blocks one strip-height long with a 1-px gap between; `patch.stakes`
posts — a 1-px post every 3 px; `patch.brush` a broken fill — 2-px runs with one run in three left out, the gap stepping
one pixel per row. The five states therefore differ in line style first — the solid band, the notched band, a patch's
pattern on a narrower strip, the gap with its rubble, the dashed trace — and that is their second cue. **The greyscale
bar** (J-V12.91; V12's `T114g.greyscale`): one run rendered in each of two states at the band is compared with itself
pixel by pixel on CIE L* alone, and the mean grey ΔE2000 over the pixels where either render draws a mark must reach
`cvdContrastMin`, for every pair of different states at every band where both draw (the patch looks among themselves are
one state, told apart by pattern); on the shipped values the least is 11.1 (`lit`, `standing` against `worn` at a 12-px
wall), over every drawn width from 2 to 12 px (`docs/validation/bench/coh_repair_rendering_r1_looks.out` (A)). **A short
run:** a run whose drawn length at the stop is under 2 px (the minimum feature) is drawn 2 px long, centred on its middle,
over its neighbours' strokes, so no condition vanishes at a coarse stop. The standing wall keeps its symbol-key entry;
each other state's entry shows while a run in it is on the map (§9.5).
A Works stage named like a ladder state — the decay Works' `abandoned` and the demolition's `cleared` — takes that
state's row above; `before` draws the target's prior state and `finished` its own programs, the two stages §8.3's census
exempts as undeclined (item 67 (f)). A row naming a `worksKind` is the one exception to one row per (kind, state): it
matches only a target whose running Works is of that kind and is laid over the row its stage resolves without it
(J-A67.83), so a repair draws the decay stages backwards under its scaffold. No reference draws a declined, worn or
hidden state, a building in progress or an underground (item 23): the rows are ours and act only on an entity carrying
the state or a running Works, so a town that never passes an epoch, a scheduled edit or a hand conversion renders as the
references' would.
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
| 8b | open leads (`water.lead`) and boats (§8.10; g item 117) | new: on the water or hauled up on its bank |
| 9 | greens, parks, yard parts by role | new: the plot model |
| 9b | retaining walls (`retaining`; item 110 (a)) | new: over the ground they hold, under the shadows |
| 10 | projected shadows — the vector rung only (§8.4; `derived: 'shadow'` over the casters) | new: after roads, before buildings (NG) |
| 11 | raised under-copy (`derived: 'raised'` over footprints and masses) | part of MFCG's building draw |
| 12 | landmark footprints (solid ink); raised-way piers (in `wall`) | MFCG: landmarks |
| 13 | building masses / footprints / roof detail — each building's wings in stack order (`BaseWing.on`, §8.6), a tier over the tier below | MFCG: wards |
| 13b | leaf cover and creepers (g item 117) | new: on ground, streets, greens and roofs, under the crowns |
| 14 | piers and bridges; raised decks (`raisedWay`), on the vector rung their shadows drawn in a derived pass just before this slot over everything below, roofs included | MFCG: piers; a deck may stand above the roofs beside it |
| 15 | fields and hinterland land use | MFCG: fields |
| 16 | trees: wood fills and crowns | MFCG's tree slot: after fields, before walls; woods may cover track casings (K16) |
| 17 | boundary treatments (district band) | new: over yards, under curtain walls |
| 18 | curtain walls | MFCG: walls, after buildings |
| 19 | towers and gate blocks | MFCG: towers |
| 19b | festival decorations (`live.festival`; g item 118) | new: over everything built, under the grid, labels and furniture |
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
open ground keeps roughly two thirds of its lit value under the fixed sun's 45° — the ink family's shadow alpha 0.35),
`lit` in colour (ambient 0.85); `hatched` by its own vector prism pass (`LightingSpec.model 'vector'`, §8.4 (g); the
look of NG 1.2.2, §8.4 (h)) with its night glow; each family's night is its day albedo under the night's light (its
`@night` roles on the vector rung). The `MFCG` preset draws no cast shadow and no light; the `FTG` preset draws FTG's
sun, moon, weather rule and entrance window lights (§8.4 (h)).

**`lit` on the reference backend (VIS-7).** Every `lit` program — every mark of every family — runs on Canvas2D, the
lighting a post operation over the Canvas2D base, never a second drawing path (§8.4; J-R4, J-A68.82). Textures are
`pattern` fills of greyscale seamless tiles tinted by the role colour (multiply), which rungs 1–2 light as *Paint
programs* states; on the vector rung lighting is `faceLight` per face from stored geometry, one directional light from
the sheet's sun (with a `path` sun, its light step, §8.4), and soft shadows are `shadowPass` polygons with `penumbraPx`
— the shadow polygon plus two outward offset rings at ½ and 1 penumbra with α ⅔ and ⅓, vector, no bitmap filter
(avoiding Fantasy Manor's ≈ 90 % bitmap-shadow cost); canopy shading is baked into the crown sprites per (style, light
step) (§8.10); water depth ramp and foam are `ramp` and `foam` over the shore-distance field, per tile (≈ 1.3 ms per 512²
tile). Relief lighting across roofs and walls comes from the light pass and the surface layer's normals, with no
normal-map texture; on the vector rung the style dialog says the light is per face (J-R4). **Texture set** (our own, procedural: generated by
`plat/tools/textures/` in the product repository (§17.1 (3)) with fixed seeds; every file in `plat/assets/textures/`
names that script and its seed (§17.1 (5)); no third-party texture): tilled soil, grain, pasture, meadow, orchard
ground, marsh, sand, pebble, rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment
— 15 greyscale 256 × 256 px toroidal tiles (≈ 1 MB raw, ≈ 0.6 MB as PNG), metres per tile per band in the sheet; crop and
livestock variants of the arable and pasture tiles chosen by `LandUse.crop` and `LandUse.livestock` when present (VS27),
by the land-use kind otherwise; authored in M2b (≈ 1 person-week).

**Style constraints.** The contrast matrix; the option-interaction matrix test (no option silently disables another —
MFCG's Block mode dropping trees); every preset survives a render with no fills and one with no outlines (R13).
=== END ===

=== REPLACE ### 8.3 Symbol catalogue and draw-style census ===
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
hairlines (item 110); the harbour-mouth chain, raised or lowered (g item 106 (e)); the spring symbol (g item 111); the
`occupation` symbol (V08 §5.2); each colour-coded category's
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
| states: every (kind, state) pair that §2.8's ladders, `Building.condition`, `SkyIsland.state`, `Enceinte.supersededBy`, `Enceinte.condition` (`standing` · `worn` · `patched` · `breached` · `dismantled`, g item 114), `RetainingWall.state`, the raised parts' and decks' conditions and `Passage.sealed` can produce — other than the undeclined defaults (`kept`, and the Existence values `generated`, `built`, `altered` and `converted`), which draw the entity's own programs, and `demolished`, a tombstone that is never drawn — resolves one `states` row (§8.2) per band the kind is drawn at, in every shipped sheet (CI, and at every sheet load) | all | 0 unresolved; a golden TOWN converted by hand once through every building, wall, gate and passage conversion of §4.11 draws those kinds' rows, and a hand-built CITY fixture holding one tunnel, one island record, one retaining wall and one raised way with a deck plot in each state (§2.7's schema) draws their rows until their stages register |
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
| lighting, long shadows across tile lines (item 68; §8.4 (c)'s window): a 45 m tower and a 20 m house at the 1:500 stop, tile DPR 2 and 1, under the fixed sun and a 15° path sun, each rendered with the tile grid offset by 0, ¼, ½ and ¾ of a tile side, CPU reference and GPU pass | ink, lit | the shadow's start on the caster's centre line (V = 0.5) within max(1 px, the diagonal of §8.4 (c)'s floor cell there) of the similar-triangles point h ÷ (m − σ ÷ 2) past the caster's near face, lengthened never shortened, identical at all four offsets — no step at any tile line (the receipts: §8.4 (c)) |
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
| festival decorations (g item 118; §8.2's decoration rows): a THORP, a HAMLET, a VILLAGE, a TOWN, a CITY and a METROPOLIS fixture, each with a religious, a market, a harvest and a water festival from a dossier and with a generic preview, swept through all 52 weeks, and each with no traditions | all | the model digest equal with decorations on and off and in every week; each festival drawn exactly in its window's weeks; each tier drawing its own rows and none of a larger tier's; every item on its named or keyed place, else its fallback's; 0 decoration pixels in a gate's passage or standing on a carriageway, 0 over a label or its halo; the tiles byte-identical across two views and the PNG export of the same frame; with no traditions and no preview, tiles byte-identical to the fixture without the layer |
| seasons (g item 117; §8.2's season rows, §8.4's sun through the year): a golden TOWN on each climate row at the four named weeks and at every week of its leaf-colour, leaf-fall, ice and snow bands, in `ink`, `lit` and `hatched`, and the same TOWN with no season tables pinned | ink, lit, hatched | the model digest equal in all 52 weeks; in a temperate-deciduous autumn week ≥ 5 distinct leaf colours among the deciduous crowns and the cover share rising week by week through the leaf-fall band; still water drawn frozen before flowing water and leads open at fast reaches, mill reaches, springs and outfalls, the boats hauled up exactly while their water is frozen; on the `arid` row no ice and no default snow; every look passing the matrix rows of its role; the off form drawing the four named rows with the sheet's sun |
| wall runs in decay and repair (g item 114; §8.2's wall rows): a fixture holding one run in each condition and a `patched` run of every look, at every band, in `ink`, `lit` and `hatched`, with each run 1 px long at the city band's coarsest stop | ink, lit, hatched | each run drawn by its row — `worn` as standing at the city band — a `parapet` run's width its `stretchClass` thickness's (§8.2's `wall.curtain` row); every pair of different states passes §8.2's greyscale bar at every band where both draw; every short run drawn 2 px long; each state's legend entry present exactly while a run in it is drawn; the run's tiles pixel-identical after save → load, after a material undone and redone, and on a migrated document whose runs read `standing` and robust |
| access points and the underground systems (items 64, 65; §8.2's rows, §8.4's depth bands): a hand-built CITY fixture holding one access of each state, one gallery and chamber of each system and one link of each kind, the underground layer shown at each depth band | all | every (kind, state) resolves one row; a crossing of two parts drawn with the deeper one's trace under the upper; 0 pixels of a `secret` link or access at `public` |
=== END ===

=== REPLACE ### 8.4 Layers, shadows, heights ===
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
* **Toggles are visibility; existence is model** (the rule's home is II.7.1 and II.6; J-A12.81): the sewer control at
  CITY and METROPOLIS and the island view toggle set `LayerSpec.visible`, so hiding a layer changes no digest and a
  toggle never creates what the settlement lacks (at TOWN the *Sewers* control is a model setting, II.7.1; whether
  islands exist is the model setting `recipe.layers.islands`, II.6). The per-viewer view key
  `showUnexcavated` (§2.9) draws unexcavated voids for a key that admits them (file f item 413; the `unexcavated`
  program, §8.2). The `underground`
  layer is hidden by default at every rung; when shown, the cut-away or overlay draws one **depth band** at a time
  (`depthBandCm`, II.7.3): the per-viewer view key `depthBand` (§2.9) names it, default the shallowest band holding a
  tunnel with frontage plots, else the shallowest tunnel; every underground entity's `elevationCm` is its depth below the
  datum (§2.1, II.7.3), and a tunnel, cell or vault is drawn — and exported, §11.1 — on its own level, the band that holds its
  floor, `z` ordering the bands across the underground layer's parts (§2.1's `PlatKey`, one arena each in §3.4). The `sky` layer's `visible` shows the islands a
  settlement has; a waning or settled island keeps its lowered `elevationCm` (II.6), so its shadow falls from its lowered underside (the
  lighting model's slab, below) and §8.2's `states` row lowers its alpha. A hidden layer's lights and casters are not
  drawn and light nothing on the visible layers, yet they still exist (J-A12.81, J-A15.41).
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
  §3.8's readers stay three (J-A28.32); flat roofs, walls, towers and gatehouses as the tops of their prisms;
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
  is the illuminance of an unshadowed level surface under the fixed sun at its drawn altitude α_f (45° in the sheet, set
  by the week under *Sun*) — E_g · (a + sin α_f), exactly, since such ground takes neither spill nor occlusion — so open
  level ground shows exactly its albedo in every week and §8.2's palette targets hold on the lit map, a shadow there
  keeping a ÷ (a + sin α_f) of it before the spill's lift (at 45°: ≈ 0.65 in `ink`, the ink family's shadow alpha 0.35;
  ≈ 0.55 in `lit`; `docs/validation/bench/amendc_repair_rendering_r1_light.out` (C)), a surface near
  the cursor sun reading a little brighter; at night and underground `E_key` is
  `exposure.nightLux`. In a `mono` family the bracket's colour is replaced by its luminance
  (Rec. 709 weights), so light moves value and never hue. The result is encoded back to sRGB and clamped.
  **Visibility** `V_s` is found along the ray from the pixel toward the source, over the surface layer's heights and the
  slab list, the ray's height rising linearly from `z` to the source's height with slope m: V_s = clamp(min over the ray
  of (z_ray − h) ÷ (t · σ_s), 0, 1), with `t` the ground distance along the ray and `σ_s` the source's apparent size as a
  slope (the sun's or moon's disc; a flame's radius ÷ its distance). **The traversal** — one law, used alike by the CPU
  reference, the GPU pass and the light map's bake (J-A68.83) — takes that minimum over the surface as a field of
  constant-height texels, read through the **max-height pyramid** each surface layer carries and, beyond the view's first
  ring, the **ring blocks** (§8.8; each height raised by its datum, so every cell compares in one frame). A cell the ray
  crosses over [t_a, t_b] whose greatest height
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
  pyramids and the blocks, which §13.4's tolerance bounds; §12.5 and §12.7 cost this traversal. So a
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
  (the Σ over point lights of their terms with their visibility, and `O`) by the tile worker, once per **light-map key**
  (§8.8), so a view switch or an edit that changes the surface a light's traversal reads or the lights that draw (§8.1
  item 7) re-bakes it — a light entering a tile's bake only when its
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
  cell beyond half a tile side (§8.8). **The sun through the year (g item 117 (g)).** The view sun's default height
  follows the year position w (§2.9's `yearWeek`) by δ(w) = 23.44° × sin(2π (w − 6) ÷ 52) — 0 at weeks 6 and 32,
  +23.44° at midsummer (19), −23.44° at midwinter (45): the fixed sun stands at `altitudeCdeg` + δ(w) (45° in every
  shipped sheet: 68.4° at midsummer, 21.6° at midwinter); the cursor sun's h₀ is `heightRatio` × tan(that altitude) ÷
  tan(`altitudeCdeg`), so its shadows lengthen in winter in the same proportion; the path sun reads `dayOfYear` = 80 +
  7 (w − 6) + d (mod 365), d the `time` key's day of the week — week 6 opening at the March equinox, half a year later
  (+ 182) for a negative latitude, so summer is high in either hemisphere. It is the view's light only — item 102's model
  daylight keeps its fixed days and hours (§4.5), so no week moves a model value — and without item 117's season rows
  (V11's off form) the sun keeps the sheet's values.
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
=== END ===

=== REPLACE ### 8.5 Level of detail, the city-band figure-ground contract, way selection, first map ===
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
per-band detail budget exists.

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
=== END ===

=== REPLACE ### 8.7 Export resolution ===
### 8.7 Export resolution

SVG is resolution-free and layered, written at a declared band (§11.1). PNG and print render by §8.8's band-streamed
tile assembly at any DPI, with labels placed at a zoom stop computed for the export's own scale (§9.2); paper-unit rules
keep hairlines at their paper width at every scale, and symbol widths come from the symbolisation table (§8.2) at the
export scale. VTT exports carry model widths only, on a declared grid with exact pixels per cell (§11.1). Every export
frames within the map's zoom-out limit — the whole `bounds` at most (g item 116 (c); §8.8): a requested frame reaching
past `bounds` is cut to them, and one that misses them wholly is T-ER-07's empty frame. The scale bar's accuracy is §9.5's.
=== END ===

=== REPLACE ### 8.8 Tiles, zoom stops, print and the canvas budget ===
### 8.8 Tiles, zoom stops, print and the canvas budget

* **Pyramid (N-9 a).** Zoom stops at 2^¼ steps of scale (four per doubling) cover B-ZOOM's range, ≈ 1:45 000 → 1:500, in 27 stops
  (k = 0 … 26), and eight building-band stops continue the same step to ≈ 1:125 (k = 27 … 34), drawn only for buildings
  whose plan draws, with the plan's detail ladder by stop (V03 §5.1; M6-P, file f item 420). Stop k has
  m_k = 0.132 29 m × 2^((26 − k) ÷ 4) metres per **CSS** pixel — stop 26 is 1:500 at 96 CSS px per inch, stop 0
  ≈ 1:45 255 — `interface ZoomStop { k: number; mPerCssPx: number /* m_k */; band: LodBand /* the band a zoom-in reaches
  at it */ }` (declared in `@plat/model`, §8.1's comment). **Band entry stops** (our own; calibratable; B-ZOOM checks the
  pops at M1 and M2b): the city band from stop 0, the district band at stop 16 (≈ 1:2 828), the neighbourhood band at 20
  (≈ 1:1 414), the building band at 24 (≈ 1:707) — read by §8.5's hysteresis and §9.2's placement. **The zoom-out limit
  (g item 116; J127).** Each map's coarsest stop is its limit k_min = max(0, k_fit − `view.zoomOutMarginStops`), where
  k_fit is the finest stop at which the whole `bounds` (§8.1's `DisplayList.bounds`: a town's frame, a village's
  township — land the frame laws already cap, §3.2 (9)) fits the viewport's short side — the largest k ≤ 34 with
  max(the bounds' width, height) ≤ the short side in CSS px × m_k — and the margin is V11's base settings cell (1 stop,
  V11 §3.25.5). The view never settles at a stop coarser than k_min — a zoom-out gesture stops there and the zoom control
  is disabled at it (V09) — and the pyramid rasters, caches and keeps no tile coarser, the gestures' coarser-stop set
  included; the zoom-in end is unchanged. k_min is recomputed whenever `bounds` changes — an epoch or a hand edit that
  grows the frame moves it — or the viewport is resized, a view left coarser than a new limit settling to it; every rung
  thus draws every stop from its limit inward (T-ER-08). Tiles are 512 × 512 device px at the view's **tile DPR** d
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
  `under`, `shadow`, `over` —, style version, the view-state switches that change the layer's pixels: the year position
  while the pinned tables hold item 117's season rows (under their off form the named season) and `weather` (§8.2's
  season rows), `cvdVariant` while the sheet ships a variant (§8.2), shadows on or off and their mode, model-layer
  toggles, `plotsOnly` (city and district bands), `storey` (building band), `depthBand` and, for a `secret` key,
  `showUnexcavated` (the underground layer; §8.4), the knowledge key while a `use`- or `owner`-keyed thematic row is active
  (§8.2) or while the tile holds a concealed mark, a mark drawn only for a key that admits it (§8.2's `access` and `link`
  rows) or a light whose host is either (§8.1 item 7), the drawn week where the tile holds a Works mark (§8.1
  item 7), the `light` key on the vector rung (its `@night` roles), `base` live layers (the festival display among them,
  through `live.festival`, §8.2); for the `shadow` layer — or, while projected
  shadows are on, `base` on a tier without shadow layers — the path-mode sun quantised to the tier's sun step (1°, or 3°
  after §8.4's fallback); for `under` and `over` — or `base` on a tier without shadow layers — of a sheet whose programs
  at the band read the light (`faceLight`, the two-tone `roof`, `hillshade`, `lit` crowns), the light step (§8.4); in
  `fixed` mode the sheet's sun belongs to the style version and, its altitude following the week, to the year position,
  §8.4's *Sun*). Content version = the combination of the drawn marks'
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
  **light map** (§8.4 (f)) by its **light-map key** — its tile's surface key with its content version and its switches
  taken over the tile dilated by the largest radius among the lights that reach it, plus the revisions of the `light`
  marks reaching the tile, the drawn week, the drawn hour and the `light` key — and a dirty box invalidates every light map
  whose dilated tile it meets; so a view switch that changes a surface or the lights that draw (a model-layer toggle,
  `plotsOnly`, `storey`, `depthBand`, the knowledge key while a concealed mark, a mark drawn only for a key that admits
  it or a light whose host is either lies in the dilated tile) re-bakes the light maps that read it, while a moving
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
=== END ===

=== REPLACE ### 8.9 Backends, text, threads and the worker boundary ===
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
  | generation → tile worker | raster-export requests (PNG, print, the `.dd2vtt` scene image): frame, scale, band, layers, post operations and the export's zoom stop (§8.7), and the look and view state at the request — the sheet (its id@version, or the viewer's `stylePreset` sheet with the document's rows, §11.3), §8.8's view-state switches (the year position, `weather`, `cvdVariant`, shadow mode, model-layer toggles, `base` live layers — the festival display's `live.festival` among them —, `plotsOnly`, `storey`, `depthBand`, `showUnexcavated`, the drawn week, `light`), the shadow sun, the light step, the lighting — the rung the export draws (the CPU reference for every raster export, §8.4 (g)) with its global light resolved to the fixed or path sun, since an export has no pointer — and the requesting viewer's knowledge key (§9.2, §11.3), which the tile worker keeps until the export completes and rasters every export tile with — each carrying the export's transient list (mark, geometry, label, instance and string tables for its band and frame, and for a lit export the city band's casters its ring blocks read; §11.1) | request copied; list columns transferred | ≤ 4 KB plus the list (§12.8's export-time peak) |
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
=== END ===

=== REPLACE ### 8.10 Decoration instances (trees, scatter, crowns, roof detail) ===
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
  worker takes typed-array views and checks every tile's H128 against the stored value (budget and cost: §12.7).
  **Pre-decided fallback** when a tile's hash differs (a damaged bundle): that worker
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
  present, deciduous otherwise; through the leaf-colour weeks a deciduous crown's colour is its keyed leaf colour
  (`crown.leaf`, `crown.early`; §8.2's season rows). Hatch phase and roof detail are keyed by the render key (tags `hatch.phase`,
  `roof.detail`). Nothing is keyed by band or interned handle. The **crown library** holds 20 crowns per class per style, built once
  per session from `rng.stream` keyed by the sheet's key (the hash of its id@version), `STAGE_VIEW`, the concern
  `style.crowns` with its salt, and the class and index i as the creation index (§6.1's structured components; the path
  form is a report rendering, §14), drawn as sprites. On rungs 1–2 of §8.4's ladder a crown sprite carries its albedo
  and writes a dome's normals into the surface layer, and the light pass lights it — one bake per style, whatever the
  sun (item 68). On the vector rung a `lit` sheet bakes its sprites per (style, light step): once with
  a `fixed` sun, and with a `path` sun again at each light step, in the tile worker as one-sprite units of §8.9's queue;
  the drawn step's set is always kept, a set a running export needs is held until that export completes (§8.9, class
  4), and earlier sets are kept while they fit §8.8's crown-and-atlas scratch.
* **Boats (g items 117 (e), 118 (d)).** A `line`-layout class `boats` stands along every shore run of bank kind `quay`
  and every `beach` run within 50 m of a fishery, landing or boatyard use (classes `fishery`, `boatyard`, `v.landing`),
  one boat per 12 m, drawn from the district band (rank < 0.6) as a hull glyph 6 × 2 m in `plank` with an `ink` rim,
  moored along the run on the water's side, its bow alternating by ordinal; while its water is drawn frozen (§8.2) each
  boat is drawn hauled up on the bank — moved inland by its length and turned 30°. Boats are view marks like every
  instance (never in the model), drawn by every picture export and written by no interchange format; an `instance`
  edit moves, removes or adds one as it does a tree.
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
=== END ===

=== REPLACE ### 8.11 Edges and combinations (principle (11)) ===
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
| T-ER-08 | the pyramid at every rung (§8.8): stops and band entry are scales, the same at every rung; each map's zoom-out limit k_min (g item 116); an empty tile is paper; `bounds` grown by an epoch or a hand edit; a resized viewport; a `bounds` that fits at stop 34 | every rung draws every stop from its limit inward (k_min … 34) and no stop beyond it is reachable; the first view unchanged; k_min moves with `bounds` and the viewport; k_fit capped at 34; a view at the limit shows paper beyond `bounds` | each rung from THORP to the cap swept from stop 34 outward until the zoom stops: it stops at k_min, where the whole `bounds` fits the short side, less the margin; 0 tiles rastered or cached coarser; 0 pops beyond B-ZOOM's bar, 0 errors; the first view's stop the framing rule's; after a hand edit growing `bounds`, the new k_min |
| T-ER-09 | instances at their limits (§8.10), at every rung THORP to the cap: a face smaller than one spacing, a line shorter than one spacing, an override whose point left its host | zero instances (a valid set); the override orphaned and reported (J-R24) | fixtures of each at every rung from THORP to the cap, a village rung's hinterland woods and orchards included: the empty sets drawn as their fill; the orphan reported |
| T-ER-10 | light × every physical feature (§8.4), at every rung each exists: cliffs and steep ground (the terrain field's heights and normals), rivers, coasts and moats (water at its level, no cast shadow; foam by shore class), bridges and raised ways (deck slabs, pier prisms), retaining walls (a step prism, shade on the low side only), deck plots (their buildings at the deck's surface height), squares (ground), an oasis (water at its level, the grove's crowns as domes), the frame's edge (the ray ends at `bounds`), terraced wards (terrain and retaining walls), V02's roofscape and crypts, V03's plans (the building band), V04's caverns, catacombs and voids (no global light: point lights, shafts, the lantern), V05's landfall (its fallen members as ground casters), village rungs (the same law) | one law for all; a feature a stage has not registered draws by its base marks | a fixture holding each feature at each rung where it exists, day and night, on each rung of the ladder: CPU reference = GPU within §13.4's tolerance, every shadow where (c)'s law puts it, 0 errors |
| T-ER-11 | labels × features (§9): cliffs and steep ground (no label effect; the plan view), moats and an oasis (`water` labels), raised ways (way labels along the raised way, as any way), retaining walls (unlabelled; not a protected obstacle), deck plots (their buildings' labels as any), the frame's edge (a candidate whose boxes leave the view's frame is not placed at that stop, rung (7) at the frame), terraced wards (district labels) | §9.2's greedy over the admitted candidates | the same fixture at every stop: 0 collisions, every label inside the frame |
| T-ER-12 | exports × features (§11.1): cliffs and steep ground (glTF's draped terrain, VTT `line_of_sight` cliffs), moats and an oasis (water bodies; `oasis`, `spring`), raised ways, retaining walls and deck plots (file f item 447's properties; §11.1's VTT rule for raised supports), the hinterland (`LandUse` faces in GeoJSON and CityJSON) | each by its format's row | the same fixture exported in every format at every rung: validators pass, every feature present with its properties |
| T-ER-22 | wall runs in decay and repair (§8.2's wall rows; g item 114) at every rung THORP to the cap (a village palisade's runs included, V07): a run shorter than the minimum feature; a run whose material no `walls.patchMaterials` row names; a whole enceinte `breached`; save, load, undo, redo, regenerate and migrate of a run's condition and material | drawn 2 px long, centred; its wall kind's first row's look, reported; every run a gap with its rubble, the towers and gates standing; the runs persist as §2.7's profiles, a regeneration keeps them (§7.4's row), an undo restores condition and material, a migrated document draws `standing` and robust — never an error | the fixture of §8.3's wall row at every rung: tiles as stated; the reports present; each lifecycle step's tiles equal to a fresh render of its state |
| T-ER-23 | seasons (§8.2, §8.4; g item 117) at every rung THORP to the cap: every week 0–51; a climate band wrapping the year's end; a climate with no ice or snow band; a water mark with no `iceKind`; a crown with no `season.leaf` row; a face with no `seasonKind`; a document with no season tables; save, load, undo, redo, regenerate and migrate | each week's looks by their rows; the band read cyclically; nothing frozen or snowed; that water and that face as drawn; that crown unchanged all year (evergreen); the off form's four named rows; the year position is view state (§2.9) — persisted with the view, in no digest, left as it was by an undo, a redo and a regeneration, kept by a migration — never an error | the season fixture of §8.3 at every rung and every week: tiles as stated, the model digest constant; each lifecycle step's tiles equal to a fresh render of its state |
| T-ER-24 | festival decorations (§8.2; g item 118) at every rung THORP to the cap and on a sky island: no traditions and no preview; a window wrapping the year's end; two windows overlapping; a staging place that does not stand, and none of its fallbacks; a place too small for its count; a tradition with no readable week; save, load, undo, redo, regenerate and migrate | nothing drawn, tiles byte-identical; the window read cyclically; both drawn, in window order; the next fallback, then the heart; as many as fit, the rest reported; shown only in preview (DR43); the display and the year position are view state (§2.9) and the schedule the dossier's facts (DR43), so each lifecycle step draws what its state shows — never an error | §8.3's festival fixtures at every rung and on an island fixture: as stated; each lifecycle step's tiles equal to a fresh render of its state |
=== END ===

=== REPLACE ### 9.1 What is model and what is view ===
### 9.1 What is model and what is view

* **Model** (S13a; in the model hash; persisted): every entity's name and short form; a `LabelEntity` per labelled thing
  with its candidates; the quarter merge tree (§9.4) and the region groups over it (item 101):

  ```ts
  interface LabelEntity { id: Id; target: Id; kind: 'district'|'quarter'|'region'|'way'|'landmark'|'place'|'water'|'wood'|'gate'|'title'|'annotation'|'address'
      |'tunnel'|'system';   // a named sewer run along its centreline; a void system at its main band's floor centroid (II.7; M6-U, file f item 423)
    text: NameRef; shortText?: NameRef; priority: number; lod: LodBand[];
    displayText?: string /* a map-side display text drawn instead of the name, which stays unchanged — a dossier-owned name above all (§7.7 item 11; item 20 (h)); set by `setAttr`, cleared by `revert` */;
    candidates: { spines: Polyline[] /* area and path labels, world cm — a sky entity's in its island's local frame, translated by S14 (V05 §5.4) — in order of preference */;
                  anchors: { p: Point; dirCdeg?: number }[] /* point labels */; breakAt?: number[] /* allowed two-line breaks */ };
    pinned?: PinnedPlacement /* a user placement: model data */; hidden?: boolean }
  interface QuarterNode { id: Id; members: Id[] /* districts */; children: [Id, Id] | null; name: NameRef; spine: Polyline;
    cityCut: boolean /* one of §4.5's city cut: the city band's area labels */ }   // built by S6 (§4.5) — a sky island's root node by S13a over the island's districts after its unit run (V05 §3.14) —; named by S13a; every node has its own LabelEntity (kind 'quarter')
  interface RegionGroup { id: Id; name: NameRef /* set by its `group` event (§7.1), then like any name */; members: Id[] /* QuarterNode ids whose districts are disjoint: an Upper, Lower or Outer City */;
    spine: Polyline /* S13a, by §9.3's area rule on the union of the members' faces; where the union has several components, on its largest by area: one label, no leader */ }   // item 101: a named region label group on the quarter tree; its LabelEntity has kind 'region'
  interface Placement {                    // a user placement, set by moveLabel (§7.1): model data (N-28)
    stop: number;                          // the zoom stop (§8.8) at which the user placed it
    sizePx: number;                        // cap height in display px at 1× (never below the kind's floor, §9.4)
    anchor: PointCm;                       // point labels: the text origin; area and path labels: the spine's midpoint
    spine?: PolylineCm;                    // area and path labels: the user's spine, world cm
    dirCdeg?: number; lines?: 1 | 2 }      // a point label's direction; two lines broken at the entity's first `breakAt`
  interface PinnedPlacement extends Placement {   // what LabelEntity.pinned holds
    seq: number }                          // the seq of the moveLabel event that set it (§7.1): applying the event writes pinned = { ...placement, seq }; a warp or vertex move that carries the pin keeps it; it orders §9.2's pin pass
  ```

  The `title` label entity carries the map title's text as model data; the title is placed by §9.5's furniture rule
  (layer-order slot 24, §8.2), not by S13b's greedy. **What the tree holds (items 65, 72, 82, 101, 70).** Node names
  and district names come from the dominant identity and character (§10.4, item 72), and a quarter the dossier
  claims carries its claimed name (§7.7 item 16, item 82) — S13a's naming, read here, never a
  second rule. An undercity neighbourhood (II.7.5; item 65) is a leaf of the tree under its parent district's node,
  named as the underside of that quarter, its labels candidates only while the underground layer is visible (§9.2); the
  sewer's pseudo-district stays a leaf in a family of its own (II.7.3); each sky island is a root of its own, its members
  the island's districts, `cityCut` true, named with the island's name (V05 §3.14). A **region group** (a `group` event, §7.1; J-A101.84) names
  any set of nodes whose districts are disjoint — its label drawn at the city band above the city cut (§9.4) — and is
  removed by `delete` or re-grouped by a new `group`; its registry row is §2.8's. An informal cluster (item 70) has one
  `LabelEntity` of kind `place` targeting its plot — a place name from §10.4, never one per structure — and every
  `HoodPlace` (V01 §3.7) — a square, green, yard, court or opening — takes the same kind, its `knownTo` the place's (an
  opening's its `AccessPoint`'s) (M5; file f item 422); before M5 a named court or yard may take it. An oasis (g item
  111) is labelled as a water body (kind `water`, its name from §10.4's naming features), its grove as a `wood` and a
  named spring as a `place`. `displayText` is the drawing's text and nothing else: the reader, the gazetteer and
  every export give the name, with the display text beside it where one is set (§11.2).
* **View** (S13b; never hashed; recomputed per zoom stop and cached, §9.2): which candidate each label uses, its size
  and glyph positions, the quarter cut, the halo roles. Pinned placements are honoured by §9.2's pin pass; a pinned
  placement moves with its target under a warp or vertex move (§7.4).
* **Consequences.** The model hash does not depend on fonts, viewport or device pixel ratio, so O2 (a) and O11 (f) hold
  (GEO-29) — model hashes and per-stop placement digests are compared across Node, Chromium, Firefox and WebKit by
  §13.3's golden run. `moveLabel` (sets `pinned`) and `hideLabel` (sets `hidden`) are logged, hashed model events (§7.1);
  a scoped regeneration re-derives S13a only inside its scope (LC-17).

Judgment call: J-R12 (placement as view data, measured with our own font metrics).
=== END ===

=== REPLACE ### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally ===
### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally

* **Metrics.** `@plat/labels` parses the bundled OFL font files itself (the label faces of §8.2, §17.2): `cmap`, `hmtx`,
  `kern` and GPOS pair adjustments (formats 1 and 2), GSUB single substitutions for `smcp` (small caps) and `onum`
  (old-style figures), and `loca` / `glyf` for SVG's outline text (§11.1). Advance widths and kerning in font units
  become world metres at a zoom stop; there is no contextual shaping (the label faces are Latin, ligatures off). Glyphs
  are placed and drawn one by one (§8.9), so what is drawn equals what was measured on every backend and in SVG.
* **Font features, checked (N-12).** From M1 a PR-tier CI test asserts for each bundled label face that it carries
  `cmap`, `hmtx` and TrueType `glyf` outlines and reports whether its GSUB has `smcp` and `onum` single-substitution
  lookups for the Latin script. The label style then takes a **pre-decided path per face, chosen by that test, never by
  hand**: with `smcp`, small caps come from the face; without it, the family's OFL small-caps cut (for IM FELL Great
  Primer its SC face, bundled unmodified, whose lower-case slots are small capitals) supplies them, measured by the same
  reader; where a family has no such cut (a user face), small caps are synthesised as the face's capitals scaled to
  0.75 × the cap height with the letter-spacing kept, measured by the same reader; without `onum`, the scale bar uses the
  face's default figures. The style report names the path each face took, and the census's floors (§9.4) run on
  whichever path is active (J-R37).
* **Zoom stops.** Placement is computed per zoom stop (§8.8). At stop k each glyph box, in world units, is its pixel box
  × m_k; protected obstacles are `ObstacleSource.protectedExtents` (§14): the drawn symbol extents at that stop of
  gates, castle, plaza, bridges and walls (MFCG's measured defect) and, at the building band, the boxes of the room
  labels the plan draw sets (kind `room`, §8.5). S13b reads the display list through `ObstacleSource` and `RoleIndex` (§14);
  both implementations, what they call and the S14 writers of the columns they read are under §6.5 (3)'s allowlist
  lint, so S13b's inputs are bit-identical on every engine and §13.3's placement digests compare across the five engines;
  a symbol's rotated extent is computed with `dmath`, never `Math.cos` or `Math.hypot`. Between stops the view uses the
  placement of the stop at or coarser than the current scale: zooming in only shrinks every label's world box, so no
  collision can appear, and crossing below a stop switches to that coarser stop's placement. Zero collisions therefore
  hold at every zoom, not only at the stops.
* **The candidate set of a stop** is fixed before the greedy runs: every `LabelTable` row drawn at the band whose layer
  is visible (`LayerSpec.visible`, §8.4 — a hidden underground or sky layer's district, tunnel and cell labels are not
  candidates; and a visible sky layer's occlusion rule of V05 §5.4, M6-sky) and that the **admission function** below
  admits, minus the labels §9.4's rung (5) hands to a quarter at this
  stop, plus the quarter candidates rung (5) creates (§9.4; N-11). Rung (5) is decided from geometry alone and the
  filter from one byte per row, so the set is known before any collision is tested.
* **The knowledge filter (item 30; the label policy's home; J-A30.81).** Knowledge is separate from geometry: a hidden
  or clandestine place is always on the map — its faces, masses, walls and doors draw at every band like any other — and
  what the map withholds is its name and its purpose. Every label row carries its target's `knownTo` (§8.1's byte:
  `public`, `local` or `secret`), which S14 fills from the plot's, building's, institution's or `HoodPlace`'s record (§2.5
  to §2.7, with §7.7; a plot's default from its exposure being §2.5's); `landmark`, `place` and `address` rows take their
  target's; a `tunnel` or `system` row takes its record's (V04); ways, districts, quarters, regions (a region names public
  areas, as a quarter does), water bodies, woods, gates, the title and annotations are `public`. Every viewer holds a
  **knowledge key** — the per-viewer view key `knowledge` (its tier and `places`, §2.9; its default and authority, §11.3).
  **The admission function** `admit(knownTo, key, band)` — the one statement of admission — admits a row at a band
  by the table below, and never at a band its `lodMask` excludes. Its readers, each citing it: S13b's candidate set (the
  band is the stop's, §8.5), the thematic rows (§8.2) and the concealed marks and lights (§8.1 item 7) at the view's band,
  the legend (§9.5), `live.voids` (§8.2), the reader — hover and every `query` kind (§11.2) — and every picture and
  interchange export (§11.1) at the export's band; a reader without a band admits as at the city band. A view's
  `ViewOpts.viewAs` and a read's `admitAs` (§11.2's `Admission`) lower the key the function reads — it admits exactly what
  both the key and the lowering admit — and never raise it (file f items 464, 572; V08's party render, V09's "View as" and
  V10's filtered dry runs read it through them):

  | the target's `knownTo` | tier `public` | tier `local` | tier `secret`, or the place in `places` |
  |---|---|---|---|
  | `public` | at its kind's bands | the same | the same |
  | `local` — known to those who grew up there | the neighbourhood band and finer only | at its kind's bands | at its kind's bands |
  | `secret` — known only to those who were told | the building band only (its own view, J-A30.83) | the building band only | at its kind's bands |

  **The table is data (item 23; J-A30.86).** It is `knowledge.admit`, a §7.6 rule table keyed by (`knownTo`, tier)
  whose one cell is `coarsest: LodBand` — the coarsest band at which the row is admitted, `city` meaning at its kind's
  bands — read by the admission function; its shipped rows are the table above, and a region, era or setting may change them (a village whose every
  name is `local`, say). Only `editTable` edits it — a logged event, which only the `owner` and `editor` roles send
  (§11.3) — never a style sheet or a viewer's `stylePreset`, through which a viewer could loosen its own
  admission. The loader refuses — and an `editTable` fails its dry run with `invalid` (§7.1) — a table in which a
  `public` row is not `city` or a higher tier admits a row at a finer band than a lower tier does, so more knowledge
  never shows less. An edit re-derives no entity, its readers being view passes, and re-places every stop (the memo is
  keyed by the table's version, below).

  The filter is applied to the rows before rung (5) and before any pin or collision is tested, so the greedy's local
  evaluation is unchanged; a withheld row is not a candidate and blocks nothing, its area or way being labelled — where
  rung (5) allows — by its public quarter. A pinned or user-hidden label (§9.1) is filtered the same way. `knownTo` is
  model data (`setAttr(knownTo)` is a logged event, §7.1; a dossier-backed place's value is the dossier's, §7.7) while the
  knowledge key is view data, so the model digest never depends on who is looking; every reader withholds the same names
  by the one function. No reference
  has knowledge or hidden places (item 23): every row of the references' towns is `public` and the filter admits all.

  **Concealed parts (item 63; J-A63.81).** A clandestine building's hidden function is its own `Use` record (§2.7) with
  its own `knownTo` (default `secret`); one table therefore withholds it: its label row, its purpose in every reader
  and export, and — the one refinement of J-A30.83's "never its geometry" — the marks of its **concealed parts**: the
  concealed rooms of its plan, its concealed entrance's tick and door, and its concealed access down (§2.6, II.7.4),
  each carrying the concealed use's `knownTo` (§8.1 item 7). A viewer whose key does not admit that use at the band sees
  the building exactly as its front — its mass, walls, public rooms, main and service doors, the front's label, at every
  band — and no trace of the concealed parts; a viewer who holds the knowledge (tier `secret`, or the place in `places`)
  sees them all. The building itself is never withheld. **Secret ways down and between systems (items 64, 65):** an
  `AccessPoint` or `UndergroundLink` whose `knownTo` the key does not admit draws nothing and labels nothing, and a
  secret underground place (a guild seat in the undercity, a smugglers' passage) is withheld by the same table as a
  surface one; hiding the underground layer hides them all, and showing it admits them only by the key.
  **Which facts are the dossier's (item 20 (h); J-A20.82).** The reader (§11.2) gives, beside every fact it admits, its tier by
  §2.8's `factTier`, so a user, a host and a clerk can tell the town's fixed facts apart from derived ones; the tier
  never widens what the key admits. **The clerk (item 101)** reads only through this reader with
  its viewer's key — its `why` answers under §11.2's rule for the oracle (a front explained as its front, a concealed use
  left out) and its proposals (`preview`) an editing role's — so it knows and says no more than that viewer may know
  (§11.2's *Knowledge*; item 63 (c)).
* **The greedy.** Candidates at a stop are totally ordered by `priority` (the numeric `LabelEntity.priority`; by default
  annotation > region > quarter / district > water > wood > landmark > place = system > gate > way = tunnel > address — an
  annotation is the user's own marker, a wood ranks with the water it borders), then larger target area (`areaM2`), then id. A
  candidate takes its first alternate (its spines in order, then §9.4's ladder) that meets no placed higher candidate, no
  obstacle and no fixed pin; otherwise it yields. This whole-map greedy is **evaluated locally**: deciding c first
  decides (memoised) every higher candidate whose alternate boxes meet c's; the dependency graph is acyclic because the
  order is strict, so the result is the same whichever tiles are computed first and whatever the viewport.
* **Resumable placement.** S13b runs as a job the tile worker can stop between any two units and resume, as it does a
  raster (§8.9). Its input is the label rows, not the model record:

  ```ts
  // @plat/model (§14), beside LodBand, Role and ZoomStop: the rows S13b reads — §8.1's LabelTable with the StringTable and GeomTable
  // ranges it indexes. The tile worker's display list and each export's transient list implement it; LabelEntity stays the model record S13a writes and S14 reads
  interface LabelRows { labels: LabelTable; strings: StringTable; geom: GeomTable }
  // @plat/labels (§14 points here)
  interface LabelPlacer {
    begin(stop: ZoomStop, labels: LabelRows, obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementJob;
    place(stop: ZoomStop, labels: LabelRows, obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet;   // begin(…) then step(Infinity): SVG exports and tests
  }
  interface PlacementJob {
    step(deadlineMs: number): boolean;   // runs units on from where it stopped; returns after the first unit that ends deadlineMs or more after this call began; true when the stop's placement is complete
    result(): PlacementSet;              // once step() has returned true
    cancel(): void;                      // drops the job; the memo entries it wrote stay valid (keyed by stop, candidate id and revision)
    readonly spentMs: number;
  }
  ```

  A **unit** is one of: the rung-(5) test of one `LabelTable` row (building the candidate set); one pin of the pin pass
  (below); one step of the local evaluation, which runs on an explicit stack instead of recursion — push the highest
  undecided candidate whose alternate boxes meet those of the candidate on top, or, when every such candidate is
  decided, decide the top (its first alternate that meets no placed higher candidate, obstacle or fixed pin), write the
  memo and pop; or the glyph layout of one placed label. The job takes the scope's candidates as roots in the strict
  order, pins first, so most roots find every higher neighbour already decided and push nothing. The stack and the memo
  persist between steps, so the job can stop after any unit, and every decision reads only candidates already decided,
  so where the steps fall never changes the result: a stop placed whole and placed one unit per step give identical
  placement digests (§8.3, §13.3). A unit costs ≈ 1 µs on average and tens of µs at most (a long name trying every spine
  and rung), so a step overruns its deadline by one unit. The view's job reads the tile worker's list, which deltas
  change between steps: a delta applied between two steps drops the memo entries its dirty boxes invalidate
  (*Incremental*, below) and, when it changes a label row or an obstacle of the job's stop, the job is begun again,
  keeping every memo entry left valid. An export's job reads its own transient list, which nothing changes (§11.1)
  (J-R51).
* **Pinned labels (N-28).** A pinned label (`LabelEntity.pinned`, §9.1) is shown only in its bands. At its own stop and
  at every finer stop it is placed exactly as the user left it, before any other candidate, by the **pin pass**: the
  pins eligible at the stop — in their bands, with their own stop at this stop or a coarser one — are taken in the order
  of their `moveLabel` event's `seq`, then label id (`LabelTable.pinSeq`, §8.1), and each whose box at the stop meets no
  pin already fixed there becomes a **fixed pin** — an obstacle every candidate avoids. A pin whose box meets an already
  fixed pin is not fixed at that stop: its only alternate is its own placement, which the fixed pin blocks, so it is
  **hidden at that stop and reported** ("pinned label hidden: overlaps pin P at stop k"). The pass is a greedy in a strict
  order, evaluated locally like the main greedy — deciding a pin decides, memoised, every earlier pin whose box meets
  it — so its result does not depend on which tiles are computed first. A pin's box is sized in pixels, so zooming in
  only shrinks it in world units: a pin fixed at stop k meets nothing at a finer stop that it did not meet at k, and a
  pin hidden at k is fixed again at the finer stops where the two boxes part. `moveLabel`'s dry run (§7.1) refuses a
  placement whose box at its stop meets another pinned label's box at that stop, returning the nearest free position as
  the conflict's action — the **interactive guard**; the pin pass is the guarantee, because pins also come together
  without a `moveLabel`: a warp or vertex move carries them with the ground (§7.4), a `setAttr` rename or an ids-scoped
  `rerollLayer(naming)` lengthens a pin's text (§9.6), and a `setStyle` changes the label face's widths. At a **coarser**
  stop a pin's world box grows, so it is not fixed there: it keeps its anchor and spine and enters the greedy as a
  candidate, at its entity's priority, whose only alternate is that placement — drawn when it meets no higher candidate,
  obstacle or fixed pin, otherwise hidden at that stop and reported ("pinned label hidden at stops coarser than k").
  Zero collisions therefore hold at every zoom with pins included (J-R26, J-R45). **Test (B-ZOOM, §13.4):** two pins
  20 px apart brought together by a warp, and two brought together by a rename that lengthens the earlier pin's text —
  at every stop 0 collisions, the later pin reported hidden at the stops where the boxes meet, and the per-stop placement
  digests (§13.3) identical after a replay of the log.
* **Scope.** Area and way labels for all candidates of the band; addresses and repeated street names only for candidates
  in visible tiles and their dependency closure. The memo is keyed by (stop, candidate id, candidate revision) and held per knowledge key, `knowledge.admit` version and view rotation (a changed key, table or rotation re-places the
  stop; the rotation because §9.3 orders an area label's stored spines by their on-screen horizontality, item 55); a
  stop's placement digest (§13.3) is therefore per (stop, knowledge key, rotation), the goldens taken at the `public` tier
  with no `places` under the shipped table, at rotation 0.
* **Incremental (SCL-9).** After an edit, memo entries of candidates whose boxes meet the dirty boxes are dropped and
  re-decided; a change propagates only through candidates whose outcome changes (the priority cascade stops when nothing
  more moves).
* **Budget (SCL-10):** §12.7 — in the tile worker from the label rows alone (§8.9); an export's placement in class-4
  steps (§8.9).
=== END ===

=== REPLACE ### 9.5 Furniture, framing and tools ===
### 9.5 Furniture, framing and tools

* **Scale bar:** metres ↔ feet, major and minor ticks, old-style figures (`onum`); a 100 m bar is accurate to 0.5 % at
  every zoom (O6 c).
* **Compass (XB08):** a procedural 8-ray design with ink and paper halves, rerollable per town: its stream is keyed from
  the town root's entity key (§6.1, §14 `TOWN_ROOT`) with the concern `style.compass` and that
  concern's salt, so a reroll is a logged `rerollLayer('style.compass')` event and a link or a copy of the document draws
  the same compass. **Auto-placement:** candidates are the four corners and the four edge midpoints, inset 24 px;
  score = the sum over the display-list marks the compass would cover at the view (labels × 3, protected features × 3,
  buildings × 1, ways × 1, water × 0.2, paper 0) plus 0.5 × (1 − distance from the view centre ÷ the half-diagonal); the
  lowest wins, ties broken in the order NE, NW, SE, SW, N, E, S, W; re-evaluated when the view settles. The covers are
  computed where the display list is — in the tile worker, by `ObstacleSource.coverage` per candidate box — and reach
  the main thread through §8.9's furniture query. Dragging places the compass and the wheel rotates it; both are view
  state (§11.3) and pin the compass. Its view key `compass` is `trueNorth` (default: the needle points at model north,
  whatever the view's rotation) or `free`; the map's own rotation is the `rotation` view key about the frame centre
  (§2.9, §7.1: MFCG's Rotate as a view rotation, never a model change).
* **Grid (XB15):** kind none | square | hex (pointy or flat) | mesh (triangular); cell size in metres or feet (default: a
  round ground distance ≈ one tenth of the view's short side on a 1-2-5 sequence; for VTT, the export's declared grid, §11.1); colour role
  `grid`; fades out below its legibility zoom (cell < 12 px); **skip water** clips grid strokes out of water faces (on by
  default for overview grids, off for VTT grids).
* **Title:** its text is the `title` label entity (§9.1); it is placed in the emptiest corner (NG's rule: the corner
  whose box covers the least mark area, the sum of its `coverage` record from the same furniture query); movable. A
  dossier-bound map's word for its size is the dossier's own tier word — a SettlementForge "city" of 5 001 people is drawn
  on the TOWN rung and titled a city — a dossier fact (§7.7 item 15; item 81; J-A81.72); a standalone map's word is its
  rung's. The plate may add a water qualifier after the tier word (`StyleSheet.plate.waterQualifier`; V07 §5.3's row) and
  shows the population rounded to `StyleSheet.plate.populationRound` (1 by default; 10 under the `VG` preset) (the
  village product; file f item 424).
* **Legend (J04):** a gazetteer panel — an embedded title, numbered districts (always in `legend` mode; in `labels` mode
  only for legend fallbacks), lettered landmarks, the scale bar and the emblem (the numbered and lettered lists read §9.2's
  admission function at the stop: a place it does not admit gets no number, no letter and no row, item 30); border none | single | double rule;
  position any corner (default: the emptiest corner other than the title's) or free; metric or imperial; label modes
  `labels` (default), `legend` (districts numbered on the map, MFCG's Districts = Legend) and `hidden`; plus the symbol key
  generated from the registry (O12 d), each active thematic row's key (`ThematicRow.legend`, §8.2) and each state row's
  entry while a mark in that state is drawn (`StateRow.legend`: the wall runs' conditions, g item 114), every
  colour-coded category shown with its second cue beside its colour (g item 112); and a line naming the season and week
  and, while one shows, the festival and its weeks (g items 117 (h), 118 (g)). Position, mode and border are view state.
* **Emblem (M06):** a furniture slot `Emblem = { source: 'none'|'import'|'generated'; svg?: string; png?: Uint8Array;
  generated?: EmblemSpec }`. Imports are sanitised (no scripts, no external references, ≤ 64 KB). The base ships a
  minimal generator of our own: `EmblemSpec` = a field tincture from the palette's roles, one of eight partitions or
  ordinaries (per pale, per fess, per bend, chevron, cross, saltire, chief, bordure) and zero or one geometric charge
  (roundel, lozenge, mullet), keyed from the town root's entity key with the concern `naming.emblem` and its salt
  (rerolled by `rerollLayer('naming.emblem')`); off by default; drawn in the legend or a corner (J-R13).
* **Annotation layer** (numbered markers and a separate legend sheet); **north arrow**.
* **Measure tool (L10, L08):** an `@plat/app` ruler — click points for a polyline length in metres and feet; area mode
  for a polygon's area in m², ha and acres; snapping to way centrelines, face edges and vertices through the display-list
  index (8 px radius) — `RoleIndex.snap` in the tile worker, reached by §8.9's snap query and answered within one frame,
  the unsnapped point shown until the answer arrives; exact in world centimetres; a measurement is view data and can be
  saved as an annotation.
* **Authoring surfaces (item 101 (i); R3, R4, R14, R16).** While a declaration is being drawn, or a derived shape is
  selected, the main thread draws its **handles** — four to eight by default, more on the user's request — over the
  `live.ghost` preview (§8.2); dragging one is a new declaration of the same kind on the same entity (§7.1). The
  **feature snap** lights the candidate edge — a street centre-line, a shore, a wall, a ridge, a block edge — as the
  pointer comes within 8 px, answered by the tile worker's `RoleIndex.snap` exactly as the ruler's (§8.9), and holding
  Alt places freely; the snap is resolved into the event's points before its dry run (§7.1), while the kernel's own
  attraction still applies to every insertion (§3.6). The **count badge** beside the ghost shows what an area
  declaration (`quarter`, `fill`, `roster`) will hold — its plots, households and buildings from the dry run (§7.1) —
  with plus and minus that re-run the dry run at the next step of the declaration's size — a quarter's `sizeM2` by (its
  band's maximum − its minimum) ÷ 8, clamped into the band, from the median when unset; a fill's density dial by one step
  (V09 §4.5); a roster's badge has none (its size is its lines) (file f item 348); numbers show while drawing (a way's length, an
  area in hectares). All are screen-space furniture: never exported, never in the model, never read by the clerk.
* **Underlay (item 101, T12 `dress`; J-A101.81).** An image the user drops under the map to trace: the per-viewer view key
  `underlay` (§2.9: the image, its opacity 0–1 — default 0.5 — and its frame as a world-cm affine placement with four
  handles). The compositor draws it first and the composed tiles over it at 1 − its opacity, so the image shows through
  the map without re-rastering a tile; it is never exported and never in a digest, never crosses the bridge (§11.3), and
  no model code or clerk reads it.
* **Framing (A06):** the initial view and the default export frame are the circle centred on the settlement centre with
  radius max(the outer enceinte's radius, the 95th percentile of footprint distances from the centre) × 1.08, fitted to
  the viewport's short side (no letterbox: the long side shows more context), never coarser than the map's zoom-out
  limit (§8.8; g item 116) — the circle lies inside `bounds`, so the first view is the framing rule's at every rung, a
  village's V07 §5.2's — and the view's **Fit the town** frames the whole `bounds` at the limit's stop less its margin
  (V07 §5.2's township view at a village rung; V09). River tails and ribbon tips beyond the
  percentile are outside unless the user frames them; a user frame is view state. Furniture sizes are CSS px × a UI
  scale; device pixels are handled by the tiles.
=== END ===

=== REPLACE ### 9.7 Edges (principle (11)) ===
### 9.7 Edges (principle (11))

| id | mechanism at its limit | defined outcome and rung | test |
|---|---|---|---|
| T-ER-13 | label entities (§9.1–§9.2) with no input, one item, degenerate or missing data: no `LabelEntity`; one informal cluster's `place`; an empty `displayText` (read as absent); an unresolved `NameRef` (no text, F-LABEL reported); a spine of zero length (no candidate) | nothing placed / the one placed / the name drawn / the label left out and reported / the next alternate — never an error | fixtures of each at every stop: placement digests stable, the reports listing them |
| T-ER-14 | spines (§9.3) at every rung, THORP to the cap: no alternate fits, the skeleton fails, a face below one glyph; and through save, load, undo, redo, regenerate and migrate | §9.4's ladder to rung (7); F-SKELETON's medial axis; rung (7)'s legend entry — each counted; spines are S13a model data (§9.1) — persisted with their `LabelEntity`, rebuilt by a scoped regeneration inside its scope only, undone with the event that changed them, carried unchanged by a migration | fixtures at every rung: every rung reached is counted, 0 errors; a B-EDIT fixture at every rung — save, load, undo, redo, a scoped regeneration and a migration — with the spine digests outside the scope unchanged and those inside equal to a fresh derivation |
| T-ER-15 | the quarter tree and furniture at every rung (§9.4–§9.5), THORP to the cap: one district (a city cut of one node); a map with no enceinte and few buildings; no building at all | the one node labelled at the city band; the framing circle's radius at least 200 m (a 400-m view, as §8.5's village first map); the title, scale bar and compass placed by their rules | THORP, HAMLET and an empty-site fixture: every furniture item placed, the title and the one district labelled |
| T-ER-16 | names (§9.6): a naming feature with no word row; a dossier name equal to a generated one; rename, undo, regenerate and carry | the kind's plain word, reported; the dossier's name protected and the generated one re-drawn by the uniqueness rule; §6.3's carry | B-EDIT: a rename undone and redone, a scoped regeneration: 0 names changed outside scope; the collision fixture: the dossier name kept |
| T-ER-17 | a region group whose members' union has several components | one label on the largest component's spine, no leader (§9.1) | a region of two disjoint quarters: one label, on the larger |
| T-ER-18 | the rows of kinds `region`, `wood`, `annotation`, `landmark`, `place`, `address`, `tunnel`, `system` | `knownTo` and priority as §9.2 states | a fixture of each kind: admission and order as stated, at every tier |
=== END ===

=== REPLACE ### 11.1 Formats ===
### 11.1 Formats

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9's format and canonical form; its byte-identical round trip is tested in §13.2 | import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment; a `plan` block per building whose plan rung is not `absent`, its state (§2.8) recorded on the block (§2.6; items 28 and 28 (f); J-A28.84): storeys, each with its rooms (address, ring in integer cm, role, `scope` — `unit`, `shared`, `service` or `circulation` — and, for a `unit` room, `unit`, the address of the household whose dwelling unit it belongs to), walls by kind, openings (kind, width, and the entrance of §2.6's set an `entrance` opening serves) and windows; the plan's `units` (each household's address, its unit form and its entry opening), stair cores and chimneys; with the output version and the supersedes table, so an exported plan says who lives where and the room graph follows from the openings; a `massing` block per building and a `composition` block with its state where the `wings` rung is current or stored (V02 §5.5; M6, file f item 449); every record's fields with their tier (*Authorship and tiers*, below) and each event's authorship with the log; each district's character vector, identity, band range and name history (item 72); each `Works` with its stage at the export's drawn week (§4.11; item 67); each `LightSource` (item 68); a clandestine building's concealed use and its concealed parts (item 63), the document formats being admitted whole (*Knowledge*, below); our own schema, never a cell grid | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer (*Layers*, below); one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (an antenna: §3.6 rule 3); MultiPolygons for face unions; walls, towers, gates and built bridges as typed features (a crossing `site` is not exported, §2.7), each enceinte's wall LineStrings split per run of equal `condition` and material (§2.7), each run carrying the enceinte's `id` and `run` (its ordinal from the trace's first vertex in vertex order), `condition` absent when standing and `material` — the `wallKind/id` key of its V11 `walls.patchMaterials` row — absent when robust (file f item 575; g item 114) — an enceinte closed by `shore` or `barrier` adding its closing edges as LineStrings of kind `closure` carrying the barrier kind (`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`; J-VI.3), every enceinte its enclosure as one Polygon of kind `enclosure`, each gate carrying its kind (`land` or `water`, §2.7) (g item 106; M2b, file f item 447); **item 110's entities (M3a, file f item 447; one text for both variants):** every way carries `part` (0 the ground); a raised way's LineString adds `raisedKind` (`viaduct` · `elevated` · `aqueduct`), `source` (`generated` · `declared`, item 244's derived reading), `reason` (`drop` · `link` · `water`, absent when declared; J-VI.2), `deckMinCm`, `deckMaxCm` and `underuseSince` (a week, absent when in use); each support a Polygon of kind `raisedSupport` (`way`, `key`, `state`); each span a Polygon of kind `span` (`use`, `state` — item 244's, absent when standing); an aqueduct's channel is its way's LineString (class `aqueduct`); a retaining wall one LineString of kind `retaining` per run of equal state along its chain (`wall` its id, `run` the run's ordinal from the chain's first vertex in vertex order, `highSide` of the vertex order, `stepMinCm` and `stepMaxCm` over the run, `material`, `state` — absent when standing); stairs and ramps as `stair` and `ramp` flags on the way segments they occupy; a plot or building on a deck `onDeck` (its deck kind) and `deck` (the host's id), a deck host's feature `plat:deckState` (`decayed` · `ruined`, absent when standing); a stepped building `tiers` (the count); features on a raised part stay in the ground layer's collection with their `part`; boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (§8.10's function at the finest band, overrides applied: integer-centimetre positions under §6.5's lint, so the file is byte-identical on every host) with `species[]` (each instance's species kind), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths; public attributes include the lifecycle states (`existence`, `condition`, a wall's `supersededBy`, a tunnel's `closure`, an island's `state`; items 8, 11, 31), a plot's `exposure` and `knownTo`, a building's `knownTo`, and an institution's `knownTo` on the features of its buildings (item 30), a building's `entrances` as points with their roles (item 29), an underground building's `baseCm` as its depth below the datum and `eaveCm` as its ceiling and a tunnel's invert profile (II.7), a market reservation's `rank` (§4.2); also each building's `worksStage` at the export's drawn week (item 67), an access point's `state` (item 64), each gallery, chamber and link of the underground systems with its `system`, `kind` and `depthBand` (II.7.6; item 65), a district's `identity` and band range (item 72), each lit `LightSource` whose host draws for the export's key (§8.1 item 7) as a Point with `kind`, `heightM`, `intensityCd`, `radiusM` and `colour` (item 68), and every property's tier as `plat:tier` — `dossier`, `declared` or `map` (item 20 (h)); the `name` and the purpose of a place (its `use`, or an institution's kind) the export's knowledge key does not admit (*Knowledge*, below) are withheld, the feature staying in the file, and a concealed use's features — its rooms, its concealed entrance, its way down (item 63) — and a secret access or link are left out for such a key, their lights with them; a fallen island's archived arena is not exported (II.6); an oasis's water body carries `oasis: true` and its spring a Point of kind `spring` (g item 111); a land-use feature's `deposit` and `depositState`, one `condition` feature per overlay (no geometry of its own; its `targets`) and one `supplyChain` LineString per active chain whose every joined node the key admits (V08 §5.2; SettlementForge stage, file f item 410); the history properties of V06 §5.3 — for raised ways the properties above plus `plat:why`, no second `reason` meaning (M6-E, file f item 409); the sky content of V05 §5.5 (M6-sky, file f item 415); the optional `wings` layer of V02 §5.5 (M6); with the option `exportWhy` (default false; M3a, file f item 456) each use's `cls`, `family`, `specialisation`, `significance` and its top three siting row ids (V11 §2.4; a raised way's `rw/<kind>` id travels there, never as its `reason`) | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13; the export dialog's `text` option) by default as **outlines** — each glyph used written once in `<defs>` as a path from the bundled face's own `glyf` outlines (the face the labels were measured with, §9.2; quadratic segments as SVG `Q`), each placed glyph a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2) (J-R32); halos by paint-order in both; hatching as compound paths; symbol widths; the light (item 68) as the vector rung's shadows in `<g id="layer.shadow">` and glow sprites, or, with the export option `lighting: 'raster'`, one embedded raster lighting layer from the CPU reference (§8.4 (f)) in `<g id="layer.light">`, multiplied over the base groups; the colour-matrix post operations (§8.2) as one filter on a wrapper group `<g id="lit">` that holds every base layer group, `layer.shadow`, the glow sprites and `layer.light`, under the label groups, so they act after the light as §8.4 (f) orders and never on a label; raised parts in their own group `layer.ground.raised` above ground part 0 (item 110; M3a); with stage 3 registered, at the district band and finer the roofscape's facets in the semantics `sem.building.roof`, `sem.building.roof.dormer`, `sem.building.roof.porch`, `sem.building.roof.tower` and `sem.building.roof.cupola` and its lines in `sem.building.roofline` (V02 §5.5), the map naming each facet's subpath range by its wing address `wing:<building>/<key>` (M6, file f item 449); the sky content of V05 §5.5 (M6-sky) | size and element budgets: §12.7; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | §8.8's band-streamed tile assembly at any DPI, rastered in the tile worker from the export's transient list (below) and lit by §8.4's CPU reference at the request's light setting — the fixed or path sun by day, the moon and the lights at night, since an export has no pointer (item 68); transparent background; per-layer transparent PNGs (the largest MFCG ask; raised parts their own PNG, item 110); print presets A4…A2 at 300 dpi; the animated history (APNG over history frames; V06 §5.3, M6-E) | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer — the ground; the sky per island (its content V05 §5.5's; M6-sky); the underground one scene per depth band (`depthBandCm`, II.7.3) at that band's depth, every system of the layer in it (II.7.6; item 65) — with its elevation, plus one scene for each storey of a building whose plan rung exists (the profile below; item 28) and one deck scene per raised way crossing the scope (the profile below); model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing, each wing that spans a passage also extruded over its span ring from the passage's `headroomCm` above that wing's base to its eave (a stepped front's quads each), the passage left open beneath (§8.5 (2); `Passage`, §2.5; `BaseWing.spans`, §2.6), a basement (§2.6; item 29) extruded down from `baseCm` by its storeys inside its inset ring, an underground cell or vault (II.7.3) at its own depth — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6, or from the building's roofscape (V02 §5.2) with stage 3 registered, the export option `compositions: 'asDrawn' \| 'derive' \| 'none'` choosing (M6, file f item 449) — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases, a curtain wall's top carrying its walk (`Enceinte.walkCm` wide), by run (g item 114): a `standing`, `worn` or `patched` run its prism with `extras.condition` and `extras.material` (absent when standing and robust), a `breached` or `dismantled` run no prism (its towers standing); bridge and pier decks at `deckCm`; a raised way a deck mesh swept at its deck height with its parapets, its supports extruded from the ground to the soffit, each `vault` span closed by its end walls; a retaining wall extruded between the ground heights on its two sides; glTF nodes carrying `extras.part` (item 110; M3a, file f item 447); the `interiors` option (default off) adding each plan's walls, floors, stairs and columns per V03 §5.3 (M6-P, file f item 450); the sky content of V05 §5.5 (M6-sky); trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32); a building under a Works at the export's drawn week (§4.11's *Which week is drawn*) extruded at its stage heights (`heightsAt`, §4.11; item 67); lights (item 68) as `KHR_lights_punctual` — a point light per lit `LightSource` (its position, colour, intensity in candela and `range` its radius) and one directional light for the fixed sun, the lights of an underground layer in that layer's node, each light only where its host draws for the export's key (§8.1 item 7). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data, §2.6) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces — the roofscape's facets, with dormers and porches when compositions are exported (V02 §5.5; M6); over a passage the solid takes each spanning wing's span-ring prism, from the passage's `headroomCm` above that wing's base to its eave, the passage open beneath), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses — an enceinte one object per run that stands, `standing`, `worn` or `patched`, with the attributes `condition` and `material`, a `breached` or `dismantled` run none (g item 114); a retaining wall with `function: 'retainingWall'`), `Tunnel` (II.7's tunnels, swept from the invert profile and the bore), `Bridge` (and a viaduct, a raised road and an aqueduct each a `Bridge` with `function` `viaduct` · `raisedRoad` · `aqueduct`, an arch vault a `BridgeRoom`; item 110, M3a), `TINRelief` (terrain); a basement as a `BuildingPart` below `baseCm` — and, for a building whose plan rung is not `absent`, `BuildingStorey`, `BuildingUnit` and `BuildingRoom` children as V03 §5.3 states (M6-P, file f item 450) — and an underground cell as a `Building` whose base lies below the datum (items 12, 29); the sky content of V05 §5.5, PLAT's extension gaining `+FloatingIsland` and `+SkyAccess` (M6-sky, file f item 415); with `exportWhy`, the uses' siting fields as GeoJSON's; a building under a Works at its stage heights (`heightsAt`) at the export's drawn week (§4.11; item 67); no `referenceSystem` (a local metric CRS); a geo anchor, when the export has one, is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots; `chronicle.csv` and `uses-history.csv` (V06 §5.3; M6-E) | the corpus-calibration input |
| **permalinks** | §6.4's format and refusal rule; `&doc=` references resolve through §11.5's `DocResolver` | a document format (*Knowledge*) |
| **skeleton** (item 101) | the document's **declared subset**: a `.plat` document with no model, whose log is the recipe's intent and, in log order, every event whose entities §2.8's `factTier` reads `declared` — the author's declarations, the sugar events among them (§7.1) — and every author's `delete` of generated content, by its address, and a suppressing delete (item 110 (b)) with the key the fold recorded, written by the skeleton writer as `delete { id, suppress }` (the one place an event carries a suppression key; never written by a client), whose import suppresses the key whether or not the address arises — a removal whose address or key does not arise in the new document reported as applied with nothing to remove, never as a failure (file f item 455); each marked `creation`, each keeping its `proposedBy` on its line (file f item 365), so importing makes them the creation prefix of a new document, whose stages read its drawn declarations ahead (§4.1, §7.7); the declared subset adds the `history` block (a `Trajectory`; V06 §5.3, M6-E) | with the same seed, a skeleton exported and imported again reproduces the city byte for byte, removals included (§6.5 (9)'s skeleton round trip); a clerk's transcript of tool calls is itself a valid skeleton, re-importing with every clerk event still marked (T-V10-12); a document format (*Knowledge*) |

**Rotation.** Picture exports (SVG, PNG, VTT) use the view's rotation (§9.5); GeoJSON keeps model coordinates and records
the rotation.

**The season and the festival (g items 117 (h), 118 (g)).** Every picture export — PNG, print, SVG and the VTT scene's
image — draws the request's year position, weather and festival display (the request carries them, §8.9; the export's
transient list holds `live.festival`'s marks over its frame, for SVG as for the raster formats) and names
them: a line in its legend and in its metadata (SVG `<metadata>`, the PNG's text chunk, the scene's `plat` object) with
the season's name and week, the weather and, while one shows, the festival's name and weeks. A battle-map export
(`.dd2vtt`, Foundry) records the season in its `plat` object — `season { week, name, winter }`, `winter` the climate
row's severity — with each frozen water face as a polygon `ice { walkable }`, walkable in a `severe` winter and water in
any other (item 117 (h)), and draws decorations and boats in its image only — never as walls, doors, lights or obstacles
(item 118 (g)). GeoJSON, glTF and CityJSON carry neither: a season and a festival are looks, never model facts.

**Layers.** `LayerSpec.exportSeparately` (§8.4) is read by the layered exports: where it is
true, SVG writes the layer as its own top-level group `layer.<id>`, the per-layer PNG zip its own PNG, GeoJSON its own
FeatureCollection and glTF its own node; where false, the layer's features join the ground layer's group, PNG, collection
or node, each keeping its `layer` attribute. VTT writes one scene set per model layer whatever it says (a scene is one
elevation).

**Knowledge (item 30; J-A30.83, J-A30.85).** Every picture and interchange export takes the requesting viewer's
knowledge key with the view state (§11.3), or a lower admission the request names (`ExportOpts.knowledge`: §11.2's
`Admission` — a tier, or a key form `{ tier, places }` — admitting exactly what both it and the caller's key admit, so
never above the caller's; the bridge's `export.request` carries the same field; an application passes the view's
effective key there by default, V09 §5.10; file f item 453), and reads it through §9.2's admission function at its band —
an SVG its declared band, a raster the band of its export stop, a storey's scene the building band, a file without a
band (GeoJSON, CityJSON, glTF extras, CSV, a scene's journal entries) as at the city band — so a shared SVG, PNG, VTT
scene or GeoJSON carries no name and no purpose of a local or secret place the key does not admit — the place itself,
its faces and its doors, stays in the file (§9.2) — and none of a concealed use's concealed parts (its rooms, its
concealed door, its way down; item 63) or of a secret access or link (items 64, 65), which §9.2's refinement withholds as
marks too (J-A63.81), nor the lights, glows and shafts those hosts carry (§8.1 item 7). An `unexcavated` cavern or ruin
element (V04's excavation reading), its label, its links and its lights are admitted only at tier `secret`: a picture
draws them only when the request's view has `showUnexcavated` on, GeoJSON and glTF carry them only at `secret`, and a VTT
scene never (M6-U, file f item 278); a `lost` element is admitted as its `knownTo` says, drawn by the `unexcavated`
program in every picture whatever `showUnexcavated`, and written with `excavation: 'lost'` (V04 §5.2; g item 113 (e)).
**The document formats** — `.plat`, the compact twin, the JSON schema, a permalink
(its recipe and log, or the document a `&doc=` link names, rebuild every name, §6.4) and the skeleton — are the model and
carry every name, so they are admitted whole or not at all: `export` offers them
only to a key of tier `secret` (the `owner` and `editor` roles by default, §11.3; a script's by-value `exportDocument`
runs as the owner) and refuses any other key with the API error `E_KNOWLEDGE_TIER`, naming the tier the format needs.
The key governs what the module shows and writes; it does not hide what a client that loads the document holds, so a
host that keeps a place secret from a client sends that client pictures and interchange exports, never the document.

**Authorship and tiers in every export (items 20 (h), 101 R19; J-A101.82).** Every model and interchange format carries,
per record or feature, the tier of each fact by §2.8's `factTier` (GeoJSON as `plat:tier`) — and every format that carries the log (`.plat`,
the compact twin, the JSON schema, a skeleton) carries each event's author, its `proposedBy: 'clerk'` where a clerk
proposed it (§7.1) and its `dossierChange` where the dossier caused it (§7.7 item 13); a picture's metadata (SVG
`<metadata>`, the PNG's text chunk, the VTT scene's `plat` object) states the share of its entities in each tier and
whether any clerk-proposed event made them. The hobby reads what was hand-declared, what the rules derived and what an
AI clerk proposed from the file itself.

**Inert exports (item 85 (c); J-A85.81).** Every text node, attribute value and metadata string an exporter writes is
escaped by its format's own rule — XML escaping in SVG and every XML text, JSON string escaping, the VTT formats' JSON —
so a name from a dossier or from another user's edit can never become active content; the SVG writer emits no script
element, no event attribute, no `foreignObject` and no external reference (its fonts and images are data URIs, §17.2), and
§9.5's emblem imports stay sanitised. The bar — CI runs hostile names through every exporter and asserts inert,
well-formed output — is §13.2's. **Display names (item 85 (b)).** A host may pass `HostContext.displayNames` (dossier key
→ text; §14) with one export request: the exporter draws those texts for that request only and writes them nowhere else —
never into the document, a cache or a later export.

**The two GeoJSON variants (N-14).** RFC 7946 fixes WGS84 longitude and latitude and removed the `crs` member, so the
default export writes exactly that. A **geo anchor** `{ latDeg, lonDeg, bearingDeg }` places the settlement centre and
turns model north by the bearing; it is an export option, remembered per document in the view key `exportAnchor`
(§2.9), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never mistaken
for a real place. For a dossier-bound map whose host supplies the optional realm block (item 77; §14), the port's realm
fit sets the anchor's `bearingDeg` — the turn of model north that fits the derived gates to the partners' true
bearings (§7.7 layer 2) — as the key's documented default; no geometry moves for it. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator easting
and northing — scale 1 on the central meridian through the anchor, false origin at the anchor — and inverted to WGS84
latitude and longitude with Krüger's published series to fourth order in the third flattening, evaluated with `dmath`
so the file is byte-identical on every host; coordinates are written with 7 decimals (≈ 1 cm), exterior rings
counter-clockwise and holes clockwise (RFC 7946 §3.1.6). Distances a GIS measures on the ellipsoid then match model
distances within a factor 1 + (d ÷ R)² ÷ 2 — at most 3.1 × 10⁻⁶, ≤ 5 cm, at the farthest corner of the largest frame
(≈ 15.7 km from the centre at aspect 2, §3.2 (1)). A foreign member `plat` records the anchor, whether it is the default,
the document id and the output version. The **metric** variant — offered "by prior arrangement" (RFC 7946 §4) for tools
that want the model's own metres — writes x east and y north in metres from the settlement centre with 2 decimals (the
centimetre lattice exactly), no `crs` member, in `<name>.metric.geojson`, beside a sidecar `<name>.metric.json` giving
the origin, the unit, the axes, the document id and the anchor if one is set (J-R31). The metric variant's features also
carry, beside their public attributes, `use` (the class family key), `district` (the id of the district the feature lies
in) and, on plots and buildings, `prosperity` (the field's value, 3 decimals) — V12 §2.2's measurement profile — its
schema version bumped once for them; the strict variant is unchanged (M2b, file f item 447).

**Where exports run.** Every `export(h, fmt)` runs in the generation worker, which holds the document (§8.9). *Model
formats* — `.plat`, the JSON schema, the compact twin, the skeleton, GeoJSON, glTF / OBJ, CityJSON, CSV and permalinks — read the model
and §8.10's instance function (`Exporter.write(doc, null, opts)`) — except the JSON schema's `plan` blocks, which
carry every stored plan and the derived plans the exporting session's elaboration cache holds, each with its rung state
(§2.8), so which derived plans a JSON export carries depends on what was clicked, the cache being non-canonical (§2.9;
J-A28.86). *SVG* needs a display list and label placement at the export's own stop (§8.7): the SVG exporter builds the
export's transient list (§8.1 item 6) for its band and frame with `DisplayListBuilder.build(model, band)`
(≈ 4 µs per building at the city band), runs S13b there at the export stop through `@plat/labels` with `@plat/render`'s
`ObstacleSource` and `RoleIndex` over that list — the code the tile worker runs, with the export frame as the visible
region of §9.2's scope, so the placement is the one the tile worker would compute at that stop and §13.3's placement
digests test the code both run — and writes the file (time: §12.7; the list is §12.8's export-time peak). A
district-band SVG's list is counted in the size estimate shown before writing (J-R41). *Raster formats* — PNG,
print and the `.dd2vtt` scene image — use a transient list too: the generation worker builds it the same way for the
export's band and frame (including the live layers the export's layer set names, as their providers stand at the
request) and transfers it with the raster-export request (§8.9), which also carries the look and view state as they
stood at the request — the sheet, §8.8's view-state switches, the shadow sun and the light step. In its queue's export
class (§8.9) the tile worker runs S13b at the export stop over the list, with the export frame as the visible region; in
`lit` with a `path` sun it bakes the request's crown set when it is not cached and holds it until the export completes;
it rasters every tile with the request's look and view state by §8.8's band-streamed assembly and streams the encoded
bytes and a progress message per band back; the generation worker wraps the VTT scene around the image. A lit export's transient list also
carries what its light reads beyond the frame (§8.8): its band's marks over the frame dilated by one export tile side (its
tiles' first rings) and by the largest light radius, and the city band's casters (§8.1 item 2) over the frame dilated by
§8.4 (c)'s largest window R, which its ring blocks read. That R takes Z from the city band's surface tops (the
`DisplayList` comment) with the frame's lowest terrain sample and the export's sun, so a caster beyond the frame's edge still shades it; the casters'
rows, at most a whole city band's (≈ 1.9 KB per building), count in the export-time peak and its size estimate (§12.8).
The export therefore shows the model, its look and its view state as they stood when it was requested, whatever is
edited, restyled or animated while its bands are rastered; the export dialog shows the bands done out of the bands total
(J-R47).

**The CityJSON extension.** By the CityJSON 2.0 convention a root property outside the core schema is named with a
leading `+` and defined by an Extension listed in the file's `extensions` member; whether a validator rejects an
undeclared one was not executed (PLAUSIBLE), so PLAT declares its one. `@plat/export` ships
`schemas/cityjson/plat.ext.json`, a CityJSON Extension (`type: "CityJSONExtension"`, name `Plat`, its own version,
`versionCityJSON: "2.0"`) whose `extraRootProperties` define `+platGeoAnchor` as an object of exactly three numbers —
`latDeg` in [−90, 90], `lonDeg` in [−180, 180) and `bearingDeg` in [0, 360) — and whose `extraAttributes`,
`extraCityObjects` and `extraSemanticSurfaces` are empty. A file with an anchor lists
`"extensions": { "Plat": { "url": …, "version": … } }`, the url being the address at which each release publishes the
schema beside the package; a file without an anchor — the default — has neither the property nor the member and is
plain CityJSON. CI validates both kinds with the extension schema supplied from the repository, so no check fetches
anything. A change to the property bumps the extension's version with the exporter's output version (§6.4).
**Measurement** at the CityJSON exporter's milestone (M3b, D-8): the anchored file passes the CityJSON validator with the
extension. **Pre-decided fallback:** the anchor moves to a sidecar `<name>.geoanchor.json` beside `<name>.city.json` —
the three numbers, the document id and the output version, checked against its own JSON schema like the metric
GeoJSON's sidecar — the CityJSON file carries neither the property nor the member, and the report says so (J-R43).
CityJSON is built for its lossless integer-vertex encoding (J-R14).

**Identity in every export (LC-1, LC-28).** Every export carries entity addresses (§6.3) and the document's supersedes
table (tombstone → successor), so an outside tool that keyed data to an entity can follow it across re-derivations; ids
cross the API and bridge boundary as `<docId>/<id>`.

**The `.dd2vtt` profile (DEF-4).**
* **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares —
  cut to the map's `bounds` as every export frame is (§8.7; g item 116 (c)).
  One scene image is ≤ 8 192 px on a side at the declared grid (default 1 square = 5 ft = 1.5 m at 100 px, so ≈ 123 m);
  a larger scope is split into a grid of scenes aligned to grid lines, or the user lowers the pixels per square (≥ 50) —
  the export dialog shows the choice before writing. Output is exact pixels per cell (grid alignment error 0 px per
  cell, O11 g).
* **Fields:** `format` 0.3; `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }`;
  `line_of_sight` — polylines in grid units from building footprint edges (minus door openings), enceinte faces along
  every `standing`, `worn` and `patched` run (a patch is a wall) and none along a `breached` or `dismantled` run (an
  opening; g item 114 (f)), yard
  walls and hedges from boundary treatments (fences and railings do not block sight), cliffs, retaining walls whose
  derived step (`stepProfile`, §2.7) is at least `vtt.retainingMinCm` (150 cm, a cell of the VTT export settings) as
  polylines along the wall broken over every stair or ramp interval (an opening, not a portal), and a raised part's
  supports' footprints as closed polylines as cliffs are (one rule; M3a, file f items 447, 448); no portal
  where a raised way crosses a street; `objects_line_of_sight`
  empty; `portals` — doors at every entrance of a building's entrance set (§2.6; item 29: `main`, `side`, `rear`, `yard`
  and `service`, each the width of its plan opening where the plan rung exists (V03 §3.6 O3; M6-P, file f item 451), else
  1.2 m) and gates (their opening), each
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }` — a concealed door only for a key
  that admits its use (item 63); a window, where a storey's scene writes one, a portal written `closed: false`, since the
  format has no window flag and importers read an open portal as a window (file f item 454); `lights` — the model's
  lights in the scope (item 68): every `LightSource` lit at the export's drawn week and every lit window at the export's
  hour (§10.3), `{ position, range in squares (its radius), intensity: 1, color, shadows: true }` with `color` as eight
  hexadecimal digits, alpha first (`AARRGGBB`), and on the underground layer its shafts — each by §8.1 item 7; `environment { baked_lighting: true,
  ambient_light }` with the ambient of the export's light setting; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in, lit by §8.4's CPU reference at the export's light setting (a day or a
  night scene).
* **Per layer:** one file per model layer — the underground one per depth band (II.7.3) — its elevation in the file name
  and in a `plat` extension object; coordinates exact to the grid (O11 g). An underground band's scene (M6-U, file f
  item 452) takes `line_of_sight` from every void kerb and chamber wall and every underground
  building's footprint less its doors; `portals` only at openings in a wall line — a door access, a door or breach link,
  an underground building's entrances, each tunnel grille (closed when locked, bricked, gated or secret); every vertical
  access (stair, shaft, ladder, hatch, well, grating, mouth, sinkhole) a shaft light plus a `plat` extension object; and
  `lights` the band's lights and shafts — each only where the export's key admits it (§8.1 item 7).
* **Per raised way (item 110 (b); M3a):** each raised way crossing the scope adds one deck scene at its mean deck
  elevation, named as a storey scene is, its parapet edges `line_of_sight`, its end stairs or ramps open portals
  (`closed: false`) and the ground beneath drawn dimmed — at most 8 per export, the longest first, the dialog saying so;
  a Foundry scene writes each deck as one more level with its elevation band.
* **Per storey (item 28):** a building whose plan rung exists exports one scene for each storey, at that storey's elevation:
  `line_of_sight` from its walls minus their openings, `portals` from every opening and every entrance, the stair core a
  named portal on both storeys' scenes; `lights` — one per lit room (`Room.lit`, §2.6) that draws for the export's key (a concealed room's only for a key that admits it, §8.1 item 7) at its spine summit (§3.8's
  `spine` reader, its sampled medial axis on a downgrade; §8.5), `{ position, range, intensity: 1, color, shadows: true }`
  as the scene-level `lights` above, `range` being the room's diameter in squares and `color` the `glow` role's; the
  walls keep their centimetre positions and only the scene's grid snaps.
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged;
  an enceinte's walls by run as `line_of_sight` above — a `patched` run a wall, a `breached` or `dismantled` run none),
  the same lights, a background image file, grid size and distance units — written before the walls — and journal
  entries from the gazetteer.
* **Plain scene PNG:** on request a plain PNG of the scene named `{cols}x{rows}` is written beside the file, for
  tabletops that read the grid from the file name (file f item 454).
=== END ===

=== REPLACE ### 11.2 The embedding API and the worker boundary (SCL-6) ===
### 11.2 The embedding API and the worker boundary (SCL-6)

```ts
type DocHandle = { readonly id: string };            // the document lives in the generation worker
type Progress =                                      // item 119 (c): posted by the generation worker, never polled; read by §12's progress rule (V09 §4.21.9)
  | { stage: StageId; index: number; of: number }   // as each StageDecl of the run starts: its index among the run's stages and their count
  | { wait: 'epoch'|'history'|'dossier'|'export'|'migrate'; done: number; of: number };   // a wait that is not a stage run: its own steps (epochs, replayed epochs, the port's steps, export bands, replayed events)
interface PlatApi {
  generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void;
    docId?: Uuid /* a host-minted id, e.g. a SettlementForge map record's mapId; else minted here (SettlementForge stage; file f item 459) */;
    prefix?: EditEvent[] /* the port's creation prefix, written at positions 0…k with `creation` set */;
    scratch?: boolean /* a scratch document, as `scratch` below (M3c; file f item 469) */ }): Promise<DocHandle>;
  scratch(h: DocHandle): Promise<DocHandle>;   // the committed state of h at its logHead, written to its snapshot form in the generation worker and opened as a new handle by §2.9's reader: never saved, never bridged, never resolved by a DocResolver; its session 'clerk:<n>', its role and knowledge key h's; an editing role's call (a viewer's refused 'role'); its memory a session line (§12.8; V10 §6.2) (M3c)
  open(bytes: ArrayBuffer, opts?: { readOnly?: boolean; session?: string /* a host-assigned session (§11.3); otherwise the document's stored session, minted on first edit (§7.4) */;
    onProgress?: (p: Progress) => void /* the replay of load verification and a migration ('migrate') */ }): Promise<DocHandle>;             // .plat or CBOR twin; bytes transferred in
  edit(h: DocHandle, e: EditEvent | EditEvent[], opts?: { filtered?: boolean; admitAs?: Admission }): Promise<ApplyResult>;   // an event may arrive with its `fates` filled (below); `filtered` and `admitAs`: *Knowledge*, below (file f items 470, 572)
  regenerate(h: DocHandle, scope: Scope, mode: 'keep'|'newRandom', opts?: { discardEdits?: boolean; onProgress?: (p: Progress) => void }): Promise<ApplyResult>;   // §7.1's Regenerate (keep settings) and New random
  adjust(h: DocHandle, param: string, value: unknown, opts?: { onProgress?: (p: Progress) => void }): Promise<ApplyResult>;   // §7.1's Adjust, or Re-derive from Sk for a parameter consumed early
  confirm(h: DocHandle, token: string, fates: EditFate[], renames?: Rename[]): Promise<ApplyResult>;                     // completes an action that returned `confirm` (below)
  cancel(h: DocHandle, token: string): void;                                                         // drops it; nothing was committed
  preview(h: DocHandle, e: EditEvent | EditEvent[], opts?: { view?: ViewHandle; filtered?: boolean; admitAs?: Admission;
    variations?: 3; page?: number; focus?: number }): Promise<PreviewResult>;   // item 101: the dry run alone — nothing committed; with a view, its ghost drawn as `live.ghost` (§8.2); an editing role's call (*Knowledge*, below); `variations`: *Variations*, below (file f item 461)
  thumbnail(h: DocHandle, req: { previewId: string; variation: number; box: BoxCm; px: [number, number] }): Promise<ImageBitmap>;   // the tile worker's export-class raster of a preview's overlay ghost marks, ≤ 160 × 120 CSS px at the view's DPR, transferred
  undo(h: DocHandle, of?: number): Promise<ApplyResult>;   // appends an `undo` event for the handle's session (§7.4); `of` only for the `owner` role; a conflict lists the dependent events
  redo(h: DocHandle): Promise<ApplyResult>;                  // appends a `redo` event for the handle's session (§7.4)
  query(h: DocHandle, q: Query, opts?: { admitAs?: Admission }): Promise<QueryResult>;   // ≤ 64 KB per page, paginated (kinds below); admitted by the knowledge key (below)
  view(h: DocHandle, target: HTMLCanvasElement | OffscreenCanvas, opts?: ViewOpts): Promise<ViewHandle>;   // tiles flow from the tile worker
  setView(v: ViewHandle, patch: Partial<ViewState>): void;
  setViewOpts(v: ViewHandle, patch: Partial<ViewOpts>): void;   // an `undefined` viewAs clears it (file f item 464)
  export(h: DocHandle, fmt: Format, opts?: ExportOpts & { onProgress?: (p: Progress) => void /* 'export': bands done of total */ }): Promise<ArrayBuffer>;              // transferred out
  report(h: DocHandle): Promise<GenerationReport>;
  advance(h: DocHandle, req: AdvanceRequest, opts?: { onProgress?: (p: Progress) => void /* wait 'epoch': epochs done of total */ }): Promise<ApplyResult>;   // refused on a dossier-bound document; V06 §4 (M6-E; file f item 458)
  cancelAdvance(h: DocHandle): void;
  forkAt(h: DocHandle, seq: number): Promise<DocHandle>; rerunFrom(h: DocHandle, seq: number): Promise<DocHandle>;   // each an editing role's call
  subscribe(h: DocHandle, handler: (e: ApiEvent) => void): Unsubscribe;
  close(h: DocHandle): void;
  registerProvider(p: { id: string; version: string; moduleUrl: string }): Promise<{ status: 'ok' } | { status: 'refused'; reason: 'nondeterministic'|'origin' }>;
    // §11.4's door (4): the provider's module loaded into the generation worker, the derivation pool and the double-run check's two fresh workers
    // (§6.5 (8)) — refused `nondeterministic` when the two runs differ, `origin` when its URL's origin is neither the embedding page's nor one the
    // embed's origin allowlist admits (§11.3); a call of the page's own or a script's, which no bridge message makes (§11.3, §11.4; J-A85.83)
}
interface ViewOpts { viewAs?: Admission /* a display filter: this view's drawing, labels and reads admit exactly what both the view's knowledge key and viewAs admit (§9.2's admission function) — a tier alone is read with the key's places; a key form is a key in its own right, so when its tier is the lower its places stand in for the key's, a place the key withholds staying withheld (a host's party key: V08's players' view); the knowledge key itself is unchanged, so the document formats stay available to the role (file f item 464) */ }
type Admission = 'public'|'local'|'secret'|{ tier: 'public'|'local'; places: Id[] };   // a lowering of a caller's key (file f item 572); `public` below `local` below `secret`
type MsgRef = { key: string; args?: Record<string, string | number | { id: Id }> };   // declared in @plat/model: a catalogue key with arguments; an address argument rendered under the caller's key (a withheld place as its kind); its English text the application's catalogue's (V09 §2.9) (file f item 463)
type Effect = { kind: 'added'|'removed'|'rerouted'|'joined'|'lost'|'displaced'|'rebuilt'|'moved'; msg: MsgRef; targets: Id[] };   // a consequence to something not held (the held ones are `fates`), filled from the dry run's touched set by the owning volumes' rows — V02's deck buildings, V03's stored plans, V04's arch vaults, V06's generated routes, the base's junctions, water and households (file f item 465)
type ApplyResult =
  | { status: 'ok'; logHead: string /* §11.3 */; changed: number /* addresses whose records changed */; created: Id[] /* the addresses the committed events minted, address order, the first 256 (file f item 470) */ }
  | { status: 'conflict'; outcome: MsgRef /* the row of §7.1's dry-run outcome table: its key (refuse.* …) with its arguments, rendered per caller (§9.2) */;
      actions: ConflictAction[] }                                      // §7.1's dry run: the nearest valid position, the blocking lock, a stale base …
  | { status: 'confirm'; token: string; fates: EditFate[] /* the first 1 000; the rest by query 'fates' */; renames: Rename[] /* the case-(4) renames the dry run listed (§6.3, §7.3 item 4); the rest by query 'fates' */;
      counts: Record<EditFate['fate'], number>; scope: EditScope /* resolved */; effects?: Effect[]; effectsMore?: number; holds?: MsgRef };   // §7.3 item 4: nothing is committed until confirmed
type ConflictAction = { kind: 'moveTo'|'unlock'|'unassign'|'reroute'|'stale'|'invalid'; target?: Id; at?: PointCm; message: string /* the English default */; msg: MsgRef /* its own button's words (V09 §2.9) */ };
type PreviewResult =
  | { status: 'refused'; reason: 'role' }   // a viewer's preview (*Knowledge*, below): nothing computed, so no list, count or shape
  | { status: 'ok'|'conflict'; outcome?: MsgRef /* on conflict: as ApplyResult's */; actions?: ConflictAction[] /* on conflict */;
      empty?: MsgRef /* §7.1's empty edit: the reason (V09 §4.9's `edge.*` rows); then status 'ok', every list empty and every count 0 — the edit appends nothing */;
      fates: EditFate[] /* the first 1 000 */; renames: Rename[];
      counts: { plots: number; households: number; buildings: number; byFate: Record<EditFate['fate'], number> } /* §9.5's count badge */;
      created: Id[] /* the addresses the events would mint, from the document's `nextSeq` (§6.3) */;
      shape?: PolygonCm | PointCm[] /* a points form's derived shape, resolved as the event would store it (§7.1) */;
      arcs?: { kind: 'walled'|'barrier'; grade?: 'full'|'light'|'closure'; barrier?: 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte' /* J-VI.3 */; points: PointCm[] }[];   // a `drawWall` or `placeGate` preview: the derived circuit's arcs, typed by g item 106 (a)'s closure and (c)'s grade (file f item 462)
      anchors?: PointCm[] /* each anchor tower's point */;
      bent?: MsgRef /* the reason a declaration was bent to the nearest lawful one (R2) */;
      alternatives?: Id[] /* a placement's (placeAt, assign, roster line) top three plots: the first three `SiteCandidate`s the `sites` query returns for its class at its anchor or locus; for a dwelling closure bent to a dug access (§7.3 item 9 (d)), the further qualifying buildings in that rule's order, at most three (file f items 463, 372) */;
      effects?: Effect[] /* at most 50, in the order of `kind` then of the targets' size */; effectsMore?: number /* the rest */;
      holds?: MsgRef /* a removal whose fold records a suppression or a removed slot: `info.remove.holds` with its verb (`rebuild` · `raise`) and kind */;
      previewId?: string; variations?: { event: EditEvent /* resolved, with its absolute reroll map */; result: PreviewResult; page?: number }[] /* *Variations*, below */ };
type Query =
  | { kind: 'gazetteer'; text?: string; kinds?: string[]; page?: number }
  | { kind: 'people'; type?: string; race?: string; gender?: string; profession?: string; workplace?: Id; ageRange?: [number, number]; household?: Id; district?: Id; page?: number }   // COV-FTG-C13
  | { kind: 'hit'; view: ViewHandle; x: number; y: number; radiusPx?: number /* default 10; 22 under a coarse pointer */ }   // answered by HitAnswer (file f item 466)
  | { kind: 'whereIs'; person: Id; day: string; hour: number }
  | { kind: 'relations'; person: Id; up: number; down: number }   // the family-tree view (COV-FTG-C11), from the relation store
  | { kind: 'inView'; view: ViewHandle }                          // the "features in view" list (COV-FTG-A24; the non-visual route, J-S19)
  | { kind: 'fates'; token: string; page: number }                // the full fate list of a pending confirmation, then its renames
  | { kind: 'why'; id: Id; path?: string; mode?: 'asPlaced'|'asNow'; historyPage?: number }   // item 101: the oracle — the rule, its inputs and the alternatives it weighed, from provenance and §2.8's derivation records; filtered under the caller's key (*Knowledge*, below); answered as `WhyAnswer` by the kind's `WhyProvider` and the registered section providers (§2.8)
  // the reader kinds of file f item 468 (M3a), each answered as its type below (ReaderAnswers):
  | { kind: 'brief' }
  | { kind: 'entity'; id?: Id; at?: PointCm; layer?: Layer; below?: boolean; dossierKey?: string }   // by address, or the top of the hit stack at a model point (item 466's order: a raised part above ground part 0); below: the next one down; dossierKey: by a binding key (file f item 583)
  | { kind: 'sites'; cls: string; near?: PointCm; radiusM?: number; district?: Id; k?: number /* 1–8, default 3 */ }
  | { kind: 'measure'; from: Id; to: Id; by?: 'straight'|'street' }   // default 'street' between two ground entities, else 'straight'
  | { kind: 'frame'; week: number; near?: PointCm; radiusM?: number; page?: number }
  | { kind: 'rule'; table: string; key: string }
  | { kind: 'profile'; cls: string }
  | { kind: 'links'; ids?: Id[]; region?: Box; good?: string; page?: number }   // g item 105 (j): the supply links bound by S10a/S10b's binding function, read from the generation worker's link cache (V09 §3.15), recomputed and never stored — `LinkRow`s (V09 §2.7) with each link's orientation, its declared link-edit row and a SettlementForge chain's status (file f item 460)
  | { kind: 'plan'; building: Id; storey?: number } | { kind: 'planReport'; building: Id }   // V03 §4.6: derives an absent or stale plan into the cache as a click does, logs nothing; knowledge-filtered by V03 §5.4's merge under §9.2's admission function at the building band (M6-P; file f item 457)
  | { kind: 'history.index' } | { kind: 'history.frame'; week: number /* a view state, not a model change */ } | { kind: 'history.diff'; w1: number; w2: number } | { kind: 'history.chronicle'; page?: number };   // V06 §4 (M6-E; file f item 458)
interface HitAnswer { ids: Id[] /* every mark under the point within the radius, top first by §8.2's draw order — a raised part above ground part 0 — one entry per entity */;
  sub?: { id: Id; path: string /* the sub-part under the point: 'spans/<ordinal>' of a raised way, 'crossings/<retaining wall id>' of a way, 'tiers/<k>' of a stepped building */ } }   // computed on the main thread from the hit-test slices (§8.9) within 1 ms
// The reader's and the oracle's answers (file f item 468, M3a; declared here once — V10 §2.13 cites them). Every bearing and distance is
// measured from the growth centre (S3's root reservation, §4.2) in model metres and model north; every name, purpose and reference
// passes *Knowledge* (below) under the caller's key as at the city band.
type Bearing8 = 'N'|'NE'|'E'|'SE'|'S'|'SW'|'W'|'NW';   // the clerk's tool vocabulary reads this type (V10 §2.12)
interface ReaderAnswers { brief: MapBrief; entity: EntityCard | null; sites: SiteCandidate[]; measure: MeasureAnswer; frame: FrameAnswer;
  rule: RuleAnswer; profile: ProfileAnswer; why: WhyAnswer }   // QueryResult of a kind K here is ReaderAnswers[K]; every other kind's page is as its member's comment states
interface MapBrief {
  settlement: { name: string; tier: FactTier; tierWord?: string; product: 'base'|'village'; rung: string /* THORP … METROPOLIS */; population: number;
    form: string; era: string; band: string /* the population-weighted mean band */; dossier: boolean; week?: number;
    arid?: true /* the biome's climate row is arid (§4.2 S0): item 111's oasis chance, water pull and climate cell apply */;
    history?: { peak?: { rung: string; population?: number /* absent when the peak is symbolic */; symbolic: boolean };
      refounded: number; buried: number /* counted after the knowledge filter */ } /* item 113: §2.7's HistoryRecord, present when a replay ran */ };
  frame: { widthM: number; heightM: number; builtRadiusM: number /* the equal-area radius of the districts' union */; centre: Id };
  water: { setting: WaterSetting; coast?: { side: Bearing8 }; rivers: { id: Id; name?: string; enters: Bearing8; leaves: Bearing8 }[];
    lakes: { id: Id; name?: string; bearing: Bearing8; distM: number; spring?: true /* an oasis, item 111 */ }[]; harbour?: { id: Id; bearing: Bearing8 } };
  relief: { class: string; rises: { bearing: Bearing8; distM: number; riseM: number }[] /* the ≤ 3 highest */ };
  walls: { id: Id; kind: string; closure: string; gates: { id: Id; name?: string; bearing: Bearing8; way?: Id }[];
    open: { from: Bearing8; to: Bearing8; barrier: 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte' /* J-VI.3, as WhyAnswer.closure */ }[] /* item 106: arcs a barrier closes */;
    runs?: Partial<Record<'standing'|'worn'|'patched'|'breached'|'dismantled', number>> /* item 114: the runs of Enceinte.condition by state (§2.7), present when any run is not standing */ }[];   // enceintes only: never a RetainingWall
  districts: { id: Id; name?: string; withheld?: true; kind: string; identity?: string; band: string; bearing: Bearing8; distM: number;
    areaHa: number; walled: boolean; buildings: number; households: number; neighbours: Id[]; declared: boolean }[];
  regions: { id: Id; name: string; members: Id[] }[];
  roads: { id: Id; name?: string; class: WayClass; ends: [string, string] /* a gate id, a district id or a bearing */ }[];   // part-0 ways only
  raised: { id: Id; name?: string; kind: 'viaduct'|'elevated'|'aqueduct'; source: 'generated'|'declared' /* file f item 244's derived value */;
    carriedSince?: number /* a generated way standing below CITY: the week the rung first fell below CITY with it standing, derived at
                             read from its lifecycle and the epochs' rungs (V06 §4.5); the info.raised.carried outcome reads the same */;
    reason?: 'drop'|'link'|'water' /* J-VI.2 */; ends: [string, string] /* ground way, gate or district ids */; crosses: number /* part-0 ways crossed */ }[];   // item 110 (b)
  terraces: { district: Id; walls: number; stepMaxM: number }[];            // item 110 (a): counts per district, never each wall (J-V10.77)
  decks: { host: Id; kind: 'bridge'|'pier'|'mole'|'quay'; plots: number; slots: ('head'|'mid')[] }[];   // item 110 (d): the deck plots and the free landmark slots
  landmarks: { id: Id; name?: string; withheld?: true; kind: string /* the registry kind when withheld */; district: Id; tier: FactTier; declared: boolean }[];
  layers: { islands: number;
    underground: { systems: { id: Id; kind: string /* II.7.6's system kinds, 'ruin' among them (V04 §2.2) */; name?: string; tier: FactTier;
      excavation?: 'accessible'|'unexcavated'|'lost' /* caverns, ruins and a buried former settlement; 'unexcavated' only at a secret key; 'lost' (item 113 (e)) to the key that admitted it while accessible (V04 §5.2) */;
      accesses: number; dwellings: number; source?: Id /* a catacomb's burial face or quarry working: CatacombComplex.source.ref */;
      rank?: number /* a catacomb's */ }[] } };      // computed after the knowledge filter; a crypt is never a system (it is its church's, V10 §3.9a)
  dossier?: { unplaced: { id: Id; name?: string; kind: string }[]; blocked: { id: Id; rows: string[] }[]; rejected: number };
  report: { belowFull: { feature: string; delivered: 'degraded'|'omitted' }[]; unplaced: number };
  counts: { plots: number; buildings: number; households: number; declared: number; clerkProposed: number };
  salts: Record<RerollableConcern, number>;   // §6.1's effective salt of each rerollable concern (the numbers DisplayList.salts carries); no name, no place:
                                              // read by the T11 and T12 encoders (V10 §4.1), never rendered in the map block
}
interface EntityCard {
  id: Id; kind: string /* the registry kind when withheld */; withheld?: true;
  name?: { text: string; tier: FactTier; displayText?: string };
  attrs: { path: string; value: string | number | boolean; tier: FactTier }[];   // the registry's readable paths, ≤ limits.attrs; a withheld entity's only where purpose is false
  where: { district?: Id; plot?: Id; quarterNode?: Id; bearing: Bearing8; distM: number };
  anchor: PointCm; bounds: [PointCm, PointCm]; groundCm?: Cm;                   // the caller's own geometry; stripped from every result a model or host sees
  lifecycle: { existence: Existence; locked: boolean; pinned: boolean; declared: boolean; assigned: boolean; clerkProposed: boolean };
  uses?: { id: Id; cls?: string /* absent when the use is withheld */; withheld?: true }[];
  members?: { id: Id; kind: string; withheld?: true }[];                      // item 108: a record's members, ≤ limits.members — the one owner of a record's members (V09 withdrew its query kind)
  excavation?: 'accessible'|'unexcavated'|'lost';                              // an element of a cavern or ruin cluster (V04 §3.5.7 (g); 'lost', item 113 (e))
  dossierKey?: string;                                                         // the binding key (§7.7 item 12): for V09 and a host reader; stripped from the model-facing projection (V10 §3.12 (3))
  hasBelow?: true;                                                             // entity { at }: another entity lies under this one in the hit stack (a street under a viaduct)
}
interface SiteCandidate { plot: Id; district: Id; score: number; hardFails: string[] /* row ids under the withheld rule */; pulls: WhyPull[] /* top 5 */; distM?: number }
interface MeasureAnswer { from: Id; to: Id; by: 'straight'|'street'; metres: number /* rounded to 10 m */; walkMinutes?: number /* street: metres ÷ 80 m per minute, rounded */;
  via?: Id[] /* street: the ways followed, key-filtered, ≤ 12 */; unreachable?: true }
interface FrameAnswer { week: number; epochWeek: number /* the frame locate(w) chose (V06 §3.15.2) */;
  entities: { id: Id; kind: string; name?: string; withheld?: true; state: string /* standing, begun, ruined … at that week */ }[] /* ≤ 64 per page, address order */;
  page: number; more: boolean; since?: { removed: number; added: number } /* against the current map, in the same radius */ }
interface RuleAnswer { table: string; key: string; says?: string; provenance: string; extension: boolean; readers: string[] /* stages and components */;
  citing: { count: number; ids: Id[] /* ≤ 16, key-filtered: an entity whose purpose the key withholds is absent and uncounted */ };
  register?: { id: string; status: CalibrationEntry['status']; method: CalibrationEntry['method']; due: string } /* the cell's entry in V12 §2.6's
    plat/calibration/register.json, where one exists: told plain first, its id and run only behind "details" (V10 §3.5) */ }
interface ProfileAnswer { cls: string; cells: { column: string; value: unknown; source: string /* family, class delta, custom-resolution rung */ }[] }
interface WhyAnswer {                                                          // the oracle's answer, produced by the kind's WhyProvider and the section providers (§2.8; item 270)
  id: Id; kind: string; withheld?: true;                                       // the oracle rule (1) below: a withheld target carries nothing more
  mode: 'asPlaced'|'asNow';                                                    // J-V10.44: the score as the rules computed it when they placed it, or as it stands now
  facts: { path: string; value: string | number | boolean; tier: FactTier; row?: string /* the DRn that derived it (§7.7 item 10) */ }[];
  cause: WhyCause[];                                                           // how it came to be, oldest first
  pulls?: WhyPull[];                                                           // items 103 (e), 107: the terms of its placement, largest first
  links?: WhyLink[];                                                           // item 105 (j)
  alternatives?: { plot: Id; score: number; hardFails: string[] }[];           // the closest sites weighed (§4.7 S10b), ≤ 3
  drivers?: FieldDrivers;                                                      // item 102 (f)
  closure?: { from: Bearing8; to: Bearing8; barrier: 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte'; class: string }[];   // item 106 (g); 'sheer' an island's rim (V05 §3.21)
  profile?: { rung: 'declaration'|'archetype'|'category'|'tags'|'library'|'keywords'|'fallback';
    sources: { rung: string; key: string; weight: number }[]; lowConfidence?: true };                                   // item 104 (a)
  members?: { step: 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT'; range?: [number, number]; count: number; ids: Id[] /* ≤ limits.members */ };   // item 108
  sections?: WhySection[];                                                     // what a volume's provider knows beyond these fields (V10 §3.9)
  history?: { seq: number; week?: number; kind: string; by: 'generation'|'user'|'clerk'|'host'|'epoch'; change?: { changeId: string; source?: string /* DossierChange.source, §7.7 item 13 */; reason?: string } }[];   // newest first, one page of ≤ limits.historyPage
  historyMore?: boolean; historyPage?: number;                                 // further pages by query why { historyPage } or read_map history
  removed?: { seq: number; week?: number; by: 'user'|'clerk'|'host'|'epoch' };  // a tombstoned address a live `delete` removed (V10 §3.9)
  evaluated: { logHead: string; drifted: boolean; exact: boolean; driftCause?: MsgRef };   // V10 §3.9 step 4
}
type WhySection = { kind: string /* registered with its provider: 'underground', 'crypt', 'raised', 'history', 'massing', 'plan', 'fabric', 'island', 'move' … (V10 §3.9, V10 §3.9b) */;
  rows: { key: string; value: string | number | boolean; unit?: string; tier: FactTier; row?: string /* a table row id */;
    says?: MsgRef /* V09's catalogue key with its slots */; ref?: Id; purpose?: true /* withheld with its entity */; withheld?: true }[] };
type WhyCause = { step: string /* a stage id or an event kind */; rule: string /* the rule's name in its home section */;
  slices: string[] /* SliceRef keys consulted, ≤ 8 */; seq?: number; chance?: string /* the concern whose draw chose among equals */ };
type WhyFamily = 'nuisance'|'need'|'clientele'|'supply'|'alignment'|'competition'|'coverage'|'sun'   // V11 §2.4's families
  | 'signature'|'spacing'|'class'|'district'|'field'|'character'|'allocation'|'chance'|'hard';      // the other terms of S10b's score
type WhyPull = { row: string /* V11 §2.4's derived-row id, or 'fam/<family>' under the withheld rule */; family: WhyFamily /* derived from row (V10 §2.13's family table) */;
  says: string /* the row's sentence: a family's says, a pair's reason, a class row's note, a supply edge's good (V11 §3.3.1, V11 §2.4) */;
  share: number /* signed share of the winning score */; target?: Id; withheld?: true; via?: Id /* a cross-arena term's landing access (V05 §3.20) */ };
type WhyLink = { good?: string /* absent when `other` is withheld */; role: 'provider'|'consumer'; other: Id; withheld?: true; distM: number; comfortM: number; maxM: number;
  orientation: 'source'|'market'|'balanced'; branchOf?: Id /* item 105 (h): a split works-and-shop */;
  declared?: 'bindTo'|'avoid'|'cut' /* a siting.linkEdits row pins, avoids or cuts it (item 105 (j)) */; via?: Id /* the landing a cross-arena link crosses */;
  chain?: { id: string; status: 'impaired'|'vulnerable'; entrepot?: 'consumer'|'provider' } /* item 105 (i): a SettlementForge chain's status and an entrepôt's end; V09's LinkRow.chain cites this type */ };
interface FieldDrivers { value: number; band: string;                        // item 297
  terms: { driver: string /* a driver of §4.5's field, 'daylight' (item 102) and 'water' (item 111 (b)) among them, or 'character', 'brush', 'epoch', 'chance' */; delta: number;
    sources?: { caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] /* daylight: V05 §4.5's per-island attribution */ }[];
  climateSun?: number /* item 111 (c): the climate row's sunlight cell that multiplies w_sun — 1 in temperate and cold rows, 0 or negative in hot arid rows */;
  since?: { driver: string; week: number; delta: number }[] /* V06's district provider: the term's change since that week, from the shade masks' history */ }
// @plat/api/node — the same API over worker_threads, plus by-value helpers for scripts and tests
declare function generateDocument(bp: Blueprint): Document;
declare function exportDocument(doc: Document, fmt: Format, opts?: ExportOpts): Uint8Array;
```

**Knowledge (item 30; J-A30.83, J-A30.85).** `query` answers of every kind — `gazetteer`, `people`, `whereIs`,
`relations`, `hit`, `inView`, `why`, `brief`, `entity`, `sites`, `measure`, `frame`, `rule`, `profile`, `links`, `plan`,
`planReport` and the `history` kinds — and hover content list every entity in scope with its kind, address and geometry, but
withhold the `name` and the purpose of a place (its `use`, or an institution's kind) that §9.2's admission function does
not admit, marking the row `withheld: true`; a person's workplace or
household that is a withheld place is given by its address only, and the person's profession is withheld with it where
that profession is the place's use. A view-bound reader (`hit`, `inView`, hover) admits at its view's band; `plan` and
`planReport` at the building band, through V03 §5.4's merge; every other kind, band-less, as at the city band, whatever
the caller's zoom (a view gives `inView` its box only). A
`gazetteer` row of kind `customChain` lists each ACTIVE `CustomChainRecord` with its label only when the key admits
every joined node (a relation, never a `withheld: true` row); an inactive one is not listed (V08 §5.2; file f item 410).
A `links` answer gives a withheld end by address and kind and leaves a concealed use's links out. A withheld entity
carries no purpose: its `kind` is its §2.8 registry kind, its attributes only the readable paths whose `purpose` flag is
false, a use of it has no `cls`, a row id authored on its class and a hard-fail naming it become `fam/<family>` with the
family's sentence, and a link to it carries no good. An element of a cavern or ruin cluster whose excavation reading is
`unexcavated` is absent — not withheld — for every key below `secret`, from every answer, count and list.
`EntityCard.anchor`, `bounds` and `groundCm` are for the caller's own geometry: a client that forwards answers to a model
strips them, and in host mode the module strips them before an answer leaves the frame (§11.3). An address whose entity
a live `delete` tombstoned answers `why` with its registry kind, a `removed` cause and `removed { seq, week, by }`, and
`entity` from §2.8's `Tombstone.last` — the record's kind, name and shape, and the fields a re-declaration reads (a
way's class, width and `raised`; a wall's kind and `closed`, a retaining wall's `highSide`; a gate's enceinte; a
building's class and its plot; a deck plot's deck host and slot ordinal) with `removed: { seq }` (file f item 467) — to a
key that admitted it before; to any other key it is an unknown address. `entity { at }` answers the top of the hit stack
at the point (`HitAnswer.ids[0]`; a raised part above ground part 0) and, with `below`, the next one down;
`entity { dossierKey }` answers the address of the `DossierBinding.rows` row whose `dossierKey` it is (§7.7 item 12), at
the query's seq, as that address's `EntityCard`, `withheld` as for any address, and `null` when no row holds the key or
the document has no binding (file f item 583). **Lowering (file f item 572).** `admitAs` only lowers: an answer, and a
filtered dry run's fates, renames, actions, bend lines, created addresses and effects, admit exactly what both the
caller's key and `admitAs` admit — a tier given alone is read with the caller key's `places`, a key form `{ tier, places }`
is a key in its own right — so a client never raises what its key admits (J-A30.82). A view's `ViewOpts.viewAs` is the
same lowering for that view's own reads; a client that speaks for a view passes the view's effective key as `admitAs`
(`'secret'` at that tier, else its key form) — the built-in clerk on its band-less reads and its dry runs, an application
on its band-less reads; an application's own dry runs, which its user confirms, stay at the role's key (V09 §2.7).
**`filtered` (file f item 470).** With `filtered`, a dry run's fates, renames, conflict actions, closest options, bend
lines, created addresses and effects are rendered under the caller's key by these rows (a withheld place by address and
kind, a concealed use and an unexcavated element absent, an effect left with no admitted target dropped); its messages
are `MsgRef`s, so a filtered result never carries a withheld name. **The oracle under the key (items 63 (c), 101 (d); J-A101.85).** A `why` answer is filtered by the same function
and never says more than the rows above: (1) a `why` on a place whose name or
purpose the key does not admit gives its address and kind only, marked `withheld: true`, with no rule, input or
alternative; (2) in any other answer, a rule, input or alternative that is such a place — a relation row's target, a
supply edge's end, an alternative site — is given by its address and kind only, marked `withheld: true`; (3) a concealed
use the key does not admit is left out of every answer, as §9.2 leaves it out of the drawing and §11.1 out of every file:
its relation and supply rows, its lineage's draws, its concealed parts and the alternative sites its pair was scored at
name nothing and are not counted, and a `why` on one of its parts answers empty, as for an address the document does not
hold; (4) a front's `why`, for such a key, is the front's own — the oracle's answer for the front's class alone at that
plot: its hard rows, which the site passes, its soft rows scored there and the closest acceptable sites that class alone
would take, evaluated by the oracle from the same tables over the committed model, read-only, as it finds any building's
alternatives — so the answer has the form of every other building's and the front reads as the front (item 63 (c)); a
key that admits the concealed use reads the pair's own derivation whole. **`preview` is an editing role's call**, as
`edit` is (§11.3's roles): a viewer's `preview` is refused (`status: 'refused'`, `reason: 'role'`) with nothing computed,
since an unfiltered preview returns the dry run's fates, renames, counts and shape. `fates` pages and a `confirm` result
go only to an editing role, unfiltered: `confirm` needs the lists back unchanged (*Confirming fates*, below), and an
editing client holds the document it loaded (`open`, above, or §11.3's `doc.load`), for which the key is no secrecy
boundary (§11.1). A content provider (§14) answering through `query` gets the same filtered rows. A host that holds the
dossier knows every place already (§11.4); a viewer learns one only by
the host raising its key (§11.3), never by asking. **Tiers (item 20
(h)).** Every row of every answer marks each fact it gives with its tier by §2.8's `factTier`, and a `why` answer names,
for a derived fact, the derivation table's row that made it (§7.7 item 10); a label's display text is given beside the name (§9.1).

**Variations (file f item 461).** With `variations: 3` a derived fill's dry run returns §7.3 item 10's three overlays in
the `ok` branch as `previewId` and `variations`, `page` advancing past the rerolls used (§5.1 (6), within
`reroll.maxAdvance`) and `focus` choosing the overlay drawn as `live.ghost`; the overlays are held in the generation
worker until the draft commits or cancels, and `thumbnail` rasters one. A clerk's alternatives are separate `preview`
calls, one per variation. The committed form of each source is §7.3 item 10's.

**Confirming fates.** An action whose dry run (§7.1) must be confirmed under §7.3 item 4 — protected entities in
its effective scope (Re-derive from Sk, Adjust of an early parameter, a regeneration over locked, pinned, edited or
assigned entities, "discard edits in scope"), or case-(4) renames (§6.3), including an `unlock`, `unassign`, `undo`,
`redo` or `revert` that frees a name — returns `confirm` with the fate of every protected entity, every listed rename
and a **token** = H128(the document's `logHead` ‖ the canonical bytes of the event without its fates and renames).
Nothing is committed. `confirm(h, token, fates, renames)` commits the event with those fates and renames when the token
is still current (the `logHead` has not moved) and the fates and the renames equal the dry run's lists; if the state
moved it re-runs the dry run and returns a fresh `confirm`, and a changed list is never committed silently. Resubmitting
the event through `edit` with its `fates` and `renames` filled is the same operation — the engine commits when a fresh dry
run computes the same fates and renames and otherwise returns `confirm` — which is how a host bridge carries a confirmed
action (§11.3). "Discard edits in scope" is a new request (`regenerate` with `discardEdits: true`) with its own
confirmation. `cancel` drops the token (J-R33).

**The clerk's tool API (item 101 (b), (d); R10, R19; J-A101.83, J-V10.39).** The tool API a clerk — SettlementForge's
assistant driving it (V10 Q2: J121, J122) or the built-in clerk (M3c) — drives is this API and the reader kinds, scratch
documents and dry-run options added for any client (the `why` extension and the seven reader kinds, `scratch`,
`filtered` and `variations`; file f item 471): the declarations
are §7.1's events and sugar events through `edit`; the reader is `query`; the **oracle** is `query({ kind: 'why' })`,
answered from provenance and §2.8's derivation records — the rule, its inputs and the alternatives it weighed (the
closest acceptable sites of §4.7 S10b, the rows a derivation fell back through, §7.7 item 10); and a proposal is a
`preview` — the dry run's fates, renames, counts and derived shape, drawn as a ghost in the viewer's view (§8.2's
`live.ghost`), nothing committed — which the user accepts as an `edit` carrying `proposedBy: 'clerk'` or drops (J-A101.74,
§7.1); a bridged host's clerk asks for it by §11.3's `preview` message (J-A101.86). A clerk is a client like any other: it holds a role and a knowledge key given by its host (§11.3), so it never
bypasses the dry run or the undo, never writes a dossier fact (a `dossier-owned` refusal stands, §5.2) and reads and says
only what its viewer's key admits — its `why` answers and its `preview`s by *Knowledge* above (§9.2). Its transcript of `edit` calls is a skeleton (§11.1).

| call | crosses | copy or transfer | bound |
|---|---|---|---|
| `generate` | in: the blueprint; out: the handle, progress events | copy | < 64 KB; < 1 KB per event |
| `open` | in: the document bytes; out: the handle, progress events | transfer; events copied | the document's size; < 1 KB per event |
| `edit`, `regenerate`, `adjust`, `confirm`, `undo`, `redo` | in: events or a token with fates and renames; out: `ApplyResult` — `ok` (the new `logHead`, count of changed addresses), `conflict` (the outcome and its actions) or `confirm` (token, the first 1 000 fates, the renames, counts per fate, the resolved scope); `regenerate` and `adjust` progress events | copy | < 64 KB per batch; longer fate lists by `query({ kind: 'fates' })` pages; < 1 KB per event |
| `preview` | in: events; out: `PreviewResult` (the ghost reaches the view as a `live.ghost` delivery, §8.9) | copy | < 64 KB; the preview's time §12.6's |
| `thumbnail` | in: a preview id, a variation, a box, a size; out: an `ImageBitmap` | transfer | ≤ 160 × 120 CSS px at the view's DPR; an export-class job (§8.9) |
| `scratch`, `forkAt`, `rerunFrom` | out: a new handle | copy | < 1 KB; the document stays in the generation worker |
| `advance` | in: an `AdvanceRequest`; out: `ApplyResult`, progress per epoch (`Progress` `epoch`) | copy | < 64 KB; V06 §6's time |
| `setViewOpts` | in: a `ViewOpts` patch | copy | < 1 KB |
| `registerProvider` | in: the provider's id, version and module URL; out: `ok` or `refused` with its reason | copy | < 1 KB; the module loaded once per worker, the check's two runs §6.5 (8)'s |
| `query` | out: one result page | copy | ≤ 64 KB |
| `view` | out: composed tile bitmaps and hit-test slices (§8.9) | transfer | ≤ 1 MB + 64 KB per tile |
| `export` | out: the file bytes, progress per band (`Progress` `export`) | transfer; events copied | the format's size; < 1 KB per event |
| `subscribe` | out: `ApiEvent`s (`doc.changed`, `view.changed`, `report.changed` — the `changes` entries of §5.4's `GenerationReport` appended since the last delivery, a dossier event's entries naming its `changeId` and reason (§5.4; item 75); items 17–22) | copy | < 64 KB |

The headless path runs the same worker code, and its model hash equals the browser's (text is not in the model, §9.1);
ids cross this boundary as `<docId>/<id>` (§6.3). The derivation pool uses transferred copies, never `SharedArrayBuffer`
(§3.3), so no embedding host needs cross-origin isolation for generation; the tile worker's optional shared columns
(§8.9) remain the only use of shared memory. **Engine (§3.7, SCL-22):** the product bundle has no WebAssembly dependency;
if M0 triggers the kernel's pre-decided fallback (Clipper2-WASM as the single engine), WebAssembly becomes an embed
requirement and a host without it receives the API error `E_ENGINE_UNAVAILABLE` from `generate` and `open` (not a kernel
result, §3.1).
=== END ===

=== REPLACE ### 11.3 The host bridge — the host is the store (FTG-12) ===
### 11.3 The host bridge — the host is the store (FTG-12)

* **Transport.** `interface BridgeTransport { send(msg: BridgeMessage): void; onMessage(h: (msg: BridgeMessage) => void): void }`.
  Shipped: `WindowPostMessageTransport` (iframe hosts; a fixed target origin; incoming origins checked against the
  embed's allowlist, and — item 85 (d) — the message's source window checked to be the embedding window it was bound to,
  so a second frame of the same origin cannot speak for the host) and `MessagePortTransport` (any relay — a
  browser-extension content script, a SharedWorker, a chat-bus relay; COV-FTG-N06). Envelope:
  `{ plat: 1, type, session, seq, re?, logHead?, body }` — `re` on every reply (`query.result`, `preview.result`, `export.ready` /
  `export.refused`, `doc.applied` / `doc.rejected`) is the `seq` of the request it answers, so a host with several
  requests in flight matches each answer to its question (item 85 (d)); host messages that arrive before the module has
  sent `ready` are queued and delivered in order after it, never dropped. **SettlementForge's configuration** is the module
  in an iframe on its own origin — which origin follows SettlementForge's own hosting decision, read as an input (J121;
  V08 Q1) — speaking through `WindowPostMessageTransport` (item 85 (e)); a worker or a service
  remains the configuration for other hosts (J-A85.82). The bridge is the module's
  boundary with a host program, SettlementForge in its owner-staged phase included: its messages carry data only — a
  dossier's events in, the map document and its report out — and never code, so no message registers a content provider
  (§11.4's door (4); J-A85.83), and the module stays a separate program in its own bundle,
  loaded in a worker, an iframe or a service (item 21 (d): a design choice that keeps the seams clean and every later
  licensing choice open, §17.3; J-A21.81).
* **Vocabulary (our own terms, FTG-22).** Host → PLAT: `doc.load { bytes | ref, role, session }`,
  `doc.apply { baseLogHead, events }`, `view.set { patch }`, `export.request { fmt, opts }`, `query { q }`,
  `preview { events, view?: boolean }` (item 101 (b): a clerk's proposal; J-A101.86) — `true` draws the ghost as
  `live.ghost` in this client's own view (§8.2), which stands for §11.2's `ViewHandle` since a bridged host holds none,
  and `false` or absent computes the dry run alone. PLAT → host:
  `ready { outputVersions, schemaVersion }`, `doc.changed { baseLogHead, events }` (a local user's proposed events),
  `doc.applied { logHead }`, `doc.rejected { reason: 'stale'|'invalid'|'role'|'version', currentLogHead, conflicts? }`
  (`conflicts` as §11.2's conflict member: `{ outcome: MsgRef; actions: ConflictAction[] }`),
  `view.changed { patch }`, `entity.selected { id, kind }`, `export.ready { bytes }` or `export.refused { error, message }`
  (an API error of `export`, §11.1's `E_KNOWLEDGE_TIER` among them), `query.result`, `preview.result { result }` (§11.2's
  `PreviewResult`: the dry run of the events for an editing role, nothing committed, the ghost drawn as `live.ghost` in the
  requesting client's view when `view` is `true`; a viewer's answered `refused`),
  `report.changed { entries }` (§11.2's report event; a dossier event's entries name the `changeId` and the reason of the
  change that caused them, so the host sees why — never a request back; item 75). **The port's vocabulary (SettlementForge
  stage; file f item 472; the types are V08 §2.2's).** Host → PLAT gains `dossier.offer { dossier, dossierHash, host?,
  create? }` and `doc.snapshot {}` (owner or editor only; a viewer's either answered `doc.rejected { reason: 'role' }`),
  `host.state { party?, backups?, partyPicturesAt?, playersView? }` (owner or editor sessions only; kept in the
  session's memory — never in the document, its view state or a save; `playersView` sets the frame's `ViewOpts.viewAs` to
  the party key, never the view's knowledge key) and `party.render { party, since? }` (owner or editor only, a viewer's
  answered `doc.rejected { reason: 'role' }`; not an export: the module resolves `party` to a key form, draws the party
  picture set under it as `knowledge` and lists its
  gazetteer under it as `admitAs`, V08 §3.14); `doc.load` becomes `doc.load { bytes | ref, role, session, audience? }` —
  the module derives role and key from the audience word by §14's table and takes the LOWER of that and `role`;
  `export.request` becomes `export.request { fmt, opts, displayNames?, knowledge?: Admission, bundle?: true }` (§11.1's
  *Knowledge*: `knowledge` lowers the requester's key for that export only; `displayNames` as §11.1's *Display names*);
  in host mode the module answers an `export.request` for any format other than `png`, `svg` and `print` with
  `export.refused { error: 'E_HOST_FORMAT' }` (V08 §5.4), save a `bundle: true` request for `dd2vtt` or `foundry` (the
  export bundle from M-SF, §11.4; V08 §5.4 (2)), rendered under the calling key's §11.1 rules and answered
  `export.ready { bytes }`; `bundle` with any other format, or those formats without it, is refused; neither rule applies
  to `doc.snapshot`. PLAT → host gains `dossier.result { status,
  dossierHash, baseLogHead?, events?, encoded?, seqAfter?, logHeadAfter?, created?, factHash?, week?, report, held? }` (a
  reply carrying `re`; `held` is `{ code, message, reason }`, a `host.held.*` row of V08 §3.9), `doc.snapshot.ready {
  bytes, logHead, lastSeq, outputVersion, schemaVersion, documentDigest }` (a reply), `module.status { phase, detail?,
  progress?, outputVersion? }` (a push; `detail` a `host.*` catalogue key), `host.action { action: 'refresh' | 'restore'
  | 'newMap' | 'reveal' | 'hide' | 'partyTier' | 'assistantSettings', args?: { places?, undo?, tier? } }` (a push from an
  owner's or editor's frame only, which the host runs as V08 §4.2's row says) and `party.rendered { status: 'rendered',
  set } | { status: 'unchanged' }` (a reply; the set V08 §2.1's `PartyPictureSet`, stored as handed); `ready` becomes
  `ready { outputVersions, schemaVersion, protocol, adapters: { line, version }[] }` and `doc.changed` becomes
  `doc.changed { baseLogHead, events, encoded, seqAfter, logHeadAfter }` — each event's canonical CBOR in order, the last
  seq and the head after them — so the host stores what it is handed and computes nothing. **The clerk's configuration
  (M3c; file f item 473).** Host → PLAT gains `clerk.config { mode: 'off'|'builtin'|'host'; transport?: { baseURL: string;
  token: string; expiresAt: number; fallbacks?: 'server'|'client'|'none' /* absent: server */ }; capUsd?: number }` (V10
  §3.17: `off` — the default until one arrives — hides the built-in clerk, `builtin` shows it on the user's key or,
  with a transport, through the host's proxy, `host` hides it because the host's own clerk drives the map; the
  transport's address must be `https`, on the embed's origin allowlist and in the page's `connect-src`, else
  `clerk.config.refused { reason: 'origin' }`; the token is held in memory only), and `preview` gains `proposal?: { id:
  string; reason: string; variations?: { label: string; events: EditEvent[] }[] }` — shown as a proposal card in the
  frame, one waiting proposal per session, a viewer's `preview` still refused; PLAT → host gains `clerk.needsToken {}`
  (sent before the token expires or when it is refused; the host answers with a new `clerk.config`) and `clerk.proposal
  { id, status: 'accepted'|'dropped'|'stale'|'failed', seqs? }`. In host mode the module applies the **host projection**
  to every `query.result` and `preview.result` before it leaves the frame — V08 §5.4 (3)'s rows for the base's kinds and
  the preview reply, V10 §3.17's rows for `brief`, `entity`, `sites`, `why`, `frame` (without `near` and `radiusM`),
  `rule` and `profile`; `measure`, `hit` and `inView` are answered `query.result { error: 'E_HOST_KIND' }` (correlated
  by `re`) — so no length, bearing, extent or coordinate reaches a host (door 1, J86). The AI key or relay, the assistant
  and its model tier follow SettlementForge's own decisions, read as inputs (J121; V10 Q1–Q3). **One way (items 20, 22; J-A20.81).** No PLAT → host message writes,
  patches or proposes a change to the host's dossier: `doc.changed` carries map-document events only, `report.changed` the
  map's report, and the vocabulary has no message that addresses the dossier; a dossier change reaches the map as
  `doc.apply` events with `author: 'host'` and `EditBase.dossier` set (§7.1, §7.7, §11.4), in the host's order — the ordered
  dossier history of item 22 (c) — and the host stores the returned document as an opaque artifact of the map (item 20 (d)).
* **logHead** = a 128-bit hash of (document id, edit-log length, hash of the last event), in hex (our own term, FTG-22).
* **Convergence.** The host holds the canonical document and log. A client sends its user's edit as `doc.changed` against
  its `baseLogHead`; the host accepts only when that base is the current `logHead` — it appends the events, advances the
  `logHead` and fans `doc.apply` out to every client, the sender included — and otherwise answers
  `doc.rejected { stale }`; the client then applies the host's pending `doc.apply` messages, re-runs its own events
  through the dry run (§7.1) on the new state and sends them again, or shows its user the conflicts. An action that needs
  its fates confirmed (§7.3 item 4, §11.2) is sent only after the local user confirmed them, as an event carrying its
  `fates` and `renames`; if the state moved underneath it, the client's re-run returns a fresh confirmation for its user
  instead of resending, and every other client replays the event with those fates, reporting a mismatch if it computes
  different ones. A dossier offer's commit follows the same rule: the host appends a `dossier.result`'s encoded events
  only when its `baseLogHead` is the current head (V08 §3.3); the host verifies that one equality and stores the rest as
  handed. Every client applies the same events in the host's order on the same output version, so every client's
  model hash is the same (§6.2) — after a load mismatch, once the owner has chosen (§2.9 step 4). **Test (M3a):** a host
  and three headless clients applying 1 000 interleaved random events — undo and redo from every client and one owner
  undo through a chain among them — converge to one model hash with 0 lost accepted events; and one forced load mismatch
  settled by an owner's keep while two editors edit on the replayed town: all four converge to one model hash, the
  editors' events re-applied on the saved town.
* **Version handshake.** On `doc.load` the client compares the document's **`outputVersion`** (§6.4) — not the generator
  version — with the output versions it can replay (announced in `ready`); when it cannot, it opens the snapshot
  read-only (its role drops to viewer, and it says so) as §2.9 step 2's frozen view does — checked by its chunks' content
  hashes only and labelled "made with o<k>; not verified by this version", never reported as a mismatch — and it never
  replays under another version silently.
* **View state.** Every view key of §2.9 (its view section, outside the model hash; each last-writer-wins by (Lamport
  counter, session id)), the per-viewer keys among them, travels as `view.set` / `view.changed`, except the pointer that
  moves the cursor sun and the `underlay` image (§9.5), which never cross the bridge. The key `time` is set by
  `view.set { time }` and advanced by the module-tier message `sim.advance { hours }` (§10.3). **The host's clock (item 67; J-A67.82).** The clock the design calls
  "the simulator's" — the one whose weeks move the map's history — is the host's: its advance reaches the map only as
  dossier events and epochs, which the port dates and groups by §4.11's week and cadence (§7.7 items 1 and 6; §11.4),
  and a host shows its campaign's current week by `view.set { week }`; the module's `time` key counts hours and never
  moves the map (§10.3). A viewer's `knowledge` defaults from its role — `owner` and `editor`
  `secret`, `viewer` `public` — the host may set any viewer's key by `view.set`, and a client never raises its own tier
  above the one its role or the host gave it, so a player learns a secret place when the game master says so (J-A30.82).
* **Style is canonical; the preset a viewer looks through is not (N-15).** The document's style (§2.9 `style`: the sheet
  and version, its row operations, the ground-cover regions) changes only through logged `setStyle` events, which the
  bridge carries in `doc.changed` / `doc.apply` like any edit and which only the `owner` and `editor` roles may send. The
  view key `stylePreset` is a per-viewer choice of preset (for example a player looking at the `lit` family while the
  document is drawn in `ink`): it never writes `setStyle`; the chosen preset replaces the document's sheet for that viewer
  only, and the document's own rows (thematic overrides, ground-cover regions) apply on top where the preset has the roles
  they name, the rest listed in that viewer's style dialog (J-R34).
* **Roles.** `owner` | `editor` | `viewer`, given by `doc.load` — for SettlementForge by the audience table of the port's
  host glue (DM, co-DM, player, anonymous; §14, item 85 (f)), SettlementForge's accounts and audiences read as inputs
  (J121), never a rule of the model. A viewer's client never emits `doc.changed` (model edits
  are disabled in the UI and dropped by the bridge) and emits only the view changes the host allows; the host enforces
  the roles as well. The host assigns one session per user and document and passes it on every load; a bridged client
  never mints a session or writes the `session` view key (§7.4). **Bridged load verification.** Load verification
  (§2.9 step 3) runs while the client's user edits; on a mismatch only an `owner` client may keep the saved town (a
  `rebase` sent like any event; J-DET-42); every other client takes the replayed town for its own working state,
  reports the mismatch, records its root at `h₀` and keeps the `doc.load` bytes (≤ 3 MB at CITY, §2.9's size budget;
  counted in §12.8) until the mismatch is settled or its session ends; when the owner's `keptSnapshot` rebase arrives it
  installs the saved town from them and re-applies the events after `h₀` (the install mechanics: §2.9 step 4); under
  §6.2 (iii) its comparison of its own root with the owner's `stateDigest` waits for its load's recomputation, a client
  still verifying stops, and a client that loads after the owner's choice takes the saved town as its base without
  asking — so every client converges on the owner's choice.
* **Logging (LC-31).** Every model change over the bridge is a `doc.apply` of `EditEvent`s, logged one to one — a host's
  own commands with `author: 'host'` (§7.1's `EditBase`); no bridge command changes the model any other way. Undo and
  redo are `EditEvent`s (§7.4): they travel as `doc.changed` and `doc.apply` like any other event, the envelope's
  `session` is their `EditBase.session`, and a client never truncates a bridged log. A provider output refused at §2.9's
  cap returns the requesting edit as `doc.rejected { reason: 'invalid', conflicts }`.
=== END ===

=== REPLACE ### 11.4 Host inputs (DEF-11) ===
### 11.4 Host inputs (DEF-11)

A host may supply input only through these doors: (1) blueprint fields — seed, rung, population, intent, the district intents (`districtIntent`, §7.7 layer 2),
circumstances, assignments — to `generate`; (2) edit events through the API or `doc.apply`, which are logged — a dossier change arrives as such events with
`author: 'host'` and `EditBase.dossier` set (§7.1), in the host's order, and mutates the current map under §7.7's dossier
contract (items 20, 22); a dossier's designation of a place as `local` or `secret` is one such input
(`Assignment.knownTo`, §7.7, which §9.2's label policy reads), and the module never writes to the dossier (§11.3's
*One way*); (3) tables,
presets and styles as `editTable`, `editPreset` or `setStyle` events, whose content is copied into the document with
provenance `host` (source, date, version), so the document replays without the host; (4) a `ContentProvider` (§14)
registered by `registerProvider` (§11.2) — the embedding page's own call or a script's, the bridge carrying data and never
code (§11.3; item 21 (d); J-A85.83) — accepted only after a **double-run check** (at registration it runs twice on the same input and stream; the two
outputs must be byte-identical, else it is refused), with every output it produces for a document recorded in the
document's `hostContent` block, keyed by (provider id, version, input hash), and read from there on replay; an output
that would pass §2.9's cap on pack data and host content is refused at the call as §2.9 states. So a document never needs
its host to replay, and host code — which the model packages' lint (§6.5) cannot reach — is made deterministic by the
check and the record.

**A dossier comes through the port (items 73–87; §14).** For a dossier, door (1)'s blueprint and the log's creation
prefix, and door (2)'s events and epochs, are produced by `@plat/port` (§14, item 73): the host passes the whole dossier
and, when it has them, the optional fields of `HostContext` — the week, the realm block, the audience, display names, the
product line — and nothing else; SettlementForge's map comes through doors (1) and (2), which the port produces;
door (3) stays open to it as to any host — logged table, preset and style events over the bridge — and door (4) is the
in-page embedders' and scripts': `registerProvider` loads a provider's code into the module's workers, while the bridge
through which SettlementForge's configuration speaks — the module in an iframe on its own origin (§11.3) — carries data
and never code (J-A85.83). The port's refusals by population and its routing to a registered village product are §7.7
item 15's and §1.1's (item 81; file f item 202); §1.1's clamp serves only a request that carries no dossier. Door (2)'s
events carry §7.7 items 12–13's binding key and change envelope (items 74, 75), dated and grouped into epochs by §4.11's
week and cadence.
**Optional only (item 20 (h) (iv); J-A20.79):** every field these doors accept beyond what the dossier holds today is
optional — a stable id, a location hint, a class; whatever the dossier does not give, the map derives by §7.7's
derivation table; no door, message or report asks the host for a fact. What a host's data the module never reads is
§7.7 item 1's list (item 86), and the port's adapter reports every key it dropped. A host's own undo arrives as a
dossier change like any other and converges by the solver's order; the port's report names the earlier absorbed state
the dossier now equals, `state_matches_absorbed` (§7.7 item 5; item 87). **No door opens the other way (owner, J86 Q2;
J-A73.81):** the host's simulator never reads the map's geometry — the module writes no geometry, layout or district
read for the host (door 1 stays closed); because the map follows purely from its seed and the ordered dossier history
(§7.7 item 6), opening it would need no redesign, and it opens only on the owner's explicit word. **The export bundle
(V08 Q3: J122).** From M-SF the host client gains one call returning the user's chosen scene exports
(§11.1's `.dd2vtt` and Foundry scenes, rendered at the export's knowledge tier and admitted by the calling key) as
opaque byte blobs for SettlementForge's export bundle, which SettlementForge packages unread; before M-SF maps export on
their own. No call returns a structured format — the bundle call returns opaque blobs only — so door 1 stays closed
(J86); V08 §5.4 states the call and V08 §7 its test. The port's wiring to a live host bridge is built with the
SettlementForge stage (SF0–SF7, V08 §8); the port itself is §14's, its creation half built at M1 and its absorb half at M3a (§16).
=== END ===

=== REPLACE ### 11.6 Edges (principle (11)) ===
### 11.6 Edges (principle (11))

| id | mechanism at its limit | defined outcome and rung | test |
|---|---|---|---|
| T-ER-19 | every format (§11.1) at every rung, THORP to the cap, a fixture holding a wall run in each condition (g item 114) among them; degenerate geometry (none in the model, §3.1; faces written without antennae, §11.1; an antenna: §3.6 rule 3); the `.dd2vtt` scope over 8 192 px | each row's mapping — a wall run's `condition` and `material` in GeoJSON, glTF and CityJSON, a `patched` run a wall and a `breached` or `dismantled` run an opening in the VTT scenes; a larger VTT scope split into a grid of scenes or the pixels per square lowered (≥ 50), the dialog showing the choice | each format at THORP, TOWN, CITY, the METROPOLIS target and the cap: validators pass, sizes within §12.7 and §12.8; the wall fixture's runs as stated in every format |
| T-ER-20 | the API's caps (§11.2): a page over 64 KB, more than 1 000 fates, 256 created addresses, 50 effects, three alternatives, three variations; every rung | paginated (`query` pages, `fates` pages); the counts beyond the first given (`effectsMore`); the API identical at every rung | a scripted client at each rung: every list complete across its pages, the counts correct |
| T-ER-21 | host inputs (§11.4): a host passing nothing beyond the dossier; one event; a provider output over §2.9's cap; contradictory dossier data; every rung; save and replay | derived by §7.7's table; applied as any event; refused as `doc.rejected { reason: 'invalid' }`; §7.7's contract; the port's refusals and routing (§7.7 item 15); door (3)'s events replay without the host | a host fixture of each: the document replays byte-identically without the host; the refusals as stated; a provider failing the double run refused `nondeterministic` |
=== END ===

=== REPLACE ## §12 Performance budgets ===
## §12 Performance budgets

*In plain words.* Each size of town gets a rule rather than one number — a fixed part plus a cost per building — because
a bigger town has more buildings. By those rules the first map appears in under a quarter of a second for any town,
under 0.6 s for any city and within about a second for a metropolis of up to about 48 000 people; the largest
metropolises, up to 120 000 people, take up to about 2.3 s (§12.5). Building the model alone meets the improvement plan's
targets — a tenth of a second for a town, three tenths for a city, one second for a metropolis — for 19 runs in 20 up to
about 4 500, 17 700 and 58 800 people, and is slower above them (§12.3). These rules are **targets**: the map is made as
fast as it can be, and the build keeps pressing every step toward them. What a user sits through once — generating,
regenerating, opening a map from SettlementForge, a dossier change, advancing time, an export, a migration — has a
**comfort level** of ten seconds in all, from the click to the finished result; past it a wait fails. Both misses are
therefore stated as target misses inside the comfort level rather than hidden behind a half-finished picture or a
thinner town; a step is slower than its target only where it buys a measured gain, which is recorded; a wait longer than
about a second names the stage it is in, and the screen is never empty; and moment-to-moment work — pan, zoom, drag,
preview, hover, undo, the season and festival switches — keeps its own budgets (§12.1). Every step has its own budget,
measured on one named machine. Against MFCG drawing the same number of buildings, PLAT takes about twice as long for towns and cities and five
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
* **Targets and the comfort level (g item 119; J130; owner: "as fast as possible" — "note where our comfort levels
  really are").** §12.3's and §12.5's laws and every budget of this section and of every volume are the **targets**: the
  build works to meet and beat them. The **comfort level** is ten seconds of total time — from the click to the complete
  result, the map's final complete frame or the file written, on the reference machine — for every wait a user sits
  through once: a generate; a regenerate or Re-derive; an open from SettlementForge (with its load verification and any
  migration, §2.9, §11.3); a dossier change applied; an advance of time and item 113's history replay, read as V06 §6
  states them; an export, in every format the export dialog offers at its sizes up to A2 at 300 dpi, lit included; and a
  migration — at every size up to the population cap. Past it the wait fails its bar (R12-31) and the owning path takes
  its pre-decided change; at run time the wait completes and is reported (F-BUDGET-TIME), never answered by a coarser
  result. A step runs slower than its target only for a **recorded measured gain** inside the comfort level — a row of
  V11's `perf.qualitySpend` (V11 §3.25.8: the stage, the use, the target, the measured extra cost, the bar the gain is
  measured by, the gain and the run that measured it), read by §4.1's quality budget and checked by R12-33 — and nothing
  is made slower otherwise. **Progress:** a wait past about one second (V09's `progress.showAfterMs`, 1 000 ms) names
  its running stage and never leaves an empty screen: the generation worker posts §11.2's `Progress` as each `StageDecl`
  starts and, for a wait that is not a stage run, as each of its own steps completes (epochs, replayed epochs, the port's
  steps, export bands, replayed events), never polled, and V09 §4.21.9 shows it — the current map drawn under the
  progress strip until the complete result replaces it, a first map's stages filling in, in the ghost style and never
  presented as the map (§8.5) — so the first picture is still complete (R12-32). **Interaction stays fast:**
  moment-to-moment budgets are not total time and keep their values — pan and zoom at frame rate, dragging a handle and
  a tool's live preview, hover and click-to-inspect, undo and redo, the season and festival switches (§12.5, §12.6;
  R12-34). **Low-end devices:** the low tier aims at the same ten seconds; a size it cannot reach within them is
  declared per device, the tier and the size recorded beside the measurement (V12 §3.15.9). D-18's two misses (§12.3,
  §12.5) are target misses inside the comfort level: reported, and no veto question.
* **Confirming milestones.** Each budget of §12.3–§12.8 is confirmed by one row of §12.10's register — its measuring
  milestone and suite, its pass bar, its pre-decided change if it misses and whether a miss is declared in D-18 as a
  target miss — and cites that row.
* **Budgets never change output.** A missed budget is reported, never answered at run time by computing something
  coarser (F-BUDGET-TIME is reporting-only, GEO-2); the pre-decided changes are configuration decisions taken once at a
  milestone and reported, and none of them changes the model.

### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2)

The rungs' population bands and targets, buildings at the target and frame areas are §1.1's rung table (frames: §3.2
(9)); this table adds the matched MFCG reference at each rung and the cap above METROPOLIS's target. The laws of this
section are the base rungs' (TOWN, CITY, METROPOLIS); the village rungs' budgets (THORP, HAMLET, VILLAGE) are V07 §6's
(file f item 495).

| rung (§1.1) | matched MFCG size (plain options, seed 555001) | MFCG buildings / walled ha | MFCG generation (the app's own stage timings) |
|---|---|---|---|
| TOWN | 40 | 1 475 / 58 | 57 ms |
| CITY | 80 | 5 242 / 220 | 131 ms |
| METROPOLIS | 130 | 13 091 / 548 | 156 ms |
| METROPOLIS above its target — up to the population cap of 120 000: ≤ 35 000 buildings, a frame ≤ 153.6 km² (≤ 12.4 × 12.4 km) | 200 (a stress comparison) | 31 951 / 1 274 | 236 ms |

* Buildings at the target are derived at ≈ 3.4 persons per building for the core plus the hinterland (PLAUSIBLE). **The
  default request** of a rung is its target population, whose building count §1.1's rung table gives as a range; a band's
  bottom and top are its population ends at 3.4 persons per building (in buildings: §12.5's table).
* Within a rung the frame scales with the requested population; the cap's frame is the table's last row — 12.4 km
  square (19.8 km with the margins) — and the arena's coordinate range and its headroom at it are §3.2 (1)'s.
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

**The declared target miss (D-18; inside the comfort level, §12.1):** every plot, site plan and building stays on the one-click model path at every size
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
| S10 + S10b + S11 + per-district greenery (pooled) | §4.7, §4.9 | S10 ≈ 10 µs per plot of geometry plus ≈ 2 µs for the context vector (distance rasters at 16 m: ≈ 7 ms once; the siting feature rasters of V11 §3.3.3 — at the fields' 32 m cell where every reading row's radius is ≥ 60 m, else 16 m, at most 32 — ≤ 10 ms at CITY, ≤ 26 ms at METROPOLIS, ≤ 4 ms at TOWN, the row's p50 re-declared at M2b by *Re-declared rows*, below; file f item 477); S11 ≤ 5 µs median per plot — its geometry share ≤ 3 µs per plot median (the kernel's M0 bar, §3.7) plus rule evaluation ≤ 2 µs; compound ≤ 40 µs (25 + 15); mean ≤ 6 µs; yard planting and parks ≈ 1 µs per plot; S10b's relation and supply scoring (§4.7; item 16): one more distance transform per producing class present (≈ 10–30 classes at CITY, ≈ 4–10 ms once, PLAUSIBLE) and ≤ r relation rows per candidate at O(1) raster reads each, absorbed in this row's p50 within its imbalance margin until M2b measures it (below); S11's light placement (§4.7 *Light sources*; item 68): ≈ 8 000 lights at CITY (§8.1 item 6's sizing) at ≈ 1 µs each — its rule row, its site test on the index, its address — plus one spacing bisection through `dmath` per lit way, ≈ 10 ms of work (PLAUSIBLE); the cluster packing (§4.7, item 70) only on a shanty district's cluster plots — none on the default request — each structure a building (§2.6) at S11's per-plot rate, so §12.3's per-building laws carry it; ≈ 126 ms of work on ≈ 5 500 plots, on 3 workers with 25 % imbalance | 53 ms |
| the hinterland unit's S10–S12b (generation worker, concurrent with the pool) | §4.1, §4.9 | ≈ 1 600 FTG-sized furlongs (≈ 2.5 ha) in the 39 km² margin at ≈ 8 µs per insertion (≈ 12 ms); outside plots and driveways ≈ 3 ms | (≈ 15 ms, hidden by the pool) |
| merge | §4.1, §3.3 (the frozen arena copied once to each pool worker; the overlays and the hinterland unit merged in lineage order) | the ≈ 200 000 records S10–S12b create at CITY, merged in O(overlay size) (§3.3 pool step 4) within the 8 ms; the **frozen arena copies**, each with the static index partitions: ≤ ≈ 15 MB each at the one-click freeze (≈ 20 MB at a freeze after edits; ≈ 37 MB at METROPOLIS), ≈ 1.5 ms each at CITY (measured, `fixall_kernel_r4_bench.out` A) | 13 ms (8 merge + 5 copies) |
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
first map grows by 62 µs per building, to ≈ 2.3 s at the 35 000-building cap (120 000 people). **The declared target
miss (D-18; inside the comfort level, §12.1):** the one-click path stays complete at every size — every plot, site plan and building at city-band detail,
no preview (J-R7, J-I2, J-R35) — rather than one second being held above the knee: the model's cost is linear in
buildings (§12.3), and the only ways under the bar there are a partial picture, whose figure-ground differs from the
finished map (MFP-1), or dropping plot and site-plan detail from the one-click path, which the owner's plot-model ruling
forbids. Reversing costs ≈ 1 person-week: above the knee, the city band would appear district by district as the pool
finishes them, with the labels last. With the single-worker fallback the knee is ≈ 11 400 buildings (≈ 39 000 people).

**Measurement and fallback (N-2, N-27 c):** R12-6; the table is re-derived from the measured laws and the knee re-stated
in D-18.

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
ladder's rungs 1–2 need a GPU context and rung 3 does not (§8.4 (g)).

**The zoom-out limit (g item 116).** The limit (§8.8) removes stops and never adds one: no budget above grows, a map
whose limit lies finer than stop 0 caches fewer stops, and a gesture at the limit shows that stop's own tiles.

**Seasons and festivals (g items 117 (i), 118; item 119 (d)).** A change of the year position, the weather or the
festival display re-skins the visible tiles — re-rastered centre-out, each composed tile swapped in as it lands — within
the settle bound above (≤ 150 ms for a CITY view, ≤ 250 ms for a METROPOLIS view), cached tiles of other weeks kept
until evicted; the leaf cover, the ice and the decorations add ≤ 20 % to a tile's raster time (PLAUSIBLE until R12-30
measures them). Decorations are drawn lazily, only for the visible tiles and their first ring (`live.festival`'s region,
§8.2). These are interaction budgets: item 119's comfort level leaves them as they are.

**Lighting (item 68; §8.4).** The first map above is composed unlit and its time never includes the light (§8.5; the
laws stand); the surface layers with their pyramids and the light maps of the visible tiles follow centre-out, then the
first ring's heights and the ring blocks (§8.8), lighting the view within the settle bound above (≤ 150 ms for a CITY
view, ≤ 250 ms for a METROPOLIS view, §12.7's bake, first ring and blocks inside it — the blocks' costs and their
caching per stop being §12.7's, PLAUSIBLE until R12-8 measures them). While the pointer moves the cursor sun or the hand lantern, the
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
  CITY lit takes ≤ 10 s with the view idle, the comfort level (§12.1) — at ≤ 60 ms per tile its ≈ 133 tiles' light alone
  approach 8 s, so R12-18's half-resolution pass (≈ 2 s) is the expected outcome of the measurement (R12-18).
* **SVG** at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for
  837–1 512 buildings, 6.3 MB for 15 392) plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB per distinct
  glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face, checked against the bundled files) (N-13) — and
  ≤ 60 000 elements, written in ≤ 2 s in the generation worker: the transient list's build (≈ 4 µs per building,
  ≈ 54 ms at the METROPOLIS target), S13b at the export stop (≤ 2 ms per 2 000 candidates) and the writing (§11.1).
  Inkscape opens it within §11.1's CI bound.
* **PNG:** A2 at 300 dpi of a CITY in ≤ 10 s on the reference machine **with the view idle** — the comfort level
  (§12.1), as every offered export size at every rung is — the peak canvas one tile
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
  is ignored, 5.3 MiB with none, level 1 and level 9 alike — a miss that remains after the filter change caps the export
  dialog's print sizes at that rung to the largest the measurement holds within ten seconds, the dialog naming it (R12-31;
  a wait past the comfort level is never offered). The per-row rule's encoding alone takes 10.5 s on the synthetic
  textured look, so the textured `lit` family is expected to take the first change. On the synthetic looks None is faster than the
  fixed Sub filter and no larger (Sub spends ≈ 0.2 s filtering, deflates as slowly as the default, and its files are
  7–30 % larger than the default's), and the per-row rule gives the smallest file wherever rows carry gradients or
  texture — 6–9 % smaller than None's on the relief and textured looks (J-R53).
* **Export beside the view:** R12-20. **The stamp-tile load:** R12-21.
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (§12.4's S11
  row); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per
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
  collision-checked labels — which D-7 ranks above speed. Its consequences are the two target misses D-18 declares,
  inside the comfort level (§12.1): model time above §12.3's sizes and the first map above §12.5's knee (O12 (g)). Reversing the trade would mean
  dropping plot and site-plan detail from the one-click path, which the owner's plot-model ruling forbids (J-R17).

### 12.10 The budget register

Every measured budget of this section has one row: the budget (at its home), where and when it is measured, its pass
bar, the pre-decided change taken once at that milestone if it misses, and whether a miss is declared in D-18 as a
target miss — which inside the comfort level is no veto question (g item 119 (a)), while a one-time wait past it fails
(R12-31). Every miss is reported; a change is configuration or a declared shift, never a run-time answer (§12.1).

| row | budget (home) | measured at | pass | pre-decided change on a miss | declared in D-18 |
|---|---|---|---|---|---|
| R12-1 | the per-rung model laws (§12.3) | the cost-model sweeps (§13.2, §13.8): every band's bottom, target and top, five seeds each, in §12.1's timing phase; M1 (TOWN, CITY), M2b (METROPOLIS) | at every size, the p95 of T_i ÷ L(B_i) over the size's generations ≤ 1.10 | the law re-declared at the measured p95; §12.3's and §12.5's tables re-derived from it | a target miss |
| R12-2 | the primary configuration (§12.3) | the same sweeps at pool sizes 3 and 0 on the same generations (B-CITY-lite's 50 seeds × 4 water settings per size, paired by seed and water setting); the golden run's 200 seeds at pool sizes 0–3; R12-1's milestones | (a) R12-1 against the pooled law; (b) the pool's p95 below the single worker's; (c) identical digests at pool sizes 0–3 | §12.3's three pre-decided outcomes | a re-declared law: a target miss; O3 (d)'s clause reported missed by the difference |
| R12-3 | the max clause T_i ≤ 1.25 × L(B_i) (§12.3) | screened nightly by B-CITY (1 000 seeds × 4 water settings per rung, §13.8); every flagged generation re-timed three times in the timing phase at its pool size (the 20 highest when more than 20 flag, the count reported); judged at M1 (TOWN, CITY) and M2b (METROPOLIS) | no confirmed outlier (the median of three re-timed ratios > 1.25) | the clause re-declared at the largest confirmed median ratio (for example 1.4 × the law); §12.3's max columns re-derived | a target miss |
| R12-4 | the CITY split's rows (§12.4) | the fusion gate and the M0 site-and-fields spike; S10b's scoring, the siting feature rasters and the daylight term at M2b on B-CITY-lite | the p95 laws of §12.3 (the rows are assumptions) | a row whose p50 exceeds its figure restated at the measured value with §12.3's p50 column; the p95 laws stay | no |
| R12-5 | the M0 site-and-fields spike, S1 + S4 + S6 ≤ 50 ms at CITY (§12.4) | M0, from redteam-scale §7's scripts | ≤ 50 ms | raster cells coarsen one step — fields and the margin 32 → 48 m; hydrology 25 → 32 m at CITY, 32 → 40 m at METROPOLIS, 16 → 20 m at TOWN — and the spike re-runs | no |
| R12-6 | the first-map laws (§12.5) | B-CITY's browser runs, five seeds each on the reference machine, at each band's bottom, default request and top: TOWN at 1 500 / 5 000 / 9 900 people and CITY at 10 000 / 20 000 / 29 900 at M1, METROPOLIS at 30 000 / 50 000 / 120 000 at M2b; both terms of each law fitted | every p95 within its law + 10 % | a raster-side miss (the first frame above F(B)) steps the tier's tile DPR down one level for every view (2 → 1.5; P from 35 to 24, a third off the per-position terms), fixed at the milestone, and the run repeats; a model-side miss is R12-1's or R12-2's | a model law: a target miss, the knee re-stated in D-18 |
| R12-7 | settle and re-raster (§12.5) | with the first map: M1 on the reference and low-end devices at TOWN and CITY, M2b at METROPOLIS | ≤ 150 ms (CITY view), ≤ 250 ms (METROPOLIS view) | one tile-DPR step down on the tier that missed | no |
| R12-8 | the lit settle, ring blocks included (§12.5) | M2b's settle runs on §8.3's mountainous fixture | within the settle bound | the tier draws the view lit once its visible tiles and first ring are and adds the blocks after the settle, nearest first, each far shadow appearing when its block arrives, their time counted in the view telemetry — the settle's content changes, never a picture | no |
| R12-9 | the GPU frame: ≤ 8 ms (reference), ≤ 16 ms (low end), ≤ 1 ms of main-thread work (§12.5) | M2b in B-CITY's browser runs — the pointer sweeping the reference and low-end views at every rung and §8.3's mountainous fixture under its 15° and 7° suns; M4 on the underground hook fixture of §8.3's hand-lantern row, the lantern on | the frame bounds | the tier drops one rung of §8.4's ladder (1 → 2 → 3), fixed at the milestone, and the run repeats | no |
| R12-10 | the plot edit, assignments, dossier events and hooks (§12.6) | M3a's B-EDIT sequences (the base's hand forms); the hooks with the engine at M4 | the stated bounds | the row re-declared at the measured p95 | a target miss |
| R12-11 | the coarse edits (§12.6) | §13.2's B-EDIT coarse-edit sequences, at the milestone §16 gives them | the stated bounds | the row re-declared at the measured p95, as R12-10 | a target miss |
| R12-12 | scope invariance within ± 20 % (§12.6) | B-EDIT (§13.2): TOWN → CITY from M2a, TOWN → METROPOLIS from M2b | within ± 20 % | the per-rung scope costs re-declared at the measured p95, as R12-10 | a target miss |
| R12-13 | replay and load verification, V (§12.6) | B-EDIT's reference mix at M2a | ≤ V + 10 % | the per-kind costs c(e) re-declared at their measured p95 and the reference mix's V restated (no mechanism changes: the wait is off the path to the picture) | a target miss |
| R12-14 | the warp's Apply (§12.6) | M3a: a 150 m brush over a CITY core on B-CITY-lite seeds, the carry and check counted | within the scoped-regeneration budget of the touched faces | the wing check leaves the whole-step validation — it runs once after the final step, and a building that fails it is re-derived by S11 on its plot (F-REDERIVE, reported) instead of halving the step (§2.6 rule 4) | no |
| R12-15 | previews (§12.6) | B-EDIT at M3a, where the toolkit's area tools ship | the scope's edit budget + ≤ 3 ms | the preview re-runs only on release | no |
| R12-16 | labels: S13b per stop, a tile's label composition (§12.7) | §8.9's measurement at M1 | ≤ 2 ms per stop; ≤ 3 ms per tile | §8.9's (whole words cached as bitmaps; `step(4)`) | no |
| R12-17 | the crown library and each light step's bake (§12.7) | M2b's moving-sun runs (§8.4), where `lit` ships | ≤ 20 ms per (style, light step) for eight classes | §8.4's: with a `path` sun the lit programs and the crowns hold the sheet's fixed sun, the library baked once | no |
| R12-18 | the light-map bake and the lit export (§12.7) | M2b, where the light pass ships with `lit`: METROPOLIS views, B-CITY's A2 exports and §8.3's mountainous fixture | ≤ 2 ms per tile up to 50 lights, ≤ 4 ms up to 200; ≤ 60 ms per export tile; a CITY's lit A2 300 dpi ≤ 10 s | a bake miss resolves §8.4 (c)'s point-light traversal one pyramid level coarser on every host and in the CPU reference alike, a declared view shift (§13.3), never a per-device change; an export miss computes its light pass at half resolution, bilinearly upsampled — the reference defined at that resolution on every host, a declared view shift (§13.3); a lit export still past ten seconds caps the dialog's print sizes as R12-19 does | no |
| R12-19 | SVG and PNG (§12.7) | M1 on B-CITY-lite's TOWN and CITY seeds; M2b on METROPOLIS | the size, element and time budgets | §12.7's (SVG: one decimal and per-quarter compound paths; a district-band SVG's woods and orchards as outlines; PNG: filter None on every host, then zlib level 3 in Node) | no: a miss that remains caps the dialog's print sizes (R12-31) |
| R12-20 | an export beside the view (§12.7) | B-CITY's browser run in the timing phase: at M1 a scripted pan and zoom during an A2 300-dpi CITY export; from M2b a `lit` CITY export while a `path` sun advances one step per frame | every settle within §12.5's bound; the export completes; its PNG byte-identical to the export made with the view idle, to one during which an edit is made (§8.9, §11.1) and, for the `lit` export, to the export with the sun stopped at the request's time | §8.9's `step(4)` | no |
| R12-21 | the stamp-tile load, ≤ 5 ms per worker per session (§12.7) | timed with the first map at M1, per worker from worker start to the library ready | ≤ 5 ms | the per-session hash check moves to CI and the release build, leaving typed-array views over the bundled bytes | no |
| R12-22 | stage 3's `outline()` and `compose()` admission (§12.7) | the stage-3 intake (M6) | the admission bounds | V02 §6.1 (a)–(b)'s fallbacks first; if those still miss, `outline()` runs the generator's own massing step (§2.6) | no |
| R12-23 | the plan rung (§12.7) | §13.2's T28-8 on B-PLAN's fixtures, confirmed at the stage-3 intake | ≤ 5 ms × steps median, ≤ 20 ms × steps p95 | the class's wing-local module doubles (V03 §2.4's `moduleCm`), a declared view shift (§13.3, a plan being derived data), and the measurement re-runs | no |
| R12-24 | the simulation module's hour (§12.7) | its cost-model test (§13.2), with the module (§10.3) | ≤ 50 ms for 50 000 people | the cost re-declared at the measured p95 (never on the one-click path) | a target miss |
| R12-25 | the rung lines and the canvases (§12.8) | B-CITY's browser runs at M1 (TOWN, CITY), M2a (the reference 300-edit CITY document under load verification, with a district regeneration and a Re-derive from S3 made during it) and M2b (METROPOLIS); canvases in the scripted pan and zoom runs | within the lines; within §8.8's tier ceilings | CITY over its line at M1 or M2a: the provenance and lifecycle-history columns leave the working set for the document's on-demand block (SCL-20's archive), decoded only when inspected; still over at a freeze after edits: that freeze makes §3.3 step 1's laziness-contract copy — L0–L2, every L3 partition, only the L4 partitions of the districts the pool derives; still over: the pool shrinks by one worker per step (identical digests by construction, §3.3) and the memory test re-runs. Canvases over a tier's ceiling: its coarser-stop fallback set is dropped (the need falls to 2P + 7 MB), a gesture showing the next coarser cached tiles only where they remain | no |
| R12-26 | the export-time peak (§12.8) | with the export budgets (M1 TOWN and CITY, M2b METROPOLIS) | within the stated figure + 25 % | the transient list built with only the attribute columns the sheet's programs read at the export band, for every export that draws (up to ≈ 2.6 of the ≈ 10 MB at CITY, §8.1 item 6); the figure re-stated at the new measurement and used by the export dialog's size estimate | no |
| R12-27 | the elaboration cache, ≤ 8 MB per document (§12.8) | the stage-3 intake on B-PLAN's fixtures (§13.2) | within the cap | the cap halves and the persisted chunks keep only the `current` plans of the buildings the view state's `favourites` and view pins name (an `edited` plan is model data, §2.6, needing no chunk) | no |
| R12-28 | the light pass's memory (§12.8) | the canvas runs at M2b | §8.8's bounds | the tier's rung drops (§8.4's ladder) or its tile DPR steps down, as §8.8 states | no |
| R12-29 | the daylight term (g item 102 (g); §12.4): TOWN ≤ 5 ms, CITY ≤ 12 ms, METROPOLIS ≤ 30 ms | M2b on B-CITY-lite, with R12-4 | within the rung's budget | the nine sun directions are swept in the derivation pool, three per worker, their bits OR-ed in sun order — the same bits (§6), off the serial path | no |
| R12-30 | the season and festival switches (§12.5; g items 117 (i), 118) | at the milestone that lands the season rows (§16), on the golden views of every family at every rung | each switch's re-skin within the settle bound; the leaf cover, the ice and the decorations ≤ 20 % of a tile's raster time | the leaf cover drawn from the neighbourhood band only and the decorations from the district band only, reported | no |
| R12-31 | the comfort level, ten seconds of total time per one-time wait (§12.1; g item 119) | V12 §3.15.9's wait timer on B-CITY's browser runs and the history and dossier fixtures, five seeds per wait kind at every rung's top and at the population cap, at the milestone that lands each wait: a generate, a regenerate or Re-derive, an open from SettlementForge, a dossier change, an advance of time and the history replay as V06 §6 reads them, an export of every offered format and size, a migration | every p95 ≤ 10 000 ms from the click to the complete result | the owning path's own change first (R12-1, R12-2, R12-6, R12-13, R12-18, R12-19; V06 §6's and V08 §6's rows); an export still past ten seconds has the dialog's sizes capped to what holds within them (R12-19); any other wait still past them fails the release until its path is changed — never a declared miss; a low-tier size that cannot reach it is declared per device | no: a failure |
| R12-32 | the progress rule (§12.1) | with R12-31's waits (V12 §3.15.9 (3)) | for every wait over 1 000 ms the first progress frame naming its stage within 1 000 ms of the click; every sampled frame the current map or the progress view, never an empty screen | the generation worker also posts `Progress` per district batch of the pooled stages and per export band, so no step passes a second unannounced | no |
| R12-33 | slower than a target only for a measured gain (§12.1) | the budget-register check at each release (V12 §3.15.9 (4)) over V11's `perf.qualitySpend` rows | every stage running above its §12 target has its row, whose gain the release's runs show and whose step stays inside the comfort level | the stage runs its target path, its row withdrawn | no |
| R12-34 | the interaction budgets (§12.5, §12.6; g item 119 (d)): pan and zoom (R12-7, R12-9), dragging and a tool's live preview (R12-15; §12.6's warp preview), hover and click-to-inspect (§11.2's `hit` within 1 ms; §8.9's queries), undo and redo (§12.6), the season and festival switches (R12-30) | each row's own run, compared release to release (V12 §3.15.9 (5)) | no row relaxed against the previous release | the row's own change | no |

The budgets of §8 keep their own measurement clauses at their homes (§8.2's random-style confirmation, §8.4's projected
shadows, moving sun and light steps, §8.5's recoverability, §8.9's compositor, text and queries), as does §11.1's
CityJSON extension.
=== END ===

