# blocks-scope — the SCOPE part's blocks for amendments b (items 8–31; HOME 21)

Generated 2026-09-27 by scratchpad/scope/gen.py from the live docs/ARCHITECTURE.md (sha256 1dbfd9d4f39723ee…). Text before the first "=== " line is ignored.
Apply after every other block file (name order puts blocks-scope last): the II.7 pointers resolve once
blocks-pipeline-sewers.md has added `## II.7`, and no block here REPLACEs a subsection another part owns.

=== APPEND TO SECTION ## The whole design in one page (plain words) ===
**The owner's later rules (amendments b, 2026-09-25 to 27), in one paragraph.** Items 8–31 of the second amendments file
refine the picture above without changing its bones; their landing rows, with the file's name, are §0.2. A town has several markets — one
principal market sited where trade meets, usually the plaza, and secondary markets and churches by size, as MFCG and FTG
have them (§4.2) — so "the market square" above now reads "the markets". Every rule's default reproduces what MFCG or
FTG does where they have the behaviour, and our extensions ride on top as table values with a weight, a chance or an
option (§7.6). A building gets several doors when its plot gives it a lane or a yard, and a cellar where its class, its
ground and its wealth say (§2.6). Some plots hide behind passages and courts — reachable yet unseen from any street — and
a place's name can be known only locally or secretly while the place itself is always drawn (§4.6, §9.2).
Assignments obey relation and supply-chain rules through one placement solver, and a building whose designation changes
mutates instead of re-rolling (§4.7). When a quarter grows rich or poor its stock persists — use and occupancy change
first, tenure and yards later, geometry only on vacancy, ruin or redevelopment — and a plot's geometry never reads
poorer than the middle band once it was built to that band or above (§4.11); its interior has no such floor: the same
shells are re-cut inside for the households that live there, from one family with small staff rooms down to single rooms
off a corridor (§2.6), which is where the poor live when every quarter is developed. Decline and regrowth, floating
islands, the sewers with their underground neighbourhoods and slow terrain change are hooks the base carries for the
staged engines (§4.11, II.6, II.7). SettlementForge's dossier is the authority: the map never edits it, a map delete of
a dossier element is a placement rejection the solver re-places, and a dossier change mutates the existing map (§7.7).
The module stays private for now, a separate program talking to its host through data alone (§17.3, D-22). The effort
figure above is the one before these rules: §16 now reads about 165–219 expert person-weeks.

=== REPLACE ### 0.2 Where the seven late owner rules (`docs/AMENDMENTS-2026-09-25.md`) land ===
### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`)

**Items 1–7.** Every clause of every rule is checked at its landing; where a rule has several clauses its landing carries
a clause map.

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 1 greenery by prosperity | §4.9 S12b rule table (reads the prosperity field and the district kind; yard planting by plot class); §15.2 O19 | §4.9 |
| 2 floating islands (a toggle, staged by the owner) | §2.7 `SkyIsland` with its own terrain and a `reason` (prosperous quarter or unique institution); II.1 rule 5 (the sky call) and II.6 (the staged layers' hooks); §4.2 (island outline); §11 (per-layer export) | II.6 |
| 3 heights for shadows | §2.6 heights and the ground datum on every building, wing, tower and roof; §8.4 the shadow pass and the display list's shadow hook | §2.6 |
| 4 size ladders | §1.1 (both ladders; the `RungProfile` table; size within a rung follows population); §12.2 (matched reference sizes and the band ends in buildings); PART III (the village ladder THORP → HAMLET → VILLAGE and its ceiling) | §1.1 |
| 5 everything editable | §7.1 (the edit targets, clause by clause, and the edit-target table), §7.2–§7.6, §2.8 (edit paths in the entity registry, whose completeness test is §13.2's) | §7.1 |
| 6 prosperity a gradient and a band | §4.5 (the field, its drivers, bands only where a table needs one, continuous interpolation, evolution moves the field), §4.7 (interpolating rules), §7.2 (brush edits) | §4.5 |
| 7 adopted defaults | D-1–D-7, each FINAL and tied to its mechanism: the ink default and `lit` on Canvas2D; era rows refined by §13.9; the named fantasy toggles; the browser-first library under §17's checker; "mastered" through §13.6's protocol plus the parity numbers; naming through §10.4's packs; the weighting ordering the build (§16) | D-1–D-7 |

**Where items 8–31 — the owner's later rules, in the second file the heading names — land.** The same discipline: every
clause is checked at its landing. Each row names the home that states the mechanism first, then the sections that
carry a pointer, a hook field or one line of rule, then the tests (§13.2's `T⟨item⟩-⟨n⟩` fixtures), the decisions and
the lists. An item whose engine the owner's roadmap stages later lands as the base's hooks (*Staged by the owner's
roadmap*). Item 32 of the same file, received after this pass's routing had closed, is the next pass's.

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 8 decline and regrowth are part of evolution (hooks now) | home §4.11 — the decline table's exposure lottery over weighted drivers, the persistence order, the salvage ledger, the dwell lag, the regrowth-first siting that binds the built grow path today, and `DeclineOp`; the states and records in §2.6 to §2.8 (`Existence` gains `cleared` and `reused`; `Building.predecessor`; `Enceinte.supersededBy`; `MaterialLedger`); identity kept through decline in §6.3; every kind applied by hand and undone in §7.1 and §7.4; the state classes in §8.2; tests T8-1 to T8-7; hooks row 2 of §15.2; priced at M4 in §16; D-25; the staged evolution row | §4.11 |
| 9 size is set by population, even within each tier | SATISFIED — size within a rung follows population and every budget is a law of the building count (§1.1); parity pairs are matched by building count (§13.6 (3)); no change (J-A9.01) | §1.1 |
| 10 floating islands are a product of prosperity | home II.6 — the island rule: two supply values (the town's and the carried districts'), the supported area and altitude, the supply re-read at each epoch; the sky allocation in §4.5 S7b (5); a row of §4.9's band-row family; the island decline kinds in §4.11; the record fields `supply`, `areaHa` and `state` on `SkyIsland` (§2.7); hand edits in §7.1 and §7.4; test T10-1; D-3; the staged sewers-and-islands row | II.6 |
| 11 the underground fades like the walls | home II.6 — the tunnel ladder (in use, silted, caved in, collapsed or sealed), never demolished by the engine, reopened by growth; the `underground` persistence row and the tunnel kinds in §4.11; `Tunnel.condition` and `closure` (§2.7 and §2.8); hand edits in §7.1 and §7.4; the styles in §8.2 and the layer in §8.4; test T11-1; D-25; the staged rows | II.6 |
| 12 underground neighbourhoods along the sewers | home II.7.3 — the owner's three rules as the invariants U1 to U3; the occupants, the cut on the underground arena, the surface constraint, access points, depth, lifecycle and order; the interfaces `UndergroundStrategy`, `AccessPoint` and `UndergroundRule` in II.7.4; the arena's levels (§2.1, then §2.2); `ContextVector.arena`, `Tunnel.navigable` and `headroomCm` in §2.5 to §2.7; `corridorUnion` over `tunnel` chains in §3.7; F-UNDER in §5.2 and the U rows in §5.3; a concern in §6.1; the layer in §8.4 and the exports in §11.1; fixtures in §13.1 and test T12-1; the registry map in §14; the staged row | II.7.3 |
| 13 floating islands only in cities and metropolises | home II.6 (2) — the rung gate, read at generation and at every epoch; the `layers.islands` column of `RungProfile` (§1.1); the village rows `none` (PART III); the sky allocation of §4.5 S7b (5); a band crossing runs the ladder (§4.11); the control disabled below CITY (§7.8); test T13-1; D-3 and D-33 | II.6 (2) |
| 14 sewers by tier | home II.7.1 — existence by tier: a TOWN law of population and wealth, always at CITY and METROPOLIS, never below TOWN; the toggle is visibility; the `drain` rule; the `layers.sewers` column of `RungProfile` (§1.1); the one-click default (§1.2); the S0 draw and `Features.sewers` (§4.2); PART III; a concern in §6.1; the control in §7.8; the layer in §8.4; test T14-1; D-3 | II.7.1 |
| 15 not every city has islands | home II.6 (1) and (4) — a model setting off by default; the count 0 to 3 drawn on `island.place` through ordered slots weighted by supply; the view toggle shows islands and never creates them; the sky allocation of §4.5 S7b (5); the draw in §6.1; the control in §7.8; the layer in §8.4; test T15-1; D-3 | II.6 |
| 16 assignments obey spatial and supply-chain rules | home §4.7 S10b — the one placement solver: HARD and SOFT relation rules, supply edges with distance and mode, joins where the use needs land, relocation of the displaced as a local recorded repair, infeasibility reported with the closest options; the relation templates and supply edges as class and roster data (§10.2) and S2's need propagation (§4.2); `PlacementCriteria` as per-assignment overrides in §7.7, with §7.3 and F-SITING in §5.2; the context vector of §2.5; the budget row of §12.4; tests T16-1 to T16-4; the corpus re-signing of §13.9 (5); the solver's package in §14; O7 (b), O10 (e) and hooks row 3 of §15.2; priced in §16; D-32 (J-A16.44) | §4.7 S10b |
| 17 uses move as the city grows and declines | home §4.11 — the epoch's use step: re-scoring against item 16's rules and the current distribution, inertia, traces of former uses, pinned assignments that stay, and `UseConversionOp`; the `Use` record with `Building.use` and `formerUses` and the use lifecycle in §2.6 to §2.8; a use's address in §6.3; `openUse`, `closeUse` and `relocateUse` by hand in §7.1 and §7.4; members move with their use unless pinned (§7.7); households follow in §10.3; the report to the host in §11.3; tests T17-1 to T17-3; D-25; the staged evolution row | §4.11 |
| 18 a plot's buildings mutate to match a new designation | home §4.7 S11 — the designation mutator: match, order and draws, land, protection, record and reversal, timing, one path; addressable parts (§2.5) and `MutationRecord` (§2.6); the epoch-spread form in §4.11; the concern `siteplan.mutate` in §6.1 and the minted parts in §6.3; every `assign` runs the solver and the mutator, undo being the inverse mutation (§7.3, §7.4 and §7.7); tests T18-1 to T18-4; the mutator's package in §14; priced in §16 | §4.7 S11 |
| 19 every designation scales with prosperity | home §4.7 S11 — the designation-template table by class and band, interpolated along the field, its shape columns reading the manifested band and its use and condition columns the field band; `ClassRules.pick` reads it and the Materials paragraph holds the material rule (FTG's default model, the optional regional shift, texture and colour only, never shape) in §2.6; the specialisation rows in §10.2; the colour roles in §8.2; the drift bounds in §7.7; the buildings row of §1.4; tests T19-1 to T19-4; priced in §16; D-2 | §4.7 S11 |
| 20 one-way data flow; the dossier is the authority | home §7.7 — dossier-backed existence, the rejection record and its lapse, positive placement, re-application, the precedence line; `rejectSite` and `placeAt` in §7.1 (a `delete` of dossier content is a rejection), with §7.2 and §7.4, the ladders of §5.2, the invariant of §5.3 and the report of §5.4; `Rejection` in the registry and `DossierRef` (§2.8), dossier events in the log (§2.9); the `dossier` and `positive` requests and the least-disruption order in §4.7 S10b, the lapse at an epoch in §4.11; the one-way door, with no message that writes the dossier, in §11.3 and §11.4; the summary; tests T20-1 to T20-4; the engine in §14; O10 (i) of §15.2; priced in §16; the staged SettlementForge row | §7.7 |
| 21 licence | SATISFIED by the owner's ruling of 2026-09-27 (private for now; J-A21.01): §17.3 and D-22 unchanged; §17.1 (1) records that the GPL-3 intent of 2026-09-25 was withdrawn and that TownGeneratorOS is an idea source only; permissive-only dependencies (§17.4) unchanged; the separate program with its data-only bridge (§11.3) retained by choice, not by licence | §17.3 |
| 22 dossier changes mutate the existing map, never re-roll it | home §7.7 — dossier events as mutations with least disruption, `DisruptionBudgetRow`, the report, vacancy on removal, continuity over path-independence; two histories may give two valid maps (§6.2); the budget's scope in §7.3 and the report in §5.4; the log in §2.9; each dossier element present from a new map's first generation (§4.2 S2), the search order in §4.7 S10b, a mid-history dossier event folded at its epoch (§4.11); the host door in §11.3 and §11.4; tests T22-1 to T22-4; the staged rows | §7.7 |
| 23 emulation-first defaults; no hard-coded universals | home §7.6 — the defaults layer is the emulation baseline: a default cell's `provenance.source` names the reference behaviour, an extension carries the `extension` marker with its chance, weight or option, an absolute reads as a default table value, and the parity presets `MFCG` and `FTG` switch every extension off; the principle in one paragraph of §1.4; the provenance values of §17.1 (6); `RelationRule.extension` in §4.1 and §4.7 S10b; test T23-1; the parity presets inside §13.5's bands; priced at M1 in §16 | §7.6 |
| 24 several markets, as MFCG and FTG already do | home §4.2 — S2's market demand (N markets by size) and S3 (12)'s principal-market score by trade convergence, secondary markets never touching another and on small patches; the destinations, seeds and stalls of §4.3 to §4.5, §4.7 and §10.2; `Reservation.rank` and the nearest-market distance in §2.5; the summary; the centre row of §1.4; tests T24-1 to T24-3; the parity rows of §13.5 and the threshold of §13.7; D-16 and D-17 | §4.2 |
| 25 terrain and water can change, slowly | home §4.11 — `reclaim`, `silt`, `shiftCourse` and `digCanal` as the slowest layer's rows of the decline table, repaired by S1's water operator; what each changes and `LandUse.reclaimed` in §2.3; by hand and undoable in §7.1 and §7.4, through the water operator of §7.3 (b); a concern in §6.1; test T25-1; D-25; the staged evolution row | §4.11 |
| 26 the hinterland is decided with the town, drawn after it | home §4.9 — FTG's order and its farmland modes chosen by size and landscape (`FarmModeRow`), the fuel and timber rows beside the farm table, the extent following demand, the arable reserve off by default; the demand rows (§4.2 S2, §10.2); the execution order (§4.1 and §4.4); the hinterland row of §1.4; tests T26-1 to T26-3; O14 (f) of §15.2; priced in §16 | §4.9 |
| 27 prosperity maps onto the references' wealth models | home §4.5 — the default band set: FTG's six lifestyle tiers with their shares, MFCG's ward-class shares as band targets, the shanty trigger, and `FieldBands.middle` as the band of the median household, the continuous gradient being our extension; the band-keyed rows of §10.2, §4.7 and §4.9; `FieldBands.bands` and `middle` in §2.5; the districts row of §1.4; tests T27-1 and T27-2; the descriptive rows of §13.5 | §4.5 |
| 28 floor plans and elaboration by click; (f) the interior has no floor | home §2.6 — the fourth rung, `plan`: the room programme first (from the designation, the occupants' band and the household count, never the geometry floor), the partition fitted to it one wing at a time around a stair core placed ahead of any cut, coherence with the exterior, the entrance set and basement consumed; the interior ladder's rule table by band, the dwelling unit with its own door, the re-cut as item 18's mutation within unchanged wing rings, and the shell's household capacity; `ElaborationRecord` per rung (absent, current, stale, edited) with `Document.elaborations` outside both digests and the `elaborate` view key (§2.8, §2.9); click → rung and the pre-assignment in §4.1; `RoomProgramRow`, `RoomRuleRow.scope` and the template's `households` in §4.7 S11 and §10.2, `relet` in §4.11 rung 1; the close-ups of II.4 and II.5; the transient arena (§3.4); the seed-tiling row (§3.10); F-PLAN (§5.2); the invariants (§5.3); the `plan.*` concerns keyed by the rung's reroll in §6.1, the pure-function rule of §6.2, the click-order identity of §6.5 (9); the seven plan events and the rung re-roll of `regenerate` in §7.1, with §7.3 and §7.4; the draw (§8.5), the cache (§8.6), the export (§11.1), the budgets (§12.7, §12.8); the summary; the stage table (§1.1); the one-click default (§1.2); fixtures in §13.1 and tests T28-1 to T28-17; the soft bands of §13.7; `PlanBuilder` in §14; priced in §16; the staged stage-3 row | §2.6 |
| 29 entrances and basements | home §2.6 — `entrances: Entrance[]` with roles and faces under the five rules; `Basement` derived from the class rows, the terrain gate of §2.3, prosperity and size, inside and smaller than the storey above it, its storey in `Heights`; a cellar never joins a sewer as a room, a cellar stair to a tunnel being an `AccessPoint` (II.7.3); the indexed vertex role of §2.2 rule 7 and the slot of §2.5; the placement in §4.7 S11 with the entrance and cellar columns of §10.2, and when an alley presents itself in §4.6; the invariants of §5.3, the concern `siteplan.entrance` in §6.1, `setEntrance` in §7.1, with §7.3 and §7.4; the glyphs and exports in §8.2, §8.5 and §11.1; the buildings row of §1.4; tests T29-1 to T29-4; the note in §13.5; O5 (f) and O17 (j) of §15.2; priced in §16 | §2.6 |
| 30 hidden plots and clandestine places | home §4.6 — S8's hidden-share and reach rows by band and density, `exposure` derived by adjacency to a public way, the passage choice — the cut making the `passage` L3 face in §4.7 S10; a second home in §9.2 for the knowledge label policy; `Plot.exposure`, `Block.reach`, `knownTo` on plot, building and institution and `Wing.spans` in §2.4 to §2.6, `sealed` in §2.8, the viewer's knowledge key in §2.9; `faceNeighbours` in §3.4; a secret institution's preference in §4.7 S10b, densification, clearance, `sealPassage` and `openPassage` in §4.11, none by default in PART III; F-PLOT in §5.2 and chain reachability in §5.3; the concern `cut.interior` in §6.1; the edits in §7.1 and §7.4 and the dossier fact in §7.7; the glyph, the court tone and the exports in §8.3, §8.5 and §11.1 to §11.4; the summary; tests T30-1 to T30-4; the parity row of §13.5 and the threshold of §13.7; the gazetteer in §14; O5 (a) and O18 of §15.2; priced in §16; the staged evolution row | §4.6; §9.2 |
| 31 prosperity change drives fusion and splitting — a slow, asymmetric ladder with a geometry floor | home §4.11 — Survivors: the DUE trigger with hysteresis; the three rungs (use and occupancy, tenure and yards, geometry only on vacancy, ruin or redevelopment); no occupied building removed by a band change; durations by direction and by the stock's replaceability; churn caps; `LadderOp`; and the geometry floor — `geometryFloor = min(builtBand, the settlement's middle band)`, the manifested band and value; the fusion and splitting orderings in §4.7 S10 (7) and the mutator in S11; `FieldBands.middle` and the DUE trigger in §4.5, the back courts of §4.6, the yards of §4.9, `replaceability` and `households` in §10.2, households in §10.3; the close-ups of II.1 and II.3; `Block.due`, `Plot.builtBand` and `builtProsperity` in §2.5, `households` and `condition` in §2.6, the memories told apart in §2.8; lineage through fusion and splitting in §6.1 and §6.3; `relet`, `densify`, `thin`, split and join as re-cuts and `builtBand`'s lifecycle (§7.1, §7.2, §7.4), with §7.3, §7.5 and `WealthLadderTable` in §7.6; the ladders and invariants of §5.2 and §5.3; the condition classes of §8.2; the summary; tests T31-1 to T31-12; `wealthLadder.json` in §14; O18 (g) of §15.2; priced in §16; D-25; the staged evolution row | §4.11 |

=== REPLACE ### 1.1 What is built, in what order; the two size ladders ===
### 1.1 What is built, in what order; the two size ladders

| stage | what | depth in this document |
|---|---|---|
| **STAGE 1 — the BASE** (built first) | one general town/city generator on the ladder **TOWN → CITY → METROPOLIS**, fusing MFCG-class and FTG-class generation plus O1–O19 (§15.2): the plot model, plot granularity, the prosperity field, greenery, heights, editability, permanent addresses, layers, drainage, every owner hook, and the optional content module `@plat/sim` (its own milestone, M4b) | build-ready: §2–§14, §16 |
| **STAGE 2** (built in this program at M5, after the base) | the same town composed of NG-class neighbourhood close-ups with consistent seams, shared seeds and one style system | interface depth: PART II; what the base must already carry is a base requirement (§2.5, §4.12) |
| the later stages of the owner's roadmap | stage-3 building compositions with their floor plans elaborated by click (the plan rung, §2.6), the village product, sewers with their underground neighbourhoods and floating islands (II.6, II.7), the evolution engine — decline and regrowth, use relocation, the wealth ladder, slow terrain change (§4.11) — corpus calibration, SettlementForge inputs (the dossier contract, §7.7) | hooks only — the one list is *Staged by the owner's roadmap* |

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
  layers: { islands: 'none'|'possible'; sewers: SewerExistenceRow };          // the sky layer's rung gate (II.6 (2), item 13) and the sewer layer's existence by tier (II.7.1, II.7.4, item 14); the village rows read 'none' and 'never' (PART III)
}
```

| rung | population band (default target) | buildings at the target | frame at the target (area; side at the default aspect 1, §3.2 (9); + 30 % margin per side) | stage rows (§4.2 S2) | granularity (frontage × / depth × / rich join max +) | greenery (parks per 1 000 × / edge green or orchard probability / private green shift) | matched references (§13.6) | layers: islands / sewers (II.6 (2), II.7.1) |
|---|---|---|---|---|---|---|---|---|
| TOWN | 1 500–10 000 (5 000) | 1 200–1 500 | 4 km² (2.0 km) | 2 stages; walled core 0.90 of buildings, ribbon 0.10 | 1.10 / 1.10 / 0 | 0.8 / 1.0 / +5 points | MFCG size 40; FTG BIG_TOWN (≈ 5 600) | none / `law` (II.7.1's defaults) |
| CITY | 10 000–30 000 (20 000) | 4 500–6 000 | 25 km² (5.0 km) | 3 stages; 0.55 / 0.33 walled, ribbon 0.12 | 1.00 / 1.00 / 0 | 1.0 / 0.6 / 0 | MFCG size 80; FTG BIG_CITY (24 500) | possible / `always` |
| METROPOLIS | 30 000–120 000 (50 000) | 12 000–15 000 | 64 km² (8.0 km) | 4 stages; 0.30 / 0.30 / 0.28 walled, ribbon 0.12 | 0.90 / 0.95 / +1 | 1.2 / 0.4 / −3 points | MFCG size 130; FTG METROPOLIS per D-31 | possible / `always` |

**The layers column** (items 13 and 14; J-A13.01). `layers.islands` is the gate II.6 (2) reads at generation and again at
every epoch: islands are possible at CITY and METROPOLIS and never at TOWN or on any village rung, and inside the gate
II.6's supply and count laws decide whether any exist. `layers.sewers` is II.7.1's existence row: a TOWN draws its sewers
at S0 by a law of its population and wealth, never certain; a CITY or METROPOLIS always has its network, its toggle
showing or hiding it; the village rows carry `never`. Both are per-rung data of `ladder.json`, where D-33 keeps every
per-rung fact.

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

=== REPLACE ### 1.2 The one-click default, stated once ===
### 1.2 The one-click default, stated once

`generate({seed})` → a TOWN of 5 000 people whose complete city band — every block in its ground tone, every footprint
mass, street, wall, gate and quarter label — is on screen within 150 ms of the click on the reference machine
(124–145 ms across the target's building range, §1.1; §12.1); a CITY's and a METROPOLIS's default requests take
≈ 0.33–0.42 s and ≈ 0.86–1.05 s, and every size follows §12.5's laws of the building count. The first paint is the
finished picture (§8.5). Defaults: the `ink` style with MFCG's raised under-copy on and the projected shadow off; walls
on at every rung (R6); the sky layer's model setting off and the underground layer hidden — a CITY or METROPOLIS has its
historical sewer network by tier, unseen until its toggle (D-3, II.6 (1), II.7.1); first-level features at *auto*, drawn per seed from S0's feature-probability table and reported
(§7.8); coast or river by the site model's request defaults; curved quarter labels at city zoom and district names from
district zoom, in IM FELL Great Primer (§9.4, §17.2); scale bar and compass; buildings composed and their plans derived on click (`elaborate: 'click'`, a per-viewer view
key, §4.1, §2.9); no questionnaire, no hidden state. Every
improvement ships behind the defaults (R8): the fast path never pays for the simulation module, projected shadows,
relief, thumbnails or the advanced panel.

=== REPLACE ### 1.4 Fusion thesis, stage by stage ===
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
| centre and destinations | plaza = innermost cell; streets = BFS gate → plaza on cell edges; roads to a phantom point 1 000 units out (`os-model.md` §6 via CONFIDENCE B7) | initial-roads type at the origin, no destinations ("most of the settlements in FTG look similar", 112861635) | **MFCG's idea on FTG's substrate**: named destinations (the markets, gates, bridging points, harbour, external bearings), the plaza and castle reserved and the gate sites picked at S3 — the principal market scored by where trade meets, usually the plaza, with secondary markets by size as both references have them (§4.2, item 24), the growth centre staying the root — arterials routed between them over a cost surface in real metres | FTG's destination-less bloom. Criterion: through-roads at a destination 100 % (O4 a, C); detour ≤ 1.4 (O4 b, P) | **TB** |
| secondary streets | since 0.10.0 every non-arterial street is the district-wide twisted bisection of the merged ward polygon — a connected secondary network with mostly 3-valent nodes, cut inside a wall built first so the fabric inherits its shape (87882877; `profile-mfcg.md` §4.9 via redteam-mfcg MFP-2) | proposal-queue growth in stages, 15° per-vertex cap, half-step normal streets, prune/trim between stages (`ftg-docs-params.md` §2.2–2.5) | **by regime** (§4.4): inside the walls S5 grows only district-scale secondaries that join the arterials (separation ≈ 120–250 m) and S8's recursive bent cut cuts every lane and intramural secondary; outside the walls **FTG's staged growth** along the main roads, destination-aware, curvature-continuous, with explicit legality thresholds; the suburb regime by preset | FTG growth down to block scale inside the walls (the fabric would neither inherit the wall nor carry MFCG's signature); FTG's clamp-only wiggle (zero mass above 15°, `_critic-ftg.md` §4 row 7). Criterion: MFCG's street signature inside the walls (§13.5, P); no turn cliff and junction p5 ≥ 30° (O4 b, P) | **TB** |
| districts | grown from seeds around features with `validatePatch/validateEdge`, holes split (CONFIDENCE B9); live typing is feature-named | district = one growth lot typed from the remaining pool "and what the lot is next to"; 49 % of buildings in no ring (`_critic-ftg.md` F4/F13) | **MFCG's grower over FTG's objects**: groups of coarse skeleton faces seeded at features, grown with arterials, walls and water as barriers, **feature-named**, merged into **quarters** for city-zoom labels; the use mix from the roster's allocation and the prosperity field, with a mixed-use floor; the field's default band set reproduces FTG's lifestyle tiers and MFCG's ward-class shares (§4.5, item 27) while districts stay feature-named (J-P1) | FTG's one-lot districts (containment 53 %); class-typed wards MFCG itself dropped. Criterion: containment 100 % (O11 b, C); city-zoom quarter labels at MFCG's count per matched size and block-level use mix in band (§13.5, P) | partial TB |
| block fabric (lanes) | twisted bisection of wards into blocks and alleys; restart on "bad poly" (`_critic.md` C13; ST-8) | straight inserted roads to a target area (§2.5) | **NG's bent cut** with the measured signature (§13.5) as a hole-aware kernel transaction with a bounded ladder; the district's class band as the stop law; the deep-interior choice (court, back lane, through-alley, rear plots) by band shares | FTG's straight roads (too regular); MFCG's restart. Criterion: K1/K2 within the measured spread (P); 4-way share per preset, organic 0–15 % (R3, P) | no TB — charm and evidence agree |
| blocks → plots | bisection lots + `filterInner` + `indentFronts`; lots painted as buildings | strips / centroid cuts / shrink-then-split; 441 m² in every class; no owner (`_critic-ftg.md` F17) | **new (O5/O18)**: per-frontage regions of each block, strips perpendicular to each frontage with party walls, typed residue, joins and splits from the prosperity field, alleys and back lanes where the band's deep-interior share says so | both references' cut-then-filter lots. Criterion: access edge 100 % (O5 a, C); streetwall continuity and footprint cover against MFCG's exports at the matched rung, direction declared (§13.5, P); within-district plot-area CV above its floor (§13.7, O) | **TB** — burgage plots were laid from the frontage |
| buildings | lots drawn as buildings ("the illusion of buildings"); Complex = rectangles; landmarks by `lir` | building = plot (Dense) or inset plot (Gaps); entrance on the outline ≈ 3 m from the road (C9; 2.99 m measured, §13.5) | **the owner's plot model**: a parcel with 0..n footprints and a typed yard; site plan by class (row / compound / detached / hovel / institution / tents); heights on everything; FTG's entrance rule retained as the main door's default and extended to a set — side, rear and yard doors where the plot gives an access edge or a yard — with a selective basement (§2.6, item 29); FTG's material model as the default, a material texture and colour only (§2.6, item 19); every designation scaled by its prosperity template (§4.7 S11); landmark footprint templates in the base; the stage-3 generator behind the `outline` / `compose` / `plan` interface (§2.6) | MFCG's global display switch; FTG's one-building-one-household lot. Criterion: O17 (a)–(i) | TB (owner ruling, metric tables) |
| walls, gates, castle | one ring on cell edges, built before the streets; `gates = N` exact; a tower on every non-gate vertex; castle = a cell with a 0.75 compactness repair loop (B5/B6) | wall = typed edge chain on the district ring after a stage; towers at 39 m median; no gate objects; castle fitted into its lot (C11/C12) | **FTG's staging + MFCG's gate identity and wall-first order** (§4.2 S3, §4.4 S5a, §4.8): gate sites picked and the castle and plaza reserved at S3; stage 1's enceinte traced at S3 over its solved gate routes and each later one at S5a, each from its stage's travel-cost boundary and pulled to defensible ground before that stage's streets grow; gates exactly where arterials cross, exact N by MFCG's measured gate law; towers by rule; the castle by score with the compactness gate as a shape check, repaired in place (angle equalisation, then bloat) before re-siting; several enceintes; an open waterfront by default; the wall → road lifecycle | MFCG's cell-as-castle and tower-per-vertex; FTG's ungated crossings. Criterion: O8 (a)–(h); walled share at MFCG's measured 0.87–0.92 (§13.5, P) | **TB** — defence as an explicit constraint |
| hinterland | farms as a ward type, `Cutter.grid` / `splitField`; forests "fill all available space" (the creator: "historically incorrect anyway") | main roads to the border, four farmland modes, farmsteads with driveways, hedgerows, reserves (C14–C16) | **FTG's contract + O14**: FTG's order — decided with the demand, drawn after the town — and its farmland modes chosen by size and landscape (§4.9, item 26); land use sized to population, fuel and timber beside food; field systems as presets (open-field strips, enclosed, FTG's hedgerows, the MFCG/VG sector look), farmsteads by their fields, woodland by distance and demand, a context margin | MFCG's fill-the-leftovers. Criterion: O14 (a)–(g) | TB |
| content | population ≈ 6.12 × buildings, wards are "hints" (`_critic.md` C1) | roster first from a dependency graph; every building has occupants; people lazy (B1–B6) | **FTG's guarantee, two-way**: a sequential, prefix-stable roster from our own tables → an eager allocation to districts and blocks → placement onto plots → a bounded reconcile; people derived lazily | MFCG's multiplier. Criterion: O7 (a)–(h) | TB |
| determinism | one MINSTD stream, retry continues the stream (A2) | `seed: null`, server-side (A4) | **O2**: 128-bit-keyed sub-streams (key components §6.1); integer geometry; permanent lineage-hash addresses with anchors (§6.3) | both models. Criterion: O2 (a)–(e) | — |
| rendering | ink print, casing idiom, per-ward cache, no zoom ("a big flaw") | lit web map, merged geometry, tiers | **one semantic display list with LOD and paint programs on one drawing path** (Canvas2D the reference backend of every preset); ink default, lit second, hatched for stage 2 | each renderer's coupling of geometry to its drawing path; a second render path for the lit look. Criterion: O12 (a)–(g) | — |
| editing | 8 warp kernels, per-ward reroll, no save | layout editor, regenerate area, bulk edit, "cannot be undone" | **FTG's graph editing on our plat + MFCG's warp kernels**, all as events on permanent addresses with locality, dry-run validation and undo | nothing of substance; neither persists. Criterion: O9 (a)–(f), the MFCG asks as measured scenarios (O9 f, O) | — |
| labels | curved labels on skeleton spines, halo, legend | arced serif labels, 2 m / 5 ft grid, scale bar, no compass | **MFCG's spines made hole-aware and collision-checked, quarter labels at city zoom + FTG's furniture** | none. Criterion: O13 (a)–(h) | — |
| failure policy | whole-city retry incl. wards and geometry (ST-8) | server "gives up"; no fallback in the splitter | **MFCG's tiers minus the restart tier**: typed results, bounded ladders, substitution, and a report that counts every requested feature by delivery tier | both. Criterion: tier-6 omissions of requested features 0 and p95 time on MFCG's worst configurations (O1 a, O3 b, O); hard invariant violations 0 / 1 000 (C) | — |

**Defaults emulate; extensions ride on top (item 23).** Where MFCG or FTG has a behaviour, the rule's default configuration
reproduces it — the table above says which reference where both have it, by the tiebreaker — and our extensions are
layered on as table values with a weight, a chance or an option, never as fixed laws; every default cell names the
reference behaviour it emulates and every extension carries its marker (§7.6, §17.1 (6)); the parity presets `MFCG` and
`FTG` switch the extensions off, which is how §13.5 proves the default sits inside the references' bands (§13.2 T23-1).

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

=== APPEND TO SECTION ### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test ===
**Fixtures added by amendments b (items 12 and 28; the kernel's rows in §3.4, in §3.7 and in §3.10).** *The underground
arena* (II.7): `corridorUnion` over a fixture of `tunnel` chains, where the kerb is the tunnel's external wall — a plot
line ending on it lands by attraction, and a tunnel junction yields wedges like a street junction. *The transient arena*
(the plan rung's, §3.4): the seed-tiling `area2` identity after random partitions of rect, L, T and curved-quad rings; a
side two seed rings share becoming one edge; a fixed bay with a slit and a cut; `mergeFaces` across a seed edge refused
with `E_STRUCTURAL`; the `readBack` order identical after a slot renumbering; `W_ATTRACTED` reported for a seed vertex
20 cm from another ring's edge. *The re-cut* (item 28 (f)): the arena opened from the same seed rings with three kept
rooms and a chimney-stack ring on a partition wall passed as `fixed` — the kept rings and the stack ring come back byte
for byte, `W_ATTRACTED` and `W_PLACED` are empty for them, the faces' `area2` sum equals the seed rings' sum and the
stack's wall segment survives; a second call with no kept rooms reproduces the first cut.

=== APPEND TO SECTION ### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===
* **Amendments b (items 8–31): hook tests and acceptance bars.** They are stated once, here (R9); the mechanisms they
  prove are at the homes §0.2 names, and the fixture ids the editing seats coined (`T⟨item⟩-⟨n⟩`) are kept. A bar is
  hard — 0 violations, or 100 % — unless it names a band. Every hook test runs on the golden TOWN and CITY seeds in the
  PR tier and on B-CITY-lite nightly; the bars of a staged engine run on hook fixtures, its conversions applied by hand,
  until the engine lands, when the same bars bind it. The entity registry's path test above covers every record the
  pass adds (`Use`, `Entrance`, `Basement`, `Rejection`, `DossierRef`, `MaterialLedger`, `AccessPoint`,
  `ElaborationRecord`, the underground plots' and buildings' fields, `Block.due`, `Plot.builtBand` and
  `builtProsperity` with their migration hook, the plan records with the room's unit), and the enumeration test the
  new event kinds (`rejectSite`, `placeAt`, `setEntrance`, `drawPassage`, `sealPassage`, `openPassage`, `relet`,
  `densify`, `thin`, the seven plan events, `regenerate.rung` and the `convert` kinds of `DeclineOp`,
  `UseConversionOp`, `LadderOp`, `TerrainWaterOp` and `HiddenOp`). No golden exists before M1 (D-24), so none of the
  new attributes needs a declared shift.
  * *Decline and regrowth (item 8; §4.11).* (T8-1) every `DeclineOp` kind applied by hand on the golden TOWN undoes to
    byte identity; (T8-2) the regrowth-first fixture — a TOWN with 12 % of its buildings vacated, derelict or cleared by
    hand, then grown by +6 % population: 0 new S5 faces, ≥ 95 % of the delta placed inside the old plan, every
    vacancy-run share within ± 0.02 of its table share; (T8-3) 20 epochs of hand-applied decline and regrowth keep the
    address of every ruin, trace and superseded ring (100 %), and no cleared building gets a tombstone unless
    demolished or succeeded; (T8-4) the exposure function is monotone in each driver's weight, and its chance share
    equals the table's; (T8-5) the salvage ledger's credits equal the yields of the robbed and the cleared, are never
    negative, and every shortfall is reported; (T8-6) a CITY dropped below 10 000 inhabitants loses its islands over
    their dwell spans — waning, settled, fallen — never in one epoch; (T8-7) after a −6 % population fall on a TOWN
    whose buildings are let out, no building with a surviving household reads `vacant`, and every `relet` down marks
    its plan rung `stale` (item 28 (f)).
  * *Islands (items 10, 13, 15; II.6).* (T10-1) 200 CITY seeds with `recipe.layers.islands` on: a town supply below the
    threshold gives 0 islands, and the supported area is monotone non-decreasing in the town's supply and in the
    carried districts' supply over the band rows; (T13-1) TOWN and village requests never carry a sky allocation; a
    CITY with the setting off carries none, and its ground digest equals the realism golden; (T15-1) 500 CITY seeds at
    the target with the setting on: P(count = 0) within ± 0.05 of the table's value at the measured town supply, every
    count 0–3 observed, and hiding the sky layer changes no model digest.
  * *The underground (items 11, 12, 14; II.6, II.7).* (T11-1) tunnel conversions by hand undo exactly; no
    `EvolutionStrategy` plan on the hook fixture contains a tunnel `demolish` (a lint); a sealed tunnel persists at its
    address and reopens; (T12-1) a schema fixture of one underground neighbourhood — two navigable tunnels, a junction,
    six cells, one vault, one stair, two gratings — validates and passes every row of §5.3's U1–U3 family: each
    underground plot's frontage rows on exactly one navigable open tunnel run, no `way` chain and no `alley` face on
    the underground arena, every building's frontage side on its plot's frontage edge, ≥ 1 access per neighbourhood,
    every access point in public ground or a yard, 0 underground faces under an excluded ground face (also on
    B-CITY-lite with the `navigable` preset), and the underground stage's commit records holding 0 writes on the
    ground `PlatKey`; the underground reroll-isolation fixture leaves the ground byte-identical; (T14-1) the TOWN
    existence draw's frequency over 1 000 seeds at three populations × three wealth levels lies within II.7.1's law
    ± 3 s.e. and never reaches 1; `Features.sewers` is true on 100 % of CITY and METROPOLIS seeds; a TOWN with `off`
    and a village request carry 0 tunnels; with the layer hidden a CITY's render matches, pixel for pixel, the render
    the same seed gave before the staged stages registered.
  * *Assignments (items 16–19; §4.7 S10b, S11; §4.11).* (T16-1) hard relation rows satisfied on 100 % of placed items;
    every unplaced item reported with its blocking rows and ≥ 1 closest option; soft-row satisfaction ≥ 95 % reported
    per city — O7 (b) extended: noxious trades downstream or extramural, water trades on water, the market hall at a
    tier-1 junction or gate, inns at gates; (T16-2) hard supply edges within their `maxDistanceM` on ≥ 90 % of items
    at generation, the rest reported; (T16-3) the one-solver contract — S10b's placement of a class and an `assign` of
    the same class from the same state give the same plots; (T16-4) the detour factor — block-raster distance against
    the way-graph Dijkstra within the factor's band on B-CITY at M1, the fallback a per-rung refit; (T17-1) a hand
    relocation keeps the use's address, the building persists vacant with its `formerUses`, and undo restores;
    (T17-2) a pinned assignment never moves under an epoch, and the use row of the churn cap holds; (T17-3) one seed
    with one circumstance timeline replays to a single digest of openings, closings and moves; (T18-1) a designation
    mutation keeps every kept part byte-identical (leaf digests) and leaves everything beyond the plot and its joined
    neighbour untouched (the locality oracle); (T18-2) locked parts are never subtracted; (T18-3) A → B → A by the
    inverse mutation is byte-identical when nothing else changed, and one change from one starting state yields one
    mutation record on every host; (T18-4) S11 run as a mutation from the empty design reproduces generation
    byte-identically; (T19-1) every roster class has a designation template with every band row (registry test);
    (T19-2) the size budget is monotone along prosperity (Spearman ≥ 0.9 over B-CITY) and continuous between adjacent
    samples by §7.8's rule on the template's continuous columns — two smiths a few streets apart differ by degree;
    (T19-3) a `setAttr` material change leaves the geometry subtree of the digest unchanged; (T19-4) with no epoch
    every building houses its template row's `households.built`.
  * *The dossier (items 20 and 22; §7.7).* (T20-1) a map delete of a dossier-backed element re-places it coherently from
    the same seed, every plot outside the disruption set byte-identical; (T20-2) the rejection lapses at the first
    epoch whose population target differs and at a dossier event touching its block, and an undo of that event
    restores the hold; (T20-3) a blocked positive placement returns its blocking rows and ≥ 1 closest site;
    (T20-4) generator-added filler deleted, the dossier's housing re-provided elsewhere; (T22-1) the same history from
    the same seed gives one digest; (T22-2) two histories reaching one dossier give two valid maps whose differences
    are confined to their disruption sets; (T22-3) an over-budget dossier event lands and is reported; (T22-4) a
    brand-new map from a dossier holds every dossier element from the start, and everything outside the report is
    byte-identical after any dossier event.
  * *Emulation (items 23, 24, 26, 27; §7.6 with §4.2, §4.9 and §4.5).* (T23-1) with the parity presets `MFCG` and
    `FTG` every `extension` cell reads 0 or off and B-REF's parity rows hold; with the default preset the extensions
    run at their table values; a registry test that every table cell has `provenance.source` and, where it extends a
    reference, its `extension` marker; (T24-1) under the defaults the principal market sits on the plaza for ≥ 90 % of
    inland walled B-CITY seeds and elsewhere for ≥ 50 % of port seeds (§13.7's row); (T24-2) the market count equals
    the roster's demand; (T24-3) no two market reservations share an edge or lie within `market.minSeparationM`;
    (T26-1) wood area lies within the fuel and timber rows' demand, the import share reported; (T26-2) the `fill`
    mode at TOWN and CITY on flat fertile fixtures and `perimeter` at METROPOLIS or on hilly fixtures; (T26-3) with
    `reserveArable` on, fertile land outside the boundary ≥ the reserve wherever the fixture makes it feasible;
    (T27-1) a schema test that the band set has one `middle`, that every band-keyed table resolves a row or an
    interpolation for every band, and that the parity preset's household shares equal FTG's captured distribution;
    (T27-2) the shanty fixture — an average band of poor gives a shanty kind once half the stages have run, the
    extramural share reported.
  * *Terrain and water (item 25; §4.11).* (T25-1) a hand `reclaim` and a hand `silt` are byte-identical outside their
    footprint, in the carve fixtures' form (§13.1), and undo exactly.
  * *The plan rung and elaboration (item 28; §2.6 beside §2.8's record, §2.9's cache and §4.1's policy) — the B-PLAN fixtures.* 24 fixture
    buildings (rectangles, L and T shapes, a court closed by a U, a quad from a curved row, a rectangle carrying a round tower, a
    manor of three wings at unequal storey counts), each in six classes and three bands with one to four storeys, the
    entrance sets of item 29 and a cellar wherever the class row gives one; from stage 3's landing, the plans of every clicked
    building of B-CITY-lite as well. Hard: (T28-1) each room the programme marks hard is present; soft rooms are
    delivered, folded into a neighbour or dropped, each with its tier in the report; (T28-2) starting at the main entrance,
    openings and stair cores lead to every room of every storey; each entrance gives onto a room; a passage can be
    entered from either of its ways; (T28-3) stairs stacked — a stair core occupies one bay through all the storeys it
    serves, and the basement is entered by that core or through a trapdoor the class row declares; (T28-4) the outer walls
    coincide with the wings: on each storey the rooms together cover exactly the rings of those wings reaching that level,
    each exterior wall segment sits along a wing ring's edge, each room's ring is simple and lies within its wing, and no gap or
    overlap remains between rooms (§3.10's seed-tiling row per storey); (T28-5) each chimney rises from a hearth's
    column, and a dormer exists only where a roofed room needs light; (T28-6) one building state, one plan, host after
    host (§6.5 (9) applied at the building band); re-rolling the layout preserves the stair core, the wings and the
    entrances bit for bit, and re-rolling the roles keeps every ring and every opening's position bit for bit; (T28-7) no edit or
    re-roll of a plan touches anything beyond its own building; (T28-8) `plan()` meets §12.7's row at its median per
    building, one plan for each click, and the cache stays within §12.8's line. Soft bands, reported: no unit room used as a
    passage (its door count within its row's cap); corridors never doubled in parallel; the share of each storey given
    to circulation, by class and band; room areas ordered by role; rooms deeper from the street the more private they
    are; a loop in the door graph only when a row calls for one (§13.7's row). Elaboration: (T28-9) click order
    changes no digest — one document elaborated in two orders has identical model, records and derived-complete
    digests, and the cache holds byte-identical results per (entity, rung, input digest); (T28-10) a `stale` rung
    re-derived by mutation keeps every surviving room's address, and viewing never re-derives a `current` rung;
    (T28-11) an evicted cache re-derives to the same bytes, and a corrupt cache chunk is dropped and re-derived, never
    trusted; (T28-12) clicking a neighbourhood makes its buildings' `wings` rung `current`; clicking a building does
    the same for `plan`, after `wings` where that is still absent.
  * *The interior ladder (item 28 (f); §2.6).* (T28-13) the owner's bar — when a building's occupants' band falls two
    rows, the re-cut plan houses every dossier household with its own door off a corridor or stair hall, within
    unchanged wing rings and around an unmoved stair core; (T28-14) the shell stays byte-identical through any interior
    re-cut — its wings, entrances, heights and roof — which is §3.10's seed-tiling row per storey, cited rather than
    restated; (T28-15) re-uniting the households restores the earlier plan where nothing else changed (item 18 (e)'s
    inverse); (T28-16) a schema test that every band of the band set maps to an interior row, and that every row names
    its unit, shared, staff, circulation and size columns; (T28-17) the owner's concern — after a district's two-band
    fall every roster household is housed without a new plot, bounded by each shell's capacity, and no F-PLAN tier
    drops a household unit (a unit falls to the next poorer form first).
  * *Entrances and basements (item 29; §2.6).* (T29-1) each building has one main entrance and only one, facing its
    street or its court (100 %; O5 (f)'s doorless count stays 0); (T29-2) no side or rear entrance without an access
    edge beyond the frontage, and the caps per class hold; (T29-3) no cellar under the flood band or on the water
    table's damp ground; (T29-4) every basement inside its ground-floor footprint and smaller, with its storey in
    `Heights` and a stair or trapdoor at the core; the FTG entrance row of §13.5 stands for the main door.
  * *Hidden plots (item 30; §4.6, §9.2).* (T30-1) every hidden plot is reachable by a chain of access edges — alley,
    court and passage faces — from a public way, 100 %; a sealed plot reads `sealed`, is reported, is never landlocked,
    and reopens; (T30-2) the hidden share per district lies within its band's target ± 0.03 (§13.7); (T30-3) no label
    of a local or secret place appears at the settlement band without the viewer's knowledge key, and no secret name
    enters an export made under a view state without it; (T30-4) the parity presets and the village rungs produce 0
    hidden plots, and a hidden court passes §8.5's figure-ground metrics, reading as a court behind buildings.
  * *Prosperity change (item 31; §4.11).* (T31-1) after a re-cut every plot keeps ≥ 1 access edge and the class
    minimums, and party walls agree on both sides; (T31-2) granularity lies within the band's target ± tolerance;
    (T31-3) the churn cap holds for each kind, in each district and each block; (T31-4) no occupied building is
    removed by a band change — a redevelopment first vacates — and a plot `join` or `split` on an occupied building
    returns an F-EDIT conflict; (T31-5) generation-then-mutation equals the same history replayed; (T31-6) an undo of a
    fusion or a split restores rings, records and `builtBand` exactly, and a resurrected member takes `builtBand` from
    the event; (T31-7) a direct `setAttr` of `builtBand` is refused; a brush sets `builtBand` in its scope, and with
    no epoch the static base's digest is unchanged; (T31-8) a schema test that every class has a replaceability and
    every ladder row a duration per direction and replaceability. The floor's bars: (T31-9) after any run of epochs
    with no rung-3 event on a plot, its ring and its buildings' shells are unchanged and its geometry band is at or
    above its floor; (T31-10) after a rung-3 event `builtBand` is the band of the new stock; (T31-11) a rich → poor →
    rich run with no rung-3 event leaves rings and shells byte-identical and returns the rung-1 and rung-2 attributes
    to the rich manifestation within the ladder's durations; (T31-12) with no epoch `builtBand` equals each plot's
    generation band and the geometry band equals the field band; a town and a metropolis each resolve their own middle
    band; every band set names its middle band.

=== APPEND TO SECTION ### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file ===
**Rows added by amendments b (items 24, 27, 29 and 30).** They join the table above under the same band rule; the
parity presets `MFCG` and `FTG` (§7.6) add one B-REF run per preset to the nightly report, on which every row above
must hold with our extensions switched off (§13.2 T23-1).

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| markets | secondary-market frequency per matched size; market reservations sharing an edge; the market count against the roster | MFCG's secondary-plaza frequency and non-adjacency on the plain size sweep ⟨M-1⟩ — **target**; FTG's two market squares in the captured city — descriptive | frequency by the band rule; adjacent markets 0 | P |
| wealth bands | built-land share per band group; households per lifestyle tier under the parity preset | FTG's six-tier lifestyle distribution and MFCG's ward-class shares on the sweep ⟨M-1⟩ — **descriptive** (the default band set reproduces them, §4.5; the parity preset equals them by construction, T27-1) | reported | P |
| entrances and basements | the main entrance's edge and distance (the entrance row above stands); side, rear and yard doors per class; the basement share by class and storeys | MFCG and FTG give one entrance to each building — the **target** above for the main door; Dwellings' one entrance, its absent back door and its basement share have no `baselines.json` row and are a descriptive note only, never a gate | the entrance row's band; the rest reported | P |
| hidden plots | the hidden and rear-plot share per band | MFCG and FTG give every building a street — 0 hidden share — **target for the parity presets**; the default preset's share is §13.7's threshold | parity presets 0; default within its target ± 0.03 | C |

=== APPEND TO SECTION ### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30) ===
**Rows added by amendments b.** Three thresholds no reference can set join the table above under J-T:

| letter | threshold (number now) | confirmed at | pre-decided fallback if the confirmation fails |
|---|---|---|---|
| item 24 principal-market siting | on the plaza in ≥ 90 % of inland walled B-CITY seeds and off it in ≥ 50 % of port seeds (§13.2 T24-1) | M2b | the trade-convergence weights of `market.siting` (§4.2 S3 (12)) are re-tuned once and the measurement repeats; if still failing, the two shares become the measured p10 — **not achieved** |
| item 30 hidden share | per district within its band's target ± 0.03 (§13.2 T30-2) | M2b | the reach weights of §4.6's hidden-share row are re-tuned once and the measurement repeats; if still failing, the tolerance becomes the measured p90 deviation — **not achieved** |
| item 28 plan soft bands | the share of each storey given to circulation, by class and band; room areas ordered by role; rooms deeper from the street the more private they are (§13.2's soft bands; the Dwellings medians the synthesis cites are the descriptive baseline) | the plan rung's intake (stage 3) | the layout pattern's circulation value (a `RoomProgramRow` cell) steps once toward the band and the measurement repeats; a band still missed is reported and gates nothing (a soft band) |

=== APPEND TO SECTION ### 13.8 CI tiers and compute budgets (SCL-18; D-34) ===
**Amendments b in the tiers.** The hook tests of §13.2 (T8, T10, T11, T13, T15, T25, T31) run in the PR tier on the golden
TOWN and CITY fixtures and nightly on B-CITY-lite; the assignment, dossier and emulation tests (T16–T24, T26, T27, T29,
T30) join B-CITY-lite in the PR tier and B-CITY nightly, and the parity presets add one B-REF run per preset to the
nightly report; the underground schema fixture (T12-1) together with the B-PLAN fixtures (T28) runs in the PR tier from
their stages' intake; the milestone tier's 20-epoch test carries the wealth ladder and the decline table. The budgets above
do not change: the PR tier's added work is measured at M0 with the tiers, and the paragraph above's fallback applies to
it like any other over-run.

=== APPEND TO SECTION ### 13.9 The corpus-calibration interface (staged by the owner; DEF-9) ===
5. Amendments b's tables join the first re-signing (items 16 (d), 19 (d), 26, 27, 28, 30 and 31): the relation templates
   and supply edges (§10.2), the designation templates with the compatibility table (§4.7 S11), the room programmes and
   the interior ladder's rows (§2.6 together with §10.2), the hidden-share and reach rows (§4.6), the market-siting weights (§4.2),
   the farmland modes and the wood rows (§4.9), the band set (§4.5) and the wealth ladder's durations with the
   replaceability column (§4.11, §10.2) — every cell `{value, unit, provenance, calibratable}`, as (2) requires.

=== REPLACE ## §14 Package and module layout, key interfaces, dependency rules, extension points ===
## §14 Package and module layout, key interfaces, dependency rules, extension points

*In plain words.* The code is split into small packages with one-way dependencies: the geometry kernel knows nothing
about towns; the town model knows nothing about drawing; the drawing code knows nothing about how the town was made;
the app sits on top of a headless library. New looks, new layout templates, new export formats, new building
generators and new rule tables plug into named registries without touching the pipeline. All of it lives in one
repository, `plat/`, that never reads the research material (§17).

```
@plat/kernel   lattice, predicates, one arena per layer with the five levels as views (§2.2), role and owner tables, resolution of stored
               references, batched transactions, kernel invariants, arrangement booleans / buffers / bands (§3.7), the straight skeleton and
               its validator (§3.8), obb / hull / lir, delaunay (delaunator), poisson (the stamped ranked tiles' construction from a constant
               stream key, run at build time by `plat/tools/stamptiles/` and in a worker only as the fallback rebuild, §8.10), curves, index
               (flatbush / rbush / grid), noise, dmath (our fdlibm 5.3 port), rng (xoshiro + 128-bit keys; `rng.stream`, the one structured
               stream mixer of §6.1), concern registry, the transient arenas of the plan rung (`transientArena`, `readBack`, `release`, §3.4)
@plat/model    schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-coverage test), lifecycle, provenance, document,
               serialisation (.plat, CBOR twin), migrations, the Merkle model digest, the core statistics record, the control registry; the
               label records `LabelEntity` and `QuarterNode` (§9.1); the shared view vocabulary `LodBand`, `Role`, `ZoomStop` and the
               label-row tables `LabelTable`, `StringTable`, `GeomTable` with §9.2's `LabelRows` view (§8.1); the records amendments b
               add — `Use`, `Entrance`, `Basement`, `Rejection`, `DossierRef`, `MaterialLedger`, `AccessPoint`, `ElaborationRecord` and
               the plan records (§2.5–§2.8)
@plat/tables   rule tables, presets, style sheets, rung profiles (`ladder.json`, §1.1), the work-limit coefficients (`workLimits.json`,
               §5.1 (5)), the wealth ladder (`wealthLadder.json`, §4.11), the room programmes with the interior ladder (`roomProgram.json`,
               §2.6 together with §10.2), the band set (`prosperity.bands`, §4.5), the parity presets `MFCG` and `FTG` (§7.6), setting packs (§10.4)
               and the default keymap as versioned JSON with provenance; loaders; the override layer
@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces
@plat/content  S2 sequential roster, demand and its propagation through the supply edges, government and religion rows, S7b / S10a
               allocation, households and people derivation, the relation-store schema, the economy and personality schema stubs
               (D-32), naming engine + grammar   [S10b placement moved to @plat/plots with the solver, item 16]
@plat/layout   S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, S6 grower / typing / fields / the quarter merge tree,
               S7 fortification and water furniture, S7b claims, S8 infill (BentCutFabric), S9 corridors, S12a hinterland siting, the
               hinterland unit, S12b greenery; the StrategyRegistry and the ordering of registered StageDecls, the staged network and
               underground registrations included (II.7.2, II.7.4)
@plat/plots    S10 granularity law, per-frontage regions, joins / splits / alleys and passages, boundary treatments, the incremental re-cut
               with fixed neighbours (§4.7 S10 (7), §4.11); S11 site plans, packer, heights, footprint templates, the entrance set and the
               basement decision (§2.6); the one placement solver with its relation and supply scoring (§4.7 S10b) and the designation
               mutator (§4.7 S11); the BuildingGenerator interface (`outline` / `compose` / `plan`) + OutlineBuildingGenerator and the
               default PlanBuilder (§2.6)
@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]
@plat/labels   S13a names (every node of the quarter tree), candidates and spines; S13b view placement over the parameters the renderer
               passes in (`ObstacleSource`, `RoleIndex`, below) — it never imports render; the font-metrics reader; collision; furniture
               incl. the ruler and the emblem generator
@plat/render   S14 columnar display-list builder, paint programs, style sheets, LOD, the tile pyramid and the tile worker (which runs S13b
               by calling `@plat/labels`), backends (Canvas2D, SVG, print tiles; the WebGL2 tile compositor as a fallback), shadow pass,
               decoration stamps over the bundled stamp-tile asset (§8.10), live layers, the tile worker's queue of resumable raster jobs (§8.9)
@plat/edit     edit events — the plan events and rung re-rolls, the dossier events with rejections and positive placements, the
               wealth-ladder and passage kinds among them (§7.1 and §7.7) — dry-run validation, undo and redo records, scoped regeneration,
               rebase, the dependency audit, event migrations, warp kernels
@plat/export   geojson, svg, png / tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt), gltf / obj, cityjson, csv, permalinks
@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and schedules, calendar, factions, events, economy,
               personality and the stat-block pack (D-32) — over @plat/content ids
@plat/api      the handle-based facade (§11.2), the generation worker host, the derivation pool, the host bridge (§11.3) and DocResolver
               (§11.5), the elaboration cache (`Document.elaborations`, held in the generation worker, §2.9), the headless CLI
@plat/app      the reference UI (below)
@plat/docs     the user guide: generated reference pages from the control, entity and table registries plus written pages;
               `known-defects.json`; release notes generated from `plat/goldens/shifts/` and the milestone records (§13.3), the D-5
               statuses (§13.6) and the known defects
@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench statistics and the `parity` CLI
               (reads `baselines/baselines.json` only), golden tooling with shift, cascade and milestone records and placement digests over
               `plat/goldens/` (§13.3) and the one `WaterSetting` type every record uses, the O9 (c) faithfulness campaign (§13.2), the boolean
               and buffer oracles (Clipper2-WASM in Node, polygon-clipping; §3.7), the clean-room scanner (§17.1 (5)), the D-5 seed list by
               `H32` and the export command (`plat d5 seeds`, PNGs for §13.6), which read only the committed `ftg-captures.json` and
               `ng-counts.json` (§13.6 (2))
```

Each stage's declared inputs and outputs are its `StageDecl` registration (§4.1–§4.12); the record types a registration
names are declared at their homes (§2.5–§2.7, §3.4, §4.8, §10.4, II.1, II.6).

**Dependency rules (enforced by lint):** `kernel ← model ← tables ← {site, content} ← layout ← plots ← labels ← render
← edit ← export ← api ← app`; **labels ← render**: the tile worker in `render` runs S13b from `labels`, and the drawn
symbol extents and the display-list index that S13b reads reach it only as the parameters `ObstacleSource` and
`RoleIndex` — interfaces `labels` declares and `render` implements — so `labels` never imports `render`, and the types
both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`, the label-row tables and `LabelRows`) come from `model`; `docs`
reads the registries of `model` and `tables` only; `hood` depends on `layout` / `plots` only through their interfaces;
`sim` depends on `content` and `model` only; `render` never imports `layout`; nothing depends on `app`; no package
imports a backend it does not need; every adopted runtime library is imported in exactly one adapter file of the one
package that uses it. Model packages, `@plat/labels` and the renderer code that feeds S13b obey §6.5 (3)'s allowlist
lint, which also scans the vendored dependency sources (§6.5 (4)). No import, fixture or script path may resolve
outside `plat/` (§17.1 (3)).

```ts
// @plat/layout — stages and strategies (StageDecl, NetworkStrategy and EnceinteStrategy are §4.12's)
interface Stage<I, O> extends StageDecl {   // StageDecl (§4.12): id, I/O, stream keys, invariants, ladder, workLimits, budgetMs, batch, lineageUnit, lazy, txForm
  version: string; inputsOf(model: Model, scope: Scope): I; run(input: I, ctx: StageContext): KernelResult<O> }
type ConcernId = number & { readonly __brand: 'ConcernId' };   // u16 from the concern registry (§6.1), generated as typed constants — never a string
interface StreamOpts { reroll: number /* the derivation unit's reroll (§6.1) */; attempt: number /* ladder retry, ≤ the concern's registered cap: 3 for geometric ladders, 8 for naming (§6.1, §9.6) */;
  epoch: number; salt: number /* the concern's current salt from the recipe and the log's rerollLayer events; 0 for geometry concerns */ }
interface StageContext { doc: Document; plats: Record<string /* PlatKey */, Plat>;
  stream(concern: ConcernId, entity: Handle /* its entity key is cached in the arena beside its lineage hash (§6.1); TOWN_ROOT for town-level draws (§6.1) */, opts: StreamOpts): Stream;
  streamOpts(concern: ConcernId, entity: Handle, attempt?: number): StreamOpts /* the defaults: reroll from the entity's derivation unit, epoch from this context, salt from the document */;
  tables: TableView; rung: RungProfile /* §1.1 */; report: ReportSink; scope?: Scope; epoch: number }
type Scope = { kind: 'all' } | { kind: 'entities'; ids: Id[] } | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level } | { kind: 'epoch'; epoch: number };   // no raw face ids at the API
interface StrategyRegistry { terrain: Map<string, TerrainStrategy>; coast: Map<string, CoastStrategy>; river: Map<string, RiverStrategy>; manifest: Map<string, ManifestStrategy>;
  network: Map<string, NetworkStrategy>; enceinte: Map<string, EnceinteStrategy>; fabric: Map<string, FabricStrategy>; plots: Map<string, PlotStrategy>;
  sitePlan: Map<string, SitePlanStrategy>; building: Map<string, BuildingGenerator>; evolution: Map<string, EvolutionStrategy>; sky: Map<string, SkyStrategy>; sewer: Map<string, SewerStrategy>;
  underground: Map<string, UndergroundStrategy> /* II.7.4: registered after the network stage by declared I/O, its outputs under.blocks, under.plots, under.buildings and under.access placed before the display list by §4.1's order */ }
interface FabricStrategy  { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc: StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }> }
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext, claims: Claim[], sc: StageContext, k: Kernel): KernelResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: ContextVector, tables: TableView, rng: Stream, k: Kernel): KernelResult<SitePlan> }
interface GranularityLaw  { bands(ctx: ContextVector, rung: RungProfile): { frontageM: [number, number]; depthM: [number, number]; areaM2: [number, number]; joinMax: number; vacancyRunShare: number } }   // the deep-interior choice is S8's (§4.6); the rows are keyed by §4.5's band set (item 27) and read at the plot's manifested band (§4.11)
// @plat/kernel — the façade the stages see, and the one stream mixer every reader uses
interface Kernel { plat(key: ArenaKey): Plat; view(key: ArenaKey, level: Level): LevelView; resolve(ref: GeomRef, key: ArenaKey): Resolved; geom: GeomOps; index: SpatialIndex;
  // transientArena(owner, seed, fixed, workLimit), readBack(key) and release(key) are §3.4's — the plan rung's transient arenas; ArenaKey = PlatKey | TransientKey (§3.4)
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<T>   // exactly one form: tx.ops (declared) or fn (callback), §3.3
}   // KernelTx (§3.3) carries `stage` and `rederivesFrom`; the services resolveVertexAt, signature and sampleProfile are §3.4's
interface Rng { stream(entityKey: Hash128, stage: number /* u16 stage id; STAGE_VIEW = 0xffff for paint programs and furniture */, concern: ConcernId, opts: StreamOpts): Stream }
// StageContext.stream is rng.stream with the calling stage's id and the entity's cached key; paint programs and furniture call rng.stream with STAGE_VIEW.
// No string reaches the mixer; the textual form of a key (§6.1) is rendered for reports only, and a lint rejects a stream call whose concern is not a ConcernId.
// @plat/content — a host's own roster or people; registered only after §11.4's double-run check, its outputs recorded in the document
interface ContentProvider { id: string; version: string; roster(pop: number, character: CharacterVector, tables: TableView, rng: Stream): Roster;
  site(roster: Roster, plots: Plot[], ctx: SitingContext, rng: Stream): SitingResult; people(household: Id, rng: Stream): Person[] }
// @plat/plots — the stage-3 hook: BuildingGenerator { outline(…); compose(…, lod); plan(…, prior?) } is §2.6's; PlacementSolver, DesignationMutator, RelationRule and SupplyEdge are §4.7's
// @plat/labels — S13b's inputs from the renderer, declared here and implemented by @plat/render (labels never imports render)
interface ObstacleSource { protectedExtents(stop: ZoomStop, box: Box): { box: Box; entity: Handle; kind: 'gate'|'castle'|'plaza'|'bridge'|'wall' }[] /* drawn symbol extents at the stop, §9.2 */;
  coverage(stop: ZoomStop, box: Box): { labels: number; protected: number; buildings: number; ways: number; water: number } /* mark cover, for furniture placement, §9.5 */ }
interface RoleIndex { roleAt(p: Point, band: LodBand): Role /* the area mark under a point: halos, §9.4 */; snap(p: Point, radiusPx: number, stop: ZoomStop): Point | null /* the measure tool, §9.5 */ }
// both are implemented by @plat/render over a display list: in the tile worker for S13b, furniture placement and the ruler (the main thread reaches coverage and snap
// through §8.9's queries), in the generation worker over an SVG export's transient list, and in the tile worker over a raster export's (§11.1); every implementation is under §6.5 (3)'s lint
// @plat/labels — LabelPlacer and PlacementJob, which take §9.2's LabelRows view: §9.2
// @plat/model — LabelEntity, QuarterNode: §9.1; LodBand, Role, ZoomStop, LabelTable, StringTable, GeomTable: §8.1, §8.2, §8.8; LabelRows: §9.2
// @plat/render — DisplayList, MarkTable, DisplayDelta, DisplayListBuilder: §8.1; StyleSheet, Symbolisation, OrderSlot, LiveLayerProvider: §8.2; LayerSpec: §8.4;
//                backends, threads, TileAddress, TileRasterOpts, TileBackend, RasterJob, VectorBackend: §8.9
// @plat/edit
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(token, fates, renames) — an event carrying fates and renames commits only when a fresh dry run computes the same fates and renames (§11.2) */;
  undo(doc: Document, session: string, of?: number): ApplyResult /* appends an undo event for the session, §7.4; `of` only for the owner role */;
  redo(doc: Document, session: string): ApplyResult /* appends a redo event */;
  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: Diff };
  rebase(doc: Document, reason: RebaseReason, at?: number /* default: the log head; h₀ — the decoded snapshot's model.seq — when the saved town is kept after
    edits made during load verification (§2.9 step 4, §7.1): the only two states the engine holds materialised */): ApplyResult /* as apply, undo and
    redo report: 'ok' when the rebase event is appended at the head; any other `at` returns { status: 'conflict', actions: [{ kind: 'invalid', message:
    'E_REBASE_AT: at must be the log head or h₀' }] }, appends nothing and rebases nothing, on every host alike (§7.1, §11.2) */ }
// the event kinds amendments b add — rejectSite, placeAt, setEntrance, drawPassage, sealPassage, openPassage, relet, densify, thin, the seven plan events, regenerate.rung and §4.11's convert kinds — are §7.1's, each with its inverse, its fates and its migration (§7.4, §7.5)
// @plat/api — PlatApi and DocHandle: §11.2; BridgeTransport and BridgeMessage: §11.3; DocResolver: §11.5
// @plat/export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Uint8Array | string> }
  /* runs in the generation worker (§11.1): list = the transient export list for SVG and for raster formats (a raster format transfers it to the tile worker with its
     raster-export request, §8.9, §11.1); null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document forms) */
// @plat/testkit — Baseline, ParityReport: §13.5; ShiftRecord, CascadeRecord, MilestoneRecord, WaterSetting: §13.3; D5Record, D5Pair, FtgCapture, H32: §13.6; CorpusAdapter, CalibrationRun: §13.9
```

**`@plat/app`, the reference UI.** One click; the basic panel (≤ 12 controls, §7.8) and the advanced panel; the report
panel; the editing tools (draw, move, warp, brushes, the four actions, lock, assign; a dossier element placed here or its site
rejected, a passage sealed or opened, plots fused or split, the plan tools at the building band — §7.1 and §7.7); the tables
editor and the style dialog; the ruler (§9.5); the gazetteer and the "features in view" list, both withholding the names and
purposes of local and secret places the viewer's knowledge key does not hold (§9.2, §11.2); context help; the family-tree
view (module).

* **Input scheme** — MFCG's idiom kept and stated, held in `keymap.json` (data, editable, versioned like every table).
  Pointer: *click* selects and opens the context panel; *double-click* zooms to the entity's band (a district fills the
  view — MFCG's district view); *shift+click* is New random on the entity's scope, keeping its kind (MFCG's ward reroll);
  *ctrl / cmd+click* resets the entity to generated (one logged event that applies the inverses of the entity's own
  edits); *alt+click* toggles its lock; right-click or long-press opens the context actions (§7.4); dragging a selected
  vertex is `moveVertex`; wheel or pinch zooms; dragging empty map pans. Keys while the map has focus: **A** alleys at
  the city band, **B** buildings shown / hidden, **D** grid, **N** hairline mode, **L** labels, **T** trees, **M** ruler,
  **W** warp tool (then **1–8** choose the kernel), **G** gazetteer, **F** features in view, **R** New random on the
  selection, **Esc** cancel, **ctrl / cmd+Z** undo, **ctrl / cmd+shift+Z** redo, **+ / −** zoom, **0** fit, **?** the
  keymap overlay. Bindings are active only while the map region has focus; an embedding host can switch global bindings
  off; every bound action is also on a menu or a button.
* **Accessibility** — the app's chrome (panels, dialogs, menus, toolbars, the report, the gazetteer, the tables editor)
  meets WCAG 2.2 level AA. Landmarks: header (title and seed), navigation (panels), main (the map region,
  `role="application"` with an accessible name and a live description of the view — rung, band, the district under the
  pointer or the focused entity), complementary (report, gazetteer). Every control's accessible name and description
  come from the control registry (its label and documentation anchor); every icon button has a text label. Every action
  is reachable by keyboard in a focus order that follows the layout, with visible focus and no keyboard trap; the map
  region takes arrow-key panning and **+ / −** zoom. **The non-visual route to the map** is the gazetteer (list and
  search over districts, quarters, streets, buildings, institutions and pinned people through `query`) and the "features
  in view" list (the entities whose marks are visible, grouped by kind, ordered by distance from the view centre, each
  announcing its name, kind and district); selecting in either list selects on the map and the reverse. UI text
  contrast ≥ 4.5 : 1 and UI components ≥ 3 : 1 (the map follows §8.2's contrast matrix); the reduced-motion preference
  turns off animated zoom; the UI scales 100–200 % without loss. Tests: §13.4.
* **Context help and the guide** — every control and panel carries a help link to its anchor in `@plat/docs` (§7.8's
  documentation anchor), opened in a side panel. The guide's reference pages are generated from the control registry
  (label, range, unit, output metric, consuming stage, locality class), the entity registry and the table schemas
  (columns, units, provenance); written pages cover getting started, each panel, each edit action, each export and the
  tables editor. Release notes are generated per release from the shift records (§13.3) and `known-defects.json` (id,
  symptom, affected rungs and presets, workaround, since, fixed-in). Tests: §13.2.
* **Family-tree view** (module tier, M4b) — reads `query(h, { kind: 'relations', person, up: n, down: m })` over the
  relation store (§10.3): generations in rows by birth epoch, partners side by side and children below; branches beyond
  two generations elided into a count that expands on click; re-root on any person; opening a person never pins it
  (§10.3); keyboard-operable as a tree grid.

**Extension points:** every `Map` in `StrategyRegistry` (stage 2 registers the three template fabrics; a village product
registers a tracker `NetworkStrategy`, a palisade `EnceinteStrategy`, a density `StageDecl` and a "houses along ways"
`FabricStrategy`; the owner-staged layers register `SkyStrategy`, `SewerStrategy` and `UndergroundStrategy`; the evolution engine an
`EvolutionStrategy`); `BuildingGenerator` (stage 3) and the default `PlanBuilder` behind its `plan` step (§2.6); `StageDecl` registration by declared inputs and outputs; the
`PaintProgram`, `StyleSheet` and `LiveLayerProvider` registries; `Exporter`s; rule tables, presets, rung profiles,
setting packs and keymaps (data); `EditEvent` kinds with migrations; `LayerSpec`s; `ContentProvider` (host rosters, after
the double-run check); `BridgeTransport` and `DocResolver`; the `PlacementSolver` and the `DesignationMutator` (§4.7 S10b, S11); `CorpusAdapter` (§13.9).

=== REPLACE ### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5 ===
### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5

Every acceptance letter carries its class: **[C] conformance** — it holds by construction once the rule is built, so it
proves the implementation follows the design and is never cited as evidence that an improvement was achieved; **[P]
parity** — compared with a measured reference number in `baselines.json` by §13.5's band rule; **[O] outcome** — it can
show that the result is better than the references, for a user or for realism. Thresholds without a reference source
have their numbers in §13.7. Every letter is stated here in full, stage-2 letters included — or, where another section
owns the letter's number, by a pointer to it: implementers read this matrix, never `docs/IMPROVEMENTS.md`, which is cited
for traceability only (§17.1 (1)).

**The first-weighted improvements (D-7) and the evidence their own rules cannot fake.**
* *Plot texture* (O5, O17, O18): §13.5's figure-ground and streetwall rows against MFCG's exports at the matched rung,
  with the intended direction of each difference declared; the plots, party-wall and MFCG street-signature rows; the
  within-district plot-area CV floor [P / O].
* *Editability* (O9, O16-core, O2 c): the thirteen MFCG asks as measured scenarios; locality outside the scope;
  faithfulness against from-scratch generations; carry-over rates of edited entities [O].
* *Legibility and charm*: the §13.6 protocol's legibility and charm questions; street-edge recoverability [O / P].
* *Realism*: the §13.6 protocol's realism question and the P rows of §13.5 — realism against real towns is the corpus
  phase's measurement (§13.7, §13.9), and this matrix makes no realism claim beyond those two.

| id | tier | mechanism in this design | acceptance (class of each letter) |
|---|---|---|---|
| O2 deterministic recipe | must | §6.1 keyed streams with the concern registry; §6.3 addresses and lineage; seeded decoration; epoch components | (a) identical model digest on two machines and three browsers, 100 % [O — FTG has no seed; VG drifts between builds]; (b) the scope of stability as §6.3 states it — grammar, decoration and block-reroll perturbations change 0 other entities [C]; (c) per parameter class: entities outside the stage-k closure byte-identical 100 %, the seam exception of §4.6 / II.4 excepted — computed by the oracle from the batches' commit records and checked (§7.3) [C]; edited entities kept or carried at §13.7's O2 (c) rates, measured at M3a with its fallback [O]; (d) addresses 100 % stable outside the scope on B-EDIT [C]; (e) stage-isolated goldens: only declared stages move (§13.3) [C] |
| O6 metric units, furniture, statistics | must | §2.1 cm + unit lint; §1.1 ladder; §9.5 furniture; §13.2 core statistics record | (a) 100 % of length fields carry a unit (lint) [C]; (b) ordinary-house footprint median 60–160 m², p95 < 400 m² [P — FTG 103 / 154 m²; MFCG's footprints are lots, descriptive only]; (c) scale bar and grid within 0.5 % [C]; (d) 100 % of generations emit the core statistics record with provenance, the bench metrics on demand (§13.2) [C] |
| O3 robust kernel, typed ladders, report | must | §3, §5 | (a) B-FUZZ on random inputs and constructive degeneracies: 0 crash / hang / invalid output [O — all four references crash or retry on degenerate input]; (b) hard invariant violations 0 / 1 000 cities [O]; "no restart path" is a design property, not an acceptance number (D-9); (c) B-EDIT 0 planarity violations [C]; (d) model time within §12.3's per-rung laws of the building count and its max clause, so the bars 100 ms / 300 ms / 1 s hold up to the sizes §12.3 states and are missed above them, a miss declared for the owner's veto (D-18) [P — MFCG at matched sizes, with §12.9's declared trade]; (e) identical digest across platforms [O]; (f) the seed never swapped; ladder uses ≤ 2 % of transactions, p99 ≤ 3 attempts [C]; (g) p95 per delivered town on the MFCG-worst configuration set ≤ 1.0 s against MFCG's 3.7–4.0 s (§13.5) [O] |
| O11 schema, registry, exports, API | must | §2 schema + registry with the CI path test, §11, §14 | (a) registry round-trip 100 %, no type missing from any path [C]; (b) containment 100 % [C]; (c) export → import → export identical [C]; (d) GeoJSON validates and loads in QGIS with districts [P — FTG omits districts]; (e) 0 dangling references [C]; (f) headless digest = UI digest [C]; (g) VTT grid 0 px [C]; (h) layered SVG separable and opening in Inkscape within 120 s at METROPOLIS [O] |
| O1 terrain and hydrology first | must | §4.2 S1 | (a) requested water features counted by delivery tier: tier-6 omissions 0, degraded ≤ 5 % (§13.7) [O — MFCG fails a requested river in 7 of 10 attempts at size 80]; (b) 0 non-monotonic beds; every river has an outfall; width never decreases downstream; every terrain cell has a defined flow path to an outfall (100 %); contours cross water 0 times [C]; (c) 10 / 10 configurations on 100 seeds each — coast, estuary, confluence, river island, lake shore, delta (distributaries), moat, island city, hill town, cliff or ravine [O]; (d) building ∩ water = 0 [O — MFCG's buildings over its river]; (e) the water stage linear in cell count, ≤ 5 ms at a 128²-cell equivalent and inside §12.4's S1 budget [P — VG 17–87 ms for one 128² village]; (f) site classifier ≥ 90 % [O]; (g) unused eligible land components 0 [C]; R11: river within the core when requested = 100 % [C] |
| O4 two-tier street network | must | §4.3, §4.4, §4.6 | (a) 100 % of through-roads reach destinations, bearings ± 10° [C]; (b) detour ≤ 1.4; junction p5 ≥ 30°; no turn cliff (10 m resampling); 4-way share per preset — organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % [P]; (c) width ~ betweenness [C]; (d) slope p95 within class [C]; (e) 0 edges below `minEdge` and 0 clearance violations [C]; (f) network + infill ≤ 100 ms at CITY with block statistics in the NG bands — the fusion gate, at M0 on a flat site and at M1 on river, coast and relief configurations [P]; the MFCG street signature inside the walls (§13.5) [P]; (g) N external connections exactly, island towns counting their shore landings [C]; (h) between-seed dispersion of the signature vector ≥ the larger of MFCG's and FTG's at the matched rung, from M1 [O] |
| O5 frontage-first plots | must | §4.7 S10 | (a) access edge 100 %, and every hidden plot reachable by a chain of access edges from a public way (§13.2 T30-1) [C]; (b) 0 plots < 3 m, wedges < 0.5 % [C]; (c) side walls ± 5° ≥ 90 % [C]; (d) typed coverage 100 %, discard ≤ 0.05 [C]; (e) plot and block distributions by §13.5's band rule [P]; (f) 0 self-intersecting, duplicate or doorless buildings — exactly one main entrance per building facing its street or court, side, rear and yard doors by §2.6's rules (§13.2 T29-1, T29-2) [O — FTG's hourglasses and ≈ 10 % doorless]; (g) streetwall gap ≤ 1 m [C]; streetwall continuity on dense frontages ≥ MFCG's at the matched rung [P] |
| O18 prosperity field + granularity law | must | §4.5 field; §4.7 S10 joins / splits / alleys; §4.6 deep interiors | (a) Spearman(prosperity, plot area) ≥ 0.8 and Spearman(prosperity, plots per ha) ≤ −0.8 [C]; (b) Moran's I of plot area > 0 [C]; (c) detached, yard, attached and coverage shares monotone in prosperity [C]; (d) alley length per ha ~ −prosperity (Spearman ≤ −0.7), 0 alleys below the class minimum, the dead-end share in band [C]; the court share of deep blocks within band per class [P]; the hidden-plot share per district within its band's target ± 0.03 (§13.7, T30-2) [C]; (e) access 100 % [C]; (f) institutions placed 100 %, never gives up [C]; (g) provenance, and the perturbation test ≥ 95 % outside; under a band change the wealth ladder's bars of §13.2 (T31-1 – T31-12) — no occupied building removed, a plot's geometry at or above its floor, granularity within the band's target after a re-cut [C]; (h) soft-seam jumps within §13.7's bands [O]; (i) a smooth field — §13.7's gradient threshold — whose edits replay [C]; (j) within-district plot-area CV ≥ 0.25 (§13.7) [O — FTG's 441 m² in every class]; (k) gap-width modes [C] |
| O17 plot model, site plans, heights | must | §2.5–§2.6, §4.7 S11, §8.4 | (a) coverage within the table [C]; (b) multi-footprint plots > 0 for institutions, manors, inns and farms [C]; (c) party-wall share by band, attached ≥ 90 % in dense bands [P — NG 39–43 %, 95–99 %]; (d) streetwall continuity ≥ MFCG's Lots mode, walled or fenced frontage counted [P]; (e) yards owned 100 % [C]; (f) footprints fit 100 % [C]; (g) heights on 100 %, shadow ∝ height r ≥ 0.99 [C]; (h) ≤ 5 µs per plot median for site plans (§12.4) [C]; (i) footprint hash identical across LOD [C]; (j) entrances and basements by §2.6's rules — no cellar under the flood band, every basement inside and smaller than its ground floor (§13.2 T29-3, T29-4) [C] |
| O7 content-first land use | must | §4.2 S2, §4.5 S7b, §4.7 S10b, §10.2 | (a) every building has a function and an occupancy (100 %); requested population ± 5 % on ≥ 95 % of seeds [O — MFCG's multiplier]; every person a home (100 %) [C]; every person a work or role (100 %) — a module letter, measured at M4b [C]; (b) hard relation rows satisfied 100 % and soft-row satisfaction ≥ 95 % reported per city — noxious trades downstream or extramural, water trades within 100 m of water, the market hall at a tier-1 junction or gate, inns at gates (§13.2 T16-1) [C]; (c) Moran's I (wealth) > 0 and monotone in the requested gradient [C]; (d) 0 constraint violations; per-capita ratio error against the tables reported; no occupation above its per-capita maximum [O — FTG's "20 adventurers" per 100 people]; (e) reconciliation ≤ 3 rounds [C]; (f) seam discontinuity within §13.7's bands [O]; (g) lazy people stable 100 %; opening a person writes nothing [C]; (h) gazetteer 100 % [C]; block-level use mix within §13.7's bands [O] |
| O19 greenery by prosperity | must | §4.9 rule table | §4.9's acceptance (a)–(g); classes: (a) [C — NG's 23–58 % at identical tags is the weakness]; (b) [C]; (c) [O — MFCG and NG green is leftover space]; (d) at §13.7's canopy threshold [O — FTG minimum 0.14 m]; (e) [P — VG P1; the frame budget is §12.7's]; (f) [C]; (g) at §13.7's city-zoom check [O] |
| O8 fortification network | must | §4.2 S3, §4.4, §4.8, §4.11 | (a) gates at 100 % of arterial crossings, count exact [C]; (b) 0 buildings in the setback band on both faces [C]; (c) tower spacing in band, 0 sawtooth [P — FTG 39 m]; (d) defensible-ground share; castle ≥ p80 among candidates [C]; castle area and compactness in MFCG's band [P]; (e) walled share in MFCG's band (§13.5) [P]; outer curtain on request [C]; (f) 4 / 4 circuit configurations, including two independent enceintes (polycentric nuclei, §4.2 S3) [O]; (g) wall → road keeps plot ids [C]; (h) the wall an entity in every export [C] |
| O12 display list, LOD, style as data, layers | must | §8 | (a) continuous zoom, footprint hash identical per LOD, minimum drawn feature ≥ 2 px, labels above §9.4's floors at every level, no feature pops more than once [O — MFCG has no zoom]; (b) pan and zoom ≥ 60 fps at 40 000 buildings and 200 000 trees on the reference machine and ≥ 30 fps on the low-end device; edit-to-redraw < 100 ms; roof computations per frame after warm-up = 0; ≤ 80 draw calls per tile (≤ 80 × P per view) and ≤ 4 uploads per frame during gestures, every ready tile at first paint and settle (§12.5) [P — NG 528 uploads per hood; FTG's roofs recomputed every render]; (c) screen = PNG = SVG within threshold, 0 silent couplings [C]; (d) glyph ambiguity 0, legend 100 %, every visible feature hit-testable [C]; (e) 300 dpi A2 [O]; (f) §8.2's contrast matrix on the rendered city band [C]; (g) first map by §12.5's laws of the building count, the miss above its knee declared for the owner's veto [P]; street-edge recoverability ≥ MFCG − 0.03 (§8.5) [P] |
| O9 persistent document, locks, regeneration, undo | must | §2.9, §7 | (a) save / load / save identical [C]; (b) locked preserved 100 %; outside the effective scope byte-identical (§7.3 item 7 ii) [C]; (c) faithfulness = §7.3 item 7 (iv): Regenerate (keep settings) byte-identical [C]; New random judged by §13.2's calibrated rank campaign, whose design and executed calibration are stated there [O — FTG's "too snug" regeneration]; (d) every operation undoable (enumeration test) [C]; (e) an upgrade keeps 100 % of edited entities or reports each orphan [O — FTG cannot regenerate old towns]; (f) the thirteen MFCG edit asks of §7.4 as scripted B-EDIT scenarios, each reporting its locality share, invariants and re-run cost (§13.2) [O — MFCG: "no way to save those changes"] |
| O16-core report and honest controls | must | §5.4, §7.1, §7.8 | (a) report 100 %; the requested-vs-built diff and every requested feature's delivery tier shown when non-empty [O — MFCG's 28 silent street failures]; (b) auto-resolved values reported 100 % [C]; (d) hidden couplings 0 [C]; (f) every numeric control monotone and continuous by §7.8's statistical rule [C]; (h) seed → map identity 100 % [C] |
| O13-core labels and names | must | §9, §10.4 | (a) 0 protected overlaps, 0 collisions, inside ≥ 99 %, curvature within §13.7's limit, 0 labels crossing holes [O — MFCG covers gates and the keep]; quarter labels at MFCG's count at matched sizes [P]; (c) name–feature consistency 100 % within 250 m [C]; (e) edited names persist 100 % [C] |
| O14-core hinterland and margin | must | §4.9 | (a) farmland per capita ± 20 % [C]; (b) field access 100 %; every farmstead within 300 m of one of its fields and 1 500 m of all; land-use overlaps 0; unused components 0 [C]; (d) roads leave to destinations 100 %, rivers enter and exit [C]; (e) built / map area 0.06–0.25 at every rung (§13.7) [O — FTG's fixed canvas per class]; (f) woods sized to the fuel and timber rows with the import share reported, the farmland mode by size and landscape (§13.2 T26-1, T26-2) [C] |
| O10 intent, constraints, assignment, forms | should (input schema + drift bounds: must hook) | §7.7 | (a) 10 / 10 scripted intent tasks without URL editing [O]; (b) hard targets 100 %, achieved-vs-requested reported [C]; (c) monotonicity [C]; (d) pins 100 % [C]; (e) assignments ≥ 99 % within drift, placed by the one solver under the hard relation rows, infeasibility reported with the nearest count and the closest options (§13.2 T16-1, T16-3) [C]; (f) size error p90 ≤ 10 % [C]; (g) the forms classifier ≥ 90 % over the forms catalogue, `linear-street`, `island-city` and `twin-town` included [C]; (h) edited tables versioned, default path byte-identical [C]; (i) the dossier contract — a map delete of a dossier-backed element re-placed from the same seed, a dossier change mutating the map that exists, one history one digest (§13.2 T20-1 – T22-4) [O — no reference has a host contract] |
| O13 full (street names, addresses, annotation) | should | §9 | (b) ≥ 90 % of named streets labelled at neighbourhood LOD [O — no reference names its streets]; (d) 0 spelling errors [C]; (f) annotation layer [C]; (g) addresses 100 % [C] |
| O14 full (rings, presets, wildness, feasibility) | should | §4.9 | (c) wood-edge straightness median ≤ 0.90, canopy monotone in wildness (§13.7) [O — VG's "Some" ≈ "Many"]; (f) ≥ 95 % of the map land-classed [C]; (g) scatter statistics [P] |
| O16 full (thumbnails, drafts, discoverability, responsive, accessible) | should | §7.8 (S0–S4 proxy thumbnails, G-R4), `@plat/app` (§14) | (c) the scripted tasks of §13.4, each in one action where a reference needs a detour, every response ≤ 1 s (replaces "≥ 90 % of testers") [O]; (e) six thumbnails < 1 s at TOWN [P]; (g) editor usable at 768 px [C]; the accessibility contract (§14, §13.4) [C] |
| O12 extras (relief tier, tiled export, low-end tier) | should | §8.2 relief tier; §8.8 tiled export; the low tier (§12) | as O12 (b), (e); the relief tier renders at every rung and is off by default [C] |
| O7 simulation module | should | §10.1, §10.3 `@plat/sim` (M4b) | the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported; every person a work or role (100 %); the economy and personality content of D-32 derived deterministically from its keys [C] |
| O11 extras (VTT native, per-layer, binary, 3-D, GIS profile) | should | §11 | (g), (h); format validators, CityJSON's included [C] |
| O9 extras (upgrade replay with diff) | should | §7.5, §6.4 retention | the upgrade test; goldens replay under N−1 and N−2 [C] |
| O2 / O6 extras (golden suite, calibration interface) | should | §13.3, §7.6, §13.9 | the declared-shift protocol in CI from M1; every table value replaceable with provenance; the corpus interface of §13.9 present [C] |
| hooks 1–8 (§5.4) | must | 1 addresses + sub-seeds §6.3 / §6.1; 2 lifecycle + edit log + incremental pipeline + conversions — the decline ladders, the use step, the wealth ladder with its floor, the terrain-water and passage kinds §2.8 / §7 / §4.11; 3 assignment input + the one placement solver and the designation mutator + the dossier contract §7.7 / §4.7 S10b, S11; 4 context vector + rules as data §2.5 / §7.6; 5 building-generator interface (`outline` / `compose` / `plan`) + heights + the entrance set and basement + shadow hook §2.6 / §8.4; 6 layers + drainage + any-boundary neighbourhood + island outlines + the island rule, the sewer tier rows and the underground arena's hooks §2.1 / §2.3 / PART II / II.6 / II.7 / §4.2; 7 editable versioned tables + preference layer + the emulation marker and parity presets §7.6; 8 circumstances timeline + stored editable field + the built band and geometry floor §7.7 / §4.5 / §4.11 | every hook field declared in the schema of every entity type and populated when used (registry test, 100 %) [C]; zero cost when unused — with every hook unused, the one-click model time and document size equal a build with the hook fields removed within 2 % (a CI comparison) [C] |
| S1 boundary and seam contract | STAGE-2 (must in base) | §2.5 `SeamContract` from M1, §4.12, PART II | 100 % of districts carry a complete contract; portals 100 %; misalignment 0; Hausdorff 0 for shared entities [C]; at M1 the check is schema completeness only (the field is flat until M2b, so its samples are constants) [C] |
| S3 seam-continuous fields | STAGE-2 (must in base) | §4.5 fields with `hard` flags per seam edge | Δ frontage, area and storeys within §13.7's bands on soft seams [O — NG's hoods cannot share a street] |
| S2 context features inside the neighbourhood | STAGE-2 | II.1 (the request's context), II.3 (context features as constraints), §4.8 water furniture, §4.4 intervallum | (a) a context coverage matrix — district context (waterfront, wall-side, slope, bridgehead, gate approach, sky) × generated feature — with no empty cell: every waterfront district has a quay or bank path, every wall-side district an intervallum or a rear-plot rule [C]; (b) 0 buildings in water; bridges within ± 10° of the channel normal [C]; (c) 0 fragments cut at the close-up frame — the surroundings continue at lower LOD to the frame [C]; (d) S2's blind preference test, run as §13.6's protocol against NG at M5 with the owner as the declared rater [O] |
| S4 composable context templates, functional squares, landmark-centred neighbourhoods | STAGE-2 | II.2 template fabrics, II.3 dispatch table, §4.7 claims, §2.6 footprint templates | (a) every base district kind has ≥ 1 template [C]; (b) the templates' morphologies are separable by generated statistics — a nearest-centroid classifier over §7.7's signature vector, computed per district, assigns ≥ 90 % of template districts to their template [C]; (c) ≥ 90 % of squares on a tier-1 junction or in front of a landmark [C]; (d) typed-square area per 1 000 inhabitants within §13.7's band [C]; (e) a requested landmark delivered ≥ 99 % [C]; (f) rule satisfaction ≥ 95 % [C] |
| S5 NG-class close-up render tier | STAGE-2 | II.4, §8.2 `hatched`, §8.6, §8.4 shadow pass | (a) opening one district at neighbourhood LOD ≤ NG's 10–96 ms at comparable building counts [P]; (b) generation ≤ NG's 64–75 µs and rendering ≤ ≈ 85 µs per building [P]; (c) draw operations per frame and uploads within §12.5's budgets, against NG's 528 uploads per hood and 55–80 % hatch share of operations [P]; (d) the `hatched` style regression — per-wing operation mix and the roof colour law (§8.3) [P]; (e) shadow length ∝ stored height, r ≥ 0.99 [C]; (f) footprint hash identical to the city LOD [C]; (g) city-zoom legibility unchanged with the tier on (B-ZOOM) [C] |
| S6 stage-2 workflow | STAGE-2 | II.4 workflow, §7.1 named actions, §6.1 per-district streams | (a) five variants of one template in five actions, where NG needs a tags dialog or a URL detour [O]; (b) the default path one action with p95 ≤ 0.5 s for a medium neighbourhood [P — NG]; (c) rerolling one district or block leaves 100 % of entities outside it identical in address and geometry, the seam exception of II.4 excepted [C]; (d) addresses, names and footprints preserved across levels, 100 % [C]; (e) 0 hand-offs to another tool [C] |

=== REPLACE ## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 ===
## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at five seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b) and
stage 2 (M5). Effort is stated honestly as a range with its basis: about 165–219 expert person-weeks (153–204 before
amendments b; J-A16.01). The subjects the
owner's roadmap puts later are listed in *Staged by the owner's roadmap*; nothing else is out of scope.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 83–110 calendar weeks
at that staffing; staffing per the owner (architecture and rulings on Fable seats; build, verify and measure on Opus
seats). Every milestone ends on executed evidence, never on intention, and every exit writes its `MilestoneRecord`
with the milestone's declared shifts and fails on an undeclared one (§13.3). **The owner's panel at every gating exit:**
M2b ("the base at parity"), M4 ("mastered") and M5 (the stage-2 gate) claim their D-5 verdict only by a rated pass of
§13.6's protocol or by the owner's acceptance recorded in the `D5Record`; an unrated panel follows §13.6 (7) — the build
continues, the milestone's status is *provisional — not rated*, the claim is not made and the panel is offered again.

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal; **the MFCG sweep at five seeds per matched size** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza, and every ⟨M-1⟩ number of §13.5 — streetwall continuity on dense frontages, lots per block, T / Y share, intramural dead ends, blocks per ha, inner-lot removal and street-edge recoverability on its plain renders (the metric of §8.5, implemented research-side and cross-checked against the product's implementation on M1's golden renders within 0.01); **FTG captures at BIG_TOWN and BIG_CITY**, three of each — one with FTG's water options nearest to `none` and two nearest to `coast+river`, each capture's id (its folder name), `WaterSetting` and recorded population (the residents its decoded payload holds) recorded in its README for §13.6 (2)'s pairs — over six days on the free daily allowance, decoded with the existing tools; outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload; NG block counts per template at `medium` from the vertex captures; the variety dispersions of MFCG and FTG; **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (§17.1) | every §13.5 baseline row present with its provenance — or, for an ⟨M-1⟩ number M-1 could not measure, the row made descriptive and entered in `known-defects.json` by §13.5's ⟨M-1⟩ rule — and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded, each with its resident count or §13.6 (2)'s nominal fallback, marked; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits | 2–3 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit, calibrated on NG's vertex captures after NG's signature is re-measured on curved, round-joined, triangular, C-shaped and holed faces; (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1; S11's geometry share ≤ 3 µs per plot median; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-order determinism (§13.2); (b) start position σ within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, block-area and cut-length KS by the band rule — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b), at all three rungs (§1.1: METROPOLIS is in the goldens, B-CITY, the determinism tests and the diagnostic panel; M2b measures and tunes it); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; **the `.plat` writer and reader for generated towns** (§2.9, §3.9) — the manifest, the content-addressed chunks with §3.9's geometry layout, gzip compression and an empty log — which the document-size test and the *preview* documents need and M2a's log builds on: a saved town of the running output version opens by decoding its snapshot and comparing its recomputed root with `model.digest` (M0's full recomputation), a differing root loading as a corrupt cache by regeneration from the recipe (§2.9 steps 3 and 5); **a document whose `outputVersion` is not the running one is never root-checked: it opens as §2.9 step 2's frozen view — each chunk checked by its content hash, the state decoded for view and export only, labelled "made with oK; not verified by this version" — with the offer to open its recipe under the running version and §6.4's preview notice; the `frozenImport` rebase arrives with M3a's rebases**; the records digest joins the snapshot at M2a, whose reader opens an M1 document of the running output version, which lacks it, by the same regeneration (§2.9 step 5); permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (§13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items:** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw); **amendments b at M1:** the transient arena's open, read-back and release (§3.4), `RungProfile.layers` with `Features.sewers` resolved at S0 (§1.1, II.7.1), the emulation marker on every default cell and the parity presets `MFCG` / `FTG` (§7.6) (≈ 1 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (§12.3's rule for which configuration is primary at each size — its p95 within the pooled law + 10 % at the band's bottom, target and top, below a single worker's on the same generations, digests identical for pool sizes 0–3 on 200 seeds — with that rule's pre-decided outcomes); the label-composition measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's; the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY) and the generated-town round trip — save → load → save byte-identical over the canonical form on B-CITY-lite's towns (§2.9); **a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message**; the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the model max clause at TOWN and CITY, judged on confirmed outliers (§12.3); the furniture and snap query round trip (§8.9); the sliced-raster census rows (§8.3); the pan-and-zoom run during an A2 export (§8.9, §12.7); the stamp-tile asset load (§8.10, §12.7); the stamp tiles' seam check (§8.3); the sliced-placement census row, and the export's placement stepped in class 4 during the pan-and-zoom export run (§8.3, §8.9); the pin-pass B-ZOOM fixture (§9.2); the harbour pick's measurement on B-CITY walled coastal seeds — p99 of harbour route ÷ the least-cost path with the wall ignored ≤ 1.5, and if it fails the detour guard becomes the default (§4.2 S3 (4), (7)); the SVG export's transient-list peak (§12.8); memory within §12.8's lines at TOWN and CITY on generated towns at pool sizes 0 and 3 (the load-verification case is M2a's); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7); of amendments b's bars (§13.2): T13-1, T14-1's TOWN `off` and below-TOWN cases, T23-1's registry test | 36–47 pw |
| **M2a — the editing core** (D-7: before the second preset) | the log and the one replay fold over M1's document format; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); per-document sessions (§7.4); load verification over M1's reader — the load's recomputation of the decoded state's own digest and of its records digest before its first edit, then edits applied at once during load verification with both mismatch choices (§2.9 steps 3–4); **with the keep, §6.4's link rule that the base is the recipe, with its message — a link is emitted only for a town that rule and §6.4's log rules allow, and a rebased town, a kept saved town included, is offered as its `.plat` file**; replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which measures it); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 %; open-to-editable within T(B) at TOWN and CITY, and the corrupt-cache fixture — a snapshot with one moved footprint and an unchanged `model.digest` reported and loaded by replay, never verified (§2.9 step 3); the records-mismatch fixture and the §6.2 (iii) keep-and-save gating fixture (§13.2); **a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)**; on the reference 300-edit CITY document, an edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms with pool size ≥ 1 (§2.9 step 3); memory at CITY while that document is load-verified, with a district regeneration and a Re-derive from S3 applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied; the rebased-document size test — a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased document, or §2.9's block-group fallback applied | 9–12 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs (§8.2); the relief tier; METROPOLIS measured and tuned, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw); **amendments b at M2b:** the designation templates with specialisation and the one placement solver at generation with its relation rules and supply edges (§4.7 S10b, S11), the default band set with the shanty rule and its median-household band (§4.5), the entrance set and the basement decision (§2.6), exposure, the hidden-share rows and passages with the arch glyph (§4.6, §8.3), N markets with the principal-market score (§4.2), FTG's hinterland order and modes with the fuel and wood rows (§4.9) (≈ 3–4 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS; B-ZOOM role continuity across every band switch of `ink` and `lit`; O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the pool rule, the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9); open-to-editable within T(B) and memory within §12.8's line at METROPOLIS (§2.9 step 3, §12.8); the moving-sun step budget (§8.4); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the `lit` export beside a moving `path` sun (§12.7); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: *provisional — not rated*, and "the base at parity" is not claimed; of amendments b's bars (§13.2): T16-1, T16-2, T16-4, T19-1 – T19-4, T24-1 – T24-3, T26-1 – T26-3, T27-1, T27-2, T29-1 – T29-4, T30-1, T30-2, T30-4, and §13.7's item-24 and item-30 thresholds confirmed or their fallbacks applied | 36–46 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3), the water operator in §4.11's order with course-knot edits (§7.3 (b)); point-anchored records under a warp (§7.4); the carve edit with §4.11's way rule and the kernel's clear regions (§3.3); the `packs` block and the pack and host-content link refusals (§2.9, §6.4); the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4)) with their renames stored in the events and carried by `confirm`, the dormant naming record of a protected name and field slices; the version-pinned checks of a rebased base across an upgrade and of a frozen view; packs held by a saved redo stack and packs a new version stops shipping; GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools; **amendments b at M3a:** assignments through the solver after generation, the designation mutator with its record and inverse, `Use` with hand relocation (§4.7, §4.11), the dossier contract — dossier-backed existence, rejection, positive placement, the disruption budget and report (§7.7) — the wealth-ladder edit kinds `relet`, `densify`, `thin` and fusion and splitting as least-disruption re-cuts (§7.1), sealing and opening a passage and the terrain-water conversions applied by hand; the plan rung's base hooks — its records, its `elaborate` view key, its `plan.*` concerns, its events and rung re-rolls, the elaboration cache (§2.6 beside §2.8's record, §2.9's cache, §6.1's streams and §7.1's events) (≈ 6–7 pw) | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 item 7 (v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; the carve fixtures of §13.1–§13.2 (§3.3's clear regions), or §3.3's pre-decided fallback applied before exit; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them, and one forced load mismatch settled by an owner's keep of the saved town while two editors edit on the replayed town — one digest, 0 lost accepted events; §11.3, §2.9 step 4); the naming-input fixtures of §13.2, in a fresh and in a rebased document (§6.3 case (4)); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; a kept-and-rebased CITY document upgraded across a field-driver change opens editable and replays to the session's digest, and a frozen o(N−3) fixture shows no mismatch message; a document using a pack the new version stops shipping reopens after `from` leaves the window; GeoJSON loads in QGIS with districts; the GeoJSON with trees byte-identical on the five engines (§13.3); the warp cost measurement — a 150 m brush over a CITY core on B-CITY-lite seeds, Apply within §12.6's budget with §2.6's wing carry and check counted, or §12.6's pre-decided fallback (one check after the final step, F-REDERIVE for a failure) applied before exit; of amendments b's bars (§13.2): T16-3, T17-1 – T17-3, T18-1 – T18-4, T20-1 – T20-4, T22-1 – T22-4, T25-1, T28-9 – T28-12, T30-3, T31-1, T31-4 – T31-7 | 22–27 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2); the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1) | 16–21 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit; **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`; §4.11, D-25); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (§13.6 (8)); **amendments b at M4:** the staged engines' hooks — the decline table, the salvage ledger and the dwell lag, the tunnel and island conversion kinds, the terrain-water kinds, the due mark and the wealth ladder table, the floor's attributes with their migration, the lapse of a rejection at an epoch — with their hook tests (§4.11, II.6 and II.7, with the migration of §7.5) (≈ 2–3 pw) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets (§13.2); METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people; "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release; every table value replaceable with provenance; of amendments b's bars (§13.2): T8-1 – T8-7, T10-1, T11-1, T12-1, T15-1, T31-2, T31-3, T31-8 – T31-12 | 13–19 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (§15.2); one hour for 50 000 people ≤ 50 ms (§12.7); a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` family at all four bands (§8.2); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (twenty pairs over the four templates, §13.6 (2)) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated | 14–18 pw |

**Effort, with its basis (D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 11–15 | neither reference has it; amendments b: the `Use` record and hand relocation, the plan rung's base hooks, the wealth-ladder edit kinds (+2) |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 4–6 | one drawing path; no second backend |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 5–7 | §11 |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 9–14 | new in both references; amendments b: the designation templates and the compatibility table, the band set, the entrance set and basements, exposure, the hidden shares and passages (+2–3) |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 8–11 | forms tuned by eye and the D-5 panel; amendments b: the one placement solver with its relation and supply data, the designation mutator, the dossier contract (+4–5) |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 5–7 | §15.2 should rows; amendments b: FTG's farmland modes, the fuel and timber rows, the arable reserve (+1) |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 9–13 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols; amendments b: the parity presets and the marker on every default cell, the relation templates', room programmes' and interior ladder's rows (+1) |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 7–10 | no reference line covers it |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 8–11 | §13; amendments b: the hook, B-PLAN and underground fixtures and the parity-preset run (+1) |
| mechanisms the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine; the six components below) | 9–13 | 5–7 for the first group; 3–4 (≈ 14–22 working days) for the six components itemised below; amendments b: the transient arena and the M4 hooks (+1–2) |
| **base subtotal (M-1 – M4b)** | **151–201** | 139–186 before amendments b |
| stage 2 (M5) | 14–18 | |
| **total** | **165–219** | equal to the milestone sum above; 153–204 before amendments b (J-A16.01) |

**The six new components** priced by the last line's 3–4 pw (≈ 14–22 working days; PLAUSIBLE): the per-name naming
records and the renames an edit confirms (§2.8, §6.3, §7.1; M1 writes the records, M3a stores the renames), ≈ 3–4
days; `carryWings`, the carry of a stored composition and the wing check decided by pairing (§2.6; M1 in generation,
M3a under warps), ≈ 4–6; crossing sites as a `Bridge` in state `site` and their handling in S1's water operator (§2.7,
§7.3 (b); M1 and M3a), ≈ 2–3; resumable raster jobs, S13b as a resumable placement job and the tile worker's four-class
queue (§8.9, §9.2; M1), ≈ 3–5; the records digest (§6.2; M2a), ≈ 1–2; the shipped stamp-tile asset, with its shared
seam band, and its build tool `plat/tools/stamptiles/` (§8.10; M1), ≈ 1–2 days. The other mechanisms of the same kind
are refinements a line already prices, absorbed by that line (PLAUSIBLE): the load's digest recomputation, its
corrupt-cache path, the version-pinned root checks and the keep-and-save gating (the O9 line's load verification); the
pack held by a saved redo, the pack copy at an upgrade and the link refusal for a kept town (the O9 line's retention and
migration); demotion, `StretchRef`, tombstones per partition, the water-gate hold and the deck strip (the parity floors'
kernel share and the arrangement work); the forced harbour pick and the detour guard (the parity floors' gates and
harbour); the pin pass (the label placement engine); and the integer-centimetre tree positions with their lint, the
PNG row-filter rule and the quantised light steps with their light pass (the O12 renderer and O11 export lines). The
milestone rows carry the six components where they are built — M1 + 2 / + 3 pw, M3a + 1 / + 1, M2a unchanged — so they
sum to the total. **A pass that adds build work prices it here:** it names each new mechanism with the line that
absorbs it, or widens a line by an itemised amount and keeps the milestone rows equal to the total. **Amendments b (2026-09-25 to 27)
are priced that way (J-A16.01):** +12–15 pw itemised in the lines above — O10 +4–5, O17 + O18 + O19 +2–3, O9 +2, the
should-have tiers +1, the content line +1, the rig +1, the unpriced line +1–2 — carried by the milestone rows M1 +1 / +1,
M2b +3 / +4, M3a +6 / +7 and M4 +2 / +3, so the rows still sum to the total; the staged engines themselves — evolution,
the sewer and underground stages, the plan rung, SettlementForge's mapping — are not priced, by the roadmap.

The cuts that would shrink the total are recorded for the owner's veto, not applied (J-S6, D-20): the module M4b
(8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the should-have
"full" tiers (5–7 pw) — together a base of ≈ 133–172 pw and a total of ≈ 147–190 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a; §3.7's pre-decided fallback); the straight
skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's re-pricing is the warning);
the thin CITY budget headroom (§12); the D-5 protocol's dependence on the owner's time (§13.6 (7) answers it: an
unrated panel never stops the build and never lets a gate be claimed).

**Staged by the owner:** the subjects the owner's roadmap places after the base — stage 2 at M5 above, the others staged
by the owner — each with concrete hooks, are the one list in *Staged by the owner's roadmap*; nothing else is out of
scope — CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted service (§11.5),
setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier is a base program (§8.2); amendments b's staged engines — the evolution engine's trigger and durations, the
sewer and underground stages, the plan rung and SettlementForge's dossier mapping — are on that list, their hooks priced above.

=== REPLACE ### 17.1 The clean-room chain (IMP-1; D-29) ===
### 17.1 The clean-room chain (IMP-1; D-29)

1. **Who reads what.** *Research seats* (readers, measurers, the digest writer) may read the findings, `captures/`,
   `research/` and — under the standing ruling — `reference/`. *Implementer seats* (anyone writing code, tables, style
   sheets, content, assets or tests in `plat/`) read only `docs/ARCHITECTURE.md`, the implementer digest in
   `plat/docs/digest/`, the `plat/` repository, published algorithm papers and the public documentation of adopted
   libraries; they never open `research/`, `captures/`, `reference/`, the findings, the critics, `docs/confidence/`,
   `docs/improvements/`, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` or the red-team files. The citations in this
   document are for traceability; an implementer follows them only into the digest. No code from TownGeneratorOS
   (GPL-3), the FTG Foundry module or any captured bundle is read for implementation, ported or paraphrased. The owner's 2026-09-25 intent to license the module GPL-3, under which
   TownGeneratorOS's code would have become licence-compatible and consultable, was withdrawn on 2026-09-27: the module
   stays private (§17.3, D-22), and TownGeneratorOS is an idea source only, its ideas reaching implementers through the
   digest like every other reference's (J-A21.01).
2. **The implementer digest.** A digest seat writes `plat/docs/digest/` from the research: behaviours, measured numbers
   (each with its `baselines.json` id or finding reference) and the creators' stated ideas — no code excerpts, no
   reference word lists, grammars, palettes, tables or identifiers. A separate checker seat, which reads only the digest,
   runs the content scan of (5) on it and files a report with it; every change to the digest repeats the check. This
   document is held to the same rule. The hashed scan of (5) needs the deny-list that M-1 builds, so until then **every
   seat that writes this document — a fix-all integration seat, an amendment pass's apply and repair lanes, any
   finishing or repair seat — runs, before its change lands,** the scripted document checks of
   `docs/validation/bench/doc_checks.py`, from the project root:
   `python3 docs/validation/bench/doc_checks.py --sections "⟨every section heading key the change touched⟩"` — the
   content checks (iii) and (vi) over the sections the change touched, the others over the whole document (J-S32):
   (i) *identifiers* — a whole-word, case-sensitive search for the backticked identifiers of
   `research/findings/ftg-payload-visual.md` §7.2 and one further time-setting message name — 36 names, which the script
   reads from the finding or holds research-side, so none is copied into this document;
   (ii) *colours* — every six-digit colour value of the document (`#rrggbb` or `0xrrggbb`) looked up, case-insensitive
   and hex-delimited, in `research/` (its text files, JSON included), `captures/**/README*.md`, `captures/**/*.json`,
   `docs/confidence/`, `docs/improvements/`, `docs/CONFIDENCE.md` and `docs/IMPROVEMENTS.md`;
   (iii) *token 3-grams* — the lower-cased word tokens of the changed sections against every 3-gram of
   `research/findings/*.md` and of the string keys and values of every JSON file under `research/` and `captures/` —
   FTG's content database and every capture body included — taken in document order with purely numeric tokens dropped;
   a hit is a run of three or more consecutive shared 3-grams (five or more tokens in a row that also stand together in
   a finding or a capture) — the size at which a copied list, table row, grammar line or palette shows, while a single
   shared 3-gram ("per 100 m") is ordinary phrasing;
   (iv) *tables* — outside fenced code (a fence may be indented, as inside a list item) every line that starts with `|`
   ends with `|`, no other line sits between two table lines (a table row split over several lines renders as broken
   rows), and every row has its header's number of cells, counting only unescaped pipes (GitHub-flavoured Markdown splits
   a cell at every unescaped `|`, inside a code span too, and drops the cells beyond the header's count, so inside a table
   a pipe in code is written `\|`, which the renderer shows as `|`);
   (v) *pointers* — every `§n` and `§n.m` pointer resolves to a heading of this document;
   (vi) *lists, in any order* (J-S35) — a 3-gram needs the list's order, so a list pasted alphabetised shares none with
   its source: every JSON file under `research/` and `captures/` except the profiler's recordings (call censuses,
   coverage, idle, trace, draw and path records, run reports, metadata, session and index files — code identifiers and
   events, which (i) and (iii) cover) is read for its lists — a dict's keys, an array of strings, one field's string
   values across three or more records — and a hit is a line of the changed sections holding five or more distinct
   whole words of four or more letters that are members of one such list, reported as those words, sorted.
   Each hit is corrected before the change lands or reviewed: a reviewed hit is entered in
   `docs/validation/doc-checks-allow.tsv` with its check, its exact text and a written reason (a capture-citation file
   name, a measured number, a creator's sentence under 15 words quoted for traceability, ordinary phrasing, generic
   vocabulary in our own selection and order, a pointer into another document). The script exits non-zero while any hit
   is unreviewed, the change does not land until it exits zero, and the seat records its counts in its output file (a
   fix-all pass in its integration log, an amendment pass in `docs/validation/amendments-applied.md` and
   `amendments-repair.md`). From M-1 the hashed scan of (5) — whose list sets do (vi)'s work on salted digests — also
   runs over this document and replaces (i)–(iii) and (vi); (iv) and (v) stay. The checks' executed calibration is
   recorded in `docs/validation/bench/fixall_scope_r4_cleanroom.out` and `fixall_scope_r5_checks.out` (history:
   `docs/ARCHITECTURE-RATIONALE.md`).
3. **The repository boundary.** The product is its own repository, `plat/`, at the root of this folder, outside
   `research/`, `captures/` and `reference/`. A PR-tier CI rule fails any import specifier, fixture path, script path or
   build input that resolves outside `plat/` (symbolic links resolved). The product's CI never reads the research trees.
4. **Reference numbers only through committed numbers-only files.** Research-side scripts (`research/baselines/`)
   measure the captures and write numbers with provenance (§13.5's `Baseline` rows); the file, `baselines.json`, is
   committed into `plat/packages/testkit/baselines/`, and the parity CLI reads only it. The D-5 panel is assembled
   research-side from the product's PNG exports and the capture images (§13.6); its inputs to the product are three files
   committed the same way into `plat/goldens/d5/⟨milestone⟩/`: `ftg-captures.json` (capture ids, rungs, water settings,
   resident counts) and `ng-counts.json` (NG hoods' building counts), numbers only, which `plat d5 seeds` reads and
   nothing else, and the sitting's `record.json` — numbers, hashes and the owner's answers, no reference image or
   reference data (§13.6 (9)) — which the milestone record and the release notes read.
5. **The content scan.** Research-side, `research/baselines/make_denylist.py` builds the deny-list from the creative
   data the findings and captures record — the references' naming-grammar rule names and terminal words, Markov and
   corpus sample words, palette colour values, FTG's building-type, profession, item and service identifiers and names,
   FTG's Foundry-module message and field names, and texture and image file hashes. The list holds only salted SHA-256
   digests: of single normalised tokens (lower-cased, diacritics stripped) that are not in the spell-check word list
   §9.6 already needs, of token 3-grams in list order (so a copied table is caught even when every word in it is
   ordinary), of exact six-digit colour values, of file bytes, and — for every list the findings and captures record (a
   dict's keys, an array of strings, one field's values across records) — the set of salted digests of its members'
   words of four or more letters, so a list copied in another order is still found (J-S36). `@plat/testkit`'s clean-room
   scanner digests the same way every token of `@plat/tables`, assets, source string literals and comments and the
   digest, in the PR tier, and flags as a list hit any line, or any column of a table, that holds five or more distinct
   words of one list's set; a hit fails the build unless an allow entry with a written reason is reviewed and added — an
   authored roster that shares ordinary building or trade names with a reference list is such an entry, and the review
   decides whether the selection was copied. At every milestone the checker seat also runs a research-side palette
   audit: a shipped palette with three or more colours within ΔE2000 2 of one reference palette fails and is redesigned.
   Every file in `plat/assets` names the script that generated it or its third-party licence (fonts); a file with
   neither fails the build.
6. **Honest provenance.** Every table cell's provenance names where its number came from: `own`, `ref:⟨reference⟩
   ⟨behaviour⟩` (a measured or stated behaviour of a reference, admissible as a calibration anchor — for example the
   castle's 0.75 compactness gate (MFCG), 40 m bridge spacing and 39 m tower spacing (FTG), NG's lane-width law, Poisson
   k = 50), `owner`, `owner-eye ⟨milestone⟩`, `architecture ⟨date⟩`, `corpus` or `host`. A default cell that emulates a reference's behaviour carries `ref:⟨reference⟩ ⟨behaviour⟩` as its
   source — `ref:FTG lifestyle distribution`, `ref:FTG shanty rule`, `ref:FTG farmland modes`, `ref:MFCG gate law` — and a cell
   that extends the references carries §7.6's `extension` marker beside its source (item 23): the two together tell an
   emulated default from our own tendency, which is what the parity presets switch off (§7.6, §13.2 T23-1). A number that describes a
   behaviour is a fact; a list, grammar, palette or table is creative content and is never reused.
7. **The record.** `plat/docs/CLEAN-ROOM.md` holds the rule, the seat ledger (which seat read which research file, from
   the lane logs), the digest checker's reports and the deny-list's generation record (date, sources, counts — never the
   tokens).
8. **Sources of algorithms.** Published: Shewchuk predicates; snap rounding (Hobby; Guibas–Marimont; Hershberger);
   arrangement booleans by winding number; Bridson Poisson-disc; Felkel–Obdržálek and Aichholzer straight skeletons;
   Chaikin; Visvalingam–Whyatt; Parish–Müller growth; Lloyd relaxation; marching squares; priority-flood;
   Garbrecht–Martz flat resolution; fBm, with ridged multifractal noise and domain warping (Musgrave, in Ebert et al.,
   *Texturing and Modeling*, 3rd ed. 2003; §3.1); the xoshiro128\*\* generator (Blackman–Vigna, public domain; §6.1) with
   Irwin–Hall sums for its normal draws; MurmurHash3's x86 128-bit hash and its 32-bit finaliser (Appleby, public
   domain; H128 in §6.2, `RH32` in §8.1, `H32` in §13.6), checked against the SMHasher verification values; Krüger's
   transverse Mercator series in Karney's formulation, to fourth order in the third flattening (Krüger 1912; Karney
   2011; §11.1); the van der Corput radical inverse and Morton (Z-order) bit interleaving for §8.10's progressive grid
   ranks; Ulichney's void-and-cluster ranking (1993; §8.10); the monotone-chain hull (Andrew) and rotating calipers
   (Toussaint) for the OBB (§3.1); centripetal Catmull–Rom splines and pinned-vertex Laplacian smoothing (§3.1, §4.2,
   §9.3); Dijkstra's and A\* shortest paths (§3.1, §4.2, §4.3); Brandes' betweenness (§4.3); Kruskal's spanning tree
   (§9.3); Lambert shading (§8.2's hillshade); CIELAB and the CIEDE2000 colour difference (Sharma–Wu–Dalal; §8.2); D8
   steepest-descent flow directions and flow accumulation (O'Callaghan and Mark 1984; §2.3, §4.2 S1); the exact
   Euclidean distance transform in linear time (Felzenszwalb and Huttenlocher 2012; §4.5, §12.4); the three-pass
   box-filter approximation of a Gaussian (Wells 1986; §4.5, §12.4); the Merkle hash tree (Merkle 1987; §6.2, D-28);
   context-free grammar expansion in the style of Tracery (Compton, Kybartas and Mateas 2015) and character n-gram Markov
   chains (Shannon 1948) for §10.4's naming engine — ideas only, with our own grammar and corpora; power diagrams
   (Aurenhammer 1987) with area targets (Aurenhammer, Hoffmann and Aronov 1998) for the hinterland lots of §4.9; Kahn's
   topological sort (1962) with the stage id as tie-break for the stage order (§4.1, §4.12); SHA-256 (FIPS 180-4) for
   (5)'s salted digests. For the tests: Pearson's χ² test with Holm's step-down procedure (§13.2), Spearman's rank
   correlation, Moran's I, Kolmogorov–Smirnov distances and SSIM (Wang et al.; §13.4, §13.5); the pair-correlation
   function of a point pattern (Stoyan and Stoyan 1994; §4.9, §13.2, §13.5); Shannon's entropy (1948) for the heading
   and use-mix entropies (§13.5, §13.7); the Jaccard index (intersection over union; §6.3, §7.5); and the Hausdorff
   distance (§3.7, §13.2, II.5). The list is checked against the text by a scripted scan of 119 method names
   (`docs/validation/bench/fixall_scope_r4_methods.out`). An implementer reads each in its published form; the seat
   ledger of (7) records which. The creators' *stated* ideas: twisted bisection, the casing idiom, skeleton labels, the
   proposal queue, dependency ratios, lazy people, integer centimetres — with constants calibrated on our own
   measurements.
9. **Protocol names.** The host bridge's vocabulary is our own (§11.3): the concurrency token is `logHead` (§2.9),
   carried as `baseLogHead` and `currentLogHead`; time is the view key `time`, set by `view.set`, and the simulation
   module advances it with its own command `sim.advance { hours }` (§10.3, §11.3). Schema-level ideas — an event /
   command split, an optimistic-concurrency token — are admissible as ideas; the FTG module's message, command and field
   names are not reused, are in the deny-list, and occur nowhere in this document (check (i) of (2)).

=== REPLACE # Delegated decisions (the owner deferred all judgment; each is final unless vetoed) ===
# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)

Each decision is final unless the owner vetoes it. One paragraph each: the choice (its mechanism lives in the section
named), the alternative rejected and the cost of reversing it later; the plain-words rationale of each is in
`docs/ARCHITECTURE-RATIONALE.md`. D-1–D-7 are the owner's adopted defaults (amendment 7), each tied to its mechanism.
Decisions marked *owner veto* touch a subject the owner keeps (a purchase, the licence, new capability): the program has
taken the most option-preserving default and flags it.

**D-1 — the look.** The default look is clean ink (MFCG family) with IM FELL Great Primer as the label face (§17.2); the
second preset is FTG-like `lit`, on Canvas2D like every preset; a hatched preset serves the close-up (§8.2). The house
style is our own third preset `house`, drafted as three candidate style sheets at M3b and chosen by the owner on the
§13.6 panel at M4, `ink` staying the default unless the owner picks otherwise; with no pick by M4's exit, §13.6 (8)
applies. Rejected: `lit` as the default; a WebGL2 reference backend for `lit`. Reverse: low (a style file).

**D-2 — era and region.** The centre of gravity is high-to-late medieval Western Europe (12th–15th c.), as presets the
corpus phase re-signs through §13.9; walled shares and stage rows per rung are MFCG-calibrated (§1.1, §4.2 S2), and FTG's
lower walled share is reachable as a preset. Rejected: a hard-coded culture; a 0.35–0.5 walled share (MFCG's shanty
case). Reverse: low (table rows).

**D-3 — realism in the base.** Fantasy exists only as named toggles, each off by default: floating islands and their
conjured rivers — a model setting `recipe.layers.islands`, off by default, that exists only at CITY and METROPOLIS and
only where prosperity supplies it, the sky layer's view toggle showing islands and never creating them (II.6, items 10,
13 and 15; J-A10.01); the `navigable` sewer preset (II.7.2) — the historical sewer network is realism, present by tier
and hidden until its toggle (II.7.1, item 14); the game-system stat pack (D-32); the `night` preset's lights. Rejected:
fantasy defaults. Reverse: low.

**D-4 — the product shape.** A browser-first embeddable TypeScript library with an app on top; permissive dependencies
only (§17.4's checker over the production closure); one generation worker, a derivation pool and a tile worker behind a
handle-based API (§1.7, §11.2). Rejected: a Rust / WASM core from day one; server-side generation. Reverse: medium after
M1 for the core language — a measured hot loop may get a byte-identical WebAssembly accelerator (§3.7), there is no
WASM kernel; low for the worker model.

**D-5 — "mastered".** The owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, run through the
written blind protocol of §13.6, plus the parity numbers of §13.5; an unrated panel lets the build continue with the
milestone's D-5 status *provisional — not rated*, and "at parity", "mastered" and the stage-2 gate are claimed only by a
rated pass or the owner's recorded acceptance (§13.6 (7)). Rejected: numbers only; an eye with no protocol. Reverse:
none.

**D-6 — naming.** Original English-fantasy naming; setting packs in §10.4's format, the base shipping one pack; further
packs are data. Rejected: reuse of reference corpora. Reverse: low.

**D-7 — weighting.** Realism, editability and plot texture first; speed and export next; novelty last — and the
weighting orders the build: the editing core (M2a) before the second preset and the rest of parity (M2b) (§16).
Rejected: speed first; editing after the lit look. Reverse: none.

**D-8 — 3-D export.** glTF 2.0 (OBJ secondary) and CityJSON 2.0 (§11.1). Rejected: CityJSON left for later. Reverse: low (an
exporter).

**D-9 — no restart path.** "No restart path" is a design property; the acceptance numbers are requested-feature delivery
by ladder tier and p95 time per delivered town on MFCG's worst configurations, with their bars in §13.5. Rejected: "0
whole-map restarts" as the number; a p99-bounded restart tier. Reverse: low (criteria).

**D-10 — simulation depth.** The base holds the roster, the context vector, allocation and placement, households and
lazy people, and the relation store's schema from M1; schedules, calendar, factions' meetings, events, economy and
personality are the optional `@plat/sim` module at its own milestone, M4b (§10.1). Rejected: schedules and the calendar
in the first release; the module inside M4. Reverse: low.

**D-11 — scatter.** Poisson-disc k = 50, all candidates evaluated, builds the per-class ranked tiles once, when the
product is built; per-instance placement is the stamp (§8.10); a measurement (NN p1, pair-correlation) may relax k.
Rejected: k = 30; per-entity Bridson sampling. Reverse: trivial (a table value).

**D-12 — coordinates.** Integer centimetres centred on (0, 0), +y north, under §3.2 (1)'s range invariant. Rejected:
millimetres; doubles. Reverse: high after M1.

**D-13 — the plat.** Five refinement levels as views of one arena per layer (level-tagged edges, per-level face
records), a separate arena per layer and per sky island, unions for multi-face entities (§2.2). Rejected: one flat
subdivision; five separate per-level DCELs (nesting cannot hold on the lattice). Reverse: high after M1.

**D-14 — geometry engine.** Booleans, buffers and bands on the kernel's own arrangement — one engine on every host, with
the oracles and the one pre-decided fallback of §3.7; the straight skeleton built in-house under §3.8's contract and
validator, its downgrades the default paths. Rejected: CGAL (GPL); a JS skeleton port; a runtime pure-JS boolean
fallback (a second engine, different digests). Reverse: low (adapters).

**D-15 — streams.** xoshiro128\*\* streams keyed from §6.1's structured components, the lineage separate from the
address id, concern ids append-only; Enter makes a new document with the successor seed of §6.1. Rejected: one global
stream; a counter-based RNG. Reverse: high after M1.

**D-16 — the fused layout.** Routed arterials between named destinations; reservations and gate sites at S3 and each
enceinte traced before its stage's growth; inside the walls district-scale secondaries plus NG's bent-cut infill with
the measured construction, outside them FTG-shaped growth with explicit legality and stage regimes; districts grown over
the coarse skeleton, feature-named and grouped into quarters; frontage-first plots with the granularity law (§1.4, §4).
Rejected: the four rejected shapes of §1.4; FTG growth down to block scale inside the walls. Reverse: high (the layout
core) — hence M0 and M1's fusion gate.

**D-17 — the enceinte.** Gate sites picked and castle and plaza reserved at S3; stage 1's enceinte traced at S3 from the
travel-cost boundary over its solved gate routes, each later enceinte at S5a from its stage's boundary, both pulled to
defensible ground before that stage's streets grow; gates exactly at arterial crossings with exact N by the measured
gate law; gate plazas; the castle by score with the inside / on-enceinte / outside option; an open waterfront by
default (§4.2 S3, §4.4, §4.8). Rejected: a wall on cell edges; tower-per-vertex; walls traced after growth. Reverse:
low.

**D-18 — budgets as laws** (*owner veto on the misses above the knees*). Model and first-map budgets are per-rung laws of
the building count (§12.3, §12.5), read over every size of a rung, with the derivation pool primary wherever §12.3's rule
keeps it and the single worker as the pre-decided fallback elsewhere; the max clause is judged on outliers confirmed by
solo re-timing (§12.3); the one-click path stays complete at every size; the per-building cost against MFCG is a
declared trade (§12.9). The owner may veto the two declared misses: O3 (d)'s model bars above the sizes §12.3 states,
and O12 (g)'s first-map bar above the knee §12.5 states. Rejected: workers assumed without a merge protocol; matching
MFCG's per-building cost by dropping plot detail; a preview or a coarser one-click path above the knee. Reverse: low
(numbers); ≈ 1 pw for a district-by-district city band above the knee; medium (architecture) if M0 or M1 miss.

**D-19 — defaults and calibration anchors**, all data that costs nothing to change: the codename PLAT and `@plat/*`; the
terrain resolution per rung (§2.3); frame areas, aspect and margin (§1.1, §3.2 (9)); the minimum edge, the attraction
distance, the minimum plot width and angle (§3.2 (2)); the district band from the count law (§4.5); the gate law (§4.2
S3); stage counts and walled shares per rung (§1.1, §4.2 S2); shadows off by default with a fixed sun (§8.4); heights
always populated (§2.6); tower spacing and every band as calibratable table rows (§7.6). Reverse: trivial (data).

**D-20 — effort.** ≈ 165–219 expert person-weeks — the base 151–201 (the content module included) plus stage 2 14–18,
re-derived line by line in §16 (153–204 before amendments b, whose +12–15 pw are itemised there, J-A16.01); the cuts that
would reduce it to ≈ 147–190 are recorded for the owner's veto, not applied (§16). Rejected: 100–130 pw; cutting scope to
hold it. Reverse: none (an estimate).

**D-21 — the document.** A base (the recipe, or a rebased state) and the ordered log, with a digest-verified snapshot
cache; one replay fold; a rebase when a saved state is kept; output versions N−1 and N−2 retained in the browser and
every version in the CLI; an upgrade is an undoable event (§2.9, §6.4, §7.4, §7.5). Rejected: events only; "the last N
minor versions stay replayable" with no mechanism. Reverse: low.

**D-22 — our own licence** (*owner veto*). Proprietary, all rights reserved to the owner, until the owner chooses
(§17.3); no dependency may constrain the choice. Rejected: leaving it undecided; an open licence by default. Reverse:
low (a licence file) until code is published.

**D-23 — deterministic maths.** Transcendentals through `dmath`, our TypeScript port of the fdlibm 5.3 routines with
Sun's notice, under §6.5 (3)'s allowlist lint, which also scans vendored dependencies (§6.5 (4)). Rejected: in-house
polynomial approximations; trusting the engine's `Math.*`; the `@stdlib` packages. Reverse: low (one adapter and one lint
rule).

**D-24 — goldens.** Stage-isolated goldens (new stage code on frozen upstream outputs), built at M1; end-to-end goldens
re-signed only with a cascade record; every milestone files its declared shifts; a same-seed output change is never let
ride silently (§13.3). Rejected: one whole-model hash per seed; goldens at M4. Reverse: trivial (test tooling).

**D-25 — the evolution hook.** Exactly one built and tested incremental path in the base — add a growth stage to an
existing town, with wall → ring road as a typed conversion — plus the epoch key component and the transformation-event
vocabulary — the decline ladders of buildings, walls and tunnels with the salvage ledger and the regrowth-first siting
(item 8), the island kinds (items 10, 13), use relocation and the designation mutation (items 17, 18), the wealth ladder
with the built band, the geometry floor and the manifested band (item 31), the interior ladder and the dwelling unit
(item 28 (f)), rejection and positive placement (item 20), fusion and splitting as edit kinds, the terrain-water kinds
(item 25) and the sealing and reopening of passages (item 30) — every kind usable by hand in the base and undoable; the
evolution engine, which schedules them from circumstances, is staged by the owner with its interfaces concrete (§4.11,
II.6, II.7).
Rejected: no incremental path; the full engine now. Reverse: low.

**D-26 — identity.** Opaque lineage-hash addresses with survival and succession (§6.3). Rejected: hierarchical
creation-order ids; a per-kind counter. Reverse: high after M1.

**D-27 — work limits.** Work limits, never wall clock, bound every output-affecting budget (§5.1). Rejected: wall-clock
watchdogs. Reverse: low.

**D-28 — the model digest.** A Merkle root over the eager model's content only, maintained at batch commit (§6.2).
Rejected: hashing the canonical serialisation per batch. Reverse: high after M1.

**D-29 — the clean-room chain** (§17.1): implementers read only this document and a checked implementer digest; the
product in its own repository `plat/` with a path rule; reference numbers only through the committed files of §17.1 (4);
a hashed content deny-list scan in CI and a palette audit per milestone; reference-derived constants labelled by
origin; a seat ledger in `CLEAN-ROOM.md`. Rejected: findings and captures as implementer inputs; path-only CI rules.
Reverse: low (process) — in place before M0's code.

**D-30 — thresholds.** Every threshold has a number now: reference-settable bands by §13.5's band rule from
`baselines.json`; the thresholds no reference can set in §13.7, each with a provisional number, the first milestone that
confirms it and a pre-decided fallback; no placeholder can gate or pass. Rejected: placeholders set by the corpus phase.
Reverse: trivial (data).

**D-31 — matched references** (*owner veto*). TOWN = MFCG size 40 and FTG BIG_TOWN (≈ 5 600); CITY = MFCG size 80 and
FTG BIG_CITY (24 500); METROPOLIS = MFCG size 130. FTG's premium METROPOLIS is not purchased: the METROPOLIS side-by-side
uses MFCG 130, with FTG's published metropolis pictures as an unscored reference card; a one-month premium FTG
subscription for one measured capture is the owner's option. Rejected: a CITY-only FTG comparison; a purchase by the
program. Reverse: low (one capture day if the owner buys).

**D-32 — economy, personality and stats** (*owner veto: new capability rather than repair*). Economy (resource chains,
items and services with prices, stock per building, global price edits), personality (trait sentences, motivation,
mannerism, hobbies), education gated by class and a stat block with profession modifiers are `@plat/sim` content
(M4b), derived from their keys with our own authored tables; their schema stubs are in the base (§10.3); the stat block
is a named game-system pack, off by default (D-3); the family-tree view is in the app (§14). Rejected: leaving them
unrecorded; putting them on the one-click path. Reverse: low (module content; dropping it removes ≈ 2–4 pw from M4b).
Amendments b split it (J-A16.44): the resource and supply edges placement reads and S2's need propagation are base data
(§10.2, §4.7 S10b); prices, stock and trade stay module content.

**D-33 — the two ladders.** They meet at 1 500 inhabitants; size within a rung follows population; per-rung rows live in
`ladder.json` — the `layers` rows of items 13 and 14 among them (J-A13.01); requests below and above the ladder are routed or
clamped as §1.1 states. Rejected: an undefined
boundary; a 2 000 floor leaving a gap below the base. Reverse: trivial (data).

**D-34 — CI tiers.** Three tiers with wall-clock budgets (PR ≤ 15 min, nightly ≤ 4 h, milestone ≤ 12 h) on a stated
runner; the oracle once per sequence; an over-budget job is split, never re-capped (§13.8). Rejected: one full run per
change. Reverse: trivial.

**D-35 — build order.** M-1 → M0 → M1 viewable town → M2a editing core → M2b parity (the second preset; METROPOLIS,
which generates from M1, measured and tuned) → M3a full editing, migration and API → M3b exports, forms and should-have
tiers → M4 hardening and the incremental path → M4b the content module → M5 stage 2; nothing leaves the program (§16).
Rejected: the lit look before editing; moving exports, forms or the module out of the program. Reverse: low (a plan).

=== INSERT AFTER # Judgment calls ("chose X over Y because Z"; each vetoable) ===
The rows `J-A⟨item⟩.⟨n⟩` are the amendments-b pass's (items 8–31 of the second amendments file; 2026-09-26/27):
⟨item⟩ is the amendment ruled on, and the first digit of ⟨n⟩ names the ruling's home — 0 for the scope part (§0's
landing table, §1, §13–§17 and the lists), otherwise the number of the section family that states the rule. Each has
its Part A entry like every other row.

=== REPLACE # Staged by the owner's roadmap (this document defers nothing) ===
# Staged by the owner's roadmap (this document defers nothing)

The owner ruled on 2026-09-25: "I would prefer if there is no defer and everything is fixed as soon as possible." This
document defers nothing: every former deferral — the numeric targets, the boolean library, the skeleton, the dd2vtt
profile, CityJSON, SDF text, setting packs, host inputs, a sync service, a WASM kernel, the owner's licence and the
worker pools — is a decision in the body, with its confirming measurement and pre-decided fallback where only an
experiment can confirm it (the entry-by-entry record is `docs/ARCHITECTURE-VALIDATION.md`). This is the one list of
subjects the owner's roadmap places after the base: stage 2 is built in this program at M5 (§16); the others are staged
by the owner. For each, the base carries concrete hooks now, in the sections named; they are staged by the owner, not
deferred (documented, not bugs to re-find).

| subject (the owner's roadmap stage) | the hooks the base carries now | where |
|---|---|---|
| stage 2 — neighbourhood composition (built in this program at M5, after the base) | `SeamContract` on every district from M1; one shared `Seam` record per boundary run with its `baseLane` portals and the seam exception to locality; every seam edge typed, a way-less reservation boundary two districts share as `reserve`; II.1 (3)'s neighbour step, one `corridor_split` edge in a finished neighbour's strip, reversed exactly by demotion whatever edit removes the street (§2.2 rule 3); the `FabricStrategy` slot; the neighbourhood band; the `hatched` programs | PART II, §3.7, §4.6, §4.12, §7.3 |
| stage 3 — manor-style building compositions (after stage 2) | `BuildingGenerator.outline` / `compose` with a cost contract (the base outline inside S11's geometry share; a stage-3 `outline()` admitted at ≤ 10 µs with a declared re-budget); wings (`BaseWing.kind` `rect` / `quad` / `polygon`, a `quad` wing's recorded `corners`, `BuildingInput.fixedWings`), `carryWings`, which keeps every stored wing, and a stored composition's rings and tower centres, on its footprint through every move — the union test a stage-3 `compose()` must pass, run at the stage-3 intake on stored compositions — and heights in the base; the stage-3 intake measurement; item 28's hooks for the plan rung: `'plan'` in `Composition.lod` and `BuildingGenerator.plan`, the plan records with the room's household unit, the interior ladder's rows read at the occupants' band (item 28 (f)), `ElaborationRecord` per rung with the `elaborate` view key and the cache, the `plan.*` concerns keyed by the rung's reroll, the seven plan events and the rung re-roll of `regenerate`, the transient arena, F-PLAN, §12.7's row and §13.2's B-PLAN bars; the entrance set and basement the plan consumes (item 29); the passage room (item 30) | §2.6 beside §2.8's record and §2.9's cache; the kernel's §3.4 and §3.7; the policy §4.1; the streams §6.1; the events of §7.1; the draw of §8.6; the bars of §13.2 |
| the village product (after the town / city) | stages ordered by declared I/O; `EnceinteStrategy` and the enceinte input of every network strategy; tracker-network and houses-along-ways registrations; a village as one district; the ladder rows and the 1 500 boundary; the not-precluded checks of §15.1's VILLAGE-LATER rows; the village rung rows carrying `layers.islands = none`, `layers.sewers = never` and a 0 hidden share (items 13, 14, 30) | PART III, §1.1, §1.6, §4.12, §15.1, D-33 |
| sewers and floating islands (toggles, after the city is mastered) | one arena per layer and per sky island; `LayerSpec`; drainage queryable per cell over frame and margin; `SkyIsland` and `Tunnel` records (the tunnel's invert as a knot profile); the sky pseudo-districts' allocations created by S7b before any island exists; `SkyStrategy`, `IslandRule` and `SewerStrategy` registrations; the sky close-up call; shadows onto the ground layer; the island rule — the rung gate `RungProfile.layers.islands`, the model setting, the count law and the two-supply size law — with `SkyIsland.supply`, `areaHa` and `state` (items 10, 13, 15); the tunnel lifecycle (item 11); the sewer tier rows — `RungProfile.layers.sewers`, `Features.sewers` with S0's draw (item 14) — the underground `LayerSpec` hidden by default, the class table's `drain`, `underground` and `undergroundAccess` columns, `Tunnel.navigable`, `headroomCm` and `condition`, the tunnel profile table, `AccessPoint`, `ContextVector.arena`, the underground rows of the granularity and site-plan tables, the `UndergroundStrategy` slot, the U1–U3 invariants, F-UNDER and §13.2's fixture (item 12) | II.6 and II.7; the ladder §1.1; the records of §2.1 (the arena), §2.3 (drainage) and §2.7 (tunnels and access); the stages §4.2 then §4.5; the ladders of §5.2 and the invariants of §5.3; the layer §8.4; the registry §14 |
| the evolution engine (much later) | epoch events and key components; `EpochInputs`, `EvolutionStrategy`; the `ConversionOp` kinds, decline included; the one built growth path, whose epochs use the crossing sites generation left unused; the decline table with its exposure lottery, the persistence order, the salvage ledger and the dwell lag, and the regrowth-first siting, which binds the built path now (item 8); the tunnel and island decline kinds (items 10, 11); the use step with `UseConversionOp` and pinned assignments (item 17); the epoch-spread mutation (item 18 (c)); the terrain-water kinds (item 25); the wealth ladder — the due mark, the ladder table's durations, churn caps and orderings, the replaceability column, `builtBand` and the floor applied at epochs (item 31); the densification, clearance, sealing and reopening of hidden plots (item 30); the lapse of a rejection and the folding of a dossier event at an epoch (items 20, 22 (e)); `relet` and the interior re-cut (item 28 (f)) | §4.11 and §1.5, D-25; the layers II.6 and II.7; the plot record §2.5; the dossier §7.7; the tables §10.2 |
| calibration against the historical corpus (after the standalone generators) | `CorpusAdapter`; corpus rows in `baselines.json`; `CalibrationRun` as table-version bumps with declared shifts; provenance on every table cell; the tables amendments b adds, listed at §13.9 (5) | §13.9, §7.6 |
| SettlementForge inputs (after the generators are mastered) | the host-input contract and the host bridge; the dossier contract (items 20, 22): dossier-backed existence, the rejection record and its lapse, positive placement, re-application and the disruption report — a data-only, one-way door, the module a separate program at arm's length (§17.3, D-22); `knownTo` as a dossier fact (item 30); the mapping of SettlementForge's own data onto these doors is the staged part | §11.4, §11.3, §7.7 |

=== APPEND TO SECTION # Appendix A — reading record, and CONFIRMED versus PLAUSIBLE ===
**Amendments b (2026-09-25 to 27).** The pass that folded items 8–31 of the second amendments file into this document
(its landing rows are §0.2; its route sits in `docs/validation/amendments-b/`) read the owner's words, the route and the
Dwellings review — the four findings files and the Fable synthesis in `research/findings/` — as findings only; no seat of
it opened a reference source or a captured bundle. Its rulings are the `J-A` rows of the index. Every mechanism, default
number, bar and effort figure it added is **PLAUSIBLE** until the milestone named beside it in §16 executes it; the
Dwellings numbers it cites as baselines are CONFIRMED by the measuring lanes and by the critic that checked them.

=== J-ROWS ===
| J-A8.01 | the decline and regrowth hooks proved by hand-applied conversions (T8-1 – T8-7) and priced at M4; regrowth-first on the built path priced on the O9 line; item 25's kinds tested the same way (T25-1) | §13.2, §16, D-25 |
| J-A9.01 | already the rule: size within a rung follows population (§1.1) and parity pairs match building counts (§13.6 (3)); a landing row, no change | §0.2, §1.1 |
| J-A10.01 | D-3 restated: islands a model setting off by default, only where prosperity supplies them and only at CITY and METROPOLIS, the view toggle showing and never creating; the historical sewer network realism by tier, the `navigable` preset the fantasy toggle | D-3 |
| J-A12.01 | the underground registration and its output keys in §14; the underground schema fixture and the U1–U3 rows tested as T12-1 | §14, §13.2 |
| J-A13.01 | one `layers` object on `RungProfile` — the islands gate (item 13) and the sewer existence row (item 14) — as columns of `ladder.json`, the village rows `none` and `never`; per-rung data stays in the ladder (D-33) | §1.1, D-33 |
| J-A16.01 | amendments b's build work priced: +12–15 pw itemised over seven lines of §16 and carried by M1, M2b, M3a and M4; the total 165–219; the staged engines unpriced by the roadmap | §16, D-20 |
| J-A16.02 | one placement solver and one designation mutator in `@plat/plots`, S10b moved out of `@plat/content`; the bars of items 16–19 as T16 – T19; D-32 split as J-A16.44 records | §14, §13.2, D-32 |
| J-A20.01 | the dossier contract's tests (T20, T22) stated in §13.2, its hooks in the staged SettlementForge row, and O10 given the contract's letter | §13.2, §15.2 |
| J-A21.01 | the licence stays private (the owner, 2026-09-27): the GPL-3 intent of 2026-09-25 withdrawn; §17.3, D-22 and J-S10 stand; TownGeneratorOS an idea source only; the separate-program shape retained by choice, not by licence; the work recorded as inspired, not derived | §17.1, §17.3, D-22 |
| J-A23.01 | the parity presets as item 23's proof (T23-1); §17.1 (6)'s provenance values `ref:…` beside §7.6's `extension` marker; §1.4 states the principle once | §1.4, §13.2, §17.1 |
| J-A24.01 | the principal market's siting shares (on the plaza in ≥ 90 % of inland walled seeds, off it in ≥ 50 % of ports) as a §13.7 threshold with a fallback; MFCG's secondary-plaza rows ⟨M-1⟩ in §13.5 | §13.7 and §13.5 |
| J-A26.01 | O14's letters gain the fuel and timber rows; the hinterland modes and the arable reserve tested as T26 | §13.2, §15.2 |
| J-A27.01 | FTG's lifestyle distribution and MFCG's ward-class shares as descriptive §13.5 rows; the band set's schema test and the shanty fixture as T27 | §13.5, §13.2 |
| J-A28.01 | the eight plan bars, the four elaboration tests and the five interior-ladder bars as one B-PLAN group in §13.2, the shell bar citing §3.10's seed-tiling row; the plan's soft bands a §13.7 row that gates nothing | §13.2, §13.7 |
| J-A28.02 | the one-page summary amended by an appended paragraph, never replaced (the pass's guard): the markets, the shell's floor and the interior's freedom, the dossier, the licence and the effort figure it supersedes | the summary |
| J-A29.01 | the entrance and basement bars (T29); §13.5's FTG entrance row retained for the main door; Dwellings' basement share descriptive only, with no baseline row | §13.2, §13.5 |
| J-A30.01 | the hidden share's tolerance (± 0.03) a §13.7 threshold with a fallback; the parity presets' 0 hidden share a parity row; O5 (a) extended to chain reachability | §13.5, §13.7, §15.2 |
| J-A31.01 | the wealth ladder's twelve bars in §13.2 with the floor's among them; `wealthLadder.json` beside `ladder.json` in §14; O18 (g) gains the ladder | §13.2, §14, §15.2 |

=== RATIONALE-A ===
| J-A8.01 | Chose to prove the decline and regrowth hooks (item 8) and the terrain-water kinds (item 25) on hook fixtures — every conversion applied by hand on the golden TOWN, undone to byte identity, the regrowth-first fixture grown by +6 % and the 20-epoch address test — over waiting for the evolution engine, because a hook nobody can exercise is a deferral in disguise, and the same bars bind the engine when it lands; priced the hooks at M4 beside the incremental path and the regrowth-first siting, which binds the base's built grow path today, on the O9 line, because it is build work of the one built path (§13.2, §16, D-25). |
| J-A9.01 | Chose to record item 9 as already the rule — §1.1's "size within a rung follows population", its budgets as laws of the building count and §13.6 (3)'s pairs matched by building count — over restating it anywhere, because a second statement would be a duplicate under the canon's single-source rule; the landing row of §0.2 is its only addition. |
| J-A10.01 | Chose to restate D-3 (realism in the base) so that it names amendments b's two layer rules — floating islands a model setting `recipe.layers.islands`, off by default, that exists only at CITY and METROPOLIS and only where prosperity supplies it, the sky layer's view toggle showing islands and never creating them (items 10, 13, 15); the historical sewer network realism that is present by tier and hidden until its toggle, the `navigable` preset the fantasy sewer (item 14) — over leaving "fantasy sewers (II.6)" as it stood, because the old sentence made the whole sewer layer a fantasy toggle, which contradicts the owner's "becomes a necessity for cities", and a decision paragraph must not contradict the mechanism it points to (II.6, II.7.1). |
| J-A12.01 | Chose to register the underground stage in §14 as `StrategyRegistry.underground` with its declared output keys (`under.blocks`, `under.plots`, `under.buildings`, `under.access`) so that §4.1's topological order places it before the display list, and to test its invariants on a schema fixture of one underground neighbourhood (T12-1), over leaving the registration to the staged stage, because a staged engine needs its slot and its order in the base now, or its arrival changes the pipeline's declared order — the staging rule of this document (II.7.2, II.7.4, §13.2). |
| J-A13.01 | Chose one `layers` object on `RungProfile` — `islands: 'none' or 'possible'` (item 13) beside `sewers: SewerExistenceRow` (item 14) — as two columns of `ladder.json`, with the village rows reading `none` and `never`, over a per-layer table of its own, because D-33 makes the ladder the one home of every per-rung fact and both rules are per-rung facts the island rule (II.6 (2)) and the sewer stage (II.7.1) read at generation and at every epoch (§1.1). |
| J-A16.01 | Chose to price amendments b's build work by widening seven lines of §16's effort table by itemised amounts — O10 +4–5 pw (the one placement solver with its relation and supply data, the designation mutator, the dossier contract), O17 + O18 + O19 +2–3 (designation templates and the compatibility table, the band set, the entrance set and basements, exposure, hidden shares and passages), O9 +2 (the `Use` record and hand relocation, the plan rung's base hooks, the wealth-ladder edit kinds), the should-have tiers +1 (FTG's farmland modes, the fuel and timber rows, the reserve), the content line +1 (the parity presets and the marker, the new tables' rows), the verification rig +1 (the hook, B-PLAN and underground fixtures, the parity-preset run) and the unpriced-mechanisms line +1–2 (the transient arena and the M4 hooks) — +12–15 pw in all, carried by the milestone rows M1 +1 / +1, M2b +3 / +4, M3a +6 / +7 and M4 +2 / +3, so the rows still sum to the total of 165–219, over absorbing the work silently or re-estimating the whole plan, because §16's own rule is "a pass that adds build work prices it here", and J-S43 set the precedent; the staged engines themselves are not priced, by the roadmap (§16, D-20). |
| J-A16.02 | Chose to state in §14 that one placement solver (§4.7 S10b) and one designation mutator (§4.7 S11) live in `@plat/plots`, S10b's placement leaving `@plat/content`, and to state the bars of items 16–19 as T16 – T19 in §13.2, over keeping §7.7's solver as a second mechanism, because the assignments family's own principle is one solver and one table read by generation, assignments, relocation and dossier events alike, and the dependency rule `content ← layout ← plots` holds unchanged; D-32 gains the split J-A16.44 records (supply edges base data, prices module content) so that a decision paragraph does not contradict §10.2. |
| J-A20.01 | Chose to state the dossier contract's tests — T20-1 – T20-4 and T22-1 – T22-4 — in §13.2, to name the contract's hooks in the staged SettlementForge row and to give O10 a letter for it, over leaving them in the determinism seat's notes, because R9 makes §13 the one home of every test and the owner's authority rule ("the map does not edit the dossier") deserves an acceptance letter a milestone can fail (§13.2, §15.2, *Staged by the owner's roadmap*). |
| J-A21.01 | Chose to keep the licence private — §17.3 and D-22 byte for byte, J-S10 standing — and to record that the owner's GPL-3 intent of 2026-09-25 was withdrawn on 2026-09-27 ("then lets stay private for now", after the inspired-versus-derived distinction), over folding the GPL-3 consequences the amendment had drafted into §17, because the owner's later word is the authority and the proprietary default is the option-preserving one (an open licence can be granted later by one act and never withdrawn). Consequences: TownGeneratorOS stays an idea source only, its 2026-09-25 permission to consult and adapt code withdrawn, which §17.1 (1) now says in one sentence; dependencies stay permissive-only (§17.4), so no library ever constrains the choice; the module stays a separate program talking to SettlementForge through a data-only bridge (§11.3), retained by choice because it keeps every later option open, not because a licence requires it; the design records that the work is inspired, not derived — methods, measured behaviour and published descriptions re-implemented independently, provable by the clean-room chain, the document checks and the notices file. The kernel seat's J-A21.31 (CGAL rejected on the stack and one-engine grounds, no longer on its licence) stays valid on its own reasons; its premise that the module would be GPL-3 is superseded by this entry, and D-14's and §17.4's GPL exclusions stand unchanged. |
| J-A23.01 | Chose the parity presets `MFCG` and `FTG` as the proof of item 23 — T23-1: with a parity preset every `extension` cell reads 0 or off and B-REF's rows hold; with the default preset the extensions run — and §17.1 (6)'s provenance values `ref:⟨reference⟩ ⟨behaviour⟩` beside §7.6's `extension` marker as the way a reader tells an emulated default from our own tendency, stating the principle once in §1.4 beneath the fusion table, over a marker only in §17.1 or a principle stated in every stage section, because the determinism seat's cell schema (J-A23.71) already carries the marker and a principle stated more than once would be a duplicate (§1.4, §7.6, §13.2, §17.1). |
| J-A24.01 | Chose to make the principal market's siting shares — on the plaza in ≥ 90 % of inland walled B-CITY seeds, off it in ≥ 50 % of port seeds — a §13.7 threshold with a re-tune fallback and a "not achieved" mark, and MFCG's secondary-plaza frequency and non-adjacency a §13.5 target row measured at M-1, over asserting "usually central" without a number, because D-30 admits no threshold without a number and the owner's "does not have to be central" is a statistical claim only a measurement can confirm (§13.5, §13.7). |
| J-A26.01 | Chose to add the fuel and timber rows to O14's letters and to test FTG's farmland modes and the arable reserve as T26-1 – T26-3, over leaving O14 at farmland per capita, because item 26 makes woods a demand like fields and a letter without a bar is an assertion (§13.2, §15.2). |
| J-A27.01 | Chose to carry FTG's lifestyle distribution and MFCG's ward-class shares as descriptive §13.5 rows and to prove the default band set by a schema test and the shanty fixture (T27-1, T27-2), over a target row, because the default band set reproduces those distributions by construction and the parity preset equals them by definition — a target that passes by construction proves nothing (J-S1's classes), while the schema test catches a band set without a middle band or a table without a row for a band (§13.5, §13.2). |
| J-A28.01 | Chose to state the plan rung's bars as one B-PLAN group in §13.2 — the eight hard bars and soft bands of the Fable synthesis, the four elaboration tests and the five bars of item 28 (f) — with the shell bar citing §3.10's seed-tiling row per storey rather than restating it, and the plan's soft bands as a §13.7 row that gates nothing, over scattering them through §2.6, §5.2 and §12.7, because R9 makes §13 the one home of every acceptance bar and the synthesis's numbers (5 ms, 20 ms, 4 KB, 8 MB) are budgets of §12.7 and §12.8 that the bars cite (§13.2, §13.7). |
| J-A28.02 | Chose to amend the one-page summary by one appended paragraph that names what it supersedes — "the market square" (item 24), the effort figure (J-A16.01) — and adds the owner's later rules in plain words (the shell's floor and the interior's freedom, the dossier as authority, the private licence), over replacing the summary, because the pass's guard forbids a REPLACE of the title block and the summary while another pass may rewrite the banner beneath the title; the assembler or a later finishing seat may fold the two superseded phrases in place, and the paragraph says so. |
| J-A29.01 | Chose to state item 29's bars as T29-1 – T29-4 — one main entrance facing its street or court, no side or rear door without an access edge, no cellar under the flood band, every basement inside and smaller — and to keep §13.5's FTG entrance row as the main entrance's target, with Dwellings' one-entrance rule and basement share a descriptive note only, over a Dwellings baseline row, because a `baselines.json` row needs a research-side measurement with a capture and a build, which the Dwellings lanes made for a plan generator, not for a settlement's entrances (§13.2, §13.5). |
| J-A30.01 | Chose a tolerance of ± 0.03 on the hidden share as a §13.7 threshold with a re-tune fallback, the parity presets' 0 hidden share as a §13.5 row and O5 (a)'s "access edge 100 %" extended to chain reachability, over a tolerance left to the table, because no reference has hidden plots, so the tolerance is a number of ours that D-30 requires stated now, and the access guarantee the owner's rule extends must stay an acceptance letter (§13.5, §13.7, §15.2). |
| J-A31.01 | Chose to state the wealth ladder's twelve bars in §13.2 — the six ladder bars and the floor's six — to name the ladder table `wealthLadder.json` beside `ladder.json` in §14 (the latter is the rung profiles', not the failure ladders' — those are §5.2's rows), and to give O18 (g) the ladder, over leaving the bars in the pipeline seat's report, because R9 makes §13 the home of tests and a data table that no package names is not build-ready (§13.2, §14, §15.2). |

=== END ===
