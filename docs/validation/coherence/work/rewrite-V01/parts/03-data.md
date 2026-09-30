## 2 Data model

Records and views live in `@plat/model`, rows in `@plat/tables`, the stage-2 code in `@plat/hood` (V01 §8.3). Units,
`Identity` and `Lifecycle` follow §2.1 and §2.8. "Persisted" means in the snapshot and a digest; "derived" means
recomputed from persisted state and never stored.

### 2.1 Identifiers and the fabric table

`FabricStrategyId` (a `hood.templates` row key), `BlockKind`, `SquareType`, `SeamRun` and `TypedBoundary` are declared in
§2.5 (item 505); `OutlineTemplateId` is §4.2 S1 (2)'s row key, its standalone rows added by item 285 (V01 §3.10.2).

```ts
type HoodSite = 'court'|'plotYard'|'yardBlock'|'square'|'green'|'cemetery'|'fieldEdge'|'outsideYard';   // hood-pin sites (V01 §3.8.2); the last three hinterland
```

### 2.2 Rows (editable tables, §7.6)

Every `hood.*` table and `squares.quota` carries §7.6's per-preset cells: the `default` value and the `MFCG` and `FTG`
entries where they differ; `NG` entries stand only on the `hood.constants` cells V01 §3.15 lists — never on another
`hood.*` table, on `squares.quota` or on a base table, each of which resolves under `NG` as under `MFCG` (§7.6, item
584). Every cell has `{ value, unit, provenance, calibratable }`. A row or column marked `extension` has its **switch
cells** — chances, gates, weights, gains, quotas and options — 0 or off in the `MFCG` and `FTG` presets (§7.6's marker;
T-V1-4), and so under `NG` unless V01 §3.15 lists an `NG` entry for them; its **geometry cells** — sizes, heights,
clearances, distances, angles, thresholds and factors read only inside a switched step — carry no marker, so every preset
reads them at their values (J-V1.98).

```ts
// ---- `hood.templates` — one row per fabric (V01 §3.4); read by S7c, the land estimate, S8's template machine, the panel's cards and the S4 (b) classifier
interface TemplateRow {
  id: FabricStrategyId; label: string /* the card's name: Organic, Main street, Square, Rings, Quayside, Wall-side, Crossroads, Around the church, Bridgehead, Terraces, Green */;
  seeds: SeedSpec[] /* laid in order in the template face (V01 §3.4.1); [] for 'bent-cut' */;
  requires: TemplateRequirement /* eligibility on DistrictContext (V01 §3.3.2) */;
  select: { base: number; kind: Partial<Record<DistrictKind, number>>; terms: CharacterTerm[]; plannedGain: number; ngOdds?: number /* the standalone auto draw (V01 §3.3.5) */ };
  params: Record<string, { default: number; range: [number, number]; unit: string }> /* the District.fabricParams keys the row reads; every seeded row has `streetWidthM` (V01 §3.4.2 (b)) */;
  fallback: FabricStrategyId[] /* F-TEMPLATE's substitution rung (V01 §3.13), ending in 'bent-cut' */;
  outline?: OutlineTemplateId /* the standalone outline family this fabric draws (V01 §3.10.1 step 1); absent → the kind row's weights */;
  extension: boolean /* true for every row but 'bent-cut': the parity presets zero its S7c weight */; provenance: string }
// templateLandM2(D, row): number — the built land (m²) the row's seeds take from D, a pure function of the row and DistrictContext (V01 §3.3.7); 0 for 'bent-cut'
type SeedSpec =
  | { prim: 'spine'; from: Anchor; to: Anchor | { parallel: 'water'|'wall'|'contour'; offset: 'onEdge'|'plotRow'|'contour' }; role: 'main'|'quay'|'wall'|'contour'|'cross';
      series?: true /* contour only: a contour series with a ravine's thalweg path (V01 §3.4.3; the `stepped` row) */ }
  | { prim: 'ring'; centre: 'centroid'|'landmark'; courses: 'law'|1 }
  | { prim: 'plaza'; at: 'centroid'|'crossing'|'bridgeEnd'|'gate'; mode: 'carved'|'void'|'green'; shape: 'coin'|'rect'|'round'; type?: SquareType /* absent for 'green' */; through: boolean }
  | { prim: 'fan'; from: 'plaza'|'ring'; portals: [number, number] /* at least, at most */; cls: 'secondary'|'path' };
type Anchor = 'portal:best'|'portal:gate'|'portal:bridge'|'pair:1'|'pair:2'|'axis';   // V01 §3.4.2 (a); 'pair:1'/'pair:2' the crossroads' two crossing pairs
interface TemplateRequirement { minFaceAreaM2Law: 'ring'|'plaza'|'spine'|'none'; portals?: number /* usable portals on the template face, at least */;
  waterShare?: number; wallShare?: number /* share of the district's boundary length of that seam type, at least; `wall` counts walled stretches only (V01 §2.3) */; noIntervallum?: boolean;
  landmarkSigma?: number; bridgePortal?: boolean; slopeMeanPct?: number; crossingPairs?: boolean; arenas: ('ground'|'sky')[] }
type CharacterTerm = { of: 'mix'|'sectors'|'trade'|'mainRoad'|'identity'|'shade'|'chain'; key?: string; gain: number };
  // factor (1 + gain × value), value in [0, 1]; 'identity' 1 when χ̃'s provisional identity row is `key`; 'shade' DistrictContext.shade.meanShare;
  // 'chain' 1 when a context chain has `alongWay`; 'shade' and 'chain' terms are `extension` (0 gain in the parity presets)

// ---- `squares.quota` — the one square quota, a base table (§4.7 S9, item 301) whose rows this volume authors (defaults V01 §3.5.2; V11 registry row 91):
//      S7b (3) claims the squares larger than a block from it, S9b the sub-block remainder
interface SquareQuotaRow { band: string; haPer1000: number /* typed-square target per 1 000 inhabitants of the district */; kind: Partial<Record<DistrictKind, number>> /* factor */ }
// ---- `hood.dispatch` — one row per band of §4.5's band set (a band without a row interpolates, item 27); read by S9b (V01 §3.5)
interface DispatchRow { band: string;
  manorBlockShare: number /* share of eligible blocks given whole to one compound (V01 §3.5.5) */;
  small: { ordinary: number; yard: number; green: number } /* phase-2 weights for small blocks (V01 §3.5.6) */;
  yardPaved: number /* a yard block's chance of paving, else grass (V01 §3.5.6) */; extension: true }
// ---- `hood.squares` — one row per SquareType; read by the plaza primitive (V01 §3.4.5) and S9b (V01 §3.5.3)
interface SquareRow { type: SquareType; m2PerInhabitant: number /* the square-sizing row S4 (d)'s fallback rescales (§13.7) */; minM2: number; maxShareOfFace: number;
  centrepiece: { kind: Pin['kind']; weight: number }[] /* S11's centrepiece draw on `pin.centrepiece`; II.2's centrepiece rule reads this row (item 542) */ }
  // a place's knowledge defaults from `hood.placeKnowledge`, not from this row
// ---- `hood.pins` — the neighbourhood-tier pin rows (V01 §3.8.2; II.3's gate and decay); arena-keyed; the underground rows are volume 4's, which ships none (V01 §3.8.2)
interface HoodPinRow { kind: Pin['kind'] /* well, pump, trough, fountain, large_tree, statue, monument, bandstand, cross, shrine */; arena: 'ground'|'sky'|'underground';
  sites: HoodSite[]; gate: { band: string; p: number }[] /* per-site probability at the band for square, yard-block and green sites, interpolated; court, plot-yard and
    hinterland sites × `hood.constants`' pin.courtFactor */;
  weight: number; identity?: Partial<Record<string, number>> /* factor by the district's placed identity row (V01 §3.8.2) */;
  shadeGain: number /* the gate × (1 + shadeGain × shade at the site): −0.5 for fountain and bandstand, 0 otherwise (item 102) */;
  sizeM: [number, number]; heightM: number /* its prism shadow (V01 §5.1.4) */; clearanceM: number; extension: boolean }
// ---- `hood.placeKnowledge` — { kind: HoodPlace['kind']; subtype?: string; knownTo: 'public'|'local'|'secret' }[] (V01 §3.7.1)
// ---- `hood.defaultCuts` — per band set: number[] (V01 §3.10.1 (5); derived from the band set's default shares unless a row is authored)
// ---- `hood.kinds` — the standalone programme's rows (V01 §3.10.1); DistrictKind values only
interface HoodKindRow { kind: DistrictKind; weight: number /* S0's draw when the recipe names no kind */; areaHa: [number, number];
  anchors: { cls: string /* a roster class id */; count: number }[] /* singular or defining classes the hood holds (a temple hood its church) */;
  affinity: Record<string /* class family, §10.2 */, number> /* × the family's share of the dispersed demand */;
  outline: Partial<Record<OutlineTemplateId, number>> /* the fallback outline weights for a context-row fabric (V01 §3.10.1 step 1) */;
  needs?: 'waterEdge'|'riverEdge'|'wallEdge'; maxWealth?: number /* shanty: drawn only when intent.wealth ≤ this */ }
// ---- `hood.constants` — every constant of V01 §3 that is not a cell of another row (V01 §3.14): ONE row, key 'settings', in volume 11's settings form
//      (V11 §2.1): each V01 §3.14 key is a column — its dotted name the key — whose ColumnSpec holds its type, unit, range, `calibratable` and
//      `extensionAllowed`; the compiled cell takes unit and `calibratable` from it (V11 §2.2), and each calibratable column takes its own register entry
//      `cal.hood.constants.*.<key>` (V12 §3.11; V01 §8.1). The only `presets.NG` entries of this volume stand here (V01 §3.15; J-V1.99).
interface HoodSettings { key: 'settings';
  [column: string]: unknown /* §7.6's cell as V11 §2.2 compiles it, one per row of V01 §3.14's column table: `{ value, unit, provenance, calibratable, extension?, presets? }` — a number,
    a bool (the `ng.*` switches), an enum string (`pin.decayScope`), a [lo, hi] range (`tpl.arrivalDeg`) or a list (`ng.plazaM2`), as its ColumnSpec types it */ }
// ---- `way.surface` — V01 §3.7.3's rule rows
interface SurfaceRow { wayClass: WayClass; era?: string; band: string; surface: Way['surface'] }
```

The base records this volume writes are declared at their homes: `District.terrace` (§2.5, item 211); `Block.content`,
`squareType`, `ringCentre`, `voidCorner`, `overrides` (§2.5, item 210); `HoodPlace` (§2.7, item 207); a template plaza's
`Reservation` of stage S8 — kind `plaza` for a carved plaza, a `square` face to S9 whose `SquareType` S11 reads from the
row that laid it; kind `park` for a green-mode plaza, planted by §4.9's parks row (§2.5, item 210 (c)).

### 2.3 Views and services (derived, never stored)

`DistrictContext` is the district-level view over the one context vector, `ContextVector` (§2.5): its `kind`, `prosperity`, `band`,
`density`, `growthStage` and `arena` read the same fields the context vector samples per plot, aggregated over D, never a
second copy; the rest are stage 2's own reads of committed state. `TypedBoundary` is assembled from `District.seams` on
demand (§2.5).

```ts
interface DistrictContext {   // the one context every stage-2 rule reads; assembled by `@plat/hood` from committed state, draw-free
  district: Id; arena: 'ground'|'sky'|'underground'; kind: DistrictKind; regime: StageRegimeId /* §4.4's regime of its growth stage */;
  areaM2: number /* intramural-garden faces (item 106 (b)) and every raised part's under-deck strip (V01 §3.17.3) excluded */; templateFace: FaceRef | null /* V01 §3.4.1 */; templateFaceAreaM2: number;
  faceObb: { majorM: number; minorM: number; axisCdeg: Cdeg };
  inscribedRadiusM: number /* the template face's largest inscribed circle, by §3.8's `spine` reader's clearance */;
  prosperity: number /* area-weighted pass-1 value; pass 2 once S10a (ii) has run */; band: string; density: number; growthStage: number;
  inhabitants: number /* Σ of its allocation's household rows × the roster's mean household size (the greedy allocation at S7c, the committed one after);
    intramural gardens hold none — they are not built land (item 106 (b)); the deck plots D owns count (V01 §3.17.6) */;
  eLo: M; eHi: M; dBar: M /* §4.6 step 1's block-depth range and band plot depth */; wMin: M /* §4.6 step 6's minimum plot frontage */;
  character: CharacterVector; characterSource: 'provisional'|'placed' /* V01 §3.2: provisional before S12c, placed after */; identityRow?: string;
  identitySource?: 'dossier'|'emergent'|'dominant'|'plain' /* a QUARTER ladder record makes it 'dossier' (V01 §3.5.12) */;
  intent: DistrictIntent /* §7.7 layer 2, resolved: absent fields derived by §7.7's rules */;
  portals: { id: Id; class: WayClass; at: PointCm; bearingCdeg: Cdeg; kind: 'way'|'gate'|'bridge'|'landing'; onTemplateFace: boolean }[] /* ranked (V01 §3.4.2 (a)); 'landing' a
    landing's attach vertex — a sky island's (V01 §3.10.3) or a ground landing's S8 destination — a template portal, never counted in SeamReport.portalsTotal (V01 §3.11 (6)) */;
  water: { lengthM: number; share: number; bodies: ('sea'|'river'|'lake'|'canal'|'harbour')[]; quayWay: boolean };
  walls: { lengthM: number; share: number; intervallum: boolean } /* over walled stretches only: `full` and `parapet` runs; a `parapet` run never has an intervallum */;
  barriers: { cliffM: number; marshM: number; closureWaterM: number } /* barrier-closure arcs on D's boundary (item 106 (a)), read by the wall-side feature and the panel */;
  slope: { meanPct: number; p95Pct: number; fallCdeg: Cdeg } /* on the unlevelled terrain */;
  terrace: TerraceState /* terraceState(D), below (V01 §3.17.1) */;
  raised: { way: Id; kind: 'viaduct'|'elevated'|'aqueduct'; reason: 'drop'|'link'|'water'|'declared'; stripM2: number }[]
    /* the raised parts whose under-deck strip meets D's faces, with their reason word — derived from the raised-way record's `RaisedReasonKey`
       (V06 §2.13; J-VI.2): viaduct → 'drop', elevated road → 'link', aqueduct → 'water'; 'declared' where the way's lifecycle cause is an edit or a
       skeleton file (item 244's derived source) — read by the panel and the why providers (V01 §4.5) */;
  shade: { meanShare: number /* area-weighted mean of item 102's shade(x) over D from terrain and walls (field pass 1's sampler); on a sky arena
      shade(x) is volume 5's shadeSky(x) on the island's 32 m lattice (V05 §3.11 (4)) and meanShare its area mean over D — no sky reader reads the ground's
      pass-1 mask */;
    islandShare?: number /* D's area share inside any island's shade strip (V05 §2.3a) — on a sky arena, inside a higher island's strip onto this island
      (V05 §3.19 (3)); absent before SKY has written the islands' shade basis; read by the panel's reader query, the clerk's why and volume 9's shade view
      (post-generation; S9b and the pins read the strips themselves, V01 §3.5.5) */ };
  landmarks: { reservation: Id; cls: string; sigma: number; centroid: PointCm; guild?: Id /* a GUILD ladder record's hall (V01 §3.5.12) */ }[] /* S3 and S7b reservations inside it, σ by §4.5 (1) */;
  records: { record: Id; step: 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT'; membersHere: number; membersTotal: number }[] /* ladder records with members in D (item 108) */;
  chains: { chain: Id; compatible: boolean; membersHere: number; alongWay?: Id /* an incompatible chain's tier-1 way through D along which its members lie in ≥ 2 districts */ }[];
  under: { part: number; element: Id; access: boolean; shareOfD: number }[] /* volume 4's cavern, ruin, quarry and catacomb elements whose footprint overlaps D; `access` — the
    element's cluster's `excavation` reading is `accessible` (V04 §3.5.7 (g)); a quarry or catacomb element always true (item 109 (j) (3)); filled only once the
    underground tail has run, so no stage reads it before the tail: its readers are post-generation — the panel's reader query, the clerk's why, volume 9's voids view */;
  squaresM2: number /* existing square area inside it: the main plaza, §4.8 forecourts, gate plazas, S7b square and market claims, template plazas, void squares */ }
interface TerraceState {   // terraceState(D): pure, draw-free, in @plat/model beside DistrictContext; lands at M3a (V01 §8.1)
  asks: boolean /* D.terrace 'on' → true, 'off' → false; absent → the relief rows' `terracedEdges` cell at the site's relief class — on a sky arena the island's (V01 §3.17.7 (2)) —
    (V11; item 110 (a) "when the relief row asks for terraces") OR an authored S1 `terrace` site primitive (§4.2 S1 (1)) under ≥ terrace.siteShare of D's area */;
  source: 'declared'|'relief'|'site'|'none';
  walls: boolean /* slope.meanPct ≥ 100 × the rung's `terrace.slopeMin` (V11's TerraceRow, a share; this volume's percent = 100 × share): walls may stand; below it terraced streets only (V01 §3.6 (8)) */;
  stepCm: Cm /* Δz of V01 §3.4.3's series at D's `terraceSpacingM` (its default when D is not `stepped`): the expected rise between two contour streets */ }
  // read by S7c, S8's series, the base's district-edge source (item 302), the elevated-road generator's terrace endpoints (V06 §3.19.3), the panel,
  // the terrace why provider and naming.district's `terraced`; computed from records eager at S6's end, never from District.fabric (so no cycle with S7c)
// Provisional character χ̃ (V01 §3.2): §4.5 (2)'s CharacterVector computed over the allocation rows; no type of its own
interface DistrictSignature {   // derived; every component in [0, 1]; T-V1-5's classifier standardises it over B-CITY
  loopShare: number /* share of D's way length on closed loops */; spineShare: number /* the longest spine's share of D's way length */;
  squareShare: number /* square and plaza share of D's area */; bearingOrder: number /* 1 − the normalised entropy of D's lane bearings (18 bins of 10°) */;
  orthogonality: number /* share of junction angles within ± 10° of 90° */; edgeAligned: number /* share of frontage within 15° of the nearest `water` or walled run */;
  contourAligned: number /* share of lane length within 15° of the contour */ }
interface FabricSignature {   // fabricSignature's answer (V01 §3.16; J-V1.78): the town side of V12 §3.4's paired measures over a region, by V12's definitions
  blockAreaM2: number | null /* V12's `block.area` over the built blocks inside the region (the town side of `ruin.blockArea`) */;
  r4: number | null /* V12's `grid.r4` over the committed part-0 ways inside the region */; axisDeg: number | null /* V12's `grid.axis` */ }
  // null where V12 reads `notApplicable`
// @plat/hood services (V01 §3.16), pure and draw-free:
//   catchmentOf(plot: Id, unit: CoverageSpec['unit'] | 'neighbourhood', per?: number): Id[] /* the plots in the plot's catchment */
//   districtsAbove(part: number, element: Id): { district: Id; share: number }[] /* area overlap of a void's footprint with each surface district, shares
//     descending, ties by district address — so its first entry is II.7.5 (2)'s parent for an undercity's main chamber */
//   fabricSignature(region: PolygonCm): FabricSignature /* volumes 4 and 11 pass a ruin's outline */
//   skyDistrictCount(plotLandM2: number, districtHa: number): number /* a sky island's district count, 1–3 (V01 §3.16) */
interface HoodPin {   // derived by the refine close-up (V01 §3.8.2); never stored; its overrides are Block.overrides
  host: Id /* the block, or a hinterland face */; ordinal: number; kind: Pin['kind']; site: HoodSite; host2: Id /* the court residue, yard part, block face or land-use face it stands on */;
  at: PointCm; sizeCm: Cm; angleCdeg: Cdeg; heightCm: Cm; state: 'generated'|'moved'|'restyled'|'added'|'rematched' }
interface WayNamingContext {   // S13a's naming input for a way (V01 §3.7.2), derived at S13a
  cls: WayClass; lengthM: number; shape: 'straight'|'bent'|'curved'|'ring'|'stepped' /* 'stepped': a stair-stepped way (V01 §3.6 (3)) */;
  to?: 'gate'|'market'|'bridge'|'church'|'castle'|'harbour'|'square'|'well'; landmark?: { cls: string; name: NameRef };
  trade?: string /* the class family of ≥ 0.3 of its σ-weighted frontage uses */; band: string;
  districtIdentity?: string; water: boolean; slopePct: number; placeOnIt?: Id /* a HoodPlace record its course passes (created before the ways are named, V01 §3.7.1) */;
  terraceIndex?: number /* a contour-series street's rank from the lowest level laid, 0 (V01 §3.4.3) */;
  raised?: 'viaduct'|'elevated'|'aqueduct' /* a raised way's kind, for naming.way's guard (V01 §3.7.2) */ }
```

A retaining wall's step profile is §2.7's derived view `stepProfile(wall)` (item 245), which this volume reads (V01 §3.11
(7), §3.17.2).

**Arena parts per reader** (item 110 (b); J-V1.66). Item 110 (b) puts every raised deck in a ground arena part from 1
(`PlatKey.part ≥ 1`; §3.4). Every rule of this volume that reads `ways` reads the parts this table gives, and cites it.
On a sky arena the island's one part (V05 §2.1) reads as part 0 in every row and wherever this volume says "part 0" —
an island carries no raised way (V05 §3.22 (3) (d)) — and "raised" means a ground-arena part ≥ 1 (J-V1.95).

| reader | part 0 (a sky island's own part) | a raised road (viaduct, elevated road) | an aqueduct |
|---|---|---|---|
| χ̃'s frontage, `mainRoad` and trade (V01 §3.2); `chains[].alongWay`; S7c's `chain` term | yes | no — nothing fronts a deck | no |
| portals and their ranks, `bridgePortal`, `portal:gate`, `portal:bridge`, the bridgehead template, S9b's bridgehead squares (V01 §3.4.2 (a), §3.4.5, §3.5.3) | part-0 gates; part-0 decks over water only — on a sky arena the island's own decks over its conjured river among them (V01 §3.10.3 (4)) | no; each ramp or stair end is an ordinary ground junction ranked by its carried class | no, never a portal |
| S9b's junction arms and the void junction; the greens' tier-1 frontage; manor prestige; the bank path; the quay way (V01 §3.4.5 (c), §3.5.3–§3.5.5, §3.6) | yes | its ramp and stair ends, as junctions of its class | no |
| the surface rule (V01 §3.7.3) | by its fronting blocks | the base's value for its class (it has no fronting blocks) | none |
| the naming context (V01 §3.7.2) | as V01 §3.7.2 states | `shape`, `to` (from its ends), `landmark` and `raised`; no `trade`, no `band`; its kind word the base's | none — the base names it as a feature |
| `DistrictSignature`, `fabricSignature` (V01 §2.3, §3.16) | yes | no | no |
| `SeamReport.portalsConnected`'s walk (V01 §3.11 (6)); `catchmentOf('walk')` (V01 §3.16) | yes | yes, as one edge between its two end vertices | no |
| `TypedBoundary`'s runs (V01 §3.11 (8)) | yes | never a seam: its strip is a hole (V01 §3.17.3) | never |

Raised decks carry no deck plots (V02 §3.16, J-V2.71): item 110 (d)'s plots stand on part-0 decks over water, moles, piers
and quay platforms (V01 §3.17.6).

### 2.4 The request, the result and the report

`NeighbourhoodRequest`, `NeighbourhoodResult` and `SeamReport` are II.1's (item 539): the request's `seam`, `context`,
`params` and `closeup` are absent exactly when `laid` is empty (the unit runner builds each district's `DistrictContext`
and `SeamContract` after its partition, from `skyUnitInput` or `HoodRecipe`, V01 §3.10); the result carries `hoodPins`
(refine only, derived), `places` and `districts` (a unit run's, in partition order, which SKY-F writes to
`SkyIsland.districts`, V05 §3.12); `SeamReport` gains `landingsReached` (V01 §3.11 (6)).

**The mode is derived, never passed** (J-V1.3): `unit` when `laid` is empty; `refine` when `strategy` equals the
district's committed fabric; `replace` otherwise — a model edit (V01 §3.9). A sky island's `reason` is
`SkyIsland.reason` (§2.7), not a request field.

**Implementers and callers.** II.1's `NeighbourhoodStrategy.generate(req)` is implemented once, in `@plat/hood`, and
dispatches on the derived mode: `refine` → the close-up deriver (V01 §3.8), called by the generation worker when §4.1's
trigger fires (a click, an outline, or a visible tile under `'view'`); `unit` → the unit runner (V01 §3.10), called by
`generate` for a standalone neighbourhood document and by SKY for each island (reading `skyUnitInput(doc, island)`,
V05 §2.3), returning the unit's `districts`; `replace` is never a `generate` call — it is `setAttr` + `regenerate`
through the edit engine (V01 §3.9), whose S8 calls `FabricStrategy.partition`, implemented by `TemplateFabric` (and the
base's `BentCutFabric` for `bent-cut`). The `DistrictContext` builder is called by S7c, `TemplateFabric`, S9b, the why
providers and the reader's `query` for the close-up panel and the clerk (V01 §4.5); the three services of V01 §3.16 by
S10a / S10b's coverage term and volumes 4, 9, 10 and 11.

### 2.5 The close-up's records

```ts
interface CloseupParams { pinGate: number /* [0, 2], default 1, a value outside clamped with the one-line bend: × every hood-pin gate (V01 §3.8.2) */; tableVersion: string /* the `hood.pins` version the close-up derives with */ }
interface CloseupRecord { district: Id /* a district, or the hinterland pseudo-district for the outline close-up's faces (V01 §3.8.9) */; params: CloseupParams;
  since: number /* the seq of the `closeup` event that wrote it: §7.4's independence check refuses its undo while an `instance` event on its blocks with seq > since is live */ }   // the `closeups` digest block (§6.2)
// the `closeup` event (§7.1) carries { district, strategy, params: CloseupParams }; `strategy` is informative (the district's fabric at the event)
// Succession (§6.3): a district succeeded by the anchor rule (a merge or split) carries its CloseupRecord to its anchor successor; the other predecessors'
// records go to the archive, their blocks' overrides re-matched by §8.10 onto the successors' blocks or orphaned and reported
```

### 2.6 The standalone neighbourhood document's recipe

```ts
interface HoodRecipe {   // Recipe.hood (§2.9, item 272); present exactly when Recipe.product = 'hood'
  outline: { template: OutlineTemplateId } | { polygon: PolygonCm /* a drawn outline: simple, ≥ 3 vertices, snapped as §7.1 draws */ } | 'auto' /* by the fabric (V01 §3.10.1 step 1) */;
  size?: 'small'|'medium'|'large' /* the chips: `buildings` ≈ 85, 700, 1 050 (NG's bands) */; areaHa?: number /* absent: from `buildings`, else the kind row's band */;
  buildings?: number /* a building-count target, wins over areaHa (V01 §3.10.1) */;
  kind?: DistrictKind /* absent: drawn from `hood.kinds` */; fabric: FabricStrategyId | 'auto';
  leafy?: boolean /* greenery 0.9 and court greening × 1.5 (NG's `leafy`) */; secular?: boolean /* no landmark anchors, manorBlockShare 0 (NG's `secular`) */;
  contextRung: 'TOWN'|'CITY'|'METROPOLIS' /* whose rung-scaled rows the hood reads; default 'CITY' */;
  intent: DistrictIntent /* wealth, density, planned, greenery …; absent fields derived */;
  edges?: { water?: { bearingCdeg: Cdeg; body: 'river'|'sea'|'canal' }; wall?: { bearingCdeg: Cdeg };
    slope?: { bearingCdeg: Cdeg /* downhill */; pct: number /* the mean fall in percent; default hood.hillsidePct */ } /* T1's hillside edge (V01 §3.10.1 step 2) */ } /* optional context edges */ }
// The layers a standalone neighbourhood document may hold are fixed by V01 §3.10.1 (7) through the inputs its S0 writes.
```

### 2.7 Lifecycle of every state field this volume adds (create · read · persist · regenerate · undo · migrate)

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `District.fabric`, `fabricParams` (base fields written by S7c) | S7c (V01 §3.3) inside S7b (1) at generation; `setAttr` (declared, held, §7.2); a skeleton `quarter` with `fabric` (item 349); a dossier naming claim never sets it | S8's template machine, S7b's reconcile (the land), the panel, the clerk, the S4 (b) classifier, the district naming features | the district's leaf digest (§6.2) | S7c re-runs only on a Re-derive from S7b or earlier, never over an edited path; New random on the district keeps it (the draw is keyed by the district's lineage, V01 §3.12) | the `setAttr`'s undo record restores the former value; the grouped `regenerate`'s undo restores the district | absent reads `'bent-cut'`; an unknown row id falls back by §7.5's table-row migration to `'bent-cut'`, reported |
| `Block.content`, `squareType`, `ringCentre` | S9b (V01 §3.5) | S10a (iii), S10, S10b, S11, S12b, S13a, S14, exports | the block's leaf digest | re-derived with the block by any re-derivation that re-runs S9b for it (from S8, or S10a (i) of its district); a block re-derived from S10 keeps it | the event's undo record | absent → `'ordinary'`, no squareType; a stored `'market'` square type reads `'trading'` (§7.5, item 210) |
| `Block.voidCorner` | S9b for a void square (V01 §3.4.5) | S10's claims-first step | leaf digest | as `content` | undo record | absent → none |
| `Block.overrides` | an `instance` event on a hood pin (V01 §4.1) | the refine derivation's override pass (§8.10's resolution), the reader | leaf digest (hashed with the block) | resolved by §8.10's law at each derivation; a superseded block's rows move to its `supersededBy` successor (§8.10) | the `instance` event's inverse | schema row; an unknown pin kind → the row orphaned, reported |
| `HoodPlace` (square, green, yard, court) | S13a's creation pass (V01 §3.7.1); T11's name tool on an unnamed court, yard or square (minted from the event's seq) | the way-naming context, S13b through its `LabelEntity`, the reader, exports | entity leaf; names in the naming records (§2.8) | succeeded by §6.3's anchor rule with its host; a host that ceases to qualify tombstones it (its name kept in the archive); a user-created place stays while its host face exists; a switch edit to 0 retires every derived one, one raising it makes them again (V01 §3.15) | the event's undo record | registry row; none before M5 |
| `HoodPlace` (opening) | the opening pass (V01 §3.7.1) from a public-opening or catacomb-entrance `AccessPoint`, in every commit V04 §3.10 names that creates, removes or re-kinds one, the underground tail's T6 at generation first | labels, the reader, exports, the pins' clearance | entity leaf | lives as long as its host `AccessPoint` while the local-place step runs (the stage-2 switch > 0): re-derived with it by the same pass in each such commit, tombstoned with it, retired by a switch edit that lowers the switch to 0 and made again by one that raises it (V01 §3.15; V04 §3.10); a closure state on the host changes its symbol, never its name | undone with its host's event, or with the switch edit's | registry row; none before the underground layer |
| `HoodPlace.name`, `.knownTo` | S13a's naming pass; `setAttr` | the knowledge admission (§9.2), labels | naming record; leaf | §6.3's naming cases; an edited value held (§7.2) | undo record | §7.5 |
| `CloseupRecord` | the first `closeup` event on the district (V01 §3.8.6) | the refine derivation (its params); §7.4's independence check (`since`) | the `closeups` block of the model digest | survives any re-derivation of the district (keyed by its address); carried to the anchor successor of a merge or split; a district tombstoned takes it to the archive | the `closeup` event's undo (§7.4's independence check) | `params` schema-versioned; an older `tableVersion` keeps deriving with that version while §6.4's retention window holds it, then migrates to the current and reports |
| `Way.surface` (base field, derived by V01 §3.7.3 unless edited) | S10a's end (V01 §3.7.3) | S14's road programs, the reader, exports, naming | way leaf | re-derived when its fronting blocks' pass-2 band changes, unless the path is edited; a bounding way's surface is inside the re-derived district's seam exception (§7.3 item 1, item 369) | undo record | absent → the rule's value at load |
| `Recipe.hood` | T1 `intend` with `product: 'hood'`, a skeleton file, the API | the unit run's S0–S2 (V01 §3.10) | recipe (canonical) | a Re-derive from S0 re-reads it | a recipe `adjust`'s undo | `Recipe.product` absent → `'town'`; a stored `kind` that is not a `DistrictKind` (`residential`, `manor`, `slum`) → `central`, `central` with wealth 0.9 and planned 0.5, `shanty` with wealth 0.1, reported; an absent `edges.slope` reads flat |
| `District.terrace` | `setAttr` (T8's chip, V01 §4.1); a skeleton `quarter` with `terrace` (item 350) | `terraceState` → S7c, S8's series, the district-edge source (item 302), the elevated-road generator (V06 §3.19.3), the panel, the why provider, naming | the district's leaf | held (a declaration, §7.2); absent re-derives with its inputs | the event's undo record | absent → derived |
| a `RetainingWall` as this volume reads it (its record, lifecycle and state profile item 245's, §2.7; source `generated` by the base's S10–S11 levelling, the ward edge's source included, item 302; `declared` by T3 `retaining` or a T2 terrace stroke's edge) | the base | the seeds' validation (V01 §3.4.2 (d)), the fixed inputs (V01 §3.5.12), the court sites (V01 §3.8.2), the chunk digest (V01 §3.8.3), S14, the exports, the why provider, the dry run's fates | the base's entity leaf — never the step profile | `generated`: with its district's S10 (a replace close-up, New random, §7.3's terrain operator through D); `declared`: held, a fixed input (V01 §3.17.2) | the event's undo | a document without item 110 has none |
| the rim walk's pair — one `esplanade` and one `street_trees` `Greenery` on a sky island's rim strip (base records, item 313) | `plantRimWalk` (V01 §3.10.3 step 4): the unit run, after its districts' S12b; each event that re-lays the strip (V05 §4.2's resize and rim reshape) | S14's green and tree marks, the exports' greenery rows, the reader | the base's entity leaves on the island's arena | re-planted whole by `plantRimWalk` at every unit run and strip re-lay, §6.3's carry-over retiring the old pair in the same batch; never by a district's re-derivation | the calling event's undo record (the pair restored with the strip) | none: the pair lands with the unit run (W8), before any document holds an island (M6-sky) |
| the unit's `Allocation` (standalone) | S7b in the unit run (V01 §3.10.1), less the void part step 6 hands to the underground pseudo-district's `Allocation` (S7b (6) (d)) | S10a | as every `Allocation` | re-derived with S7b | undo record | as §2.5 |
| `hood.constants` (one `settings` row; the `NG` preset's entries among its cells), `squares.quota` | authors (`@plat/tables`) | every rule that cites a key (V01 §3.14); S7b (3) (`squares.quota`) | the table files; a document pins the versions it read (§7.6) | an `editTable` re-derives from the first stage that reads the cell (§7.6) — for the stage-2 switch `fabric.extensionWeight`, from S2 with §6.3's carry-over (V01 §3.15) | `editTable`'s (or `editPreset`'s) undo | §7.6's table-row migration |

Derived and never stored: χ̃ (V01 §3.2), `templateLandM2`, `DistrictContext`, `terraceState`, `stepProfile`, the
under-deck strips as holes (V01 §3.17.3), deck-plot ownership (V01 §3.17.6), `TypedBoundary`, `DistrictSignature`,
`FabricSignature`, the three services' answers, `HoodPin`, the ground `AccessPoint` symbols (V01 §3.8.8),
`WayNamingContext`, `SeamReport` (recomputed with each close-up or re-derivation and written to the generation report),
the close-up's cache chunk (V01 §3.8.3: non-canonical, dropped on mismatch) and every `WhyAnswer` (V01 §4.5). The
`blockLifted` notice is a line of the event's fate report, logged with the event; volume 4 reads it from the log
(V01 §3.9). Every row above is exercised by T-V1-55's round trip (V01 §7).

### 2.8 Identity (§6.3) of what this volume mints

* **Template seed ways** (spines, ring courses, through streets, fans) and **template plazas**: derivation unit = the
  template face's L1 cell (as S8's lanes, §6.3), stage **`S8.seed`** (a registered stage id of its own, item 345, so no
  seed's lineage key can equal a lane's of the same cell), creation index = the seed's ordinal in `TemplateRow.seeds` ×
  64 + its course or segment ordinal — for a contour series' street `f × 32 + (k + 16)`, f its flank (0, or 1 for a
  ravine's second flank) and k ∈ [−15, 15] its level, and for a ravine's thalweg path 0 (V01 §3.4.3; J-V1.64); for a
  `landmark` row's precinct rings the ring's ordinal in σ order (V01 §3.4.4) — so re-laying the same template on the
  same face with the same reroll mints the same lineage and a faithful Regenerate reproduces them. The ward-edge wall's
  identity is the base's district-edge source's (item 302).
* **Blocks** keep §6.3's rule (the cell for S8 blocks); dispatch writes attributes only.
* **HoodPlace** (square, green, yard, court): derivation unit = its host block, stage S13a, creation index = its kind's
  ordinal (square 0, green 1, yard 2, court 3) × 2¹⁶ + the court's ordinal among the block's court residues (courts
  only); anchor = the host face's pole of inaccessibility (§6.3's anchor for area kinds). A user-created place:
  derivation unit = the creating edit event (its `seq`), §6.3's rule for anything a user draws or builds, creation index
  0. **HoodPlace** (opening): derivation unit = its host `AccessPoint`, the underground tail's stage, creation index 0 —
  one place per access.
* **Hood pins**: no address; their draws are keyed by the block (or hinterland face) with the stage component
  `STAGE_VIEW` (§6.1), so no hood-pin draw can alias an S11 decoration draw on `pin.decor`; render key = the block's
  render key and the pin's ordinal (§6.1's decoration rule), so they never re-scatter with zoom; a user `add` takes
  §8.10's user ordinal `u<n>`.
* **`fabric.select`'s key**: V01 §3.12.
* **Unit-run entities**: a standalone neighbourhood document is a town root in its own document — §6.1's fixed town
  lineage with creation index 1 where a town's has 0 (item 340), so a standalone neighbourhood document and a town of one
  seed never share a stream; its district is S6's one seed. A sky island's districts: derivation unit = the island
  (`SkyIsland`, whose arena key the island's minting gives, II.6), stage S6, creation index = the district-partition face
  order (V01 §3.10.3). **The rim walk's pair** (V01 §3.10.3 step 4): derivation unit = the island, stage S12b, creation
  index 0 for the `esplanade` and 1 for the `street_trees` row — one pair per island, which has one rim strip — so a
  re-plant re-mints the same lineage keys, the pair its own batch retires being no collision (§6.3).

