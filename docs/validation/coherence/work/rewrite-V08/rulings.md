
## conflicts
[
 {
  "id": "SCOPE-C07",
  "inventory": "scope",
  "kind": "conflicts",
  "severity": "CONFIRMED",
  "where": "§14, Staged list, J-A101.02 vs J121/J122",
  "items": [
   "SCOPE-0630",
   "SCOPE-0646",
   "SCOPE-1635",
   "SCOPE-1680"
  ],
  "statements": [
   "statement_a: §14 (l.14513-14529): a clerk is the host's own or 'the built-in one, which is staged'; the built-in clerk opt-in and labelled as AI; Staged list: 'the built-in clerk comes after the API'; J-A101.02.",
   "statement_b: J121: the assistant and its model tier follow SettlementForge; J122 decisions V10 Q2 ('SettlementForge's [assistant], driving our tool API') and V10 Q4 ('the built-in clerk as M3c beside M3b')."
  ],
  "proposed": "The base must say which clerk exists when (SF assistant via the tool API; the built-in clerk at M3c) and that its model tier follows SF.",
  "verdict": "FIX",
  "ruling": "Per J121/J122: in the SettlementForge module SettlementForge's assistant drives the map's tool API through the host seam (configuration C, V10 Q2); the built-in clerk ships at M3c beside M3b and runs only where the deployment's configuration enables it; the provider, model tier and key path are configuration inputs read from SettlementForge's AI setup (J121), never decided by the design. §14's clerk paragraph, the Staged list and J-A101.02's index row say so.",
  "basis": "J121, J122",
  "units": [
   "scope",
   "V10",
   "V09",
   "V08"
  ]
 },
 {
  "id": "V08-XCONF-1",
  "inventory": "vol-V07-V08",
  "kind": "cross_part_conflicts",
  "severity": "minor",
  "where": "V08 §3.1 step 2 ('none under C (SettlementForge's own assistant, the default recommended here)'); §4.4 (6) ('C (this section's own assistant, the default recommended) needs no built-in clerk')",
  "items": [
   "V08-0075"
  ],
  "statements": [
   "claim: The clerk configuration is written as a recommendation, while J121/J122 decide it: V10 Q2 'SettlementForge's, driving our tool API (J121)'. The design text still presents a settled owner decision as a recommendation."
  ],
  "proposed": "Read 'none under C (SettlementForge's own assistant; follows SettlementForge, J121)'.",
  "verdict": "FIX",
  "ruling": "V08 §3.1 step 2 and §4.4 (6) read 'none under C (SettlementForge's own assistant; follows SettlementForge, J121/J122)'.",
  "basis": "J121, J122",
  "units": [
   "V08"
  ]
 },
 {
  "id": "V08-XCONF-2",
  "inventory": "vol-V07-V08",
  "kind": "cross_part_conflicts",
  "severity": "major",
  "where": "V08 §0 ('two older copies kept as backups'; 'on its own web address'), §2.1 MapRecord.backups ('the two previous snapshots'), §2.2 MapHostConfig.moduleOrigin ('owner question V08 §11 Q1'), §3.7 Backups and the draft mirror ('Q1's recommendation (a subdomain...)'), sizes as 'the host's quota' vs J121/J122; §6 storage row ('the backups' count per rung is the owner's (V08 §11 Q2)'); §8.4 risk 5 ('The backup count per rung is the owner's (V08 §11 Q2)'); J-V8.5 ('two rotating backups')",
  "items": [
   "V08-0028",
   "V08-0098",
   "V08-0006"
  ],
  "statements": [
   "claim: Owner ruling J121 (recorded in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: V08 Q1 'the module's web origin — follows SettlementForge (J121)'; V08 Q2 'plans, save limits, backups — follows SettlementForge (J121)') requires the design to read SettlementForge's decision as an input and never re-decide it; V08 fixes the backup count at two snapshots in the storage contract (MapRecord.backups, replaceSnapshot 'drops backups[2]'), sizes a per-map quota, and makes the draft mirror's persistence depend on 'Q1's recommendation', i.e. re-decides hosting, origin and backups (principle (3): owner rule > volume)."
  ],
  "proposed": "Recast as inputs: MapHostConfig carries SF's origin, backup depth and quota (from SF's existing product decisions); the contract keeps 'backups[0..n)' read from that input; mark Q1 and Q2 'follows SettlementForge (J121)'.",
  "verdict": "FIX",
  "ruling": "Recast as inputs (J121): MapHostConfig carries SettlementForge's module origin, backup depth and storage quota from its existing product decisions; MapRecord.backups is 'backups[0..n)', n read from that input (replaceSnapshot drops the oldest beyond n); the draft mirror follows SF's origin; §6's storage row, §8.4 risk 5 and J-V8.5 cite the input; Q1 and Q2 are marked 'follows SettlementForge (J121)'.",
  "basis": "owner ruling J121 > volume",
  "units": [
   "V08"
  ]
 },
 {
  "id": "V08-XCONF-3",
  "inventory": "vol-V07-V08",
  "kind": "cross_part_conflicts",
  "severity": "minor",
  "where": "V08 §0 ('A settlement under 1 500 people waits for the village product...'); §3.9 B7 ('Villages are drawn by the village map, which is coming later.'); §3.10",
  "items": [
   "V08-0006"
  ],
  "statements": [
   "claim: J122's combined build order places the village product (V-M, after M4) before the live SettlementForge connection (M-SF, after M-CAL), so by the time a live SF drives a map the village product is registered; the plain-words promise that small settlements 'wait' describes a state the ruled order never reaches in the live product (the held-below-1 500 path remains only for a build without the village package). The B7 catalogue row's user text 'which is coming later' is deferral wording shipped as product copy."
  ],
  "proposed": "Reword: small settlements are drawn by the village product (V07), registered before M-SF; the held state applies only to a build without it.",
  "verdict": "FIX",
  "ruling": "V08 §0, §3.9 B7 and §3.10: small settlements are drawn by the village product (V07), which J122's order registers before M-SF; the held-below-1 500 state applies only to a build without the village package; B7's copy loses 'coming later'.",
  "basis": "J122; principle (6)",
  "units": [
   "V08"
  ]
 },
 {
  "id": "V08-XCONF-4",
  "inventory": "vol-V07-V08",
  "kind": "cross_part_conflicts",
  "severity": "minor",
  "where": "V08 §1 Out of scope ('A live, explorable map for players ... is not built: owner question Q5') and §3.14 (6) ('the \"party copy\" capability of owner question Q5, not built') vs J122",
  "items": [
   "V08-0010",
   "V08-0111"
  ],
  "statements": [
   "claim: J122 decides V08 Q5: 'pictures and player views now; a live shared map as a later item after M-SF'; the volume still cites Q5 as an open owner question instead of the decision (principle (7)'s J122 clause: mark each answered with its decision and J122)."
  ],
  "proposed": "Cite 'decided under J122: pictures and player views now; a live shared map after M-SF' in §1, §3.14 (6) and §11.",
  "verdict": "FIX",
  "ruling": "V08 §1, §3.14 (6) and §11 cite 'decided under J122: pictures and player views now; a live shared map after M-SF'.",
  "basis": "J122",
  "units": [
   "V08"
  ]
 },
 {
  "id": "V08-XCONF-5",
  "inventory": "vol-V07-V08",
  "kind": "cross_part_conflicts",
  "severity": "major",
  "where": "V08 §5.4 (2) ('Whether SettlementForge's own export bundle may carry the map's scene files is the owner's (V08 §11 Q3); until the owner says so, it may not.') and §5.4 (1)-(2)'s structural closure vs J122",
  "items": [
   "V08-0126"
  ],
  "statements": [
   "claim: J122 decides V08 Q3: 'scene files inside SettlementForge's export bundle — yes, from M-SF; until then maps export on their own'. V08 still treats Q3 as open and forbids it, and §5.4's structural rule ('no STRUCTURED format reaches SettlementForge's code ... the host client has no call that returns one') would have to admit a scene-file route for SF's bundle from M-SF; the owner delegation outranks the volume (principle (3)), and door 1 (J86: no geometry for SF's simulator) must be shown to stay closed by the new route."
  ],
  "proposed": "Canon: add the M-SF route for SF's export bundle (which formats, through which host call, under which key rules), state why door 1 stays closed (bundle packaging, not simulator input), and mark Q3 decided under J122.",
  "verdict": "FIX",
  "ruling": "J122 (V08 Q3) is written at build depth in V08 §5.4: from M-SF the host client gains one call returning the user's chosen scene exports (§11.1's scene formats, rendered at the export's knowledge tier and admitted by the calling key) as OPAQUE byte blobs for SettlementForge's export bundle; SettlementForge packages the bytes unread; before M-SF maps export on their own. Door 1 stays closed (J86): no structured format reaches SettlementForge's code as data — §5.4's structural rule is narrowed to 'no call returns a structured format; the bundle call returns opaque blobs only'. A test (V08 §7) asserts the blob route carries no parsed structure and honours the key.",
  "basis": "owner delegation J122 > volume; J86 intact",
  "units": [
   "V08",
   "rendering"
  ]
 },
 {
  "id": "V08-XCONF-6",
  "inventory": "vol-V07-V08",
  "kind": "cross_part_conflicts",
  "severity": "minor",
  "where": "V08 §5.5 ('the module's own strings are its locale table (§14's app), with English the default')",
  "items": [
   "V08-0127"
  ],
  "statements": [
   "claim: J121 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: 'other interface languages — follows SettlementForge (J121)') requires the module's interface language to follow SettlementForge's decision as an input; V08 fixes English as the default of the module's own locale table instead of reading SF's language setting."
  ],
  "proposed": "The frame's locale is the host's (an input on doc.load or MapHostConfig from SF's language decision); English only as the catalogue's source language.",
  "verdict": "FIX",
  "ruling": "The frame's interface language is the host's (an input on doc.load / MapHostConfig from SettlementForge's language decision, J121); English is the catalogue's source language, not a product default.",
  "basis": "J121",
  "units": [
   "V08",
   "V09"
  ]
 },
 {
  "id": "V08-XCONF-7",
  "inventory": "vol-V07-V08",
  "kind": "cross_part_conflicts",
  "severity": "minor",
  "where": "V08 §8.1 ('putting M-SF earlier (before M-CAL, calibrating afterwards) is the owner's product-order choice (V08 §11 Q4)')",
  "items": [
   "V08-0141"
  ],
  "statements": [
   "claim: J122 decides V08 Q4: 'the live SettlementForge connection after M-CAL — yes' (the port's creation half at M1 on frozen dossiers); §8.1 and §11 still present Q4 as open."
  ],
  "proposed": "Mark Q4 decided under J122 (M-SF after M-CAL) and write the combined order of J122 into §16 and INDEX.md's plan.",
  "verdict": "FIX",
  "ruling": "V08 §8.1 and §11 mark Q4 'decided under J122: M-SF after M-CAL'.",
  "basis": "J122",
  "units": [
   "V08"
  ]
 },
 {
  "id": "V08-XCONF-8",
  "inventory": "vol-V07-V08",
  "kind": "cross_part_conflicts",
  "severity": "major",
  "where": "V08 §11 Owner questions table (Q1-Q5) and its preface ('Until the owner answers, the design runs on the recommendation marked default')",
  "items": [
   "V08-0163",
   "V08-0006",
   "V08-0010",
   "V08-0098",
   "V08-0126",
   "V08-0141"
  ],
  "statements": [
   "claim: Every V08 owner question is answered in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: Q1 and Q2 'follow SettlementForge (J121)', Q3 'yes, from M-SF; until then maps export on their own' (J122), Q4 'after M-CAL: yes' (J122), Q5 'pictures and player views now; a live shared map as a later item after M-SF' (J122). The table still presents them as open with defaults, and three answers differ from the defaults (Q2's backup rule and plan rule are SF's, not V08's; Q3 changes 'until ruled: no' to yes from M-SF). Principle (7)'s J121/J122 clause: mark each answered with its decision, have the design read SF's decisions as inputs."
  ],
  "proposed": "Replace §11 by a table of the five decisions (J121/J122) and carry each into its section (§3.7 backups, §5.4 export bundle, §8.1 order, §3.14 (6) party copy).",
  "verdict": "FIX",
  "ruling": "V08 §11 becomes a table of the five decisions (Q1, Q2 follow SettlementForge, J121; Q3 yes from M-SF, J122; Q4 after M-CAL, J122; Q5 pictures and player views now, J122), each carried into its section (§3.7, §5.4, §8.1, §3.14 (6)).",
  "basis": "J121, J122",
  "units": [
   "V08"
  ]
 },
 {
  "id": "V08-XCONF-9",
  "inventory": "vol-V07-V08",
  "kind": "cross_part_conflicts",
  "severity": "minor",
  "where": "V08 §2.6 'era' row (line 955) vs V11 §3.19.2 'Era default from the dossier'",
  "items": [
   "V08-0054"
  ],
  "statements": [
   "claim: One derivation is written in two homes with different inputs: V11 §3.19.2 says 'V08 derives era from site.culture and the tier' (every culture c14, region western), while V08 §2.6's era row, which owns the reading, maps only the culture ('every culture of the cultures row -> c14 ... the culture is the discriminator'); the tier is read by neither rule's body."
  ],
  "proposed": "State the derivation once at V08 §2.6 (culture -> era) and have V11 §3.19.2 cite it without naming the tier, or add the tier's part to V08's row.",
  "verdict": "FIX",
  "ruling": "The era derivation's home is V08 §2.6's era row (culture → era); V11 §3.19.2 cites it without naming the tier.",
  "basis": "single source (1)",
  "units": [
   "V08",
   "V11"
  ]
 },
 {
  "id": "CANON-C03",
  "statements": [
   "INDEX §6: 'Until the owner answers, each volume runs on its recommendation' and twenty-five open questions.",
   "J121/J122 answered every one."
  ],
  "verdict": "FIX",
  "ruling": "INDEX §6 becomes the table of decisions (OWNER_Q); every volume's §11 likewise.",
  "basis": "J121, J122",
  "units": [
   "scope",
   "V01",
   "V02",
   "V03",
   "V04",
   "V05",
   "V06",
   "V07",
   "V08",
   "V09",
   "V10",
   "V11",
   "V12"
  ],
  "inventory": "canon",
  "kind": "canon",
  "severity": "major",
  "where": null,
  "items": [],
  "proposed": null
 },
 {
  "id": "CANON-C04",
  "statements": [
   "INDEX §7: 'The fix list — deliberately left for the next amendment'.",
   "The owner's no-defer rule; THE BAR IS ZERO."
  ],
  "verdict": "FIX",
  "ruling": "Every INDEX §7 item is routed to its unit (SEAM_OPEN) and fixed in this pass; INDEX §7 keeps the reconciliation history as a pointer to the validation records and holds no open item.",
  "basis": "owner no-defer rule",
  "units": [
   "scope",
   "V01",
   "V04",
   "V07",
   "V08",
   "V09",
   "V10",
   "V11",
   "V12"
  ],
  "inventory": "canon",
  "kind": "canon",
  "severity": "major",
  "where": null,
  "items": [],
  "proposed": null
 }
]
['E-17', 'E-24', 'E-31']

## elegance
[
 {
  "id": "E-17",
  "verdict": "UNIFY",
  "subject": "The knowledge admission re-stated at each reader: labels §9.2, legend §9.5, thematic rows §8.2, exports §11.1, the API §11.2 (REL-02).",
  "unified_form": "One admission function at §9.2 with its readers listed; each reader cites it.",
  "home": "§9.2 (rendering)",
  "units": [
   "rendering",
   "V08",
   "V09",
   "V10"
  ],
  "equivalence": [
   "the band each reader admits at kept: its view's band, the export's band, or the city band when band-less",
   "V09's admitAs (J-V9.86) and V10's filtered dry runs cite it"
  ],
  "separating_nuance": null
 },
 {
  "id": "E-24",
  "verdict": "UNIFY",
  "subject": "Superseded or amended decisions marked inline in many forms across the set (EL-07, SCOPE-C02, V01-ICONF-3, V04-ICONF-2, V09-ICONF-5).",
  "unified_form": "One mark on the decision row: 'superseded by X' or 'amended by X', in the Judgment-calls index and in every volume's §9.",
  "home": "the index (scope) and each volume's §9",
  "units": [
   "scope",
   "V01",
   "V02",
   "V03",
   "V04",
   "V05",
   "V06",
   "V07",
   "V08",
   "V09",
   "V10",
   "V11",
   "V12"
  ],
  "equivalence": [
   "no row dropped",
   "the governing row keeps the reason"
  ],
  "separating_nuance": null
 },
 {
  "id": "E-31",
  "verdict": "UNIFY",
  "subject": "The toll-bridge watercourse rule written twice with different shapes (V08-ELEG-1): V08 §2.6b (3) at base rungs and V07 §3.1 (1), §3.11 DR1 at village rungs.",
  "unified_form": "One rule at V08 §2.6b (3) (the DR row's home) with a rung column; V07 cites it.",
  "home": "V08 §2.6b (3)",
  "units": [
   "V08",
   "V07"
  ],
  "equivalence": [
   "geometry by rung: base — the brook crosses the through route of the longest approach inside the frame; village — the course between the two frame arcs the through road's entries divide, the topology raised to through",
   "coastal dry site by rung: base — a brook; village — an estuary",
   "failure → toll_bridge_dry at every rung on any of: a desert with no oasis_water and no river the arid row draws (g item 111); relief that cannot carry the brook; a fixed isolated or none access word — the union of both volumes' failure conditions, each now defined at both rung ranges (principle (11))"
  ],
  "separating_nuance": null
 }
]

## wiring (unit)
[
 "W-DOS-01a",
 "W-DOS-01b",
 "W-DOS-02",
 "W-DOS-07",
 "W-DOS-08",
 "W-DOS-09",
 "W-HOOK-02"
]

## wiring gaps
[
 {
  "id": "W-DOS-01a",
  "class": "dossier-unreached",
  "severity": "major",
  "units": [
   "determinism",
   "V08"
  ],
  "piece": "§7.7 item 1, the never-read list (item 86)",
  "link": "§7.7 item 1 names every stored SettlementForge key the port does not read, each with its reason: `_config` (raw inputs; the resolved `config` is read), `relationships`, `prominentRelationship` and `conflicts` (the NPC layer beside its social groups), `resourceAnalysis` (the deposits come from `config.nearbyResources*`), `defenseProfile` (copies of institution records and generation scores; walls come from the `@wall` kinds rows, defence from `monsterThreat`), `coherenceNotes`, `structuralViolations`, `structuralSuggestions`, `economicViability` (the host's own verdicts), `userCanon`, `npcLadder`, `traditions` (today only on V08's manifest as read:false) and the lived keys `campaignState.eventLog`, `_userEdits`, `dmLayer`, `locks`; and it states the CLOSED-DIGEST RULE: inside a record the port reads, a field that no DossierDigest field names is not read — the adapter's field table (W-DOS-01b) is the list",
  "ruling": "WIRE: write the named link at its home (the link column), both ends"
 },
 {
  "id": "W-DOS-01b",
  "class": "dossier-unreached",
  "severity": "major",
  "units": [
   "V08",
   "determinism"
  ],
  "piece": "the adapter's SettlementForge-path table",
  "link": "V08 §2.4 gains THE ADAPTER'S FIELD TABLE for fp-integration-2026-09-23: every SettlementForge path (the 41 required keys, the 7 optional keys read, the campaign inputs of the realm block and the week) → the DossierDigest field it fills (naming the paths V08 leaves implicit: `config.cultureProfileKey` → `site.culture`, `config.nearbyResources*` → `site.deposits`, `neighborRelationship` / `neighbourNetwork` → `economy.partners`, `economicState.prosperity` → `wealth.label`) → the derivation row it feeds, or → `ignored` with its §7.7 item 1 reason; `AdapterManifest.keyList`, T-V8-20's ignore clause and §14's key-list lint read that table; `npcLadder` and `traditions` move to §7.7 item 1's one list",
  "ruling": "WIRE: write the named link at its home (the link column), both ends"
 },
 {
  "id": "W-DOS-02",
  "class": "dossier-change-path",
  "severity": "major",
  "units": [
   "V08",
   "V06",
   "determinism"
  ],
  "piece": "the prosperity word over time (receipt F9)",
  "link": "V08 §3.5's diff table gains the row `wealth`: `label` → `attr` with response `epoch` — `EpochInputs.wealthLevel` through `tables/dossier/wealth` (DR6; receipt F9), the producer V06 W27 and BCR-V6-9 read; today the settlement row compares only population, tier word and name, so a campaign's prosperity change never reaches DR6",
  "ruling": "WIRE: write the named link at its home (the link column), both ends"
 },
 {
  "id": "W-DOS-07",
  "class": "orphan",
  "severity": "minor",
  "units": [
   "V08"
  ],
  "piece": "DossierDigest.notables[].importance",
  "link": "V08 names the reader of a notable's `importance` (V10's people answer and V09's person card order them by it) or drops it from the digest and lists `npcs[].importance` as not read; V08 §3.5 itself says no rule reads it",
  "ruling": "WIRE: write the named link at its home (the link column), both ends"
 },
 {
  "id": "W-DOS-08",
  "class": "dossier-change-path",
  "severity": "minor",
  "units": [
   "V08"
  ],
  "piece": "a later change of the site facts or the history",
  "link": "V08 rules both creation-only (§2.7: 'the site is creation's'; §3.11: 'History. At creation only') but §3.5's diff table has no row for them, so a DM's later change of terrain, access, threat, magic, culture, isolation or the history is skipped without a word: the table gains rows `site` and `history` that cite that rule and write one note (`frozen_fact_changed`, class report, with its `host.note.*` row) so the change is reported, and §7.7's DR1 bar ('a coastal dossier has a coast') is stated as a creation bar",
  "ruling": "WIRE: write the named link at its home (the link column), both ends"
 },
 {
  "id": "W-DOS-09",
  "class": "dossier-no-derivation-row",
  "severity": "major",
  "units": [
   "determinism",
   "V06",
   "V08"
  ],
  "piece": "the history as a derivation input",
  "link": "§7.7's derivation table gains the history row(s) — map facts: the growth-stage count, the scars (buried town, fire and flood), a ruin's age, and g item 113's peak, replay and buried former settlement; inputs `history.ageYears`, `history.events`, `tierHistory`, `populationHistory`, `calamityHistory`, `peakTier`; rules §4.2 S2, II.7.6, V06's replay — g item 113's §7.7 part (J-A88.42 names the readers today without a row); V04 §1b.5's two history rows then cite it (V04-WGAP-1)",
  "ruling": "CLOSED by g item 113's §7.7 part (the history derivation rows DR36 onward, ID-DR)."
 },
 {
  "id": "W-HOOK-02",
  "class": "hook-one-ended",
  "severity": "minor",
  "units": [
   "model",
   "V02",
   "V03",
   "V04",
   "V05",
   "V08"
  ],
  "piece": "§2's staged records and the stage-3 and plan hooks",
  "link": "§2.6 and §2.7 name each staged record's building volume: SkyIsland → V05; Tunnel, UndergroundSystem, Gallery, Chamber, UndergroundLink → V04; ConditionOverlay, DepositSite, PowerRelation, HistoryHint, the dossier-backed Person → V08; BuildingGenerator.compose → V02; BuildingGenerator.plan and the plan records → V03 (MW-01, MW-02)",
  "ruling": "WIRE: write the named link at its home (the link column), both ends"
 }
]

## id_rulings unit
[
 "ID-BCR",
 "ID-WX",
 "ID-DR",
 "ID-DUPDEF"
]

## g_parts
[
 {
  "item": 111,
  "class": "new design at build depth in every named unit; F-MISSING if absent",
  "part": "the dossier's desert with or without `oasis_water`, and deserts with rivers, lakes or coasts (the port's mapping; E-31's failure condition reads it)"
 },
 {
  "item": 113,
  "class": "new design at build depth in every named unit; F-MISSING if absent",
  "part": "reading SettlementForge's history: AGE_BY_TIER, the founding, the 29 event types with years ago and severity, tierHistory, populationHistory, calamityHistory, the lifecycle (terminal death, resettlement), opt-in ancient ruins, peakTier and its documented gap; the effective peak's evidence order"
 }
]

## terms
[
 {
  "id": "G-lot",
  "retired": "lot, lot-driven, lot-derived, BuildingInput.lot",
  "term": "plot (field BuildingInput.plot)",
  "count": 2,
  "lines": [
   3130,
   3132
  ]
 },
 {
  "id": "G-firstmap",
  "retired": "first paint",
  "term": "first map",
  "count": 2,
  "lines": [
   157,
   1314
  ]
 },
 {
  "id": "G-cite",
  "retired": "V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 …",
  "term": "Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y",
  "count": 233,
  "lines": [
   281,
   290,
   311,
   323,
   328,
   329
  ]
 },
 {
  "id": "G-DR",
  "retired": "DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8",
  "term": "DR26–DR35 (ID-DR)",
  "count": 119,
  "lines": [
   18,
   202,
   206,
   210,
   269,
   274
  ]
 },
 {
  "id": "G-fallbackclass",
  "retired": "fallbackClass",
  "term": "item 104 (a)'s resolution (V11 §3.13)",
  "count": 8,
  "lines": [
   1998,
   3158,
   3159,
   3486,
   3514,
   3532
  ]
 },
 {
  "id": "G-portpath",
  "retired": "PortRungPath, registerRungPath, its own port path",
  "term": "ProductDecl in StrategyRegistry.products (file f item 202)",
  "count": 5,
  "lines": [
   3003,
   3512,
   3647
  ]
 }
]

## cohesion
[
 "The volume's §8 build plan agrees with INDEX §3/§4 and §16: milestone id (M6 = V02's stage 3; M6-U, M6-sky, M6-E, M6-P, V-M, M-CAL, M-SF, M3c), start-after, runs-beside, price (its own estimate), and J122's slot.",
 "The volume's §11 marks every owner question answered (OWNER_Q) and its body reads each decision (J121 inputs; J122 decisions).",
 "The volume's §1b wiring table names each piece's producer and consumer in the set (principle (7)); every hand-off it lists is closed at its destination or routed here.",
 "One marker line; no stacked banners, PROGRESS ledgers, reconciliation or finalization records (S9)."
]

## shrink
{
 "words_before": 84356,
 "goal_band_words_after": [
  50614,
  63267
 ],
 "narration_ranges_words": 12989,
 "restatement_items": 12,
 "bcr_blocks_to_pointers": 6
}

## requests_in_f
[
 {
  "request": "BCR-V8-9",
  "id_after": "BCR-V8-9",
  "f_item": 202,
  "base_section": "1.1 What is built, in what order; the two size ladders"
 },
 {
  "request": "BCR-V8-28",
  "id_after": "BCR-V8-28",
  "f_item": 244,
  "base_section": "2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records"
 },
 {
  "request": "BCR-V8-14",
  "id_after": "BCR-V8-14",
  "f_item": 256,
  "base_section": "2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records"
 },
 {
  "request": "BCR-V8-26",
  "id_after": "BCR-V8-26",
  "f_item": 257,
  "base_section": "2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records"
 },
 {
  "request": "BCR-V8-31",
  "id_after": "BCR-V8-31",
  "f_item": 260,
  "base_section": "2.8 Identity, lifecycle, provenance, the entity registry"
 },
 {
  "request": "BCR-V8-6",
  "id_after": "BCR-V8-6",
  "f_item": 358,
  "base_section": "7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation"
 },
 {
  "request": "BCR-V8-19",
  "id_after": "BCR-V8-19",
  "f_item": 359,
  "base_section": "7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation"
 },
 {
  "request": "BCR-V8-7",
  "id_after": "BCR-V8-7",
  "f_item": 389,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-8",
  "id_after": "BCR-V8-8",
  "f_item": 390,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-11",
  "id_after": "BCR-V8-11",
  "f_item": 391,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-12",
  "id_after": "BCR-V8-12",
  "f_item": 392,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-20",
  "id_after": "BCR-V8-20",
  "f_item": 393,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-21",
  "id_after": "BCR-V8-21",
  "f_item": 394,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-22",
  "id_after": "BCR-V8-22",
  "f_item": 395,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-24",
  "id_after": "BCR-V8-24",
  "f_item": 396,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-25",
  "id_after": "BCR-V8-25",
  "f_item": 397,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-30",
  "id_after": "BCR-V8-30",
  "f_item": 398,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-32",
  "id_after": "BCR-V8-32",
  "f_item": 399,
  "base_section": "7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)"
 },
 {
  "request": "BCR-V8-15",
  "id_after": "BCR-V8-15",
  "f_item": 410,
  "base_section": "8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)"
 },
 {
  "request": "BCR-V8-29",
  "id_after": "BCR-V8-29",
  "f_item": 425,
  "base_section": "10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)"
 },
 {
  "request": "BCR-V8-2",
  "id_after": "BCR-V8-2",
  "f_item": 459,
  "base_section": "11.2 The embedding API and the worker boundary (SCL-6)"
 },
 {
  "request": "BCR-V8-1",
  "id_after": "BCR-V8-1",
  "f_item": 472,
  "base_section": "11.3 The host bridge — the host is the store (FTG-12)"
 },
 {
  "request": "BCR-V8-16",
  "id_after": "BCR-V8-16",
  "f_item": 480,
  "base_section": "12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9)"
 },
 {
  "request": "BCR-V8-17",
  "id_after": "BCR-V8-17",
  "f_item": 486,
  "base_section": "13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT"
 },
 {
  "request": "BCR-V8-3",
  "id_after": "BCR-V8-3",
  "f_item": 507,
  "base_section": "§14 Package and module layout, key interfaces, dependency rules, extension points"
 },
 {
  "request": "BCR-V8-4",
  "id_after": "BCR-V8-4",
  "f_item": 508,
  "base_section": "§14 Package and module layout, key interfaces, dependency rules, extension points"
 },
 {
  "request": "BCR-V8-5",
  "id_after": "BCR-V8-5",
  "f_item": 509,
  "base_section": "§14 Package and module layout, key interfaces, dependency rules, extension points"
 },
 {
  "request": "BCR-V8-10",
  "id_after": "BCR-V8-10",
  "f_item": 510,
  "base_section": "§14 Package and module layout, key interfaces, dependency rules, extension points"
 },
 {
  "request": "BCR-V8-13",
  "id_after": "BCR-V8-13",
  "f_item": 511,
  "base_section": "§14 Package and module layout, key interfaces, dependency rules, extension points"
 },
 {
  "request": "BCR-V8-23",
  "id_after": "BCR-V8-23",
  "f_item": 512,
  "base_section": "§14 Package and module layout, key interfaces, dependency rules, extension points"
 },
 {
  "request": "BCR-V8-27",
  "id_after": "BCR-V8-27",
  "f_item": 513,
  "base_section": "§14 Package and module layout, key interfaces, dependency rules, extension points"
 },
 {
  "request": "BCR-V8-18",
  "id_after": "BCR-V8-18",
  "f_item": 529,
  "base_section": "§16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2"
 }
]

## f_items_concerning
[
 202,
 244,
 256,
 257,
 260,
 322,
 358,
 359,
 388,
 389,
 390,
 391,
 392,
 393,
 394,
 395,
 396,
 397,
 398,
 399,
 410,
 425,
 453,
 453,
 459,
 464,
 464,
 472,
 473,
 480,
 486,
 507,
 508,
 509,
 510,
 511,
 512,
 513,
 516,
 529,
 568,
 572,
 572,
 573,
 583,
 583
]

## agreement_disagreements
[
 {
  "subject": "SettlementForge",
  "with": "V09",
  "rulings": [
   "SCOPE-C07",
   "V08-XCONF-6"
  ]
 },
 {
  "subject": "SettlementForge",
  "with": "V10",
  "rulings": [
   "SCOPE-C07"
  ]
 },
 {
  "subject": "SettlementForge",
  "with": "rendering",
  "rulings": [
   "V08-XCONF-5"
  ]
 },
 {
  "subject": "SettlementForge",
  "with": "scope",
  "rulings": [
   "SCOPE-C07"
  ]
 }
]

## handoffs_to_close
[
 "V02:X9",
 "V06:X5",
 "V06:X23",
 "V06:X29",
 "V06:X44",
 "V06:X47",
 "V09:XV-V9-17",
 "V09:XV-V9-20",
 "V09:XV-V9-21",
 "V09:XV-V9-24",
 "V09:XV-V9-26",
 "V09:XV-V9-29",
 "V10:CVR-V10-3",
 "V10:CVR-V10-14",
 "V11:X-V11-1",
 "V11:X-V11-6",
 "V11:X-V11-15",
 "V11:X-V11-17",
 "V12:X-V12-5",
 "V12:X-V12-16"
]

## bcr_pointer
[
 {
  "id": "V08-0157",
  "bcr": "BCR-V10-22",
  "f_item": 572
 },
 {
  "id": "V08-0158",
  "bcr": "BCR-V8-4",
  "f_item": 508
 },
 {
  "id": "V08-0159",
  "bcr": "BCR-V8-10",
  "f_item": 510
 },
 {
  "id": "V08-0160",
  "bcr": "BCR-V8-15",
  "f_item": 410
 },
 {
  "id": "V08-0161",
  "bcr": "BCR-V8-21",
  "f_item": 394
 },
 {
  "id": "V08-0162",
  "bcr": "BCR-V11-26",
  "f_item": 425
 }
]

## reference
[
 {
  "id": "V08-0009",
  "home_unit": "determinism",
  "home_sec": "§7.7",
  "fact": "DETERMINISM-0241",
  "match": "fact"
 },
 {
  "id": "V08-0029",
  "home_unit": "rendering",
  "home_sec": "§11.3",
  "fact": null,
  "match": "section"
 },
 {
  "id": "V08-0030",
  "home_unit": "scope",
  "home_sec": "§14",
  "fact": "SCOPE-0625",
  "match": "near"
 },
 {
  "id": "V08-0033",
  "home_unit": "determinism",
  "home_sec": "§7.7",
  "fact": "DETERMINISM-0538",
  "match": "fact"
 },
 {
  "id": "V08-0038",
  "home_unit": "scope",
  "home_sec": "§14",
  "fact": "SCOPE-0607",
  "match": "fact"
 },
 {
  "id": "V08-0041",
  "home_unit": "scope",
  "home_sec": "§14",
  "fact": "SCOPE-0610",
  "match": "fact"
 },
 {
  "id": "V08-0042",
  "home_unit": "model",
  "home_sec": "§2.7",
  "fact": "MODEL-0472",
  "match": "fact"
 },
 {
  "id": "V08-0043",
  "home_unit": "pipeline",
  "home_sec": "§10.2",
  "fact": "PIPELINE-0601",
  "match": "fact"
 },
 {
  "id": "V08-0072",
  "home_unit": "scope",
  "home_sec": "§14",
  "fact": "SCOPE-0610",
  "match": "fact"
 },
 {
  "id": "V08-0073",
  "home_unit": "model",
  "home_sec": "§2.7",
  "fact": null,
  "match": "section"
 },
 {
  "id": "V08-0074",
  "home_unit": "determinism",
  "home_sec": "§7.7",
  "fact": null,
  "match": "section"
 },
 {
  "id": "V08-0087",
  "home_unit": "base?",
  "home_sec": null,
  "fact": null,
  "match": "section"
 }
]
