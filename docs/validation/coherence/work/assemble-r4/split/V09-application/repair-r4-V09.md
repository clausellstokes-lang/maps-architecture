
=== REPLACE ## 1b Wiring table ===
## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into; base records are cited, not
restated, and a cell names a mechanism by its home section. A piece with no consumer or no producer would be a defect
(owner, 2026-09-28: "every piece of engineering is to be wired to something else"); T-V9-12 and T-V9-15 check the two
registries mechanically.

| piece (V09 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|
| `ShellConfig`, `ShellMode`, `HostSlots` (2.2) | the boot (3.1) from media queries and the entry; V08's `embed.html` fills `HostSlots` — its `clerkMode` from the host's `clerk.config` (file f item 473), its `hostName`, its `historyLines` from `host.state` listed at the key the shell passes (`list(effectiveKey())`, 2.2, 2.10), and its `newDocuments` (V08 §3.1 step 7 (b), (c)); rebuilt on every `clerk.config` | every screen; the rail's availability; the export tab's formats; the Assistant button and the clerk slot's kind (`built-in`, or `host` for the card-only drawer); "Set by {host}" (`host.locked`) and a host card's AI mark; the history panel's group "The party" (4.10); the host-mode rule of every action that makes a new document (3.9) | §14 `@plat/app`; file f item 507 (the embed entry) |
| `toolkit.json` rows (2.3) | our table versions | the rail and options strip (4.2), the mapper (3.3), the gestures of §7.1's binding (4.3), the context menu (4.4), `@plat/docs`' tool pages, T-V9-12 | §14 `@plat/tables`; file f item 516 |
| `messages/en.json` rows (2.9, 4.9) | our table versions; V08's `host.*` rows; volume 10's key families and volume 6's `info.copy.condensed`, their `en` texts loaded from their homes (V09 §4.9's sources paragraph) | every bend line, refusal card, toast, hint, fates word, error and panel sentence of this volume; every `says` of a why section, every critique, clerk refusal and notice line the drawer draws, the clerk's button words and the withheld kind words; `@plat/docs`' messages page, one anchor per row (`messages#<key>`, the page a row's **Show me why** opens, V09 §5.15); T-V9-15, T-V10-29 | §14 `@plat/tables`; §5.2 F-EDIT; §7.1's outcome table; file f item 516 |
| a row's `buttons` (`MsgButton` lists; 2.9, 4.9) and the `button.*` rows | our table versions, in `en.json` only; the engine's `MsgRef` arguments they read (file f item 463); the dry run's `ConflictAction`s, `PreviewResult.alternatives` and the dossier's unplaced elements, for `commit`'s sources | the canvas's refusal and bend cards, toasts, the fates sheet and panels (V09 §3.3, V09 §5.3); V09 §4.9's event forms, application commands and V09 §4.5's mode ids; volume 10's cards through V10 §3.5 step 3; T-V9-13, T-V9-15, T-V9-27, T-V10-4 | §5.2 F-EDIT; §11.2; T101-3 |
| `info.copy.condensed` (3.9, 4.9) | V06 §3.15.5's line; the new document's `forkedFrom.seq` above the seq asked (V06 §4.4) | the new document's opening toast after a copy or re-run below a rebase point (V09 §3.9, V09 §4.11); T-V9-15, T-V9-27 | §2.9 `Base`; V06 §3.15.5 |
| the keymap's added rows (4.13) | `keymap.json` | the input layer; the keymap overlay | §14's input scheme; file f item 516 |
| `Draft` and the draft mirror (2.4) | pointer, key, paste and card events | the mapper; the overlay's raw stroke; the recovery offer (3.1) | §9.5 authoring surfaces |
| the mapper (3.3, 4.5) | a settled `Draft` | `preview` and `edit` calls | §7.1's events and toolkit |
| `PreviewState` (2.4) | `preview`'s `PreviewResult` | the ghost (`live.ghost`), the badge, the bend line, the refusal card, the fates shown before Accept | §11.2 `preview`; §8.2 `live.ghost` |
| `VariationSet` (2.4, 3.6) | `preview` with `variations: 3` for a derived fill, or one `preview` per clerk variation (file f item 461); `thumbnail` per preview | the tray; the committed group of V09 §3.6 | §7.3 item 10 |
| feature snap by role (3.4) | the tile worker's `RoleIndex.snap` with a role filter (file f item 517) | the draft's points; the snap highlight; the ruler (4.19) | §9.5; §8.9's snap query |
| wall arcs in the preview (3.4) | `drawWall`'s dry run (file f item 462) | the wall ghost's barrier arcs, the anchor towers, the badge's walled and barrier metres, the enclosed districts' tint | item 106 (a)–(g); §7.1's `drawWall` points form |
| placement alternatives (4.5 T6 `place`) | the top three `SiteCandidate`s of the `sites` query (file f items 463, 468) | T6's faint alternative sites; the refusal and bend cards' "put it here" | §4.7 S10b's closest sites |
| `sizeM2` on a quarter's points form (4.5 T5 `quarter`) | the badge's plus / minus and the size chips | S6's grower's target in `quarter`'s dry run (file f item 348) | §7.1 `PointsForm` |
| `Selection`, `HandleSet`, `CountBadge` (2.5) | clicks, lists, lassos; the selected geometry by V09 §3.5's rules; `PreviewResult.counts` | the context panel, the handles' drags (3.5), `live.selection` | §8.2 `live.selection`; §9.5 |
| the context panel and context menu generator (4.4) | §2.8's entity registry (edit kinds, attribute paths with their labels and help anchors, `factTier`), the entity schemas and §7.8's control registry | panel controls and menu entries → `setAttr`, `setAttrMany`, `editTable`, the kinds §7.1's binding homes; a use's **Find all {kind}s** → the Find panel's kind chip (4.21.10) | §2.8, §7.8; file f item 269 |
| map-side siting, link and split declarations (2.6) | `editTable` row operations on V11's document-only tables `siting.declared` and `siting.linkEdits` from the Shape tab, the per-kind panel, the link view and a clerk's accepted proposal | V11's resolver and S10b's score, the link binding, the split placement (V11 §4.2–V11 §4.4); the `why` and `links` answers | file f item 380; items 104 (a) (1), 105 (h), (j) |
| a wall stretch's grade override (4.7) | `setAttr(enceinte, 'profile/<arc>/grade')` | S7's operator as a fixed input | §4.8; item 106 (c); file f item 360 |
| `WhyCardModel` (2.7) | §11.2's `WhyAnswer` from `query({ kind: 'why' })` (file f item 468; each kind's `WhyProvider`, file f item 270, and each `WhySectionProvider`'s rows, V10 §3.9) with row ids resolved to sentences by V11 §4.5 | the why card (5.8), the source chips (4.7), the drawer's why turn (4.11), the underground panels (4.17) and item 110's panels and why lines (4.20.6) — `sections` drawn by all of them | §11.2's oracle |
| `LinkRow` (2.7) | the `links` query, read from the generation worker's link cache (3.15), bound by S10a/S10b's binding function | `live.links`, the Link card, the GeoJSON `supplyLink` features | §11.2; item 105 (a), (j); file f item 460 |
| a record's members (4.7) | `EntityCard.members` (`query entity`, file f item 468) and `WhyAnswer.members` | the record panel, the gazetteer's counts | §11.2; item 108 |
| `live.shade` provider (5.4) | `ModelView.fieldDriver('daylight')`; V05's held strips (`sky.island.shadeStrip`, `shadePending`) | the Shade view's tiles, its legend and readout; picture exports while it is on | §8.2 live layers; item 102 (f); file f item 411 |
| `live.links` provider (5.4) | the `links` query | the Supply links view (overlay) | §8.2 live layers; file f item 411 |
| `live.voids` provider (5.4) | V01's `districtsAbove` (V01 §3.16) | the Voids view | §8.2 live layers; file f item 411 |
| the Find panel and the view key `find` (4.21.10) | the panel's list, type-ahead and chip grid; **Find all {kind}s** in a use's context menu (4.4); V10's `find` action (4.11; V10 §2.6) | `live.find`; the results list; picture exports and the export dialog's Find line (5.10; §11.1); V10's `read_map { kind: 'find' }` and `FindView` (V10 §3.9b (7)); T-V9-83 | §2.9's `find` and `FindChip`; §9.5; item 120 |
| the Find panel's list and suggestions (4.21.10 (3)–(4)) | §11.2's gazetteer — its class counts and its match listing by class, area and layer — at `effectiveKey()` and the view's drawn week (its `week`, §2.9's `week`); V11 §2.3's labels, synonyms and `findGroup` through V09 §4.16 (3)'s matcher; V08 §3.16 (6)'s dossier entries; V01 §5.4's `findAreas(key)`; at the village rungs V07 §5.5's ends and field groups; the standing crisis looks (§11.2's `looks` reader, 4.21.12 (7)) | the list's sections, the empty box's grid, the suggestions with their counts, the chips they add; T-V9-83 | §11.2; item 120 (b)–(c) |
| `live.find` and its index (4.21.10 (6)–(8)) | per chip, §11.2's match listing at `effectiveKey()` and the view's drawn week (V09 §4.21.10 (7)–(8)); V04 §5.1's `underFindPlaces(doc, ids)` for the ids on underground parts and V05 §5.6 for the matches on Sky, each over the model the view draws (at a drawn week whose frame is not the head, that frame, V06 §3.15.2); V01 §5.4's `findAreas` for an area's shapes; V03 §5.5's `findRooms(plan, b, target)` for each matched building whose plan draws at the interior band | §8.2's Find rows — the veil, halo, outline, pins, count bubbles and ghost pins; the per-layer counts and **Go there**; the storey switcher's marks and "{n} found" and the plan panel's room-list marks (V03 §5.5); the results list; T-V9-83 | §8.2 live layers; §12.5's overlay budget; item 120 (e)–(f) |
| Show gaps (4.21.10 (10)) | the `gaps` flag over the kind chips; V01 §5.4 (3)'s `gapUnits(chip, key, week)` at the view's drawn week (§2.9's `week`), counted by V11 §2.3's `CoverageSpec`, an island's units by V05 §5.6 (4), a village's by V07 §5.5 | the dashed gap outlines labelled "none here" on every layer — the Coverage view's one successor (item 120 (i)); T-V9-83 | §2.9's `find`; §8.2; item 120 (i) |
| `showCircuit` on the wall layer (5.4) | the wall layer's toggle, by `setLayer` (file f item 413) | S14 draws the barrier arcs after commit, in the town and village products (V07 §5) | §8.4 `LayerSpec`; item 106 (g) |
| view keys `thematic`, `workingLayer`, `restore/<id>` (2.1, 2.8) | the view bar; the history panel; for `workingLayer` also Find's **Go there** and a clerk's `useTool` (view keys only, nothing written to the document; 4.2, §8.4) | the live providers; the tools' layer; the restore flow | §2.9 view state; file f item 277 |
| the Show menu's **SettlementForge's chains** entry (5.4) | the gazetteer's `customChain` rows as V08 §5.2's row lists them, read at the view's effective key after each load and each commit | `thematic: 'supplyChains'` → V08 §5.2's thematic row: its lines, legend and GeoJSON | §2.9 view state; §8.2 thematic rows; file f items 277, 410 |
| **New trees** (3.7, 4.5 T12 `dress`) | the Dress panel's button | `rerollLayer { concern: 'render.instances' }` → S14's instance layouts; the history line "New trees" (4.10); volume 10's `DressInput.restyle`, which reads V09 §4.5's T12 row | §6.1's rerollable concerns; §7.1 `rerollLayer` |
| **New decoration** (3.7, 4.5 T12 `dress`) | the Dress panel's button | the group V09 §4.5's T12 row states (J-V9.115) → the render-time hashes of `style.jitter` and `style.crowns` (§6.1; display only); the history line "New decoration" (4.10); volume 10's `restyle` value `'decoration'`, which reads V09 §4.5's T12 row | §6.1's rerollable concerns; §7.1 `rerollLayer`; §7.4 |
| view key `showUnexcavated` (4.17.1) | the Below group's "Show hidden caves and ruins", offered only at tier `secret` | S14's unexcavated style (V04 §5.2), which draws unexcavated and lost clusters; a picture export at `secret` | §2.9, §11.3, §11.1; file f item 278 |
| `ViewOpts.viewAs` (4.8) | the View as menu (a tier); a host's players' view, set by the embed's bridge handler as the party's key form (V08 §3.14 (5)) | §9.2's admission for this view's drawing and labels; `effectiveKey()` (2.10) — the `admitAs` of every band-less read (2.7), the key the shell lists the host's lines with (2.2), the clerk's session key and the export dialog's default knowledge (file f item 453) | §9.2's admission function; §11.2 view options; file f items 464, 572 |
| the base's own view keys placed on screen (4.19) | the Map, Below and Light groups, the Notes panel, the Dress panel, a viewer's style card | `rotation`, `plotsOnly`, `elaborate`, `handLantern`, `weather` (its `snow` offered only where snow can lie, §8.2's snow rule), favourites, notes, public notes, view pins, `stylePreset`, the grid, legend and emblem settings — their readers are the base's | §2.9 view state; §9.5 |
| the ruler (4.19) | key M and the view bar's button | a length or area readout; "Save as annotation" (a view pin) | §9.5 measure tool |
| the system chip and "New ruin / cavern / catacomb" (4.17.2) | the town's `UndergroundSystem` records by name and kind; item 109's admissibility by rung | `drawTunnel { system }`, `drawChamber { system }`, `drawChamber { system: { newKind } }` | §7.1; file f item 361 |
| "How people get down here" (4.17.3) | `AccessPoint.cause`, `UndergroundLink.cause` (V04 §2.2) and the excavation reading's connection graph (V04 §3.5.7) | the access, cavern and ruin panels; "Show the way in"; the access symbol by cause; the access edits | II.7.4; V04 §3.5.7 |
| a lost void's line (4.17.1, 4.21.3) | V04's excavation reading `lost` and its `ExcavationRecord` (V04 §2.2, V04 §3.5.7) | the void's panel line, the Below legend's "Once known" entry, "Show hidden caves and ruins" at tier `secret`; T-V9-73 | II.7.4; item 113 (e) |
| the dwelling closure (4.17.4) | a dwelling or undercity declaration on an `unexcavated` cluster; for **Use another building**, the dry run's `PreviewResult.alternatives` (file f item 372) | the access closure's pieces with the dwelling, dug by V04 §3.8's U-DIG; the bend card's **Use another building** re-preview; the clerk's `propose` for the alternative (V10 §3.16) | §7.3 item 9 |
| the catacomb, crypt and cemetery panels (4.17.5) | `CatacombComplex` (V04 §2.2), `Basement.crypt` (V03 §3.7.4), the crypt join's `AccessPoint` (cause `crypt`), the burial face and V01's opening place | the panels, the extent chart, the bends' words, the fates of an author's delete | II.7.6; V04 §3.5.1 |
| the People panel, the family tree, "Where is", the clock (4.18) | `query people`, `relations`, `whereIs`; the `time` key and `sim.advance` | the panels; the map's highlight of home and work; Find's **Where is someone?** (4.21.10 (3)) | §11.2; §10.3; §14's family-tree view |
| **Re-derive people** (4.3 T10 `hold`, 4.18) | the households chosen in the People panel, or a household's card | `regenerate` of scope `people` (§7.4's regenerate row; §10.3's re-derive people), advancing each `Household.tableVersion` (§2.7), previewed with its fates, one undo step; the history line (4.10); T-V9-12 | §7.4; §10.3 |
| `HistoryRow` (2.8) | the log (and the journal's times) | the history panel, the context panel's History tab, a generic host's viewer filter (`HostSlots.historyFilter`, §11.3) | §7.4 status; §2.9 log |
| `HistoryRow.lines`, `.dossierGroup` and the dossier groups (2.8, 4.10) | the log's `dossierFacts` events — their `changes` count, the `absorbed` week, their `notes` (V08 §3.6 step 4) — and the port's `host:port` events after each; `report(h)`'s `changes` (§5.4); `query({ kind: 'entity', dossierKey })` and `query({ kind: 'entity', id })` at `effectiveKey()` (file f item 583); V06's `EpochReport.raised.suppressedFired` for the epoch rows' lines | the history panel's absorb and creation groups: heads, note lines, report-entry lines, Show (V08 §4.6's absorb group); T-V9-69 | §7.4; §5.4; §11.2; V08 §4.6 |
| the report panel's recipe line (5.7) | §5.4's `GenerationReport.recipe` (the seed, the rung and the preset) | the report's recipe line under its head, `info.recipe.line` with `info.recipe.preset` when a preset is named; T-V9-15 | §5.4 |
| the report panel's dossier section (5.7) | `report(h)`'s `GenerationReport.dossier` and `.dossierNotes` (file f item 390); the note keys by file f item 583; the entries' addresses named by `entity` reads at `effectiveKey()` | the placement list (`report.dossier.<state>`) and the standing-note lines under `host.group.standing`; T-V9-69 | §5.4; V08 §4.6 |
| the report panel's "What its past left" (5.7, 4.21.3) | §2.7's `HistoryRecord` (the peak, its evidence and `symbolic`, the refoundings, the buried systems) and V06's replay record (V06 §2.14) | the report panel's history lines with Show; the symbolic chip on a fact whose provenance carries `symbolic` (§2.8); T-V9-73 | §2.7, §2.8; §4.11; item 113 |
| restore flow and re-run (3.9) | a row or a restore point | `undo(h, of)` groups; `forkAt`, `rerunFrom` (V06 §4.4); in host mode the new document written by `export(h, 'plat')` to the user's device and released, or the controls hidden (`HostSlots.newDocuments`) | §7.4; file f item 458 |
| `JournalEntry`, `LocalDocRecord` (2.11, 3.8) | every API call that changes the log, in two phases; compaction's `export(h, 'plat')` | recovery at open; the recent list; Recently deleted; the file `DocResolver`; `LocalDocRecord.appVersion` read at open (3.1) | §2.9's writer; §11.5 |
| `AppPrefs` (2.11) | first run, the settings screen, hint completion | the shell; a new document's recipe (the `generation` block); V06's history store and frame cache (the device settings V09 §5.12 states, which V06 §2.2 reads) | §7.6's `userGlobal` layer; V06 §2.2 |
| `ClerkSlot`, `ClerkMount`, `ClerkHandle` (2.10) | volume 10's harness (`@plat/clerk`) implementing `ClerkHandle` over V10 §2.6's view model, in host mode for both slot kinds; `ClerkMount.host` filled by the embed's bridge handler (V08 §3.1; file f item 473); `ClerkMount.effectiveKey` from the view key and View as (file f item 464); `ClerkMount.rebuildEvents`, the shell's one implementation of V09 §4.20.3 (4); `ClerkHandle.send`'s `attach.newMap` from the drawer's Start a new map from this | the drawer (4.11); the settings' Assistant section over `ClerkSettings` and the defect list (V10 §2.2, V10 §2.8); V10's `HostProxyBackend` and its session key (V10 §2.3); V10's **Put it back** (V10 §4.3) from `rebuildEvents`; V10 §3.1 (4)'s creation mode from `attach.newMap` | §11.2's clerk API; §14's clerk; file f item 473; V08 §3.1 |
| the skeleton import dialog (3.12) | `GenerationReport.prefix` (file f item 470 (d)); `CritiqueEngine.run` (V10 §3.10); a skeleton's `history` block (V06 §5.3) | the dialog's outcomes, the findings with Show and Fix (a `propose` fix run through the shell's own pipeline), "Check with the assistant" (V10's `critique` route) | §4.1, §5.4, §11.1 |
| the creation preview (4.11) | a creation proposal's scratch document (V10 §3.11 (3); file f item 469), in the empty state or after the drawer's Start a new map from this (standalone only) | the read-only view under its banner; acceptance opens the new document (V09 §3.2 (3)'s rule for the untouched empty-state town) | §11.2 |
| massing handles and the family strip (3.5) | V02 §4.5's contract; one `setMassing` dry run per feasible family | `reshapeRange`, `moveTower`, `setComposition`, `setMassing` | V02 §4.1, V02 §4.5 |
| the export dialog (5.10) | the user's options; its default knowledge, the view's effective key (2.10) | `export(h, fmt, opts)` with `knowledge` lowered only (file f item 453) and the VTT details (file f item 454); V06's `chronicle.csv`, `uses-history.csv` and animated history; V10's transcript | §11.1 |
| the share sheet (5.11) | `export(h, 'permalink')`, §6.4's refusal conditions | the clipboard; the file download | §6.4, §11.5 |
| the three load outcomes (3.14 (a)–(c)) | `open`'s load (§2.9 *Load* steps 2–3; §6.4's retention window) | V09 §3.14 (a)–(c)'s screens and their actions; the history rows (4.10); T-V9-67 | §2.9 *Load*, §6.4, §7.4's rebase row, §7.5 |
| the locus wording (4.16 (6)) | a `Locus` (a roster line's, an `assign`'s) and its target's name from the `gazetteer` query at the view's effective key (2.7) | `refuse.roster.dossier`'s `{locus}` (4.9), the history template "Asked for {name} {locus}" (4.10), volume 10's `dossier` row (V10 §3.16); T-V9-13 | §7.1's `Locus`; §11.2 `gazetteer` |
| `F5Record`, `UxSittingRecord` (7.3, 7.4) | the first-five-minutes sessions; the owner's sitting | `MilestoneRecord.ux` of M2a, M3a, M3b and M3c — M3c's clerk session (file f item 490; §13.4) | §13.3, §13.4, §13.6's protocol shape |
| `TrialRecord` (7.6) | the game-master trial's sessions and its report (item 112 (b)) | volume 12's calibration record and the fix list; §16's release gate (T112-2); T-V9-72 | §13.2 (T112-2); §16's release gate |
| the canvas script (3.12, 7.2) | the known-city fixture's gesture list, each gesture with its view scale and centre | the app harness; T101-6's agreement bar | §13.2's elegance bars; §13.4 harness |
| item 110's events (4.20; file f item 362): `drawWall` of kind `retaining` with `highSide`, `drawWay` with `raised` and the `aqueduct` class, the `terrace` sugar, `setAttr` of `spans/<n>/use` | T3 `wall`'s Retaining wall mode, T2 `ground`'s Terrace mode, T4 `road`'s Raised toggle and Aqueduct chip, T9 `shape`'s span chips; volume 10's encoders; a skeleton's prefix | the fold (the base's `RetainingWall`, raised parts and span use); the journal (3.8); the history templates (4.10); T-V9-12's walker | §7.1 (file f item 362) |
| a crossing's form and a raised way's deck paths (4.20.6; file f item 364) | the panel's Stair · Ramp chip, the Deck height and Arch spacing steppers | the fold (file f item 244's held `clearanceCm` and `spanSpacingCm`, read by its support step and the course solver); the history row by its path label (file f item 269) | §7.1's ways row; §2.7 |
| a removal of generated content and its suppression (4.20.3) | the Delete key, the context menu and T10 `hold` (a plain `delete`); the fold writes file f item 260's `detail.suppress` | V06's ledger and every generator (V06 §2.13); `info.remove.holds`; the history row's "Build it again" and `ClerkMount.rebuildEvents` (one function, V09 §4.20.3 (4)); the skeleton (file f item 455) | §7.1, §2.8; file f item 260 |
| the preview's effects (4.20.7; file f item 465) | the engine's dry run, filled from the owning volumes' rows (V02's deck buildings, V03's stored plans, V04's arch vaults, the base's routes, junctions and water) | the badge's "and {n} other changes", the fates sheet's "What else changes", the live region, the clerk's card, T1 `intend`'s whole-town ghost | §11.2 |
| the hit stack and `Selection.kind 'part'` (4.20.8; file f item 466) | the tile worker's hit-test slices; for a sky hit, the point un-displaced by the island's offset (V05 §4.2; V09 §3.4) | click-again cycling, "Select below", the span and crossing panels, T11 `name` on a raised way, the touch menu, volume 10's `entity { at }` | §11.2's `hit` |
| handle kinds `rampEnd`, `terraceLevel`, `tierStep`, `tierCentre`, `tierRadius`, `shrineInset` (2.5, 3.5) | V09 §3.5 from the selection | the mapper: `moveVertex`, `terrace`, `setMassing { op: 'tiers' }` | §9.5 |
| the Raised toggle and the Aqueduct chip (2.4, 4.20.2) | T4 `road`'s options strip; PageUp and PageDown while drawing | the mapper's `raised` and `class`; the badge (memory only, reset on tool entry) | §7.1 |
| T9 `shape`'s tier controls (4.20.5) | a selected `stepped` building at the building band | `setMassing { op: 'tiers' }`, `setAttr` of a tier's heights, shape, skirt and solid (V02 §4.6) | V02 §4.6 |
| "Keep them as yours" (4.20.3) | T1 `intend`'s whole-town ghost when a Re-derive drops generated raised ways | declared `drawWay { raised: true }` events in the Re-derive's group | §7.1 |
| "Raised ways the town builds by itself" (4.14) | the advanced panel's Streets group | `editTable` on volume 11's `raisedWays` chances, read by every raised-way generator (V06 §2.13); the dry run's "Remove them too" | §7.6 |
| the item-110 exports and the deck scene (5.10; file f item 447) | the exporters | the export dialog's rows; T-V9-61 | §11.1 |
| removals in the skeleton (3.12; file f item 455) | Export skeleton | the import dialog's *kept removed* and *nothing to remove* rows; T-V9-62 | §11.1 |
| the second known-city fixture's canvas script (7.2) | the test tree, written from its brief | T-V9-56, T-V9-3's measurement, volume 12's golden (V12 §3.14) | §13.2, §16 (item 110 (e)) |
| the tables editor's cell inspector (4.14) | V12's register entries (`CalibrationEntry`, V12 §2.6) through `dist/evidence.json` | each cell's status, reference, due milestone and evidence lines; the presets dialog's historical packs | §7.6; V12 §2.6 |
| T2 `ground`'s spring flag (4.21.1) | T2 `ground`'s **Lake** mode, its **Spring-fed (oasis)** toggle | `drawWater` whose points form carries `spring` (§7.1's `PointsForm`; item 111) → S1's oasis with its grove and gardens (§4.2 S1); the badge's grove and garden lines; the history template "Made an oasis at {place}"; T-V9-71 | §7.1; §4.2 S1; item 111 (a) |
| view key `cvdVariant` (4.21.2) | the view bar's **Colour vision** chip; Settings' Accessibility section, its machine default `AppPrefs.cvdDefault` | the tile key and the sheet's checked variant (§8.2); the legend's swatches (§9.5); picture exports while it is set; T-V9-72 | §8.2; §2.9; item 112 (a) |
| the second cues of this volume's thematic views (5.4) | V09 §5.4's view rows (a cue per colour-coded meaning) | the live providers' marks and the legend; the style check (T112-1) | §8.2's second cues; item 112 (a) |
| the history option on T1 `intend`'s sheet (4.21.3) | T1 `intend`'s **History** chip (standalone, or a host with no dossier history) | `adjust` of §4.2 S0's history option (`Recipe.history`) → the replay (§4.11; V06 §3.20); the whole-town ghost with its fates; T-V9-73 | §4.2 S0; §4.11; item 113 (a) |
| the wall repair's material (4.21.4) | T3 `wall`'s **Repair** mode, its **Material** chip (robust, or a patch row of V11's `walls.patchMaterials` by the wall's kind and culture) | `convert repairWall` with its material (§7.1; item 114 (f)); the history template; the wall's panel line; T-V9-74 | §7.1; §2.7 `Enceinte.condition`; item 114 |
| the wall states in the legend (4.21.4, 5.4) | §8.2's state rows for `standing`, `worn`, `patched`, `breached`, `dismantled` | the legend panel's wall lines and each state's second cue; T-V9-74 | §8.2; §9.5; item 114 (e) |
| the grandeur note (4.21.5) | the dry run of a hand placement or reshape above the rung's grandeur ceiling (item 115 (c)): honoured, its line `info.grand.beyondTier` | the preview card and the badge's line, the building's why card fact; V10's explanation (V10 §3.9); T-V9-75 | §7.1's outcome table; §4.7 S10b; item 115 |
| the zoom-out stop (4.21.6) | §8.8's per-map zoom-out limit (the stop where `bounds` fits the viewport's short side, plus one; stop 0 where none fits), over the bounds of town and camps while a crisis look stands (§2.9's *The crisis framing*) | the view bar's zoom control and its tooltip (`info.zoom.limit`, `.limitCamps`, `.coarsest`), the wheel and pinch, **Fit the town**, the opening view, the export dialog's frame; T-V9-76 | §8.8; §9.5; §2.9; items 116, 122 (i) |
| the season control (4.21.7) | the view bar's **Season** control: a week slider, the four season chips and **Follow SettlementForge** | §2.9's year position and follow flag → §8.2's season rows; the export dialog's season line; V10's explanation; T-V9-77 | §2.9; §7.7's DR42; §8.2; items 117, 125 |
| the progress view (4.21.9) | the worker host's stage messages (§11.2's worker boundary (`onProgress`); §12's progress rule) and each one-time wait's own steps (epochs, export tiles, replayed calls; the events a Go back to here undoes, from `edit`'s `onProgress`, §11.2's `'undo'`; an open's verification replay, `'verify'`); the cadence chosen where a run coarsened (`EpochReport.advance.cadenceWeeks`, `ReplayPlan.epochYears`; V06 §6.8) | the progress strip and its line (`progress.*`, naming the cadence), the view status's `progress.verify` line, the first map's stages filling in under it; **Stop** through `cancelAdvance` and `generate`'s and `export`'s `signal`; T-V9-79 | §12 (item 119, (a2)); §11.2 |
| the edge suite's outcomes (3.16) | each mechanism's own inputs at their limits | the `edge.*` rows, the refusals and bends named there; T-V9-80 | §5.1's ladder |
| the festival list (4.21.8) | §11.2's `looks` reader (`LooksAnswer.festivals`: §7.7's DR43, the dossier's festivals and their weeks) or, standalone, the generic festivals by culture and season | §2.9's festival display (follow · off · preview a festival) → §8.2's decoration rows; the export's festival name; T-V9-78 | §2.9; §7.7; §8.2; item 118 |
| `AppPrefs.resolution` and the view-status chip (4.21.11) | Settings › Display › **Resolution** (5.12); §8.8's Auto loop's level in force and its reason | §8.8's resolution ladder and tile DPR at boot and on each change; the chip and its tooltip; `info.resolution.fallback`; T-V9-84 | §8.8; §8.4 (g); J-R22; item 121 |
| the view key `crises` — Show crises and the crisis preview (4.21.12 (1)–(2)) | the Show menu's switch and **Preview a crisis** (the look kinds of §10.2's crisis look table) | §8.2's look rows; the legend's crisis entries (§9.5); the crisis framing (4.21.6); the picture exports' line (5.10); T-V9-85 | §2.9's `crises`; item 122 (e) |
| the crisis why lines, card and forces' numbers (4.21.12 (4)–(5)) | §11.2's `looks` reader (`LooksAnswer.crises`: the standing `ConditionOverlay`s by §7.7's DR44, admitted at the view's effective key, each look's `name` — the condition's name as V08 carries it from the dossier — and its forces' and groups' sizes as V08 carries them from the dossier, item 122 (h), and a disaster look's units in `districts` — V01's `disasterDistricts` at the view's key, evaluated in the generation worker, V01 §3.16; §10.2 (d)); for a building's why card the same reader asked with that building, each `disaster` entry's `over` (the look stands over it, §10.2 (f)); each look row's `label` (V11 §3.25.9); `live.crises`' marks by look (§8.2), for **Show**'s frame | the crisis card, the legend's crisis entries, the why card's `facts` row (5.8), Find's `crises` section (4.21.10 (3)); volume 10's explanations (the same keys); T-V9-85 | §7.7's DR44; §10.2; §8.8's ring; item 122 (f), (h)–(i) |
| the damage lines (4.21.13) | V03's damage layer (§2.6 step 7; §6.3's `plan.damage`) at V06's `decayLevel(doc, lineage, week)` by §6.3 *Plan damage*'s comparison, read at `effectiveKey()`; for the plan panel only, V03's `planDamage` with `PlanDamage.look` set — a disaster look standing over the building (§10.2 (f); V03 §5.6 (4)) — its lines at `PlanDamage.level` (the look's `lookLevel` by severity, or the own level where that is higher) | the plan panel's lines; the why card's `plan` section at the building's own level only (`info.damage.*`; V03 §4.6); volume 10's explanation (the same keys); T-V9-86 | §2.6 step 7; item 123 (e) |
| `AppPrefs.weatherEffects` and **Start a shower now** (4.21.14) | the advanced panel's device group (4.14); its default by §8.8's tier and reduced motion | §8.4's per-frame weather layer at §8.8's place; the session's weather timeline (§6.1's `view.weather`) and its next spell; T-V9-87 | §2.9's *Weather effects*; §6.1; §8.4; item 124 (g) |

**The dossier facts this volume shows** (it writes none; each is read through the port's digest and §7.7's rows):

| fact shown | dossier field (`DossierDigest`, §14) | the rule that carries it to the map | where it appears (V09 §) |
|---|---|---|---|
| the title's tier word | `settlement.tierWord` | §7.7 item 15 | top bar and the `title` label (5.1) |
| a locked population | `settlement.population` | §7.7 item 15; host mode's `lockedControls` (V08 §5.1) | T1 `intend`'s size card, the basic panel (4.5) |
| a dossier-owned name or kind | `institutions[].name`, `.kindLabel`, `.kind` | §7.7 item 11 (the refusal) | the panel's locked fields, `refuse.dossierOwned` (4.4, 4.9) |
| a place's knowledge | `institutions[].knownTo` | §7.7 item 7 | "Who knows this place" chips, locked (4.3) |
| a collective range | `institutions[].count` | DR9, item 108 (b) | the record panel's "between 5 and 10" (4.7) |
| why an element is as it is | the change envelope from `receipts` | §7.7 item 13 (`DossierChange`) | the why card's "Since week …" (5.8); history rows (4.10) |
| how the map read the record (the port's notes) | the digest fields each `PortNote` kind names (V08 §4.6's table) | V08 §3.6 (4) (`dossierFacts.notes`, `DossierBinding.notes`) | the history's note lines under an absorb or creation head (4.10) and the report panel's standing notes (5.7) |
| a custom kind's profile sources | `institutions[].category`, `.tags`, `.custom` | item 104 (a) (2)–(7) | the profile chips (4.7, 5.8) |
| the tier of every field | the registry's dossier paths | §2.8's `factTier` over §7.7 item 12's binding | every tier chip (4.4) |
| an ancient ruin | `site.deposits` of kind `ancient_ruins`; an institution of scene archetype `ruined-landmark` | DR19, DR24 | a ruin's why card: "SettlementForge's record names ruins here" (4.17.3, 5.8) |
| a magical node, ley lines, a magical history | `site.deposits` of kind `magical_node`; the "Magical ley lines" income rows; `history.events` of type `magical` | DR19; `HistoryHint` | a ruin's why card (the source in words) |
| mining | `site.deposits` of the mining kinds | DR19 | a cavern's why card ("Mining here makes caves likelier") |
| the cathedral | `Cathedral (10,000+ only)`, `Great cathedral` | DR9 | every cathedral's "Below" line: its crypt, always, the largest (4.17.5) |
| how many catacombs | the church records (`Parish church` and its ranges, `Monastery or friary`) and item 108's collective members | DR9, DR10; V04 §3.5.1 (3) | the catacomb panel's count sentence (4.17.5) |
| the burial faces | `Parish burial grounds`, `Burial ground`, `Burial grounds and charnel house`, `Graveyard`, the `Cemetery network` grounds | DR9, DR10, item 108; V04 §3.5.1 (1) | the cemetery's "Catacombs below" line; the catacomb's "Under {burial face}" (4.17.5) |
| a crypt record | an institution matching the subterranean row `crypt` | DR17 (file f item 386) | its church's "Below" line (4.17.5) |
| a forced system or undercity | the `tables/dossier/subterranean` rows; `CircumstanceSlice.undercity` | DR17 (file f item 386) | the system's why card ("SettlementForge's record puts it here"); an access of cause `dossier` (4.17.3) |
| an aqueduct's reason (the water system) | the records bound to `conduit_house` (`Aqueduct or water system`, `Advanced water infrastructure`) and the demand records | DR34 (V08 §2.6b (1)) | a raised way's why card: a `facts` row of tier `dossier` under "The town raised it: it needed water" (4.20.6) |
| an elevated road's reason (high ground) | the dossier-bound institutions of class significance ≥ 20 and the custom `landmark` records at their reservations | DR35 (V08 §2.6b (2)) | the same card's `ref` rows, withheld names read by kind (4.20.6) |
| a toll bridge on a dry site | the dossier's toll bridge | file f item 399 | the bridge's why card; nothing else in V09 |
| that nothing of item 110 is dossier-bound | — | V08 §2.6b (5) | every raised way, retaining wall and deck plot is removable by the plain delete (4.20.3) |
| an oasis | `site.deposits` of kind `oasis_water` on an arid site | DR40 (item 111 (a)) | the water body's why card: "SettlementForge's record puts water here" (4.21.1, 5.8); T2 `ground`'s spring toggle locked on it |
| the town's past | `peakTier`, the high-water population, `tierHistory`, `populationHistory`, `calamityHistory`, the history's events, the lifecycle's destruction and resettlement | DR36–DR39 (item 113) | T1 `intend`'s History chip reads "From SettlementForge's record" and is locked; the report panel's "What its past left"; the symbolic chip (4.21.3) |
| a wall's condition at generation | the settlement's `readiness` label and its wealth | §7.7's DR41 (item 114 (d)) | the wall's why line (4.21.4) |
| a building specified as grand | a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1) — V08 §3.16 (3)'s "specified", item 115 (c) | §4.7 S10b's ceiling, lifted for it | the building's why fact "Named in SettlementForge's record" (4.21.5) |
| the week | the dossier's latest stamped tick — the greatest of its conditions' `triggeredAt`, its calamities' and its history's ticks (item 125 (b)) | §7.7's DR42 | the Season control's week while **Follow SettlementForge** is on; with no stamped tick, the control's own week (4.21.7) |
| the festivals | `traditions[]` and the custom-content traditions (their windows and staging) | §7.7's DR43 (item 118) | the festival list with its weeks (4.21.8) |
| the crisis looks | the dossier's stressors and active conditions (§2.7's `ConditionOverlay`s), their names, and the forces' and groups' sizes where given (item 122 (h)) | §7.7's DR44 | the crisis card and its numbers, the why lines, the legend's crisis entries, Find's crises (4.21.12) |
| Find's dossier entries | the dossier's named entries, its names first (V08 §3.16 (6)) | §7.7 item 12's binding keys | Find's `dossier` section and its dossier chips, re-evaluated by key and anchor (4.21.10) |
=== END ===

=== REPLACE ### 2.6 The map-side declarations file g asks the interface to store ===
### 2.6 The map-side declarations file g asks the interface to store

Items 104 (a) (1), 105 (h) and 105 (j) let the author override siting, keep a split works-and-shop pair on one plot, and
pin, move or cut a supply link — "stored map-side … never written to the dossier". They live in volume 11's two
**document-only tables**, `siting.declared` and `siting.linkEdits` (V11 §4.2, file f item 380), edited by `editTable` row
operations with V11 §4.4's lifecycle (the inverse row operation undoes; a key that no longer resolves is orphaned and
reported in the history panel's orphans, V09 §4.10) and V11 §4.3's locality (a placed use is kept and listed with the score
it would gain by moving). One store: the solver, the clerk and the canvas read and write the same rows (J-V9.36). This
volume maps each screen to its row operation:

| screen (V09 §) | table | key | cells written | owner rule |
|---|---|---|---|---|
| "All {kind}s in this town", the per-kind panel (4.7) | `siting.declared` | a kind key: `uid:<localUid>` for a custom kind; `cat:<catalogId>` for a dossier catalogue kind; `cls:<class>` for a roster class no dossier record binds | `familyWeights` (below); `profile` (a `Partial<SitingProfile>`, V11 §2.3, from "Edit the details"); `split: false` ("Keep works and shop together for every {kind}"); `quarter` ("Put them in {quarter}"); `place` ("Put them here") | item 104 (a) (1) |
| "Keep them where they are", on the per-kind panel (4.7) | `siting.declared` | one `use:<address>` row per member the kind has now, in one group | `pin` on each (a member added later is not pinned; the panel says "Pinned {n} of them where they are") | item 104 (a) (1) |
| "Keep together on one plot", on one split institution (4.7) | `siting.declared` | `use:<the works use's address>` | `split: false`; "Let the rules decide" deletes the row | item 105 (h) |
| the link view (4.7) | `siting.linkEdits` | `<consumer use address>/<good>` (V11's key) | `bindTo` ("Keep this supplier", "Use another supplier"); `avoid` ("Cut this link": the provider joins the list, the next nearest serves); `cut: true` with neither ("Stop buying {good} here": no pull for that good at that use); "Reset" deletes the row | item 105 (j) |

**The tables' shape** is V11 §4.2's: the key forms `uid:`, `cat:`, `cls:` and `use:`; a kind key admits
`profile`, `familyWeights`, `quarter`, `place` and `split`; a `use:` key admits `place`, `pin`, `split` and
`specialisation`; `siting.linkEdits` cells are `{ bindTo?, avoid?, cut? }` with the three meanings of the table above.
Every screen writes only a cell V11 §4.2 declares for its key form.

**The family multipliers** (this section is the home of their words; V09 §4.7 and V10 cite it). `familyWeights` is
V11 §4.2's cell, its values and meaning there; V09 §4.7's chips word its five values Ignore 0 · Less 0.5 · Normal 1 ·
More 2 · Much more 3, one chip row per family id of V11 §2.4's enum (`nuisance`, `need`, `clientele`, `supply`,
`alignment`, `competition`, `coverage`, `sun`), and a family the cell does not hold reads Normal (V11 §4.2).
**No per-use siting weights** (J-V9.36): a single place is moved (`relocateUse`) or pinned (`placeAt`, T6 `place`) — the owner's
per-kind declaration is the row, and one member's site is its own edit. **Tier and dossier.** Each row is `declared`
(§2.8's `factTier`) and held by every re-derivation (§7.2). A dossier-backed kind accepts rows — they change where the map
puts or binds things, never a dossier fact (item 20 (h)) — and no row is ever written to the dossier. A dossier event that
removes the kind orphans its row, reported (V11 §4.4). **Class-wide rules** — a class's profile cells in `roster.classes`
for every town — stay the tables editor's (V09 §4.14).
=== END ===

=== REPLACE ### 2.7 The answers the panels render ===
### 2.7 The answers the panels render

The panels read §11.2's `query`. **The oracle's answer is §11.2's `WhyAnswer`** (file f item 468), produced by each kind's `WhyProvider`
(V10 §2.13; file f item 270); this volume adds none of its fields (J-V9.33). The why
card (V09 §5.8), the source chips (V09 §4.7), the drawer's why turn (V09 §4.11) and the underground panels (V09 §4.17) render
one app-side projection of it, `WhyCardModel`, built on the main thread from the answer and the row sentences V11 §4.5
resolves; it is session-transient and never saved. It reads `query({ kind: 'why', id, …, view })` with the view its card
or panel opens on (§11.2's view-bound why), so a provider whose rows state a view's look — V07 §4.5's crisis, season and
festival rows — reads that view's week, year position, festival, crises and looks.

```ts
interface WhyCardModel {
  subject: { id: Id; kind: string; name?: string; tier: FactTier; withheld?: true };
  decidedBy: MsgRef;                              // from the oldest `cause` entry (table below)
  bars: { text: string; target?: Id; share: number /* signed */; source: 'pull'|'driver'; withheld?: true }[];   // ≤ 12, by |share| descending
  more: number;                                   // the bars beyond 12
  closure: MsgRef[];                              // an enceinte's barrier arcs, one line each
  links: { text: MsgRef; other: Id; declared?: 'bindTo'|'avoid'|'cut' }[];
  members?: { text: MsgRef; ids: Id[] };
  chips: { family: string; text: MsgRef; lowConfidence?: true }[];
  alternatives: { n: 1|2|3; plot: Id; score: number; hardFails: string[] }[];
  facts: { label: MsgRef; value: string; tier: FactTier; row?: string }[];
  dossierLine?: MsgRef;
  drifted: boolean;
  sections: { kind: string /* V10 §3.9's section name */; title: MsgRef /* 'why.section.<kind>', V09 §4.9 */;
    rows: { text: MsgRef; value?: string; tier: FactTier; target?: Id; withheld?: true }[] }[] }   // after facts, in the providers' registration order (V10 §3.9)
// a void's depth, excavation reading and ways down are the `underground` section's rows (J-V9.82)
```

| card field | read from `WhyAnswer` | rule |
|---|---|---|
| `decidedBy` | the oldest `cause` entry | an event carrying `EditBase.dossier` → "Placed here by SettlementForge's record"; a declaring event of §7.1's toolkit by the user → "You placed it here" ("You accepted the assistant's proposal" when it carries `proposedBy: 'clerk'`); `step` S10b → "The rules put it here"; `chance` present → "Placed by chance among equal sites"; an epoch → "The town's growth put it here in {year}"; **item 110** (V09 §4.20.6): a raised way's line is its own `raised` section row — `info.raised.built` (at an epoch with its year), `.carried` or `.declared`, in V10 §3.9's words — which the section block then does not draw again (J-V9.82); a retaining wall the levelling made → "The ground was levelled here; it steps {m} m"; a span walled up by the rules → "An arch of {way}, walled up as a vault" ("… by you" after a span edit); otherwise "The rules made it" |
| `bars` from pulls | `pulls` | length \|`share`\| against the largest in the answer; side by sign (left a push away, right a pull toward); text: the `row` id resolved by V11 §4.5 — a family row's `says` with the target's name, a signature pair's `reason`, a class row's note, a supply edge's good; the target named and clickable (Show) |
| `bars` from drivers | `drivers.terms` (a district, block or plot; item 102 (f)) | each term's `delta` as a bar; `daylight` reads "In shade {p} % of the day"; the others by their catalogue rows `why.driver.<driver>` |
| `closure` | `closure` (an enceinte, gate or tower; item 106 (g)) | "The {barrier} closes the circuit from {from} to {to}" per arc |
| `links` | `links` | role `consumer` → "Buys {good} from {other} ({distM} m, {near enough \| a long way})", role `provider` → "Sells {good} to {other}"; "near enough" when `distM` ≤ `comfortM`; the orientation in words ("works near its source", "sells near its market", "balanced"); `branchOf` → "its shop" or "its works" |
| `members` | `members` | "{count} {kind}s (the town's size asks for {min} to {max})" and the step in words (V09 §4.7) |
| `chips` | `profile.sources[].rung` | declaration → "yours"; archetype → "from its picture type"; category → "from its category"; tags → "from its tags"; library → "from its library entry"; keywords → "guessed from its name" in the low-confidence tone; fallback → "a general guess" |
| `alternatives` | `alternatives` | numbered outlines at `plot` while the card is open |
| `facts` | `facts` | the registry's path label (file f item 269), the tier chip, and for a `row` "from SettlementForge's record, by rule {row}"; a fact whose provenance carries `symbolic` (§2.8; item 113 (f)) adds the chip "size not recorded" (`info.history.symbolic`, V09 §4.21.3) |
| `dossierLine` | the newest `history` entry with a `change` | "Since week {w}: {reason}" |
| `drifted` | `evaluated.drifted` | "Today the rules would put it elsewhere; it stays." |
| `sections` | `sections` (§11.2's `WhySection`: each registered provider's rows, V10 §3.9, V10 §3.9a) | one block per section, in the answer's order, after `facts`; `title` the key `why.section.<kind>` (V09 §4.9); per row: `text` its `says` (a key of the families of V09 §4.9's sources paragraph), else the registry path label of its `key` (file f item 269); `value` its `value` with its `unit` in the user's units (`AppPrefs.units`); `tier` its tier chip; `target` its `ref`, named and clickable (Show); a `withheld` row reads "somewhere the viewer doesn't know"; a `purpose` row never arrives (the facade drops it, V10 §3.9). The underground panels (V09 §4.17), item 110's panels and why lines (V09 §4.20.6) and the drawer's why turn draw these same rows, so one `MsgRef` is one sentence everywhere |

A withheld target, member or link end reads "somewhere the viewer doesn't know" (§11.2 *Knowledge* (2)); a withheld
subject shows its kind and nothing else.

**Every band-less read speaks for its view** (J-V9.86). §9.2's admission function (E-17) decides what a key admits; the
application only chooses the key. Every `query` the application makes for a view — `why`,
`entity`, `sites`, `links`, `gazetteer`, `people`, `whereIs`, `relations`, and any band-less kind added later — is sent as
`query(h, q, { admitAs })` with the view's effective key (V09 §2.10's `effectiveKey()`, in file f item 572's form), so the why
card, the source chips, the context panel, the gazetteer and "features in view", the Link card, the record panel's
members, the People panel, the family tree, "Where is" and T6 `place`'s alternative sites admit only what View as admits; a
cached answer is dropped and re-asked when `onEffectiveKey` fires. The view-bound reads — the tiles, the labels and the
hit stack — read `viewAs` through §9.2's admission function (file f item 464). The export dialog's default knowledge is the same key
(file f item 453; V09 §5.10). The application's own dry runs — the ghost, the badge, the fates sheet, the refusal and bend
cards, the effects list — carry no `admitAs`: they confirm a change the user commits under the role's key, and a filtered
dry run drops concealed uses from its fates (file f item 470 (b)), so the person accepting would not see all the change moves;
the View as banner stays up above them. The clerk passes its own `admitAs` (V10 §2.3).

**The supply links** are the one list the oracle does not give per view, so `query({ kind: 'links', … })` (file f item 460) returns
`LinkRow`s, read from the generation worker's link cache (V09 §3.15):

```ts
interface LinkRow {
  consumer: Id; provider: Id; good: string;
  distanceM: number; comfortM: number; maxDistanceM: number;
  satisfaction: number /* 0–1: 1 within comfortM, falling to 0 at maxDistanceM, item 107 (b) */;
  mode: 'road'|'water'|'any'; volume: number /* the good's relative volume, item 105 (c) */;
  orientation: 'source'|'market'|'balanced';      // §11.2's WhyLink field, item 105 (b)
  declared?: 'bindTo'|'avoid'|'cut';              // a siting.linkEdits row names it (V09 §2.6)
  chain?: WhyLink['chain'];                        // item 105 (i): a SettlementForge chain's id, status ('impaired'|'vulnerable') and an entrepôt's end — §11.2's type, cited
  source: 'class'|'dossier'|'custom'; withheld?: true }
```

**A record's members** are `EntityCard.members` (`query({ kind: 'entity', id })`, file f item 468) and `WhyAnswer.members`; this
volume asks for no query kind of its own for them (J-V9.42).

**The shade raster.** The shade map view (V09 §5.4) reads item 102's daylight-share driver `D(x)` as the field keeps it —
a raster at the prosperity field's cell size, held by the generation worker beside the field (recomputed on load with the
field, never stored, §2.9) — through the live-layer model view: `ModelView.fieldDriver('daylight'): { cellCm: number;
origin: PointCm; w: number; h: number; values: Uint8Array /* 0–255 ≙ D 0–1 */ }` (file f item 411). Where the field did not compute it (a table with `w_sun` = 0 may skip the sampler), the accessor runs item
102 (a)'s sampler on demand in the generation worker over the same casters and caches it for the document state, within
V09 §6.4's cost law, so the view works whatever the weight and never changes the field. A floating island's contribution is
never sampled here: its strip is V05's held strip (V05 §5.1's `sky.island.shadeStrip` and `shadePending` rows), which the
view draws as V05 states it (V09 §5.4).
=== END ===

=== REPLACE ### 2.12 Lifecycle of every new state field ===
### 2.12 Lifecycle of every new state field

| state | create | read | persist | regenerate / re-derive | undo | migrate |
|---|---|---|---|---|---|---|
| `Draft` | pointer-down or a card pick with a tool active (V09 §3.3) | the mapper, the overlay, the badge | memory; mirrored as `DraftMirror` | a committed event underneath (another client, an epoch) re-previews it at its next settle | n/a (not in the log); Esc or cancel drops it | n/a |
| `DraftMirror` | every settle of a live draft | the open flow (V09 §3.1) | IndexedDB `drafts` | — | deleted on commit or cancel | a mirror whose `appVersion` schema differs is discarded with the note "Your unfinished drawing was from an older version and could not be restored." |
| `PreviewState`, `VariationSet` | each settle (V09 §3.3), each "Show three more" | the ghost, tray and badge | memory | a stale result (older `gen`, or `logHead` moved) is dropped and re-requested | n/a | n/a |
| `Selection`, `HandleSet`, `CountBadge` | a click, a list pick, a lasso; derived from the selected geometry; from the preview | the context panel, the overlay | memory | recomputed when the selected entity's record changes (a `doc.changed` naming it) | the selection survives undo when its ids still exist, else it clears | n/a |
| `HistoryRow` | derived from the log | the history panel, the context panel's History tab, `HostSlots.historyFilter` (V09 §1b) | never | recomputed per log change | — | the templates are keyed by event kind, one for every kind of the base and volumes 1–8, and for item 110's variants by their discriminating field (`drawWall.retaining`, `drawWay.raised`, `drawWay.aqueduct`, `terrace`, `setAttr.spans/use`, `setMassing.tiers`; V09 §4.10; T-V9-15's walker); a kind from a newer version renders "A change made with a newer version of the editor"; `lines` and `dossierGroup` are derived with the row (V09 §4.10) and never stored |
| `RestorePoint` (`restore/<id>`) | the Restore-point button; the auto rules of 2.8 | the history panel | the document's view section (shared) | unaffected (a log position) | deleting a point writes the key to `null`; a restore is itself undoable (V09 §3.9) | a point whose `seq` exceeds the log (a truncated log, §7.4) is shown "at the latest state" and re-pointed on the next save |
| view keys `thematic`, `workingLayer` (per viewer) | the view bar; for `workingLayer` also Find's **Go there** and a clerk's `useTool` (V09 §4.2: view keys only, nothing written) | the live providers, the tools; `workingLayer` also the view's drawing of its layers (§8.4: the working layer drawn whatever its `LayerSpec.visible`) | the document's view section; never over a bridge | — | not logged (view state); the previous value is one click away | an unknown value reads as the default (`none`, `ground`); an older `thematic: 'coverage'` reads `none` with `find` `{ chips: [], gaps: true }` (§2.9; item 120 (i)) |
| view key `underlay` (per viewer) | the dress panel's underlay picker | the compositor (§9.5) | view section (hash, opacity, frame); the image in `assets` | — | not logged | an absent asset shows "The tracing image is not on this computer" with a re-pick button |
| `siting.declared`, `siting.linkEdits` rows (map-side, declared; V11's tables) | `editTable` from the per-kind panel, the Shape tab, the link view, "Keep together", a clerk's accepted proposal | V11's resolver, S10b, the link binding, the split placement; the `why` and `links` answers | the log (events) | held by every re-derivation; a key that no longer resolves is orphaned and reported (V11 §4.4) | the inverse row operation | V11 §4.4 (row migration by keyed row operations, §7.6) |
| `ToolRow`, `MsgRow` (with its `buttons`) | our table versions | the shell, `@plat/docs`; the rows' `buttons` also volume 10's cards (V10 §3.5 step 3) | `@plat/tables` | — | — | additive rows; a removed key is refused by the loader while referenced — a `button.*` row while a row's `buttons` name it, a mode while a `tool` button names it |
| `AppPrefs` | first run (defaults), the settings screen, hint completion | the shell at boot and on change | IndexedDB `prefs` | — | the settings screen's "Reset" restores defaults; each change is one step back in that screen | `schema` bumped with a converter; an unknown field is dropped with a note in the about screen |
| `LocalDocRecord`, `JournalEntry` | the first commit of a new document; every commit (journal); compaction (V09 §3.8) | open, recent towns, crash recovery | IndexedDB `docs`, `journal` | compaction folds the journal into a new snapshot | the log's own undo; Delete moves the town to "Recently deleted" for 30 days (`deletedAt`) with Restore; it is removed only by "Delete now" there or by the storage ladder after asking (V09 §3.14) | a snapshot of an older output version opens by §2.9's steps (frozen view or replay) |
| `UnderlayAsset` | dropping or picking an image | the compositor | IndexedDB `assets` | — | removing the underlay keeps the asset until no document's view key names it (swept at boot) | — |
| `ClerkMount.host`, `ClerkMount.effectiveKey` (2.10) | the shell's mount of the clerk slot: `effectiveKey` from the view key and View as; in host mode `host` from the embed's bridge handler (V08 §3.1) | V10's harness (its session key, `HostProxyBackend`, the host proposal intake) | memory only; the transport's token never leaves memory (file f item 473) | a new `clerk.config` replaces the body (`onConfig`); a change of either key input fires `onEffectiveKey` | n/a (not in the log) | n/a |
| a host's proposal card in the card-only drawer (4.11) | a host's `preview { proposal }` through `ClerkMount.host.proposals` (V10 §3.17) | the drawer | memory; Accept commits its events as one group with `proposedBy: 'clerk'` (V10 §4.2) | re-previewed on a moved head, stale by V10 §3.11's rule; a newer host proposal or a built-in turn supersedes it (answered `dropped`) | the accepted group is one undo step; Drop leaves nothing | n/a |
| a clerk session's transcript | V10's harness (V10 §2.7) | the drawer; the export "Assistant conversation (JSON)" (V09 §5.10) | V10's: memory, or its device store only while keep history is on (V10 §3.15) | — | accepted proposals are ordinary log events with their undo | V10's |
| view key `showUnexcavated` (per viewer) | the Below group's toggle, at tier `secret` only (V09 §4.17.1) | S14's unexcavated style; a picture export at `secret` | the view section; never over a bridge to another client | — | not logged; toggled back | absent: `false`; a client below `secret` reads it as `false` whatever its value |
| `ViewOpts.viewAs` | the View as menu (V09 §4.8); a host's players' view through the embed's bridge handler (a key form) | §9.2's filter for this view; `effectiveKey()` — the `admitAs` of every band-less read (V09 §2.7), the clerk's session key, the export dialog's default knowledge | memory only (session-transient) | `onEffectiveKey` fires on every change; cached band-less answers are re-asked | the menu's previous value; a host's form is cleared only by the host (its toggle) | — |
| `WhyCardModel` | built from a `WhyAnswer` (V09 §2.7) | the why card, the chips, the drawer, the underground panels, item 110's panels (its `sections`) | never | rebuilt at every open and on `doc.changed` naming the subject | — | — |
| `Selection.stack`, `Selection.part` (4.20.8) | a click or a tap (file f item 466's answer) | the panel, T11 `name`, the context menu's "Select below" | memory | cleared when the part's or an entry's id disappears (`doc.changed`) | kept across undo when the ids survive, else cleared | n/a |
| the effects list (`PreviewResult.effects`, 4.20.7) | each preview and each `confirm` | the badge, the fates sheet's "What else changes", the live region, the clerk's card | never | dropped with a stale preview and re-requested | n/a | n/a |
| T4 `road`'s Raised toggle and Aqueduct chip (4.20.2) | T4's options strip, PageUp and PageDown while drawing | the mapper, the badge | memory only; never `AppPrefs`, never logged | — | reset to off each time T4 is picked (J-V9.73) | n/a |
| "Keep them as yours" (4.20.3) | T1 `intend`'s whole-town ghost card | the Re-derive's group | as declared `drawWay` events in the log | held (declared) | one undo with the Re-derive | — |
| a suppressing removal, as the app shows it (4.20.3) | a Delete of generated content of file f item 260's kinds — a raised way, harbour-mouth chain, quay wall, retaining wall or deck plot (V06's `detail.suppress`), an island or sky access (V05's removed slots) | `info.remove.holds`, the history row, `ClerkMount.rebuildEvents`, the skeleton's export (file f item 455) | the log (the base's and V06's) | holds through Regenerate, New random, reloads and epochs (V06 §2.13) | undo lifts it; "Build it again" (and the clerk's Put it back, the same events) re-declares | an older document has none |
| `HostSlots.historyLines`' lines (2.2, 4.10) | a host change reaching this session — for SettlementForge a `party` value differing from the last one received, a new `partyPicturesAt` (V08 §3.1 step 7 (c)) | the history panel's group "The party" | never by the shell: the host's handler holds them in the session's memory, and a reload starts with none (the record keeps no reveal history beyond `party.prev`, V08 §4.6) | re-listed, with `list(effectiveKey())`, on each `onChange` and each `onEffectiveKey` (V09 §2.2) | none: not events, no Undo this — the host's own "Hide again" / "Reveal again" (V08 §4.2) | n/a |
| a copy saved in host mode (3.9) | an action that makes a new document, under `newDocuments: 'download'` | the user, opening the file in the standalone app (§2.9's load) | the user's device only (a `.plat` download); nothing in the frame, the host or a local store | — | n/a: the frame's document is untouched | the `.plat` reads by §2.9's steps |
| `attach.newMap` (2.10) | the drawer menu's Start a new map from this (standalone) | V10 §3.1 (4) | memory, for one message | — | Esc or the item again clears it before sending | n/a |
| view key `cvdVariant` (per viewer; 4.21.2) | the **Colour vision** chip (the view bar's Map group; Settings' Accessibility section) | the tile key and the sheet's checked variant (§8.2), the legend (§9.5), picture exports | the view section; never over a bridge | — | not logged; the chip's previous value | absent or unknown: `AppPrefs.cvdDefault`; a sheet without that variant draws its palette with its cues (§8.2) |
| §2.9's year position and its follow flag (per viewer; 4.21.7) | the **Season** control; with the flag on, §7.7's DR42 sets the week — the dossier's latest stamped tick (item 125 (b)) — at open and at each absorb | §8.2's season rows, the export's season line, V10's explanation | the view section; never over a bridge; the model and its hash untouched in every week (item 117 (a)) | a new absorb moves the week only while the flag is on | not logged; the control's previous value | absent: the flag on with a dossier, midsummer standalone (item 117 (c)) |
| §2.9's festival display (per viewer; 4.21.8) | the festival list: follow · off · preview one festival | §8.2's decoration rows, the export's festival name | the view section; never over a bridge; model and hash untouched (item 118 (a)) | a festival no longer listed after an absorb falls back to follow | not logged | absent: follow |
| the History chip's choice (4.21.3) | T1 `intend`'s sheet | the `adjust` of the recipe's history option (§4.2 S0) | the log (a canonical `adjust`, the base's lifecycle row) | a Re-derive from S0 (whole town) | one undo with its Re-derive | the recipe's migration (§7.5) |
| the Colour vision, Season and festival controls' own state | the view bar | the three keys above | none of their own: each control shows its key | — | — | — |
| T2 `ground`'s **Spring-fed** toggle, T3 `wall`'s **Material** chip (4.21.1, 4.21.4) | the options strip | the mapper | memory, per tool for the session, as every option (V09 §4.2) | — | not logged; the event they shape is | n/a |
| the grandeur line (4.21.5) | derived from the draft's events and the ceiling table, per preview; the why card's `facts` row | the badge, the preview card, the why card | never | recomputed with each preview | — | — |
| the zoom-out stop and the crisis framing (4.21.6, 4.21.12 (8)) | derived from §8.8's limit for the map's `bounds` — the bounds of town and camps while a crisis look stands (§2.9's *The crisis framing*) — and the viewport; stop 0 where none fits | the zoom controls and their tooltip, Fit the town, the opening view, the export frame | never | re-read at each `doc.changed` that moves `bounds`, at each resize, and when a look starts or ends (a week change, an absorb, the `crises` key); a view coarser than a narrowed limit settles to it about its own centre, as at a resize | — | — |
| the progress view (4.21.9) | a one-time wait past `progress.showAfterMs` | the progress strip; the view status's `progress.verify` line | memory, for the wait | — | — | — |
| view key `find` (per viewer; 4.21.10) | the Find panel (its list, suggestions, chips, Clear, Show gaps); a use's **Find all {kind}s**; V10's `find` action | `live.find` and §8.2's Find rows, the results list, picture exports, V10's `FindView` | the view section; never over a bridge (§11.3) | re-evaluated at every commit, regenerate, undo, redo, advance, load and migration; a chip whose target goes stays at count 0, dark, and lights when a match returns | not logged (view state): Clear empties it, closing the panel removes it | absent: Find off; an older `thematic: 'coverage'` opens as `{ chips: [], gaps: true }`; a chip of unknown shape is dropped |
| Find's index and suggestions (4.21.10 (4), (7)) | derived: per chip, the gazetteer's match listing at `effectiveKey()` and the view's drawn week (§2.9's `week`; the head's when absent) with each match's places by layer, band and room | `live.find`, the panel's counts and results, the suggestions | never (generation-worker memory) | rebuilt once per commit, regenerate, undo, redo, advance, load and migration, at each change of §2.9's `week` and at each `onEffectiveKey` | — | — |
| view key `crises` (per viewer; 4.21.12) | the Show menu's **Show crises** and **Preview a crisis** | §8.2's look rows, the legend's crisis entries, the crisis card, Find's `crises` section, the crisis framing, picture exports | the view section; never over a bridge | the looks standing re-read as the crisis card's row below states (each change of §2.9's `week` or `crises`, each `doc.changed`, each `onEffectiveKey`) | not logged; the switch's previous value | absent: `{ mode: 'follow' }`; a `preview` whose `look` names no row reads `follow` (§2.9) |
| the crisis card and the why lines (4.21.12 (4)–(5)) | read from §11.2's `looks` reader (`LooksAnswer.crises`: the standing overlays by §7.7's DR44, admitted at the view's effective key; for the why card's `facts` row asked with its building, each `disaster` entry's `over`) | the card, the legend, the why card's `facts` row, Find's list | never | re-read whenever the evaluation §8.2's `live.crises` runs changes: each change of §2.9's `week` or `crises` (**Show crises**, **Preview a crisis**), each `doc.changed` (a commit, an absorb, an undo or redo, a regenerate — an edit that splits or merges a struck district changes a disaster's units at that commit, V01 §3.16, and a commit that begins a Works on a building of its units hands that building over, V06 §3.22 (3)) and each `onEffectiveKey` | — | — |
| `AppPrefs.resolution` (4.21.11) | Settings › Display › **Resolution** | the shell at boot and on change → §8.8's ladder | IndexedDB `prefs` (device state; never a document, its hash or the log) | — | Settings' Reset restores `auto` | absent or unknown: `auto` |
| the view-status chip (4.21.11 (3)) | derived from §8.8's loop: the level in force and its reason | the chip and its tooltip; `info.resolution.fallback` while a manual level cannot hold | never | recomputed at each level change, each settle and each device-pixel-ratio change | — | — |
| the damage lines (4.21.13) | derived from V03's damage layer at V06's `decayLevel` for the drawn week by §6.3 *Plan damage*'s comparison, at `effectiveKey()`; for the plan panel only, V03's `planDamage` with `PlanDamage.look` set — a disaster look standing over the building, its lines at `PlanDamage.level` (V03 §5.6 (4)) | the plan panel; the why card's `plan` section, at the building's own level only | never | recomputed at each `doc.changed` naming the building, each week change and each `onEffectiveKey`; for the plan panel's look lines, also at each re-read of §11.2's `looks` reader (the row above: each change of the `crises` key and each `doc.changed`) | — | — |
| `AppPrefs.weatherEffects` (4.21.14) | the advanced panel's **Weather effects** | the shell → §8.4's weather layer | IndexedDB `prefs` (device state; never a document, a view key or a bridge message) | — | Settings' Reset clears it to the default | absent: the default by tier and reduced motion (V09 §4.21.14 (2)) |
| the spell in force (4.21.14) | the session's weather timeline (§6.1's `view.weather`, seeded per session); **Start a shower now** as the next spell | §8.4's weather layer | session memory only (§2.9's *Weather effects*): never saved, never a view key, never in a digest, the tile key or an export | — | — | n/a |
=== END ===

=== REPLACE ### 3.16 Edges — every mechanism at its limits (principle (11)) ===
### 3.16 Edges — every mechanism at its limits (principle (11))

Each row states the outcome, the failure rung (§5.1's ladder: check, repair locally, retry that piece, simpler shape,
substitute, leave out and report — never a whole-map retry, and in the application never a lost edit) and the test;
T-V9-80 is the edge suite, one scripted fixture per clause named by its row number. Three rules hold everywhere and the
rows name only what they add:
* **Degenerate geometry (E4).** The application draws no model geometry: every gesture reaches the model through the
  dry run. The settle (V09 §3.3 step 3) merges coincident points and drops zero-length segments by §7.1's
  authoring-boundary rule; a draft left with fewer points than its form needs (a line of one point, a lasso of two, a
  zero-area box) sends no preview — the draft stays open and the readout says what is missing (`edge.morePoints`); any
  other degenerate shape (self-touching, collinear, a sliver) reaches the dry run, whose kernel refusal (`E_DEGENERATE`,
  `E_BELOW_MIN_EDGE`, `E_SELF_INTERSECT` …) returns as its bend or its F-EDIT row (V09 §4.9) — never a crash, a hang or a
  blank (repair locally; T-V9-80 (1), T-V9-14); an edit the dry run resolves to nothing (§7.1's *Empty edits*) commits
  nothing, its readout naming why (`edge.nothingToApply.<form>`; T-V9-80 (1)).
* **Every rung (E6).** Every screen and tool works from THORP to the METROPOLIS cap; the only rung gates are those the
  base and the volumes rule — the Sky layer at CITY and METROPOLIS with islands, **New catacomb** at TOWN and above, the
  size chips' bands, the village rungs' modes (V07 §4.1), the History chip's rungs above the town's own — each shown
  disabled with its reason, never hidden without one (check; T-V9-80 (2) runs every screen's script at THORP, VILLAGE, TOWN,
  CITY and the cap).
* **Save, load, undo, redo, regenerate, migrate (E8).** A logged edit's lifecycle is §7.4's; every state this volume adds
  has its V09 §2.12 row; a view key survives save and load and is never undone (T-V9-45); session state is dropped on
  reload, the draft mirror excepted (V09 §2.4).

**(a) Data, state and flows (V09 §2, V09 §3)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 3 | `toolkit.json` (V09 §2.3) | a missing, duplicated or unknown row, mode or param; a `values.table` naming no table; a key binding id absent from `keymap.json` | the loader refuses the package at build (CI), never at run time; a shipped row whose table has no rows shows its param disabled with `edge.nothingToChoose` | check | T-V9-12; T-V9-80 (3) |
| 4 | `Selection`, `HandleSet`, `CountBadge` (V09 §2.5) | a selected id tombstoned by another client or an epoch; an empty `PreviewResult.counts`; a `stack` whose entries vanish | the selection drops the id (cleared when none remain) at the `doc.changed` naming it; the badge shows "0 plots · 0 households · 0 buildings"; the stack re-asks at the next click | repair locally | T-V9-80 (4) |
| 5 | the map-side declarations (V09 §2.6) | a row whose key no longer resolves; an empty `familyWeights`; a cell V11 §4.2 does not declare for its key form | orphaned and listed in the history panel's orphans (V11 §4.4); absent weights read 1; the screen cannot write it (T-V9-25), an imported one is dropped by V11's loader with its note | leave out and report | T-V9-25; T-V9-80 (5) |
| 6 | `WhyCardModel` (V09 §2.7) | an answer with no `cause`, no pulls, no drivers, no sections; a `WhyAnswer` for a tombstoned subject | `decidedBy` "The rules made it"; the bars and sections omitted, never an empty heading; a tombstoned subject closes the card with `edge.removed` | substitute | T-V9-65; T-V9-80 (6) |
| 7 | `HistoryRow`, restore points (V09 §2.8) | an event kind with no template; a restore point past the log head; 20 auto points reached; 200 named points reached | a build failure (T-V9-15), never a code on screen; the point reads "at the latest state" and is re-pointed on save; the oldest auto point is dropped; a 201st named point asks `edge.replaceOldest` | check | T-V9-15; T-V9-80 (7) |
| 8 | the clerk slot (V09 §2.10) | no clerk configured; a `clerk.config` with no transport; `onEffectiveKey` firing mid-turn | no Assistant button, and nothing of the drawer runs; mode `off` until a valid config; the turn ends and V10 §3.12 (6) clears it (`clerk.view.cleared`) | check | T-V9-27; T-V9-40; T-V9-80 (8) |
| 9 | the local store (V09 §2.11) | IndexedDB refused; the quota full; a record from a newer version; a record with no snapshot | memory-only with `error.storageNone`; the storage ladder with `error.storageFull`; read-only with `error.newerApp`; the record listed with `edge.unreadable` and Download of its journal | substitute | T-V9-17; T-V9-80 (9) |
| 10 | boot and open (V09 §3.1) | a permalink at every rung; a file that fails the fingerprint; a file of each output version; a crash between the worker's commit and the journal's `done` | every rung opens by the same route; `error.openRefused`; V09 §3.14 (a)–(c); recovery replays to the last committed head | retry that piece | T-V9-67; T-V9-17; T-V9-80 (10) |
| 11 | the empty state (V09 §3.2) | a site on which the one-click default is infeasible; a THORP or METROPOLIS request from T1 `intend` | S1's ladder bends the site (§4.2 S1), and the report says so; the proxies keep §7.8's budget at each rung, the METROPOLIS proxies after the first map | simpler shape | T-V9-1; T-V9-80 (11) |
| 12 | snapping (V09 §3.4) | no candidate within the radius; exactly one; two at equal distance; a snap answer later than a frame | the unsnapped point; that candidate; the higher row of the mode's priority list, then the lower address; the unsnapped point until it lands | substitute | T-V9-8; T-V9-80 (12) |
| 13 | handles (V09 §3.5) | a shape with fewer vertices than `k`; a zero-length edge; a ring whose salient vertices crowd | every vertex a handle; the edge merged at the settle; the spacing rule drops the less salient, ties by lattice order | repair locally | T-V9-10; T-V9-80 (13) |
| 14 | variations (V09 §3.6) | a source whose three rerolls give fewer than three distinct digests; a scope with nothing to vary | the distinct ones shown with `edge.fewVersions`; the tray does not open and the draft previews once | leave out and report | T-V9-7; T-V9-80 (14) |
| 15 | New random on a scope (V09 §3.7) | a scope holding nothing rerollable (every thing locked or declared); one thing; a scope crossing a dossier-owned element; every rung; each layer toggle; undo after a save | the control disabled with `edge.allKept`; that thing alone; the element kept, the rest re-rolled; the same at every rung; a hidden layer's things re-rolled all the same (hiding is view state); one undo step, kept across save (§7.4) | check | T-V9-6; T-V9-7; T-V9-80 (15) |
| 16 | autosave and recovery (V09 §3.8) | no entry since the snapshot; one entry; a journal whose first entry mismatches; a 100-epoch advance killed after its last epoch and before compaction, one killed mid-group, and one stopped at epoch 40 and killed before compaction | nothing to replay; one call replayed; recovery stops at the mismatch with `error.recoveryPartial` and the unreplayed calls downloadable; the advance re-issued from its `logHeadBefore` to its `logHeadAfter`, the mid-group one (still `pending`) re-issued whole, the stopped one stopped again after its 40th epoch — each reopening at the journalled head, no epoch lost and no recovery line shown | retry that piece | T-V9-17; T-V9-80 (16) |
| 17 | undo, restore, copies (V09 §3.9) | nothing to undo; one event; a creation or dossier target; "Go back" of a few hundred edits at METROPOLIS; below a rebase point | the arrows disabled; that event; skipped by §7.4's target rule with its line; the progress view past 1 s; `info.copy.condensed` | check | T-V9-16; T-V9-27; T-V9-80 (17) |
| 18 | the skeleton (V09 §3.12) | an empty skeleton; a single declaration; a skeleton naming a class, table row or pack this build lacks; a skeleton from a newer version | a new town with no declarations; one row in the dialog; that declaration listed *refused* with its reason, the rest applied; opened by §2.9's steps with its notice | leave out and report | T-V9-62; T-V9-80 (18) |
| 19 | the failure ladders (V09 §3.14) | a worker death at every rung; a degenerate result in any flow | the same ladder at every rung; the E4 rule above | retry that piece | T-V9-80 (19) |
| 20 | the link cache (V09 §3.15) | a town with no consumer or no provider; a good with no provider | an empty cache and a Supply links view reading `edge.noLinks`; the consumer's `WhyAnswer` lists the unserved good (item 105 (a)) | leave out and report | T-V9-24; T-V9-80 (20) |

**(b) Editing (V09 §4)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 21 | the rail and working layer (V09 §4.2) | no tool offered on the layer; one; Sky at a rung without islands; Below with no network; a layer toggled off while it is the working layer | the modes shown disabled with their reasons; the one mode active; the Sky and Below switches disabled with their reasons; the working layer drawn whatever its visibility, nothing written (§8.4); a layer toggled off while working stays drawn in this view until the switch moves | check | T-V9-22; T-V9-80 (21) |
| 22 | the binding table (V09 §4.3) | a (kind, target class or path) pair with two home tools; a pair with none | a CI failure of T-V9-12, never a run-time choice | check | T-V9-12 |
| 23 | the context panel (V09 §4.4) | an entity kind with no editable path; one path; a dossier-owned field; an entity tombstoned while open | the About tab only; one control; disabled with "Set by SettlementForge"; the panel closes at `doc.changed` with `edge.removed` | check | T-V9-80 (23) |
| 24 | the twelve tools (V09 §4.5) | a points form's degenerate draft; T1 `intend` at the rung's ends | the E4 rule above; the size chips of that band only | check | T-V9-80 (1) |
| 25 | multi-selection (V09 §4.6) | nothing selected; one thing; things of kinds that cannot move; a move of zero offset; undo after save | the menu's multi items hidden; the single panel; left in place and named in the badge; no event sent; one group undone | check | T-V9-80 (25) |
| 26 | the file-g edits (V09 §4.7) | a kind with no member; one member; `familyWeights` at every family's Ignore; a link with no other provider for **Use another supplier**; a wall stretch of zero length; a dossier-ranged record; every rung; undo of a group after save | the per-kind panel still writes the row, applied when a member arrives; one row pinned; every soft term off, hard needs kept (item 103 (c)); the handle offers nothing and the card says `edge.noSupplier`; the E4 rule; the count control absent (dossier-owned); the same rows at every rung; one undo step | check | T-V9-24; T-V9-25; T-V9-80 (26) |
| 27 | View as (V09 §4.8) | View as with nothing withheld at the chosen tier; a host form naming no places | the view unchanged but the banner; the form's tier alone | substitute | T-V9-66; T-V9-80 (27) |
| 28 | the catalogue (V09 §4.9) | a slot with no argument; an `{ id }` argument tombstoned | filled from the entry the button carries, else rendered as its kind word; the kind word | substitute | T-V9-13; T-V9-15 |
| 29 | the history panel (V09 §4.10) | 10 000 rows; a row whose targets are all tombstoned; every rung | virtualised within V09 §6.3; **Show** hidden, the text kept; the same at every rung | leave out and report | T-V9-80 (29) |
| 30 | the drawer (V09 §4.11) | no turn yet; one proposal; the cap reached; a proposal whose events are degenerate; a `ProposalView` with no variations; every rung; apply-then-undo off and on; a reload mid-turn | the suggested prompts; one card; `clerk.cap.reached` and the box disabled; the dry run's bend or refusal on the card; the card drawn with Drop only; the same at every rung; V10 §4.4's cases; the turn lost, the transcript kept by V10 §2.7's rule | check | T-V9-27; T-V9-80 (30) |
| 31 | touch (V09 §4.12) | a two-finger tap with no drawing tool; a long press that moves past 8 px | a zoom-to-band as a double-click; a drag, never the menu | check | T-V9-22 |
| 32 | the keyboard (V09 §4.13) | a binding at every rung; a rebinding that collides; a keymap override after an upgrade that removed its target row | the same bindings; the later rebinding refused with `edge.keyTaken`; the override dropped with a note in About | check | T-V9-80 (32) |
| 33 | the advanced panel, tables, presets (V09 §4.14) | no override; one table with one row; an override whose base row changed; the parity presets; an override after undo and after a table release | "as the rules say" everywhere; that row; the orphans list with Keep mine / Take new (§7.6); each preset's values shown with their layer; the base's lifecycle (§7.6) | check | T-V9-80 (33) |
| 34 | the roster reader (V09 §4.16) | an empty line; a line of only punctuation; a locus naming nothing | skipped; skipped; the card asks "Where is {X}?" | leave out and report | T-V9-13; T-V9-70 |
| 35 | the underground screens (V09 §4.17) | a degenerate gallery or chamber | V04's ladders (V04 §5.2's F-UNDER and F-VOID rows) with their bends | V04's | T-V9-35 |
| 36 | people (V09 §4.18) | a town of one person; no people | the tree of one card; the People panel absent (J-V9.48) | check | T-V9-46 |
| 37 | item 110's tools (V09 §4.20) | no raised way, retaining wall or deck in the town; exactly one; a zero-length stroke | the Raised-ways row reads `edge.noneStanding`; that one's panel; the E4 rule | check | T-V9-51; T-V9-80 (37) |
| 38 | retaining walls and terraces (V09 §4.20.1) | a chain of one point; a closed chain of zero area; a terrace stroke of zero length | the E4 rule; a closed chain with no area sends nothing and says `edge.drawRound`; no stroke, no event | check | T-V9-54; T-V9-80 (38) |
| 39 | raised ways (V09 §4.20.2) | a course of one station (`A = B`); a stroke whose ends are both on one vertex; an aqueduct with no source and no terminal in reach; undo, regenerate and an epoch after a raised way | no way sent, the readout `edge.samePoint`; the same; `bend.aqueduct.uphill`; the base's and V06's lifecycles (a declared way held) | check | T-V9-52; T-V9-80 (39) |
| 40 | a raised course across a sky access (J-VI.4 (f)) | `skyAccessObstacles` offers no re-route | the course ends at its last ground vertex before the column or rope line, `bend.raised.skyAccess` | simpler shape | T-V9-52 |
| 41 | removals (V09 §4.20.3) | a removal of a thing whose record is degenerate; every rung | the plain `delete`; the suppression by reason key at every rung that generates the kind (none below CITY for raised ways) | check | T-V9-53; T-V9-80 (41) |
| 42 | decks (V09 §4.20.4) | a deck with zero plots; a stamp on a deck edge | `edge.noDeckPlots`; the nearest free deck plot, bent | repair locally | T-V9-55 |
| 43 | tiers (V09 §4.20.5) | a stack of one tier; the tier cap; a zero step | the stepper at 1 with the stairs chip disabled (`edge.oneTier`); `bend.tiers.count`; `bend.tiers.step` | repair locally | T-V9-59 |
| 44 | the new records' panels (V09 §4.20.6) | a span of zero length; a crossing whose way was removed; undo of a span edit after save | the span's panel absent (V04 §3.5.4's span rule makes none); the crossing panel closes at `doc.changed`; one undo step, kept across save | check | T-V9-80 (44) |
| 45 | the effects list (V09 §4.20.7) | no effect; more than the cap; a confirm after an undo | no line and no section; `effectsMore`; the list re-read with the fresh `confirm` | leave out and report | T-V9-60 |
| 46 | the hit stack (V09 §4.20.8) | nothing under the point; a point on a mark's edge | the selection cleared; the hit radius's nearest mark | check | T-V9-58 |
| 47 | item 110 on Sky (V09 §4.20.9) | an island with no rim strip; one island; a degenerate rim stroke | V05's records decide (the move is to 1 m inside the `setback` line where one exists, else the stroke kept); the island menu's one entry preselected; the E4 rule | V05's | T-V9-80 (47) |

**(c) Screens (V09 §5)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 48 | the frame (V09 §5.1) | a viewport below 600 × 480; every rung | the medium layout at its minimum, the page scrolling; the same frame at every rung | simpler shape | T-V9-22; T-V9-80 (48) |
| 49 | the empty state's card (V09 §5.2) | a first map that fails | the card stays with **Surprise me** and **Open a town…**; the report names the failure rung | substitute | T-V9-1 |
| 50 | the overlays (V09 §5.3) | no preview yet; a ghost of zero area | the raw stroke only; the badge's counts, no ghost | check | T-V9-80 (50) |
| 51 | the thematic views (V09 §5.4) | nothing to draw for the view; one value; a stored value the town cannot draw (`supplyChains` with none listed); a view on every rung; each view on and off; save and reload | the legend reads `edge.nothingToShow`; the legend's one entry; read as None; the same views at every rung (Voids hidden where its source is absent; Find's Show gaps, row 88); no model digest changes; `thematic` restored per viewer | check | T-V9-23; T-V9-68; T-V9-80 (51) |
| 52 | the fates sheet (V09 §5.5) | a `confirm` with no fates and no renames; one fate; every rung | the action commits without the sheet (V09 §3.3); one row; the same at every rung, paged beyond 1 000 | check | T-V9-80 (52) |
| 53 | the other panels (V09 §5.7) | an empty report; one entry; a degenerate entry address; a report with no dossier; every rung; each style; a panel after undo | `edge.allMade`; one line; the entry drawn with no **Show**; the dossier sections omitted; the same at every rung; the Dress cards of the shipped styles; re-read at `doc.changed` | leave out and report | T-V9-69; T-V9-80 (53) |
| 54 | the why card (V09 §5.8) | an answer with nothing to show; one bar; a subject of zero area; a withheld subject | "The rules made it" and no bars; one bar at full length; the card anchored at the subject's point; its kind and nothing else | substitute | T-V9-65; T-V9-80 (54) |
| 55 | onboarding (V09 §5.9) | no hint left; one; the guided town after its step's target was deleted; `hintsDone` after a reset | no callout; that one; the step skipped with `edge.stepGone`; hints shown again | substitute | T-V9-80 (55) |
| 56 | the export dialog (V09 §5.10) | a scope with nothing in it; one building; a frame of zero area; every rung; each preset | the tab says `edge.nothingToExport` and Export is disabled; a one-building scene; the E4 rule (no frame is sent); the same tabs at every rung; the preset's knowledge and look | check | T-V9-19; T-V9-80 (56) |
| 57 | settings (V09 §5.12) | no local town; one; a stored value out of range; each toggle | Storage lists none; one row; clamped into range with a note in About; each written and restored by Reset | substitute | T-V9-80 (57) |
| 58 | open and recent (V09 §5.13) | a recent entry at every rung; a recent entry whose record was purged; reopening after a migration | the same list; the entry dropped with `edge.townGone`; opened by §2.9's steps | leave out and report | T-V9-80 (58) |
| 59 | labels in the app (V09 §5.14) | a rename at every rung; an empty name | the same inline editor; refused by the editor (`edge.nameLetter`) and never sent | check | T-V9-80 (59) |
| 60 | every new thing (V09 §5.15) | a thing with no export form; each layer off in an export; a degenerate thing | its row names "never"; the layer omitted from that export; the E4 rule | check | T-V9-19; T-V9-80 (60) |

**(d) Where two units' features meet** (the canon's combinations this volume owns)

| # | combination | outcome | rung | test |
|---|---|---|---|---|
| 61 | steep ground × the tools (T2 `ground` – T6 `place` on a slope beyond S1's steep row) | the dry run's own ladders (a road's switchbacks, a wall's barrier, a building's platform); the tool shows the bend line, never a refusal | simpler shape | T-V9-80 (61) |
| 62 | steep ground × the working layers | Below's systems follow V04's depth rule on steep ground; Sky unaffected; the layer switch unchanged | — | T-V9-80 (62) |
| 63 | a moat × the tools (T3 `wall` over a moat, T4 `road` across it, T6 `place` on its bank) | a wall follows the moat's inner edge; a road crosses by a draw or fixed bridge (§7.1's drawn-bridge rule, `bend.road.bridge`); T6's stamp takes the nearest dry plot, bent | repair locally | T-V9-80 (63) |
| 64 | a bridge × the working layers | a bridge is Ground's; its deck plots Ground's; a sewer under it Below's, reached through the hit stack's order | — | T-V9-58 |
| 65 | an oasis × the tools | T2 `ground`'s toggle (V09 §4.21.1); T3 `wall` and T4 `road` treat the oasis as water; T5 `quarter` and T8 `fill` over its grove and gardens bend as over any green | repair locally | T-V9-71 |
| 66 | an oasis × the working layers | the oasis is Ground's; on Sky the toggle is hidden (V05's water) | — | T-V9-71 |
| 67 | the frame × the tools (a gesture past `bounds`) | points beyond the frame are clamped to it at the settle, the readout saying `edge.frameEnd`; a quarter's lasso is clipped | repair locally | T-V9-80 (67) |
| 68 | the frame × the working layers | Below and Sky share the frame's `bounds`; the zoom-out limit is the ground's bounds for every layer (item 116) | — | T-V9-76 |
| 69 | a close-up neighbourhood × the working layers | the close-up is Ground's; Below and Sky show the town's layers as they stand, the close-up's edits Ground-only (V01 §4.5) | — | T-V9-80 (69) |
| 70 | a terraced ward × the tools | T2 `ground`'s Terrace on a terraced ward re-levels within the ward's steps (V01's terraced fabric keeps its step rule); T3 `wall`'s Retaining wall snaps to the ward's step lines; a quarter T5 `quarter` paints over it keeps its terraces | repair locally | T-V9-54; T-V9-80 (70) |
| 71 | a terraced ward × the working layers | Ground's; Below under a terrace follows V04's depth from the levelled ground | — | T-V9-80 (71) |
| 72 | a composed building × the working layers | Ground's at the building band; its basement and crypt reached on Below's band and in the plan panel | — | T-V9-80 (72) |
| 73 | a crypt × the tools (T6 `place`'s chamber inside a church; T9 `shape`'s plan events on it) | V09 §4.17.5 (a) and (e)'s bends | repair locally | T-V9-35 |
| 74 | a crypt × the working layers | the crypt is a basement, drawn on Below's band with its church's plan, never listed as a system (J111) | — | T-V9-35 |
| 75 | a plan × the working layers | a stored plan's storeys switch with the storey switcher on Ground; its basement on Below's band | — | T-V9-80 (75) |
| 76 | an island's shade × the tools | a tool acting in a shaded cell reads the field as it stands; **Update shade now** after an island moves; the shade view's pending line until then | — | T-V9-43 |
| 77 | an island's shade × the working layers | the shade is Ground's view (`live.shade`); switching to Sky keeps it drawn dimmed | — | T-V9-43 |
| 78 | a sky access × the working layers | its foot on Ground, its top on Sky; each end selected on its layer, the hit stack joining them | — | T-V9-80 (78) |
| 79 | a landfall × the tools | a stroke over a landfall's covered set bends as over rubble ground (V05 §3.16); T10 `hold`'s re-roll leaves the landfall held | repair locally | T-V9-80 (79) |
| 80 | a landfall × the working layers | the fallen island's remains are Ground's; its landing yards Sky's while it floated | — | T-V9-80 (80) |
| 81 | a town's history × the tools | while the timeline thumb is off "now" the tools are disabled with V06's band, each offering **Open a copy from here** at the frame's seq (`info.past.viewing`, V09 §5.6); a tool edit after an epoch acts on the present; "Re-run from here" keeps later hand edits listed | check | T-V9-41; T-V9-80 (81) |
| 82 | a town's history × the working layers | every layer is drawn at the thumb's week; Below's `lost` voids follow the replay (V09 §4.17.1) | — | T-V9-73 |
| 83 | a dossier × the tools | a dossier-owned field is locked (`refuse.dossierOwned`); a dossier element's delete is **Not here**; a T6 `place` or T7 `roster` line naming no element takes `refuse.roster.dossier`; an absorb under a pending ghost re-previews it | check | T-V9-13; T-V9-69 |
| 84 | custom content × the tools | a custom kind stamps and sites by its profile (item 104); its chain's links pin, move and cut as any link | — | T-V9-24; T-V9-68 |
| 85 | custom content × the working layers | custom institutions are Ground's; a custom underground kind is Below's by its registry row | — | T-V9-80 (85) |

**(e) Items 120–126's screens (V09 §4.21.7, V09 §4.21.10 – V09 §4.21.14)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 86 | Find's list and type-ahead (V09 §4.21.10 (3)–(4)) | a section with nothing (no named place, no people module); a word matching nothing; a one-letter word; a typo in a word of four letters or fewer; a word naming a kind the key withholds; a whole word several present kinds carry; every rung | the section omitted; `find.noMatch`; prefix suggestions only; no typo forgiven there (prefix and whole word only); never suggested, listed or counted (item 120 (h)); each kind and one "All {word}s" chip; the same panel at every rung, the village rungs' ends and field groups under `areas` | check | T-V9-83 |
| 87 | Find's chips (V09 §4.21.10 (1), (5), (7), (8), (11)) | no chip; a chip with no match; a chip whose last match goes at a commit, an advance or an undo; a scrub to a week before a matched building was built, and after a closed use's end; a scrub to a week before a matched use closed, or before a building's use changed; a dossier chip whose entry an absorb re-keys; a chip the new key withholds at `onEffectiveKey`; more than eight chips; sixteen chips at the METROPOLIS cap; save and reload; a migrated document | Find off with the panel open (no veil); count 0, dark (`find.none`); the same, lit again when a match returns; for that week the match neither drawn, pinned, counted nor listed, a chip with none there at count 0 (`find.none`), the chips unchanged and the head's matches back at the head (§11.2's gazetteer `week`); that use matched and drawn, the building matched by its use at that week, never its head use (§11.2's *At a drawn week*); followed by key and anchor (V08 §3.16 (6) (e)); `find.withheld`, nothing drawn; colours repeating, each chip's glyph and dash telling them apart; the union drawn within §12.5's overlay budget, the index rebuilt once per commit; the chips restored from the view section; the chips kept, re-evaluated on the migrated document | check | T-V9-83 |
| 88 | `live.find` across bands and layers (V09 §4.21.10 (6), (8), (10), (13)) | every match on another layer; a match on a hidden sky layer; the city band with a thousand matches; the interior band with a matched building whose plan does not draw; Show gaps with no kind chip; Show gaps where a layer has no units; Find over each Show view; a picture export and a battle map with chips on | ghost pins only, each layer's count with **Go there**; its ghost pin at its drawn position, **Go there** drawing it as the working layer, no event sent (§8.4); count bubbles merged within one layer and, on Sky, one island; the building's glow and pin, no room marks; the switch disabled with `find.gapsNeedKind`; no gap drawn there; drawn over the view; drawn with the chips in the legend; left off unless **Draw Find** is on | simpler shape | T-V9-83 |
| 89 | the resolution setting and its chip (V09 §4.21.11) | a level above the screen; a level the device cannot hold; a device-pixel-ratio change during a gesture; Auto at its lowest step; a screen beyond 4K; an unknown stored value; a fresh install | greyed with `settings.resolution.screen`; the nearest level that fits, with `info.resolution.fallback`, never a refusal or a crash (T121-4); re-evaluated at once, the level applied at the gesture's settle (§8.8; T121-7); tiles below CSS density with labels and chrome at the device pixel ratio, the chip naming the level; the 4K-equivalent tile DPR scaled up (item 121 (b)); read as `auto`; `auto` (T121-1) | substitute | T-V9-84 |
| 90 | Show crises and the preview (V09 §4.21.12 (1)–(7)) | no condition and no preview; several crises at once; a crisis ending while shown; a condition with no `untilWeek`; a condition the dossier names not; a `none`-row condition carried beside the looks at a key below `secret` (DR44's tier); a preview on a dossier map; a carried preview whose look left the table; every rung | nothing drawn, byte-identical to the base (T122-7, `item122.crises`); each drawn, the outskirts shared by §10.2's priority under its density cap, each with its line on the card and in Find; drawn no more from its `untilWeek`, its card closing and its Find row going; drawn while the overlay stands, with `info.crisis.lineOpen`; `info.crisis.lineUnnamed`; never drawn, listed, named or counted; the previewed look alone while it shows; read as `follow`; the same controls at every rung, the village rungs' looks V07's | check | T-V9-85 |
| 91 | the crisis framing and the forces (V09 §4.21.12 (5), (8)) | a crisis starting and ending while the view is moved; a force larger than the frame and its margin hold; two crises whose camps widen the bounds; camps wider than the window at stop 0; **Show** on a look that takes no camp land (a famine, a rebellion); **Show** on a look with no mark drawn for it | the limit, the opening view and Fit move, the view is never re-framed, a view coarser than the restored limit settling to it about its own centre (§2.9); the rest drawn as §8.8's massed marks on the ring, the card giving the full number with `info.crisis.massed`; the bounds the union of town and every camp; stop 0 with `info.zoom.coarsest` (§8.8's limit); framed on the marks drawn for it (`live.crises`' marks for that look, V09 §4.21.12 (5)); the town framed as **Fit the town** frames it | simpler shape | T-V9-76; T-V9-85 |
| 92 | the damage lines (V09 §4.21.13) | a building never decayed, an element kind's range starting at 0 among its kinds; a fully ruined building; a building generated abandoned, decayed or ruined, or one item 113's replay abandons or ruins; any building before V06's level lands (M6-E); a restored building, re-cut or extended after its repair; more than three rooms in a line; a crypt under a ruined church; a building a disaster look stands over; a building of the look's units whose rebuilding Works has begun; a building of a previewed `disaster`'s units under Works; a ruined building the key withholds | no line (`item123.damage`; §6.3 *Plan damage*: a level of 0 damages nothing); the ground floor's lines, each upper storey's `storeyGone` and never the ground storey's (V03 §4.6); its run's lines and years — begun V11's default age before the week it is first met so, or at the replay epoch's week, and aging from then (V06 §3.23 (1), (4)); the existence state alone at V11's default age, the years clause dropped; the lines leaving in reverse threshold order under `info.damage.head.restored`, with `info.damage.patched`, an element the plan gained after its damage left drawn as built (V06 §3.23 (3)); three rooms and `info.damage.more`; its own threshold's `crypt` line, or none; the look's lines under `info.crisis.ruinedFor` in the plan panel (`PlanDamage.look` set), the why card's `plan` section keeping the own level's rows, nothing stored; its own level's lines and head, no look and no `info.crisis.ruinedFor` (V06 §3.22 (3); V03 §5.6 (4)); the look's lines, a preview never handing over; the lines naming rooms (`roofBay`, `floor`, `partition`, `furniture`, `unsafe`) and the `crypt` line not drawn, the head line, `storeyGone`, `outerWall`, `door`, `window`, `stair` and `cellar` kept, no room the key does not admit named | check | T-V9-86 |
| 93 | weather effects (V09 §4.21.14) | reduced motion; the low tier; the switch during a gesture; Start a shower now in an arid row's dry weeks, in a winter that does not freeze, at a moment with no live kind (V11 §3.25.11), with the effects off, while a spell is in force, and again before that spell has faded out; a `snow` cover carried onto an arid row; an export while a spell shows | off by default, a user's on honoured (T124-5); off by default; applied at once, no tile touched and the gesture unbroken; the commonest live kind (heat shimmer in an arid row's dry weeks by day, dust haze there at night under `light: 'time'`); rain, never snow; the button disabled with `settings.weather.noneNow`, nothing started; the button disabled; that spell fading out first, the pressed one starting when it reaches 0; nothing changed by the second press (§6.1 *The weather stream*); drawn `clear` (§8.2's snow rule); the export without the effects (item 124 (h)) | check | T-V9-87 |
| 94 | the week's fallback (V09 §4.21.7; item 125) | a dossier with no stamped tick; a tick far in the past; a host's `view.set { week }` against a moved control; an absorb bringing the first tick, the switch on and off | the control's own week (19 by default) with `view.season.noWeek`; its year position by DR42; the drawn week moves, the Season control and its switch staying as the viewer left them (§11.3); the week moved with the switch on, unchanged with it off | check | T-V9-77 |

The named combinations of the owner's list that reach the application — a settlement growing over a sealed void
(V09 §4.17.4's closure, T-V9-38), a dossier removing what an edit pinned (the pin orphaned and listed, V09 §4.10's orphans), an
epoch undone after a save (V09 §3.9, T-V9-16) — are closed at those rows.
=== END ===

=== REPLACE ### 4.2 The tool rail, the five layers and the working layer ===
### 4.2 The tool rail, the five layers and the working layer

**The rail.** A vertical column on the left (both layouts, V09 §4.12). It holds the
five layers as labelled groups — "Kind of place" (L0 INTENT), "Ground & bones" (L1 GROUND AND BONES), "What's in it"
(L2 PROGRAMME), "Fabric" (L3 FABRIC), "Finish" (L4 FINISH) — each tool a 44 × 44 px button with its icon, its name under it at UI scale 1, and its number badge (T1 `intend` – T12 `dress`, which is
also its key, V09 §4.13). **Progressive depth (R9).** On first run only the four `firstScreen` tools show: T1 `intend`, T5 `quarter`
`quarter`, T6 `place`, T12 `dress`, each layer group collapsed to a "More…" chevron. A layer group expands when the user
opens its chevron, when a hint or the guided town points into it, or when the user first uses one of its tools; the
expansion is remembered (`AppPrefs.railExpanded`). T9 `shape` and T10 `hold` are `contextual`: they appear in the rail (and
as the first two tabs of the context panel) from the first selection on, and stay. A user can pin any tool to the top of
the rail (`railPins`). The rail never scrolls on a wide layout (12 tools × 52 px + 5 headers ≤ 760 px at UI scale 1;
beyond that the groups collapse to their chevrons automatically).

**Tool options.** Picking a tool opens its options strip along the top of the map (not a dialog): the mode chips
(V09 §4.5's modes) and the parameters marked `basic`; "More" reveals the rest (R4). Options are remembered per tool for the
session.

**No layer bookkeeping (R6).** Nothing in the application orders, stacks or groups what is drawn: draw order is §8.2's
semantic order, a new thing lands where its kind belongs, and the working layer below chooses only which model layer
(ground, a sky island, the underground) the tools act on.

**The working layer** (view key `workingLayer`, per viewer; V09 §2.4): a three-way switch in the view bar — **Ground**,
**Sky** (enabled at CITY and METROPOLIS when the town has islands, II.6; a menu of the islands by name sets `key`), **Below**
(enabled when the town has an underground network, II.7, or a cavern or ruin — at any rung, item 109 (j) (1)). Switching
layer draws the working layer whatever its `LayerSpec.visible` and dims the other layers drawn to 35 % opacity (§8.4) — a view key,
per viewer, writing nothing to the document; a layer's own visibility is §7.8's layer controls, T12 `dress`'s logged `setLayer`.
Every tool mode declares the layers it acts on (`ToolModeRow.layers`). On **Sky** every row of V05 §4.1 takes
its sky form, with the island's `key` (V09 §4.20.9): T1 `intend` the islands setting and count; T2 `ground` the island's terrain, water and
rim, and a **Terrace** whose edge lays an island retaining wall; T3 `wall` **Draw wall** as V05 §3.21's barrier-closure enceinte
walling only the landing yards, and **Retaining wall** as an island `RetainingWall`, bent inward past the rim walk on or
along the rim (`bend.retaining.rim`; J-VI.4 (g)); T4 `road` a sky access only (V05 §4.2; Raised and Aqueduct hidden); T5 `quarter` a floating quarter; T6 `place` an
institution onto the island; T8 `fill` the brushes; T9 `shape` the island's altitude, area, position, occlusion, underside and field,
and an access's kind, role, state, knowledge and foot; T10 `hold` the island's locks, New random and **Update shade now**; T11 `name`
the island's name and label; T12 `dress` the sky layer's visibility and occlusion. On **Below**, T4 draws a tunnel, a gallery or
a link and T6 places a chamber or an access, each into the system the **system chip** names (V09 §4.17.2). A mode that
does not act on the working layer is shown disabled with its reason ("Tunnels are dug below the ground" for T4's Tunnel
on Sky). **A raised part** (item 110 (b): a ground arena part from 1) stays on the **Ground** working layer — no fourth
switch — and what lies under its deck is reached through the hit stack (V09 §4.20.8; J-V9.68).

**The Below group** appears in the view bar while Below is the working layer or the underground is visible: the **depth
band** — a ladder of the non-empty bands by depth range ("−2.5 to −5 m") with the kinds present, stepped by PageUp and
PageDown (file f item 413); the view key `depthBand` is its one store — the **view** chips *Cut-away* · *Over the streets* ·
*Below alone* (`LayerSpec.underView`: `cutaway`, `overlay`, `solo`; a `setLayer`, V04 §5.1), the **hand lantern** toggle
(the view key `handLantern`, §2.9), and, only for a view whose knowledge tier is `secret`, **Show hidden caves and ruins**
(the view key `showUnexcavated`, V09 §4.17.1). The **Sky group** holds the island menu and **Update shade now** for a
selected island (V05's `regenerate { kind: 'shade', island }`, T10 `hold`'s). The Map and Light groups are V09 §4.19's.
=== END ===

=== REPLACE ### 4.9 The words — the message catalogue's rows (English, our own) ===
### 4.9 The words — the message catalogue's rows (English, our own)

Every line a user reads for a bend, a refusal, a fate, an error, a share condition or a hint is a row of
`messages/en.json` (V09 §2.9). The rules for writing one: one sentence, at most 25 words; say what happened and what to do;
name the thing by its name, never by an id; never "error", "invalid", "conflict" or a code in the text; offer the action as
a button when there is one; the bend tone is gentle ("follows", "kept"), never apologetic. **Bend before refusing**
(R2; J-V9.44): where the dry run can name the nearest lawful alternative, the engine bends to it and the row is a `bend`
with that alternative pre-selected and the other one click away; the only refusals left are a dossier fact, a lock or an
assignment, a dependent later change, the viewer role, a staged layer and the rung — availability gates, not bends of a
lawful declaration (J-VI.4) —, an input with no lawful form to bend to (a table edit's dangling reference, type error or
required row, V11 §4.1; a host provider's output past §2.9's cap; an edit of a device-only table, V10 §2.10; an `epoch`
past §6.1's epoch cap), and the conflicts and caps §7.1's table names, each offering its one resolution or none (content
an earlier stage made, new water reaching a reservation, a stale base, a household capacity or a Works conflict, a style
or knowledge table the loader would refuse, an upgrade's size cap, a bug abort); every other
cause of a dry run, the island, aqueduct and rim cases and V02's
massing cases among them, is a bend row. **One row per outcome** (E-07): every key §7.1's dry-run outcome table names has
its row here, worded for the cause, detection and outcome of each outcome row that names it (one key may word several
outcome rows); and every `bend.*` and `refuse.*` row here names its producer in its codes column — an outcome row of
§7.1 (a bend a volume's dry run makes under its last row, *every other infeasible declaration*, naming that volume's
section), or, for a gate outside that table, §11.1's export rule (`refuse.exportTier`), §11.2's `advance` on a
dossier-bound document (`refuse.dossierClock`, V06 §2.3), the shell's layer gate (`refuse.layer`, V09 §4.2), V09 §3.9 (`refuse.restore.dossier`) or V10 §3.16 (`refuse.clerk.*`). T-V9-15 checks both
directions. A row's text is the user's words; the design's name for the same concept is the glossary's (`refuse.kept`'s
"Rebuild from {stage}" is §7.1's Re-derive; the re-roll control's "Try again" is New random, and no other control is so
worded — an export's retry is **Retry**, a proposal card's `retry` **Ask again**).
**Every** refusal row carries at least one button, at the least **Show me why** (the why card of the blocking thing, or the help page of the
limit — the target chosen by V10 §3.5 step 3's *The why target*, one rule for this button and the clerk's `why` action,
cited, not restated; J-V9.120) — and the rule is data: every `refuse.*` row's `buttons` end with
`button.showWhy` (T-V9-15). **The button column** is each row's `buttons` list (V09 §2.9's `MsgButton`), in
order and separated by " · ": each button its `button.*` key, then its class and the data the class needs — `commit(…)`
with its source (a `ConflictAction` kind; `alternatives` with its list form `each`; `unplaced`; or `event:<form>`, a row of
*The event forms* below), `why` (with `page` where the row names one), `show(…)` with its `arg`, `tool(<tool>/<mode>)`
with `subject: <argument>` where it acts on the row's thing, `drop`, `app(…)` with its command and argument — and a `when`
in brackets (`[owner]`, `[names]`). A name in backticks after `show`, `subject` or `app` is the `MsgRef` argument it reads
(V09 §2.9's *Arguments a button reads*). The words are *The `button.*` rows* after the table. The shipped rows:

| key | text (placeholders in braces) | buttons — the row's `MsgButton` list (V09 §2.9) | engine codes it renders |
|---|---|---|---|
| `bend.wall.ridge` | "The wall follows the ridge, {m} m off your line." | — | `PreviewResult.bent` (S5a's trace) |
| `bend.wall.reach` | "The wall reaches the {barrier}; the ground between becomes gardens." | — | item 106 (b) |
| `bend.wall.waterfront` | "Kept the harbour open with {n} sea gates." | — | item 106 (d) |
| `bend.wall.open` | "Open ground needs a wall; kept a light wall here." | — | item 106 (c) (V09 §4.7) |
| `bend.road.route` | "The road goes round the {obstacle}; it is {m} m longer than a straight line." | — | S4's router (§4.3) |
| `bend.road.bridge` | "The road crosses the {water} on a new bridge." | — | §7.1's drawn-bridge rule |
| `bend.quarter.snap` | "The quarter's edge follows the streets; it never cuts through a block." | — | §7.1's quarter snap |
| `bend.quarter.size` | "A {kind} quarter here holds at most {n} plots; it stops at {edge}." | — | the kind's size band |
| `bend.place.site` | "{name} fits best {m} m away: {reason}." | `button.putHereAnyway` commit(`event:exactSite`) | S10b's site choice |
| `bend.lake.level` | "The water fills the hollow to {level} m; above that it would spill." | — | S1's basin fill |
| `bend.river.course` | "The river runs downhill, so it reaches {mouth} this way." | — | S1's water operator |
| `bend.harbour.size` | "The shore allows a basin of {size} m² here." | — | §4.8's harbour rules |
| `bend.roster.line` | "{name} went {where} instead: {reason}." | `button.show` show(`name`) | the roster's solve |
| `bend.fill.band` | "This quarter's wealth sets its building sizes; used the nearest mix it allows." | — | the band's rows (§4.7) |
| `refuse.dossierOwned` | "SettlementForge sets this. Change it there, or show a different name on this map." | `button.otherName` tool(`name`/`rename`, subject: `thing`) [names] · `button.showWhy` why | F-EDIT `dossier-owned` |
| `refuse.dossierRemove` | "SettlementForge keeps {thing} in this town. You can move it, or mark this spot as not for it." | `button.moveIt` show(`thing`) — selected with its handles; dragging moves it (V09 §4.6) · `button.notHere` commit(`event:notHere`) · `button.showWhy` why | F-EDIT (§7.7 item 2's list); `rejectSite`, `placeAt` offered |
| `refuse.roster.dossier` | "SettlementForge's record decides this town's places. Place one of them here, or put {thing} on a plot {locus}." — slots: `{thing}` the line's name, or the class's display label when the name is `''`; `{locus}` the line's locus worded by V09 §4.16 (6) ("near the North Gate"), or for a line with none the settlement's name after `in`'s connective ("in Oakford") (J-V9.100) | `button.placeElement` commit(`unplaced`) — V09 §4.16 (5)'s picker · `button.putAt` commit(`event:firstFreeSite`) (not drawn when no `sites` candidate is free of hard fails) · `button.showWhy` why | F-EDIT `dossier-owned` on a `roster` line naming no element — T6 `place`'s one line, any line of T7 `roster`'s list, or the clerk's (§7.1's roster rule; V09 §4.5's T6 and T7) |
| `refuse.locked` | "{thing} is locked. Unlock it to change it, or choose one of the marked places." | `button.unlock` commit(`unlock`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) — the closest acceptable declarations that leave the locked thing untouched (item 101 R2; item 20 (g)) · `button.showWhy` why | `E_LOCKED`; `ConflictAction` `unlock`; `PreviewResult.alternatives` |
| `refuse.assigned` | "{thing} is assigned. Remove the assignment to change it." | `button.unassign` commit(`unassign`) · `button.showWhy` why | `ConflictAction` `unassign` |
| `refuse.assignment.noSite` | "No plot here suits {thing} as it is assigned. The closest places are marked." — the marked places are the refusal's `moveTo` actions | `button.putAt` commit(`moveTo`) — the same declaration at the first `moveTo` target, previewed: an `assign` with its assignment's `target` that plot, a `rejectSite` grouped with `placeAt { plot, element }` (J-V9.111) · `button.showWhy` why | F-EDIT (§5.2 as file f item 582 amends it): an assignment, or the re-placement a `rejectSite` causes (§7.7), that no plot satisfies inside the hard rows |
| `bend.place.noSite` | "{thing} needs {reason}; it went to {site}, the closest place that has it." | `button.chooseMarked` commit(`alternatives`, each `button.putAt`) | the dry run's bend (file f item 582; no plot here in the hard rows); `PreviewResult.alternatives` for the other acceptable sites (file f item 463; file f item 582's alternatives) |
| `bend.place.overBudget` | "Putting {thing} there would move {n} other places; it went to {site}, which moves {k}." | `button.overBudget` commit(`event:exactSite`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) | the dry run's bend (file f item 582; the disruption budget) |
| `bend.vacate` | "This pulls down {building}; its {n} households move to {where}." | `button.keepBuilding` drop (withdraws the edit) | the dry run's bend (file f item 582; item 31's demolition as a fate, item 17's relocation) |
| `bend.room.minArea` | "The {room} stays at {m2} m², the smallest a {role} can be." | `button.roleInstead` commit(`event:roomRole`) · `button.showWhy` why | F-EDIT (plan minimum), bent to the smallest lawful split (V03 §4) |
| `bend.room.noDoor` | "Moved the wall so every household keeps its own door." | `button.showWhy` why | F-EDIT (item 28 (f)), bent to the nearest wall position that keeps each unit's door |
| `bend.room.unreachable` | "Kept a door so every room can still be reached from the entrance." | `button.showWhy` why | F-EDIT (item 28 (f); V03 §3.2 A6), bent to the nearest lawful form that keeps every room reached — the door kept, or moved to the nearest wall whose other side reaches circulation (V03 §4.2) |
| `bend.capacity` | "This building holds at most {max} households; set to {max}." | `button.showWhy` why (J-V9.123) | F-EDIT (`relet` above capacity), clamped |
| `bend.passage` | "A passage needs two storeys above it; it goes under the two-storey part of {building}." | `button.showWhy` why | F-EDIT (`Passage.headroomCm`), moved to the nearest lawful run |
| `refuse.capacity.household` | "{n} households in {district} have nowhere left to live there; move them first." | `button.show` show(`district`) · `button.showWhy` why | §7.1's capacity row: a capacity re-homing that cannot place a household filling no dossier's population (§2.6's capacity rule), the capacities that refuse it named; item 17's relocation first |
| `refuse.works.access` | "These works would cut off {plot} or leave its people without a home; move them first." | `button.show` show(`plot`) · `button.showWhy` why | §7.1's Works row (§5.3; item 67): a plot left without access or a building's occupants unhoused, the plots and households named; item 17's relocation first |
| `refuse.warp` | "That push would move {thing} off its ground. Unlock it, push more gently, or choose one of the marked places." | `button.unlock` commit(`unlock`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) · `button.showWhy` why | F-EDIT (warp carrying a held record); `PreviewResult.alternatives` |
| `refuse.water` | "The new water would reach {thing}, which is kept. Unlock it, move the water, or choose one of the marked places." | `button.unlock` commit(`unlock`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) · `button.showWhy` why | §7.1's lock row: new water with its bank setback meeting a locked or pinned way, wall or finer entity (§7.3 (b) 3); `ConflictAction` `unlock`; `PreviewResult.alternatives` |
| `refuse.water.reservation` | "The new water would reach ground kept for {thing}. Rebuild from {stage} to make room?" — `{stage}` S3's word | `button.rebuildFrom` commit(`event:rederive`) · `button.showWhy` why | §7.1's reservation row: new water reaching a reservation (§7.3 (b) 3), its one resolution the Re-derive from S3 |
| `bend.warp.halved` | "The push went half as far here, so nothing it moves breaks." | — | §7.1's warp-step row: a step that would break an invariant, halved (§3.6) |
| `bend.carve` | "The river takes the deepest course the ground allows, {m} m at most." | `button.showWhy` why | F-EDIT (`carveMaxCm`), bent to the deepest lawful course |
| `refuse.kept` | "That would cut through {thing} made earlier. Rebuild from {stage} instead?" | `button.rebuildFrom` commit(`event:rederive`) · `button.showWhy` why | `E_KEPT`, `E_LEVEL` (§7.1's one resolution) |
| `bend.invalid` | "{field} can't be {value}; set to {nearest}, the nearest it allows." | `button.showWhy` why | §7.1's value-range row: a table cell or an edited path outside its declared range, clamped to the nearest lawful value (`PreviewResult.bent`) |
| `bend.frame.held` | "The town's edge stays out far enough to keep the {n} things you made, locked or pinned." | `button.showWhy` why | §7.1's frame row: a Re-derive whose frame law would leave locked, pinned or declared things or drawn constraints outside, given the smallest frame that encloses them (§3.2 (9); §7.4's frame row) |
| `refuse.stale` | "The town changed while you were working. Here is the new preview." | `button.newPreview` show(`preview`) · `button.showWhy` why | `ConflictAction` `stale`; `doc.rejected { stale }` |
| `refuse.staged` | "{layer} isn't part of this version yet." | `button.showWhy` why(page `staged/{layerId}`, the staged layer's guide page) | F-EDIT naming a staged layer (§7.3 item 9 (d)) |
| `refuse.islandsRung` | "Floating islands exist only in cities and metropolises." | `button.cityUp` commit(`event:cityUp`) · `button.showWhy` why | §7.8's disabled control |
| `refuse.undo.creation` | "This is where the town began, so it stays{; instead}." — `{; instead}` "; remove the assignment instead" for a blueprint assignment, "; you can move {thing} or mark this spot as not for it" for a dossier element the creation placed | `button.unassign` commit(`event:unassignCreation`) · `button.moveIt` show(`thing`) [dossier] · `button.notHere` commit(`event:notHere`) · `button.showWhy` why | §7.1's creation-undo row (E-07: `unassign` for a blueprint assignment; `rejectSite` and `placeAt` for a dossier element) |
| `refuse.undo.dossier` | "Changes from SettlementForge can't be undone here{; move}." — `{; move}` "; you can move {thing} or mark this spot as not for it", `{thing}` the first dossier element the event placed or re-designated; `{name}` the thing a dossier rename renamed | `button.moveIt` show(`thing`) · `button.notHere` commit(`event:notHere`) · `button.otherNameHere` tool(`name`/`rename`, subject: `name`) [names] · `button.showWhy` why | §7.1's port-session row (E-07: `rejectSite` and `placeAt` for each dossier element the event placed or re-designated, as `refuse.dossierRemove` offers them; a dossier `unassign` leaves none) |
| `refuse.undo.dependent` | "Later changes by {authors} depend on this. Undo those first." | `button.showThem` show(`dependents`) · `button.showWhy` why | F-EDIT (independence, §7.4) |
| `refuse.restore.dossier` | "The town can go back only to {time}; SettlementForge changed it after that." | `button.goBackTo` app(`goBack`) · `button.openCopy` app(`openCopy`) · `button.showWhy` why | V09 §3.9 |
| `refuse.viewer` | "You're viewing this town. Ask its owner to make changes." | `button.showWhy` why | `preview` refused `role`; `doc.rejected { role }` |
| `refuse.exportTier` | "This file holds every secret of the town; only its owner can make it." | `button.pictureInstead` app(`exportPicture`) · `button.showWhy` why | `E_KNOWLEDGE_TIER` |
| `refuse.layer` | "{tool} works on the {layer}. Switch to it first." | `button.switch` app(`switchLayer`, `layer`) · `button.showWhy` why | V09 §4.2 |
| `refuse.dossierClock` | "SettlementForge keeps this town's time; make a what-if copy to run it ahead." | `button.whatIf` app(`openCopy`, `seq` — the head: a detached `forkAt`, V06 §4.4; in host mode by `HostSlots.newDocuments`) · `button.showWhy` why | §11.2's `advance` refused on a dossier-bound document (V06 §2.3; J-V6.2); the time card's **Advance** there (V09 §5.6) |
| `refuse.table.rung` | "Below a city the town raises no ways by itself; draw this one yourself with Raised on." | `button.drawRaised` tool(`road`/`way`) — T4 `road`'s options strip with its **Raised** toggle on (V09 §4.20.2) · `button.showWhy` why | §7.1's table-edit row: an `editTable` setting a `raisedWays` row below CITY, item 110 (b)'s rung gate (V11 §4.1, V11 §4.4) |
| `refuse.table.invalid` | "{cell} can't be {value}; it takes {expected}." — `{expected}` the cell's schema as the tables editor words it: a unit and range, an enumeration's values, or a row of the table its `ref` names (V09 §4.14) | `button.showWhy` why | §7.1's table-edit row: a dangling `ref` or a type error in an `editTable` (V11 §4.1) |
| `refuse.table.required` | "{row} is what {readers} fall back to or read, so it stays; edit its cells instead." — `{readers}` the reading stages or tables V11 §4.1 names | `button.showWhy` why | §7.1's table-edit row for a row readers fall back to or need (V11 §4.1: a `defaultRow`, an `allowFallback` target, a totality rule's only cover, a table's named row, the last row of a table not `mayEmpty`), the row marked in the tables editor (V09 §4.14) |
| `refuse.table.knowledge` | "With these rows someone who knows more would see less; a place everyone knows shows at every scale." | `button.showWhy` why | §7.1's knowledge-admission row: `ConflictAction` `invalid` on an `editTable` of `knowledge.admit` (§9.2), the offending rows marked in the tables editor |
| `refuse.style.order` | "This style leaves {n} pairs of layers without an order; set them in the style dialog." | `button.showWhy` why | §7.1's style row: `ConflictAction` `invalid` on a `setStyle` leaving an unresolved or ambiguous layer-order pair (§8.2; J-R39), the pairs listed in the style dialog; nothing applied |
| `refuse.host.cap` | "{host}'s content would make this town {size}, more than a town can hold; it was not added." | `button.showWhy` why | §7.1's host-cap row: a host provider's output past §2.9's cap on pack data and host content |
| `refuse.upgrade.packCap` | "Updating would make this town's copy of {pack} too large to keep, so the town stays as it was made." | `button.notNow` drop — keeps the old model (§7.5) · `button.showWhy` why | §7.1's upgrade row: an upgrade's copy of a pack that stops shipping would pass §2.9's cap (§7.5), "keep the old model" its one resolution |
| `refuse.bug` | "That change hit a fault in the map engine, so nothing changed; the report keeps the details." | `button.showWhy` why | §7.1's bug-abort row: nothing commits; the cause `bug` with its stream key in the report (§5.1 (8), §5.4) |
| `refuse.epoch.cap` | "This town's history has reached the most steps a town can hold, so it runs no further." | `button.showWhy` why | §7.1's epoch-cap row: an `epoch` past §6.1's epoch component (2³¹ − 1); nothing commits |
| `share.pack` | "This town uses the setting pack {pack}, which isn't built in. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (pack) |
| `share.corpus` | "This town uses your own name list {list}. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (user corpus) |
| `share.host` | "This town uses content from {host}. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (host content) |
| `share.kept` | "This town was kept from a saved copy, so a link can't rebuild it. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (rebased base) |
| `share.long` | "Too many changes for a link. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (2 000 characters) |
| `fate.kept` | "stays as you made it" | — | `EditFate` `kept` |
| `fate.carried` | "moves with its new surroundings" | — | `carried` |
| `fate.orphaned` | "loses what it was attached to; it stays in the history and can be re-attached" | `button.reattach` app(`reattach`) | `orphaned` |
| `fate.discarded` | "your change is removed" | — | `discarded` |
| `error.workerRestarted` | "The map engine restarted. Nothing was lost." | — | V09 §3.14 |
| `error.workerDead` | "The map engine could not restart. Your town is saved; download it or reload the page." | `button.download` app(`download`) · `button.reload` app(`reload`) | V09 §3.14 |
| `error.engine` | "This browser can't run the map engine: {reason}." | — | `E_ENGINE_UNAVAILABLE` |
| `error.previewSlow` | "Big change: the preview will show when you let go." | — | V09 §3.14 |
| `error.storageFull` | "Your computer is out of space for saved towns. Download this town to keep it." | `button.download` app(`download`) | quota |
| `error.storageNone` | "This browser won't let the editor keep your town. Download it to keep your work." | `button.download` app(`download`) | IndexedDB refused |
| `error.exportFailed` | "The export stopped: {reason}. Nothing was saved. Retry?" | `button.retry` app(`retry`) | an exporter's error |
| `error.openRefused` | "This file can't be opened: {reason}." | — | `open` / `generate` errors |
| `info.upgrade.offer` | "Made with {version}; it opens as it was made, and updating it to {current} adds what's new." | `button.seeChanges` app(`seeUpgrade`) · `button.notNow` drop | §2.9 step 3, §7.5 (V09 §3.14 (a); standalone only) |
| `error.frozen` | "Made with {version}, shown read-only and not checked by this version; edit it with this version, or replay it exactly with the command below." | `button.editWithVersion` app(`editWithVersion`) [owner] · `button.copyCommand` app(`copyCommand`) | §2.9 step 2 (V09 §3.14 (b)) |
| `error.frozen.damaged` | "Part of this saved copy is damaged, so it can't be edited here; replay it exactly with the command below." | `button.copyCommand` app(`copyCommand`) · `button.showWhy` why | §2.9 step 2's damage: a chunk missing its content hash, or the records root differing at the rebase |
| `error.frozen.pack` | "This town needs the setting pack {pack}, which can't be added here; replay it exactly with the command below." | `button.copyCommand` app(`copyCommand`) · `button.showWhy` why | §2.9 step 2's missing pack; §7.5's 2 MB cap at the `frozenImport` rebase |
| `error.frozen.noModel` | "Made with {version}, and this file keeps only its recipe and changes; open them with this version, or replay it exactly with the command below." | `button.openRecipe` app(`openRecipe`) · `button.copyCommand` app(`copyCommand`) | §2.9 step 2's document without `model` (V09 §3.14 (c)) |
| `error.mismatch` | "This saved town differs from what its recipe rebuilds ({n} differences). Keep the saved town, or use the rebuilt one?" | `button.keepSaved` app(`keepSaved`) · `button.useRebuilt` app(`useRebuilt`) | §2.9 step 4 |
| `error.recoveryPartial` | "Recovered your town up to {time}. {n} later changes could not be replayed." | `button.downloadThem` app(`downloadUnreplayed`) | V09 §3.8 |
| `error.newerApp` | "This town was saved by a newer version of the editor; it opens read-only here." | `button.reload` app(`reload`) · `button.download` app(`download`) | a `LocalDocRecord.appVersion` above the running one (V09 §2.11, V09 §3.14) |
| `error.linkVersion` | "Made with {old}, shown with {new}; small differences are expected." | — | §6.4 |
| `success.applied` | "{change}." | `button.undo` app(`undo`) | every commit |
| `success.saved` | "Saved {file} ({size})." | — (J-V9.123) | V09 §3.10 |
| `success.restored` | "Went back to {name}." | `button.undoGoingBack` app(`undoGoingBack`) | V09 §3.9 |
| `bend.under.accessDug` | "Dug a way down from {building} so people can live there." | `button.useAnotherBuilding` commit(`alternatives`, each `button.digDownFrom`) — on the canvas the stepping button, while the dry run's `alternatives` holds a building not yet tried (V09 §4.17.4); the list form, one per building where a card shows every alternative at once (V10 §3.16), `{building}` read at the card's reader's key — the canvas at the role's key, J-V9.86; the clerk at its session key (J-V9.118) · `button.showWayIn` show(`created:access`) | V09 §4.17.4 (file f item 372) |
| `bend.under.accessOpening` | "Opened a way down at {place} so people can live there." | `button.showWayIn` show(`created:access`) · `button.showWhy` why (steps 2 and 3 run only when no building qualifies, so no building is offered) | V09 §4.17.4 |
| `bend.under.noAccess` | "Nobody can reach this cave yet, so the homes stand above it." | `button.addWayDown` tool(`place`/`access`) — T6 `place`'s Below access mode on a chosen spot · `button.showWhy` why | V09 §4.17.4 (4): the dry run's bend onto ground part 0 (item 101 R2) |
| `bend.under.basement` | "No full cellar fits under {building}, so it gets {form}." — `{form}` the basement form laid: "a half cellar" · "a walk-out cellar" · "a hatch to a crawl space" | `button.showWhy` why | §7.1's `addUndergroundAccess` outcome row: the nearest lawful basement form by §2.6's requested-mode ladder (II.7.6 step 1; V09 §4.17.4) |
| `refuse.under.basement` | "No way down fits under {building}: {gate}." — `{gate}` the terrain gate that ruled out the last form (§2.6), in words: "it stands over water" · "the ground is damp" · "the ground floods" · "the water lies too high" | `button.showWhy` why | §7.1's `addUndergroundAccess` outcome row: no basement form the terrain admits (§2.6's requested-mode ladder; II.7.6 step 1; V09 §4.17.4) |
| `refuse.under.route` | "No passage can be dug down from {building}: {reason}." — `{reason}` "it would run longer than {m} m" (the route's bound) · "{blocker} is in the way" (the building, cellar or dug passage that encloses it) · "the water lies too high on the way" (the water table) | `button.showWhy` why | §7.1's `addUndergroundAccess` outcome row: the connector past its route's bound or with no route (`E_NO_PATH`; II.7.6 step 3; V09 §4.17.4) |
| `bend.catacomb.church` | "Churches keep crypts; catacombs lie under cemeteries. This is {church}'s crypt." | `button.startCatacomb` commit(`event:catacombUnder`) · `button.showCrypt` show(`crypt`) | V09 §4.17.5 (a) |
| `bend.catacomb.join` | "{town} may have {count} catacombs; this joins the Catacombs of {name}." | `button.showWhy` why | V09 §4.17.5 (b) |
| `bend.catacomb.charnel` | "{town} may have {count} catacombs; {ground} keeps a charnel vault instead." | `button.joinCatacombs` commit(`event:joinCatacomb`) | V09 §4.17.5 (b) |
| `bend.catacomb.belowTown` | "Catacombs come with towns; {ground} keeps a charnel vault." | `button.showWhy` why | V09 §4.17.5 (c) |
| `bend.catacomb.noGround` | "Catacombs lie under cemeteries; this is a vault." | `button.startItUnder` commit(`event:catacombUnder`) | V09 §4.17.5 (d) |
| `bend.crypt.cathedral` | "A cathedral always keeps its crypt, the largest in {town}; kept at its smallest, {m2} m²." — `{m2}` from the bend's kept ring (V03 §3.7.4 (1)) | `button.cryptSmallest` commit(`event:cryptSmallest`) | V03 §3.7.4's crypt-edit dry run (V09 §4.17.5 (e)) |
| `bend.crypt.largest` | "The cathedral keeps the largest crypt; this one stops at {share} of the cathedral's." | `button.cryptEnlarge` commit(`event:cryptEnlarge`) | V03 §3.7.4's crypt-edit dry run: the rank cap `crypt.rankShare` × the principal's area (V09 §4.17.5 (e)) |
| `bend.ruin.axis` | "The old walls run on the ruin's own lines; your room turned {deg}° to follow them." | — | V04 §4.1's ruin chamber |
| `info.catacomb.stagnant` | V10 §3.9a's stagnation line (its text, single source) | `button.showWhy` why | `CatacombComplex.blockedBy` non-empty |
| `info.catacomb.stopped` | V10 §3.9a's `stopped` state line | `button.showCemetery` show(`source`) | `blockedBy` holds `sourceClosed` |
| `info.catacomb.overCount` | V10 §3.9a's `overCount` count line | `button.showWhy` why | `CatacombComplex.overCount` |
| `info.catacomb.blocked.<cause>` | this volume's words, one per `blockedBy` value — V09 §4.17.5's "Over time" lines (`reach`, `wet`, `system`, `foundation`, `wallStrip`, `depth`; `rank` is V10 §3.9a's rank line) | — | `CatacombComplex.blockedBy` |
| `fate.catacomb.removed` | "The catacomb gives up {m2} m²; it will not dig here again." | `button.undo` app(`undo`) | a `delete` of catacomb galleries (J-V4.56) |
| `fate.access.lastWay` | "This was the last way into {place}; {n} households there leave." | `button.keepWayOpen` drop (withdraws the edit) | a `bricked`, `delete` or `seal` of a cluster's last access (V04 §4.3) |
| `info.under.deep` | V10 §3.9a's sealed-deep-void line | — | a sealed void's `underground` section (item 109 (j) (5)) |
| `info.under.sealed` | V10 §3.9a's unexcavated line | `button.addWayDown` tool(`place`/`access`) | an `unexcavated` cluster (V04 §3.5.7 (g)) |
| `info.under.cause.<rule>` | this volume's words, one per `AccessCause.rule` — V09 §4.17.3's table | — | an access point's `underground` row |
| `why.section.<kind>` | a why section's title, one per section V10 §3.9 registers: `underground` "Below ground" · `crypt` "The crypt" · `raised` "Raised ways" · `massing` "Its shape" · `plan` "Inside" · `fabric` "The streets around it" · `island` "Shade from above" · `move` "Over time" | — | `WhyCardModel.sections[].title` (V09 §2.7) |
| `clerk.key.unchecked` | "Saved. The key will be checked when you are back online." | — | `setKey` returning `unchecked` (V09 §4.11) |
| `clerk.host.mark` | "{host}'s assistant (AI)" | — | a host proposal's card (V09 §4.11) |
| `clerk.defect.<kind>` | `previewMismatch` "The assistant's preview and the map's differed." · `badRequest` "The AI service turned down a request." · `placeholder` "A step of a proposal no longer matched the map." · `creationDigest` "A new town came out differently from its preview." | — | V10 §2.8's `DefectRecord.kind` (V09 §5.12) |
| `clerk.defects.none` | "No problems recorded." | — | an empty defect store (V09 §5.12) |
| `clerk.key.missing` | "The assistant needs your own key for the AI service." | `button.enterKey` app(`enterKey`) · `button.notNow` drop | the drawer's first opening, only where the deployment's configuration enables the built-in clerk with a user's key — standalone, or a host that asks for one (V09 §4.11; J121) |
| `clerk.cap.warn` | "The assistant has used {share} of this month's limit of {usd}." | `button.changeLimit` app(`openSettings`) | V10 §3.18 |
| `clerk.cap.reached` | "The assistant has reached this month's limit of {usd}." | `button.changeLimit` app(`openSettings`) | the meter's foot line only (V09 §4.11; V10 §3.18); the drawer's refusal card at the cap is `refuse.clerk.budget` (V10 §3.16) |
| `info.viewAs` | "Viewing as: {tier}." | `button.showEverything` app(`viewAsOff`) | V09 §4.8 |
| `info.viewAs.host` | "Turn off “See what the players see” to choose another view." | — | V09 §4.8 (the View as menu while a host's players' view is set) |
| `info.copy.saved` | "Saved a copy to your computer as {file}; it does not follow {host}." | — | V09 §3.9's host-mode rule under `newDocuments: 'download'` |
| `info.copy.rerunEdits` | "{n} later hand edits were not carried; they stay in this map." | — | the same, after a re-run (V09 §3.9) |
| `info.copy.condensed` | V06 §3.15.5's line, "history before year N was condensed; the copy starts at year N" (its text, single source, loaded from volume 6 as V09 §4.9's explanation paragraph loads volume 10's families; `{year}` for N) | — | `forkAt` or `rerunFrom` bent to the earliest seq before a rebase point (V06 §3.15.5, V06 §4.4; J-V6.98): the copy's `forkedFrom.seq` above the seq asked (V09 §3.9's *Before a rebase point*) |
| `clerk.newMap.line` | "Describe the new town — this one stays as it is" | — | the drawer's Start a new map from this (V09 §4.11) |
| `history.group.party` | "The party" | — | the history panel's host group (V09 §4.10) |
| `history.dossierFacts.creation` | "Made from SettlementForge's record" | — | the history panel's creation head (V09 §4.10) |
| `report.moved.<kind>` | one per `ReportEntry.kind` (§5.4): `place` "{element} now stands on {site}." · `reject` "{site} is marked as not for {element}; it stands elsewhere." · `lapse` "The mark keeping {element} off {site} has lapsed." · `open` "{use} opened on {to}." · `close` "{use} closed on {from}." · `relocate` "{use} moved from {from} to {to}." · `mutate` "{plot} was rebuilt for this change." · `disruption` "This change moved a few places nearby." · `disruption.over` "This change moved more places than its limit." · `rename` "{from} is now called {to}." · `works.start` "Work began on {works}." · `works.cancel` "Work on {works} stopped." · `works.finish` "Work on {works} is finished." | `button.show` show(`entry`) — the entry's element, use, plot or works | `ReportEntry.kind`, `disruption.overBudget`, `works.op` — the report panel's "What moved" and the history's report-entry lines (V09 §5.7, V09 §4.10; J-V9.109) |
| `report.dossier.<state>` | one per `GenerationReport.dossier` state (§5.4): `placed` "{element} stands on {site}." · `rejectedSite` "{site} is marked as not for {element}." · `blocked` "{element} can't stand on {site}; the closest places that suit it are marked." | `button.show` show(`entry`) — the element; for `blocked`, its `closest` sites marked | `GenerationReport.dossier[].state` — the report panel's placement state (V09 §5.7; J-V9.109) |
| `success.deleted` | "Moved {town} to Recently deleted. It stays there for 30 days." | `button.undo` app(`restoreTown`) · `button.show` app(`showDeleted`) | V09 §5.12 |
| `bend.retaining.moved` | "The wall follows the step in the ground, {m} m off your line." | `button.keepMyLine` commit(`event:retainingFlat`) | V09 §4.20.1 (3) (a) |
| `bend.retaining.flat` | "The ground is flat here, so a terrace {h} m high goes on the {side}, with this wall on its edge." | `button.otherSide` commit(`event:retainingOtherSide`) | V09 §4.20.1 (3) (b) |
| `info.crossing.stair` · `info.crossing.ramp` | "{way} climbs the terrace by a stair." · "{way} climbs the terrace by a ramp." | `button.showWhy` why | the dry run's crossing form (item 110 (a)) |
| `bend.crossing.steep` | "Too steep for a ramp on a {class}; the stair stays." | `button.longerRamp` commit(`event:rampLonger`) | file f item 364 |
| `bend.raised.clearance` | "The deck stays {m} m above {way} so carts can pass under." | — | file f item 364 (the clearance bent up) |
| `bend.raised.end` | "A raised way comes down to the ground; its end moved {m} m to {place}." | — | V09 §4.20.2 (2) |
| `bend.raised.wall` | "The raised road comes down before the {wall} and passes through its gate." | `button.showWhy` why | file f item 363 |
| `bend.wall.aqueductArch` | "The wall lets the aqueduct through by an arch." | — | file f item 363 |
| `bend.wall.raisedCrossing` | "The wall meets {way} at its nearest pier and takes that pier into the wall; the raised way stays as it is." — `{way}` the raised way's name, else its kind's word | `button.showWhy` why | §7.1's outcome row for a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a standing raised way: the trace bent through the raised way's station on the deck at its level nearest where it would cross, its setback, glacis, berm and channel stopped at the under-deck strip's edges where a support, ramp, stair or foot stands in them or the span is `vault`, nothing else of the raised way changed (§2.7's support step (6) (b); V09 §4.20.2 (4)) |
| `bend.wall.held` | "{way} still rests on this stretch of wall, so it stays standing." — `{way}` as in `bend.wall.raisedCrossing` | `button.showWhy` why | §7.1's outcome row for a hand `convert` `breach` or `dismantle` meeting the stretch held under a raised way's crossing station while its deck stands: the op on its stretch less the held stretch, and an op wholly on the held stretch changing nothing, with this line (§2.7's support step (3); V09 §4.20.2 (4)) |
| `bend.raised.underSpan` | "{name} passes under {way} through its nearest open arch, {m} m off your line." — `{name}` the drawn way's or channel's name, else its kind's word; `{way}` the raised way's, as in `bend.wall.raisedCrossing` | `button.showWhy` why | §7.1's outcome row for a ground `drawWay`, a moved way or a carve meeting a standing raised way's supports, ramps, stairs, feet or a `vault` span's strip, or crossing its under-deck strip elsewhere than under an `open` span: the way or channel moved to cross under the nearest `open` span that holds it (§4.3; §2.7's support step (6) (b); V09 §4.20.2 (4)) |
| `bend.aqueduct.source` | "Water runs downhill, so the aqueduct starts at {source}, {m} m higher." | `button.showWhy` why | V09 §4.20.2 (5) |
| `bend.aqueduct.terminal` | "Added a fountain where the aqueduct ends, on {place}." | — | V09 §4.20.2 (5) |
| `bend.aqueduct.uphill` | "No spring or river lies high enough within {km} km to feed {terminal}, so it has a well instead." | `button.showWhy` why | the dry run's bend to a well pin at the terminal (J-VI.4 (h); V09 §4.20.2 (5)) |
| `bend.raised.island` | "A road cannot reach a floating island; a hoist, rope line, stair or bridge of light can." | `button.roadToFoot` commit(`event:roadToFoot`) · `button.showWhy` why | the dry run's bend to `placeSkyAccess` (J-VI.4 (d); V05 §4.2; V09 §4.20.2 (6)) |
| `bend.aqueduct.island` | "An island's water is its own; the aqueduct ends here." | `button.showWhy` why | the dry run's bend to the last ground vertex outside the island (J-VI.4 (d); V05 §4.2) |
| `bend.raised.onIsland` | "An island carries no raised way; its bridges cross its river on their own decks." | `button.showWhy` why | the dry run's bend: `raised` dropped, the way on the island's ground (J-VI.4 (e); V05 §3.22 (3)) |
| `bend.aqueduct.onIsland` | "An island's water is its own; a fountain stands where the aqueduct would end." | `button.showWhy` why | the dry run's bend to a fountain pin at the stroke's end (J-VI.4 (e); V05 §4.2) |
| `bend.retaining.rim` | "The rim walk stays level; the wall stands inside it." | `button.showWhy` why | the dry run's bend inward past the rim walk (J-VI.4 (g); V05 §3.22 (4); V09 §4.20.9) |
| `bend.deck.full` | "The {deck} has no free plot there; placed it on {plot}." | `button.showWhy` why | V09 §4.20.4 (1) |
| `bend.deck.class` | "A {class} can't stand on a {deck}; placed it at the {deck}'s landward end." | `button.showWhy` why | volume 11's `deckOk` (V09 §4.20.4 (2)) |
| `bend.deck.floors` | "A {deck} carries at most {n} storeys." | — | V02 §4.6 (5) |
| `bend.deck.single` | "A {deck} carries small, light buildings; this one stays a single range." | `button.showWhy` why | V02 §4.6 (5): a `family: 'stepped'` op on a deck building |
| `bend.deck.basement` | "No cellar can go over the water; it went to {building}, the nearest on the ground." | `button.show` show(`building`) | V03 §4.2 |
| `bend.tiers.stepped` | "Made {building} a stepped building first." | — | V02 §4.6 (1): a `tiers` op on a building not stepped |
| `bend.tiers.count` | "Only {n} tiers fit on this base; made {n}." | — | V02 §4.6 (1) |
| `bend.tiers.step` | "A step that wide leaves no second tier; used {m} m, the widest that fits." | — | V02 §4.6 (1) |
| `bend.tiers.axial` | "This stack takes its stairs straight up the front." | `button.stairsInside` commit(`event:stairsInternal`) · `button.showWhy` why | V02 §4.6 (1): `flights` on a round or octagonal stack; `internal` over a solid tier 0 with a storeyed tier above |
| `bend.tiers.none` | "No stairs reach these tiers: the stack is sealed." | `button.stairsFront` commit(`event:stairsAxial`) · `button.stairsFaces` commit(`event:stairsFlights`) | V02 §4.6 (1), (4): `internal` where every tier is solid; a stair removed over a solid tier 0 |
| `bend.tiers.internal` | "The tiers are reached by stairs inside." | `button.stairsFront` commit(`event:stairsAxial`) | V02 §4.6 (1), (4): `none` over a storeyed tier 0; a stair removed over a storeyed tier 0 |
| `bend.tiers.form` | "Those stairs need {m} m in front of the building; kept the {form}." | `button.showWhy` why | V02 §4.6 (1) |
| `bend.tiers.top` | "The shrine no longer fits; the top is flat." | — | V02 §4.6 (1) |
| `bend.tier.height` | "The stair up this tier needs room on the terrace below." | — | V02 §4.6 (2) |
| `bend.stack.base` | "Raised the tier below instead, by {m} m." | — | V02 §4.6 (2): a `baseCm` on a wing standing on a tier |
| `bend.stack.roof` | "A {tier} here takes a {roof} roof." | — | V02 §4.6 (1), (3) |
| `bend.stack.groundWing` | "The new {wing} stands on the ground beside the lowest tier." | `button.changeShape` tool(`shape`/`massing`, subject: `building`) | V02 §4.6 (4) |
| `bend.building.remove` | "Removed the building with its last wing." | — | V02 §4.2, V02 §4.6 (4) |
| `bend.row.plotLine` | "Moved the plot line with the wall; {neighbour}'s plot changes too." | `button.show` show(`neighbour`) | V02 §4.2 |
| `bend.wing.grow` | "Grew the wing to the smallest it can be, {m} m wide." | — | V02 §4.2 step 2 |
| `bend.family.nearest` | "{building} can't take that shape here; made it the nearest that fits." | `button.showWhy` why | V02 §4.2 |
| `bend.room.passage` | "With no gate range here, the gate hall is a passage through {wing}." | — | V02 §4.3 |
| `bend.room.host` | "A {room} needs a larger wing; it went to {wing}." | — | V02 §4.3 |
| `info.remove.holds` | "The town won't {rebuild \| raise} this {kind}; undo brings it back." | `button.undo` app(`undo`) | V06 §2.13's suppression; V05's removed slots (V09 §4.20.3); every delete dry-run line of V06 §3.19.3 (6) and V06 §4.2 |
| `info.remove.holds.deck` | "No house will be built on this spot of the {deck}; undo brings it back." | `button.undo` app(`undo`) | the same, for a deck plot (V06 §3.19.3 (6)) |
| `info.raised.count` | "{n} raised ways in {town}; the rules build up to {cap} by themselves." | — | V06's ledger (V09 §4.20.2 (8)) |
| `info.raised.walk` | "A walked way follows the ground." | — | V07's walk mode (V09 §4.20.2 (10)) |
| `disabled.onlyBelow` | "Tunnels are dug below the ground." | `button.switch` app(`switchLayer`, `layer` — the Below layer) | V09 §4.2 |
| `effect.added` | "The city raises a {kind}: {reason}." (and "{thing} is added" for other kinds) | `button.show` show(`targets`) | file f item 465 `added` |
| `effect.route.detour` | "{route} now goes round by {way}, {m} m longer." | `button.show` show(`targets`) | `rerouted` |
| `effect.way.joined` | "{way} now meets {way2} at a crossing." | `button.show` show(`targets`) | `joined` |
| `effect.water.lost` | "{terminal} loses its water." | `button.show` show(`targets`) | `lost` |
| `effect.vault.removed` | "The arch vault under {way} goes, with what is in it." | `button.show` show(`targets`) | `removed` (V04 §3.5.4's arch vault) |
| `effect.plan.lost` | "{building}'s drawn plan goes with it." | `button.show` show(`targets`) | `removed` (V03 §3.11's stored plan) |
| `effect.deck.ruined` | "{n} buildings on the {deck} fall with it." | `button.show` show(`targets`) | `removed` (item 110 (d)) |
| `effect.households.displaced` | "{n} households move to make room for {thing}." | `button.show` show(`targets`) | `displaced` |
| `effect.walls.rebuilt` | "{n} retaining walls are laid again along the new edge." | `button.show` show(`targets`) | `rebuilt` |
| `effect.stairs.relaid` | "The stairs of {building} are laid again." | `button.show` show(`targets`) | `rebuilt` (V02 §4.6 (2)) |
| `effect.raised.goes` | "{name}, a {kind}, goes: a town builds none by itself." | `button.keepAsYours` commit(`event:keepRaised`) | `removed` on a Re-derive to TOWN (V09 §4.20.3 (7)) |
| `effect.moved` | "{thing} moves {m} m." | `button.show` show(`targets`) | `moved` |
| `effect.more` | "and {n} other changes" | `button.show` app(`showEffects`) | `effectsMore` |
| `offer.raised.standing` | "The {n} raised ways standing stay; remove them too?" | `button.removeToo` commit(`event:removeStanding`) | V09 §4.14 |
| `import.removed` | "The rules would have built {kind} here; kept removed." | `button.show` show(`slot`) | file f item 455 |
| `import.nothingToRemove` | "{kind} was removed in the original; the rules did not build it here." | — | file f item 455 |
| `bend.raised.skyAccess` | "This would cut {island}'s {access}; the raised way ends here." | `button.showWhy` why | the dry run's bend to the last ground vertex before a sky access's column or rope line where `skyAccessObstacles` offers no re-route (J-VI.4 (f); V09 §4.20.2 (6)) |
| `bend.island.keepRoom` | V05 §4.2's line, "{island} keeps room for its {institution}; shrunk to {area} ha" (its text, single source, loaded from volume 5) | `button.showWhy` why | V05 §4.2: a hand resize below the island's floor |
| `bend.island.rimStop` | V05 §4.2's line, "{island} keeps room for its {institution}; the rim stops here" (its text, single source, loaded from volume 5) | `button.showWhy` why | V05 §4.2: a rim reshape bent back to the furthest lawful position |
| `bend.island.handMax` | V05's line, "An island takes at most {n} ways up by hand; moved {access} here" (its text, single source, loaded from volume 5) | `button.deleteOneFirst` show(`access`) — the hand-placed access the bend moves, selected for its Delete (V09 §4.6) · `button.showWhy` why | a `placeSkyAccess` past `accessCount.handMax`, bent into a move of the island's nearest hand-placed access (V05 §3.23, V05 §4.2; J-V5.82) |
| `bend.island.belowCity` | V05's line, "Floating islands need a city; this quarter is laid on the ground" (its text, single source, loaded from volume 5) | `button.cityUp` commit(`event:cityUp`) · `button.showWhy` why | a `quarter` with `sky` below CITY from the API or the clerk, bent to the plain quarter (V05 §3.23's events row) |
| `bend.island.join` | V05's line, "At most three islands float here; this quarter joins {island}" (its text, single source, loaded from volume 5) | `button.showWhy` why | a fourth forced slot, bent to join the nearest open island as a district on it (V05 §3.2 (3); J-VI.4 (a)) |
| `bend.island.lastAccess` | V05's line, "An island keeps one way up; moved to {site}" (its text, single source, loaded from volume 5) | `button.placeOtherAccess` tool(`road`/`skyAccess`) · `button.showWhy` why | a `delete` of an island's last access, bent into a move to the next admissible site (V05 §4.2; J-VI.4 (c)) |
| `bend.island.footMoved` | "The way up lands clear of {pier}." — this volume's words (V05 names the bend, not its line) | `button.showWhy` why | an access foot blocked by a standing raised part, moved to the nearest admissible foot, naming the deck or raised-way pier in the way (V05 §4.2; J-VI.4 (b)) |
| `bend.island.accessKind` | "A {asked} won't work here, so this way up is a {kind}; {kinds} would fit." — this volume's words, naming the kinds that fit (V05 §4.2) | `button.showWhy` why | an access kind the `magic` circumstance or the row's limits do not admit, bent to the nearest admitted kind (V05 §4.2; J-VI.4 (b)) |
| `bend.hood.noClock` | V06 §4.1's line, "a neighbourhood alone has no history yet — open it in its town to advance time" (its text, single source, loaded from volume 6) | `button.showWhy` why | `advance` on a standalone neighbourhood document, bent to none (V06 §4.1; CANON-C02) |
| `bend.wall.newStretch` | "Its stone is gone, so a new stretch is built here." | `button.showWhy` why | a hand `repairWall` on a `dismantled` run or `repairRetaining` on a ruined stretch, bent to a `drawWall` on its line (V06 §2.8; J-VI.4) |
| `bend.raised.newSpan` | "That span is gone, so it is rebuilt as a new span." | `button.showWhy` why | a hand `repairRaised` on a dismantled span or a cleared support (V06 §2.8; J-VI.4) |
| `info.wall.inUse` | "This wall is in use; nothing changes." | — | a no-stretch `repairWall` with no neglect to lift (V06 §2.8) |
| `info.wall.patchOnlyGap` | "Only a gap is patched; this stretch can be rebuilt in {material}." | — | the **Material** chip's patch rows on a `worn` or `patched` run (V09 §4.21.4) |
| `info.wall.run` | "{state} since {year}{, material}." — `{state}` the run's condition word (`legend.wall.<state>`), `{, material}` ", patched with {material}" on a `patched` run | — | a wall run's panel line (V09 §4.21.4) |
| `legend.wall.<state>` | `standing` "Wall" · `worn` "Weathered wall" · `patched` "Patched with {material}" · `breached` "Breach" · `dismantled` "Wall taken down" | — | §8.2's wall state rows, the legend panel (V09 §4.21.4; item 114 (e)) |
| `wall.material.robust` | "In {material}" — the wall's own material word, the enceinte kind's `label` cell | — | the **Material** chip's first choice (V09 §4.21.4) |
| `info.oasis.badge` | "An oasis: {grove} ha of grove and {gardens} ha of gardens." | — | T2 `ground`'s Lake ghost with **Spring-fed** on (V09 §4.21.1) |
| `info.oasis.dossier` | "SettlementForge's record puts water here." | `button.showWhy` why | a water body carrying the dossier's `oasis_water` (DR40; V09 §4.21.1) |
| `info.grand.beyondTier` | "{building} is grander than a {tier} usually has; kept as you made it." | — | a hand design above the rung's grandeur ceiling (item 115 (c); V09 §4.21.5) |
| `info.grand.dossier` | "SettlementForge's record names {building}, so it keeps its full design." | — | a dossier-specified grand building (item 115 (c); V09 §4.21.5) |
| `info.history.symbolic` | "size not recorded" | — | the chip on a fact whose provenance carries `symbolic` (§2.8; item 113 (f); V09 §2.7) |
| `info.history.fromRecord` | "From SettlementForge's record" | — | T1 `intend`'s locked **History** chip with a dossier history (V09 §4.21.3) |
| `info.history.cancelled` | "No town was made." | `button.generateWithoutHistory` app(`generateWithoutHistory`) | a history-first generation stopped during its replay (V06 §3.20.4; V09 §4.21.9) |
| `info.past.viewing` | V06 §5.1's band, "Year {year} — viewing the past" (its text, single source, loaded from volume 6) | `button.openCopy` app(`openCopy`, `seq` — the frame's on screen; in host mode by `HostSlots.newDocuments`) | the timeline thumb off "now": the band, and each disabled tool pressed (V06 §5.1; V09 §5.6) |
| `info.recipe.preset` | "Made from the preset {preset}." | — | `Recipe.presetId` (§2.9), the advanced panel's head (V09 §4.14); the report panel's recipe line after `info.recipe.line`, from `GenerationReport.recipe` (V09 §5.7) |
| `info.recipe.line` | "Made from seed {seed} at {rung}." | — | `GenerationReport.recipe` (§5.4): the report panel's recipe line (V09 §5.7) |
| `report.history.<line>` | `peak` "Once a {tier} of about {n} people, in {year}." · `symbolicPeak` "Once a {tier}; its size is not recorded." · `destroyed` "Destroyed in {year}; refounded in {year2}." · `oldWalls` "Walls beyond today's houses: the {tier}'s old line." · `oldStreets` "Old street lines under {district}." · `buried` "Buried under {place}: {kind}." · `oversize` "{building} is larger than today's {tier} needs." | `button.show` show(`entry`) | §2.7's `HistoryRecord` and V06's replay record (V06 §2.14): the report panel's "What its past left" (V09 §5.7, V09 §4.21.3) |
| `info.under.lost` | "Once known; its way in closed in {year}." | — | a void whose excavation reading is `lost` (V04 §3.5.7; item 113 (e)), shown at tier `secret` only (V09 §4.17.1) |
| `info.under.lostUndated` | "Once known; its way in has closed." | — | the same, when no closing is dated (V09 §4.17.1) |
| `legend.under.lost` | "Once known" | — | the Below legend's entry for a `lost` void (V09 §4.17.1) |
| `view.cvd.<variant>` | `none` "Usual colours" · `protan` "Red-weak" · `deutan` "Green-weak" · `tritan` "Blue-weak" · `line` "Colours: {variant}" | — | the **Colour vision** chip (V09 §4.21.2; §8.2's `CvdVariant`) |
| `export.vtt.walls` | "Patches count as walls, breaches as openings." | — | the export dialog's VTT tab (V09 §4.21.4; item 114 (f)) |
| `info.zoom.limit` | "This is the whole town." | — | the zoom-out control at the map's zoom-out limit where the bounds fit (V09 §4.21.6; §8.8) |
| `info.zoom.limitCamps` | "This is the whole town and its camps." | — | the same, at the limit widened while a crisis look stands (item 122 (i); V09 §4.21.12 (8)) |
| `info.zoom.coarsest` | "This is as far out as the map zooms; the town is wider than this window." | — | the same at stop 0, where no stop fits the bounds (§8.8's limit; V09 §4.21.6) |
| `view.season.<name>` | `spring` "Spring" · `summer` "Summer" · `autumn` "Autumn" · `winter` "Winter" · `week` "Week {w}" · `follow` "Follow SettlementForge" · `noWeek` "SettlementForge's record has no date yet; the map shows week {w}." · `line` "{season}, week {w}" | — | the **Season** control and the export's season line (V09 §4.21.7) |
| `view.festival.<name>` | `title` "Festivals" · `row` "{festival}, weeks {a}–{b}" · `on` "Decorate when a festival is on" · `off` "No decorations" · `preview` "Preview" · `spring` "Spring feast" · `midsummer` "Midsummer" · `harvest` "Harvest home" · `midwinter` "Midwinter" · `line` "Dressed for {festival}" | — | the festival list, its switch, the standalone generic festivals and the export's festival line (V09 §4.21.8) |
| `find.<word>` | the Find panel's words (V09 §4.21.10): `title` "Find" · `box` "What are you looking for?" · `count` "{name} · {n}" · `more` "{n} more" · `allWord` "All {word}s" · `none` "none now" · `noMatch` "Nothing in this town matches “{text}”." · `withheld` "not in this view" · `moreBelow` "{n} more Below" · `onSky` "{n} on Sky" · `onGround` "{n} on the ground" · `goThere` "Go there" · `goTo` "Go to" · `next` "Next" · `previous` "Previous" · `clear` "Clear" · `gaps` "Show gaps" · `gapsNeedKind` "Pick a kind of place to see where there is none." · `noneHere` "none here" · `people` "Where is someone?" · `foundRooms` "{n} found" · `crisisRow` "{look}: {condition}" · `exportLine` "Find: {chips}" · `exportBattle` "Draw Find" · `findAll` "Find all {kind}s" · `section.dossier` "From SettlementForge's record" · `section.kinds` "Kinds of place" · `section.areas` "Districts and quarters" · `section.places` "Named places" · `section.crises` "Crises now" · `section.people` "People" | — | the Find panel, its chip strip, the context menu's item and the export dialog's lines (V09 §4.21.10) |
| `find.group.<key>` | one per V11 §2.3's `FindGroup`: `crafts` "Crafts" · `trade` "Trade" · `faith` "Faith" · `rule` "Rule and law" · `defence` "Defence" · `learning` "Learning" · `health` "Health and care" · `lodging` "Lodging" · `other` "The rest" | — | the empty box's grid headings (V09 §4.21.10 (3); item 120 (b)) |
| `settings.display` · `settings.resolution.<level>` | `settings.display` "Display"; `title` "Resolution" · `auto` "Auto" · `4k` "4K" · `1440p` "1440p" · `1080p` "1080p (HD)" · `720p` "720p" · `screen` "Your screen is {level}." | — | Settings' Display section (V09 §5.12, V09 §4.21.11; item 121 (a)) |
| `view.status.<part>` | `auto` "Auto · {level}" · `manual` "{level}" · `why.screen` "Your screen is {level}." · `why.memory` "This device's graphics memory holds {level}." · `why.frames` "Lowered to keep the map smooth." · `why.ceiling` "{level} is the live view's ceiling." · `tier` "Graphics tier: {tier}; map tiles at {dpr}×." | — | the view-status chip and its tooltip (V09 §4.21.11; §8.8's view status, J-R22) |
| `info.resolution.fallback` | "{level} needs more graphics memory than this device has; showing {shown}." | — | a manual level the device cannot hold: §8.8's nearest level that fits (item 121 (f); V09 §4.21.11 (4)) |
| `view.crises.<word>` | `show` "Show crises" · `preview` "Preview a crisis" · `list` "Crises now" · `line` "During: {looks}" | — | the Show menu's switch, preview and list; the export dialog's line (V09 §4.21.12) |
| `crisis.who.<kind>` · `crisis.groups.<kind>` | the forces' words, for the kinds the dossier sizes (item 122 (h)): `who` — `siege` "besiegers" · `blockade` "besiegers" · `occupation` "soldiers" · `refugeeCamp` "people"; `groups` — `siege` "armies" · `blockade` "armies" · `occupation` "garrisons" · `refugeeCamp` "groups" | — | `info.crisis.forces` (V09 §4.21.12 (5)) |
| `info.crisis.<line>` | `line` "{look}: {condition}, weeks {a}–{b}" · `lineOpen` "{look}: {condition}, since week {a}" · `lineUnnamed` "{look}, weeks {a}–{b}" · `preview` "{look} — a preview" · `ruinedFor` "For now: {look}, {condition}, weeks {a}–{b}" · `forces` "about {n} {who}{, groups}" — `{who}` the look's `crisis.who.<kind>` word, `{, groups}` ", {k} {groups}" where the dossier gives several forces or groups, `{groups}` its `crisis.groups.<kind>` word · `massed` "The rest are drawn as massed camps at the edge of the map." | — | the standing looks of §11.2's `looks` reader, `{condition}` each look's `name`, `{look}` each look row's `label` (V11 §3.25.9) (V09 §4.21.12 (4), (5)); volume 10's explanation renders the same keys |
| `info.damage.<kind>` | one per line kind V03 §4.6 maps the damaged element kinds to (`upperFloor` and `groundFloor` → `floor`; `cellarWall`, `cellarVault` → `cellar`; `cryptWall`, `cryptVault`, `cryptTomb` → `crypt`; each other kind its own key), with `storeyGone` and `unsafe`, in this order: `roofBay` "Roof fallen in over {rooms}" · `floor` "Floors rotten or fallen through in {rooms}" · `storeyGone` "The {storey} is gone" · `outerWall` "Outer walls broken in {n} places" · `partition` "Partition walls down in {rooms}" · `door` "{n} doors off their hinges" · `window` "{n} windows broken" · `stair` "The stair to the {storey} has fallen" · `furniture` "Furniture broken in {rooms}" · `unsafe` "Unsafe to enter: {rooms}" · `cellar` "The cellar has partly fallen in" · `crypt` "The crypt has partly fallen in"; the head, one per state — `head.abandoned` "Abandoned{, years}" · `head.decayed` "Decayed{, years}" · `head.ruined` "In ruins{, years}" · `head.restored` "In use again{, years}", `{, years}` ", {years} years since it was left"; and `more` "and {n} more" · `patched` "Patched with {material} where it was broken" | — | V03's damage layer at V06's `decayLevel` by §6.3 *Plan damage*'s comparison: the plan panel's and the why card's lines (V09 §4.21.13); volume 10's explanation renders the same keys |
| `settings.device` · `settings.weather.<word>` | `settings.device` "On this device"; `effects` "Weather effects" · `shower` "Start a shower now" · `noneNow` "No weather comes here at this time of year or day." | — | the advanced panel's device group, its switch and its button, and the button's reason while no kind is live (V09 §4.14, V09 §4.21.14) |
| `people.rederive` | "Re-derive people" | — | the People panel's and a household's control (V09 §4.18; §10.3) |
| `island.rim.<mode>` | `resize` "Resize" · `reshape` "Reshape the rim" | — | the island panel's rim chip (V09 §3.5) |
| `progress.stage.<group>` | `ground` "Shaping the ground and the water" · `plan` "Working out what the town needs" · `streets` "Laying out the streets" · `walls` "Raising the walls" · `quarters` "Dividing the quarters" · `plots` "Cutting the plots" · `places` "Finding a place for everything" · `buildings` "Shaping the buildings" · `land` "Fields, gardens and trees" · `names` "Naming streets and places" · `drawing` "Drawing the map" · `people` "Settling the people" · `below` "Digging the underground" | — | the progress view's stage line (V09 §4.21.9; item 119 (c)) |
| `progress.<wait>` | `epoch` "Year {year} of {years}{, steps}" · `history` "Replaying the town's past: {year}{, steps}" · `dossier` "Reading SettlementForge's record{, catchUp}{, steps}" · `export` "Writing the {format}: {percent} %" · `migrate` "Updating this town to this version" · `undo` "Going back: {n} of {total} changes" · `verify` "Checking this town against its recipe: {n} of {total}" — `{, steps}` ", in {n}-year steps" where the run coarsened (V06 §6.8: `EpochReport.advance.cadenceWeeks` against `.requestedWeeks`; `ReplayPlan.epochYears`), `{, catchUp}` ", year {year} of {years}" while an absorb's catch-up folds epochs | — | the progress view's line for a one-time wait that is not a stage run (§11.2's `Progress.wait`), and for Go back to here (from a history row or a restore point; `undo`, from `edit`'s `onProgress`); `verify` the view status's quiet line for an open's verification replay (V09 §4.21.9, V09 §3.9; §12.1, §11.2) |
| `edge.<case>` | `morePoints` "Add another point." · `drawRound` "Draw round an area." · `samePoint` "The ends are the same point." · `frameEnd` "The town ends here." · `nothingToChoose` "Nothing to choose here." · `removed` "That was removed." · `allKept` "Everything here is kept." · `fewVersions` "Only {n} different versions here." · `noLinks` "No supply links in view." · `noSupplier` "No other supplier of {good}." · `keyTaken` "Already used by {action}." · `noneStanding` "None standing." · `noDeckPlots` "No plots on this {deck}." · `oneTier` "One tier has no stairs." · `nothingToShow` "Nothing to show here." · `allMade` "Everything you asked for was made." · `stepGone` "This step's thing is gone." · `nothingToExport` "Nothing to export here." · `townGone` "That town is no longer on this computer." · `unreadable` "This town could not be read." · `nameLetter` "A name needs a letter." · `replaceOldest` "Replace the oldest named point?" · `nothingToApply.<form>`, one per empty form of §7.1's *Empty edits*: `noStrokes` "Nothing to change: the warp has no strokes." · `shortStroke` "Nothing to change: the stroke is too short." · `noArea` "Nothing to change: the shape has no area." · `noMatch` "Nothing to change: nothing matches." · `noLines` "Nothing to change: the list has no lines." · `noQuarters` "Nothing to change: no quarters are chosen." · `noFace` "Nothing to change: nothing lies in that area." · `noAlternative` "Nothing to change: nothing here has another version." · `groundLocked` "Nothing to change: the ground there is locked." | — | V09 §3.16's outcomes, one row per case named there; an empty dry run's reason (§7.1's *Empty edits*), carried as `PreviewResult.empty` (§11.2) |
| `parse.<word>` | V09 §4.16's connectives, a locale's own words: `rel.in` "in" · `rel.on` "on" · `rel.at` "at" · `rel.near` "near · by · beside · next to" (the first word is the one written, V09 §4.16 (6)) · `side` "the {side} side of" · `dir.N` "north" · `dir.E` "east" · `dir.S` "south" · `dir.W` "west" · `kind.gate` "gate" · `kind.square` "square" · `kind.market` "market" · `kind.harbour` "harbour" · `kind.bridge` "bridge" | — | V09 §4.16's reader and its wording (4), (6) |
| `why.driver.<driver>` | one per term of §4.5's field that `FieldDrivers.terms` names: a driver-table row's display label (its `label` cell, file f item 516), and this volume's words for the rest — `water` "Water close by in dry country" (item 111 (b)) · `character` "The kind of quarter it is" · `brush` "Your painting" · `epoch` "The years since" · `chance` "Chance" (`daylight` reads "In shade {p} % of the day", V09 §2.7) | — | `WhyCardModel.bars` from drivers (V09 §2.7) |

**The `button.*` rows** (one per wording, shared by every row that offers it; tone `info`; J-V9.121):
`button.putHereAnyway` "Put it here anyway" · `button.show` "Show" · `button.otherName` "Show a different name" ·
`button.otherNameHere` "Show a different name on this map" · `button.moveIt` "Move it" · `button.notHere` "Not here" ·
`button.placeElement` "Place {element} here" · `button.putAt` "Put it at {site}" · `button.unlock` "Unlock" ·
`button.unassign` "Remove the assignment" · `button.showWhy` "Show me why" · `button.chooseMarked` "Choose another of the
marked places" · `button.overBudget` "Put it there anyway ({n} moves)" · `button.keepBuilding` "Keep {building}" ·
`button.roleInstead` "Make it a {role2} instead" · `button.rebuildFrom` "Rebuild from {stage}" · `button.newPreview` "Show
the new preview" · `button.cityUp` "Make this town a city" · `button.showThem` "Show them" · `button.goBackTo` "Go back to
{time}" · `button.openCopy` "Open a copy from here" · `button.pictureInstead` "Save a picture instead" ·
`button.switch` "Switch" · `button.downloadFile` "Download file" ·
`button.reattach` "Re-attach" · `button.download` "Download" · `button.reload` "Reload" · `button.retry` "Retry" ·
`button.seeChanges` "See what changes" · `button.notNow` "Not now" · `button.editWithVersion` "Edit it with this version" ·
`button.copyCommand` "Copy the command" · `button.openRecipe` "Open its recipe with this version" · `button.keepSaved`
"Keep saved" · `button.useRebuilt` "Use rebuilt" · `button.downloadThem` "Download them" · `button.undo` "Undo" ·
`button.undoGoingBack` "Undo going back" · `button.useAnotherBuilding` "Use another building" · `button.digDownFrom` "Dig
down from {building} instead" · `button.showWayIn` "Show the way in" · `button.addWayDown` "Add a way down" ·
`button.startCatacomb` "Start a catacomb under {ground}" · `button.showCrypt` "Show the crypt" · `button.joinCatacombs`
"Join it to the Catacombs of {name}" · `button.startItUnder` "Start it under {ground}" · `button.cryptSmallest` "Make it as
small as allowed ({m2} m²)" · `button.cryptEnlarge` "Enlarge the cathedral's crypt too" · `button.showCemetery` "Show the
cemetery" · `button.keepWayOpen` "Keep a way open" · `button.enterKey` "Enter a key" · `button.changeLimit` "Change the
limit" · `button.showEverything` "Show everything" · `button.keepMyLine` "Keep my line" · `button.otherSide` "Use the other
side" · `button.longerRamp` "Make the ramp longer" · `button.roadToFoot` "Draw a road to its foot" · `button.stairsFront`
"Stairs along the front" · `button.stairsFaces` "Stairs up the faces" · `button.stairsInside` "Put the stairs inside" ·
`button.changeShape` "Change the building's shape" · `button.keepAsYours` "Keep it as yours" · `button.removeToo` "Remove
them too" · `button.whatIf` "Make a what-if copy and advance it" · `button.drawRaised` "Draw the raised way" ·
`button.generateWithoutHistory` "Generate without its history" ·
`button.deleteOneFirst` "Delete one first" · `button.placeOtherAccess` "Place a different access". A `ConflictAction`'s `msg` (file f item 463) is keyed as the button that carries it: `unlock` → `button.unlock`,
`unassign` → `button.unassign`, `moveTo` → `button.putAt` (`{site}` its target's name). A slot a row's text does not fill
is filled from the entry the button carries (V09 §2.9's *Words*).

**The event forms** (`MsgButton.event`; a `commit` from `event` carries exactly these events, the canvas building them from
the draft and the row's `MsgRef`, and volume 10's `propose` the same bytes, T101-3; J-V9.121):

| form | the events it commits | its rule |
|---|---|---|
| `exactSite` | the draft re-mapped at the plot the user asked for, with "this plot only" (V10 §4.1's `where.plot`), its disruption taken as the preview lists it | file f item 582's exact site; V09 §4.5's T6 `place` |
| `notHere` | `rejectSite` of the dossier-backed thing's site (T6 `place`'s **Not here**) | V09 §4.3's T6 row; §7.2 |
| `firstFreeSite` | `placeAt { plot, designation }` on the first `SiteCandidate` with no `hardFails` of V09 §4.5's T6 `place` `sites` query for the line's locus — nothing when none of the three is free | V09 §4.5's T6 row; V10 §4.1 |
| `rederive` | the declaration with a Re-derive from `{stage}` — §7.1's one resolution of `E_KEPT` and `E_LEVEL` — previewed as V09 §3.3's whole-town ghost | §7.1; V09 §3.3 |
| `cityUp` | `adjust` of T1 `intend`'s size to small city (T1's size chips) | V09 §4.5's T1 row; §7.8 |
| `unassignCreation` | `unassign` of the assignment the creation event made | §7.4's target rule; V09 §3.9 |
| `roomRole` | the draft re-mapped with the room's role `{role2}` (the smallest lawful split) | V03 §4 |
| `stairsAxial` · `stairsFlights` · `stairsInternal` | `tiers { stairs: 'axial' }`, `{ stairs: 'flights' }`, `{ stairs: 'internal' }` on the row's `building` (the stair chip) — `stairsInternal` nothing where tier 0 has no storeys | V09 §4.20.5 (1); V02 §4.6 |
| `retainingFlat` | the drawn line's flat-ground form, a `terrace` whose edge carries the wall | V09 §4.20.1 (3) (b) |
| `retainingOtherSide` | the same form with the terrace on the other side of the line | V09 §4.20.1 (3) (b) |
| `rampLonger` | the crossing's ramp lengthened along the way to its class's grade — nothing where the way's run does not allow it | file f item 364 |
| `roadToFoot` | the same sky access plus a ground `drawWay` of the stroke's class from its first point to the access's foot, one group | V09 §4.20.2 (6) |
| `catacombUnder` | the drawn chamber moved to the centroid of `{ground}`'s burial face (nearest by distance, ties by address), where V09 §4.17.5's ladder places it | V09 §4.17.5 (a), (d) |
| `joinCatacomb` | a `drawTunnel` from the charnel vault to the nearest element of the Catacombs of `{name}` | V09 §4.17.5 (b) |
| `cryptSmallest` | the cathedral's crypt kept at its smallest lawful size, `{m2}` m² — the bent result, accepted in words | V09 §4.17.5 (e) |
| `cryptEnlarge` | the two-event group enlarging the cathedral's crypt, then this crypt | V09 §4.17.5 (e) |
| `keepRaised` | one declared `drawWay { raised: true, class, widthCm, points }` along `{name}`'s course, in the Re-derive's group (the **Keep them as yours** checkbox for that way) | V09 §4.20.3 (7) |
| `removeStanding` | each standing generated raised way removed as V09 §4.20.3 (2), in one group | V09 §4.14; V09 §4.20.3 (6) |

**The application commands** (`MsgButton.command`; `app` buttons run them and never edit by themselves; none sits on a
row a dry run answers, T-V9-15):

| command | what it runs | where |
|---|---|---|
| `download` | the document's `.plat` to the device (ctrl / cmd+S's command) | V09 §4.13; V09 §3.14 |
| `reload` | reloads the page | V09 §3.14 |
| `retry` | the failed export again with its options | V09 §3.10 |
| `seeUpgrade` | the upgrade's diff (§2.9 step 3, §7.5) | V09 §3.14 (a) |
| `editWithVersion` | the `frozenImport` rebase | V09 §3.14 (b) |
| `copyCommand` | the replay command to the clipboard | V09 §3.14 (b) |
| `openRecipe` | the recipe and its log opened with this version | V09 §3.14 (c) |
| `keepSaved` · `useRebuilt` | §2.9 step 4's choice | V09 §3.14 |
| `downloadUnreplayed` | the changes recovery could not replay, as a file | V09 §3.8 |
| `undo` | `undo(h)` of the group the line names | V09 §3.9 |
| `undoGoingBack` | the matching redo group of a Go back to here | V09 §3.9 |
| `restoreTown` · `showDeleted` | Recently deleted's **Restore** of that town; the list | V09 §5.12 |
| `goBack` · `openCopy` | **Go back to here** at `{time}`'s seq; **Open a copy from here** at the row's `seq` — `{time}`'s, the frame's on the past view (`info.past.viewing`), or the head for `refuse.dossierClock`'s what-if copy, detached | V09 §3.9, V09 §5.6 |
| `exportPicture` | the export dialog on its Picture tab (PNG) | V09 §5.10 |
| `share` | the share sheet | V09 §5.11 |
| `switchLayer` | the working layer set to the row's `layer` | V09 §4.2 |
| `reattach` | the orphan's re-attach pick | V09 §4.10 |
| `enterKey` | the key card | V09 §4.11 |
| `openSettings` | Settings' Assistant section | V09 §5.12 |
| `viewAsOff` | View as cleared | V09 §4.8 |
| `showEffects` | the fates sheet's **What else changes**, paged | V09 §5.5 |
| `generateWithoutHistory` | a new town from the stopped request with its history replay off (`history.replay` false, the parity presets' setting; V06 §3.20.4) | V09 §4.21.9 |

The tool hints are §14's table's texts, keyed `hint.<tool>`; this volume adds `hint.variations` ("Three versions: pick one,
or ask for three more."), `hint.restore` ("Every change is saved. Step back to any point here."), `hint.links` ("Lines
show who buys from whom. Click one to change it."), `hint.shade` ("Darker streets spend more of the day in shade.") and
`hint.clerk` ("Ask for a walled harbour town with a temple quarter."), `hint.oasis` ("In dry country a lake can be
spring-fed: an oasis, with its grove and gardens.", the first time T2 `ground`'s Lake mode is picked on an arid site), `hint.raised` ("A raised way crosses what is
below without meeting it; its ends come down by stairs or ramps.", the first time Raised is turned on) and `hint.below`
("Click again to pick what's underneath.", the first time a click lands on a stack of more than one mark) and `hint.find`
("Type what you're looking for; pick as many as you like.", the first time the Find panel opens), each recorded in
`AppPrefs.hintsDone`. Every `host.*` key volume 8 names is a row of the same file, its text volume 8's (V08 §3.9's
held reasons, V08 §4.2's controls and undo words, V08 §4.6's port notes and history lines — `HostSlots.historyLines`'
texts, V09 §4.10 — V08 §5.1's strips and banner rows, `host.locked`, and the draft mirror's discard notice).

**The explanation and assistant keys — one text each (J-V9.79).** The same file carries the key
families volume 10 renders, so the drawer, the why card and the panels draw one sentence per key. Their `en` texts are
written once, in the section named — volume 10's, volume 7's for the village lines, or volume 3's for the plan panel's
warnings — and loaded into
`messages/en.json` from there; this volume does not restate them:

| family | one key per | its `en` text is written in |
|---|---|---|
| `critique.K1` – `critique.K18` | critique row | V10 §3.10's template column |
| `refuse.clerk.<category>` (with `refuse.clerk.key.<keyState>` for the `key` row's three sentences and `refuse.clerk.dossier.count` for the `dossier` row's count sentence) and `refuse.clerk.opsDevice` | one key per `RefusalCategory` value whose V10 §3.16 row words the refusal itself — every value but `lock`, `rule` and `role`, whose cards render the engine's `refuse.*` row for the code — `refuse.viewer` for `role` | V10 §3.16's table; V10 §2.10 |
| `clerk.notice` | — | V10 §3.20's data notice |
| `clerk.alt.*` | each key V10 §5.4's list of the drawer's keys names (*The keys of the drawer's words*): each alternative of a V10 §3.16 row (`clerk.alt.<category>.<n>`, `<n>` its position in its row), the help route's tool button, the history buttons, a critique finding's fix, a Find block's buttons (`clerk.alt.find.show`, `.remove`, `.clear`; V10 §3.9b (7)) and the stale card's **Ask again** (`clerk.alt.stale.retry`) — so every `ClerkAction` `label` that is not a `button.*` row's words has its key | V10 §3.16's alternatives column; for the other keys, the V10 sections V10 §5.4's list cites |
| `clerk.view.cleared` | — | V10 §3.12 (6)'s line when the view's key changes |
| `clerk.applied` | — | V10 §4.4's applied card line |
| `info.raised.<outcome>` | each of the `raised` section's ten outcomes (`built`, `declared`, `carried`, `belowCity`, `reasonNotMet`, `noCourse`, `chance`, `cap`, `suppressed`, `waited`) | V10 §3.9's outcome table (this volume's `info.raised.count` and `.walk` above are its own badge lines, not outcomes) |
| `info.under.*` | each `underground` row of V10 §3.9a — the ruin rows, `LinkCause`, the excavation reading, the dwellings line, `deep`, `sealed` | V10 §3.9a — except `info.under.cause.<rule>` (V09 §4.17.3) and `info.under.lost` (V09 §4.17.1; item 113 (e)), whose words are this volume's, because V10 §3.9a names the causes and the `lost` reading without words |
| `info.catacomb.*` | each value of `CatacombComplex.source.kind`, the rank and count lines, each state, and each burial-face outcome of `catacombOutcome` (`holds`, `countReached`, `wet`, `age`, `island`, `belowTown`, `chance`) | V10 §3.9a — except `info.catacomb.blocked.<cause>`, whose words are this volume's (V09 §4.17.5), for the same reason |
| `info.crypt.*` | the `crypt` section's rows: presence, area and form (full, half, raised-choir, the rim vault), rank, the crypt join, no crypt (dry and wet ground) | V10 §3.9a's `crypt` table |
| `info.plan.*` | each `plan` section row of V10 §3.9a — the eleven item-110 room causes and the three `PlanReport.notes` ids, keyed as V03 §4.6 states (`info.plan.cause.<cause>` for the causes, `info.plan.note.<id>` for the notes) | V10 §3.9a's `plan` table |
| `info.village.*` | each row of V07 §4.5's list | V07 §4.5 |
| `report.plan.<code>` | each `PlanReport.warnings` code of V03 §2.3's union: `W_TIER_UNREACHED`, `W_STOREY_RUN`, `W_ENTRANCE_NO_STOREY`, `W_STACK_ACCESS`, `W_DECK_ACCESS`, `W_GRADE_FACE_TUNNEL`, `W_CHURCH_CATACOMB_HEAD` | V03 §4.5's plan-warning lines |
| `kind.<registry kind>` | each kind of `clerk.content.withheldWords` | V10 §2.10's `content.withheldWords` row |

A shipped locale carries every key of every family (T-V9-15, T-V10-29). V09 §4.17 and V09 §4.20.6 name the row each place
shows by its key; its words are the owning volume's.
=== END ===

=== REPLACE #### 4.20.2 Raised ways and aqueducts (item 110 (b)) ===
#### 4.20.2 Raised ways and aqueducts (item 110 (b))

1. **Controls.** T4 `road`'s options strip gains a basic toggle **Raised** and a class chip **Aqueduct**; the chip turns Raised
   on and locks it while chosen. While a T4 stroke is drawn on the Ground layer, **PageUp** turns Raised on for that stroke
   and **PageDown** off — the surveyed road tools' elevation keys (`research/ux/tool-survey.md` Part II, B2-S5). PageUp and
   PageDown keep stepping the depth band while Below is the working layer (V09 §4.13).
2. **Snapping with Raised on** (V09 §3.4's row). The two ends snap only to ground vertices — junction vertices, way
   centre-lines (the end splits that way at commit, making a ground vertex) and plot frontage points. Interior points snap
   to nothing on ground part 0 and never split a way they cross; Shift's 15° rule still applies. An end released away
   from any ground vertex is bent by the dry run along the course to the nearest one (`bend.raised.end`).
3. **Forms.** Two points → the base's raised-way course solver (the one generation and V06's epoch step call; V06 §3.19)
   derives the course; a line → the drawn line is the deck's centre-line, resolved and stored as §7.1 stores a points form.
   Mapper: `drawWay { class, widthCm, raised: true, points | from: { points } }` (file f item 362 (b)); the Aqueduct chip sends
   `class: 'aqueduct'`.
4. **Walls** (file f item 363; J-V9.61). A raised road or viaduct whose course meets an enceinte's trace ramps down to a
   ground vertex before it and passes through the gate the ground way makes there (`bend.raised.wall`). An aqueduct
   passes through an arch in the curtain, never a gate (item 110 (b)), and its ghost draws the arch mark. From the other
   side, a wall T3 `wall` draws across a standing aqueduct shows an arch in its ghost, not a gate
   (`bend.wall.aqueductArch`). **Later work across a standing raised way** gives way to it, the raised way held (§2.7's
   support step (6) (b); §7.1's outcome table): a wall T3 `wall` draws, a trace vertex moved or a stretch re-anchored
   across one crosses it through its station on the deck at its level nearest where it would cross, that pier built into
   the wall (on an aqueduct, the arch), its setback, glacis, berm and channel stopped at the under-deck strip's edges
   where a support, ramp, stair or foot stands in them or the span is `vault`, nothing else of the raised way changing
   (`bend.wall.raisedCrossing`); while the deck stands, a **Change over time** breach or dismantle (V09 §4.3's T3 row)
   meeting the stretch held under its crossing station leaves that stretch standing (`bend.wall.held`; §2.7's support
   step (3)); and a ground road T4 `road` draws, a way moved or a carve across it crosses under its nearest `open` span
   that holds it, never over a support, ramp, stair, foot or `vault` span (`bend.raised.underSpan`; §4.3).
5. **The aqueduct's ends.** Its first point snaps to a spring or a river reach (its source), its last to a square, a
   fountain pin, a `conduit_house` plot or a cistern of the vaults system (its footprint lit on the ground; II.7.6) — its
   terminal; its course falls all the way at volume 11's `aqueduct.gradient`. A source lying lower than the terminal is
   bent to the nearest source above it within `aqueduct.sourceReachKm` (`bend.aqueduct.source`); with none in reach, the
   dry run bends the stroke to a well pin at the terminal (`instance { op: 'add' }` of a well pin, the base's decoration
   pins, §4.7 S11; J-VI.4 (h)) and commits no way, named by `bend.aqueduct.uphill`, whose alternative is "Show me why"
   (J-V9.75). A terminal released on open ground gets a new fountain
   pin there in the same group (`instance { op: 'add' }`; in a square it is the square's centrepiece, §4.7 S11), named by
   `bend.aqueduct.terminal`. Its buried stretches stay the base's line on ground part 0 (file f item 244); the ghost draws
   them dashed.
6. **A floating island** (V05 §4.2, V05 §3.22 (3); J-VI.4 (d), (e)). A raised or aqueduct stroke never makes a way to or on
   an island, and the dry run bends it (item 101 R2): a raised stroke that ends on an island's rim becomes `placeSkyAccess`
   with the stroke's ends as top and foot and the kind V05 §3.10 admits there, named by `bend.raised.island` in V05's words,
   whose alternative is **Draw a road to its foot** (the same access plus a ground `drawWay` of the stroke's class from its
   first point to the access's foot, one group); an aqueduct stroke that ends on a rim ends at its last ground vertex
   outside the island's footprint (`bend.aqueduct.island`, "An island's water is its own; the aqueduct ends here.", with
   "Show me why"). A raised or aqueduct stroke wholly on an island's key never arises from the canvas, because Raised and
   Aqueduct are hidden on Sky (V09 §4.20.9); from the clerk or a skeleton the dry run drops `raised` and draws the way on the
   island's ground (`bend.raised.onIsland`), and makes an aqueduct a fountain pin at its end (`bend.aqueduct.onIsland`),
   each with "Show me why". A raised course that would cut a sky access's column or rope line, where `skyAccessObstacles`
   offers no re-route, ends at its last ground vertex before it (`bend.raised.skyAccess`; J-VI.4 (f)); T-V9-52 has a
   fixture with a hoist across the stroke.
7. **Rungs.** The Raised toggle and the Aqueduct chip are offered at every rung, the village rungs included (V07 §4.1's
   T4 `road` row); at TOWN and below the user's declaration is the only source (item 110 (b)). Nothing about the cap disables
   them: a declared way counts toward the generator's cap and is never refused by it (V06 §2.13's `declared`).
8. **Badge.** With Raised on, the first line reads "Raised", then "raised {m} m · {n} arches · crosses {k} ways with no
   junction · up to {h} m above the ground · {v} vaults beneath" (the vaults by V04 §3.5.4's span rule); an
   aqueduct adds "from {source} to {terminal} · falls {f} m". At CITY and METROPOLIS the last line reads `info.raised.count`
   ("{n} raised ways in {town}; the rules build up to {cap} by themselves") — a fact from V06's ledger, never a limit.
   A raised or aqueduct stroke leaves its ghost pending with **Accept** — its course and its crossings are for the user to
   judge (J-V9.4) — and never commits on release; each crossing without a junction is drawn as a small bridge mark.
9. **Devices and keys.** Points by arrows and Enter; the toggle is in the options
   strip; PageUp and PageDown as (1).
10. **State and walk mode** (J-V9.73). The toggle and the chip hold while T4 `road` stays the active tool, like the class chips,
    and reset to off each time T4 is picked. They are never stored in `AppPrefs`, because a toggle left on by accident turns
    the next street into a viaduct. While V07's walk mode is on, Raised and Aqueduct are disabled with `info.raised.walk`
    ("A walked way follows the ground"); the clerk or the tool API may still send both, and V07's dry run bends them to the
    points form (V07 §4.1).
11. A course longer than `raised.previewOnReleaseKm` previews on release (V09 §3.14). The bars are T-V9-51 and
    T-V9-52.
=== END ===

=== REPLACE ### 4.21 Items 111–126 on screen ===
### 4.21 Items 111–126 on screen

Each owner item's rules are the base's and their volumes' (V09 §1.3); this section is the application's part of each,
as the canon routes it — its controls, words, panels, lifecycle and bar. Every word is a V09 §4.9 row, every gesture runs
V09 §3.3's pipeline, and every view setting is view state that never changes the model or its hash.

**4.21.1 The oasis — T2 `ground`'s spring flag (item 111).**
1. **The control.** T2 `ground`'s **Lake** mode gains the toggle **Spring-fed (oasis)** (a `ToolParamRow` of kind `toggle`,
   `basic`, default off; `toolkit.json`, V09 §2.3), offered on every site on Ground — an oasis the user draws may stand on
   any site, since item 111 (d)'s "only on arid sites" binds generation and not a drawing — and hidden on Sky (an island's
   water is V05's; item 111 does not apply there). `hint.oasis` shows the first time the Lake mode is picked on an arid
   site (the biome's climate row, §4.2 S0).
2. **The mapper.** With the toggle on, the lake's points-and-level form maps to `drawWater { kind: 'lake', add: [], from: {
   points: [p], levelCm, spring: true } }`, the flag inside the points form (§7.1's `PointsForm.spring`; §7.1's T2 `ground` row;
   item 111 (a)); the dry run fills the basin (S1's basin fill,
   `bend.lake.level` where the level spills) and lays the oasis's grove and irrigated gardens (§4.2 S1; §2.3's
   `WaterBody.spring`). Commit on Accept, since the grove and gardens re-flow plots.
3. **The ghost and badge.** The ghost draws the water, the grove and the gardens (§8.2's rows); the badge's extra line is
   `info.oasis.badge` ("An oasis: {grove} ha of grove and {gardens} ha of gardens"), the areas read from the preview's
   created land-use faces (`PreviewResult.created`, their `entity` answers), and the usual counts.
4. **After commit.** The oasis is a declared water body (held, §7.2): its level handle as any lake's (V09 §3.5); its flow
   slider ("The spring fails" · "The spring runs again") is V06 §4.2's hand form (`setAttr` on `WaterBody.spring.flow`);
   Delete removes the water, the grove and the gardens as one previewed group (V09 §4.20.3 (1)). The history row reads "Made
   an oasis at {place}" (V09 §4.10). The why card's bars carry the water term as `why.driver.water` (V09 §4.9; item 111
   (b)), whose explanation rows are volume 10's.
5. **From the dossier.** An oasis a dossier's `oasis_water` deposit makes (DR40) is dossier-owned: its panel shows
   **Spring-fed** on and locked ("Set by SettlementForge"), its why card's `facts` row reads `info.oasis.dossier`
   ("SettlementForge's record puts water here"), a Delete takes `refuse.dossierRemove` (§7.7 item 2), and the level handle
   stays (a map-side value the dossier does not set).
6. **Edges.** The toggle on a lake whose point lies in no hollow bends the level as any lake (`bend.lake.level`); a spring
   on an island never arises (hidden); undo removes the oasis, its grove and its gardens in one step; a save, a reload, a
   Regenerate and an epoch keep it (declared). The bar is T-V9-71.

**4.21.2 Colour vision and the second cues (item 112 (a)); the trial (item 112 (b)).**
1. **The setting.** The view bar's Map group and Settings' Accessibility section (V09 §5.12) carry **Colour vision**: "Usual
   colours" · "Red-weak" · "Green-weak" · "Blue-weak" (`view.cvd.<variant>`), writing the per-viewer view key `cvdVariant`
   (`'none'` · `'protan'` · `'deutan'` · `'tritan'`, §8.2's `CvdVariant`). §8.2 joins it to the tile key and lays the sheet's
   checked variant; the legend (§9.5) draws the variant's swatches; picture exports made while it is set draw it, and the
   export dialog's Picture tab shows the line "Colours: {variant}" with a chip to switch it for that export. It is not
   logged, never crosses a bridge and is never in a digest (V09 §2.12); Settings writes the machine default
   `AppPrefs.cvdDefault`, which a view reads while its town holds no value.
2. **The second cues.** Every colour-coded meaning of this volume's thematic views carries a second cue — a pattern, a
   line style, a label or a shape — stated once in V09 §5.4's cue column, one channel per cue; the style families' cues
   are §8.2's. The chrome's own status colours always pair with an icon and words (V09 §5.1).
3. **The trial** (item 112 (b)) is V09 §7.6's protocol.
4. **Edges.** A sheet without a checked variant for the chosen deficiency draws its palette with its second cues (§8.2);
   an unknown stored value reads `'none'`. The bar is T-V9-72.

**4.21.3 A town with a past — the history option, what the past left, a lost void (item 113).**
1. **The History chip.** T1 `intend`'s sheet gains **History**: "None" · "Once a {tier}" — a picker of the rungs above
   the town's own (item 113 (a), "once a city, now a village") — with, behind More, an **Age** stepper (years, default
   `history.defaultAgeYears` = 300, our own, calibratable; confirmed by T-V9-73's fixture replaying within item 119's
   ten-second comfort level in total, item 119 (a2)). A pick maps to
   `adjust('history', { peak: { tier: rung, symbolic: false, evidence: [] }, ageYears, scars: [] })` — §2.7's standalone
   form of `HistoryHint` — the blueprint's `history` (§4.2 S0), and "None" to `adjust('history', undefined)`. In the
   empty state it is part of the new town's recipe; after a declaration it is a Re-derive from S0 (§7.1), previewed as
   the whole-town ghost with its fates (V09 §3.3), the replay's wait shown by the progress view (4.21.9). With a dossier
   history (DR36–DR39) the chip reads `info.history.fromRecord` ("From SettlementForge's record") and is locked; the
   replay is the port's.
2. **What its past left.** The report panel (V09 §5.7) gains the section "What its past left", one line per
   `report.history.<line>` row read from §2.7's `HistoryRecord` and V06's replay record (V06 §2.14) — the peak (or the
   symbolic peak), each destruction and refounding, the old walls and streets, each buried system, an oversized building —
   each with **Show** on its targets. A fact whose provenance carries `symbolic` shows the chip `info.history.symbolic`
   ("size not recorded") beside its tier chip (V09 §2.7); the story is volume 10's.
3. **A lost void** (item 113 (e)) is V09 §4.17.1's (`info.under.lost`; the Below legend's "Once known").
4. **Edges.** "Once a {tier}" is not offered at the town's own rung or below; at METROPOLIS the picker is empty and the
   chip reads "None" only; a standalone neighbourhood document has no History chip (it has no clock, V06 §4.1); undo of the
   Re-derive restores the former recipe and model; a skeleton carries the blueprint's `history` (§11.1). The bar is
   T-V9-73.

**4.21.4 Walls: the repair's material, and the wall states in the legend (item 114).**
1. **The Repair mode.** T3 `wall` on a selected run (its grip) offers **Repair** with the **Material** chip — first "In
   {material}" (`wall.material.robust`, the wall's own material, the default), then one chip per row of V11's
   `walls.patchMaterials` for the enceinte's kind and culture, each worded by its row's `label` cell ("Patch with timber",
   "Patch with wattle", "Patch with an earth bank" …) — and **Wear**; on a neglected ring (no run selected), **Back in
   use**. The mapper sends `convert { op: 'repairWall', enceinte, stretch, material }`, `convert { op: 'wearWall',
   enceinte, stretch }` or `convert { op: 'repairWall', enceinte }` (V06 §2.8's shapes; §7.1's T3 row). Commit on release;
   Accept when the dry run lists fates or effects. The chip's choice is a session option of the tool (V09 §2.12).
2. **What each run takes.** On a `breached` run a patch row makes it `patched`, robust `standing`; on a `worn` or
   `patched` run only robust is offered (the patch rows shown disabled with `info.wall.patchOnlyGap`); on a `dismantled`
   run the dry run bends to a new stretch on its line (`bend.wall.newStretch`; V06 §2.8); a `standing` run offers **Wear**
   only. "Back in use" with no neglect to lift is a no-op with `info.wall.inUse`.
3. **The panel and the legend.** A selected run's panel line is `info.wall.run` ("{state} since {year}, patched with
   {material}"), read from its condition and material (§2.7's `Enceinte.condition`) and the epoch of its last change; the
   ring's why card carries the generation-time line from §7.7's DR41 (readiness and wealth; item 114 (d)) and
   volume 10's story of each run. The legend (§9.5) lists each wall state present in the view — `legend.wall.<state>`,
   each drawn with §8.2's state row and its second cue (a break with rubble, a patch's own line style, the worn ticks at
   the district band and finer, a dismantled run's trace discs) — so no state is told by colour alone (item 112).
4. **Exports** carry each run's condition and material (§11.1); the export dialog's VTT tab says "Patches count as walls,
   breaches as openings" (item 114 (f)).
5. **Edges.** A run with no material recorded reads robust; a ring of one run takes the same controls; the Material chip
   on a palisade lists the palisade's patch rows (V07); undo restores the former condition, material and last-change epoch
   (V06 §2.8). The bar is T-V9-74.

**4.21.5 A hand edit beyond the grandeur ceiling — honoured and explained (item 115 (c)).**
1. **Honoured.** A T6 `place` placement or a T9 `shape` reshape that gives a dwelling a design above its rung's ceiling (§4.7 S10b's
   ceiling; §10.2's table, V11's rows) — an `H` or `U` plan, a court, a tower or a turret at THORP or HAMLET, a second manor
   or a grand arrangement on another dwelling at VILLAGE — is committed as asked: the ceiling is a default, never a refusal
   (item 101 R2), and an epoch never reshapes it down (V06 §3.8.5 (4)).
2. **Explained.** The shell reads the rung's ceiling row (the same table, by the document's rung) against the draft's
   events — the class a `placeAt` or `build` designates, the family or feature a `setMassing` or `setComposition` sets —
   and, when the design lies above it, adds `info.grand.beyondTier` ("{building} is grander than a {tier} usually has;
   kept as you made it") to the badge and the preview card; the building's why card carries the same line as a `facts`
   row (tier `declared`), and volume 10's explanation says it (V10 §3.9). A building the dossier specifies
   (V08 §3.16 (3)'s "specified"; item 115 (c)) reads `info.grand.dossier` instead, tier `dossier`.
3. **Edges.** At TOWN and above the ceiling admits every design and no line shows; a reshape back under the ceiling drops
   the line; the same edit from the clerk carries the same line on its card (V10). The bar is T-V9-75.

**4.21.6 The view stops at the zoom-out limit (item 116).**
1. **The limit** is §8.8's per-map zoom-out limit — the stop at which the map's whole `bounds` fits the viewport's short
   side, plus one stop of margin (item 116 (a)), or stop 0 where no stop fits — over the bounds of town and camps while
   a crisis look stands (V09 §4.21.12 (8); item 122 (i)). The wheel, a pinch, the − key and the view bar's zoom-out
   button settle no further out than it; at the limit the button is disabled with its tooltip — `info.zoom.limit` ("This
   is the whole town.") where the bounds fit, `info.zoom.limitCamps` ("This is the whole town and its camps.") where the
   bounds of town and camps fit, `info.zoom.coarsest` ("This is as far out as the map zooms; the town is wider than this
   window.") at stop 0 where they do not — and a further wheel or pinch settles back to it without a bounce.
2. **Fit the town** (the view bar's frame button) frames the limit less its margin — for a village, V07 §5.2's township
   view; the town and its camps while a crisis look stands — and the first view is §9.5's framing, unchanged (item 116 (e)),
   taking in the camps while a look stands (§2.9's *The crisis framing*). The export dialog's "whole town" frame is the same
   bounds (item 116 (c)).
3. **Growth.** An epoch or a hand edit that grows `bounds` moves the limit with it at the next `doc.changed`; a view
   zoomed out at the old limit stays where it is until the user zooms.
4. **Edges.** A viewport resize re-reads the limit; a map whose bounds fit at the pyramid's outermost stop keeps that
   stop as its limit, and one whose bounds fit at no stop takes stop 0 (§8.8); a crisis starting or ending moves only
   the limit, the opening view and Fit, never a view the user has moved (V09 §4.21.12 (8)). The bar is T-V9-76.

**4.21.7 The season control, "Follow SettlementForge" and the week's fallback (items 117, 125).**
1. **The control.** The view bar's Light group carries **Season**: a week slider (0–51, spring first, SettlementForge's
   grid; "Week {w}"), the four chips **Spring** · **Summer** · **Autumn** · **Winter**, each the middle week of its
   thirteen (6, 19, 32, 45), and, when the document has a dossier, the switch **Follow SettlementForge**
   (`view.season.<name>`). It writes §2.9's year position and follow flag (per viewer, never over a bridge, never in a
   digest; V09 §2.12). The slider and chips re-skin by §8.2's season rows within §12.5's re-skin budget; the map, its model
   and its hash are untouched in every week (item 117 (a)).
2. **Following.** With the switch on, the week is §7.7's DR42's — the dossier's own latest stamped tick, the greatest of
   its conditions' `triggeredAt`, its calamities' and its history's ticks (item 125 (b)) — read at open and at each
   absorb, its year position by DR42; moving the slider or a chip turns the switch off, and turning it on again takes
   the dossier's week. While the dossier carries no stamped tick, the control's own week holds — midsummer, week 19, by
   default — and the line `view.season.noWeek` says it is the map's choice, not SettlementForge's; the first absorb that
   brings a tick moves the week while the switch is on. Standalone, the control opens at midsummer (week 19) and has no
   switch (item 117 (c)). A host's `view.set { week }` (§11.3) is a command, never an input (item 125 (c)): it
   sets §2.9's `week` key — item 67's drawn week, which the Works and the crisis looks are read against — as a user's
   timeline scrub does, and never writes the year position or the follow switch, per-viewer keys no host message sets
   (§2.9, §11.3).
3. **Weather and light.** `snow` weather defaults on in a cold or severe climate's snow weeks and stays the user's to
   switch where snow can lie — never offered on an `arid` row or one whose winter does not freeze
   (V09 §4.21.14 (5); §8.2's snow rule); the view sun's default height follows the week (item 117 (g)) — both view state
   only.
4. **Exports and words.** Image and print exports draw the week shown and name it (`view.season.line`, "{season}, week
   {w}"); the export dialog shows the line and a chip to pick another week for that export; a battle-map export records
   it (§11.1). The clerk's explanation of a seasonal look is volume 10's.
5. **Edges.** A dossier with no stamped tick holds the control's own week (19 by default) with the switch on and
   `view.season.noWeek`; a tick far in the past reads its year position by DR42; an unknown stored week is clamped into
   0–51; the same document shows identical hashes in all 52 weeks, and the same dossier opens on the same week with and
   without a host context (item 125 (e)); V09 §3.16's row 94. The bar is T-V9-77.

**4.21.8 The festival list and its switch (item 118).**
1. **The list.** Under the Season control, **Festivals** (`view.festival.title`) lists each festival of §11.2's `looks`
   reader (`LooksAnswer.festivals`: §7.7's DR43's list from the dossier) — "{festival}, weeks {a}–{b}"
   (`view.festival.row`), in window order — each with **Preview**; standalone, the list holds the generic festivals
   chosen by the culture and the season (item 118 (b): "Spring feast", "Midsummer", "Harvest home", "Midwinter"). Above
   it the switch: "Decorate when a festival is on" · "No decorations".
2. **What it writes.** §2.9's festival display (per viewer): `follow` (the switch on: a festival's decorations show while
   the view's week lies in its window), `off`, or a festival id (**Preview**: that festival shown whatever the week, until
   the switch is touched or another is previewed). §8.2's decoration rows draw it; the map, the model and its hash are
   untouched (item 118 (a)).
3. **Exports and words.** Image and print exports draw the decorations shown and name the festival
   (`view.festival.line`, "Dressed for {festival}"); battle-map exports draw them in the image only (§11.1). The clerk's
   words are volume 10's.
4. **Edges.** A previewed festival no longer listed after an absorb falls back to `follow` (V09 §2.12); two festivals
   whose windows overlap both show, in window order; with no traditions and no preview nothing is drawn (item 118 (h)'s
   no-op pin). The bar is T-V9-78.

**4.21.9 The progress view — a one-time wait (item 119 (c)).**
1. **When.** Every one-time wait a user sits through — a generate, a Regenerate or Re-derive, an open (from a file, a
   permalink or SettlementForge), an absorb, an export and a migration — runs within §12's ten-second comfort level,
   §12's laws staying the targets (item 119 (a)); an advance of time, a history-first generation and a dossier catch-up
   each complete within it in total, coarsened to fit by V06 §6.8 — but a dossier catch-up whose events' absorb term
   passes its budget, which folds one epoch over the span and completes past it, reported F-BUDGET-TIME, its progress
   view unchanged (V06 §6.8 (6)) (item 119 (a2); J132). An open's wait ends at the editable complete map: its
   load-verification replay runs after it, off the path (§12.1; §2.9 step 3), shown only as the view status's quiet line
   `progress.verify` while it runs past `progress.showAfterMs`, never as the strip. A wait that passes
   `progress.showAfterMs` (1 000 ms, our own; item 119 (c)'s "about one second") shows the progress view, and a shorter
   one shows nothing; **Go back to here** (from a history row or a restore point, V09 §3.9) past it shows the progress
   view the same way, counting the events undone from `edit`'s `onProgress` (§11.2's `'undo'`; `progress.undo`).
2. **What it shows.** A strip over the map's top — never a modal and never an empty screen: on an existing town the town
   stays drawn under it (dimmed while a whole-town result is pending), and on a first map the stages' outputs fill in as
   they land, drawn in the ghost style under the strip, never shown as the finished map until it is complete (§8.5). The
   strip names the running stage by `progress.stage.<group>` — the running `StageDecl`'s own group by the table below, a
   volume's main-phase stage taking the group of the base stage before it in the registry's order, a tail stage `below`
   — or, for a wait that is not a stage run, its `progress.<wait>` row (an epoch "Year {year} of {years}", the replay
   "Replaying the town's past: {year}", an absorb, an export with its percentage, a migration), naming the cadence
   chosen where the run coarsened (", in {n}-year steps": V06 §6.8's cadence, `EpochReport.advance.cadenceWeeks` against
   `.requestedWeeks`, and `ReplayPlan.epochYears`; a coarsened catch-up too), with a bar over the wait's known steps
   (stages, epochs, export tiles) and **Stop** where the wait can stop: V06's advance (`cancelAdvance`, V06 §4.1);
   item 113's history replay at generation, through `generate`'s `signal` (§11.2) — standalone only: in host mode a
   creation from a dossier (V08 §3.3) shows the strip with no **Stop**, its replay coarsened to fit the comfort level
   (V06 §3.20.4, V06 §6.8), so every editor's creation stays identical (T-V8-3) — where a stopped history-first
   generation leaves no document and shows `info.history.cancelled` with **Generate without its history** (V06 §3.20.4)
   — a stopped Re-derive's replay commits nothing; and an export, through `export`'s `signal` (§11.2).
3. **The stage groups:** `ground` S0–S1 · `plan` S2–S3 · `streets` S4, S5a–S5d, S8–S9 · `walls` S7 · `quarters` S6, S7b ·
   `plots` S10a, S10 · `places` S10b · `buildings` S11 · `land` S12a–S12c · `names` S13a · `drawing` S14 and the tiles of the
   first map · `people` S15 (the simulation module, §4.10, when it is on) · `below` every `phase: 'tail'` stage (V04's
   underground layer, run after the first map, §4.1). Stage progress reaches the shell from the generation worker as each
   stage starts (the worker host's messages, §11.2's worker boundary (`onProgress`); §12's progress rule), never polled.
4. **Interaction stays fast.** Pan, zoom, hover, the season and festival switches and every panel stay live during the
   wait, at their own budgets (V09 §6; item 119 (d)); a gesture's preview is never delayed by the progress view.
5. **Edges.** A wait that ends inside `progress.showAfterMs` never flashes the strip; a wait that fails shows the
   failure rung's line in its place (V09 §3.14); a stage that reports no progress keeps its name with an indeterminate
   bar; a history-first creation from SettlementForge (host mode) shows the strip with no **Stop** ((2)). The bar is
   T-V9-79.

**4.21.10 Find — a filter view with a halo-like glow, across every band and layer (item 120).**
1. **A view, never a change** (item 120 (a)). The Find panel edits §2.9's per-viewer view key `find` —
   `{ chips: FindChip[]; gaps: boolean }` (§2.9's `FindChip`): a **kind chip** (one class, or several for a word chip
   such as "All smiths"), an **address chip** (a place, an area — a `FindArea.id`, V01 §5.4 — a person or an
   institution) or a **dossier chip** (a dossier entry's binding key and anchor, V08 §3.16 (6) (e)), in selection order;
   absent is Find off. It sends no event, preview or undo step and never touches the model, the document, its hash or
   the log; it holds through zoom, pan, band, layer, season, advance and every commit, undo, redo, regenerate, load and
   migration, is saved with the other view keys in the document's `view` section (§2.9; item 120 (a)'s "saved … like the
   other view keys") and never crosses a bridge — a host message never sets a chip (§11.3). Only **Clear**
   (`find.clear`: the chips emptied, Show gaps off) or closing the panel (the key removed) ends it. A chip's colour and
   second cue follow its index and are never stored (item 112).
2. **Where it opens.** **Find** (`find.title`) in the view bar; **Find all {kind}s** in a selected use's context menu
   (its kind chip added; V09 §4.4); the clerk's `find` action (12); a saved view holding the key, at open. Wide: a 320
   px panel docked at the map region's left edge beside the rail, beside the context panel, never in its place, so a
   selection or the drawer leaves it open. Medium: a sheet over the map's left edge that folds to its **chip strip** —
   the chips with their counts and **Clear** in one row under the options strip — whenever the context sheet or the
   drawer opens, and on its fold button; folding never ends the filter (J-V9.138).
3. **The list — what the town holds** (item 120 (b)). With the box empty, the panel lists what this document holds at
   the view's effective key (`effectiveKey()`, V09 §2.10) and drawn week (§2.9's `week`; (8)) by §11.2's gazetteer — its
   class counts and its match listing by class, area and layer — in these sections (`find.section.<part>`): (i)
   `dossier` — V08 §3.16 (6)'s entries, the dossier's names first in the dossier's own order, each "{name} · {n}"
   (`find.count`) with its kind; (ii) `kinds` — the institution kinds present as a grid under V11's nine `findGroup`
   headings (`find.group.<key>`: crafts, trade, faith, rule, defence, learning, health, lodging and `other`, the item's
   "the rest"; V11 §2.3), each its `label` and count ("Blacksmith · 4"), a kind present only on another layer counted
   there; (iii) `areas` — V01 §5.4's `findAreas(key)`, each by its word (district, neighbourhood, quarter, region); at
   the village rungs V07 §5.5's ends and field groups; (iv) `places` — the named places the gazetteer lists (squares,
   gates, temples, bridges, harbours); (v) `crises` — the crisis looks standing (V09 §4.21.12 (7)); (vi) `people` —
   **Where is someone?** (`find.people`), opening V09 §4.18's "Where is", shown when the module holds people. Nothing
   the town lacks is offered; a section with nothing is omitted.
4. **Type-ahead** (item 120 (c)). As the user types, the box (`find.box`, "What are you looking for?") suggests: classes
   by V09 §4.16 (3)'s word matcher over V11 §2.3's `label` and `synonyms` — exact, then a plural ending removed, then
   one-letter typos forgiven in words of five letters or more — case-folded and with prefix matching on, over the
   classes present only (J-V9.139); the dossier's names by V08 §3.16 (6) (c)'s rules (names, never lexicon words); area
   and place names as the gazetteer gives them, by prefix and whole word. Suggestions are grouped by kind with their
   counts, at most eight per group and then "{n} more" (`find.more`); ↑ and ↓ move, Enter adds the highlighted one as a
   chip, Esc empties the box. A whole word two or more present classes carry (V11 §2.3's *A shared word names a set*)
   offers each class and one word chip, "All {word}s" (`find.allWord`), a kind chip holding all their classes. A word
   matching nothing reads `find.noMatch`.
5. **The chip grid** (item 120 (d)). Each pick is a chip: its words, its count, its colour swatch and its glyph. A list
   row or a suggestion adds one; a chip's ×, or a click on its list row again, removes it; any number at once, drawn as
   their union. Colours come from the thematic palette in chip order and repeat past eight; the second cue is one glyph
   on its pins — chip k's from §8.2's nine glyphs by (k − 1) mod 9, so two chips sharing a colour past eight differ in
   glyph — and one dash pattern on its halo's outline per chip index (item 112; §8.2's Find rows). A chip whose target
   leaves the town stays at count 0, dark (`find.none`, "none now"), until removed; a dossier chip follows its record by
   key and anchor (V08 §3.16 (6) (e)).
6. **The look — `live.find`** (item 120 (e)). A new `overlay` live-layer provider, `live.find`, drawn by §8.2's Find
   rows: while any chip is on, the rest of the map lies under the veil (the style's paper at α 0.55); each match is
   drawn above it with its chip's halo — a soft glow fading over ≈ 8 px inside a 2 px outline — and its label above the
   veil; an area chip lifts the whole area (`findAreas`' shapes) and glows along its boundary; at the city band a match
   under ≈ 6 px also carries a pin with its chip's glyph, and pins nearer than ≈ 24 px merge into a count bubble ("12")
   that zooms in when clicked — merged only within one layer and, on Sky, one island (V05 §5.6 (2)). The provider draws
   over whichever Show view is on and never re-renders a base tile.
7. **The index** (item 120 (f), (j)). Rebuilt once per commit, regenerate, undo, redo, advance, load and migration, at
   each change of §2.9's `week` (a timeline scrub, a host's `view.set { week }`) and at each `onEffectiveKey`, in the
   generation worker: per chip its matches by §11.2's gazetteer match listing at `effectiveKey()` and the view's drawn
   week (the query's `week`, absent at the head; (8)) (a kind chip's classes; an address's entity; a dossier chip's
   key's rows); their places on Below by V04 §5.1's `underFindPlaces(doc, ids)` (each part, depth band, glow shape and
   plan anchor) and on Sky by V05 §5.6, each passed the model the view draws (at a drawn week whose frame is not the
   head, that frame, V06 §3.15.2); an area's shapes by V01's `findAreas`; and, at the interior band, the rooms a matched
   building's institution uses by V03 §5.5's `findRooms(plan, b, target)` for each matched building whose plan draws. A
   new smithy glows at its commit and a closed one goes dark; a season change re-draws the same matches.
8. **Across bands and layers** (item 120 (f)). Matches on the layer shown glow; matches on another layer show as faint
   ghost pins where they are drawn — an island's at its drawn position, a hidden sky layer's included (V05 §5.6 (3)) —
   and the panel counts them per layer: `find.moreBelow` ("{n} more Below"), `find.onSky` ("{n} on Sky"),
   `find.onGround` ("{n} on the ground"), each with **Go there** (`find.goThere`): Below sets the working layer to Below
   and `depthBand` to the match's band (V04 §5.1); Sky sets it to Sky and the island menu's `key` to the match's island
   — for both, view keys only, a hidden layer drawn as the working layer (§8.4), no event sent (item 120 (a); §9.5);
   each then flies to the band that shows the match. At the interior band the rooms a matched institution uses glow on
   the storey shown, with the storey switcher's marks and "{n} found" (`find.foundRooms`) and the plan panel's room list
   marking them (V03 §5.5). At a drawn week whose frame is not the head (V06 §3.15.2), each chip's matches — its glow,
   pins, ghost pins, gaps, counts and results — are §11.2's listing at that week (the frame's matches, by the uses it
   holds open then): a building matches by its use at that week, never its head use, a match the frame lacks is neither
   drawn, pinned, counted nor listed, a chip with none there reads count 0 for that week (`find.none`), and the chips
   themselves are unchanged.
9. **The results** (item 120 (g)). Under the chips, the matches (name, kind, district, layer), the shown layer's first,
   then by address, paged: **Go to** (`find.goTo`) flies to the band that shows the match and selects it; **Next** and
   **Previous** (`find.next`, `find.previous`) step through the list, each flying as Go to does; the list is a listbox
   whose ↓ and ↑ are Next and Previous and whose Enter is Go to (V09 §4.15). Each chip shows its count.
10. **Show gaps — Coverage folded in** (item 120 (i); J-V9.140). The panel's switch **Show gaps** (`find.gaps`) writes
   `gaps`: for each kind chip, V01 §5.4 (3)'s `gapUnits(chip, key, week)` at the view's drawn week (§2.9's `week`) — the
   districts or catchments holding none, counted by V11 §2.3's `CoverageSpec`, on every layer, an island's units by V05
   §5.6 (4) and a village's by V07 §5.5 — each gap outlined dashed and labelled "none here" (`find.noneHere`), while a
   unit holding a match lies lifted from the veil with its matches. Show gaps keeps every behaviour item 120 (i) folds
   into it: a class's units by its `CoverageSpec`, gaps dashed and labelled, knowledge-filtered, drawn over any Show
   view. Address and dossier chips draw no gaps; with no kind chip the switch is disabled with `find.gapsNeedKind`. An
   older view's `thematic: 'coverage'` opens as Show gaps on with no chip (§2.9; V09 §2.12).
11. **What the viewer may know** (item 120 (h)). Every list row, suggestion, count, glow, pin, ghost pin, gap and result
   comes from reads at `effectiveKey()` (V09 §2.7; §11.2's admission): a thing the key withholds is never suggested,
   counted, drawn or hinted at, and a concealed use answers as its front's class or not at all. On `onEffectiveKey` the
   panel re-reads; a chip whose target the new key withholds reads `find.withheld` ("not in this view") with no count
   and draws nothing.
12. **The clerk** (V10 §2.6, V10 §3.9b (7)). The application runs V10's `find` action (V09 §4.11): `set` replaces the
   chips, `add` and `remove` change them, `clear` empties them and turns Show gaps off, and `gaps` sets the switch — the
   panel opening on them; a view action, never an edit. V10's `read_map { kind: 'find' }` reads the same key and index.
13. **Exports** (item 120 (i)). A picture export made while chips are on draws Find as shown — the veil, the halos, the
   pins and the gaps — with the chips in the legend (§11.1); the export dialog's Picture tab shows `find.exportLine`
   ("Find: {chips}") with a chip to leave Find out of that export; a battle-map export leaves it off unless the Tabletop
   tab's **Draw Find** (`find.exportBattle`, off by default) is on.
14. **Speed** (item 120 (j)). Suggestions within ≈ 50 ms of a key and a chip's glow within ≈ 100 ms of the click at the
   METROPOLIS cap (§12.5's overlay budget; V09 §6.4's Find row); the index rebuilt once per commit; no base re-render.
15. **Lifecycle, edges and bar.** V09 §2.12's `find` row; V09 §3.16's rows 86–88; T-V9-83. Find lands at M5 (V09 §8.1's
   AP11; §16's milestone rows), beside V01's area and gap services.

**4.21.11 Resolution — Settings › Display and the view-status chip (item 121).**
1. **The setting** (item 121 (a)). Settings' **Display** section (V09 §5.12) carries **Resolution**: **Auto** (the
   default) · **4K** · **1440p** · **1080p (HD)** · **720p** (`settings.resolution.<level>`), held as
   `AppPrefs.resolution` — device state, never in the document, its hash or the log, so a map opened on another machine
   takes that machine's setting (V09 §2.11, V09 §2.12). A level above the screen's own resolution (its height in device
   pixels) is greyed with `settings.resolution.screen` ("Your screen is {level}"). Choosing a level turns Auto off;
   choosing **Auto** turns it on.
2. **What it drives** (item 121 (a), (d)–(e)). The shell hands the setting to §8.8's resolution ladder and its Auto loop
   at boot and on every change: a manual level sets the tile DPR by §8.8's rule, and Auto chooses by §8.8's loop and
   gives up what §8.4 (g) orders. A change takes effect while the view is settled — at once when no gesture runs, at the
   gesture's settle otherwise — never during a pan, zoom or drag (§8.8); a change of the device pixel ratio — the window
   moved to another monitor, read by `matchMedia` on the resolution media feature — re-evaluates at once (T121-7).
   Labels, text, the chrome and every overlay — Find's halo, the handles, the ghost — stay at the device's full pixel
   ratio at every level (item 121 (e)).
3. **The view-status chip** (item 121 (a); J-R22). At the view bar's right end, beside the scale bar, the chip names the
   level in force: "Auto · {level}" (`view.status.auto`) or "{level}" for a manual one (`view.status.manual`). Its
   tooltip says why — `view.status.why.<reason>`: `screen` ("your screen is {level}"), `memory` ("this device's graphics
   memory holds {level}"), `frames` ("lowered to keep the map smooth"), `ceiling` ("{level} is the live view's ceiling")
   — and §8.8's view status, the graphics tier and the tile density ("Graphics tier: {tier}; map tiles at {dpr}×",
   `view.status.tier`). A click on the chip opens Settings at Display. The chip reads §8.8's loop's level in force and
   its reason; it holds nothing of its own.
4. **A level the device cannot hold** (item 121 (f)). The view draws the nearest level that fits and says so once as a
   toast and on the chip's tooltip while it holds — `info.resolution.fallback` ("{level} needs more graphics memory than
   this device has; showing {shown}.") — never a refusal and never a crash (T121-4).
5. **Untouched.** Exports are byte-identical whatever the setting (item 121 (g); §8.7's any DPI), and nothing of the
   document changes.
6. **Lifecycle, edges and bar.** V09 §2.12's `AppPrefs.resolution` and chip rows; V09 §3.16's row 89; T-V9-84. It lands
   at M4 with the performance tiers (V09 §8.1's AP11; §16's milestone rows).

**4.21.12 Crisis looks — Show crises, the preview, the why lines and the framing (item 122, with (h)–(i)).**
1. **The switch** (item 122 (e)). The Show menu's **Show crises** (`view.crises.show`), on by default, writes §2.9's
   per-viewer view key `crises` — `{ mode: 'follow' }` on, `{ mode: 'off' }` off. It is a switch beside the thematic
   views, not one of them: the looks draw over whichever view is on, and under Find's veil as the rest of the map does.
   It never touches the model, the document, its hash or the log and never crosses a bridge (§11.3).
2. **The preview** (item 122 (e), as item 118 (b)'s **Preview**). The Show menu's **Preview a crisis**
   (`view.crises.preview`) lists the look kinds of §10.2's crisis look table (`CrisisLookRow.kind`, each worded by its
   row's `label`, V11 §3.25.9); a pick writes `{ mode: 'preview', look }`, drawn at the table's `previewSeverity`
   whatever the week, until the switch is touched or another look is previewed (§2.9). It is the only way to see a look
   on a map without a dossier; on a dossier map it is offered the same way, the dossier's standing looks giving way to
   the previewed one while it shows and returning when the switch is touched. A carried `preview` whose `look` names no
   row reads `follow` (§2.9; V09 §2.12).
3. **When a look stands.** A condition's look stands while §2.9's `week` lies in its [`sinceWeek`, `untilWeek`) — from
   `sinceWeek` on while the overlay stands when it has no `untilWeek` — by §7.7's DR44 (its map row, its look row, its
   scale by severity and tier or by the dossier's headcounts, item 122 (h)), drawn by §8.2's look rows, several at once
   by §10.2's priority under its density cap. The year position (`yearWeek`) dresses the season and is never compared
   with a condition's weeks. The looks standing reach this volume through §11.2's `looks` reader (`LooksAnswer.crises`)
   — the one evaluation `live.crises` draws and §9.5's legend lists, made in the generation worker and admitted at the
   view's effective key — which this section's controls read.
4. **The why lines** (item 122 (f)). A standing look reads `info.crisis.line` ("{look}: {condition}, weeks {a}–{b}" —
   "Refugee camp: the Northmarch migration, weeks 12–20"): `{look}` its look row's `label` (V11 §3.25.9), `{condition}`
   the look's `name` in §11.2's `looks` reader (the condition's name as V08 carries it from the dossier, tier
   `dossier`), its weeks the look's `sinceWeek`–`untilWeek`; `info.crisis.lineOpen` ("{look}: {condition}, since week
   {a}") with no `untilWeek`; `info.crisis.lineUnnamed` ("{look}, weeks {a}–{b}") for a look that carries no `name`;
   `info.crisis.preview` ("{look} — a preview") for a preview. The lines show on the crisis card (5), in the legend's
   crisis entries, and as a `facts` row on the why card of a building a disaster look stands over or of a field a famine
   leaves bare (`info.crisis.ruinedFor`, "For now: {look}, {condition}, weeks {a}–{b}"; V09 §5.8). A building a disaster
   look stands over is a building of one of the look's units (§10.2 (d): the districts V01's `disasterDistricts`
   returns; at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units, `villageDisasterUnits` — its ends, or in an end-less
   thorp its toft groups — a unit's buildings those on the plots `villageUnitPlots` gives it) on which V06 §3.22 (3)'s
   `crisisLookYields` is not yet true — no Works other than a `decay` Works begun on it by the view's week, unless
   finished before the overlay's `sinceWeek` — so the look leaves a building when its rebuilding begins; under a preview
   it is every building of the preview's units, a preview never handing over (§10.2 (f)). The card reads it from §11.2's
   `looks` reader asked with that building (`query({ kind: 'looks', view, building })`), each `disaster` entry carrying
   `over`, evaluated in the generation worker — never a call to V01 or V06 on the main thread. At THORP, HAMLET and
   VILLAGE a `VillageField`'s and a `VillageEnd`'s row is the village `WhyProvider`'s answer row (V07 §4.5), shown once,
   the card adding none of its own. Volume 10's explanation renders the same keys (one key, one sentence, J-V9.79).
5. **The crisis card** — a non-modal card like the why card (V09 §5.8), opened from a crisis entry of the legend, of
   Find's list (V09 §4.21.10 (3)) or of the Show menu's **Crises now** list (`view.crises.list`): the why line; the
   forces' numbers where the dossier gives them (item 122 (h)–(i)) — `info.crisis.forces` ("about {n} {who}{, groups}":
   "about 24 000 besiegers, three armies"), from the look's `forces` (`LooksAnswer.crises[]`: the force and group sizes
   V08 reads from the dossier where present, item 122 (h)), summed over the condition's forces; where a force is too
   large for the frame and its margin (the look's `massed`), `info.crisis.massed` ("The rest are drawn as massed camps
   at the edge of the map."; §8.8's ring); **Show**, framing the look's place — the box of the marks `live.crises` draws
   for that look (§8.2's look rows, keyed by its condition, a preview by its look kind: its camps, siege line and
   engines, its bare fields, torn edge runs, burned farmsteads, barricades, scaffolds or shutters, and its massed marks
   on §8.8's ring), asked of the provider in the generation worker at the look's row's `band` over the map's `bounds`
   and that ring whatever the view (§8.2's `LiveLayerProvider.marks`), or for a `disaster` look the union of its units'
   `FindArea` shapes (V01 §5.4 (6)), or the town's own frame where nothing is drawn for it — as **Fit the town** frames
   the town; and **Ask the assistant** — the card's line as the question on V10's `drawer` entry
   (`ClerkHandle.send(text, 'drawer')`, no attachment), the clerk reading the look by `read_map { kind: 'look' }` (V10
   §3.9b (8); prompt rule 21) — hidden without an enabled clerk.
6. **Knowledge** (item 122 (e)). A condition the view's effective key withholds is never drawn, listed, named or counted
   (DR44's admission and tier): the card, the why lines, the legend's entries and Find's list all read §11.2's `looks`
   reader at the view's effective key, and re-read at `onEffectiveKey` (View as, V09 §4.8).
7. **Find lists the looks** (item 122 (f)). Each standing look of `LooksAnswer.crises` is a row of Find's `crises`
   section, "{look}: {condition}" (`find.crisisRow`); a click opens its crisis card, and its **Go to** frames it as the
   card's **Show** does. A look is no chip: `find`'s chips name classes, addresses and dossier entries (§2.9's
   `FindChip`).
8. **Framing and the limit** (item 122 (i); §2.9's *The crisis framing*; §8.8's limit). While a look stands drawn — the
   switch on, or a preview — the opening view and **Fit the town** take in the town and its camps, and item 116's
   zoom-out limit widens to the bounds of town and camps together, k_min 0 where no stop fits them
   (`info.zoom.coarsest`); at a limit that holds the camps the zoom control's tooltip reads `info.zoom.limitCamps`
   ("This is the whole town and its camps."). When none stands, all three return to item 116's (V09 §4.21.6), a view
   coarser than the restored limit settling to it about its own centre as at a resize (§8.8). A view the user has moved
   is never re-framed: only the opening view, Fit and the limit change. A condition the viewer's key withholds widens
   nothing.
9. **Exports** (item 122 (f)). Picture exports draw the looks shown and name them (`view.crises.line`, "During:
   {looks}"), the export dialog's Picture tab showing the line (V09 §5.10); battle-map exports draw them in the image
   only, never as walls or obstacles (§11.1).
10. **Lifecycle, edges and bar.** V09 §2.12's `crises` and framing rows; V09 §3.16's rows 90–91; T-V9-85. Show crises
   and the preview land at M3b with the base parts they read (§16's milestone rows), the dossier's looks and their
   numbers with V08's reading at M-SF, the disaster look's units (§10.2 (d)) with V01's W10 at M5 (V07's W84 at the
   village rungs).

**4.21.13 A ruined building's plan — its damage lines (item 123).**
1. **One plan, damaged** (item 123 (a); §6.3 *Plan damage*; V06 §3.23). The plan is the one the building was last lived
   in (V03 §3.11 *Decay re-cuts no plan*); what changes with decay is item 123's damage layer over it. The plan panel
   (its contents V03 §4.5's) and the why card's `plan` section (`why.section.plan`, "Inside") of an `abandoned`,
   `decayed` or `ruined` building, or of one restored with patches, show its **damage lines**: V03's damage layer read
   at V06's `decayLevel(doc, lineage, week)` by §6.3 *Plan damage*'s comparison — an element shows damaged while the
   building's decay level is above 0 and at least its threshold t (a level of 0 damages nothing, so a never-decayed
   building draws its plan unchanged); and, while the building is `decayed` or `ruined`, every roof bay over a room of a
   roofless wing (`RoofSpec.kind` `none`) whatever its threshold (§2.6 step 7) — one line per damaged line kind present,
   by its `info.damage.<kind>` row in that row's order (V09 §4.9): the roof over a room (`roofBay`), floor areas
   (`floor`, and `storeyGone` once every `upperFloor` area of a storey shows damaged (V03 §4.6's rule) — "the upper
   floor is gone"), outer wall runs (`outerWall`), partitions, doors, windows, stairs, furniture, the rooms unsafe to
   enter (`unsafe`: a room any of whose floor areas or roof bays over it shows damaged) and, below ground, the cellar
   and the crypt (by the building above's level, an underground building by its own; V04) — the rooms named in plan
   order, three at most and then `info.damage.more`. The panel's head line is `info.damage.head.<state>` by the
   building's `Existence` (`abandoned`, `decayed`, `ruined`, or `restored` for one restored with patches), its
   `{, years}` clause the whole years of its decay run at the drawn week (V06 §3.23 (1), (4)), dropped before V06's
   level lands (the existence state alone). Every line reads at `effectiveKey()` (V09 §2.10). On a building the key
   withholds, the lines that name rooms — `roofBay`, `floor`, `partition`, `furniture`, `unsafe` — and the `crypt` line
   are not drawn (purpose withheld; §11.2's withheld rule; V10 §3.9a). The head line, `storeyGone`, `outerWall`, `door`,
   `window`, `stair` and `cellar` stay — a ruin is seen by everyone — and a room the key does not admit is never named
   (V03 §5.4).
2. **Restored** (item 123 (b)). As restoration — a `reoccupy` back into use, or a repair (V06 §3.23 (3)) — lowers the
   level, the damage leaves in reverse threshold order and its lines with it; a repaired element drawn in patch material
   adds `info.damage.patched` (item 114's patchwork), and an element the plan gained after its damage left is drawn as
   built (V06 §3.23 (3)'s per-element peak).
3. **A crisis look's damage** (item 122 (d); §10.2's `lookLevel`). On a building a disaster look stands over (V09
   §4.21.12 (4): one of the look's units, not yet handed over to a Works — V06 §3.22 (3)'s `crisisLookYields`; a preview
   never hands over), read through V03's `planDamage` (`PlanDamage.look` set; V03 §5.6 (4)), the plan panel (V03 §4.5)
   shows its lines at `PlanDamage.level` — the look's `lookLevel` by severity, or its own level where that is higher —
   under the head `info.crisis.ruinedFor`, its words from the look's entry in §11.2's `looks` reader (the entry whose
   `condition` is `PlanDamage.look`'s, or the preview's) — a look: nothing stored, ids and digests unchanged; the why
   card's `plan` section keeps the `plan` provider's rows at the building's own level (V03 §4.6), the look named by the
   card's `facts` row `info.crisis.ruinedFor` (V09 §4.21.12 (4)), as volume 10 tells it (V10 §3.9a; V10 §3.23 C10). Once
   the look has left the building — a Works other than a `decay` Works begun on it, `PlanDamage.look` null — the panel
   shows its own level's lines and head ((1)) and the card no `info.crisis.ruinedFor` row (V03 §5.6 (4); V10 §3.9a).
4. **One sentence everywhere.** The lines are this volume's words (`info.damage.*`, V09 §4.9); volume 10's explanation
   of a ruined building renders the same keys from the same reading (item 123 (e); J-V9.79). A building never decayed
   shows no line (item 123 (f)); a higher level's lines are a superset of a lower's (monotone, V06 §3.23).
5. **Lifecycle, edges and bar.** Derived per read, never stored (V09 §2.12); V09 §3.16's row 92; T-V9-86. The lines land
   with V03's plan step that draws a decayed or ruined plan (V03 §8), the levels from V06's at M6-E and, before it, from
   the existence state alone at V11's default age (§16's milestone rows; V06 §3.23).

**4.21.14 Weather effects — the advanced panel's switch and Start a shower now (item 124).**
1. **The switch** (item 124 (g)). The advanced panel's device group **On this device** (`settings.device`; V09 §4.14)
   carries **Weather effects** on · off (`settings.weather.effects`), held as `AppPrefs.weatherEffects` — device state,
   never in the document, its hash, the log or a tile key (V09 §2.11, V09 §2.12) — with **Start a shower now**
   (`settings.weather.shower`) beside it, enabled while the effects are on and a weather kind is live ((4)).
2. **The defaults** (item 124 (g), less its phone clause: item 126 (a2)). With no value stored the switch reads on where
   the tier has headroom — §8.8's mid, high and ultra tiers — and off on the low tier and wherever the system asks to
   reduce motion (`AppPrefs.reducedMotion` `'on'`, or `'system'` with the system's `prefers-reduced-motion` set;
   V09 §5.12) (T124-5; J-V9.144). A user's choice holds over the default; Reset restores it.
3. **What it drives** (item 124 (a)–(f)). The switch gates §8.4's per-frame weather layer, placed by §8.8 above the
   tiles and below the labels, the chrome and every overlay; its spells come from the session's weather timeline
   — §6.1's view-only `view.weather` stream, seeded per session — over V11's weather columns for the climate row at the
   view's year position (§2.9's `yearWeek`, never `week`); the spell in force is session-transient view state (§2.9's
   *Weather effects*). It never changes a tile, the model, the document or its hash, and under item 121 (e) Auto gives
   it up first (§8.8).
4. **Start a shower now** (item 124 (g); V11 §3.25.11). It starts at once, as the timeline's next spell, the commonest
   kind live at that moment — V11 §3.25.11's rule over the climate row's weather cells, a kind live while its band holds
   §2.9's `yearWeek` and, under `light: 'time'`, its hours hold the view's hour (§6.1 *The weather stream*); at a moment
   with no live kind it starts none, and the button is disabled with `settings.weather.noneNow` ("No weather comes here
   at this time of year or day."), never a silent no-op (§7.8). It never starts snow on an `arid` row or on a row whose
   winter does not freeze (V11's compile rules hold the columns to it, and the button checks it again). A press while a
   spell is in force fades that spell out first, the pressed spell starting when it reaches 0; a further press before
   then changes nothing (§6.1 *The weather stream*). The press is recorded in session state, so the timeline replays
   from its seed, its clock and the presses with the climate row, year position, sites, light mode and view hour in
   force (§6.1 *The weather stream*; T124-9).
5. **The cover control** (§8.2's snow rule). The Light group's **Weather** (V09 §4.19) offers `snow` only on a climate
   row where snow can lie — never on an `arid` row or one whose winter does not freeze — and a carried `snow` (an older
   view, a pin, a changed climate) reads `clear` there (§8.2).
6. **Exports** never draw the animated effects; the season's cover still applies (item 124 (h)).
7. **Lifecycle, edges and bar.** V09 §2.12's `AppPrefs.weatherEffects` and spell rows; V09 §3.16's row 93; T-V9-87. It
   lands at M3b with item 117's season looks it reads (§16's milestone rows).
=== END ===

=== REPLACE ### 5.4 The thematic views — Show: prosperity, shade, supply links and the rest ===
### 5.4 The thematic views — Show: prosperity, shade, supply links and the rest

The view bar's **Show** menu sets the per-viewer view key `thematic`: **None**; **Wealth** (§8.2's thematic row keyed by
`prosperity`); **Shade** (below); **Supply links** (below); **Quarters** (the identity tint, item 72); **Uses** (the
use-keyed row, knowledge-filtered, §8.2); **Who knows** (tints places by `knownTo`: public, local, secret — shown only
to a `secret` view); **Voids** (the footprints of the underground's systems projected on the ground, each named with the districts above it,
V01's `districtsAbove`; `live.voids`, overlay; knowledge-filtered, a sealed void only under `showUnexcavated`);
**SettlementForge's chains** (V08 §5.2's `supplyChains` view: each chain drawn, labelled and listed by V08 §5.2's
`CustomChainRecord` row; offered only while that row lists a chain in the gazetteer, which the shell reads by
`query({ kind: 'gazetteer', kinds: ['customChain'] })` at the view's effective key after each load and each commit — while
none is listed the entry is hidden and a stored `supplyChains` value draws nothing and reads as None; its drawing cost is
V08 §6's; J-V9.105). One
thematic view at a time; the legend for it sits in the map's lower left, listing only the values drawn (§8.2). Under the
views the menu carries **Show crises**, **Preview a crisis** and **Crises now** (V09 §4.21.12) — a switch over every view,
not a view of its own. **Find** (V09 §4.21.10) draws over whichever view is on, and its **Show gaps** is this menu's coverage
view (item 120 (i)) — for each kind chip the districts or catchments holding none, by V01 §5.4 (3)'s `gapUnits` over
V11 §2.3's `CoverageSpec`; a stored `thematic: 'coverage'` (a town saved before item 120) opens as Show gaps with no
chip (V09 §2.12).

**Shade** (item 102 (f)) is a new `base` live-layer provider, `live.shade` (file f item 411): it reads the daylight-share raster
(V09 §2.7) and draws each field cell as a translucent veil over the ground and blocks — six steps of the style's ink at α
0 / 0.08 / 0.16 / 0.24 / 0.32 / 0.40 for shade shares 0–10 / 10–25 / 25–40 / 40–55 / 55–70 / 70–100 % of the day (our own
steps) — under the buildings' fills, so streets and yards read darker where they lie long in shade; the veil is this
volume's alone. Over it the view draws V05's rows as V05 states them (V05 §5.1; J-V9.53): each island's held strip
(`sky.island.shadeStrip`) as one solid ink line round the cells it shades for at least three of the nine sun samples,
labelled with the island's name, and, while an island has moved since its shade was last brought up to date,
`sky.island.shadePending` as a dashed line — so the veil's steps say how much of the day, the solid line whose shadow it
is, and the dashed line where it will move. The legend reads "Shade through the day" with the six steps, then "Under
{island}'s shadow for a third of the day or more" (solid) and "Where {island}'s shadow will move" (dashed), with **Update
shade now** (V05's `regenerate { kind: 'shade', island }`) beside a pending island's entry. Hovering reads "In shade {p} % of the day" in the readout, and
the "Why here?" card of anything in a shaded cell includes the shade row (V09 §5.8). The provider is a `base` target, so
it is part of the tile key (§8.8) and redraws only when the field or the view changes; it never changes the field.

**Supply links** (item 105 (j)) is a new `overlay` live-layer provider, `live.links` (file f item 411), fed by `query({ kind:
'links', region })` (V09 §2.7): each link a quadratic curve from provider to consumer (its control point offset
perpendicular to the chord by 15 % of its length, always to the left of the provider → consumer direction), 1–4 px wide by
the good's volume, coloured by the good's family from the thematic palette in key order and dashed in that family's own
pattern (five patterns), with a small arrowhead at 60 % of its length — hollow where the satisfaction is below 1 (beyond
the comfortable distance, item 107 (b)); a pin dot at the consumer end of a kept link; an impaired or at-risk
SettlementForge chain's links at half width, and an entrepôt's end marked with a small square (item 105 (i)). Dashing
carries the goods family only. With nothing selected, at the city band, the 150 highest-volume links in view are drawn
at 50 % opacity; at the district band and finer, every link in view up to 400 (the busiest first; the legend says "the 400
busiest of {n}"). With a use selected, only its links and its partners' are drawn, at full opacity. The legend lists the
goods drawn. A link whose end the key withholds is drawn to the plot without a name; a concealed use's links are not
drawn (the query filters them, §11.2). The links come from the generation worker's link cache (V09 §3.15).

**Show the whole circuit** (item 106 (g); J-V9.54) is an option of the wall layer, `LayerSpec.showCircuit` (file f item 413),
toggled in the layer toggles and in T3 `wall`'s options: while it is on, S14 draws every committed enceinte's barrier arcs — the
stretches a cliff, gorge, marsh or shore closes — as a faint dashed line along the barrier with a small tick at each
anchor, so the enclosure reads whole after commit, not only in the wall tool's ghost. It serves the town and the village
products alike (V07 §5's palisade relies on it).

**The cue column** (item 112 (a)): each colour-coded meaning of this volume's views, and its second cue — one channel per
cue, drawn at the legend-bearing stops and named in the legend. The style families' own rows (Wealth, Quarters, Uses, the crisis looks and
the base's tints) carry §8.2's cues.

| view | colour carries | second cue |
|---|---|---|
| Shade | the share of the day in shade (the veil's six steps) | the veil's steps are lightness, not hue; the readout's words; an island's strip solid, a pending one dashed |
| Supply links | the goods family | the family's dash pattern (five); a satisfaction below 1 by a hollow arrowhead; an impaired chain by half width; an entrepôt by a square |
| Who knows | public, local, secret | hatching: none · diagonal · cross-hatch, and the legend's words |
| Find (V09 §4.21.10) | each chip's matches (the thematic palette in chip order, repeating past eight) | each chip's glyph on its pins and its dash pattern on its halo's outline (item 120 (d)); a Show gaps unit outlined dashed and labelled "none here" |
| Voids | each system's projected footprint | its outline and its name label with the districts above |
| the wall states (V09 §4.21.4) | §8.2's state rows | a break with rubble, a patch's own line style, worn ticks, trace discs |
| the tier chips, the refusal and bend marks (V09 §5.1) | tier, tone | their words and rules |
=== END ===

=== REPLACE ### 5.8 The "Why here?" card ===
### 5.8 The "Why here?" card

A `WhyCardModel` (V09 §2.7, projected from §11.2's `WhyAnswer`) renders as: the subject's name with its tier chip; the
`decidedBy` line; the **bars** — each a plain sentence with a horizontal bar whose length is its share against the
largest in the answer and whose side (left a push away, right a pull toward) is its sign, the target named and clickable
(**Show**), then "and {more} smaller reasons"; for a district, block or plot the **drivers** of its wealth as bars — the
shade among them, "In shade {p} % of the day" (item 102 (f)), and the water term in dry country (`why.driver.water`,
item 111); for a wall the **closure** lines ("The cliff closes the
circuit from north-east to south-east", item 106 (g)); the **links** as "Buys {good} from {provider} ({m} m, near
enough)" and "Sells {good} to {consumer}", with the orientation in words and a split pair's other half; a record's
**members**; the **profile chips** with their sources (V09 §4.7); the **alternatives** as "Other sites it considered", each
drawn on the map as a faint numbered outline while the card is open; the **facts** with their tier chips and derivation
rows; the **dossier line** "Since week {w}: {reason}"; "Today the rules would put it elsewhere; it stays." when
`drifted`; among the facts, the grandeur line (V09 §4.21.5), an oasis's dossier line (V09 §4.21.1), the symbolic chip
(V09 §4.21.3) and, for a building a disaster look stands over (V09 §4.21.12 (4)) or a field a famine leaves bare,
`info.crisis.ruinedFor` (V09 §4.21.12 (4)) — at THORP, HAMLET and VILLAGE a `VillageField`'s and a `VillageEnd`'s row
is the village `WhyProvider`'s answer row (V07 §4.5), shown once, the card adding none of its own; then the **sections** (V09 §2.7), each under its title (`why.section.<kind>`) with its rows as plain
sentences, their values in the user's units, tier chips and Show on a row's target — for an underground element its
depth, excavation reading and ways down (the `underground` rows, V09 §4.17.3's lines among them, with `info.under.deep` for
a deep sealed void); for a building drawn damaged, the `plan` section ("Inside") opening with its damage lines at the building's own level
(`info.damage.*`, V09 §4.21.13 (1), (3)); and for item 110's records (V09 §4.20.6) — a raised way's `raised` rows (its outcome in volume 10's
words with its values, the first as the `decidedBy` line), a dossier record that fed it as a `facts` row of tier
`dossier`; a retaining wall's and an arch vault's `decidedBy` lines (V09 §2.7; V09 §4.17.6). A withheld target reads "somewhere the viewer doesn't know" (§11.2). **Ask the
assistant** at the card's foot (hidden without an enabled clerk) sends the card's question with its `WhyAnswer` on V10's
`why` entry (V09 §4.11). The card is a non-modal panel; it answers within V09 §6.3's budget.
=== END ===

=== REPLACE ### 7.1 The bars ===
### 7.1 The bars

| id | what it checks | pass | milestone |
|---|---|---|---|
| T-V9-1 | the empty state (V09 §3.2): first run shows a finished town with the overlay line and three buttons, no form; the first declaration ends the empty state; from M3b, the proxies after idle | the first map within §12.5's law + 100 ms; Enter before any declaration replaces the town, after one makes a new document (two documents in the recent list); from M3b the six proxies within §7.8's budget | M1 (shell), M2a; M3b (proxies) |
| T-V9-2 | R1 — no dialog before a first ghost | for every tool mode's canvas script — T1 `intend` after a declaration among them — no element with `role="dialog"` or `alertdialog` opens between pointer-down and the first `live.ghost` delivery; T1's fates sheet opens only after Accept | M2a, M3a |
| T-V9-3 | the latency budget (V09 §6.1) | stop-to-ghost p95 per tool within its row + 10 % at TOWN, CITY and METROPOLIS band tops — the item-110 rows on their scripts at CITY and METROPOLIS — or the pre-decided fallback applied and reported | M2a (T9 `shape`, T10 `hold`), M3a (T2 `ground` – T8 `fill` and item 110's rows), M3b (T11 `name`, T12 `dress`) |
| T-V9-4 | L-trace and L-snap | ≤ 1 frame and ≤ 2 frames p95 over a 2 s scripted drag per tool; main thread ≤ 4 ms per frame | M2a, M3a |
| T-V9-5 | the count badge is true (takes T101-9 on the canvas) | the badge equals `PreviewResult.counts`; after Accept, the committed model's plots, households and buildings of the declared thing equal the badge exactly — a quarter, a fill and a roster among the declarations | M2a; the quarter, fill and roster at M3a |
| T-V9-6 | declared means held, as the user sees it (takes T101-8) | declare a quarter and a tavern, then Try again on a block inside the quarter (its fates list naming each declared thing held), **New trees** (T12 `dress`; `rerollLayer` of `render.instances`, town-wide) and **New decoration** (T12; `style.jitter` then `style.crowns`, one group, one undo step): every declared entity keeps its leaf digest, and New decoration changes no model digest; the tray shows the declared-things line; Try again's chip row offers no layer chip | M2a; the New trees and New decoration steps at M3b (with T12, AP4) |
| T-V9-7 | variations | for each source (fill, a density, greenery and prosperity brush, a quarter's fabric, a scoped New random): three thumbnails of distinct content digests; Accept commits V09 §3.6's group for that source; a replay of the log gives the accepted variation's model digest; "Show three more" gives three new distinct ones | M2a (New random), M3a (the rest) |
| T-V9-8 | snapping | on fixtures, a T3 `wall` end within 8 px of a cliff edge, a T4 `road` end near a junction and a T5 `quarter` corner near a street centre-line resolve to the snap target's point in the stored event; with Alt held they do not; the role label shows | M3a |
| T-V9-9 | the wall ghost and natural barriers (item 106 (g)) | on item 106 (h)'s river-loop and cliff-backed fixtures, the ghost's barrier arcs' total length equals the committed enceinte's barrier-closure length within 1 m, the badge's walled length the committed wall's within 1 m, and every anchor tower ghost becomes a committed tower | M3a |
| T-V9-10 | handles | every closed derived shape shows 4–8 handles by default and 8–16 with More (k by V09 §3.5's rules); each handle kind's drag emits V09 §3.5's event; a boundary handle drag's `drawBoundary` polygon differs from the resolved ring only between the moved handle's neighbours, and it changes only the plots along that run (the locality oracle, §7.3 item 7 (ii)); a lake shows no rim handle | M3a |
| T-V9-11 | the canvas is deterministic | one canvas script, each gesture replayed at its recorded view scale and centre, on the three engines, at 1 440 × 900 and 1 024 × 768, at DPR 1 and 2, yields one model digest | M3a |
| T-V9-12 | the tool binding is complete | a walker over the `EditEvent` union (the base and the volumes as revised) and §2.8's registry reads `toolkit.json`'s modes' `emits`, the `HandleSet` kinds' emits (V09 §3.5), the context panel's and the context menu's generated controls: every kind is emitted by one of them or is on V09 §4.3's host-only / API-only list; every (kind, target) pair of §7.1's binding has its V09 §4.3 row and its gesture emits it — `moveVertex` on a shore or coast (T2 `ground`), on an enceinte's trace with a stretch's anchor vertex and a gate's crossing (T3 `wall`), on a way's, a raised way's and a tunnel's chain (T4 `road`) and on an island's key (T9 `shape`, **Reshape the rim**), `instance` on a hood pin (T6 `place`) and on trees and §8.10's other decoration instances (T8 `fill`) with add, move, remove and restyle, and `regenerate` of scope `people` (T10 `hold`, **Re-derive people**) among them — item 110's forms read by their discriminating fields (`drawWall.kind: 'retaining'`, `drawWay.raised`, `class: 'aqueduct'`, the `terrace` sugar, `setMassing { op: 'tiers' }`, the `spans/<n>/use`, `crossings/<wall>/form`, `clearanceCm` and `spanSpacingCm` paths); every entity kind's editable path has a control; a new kind without either fails CI; and each mode's `emits` lies within its tool's entry of T101-1's registry — §7.1's toolkit row as the requests amend it (T6 `place`'s one-line `roster` by file f item 570) plus the kinds a volume registers under that tool — so T101-2 holds on the canvas side as T-V10-1 holds it on the clerk's; and a T6 drop at a point emits `placeAt { plot: '', from: { points: [p] }, designation }`, byte-equal to V10 §4.1's `where.at` encoding of that point, while "this plot only" emits the plot under it (T101-3); a way's **Split here** and **Join these** are T9 `shape`'s (V09 §4.3), emitting `split { id, cut: [p] }` at the nearest centre-line point and `merge { ids }`, byte-equal with V10 §4.1's T9 way forms; T11 `name`'s **New names** in its three scopes and T12 `dress`'s **New emblem**, **New compass**, **New trees** and **New decoration** write V09 §4.5's bytes — the scoped forms `salt: 0` with `ids` in address order, the town-wide ones the concern's `DisplayList.salts` value + 1, New decoration's two as one group in registry order — which T-V10-4 compares with the clerk's encoders; and every rerollable concern of §6.1's registry (`naming`, `render.instances`, `style.jitter`, `style.crowns`, `style.compass`, `naming.emblem`) is written by a control, a concern no control writes failing CI | M2a on |
| T-V9-13 | refusals and bends are actionable (takes T101-5's refusal clause) | every refusal of a declaration by a dossier fact or a lock — `refuse.dossierOwned`, `refuse.dossierRemove`, `refuse.roster.dossier`, `refuse.locked`, `refuse.warp`, `refuse.water` — carries its reason and at least one closest alternative, as T101-5 states (a marked declaration of the dry run's `alternatives`, an unplaced dossier element, or the map-side alternative its row names); each F-EDIT reason, `ConflictAction` kind and bend of a fixture list — the bends of J-VI.4 among them, listed as bends (V02 §1b's massing set, `bend.raised.*`, `bend.aqueduct.*`, `bend.retaining.rim`, `bend.island.*`, `bend.hood.noClock`, `bend.wall.newStretch`, `bend.raised.newSpan`) — renders its catalogue row; every refusal row carries at least one button and every bend its pre-selected alternative where the row names one; each button yields a preview that is `ok` or a new bend; on a dossier-bound fixture a T6 `place` locus drop naming no element renders `refuse.roster.dossier` with the element picker and **Put it at {site}**, the picker's pick previews the line with its `element`, and Put it at {site} previews `ok` on the first candidate of V09 §4.5's `sites` query — the plot the clerk's `dossier` alternative names for the same locus; when none of the three candidates is free of hard fails, the card shows the element picker without **Put it at {site}**; on a T7 `roster` list on the same fixture, a line committed naming no element renders `refuse.roster.dossier` on its card with the picker and **Put it at {site}** by the same query (`near` and `district` from the line's locus, both omitted for a line with none), its plot equal to the clerk's `dossier` alternative for the same line (J-V10.93); the card's `{thing}` is the line's name, or the class's display label when the name is `''`, and its `{locus}` V09 §4.16 (6)'s wording (`in` and the settlement's name for a line with none), which (4) parses back to the same `Locus` for every named locus target of the fixture; for each word declaration of V09 §4.15 — T5 `quarter`'s seed, T4 `road`'s two points, T3 `wall`'s two ends — the point written is the named target's `EntityCard.anchor`, equal to volume 10's resolution of `{ at: target }` for the same words (V10 §3.6 rule 1), and the canvas's events are byte-equal to the clerk's encoding of the same words (T101-3); an `assign`, and a `rejectSite` whose re-placement no plot satisfies inside the hard rows, render `refuse.assignment.noSite` with the `moveTo` places marked, and **Put it at {site}** previews `ok` or a new bend on the first `moveTo` target; every `show` `arg`, `subject` and `page` template of a fixture row finds its argument in the dry run's `MsgRef` — the arguments the text does not show among them (`thing`, `building`, `crypt`, `layer`, `layerId`) — and every `commit` button of a fixture row, from each source and each event form it names, previews `ok` or a new bend with exactly the events V09 §4.9's forms state | M2a, M3a |
| T-V9-14 | no dead ends | 1 000 random gestures (a random tool mode, random points in the frame) on B-CITY-lite seeds: 0 end with neither a ghost nor a refusal card; 0 uncaught errors | M3a |
| T-V9-15 | the words | every code the engine can emit (the enums of §5.2, §11.2, §6.4's conditions, V08's port notes, V04's causes and `blockedBy`, V03 §2.3's `PlanReport.warnings` codes by their `report.plan.<code>` rows) has a catalogue row; a delete of `era`'s default row `c14` from the tables editor shows `refuse.table.required` (V11 §4.1); every V11 §2.3 `FindGroup` has its `find.group.<key>` row, every `DamageElementKind` of V11 §2.8d reaches an `info.damage.<kind>` row by V03 §4.6's mapping and every `AppPrefs.resolution` value its `settings.resolution.<level>` row; every event kind of the base and the volumes has a history template, and each item-110 variant one by its discriminating field (V09 §4.10), `history.dossierFacts.creation` among them; every `ReportEntry.kind` (with `disruption`'s two forms and `works`'s three ops) has its `report.moved.<kind>` row and every `GenerationReport.dossier` state its `report.dossier.<state>` row, and F-EDIT's kept assignment case its `refuse.assignment.noSite` row; every key §7.1's dry-run outcome table names has its row, and every `bend.*` and `refuse.*` row names a producer that exists — an outcome row of §7.1 naming its key (a volume's bend under its last row, by the volume section the row cites), or a gate V09 §4.9's lead lists (E-07); every term `FieldDrivers.terms` can name has its `why.driver.<driver>` row, every registered `StageDecl` resolves to a `progress.stage.<group>` row (V09 §4.21.9; a tail stage to `below`, S15 to `people`) and every wait of V09 §4.21.9 (1), Go back to here among them, to its `progress.<wait>` row, and every `Enceinte.condition` value has its `legend.wall.<state>` row; every row ≤ 25 words, Flesch–Kincaid grade ≤ 8 by our own script, and free of "error", "invalid", "conflict", `E_…` patterns and ids; the same readability step runs over the rendered V10 refusal and critique templates and V11's `says` and `reason` sentences, and a failure is reported to that volume's table; every key of V09 §4.9's explanation families — `critique.K1`–`K18`, `refuse.clerk.*` (one per `RefusalCategory` value but `lock`, `rule` and `role`, the `key` row's three verdicts and `refuse.clerk.dossier.count` among them), `clerk.notice`, `clerk.alt.*` (one per alternative of V10 §3.16's rows and per harness button V10 §2.6's `label` comment names), `clerk.view.cleared`, `clerk.applied`, `info.raised.<outcome>` for the ten outcomes, `info.under.*` with `info.under.cause.<rule>` per `AccessCause.rule`, `info.catacomb.*` per `source.kind`, state, burial-face outcome and `blockedBy` value, `info.crypt.*`, `kind.<registry kind>` per withheld kind — and `why.section.<kind>` per registered section has a row in every shipped locale (the walker T-V10-29 shares); `clerk.alt.*` has one row per key V10 §5.4's list of the drawer's keys names (`clerk.alt.stale.retry` among them); `info.copy.condensed` has its row, its text V06 §3.15.5's line; **the buttons**: every row that offers a button carries its `buttons` list in `en.json` and no locale file carries `buttons`, `tone` or `codes`; every button's `key` is a `button.*` row, and every `button.*` row is named by some row's list; every `commit` names a source (a `ConflictAction` kind, `alternatives` with an `each` row, `unplaced`, or `event` with a form of V09 §4.9's event forms), every `tool` button a `ToolId` and a `ToolModeRow.id` of that tool in `toolkit.json`, every `app` button an `AppCommand` of V09 §4.9's list; every `refuse.*` row of V09 §4.9's table ends with `button.showWhy`; no `bend.*` row and no `refuse.*` row whose codes a dry run answers carries an `app` button; and each `ConflictAction` kind a `commit` carries has its `msg.key` equal to that button's `key` | M1 on |
| T-V9-16 | history and restore | a 300-edit scripted session: "Go back to here" at 5 random points gives the model digest of a replay of the log prefix to that point; "Undo going back" restores the head's digest; "Open a copy from here" gives a document whose digest equals the prefix's | M2a (go back), M6-E (copy, with V06's E6) |
| T-V9-17 | autosave and crash recovery | 50 trials of a 200-edit session killed at a random commit, each after the worker's commit and before the journal's `done` write: the reopened town's digest equals the last committed head in 50 of 50; 10 trials killed between a fates-sheet `confirm` and its `done` write recover the confirmed action; a corrupted journal entry stops recovery before it with `error.recoveryPartial`; a 100-epoch advance killed after its last epoch and before compaction, one killed mid-group and one stopped at epoch 40 and killed before compaction each reopen at the journalled head — the first and the third at their `logHeadAfter` (the third re-issued with `stopAfter: 40`), the second with the advance re-issued whole — and an advance stopped after its first epoch and killed before compaction reopens at its `logHeadAfter` (`stopAfter: 1`); no epoch lost and no recovery line shown | M2a; the advance clauses at M6-E (with V06's advance) |
| T-V9-18 | the draft mirror | a crash mid-quarter reopens with the offer; accepting restores the draft's points and params exactly | M3a |
| T-V9-19 | exports | every tab's every format writes a file on B-CITY-lite TOWN and CITY; the estimate within ± 30 % of the actual size; the model digest and log unchanged by any export; a `public` picture holds no withheld name in its text, `aria-label`s or metadata; the VTT file carries open windows, alpha-first colours, the grid first in the Foundry scene and, when asked, the `{cols}x{rows}` picture | M3b |
| T-V9-20 | share | each of §6.4's refusal conditions shows its `share.*` row and offers the file; an allowed town's link rebuilds the session's digest | M3a |
| T-V9-21 | accessibility | axe-core: 0 serious or critical on every screen, panel, sheet, drawer and overlay state; the four first-five-minutes tasks and §13.4's scripted tasks completed keyboard-only; each preview announced once per settle; no focus trap — Tab past the last handle reaches the context panel, shift+Tab before the first returns to the map, Esc drops handle focus; 200 % UI scale with no loss of content | M1 (shell), M2a, M3a, M3b |
| T-V9-22 | touch and window sizes (takes T126-1's tablet half, T126-2 and T126-3, with V12 §3.15.16's fixtures on this harness) | on a coarse-pointer medium emulation every tool of V09 §4.12's list completes its canvas script with touch events, with `AppPrefs.touch.editFabric` on (T126-1); a long press opens the context menu; a second finger places freely; a window of 599 × 479 CSS px keeps the medium layout at 600 × 480 and the page scrolls, and the document, the view and the selection are byte-identical across a resize over the threshold (T126-2); a build-time scan finds no layout class but `wide` and `medium`, no tool greyed for its screen and no phone row in the catalogue (`refuse.phone` absent; T126-3) | M2a (T126-2, T126-3); M3a (every tool's touch script) |
| T-V9-23 | the shade view | on item 102 (g)'s island fixture ≥ 90 % of the island strip's cells draw in the two darkest steps; toggling the view changes no model digest; the legend lists only the steps drawn | M3b |
| T-V9-24 | links and link edits | a fixture with one bakery and two mills: Keep → a `siting.linkEdits` row `{ bindTo }` and the `links` query binds the kept mill; Cut → `{ avoid }` and the other mill serves; Stop buying → `{ cut: true }` and no link; Reset deletes the row and the nearest serves; each undo exact; the why card's links list the link; at `public` a concealed use's links are absent | M3a |
| T-V9-25 | siting overrides | the tannery kind's `nuisance` set to Ignore in its per-kind panel: a `siting.declared` row with `familyWeights.nuisance = 0` under the kind's key; the next placement's why card shows no nuisance bar; placed tanneries stay and are listed with the score they would gain (V11 §4.3); "Show better sites" lists ≤ 3; a relocation accepted and undone restores the digest | M3a |
| T-V9-26 | records | on B-DOSSIER-lite's fixtures, selecting a COUNT or GUILD record outlines exactly its `EntityCard.members` and the panel's count equals the model's | M3a |
| T-V9-27 | the clerk drawer | with a scripted test clerk (a `ClerkHandle` that emits fixed `TurnView`s): no proposal commits without Accept, or without apply-then-undo switched on; an accepted proposal carries `proposedBy: 'clerk'` and author `user`; every `ReplyBlock` kind renders and every `ClerkAction` kind runs its action; each turn shows its cost and the month's tally; the first opening shows the label, the notice and the key in that order; "Undo the assistant's last change" undoes exactly that group; a viewer sees no proposal; `AppPrefs` holds no clerk field; New topic closes the live segment (the next turn opens a new one); the key card shows each `setKey` verdict (`ok` closes it, `invalid`, `noCredit` and `noAccess` their sentence, `unchecked` its note); the settings list the defect records with Save as file and Clear; each `ClerkAction` kind is dispatched by V10 §2.6's table — the seven the application runs by the shell, `propose`, `undo` and `rebuild` through `run`; a `why` opens the card or page the canvas's **Show me why** opens for that row; every `action` button shows its `label`, a labelled `select` its label and an unlabelled one its ids' chips; a stale card shows `refuse.stale` with **Ask again**, a host's stale card without it; an applied card shows `clerk.applied`, a key change `clerk.view.cleared`, and a viewer's declaration `refuse.viewer`; a proposal card's effect lines carry **Show** only (V09 §4.11), and on a `source: 'host'` card the bends carry no actions and the card offers Accept, Drop and Why only (V10 §2.6); for every bend and refusal row of T-V9-13's fixture the drawer's card and the canvas's card carry the same buttons in the same order, both read from the row's `buttons` (`commit` → `propose` with the canvas's bytes, `why` → `why` opening the same card or page, `show` → `select` of the same ids, `tool` → `useTool` with the same `mode` and, for `subject`, the same ids, `drop` → **Drop**), with no `app` button on either; a `useTool` with a `mode` opens that tool in that mode on the mode's working layer with its `ids` selected (**Add a way down** opens T6 `place`'s `access` mode on Below); and a `fork` block, and a `rerun` block, whose seq lies below a rebased document's `base.seq` make a copy whose `forkedFrom.seq` is the earliest seq, its opening toast ending with `info.copy.condensed` (saved, in host mode, with `info.copy.saved` first) | M3a (scripted), M3c (V10's harness) |
| T-V9-28 | host mode is the same shell | `embed.html` with V08's `HostSlots` renders every screen of the standalone app except V08 §5.1's list (a DOM-structure diff against an allowlist); the allowlist also names the history panel's group "The party" — drawn from `HostSlots.historyLines` at the head of the All and SettlementForge filters only, newest first, **Show** only on a line with targets, no **Undo this** — and re-listed with the new key on a View as change: a spy on `list` sees every call carry `effectiveKey()`, and a line revealing one `local` and one `public` place draws, under "What anyone knows", naming the `public` place alone with **Show** on it alone, and both again when View as is cleared, each state read once the provider's `onChange` has fired for the new key (V08's per-key cache, J-V8.109), the same on "See what the players see" set and cleared — and the host rule for new documents: with `newDocuments: 'download'` each of Open a copy from here and Re-run from here (on a row, a chronicle row and a restore point), the drawer's `fork` and `rerun` and Enter's Same kind, new seed saves one `.plat` to the device whose model digest equals the standalone app's for the same action, leaves the frame's document and log head unchanged, writes no local store or recent entry and toasts `info.copy.saved`; with `'off'` none of those controls is in the DOM; **Start a new map from this** is absent in both; the file menu holds exactly Export skeleton, Rebuild around my drawings, Settings and About, Settings has no Storage section, and ctrl / cmd+O and ctrl / cmd+S do nothing (V09 §2.2's `fileMenu: false`) | M-SF (with V08's SF6; AP5b) |
| T-V9-29 | the first-five-minutes test (V09 §7.3) | §13.4's pass rule at both M3a sessions and at M3c's clerk session (T-V10-26); the M2a pipeline session recorded | M2a (pipeline), M3a (mid and exit), M3c (the clerk session) |
| T-V9-30 | the owner's UX sitting (V09 §7.4) | its pass rule, or its unrated rule applied | M2a (diagnostic), M3a, M3b |
| T-V9-31 | the known-city fixture authored through the canvas (V09 §7.2) | its bars (a)–(e), with item 110's rows on (its bridge fortress with its deck plots; the raised ways the city rules add listed in its report) | M3a |
| T-V9-32 | help coverage | every tool, mode, parameter and panel control has its `@plat/docs` anchor; every tool's guide page is generated from `toolkit.json`; every catalogue row whose **Show me why** resolves to a page by V10 §3.5 step 3's target rule — every `bend.*`, `info.*` and `error.*` row that offers it, and every `refuse.*` row with no admitted address argument — has its anchor `messages#<key>`, and every staged layer §7.3 item 9 (d)'s F-EDIT can name has its page `staged/<layerId>` | M3b |
| T-V9-33 | hidden caves and ruins (item 109 (j) (2)) | on a fixture with a sealed cavern and a sealed ruin: at `public` and `local` no sealed element is drawn, labelled, listed, answered by `why` (an unknown address) or present in any export, and the toggle is absent; at `secret` with the toggle on every element V04 records `unexcavated` draws in the unexcavated style, and with it off none does; "View as: what anyone knows" hides the toggle | M6-U (with V04's U3b) |
| T-V9-34 | the catacomb panels (item 109 (k)) | on B-CITY and a METROPOLIS fixture every catacomb panel's extent, state words, fill, rank, count sentence and source equal V04's `CatacombComplex` and V04's count; across a scripted 10-epoch sequence the extent chart never falls; every church's Below line equals its `Basement.crypt`, and every cathedral shows a crypt, the largest | M6-U |
| T-V9-35 | the catacomb bends (item 109 (k), R2) | each of the bends (a)–(d) and both crypt bends (e) of V09 §4.17.5 fires on a scripted gesture, shows its row with its offer and commits the stated events; a chamber drawn inside a church without a basement yields a crypt-only basement with the drawn ring, and its undo restores the document byte for byte; none is refused; no system chip entry and no panel ever presents a catacomb sourced at a church building | M6-U |
| T-V9-36 | ruins drawn and drawable (item 109 (g), (h)) | a chamber drawn with the system chip on a ruin commits `drawChamber { system: <the ruin> }` and draws in the ruin program; "New ruin" commits the closure creating the system; the legend shows "Ruins of an older town"; T10 `hold`'s "this system" re-makes only that system | M6-U |
| T-V9-37 | ways down and their causes (item 109 (j) (3), (3b)) | on fixtures holding one access of each `cause.rule`, each panel line equals its catalogue row for that cause and its symbol differs by cause; "Show the way in" highlights exactly the connection graph's path; every access edit of V09 §4.3 commits its event and undoes exactly | M6-U |
| T-V9-38 | dwellings only after a way in (item 109 (j) (4)) | 0 dwellings in an `unexcavated` cluster after every declaration of a 200-gesture script; every dwelling declaration on a sealed void either commits with its access in one group (dug, else an opening, else a shaft from the public ground over it) or is bent above ground by `bend.under.noAccess`, with its alternatives; on a fixture with three buildings qualifying by step 1, the dug-access bend lists the other two in `PreviewResult.alternatives`, **Use another building** re-previews `[addUndergroundAccess { building }, the declaration]` from each in step 1's order with the access reaching the cluster and no second access, and is not shown after the last; an opening's bend offers no building | M6-U |
| T-V9-39 | View as is a filter | with "View as: what anyone knows" on, compaction, ctrl / cmd+S and "Download all my towns" succeed, no withheld name reaches the DOM, a picture export defaults to `public`, and the `knowledge` key is unchanged | M3a |
| T-V9-40 | the assistant's screens (V10) | with V10's harness on cassettes: the import dialog lists every prefix outcome and every critique finding with Show and Fix, and "Check with the assistant" starts the `critique` route; "Ask the assistant" on a why card starts the `why` route with the answer attached; a creation proposal shows its scratch read-only under the banner, and Accept opens the new document beside the current one — from the untouched empty-state town it replaces that town, and Recent towns gains no entry for it (J-V9.127); the transcript exports as V10's JSON; a host `clerk.config` of `off` or `host` shows no Assistant button and no message box (a host's proposal then opens the card-only drawer, T-V9-64); **How do I …?** in the drawer's menu and in Help sends on the `help` entry and its answer's `useTool` button makes that tool active, and **Ask the assistant to place these** under T7 `roster`'s box sends the pasted text on the `roster` entry, neither shown with no clerk configured or with the clerk off; with **no clerk configured** (`ShellConfig.clerk` null) the import dialog still lists every finding, its **Fix** on a `propose` fix previews the events as a ghost with Accept and commits them as one group with no `proposedBy`, a `useTool` fix makes the tool active, and `ClerkHandle.run` is never called — the same with a clerk mounted; **Start a new map from this** in the drawer's menu (standalone) sends the next message with `attach.newMap: true`, its proposal previews as a creation proposal under the banner, and Accept opens the new document beside the current one, which stays unchanged; in host mode that item is absent, no turn enters creation mode, and the drawer's `fork` and `rerun` buttons follow `newDocuments` as T-V9-28 states; in host mode with `clerkMode: 'builtin'`, a scripted `key` refusal and a scripted `budget` refusal each show the card's `openSettings` button, which opens Settings at its Assistant section with the fields the host forces locked under `host.locked` ("Set by SettlementForge") | M3c (the host clauses on T-V9-64's scripted host page); M-SF (the host clauses again on V08's embed, AP5b) |
| T-V9-41 | V06's screens | "Re-run from here" gives V06's `rerunFrom` document and leaves the current one unchanged; `chronicle.csv` and `uses-history.csv` equal V06's writers' output; the animated history stays ≤ 100 MB by stride doubling; a skeleton with a `history` block reports it at import | M6-E (with V06's E6) |
| T-V9-42 | V02's handles | on a composed building each handle kind (range end and width, tower centre and radius, room extent) emits V02's event and each stepper and chip its event; the family strip shows one thumbnail per feasible family within V09 §6.1's row, and a tap commits `setMassing` | M6c (with V02) |
| T-V9-43 | shade strips and the circuit | the Shade view draws V05's strip and pending rows for every island with their legend entries; "Update shade now" clears the pending line; with "Show the whole circuit" on, every barrier arc of item 106 (h)'s fixtures draws after commit in the town and the village products | M3b; the staged layers' milestones |
| T-V9-44 | base edits reached (MFCG's asks, FTG) | a scripted count: each of §7.4's thirteen MFCG asks and FTG's drawn river, tree brush and land-use painting is reached in ≤ 3 actions from the rail or a panel, commits its event (castle `site` and `baileyArea`, `setAttrMany` of land use, way `split` and `merge`, a district-keyed thematic `setStyle`, an `instance` group, `rejectSite` lift, `placeAt` lift, `unassign`, `drawWater { kind, add: [], line, widthCm }`) and undoes exactly | M3a |
| T-V9-45 | view keys, notes, pins and the ruler | each control of V09 §4.19 writes its key, which survives save and reload and never enters a digest; the per-viewer keys never cross a bridge; §13.4's "measure a street with the ruler" passes; "Save as annotation" writes a pin | M3b |
| T-V9-46 | people and the family tree | the People panel's filters equal the `people` query's rows; the family tree matches §14's layout rules (generations in rows, elision beyond two, re-root) and is keyboard-operable; opening a person pins nothing; "Where is" draws the `whereIs` answer | M4b |
| T-V9-47 | METROPOLIS costs | the link cache's full bind ≤ 120 ms and a scoped re-bind ≤ 5 ms; a compaction never starts while a draft is pending; the shade sampler within its law or its fallback applied; T1 `intend`'s and T12 `dress`'s METROPOLIS rows of V09 §6.1 | M2a (compaction, AP2), M3a (links, AP3, where the link view is built), M3b (shade, AP4) |
| T-V9-48 | a clerk's alternatives | each variation of a scripted proposal is previewed by its own call and thumbnailed from that preview; the tray shows V10's labels; one ghost at a time | M3a (scripted) |
| T-V9-49 | nothing is lost by deleting | a deleted town is in Recently deleted with its snapshot and journal for 30 days, Restore reopens it at its last head, and the storage ladder never purges it without asking | M2a |
| T-V9-50 | the context menu | right-click, a long press, Shift+F10 and the Menu key open the same menu on every entity kind, generated from the registry, each item producing the panel control's event | M2a |
| T-V9-51 | item 110's tools (V09 §4.20.1–V09 §4.20.6) | each gesture — Retaining wall (both high sides, open and closed), Terrace and its level handle, Raised, Aqueduct, a deck stamp, a landmark slot, a span's use, a crossing's form, the deck height and arch spacing, the per-tier storey stepper — previews, commits file f item 362's or file f item 364's events in one group, and undoes byte for byte | M3a (tier count, step, stairs and top: T-V9-59) |
| T-V9-52 | raised ways on the canvas | 0 junctions between a raised part and every way it crosses; no crossed way split; both ends on ground vertices, an end released elsewhere bent to one; a raised road meeting a town wall comes down before it and passes its gate; an aqueduct passes a wall by an arch, never a gate; an aqueduct from a lower source is bent to the nearest higher source, else to a well at the terminal (J-VI.4 (h)); a raised stroke to an island's rim commits 0 ways and one sky access, and an aqueduct stroke to a rim ends at its last ground vertex outside the island (J-VI.4 (d)); a raised stroke across a hoist's column or rope line with no re-route ends at its last ground vertex before it, with `bend.raised.skyAccess` (J-VI.4 (f)); a wall drawn across a standing viaduct passes through its station on the deck at its level nearest where it would cross, that pier built into the wall and every other station, key and span unchanged, with `bend.wall.raisedCrossing`; a breach on the stretch held under a crossing station leaves that stretch standing, with `bend.wall.held`; a road drawn across a viaduct crosses under its nearest `open` span, 0 way corridors over a support, ramp, stair, foot or `vault` span, with `bend.raised.underSpan` (§2.7's support step (6) (b); T110-2) | M3a (the island case with the sky's milestone) |
| T-V9-53 | a suppression holds | a generated raised way removed on the canvas stays removed after Regenerate, a scoped New random over every district it crossed, a reload through crash recovery and ten epochs with V06's pass; "Undo this" brings it back with its ids; its card and row show `info.remove.holds`; the same holds for every kind file f item 260 suppresses on the fixture — a harbour-mouth chain, a quay wall, a generated retaining wall, a generated deck plot and a floating island; with a later edit making Undo this dependent, each removal row's **Build it again** and `ClerkMount.rebuildEvents(seq)` for the same group return byte-equal event lists (canonical CBOR), those of V09 §4.20.3 (4)'s row for the kind, and committing them re-creates the thing as declared | M3a; the epochs M6-E (with V06's E6); the island with volume 5's sky milestone |
| T-V9-54 | retaining walls and terraces | every way crossing one is a stair or a ramp in the ghost and in the committed model, the bend line naming the dry run's form; a wall drawn on flat ground bends by V09 §4.20.1 (3) (a) or (b), and 0 retaining walls stand on flat ground after any script; a terrace is one group and one undo step; a level-handle change leaves no wall of the old step | M3a |
| T-V9-55 | decks | a stamp on a deck lies inside its deck plot and within the budget's band; a refused class bends to the landward end; storeys above `maxFloors` bend; a tower or fort stamp on a mole's head, mid-mole or the mid-span of a bridge at least V11's `deck.landmarks/bridgeMid/minSpanM` long lands on the slot; a removed deck's buildings are listed among the effects; T4 `road`'s pier, quay and bridge ghosts show their deck plots | M3a |
| T-V9-56 | the second known-city fixture (V09 §7.2) | its bars (a)–(e) and its emulation variant | M3a |
| T-V9-57 | the no-op pin on the canvas | with V11 §3.24.0's item-110 switches off, fixture 1's canvas script yields the model digest it yielded before item 110 — a `NoOpPin` registration of the known-city canvas scripts (V09 §7.2) as a suite of V12 §2.13's `item110.raised`, `.terrace`, `.deck` and `.stepped` pins on V12 §3.7.8's engine, owner V09, written by the M3a seat; with only the raised-way rows on, every TOWN-rung canvas script is byte-identical | M3a |
| T-V9-58 | the hit stack (V09 §4.20.8) | on a viaduct over a street with a walled-up span: successive clicks select the deck, the span, the arch vault and the street, then the deck again; the context menu lists the others; a tap cycles the same; T11 `name`'s second click names the street; `hint.below` shows once; each answer ≤ 1 ms | M3a |
| T-V9-59 | tier controls (V09 §4.20.5) | on a stepped temple each control emits V02's event (the count, `insetCm` by the step handle snapped to 10 cm, the stairs, the top, the stair width, a tier's heights); each of V02 §1b's bends shows its V09 §4.9 row, the bent result pre-selected, with its alternative (J-VI.4 (i)), and each alternative's preview is `ok` or a bend; the shape, skirt and solid chips and the centre, radius and shrine-inset handles emit V02 §4.6 (1)'s `tiers` fields; undo exact | M6c (with V02) |
| T-V9-60 | effects (V09 §4.20.7) | on scripted fixtures — a viaduct's removal (`rerouted`, `removed` vaults with a drawn plan), an aqueduct's removal (`lost`), a deck's removal (`removed`), a terrace (`rebuilt`, `displaced`), a Re-derive to CITY (`added`) — every effect kind appears in the preview's `effects`, in the fates sheet's "What else changes" and on the clerk's card; the live region reads the first three; the list caps at §11.2's cap with `effectsMore`; the clerk's card draws each effect line with Show only | M3a |
| T-V9-61 | item 110 in the exports (file f item 447) | on the second fixture every retaining wall, raised way, span, arch vault and deck plot appears in each format as file f item 447 (a)–(d) state; the ground scene has 0 portals where a raised way crosses a street; each deck scene's grid aligns at 0 px per cell (O11 (g)); the 3-D file holds one deck mesh per raised way and one wall mesh per retaining wall | M3b |
| T-V9-62 | removals in the skeleton (file f item 455) | on the second fixture, one generated raised way removed, the skeleton exported and opened with the same seed: the way stays removed and the digest equals the document's; under another seed the import dialog shows *kept removed* or *nothing to remove*, never an error | M3a |
| T-V9-63 | Keep them as yours (V09 §4.20.3 (7)) | a CITY fixture with two generated raised ways re-derived at TOWN lists both among the effects; with the box checked both stand as declared ways and one undo restores the city; unchecked, none stands | M3a |
| T-V9-64 | the card-only drawer and the host channel | in host mode — at M3c on the application harness's scripted host page, a test-only page that loads the shell in host mode and fills `ClerkMount.host` and `HostSlots` over §11.3's bridge as a host would (the harness side T-V10-20 drives), and at M-SF on V08's `embed.html` with its host harness: before any `clerk.config` (mode `off`) and under `host` no Assistant button shows; a `preview { events, view: true, proposal }` opens the drawer with that card alone — the AI mark naming `hostName`, no message box, menu, settings or meter, no Ask again; Accept commits one group with `proposedBy: 'clerk'` and the host receives `clerk.proposal { status: 'accepted', seqs }`; Drop answers `dropped`; a newer proposal replaces the card and answers the older one `dropped`; a moved head answers `stale`; a viewer's `preview` is refused; the harness reads the transport only through `ClerkMount.host.config()`, a refresh arrives through `onConfig` after `needsToken()`, a transport off the allowlist is answered by `refused('origin')`; no token appears in any store, log or report | M3c (with V10's C5, on the scripted host page); M-SF (on V08's embed, AP5b) |
| T-V9-65 | why sections | on fixtures holding a catacomb under a churchyard, a cathedral with its crypt, a sealed deep cavern, a generated viaduct, a stepped temple and a building with a drawn plan: each why card draws every section of its `WhyAnswer` after the facts, in the providers' order, titled by `why.section.<kind>`, each row's `says` rendered, values in the chosen units, targets clickable; a withheld row reads the unknown-place line; the catacomb's panel, the church's crypt line, the void's sealed line and the raised way's panel reason render the same `MsgRef` as the card (compared row by row); a raised way's `decidedBy` row is not drawn twice | M3a (scripted rows); M6-U, M6c (live providers) |
| T-V9-66 | View as reaches every read | on T-V10-6's canary fixture (`local`, `secret`, concealed and unexcavated places named with unique canary strings): with View as "What anyone knows", no canary appears in the why card (a withheld target reads the unknown-place line), the source chips, the gazetteer, "features in view", the Link card, the record panel, the People panel, "Where is" or T6 `place`'s alternative sites, and a spy on the facade finds every band-less `query` the shell sends carrying `admitAs: 'public'`; with a host-set key form `{ tier: 'public', places: [one secret place] }` that place's name shows in each and no other canary does, the menu reads "What the players know" with its other entries disabled, the View as banner is not drawn and the export dialog defaults to the form; clearing View as re-asks every open answer at the role's key without a reload (`onEffectiveKey`); the knowledge key and the document formats are unchanged throughout; the fates sheet of an edit made meanwhile lists every fate at the role's key (J-V9.86) | M3a (tiers, and the form set by the test harness through `setViewOpts`); M-SF (the form through V08's embed, SF6; AP5b) |
| T-V9-67 | the three load outcomes (V09 §3.14 (a)–(c)) | with test builds labelled o(N), o(N−1) and o(N−3) (§6.4's fixture labels): **(a)** a document saved at N−1 opens editable under its own version, an edit commits there, the standalone app shows `info.upgrade.offer`, **See what changes** shows §7.5's diff in the fates sheet and **Do it** commits one `upgrade` (the output version then N), **Not now** commits nothing; **(b)** a document at N−3 with `model` opens as the frozen view under `error.frozen` with the CLI command, no other edit accepted (view and export only, §2.9 step 2) and **Edit it with this version** the one edit control, which returns `confirm` with the renames in the fates sheet and on **Do it** commits one `rebase` with reason `frozenImport`, after which an edit commits under N; the same document with one chunk's bytes altered shows `error.frozen.damaged` and no Edit control; one naming a pack the build lacks shows `error.frozen.pack` after the attempt with nothing committed; **(c)** a document at N−3 without `model` shows `error.frozen.noModel`, and **Open its recipe with this version** opens a new document under `error.linkVersion` whose model digest equals the same recipe and log opened as a link, the town on screen unchanged; **host mode** (the embed, owner frame): the N−1 document shows no upgrade strip and no upgrade control but V08 §4.2's header **Update the map engine**, the banner slot draws no frozen-view notice, (b)'s **Edit it with this version** commits its `rebase` through `doc.changed` followed by `doc.snapshot`, (c)'s button saves one `.plat` to the device with `newDocuments: 'download'` and is absent with `'off'`; an editor's frame shows `error.frozen` without the Edit control | M3a (the standalone clauses); M-SF (the host clauses, on V08's embed with SF6; AP5b) |
| T-V9-68 | SettlementForge's chains in the Show menu | on `town-cc-1` or its test-side variant with one active custom chain (T-V8-25's variants), and on a variant whose every chain is inactive: the Show menu lists **SettlementForge's chains** on the first and not on the second; choosing it writes the per-viewer key `thematic: 'supplyChains'` and draws V08 §5.2's lines with the chain's label in the legend; under a key that withholds one of the chain's nodes the entry is absent; switching the view on and off changes no model digest and adds no log entry; a GeoJSON export while it is on carries V08's `supplyChain` LineString | M-SF (with V08's SF4 and SF6; AP5b) |
| T-V9-69 | the dossier groups and the standing notes | on `town-1`'s digest pairs through V08's embed (T-V8-14's pairs, an undated one among them): each committed absorb is one group headed `host.group.absorb` with `{n}` its ledger event's `changes` count and `{week}` its `absorbed` entry's week (`host.group.absorbUndated` on the undated pair); under it its dossier events in log order, each followed by one line per report entry of its `seq`, then one line per stored note of the ledger event with **Show** exactly where the note's `keys` bind an element (highlighting those addresses), then its epoch rows; the creation's prefix is headed "Made from SettlementForge's record" with its notes; on the variant whose absorb carries an epoch in which a removed raised way's reason fires again (V06's fixture for W60), that epoch row carries one `info.raised.suppressed` line with **Show** on the removed way's former outline; under View as "What anyone knows" a note line whose key binds a `local` or `secret` element is not drawn and returns when View as is cleared, and a report-entry line whose element is `secret` is drawn naming it by its `kind.<registry kind>` word with no **Show** on it — in the group and in the report panel's "What moved" alike — and names it again when View as is cleared; the group is listed under All and SettlementForge and absent under Mine and Assistant; the report panel lists `GenerationReport.dossier` by its `report.dossier.<state>` rows, then the standing notes under `host.group.standing`, one line per `GenerationReport.dossierNotes` entry; all of it the same in a second editor's frame and after a reload | M-SF (with V08's SF4 and SF6; AP5b) |
| T-V9-70 | the roster reader's namespaces (J-V9.125) | T7 `roster`'s pasted lines and T6 `place`'s typed words, read by V09 §4.16 (3): on a TOWN fixture "a smithy", "an inn" and "a church" resolve to `smithy`, `inn` and `church`, never to a `v.` class; on a VILLAGE fixture they resolve to `v.smithy`, `v.inn` and `v.parish_church`; "a chandler" at VILLAGE resolves to `v.shop`; a town-and-city class that plays itself at VILLAGE ("a pawnshop") resolves to itself; T6's stamp palette lists exactly the same set at each rung | M3a (the village rungs' clauses with V07's V-M2 rows) |
| T-V9-71 | the oasis (V09 §4.21.1; item 111) | on an arid and a temperate fixture: T2 `ground`'s Lake with **Spring-fed** on previews the water, the grove and the gardens with `info.oasis.badge`, commits `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm, spring: true } }` byte-equal to V10's encoding of the same request (T101-3), and undoes the three in one step; the history row reads "Made an oasis at {place}"; the toggle is absent on Sky; a dossier `oasis_water` oasis shows the toggle locked, `info.oasis.dossier` on its why card and `refuse.dossierRemove` on Delete; a save, a reload, a Regenerate and an epoch keep a drawn oasis | M3a (M6-sky for the Sky clause) |
| T-V9-72 | colour vision, the second cues and the trial (V09 §4.21.2, V09 §7.6; item 112; takes T112-1's thematic-view clause and T112-2) | each **Colour vision** choice writes `cvdVariant` and the tiles and legend draw the sheet's checked variant; the key never crosses a bridge, never enters a digest and adds no log entry; `AppPrefs.cvdDefault` applies to a town with no value; every thematic view of V09 §5.4 at each variant passes T112-1's style check and each colour-coded meaning of V09 §5.4's cue column draws its second cue; a picture exported under a variant draws it and says so; the chrome's marks keep their words (axe-core's colour step and a greyscale capture of every screen); the trial's `TrialRecord` validates against its schema and its pass rule is computed as V09 §7.6 states | M3b (the view); the release gate (the trial, T112-2) |
| T-V9-73 | a town with a past (V09 §4.21.3, V09 §4.17.1; item 113) | T1 `intend`'s **History** "Once a city" on a VILLAGE fixture commits one `adjust` of the blueprint's `history` as a Re-derive from S0 with its whole-town ghost; the same recipe and history replay byte-identically on the three engines; the report panel's "What its past left" lists one line per `HistoryRecord` entry with Show; a symbolic peak's facts carry the "size not recorded" chip; a dossier history locks the chip with `info.history.fromRecord`; a void whose last open link is bricked reads `info.under.lost` at `secret` only, drawn in the unexcavated style, and loses the line when a way in reopens; the replay's wait shows the progress view and ends within item 119's comfort level as V06's part of the item applies it | M6-E (with V06's replay; the lost-void clauses with V04's U-ACCESS) |
| T-V9-74 | the wall's repair and states (V09 §4.21.4; item 114; takes T114-6's legend clause on the canvas) | on a fixture with a breached, a worn, a patched and a dismantled run: Repair with a patch row makes the breached run `patched` with that material, robust makes it `standing`; the worn and patched runs offer robust only; the dismantled run bends with `bend.wall.newStretch`; Wear on a standing run makes it `worn`; "Back in use" on a ring with nothing to lift shows `info.wall.inUse`; each commits V06 §2.8's event and undoes exactly; the run's panel line and the legend's `legend.wall.<state>` entries equal the model; every state stays distinguishable in a greyscale capture at the bands §8.2 states; the VTT tab shows `export.vtt.walls` | M2b (the legend); M3a (Repair with a material, Wear); M6-E (Back in use, the epoch lines) |
| T-V9-75 | a hand design beyond the grandeur ceiling (V09 §4.21.5; item 115; takes T115-3's hand form) | on THORP, HAMLET and VILLAGE fixtures: a T9 `shape` `U` plan, a court and a tower on a dwelling and a second manor by T6 `place` each commit as asked with `info.grand.beyondTier` on the badge, the card and the why card; the same edits at TOWN show no line; a dossier-bound manor record (V08 §3.16 (3)'s "specified") reads `info.grand.dossier`; a reshape back under the ceiling drops the line; the clerk's card for the same edit carries the line | M6 (with V02's ceiling rows; the VILLAGE clauses with V07's village rungs) |
| T-V9-76 | the zoom-out limit (V09 §4.21.6; items 116, 122 (i); takes T116-1's view-control clause) | at every rung from THORP to the cap: the wheel, pinch, − key and zoom button settle at §8.8's limit and never beyond; the button is disabled there with `info.zoom.limit`; Fit the town frames the bounds (a village at V07 §5.2's township view); the first view is unchanged; a hand edit growing the bounds moves the limit; the export's whole-town frame equals the bounds; at the METROPOLIS cap in windows of 1 280 × 720 and 600 × 480 CSS px the limit is stop 0 with `info.zoom.coarsest`; while a crisis look stands the opening view contains every camp, Fit frames the town and its camps and the limit is theirs with `info.zoom.limitCamps`, and when the crisis ends the limit is restored, a coarser view settling to it about its own centre and a moved view never re-framed (item 122 (i)) | the milestone §16's row for item 116 names; the crisis clauses at M3b (§16) |
| T-V9-77 | the season control and the week's fallback (V09 §4.21.7; items 117, 125; takes T117-6's season-control clause) | a dossier fixture opens on its latest stamped tick's week with **Follow SettlementForge** on; a slider move turns it off and turning it on restores the dossier's week; a standalone town opens at week 19 with no switch; the four chips set weeks 6, 19, 32, 45; the document's model digest is identical in all 52 weeks and no week change adds a log entry; a picture names its week; `snow` defaults on in a cold climate's snow weeks, and on an arid row the Weather control offers no `snow` and a carried `snow` draws `clear` (§8.2's snow rule); a dossier with no stamped tick opens on week 19 with the switch on and `view.season.noWeek`, and an absorb bringing a tick moves the week; the same dossier with and without a host context opens on the same week (item 125 (e)); a host's `view.set { week }` moves the drawn week and leaves the Season control and its switch unchanged (item 125 (c); §11.3); the re-skin stays within §12.5's budget | the milestone §16's row for item 117 names; the item-125 clauses at M-SF (§16) |
| T-V9-78 | the festival list (V09 §4.21.8; item 118; takes T118-2's festival-list clause) | a dossier with two festivals lists both with their weeks; with the switch on, decorations show exactly in their windows' weeks; **Preview** shows one out of its window until the switch is touched; "No decorations" draws none; a previewed festival removed by an absorb falls back to `follow`; standalone, the four generic festivals are listed; the model digest is identical with decorations on and off; a picture names the festival | the milestone §16's row for item 118 names (V08's `traditions` read at M-SF) |
| T-V9-79 | the progress view (V09 §4.21.9; item 119; takes T119-3) | for a generate, a Re-derive, an open from a file, an absorb, a 100-year advance, a history replay, a CITY PNG export and a migration at METROPOLIS's cap: a wait under 1 s shows no strip; a longer one shows it within one frame of 1 s, never an empty map region, naming each stage group in order and the wait's own line; a Go back to here of a few hundred edits at METROPOLIS shows the strip past 1 s with its `progress.undo` count; a stopped history-first generation shows `info.history.cancelled`, whose **Generate without its history** makes the town with `history.replay` false; pan and zoom keep §12.5's frame budget throughout; every one-time wait completes within §12's ten-second comfort level on the reference machine — a 100-year advance and a history-first generation in total (item 119 (a2)) — and where V06 §6.8 coarsened a run the line names the cadence chosen (", in {n}-year steps"), a coarsened catch-up's `progress.dossier` line too; an open's verification replay runs after the editable map, shown only as `progress.verify`; a stopped CITY PNG export and a stopped history-first generation end through their `signal` (§11.2); in host mode, on V08's host harness (the embed), a history-first creation from a dossier shows the strip with no **Stop**, its replay coarsened to fit the comfort level, and every editor's frame creates the identical document (T-V8-3); every registered `StageDecl` resolves to a group row, a tail stage to `below` | M3b (the strip); M6-E (the advance and the replay); M-SF (the host clause, on V08's embed) |
| T-V9-80 | the edge suite (V09 §3.16) | one scripted fixture per clause of V09 §3.16's table: each edge meets its stated outcome at its stated rung, with no uncaught error, no hang, no lost data and no whole-map retry | M3a, and at each later milestone for its rows |
| T-V9-81 | points in, shape out on the canvas (takes T101-7) | through the canvas script on §13.2's ridge fixture: T3 `wall`'s Draw wall from two points follows the ridge and closes when its ends meet; T5 `quarter`'s seed quarter never crosses a block and its boundary lies on street centre-lines, water, walls or ridges; T2 `ground`'s Lake at one point and a level has a shoreline equal to the terrain's contour at that level — each event the points form of V09 §4.5's mapper, byte-equal to the tool API's for the same points (T101-3) | M3a |
| T-V9-83 | Find (V09 §4.21.10; item 120; takes T120-2 – T120-5's interface clauses, with V12 §3.15.10's fixtures on this harness) | on the METROPOLIS-cap fixture, a dossier fixture and T-V9-66's canary fixture: (a) the panel lists what the gazetteer holds at the key — each kind's count equal to §11.2's class count, the dossier's names first, the empty box's grid under V11's nine groups — and nothing the town lacks; (b) "forge" and "smithy" suggest Blacksmith, "smith" offers each smith kind and "All smiths", "blacksmth" finds Blacksmith, a typo in a word of four letters is not forgiven, suggestions come grouped with counts, and ↑ ↓ Enter add a chip; (c) each chip's matches equal §11.2's match listing at the key (T120-2); (d) under a player view no canary appears in a suggestion, count, glow, pin or ghost pin (T120-3), and a chip the new key withholds reads `find.withheld`; (e) the chips survive every band and layer change and every commit, advance, undo, redo, regenerate, load and migration, a chip whose last match goes staying at count 0, dark, and lighting when a match returns (T120-4); at a scrubbed week before a matched building was built, and after a closed use's end, the match is neither drawn, pinned, counted nor listed, a chip with none there reads count 0 for that week with the chips unchanged, and the head's matches return at the head (§11.2's gazetteer `week`); at a week before a matched use closed that use is matched and drawn, and a building whose use changed since is matched by its use then, never its head use (§11.2's *At a drawn week*); (f) at the city band every match has a pin or a count bubble and every chip its glyph and dash, sixteen chips told apart in a greyscale capture (T120-5); (g) matches on Below and Sky show as ghost pins with "{n} more Below" and "{n} on Sky", **Go there** setting the working layer and `depthBand` or the island `key` (a hidden Below or sky layer drawn as the working layer, 0 events logged, its `LayerSpec.visible` unchanged), and at the interior band `findRooms`' rooms glow with "{n} found"; (h) Show gaps draws V01's `gapUnits` dashed with "none here" and is disabled without a kind chip, and an older `thematic: 'coverage'` opens as Show gaps; (i) the document's hash, every digest and the log are unchanged by Find, and every chip off gives the tiles of Find off; (j) V10's `find` action's `set`, `add`, `remove`, `clear` and `gaps` set the panel as clicks do, and a host message sets no chip; (k) a picture export draws Find with the chips in the legend, a battle map leaves it off unless **Draw Find**; (l) at the cap with sixteen chips, suggestions ≈ 50 ms after a key and a glow ≈ 100 ms after a click (V09 §6.4; V12's T-V12-52 reports T120-6) | M5 (§16) |
| T-V9-84 | the resolution setting (V09 §4.21.11; item 121; takes T121-1, T121-4 and T121-7; T121-5's captures taken on this harness for V12) | a fresh install reads **Auto** (T121-1); each manual level draws at §8.8's tile DPR, or, on a device fixture whose memory cannot hold it, the nearest level that fits with `info.resolution.fallback`, never a refusal or a crash (T121-4); a level above the screen is greyed with "Your screen is {level}."; the chip reads "Auto · {level}" with its reason, or the manual level; a device-pixel-ratio change re-evaluates within one frame and the level changes while the view is settled — at once when no gesture runs, at the gesture's settle otherwise (§8.8; T121-7); labels, chrome and overlays at the device pixel ratio at every level; the document, its hash and an export byte-identical across every setting | M4 (§16) |
| T-V9-85 | crisis looks on screen (V09 §4.21.12; item 122 with (h)–(i); takes T122-2's interface clause, with V12 §3.15.12's fixtures on this harness) | standalone, **Preview a crisis** lists every look kind of §10.2's table and draws the picked one at `previewSeverity` in every week until the switch is touched, a previewed `disaster` look's **Show** framing the union of its units' `FindArea` shapes (V01 §5.4 (6)); on a dossier fixture with a siege of two armies, a refugee wave and a plague: each look shows exactly in its condition's weeks (T122-2); the why lines read "{look}: {condition}, weeks {a}–{b}"; the crisis card gives "about {n} besiegers, two armies" from the dossier's sizes and, for a force beyond the frame and its margin, `info.crisis.massed`; Find's `crises` section lists the three looks; under a player view a none-row condition carried beside the three looks (an infiltrated stressor) is named in no line, card or count at public, and only at secret (DR44); **Show crises** off draws none; the document's hash and every digest are identical with the switch on and off and in every week; a picture names the looks and a battle map draws them in the image only; while a look stands the opening view contains every camp and the limit is the bounds of town and camps (with T-V9-76); a previewed `famine`'s and `rebellion`'s **Show** framing their bare fields and their barricades, and a look with no mark drawn for it framing the town; a preview picked and the switch turned off with the card open each update the card and Find's list at once, and a district split on a dossier fixture with a disaster standing updates the card's `facts` row at that commit | M3b (the switch and the preview); M-SF (the dossier's looks and their numbers) (§16) |
| T-V9-86 | a ruined building's damage lines (V09 §4.21.13; item 123) | on V03's damage fixtures — an `abandoned`, a `decayed` and a `ruined` building, a restored one with patches, a never-decayed one and a ruined church with its crypt: the plan panel and the why card's `plan` section show one line per damaged line kind present at the building's level by §6.3 *Plan damage*'s comparison, in `info.damage.*`'s order, three rooms and then "and {n} more"; a never-decayed building shows none, with a kind's range edited to start at 0 as well; a higher level's lines are a superset of a lower's; a restored building's lines leave in reverse threshold order under `info.damage.head.restored`, with `info.damage.patched`; a building a disaster look stands over shows the look's lines under `info.crisis.ruinedFor` in the plan panel, the why card's `plan` section the own level's rows only, its ids and digests unchanged; on T-V3-40's fixture with a rebuild begun on one building of the disaster's units, that building under its `reconstruction` Works shows its own level's lines and no `info.crisis.ruinedFor` on the panel or the card, and under a `disaster` preview the look; a `ruined` building at level 1 shows no `storeyGone` line for its ground storey; under View as on a ruined building the key withholds, the lines naming rooms (`roofBay`, `floor`, `partition`, `furniture`, `unsafe`) and the `crypt` line are not drawn while the head line, `storeyGone`, `outerWall`, `door`, `window`, `stair` and `cellar` are, and no room the key does not admit is named; volume 10's explanation of each fixture building renders the same `info.damage.*` rows at the building's own level, and for a building the disaster look stands over names the look by `info.crisis.*` (V10 §3.23 C10) | the later of V03's damaged-plan step and M3b; the decay levels at M6-E (§16) |
| T-V9-87 | weather effects (V09 §4.21.14; item 124; takes T124-5, with V12 §3.15.14's fixtures on this harness) | on a fresh device fixture the switch reads on at the mid, high and ultra tiers and off on the low tier and under reduced motion (T124-5); a user's choice holds over the default and Reset restores it; **Start a shower now** starts a spell of the commonest kind live at that moment for the climate row — heat shimmer in an arid row's dry weeks at midday, and dust haze there at midnight under `light: 'time'`, rain and never snow where winter does not freeze — and at a moment with no live kind the button is disabled with `settings.weather.noneNow` and starts none (V11 §3.25.11; T-V11-48); a press while a spell is in force fades that spell out before the pressed one starts, and a second press before then changes nothing (§6.1 *The weather stream*); the timeline replays from its session seed, clock and presses with the climate row, year position, sites, light mode and view hour in force (§6.1; T124-9); the Light group's **Weather** offers no `snow` on an arid row and a carried `snow` draws `clear`; the document's hash and every tile are unchanged by the switch, a spell and the button; a picture export draws no effect | M3b (§16) |
| T-V9-82 | a canvas-declared subset round trip (takes T101-4 on the canvas) | the documents of the known-city canvas scripts (V09 §7.2) and the declared subset of a scripted B-CITY-lite session, each exported by Export skeleton (V09 §3.12) and re-imported under its seed, reproduce the document's model digest — an author's removals kept (file f item 455) | M3a |
=== END ===


