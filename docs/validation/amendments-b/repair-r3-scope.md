# repair-r3-scope — lane amendments-b/repair-scope-r3 (SCOPE part: the summary, §0, §1, §13–§17, the Delegated
# decisions, the Judgment-calls index, the Staged list, Appendix A): block file per the BLOCK PROTOCOL. Text before the
# first "=== " line is ignored. The lane's report, ledger and receipts: docs/validation/amendments-b/repair-scope-r3-report.md.
# Base: docs/ARCHITECTURE.md sha256 831efd429092adf3… and docs/ARCHITECTURE-RATIONALE.md sha256 f2c2a1ca11a0f1da…
# (assemble-r2's output). Each REPLACE body is the live subsection with count-asserted single-occurrence substitutions
# (scratchpad rs3/specs/*.py through rs3/lib.py); every untouched line is verbatim.
#
# ASSEMBLER HAND-OFF
# (1) RESTATED ROWS. The protocol only appends rows, so the J-ROWS and RATIONALE-A blocks carry restated rows under
#     their existing ids: J-A17.01 (index and Part A) and J-A20.01 (Part A only — its index row stands unchanged).
#     apply-blocks.py appends them and notes "DUPLICATE ID inserted"; move each appended row into the older row's place
#     and delete the older row, so one row per id remains (assemble-r1-handoff.py's swap_restated, as
#     assemble-r2-handoff.py step 1 runs it). The audit's part_a_without_j_rows will list J-A20.01: expected. No new id.
# (2) CROSS-PART DEPENDENCIES (text this file cites that another round-3 file installs; all apply in the same assembly):
#     T20-6's epoch clause — repair-r3-pipeline.md's §4.11 paragraph *Dossier content across epochs* (VD2-02) and
#     repair-r3-determinism.md's §7.7 item 2 refusal list and §5.3 dossier row (VD2-01);
#     T19-4 — repair-r3-pipeline.md's §4.7 *Households per building* (VP2-01, J-A28.46);
#     T11-1 — repair-r3-pipeline.md's II.6 stretch split (VP2-04) and repair-r3-determinism.md's §6.3 SPLIT rule (VP2-05);
#     T30-2 and §13.7's item-30 row — repair-r3-pipeline.md's §4.6 target reading (VAL-02);
#     T31-9 and T31-11 — repair-r3-determinism.md's §5.3 epoch row (VD2-04);
#     §13.1's seed-clip and three-side clauses — repair-r3-kernel.md's §3.4 (VK2-02, VK2-04).
# (3) This file REPLACEs the one-page summary, §0.2, §1.1, §13.1, §13.2, §13.7, §15.2, §16 and the Staged list
#     (scope-owned); no other round-3 file replaces them.

=== REPLACE ## The whole design in one page (plain words) ===
## The whole design in one page (plain words)

We are building one program that draws believable medieval towns and cities at three sizes — town, city and
metropolis — with the size inside each set by the requested population (§1.1). It works the way watabou's Medieval
Fantasy City Generator (MFCG) and Thomas Allerton's Fantasy Town Generator (FTG) do, takes the better idea from each
at every step and adds our own measured improvements (§1.4). After the base, the same program opens any district as a
detailed neighbourhood close-up (stage 2, PART II). Manor-style buildings, a separate village generator (thorp →
hamlet → village), sewers and floating islands, the town's evolution over decades, calibration against historical maps
and SettlementForge inputs follow by the owner's roadmap; the base carries their hooks now, and nothing else is
postponed (*Staged by the owner's roadmap*).

**How a town is made** (§4). *Ground:* a real heightfield in metres with water that flows downhill, so rivers always
reach the sea and coasts agree with the contours. *Demand:* from the population, our own tables decide the houses,
workshops, inns, churches and institutions the town needs, and the land they take, before any street is drawn.
*Big decisions:* the markets, the castle and the large precincts are reserved; the main roads to the gates are
solved first; the first wall follows the town's edge measured along them, with a gate wherever a main road crosses it;
each later wall ring is traced before the streets it encloses grow; rivers, moats and canals are bridged where roads
cross them; a strip along every wall stays free of houses and lanes. *Streets:* main roads run between real
destinations over the terrain; inside the walls the lanes are cut by the "bent cut" that gives watabou's maps their
charm (one bend, arriving square), measured from Neighbourhood's recordings; outside the walls side streets grow along
the main roads as FTG's do. *Districts:* groups of blocks named for their market, gate, harbour or castle and merged
into named quarters at city zoom, shaped by a prosperity field — a smooth gradient, not a switch — that rises near the
centre, the markets and high dry ground and falls near tanneries, walls and damp low ground. *Plots:* every block is
divided from its street frontage into parcels; rich quarters join plots into fewer, larger ones with courts and
gardens, poor quarters split them and get alleys. *Buildings:* each plot gets a site plan — a row house with party
walls, a manor behind its yard with outbuildings, a detached house, a hovel — and every building stores its heights,
so the optional shadows and the 3-D export read real heights. *Finishing:* towers, bridges, the harbour, fields and
woods sized to the population, greenery placed by rules that read prosperity, and names and curved labels that never
cover a gate or a keep. The rules themselves are data tables that can be read, edited and later calibrated.

**What you see** (§8, §11, §12). One display list draws the town as a clean ink map (the default, in MFCG's family),
as a textured lit map like FTG's, or as a hatched close-up like Neighbourhood's — all on one drawing path — and exports
it to SVG, PNG, GeoJSON, virtual-tabletop scenes and 3-D; a large print is made in the background without holding up
the map. The first picture is always the finished map, never a rough preview: under a second for every town and city
and for a metropolis of up to about 48 000 people, about 2.3 seconds at the 120 000 cap (§12.5). Building the model
meets the improvement plan's speed bars (100 ms, 300 ms, 1 s) in 19 runs of 20 up to about 4 500, 17 700 and 58 800
people (§12.3); larger towns take longer, and both misses are declared for the owner's veto (D-18).

**Editing** (§7). Every element and every rule table can be changed, and names, functions or shapes can be assigned to
buildings and quarters. Edits are events on permanent addresses: they survive regeneration and version upgrades, undo
works for several people sharing a town and after the file is reopened, and the generator repairs around an edit
locally instead of re-rolling the town — moving a river or dragging the ground changes nothing outside the blocks the
edit names beforehand, and names follow the things they name and change only after you confirm. A saved town is
editable as soon as a quick fingerprint check passes, while a full check from its recipe runs in the background
(§2.9).

**Guarantees** (§5, §6). The same seed gives the same town on every machine; adding a new kind of decoration,
re-rolling one block or growing the town never reshuffles what already exists; a release that changes how a step works
declares the change, stage by stage. There is no whole-map retry: every step that can fail has a short, bounded
fallback ladder, and the report says for every requested feature whether it was delivered in full, simplified or left
out.

**How we know it works** (§13, §16). The riskiest part — whether grown streets and bent-cut lanes fit together within
the speed budget — is measured first, in a spike, and again on real terrain and water at the first milestone. Every
acceptance number says whether it checks that a rule was followed, compares us with a measured MFCG or FTG number, or
shows that the town is better. The owner judges side-by-sides through a written, blind protocol at matched sizes; a
milestone the owner has not rated keeps building but never claims "at parity" or "mastered". The first product
milestone is a viewable town; editing comes directly after it, because the owner ranks editability first. The effort
is about 166–220 expert person-weeks (§16).

**Clean room** (§17). The programmers work from this document and a cleaned digest of the research — never from the
references' code, word lists or palettes — and every library is permissively licensed, so the owner keeps every
licensing choice.

**The owner's later rules (amendments b, 2026-09-25 to 27), in one paragraph.** Items 8–31 of the second amendments file
refine the picture above without changing its bones; their landing rows, with the file's name, are §0.2. A town has several markets — one
principal market sited where trade meets, usually the plaza, and secondary markets and churches by size, as MFCG and FTG
have them (§4.2). Every rule's default reproduces what MFCG or
FTG does where they have the behaviour, and our extensions ride on top as table values with a weight, a chance or an
option (§7.6). A building gets several doors when its plot gives it a lane or a yard, and a cellar where its class, its
ground and its wealth say (§2.6). Some plots hide behind passages and courts — reachable yet unseen from any street — and
a place's name can be known only locally or secretly while the place itself is always drawn (§4.6, §9.2).
Assignments obey relation and supply-chain rules through one placement solver, and a building whose designation changes
mutates instead of re-rolling (§4.7). When a quarter grows rich or poor its stock persists — use and occupancy change
first, tenure and yards later, geometry only on vacancy, ruin or redevelopment — and until one of those a plot's
geometry never reads poorer than the middle band once it was built to that band or above (§4.11); its interior has no such floor: the same
shells are re-cut inside for the households that live there, from one family with small staff rooms down to single rooms
off a corridor (§2.6), which is where the poor live when every quarter is developed. Decline and regrowth, floating
islands, the sewers with their underground neighbourhoods and slow terrain change are hooks the base carries for the
staged engines (§4.11, II.6, II.7). SettlementForge's dossier is the authority: the map never edits it, a map delete of
a dossier element is a placement rejection the solver re-places, and a dossier change mutates the existing map (§7.7).
The module stays private for now, a separate program talking to its host through data alone (§11.3, §17.3, D-22).

=== REPLACE ### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`) ===
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
| 11 the underground fades like the walls | home II.6 — the tunnel ladder (in use, silted, caved in, collapsed or sealed), never demolished by the engine, reopened by growth; the `underground` persistence row and the tunnel kinds in §4.11; a tunnel's condition, read from `existence` and `Tunnel.closure` (§2.7, §2.8; J-A11.21); hand edits in §7.1 and §7.4; the styles in §8.2 and the layer in §8.4; test T11-1; D-25; the staged rows | II.6 |
| 12 underground neighbourhoods along the sewers | home II.7.3 — the owner's three rules as the invariants U1 to U3; the occupants, the cut on the underground arena, the surface constraint, access points, depth, lifecycle and order; the interfaces `UndergroundStrategy`, `AccessPoint` and `UndergroundRule` in II.7.4; `drawTunnel` and `placeAccess` by hand in §7.1 and §7.4 (J-A12.71); the arena's levels (§2.1, then §2.2); `ContextVector.arena`, `Tunnel.navigable` and `headroomCm` in §2.5 to §2.7; `corridorUnion` over `tunnel` chains in §3.7 and the arenas' isolation in §3.4 and §3.10 (J-A12.31, J-A12.32); F-UNDER in §5.2 and the U rows in §5.3; a concern in §6.1; the layer in §8.4 and the exports in §11.1; fixtures in §13.1 and test T12-1; the registry map in §14; the staged row | II.7.3 |
| 13 floating islands only in cities and metropolises | home II.6 (2) — the rung gate, read at generation and at every epoch; the `layers.islands` column of `RungProfile` (§1.1); the village rows `none` (PART III); the sky allocation of §4.5 S7b (5); a band crossing runs the ladder (§4.11); the control disabled below CITY (§7.8); test T13-1; D-3 and D-33 | II.6 (2) |
| 14 sewers by tier | home II.7.1 — existence by tier: a TOWN law of population and wealth, always at CITY and METROPOLIS, never below TOWN; the toggle is visibility; the `drain` rule; the `layers.sewers` column of `RungProfile` (§1.1); the one-click default (§1.2); the S0 draw and `Features.sewers` (§4.2); PART III; a concern in §6.1; the control in §7.8; the layer in §8.4; test T14-1; D-3 | II.7.1 |
| 15 not every city has islands | home II.6 (1) and (4) — a model setting off by default; the count 0 to 3 drawn on `island.place` through ordered slots weighted by supply; the view toggle shows islands and never creates them; the sky allocation of §4.5 S7b (5); the draw in §6.1; the control in §7.8; the layer in §8.4; test T15-1; D-3 | II.6 |
| 16 assignments obey spatial and supply-chain rules | home §4.7 S10b — the one placement solver: HARD and SOFT relation rules, supply edges with distance and mode, joins where the use needs land, relocation of the displaced as a local recorded repair, infeasibility reported with the closest options; the relation templates and supply edges as class and roster data (§10.2) and S2's need propagation (§4.2); `PlacementCriteria` as per-assignment overrides in §7.7, with §7.3 and F-SITING in §5.2; the context vector of §2.5; the budget row of §12.4; tests T16-1 to T16-4; the corpus re-signing of §13.9 (5); the solver's package in §14; O7 (b), O10 (e) and hooks row 3 of §15.2; priced in §16; D-32 (J-A16.44) | §4.7 S10b |
| 17 uses move as the city grows and declines | home §4.11 — the epoch's use step: re-scoring against item 16's rules and the current distribution, inertia, traces of former uses, pinned assignments that stay, and `UseConversionOp`; the `Use` record with `Building.use` and `formerUses` and the use lifecycle in §2.6 to §2.8; a use's address in §6.3; `openUse`, `closeUse` and `relocateUse` by hand in §7.1 and §7.4; members move with their use unless pinned (§7.7); households follow in §10.3; the report to the host in §11.3; tests T17-1 to T17-3; D-25; the staged evolution row | §4.11 |
| 18 a plot's buildings mutate to match a new designation | home §4.7 S11 — the designation mutator: match, order and draws, land, protection, record and reversal, timing, one path; addressable parts (§2.5) and `MutationRecord` (§2.6); the epoch-spread form in §4.11; the concern `siteplan.mutate` in §6.1 and the minted parts in §6.3; every `assign` runs the solver and the mutator, undo being the inverse mutation (§7.3, §7.4 and §7.7); tests T18-1 to T18-4; the mutator's package in §14; priced in §16 | §4.7 S11 |
| 19 every designation scales with prosperity | home §4.7 S11 — the designation-template table by class and band, interpolated along the field, its shape columns reading the manifested band and its use and condition columns the field band; `ClassRules.pick` reads it and the Materials paragraph holds the material rule (FTG's default model, the optional regional shift, texture and colour only, never shape) in §2.6; the specialisation rows in §10.2; the colour roles in §8.2; the drift bounds in §7.7; the buildings row of §1.4; tests T19-1 to T19-4; priced in §16; D-2 | §4.7 S11 |
| 20 one-way data flow; the dossier is the authority | home §7.7 — dossier-backed existence, the rejection record and its lapse, positive placement, re-application, the precedence line; `rejectSite` and `placeAt` in §7.1 (a `delete` of dossier content is a rejection), with §7.2 and §7.4, the ladders of §5.2, the invariant of §5.3 and the report of §5.4; `Rejection` in the registry and `Identity.dossier`, a `DossierRef` (§7.1) carried by the entity the element is (§2.8, J-A20.22), dossier events in the log (§2.9); the `dossier` and `positive` requests and the least-disruption order in §4.7 S10b, the lapse at an epoch and *Dossier content across epochs* — a dossier-backed use relocated before an epoch's step could close it or leave it without its building (J-A20.43) — in §4.11; the one-way door, with no message that writes the dossier, in §11.3 and §11.4; the summary; tests T20-1 to T20-6; the engine in §14; O10 (i) of §15.2; priced in §16; the staged SettlementForge row | §7.7 |
| 21 licence | SATISFIED by the owner's ruling of 2026-09-27 (private for now; J-A21.01): §17.3 and D-22 unchanged; §17.1 (1) unchanged — it already admits no TownGeneratorOS code; permissive-only dependencies (§17.4) unchanged; the separate program with its data-only bridge (§11.3) retained by choice, not by licence; §3.1's skeleton row keeps CGAL's licence ground (J-A21.31) | §17.3 |
| 22 dossier changes mutate the existing map, never re-roll it | home §7.7 — dossier events as mutations with least disruption, `DisruptionBudgetRow`, the report, vacancy on removal, continuity over path-independence; two histories may give two valid maps (§6.2); the budget's scope in §7.3 and the report in §5.4; the log in §2.9; each dossier element present from a new map's first generation (§4.2 S2), the search order in §4.7 S10b, a mid-history dossier event folded at its epoch (§4.11); the host door in §11.3 and §11.4; tests T22-1 to T22-4; the staged rows | §7.7 |
| 23 emulation-first defaults; no hard-coded universals | home §7.6 — the defaults layer is the emulation baseline: a default cell's `provenance.source` names the reference behaviour, an extension carries the `extension` marker with its chance, weight or option, an absolute reads as a default table value, and the parity presets `MFCG` and `FTG` switch every extension off; a pointer from §1.4; the provenance values of §17.1 (6); `RelationRule.extension` in §4.1 and §4.7 S10b; test T23-1; the parity presets inside §13.5's bands and on the D-5 panel's MFCG and FTG pairs (§13.6 (3), J-A23.02); priced at M1 in §16 | §7.6 |
| 24 several markets, as MFCG and FTG already do | home §4.2 — S2's market demand (N markets by size) and S3 (12)'s principal-market score by trade convergence, secondary markets never touching another and on small patches; the destinations, seeds and stalls of §4.3 to §4.5, §4.7 and §10.2; `Reservation.rank` and the nearest-market distance in §2.5; a market's `rank` edited by `setAttr` in §7.1 (J-A24.71); the summary; the centre row of §1.4; tests T24-1 to T24-3; the parity rows of §13.5 and the threshold of §13.7; D-16 and D-17 | §4.2 |
| 25 terrain and water can change, slowly | home §4.11 — `reclaim`, `siltReach`, `shiftCourse` and `digCanal` as the slowest layer's rows of the decline table, repaired by S1's terrain or water operator or the carve (§7.3 (a), (b); §4.11); what each changes in §2.3 and `LandUse.reclaimed` in §2.7; by hand and undoable in §7.1 and §7.4, through §7.3 (a) and (b); a concern in §6.1; test T25-1; D-25; the staged evolution row | §4.11 |
| 26 the hinterland is decided with the town, drawn after it | home §4.9 — FTG's order and its farmland modes chosen by size and landscape (`FarmModeRow`), the fuel and timber rows beside the farm table, the extent following demand, the arable reserve off by default; the demand rows (§4.2 S2, §10.2); the execution order (§4.1 and §4.4); the hinterland row of §1.4; tests T26-1 to T26-3; O14 (h) of §15.2; priced in §16 | §4.9 |
| 27 prosperity maps onto the references' wealth models | home §4.5 — the default band set: FTG's six lifestyle tiers with their shares, MFCG's ward-class shares as band targets, the shanty trigger, and `FieldBands.middle` as the band of the median household, the continuous gradient being our extension; the band-keyed rows of §10.2, §4.7 and §4.9; `FieldBands.bands` and `middle` in §2.5; the districts row of §1.4; tests T27-1 and T27-2; the descriptive rows of §13.5 | §4.5 |
| 28 floor plans and elaboration by click; (f) the interior has no floor | home §2.6 — the fourth rung, `plan`: the room programme first (from the designation, the occupants' band and the household count, never the geometry floor), the partition fitted to it one wing at a time around a stair core placed ahead of any cut, coherence with the exterior, the entrance set and basement consumed; the interior ladder's rule table by band, the dwelling unit with its own door, the re-cut as item 18's mutation within unchanged wing rings, and the shell's household capacity; `ElaborationRecord` per rung (absent, current, stale, edited) with `Document.elaborations` outside both digests and the `elaborate` view key (§2.8, §2.9); click → rung and the pre-assignment in §4.1; `RoomProgramRow`, `RoomRuleRow.scope` and the template's `households` in §4.7 S11 and §10.2, the generation fill — households per slot at S10b, `Building.households` clamped to the capacity at S11 and the overflow re-placed inside the district — in §4.7 (J-A28.46), the occupants' band memory `Plot.fieldBand` in §2.5 (J-A28.29), `relet` in §4.11 rung 1; the close-ups of II.4 and II.5; the transient arena and the re-cut (§3.4, with `ArenaKey` in §3.3); the `spine` reader (§3.8); the seed-tiling row (§3.10); F-PLAN (§5.2); the invariants (§5.3); the `plan.*` concerns keyed by the rung's reroll in §6.1, the pure-function rule of §6.2, the click-order identity of §6.5 (9); the seven plan events, `setRoomUnit` and the rung re-roll of `regenerate` in §7.1, with §7.3 and §7.4; the draw and the change marker (§8.2, §8.5), the cache (§8.6), the export (§11.1), the budgets (§12.7, §12.8); the summary; the stage table (§1.1); the one-click default (§1.2); fixtures in §13.1 and tests T28-1 to T28-19; the soft bands of §13.7; the plan step's package in §14; priced in §16; the staged stage-3 row | §2.6 |
| 29 entrances and basements | home §2.6 — `entrances: Entrance[]` with roles and faces under the five rules; `Basement` derived from the class rows, the terrain gate of §2.3, prosperity and size, inside and smaller than the storey above it, its storey in `Heights`; a cellar never joins a sewer as a room, a cellar stair to a tunnel being an `AccessPoint` (II.7.3); the indexed vertex role of §2.2 rule 7 and the slot of §2.5; the placement in §4.7 S11 with the entrance and cellar columns of §10.2, and when an alley presents itself in §4.6; the invariants of §5.3, the concern `siteplan.entrance` in §6.1, `setEntrance` in §7.1, with §7.3 and §7.4; the glyphs and exports in §8.2, §8.5 and §11.1; the buildings row of §1.4; tests T29-1 to T29-5; the note in §13.5; O5 (f) and O17 (j) of §15.2; priced in §16 | §2.6 |
| 30 hidden plots and clandestine places | home §4.6 — S8's hidden-share and reach rows by band and density, `exposure` derived by adjacency to a public way, the passage choice — the cut making the `passage` L3 face in §4.7 S10; a second home in §9.2 for the knowledge label policy; `Plot.exposure`, `Block.reach`, `knownTo` on plot, building and institution and `BaseWing.spans`, which a composed wing inherits (J-A30.23), in §2.4 to §2.6, `sealed` in §2.8, the viewer's knowledge key in §2.9; the nesting paragraph of §3.10 (J-A30.31) and the passage room as a fixed ring in §3.4; a secret institution's preference in §4.7 S10b, densification, clearance, `sealPassage` and `openPassage` in §4.11, none by default in PART III; F-PLOT in §5.2 and chain reachability in §5.3; the concern `cut.interior` in §6.1; the edits in §7.1 and §7.4 and the dossier fact in §7.7; the glyph, the court tone and the exports in §8.3, §8.5 and §11.1 to §11.4; the summary; tests T30-1 to T30-5; the parity row of §13.5 and the threshold of §13.7; the gazetteer in §14; O5 (a) and O18 of §15.2; priced in §16; the staged evolution row | §4.6; §9.2 |
| 31 prosperity change drives fusion and splitting — a slow, asymmetric ladder with a geometry floor | home §4.11 — Survivors: the DUE trigger with hysteresis; the three rungs (use and occupancy, tenure and yards, geometry only on vacancy, ruin or redevelopment); no occupied building removed by a band change; durations by direction and by the stock's replaceability; churn caps; `LadderOp`; and the geometry floor — `geometryFloor = min(builtBand, the settlement's middle band)`, the manifested band and value; the fusion and splitting orderings in §4.7 S10 (7) and the mutator in S11; `FieldBands.middle` and the DUE trigger in §4.5, the back courts of §4.6, the yards of §4.9, `replaceability` and `households` in §10.2, households in §10.3; the close-ups of II.1 and II.3; `Block.due`, `Plot.builtBand` and `builtProsperity` in §2.5, `households` and `condition` in §2.6, the memories told apart in §2.8; lineage through fusion and splitting in §6.1 and §6.3; `relet`, `densify`, `thin`, split and join as re-cuts and `builtBand`'s lifecycle (§7.1, §7.2, §7.4), with §7.3, §7.5 and `WealthLadderTable` in §7.6; the ladders and invariants of §5.2 and §5.3; the condition classes of §8.2; the summary; tests T31-1 to T31-12; `wealthLadder.json` in §14; O18 (g) of §15.2; priced in §16; D-25; the staged evolution row | §4.11 |

=== REPLACE ### 1.1 What is built, in what order; the two size ladders ===
### 1.1 What is built, in what order; the two size ladders

| stage | what | depth in this document |
|---|---|---|
| **STAGE 1 — the BASE** (built first) | one general town/city generator on the ladder **TOWN → CITY → METROPOLIS**, fusing MFCG-class and FTG-class generation plus O1–O19 (§15.2): the plot model, plot granularity, the prosperity field, greenery, heights, editability, permanent addresses, layers, drainage, every owner hook, and the optional content module `@plat/sim` (its own milestone, M4b) | build-ready: §2–§14, §16 |
| **STAGE 2** (built in this program at M5, after the base) | the same town composed of NG-class neighbourhood close-ups with consistent seams, shared seeds and one style system | interface depth: PART II; what the base must already carry is a base requirement (§2.5, §4.12) |
| the later stages of the owner's roadmap | stage-3 building compositions with their floor plans elaborated by click (the plan rung, §2.6), the village product, sewers with their underground neighbourhoods and floating islands (II.6, II.7), the evolution engine — decline and regrowth, use relocation, the wealth ladder, slow terrain change (§4.11) — corpus calibration, SettlementForge inputs (the mapping of its data onto the dossier contract, which the base builds, §7.7, §11.4) | hooks only — the one list is *Staged by the owner's roadmap* |

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
  rung: 'TOWN'|'CITY'|'METROPOLIS' /* the base's rows; the village product adds 'THORP'|'HAMLET'|'VILLAGE' rows of this type (PART III (5)), their layers 'none' and 'never' */;
  populationBand: [number, number]; populationTarget: number;           // the band chooses the rung; the target is the default request
  frameAreaKm2AtTarget: number; aspect: [number, number] /* 0.5–2; square by default */;   // the frame scales with the requested population (§3.2 (9))
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

=== REPLACE ### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test ===
### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test

Every kernel primitive is fuzzed with two input families, held to one bar — **0 crashes, 0 hangs (hard timeout), 0
invalid outputs** (no self-intersecting output, no undeclared sliver) — at the sizes of §13.8's tiers.

1. **Random inputs** (`fast-check`): concave, holed, thin, near-collinear, self-touching, snapped, duplicated-vertex,
   ≥ 300-vertex and zero-area polygons and chains.
2. **Constructive degeneracies.** Random sampling almost never lands on an exact degeneracy — a line across a 2²⁴ frame
   holds at most 2²⁴ of its 2⁴⁸ lattice points, so a random third point is collinear with probability ≤ 2⁻²⁴ — so every
   degenerate class is built on purpose from random parameters:
   * *geometry classes:* lattice points exactly on a segment, placed by gcd stepping (`p₀ + k · d / gcd(dx, dy)`);
     collinear triples and collinear overlapping edges (shared runs from 1 cm to the whole edge, same and opposite
     direction); cuts through a vertex and cuts grazing a reflex vertex (through it, and offset by 0 and ± 1 lattice
     unit); antennae (chains dangling into a face) and chains touching a boundary at one point; coincident typed chains
     — a wall on a bank, a quay on a shore, a street on a district boundary, a track on a field boundary; rectangles,
     squares and regular n-gons (n = 3 … 12) rotated by random angles and snapped; holes touching the outer ring at a
     vertex and along an edge, and holes touching each other; simultaneous skeleton events (regular polygons,
     equal-sided rectangles, symmetric notches); star rings of radius 2²³ − 2 (`area2` exact);
   * *quantisation:* half-centimetre ties before snapping and ± (2²³ − 1); values `snap` must refuse (± 2²³, NaN, ± ∞);
   * *attraction and moves:* a vertex at (20, 20) against the edge (0, 0)–(1 000, 0) moves onto (0, 0), leaving no
     sub-`minEdge` edge; a chain crossing an edge next to a vertex standing 25.0–25.7 cm from it; a stretch whose join
     point lies within `attractCm` of an edge endpoint; a `pinch` that would shorten an edge below `minEdge` and a step
     that would put two vertices on one lattice point (both halve); a `warp` with `fromLevel = 1` over a street ending
     on a shore (the junction slides along the shore and the step commits); a warp moving a kerb beside a vertex 25.3 cm
     from it — the kerb (0, 0)–(1 000, 9) past (517, 30) — commits, its re-seated vertex placed by the placement rule
     (`fixall_kernel_r3_checks.out` A); a warp re-seating two Steiner vertices whose projections lie within `minEdge` +
     1 cm of each other gives identical output after a slot renumbering (the two placement orders differ in 6.8 % of
     such pairs, `fixall_kernel_r4_checks.out` B); a warp over a locked plot and over a pinned building holds every
     corner (a neighbour's footprint corner on the locked plot's line slides); a `warp` with `fromLevel = 1` over
     finished fabric gives 0 `E_KEPT`, and over a generated and an edited water gate moves neither gate's bank vertices;
     a warp over a spine carrying a same-level T-junction, and one moving the spine's vertices around the unmoved
     junction, then the lane removed — the junction stays a shape vertex of the warped spine; a warp that re-seats a
     Steiner vertex, then `clearFiner` — the vertex dissolves and the coarser edge is restored exactly;
   * *kept content, carves and water edits* (§3.3's clear regions, §4.11's footprints): an L1 lane into a face holding
     kept L3 content of an earlier stage (`E_KEPT`); a canal across a CITY district that cuts a lane whose remainder is
     pruned and re-routes a `primary` — every face outside its footprint (the channel buffer ∪ every L1 cell its way
     rule touches) byte-identical except the seam exception at its boundary, its L0 channel attracting onto exactly its
     prepared vertices (each promoted, no other finer vertex promoted), each deck carrying `deck` beside `way` in §2.2
     rule 7's form (the kept way's own L1 edge, no L0 edge across the channel); a course-knot move and a river move
     across a street grid, with the same footprint and contact assertions (§7.3 (b)); a canal crossing a walled CITY's
     wall between two towers — no `E_KEPT`, no `E_LEVEL`, every face outside the footprint (the old run's strip-line
     stretches and the new strips' ground included) byte-identical less the seam exception, every way the new strips
     meet cut at their boundary, the water gate's `Gate.banks` on its two `gate_end` vertices; an outer moat carved at
     S5a (§4.4) — every face outside its footprint byte-identical less the seam exception, attraction onto exactly its
     prepared vertices, every indexed role unique per ordinal and no contact name left; a carve chain that touches a
     finer edge away from its prepared vertices (`E_LEVEL` inside the clear region, `E_KEPT` outside); a canal across an
     open enceinte's glacis line and a river moved through a walled town — every indexed role unique per ordinal
     (§3.10), `Gate.banks` resolving to its two `gate_end` vertices, no `anchor` contact name left; a river moved away
     from a quay-lined and a walled bank — the quay and wall edges back at L1, the L0 view land and water only, a deck
     left over land at the way's level after F-REDERIVE (before it, at the level of its `deck_end` rows, with no L0 edge
     at it), its bank vertices unpinned; a deck whose bank vertex also carries a width knot, removed by F-REDERIVE — the
     vertex ends unpinned, its knot kept; new water across a corner of the frame — the border's stretch between its two
     contact points, the corner included, unchanged and closed; a declared preparation batch placing two contact names
     on one entity, its ops permuted — identical ordinals;
   * *removals, profiles and neighbour steps:* a lane removed from a spine it ended on — the spine's chain restored
     exactly, its own shape vertices untouched (the `split` flag, §2.2 rule 3); an S8 T-junction on a spine with a
     width profile — every sampled half-width unchanged; a way split between two width knots — every sampled half-width
     within 10⁻⁹ cm of its value before — then re-joined, giving the original profile bit for bit; a stretch of a way
     removed between two junctions and a stretch of a ring removed between two anchors — the rest of each chain
     unchanged, every remaining profile sample within 10⁻⁹ cm of its value before and every other role unchanged
     (`fixall_kernel_r4_checks.out` C); a removal that leaves a way in two parts without a `rekey`, refused by role
     consistency; II.1 (3)'s neighbour step beside finished plots — a plot-line end within `attractCm` of the foot
     (promoted; every plot ring unchanged) and one farther (a kerb split; each ring equal to its prior ring with the
     vertex removed) — then the street removed again, by an undo and by a reroll, at a promoted plot-line end and at a
     promoted footprint corner: the kerb's L2 route, index and digest and the block's, the plot's and the wing rings
     equal to those before the step; two neighbour steps on one kerb edge, the first street removed by a reroll — its
     plot-line end back at L3 and the kerb's L2 route equal to the route with only the second step
     (`fixall_kernel_r5_checks.out` A); a promotion that leaves another finer vertex 1.2 cm from its new route edge
     commits with no `E_INVARIANT`, and every index query whose box meets that vertex returns it;
   * *indexes, slots and the pool:* a pool overlay writing outside its district (`E_SCOPE`); a logged `moveVertex`
     replayed after an upgrade that puts an unrelated vertex 20 cm from its position — bound to the signature-matching
     vertex or orphaned, never to the unrelated one; a slot freed and reused inside a stage — the query returns the new
     item; a slot freed in one district and reused in another, the second district's partition rebuilt before the
     first's — returned as its new item, never as its old one; after a neighbour step and its removal by a reroll with
     no partition rebuilt in between, level-2 and level-3 queries over the kerb return exactly what they return after a
     rebuild; a `drawBoundary` that moves a kept block from district A to district B, B's partitions rebuilt before
     A's — every L3 query over the block returns each plot once, before and after A's rebuild; an L3 query in a block
     before and after S11 derives L4 there (two plots sharing their lowest-leftmost vertex with an L4 vertex on their
     shared edge) returns its results in the same order (`fixall_kernel_r3_checks.out` C); a pooled district beside
     the settlement perimeter commits plot lines ending on the backland part's inner edge with 0 unresolved crossings
     at pool sizes 0 and 3, and every freeze finds every dynamic grid and tombstone set empty after its rebuild (§3.3
     pool step 1); the frozen copy sent to a pool worker holds typed arrays only — no `Map` or `Set` reachable from the
     message;
   * *straight-skeleton fixtures (M0):* squares and rectangles at every centidegree 0°–90°; regular n-gons n = 3 … 64;
     equal-width strips; rotated L, T and U shapes; near-rectangles with a notch on a long side, which take the skeleton
     path and pass the validator (a 20 × 10 m rectangle with a 3 × 2 m notch: no roof line outside); 1 000 holed
     polygons; snapped rotated squares; plus B-CITY-lite's irregular footprints and district and water faces.

**Properties** (checked after every operation): output simple; nesting by index (every face inside its parent); no edge
shorter than `minEdge` from any writer, after every insertion and every warp step, and clearance ≥ `minEdge`; Euler
characteristic after every insertion; `remove(insert(x)) ≡ id` on the topology; **`splitFace` children tile the parent
exactly at the child level (integer `area2` equality)**; `mergeFaces ∘ splitFace` restores the ring and the id;
`corridorUnion` faces disjoint and covering; `offset(−d) ∘ offset(+d)` ⊆ original and `insetRing` empties monotonically;
**every straight-skeleton output passes the §3.8 validator — a connected graph inside the face whose number of
independent cycles equals the number of holes — or is a reported downgrade**; OBB contains the hull and collinear input
returns `E_DEGENERATE`; LIR inside the face; snap rounding idempotent and terminating within its bound; the `orient2d`
sign equal to a BigInt reference on adversarial triples; Poisson minimum distance ≥ r; differential agreement with the
CI oracles (Clipper2-WASM in Node, `polygon-clipping`) on booleans, `tileRings` (each ring's pieces against the oracle's result for that ring less every earlier ring) and buffers, split by attraction (§3.7) — unattracted
cases with equal face counts and symmetric difference ≤ perimeter × 1 cm, attracted cases valid and within perimeter ×
√2 · `attractCm`, the harness reporting both shares per operation and drawing ≥ 10⁵ unattracted cases per operation;
roles preserved on coincident chains (a sliver between a spine and a shore keeps both); a declared batch's result
identical under any permutation of its ops (the callback-form test is §13.2's); renumbering the arena's slots gives
identical output; `clearFiner` after a refinement restores the coarser level exactly; mandatory chains never rejected
for precision; 0 stale references after every batch; every index query's answer identical before and after a rebuild of
the partitions it reads (§3.3); after every removal each edge's level is the lowest among its rows and no vertex is
coarser than every edge and role at it (§3.10's level-consistency row); save → load → save byte-identical and the loaded
arena passing every hard invariant (§3.9, §3.10); a 3 000 m relief fixture with a hill-acropolis site stores without a
clamp and D8 is defined on 100 % of the hydrology grid's land cells over frame and margin (§2.3); every routine returns
a typed result on the pathological corpus.

**Ladder coverage:** every rung of every ladder in §5.2 is reachable by a fixture, and each downgrade (medial axis, the
plain-roof downgrade, straight cut, substitution) is exercised; no roof line lies outside its footprint; 0 crashes on
the 1 000 holed polygons; a skeleton failure is never a crash and never a visual surprise.

**Fixtures added by amendments b (items 12 and 28; the kernel's rows in §3.4, in §3.7 and in §3.10).** *The underground
arena* (II.7): `corridorUnion` over a fixture of `tunnel` chains, where the kerb is the tunnel's external wall — a plot
line ending on it lands by attraction, and a tunnel junction yields wedges like a street junction. *The transient arena*
(the composition rungs', §3.4): the seed-tiling `area2` identity after random partitions of rect, L, T and curved-quad rings, a
rotated T's two wings, its stem crossing one side of the bar twice, clipped to tile as the faces of one overlay
(§3.4's seed clip) — every crossing vertex a vertex of both rings, the joint shared vertex for vertex, and the seeds
accepted; `tileRings` on a ring the earlier rings cover (no piece), on one they cut in two (two pieces, each simple and
counter-clockwise) and on an earlier ring wholly inside a later one (refused, `E_DEGENERATE`, detail `overlap`, naming
a vertex of the hole); a side two seed rings share becoming one edge; a seed vertex within the hot pixel
of another ring's side splitting that side, and one 20 cm from it refused with `E_DEGENERATE` (detail `seed`), the
construction moving nothing; overlapping seed rings, and a fixed ring outside the seeds or across a seed ring's side,
refused with `E_DEGENERATE` (detail `overlap`); a fixed bay with a slit and a cut; `mergeFaces` across a seed edge
refused with `E_STRUCTURAL`; the `readBack` order identical after a slot renumbering. *The re-cut* (item 28 (f)): the arena opened from the same seed rings with three kept
rooms and a chimney-stack ring on a partition wall passed as `fixed` — the kept rings and the stack ring come back as the
same polygons — every input vertex unmoved and in order, any added vertex within the hot pixel of one of their
sides — including a kept vertex split 25.3–25.9 cm from a seed corner in the earlier arena (the exact insertion,
§3.4) and a kept room on a rotated rect wing whose outer side four unkept walls split in the earlier arena
before the room's corners were placed on it, accepted with every corner within the hot pixel of that side's straight
line (the input sides as the arena's routes, §3.4); where a kept room's side lies along a joint, an unkept wall ending
on it, its end within the hot pixel of each of the three input sides it lies on; the faces' `area2` sum equals the seed rings' sum and the
stack's wall segment survives; a second call with no kept rooms reproduces the first cut.

=== REPLACE ### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===
### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

* **Invariants.** The §5.3 suite runs by scope — batch-local invariants per batch, stage-end invariants per stage,
  save / load invariants per document, CI-only invariants (§5.3's digest-maintenance oracle among them, on every
  B-CITY-lite city) in the harness — on B-CITY: 1 000 seeds × the 4 `WaterSetting`s of §13.3 × 3 rungs in the nightly
  tier, 50 seeds per rung in the PR tier (§13.8), all three rungs from M1 (§1.1). Each invariant has an id, a severity,
  a count in the report and a CI threshold: hard = 0 per 1 000 cities; soft within its band.
* **The statistics record.** The **core record** is O(n) and is emitted by every generation within 4 ms at CITY
  (§12.4): counts per entity kind and class; areas per class and band; fixed-bin histograms per district and band of
  plot area, frontage, depth, footprint area and storeys; way length per class; the junction-degree histogram; turning
  per 100 m on ways resampled at 10 m; the walled share and built extent; ladder uses per cause and rung; every
  requested feature's delivery tier (§5.1 principle 7); stage timings. The **bench metrics** — detour index over sampled
  destination pairs, Moran's I, KS distances, junction-to-junction runs, orientation coherence and wall alignment,
  figure-ground metrics on renders (§8.5), tree nearest-neighbour and pair-correlation statistics computed from §8.10's
  stamped scatter — run through `stats(doc, { level: 'bench' })` on demand or in the bench, never on the one-click path.
* **Cost-model tests.** Each stage is timed on **nine sizes — three per rung: the band's bottom, its target and its
  top** — 1 500, 5 000 and 9 900 (TOWN); 10 000, 20 000 and 29 900 (CITY); 30 000, 50 000 and 120 000 (METROPOLIS)
  inhabitants, five seeds each, nightly (the METROPOLIS sizes reported from M1, gating from M2b). A stage's log-log
  slope of time against its declared work measure (its work-limit laws, §5.1 (5), §14) must not exceed **1.15** for a
  stage declared linear and **1.25** for one declared n log n; §12.3's per-rung cost laws are fitted on the same runs.
  **Work limits follow population:** each run reports, per stage, the F-WORK hit rate (work cuts per 1 000 batches), and
  CI fails when the rate at the top of a band exceeds the rate at its bottom by more than 1 per 1 000 — §5.1 (5)'s
  pre-decided coefficient fallback then applies and the sweep re-runs. **Index work** is fitted against commits × level
  size (§3.3). The budgets these runs time, and their measurement rules, are §12's: the per-edit cost and validation
  flatness across rungs (§12.6), the memory test per rung (§12.8), the first map by size (§12.5), the pan-and-zoom run
  during an A2 300-dpi export (§12.7), the model max clause judged on re-timed outliers (§12.3), the simulation module's
  occupancy test at M4b (§12.7), all taken in §12.1's timing phase.
* **Document tests.** The entity registry's path test fails when a type is missing from any path — generation, digest,
  render, export, persistence, edit, undo, migration (O11 a); export → import → export is byte-identical over the
  canonical form (O9 a, O11 c); the **document-size test** per rung holds ≤ 320 B per building at CITY (§2.9).
* **Stage contract tests.** The same inputs and stream give the same digest on Node x86 / arm64, Chromium, Firefox and
  WebKit, with workers on and off and pool sizes 0–3, beside §6.5 (9)'s determinism tests. **Op-order determinism:** a
  declared batch's ops permuted give the same result (§13.1); a callback-form stage run twice, on a slot-renumbered
  arena and inside the pool at sizes 0–3 gives identical digests (issue order; op permutation does not apply to it,
  §3.3). S8's working block equals S9's committed block (Hausdorff 0; §3.7). The stored `market.siting` cell `portRef` equals the median port demand fraction recomputed by running S0–S2 alone on every B-CITY harbour seed, from M1, where the scripted pass first sets it (§4.2 S3 (12); J-A24.43); a differing value fails. The per-stop placement digests of §13.3
  are the contract test of S13b; a stop placed whole and placed one unit per step gives identical placement digests
  (§8.3, §9.2). The stamp-tile asset's hash and rebuild tests and the view-data contracts are §8.3's; the shipped stamp
  tiles pass §8.3's seam check (§8.10).
* **Stage property tests.** 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections and 0 untyped
  loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback; attached
  and party-wall shares on curved-street blocks inside the dense band; roster `manifest(P₂) ⊇ manifest(P₁)` for P₂ > P₁
  on 1 000 seeds; the stage-3 contract (the union of composed wings equals the outline, §2.6); the `ringed` fixture (≥ 3
  closed rings, radius CV ≤ 10 %); a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds,
  walled share inside its rung band, §4.2 S2); the derived-complete digest identical across district orders; opening a
  person leaves the digest, the log and the undo stack unchanged; **heights** on 100 % of buildings, wings, towers and
  wall runs, and on hilly golden seeds and after every terrain stroke 0 wings whose `baseCm` differs from the highest
  terrain sample under the wing plus the plinth, user-edited bases excepted (§2.6, §7.3 (a)); **0 `E_KEPT` on the
  one-click path** over B-CITY (a stage whose domain overlaps an earlier stage's kept content is a pipeline bug); every
  gate and weld vertex on its trace, and stage 1's trace within 40 m of its boundary except along an `on_enceinte`
  castle's shared stretch; 0 lanes crossing a wall strip and 0 L3 band faces split or cleared (NF-P5); 0 S7b claims
  meeting a wall strip; the seam exception (NF-P6) on New random of 20 districts per B-CITY-lite city; the union rule
  (composed wings = outline) on curved-street row fixtures with `quad` wings, including rear lines oblique to the
  frontage — bent party-wall chains, `corners` recorded, the ridge at the arc-length midpoints; decks on 100 % of
  way–water crossings, moats and canals included; harbour fixtures with a two-arm mole and a detached breakwater pass
  the crossing invariant as harbour works, and a `quay` way drawn across a river without a deck fails it (§5.3); the
  walled coastal harbour fixtures of §4.2 S3 (11) — the harbour outside the stage-1 region, with and without
  `moat: 'inner'`, sealed with `N = 0`, and a polycentric coastal town whose nucleus nearest the harbour has no unforced
  pick left — each with the harbour served, 0 non-gate ways reaching the trace, every way–moat crossing on a deck, roads
  leaving = the N main gates plus a harbour gate of §4.2 S3 (7) where one was placed, the harbour route at most 1.5 ×
  the plaza ↔ harbour least-cost lattice path with the wall ignored, and one main gate on the harbour side (§4.2 S3
  (4)); a river town whose growth leaves crossing sites unused — 0 site furniture and 0 site marks in the display list,
  every built bridge's span the way's own L1 edge; an epoch whose growth builds a site; a drawn bridge 15 m from a site
  builds that site, and one 30 m from every site adds a deck by one L0 shore-split batch, §5.3's crossing invariant
  holding throughout (§4.2 S1 (5)); a canal across the settlement perimeter — 0 district faces outside the perimeter,
  the land on both banks the hinterland's; `castle: 'on_enceinte'` with water in reach, with and without a city moat — 0
  trace–water crossings off a river's water gate, the outer-arc channel beside the shared stretch, the town side
  dry-ditched or plain by its row; every seam edge typed, a way-less shared reservation boundary typed `reserve` (II.5).
* **B-EDIT and the locality oracle.** §7.3 item 7 (i)–(iii) and (v), and (iv)'s byte identity of Regenerate (keep
  settings), run **once per sequence** — at its end and at one seeded random position — never per edit. Fixtures: the
  re-parenting set (`drawBoundary`, district merge and split, `outskirtToDistrict`, regenerate around a lock, the
  id-recycling case); terrain-brush sequences in both water modes, and course-knot, drawn-water and drawn-bridge
  sequences with §7.3 item 7 (v)'s assertions and its water-edit fixtures; table weight edits and row insertions; drawn
  features mixed with later attribute edits; epochs and rebases; an epoch after 20 edits and a Re-derive from S10 after
  20 edits, each at pool sizes 0 and 3 with identical digests, every freeze finding every dynamic grid and tombstone set
  empty after its rebuild (§3.3 pool step 1); undo and redo from several sessions and §6.5 (9)'s truncation, naming and
  version-pinned cases (§7.4); an undo after a reload of an unshared document undoing the pre-reload event (§7.4); New
  random on minimal scopes (§5.1 (6)); the naming-collision replay fixture (§7.3 item 7 (i)); the B-EDIT-lite identity
  fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation, §6.3); §7.3 item 7 (vi)'s shared-edge identity, and
  Regenerate (keep settings) of a block holding a rich compound whose yard has a formal-garden grid and an orchard part
  with edges ending on the house wall — byte-identical to the one-click result, the wing rings after generation already
  carrying those wall vertices (§2.6); a warp over a square keeping its fountain, over a yard keeping a user-moved tree,
  and one halved by a pinned pin (§7.4); **§2.6's test** — a warp and a `moveVertex` over a built block with an L house,
  an overlapping T, a curved row of quads and a holed footprint: after each, every wing union equal to its footprint
  face (integer equality), every carried ring simple, every roof line inside its footprint, de-rectangled rects turned
  quads, a neighbouring plot re-fitted onto a shared party wall adding its corner to the wing ring along that wall, undo
  restoring every ring byte for byte and a replay reproducing them; and a building with a hand-built stored
  `Composition` — its composed wings the base wings each cut in two, a court on the footprint's hole, a tower centred on
  a corner and one inside, rooms in one wing — whose composed wings unite to the moved footprint face after each move,
  its rooms inside and its tower centres inside or on it, undo restoring it byte for byte — the stage-3 intake runs the
  same test with every fixture building's composition stored (§2.6); **load verification** — an edit within 100 ms of
  the state becoming editable on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint
  has its recorded digest recomputed to match, each choice taken in turn: the edit applies at once, and after either
  choice the session's digest equals the digest a fresh load of the saved document replays to, and that load reports no
  mismatch; the open-to-editable time against T(B); a snapshot with one moved footprint and an unchanged `model.digest`
  — its chunk hash rewritten, and not — reported as a corrupt cache and loaded by replay, never verified and never
  offered as the saved town, the session's digest after the replay equal to a fresh replay's (§2.9 steps 3–4); the same
  snapshot under a forced §6.2 (iii): "trust the saved town" and a save wait for the recomputation, the mismatch
  withdraws the keep, and the snapshot is never kept; a snapshot with one altered naming record — a corrupt cache when
  its `recordsDigest` is left as written; rewritten to match, loaded, reported by the replay as a records mismatch, the
  edits made meanwhile re-applied, then verified, and a corpus selection made afterwards renames exactly what a session
  that never saved renames; an Adjust made during load verification in an epoch-grown town, saved and reloaded, reports
  no records mismatch; a `drawBoundary` that moves surviving blocks, saved and reloaded, reports no corrupt cache;
  **naming inputs** (§6.3) — a selected user corpus and an edited naming row rename exactly the unedited names citing
  the changed slices, listed in the fate report and stored in the event, in a fresh and in a rebased document, every
  other name and naming record byte-identical, 0 duplicate ids and 0 silent re-binds; a bridge re-sited afterwards keeps
  its new name; an `editTable` of one naming grammar row renames exactly the unedited names citing it; a culture row
  with a street corpus and a district-name corpus, the street corpus replaced — every district and quarter name and
  naming record byte-identical; a frozen fixture whose naming row changed imports with its renames listed, and a New
  random made afterwards renames nothing outside its scope; a canal carved across a wall and a river move whose bank
  cuts a glacis line, each committing with 0 NF-P5 violations, and a lane drawn across a wall strip refused (§5.3); the
  20-epoch test — a TOWN with ≈ 30 % churn per epoch keeps its heap ≤ 1.3 × and its document ≤ 2 × those of a freshly
  generated town with the same live entities (M4); and **the thirteen MFCG asks of §7.4** as scripted scenarios, each
  reporting its locality share, its invariant results and its re-run cost against §12.6.
* **The faithfulness campaign (O9 c; §7.3 item 7 (iv)).** New random is judged by a campaign, not per sequence. Each
  nightly run draws **n = 800 regenerated scopes** from its B-EDIT New-random events — 400 block scopes and 400 district
  scopes, by a seeded draw; a night whose B-EDIT run holds fewer than 400 New-random events of a kind adds New random on
  seeded scopes of that kind in its B-CITY-lite towns until it has 400 — and for each generates **K = 50 from-scratch
  references** of the same scope: the same upstream state and context, rerolls 32 768 + i for i = 0 … 49, a range no user
  reroll reaches. For each of four statistics (median plot area, median frontage width, density, attached share) the
  rank r of the regenerated value among the K references counts the references below it plus a uniform draw from 0 … t
  over the t references equal to it (drawn from the campaign's own stream), so r is exactly uniform on 0 … K for a
  perfect regenerator, whatever K and however discrete the statistic. The ranks are binned into 10 bins of
  ⌊r · 10 / (K + 1)⌋ with expected counts proportional to the number of rank values each bin holds; a χ² test per
  statistic gives four p-values, and the campaign **fails when Holm's procedure rejects at family-wise 0.01** (the
  smallest p-value below 0.0025). Cost ≈ 40 800 scope generations (800 × 51), ≈ 12.5 CPU-min at §12.6's block and
  district costs (20 400 × ≈ 6.6 ms + 20 400 × ≤ 30 ms), inside the nightly budget (§13.8). **Calibration (executed,
  `docs/validation/bench/fixall_scope_r3_o9c_n800.py` → `.out`; `fixall_scope_r2_o9c_power.out`):** the four statistics
  move together, and at ρ = 0.8 a campaign of 400 scopes catches a +0.25 sd bias in only 92.2 % of nights and a 0.8 ×
  too-snug regenerator in 95.2 %, hence 800. At n = 800 a perfect regenerator fails 1.0 % of campaigns on continuous
  statistics (31 / 3 000 at ρ = 0.8, 15 / 1 500 at ρ = 0) and 1.4 % (14 / 1 000) on heavily tied, scope-varying discrete
  ones; a +0.25 sd bias and a 0.8 × too-snug regenerator are caught in 2 000 / 2 000 campaigns each at ρ = 0 and ρ =
  0.8 (95 % lower bound 99.8 %), a 0.6 × too-snug and a 1.5 × too-loose one in 500 / 500, and at ρ = 1 the bias in
  99.3 % and the snugness in 99.7 %; without the randomised tie-break a perfect regenerator fails every campaign on a
  tied statistic (`fixall_verify_scope_o9c_rank.out`). A failing statistic's histogram names the fault: a hump is too
  snug, a U too loose, a slope a bias. **A failed campaign is re-run once with the next campaign seed:** a perfect
  regenerator fails two in a row with probability ≈ 1–2 × 10⁻⁴, and a fault of the sizes above is declared on the night
  it first runs with probability ≥ 0.996 at ρ ≤ 0.8 (≥ 0.985 at ρ = 1). A second failure is a regeneration defect —
  entered in `known-defects.json`, and M3a does not exit until it is fixed (§16), because no threshold can be relaxed
  without passing a wrong regenerator.
* **Control sweeps.** §7.8's statistical monotonicity and continuity: 21 steps × 50 seeds at TOWN and CITY (nightly);
  METROPOLIS in the milestone tier. The population control's sweep also reports the F-WORK hit rate per stage, which
  must stay flat across each band as above.
* **Option-interaction matrix.** Every pair of toggles rendered and diffed; no option silently disables another (O12 c).
* **Documentation coverage.** 100 % of controls and entity kinds have a guide anchor (§14 `@plat/docs`); every in-app
  help link resolves (CI link check); the release notes list every open entry of `known-defects.json`.

* **Amendments b (items 8–31): hook tests and acceptance bars.** They are stated once, here (R9); the mechanisms they
  prove are at the homes §0.2 names, and the fixture ids the editing seats coined (`T⟨item⟩-⟨n⟩`) are kept. A bar is
  hard — 0 violations, or 100 % — unless it names a band. Each runs in the CI tier §13.8 names, from the milestone §16
  names (a stage-3 bar from stage 3's intake, *Staged by the owner's roadmap*); the bars of a staged engine run on hook fixtures, its conversions applied by hand,
  until the engine lands, when the same bars bind it. The entity registry's path test above covers every record and
  attribute §2.8's registry paragraph lists for amendments b — `Passage` and the tunnel's `navigable`, `headroomCm`
  and `closure` among them — with `Block.due` and `ElaborationRecord`, and the enumeration test the
  new event kinds (`rejectSite`, `placeAt`, `setEntrance`, `drawPassage`, `drawTunnel`, `placeAccess`, `sealPassage`, `openPassage`, `relet`,
  `densify`, `thin`, the seven plan events and `setRoomUnit`, `regenerate.rung` and the `convert` kinds of
  `DeclineOp`,
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
    an unstored plan rung `stale` and re-cuts a stored plan inside its own event (item 28 (f)).
  * *Islands (items 10, 13, 15; II.6).* (T10-1) 200 CITY seeds with `recipe.layers.islands` on: a town supply below the
    threshold gives 0 islands, and the supported area is monotone non-decreasing in the town's supply and in the
    carried districts' supply over the band rows; (T13-1) TOWN and village requests never carry a sky allocation; a
    CITY with the setting off carries none, and its ground digest equals the realism golden; (T15-1) 500 CITY seeds at
    the target at each of `wealthLevel` 0.5 and 1 with the setting on: for each count 0–3 the number of seeds drawing
    it lies within ± 3 s.e. of its expectation under II.6 (4)'s slot law at each seed's own h(S_town) — with the
    defaults a count of 0 has probability 1 − 0.6 · h(S_town); on 1 000 seeds of a hook fixture whose town supply gives
    h(S_town) = 1 every count 0–3 is observed; and hiding the sky layer changes no model digest (J-A15.01).
  * *The underground (items 11, 12, 14; II.6, II.7).* (T11-1) tunnel conversions by hand undo exactly; a `caveIn` given a stretch splits the tunnel at the stretch's widened ends (II.6, §6.3; J-A11.43) — the first-vertex part keeping the address, every part continuing the lineage, the chambers, access points and block frontages re-pointed — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its undo restores the one record; no
    `EvolutionStrategy` plan on the hook fixture contains a tunnel `demolish` (a lint); a sealed tunnel persists at its
    address and reopens; (T12-1) a schema fixture of one underground neighbourhood — two navigable tunnels, a junction,
    six cells, one vault, one stair, two gratings — validates and passes every row of §5.3's U1–U3 family: each
    underground plot's frontage rows on exactly one navigable open tunnel run, no `way` chain and no `alley` face on
    the underground arena, every building's frontage side on its plot's frontage edge, ≥ 1 access per neighbourhood,
    every access point in public ground, a yard or — a `cellar_stair` only — a surface building
    II.7.3 admits (`undergroundAccess`, or a `secret` plot), every `grating` on public ground, 0 underground faces under an excluded ground face (also on
    B-CITY-lite with the `navigable` preset), and the underground stage's commit records holding 0 writes on the
    ground `PlatKey`; the underground reroll-isolation fixture leaves the ground byte-identical, and the cut-away or
    overlay draws one depth band at a time (§8.4); (T14-1) the TOWN
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
    every residential building houses at least one household and at most its capacity (§2.6's function) — the households S10b placed in its slot (one to its template row's `households.built`) clamped into [1, capacity], but for the moves §4.7's overflow pass reports — and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46).
  * *The dossier (items 20 and 22; §7.7).* (T20-1) a map delete of a dossier-backed element re-places it coherently from
    the same seed, every plot outside the disruption set byte-identical; (T20-2) by §7.7's lapse rule, the rejection lapses at
    a dossier event touching its block (the dossier-event clause) and at the first epoch whose population target differs
    from the one it recorded (the epoch clause, from M4), and an undo of the lapsing event restores the hold; (T20-3) a blocked positive placement returns its blocking rows and ≥ 1 closest site;
    (T20-4) generator-added filler deleted, the dossier's housing re-provided elsewhere; (T20-5) the one-way
    door (item 20 (a)) — an enumeration of the bridge's message kinds (§11.3) finds no PLAT → host message that
    addresses the dossier (`doc.changed` carries map-document events only, `report.changed` the map's report), and over a
    B-EDIT sequence `report.changed` carries every rejection, placement, lapse, relocation and mutation record the
    sequence made (§5.4's entries); (T20-6) by §7.7 item 2, a map `unassign` of a dossier-backed element, a map `setAttr` of its use or class, a hand `convert` `closeUse` of its use or `mutate` of its plot to another designation, and a plot `join` or `split` whose fate would demolish the building that houses it each return F-EDIT with `rejectSite` and `placeAt` offered and change nothing, while a `relocateUse` of it commits (the refusal clause); on a B-CITY dossier fixture whose dossier-backed use stands in a declining quarter, a hand `convert` `vacate` or `demolish` of the building that houses it returns F-EDIT, and in every epoch whose use step, redevelopment, population fall or conversion reaches the use or its building the use is never closed and its building is emptied or removed only after the use has moved — a pinned use keeping its building (§4.11's *Dossier content across epochs*) — with §5.3's dossier row holding after every epoch (the epoch clause, from M4; J-A17.01); (T22-1) the same history from
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
    mode at TOWN and CITY on flat fertile fixtures and `perimeter` at METROPOLIS or on hilly fixtures; under `perimeter`
    and `rivers` no farmstead plot exists and every farm household is allocated to a town district; on an arid river
    fixture at TOWN on flat fertile land the mode is `rivers` and every field lies within `riverBandM` of a bank but
    those of the band's reported shortfall, laid beyond it as `perimeter` lays them, and on an arid fixture without a
    river the mode reads as `perimeter`; (T26-3) with
    `reserveArable` on, fertile land outside the boundary ≥ the reserve wherever the fixture makes it feasible;
    (T27-1) a schema test that the band set has one `middle`, that every band-keyed table resolves a row or an
    interpolation for every band, and that the parity preset's household shares equal FTG's captured distribution;
    (T27-2) the shanty fixture — an average band of poor gives a shanty kind once half the stages have run, the
    extramural share reported.
  * *Terrain and water (item 25; §4.11).* (T25-1) a hand `reclaim` and a hand `siltReach` are byte-identical outside their
    footprint, in the carve fixtures' form (§13.1), and undo exactly.
  * *The plan rung and elaboration (item 28; §2.6 beside §2.8's record, §2.9's cache and §4.1's policy) — the B-PLAN fixtures.* 24 fixture
    buildings (rectangles, L and T shapes, a court closed by a U, a quad from a curved row, a rectangle carrying a round tower, a
    manor of three wings at unequal storey counts), each in six classes and three bands with one to four storeys, the
    entrance sets of item 29 and a cellar wherever the class row gives one; from stage 3's landing, the plans of every clicked
    building of B-CITY-lite as well. Hard: (T28-1) each room the programme marks hard is present; soft rooms are
    delivered, folded into a neighbour or dropped, each with its tier in the report; (T28-2) starting at the main entrance,
    openings and stair cores lead to every room of every storey; each entrance gives onto a room; a passage can be
    entered from either of its ways; (T28-3) stairs stacked — a stair core occupies one bay through all the storeys it
    serves, and the basement is entered by that core, through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring (§2.6's fallback; J-A29.25) — or, for a walk-out (`Basement.access` `'external'`), by its outside stair; (T28-4) the outer walls
    coincide with the wings: on each storey the rooms together cover exactly the extents of the wings reaching that level
    plus the span ring of each passage a wing spans, at the ground storey only — the passage room (§2.6's fourth rung) —,
    each exterior wall segment sits along the edge of such an extent or span ring, each room's ring is simple and lies
    within its wing's extent at its storey (the passage room within its span ring), and no gap or overlap remains between rooms (§3.10's seed-tiling row per storey); (T28-5) each chimney rises from a hearth's
    column, and a dormer exists only where a roofed room needs light; (T28-6) one building state, one plan, host after
    host (§6.5 (9) applied at the building band); re-rolling the layout preserves the stair core, the wings and the
    entrances bit for bit, and re-rolling the roles keeps every ring and every opening's position bit for bit; (T28-7) no edit or
    re-roll of a plan touches anything beyond its own building; (T28-8) `plan()` meets §12.7's row at its median per
    building, one plan for each click, and the cache stays within §12.8's line; (T28-19) the JSON `plan` block validates against its schema
    and round-trips, and every storey scene's portals equal the plan's openings and entrances (§11.1). Soft bands, reported: no unit room used as a
    passage (its door count within its row's cap); corridors never doubled in parallel; the share of each storey given
    to circulation, by class and band; room areas ordered as their rows' target areas; unit and service rooms no shallower in the door
    graph than the shared and circulation rooms of their storey; a loop in the door graph only when a row calls for one (§13.7's row). Elaboration: (T28-9) click order
    changes no digest — one document elaborated in two orders has identical model, records and derived-complete
    digests, and the cache holds byte-identical results per (entity, rung, input digest); (T28-10) a `stale` rung
    re-derived by mutation keeps every surviving room's address, and viewing never re-derives a `current` rung;
    (T28-11) an evicted cache re-derives to the same bytes, and a corrupt cache chunk is dropped and re-derived, never
    trusted; (T28-12) clicking a neighbourhood makes its buildings' `wings` rung `current`; clicking a building does
    the same for `plan`, after `wings` where that is still absent.
  * *The interior ladder (item 28 (f); §2.6).* (T28-13) the owner's bar — when a building's occupants' band falls two
    rows, the re-cut plan houses every household of the building (`Building.households`, §2.6) with its own door off a
    corridor or stair hall, within unchanged wing rings and around an unmoved stair core; (T28-14) the shell stays
    byte-identical through any interior re-cut — its wings, entrances, heights, roof and basement — checked by the
    shell's leaf digest before and after the re-cut, a stored plan's rings read with the `composition`-role vertices its
    re-cut adds removed (§2.6's bar, §5.3's interior-ladder row), with §3.10's seed-tiling row proving the re-cut rooms
    tile that unchanged shell; (T28-15) re-uniting the households restores the earlier plan where nothing else changed (item 18 (e)'s
    inverse); (T28-16) a schema test that every band of the band set maps to an interior row, and that every row names
    its unit, shared, staff, circulation and size columns; (T28-17) the owner's concern — after a district's two-band
    fall every roster household is housed without a new plot, bounded by each shell's capacity (the housing clause — in
    the base on a hook fixture, the `relet`s applied by hand), and no F-PLAN tier drops a household unit, a unit
    falling to the next poorer form first (the F-PLAN clause, from stage 3's intake); (T28-18) a hand `relet` above §2.6's
    capacity returns F-EDIT (the `relet` clause), and a `setRoomUnit` that would leave a unit without its own door
    returns F-EDIT (the `setRoomUnit` clause, from stage 3's intake).
  * *Entrances and basements (item 29; §2.6).* (T29-1) each building has one main entrance and only one, facing its
    street or its court (100 %; O5 (f)'s doorless count stays 0); (T29-2) no side or rear entrance without an access
    edge beyond the frontage, and the caps per class hold; (T29-3) no cellar under the flood band or on the water
    table's damp ground; (T29-4) every basement inside its ground-floor footprint and smaller, with its storey in
    `Heights` and its access by one of the three ways §2.6 gives it — the stair core, a trapdoor or, for a walk-out, an outside stair; the FTG entrance row of §13.5 stands for the main door; (T29-5) a VTT portal at every
    entrance of the set, and glTF and CityJSON basements below `baseCm` that validate (§11.1).
  * *Hidden plots (item 30; §4.6, §9.2).* (T30-1) every hidden plot is reachable by a chain of access edges — alley,
    court and passage faces — from a public way, 100 %; a sealed plot reads `sealed`, is reported, is never landlocked,
    and reopens; (T30-2) the hidden share per district lies within its target ± 0.03 — §4.6's band rows interpolated at the district's area-weighted mean prosperity value and scaled by its rung and density factors (§13.7); (T30-3) no label
    of a local or secret place appears at the settlement band without the viewer's knowledge key, and no secret name
    enters an export made under a view state without it; (T30-4) the parity presets and the village rungs produce 0
    hidden plots, and a hidden court passes §8.5's figure-ground metrics, reading as a court behind buildings;
    (T30-5) by §11.2's knowledge rule, on a document holding a `secret` institution, `query` of every kind (`gazetteer`,
    `people`, `whereIs`, `relations`, `hit`, `inView`) and hover list its row with `withheld: true` at the `public` tier
    — a view-bound kind (`hit`, `inView`, hover) at every band coarser than the building band, the one band §9.2's table
    admits it at; a person working there naming it by its address only; the band-less kinds and a GeoJSON export
    withholding it as at the city band — and its name at `secret`; `export` of `.plat` and of a permalink under a
    `public` key fails with `E_KNOWLEDGE_TIER` and succeeds under `secret`; a bridged `export.request` for `.plat` from a client whose key is `public` is answered by `export.refused` carrying `E_KNOWLEDGE_TIER`, and never by `export.ready`; and by §9.5 a withheld place gets no number,
    letter or row in the legend.
  * *Prosperity change (item 31; §4.11).* (T31-1) after a re-cut every plot keeps ≥ 1 access edge and the class
    minimums, and party walls agree on both sides; (T31-2) granularity lies within the band's target ± tolerance;
    (T31-3) the churn cap holds for each kind, in each district and each block; (T31-4) no occupied building is
    removed by a band change — a redevelopment first vacates — and a plot `join` or `split` that would remove an
    occupied building returns F-EDIT ('vacate first') unless the user confirms the demolition as a fate, while one that
    keeps the building through S11's mutator commits (§7.1); (T31-5) generation-then-mutation equals the same history replayed; (T31-6) an undo of a
    fusion or a split restores rings, records and `builtBand` exactly, and a resurrected member takes `builtBand` from
    the event; (T31-7) a direct `setAttr` of `builtBand` is refused; a brush sets `builtBand` in its scope, and with
    no epoch the static base's digest is unchanged; (T31-8) a schema test that every class has a replaceability and
    every ladder row a duration per direction and replaceability. The floor's bars: (T31-9) across any run of epochs, no
    rung-1 or rung-2 event changes a plot's frontage edge or shrinks or re-cuts a shell of its buildings toward a poorer
    band — every change of its ring or its buildings' shells (read, as §5.3's epoch row reads them, without the `composition`-role vertices a stored plan's re-cut adds, §2.6, J-P48 (1)) matched to a lifecycle event the epoch recorded (§5.3's
    epoch row: a rung-3 event, rung 1's yard buildings, rung 2's back court, a designation or renovation mutation, a
    conversion — `wallToWay` and `contractWall` among them — or the growth step's regrowth builds, `demolish` and
    corridor re-cuts) — and its geometry band is at or above its floor; (T31-10) after a rung-3 event that builds, `builtBand` is the band of the new stock, and after an `amalgamate` that builds nothing it is the `builtBand` of the member whose frontage anchor the joined plot keeps (§4.11, J-A31.44); (T31-11) a rich → poor →
    rich run with no rung-3 event leaves rings and shells byte-identical, a stored plan's shell read without the `composition`-role vertices its re-cuts add (§2.6, J-P48 (1)), and returns the rung-1 and rung-2 attributes
    to the rich manifestation within the ladder's durations; (T31-12) with no epoch `builtBand` equals each plot's
    generation band and the geometry band equals the field band; a town and a metropolis each resolve their own middle
    band; every band set names its middle band.

=== REPLACE ### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30) ===
### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)

Every threshold is in one of two classes and there is no third. **Reference-settable** bands are §13.5's, set by its band
rule from `baselines.json`. **Thresholds no reference can set** — the properties the references lack, which is where the
base claims to improve — are listed here: each has a number now (provenance "architecture 2026-09-25"), is confirmed at
the first milestone at which its mechanism runs, and has a pre-decided fallback. The corpus phase may later re-sign any
of them as a declared shift (§13.9).

**J-T, the calibration rule every table row and threshold cites.** Every value has a number now and a provenance
(§17.1 (6)); a reference-settable value is set from `baselines.json` by §13.5's band rule; any value may later be
re-signed only by a declared shift — an M-1 re-measurement, an owner pick on the panel of §13.6 (8), a calibration run
(§13.9); and no acceptance run treats an unset value as passed — a table with an empty cell fails to load. §4.7's
granularity table, §4.9's greenery table and this section cite it as "J-T".

**Fallbacks that move a threshold.** A fallback may change a *mechanism* (a table value, a weight, a radius) and
re-measure against the same threshold. A fallback that instead moves the *threshold* to a measured value makes the
letter pass by construction, so it is marked **not achieved**: the letter and the measured value are entered in
`known-defects.json`, reported in the parity report and the release notes, and never cited as evidence that an
improvement was achieved (§15.2's O class). The rows below say which fallbacks do this. An owner pick on the threshold
panel (§13.6 (8)) is not a fallback: it is the owner setting the number, with provenance "owner-eye ⟨milestone⟩".

| letter | threshold (number now) | confirmed at | pre-decided fallback if the confirmation fails |
|---|---|---|---|
| O18 (i) smooth field | p99 of \|∇P\| ≤ 0.5 per 100 m of the normalised prosperity field, outside hard seams | M2b: B-CITY measurement, and a §13.6 strip at σ = 45 / 60 / 90 m | σ rises one step (60 → 75 m) and the measurement repeats; an owner pick of σ sets σ, and the threshold is re-signed at that σ's measured p99 with provenance "owner-eye" |
| O18 (j) plot-size variety | within-district plot-area CV ≥ 0.25 for districts with ≥ 30 plots | M2b | the granularity rows' frontage CV rises from 0.25 to 0.35 and the measurement repeats; if still failing, the floor becomes the measured p10 — **not achieved** |
| O18 (h), O7 (f), S3 soft seams | across soft seams: Δ median frontage ≤ 25 %, Δ median plot area ≤ 35 %, Δ median storeys ≤ 1 | M2b | the fields' seam smoothing radius doubles and the measurement repeats; if still failing, the band becomes the measured p95 + 5 points — **not achieved** |
| O19 (d) canopy | tree nearest-neighbour p1 ≥ 0.5 × the class's mean crown diameter (orchard, avenue, garden); ≥ 0.3 × for woods | M2b (bench, §8.10's stamps) | the class's stamp spacing range (a table value, §4.9) is raised until its lower end meets the threshold — the scaled tiles' minimum distance is the entity's own spacing (§8.10), so the shipped asset does not change |
| O19 (g) city-zoom greenery | every green face ≥ 0.3 ha drawn at the city band with a short side ≥ 2 px; the green / ground and green / paper pairs at or above §8.2's contrast floors; no option coupling drops the layer | M2b, for `ink` and `lit` — the milestone that builds S12's greenery rules | the `green` role steps one value step from `ground` (a style row) and the check repeats |
| O12 (a) legibility floors | minimum drawn feature ≥ 2 px; area-label cap height ≥ 7 px (§9.4) | M1: B-ZOOM and a §13.6 strip at 6 / 7 / 8 px | the owner's pick; with no pick, 7 px stands |
| O13 (a) label curvature | a label's spine turns ≤ 45° over any window of the label's length (§9.3) | M1 | the spine's smoothing step doubles; a label still over the limit takes its next alternate (§9.2: its next spine, then §9.4's ladder) |
| O13 (c) name–feature consistency | a name that references a feature type has that feature within 250 m | M1 | the grammar's feature guard — which admits a feature-referencing name only when the feature lies within the guard radius — shrinks its radius from 250 m to 200 m, and the measurement repeats against 250 m |
| O7 (b) water-dependent trades | within 100 m of water | M2b | the placement score's water term weight doubles |
| O14 (b) farmsteads | every farmstead within 300 m of one of its own fields and within 1 500 m of all of them | M2b | the hinterland unit's S10 re-sites a violating farmstead to its fields' area-weighted centroid (§4.9) |
| O14 (c) wood edges | edge straightness (chord ÷ path length over 200 m windows) median ≤ 0.90; canopy fraction monotone in the wildness control | M3b | the edge-noise amplitude rises by half and the measurement repeats |
| O14 (e) built / map area | settlement-perimeter area ÷ frame area (without margin) within 0.06–0.25 at every rung and population | M1 | the frame side per rung is rescaled in `ladder.json` so the median ratio is 0.12 (a declared shift) |
| block-level use mix | residential-only blocks ≤ 60 % of blocks in core districts; per-block use-mix entropy p50 ≥ 0.5 bits; ≥ 70 % of trade households live at their workplace | M2b | the live-in default share of craft and shop rows rises one step (§10.2) |
| requested features | degraded delivery (tiers 4–5) on ≤ 5 % of requested features | M1 | the F-* ladder whose degraded rung fires most gets 5 instead of 3 tier-3 attempts and the measurement repeats; if still over, the band becomes the measured rate + 2 points and the top three causes enter `known-defects.json` — **not achieved** |
| O16 (c) scripted tasks | one UI action where a reference needs a detour; recovery = one undo; every app response ≤ 1 s | M1 (link, SVG, coast side, variants), M2a (undo), M3b (the rest) | a task over its action count gets a toolbar shortcut and repeats |
| O2 (c) carry-over | edited entities kept or carried ≥ 95 % for local actions and re-derivation from S7 on, ≥ 80 % from S4–S6, ≥ 60 % from S1–S3 | M3a (B-EDIT) | §6.3's doubled anchor radii with the IoU test; then an edited building or plot left without a successor re-imposes its last geometry as a drawn constraint |
| S4 (d) square area (stage 2) | typed squares (market, church forecourt, well square, bridgehead, crossroads) inside a district: 0.03–0.15 ha per 1 000 of its inhabitants, over districts of ≥ 1 000 inhabitants | M5 | the square-sizing rows (m² per inhabitant served, per square type) are scaled so the median is 0.08 ha per 1 000, a declared shift, and the measurement repeats |

Realism against real towns is measured by the corpus phase (§13.9), which the owner's roadmap stages after the
standalone generators; until then the base's realism evidence is the D-5 realism question and the P rows of §13.5, and
§15.2 says so.

**Rows added by amendments b.** Three thresholds no reference can set join the table above under J-T:

| letter | threshold (number now) | confirmed at | pre-decided fallback if the confirmation fails |
|---|---|---|---|
| item 24 principal-market siting | on the plaza in ≥ 90 % of inland walled B-CITY seeds and off it in ≥ 50 % of port seeds (§13.2 T24-1) | M2b | the trade-convergence weights of `market.siting` (§4.2 S3 (12)) are re-tuned once and the measurement repeats; if still failing, the two shares become the measured p10 — **not achieved** |
| item 30 hidden share | per district within its §4.6 target (the band rows at the district's area-weighted mean value, scaled by rung and density) ± 0.03 (§13.2 T30-2) | M2b | the reach weights of §4.6's hidden-share row are re-tuned once and the measurement repeats; if still failing, the tolerance becomes the measured p90 deviation — **not achieved** |
| item 28 plan soft bands | circulation share per storey within ± 0.05 of its programme row's `circulation` (num ÷ den); room areas ordered as their rows' target areas (Spearman ≥ 0.8 per building); rooms of scope `unit` and `service` lie no nearer the main entrance in the door graph than the `shared` and `circulation` rooms of their storey in ≥ 90 % of buildings (provenance "architecture 2026-09-27"; §13.2's soft bands); the Dwellings synthesis's medians a research-side note, never a `baselines.json` row (§13.5) | the plan rung's intake (stage 3) | the layout pattern's circulation value (a `RoomProgramRow` cell) steps once toward the band's centre and the measurement repeats; a band still missed is reported and gates nothing (a soft band) |

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
| O18 prosperity field + granularity law | must | §4.5 field; §4.7 S10 joins / splits / alleys; §4.6 deep interiors | (a) Spearman(prosperity, plot area) ≥ 0.8 and Spearman(prosperity, plots per ha) ≤ −0.8 [C]; (b) Moran's I of plot area > 0 [C]; (c) detached, yard, attached and coverage shares monotone in prosperity [C]; (d) alley length per ha ~ −prosperity (Spearman ≤ −0.7), 0 alleys below the class minimum, the dead-end share in band [C]; the court share of deep blocks within band per class [P]; the hidden-plot share per district within its §4.6 target ± 0.03 (§13.7, T30-2) [C]; (e) access 100 % [C]; (f) institutions placed 100 %, never gives up [C]; (g) provenance, and the perturbation test ≥ 95 % outside; under a band change the wealth ladder's bars of §13.2 (T31-1 – T31-12) — no occupied building removed, a plot's geometry at or above its floor, granularity within the band's target after a re-cut [C]; (h) soft-seam jumps within §13.7's bands [O]; (i) a smooth field — §13.7's gradient threshold — whose edits replay [C]; (j) within-district plot-area CV ≥ 0.25 (§13.7) [O — FTG's 441 m² in every class]; (k) gap-width modes [C] |
| O17 plot model, site plans, heights | must | §2.5–§2.6, §4.7 S11, §8.4 | (a) coverage within the table [C]; (b) multi-footprint plots > 0 for institutions, manors, inns and farms [C]; (c) party-wall share by band, attached ≥ 90 % in dense bands [P — NG 39–43 %, 95–99 %]; (d) streetwall continuity ≥ MFCG's Lots mode, walled or fenced frontage counted [P]; (e) yards owned 100 % [C]; (f) footprints fit 100 % [C]; (g) heights on 100 %, shadow ∝ height r ≥ 0.99 [C]; (h) ≤ 5 µs per plot median for site plans (§12.4) [C]; (i) footprint hash identical across LOD [C]; (j) entrances and basements by §2.6's rules — no cellar under the flood band, every basement inside and smaller than its ground floor (§13.2 T29-3, T29-4) [C] |
| O7 content-first land use | must | §4.2 S2, §4.5 S7b, §4.7 S10b, §10.2 | (a) every building has a function and an occupancy (100 %); requested population ± 5 % on ≥ 95 % of seeds [O — MFCG's multiplier]; every person a home (100 %) [C]; every person a work or role (100 %) — a module letter, measured at M4b [C]; (b) hard relation rows satisfied 100 % and soft-row satisfaction ≥ 95 % reported per city — noxious trades downstream or extramural, water trades within 100 m of water, the market hall at a tier-1 junction or gate, inns at gates (§13.2 T16-1) [C]; (c) Moran's I (wealth) > 0 and monotone in the requested gradient [C]; (d) 0 constraint violations; per-capita ratio error against the tables reported; no occupation above its per-capita maximum [O — FTG's "20 adventurers" per 100 people]; (e) reconciliation ≤ 3 rounds [C]; (f) seam discontinuity within §13.7's bands [O]; (g) lazy people stable 100 %; opening a person writes nothing [C]; (h) gazetteer 100 % [C]; block-level use mix within §13.7's bands [O] |
| O19 greenery by prosperity | must | §4.9 rule table | §4.9's acceptance (a)–(g); classes: (a) [C — NG's 23–58 % at identical tags is the weakness]; (b) [C]; (c) [O — MFCG and NG green is leftover space]; (d) at §13.7's canopy threshold [O — FTG minimum 0.14 m]; (e) [P — VG P1; the frame budget is §12.7's]; (f) [C]; (g) at §13.7's city-zoom check [O] |
| O8 fortification network | must | §4.2 S3, §4.4, §4.8, §4.11 | (a) gates at 100 % of arterial crossings, count exact [C]; (b) 0 buildings in the setback band on both faces [C]; (c) tower spacing in band, 0 sawtooth [P — FTG 39 m]; (d) defensible-ground share; castle ≥ p80 among candidates [C]; castle area and compactness in MFCG's band [P]; (e) walled share in MFCG's band (§13.5) [P]; outer curtain on request [C]; (f) 4 / 4 circuit configurations, including two independent enceintes (polycentric nuclei, §4.2 S3) [O]; (g) wall → road keeps plot ids [C]; (h) the wall an entity in every export [C] |
| O12 display list, LOD, style as data, layers | must | §8 | (a) continuous zoom, footprint hash identical per LOD, minimum drawn feature ≥ 2 px, labels above §9.4's floors at every level, no feature pops more than once [O — MFCG has no zoom]; (b) pan and zoom ≥ 60 fps at 40 000 buildings and 200 000 trees on the reference machine and ≥ 30 fps on the low-end device; edit-to-redraw < 100 ms; roof computations per frame after warm-up = 0; ≤ 80 draw calls per tile (≤ 80 × P per view) and ≤ 4 uploads per frame during gestures, every ready tile at first paint and settle (§12.5) [P — NG 528 uploads per hood; FTG's roofs recomputed every render]; (c) screen = PNG = SVG within threshold, 0 silent couplings [C]; (d) glyph ambiguity 0, legend 100 % of the places the viewer's knowledge key admits (§9.2), every visible feature hit-testable [C]; (e) 300 dpi A2 [O]; (f) §8.2's contrast matrix on the rendered city band [C]; (g) first map by §12.5's laws of the building count, the miss above its knee declared for the owner's veto [P]; street-edge recoverability ≥ MFCG − 0.03 (§8.5) [P] |
| O9 persistent document, locks, regeneration, undo | must | §2.9, §7 | (a) save / load / save identical [C]; (b) locked preserved 100 %; outside the effective scope byte-identical (§7.3 item 7 ii) [C]; (c) faithfulness = §7.3 item 7 (iv): Regenerate (keep settings) byte-identical [C]; New random judged by §13.2's calibrated rank campaign, whose design and executed calibration are stated there [O — FTG's "too snug" regeneration]; (d) every operation undoable (enumeration test) [C]; (e) an upgrade keeps 100 % of edited entities or reports each orphan [O — FTG cannot regenerate old towns]; (f) the thirteen MFCG edit asks of §7.4 as scripted B-EDIT scenarios, each reporting its locality share, invariants and re-run cost (§13.2) [O — MFCG: "no way to save those changes"] |
| O16-core report and honest controls | must | §5.4, §7.1, §7.8 | (a) report 100 %; the requested-vs-built diff and every requested feature's delivery tier shown when non-empty [O — MFCG's 28 silent street failures]; (b) auto-resolved values reported 100 % [C]; (d) hidden couplings 0 [C]; (f) every numeric control monotone and continuous by §7.8's statistical rule [C]; (h) seed → map identity 100 % [C] |
| O13-core labels and names | must | §9, §10.4 | (a) 0 protected overlaps, 0 collisions, inside ≥ 99 %, curvature within §13.7's limit, 0 labels crossing holes [O — MFCG covers gates and the keep]; quarter labels at MFCG's count at matched sizes [P]; (c) name–feature consistency 100 % within 250 m [C]; (e) edited names persist 100 % [C] |
| O14-core hinterland and margin | must | §4.9 | (a) farmland per capita ± 20 % [C]; (b) field access 100 %; every farmstead within 300 m of one of its fields and 1 500 m of all; land-use overlaps 0; unused components 0 [C]; (d) roads leave to destinations 100 %, rivers enter and exit [C]; (e) built / map area 0.06–0.25 at every rung (§13.7) [O — FTG's fixed canvas per class]; (h) woods sized to the fuel and timber rows with the import share reported, the farmland mode by size and landscape (§13.2 T26-1, T26-2) [C] |
| O10 intent, constraints, assignment, forms | should (input schema + drift bounds: must hook) | §7.7 | (a) 10 / 10 scripted intent tasks without URL editing [O]; (b) hard targets 100 %, achieved-vs-requested reported [C]; (c) monotonicity [C]; (d) pins 100 % [C]; (e) assignments ≥ 99 % within drift, placed by the one solver under the hard relation rows, infeasibility reported with the nearest count and the closest options (§13.2 T16-1, T16-3) [C]; (f) size error p90 ≤ 10 % [C]; (g) the forms classifier ≥ 90 % over the forms catalogue, `linear-street`, `island-city` and `twin-town` included [C]; (h) edited tables versioned, default path byte-identical [C]; (i) the dossier contract — a map delete of a dossier-backed element re-placed from the same seed, a dossier change mutating the map that exists, one history one digest (§13.2 T20-1 – T20-6, T22-1 – T22-4) [O — no reference has a host contract] |
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
stage 2 (M5). Effort is stated honestly as a range with its basis: about 166–220 expert person-weeks (J-A16.01). The subjects the
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
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b), at all three rungs (§1.1: METROPOLIS is in the goldens, B-CITY, the determinism tests and the diagnostic panel; M2b measures and tunes it); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; **the `.plat` writer and reader for generated towns** (§2.9, §3.9) — the manifest, the content-addressed chunks with §3.9's geometry layout, gzip compression and an empty log — which the document-size test and the *preview* documents need and M2a's log builds on: a saved town of the running output version opens by decoding its snapshot and comparing its recomputed root with `model.digest` (M0's full recomputation), a differing root loading as a corrupt cache by regeneration from the recipe (§2.9 steps 3 and 5); **a document whose `outputVersion` is not the running one is never root-checked: it opens as §2.9 step 2's frozen view — each chunk checked by its content hash, the state decoded for view and export only, labelled "made with oK; not verified by this version" — with the offer to open its recipe under the running version and §6.4's preview notice; the `frozenImport` rebase arrives with M3a's rebases**; the records digest joins the snapshot at M2a, whose reader opens an M1 document of the running output version, which lacks it, by the same regeneration (§2.9 step 5); permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (§13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items:** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw); **amendments b at M1:** the transient arena's open, read-back and release (§3.4), `RungProfile.layers` with `Features.sewers` resolved at S0 (§1.1, II.7.1), the emulation marker on every default cell and the parity presets `MFCG` / `FTG` (§7.6) (≈ 1 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (§12.3's rule for which configuration is primary at each size — its p95 within the pooled law + 10 % at the band's bottom, target and top, below a single worker's on the same generations, digests identical for pool sizes 0–3 on 200 seeds — with that rule's pre-decided outcomes); the label-composition measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's; the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY) and the generated-town round trip — save → load → save byte-identical over the canonical form on B-CITY-lite's towns (§2.9); **a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message**; the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the model max clause at TOWN and CITY, judged on confirmed outliers (§12.3); the furniture and snap query round trip (§8.9); the sliced-raster census rows (§8.3); the pan-and-zoom run during an A2 export (§8.9, §12.7); the stamp-tile asset load (§8.10, §12.7); the stamp tiles' seam check (§8.3); the sliced-placement census row, and the export's placement stepped in class 4 during the pan-and-zoom export run (§8.3, §8.9); the pin-pass B-ZOOM fixture (§9.2); the harbour pick's measurement on B-CITY walled coastal seeds — p99 of harbour route ÷ the least-cost path with the wall ignored ≤ 1.5, and if it fails the detour guard becomes the default (§4.2 S3 (4), (7)); the SVG export's transient-list peak (§12.8); memory within §12.8's lines at TOWN and CITY on generated towns at pool sizes 0 and 3 (the load-verification case is M2a's); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7); of amendments b's bars (§13.2): T13-1, T14-1 but its hidden-render clause (that clause at the network stage's intake), T16-4, T23-1's registry test | 36–47 pw |
| **M2a — the editing core** (D-7: before the second preset) | the log and the one replay fold over M1's document format; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); per-document sessions (§7.4); load verification over M1's reader — the load's recomputation of the decoded state's own digest and of its records digest before its first edit, then edits applied at once during load verification with both mismatch choices (§2.9 steps 3–4); **with the keep, §6.4's link rule that the base is the recipe, with its message — a link is emitted only for a town that rule and §6.4's log rules allow, and a rebased town, a kept saved town included, is offered as its `.plat` file**; replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which measures it); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 %; open-to-editable within T(B) at TOWN and CITY, and the corrupt-cache fixture — a snapshot with one moved footprint and an unchanged `model.digest` reported and loaded by replay, never verified (§2.9 step 3); the records-mismatch fixture and the §6.2 (iii) keep-and-save gating fixture (§13.2); **a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)**; on the reference 300-edit CITY document, an edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms with pool size ≥ 1 (§2.9 step 3); memory at CITY while that document is load-verified, with a district regeneration and a Re-derive from S3 applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied; the rebased-document size test — a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased document, or §2.9's block-group fallback applied | 9–12 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs (§8.2); the relief tier; METROPOLIS measured and tuned, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw); **amendments b at M2b:** the designation templates with specialisation and the one placement solver at generation with its relation rules and supply edges (§4.7 S10b, S11), the generation fill (§4.7; J-A28.46) within §2.6's one household capacity, with the programme rows' `circulation` share and the `room` form's least area it reads at the poorest band (§10.2), the default band set with the shanty rule and its median-household band (§4.5), the entrance set and the basement decision (§2.6) with the entrance-tick rows (§8.2, §8.3), exposure, the hidden-share rows and passages with the arch-glyph rows (§4.6, §8.2, §8.3), the `states` rows (§8.2), N markets with the principal-market score (§4.2), FTG's hinterland order and modes with the fuel and wood rows (§4.9) (≈ 3–4 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS; B-ZOOM role continuity across every band switch of `ink` and `lit`; O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the pool rule, the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9); open-to-editable within T(B) and memory within §12.8's line at METROPOLIS (§2.9 step 3, §12.8); the moving-sun step budget (§8.4); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the `lit` export beside a moving `path` sun (§12.7); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: *provisional — not rated*, and "the base at parity" is not claimed; of amendments b's bars (§13.2): T16-1, T16-2, T19-1 – T19-4, T23-1's parity clauses, T24-1 – T24-3, T26-1 – T26-3, T27-1, T27-2, T29-1 – T29-4, T30-1, T30-2, T30-4, and §13.7's item-24 and item-30 thresholds confirmed or their fallbacks applied; S10b's scoring measured on B-CITY-lite and, if its pooled p50 exceeds 48 ms, restated with §12.3's p50 column (§12.4, J-A16.81) | 36–46 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3), the water operator in §4.11's order with course-knot edits (§7.3 (b)); point-anchored records under a warp (§7.4); the carve edit with §4.11's way rule and the kernel's clear regions (§3.3); the `packs` block and the pack and host-content link refusals (§2.9, §6.4); the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4)) with their renames stored in the events and carried by `confirm`, the dormant naming record of a protected name and field slices; the version-pinned checks of a rebased base across an upgrade and of a frozen view; packs held by a saved redo stack and packs a new version stops shipping; GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools; **amendments b at M3a:** assignments through the solver after generation, the designation mutator with its record and inverse, `Use` with hand relocation (§4.7, §4.11), the dossier contract — dossier-backed existence, rejection, positive placement, the disruption budget and report (§7.7) — the wealth-ladder edit kinds `relet`, `densify`, `thin` and fusion and splitting as least-disruption re-cuts (§7.1), `relet` reading the household capacity M2b builds, and the interior ladder's rows (§2.6), sealing and opening a passage and the terrain-water conversions applied by hand; the plan rung's base hooks — its records, its `elaborate` view key, its `plan.*` concerns, its events and rung re-rolls, the elaboration cache (§2.6 beside §2.8's record, §2.9's cache, §6.1's streams and §7.1's events); the knowledge filter, key and reader with the exports' withholding (§9.2, §11.1–§11.3), `report.changed` (§11.3) and `live.stale` (§8.2) (≈ 7–8 pw) | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 item 7 (v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; the carve fixtures of §13.1–§13.2 (§3.3's clear regions), or §3.3's pre-decided fallback applied before exit; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them, and one forced load mismatch settled by an owner's keep of the saved town while two editors edit on the replayed town — one digest, 0 lost accepted events; §11.3, §2.9 step 4); the naming-input fixtures of §13.2, in a fresh and in a rebased document (§6.3 case (4)); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; a kept-and-rebased CITY document upgraded across a field-driver change opens editable and replays to the session's digest, and a frozen o(N−3) fixture shows no mismatch message; a document using a pack the new version stops shipping reopens after `from` leaves the window; GeoJSON loads in QGIS with districts; the GeoJSON with trees byte-identical on the five engines (§13.3); the warp cost measurement — a 150 m brush over a CITY core on B-CITY-lite seeds, Apply within §12.6's budget with §2.6's wing carry and check counted, or §12.6's pre-decided fallback (one check after the final step, F-REDERIVE for a failure) applied before exit; of amendments b's bars (§13.2): T16-3, T17-1, T18-1 – T18-4, T20-1, T20-2's dossier-event clause, T20-3 – T20-5, T20-6's refusal clause, T22-1 – T22-4, T25-1, T28-9, T28-11, T28-12's `wings` clause, T28-16, T28-17's housing clause, T28-18's `relet` clause, T30-3, T30-5, T31-1, T31-4 – T31-7 | 23–28 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2); the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1); of amendments b's bars (§13.2): T29-5 | 16–21 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit, every default cell's `ref:` source and every extension's `extension` marker included (§7.6, §17.1 (6); item 23); **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`; §4.11, D-25); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (§13.6 (8)); **amendments b at M4:** the staged engines' hooks — the decline table, the salvage ledger and the dwell lag, the regrowth-first siting order on the grow path, the tunnel and island conversion kinds with the underground tools `drawTunnel` and `placeAccess` (§7.1), S7b (5)'s island count draw and sky allocations under II.6's supply law, the terrain-water kinds, the due mark and the wealth ladder table, the floor's attributes with their migration, the lapse of a rejection at an epoch — with their hook tests (§4.11, II.6 and II.7, with the migration of §7.5) (≈ 2–3 pw) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets (§13.2); METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people; "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release; every table value replaceable with provenance; of amendments b's bars (§13.2): T8-1 – T8-7, T10-1, T11-1, T12-1, T15-1, T17-2, T17-3, T20-2's epoch clause, T20-6's epoch clause, T31-2, T31-3, T31-8 – T31-12 | 13–19 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (§15.2); one hour for 50 000 people ≤ 50 ms (§12.7); a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` family at all four bands (§8.2); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (twenty pairs over the four templates, §13.6 (2)) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated | 14–18 pw |

**Effort, with its basis (D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 11–15 | neither reference has it; amendments b: the `Use` record and hand relocation, the plan rung's base hooks, the wealth-ladder edit kinds and the regrowth-first order of the grow path (+2) |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 4–6 | one drawing path; no second backend; amendments b: the `states` rows, the entrance-tick and arch-glyph rows and `live.stale` (absorbed) |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 6–8 | §11; amendments b: the knowledge key and filter with the reader's and every export's withholding, `report.changed` (+1) |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 10–15 | new in both references; amendments b: the designation templates and the compatibility table, the band set, the entrance set and basements, exposure, the hidden shares and passages, and O14-core's farmland modes, fuel and timber rows and arable reserve (+3–4) |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 8–11 | forms tuned by eye and the D-5 panel; amendments b: the one placement solver with its relation and supply data, the designation mutator, the dossier contract (+4–5) |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 9–13 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols; amendments b: the parity presets and the marker on every default cell, the relation templates', room programmes' and interior ladder's rows (+1) |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 7–10 | no reference line covers it |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 8–11 | §13; amendments b: the hook, B-PLAN and underground fixtures and the parity-preset run (+1) |
| mechanisms the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine; the six components below) | 9–13 | 5–7 for the first group; 3–4 (≈ 14–22 working days) for the six components itemised below; amendments b: the transient arena and the M4 hooks (+1–2) |
| **base subtotal (M-1 – M4b)** | **152–202** | |
| stage 2 (M5) | 14–18 | |
| **total** | **166–220** | equal to the milestone sum above (J-A16.01) |

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
are priced that way (J-A16.01):** +13–16 pw itemised in the lines above — O10 +4–5, O17 + O18 + O19 with O14-core +3–4, O9 +2, O11
+1, the content line +1, the rig +1, the unpriced line +1–2, the `states`, entrance-tick and arch-glyph rows and
`live.stale` absorbed by the O12 line — carried by the milestone rows M1 +1 / +1, M2b +3 / +4, M3a +7 / +8 and
M4 +2 / +3, so the rows still sum to the total; the staged engines themselves — evolution,
the sewer and underground stages, the plan rung, SettlementForge's mapping — are not priced, by the roadmap.

The cuts that would shrink the total are recorded for the owner's veto, not applied (J-S6, D-20): the module M4b
(8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the should-have
"full" tiers (4–6 pw) — together a base of ≈ 135–174 pw and a total of ≈ 149–192 pw.

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
| stage 3 — manor-style building compositions (after stage 2) | `BuildingGenerator.outline` / `compose` with a cost contract (the base outline inside S11's geometry share; a stage-3 `outline()` admitted at ≤ 10 µs with a declared re-budget); wings (`BaseWing.kind` `rect` / `quad` / `polygon`, a `quad` wing's recorded `corners`, `BuildingInput.fixedWings`), `carryWings`, which keeps every stored wing, and a stored composition's rings and tower centres, on its footprint through every move — the union test a stage-3 `compose()` must pass, run at the stage-3 intake on stored compositions — and heights in the base; the stage-3 intake measurement; item 28's hooks for the plan rung: `'plan'` in `Composition.lod` and `BuildingGenerator.plan`, the plan records with the room's household unit, the interior ladder's rows read at the occupants' band (item 28 (f)), `ElaborationRecord` per rung with the `elaborate` view key and the cache, the `plan.*` concerns keyed by the rung's reroll, the seven plan events, `setRoomUnit` and the rung re-roll of `regenerate`, the transient arena, F-PLAN, §8.5's change markers and storey view, §11.1's plan block and storey scenes, §12.7's row, §12.8's cache line and §13.2's B-PLAN bars that run from stage 3's intake (T28-1 – T28-8, T28-10, T28-12's `plan` clause, T28-13 – T28-15, T28-17's F-PLAN clause, T28-18's `setRoomUnit` clause, T28-19); the entrance set and basement the plan consumes (item 29); the passage room (item 30) | §2.6 beside §2.8's record and §2.9's cache; the kernel's §3.3, §3.4, §3.7, §3.8 and §3.10; the policy §4.1; the streams §6.1; the events of §7.1; the draw of §8.5 and §8.6, the export of §11.1, the budgets of §12.7 and §12.8; the bars of §13.2 |
| the village product (after the town / city) | stages ordered by declared I/O; `EnceinteStrategy` and the enceinte input of every network strategy; tracker-network and houses-along-ways registrations; a village as one district; the ladder rows and the 1 500 boundary; the not-precluded checks of §15.1's VILLAGE-LATER rows; the village rung rows carrying `layers.islands = none`, `layers.sewers = never` and a 0 hidden share (items 13, 14, 30) | PART III, §1.1, §1.6, §4.12, §15.1, D-33 |
| sewers and floating islands (toggles, after the city is mastered) | one arena per layer and per sky island; `LayerSpec`; drainage queryable per cell over frame and margin; `SkyIsland` and `Tunnel` records (the tunnel's invert as a knot profile); the sky pseudo-districts' allocations created by S7b before any island exists; `SkyStrategy`, `IslandRule` and `SewerStrategy` registrations; the sky close-up call; shadows onto the ground layer; the island rule — the rung gate `RungProfile.layers.islands`, the model setting, the count law and the two-supply size law — with `SkyIsland.supply`, `areaHa` and `state` (items 10, 13, 15); the tunnel lifecycle (item 11); the underground tools `drawTunnel` and `placeAccess` (J-A12.71); the sewer tier rows — `RungProfile.layers.sewers`, `Features.sewers` with S0's draw (item 14) — the underground `LayerSpec` hidden by default with §8.4's depth-band view key and §8.2's `states` rows, the class table's `drain`, `underground` and `undergroundAccess` columns, `Tunnel.navigable` and `headroomCm`, the tunnel's condition read from `existence` and `closure` (J-A11.21), the tunnel profile table, `AccessPoint`, `ContextVector.arena`, `UndergroundRule`'s depth scale, vacancy share, crowding share and arrangement restriction, the `UndergroundStrategy` slot, the U1–U3 invariants, F-UNDER and §13.2's fixture (item 12) | II.6 and II.7; the ladder §1.1; the records of §2.1 (the arena), §2.3 (drainage) and §2.7 (tunnels and access); the kernel's arena isolation (§3.4, §3.10) and tunnel kerb (§3.7); the stages §4.2 then §4.5; the ladders of §5.2 and the invariants of §5.3; the edits of §7.1 and §7.4; the layer §8.4 and the `states` rows of §8.2; the registry §14 |
| the evolution engine (much later) | epoch events and key components; `EpochInputs`, `EvolutionStrategy`; the `ConversionOp` kinds, decline included; the one built growth path, whose epochs use the crossing sites generation left unused; the decline table with its exposure lottery, the persistence order, the salvage ledger and the dwell lag, and the regrowth-first siting, which binds the built path now (item 8); the tunnel and island decline kinds (items 10, 11); the use step with `UseConversionOp` and pinned assignments (item 17); the epoch-spread mutation (item 18 (c)); the terrain-water kinds (item 25); the wealth ladder — the due mark, the ladder table's durations, churn caps and orderings, the replaceability column, `builtBand` and the floor applied at epochs (item 31); the densification, clearance, sealing and reopening of hidden plots (item 30); the lapse of a rejection and the folding of a dossier event at an epoch (items 20, 22 (e)); `relet` and the interior re-cut (item 28 (f)) | §4.11 and §1.5, D-25; the layers II.6 and II.7; the plot record §2.5; the dossier §7.7; the tables §10.2 |
| calibration against the historical corpus (after the standalone generators) | `CorpusAdapter`; corpus rows in `baselines.json`; `CalibrationRun` as table-version bumps with declared shifts; provenance on every table cell; the tables amendments b adds, listed at §13.9 (5) | §13.9, §7.6 |
| SettlementForge inputs (after the generators are mastered) | the host-input contract and the host bridge; the dossier contract (items 20, 22): dossier-backed existence, the rejection record and its lapse, positive placement, re-application and the disruption report — a data-only, one-way door, the module a separate program at arm's length (§11.3, J-A21.81; the licence §17.3, D-22); `knownTo` as a dossier fact (item 30); the mapping of SettlementForge's own data onto these doors is the staged part | §11.4, §11.3, §7.7 |

=== J-ROWS ===
| J-A17.01 | the epoch-bound bars — T17-2, T17-3, T20-2's epoch clause and T20-6's epoch clause — run from M4, where the base builds its one epoch path; T17-1, T20-2's dossier-event clause and T20-6's refusal clause stay at M3a | §16, §13.2 |

=== RATIONALE-A ===
| J-A17.01 | Chose to schedule the bars that need an epoch — T17-2 (a pinned assignment never moves under an epoch, and the churn cap's use row holds), T17-3 (one seed and one circumstance timeline replay to one history of openings, closings and moves) and T20-2's epoch clause (a rejection lapses at the first epoch whose population target differs from the one it recorded) — at M4's exit, and to keep T17-1 (a hand relocation) and T20-2's dossier-event clause (a dossier event touching the rejected site's block) at M3a, over leaving all three at M3a with the rest of their items' bars, because the base builds its one epoch path at M4 (§1.5, D-25), the epoch's use step is the staged engine's (J-A17.42) and the churn cap is M4 work (T31-3), so at M3a no epoch exists for those clauses to run on, while a hand relocation and a dossier event are M3a's own mechanisms. The bars stay stated once in §13.2, split by clause as T23-1's are, so both of the owner's lapse conditions — "an evolution epoch, or a dossier change that alters that area" (item 20 (b)) — are proved, each from the milestone that builds its mechanism (§16, §13.2; items 17, 20; repair round 2 after verify-scope-r1's VS1-01). T20-6's epoch clause follows the same rule, because it needs an epoch and the decline conversions, which M4 builds (T8-1), while its refusal clause — a map `unassign`, a `setAttr` of the use or class, a `closeUse`, a `mutate` or a demolishing `join` or `split` of a dossier-backed element refused, a `relocateUse` committing — runs at M3a, which builds the dossier contract, the designation mutator and the plot edits (repair round 3, validate's VS2-03, which merged VD2-03). |
| J-A20.01 | Chose to state the dossier contract's tests — T20-1 – T20-6 and T22-1 – T22-4, T20-5 the one-way door of item 20 (a), proved by an enumeration of the bridge's message kinds and by `report.changed` carrying every record a B-EDIT sequence made (added by repair round 1, VS-04), T20-2's epoch clause from M4, where the epoch path is built (verify-scope-r1's VS1-01; J-A17.01), T20-6 the refusal list of §7.7 item 2 at M3a with its epoch clause — no epoch closes a dossier-backed use or leaves it without its building — from M4 (added by repair round 3 for validate's VS2-03, which merged VD2-03, because no bar proved that list or dossier-backed existence across epochs) — in §13.2, to name the contract's hooks in the staged SettlementForge row and to give O10 a letter for it, over leaving them in the determinism seat's notes, because R9 makes §13 the one home of every test and the owner's authority rule ("the map does not edit the dossier") deserves an acceptance letter a milestone can fail (§13.2, §15.2, *Staged by the owner's roadmap*). |

=== END ===
