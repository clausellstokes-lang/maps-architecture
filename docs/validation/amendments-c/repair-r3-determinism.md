# repair-r3-determinism — lane amendments-c/repair-determinism-r3 (DETERMINISM part: §5, §6, §7): block file per the
# BLOCK PROTOCOL. Text before the first "=== " line is ignored. The lane's report, ledger and receipts are
# docs/validation/amendments-c/repair-determinism-r3-report.md.
# Base: docs/ARCHITECTURE.md sha256 3daa0b0731b8c76f… and docs/ARCHITECTURE-RATIONALE.md sha256 bfa20419ca4dd6e5…
# (assemble-r2's output, the state validate.md judged). Each REPLACE body is the live subsection with count-asserted
# substitutions (scratchpad rdc3/specs.py through rdc3/compose.py); every untouched line is verbatim.
#
# ASSEMBLER HAND-OFF
# (1) RESTATED ROW. The J-ROWS and RATIONALE-A blocks carry one restated row under its existing id, J-A68.73 (index and
#     Part A; VD2-01). apply-blocks.py appends it and notes "DUPLICATE ID inserted"; move the appended row into the older
#     row's place and delete the older row, so one row per id remains (assemble-r2-handoff.py step 1, swap_restated). No
#     new id.
# (2) SCRIPTED POINTER SUBSTITUTION (VD2-03). After every repair-r3 block file is applied and the restated rows are
#     swapped, run docs/validation/amendments-c/repair-determinism-r3-handoff.py on the document. It replaces the 25
#     '§7.7 item 2' pointers that mean §7.7's input layer 2 (the circumstance slices) with '§7.7 layer 2', and
#     "§7.7 item 1's outcome targets" with "§7.7 layer 1's outcome targets" — each by a context string asserted to occur
#     the stated number of times inside its named subsection or index row — and then asserts that every '§7.7 item 1' and
#     '§7.7 item 2' left in the document is one of the known dossier-contract pointers (14 of item 2; 11 of item 1 and
#     'items 1', one of them wrapped across two lines at §2.9), stopping and naming any other so a new ambiguous pointer cannot land. It never writes in place.
#     This file's §7.7 block states the convention at its home (layers cited as 'layer n', the contract as 'item n').
# (3) This file REPLACEs §7.4 and §7.7 — both determinism-owned. At write time the other r3 block files on disk replace
#     §2.7 and §2.9 (model); §4.6, §4.7, §4.11, §10.2 and II.7.6 (pipeline); §0.2, §13.2, §13.5, §14, §15.1, §15.2 and §16
#     (scope) — so no heading is replaced twice. The hand-off's contexts in §2.7, §2.9, §4.11, §10.2 and §14 are text those
#     seats keep verbatim (checked on a combined copy of all four r3 files; report).
# (4) CROSS-PART HARMONISATION (in the hand-off script, guarded). Scope r3's §13.2 lit-street warp fixture quotes an
#     earlier draft of this file's door-light wording ('keeping its fraction along the footprint edge it stands on'); the
#     landed §7.4 and J-A68.73 read 'its fraction of the footprint ring's edge it stands on' (reworded to clear a C3
#     3-gram mosaic). The script substitutes the landed wording in §13.2 when the draft phrase is there once, and skips
#     and logs when scope has already changed it — the same rule, one wording, no C3 hit.
# (5) DOCUMENT CHECKS. On a copy with this file applied, the row swapped and the hand-off run, doc_checks --sections over
#     every touched key shows no unreviewed hit this file or the hand-off adds (counts in the report); no allow row is
#     needed.

=== REPLACE ### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8 ===
### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8

**Replay semantics.** The log is an **ordered fold**: each event applies to the state its predecessors produced,
through the same code path interactively and on replay; nothing is hoisted, and epochs, rebases, upgrades, undo and redo
are events like any other. **The one read-ahead** is the creation prefix: the base derivation's S2 reads the log's
`creation` events — the blueprint's and the creation dossier's `assign` events at positions 0…k (`EditBase.creation`,
§7.1) — as fixed rows before it runs, and each stage reads a skeleton's drawn declarations there as its constraints
(§4.1, item 101; J-A101.41), and folding those events afterwards records the generation run's placements and
places nothing a second time (§4.2; J-A22.41, J-A22.72, J-A22.74). A `creation` event belongs to the base derivation
it feeds, not an edit of the map it made: it is never an `undo`, `redo` or `revert` target — the undo key and `revert`
skip it, and an `undo(h, of)` naming it returns F-EDIT offering `unassign` for a blueprint assignment and `rejectSite`
and `placeAt` for a dossier element (§5.2) — and it is never truncated. A blueprint assignment is removed by
`unassign` (§7.3 item 8's mutation), a skeleton's declaration by a later declaration or a `delete` (§7.1's toolkit), a
dossier element only by a dossier event (§7.7 item 2). Every later dossier event (`EditBase.dossier` set, §7.7 item 1) is likewise no `undo`, `redo` or `revert` target of a map event: `revert` skips it, and an `undo(h, of)` naming it returns F-EDIT offering `rejectSite` and `placeAt` for each dossier element it placed or re-designated (a dossier `unassign` leaves none to offer); an `epoch` that carried one in `EpochInputs.dossier` is refused as an `undo` target the same way, because undoing either would change dossier content without a dossier instruction (item 20 (c)). In the table,
"case (4)" means the event runs §6.3's case (4) for the name it frees or whose inputs it changes, the rename listed,
confirmed and stored in the event (§7.3 item 4).

| kind | create | read | persist | regenerate (how the engine honours it) | undo | migrate between output versions |
|---|---|---|---|---|---|---|
| lock / unlock / pin / unpin | UI or API on any address, optionally on attribute paths | entity `flags` (derived from the log) | log | a fixed input; dependants re-derive around it; a lock on a name path keeps the naming record dormant (§2.8); an `unlock` that frees the name runs case (4) | inverse event; undoing a `lock` that frees a name runs case (4); an unlock that re-drew a name keeps the former name and naming record in its undo record, which its undo restores | address mapped (§7.5); an orphaned lock re-imposes its last geometry as a drawn constraint unless the user drops it |
| setAttr / setAttrMany / paint | UI / API; a bulk query resolved to ids at dry run | entity attributes; `flags.edited`, `editedPaths` | log | an input override at the stage that computes the attribute (a name: S13a keeps it and never re-draws it while edited, its naming record dormant; a district kind: S6 reads it as fixed; heights and roof: S11); implicitly pinned (§7.2); a plot's `tenure` and a district's `identity` are overrides of derived values, kept until reverted (items 70, 72); a change of a front's designation runs S11's mutator on the front, the concealed use persisting and its concealed rooms re-fitted (item 63); a `setAttr` of a dossier-owned value never reaches the fold — its dry run refuses it (§7.1) | inverse (old values in the undo record); undoing or reverting a `setAttr` on a generated name returns it to unedited with its dormant naming record and runs case (4), the text it replaces kept in that event's undo record; a `setAttr` of heights or class that re-homed households keeps their former buildings in its undo record, which its undo restores (§2.6) | attribute names schema-versioned with a rename table; unmappable → orphan, reported |
| moveVertex / warp | vertex handle, stored as lattice point + role signature / staged warp session with Apply (§7.1) | geometry | log: the operation (arena key, strokes, `fromLevel`; a `moveVertex`'s `at` with its `VertexSig`); per-vertex displacements only as a verification record | the kernel's whole-step validation, halving, sliding and holding (§3.6); kernel-pinned vertices move (pins constrain smoothing, simplification and cutting); what stands on the ground is carried and re-based (below); moved water goes to S1's water operator (§7.3 (b)) | undo record: moved vertices, re-derived faces, the former birth levels and flags of promoted and demoted vertices and edges, the former points of displaced records, former wing rings, basement rings and stored compositions, former bases of re-based entities, and the households §2.6's capacity rule re-homed, with their former buildings | the operation replays at its log position; a `moveVertex` binds by `resolveVertexAt` — the exact point, else a signature match within the rebind radius, else orphaned and reported |
| moveCourseKnot | dragging a river's control knot | `WaterBody.controls` (§2.3); the knot's path `controls/<ordinal>` in `editedPaths` (implicitly pinned, §7.2) | log: the water body's address, the knot's ordinal, `at`, `to` | S1's water operator (§7.3 (b)); every later re-trace keeps the moved knot | undo record: the replaced scope of the whole chain and the knot's former position | once the water body's address is carried (§6.3), binds (1) the knot with that ordinal if within the rebind radius of `at` — half the body's control spacing (§4.2 S1 (3)); (2) else the body's nearest knot within the radius, ties by ordinal; (3) else orphaned and reported; never a knot of another body |
| drawWay / drawWater / drawWall / drawGreen / drawBoundary | drawing tools with resampling, snapping (first-crossing split, attraction) and validation at the authoring boundary (§7.1); their points forms (item 101) | entities with `existence = built`, author `user`; declared, so held (§7.2) | log (the geometry is the payload — for a points form the shape its dry run derived, stored resolved and never re-derived) | at its log position through its class's local operator (§7.2, §7.3), chained operators included | undo record: the replaced scope of the whole chain | the same geometry replays at its log position under the new version |
| drawTunnel / drawChamber / addLink / placeAccess (items 11, 12, 64, 65; J-A12.71) | the underground tools (II.7; a staged layer, editable in the base) | the `Tunnel` or `Gallery` record and its chain, the `Chamber` record and its outline, the `UndergroundLink` record and its two `link_end` vertices, each in its system's part (II.7.6); the `AccessPoint` record, its `state` and `knownTo` and its `access_point` vertex (§2.7, II.7.4) | log (the geometry is the payload) | at its log position: a drawn tunnel through II.7's network stage (its chain inserted on the underground arena, `navigable` derived) and the underground stage re-deriving the underground blocks its edges bound (§7.3's staged-layers row); a placed access point by II.7.3's access rules, its ground host found by `pointLocate` on the ground's `PlatKey`, nothing on the ground written; a gallery or chamber through its system's stage on its own part, and a link between its two parts' vertices, one part per batch (§3.4); an access point's underground end moves by `moveVertex` on its `access_point` vertex and its opening by `setAttr` on `ground.at`, re-hosted the same way and refused as F-EDIT outside II.7.3's admitted ground (§7.1) | undo record: the replaced underground scope; a moved opening's former `ground.at` and `host` | the same geometry replays at its log position; an access point whose element is unmapped is orphaned and reported |
| addUndergroundAccess (item 66) | a building's context action (§7.1); the API | the `AccessPoint` and the pieces of its closure; the event's closure record (`EditBase.closure`) | log: the building, the optional target and kind, and the closure record | at its log position, the closure's generators in dependency order (§7.3 item 9); its pieces held while it is live (§7.2) | undo record: the created pieces removed and what they replaced restored, the reused pieces untouched, a created basement back to its former state; a later `delete` of the access removes only the created pieces nothing else uses (§7.3 item 9 (c)) | replays at its log position; an event whose building is unmapped is orphaned and reported |
| placeGate / quarter / roster / group (sugar, item 101) | the authoring tools (§7.1's toolkit), the clerk's tool API (§11.2), a skeleton file (§11.1) | the entities its expansion made; declared, so held (§7.2) | log: the sugar event itself, with its `expansion` version — one undo step, one fate report | expanded at its fold into its events by `sugar.json` at the recorded version (§7.6), what it creates minted from its `seq` (§6.3) | undo record: the whole expansion's scope, as one step | the recorded expansion version replays; an upgrade whose expansion table changed maps the event as it maps the events it expands to, listed once in its diff (§7.5) |
| startWorks / cancelWorks / setAttr on a Works (item 67) | the Works tools (§7.1); an epoch's step (§4.11) | the `Works` record; its stage at a week derived from it (§4.11) | log: the event with the change it wraps (the epoch's own for an epoch's Works) | §4.11's Works: a `startWorks` folds the change it wraps at once at its position (§4.11 (1); J-A67.72) and creates the Works that shows it — the change of ownership at its start and the stages derived from the record and the week; a `cancelWorks` ends it by §4.11's rule | undo record: the wrapped change's inverse and the Works record, with the plots and buildings its start changed | the record replays; its stages follow the output version's `WorksTable` |
| placeLight / setAttr / delete on a light (item 68) | the light tool (§7.1) | the `LightSource` record (§2.7) | log | a hand-placed light is declared (§7.2): it survives a regeneration by its anchor — its host's address, rule row and ordinal (§6.3) — and follows its host's lifecycle (§2.8: removed with a demolished host, unlit on an abandoned one); rule-placed lights re-derive with their host's faces (§4.7, §4.11) | inverse; exact | by its host's address; a light whose host is unmapped is orphaned and reported |
| drawFootprint / build / moveFootprint / swapUse / fill | building tools (§7.1) | building and plot entities | log | S11 re-fits the host plot(s) with the footprint as a fixed slot; `fill` re-runs S11 on its scope with the forced arrangement | undo record | replays; a footprint whose host plot is unmapped re-creates a plot around it |
| delete / merge / split / join / convert (incl. the ladder kinds — `relet`, `densify`, `thin`, `subdivide`, `amalgamate` —, the decline kinds, the tunnel and island kinds, the use kinds, the sealing kinds, the terrain and water kinds of §4.11 and the underground layer's `flood`, `raiseGrade` and `clearUndercity`, II.7.5–II.7.6) | context actions; the evolution engine's plan (§4.11) | lifecycle events with cause | log | structural ops on the plat (§3.4): a district or way `split` / `merge` with dependants re-derived; a plot `join` or `split` is item 31's fusion or splitting — S10 (7)'s re-cut of the members with their neighbours fixed, S11's mutator on the result, no occupied building removed unless confirmed (§7.1, §7.3 item 8); `convert` = `retypeEdges` plus lifecycle events; decline conversions change `existence` and the drawing (§2.8), credit or debit the material ledger (§4.11), and a `reuse … build` succeeds at the trace's address (§6.3); tunnel conversions change the tunnel's `existence` and `closure` (its condition reads them, §2.7; J-A11.21) and close or reopen the frontage plots on the run (II.7.3); island conversions resize an arena or archive it (`fallIsland` lays the ruin face through the carve path, §4.11); use conversions open, close or relocate a `Use` (§2.7) with `detail.from` / `to` and mutate the buildings by S11; `relet` sets a building's household count within §2.6's capacity (item 28 (f)) — households added are minted from the event, households leaving go by item 17's relocation (§4.11, §10.3) —, marks an unstored plan stale and re-cuts a stored one inside the event (§7.3), no shell geometry changed; `densify … infill` and `thin … infill` add or clear yard buildings by S11's mutator; `densify … back_court` and `thin … back_court` re-cut the plot's yard by S10 (7) with its neighbours fixed, adding or removing a rear row and its passage face (§4.6, §4.11); `subdivide` and `amalgamate` are rung 3's re-cuts, whose hand forms are §7.1's plot `split` and `join`; `sealPassage` / `openPassage` set `Passage.sealed` (§2.5), change no geometry, and vacate or reoccupy the plots behind it (§4.11; item 30); `siltReach`, `shiftCourse` and a foreshore's `reclaim` run S1's water operator (§7.3 (b)), a marsh's `reclaim` its terrain operator (§7.3 (a)), and `digCanal` is the carve (§4.11); a split or join of a chain carrying a profile (a way's width, a wall's base, a tunnel's invert, a shore's bank kind or class) goes through `retypeEdges`' `rekey` on the part's `StretchRef` (§3.4) — each part gets a cut knot carrying the sampled value, a join knot is dropped only where the joined profile is unchanged (§2.2 rule 5) — and the event writes both records' returned profiles | undo record: members resurrect with their former rings, records and `builtBand`, tombstones return to live, both records' former profiles; a decline or tunnel conversion's former state and ledger rows; a fallen island's arena restored from the archive and its ruin face removed through the carve path's inverse; a `reuse … build` undo returning the address to the trace; a use conversion's former use and building links; a `relet`'s former count, household links and stored plan; a ladder conversion's former rings, records and passage face; a terrain or water conversion's replaced chain scope with the records §2.3 lists; a mutation's inverse record | same |
| regenerate / adjust / re-derive from Sk | the named actions on an area, district, block, plot or person | report entry; the fate list | log: resolved scope, mode, absolute rerolls used, confirmed fates and renames | §7.3; New random's content check (§5.1 (6)); a pack-list `adjust` and any re-derivation reaching S13a run case (4) for the unedited names citing a changed slice; `Adjust` re-derives with the current field and sets `builtBand` in its scope, listed in the fate report, while Regenerate (keep settings) keeps it (item 31) | undo record: the effective scope's faces, entities (names and naming records included), lifecycle events and tombstones, O(scope) — an undo restores the former names, never re-draws them | the scope replays; fates and renames recomputed and compared under §7.3 item 4's rule |
| assign / unassign (a dossier event among them, `EditBase.dossier` set) | assignment dialog / host API / the host door (§11.4) | `assignment` fields, `flags.assigned`; a dossier-backed assignment's `existence: 'dossier'` (§7.7) | log; blueprint and dossier-at-creation assignments at positions 0…k, flagged `creation` and read ahead by S2 (Replay semantics, above) | §4.7 S10b places (claims-first at positions 0…k, the least-disruption order after the city is built) and §4.7 S11 mutates each placed plot, the record in `EditBase.mutations`; an assigned name keeps the naming record dormant; an `unassign` leaves the plot vacant (`closeUse`, §4.11) and frees the name, which runs case (4); a dossier-backed element's existence is held (§7.2) | the inverse mutation from the undo record (§4.7 S11 rule 5) and the former placements — for an event that is neither a `creation` event nor a dossier event, which are no undo targets (Replay semantics, above) | addresses and criteria; unmapped members re-solve around the mapped ones (§7.7); a dossier element re-binds by its `DossierRef` |
| rejectSite / placeAt (item 20 (b), (g)) | the map's "delete" of a dossier-backed element; the "make this place X" action | the rejection record and the plot's pin (§2.8, §7.7) — model data | log | `rejectSite`: the element is re-placed by §4.7 S10b's solver at the event's position and the site is excluded while the rejection holds; the hold lapses — the site eligible again — by §7.7's lapse rule (item 3), the lapsing event writing the lapse into the record inside its own touched set, never as a log event of its own (J-A20.74); `placeAt`: the plot is pinned to its element or designation, honoured by every later placement and re-application that can, reported when one cannot | inverse (`lift`); the re-placement's scope restored from the undo record; an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event, or an epoch that carried one, returns F-EDIT (Replay semantics, above) | by the site's and the element's addresses; an orphaned rejection or pin is reported |
| setEntrance / setAttr(basement) (item 29) | building tools (§7.1) | `Building.entrances`, `Building.basement` (§2.6); `editedPaths` | log | edited attributes: a moved main entrance and an added, moved or removed door are fixed inputs of the site plan, carried with the wing (§2.6) and re-fitted around by S11's mutator on a designation change — a house that becomes a shop gains its street door, a shop that closes keeps its door as a house door (§4.7 S11); an edited basement is kept through terrain changes (§7.3 (a) 4) | inverse | with the building's address; an entrance whose wing is unmapped is re-placed by §2.6's rules and reported |
| drawPassage / sealPassage / openPassage / setAttr(knownTo) / setAttr(reach) (item 30) | context actions on a plot, a block, a building or an institution | the passage face and its `Passage.sealed` bit (§2.5; an access row on a sealed passage face reads sealed), `Block.reach`, `Plot.knownTo` / `Building.knownTo` / `Institution.knownTo` | log | the passage face and the rear plots' access rows are fixed inputs of S10's re-cut; an access row on a sealed passage is skipped by §5.3's reachability walk and the plots behind it decay as vacant under §4.11's ladder; a `setAttr` of a block's `reach` re-derives its interior by S10 (7)'s re-cut with its neighbours fixed (J-A30.72); `knownTo` is read by §9.2's label policy only — no model geometry changes; a `knownTo` the dossier set is dossier-owned and a map `setAttr` of it is refused (§7.1, §7.7 item 7; J-A20.77), and a dossier event that sets one writes it as any dossier fact | inverse | by address; a passage whose building is unmapped is reported |
| plan events (setRoomRole, moveWall, splitRoom, mergeRooms, setOpening, setWindow, moveStairCore; item 28; setRoomUnit, item 28 (f)) | the plan tools on the building band (§8.5) | the stored composition's plan (§2.6); a room's `unit` (§2.6) | log; the first plan event stores the composition (§2.6) | a fixed input to the rung's re-derivation — a stored plan whose inputs change is re-cut inside the changing event around the edited rooms, as any edited attribute is (§7.2), from the stored plan as its canonical prior (§7.3's table); an edited unit is kept while its household still lives in the building and listed as a fate when it leaves; `carryWings` carries the rooms with the wings | undo record: the former storey | by the building's address and the room's anchor (§6.3); else orphaned and reported |
| regenerate with `rung` (item 28) | New random on one elaboration rung | the rung's counter (§6.1; the event's map under `<building id>#<rung>`) | log | the rung re-derives with its advanced counter under §5.1 (6)'s content check, which compares the rung's own derived result, identity left out (an unstored rung is outside every digest, §6.2); re-rolling a finer rung changes no coarser stream (§6.1): `plan.layout` keeps the wings, entrances and stair core, `plan.roles` every wall and opening position | the previous counter; the rung's cached result is recomputed, never stored in the record | replays |
| `builtBand` (a plot attribute, item 31 — not an event kind: its paths) | the writers §4.11's floor paragraph lists (J-A31.44) | §4.11's ladder; S10 and S11 through the manifested band `max(field band, geometryFloor)` (§4.7 S10 (2), S11) | the plot's attribute columns (§2.9), in the leaf digest | Regenerate (keep settings) keeps it; `Adjust` and a brush reset it in their scope (authorial, §7.2; J-A31.72); an epoch writes it only through §4.11's writers — a rung-3 event, rung 2's back court for the new rear plots it creates (which take their stock's band), a completed upward refurbishment (which raises it) — so a standing plot's `builtBand` is lowered only by a rung-3 event | restored by the undo record of whichever event wrote it | a document written before the attribute existed gets `builtBand` = the band its plot's `DerivationRecord.band` holds (§7.5) |
| `fieldBand` (a plot attribute, item 28 (f) — not an event kind: its paths) | every derivation that reads the current field (generation, `Adjust` and a brush's re-derivation past τ among them) and the epoch's re-banding after S6 (§2.5, §4.11) | §2.6's interior ladder, `ClassRules.pick` and the plan rung's recorded inputs (§2.8) | the plot's attribute columns (§2.9), in the leaf digest | Regenerate (keep settings) keeps it; `Adjust` and a brush set it in their scope; an epoch re-bands it | restored by the undo record of whichever event wrote it, an epoch's among the entities it replaced | a document written before the attribute existed gets `fieldBand` = the band its plot's `DerivationRecord.band` holds (§7.5) |
| setField (brush) | prosperity / density / greenery / terrain brush; the terrain brush's `water` mode (§7.2) | the stroke list; the composited field or heightfield | log (strokes) | field strokes: blocks whose inputs moved beyond τ re-derive (§7.2); terrain strokes: S1's terrain operator (§7.3 (a)), in `follow` mode with the water operator; a brush is authorial and sets `builtBand` in the blocks it re-derives (§7.2) | the stroke leaves the list; the field or heightfield re-composites (exact) and the operator re-runs on the stroke's region; the households §2.6's capacity rule re-homed restored to their former buildings from its undo record (§2.6) | strokes are geometry and replay |
| editTable / editPreset | tables editor, presets dialog | the override layer (§7.6) | log: row operations by key with the base row's hash; the fallback's confirmed fates; renames | entities whose derivation record, naming record or provenance cites a changed slice hash re-derive; a changed naming slice runs case (4) for exactly the unedited names citing it; a predicate table, or a kind whose recorded slices are unavailable, re-derives from the table's first reader stage with fates (§7.6) | inverse row operations; the re-derived entities — renamed names with their former naming records among them — restored from the undo record, never re-drawn; the households its capacity re-homing moved restored to their former buildings | a row that changed or vanished in the new table version → orphan, reported and kept |
| instance (and the tree brush) | tree tools (a batch of `instance` events), instance handles | the entity's instance set with its overrides | log | applied by ordinal while the entity's lineage is unchanged since the event (no `carry` or supersession after its `seq`) and the ordinal's generated position lies within 0.5 × the spacing of the recorded `point`; otherwise re-matched by position to the nearest unclaimed instance within 0.5 × the spacing (a superseded entity's overrides move to its `supersededBy` successor), else orphaned and reported (§8.10) | inverse | ordinals are geometry-stable only under the same lineage; otherwise re-match by position |
| rerollLayer | "reroll names / trees / decoration / compass / emblem" — §6.1's rerollable concerns; names also on chosen entities (`ids`) | the effective salt: the recipe's initial value set by the log's town-wide `rerollLayer` events; for an ids-scoped naming reroll, the per-entity salts in the event | log: absolute salts (with `ids`, those used after §6.3's case (3) advance) | naming: S13a re-draws every unedited name (town-wide) or the listed entities' unedited names, uniqueness by §9.6; instances, crowns, jitter: display only; compass and emblem: furniture only (§9.5) | the previous salt; for naming, the previous names and naming records from the undo record | replays |
| revert (reset to generated) | ctrl / cmd+click, context action | the entity's own logged edits | log (one event) | the inverses of the entity's own events applied in reverse log order at the revert's position; edits to other entities stay; a name it frees runs case (4) | inverse: re-applies them | follows the entity's address; an event whose target no longer maps is reported |
| moveLabel / hideLabel | label handles; the dry run refuses a placement whose box at its stop meets another pinned label's box there, returning the nearest free position (§9.2) | `LabelEntity.pinned` / `hidden` — model data, in the digest (§6.2) | log | honoured by S13b (§9); the `LabelEntity` exists at the event's log position in session and replay, S13a running per event (§7.3 item 2) | inverse | follows the target address; unmapped → orphan |
| setLayer / setStyle / paintGround | UI, style dialog | style state (canonical, outside the model digest) | log | no model re-derivation; the display list rebuilds | inverse | style schema versioned |
| people: pin, setAttr, lock with paths, regenerate a person | an explicit action or edit only — never viewing | the pinned or edited fields; everyone else is derived | log | pinned and edited people are fixed inputs, re-homed to the household that inherits their household's address (§6.3), else orphans reported (§10.3) | undo record | person-table version recorded per household; person keys map through the household's address; orphans reported |
| closeup (stage 2) | logged before the first edit inside a close-up | the close-up's entities, a refinement level of the district | log (strategy, params) and the edits after it | a pure function of the district's committed state, sub-seed, strategy and params; a base re-derivation of the district re-derives its close-up with carry-over, re-matches presentation `instance` edits by position and reports orphans | undo record | replays |
| epoch | `grow(doc, inputs)` (§4.11) or a circumstance-schedule entry | the derived `EpochRecord`; lifecycle events with cause | log | §4.11's incremental path at its log position: each plot's `fieldBand` re-banded after S6 (§2.5), regrowth-first siting, the survivors' ladder bounded by the geometry floor — its rung-1 `relet` marking unstored plans stale and re-cutting stored ones along the interior ladder inside the epoch (item 28 (f), §7.3) —, the use step, the decline lottery, the island and underground laws; every live rejection is re-checked by §7.7's lapse rule (item 3); a dossier change the host sends with the epoch rides in `EpochInputs.dossier` and is applied at §4.11's step (e), one sent between epochs folding at its own log position (§7.7 item 6; item 22 (e)); the epoch carries its absolute week (§4.11, item 76), the Works it starts are records whose stages the week derives (item 67), and its character step recomputes each district's vector, moves identities past their hysteresis, writes the pressures and renames by §6.3's case (5) (§4.5, item 72) | undo record: the faces and entities it replaced (O(epoch scope)), with the identities, pressures and names it wrote | a multi-epoch document upgrades by replaying the whole ordered log with a per-epoch diff, or stays pinned to its output version |
| rebase | keeping the saved town on a mismatch; Rebuild around my drawings; editing a frozen import — a `frozenImport` rebase, which runs case (4) over every unedited generated name and returns `confirm` with the renames listed (keeping the old model at an upgrade needs none: the document stays at its own output version, §7.5) | the document's base | the base state and the event: `version` names the output version that computed `stateDigest`, `at` the log head the state materialises (`h₀` when the saved town is kept after edits made during load verification, §2.9 step 4); the events before `at` stay in the log (§2.9) | replay starts from the rebased state, checked against its root of record for the replay's output version (§2.9 step 3), and folds the events after `at`; on other clients see *Rebases on other clients* below | the previous base (below) | the rebased state migrates by the schema chain; an `upgrade` checks it under `from` against its root of record and records its root under `to` as `baseDigest` (§7.5); it is not seed-reproducible |
| upgrade | explicit, after the diff (§7.5) | the document's output version | log, with `baseDigest` for a rebased base and the saved packs in its mapping | §7.5: a rebased base checked under `from` and re-rooted under `to`; every pack `to` stops shipping copied into `packs` first; the mapping hands names on with addresses and runs case (4) for the unedited names whose naming slices the new tables changed, listed in the diff; earlier events' fates and renames are recomputed under `to` and their differences listed once in the diff (§7.3 item 4) | the undo record is `upgrade.from`: undo replays base and log before the upgrade under that version — a rebased base checked against its root of record for `from` — to exactly the pre-upgrade digest; in the session the pre-upgrade checkpoint makes it instant; outside the browser's version window the undo is withdrawn there with the CLI command shown | — |
| undo / redo | ctrl / cmd+Z, ctrl / cmd+shift+Z, the API's `undo(h)` / `redo(h)`, a host's `doc.apply` | each event's live or undone status, derived from the log | log (`of`) | after the independence check below: `undo` restores its target's scope from the target's undo record; `redo` re-applies the target at the head, its lifecycle events citing the target's `seq` and its minted addresses the target's own; a result that frees a name runs case (4) | an `undo` is undone by a `redo`, a `redo` by an `undo` (exact inverses) | replays; a target's record is rebuilt under the new version by the replay |
| host provider output | a host-registered provider's answer, after the double-run check (§6.5 (8)) | the document's `hostContent` block | `hostContent`, keyed by (provider id, version, input hash) | read from `hostContent` on replay, never re-requested | removed with the event that first requested it | replays without the host |

**Rebases.** The `rebase` event is a no-op for a client whose base it already is. A replay from the recipe folds an
undone `rebase` and its `undo` as a no-op pair, every event between them being undone (a whole-town event is undoable
only as the latest live event). *Undo:* when the previous base is the recipe — always kept in a rebased base — the undo
restores it and replays the kept log; when it is an earlier rebased state, that state is the undo record, held in the
undo section under its cap; past the cap, or when the replay would need an output version outside the browser's
window, the undo is withdrawn with a notice (the CLI replays any version, §6.4). A `redo` re-installs the rebased
state, which the undo keeps in the undo section under the same cap (past it the redo is withdrawn with a notice).
*Rebases on other clients* of a bridged document: a `keptSnapshot` rebase whose `at` lies behind the client's head and
whose `stateDigest` differs from the client's root at `at` installs the snapshot at `at` from the `doc.load` bytes the
client kept and re-applies the events after `at` through the fold (fates recomputed and differences reported, undo
records rebuilt; §2.9 step 4); one whose `stateDigest` equals that root changes nothing; any other rebase behind the
head (a hand-built log) is a reported no-op; a load whose log already holds a `keptSnapshot` rebase at `model.seq` with
`stateDigest = model.digest` takes `model` as that base without asking.

**Undo and redo are events.** Undo never removes an event from a shared log: a host stores the log and it only grows
(§11.3), so `{ t: 'undo'; of }` and `{ t: 'redo'; of }` are appended at the head and applied through the same fold,
identically by every client and every replay (J-DET-16).
* **Sessions.** A session is an authoring identity **per document and author**, not per app start. `@plat/api` mints
  one (a 128-bit random value in base 32, outside the model packages) the first time an author edits a document and
  reuses it on every later open: an unshared document stores it in its view state (`view.keys['session']`, outside every
  digest, saved with the file, §2.9), so a reload — or reopening the file next week — continues the same undo and redo
  stacks, and a file made without one (by the CLI or from a link) mints it on first edit. A client attached to a host
  bridge takes the session the host assigns in `doc.load` (§11.3) and never writes the view key. The session enters the
  log only as `EditBase.session`; the fold never reads it (an `undo` names its target by `of`), so sessions decide which
  event the undo key picks, never the model (J-DET-34).
* **Targets.** Each session has its own stacks. `undo` targets the session's latest **live** event other than a
  `creation` event, a dossier event or an epoch that carried one (above) — live unless an `undo` targets it and no later `redo` re-applies it; a `group` counts as
  one step and `of` names its first event.
  `redo` targets the session's latest undo whose target is still undone; a new event from the session clears its redo
  stack. An unshared document has one stored session, so its undo is linear and continues across reloads. A session
  with the `owner` role — the app's role for an unshared document — may name any live event (`undo(h, of)`, §11.2),
  which is how an earlier session's events (a file once shared) are undone.
* **Application.** Every committed event keeps an **undo record**: the inverse event when one is exact; otherwise the
  faces, entity records, lifecycle events and tombstones its effective scope replaced, the former birth levels, `split`
  flags and stripped contact names of the vertices it promoted, and the former levels and flags of the vertices and
  edges it demoted or unflagged (§2.2 rule 3; `CommitRecord.promoted`, `demoted`, `unflagged`); and always the addresses
  it created, changed or removed — its **touched set** — so undo costs O(scope), never a copy of the model. `undo`
  restores the target's scope from that record and withdraws the addresses the target minted (§6.3); `redo` re-applies
  the target at the head from its stored, already-resolved payload (scope, absolute rerolls, confirmed fates), so from
  the restored state it reproduces the target's result exactly. An edit whose capacity re-homing moves households (§2.6) keeps in its undo record, whatever its row's undo, the former records of the buildings it moves them out of and into and, where it re-provides a dossier household's housing (§4.7), the plots the re-provision touched (§7.3 item 1) — the site with the residential slot built there, its joined neighbour, each displaced use's new site — and its undo restores them with the households it re-homed.
* **Independence** (the check that keeps undo exact when others have edited since). An undo is applied only if every
  live event after its target is independent of it: the later event's touched set and effective-scope faces are
  disjoint from the target's touched set and from the target's effective-scope faces dilated by one ring of adjacent
  faces at the coarsest level either touches. Otherwise the dry run returns an F-EDIT conflict listing the dependent
  events and their authors; the session may undo its own dependent events first (each its own `undo`), and an owner may
  undo through a chain — never through a dossier event or an epoch that carried one, which are no undo targets (Replay semantics, above), so a target one of them depends on stays live. A `redo` is checked the same way against the live events after its undo. Every client folds the
  same events in the host's order on the same state, so the check has the same outcome everywhere; an `undo` or `redo`
  whose check fails at its log position (possible only in a hand-built log) is a reported no-op, identically on every
  client and on replay. A whole-town event (an upgrade, a rebase, a Re-derive from S1) is therefore undoable only while
  it is the latest live event.
  **Independence through the input layer** (Fable review 2026-09-27; J-Fdet-1). The check above reads touched sets and
  effective-scope faces, which see geometry and records but not the inputs a derivation reads, so it also holds a later
  live event **dependent** on its target when the target changed an input that event's derivation read. For an
  `editTable` or `editPreset`: when an entity the later event derived — one in its touched set whose leaf digest a
  stage, S13a's delta, a re-cut or a rung wrote, which the touched set marks apart from the addresses the event merely
  set — cites, in its derivation record, its naming record or its provenance (§2.8), a slice whose hash the target's row
  operations changed (the slices, recomputed from the target's operations and their base rows by §7.6's slice kinds).
  For an `adjust` — a parameter, a Re-derive from stage k or the pack list — and for a town-wide `rerollLayer` of
  `naming`: whenever the later event derived any entity, because every derivation reads the effective parameters, the
  pack set and the town salt. An `undo` or `redo` whose target is one of these events counts as one. An event that
  derived nothing depends on no such target. So an input change is undone through its dependants, as the chain rule
  above states, or stays; the state after a permitted undo is the fold of the log without its target, and no derivation
  record is left citing a slice the effective tables no longer hold. The check costs the later events' touched sets and
  their records' slice references, kept for every event (Records on other clients, below). *Fixtures (B-EDIT, §13.2):*
  an `editTable` on a heights row followed by a `build` on a plot the edit did not touch, an `adjust` followed by a
  `drawWay`, and a town-wide `rerollLayer(naming)` followed by a scoped regeneration that draws a name — each later event
  is reported dependent, and once it is undone first the target's undo gives the model digest and records digest of the
  log without the pair; an `editTable` followed by a `build` whose derivation cites none of the changed slices is
  independent, and the target's undo gives the digests of the log without the target.
* **Records on other clients and after a reload.** Records are kept for the session and saved in the file's `undo`
  section (the last 64 events or 20 MB, whichever is smaller; rebase and upgrade records as their rows state), so undo
  survives a reload. A client with no record for a target — it joined later, or the record left the cap — rebuilds it by
  replaying from its nearest checkpoint before the target, or from the base, and says it is slow; the replay keeps full
  records only for the events later `undo` events target (found by a pre-scan of the log) and touched sets for all. The
  replay is deterministic, so every client reaches the same state.
* **Truncation, in unshared documents only.** When an unshared document's `undo` targets the event immediately before
  it, the engine may drop both from the log and hold the target on the session's redo stack. A redo then re-appends the
  target with its original `seq` **and advances `nextSeq` by one** — the `seq` the kept log's `redo` would have spent —
  so every later event, and every address a later user-created entity mints from its event's `seq` (§6.3), is the same
  in both logs; the canonical `nextSeq` (§2.9) never moves back. An `undo` removes its target's lifecycle entries and
  tombstones and a `redo` re-inserts them, both citing the target's `seq` (§2.8), so the lifecycle block, the archive
  and the model digest of the truncated log equal those of the log with the pair kept. The truncated target is held on
  the session's redo stack in the saved `undo` section (`UndoRecord.redo`, §2.9), so a redo after a reload re-appends
  it, and the packs it names stay in `packs` while it is held (§2.9's pack set). A B-EDIT property test over random
  sequences folds each both ways — §6.5 (9)'s truncation cases among them — and requires equal model and records
  digests and equal addresses. A document attached to a host bridge never truncates.
* **Checkpoints.** The engine takes a copy-on-write checkpoint (arenas are chunked per district, so it costs only the
  chunks changed since the previous one) whenever the replay cost accumulated since the last one passes 80 ms at the
  session's rung, and before every epoch, rebase and upgrade — so any replay from a checkpoint stays ≤ 100 ms; a load
  that takes §6.2 (iii)'s off-edit-path recomputation also takes one at `h₀`. *Measurement (M2a):* undo of a CITY
  district regeneration ≤ 30 ms; undo memory ≤ 25 % of the model's working set after 100 edits; (M3a) the
  host-and-three-clients convergence test of §11.3 with interleaved undo and redo from every client. *Pre-decided
  fallback:* the saved undo section shrinks to 16 events and checkpoints are taken every 40 ms of replay cost.
* The **enumeration test** checks that every EditEvent kind — `undo` and `redo` included — has an exact inverse or an
  undo record (O9 d). Save → load → save is byte-identical over the canonical form (O9 a).

**Warp and what stands on the ground.** A warp and a `moveVertex` move arena vertices (§3.6). Seven kinds of record
hold a world point instead of a vertex and move with the ground they stand on: `Pin.point` (host: `Pin.host`'s
faces), `Decoration.point` (the L3 face containing it), the current position of a positional `instance` override — a
`move`'s `to`, an `add`'s `point`, and for a `line` layout the recorded generated `point` — held in the model's
override table of its entity (§8.10), a pinned label's `Placement` anchor and spine (its target's faces, or its
target's corridor for a way, §9.1), `LightSource.point` (§2.7, item 68; host: the face its host stands on, on its host's
arena — the footprint face of a building, the half-corridor strip of a way or a bridge, a square's face, a gate's footprint, a
pin's host face, a gallery's band, a chamber's floor, a tunnel's band faces at the junction a junction light marks (its
junction wedge and half-corridor strips), the faces of the underground element an access point's `access_point` vertex
lies on for the light at its foot (a tunnel's strips, a gallery's band, a chamber's floor, an underground building's
footprint), a castle's inner ward, bailey and gatehouse footprint (`Castle.innerWard`, `Castle.bailey`, `Castle.gatehouse`),
a decoration's face (for a point decoration — a wayside shrine's — the L3 face containing the light's point), and for a
hand-placed light on any other entity the face that entity is or stands on (§7.1's `placeLight`); of a host's several
faces, the one `pointLocate` on its `PlatKey` returns for the light's point (§5.3's light row); a door light, which stands
beside its door on the footprint's ring (on the side §4.7's *Light sources* (4) draws), instead keeps its fraction of
the ring edge its point lies on — its new point that edge's two end vertices where the move leaves them, blended at
the fraction its old point had between them before it (the mean-value image of a boundary point; `+ − × ÷` only),
rounded to the lattice — so it stays on the moved facade whether the warp slides or turns it), `AccessPoint.ground.at`
(II.7.4, item 64; host: the ground face its `ground.host` names or stands on — a corridor strip, a square, a yard, a
building's footprint (a basement access's too), an outside face) and the rings and lines of `Works.before` (§2.7,
item 67; host: its target's plot face — the building's plot, or for a join or a split the plot whose face holds the
point). After the kernel's commit the edit layer takes every such record whose host face
has a moved vertex (the commit record's `moved` list, §3.3) and computes its new point from the move itself: the
point's mean-value coordinates in its host face's outer ring before the move, applied to the ring after it (`+ − × ÷`
and `sqrt` only, §6.5), rounded to the lattice. A record whose new point lies outside its host face, or nearer its
boundary than its clearance (a pin's footprint radius, `Decoration.keepClearCm`, half an instance spacing, a label's
box, a light's `sizeCm`; none for an access point's opening), is **re-seated** at the nearest lattice point of the host face inset by that clearance, ties by (y, x) —
never a door light, which keeps that point on its ring edge wherever it falls, so no warp pushes it indoors; if the
inset is empty, a generated pin, decoration, light or access point is re-placed by its placement rule in its host
(§4.7 S11, §4.7's *Light sources*, §4.9, II.7.3) and a user's record — an override, a pinned label, a user-placed or
edited pin, a hand-placed light, an access point an edit placed — is orphaned and reported. A Works' kept rings and
lines are drawn history: each point takes its mean-value image wherever it falls, never re-seated, re-placed or
orphaned. A record of a
locked or pinned entity — a door light excepted, which goes with the ring edge it stands on (above) — is held like a held vertex: the warp's whole-step validation requires it to stay inside its
host face at its clearance and halves the step otherwise (§3.6); the dry run lists it. **A building's stored wing
rings** — with a stored stage-3 composition's rings, its plan's points (rooms, wall ends, bays and columns) and tower
centres, and the building's basement ring — are carried with its footprint face in the same pass by §2.6's
wing-carrying rule, and the whole-step validation includes §2.6's check through `warp`'s `recordCheck`, halving the step
when it fails, as for a held pin (§3.6). The check requires the basement's ring within the wings of its ground storey (an
unedited basement that fails it re-derived by §2.6's basement decision, an edited one failing the step); and for a
stored composition its composed wings to unite to the moved face, its rooms to lie inside the moved face united with
the span rings of the passages its wings span (§2.6; J-A30.23) and its tower centres inside or on it. Every entity
whose footprint, trace, deck or pier the move carried is re-based by §2.6's datum step on the ground it now stands on
(§7.3 (a) 4), a user-edited base kept. The undo record keeps every former point (a light's point, an access point's opening, a
Works' kept rings and lines among them), wing ring, basement ring, stored composition and base, and a replay recomputes the same points and rings by replaying the same operation on the same
geometry. Stamp and grid instances are world-anchored patterns and are not displaced (§8.10). The B-EDIT warp fixtures
are §13.2's
(J-DET-31; J-A68.73).

**MFCG's recorded edit asks** (IMPROVEMENTS O9 (f): the list behind B6, asked for by twelve users). Each is a scripted
B-EDIT scenario that reports its locality share (entities outside the effective scope byte-identical) and its invariant
results (§13.2); "expressible" counts working, measured edits, not event names.

| ask | PLAT events | what re-runs |
|---|---|---|
| add a district | `drawBoundary` | S6 regroups the covered cells; S8–S11 where the class band changed |
| delete a district | `merge` (district into its neighbour) | S6 re-types the merged district; S8–S11 where the band changed |
| add roads | `drawWay` | S4 (arterial) or S5 (secondary) local operator; S8–S11 in the split cells |
| remove roads | `delete` (way) | S5 regrows the merged cell (or S4 re-routes); S8–S11 there |
| move / remove labels | `moveLabel`, `hideLabel` | `LabelEntity.pinned` / `hidden` only (model data, §9.1); 0 other model changes; S13b re-decides the labels whose boxes meet it |
| set district colours | `setStyle` (a thematic row keyed by the district's address) | style only — 0 model changes |
| add / delete vertices | `split` (a way at a point), `merge` (edges), `moveVertex` | the L1 edit; S8–S11 in the touched cells |
| place the castle | `setAttr(castle, site)` | S4 re-routes the castle street; S7 re-traces its run when the castle is on the enceinte; the cells under the old and new reservations re-derive |
| size the castle grounds | `setAttr(castle, baileyArea)` | the reservation resizes; the cells under it re-derive; S7's run when on the enceinte |
| farms in chosen areas | `setAttrMany` (the land-use faces under a drawn region → arable) | S12 on those faces |
| draw walls | `drawWall` | S7 re-traces the run or adds an enceinte and cuts its wall strips; F-REDERIVE on plots in the new strips |
| draw bridges | `drawWay` (class `bridge`) across a river face | a `Bridge` placed by §4.2 S1 (5)'s rule for a drawn bridge; S4's operator lays the drawn way's ends through its deck, pinned; §5.3's deck row holds |
| drag points in the sea | `moveVertex` on the coast (L0) | S1's water operator (§7.3 (b)): the moved coast is the new water (no re-trace, §2.3), contours clipped, decks on it re-sited, the footprint's partition content cleared, kept ways re-laid through their decks and the others cut before the water is inserted; S5 and S6 for the cut cells and the vacated land; F-REDERIVE |

=== REPLACE ### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook) ===
### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)

Three input layers above the parameter vector, all persisted in the recipe — a pointer names one as §7.7 layer n,
while §7.7 item n names the dossier contract's item n (below):

1. **Intent** (outcome targets; `Intent`, below): form archetype, size as population / area / buildings with a tolerance, water setting
   and coast side, gate count, wall rings, planned ↔ organic, wealth level and gradient direction, era and region
   preset, defence level, density. **Expansion** (intent → ≈ 200 internal parameters) is a pure function held in data:
   each intent field maps to internal parameters by `{param, fn: 'const'|'linear'|'smoothstep'|'table', args}` rows
   (tables interpolate linearly), evaluated in a fixed order. **Rows are continuous**: no rounding and no comparison
   inside a continuous control — a discrete outcome is a probability drawn per entity or a discrete control that
   declares itself (§7.8). Example — `wealthLevel ∈ [0, 1]` → `field.characterOffset = lerp(−0.3, +0.3)`,
   `granularity.joinMaxBonus = 2 · wealthLevel` (fractional: its fractional part is the probability that a candidate
   plot takes one more join, drawn from the `plot.join` stream), `greenery.parkPer1000 = lerp(0.1, 0.8)`;
   item 71's class mix reads `wealthLevel` itself — no expansion row — moving every band row's weights toward the
   larger classes in a rich town and the smaller in a poor one, the cuts staying the town's own (§4.7 S10b; J-A71.42);
   `planned ∈ [0, 1]` → `growth.headingSigma = lerp(20, 5)` degrees per 100 m of street, `growth.crossroadProb = lerp(0.02,
   0.15)`, `avenues.probability = smoothstep(0.3, 0.7, planned)` per eligible tier-1 way. Every internal parameter is
   documented (unit, range, effect, provenance, consuming stage) and reachable in the advanced panel (O10 a); the
   registry test proves 100 %. **Surprise me** draws every intent field from its declared range and weights on the
   `intent.surprise` stream of a fresh seed and writes the drawn intent into the recipe, so the town's link reproduces
   it. For a dossier-bound map the port's creation half fills the intent from the dossier by the derivation table
   (item 10 below; `wealthLevel` from the dossier's prosperity word); the filled values are map facts (item 9) and stay
   editable.
2. **Character and circumstances** (items 72 and 76–79): the per-district **intent** — `DistrictIntent` (wealth,
   density, age, function mix, planned / organic, greenery, fortification, building scale), supplied automatically per
   district and overridable — is the input that shapes a district's generation; a district's **character** is item
   72's derived profile (`CharacterVector`, §2.5), read from what was built and naming the district (§4.5), never an
   input. The **circumstances** are one `CircumstanceSlice` (below) per entry of a **timeline** dated in weeks — §4.11's
   week, which for a dossier-bound map is the host's campaign week (item 76) — that *schedules* epoch events: an epoch
   happens only as an `epoch` event in the log (§7.1, hook 8), proposed by the app at a timeline entry or by the port at
   §4.11's cadence, and the timeline's first entry is the creation slice S0 reads (§4.2). The season is read from the
   week through §4.11's calendar row and never stored; an epoch's population target and terrain events ride its
   `EpochInputs` (§4.11); a government's kind names its lordship (§10.2). The slice carries the activity scalars —
   market, harbour and main-street activity, default 1 — that the prosperity field's kernels read under decline
   (§4.11), and the recipe's feature set holds `layers.islands`, II.6's model setting (§7.8).
   **The typed slices** (items 77–79) are read by item 72's dials and terms (§4.5) and by S2 and S3 (§4.2); each is
   recipe data at creation and epoch data afterwards; the port fills them from a dossier, and standalone the blueprint
   and our own rows fill them by the same rules, so every reader sees the same fields with or without a dossier
   (J-A77.71).
   - *Trade* (`trade`, `entrepot`; item 77). **Partners**, in order: the dossier's named neighbours and the partners its
     trade links name, each keyed by its binding key (item 12); with none, one derived partner per through route of the
     settlement's access row (`source: 'derived'`); standalone, one per external bearing the blueprint requests, else
     per through route of its access intent. **Weight**: a partner's listed trade links (a named neighbour with none
     counts one), zero for a `hostile` relationship or a suppressed economy — a rival's or a cold-war partner's listed
     links are kept, as SettlementForge keeps them — normalised to Σ = 1, derived partners sharing equally. **Mode**:
     where the site has navigable water, the partners in weight order take `sea` (a harbour) or `river` (docks on a
     river) until their weights cover the water fraction of all toll and duty income — the income rows the port marks
     water (port duties, river tolls) over all it marks water or road (gate and road tolls) — and the rest `road`; with
     no such income the water fraction is the site's default (one half for a harbour town, one quarter for a river town;
     our own values, calibratable); without navigable water every partner is `road`. **Bearing**: the realm block's true
     bearing when the host sends one (`source: 'realm'`); else a draw on `gate.pick` keyed by the partner's key (§6.1),
     uniform over the arc the site admits for its mode — open water for `sea`, the river's upstream and downstream
     reaches for `river`, the land arc for `road` — so a partner's bearing never moves when unrelated facts change. The
     `road` partners' bearings are among S3 (4)'s requested external bearings (§4.2); every partner's bearing and weight
     feed `TradeFlow` — the per-gate and harbour weights and the dominant bearing — which is derived from the slice,
     `entrepot` and the road-and-gate geometry at §4.3. **North first**: when true bearings arrive for a map drawn on derived ones, the port first turns
     the geo anchor's `bearingDeg` (§11.1) to fit the derived gates to them — no geometry moves — and moves gates or
     roads only for the residual, as a dossier event under item 5's least-disruption budget (J-A77.72).
   - *Economy* (`economy`; item 78). Shares over the sectors of §10.2's `RosterTables.sectors`, Σ = 1: with a dossier,
     its income sources mapped to sectors by the port's revenue rows (a revenue with no sector — rents — drops out and
     the rest renormalise; J-A78.71); standalone, the blueprint's economy setting, by default an even mix, which amplifies
     no class (J-A78.72).
     Read by item 72's economy dial (§4.5) at creation and at each epoch past its hysteresis (§4.11) and by S2's
     town-level character (§4.2 S2, §10.2); the shares are read, never modelled (D-10, D-32).
   - *Powers* (`powers`; item 79). One standing per power: with a dossier, `standing` = its power ÷ the settlement's
     total, its kind by the port's category-and-name rows (military and arcane powers included, §2.7), `governing` and
     `secret` from the dossier; standalone, the governing power the `government` row names and the established religion
     (§10.2's rows), 0.6 and 0.4 (our own defaults, calibratable). `appliedStanding` starts at `standing` and moves only
     past the dials' hysteresis at an epoch (§4.11). The base reads standings, never materialised factions — `Faction`
     stays the module's (§10.1); an `arcane` standing is honoured whenever a dossier states it and, standalone, arises
     only under a `magic` circumstance above `none` (D-3).
   The **undercity** setting (item 65; `auto` by default) is `require` when the dossier lists a subterranean
   district-scale record — placed as a `neighbourhood` assignment that II.7.5's existence test must host — and `forbid`
   when the blueprint or the host's circumstances rule one out; `disorder` (0–1, default 0) is the lawlessness
   II.7.5's size law reads, the blueprint's setting (a timeline entry's over epochs); the dossier's crime scalar never
   fills it — it reaches the undercity through §4.6's staged crime term alone (item 88; J-A88.41, J-A88.73), so crime is
   counted once.
3. **Constraints**: pins and **assignments**:

```ts
// — layer 1's record (item 1): the recipe's intent, `Recipe.intent` (§2.9); item 1's rows expand it to the internal parameters
interface Intent { form: string /* a forms-catalogue row (below) */; population?: number; areaHa?: number; buildings?: number /* the size: any of the three */; tolerance: number /* the size's relative tolerance */;
  water: WaterSetting /* §13.3's one spelling */; coastSideCdeg?: Cdeg; gates?: number; wallRings?: number; planned: number /* 0–1: planned ↔ organic */; wealthLevel: number /* 0–1 */;
  wealthGradientCdeg?: Cdeg /* the wealth gradient's direction */; era: string /* the era and region preset row (§10.2) */; defence: number /* 0–1: the defence level */; density: number /* 0–1: the density control (§7.8) */ }
interface Assignment { id: Id; granularity: 'building'|'neighbourhood'|'dispersed'|'feature';
  target?: Id /* one building / plot, one district, or — granularity 'feature' — the way, bridge, quay or pin a named-feature claim names (item 16 below) */;
  dispersed?: { count: number; kind: BuildingClass | string; criteria: PlacementCriteria };
  criteria?: PlacementCriteria /* a building or neighbourhood assignment's own soft rows: a naming claim's location phrase (item 16) */;
  claim?: { kind: 'name'; bias: { identity: string /* a quarter identity row (§10.2) */; weight: number }[] } /* a naming claim (item 16): it names and biases, never zones */;
  name?: string; function?: string; shapeClass?: BuildingClass; drift: DriftBounds /* ± area %, ± floors, allowed layouts and roof kinds, class family — read against §4.7 S11's designation template (item 19) */;
  precedence: 'overClassRules'; placed?: Id[] /* the solver's placements, persisted with the event */;
  existence: 'map'|'dossier' /* dossier: the element exists on every map the module returns (item 20) */; dossier?: DossierRef /* §7.1: its `element` is the binding key (item 12) */;
  state: 'active'|'ruined'|'removed' /* item 80: written only by dossier events through item 14's rows; a map assignment stays 'active' */;
  memberState?: Record<Id /* a placed member */, 'ruined'|'removed'> /* a dispersed assignment's members a collective record's state reached (item 14); an absent member is active */;
  use?: Id /* the Use record the assignment names (§2.7); the assignment moves with it (item 17 (d)) */; pinned: boolean /* stays where it is under epochs and re-applications; the town adapts around it */;
  knownTo?: 'public'|'local'|'secret' /* item 30 (d): a dossier fact when the dossier sets it (item 9); §9.2's label policy reads it */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: a dossier fact when the dossier sets it; resolved and placed by §4.7's concealment rule */;
  front?: string /* item 63: a front the dossier names — its class or its name; absent: §4.7's cover table picks it */ }
type PlacementCriteria = RelationRule[];   // per-assignment overrides of the class's relation rows (§10.2, §4.7 S10b): nearM → a `near` row, minSpacingM → an `avoid` row on the assignment's own members, frontageClass → a `frontage` row, districts / districtKinds / prosperityBands → `band`-class filters
// PlacementSolver, PlacementRequest and PlacementResult are §4.7 S10b's — the one solver every placement path calls (item 16)
interface Rejection { element: Id; site: Id; seq: number /* the rejectSite event */; held: { epoch: number; populationTarget: number /* the target in force when the rejection was made: the last folded epoch's EpochInputs.populationTarget, else the population the recipe resolves to at S2 (§4.2) */ }; lapsedAt?: number /* the seq of the epoch or dossier event that lapsed it */ }   // model data, in the digest (§2.8 lists it); the solver reads it as PlacementRequest.rejected while lapsedAt is unset
interface DisruptionBudgetRow { kind: 'dossier'|'positive'|'relocation'|'assignment'; weights: { displacedUse: number; join: number; subtractedPart: number; vacated: number }; budget: number; displacementDepth: number }   // a rule table (§7.6); defaults displacedUse 1, join 2, subtractedPart 0.5, vacated 1, budget 6, displacementDepth 1 — our own values, calibratable
// — layer 2's records (items 72, 76–79); declared here once and read at their homes
interface DistrictIntent { district?: Id /* absent: the town-wide default */; wealth?: number; density?: number; age?: number; functionMix?: Record<string, number> /* Σ = 1 */;
  planned?: number; greenery?: number; fortification?: number; buildingScale?: number }   // each 0–1; an absent field is derived; the input a district is generated from, never item 72's derived CharacterVector (§2.5)
interface CircumstanceSlice {
  era: string /* the era and region preset (§10.2); its row carries the public-lighting density (item 68) */; biome: string /* §4.9's climate rows */;
  government: Government['kind'] /* its row forces the seats (§10.2) */; threat: number /* 0–1: the defence level's source at creation (item 10, DR2); the evolution engine's over epochs */;
  disorder: number /* 0–1, default 0 (item 65) */; undercity: 'auto'|'require'|'forbid' /* item 65 */; magic: 'none'|'low'|'high' /* item 68; 'none' by default under D-3 */;
  landscape: { fertileLand: boolean; mines: boolean; quarries: boolean; fishing: boolean; logging: boolean } /* the S0 landscape toggles (§4.2) */;
  activity: { market: number; harbour: number; mainStreet: number } /* default 1 each: the prosperity kernels under decline (§4.11) */;
  trade: TradePartner[]; entrepot: boolean; economy: EconomyShares; powers: PowerStanding[] /* items 77–79 */ }
interface CircumstanceTimeline { entries: { week: number /* §4.11's week */; populationTarget?: number; slice: CircumstanceSlice; events?: EpochInputs['events'] }[] }   // Recipe.circumstances (§2.9): entries in week order, the first the creation slice; applied only through `epoch` events (§7.1)
interface TradePartner { key: string /* the partner's binding key, or a standalone name */; mode: 'road'|'river'|'sea'; weight: number /* Σ = 1 over the partners; 0 for a hostile one */;
  bearingCdeg: Cdeg; relationship?: string /* the dossier's word for the neighbour relation */; source: 'dossier'|'derived'|'realm' }
type Sector = string;   // a row key of §10.2's RosterTables.sectors — trade, taxes and tolls, crafts, agriculture, extraction, fishing, finance, religion, military, magic, crime
type EconomyShares = Record<Sector, number>;   // Σ = 1 (item 78)
interface PowerStanding { key: string /* the power's binding key, or a standalone name */; kind: Faction['kind']; standing: number /* Σ = 1 over the settlement's powers */; governing: boolean; secret: boolean;
  appliedStanding: number /* the value item 72's dials last applied: moves only past their hysteresis at an epoch (§4.11) */ }
// — the dossier contract's records (items 10, 12–14 below; the port that fills them is §14's)
interface DerivationRow { row: string /* DR1 … */; family: string; covers: string[] /* the §2.8 registry kinds and attribute paths the row derives */; inputs: string[] /* digest fields, in the order read */;
  rule: string /* the section whose rule derives it */; chance: string /* a §6.1 concern, or 'none' */; bar: string /* the coherence bar it holds (item 11) */ }   // tables/dossier/derivation, provenance own
interface DossierBinding { line: string /* the SettlementForge line (item 73) */;
  rows: { dossierKey: string /* the binding key */; entity: Id /* the address that carries Identity.dossier (§2.8, §6.3) */; kind: string; since: { seq: number }; rebound?: { from: string; seq: number; receipt: string }[] }[];
  factHash: Hash128 /* of `carried` */; absorbed: { seq: number; week: number | null; factHash: Hash128; changeIds: string[] }[] /* every absorbed state, newest last (item 5's convergence report) */ }
type CarriedFacts = Record<string /* binding key */, unknown /* the dossier fact's fields as the port's digest holds them */>;   // the "previous dossier" item 1's diff runs against
interface DossierChange { changeId: string /* the host's event, outcome or decree id; else a Hash128 of (element, op, week) */;
  source: 'event'|'pulse'|'decree'|'regeneration'|'edit'|'diff'; week: number | null /* §4.11's dating rungs; null: applied finished, without transition stages */;
  cause?: { kind: string; ref?: string; author?: string /* the host's author word */ };
  element: { kind: 'settlement'|'institution'|'power'|'notable'|'resource'|'condition'|'trade'|'quarter'|'government'|'deity'; key: string /* the binding key */ };
  op: 'add'|'remove'|'state'|'attr'|'tier'|'population'|'prosperity'|'power'|'rename'|'reopen'; before?: unknown; after?: unknown; fate?: string;
  reason?: string /* the host's reason, shown beside the map's rule in the disruption report */; receipts: string[] /* the receipt fields found (item 13) */ }   // EditBase.dossierChange (§7.1)
interface ReceiptRow { row: string /* F1 … F22 */; element: DossierChange['element']['kind']; op: DossierChange['op'];
  receipts: string[] /* the receipt fields in precedence order: the first present decides cause, fate and week */;
  response: 'assign'|'unassign'|'setAttr'|'status'|'rebind'|'epoch'|'converge'|'none'; dating: 'receipt'|'arrival' }   // tables/dossier/receipts, provenance own, the SettlementForge line in its header
interface StatusRow { status: string; fates?: string[] /* keyed first (item 14) */; response: 'open'|'wear'|'dial'|'smaller'|'removed'|'ruined'|'none' }   // tables/dossier/status
```

**Precedence: lock > dossier existence > assignment > user-drawn geometry > rule tables > defaults** — the one order for
every meeting of protections and inputs (§7.2, §5.2 F-EDIT); S10–S11 apply it to assignments. A targeted assignment on a
locked entity (or a locked attribute path) is an F-EDIT conflict returned as an action — unlock, choose another target,
or keep the lock; the dispersed solver never places a member on a locked entity. A host that must override a lock sends
an unlock first, and the log records it (J-DET-11). **Dossier existence** — with every dossier-owned value (item 11) —
sits below the lock and above every assignment, drawn shape and rule: a dossier-backed element is never removed by
anything on the map and never placed on a locked entity — it takes the best unlocked site the hard rows allow and, when
no site passes them, its first closest option — the fewest hard rows failed, then the best score, in §4.7 S10b's order
— with the rows it fails reported (§5.2 F-SITING), never omitted (J-A20.71).

**One path — placement, then mutation (items 16, 18).** A blueprint's assignments and edits, every element of a dossier
a new document starts from — the port's creation half (§14, item 73) builds that blueprint and this prefix through the
derivation table (item 10), the recipe's seed derived one way from the dossier's (§14, item 85) —
and the declarations of a skeleton file imported as a new document (§11.1, item 101), become `assign` and edit events at
log positions 0…k, the `assign` events flagged `creation` (the prefix the base derivation's S2 reads ahead as fixed
rows, §7.4, J-A22.74: the dossier's elements are counted in S2's demand as well, so their land is claimed eagerly at S7b
and S10 (3) places them claims-first — J-A22.72; a skeleton's drawn declarations are read ahead by the stages that make
what they declare, §4.1);
every `assign` event — from the blueprint, the dialog, the host bridge or the host door (§11.4) — is placed by §4.7 S10b's
one solver for its scope (claims-first at positions 0…k, the least-disruption order after the city is built) and applied
to each placed plot by §4.7 S11's designation mutator, so an assignment gives the same town whichever way it arrived and
never re-rolls what stood there. **Re-solving:** when a member of a dispersed assignment is superseded without a
successor, only that member is re-placed, with every mapped placement as a fixed point (the minimum spacing is measured
from them); nothing still mapped moves. **Epochs (item 17 (d); J-A17.71):** an assignment is a stable identity that moves
with its use under §4.11's use step unless `pinned`, in which case it stays and the town adapts around it; members are
added only by an event that changes the count or the criteria and are then placed with the existing members fixed; every
move, closing and reopening is reported (§5.4's `changes`, §11.3).

**The dossier contract (items 20 and 22; owner: "the map does not edit the dossier … This module only takes input from
SettlementForge and returns back the map").**
1. *One way.* SettlementForge → map module → map. The dossier enters through the host door of §11.4 as dossier events —
   `assign`, `unassign` and `setAttr` events with `author: 'host'`, `EditBase.dossier` and `EditBase.dossierChange` set
   (§7.1) — in the host's order; the module never writes to, patches or proposes a change to the dossier, and the bridge
   has no message that does (§11.3). Map edits live in the map's own document (§2.9), which the host may store as an
   opaque artifact; nothing in it flows back. **The port produces the events** (§14, item 73). SettlementForge sends
   whole dossiers and no change list, so the port DIFFS the incoming dossier against the dossier facts the map already
   carries by their binding keys (`Document.dossier.carried`, item 12) — no host-side history is needed — writes one
   `DossierChange` per changed element (item 13), dates it by §4.11's dating rungs (item 76) and emits its events.
   **The map never asks** (item 20 (h) (iv); the owner: "it is one directional"): a gap in the dossier is the map's to
   fill by the derivation table (item 10), never a request — no message, report or field asks the host for a fact, and
   the doors (§11.4) and the port declare OPTIONAL inputs they use when present (`HostContext`, §14), never a required
   one beyond what the dossier holds today (J-A20.79). **What the port never reads** (item 86; J-A86.71): a host's own
   map-side layers (`urbanFabric`, `mapEdits`, `fogSessions`, every `worldState.spatialLedgers.*` sub-ledger, the
   spatial substrate included), its derived reads (the district profile, the map profile, the causal state, the system
   state, capacities, daily life, threat profiles, the spine), its generation log (`simulationTrace`), `aiOverlays`,
   `generationCoherenceReceipt`, its generation sliders (`config.priority*`), its NPC social groups, and prose beyond a
   description seed the clerk may read (item 101); the campaign's frozen `spatialDigest` is the one campaign fact the
   optional realm block may carry (§14). The adapter reports every key it dropped (`ignored_key`, §14). The reasons: a
   host's own map memory would make its map program the base, against the owner's rule that what we build stays the
   base; the sliders' effect already sits in the institutions and the income shares, so reading them would count it
   twice; and SettlementForge's own district names — in its news — are never matched to our districts (owner, J80 Q6;
   J-A86.72).
2. *Existence.* Everything the dossier specifies — buildings, institutions, assignments, named features — is a
   dossier-backed assignment (`existence: 'dossier'`) and exists on every map the module returns, live or — when the
   dossier lists it ruined — present as its ruin (item 14): F-SITING never drops it, `delete` never removes it, and only
   a dossier event removes, adds or re-designates it; a removal (`state: 'removed'`, item 14) leaves the plot vacant
   through `closeUse` (§4.11) for item 17's rules to re-use. The dossier's population is a dossier fact as well — a
   count, which the households that fill it honour: they are map facts (item 9), derived and housed through the roster's
   demand (§10.2). A map event — one a user, or a host's map edit, appends without `EditBase.dossier` — that would
   close, remove or re-designate a dossier-backed element is refused as F-EDIT (§5.2), with the actions `rejectSite`
   (move it) and `placeAt` (designate the plot for something else, the element re-placed): an `unassign`; a `setAttr` of
   its use or class; a `convert` `closeUse` of its use or `mutate` of its plot to another designation; a conversion that
   empties or removes the building that houses it (`vacate`, `abandon`, `decay`, `ruin`, `robStone`, `clear`,
   `demolish`); a plot `join` or `split` whose fate would demolish that building. A map `delete` of it is recorded as
   `rejectSite` (item 3), and a `relocateUse` or `swapUse` moves it and is not refused (J-A20.75). An `epoch` is bound
   by the same rule without being refused by it: no step of an epoch closes a dossier-backed use or leaves one without
   its building — §4.11's *Dossier content across epochs* relocates it first, or keeps it in its building, wherever a
   step would close it or empty or remove that building — so every dossier-backed element is live and placed — or
   present as its listed ruin (item 14) — after every epoch (§5.3's row). Elements the generator added on its own —
   filler houses, trees, lanes — may be deleted on the map with local repair, and whatever the dossier needs of them
   (housing for its population, a demanded class) is re-provided elsewhere by the same solver (J-A20.72).
3. *Rejection, not deletion.* A map "delete" of a dossier-backed element is the `rejectSite` event (§7.1): the site is
   excluded (`Rejection`, above; `PlacementRequest.rejected`), the solver re-places the element by the least-disruption
   order (§4.7 S10b) and the surroundings repair locally (§7.3), from the same seed. The rejection is not permanent
   (owner: "it is not permanent because if a settlement grows or declines that might be appropriate to put something
   there"): it holds while the settlement stays in the state it was made in and **lapses** — the site eligible again
   under the ordinary rules, the element staying where it is — at the first `epoch` event folded after it whose
   `populationTarget` differs from `held.populationTarget` by more than the roster tolerance (§4.11; item 76; J-A76.43, J-A76.71)
   — the settlement has grown or declined, not drifted — or at the first dossier event folded after it whose effective
   scope holds the site's block; the lapsing event writes `lapsedAt` into the record inside its own touched set, so no
   event is logged for the lapse, and an undo of a lapsing epoch that carried no dossier event restores the hold (a
   dossier event, or an epoch that carried one, is no undo target: §7.4; J-A20.74, with J-A20.41). A user lifts a
   rejection with `rejectSite` and `op: 'lift'`.
4. *Positive placement* (owner: "maybe you want a specific place to be something"). `placeAt` pins a dossier-backed
   element, an assignment member or a designation the generator controls to a chosen plot: the solver honours it when
   the hard rows allow — joining plots and mutating the buildings by §4.7 S10 (7) and S11, relocating whatever was there
   by the least-disruption order — and otherwise returns F-EDIT with the blocking rows and the closest acceptable sites
   (§5.2). It never creates or deletes dossier content, persists until the user lifts it or the dossier removes the
   element, and draws on `siting` keyed by the plot and the event (§6.1), so it follows the same determinism.
5. *Re-application.* A dossier change after the first map is a mutation of the CURRENT map, never a reshuffle: the
   solver's least-disruption order (vacant or under-used plots first, then a use that can move within the same district,
   one displacement level, then a join only when the new use needs the land — §4.7 S10b) finds the site, S11's mutator
   adapts the buildings, a removal vacates; households the dossier adds fill standing shells first by `relet`, up to
   §2.6's capacity, before any new plot (item 28 (f), §4.11), their plans re-cut as §7.3 states. Positive placements and
   the map's other edits are honoured first, as pins and protected entities (§7.2), and the dossier event is applied
   around them; an edit it can no longer honour is reported and orphaned, never dropped silently (J-A20.73). Its
   **disruption** — every moved use, joined or vacated plot and mutated building, each with the rule that caused it — is
   computed in the dry run against the request kind's `DisruptionBudgetRow`, stored in the event (`EditBase.disruption`,
   §7.1) and shown as its fate report (§7.3 item 4); the budget bounds the search — the first rung of the order that
   fits is taken — and the effective scope (§7.3 item 1), never the dossier's authority: an event no rung fits within
   budget still lands at the least-disruptive site and is reported over budget (J-A22.73). Everything not in the
   disruption set keeps its exact geometry and identity (the oracle, §7.3 item 7 (vii)).
   **A host's undo (item 87).** A host that restores an earlier dossier state sends it as a dossier change like any
   other; the port diffs it (item 1), and because §4.7 S10b's least-disruption order takes vacant plots first and
   §4.11 prefers a building's `formerUses`, an element the host removed and then restored returns to its own vacated
   building and an element added and then withdrawn leaves the plot it took — the map converges to its earlier state
   wherever nothing else changed; the residue is reported, and the report names the earlier absorbed state the dossier
   now equals (`state_matches_absorbed`, by the binding's `absorbed` hashes, item 12). No rewind of dossier events
   exists: a dossier event stays no undo target (§7.4; J-A87.71).
6. *Continuity.* The map is a function of the seed, the ordered history of dossier events and the map's own edits
   (§6.2): the same history replays to the same map exactly; two histories reaching one dossier may give different,
   equally valid maps — continuity over path-independence, because the owner asked that the seed "respect the previous
   layout prior to the addition or subtraction" (J-A22.71). A brand-new map from an existing dossier has every element
   present from the start (One path, above). Inside the evolution stage the same rules apply. A dossier change the host
   sends with an epoch rides in that epoch's `EpochInputs.dossier` (§4.11) and is applied at §4.11's step (e), after the
   use step and the ladder and before siting (J-A22.42); one sent between epochs folds at its own log position and
   mutates the map the last epoch left (item 22 (e)). The events an epoch carries take their `seq` from `nextSeq` when
   the `epoch` event is appended — the epoch's own first, then the carried events' in the host's order — so their draws
   and minted addresses are keyed as a standalone event's are (§6.1, §6.3); they fold only inside the epoch and are
   never undo targets, and neither is the epoch that carries them (§7.4) (J-A22.76).
   The port groups a host's changes into these events and epochs by §4.11's cadence (item 76): an element change folds
   at its own week as a standalone dossier event, in the host's order; a population change or a typed-slice change
   rides the epoch the cadence schedules, in its `EpochInputs`.
7. *Knowledge.* A dossier may designate an institution hidden or secret and, for a clandestine one, its concealment and
   its front (item 63): `Assignment.knownTo`, `concealment` and `front` are then dossier facts; the solver prefers
   hidden plots through the class's relation rows (§4.6, §4.7 S10b; item 30), places a front and the function it hides
   as one item by §4.7's concealment rule, and §9.2's label policy reads them. A raid or a discovery is a dossier event,
   applied as a least-disruption mutation — the front may close, the hidden function relocate, a passage be sealed
   (items 17, 22, 30) — and a map delete relocates by `rejectSite` (item 3). A map `setAttr` of a value the dossier set
   — `knownTo`, `concealment`, `front` — is refused as dossier-owned (item 11; J-A20.77, superseding the override
   clauses of J-A30.71 and J-A30.72); the drawing's display stays the user's — a label's display text and its visibility
   (§9.1), and what each viewer sees by the viewer's knowledge key (§11.3). Where the dossier sets no such value it is a
   map fact, edited as §7.1 lists.
8. *What is staged.* The port's creation half is the base's (M1, exercised by the frozen dossier fixtures of §13.2 —
   items 83, 84 — never by a live host), its absorb half lands with this contract at M3a, and its wiring to a live host
   bridge is the owner's SettlementForge stage (§11.4, §14, *Staged by the owner's roadmap*; item 73); no door opens the
   other way — the host's simulator never reads the map's geometry (J86, §11.4). The records and rows the port will fill
   when a host supplies them are declared schema-complete and empty in the base: `ConditionOverlay`, `DepositSite`,
   `HistoryHint`, `PowerRelation` and the dossier-backed `Person` (§2.7), and the impairment, hinterland, crime,
   custom-weight and legitimacy rows (§10.2) (item 88). Everything else in this contract — the events, records,
   precedence, rejection, positive placement, budget, continuity and items 9–16 below — is the base's, exercised today
   through the dialog, the API and the fixtures.

**The derivation rule and the port's contract** (item 20 (h), 2026-09-27; items 74–87; owner: "whatever the dossier
doesn't provide, the rest of the map code must compensate. it is one directional. only the dossier is the source of
immutable truth while the rest can be constructed at whim. better if the rest of the map code coherently derives things
from the dossier and in accordance with our rules").

9. *Two tiers of fact* (item 20 (h) (i)). Every fact the map holds is either a **dossier fact** — a record or value the
   dossier supplies, carried by the map under its binding key (item 12), immutable on the map and changed only by a
   dossier event (item 1) — or a **map fact** — everything else: positions and geometry, plots, buildings and their
   classes, the households that fill the dossier's population, lot assignments, prosperity values, the settlement-level
   trade direction and the partners' derived bearings, a collective record's count inside its range, the names the
   dossier does not give, each district's character. Map facts belong to the map — generated,
   regenerated, edited and replaced freely, subject only to items 10 and 11. The dossier facts, by kind: the
   settlement's name, tier word and population; each dossier-backed element's existence, state (item 14), name, kind and
   membership and, where the dossier gives them, its `knownTo`, concealment and front; a collective record's count
   range; each quarter's name (item 16); the typed slices' dossier-sourced values — partners, relationships and listed
   links, income shares, power standings, the government; the conditions. For every field, §2.8's `factTier`
   derives which tier holds it (never stored; J-A20.23), read by §7's edit rules (item 11), §9.2's reader, §11's exports
   and the API through which any clerk reads (§11.2). An author's declarations (item 101) are map facts `factTier` reads
   as `declared`: held
   against generation and re-rolls until the author changes them (§7.2), and never above a dossier fact — a declaration
   that would contradict one is refused as dossier-owned, with the closest acceptable alternatives (item 20 (g))
   (J-A20.76).
10. *Derive before invent — the derivation table* (item 20 (h) (ii)). A map fact the dossier does not supply is derived
   from what it does supply, by the design's rules, before any recourse to chance. The table is an INDEX: one row per
   map-fact family — the dossier inputs it reads (the port's `DossierDigest` fields, §14), the section whose rule
   derives it (stated there, never here), where seeded chance enters (a concern of §6.1, or none) and the coherence bar
   it never contradicts (item 11). A row's inputs are read in the order written — a host's optional input when present
   (`HostContext`, §14), then the dossier's, then the blueprint's own — and when none is present the rule's default
   applies; a missing input never becomes a request (item 1). Standalone, the blueprint and our own roster are the
   inputs of every row — the same rows, so connecting a dossier changes inputs, not rules; the tests run the rows from
   M1 on the frozen dossier fixtures and on blueprints alike (§13.2, items 83, 84). The rows are data (`DerivationRow`,
   above; `tables/dossier/derivation`, provenance `own`), each naming the §2.8 registry kinds and attribute paths it
   `covers`; §13.2's totality test proves that every map-fact family of the registry is covered by a row and that every
   row's chance names a registered concern or none (item 20 (h), with item 83's vocabulary test; J-A20.78).

| row | map fact | dossier inputs, in the order read | rule (its home) | chance (§6.1) | the bar it holds |
|---|---|---|---|---|---|
| DR1 | the site: relief, coast and its side, river course and inflow, lake, marsh | the realm cell's terrain, river and coast (optional); `site.terrain`, `site.access`, the water deposits, `site.culture` | S0's site request (`tables/dossier/site`); S1 (§4.2) | `blueprint.features`; S1's `terrain.*` and `water.*` | a coastal dossier has a coast, a riverside one a river, a port one a harbour basin |
| DR2 | walls, enceintes and gates | the realm gates (optional); `walls.records`, `walls.citadel`, `walls.flagged`, `site.access`, the population, `site.threat` | the access row's gate counts; S0's walls and castle toggles; S3's gate law (§4.2); the wall furniture (§4.8) | `gate.pick` | walls exactly when the dossier lists a wall institution; the gate count inside the access row; a citadel record gives a citadel |
| DR3 | trade partners, their weights, modes and bearings | the realm partners (optional); `economy.partners`, `economy.tradeLinks`, the toll and duty income rows, `site.access` | layer 2's trade fill (above), its `road` partners' bearings read by S3 (4) as requested bearings (§4.2) | `gate.pick` (keyed by the partner's key) | a `hostile` partner carries no trade; a rival's listed links are kept; a bearing never moves on an unrelated change |
| DR4 | trade flow: per-gate and harbour weights, the dominant bearing | DR3's slice; `entrepot` | `TradeFlow` (§4.3) | none | weights sum to one; a harbour town's harbour carries the sea share; a derived partner is marked `derived` |
| DR5 | districts: count, kinds, boundaries, identities | the population; quarter claims (item 16); district-scale records; `site.culture` (the forms weights); power seats (DR11) | S6's typing and grower, item 72's identities (§4.5) | `district.seed`, `district.type` | every quarter name on at most one district, and on exactly one unless reported waiting (item 16); each district-scale record on a neighbourhood of its own; no district named for a social class |
| DR6 | the prosperity field and each plot's band | `wealth.label` (to `intent.wealthLevel` by `tables/dossier/wealth`); the economy and power slices; quarter hints | the field with item 72's dials (§4.5) | `field.chance` | the population-weighted mean band within one band of the wealth row's band |
| DR7 | households: count, sizes, bands | the population; `wealth.label`; the rung; the housing record's range; the economy slice | S2's roster (§4.2, §10.2) | `roster` (its ordinal draws) | the members sum to the population within the roster tolerance; the residential building count inside the housing record's range; every household housed |
| DR8 | the class mix inside a neighbourhood | DR6's field; `intent.wealthLevel` | S10b's class mix (§4.7, item 71) | `siting` | the larger classes' share monotone in the value within a band row |
| DR9 | institution instances: a collective record's count, each instance's class and band | `institutions[].kind`, `.count`, `.districtScale`; the population; `wealth.label` | S2's per-capita rows clamped into the record's range (§4.2); DR24's class; its distribution (§4.5 (3)); S11's templates (§4.7) | `roster` (its ordinal draws) | the count inside the record's range; a singular record placed once |
| DR10 | positions: where each element stands | class, `tags`, `facets`, `forbidden`, the landmarks naming it, chains and dependencies, the power association, `knownTo` | S10b's one solver, claims-first from the creation prefix (§4.7; One path) | `siting` (keyed by the assignment and member); `alloc.district` (a dispersed class's controlled random share per district, §4.5) | every dossier-backed element placed (item 2); a hard row never broken silently |
| DR11 | power seats and turf | `powers[]` (standing, governing, controlled); `government` | §10.2's government rows (the seat classes) and §4.7 S10b's faction-turf attractor rows; item 72's significance weighs them (§4.5) | none (ties by address) | the governing power's seat is the government's seat institution |
| DR12 | a district's political alignment | DR10's lots; the class-to-power rows (§10.2) with `Institution.powers` overrides; the power slice | item 72 (§4.5) | none | shares sum to one per district; a shared building counts once |
| DR13 | a district's economic role | DR10's lots; the class-to-sector column (§10.2); the economy slice | item 72 (§4.5) | none | a building serving two sectors counts once, partitioned |
| DR14 | the names the dossier does not give | the dossier's names (protected); `site.culture` | §10.4 with item 72's dominant components | `naming`, `naming.quarter` | no generated name repeats a dossier name within its kind |
| DR15 | buildings: class, footprint, storeys, heights, materials, entrances, basements | the use's class and the plot's band (DR6, DR10); `site.culture` (a template-family row) | S11's designation templates (§4.7, item 19); §2.6 | `siteplan`, `siteplan.entrance`, `heights`, `material` | a material never changes a shape |
| DR16 | hidden plots, passages, fronts | `facets`; criminal categories; covert impairments; the crime scalar (§10.2's staged crime row, item 88) | the hidden share with its staged crime term (§4.6); the concealment rule (§4.7, item 63) | `siting` (the front pick) | a clandestine record's public views show only its front |
| DR17 | the underground: sewers, accesses, the undercity | the population; sanitation records; subterranean kinds; the crime scalar (§10.2's staged crime row, item 88); the blueprint's `disorder`; `undercity` | II.7's feature law; II.7.5 with §4.6's staged crime term | `blueprint.features`, `sewer` | the underground mode only with a navigable run; a required undercity exists |
| DR18 | informal clusters and camps | DR6's field; the rung; slum claims | the cluster rows (§4.7, item 70); the shanty staging (§4.5) | `siteplan` | never on a standing plot floored at the middle band or above |
| DR19 | the hinterland: land uses, their bearings and sizes | the realm cell's resources (optional); `site.deposits`, `economy.foodImportPct`, `site.isolation`, `site.terrain` | S12a and §4.9; `economy.foodImportPct` through §10.2's staged hinterland row (`PortRows.hinterland`, item 88), which scales §4.9's farmland once the port fills it | `hinterland.outside` (a deposit's bearing keyed by its key) | every listed deposit has its land use |
| DR20 | the knowledge of places | `facets`; covert impairments | item 30's defaults (§4.6); item 63 (§4.7) | none | a covert fact never reaches a public view |
| DR21 | transition timing | the change's week (§4.11's rungs); the calendar row's season; conditions | the `Works` (§4.11, item 67) | `works` (an epoch's Works: its start offset in the epoch's span, then its duration inside its row's range, keyed by the target's lineage with the epoch's week and the epoch component; a dated change's or a scheduled edit's Works: its duration alone, keyed by the target's lineage with its start week — §6.1) | the stage shown at week w depends only on the record and w |
| DR22 | persons beyond the notables | the households (DR7) | `derivePerson` (§10.3) | `people` | a person derives from its key alone |
| DR23 | the rung and the frame | the population | §1.1's size ladders; §3.2 (9)'s frame rule | none | the rung is the population's; a dossier below the floor or above the cap is refused (item 15) |
| DR24 | a record's class | its name, `kind`, `category`, `tags`; a demotion or upgrade receipt | the class rule (item 12) | none | a kind without a class row takes its category's generic class, reported, never refused |
| DR25 | a collective record's state over its members | the record's state and severity band | the distribution rule (item 14) | `siting` (keyed by the assignment, the event's `seq` as creation index) | the affected share equals the severity band's share |

11. *Coherence* (item 20 (h) (iii)). The derivation obeys four rules, proved by §13.2's coherence bars (item 20 (h)) on
   the design's own dossier events and by the port's bars on the frozen dossier fixtures (item 83), and checked at run
   time by §5.3's coherence rows: (a) no derived fact contradicts a dossier fact — counts, kinds, existence and state,
   membership, the realm-level trade facts (each table row's bar); (b) a dossier change re-derives exactly the dependent
   map facts — the rows whose inputs it changed — inside its disruption set, by item 5's least-disruption mutation,
   never a re-roll; (c) the derivation reads nothing beyond three inputs — the seed, the ordered dossier history and the
   map's edits (item 6), so the same inputs reproduce the same map; (d) nothing derived flows back (item 1). The rules
   bind the DERIVATION — generation, re-derivation and every dossier event; a user's edit of a map fact (a prosperity
   stroke, a moved building, a renamed lane) belongs to the user and stands, since it alters no dossier fact. An edit
   that WOULD alter one — a rename of a dossier-named element or quarter, a change of its kind or class (item 2), a
   `setAttr` of a value the dossier set (`knownTo`, `concealment`, `front`, `state`), a collective record's count set
   outside its range, an `adjust` of a dossier-bound map's population or of a slice value the dossier supplied — is
   refused as F-EDIT with the reason `dossier-owned` (§5.2), as item 2 refuses a removal, the map-side alternative
   offered where one exists (the label's display text, §9.1; a count inside the range) (J-A20.77).
12. *The binding — identity without dossier ids* (item 20 (h) (v), made concrete by item 74). SettlementForge keys most
   of its records by NAME and gives most institutions no id at birth, so the map binds its own stable addresses (§6.3) to
   the dossier's keys in the document's `dossier` block (§2.9: a `DossierBinding` and the `CarriedFacts`, above), which
   the port writes at creation and at every absorb. The KEY LAW, stated here and applied by the port's adapter (§14) —
   the only code that reads SettlementForge's fields (J-A74.72):

| element | binding key | re-binding receipts |
|---|---|---|
| the settlement | `settlement:<id>` — the dossier's own id, stable across reloads, same-seed regeneration and section rerolls; a new id is a new dossier and a new map | `rename-settlement` renames the title label only |
| an institution | `inst:cat:<catalogId>`, else `inst:uid:<localUid>`, else `inst:name:<slug(name)>` — SettlementForge's own anchor precedence; `#k` appended for a collective record's k-th member; two records of one key told apart by their order in the dossier, reported `duplicate_key` | `demotedFrom` with the fate `demoted_by_disaster`, `promotedFrom` with `upgraded_by_reconstruction`: the row is kept and the record re-classed by its new name |
| a power | `power:id:<faction.id>` when the dossier authored one, else `power:<slug(name)>` | `rename-faction` |
| a notable | `npc:<id>` | a successor's `replacedNpc` links the successor's row to the one it replaces |
| a condition; a resource; a quarter; the government | `cond:<id>`; `res:<key>`; `quarter:<slug(name)>`; `government` | none |

   `slug` is the line's own name normalisation, applied by the adapter, so a name key agrees with the catalogue key the
   line writes at birth. **Class is read apart from identity** (row DR24): a record's class comes from its current NAME
   when a demotion or upgrade receipt is present — its kept catalogue key then names the old kind — else from its
   catalogue kind, else from its name, category and tags, the fallback every record without a catalogue key needs; a
   kind with no class row takes its category's generic class and is reported (`unmapped_kind`), never refused (at M1 the
   rows cover M1's classes). **Re-binding** happens only on a receipt of the table: a name change without one is a
   removal plus an addition, reported (`rename_without_receipt`), because a guessed identity is how silent mis-bindings
   begin (J-A74.73). A power's controlled-institution list is resolved to binding keys through the stable part the line
   itself stores — the slug of the institution's own id, else of its name — against the current roster, never through
   the catalogue key. `DossierRef.element` is the binding key and `DossierRef.version` the SettlementForge line (§7.1);
   `Identity.dossier` carries the ref on the entity the element is (§2.8; J-A20.22); a re-binding re-points a binding
   row and never re-keys a map address (§6.3). The model digest does not cover the block, because the model already
   carries each entity's current key in `Identity.dossier`, and `carried` holds dossier facts the map does not draw (a
   notable's role), whose change must not change the map's digest; `binding` is rebuilt from the log's dossier events at
   load and must equal the stored rows (§5.3), and `factHash` is the hash of `carried` (J-A74.71).
13. *The change envelope and the receipt table* (item 75). Every event a dossier change generates carries its
   `DossierChange` (above) in `EditBase.dossierChange` (§7.1), so the disruption report, `LifecycleEvent.cause` and
   §5.4's `changes` say why — the host's reason beside the map's rule (item 22 (b)). SettlementForge records a change
   only through scattered receipts — stamps on the record, capped history lists, decrees, a news feed — so the port reads
   them through the RECEIPT TABLE (`ReceiptRow`, above; `tables/dossier/receipts`): per change kind, the receipt fields
   in precedence order — the first present decides the cause, the fate and the week, by §4.11's dating rungs — and the
   response. The design states the ten rows the survey's verification corrected and F22, the undo row item 87 answers (J-A75.71); the others — F6 reopened, F7
   population, F9 prosperity, F10 power standings, F11 government, F12 conditions, F13 resources, F16 the deity, F17
   notables, F19 a confirmed table event, F21 a reroll — are data rows of the same type, their completeness §13.2's
   vocabulary totality test (item 83). A change no rung dates is applied finished, without
   transition stages, and reported (`unreceipted_change`).

| row | change | receipts read, the first present deciding | response |
|---|---|---|---|
| F1 | an institution added | a new binding key; `createdByEventId` or an `add-institution` decree; `_worldPulseTierAdded`, `_worldPulseEconomyBuilt` or `_worldPulseFounded` with their outcome ids and `foundedAt`; the fate `founded_by_flourishing`, which writes nothing else and is dated by arrival alone | an `assign` with `existence: 'dossier'`, placed by S10b's `dossier` request (§4.7); an addition under a key the map carries as removed or ruined is a REOPEN (row F6, item 14); a missing `foundedAt` never reads as "stood since the founding" |
| F2 | an institution removed | `worldPulseFate` and `_worldPulseInactive` FIRST — the closure fates `hollowed_out`, `abandoned`, `bankrupt`, `closed_for_want_of_custom`, `shuttered`, `abolished`, `disbanded`, `captured_by_local_powers`, `abandoned_with_the_settlement` under status `remnant` — then status `removed` with `removedByEventId`, or a `remove-institution` decree | item 14's `removed`: `unassign`, `closeUse`, the plot vacant |
| F3 | reduced or converted | the fates `privatized`, `downsized`, `reduced_to_watch_post`, `survives_as_remnant`; `demotedFrom` or `promotedFrom` | a `setAttr` of the designation in place (item 18's mutation); a demotion or upgrade is also row F15's re-binding, the record re-classed by its new name |
| F4 | impaired or restored | the visible `impairments[]` (the state `impaired` derived from them) | the physical types — capacity, infrastructure, access, supply — one `condition` step per severity band; the non-physical — legitimacy, influence, wealth, staffing, corruption — the impaired institution's own dial term only (§4.5 (6); J-A88.42) |
| F5 | ruined | status `ruined` with `destroyed_by_disaster`, `remnantReason` and the calamity's targets (never `destroyedByEventId`, which is the settlement's) | item 14's `ruined`: present as its ruin |
| F8 | the tier moved | a `tierHistory[]` entry, or a bare `tier` change with none (a calamity, a resettlement, a preset that applies proposals at once) | the rung re-read at the next epoch's target (§4.11); the tier word re-titles the map (item 15) |
| F14 | trade | `_cutRoutes`, `_userRoutes`, a route link, `tradeLinks`, a partner's relationship — a rival's or a cold-war partner's listed links kept, only `hostile` or a suppressed economy carrying none | the trade slice at the next epoch |
| F15 | a rename | `rename-settlement`, `rename-faction`, `rename-npc`; for an institution only `demotedFrom` or `promotedFrom` | item 12's re-binding; without a receipt a removal plus an addition, reported |
| F18 | a decree | `decrees[]` applied with `tickRef`; the week's `decreeCauses[]` | the decree's own change rows; a decree whose verb binds no world effect expects no change |
| F20 | the settlement ended or born | `destroyedByEventId` on the settlement root; `lifecyclePatch`; `memberBirths` | an END is an epoch that ruins every building by the decline hooks (§4.11); a resettlement of the same site is the SAME map regrowing on its old plan by item 8's regrowth-first order (owner, J80 Q4; J-A75.72); a member birth is a new dossier and a new map |
| F22 | the host undid a change | the incoming dossier's fact hash equals an earlier absorbed state's | item 5's forward convergence, reported `state_matches_absorbed` |

14. *A listed element's state* (item 80). SettlementForge never deletes a record — a removed, ruined or closed
   institution stays listed with its status — so an assignment carries `state`, written only by dossier events through
   these rows (`StatusRow`, above; `tables/dossier/status`), keyed on the fate word and the inactive flag BEFORE the
   status, so that a bankrupt shop is never kept open as a smaller designation:

| the dossier's state (fate first) | the map's response |
|---|---|
| absent or `active` | open |
| `impaired` (derived from the visible impairments) | open; the physical types wear the building one `condition` step per severity band, the non-physical reach the impaired institution's own dial term only (§4.5 (6)) |
| `remnant` with `privatized`, `downsized`, `reduced_to_watch_post` or `survives_as_remnant` | a smaller designation in place (item 18's mutation) |
| `remnant` with a closure fate (row F2's list), or `removed` | `removed`: `unassign`, `closeUse`, the plot vacant (item 2) |
| `ruined`, `destroyed`, `destroyed_by_disaster`, `ruined_by_decree` | `ruined`: PRESENT as its ruin — its use closed, its building `ruined` (§2.8's existence), counted present by §5.3's dossier row |
| `vacant` (an empty seat, not an empty building) | no physical change |

   A listed ruin stays on the map as its ruin, so a dossier that lists a ruin is never contradicted by a map that shows
   the element open or gone (J-A80.71); an epoch keeps it as it stands — the decline ladder never robs, clears or
   rebuilds its building (§4.11's exemptions) until a dossier event changes its state. A reopen — an element returning
   to `active` — re-opens its use in its own former building first (S10b's `dossier` request ranks it first, §4.7),
   repaired by a `Works` where item 67's clock runs (§4.11) and at once otherwise. A collective record's state is
   distributed over its placed members: the affected share is the severity band's share (all members when the state
   carries no severity), the members chosen on `siting` keyed by the assignment, the dossier event's `seq` its creation
   index (§6.1), and recorded in `memberState`; the record's `state` stays `active` while any member is (J-A80.72).
15. *Population, rung and tier word* (item 81; owner, J80 Q3). A dossier whose population lies below 1 500 is refused by
   the port (`E_RUNG_UNAVAILABLE`, naming the village product, PART III) while no village product is registered: §1.1's
   clamp to a 1 500-person TOWN applies only to a blueprint request that carries no dossier, because a dossier's
   population is a dossier fact and a clamped town would contradict it (J-A81.71). A dossier whose population lies above the 120 000 cap is
   refused the same way — `E_RUNG_UNAVAILABLE` naming the cap, nothing absorbed — and both refusals hold at creation and
   at every absorb (§14's `creation` and `absorb`): §1.1's clamp to the cap serves only a request that carries no
   dossier, because a clamped town would contradict the dossier's population there too (J-A81.01). Inside the ladder the population
   chooses the rung (§1.1) at creation and at each epoch's target (§4.11); the dossier's own tier WORD is a dossier fact
   and the map's title word (§9.5) — a "city" of 5 001 people is drawn on the TOWN rung and still titled a city
   (J-A81.72). A bare tier change with no history entry fires row F8 like any tier receipt (item 13).
16. *Quarters and landmarks — naming claims* (item 82; owner, J80 Q5 and Q6). SettlementForge picks its quarters by a
   name test at generation and never refreshes them, so a quarter enters the map as a NAMING CLAIM, never a zoning
   (J-A82.71): a `neighbourhood` assignment with `claim` set, carrying the quarter's `name`, a kind bias from the
   quarter rows (`tables/dossier/quarters`: Market toward a market identity; Religious toward temple; Noxious Trades
   toward craft with the noxious rows; Waterfront toward docks or riverbank by its phrase; Government toward the seat's
   district; Mages' toward an arcane identity; Artisan toward craft; Shadows toward a low band and a larger hidden
   share; Wealthy and Common Residential toward band biases; Roadside Shrine a shrine claim with a soft edge row; the
   village quarters — Alehouse & Common, Fishing Landing, Woodcutters' Ground — one row apiece), and its location phrase
   as SOFT rows in `criteria`: "Downstream/downwind" → `downstream` and `downwind`; the high-ground phrases →
   `highGround`; "Central" and "Village centre" → `nearCentre`; the water phrases → `nearWater`; "Between market and
   residential" → `nearMarket`; "At the forest edge" → toward the wood land use; "Isolated area (safety concerns)" →
   `far` from the centre; "Old town or slums" → the oldest stage and a low band; "At the settlement edge" → the edge;
   "Spread throughout" → no district; "Eastern district (traditional)" → a soft east row at low weight, a placeholder
   dropped on the owner's word (J80 Q5; J-A82.72). At creation S6's typing reads the claim's bias and rows as soft
   terms (§4.5), so a matching district arises wherever the site allows one; the district whose emergent identity (item
   72, §4.5) best matches the claim carries the name — protected as an assigned name (§10.4) and kept past item 72's
   hysteresis; when no district matches above the claim floor (0.5 of a perfect match; our own value, calibratable) the name waits, reported, and is
   matched again at each epoch — never forced onto a poor match (J-A82.73). An ABSENT quarter is never a fact, and
   SettlementForge's own district names — in its news — are never matched (J80 Q6). A landmark string the roster already
   demands becomes a NAMED-FEATURE claim (granularity `feature`: the way, bridge, quay or pin it names — a notice post
   among the pin kinds, §2.7; `tables/dossier/landmarks`); nothing is created for a string alone.

A whole-neighbourhood assignment sets the district's intent (layer 2) and its class mix — overriding the class-mix
table's weights inside the assigned district (§4.7 S10b, item 71) — while every building stays individually diversified
by the class rules within the drift bounds — drift bounds read against §4.7 S11's designation template (item 19) and
passed to `BuildingGenerator.compose`; a district-defining dossier institution is such an assignment with `existence:
'dossier'`, one district per instance (item 72, §4.5); assignments are events (persist, undo, migrate) and take
precedence over class rules (O10 e). Stable addresses for districts, neighbourhoods, plots and buildings that survive
regeneration and edits are §6.3's.

**Forms catalogue (should-have; the schema is the must-have hook).** A form is a row `{ id, constraints,
growthProgramme, signature }`: constraints (site request, wall rings, plaza position, planned flag, gate count band), a
growth programme (stage regimes and branch tables, §4.4), and a morphometric signature (radial share of arterials,
orthogonality index, street-density profile, block-area CV, enclosed share). Initial rows: `organic`, `bastide-grid`,
`linear-street` (growth anisotropy a = 8 along the main road, §4.4), `radial`, `hill-acropolis`, `bridge-town`,
`port-quay-parallel`, `monastic-close`, `island-city` (shore destinations, §4.2 S3), `confluence`, `twin-town`,
`polycentric` (two or three nuclei, §4.2 S3) and `citadel-and-port` (item 101: a walled upper town on high ground over a
walled lower port — two nuclei of §4.2 S3, the upper on a hill site primitive with its own enceinte, the lower on the
quay front with its own, one arterial joining them); forms compose by growth stage (an organic core with a planned
extension). O10 (g)'s classifier runs on the signature vector.

=== J-ROWS ===
| J-A68.73 | the warp's mean-value rule carries three more point records — a light's point, an access point's opening and a Works' kept rings and lines — each in its host's face, for every host §4.7's light rows or `placeLight` give a light (of several faces, the one `pointLocate` returns); a light (a door light excepted: it keeps its fraction of the footprint ring's edge it stands on, never re-seated) or an access point re-seated at its clearance, else re-placed or orphaned as a pin is; a Works' rings never re-seated | §7.4 |

=== RATIONALE-A ===
| J-A68.73 | Chose to carry a light's point, an access point's opening and a Works' kept rings and lines by the warp's one mean-value rule (§7.4), each in its host's face — a light in the face its host stands on, for every host §4.7's light rows name and any entity `placeLight` names or finds (a junction light in its tunnel's band faces, an access point's foot light in the faces of the element it reaches, a castle's lights in its inner ward, bailey or gatehouse, a shrine's in its decoration's face), the one `pointLocate` returns for the point where the host has several; an access point in its ground host's face; a Works' rings in its target's plot face — with a light or an access point re-seated at its clearance or, when the inset is empty, re-placed by its placement rule if generated and orphaned if placed by hand, a door light keeping its fraction of the footprint ring's edge it stands on instead and never re-seated, and a Works' rings never re-seated, over leaving these records at their old points or re-deriving them after every warp, because each is a stored world point that §2.7 and II.7.4 say moves with its host, a warp during a running demolition must not draw the kept shell where the ground no longer is (the write that survives one path and ghosts another), a light whose host names no face would have neither a carry nor a re-seat test, a door light stands beside its door on the footprint's edge, where any clearance test would push it indoors on every warp and, were it locked, halve every step near it, and a shift by its entrance vertex's displacement alone would leave the facade wherever a warp turns it (by the offset times the sine of the turn: 1.57 cm for a 60 cm offset and a 1.5° turn), while its fraction of its ring edge is that same mean-value image on the boundary itself, and a Works' kept rings are drawn history rather than things that must stand inside a face (§7.4; items 64, 67, 68; repair r1, V-MC0-04; repair r2, VD1-04, VD1-05; repair r3, VD2-01). |

=== END ===
