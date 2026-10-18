## §2 Scope and product shape

### 2.1 STAGE 1 — the base

One library, one document format, three front-ends over it (a one-click web app, a headless CLI for benchmarks and goldens, an embed bundle). Size ladder TOWN / CITY / METROPOLIS requested as population, area or building count (O6). The one-click path: `generate({seed})` → a viewable town in < 1 s on reference hardware, ink style, walls on at TOWN and above, coast/river by the site model's request defaults, curved district labels, scale bar, compass. Every improvement ships behind defaults (`docs/IMPROVEMENTS.md` §4 R8).

### 2.2 STAGE 2 — the district → neighbourhood interface (designed now, built later)

The base must already carry, per district, the **S1 boundary contract** (`docs/IMPROVEMENTS.md` §3.2 S1): a boundary polygon with holes whose edges are typed (shared street with centreline, width, class and the frontage line on both sides; wall with gates; water quay or bank; open field; cliff; sky edge), portals (position, bearing, width, class), the district's context vector, the prosperity field values, and the plot lines and alleys the base has already laid. The neighbourhood generator's contract is therefore:

```ts
interface NeighbourhoodRequest {
  district: DistrictId;                 // stable id; the close-up is a *refinement*, never a re-roll
  boundary: TypedBoundary;              // polygon with holes; each edge carries a BoundaryEdgeKind
  portals: Portal[];                    // every portal MUST be connected; no new street ends on a shared edge
  context: DistrictContext;             // type, venue mix, prosperity samples, terrain samples, water, walls
  laid: { blocks: BlockId[]; plots: PlotId[]; alleys: WayId[] };   // the base's own fabric at city LOD
  subSeed: StreamKey;                   // derived from the district id (§7)
  lod: 'neighbourhood';
}
interface NeighbourhoodResult {         // additive: refines existing entities, adds detail entities
  refined: EntityPatch[];               // building compositions, courts, chimneys, wells, trees, local names
  seams: SeamReport;                    // portal connection 100 %, Hausdorff 0 on shared entities
}
```

Consistent seams follow from construction: the base generates every shared edge once (streets, walls, water are entities of the city graph), the close-up reads them and may only *refine* inside its faces. Shared seeds: the district's `StreamKey` is derived from the district id, so the close-up is byte-stable across sessions and untouched by other districts' edits (§7). One style system: the close-up adds marks at the `neighbourhood` LOD band of the same display list; the city-LOD footprint hash is unchanged (§9). Stage-2 readiness is *measured on the base itself*: 100 % of districts of every B-CITY city carry a complete S1 contract in the schema before any close-up generator exists (`docs/IMPROVEMENTS.md` §5.5).

What the base carries for S2–S6 (interface depth only): a `DistrictContext` rich enough for context templates (S4); per-LOD detail budgets in the style sheet (S5); per-district reroll with locks as an edit event (S6); water/walls/slope as constraints available inside a boundary (S2). The standalone no-portal mode (a lone hood, or a sky island) is the same request with `portals: []` and `context.sky = true`.

### 2.3 Stage 3 and the add-on hooks (carried, not built)

* **Building generator interface** (stage 3): `buildBuilding(plot, accessEdges, contextVector, assignment?, subSeed) → Composition` with LOD outline → wings/roofs → rooms; the base ships a trivial outline builder (one footprint per site-plan slot). `manor.md` §9 supplies the later grammar (a path of wing segments, hip blocks, towers, class picker) — its inputs are exactly the plot polygon, the access edge, the class and a sub-seed, which the base's plot record already carries.
* **Heights** on every building, wing, tower, roof (floors, eave, ridge, tower height) from class tables; a `shadow` layer hook in the display list driven by height and a sun vector (VG/NG/FM all shade; FM's bitmap shadow costs ≈ 90 % of its render — `manor.md` §9 item 7 — so ours is a vector prism as NG does, `profile-neighbourhood.md` §3.7).
* **Layers**: `underground | ground | sky` on every entity and mark, with z-order, elevation and per-layer toggles/exports; drainage queryable from the terrain (sewers); the neighbourhood request accepting an arbitrary boundary with `sky` context; organic oval outlines from the coast routine (islands).
* **Assignment**: an input with precedence and drift bounds at three granularities and a placement-solver interface (§8.4).
* **Evolution**: lifecycle on every entity, an event log, epoch sub-streams, incremental stages, conversions as geometry operations (§5.8, §8.5).

### 2.4 VILLAGE — what the base leaves open, and the not-precluded check

Not designed. Checks (from `docs/IMPROVEMENTS.md` §3.3 V1–V3, verified against this design): the backbone can be a single through-road or dead-end with partial driveways because destinations and stage counts are request data (§5.3); the site-plan class tables include cottage, farmstead and detached-in-yard (§5.6); the size ladder is a data table open below TOWN and the default request at small sizes is not a walled circle (walls are a rule keyed on size class); model time is near-linear in building count (§13); terrain-and-water-as-one-picture is the base's own site model (§5.1); VG's independent tree stream is a keyed sub-stream (§7); a palisade is a wall class with a cheap trace (§5.5). Nothing in the schema assumes walls, districts of more than one block, or a plaza. The village's own ladder, tracker-style organic roads and the VG rendering preset are *not paid for* here.

### 2.5 Tech stack (with reasons)

| choice | decision | why | rejected alternatives |
|---|---|---|---|
| language | **TypeScript** (strict), ES2022 modules, no DOM in `core/` | one language for kernel, generator, renderer and app; browser-first by owner default; the reference evidence is JS-shaped (call censuses) so budgets transfer | Rust→Wasm core (better numerics, but two languages and slower iteration on a design that will be tuned by eye and by corpus; kept as an optional per-module hot path — the kernel API is designed so `predicates`, `offset` and `skeleton` can be swapped for Wasm without changing callers); Haxe (the references' tool, no advantage for us, weaker typing/tooling); C++/Emscripten (no) |
| runtime targets | browser (main thread UI + **Web Worker** generation), Node ≥ 20 (CLI, tests, goldens), embed bundle (iframe or ESM) | headless core reproduces the UI's model hash (O11 f); workers keep the one-click path responsive; Node runs B-CITY | server-side generation like FTG (rejected: the owner wants an embeddable library; FTG's ≈ 3–7 s server round trip is the thing to beat) |
| numerics | integer centimetres (int32) in the model, float64 transient, robust predicates | §4 | — |
| rendering | **Canvas2D** default (every reference's look is provable there), **SVG** exporter from the same display list, **WebGL2** optional back end for instanced hatching/vegetation at METROPOLIS, PNG tiles via OffscreenCanvas | MFCG proves 46 000 fills at 590 uploads is fine when cached per group; NG proves per-primitive canvases are not | WebGPU-only (too new for the embed target); three.js as the primary (FTG's choice; textures and lighting are one *style*, not the architecture) |
| text | HTML canvas text with a halo pass; fonts bundled under OFL (IM Fell family is SIL OFL; Cinzel is OFL) | matches the recorded looks | SDF text (FTG) — later, if WebGL back end needs it |
| build/test | pnpm workspaces monorepo, Vite (app), esbuild (lib), vitest (unit/property), Playwright (visual regression), a `bench/` package that runs B-CITY and writes statistics records | — | — |
| data | JSON documents; optional compact binary twin (CBOR or protobuf-like varint zig-zag ints — FTG's economy, `_critic-ftg.md` F1) | 593 KB for a 2 798-building city with its population is the bar (`docs/IMPROVEMENTS.md` O11 restraint) | — |
| dependencies | permissive licences only (§18); every third-party geometry routine behind our own interface | clean-room + swap-ability | — |

---

## §3 Domain model and schemas

### 3.1 Principles

1. **One spatial truth**: a planar subdivision (half-edge DCEL) in integer centimetres per layer; every linear feature (street, alley, lot line, wall, water outline, map border, field boundary) is a typed edge chain of it; every area (district, block, plot, court, yard, field, water body) is a face or a face union. FTG's payload already works this way for streets, lot outlines, walls, water and the border (`_critic-ftg.md` F9/F10/F15, CONFIDENCE C4) — the base generalises it to *every* feature and keeps faces as first-class records with ids instead of re-walked cycles (O3).
2. **Stable hierarchical ids** minted from the parent id + stage counter, never a list position (O2). Ids survive regeneration and edits; a regenerated entity keeps its id if its *anchor* (frontage edge for a plot, footprint centroid cell for a building, junction pair for a way) is unchanged, else it is superseded with a `supersedes` link (EVO history).
3. **Provenance on every derived value**: which rule table, version and inputs produced it (needed by the corpus phase and by the "one code path, checked two ways" criterion, O18 g).
4. **Lifecycle on every entity**: `generated | edited | pinned | assigned | built | altered | converted | demolished`, plus an epoch stamp.
5. **Layers** on every entity: `underground | ground | sky`, with `z` (order) and `elevation` (m), and per-layer visibility/export.
6. **Metres everywhere**; storage int32 cm; a schema lint refuses a length field without a unit (O6 a).

### 3.2 Entity catalogue (TypeScript shape; the JSON schema is generated from these types)

```ts
type Id<T extends string> = `${T}:${string}`;            // e.g. "plot:s7.d3.b12.p4"
type Cm = number;                                          // integer centimetres
type M = number;                                           // metres (derived views only)
type Layer = 'underground' | 'ground' | 'sky';
type Lifecycle = 'generated'|'edited'|'pinned'|'assigned'|'built'|'altered'|'converted'|'demolished';

interface Provenance { stage: string; rule?: string; tableVersion?: string; inputs?: Record<string, unknown>; streamKey?: string; }
interface EntityBase<T extends string> {
  id: Id<T>; kind: T; layer: Layer; z: number; elevation?: Cm;
  lifecycle: Lifecycle; epoch: number; supersedes?: Id<T>;
  provenance: Provenance; tags?: string[]; name?: string;
}

// --- terrain & water ---------------------------------------------------------
interface Terrain extends EntityBase<'terrain'> {
  originCm: [Cm, Cm]; cellCm: Cm; cols: number; rows: number;       // resolution set in metres, not a fixed 128²
  heightMm: Int32Array;                                              // rows*cols, millimetres above datum
  flowDir: Uint8Array; flowAcc: Float32Array; outfalls: [number, number][];   // drainage, queryable (sewer hook)
  seaLevelMm: number; features: SiteFeature[];                       // hill | spur | valley | terrace | cliff | ravine
}
type WaterKind = 'sea'|'lake'|'river'|'tributary'|'pond'|'moat'|'estuary'|'harbour'|'canal';
interface WaterBody extends EntityBase<'water'> {
  waterKind: WaterKind; face: FaceRef;                    // area as a face union of the ground layer
  course?: WayId;                                          // rivers: the centreline way, with widths per vertex
  flowDir?: 1|-1; bankKinds?: ('beach'|'rock'|'cliff'|'quay'|'marsh')[];
}

// --- planar subdivision ------------------------------------------------------
interface Vertex { x: Cm; y: Cm; }                         // arena-indexed
interface HalfEdge { v: number; twin: number; next: number; prev: number; face: number; chain: Id<'way'|'wall'|'lotline'|'shore'|'border'|'fieldline'>; }
interface Face { id: string; outer: number; holes: number[]; owner?: Id<'district'|'block'|'plot'|'court'|'yard'|'field'|'water'|'green'|'plaza'>; }
type FaceRef = { faces: string[] };                        // face unions keep member faces for EVO splits

// --- ways (streets, alleys, lanes, quays, bridges) ----------------------------
type WayClass = 'through'|'primary'|'secondary'|'lane'|'alley'|'culdesac'|'track'|'quay'|'bridge'|'ford'|'pier'|'path';
interface Way extends EntityBase<'way'> {
  wayClass: WayClass; edges: number[];                     // ordered half-edges of the centreline chain
  widthCm: Cm[]; surface: 'paved'|'cobble'|'dirt'|'plank'; curvatureLimit: number;
  from?: Id<'gate'|'bridge'|'plaza'|'harbour'|'junction'|'external'>; to?: typeof this.from;
  stage: number;                                           // growth epoch that created it (EVO)
  slope?: number[]; flowToward?: 'from'|'to';              // sewer hook: drainage direction along the way
}

// --- districts, blocks, plots, buildings ------------------------------------
interface District extends EntityBase<'district'> {
  districtType: string; venueMix: Record<string, number>;   // data-table keys, our own vocabulary
  face: FaceRef; contract: S1Contract;                     // stage-2 boundary contract (§2.2)
  character: CharacterVector;                              // wealth, density, age, planned/organic, greenery, fortification
}
interface Block extends EntityBase<'block'> { district: Id<'district'>; face: FaceRef; depthClass: string; }
interface ContextVector {                                  // read by class rules, granularity law, greenery, assignment
  areaM2: number; shape: { obbW: M; obbD: M; compactness: number; reflex: number };
  frontage: { lengthM: M; wayClass: WayClass; wayId: Id<'way'> }[];
  districtType: string; venueMix: Record<string, number>;
  prosperity: number; prosperityBand: string;             // continuous value + banded class (O18)
  distM: { centre: M; plaza: M; market: M; gate: M; wall: M; water: M; harbour?: M };
  upstream: number; slope: number; aspect: number; damp: boolean; floodRisk: number; upwind: boolean;
  assignment?: Id<'assignment'>; terrainCell: number;
}
interface Plot extends EntityBase<'plot'> {
  block: Id<'block'>; face: FaceRef;
  owner?: Id<'household'|'business'|'institution'>; use: string;
  frontageEdges: number[]; accessEdges: number[];         // half-edges on ways (or on a court that has access)
  depthCm: Cm; partyWalls: { edge: number; with: Id<'plot'> }[];
  context: ContextVector; sitePlan: SitePlan;
  buildings: Id<'building'>[]; yard: YardPart[];          // 0..n footprints + typed yard partition
  members?: Id<'plot'>[];                                  // merged plots keep member ids (EVO split restores them)
}
type YardKind = 'yard'|'garden'|'court'|'orchard'|'midden'|'pen'|'vacant'|'formal-garden'|'forecourt';
interface YardPart { kind: YardKind; face: FaceRef; }
interface SitePlan { arrangement: 'row'|'compound'|'detached'|'hovel'|'institution'; coverage: number; slots: BuildingSlot[]; ruleRow: string; }
interface BuildingSlot { role: string; footprintHint: Polygon; entranceEdge: number; }

interface Heights { floors: number; eaveCm: Cm; ridgeCm: Cm; towerCm?: Cm; }
interface Building extends EntityBase<'building'> {
  plot: Id<'plot'>; footprint: Polygon; heights: Heights;        // heights: owner ruling — stored even if never drawn
  buildingClass: string; use: string; roof: RoofSpec; entrance: { edge: number; at: Cm };
  composition?: Composition;                                     // stage 3: wings/blocks/roofs/rooms, lazily generated
  compositionSeed: StreamKey; assignment?: Id<'assignment'>; driftBounds?: DriftBounds;
}
interface Composition { lod: ('outline'|'wings'|'rooms')[]; wings: Wing[]; towers: Tower[]; courts: Polygon[]; rooms?: Room[]; }
interface Wing { footprint: Polygon; heights: Heights; roof: RoofSpec; }
interface Tower { centre: [Cm, Cm]; radiusCm: Cm; heights: Heights; roof: RoofSpec; }
type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'dome'|'cone'|'skeleton'; ridgeAxis?: number; pitch?: number; material?: string };

// --- fortification -----------------------------------------------------------
interface Wall extends EntityBase<'wall'> { enceinte: number; edges: number[]; thicknessCm: Cm; walkCm: Cm; kind: 'stone'|'palisade'|'earthwork'; setbackCm: Cm; }
interface Gate extends EntityBase<'gate'> { wall: Id<'wall'>; way: Id<'way'>; vertex: number; kind: 'gatehouse'|'postern'|'watergate'; }
interface Tower_ extends EntityBase<'tower'> { wall: Id<'wall'>; vertex: number; radiusCm: Cm; heights: Heights; }
interface Castle extends EntityBase<'castle'> { plot: Id<'plot'>; keep: Id<'building'>; bailey: FaceRef; wall: Id<'wall'>; siteScore: number; }

// --- land use, greenery, furniture -----------------------------------------
type LandUseKind = 'arable'|'strip-field'|'meadow'|'pasture'|'commons'|'orchard'|'garden'|'park'|'coppice'|'wildwood'|'quarry'|'claypit'|'marsh'|'green'|'churchyard'|'plaza'|'market';
interface LandUse extends EntityBase<'landuse'> { landUseKind: LandUseKind; face: FaceRef; owner?: Id<'household'|'institution'|'commons'>; furrowAxis?: number; density?: number; }
interface TreeArea extends EntityBase<'trees'> { face: FaceRef; density: number; ecology: 'wood'|'orchard'|'avenue'|'garden'|'scatter'; }   // instances derived at render from the entity seed, never stored
interface Label extends EntityBase<'label'> { target: Id<any>; text: string; spine?: Polyline; anchor?: [Cm, Cm]; tier: number; pinned?: boolean; hidden?: boolean; }
interface Furniture extends EntityBase<'furniture'> { kind: 'scalebar'|'compass'|'grid'|'title'|'legend'; placement: 'auto'|[number, number]; }

// --- entities (content) -------------------------------------------------------
interface Household extends EntityBase<'household'> { home: Id<'building'>; members: Id<'person'>[]; wealth: number; }
interface Person extends EntityBase<'person'> { household: Id<'household'>; job?: Id<'business'|'institution'>; derivedFrom: StreamKey; pinned: boolean; /* details lazily derived, stored only when pinned/edited */ }
interface Business extends EntityBase<'business'> { plot: Id<'plot'>; trade: string; workers: Id<'person'>[]; }
interface Institution extends EntityBase<'institution'> { plot: Id<'plot'>; institutionKind: string; }
interface Faction extends EntityBase<'faction'> { members: Id<'person'>[]; turf: Id<'district'>[]; }
```

### 3.3 The document (serialisation)

```ts
interface Document {
  schemaVersion: string; generatorVersion: string;
  blueprint: Blueprint;                    // seed, parameter vector, intent, character, circumstances, assignments (§8)
  edits: EditEvent[];                      // ordered, on stable ids (§8)
  entities: Record<string, EntityBase<any>>;   // by id, layer-tagged
  subdivisions: Record<Layer, DcelSnapshot>;   // vertex arena (cm), half-edges, faces
  fields: { prosperity: RasterField; density: RasterField; };       // editable layers
  tables: TableRefs;                       // versions + user overrides of every rule table (§8)
  report: GenerationReport;                // §6
  stats: StatisticsRecord;                 // §14 (per-generation metrics with provenance)
}
```

Formats: **native JSON** (canonical, human-diffable, versioned with migrations); **binary twin** (same schema; varint zig-zag int32 coordinates centred on the settlement centre, as FTG — `_critic-ftg.md` F1 — for the embed and for sharing); exports are views (§12). Migrations are functions `vN → vN+1` over the document; the edit log migrates by id maps; golden documents per schema version are kept.

### 3.4 Alternatives for the spatial truth model (recorded, rejected)

1. *Shared-identity point topology* (2017 MFCG): rejected — aliasing bugs, no tolerance merge, O(n) adjacency (`os-geometry.md` §5).
2. *Polygon soup with per-feature arrays and no shared topology* (VG, NG): rejected — seams, planarity and faces must be re-derived for every edit; FTG's "two intersections at one position" bug class (`_critic-ftg.md` F13 note) is exactly what a soup cannot prevent.
3. *Quad-dominant base mesh with painted attributes* (Urban Places, `watabou-extra-b.md` T23): rejected as truth — area-filling, unrecovered construction — but its "attributes on a persistent mesh" idea is kept as face ownership on the DCEL.
4. *One DCEL for all layers*: rejected — sky and underground geometry must not cut ground faces; one DCEL per layer with cross-layer references (an island's shadow footprint, a sewer's outfall) is cheaper and safer.

