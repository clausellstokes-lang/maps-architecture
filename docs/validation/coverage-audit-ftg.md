# Coverage audit — FTG slice (Fantasy Town Generator: posts, guide and parameters, payload and visuals, second-seat critic)

Lane `validation/coverage-audit-ftg` · 2026-09-25 · seat: surveyor / coverage auditor (Opus), clean-room (no captured
JavaScript bundle opened; no reference code or data values copied — rows describe techniques; FTG's constants are cited
as evidence of reference behaviour, not as content to reuse).

**Question answered.** For every distinct technique or capability recorded in the six FTG-slice findings files
(`ftg-posts-a.md`, `ftg-posts-b.md`, `ftg-posts-c.md`, `ftg-docs-params.md`, `ftg-payload-visual.md`, `_critic-ftg.md`,
including every Critic, Critic-2 and post-critic capture addendum inside them, with the FTG rulings of `_critic.md`),
does `docs/ARCHITECTURE.md` cover it at the tier the owner's product scope assigns? And which architecture features does
no row of this slice and no item of `docs/IMPROVEMENTS.md` motivate?

**Outcome in one paragraph.** 277 raw items collapse to **227 master rows**: 222 BASE (19 of them delivered by the
optional `@plat/sim` module; one also carries the stage-2 fabric slot), 1 STAGE-3 hook row, 1 VILLAGE-LATER row and
3 context rows. Of the 222 BASE rows, **168 are COVERED** (11 by a named original technique that replaces FTG's, 21
"beyond" FTG's recorded weakness, 1 declined by a recorded decision), **47 are PARTIAL** and **7 MISSING**; both hook
rows (stage 3, village) are **NOT-PRECLUDED**. **No row is HIGH severity**: every parity-floor FTG capability the
map depends on — content-first roster, staged queue growth with the measured segment laws, suburb regime, districts with
a merge floor, landmark-first claims, frontage plots with the measured footprint and entrance laws, walls per growth
stage, harbours, farmland modes, tree areas, the lit look, arced labels, grid and units, the Foundry-style bridge — has a
named mechanism. The **9 MEDIUM** gaps are: building-level editing (no hand-drawn footprint event; placing a building rests on an unspecified `build(...)` conversion);
the ruler (an R10 keep property); landmark silhouettes (temple stars, octagons) deferred to stage 3 although they are a
city-zoom signature; the castle-district pipeline (gatehouse, internal paths, inner ward, decorated surround); outside
decorations (ponds, copses, stone circles, ruins with trails), which §15.1 claims but no body section specifies; the
building/wall material system; raw-resource and site gating of the roster with the hinterland hand-off of mines,
quarries and lumber; and two unrecorded scope decisions on FTG content depth (items, services, prices and stock;
personality, stats and education). The **45 LOW** gaps are content-module depth, cosmetic render variety (weather,
seasons, post-processing, feathered field edges, tree species, market stalls), vocabulary breadth (coast shapes,
harbour walls, plot furniture), small model details and app items. Scope creep visible from this slice is **trivial** (four enumeration additions and one
borderline field). Five §15.1 FTG parity rows cite sections that do not carry the mechanism they name (§6).

## 0. Reading record (the READING BUDGET rule applied)

Status: **COMPLETE**. Read in the order the task lists, output written after each file (Appendix A is the per-file
record). Total reading ≈ 190 k tokens (findings ≈ 128 k, ARCHITECTURE ≈ 62 k), under the 350 k threshold, so every
file of the slice and ARCHITECTURE.md were read in full; IMPROVEMENTS.md was read by section as recorded below, which is
all the scope-creep check needs.

| file | size | read |
|---|---|---|
| `research/findings/_critic.md` | 42 KB | in full, read first as instructed; its FTG rulings (C12 pipeline order, C13 bent cut, §3 resolutions, §6.7 gaps, the version ladder) carried into Appendix A.1 |
| `research/findings/_critic-ftg.md` | 49 KB | in full (§0–§6: F1–F27, the `[NAMED-ONLY]` resolutions, 37 spot-checks, 24 re-derivations, remaining gaps) |
| `research/findings/ftg-posts-a.md` | 81 KB | in full, incl. its Critic-2 addendum |
| `research/findings/ftg-posts-b.md` | 86 KB | in full, incl. its Critic-2 addendum |
| `research/findings/ftg-posts-c.md` | 87 KB | in full, incl. its Critic-2 addendum (the §5 pipeline-order correction) |
| `research/findings/ftg-docs-params.md` | 77 KB | in full, incl. its Critic-2 addendum |
| `research/findings/ftg-payload-visual.md` | 74 KB | in full, incl. the Critic addendum (decoration singletons), the Critic-2 addendum (zig-zag ruling, corrected §5 numbers, edge types) and the Critic-2 addendum part 2 (the roadlength100 capture: F3 settled, generation ≈ 3–7 s) |
| `docs/ARCHITECTURE.md` | 245 KB | in full (all 2 200 lines: PART I §0–§17, PART II, PART III, delegated decisions, judgment calls, deferrals, Appendix A) |
| `docs/IMPROVEMENTS.md` | 193 KB | **by section**: the heading outline; §1 (outcome); §4 (R1–R16 keep properties and "improvements deliberately NOT proposed"); §5.1–§5.5 (the must / should / later / hooks / stage-2 split) in full; plus a scripted term census of ≈ 100 candidate feature words over the whole file and targeted line reads (`land value`, `earthwork`, `influence`, `parchment`, `bastion`, `wind`). **Not read in full:** the O1–O19 opportunity bodies (§3.1), §3.2–§3.3, §6 traceability, §7 and Appendix A — the scope-creep verdicts in §5 rely on the term census for those parts |

Binding rulings applied while enumerating: the zig-zag coordinate ruling (every payload length ×½, area ×¼; buildings
≈ 10 × 10 m); F3 settled by part 2 (form metres are real; main-road steps L + 0.5, district-stage normal streets
(L + 0.5)/2, suburb streets 30 m, suburb lot outlines ≈ 14.7 m); generation ≈ 3–7 s, not ≈ 300 s; the documented
pipeline order (content → water → staged roads and districts → suburb → outer settlement); walls follow lot/district
outlines per stage (hull reading superseded); edge types 3 = map border, 12 = piers, 14 = water outline, 4 = suburb lot
outlines; `minDistrictArea` is a merge floor; decoration singletons 11.2/11.4/11.5 = well / bandstand / statue.
Retracted payload hazards (non-simple rings, duplicate vertices, out-of-extent buildings) are not carried as capability
rows.

## 1. Legend and method

**Tier** (owner product scope, 2026-09-25). **BASE** = an FTG-class capability the stage-1 town/city generator must
cover at parity (parity is the floor; an original technique that replaces FTG's counts, and is named). **BASE (module)**
= a BASE capability the architecture delivers through the optional `@plat/sim` module of the base release cycle
(delegated decision D-10 / J-9, IMPROVEMENTS J-S). **STAGE-3** = a building-interior hand-off: only the hook is checked.
**VILLAGE-LATER** = a sub-town (hamlet / village) capability: only "not precluded" is checked. **STAGE-2**: this slice
contains no NG-class capability; the one row where FTG meets the stage-2 slot (district-owned fabric, E09) is tagged
BASE with the slot noted. **Context** rows record the reference's stance or product facts; they take no verdict.

**Ref** = the FTG variant or era the row records: `2022–23`, `2024`, `V1` (the pre-2025 layout), `V2` (the 2025+
staged layout), `2025`, `2026`, `docs` (the 2026-09 guide and the captured request/presets), `wire` (measured on the
Galeiaward / Nevervalley payloads), `render` (screenshots). Material version ladders are kept as separate rows
(road growth V1 vs V2; the 2023, 2025 and 2026 splitters; walls 2023 vs 2025+).

**Coverage.** `COVERED` (the ARCHITECTURE.md section is cited) — specified to a depth a builder can implement without
inventing the capability; "beyond" marks rows where the design deliberately exceeds FTG's recorded weakness; "declined"
marks a recorded decision not to reproduce (the rationale is cited). `PARTIAL` — present, but the named part is missing.
`MISSING` — no section provides it. Hook rows take `NOT-PRECLUDED` / `PRECLUDED`.

**Sev** (PARTIAL / MISSING only). `H` = a parity-floor gap in a user-visible BASE capability, or a model gap that would
block stage 2; `M` = a secondary BASE capability, a rule the builder would have to invent, or a scope decision that is
not recorded anywhere (so the owner cannot veto it); `L` = cosmetic, content-depth or editor nicety whose absence is
defensible under the architecture's restraint rules (R13, J-S).

**Evidence** cites Appendix A raw ids (`a` = posts-a, `b` = posts-b, `p` = posts-c, `d` = docs-params, `v` =
payload-visual, `k` = `_critic-ftg.md`, `c` = `_critic.md`) plus the source post or section. Tags: ST stated, SH shown,
IN inferred, NO named only, CR critic ruling, MS measured on our capture.

**Method.** Every raw item was read against ARCHITECTURE.md after that file had been read in full; presence or absence
of a mechanism was then confirmed by `grep` over ARCHITECTURE.md for the capability's vocabulary (for example `ruler`,
`bandstand`, `stall`, `hemisphere`, `snow`, `palm`, `blur`, `price`, `stock`, `personality`, `mines` — each 0 hits
where a row says MISSING). A verdict of COVERED cites the section whose text carries the mechanism, not merely the
§15.1 parity-matrix row; where the parity row and the body disagree, the body decides and §6 records the disagreement.

## 2. Outcome

**Verdict.** At the depth this audit can check, ARCHITECTURE.md covers FTG's map-making capability completely at the
parity floor and exceeds it in the places FTG itself names as weaknesses (seed and replay, undo, old settlements never
upgraded, the 15° clamp, 441 m² lots in every class, districts holding half the buildings, ungated walls, water that
"may bend back", road names, GeoJSON without districts, several candidate layouts, authored constraints). What remains
open is (a) nine MEDIUM items — four build-level holes in user-visible features (building-level editing, the ruler,
landmark silhouettes, the castle district), three rules a builder would have to invent (material rules, outside
decorations, raw-resource gating with the hinterland hand-off) and two unrecorded scope decisions on FTG's content
depth — and (b) forty-five LOW items, most of them the content module's depth that IMPROVEMENTS J-S and D-10 already
defer by decision, or render variety that R13's restraint makes optional.

| category | rows | COVERED (of which beyond) | PARTIAL | MISSING | M | L | module rows |
|---|---|---|---|---|---|---|---|
| A. Pipeline, determinism, persistence, stance | 25 | 23 (5) | 2 | 0 | 0 | 2 | 0 |
| B. Size ladder and content roster | 14 | 7 (1) | 6 | 1 | 2 | 5 | 4 |
| C. People and simulation | 13 | 3 (0) | 8 | 2 | 1 | 9 | 13 |
| D. Road-graph substrate and street growth | 27 | 26 (3) | 1 | 0 | 0 | 1 | 0 |
| E. Districts | 15 | 12 (2) | 3 | 0 | 0 | 3 | 0 |
| F. Blocks, plots and buildings | 23 | 18 (1) | 5 | 0 | 2 | 3 | 0 |
| G. Walls, gates, towers, castle | 11 | 8 (1) | 3 | 0 | 1 | 2 | 0 |
| H. Water, coast, bridges, harbours | 20 | 15 (2) | 5 | 0 | 0 | 5 | 0 |
| I. Hinterland, farmland, forests, landscape features | 16 | 10 (1) | 4 | 2 | 1 | 5 | 0 |
| J. In-town greenery, decoration, open space | 6 | 4 (0) | 1 | 1 | 0 | 2 | 0 |
| K. Rendering and style | 21 | 17 (1) | 4 | 0 | 0 | 4 | 1 |
| L. Labels, names, furniture | 9 | 7 (1) | 1 | 1 | 1 | 1 | 1 |
| M. Editing and regeneration | 10 | 8 (2) | 2 | 0 | 1 | 1 | 0 |
| N. Export, formats, integration | 7 | 5 (1) | 2 | 0 | 0 | 2 | 0 |
| O. Units, scale anchors, performance | 5 | 5 (0) | 0 | 0 | 0 | 0 | 0 |
| **all BASE rows** | **222** | **168 (21)** | **47** | **7** | **9** | **45** | **19** |
| S3-1 stage-3 hook · VL-1 village · Q1–Q3 context | 5 | S3-1 and VL-1 NOT-PRECLUDED; Q rows take no verdict | — | — | — | — | — |

Reading the table: the road-graph and growth category (D) is the best covered — every FTG growth parameter has a
named mechanism, and the 15° clamp, the (L + 0.5)/2 segment law, the suburb regime and the prune / trim rule are
cited to the critic rulings and the roadlength100 capture. People and simulation (C) is the thinnest by design: the
architecture keeps the base to roster + context vector + siting + lazy people and puts schedules, calendar, relations,
factions and events in the optional module (D-10), so most C rows are PARTIAL-L "named, no schema"; two of them (C03,
and B10 in the roster category) are not named anywhere and are therefore MEDIUM.

## 3. Master capability checklist

### A. Pipeline, determinism, persistence and the creator's stance

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| A01 | all eras | Two-phase pipeline: buildings and people are decided before any geometry; the map is a placement problem over a precomputed manifest and must give every building a place ("I don't see this ever changing") | a06, b21, b43, d02, k11, c01 [ST 91451446, 127128581; docs algorithm L8; CR C12, F14] | BASE | COVERED | §4.1 order rationale (programme before layout, kept as the demand side), §4.2 S2 roster + area budget, §4.7 S10b plan–fit–reconcile ("placement never gives up"); content-first default plus a layout-first entry point; §1.4 content row | |
| A02 | docs | Documented map-phase order: water first → staged road network and districts (suburb stage last) → outer settlement (main roads to the border, outside lots subdivided, farms / forests / features) | d02, k11, c01, p50, v31 [ST; CR F14] | BASE | COVERED | §4.1 stage graph (S1 water before S4/S5 roads; S5 stages incl. the suburb regime; S12 hinterland "after the town (FTG's outer settlement)") | |
| A03 | 2022–23 | Content-phase order: forced buildings (government, religion, military, factions) → dependency loop → post-process (faction membership, friendships, rivalries) | a07, d02, d40 [ST 84680671 comment; docs] | BASE | COVERED | §4.2 S2 institutions (market, temple, churches, guild halls, inn, mill, tannery, castle if lordship) before the §10.2 demand loop; the social post-process belongs to rows C04/B15 | |
| A04 | V1 | V1 layout loop and its failure modes: bounded retry then abort ("would regularly give up"), undersized districts merged into mixed ones, district groups formed before roads (disconnected districts), the landmark : lot size ratio blow-up after the metre fix | b20, b21, a12 [ST 106664214, 112861635] | BASE | COVERED | replaced: no give-up path (§5.1, D-9), claims before the fabric while faces are large (§4.7 S10 step 3), districts grown over the skeleton after the roads (§4.5), F-SITING ladder (§5.2) | |
| A05 | V2 | Top-down area budgeting: total building area → required lot area → how much road to grow; each stage places a share of the building stock (`proportionOfBuildings`), the suburb takes the remainder | b22, d09 [ST; SH request] | BASE | COVERED | §4.2 S2 `A_stage` formula and `StageBudgets[]` with density regimes; walled-stage share as a preset (D-2); F-BUDGET-STAGE ladder (§5.2) | |
| A06 | all eras | No seed and no URL reproducibility (`seed: null`); render-time fills (forests, decoration areas) not reproducible from the saved file | a42, d56, k24 [ST; SH request] | BASE | COVERED | beyond: §6.1 keyed sub-streams, decoration drawn from `style/*` streams keyed by entity id ("FTG's render-time fills, made reproducible"), §6.4 permalinks | |
| A07 | wire | Generation server-side (≈ 3–7 s per the part-2 capture) with a static client that then builds the scene for seconds; no progress trace, a spinner only | b05, v01, k17 [MS part 2; CR F20] | BASE | COVERED | beyond: §1.7 browser / Node library with one generation worker and incremental delivery (§4.1; city-LOD preview after S9, §8.5); §12 CITY 300 ms p95 against FTG's ≈ 3–7 s server time (§1.7: "FTG's 3–7 s round trip is the thing to beat") | |
| A08 | 2024–26 | Settlement persisted server-side as a versioned object addressed by UUID; version history used as operational undo; protobuf file | b06, b45, p37, a20 [ST] | BASE | COVERED | §2.9 `.plat` document (recipe + edit log + hash-verified snapshot); undo by inverse events and a k = 8 snapshot ring (§7.4); a hosted sync service is a recorded deferral | |
| A09 | wire | Wire geometry: integer centimetres, zig-zag varints, centred on (0,0), +x east +y north, closed rings; ≈ 593 KB for a CITY with its whole population | k01, v02, v03, v45, p37, d01 [ST 164816716; CR F1] | BASE | COVERED | §2.1 units (FTG's convention, D-12); §2.9 `Int32` delta + zig-zag varint per chain; §11 CBOR twin with FTG's 593 KB as the bar | |
| A10 | all eras | Persistence sacred after release: fixes and new features apply only to new settlements; no regeneration path for old settlements; only data repairs are retroactive | a47, b44, p46 [ST] | BASE | COVERED | beyond: §7.5 migration chain with an explicit diffed upgrade replay; §6.4 version axes; the last N minor versions replayable | |
| A11 | 2024 | Append-only, id-referenced dictionaries (races, religions, genders may be added and edited, never deleted) | b07 [ST 101576411] | BASE | COVERED | §10.3 "Data dictionaries (ages, genders, races) are append-only and id-referenced" | |
| A12 | docs | Lazy person generation: a few fields persisted, the rest regenerated on view and locked on edit; appearance options stored by index (renaming an option re-colours people) | d45 [ST] | BASE | COVERED | §2.7 / §10.3 people derived from `(seed, household id)` and pinned once seen or edited; id-referenced dictionaries "so renaming never re-colours" | |
| A13 | all eras | Storage economy as a design driver: per-component size budget, family-unit relations (30 % → 10 % of the file), schedules by job, tree areas instead of trees (50 k trees ≈ 1 MB), procedural-at-render versus at-save | a38, b01, b06, p09, p38 [ST] | BASE | COVERED | §2.7 trees never stored (instances from `treeStream`); §10.3 people stored as aggregates + pinned (kilobytes for 50 000); §12 memory budgets; the O7 module row reports stored bytes per 10 k population (§15.2) | |
| A14 | docs, 2026 | The create form as the generator's full input schema (general, layout, districts, people, government, factions, landscape and climate, water, religion, calendar, items and services, buildings) with a short basic form | a33, p43, d03 [SH] | BASE | COVERED | §4.2 S0 Blueprint (size, intent, site request, toggles), §7.7 intent / character / circumstances, §7.6 every table editable, §7.8 basic panel ≤ 12 controls + advanced panel; missing individual inputs are separate rows (B09, B13, F21, I16) | |
| A15 | 2025–26 | Settings presets saved per section with partial overwrite (cloud or local), exported and imported as a file | b37, p43 [ST] | BASE | COVERED | §7.6 override layer (`defaults ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ editEvents`, each a sparse delta with provenance) — the same partial-overwrite property; `editPreset` events | |
| A16 | 2026 | Broad strokes and fine control: every generated feature has a manual counterpart | p45, a47 [ST + patron comment] | BASE | COVERED | §7.1 every generated element is an edit target; §7.2 drawn constraints; R8 keep-test | |
| A17 | users 2024 | Authored constraints before generation ("lay down some initial walls and district boundaries before having the generator fill in the rest") — unsupported by FTG | b44 [ST comment] | BASE | COVERED | beyond: §7.2 drawn ways / water / walls / greens / district boundaries inserted before S1 / S4 / S6 / S7 as locked constraints | |
| A18 | users 2025 | Several candidate layouts before populating — refused by FTG on its content-first rule | b44 [ST 127128581] | BASE | COVERED | beyond: §7.8 six S0–S4 proxy thumbnails continuing into the chosen seed; layout-first entry point (§4.7 S10b) | |
| A19 | 2026 | Validation at the authoring boundary (self-intersecting drawn shapes prevented; more layout validation) | p30 [ST 153121107] | BASE | COVERED | §7.1 dry-run validation of every event; §7.2 validation at the authoring boundary; §3.5 row | |
| A20 | 2026 | Duplicate intersections at one position broke face traversal and area re-roll; settlements repaired server-side | p29 [ST 153121107] | BASE | COVERED | §2.2 rule 3 (topology by index), §3.1 welding within 5 cm (one vertex per hot pixel), §3.5 row | |
| A21 | 2025 | Heuristics over correctness in splitting (bad buildings "not impossible"); "fix the generator, not the output" | p01, p45 [ST 133016301] | BASE | COVERED | §5.3 invariants (hard ones abort the batch); frontage-first construction never emits the hourglass/sliver class (§3.5) | |
| A22 | all eras | DM-table stance: "if I see it, I can go there", consistent answers; legible ratio rules ("1 farm per 25 people"); everything is editable data | a47 [ST + patron] | BASE | COVERED | R7 keep-test adopted (O7 (a) 100 % function and occupancy, gazetteer §10.1); ratios in data tables (§10.2); tables editable (§7.6) | |
| A23 | 2023–26 | Scale as the standing constraint (generation speed, file size) and the population-LOD idea (not every person generated) | a43, b38, k22 [ST] | BASE | COVERED | §12 budgets and cost-model tests; lazy people (§10.3) realise the population-LOD idea | |
| A24 | 2023–26 | App accessibility (aria labels, landmarks) and list / search views that reach buildings and people without the map | a33 (88558259 row), b42 [ST] | BASE | PARTIAL | the gazetteer `query` (§11) gives list and search access; accessibility of `@plat/app` is not addressed anywhere | L |
| A25 | 2025 | User guide with context-aware documentation links; release notes naming defects | b24 (123982784 row), p45 [ST] | BASE | PARTIAL | §7.8 100 % of parameters documented (registry test) and release notes naming known defects; context-aware links from the UI to documentation (an R15 keep item) not stated | L |

### B. Size ladder and the content roster

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| B01 | docs, 2024 | Size ladder of named classes with an approximate population and a map width (TOWN 3 625 / 3.5 km … METROPOLIS 49 500 / 6 km), plus a Custom population target up to 50 000, every person an individual | a34, b03, d32, v13 [SH presets; ST 99652534] | BASE | COVERED | §1.1 TOWN / CITY / METROPOLIS ≈ 5 000 / 20 000 / 50 000; §4.2 S0 size as rung or population / area / buildings with a tolerance; §12 frames 2 / 5 / 8 km; the ladder is a table (§7.6) | |
| B02 | wire | Size expressed as density on a near-fixed canvas (population ×550, width ×4), which caps the legibility of the largest settlements | v13, v46 [MS; IN] | BASE | COVERED | beyond: frames grow with the rung (§12), the density field (§4.5), continuous zoom with LOD (§8.5) | |
| B03 | 2023, docs | Six-level lifestyle ladder (Squalid → Aristocratic) as a first-class axis; each building's lifestyle drawn from a distribution around the average lifestyle | a11, d33 [SH; ST] | BASE | COVERED | replaced by the continuous prosperity field, banded only where a table needs a class (§4.5); `lifestyleBand` in roster rows (§10.2); households by wealth band = prosperity band ± drift (§4.7 S10b); `wealthLevel` intent (§7.7) | |
| B04 | 2022–23 | Retired resource-demand selection (demands, biggest-demand loop, one shop threshold) and its failures | a08 [ST 91451446] | BASE | COVERED | not reproduced; §10.2 ratio loop (the replacement FTG adopted) | |
| B05 | 2023, docs | Building groups and the dependency graph: one per N people or per N of other groups, converted to per-person ratios; within-group proportions; core versus shop pools with shop probabilities inside / outside the settlement; lifestyle-banded candidate rows; first-placement population thresholds; hard limits; custom building types as data | a09, a10, d34, d36, b44 [ST; SH] | BASE | COVERED | §10.2 `RosterTables` (`perCapita`, `perOther`, `min`/`max`, `firstAtPopulation`, `shopProb`, `lifestyleBand`) and the loop, our own values; new classes are table rows (§7.6) | |
| B06 | docs | Virtual-population loop that minimises unemployment, with a toggle (`alwaysPlaceWorkplace`) to match the configured ratios instead | d34 [ST dependency_graph] | BASE | PARTIAL | §10.2 fixed-point loop "until the employed share stabilises"; the ratio-matching alternative is not offered | L |
| B07 | docs | Residential pools per lifestyle with deliberate rare outliers (hidden dens, cult fronts, a capped mansion) | d35 [SH presets] | BASE | COVERED | §10.2 "lifestyle-banded pools with rare outliers (weights ours)"; R5 keep-test | |
| B08 | docs | District-affinity pool tags (13 classes) and 17 district archetypes (incl. castle, keep, university, cathedral, shanty town, small-settlement centre, fallback) | d38, v11 [ST; SH] | BASE | COVERED | §2.5 `DistrictKind` data-defined; §4.5 typing scorer reads the roster's remaining demand with district affinities; §10.2 `tags` | |
| B09 | docs | Site and resource gates on buildings: minimum settlement size, requires coast / river / raw resources, outside-settlement flag; landscape toggles (fertile land, mines, quarries, fishing, logging) set the available raw resources ("no farmland → no farms, shops instead") | d36, d37, d46, d51, d52, a35, k19 [ST; SH presets; CR F24] | BASE | PARTIAL | §10.2 `requires: water / coast / route / farmland`, `firstAtPopulation`, the farmland gate; `LandUse` has `quarry`. Missing: raw-resource availability derived from the site (ore, stone, timber, fish), and the hand-off that places outside-settlement buildings (mines, quarries, lumber yards, hunting lodges) on their hinterland land — §4.9 does it only for farmsteads | M |
| B10 | docs, 2026 | Economy content: resource chains (82 provided / 66 used, simulation-only), items and services with prices (coinage), stock and services per building, global price edits | d39, d45, p35, v32 [ST; SH] | BASE (module) | MISSING | none of it in §10 or the schema; §10.2 only says FTG's 323 items are not reused; not in the module scope (§10.1), not in the Deferrals — an unrecorded scope decision | M |
| B11 | 2023, docs | Buildings → people: per-type resident rules (family, house share, single clergy), job postings filled from the unemployed with unfilled postings tracked; employment re-run on edit and re-roll | a41, d40 [ST] | BASE (module) | PARTIAL | §10.2 `HouseholdRow` size distributions; §10.3 households per plot and greedy profession ↔ workplace matching in the module; re-matching after edits is not stated | L |
| B12 | 2023–26, docs | Factions: goals, completion methods, secret flag, faction buildings, meetings, templates; named roles with member criteria merged by name; faction headcount reconciled with the building's job count | a38, p39, d44 [ST; SH] | BASE (module) | PARTIAL | §2.7 `Faction {kind, seats, turf, influence}`, `Institution.faction`; meetings in `@plat/sim` (§10.1); roles, criteria, goals and the reconciliation rule unspecified | L |
| B13 | docs | Government forces buildings (king / queen → castle, lord → keep, lesser nobles → manor house, reeve / sheriff → office; democratic → assembly hall and representatives); military share (guards, barracks) | d44, p05, a28 [ST] | BASE | PARTIAL | S2 "castle if lordship" (§4.2), "government type gates the castle as a table row" (§10.3), `InstitutionRow`, military / administration near the castle (§4.5); no government input in the blueprint beyond the `lordship` circumstance, and only the castle case is named | L |
| B14 | 2023, docs | Religion: pantheons of gods with worshipper distributions; temples per religion; practice share; religious staff share | a38, d44 [ST] | BASE (module) | PARTIAL | `Faction.kind = religion`, religious precincts as siting attractors (§4.7 S10b), "religions' meetings" in the module; the pantheon / worship model is unspecified | L |

### C. People and simulation

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| C01 | 2023–26, docs | People model: races (life stages, maximum age, heights, name generator), genders with pronouns and a directed partner matrix, race-pair partnering with child races and adoption, age groups; race / religion presets as content packs | a40, d41, d42, p39 [ST; SH] | BASE (module) | PARTIAL | §10.3 `derivePerson(seed, id)` "yields name, age, role and appearance from tables"; append-only dictionaries; setting packs later (D-6). Partner matrices, life stages and heights are unspecified | L |
| C02 | 2023, docs | Appearance templates: weighted per-race option tables, line templates with substitution, conditional lines (gender, age, value), fallback lines, article agreement | a39, d41 [ST; SH] | BASE (module) | PARTIAL | "appearance from tables" (§10.3); the template grammar is unspecified (the §10.4 Tracery-class engine could host it) | L |
| C03 | docs | Personality (Big-Five sentences, motivation, mannerism, hobbies), D&D-style stats with profession modifiers, education gated by class | d43, d45, a41 [ST; SH] | BASE (module) | MISSING | absent from §10 and the schema; not listed as out of scope — an unrecorded scope decision | M |
| C04 | 2023–25, docs | Relations: family-unit model (units of parents and children, kinship derived), friend groups, rivalries and relation types (business, romantic, religious rivals, affairs) | a38, b01, d45 [ST] | BASE (module) | PARTIAL | §10.1 "relations by the family-unit model" (named); friend groups and rivalries via §15.1 B6 (`@plat/sim`); no schema | L |
| C05 | 2023 | Events: ranked candidate scenarios per building from relations and factions, executable as state transitions ("Start event") | a38 [ST 79527117] | BASE (module) | PARTIAL | "events as templates" (§10.1, §10.3) — named only | L |
| C06 | 2023–25, docs | Schedules: per person type and day-set; hour ranges with a status; criteria → primary or default behaviour → (building matcher, sub-location matcher, verb); default schedules per profession; guest workers; opening hours and minimum-age gating; the simulation as a deterministic query per (day, hour) | a36, b09, d45 [ST; SH] | BASE (module) | COVERED | §10.3 schedule-as-query `whereIs(person, day, hour)` from profession templates, sub-locations per building class, opening hours and the calendar ("time skips are free") | |
| C07 | 2023, docs, wire | Sub-locations inside buildings (named, purpose capacities, tags such as table, pickup, deliver, performance, bath) and a room count per building (5 ordinary … 20 for a mansion) | a37, d45, v07 [SH; MS] | BASE (module) | PARTIAL | §10.3 "sub-locations per building class — slots now, rooms at stage 3"; capacities and tags unspecified | L |
| C08 | 2023–26, docs | Person types (working, unemployed, retired, studying, delegating = babies with a caregiver) and person-to-person references (carer / caree) whose dangling references broke the simulation | a41, k15, p39, d45 [ST] | BASE (module) | PARTIAL | §2.7 `Person {role, workplace}`; reference integrity is an invariant (§5.3); person types and caregiver-following unspecified | L |
| C09 | 2023–25, docs, wire | Calendar: hours per day, days per week, weekday names, rest days, a day-type override when jumping time; current day and hour persisted; hourly quantum; Next Hour / Time Skip; external calendar sync (weekday matched by name, then index; an unknown day gives a free schedule) | b35, k09, v32 [ST] | BASE (module) | COVERED | §10.3 configurable calendar (hours / day, days / week, rest days, weekday names); §11 bridge `SET_TIME` / `SIMULATE_TIME` | |
| C10 | 2026 | Window lights only in buildings with an awake adult (the render reads the simulation) | p18 [ST 147332188] | BASE (module) | COVERED | §8.2 `night` preset with the `lights` role; "lights from the module" (§15.1 D5) | |
| C11 | 2024 | Family-tree view (layered generations, elided expansion, re-root) | b02 [SH; ST] | BASE (module) | MISSING | no view over the family-unit model is specified | L |
| C12 | 2024 | Constrained person re-roll with field locks (relations and schedules excluded as non-local) | b08 [ST 101576411] | BASE (module) | PARTIAL | locks / pins on ids (§7.2) and `regenerate` on an id scope (§7.1); field-level locks inside one person are not stated | L |
| C13 | 2025–26 | Bulk people edits (job, workplace, schedule, relocation) and an advanced person search (type, race, gender, profession, workplace, age range) | b35, p39 [ST] | BASE (module) | PARTIAL | `setAttr` batches (§15.1 E2) and the `query` gazetteer (§11); person-search facets unspecified | L |

### D. Road-graph substrate and street growth

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| D01 | 2022, wire | Road network as an intersection-indexed planar graph: node table + edge list, connectivity by shared id (no epsilon geometry), typed edges, adjacency lists exactly consistent | a01, v04, d13 [ST 65223067; MS] | BASE | COVERED | §2.2 indexed half-edge subdivision on an integer lattice; rule 3 topology by index; typed half-edges | |
| D02 | wire | Roads persisted as chains of short edges (62 % degree-2 nodes); a "road" is an emergent run, not a record | a02, v14 [MS] | BASE | COVERED | beyond: `Way` records with class, width, surface, destinations and a `spine` chain (§2.4) | |
| D03 | 2022–26 | Crossing ⇒ a shared intersection splitting both edges, enforced at write time; snap to intersections and to the first crossing | a05, d14 [ST 75844005; docs map] | BASE | COVERED | §2.2 rule 2 `insertChain` (snap-round, split at every crossing, weld); §7.2 drawn geometry uses the same contract | |
| D04 | docs | Incremental lot detection: each inserted road re-walks the faces it touched (the split lot and the new lot); lots tracked with metadata (e.g. already used) | d13 [ST algorithm L89–93] | BASE | COVERED | §2.2 rule 2 (re-walk incident faces only; face ids stable; the part holding the anchor keeps the id) | |
| D05 | 2022 | Planar face extraction by a leftmost-turn walk (the fill tool); the walk escapes to "half the town" on non-planar generated topology | a04 [ST 65223067] | BASE | COVERED | faces are first-class (§2.2); planarity is a property of the kernel op list (§3.4); `pointLocate` for picking | |
| D06 | wire, docs, CR | Edge-type vocabulary: streets, main roads, suburb lot outlines, rural lanes, the map border, piers, the water outline, walls and fences drawn with road controls, invisible edges | a03, d15, k08, v48 [SH; MS; CR F9–F11, part 2] | BASE | COVERED | §2.4 L1 edge types (`way:<class>`, `wall`, `wall_gate`, `shore`, `bank`, `border`, `field_bound`, `district_bound`, `plot_line`, `party_wall`, `invisible`) — "FTG's 14 wire types generalised"; `pier` ways; fences are row F24 | |
| D07 | CR | Water outline and map border carried in the road graph so lot detection treats water as a boundary | k08 [CR F9, F10] | BASE | COVERED | §2.2 L1 edges include shorelines inherited from L0 and the map border | |
| D08 | V1 | Road growth V1: segments propose straight-ahead and left / right right-angle successors into a queue with validity checks; two phases (dense inner, outer); the signature 4-way crossroad blooming into a vaguely circular town | b23, c05 [ST 112861635] | BASE | COVERED | replaced: destination-routed arterials (§4.3) + staged queue growth (§4.4); the "vaguely circular" sameness is a rejected alternative (§4.4 alt. 2) | |
| D09 | V2 docs | Priority queue of proposals (lowest first; `next = current + spoke increase`, offshoots + 1), proposal state, branch after N segments with a left + right pair, per-class angle jitter | d16, b24 [ST settlement_layout; IN] | BASE | COVERED | §4.4 "The queue" (proposal fields, lowest priority first, branch after n segments with per-class probability, class step lengths) | |
| D10 | wire | Hard 15° per-vertex turn cap on streets and main roads (zero mass above 15°) | v15, k23 [MS; CR §4 row 7] | BASE | COVERED | replaced deliberately: a Gaussian on the rate of turn with curvature continuity, "no turn-angle cliff" (§4.4; §1.4 row; §13.5 metric) | |
| D11 | wire | Locally orthogonal junctions (median arm angle 90.02°, straight-through + side street common); degree-2 nodes bimodal (straight run vertices vs exact 90° block corners); flat global heading spectrum (each branch its own frame) | v16, v17, v18, k23 [MS] | BASE | COVERED | §4.4 perpendicular ± jitter branching (Continue) with T-preference; §4.3 junction rules (≥ 30°, merge < 8 m, Y → T); §13.5 arm-angle band 85–95° and heading entropy ≥ FTG's | |
| D12 | V2 docs, wire part 2 | Segment lengths by class: main-road steps L + 0.5; district-stage normal streets laid as independently jittered (L + 0.5)/2 segments; suburb streets at the configured 30 m; the form's metres are real | v47, k03, d10 [MS roadlength100; CR F3 settled] | BASE | COVERED | §4.4 class step lengths ("FTG's district streets persist at (L + 0.5)/2 ≈ 25–30 m, our tables start there"); §13.5 segment-length metric with the roadlength100 values | |
| D13 | docs | Road legality: not too close to other roads, not ending in water, lengthened or moved to snap onto an intersection; thresholds unstated | d13, k24, c04 [ST algorithm] | BASE | COVERED | beyond: explicit thresholds (§4.4: separation 40 / 60 / 80 m by regime, snap within 0.35 · step, collinear continuation within 6°, water only at an affordable bridging point, slope ≤ class limit) | |
| D14 | docs | Between stages: unconnected normal roads pruned, main roads trimmed back to the current perimeter | d17 [ST settlement_layout L23] | BASE | COVERED | §4.4 "prune dangling secondary chains shorter than one block width, trim arterials to the boundary (FTG)" | |
| D15 | docs | Initial-roads seed pattern at the centre: random, dead-end, single through-road, 3- to 6-way crossroad | d07, b24 [SH form; ST 123982784] | BASE | COVERED | replaced by destinations: the arterials leaving the plaza follow the requested or derived external bearings (§4.2 S3, §4.3), so one, two or n bearings give a dead-end, a through-road or an n-way centre | |
| D16 | docs | Branch types: Continue (perpendicular, then straight → a deformed grid) and Curve around origin (branches hold a fixed distance from the centre → concentric rings, annular-sector lots) | d18 [ST; SH GIFs] | BASE | COVERED | §4.4 "perpendicular ± jitter (FTG's Continue) or tangential to the centre (FTG's Curve around origin, kept as the `ringed` preset)" | |
| D17 | docs | Main-road spawning: probability that a branch of a main road is itself a main road; maximum new main roads per stage | d10, k07 [ST; CR F8] | BASE | COVERED | replaced: arterials routed between named destinations (§4.3); arterial class by betweenness (O4 c) | |
| D18 | docs | Vertical and horizontal branch-after-N counters (two orientation classes shape long-thin versus square district lots) | d10, d56, k06 [ST; CR F7] | BASE | COVERED | block proportions come from the regime's separation and block-depth bands (§4.4 regime table) and the branch-after-n spacing, then the district band stop law (§4.6) | |
| D19 | docs, V2 | Layout presets (Medieval europe, more twisty, American near-grid, Ringed, Ringed without suburbs); four morphologies from one algorithm (organic, grid with diagonals, radial-concentric, sprawling) | d04, b24 [SH; ST 112861635] | BASE | COVERED | §4.4 `american` / `ringed` presets on the same queue; §7.7 forms catalogue (`organic`, `bastide-grid`, `radial` …) and the planned ↔ organic intent (`growth.headingSigma`) | |
| D20 | V2, wire | Shallow-angle "sharp points", zero-length roads, 0.01 m edges (2.9 % under 5 m) | b24, v44 [ST; MS] | BASE | COVERED | §4.3 junction rules (≥ 30°, merge < 8 m); §3.2 `minEdge` 25 cm and `minAngleFace` 5°; §5.3 invariants | |
| D21 | V2 | Towns grow along the main roads (anisotropic outlines; ribbons radiating from the core) | b24, b26 [ST 120828892] | BASE | COVERED | §4.4 stage boundary as a level set of distance-cost (elongated along contours and routes); ribbon regime along arterials with a distance-to-gate kernel | |
| D22 | 2022, 2026 | Road classes in the editor: Small / Large (2022) → Road / Main road / Small road / Dirt road / Invisible | a03, d15 [SH] | BASE | COVERED | §2.4 `WayClass` (through … path, quay, pier, bridge, ford) with `surface` (paved / cobble / dirt / planks) and the `invisible` edge type | |
| D23 | users | Road names requested and never implemented in FTG | b44 [ST comments] | BASE | COVERED | beyond: §9 path labels for streets; names conditioned on destination or trade (§9, R16) | |
| D24 | docs, wire | Outer main roads extended to the map border (100 m steps) and a rural lane web | d29, v47 [ST; MS] | BASE | COVERED | §4.3 through-roads continue to the context margin at their bearings; §4.9 roads continue to the frame, farmsteads get a `track` | |
| D25 | docs | Suburb stage: small lots from the outset with buildings placed at once; invisible lot edges let buildings sit on the fringe; main-road lots parallel to main roads; offshoots grown from a perimeter ring road seeded with spokes, from main roads and from other offshoots; plot use as a Bernoulli draw (density 0.8); deliberate dead ends | d11, d28, b26, v14 [ST; SH; MS 83 dead ends] | BASE | COVERED | §4.4 suburb regime ("offshoot lanes seeded from perimeter spokes", cul-de-sacs without destination-bias termination, small lots from the outset with invisible lot edges, a density Bernoulli from the distance-to-gate kernel) + the ribbon regime | |
| D26 | docs | Suburb shape control: the main-spoke priority increase trades wide suburbs against long, narrow ribbon settlements | d11 [ST, SH 1cf7030dc5 vs 5aba8d7537] | BASE | PARTIAL | the suburb and ribbon regimes have no control over the wide ↔ elongated balance (the distance-to-gate kernel is fixed per preset) | L |
| D27 | V1 look | Named weaknesses of FTG's old look: uniform small blocks everywhere, uninteresting junctions, no landmarks, the town ringed by roads because no building sits on the outer edge | b04 [ST 99652534] | BASE | COVERED | granularity law by district and prosperity (§4.7 S10); T-preference and destination arterials (§4.3–4.4); landmark claims (§4.7 step 3); suburb plots on the fringe with invisible edges and a rounded perimeter (§4.4, §4.9) | |

### E. Districts

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| E01 | 2023 | Old district formation: lifestyle groups claim road-graph faces, grow into adjacent faces, else start a disconnected district; wasted space | a12 [ST 84680671] | BASE | COVERED | replaced: §4.5 grower over coarse faces (contiguous; merge floor) | |
| E02 | 2023 | Overall district (by lifestyle or major industry) with sub-districts (industries); buildings carry a preferred sub-district; the parent places its sub-districts in order, so industries clump | a13 [ST 84680671] | BASE | PARTIAL | §2.5 `venueMix`, the mixed-use floor (§4.5) and siting by district affinity (§4.7 S10b); no sub-district level — industry clusters inside a district emerge only from affinity scores | L |
| E03 | V2 docs | District lots from the stage growth; each lot typed from the remaining unplaced buildings and "what the lot is next to"; per-type logic: landmarks → divide → buildings → decorate | d19, b25, k14 [ST algorithm] | BASE | COVERED | §4.5 typing scorer (remaining roster demand, adjacency, prosperity, a random term), greedy from the largest; §4.7 claims → S8 → S10 → S11 | |
| E04 | docs | Minimum district area as a merge floor (10 ha / 7 ha in the capture); districts as unions of lots | d21, k05 [ST L144; CR F6] | BASE | COVERED | §4.5 `validatePatch` band 5–15 ha by rung with FTG's 10 ha floor as the anchor; faces below the floor merged into the neighbour | |
| E05 | docs | Number of districts: Less / Normal / More | d08 [SH form] | BASE | COVERED | §4.5 district count sub-linear in size (`≈ 3.5 · √(area_ha / 10)`) as a preset (§7.6) | |
| E06 | docs, 2026 | Residential order: the most populous district is placed first and nearest the centre (emergent default); upper → lower class order or its reverse is selectable | d22, p40 [ST 157283634; SH] | BASE | COVERED | replaced: prosperity field with centre / market drivers (§4.5) and a wealth-gradient-direction intent (§7.7) | |
| E07 | docs, 2023 | Shanty towns replace lower-class residential districts when the average lifestyle is squalid or poor, only after the first half of the settlement: dirt ground, dirt roads, fire pits, individually placed tents | d23, a25, k13 [ST districts L116, L121] | BASE | PARTIAL | §4.5 squalid / shanty type after the first half of the stages, outside the enceinte (FTG's staging rule); dirt `surface`; §15.1 C7 promises a small-tents site-plan row, but no tent arrangement, tent symbol or fire-pit furniture exists in §4.7 / §8 | L |
| E08 | V2, docs | District types: market (many ways to place markets), castle, park, waterfront, university, cathedral, keep, high street, high-end services, leisure, red light, industrial, residential by class; landmark complexes (groups of buildings) | b28, d38, v11 [ST; SH] | BASE | COVERED | §2.5 `DistrictKind` data-defined; complexes = institution claims with set-back compound site plans (§4.7 S10 step 3, S11) | |
| E09 | V2 | Districts own their decoration, layout and road style ("districts place roads according to their preferences"; road settings respected in inner district lots) | b25, b28 [ST 120828892, 123982784] | BASE (+ stage-2 slot) | COVERED | §2.5 `District.fabric` + `fabricParams`; granularity, site-plan and greenery tables keyed by district kind (§4.7, §4.9); the `FabricStrategy` slot (§4.6, §14) | |
| E10 | wire | District record: long name, contracted display name, label anchor, boundary ring, a one-line prose summary of its mix ("a waterfront district, but also contains industrial and park areas") | v08, v33 [SH] | BASE | PARTIAL | §2.5 District {kind, faces, boundary, venueMix, name, labelSpine}; a generated description of the district's mix is not specified | L |
| E11 | wire | District rings hug the built area; about half the buildings (suburbs, outskirts) lie in no district | v29, k04 [MS; CR F4, F13] | BASE | COVERED | beyond: containment 100 % by construction (§4.5; O11 b) | |
| E12 | 2023 | District information and demographics (building counts by type, resident statistics) | a16 [SH] | BASE | COVERED | `query` gazetteer (§11) and the statistics record (§13.2) | |
| E13 | V2, 2026 | District debug overlay and a Districts map layer | b28, b39 [ST; SH] | BASE | COVERED | §8.2 thematic layers keyed by attributes; districts as a toggleable group | |
| E14 | 2023 → 2026 | Re-roll district → "Regenerate area": delete buildings and decoration and regenerate with new people; settings (lifestyle, generation type, decoration, placement, modifier, material); drawn areas; re-roll as farmland | a18, p35 [ST; SH] | BASE | COVERED | §7.1 `regenerate` with a polygon scope and the four actions; `drawBoundary`; district parameters via `setAttr` / `assign` (a whole-neighbourhood assignment sets character and class mix, §7.7) | |
| E15 | 2023 | Faction turf shaping the map — impossible in FTG because factions are generated before and apart from placement | a07 [ST 84680671 comment] | BASE | COVERED | beyond: `Faction.turf` and faction seats as siting attractors (§4.7 S10b, §2.7) | |

### F. Blocks, plots and buildings

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| F01 | CR, docs | Three subdivision levels that must not be merged: district lot → block lots by inserted roads to a target area; block lot → building plots by recursive cuts; plot → building | k14, d20 [CR F17] | BASE | COVERED | L1 → L2 (S8 infill: blocks and lanes, §4.6) → L3 (S10 plots, §4.7) → L4 (S11 footprints) are separate levels of one subdivision (§2.2) | |
| F02 | docs | Divide-lots-to-area: straight inserted roads (of a chosen road type) split areas in two until all are under a maximum (regenerate default 10 000 m²) | d20 [ST regenerate_area L118–120] | BASE | COVERED | replaced: NG's bent cut with a straight-cut ladder rung (§4.6 ladder b, c); stop law = the district class's block band; FTG's straight roads named as the rejected option (§1.4 block-fabric row) | |
| F03 | 2023, docs | Street-frontage packing: a continuous ring of buildings on the lot perimeter, long axis ⟂ the street, abutting, an interior courtyard; the "anywhere in lot" option also builds along interior edges | a15, a19, d24, b41 [SH 84680671; ST regenerate_area L103] | BASE | COVERED | §4.7 S10 frontage-first strips ⟂ each frontage, residue typed `court` (the perimeter-block morphology), rear lanes where a block is deeper than two plot depths; rows with party walls (S11) | |
| F04 | 2025 | Recursive random lot → plot cuts: edge nearest the centroid, cut through the centroid (replacing the longest-edge midpoint rule), reflex-corner pre-cuts, narrow-section and sharp-angle filters | p01 [ST 133016301] | BASE | COVERED | replaced by ruling O5: frontage-first plots (§4.7 S10); the failure class it fought is closed by construction and invariants (§3.5, §5.3) | |
| F05 | 2026 | Shrink-then-split: the lot is inset, the inset ring becomes blocking edges, and perpendicular cuts from the frontage stop at it (no bend, no cross-lot coupling) | p03 [ST 164816716] | BASE | COVERED | §4.7 S10 step 4: plot depth = min(band depth, half the block's local thickness), side lines end at the rear line — the same decoupling; `insetRing` (§3.4) | |
| F06 | ≤ 2026 | The replaced 3-step bent cut (perpendicular at both ends, bend in the middle) and its intent: side walls ⟂ the road | p04, c02 [ST 164816716; CR C13] | BASE | COVERED | §4.6 bent cut for lanes (one corner at 0.5, perpendicular arrival); §4.7 S10 step 4 side lines as bent lot cuts ⟂ the frontage | |
| F07 | docs | An explicit plot level between lot and building; unused plots between buildings are decorated; suburb plot use as a Bernoulli draw | d24, d11 [ST] | BASE | COVERED | L3 plots and typed residue (§2.2, §4.7 S10 (6)); yard parts (§2.5); the suburb Bernoulli (§4.4) | |
| F08 | V2, docs | Placement modes: Dense (the plot is the building, wall to wall), Gaps (the same tiling inset so buildings do not touch; the default outside the centre), Individually placed (L / T / rectangle templates fitted into plots with open ground) | b27, d25, a22 [ST settlement_layout L77–79; SH] | BASE | COVERED | §4.7 S11 arrangements row / detached / compound, separation rule (party wall / slot / passage) and coverage from the site-plan table; density regimes dense core → gapped rings → ribbon (§4.2 S2) | |
| F09 | docs | Building-size modifiers: None / Small tents / Smaller (½) / Bigger (2×) | d26 [ST regenerate_area L97–101] | BASE | PARTIAL | building scale interpolates with prosperity (§4.7); a small-tents row is only promised by §15.1 C7; no per-district or per-regeneration scale knob (½, 2×) | L |
| F10 | wire | Ordinary footprints ≈ 10 × 10 m (median 103 m², p95 154), 90 % quads, rectangularity 0.98, a sheared minority (parallelograms, trapezoids, triangles) in awkward plots | v19, k02 [MS; CR B] | BASE | COVERED | §13.5 footprint band (ordinary houses median 60–160 m², "a sheared minority kept"); §3.2 invariants police validity, not regularity | |
| F11 | 2023 | Irregular orthogonal footprints (rectangle + L / T / U lobes), axis-aligned in the plot frame | a46 [IN images] | BASE | COVERED | §2.6 `OutlineBuildingGenerator` (rectangle or L / T composition aligned to the frontage) | |
| F12 | wire | Entrance point exactly on the outline, on the road-facing edge, ≈ 3 m from the road centreline; 109 buildings without one | v21, k23 [MS; CR B] | BASE | COVERED | §4.7 S11 entrance on the access edge 3 ± 1 m ("FTG's measured 2.99 m rule kept"); §5.3 every building has an entrance on an access edge | |
| F13 | wire | Setback: nearest vertex ≈ 2 m from the road centreline; about half of the buildings axis-locked to their street | v22, v23 [MS] | BASE | COVERED | §4.7 S11 setbacks from the site-plan table, footprints aligned to the frontage; O5 (c) side walls within ± 5° on ≥ 90 % (§15.2) | |
| F14 | wire | Shared walls rare (6.4 % of buildings share an exact vertex) — the terrace look comes from tight packing with small gaps; industry rows attached | v24 [MS; CR B] | BASE | COVERED | §4.7 S11 party walls in row classes (typed `party_wall` edges); §13.5 party-wall band with FTG's residence / industry shares as references | |
| F15 | wire | Block lots: median 441 m², 1.52 buildings per lot, 22.9 % empty, 38 % coverage; the same lot size in every class (the weakness) | v25, k10 [MS; CR F13] | BASE | COVERED | beyond: granularity law by prosperity (§4.7 S10 table), Spearman(prosperity, plot area) ≥ 0.8 (O18 a); `builtBlockShare` calibrated from FTG's 38 % (§4.2 S2) | |
| F16 | wire, docs, render | Landmark footprints as templates and shape codes: temples as 6- / 7-pointed stars and an octagon (350–661 m²), a 9-gon theatre, a cruciform keep with corner projections, an open 51 × 51 m market square | v20, d27, v39, b40 [MS; SH] | BASE | PARTIAL | §4.7 S11 institution site plans ("the claim's own template: keep by `lir`, church nave + tower, market hall"); §15.1 C9 defers non-rectangular landmark templates to the stage-3 interface, although silhouettes are a city-zoom signature in the base (the outline builder makes only rectangles and L / T) | M |
| F17 | V2 | Landmark-first: large buildings placed while the district lot is still large, then roads and lots around them | b25, d19 [ST 120828892; docs] | BASE | COVERED | §4.7 S10 step 3 claims (`claimSubFace`) before ordinary plots; castle claim at S3 (§4.8) | |
| F18 | 2023–25 | Empty-space backfill: the layout adds buildings (and their people) from the district identity; the content count is a minimum | a14 [ST 84680671] | BASE | COVERED | replaced: area budgets sized from demand (§4.2 S2) and the plan–fit–reconcile loop typing surplus capacity as yards, greens or vacant plots (§4.7 S10b) | |
| F19 | V2, 2025 | Buildings placed without surrounding roads (suburbs, farmsteads centred in a larger plot with a driveway) | b26, p12 [ST] | BASE | COVERED | §4.4 suburb regime (plots directly along offshoots); §4.7 S11 compound / detached; §4.9 farmsteads beside their fields with a `track` | |
| F20 | docs, 2023–26 | Material system: 11 building materials (wood, stone brick, thatch, tiles, slate …) as a per-stage default overridden per district and per building; temples always stone; custom colours; wall types (stone default, wood, sandstone); roof colours set before generation and per district | d05, d06, a23, p48, b29 [ST; SH] | BASE | PARTIAL | §2.6 `roof.material?`; §8.2 colour roles. No material rule table (by stage, district kind, class or prosperity), no wall-material field on `Enceinte`, and no per-district colour override | M |
| F21 | 2026, wire | Building record: name, type, specific type, description, religion, opening times, stock, services, sub-locations, resources; a 16-value category legend; room count; variant index | p35, v05, v06 [SH; MS] | BASE | PARTIAL | §2.6 `Building {class, use, entrance, heights, roof, occupants, assignment}` and names from the naming streams; description and opening times absent from the schema (stock / services are row B10) | L |
| F22 | 2025–26, wire | Degenerate-output gallery a subdivider must avoid (sliver fans, razor strips, concave / arrowhead plots, star buildings, 2.5 m² footprints, 1 m slivers, doorless buildings) | p02, v44 [SH; MS] | BASE | COVERED | §3.5, §5.3 invariants (min width / area / angle per class; every building with an entrance on an access edge); O5 (b), (f) | |
| F23 | 2025–26 | Fences: fenced yards (outline-only enclosures beside buildings, switchable in district decoration, removed with the wall tool); garden fences as the upper-class tell; stone fences drawn with the wall tool | p47, d55, a03 [ST comment; SH] | BASE | PARTIAL | §2.5 typed `YardPart`s (yard, garden, court, pen, forecourt …); no fence feature — no edge type, yard-boundary attribute or furniture kind | L |

### G. Walls, gates, towers and the castle

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| G01 | 2023 | Walls at build-progress checkpoints ("estimate percentage of buildings within wall", several rows → concentric historic rings) | a26 [SH 84680671] | BASE | COVERED | §4.8 an enceinte per walled growth stage; several enceintes as stage rows (§2.7 kinds) | |
| G02 | V2, wire | Per-stage wall placement (`placeWallAfter`, around all lots / around the stage's lots); the wall follows lot and district outlines (17 of 17 towers on the waterfront ring) as an open chain from the river bank to the coast | k12, d10, v27 [ST; MS; CR F15] | BASE | COVERED | §4.8 trace = the growth-stage boundary pulled to defensible ground, never across water except at a water gate; F-WALL snaps to the water outline (§5.2) | |
| G03 | V2 | A stage that "ends in a wall"; walled stage share | b24, d09 [ST 112861635] | BASE | COVERED | §4.4 the stage boundary becomes the S7 wall candidate; walled share 0.35–0.5 as a preset (D-2) | |
| G04 | 2023, V2, wire | Towers: round towers at direction changes (2023); scalable towers (2025); measured spacing median 39 m; only the tower chain is serialised, the band is drawn by the client | a27, b29, v27 [SH; ST; MS] | BASE | COVERED | §4.8 towers at trace vertices above a turn threshold and along runs at 35–60 m (FTG's 39 m as the reference); `Tower` with radius and heights; the wall band is an L3 face (§2.7) | |
| G05 | V2 | Walls split across rivers | b29 [ST 120828892] | BASE | COVERED | §4.8 water gate where a river passes; F-WALL ladder | |
| G06 | 2023, wire | No gate objects: streets cross the wall line with no gate drawn (ungated crossings) | a27, v40 [SH; MS] | BASE | COVERED | beyond: gates exactly at arterial crossings with exact N, excess arterials diverted to a gate; invariant "walls not crossed by streets except at gates" (§4.8, §5.3) | |
| G07 | V2 | Ring road immediately inside the wall; the wall encloses only the old town (a historical boundary); buildings inside use stone | b29 [SH 120828892/09] | BASE | PARTIAL | §4.8 setback band inside the wall; enceinte per growth stage (the historical boundary); wall → ring road conversion (§4.11). No intervallum lane is generated (IMPROVEMENTS names it an era toggle); material by district is row F20 | L |
| G08 | V2, 2025 | Moats and bypasses (planned); castle moat as an outward offset with a berm | b29, p06 [ST; SH] | BASE | COVERED | §4.8 optional `moat` water body from hydrology; bypasses = arterials diverted outside the wall (§4.8, F-WALL) | |
| G09 | 2025 | Castle district, only under a king / queen feudal government: random wall layout → fitted into the castle's district lot → gatehouse → keep and buildings → internal paths → cliffs / moats → connector road → surroundings → decoration (park with a perimeter path and random paths, plaza, buildings, cliff) | p05, d44 [ST 137812814] | BASE | PARTIAL | §4.2 S3 castle siting by score (inside / on the enceinte / outside) and government as a table row (§10.3); §4.8 claim → bailey inset → keep by `lir` → optional moat; castle ↔ plaza route (§4.3). Missing: gatehouse placement, internal paths, the decorated surround and the cliff skirt | M |
| G10 | 2025 | Castle geometry: a 5–7-vertex curtain with round towers at vertices and along runs, an inward gatehouse spur, an octagonal / rectangular / square keep, bailey paths, an optional inner ward | p06 [SH 137812814] | BASE | PARTIAL | `Gate.kind gatehouse`, `Tower.kind round / square / bastion` (§2.7), keep by `lir` (rectangular); octagonal keeps and an inner ward are unspecified | L |
| G11 | 2025 | The castle lands in the first ring when the first stage is large enough; a manually placed castle is the suggested route for a ringed city around a castle | p50 [ST comment 144226579] | BASE | COVERED | §4.2 S3 castle option inside / on the enceinte / outside the intended first ring; `assign` + `regenerate` places a castle (§7.4) | |

### H. Water, coast, bridges and harbours

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| H01 | 2022–26, docs | Rivers are crossable by bridges, oceans are not: roads extend into bridges over rivers and terminate at oceans (a road-legality constraint) | a29, d46 [ST 75844005; docs water] | BASE | COVERED | §4.3 water impassable except at crossing sites (bridge cost by span); §4.4 legality rejects water unless a bridge is affordable at a bridging point | |
| H02 | 2022–26 | Water configuration generated or manually drawn (river shape, river path, ocean shape, demolish), with a protected disc at the settlement origin and the size set before drawing | a30, b12, d50 [ST; SH GIFs] | BASE | COVERED | §7.1 `drawWater` inserted before S1's descent (§7.2); S3 places the centre relative to the water (§4.2), so a protected core disc is not needed | |
| H03 | 2024 | River path tool: a centreline smoothed by iterations and offset to a width in metres | b12, d50 [ST 103668405; docs L205] | BASE | COVERED | `drawWater {points, widthCm}` (§7.1); Chaikin smoothing (§3.1, §4.2 S1); offsets through Clipper2 (§3.1) | |
| H04 | docs | Coast in two arms grown from near the centre to the map edge, each configurable; overall shape (smooth / gentle / sharp curves) then detail erosion (none / bays / deep bays / rough / jagged); "more extreme" | d47 [ST water L34, L62–63] | BASE | PARTIAL | §4.2 S1 coast from a bearing and an intent (bay / headland / straight / fjord / islands) through one closed-outline routine with domain-warped fBm; per-arm configuration and the detail-shape vocabulary are not specified | L |
| H05 | docs | "Ease into detail": coastal detail damped near the settlement so the harbour sits in a calm stretch | d47 [ST] | BASE | COVERED | §4.2 S1 "an amplitude envelope that damps detail near the town (FTG's 'ease into detail')" | |
| H06 | docs, 2025–26 | Bay / headland classification with per-class decoration: bay texture weights (empty, sand, pebble, rocks), bay rocks, an inset texture band (cliff, forest) on headlands or the whole edge, headland rocks; decoration mixed per shoreline segment | d47, b32, p26 [ST; SH] | BASE | PARTIAL | §4.2 S1 (7) bank classes per shore segment (beach / rock / cliff / quay / marsh) from slope and exposure; §2.3 `bankKinds[]`. The bay-versus-headland classification and the per-class weight tables are not specified | L |
| H07 | 2025 | Coast decoration keeps buildings and farmland back from the water ("too close to the ocean edge") | b32 [ST 130937474] | BASE | PARTIAL | water ∩ footprints = ∅ (§5.3); no shore setback band for plots or fields is specified | L |
| H08 | 2026 | Islands: coastal / islands option, one arm instead of two, rocky / cliff / beach defaults, diverse shapes; hand-drawn islands between two ocean shapes | p25 [ST 153121107] | BASE | COVERED | §4.2 S1 the same routine with a closed base curve makes islands; the `island-city` form (§7.7) | |
| H09 | 2026 | One randomised closed-outline routine reused for pond, lake, island, coast arm and moat | p24 [ST 153121107; IN] | BASE | COVERED | §4.2 S1 "one closed-outline routine" for coasts, lakes, ponds, islands and the floating-island outline (O1) | |
| H10 | 2026 | Ocean versus river classified by the share of a body touching the map border; lakes lumped with rivers | p27 [ST 153121107] | BASE | COVERED | beyond: typed `WaterBody.kind` (sea, lake, river, tributary, pond, moat, estuary, harbour basin, canal) from hydrology (§2.3) | |
| H11 | docs | Rivers: shape (straight / gentle / sharp); one path, then convergent (upstream) or divergent (downstream) branches from any existing stretch; a branch that meets a river joins it, forming an island, and stops; width in metres; acknowledged failure: a river bending back into the ocean | d49 [ST water L174–209] | BASE | PARTIAL | §4.2 S1 rivers by descent (cannot bend back into the sea), tributaries from secondary inlets, river islands by branch-and-rejoin, width `w0 · acc^0.4`; divergent branches that do not rejoin (distributaries) are excluded — the estuary is a width rule only, per `_critic.md` C15 | L |
| H12 | 2026 | Initial water compass direction: the coast toward it, rivers perpendicular when both are requested | p42 [ST 157283634] | BASE | COVERED | §4.2 S0 / S1 site request with a coast bearing and a river inflow bearing | |
| H13 | 2022–25 | Lakes, branching rivers and islands in generated water; two drawn oceans forming an island no longer break generation | a31, b12 [ST] | BASE | COVERED | §4.2 S1 lakes from sinks, river islands; land as multiple components, each given uses (O14 g) | |
| H14 | 2026 | Ponds in the drawing tool — water bodies carry a decoration class independent of their geometry class | p31 [ST 153121107] | BASE | COVERED | `WaterBody.kind` + per-segment `bankKinds` (§2.3) | |
| H15 | wire | Water outlines resampled at 50 m and smoothed at draw time; rivers ≈ 31 m mean width | v26 [MS; CR B] | BASE | COVERED | §13.5 water metric (outline step ≤ 25 m); river width calibrated on FTG's ≈ 31 m (§4.2 S1) | |
| H16 | 2022–26 | Bridges with a minimum spacing in metres (default 100 → 40), drawn as the road continuing over a small deck, a quay or landing at the main crossing | a32, k16, d49 [ST; CR F19] | BASE | COVERED | §4.2 S1 (5) crossing sites with a minimum spacing (FTG's 40 m as the default); §4.8 bridges ⟂ the flow ± 10°, fords where the class allows | |
| H17 | 2025, docs | Harbours inside waterfront districts: a template basin (rectangle, semi-octagon, semi-hexagon, L wide / narrow) carved from the district; harbour-wall shape (one or two arms, following the coast or sticking out) and type (wall, wall and rocks, detached breakwater); pier shape (none, straight, branching) for harbour and open coast; pier material | b33, d48 [ST; SH] | BASE | PARTIAL | §4.8 a basin carved from the waterfront district (a template shape scaled to port demand), moles, quays as `quay` ways, piers as `pier` ways at 12–20 m; the harbour-wall shape / type vocabulary, branching piers, open-coast piers and pier material are unspecified | L |
| H18 | wire, render | Piers stored as edges (12 × 75.6 m, parallel, 15 m apart); rock rubble scattered along the moles; sheltered harbour water drawn lighter | k08, v09, v40 [MS; SH] | BASE | COVERED | `pier` ways (§2.4, §4.8 with FTG's ≈ 75 m as the reference); `instances(symbol, stream)` for rubble and a water role per basin in the `lit` preset (§8.2) | |
| H19 | 2026, render | Water rendering: depth ramp, foam (strong on the ocean, weak on rivers), a subtle texture; beach bands, rock glyphs, cliff patches | p28, b40, v35 [ST; SH] | BASE | COVERED | §8.2 `lit` preset ("water depth ramp and foam line"), `bands` program; bank classes (§4.2 S1) | |
| H20 | 2024 | Stacked ground layers z-fighting, fixed by polygon subtraction into a planar partition | b19 [ST 106664214] | BASE | COVERED | beyond: the ground is one planar subdivision by construction (§2.2 L0) | |

### I. Hinterland, farmland, forests and landscape features

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| I01 | 2025–26, docs | Farmland layouts: Default (by size and landscape; climate override), Farmsteads (families live on them; all space left after forests and features), Around perimeter (smaller fields close in), Around rivers (falls back to the perimeter) | p12, d51, k18 [ST overview L115–122; CR F21] | BASE | COVERED | §4.9 field-system presets (open-field strips, FTG-style enclosed fields with hedgerows, farmsteads with driveways, perimeter, along rivers, the sector look); land use sized to the population (O14) | |
| I02 | V2, 2025–26 | Field geometry: a complete planar partition of the outer ring with roads as seams, strip fields along roads, field size growing with distance, hedgerow trees on the boundaries | b30, p13, d29 [SH; ST] | BASE | COVERED | §4.9 the context margin partitioned by the extended arterials and the field-system preset; land-use rings by distance | |
| I03 | docs | Outer settlement: estimate the lots needed for outside buildings and features, divide the outside lots to that count, cluster similar features next to each other | d29 [ST algorithm L127–134] | BASE | PARTIAL | §4.9 arable per capita from an era table, farmsteads beside their fields; neither a count-driven division nor the "similar features together" clustering rule is specified | L |
| I04 | 2022–26, wire | Crop types per field: a tint plus a per-field hatch angle; six crop groups matching the six available raw resources | a44, b30, p14, v25 [SH; MS] | BASE | COVERED | `LandUse.kind` + `furrowAxisCdeg` (§2.7); clipped hatching at a per-face angle (§8.2–8.3) | |
| I05 | 2025 | Field edges that border open ground feathered into it (hardware-gated) | p16 [ST 144226579] | BASE | MISSING | no feathered-edge paint program in §8.2 (grep: no "blur" / "feather") | L |
| I06 | 2025 | Farmsteads: the house centred in a larger plot with a driveway; some residents live there, farmhands commute | p12 [ST 144226579] | BASE | COVERED | §4.7 S11 set-back compound (farmsteads with a driveway); §4.9 farmsteads beside their fields with a `track`; households on plots (§10.3) | |
| I07 | 2025, docs | Forests as decoration areas (shape + density) filled at render; editable tree areas; density multiplier; forest trees cast shadows | p09, d52, b31 [ST] | BASE | COVERED | §2.7 `Greenery {kind wood …, density, treeStream — instances at render, never stored}`; §4.9 woodland by distance band; `drawGreen` (§7.1) | |
| I08 | 2026 | Tree areas clipped by water (a forest with a stream and lakes) | p11 [SH; CR partial] | BASE | COVERED | faces with holes (§2.2); the Poisson domain clipped to any polygon with holes (§3.1) | |
| I09 | docs, 2025–26 | Tree placement by part: street trees along lot edges in some districts, hedgerows between fields, random in forests, a low-density ambient scatter across the landscape, a shoreline band round ponds, clumped copses | d12, p10, p22, p23 [ST; SH] | BASE | PARTIAL | §4.9 avenues (tier-1 ways in rich / planned districts), hedgerow lines, woods, yard planting; ambient landscape scatter and shoreline bands are not specified, and street trees outside avenues have no rule | L |
| I10 | wire | Individual trees not Poisson (nearest-neighbour minimum 0.14 m), sprite variants round-robin, scale always 1.0 | v28, v10, v46 [MS; CR] | BASE | COVERED | beyond: §4.9 trees at render with spacing rules per kind (orchard grid, avenue line, garden Poisson, warped Poisson in woods), crowns in metres; Poisson k = 50 (§3.1, D-11) | |
| I11 | docs, wire | Tree species with separate inner and outer proportions (deciduous, coniferous, palm) | v12, d53 [ST; SH request] | BASE | MISSING | no species model: §4.9 kinds are land-use and greenery kinds, crowns are one style program | L |
| I12 | 2026, docs | Outside decorations: ponds, copses, stone circles, ruins — procedural, several linked to the road network by generated trails, fields and forest generated around them, counts random by climate and size | p22, d54 [ST 147332188; docs] | BASE | PARTIAL | §15.1 C16 claims "decorations as typed symbols / faces (ponds, copses, stone circles, ruins with tracks — a decoration table)", but no body section specifies them; ponds exist as L0 water only | M |
| I13 | docs | Reserved natural area: part of the land kept wild, neither farmed nor forested | d52 [ST overview L143] | BASE | COVERED | `LandUse.kind reserve` (§2.7); land-use rings ending in wild wood; the wildness control (O14 full, §15.2) | |
| I14 | 2025 | Settlement perimeter computed after the suburbs, expanded (garden space behind the houses) and rounded; farms and features are placed outside it | p17, d11 [ST 144226579] | BASE | COVERED | §4.9 "the settlement perimeter = the last stage boundary offset and rounded (FTG C17)" | |
| I15 | 2026, docs | Climate presets: temperate (deciduous / coniferous / mix), desert (sand ground, palms, fields hugging rivers, flat roofs, inverted road colours), polar (permanent snow, no trees unless forests); the climate changes the default farm layout | p21, d53, a48 [ST; SH] | BASE | PARTIAL | §7.7 biome as a circumstance; §15.1 C16 "climate as a circumstance + style preset (should-have depth)"; no climate table (ground cover, tree species, farm default, roof form) in §4.9 or §8.2 | L |
| I16 | 2023–26 | Hedgerows drawn as rows of tree glyphs along field boundaries | a45, v36 [SH] | BASE | COVERED | `Greenery.kind hedgerow` lines (§2.7); hedgerow instances in the `lit` preset (§8.2) | |

### J. In-town greenery, decoration and open space

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| J01 | 2023, docs | Decoration hierarchy district → lot → plot → building: ground textures behind built plots (grass, lawn, dirt, paving), lot decorations for lots with no buildings (park, park with fountain, plaza, plaza with fountain / well, dirt), lot-edge trees, waterfront edge options | a21, d55 [SH; ST districts] | BASE | COVERED | §4.7 S10 residue typing (court / yard / green / vacant) and S9 `square` faces; §4.9 greenery rules (parks, greens, yard planting, avenues); ground cover as style roles keyed by `use` and district in the `lit` preset (§8.2) | |
| J02 | 2023, docs, wire | Weighted plot-decoration rows (one row applied to all unused plots of a lot); singletons placed once in an unused plot (well, fountain, bandstand, statue, monument, campfire); equal counts from a deck draw | a21, d55, c03, v09 [ST; SH; CR addendum] | BASE | PARTIAL | §4.9 yard-planting rows and the "tree by the well" pin rule; `Pin` kinds (well, fountain, large tree, cross, shrine, pump, gallows, PART II); `deck(table)` exists (§6.1). Bandstand, statue, monument and campfire have no kind, and the weighted per-lot furniture row is not specified | L |
| J03 | docs | Per-class decoration profiles (lower: park or plaza + trees; middle: well plazas, bandstands, statues; upper: fountain plazas, street trees, lawns and garden fences; industrial and waterfront: paved ground, fences; shanty: dirt, fire pits) | d55, a23 [SH request; ST] | BASE | COVERED | §4.9 greenery rule table keyed by band and district kind (park area per 1 000, avenues, formal gardens, "little" in poor quarters), interpolated along the prosperity value; furniture detail is row J02 | |
| J04 | 2023, V2 | Area colour and the density gradient emerge from plot ground textures and placement phases (beige core, green suburbs), not from painted district fills | a24, a45 [IN; SH] | BASE | COVERED | §8.2 roles keyed by `use`; density regimes by growth stage (§4.2 S2, R4) | |
| J05 | V2, CR | Market stalls: small coloured tents around a market hall in market districts (the same glyph as shanty tents) | b16, k13 [SH 106664214/09; CR F16] | BASE | MISSING | no stall symbol or placement rule; §4.7 has only the institution template "market hall" (grep: no "stall") | L |
| J06 | render, wire | Plazas and market squares as large paved voids formed by the surrounding plots | a45, v38 [SH] | BASE | COVERED | §4.7 S9 `square` faces sized from population; typed residue | |

### K. Rendering and style

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| K01 | wire, 2024–26 | Renderer: one Three.js scene of merged vertex-coloured geometry, BVH picking, render on demand (no idle 60 fps, hence no animation), progressive draw while loading, web workers for building render, tiered defaults by device power | v01, b38, p28, p37 [SH profiles; ST] | BASE | COVERED | §8.1 display list + §8.5 backends (Canvas2D tiles re-rasterised only on change, optional WebGL2), `Backend.pick` over the index (§14), per-band detail budgets by hardware tier, incremental delivery | |
| K02 | 2024–26, docs | The 2-D map is the 3-D scene flattened; roof modes Flat / roof-shape texture / 3-D roofs (computed each render, not stored) / Flattened 3-D; the old rectangular texture kept as the low-power default | b14, d30, p08 [ST] | BASE | COVERED | §3.1 straight-skeleton roofs cached per entity, not per render (§15.1 D3); §8.2 `roof` and `texture + light(dir)` programs; tiers (§8.5) | |
| K03 | 2024 | Straight-skeleton roofs: hip natively, gable by post-processing, per-face flat shading keyed to orientation | b14 [ST 103668405] | BASE | COVERED | §3.1 skeleton built in-house with typed downgrades (hip-from-OBB); §2.6 roof kinds gable / hip / skeleton; §8.2 lighting program | |
| K04 | 2023–26 | One fixed light (upper left) with soft drop shadows under buildings, trees, walls and piers | a45, b40, v39 [SH] | BASE | COVERED | §8.4 shadow pass (drop mode first, projected from heights; off by default by owner ruling); soft drop shadows in the `lit` preset | |
| K05 | 2025–26 | Sun controls (direction, height, colour, hemisphere, sunrise direction, sunrise / sunset hours), shadow resolution, a moving sun through the day, night | p08, p18 [ST; SH] | BASE | PARTIAL | §8.4 `ShadowPass(layer, sun)` with a sun vector (fixed in the base) and the `night` preset; a time-of-day sun path and the sun controls are unspecified | L |
| K06 | 2026 | Weather (clear, cloudy, snow with clear or cloudy skies — cloud removes shadows) and seasons (deciduous trees re-skinned per season; roads stay brown in snow for legibility) | p19, p20 [ST; SH] | BASE | PARTIAL | season and weather exist only as circumstances (§7.7) and one `night` style file; no seasonal or weather paint programs (IMPROVEMENTS R13 lists them as reference strengths) | L |
| K07 | 2025 | Post-processing looks (greyscale, sepia, tint, pixelation, dot screen, scanline, crosshatch with noise, vignette) on the 2-D map, the 3-D view and PNG export | p07 [ST 137812814] | BASE | PARTIAL | §8.2 has a `vignette` program and `parchment` / `bw-print` style files; §15.1 D6 cites "§8.5 WebGL2 post hooks", but §8.5 specifies no post-processing hook | L |
| K08 | 2023 → 2026 | Palette era ladder and the sampled Sept-2026 palette (sea tones incl. sheltered harbour water, beach and foam, pasture, ploughed and wheat fields, forest, lawn, paving, wood and stone building ramps, wall band, pier bars) | a45, b40, p44, v35, v34, k20 [SH; CR F25] | BASE | COVERED | §8.2 `lit` preset with our own values (FTG's palette is its creative content, §17); named colour roles cover every feature | |
| K09 | 2024–26, wire | Roads as filled bands with a darker rim, a centre stripe (2024), widths by hierarchy (main ≈ 2 × alleys), mitred corners, filled junction polygons / junction discs sized by the incident classes, round caps at dead ends; rural tracks thinner and warmer | b10, v37, p44 [ST; SH] | BASE | COVERED | §8.2 `casing` and `fill(corridor)`; corridors and junction wedges are faces (§4.7 S9), so junctions are filled polygons by construction; widths by class (O4 c) | |
| K10 | render, 2024 | Ground as a painted raster with per-surface noise; tiled textures (grass, lawn, dirt, paving, sand) with custom solid colours | v36, b13 [SH; ST] | BASE | COVERED | §8.2 `texture(tile, tint) + light(dir)` in the `lit` preset | |
| K11 | render, 2025 | Tree crowns: lobed blobs with outline, highlight and shadow, seven variants, per-instance colour variation | a45, v41, p09 [SH; ST] | BASE | COVERED | §8.2 `crown(lobes, jitter)` with instances from the `render.trees` stream keyed by id | |
| K12 | 2023, 2026, wire | Building-type overlay (16 categories with a legend) and user-definable map layers (colour + matcher rules on type / specific type / building; built-ins; per settlement; defaults in presets); the thematic mode desaturates the base map | a45, p33, v06 [SH; ST] | BASE | COVERED | §8.2 thematic layers as style overrides keyed by entity attributes (a data row); legend generated from the symbol registry (§9) | |
| K13 | 2026 | Favourite-people layer (live positions as time runs, one colour per person or building) and favourite buildings with per-building colours | p33 [ST 159738553] | BASE (module) | PARTIAL | thematic overrides by attribute (§8.2) and `whereIs` (§10.3); live people positions as a map layer are unspecified | L |
| K14 | 2024–26 | Selection highlight, VTT-highlighted building outline, public map pins | b42, b36 [SH; ST] | BASE | COVERED | §9 annotation layer with numbered markers; bridge `PIN` / `SELECTION` events (§11) | |
| K15 | 2024 | Full 3-D map view and a first-person street view (an unstable toy) | b15 [ST 103668405] | BASE | COVERED | declined by recorded decision: IMPROVEMENTS "no oblique or 3-D default view" (R13 restraint) and §15.1 D8; glTF export from model heights instead (§11) | |
| K16 | 2024 → 2026 | Height maps (a noise raster at its own resolution, regenerable from a seed) prototyped and shelved (no 2-D presentation, road integration hard); mountains, cliffs and ravines unsupported | b17, p49 [ST 106664214, 120828892] | BASE | COVERED | beyond: §2.3 terrain raster in metres per rung from the seed (§4.2 S1) with hill / spur / valley / terrace / cliff / ravine primitives, feeding S4 / S5 costs; relief tiers as should-haves (O12 extras) | |
| K17 | 2024 | 3-D terrain tessellated on the height grid; ground polygons re-triangulated on one global lattice | b18 [ST; SH] | BASE | COVERED | 3-D is an export (§11 glTF terrain as a heightfield mesh; `earcut`, §3.1) — lattice alignment matters only there | |
| K18 | 2025, docs | SVG renderer option; SVG export simplified (trees simplified, textures lost) | p08, d31 [SH; ST] | BASE | COVERED | §8.5 SVG backend (layered, ids preserved, instances as `<use>`) | |
| K19 | 2026, render | Legibility choices: roads kept dark in snow, desaturated base under thematic layers, haloed labels over brown and green grounds | p19, p33, b34 [SH] | BASE | COVERED | §8.2 style constraints (minimum luminance contrast on 100 % of styles; halo program) | |
| K20 | render | Wall drawn as a crenellated slate band with round tower discs (3-D: a tall band with rectangular towers) | a27, v40, b15 [SH] | BASE | COVERED | §8.2 `ink` wall with round towers and gate bars; `lit` "stone-textured wall band with round tower nodes" | |
| K21 | docs | Background layer order: background → water → below road → above road | d31 [ST map] | BASE | COVERED | §8.2 layer order is data per band | |

### L. Labels, names and map furniture

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| L01 | V2, docs, wire | District labels: serif, heavy halo and shadow, arced along a curve following the district, sized by importance; modes Flat / Rotated / Arced; zoom-invariant option; custom scale | a45, b34, d31, p08, v42 [SH; ST] | BASE | COVERED | §9 area labels on hole-aware skeleton spines, per-glyph small caps with a halo, size ∝ √area within a band; straight and OBB-arc fallbacks; label sets per zoom | |
| L02 | wire, V2 | No street names and no building labels on the map (names live in search and dialogs); minor named places; building labels only at high zoom | v42, b34 [SH] | BASE | COVERED | beyond: path labels for streets at district LOD, point labels for landmarks, per-zoom label sets (§9) | |
| L03 | 2023, 2026 | District names built from weighted name-part tables drawn from the sub-district vocabulary and from detected landmarks (wall, tower, gate, dock, market) | a17, p32 [ST 84680671, 157283634] | BASE | COVERED | §9 / §10.4 names conditioned on the model (docks named for the water, a gate ward for its gate — R16); `namingFeature` (§4.5) | |
| L04 | 2023, wire | Folk contraction ("erosion") of names over time (Hamlet Tower → Hamower; Rustic Village → Ticwick) with the original kept for the description | a17, v08 [ST; SH] | BASE | COVERED | §10.4 folk contraction as an EVO event; a shorter name form is also an F-LABEL rung (§5.2) | |
| L05 | 2026 | Syllable counts in name parts; nicknames of at most three syllables | p32 [ST 157283634] | BASE | COVERED | §10.4 syllable generators; "≤ 3 syllables" a parameter | |
| L06 | 2023, docs | Personal-name generators per race / culture (generic, rough, draconic, fair, homely, infernal, tough, Old English / French / German / Russian) and uploaded custom name lists | a40, d41 [SH; ST] | BASE (module) | PARTIAL | §10.4 one original English-fantasy grammar and syllable / Markov generators over our own corpora; setting packs later (D-6); per-culture generators and user-uploaded lists (a user corpus) are unspecified | L |
| L07 | 2026, wire | Scale bar stepping with zoom, metres / feet switch, a 2 m / 5 ft grid cycling off → light → dark, whose thin lines vanish when zoomed out | p34, v43 [ST 159738553] | BASE | COVERED | §9 furniture: scale bar metres ↔ feet, a grid at a round ground distance that fades below its legibility zoom ("FTG's 'too thin' avoided"), VTT 1.5 m / 5 ft option | |
| L08 | 2024–25 | Ruler (distance measuring) — built to find the scale bug, then shipped as a product tool | b20, b39 [ST 106664214, 120828892] | BASE | MISSING | no measuring tool in §7–§9 or §14 (`grep -w ruler`: 0 hits); IMPROVEMENTS R10 lists "a ruler" among the properties a rewrite must keep | M |
| L09 | render, 2023–26 | Legend card, building search box, layer dropdowns, clock card, name plaque | v43, b42, p44 [SH] | BASE | COVERED | §9 legend from the symbol registry and title; gazetteer `query` (§11) for search; `@plat/app` panels | |

### M. Editing and regeneration

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| M01 | 2022–24 | Building-level layout editing: Place single, Draw (hand-drawn footprints, incl. concave C-shapes), Paint, Fill dense, Move, Swap, Demolish; move / swap buildings (2022); CTRL-hover delete | b13, a42 (75844005 list) [ST; SH GIF] | BASE | PARTIAL | §7.1 covers paint (`setAttr` colour / roof), demolish (`delete`, `convert: demolish`), vertex moves (`moveVertex`), splits and joins, and a one-building `assign` + `regenerate`; placing a new building otherwise rests on the conversion `build(...)` whose signature is left open (§4.11); no event takes a hand-drawn footprint polygon (the drawing events cover ways, water, walls, greens and boundaries only), and swap / fill-dense have no atomic event | M |
| M02 | 2022–26 | Editor snapping in world space around the cursor with a snapping-strength control; snap to intersections and first crossings; improved intersection snapping | b11, d50, p29 [ST; SH] | BASE | COVERED | §7.4 drawing tools with snapping (first-crossing split, weld) and dry-run validation; the strength control is an app setting | |
| M03 | 2022–26 | Fill tool: click inside a road-enclosed face to repaint its ground or fill it with water | a04, d50 [ST; SH GIF] | BASE | COVERED | faces addressable by `pointLocate` (§3.4); `setAttr` on the face's use / land use (§7.1) | |
| M04 | 2024 | Brushes: a tree brush, a building colour and roof-shape (hip / gable) brush, a background-texture brush with custom colours, a texture-region edit tool | b13 [ST 103668405] | BASE | PARTIAL | `setField` brushes exist for prosperity, density, greenery and terrain (§7.1–7.2) and per-entity `setAttr`; no area brush paints roof kinds, colours or ground cover, and no tree brush exists | L |
| M05 | 2026 | Regenerate area (drawn areas; re-roll as farmland) and bulk edit buildings (edit fields; regenerate contents keeping footprints); regenerated areas came out denser than the original ("too snug") with no density or padding control | p35, p36, p15 [ST 157283634, 159738553] | BASE | COVERED | §7.1 the four actions on a polygon scope; faithful regeneration tested against a fresh generation (O9 c names FTG's "too snug" as the failure); `setAttr` batches; locks keep footprints while contents re-derive (§7.2) | |
| M06 | 2025–26 | Regeneration "cannot be undone"; district re-roll destroys hand-authored content | b44, p35 [ST] | BASE | COVERED | beyond: undo by inverse events or snapshots (§7.4); locks survive regeneration (§7.2) | |
| M07 | 2023 | Re-roll a building: as a workplace the settlement's unemployed are hired, as a residence new families are created | a41 [ST comments] | BASE | COVERED | `regenerate` on an id scope (§7.1); households re-derived per plot; matching in the module (§10.3) | |
| M08 | 2026 | District areas drawn instead of picked lot by lot | p35 [ST 157283634] | BASE | COVERED | `drawBoundary` inserted before S6 (§7.1–7.2) | |
| M09 | 2023–26 | Notes on buildings and people (public / private), public pins synced live into the VTT | b36, v32 [ST] | BASE | COVERED | §9 annotation layer; `setAttr`; bridge `PIN` events (§11) | |
| M10 | 2026 | Editor disabled below ≈ 900 px screen width | p50 [ST comment] | BASE | COVERED | beyond: O16 (g) editor usable at 768 px (§15.2) | |

### N. Export, formats and integration

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| N01 | 2023–26 | GeoJSON export of backgrounds, edges, buildings and outlines in metres; districts missing | a42, d31, k21 [ST export L23–24; CR F26] | BASE | COVERED | beyond: §11 GeoJSON per layer in a local metric CRS, one feature per entity, districts included | |
| N02 | 2023–26 | SVG export (simplified) and PNG export respecting layers and render settings | a42, b37, d31 [ST] | BASE | COVERED | §11 layered semantic SVG; PNG / tiles at any DPI with per-layer masks | |
| N03 | 2024–25 | CSV export of people; a building JSON export that cannot be re-imported (export ≠ edit format) | b37 [ST comments] | BASE | COVERED | §11 CSV / statistics (people, buildings, plots); native round trip byte-identical (O11 c) | |
| N04 | 2023 | Planned upload of a JSON manifest of wanted buildings and people instead of an API | a42 [ST comment 75844005] | BASE | COVERED | §11 embedding API; `ContentProvider` for host rosters (§14); assignments (§7.7) | |
| N05 | 2023–26, module source | Foundry VTT integration: an iframe of the live instance on a 5 000 × 5 000 scene (1 unit per metre); an origin-checked `postMessage` protocol with a `stateId` optimistic-concurrency token fanned out to all clients; SIMULATE_TIME; building / district / faction / pin / favourite / location events; journal links; a party-location marker | a42, b36, v32 [ST] | BASE | COVERED | §11 `postMessage` bridge (`{type, stateId, data}`, origin-checked, optimistic concurrency) with BUILDING / DISTRICT / PERSON / FACTIONS / PIN / TIME / LOCATION events and SET_TIME / SIMULATE_TIME / SET_LOCATION commands; VTT exports with journal links from the gazetteer | |
| N06 | 2025 | Roll20 browser extension (chat channel as the sync bus); no token layer possible over FTG's map | b36 [ST 127128581] | BASE | PARTIAL | beyond FTG for scene data: native VTT exports (Foundry JSON, Universal VTT) with walls, doors, lights and regions, one scene per layer (§11); but a live embedding where iframes are forbidden (FTG's Roll20 extension) is not provided — hosting and sync are deferred | L |
| N07 | 2022–25 | Public share links with access levels; per-settlement iframe permissions | a42, b36 [ST] | BASE | PARTIAL | §6.4 permalinks for unedited towns and `&doc=<id>` for edited ones; a hosted share service with access levels is a recorded deferral ("a sync service") | L |

### O. Units, scale anchors and performance

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| O01 | 2024, docs | One metre per unit in form parameters and GeoJSON (the 3× scale bug fixed; real building sizes researched); person heights and map metres on one scale | b20, d01, a42 (Critic-2 #2) [ST; CR] | BASE | COVERED | §2.1 centimetre model, metres end to end (O6), the unit lint | |
| O02 | wire | CITY anchors: a 5 km map centred on (0,0), a ≈ 1.4 km built core, 2 798 buildings, ≈ 3.4 people per building, ≈ 5 rooms, 192 km of roads | k23, v30, v14 [MS; CR §4] | BASE | COVERED | §12 building counts at ≈ 3.4 persons per building; §13.5 population / building, roads-per-hectare and footprint metrics | |
| O03 | 2023–26 | Performance ladder (generation −8 %, −5 %, −10 %; simulation +20 %, +10 %; file −5 %; metropolis load 20 s → 10 s; download −50 %) | a43, b38, p37, k22 [ST; CR F27] | BASE | COVERED | §12 METROPOLIS first frame ≤ 1 s progressive ("FTG metropolis load 10 s is the bar to beat"); cost-model tests (§13.2) | |
| O04 | 2025 | Render budget: more than 50 k trees collapses the frame rate; a percentage-of-trees slider | p09, p08 [ST] | BASE | COVERED | §4.9 O19 (e) ≥ 10 000 trees within a 16 ms frame at district LOD; §12 ≥ 60 fps at 40 k buildings / 200 k trees; per-band detail budgets (§8.5) | |
| O05 | docs | Preset data bugs (a duplicate row key in two district configs) | v44 [SH request] | BASE | COVERED | every table is schema-validated JSON (`zod`, §1.7) with versioned rows (§7.6) | |

### S3 · VL · Q. Hook rows and context rows

| ID | Ref | Capability / technique | Evidence | Tier | Coverage | ARCHITECTURE.md § / gap | Sev |
|---|---|---|---|---|---|---|---|
| S3-1 | 2026 (in development) | Building interiors / floorplans: recursive room slicing in the footprint's own frame, windows, doors, an entrance; roadmap: corridors versus interconnected rooms, furniture, multi-level castles, 3-D | p41 [ST 164816716; SH] | STAGE-3 | NOT-PRECLUDED | §2.6 `Composition.lod` includes `rooms` (`Room[]`), `BuildingGenerator.compose(…, lod: 'rooms')`; FTG's sub-locations become rooms at stage 3 (§10.3); §8.5 building LOD band | |
| VL-1 | docs, V2, 2025 | Hamlet and village generation: sizes below TOWN (HAMLET 90 … BIG_VILLAGE 900), the small-settlement-centre district, suburb growth that "changes how hamlets & villages are generated", "Around perimeter" farmland as the hamlet default ("less people means less large scale farming"), farmsteads with resident families | d32, d38, b26, p12, a34 [ST; SH] | VILLAGE-LATER | NOT-PRECLUDED | PART III: the ladder table is open below TOWN; frontage-first plots with cottage / farmstead / detached site plans; hinterland presets incl. the perimeter mode are shared (§4.9); a density field instead of districts; nothing assumes walls, districts or a market (§1.6) | |
| Q1 | all eras | Creator stance: content first; reliability over cleverness; heuristics over correctness; fix the generator, not the output; storage and render budgets as drivers; realism as a tuning target; validate at the authoring boundary; honest trial and error | a47, b43, p45 [ST] | context | — | carried by A01, A13, A19, A21, A22, O01 | |
| Q2 | all eras | Product and business facts: accounts and login, free / premium tiers, folders, temporary settlements, dark mode, monthly devlog cadence, legal review of race / religion presets | a33 (chronology), p45, c-posts (151265004) [ST] | context | — | not generator capabilities; hosting and accounts are outside the base (Deferrals: sync service); presets are data (§7.6) and naming packs later (D-6) | |
| Q3 | 2025–26 | Unsupported in FTG: underground / Underdark settlements; mountains, cliffs and ravines as terrain; year-scale simulation time (ageing the population is impossible) | p49, a49 [ST comments] | context | — | the base carries an `underground` layer hook for sewers only (§2.1), and terrain primitives incl. cliff and ravine (§4.2 S1); underground settlements are not in scope; the base's epochs (§4.11) are the map-level analogue of year-scale time | |

## 4. PARTIAL and MISSING rows by severity

### HIGH — none

No FTG capability that the map depends on lacks a mechanism, and nothing in this slice blocks stage 2 (FTG has no
NG-class close-up; its district-owned layout lands on the `FabricStrategy` slot, E09).

### MEDIUM — 9 rows (a builder would have to invent the rule, or the owner cannot see the decision)

| row | gap | what would close it (a design addition, not a change of direction) |
|---|---|---|
| M01 | Building-level editing: no event takes a hand-drawn footprint (FTG's custom building shapes, incl. concave C-shapes); placing a building rests on the unspecified `build(...)` conversion or on `assign` + `regenerate`; no atomic swap or fill-dense | specify `build(...)` and add a `drawFootprint` event (and an atomic `swapUse`) that act through the plot model — a drawn footprint claims or creates its plot and the site plan is re-evaluated around it — each with a row in the §7.4 lifecycle table |
| L08 | The ruler is absent although IMPROVEMENTS R10 names it among the properties a rewrite must keep | a measuring tool in §9 furniture (distance and area in metres / feet, snapping to ways and faces) |
| F16 | Landmark silhouettes (star and octagon temples, polygonal theatres, cruciform keeps) deferred to stage 3 by §15.1 C9, although they show at city zoom in the base | landmark footprint templates as data rows in the institution site plans, consumed by `OutlineBuildingGenerator` (a template polygon fitted to the claim) |
| G09 | Castle district: gatehouse, internal paths, inner ward, the decorated surround (park with a perimeter path, plaza, buildings, cliff skirt) are unspecified | a castle template table: gatehouse on the side facing the connector way, keep ↔ gate ↔ wall-stair paths, an optional inner ward, a surround-decoration row per option |
| I12 | Outside decorations (ponds, copses, stone circles, ruins with trails to the road network, fields and wood placed around them) are claimed by §15.1 C16 but specified nowhere | a hinterland decoration table in §4.9 (kind, count by rung and biome, trail rule to the nearest way, keep-clear radius for fields and wood) |
| F20 | No material rules: 11 FTG materials with stage / district / building overrides, temples always stone, wall types | a material table keyed by district kind × class × prosperity band × era, with per-district and per-building overrides as `setAttr`; a material field on `Enceinte` |
| B09 | Raw-resource availability from the site and the placement of outside-settlement buildings (mines, quarries, lumber yards, hunting lodges) on their land | derive availability in S1 (ore / stone from relief, timber from woodland, fish from water) and let S12 site the roster's outside classes as it already does farmsteads |
| B10 | Items, services, prices, stock and resource chains — not in the base, not in the module scope, not in the Deferrals | record the scope decision (module or out of scope) as a delegated decision so the owner can veto it; if in the module, a schema stub |
| C03 | Personality, stats and education — same situation | record the scope decision alongside B10 |

### LOW — 45 rows

| group | rows | note |
|---|---|---|
| content-module depth (deferred by D-10 / J-S; data model present) | B06, B11, B12, B13, B14, C01, C02, C04, C05, C07, C08, C11, C12, C13, K13, L06 | named in §10.1 / §10.3 without schemas; C11 (family tree) and the per-culture name generators are not named at all |
| cosmetic render variety (optional under R13) | E07 (tent symbol, fire pits), I05 (feathered field edges), I11 (tree species), I15 (climate presets), J05 (market stalls), K05 (sun path and controls), K06 (weather, seasons), K07 (post-processing looks) | each is a style program, symbol or preset row; K07's parity citation points at a non-existent hook (§6) |
| vocabulary breadth | F09 (½ / 2× size modifiers), F23 (fences), G10 (castle geometry details), H04 (coast shapes per arm), H06 (bay / headland decoration tables), H11 (distributaries), H17 (harbour walls, branching piers, pier material), I03 (outer feature clustering), I09 (tree placement by part), J02 (plot furniture kinds) | the mechanisms exist; the enumerations and tables are thinner than FTG's |
| model and record details | D26 (suburb wide ↔ elongated control), E02 (sub-districts), E10 (district prose summary), F21 (description, opening times), G07 (intervallum lane), H07 (shore setback band) | small schema or rule additions |
| editor, app and hosting | A24 (accessibility), A25 (context-aware documentation links), M04 (area brushes, tree brush), N06 (live embedding where iframes are forbidden), N07 (hosted share links) | app-level; N06 and N07 sit under the recorded hosting / sync deferral |

## 5. Scope creep — architecture features no row of this slice and no IMPROVEMENTS item motivates

Method: every feature in ARCHITECTURE.md was checked against the 227 master rows above and against IMPROVEMENTS.md
(sections read as listed in §0, plus a term census over the whole file). The judgement is limited to what the FTG
slice can see: an item listed here may still be motivated by an MFCG, NG or VG findings row (the sister audits).

**No substantive scope creep is visible from this slice.** Four trivial enumeration additions and one borderline field:

| item | where | why it counts | cost |
|---|---|---|---|
| `Pin.kind` values `cross`, `shrine`, `pump`, `gallows` | PART II §II.1 | no FTG row; 0 hits in IMPROVEMENTS. Meanwhile FTG's own singletons (bandstand, statue, monument, campfire — row J02) are absent, so the list reads as invented rather than drawn from evidence; derive it from the NG pins and FTG singletons and hold it as a data table | nil |
| `LandUse.kind` `claypit`; `bankKinds` `marsh` | §2.7, §2.3 | no FTG row; 0 hits in IMPROVEMENTS (`marsh` arrives with the G-R5 graft) | nil |
| `Enceinte.kind` `earthwork` | §2.7 | no FTG row; IMPROVEMENTS names palisades, barbicans and bastions, not earthworks | nil |
| `bw-print` style preset | §8.2 | no FTG row; IMPROVEMENTS names parchment, not a monochrome print preset | nil (a data file) |
| borderline: a per-faction `influence` field over districts used by the prosperity drivers and the naming grammar | §2.7, §10.3 | FTG factions have no spatial influence; IMPROVEMENTS names faction turf (O7 module) and the owner's driver list names "the roster's institutions", but a continuous influence field goes one step beyond both | small; module-only, not on the base path |

Checked and **not** creep: the `landValue` routing term (IMPROVEMENTS O4), bastions (O8), the parchment preset (O12),
wind and upwind (owner ruling, O18), the forms catalogue and its classifier (O10), addresses (O13), glTF / Universal VTT
/ CBOR exports (O11 extras), proxy thumbnails (O16 e, and FTG users asked for candidate layouts — A18), thematic layers
(FTG's matcher layers — K12), the `night` preset with lights (FTG's window lights — C10), the layer model, drainage,
sky islands and tunnels (hooks 6 and 8 of IMPROVEMENTS §5.4).

## 6. Consistency observations (not coverage rows)

1. **Five §15.1 FTG parity rows cite a section that does not carry the mechanism they name.**
   * C16 → §4.9 "decorations as typed symbols / faces (ponds, copses, stone circles, ruins with tracks — a decoration
     table)": §4.9 contains no such table (row I12).
   * D6 → "§8.5 WebGL2 post hooks": §8.5 specifies no post-processing hook (row K07).
   * C7 → "a small-tents modifier as a site-plan table row": §4.7 S11's arrangement table has no tent row and §8 no tent
     symbol (rows E07, F09).
   * C17 → "§4.7 yard sub-areas + per-class decoration rows": §4.7 has typed yard parts only; FTG's per-class furniture
     rows (bandstand, statue, monument, fire, fences) have no home (rows J02, F23).
   * C9 → "non-rectangular landmark templates via the stage-3 interface": this relabels a base-tier, city-zoom
     signature as a stage-3 hook (row F16).
2. **Capabilities absent from both the 46 FTG rows of §15.1 and the body**: the ruler, items / services / prices /
   stock and resource chains, personality / stats / education, market stalls, feathered field edges, tree species and
   the family-tree view. §15.1 is coarser than the findings, so the owner cannot see these omissions from the matrix.
3. **Numbers in ARCHITECTURE.md that are not in this slice's six files** — §13.5's "FTG 323–332 m/ha streets, 0 alley
   length", "6 and 2 ungated crossings" and the party-wall shares "FTG residences 0–5 %, industry 96–98 %" — trace to
   `docs/improvements/ftg.md` (Addendum 1, the plot census) through IMPROVEMENTS O8 / O17 / O18 (grep: lines 947, 1119,
   1204 of IMPROVEMENTS). Consistent; not re-verified against the payload by this seat.
4. **Critic rulings carried correctly** (checked by reading and grep): integer centimetres centred on (0,0), +y north
   (§2.1, D-12); generation ≈ 3–7 s with no stale "≈ 300 s" anywhere in ARCHITECTURE.md; the roadlength100 segment laws,
   83 cul-de-sacs, 30.00 m suburb streets and 14.70 m suburb lot outlines (§4.4, §13.5); the 10 ha merge floor (§4.5);
   39 m tower spacing (§4.8); the 10.3 m quad side and 103 m² footprint (§4.7, §13.5); the 50 m water step and ≈ 31 m
   rivers (§4.2, §13.5); the documented pipeline order (§4.1 cites `_critic.md` C12); `deltaRiver` read as a widened
   mouth (§4.2, C15).
5. **One precision note.** §12 compares against "FTG ≈ 3–7 s server + 4.6 s client"; the 4.6 s is the client's busy time
   during the create step (`ftg-payload-visual.md` §1), while part 2 of its Critic-2 addendum puts the scene build at
   6.4–7.0 s after the click and loading a finished settlement at 2.0 s busy. The bar stands either way; the time-to-
   first-map comparator should cite part 2.

## 7. Evidence status

**CONFIRMED (executed by this seat):** every file listed in §0 was read as stated; each MISSING verdict and each
"not specified" clause was re-checked by `grep` over ARCHITECTURE.md (0 hits for `ruler` as a word, `price`, `stock`,
`personality`, `bandstand`, `statue`, `stall`, `blur`, `feather`, `palm`, `snow`, `hemisphere`, `mines` as a word;
the full census is in the session scratchpad `term-counts.txt`); the counts in §2 and the raw → master mapping of
Appendix B were computed by script over §3 and Appendix A (all 277 raw items are cited by at least one master row).
**PLAUSIBLE (this seat's judgement):** whether a cited section is specified to buildable depth, every severity, the
LOW-group labels and the scope-creep calls.

## Appendix A — raw enumeration, file by file (written while reading; consolidated into §3)

Tags: ST stated · SH shown · IN inferred · NO named only · CR critic ruling/addendum · MS measured on our capture.

### A.1 `_critic.md` (FTG-relevant rulings only; the rest of that file concerns the MFCG/VG/NG slices)

- c01 C12 FTG pipeline order RESOLVED: phase 1 = buildings + people decided before geometry; phase 2 = map: water first → staged road network & districts → suburb → outer settlement (farms, forests, features). [CR]
- c02 C13 bent-cut construction: FTG's author states the same 3-step bend (perpendicular at both ends, bend in the middle) as watabou's twisted bisection; construction OPEN but narrowed. [CR]
- c03 §3: FTG plot decorations singletons = WELL / BANDSTAND / STATUE (equal weights in plotDecorationOptions); GeoJSON export in metres; lot split = July 2025 algorithm + July 2026 shrink-then-split; castle moat/cliff via posts-c §2.3. [CR]
- c04 §6.7 FTG gaps at that date: road-legality thresholds, district-type scoring, wall tracing for AROUND_ALL_LOTS, determinism of render-time fills (seed null), wire field 20, decoration field assignment. [CR]
- c05 Version ladder to keep: FTG roads V1 orthogonal proposal queue from a 4-way crossroad → V2 staged, large lots handed to districts. [CR]

### A.2 `_critic-ftg.md` (second seat; binding where it disagrees with a findings file)

- k01 F1 wire coordinates are zig-zag sint32 in cm, centred on (0,0), ±2500 m for a CITY; +x east, +y north. [CR, MS]
- k02 F2 every length in ftg-payload-visual §5 ×½, area ×¼: building median 103 m², quad side 10.3 m, roads 192 km, block-lot median 441 m², water step 50 m, tower spacing 39 m, forests 1.82/1.59 km², fields ≈2.5 ha. [CR, MS]
- k03 F3 persisted segments half the configured roadLength (later SETTLED by the roadlength100 capture — see A.7). [CR, MS]
- k04 F4/F5 district rings simple (0 self-intersections), all buildings inside ±2500 m; retract even-odd advice. [CR]
- k05 F6 minDistrictArea is a MERGE floor in m² (below it a district lot merges into an adjacent district); ring area ≠ district-lot area. [CR]
- k06 F7 vertical/horizontalBranchSegments = segments laid before proposing a left+right branch. [CR]
- k07 F8 spokeStaySpokeProbability = P(branch of a main road is itself a main road). [CR]
- k08 F9 edge type 14 = water-outline edges carried in the road graph so lot detection treats water as a boundary; F10 type 3 = map border; F11 type 12 = piers (12 × 75.6 m, parallel, 15 m apart). [CR, MS]
- k09 F12/F22 calendar: current day/hour persisted, 7 named weekdays, restDays [6,7]; configurable calendar is a 2025+ ladder. [CR]
- k10 F13 group-18 lots hold 1.52 buildings, 22.9 % empty, 38 % coverage (271 m² lot per 103 m² footprint); district-stage lots are not serialised as lot polygons (53 % of buildings lie in any serialised lot). [CR, MS]
- k11 F14 pipeline order upheld (content → water → staged roads/districts → suburb → outer settlement); "first stage" = first layout stage. [CR]
- k12 F15 walls: per-stage placeWallAfter + wallPlacement (around all lots / around stage lots), wall follows lot/district outlines (17/17 towers on the waterfront ring), open chain river bank → coast, tower spacing median 39 m; hull reading superseded. [CR, MS]
- k13 F16 two features share the coloured-square glyph: market stalls (market districts) and shanty-town tents (squalid/poor only, after the first half of the settlement). [CR]
- k14 F17 lot → building subdivision is three levels: (i) district lot → block lots by inserted roads until < target area (regenerate default 10 000 m²); (ii) block lot → building plots by recursive random perpendicular cuts (2025 proposal rule = which edge; 2026 projection rule stopped by an inset blocking ring); (iii) 2023 image inferences = level (ii). Do not merge (i) and (ii). [CR]
- k15 F18/F23 person types incl. Delegating (babies + caregiver) and Studying. [CR]
- k16 F19 bridge spacing in metres, default 100 → 40. [CR]
- k17 F20 static front-end + server-side generation/storage API (generation ≈3–7 s per the later capture; ≈300 s was the recorder's wait). [CR]
- k18 F21 farmland modes Default / Farmsteads / Around perimeter / Around rivers. [CR]
- k19 F24 raw-resource vocabulary 13 values; gems a produced resource. [CR]
- k20 F25 palette era ladder; current look per payload-visual §8.1. [CR]
- k21 F26 GeoJSON = backgrounds, edges, buildings, outlines; districts absent. [CR]
- k22 F27 performance ladder (gen/sim/file deltas). [CR]
- k23 §4 conclusions: ~1.4 km built core; buildings ~10×10 m, 3.4 people, 5 sub-locations; street edges 15–30 m with a hard 15° per-vertex turn cap; locally orthogonal junctions (arm-angle median 90.02°); heading spectrum flat; entrances on the outline, ≈3 m from the road; 6.4 % of buildings share a vertex (party walls); trees not Poisson (NN min 0.14 m). [CR, MS]
- k24 §6 remaining gaps: legality thresholds, district-type scoring, plot rule constants, number of districts; core block structure only recoverable as road-graph faces; determinism untested; bridges not isolated. [CR]

### A.3 `ftg-posts-a.md` (10 posts, 2022-04 → 2023-12, incl. Critic-2 addendum)

- a01 Road network persisted as an intersection-indexed planar graph (node table + edge list; connectivity by shared id, no epsilon geometry). [ST 65223067 §2.1]
- a02 Road record shape: chain of short edges with many degree-2 nodes (resolved by payload). [IN §2.1; CR]
- a03 2022 road classes Small / Large; walls and stone fences share the road/edge store. [SH §2.2; IN]
- a04 Fill tool: raycast to the first bounding road, then leftmost-turn walk = planar face extraction; result stored as a frozen point list; escapes to "half the town" on non-planar generated topology; degenerate hit target. [ST §2.3]
- a05 Edit snapping: snap to intersections and to the first crossing, splitting the crossed road — crossing ⇒ shared intersection is a write-time invariant. [ST §2.4]
- a06 Two-phase pipeline: content (buildings + people) first, map second; layout must guarantee every building a place. [ST 91451446 §2.5]
- a07 Content ordering: factions before buildings before map. [ST §2.5]
- a08 Retired resource-demand building selection and its failure modes (config not reason-about-able, fragile priority, single shop threshold, bookkeeping cost). [ST §2.6]
- a09 Building groups + dependency graph: 1 per N people / 1 per N of other groups; within-group proportions; shop alternatives; custom shop %; guaranteed first building above a population threshold. [ST/SH §2.7]
- a10 Lifestyle-conditioned candidate rows with weights (lifestyle set → building list). [SH §2.7]
- a11 Six-level lifestyle ladder Squalid → Aristocratic as a first-class axis (form, districts, groups). [SH §2.7]
- a12 Old district formation: lifestyle groups claim road-graph faces (lots), overflow to adjacent lots, else a new disconnected district; wasted-space failure. [ST §2.8]
- a13 Overall district (lifestyle or major industry) + sub-districts (industry); buildings have a preferred sub-district; industry clumps. [ST §2.9]
- a14 Empty-space backfill from district identity (content count is a minimum; layout adds buildings/people). [ST §2.9]
- a15 Street-frontage packing: continuous ring of buildings on the lot perimeter, long axis ⟂ street, abutting, interior courtyard. [SH §2.9, §3.3]
- a16 District description + demographics (buildings, residents). [SH §2.9]
- a17 District names from sub-district vocabulary + detected landmarks (wall, tower, gate, dock, market), eroded over time with the original kept. [ST §2.10]
- a18 Re-roll district (delete buildings + decoration, regenerate with new people) with its settings. [ST/SH §2.11]
- a19 Dense regime tiles the whole lot with small quadrilateral plots in bands. [SH §2.11]
- a20 Settlement list shows a derived classification rather than a dual-written population. [ST §2.11]
- a21 Decoration vocabulary by level: building background textures, lot decoration (park/plaza variants), lot-edge trees, weighted plot decorations (trees, grass, garden fences, well, fountain, bandstand, statue, monument, campfire). [SH §2.12]
- a22 Two decoration profiles (dense/sparse) and per-phase building modifier/material per district; merge and dense-phase conditions. [SH §2.12]
- a23 Lifestyle defaults: squalid = tents, poor = very dense, wealthy = more trees/decoration; roof materials; custom building colours. [ST §2.12]
- a24 Area colour emerges from plot background textures (core beige, suburbs green), no district fill. [IN §2.12]
- a25 Tents: small square footprints, free rotation, pyramid shading, saturated colours, dirt ground, no lot-edge alignment. [SH §2.13]
- a26 Walls at build-progress checkpoints (2023) → concentric historic rings following the extent built at that moment. [SH §2.14; CR F15 superseded mechanism]
- a27 Wall render: thick dark stroke, round towers at direction changes; gates only as named landmarks in 2023. [SH §2.14]
- a28 Military size/percentage parameters. [SH §2.14]
- a29 Rivers are crossable by bridges; oceans are not (a generator constraint). [ST §2.15]
- a30 Water: generated (coastal, rivers, configuration) or manually drawn initial state (rivers as variable-width strokes, oceans as blobs, bridge spacing). [ST/SH §2.15]
- a31 Lakes, branching rivers, river islands (islands-in-rivers bugs fixed). [ST §2.15]
- a32 Settlement on both banks with bridges and a quay at the main crossing. [SH §2.15]
- a33 Parameter surface (cards; landing form with name, size class, lifestyle, coastal, rivers, forests, walled). [SH §2.16]
- a34 Size as a named class with an approximate population. [SH §2.16]
- a35 Raw-resource checklist feeding the dependency graph and farm/field types. [SH §2.16]
- a36 Schedules per person type and day-group; entries with status, criteria, primary/default behaviour; building and sub-location matchers incl. "fetch demanded resources". [ST/SH §2.17]
- a37 Buildings subdivided into named sub-locations with purpose capacities and tags. [SH §2.17]
- a38 Religions owning gods; relation types; factions (goals, methods, buildings, meetings, templates); events as executable state transitions (10 ranked candidates). [ST/SH §2.18]
- a39 Appearance templates with weighted per-race tables and conditional lines; descriptions baked into the persisted settlement. [ST/SH §2.19]
- a40 Genders as data (pronouns, name type, height) + N×N pairing matrix; per-race name generators; uploaded custom name lists. [SH §2.20]
- a41 Person types, age curve, employment as a global matching pass re-run on edit, families own residences, D&D stats, relation-storage cost. [ST §2.21]
- a42 Export/integration: GeoJSON, SVG, Foundry VTT live module, public share link; no seed/URL model; planned JSON upload of desired buildings/people; form settings in local storage. [ST/NO §2.22]
- a43 Scale blockers (speed, file size) and a population-LOD idea (not all people generated). [ST §2.23]
- a44 Era-1 look: white core, hatched farmland with per-field hatch angle, cased road ribbons, flat brown irregular-orthogonal buildings. [SH §3.1]
- a45 Era-2 look: fixed top-left light, soft drop shadows, pitched-roof facet shading with ridge seams, dotted lot/plot boundaries, ragged union-of-lots edge, tree canopies with shadows (plazas, lot edges, hedgerows), plazas as negative space, well/fountain glyphs, tinted + hatched fields with double-line hedges, farmsteads (1–3 buildings in a fenced yard by a road), outlined small-caps district labels, 16-category building-type overlay, emergent density gradient. [SH §3.2]
- a46 Building footprints: rectangles plus L/T/U lobes, axis-aligned in the plot frame. [IN §3.3]
- a47 Stance: content first; DM table tool ("if I see it, I can go there"); legible config over clever rules; everything editable data; persistence sacred (fixes only for new settlements); simulation fidelity; scale constraint. [ST §4]
- a48 Climate setting planned to swap textures (sandy ground). [ST §5]
- a49 Time model advances hours/days, not years (ageing the population not possible, 2026-08). [ST §5]

### A.4 `ftg-posts-b.md` (10 posts, 2024-01 → 2025-06, incl. Critic-2 addendum)

- b01 Family-unit relation model (units of parents/children; derived relations not persisted; relations 30 % → 10 % of the file). [ST 95869798 T-01]
- b02 Family-tree view (layered generations, elided expansion, re-root). [SH/ST T-02]
- b03 50 000 inhabitants, every person an individual record; Custom size with a population-target slider. [ST T-03]
- b04 Named weaknesses of the old look: uniform small blocks everywhere (no lot-size hierarchy), uninteresting junctions, no landmarks, the settlement ringed by roads because no building sits on the outer edge. [ST/SH T-03]
- b05 Static front-end + server-side generation and storage; build-target slowness. [ST T-04; CR F20]
- b06 Settlement persisted as a versioned object (version history used as operational undo); file-size budget by component. [ST T-05]
- b07 Append-only entity dictionaries (races, religions, genders: add/edit, never delete — referenced by id). [ST T-06]
- b08 Constrained person re-roll with field locks (relations and simulation fields excluded as non-local graph state). [ST T-07]
- b09 Schedules: day-sets, time ranges, status, criteria → primary/default behaviour → (building, sub-location, verb); professions carry default schedule templates; the simulation is a deterministic query per (day, hour). [SH/ST/IN T-08]
- b10 Junction rendering: a disc at each intersection sized/coloured by the incident road classes; road stroke = body + casing + centre stripe. [ST/SH T-09]
- b11 Editor snapping in world space around the cursor, with a snapping-strength control. [ST T-10]
- b12 River path tool: centreline → smoothing (iterations) → offset to width (metres) → ribbon; a red circle protects the settlement core from drawn water. [ST/SH T-11; CR]
- b13 Brushes and hand-drawn geometry: tree brush, building colour + roof-shape (hip/gable) brush, background-texture brush with custom colours, texture-region edit, hand-drawn building footprints; editor categories Roads/Buildings/Walls/Backgrounds/Decoration/Water; building tools Place single/Draw/Paint/Fill dense/Move/Swap/Demolish. [ST/SH T-12]
- b14 Straight-skeleton roofs (hip native, gable by post-processing) in flattened-2-D and full-3-D variants; the old rectangular-texture roof kept as the low-power default; per-face flat shading keyed to orientation. [ST T-13]
- b15 Full 3-D map + first-person street view (unstable toy); Three.js; 2-D is the 3-D scene flattened. [ST/SH/IN T-14]
- b16 Market stalls = small coloured tents around a market hall. [SH T-14; CR F16]
- b17 Height map as a separate raster at its own resolution (not per-vertex z), noise-based, potentially regenerated from a seed; shelved (no 2-D presentation, road integration hard); mountains unsupported. [ST T-15]
- b18 3-D terrain tessellation; background polygons re-triangulated on one global lattice aligned to the height grid. [ST/SH T-16]
- b19 Ground layers turned into a planar partition by polygon boolean subtraction (no overdraw, fewer triangles). [ST T-17]
- b20 1 unit = 1 m corrected (buildings had been 3× too large); real building sizes researched; ruler tool; the landmark-to-lot size ratio blow-up broke placement. [ST T-18]
- b21 V1 pipeline (people/buildings → district groups → grow roads to an area budget → districts claim/grow lots → repeat) and its failures: give-up after N attempts on large buildings, merged undersized districts of unrelated buildings, disconnected districts. [ST T-19]
- b22 Top-down area budgeting: total building area → required lot area → amount of road network. [ST T-19]
- b23 Road growth V1: segments propose straight + left/right right-angle successors into a queue, validity checks, two phases (dense inner, outer); signature 4-way crossroad blooming into a circle. [ST T-20]
- b24 Road growth V2: much larger lots handed to districts; initial junction type (3/4/5-way, through road, …), ringed preset; per-phase ends-in-wall, wiggliness, branching strategy, building placement; four morphologies from one algorithm (organic, grid with diagonals, radial-concentric, sprawling); growth anisotropic along main roads; "sharp points" defect. [ST/SH T-21]
- b25 V2 shipped pipeline: buildings into pools; main roads until a large lot; district type picked from the remaining pool; landmarks placed first while the lot is large, roads generated around them, then the district subdivides and fills; road style becomes a district property. [ST T-22]
- b26 Suburbs: buildings without surrounding roads, ribbons along dead-end spurs (one row each side, set back, detached); towns grow along main roads; changes hamlets/villages; cul-de-sacs wanted. [ST/SH T-23]
- b27 Placement modes: dense (shared walls), gaps (same subdivision shrunk so buildings do not touch; default outside the centre), suburb ribbon; editor Fill dense / Place single / Draw. [ST T-24]
- b28 Districts as first-class generator objects: own decoration, layout, road preferences; types market, castle, park, waterfront, university; landmark complexes (groups of buildings) wished; district debug overlay. [ST T-25]
- b29 Walls: stone default, scalable towers, split across rivers, a phase terminator; ring road inside; encloses only the old town (a historical boundary); material/colour of buildings differs inside the wall; moats and bypasses planned. [ST/SH T-26]
- b30 Farmland: complete polygonal partition of the countryside into quad-ish fields with crop fills, per-field hatch along the field axis, boundary lines with hedgerow trees, field size growing with distance, lanes between field blocks. [SH T-27]
- b31 Forest as a base polygon + density field of glyphs thinning at the edge; trails and farmland re-roll wished. [SH/ST T-27]
- b32 Coast decoration: sand/pebble beaches, cliffs, rocks; ocean shape and detail controls; applies to drawn coasts; keeps buildings/farms back from the water. [ST/SH T-28]
- b33 Harbours inside waterfront districts: basin shape, harbour-wall shape + material, pier shape + material (plank, T-head, ladder), breakwaters/moles. [ST/SH T-29]
- b34 Labels on arcs following the district axis, sized by importance, halo + shadow; minor named places; building labels at high zoom. [ST/SH T-30]
- b35 Custom calendar, hourly Simple-Calendar sync, clock UI with Next Hour / Time Skip, bulk people edits. [ST T-31]
- b36 VTT embedding (Foundry module, Roll20 extension) of the live instance; public pins, ruler, journal links, building highlight; no token layer. [ST T-32]
- b37 Exports: CSV people, GeoJSON (no districts), PNG, building JSON (no round-trip import), create-settings file export/import. [ST T-33; CR F26]
- b38 Performance: tiered render defaults, web workers for building rendering, hidden-triangle removal. [ST T-34]
- b39 Internal debug views (district overlay, wireframes); the ruler became a product feature. [ST T-35]
- b40 2025 palette and rendering: brown core ground, sage suburbs, beige courtyards, two-tone brown roofs, pale stone roofs for walled/civic, slate-grey landmark silhouettes (stars, cruciform), cased roads with a centre stripe, flat water, beaches, rock glyphs, quays/piers, hatched fields, parks, forest glyph field, tree rosettes, market stalls, wells/fountains; flat vector + hairline + glyphs; uniform soft down-right shadows. [SH §3]
- b41 Block signature: a ring of contiguous small buildings around a pale courtyard; post-overhaul size hierarchy (civic lots, medium blocks, ribbon suburbs). [SH §3]
- b42 Map UI: scale bar, zoom, compass reset, layer toggles (satellite, districts), building search, selection highlight. [SH §3]
- b43 Stance: population first permanently; reliability over cleverness (landmark first); static site; append-only data; tiered rendering; do not double the front-end; realism as a tuning target; honest trial and error. [ST §4]
- b44 User requests: authored constraints ("lay down initial walls and district boundaries before the generator fills the rest") unsupported; ruins; road names; three candidate layouts before populating (refused); custom building types; district re-roll destroys hand-authored content; new features apply only to new settlements. [ST §5]
- b45 Settlements addressed by UUID behind a validating server API. [ST §5]

### A.5 `ftg-posts-c.md` (10 posts, 2025-07 → 2026-07, incl. Critic-2 addendum)

- p01 Lot → building-plot subdivision (July 2025): recursive random cuts until a plot fits a building; old longest-edge-midpoint rule fails on subdivided edges and interior corners; new rule = edge nearest the centroid, cut through the centroid; reflex-corner pre-cuts first; narrow-section and sharp-angle filters (heuristic, hourglass still escapes). [ST 133016301 §2.1]
- p02 Failure gallery a subdivider must avoid: sliver fans, razor strips, concave/arrowhead plots, star-shaped buildings. [SH §2.1]
- p03 Shrink-then-split (July 2026): inset the lot, register the inset border as blocking edges, fire perpendicular cuts from the frontage that stop at the inset — removes the mid-line bend and cross-lot coupling; fails when the lot is too small to shrink or oddly cornered. [ST 164816716 §2.2]
- p04 The replaced 3-step bent cut (perpendicular at both ends, bend in the middle) and its intent: building side walls ⟂ the road. [ST §2.2; CR C13]
- p05 Castle districts only under a king/queen feudal government; pipeline: random wall layout → fit into the castle's district lot → gatehouse → keep and buildings → paths → cliffs/moats → connector road to the network → surround → decorate (park with perimeter + random paths, plaza, buildings, cliff). [ST 137812814 §2.3]
- p06 Castle geometry: 5–7-vertex convex-ish curtain with round towers at vertices and along long runs, inward gatehouse spur, octagonal/rectangular/square keep, bailey paths, optional inner ward wall, moat = outward offset with a berm, cliff skirt. [SH §2.3]
- p07 Post-processing looks (greyscale, sepia, tint, pixelation, dot screen, scanline, crosshatch with noise) applied to 2-D, 3-D and PNG export while staying interactive. [ST §2.4]
- p08 Client render settings: antialiasing, shadows + resolution, roof mode, tree percentage, arced district text with distance scaling and custom scale, effects, SVG renderer, 3-D, sun direction/height/colour — stored client-side, not in the settlement. [SH §2.4]
- p09 Forests stored as tree-area shapes filled at render time (50 k trees ≈ 1 MB of storage; >50 k rendered trees collapses the frame rate); tree areas editable; colour variation; more trees in core, suburbs, field edges; stable fill implies a seeded scatter (not stated). [ST/IN §2.5]
- p10 Hedgerow trees placed on field-boundary polylines, irregular with clumps. [SH §2.5]
- p11 Tree areas clipped by water (island forest with a stream and lakes). [SH §2.5; CR: no hole rings in the payload]
- p12 Farmland modes: Around perimeter (main roads out + the perimeter; default for hamlets because fewer people farm less), Farmsteads (house centred in a large plot + driveway; some residents live there, farmhands commute), desert → Around rivers. [ST §2.6; CR F21]
- p13 Field geometry: scattered rotated quads (perimeter mode) vs a complete planar partition of the outer ring with roads as seams, hedgerows, junction markers, strip fields along roads. [SH/IN §2.6]
- p14 Crop stripes at a per-field angle and a crop colour vocabulary. [SH §2.6]
- p15 Regenerate an arbitrary drawn area as farmland (field generator callable on any polygon). [ST §2.6]
- p16 Field edges bordering open ground feathered into it (hardware-gated). [ST §2.7]
- p17 Settlement perimeter computed after the suburbs, expanded (garden space behind houses) and rounded; farms and decorations are placed outside it. [ST §2.8]
- p18 Day/night: moving sun, shadow direction, light colour; window lights only in buildings with an awake adult (render reads the simulation); hemisphere, sunrise direction, sunrise/sunset hours. [ST §2.9]
- p19 Weather states (clear, cloudy, snow clear, snow cloudy) as ground/brightness/shadow flags; roads stay brown in snow for legibility. [ST/SH §2.9]
- p20 Seasons re-skin persistent tree instances (autumn hues, winter bare branches) and set default day length. [ST/SH §2.9]
- p21 Climate presets: temperate (deciduous/coniferous/mix), desert (sand ground, palms, fields hugging rivers, flat roofs, inverted road colours), polar (permanent snow, no trees); building material a generation input. [ST/SH §2.10]
- p22 Outside decorations: ponds, copses, stone circles, ruins — procedural, several linked to the road network by generated paths, fields and forest generated around them, count configurable, 3-D models. [ST/SH §2.11]
- p23 Low-density ambient tree scatter across the whole landscape. [SH §2.11]
- p24 One randomised closed-outline routine reused for pond, island, coast arm and moat. [ST/IN §2.11–2.12]
- p25 Islands: coastal/islands option, one arm instead of two, rocky/cliff/beach defaults, diverse shapes; hand-drawn islands by two ocean shapes. [ST §2.12]
- p26 Coast decoration applied per shoreline segment (one island mixes all three). [SH §2.12]
- p27 Ocean vs river classified by the share of the body touching the map border; lakes lumped with rivers. [ST §2.13]
- p28 Water depth ramp, ocean foam (weaker on rivers), texture — distance-from-shore effects; render on demand, no animation. [ST §2.13]
- p29 Road network is a graph (for the fill tool); duplicate intersections at one position broke area re-roll; settlements repaired server-side; lots are recovered by face traversal, so welding/snapping is load-bearing. [ST 153121107 §2.14]
- p30 Self-intersecting polygons prevented at draw time; more layout validation — validate at the authoring boundary. [ST §2.15]
- p31 Ponds = oceans without ocean decoration: water bodies carry a decoration class independent of their geometry class. [ST §2.16]
- p32 District names from weighted name-part tables with syllable counts (nickname ≤ 3 syllables). [ST 157283634 §2.17]
- p33 User-definable map layers (colour + matcher rules on building type / specific type / specific building), built-in layers, per-settlement with saved defaults; thematic mode desaturates the base map and shows a legend. [ST/SH §2.18]
- p34 Grid overlay (2 m / 5 ft) and a metres/feet switch driving the scale bar and ruler. [ST §2.19]
- p35 Regenerate area (drawn areas, re-roll as farmland) and bulk edit buildings (edit fields; regenerate contents keeping footprints); building record = name, type, specific type, description, religion, opening times, stock, services, sub-locations, resources. [ST/SH §2.20]
- p36 Regeneration comes out denser than the original with the same settings; no density or road-padding control in regeneration. [ST §2.20]
- p37 Protobuf settlement file with integer zig-zag coordinates centred on (0,0); simulation reads people from the file; download −50 %; metropolis render ≈ 10 s with a progressive draw. [ST §2.21]
- p38 Per-settlement storage cost drives what is procedural-at-save vs procedural-at-render. [ST §2.21]
- p39 People/economy: race-pair partnering matrix, gender partner preference, faction roles with member criteria, person types incl. Studying, carer/caree references (dangling-reference failures), faction-vs-building headcount reconciliation, supply chain gating biomes. [ST §2.22]
- p40 Residential district order: largest-population district first and closest to the centre; configurable upper → lower class or reverse (placement order = distance from centre). [ST §2.22]
- p41 Building interiors in development: recursive room slicing in the footprint frame, windows, doors, entrance; roadmap corridors, furniture, multi-level castles, 3-D. [ST/SH §2.23]
- p42 Initial water compass direction (coast toward it, rivers perpendicular when both). [ST §2.24]
- p43 Create form as the full input schema (basic form: name, size, layout preset, climate, building material, races, religions, lifestyle, coastal/islands, rivers, farms, forests, reserve natural area, walled; 12 sections); per-section save/load presets with partial overwrite (cloud or local); Show estimate. [ST/SH §2.25]
- p44 2026 look: sage ground, cream cased roads with width hierarchy and round dead-end caps, chocolate hipped-facet roofs, party walls as shared straight edges, pale civic/landmark buildings with cross/star/L/U footprints, fenced yards, per-season/climate trees, depth/foam water, hatched fields, castles, arced haloed labels, legend and clock cards, scale bar, one directional light with soft shadows (none under cloud). [SH §3]
- p45 Stance: heuristics over correctness; fix the generator not the output; storage cost first-class; render on demand; the simulation constrains the map; broad strokes and fine control (every generated feature has a manual counterpart); validate at the authoring boundary; coherent config. [ST §4]
- p46 No regeneration path for existing settlements; only data repairs are retroactive. [ST §6]
- p47 Fenced yards are fence decorations switchable in district decoration settings. [ST §6]
- p48 Roof colours set pre-generation and per district; none per building afterwards. [ST §6]
- p49 Not supported: underground/Underdark settlements; mountains, cliffs, ravines as terrain. [ST §6]
- p50 The layout grows in rings: the first layout stage forms the first ring; a big enough first stage puts the castle inside it. [ST §6; CR F14]

### A.6 `ftg-docs-params.md` (36 guide pages + request/presets JSON, incl. Critic-2 addendum)

- d01 Units: form parameters in m / m²; GeoJSON 1 unit = 1 m; wire = integer cm, zig-zag, centred. [ST §0.1; CR F1]
- d02 Two phases: buildings & people (forced buildings → dependency-graph loop → factions, friendships, rivalries), then map (water → staged roads & districts, suburb last → outer settlement). [ST §0.2]
- d03 `layoutParameters` = ordered district `stages[]` + one suburb stage + wall type + initial-roads type. [SH §1.1]
- d04 Layout presets: Custom, Medieval europe, Medieval europe (more twisty), American, Ringed, Ringed (no suburbs). [SH §1.2]
- d05 Eleven building materials as a render attribute with per-stage default, per-district and per-building override (temples always stone). [ST/SH §1.2]
- d06 Walled toggle drives per-stage `placeWallAfter`; four wall types reused by castle districts. [ST §1.2]
- d07 Initial roads (seed pattern at the centre): Random, Dead-end, Single through-road, 3-/4-/5-/6-way crossroad. [SH/IN §1.2]
- d08 Number of districts Less/Normal/More (mechanism unknown). [SH §1.2]
- d09 Stages table: each stage places a share of the building stock (`proportionOfBuildings`); roads expand until the stage's area is met; the suburb stage takes the remainder. [ST/IN §1.2]
- d10 Per-stage knobs: material; placement Dense / Gaps / Individually placed; wall after + where (around all lots / stage lots); branch type Continue / Curve around origin; max main/normal road angle (per-vertex cap); segment length; vertical/horizontal branch-after-N-segments; minimum district area (merge floor); P(new main road on branching); max new main roads. [ST/SH §1.3; CR F6–F8]
- d11 Suburb stage knobs: plot-use probability (density), offshoot section length range, branch probabilities (from main road / after an offshoot section), segment length, angles, main-spoke priority increase (lowest priority processed next → wider vs longer/narrower), background texture, rounded edges, perimeter spokes on a ring road round the core with a spacing multiplier, wall after. [ST/SH/IN §1.4]
- d12 Tree placement by part: next to roads in certain districts (lot-edge trees), between fields (hedgerows), random in forest lots. [ST §1.5]
- d13 Road network as a planar straight-line graph grown one road at a time: each road optimised (lengthened, snapped to an intersection) and checked for legality (not too close to other roads, not ending in water); every crossing triggers incremental lot detection (the split lot and the new lot); lots tracked with metadata (e.g. already used). [ST/IN §2.1]
- d14 Roads may not overlap without a shared intersection; invisible edges guide fills. [ST §2.1]
- d15 Edge-type vocabulary: edit types Road / Main road / Small road / Dirt road / Invisible, plus walls and stone fences drawn with road controls; 14 wire types incl. border (3), piers (12), water outline (14). [ST/SH §2.1; CR]
- d16 Priority queue of road proposals: jitter within the angle cap, extend by segment length, local constraints, insert + lot detection, left+right branch proposals every N segments, continuation priority +1 (offshoot) or + spoke increase. [ST/IN §2.2]
- d17 Between stages: unconnected normal roads pruned, main roads trimmed back to the current perimeter. [ST §2.3]
- d18 Branch geometry: Continue → perpendicular then straight with jitter (deformed grid); Curve around origin → branches hold a fixed distance from the centre (concentric rings, annular-sector lots). [ST/SH §2.4]
- d19 District stages create large district lots; each lot's district type is decided from the remaining unplaced buildings and what the lot is next to; per-type logic: landmarks → divide lot → place buildings → decorate. [ST §2.5]
- d20 Divide-lots-to-area: inserted roads (of a chosen road type) split areas in two until every area is under the maximum (regenerate default 10 000 m²). [ST §2.5]
- d21 District lots below the minimum area merge into an adjacent district; districts render as unions of lots. [ST/SH §2.5]
- d22 Residential district order (most populous first by default; class order selectable). [SH §2.5; p40]
- d23 Shanty towns replace lower-class residential districts when the average lifestyle is squalid/poor and only after the first half of the settlement. [ST §2.5]
- d24 Plot level between lot and building; unused plots between buildings decorated; "anywhere in lot" off = buildings only next to roads, on = along all edges incl. the interior. [ST/SH §2.6]
- d25 Plot generation (inferred edge-driven frontage strips); Dense = the plot is the building; Gaps = the same tiling inset; Individually placed = template shapes (L, T, rectangle) fitted into plots with open ground between. [ST/IN §2.6]
- d26 Size modifiers: None / Small tents / Smaller (½) / Bigger (2×). [ST §2.6]
- d27 Landmark footprints are templates (cruciform keep with corner projections); market squares as large open polygons. [SH §2.6]
- d28 Suburb stage: small lots from the outset with buildings placed immediately; invisible lot edges let buildings sit on the fringe; main-road lots parallel to main roads; offshoot lots from the perimeter ring, main roads and other offshoots. [ST/SH §2.7]
- d29 Outer settlement: extend main roads to the map border; estimate the lots needed for outside buildings + landscape features; divide outside lots until that count; place features with their buildings, clustering similar features. [ST §2.8]
- d30 Roof modes Flat / Flat roof-shape texture / 3-D roofs (computed at render, not stored) / Flattened 3-D; straight-skeleton roof. [ST/IN §2.9]
- d31 Render conventions: sun-driven soft shadows; cased road bands; label modes Flat / Rotated / Arced with zoom-invariant option; background layer order background → water → below-road → above-road; decorations as individual instances vs decoration areas (shape + density, filled at render); exports PNG, SVG (simplified), GeoJSON. [ST §2.9]
- d32 Size table: ten sizes from HAMLET (90 people, 1.5 km map) to METROPOLIS (49 500, 6 km) plus BLANK; strongly non-linear density. [SH §3.1]
- d33 Six lifestyle tiers; each building's lifestyle drawn from a distribution centred on the average lifestyle; lifestyle drives district creation and decoration. [ST §3.2]
- d34 Dependency graph (80 resource/service nodes): per-N-people or per-N-other-nodes rules converted to per-person ratios; a virtual population counter runs ahead to minimise unemployment (`alwaysPlaceWorkplace`); core vs shop pools with shop probabilities inside/outside the settlement; lifestyle-banded pools; first-placement population thresholds. [ST/SH §3.3]
- d35 Residential pools per lifestyle with deliberate rare outliers (hidden dens, cult fronts, a capped mansion); religious pool. [SH §3.3]
- d36 209 building types with initial number, limit, provided/used resources, items/services, minimum settlement size, coast/river/raw-resource requirements, district pool tags, outside-settlement flag (farms, mines, lumber, quarries). [SH §3.4]
- d37 Landscape settings set the available raw resources that gate the dependency graph. [ST §3.4]
- d38 Thirteen pool tags = district-affinity classes; 17 district configs incl. castle, keep, university, cathedral, shanty town, small-settlement centre, fallback general. [ST/SH §3.4]
- d39 Resource chains (82 provided / 66 used) affect only the simulation, not generation. [ST §3.4]
- d40 Buildings → people: names/descriptions, per-type resident rules (family, house-share, single clergy), job postings filled from the unemployed, unfilled postings tracked; post-process factions, interest-based friendships, rivalries. [ST §3.5]
- d41 Races (life stages, max age, name generator, heights), age groups, 15 name generators, appearance-template editor, race-pair partnering with child races and adoption. [ST/SH §3.6]
- d42 Genders with a directed partner matrix. [SH §3.7]
- d43 Class-gated education; D&D stats with profession modifiers. [SH/ST §3.8]
- d44 Government forces buildings: King/Queen → Castle, Lord/Lady → Keep, lesser nobles → Manor house, reeve/sheriff/bailiff → Feudal office; democratic → assembly hall + representatives; factions by size with meetings; religions as pantheons with per-religion temples; military share. [ST §3.9]
- d45 Simulation details: person types, schedules, guest workers, building gating by opening hours and minimum age, sub-location limits and tags, Big-Five personality, family nodes + friend groups, lazy person generation (few fields saved; rest regenerated on view and locked on edit), items/services with prices, 299 professions. [ST/SH §3.10]
- d46 Water semantics in the road generator: roads extend into bridges over rivers and terminate at oceans; landscape parameter block (coast type, rivers, river parameters, water direction, forests, fertile land, farm option, reserve natural landscape, mines, quarries). [ST/SH §4.1]
- d47 Coast: two arms grown from near the centre to the map edge (each configurable); overall shape (Smooth / Gentle / Sharp curves) then detail erosion (None / Bays / Deep bays / Rough / Jagged), "more extreme"; detail eased near the settlement centre so the harbour sits in a calm stretch; bay/headland classification with bay texture weights (empty/sand/pebble/rocks), bay rocks, inset texture band (cliff/forest) on headlands or the whole edge, headland rocks. [ST/SH §4.2]
- d48 Harbours carved from the waterfront district by a template shape (rectangle, semi-octagon, semi-hexagon, L wide/narrow); harbour-wall shape (single/two arm, follow coast/stick out) and type (wall, wall & rocks, breakwater); pier shape (none, straight, branching) for harbour and open coast; pier material. [ST/SH §4.3]
- d49 Rivers: shape (straight / gentle / sharp), one path then convergent (upstream) or divergent (downstream) branches from any existing stretch; a branch that hits a river joins it and stops, forming an island; width in metres; minimum bridge spacing; acknowledged failure: river bending back into the ocean. [ST §4.4]
- d50 Manually drawn water: river shape / river path / ocean shape tools, protected disc at the origin, bridges only over rivers, path smoothness iterations; water fill floods a road-enclosed face; snapping-distance slider. [ST/SH §4.5; CR tags]
- d51 Farmland layouts: Default (by size and landscape; climate override), Farmsteads (families live on them; all space left after forests and features), Around perimeter (farmers live in town; smaller fields close in), Around rivers (falls back to perimeter); farm types add raw resources. [ST §4.6]
- d52 Forests as decoration areas (density multiplier); individual-tree multiplier for natural areas; mines/quarries gate ORE/STONE; reserved natural landscape keeps part of the land wild. [ST §4.7]
- d53 Climate presets set the natural background texture and separate inner vs outer tree-type proportions. [ST/SH §4.8]
- d54 Natural-area decorations (stone circles, copses, ponds, ruins; counts random by climate and size) with trails to the road network. [ST/SH §4.9]
- d55 District decoration schema: background textures behind built plots; lot decorations for lots without buildings (park/plaza variants); weighted plot-decoration rows (one row applied to all unused plots of a lot; singletons placed once); lot-edge trees; waterfront edge options; per-class profiles (lower: park/plaza + trees; middle: well plaza, bandstand/statue; upper: fountain plaza, street trees, lawns/trees/garden fences; industrial/waterfront: paved ground + fences; shanty: dirt, fire pits, individually placed tents). [ST/SH §4.10]
- d56 Declared unknowns: vertical vs horizontal branch counters, lot-split line, plot rule, number of districts, district-type scoring and naming, legality thresholds, failure handling, coast detail algorithm, wall tracing/gates/towers, perimeter spokes, rounded edges, building names, determinism (seed null; render-time fills). [§5]

### A.7 `ftg-payload-visual.md` (Galeiaward payload + request + renders + Foundry module, incl. Critic addendum, Critic-2 addendum and part 2)

- v01 Generation is server-side (≈3–7 s per part 2; the ≈300 s figure was the recorder's cap); the client builds one Three.js scene from one protobuf (merged vertex-coloured geometry, BVH picking, a worker, no WASM); no stage trace. [SH §1; CR part 2]
- v02 Wire geometry: integer cm, zig-zag sint32, centred ±2500 m for a CITY; polygons stored as closed rings; +x east, +y north. [CR A]
- v03 Wire data model: id, name, road graph, map-extent ring, water bodies, wall towers, buildings, typed land-use lots, districts, decoration layers, then the whole population model (races, partner matrices, genders, religions, factions, stats, calendar, sun/season). [SH/IN §3.1]
- v04 Road graph = edges {id, nodeA, nodeB, type} + nodes {id, position, adjacency}, exactly consistent. [SH §3.2]
- v05 Building record: id, closed ring, name, category (16-value legend), label, entrance point, map-symbol flag (temple, market), variant/roof index, sub-location count. [SH/IN §3.3]
- v06 Category mix of a CITY (2039 residences, 505 artisans, 88 shops, 56 industrial, 34 services, 24 taverns, …) and the "Building type" legend layer. [SH §3.3]
- v07 Sub-location (room) counts: 5 for ordinary buildings, 6 house shares/temples, 10 larger works/homes, 20 mansions, 0 market squares. [SH §3.3]
- v08 District record: id, long name, contracted display name (Rustic Village → Ticwick), label anchor, boundary ring, one-line prose summary of its mix ("a waterfront district, but also contains industrial and park areas"). [SH §3.4]
- v09 Decoration layers: sprite groups with asset keys + per-instance variant + scale (deciduous/coniferous/palm, harbour rubble), forest outlines in the tree layer, standalone singletons (well / bandstand / statue). [SH/IN §3.5; CR addendum]
- v10 Tree sprite variants assigned round-robin; every scale 1.0 (size variation lives in the art). [SH §3.5, §8.7]
- v11 The request carries the whole tuning surface (layout, landscape, 17 district archetypes with decoration blocks, economy, sun/season, calendar, stats). [ST §4]
- v12 Separate inner vs outer tree-species proportions. [ST §4.2]
- v13 Size ladder: population ×550 while map width ×4 — size is expressed as density on a near-fixed canvas. [SH §4.4]
- v14 Road-graph statistics (corrected): 5326 edges, 4303 nodes, 192 km; 83 dead ends; 62 % degree-2 nodes. [MS §5.1; CR]
- v15 Hard 15° per-vertex turn cap on streets and main roads; not on suburb lot outlines/rural lanes. [MS §5.1]
- v16 Degree-2 nodes bimodal: near-straight run vertices and exact 90° block corners. [MS §5.1]
- v17 Junctions locally orthogonal (median arm angle 90.02°, straight-through + side street common). [MS §5.1]
- v18 Flat global heading spectrum: each district/branch carries its own local orthogonal frame. [MS §5.1]
- v19 Buildings: 90 % quads, rectangularity median 0.98, a sheared tail (parallelograms, trapezoids, triangles) filling awkward plots; ordinary footprint ≈10 × 10 m, median 103 m². [MS §5.2; CR B]
- v20 Landmark footprints are bespoke: temples as 6-/7-pointed stars and an octagon (350–661 m²), theatre a 9-gon, market square an open 51 × 51 m quad with no rooms. [MS §5.2; CR B]
- v21 Entrance = a point exactly on the outline, on the road-facing edge, ≈3 m from the road centreline; 109 buildings lack one. [MS §5.2; CR B]
- v22 Setback: nearest vertex median ≈2 m from the road centreline; buildings pushed to the street. [MS; CR B]
- v23 About 48 % of buildings axis-locked (parallel/perpendicular) to their street. [MS §5.2]
- v24 Shared walls: 6.4 % of buildings share an exact vertex; the terrace look comes mostly from tight packing with small gaps. [MS §5.2; CR B]
- v25 Typed lot groups with a render-class flag (in-town, plaza, outside): building blocks (median 441 m², 1.52 buildings per lot, 22.9 % empty, 38 % coverage), background regions, plazas, six field groups (one per available raw resource), forest, reserved natural area. [MS §5.3; CR B]
- v26 Water: sea (44 % of the map), two river reaches, harbour basin, all resampled at a 50 m step and smoothed at draw time. [MS §5.4; CR B]
- v27 Wall: only a 17-tower chain is serialised; the chain runs along district-ring vertices; open chain from river bank to coast; the band is synthesised by the client. [MS §5.5; CR]
- v28 Trees: 4125 individual instances (hedgerows, suburbs, scatter); no minimum spacing (not Poisson-disc); forest outline duplicated as a lot and a tree-layer region. [MS §5.6; CR]
- v29 District rings are simple and hug the built area; half the buildings lie outside any ring (suburb/outskirts). [MS §5.7; CR B]
- v30 Built core ≈1.4 km across, centred on the map origin, with a long tail of farmsteads; ≈3.4 people per building. [MS §5.8; CR B]
- v31 Inferred pipeline details that survive the ordering correction: bespoke landmark footprints, entrance stamping on the road face, function assignment by the dependency graph, outside fields/forest/reserve/rural track web, decoration pass. [IN §6; CR C12]
- v32 Foundry module: iframe of the live instance on a 5000 × 5000 scene (1 unit per metre); origin-checked postMessage protocol; a `stateId` optimistic-concurrency version token fanned out to all clients; SIMULATE_TIME; building/person/faction/district entity fields; pins; journal links. [ST §7]
- v33 The module's district "type" is the lifestyle axis (+ industrial), orthogonal to the 17 archetypes. [ST §7.3]
- v34 Older (pre-2026) render as an iteration baseline. [SH §7.4]
- v35 2026 palette: open vs nearshore vs sheltered-harbour water tones, beach + foam line, pasture, ploughed and wheat fields, forest, garden lawn, paving, wood and stone building ramps, wall band and tower discs, pier bars. [SH §8.1]
- v36 Ground as a painted raster with per-surface noise; hedgerows of tree sprites on field edges; soft forest edge; coast gradient → foam → beach → grass; river ribbon narrowing upstream with bridges. [SH §8.2]
- v37 Roads as filled bands with a darker rim, hierarchical widths (main ≈ 2× alley), mitred corners, filled junction polygons; rural tracks thinner and warmer. [SH §8.3]
- v38 Plazas as large paved voids; residential block interiors as lawn with trees and furniture; waterfront/industrial ground paved. [SH §8.4]
- v39 Buildings: two-tone ridge split for a pitched read at every zoom; soft down-right shadow separating terrace units; no outlines; stone ramp type-driven (temples, civic, warehouses); landmarks shape-coded, not icon-coded. [SH §8.5]
- v40 Wall as a crenellated band with round tower discs, crossing streets with no drawn gate; harbour moles with rock scatter; piers ⟂ the quay at even spacing; lighter sheltered water. [SH §8.6]
- v41 Trees: 7 clustered-blob sprites with outline, highlight and shadow; one light source. [SH §8.7]
- v42 Labels: serif, haloed, set along a curve through the district, sized by importance; no street names or building labels on the map. [SH §8.8]
- v43 UI chrome: name plaque, search, layer dropdowns, zoom, scale bar stepping with zoom, unit toggle, grid, pins, clock panel; landing promise "every street, building, and resident – ready in seconds"; a concentric-radial metropolis on the landing page. [SH §8.9]
- v44 Standing robustness hazards: 0.01 m edges (2.9 % under 5 m), 2.5 m² footprints and ≈1 m-wide slivers, 109 buildings without entrances, a duplicate preset key; no progress feedback. Retracted: non-simple rings, duplicate vertices, out-of-extent buildings. [MS §9; CR C]
- v45 "The payload is the contract": typed edge graph, building ring + entrance + category + label + room count, typed lot groups, district rings + anchors, water, wall-tower chain, sprite layers. [IN §10]
- v46 Reader's improvement pointers: replace the per-vertex angle clamp with a smoother mechanism; improve non-Poisson trees, round-robin sprites and fixed scale; a fixed canvas caps the legibility of the largest settlements. [IN §10]
- v47 Part 2 (roadlength100 capture): the form's metres are real; main-road steps persist at L + 0.5; district-stage normal streets are laid as independently jittered (L + 0.5)/2 segments; suburb streets at the configured 30 m; suburb lot outlines ≈14.7 m (type 4); outer main-road extension in 100 m steps to the border. [MS part 2]
- v48 Edge-type semantics after part 2: 0 district and suburb streets, 1 main roads, 4 suburb lot outlines, 3 map border, 12 piers, 14 water outline, 6 rural lanes. [CR part 2]


## Appendix B — raw item → master row(s)

Computed by script from the Evidence column of §3; every one of the 277 raw items of Appendix A is cited by at least one master row.

**`_critic.md`** (5): c01 → A01, A02; c02 → F06; c03 → J02; c04 → D13; c05 → D08.

**`_critic-ftg.md`** (24): k01 → A09; k02 → F10; k03 → D12; k04 → E11; k05 → E04; k06 → D18; k07 → D17; k08 → D06, D07, H18; k09 → C09; k10 → F15; k11 → A01, A02; k12 → G02; k13 → E07, J05; k14 → E03, F01; k15 → C08; k16 → H16; k17 → A07; k18 → I01; k19 → B09; k20 → K08; k21 → N01; k22 → A23, O03; k23 → D10, D11, F12, O02; k24 → A06, D13.

**`ftg-posts-a.md`** (49): a01 → D01; a02 → D02; a03 → D06, D22, F23; a04 → D05, M03; a05 → D03; a06 → A01; a07 → A03, E15; a08 → B04; a09 → B05; a10 → B05; a11 → B03; a12 → A04, E01; a13 → E02; a14 → F18; a15 → F03; a16 → E12; a17 → L03, L04; a18 → E14; a19 → F03; a20 → A08; a21 → J01, J02; a22 → F08; a23 → F20, J03; a24 → J04; a25 → E07; a26 → G01; a27 → G04, G06, K20; a28 → B13; a29 → H01; a30 → H02; a31 → H13; a32 → H16; a33 → A14, A24, Q2; a34 → B01, VL-1; a35 → B09; a36 → C06; a37 → C07; a38 → A13, B12, B14, C04, C05; a39 → C02; a40 → C01, L06; a41 → B11, C03, C08, M07; a42 → A06, M01, N01, N02, N04, N05, N07, O01; a43 → A23, O03; a44 → I04; a45 → I16, J04, J06, K04, K08, K11, K12, L01; a46 → F11; a47 → A10, A16, A22, Q1; a48 → I15; a49 → Q3.

**`ftg-posts-b.md`** (45): b01 → A13, C04; b02 → C11; b03 → B01; b04 → D27; b05 → A07; b06 → A08, A13; b07 → A11; b08 → C12; b09 → C06; b10 → K09; b11 → M02; b12 → H02, H03, H13; b13 → K10, M01, M04; b14 → K02, K03; b15 → K15, K20; b16 → J05; b17 → K16; b18 → K17; b19 → H20; b20 → A04, L08, O01; b21 → A01, A04; b22 → A05; b23 → D08; b24 → A25, D09, D15, D19, D20, D21, G03; b25 → E03, E09, F17; b26 → D21, D25, F19, VL-1; b27 → F08; b28 → E08, E09, E13; b29 → F20, G04, G05, G07, G08; b30 → I02, I04; b31 → I07; b32 → H06, H07; b33 → H17; b34 → K19, L01, L02; b35 → C09, C13; b36 → K14, M09, N05, N06, N07; b37 → A15, N02, N03; b38 → A23, K01, O03; b39 → E13, L08; b40 → F16, H19, K04, K08; b41 → F03; b42 → A24, K14, L09; b43 → A01, Q1; b44 → A10, A17, A18, B05, D23, M06; b45 → A08.

**`ftg-posts-c.md`** (50): p01 → A21, F04; p02 → F22; p03 → F05; p04 → F06; p05 → B13, G09; p06 → G08, G10; p07 → K07; p08 → K02, K05, K18, L01, O04; p09 → A13, I07, K11, O04; p10 → I09; p11 → I08; p12 → F19, I01, I06, VL-1; p13 → I02; p14 → I04; p15 → M05; p16 → I05; p17 → I14; p18 → C10, K05; p19 → K06, K19; p20 → K06; p21 → I15; p22 → I09, I12; p23 → I09; p24 → H09; p25 → H08; p26 → H06; p27 → H10; p28 → H19, K01; p29 → A20, M02; p30 → A19; p31 → H14; p32 → L03, L05; p33 → K12, K13, K19; p34 → L07; p35 → B10, E14, F21, M05, M06, M08; p36 → M05; p37 → A08, A09, K01, O03; p38 → A13; p39 → B12, C01, C08, C13; p40 → E06; p41 → S3-1; p42 → H12; p43 → A14, A15; p44 → K08, K09, L09; p45 → A16, A21, A25, Q1, Q2; p46 → A10; p47 → F23; p48 → F20; p49 → K16, Q3; p50 → A02, G11, M10.

**`ftg-docs-params.md`** (56): d01 → A09, O01; d02 → A01, A02, A03; d03 → A14; d04 → D19; d05 → F20; d06 → F20; d07 → D15; d08 → E05; d09 → A05, G03; d10 → D12, D17, D18, G02; d11 → D25, D26, F07, I14; d12 → I09; d13 → D01, D04, D13; d14 → D03; d15 → D06, D22; d16 → D09; d17 → D14; d18 → D16; d19 → E03, F17; d20 → F01, F02; d21 → E04; d22 → E06; d23 → E07; d24 → F03, F07; d25 → F08; d26 → F09; d27 → F16; d28 → D25; d29 → D24, I02, I03; d30 → K02; d31 → K18, K21, L01, N01, N02; d32 → B01, VL-1; d33 → B03; d34 → B05, B06; d35 → B07; d36 → B05, B09; d37 → B09; d38 → B08, E08, VL-1; d39 → B10; d40 → A03, B11; d41 → C01, C02, L06; d42 → C01; d43 → C03; d44 → B12, B13, B14, G09; d45 → A12, B10, C03, C04, C06, C07, C08; d46 → B09, H01; d47 → H04, H05, H06; d48 → H17; d49 → H11, H16; d50 → H02, H03, M02, M03; d51 → B09, I01; d52 → B09, I07, I13; d53 → I11, I15; d54 → I12; d55 → F23, J01, J02, J03; d56 → A06, D18.

**`ftg-payload-visual.md`** (48): v01 → A07, K01; v02 → A09; v03 → A09; v04 → D01; v05 → F21; v06 → F21, K12; v07 → C07; v08 → E10, L04; v09 → H18, J02; v10 → I10; v11 → B08, E08; v12 → I11; v13 → B01, B02; v14 → D02, D25, O02; v15 → D10; v16 → D11; v17 → D11; v18 → D11; v19 → F10; v20 → F16; v21 → F12; v22 → F13; v23 → F13; v24 → F14; v25 → F15, I04; v26 → H15; v27 → G02, G04; v28 → I10; v29 → E11; v30 → O02; v31 → A02; v32 → B10, C09, M09, N05; v33 → E10; v34 → K08; v35 → H19, K08; v36 → I16, K10; v37 → K09; v38 → J06; v39 → F16, K04; v40 → G06, H18, K20; v41 → K11; v42 → L01, L02; v43 → L07, L09; v44 → D20, F22, O05; v45 → A09; v46 → B02, I10; v47 → D12, D24; v48 → D06.

Unmapped raw items: 0.

## Fable review (2026-09-27) — B18

**Verdict: CONFIRMED.** Fable (lane `fable-review/main/evidence-review`) read this audit whole (227 rows, 54 gaps (47 PARTIAL, 7 MISSING)) and re-checked every PARTIAL /
MISSING row, plus the COVERED rows that carry a note, against the CURRENT design (`docs/ARCHITECTURE.md` sha256 `1c23190f…`,
13 026 lines, 2026-09-27 21:45) and the fix-round record (`docs/ARCHITECTURE-VALIDATION.md` §R1–§R5). Every gap this audit raised
was real against the text it read (the pre-fix design of 2026-09-25 15:10, which the fix seats also read and never ruled INVALID), and
every one is now closed by a mechanism in the current text or staged by the owner's roadmap with its hook present; no capability of the
reference escaped the row set. The row-by-row citations (current line numbers) are in `docs/fable-review/main/evidence-review.md`
§B18. Nothing in this file is corrected: its verdicts describe the pre-fix text and remain a true record of it. The reconciler may
replace the PENDING marker with `> Fable-reviewed 2026-09-27: CONFIRMED` and set queue row B18 to REVIEWED-CONFIRMED.
