# coherence/canon: the canon's hand-written data — set-level home rules, g-item parts per unit, the round-6 seam opens and
# INDEX §7's fix list, the owner questions answered under J121/J122, the canon's own decisions, cohesion checks, shrink data.
UNITS = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope'] + ['V%02d' % i for i in range(1, 13)]
SEC_UNIT = "§0–§1, §13–§17, the summary, D-rows, the Judgment-calls index, Staged list, Appendix A → scope; §2 → model; §3 → kernel; §4, §10, PART II (II.1–II.7), PART III → pipeline; §5–§7 → determinism; §8, §9, §11, §12 → rendering"

HOME_RULES = [
 ('S1 base or volume', "The base owns every mechanism shared by more than one stage and everything the base builds (its milestones M-1 to M4b and M5's base rows); a volume owns what only its stage builds. A base change a volume requested (file f) or an owner item (file g) puts the fact in the base section the item names; the volume then cites it and its §10 request becomes a one-line pointer to the applied item."),
 ('S2 values', "Volume 11 owns every content-table value (file f rule R-c): where another unit restates a V11 cell, it cites the cell (table, row, column) and states no number; the base's own settings values that the base calls table values are V11 registry rows too (W-SET-01)."),
 ('S3 records', "A record type lives in §2 (R1 of the earlier canon) when the base declares or reads it; a staged record the base carries as a hook is declared in §2.7 by its f item and built by its volume. A type a base record uses is declared in the base (MC-11)."),
 ('S4 tests', "Base tests T⟨item⟩-⟨n⟩ live in §13 (R9); a volume's tests T-Vn-m live in its §7; a volume test re-running a base hook bar names the bar and says which clause it takes over (W-05, CO-06)."),
 ('S5 decisions', "Base J-rows: one index row in the base, the entry in the rationale file's Part A (R10); volume J-Vn.m rows in the volume's §9; J-VI rows stay in docs/volumes/_integrate.md and are cited, never restated; the canon's decisions J-C1–J-C4 enter the base index. A superseded or amended decision carries one mark (E-24)."),
 ('S6 owner rules', "The owner's words (docs/OWNER-INSTRUCTIONS-2026-09-25.md, the OWNER RULE items of the amendments files, docs/DEFINITION.md) are cited by item number; the program's interpretation of an owner item lives at the item's home section named by its HOMES line."),
 ('S7 citation form', "Base: bare '§x.y'. A volume: 'Vnn §x.y' everywhere, self-references included (G-cite). Volume-local row ids (W, X, H, FL, IN) are never cited bare outside their volume (ID-WX)."),
 ('S8 hosting and AI inputs', "J121: every design statement about hosting and origin, accounts, plans and save limits, backups, the preview host, the public name, the licence for users' maps, interface languages, the AI key or relay, the assistant and its model tier reads SettlementForge's decision as an input; the design keeps the mechanism (configuration fields, the locale files, the key card) and decides none of them."),
 ('S9 narration', "Round, lane and review narration, stacked banner lines, PROGRESS ledgers, reconciliation records, 'CONFIRMED versus PLAUSIBLE' round histories and integration notes leave the normative text (the validation records keep them); the base keeps one banner line under its title and each volume one marker line (principle (8)); an integration note's content is folded into the body at its home."),
]

# g items from 111 onward: parts per unit (new design at build depth); g102–110 are routed like f items
G_PARTS = {
 111: {
  'pipeline': "§4.2 S0 and S1: the oasis and spring features and the arid chances (an arid site keeps river, lake and coast at the arid row's chances and gains the oasis; likelier with no other water); §4.2 S3 and §4.4: the water pull on the growth field (travel-cost boundary and nucleus); §4.5: the prosperity water term and item 102's sunlight cell per climate row (zero or toward shade in hot arid rows); §4.7 S10b: wells and fountains weighted to high-yield ground, walking coverage tightened in arid rows; an oasis is water for every rule that reads water",
  'model': "WIRING CONSEQUENCE (not named by the item): §2.3 declares the spring and the oasis's records or fields S1 writes (a spring flag on a WaterBody or a Spring feature, the grove and irrigated gardens as LandUse and Greenery rows) with their lifecycle rows",
  'determinism': "§7.1: T2 `ground`'s lake point-and-level form with a spring flag (the oasis added or removed by hand), its §7.4 lifecycle row and undo; §7.7: a dossier's `oasis_water` makes an oasis exist (item 20) — its DR row cites DR1",
  'rendering': "WIRING CONSEQUENCE: the oasis's spring, grove and gardens draw with existing style rows or named new ones (§8.2), its label kind (§9.1) and its export (§11.1)",
  'scope': "§13.2: the bars of item 111 (d) — arid seeds' share of households within walking distance of water above the non-arid baseline; oases only on arid sites unless drawn or supplied; arid sites still draw rivers, lakes and coasts at the arid row's chances; the richest band's mean distance to water below the middle band's; with the oasis chance, the water pull and the climate cell neutral, byte-identical (a NoOpPin, E-20); §0.2's landing row",
  'V07': "the village crowding map's water pull and oasis villages",
  'V08': "the dossier's desert with or without `oasis_water`, and deserts with rivers, lakes or coasts (the port's mapping; E-31's failure condition reads it)",
  'V11': "the oasis chance, grove and garden rows, the water-pull weights and the sunlight cell per climate row",
  'V06': "failing springs and oases over epochs (the pull weakens, the quarters around may decline)",
  'V05': "an island's own water, unchanged: one sentence stating that item 111's oasis, water pull and climate cell do not apply on a sky island (its water stays V05's)",
  'V09': "the tool: T2 `ground`'s spring flag and the oasis in the ground tools, its message rows and binding row",
  'V10': "the explanations: why rows for the water pull and the oasis ('why is this quarter here / rich')",
  'V12': "the bars: register lines and the NoOpPin registration for item 111's cells",
 },
 112: {
  'rendering': "§8: every style family and thematic view that encodes meaning in colour (district tints, prosperity, ownership, knowledge, the underground's systems, water and ground classes) carries a second cue (pattern, line style, label or shape); each such style has checked variants for the three common colour deficiencies, selectable in the view settings; default styles keep their look, the second cues drawn at legend-bearing zoom stops and thematic views; §9: legends show the second cue",
  'scope': "§13: the style check (simulated-deficiency contrast between every pair of categories a legend distinguishes, against a table threshold) with its test id; the game-master trial (ten to twenty SettlementForge game masters, at least two sessions of play on their own settlements) as a release gate before the public release; its report must exist before release; participants thanked by credit and early access, no payments; §16's release gate row",
  'V09': "the view settings (the checked-variant selector) and the trial's running (recruitment through SettlementForge's community, the sessions, the report)",
  'V12': "the trial's record (its findings enter the calibration record and the fix list) and the style check's register line",
 },
 113: {
  'pipeline': "§4.2 S0: the history option (a standalone blueprint history such as 'once a city, now a village'); §4.11: history-first generation — the peak, the replay as coarse epochs (decades by default, a table value) from the founding or peak to the present meeting the dossier's present facts exactly, destruction and refounding (the old geometry as ruins, the new settlement reusing roads, gate gaps, bridges and foundations, the salvage ledger), burial past a threshold (a century by default, shortened by floods, silt and rebuilding, lengthened on bare rock), the effective peak (a symbolic peak from evidence, sized at the tier range's lower quartile, marked symbolic); II.7.6: the buried former settlement generalised to the replay (its streets, walls and major buildings at their old ground level), distinct from item 109's ancient ruins",
  'determinism': "§7.7: the derivation rows for history (DR36 onward, ID-DR): the peak (peakTier, high-water population, the symbolic peak's evidence order), the replay's events (event → epoch mapping), destruction and refounding, the burial threshold; the replay's record for the clerk (W-DOS-09); §6.1: the replay's streams (deterministic per seed and history)",
  'scope': "§13.2: item 113 (g)'s bars (the city-to-village fixture, byte-stable replay, refounded fixture reusing roads, buried ruins past the threshold matching the former geometry, a void LOST on its last link's closing and restored on reopening, a symbolic peak only with evidence, with replay off byte-identical — a NoOpPin); §16: the replay's milestone; §0.2's landing row",
  'model': "WIRING CONSEQUENCE: §2.7/§2.8 carry the replay's records the base reads (the history record, the LOST state on an underground link's access path — V04's records — and the `symbolic` provenance flag on a derived fact)",
  'V06': "the replay engine at generation: coarse epochs, the event-to-epoch mapping, the generation budget, lazy detail, the replay record; J-V6.4 and §1.3's bullet retired (V06-XCONF-1)",
  'V08': "reading SettlementForge's history: AGE_BY_TIER, the founding, the 29 event types with years ago and severity, tierHistory, populationHistory, calamityHistory, the lifecycle (terminal death, resettlement), opt-in ancient ruins, peakTier and its documented gap; the effective peak's evidence order",
  'V04': "buried former-town ruins (derived from the former geometry, at their old ground level) and lost access: access counts only through OPEN links; a void whose every open path closes becomes LOST (remembered as once known, drawn faded like an unexcavated void) until refound; dwellings in a lost void empty by the vacancy rules and may return",
  'V07': "a village over a former city (the remnants at village rungs) and refounding at village rungs",
  'V11': "event-to-epoch rows and burial thresholds (the table values of item 113)",
  'V09': "the history option in the editor (the blueprint history) and the LOST void's panel line (V09-WGAP-1)",
  'V10': "the story told ('the walls were built when this was a city of twelve thousand'; 'its exact size is not recorded' for a symbolic peak)",
  'V12': "the bars and the replay's budget (register lines, the NoOpPin)",
 },
}
# g items 102-110: the base parts each unit applies (the volumes carry their parts already, integrated by the volumes pass)
G_BASE = {
 102: {'pipeline': '§4.5 (the driver and its order), §4.7 S10b (the sunlit-side preference), II.6 (the island shade strip hook), §4.11 (drift over epochs, STAGED with evolution)', 'determinism': '§7.6 (the weight w_sun as a table value)', 'rendering': '§8.4 (the path sun reused as a model-side sampler, never the view\'s light)', 'scope': '§13 (the bars)'},
 103: {'pipeline': '§10.2 (the siting profile columns on BuildingClassRow, the relation families as derived RelationRules, the signature-pair table, the coverage row of (f)), §4.7 S10b (the solver reads them; unchanged in shape)', 'determinism': '§7.6 (the tables and their provenance)', 'scope': '§13.2 (the statistics suite; the coverage bar)'},
 104: {'determinism': '§7.7 (the port reads the custom record and the optional definition fields)', 'pipeline': '§10.2 (the resolution order, the 17 archetype rows, the category and tag delta tables, the keyword table, the fallback), §4.7 S10b (unchanged solver)'},
 105: {'pipeline': '§10.2 (the goods table, the orientation column, split rows), §4.7 S10a and S10b (order, two-way term, relaxation, split placement), §4.5 S7b (1) (the district supply term)', 'model': '§2.6 and §2.7 (Use.branchOf)', 'determinism': '§7.7 (activeChains as a port input; a DR row — DR33)', 'scope': '§13.2'},
 106: {'model': '§2.7 (the closure kind, the stretch profile, the harbour-mouth gate)', 'pipeline': '§4.2 S3 (9) and §4.4 S5a (classification, reach, anchors), §4.8 (graded furniture, anchor towers, the chain), S12b (intramural gardens)', 'determinism': '§7.7 DR2, §5.2 F-WALL', 'scope': '§13.2'},
 107: {'pipeline': '§10.2 (the balance profile, comfortM, the spacing row), §4.7 S10a and S10b, §4.5 S7b (1)', 'scope': '§13.2'},
 108: {'determinism': '§7.7 (T9 and DR9 extended; the ladder table as a port input pinned to the baseline)', 'pipeline': '§10.2 (the step-type table), §4.2 S2 (member counts), §4.5 item 72 (quarter records owning members)', 'scope': '§13.2'},
 109: {'model': '§2.7 (UndergroundSystem.kind gains ruin; link kinds breach and reuse)', 'pipeline': '§4.2 S1 (the relief rows, the mining boost, the fissure variant), II.7.6 (caverns and the ruin system, its order and depth band), II.7.5 (a ruin as a void source and its rank), II.7.3 (basement access over ruins)', 'determinism': '§7.7 (DR rows for ancient_ruins, magical_node, the mining deposits and the history events)', 'rendering': '§8.2 (the ruin style)', 'scope': '§13.2'},
 110: {'model': '§2.7 (RetainingWall, the raised ways\' parts, deck plots — file f items 244–246)', 'kernel': '§3.4 (ground parts from 1)', 'pipeline': '§4.3 and §4.6 (raised ways, stairs and ramps), §4.7 S10 and S11 (terrace levelling, deck plots)', 'determinism': '§5.3 (the revised deck invariant), §7.1 (T3\'s retaining kind, T4\'s raised flag)', 'rendering': '§8 (drawing and shadows)', 'scope': '§13 and §16 (the second known-city fixture at M3a)'},
}

SEAM_OPEN = [  # the round-6 seam findings left open by the finalization (INDEX §7's fix list) — routed, with the canon's ruling where one is needed
 ('S23R6-07', 'seam-stage2-3-r6', 'V01', "V01 §0's plain words name the annex temple's way into its crypt (V03 §3.7.4 is the mechanism)."),
 ('SLR6-02', 'seam-layers-r6', 'V04', "V04 §6 prices the underground switch's edit (the ground-edit row V04 §4.3 reads) as a budget row."),
 ('SLR6-03', 'seam-layers-r6', 'V04', "V04 §12's stale hedge leaves with the narration; J-V4.121's pointer names the undo row that exists (§7.4's) or is removed."),
 ('SLR6-04', 'seam-layers-r6', 'V01', "V01's cross-volume notes (36) and (39) leave (answered; V01-XCONF-1)."),
 ('TX-04', 'seam-time-r6', 'V07', "V07 prices `village.density`'s cost at a base-product epoch (a superseded village plan's raster) in its §6, with V06 §6.2's row citing it."),
 ('SR6-04 (b)-(c)', 'seam-settlements-r6', 'V07', "V07 §12's and §13's round-6 sentences leave with the narration (V07-ICONF-5)."),
 ('SR6-05 (b)', 'seam-settlements-r6', 'V08', "V08 §12's round-6 PLAUSIBLE sentence leaves with the narration."),
 ('SR6-08', 'seam-settlements-r6', 'V07', "Ruled: V11's compiler (step 5a) is the one producer of the `v.` rows' `commonness` (the compiler produces every compiled display cell; file f rule R-c); V07 §2.4 cites it and names no script. V11 states the v.-row case in step 5a (SR6-09 (a))."),
 ('SR6-09 (a), (c), (d)', 'seam-settlements-r6', 'V11', "(a) step 5a's v.-row case (with SR6-08); (c) the mis-attributed seam id corrected; (d) the mages_guild cell (V11-ICONF-7)."),
 ('SR6-02', 'seam-surfaces-r6', 'V09', "The clerk card's effect lines draw Show only (J-SS6.4); V09 §4.11 states it."),
 ('SR6-03', 'seam-surfaces-r6', 'V09', "V09 §2.9's argument forms gain the one English indefinite form {a <slot>} (J-SS6.3); V08's templates carry no article (SR6-07 closed)."),
 ('SR6-06', 'seam-surfaces-r6', 'V09', "T-V9-15's and T-V9-27's scope and SR6-01's drawer companion as the seam states them."),
 ('SR6-04 (surfaces)', 'seam-surfaces-r6', 'V08', "The frame words of V08 §4.2's controls and dialogs, §5.1's strip and the notice keyed as MsgRows."),
 ('SR6-05 (surfaces)', 'seam-surfaces-r6', 'V10', "V10's subject-rule wording cites V09 §2.9; the restated lists become pointers; the two alternative keys reuse V09's button.openCopy and button.undo (J-SS6.7); the status line leaves."),
 ('SR6-08 (surfaces)', 'seam-surfaces-r6', 'V11', "Registry row 87's row type (V11-XCONF-2)."),
 ("SCC-109's X-V12-18 clause", 'seam-content-calibration-r6', 'V12', "X-V12-18 states that V04's rows take V12's span-rule order (SCC-113 closes V04's side)."),
 ('SCC-113', 'seam-content-calibration-r6', 'V04', "J-V4.118's rows confirm at V12's staged form (panel M4's M4-110 group at M4, T-V4-62 at V4-U3, the V4-U5 panel) and name the span constants by V11's cell names."),
 ('SCC-115', 'seam-content-calibration-r6', 'V09', "The three provenance notes name their confirming test (V12 §3.11's rule for calibrate-later application constants)."),
]

OWNER_Q = [  # every volume owner question, answered (J121 / J122), and base questions decided by this canon
 ('V01', 'Q-V1-1', "the default map changes at M5 to show its neighbourhoods", "J122: yes (the parity presets unchanged)"),
 ('V02', 'Q-V2-1', "SettlementForge prescribing a building's shape", "J122: not now (one-way truth; SettlementForge has no shape data)"),
 ('V03', 'Q1', "floor plans on the base's buildings right after M4", "J122: yes (P0, P1, P3 after M4; P2 with V04's access records)"),
 ('V04', 'Q1', "the underground as M6-U right after M5 (beside it with a second pair)", "J122: yes"),
 ('V04', 'Q2', "the underground's cost 28.25–39.25 pw", "J122: accepted"),
 ('V05', 'Q1', "the underground before the sky", "J122: yes"),
 ('V06', 'Q1', "when the evolution engine is built", "J122: (a) right after M4"),
 ('V07', 'Q1', "when the village is built", "J122: (a) right after M4, parallel with M5; the tracker spike V-M0 right after M0"),
 ('V08', 'Q1', "the module's web origin", "follows SettlementForge (J121)"),
 ('V08', 'Q2', "plans, save limits, backups", "follows SettlementForge (J121)"),
 ('V08', 'Q3', "scene files inside SettlementForge's export bundle", "J122: yes, from M-SF (opaque bytes, V08-XCONF-5); until then maps export on their own"),
 ('V08', 'Q4', "M-SF after M-CAL", "J122: yes"),
 ('V08', 'Q5', "a live party map", "J122: pictures and player views now; a live shared map after M-SF"),
 ('V09', 'Q1', "a private preview host", "follows SettlementForge's staging (J121)"),
 ('V09', 'Q2', "first-five-minutes participants and any thank-you", "J122: five SettlementForge users per round from its community; thanks by credit and early access, no payments"),
 ('V09', 'Q3', "the product's public name", "follows SettlementForge (J121)"),
 ('V10', 'Q1', "the user's own API key or a relay", "follows SettlementForge's AI setup (J121)"),
 ('V10', 'Q2', "SettlementForge's assistant or ours", "J122/J121: SettlementForge's, driving our tool API"),
 ('V10', 'Q3', "the model tier", "follows SettlementForge (J121); a cheaper tier is evaluated before any switch"),
 ('V10', 'Q4', "the built-in clerk as M3c beside M3b", "J122: yes"),
 ('V10', 'Q5', "the clerk's live-evaluation spend", "J122: a budget cap of about US$790–1 190 through M3c, spent in stages (smallest tier first, the full suite at M3c's exit), each spend shown to the owner first"),
 ('V11', 'Q-V11-1', "the sensitive catalogue kinds", "J122: keep, concealed by default in player views, shown as SettlementForge's own settings show them"),
 ('V12', 'Q-V12-1', "one month of FTG's premium tier", "J122: no"),
 ('V12', 'Q-V12-2', "the owner's sittings", "J122: only at M1 (look check), M2b, M4 and M5, batched, about an hour each (V12-XCONF-1)"),
 ('V12', 'Q-V12-3', "historical layers as defaults", "J122: only where the owner's sitting passes them"),
 ('scope', 'J-A68.81', "shadows on the default ink map", "J-C1 (J122 delegation, this canon): kept as designed"),
 ('scope', 'J-A69.82', "the ink plate chroma 20–30 or the middle 43", "J-C2: 20–30 kept for `ink`; 43 is `parchment`'s (RIC-01)"),
 ('scope', 'item 72 reading', "the surplus-pressure reading", "J-C3: kept as designed"),
 ('scope', 'J122 other points', "languages; two people editing; the licence for users' maps; name word lists and symbol artwork", "languages and the licence follow SettlementForge (J121); simultaneous editing not offered (J122, SCOPE-C08); word lists and symbol artwork written during the build under V11's authoring plan, clean-room (J122) — V11 states it"),
]
CANON_DECISIONS = [
 ('J-C1', "The default ink map keeps its gentle cast shadows in its own ink; only the MFCG parity preset draws none (J-A68.81 as designed).", "J122 delegation; no behaviour change"),
 ('J-C2', "The `ink` plate chroma stays 20–30 (J-A69.82 as designed); `parchment`, a shipping ink-family variant at M3b, aims at the corpus median 43 (RIC-01).", "J122 delegation; keeps both statements"),
 ('J-C3', "The item-72 surplus-pressure reading stands as designed.", "J122 delegation; no behaviour change"),
 ('J-C4', "A raised-way span whose under-deck strip lies wholly on hinterland land-use faces stays open (reason `country`) at every rung (V07-XCONF-2).", "realism tiebreaker; one rule at the span rule's base home"),
]
COHESION = {
 'scope': [
  "The one-page summary and §1 describe the whole set: the base plus the twelve volumes at build depth (INDEX.md the map), no 'hooks only' framing (SCOPE-C04, CO-01).",
  "§1.1's stage table names each staged subject's volume and milestone (INDEX §1's columns).",
  "§14 places every package of the set with its dependency rules: @plat/hood, @plat/buildings (with the plan rung), @plat/under, @plat/village (item 505), @plat/evolve (317), @plat/sky (476), @plat/bridge-client (507), @plat/clerk (518), the calibration package (521), @plat/cli (W-PKG-01) (SCOPE-C16, CO-02).",
  "§15.1/§15.2: the VG rows and NG rows are delivered at build depth by V07 and V01 (not VILLAGE-LATER / STAGE-2 through an interface) (CO-04); every row maps to its home in the set.",
  "§16 carries J122's combined build order: V-M0 right after M0; M3c beside M3b; after M4 four streams side by side — M5 (V01), the village V-M1…V-M4 (V07), M6-E (V06), the plan rung's P0, P1, P3 on base buildings (V03); then M6 (V02) and M6-U (V04) after M5 (M6-U beside M5 with a second pair); then M6-P's rest and M6-sky; then M-CAL (V12); then M-SF (V08; VH with the village); each staged milestone's row with its volume's price; the two totals computed once by file f item 568 (the base with stage 2; the whole program) (SCOPE-C04, CO-03).",
  "INDEX.md §3 and §4 carry the same order (the V-M0 slot per J122; V-M1 after M4) and cite §16's totals; INDEX §6's questions table marks each question answered (J121/J122); INDEX §7's fix list is emptied (every item routed here).",
  "D-20, D-25, D-35 and the summary cite §16's computed totals and order; the Staged list becomes a pointer list to the volumes and milestones.",
  "§13 names the volume test families and which volume tests take over each base hook bar (CO-06; W-05).",
  "§17.1 binds implementers to the set (SCOPE-C09); §17.1 (8)'s algorithm list and §17.4's dependency table cover the volumes' methods and libraries (CO-07); Appendix A states the volumes' evidence grades (CO-08).",
  "§0.2 lands g items 102–113 and file f (E-22, CO-05).",
  "The one context vector (ContextVector, §2.5) is the object V01's DistrictContext/BlockContext, SitePlanStrategy.plan, GranularityLaw.bands and RungProfile's granularity and greenery scales read; the volumes' readers name it (CO-11).",
 ],
 'volume': [
  "The volume's §8 build plan agrees with INDEX §3/§4 and §16: milestone id (M6 = V02's stage 3; M6-U, M6-sky, M6-E, M6-P, V-M, M-CAL, M-SF, M3c), start-after, runs-beside, price (its own estimate), and J122's slot.",
  "The volume's §11 marks every owner question answered (OWNER_Q) and its body reads each decision (J121 inputs; J122 decisions).",
  "The volume's §1b wiring table names each piece's producer and consumer in the set (principle (7)); every hand-off it lists is closed at its destination or routed here.",
  "One marker line; no stacked banners, PROGRESS ledgers, reconciliation or finalization records (S9).",
 ],
}
