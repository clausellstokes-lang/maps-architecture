## §1 Scope, product shape, fusion thesis, stack

*In plain words.* The base is one generator that makes towns, cities and metropolises with one click, at parity with
MFCG and FTG and better than both in the ways the owner asked for: real terrain and water, streets that go somewhere,
plots and yards instead of lots painted as buildings, prosperity that varies smoothly, greenery by rule, walls and
gates that make sense, everything editable, and no whole-map retries. It is a browser library with a small app on top,
written so it can later be embedded in another program and calibrated against a historical map corpus.

### 1.1 What is built, in what order; the two size ladders

| stage | what | depth in this document |
|---|---|---|
| **STAGE 1 — the BASE** (built first) | one general town/city generator on the ladder **TOWN → CITY → METROPOLIS**, fusing MFCG-class and FTG-class generation plus O1–O19 (§15.2): the plot model, plot granularity, the prosperity field, greenery, heights, editability, permanent addresses, layers, drainage, every owner hook, and the optional content module `@plat/sim` (its own milestone, M4b) | build-ready: §2–§14, §16 |
| **STAGE 2** (built in this program at M5, after the base) | the same town composed of NG-class neighbourhood close-ups with consistent seams, shared seeds and one style system | interface depth: PART II; what the base must already carry is a base requirement (§2.5, §4.12) |
| the later stages of the owner's roadmap | stage-3 building compositions, the village product, sewers and floating islands, the evolution engine, corpus calibration, SettlementForge inputs | hooks only — the one list is *Staged by the owner's roadmap* |

**The two ladders.** The town/city generator scales **TOWN → CITY → METROPOLIS**; the village product scales
**THORP → HAMLET → VILLAGE** (PART III). The ladders meet without a gap or an overlap: the village ceiling and the base
floor are both **1 500 inhabitants** (D-33). **Size within a rung follows population:** the request's population
chooses the rung whose band contains it — bands include their lower bound and exclude their upper one: TOWN [1 500,
10 000), CITY [10 000, 30 000), METROPOLIS [30 000, 120 000] — and every quantity below it (roster, stage budgets,
district count, frame, plots) is computed from that population, never from the rung's target; a request that names a
rung without a population takes the rung's target. All three rungs generate from M1 — a rung is a `ladder.json` row on
the one pipeline, not a separate build — so M1's goldens, B-CITY runs, determinism tests and diagnostic side-by-side
include METROPOLIS; M2b measures and tunes it (§16).

**The rung profile.** Everything the owner's rule defines per rung lives in one versioned data table, `ladder.json` in
`@plat/tables`, one `RungProfile` row per rung, calibratable like every table (§7.6) and refined by the corpus phase
(§13.9):

```ts
interface RungProfile {
  rung: 'TOWN'|'CITY'|'METROPOLIS';
  populationBand: [number, number]; populationTarget: number;           // the band chooses the rung; the target is the default request
  frameAreaKm2AtTarget: number; aspect: [number, number] /* 0.5–2; square by default */;   // side scales with √(population ÷ target) (§3.2, §12.2)
  stageRows: StageRowRef;                                               // stage count, regimes and walled shares (§4.2 S2)
  budgets: BudgetRef;                                                   // model, first-map and memory budgets (§12.3, §12.5, §12.8)
  granularity: { frontageScale: number; depthScale: number; joinMaxDelta: Record<ProsperityBand, number> };   // scales the §4.7 rows
  greenery: { parkPer1000Scale: number; edgeGreenProb: number; privateGreenShift: number /* points */ };       // scales the §4.9 rows
  districtCountLaw: LawRef; gateLaw: LawRef;                            // §4.5, §4.8
  matched: { mfcgSize: number; ftgSize?: 'BIG_TOWN'|'BIG_CITY'|'METROPOLIS' };   // the side-by-side references (§13.6)
}
```

| rung | population band (default target) | buildings at the target | frame at the target (area; side at the default aspect 1, §3.2 (9); + 30 % margin per side) | stage rows (§4.2 S2) | granularity (frontage × / depth × / rich join max +) | greenery (parks per 1 000 × / edge green or orchard probability / private green shift) | matched references (§13.6) |
|---|---|---|---|---|---|---|---|
| TOWN | 1 500–10 000 (5 000) | 1 200–1 500 | 4 km² (2.0 km) | 2 stages; walled core 0.90 of buildings, ribbon 0.10 | 1.10 / 1.10 / 0 | 0.8 / 1.0 / +5 points | MFCG size 40; FTG BIG_TOWN (≈ 5 600) |
| CITY | 10 000–30 000 (20 000) | 4 500–6 000 | 25 km² (5.0 km) | 3 stages; 0.55 / 0.33 walled, ribbon 0.12 | 1.00 / 1.00 / 0 | 1.0 / 0.6 / 0 | MFCG size 80; FTG BIG_CITY (24 500) |
| METROPOLIS | 30 000–120 000 (50 000) | 12 000–15 000 | 64 km² (8.0 km) | 4 stages; 0.30 / 0.30 / 0.28 walled, ribbon 0.12 | 0.90 / 0.95 / +1 | 1.2 / 0.4 / −3 points | MFCG size 130; FTG METROPOLIS per D-31 |

**Budgets inside a rung.** Because size follows population, a rung's budgets are laws of its building count, never
one number per rung: model time §12.3 (with where O3 (d)'s bars hold and the declared miss above), the first map
§12.5, memory §12.8, the ratios to MFCG at matched sizes §12.9; the misses are declared for the owner's veto (D-18).

**The rung modifiers** — wider and deeper plots and more private green in a town; narrower frontages, larger joined
rich plots and more public parks in a metropolis — are PLAUSIBLE defaults with provenance "architecture 2026-09-25"
(J-S13). **Confirmation (M2b, B-CITY):** the modest band's median frontage orders TOWN > CITY > METROPOLIS and park
area per 1 000 inhabitants orders TOWN < CITY < METROPOLIS. **Pre-decided fallback:** if an ordering fails, that
modifier's distance from 1 is doubled once and re-measured; if it still fails, the modifier is set to neutral (1.0 / 0)
and the ordering is reported as not produced.

**Requests at the ends of the ladder.** A request below 1 500 inhabitants is routed by `LadderRouter.route(population)
→ { product: 'base' | 'village', rung }` to the village product (PART III); while no village product is registered the
base builds a 1 500-person TOWN and `requestedVsBuilt` reports the clamp. A request above 120 000 is clamped to 120 000
and reported. A request that names both a rung and a population outside that rung's band is an F-EDIT conflict whose
dry run offers the rung the population belongs to.

### 1.2 The one-click default, stated once

`generate({seed})` → a TOWN of 5 000 people whose complete city band — every block in its ground tone, every footprint
mass, street, wall, gate and quarter label — is on screen within 150 ms of the click on the reference machine
(124–145 ms across §12.2's building range; §12.1); a CITY's and a METROPOLIS's default requests take ≈ 0.33–0.42 s and
≈ 0.86–1.05 s, and every size follows §12.5's laws of the building count. The first paint is the finished picture
(§8.5). Defaults: the `ink` style with MFCG's raised under-copy on and the projected shadow off; walls on at every rung
(R6); first-level features at *auto*, drawn per seed from S0's feature-probability table and reported (§7.8); coast or
river by the site model's request defaults; curved quarter labels at city zoom and district names from district zoom,
in IM FELL Great Primer (§9.4, §17.2); scale bar and compass; no questionnaire, no hidden state. Every improvement
ships behind the defaults (R8): the fast path never pays for the simulation module, projected shadows, relief,
thumbnails or the advanced panel.

### 1.3 The thesis in one paragraph

Every weakness the four creators admit in their own words is a geometry weakness on plain vertex arrays: collapsed or
intersecting edges "can easily break it completely" and "Browser not responding" (MFCG 87882877), the null `rect`
crash, hourglass footprints the heuristics "do not detect" and two intersections at one world position that "breaks
things" (FTG 133016301, 153121107), a 2017 `cut()` that silently returns its input on ≠ 2 crossings, NG's
"Alternative cut" / "Trying again" retries and 42 % silently discarded lot leaves, VG's boolean "thorns" (relayed
through `docs/IMPROVEMENTS.md` O3 and `proposal-kernel.md` §1.2). The remedy is one robust planar subdivision — a
snapped, integer-lattice, exactly-predicated, indexed half-edge subdivision with typed faces, refined in five nested
levels — at the centre, with every stage a transaction on it that commits a valid subdivision or is rejected with a
typed reason, and districts, blocks, plots, buildings, walls, water, labels, exports, edits and epochs derived from it.
On that substrate the layout fuses the two references as the owner asked: FTG's staged, destination-driven growth for
the streets, MFCG/NG's bent-cut infill for the lanes, MFCG's grower for the districts, FTG's roster for the content,
MFCG's one-click ink look for the picture, and our own site model, plot model, prosperity field, greenery rules,
display list, document and stream design where neither reference has an answer.

### 1.4 Fusion thesis, stage by stage

The rule at every genuine conflict is the owner's DESIGN TIEBREAKER: the approach more faithful to how real settlements
are constrained and laid out — explicit constraints (terrain, water, defence, land use, access, growth) and precise
real-unit geometry with measurable statistics — with legibility and one-click use as a floor. **TB** marks the rows
where it decided; "no TB" where charm and evidence agree. Each criterion carries its §15.2 class: **C** conformance,
**P** parity with a measured reference number, **O** an outcome the references do not reach.

| stage | MFCG-class approach (evidence) | FTG-class approach (evidence) | PLAT adopts | discards, and why (measurable criterion) | TB? |
|---|---|---|---|---|---|
| site: terrain, water | coast = 6-octave noise per cell, `sea` an angle; river = course search with 712 rejections and 21 canal restarts in 58 attempts, whole-city restart on failure (`_critic.md` C15; CONFIDENCE B3/B8) | water first, coast "in two arms", rivers that "may bend back", no terrain ("Mountains aren't properly supported yet", CONFIDENCE C1/C2/D8) | **new (O1)**: heightfield in metres + hydrology; rivers by descent; coasts, lakes and islands from one closed-outline routine; coast and contours agree by construction; water faces enter L0 with typed shores | MFCG's mesh-edge rivers (no bed, restarts) and FTG's border-touch typing — neither has a terrain constraint. Criterion: requested water features delivered by tier with 0 tier-6 omissions (O1 a, O); non-monotonic beds 0, contours crossing water 0 (O1 b, C) | **TB** |
| units and frame | an internal unit of **4.00 m** (the SVG scale bar against the map group, three files: 3.9998 / 3.9998 / 3.9991 m); its GeoJSON export is already in metres (road width 8 in the JSON, 2 in the SVG) — `captures/mfcg/exports-sweep-2026-09-25/README.md`, redteam-mfcg MFP-8 | integer centimetres centred on (0,0), +y north (`_critic-ftg.md` F1, CONFIRMED) | FTG's convention | MFCG's internal unit (read only to measure its exports). Criterion: every parameter and export in metres (O6 a, C) | **TB** |
| centre and destinations | plaza = innermost cell; streets = BFS gate → plaza on cell edges; roads to a phantom point 1 000 units out (`os-model.md` §6 via CONFIDENCE B7) | initial-roads type at the origin, no destinations ("most of the settlements in FTG look similar", 112861635) | **MFCG's idea on FTG's substrate**: named destinations (market, gates, bridging points, harbour, external bearings), the plaza and castle reserved and the gate sites picked at S3, arterials routed between them over a cost surface in real metres | FTG's destination-less bloom. Criterion: through-roads at a destination 100 % (O4 a, C); detour ≤ 1.4 (O4 b, P) | **TB** |
| secondary streets | since 0.10.0 every non-arterial street is the district-wide twisted bisection of the merged ward polygon — a connected secondary network with mostly 3-valent nodes, cut inside a wall built first so the fabric inherits its shape (87882877; `profile-mfcg.md` §4.9 via redteam-mfcg MFP-2) | proposal-queue growth in stages, 15° per-vertex cap, half-step normal streets, prune/trim between stages (`ftg-docs-params.md` §2.2–2.5) | **by regime** (§4.4): inside the walls S5 grows only district-scale secondaries that join the arterials (separation ≈ 120–250 m) and S8's recursive bent cut cuts every lane and intramural secondary; outside the walls **FTG's staged growth** along the main roads, destination-aware, curvature-continuous, with explicit legality thresholds; the suburb regime by preset | FTG growth down to block scale inside the walls (the fabric would neither inherit the wall nor carry MFCG's signature); FTG's clamp-only wiggle (zero mass above 15°, `_critic-ftg.md` §4 row 7). Criterion: MFCG's street signature inside the walls (§13.5, P); no turn cliff and junction p5 ≥ 30° (O4 b, P) | **TB** |
| districts | grown from seeds around features with `validatePatch/validateEdge`, holes split (CONFIDENCE B9); live typing is feature-named | district = one growth lot typed from the remaining pool "and what the lot is next to"; 49 % of buildings in no ring (`_critic-ftg.md` F4/F13) | **MFCG's grower over FTG's objects**: groups of coarse skeleton faces seeded at features, grown with arterials, walls and water as barriers, **feature-named**, merged into **quarters** for city-zoom labels; the use mix from the roster's allocation and the prosperity field, with a mixed-use floor | FTG's one-lot districts (containment 53 %); class-typed wards MFCG itself dropped. Criterion: containment 100 % (O11 b, C); city-zoom quarter labels at MFCG's count per matched size and block-level use mix in band (§13.5, P) | partial TB |
| block fabric (lanes) | twisted bisection of wards into blocks and alleys; restart on "bad poly" (`_critic.md` C13; ST-8) | straight inserted roads to a target area (§2.5) | **NG's bent cut** with the measured signature (§13.5) as a hole-aware kernel transaction with a bounded ladder; the district's class band as the stop law; the deep-interior choice (court, back lane, through-alley, rear plots) by band shares | FTG's straight roads (too regular); MFCG's restart. Criterion: K1/K2 within the measured spread (P); 4-way share per preset, organic 0–15 % (R3, P) | no TB — charm and evidence agree |
| blocks → plots | bisection lots + `filterInner` + `indentFronts`; lots painted as buildings | strips / centroid cuts / shrink-then-split; 441 m² in every class; no owner (`_critic-ftg.md` F17) | **new (O5/O18)**: per-frontage regions of each block, strips perpendicular to each frontage with party walls, typed residue, joins and splits from the prosperity field, alleys and back lanes where the band's deep-interior share says so | both references' cut-then-filter lots. Criterion: access edge 100 % (O5 a, C); streetwall continuity and footprint cover against MFCG's exports at the matched rung, direction declared (§13.5, P); within-district plot-area CV above its floor (§13.7, O) | **TB** — burgage plots were laid from the frontage |
| buildings | lots drawn as buildings ("the illusion of buildings"); Complex = rectangles; landmarks by `lir` | building = plot (Dense) or inset plot (Gaps); entrance on the outline ≈ 3 m from the road (C9; 2.99 m measured, §13.5) | **the owner's plot model**: a parcel with 0..n footprints and a typed yard; site plan by class (row / compound / detached / hovel / institution / tents); heights on everything; FTG's entrance rule kept; landmark footprint templates in the base; the stage-3 generator behind the `outline` / `compose` interface (§2.6) | MFCG's global display switch; FTG's one-building-one-household lot. Criterion: O17 (a)–(i) | TB (owner ruling, metric tables) |
| walls, gates, castle | one ring on cell edges, built before the streets; `gates = N` exact; a tower on every non-gate vertex; castle = a cell with a 0.75 compactness repair loop (B5/B6) | wall = typed edge chain on the district ring after a stage; towers at 39 m median; no gate objects; castle fitted into its lot (C11/C12) | **FTG's staging + MFCG's gate identity and wall-first order** (§4.2 S3, §4.4 S5a, §4.8): gate sites picked and the castle and plaza reserved at S3; stage 1's enceinte traced at S3 over its solved gate routes and each later one at S5a, each from its stage's travel-cost boundary and pulled to defensible ground before that stage's streets grow; gates exactly where arterials cross, exact N by MFCG's measured gate law; towers by rule; the castle by score with the compactness gate as a shape check, repaired in place (angle equalisation, then bloat) before re-siting; several enceintes; an open waterfront by default; the wall → road lifecycle | MFCG's cell-as-castle and tower-per-vertex; FTG's ungated crossings. Criterion: O8 (a)–(h); walled share at MFCG's measured 0.87–0.92 (§13.5, P) | **TB** — defence as an explicit constraint |
| hinterland | farms as a ward type, `Cutter.grid` / `splitField`; forests "fill all available space" (the creator: "historically incorrect anyway") | main roads to the border, four farmland modes, farmsteads with driveways, hedgerows, reserves (C14–C16) | **FTG's contract + O14**: land use sized to population, field systems as presets (open-field strips, enclosed, FTG's hedgerows, the MFCG/VG sector look), farmsteads by their fields, woodland by distance, a context margin | MFCG's fill-the-leftovers. Criterion: O14 (a)–(g) | TB |
| content | population ≈ 6.12 × buildings, wards are "hints" (`_critic.md` C1) | roster first from a dependency graph; every building has occupants; people lazy (B1–B6) | **FTG's guarantee, two-way**: a sequential, prefix-stable roster from our own tables → an eager allocation to districts and blocks → placement onto plots → a bounded reconcile; people derived lazily | MFCG's multiplier. Criterion: O7 (a)–(h) | TB |
| determinism | one MINSTD stream, retry continues the stream (A2) | `seed: null`, server-side (A4) | **O2**: 128-bit-keyed sub-streams (key components §6.1); integer geometry; permanent lineage-hash addresses with anchors (§6.3) | both models. Criterion: O2 (a)–(e) | — |
| rendering | ink print, casing idiom, per-ward cache, no zoom ("a big flaw") | lit web map, merged geometry, tiers | **one semantic display list with LOD and paint programs on one drawing path** (Canvas2D the reference backend of every preset); ink default, lit second, hatched for stage 2 | each renderer's coupling of geometry to its drawing path; a second render path for the lit look. Criterion: O12 (a)–(g) | — |
| editing | 8 warp kernels, per-ward reroll, no save | layout editor, regenerate area, bulk edit, "cannot be undone" | **FTG's graph editing on our plat + MFCG's warp kernels**, all as events on permanent addresses with locality, dry-run validation and undo | nothing of substance; neither persists. Criterion: O9 (a)–(f), the MFCG asks as measured scenarios (O9 f, O) | — |
| labels | curved labels on skeleton spines, halo, legend | arced serif labels, 2 m / 5 ft grid, scale bar, no compass | **MFCG's spines made hole-aware and collision-checked, quarter labels at city zoom + FTG's furniture** | none. Criterion: O13 (a)–(h) | — |
| failure policy | whole-city retry incl. wards and geometry (ST-8) | server "gives up"; no fallback in the splitter | **MFCG's tiers minus the restart tier**: typed results, bounded ladders, substitution, and a report that counts every requested feature by delivery tier | both. Criterion: tier-6 omissions of requested features 0 and p95 time on MFCG's worst configurations (O1 a, O3 b, O); hard invariant violations 0 / 1 000 (C) | — |

Genuinely new mechanisms replace both references: the site model (O1), the plat kernel (O3), frontage-first plots and
the granularity law (O5/O18), the prosperity field (O18), the plot/site-plan model with heights (O17), the greenery rule
family (O19), the semantic display list with paint programs (O12), the document and edit log (O9), the keyed stream
design (O2) and the layer model.

**The fused layout** (the mechanism is §4.4): grown arterials with partitioned blocks *and* a partition seeded from a
grown skeleton are the same thesis at two granularities — the backbone's faces are partitioned by bent cuts, and the
cuts are promoted to ways of the same graph; inside the walls the partition does the street work MFCG's does, outside
them growth does FTG's. Rejected: (a) MFCG-first (a Voronoi cell mesh as truth, growth only outside the walls) —
streets without geometry, roads that point at nothing, no incremental growth without re-meshing; (b) FTG-first end to
end (queue growth down to lanes) — the "vaguely circular" look-alikes the creator names and the loss of the T-junction
signature R3 requires; (c) an Urban Places-style quad base mesh — geometry inherits the mesh resolution, which the
precision tiebreaker forbids, and its construction is unrecovered; (d) bent cuts as queue proposals — the recursion is
what yields the measured statistics. The MFCG creator's warning that road-first plus block subdivision "seems
problematic" (devlog 31287) is the risk the fusion gate O4 (f) guards — measured at M0 on a flat site and again at M1
on B-CITY-lite's river, coast and relief configurations with the reordered stages (§16).

### 1.5 Incremental growth (the evolution hook, answered by the thesis)

A growth-based backbone extends natively: an epoch is a logged event that runs one more growth stage on the persisted
plat, and everything that survives it changes only through explicit, logged transformation events, decline included —
nothing that survives is re-rolled (§4.11). The base builds and tests exactly one incremental path — add a growth stage
to an existing town, with wall → ring road — at M4 (§16, D-25); the evolution engine that schedules epochs from
circumstances is staged by the owner, with its interfaces concrete in §4.11.

### 1.6 Stage 2 and the village in one paragraph each

*Stage 2.* A district is a group of skeleton faces with a typed boundary and a `SeamContract` from M1; stage 2 opens it
as an NG-class close-up by running a `FabricStrategy` inside that boundary at neighbourhood LOD, with seams exact by
construction (PART II, II.1).

*Village* (a separate product staged by the owner). Its needs — a one-road backbone, farmstead site plans, a density
field and a palisade before its roads, its own ladder whose 1 500-inhabitant ceiling is the base's floor (§1.1) — and
the hooks the base carries for each are PART III's.

### 1.7 Tech stack (reasons; no dependence on any existing project)

| choice | decision | why | rejected |
|---|---|---|---|
| language | **TypeScript** (strict), ES2022 modules, no DOM in model packages | browser-first embeddable library (D-4); one language for kernel, pipeline, renderer and app; the reference evidence is JavaScript-shaped (call censuses), so budgets transfer | Rust → WASM core (two languages, slower iteration while constants are still tuned); a WASM kernel — none: a measured hot loop may get a byte-identical WebAssembly accelerator behind the kernel façade (§3.7); Haxe (the references' tool, no advantage); C++/CGAL desktop (GPL, not browser-first) |
| runtime targets | browser: main-thread UI, **one generation worker** plus a **derivation pool** of up to three workers for the per-district stages (§4.1, §12.3) and a **tile worker** (§8.9), behind a handle-based API (§11.2); Node 24 LTS (CLI, tests, research-side baseline scripts, headless goldens; the CLI's PNG export uses `@napi-rs/canvas` as an optional dependency); an embed bundle (ESM or iframe) | the headless API reproduces the UI's model hash (O11 f); B-CITY runs without a browser | server-side generation (FTG's 3–7 s round trip is the thing to beat) |
| numeric core | integer centimetres in `Int32Array` arenas; exact `orient2d` in doubles under a derived range bound; `robust-predicates` for `incircle`; **booleans, buffers and bands built on the kernel's own arrangement — one engine on every host**, with Clipper2 and `polygon-clipping` as CI oracles (§3.7 states the one case in which Clipper2 ships); `dmath`, our own TypeScript port of the fdlibm 5.3 routines the model needs (§17.4) | integers remove float non-determinism and epsilon geometry (FTG's own lesson); one engine means one hash on every host | doubles with epsilons (the references' whole failure class); exact rationals everywhere (10–100× slower); a runtime boolean fallback (a second engine with different hashes) |
| rendering backends | **Canvas2D — the reference backend of every preset including `lit`**, with a world-aligned tile pyramid (§8.8); **SVG** (layered, ids preserved); **PNG and print** by band-streamed tiles at any DPI; WebGL2 only as the pre-decided tile-compositor fallback (§8.9) | one drawing path keeps screen, PNG and print identical (O12 c) and avoids the duplicate render path both creators warned about; MFCG proves per-group caching keeps 46 000 fills at 590 uploads; NG proves per-primitive canvases do not | three.js as the primary (textures and lighting are one *style*); WebGPU-only (too new for the embed target); a WebGL2 reference backend for `lit` (a second drawing path) |
| text | Canvas2D glyphs from the bundled OFL fonts, composed onto the tiles in the tile worker (§8.8–§8.9); widths from the fonts' own metric tables, parsed by our code (§9.2); no SDF text | the same glyph positions on every output and in every engine | the host text engine for metrics (engines shape differently) |
| build and test | pnpm workspaces monorepo, `tsc` project references, `esbuild` for library bundles, Vite for the app, `vitest` + `fast-check` property tests, Playwright visual regression with `pixelmatch` / SSIM, axe-core for accessibility, a `bench/` package that runs B-CITY / B-EDIT / B-FUZZ / B-REF / B-ZOOM in the three CI tiers of §13.8 | conventional, permissive (the dev-only exceptions are §17.4's), fast | — |
| data | rule tables, presets, style sheets and the rung profiles (`ladder.json`, §1.1) as versioned JSON with a schema (`zod`) and `{value, unit, provenance, calibratable}` per cell | everything editable; corpus calibration through §13.9 | — |
| persistence | a self-contained `.plat` document (JSON manifest + binary blocks); no hosted service — for multi-client use the host is the store (§11.3, §11.5) | O9; embedding needs no backend | a sync service of our own |
| repository | the product lives in its own repository, `plat/`, at the root of this folder, outside `research/`, `captures/` and `reference/`, under §17.1 (3)'s path rule | the clean room (D-29): the product can never read reference material by accident | the product inside the research tree |
| dependencies | permissive licences only, checked over the transitive production closure, pinned exactly and credited in a generated notices file (§17.4); every third-party routine behind our own adapter | clean room, swap-ability and an open licence choice for the owner (D-22) | — |
