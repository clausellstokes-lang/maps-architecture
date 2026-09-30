## §14 Testing and verification

| layer | what | how | gate |
|---|---|---|---|
| kernel property tests | predicates (sign symmetry, transitivity on collinear sets), DCEL (Euler, twin/next/prev cycles, face walk closure), booleans (area identities A∪B + A∩B = A + B, idempotence, snap stability), offset (inset then outset ⊆ original), skeleton (arcs inside the polygon, hole-aware, ridge length monotone in area), Poisson (min distance ≥ r), noise (range, determinism) | `fast-check`-style generators + the B-FUZZ corpus (10⁶ random concave/holed/thin/near-collinear/snapped polygons per primitive) | 0 crashes, 0 hangs, 0 self-intersections, 0 slivers below declared minima |
| per-stage invariants | §6 suite run after every stage | in CI on B-CITY (1 000 seeds × 4 water configs × 3 sizes) and in the app | hard violations = 0 per 1 000 cities; fallback ladder uses reported |
| determinism | model hash identical across Node x86/arm64 and three browsers; perturbation tests (change the naming grammar → 0 geometry changes; add a decoration layer → 0 other entities change; reroll one block → nothing outside it) | CI matrix | 100 % |
| seed goldens with a declared-shift protocol | a fixed seed set per size class; per-stage hashes + statistics records committed; a release that legitimately shifts a stage must name the cause in the changelog and re-sign only that stage's goldens | CI | untouched stages byte-identical |
| visual regression | Playwright screenshots per preset × LOD × size on the golden seeds; perceptual diff with a threshold; the K4 style regression (per-wing op mix and colour laws of the `shaded` preset) | CI | diff below threshold; screen = SVG = PNG within threshold |
| option-interaction matrix | every style/option pair rendered; assert no option silently disables another | CI | 0 couplings |
| edit suite | B-EDIT 10⁵ scripted sequences (add gate, move road, pin landmark, reroll block, resize district, change coast side, draw water, warp) | CI nightly | 0 planarity violations; locked preserved 100 %; ids outside scope 100 % |
| **reference-parity metrics** (B-REF) | computed from our outputs and compared with the recorded references (below) | `bench/` package writes both | inside the declared bands |

**Reference-parity metrics (computed against our captures):**

| metric | our measure | reference baseline (recorded) | band |
|---|---|---|---|
| road segment statistics | edge-length histogram per way class; turn-angle distribution; junction-arm angle median and share in 80–100°; node-degree histogram | FTG payload: type-0 modes 30/15/25 m, 15° cap (zero mass 15–16°), junction arms median 90.0°, 58 % in 80–100°, degrees {1: 83, 2: 2678, 3: 969, 4: 561} (`_critic-ftg.md` §4) | no cliff in turn angles; arm-angle median 85–95°; junction p5 ≥ 30°; 4-way share > 0 and < 15 % in organic districts |
| block-area distribution | face areas of infill blocks by district class | NG vertex captures at `medium` (`profile-neighbourhood.md` BG-1); FTG block-lot median 441 m² (`_critic-ftg.md` §4 row 17) | infill within the NG-measured bands at comparable district shapes (O4 f) |
| bent-cut signature | bend position, arrival angle, bends per cut | NG: one bend near 0.5 in ≥ 80 % of plain cuts; ≥ 85° arrival in ≥ 95 % of junction ends (`docs/IMPROVEMENTS.md` §4 R3) | within the measured spread on 1 000 seeds per template |
| building footprint distribution | area median/p95 per class; quad side; corner deviation | FTG: median 103 m², p95 154 m², quad side median 10.3 m, worst-corner p95 22.9° (`_critic-ftg.md` §4 rows 10–12); MFCG ≈ 13–14 m across at the ambiguous scale (`visual-spec.md` §1.4) | ordinary house median 60–160 m², p95 < 400 m² (O6 b); a sheared minority kept (R3) |
| entrance geometry | entrance on outline; distance to road | FTG: on outline 0.003 m; 3.0 m from road; 53 % of buildings with a vertex within 2 m of a road (`_critic-ftg.md` §4 row 15) | 100 % on the access edge; distance within class band |
| party walls / attachment | shared-edge share, attached share | NG 95–99 % attached, 39–43 % of perimeter; FTG residences 0–5 %, industry 96–98 % (`docs/IMPROVEMENTS.md` O17) | ≥ 90 % attached in dense classes; within band per class |
| population / buildings | persons per building by class | MFCG ≈ 6.12 (`_critic.md` C1); FTG 3.4 (`_critic-ftg.md` §4 conclusions) | our tables, reported; requested population ± 5 % |
| wall statistics | tower spacing, gates per arterial crossing | FTG median 39 m, 17/17 towers on ring vertices, 6 and 2 ungated crossings; MFCG a tower per non-gate vertex, `gates=N` exact | spacing within band; ungated crossings 0 |
| draw-style checks | per-preset op census vs draw records: casing Δ = 2h on every ribbon; joins round; dark:light fill ratio; hatch triangles per wing; shadow quads per wing; water band ratios 0.54433/0.19245; furrow pitch | `visual-spec.md` §0.2, §1.4, §2.3; `profile-neighbourhood.md` §3.6–3.7 (17.4 hatch/wing, 2.33 quads/wing) | `ink`: casing law exact, joins round ≥ 99.9 %; `shaded`: band ratios exact to 1e-4, hatch/wing 15–20, roof dark/light ratio (0.787, 0.802, 0.834) ± 0.02 |
| layer order | mark order per band vs the recorded orders | `profile-mfcg.md` §10.5; `profile-neighbourhood.md` §4.3; `profile-village.md` §7.2 | identical for the corresponding presets |
| labels | overlap with protected features; inside-area share; curvature | MFCG: gates/keep covered, walls straddled (O13) | 0 / ≥ 99 % / within limit |
| timings | per stage per size class | `profile-mfcg.md` §7.1; `profile-neighbourhood.md` §5 | §13 budgets |

---

## §15 Package and module layout, key interfaces, dependency rules

```
packages/
  core-geom/        exact predicates, dmath, DCEL, booleans*, offset*, skeleton, OBB/hull/LIR, delaunay*, poisson, noise, smoothing, index*   (* = adopted libs behind our interfaces)
  core-rng/         keyed sub-streams, helpers, hashing
  core-schema/      entity types, ids, document, migrations, JSON schema generation, invariant suite, statistics record
  gen-site/         P0 terrain, hydrology, water, land, coast/island outlines
  gen-content/      P1 roster (dependency tables), P11 reconcile, lazy people (sim data model)
  gen-layout/       P2–P7 siting, backbone growth, districts, claims, fortification, infill (strategy interface below)
  gen-plots/        P8–P10 prosperity field, granularity law, frontage plots, site plans, building-generator interface + trivial builder
  gen-hinterland/   P12–P13 land use, fields, woods, greenery
  gen-names/        P14 grammar engine (our own), corpora (our own), label text
  display/          display list builder per LOD, label engine, furniture, style sheets (data), paint programs
  render-canvas/    Canvas2D back end, tiles, instancing, OffscreenCanvas worker
  render-svg/       SVG back end
  render-gl/        WebGL2 back end (later)
  export/           GeoJSON, VTT, glTF/OBJ, PNG tiles, binary twin
  edit/             edit events, replay, undo, locality scoping, warp brushes, assignment + placement solver
  sim/              schedules, calendar, factions (optional module)
  api/              headless library API; worker protocol; embed bridge (postMessage)
  app/              the one-click web app (UI only)
  cli/              generate, bench, goldens, export
  bench/            B-CITY / B-EDIT / B-FUZZ / B-REF / B-ZOOM runners and parity metrics
  tables/           versioned rule tables and presets with provenance (data only)
```

**Dependency rules** (enforced by lint): `core-*` depend on nothing internal; `gen-*` depend only on `core-*` and `tables`; `display` depends on `core-schema` (never on `gen-*`); `render-*` depend only on `display`; `export` on `core-schema` + `display`; `edit` on `core-*` + `gen-*` (it re-runs stages) but `gen-*` never on `edit`; `sim` on `core-schema` only; `api` on everything except `app`; `app` on `api` only. No DOM outside `render-*`, `app`, `api/embed`. No `Math.random/sin/cos/Date` outside `render-*` and `app` (lint). Every adopted library is imported in exactly one `core-geom` adapter file.

**Key interfaces**

```ts
// generation stages and the layout strategy (stage 2 and a later village extend it)
interface Stage<I, O> { name: string; version: string; run(input: I, ctx: StageContext): StageResult<O>; invariants: Invariant[]; budgetMs: number; }
interface StageContext { doc: Document; stream(concern: string, entity?: Id<any>, attempt?: number): Rng; tables: Tables; report: ReportSink; scope?: Scope; epoch: number; }
type StageResult<O> = { ok: true; value: O; report: StageReport } | { ok: false; reason: string; partial?: O; report: StageReport };

interface LayoutStrategy {                       // the fused base implements it; NeighbourhoodStrategy and a later VillageStrategy implement it too
  id: 'base-fused' | 'neighbourhood' | string;
  backbone(site: SiteModel, siting: Siting, roster: Roster, ctx: StageContext): Dcel;           // P3
  partition(dcel: Dcel, roster: Roster, ctx: StageContext): District[];                          // P4
  infill(district: District, ctx: StageContext): Block[];                                        // P7
  plots(block: Block, field: ProsperityField, ctx: StageContext): Plot[];                        // P9
}
interface NeighbourhoodGenerator { generate(req: NeighbourhoodRequest, ctx: StageContext): NeighbourhoodResult; }   // §2.2

// the stage-3 hook
interface BuildingGenerator {
  build(input: { plot: Plot; slot: BuildingSlot; accessEdges: number[]; context: ContextVector; assignment?: Assignment; drift?: DriftBounds; seed: StreamKey; lod: ('outline'|'wings'|'rooms')[] }): Composition;
}
interface ClassRules { pick(context: ContextVector, assignment?: Assignment): { buildingClass: string; heights: Heights; roof: RoofSpec } }   // a data table, not code

// display and style
interface DisplayListBuilder { build(doc: Document, band: LodBand, scope?: Scope): Mark[]; }
interface Renderer { render(list: DisplayList, style: StyleSheet, view: View, opts: { layers: Layer[]; shadows: boolean; tier: 'low'|'mid'|'high' }): void; }
interface StyleSheet { version: string; palette: Record<string, string | string[]>; order: Record<LodBand, string[]>; programs: Record<string, PaintProgram[]>; budgets: Record<LodBand, DetailBudget>; }

// editing and API
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult; undo(doc: Document): Document; replay(bp: Blueprint, edits: EditEvent[]): Document; migrate(doc: Document, to: string): Document; }
interface TownAPI {
  create(req: Request): Promise<Document>;
  edit(docId: string, e: EditEvent): Promise<ApplyResult>;
  regenerate(docId: string, scope: Scope, mode: 'keep'|'adjust'|'newSeed'): Promise<ApplyResult>;
  query(docId: string, q: Query): Promise<QueryResult>;                     // gazetteer, hit-test, whereIs(person, t)
  render(docId: string, target: RenderTarget, style: string, view: View): Promise<void>;
  export(docId: string, format: ExportFormat, opts?: ExportOptions): Promise<Blob>;
  report(docId: string): Promise<GenerationReport>;
}
```

**Extension points**: `LayoutStrategy` (stage 2, village-later), `BuildingGenerator` (stage 3), `Stage` registration (sewers, islands, evolution as additional stages/layers), `PaintProgram` registry (new looks), `Exporter` registry, `Tables` (every rule as data), the `sim` module boundary (host rosters), the `Assignment`/`PlacementSolver` interface.

