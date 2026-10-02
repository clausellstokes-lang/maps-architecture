# Repair round 7v — V01 (the city's fabrics) — lane coherence/repair-V01-r7v

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V01-r7v; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V01-neighbourhoods.md. Live unit: V01 as assemble-r7 left it
# (sha256 7b63780f96353d9a…, 528 635 bytes, 3 756 lines). Each REPLACE body is the live subsection with count-asserted
# substitutions (scratch rV01r7v/gen.py: 6 substitutions, each applied exactly once); every untouched line is verbatim,
# only the lines a substitution touches rewrapped. Blocks: 4, all REPLACE of leaf sections — §1.2, §3.4.2, §3.6,
# §3.17.3. No heading retitled or added, no whole-volume REPLACE, the title block untouched.
# Ruling requests: 0. END lines asked of V01 by other units: none (adjudication-r7v Part H, searched for V01 throughout).
# Binding rulings applied: adjudication-r7v (its head, the decision table, Part H · V01: V1-1); adjudication-r7's Part H
# head (J146: cite the laws, never restate them; "one rule for the rest", J148/J149) and every earlier ruling standing.
# No review id, ruling id or Part P marker is written into design text.
#
# PROGRESS (lane `coherence/repair-V01-r7v`, 2026-10-02)
# - [x] P1 brief read whole (with its FAMILY FIX PASS NOTES and ORCHESTRATION NOTES; fresh run: no output, no LANDED
#       line); adjudication-r7v: progress, What this pass is, the decision table (50 rows), Part H · V01, the builders'
#       choices, the held notes; adjudication-r7's Part H head and Part H · V01; the issue source famverify-readers-r7.md
#       (VF7-RDR-09, read whole); the round-7 V01 repair (its sweep)
# - [x] P2 live V01 read whole at every site: §1.2 (the hook table), §3.4.2 (a)–(f), §3.6 (1)–(8) and its closing
#       paragraph, §3.17.3 (1)–(7) and its closing paragraph; §2.3's parts table, §3.14's constants line, §1b's strip row,
#       T-V1-51; live base §2.7's LAW 1 (1)–(10) (ARCHITECTURE.md l. 2699–2732)
# - [x] P3 blocks generated (4 REPLACE) and dry-run on a copy of the live V01 (below)
# - [x] P4 report, result saved, LANDED
#
# DISPOSITIONS — Part H · V01: 1 issue, VF7-RDR-09 (minor, FIX), FIXED in the text in adjudication-r7v V1-1's words
# (which join the finding's (a) and (b) for §3.17.3 (6) as one text). No VALID CHOICE, MERGED or INVALID issue is routed
# to V01; no END line from another unit. Nothing goes to a fix list.
#
# ISSUE → WHERE FIXED (VF7-RDR-09; each "old → new" as V1-1 words it, every other word standing)
#  (a)+(b) §3.17.3 (6): "A raised way meets a wall by §2.7's crossing table, never with a gate or an opening: an
#        aqueduct's arch over a curtain and a deck over a wall laid after it give no gate portal, no `gate` rank or kind
#        factor, no gate plaza, no wall-side feature and no S9b square." → "A raised way meets a wall by §2.7's laws (its
#        worked example the crossing table), never with a gate or an opening (§2.7's laws, law 1 (1), (2)): an aqueduct
#        crossing a curtain, over it on an arch or merged into it, and a deck over a wall laid after it give no gate
#        portal, no `gate` rank or kind factor, no gate plaza, no wall-side feature and no S9b square — a gate standing
#        beneath an aqueduct's arch that clears it (law 1 (5)) being a part-0 gate as any, with its portal, rank and
#        plaza." Its bold head stands.
#  (a)   §3.6 (5), the gate approach: "An aqueduct's arch over a curtain wall is no gate: no gate portal, no gate plaza
#        and no wall-side feature reads it (V01 §3.17.3 (6))." → "An aqueduct's arch over or in a curtain wall is no gate:
#        no gate portal, no gate plaza and no wall-side feature reads the arch (V01 §3.17.3 (6)); a gate standing beneath
#        it is a gate as any (§2.7's laws, law 1 (5))."
#  (b)   §3.4.2 (a) *Portals and anchors*: "no gate stands on a deck, §2.7's crossing table)" → "no gate stands on a
#        deck, §2.7's laws, law 1 (1))".
#  (b)   §3.17.3 (2), the strip: "(§2.7's crossing table, *beneath*)" → "(§2.7's laws, law 1 (7), (8); its worked
#        example *beneath*)".
#  (c)   §1.2's hook row "V11's item-110 rows": "`raisedWays.structure` (`clearanceCm`, `clearWidthM`, `squareDeg`)" →
#        "`raisedWays.structure` (`clearanceCm`, `stripMarginM`, `clearWidthM`, `squareDeg`)"; its third cell
#        "crossings under arches by §4.3's crossing rule (V01 §3.17.3)," → "crossings under arches by §4.3's crossing
#        rule (V01 §3.17.3), the under-deck strip (V01 §3.17.3 (2)),".
#  Checked against the laws' home (base §2.7, LAW 1): (1) no gate on a deck, a deck over a wall no crossing of the gate
#  law; (2) an aqueduct's two forms by its level, the merged arch no gate; (5) a gate's footprint admitted only under an
#  over crossing whose every span clears the wall's top; (7) a run capped beneath a road deck's span; (8) a `vault` span
#  read `open` while anything lies across its strip — each citation names the clause that holds what its sentence says.
#  The gate so admitted is part 0 and is ranked by §3.4.2 (a)'s portal rule (+ 2) and read by §2.3's parts table's
#  "part-0 gates" row and §3.6 (5)'s gate plaza, so the three V01 readers now agree with law 1 (5) (J149).
#
# CHANGES NAMED UNDER PART H'S HEAD (J146 citing form; "one rule for the rest", J148/J149). Every citation written here is
# V1-1's exact words, already in the citing form (the laws by number, the table or *beneath* as worked example); none
# needed a further change. No new text reads an aqueduct's crossing "over or merged" as a choice: (6) names both forms as
# cases, each giving no gate, and (5)'s "over or in" names the same two forms of the arch, each no gate; no gate, postern,
# tower or fixed place moved, no aqueduct support kept off a band, no run capped beneath an aqueduct.
#
# THE SWEEP (R7-01 (2): every restatement in V01 of a text this repair changes, searched in prose, tables, edge rows,
# tests, decisions and index rows) — "crossing table", "way-and-channel", *beneath*, "no gate", "is no gate", "gate
# portal", "gate plaza", "S9b square", aqueduct, "arch over", "over a curtain", "over a wall", "merged", "clears it",
# "part-0 gate", `raisedWays.structure`, `stripMarginM`, `clearanceCm`, "under-deck strip". Conformed: the five sites
# above (after the repair V01 holds no bare "crossing table" citation). Searched and standing, each with its reason:
#  * §3.17.3 (3) "(*Lattice and costs*; §2.7's way-and-channel table, row a)" — the ground way's crossing of a strip by
#    §4.3's crossing rule, not a meeting of a wall-like structure and a raised way (the citing rule's scope); the base's
#    own §4.3 cites the row in the same words (ARCHITECTURE.md l. 6394), and neither the finding nor V1-1 names it.
#  * §1.2's span-rule row ("a `vault` span read as §2.7's laws read it, law 1 (8); its worked example *beneath*"),
#    §3.17.3 (2)'s first citation and (3)'s, T-V1-51 (c) — already in the citing form (round 7).
#  * §2.3's parts table, the portals row ("part-0 gates"; a raised road's ends ordinary junctions; an aqueduct never a
#    portal) — agrees with law 1 (1), (5): a gate beneath a clearing arch is a part-0 gate there.
#  * §3.14's constants line — already names `stripMarginM` among `raisedWays.structure`'s cells; the hook row now agrees.
#  * §1b's under-deck strip row, T-V1-51 (a)–(g), §3.18's moat and deck-plot rows (a moat bridge's gate, outside the
#    raised way × wall family), J-V1.65, §0's plain words (l. 70–78) — none restates a gate, arch or crossing rule
#    of the family.
#  No other hit.
#
# OWNER RULES. J144, J146 – J151 bind: nothing written here reads a lock, a re-grade or a repair (J150's round-8
# hand-offs get no text); no program reading is marked the owner's. Items 114–126: untouched.
#
# HAND-OFFS: none. Both ends hold: base §2.7's LAW 1 (1), (2), (5), (7), (8) stand at their home as cited; V11's
# `raisedWays.structure` rows already name V01 §3.17.3 (2) as `stripMarginM`'s reader (V11 W50, row 80), which the hook
# row now names from V01's side.
#
# CHECKS. Dry run on a copy of the live V01 (apply-blocks.py, the FILE line left out as assemble routes it, a throwaway
# rationale): 4 blocks found, 4 applied, 0 skipped; audit not-OK 0; headings 123 → 123; fences balanced (12 → 12); title
# block unchanged; PENDING FABLE REVIEW lines 1 → 1; 528 635 → 529 041 bytes, 3 756 → 3 759 lines; the diff touches
# exactly live lines 201, 978, 1423–1424, 2468–2470 and 2481–2483. No other round-7v repair file writes V01 (searched).
# docs/validation/bench/doc_checks.py (--heads docs/ARCHITECTURE.md) on the copy before and the output after: identical
# but for two S2 line numbers shifted — C1 0 / C2 0 / C3 407 (352 unreviewed) / C4 2 (0) / S1 0 / S2 286 (3 unreviewed);
# no hit added (the three S2 hits pre-exist, outside the blocks). WARNING "reference corpus INCOMPLETE (missing:
# captures, research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room results are NOT
# authoritative": the result is provisional (orchestration note).
#
# WORDS (principle (9)'s shrink report). V01 85 115 → 85 192 words (+77, +0.09 %). Removed: restatement 0, narration 0,
# duplicated mechanisms 0, verbose prose 0. Added: the ruled law citations and J149's gate beneath a clearing arch at
# (6) and (5), and the hook row's `stripMarginM` with its reader. The unit grows because this pass's V01 work is one
# minor's five ruled texts, each an addition of content the finding requires; irreducible here.

=== FILE docs/volumes/V01-neighbourhoods.md ===

=== REPLACE ### 1.2 The base hooks this volume consumes ===
### 1.2 The base hooks this volume consumes

Each row names the hook's home and what this volume does with it; the hook's content is stated at its home.

| hook (home) | what this volume consumes | how this volume uses it |
|---|---|---|
| II.1 | `Seam`, `SeamEdge`, `Portal`, `SeamAmendment`, `SeamContract`, `NeighbourhoodRequest` / `Result` (item 539), `SeamReport`, rules (1)–(6), the neighbour step, `Sample` (declared beside `Seam`, item 540) | template portals and radial ends are II.1 (3) amendments (V01 §3.11); the request and result as V01 §2.4 reads them |
| II.2 | the template rows, `RingFabric`'s ring courses (item 58 (a)), template road widths | the template face, the seed primitives, the other templates and every ladder (V01 §3.4) |
| II.3 | the dispatch idea, the pin gate with weight decay (item 58 (c)), local identities, compounds | S9b (V01 §3.5), the hood pins (V01 §3.8.2), local places (V01 §3.7) |
| II.4 | persistence (LC-18, J-P23), the workflow, elaboration by click (item 28) | V01 §3.8, V01 §3.9, V01 §4 |
| II.5 | stage-2 readiness and the M5 exit | V01 §7's tests extend them |
| II.6 | the sky call, `SkyStrategy`, `IslandRule` | the unit run lays each island's districts (V01 §3.10.3); volume 5 owns placement and supply |
| §2.4, §2.5, §2.7 | `Way` (`surface`, `slopeP95`), `District` (`fabric`, `fabricParams`, `identity`, `terrace`), `Block` (`content`, `squareType`, `ringCentre`, `voidCorner`, `overrides`), `Plot`, `Allocation`, `Pin`, `Greenery`, `HoodPlace`, `RetainingWall`, a way's `raised` record, deck plots; the types `FabricStrategyId`, `TypedBoundary`, `BlockKind`, `SquareType` (§2.5, item 505) | written and read as V01 §2.7's lifecycle rows state |
| §2.8, §2.9 | the elaboration record's `closeup` rung, the elaboration cache, the `closeups` digest block, `Recipe.product` / `hood` | the close-up's record and cache (V01 §2.5, V01 §3.8); `HoodRecipe`'s rules (V01 §3.10.1) |
| §4.1 | the stage graph, the laziness contract, the pool and the hinterland unit, elaboration by click | S7c and S9b placed in it; the unit run a unit of its kind (V01 §3.1) |
| §4.2 S1 (2), S1 (5), S2; §4.8's bridge rule | the closed-outline routine and outline templates; crossing sites, spans and the bridge build (`deckCm`, `kind`, `piers`); the programme's land estimate | the standalone outline rows (V01 §3.10.2); the island crossing sites (V01 §3.10.3 (4)); the square and green land (V01 §3.5.9) |
| §4.5 | the grower, typing, fields, `FieldBands`, S7b, item 72's character, identities, the band range | χ̃ = §4.5 (2)'s function over allocation rows (V01 §3.2); S7b's capacity less the dispatch land (V01 §3.5.9) |
| §4.6 | the bent cut (steps 1–11), holed laws, the slit, the portal gap, the ladder, the strategy slot | every template calls it on its remainder; its holed laws cut ring bands (V01 §3.4) |
| §4.7 | S9, S10a, S10 (0)–(10), S10b, S11, the levelling and its district-edge source, the deck row | S10a reads `Block.content`; S10 (7) joins a manor block; S11 places square centrepieces (V01 §3.5.10); V01 §3.17 |
| §4.9 | the greenery rule table, S12b | the court-greening and green-block rows (V01 §3.5.7) |
| §4.12 | `StrategyRegistry`, the hook points `S7b.afterGreedy` and `S10a.afterDrivers` | S7c and S9b registered by `@plat/hood` (V01 §3.1) |
| §6.1, §6.3 | streams, concerns, lineage, the anchor rule, successions, the stage id `S8.seed` | three concerns (V01 §3.12); successions in `SeamReport.superseded` |
| §7.1–§7.4, §7.6, §7.7 | the events, the tool binding, the dry run and its bends, locality, the lifecycle table, editable tables, the parity presets, the derivation rows | no new event kind; T1, T6, T8 and T12 gain one parameter each (V01 §4); `NG` joins the parity presets (V01 §3.15); DR26 (V01 §1b) |
| §8.1–§8.6, §8.10 | the display list, the `hatched` family, programs, states, crowns, the neighbourhood band | the `hatched` family at all four bands (V01 §5.1) |
| §9 | label entities, the knowledge admission, spines, floors, the title rule | place labels, the hood title, local names (V01 §5.2) |
| §10.4 | the naming engine | the way-naming context and place names (V01 §3.7) |
| §11.1 | formats; SVG at the neighbourhood band for a district scope; VTT scope a district | per-format stage-2 content (V01 §5.3) |
| §12.4–§12.6, §12.8 | the CITY split, the neighbourhood-band open bound, the scoped regeneration law, the elaboration cache | the stage-2 budget split (V01 §6) |
| §13.5, §13.6 (2), §13.7 | NG baselines, the NG panel, the S4 (d) band, S3's seam band | V01 §7's bars |
| §14 | `@plat/hood`, `FabricStrategy`, `StrategyRegistry` | the package's contents (V01 §8.3) |
| §15.2 | stage-2 letters S1–S6 | each tested in V01 §7 (S4 (e), (f): T-V1-48, T-V1-49) |
| §16 M5 | the milestone | V01 §8 |
| g item 102 (a)–(d) | `shade(x)` from terrain and walls (field pass 1) and island strips (pass 2); the sunlit-side preference | `DistrictContext.shade`, S7c's `shade` term, S9b's manor sun factor, the close-up's fountain and bandstand gates (V01 §3.3.3, V01 §3.5.5, V01 §3.8.2); on a sky arena volume 5's `shadeSky` (V05 §3.11 (4); J-V1.87) |
| g item 103 (a), (f); V11 §2.3–§2.4 | `SitingProfile` (emits, sensitive, coverage), `RelationFamilyRow`, `CoverageSpec.unit` | the catchment unit and `catchmentOf` (J-V1.35; V01 §3.16); the dispatch's EMITS / SENSITIVE-TO pushes (V01 §3.5.4, V01 §3.5.5) |
| g items 104 (b), (h) (3) as revised by 107 (e); 105 (a), (g), (i) | active chains (dossier and custom), S7b (1)'s district supply term, allocation-level links | χ̃ (5)'s `c`, `DistrictContext.chains`, S7c's `chain` term; never a quarter assigned (V01 §3.2, V01 §3.3.3) |
| g item 108 (a)–(c) | the ladder table's step types; QUARTER, GUILD and SIZE records with members `#k` | the identity, the forecourt landmark, the dispatch's fixed inputs, the panel's members (V01 §3.5.12, V01 §4.5) |
| g item 106 (a)–(c) | `Enceinte.closure` `barrier`, the defensibility classes, the `ChainProfile` stretch, intramural gardens | seam typing of barrier arcs (II.1, item 541), `wallShare` and `noIntervallum` over walled stretches only, gardens excluded (V01 §2.3, V01 §3.6) |
| g item 109 (e), (g), (j) (3), (k) (2)–(5); II.7.4–II.7.6; V04 §3.1, V04 §3.3 (P7, `forecastSafety`), V04 §3.4 (F6), V04 §3.5.1, V04 §3.6a (`underDistance`), V04 §3.7a (T8), V04 §3.10, V04 §4.3 | `AccessPoint` (the kinds item 554 adds; `source`, `role`, `cause.system`), `UndergroundSystem.sources`, the catacomb's ratchet and stagnation, undercity neighbourhoods, `Features.sewers`, the undercity circumstance, the below-TOWN set, the ground-edit row, P7's void-dwelling forecast | openings and catacomb entrances as places and symbols; the fixed-input set, `blockLifted`, the undercity's parent (II.7.5 (2) through `districtsAbove`), `under[]`, `fabricSignature`, `catchmentOf` underground, the standalone document's layers, a replace close-up's cross-arena scope, the hood's void part (V01 §3.7.1, V01 §3.8.8, V01 §3.9, V01 §3.10.1, V01 §3.16) |
| V05 §2.3, V05 §2.3a, V05 §2.4, V05 §3.2, V05 §3.5 (3), V05 §3.8 (4), V05 §3.12, V05 §3.15 (5), V05 §4.2, V05 §4.3; item 280's sky stage | `SkyUnitInput` (the island's unit inputs: land, rim strip, claims, landings, field, district kind, fabric hint), `IslandShadeStrip`, the `sky-*` kinds, the islands gate, an island as one walk unit, the unit run's contract (`plantRimWalk`, the district ids, `portalsTotal` 0, the river's crossing sites), `raiseIsland`, New random on an island, the resize and the rim reshape, the island re-read of a ground edit, a ground landing's S8 destination | the sky unit run (V01 §3.10.3); S7c's κ (V01 §3.3.3); the strips read by S9b and the close-up (V01 §3.5.5); `catchmentOf` on a sky arena (V01 §3.16); the destination lane (V01 §3.4.2 (a)) |
| V06 §2.1 | `EpochParticipant` | `hood.fabric` at `afterGrowth` (V01 §3.3.6, V01 §3.5.11) |
| §11.2 | `WhyAnswer` (`drifted`, `members`, `closure`), `WhyPull` with V11's families | V01's providers (V01 §4.5) |
| V10 §2.13 | `WhyProvider` | V01's providers (V01 §4.5) |
| V11 §2.3 (`naming.district`, `naming.way`, `naming.place`) | the grammar slices | the features V01 derives for them (V01 §3.7) |
| g item 110 (a)–(e); items 244, 245, 246, 260, 290, 302 | `RetainingWall` and S10–S11's levelling with its district-edge source; raised ways with their generator, supports, spans and suppression; deck plots with the `deck` row; stepped tiers; the second known-city fixture | the terrace state and the contour series (V01 §3.17.1, V01 §3.4.3); held walls, strips, crossings, the parts each reader reads, their land and removal (V01 §3.17.2–V01 §3.17.5, V01 §2.3); deck ownership (V01 §3.17.6); stack order and tier shadows (V01 §5.1.3); T-V1-50–T-V1-54 |
| V11's item-110 rows | `terrace` (`slopeMin`, `stepMinCm`), the relief rows' `terracedEdges`, `ways.crossing` (`rampMaxGrade`, `stair`), `raisedWays.structure` (`clearanceCm`, `stripMarginM`, `clearWidthM`, `squareDeg`), `aqueduct.terminal` | `terraceState` (V01 §2.3), the stair-stepped way (V01 §3.6 (3)), crossings under arches by §4.3's crossing rule (V01 §3.17.3), the under-deck strip (V01 §3.17.3 (2)), the terminal (V01 §3.17.8) |
| V02 §2.1, V02 §2.6, V02 §3.7, V02 §3.11, V02 §3.15–V02 §3.17, V02 §5.2–§5.3 | the wings' canonical order by key, `BaseWing.on` and `solid`, each wing's `RoofSpec.kind`, the `stairFlight` program and `stairTreads(w)`, `DeckContext` (item 305), `PorchKindRow` and the secondary porch, the `wings` rung's triggers, `roofscape` facets and the `roofConstruction` switch, `MassingRef.family` `ovalCourt` | stack ties, tier shadows, the ridgeless hatch and the treads (V01 §5.1.2–V01 §5.1.3); deck buildings in the owner's close-up (V01 §3.17.6); the entrance reserve (V01 §3.8.2 step 5); the outline close-up's trigger (V01 §3.8.1); the arena floor's exclusion (V01 §3.8.2 step 1) |
| V03 §3.3, V03 §3.7.1–V03 §3.7.3, V03 §5.1, V03 §5.4, O1 (e), J-V3.73 | the access head at the building band, the ground predicate `ground(b)`, `stackAccessDoor(b, a)`, `basementDoor(b)` (both over V03 §3.7.1's one door helper), the stoop, the church class | one mark per access (V01 §3.8.8); the entrance reserve (V01 §3.8.2 step 5); the church class in V01 §3.7.1 |
| V07 (item 506) | `FabricStrategy.levelledUnits`, `terracedEdges` | `TemplateFabric` returns the bent cut's levelled units and declares terraced edges (V01 §3.17.1 (4)) |
| §2.7's span rule (item 244; a `vault` span read as §2.7's laws read it, law 1 (8); its worked example *beneath*) | a raised part's spans with their `use` (`open`, `vault`) | crossings through `open` spans only (V01 §3.17.3) |
| V05 §3.22; V06 §3.19 | the island's walls and raised-way rules; raised ways, walls and decks over epochs; V06 §3.19 (7)'s clearing under a new strip | V01 §3.17.7; V01 §3.17.4's epoch clause and V01 §3.3.6 (3) |
| V12 §3.4, V12 §3.6b | the metrics `block.area`, `grid.r4`, `grid.axis`; the `paired` margins | `fabricSignature(region)` returns the town side (V01 §3.16); T-V1-46 |
| items 447, 448 (§11.1); J-VI.3 | item 110's GeoJSON names and the VTT rule; the six closure barrier kinds | V01 §5.3; II.1's seam typing (item 541) |
| g item 119 (a)–(f) (J130); §12.1 (the targets and the comfort level), §12.6, §12.7, §12.10; V11 §3.25.8; V09 §4.21.9 | the targets; the ten-second comfort level for one-time waits; the measured-gain rule and its `perf.qualitySpend` rows; the progress rule and the progress view; the interaction budgets kept | V01 §6's lines kept as the targets, stage 2's one-time waits held to the comfort level, its interactive lines unchanged (J-V1.103); T-V1-29's one-time-wait clause |
| g item 120 (a)–(k) (J133); §2.9's view key `find`, §8.2's Find rows, §11.1, §11.2's gazetteer match listing (with its *At a drawn week*) and admission, §12.5's overlay budget; §2.9's `week` and V06 §3.15.2's frame; V09's Find panel and `live.find` overlay; V10 §2.13's `FindAnswer`; V11's lexicon (labels, synonyms, groups) | the per-viewer chips and the Show gaps switch; the veil, halo, outline, pin and count-bubble rows; each chip's matches at the view's effective key and drawn week; the model the view draws (the head, or the drawn week's frame) | the town's area targets and Show gaps' units (`findAreas`, `gapUnits`; V01 §5.4, V01 §3.16; J-V1.102); T-V1-59 |
| g item 122 (a)–(f), (i) (J135, J138); §2.7's `ConditionOverlay` and its reader rule, §2.9's `crises` key, §7.7's DR44, §10.2's `RosterTables.crisis` (the `disaster` row's `scale`, `previewSeverity`) and *Crisis looks* (d)–(h), §8.1's render tag `crisis.place`, §2.3's `Terrain` (`heightCm`, `wind`), §4.9's land use and rotation, §11.2's admission; V08 §2.3's carried `condition` fact — its `calamity` field (V08 §3.16 (7) (d)) — and the carried `calamity` fact that field names, read as §4.11's `CalamityRef` (V08 §3.6 (3)); V06 §2.4's calamity table; V06 §3.15.2's history frame at a scrubbed week; V07 §5.6 (2)–(3)'s village readings (`villageDisasterUnits`, `villageUnitPlots`); V02 §5.7 | the standing overlays a look draws and a preview; the calamity each condition links, as the port carries it; the look rows and the placement that reads the outskirts | `disasterSource`, `disasterDistricts` and `campLand` (V01 §3.16); a disaster look's framed place in Find (V01 §5.4 (6)); T-V1-60 |
=== END ===

=== REPLACE #### 3.4.2 What every seed primitive shares ===
#### 3.4.2 What every seed primitive shares

**(a) Portals and anchors.** A portal is **usable** when its vertex lies on a chain bounding the template face and its
class is `lane` or above. Its **rank**: `through` 5, `primary` 4, `secondary` and `quay` 3, `lane` 2, others 1; a gate
portal + 2; a bridge portal + 1 — gates and bridges read on part 0 by V01 §2.3's parts table: a part-0 gate (every gate
is one: no gate stands on a deck, §2.7's laws, law 1 (1)) and a part-0 deck over water; a raised road's ramp or stair end
is an ordinary junction ranked by its carried class, and an aqueduct end is never a portal. **A landing's attach
vertex** — a sky island's (V01 §3.10.3) or a ground landing's S8 destination (§4.6: a `landing` reservation's attach
that no way meets when S8 starts) — ranks as a gate portal (+ 2 on `lane`) and must be reached by a seed or a lane; **on
the ground its destination lane** (§4.6's first cut, from the attach to the nearest way by the lane rule) **is laid before
the seeds**, first in D's S8 transaction, so no seed can pre-empt it, and the seeds then treat it as any spine
(V01 §3.4.2 (c)). Anchors resolve to points: `portal:best` — the pair (a, b) maximising
`(rank_a + rank_b) × min(1, |ab| ÷ (anchor.spanShare × faceObb.majorM))`, ties by portal id; `pair:1`, `pair:2` — the two
usable portal pairs whose chords cross inside the template face at ≥ `elig.crossAngleDeg`, maximising the two pairs'
summed ranks, `pair:1` the higher-ranked, ties by portal ids (the crossroads row's two cross spines); `portal:gate` /
`portal:bridge` — the highest-ranked gate / bridge portal; `axis` — the template face's OBB major axis's two ends projected
onto its boundary (virtual anchors; used when fewer usable portals exist than a spine needs, and in a standalone unit run,
which has none).

**(b) The template street width** `w_tpl`, one per district, drawn once on `hood.template` (creation index 0):
`w_tpl = lerp(tpl.widthLow × top, top, u)` with `top` the upper end of the `secondary` class's width band (§4.6 step 9's
class table), so every draw lands inside the band and none is pinned to its top. It is the row's `streetWidthM`
parameter: the draw is its default, the `secondary` band its range, so T8's "more" edits it like any fabric parameter.
Every seed way (spine, ring course, through street, `secondary` fan) takes `w_tpl` and class `secondary`; a `path` fan
(the `park` row) takes the `path` class's width; NG 1.2.2 likewise gives its template streets one per-map width (II.2,
COV-NG-N20), ours in metres. Lanes the bent cut adds keep §4.6 step 9's law.

**(c) Insertion.** Seeds are inserted in the district's S8 transaction (callback form, L1, §4.1) in row order, each by
`insertChain` of its course clipped to the template face's kerb (§3.7's single kerb function); each end that meets a
spine becomes a T-junction by `splitThrough` (§4.6 step 7) — on a district-boundary spine a `baseLane` portal with its
`SeamAmendment` and the portal-gap slide (§4.6 step 7, II.1 (3)); an end at a hard seam or at a unit's border stops on
the setback or margin line, square to it, as a lane ends at a reservation. A later seed may end on an earlier one.

**(d) Validation**, per seed, on the overlay before its commit: every segment ≥ `minEdge`; every interior turn ≤ 60°;
clearance from the face boundary ≥ `eLo / 2` except within `eLo` of its ends; no crossing of another seed except at a
row's declared crossing or a plaza ring; no contact with a hole (§3.6's contact rule, `attractCm`) except a strip crossed
through an `open` span by V01 §3.17.3 (3); no run within `eLo / 2` of a held retaining wall along more than `eLo` of its
length (a crossing at ≥ 45° is allowed and takes a stair or ramp interval, V01 §3.17.2); every face the seed creates ≥
the band's minimum block width (§4.6 step 8's child test). A failure is F-TEMPLATE's (V01 §3.13); a degenerate course
(zero length after the clip, self-touching, collinear with the kerb) is one such failure, refused by the kernel (§3.1)
before the check.

**(e) The rest.** After the seeds, §4.6 runs on every face of D exactly as on a bent-cut district: stop test, position,
start, corner, far side, flatten, fillet, ends, ladder, width, continuation, recursion; a face with holes by the holed
laws; the deep-interior rule on the resulting blocks. The seeds are spines like any: the bent cut's lanes end on them as
T-junctions, so plots front the seed streets (NG's "plots directly on the main street").

**(f) Draws.** Every seed draw is on `hood.template` keyed by the template face's cell with the seed's creation index
(V01 §2.8) — except the ring courses, which §6.1 already puts on `cut.arc` (II.2) — so each seed has its own sub-stream
and a turned or redrawn seed disturbs no other.
=== END ===

=== REPLACE ### 3.6 Context features (stage-2 feature S2) ===
### 3.6 Context features (stage-2 feature S2)

Every district gets the feature its context calls for, whatever its fabric; S2 (a)'s coverage matrix (V01 §7) reads
them. The features run in S8's district batch (§4.6's strategy slot, item 298).
1. **Waterfront** (a `water` seam run ≥ `feature.runM`). S8 lays a **bank path** — a `path`-class spine along the shore
   setback's inner line (a parallel spine at `onEdge` with the path's own width, V01 §3.4.3) — when D's kind is `docks`
   or `riverbank` or its band is ≥ `comfortable`, and no noxious water trade (a class whose profile emits water
   pollution, V11 §2.3) is allocated to D, and no quay way already runs along that run; otherwise the **rear-plot water
   rule** holds: plots whose rear line lies within `dBar` of the shore setback extend their rear to it and take a `shore`
   yard part (§4.7 S10 (6)) with the water access edge (realism: working riverbanks keep their plots to the water;
   promenades belong to richer and harbour quarters). A `quay` template's spine satisfies the feature on its run. A
   closure-only water arc (item 106 (a): deep water closing the circuit, no wall) is a `water` run like any.
2. **Wall-side** (a **walled** `wall` run ≥ `feature.runM`: a `full` or `parapet` stretch of the `ChainProfile`, item 106
   (c)). The intervallum where the era row has one and the stretch is `full` (§4.8); otherwise — a `parapet` stretch, or
   an era without intervallum — the base's own rear-plot behaviour: S8's lanes end on the inner setback line, so the
   plots back onto the wall strip — the rear-plot rule S2 (a) counts. A `wallside` template adds the wall street.
3. **Slope.** A `lane`, `alley`, `cul_de_sac` or `path` whose `slopeP95` (§2.4: the unlevelled terrain along its spine,
   never rewritten by S10–S11's levelling, re-sampled by a terrain stroke) exceeds its class's `rampMaxGrade` in volume
   11's `ways.crossing` row (item 110 (a)'s way-class rule: the grade above which a way of that class is a stair rather
   than a ramp) is a **stair-stepped way** — one threshold, stated once (J-V1.72): S14 draws it with step ticks at the
   district band and finer (V01 §5.1.2); the naming context reads its shape `stepped` (V01 §3.7.2). No model field: a
   pure function of the way's slope. A stair-stepped lane may also be carried on vaults beneath (II.7.6's `vaultSlope`
   source, the base's and volume 4's); this volume neither draws nor reads that. A way crossing a `RetainingWall` carries
   a stair or ramp **interval** at the crossing (the base's way-class rule, an attribute of the way, item 110 (a)): it
   never changes the way's `shape`, `slopeP95` or name, and S14 draws it by `way.stair` (V01 §5.1.2).
4. **Bridge approach.** The portal gap (§4.6 step 7) keeps lanes off a bridge end; S9b's `bridgehead` squares and the
   `bridgehead` template read it — a part-0 deck over water (V01 §2.3's parts table). A raised road's ramp or stair end
   takes the portal gap extended over its rise (V01 §3.17.3 (4)).
5. **Gate approach.** The base's gate plaza (§4.8); nothing added. An aqueduct's arch over or in a curtain wall is no
   gate: no gate portal, no gate plaza and no wall-side feature reads the arch (V01 §3.17.3 (6)); a gate standing
   beneath it is a gate as any (§2.7's laws, law 1 (5)).
6. **Sky.** No portals but the landings' attach vertices; the outline's seams are `sky` (hard); the rim strip (volume 5)
   lies along them, and a margin band only where a run has no rim strip (V01 §3.10.3).
7. **Barrier edges** (item 106 (a), (f)). A boundary run on a barrier-closure arc is typed by its barrier kind by II.1's
   seam typing (item 541; J-VI.3's six kinds): an `enceinte` arc — an earlier ring's curtain closing a later circuit — is
   a walled run whose stretch class is that enceinte's, which (2) reads like any. A `cliff` or `marsh` run takes the
   rear-plot rule — the plots back onto its setback line as onto a wall strip — and never a wall street; the panel names
   it ("the cliff is the wall here", the clerk's line, item 106 (g)). The two edges of §4.6 S8's cliff band inside a
   district — an S1 `cliff` feature or ground over `walls.barriers`' `cliff` threshold (V11 §3.16.1), widened by
   `shoreSetback`'s `cliff` distance — read the same way: a hard `cliff` run, portal-free, the rear-plot rule (the plots
   on each side back onto the band), never a wall street; no seed, fan or lane of a fabric lies in or crosses the band
   (§4.6), which is a hole in the template face (V01 §3.4.1).
8. **Terraced wards** (item 110 (a)). A district whose `terrace.asks` holds (V01 §2.3) is terraced. Inside it the base's
   S10 and S11 levelling levels each plot to its fronting street, so wherever the contour series or the bent cut's lanes
   run along the contour, each block's two plot rows meet at a rear line that a **base-produced** wall holds once the step
   passes `terrace.stepMinCm` and the slope `terrace.slopeMin` (V11's `terrace` row) — **this volume produces no wall
   there** (one producer per wall line; J-V1.61). Where `slope.meanPct` lies at or above the `stepped` row's
   `slopeMeanPct` cell (V01 §3.3.3) and below 100 × `terrace.slopeMin`, the `stepped` row lays its contour streets, the
   ward takes no edge wall (`walls` is false) and the base walls only those of its levelled units steeper than
   `terrace.slopeMin`: terraced streets standing mostly without retaining walls. Along D's edge the base's district-edge
   source raises the ward-edge wall by its rule (§4.7 S10, item 302); this volume supplies its inputs (`terraceState(D)`,
   `TemplateFabric`'s `terracedEdges`, V01 §3.17.1 (4)). S2 (a)'s coverage matrix gains the row "terraced district × a
   ward-edge wall, or none with its reason (below the slope threshold, no soft backing run, no step)".

A district with no water, wall, slope, bridge or gate run takes none of (1)–(5) and reports nothing; S2 (a)'s matrix
counts only the districts a context applies to.
=== END ===

=== REPLACE #### 3.17.3 Raised ways in the close-up (J-V1.65) ===
#### 3.17.3 Raised ways in the close-up (J-V1.65)

1. **Committed inputs.** A raised part — item 110 (b)'s viaduct, elevated road or aqueduct on a ground part ≥ 1 —
   generated or declared, is committed before S7b (1) (item 290) and is an input of every stage-2 step. This volume never
   creates, moves or removes one: the generator's reason, chance, cap and rung bars are the base's and volume 11's rows'
   (item 110 (f)); this volume owns the bars inside a close-up (T-V1-51). Its piers are those item 244's support step
   lays, which this volume's crossings and under-deck strip read (J-VI.27).
2. **The under-deck strip.** The part's ground projection — its piers and spans over the deck's width plus
   `raisedWays.structure.stripMarginM` (V11 §3.24.2) each side, §4.6 S8's one strip — is a **hole** in the faces it
   crosses, as an S7b claim is (V01 §3.4.1): where it crosses a face from boundary to boundary it cuts it; no plot, block
   interior, seed or hood pin lies in it; the base's arch vaults (II.7.6; volume 4's `vault` spans) fill it where they
   exist — none in a span §2.7's laws read `open` (law 1 (8); its worked example *beneath*) — and an `open` span stays
   open ground, a way passing under it, bare ground or a wall's run beneath it (§2.7's laws, law 1 (7), (8); its
   worked example *beneath*) (item 110 (b): "the spaces between piers stay open or hold the base's vaults").
   `DistrictContext.areaM2` and the pre-claim template face exclude it.
3. **Crossing under an arch.** A part-0 way this volume lays (a seed, a fan, a bent-cut lane) crosses a strip only
   where §4.3's crossing rule admits it (*Lattice and costs*; §2.7's way-and-channel table, row a), a `vault` span
   read as §2.7's laws read it (law 1 (8); its worked example *beneath*). A seed that would cross elsewhere takes F-TEMPLATE
   rung 1 (redraw), then rung 2 (its crossing shifted along the strip to the nearest qualifying span); a bent-cut lane
   takes §4.6's ladder and, finding no span, ends at the strip's edge as at a reservation.
4. **Ends.** Each ramp or stair end is a ground vertex on part 0 (item 110 (b)); V01 §3.6 (4)'s portal gap applies to it
   as to a bridge end and extends over the ramp's or stair's rise, so no lane joins it mid-rise; it is an ordinary
   junction of its carried class (V01 §2.3's parts table).
5. **Pins.** V01 §3.8.2 step 5's clearance holds every pier footprint and the whole strip: no hood pin stands under a
   deck.
6. **A raised way over a wall is no gate.** A raised way meets a wall by §2.7's laws (its worked example the crossing
   table), never with a gate or an opening (§2.7's laws, law 1 (1), (2)): an aqueduct crossing a curtain, over it on an
   arch or merged into it, and a deck over a wall laid after it give no gate portal, no `gate` rank or kind factor, no
   gate plaza, no wall-side feature and no S9b square — a gate standing beneath an aqueduct's arch that clears it
   (law 1 (5)) being a part-0 gate as any, with its portal, rank and plaza.
7. **Boundaries.** A raised part never bounds a district (V01 §3.11 (8)).

A raised part whose strip lies wholly on hinterland land-use faces crosses no district: stage 2 reads nothing of it (the
span stays open by J-C4's rule). A strip that covers a district's whole template face leaves D with no template face
(V01 §3.3.2).
=== END ===

