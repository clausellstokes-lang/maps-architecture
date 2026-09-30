# Red team — FTG-CLASS PARITY WITHIN THE FUSED BASE lens against `docs/ARCHITECTURE.md`
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat redteam:ftg (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `validation/redteam-ftg` · 2026-09-25 · seat: red-team validator (Fable role; opus stand-in), clean-room (no
captured JavaScript bundle opened; no reference code copied; FTG's payloads were decoded as data with the project's own
tools, and FTG's tables and names are cited only as evidence of reference behaviour).

**Status: COMPLETE — 22 findings (1 blocker, 15 major, 6 minor).** §2 is the parseable table (one row per finding, the `RT_SCHEMA`
fields, laid out as in `docs/validation/redteam-geometry.md`); §3 gives each failure scenario, its evidence and the
required change; §4 lists what to keep; §5 groups the findings and maps overlaps with the geometry red team (GEO-n) and
the FTG coverage audit; §6 separates CONFIRMED from PLAUSIBLE.

## §0 Reading record

| file | size | read |
|---|---|---|
| `workflows/lane-prompts/03/redteam_ftg.prompt.txt` | — | in full (the brief) |
| `research/findings/_critic.md` | 42 KB, 478 lines | first, per the standing ruling: §0–§1.2 and §2–§6 in full (lines 1–120, 333–478); the §1.3 per-source citation-count table (lines 120–333) not read — it holds citation counts only |
| `docs/ARCHITECTURE.md` | 245 KB, 2 200 lines | in full, every line (§0–§17, PART II, PART III, D-1–D-25, J-1–J-18, deferrals, Appendix A) |
| `docs/ARCHITECTURE-VALIDATION.md` | 5 KB | §0 in full (history of the file under review; what the red team should weigh; the deferral rule) |
| `workflows/03-assess-design-validate.js` | — | `RT_SCHEMA` and the RedTeam lens list only (to make §2 parseable and to see the neighbouring lenses) |
| `research/findings/_critic-ftg.md` | 49 KB, 256 lines | in full (F1–F27, §2, 37 spot-checks, §4 payload table, §5, §6) |
| `research/ftg-capture/roadlength100/README.md` | 11 KB | in full (the settled F3: district streets at (L + 0.5)/2, main roads at L + 0.5, suburb streets not halved, generation ≈ 3–7 s) |
| `research/findings/ftg-docs-params.md` | 77 KB, 665 lines | in full, incl. the Critic-2 addendum |
| `research/findings/ftg-posts-b.md` | 86 KB, 1 049 lines | in full, incl. the Critic-2 addendum |
| `research/findings/ftg-payload-visual.md` | 74 KB, 1 108 lines | in full, incl. the Critic addendum and Critic-2 addenda parts 1–2 (§5's superseded statistics read against the corrected table) |
| `research/findings/ftg-posts-c.md` | 87 KB, 1 038 lines | in full, incl. the Critic-2 addendum |
| `research/findings/ftg-posts-a.md` | 81 KB, 1 072 lines | in full, incl. the Critic-2 addendum |
| `docs/validation/redteam-geometry.md` | 134 KB, 1 174 lines | header, §0–§2 (the GEO-1–GEO-42 table) and §4–§6 in full; the §3 per-finding narratives (lines 117–1 096) not read — each table row carries its claim, evidence and change, which is what de-duplication needs |
| `docs/validation/coverage-audit-ftg.md` | 162 KB, 857 lines | header, §2, §4–§7 in full; §3 rows A01–A19, B01–B10, C01–C13, G01–G11, H01–H20, I01–I09, M01–M10, N01–N07, O01–O05 in full; rows D09, D16–D19, D24–D27, E03–E11, F09–F21, J05, K01–K20 located and read by grep; appendices by grep only |
| FTG guide pages (primary-source spot-checks) | — | `research/ftg-docs/useSettlements__settings.md` lines 1–60; `editSettlement__bulk_people.md` and `editSettlement__regenerate_area.md` in full |
| lineage checks | — | `docs/improvements/ftg.md` lines 700–716 (origin of "pin anyone a user has looked at"); `docs/design/proposal-kernel.md` lines 448–458 (origin of `builtBlockShare ≈ 0.62`); `docs/IMPROVEMENTS.md` R13 row and the "no oblique or 3-D default view" lines, by grep; `docs/confidence/ftg.md` row D8, by grep |
| our own decoder | — | `research/ftg-capture/critic2/zigzag_rederive.py` lines 1–162 and the function list of `tools/pb_raw.py` (to reuse the project's zig-zag decoding) |
| scratchpad executions (this seat) | — | `ftg_anisotropy.py` / `.out` (both FTG layout payloads decoded as data: outline anisotropy along main roads), `ftg_arith.py` / `.out` (plot-area spread, Chaikin effect on the §13.5 metrics, FTG junction mix, heading drift); `captures/ftg/` listed |
| `docs/validation/redteam-{lifecycle,mfcg,scale}.md` | landed while this seat worked | §2 table rows skimmed by grep (id, severity, first ≈ 200 characters of each claim), for cross-references only (§5); not read otherwise |

**Not read** (outside this lens, or superseded by the critics and audits read above): `docs/CONFIDENCE.md`,
`docs/IMPROVEMENTS.md` beyond the grep hits, `docs/confidence/*.md` and `docs/improvements/*.md` beyond the lines listed,
the design proposals and judges beyond the lines listed, the MFCG / VG / NG / 2017 / manor / visual-spec / watabou-extra
findings files, every capture other than the two FTG layout payloads and the `captures/ftg/` listing, any reference
source and any captured JavaScript bundle. Every reference fact below comes from a passage in this table. Reading total
≈ 300 k tokens, under the 350 k switch point.

## §1 Lens, method, severity rule

**Lens (from the brief).** FTG-CLASS PARITY WITHIN THE FUSED BASE: road-growth stages and presets (Medieval, twisty,
American, Ringed), districts as first-class objects, lots and building placement modes, walls after a stage, harbours,
farmland modes, islands and coasts, terrain / heightmap and the 3-D view, the 50 k-person simulation with family units,
schedules and time, the building / resource dependency graph, editing tools (draw roads and rivers, regenerate area,
bulk edit), the wire format and sync / embedding. The question is what the architecture under-scopes or gets
structurally wrong when FTG's capability is carried into the fused base.

**Method.** Every finding is a concrete input or state leading to a wrong output, non-determinism, a lost or
unreachable capability, a missed budget or an unmeasurable claim, with the architecture section that specifies the
failing mechanism, the evidence (FTG's creator statements, guide text and measurements through the findings files and
critics, three guide pages re-read at source, and this seat's own executions), and the specific change required.
Findings of `docs/validation/redteam-geometry.md` are not repeated; where a finding touches the same mechanism it cites
the GEO id and states what is different. Where the FTG coverage audit marked a row COVERED and this seat shows the
mechanism cannot deliver it, the row id is named. Where a finding re-raises a listed deferral, it says why the deferral
does not cover it. The IMPROVEMENTS decision "no oblique or 3-D default view" (coverage audit K15) is respected: no
finding asks for FTG's 3-D view.

**Severity** (the geometry red team's rule, kept for comparability). *blocker* — the design, as written, cannot meet a
goal it states (quoted) **and** the repair changes the stage structure or a cross-cutting guarantee (determinism,
locality), not one mechanism; *major* — will bite in normal use and needs a design change to a stage, a primitive, a
schema or an interface (a test or acceptance definition counts when it is a stated gate); *minor* — a local defect or an
under-specification with a cheap, contained fix.

**Evidence classes.** Architecture text (quoted by section) is CONFIRMED as what the design says. Reference behaviour is
CONFIRMED only where a findings file or critic records it and this seat read that passage, or where this seat re-read the
guide page. Executed measurements and arithmetic (scratchpad) are CONFIRMED as computed; their consequence for a built
PLAT is PLAUSIBLE until code exists.

## §2 Findings table (machine-parseable; one row per finding)

Columns match the workflow's `RT_SCHEMA` (`id`, `severity`, `claim`, `evidence`, `required change`). Each row stands
alone; §3 carries the full failure scenario per id.

| id | severity | claim | evidence | required change |
|---|---|---|---|---|
| FTG-1 | blocker | S10–S14 are lazy per district ("only visible districts first") while S10b places the whole roster by a global greedy fill with capacity accounting; placed per district as districts are derived, the town's content (which plot holds the guildhall, the inns, the patrician houses) depends on viewing order, so two viewers of one permalink get different model hashes, K-3 reports spurious mismatches and requestedVsBuilt changes while panning; placed only after every district exists, S11 (keyed by the plot's class) cannot be lazy and the METROPOLIS design point the text relies on is void. | ARCH §4.1 ("S10–S14 are lazy per district after the first paint"; "S1–S9 → a city-LOD preview while S10–S13 continue"), §4.7 S10b (descending-score fill, capacity accounting, ≤ 3 reconcile rounds) and S11 (table keyed by class × band × density), §8.5, §12 ("METROPOLIS relies on lazy per-district derivation of S10–S13 (only visible districts first)"), §6.2, §5.4. FTG places the whole manifest in one generation (ftg-posts-a §2.5, 91451446; the CITY payload carries all 2 798 buildings with category, name and entrance, ftg-payload-visual §3.3); FTG V1's district-by-district claiming is its documented failure (ftg-posts-b T-19). Same defect as LC-2 (lifecycle lens, landed in parallel); SCL-5 covers its performance side. | Split S10b into a global, non-lazy S10-alloc before the first paint (the roster allocated to districts as counts per class × band from capacity estimates on the S9 blocks; declared order and stream; the allocation table persisted; reconcile moves counts between districts before any placement) and a lazy per-district placement of each district's allocation on its own plots; restate §4.1 and §12; CI: derive the districts of 50 METROPOLIS seeds in three random orders and assert identical hashes; requestedVsBuilt final at first paint. |
| FTG-2 | major | S2 sizes each stage by area (Σ n·plotArea/coverage/builtBlockShare, one plot area per class) before S6 creates the prosperity field that sets plot size; the design's own granularity table spans 80 m² (poor) to 878 m² (rich) per plot, so a Comfortable-like wealth mix needs 2.7× (2.1× with equal quartile bands) the land of a single modest value; the formula double-counts coverage if plotArea is a plot area (×2.6 at 0.38) and builtBlockShare = 0.62 is 1 − FTG's 38 % footprint-on-lot coverage, a category error; no capacity feeds back to growth, S7 walls the undersized stage, and O7 (a) or the walled share fails. | ARCH §4.2 S2, §4.4 (boundary from the area budget), §5.2 F-BUDGET-STAGE ("built area < budget"), §4.5 (bands by quantiles), §4.7 granularity table and S10b reconcile, D-2; proposal-kernel §4.3 (origin of 0.62); _critic-ftg F13 (271 m² of lot per 103 m² footprint = 38 %); FTG stops each stage on a building quota (`proportionOfBuildings`, suburb takes the remainder; ftg-docs-params §1.2, §2.5; ftg-posts-b T-22) and its V1 area estimate is the version that "would regularly give up" (T-18, T-19); scratchpad ftg_arith.out A. Adjacent: LC-6 (quantile banding), MFP-6 (walled share). | Budget in plot counts per class × band with footprint and plot areas named separately and builtShare calibrated on a measured plot share; set the field's band cut points from the roster's household wealth shares; replace the area check with a plot-capacity check after S10 of each stage with one bounded top-up before the next stage (trace recomputed on top-up, compatible with GEO-18); B-CITY sweep over wealthLevel {0, 0.5, 1} asserting population ± 5 % and the walled share in band. |
| FTG-3 | major | FTG's landmark-first fix is lost: S8 cuts coarse faces to the block band without knowing any claim, S10 then claims "for each built block" (the institution row tops out at "whole block"), and S12 takes parks and 0.5–2 ha ornamental grounds "from a joined block" after plots and footprints exist; a monastery, cathedral close, university or large guildhall cannot be placed at its requirement and parks either demolish platted plots or miss their quota — FTG V1's "doesn't have room for the current large building … the algorithm gives up". | ARCH §4.1 (S8 before S10), §4.6 step 1, §4.7 S10 (3) and the institution row, §4.9 parks and ornamental-grounds rows, §5.2 F-SITING, §15.2 O18 (f); ftg-posts-b T-19, T-22 ("placing them FIRST (which should be easy as it's a large lot), and then generating roads AROUND them"); ftg-docs-params §2.5. Related, different mechanism: GEO-23, GEO-25. MFP-3 (MFCG lens, parallel) raises the missing reservation from MFCG's side. | Add a district-claims step between S7 and S8: S3 site claims, roster institutions allocated to the district (FTG-1), §4.9 park and green quotas and assignments are sized from their requirement tables and claimSubFace'd from the district's coarse faces, placed by the siting score restricted to the district; S8 cuts around them as holes (the slit exists); S10 keeps only sub-block claims; S12 uses only reserved faces or residue; test: 100 % of institutions and parks larger than one block placed at their requirement. |
| FTG-4 | major | The arterial network is frozen at S4: S3 fixes the destinations, S4 routes once per destination, S5 grows only secondaries and lanes, and primary class comes from betweenness on S4's graph alone; a METROPOLIS keeps its S3 bearing count (four by default) through four rings, outer districts are served by secondaries only, S7's gate count for a 1 500 ha enceinte (N = 13) meets four arterials and turns nine gates into posterns, and grow() (no S4) can never add a main road in any epoch. FTG spawns main roads in every stage. | ARCH §4.2 S3, §4.3 (routes per destination; class by betweenness, O4 c), §4.4, §4.8 (N = 2 + round(0.9·√(area_ha/10)); posterns when N > crossings), §4.11 grow() stage list, D-25; ftg-docs-params §1.3 (`spokeStaySpokeProbability` 0.5 / 0.1, `maxSpokesInStage`); roadlength100 README (stage-2 main roads at their own step); scratchpad ftg_anisotropy.out (main-road edges cross the 400–1 500 m annulus in 7 and 12 of 16 sectors). Related: GEO-27. MFP-4 (parallel) covers the gate / arterial mismatch at the wall. | Give each growth stage a main-road step: promote the highest-betweenness secondary chains toward the stage boundary to primary and spawn new radial destinations on the next boundary at a stage-regime spacing (our own values), routed by an incremental S4 with existing arterials fixed; derive S7's main gates from these primaries and posterns only for the remainder; include incremental S4 in grow(); test: primary length per km² and gates on primaries in band from TOWN to METROPOLIS; each added epoch stage adds ≥ 1 primary. |
| FTG-5 | major | Each stage boundary is a level set of isotropic distance-cost, so on flat dry ground every stage and its wall are concentric discs, with ribbons only outside the last enceinte — the "vaguely circular" look FTG's creator named as V1's weakness and replaced by growth "along the main roads"; measured on both FTG cities (water sectors excluded) the 90th-percentile building radius varies across land sectors with CV 0.20 and 0.33 and is 1.26× and 1.65× longer where main roads run; FTG's spoke-priority shape control has no counterpart and the `linear-street` form is unrealisable. | ARCH §4.4 stage boundary, §4.3 cost terms, §4.4 ribbon regime, §7.7 forms; ftg-posts-b T-20, T-21 ("no longer circular; … anisotropic along the main roads"), T-23; ftg-docs-params §1.4 (`spokePriorityChange`, 1cf7030dc5 vs 5aba8d7537); scratchpad ftg_anisotropy.out; coverage audit D26 (LOW, suburb only). | Define the boundary as a level set of network travel cost (ρ_road along S4 arterials, ρ_off elsewhere) and expose ρ_off/ρ_road as a stage-regime and form row (our spoke-priority equivalent: linear-street high, compact walled low), keeping GEO-18's trace-before-growth; add a B-REF outline metric (land-sector r90 CV, road/non-road r90 ratio) computed on FTG's payloads (script exists) and ours, monotone in the parameter. |
| FTG-6 | major | The `ringed` preset cannot produce FTG's rings: after the tangential branch every step draws from the curvature-continuous random turn with no radius-hold term, S5 lets a proposal continue straight only across a lower-or-equal-class street so every secondary ring stops in a T at the first radial arterial, destination bias pulls rings onto spines, and O4 (b) caps 4-way junctions below 15 % while a ringed town is ring × radial crossroads (FTG's Medieval city is already 36.4 % 4-way); the `american` grid meets the same cap. | ARCH §4.4 (branch types; american/ringed row "a grid-aligned heading table"; legality "across a lower-or-equal class street"; destination bias; T-preference), §4.3 (Y → T), §13.5, §15.2 O4 (b); ftg-docs-params §1.2, §1.3, §2.4 (branches "stay a fixed distance away from the center"; 3–4 concentric closed rings in 03310f4eb6.gif); ftg-posts-b T-21 (radial-concentric town); ftg-payload-visual §8.9; scratchpad ftg_arith.out C; coverage audit D16 / D19 (COVERED). | Make growth rules per-preset data: heading model per proposal class {mean-reverting curvature walk, radius-hold, grid-lock}; a crossing matrix (proposal class × crossed class × preset) replacing the fixed rule; destination bias switchable per class; junction bands per preset or form; fixture: ringed on a flat site gives ≥ 3 closed rings with radius CV ≤ 10 % and ring × radial crossroads. |
| FTG-7 | major | Outside-settlement buildings and farm households are demanded in S2 but their land is made in S12, after S10b siting and S11: the roster's farms, mills, lumber yards, quarries and lodges have only town plots to go to (F-SITING's "place at the district edge") while S12 places farmsteads by an era arable-per-capita table, so either S12's farmsteads stand empty (O7 (a) occupancy fails) or the roster's farms are trimmed; farmland per capita and farm counts come from two tables that can disagree. FTG sizes its outer settlement by the count of outside buildings and features, and farmsteads house families. | ARCH §4.1 order, §4.2 S2, §4.7 S10b, §4.9 hinterland, §10.2 (`requires … farmland`), §5.2 F-SITING, §15.2 O7 (a), O14 (a); ftg-docs-params §0.2, §2.8 ("estimate how many lots we need for the number of buildings + landscape features"), §3.4 (15 `outsideSettlement` types), §4.6; ftg-posts-c §2.6 ("some people will live in the farmsteads"); coverage audit B09 (MEDIUM), I03 (LOW), I06 (COVERED). | Split S12: S12a hinterland land (field partition, farmsteads, mill / quarry / lumber / mine sites, count-driven from the roster's outside classes via FTG-1's allocation, raw-resource availability from S1 per B09) before S10b; S10b sites outside classes and farm households on S12a plots; one table links farm demand and farmland area; S12b greenery stays after S11; test: 100 % of outside-class buildings on outside plots with occupants, farmland per capita ± 20 % and equal to the farm classes' field area. |
| FTG-8 | major | An enceinte must close: a coastal walled town's stage boundary follows the impassable shore, S7 traces it "never across water except at a water gate", F-WALL treats "does not close" as a failure and snaps to the water outline, so the waterfront gets a continuous sea wall; the quays land outside it and, with gates only at arterial crossings and "walls not crossed by streets except at gates", are cut off from the waterfront district. FTG's captured wall is an open chain of 17 towers from the river bank to the coast (473 m), and FTG can wall one stage's lots only (`Around stage lots`), which PLAT cannot express. | ARCH §2.7 `Enceinte.trace`, §4.8, §4.3 (water impassable), §5.2 F-WALL, §5.3; _critic-ftg F15 and §4 row 19; ftg-payload-visual Critic-2 addendum B; ftg-docs-params §1.3 (`wallPlacement`); ftg-posts-b T-26; coverage audit G02 (COVERED). Distinct from GEO-18 (streets crossed by a pulled trace) and GEO-19 (harbour carved after streets). | Allow an open trace whose ends are anchored (typed) on shore, bank or cliff, with the enclosure closed by the L0 shoreline in the enclosed and sealed tests; a waterfront policy row per preset (open waterfront / quay wall with water gates at every quay access / full sea wall); gates for quay accesses when a quay wall exists; `wallPlacement ∈ {aroundAll, aroundStage}`; test on coastal and river seeds: 100 % of quays reachable from the town without crossing a wall except at a gate. |
| FTG-9 | major | FTG's content is global and relational (family units across households, partners, carers, job postings filled from the settlement's unemployed, faction roles, friend groups) while PLAT's people are derivePerson(seed, household id) and its locality is spatial; regenerating district D either re-sites content outside D (against O9 (b) and O2 (c)) or strands relations from other districts, and the schema has no family unit, relation, posting, membership, meeting or sub-location, so D-10's "the data model is already in the musts … cost of reversal: low" and §10.3's "a 50 000-person metropolis stores kilobytes of people" do not hold (FTG's normalised relations alone are ≈ 10 % of its file). | ARCH §2.7, §4.7 S10b, §7.3, §7.4 regenerate row, §10.1, §10.3, D-10, J-9, §15.2 O2 (c), O7 (a), (g), O9 (b); ftg-posts-b T-01 (relations 30 % → 10 %), T-07 (relations excluded from re-roll as graph state), T-31; ftg-posts-a §2.18, §2.21 (employment a post-hoc matching pass); ftg-posts-c §2.20, §2.22 (carer / caree and faction-headcount bugs); editSettlement__regenerate_area.md "Jobs & unemployment" (re-read at source); coverage audit C01–C13 (premise "data model present"). | Add a persisted relation store to the base schema (family units, partnerships, carer / caree, employment, faction roles and memberships, friend groups; derived once by a global pass with a declared stream and order, then persisted with lifecycle and reference integrity); persist FTG-1's allocation table so a scoped regenerate re-sites only its scope, with global rebalancing a separate reported action; state the content locality contract (only reported relation repairs by rule outside the scope); SubLocation and posting records in the registry from M1; extend the locality oracle and O2 (c) to content and relation hashes; restate §10.3's storage claim. |
| FTG-10 | major | "Pinned once seen" turns reading into writing: a pin is a logged edit event, so every person a viewer opens changes the model input and hash, grows the document, fills the undo stack (undo unpins a viewed person before reverting the last real edit) and makes the documents of a GM and players diverge; read-only viewers cannot pin; the O7 module's stored-bytes metric depends on clicks. The rule is attributed to FTG, but FTG locks generated details only "when a person is manually edited". | ARCH §2.7, §4.7 S10b ("pinned once seen"), §10.3 ("pinned once seen or edited (FTG's rule)"), §7.1 `pin`, §7.4 lock/pin row, §6.2, §2.9 (K-3), §11, §15.2 O7 (g); `research/ftg-docs/useSettlements__settings.md` L25–26 (re-read at source; _critic-ftg §3 #35); rule origin: `docs/improvements/ftg.md` lines 707–709; coverage audit A12 (COVERED). Same defect as LC-16 (lifecycle lens, parallel); this row adds the at-source FTG text. | Pin only on explicit edit; make derivation stable by recording, per household, the person-table version current at its creation and deriving under it; an editTable on person tables applies to later households unless the user re-derives existing people through a diffed action (§7.5 pattern); keep "seen" as non-model view state (FTG-12); tests: opening every person of a METROPOLIS leaves the model hash and edit log unchanged; after a race edit, existing people are unchanged unless re-derived. |
| FTG-11 | major | The simulation is specified as whereIs(person, day, hour), a pure per-person query, but FTG's behaviours read other people's positions ("Primary location has other occupants"), fill capacity-limited sub-locations (leisure / temporary residential / guest worker / studying limits, tags), roam as guest workers and "fetch demanded resources"; "people currently here", awake-adult window lights and the favourite-people layer need all 50 000 people resolved per hour in a stated order, with no order, cache or budget given; and sub-locations (Bar, Kitchen, Stage, Table 1–6 inside one footprint; a per-building count on FTG's wire) are mapped to site-plan BuildingSlots ("slots now, rooms at stage 3"). | ARCH §10.3, §2.6 BuildingSlot, §2.7 Person, §12 (no simulation budget), §15.1 F1 / F2, §15.2 O7 module row; ftg-posts-a §2.17 (93999105); ftg-posts-b T-08 (101576411); ftg-docs-params §3.10; ftg-payload-visual §3.3 (field 8.9: 5 / 6 / 10 / 12 / 20), §7.3 (`subLocationsSummary.currentPeople`); ftg-posts-c §2.9, §2.18; coverage audit C06 (COVERED), C07 (PARTIAL-LOW). | Add SubLocation {id, building, name, tags, capacities{leisure, tempResidential, guestWorker, studying}, relaxOptions} to the base building schema, filled from class tables; specify occupancy(dayType, hour) as a whole-population resolution in person-id order, two passes (primary behaviours, then occupancy criteria), cached per (day type, hour) and invalidated by edits, with whereIs reading it; a METROPOLIS budget (one hour for 50 000 people ≤ 50 ms in the worker) with a cost-model test; resource provides / uses edges on roster rows as data. |
| FTG-12 | major | The bridge copies FTG's `stateId` optimistic-concurrency protocol without the server that makes it converge: FTG's Foundry module "never holds settlement state" and every iframe re-syncs from FTG's store, but PLAT has "no server", no command to load a document, no event carrying edit-log deltas and no version handshake, so after a GM's regenerate the players keep the old town, and clients keeping different replayable versions build different towns from one log; FTG also persists the current day and hour, favourites, notes and live public pins, for which PLAT has no state outside the model hash. The "sync service" deferral covers a hosted service, not the bridge's own contract (O11). | ARCH §11 bridge, §1.7 persistence, §2.9 Document, §6.4 ("last N minor generator versions replayable"), Deferrals; ftg-payload-visual §7.1–§7.2, §3.1 (field 22); ftg-posts-b T-31, T-32; ftg-posts-a §2.22 ("keeps the settlement in sync between players"); coverage audit N05 (COVERED). Adjacent: LC-30, LC-31 (lifecycle, parallel). | Make the host the store: LOAD_DOCUMENT {doc or url}, APPLY_EVENTS {baseStateId, events} (rebase or reject), DOCUMENT_CHANGED {stateId, events}, stateId = hash(document id, log length, last event hash); a version handshake (run the document's generatorVersion or open the snapshot read-only); a view-state section outside the model hash (current simulation time, favourites, notes, pins, player location, layer choice) with its own last-writer-wins rule; read-only viewers never write model events; test: host plus three headless clients applying interleaved events converge to one hash. |
| FTG-13 | major | Heights carry no ground datum, so on S1's real terrain the glTF export (the declared replacement for FTG's 3-D view), walls pulled to ridges, bridge decks and the shadow pass cannot stand on the ground: a 10 m house on a 25 % slope has 2.5 m of fall under it and floats or sinks — the failure FTG hit when it first put its height map under its 3-D view; "shadows and 3-D agree by construction" and O17 (g) hold only on flat sites. | ARCH §2.6 Heights, §2.3, §4.2 S1 relief, §4.8, §8.4, §11 3-D row, §15.2 O17 (g), D-8; ftg-posts-b T-14–T-16 (106664214: buildings floating above the terrain; height map as a separate raster); related: GEO-15, GEO-40; the 3-D view itself stays declined (coverage audit K15). | Add baseCm to Building, Wing, Tower, Enceinte segments, Gate and Bridge, computed in S11 from the terrain under the footprint (minimum sample plus a plinth rule; stepped foundations above a slope threshold from a table); eave and ridge above baseCm; bridge deck from bank elevations plus a clearance row; shadows projected from baseCm + height onto the terrain (or a stated flat-ground bound); glTF places meshes at baseCm on GEO-40's draped ground; test: 0 buildings on hilly seeds whose base departs from the terrain beyond the plinth tolerance. |
| FTG-14 | major | The roster is a capped fixed-point iteration (≤ 6 iterations on integer counts with caps, size gates and shop-versus-core draws), which need not be prefix-stable in population: at 21 000 people it can hold fewer chandlers than at 20 000, so grow()'s "delta demand" goes negative and an epoch demolishes a survivor for no circumstantial reason, and §7.8's monotonicity sweep fails for the population control. FTG's loop is sequential (a virtual-population counter adds one building at a time until the target), so its manifest at P + ΔP extends the manifest at P. | ARCH §10.2, §4.11 (grow(); coherence rule), §7.8, D-25, §16 M4 exit ("0 re-rolled survivors"); ftg-docs-params §3.3 (`createSettlement__dependency_graph.md` L25–43, verified by _critic-ftg §3 #32); owner EVOLUTION ruling. | Specify the roster as a sequential, prefix-stable process: a virtual-population counter in fixed steps, each step adding the next building by the ratio rules, every draw keyed by the building's ordinal; property test manifest(P2) ⊇ manifest(P1) for P2 > P1 on 1 000 seeds; epoch delta demand = the suffix; negative deltas only from declared circumstance events. |
| FTG-15 | major | Two §13.5 FTG metrics measure the polyline representation, not the town: arterial L1 edges are Chaikin-×2 vertex spacings (FTG-like 27.5 m polylines become 6.9 m), so "segment lengths by class" against FTG's placement steps is meaningless, and the same smoothing turns ≤ 15° per-vertex turns into ≤ 4.2° at unchanged turning per 100 m (25.9° vs 26.5°), so on smoothed ways the turn-angle row passes trivially; the junction row lists FTG's degrees as the baseline but sets "4-way 0–15 %" (FTG: 36.4 %) without saying FTG is the weakness there. | ARCH §13.5 rows 1–3, §4.3, §4.4, §15.2 O4 (b), §16 M2 exit; _critic-ftg §4 rows 2, 5, 7; roadlength100 README; scratchpad ftg_arith.out B and C; GEO-3 (7.9 m on its own spines). | Compare curves after resampling both sides at one arc-length step (e.g. 10 m): turning per 100 m and heading change per 50 m; compare junction-to-junction run lengths by class, not edge lengths; label every reference cell target or weakness; per-preset junction bands (FTG-6). |
| FTG-16 | major | The FTG half of the owner's acceptance cannot be run: M1 compares 20 seeds "at TOWN / CITY / METROPOLIS against the MFCG and FTG captures", but the corpus holds three FTG sessions of one size (two CITY settlements, ≈ 9 500 people each), PLAT's CITY is 20 000, FTG's METROPOLIS is premium-only and temporary settlements are one a day, so a metropolis capture needs a paid account — an owner-gated purchase recorded nowhere. | ARCH §16 M1 / M2 exits, §12 rung table, D-5; `captures/ftg/` (three sessions, both layouts CITY); ftg-docs-params §3.1 (size ladder; "METROPOLIS is premium-only"); ftg-posts-b T-03 ("premium-only above 25 000"); roadlength100 README ("today's single allowance"). | Add to M-1: FTG captures at BIG_TOWN (5 600) and BIG_CITY (24 500, free) over the daily allowance, decoded with the existing tools; define side-by-sides as population-matched and record the rung ↔ FTG-size mapping; record the METROPOLIS comparison as an owner decision (a premium month, or BIG_CITY plus published METROPOLIS screenshots). |
| FTG-17 | minor | The growth heading model is under-specified: "a Gaussian on the rate of turn" with "curvature continuity" and headingSigma 2–9° reads as a random walk on curvature, under which a 600 m street (20 × 30 m) turns a median 73° at σ = 2° and 108° at σ = 3° (41 % / 58 % beyond 90°), so streets curl back and legality ends stages early; independent turns (6–9°) give no curvature continuity. | ARCH §4.4, §7.7 expansion example; scratchpad ftg_arith.out D; FTG's roads "continue in a straight line (with random bends according to the max angle)" (ftg-docs-params §1.3). | Specify a mean-reverting curvature process (Ornstein–Uhlenbeck on curvature with a stated correlation length, plus reversion toward the proposal's goal heading), headingSigma in degrees per 100 m, and a drift-distribution test. |
| FTG-18 | minor | §4.4's inter-stage rule "trim arterials to the boundary (FTG)" contradicts S4, whose arterials are routes to named destinations that "continue to the context margin" and are never re-routed; applied literally it cuts every arterial at the stage-1 boundary, failing O4 (a) and leaving later enceintes nothing to gate. In FTG the trimmed main roads are grown spokes that the outer-settlement step re-extends. | ARCH §4.4 (between stages), §4.3, §4.8, §15.2 O4 (a), (g); ftg-docs-params §2.3, §2.8. | Restrict the trim to S5-grown provisional spines beyond the boundary; state that S4 arterials are never trimmed. |
| FTG-19 | minor | An island town (FTG's `islands` water mode; PLAT's own `island-city` form) has nowhere to send its external roads: S3 derives destinations as frame bearings and S4 routes to the frame edge, every bearing crosses impassable sea, and F-ROUTE marks each destination unserved, so O4 (g) "N external connections exactly" and O14 (d) cannot be met. | ARCH §4.2 S3, §4.3, §5.2 F-ROUTE, §7.7, §15.2 O4 (a), (g), O14 (d); ftg-posts-c §2.12 (153121107); coverage audit H08 (COVERED). | When the settlement's land component does not touch the frame, derive destinations on the shore (harbour, landings, a ferry point toward the requested bearing) and restate O4 (g) / O14 (d) for islands; island seeds in B-CITY. |
| FTG-20 | minor | The suburb regime has no perimeter road: FTG's suburb stage first lays a road encircling the whole existing settlement and grows offshoots from it, from main roads and from other offshoots, while PLAT redefines "perimeter spokes" as "arterial points outside the wall", so suburbs form only along the S4 arterials (few, per FTG-4) and never wrap the core. | ARCH §4.4 suburb row; ftg-docs-params §1.4 (`createPerimeterSpokes`, gif 238a34b238 frame 3, `perimeterSpokeDistanceMultiplier`), §2.7; coverage audit D25 (COVERED). | Add an optional perimeter lane at the suburb stage (the walled stages' outer boundary offset by the setback, typed lane, with offshoot seeds at a spacing row), keeping arterial seeds as a second source. |
| FTG-21 | minor | The wire-format bar is quoted, not budgeted: §2.9 names FTG's 593 KB for 2 798 buildings with the whole population (≈ 212 B per building) as "the bar", but §12 allows ≤ 3 MB gzipped for 4 500–6 000 buildings (≈ 500–670 B, 2.4–3.2× FTG's) and the snapshot's contents are unspecified; the compact twin is centred on the settlement centre while the model is centred on the world origin and S3 puts the centre anywhere in the middle third, so the twin is not "an encoding of the same schema" unless the offset is stored (O11 c). | ARCH §2.9, §11 compact-twin row, §12 memory column, §4.2 S3; ftg-payload-visual §10; _critic-ftg §4; ftg-posts-c §2.21. Related: GEO-5. Adjacent: SCL-12 (scale, parallel). | State the snapshot contents (L1 chains plus entity records, L2–L4 re-derived and hash-checked on load — or stored, say which), a bytes-per-building budget measured against 212 B, and the twin's origin (world origin, or a stored offset). |
| FTG-22 | minor | §11's bridge re-uses FTG's Foundry message vocabulary (BUILDING, DISTRICT, FACTIONS, PIN, SIMULATE_TIME) and its `stateId` token, "the shape FTG's Foundry protocol uses, re-specified", while §17 says the module's "field names are FTG's" and are not read, ported or paraphrased. | ARCH §11 embedding row, §17 clean-room paragraph; ftg-payload-visual §7.2. Overlaps the improve lens (clean-room posture). | Rename the vocabulary in our own terms, or record a ruling that schema-level protocol names fall under the owner's "same schema ideas are fine" and relax §17's wording accordingly. |

**Counts:** 22 findings — 1 blocker, 15 major, 6 minor.

## §3 Findings in detail (failure scenario → evidence → required change)

### FTG-1 · blocker · Lazy per-district S10–S13 cannot coexist with a global roster siting solver: the town's content depends on which districts are looked at first

**Failure scenario.** A METROPOLIS, content-first (the default). §4.1 makes S10–S14 lazy per district after the first
paint, and §12 says METROPOLIS "relies on lazy per-district derivation of S10–S13 (only visible districts first)". S10b,
part of S10, places the whole roster by a global greedy rule — "plots are filled in descending score with capacity
accounting" — followed by a plan–fit–reconcile loop that joins, demotes or trims. Two users open the same permalink. A's
viewport shows the harbour district first, B's the market district. If S10b runs as each district's plots appear, A's
harbour plots take the top-scoring items of the global pool (the guildhall, the best inns, the patrician houses whose
best score happens to be at the waterfront) and B's market plots take them instead; every district derived later sees a
different remaining pool. The two model hashes differ, the permalink no longer reproduces the town, the K-3 load check
reports a mismatch whenever the loading user's viewing order differs from the creator's, and the report's
`requestedVsBuilt` and population change while the user pans. If instead S10b waits until every district's plots exist
(the only order-independent reading of the text), S11 cannot draw any site plan before that (its table is keyed by the
plot's class, which siting assigns), so nothing below city LOD is lazy and the METROPOLIS design point the text relies on
is void. The design states both, and they cannot both hold.

**Evidence.** ARCH §4.1 bullet 1 ("S10–S14 are lazy per district after the first paint (G-R8) … site plans and labels of
a district are derived when first needed"), §4.1 "S1–S9 → a city-LOD preview while S10–S13 continue", §4.7 S10b and S11,
§8.5 ("the city-LOD preview appears after S9 while S10–S13 continue"), §12, §6.2 ("model = G(version, seed, params,
assignments, edits) — a pure function"), §5.4 `requestedVsBuilt`, §2.9 K-3. FTG's contract is whole-town content first:
"this takes the list of buildings from the previous step, and generates a map that gives all of those buildings a
location" (ftg-posts-a §2.5, post 91451446); "I don't see this ever changing" (ftg-posts-b §4 item 1, 127128581); the
captured CITY payload carries every building with its category, name and entrance in one response (ftg-payload-visual
§3.3). FTG's own V1 district-by-district claiming is the documented failure: "some districts may have completely
unrelated buildings in them", "the algorithm gives up" (ftg-posts-b T-19). The goal the design cannot meet as written:
"The same seed always gives the same town on every machine" (one-page summary; O2 (a)) together with §12's METROPOLIS
budget as specified.

**Required change.** Split S10b in two. (i) **S10-alloc**, global and not lazy, before the first paint: allocate the
roster to districts as counts per class × prosperity band, using per-district capacity estimates computed from the S9
blocks and the granularity table (no plots needed), in a declared order (district id) with a declared stream; the
reconcile loop moves counts between districts at this level, before anything is placed; persist the allocation table in
the document (it is also what FTG-9's scoped regeneration needs). (ii) **S10b placement**, lazy per district: place only
that district's allocation on its own plots, deterministically, whatever the order in which districts are derived.
Restate §4.1 and §12 ("S10-alloc global; S10b placement and S11–S13 lazy"). Add a CI test that derives the districts of
50 METROPOLIS seeds in three random orders and asserts identical model hashes, and make `requestedVsBuilt` final at
first paint.

**Overlaps.** LC-2 (lifecycle lens, landed while this seat worked) raises the same defect as a blocker, and SCL-5 (scale lens) its performance side; the reviser should resolve the three together. This lens adds FTG's whole-manifest evidence and re-uses the persisted allocation table in FTG-3, FTG-7 and FTG-9. No GEO finding covers it.

### FTG-2 · major · The stage budget is computed in the wrong currency, before the field that sets plot size exists, with a misderived constant

**Failure scenario.** A CITY with the rich intent (`wealthLevel` 0.9 → `characterOffset` ≈ +0.24 and `joinMax` +2 by §7.7)
and a roster whose households follow a Comfortable-like wealth mix (FTG's captured default weights: squalid 1, poor 1,
modest 20, comfortable 40, wealthy 20, aristocratic 10). S2 computes each stage's area as `Σ_class n_class ·
plotArea_class / coverage_class / builtBlockShare`, one area per class, before S6 creates the prosperity field. The
design's own granularity table gives residential plot midpoints of 80 m² (poor, 5 × 16 m), 180 m² (modest), 374 m²
(prosperous) and 878 m² (rich, 19.5 × 45 m) — an 11× spread. For the Comfortable-like mix mapped onto the four bands the
household-weighted mean plot is 490 m², 2.7× a single modest value (2.1× with equal quartile bands). The stage boundary
S5 grows into, and S7 walls, is therefore sized for well under half of the residential land S10 will need. S10 cuts
fewer residential plots than demand; S10b's reconcile can only join plots, demote classes or trim the manifest; the only
further growth is the next stage, outside the wall. The walled share falls below D-2's 0.35–0.5, intramural institutions
do not fit, and either O7 (a) "population ± 5 % on ≥ 95 % of seeds" fails or thousands of households move outside the
wall. The formula is also ambiguous: if `plotArea` is a plot area, dividing by `coverage` double-counts (×1/0.38 = 2.6 at
FTG's coverage); and `builtBlockShare ≈ 0.62` is derived "from FTG's 38 % lot coverage", but 38 % is FTG's footprint
over its lot (271 m² of lot per 103 m² footprint), not the share of a stage's area that is plots — 0.62 = 1 − 0.38 is a
category error. Equal-quantile banding (§4.5) makes it worse: 25 % of plots are cut in the poor band while 2 % of
households are poor.

**Evidence.** ARCH §4.2 S2 (formula, 0.62, "feasibility by construction (O3)"), §4.4 ("derived from its area budget"),
§5.2 F-BUDGET-STAGE ("built area < budget after the queue empties"), §4.5 ("banded … by quantiles"), §4.7 granularity
table and S10b, D-2; `docs/design/proposal-kernel.md` §4.3 (the constant's origin); `_critic-ftg.md` F13 and §4 row 17
(block lots: 271 m² per building, 38 % coverage); scratchpad `ftg_arith.out` part A. FTG stops each stage on a building
quota — `proportionOfBuildings` per stage, the suburb takes the remainder, roads grow "until the desired area for the
stage is met", and V2 fills each district lot with buildings as it is created (ftg-docs-params §1.2, §2.5; ftg-posts-b
T-22). FTG's V1 top-down estimate ("estimate how much area we need for all the buildings, create roads until we have lots
with that area") is the version that "would regularly give up" (ftg-posts-b T-18, T-19). The coverage audit marks A05
COVERED on the formula's existence. Adjacent, from lenses landed in parallel: LC-6 (quantile banding under field edits) and MFP-6 (the default walled share).

**Required change.** (1) Express stage demand as **plot counts per class × band**, and stage area as Σ n_(class, band) ·
plotArea_(class, band) / builtShare, with footprint and plot areas named separately (repair the coverage term) and
builtShare calibrated on a measured quantity — the share of a stage's area in plots, measurable on B-CITY output and on
FTG's decoded road-graph faces (M-1 #5) — not on 1 − 0.38. (2) Set the prosperity field's band cut points from the
roster's household wealth shares (cumulative shares = quantile cut points), so band capacity and band demand agree by
construction. (3) Replace F-BUDGET-STAGE's area test with a **capacity test after S10 of the stage** (plots per class ×
band against the stage's quota) and give it one bounded top-up (one more growth increment of the same stage, trace
recomputed) before the next stage; this is compatible with GEO-18's trace-before-growth. (4) Add a B-CITY sweep over
`wealthLevel` ∈ {0, 0.5, 1} asserting population ± 5 % and the walled share within its band.

### FTG-3 · major · FTG's landmark-first fix is lost: large claims are cut from the fabric after the fabric exists

**Failure scenario.** A CITY roster with a cathedral close and a monastery (ornamental claims of 0.5–2 ha by §4.9), a
university, a hospital and two large guildhalls; the patrician district is rich, so §4.9 asks for 0.4–0.8 ha of park per
1 000 inhabitants. S8 cuts every coarse face down to the district's block band (core blocks of 30–45 m depth, roughly
0.1–0.4 ha) knowing nothing of any claim. S10 then claims "for each built block" ("a whole block only above a threshold
share"; the institution row of the granularity table tops out at "whole block"), so nothing larger than a block can be
claimed. F-SITING walks "JOIN plots in the affinity district → next-best district → take a whole block → place at the
district edge → reduce the manifest", so the monastery lands at a district edge or is trimmed. Parks come later still:
S12 takes them "from a joined block or a residue ≥ 0.3 ha" after S10 has platted the blocks and S11 has placed
footprints, so built plots are re-typed as park (their buildings and households vanish) or the park quota is missed. This
is FTG's V1 failure — "a district keeps claiming a lot, but it doesn't have room for the current large building (e.g. a
temple); if the district doesn't find a lot after a certain number of attempts, the algorithm gives up" — which V2 fixed
by placing landmarks "FIRST (which should be easy as it's a large lot), and then generating roads AROUND them".

**Evidence.** ARCH §4.1 (S8 before S10), §4.6 step 1 (stop when the OBB minor extent is below the band), §4.7 S10 step (3)
and the institution row, §4.9 park and ornamental-grounds rows, §5.2 F-SITING, §15.2 O18 (f) ("100 % of institutions on a
plot meeting their requirement"); ftg-posts-b T-19 and T-22 (106664214, 120828892); ftg-docs-params §2.5 ("Place large
landmark buildings … Divide the lot into smaller ones"). S3's own site claims (temple, castle, market) are made before
growth, but nothing in S5 or S8 is said to protect them. Related, different mechanism: GEO-23 (the F-CUT ladder turns a
large face into a court block) and GEO-25 (S10 writing L1). MFP-3 (MFCG lens, landed in parallel) raises the missing reservation before growth from MFCG's side; this finding adds FTG V2's evidence, the S12 parks and where the step goes.

**Required change.** Add a **district-claims step between S7 and S8**. Each district's claims — S3's site claims, the
roster institutions allocated to it (FTG-1's allocation), §4.9's park and green quotas, and assignments — are sized from
their requirement tables and `claimSubFace`d from the district's coarse faces while they are still large, placed by the
siting score restricted to the district; S8 then cuts around them as holes (the slit mechanism already exists); S10's
"claims first" keeps only sub-block claims; S12 places parks only on faces reserved here or on residue. Test: 100 % of
institutions and parks larger than one block are placed at their requirement on B-CITY.

### FTG-4 · major · The arterial network is frozen at S4: no growth stage can add a main road

**Failure scenario.** A METROPOLIS with the default external bearings (four, say). S3 fixes the destinations; S4 routes
once per destination ("for each external bearing plaza ↔ frame edge at that bearing; for each crossing site plaza ↔ site;
harbour ↔ plaza; castle ↔ plaza"); S5 grows only `secondary` streets and lanes (25–40 m and 15–25 m steps; the fusion
fallback moves the growth boundary "one class up", never down); widths come from "betweenness on the arterial graph", so
only S4's routes can ever be primary. By the fourth ring the town is 2–3 km across with the same four radials; outer
districts of many hectares are reached only by secondaries. S7 asks N gates of the outer enceinte — N = 2 + round(0.9 ·
√(1 500/10)) = 13 for a 1 500 ha enceinte — but four arterials cross it, so nine gates become "posterns on the
next-ranked secondary crossings". `grow()` (M4's one incremental path) runs S2 → S5 → S6 → S7 → S8–S13 and never S4, so
a town evolved over epochs can never gain a main road either. FTG spawns main roads inside every stage
(`spokeStaySpokeProbability`, "chance of creating a new main road when branching from an existing main road", 0.5 in
stage 1 and 0.1 in stage 2; `maxSpokesInStage`), and its stage-2 main roads persist at their own 60.5 m / 100.5 m step.
In both captured FTG cities, main-road (type 1) edges cross the 400–1 500 m annulus in 7 and 12 of 16 bearing sectors.

**Evidence.** ARCH §4.2 S3, §4.3 (routes, "the class by betweenness on the arterial graph (O4 c)"), §4.4 (queue; fusion
fallback), §4.8 (N formula; posterns), §4.11 (`grow()`), D-25; ftg-docs-params §1.3 (the two spoke parameters, [STATED]);
roadlength100 README (type-1 main roads at L + 0.5); ftg-posts-b T-21 (initial road layout and per-phase knobs);
scratchpad `ftg_anisotropy.out`. Related: GEO-27 (growth through built plots on the same incremental path) and GEO-16
(braided routes) — neither concerns how many arterials exist. MFP-4 (MFCG lens, parallel) covers what happens at the wall when arterial crossings and N disagree; this finding concerns how many arterials each stage has. The coverage audit marks D17 COVERED as "replaced" by
routing; the replacement has no per-stage counterpart.

**Required change.** Give every growth stage a **main-road step**. After the stage's secondaries are grown, promote the
chains with the highest betweenness toward the stage boundary to `primary` (width from the table), and spawn new radial
destinations on the next stage's boundary at a spacing that is a stage-regime row (our own values in the role of FTG's
spoke parameters), routed by an incremental S4 in which existing arterials are fixed inputs. Derive S7's main gates from
these primaries (a main gate per primary crossing up to N; posterns only for the remainder). Include the incremental S4
step in `grow()`. Test: primary-road length per km² and the share of gates on primaries stay within band from TOWN to
METROPOLIS; an epoch that adds a stage adds at least one primary.

### FTG-5 · major · Stage boundaries are isotropic level sets: on open ground every stage is a disc, the look FTG's creator retired in V2

**Failure scenario.** A flat, dry, inland CITY. §4.4 derives each stage boundary as "a smoothed level set of
'distance-cost from the centre' over the cost surface". With no slope and no water the S4 cost surface is uniform
(length × landValue), so the level set is a circle up to the 25 m lattice: the walled core, the gapped rings and the
walls that trace them are concentric discs, and ribbons appear only "outside the last enceinte along arterials". FTG's
creator named exactly this as the old generator's signature weakness — "They always originate from a 4-way crossroad,
which then blooms outward in a vaguely circular shape" — and V2's fix was growth along the main roads: "the settlements
also now tend to grow along the main roads, giving them much more interesting shapes than the vaguely circular ones";
the WIP maps show "the overall town outline is no longer circular; it is clearly anisotropic along the main roads".
Measured on both captured FTG cities with water sectors excluded, the 90th-percentile building radius varies across land
sectors with a coefficient of variation of 0.20 (Galeiaward) and 0.33 (Nevervalley), and is 1.26× and 1.65× longer in
sectors that carry main roads than in sectors that do not. FTG's suburb shape control (`spokePriorityChange`: 0 gives a
long ribbon settlement, 10 a compact blob) has no counterpart, and the forms catalogue's `linear-street` form cannot come
out of a disc.

**Evidence.** ARCH §4.4 "Stage boundary", §4.3 (cost terms), §4.4 ribbon regime, §7.7 forms (`linear-street`,
`bridge-town`); ftg-posts-b T-20, T-21, T-23 (112861635, 120828892); ftg-docs-params §1.4 (`spokePriorityChange`,
[STATED] formula; images 1cf7030dc5 and 5aba8d7537); scratchpad `ftg_anisotropy.out` (both payloads; confounds: two
samples, one site family, coast excluded by sector). The coverage audit records the suburb knob as D26 (LOW); the
isotropy affects every stage, not only the suburb. Under the tiebreaker, growth along roads (faubourgs outside gates,
street villages) is the historically constrained direction.

**Required change.** Define the stage boundary as a level set of **network travel cost**: cost per metre ρ_road along
S4 arterials and ρ_off elsewhere, so the level set elongates along arterials by ρ_off / ρ_road. Expose that ratio as a
stage-regime and form row — our equivalent of FTG's spoke-priority control — with `linear-street` at the high end and a
compact walled form at the low end; keep GEO-18's rule that the trace is fixed before the stage's secondaries grow. Add a
B-REF outline metric (land-sector r90 CV and the road / non-road r90 ratio), computed on FTG's two payloads (the script
exists) and on ours, and require it to be monotone in the anisotropy parameter.

### FTG-6 · major · The `ringed` preset cannot produce rings

**Failure scenario.** The user picks `ringed` (FTG's "Ringed" and "Ringed (no suburbs)": `branchType: CURVE_AROUND_ORIGIN`,
branches "stay a fixed distance away from the center of the settlement … resulting in ringed settlements"; FTG's own
animation shows "3–4 concentric closed rings joined by radial black spokes", its WIP gallery a "radial-concentric town",
its landing hero a concentric-radial core). PLAT implements it as "the same queue with FTG's branch types and a
grid-aligned heading table". Four things stop a ring. (1) The branch leaves tangentially, but every later step draws its
heading from §4.4's curvature-continuous random turn, which has no term pulling the heading back to the tangent of the
circle through the proposal point, so the would-be ring drifts off its radius within a few steps (FTG-17 quantifies the
drift). (2) S5's legality lets a proposal continue straight across another street only when that street is of
"lower-or-equal class"; rings are `secondary` and radials are `primary` / `through` arterials, so every ring stops in a T
at the first radial it meets and never closes. (3) Destination bias ("a proposal that can reach … an existing spine within
≈ 1.5 step lengths turns toward it") pulls ring proposals onto spines; §4.3's Y → T conversion and the "T-preference in
organic regimes" push the same way. (4) O4 (b) caps 4-way junctions below 15 %, while a ringed town is built of ring ×
radial crossroads; the `american` near-grid meets the same cap. FTG's measured Medieval city is already 36.4 % 4-way
(561 of 1 542 junctions of degree ≥ 3).

**Evidence.** ARCH §4.4 (queue, branch types, the `american` / `ringed` row, legality, destination bias), §4.3 (Y → T),
§13.5 junction row, §15.2 O4 (b); ftg-docs-params §1.2 (preset list), §1.3 and §2.4 ("Curve around origin", [STATED];
03310f4eb6.gif [SHOWN]); ftg-posts-b T-21 (image 04/09); ftg-payload-visual §8.9 (landing hero); `_critic-ftg.md` §4 row 2
(degree histogram) and scratchpad `ftg_arith.out` part C. The coverage audit marks D16 and D19 COVERED on the strength of
the preset's name.

**Required change.** Make the growth rules per-preset data rather than constants: a heading model per proposal class ∈
{mean-reverting curvature walk (organic), radius-hold (ring: heading = tangent of the circle through the proposal point
plus bounded jitter), grid-lock (angle table)}; a crossing matrix indexed by (proposal class × crossed class × preset)
in place of the fixed lower-or-equal rule (ringed: a ring crosses a radial); destination bias switchable per proposal
class; junction-signature bands per preset or form (organic below 15 % 4-way; ringed and grid presets with their own).
Fixture: the ringed preset on a flat site produces ≥ 3 closed rings with radius CV ≤ 10 % and ring × radial crossroads.

### FTG-7 · major · Outside-settlement buildings and farm households are demanded in S2 but their land is made in S12, after siting

**Failure scenario.** A CITY with farms, a river mill, lumber and a quarry. Following FTG's model, S2's roster demands
the outside-settlement classes (in FTG's catalogue: sheep, hop, cotton, flax, grain, cattle and pig farms, vineyards,
apiaries, lumber yards, sawmills, mines, quarries, hunters' lodges — 15 `outsideSettlement` types placed by the
dependency graph) with `requires: farmland` and similar gates. S10b sites the roster on S10's plots, which are town plots:
the hinterland does not exist yet. S12 runs after S11, sizes arable land "per capita from an era table" and places
"farmsteads beside their fields" by that table, not by the roster. Either the roster's farms go to town-edge plots
(F-SITING's "place at the district edge") and S12's farmsteads stand empty, breaking O7 (a) "100 % function / occupancy";
or reconcile trims the roster's farms and S12's farmsteads have no households. Farmland per capita (O14 a, ± 20 %) and
the number of farm buildings come from two different tables and can disagree. FTG does the reverse: the outer settlement
"estimate[s] how many lots we need for the number of buildings + landscape features, and then divide[s] the lots into
smaller ones until we hit that number … putting the relevant buildings on them", and farmsteads have "families that
live on them … though some farmhands will still commute from the main settlement".

**Evidence.** ARCH §4.1 (S10 → S11 → S12), §4.2 S2 (demand incl. "mill on water"), §4.7 S10b, §4.9 hinterland, §10.2
(`requires: … 'farmland'`), §5.2 F-SITING, §15.2 O7 (a), O14 (a); ftg-docs-params §0.2, §2.8, §3.4, §4.6; ftg-posts-c
§2.6 (144226579). The coverage audit names the missing hand-off (B09, MEDIUM) and the count-driven division (I03, LOW),
and marks farmsteads COVERED (I06); the stage order is what makes the hand-off impossible, not only unspecified.

**Required change.** Split S12. **S12a hinterland land** — field partition, farmsteads, mill / quarry / lumber / mine
sites — is count-driven from the roster's outside classes (through FTG-1's allocation), with raw-resource availability
derived in S1 as B09 asks, and runs before S10b. S10b sites the outside classes and farm households on S12a's plots. One
table (field area per farm class) links farm demand and farmland area. **S12b greenery** stays after S11. Test: 100 % of
outside-class buildings stand on outside plots with occupants; farmland per capita within ± 20 % and equal to the farm
classes' total field area.

### FTG-8 · major · An enceinte must be a closed ring: water-anchored walls are impossible and a coastal town is sealed from its own quays

**Failure scenario.** A walled coastal CITY with a harbour, shaped like FTG's Galeiaward (sea to the west, a river from the
north-east). S4's cost surface makes the sea impassable, so the stage-1 level set runs along the shore; S7 traces the
enceinte on it, "never across water except at a water gate where a river passes"; F-WALL treats a trace that "does not
close" as a failure and its rung is "snap to the water outline and add water gates". The result is a continuous sea wall
along the whole waterfront. S7's water furniture then lays the quays as "`quay` ways along the waterfront" on the sea
side of that wall. Gates sit only where arterials cross the trace and quays are not arterials, so with the hard invariant
"walls not crossed by streets except at gates" the quays and the harbour basin are cut off from the waterfront district's
warehouses — or the quays are dropped. FTG's captured wall is an **open chain** of 17 towers running 473 m from the river
bank to the coast along the waterfront district's ring, leaving the waterfront open to the sea. FTG also lets a stage's
wall go `Around stage lots` only, which is how a separately walled new town or quarter is made; PLAT's trace is always
"the growth-stage boundary polygon", around everything built so far.

**Evidence.** ARCH §2.7 (`Enceinte.trace`), §4.8 (trace; gates at arterial crossings; water furniture), §4.3 (water
impassable except at crossing sites), §5.2 F-WALL, §5.3; `_critic-ftg.md` F15 and §4 row 19; ftg-payload-visual Critic-2
addendum B (17/17 towers on the Beer Forest ring; chain 473 m end to end); ftg-docs-params §1.3 (`wallPlacement`
[STATED]); ftg-posts-b T-26 ("walls now split across rivers"). Distinct from GEO-18 (a pulled trace crossing non-arterial
streets) and GEO-19 (the basin carved after the streets). The coverage audit marks G02 COVERED.

**Required change.** Let a trace be an open chain whose ends are **anchored** (typed end vertices) on a shore, bank or
cliff, with the enclosure closed by the L0 shoreline in the "enclosed" and "sealed" tests. Add a waterfront policy per
preset — open waterfront, quay wall with water gates at every quay access, or full sea wall — as a table row with an era
default; create gates for quay accesses whenever a quay wall exists. Add `wallPlacement ∈ {aroundAll, aroundStage}` so a
stage, or an `assign`ed quarter, can carry its own enceinte. Test on coastal and river seeds: 100 % of quays reachable
from the town without crossing a wall except at a gate; trace ends on the shore under the open-waterfront policy.

### FTG-9 · major · FTG's content is global and relational; PLAT's person identity is per household and its locality is spatial

**Failure scenario.** A CITY with the simulation module on (or turned on later). The user regenerates district D with
"new random". (a) *Content.* S10b is a global greedy solver (FTG-1). Re-running it for D's new plots must either reuse
D's previous share of the roster — nothing records it — or re-site globally, moving the tannery or an inn in another
district, against O9 (b) "out-of-scope changes 0" and O2 (c). (b) *People.* Every person is `derivePerson(seed,
household id)`, but FTG's people are linked across households: family units whose adult children "moved out of their
parents home", partners from other households, carers and carees (FTG shipped a fix because deleting "a carer … would
break simulation as the caree would become confused"), job postings filled from the settlement's unemployed pool,
faction roles with member criteria, friend groups. D's households are superseded; relations from other districts point
at people who no longer exist, or the global matching is re-run and people across the town change partners and jobs.
FTG's own regenerate-area tool shows the coupling: "Any jobs created during the re-roll will employ any unemployed people
in the settlement", and regenerating buildings "will delete any residents and may update other people"; FTG excludes
relations from its person re-roll because they are graph state. (c) *Schema.* The base has `Person {household, role,
workplace?, derived, pinned?}`, `Household {members}`, `Faction {seats, turf, influence}` — no family unit, relation,
posting, membership, meeting, sub-location or stock record. D-10 says "the module's data model is already in the base,
so nothing is lost by building it second" and §10.1 "cost of reversal: low"; §10.3 promises that a 50 000-person
metropolis "stores kilobytes of people". FTG's normalised family-unit relations alone are ≈ 10 % of its settlement file,
and they must be persisted: a pure function of one household id cannot produce an edge to another household.

**Evidence.** ARCH §2.7 (content entities), §4.7 S10b, §7.3 (locality is plat-tree scoping), §7.4 regenerate row, §10.1,
§10.3, D-10, J-9, §15.2 O2 (c), O7 (a), (g), O9 (b); ftg-posts-b T-01 (95869798: family units; relations 30 % → 10 % of
the file), T-07 (101576411: relations and simulation details excluded from re-roll), T-31 (bulk edits of job, workplace,
relocation); ftg-posts-a §2.18, §2.21 ("Employment is a post-hoc matching pass"; factions generated before buildings);
ftg-posts-c §2.20, §2.22 (carer / caree bug; faction headcount bug); ftg-docs-params §3.5, §3.10;
`research/ftg-docs/editSettlement__regenerate_area.md` "Jobs & unemployment" (re-read at source). The coverage audit
rates C01–C13 PARTIAL or MISSING, mostly LOW, on the premise "data model present"; this finding disputes the premise.

**Required change.** (1) Add a persisted, versioned **relation store** to the base schema now: id-keyed tables for
family units, partnerships, carer / caree, employment (posting → person), faction roles and memberships and friend
groups, with lifecycle and reference integrity; derived once by a global pass with a declared stream and order, then
persisted — people stay lazily derived for their attributes only. (2) Persist FTG-1's **allocation table**, so a scoped
regenerate re-sites only the scope's allocation; offer global rebalancing as a separate, reported action. (3) State the
content locality contract: a geometry-scope regeneration changes no content outside the scope except relation repairs
applied by rule (a posting inside the scope re-filled from the unemployed pool; a dangling partnership dissolved), each
logged as an event. (4) Put `SubLocation` (FTG-11) and posting records in the entity registry from M1, empty until the
module fills them. (5) Extend the locality oracle and O2 (c) to content and relation hashes, and restate §10.3's storage
claim with relation bytes counted.

**Overlaps.** Lifecycle lens (regeneration locality, dangling references); the coverage audit's content-depth rows.

### FTG-10 · major · "Pinned once seen" turns reading into writing

**Failure scenario.** A GM and four players open one document in a VTT. Every person any of them opens is "pinned once
seen", and a pin is a logged edit event (`{ t: 'pin'; ids }`, §7.1; "lock / unlock / pin … persist: edit log + lock
set", §7.4). Each click therefore appends to that client's edit log, changes the model input (`model = G(version, seed,
params, assignments, edits)`) and the model hash, grows the stored document and pushes an entry onto the undo stack (the
next undo unpins a viewed person instead of reverting the GM's last real edit). The five clients' documents differ from
each other and from the saved file, so the K-3 hash check and the bridge's `stateId` disagree after any browsing. A
read-only viewer either cannot open people (no write right) or opens them without pinning, and then the stability the
rule was meant to buy is gone. The O7 module metric "stored bytes per 10 k population" becomes a function of how many
people someone clicked. The architecture calls this "FTG's rule", but FTG's guide says the opposite: "only a few key
details are saved per person. The rest is generated when the person is selected. When a person [is] manually edited,
those generated details are locked in" — FTG locks on edit, never on view.

**Evidence.** ARCH §2.7 ("People are never materialised in the document unless pinned or edited"), §4.7 S10b ("pinned
once seen"), §10.3 ("a person is pinned once seen or edited (FTG's rule)"), §7.1, §7.4, §6.2, §2.9 (K-3), §11, §15.2 O7
(g); `research/ftg-docs/useSettlements__settings.md` lines 25–26 (re-read at source; `_critic-ftg.md` §3 #35 verified
the same lines); the rule's origin, `docs/improvements/ftg.md` PERF-1 over-correction note (lines 707–709: "pin anyone a
user has looked at or edited"). The coverage audit marks A12 COVERED on the same reading. LC-16 (lifecycle lens, landed in parallel) raises the same defect; this finding adds the FTG guide text at source (the rule is misattributed) and the per-household table-version repair.

**Required change.** Pin only on explicit edit, as FTG does. Make derivation stable without pinning: each household
records the **person-table version** current at its creation (one small integer per household) and `derivePerson`
derives under it; an `editTable` on a person table applies to households created afterwards unless the user explicitly
re-derives existing people through a diffed action (the §7.5 upgrade pattern). Keep "seen" as non-model view state
(FTG-12). Tests: opening every person of a METROPOLIS leaves the model hash and the edit log unchanged; after a race edit,
previously generated people are unchanged unless re-derived.

### FTG-11 · major · The simulation is specified as a per-person pure query, but FTG's schedules read other people and capacity-limited sub-locations

**Failure scenario.** A tavern at 20:00 on a rest day in a METROPOLIS. FTG's behaviours resolve through criteria that read
the state of others ("Primary location has other occupants"), sub-location matchers with per-purpose capacities
("Leisure people limit", "Temporary residential limit", "Guest worker limit", "Studying people limit") and tags (table,
performance, pickup and deliver goods, bath), guest workers who "roam the settlement", a building matcher "Fetch demanded
resources" that follows the supply chain, the building dialog's live "32 people currently here" per sub-location, a
favourite-people layer that moves with the clock and window lights "only [in] buildings that have an awake adult".
`whereIs(person, day, hour)` as "a deterministic function of profession templates, sub-locations per building class …,
opening hours and the calendar" cannot honour a capacity (whether person p gets the last table depends on everyone else
who targets it) or an occupancy criterion (circular across people). "People currently here" and the window lights need
every person resolved for that hour — 50 000 at METROPOLIS — and the order of assignment decides the result, but no
order, cache or budget is stated. Sub-locations themselves are mapped to "slots now, rooms at stage 3", yet `BuildingSlot`
is a site-plan slot (house, hall, stables — one footprint each), while FTG's sub-locations are named functional places
inside one footprint (Bar, Office, Service door, Kitchen, Stage, Table 1–6), carried on FTG's wire as a per-building count
(5 for ordinary buildings; 6, 10, 12 or 20 for larger ones).

**Evidence.** ARCH §10.3, §2.6 (`BuildingSlot`), §2.7 (`Person`), §12 (no simulation budget), §15.1 F1 / F2, §15.2 O7
module row; ftg-posts-a §2.17 (93999105: criteria, matchers, capacities, tags, the Performance tag), ftg-posts-b T-08
(101576411: "Primary location has other occupants"; the building dialog's occupancy), ftg-docs-params §3.10,
ftg-payload-visual §3.3 (field 8.9) and §7.3 (`subLocationsSummary.currentPeople`), ftg-posts-c §2.9 (awake-adult lights)
and §2.18 (favourite-people layer). The coverage audit marks C06 COVERED and C07 PARTIAL-LOW.

**Required change.** (1) Add `SubLocation {id, building, name, tags[], capacities {leisure, tempResidential,
guestWorker, studying}, relaxOptions}` to the base building schema, filled from class tables and independent of geometry
(stage 3 may later map rooms onto sub-locations). (2) Specify the simulation as `occupancy(dayType, hour)`: a
whole-population resolution in person-id order, in two passes (assign primary behaviours; then evaluate the criteria that
read occupancy), cached per (day type, hour) and invalidated by edits, with `whereIs` reading it. (3) Budget it at
METROPOLIS (for example one hour resolved for 50 000 people in ≤ 50 ms in the worker) with a cost-model test. (4) Add
resource provides / uses edges to the roster rows as data for "fetch demanded resources" (the coverage audit's B10 asks
for the same scope decision).

### FTG-12 · major · The embedding bridge copies FTG's `stateId` protocol without the store that makes it converge

**Failure scenario.** FTG-parity integration: a Foundry scene with a GM and four players, each client running the PLAT
iframe. FTG's module "does not re-render the map" and never holds settlement state: every mutation carries a `stateId`
that the module fans out over Foundry's socket "so every client's iframe re-syncs to the same version" — from FTG's
server, the single store. PLAT has "no server; an optional sync service later". Its bridge offers events and the
commands `SET_TIME | SIMULATE_TIME | SET_LOCATION | UPDATE_ENTITY | ASSIGN | REGENERATE | EXPORT` with an
optimistic-concurrency `stateId`, but there is nothing to re-sync from: no command loads a document into a client, no
event carries the edit-log delta, and nothing fixes the generator version across clients. When the GM regenerates a
district, the players' iframes keep the old town. If each client replays the GM's command locally, clients whose app
keeps a different set of replayable versions (§6.4: "the app keeps the last N minor generator versions replayable") build
different towns from the same edit log; FTG-10's pins make the documents diverge further. FTG also persists the current
day and hour in the settlement (payload field 22) and keeps per-building notes, public notes, favourites and pins that
public users edit, "synced live into Foundry"; PLAT has no place for such view state outside the model hash (only style edits are declared "part of the document, not the model hash"), so either every time step changes the
model hash or the current time is lost on reload.

**Evidence.** ARCH §11 (embedding API and bridge), §1.7 persistence row, §2.9 `Document` (no current-time or view-state
section), §7.4 (style / label rows), §6.4 (version axes), Deferrals ("a sync service"); ftg-payload-visual §7.1–§7.2
(module architecture and `stateId` semantics, [STATED] from the MIT module) and §3.1 (field 22); ftg-posts-b T-31 (hourly
external calendar sync), T-32 (sync between players; Roll20's chat as the message bus); ftg-posts-a §2.22 ("keeps the
settlement in sync between players"). The coverage audit marks N05 COVERED. On the deferral: "a sync service" covers a
hosted service; the bridge's own concurrency contract is a base deliverable (O11) and has to say what its token converges
to, so the deferral does not cover this.

**Required change.** Specify the host as the store. Bridge commands `LOAD_DOCUMENT {doc | url}` and `APPLY_EVENTS
{baseStateId, events[]}` (rebase or reject); an event `DOCUMENT_CHANGED {stateId, events[]}` carrying edit-log deltas;
`stateId` = hash of (document id, edit-log length, last event hash). A version handshake: every client runs the
document's `generatorVersion` or opens the snapshot read-only. A **view-state section** of the document outside the model
hash — current simulation time, favourites, notes and public notes, pins, player location, layer choice — with its own
last-writer-wins rule. Read-only viewers never write model events (FTG-10). Test: a host and three headless clients
applying interleaved events converge to one model hash.

**Overlaps.** LC-30 (session state outside the recipe) and LC-31 (host inputs not logged as events), from the lifecycle lens landed in parallel, are adjacent; FTG-22 concerns the protocol's vocabulary.

### FTG-13 · major · Heights have no ground datum, so on PLAT's own terrain 3-D export, shadows and bridges cannot stand on the ground

**Failure scenario.** A hill town with the `hilly` relief character — S1's real heightfield in metres, the base's
headline improvement over FTG, whose creator says "Mountains aren't properly supported yet". A 10 m-deep house on a 25 %
slope has 2.5 m of ground fall under its footprint. `Heights` stores floors, eave, ridge and tower heights but no ground
datum; the glTF exporter extrudes "per-building meshes … by eave height" onto "terrain as a heightfield mesh" with no
stated base, so buildings float on the downhill side or sink into the uphill side — the failure FTG hit when it first
combined its height map with its 3-D view (buildings floating above the terrain: "the math working out where the
buildings fell on the map was wrong"). The same gap affects walls and towers pulled "to defensible ground" on ridges,
bridge decks (bank elevation plus clearance over the channel), and the shadow pass, which "projects each item's heights
along the sun vector" as if the ground were flat. §11's "shadows and 3-D agree by construction (heights are model data)"
and O17 (g) "shadow ∝ height r ≥ 0.99" hold only on flat sites. (FTG's 3-D *view* stays declined by IMPROVEMENTS' "no
oblique or 3-D default view", coverage audit K15; glTF is the design's stated replacement for it.)

**Evidence.** ARCH §2.6 (`Heights`), §2.3 (terrain raster), §4.2 S1 (relief characters), §4.8 (trace to defensible
ground; bridges), §8.4 (shadow pass), §11 3-D row, §15.2 O17 (g), D-8; ftg-posts-b T-14 to T-16 (106664214: floating
buildings; the height map as a separate raster; lattice tessellation); ftg-posts-c §6 ("Mountains … not supported").
Related: GEO-15 (height range) and GEO-40 (ground draping, river planes); neither gives buildings a base.

**Required change.** Add `baseCm` (ground datum) to Building, Wing, Tower, Enceinte segments, Gate and Bridge. Compute it
in S11 from the terrain under the footprint (for example the minimum sample plus a plinth rule, with stepped foundations
above a slope threshold from a table); store eave and ridge above `baseCm`; give bridges a deck elevation from the bank
elevations and a clearance row. The shadow pass projects from `baseCm + height` onto the terrain, or states a flat-ground
approximation with the slope bound where it applies. glTF places meshes at `baseCm` on GEO-40's draped ground partition.
Test: on hilly B-CITY seeds, 0 buildings whose base departs from the terrain under the footprint by more than the plinth
tolerance.

### FTG-14 · major · The roster is a capped fixed-point iteration, not FTG's sequential loop, so it need not be prefix-stable in population

**Failure scenario.** M4's incremental path: a town of 20 000 grows to 21 000 in one epoch, and `grow()` runs "S2 (delta
demand from the epoch's circumstances)". §10.2's roster is "a fixed-point iteration until the employed share stabilises
(≤ 6 iterations on ≈ 60–100 classes)" over integer counts with `min` / `max` caps, `firstAtPopulation` gates and
shop-versus-core draws. Nothing makes the manifest at 21 000 a superset of the manifest at 20 000, and a capped
iteration over step functions can stop mid-oscillation. If the chandler count is 3 at 20 000 and 2 at 21 000, the delta
demand is −1, and the epoch must demolish a surviving building for no circumstantial reason — against the owner's rule
that "nothing that survives an epoch is re-rolled". The same non-monotonicity fails §7.8's CI sweep ("asserts
monotonicity of its metric") for the population control. FTG's loop is sequential: a virtual population counter
advances, and one building at a time is added by the dependency ratios "until settlement population target is reached",
so the manifest at P + ΔP extends the manifest at P.

**Evidence.** ARCH §10.2, §4.11 (`grow()`; the coherence rule), §7.8 (control sweep), D-25, §16 M4 exit ("0 re-rolled
survivors"); ftg-docs-params §3.3 (the loop, verbatim from `createSettlement__dependency_graph.md` L25–43, verified by
`_critic-ftg.md` §3 #32); the owner's EVOLUTION ruling (brief). No GEO finding covers the roster.

**Required change.** Specify the roster as a sequential, prefix-stable process: a virtual-population counter advancing in
fixed steps, each step adding the next building by the ratio rules, every draw keyed by the building's ordinal (a stream
path such as `roster/<ordinal>`). Property-test manifest(P₂) ⊇ manifest(P₁) for P₂ > P₁ on 1 000 seeds; derive an epoch's
delta demand as the suffix; allow negative deltas only from declared circumstance events that remove demand.

### FTG-15 · major · Two FTG parity metrics measure the polyline representation, not the town, and the junction row hides which reference is the target

**Failure scenario.** M2's exit runs §13.5. (a) "Segment lengths by class" compares L1 edge lengths with FTG's placement
steps (main L + 0.5, district (L + 0.5)/2, suburb 30.00 m). PLAT's arterials are A*-routed on a 25 m lattice and smoothed
"Chaikin ×2", so their edges are the smoother's vertex spacing: on FTG-like polylines (27.5 m segments, turns ≤ 15°)
Chaikin ×2 gives a 6.9 m median segment (GEO-3 measured 7.9 m on its own spines). Either the band is set from FTG and
always fails, or it is re-tuned to our vertex spacing and means nothing. (b) The turn-angle row asks for "no cliff; p95 ≤
25°" per vertex. The same smoothing turns FTG's ≤ 15° per-vertex turns into ≤ 4.2° (p95 3.6°) while the turning per
100 m is unchanged (25.9° vs 26.5°), so on every smoothed way (the arterials, and any street smoothed for drawing) the row passes trivially and says nothing about how much streets wiggle. (c) The
junction row lists FTG's degree histogram as the "reference baseline" but sets "4-way 0–15 % in organic districts"; FTG's
measured Medieval city is 36.4 % 4-way. The band is NG's T signature (R3), a deliberate choice; the turn-angle row marks
FTG as "the weakness", the junction row does not, so an owner comparing against FTG cannot tell which way the gate
points.

**Evidence.** ARCH §13.5 rows 1–3, §4.3 (Chaikin ×2), §4.4, §15.2 O4 (b), §16 M2 exit; `_critic-ftg.md` §4 rows 2, 5 and
7; roadlength100 README; scratchpad `ftg_arith.out` parts B and C; GEO-3 (its measured spine segments).

**Required change.** Compare curves after resampling both sides at one arc-length step (for example 10 m): turning per
100 m and the heading-change distribution per 50 m. Compare junction-to-junction run lengths by class, not edge lengths.
Label every §13.5 reference cell as *target* or *weakness to beat*, and give junction bands per preset (FTG-6).

### FTG-16 · major · The FTG half of the owner's acceptance cannot be run with the captures on disk

**Failure scenario.** M1's exit is "side-by-sides of 20 seeds at TOWN / CITY / METROPOLIS against the MFCG and FTG
captures for the owner's eye (D-5)". The FTG captures on disk are three sessions of one size: two CITY settlements
(Galeiaward and Nevervalley, ≈ 9 500 people each). PLAT's rungs are 5 000 / 20 000 / 50 000 people; FTG's ladder is
SMALL_TOWN 2 400, TOWN 3 625, BIG_TOWN 5 600, SMALL_CITY 7 600, CITY 9 500, BIG_CITY 24 500, METROPOLIS 49 500. "CITY
against CITY" compares 20 000 with 9 500, and there is no FTG town or metropolis to compare with at all. FTG's METROPOLIS
is premium-only (above 25 000 people), and temporary settlements are limited to one a day under the guest identity (the
roadlength100 capture used "today's single allowance"), so an FTG metropolis capture needs a paid account — a purchase,
which is owner-gated and recorded nowhere.

**Evidence.** ARCH §16 M1 and M2 exits, §12 rung table, D-5; `captures/ftg/` (three sessions; both layout payloads are
CITY); ftg-docs-params §3.1 (the size table; "METROPOLIS is premium-only"); ftg-posts-b T-03 ("premium-only above
25 000"); roadlength100 README.

**Required change.** Add to M-1 FTG captures at BIG_TOWN (≈ 5 600) and BIG_CITY (24 500, free), taken over the daily
allowance and decoded with the existing tools. Define each side-by-side as population-matched and record the rung ↔ FTG
size mapping. Record the METROPOLIS comparison as an owner decision: a premium month for one capture, or BIG_CITY plus
FTG's published METROPOLIS screenshots only.

### Minor findings (FTG-17 – FTG-22)

#### FTG-17 · minor · The growth heading model is under-specified; its curvature-continuous reading curls 600 m streets through 73–108°

**Failure scenario.** §4.4: "heading change per step drawn from a bounded smooth distribution with curvature continuity
(a Gaussian on the *rate* of turn …)"; §7.7: `growth.headingSigma = lerp(9°, 2°)`. Read as a random walk on curvature,
the heading is an integrated random walk: over 20 steps of 30 m at σ = 2° and 3° per step the median absolute heading
change is 73° and 108°, and 41 % and 58 % of streets turn by more than 90°. Streets curl back, legality rejects their
proposals near their own earlier segments, and stages end early (F-BUDGET-STAGE). Read as independent turns (median 6°
and 9° at the same σ), there is no curvature continuity. FTG's roads "continue in a straight line (with random bends
according to the max angle)".

**Evidence.** ARCH §4.4, §7.7; scratchpad `ftg_arith.out` part D; ftg-docs-params §1.3.

**Required change.** Specify a mean-reverting curvature process (Ornstein–Uhlenbeck on curvature with a stated
correlation length, plus reversion of the heading toward the proposal's goal direction), define `headingSigma` in
degrees per 100 m, and test the drift distribution.

#### FTG-18 · minor · "Trim arterials to the boundary" between stages contradicts S4's through-roads

**Failure scenario.** §4.4 copies FTG's inter-stage rule: "prune dangling `secondary` chains shorter than one block
width, trim arterials to the boundary (FTG)". In FTG the trimmed "main roads" are grown spokes that the outer-settlement
step later re-extends to the map border. In PLAT the arterials are S4 routes to named destinations that "continue to the
context margin with their bearings (O14)", and S4 never runs again. Applied literally, stage 1 cuts every arterial at the
stage-1 boundary: O4 (a) "100 % of through-roads reach destinations" fails, and later enceintes have no arterials to gate.

**Evidence.** ARCH §4.4 (between stages), §4.3 (through-roads to the context margin), §4.8, §15.2 O4 (a), (g);
ftg-docs-params §2.3, §2.8.

**Required change.** Restrict the trim to S5-grown provisional spines that extend beyond the boundary, and state that S4
arterials are never trimmed.

#### FTG-19 · minor · An island town has nowhere to send its external roads

**Failure scenario.** FTG's `islands` water mode (one arm; "the settlement occupies one lobe with a harbour") or PLAT's own
`island-city` form. S3 derives external destinations as frame bearings, S4 routes "plaza ↔ frame edge at that bearing",
and through-roads continue to the context margin; on an island every bearing crosses the sea, which is impassable, so
F-ROUTE marks every external destination `unserved`. O4 (g) "N external connections exactly" and O14 (d) "roads leave to
destinations 100 %" cannot be met for island sites.

**Evidence.** ARCH §4.2 S3, §4.3, §5.2 F-ROUTE, §7.7 forms, §15.2 O4 (a), (g), O14 (d); ftg-posts-c §2.12 (153121107).
The coverage audit marks H08 COVERED. Distinct from GEO-13 (outline simplicity).

**Required change.** When the settlement's land component does not touch the frame, derive destinations on the shore
(harbour, landing beaches, a ferry point toward the requested bearing), restate O4 (g) and O14 (d) for island sites, and
add island seeds to B-CITY.

#### FTG-20 · minor · The suburb regime has no perimeter road

**Failure scenario.** FTG's suburb stage (`createPerimeterSpokes: true`) first lays "a road encircling the whole existing
settlement … studded with green proposals" and grows offshoots from it, from main roads and from other offshoots, so
suburbs wrap the core; `perimeterSpokeDistanceMultiplier` sets the spoke spacing. PLAT's suburb regime seeds offshoots
only "from perimeter spokes (arterial points outside the wall)", so suburbs form only along the few S4 arterials (see
FTG-4) and never along the outside of the wall.

**Evidence.** ARCH §4.4 suburb row; ftg-docs-params §1.4 (`createPerimeterSpokes`, gif 238a34b238 frame 3,
`perimeterSpokeDistanceMultiplier`), §2.7. The coverage audit marks D25 COVERED; G07 separately notes the missing lane
inside the wall.

**Required change.** Add an optional perimeter lane at the suburb stage (the walled stages' outer boundary offset by the
setback, typed `lane`, with offshoot seeds at a spacing row), keeping arterial seeds as a second source.

#### FTG-21 · minor · The wire-format bar is quoted but not budgeted, and the compact twin uses another origin

**Failure scenario.** §2.9 names FTG's economy as "the bar": 593 KB for 2 798 buildings with the whole population, about
212 B per building. §12 allows ≤ 3 MB gzipped for a CITY of 4 500–6 000 buildings, about 500–670 B per building (2.4–3.2×
FTG's), and the snapshot's contents are unspecified (all five plat levels or L1 only; DCEL arrays or chains; the
per-entity `Provenance.deps` lists), so the bar cannot be checked. The compact twin stores coordinates "centred on the
settlement centre", while the model is centred on the world origin (0, 0) and S3 places the centre anywhere in the
frame's middle third, so the twin is not "an encoding of the same schema" unless the offset is stored — and O11 (c)'s
byte-identical round trip depends on it.

**Evidence.** ARCH §2.9, §11 compact-twin row, §12 memory column, §4.2 S3; ftg-payload-visual §10; `_critic-ftg.md` §4;
ftg-posts-c §2.21. Related: GEO-5 (persisted arena indices). Adjacent: SCL-12 (scale lens, parallel: the snapshot persists derivable rasters).

**Required change.** State the snapshot's contents (for example L1 chains plus entity records, with L2–L4 re-derived and
hash-checked on load — or stored; say which), a bytes-per-building budget measured against 212 B, and the twin's origin
(the world origin, or an explicitly stored offset).

#### FTG-22 · minor · §11 re-uses FTG's Foundry message vocabulary while §17 puts that module's field names off-limits

**Failure scenario.** §11's bridge lists events `BUILDING | DISTRICT | PERSON | FACTIONS | PIN | …` and the command
`SIMULATE_TIME` with a `stateId` token — "the shape FTG's Foundry protocol uses, re-specified". FTG's module uses the same
type names (`BUILDING`, `DISTRICT`, `FACTIONS`, `PIN`, `SIMULATE_TIME`) and the same `stateId`. §17 says no code from
"the FTG Foundry module (MIT, but its field names are FTG's)" is read for implementation, ported or paraphrased. The two
sections disagree about whether FTG's protocol names may be re-used.

**Evidence.** ARCH §11 embedding row, §17 clean-room paragraph; ftg-payload-visual §7.2. Overlaps the improve lens
(clean-room posture).

**Required change.** Rename the bridge vocabulary in our own terms, or record a ruling that schema-level protocol names
fall under the owner's "same schema ideas are fine" and relax §17's wording to match.

## §4 What the design already gets right under this lens (keep it through the revision)

* **Content first, as FTG insists.** S2 decides demand before any street is drawn and the siting solver answers it with
  capacity — FTG's founding rule ("I don't see this ever changing"). FTG-1, FTG-2, FTG-3 and FTG-7 repair how demand and
  capacity are coupled across stages; none of them argues for a geometry-first pipeline.
* **FTG's frame and wire lessons.** Integer centimetres centred on (0, 0), +y north, zig-zag varints per chain; the
  settled road-length laws ((L + 0.5)/2 district streets, L + 0.5 main roads, 30.00 m suburb streets, 14.70 m suburb lot
  outlines), the 39 m tower spacing, the 103 m² / 10.3 m footprint, the 50 m water step and "generation ≈ 3–7 s" are all
  carried correctly (the coverage audit's §6 item 4 re-checked them; this seat found no stale "≈ 300 s").
* **The plat answers FTG's graph failures by construction.** Duplicate intersections at one position, fill-tool face
  walks escaping through unclosed faces, self-intersecting drawn oceans and stacked ground layers z-fighting are all
  failure classes of FTG that an indexed, snapped planar subdivision with typed faces removes; the GEO findings refine
  it, they do not replace it.
* **Staged growth with explicit legality.** FTG's thresholds are unstated; PLAT states separation, snapping, water and
  slope rules, stage regimes and a suburb regime with FTG's measured signature (deliberate cul-de-sacs, small lots from
  the outset, a per-plot density draw). FTG-4, FTG-5, FTG-6, FTG-17 and FTG-20 extend it; the queue itself is right.
* **Walls per growth stage and gates that exist.** `placeWallAfter` becomes an enceinte per walled stage, and FTG's
  ungated crossings become gates at arterial crossings with an exact count. FTG-8 asks only that a trace may end on water
  and that a stage may be walled on its own.
* **Reproducible render-time fills.** FTG sends `seed: null` and fills forests and decoration areas at render time;
  PLAT's keyed `style/*` streams make the same economy reproducible. Tree areas are never stored, which is FTG's own
  storage lesson (50 k trees ≈ 1 MB).
* **Lazy people as a storage idea.** Deriving people from ids rather than storing 50 000 records is the right economy;
  FTG-9 and FTG-10 change what is persisted (relations, per-household table versions) and when a person is pinned (on
  edit), not the idea.
* **Upgrades instead of "new features only for new settlements".** The migration chain with a diffed upgrade replay
  answers FTG's A10 weakness; GeoJSON with districts answers FTG's open to-do; per-layer VTT scenes exceed FTG's iframe.
* **Heights as model data.** FTG found its 3× scale bug only because heights and lengths disagreed in street view; PLAT
  carries metres and heights everywhere. FTG-13 adds the one missing number (the ground datum).
* **The bridge's shape.** An origin-checked `postMessage` protocol with a concurrency token is the right embedding
  surface; FTG-12 supplies the store it needs.

**Areas examined without a separate finding.** Districts as first-class objects (typing from the remaining roster
demand, the merge floor, the shanty-town staging rule and the residential ordering all have mechanisms; district claims
are FTG-3). Placement modes (Dense / Gaps / Individually placed map onto row / detached / compound site plans; the
owner's plot model deliberately chooses attached rows over FTG's gap look in dense bands). Coast generation (the
closed-outline routine with an ease-into-detail envelope covers FTG's two-arm coast; per-arm configuration and the
bay / headland vocabulary are coverage rows H04 / H06). Bridge density (PLAT sites crossings in S1 with FTG's 40 m
spacing as a default; fewer bridges than FTG's is the historically constrained reading). Building-level editing,
tree brushes and castle-district detail are coverage-audit rows M01, M04 and G09 and are not repeated. FTG's bulk
people edit is selection-based and capped at 50 people (re-read at source), so per-person pins are adequate there.

## §5 How the findings cluster for the reviser, and overlaps with other lenses

| cluster | findings | the one decision that resolves most of it |
|---|---|---|
| content-first coupling | FTG-1, FTG-2, FTG-3, FTG-7, FTG-14 | a global, persisted allocation of the roster to districts (and to the hinterland) before any lazy stage, budgeted in plot counts per class × band, with claims and hinterland land made before the fabric they sit in, from a prefix-stable roster |
| the growth network | FTG-4, FTG-5, FTG-6, FTG-17, FTG-18, FTG-20 | growth rules as per-preset data (heading model, crossing matrix, destination bias, junction bands), a main-road step per stage, travel-cost stage boundaries, and a perimeter lane |
| walls and water | FTG-8, FTG-19 | anchored open traces with a waterfront policy; shore-derived destinations for island sites |
| content and simulation data model | FTG-9, FTG-10, FTG-11 | a persisted relation store, pinning on edit only with per-household table versions, and sub-locations plus a whole-population occupancy resolution |
| integration and wire | FTG-12, FTG-21, FTG-22 | the host as the store with edit-log replication, a version handshake and a view-state section; a stated snapshot and byte budget; our own protocol vocabulary |
| terrain and 3-D | FTG-13 | a ground datum on every standing thing |
| acceptance | FTG-15, FTG-16 | representation-independent metrics labelled target or weakness; population-matched FTG captures and an owner decision on METROPOLIS |

**Overlaps with the geometry red team (not repeated here).** GEO-18 (the trace pulled across streets) and GEO-19 (the
harbour basin carved after the streets) sit beside FTG-8 and FTG-5; GEO-23 and GEO-25 beside FTG-3; GEO-27 beside FTG-4;
GEO-15 and GEO-40 beside FTG-13; GEO-3 supplies FTG-15's smoothing measurement; GEO-5 sits beside FTG-21. FTG-5's
travel-cost boundary keeps GEO-18's trace-before-growth rule, and FTG-2's top-up recomputes the trace, so the two red
teams' repairs are compatible.

**Overlaps with the FTG coverage audit.** This seat challenges nine rows the audit marked COVERED: A05 (FTG-2), A12
(FTG-10), C06 (FTG-11), D16 / D19 (FTG-6), D25 (FTG-20), G02 (FTG-8), H08 (FTG-19), I06 (FTG-7), N05 (FTG-12). It
deepens B09 / I03 (FTG-7), D26 (FTG-5) and C01–C13 (FTG-9). It does not repeat M01, M04, G09, F16, F20, I12, B10, C03,
L08 or the LOW render-variety rows.

**Overlaps with the other lenses of this phase.** Lifecycle: FTG-1 (order-dependent state), FTG-9 (regeneration
locality), FTG-10 (a read that writes), FTG-12 (persist and sync), FTG-14 (epoch prefix stability). Scale: FTG-1
(METROPOLIS laziness), FTG-11 (occupancy at 50 000 people), FTG-21 (document bytes). Visual: FTG-5 (the outline look),
FTG-13 (3-D export on terrain). MFCG: FTG-4 (MFCG also runs a road to every gate), FTG-5 (MFCG's roundish partition
versus FTG's anisotropy, decided here by the tiebreaker). Improve: FTG-16 (a paid account), FTG-22 (clean-room wording).

**Parallel red-team lanes (landed while this seat worked; their tables were skimmed for cross-references only).** FTG-1 and LC-2 are the same defect (SCL-5 is its performance side); FTG-10 and LC-16 are the same defect; FTG-3 overlaps MFP-3 (both ask for reservations before the fabric); FTG-4's gate consequence overlaps MFP-4; FTG-2 is adjacent to LC-6 and MFP-6, FTG-12 to LC-30 and LC-31, FTG-21 to SCL-12. The reviser should dispose of each pair together. This seat kept its versions because each adds FTG evidence (FTG's whole-manifest generation, the guide's lock-on-edit text, V2's landmark-first rule, the per-stage spoke parameters) or a repair the other does not state (the allocation table re-used by FTG-3, FTG-7 and FTG-9; per-household table versions; the S7–S8 claims step; per-stage main roads in grow()).

**Deferrals.** FTG-12 touches "a sync service": the deferral covers a hosted service, not the bridge's own concurrency
contract (O11), so it does not cover the finding. FTG-4 and FTG-14 concern the one incremental path the base builds at
M4 (D-25), not "the evolution engine beyond the one incremental path", so that deferral does not cover them either. FTG-15
concerns metric definitions, not the band values the J-T deferral postpones. No other finding re-raises a deferral.

**Evidence that postdates the architecture.** The FTG coverage audit (16:30) landed after `docs/ARCHITECTURE.md`
(15:10); it is cited, not relied on for reference facts. The roadlength100 capture (06:34) predates the architecture,
which carries it correctly.

## §6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (checked in the documents, or executed).**
* Every quotation of `docs/ARCHITECTURE.md`, which was read in full.
* Every reference fact, taken from a findings passage or critic listed in §0 that this seat read; three guide pages
  re-read at source (`useSettlements__settings.md` lines 25–26, FTG locks generated details on manual edit;
  `editSettlement__regenerate_area.md`, jobs created by a re-roll employ the settlement's unemployed;
  `editSettlement__bulk_people.md`, selection capped at 50 people).
* This seat's executions: FTG's outline anisotropy on both payloads (land-sector r90 CV 0.20 and 0.33; 1.26× and 1.65×
  longer r90 where main roads run; main-road edges in 7 and 12 of 16 sectors); the plot-area arithmetic (11× band spread;
  2.1–2.7× against one modest value; ×2.6 coverage double count); Chaikin ×2 on FTG-like polylines (27.5 → 6.9 m
  segments; ≤ 15° → ≤ 4.2° per vertex; turning per 100 m 25.9° vs 26.5°); FTG's 36.4 % 4-way share; the heading drift
  (73° and 108° median over 600 m under the curvature-walk reading); N = 13 for a 1 500 ha enceinte; the FTG capture
  inventory (three sessions, all CITY).
* The origins of two contested rules: `builtBlockShare ≈ 0.62` (`docs/design/proposal-kernel.md` §4.3) and "pin anyone
  a user has looked at" (`docs/improvements/ftg.md`, PERF-1).

**PLAUSIBLE (reasoning only; no PLAT code exists).**
* How often each failure fires in a built PLAT, and whether an implementer following the text would build the literal
  failing mechanism (lazy global siting, the arterial trim, pin-on-view) or quietly improvise the repair.
* That FTG's measured anisotropy comes from growth along main roads rather than from the coast or the two sampled
  settlements (water sectors were excluded; two samples of one site family).
* That FTG's premium gating also blocks a METROPOLIS capture under the guest identity (stated for creation; not tried).
* The ranking of findings by severity, in particular FTG-1 as a blocker rather than a clarification, which is this seat's
  judgement under the §1 rule.
