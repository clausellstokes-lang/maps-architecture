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
  attrs: Record<string, Float32Array | Uint32Array>;   // named columns, 4 B per mark each: heightCm, baseCm, eaveCm, ridgeCm, prosperity, class, block, bankKind, waterKind, exposure, knownTo, concealed, worksStage, worksKind, material, tintKey, …
}                                                        // fixed columns: 54 B per mark
interface GeomTable { rings: Uint32Array /* ring start offsets into coords */; coords: Int32Array /* x, y cm pairs */ }
interface FieldRaster { id: number; originX: Cm; originY: Cm; cellCm: Cm; cols: number; rows: number;
  values: Float32Array | Int16Array; meaning: 'heightCm'|'shoreDistanceCm'|'depthCm'|'custom' }
interface StringTable { utf8: Uint8Array; offsets: Uint32Array }                 // names and species kinds as one transferable UTF-8 blob
interface LabelTable {                // one row per LabelEntity drawn at the band (§9.1) — all S13b reads (§9.2); ≤ 97 B per row plus geometry and text
  count: number; mark: Uint32Array /* its text mark */; key: Uint32Array /* 2 per row: render key (item 5) */; kind: Uint8Array; lodMask: Uint8Array;
  priority: Float32Array; areaM2: Float32Array /* the target's area: the order's second key (§9.2) */; text: Uint32Array; shortText: Uint32Array /* StringTable rows; ~0 = none */;
  spines: Uint32Array /* 2 per row: GeomTable ring range, in preference order */; anchors: Uint32Array /* 2 per row: point-anchor range */; breakAt: Uint32Array /* 2 per row: glyph-index range */;
  parent: Uint32Array /* row of the parent QuarterNode's label (§9.4 rung 5); ~0 at the root */;
  pinStop: Int8Array /* −1 = not pinned */; pinSizePx: Float32Array; pinAnchor: Int32Array /* 2 per row, world cm */; pinSpine: Uint32Array /* 2 per row: GeomTable range */;
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
  surfaceTopCm: Cm /* the greatest elevation above the document's datum (`Terrain.datumCm`, §2.3) that a caster of the city band's list writes into the surface layer or a pyramid (§8.4 (a), §8.8) — §8.4 (c)'s Z, the reach of the global light's window; S14 derives it on the city band's list, which carries every caster (item 2), a delta raising it and a full build re-deriving it, and every other list — a finer band's, an export's transient one — carries that value, never one of its own (item 6; J-A68.93) */ }
interface DisplayDelta { version: number; groups: number[]; removed: Uint32Array /* entity handles */; marks: MarkTable; geom: GeomTable;
  strings: StringTable; labels: LabelTable; instances: InstanceTable; lights: LightTable; dirty: Box[]; surfaceTopCm?: Cm /* present when the delta raises it */ }
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
   which the plan draw sets inside its own room (building band only) and which S13b reads only as a protected obstacle
   (§8.5, §9.2; J-A28.85). `light` marks carry one `LightTable` row each (§8.4): a placed `LightSource` record's (§2.7)
   position, height, intensity, radius, colour and flicker, or a derived light's (a live layer's window, the plan draw's
   room light, a shaft); the light pass reads them and nothing else draws them but the vector rung's `glow` sprite
   (§8.2). A building's `eaveCm` and `ridgeCm` columns (its wing's, for a wing mark; §2.6) let the surface layer (§8.4)
   rebuild each roof face's elevation from the roof's own construction without the model. **The city band carries every
   caster (item 68; J-A68.93).** Every caster of §8.4's *Shadow casters* has a mark in the city band's list — a tree
   line's `instances` mark too, its city-band rank subset empty so that band draws none of its crowns (§8.5's line
   greenery, §8.10); each building's footprint mark carries the building's `Heights`, its max over its wings (§2.6), so
   the ring blocks (§8.8) and `surfaceTopCm` read the whole document's casters from the one list the tile worker always
   holds, and a finer band adds no caster above them.
3. **Slot, pass, draw order (N-7).** The order is **slot-major across the whole scene**: every mark of slot s of the
   style's layer-order table (§8.2) draws before any mark of slot s + 1, in every tile; within a slot by `pass`, then
   `z`, then `key`. A mark's slot comes from its (semantic, pass) by §8.2's slot resolution, cached per style version as
   a (semantic index, pass) → slot table. S14 emits one mark per pass an entity draws in, as the registry declares per
   band: a cased ribbon is a pass-1 casing mark plus a pass-2 body mark over one geometry range (≈ 60 B for the second
   mark, never a second geometry copy; one extra mark per drawn way, a few thousand at CITY). The raised under-copy
   (slot 11) and the projected-shadow union (slot 10) are not marks but per-tile operations over the caster marks,
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
   phase, roof detail, the `ruin` dash — is `RH32(tag, key, salt[, ordinal or cell][, style id])`: a tag (an index into a
   fixed render-tag table); the **render key** `key` = the low 64 bits (words 0 and 1) of the entity key (§6.1), cached
   in the arena beside the lineage hash; the concern's salt (§6.1); and the style id only for looks (colours, crowns,
   hatch), never positions. `RH32`, the render hash (distinct from §13.6's string hash `H32`), folds the words through
   MurmurHash3's 32-bit finaliser and never reads the interned handle, which changes with interning order. The entity key
   is a pure function of model data, so an unchanged model renders pixel-identically after a reload (§6.2) and golden
   PNGs hold (§13.3); a render rule that orders entities (the tint colouring, §8.2) uses address order (§6.3). A look
   thus follows its entity's lineage and the seed (§6.3).
6. **Size (N-9 c).** 54 B per mark in the fixed columns, plus 4 B per mark per attribute column carried, plus the label
   and instance tables and geometry: a CITY city band of ≈ 60 000 marks is ≈ 3.2 MB of fixed columns, ≈ 2.4 MB of
   attributes, ≈ 4 MB of coordinates and ≤ 0.5 MB of label, instance and string rows — ≈ 10 MB; its light rows add ≤ 36 B
   per light (≈ 0.3 MB for 8 000 lights, PLAUSIBLE until §4.7's light table runs on B-CITY). The tile worker holds the
   only full copy; after each transfer the generation worker keeps only the columns `update()` reads (`entity`, `bbox`,
   `group`: 24 B per mark, ≈ 1.4 MB at CITY) and the city band's `surfaceTopCm`, which every list it builds for an export
   carries (§11.1) — the document's highest surface, never one taken from the transient list whose extent it sets. An export that draws (SVG, PNG, print, the `.dd2vtt` image) builds its own
   transient list in the generation worker: SVG writes from it there; a raster export transfers it to the tile worker
   with its request; each releases it when done (§8.9, §11.1).
7. **The drawn week, and concealed marks (items 67, 63).** The display list is built at the **drawn week** — the
   document's current week, or the week the per-viewer key `week` names (§2.9; §4.11's *Which week is drawn*): S14 writes
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
mark and the lit picture of §8.4's light pass (item 68). Every semantic visible at a band has exactly
one registry glyph, from which the legend is generated (O12 d).

**Draw-style census** (G-R2 / G-R18): a regression suite per preset, run on the golden suite (§13.3) and in B-ZOOM
(§13.4). **Order parity** (VIS-16): the reference's recorded order is a subsequence of the preset's, and every semantic the
reference never drew sits at a declared slot with a reason (§8.2's `OrderSlot`s).

| check | presets | pass |
|---|---|---|
| casing Δ = 2h on every ribbon, at every settled view | all | ± 0.1 px (hairline fidelity) |
| 0.5-px hairline ink coverage at 1× | ink | 50 % ± 10 % |
| round joins and caps | ink | ≥ 99.9 % |
| drawn wall, tower and road-core widths against MFCG at the matched scale (MFCG size 40, 0.816 px/m) | ink | within ± 15 % of 6.2 / 12.4 / 6.5 px |
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
| states: every (kind, state) pair that §2.8's ladders, `Building.condition`, `SkyIsland.state`, `Enceinte.supersededBy` and `Passage.sealed` can produce — other than the undeclined defaults (`kept`, and the Existence values `generated`, `built`, `altered` and `converted`), which draw the entity's own programs, and `demolished`, a tombstone that is never drawn — resolves one `states` row (§8.2) per band the kind is drawn at, in every shipped sheet (CI, and at every sheet load) | all | 0 unresolved; a golden TOWN converted by hand once through every building, wall, gate and passage conversion of §4.11 draws those kinds' rows, and a hand-built CITY fixture holding one tunnel and one island record (§2.7's schema) draws the tunnel and island rows until their stages register |
| hidden courts (item 30): on B-CITY-lite seeds whose hidden share is > 0, every court face reached only through a passage (§4.6), at the city band | ink | drawn in `ground` under its block's masses and enclosed by drawn masses or outlines on ≥ 3 sides; 0 hidden plots drawn as `road` or `paper` voids; §8.5's figure-ground metrics within 0.01 of the same seeds at hidden share 0 |
| knowledge (item 30): a golden CITY rendered at the `public` tier and at `secret` under the shipped `knowledge.admit` rows (§9.2), with no thematic row and with a `use`-keyed one (§8.2) | all | with no theme the base tiles pixel-identical, with the `use` theme differing only on the marks of places `public` does not admit, which draw unthemed; the composed tiles differ only where label glyphs lie; at `public` no glyph run of a `local` name at the city or district band, none of a `secret` name above the building band and no legend key of a withheld use; each tier's per-stop placement digests equal §13.3's |
| entrances (item 29): the golden views' district-band tiles | all | exactly one `main` tick per building, placed where §2.6's rule 1 puts it (its frontage, the court or path from the plot's street gate, or a hidden plot's access face); every `side` or `rear` tick on an access edge of its plot beyond the frontage, every `yard` or `service` tick facing a yard or court part of its plot (§2.6's rules 2–3) |
| change markers (item 28): B-ZOOM over a document holding three `stale` rungs (a designation change, a re-let, a dossier event) | all | a marker at every band for each stale building and one for its district at the city band; none after the click; the base tiles unchanged by the marker |
| plots-only view (item 28; §8.5): the golden views at the city and district bands with `plotsOnly` on | all | every plot boundary drawn, 0 building marks; the default view's base tiles pixel-identical once the key is off |
| passages (item 30; §8.5 (2)): B-CITY-lite seeds whose hidden share is > 0, every passage with a `frontBuilding` | ink | at the city band the span ring of every base wing that spans it (§8.5 (2)) inside its block's mass (0 `ground`, `road` or `paper` pixels over any); at the district band its floor in `road` with an arch glyph at each end, drawn closed where `Passage.sealed` |
| passages left uncovered (item 30; §8.2's row; §2.6's `BaseWing.spans`): B-CITY-lite seeds whose hidden share is > 0, every front building over a passage cleared by hand (`clear`), then each clear undone | ink | while a passage has no `frontBuilding`, no span mark over it in any band's mark table and no arch glyph at any band, its floor in `road` at the district band; after the undos every tile pixel-identical to the render before the clears |
| the plan draw (item 28; §8.5, §8.6): every B-PLAN fixture of §13.2, building band, `ink` and its `night` variant | all | every drawn room label inside its room's ring at a cap height within §9.4's room-label range, a room left unlabelled only where its label does not fit at the range's bottom, and 0 S13b glyphs over one; one light per lit room, at its spine summit, and none in an unlit room; one stack per `Chimney` and no decorative chimney on the building |
| roof by band (items 19, 23; §8.2): the `lit` default sheet on a golden CITY, textures off | lit | each building's roof tone, read through the pick buffer, is its prosperity band's row; every row passes the contrast matrix's `building` pairs |
| raised under-copy by class (item 54; §8.2's symbolisation row): a golden TOWN holding houses, landmarks and a farmstead | ink | each footprint's under-copy offset = the base offset × its class row's ratio (house 1, landmark 2, farm building 0.6) within ± 0.1 px before the clamp; the same offsets by day, at night and on every rung |
| palette targets on the measurement render (item 69; §8.2) — the check; the gate is §13.4's B-ZOOM bar | ink, lit, hatched | paper luma 226–244 and warmth 20–50 (at 36 ± 2 for the shipped values); darkest-0.5 % luma ≤ 45 and warmth 15–25; plate chroma 18–70, `ink` 20–30 |
| lighting, one spot lit from every side (item 68; §8.4 (c)): a caster at the centre of four equal lights at its four sides — the receipt's three fixtures (4 × 4 m casters 6 m and 4 m tall, a 6 × 6 m caster 8 m tall) — night, CPU reference | ink, lit | at every ground pixel within the lights' radius outside the caster the summed visibility-weighted term ≥ 0.5 of the unoccluded sum — the lights the caster does not block carry at least half of every such pixel's light (`docs/validation/bench/amendc_repair_rendering_r1_light.out` (A): worst 0.60) — so no dark shadow; each light's own term alone shows the caster's shadow away from it |
| lighting, a shadow never climbs a taller roof (item 68): a 4 m hovel beside a 30 m tower, the sun at 64 azimuths × 3 altitudes and the cursor sun at 100 pointer positions, CPU reference | ink, lit | 0 pixels of the tower's roof whose sun term the hovel lowers |
| lighting, the shadow on a lower roof is shortened by that roof's height (item 68): the same fixture | ink, lit | where the tower's shadow crosses the hovel's roof, its tip lies at the similar-triangles position — d × (h_tower − h_roof) ÷ (H − h_tower) past the tower for a source at height H and ground distance d, (h_tower − h_roof) × cot(altitude) for the fixed sun — within max(1 px, the diagonal of §8.4 (c)'s floor cell at that distance), and it continues beyond the hovel onto the ground |
| lighting, the cursor sun (§8.4 (d)): 200 pointer positions and `sunHeight` 1, 4, 64 on a golden TOWN | ink | every caster's shadow tip at d · h ÷ (H − h) beyond the caster — d · H ÷ (H − h) from the sun's ground point G, d the caster's distance from G — within max(1 px, the diagonal of §8.4 (c)'s floor cell at that distance); wherever \|G − V\| > D, the largest angle between two casters' shadow bearings ≤ 2 · asin(D ÷ \|G − V\|) + 0.1° — the angle the view subtends from G, which falls as `sunHeight` rises (`amendc_repair_rendering_r1_light.out` (B)); nearer, the shadows are radial and the bearing bar is void |
| lighting, long shadows across tile lines (item 68; §8.4 (c)'s window): a 45 m tower and a 20 m house at the 1:500 stop, tile DPR 2 and 1, under the fixed sun and a 15° path sun, each rendered with the tile grid offset by 0, ¼, ½ and ¾ of a tile side, CPU reference and GPU pass | ink, lit | the shadow's start on the caster's centre line (V = 0.5) within max(1 px, the diagonal of §8.4 (c)'s floor cell there) of the similar-triangles point h ÷ (m − σ ÷ 2) past the caster's near face, lengthened never shortened, identical at all four offsets — no step at any tile line (`docs/validation/bench/amendc_repair_rendering_r2_traversal.out` (1): the law's start within 1 px of the exact texel law's, which lies within 1 px of that point; +13 px against a 16-px cell at 169 m, and at most the cell's diagonal under a diagonal sun — 1.33 × its side under a 15° sun, `amendc_verify_rendering_r2_diag.out`) |
| lighting, narrow casters (item 68; §8.4 (c)'s traversal): towers 2, 6 and 12 m wide and 30 m tall under a 15° path sun at the 1:500 stop, tile DPR 1 and 2 | ink, lit | one unbroken shadow along each tower's axis with no lit pixel inside its similar-triangles shadow (receipt (2)); across the shadow at distance t, its width within one floor cell's diagonal per side of the caster's (receipt (3)) |
| lighting, a mountainous site (item 68; §8.4 (c), §8.8's first ring and ring blocks): a golden CITY whose site request is `mountainous` with a hill primitive whose top stands 3 000 m over the datum inside its frame (§4.2 S1), the view at the 1:500 stop in the valley on the hill's shadow side at tile DPR 2 and 1, under a 15° path sun and one at 7°, the tile grid at offsets 0 and ½ of a side, CPU reference and GPU pass; and an A2 300-dpi lit export of the view's area at the 1:500 scale | ink, lit | the hill's shadow edge across the view at its similar-triangles position within max(1 px, the diagonal of §8.4 (c)'s floor cell there), identical at both offsets and equal to a CPU-reference render with every level held everywhere (no blocks; `amendc_repair_rendering_r3_blocks.out` (1)); every block cell at or above the greatest height the district band's marks write there, the city band carrying every caster (§8.1 item 2); first-ring positions and blocks within §8.8's counts, their memory within B; the GPU pass within §13.4's tolerance of the reference; the lit settle within §12.5's bound, or its pre-decided fallback taken and reported; the export within §12.7's lit-export bound, its window within §8.8's, its shadow edge where the view's reference render puts it |
| hand lantern (item 68; §8.4 (b), (f)): the underground layer of a golden CITY at the depth band holding a tunnel with frontage plots (§8.4's default band), `handLantern` on at nine pointer points and off, CPU reference and GPU pass, and each export of that view | ink, lit | the GPU within §13.4's tolerance of the reference, which evaluates the lantern by §8.4 (c)'s law at each given pointer point; 0 lit pixels from the lantern's term beyond 6 m of the pointer's floor point; with `handLantern` off, every pixel equal to the render without it; no lantern term in any export |
| lighting, which sun draws (item 68; §8.4 (d)): a golden TOWN in the `FTG` preset with a viewer's `sunMode` `cursor`, and in `ink` under each of the three modes, each with a pointer, without one (a still, an export, a touch screen's first map) and on rung 3 | FTG, ink | `FTG` draws its fixed or path sun whatever the key; `ink` the viewer's mode; with no pointer, and on rung 3, `fixed` — each render's tiles equal to a render at the mode §8.4 (d)'s rule names |
| lighting, the sheet's default light (item 68; §8.4 (e)): a viewer whose view state holds no `light` value choosing the `night` preset as its `stylePreset`, then setting `light` to `day`; and a document drawn in its own `night` style opened by such a viewer | night | the view opens at night (its tiles equal to a render at `light` `night`); the viewer's `day` holds after the change and after its view state is reloaded; every other shipped sheet opens at §2.9's `day` |
| post operations after the light (item 68; §8.4 (f)): `greyscale`, `sepia`, `tint`, `pixelate` and `dotScreen` on a golden CITY at night under coloured point lights — a rungs 1–2 view against the CPU-reference export of the same frame, and on rung 3 | ink, lit | base pixels grey (R = G = B), sepia or tinted after the light, the view within §13.4's tolerance of the export; label, halo and overlay pixels equal to the render without the operation; the cell operations' cells on each tile's own grid, weighted as §8.4 (f) states, in view and export alike |
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
=== REPLACE ### 8.4 Layers, shadows, heights ===
### 8.4 Layers, shadows, heights

* **Layers** draw in `zOrder`: `underground` marks (sewers) through a cut-away mask or a translucent overlay; `sky`
  marks above, their shadows projected onto the ground layer. Occlusion policy (VIS-17):

  ```ts
  interface LayerSpec { id: Layer; zOrder: number; elevationCm: Cm; visible: boolean; castsShadowOnto?: Layer; exportSeparately: boolean;
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
* **Toggles are visibility; existence is model (items 14, 15; II.6, II.7; J-A12.81).** The sewer control at CITY and
  METROPOLIS and the island view toggle set `LayerSpec.visible` of the `underground` and `sky` layers (the controls of
  §7.8); whether a network or an island exists is the model's — `Features.sewers` (II.7.1) and `recipe.layers.islands`
  (II.6) — so hiding a layer changes no digest and a toggle never creates what the settlement lacks. The `underground`
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
    latitudeDeg: number /* path mode; default 50 */ };
  type MoonSpec = { colour: Color; intensityLux: number /* a full moon: 0.25 */; phase: { at: number /* 0 new … 0.5 full … 1 */; factor: number }[] /* interpolated */; discCdeg: number /* 26 */ };
  ```

  (a) **The surface.** The tile worker rasters, beside each tile's base, a **surface layer** from the same marks
  (§8.8): per pixel the surface normal, its height above the tile's datum (the tile's lowest terrain sample) and the
  unlit coverage (below). Its writers: terrain `field` marks (height and normal from the field); roofs as surfaces from
  the roof construction of §8.6 — eave, ridge and the construction's own faces, never the straight skeleton directly, so
  §3.8's readers stay three (J-A28.32, KERNEL-C05); flat roofs, walls, towers and gatehouses as the tops of their prisms;
  bridge and pier decks at `deckCm`; tree crowns as domes to their crown height (the top-down view never shows the
  ground beneath a crown); water at its level; a building under Works at its stage heights (`heightsAt`, §4.11; item
  67); on the underground layer each floor, its walls and its ceiling. **Occluder slabs** hold what a single height per
  pixel cannot — a caster whose covered ground the view draws: a sky island under `ghost` or `offset` occlusion, the
  span marks of a building over a passage (§8.5 (2); their `baseCm` column the underside) and a bridge or pier deck over
  drawn water — each a per-tile record of its outline, its top and its underside, so the ground beneath is shaded from
  above and lit from the side, and an island's shadow falls from its underside (J-A68.83).
  (b) **The sources.** The **global light** — the sun by day, the moon at night (`LightingSpec.sun`, `.moon`); the
  **placed lights** — `LightSource` records (§2.7), placed by §4.7's light table or by hand (`placeLight`, §7.1), each a
  `light` mark (§8.1) with its height, intensity (cd), radius, colour and flicker; the **derived lights**, never
  records (J-A68.72) — lit windows (`live.windows`, §8.2's live layers, by §10.3's rule at the view's hour and week), the
  room lights of the plan rung (building band, §8.5), and **light shafts** (II.7.3, II.7.5, II.7.6: every access,
  grate, well or opening that breaks the surface, a downward source at its underground end whose intensity is the
  current global light's × the opening's area ÷ 1 m², a cosine lobe whose radius is its depth plus 4 m); finally the **hand lantern**
  — the viewer's own light (`handLantern`, underground only, off by default: a 20 cd source 1.5 m above the pointer's
  floor point, radius 6 m), never a record. Every light — placed, derived or a shaft — lights only where its host draws, so
  a concealed part's or a secret access's light, glow or shaft reaches no key that does not admit its host (§8.1 item 7;
  J-A63.82).
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
  `surfaceTopCm` (§8.1) less the pixel's elevation, with m = max(tan altitude, ⅛) for the fixed and path suns (*Sun*'s cap
  of a shadow at 8 × its caster's height, below) and, for the cursor sun, m = (H − z) ÷ |P − G| toward its ground point
  G, R there at most |P − G| and |P − G| itself where m ≤ σ_s (P the pixel's ground point); the ray also ends where it
  leaves the list's `bounds` (§8.1), beyond which nothing is drawn. The window is a world distance, so a shadow crosses every tile
  line at its similar-triangles length and never depends on the tile grid (receipt (1): the start within 1 px of the
  similar-triangles point on every grid offset, the floor adding at most its cell's diagonal — 1.33 × its side under a
  15° diagonal sun, `amendc_verify_rendering_r2_diag.out`); the slab list's records within R are
  tested exactly by their outlines. R, the floor and the resolved cells depend on the source, the pixel and the surface
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
  G = V + s · u, height H = h₀ · D · s (h₀ = `sun.heightRatio`). At s = 1 it stands over the pointer, and every caster's
  shadow falls straight away from it; a caster of height h at horizontal distance d from G throws its tip to
  d · h ÷ (H − h) beyond it (similar triangles), capped where the view ends when h ≥ H. As `sunHeight` rises the sun
  recedes along the line from `V` through `C` and rises in proportion, so the shadows turn from radial toward parallel,
  the pointer then setting the sun's bearing (from the view centre toward the pointer) and its elevation
  (atan(h₀ · D ÷ |u|)) — "very high: nearly parallel, realistic; lower: dramatic and radial". **Which sun draws** (one
  rule; J-A68.84): the sheet's `SunSpec.mode` is the family's default and `SunSpec.admits` the modes it offers — a parity
  preset admits only its own, the `FTG` preset `fixed` and `path`; the per-viewer `sunMode` (§2.9) chooses among the
  admitted modes, and a value the sheet does not admit (the key's `cursor` default under the `FTG` preset) draws the
  sheet's `SunSpec.mode`; a drawn `cursor` sun where there is no pointer — the first map, a touch screen, every export, a
  still, a headless render — or on rung 3 is `fixed` (the sheet's 315° / 45°, its light falling from the upper left). The pointer is a transient input,
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
  (slots 1–20 of §8.2's order) and runs before labels, live overlays and furniture (slots 21–25), which keep their day
  colours, so the label floor holds at night (§9.4): the tile worker composes labels and `overlay` marks into the tile's
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
  reference draws it at its mean.
  (g) **The fallback ladder** (F-LIGHT, §5.2; J-A68.85). Rung 1 — the GPU pass at the tile DPR; rung 2 — the GPU pass with
  the global term at half resolution, upsampled by the surface layer's normals and heights; rung 3 — the **vector pass**: the
  projected-shadow pass (§8.2's `shadowPass` program, `drop` or `prism` by `vector.projected`, `vector.penumbraPx`) from the fixed or path sun, the family's
  night role variants (`@night`, §8.2) with a `glow` sprite at each light mark, and the light step (below) for
  `faceLight`, the two-tone roof, `hillshade` and the crowns. A tier's rung is chosen at app start from §8.8's canvas
  budget and the measured frame time (§12.5), lowered at run time on a lost GPU context or three consecutive frames over
  the pass's budget, never raised mid-session; every change is counted in the view telemetry, never an error and never a
  model change. **A tier whose GPU pass misses §13.4's tolerance** at its milestone transfers its surface layers at full
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
  trees (crown offset by the crown height), sky layers (the island outline projected by `elevationCm`); a building under
  Works casts at its stage heights (§4.11). On rung 3 every caster projects along the sun vector from its base elevation
  (`baseCm`, FTG-13) onto the ground; the ground under a footprint lies within FTG-13's plinth tolerance, so a flat
  projection from the base is exact to that tolerance — the height-aware receivers of (c) are rungs 1–2's. Rung 3's
  shadows are unioned per layer and composited once per layer per tile — into the base raster in `fixed` sun mode, into
  a per-tile shadow layer of their own in `path` mode where the tier's canvas budget admits it (§8.8), so a moving sun
  re-rasters only shadows. `drop` offsets each caster's footprint by height × cot(altitude) along the sun's azimuth;
  `prism` draws the swept prism; both from the same heights.
* **Sun (K05).** `SunSpec` (above; which mode draws is (d)'s rule): the `fixed` sun at azimuth 315°, altitude 45° (light
  from the upper left); in `path` mode from
  `sunPath(latitudeDeg, dayOfYear, hour)` (solar declination and hour angle with `dmath`), driven by the view-state time
  (§11.3; the simulation module's clock when it runs), the hemisphere following the latitude's sign. The shadow pass
  reads the path-mode sun quantised to 1° in azimuth and altitude (§8.8, N-8); every other program that reads the sun —
  `faceLight`, the two-tone `roof`, `hillshade`, the `lit` crown bake (§8.2, §8.10) — reads its **light step**, the
  path-mode sun quantised to 15° of azimuth and 5° of altitude — on rung 3; on rungs 1–2 those programs emit albedo
  and normals and the light pass lights them once (J-A68.87). Below −6° the view is night by (e). Shadow length is
  capped at 8 × height near sunrise and sunset for the fixed and path suns. Rung 3's shadows are vector with no
  shadow-resolution setting; rungs 1–2's are resolved by (c)'s traversal at the surface layer's resolution, to its floor
  cell beyond half a tile side (§8.8).
* **Budget (AM-3; rung 3).** The projected pass costs ≤ 20 % of a tile's raster time (vector offsets, one union per layer;
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
* **Heights** of every building, wing, tower and roof are §2.6's — at a Works stage its derived stage heights (§4.11) —
  so the surface layer, the shadows, glTF and CityJSON agree (O17 g).
=== REPLACE ### 8.8 Tiles, zoom stops, print and the canvas budget ===
### 8.8 Tiles, zoom stops, print and the canvas budget

* **Pyramid (N-9 a).** Zoom stops (`ZoomStop`, §8.1) at 2^¼ steps of scale (four per doubling) cover B-ZOOM's 1:50 000 →
  1:500 in 27 stops; stop k has m_k metres per **CSS** pixel. Tiles are 512 × 512 device px at the view's **tile DPR** d
  (the device pixel ratio after the tier's cap, below), **world-aligned** per (stop, d): tile (i, j) covers the world
  square of side 512 × m_k ÷ d metres with corner (i, j) × 512 × m_k ÷ d from the world origin — stable under panning,
  shared between views and exports at that stop and DPR. The view settles on exact stops: the settled scale is within
  ± 9 % of the requested one, and every settled view has exact hairlines, exact casings and a collision-free label set
  (J-R8).
* **Content (GEO-28, N-7).** A tile draws every mark whose bbox meets the tile dilated by m = the largest of the casing
  half-width, the drawn wall half-width, the projected-shadow length, the largest crown radius and the halo width at the
  stop — and, for a light map, the largest radius among the lights that reach the tile (§8.4 (f)) — in §8.1 item 3's order, identical in every tile; each tile clips to its own square, so both sides of an edge yield
  the same pixels — no seams, no casing bar across a junction on a district boundary. Fills of one semantic within a tile
  are one `Path2D` with the non-zero rule (no anti-aliasing seam between same-role neighbours); semantics declared
  `seamClose` (ground, masses, yard parts, the shadow union) also get a ½-px same-colour stroke underneath (NG's seam
  dilation). Tested by §8.3's junction-mouth and draw-order rows.
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
  T = 160 m ≈ 0.2 m steps at 5 m, ≈ 1.2 m at 100 m; T is 160 m, or the tile's own range above its datum rounded up to the
  metre where that is greater — a steep tile at a coarse stop — carried beside the datum, so no height clamps; J-A68.94),
  and the unlit coverage in one
  byte (the coverage of the label glyphs, halos and `overlay` marks it composed, so the light pass leaves them as
  composed) — and bakes its **light map** at half resolution (256² × 4 B: the point lights' term in three channels, the
  ambient occlusion in the fourth); both are transferred to the main thread with the composed bitmap, whose one bitmap
  per tile position stands (J-R21). Each surface layer carries its **max-height pyramid** (§8.4 (c)): level 0 its own
  heights; levels 1–9 per cell the greatest height of the marks whose outlines — an `instances` mark's dilated by its
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
  and scale top (above); so no cell of a block lies below what the view's band writes there, and no block waits for
  a band answer. The visible tiles, the first ring and the blocks partition the window, the blocks' number growing with
  the logarithm of its reach and the frame bounding them: at most 326 first-ring positions and blocks together at the
  reference view, and 437 at any view up to tile DPR 3, for a window reaching the whole frame of any rung to the
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
  also fits, otherwise a sun step re-rasters the base. Worked cases (`fixall_rendering_r2_budgets.out`): the reference view,
  1 440 × 900 CSS px at DPR 2, has P = 35 and needs 112 MB (156 MB with shadow layers) — mid or high tier; the low-end
  device at 1 366 × 768 or 1 920 × 1 080 at DPR 1 needs 43 or 67 MB — inside the low tier's 72 MB, fallback stop, scratch
  and atlases counted. Lit (rungs 1–2; each case the base need + Q, `amendc_repair_rendering_r3_blocks.out` (5)): the
  reference view keeps DPR 2 on the high tier (P = 35, 155.75 + 17 = 172.75 MB), steps to DPR 1.5 on the mid tier
  (P = 24, 109 + 14.25 = 123.25 MB); the low-end device at 1 366 × 768 is lit at DPR 1 (P = 12, 58 + 10.75 = 68.75 MB) and
  at 1 920 × 1 080 (P = 20, 92 + 12.75 = 104.75 MB) draws the vector rung; at full precision (base + Q_f) the reference
  view is lit at DPR 1.5 on the high tier (P = 24, 163 + 28.5 = 191.5 MB) and at DPR 1 on the mid tier (P = 12,
  85 + 21.5 = 106.5 MB), and the low-end device draws the vector rung (all PLAUSIBLE until M2b's canvas measurement, §12.8). Cached tiles beyond the visible and fallback sets are evicted least-recently-used by bytes. The
  tier is chosen at app start from the Canvas2D part of `bench/calibrate` (§12.1) and the host's reported device memory,
  can be overridden in the advanced panel, and is shown with the tile DPR in the view status (J-R22).
* **Gestures (SCL-7, VIS-6).** During a pinch or wheel zoom the compositor shows the nearest cached stop's composed tiles
  scaled (the labels scale with them); 120 ms after input stops the view animates (≤ 150 ms) to the nearest stop and the
  tile worker re-rasters the visible tiles centre-out, swapping each in when ready. Panning composites cached tiles and
  shows newly exposed ones from the next coarser cached stop until rastered. While a gesture runs at most 4 new bitmaps
  are committed per animation frame; at first paint and at settle every ready tile is committed in the frame it arrives
  (§12.5).
* **Print and large PNG (O12 e).** Horizontal bands of tiles (512 device px high) are rastered and composed at the export
  scale; each band's scanlines are streamed into the PNG encoder — each row filtered by the **per-row rule** (of PNG's
  five filter types, the one whose filtered bytes have the smallest sum of absolute values, bytes read as signed), then
  one zlib stream (`CompressionStream` in browsers, `zlib` at level 6 in Node) — and written as IDAT chunks band by band;
  §12.7 holds the encoding's time and fallback. Peak canvas memory is one band (A2 at 300 dpi: 7 016 px × 512 px × 4 B
  ≈ 14 MB); no canvas is larger than a tile band. A lit export (item 68) runs §8.4's CPU reference light pass tile by tile, each
  export tile over its own **window**, its first ring and ring blocks taken round the export tile as round a view of one
  position: the tile's float32 surface (12 B per pixel, 3 MB) and pyramid, its first ring's float32 heights and pyramids
  (8 positions, 10.67 MB) and its blocks in float32 (4 B per cell) — ≤ 30 MB whatever R (one export tile's blocks
  ≤ 13.1 MB at the 1:500 scale over the frame at the population cap, `amendc_repair_rendering_r3_blocks.out` (3)), never
  a whole band's surface. The blocks come from the export's **block cache**, which keeps every block the export has
  computed while they fit in 16 MB (the tile in progress's held, the least recently used released first), a cached block
  serving each export tile after it whose floor there is at or above its level; each first-ring position's heights are
  rastered for every band whose tiles it borders; the light-map bake reads the
  tile dilated by the largest light radius. The export then runs §8.2's post operations (§8.4 (f)) and composes its labels,
  one band's canvas (≈ 14 MB at A2 300 dpi) and one tile's window held at a time (§12.8); its transient list carries the
  marks its first rings and light maps read and the city band's casters its blocks read, over the frame dilated by its
  window R, whose Z is the city band's `surfaceTopCm` the generation worker keeps, never the list's own (§11.1, §8.1 item
  6), so a caster beyond the frame's edge still shades it. Per-layer transparent PNGs use the same
  path with the layer set restricted.
* **Warp preview (SCL-9).** While a warp brush is held, the moved L1 vertices are applied to a transient copy of the
  affected ways' and blocks' marks, and only tiles meeting the brush's dirty box re-raster (frame rate: §12.6). **Apply**
  commits the `warp` event (§7.1), whose invariants and re-derivation run then; **Discard** drops the copy (MFCG's staged
  warp, on our event model).
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
  export (§11.1), answers the API's `hit` and `inView` queries (§11.2) from the model and its 24-B index (`entity`,
  `bbox`, `group` — all a hit test or a features-in-view list reads), holds the elaboration cache (§2.9), and hands stage-3 `compose()`, `plan()` and close-up
  derivation (§8.6) to the derivation pool — on a click under `elaborate: 'click'`, on the tile worker's band request
  under `'view'` (§4.1). (2) The **derivation pool** (up to three workers, §4.1) runs the per-district
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
  | tile worker → main | composed tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles); with the light pass on rungs 1–2, each tile's surface layer with its pyramid and its light map, and each first-ring position's heights with their pyramid and each ring block (§8.8) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile; + 1 MB surface (3.25 MB at full precision, §8.4 (g)), 1⁄12 MB pyramid (1⁄6 at full precision) and ¼ MB light map; ⅓ MB per first-ring position and ≤ 1⁄48 MB per ring block (⅔ and 1⁄24 at full precision) |
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
    sun?: { azimuthCdeg: number; altitudeCdeg: number };        // the shadow sun (§8.4's 1° step): read only by the projected-shadow pass
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
  sprite draws (crowns, glyph copies), or a derived per-tile operation (projected-shadow union, raised under-copy, post
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
=== REPLACE ### 11.1 Formats ===
### 11.1 Formats

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9's format and canonical form; its byte-identical round trip is tested in §13.2 | import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment; a `plan` block per building whose plan rung is not `absent`, its state (§2.8) recorded on the block (§2.6; items 28 and 28 (f); J-A28.84): storeys, each with its rooms (address, ring in integer cm, role, `scope` — `unit`, `shared`, `service` or `circulation` — and, for a `unit` room, `unit`, the address of the household whose dwelling unit it belongs to), walls by kind, openings (kind, width, and the entrance of §2.6's set an `entrance` opening serves) and windows; the plan's `units` (each household's address, its unit form and its entry opening), stair cores and chimneys; with the output version and the supersedes table, so an exported plan says who lives where and the room graph follows from the openings; every record's fields with their tier by §2.8's `factTier` — `dossier`, `declared` or `map` (item 20 (h)) — and each event's authorship with the log (item 101 R19, below); each district's character vector, identity, band range and name history (item 72); each `Works` with its stage at the export's drawn week (§4.11's *Which week is drawn*; item 67); each `LightSource` (item 68); a clandestine building's concealed use and its concealed parts (item 63), the document formats being admitted whole (*Knowledge*, below); our own schema, never a cell grid | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer; one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (§3.6 (6)); MultiPolygons for face unions; walls, towers, gates and built bridges as typed features (a crossing `site` is not exported, §2.7); boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (§8.10's function at the finest band, overrides applied: integer-centimetre positions under §6.5's lint, so the file is byte-identical on every host) with `species[]` (each instance's species kind), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths; public attributes include the lifecycle states (`existence`, `condition`, a wall's `supersededBy`, a tunnel's `closure`, an island's `state`; items 8, 11, 31), a plot's `exposure` and `knownTo`, a building's `knownTo`, and an institution's `knownTo` on the features of its buildings (item 30), a building's `entrances` as points with their roles (item 29), an underground building's `baseCm` as its depth below the datum and `eaveCm` as its ceiling and a tunnel's invert profile (II.7), a market reservation's `rank` (§4.2); also each building's `worksStage` at the export's drawn week (item 67), an access point's `state` (item 64), each gallery, chamber and link of the underground systems with its `system`, `kind` and `depthBand` (II.7.6; item 65), a district's `identity` and band range (item 72), each lit `LightSource` whose host draws for the export's key (§8.1 item 7) as a Point with `kind`, `heightM`, `intensityCd`, `radiusM` and `colour` (item 68), and every property's tier as `plat:tier` — `dossier`, `declared` or `map` (item 20 (h)); the `name` and the purpose of a place (its `use`, or an institution's kind) the export's knowledge key does not admit (§9.2 and §11.3) are withheld, the feature staying in the file, and a concealed use's features — its rooms, its concealed entrance, its way down (item 63) — and a secret access or link are left out for such a key, their lights with them; a fallen island's archived arena is not exported (II.6) | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13; the export dialog's `text` option) by default as **outlines** — each glyph used written once in `<defs>` as a path from the bundled face's own `glyf` outlines (the face the labels were measured with, §9.2; quadratic segments as SVG `Q`), each placed glyph a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2) (J-R32); halos by paint-order in both; hatching as compound paths; symbol widths; the light (item 68) as the vector rung's shadows in `<g id="layer.shadow">` and glow sprites, or, with the export option `lighting: 'raster'`, one embedded raster lighting layer from the CPU reference (§8.4 (f)) in `<g id="layer.light">`, multiplied over the base groups; the colour-matrix post operations (§8.2) as one filter on a wrapper group `<g id="lit">` that holds every base layer group, `layer.shadow`, the glow sprites and `layer.light`, under the label groups, so they act after the light as §8.4 (f) orders and never on a label | size and element budgets: §12.7; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | §8.8's band-streamed tile assembly at any DPI, rastered in the tile worker from the export's transient list (below) and lit by §8.4's CPU reference at the request's light setting — the fixed or path sun by day, the moon and the lights at night, since an export has no pointer (item 68); transparent background; per-layer transparent PNGs (the largest MFCG ask); print presets A4…A2 at 300 dpi | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer — the ground; the sky per island; the underground one scene per depth band (`depthBandCm`, II.7.3) at that band's depth, every system of the layer in it (II.7.6; item 65) — with its elevation, plus one scene for each storey of a building whose plan rung exists (the profile below; item 28); model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing, each wing that spans a passage also extruded over its span ring from the passage's `headroomCm` above that wing's base to its eave (a stepped front's quads each), the passage left open beneath (§8.5 (2); `Passage`, §2.5; `BaseWing.spans`, §2.6), a basement (§2.6; item 29) extruded down from `baseCm` by its storeys inside its inset ring, an underground cell or vault (II.7.3) at its own depth — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6 — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases; bridge and pier decks at `deckCm`; trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32); a building under a Works at the export's drawn week (§4.11's *Which week is drawn*) extruded at its stage heights (`heightsAt`, §4.11; item 67); lights (item 68) as `KHR_lights_punctual` — a point light per lit `LightSource` (its position, colour, intensity in candela and `range` its radius) and one directional light for the fixed sun, the lights of an underground layer in that layer's node, each light only where its host draws for the export's key (§8.1 item 7). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data, §2.6) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces; over a passage the solid takes each spanning wing's span-ring prism, from the passage's `headroomCm` above that wing's base to its eave, the passage open beneath), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses), `Tunnel` (II.7's tunnels, swept from the invert profile and the bore), `Bridge`, `TINRelief` (terrain); a basement as a `BuildingPart` below `baseCm` and an underground cell as a `Building` whose base lies below the datum (items 12, 29); a building under a Works at its stage heights (`heightsAt`) at the export's drawn week (§4.11; item 67); no `referenceSystem` (a local metric CRS); a geo anchor, when the export has one, is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots | the corpus-calibration input |
| **permalinks** | §6.4's format and refusal rule; `&doc=` references resolve through §11.5's `DocResolver` | a document format under *Knowledge* (below): offered only to a key of tier `secret` |
| **skeleton** (item 101) | the document's **declared subset**: a `.plat` document with no model, whose log is the recipe's intent and, in log order, every event whose entities §2.8's `factTier` reads `declared` — the author's declarations, the sugar events among them (§7.1) — each marked `creation`, so importing makes them the creation prefix of a new document, whose stages read its drawn declarations ahead (§4.1, §7.7) | with the same seed, a skeleton exported and imported again reproduces the city byte for byte (§6.5 (9)'s skeleton round trip); a clerk's transcript of tool calls is itself a valid skeleton; a document format under *Knowledge* |

**Rotation.** Picture exports (SVG, PNG, VTT) use the view's rotation (§9.5); GeoJSON keeps model coordinates and records
the rotation.

**Knowledge (item 30; J-A30.83, J-A30.85).** Every picture and interchange export takes the requesting viewer's
knowledge key with the view state (§11.3), so a shared SVG, PNG, VTT scene or GeoJSON carries no name and no purpose of a
local or secret place the key does not admit — the place itself, its faces and its doors, stays in the file (§9.2) —
and none of a concealed use's concealed parts (its rooms, its concealed door, its way down; item 63) or of a secret access
or link (items 64, 65), which §9.2's refinement withholds as marks too (J-A63.81), nor the lights, glows and shafts those
hosts carry (§8.1 item 7; J-A63.82). A
picture admits at the band it draws (an SVG its declared band, a raster the band of its export stop, a storey's scene
the building band); a file without a band — GeoJSON, CityJSON, glTF extras, CSV, a scene's journal entries — admits as at the city
band (§11.2), so a file never names what the town view withholds. The document formats — `.plat`, the compact twin, the
JSON schema and a permalink (its recipe and log, or the document a `&doc=` link names, rebuild every name, §6.4) — are
the model and carry every name, so they are admitted whole or not at all: `export` offers them
only to a key of tier `secret` (the `owner` and `editor` roles by default, §11.3; a script's by-value `exportDocument`
runs as the owner) and refuses any other key with the API error `E_KNOWLEDGE_TIER`, naming the tier the format needs.
The key governs what the module shows and writes; it does not hide what a client that loads the document holds, so a
host that keeps a place secret from a client sends that client pictures and interchange exports, never the document.

**Authorship and tiers in every export (items 20 (h), 101 R19; J-A101.82).** Every model and interchange format carries,
per record or feature, the tier of each fact by §2.8's `factTier` — `dossier` (the dossier's, immutable on the map),
`declared` (an author's declaration, held) or `map` (derived by rule) — and every format that carries the log (`.plat`,
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
(§11.3), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never mistaken
for a real place. For a dossier-bound map whose host supplies the optional realm block (item 77; §14), the port's realm
fit sets the anchor's `bearingDeg` — the turn of model north that fits the derived gates to the partners' true
bearings (§7.7 item 2) — as the key's documented default; no geometry moves for it. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator easting
and northing — scale 1 on the central meridian through the anchor, false origin at the anchor — and inverted to WGS84
latitude and longitude with Krüger's published series to fourth order in the third flattening, evaluated with `dmath`
so the file is byte-identical on every host; coordinates are written with 7 decimals (≈ 1 cm), exterior rings
counter-clockwise and holes clockwise (RFC 7946 §3.1.6). Distances a GIS measures on the ellipsoid then match model
distances within a factor 1 + (d ÷ R)² ÷ 2 — at most 3.1 × 10⁻⁶, ≤ 5 cm, at the farthest corner of the largest frame
(≈ 15.7 km from the centre at aspect 2, §12.2). A foreign member `plat` records the anchor, whether it is the default,
the document id and the output version. The **metric** variant — offered "by prior arrangement" (RFC 7946 §4) for tools
that want the model's own metres — writes x east and y north in metres from the settlement centre with 2 decimals (the
centimetre lattice exactly), no `crs` member, in `<name>.metric.geojson`, beside a sidecar `<name>.metric.json` giving
the origin, the unit, the axes, the document id and the anchor if one is set (J-R31).

**Where exports run.** Every `export(h, fmt)` runs in the generation worker, which holds the document (§8.9). *Model
formats* — `.plat`, the JSON schema, the compact twin, GeoJSON, glTF / OBJ, CityJSON, CSV and permalinks — read the model
and §8.10's instance function (`Exporter.write(doc, null, opts)`) — except the JSON schema's `plan` blocks, which
carry every stored plan and the derived plans the exporting session's elaboration cache holds, each with its rung state
(§2.8), so which derived plans a JSON export carries depends on what was clicked, the cache being non-canonical (§2.9;
J-A28.86). *SVG* needs a display list and label placement at the
export's own stop (§8.7), while the generation worker keeps only a 24-B index of the tile worker's list (§8.1 item 6):
the SVG exporter builds a **transient list** for the export's band and frame with `DisplayListBuilder.build(model, band)`
(≈ 4 µs per building at the city band), runs S13b there at the export stop through `@plat/labels` with `@plat/render`'s
`ObstacleSource` and `RoleIndex` over that list — the code the tile worker runs, with the export frame as the visible
region of §9.2's scope, so the placement is the one the tile worker would compute at that stop and §13.3's placement
digests test the code both run — writes the file and releases the list (time: §12.7; the list is §12.8's export-time
peak). A district-band SVG's list is counted in the size estimate shown before writing (J-R41). *Raster formats* — PNG,
print and the `.dd2vtt` scene image — use a transient list too: the generation worker builds it the same way for the
export's band and frame (including the live layers the export's layer set names, as their providers stand at the
request) and transfers it with the raster-export request (§8.9), which also carries the look and view state as they
stood at the request — the sheet, §8.8's view-state switches, the shadow sun and the light step. In its queue's export
class (§8.9) the tile worker runs S13b at the export stop over the list, with the export frame as the visible region; in
`lit` with a `path` sun it bakes the request's crown set when it is not cached and holds it until the export completes;
it rasters every tile with the request's look and view state by §8.8's band-streamed assembly, streams the encoded bytes
and a progress message per band back, and releases the list; the generation worker wraps the VTT scene around the image. A lit export's transient list also
carries what its light reads beyond the frame (§8.8): its band's marks over the frame dilated by one export tile side (its
tiles' first rings) and by the largest light radius, and the city band's casters (§8.1 item 2) over the frame dilated by
§8.4 (c)'s largest window R, which its ring blocks read. That R takes Z from the city band's `surfaceTopCm` the generation
worker keeps (§8.1 item 6) — the document's highest surface, never the transient list's own, whose extent R sets — with
the frame's lowest terrain sample and the export's sun, so a caster beyond the frame's edge still shades it; the casters'
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
* **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares.
  One scene image is ≤ 8 192 px on a side at the declared grid (default 1 square = 5 ft = 1.5 m at 100 px, so ≈ 123 m);
  a larger scope is split into a grid of scenes aligned to grid lines, or the user lowers the pixels per square (≥ 50) —
  the export dialog shows the choice before writing. Output is exact pixels per cell (grid alignment error 0 px per
  cell, O11 g).
* **Fields:** `format` 0.3; `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }`;
  `line_of_sight` — polylines in grid units from building footprint edges (minus door openings), enceinte faces, yard
  walls and hedges from boundary treatments (fences and railings do not block sight), and cliffs; `objects_line_of_sight`
  empty; `portals` — doors at every entrance of a building's entrance set (§2.6; item 29: `main`, `side`, `rear`, `yard` and `service`, each 1.2 m wide) and gates (their opening), each
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }` — a concealed door only for a key
  that admits its use (item 63); `lights` — the model's lights in the scope (item 68): every `LightSource` lit at the
  export's drawn week and every lit window at the export's hour (§10.3), `{ position, range in squares (its radius),
  intensity: 1, color, shadows: true }`, and on the underground layer its shafts — each only where its host draws for
  the export's key (§8.1 item 7), so a concealed part's light and a secret access's shaft or lamp are left out; `environment { baked_lighting: true,
  ambient_light }` with the ambient of the export's light setting; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in, lit by §8.4's CPU reference at the export's light setting (a day or a
  night scene).
* **Per layer:** one file per model layer — the underground one per depth band (II.7.3) — its elevation in the file name
  and in a `plat` extension object; coordinates exact to the grid (O11 g).
* **Per storey (item 28):** a building whose plan rung exists exports one scene for each storey, at that storey's elevation:
  `line_of_sight` from its walls minus their openings, `portals` from every opening and every entrance, the stair core a
  named portal on both storeys' scenes; `lights` — one per lit room (`Room.lit`, §2.6) that draws for the export's key (a concealed room's only for a key that admits it, §8.1 item 7) at its spine summit (§3.8's
  `spine` reader, its sampled medial axis on a downgrade; §8.5), `{ position, range, intensity: 1, color, shadows: true }`
  as the scene-level `lights` above, `range` being the room's diameter in squares and `color` the `lights` role's; the
  walls keep their centimetre positions and only the scene's grid snaps.
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged),
  the same lights, a background image file, grid size and distance units, and journal entries from the gazetteer.
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
  in an iframe on its own origin, speaking through `WindowPostMessageTransport` (item 85 (e)); a worker or a service
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
  `doc.applied { logHead }`, `doc.rejected { reason: 'stale'|'invalid'|'role'|'version', currentLogHead, conflicts? }`,
  `view.changed { patch }`, `entity.selected { id, kind }`, `export.ready { bytes }` or `export.refused { error, message }`
  (an API error of `export`, §11.1's `E_KNOWLEDGE_TIER` among them), `query.result`, `preview.result { result }` (§11.2's
  `PreviewResult`: the dry run of the events for an editing role, nothing committed, the ghost drawn as `live.ghost` in the
  requesting client's view when `view` is `true`; a viewer's answered `refused`),
  `report.changed { entries }` (§11.2's report event; a dossier event's entries name the `changeId` and the reason of the
  change that caused them, so the host sees why — never a request back; item 75). **One way (items 20, 22; J-A20.81).** No PLAT → host message writes,
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
  different ones. Every client applies the same events in the host's order on the same output version, so every client's
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
* **View state.** The document's view keys (§2.9's view section, outside the model hash; each last-writer-wins by
  (Lamport counter, session id)) travel as `view.set` / `view.changed`. The view key `time` is set by `view.set { time }`
  and advanced by the module-tier message `sim.advance { hours }` (§10.3). The per-viewer keys `knowledge` (§2.9; admitted by
  §9.2's table), `elaborate` (§4.1), `storey`, `depthBand` and
  `plotsOnly` (§8.4, §8.5) travel the same way, and so do the light keys `light`, `sunMode`, `sunHeight` and
  `handLantern` (§8.4; item 68) and the drawn week `week` (§4.11; item 67); the pointer that moves the cursor sun and the
  `underlay` image (§9.5) never cross the bridge. **The host's clock (item 67; J-A67.82).** The clock the design calls
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
  host glue (DM, co-DM, player, anonymous; §14, item 85 (f)), never a rule of the model. A viewer's client never emits `doc.changed` (model edits
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
=== REPLACE ### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6) ===
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

**Lighting (item 68; §8.4).** The first map above is composed unlit and its time never includes the light (§8.5; the
laws stand); the surface layers with their pyramids and the light maps of the visible tiles follow centre-out, then the
first ring's heights and the ring blocks (§8.8), lighting the view within the settle bound above (≤ 150 ms for a CITY
view, ≤ 250 ms for a METROPOLIS view, §12.7's bake, first ring and blocks inside it). Blocks are cached per stop, so a
pan pays only for those it exposes; at a new stop they cost ≈ 1 µs per city-band mark the window reaches (§12.7), up to
≈ 85 ms at CITY and ≈ 181 ms at the METROPOLIS target where a low sun over high relief reaches the whole frame from the
1:500 stop (`amendc_repair_rendering_r3_blocks.out` (6)) — PLAUSIBLE until M2b's settle runs time §8.3's mountainous
fixture. **Pre-decided fallback:** a tier whose lit settle misses there draws the view lit once its visible tiles and
first ring are, and adds the blocks after the settle, nearest first, each far shadow appearing when its block arrives
and the blocks' time counted in the view telemetry — the settle's content changes, never a picture. While the pointer moves the cursor sun or the hand lantern, the
global light's term — and, underground, the lantern's — runs every frame on the GPU: ≤ 1 ms of main-thread work per frame
(its uniforms and one draw per visible tile set) inside the ≤ 4 ms above, and the GPU pass ≤ 8 ms per frame at the
reference viewport on the reference machine (rung 1: the global light's traversal of §8.4 (c) per pixel — 17–22 cells at
the median and ≤ 62 at the 99th percentile on the seeded town of `amendc_repair_rendering_r2_traversal.out` (4) at the
1:500 stop — and the lantern's over the ≈ 113 m² its 6 m radius lights, ≤ 0.5 ms of it), ≤ 16 ms per frame for the
low-end device (PLAUSIBLE until M2b), so pan and the moving sun keep ≥ 60 fps and ≥ 30 fps; the moving pointer
re-rasters and re-bakes nothing (§8.8's keys). **Measurement (M2b, in B-CITY's browser runs):** the GPU pass's frame time
while the pointer sweeps the reference and low-end views at every rung, underground with the hand lantern on, and on
§8.3's mountainous fixture under its 15° and 7° suns, whose rays cross the ring blocks. **Pre-decided fallback:** a tier that misses drops one rung of §8.4's ladder (1 → 2 → 3),
fixed at the milestone and reported, and the run repeats.
=== REPLACE ### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14) ===
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
  step's bake runs at the head of §8.4's light-step pass, inside its settle bound. Measured with M2b's moving-sun runs (§8.4),
  where `lit` ships; pre-decided fallback: §8.4's (with a `path` sun the lit programs and the crowns hold the sheet's fixed
  sun, so the library is baked once), reported.
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
  CITY lit takes ≤ 30 s with the view idle (unlit, the ≤ 20 s below). **Measurement (M2b, where the light pass ships with
  `lit`):** the bake and the export pass on METROPOLIS views, on B-CITY's A2 exports and on §8.3's mountainous fixture. **Pre-decided fallbacks:** a
  bake that misses resolves §8.4 (c)'s point-light traversal one pyramid level coarser on every host and in the CPU
  reference alike,
  fixed at the milestone as a declared view shift (§13.3), never a per-device change; an export that misses computes its light pass at half
  resolution, bilinearly upsampled — the reference defined at that resolution on every host, a declared view shift
  (§13.3) — reported.
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
  `compose()` ≤ 1 ms per building median at `wings`, in the derivation pool — for a neighbourhood's buildings on its
  click under `elaborate: 'click'`, streamed to the tiles centre-out, or, under `'view'`, per band request of a tile (§8.6
  and §8.9, by §4.1's policy) — one tile's compositions within 16 ms of pool time, amortised (a tile draws the outline until its
  compositions arrive). A research-side restatement of the Fantasy Manor model (build 890, version 1.0.0), run as a test
  instrument, takes roughly 0.08 ms for each building warm and about 0.6 ms with view geometry included — so the 1 ms
  `compose()` bound has headroom; SCL-13's basis were cold first-build samples (item 59).
* **Plan rung (§2.6; item 28; J-A28.83):** `plan()` at most 5 ms at the median and 20 ms at p95 for one building on the
  reference hardware (§12.1), run by the derivation pool when the user clicks — or, under `elaborate: 'view'`, on the
  tile's band request (§4.1) — one plan for each click, inside a single 16 ms pool frame amortised across clicks; the
  count covers the programme's allocation, the seed clip where the storey's wings overlap (one `tileRings` overlay),
  opening the storey's transient arena (O(seed vertices)), the cuts and the read-back (§3.4). A re-cut — of a `stale`
  plan at its click, or of a stored plan inside the event that changes its
  inputs (§7.3; J-A28.72) — runs as §2.6's chain of such steps along item 28 (f)'s interior ladder: one per band row
  crossed and one per household added or removed, from the as-built plan's row and count for a stale plan (the canonical
  chain) or from the stored plan's, fewer where the cache holds a memoised step (§2.9); its length — at most the band
  set's rows less one (five: the default set has six rows, §2.6) plus the building's capacity less one (none for a building of capacity 0, which houses no household; §2.6) — is known
  before the first open; budgeted at ≤ 5 ms × steps median and ≤ 20 ms × steps p95. PLAUSIBLE until §13.2's T28-8 measures
  it on B-PLAN's fixtures and the stage-3 intake confirms it;
  pre-decided fallback for a class that misses: its wing-local module row doubles (50 → 100 cm), a declared view shift
  (§13.3, a plan being derived data), and the measurement re-runs; a miss at run time is reported, never answered by a
  coarser plan (§12.1).
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
per-worker overlays (§4.1); the generation worker holds the elaboration cache (§8.6, §2.9) and the close-up caches. The lines assume one kernel arena per
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

**The elaboration cache (item 28; J-A28.83).** ≤ 1 KB per building at the `wings` rung and ≤ 4 KB for each storey of a
plan (rings and walls as integer cm, openings and windows as offsets along their walls), LRU-capped at 8 MB per document
in the generation worker — a session line counted on top of each rung's working set, never inside the rung lines above,
and evicting a rung to `absent`, which loses nothing because each rung is derived purely from its building's committed
state (§4.1); its persisted chunks (§2.9) count toward the document's size budget as non-canonical data and are dropped
first when that budget binds. Measured at the stage-3 intake on B-PLAN's fixtures (§13.2); pre-decided fallback: the cap
halves and the persisted chunks keep only the `current` plans of the buildings the view state's `favourites` and view
pins name (an `edited` plan is model data, §2.6, and needs no chunk).

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

**Canvases during a raster export.** The view's need is §8.8's (3P + 7 MB, or 4.25P + 7 MB + Q with the light pass on
rungs 1–2 and 6.5P + 7 MB + Q_f with §8.4 (g)'s full-precision surface, Q and Q_f the pyramids, first ring and ring
blocks; unlit, the reference view 112 MB, the low-end device 43 or
67 MB), whose 7 MB of scratch holds the drawn light step's crown set with the atlases. A raster export's ≈ 15 MB of
band and tile canvases count on top of that need. The crown set an export in `lit` with a `path` sun holds (§8.9) is the
drawn step's set while the view keeps that step and adds nothing; from the first light pass that completes while the
export runs (§8.4) it is one more set, bounded by §8.8's ≤ 5 MB crown-and-atlas scratch, which holds one set with the
atlases (a set is §12.7's 160 sprites). The reference view on the mid tier (112 + 15 ≤ 128 MB) and the low-end
1 366 × 768 view (43 + 15 ≤ 72 MB) hold both, the latter with the extra set too (43 + 15 + 5 ≤ 72 MB); where the sum
passes the tier's ceiling — the low tier at 1 920 × 1 080 (67 + 15 > 72 MB), and the mid tier's reference view once the
extra set is held (112 + 15 + 5 > 128 MB) — the coarser-stop fallback set is dropped for the export's duration (the need
falls to 2P + 7 MB: 47 + 15 = 62 MB on the low tier, 77 + 15 + 5 = 97 MB on the mid tier), and the export dialog refuses
a width whose band does not fit beside the reduced need, naming the widest that does. Lit on rungs 1–2 the need is
4.25P + 7 MB + Q, and 3.25P + 7 MB + Q without the coarser-stop set; such a view bakes no light-step crown set (§8.4's
light steps serve the vector rung), so it holds no extra one: the high tier's lit reference view (DPR 2, 172.75 + 15 =
187.75 ≤ 192 MB) holds both, while the mid tier's (DPR 1.5, 123.25 + 15 = 138.25 > 128 MB) and the low-end 1 366 × 768
view, lit at DPR 1 (68.75 + 15 = 83.75 > 72 MB), drop their coarser-stop sets for the export's duration (99.25 + 15 =
114.25 MB; 56.75 + 15 = 71.75 MB; `amendc_repair_rendering_r3_blocks.out` (5)).

**Measurement and fallback.** Measured per rung in B-CITY's browser runs at M1 (TOWN, CITY) and M2b (METROPOLIS), and at
M2a on the reference 300-edit CITY document under load verification (§16). Pre-decided fallback if CITY exceeds its line
at M1 or M2a: the provenance and lifecycle-history columns leave the working set for the document's on-demand block
(SCL-20's archive) and are decoded only when inspected; if the line is still exceeded at a freeze after edits, that
freeze makes the laziness-contract copy of §3.3 step 1 — L0–L2, every L3 partition, and only the L4 partitions of the
districts the pool derives; if the line is still exceeded, the pool shrinks by one worker per step (identical digests by
construction, §3.3) and the memory test re-runs. If a tier's canvases exceed its ceiling in the scripted pan and zoom
runs, its coarser-stop fallback set is dropped (the need falls to 2P + 7 MB) and a gesture shows the next coarser cached
tiles only where they remain. The document's size budget is §2.9's.

**Lighting (item 68).** The light pass's textures on the main thread — per position the surface layer (1 MB at 512²),
its pyramid (1⁄12 MB) and the light map (¼ MB), and the first ring's heights and the ring blocks — are canvases, counted
by §8.8's canvas budget (4.25P + 7 MB + Q while the pass runs on rungs 1–2, 6.5P + 7 MB + Q_f with §8.4 (g)'s
full-precision surface at 3.25 MB per position and 16-bit pyramids, first ring and blocks; J-A68.89), never in the rung
lines above; the `light` marks' rows sit in the display list's line (≤ 36 B per light,
§8.1 item 6). A lit raster export holds, beside its band canvas, one export tile's window — its float32 surface and pyramid, its
first ring's heights and its block cache, ≤ 30 MB whatever the window's reach (§8.8;
`amendc_repair_rendering_r3_blocks.out` (3)), the surface and first ring released per tile and the cache when the
export completes — and a lit export's transient list carries the city band's casters over its window (at most a whole
city band's, ≈ 1.9 KB per building; §11.1); both count with the export-time peak above. Measured with the canvas
runs at M2b; pre-decided fallback: the tier's rung drops (§8.4's ladder) or its tile DPR steps down, as §8.8 states.
=== J-ROWS ===
| J-A68.85 | the fallback ladder: the GPU pass at the tile DPR → with a half-resolution global term → the vector pass; chosen per tier at app start, lowered on a lost context or three frames over budget, never raised mid-session; a tier missing §13.4's tolerance first takes a full-precision surface — float32 heights and normals, its pyramids, first ring and ring blocks in 16-bit centimetres — the traversal unchanged; the bake's fallback — its point lights' traversal one pyramid level coarser — a declared view shift on every host; exports always on the CPU reference; `hatched` on its vector prism pass by design | §8.4, §8.8, §12.7 |
| J-A68.89 | the canvas need with the light pass is 4.25P + 7 MB + Q, Q = P ÷ 12 + (2(a + b) + 4) ÷ 3 + B for the pyramids, the first ring and the ring blocks, B the blocks' bound (3.75 MB at tile DPR 1, 4.25 at 1.5, 4.75 at 2 and 5.5 at 3); at full precision 6.5P + 7 MB + Q_f, Q_f = 2Q, every pyramid, first-ring and block byte doubled; the tile DPR steps down until it fits, else the vector rung | §8.8, §12.8 |
| J-A68.90 | the global light's shadow window a world distance — R = (Z − z) ÷ (m − σ) from the document's highest surface (`DisplayList.surfaceTopCm`), the cursor sun's at most its distance to G, the ray stopping at the list's bounds — held as the first ring, per position from level 0, and beyond it as ring blocks: world-aligned squares of 2^m × 2^m positions at the largest order whose every position lies in ring 2^m + 1 or beyond, each from the level the floor needs at its nearest position, ≤ 128² cells whatever its order, their number growing with the logarithm of the window and their memory within the canvas budget's B; a far caster's shadow lengthened by at most the floor cell's diagonal; a lit export computed tile by tile over each tile's own first ring and blocks with a 16-MB block cache (≤ 30 MB whatever its reach); over the one-tile ring, full-resolution rings, every position held out to R (growing with the window's square), positions held to a fixed ring plus a frame-wide far field (≈ 28 MB at the cap's frame at the 1:500 stop), a cap on R or a fade | §8.4 (c), §8.8, §8.9, §12.5, §12.7, §12.8 |
| J-A68.92 | the hand lantern evaluated per frame on the GPU as a point light by §8.4 (c)'s law and traversal over its radius, never baked; no lantern in an export or still; the CPU reference evaluating it at a pointer point a test gives, so §8.3's hand-lantern row holds the GPU to it | §8.4 (f), §8.3, §12.5 |
| J-A101.86 | a bridged host's clerk previews through the bridge messages `preview { events, view?: boolean }` and `preview.result`, `true` drawing the ghost as `live.ghost` in that client's own view (a bridged host holds no `ViewHandle`), the result §11.2's `PreviewResult`, a union whose `refused` arm carries its reason and nothing computed | §11.3, §11.2 |
| J-A68.93 | the ring blocks and the window's Z (`surfaceTopCm`) read the city band, which S14 makes carry every caster — a tree line's `instances` mark with an empty city-band rank subset, a footprint with its building's heights — so every view and export reads one caster set held whole, the generation worker keeping its Z for exports; the first ring read from the view's band by a band request; over rastering far blocks from the view's band (a band request for every district the window reaches) or taking an export's Z from its own transient list | §8.1 items 2 and 6, §8.8, §8.9, §11.1 |
| J-A68.94 | every one-byte height — a surface layer's, a pyramid's, a ring block's — on a square-root scale to the greater of 160 m and its own range above its datum, carried beside the datum; over clamping at 160 m, which under-reads a steep tile and cuts the shadow of what it clamped | §8.8 |
=== RATIONALE-A ===
| J-A68.85 | Chose a three-rung fallback ladder — the GPU pass at the tile DPR, the GPU pass with a half-resolution global term, the vector pass (projected shadows, night roles and glow sprites) — chosen per hardware tier at app start from the canvas budget and the measured frame time, lowered at run time on a lost GPU context or three consecutive frames over budget and never raised mid-session, with every export on the CPU reference and `hatched` on its prism pass by design, over refusing the lit view to devices without a capable GPU or letting the rung flicker with load, because the owner's day and night views must reach every device the base supports and a picture that changes rung under a moving pointer would read as a defect; each rung is counted, never an error, and never a model change. Restated in the repair round (VRC-07, VRC-08): a tier whose GPU pass misses §13.4's tolerance first transfers its surface at full precision (13 B per pixel, counted by §8.8 as 6.5P + 7 MB + Q_f) with the traversal unchanged, and only then draws rung 3, over coarsening that tier's traversal, because the reference resolves the cells of §8.4 (c)'s one law and a GPU resolving other cells would be held to a picture it does not compute; and a light-map bake that misses at M2b resolves its point lights' traversal one pyramid level coarser on every host and in the CPU reference alike, a declared view shift (§13.3), over a per-device change, because a reference that varied by device could not be byte-identical on the five engines. Restated in repair round 3 (VRC2-03): at full precision the pyramids, the first ring's heights and the ring blocks travel in 16 bits too — whole centimetres above each one's datum, rounded up, the step widening only past a 655.35 m range — over keeping them in one byte, because the reference reads its pyramids in float32 while a byte's square-root step (≈ 0.67 m at 45 m) moves a far caster's shadow tip by that step × cot(altitude) — ≈ 10 px at the 1:500 stop under the fixed sun and ≈ 38 px under a 15° sun (verify-rendering-r2's recomputation) against §13.4's ≈ 262 pixels per 512² tile — so the fallback could not pass and every tier would end on rung 3, against J-A68.81's lit default; 16 bits put the GPU within 1 cm of the reference for 2 B per cell (Q_f = 2Q: the high tier's reference view lit at DPR 1.5 in 191.5 MB, the mid tier's at DPR 1 in 106.5 MB, `amendc_repair_rendering_r3_blocks.out` (5)); the alternative, one byte kept and §13.4's bar narrowed to the pixels whose casters resolve at level 0 of a visible tile, would leave every far shadow unchecked (§8.4, §8.8, §12.7; item 68; F-LIGHT is §5.2's; restated in repair round 2 with the traversal, VRC1-02, VRC1-13, and in repair round 3, VRC2-03). |
| J-A68.89 | Chose to count the light pass's textures — per position a 1 MB surface layer with its 1⁄12 MB max-height pyramid and a ¼ MB light map on the main thread, and the first ring's heights and the ring blocks the global light's window reaches (J-A68.90) — in the canvas budget as 4.25P + 7 MB + Q, Q = P ÷ 12 + (2(a + b) + 4) ÷ 3 + B, B the blocks' bound (3.75, 4.25, 4.75 and 5.5 MB at tile DPR 1, 1.5, 2 and 3), stepping the tile DPR down until it fits and drawing the vector rung where it does not fit even at DPR 1, over holding the DPR and dropping to the vector rung first, because the owner's default view is the lit one and a lit picture at DPR 1.5 reads better than an unlit one at 2, while the tier ceilings of J-R22 stay as they are (worked: the reference view lit at DPR 2 on the high tier, 172.75 MB, and at 1.5 on the mid tier, 123.25 MB; the low-end 1 366 × 768 view lit at DPR 1, 68.75 MB; the 1 920 × 1 080 view on the vector rung); restated in repair round 2 (VRC1-01), because the rings the pass reads had not been counted; restated in repair round 3 (VRC2-01, VRC2-03), because the rings' "≤ 3 MB whatever the window" held only to 64 rings and grew with the relief while the blocks' B holds for every window any frame allows (`amendc_repair_rendering_r3_blocks.out` (2)), and because the full-precision surface now carries 16-bit pyramids, first ring and blocks, counted as 6.5P + 7 MB + Q_f, Q_f = 2Q (§8.8, §12.8; item 68, ruling 9). |
| J-A68.90 | Chose to measure the global light's shadow window in world distance — R = (Z − z) ÷ (m − σ), Z the document's highest surface (`DisplayList.surfaceTopCm`), m the ray's slope (max(tan altitude, ⅛) for the fixed and path suns, K05's cap; toward G for the cursor sun, R there at most \|P − G\|), so the ray runs until it clears everything by its penumbra — and to hold what that window reaches as height pyramids only, the first ring from level 0 and every farther position in a ring block (restated below), counted in the canvas budget, with a lit export computed tile by tile over each tile's own window, over three alternatives: the one-tile ring the design had, because a caster beyond it was never sampled and every shadow longer than a tile side ended on a tile-grid line (a 45 m tower at the 1:500 stop cut at the 33.9 m tile line, `amendc_verify_rendering_r1_ring.out` (1)), against "a shadow crosses tile edges seamlessly"; full-resolution rings out to R, as the verifier proposed, because a 15° path sun over a 45 m tower reaches six rings at the 1:500 stop, whose heights alone (≈ 96 MB at the reference view) pass every tier's ceiling, so the rung would drop — for the session, since a rung is never raised — whenever the sun sinks; and a fade of the shadow over the ring's final quarter, because a ring spans a set number of pixels, so a shadow's length would change with the zoom stop, against J-A68.84's fixed and path suns whose lengths never depend on zoom. The floor makes a far caster's shadow at most √2⁄128 (≈ 1⁄90) of its distance longer — the floor cell's diagonal, which a ray crossing it corner to corner runs (1.33 × the cell's side under a 15° diagonal sun, `amendc_verify_rendering_r2_diag.out`; +13 px at 169 m against a 16-px cell under an axis-aligned sun, `amendc_repair_rendering_r2_traversal.out` (1)) — never shorter, holds the start on every tile-grid offset, and keeps every tier on the DPR it had (J-A68.89's worked cases); the export's former float32 band buffer (≈ 43 MB at A2 300 dpi plus an unquantified margin) gives way to the per-tile window, which a band-wide buffer out to R could not bound. Restated in repair round 3 (VRC2-01, VRC2-02, VRC2-04): beyond the first ring every position is held by a ring block — the world-aligned square of 2^m × 2^m positions at the largest order whose every position lies in ring 2^m + 1 or beyond, held from the level the floor needs at its nearest position, ≤ 128² cells whatever its order, its levels continuing above one cell per tile — and the ray ends at the list's bounds, over holding every position out to R, over positions held to a fixed ring j₀ = 16 with a whole-frame far-field pyramid beyond it, and over a cap on R: every position held grew with the square of the window and the window with the relief — 5 440 positions per view and 11 448 per export tile for 300 m of relief under a 15° sun at the 1:500 stop, 5.44 MB and a 48.3 MB export window for 3 000 m under a 7° sun (`amendc_verify_rendering_r2_rings.out`), each position a raster job and a transfer no budget counted; positions to j₀ = 16 are still 1 408 raster jobs at the reference view, and a far field over the whole frame from level 6 holds 4.5 MB at CITY and 28 MB over the frame of the population cap at the 1:500 stop (56 MB in 16 bits); a cap on R leaves a far hill's shadow out of the view at the fine stops while a coarser stop, its tiles larger, draws it — a shadow present or absent by zoom, against J-A68.84; the blocks partition the window with a count growing as its logarithm — ≤ 326 held at the reference view and ≤ 437 at any view up to DPR 3 for a window reaching the whole frame of any rung — within B (4.75 MB at DPR 2), and where a cell is held never changes which cell the law reads or its value (`amendc_repair_rendering_r3_blocks.out` (1), (2), (4)); a block is keyed by its order and level, so a held block serves a position only where the floor is at or above its level and a pan never reads a coarser one; a lit export keeps its blocks in a 16-MB cache so each is computed once, its window ≤ 30 MB whatever its reach, where the rings' ≈ 21 MB held only to 64 rings (receipt (3)) (§8.4 (c), §8.8, §8.9, §12.5, §12.7, §12.8; item 68; repair round 2, VRC1-01, VRC1-12; repair round 3, VRC2-01, VRC2-02, VRC2-04). |
| J-A68.92 | Chose to evaluate the hand lantern per frame on the GPU — a point light by §8.4 (c)'s law and traversal over the pixels within its 6 m radius, beside the global light's term — and to draw none in an export or still, over baking it into the light map, because the lantern moves with the pointer and a moving pointer invalidates nothing cached (§8.8), so a baked lantern would never move, while an export or still has no pointer; its cost is ≤ 0.5 ms of the GPU pass's frame (≈ 113 m² lit), PLAUSIBLE until M2b; restated in repair round 3 (VRC2-06): the CPU reference evaluates the lantern at a pointer point a test gives it, by the same law and traversal, and §8.3's hand-lantern row holds the GPU to it and checks its 6 m reach and its absence from exports, over leaving a GPU-only term unchecked, because J-A68.82 makes the reference the definition of the lit picture and a term no reference computes could drift from its law unseen (§8.4 (f), §8.3, §12.5; item 68; repair round 2, VRC1-17; repair round 3, VRC2-06). |
| J-A101.86 | Chose to give the bridge a `preview { events, view?: boolean }` message answered by `preview.result { result }` — an editing role's dry run, a viewer's refused — and to type `PreviewResult` as a union whose `refused` arm carries its reason and nothing computed, over leaving a bridged host's clerk without a preview or keeping the lists required on a refusal, because SettlementForge's clerk speaks through the bridge (its configuration is an iframe on its own origin), and item 101 (b)'s proposals are previews drawn as a ghost before the user accepts them, while a refused preview computes nothing, so its lists cannot be required; restated in repair round 3 (VRC2-07): `view` is a boolean, `true` drawing the ghost as `live.ghost` in the bridged client's own view, over the in-page call's `ViewHandle`, because a bridged host holds no handle to the module's view, which lives in the module's own iframe, so the message can only say whether that view draws it (§11.3, §11.2; item 101 (b); repair round 2, VRC1-08, VRC1-18; repair round 3, VRC2-07). |
| J-A68.93 | Chose that the ring blocks and the window's Z (`DisplayList.surfaceTopCm`) read the city band's list, which S14 makes carry every caster of §8.4's *Shadow casters* — a tree line's `instances` mark with an empty city-band rank subset, so that band still draws none of its crowns, and a building's footprint with the building's `Heights`, its max over its wings — while the first ring reads the view's band through a band request like a visible tile's, and the generation worker keeps the city band's Z beside its index for exports, over rastering the blocks from the view's band or taking an export's Z from its own transient list, because the tile worker holds the city band for the whole document and a finer band only for the districts a request named, so blocks from the view's band would need a band request — at the finer bands the derivation pool's compositions too — for every district a low sun's window reaches, the whole town on a mountain site, while blocks rastered from whichever band happened to be held would change their shadows when a pan brought a district in and differ from an export (verify-rendering-r2's VRC2-02); a block's cells are greatest heights at a level of at least four texels, where the city band's casters, once they include the tree lines and carry each building's highest wing, bound every finer band's (§8.3's mountainous row checks it); and an export's transient list is built for the frame dilated by the window whose Z it would set, so a caster taller than anything inside that list — a keep, a hill beyond the edge — would be left out and the export would differ from the view (VRC2-05) (§8.1 items 2 and 6, §8.8, §8.9, §11.1; item 68; repair round 3, VRC2-02, VRC2-05). |
| J-A68.94 | Chose to write every one-byte height — a surface layer's, a pyramid's, a ring block's — on a square-root scale to the greater of 160 m and its own range above its datum, rounded up to the metre and carried beside the datum, over the fixed 160 m scale whose taller surfaces clamped and were counted, because a clamped height is read lower than it stands, so a steep tile at a coarse stop, or a block spanning a mountain, would cut the shadow its top casts, while §4.2 S1 calls a 3 000 m relief ordinary; the scale stays 160 m, with its ≈ 0.2 m steps at 5 m, wherever a tile's surface stays within 160 m of its datum — every tile at the fine stops but a cliff's — and a wider scale coarsens only the steps of the tile or block that needs it, the GPU's rounding bounded by §13.4's tolerance and its full-precision fallback as before (§8.8; item 68; repair round 3, VRC2-01). |
=== END ===
