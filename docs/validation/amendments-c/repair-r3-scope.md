# repair-r3-scope — lane amendments-c/repair-scope-r3 (SCOPE part: title block and summary, §0, §1, §13–§17, Delegated
# decisions, the Judgment-calls index, Staged, Appendix A): block file per the BLOCK PROTOCOL. Text before the first
# "=== " line is ignored. The lane's report, ledger and receipts: docs/validation/amendments-c/repair-scope-r3-report.md.
# Base: docs/ARCHITECTURE.md sha256 3daa0b0731b8c76f… and docs/ARCHITECTURE-RATIONALE.md sha256 bfa20419ca4dd6e5…
# (assemble-r2's output, the state validate.md judged). Each REPLACE body is the live subsection with count-asserted
# literal substitutions (scratchpad rs3c/compose.py); every untouched line is verbatim.
#
# ASSEMBLER HAND-OFF
# (1) RESTATED ROW. The J-ROWS and RATIONALE-A blocks carry one restated row under its existing id, J-A81.01 (index and
#     Part A; VD2-05 = VS2-05). apply-blocks.py appends it and notes "DUPLICATE ID"; move the appended row into the older
#     row's place and delete the older row (swap_restated, as assemble-r2-handoff.py step 1). Expected swapped sets from
#     this file: index {J-A81.01}, Part A {J-A81.01}. No new id.
# (2) This file REPLACEs §0.2, §13.2, §13.5, §14, §15.1, §15.2 and §16 — all scope-owned. At write time no other
#     repair-r3 block file on disk replaces any of them (checked before each block by the appender).
# (3) §13.2's lit-street warp fixture follows repair-r3-determinism.md's §7.4 wording of the door light (it keeps its
#     fraction along the footprint edge it stands on, never re-seated); §13.2's T88-1 list equals repair-r3-pipeline.md's
#     restated J-A88.42 (the catacomb age added). Land the three files together.

=== REPLACE ### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), items 8–31 (`AMENDMENTS-2026-09-25b`) and items 32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`) ===
### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`), items 8–31 (`AMENDMENTS-2026-09-25b`) and items 32–88 and 101 (`AMENDMENTS-2026-09-27c`, `-d`, `-e`)

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
roadmap*). Item 32 of the same file, received after that pass's routing had closed, landed with amendments c (below).

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
| 20 one-way data flow; the dossier is the authority | home §7.7 — dossier-backed existence, the rejection record and its lapse, positive placement, re-application, the precedence line; `rejectSite` and `placeAt` in §7.1 (a `delete` of dossier content is a rejection), with §7.2 and §7.4, the ladders of §5.2, the invariant of §5.3 and the report of §5.4; `Rejection` in the registry and `Identity.dossier`, a `DossierRef` (§7.1) carried by the entity the element is (§2.8, J-A20.22), dossier events in the log (§2.9); the `dossier` and `positive` requests and the least-disruption order in §4.7 S10b, a dossier household's housing re-provided in its district when no building there can hold it (§4.7, J-A20.72), the lapse at an epoch and *Dossier content across epochs* (J-A20.75, J-A20.43) in §4.11; the one-way door, with no message that writes the dossier, in §11.3 and §11.4; the summary; tests T20-1 to T20-6, T19-4's dossier clause and T28-18's dossier fixtures; the engine in §14; O10 (i) of §15.2; priced in §16; the staged SettlementForge row; **(h), the owner's refinement (2026-09-27):** §7.7 items 9–11 — two tiers of fact, the dossier's immutable and the map's derived; derive before invent, through the derivation table's index with each row's chance entry and its totality bar; the coherence rows and the "dossier-owned" refusal (J-A20.76 – J-A20.79) — the fact tier, derived at read by `factTier` over the registry's dossier paths and never stored (§2.8), read by §7's edits, §9.2's reader, §11's exports and the clerk, and the households that fill the dossier's population named so wherever they are named; its bars in §13.2; **the port and its seam (items 73–88):** `@plat/port` and its interface (§14), the binding key law and `Document.dossier` (§7.7 item 12, §2.9), the change envelope and its receipts (item 13), a listed element's state (item 14), the rung and the refusal below 1 500 (item 15) and above the 120 000 cap (§1.1; J-A81.01), naming claims (item 16), the typed slices (item 2), what the port never reads (item 1), the clock and the epoch cadence (§4.11), the staged records (§2.7), the frozen fixtures and B-DOSSIER-lite (§13.2); priced at M1, M2b, M3a and M4 (J-A73.05) | §7.7 |
| 21 licence | SATISFIED by the owner's ruling of 2026-09-27 (private for now; J-A21.01): §17.3 and D-22 unchanged; §17.1 (1) unchanged — it already admits no TownGeneratorOS code; permissive-only dependencies (§17.4) unchanged; the separate program with its data-only bridge (§11.3) retained by choice, not by licence; §3.1's skeleton row keeps CGAL's licence ground (J-A21.31) | §17.3 |
| 22 dossier changes mutate the existing map, never re-roll it | home §7.7 — dossier events as mutations with least disruption, `DisruptionBudgetRow`, the report, vacancy on removal, continuity over path-independence; two histories may give two valid maps (§6.2); the budget's scope in §7.3 and the report in §5.4; the log in §2.9; each dossier element present from a new map's first generation (§4.2 S2), the search order in §4.7 S10b, a mid-history dossier event folded at its epoch (§4.11); the host door in §11.3 and §11.4; tests T22-1 to T22-4; the staged rows | §7.7 |
| 23 emulation-first defaults; no hard-coded universals | home §7.6 — the defaults layer is the emulation baseline: a default cell's `provenance.source` names the reference behaviour, an extension carries the `extension` marker with its chance, weight or option, an absolute reads as a default table value, and the parity presets `MFCG` and `FTG` switch every extension off; a pointer from §1.4; the provenance values of §17.1 (6); `RelationRule.extension` in §4.1 and §4.7 S10b; test T23-1; the parity presets inside §13.5's bands and on the D-5 panel's MFCG and FTG pairs (§13.6 (3), J-A23.02); priced at M1 in §16 | §7.6 |
| 24 several markets, as MFCG and FTG already do | home §4.2 — S2's market demand (N markets by size) and S3 (12)'s principal-market score by trade convergence, secondary markets never touching another and on small patches; the destinations, seeds and stalls of §4.3 to §4.5, §4.7 and §10.2; `Reservation.rank` and the nearest-market distance in §2.5; a market's `rank` edited by `setAttr` in §7.1 (J-A24.71); the summary; the centre row of §1.4; tests T24-1 to T24-3; the parity rows of §13.5 and the threshold of §13.7; D-16 and D-17 | §4.2 |
| 25 terrain and water can change, slowly | home §4.11 — `reclaim`, `siltReach`, `shiftCourse` and `digCanal` as the slowest layer's rows of the decline table, repaired by S1's terrain or water operator or the carve (§7.3 (a), (b); §4.11); what each changes in §2.3 and `LandUse.reclaimed` in §2.7; by hand and undoable in §7.1 and §7.4, through §7.3 (a) and (b); a concern in §6.1; test T25-1; D-25; the staged evolution row | §4.11 |
| 26 the hinterland is decided with the town, drawn after it | home §4.9 — FTG's order and its farmland modes chosen by size and landscape (`FarmModeRow`), the fuel and timber rows beside the farm table, the extent following demand, the arable reserve off by default; the demand rows (§4.2 S2, §10.2); the execution order (§4.1 and §4.4); the hinterland row of §1.4; tests T26-1 to T26-3; O14 (h) of §15.2; priced in §16 | §4.9 |
| 27 prosperity maps onto the references' wealth models | home §4.5 — the default band set: FTG's six lifestyle tiers with their shares, MFCG's ward-class shares as band targets, the shanty trigger, and `FieldBands.middle` as the band of the median household, the continuous gradient being our extension; the band-keyed rows of §10.2, §4.7 and §4.9; `FieldBands.bands` and `middle` in §2.5; the districts row of §1.4; tests T27-1 and T27-2; the descriptive rows of §13.5 | §4.5 |
| 28 floor plans and elaboration by click; (f) the interior has no floor | home §2.6 — the fourth rung, `plan`: the room programme first (from the designation, the occupants' band and the household count, never the geometry floor), the partition fitted to it one wing at a time around a stair core placed ahead of any cut, coherence with the exterior, the entrance set and basement consumed; the interior ladder's rule table by band, the dwelling unit with its own door, the re-cut as item 18's mutation within unchanged wing rings, and the shell's household capacity; `ElaborationRecord` per rung (absent, current, stale, edited) with `Document.elaborations` outside both digests and the `elaborate` view key (§2.8, §2.9); click → rung and the pre-assignment in §4.1; `RoomProgramRow`, `RoomRuleRow.scope`, the template's `households` and a structure's `houses` flag in §4.7 S11 and §10.2, the generation fill — households per slot at S10b, `Building.households` clamped to the capacity at S11 and the overflow re-placed inside the district — in §4.7 (J-A28.46), the occupants' band memory `Plot.fieldBand` (J-A28.29) and the fill's typing record `BuildingSlot.unhoused`, both in §2.5, `relet` in §4.11 rung 1; the close-ups of II.4 and II.5; the transient arena and the re-cut (§3.4, with `ArenaKey` in §3.3); the `spine` reader (§3.8); the seed-tiling row (§3.10); F-PLAN (§5.2); the invariants (§5.3); the `plan.*` concerns keyed by the rung's reroll in §6.1, the pure-function rule of §6.2, the click-order identity of §6.5 (9); the seven plan events, `setRoomUnit` and the rung re-roll of `regenerate` in §7.1, with §7.3 and §7.4; the draw and the change marker (§8.2, §8.5), the cache (§8.6), the export (§11.1), the budgets (§12.7, §12.8); the summary; the stage table (§1.1); the one-click default (§1.2); fixtures in §13.1 and tests T28-1 to T28-19; the soft bands of §13.7; the plan step's package in §14; priced in §16; the staged stage-3 row | §2.6 |
| 29 entrances and basements | home §2.6 — `entrances: Entrance[]` with roles and faces under the five rules; `Basement` derived from the class rows, the terrain gate of §2.3, prosperity and size, inside and smaller than the storey above it, its storey in `Heights`; a cellar never joins a sewer as a room, a cellar stair to a tunnel being an `AccessPoint` (II.7.3); the indexed vertex role of §2.2 rule 7 and the slot of §2.5; the placement in §4.7 S11 with the entrance and cellar columns of §10.2, and when an alley presents itself in §4.6; the invariants of §5.3, the concern `siteplan.entrance` in §6.1, `setEntrance` in §7.1, with §7.3 and §7.4; the glyphs and exports in §8.2, §8.5 and §11.1; the buildings row of §1.4; tests T29-1 to T29-5; the note in §13.5; O5 (f) and O17 (j) of §15.2; priced in §16 | §2.6 |
| 30 hidden plots and clandestine places | home §4.6 — S8's hidden-share and reach rows by band and density, `exposure` derived by adjacency to a public way, the passage choice — the cut making the `passage` L3 face in §4.7 S10; a second home in §9.2 for the knowledge label policy; `Plot.exposure`, `Block.reach`, `knownTo` on plot, building and institution and `BaseWing.spans`, which a composed wing inherits (J-A30.23), in §2.4 to §2.6, `sealed` in §2.8, the viewer's knowledge key in §2.9; the nesting paragraph of §3.10 (J-A30.31) and the passage room as a fixed ring in §3.4; a secret institution's preference in §4.7 S10b, densification, clearance, `sealPassage` and `openPassage` in §4.11, none by default in PART III; F-PLOT in §5.2 and chain reachability in §5.3; the concern `cut.interior` in §6.1; the edits in §7.1 and §7.4 and the dossier fact in §7.7; the glyph, the court tone and the exports in §8.3, §8.5 and §11.1 to §11.4; the summary; tests T30-1 to T30-5; the parity row of §13.5 and the threshold of §13.7; the gazetteer in §14; O5 (a) and O18 of §15.2; priced in §16; the staged evolution row | §4.6; §9.2 |
| 31 prosperity change drives fusion and splitting — a slow, asymmetric ladder with a geometry floor | home §4.11 — Survivors: the DUE trigger with hysteresis; the three rungs (use and occupancy, tenure and yards, geometry only on vacancy, ruin or redevelopment); no occupied building removed by a band change; durations by direction and by the stock's replaceability; churn caps; `LadderOp`; and the geometry floor — `geometryFloor = min(builtBand, the settlement's middle band)`, the manifested band and value; the fusion and splitting orderings in §4.7 S10 (7) and the mutator in S11; `FieldBands.middle` and the DUE trigger in §4.5, the back courts of §4.6, the yards of §4.9, `replaceability` and `households` in §10.2, households in §10.3; the close-ups of II.1 and II.3; `Block.due`, `Plot.builtBand` and `builtProsperity` in §2.5, `households` and `condition` in §2.6, the memories told apart in §2.8; lineage through fusion and splitting in §6.1 and §6.3; `relet`, `densify`, `thin`, split and join as re-cuts and `builtBand`'s lifecycle (§7.1, §7.2, §7.4), with §7.3, §7.5 and `WealthLadderTable` in §7.6; the ladders and invariants of §5.2 and §5.3; the condition classes of §8.2; the summary; tests T31-1 to T31-12; `wealthLadder.json` in §14; O18 (g) of §15.2; priced in §16; D-25; the staged evolution row | §4.11 |

**Where the amendments of 2026-09-27 and 28 land — items 32–72 (`docs/AMENDMENTS-2026-09-27c.md`; item 32 quoted
there from `AMENDMENTS-2026-09-25b`), items 73–88 (`AMENDMENTS-2026-09-27d`) and item 101 (`AMENDMENTS-2026-09-27e`).**
The same discipline. Items 33–62 come from reading the references' compiled code (§17.1 (1)): each adopts a mechanism
re-derived in our own terms, keeps ours with its reason, or calibrates a default to a read fact with its `(code)`
provenance (§17.1 (6)); a part a reader only inferred entered only as Fable's evidence gate released it, labelled as an
inference, and the gate's one rejection (item 49's deletion) is honoured. Items 63–72 and 101 are the owner's rules and
20 (h) the owner's refinement of item 20 — the owner's words the authority, their mechanisms the program's vetoable
interpretation. Items 73–88, the dossier port and its seam, extend 20 (h) under the owner's rulings of 2026-09-28 (the
first SettlementForge line, door 1 closed, a dossier below 1 500 people refused, a resettled site one map, the
placeholder direction phrase, SettlementForge's own district names never matched); their landing is item 20's row above.

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 32 the compiled code was read to understand it | home §17.1 (1) — research reader seats read the captured bundles for understanding only, nothing copied, their findings behind the implementer firewall, the checks of (2) and the scan of (5) unchanged, a divergent mechanism entering only as our re-derivation (J-A32.01); §0.3's evidence sentence; D-29; Appendix A's reading record; the summary | §17.1 (1) |
| 33 the bent cut's citations; the slope term ours | home §4.6's recipe (NG 1.2.2's plain bisector as read in its code, restated in metres, the profile's statistics staying §13.5's targets) and step 1's slope term (provenance `own`, an `extension`; J-A33.41, J-A33.42); §1.3's and §1.4's rows by build; §0.3; D-16 (J-A33.01) | §4.6 |
| 34 the stop test: a per-face threshold on the extent | home §4.6 step 1 — `τ = e_lo · (e_hi / e_lo)^g` drawn per face on `cut.stop`, the block-depth range stated once (J-A34.41, J-A34.42); the concern in §6.1 (J-A41.61); the depth rows re-fitted at M-1 (§16, §13.5's blocks row; J-A34.01); T34-1 | §4.6 step 1 |
| 35 where the cut falls: between the face's mass and a bell draw | home §4.6 step 2 with its holed law (J-A35.41); II.2's slit | §4.6 step 2 |
| 36 a deterministic start | home §4.6 step 3 (J-A36.41); `cut.side` retired in §6.1; T36-1 | §4.6 step 3 |
| 37 the corner first, the far side from it, straight or bent | home §4.6 steps 4–5 — `cut.bendMode` `flatten` in the base and `straightFirst` under the `MFCG` preset, `cut.flattenM` 0.7 m as an inference Fable released (J-A37.41, which supersedes J-P16; J-A37.42); §7.6's per-preset values (J-A37.71); `cut.farSideAlt` retired; M0 (b) the check of the adopted rule (§16; J-A37.01); T37-1 | §4.6 steps 4–5 |
| 38 the fillet by deflection and leg | home §4.6 step 6 (J-A38.41); §13.5's fillet bar; T38-1 | §4.6 step 6 |
| 39 rung (a): a turned frame | home §4.6 step 8 (J-A39.41); F-CUT's ladder cell (§5.2); the citations of §3.5 and §1.3; T39-1 | §4.6 step 8 |
| 40 the lane width: a saturating power law | home §4.6 step 9 (J-A40.41); II.2's template widths; T40-1 | §4.6 step 9 |
| 41 the streams and the parity rows | home §13.5's bent-cut row — NG 1.2.2's numbers as measured outputs, with the fillet-share bar (J-A41.01); §6.1's registry (J-A41.61); §13.2's group of the code-reading items' bars (J-A41.02); M0 (b) in §16 | §13.5 |
| 42 NG's frontage-less lot leaves are its courts | home §4.7 S10 (10) (J-A42.41); §4.6's deep-interior note; F-PLOT's baseline (§5.2); §1.3 | §4.7 S10 (10) |
| 43 the front line: an area-scaled, floored recession | home §4.7 S11 (J-A43.41, J-A43.42); §7.6's per-preset values (J-A43.71); T43-1 – T43-5; §15.1's MFCG row | §4.7 S11 |
| 44 the compound enclosure is ours | home §4.7 S11's set-back compound row — provenance `own`, an `extension` (J-A44.41); §2.5's PlotBound; §7.6 (J-A44.71); II.3; T44-1; §15.1's NG row | §4.7 S11 |
| 45 the castle repair: a thinness bloat, then the fitted regular polygon | home §4.8's Compactness (J-A45.41, J-A45.42); `regularFit` in §3.4 (J-A45.31); F-CASTLE's ladder (§5.2) and §7.1's Equalize; §1.4's walls row; T45-1 | §4.8 |
| 46 the gate law's waterfront reduction; three smoothing passes | home §4.2 S3 (4) (J-A46.41, J-A46.42) and §4.4's trace (J-A46.43); §13.5's towers-and-gates row; D-17, D-19; T46-1 | §4.2 S3 (4) |
| 47 district growth rates by seed kind | home §4.5's Grower (J-A47.41, J-A47.42); `district.seed`'s turns (§6.1); §1.4's districts row; D-16; T47-1 (J-A47.01) | §4.5 |
| 48 MFCG's population is six people for every lot | home §13.5's population row (J-A48.01); §1.4's content row; Appendix A | §13.5 |
| 49 FTG's "lots" were ground-cover patches | home §13.5's blocks and plot-area rows, their 441 m² figures withdrawn; §1.4's rows — the share of buildings outside every district ring (49 %) kept, cited to its real source, "containment 53 %" withdrawn, by Fable's evidence gate (J-A49.01) | §13.5 |
| 50 FTG's "entrance" is its night-light anchor | home §2.6's Entrances — the main door by the owner's rule (provenance `owner`); the entrance default of §4.7 S11 and §10.2; §13.5's entrance rows, class C, and T29-4 (J-A50.01); §1.4's buildings row | §2.6 |
| 51 the retry and stream citations | home §5.1 (1) (J-A51.51); §1.4's determinism and failure-policy rows; §15.1's VG row | §5.1 (1) |
| 52 session-history independence | home §6.5 (9)'s test (J-A52.61); §13.3's pointer | §6.5 (9) |
| 53 the Poisson annulus; the contour and search notes | home §8.10's Sampling; §3.1's rows (J-A53.31); §13.5's tree-scatter row; D-11 | §8.10 |
| 54 the raised under-copy by class | home §8.2's class ratios and `raised(offset, classRatio)`; §8.4's K06; T54-1; §15.1's MFCG row | §8.2 |
| 55 the horizontal spine | home §9.3's Area labels; T55-1 | §9.3 |
| 56 the MFCG naming row | home §15.1's MFCG D1; §6.1's deck helper | §15.1 |
| 57 the sector look's two sources; fields claimed outward | home §4.9 (J-A57.41 – J-A57.43); §1.4's hinterland row; T57-1 | §4.9 |
| 58 stage 2: ring courses, greens, pins, NG's render notes | home II.2's RingFabric and II.3 (J-A58.41 – J-A58.43); §8.2's layer note and §8.3's census; §13.5's draw-style row; §15.1's NG row | II.2 |
| 59 the stage-3 hook: Fantasy Manor's layout families | home §2.6's stage-3 hook — the path-shape rows and what ours adds; §12.7's restated timing; the staged stage-3 row | §2.6 |
| 60 the plan rung's Dwellings baselines | home §2.6's Basements note and plan step 5; §13.5's entrances-and-basements row; §15.1's NG row | §2.6 |
| 61 PART III: VG 1.6.9's observations | home PART III item 2 (J-A61.41); §13.5's build stamp | PART III |
| 62 the `(code)` provenance form | home §17.1 (6) and (8) (J-A62.01); §7.6's provenance grammar | §17.1 (6) |
| 63 clandestine institutions: a front and a hidden function | home §4.7's *Concealed institutions* — `concealment` resolved dossier → assignment → the class's weights → `none`, the front and its concealed use one solver item, the front driving the mutator (J-A63.41 – J-A63.44); the concealment fields of uses, rooms and doors (§2.6, §2.7); the cover rows (§10.2); the knowledge filter for concealed parts (§9.2, §11.1, §11.2); a dossier fact (§7.7); II.7.3's underground mode; the T63 bars (§13.2); the staged rows | §4.7 |
| 64 basement access to the sewer grid and its dwellings | home II.7.3's *Basement accesses* — a gate and a lottery by class × band × age × the concealed multiplier (J-A64.41 – J-A64.44); `AccessPoint`'s state and knowledge (II.7.4); §10.2's access rows; §2.6's Basements; T12-1's corrected clause and the T64 bars (§13.2); the staged sewers row | II.7.3 |
| 65 the underground as a family of systems; the undercity | home II.7.5 (the undercity) and II.7.6 (the systems, their parts and links) (J-A65.40 – J-A65.48); the arena parts (§3.4; J-A65.31, J-A65.32); the undercity bound in `RungProfile.layers` (§1.1); the geology flag and the relief toggle, drawn at S0 and read at S1 (§4.2; J-A65.49), built at M1 (§16; J-A65.02); the systems' edits (§7.1; J-A65.71); D-3; the T65 bars (§13.2); the staged rows | II.7.5, II.7.6 |
| 66 an access edit generates everything it needs | home §7.3 item 9, the closure rule (J-A66.71); its generators in II.7.6 (J-A66.41); `addUndergroundAccess` (§7.1); D-25; the T66 bars (§13.2); the closure rule at M3a with its concealed-door instance, the access edit at M4 with the underground layer's hooks (§16; J-A66.01) | §7.3 item 9 |
| 67 transitions: buildings and plots mid-change on a weekly clock | home §4.11's *Works* — the `Works` record and `WorksTable`, its stage derived at any week, no Works at generation (J-A67.41 – J-A67.49); `startWorks` and `cancelWorks` (§7.1; J-A67.71); the `works` concern (§6.1; J-A67.61); the stage drawing rows (§8.2, §8.5); D-25; the T67 bars (§13.2); the island slots' per-year redraw at an epoch (II.6; J-A67.40); the staged evolution row | §4.11 |
| 68 light: day and night, the cursor sun, point lights, gradient shadows that respect height | home §8.4 — the lighting model, the cursor sun, the light pass with its CPU reference, its GPU accelerator and its fallback ladder; `LightSource` (§2.7); placement by `LightRule` (§4.7; J-A68.41); `pin.light` (§6.1; J-A68.61) and the CPU pass inside the lint (§6.5; J-A68.62); `placeLight` and the view controls (§7.1, §7.8; J-A68.71, J-A68.72); D-1, D-3, D-19 (J-A68.05); the T68 bars and §13.4's tolerance; §13.5's preset row; priced at M2b and M3b. **Put to the owner:** the day view with the cursor as its sun is the default in every family, and §8.4 casts the moving shadows in every shipped family — the `ink` map's gently, in shades of its own ink — and none under the `MFCG` preset (J-A68.81); the owner confirms that, or keeps MFCG's raised look on the default `ink` map with the shadows one switch away | §8.4 |
| 69 adopt the corpus's measured colour targets | home §8.2's palette targets from the owner-opened corpus bands; §13.4's bar; §7.6's corpus sentence and §13.9; §17.1 (5) and (6) (J-A69.05); D-1; priced at M1; **put to the owner:** the `ink` map's plate chroma is 20–30 (J-A69.82), low in the band — the program's reading of "constraint", where the owner may prefer the band's middle (43) | §8.2 |
| 70 informal clusters: many shacks or tents on one unowned lot, each with its own door | home §4.7 S11's *Informal clusters* — derived tenure, the `cluster` arrangement, paths first, a door per structure on a path (J-A70.41 – J-A70.49); the shelter and cluster rows (§10.2); the tenure and yard fields (§2.5); one label per cluster (§9.1); the T70 bars (§13.2); the staged rows | §4.7 S11 |
| 71 mixed classes inside a band | home §4.7 S10b's *Class mix inside a band* (J-A71.41 – J-A71.44); the class-mix rows (§10.2); S2's land estimate (§4.2); the T71 bars (§13.2); the parity presets' step (§13.5) | §4.7 S10b |
| 72 what defines a neighbourhood, and names it | home §4.5's *Neighbourhood character …* — the character vector, identities after placement, the three dials, the band range, the pressure, significance and dispersal (J-A72.40 – J-A72.51); the district's character, identity, range and pressure (§2.5); the dials' inputs (§7.7); renames at an epoch (§6.3, §10.4; J-A72.44, J-A72.62); §1.4's districts row; D-10, D-16, D-32 (J-A72.05); the T72 bars (§13.2); the staged rows | §4.5 |
| 101 the authoring toolkit — declare, then derive | home §7.1's *The authoring toolkit* — twelve tools in five layers, each an existing event or sugar over one, the points forms, declared means held (J-A101.71 – J-A101.77); the skeleton file as a creation prefix and the `citadel-and-port` form (§7.7); the read-ahead (§4.1; J-A101.41); the region groups, the leader-line switch and the underlay (§9.1, §9.4, §9.5); the clerk's tool API (§11.2) and the skeleton export (§11.1); the three surfaces and the interaction contract (§14); the elegance bars (§13.2) and the first-five-minutes test (§13.4); §1.4's editing row; priced at M2a, M3a and M3b (J-A101.05); the staged built-in clerk and plots on a bridge deck | §7.1 |
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
  and one halved by a pinned pin (§7.4); a warp and a `moveVertex` over a lit street with an inn — every street light,
  the inn's door light, a hand-placed light on a pin and a junction light on a tunnel carried in their host faces by
  §7.4's rule, the door light keeping its fraction of the footprint ring's edge it stands on and never re-seated, a
  light pushed inside its `sizeCm` clearance re-seated, one whose inset empties re-placed when generated and orphaned
  and reported when hand-placed; an access point's opening carried in its ground host; a building under a demolition
  Works whose kept rings take their mean-value images unre-seated; undo restoring every former point byte for byte and
  a replay reproducing them (§7.4; J-A68.73); **§2.6's test** — a warp and a `moveVertex` over a built block with an L house,
  an overlapping T, a curved row of quads and a holed footprint: after each, every wing union equal to its footprint
  face (integer equality), every carried ring simple, every roof line inside its footprint, de-rectangled rects turned
  quads, a neighbouring plot re-fitted onto a shared party wall adding its corner to the wing ring along that wall, undo
  restoring every ring byte for byte and a replay reproducing them; and a building with a hand-built stored
  `Composition` — its composed wings the base wings each cut in two, a court on the footprint's hole, a tower centred on
  a corner and one inside, rooms in one wing — whose composed wings unite to the moved footprint face after each move,
  its rooms inside, its tower centres inside or on it and its wings reaching every storey the base wings reach with at least their area at each (the storey rule of §2.6's stage-3 contract), undo restoring it byte for byte — the stage-3 intake runs the
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
    demolished or succeeded, and a front building made a footprint trace or demolished leaves its passage with no `frontBuilding` and no base wing spanning it, the undo restoring both (§2.6's `BaseWing.spans`); (T8-4) the exposure function is monotone in each driver's weight, and its chance share
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
  * *The underground (items 11, 12, 14; II.6, II.7).* (T11-1) tunnel conversions by hand undo exactly; a `caveIn` given a stretch splits the tunnel at the stretch's widened ends (II.6, §6.3; J-A11.43) — the first-vertex part keeping the address, every part continuing the lineage, the chambers and access points re-pointed, and each underground block's `Frontage` that spans an end split there (each part beyond an end a new record with its kerb edges' rows, one spanning both ends of an interior stretch split in three, each part keyed by §6.3's rule for a split `Frontage` and re-pointed to the part it fronts) — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its undo restores the one tunnel record and each split `Frontage`'s one record; no
    `EvolutionStrategy` plan on the hook fixture contains a tunnel `demolish` (a lint); a sealed tunnel persists at its
    address and reopens; (T12-1) a schema fixture of one underground neighbourhood — two navigable tunnels, a junction,
    six cells, one vault, one stair, two gratings — validates and passes every row of §5.3's U1–U3 family: each
    underground plot's frontage rows on exactly one navigable open tunnel run, no `way` chain and no `alley` face on
    the underground arena, every building's frontage side on its plot's frontage edge, ≥ 1 access per neighbourhood,
    every access point in public ground, a yard or a building's basement — a `cellar_stair`, `ladder`, `hatch` or
    `door` only from the basement of a building II.7.3 admits (its neighbourhood rule's class row or a `secret` plot, or
    its *Basement accesses*, item 64) or that an access edit gave one (§7.3 item 9) —, every `grating` on public ground, 0 underground faces under an excluded ground face (also on
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
    mutation keeps every kept part byte-identical (leaf digests) and leaves everything outside its event's effective scope untouched (§7.3 item 1: the plot, its joined neighbour, each displaced use's new site and the buildings and plots its capacity re-homing touches; the locality oracle); (T18-2) locked parts are never subtracted; (T18-3) A → B → A by the
    inverse mutation is byte-identical when nothing else changed, and one change from one starting state yields one
    mutation record on every host; (T18-4) S11 run as a mutation from the empty design reproduces generation
    byte-identically; (T19-1) every roster class has a designation template with every band row (registry test);
    (T19-2) the size budget is monotone along prosperity (Spearman ≥ 0.9 over B-CITY) and continuous between adjacent
    samples by §7.8's rule on the template's continuous columns — two smiths a few streets apart differ by degree;
    (T19-3) a `setAttr` material change leaves the geometry subtree of the digest unchanged; (T19-4) with no epoch
    every residential building houses at least one household and at most its capacity (§2.6's function) — the households S10b placed in its slot (one to its template row's `households.built`) clamped into [1, capacity], but for the moves §4.7's overflow pass reports — every building S11 builds for a slot without `houses` (§10.2; `BuildingSlot.unhoused`, §2.5) houses none, no plot's site plan holds a `required` structure below its least `count`, and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a fixture whose district holds a live-in workshop and no household of its band or drift, the workshop's plot keeps its use and its main slot, which S11 builds without `houses` — `BuildingSlot.unhoused` set (§2.5), capacity 0 (§2.6), housing none, `Building.dwelling` absent — the typing reported (§4.7); on a dossier fixture whose squalid district's shells hold fewer households than their template rows, every household that fills the dossier's population is housed — those no building has room for in a residential slot the `dossier` request re-provides in their district —, no building exceeds its capacity, and each re-provided slot is reported (§7.7 item 2; the dossier clause, from M3a).
  * *The dossier (items 20 and 22; §7.7).* (T20-1) a map delete of a dossier-backed element re-places it coherently from
    the same seed, every plot outside the disruption set byte-identical; (T20-2) by §7.7's lapse rule, the rejection lapses at
    a dossier event touching its block (the dossier-event clause) and at the first epoch whose population target has moved
    from the one it recorded by more than the roster tolerance (± 5 %, §4.11; item 76), a drift inside it lapsing nothing
    (the epoch clause, from M4), and an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event returns F-EDIT (§7.4); (T20-3) a blocked positive placement returns its blocking rows and ≥ 1 closest site;
    (T20-4) generator-added filler deleted, the dossier's housing re-provided elsewhere; (T20-5) the one-way
    door (item 20 (a)) — an enumeration of the bridge's message kinds (§11.3) finds no PLAT → host message that
    addresses the dossier (`doc.changed` carries map-document events only, `report.changed` the map's report), and over a
    B-EDIT sequence `report.changed` carries every rejection, placement, lapse, relocation and mutation record the
    sequence made (§5.4's entries); (T20-6) by §7.7 item 2, a map `unassign` of a dossier-backed element, a map `setAttr` of its use or class, a hand `convert` `closeUse` of its use or `mutate` of its plot to another designation, and a plot `join` or `split` whose fate would demolish the building that houses it each return F-EDIT with `rejectSite` and `placeAt` offered and change nothing, while a `relocateUse` of it commits, and a `revert` of it skips every later dossier event (`EditBase.dossier` set) that placed or re-designated it, its dossier content unchanged (§7.4; item 20 (c)) (the refusal clause); on a B-CITY dossier fixture whose dossier-backed use stands in a declining quarter, a hand `convert` `vacate` or `demolish` of the building that houses it returns F-EDIT, and in every epoch whose use step, redevelopment, population fall or conversion reaches the use or its building the use is never closed and its building is emptied or removed only after the use has moved — a pinned use keeping its building (§4.11's *Dossier content across epochs*) — with §5.3's dossier row holding after every epoch, and an `undo` naming an epoch that carried a dossier event in `EpochInputs.dossier` returns F-EDIT and changes nothing (§7.4) (the epoch clause, from M4; J-A17.01); (T22-1) the same history from
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
    buildings (rectangles, L and T shapes, a court closed by a U, a quad from a curved row, a rectangle carrying a round tower, a rectangle holding a round tower wholly inside it, a rectangle carrying two round towers whose rings overlap, a T of two overlapping wings whose second wing holds a round tower that also overlaps the first, a rectangle carrying a stair turret (a round tower whose spiral core's bay fills its round room), a
    manor of three wings at unequal storey counts), each in six classes and three bands with one to four storeys, the
    entrance sets of item 29 and a cellar wherever the class row gives one; from stage 3's landing, the plans of every clicked
    building of B-CITY-lite as well. Hard: (T28-1) each room the programme marks hard is present; soft rooms are
    delivered, folded into a neighbour or dropped, each with its tier in the report; (T28-2) starting at the main entrance — and, for a basement whose `Basement.access` is `external`, at its outside door where step 3 opens one (§2.6 step 3) —
    openings and stair cores lead to every room of every storey; each entrance gives onto a room; a passage can be
    entered from either of its ways; (T28-3) stairs stacked — a stair core occupies one bay through all the storeys it
    serves, and the basement is entered by that core, through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring or, for a walk-out, where no side of the ring is long enough for its door (§2.6's fallback, step 3; J-A29.25) — or, for any other walk-out (`Basement.access` `'external'`), by its outside stair; (T28-4) the outer walls
    coincide with the wings: on each storey the rooms together cover exactly the extents of the wings reaching that level
    plus the span ring of each passage a wing spans, at the ground storey only — the passage room (§2.6's fourth rung) —,
    each exterior wall segment sits along the edge of such an extent or span ring, each room's ring is simple and lies
    within its wing's extent at its storey (the passage room within its span ring), each composed tower's round room at each storey the tower reaches — with any spiral core's bay (`StairCore.tower`) or chimney stack standing in it, or that bay alone where it fills the room (a stair turret) — covers exactly the tower's ring there less those of the earlier towers in the clip order that the tower overlaps (§2.6's stage-3 contract), and no gap or overlap remains between rooms (§3.10's seed-tiling row per storey); (T28-5) each chimney rises from a hearth's
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
    tile that unchanged shell; (T28-15) re-uniting the households restores the earlier plan where nothing else changed — exactly for an unstored plan (§2.6's canonical chain); for a stored plan, every household's unit with its own door, the shell read without the `composition`-role vertices (§2.6, J-P48 (1)), and the subdividing event's undo restoring the plan byte for byte (§7.4) (item 18 (e)'s
    inverse); (T28-16) a schema test that every band of the band set maps to an interior row, and that every row names
    its unit, shared, staff, circulation and size columns; (T28-17) the owner's concern — after a district's two-band
    fall every roster household is housed without a new plot, bounded by each shell's capacity (the housing clause — in
    the base on a hook fixture, the `relet`s applied by hand), and no F-PLAN tier drops a household unit, a unit
    falling to the next poorer form first (the F-PLAN clause, from stage 3's intake); (T28-18) a hand `relet` above §2.6's
    capacity returns F-EDIT (the `relet` clause), and a `setRoomUnit` that would leave a unit without its own door
    returns F-EDIT (the `setRoomUnit` clause, from stage 3's intake); on a B-EDIT fixture a `setAttr` of a tenement's heights, a `moveVertex` that shrinks its footprint, a moved face of a passage it spans and a §7.6 edit of its template's `households.max` each lower its capacity below its households, and each edit's dry run lists the households past the capacity (the last in address order, a locked or pinned one passed over) with their `relocate` moves and holds that building and the receiving buildings in its effective scope; after commit no building houses more households than its capacity (§5.3); the undo of each returns every household to its former building byte-identically; a prosperity-brush stroke that lowers the tenement's plot `builtBand`, bringing its capacity below its households, re-homes its excess the same way, and the stroke's undo returns every household to its former building byte-identically (§7.4's setField row); a `setAttr` of the tenement's plot use to a class that leaves it no residential slot (capacity 0, §2.6) re-homes every household it houses the same way, and its undo returns the tenement's design and every household to its former building byte-identically (§4.7 S11 rule 5; §7.4's Application); and an edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household that fills no dossier's population that no residential building of the district has room for — returns F-EDIT; on B-EDIT dossier fixtures whose district has no residential room for the excess and whose tenement holds no locked or pinned household — one whose re-provision moves a use, one whose re-provision joins two plots — each of these edits, the brush stroke among them, commits, the households past the capacity that fill the dossier's population housed in the residential slots the `dossier` request re-provides inside the district (§4.7), its dry run listing each such slot with the use its re-provision displaces or the plots it joins (§7.3 item 4) and holding the plots that request touches — each site with its joined neighbour or the displaced use's new site — in its effective scope (§7.3 item 1), and its undo restoring those plots and every household byte-identically (§7.4; §2.6's capacity rule; the re-homing clause).
  * *Entrances and basements (item 29; §2.6).* (T29-1) each building has one main entrance and only one, facing its
    street, its court or passage, or — a cluster structure — its footpath (§2.6 rule 1) (100 %; O5 (f)'s doorless count stays 0); (T29-2) no side or rear entrance without an access
    edge beyond the frontage, and the caps per class hold; (T29-3) no cellar under the flood band or on the water
    table's damp ground; (T29-4) every basement inside its ground-floor footprint and smaller, with its storey in
    `Heights` and its access by one of the three ways §2.6 gives it — the stair core, a trapdoor or, for a walk-out, an outside stair; the entrance row of §13.5, class C — the owner's rule (item 50) — stands for the main door; (T29-5) a VTT portal at every
    entrance of the set, and glTF and CityJSON basements below `baseCm` that validate (§11.1).
  * *Hidden plots (item 30; §4.6, §9.2).* (T30-1) every hidden plot is reachable by a chain of access edges — alley,
    court and passage faces — from a public way, 100 %; a sealed plot reads `sealed`, is reported, is never landlocked,
    and reopens; (T30-2) the hidden share per district lies within its target ± 0.03 — §4.6's band rows interpolated at the district's area-weighted mean prosperity value and scaled by its rung and density factors (§13.7); (T30-3) no label
    of a local or secret place appears at the settlement band without the viewer's knowledge key, and no secret name
    enters an export made under a view state without it; (T30-4) the parity presets and the village rungs produce 0
    hidden plots, and a hidden court passes §8.5's figure-ground metrics, reading as a court behind buildings; every passage with a `frontBuilding` has its `headroomCm` written and equal to §2.5's rule, after a heights edit of a spanning wing too, each base wing spanning it has at least two floors and an eave above that headroom, and a heights edit that would leave a spanning wing below two floors returns F-EDIT;
    (T30-5) by §11.2's knowledge rule, on a document holding a `secret` institution, `query` of every kind (`gazetteer`,
    `people`, `whereIs`, `relations`, `hit`, `inView`, `why`) and hover list its row with `withheld: true` at the `public` tier
    — a view-bound kind (`hit`, `inView`, hover) at every band coarser than the building band, the one band §9.2's table
    admits it at; a person working there naming it by its address only; the band-less kinds and a GeoJSON export
    withholding it as at the city band — and its name at `secret`; a `why` on the withheld place answers at `public` with
    its address and kind only, `withheld: true`, and no rule, input or alternative, and on T63-2's front fixture the front's
    `why` is the front's own and a `why` on a concealed part answers empty, no answer naming the concealed function; and at
    `public` a `why` on another building whose relation rows, supply edges or alternative sites include the withheld place
    gives that place by its address and kind only, `withheld: true` (§11.2's oracle rules (1)–(4)); a viewer's `preview` of
    any event returns `status: 'refused'`, `reason: 'role'`, with no fates, renames, counts or shape, and an `editor`'s
    `preview` of the same event returns its dry run (§11.2's *Knowledge*);
    `export` of `.plat` and of a permalink under a
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

* **Amendments c (items 33–62): the bars of the code-reading items.** Stated once, here (R9); each mechanism is at the
  home §0.2's amendments-c table names, and each bar runs in the tier §13.8 names from the milestone §16 names. The
  mechanisms restated from the references' code change no golden (none exists before M1, D-24), and the reference
  numbers they reproduce stay §13.5's rows (J-A41.01, J-A41.02).
  * *The bent cut (items 34–41; §4.6).* (T34-1) every block S8 commits has an OBB minor extent below the `τ` drawn for
    its face and every face it cut one at or above it, replayed from the `cut.stop` draws; over 10 000 faces the mean of
    `g` lies within 7/30 ± 3 s.e.; (T36-1) the start A draws nothing — a face planned with a different `cut.t` stream
    keeps its A — and lies on the run most nearly parallel to the working major axis (ties: the earlier run); (T37-1)
    every kept corner K lies at least `o` from both ends of its first leg, or at `λ / 2` when `λ < 2o`; every second leg
    meets its far run square within the lattice tolerance; under `flatten` no kept corner's triangle A–K–foot is lower
    than `max(cut.flattenM, 0.02 × |A–foot|)`; under the `MFCG` preset every cut whose first leg meets its run within
    `asin(√0.99)` of perpendicular, and passes step 8's checks, is straight; no cut bends twice; (T38-1) fillets on lane and street
    cuts only, never on a lot cut; each arc touching both legs tangentially and curving the shorter leg from end to end, its chords no shorter
    than `w_min` or the lattice minimum edge; the filleted share on NG's recorded face shapes within §13.5's fillet bar;
    (T39-1) rung (a) plans at most three frames per face, each turned 36° from the last, and never restarts anything
    above the face; a face every frame fails reaches rung (b), reported; (T40-1) inside one district lane widths are
    non-decreasing in the lane's length, inside the class's width band, and never narrower than a lower class; (T41-1) a
    registry test — `cut.stop` registered with its reader, `cut.side` and `cut.farSideAlt` reserved ids that no reader
    draws (§6.1); and §13.5's bent-cut signature row, its fillet share included, on NG's recorded shapes at M0 (b).
  * *Plots (items 43, 44; §4.7 S11).* (T43-1) every plot's `frontJitterCm` is 0 or in [`jitter.minM`, min(√(plot
    area)/3, `jitter.maxM`)] at its interpolated columns, and over the plots whose depth does not bind, the share of
    receded main slots per band row lies within ± 0.05 of the law's expectation — the mean over those plots of max(0,
    1 − `jitter.minM` ÷ cap), cap = min(√(plot area)/3, `jitter.maxM`); (T43-2) on bent and curved frontages every row
    footprint's front chain lies at `h` from its frontage along the normal (within the 0.71 cm hot pixel) and every party
    wall is its plot side line; (T43-3) no recession lies in (0, `attractCm` + 1 cm), and an `editTable` or `editPreset`
    setting `jitter.minM` below that bound is refused naming it (F-EDIT); (T43-4) under the `MFCG` preset the recessions
    follow 4.8 m and 2 m, and the institution, tents and cluster rows draw none under every preset; (T43-5) a designation
    mutation that keeps the main slot keeps its `frontJitterCm`, and Regenerate (keep settings) reproduces every front;
    (T44-1) under the default preset every prosperous or rich set-back compound carries a `wall` PlotBound with a gate on
    each access edge, and under the parity presets none carries a wall.
  * *Walls, gates and districts (items 45–47; §4.8, §4.2 S3 (4), §4.4, §4.5).* (T45-1) a thin castle claim — its nearest
    boundary vertex within `castle.minInnerM` of its centroid — is bloated before any equalise pass; a repaired claim
    reaches compactness ≥ 0.75 with an `on_enceinte` claim's weld vertices and, once fixed, its gate side's ends unmoved;
    a claim the repair cannot bring to the gate goes to re-site with a report and never restarts anything; (T46-1) on
    walled B-CITY seeds whose pick contour follows a sea or lake shore over at least a `gate.waterfrontShare` share of it, the main gates equal §4.2 S3 (4)'s reduced `N₁` exactly unless N was requested, and every trace is smoothed by
    exactly `wall.smoothPasses` passes with its gates, welds and shore vertices unmoved; (T47-1) districts seeded at a
    gate, the castle or a bridgehead have a median area below the town's median district area on ≥ 90 % of B-CITY seeds,
    and a scoped regroup (§7.3's S6 row) replays the same turns by seed lineage (J-A47.01).
  * *The hinterland (item 57; §4.9).* (T57-1) under the sector-look preset in `demand` mode no field cell is more distant from the settlement's edge than a non-field cell of the preset's admissible land (the outward order); under `fill`
    the field land equals the mode's; the farmstead count equals the farm table's under both sector variants.
  * *Drawing and labels (items 54, 55; §8.2, §9.3).* (T54-1) under `ink` every footprint's raised under-copy is swept by
    the sheet's base offset times its class's ratio — house 1, landmark 2, farm building 0.6 —, on 100 % of footprints;
    (T55-1) the horizontal spine is the first candidate of every area label whose tree has ≤ 64 leaves, and the candidates depend on the model alone — identical under every view rotation and zoom, as §6.2 requires of hashed label
    candidates.

* **Amendments c's owner rules (items 20 (h), 63–72): hook tests and acceptance bars.** They are stated once, here (R9);
  the mechanisms they prove are at the homes §0.2 names (the character at §4.5, placement at §4.7, Works at §4.11, the closure at
  §7.3, the dossier at §7.7, light at §8.4, the underground at II.7.3, II.7.5 and II.7.6), and
  the rules of the amendments-b group above apply to them: a bar is hard — 0 violations, or 100 % — unless it names a
  band; each runs in the CI tier §13.8 names, from the milestone §16 names; the bars of a staged engine (the underground
  layer, the evolution engine) run on hook fixtures with its conversions applied by hand until the engine lands, when the
  same bars bind it (J-A63.01). The entity registry's path test covers the records and attributes §2.8's registry lists
  for amendments c — `Works`, `LightSource`, `UndergroundSystem`, `Gallery`, `Chamber`, `UndergroundLink`, each kind's dossier paths (§2.8's registry; item 20 (h)),
  `Plot.tenure`, `District.character`, `identity`, `pressure` and `nameHistory`, `Assignment.state`, `Institution.powers`
  and the staged records, schema-complete and empty — and the enumeration test the event kinds amendments c adds (§14's
  list); a bar that meets a golden follows §13.3's declared-shift rule.
  * *Clandestine institutions (item 63; §4.7).* (T63-1) every clandestine institution is placed in one of its allowed
    modes — front, hidden or underground — or in its reported fallback (underground → front → hidden); (T63-2) at the
    `public` tier every view, label, query answer and export shows only the front — the true function, its concealed
    rooms, door and link withheld (T30-5's enumeration, run on a fixture holding a front with its hidden function) — and
    at `secret` both; (T63-3) the B-PLAN fixtures confirm that a front's concealed rooms are reachable only from its
    concealed entrance or its service side (from stage 3's intake; in the base the schema fixture carries the flag and the door);
    (T63-4) over 1 000 seeds the `underground` mode is never chosen without an underground allocation (II.7.3), and the
    parity presets place no concealment.
  * *Basement access (item 64; II.7.3).* (T64-1) an access point stands only where a basement lies within the access reach
    of a tunnel or a sewer dwelling; (T64-2) over 500 CITY seeds on the layer's hook fixture the access rate of each class lies
    within its row's probability ± 3 s.e.; (T64-3) clandestine buildings over a network carry an access at least at their
    row's rate times the concealment multiplier. T12-1's clause on where an access point stands is the amendments-b
    group's (public ground, a yard or a building's basement).
  * *The underground family and the undercity (item 65; II.7.5, II.7.6; the geology flag, §4.2 S1).* (T65-1) an undercity exists only where a void
    source exists and at least one lifeline reaches it; (T65-2) on 500 seeds per rung its neighbourhoods stay within
    `RungProfile.layers.undercity` (§1.1) — none on the village rungs, at most one at TOWN and only above that row's
    population floor, at most two at CITY and three at METROPOLIS — and the circumstance `require` gives one at TOWN and
    above while `forbid` gives none; (T65-3) every building under a ceiling is capped by it (its eave below the chamber's
    ceiling less the row's clearance); (T65-4) every connection link is typed (open, gated, secret, collapsed, flooded)
    and knowledge-gated; (T65-5) the population stays whole — the settlement's households are the same set with and
    without an undercity; (T65-6) U1–U3 hold on the sewer's part with an undercity present, and re-deriving one
    underground system leaves the ground and every other part byte-identical but for the far `link_end` vertices of its
    links, each placed, kept or stripped by one transaction on its own part — a stripped one restoring the edge it split
    unless other geometry has met the vertex since (§3.4) (the per-part twin of T12-1's reroll isolation; §3.10's row);
    (T65-7) with `geology: 'auto'` and each relief class set by the site request's `relief` toggle (§4.2 S0), over 1 000
    seeds per class the shares S1 resolves to `soluble` and `volcanic` lie within ± 3 s.e. of the feature table's geology
    row at that class, each resolution recorded in `autoResolved`; with `relief: 'auto'`, over 1 000 seeds per rung the
    classes' shares lie within ± 3 s.e. of the rung's relief row, and a digest whose `site.terrain` is given — a
    test-side edit of a fixture's digest — takes the class §7.7 DR1 maps it to; setting either toggle moves no other S0
    draw (§6.1); and every run under the parity presets, and a sky island's terrain (from M4, on the islands' hook
    fixture, II.6), reads `ordinary` (§4.2 S1 (10); J-A65.49, J-A65.02); (T65-8) on a TOWN hook fixture with the
    undercity forbidden, a test-side `HistoryHint` (item 88) carrying one `fire` scar of severity 0.6 makes one `buried`
    system at generation — its region the districts of growth stage 1, its galleries their way centrelines 320 cm below
    the present grade, its chambers their buildings' ground storeys — and the log records no `raiseGrade`; a scar of
    severity 0.4, an empty hint and the parity presets make none; and the ground arena's digest is the same in the 0.6
    and 0.4 runs and in a run whose hint keeps their `ageYears` and no scar (II.7.6's *A buried old town*; J-A65.46,
    J-A88.42).
  * *The closure rule (item 66; §7.3 item 9).* (T66-1) `addUndergroundAccess` on a building without a basement gives a
    lawful basement — full, half or a hatch to a crawl space, by the terrain gate — or a stated refusal, never a silent
    change; (T66-2) every generated connector is reachable end to end and lies inside its depth band; (T66-3) its undo
    restores the document byte for byte; (T66-4) a second access sharing a connector survives the first one's deletion,
    and the last one's deletion removes only the pieces nothing else uses; (T66-5) the closure's first base instance
    (J-A66.01): a `setAttr` that sets a placed use's `concealment` to `front`, its `front` another use of that building
    (§4.7's *Concealed institutions* (1); `Use.front`), on a building whose plot
    has an access edge beyond its frontage onto an alley or a passage, adds the concealed door by §2.6's entrance rules in
    the same event (*Concealed institutions* (4) (b)), its closure record naming the door, and its undo removes exactly
    that door; with no such edge it adds none, the concealed programme reached from the front's service side (§4.7's *Concealed institutions* (4) (b)).
  * *Works and the weekly clock (items 67, 76; §4.11).* (T67-1) the stage drawn at week w is a pure function of the
    Works record and w: reached directly or by scrubbing forward and back, every drawing is byte-identical and no model
    digest moves; (T67-2) no Works leaves a plot without an access edge at any week; (T67-3) a merge or a split shows the
    old boundary until its clearing stage; (T67-4) a demolition's households are rehoused (item 17) before its first
    stage; (T67-5) no Works at generation and none under the parity presets, the goldens unchanged; (T67-6) on the hook
    fixture an epoch's share of buildings in works lies within ± 3 s.e. of growth × mean duration ÷ span, and a decay
    Works within its dwell band; (T76-1) its cadence clauses (from M3a, on the port's `EpochInputs`) —
    an epoch folds at each 52-week boundary and at a population move past the roster tolerance, none on a 2 % drift, with
    `years` = Δweeks ÷ 52 —; its per-year clause (from M4, with the epochs) — per-year rates give equal expected firings
    under a weekly and a decade cadence.
  * *Light (item 68; §8.4, §4.7).* (T68-1) a spot lit from every side by several point lights carries no shadow;
    (T68-2) no shadow climbs a taller roof; (T68-3) a shadow falling on a lower roof is shortened by that roof's height
    and continues beyond that roof onto the next building or the ground; (T68-4) on the CPU reference the lighting is
    byte-identical for the same model, lights, view and time on the five engines (§6.5 (9)); (T68-5) at night every way
    class × band reaches its light rows' target minimum illuminance on the CPU reference, interpolated along the value;
    (T68-6) no light stands on a hidden, sealed or clandestine plot unless a row places one; (T68-7) the GPU pass lies
    within §13.4's tolerance of the CPU reference; (T68-8) with the GPU lighting unavailable (no GPU, a lost context) the
    next rung of §8.4's ladder is drawn and reported, never an error (§5.2); (T68-9) no light on a building in Works
    before it is finished (item 67).
  * *Informal clusters (item 70; §4.7 S11).* (T70-1) every structure has its own door on a footpath that reaches an access
    edge of its plot; (T70-2) the fire-gap minimum holds between structures; (T70-3) the households per structure
    lie within the row and within each structure's capacity; (T70-4) no cluster stands on a standing plot whose geometry
    floor is the middle band or above, none in a district whose band range excludes the squalid band, and no structure in
    a wall strip; (T70-5) under the parity presets the shanty districts draw FTG's tents row and MFCG's hovel (T27-2's
    shanty fixture extended); (T70-6) at generation every `informal` plot is one that §4.7 S11's *Informal clusters* (2)
    gives the cluster row, so none lies outside a shanty-typed district, and no class-mix draw (§4.7 S10b) yields a
    cluster structure's class — `shack`, `tent` or `lean_to_shelter` (§10.2; *Informal clusters* (1)–(2); J-A70.49).
  * *The class mix inside a band (item 71; §4.7 S10b).* (T71-1) inside a band row the manor share rises monotonically
    with the prosperity value, reaching 1 at the extreme of the table; (T71-2) at equal relative position a wealthier town shifts
    the share in the declared direction; (T71-3) in mixed blocks the largest classes stand on the highest-prestige
    frontages at a share above a shuffled-placement baseline by §13.7's margin; (T71-4) manors on joined plots and houses
    on standard ones within one block.
  * *The neighbourhood's character (item 72; §4.5).* (T72-1) the character vector is a pure function — recomputed from a
    saved model it is equal; (T72-2) a district's name changes only past the hysteresis or by a rename; (T72-3) value,
    not volume — the owner's fixture: many lodgings never outweigh a few churches, and three churches or one cathedral
    alone make the religious quarter; (T72-4) one district per district-defining dossier instance, its defining trade at
    the row's share and not on every lot; (T72-5) dispersed classes spread, none gathered into one district by rule;
    (T72-6) every building's prosperity-driven state lies inside its district's band range, an institution's excess
    raising the district's pressure; (T72-7) a shared building's total amplification and contribution never exceed a
    single-power building's of equal significance; (T72-8) the economy dial is proportional to the sector's share with no
    rank bonus, and an even mix is neutral; (T72-9) after S10a every household it distributes to blocks has its band inside
    its district's written band range (a household no admitting district has room for housed in the district whose range
    lies nearest its band and has room, its band read at that range's end — a derived band, reported —, so none is left
    unplaced for its band, F-SITING meeting only one outside a dossier's population that no capacity holds, T19-4), each household S10a
    moved from S7b's provisional allocation is reported, and no record holds the
    provisional range (a schema test); its dossier clause (from M3a, with T19-4's): on a dossier fixture whose written
    ranges exclude households S7b allocated and whose other districts lack the capacity for them, every household that
    fills the dossier's population is housed in its own district by §4.7's re-provision (§4.5 (5); J-A72.50).
  * *Derivation fills every gap (item 20 (h); §7.7 items 9–11).* On the dossier fixtures of the port's group below and,
    standalone, on blueprints (J-A20.06): (T20-7) no derived fact contradicts a dossier fact — every derivation row's bar
    holds, counted by §5.3's coherence rows; (T20-8) a dossier change re-derives exactly its disruption set — the rows
    whose inputs it changed — and nothing else; (T20-9) a map edit of a dossier-owned value (a dossier name or kind, a
    dossier-set `knownTo`, concealment, front or state, a count outside its range, the population) returns F-EDIT
    `dossier-owned` and changes nothing; (T20-10) the totality test — every map-fact family of §2.8's registry is covered
    by a derivation row, and every row's chance is a registered §6.1 concern or none (one test with T73-10; J-A83.01);
    (T20-11) a schema test that every door and `HostContext` field beyond the dossier's content is optional; (T20-12) from
    M1 the rows run on the frozen fixtures and, as the stand-in dossier, on a blueprint's own roster, T20-7 and T20-10
    holding on both (T22-1's purity and T20-5's one-way bar stand); (T20-13) on the fixtures and on a blueprint,
    `factTier` (§2.8; J-A20.23, J-A20.24) reads `dossier` on exactly the paths §2.8's three conditions give — a dossier
    ref, a registry dossier path and a carried value —, `declared` on exactly the paths an author's declaration set
    (`flags.editedPaths`, and the existence and position a declaring event pinned; item 101), and `map` on every other
    path, a blueprint with no dossier reading no `dossier` tier; §9.2's reader, every export (`plat:tier`) and the tool
    API (§11.2) show that tier (J-A20.82).
* **The dossier port (items 73–88): B-DOSSIER-lite and the port's bars.** The frozen dossier fixtures (item 84; J-A84.01,
  J-A84.02) live in `plat/tests/fixtures/dossier/` — inside `plat/` by §17.1 (3)'s path rule, and never under `research/`
  or `captures/`, whose JSON the document checks read as corpus. They are cut only from runs of the named SettlementForge
  line — the first `fp/integration-2026-09-23` at commit `5d699cc68` (J86 Q1) — never from an on-disk working tree, and
  are re-cut by the same scripts when the owner names another line; the build copies them at M1. Their `manifest.json`
  holds one row per file:

```ts
// @plat/testkit — the dossier fixtures' manifest (items 83, 84)
interface DossierFixtureRow { file: string; sfLine: string; commit: string; generatorVersion: string; seed: string /* the synthetic seed the file was generated from */;
  config: string; generatedBy: { lane: string; date: string }; kind: 'birth'|'after-events'|'after-ticks'|'world-state'; pairsWith?: string /* the file it pairs with */;
  population: number /* persons */; tierWord: string; ourRung: Rung | 'refused'; notes: string;
  neverPublish: ('seed'|'config')[] /* the host's seed and config fields inside the file: kept for re-cutting, never carried by an export or a document (item 85) */ }
```

  The set: nine at-rung births — town-1 Berghafen (2 130 people, TOWN), town-2 Novaorum (3 174), town-3 Glenford
  (2 492), sample-mossgate (4 155), town-nb-1 Novasaltus (4 921; the one set of partner-level trade links), town-cc-1
  Großmark (4 196; a custom-content record keyed by its local uid), city-1 Pianopagus (23 178, CITY), sample-blackcrag
  (18 911, CITY) and metropolis-2 Ventovicus (47 734, METROPOLIS); three refusal births — culture-latin Collevilla
  (1 287), sample-cnocby (767) and village-1 Lipopol (782); the totality-only files — the twelve culture towns,
  metropolis-1 and metropolis-3; and the pairs for the absorb half — the probe town before and after seven events with
  its per-event record; town-1 and city-1 after one week, one season and one year under the birth default and after a
  lit year, each with its world state; the probe town after a plain and a lit year; village-1 after its years.
  **B-DOSSIER-lite** runs each at-rung birth × 5 seeds (the fixture's derived seed, then four `rerollLayer` salts) through
  `digest`, `creation` and `generate`, and holds:
  * *the creation bars* (M1): (T73-1) every dossier record placed — 0 tier-6 omissions; (T73-2) the population within
    ± 5 %; (T73-3) the residential building count inside the housing record's range; (T73-4) every collective record's
    count inside its range; (T73-5) walls exactly when the walls bucket holds a record, the number of gates inside the access
    row's range; (T73-6) every quarter name on exactly one district, or reported waiting (§7.7 item 16); (T73-7) the
    population-weighted mean household band within one band of the wealth row's mapped band; (T73-8) the cross-engine
    digest, stated in §6.5 (9) and scheduled here; (T73-9) the three refusal fixtures refused with `E_RUNG_UNAVAILABLE`
    naming the village product, at birth and after their ticks; (T73-10) the vocabulary totality — every enumeration
    value of the fixtures has a table row or the declared fallback, the port's `unmapped_word` notes 0 and its
    `unmapped_kind` notes equal to the M1 class gap, listed (one test with T20-10; J-A83.01);
  * *the absorb bars* (M3a), on the pairs: (T75-1) every `DossierChange` dated by a rung of §4.11 or reported
    `unreceipted_change`; (T75-2) every removed element's plot vacant and every ruined one present as its ruin; (T75-3)
    the seven-event pair's disruption within its budget or reported over it; (T75-4) the host's undo — the before-dossier
    fed after the after-dossier — converging with `state_matches_absorbed`, its residue reported; (T75-5) a rename with
    a receipt re-bound, one without reported as a removal plus an addition;
  * *the typed slices and the rung* (M1, M2b, M3a and M4): (T77-1) its slice clause (from M1) — a partner's bearing,
    drawn on its own key when the dossier gives none, does not move when an unrelated fact changes —; its weight clauses
    (from M2b) — `TradeFlow`'s gate weights sum to one, a harbour town's harbour carries the sea share, a way's trade
    weight equals the sum of the gate weights routed over it, and `TradeFlow`'s S3 (7) values — the gate weights, the
    harbour's share and the dominant bearing — equal their values after S4, S3 (12)'s principal-market score reading
    those gate weights (§4.3; J-A77.42); (T81-1) (from M4) an epoch whose population target crosses
    a band upward changes the rung's row and grows the frame by §3.2 (9)'s batches, every entity outside the growth's
    region keeping its address, and every face outside that region and beside no deleted stretch of the old margin or
    border keeping its ring, its owner and its nested faces, re-parented where its parent was joined, every raster keeping
    its `cellCm` with every old cell in its place and every stored height unchanged, the `hydro` fields equal to a fresh
    computation over the grown grid and every river's traced course inside the old arena unchanged — or, where M4's
    memory measurement took §3.2 (9)'s pre-decided re-grid, each raster at the new rung's `cellCm`, every standing
    entity keeping its stored `baseCm` and the report naming the re-grid (§3.2 (9);
    J-A81.31); (T81-2) a digest built from the town-1 fixture with its population set to 150 000 — a test-side edit of
    the digest, never a fixture file — is refused `E_RUNG_UNAVAILABLE` naming the population cap by `creation` (the
    creation clause, from M1) and by `absorb` against the document town-1 made (the absorb clause, from M3a), nothing
    absorbed (§1.1; J-A81.01); (T88-1) with the staged rows and records empty (`PortRows`, §10.2; `Recipe.history`'s
    `HistoryHint`, §2.9; every `PowerRelation`, §2.7) the staged readers of J-A88.41 and J-A88.42 (S2's stage count at
    §4.2, the typing row, the alliance spill and the dials at §4.5, the crime term at §4.6 with its readers at II.7.3 and
    II.7.5, the import share at §4.9, and the catacomb age and the buried old town at II.7.6) change nothing: on the golden suite the model
    digest equals the one a test build gives with each reader replaced by its base value, each reader from the milestone
    that lands its stage; (T88-2) (from M2b) on a dossier fixture whose `PortRows.impairments`, filled test-side, holds a
    non-physical row (`physical: false`), a visible impairment of that type on one dossier institution
    (`DossierInstitution.impairments`, §14) lowers that institution's own dial term by §4.5's rule and changes no other
    institution's term and no district's dial (J-A88.42);
  * *the seam's bars* (item 85; M1): (T85-1) CI runs hostile names — markup, script, event attributes, entities and
    control characters, very long and right-to-left strings — through every exporter as dossier names, display names and
    user renames, and every output is well-formed and inert by §11.1's bar; (T85-2) a dossier-bound document, its
    snapshot, its permalinks and every export hold no occurrence of the host's seed, and the recipe's seed equals
    `H32("plat:sf-seed" ‖ that seed)`; (T85-3) from M3a, display names reach only the export they were given to — the
    document and the next export are unchanged.
* **The authoring toolkit (item 101; §7.1, §14): elegance bars and fixtures.** (T101-1) at most twelve tools — a
  registry test that every tool maps to its declaration kinds in §7.1's table, so a thirteenth tool fails it (a new
  capability is a parameter of a tool); (T101-2) each tool is one declaration kind with one dry run, one fate report and
  one undo step (an enumeration over the table); (T101-3) the same declaration made on the canvas (a scripted gesture),
  through the tool API and in a skeleton file gives one event, byte for byte; (T101-4) a map's declared subset exported
  as a skeleton and re-imported under its seed reproduces its model digest, and a clerk's transcript of tool calls,
  replayed, gives the session's digest (§6.5 (9)); (T101-5) no declaration contradicts a dossier fact or a lock without
  a refusal carrying its reason and at least one closest alternative; (T101-6) J78's acceptance fixture (M3a) — an
  original skeleton with a known city's structure and our own names (`docs/experiments/known-city-authoring.md`; J78) —
  authored three ways: as a skeleton file, by hand through the scripted canvas, and through the tool API from a clerk's
  recorded transcript made from the fixture's description and roster; the skeleton file and the hand-authored map share one model digest under
  one seed, and all three meet the fixture's structure list (every declared quarter by kind and name, both enceintes with
  their gates, every named place in its declared quarter); (T101-7) points in, shape out — a two-point wall over the
  ridge fixture follows the ridge and closes when its ends meet; a seed quarter never crosses a block and its boundary
  lies on street centre-lines, water, walls or ridges; a level lake's shoreline equals the terrain's contour at that
  level; (T101-8) declared means held — a scoped re-roll over a quarter holding declared entities moves no declared entity,
  the fates list naming each one held; (T101-9) the count badge of a quarter, a fill or a roster equals the plots,
  households and buildings its committed event makes.
=== REPLACE ### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file ===
### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file

The `parity` CLI in `@plat/testkit` reads **only** `baselines.json` — our own measurements of the references, numbers
only, generated research-side by scripts under `research/baselines/` from the captures and committed into
`plat/packages/testkit/baselines/` (§17.1 (4)) — and our B-CITY outputs, and reports every metric against its band. It
never opens `captures/`, `research/` or `reference/`.

```ts
interface Baseline {
  id: string; metric: string; unit: string;
  reference: 'MFCG' | 'FTG' | 'NG' | 'VG' | `corpus:${string}`;       // corpus rows arrive through §13.9
  referenceBuild: string;            // itch build, FTG server date + create-request hash, NG / VG build — required
  capture: string; script: string; date: string;                       // provenance: capture folder, research-side script, run date
  matched?: { rung: Rung; mfcgSize?: number; ftgSize?: 'BIG_TOWN' | 'BIG_CITY' | 'CITY' | 'METROPOLIS'; population?: number };
  role: 'target' | 'weakness' | 'descriptive';                        // what the reference number means for us
  values: { p10?: number; p50?: number; p90?: number; n: number; seeds: number } | { bins: number[]; histogram: number[]; n: number; seeds: number };
}
interface ParityReport {                 // written by the parity CLI per run; read by milestone exits, §13.9's CalibrationRun and the release notes
  runId: string; date: string; outputVersion: string; generatorVersion: string; baselines: Hash128 /* hash of the baselines.json it read */;
  rows: { metric: string; baselineIds: string[]; role: Baseline['role']; rung: Rung; preset?: string;
    band: { lo?: number; hi?: number; ksMax?: number; direction?: 'above'|'below'; margin?: number };
    ours: { p10?: number; p50?: number; p90?: number; ks?: number; n: number; seeds: number };
    verdict: 'pass'|'fail'|'reported' /* descriptive rows are always 'reported' */; note?: string }[];
  summary: { pass: number; fail: number; reported: number } }
```

Each milestone's parity report is stored as `plat/goldens/parity/<milestone>.json` and named in its `MilestoneRecord`
(§13.3). The CLI refuses a row without `referenceBuild`, `capture`, `script` or `date`. A new reference build never
overwrites a row: it adds a row (the id gains the build) and is a **declared baseline shift** in the milestone's shift
record, so a silently drifting reference build (VG changed geometry for the same seed between build 19251041 and
build 19365073 = VG 1.6.9) can never move a gate unnoticed. Rows hold numbers, units and provenance only — no names, colours, grammars
or code.

**The band rule.** *Target* rows pass when ours lies in [p10 × 0.9, p90 × 1.1] of the reference's seed spread (a
single-value baseline: ± 15 %), and distributions when our KS distance to the reference is ≤ 1.25 × the reference's own
seed-to-seed KS distance at p90. *Weakness* rows are one-sided: ours must beat the reference in the declared direction
by the stated margin. *Descriptive* rows are reported beside ours and gate nothing. The bands below are this rule
applied to today's baselines; when M-1 re-measures a baseline (five seeds per matched MFCG size, FTG's new captures),
the band is recomputed by the same rule with provenance "M-1 ⟨date⟩", and a recomputation that turns a passing gate
into a failing one is declared in the shift record. Thresholds no reference can set are §13.7's. **The ⟨M-1⟩ rule:** a
reference number marked **⟨M-1⟩** is measured by M-1 (§16 lists every such measurement); if M-1 cannot measure it — the
capture lacks the feature, or the measurement is not reproducible across seeds — that cell becomes *descriptive*,
gates nothing, and enters `known-defects.json` with the reason; the parity CLI reports an ⟨M-1⟩ cell without its
baseline row as *fail*, never as *pass*.

**Matched sizes** (§12.2, §13.6): TOWN ↔ MFCG size 40 and FTG BIG_TOWN; CITY ↔ MFCG size 80 and FTG BIG_CITY;
METROPOLIS ↔ MFCG size 130 (FTG per D-31). MFCG numbers come from its plain-option size sweep (walls, citadel, plaza and
temple on; shanty town, parks, river and coast off; its JSON export is in metres, the internal unit 4.00 m). **Curves**
are measured after both sides are resampled at a 10 m arc-length step, so neither FTG's 25–40 m placement steps nor
PLAT's smoothed vertex spacing enters a number.

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| street turning | turning per 100 m; heading change per 50 m (10 m resampling) | FTG: zero mass above 15° per step and a flat heading spectrum (`_critic-ftg.md` §4 rows 7–9) — **weakness**; FTG's median turning per 100 m after 10 m resampling, on its payloads ⟨M-1⟩ — **target for organic presets**, with this row's own band | weakness clauses: no cliff (no empty bin above 15° while the bin below it holds > 1 %) and heading entropy ≥ FTG's; target clause: organic presets' median turning per 100 m within 0.5–1.5 × FTG's — a declared exception to the band rule, because FTG's per-seed spread over at most eight payloads is too narrow to stand for its generator's variation. *Fallback:* `headingSigma` (a table value, §4.4) is set so the organic median equals FTG's and the growth-drift row re-runs; if drift then fails, `headingSigma` returns to its default, the target clause enters `known-defects.json` as not met, and the row gates on its weakness clauses | P |
| growth drift | net turn of grown streets over 600 m (organic regimes) | — (our heading model, §4.4) | p50 15–30°; > 90° on ≤ 1 % | C |
| junction arm angles and degrees | every L1 junction | NG 361 / 361 T — **target** for organic presets; FTG median 90.02°, 58 % in 80–100°, 36.4 % 4-way in its Medieval city — **weakness** for organic presets, **target** for `ringed` and `american` | median 85–95°; p5 ≥ 30°; 4-way share organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % | P |
| street runs by class | junction-to-junction run lengths per class (never edge lengths) | FTG main L + 0.5, district (L + 0.5) / 2, suburb 30.00 m, lot outlines 14.70 m (roadlength100 README) — **target** for the extramural ribbon and suburb regimes, descriptive inside the walls | class medians by the band rule (extramural, suburb) | P |
| MFCG street signature | lot-orientation coherence R4 within 60 / 120 / 250 m; lot alignment with the wall by distance band; T / Y share; intramural dead ends; blocks per ha; lots per block | MFCG R4 0.84–0.97 / 0.58–0.88 / 0.32–0.68; within 40 m of the wall median deviation 3.5–4.5° and 84–92 % within 15°, 56–70 % at 40–100 m, 38–58 % at 100–200 m (redteam-mfcg MFP-2, from the exports); T / Y share, intramural dead ends, blocks per ha and lots per block from the sweep ⟨M-1⟩ — **target** inside the walls | the band rule, walled districts | P |
| blocks | L2 built-block areas per district | NG block counts per template at `medium` (vertex captures) ⟨M-1⟩ — **target** on the same face shapes | KS by the band rule; inside the NG band on the same face shapes (O4 f); §4.6 step 1's plot-depth rows and regime floors are re-fitted at M-1 under its per-face stop threshold before this band is signed (item 34; J-A34.01) | P |
| deep block interiors | court share of deep blocks per band | NG hollow-block frequency (vertex captures) ⟨M-1⟩; MFCG inner-lot removal (sweep) ⟨M-1⟩ — **target** | the band rule per class (§4.6) | P |
| bent-cut signature | infill and lot cuts | measured outputs of NG 1.2.2's mechanism (reproduced by §4.6's restated law): start at N(0.5, σ) of the OBB major axis with σ 0.066 (plain faces) and 0.098 (ring faces); one bend at mid-course in 380 / 519; ≥ 85° arrival in 96 %; 53 % filleted (BG-1 / BG-2 / PF-3; manager note 3) — **target**, measured the same way on ours (the recorded frame, the rotated retries included) | σ within ± 0.02; corner within 0.10 of mid-course ≥ 80 %; arrivals ≥ 85° ≥ 95 %; fillet share within ± 0.05 of the share NG shows on identical face shapes (§4.6 step 6's rule predicts 209.9 of NG's 378 recorded corners where 200 were filleted; J-A41.01) | P |
| figure-ground and streetwall (plot texture) | city-band street-edge recoverability; gross footprint cover inside the walls; streetwall continuity on dense frontages | MFCG recoverability on its matched plain sweep renders ⟨M-1⟩ — **target**; MFCG gross cover inside the walls 0.60–0.64 at sizes 40–130 — **descriptive, direction declared**: ours lower because yards exist; MFCG streetwall continuity on the same frontage classes ⟨M-1⟩ — **target** | recoverability ≥ MFCG − 0.03; cover reported (expected below 0.60); streetwall ≥ MFCG's on dense frontages | O |
| plots and footprints | L3 plot areas; L4 footprint areas and sides | FTG footprint median 103 m², p95 154 m², quad side 10.3 m, worst-corner p95 22.9° — **target** for ordinary houses; MFCG footprints (median 225–289 m² at sizes 40–250 in metres) are **lots drawn as buildings — descriptive, never a house-size anchor** | ordinary houses median 60–160 m², p95 < 400 m²; a sheared minority kept | P |
| entrance rule | L4: the main entrance's edge | — the owner's rule (item 29, §2.6); FTG's measured 2.99 m is the night-light anchor of the FTG client of the 2026-09-25 capture, which receives no door, and is withdrawn from this table (item 50; J-A50.01) | 100 % on the footprint side that faces the frontage access edge (§2.6 rule 1: the court or path for a set-back building, the passage or court for a hidden plot, the footpath for a cluster structure) | C |
| party walls and attachment | row classes | NG 39–43 % of perimeter, 95–99 % attached — **target** for dense / poor; FTG residences 0–5 %, industry 96–98 % — descriptive | attached ≥ 90 % in dense / poor; party-wall share by the band rule per class | P |
| plot-area gradient | Spearman(prosperity, plot area); Moran's I; within-district plot-area CV | NG Moran's I −0.04 … +0.03 — **weakness** (the FTG client of the 2026-09-25 capture receives no lot or plot, so FTG has no plot evidence; item 49) | ≥ 0.8 and > 0 (both follow from the rules: C); within-district CV ≥ 0.25 (§13.7: O) | C / O |
| alleys | alley length per ha by prosperity | FTG 0 alley length at every decile — **weakness** | Spearman ≤ −0.7 | C |
| vacancy runs | share of frontage length in vacancy runs, per band | — (our rule; VG's partly ringed blocks are the motive) | within ± 0.02 of the granularity table's share per band | C |
| quays and substitution | quays reachable from the network; blocks left as substitution residue (F-CUT tier 5) | — | quays reachable 100 %; substitution residue ≤ 5 % of blocks | C |
| walled share and ribbons | buildings inside the outermost wall; extramural buildings within 100 m of an arterial | MFCG 0.87–0.92 at sizes 40–250; 71–85 % (sweep) — **target** | the band rule | P |
| MFCG anchors | district areas; wall vertex spacing; castle area and compactness; plaza area; city-zoom quarter labels | MFCG district areas 2.4–17.6 ha at size 40 and median 29 ha at size 80; wall vertex spacing p50 88 m at size 40; castle 0.5–3.2 ha (8.7 at size 130); plaza 0.32–0.58 ha; 9 / 12 / 18 districts at sizes 40 / 80 / 130 (sweep) — **target** | the band rule; castle in band on ≥ 99 % of seeds | P |
| outline anisotropy | land-sector r90 CV; road / non-road r90 ratio | FTG 0.20–0.33 and 1.26–1.65 (both CITY payloads) — **target** for organic presets | the band rule; monotone in the anisotropy row | P |
| block-level use mix | residential-only block share; per-block use-mix entropy; trade households at their workplace | MFCG's "venue mix with residents, no residential wards" — descriptive | §13.7's bands | O |
| towers and gates | S7 | FTG 39 m median spacing, 17 / 17 towers on ring vertices — **target**; FTG 6 and 2 ungated crossings — **weakness**; MFCG 5 / 8 / 12 gates at sizes 40 / 80 / 130, `gates = N` exact — **target**; with a waterfront on the stage-1 boundary our law's reduction gives 4 / 7 / 10 / 14 where the land law gives 5 / 8 / 12 / 18 — its metric restatement of MFCG 12710731's coded law, which counts mesh cells and was recorded at 3 / 4 / 5 / 7 gates at sizes 26 / 39 / 51 / 80 with a coast (P11) — descriptive | spacing by the band rule; ungated crossings 0; main gates = N exact, N by §4.2 S3 (4)'s law with its waterfront reduction; roads leaving each walled stage = its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed | P |
| water | L0 | FTG 50 m resampling, rivers ≈ 31 m mean at CITY — **target**; MFCG `riverWidth` in metres (142 m at size 200 with river and coast) — descriptive | outline step ≤ 25 m; width band by class | P |
| tree scatter | §8.10's stamped instances, in the bench | FTG nearest-neighbour median 9.7 m, minimum 0.14 m (not Poisson) — **weakness**; MFCG / NG: Bridson sampling with k = 50, its candidates drawn from the thin ring between r and 1.1 r, the tile wrapping at its edges (MFCG 12710731, NG 1.2.2; P14) — **target** for the sampler | NN p1 ≥ §13.7's canopy threshold; pair-correlation per class reported | O |
| population and buildings | totals | MFCG 12710731: six persons for each lot, the total rounded up at its second significant digit (a multiplier; its "buildings" are its lots; D1 of `code-impact.md` §(d)) — **weakness**; FTG 3.4 — descriptive | requested population within ± 5 % on ≥ 95 % of seeds; the ratio reported | C |
| generation time | model p95 and time to first map per rung (§12) | MFCG app timings 57 / 131 / 156 ms at sizes 40 / 80 / 130 — descriptive, with the measured ratios and §12.9's declared trade; FTG CITY: server 2.9–3.2 s, scene 6.4–7.0 s after the click, load 2.0 s busy — **weakness**; NG hood 10–96 ms — **target** for opening a district | §12.3 / §12.5 budgets; model ≤ 2.5 × MFCG at TOWN and CITY and ≤ 5.5 × at METROPOLIS (the ratios at MFCG's matched building counts are §12.9's); first map ≥ 10 × sooner than FTG at FTG's timed CITY preset (9 500 people, 2 798 buildings: PLAT's TOWN law ≈ 0.24 s against 6.4–7.0 s), and at BIG_TOWN and BIG_CITY from M-1's captures | P |
| MFCG-worst configurations | wall-clock p95 per delivered town, ladder costs included: METROPOLIS with river, coast, walls and castle | MFCG size 80 with river and coast: 10 attempts for 3 cities, 3.7–4.0 s (IMPROVEMENTS O1); 24 restarts in 58 attempts — **weakness** | ≤ 1.0 s per delivered town | O |
| requested-feature delivery | the report's delivery tier per requested feature | MFCG: a requested river fails 7 of 10 attempts at size 80; VG: 4 of 13 highway maps discarded — **weakness** | tier-6 omissions of requested features 0; degraded (tiers 4–5) ≤ 5 % (§13.7) | O |
| ladder use | the report | — | tier ≥ 2 on ≤ 2 % of transactions per stage; p99 ≤ 3 attempts | C |
| draw style | the display list and renders against the draw records | MFCG: casing = core + 2h on 7 / 7 maps, round joins 4 062 / 4 063, 17-step order; wall, tower and road-core widths 6.2 / 12.4 / 6.5 px at size 40's scale — **target** (`ink`); NG square caps, ≈ 17.4 hatch triangles and 2.33 shadow quads per wing — **target** (`hatched`); NG roof dark / light ratios 0.787 / 0.802 / 0.834 and VG water bands 5.196 : 2.828 : 1 — **descriptive** (they are their palettes' values; the laws are tested on ours, §8.3) | `ink`: casing law on 100 % of ribbons, round joins ≥ 99.9 %, order parity as §8.3 defines it, widths ± 15 %, outline share ≤ 25 %; `hatched`: 15–20 triangles per wing, no ridge stroke (the count includes the two filled tapers NG 1.2.2 lays along each wing's ridge, read in its code — §8.3's `hatched` census row), outline = footprint; the roof law on our palette within ± 0.02 and our bands W · (i / N)^1.5 within 1e-4 | P |
| labels | protected overlaps; inside-area share; curvature; holes; count | MFCG: gates and the keep covered, walls straddled — **weakness**; MFCG district counts (the anchors row) — **target** | 0 / ≥ 99 % / within §13.7's curvature limit / 0 labels crossing holes / the anchors row | O |
| between-seed variety | dispersion of the §7.7 signature vector (radial share of arterials, orthogonality index, street-density profile, block-area CV, enclosed share, outline anisotropy) over 100 seeds per rung and water setting: mean pairwise distance of vectors standardised by the rung's pooled deviations | MFCG over its plain sweep seeds at the matched size ⟨M-1⟩; FTG over every payload at the matched size ⟨M-1⟩ — **target as a floor** | ours ≥ the larger reference dispersion at the matched rung | O |

**Rows added by amendments b (items 24, 27, 29 and 30).** They join the table above under the same band rule; the
parity presets `MFCG` and `FTG` (§7.6) add one B-REF run per preset to the nightly report, on which every row above
must hold with our extensions switched off (§13.2 T23-1).

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| markets | secondary-market frequency per matched size; market reservations sharing an edge; the market count against the roster | MFCG's secondary-plaza frequency and non-adjacency on the plain size sweep ⟨M-1⟩ — **target**; FTG's two market squares in the captured city — descriptive | frequency by the band rule; adjacent markets 0 | P |
| wealth bands | built-land share per band group; households per lifestyle tier under the parity preset | FTG's six-tier lifestyle distribution (its captures ⟨M-1⟩) — **descriptive**; MFCG's ward-class shares, taken from the ward deck of its open-source model of 2017 (§4.5's receipt; the live MFCG types no ward by class, §1.4) — a note with no `baselines.json` row (the default band set reproduces both, §4.5; the parity preset equals them by construction, T27-1) | reported | P |
| entrances and basements | the main entrance's edge (the entrance row above stands); side, rear and yard doors per class; the basement share by class and storeys | neither MFCG nor FTG models a door — the FTG client of the 2026-09-25 capture receives none, and MFCG 12710731's model, read in full, carries no door record (an inference from that reading) — so the main door follows the owner's rule, the entrance row above being class C; Dwellings (itch 17195045): one entrance, no back door, its basement rule — a chance of n/(n + 1), n being how many storeys stand above ground (D2 of `code-impact.md` §(d)) — and its loop rule, which keeps at random half of the doors that no room needs for access (D3), have no `baselines.json` row and are descriptive notes only, never a gate | the entrance row's band; the rest reported | C |
| hidden plots | the hidden and rear-plot share per band | MFCG and FTG give every building a street — 0 hidden share — **target for the parity presets**; the default preset's share is §13.7's threshold | parity presets 0; default within its target ± 0.03 | C |

**Rows changed and added by amendments c (2026-09-27; items 41, 46, 48–50, 53, 58, 60, 61, 68, 71).** The reading of the
references' compiled code (§17.1 (1)) left the measured numbers standing and changed what some of them mean. NG 1.2.2's
bent-cut statistics are outputs of its mechanism, which §4.6 now restates, so they stay targets when ours is measured the
same way, and the fillet share joins them (J-A41.01); the FTG figures read from the ground-cover patches that the FTG client of the 2026-09-25 capture receives (the "441 m² in
every class" of the blocks and plot-area rows, `_critic-ftg.md` R10) are withdrawn, our own bars standing as C rules
(item 49); FTG's "entrance" distance is the night-light anchor of the FTG client of the 2026-09-25 capture, so the main door's row follows the owner's rule, class C (item 50); MFCG 12710731's population figure counts six persons for each lot (item 48). Under the parity presets every row above
still holds with the extensions off (T23-1) — item 71's class mix inside a band is such an extension (§4.7 S10b), so
under `MFCG` and `FTG` the residential class stays the references' step. The one row item 68 adds describes how each
preset lights the map; the references' lighting has no `baselines.json` row, so it is reported and gates nothing, and
its bars are §13.2's T68 and §13.4's.

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| lighting under the presets | the light pass's configuration per preset (§8.4): the lights, the sun and moon, the casters, the night view | the FTG client of the 2026-09-25 capture: an ambient light plus a directional one, the sun moving on an hour path and at night a dim moon on that path, cast shadows only in fair weather or snowfall, from extruded footprints, and window lights at a per-building anchor (P22) — the `FTG` preset's day and night light and lit windows; NG 1.2.2: per-wing prism shadows with tree and pin shadows, multiplied at an alpha, and at night an ambience wash with a per-building glow by chance (P23) — the `hatched` preset's prism pass; the `MFCG` preset draws the raised under-copy (K06; item 54, P15) and casts no shadow, stated as our preset's behaviour — **descriptive** | reported | P |
=== REPLACE ## §14 Package and module layout, key interfaces, dependency rules, extension points ===
## §14 Package and module layout, key interfaces, dependency rules, extension points

*In plain words.* The code is split into small packages with one-way dependencies: the geometry kernel knows nothing
about towns; the town model knows nothing about drawing; the drawing code knows nothing about how the town was made;
the app sits on top of a headless library. New looks, new layout templates, new export formats, new building
generators and new rule tables plug into named registries without touching the pipeline. All of it lives in one
repository, `plat/`, that never reads the research material (§17). A host's settlement record — SettlementForge's dossier —
enters through one package, the port, and only one folder inside it knows the host's field names; a person with the
canvas tools, an AI clerk through the tool API and a skeleton file all make and change a town with one set of twelve tools.

```
@plat/kernel   lattice, predicates, one arena per layer with the five levels as views (§2.2), role and owner tables, resolution of stored
               references, batched transactions, kernel invariants, arrangement booleans / buffers / bands (§3.7), the straight skeleton and
               its validator (§3.8), obb / hull / lir, delaunay (delaunator), poisson (the stamped ranked tiles' construction from a constant
               stream key, run at build time by `plat/tools/stamptiles/` and in a worker only as the fallback rebuild, §8.10), curves, index
               (flatbush / rbush / grid), noise, dmath (our fdlibm 5.3 port), rng (xoshiro + 128-bit keys; `rng.stream`, the one structured
               stream mixer of §6.1), concern registry, the composition rungs' transient arenas (a stage-3 `compose()` and the plan rung's
               storeys; `transientArena`, `readBack`, `release`, §3.4)
@plat/model    schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-coverage test), lifecycle, provenance, document,
               serialisation (.plat, CBOR twin), migrations, the Merkle model digest and the MurmurHash3 functions it and the seeds use
               (`H128`, §6.2; `H32`, §13.6), the core statistics record, the control registry; the
               label records `LabelEntity` and `QuarterNode` (§9.1); the shared view vocabulary `LodBand`, `Role`, `ZoomStop` and the
               label-row tables `LabelTable`, `StringTable`, `GeomTable` with §9.2's `LabelRows` view (§8.1); the records amendments b
               add — `Use`, `Passage`, `Entrance`, `Basement`, `MaterialLedger`, `ElaborationRecord` and the plan records
               (§2.5–§2.8), `Rejection` (§7.7), `DossierRef` (§7.1) and `AccessPoint` (II.7.4); the records amendments c adds (§2.5–§2.9) —
               `Works`, `LightSource`, `UndergroundSystem`, `Gallery`, `Chamber` and `UndergroundLink` (§2.7; their rules §4.11, §4.7 and
               II.7.6), `FactTier` and the pure `factTier` over the registry's dossier paths (§2.8), the staged `ConditionOverlay`, `DepositSite`, `HistoryHint`, `PowerRelation` and the dossier-backed `Person`
               (schema-complete and empty) — and the document's `dossier` block (§2.9; its `DossierBinding` and `CarriedFacts` are §7.7's)
@plat/tables   rule tables, presets, style sheets, rung profiles (`ladder.json`, §1.1), the work-limit coefficients (`workLimits.json`,
               §5.1 (5)), the wealth ladder (`wealthLadder.json`, §4.11) and beside it the Works table (`works.json`: `WorksTable` with its
               calendar row, §4.11), the room programmes and the interior ladder (`roomProgram.json`: `RoomProgramRow` and the
               `interiorLadder` table of `InteriorLadderRow`s, §2.6, §10.2), the roster tables with the basement gate (`RosterTables`,
               `basementGate`, §10.2) with amendments c's rows in them (the class mix, the cluster rows, the quarter identities, the
               power and sector links, the band ranges and the cover table `RosterTables.covers`), the disruption budget
               rows (`DisruptionBudgetRow`, §7.7), the band set (`prosperity.bands`, §4.5), the light rules (`lights.json`, §4.7), the
               underground layer's `undercity`, `underground-systems` and `links` rows (II.7.5, II.7.6), the sugar expansion table
               (`sugar.json`, §7.1), the dossier row sets `tables/dossier/*` (below), the parity presets `MFCG` and `FTG` (§7.6), setting
               packs (§10.4) and the default keymap as versioned JSON with provenance; loaders; the override layer
@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces
@plat/content  S2 sequential roster, demand and its propagation through the supply edges, government and religion rows, S7b / S10a
               allocation, households and people derivation, the relation-store schema, the economy and personality schema stubs
               (D-32), naming engine + grammar   [S10b placement moved to @plat/plots with the solver, item 16]
@plat/layout   S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, S6 grower / typing / fields / the quarter merge tree,
               S7 fortification and water furniture, S7b claims, S8 infill (BentCutFabric), S9 corridors, S12a hinterland siting, the
               hinterland unit, S12b greenery, S12c the district character step (§4.5, item 72); the StrategyRegistry and the ordering of
               registered StageDecls, the staged network, underground, system, undercity and link registrations included (II.7.2,
               II.7.4–II.7.6)
@plat/plots    S10 granularity law, per-frontage regions, joins / splits / alleys and passages, boundary treatments, the incremental re-cut
               with fixed neighbours (§4.7 S10 (7), §4.11); S11 site plans, packer, heights, footprint templates, the entrance set and the
               basement decision (§2.6); the one placement solver with its relation and supply scoring (§4.7 S10b) and the designation
               mutator (§4.7 S11) with the class mix, the concealed pair and the `cluster` arrangement (§4.7 S10b, S11; items 63, 70, 71)
               and S11's light placement (§4.7, item 68); the BuildingGenerator interface (`outline` / `compose` / `plan`) +
               OutlineBuildingGenerator and the default implementation of `BuildingGenerator.plan` (§2.6)
@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]
@plat/labels   S13a names (every node of the quarter tree), candidates and spines; S13b view placement over the parameters the renderer
               passes in (`ObstacleSource`, `RoleIndex`, below) — it never imports render; the font-metrics reader; collision; furniture
               incl. the ruler and the emblem generator; the knowledge filter over the label rows' `knownTo` (§9.2)
@plat/render   S14 columnar display-list builder, paint programs, style sheets, LOD, the tile pyramid and the tile worker (which runs S13b
               by calling `@plat/labels`), backends (Canvas2D, SVG, print tiles; the WebGL2 tile compositor as a fallback), the light
               pass — §8.4's lighting model as a post operation over the base raster, its CPU implementation the reference and a WebGL2
               (WebGPU where available) accelerator that draws no marks — with the vector shadow pass as its fallback rung, decoration
               stamps over the bundled stamp-tile asset (§8.10), live layers (`live.stale` and the dry run's ghost `live.ghost` among them)
               and the `states` rows' programs (§8.2), the tile worker's queue of resumable raster jobs (§8.9)
@plat/edit     edit events — the plan events and rung re-rolls, the dossier events with rejections and positive placements, the
               wealth-ladder and passage kinds, the underground tools, the Works and light kinds, the closure edits and the authoring
               toolkit's sugar events and points forms among them (§7.1, §7.3 and §7.7) — dry-run validation, undo and redo records,
               scoped regeneration, rebase, the dependency audit, event migrations, warp kernels
@plat/export   geojson, svg, png / tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt), gltf / obj, cityjson, csv, permalinks, the
               skeleton file (the declared subset, §11.1)
@plat/port     the one door for dossier facts (item 73): `DossierPort` — `digest`, `creation` (door 1's blueprint and the log's
               creation prefix) and `absorb` (door 2's events and epochs), §11.4 — over one adapter folder per SettlementForge product
               line, `adapters/sf/<line>/` (the first `fp-integration-2026-09-23`, pinned at commit `5d699cc68`), each a pure function
               from a host's whole dossier to the neutral `DossierDigest`; the host glue's audience table (below)
@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and schedules, calendar, factions, events, economy,
               personality and the stat-block pack (D-32) — over @plat/content ids
@plat/api      the handle-based facade (§11.2), the generation worker host, the derivation pool, the host bridge with its `report.changed`
               event (§11.3) and DocResolver (§11.5), the elaboration cache (`Document.elaborations`, held in the generation worker, §2.9), the clerk's
               tool API over the facade (§11.2, item 101), the headless CLI
@plat/app      the reference UI (below)
@plat/docs     the user guide: generated reference pages from the control, entity and table registries plus written pages;
               `known-defects.json`; release notes generated from `plat/goldens/shifts/` and the milestone records (§13.3), the D-5
               statuses (§13.6) and the known defects
@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench statistics and the `parity` CLI
               (reads `baselines/baselines.json` only), golden tooling with shift, cascade and milestone records and placement digests over
               `plat/goldens/` (§13.3) and the one `WaterSetting` type every record uses, the O9 (c) faithfulness campaign (§13.2), the boolean
               and buffer oracles (Clipper2-WASM in Node, polygon-clipping; §3.7), the clean-room scanner (§17.1 (5)), the D-5 seed list by
               `H32` and the export command (`plat d5 seeds`, PNGs for §13.6), which read only the committed `ftg-captures.json` and
               `ng-counts.json` (§13.6 (2)); the frozen dossier fixtures `plat/tests/fixtures/dossier/` with their `manifest.json` and the
               B-DOSSIER-lite bench (§13.2, items 83, 84)
```

Each stage's declared inputs and outputs are its `StageDecl` registration (§4.1–§4.12); the record types a registration
names are declared at their homes (§2.5–§2.7, §3.4, §4.8, §10.4, II.1, II.6, II.7.4).

**Dependency rules (enforced by lint):** `kernel ← model ← tables ← {site, content} ← layout ← plots ← labels ← render
← edit ← export ← port ← api ← app`; **labels ← render**: the tile worker in `render` runs S13b from `labels`, and the drawn
symbol extents and the display-list index that S13b reads reach it only as the parameters `ObstacleSource` and
`RoleIndex` — interfaces `labels` declares and `render` implements — so `labels` never imports `render`, and the types
both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`, the label-row tables and `LabelRows`) come from `model`; `docs`
reads the registries of `model` and `tables` only; `hood` depends on `layout` / `plots` only through their interfaces;
`sim` depends on `content` and `model` only; `port` depends on `model`, `tables`, `content` and `edit` only
and is imported only by `api` and the reference app's host glue; `render` never imports `layout`; nothing depends on `app`; no package
imports a backend it does not need; every adopted runtime library is imported in exactly one adapter file of the one
package that uses it. Model packages, `@plat/labels` and the renderer code that feeds S13b obey §6.5 (3)'s allowlist
lint, which also scans the vendored dependency sources (§6.5 (4)); it scans the dossier port's adapter boundary too: each adapter
folder declares its **key list** — the host keys it reads, less the field names of `DossierDigest` below, which are the
module's own vocabulary even where one coincides with a host key — and no module of `plat/` outside the adapter folders
names a key on any adapter's list (§6.5 (3); J-A73.02). No import, fixture or script path may resolve outside `plat/`
(§17.1 (3)).

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
  underground: Map<string, UndergroundStrategy | UndergroundSystemStrategy | UndercityStrategy | UndergroundLinkStrategy> /* II.7.4–II.7.6: registered after the network stage by declared I/O — the systems (catacomb, cavern, quarry, vaults and, at generation, a history scar's buried town), II.7.3's sewer-front neighbourhoods, the undercity, then the connection stage — their outputs under.blocks, under.plots, under.buildings and under.access placed before the display list by §4.1's order */ }
interface FabricStrategy  { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc: StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }> }
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext, claims: Claim[], sc: StageContext, k: Kernel): KernelResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: ContextVector, tables: TableView, rng: Stream, k: Kernel): KernelResult<SitePlan> }
interface GranularityLaw  { bands(ctx: ContextVector, rung: RungProfile): { frontageM: [number, number]; depthM: [number, number]; areaM2: [number, number]; joinMax: number; vacancyRunShare: number } }   // the deep-interior choice is S8's (§4.6); the rows are keyed by §4.5's band set (item 27) and read at the plot's manifested band (§4.11)
// @plat/kernel — the façade the stages see, and the one stream mixer every reader uses
interface Kernel { plat(key: PlatKey): Plat; view(key: ArenaKey, level: Level): LevelView /* a transient arena has level 0 only */; resolve(ref: GeomRef, key: ArenaKey): Resolved; geom: GeomOps; index: SpatialIndex;
  // transientArena(owner, seed, fixed, workLimit), readBack(key) and release(key) are §3.4's — the composition rungs' transient arenas (a stage-3 `compose()` and the plan rung's storeys); ArenaKey = PlatKey | TransientKey (§3.4);
  // a transient arena is read through `readBack` and `view`, never as a `Plat` (§3.4)
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<T>   // exactly one form: tx.ops (declared) or fn (callback), §3.3
}   // KernelTx (§3.3) carries `stage` and `rederivesFrom`; the services resolveVertexAt, signature and sampleProfile are §3.4's
interface Rng { stream(entityKey: Hash128, stage: number /* u16 stage id; STAGE_VIEW = 0xffff for paint programs and furniture */, concern: ConcernId, opts: StreamOpts): Stream }
// StageContext.stream is rng.stream with the calling stage's id and the entity's cached key; paint programs and furniture call rng.stream with STAGE_VIEW.
// No string reaches the mixer; the textual form of a key (§6.1) is rendered for reports only, and a lint rejects a stream call whose concern is not a ConcernId.
// @plat/content — a host's own roster or people; registered only after §11.4's double-run check, its outputs recorded in the document
interface ContentProvider { id: string; version: string; roster(pop: number, economy: EconomyShares /* the town-level character, §4.2 S2 (J-A72.43, J-A72.01); never item 72's district CharacterVector */, tables: TableView, rng: Stream): Roster;
  site(roster: Roster, plots: Plot[], ctx: SitingContext, rng: Stream): SitingResult; people(household: Id, rng: Stream): Person[] }
// @plat/port — the one door for dossier facts (item 73). The contract's own records — DossierBinding, CarriedFacts, DossierChange and the rows
// DerivationRow, ReceiptRow and StatusRow — are §7.7's; the port fills them. Nothing outside the adapter folders reads a host's JSON.
interface DossierPort {
  readonly adapter: { id: 'sf'; line: string /* the SettlementForge product line, e.g. 'fp/integration-2026-09-23' */; version: string };
  digest(raw: unknown, host?: HostContext): PortResult<DossierDigest>;   // the adapter's only job: one whole dossier normalised; an unknown shape refused
  creation(d: DossierDigest, host?: HostContext): PortResult<{ blueprint: Blueprint /* §4.2 S0 */; prefix: EditEvent[] /* the `assign` events at log positions 0…k,
    `creation` and EditBase.dossier set (§7.7 One path) */; binding: DossierBinding; carried: CarriedFacts }>;
  absorb(doc: Document, d: DossierDigest, host?: HostContext): PortResult<{ changes: DossierChange[]; events: EditEvent[] /* dossier events at their weeks, in the
    host's order, decrees first */; epochs: EpochInputs[] /* by §4.11's cadence */; binding: DossierBinding; carried: CarriedFacts; report: PortReport }> }
type PortResult<T> = { status: 'ok'; value: T; notes: PortNote[] }
  | { status: 'refused'; code: 'E_RUNG_UNAVAILABLE' /* a population outside the base ladder: below 1 500 while no village product is registered (§7.7 item 15), or above the 120 000 cap (§1.1; J-A81.01) */ | 'E_UNKNOWN_SHAPE' | 'E_LINE_UNSUPPORTED';
      message: string; notes: PortNote[] };
interface PortNote { kind: 'unmapped_kind'|'unmapped_word'|'ignored_key'|'unreceipted_change'|'rename_without_receipt'|'duplicate_key'|'state_matches_absorbed'|'realm_block_used';
  detail: string }
interface HostContext {   // every field optional: used when present, never required (item 20 (h) (iv))
  week?: number /* the campaign's elapsed weeks at delivery: §4.11's last dating rung */; realm?: RealmBlock;
  audience?: { role: 'owner'|'editor'|'viewer'; knowledge?: 'public'|'local'|'secret' } /* set by the host glue's audience table, below */;
  displayNames?: Record<string /* binding key */, string> /* applied inside ONE export request, never stored (item 85) */;
  line?: string /* the SettlementForge line the host runs: picks the adapter, or E_LINE_UNSUPPORTED */ }
interface RealmBlock {   // optional realm data (item 77), filled by the host glue from the campaign's frozen spatial digest — the one campaign fact it may carry (§7.7 item 1)
  partners?: { key: string /* the partner's binding key */; bearingCdeg: Cdeg; distanceM?: M; weight?: number }[];
  cell?: { terrain?: string; river?: boolean; coast?: { sideCdeg: Cdeg } }; mPerRealmUnit?: M /* the realm map's scale */;
  gates?: { toward: string /* a partner's key */; bearingCdeg: Cdeg }[] }
// the neutral digest — the module's own vocabulary; the adapter fills it, and every other module reads only this
interface DossierDigest {
  settlement: { key: string /* `settlement:<id>`, the dossier's own id (§7.7 item 12) */; name: string; tierWord: string /* the map's title word (§7.7 item 15) */;
    population: number /* persons */; seed: Seed /* H32("plat:sf-seed" ‖ the dossier's seed): derived, never the host's seed (below) */; line: string; versions: Record<string, string> };
  site: { terrain: string; access: string; threat: string; magic: string; culture: string /* the profile key */;
    deposits: { key: string; state: 'available'|'depleted'|'removed'|'discovered'; custom?: boolean }[]; isolation?: { status: string; paths: string[] } };
  walls: { records: string[] /* binding keys of the wall institutions */; citadel: boolean; flagged: boolean };
  wealth: { label: string /* the dossier's seven-step prosperity word */ };
  economy: { incomeSources: { source: string; percentage: number /* % of income */ }[]; exports: string[]; imports: string[]; transit: string[]; entrepot: boolean;
    foodImportPct?: number /* % */; foodChains: Record<string, boolean>; chains: { key: string; processors: string[]; status: string }[];
    dependencies: { institution: string; resource: string; severity: number }[];
    tradeLinks: { good: string; goodId: string; flow: 'import'|'export'; partner: string }[]; partners: { key: string; name: string; relationship: string }[] };
  government: { name: string; governingPower?: string; previous: { label: string; cause: string; week?: number }[] };
  powers: { key: string; name: string; category: string; standing: number /* power ÷ Σ power */; governing: boolean;
    controlled: string[] /* binding keys, resolved through the line's stable part (§7.7 item 12) */; relations: { with: string; kind: string }[] }[];
  institutions: DossierInstitution[];
  quarters: { name: string; phrase: string; landmarks: string[] }[];
  notables: { key: string; name: string; role: string; category: string; power?: string; institution?: string; importance?: string; status?: string; replaced?: string }[];
  conditions: { key: string; archetype: string; severity: number; status: string; sinceWeek?: number; untilWeek?: number }[];
  stressors: string[]; religion?: { deityKey?: string; deityName?: string };
  history: { ageYears: number; events: { type: string; yearsAgo: number; severity: string; name: string; week?: number }[] };
  receipts: Record<string /* binding key */, { field: string /* a receipt field of §7.7's receipt table */; week?: number /* its own week */; ref?: string /* its event, outcome or decree id */ }[]>;
  custom: { definitions: { key: string; category: string; name: string }[] };
  ignored: string[] /* the top-level keys the adapter dropped by §7.7 item 1's never-read list, for the report */ }
interface DossierInstitution { key: string /* the binding key (§7.7 item 12) */; name: string; kindLabel: string /* the name without its numeric count range */;
  kind?: string /* the catalogue kind, when present */; category: string; tags: string[]; count?: [number, number] /* a collective record's range */;
  districtScale: boolean; facets: { clandestine?: boolean; subterranean?: boolean }; forbidden: string[];
  state: 'active'|'impaired'|'remnant'|'ruined'|'removed'|'destroyed'|'vacant'; fate?: string; inactive: boolean /* the fate read first (§7.7 item 14) */;
  impairments: { type: string; severity: number; cause?: string; covert?: boolean }[]; knownTo?: 'public'|'local'|'secret'; founded?: { week: number };
  renamedFrom?: { name: string; receipt: 'demoted_by_disaster'|'upgraded_by_reconstruction' }; custom?: { uid: string }; receipts: string[];
  order: number /* the record's position in the dossier: the tie-break of two records of one key */ }
interface PortReport { changes: number; events: number; epochs: number; unreceipted: number; renamesRebound: number; renamesAsRemoveAdd: number;
  ignoredKeys: string[]; stateMatchesAbsorbed?: number /* the index of the earlier absorbed state the incoming dossier equals (§7.7 item 5) */ }
// @plat/plots — the stage-3 hook: BuildingGenerator { outline(…); compose(…, lod); plan(…, prior?) } is §2.6's; PlacementSolver and DesignationMutator are §4.7's, RelationRule and SupplyEdge §10.2's
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
// the event kinds amendments b add — rejectSite, placeAt, setEntrance, drawPassage, drawTunnel, placeAccess, sealPassage, openPassage, relet, densify, thin, the seven plan events and setRoomUnit, regenerate.rung and §4.11's convert kinds — and those amendments c adds — addUndergroundAccess (a closure edit, §7.3 item 9), drawChamber, addLink, startWorks, cancelWorks, placeLight, the sugar events placeGate, quarter, roster and group, and the points forms of drawBoundary, drawWater, drawWall, drawWay and placeAt — are §7.1's, each with its inverse, its fates and its migration (§7.4, §7.5)
// @plat/api — PlatApi and DocHandle: §11.2; BridgeTransport and BridgeMessage: §11.3; DocResolver: §11.5
// @plat/export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Uint8Array | string> }
  /* runs in the generation worker (§11.1): list = the transient export list for SVG and for raster formats (a raster format transfers it to the tile worker with its
     raster-export request, §8.9, §11.1); null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document forms) */
// @plat/testkit — Baseline, ParityReport: §13.5; ShiftRecord, CascadeRecord, MilestoneRecord, WaterSetting: §13.3; D5Record, D5Pair, FtgCapture: §13.6 (its `H32` is `@plat/model`'s); CorpusAdapter, CalibrationRun: §13.9;
//                 the dossier fixtures' manifest (DossierFixtureRow) and B-DOSSIER-lite: §13.2
```

**The dossier port (items 73–88; owner: "it is one directional"; J86).** The port is the one producer of dossier facts
on the map: §11.4's door 1 receives its blueprint and creation prefix, door 2 its events and epochs, and no door opens
the other way (door 1 closed to the host's simulator, J86, §11.4). Its parts:

1. **Two halves and the wiring** (J-A73.03). *Digest and creation* are the base's from M1, exercised test-side only by
   B-DOSSIER-lite on the frozen fixtures (§13.2, items 83–84); *absorb* lands at M3a with §7.7's dossier contract; the
   wiring to a live host bridge is the owner's SettlementForge stage (*Staged by the owner's roadmap*). The first
   adapter is `adapters/sf/fp-integration-2026-09-23/`, pinned at SettlementForge commit `5d699cc68` (owner, J86 Q1;
   J-A73.01); a later SettlementForge line is one more adapter folder and a re-cut of the fixtures by the same scripts —
   a registration, never a rewrite.
2. **`digest`** normalises one whole dossier — SettlementForge sends whole dossiers, never a change list. Its first act
   is the ONE-WAY SEED (item 85 (a); J-A85.01): `settlement.seed = H32("plat:sf-seed" ‖ the dossier's seed)` (§13.6's
   `H32`, from `@plat/model`), written into the recipe once at creation; the host's own seed never enters a document, a digest, a link or an
   export (§6.2); the protection is that the host's seed is never stored — `H32` is a 32-bit digest, not a cryptographic
   one-way function, so the host keeps its own seed secret as it already does. It then applies §7.7's key law and class rule (item 12, row DR24)
   — a kind without a class row falls to its category's generic class, noted `unmapped_kind`, a word without a table row
   `unmapped_word`, two records of one key `duplicate_key` —, resolves each power's controlled institutions through the
   line's stable part, and drops every key of §7.7 item 1's never-read list into `ignored` with an `ignored_key` note. A
   shape its adapter does not know is refused `E_UNKNOWN_SHAPE` (a hand-made teaching file among them), a line no
   adapter serves `E_LINE_UNSUPPORTED`.
3. **`creation`** derives the blueprint (§4.2 S0) and the creation prefix — one `assign` per institution record, with
   `existence: 'dossier'`, `creation` and `EditBase.dossier` set — together with the binding and the carried facts, by
   §7.7's derivation table (item 10): the population chooses the rung, the wealth word the wealth level, the access,
   walls and threat rows the gates, walls and defence, the typed slices the trade partners, the sector shares and the
   power standings (§7.7 item 2). A population below 1 500 is refused `E_RUNG_UNAVAILABLE`, naming the village
   product, while none is registered (§7.7 item 15; §1.1), and one above the 120 000 cap the same way, naming the cap
   (§1.1; J-A81.01).
4. **`absorb`** diffs the incoming digest against `Document.dossier.carried` by binding key — the map's own carried facts
   are the previous dossier, so no host history is needed — into one `DossierChange` per changed element (§7.7 item 13),
   dates each by §4.11's rungs (`HostContext.week` the last; an undated change applies finished, noted
   `unreceipted_change`), groups them by §4.11's cadence into standalone dossier events and `EpochInputs`, re-binds only
   on a receipt of §7.7's key-law table (else `rename_without_receipt`: a removal plus an addition), and returns its
   `PortReport`; a dossier that equals an earlier absorbed state is converged forward, never rewound
   (`state_matches_absorbed`, §7.7 item 5; item 87). The events enter through door 2 as `doc.apply` with `author: 'host'`. A digest whose population
   lies outside the ladder is refused as `creation` refuses it (item 3), and nothing is absorbed (§1.1; J-A81.01).
5. **`HostContext`** is optional in every field (item 20 (h) (iv)): `week` the last dating rung; `realm` the realm
   block, whose true bearings turn the map's north first and move gates only for the residual (§7.7 item 2; noted
   `realm_block_used`); `audience` set by the table below; `displayNames` — dossier key → text — applied inside ONE
   export request and never stored, the document keeping the dossier's names (item 85 (b); J-A85.02); `line` choosing
   the adapter.
6. **The audience table** (item 85 (f); J-A85.03) is host glue in this package, never a model rule — the module's roles
   stay §11.3's and a viewer never raises its own knowledge tier (J-A30.82):

| the host's audience | role (§11.3) | knowledge key (§9.2) | what it may receive |
|---|---|---|---|
| the game master | `owner` | `secret` | the document, every export |
| a co-game-master | `editor` | `secret` | the document, every export |
| a player | `viewer` | `public`, raised place by place as the host records what the party learns | views and picture exports under its key |
| an anonymous or gallery viewer | none (no session) | `public` | picture exports (PNG, SVG, print) only |
| a full share by the game master | none (no session) | `secret` | picture exports only — never the document |

7. **The dossier row sets** `tables/dossier/*` in `@plat/tables` — `tiers`, `site`, `access`, `threat`, `deposits`,
   `quarters`, `landmarks`, `distribution`, `kinds`, `status`, `wealth`, `sectors` (the income categories' sector rows;
   the sector set itself is §10.2's `RosterTables.sectors`), `government`, `powers`, `conditions`, `calendar` (the
   `sf445` year: 52 weeks, 13-week seasons from spring), `receipts` and `derivation` — are versioned tables like every
   other (§7.6), provenance `own`, the SettlementForge line named in each table's header and SettlementForge's own words
   in the left column; §7.7 states the rules that read them. The inert-export bar is §11.1's and the bridge's reply
   correlation, source-window check and before-`ready` queue are §11.3's (item 85 (c)–(e)).

**The authoring surfaces and the clerk (item 101; owner: "an elegant set of tools for both an ai clerk and a user where
a dedicated user can build it or emulate it"; J-A101.02).** The three surfaces of §7.1's toolkit — the canvas tools of
`@plat/app` (below), the clerk's tool API (`@plat/api`, over §11.2's facade) and the skeleton file (`@plat/export`, and
§11.1's import as the log's creation prefix, §7.7) — emit the same events; no surface has a declaration the others lack.
A **clerk** is any program that drives the map through the tool API alone — the host's own (SettlementForge's, through
the bridge, §11.3) or the built-in one, which is staged (*Staged by the owner's roadmap*). Its four roles are calls the
API already has (§11.2): it READS through `query` and explains any element through the oracle, `query({ kind: 'why' })`
— the rule, the inputs and the alternatives read from the element's provenance and derivation record; it AUTHORS by
sending declarations to `preview` — the dry run alone, nothing committed — each shown to the user as a ghost
(`live.ghost`, §8.2) with its one-line reason and three variations, and committed only when the user accepts, as an
`edit` carrying `proposedBy: 'clerk'` with the user as its author (§7.1); it CRITIQUES a skeleton ahead of its application
by previewing it as a creation prefix and reporting the dry run's refusals and bends, the requested features the
generation report counts below full delivery (§5.4) and each declared quarter whose placed classes do not meet its
kind's identity row (§4.5) — a temple quarter without a temple, a harbour quarter without a quay, a quarter without road
access (a declared road through a declared wall is no finding: S7's operator makes the gate, §7.3); and it ITERATES on
instructions as further declarations. Its limits are the module's, not the clerk's courtesy: every call passes the dry
run and the undo as the canvas's do; a declaration that would contradict a dossier fact is refused `dossier-owned`
(§7.7 item 11), so no clerk invents or writes one; every read is filtered by the caller's knowledge key (§9.2, §11.2), so
a clerk reads only what its viewer may know; the API carries declarations and reads, never an image, so a clerk never
draws pixels; the only prose it receives from a dossier is the description seed (§7.7 item 1). In the standalone
product the built-in clerk is opt-in and labelled as AI in its drawer.

**`@plat/app`, the reference UI.** One click; the basic panel (≤ 12 controls, §7.8) and the advanced panel; the report
panel; the authoring tools — §7.1's twelve, each over the editing events (draw, move, warp, brushes, the four actions, lock,
assign; a dossier element placed here or its site rejected, a passage sealed or opened, plots fused or split, the plan
tools at the building band — §7.1 and §7.7), with the interactions and the contract below; the history panel; the tables
editor and the style dialog; the ruler (§9.5); the gazetteer and the "features in view" list, both withholding the names and
purposes of local and secret places the viewer's knowledge key does not hold (§9.2, §11.2); context help; the family-tree
view (module).

* **The authoring tools as interactions (item 101 (g), (i); J-A101.01).** Each tool is one declaration kind with one
  dry run and one undo (§7.1); its gesture yields a ghost — the dry run's `preview` (§11.2), drawn as `live.ghost` (§8.2) — with
  its handles and counts before commit, and its first-use hint closes once the user has made the gesture:

| tool (layer) | gesture | live feedback | preview and undo | first-use hint |
|---|---|---|---|---|
| T1 `intend` (L0) | pick a site card and a size; drag the wealth and walls sliders (§7.8's basic panel) | the whole town regenerates under the hand within §12's budget | each change one undo step | "Change anything: click it." |
| T2 `ground` (L1) | brush strokes (raise, lower, cliff, flatten); a coast or a river drawn as a knotted curve, a river by its source and mouth; a lake by one point and a level; a harbour by a sea level, one shore point and a basin size (§7.1's points form) | terrain shades and water reflows live; roads and plots on the stroke re-derive on release | ghost, then commit; handles on knots, level and rim | "Paint hills; drag the river." |
| T3 `wall` (L1) | two or more points, or a drawn line; it snaps to crests and road crossings and closes when its ends meet | towers and gates appear as ghosts at the crossings; the enclosed quarters tint | commit on release; gates are grips that slide | "Roads through the wall become gates." |
| T4 `road` (L1) | two points, or a drawn line, with a class from a short ring of chips (main, street, lane, pier, bridge) | magnetism to roads and gates; a road over water shows a bridge ghost | commit on release | "Drag a road; it snaps." |
| T5 `quarter` (L1) | a kind card, then one seed point, two to four far-edge points, a lasso or a brush; a name | the area tints; the count badge shows the plots, households and buildings it will hold at its band, with plus and minus | ghost with counts and four to eight corner handles, then commit; the handles stay | "Paint a district, pick what it is." |
| T6 `place` (L2) | drop a class stamp on a spot, a quarter or a road, or type a locus; name it | a ghost footprint at the best lawful site with a one-line reason; the alternatives faint | accept or nudge; one undo step | "Drop a tavern near the gate." |
| T7 `roster` (L2) | paste or dictate a list of places | the map fills with ghost sites in one pass; the lines the rules cannot honour listed with their nearest options | accept all, or card by card | "Paste your list of places." |
| T8 `fill` (L3) | brush a density or a class mix over a quarter or a block | buildings re-derive under the brush; three variations in a tray and one density dial | reroll without limit; accept one | "Denser here; more gardens there." |
| T9 `shape` (L3) | click into a plot or a building: split, join, drag corners, set storeys, move the door | the site plan re-derives live inside the plot only | one undo step | shown only after a click: "Shape this one." |
| T10 `hold` (L3) | a lock on any thing, a pin on any placed thing; "keep this, re-roll the rest" on a lasso | locked and declared things dim under the reroll brush; a fates list shows what would move | one undo step | "Lock what you love." |
| T11 `name` (L4) | click a label to rename it, drag it to move it; group quarters under a region name; the leader-line switch (§9.4) | labels re-flow around the change | one undo step | "Names are yours." |
| T12 `dress` (L4) | a style card; the quarter tint; compass, scale bar and cartouche from a tray; an image under the map to trace (§9.5's underlay) | the map restyles live | one undo step | "Make it yours; export." |
| the clerk | a chat drawer beside the map | every reply that changes the map is a ghost with three variations and accept / try again; "why?" on any element answers from the rules | nothing applies silently | "Ask for a walled harbour town with a temple quarter." |

* **The interaction contract (item 101 (f) as corrected by (f′); R1–R19).** The rules the reference UI keeps; their
  evidence is the breadth survey `research/ux/tool-survey.md`, and only the rules are stated here:
  R1 one gesture, one visible consequence, at once — a ghost while the hand moves, the real thing on release, never a
  dialog first; R2 no wrong answers — a declaration is bent to the nearest lawful one and the bend named in one line,
  and refused only against a dossier fact or a lock, always with the closest alternatives (§7.1); R3 preview the
  derived, adjust after — the ghost shows what a declaration will hold and what moves, and everything stays resizable,
  movable and re-rollable after commit; R4 paint, do not parametrise — areas are brushes and lassos with named presets,
  numbers behind "more", and lengths, areas and counts shown while drawing (R17 folded here and into R14); R5
  variations, one dial, reroll — three variations per derived fill, one density dial, every re-roll scoped ("this
  block", "this quarter", "trees only"; §7.3), an unscoped new city only the empty state's action; R6 layers the user
  never manages — draw order is §8.2's semantic order; R7 start from a finished town — the empty state is a generated
  town and the words "change anything"; R8 direct manipulation, no command grammar — pick and act in one motion; R9
  progressive depth — the first screen holds `intend`, `quarter`, `place` and `dress`, while `shape` and `hold` appear
  when a thing is clicked into; R10 the clerk speaks in previews (above); R11 undo is total and cheap, and no action is
  labelled "cannot be undone" (§7.4); R12 learn by doing — no manual needed, one-time first-use hints, tooltips on
  hover; R13 declared means held — what the author declared is pinned by its declaring event and no re-roll moves it
  (§7.2), the fates list saying so; R14 the count badge — every area declaration (quarter, fill, roster) previews its
  plots, households and buildings, with plus and minus; R15 never lose work — every declaration is in the log at once
  (the log is the document, §2.9), the history panel restores any earlier log position by logged undo events (§7.4),
  and the skeleton exports and re-opens at any time; R16 everything derived has a handle and move is first-class, singly
  and in groups (`moveFootprint`, `moveVertex`, `moveLabel`, instance moves, a multi-select move over any scope); R18
  hand off data, not a picture — a virtual-tabletop user gets one file, walled, lit and on the grid (§11.1); R19 the
  clerk is optional, labelled as AI and preview-first, never draws pixels, and every export carries which elements were
  declared, derived by rule or proposed by a clerk (§11.1). The three questions the survey left open are measured by
  §13.4's first-five-minutes test, each with its pre-decided fallback (J-A101.03).
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
  region takes arrow-key panning and **+ / −** zoom; every authoring gesture has a keyboard form — a points form's points
  placed at the focus with the arrow keys and Enter, handles cycled with Tab, a brush applied to the focused entity's
  scope. **The non-visual route to the map** is the gazetteer (list and
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
`FabricStrategy`; the owner-staged layers register `SkyStrategy`, `SewerStrategy`, `UndergroundStrategy`, `UndergroundSystemStrategy`,
`UndercityStrategy` and `UndergroundLinkStrategy`; the evolution engine an
`EvolutionStrategy`); `BuildingGenerator` (stage 3) and the default implementation of its `plan` step (§2.6); `StageDecl` registration by declared inputs and outputs; the
`PaintProgram`, `StyleSheet` and `LiveLayerProvider` registries; `Exporter`s; rule tables, presets, rung profiles,
setting packs and keymaps (data); `EditEvent` kinds with migrations; `LayerSpec`s; `ContentProvider` (host rosters, after
the double-run check); `BridgeTransport` and `DocResolver`; the `PlacementSolver` and the `DesignationMutator` (§4.7 S10b, S11); `CorpusAdapter` (§13.9);
an adapter folder per SettlementForge product line in `@plat/port` (item 73); the light rules and the sugar expansion
table (data); and any clerk, through the tool API (§11.2) — the host's own or the staged built-in one.
=== REPLACE ### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked ===
### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked

Tags: **BASE** (delivered by stage 1), **STAGE-2** (delivered by the neighbourhood stage through an interface the base
carries), **VILLAGE-LATER** (the separate product staged by the owner; checked as not precluded, hooks in PART III),
**module** (the optional `@plat/sim`, milestone M4b), **hook**. "Beyond" marks rows where the base deliberately exceeds
the reference's recorded weakness. Rows whose id starts `a:` come from the coverage audits' rows, so the matrix is no
coarser than the findings.

**MFCG (40 rows) — all BASE**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface / blueprint / URL | §4.2 S0, §6.4 permalinks, §7.7 intent (MFCG's flags kept as intent toggles and the features strip, §7.8) | BASE |
| A2 | RNG stream, seed chain, save/restore | §6.1 keyed sub-streams (beyond: no global stream) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (beyond: no whole-city restart; every requested feature counted by delivery tier) | BASE |
| B1 | patch mesh (spiral seeds → Delaunator → Voronoi/DCEL) | replaced by the plat and backbone faces (§2.2, §4.3); Delaunator kept for site sampling; the "denser, regular centre" look carried by the stage regimes | BASE |
| B2 | junction optimisation | §3.6 attraction + §4.3 junction merge (8 m), Y → T | BASE |
| B3 | coast / water field / `sea` | §4.2 S1 closed-outline coast at the request's bearing | BASE |
| B4 | land components (MFCG 12710731's domain pass) | §4.2 S1 flood fill of L0 | BASE |
| B5 | curtain wall, gates, towers, watergate | §4.2 S3 gate sites; §4.4 trace before the stage's growth; §4.8 gates at arterials with exact N by the measured gate law with its waterfront reduction (P11, item 46), water gates, towers by rule | BASE |
| B6 | citadel / castle (repair loop, placement, keep) | §4.2 S3 castle reservation by score (inside / on-enceinte / outside); §4.8 keep by `lir`, bailey, and the 0.75 compactness gate kept as a shape check, repaired in place in MFCG's order, then re-sited, then a keep without a bailey — never a restart (F-CASTLE) | BASE |
| B7 | streets and roads (MFCG 12710731's street graph, its path search and its road tidying) | §4.3 routed arterials, destinations = gates / markets / bridges / harbour | BASE |
| B8 | rivers / canals (regular, delta, bridges, mouth) | §4.2 S1 rivers by descent, distributaries (a delta), estuary as a width rule, islands; §4.8 bridges, canals as an intent flag | BASE |
| B9 | districts (seeded region growing, types, holes) | §4.5 grower over coarse faces with MFCG 12710731's per-kind growth rates (P13, item 47), a hole split, feature-named kinds, quarters; each district's identity read from its derived character after placement (§4.5, item 72) | BASE |
| B10 | ward → blocks (alleys by twisted bisection) | §4.6 bent-cut infill of each district polygon: the intramural secondary network and its lanes as spines | BASE |
| B11 | block → lots (twisted bisection, OBB, front recession) | §4.7 S10 per-frontage plots + §4.7 S11's front-line jitter (construction replaced by ruling O5; statistics matched, §13.5) | BASE |
| B12 | outskirts density falloff | §4.4 ribbon regime with the distance-to-gate kernel; §4.5 density field | BASE |
| B13 | shanty town / ribbon sprawl | §4.5 the shanty kind by FTG's trigger — the roster's average band `poor` or `squalid`, after the first half of the stages — its extramural placement a soft relation row (J-A27.43), the S0 `shanty` toggle forcing it on; its informal plots built as clusters of shacks, tents or lean-tos, each with its own door (§4.7 S11's `cluster` arrangement, item 70; FTG's tents row under the parity presets); §4.4 ribbon regime; the suburb regime on the shanty toggle | BASE |
| B14 | plaza, temple, churches, gate plazas | §4.2 S3 plaza reservation sized per rung and the principal market's trade-convergence site (S3 (12)); secondary markets as S7b claims, never touching another (§4.5 S7b (3)); §4.7 S9 `square` faces; §4.8 gate plazas and church forecourts (G-R1); institutions via claims | BASE |
| B15 | landmark / solid buildings, keep plan | §4.7 S11 institution site plans; §2.6 landmark footprint templates and OutlineBuildingGenerator; `lir` keep; solid-ink landmarks in `ink` | BASE (+ stage-3 hook) |
| B16 | greens / parks | §4.9 greenery rule table | BASE |
| B17 | farms and fields | §4.9 hinterland presets incl. the furrow style | BASE |
| B18 | harbour, docks, piers | §4.8 water furniture (basin, moles, quays, piers) | BASE |
| B19 | trees and forests | §4.9 forests as faces; §8.10 stamped ranked tiles (Poisson k = 50, shipped with the product) | BASE |
| B20 | elevation field (`Apply elevation`) | §4.2 S1 real heightfield feeding S4 / S5 costs (beyond) | BASE |
| C1 | display modes (Lots / Complex / Block / Hidden) | §8.5 LOD bands + the plot model: the Lots look = footprint masses over the `ground` role at the city band; Hidden = a layer toggle; cadastral layer optional (beyond: no global switch) | BASE |
| C2 | roofs Plain / Hip / Gable, Raised, Solids | §3.8 straight skeleton with the plain-roof downgrade; §8.2 `roof` program; §2.6 roof spec + heights; Raised = `ink`'s offset under-copy with per-class raise ratios (P15, item 54), on by default (§1.2) | BASE |
| C3 | lot post-processing (the front recession, P9) | §4.7 S11 front-line jitter — the area-scaled, floored recession (item 43) | BASE |
| D1 | naming (a feature-conditioned deck grammar; the Markov models MFCG 12710731 builds go unused) | §10.4 own engine and grammar | BASE |
| D2 | district labels (curved / straight / legend / hidden) | §9 hole-aware spines, quarter labels at city zoom, OBB-arc / straight / legend fallbacks (beyond: protected features) | BASE |
| D3 | map furniture (title, legend, scale bar, grid, compass, emblem, pins) | §9.5 (emblem slot with import and a minimal own generator; compass reroll) | BASE |
| E1 | colour system (schemes, roles, tints, weathering) | §8.2 roles, the contrast matrix, per-entity tints, thematic overrides; the role values on the palette targets (§8.2, item 69) | BASE |
| E2 | stroke discipline, layer order, caching | §8.2–§8.3 (casing idiom, round joins, order parity, world-aligned tiles) | BASE |
| E3 | alleys layer | §4.6 lanes / alleys are ways; §8.5 access-critical lanes drawn at the city band, the rest by LOD | BASE |
| E4 | district view, framing, no-zoom, thin lines | §8.8 continuous zoom on 2^¼ stops + the district band (beyond "no zoom"); framing §9.5; hairline mode (key **N**, §14) | BASE |
| F1 | warp tools (8) | §3.4 `warp` + §7.1 `warp` event with dry-run and whole-step validation | BASE |
| F2 | rerolls, renames, landmarks | §7.1 the named actions, `setAttr`, `assign` (beyond: persisted, undoable) | BASE |
| F3 | UI / hotkeys / size bands | `@plat/app` input scheme in `keymap.json` (§14); the measure tool (§9.5); the size ladder as data (§1.1) | BASE |
| G1 | export PNG / SVG / JSON | §11 (beyond: round-trip import, layered SVG) | BASE |
| G2 | integrations (FMG, Armoria, PS, Procgen Mansion) | §11 API, host bridge and static exports serve any host; the emblem is our own generator (§9.5); no third-party service is called (standalone) | BASE (hook) |
| H1 | population and scale model | §10.2 population as input; §2.1 metres (beyond the multiplier) | BASE |
| H2 | performance envelope | §12 (matched sizes 40 / 80 / 130; §12.9's declared trade) | BASE |

**FTG (46 rows + 9 audit rows) — BASE unless noted**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface, presets, save/load | §4.2 S0, §7.6 presets as data, §2.9 document | BASE |
| A2 | two-phase pipeline, staging, failure policy | §4.1 (programme before layout, two-way), §5 | BASE |
| A3 | coordinate system, units, wire format | §2.1 integer cm centred; §2.9 binary blocks / CBOR twin | BASE |
| A4 | determinism, seeding, regeneration of old settlements | §6, §6.4 retention, §7.5 migrate (beyond: FTG has none) | BASE |
| A5 | server/client split, persistence, lazy person generation | §11.2 handle API and workers; §2.9 document; §10.3 lazy people | BASE |
| a:A24 | app accessibility; list and search views reaching buildings and people without the map | §14 `@plat/app` accessibility contract, the gazetteer and "features in view" lists; §13.4 tests | BASE |
| a:A25 | user guide, context-aware documentation links, release notes naming defects | §14 `@plat/docs` and context help; §7.8 anchors; §13.2 coverage and link checks | BASE |
| B1 | size ladder, population and area budget | §1.1 ladder and rung profiles; §4.2 S2 stage quotas; §12.2 | BASE |
| B2 | dependency-graph building selection | §10.2 sequential roster (own tables) | BASE |
| B3 | residents, job postings, backfill, matching | §10.3 households (base); postings and re-matching in the module | BASE + module |
| B4 | people model | §10.3 derived people with ancestry rows (own tables) | BASE + module (data depth) |
| B5 | government, religion, factions, military | §2.7 Faction / Institution entities with seats, `Faction.kind`'s military and arcane powers and `Institution.powers` (item 79); the power standings among §7.7's circumstances; §10.2 government and religion rows (base); meetings, roles and goals in the module | BASE + module |
| B6 | relations, friend groups, rivalries, events | the relation store — schema in the base (§10.1), materialised by `@plat/sim` | module |
| a:B10 | economy: resource chains, items and services with prices, stock per building, global price edits | D-32: `@plat/sim` over the base schema stub (§10.3); roster rows' provides / uses edges (§10.2) | module |
| a:C03 | personality, education gated by class, stat block with profession modifiers | D-32: `@plat/sim`, derived from the person key; the stat block a named game-system pack, off by default | module |
| a:C11 | family-tree view (layered generations, elided expansion, re-root) | §14 `@plat/app` family-tree view over the relation store | module |
| C1 | coast generation, islands, ponds | §4.2 S1 closed-outline routine, bank classes (also sky islands) | BASE |
| C2 | rivers, branches, bridges, classification, direction | §4.2 S1 hydrology, tributaries, distributaries, river islands, crossing sites; §4.8 bridges | BASE |
| C3 | manually drawn water | §7.1 `drawWater` | BASE |
| C4 | road-graph substrate (PSLG, incremental faces, edge types) | §2.2 the plat (beyond: attraction policy, levels as views of one arena, role sets on edges) | BASE |
| C5 | road growth (proposal queue, cap, lengths, stages, initial roads) | §4.4 S5 outside the walls (mean-reverting curvature walk, destination-biased, explicit legality; per-preset growth rules for `american` / `ringed`); travel-cost stage boundaries with the anisotropy row (FTG's spoke priority) | BASE |
| C6 | district lots: creation, merge floor, type selection, order | §4.5 grower and typing, merge floor; S7b allocation | BASE |
| C7 | district internal pipeline (landmarks → divide → plots → buildings), placement modes, modifiers | §4.7 claims first → S8 → S10 → S11; Dense / Gaps / Individually placed ≈ row / detached / compound; the `cluster` arrangement of informal plots — shacks, tents or lean-tos, each with its own door (§4.7 S11, item 70), FTG's tents row under the parity presets — and the building-scale multiplier (§2.5) | BASE |
| C8 | lot → plot subdivision geometry | §4.7 S10 per-frontage regions (replaces recursive random cuts by ruling O5) | BASE |
| C9 | building footprints, landmark templates, entrances | §4.7 S11; the main door by the owner's rule (item 29) — the FTG client of the 2026-09-25 capture receives no door, its "entrance" being a light anchor (item 50); non-rectangular landmark footprint templates in the base (§2.6) | BASE |
| C10 | suburb stage | §4.4 suburb regime (offshoots, cul-de-sacs, small lots from the outset, density Bernoulli) by preset or the shanty toggle | BASE |
| C11 | walls and towers | §4.8 | BASE |
| C12 | castle district | §4.2 S3 castle reservation + §4.8 | BASE |
| C13 | harbours and waterfront districts | §4.8 water furniture; §4.5 docks | BASE |
| C14 | outer settlement: farmland, farmsteads, outside buildings | §4.9 S12a count-driven outside land, farmsteads, outside buildings on their resources (§10.2 `outside` rows) | BASE |
| C15 | forests, tree areas, trees, hedgerows | §4.9; §8.2 hedgerow instances in `lit` | BASE |
| a:I11 | tree species | §2.7 `Greenery.species` from the climate table; §4.9 inner and outer shares for woods | BASE |
| C16 | landscape decorations, reserve, climate presets | ponds carved at S3 (§4.2 S3 (10)); the rest of the decoration table is S12a's sites, built by the hinterland unit (§4.9); `reserve` land use; climate as a circumstance + style preset | BASE (should-have) |
| a:I05 | feathered field edges | §8.2 `feather` program (vector bands), on in `lit` | BASE |
| C17 | perimeter expand + round; decoration system | §4.5 S6's settlement perimeter, offset and rounded; §4.7 furniture pins (per-block weighted rows, per-district singletons) and plot boundary treatments (§2.5) | BASE |
| a:J05 | market stalls | §4.7 furniture pins: stalls on each market square's edge band, by its rank, and round its market hall | BASE |
| C18 | district and building naming, erosion | §10.4 (contraction as an EVO event) | BASE |
| D1 | renderer architecture | §8.1 columnar display list + tile backends (batched; picking through hit-test slices) | BASE |
| D2 | palette and feature treatment | §8.2 `lit` preset on Canvas2D with our procedural texture set, its palette aimed at §8.2's targets (item 69) | BASE |
| D3 | roofs (straight skeleton) | §3.8, §8.2 (roofs cached per entity revision, not per render) | BASE |
| D4 | water rendering and coast decoration | §8.2 bands, depth ramp, foam, bank classes | BASE |
| D5 | day/night, weather, seasons, window lights | §8.4's lighting model — the day view under the cursor, fixed or path sun, the night view under the moon with the placed `LightSource`s (§2.7, placed by §4.7's light rows), height-aware shadows; window lights derived from occupancy and the view's hour (§10.3); the season and weather rows (§8.2); the `FTG` parity preset's lighting at §13.5's row (item 68) | BASE |
| D6 | post-process effects | §8.2 post operations per tile | BASE (should-have) |
| D7 | labels, scale bar, grid, units, legend, thematic layers | §9; thematic layers = style overrides keyed by attributes (§8.2) | BASE |
| a:L08 | ruler (distance measuring) | §9.5 measure tool | BASE |
| D8 | 3-D view, street view, height maps | §11 glTF and CityJSON exports; heights in the model; no 3-D default view (R13 restraint) | BASE (export) |
| E1 | layout editor | §7.1 draw / move / warp events with split-on-cross and dry-run validation | BASE |
| E2 | regenerate area, bulk edit, constrained re-roll | §7.1 the named actions with scope; `setAttr` batches; faithful regeneration (beyond: undoable) | BASE |
| E3 | entity editing, dictionaries, pins, notes, layers | §7.1 `setAttr`, data dictionaries by id (§10.3), annotation layer (§9.5), view notes (§11.3), `LayerSpec` | BASE |
| F1 | schedules, behaviours, sub-locations | §10.3 module; sub-locations with capacities (§2.6) | module |
| F2 | clock, calendar, external time sync | §10.3 module; the time view state and the module's command over the bridge (§11.3) | module |
| G1 | export | §11 (beyond: districts in GeoJSON; per-layer VTT; CityJSON) | BASE |
| G2 | integrations (Foundry, Roll20, public links) | §11 VTT exports (Foundry-class, dd2vtt) + the host bridge over any transport; no hosted service — the host is the store (§11.5) | BASE |
| H1 | data scale | §12.8 memory; lazy people | BASE |
| H2 | performance envelope | §12 (beyond: client-side, no server round trip; the first-map and model laws with their declared misses, §12.3, §12.5, D-18) | BASE |

**NG (31 rows) — STAGE-2 unless the base already delivers it**

| id | capability | where | tag |
|---|---|---|---|
| A1 | tags, the per-map settings, URL state | PART II request (fabric id, params, character); §6.4 permalinks | STAGE-2 (request shape in BASE) |
| A2 | RNG engine, one stream, successor seed | §6.1 per-district sub-seed (beyond) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (NG's local retries are the F-CUT ladder) | BASE |
| B1 | hood outline (the NG 1.2.2 outline routine) | the district's typed boundary (II.1); standalone and sky outlines from §4.2 S1 (2)'s closed-outline routine with an outline template (II.1 rule (5)) | STAGE-2 |
| B2 | templates area / street / square | `FabricStrategy` registrations selected per district (II.2) | STAGE-2 |
| B3 | street network by bent recursive bisection | §4.6 (the base's infill primitive; NG signature as regression) | BASE |
| B4 | hole-aware bisection of annuli (the NG 1.2.2 hole-aware bisector) | §4.6 slit routing — the primitive `RingFabric` needs | BASE (primitive), STAGE-2 (ring) |
| B5 | street finishing: extend, fillet, width, corridor | §4.6; §4.7 S9 corridors | BASE |
| B6 | block content dispatch (ordinary, manor, empty and green blocks) | §4.6 the deep-interior choice by band shares; §4.7 S10 residue typing; §4.9 greens; the weighted, area- and spacing-conditioned choice as a stage-2 table (II.3) | BASE + STAGE-2 |
| B7 | square-template plaza | `SquareFabric`; §4.7 `square` faces | STAGE-2 |
| B8 | ring-template seed geometry | `RingFabric` (II.2) | STAGE-2 |
| C1 | lots, setback, validation (perimeter filter) | §4.7 S10 (construction: every plot with an access edge; the frontage-less leaves of NG 1.2.2 are its courts, item 42) | BASE |
| C2 | buildings, wings, compound plans, roof kinds, landmarks | §2.6 wings in the base + stage-3 hook; roof kinds in the base | BASE (+ stage 3) |
| C3 | manor compounds (walls, hall, grove) | §4.7 S11 set-back compound site plan with boundary treatments (the enclosure is ours, item 44 — NG 1.2.2 draws none) + §4.9 grove rule | BASE |
| C4 | greens, groves, shared Poisson field | §4.9 greenery rules; §8.10 stamped tiles | BASE |
| C5 | trees (crown construction, colour, shading, draw order) | §8.2 lobed crowns and the `hatched` tree order (large-tree pins under the buildings, block trees above them; item 58); §8.10 crown library | BASE symbol, STAGE-2 tier |
| C6 | pins: wells, fountains, large trees | §2.7 `Pin` kinds; §4.7 furniture pins in yards and squares; close-up density by the stage-2 table (II.3) | BASE (pins), STAGE-2 (close-up density) |
| C7 | uneven streetwall | §4.7 S11 front-line jitter | BASE |
| C8 | size tags, scale, character knobs | the per-district intent (`DistrictIntent`, layer 2 of §7.7) with each district's derived character (§2.5, §4.5; item 72); metric scale (beyond) | BASE |
| D1 | naming | §10.4 | BASE |
| D2 | title layout (corner choice) | §9.5 emptiest-corner rule | BASE |
| E1 | palette / style schema, presets, multi-colour | §8.2 (`hatched` / `graphic` presets; multi-colour roles; palettes aimed at §8.2's targets, item 69) | BASE |
| E2 | canvas, layer order, stroke discipline, tree order (NG 1.2.2: large-tree pins under the buildings, block trees above them — no depth sort; item 58) | §8.2–§8.3 | BASE |
| E3 | roads rendering (Plain + five modes) | §8.2 programs in `hatched` (the road programs II.4 adds) | STAGE-2 tier |
| E4 | roof rendering: fake gables, colour law, hatching | §8.2 `roof` + `hatch(taper)`; §8.6 | STAGE-2 tier (programs in BASE) |
| E5 | shadows (prism quads, tree shadows) | §8.4's lighting model — height-aware shadows from stored heights, the vector shadow pass its fallback rung; the `hatched` family's prism pass its parity rendering (§13.5; item 68) | BASE, STAGE-2 tier |
| E6 | unrecorded style features (night lights, presets) | §8.2 presets as data; night lights by §8.4's night view and the placed lights (§2.7, §4.7; item 68) | BASE (lights), STAGE-2 tier (presets) |
| F1 | toggles, hotkeys, presets, tags dialog, rotation, renaming | `@plat/app` (keymap, §14); rotation = view (§7.1); `setAttr` rename persists | BASE (app) |
| G1 | export PNG / SVG / JSON, permalinks | §11 | BASE |
| G2 | integrations (Procgen Mansion hand-off) | the stage-3 `BuildingGenerator` takes the plot and entrance directly (beyond the rasterised hand-off: Dwellings itch 17195045 replaces any plan over 11 cells wide that arrives that way by a random house; ours has no such limit, item 60) | hook |
| H1 | performance envelope | §12 (opening a district and per-district regeneration: §15.2 S5, S6 and §16 M5) | STAGE-2 |

**VG (44 rows) — VILLAGE-LATER: not-precluded checks, hooks in PART III**

| rows | capability group | not precluded because |
|---|---|---|
| G1, G20 | tags, descriptive tags | the intent layer and presets are data (§7.7); tags derivable from the statistics record |
| G2 | seed / RNG / retry | §6 streams; §5 no whole-build retry (item 51) |
| G3–G5 | river course before terrain, height field, water extraction | S1 shares level-set water and a carved field; VG's course-first, terrain-independent spline is a `RiverStrategy` the village registers, which S1's carve step serves (PART III) |
| G6, G7 | density map, heart | the density field is the same field type (§4.5); a village registers a density `StageDecl` ahead of its network (§4.12) and seeds one heart (§4.2 S3) |
| G8, G9 | tracker roads, bridges | a village registers a tracker-steered `NetworkStrategy` that receives the traced enceintes (§4.12); bridges §4.8 |
| G10, G11 | square + centrepieces, wharf / piers | `square` faces + pins; `quay` / `pier` ways |
| G12–G16 | buildings + population, fields, orchards, forest, palisade | detached / farmstead site plans (§4.7); hinterland presets and orchards (§4.9); forests; the palisade built before the roads by the village's `EnceinteStrategy` (PART III) |
| G17–G19 | naming, legend / POIs, population class | §10.4, §9.5 annotation layer, §10.2; the ladder's village rows (PART III) |
| R1–R17 | rendering (palette, layers, relief, hillshade, spotlight, water bands, roads, buildings, trees, shadows, fields, outlining, palisade, lights, nameplate, grid, numbering) | style sheets + programs (§8.2: bands, contour and hachure marks, outline mix, vignette; the palettes on §8.2's targets); the lighting model with its placed lights (§8.4, §4.7; item 68); the relief tier (hillshade, contours, hachures) is an optional base program, off by default; VG's grass-tuft and spotlight looks stay with the village product |
| E1–E6, D1 | export, JSON, permalinks, editing, integrations, performance, scale | §11, §7, §12, §2.1 (metres everywhere; VG's 0.7 m / unit ambiguity removed) |

All 44 rows are not precluded; the base pays for none of them beyond what it needs itself (the relief tier is a base
should-have in its own right, O12 extras). Caution from the parity judge: the five-level plat is the least
village-shaped model — a village with houses along ways leaves L2 / L3 nearly empty — admissible, since a village is one
district and nothing assumes walls or a market (PART III).
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
| O5 frontage-first plots | must | §4.7 S10 | (a) access edge 100 %, and every hidden plot reachable by a chain of access edges from a public way (§13.2 T30-1) [C]; (b) 0 plots < 3 m, wedges < 0.5 % [C]; (c) side walls ± 5° ≥ 90 % [C]; (d) typed coverage 100 %, discard ≤ 0.05 [C]; (e) plot and block distributions by §13.5's band rule [P]; (f) 0 self-intersecting, duplicate or doorless buildings — exactly one main entrance per building facing its street, court or passage, or its footpath (§2.6 rule 1), side, rear and yard doors by §2.6's rules (§13.2 T29-1, T29-2) [O — FTG's hourglasses and duplicate houses; FTG models no door — the FTG client of the 2026-09-25 capture receives none (item 50)]; (g) streetwall gap ≤ 1 m [C]; streetwall continuity on dense frontages ≥ MFCG's at the matched rung [P] |
| O18 prosperity field + granularity law | must | §4.5 field; §4.7 S10 joins / splits / alleys; §4.6 deep interiors; §4.7 S10b's class mix (item 71); §4.5's character, band range and dials (item 72) | (a) Spearman(prosperity, plot area) ≥ 0.8 and Spearman(prosperity, plots per ha) ≤ −0.8 [C]; (b) Moran's I of plot area > 0 [C]; (c) detached, yard, attached and coverage shares, and the class mix inside a band row (§13.2 T71-1, T71-2), monotone in prosperity [C]; (d) alley length per ha ~ −prosperity (Spearman ≤ −0.7), 0 alleys below the class minimum, the dead-end share in band [C]; the court share of deep blocks within band per class [P]; the hidden-plot share per district within its §4.6 target ± 0.03 (§13.7, T30-2) [C]; (e) access 100 % [C]; (f) institutions placed 100 %, never gives up [C]; (g) provenance, and the perturbation test ≥ 95 % outside; under a band change the wealth ladder's bars of §13.2 (T31-1 – T31-12) — no occupied building removed, a plot's geometry at or above its floor, granularity within the band's target after a re-cut [C]; (h) soft-seam jumps within §13.7's bands [O]; (i) a smooth field — §13.7's gradient threshold — whose edits replay [C]; (j) within-district plot-area CV ≥ 0.25 (§13.7) [O]; (k) gap-width modes [C]; (l) mixed blocks put their largest classes on prime frontages above a shuffled baseline by §13.7's margin (§13.2 T71-3) [O]; (m) the neighbourhood bounds its buildings — every prosperity-driven state inside its district's band range, an institution's excess its district's pressure, identities and dials weighed by value, not volume (§13.2 T72-3, T72-6 – T72-8) [C] |
| O17 plot model, site plans, heights | must | §2.5–§2.6, §4.7 S11, §8.4; the informal clusters of §4.7 S11 (item 70); the Works of §4.11 (item 67) | (a) coverage within the table [C]; (b) multi-footprint plots > 0 for institutions, manors, inns and farms [C]; (c) party-wall share by band, attached ≥ 90 % in dense bands [P — NG 39–43 %, 95–99 %]; (d) streetwall continuity ≥ MFCG's Lots mode, walled or fenced frontage counted [P]; (e) yards owned 100 % [C]; (f) footprints fit 100 % [C]; (g) heights on 100 %, shadow ∝ height r ≥ 0.99 under the fixed sun on isolated casters (§8.4) [C]; (h) ≤ 5 µs per plot median for site plans (§12.4) [C]; (i) footprint hash identical across LOD [C]; (j) entrances and basements by §2.6's rules — no cellar under the flood band, every basement inside and smaller than its ground floor (§13.2 T29-3, T29-4) [C]; (k) every structure of an informal cluster with its own door on a footpath reaching an access edge, the fire gap held (§13.2 T70-1 – T70-4) [C]; (l) a building in transition drawn at its Works stage, which depends on nothing but its record and the week, never leaving its plot without access (§13.2 T67-1 – T67-4) [C] |
| O7 content-first land use | must | §4.2 S2, §4.5 S7b, §4.7 S10b, §10.2 | (a) every building has a function and an occupancy (100 %); requested population ± 5 % on ≥ 95 % of seeds [O — MFCG's multiplier]; every person a home (100 %) [C]; every person a work or role (100 %) — a module letter, measured at M4b [C]; (b) hard relation rows satisfied 100 % and soft-row satisfaction ≥ 95 % reported per city — noxious trades downstream or extramural, water trades within 100 m of water, the market hall at a tier-1 junction or gate, inns at gates (§13.2 T16-1) [C]; (c) Moran's I (wealth) > 0 and monotone in the requested gradient [C]; (d) 0 constraint violations; per-capita ratio error against the tables reported; no occupation above its per-capita maximum [O — FTG's "20 adventurers" per 100 people]; (e) reconciliation ≤ 3 rounds [C]; (f) seam discontinuity within §13.7's bands [O]; (g) lazy people stable 100 %; opening a person writes nothing [C]; (h) gazetteer 100 % [C]; block-level use mix within §13.7's bands [O] |
| O19 greenery by prosperity | must | §4.9 rule table | §4.9's acceptance (a)–(g); classes: (a) [C — NG's 23–58 % at identical tags is the weakness]; (b) [C]; (c) [O — MFCG and NG green is leftover space]; (d) at §13.7's canopy threshold [O — FTG minimum 0.14 m]; (e) [P — VG P1; the frame budget is §12.7's]; (f) [C]; (g) at §13.7's city-zoom check [O] |
| O8 fortification network | must | §4.2 S3, §4.4, §4.8, §4.11 | (a) gates at 100 % of arterial crossings, count exact [C]; (b) 0 buildings in the setback band on both faces [C]; (c) tower spacing in band, 0 sawtooth [P — FTG 39 m]; (d) defensible-ground share; castle ≥ p80 among candidates [C]; castle area and compactness in MFCG's band [P]; (e) walled share in MFCG's band (§13.5) [P]; outer curtain on request [C]; (f) 4 / 4 circuit configurations, including two independent enceintes (polycentric nuclei, §4.2 S3) [O]; (g) wall → road keeps plot ids [C]; (h) the wall an entity in every export [C] |
| O12 display list, LOD, style as data, layers | must | §8 | (a) continuous zoom, footprint hash identical per LOD, minimum drawn feature ≥ 2 px, labels above §9.4's floors at every level, no feature pops more than once [O — MFCG has no zoom]; (b) pan and zoom ≥ 60 fps at 40 000 buildings and 200 000 trees on the reference machine and ≥ 30 fps on the low-end device; edit-to-redraw < 100 ms; roof computations per frame after warm-up = 0; ≤ 80 draw calls per tile (≤ 80 × P per view) and ≤ 4 uploads per frame during gestures, every ready tile at first paint and settle (§12.5) [P — NG 528 uploads per hood; FTG's roofs recomputed every render]; (c) screen = PNG = SVG within threshold, 0 silent couplings [C]; (d) glyph ambiguity 0, legend 100 % of the places the viewer's knowledge key admits (§9.2), every visible feature hit-testable [C]; (e) 300 dpi A2 [O]; (f) §8.2's contrast matrix on the rendered city band [C]; (g) first map by §12.5's laws of the building count, the miss above its knee declared for the owner's veto [P]; street-edge recoverability ≥ MFCG − 0.03 (§8.5) [P] |
| O9 persistent document, locks, regeneration, undo | must | §2.9, §7 | (a) save / load / save identical [C]; (b) locked preserved 100 %; outside the effective scope byte-identical (§7.3 item 7 ii) [C]; (c) faithfulness = §7.3 item 7 (iv): Regenerate (keep settings) byte-identical [C]; New random judged by §13.2's calibrated rank campaign, whose design and executed calibration are stated there [O — FTG's "too snug" regeneration]; (d) every operation undoable (enumeration test) [C]; (e) an upgrade keeps 100 % of edited entities or reports each orphan [O — FTG cannot regenerate old towns]; (f) the thirteen MFCG edit asks of §7.4 as scripted B-EDIT scenarios, each reporting its locality share, invariants and re-run cost (§13.2) [O — MFCG: "no way to save those changes"] |
| O16-core report and honest controls | must | §5.4, §7.1, §7.8 | (a) report 100 %; the requested-vs-built diff and every requested feature's delivery tier shown when non-empty [O — MFCG's 28 silent street failures]; (b) auto-resolved values reported 100 % [C]; (d) hidden couplings 0 [C]; (f) every numeric control monotone and continuous by §7.8's statistical rule [C]; (h) seed → map identity 100 % [C] |
| O13-core labels and names | must | §9, §10.4 | (a) 0 protected overlaps, 0 collisions, inside ≥ 99 %, curvature within §13.7's limit, 0 labels crossing holes [O — MFCG covers gates and the keep]; quarter labels at MFCG's count at matched sizes [P]; (c) name–feature consistency 100 % within 250 m [C]; (e) edited names persist 100 % [C] |
| O14-core hinterland and margin | must | §4.9 | (a) farmland per capita ± 20 % [C]; (b) field access 100 %; every farmstead within 300 m of one of its fields and 1 500 m of all; land-use overlaps 0; unused components 0 [C]; (d) roads leave to destinations 100 %, rivers enter and exit [C]; (e) built / map area 0.06–0.25 at every rung (§13.7) [O — FTG's fixed canvas per class]; (h) woods sized to the fuel and timber rows with the import share reported, the farmland mode by size and landscape (§13.2 T26-1, T26-2) [C] |
| O10 intent, constraints, assignment, forms | should (input schema + drift bounds: must hook) | §7.7; §14's dossier port (items 73–88); §4.5's district-defining and dispersed classes (item 72) | (a) 10 / 10 scripted intent tasks without URL editing [O]; (b) hard targets 100 %, achieved-vs-requested reported [C]; (c) monotonicity [C]; (d) pins 100 % [C]; (e) assignments ≥ 99 % within drift, placed by the one solver under the hard relation rows, infeasibility reported with the nearest count and the closest options (§13.2 T16-1, T16-3) [C]; (f) size error p90 ≤ 10 % [C]; (g) the forms classifier ≥ 90 % over the forms catalogue, `linear-street`, `island-city` and `twin-town` included [C]; (h) edited tables versioned, default path byte-identical [C]; (i) the dossier contract — a map delete of a dossier-backed element re-placed from the same seed, a dossier change mutating the map that exists, one history one digest (§13.2 T20-1 – T20-6, T22-1 – T22-4) [O — no reference has a host contract]; derivation before invention — no derived fact contradicting a dossier fact, a dossier-owned value refused, the derivation table total, every value's fact tier shown (T20-7 – T20-13) [C]; (j) the dossier port on real dossiers — B-DOSSIER-lite's creation bars from M1 and its absorb bars from M3a (§13.2 T73-1 – T73-10, T75-1 – T75-5), the seam's inert exports and one-way seed (T85-1 – T85-3) [O — no reference reads a host's settlement record]; (k) a district-defining dossier institution shapes one district at its row's share, never every lot, and dispersed classes spread across districts (T72-4, T72-5) [C] |
| O13 full (street names, addresses, annotation) | should | §9 | (b) ≥ 90 % of named streets labelled at neighbourhood LOD [O — no reference names its streets]; (d) 0 spelling errors [C]; (f) annotation layer [C]; (g) addresses 100 % [C] |
| O14 full (rings, presets, wildness, feasibility) | should | §4.9 | (c) wood-edge straightness median ≤ 0.90, canopy monotone in wildness (§13.7) [O — VG's "Some" ≈ "Many"]; (f) ≥ 95 % of the map land-classed [C]; (g) scatter statistics [P] |
| O16 full (thumbnails, drafts, discoverability, responsive, accessible) | should | §7.8 (S0–S4 proxy thumbnails, G-R4), `@plat/app` (§14); §7.1's authoring toolkit with §14's interaction contract (item 101) | (c) the scripted tasks of §13.4, each in one action where a reference needs a detour, every response ≤ 1 s (replaces "≥ 90 % of testers") [O]; (e) six thumbnails < 1 s at TOWN [P]; (g) editor usable at 768 px [C]; the accessibility contract (§14, §13.4) [C]; (i) the authoring toolkit — at most twelve tools, one event from every surface, a skeleton that reproduces its city, a clerk's transcript that replays (§13.2 T101-1 – T101-9) [C] — and the first-five-minutes test at M2a and M3a (§13.4) [O] |
| O12 extras (relief tier, tiled export, low-end tier) | should | §8.2 relief tier; §8.8 tiled export; the low tier (§12) | as O12 (b), (e); the relief tier renders at every rung and is off by default [C] |
| owner rule: light (item 68) | must (owner rule) | §8.4's lighting model; §4.7's light placement; §2.7 `LightSource` | (a) height-aware shadows — a spot lit from every side has none, no shadow climbs a taller roof, a lower roof shortens a shadow that continues beyond it (§13.2 T68-1 – T68-3) [C]; (b) after sunset every way class × band reaches its light rows' target minimum illuminance, and concealed and clandestine plots stay unlit unless a row places a light there (T68-5, T68-6) [C]; (c) the CPU reference byte-identical on the five engines and the GPU pass within §13.4's tolerance (T68-4, T68-7) [C]; (d) the fallback ladder draws a legible map on every device, never an error (T68-8, §13.4) [C]; (e) O12 (b)'s pan-and-zoom frame budget holds with the cursor sun on (§12.5) [P] |
| O7 simulation module | should | §10.1, §10.3 `@plat/sim` (M4b) | the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported; every person a work or role (100 %); the economy and personality content of D-32 derived deterministically from its keys [C] |
| O11 extras (VTT native, per-layer, binary, 3-D, GIS profile) | should | §11 | (g), (h); format validators, CityJSON's included [C] |
| O9 extras (upgrade replay with diff) | should | §7.5, §6.4 retention | the upgrade test; goldens replay under N−1 and N−2 [C] |
| O2 / O6 extras (golden suite, calibration interface) | should | §13.3, §7.6, §13.9 | the declared-shift protocol in CI from M1; every table value replaceable with provenance; the corpus interface of §13.9 present [C] |
| hooks 1–8 (§5.4) | must | 1 addresses + sub-seeds §6.3 / §6.1; 2 lifecycle + edit log + incremental pipeline + conversions — the decline ladders, the use step, the wealth ladder with its floor, the terrain-water and passage kinds, the Works records with their derivation rule and the weekly clock (item 67) and the closure edits (item 66) §2.8 / §7 / §4.11; 3 assignment input + the one placement solver and the designation mutator + the dossier contract with its two tiers of fact and its derivation table (item 20 (h)) and the port (items 73–88) §7.7 / §4.7 S10b, S11 / §14; 4 context vector + rules as data §2.5 / §7.6; 5 building-generator interface (`outline` / `compose` / `plan`) + heights + the entrance set and basement + shadow hook §2.6 / §8.4; 6 layers + drainage + any-boundary neighbourhood + island outlines + the island rule, the sewer tier rows and the underground arena's hooks — the underground systems, the undercity's existence row and the connection graph (item 65), the basement access rows (item 64) and the concealed modes (item 63) included — §2.1 / §2.3 / PART II / II.6 / II.7 / §4.2; 7 editable versioned tables + preference layer + the emulation marker and parity presets §7.6; 8 circumstances timeline — its trade, economy and power slices typed (items 77–79) — + stored editable field + the built band and geometry floor + the staged records the port will fill (item 88) §7.7 / §4.5 / §4.11 / §2.7 | every hook field declared in the schema of every entity type and populated when used (registry test, 100 %) [C]; zero cost when unused — with every hook unused, the one-click model time and document size equal a build with the hook fields removed within 2 % (a CI comparison) [C] |
| S1 boundary and seam contract | STAGE-2 (must in base) | §2.5 `SeamContract` from M1, §4.12, PART II | 100 % of districts carry a complete contract; portals 100 %; misalignment 0; Hausdorff 0 for shared entities [C]; at M1 the check is schema completeness only (the field is flat until M2b, so its samples are constants) [C] |
| S3 seam-continuous fields | STAGE-2 (must in base) | §4.5 fields with `hard` flags per seam edge | Δ frontage, area and storeys within §13.7's bands on soft seams [O — NG's hoods cannot share a street] |
| S2 context features inside the neighbourhood | STAGE-2 | II.1 (the request's context), II.3 (context features as constraints), §4.8 water furniture, §4.4 intervallum | (a) a context coverage matrix — district context (waterfront, wall-side, slope, bridgehead, gate approach, sky) × generated feature — with no empty cell: every waterfront district has a quay or bank path, every wall-side district an intervallum or a rear-plot rule [C]; (b) 0 buildings in water; bridges within ± 10° of the channel normal [C]; (c) 0 fragments cut at the close-up frame — the surroundings continue at lower LOD to the frame [C]; (d) S2's blind preference test, run as §13.6's protocol against NG at M5 with the owner as the declared rater [O] |
| S4 composable context templates, functional squares, landmark-centred neighbourhoods | STAGE-2 | II.2 template fabrics, II.3 dispatch table, §4.7 claims, §2.6 footprint templates | (a) every base district kind has ≥ 1 template [C]; (b) the templates' morphologies are separable by generated statistics — a nearest-centroid classifier over §7.7's signature vector, computed per district, assigns ≥ 90 % of template districts to their template [C]; (c) ≥ 90 % of squares on a tier-1 junction or in front of a landmark [C]; (d) typed-square area per 1 000 inhabitants within §13.7's band [C]; (e) a requested landmark delivered ≥ 99 % [C]; (f) rule satisfaction ≥ 95 % [C] |
| S5 NG-class close-up render tier | STAGE-2 | II.4, §8.2 `hatched`, §8.6, §8.4 shadow pass | (a) opening one district at neighbourhood LOD ≤ NG's 10–96 ms at comparable building counts [P]; (b) generation ≤ NG's 64–75 µs and rendering ≤ ≈ 85 µs per building [P]; (c) draw operations per frame and uploads within §12.5's budgets, against NG's 528 uploads per hood and 55–80 % hatch share of operations [P]; (d) the `hatched` style regression — per-wing operation mix and the roof colour law (§8.3) [P]; (e) shadow length ∝ stored height under the fixed sun, r ≥ 0.99 [C]; (f) footprint hash identical to the city LOD [C]; (g) city-zoom legibility unchanged with the tier on (B-ZOOM) [C] |
| S6 stage-2 workflow | STAGE-2 | II.4 workflow, §7.1 named actions, §6.1 per-district streams | (a) five variants of one template in five actions, where NG needs a tags dialog or a URL detour [O]; (b) the default path one action with p95 ≤ 0.5 s for a medium neighbourhood [P — NG]; (c) rerolling one district or block leaves 100 % of entities outside it identical in address and geometry, the seam exception of II.4 excepted [C]; (d) addresses, names and footprints preserved across levels, 100 % [C]; (e) 0 hand-offs to another tool [C] |
=== REPLACE ## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 ===
## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at five seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b) and
stage 2 (M5). Effort is stated honestly as a range with its basis: about 185.5–248.5 expert person-weeks (J-A16.01; the
2026-09-27/28 amendments' share J-A63.05, J-A73.05, J-A101.05). The subjects the
owner's roadmap puts later are listed in *Staged by the owner's roadmap*; nothing else is out of scope.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 93–124 calendar weeks
at that staffing; staffing per the owner (architecture and rulings on Fable seats; build, verify and measure on Opus
seats). Every milestone ends on executed evidence, never on intention, and every exit writes its `MilestoneRecord`
with the milestone's declared shifts and fails on an undeclared one (§13.3). **The owner's panel at every gating exit:**
M2b ("the base at parity"), M4 ("mastered") and M5 (the stage-2 gate) claim their D-5 verdict only by a rated pass of
§13.6's protocol or by the owner's acceptance recorded in the `D5Record`; an unrated panel follows §13.6 (7) — the build
continues, the milestone's status is *provisional — not rated*, the claim is not made and the panel is offered again.

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal; **the MFCG sweep at five seeds per matched size** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza, and every ⟨M-1⟩ number of §13.5 — streetwall continuity on dense frontages, lots per block, T / Y share, intramural dead ends, blocks per ha, inner-lot removal and street-edge recoverability on its plain renders (the metric of §8.5, implemented research-side and cross-checked against the product's implementation on M1's golden renders within 0.01); **FTG captures at BIG_TOWN and BIG_CITY**, three of each — one with FTG's water options nearest to `none` and two nearest to `coast+river`, each capture's id (its folder name), `WaterSetting` and recorded population (the residents its decoded payload holds) recorded in its README for §13.6 (2)'s pairs — over six days on the free daily allowance, decoded with the existing tools; outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload; NG block counts per template at `medium` from the vertex captures; the variety dispersions of MFCG and FTG; **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (§17.1); the plot-depth rows and the regimes' block-depth minimums behind §4.6 step 1's per-face stop threshold re-fitted under that reading on NG's vertex captures and the MFCG sweep before any block band is signed (item 34; J-A34.01) | every §13.5 baseline row present with its provenance — or, for an ⟨M-1⟩ number M-1 could not measure, the row made descriptive and entered in `known-defects.json` by §13.5's ⟨M-1⟩ rule — and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded, each with its resident count or §13.6 (2)'s nominal fallback, marked; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits; the re-fitted depth rows recorded with provenance "M-1 ⟨date⟩" | 2–3 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit — §4.6's restatement of NG 1.2.2's mechanism (items 34–40) — calibrated on NG's vertex captures after NG's signature is re-measured on curved, round-joined, triangular, C-shaped and holed faces: its comparison with NG's distributions on the same faces is the check of the adopted corner-first rule (the far-side fallback no longer exists), and `cut.flattenM` is calibrated there (J-A37.01); (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1; S11's geometry share ≤ 3 µs per plot median; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-order determinism (§13.2); (b) σ — a measured output of step 2's position law, read in the frame NG's was measured in — within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, the fillet share within ± 0.05 of NG's (§13.5), block-area and cut-length KS by the band rule, and §13.2's T34-1 – T41-1 — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b), at all three rungs (§1.1: METROPOLIS is in the goldens, B-CITY, the determinism tests and the diagnostic panel; M2b measures and tunes it); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; **the `.plat` writer and reader for generated towns** (§2.9, §3.9) — the manifest, the content-addressed chunks with §3.9's geometry layout, gzip compression and an empty log — which the document-size test and the *preview* documents need and M2a's log builds on: a saved town of the running output version opens by decoding its snapshot and comparing its recomputed root with `model.digest` (M0's full recomputation), a differing root loading as a corrupt cache by regeneration from the recipe (§2.9 steps 3 and 5); **a document whose `outputVersion` is not the running one is never root-checked: it opens as §2.9 step 2's frozen view — each chunk checked by its content hash, the state decoded for view and export only, labelled "made with oK; not verified by this version" — with the offer to open its recipe under the running version and §6.4's preview notice; the `frozenImport` rebase arrives with M3a's rebases**; the records digest joins the snapshot at M2a, whose reader opens an M1 document of the running output version, which lacks it, by the same regeneration (§2.9 step 5); permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (§13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items:** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw); **amendments b at M1:** the transient arena's open, read-back and release (§3.4), `RungProfile.layers` with `Features.sewers` resolved at S0 (§1.1, II.7.1), the emulation marker on every default cell and the parity presets `MFCG` / `FTG` (§7.6) (≈ 1 pw); **amendments c, d and e at M1:** `factTier` over the registry's dossier paths, the derivation table as an index and its totality bar (item 20 (h), §7.7); the geology flag's S0 draw and S1 resolution, with the relief toggle's S0 pick that S1 (1) and the flag's row read (item 65; §4.2 S0, S1 (10); J-A65.49; both uniforms drawn on `blueprint.features` in §6.1's order), so `Terrain.geology` and the relief class are in the first golden, as `Features.sewers` is (absorbed by the O1 line; J-A65.02); the `ink` palette on the owner-opened corpus targets with its measurement code (item 69, §8.2); `@plat/port` in the tests only — the `DossierDigest`, one SettlementForge adapter for the line `fp/integration-2026-09-23` and the creation half, the binding table's shape and key law, the `tables/dossier/*` rows, the typed circumstance slices, `Institution.powers` and `Assignment.state` as schema, the one-way seed and the inert-export bar, the ignore-list, the refusal below 1 500 and above the cap — with the frozen dossier fixtures and B-DOSSIER-lite (items 73–86, §14, §7.7) (≈ 2.5–3 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (§12.3's rule for which configuration is primary at each size — its p95 within the pooled law + 10 % at the band's bottom, target and top, below a single worker's on the same generations, digests identical for pool sizes 0–3 on 200 seeds — with that rule's pre-decided outcomes); the label-composition measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's; the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY) and the generated-town round trip — save → load → save byte-identical over the canonical form on B-CITY-lite's towns (§2.9); **a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message**; the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the model max clause at TOWN and CITY, judged on confirmed outliers (§12.3); the furniture and snap query round trip (§8.9); the sliced-raster census rows (§8.3); the pan-and-zoom run during an A2 export (§8.9, §12.7); the stamp-tile asset load (§8.10, §12.7); the stamp tiles' seam check (§8.3); the sliced-placement census row, and the export's placement stepped in class 4 during the pan-and-zoom export run (§8.3, §8.9); the pin-pass B-ZOOM fixture (§9.2); the harbour pick's measurement on B-CITY walled coastal seeds — p99 of harbour route ÷ the least-cost path with the wall ignored ≤ 1.5, and if it fails the detour guard becomes the default (§4.2 S3 (4), (7)); the SVG export's transient-list peak (§12.8); memory within §12.8's lines at TOWN and CITY on generated towns at pool sizes 0 and 3 (the load-verification case is M2a's); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7); of amendments b's bars (§13.2): T13-1, T14-1 but its hidden-render clause (that clause at the network stage's intake), T16-4, T23-1's registry test; of amendments c, d and e's bars (§13.2): T43-1 – T43-5, T45-1, T46-1, T47-1, T54-1, T55-1, B-DOSSIER-lite green (T73-1 – T73-10) with item 20 (h)'s creation and totality bars on the fixtures with T20-13, T77-1's slice clause, T81-2's creation clause, T85-1, T85-2, T65-7 (its sky-island clause from M4) and T88-1 (each reader from the milestone that builds it), and the `ink` palette inside its corpus targets on the measurement render (§13.4, item 69) | 38.5–50 pw |
| **M2a — the editing core** (D-7: before the second preset) | the log and the one replay fold over M1's document format; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); per-document sessions (§7.4); load verification over M1's reader — the load's recomputation of the decoded state's own digest and of its records digest before its first edit, then edits applied at once during load verification with both mismatch choices (§2.9 steps 3–4); **with the keep, §6.4's link rule that the base is the recipe, with its message — a link is emitted only for a town that rule and §6.4's log rules allow, and a rebased town, a kept saved town included, is offered as its `.plat` file**; replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence; **amendment e at M2a:** item 101's T9 `shape` and T10 `hold` on the canvas with the dry-run report's ghost, count badge and variations (≈ 1–1.5 pw) | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which measures it); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 %; open-to-editable within T(B) at TOWN and CITY, and the corrupt-cache fixture — a snapshot with one moved footprint and an unchanged `model.digest` reported and loaded by replay, never verified (§2.9 step 3); the records-mismatch fixture and the §6.2 (iii) keep-and-save gating fixture (§13.2); **a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)**; on the reference 300-edit CITY document, an edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms with pool size ≥ 1 (§2.9 step 3); memory at CITY while that document is load-verified, with a district regeneration and a Re-derive from S3 applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied; the rebased-document size test — a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased document, or §2.9's block-group fallback applied; the first session of item 101's first-five-minutes test (§13.4) | 10–13.5 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs (§8.2); the relief tier; METROPOLIS measured and tuned, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw); **amendments b at M2b:** the designation templates with specialisation and the one placement solver at generation with its relation rules and supply edges (§4.7 S10b, S11), the generation fill (§4.7; J-A28.46) within §2.6's one household capacity, with the programme rows' `circulation` share and the `room` form's least area it reads at the poorest band (§10.2), the default band set with the shanty rule and its median-household band (§4.5), the entrance set and the basement decision (§2.6) with the entrance-tick rows (§8.2, §8.3), exposure, the hidden-share rows and passages with the arch-glyph rows (§4.6, §8.2, §8.3), the `states` rows (§8.2), N markets with the principal-market score (§4.2), FTG's hinterland order and modes with the fuel and wood rows (§4.9) (≈ 3–4 pw); **amendments c, d and e at M2b:** a clandestine institution's front and hidden modes in the one solver, with the cover rows (item 63, §4.7); the day lighting model — the cursor sun, height-aware gradient shadows, the CPU reference light pass, its GPU accelerator and the fallback ladder — with `lit` (item 68, §8.4); informal clusters with derived tenure (item 70); the class mix inside a band (item 71); the district character, identities, the three dials and the band range with S12c, the step after S11 (item 72, §4.5); the dossier vocabulary's class rows beside the remaining base content (the port) (≈ 6–9.5 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS; B-ZOOM role continuity across every band switch of `ink` and `lit`; O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the pool rule, the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9); open-to-editable within T(B) and memory within §12.8's line at METROPOLIS (§2.9 step 3, §12.8); the moving-sun step budget (§8.4); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the `lit` export beside a moving `path` sun (§12.7); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: *provisional — not rated*, and "the base at parity" is not claimed; of amendments b's bars (§13.2): T16-1, T16-2, T19-1 – T19-3, T19-4 but its dossier clause, T23-1's parity clauses, T24-1 – T24-3, T26-1 – T26-3, T27-1, T27-2, T29-1 – T29-4, T30-1, T30-2, T30-4, and §13.7's item-24 and item-30 thresholds confirmed or their fallbacks applied; S10b's scoring measured on B-CITY-lite and, if its pooled p50 exceeds 53 ms, restated with §12.3's p50 column (§12.4, J-A16.81); of amendments c, d and e's bars (§13.2): T44-1, T57-1, T77-1's weight clauses, T70-6, T72-9 but its dossier clause, T88-2, and the owner-rule bars of items 63 (placement and the public views), 68 (the day model, the GPU pass within §13.4's tolerance of the CPU reference), 70, 71 and 72 (at generation) | 42–55.5 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3), the water operator in §4.11's order with course-knot edits (§7.3 (b)); point-anchored records under a warp (§7.4); the carve edit with §4.11's way rule and the kernel's clear regions (§3.3); the `packs` block and the pack and host-content link refusals (§2.9, §6.4); the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4)) with their renames stored in the events and carried by `confirm`, the dormant naming record of a protected name and field slices; the version-pinned checks of a rebased base across an upgrade and of a frozen view; packs held by a saved redo stack and packs a new version stops shipping; GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools; **amendments b at M3a:** assignments through the solver after generation, the designation mutator with its record and inverse, `Use` with hand relocation (§4.7, §4.11), the dossier contract — dossier-backed existence, rejection, positive placement, the disruption budget and report (§7.7) — the wealth-ladder edit kinds `relet`, `densify`, `thin` and fusion and splitting as least-disruption re-cuts (§7.1), `relet` reading the household capacity M2b builds, every edit that lowers a capacity re-homing its excess by §4.7's overflow pass inside the edit (§2.6), and a dossier household's housing re-provided in its district (§4.7), and the interior ladder's rows (§2.6), sealing and opening a passage and the terrain-water conversions applied by hand; the plan rung's base hooks — its records, its `elaborate` view key, its `plan.*` concerns, its events and rung re-rolls, the elaboration cache (§2.6 beside §2.8's record, §2.9's cache, §6.1's streams and §7.1's events); the knowledge filter, key and reader with the exports' withholding (§9.2, §11.1–§11.3), `report.changed` (§11.3) and `live.stale` (§8.2) (≈ 7–8 pw); **amendments c, d and e at M3a:** a concealed use's parts filtered and withheld (item 63); the closure rule (§7.3 item 9) with its first base instance, a concealed front's missing concealed door (item 63); the "dossier-owned" refusal and item 20 (h)'s coherence rows; the port's absorb half — the diff against carried facts, `DossierChange`, the dating rungs, the receipt tables, re-binding on receipts, the epoch cadence, a host undo's convergence, `Assignment.state`'s behaviour, named-feature targets and the `notice` pin, bridge correlation, the SettlementForge iframe configuration, per-export display names and the audience table (item 85 (b), (d)–(f)), and item 88's staged records schema-complete and empty (§2.7) (items 74–88); item 101's T2–T8 with the sugar events and the points forms, the skeleton file, the underlay and the clerk's tool API (≈ 4.5–7.5 pw) | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 item 7 (v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; the carve fixtures of §13.1–§13.2 (§3.3's clear regions), or §3.3's pre-decided fallback applied before exit; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them, and one forced load mismatch settled by an owner's keep of the saved town while two editors edit on the replayed town — one digest, 0 lost accepted events; §11.3, §2.9 step 4); the naming-input fixtures of §13.2, in a fresh and in a rebased document (§6.3 case (4)); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; a kept-and-rebased CITY document upgraded across a field-driver change opens editable and replays to the session's digest, and a frozen o(N−3) fixture shows no mismatch message; a document using a pack the new version stops shipping reopens after `from` leaves the window; GeoJSON loads in QGIS with districts; the GeoJSON with trees byte-identical on the five engines (§13.3); the warp cost measurement — a 150 m brush over a CITY core on B-CITY-lite seeds, Apply within §12.6's budget with §2.6's wing carry and check counted, or §12.6's pre-decided fallback (one check after the final step, F-REDERIVE for a failure) applied before exit; of amendments b's bars (§13.2): T16-3, T17-1, T18-1 – T18-4, T20-1, T20-2's dossier-event clause, T20-3 – T20-5, T20-6's refusal clause, T19-4's dossier clause, T22-1 – T22-4, T25-1, T28-9, T28-11, T28-12's `wings` clause, T28-16, T28-17's housing clause, T28-18's `relet` and re-homing clauses, T30-3, T30-5, T31-1, T31-4 – T31-7; of amendments c, d and e's bars (§13.2): T75-1 – T75-5 on the absorb pairs, T81-2's absorb clause, T85-3, T72-9's dossier clause, T76-1's cadence clauses on the port's `EpochInputs`, the owner-rule bars of items 20 (h) (the refusal and the coherence), 63 (the knowledge filter) and 66's concealed-door instance (T66-5), item 101's elegance bars (J78's fixture authored three ways) and the second session of its first-five-minutes test (§13.4) | 27.5–35.5 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2); **amendments c and e at M3b:** the night view in every family, the placed lights by their rule table and the exports' lights (item 68); item 101's T11 leader-line switch and region groups and T12's furniture, with every export's declared, derived and clerk-proposed provenance (≈ 2–2.5 pw) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2); the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1); of amendments b's bars (§13.2): T29-5; item 68's night bars (every street class × band at its target minimum brightness, hidden plots unlit) and its exports' lights; the lit-street warp fixture (§13.2's B-EDIT; J-A68.73) but its tunnel, access-point and Works clauses | 18–23.5 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit, every default cell's `ref:` source and every extension's `extension` marker included (§7.6, §17.1 (6); item 23); **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`; §4.11, D-25); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (§13.6 (8)); **amendments b at M4:** the staged engines' hooks — the decline table, the salvage ledger and the dwell lag, the regrowth-first siting order on the grow path, the tunnel and island conversion kinds with the underground tools `drawTunnel` and `placeAccess` (§7.1), S7b (5)'s island count draw and sky allocations under II.6's supply law, the terrain-water kinds, the due mark and the wealth ladder table, the floor's attributes with their migration, the lapse of a rejection at an epoch and the relocation of a dossier-backed use inside an epoch (§4.11's *Dossier content across epochs*, J-A20.43) — with their hook tests (§4.11, II.6 and II.7, with the migration of §7.5) (≈ 2–3 pw); **amendments c and d at M4:** the underground layer's hooks — basement accesses with their state and knowledge, the systems' records and parts, their links, the undercity's rung bound and `raiseGrade` (items 64, 65), `addUndergroundAccess` with its closure generators (the basement's requested-mode ladder of §2.6 the first) and its staged-layer refusal (item 66; §7.3 item 9 (d)) —, the Works record, `WorksTable`, the week and the stage drawing rows applied by hand (item 67), the character's recomputation, renames past the hysteresis and the pressure at an epoch (item 72), the lapse past the roster tolerance and the rung read at each epoch (items 76, 81) (≈ 3.5–4.5 pw) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets (§13.2); METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people; "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release; every table value replaceable with provenance; of amendments b's bars (§13.2): T8-1 – T8-7, T10-1, T11-1, T12-1, T15-1, T17-2, T17-3, T20-2's epoch clause, T20-6's epoch clause, T31-2, T31-3, T31-8 – T31-12; of amendments c and d's bars: the hook fixtures of items 64, 65, 66 (T66-1 – T66-4) and 67 and 72's epoch clauses, T20-2's tolerance clause, T76-1's per-year clause, T68-9, T65-7's sky-island clause and item 81's frame growth (T81-1), and the lit-street warp fixture's tunnel, access-point and Works clauses | 16.5–23.5 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (§15.2); one hour for 50 000 people ≤ 50 ms (§12.7); a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` family at all four bands (§8.2); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (twenty pairs over the four templates, §13.6 (2)) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated | 14–18 pw |

**Effort, with its basis (D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes; amendments c–e: the geology flag's S0 draw and S1 resolution and the relief toggle's S0 pick (item 65; J-A65.02) absorbed |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 12–16.5 | neither reference has it; amendments b: the `Use` record and hand relocation, the plan rung's base hooks, the wealth-ladder edit kinds and the regrowth-first order of the grow path (+2); amendments c–e: the closure rule and the access edit (item 66, +0.5), the sugar events, the points forms and declared-means-held (item 101, +0.5–1) |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 7–10.5 | one drawing path; no second backend; amendments b: the `states` rows, the entrance-tick and arch-glyph rows and `live.stale` (absorbed); amendments c–e: item 68's lighting model — the day model with the cursor sun, the CPU reference light pass, its GPU accelerator and the fallback ladder (+2–3), the night view in every family (+0.5–1) —, item 101's leader-line switch and region groups (+0.5); items 54's class ratios and 55's horizontal spine absorbed |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 9–12 | §11; amendments b: the knowledge key and filter with the reader's and every export's withholding, `report.changed` (+1); amendments c–e: the host-input contract made concrete by the dossier port (+1 at M1, +0.5–1 at M3a), the skeleton file and the clerk's tool API (item 101, +0.5–1), the exports' lights (item 68, +0.5), a concealed use's parts withheld (item 63, +0.5) |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 13–20 | new in both references; amendments b: the designation templates and the compatibility table, the band set, the entrance set and basements, exposure, the hidden shares and passages, and O14-core's farmland modes, fuel and timber rows and arable reserve (+3–4); amendments c–e: informal clusters (item 70, +1–1.5), the class mix inside a band (item 71, +0.5–1), the district character, identities, dials and band range (item 72, +1.5–2.5); the plot, wall and field rules read in code (items 42–47, 57) absorbed |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 10–14.5 | forms tuned by eye and the D-5 panel; amendments b: the one placement solver with its relation and supply data, the designation mutator, the dossier contract (+4–5); amendments c–e: fronts and concealment in the solver with the cover rows (item 63, +0.5–1), `factTier`, the derivation index and the refusals (item 20 (h), +0.5–1), the port's absorb half on the dossier contract (+1–1.5) |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 10.5–14.5 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols; amendments b: the parity presets and the marker on every default cell, the relation templates', room programmes' and interior ladder's rows (+1); amendments c–e: the `ink` palette on the owner-opened targets (item 69, +0.5), the light rows (item 68, +0.5), the dossier vocabulary's class rows (the port, +0.5) |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 8.5–12.5 | no reference line covers it; amendment e: the twelve tools with the ghost, the count badge, the variations and first-use hints, the handles and the underlay (item 101, +1.5–2.5) |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 9.5–13 | §13; amendments b: the hook, B-PLAN and underground fixtures and the parity-preset run (+1); amendments c–e: the dossier fixtures and B-DOSSIER-lite (+0.5–1 at M1), the absorb pairs (+0.5 at M3a), the toolkit's elegance fixtures and first-five-minutes sessions (item 101, +0.5); the bars of items 33–62 absorbed |
| mechanisms the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine; the six components below) | 12–17 | 5–7 for the first group; 3–4 (≈ 14–22 working days) for the six components itemised below; amendments b: the transient arena and the M4 hooks (+1–2); amendments c–d: the underground's hooks (items 64, 65, +1–1.5), the Works record with its table, week and drawing rows (item 67, +1–1.5), the character at an epoch (item 72, +0.5), the lapse threshold and the rung at an epoch (items 76, 81, +0.5) |
| **base subtotal (M-1 – M4b)** | **171.5–230.5** | |
| stage 2 (M5) | 14–18 | |
| **total** | **185.5–248.5** | equal to the milestone sum above (J-A16.01; J-A63.05, J-A73.05, J-A101.05) |

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
**Amendments c, d and e (2026-09-27 to 28) are priced the same way** — +19.5–28.5 pw itemised in the lines above:
the owner's rules of items 63–72 and 20 (h) +11.5–17 (item 68's lighting model 3.5–5 of it; J-A63.05), the dossier port
of items 73–88 +4.5–6 (its plan's line-by-line estimate; J-A73.05) and the authoring toolkit of item 101 +3.5–5.5
(J-A101.05) — carried by the milestone rows M1 +2.5 / +3, M2a +1 / +1.5, M2b +6 / +9.5, M3a +4.5 / +7.5, M3b +2 / +2.5 and
M4 +3.5 / +4.5 pw, so the rows still sum to the total. The code-reading items 33–62 restate mechanisms the lines already price
— each one a rule, a row of a table or a test within a stage the design already has — and add nothing. Their staged parts — the
underground systems' engines, the evolution engine that schedules Works, the port's host wiring and the realm block's
supply, the behaviour of item 88's staged records, the built-in clerk and plots on a bridge deck — are not priced, by
the roadmap.

The cuts that would shrink the total are recorded for the owner's veto, not applied (J-S6, D-20): the module M4b
(8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the should-have
"full" tiers (4–6 pw) — together a base of ≈ 154.5–202.5 pw and a total of ≈ 168.5–220.5 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a; §3.7's pre-decided fallback); the straight
skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's re-pricing is the warning);
the thin CITY budget headroom (§12); the lighting pass's frame budget under a moving cursor sun (M2b; §8.4's fallback
ladder answers it); the D-5 protocol's dependence on the owner's time (§13.6 (7) answers it: an unrated panel never
stops the build and never lets a gate be claimed).

**Staged by the owner:** the subjects the owner's roadmap places after the base — stage 2 at M5 above, the others staged
by the owner — each with concrete hooks, are the one list in *Staged by the owner's roadmap*; nothing else is out of
scope — CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted service (§11.5),
setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier is a base program (§8.2); amendments b's staged engines — the evolution engine's trigger and durations, the
sewer and underground stages, the plan rung and SettlementForge's dossier mapping — are on that list, their hooks priced above;
so are the staged parts of amendments c, d and e named in the pricing paragraph above.
=== J-ROWS ===
| J-A81.01 | a dossier above the 120 000 cap refused by the port — `E_RUNG_UNAVAILABLE` naming the cap, at creation and at every absorb, nothing absorbed — while a request that carries no dossier is clamped to the cap; the bar T81-2 | §7.7 item 15, §1.1, §14 |
=== RATIONALE-A ===
| J-A81.01 | Chose to refuse a dossier whose population lies above the 120 000 cap — `E_RUNG_UNAVAILABLE` naming the cap, at creation and at every absorb, nothing absorbed — and to keep §1.1's clamp to the cap for a request that carries no dossier, over clamping a dossier as a request is clamped, because a dossier's population is a dossier fact that a clamped town would contradict, the reason the owner's ruling gives at the floor (J80 Q3; J-A81.71) holding at the top as well, and over raising the cap for a dossier, because the cap bounds the lattice's coordinate range and every budget law (§3.2 (1), §12); SettlementForge's pinned line never produces the case at birth — its metropolis band ends at 100 000 (`research/sf/mapping.md`) — so the refusal guards a dossier's growth over its epochs and hand-made digests, and the bar is T81-2 (§7.7 item 15, §1.1, §14, D-33; item 81; repair r1, VSC-21; repair r2, VD1-01). |
=== END ===
