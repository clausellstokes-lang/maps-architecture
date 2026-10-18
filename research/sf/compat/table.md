# SettlementForge match table: the port's 131 rows against the dossier at 00b648c9d (lane catchup/sf-match)

Written 2026-10-03 06:37 by lane catchup/sf-match (Opus seat; PENDING FABLE REVIEW). Inputs: `port-fields.json` (131 rows, the design's side) and `sf-dossier.json` (463 rows, SettlementForge's side). Every MISMATCH and ABSENT verdict below was re-checked against 00b648c9d's own source (a `git archive 00b648c9d src` copy in the session scratchpad); the quoted lines are from that copy. Vocabularies marked "executed" were enumerated by importing SettlementForge's pure data modules from that scratch copy with Node (nothing was run in the checkout, no git state changed).

## Outcome

- 99 MATCH, 28 MISMATCH, 4 ABSENT-WITH-FALLBACK, 0 ABSENT-WITHOUT-FALLBACK over the 131 port rows; 308 of SettlementForge's 463 dossier rows are UNUSED by the port (18 of them flagged as rows the design should read). CONFIRMED by source reads at 00b648c9d unless a row says PLAUSIBLE.
- Every fix is on our side (J121): field-table rows, word rows, key lists and fallbacks. None needs SettlementForge to change and none needs an owner ruling; the numeric values proposed for new word rows (capture, readiness labels, moderate) are ours, PLAUSIBLE until calibrated.
- The required-key list matches exactly: the port's 41 requiredKeys equal SettlementForge's GENERATED_KEYS (set comparison, CONFIRMED).
- Most consequential (major): condition durations are quarter-week units, not weeks (P106/P107); every live stressor also arrives as a promoted twin condition, so a monster-pressure town draws a siege tint and look (P099); a missing condition tick is written as 0 (P104); traditions carry no type, staging or deity and a start-week window (P126); seven income words fall out of the sectors row (P058); 37 government names outside the closed government row fall to chartered commune, Merchant Council and Royal Authority among them (P073); the worst crime rung `capture` has no row (P072); `nearbyResourcesState` speaks allow/abundant/depleted (P019); the new metropolis kind housing_5000_structures has no kinds row (P030); plus the four name/path errors already found from the design side, now CONFIRMED at source (P034 `_worldPulseInactive`, P094 `replacedNpc`, P127 roster `buckets`, P128 `category`), and the lifecycle path (P010).

## 1. The table

Verdicts: MATCH (exists with the shape and values the port expects), MISMATCH (exists but differs), ABSENT-WITH-FALLBACK, ABSENT-WITHOUT-FALLBACK. "SF rows" cite sf-dossier.json row indices (none when the field is outside the sibling's 463 rows).

| id | port path | verdict | SettlementForge at 00b648c9d | evidence | SF rows |
|---|---|---|---|---|---|
| P001 | `id` | MATCH | 's_' + 8+8 hex (FNV-1a of String(_seed), then a mixed second word); content hash when no seed; stamped only when absent | normalizeSettlement.js:63-79, :190-192 | 36 |
| P002 | `name` | MATCH | string, always present | assembleSettlement.js:125 | 0 |
| P003 | `tier` | MATCH | thorp\|hamlet\|village\|town\|city\|metropolis (capital typed, never emitted); AGE_BY_TIER identical to the port row | assembleSettlement.js:126; data/historyData.js:1111-1118 | 1 |
| P004 | `population` | MATCH | integer; generation bands thorp 8-60 ... metropolis 25001-100000; lived growth has no ceiling found (PLAUSIBLE: a metropolis may pass 120 000 and meet the B7 cap refusal) | data/constants.js:13; populationDynamics.js (no cap found) | 2 |
| P005 | `_seed` | MATCH | string; SECRET: the public projection strips it (PRIVATE_KEY_RE matches seed and _config), so only the owner save path carries it | generateSettlementPipeline.js:146; domain/display/publicSafe.js:110 | 33 |
| P006 | `schemaVersion` | MATCH | integer 1; unchanged across the 154 commits | settlementMigrations.js:54 | 40 |
| P007 | `simulationVersion` | MATCH | integer 1 | normalizeSettlement.js:186 | 34 |
| P008 | `generatorVersion` | MATCH | '0.9.0' for both 5d699cc68 and 00b648c9d (cannot tell the lines apart; the host's line field must) | normalizeSettlement.js:187 | 35 |
| P009 | `destroyedByEventId (root)` | MATCH | root string written by DESTROY_SETTLEMENT beside status, destroyedAt, destroyedCause; a top-level key outside both of the port key lists (F-l), so step 3 drops it | mutateEntities.js:66-77 | 69 |
| P010 | `lifecyclePatch (root)` | MISMATCH (major) | no stored lifecyclePatch: it is a world-pulse OUTCOME kind. A death stores root lifecycleStatus (relic_ruin\|abandoned_site), population 0, every institution status 'removed' with fate abandoned_with_the_settlement, npcs[].dispersed, and lifecycleHistory[] {event:'terminal_death', grade, tick, outcomeId}; a resettlement deletes lifecycleStatus, renames, sets tier thorp and appends {event:'resettled', fromGrade, formerName, tick, outcomeId} | settlementLifecycleFirstClass.js:244 `lifecyclePatch: { kind: 'terminal_death', saveId: item.id, ...}` (outcome); :642 `lifecycleStatus: grade,`; :653-656 lifecycleHistory entry; :704-707 resettled entry | - |
| P011 | `config.terrainType` | MATCH | one of the seven TERRAINS (plains, hills, forest, riverside, coastal, mountain, desert); an authored terrainOverride passes through verbatim (older words reach the row's else) | data/worldFactOptions.js:38-43; terrainHelpers.js:23-35 | 447 |
| P012 | `config.tradeRouteAccess` | MATCH | road\|river\|port\|crossroads\|isolated\|mountain_pass\|none | resolveConfig.js:198 | 439 |
| P013 | `config.monsterThreat` | MATCH | safe\|civilized\|frontier\|plagued\|heartland | resolveConfig.js:201 | 442 |
| P014 | `config.magicLevel` | MATCH | none\|low\|medium\|high | resolveConfig.js:200 | 441 |
| P015 | `config.cultureProfileKey` | MATCH | the 11 CULTURES + mixed; mediterranean -> latin; an unknown authored token -> mixed | data/cultureProfiles.js:527-544; data/worldFactOptions.js:46-49 | 444 |
| P016 | `config.nearbyResources[]` | MISMATCH (minor) | the 33 deposit keys (same set as the port row, CONFIRMED by a key diff) PLUS each custom resource's display NAME appended to the same list | resolveResources.js:331 `nearbyResources = [...nearbyResources, name];` (name = the custom definition's name) | 450 |
| P017 | `config.nearbyResourcesNative[]` | MATCH | native deposit keys only | resolveResources.js:277, :538 | 451 |
| P018 | `config.nearbyResourcesDepleted[]` | MISMATCH (minor) | native keys plus custom resource NAMES (flatDepletedBySlug takes definition.name) | resolveResources.js:525 (`flatDepletedBySlug.set(slug, definition.name);`) | 452 |
| P019 | `config.nearbyResourcesState` | MISMATCH (major) | OBJECT keyed by deposit key or custom name; values 'allow' \| 'abundant' \| 'depleted' only. A removal deletes the key; a discovery adds the key to nearbyResources. 'removed' and 'discovered' occur only in resourceHistory[].state | tierResourceDynamics.js:580 `resourcePatch: { saveId: item.id, resource, state: previousDrift?.direction === 'demotion' ? 'abundant' : 'allow' }`; resolveResources.js:243; mutateWorld.js:1030 (`for (const k of keys) delete state[k];`); resourceDynamicsKernel.js:877 | 455 |
| P020 | `config.nearbyResourceDefinitions[]` | MISMATCH (minor) | entries {name, localUid, refId, custom: true, source:'custom', customDefinitionCategory:'resources', customDefinitionId/RevisionId/ContentHash/Version/Fingerprint}; NO category word (the identity projection copies no authored field) | resolveResources.js:310-317 (materializedResource); customDefinitionIdentityProjection.js:8-11 'it must never copy arbitrary authored fields' | 454 |
| P021 | `config.peakTier` | MATCH | tier word, lived (high-water mark); resettlement resets it to thorp | settlementLifecycleKernel.js:721; settlementLifecycleFirstClass.js:697 | 461 |
| P022 | `config.primaryDeitySnapshot._deityRef` | MATCH | frozen embed with _deityRef and name (plus axes); config.primaryDeityRef also carried | deityCommitEmbed.js:131-132; applyWorldPulse.js:242 | 462 |
| P023 | `config.primaryDeitySnapshot.name` | MATCH | name string in the same embed | deityCommitEmbed.js:132 | 462 |
| P024 | `isolationSupport.status` | MATCH | connected\|resilient\|viable\|precarious\|untenable\|magic_supported\|magic_dependent | isolationSupport.js:231 | 377 |
| P025 | `isolationSupport.paths[].type` | MATCH | type local_foodshed\|hinterland\|reserves\|seasonal_access\|patronage\|magical_transit (the port row's six) | isolationSupport.js:232 | 378 |
| P026 | `institutions` | MATCH | array, 7-65 records at birth | assembleSettlement.js:128 | 3 |
| P027 | `institutions[].name` | MISMATCH (minor) | 281 catalogue names; every parenthesised group is in the grammar or the qualifiers row EXCEPT `(high magic)` (3 kinds) and the housing groups `(N-M structures)`, `(5000+ structures)` (housing is told by its kinds row, see P030) | data/institutionalCatalog.js: names `Dream parlors (high magic)`, `Airship docking (high magic)`, `Housing (5000+ structures)` (enumerated by executing the catalogue module) | 80 |
| P028 | `institutions[].category` | MISMATCH (minor) | the 11 SHELF_ORDER words (no 'Essential'); 44 kinds changed shelf since the pin; NON-shelf words occur on non-catalogue records: 'civic' (event-added and pulse-built default), 'academic' (the flourishing Academy), a custom record's free text ('Other' default) | mutateEntities.js:240 `category: event.payload?.category \|\| 'civic',`; institutionLifecycle.js:985 `category: patch.category \|\| 'civic',`; upswingKernel.js:763 `category: 'academic'`; institutionalCatalog.js:46-49 | 81 |
| P029 | `institutions[].id` | MATCH | 'institution.<stablePart(name)>' on pulse/event-minted records; none at generation | institutionLifecycle.js:983; mutateEntities.js:240 | 116 |
| P030 | `institutions[].catalogId` | MISMATCH (major) | slug of the name; 281 kinds now; one NEW kind housing_5000_structures (metropolis housing stock, replacing housing_1000_5000_structures in the metropolis block) that V11's kinds table (280 rows, every other id present) lacks; 44 shelf annotations in that table are stale | catalogIdForName('Housing (5000+ structures)') = 'housing_5000_structures' (executed); V11-content.md:2676-2677 list only housing_1000_5000_structures and housing_180_1000_structures as `@housing` | 100 |
| P031 | `institutions[].priorityCategory` | MATCH | exactly the port row's 12 words (economy, religion, government, infrastructure, defense, military, criminal, crafts, magic, entertainment, adventuring, exotic) | catalogue enumeration (executed); coherenceRepairPass.js:519-525 re-stamps druids | 86 |
| P032 | `institutions[].tags[]` | MATCH | catalogue uses 44 tags, all in the port row (entityTags vocabulary is a subset of the row) | data/entityTags.js:40; catalogue enumeration (executed) | 85 |
| P033 | `institutions[].status` | MATCH | active\|impaired\|removed\|destroyed\|vacant + ruined + remnant | entities/status.js:107; calamityKernel.js:252; institutionLifecycle.js:1020 | 117 |
| P034 | `institutions[].inactive (field table) / _worldPulseInactive (base F2, item 14)` | MISMATCH (major) | the flag is `_worldPulseInactive`; no `inactive` key exists on any record (factionCompetition's `inactive` is a derived projection, not stored) | institutionLifecycle.js:1021 `_worldPulseInactive: true,`; factionCompetition.js:162 `inactive: entry._worldPulseInactive === true,` (projection) | 121 |
| P035 | `institutions[].worldPulseFate` | MATCH | SF's closed set of 18 (worldPulseFates.js) equals the port's 18 word for word; null clears a fate | worldPulseFates.js:56-75 | 119 |
| P036 | `institutions[].remnantReason` | MISMATCH (minor) | prose sentence, not a receipt word (e.g. 'Closed after sustained economic decline (bankrupt).') | institutionLifecycle.js:1025 `remnantReason: \`Closed after sustained economic decline (${fate.replace(/_/g, ' ')}).\`,` | 120 |
| P037 | `institutions[].impairments[]` | MATCH | {type, severity 0-1, causeEventId, description, appliedAt, covert?}; the nine types of the port row | entities/status.js:124; mutateEntities.js:193-200 | 118 |
| P038 | `institutions[].knownTo` | ABSENT-WITH-FALLBACK (minor) | no knownTo field anywhere in src (word-bounded grep: zero hits) | grep -rwn knownTo src/ -> no match | - |
| P039 | `institutions[].facets` | MISMATCH (minor) | object whose values are STRINGS: {clandestine: 'clandestine', subterranean: 'subterranean'}, not booleans | institutionalCatalog.js:1440 `facets: { clandestine: 'clandestine', subterranean: 'subterranean' }` | 97 |
| P040 | `institutions[].forbiddenResources[]` | MATCH | deposit keys | institutionalCatalog.js:1440 | 93 |
| P041 | `institutions[].foundedAt` | MATCH | {year, tick} write-once on a new pulse institution | institutionLifecycle.js:994 | 124 |
| P042 | `institutions[].demotedFrom` | MATCH | string (former name) beside fate demoted_by_disaster; record id re-minted for the lesser, catalogId kept (not one of sf-dossier's 463 rows) | calamityKernel.js:317 `demotedFrom: name,` | - |
| P043 | `institutions[].promotedFrom` | MATCH | string (former name) beside fate upgraded_by_reconstruction (not in the 463 rows) | upswingKernel.js:516 `promotedFrom: upgrade.from` | - |
| P044 | `institutions[].createdByEventId` | MATCH | event id stamped by ADD_INSTITUTION (not in the 463 rows) | mutateEntities.js:244 `createdByEventId: event.id,` | - |
| P045 | `institutions[].removedByEventId` | MATCH | event id stamped by REMOVE_INSTITUTION (not in the 463 rows) | mutateEntities.js:187 `removedByEventId: event.id` | - |
| P046 | `institutions[].…ByWorldPulseOutcomeId (createdBy, closedBy, foundedBy, reopenedBy, …)` | MATCH | six stamps: created/closed/demoted/founded/removed/reopenedByWorldPulseOutcomeId; every outcome id ends `.${tick}` (the week) | tierResourceDynamics.js:223; settlementLifecycleFirstClass.js:213; candidateEvents.js:268 | 125 |
| P047 | `institutions[].source` | MATCH | always present (required\|generated\|forced\|nearbyResources\|cascade\|faction_boost\|coherence_repair\|custom); 'custom' marks custom | assembleInstitutions.js:503, :708 | 99 |
| P048 | `institutions[].localUid` | MATCH | custom identity | assembleInstitutions.js:713 | 112 |
| P049 | `institutions[].customDefinitionId` | MATCH | customDefinitionId | customDefinitionIdentityProjection.js:17-21 | 114 |
| P050 | `institutions[].customDefinitionRevisionId` | MATCH | customDefinitionRevisionId | customDefinitionIdentityProjection.js:17-21 | 114 |
| P051 | `institutions[].customDefinitionContentHash` | MATCH | customDefinitionContentHash | customDefinitionIdentityProjection.js:17-21 | 114 |
| P052 | `institutions[].description` | MATCH | custom record prose (catalogue records carry `desc` instead) | assembleInstitutions.js:712 | 111 |
| P053 | `institutions[].required` | MATCH | on a custom record = the author's essential flag (required: essential); on catalogue records the tier core | assembleInstitutions.js:706 | 82 |
| P054 | `institutions[].sceneProfileId` | MATCH | present only when authored and registered: 17 profiles (PLAUSIBLE -> CONFIRMED) | customBuildingPresentation.js:255-258 | 115 |
| P055 | `institutions[].landmarkLevel` | MATCH | standard \| landmark (legacy scenePresentation.landmark boolean converted) | customBuildingPresentation.js:48-51, :264-271 | 115 |
| P056 | `institutions[].materialFamily` | MATCH | brick \| marble \| ruined-stone \| steel \| stone \| timber (the port row's six) | customBuildingPresentation.js:40-46, :273-278 | 115 |
| P057 | `economicState.prosperity` | MATCH | the seven words of the wealth row | economicState.js:866 | 127 |
| P058 | `economicState.incomeSources[]` | MISMATCH (major) | source words outside the sectors row: 'Subsistence Production', 'Church Tithes & Rents', 'Pilgrim Trade', 'Military Extraction', 'Enchanted Goods Premium', 'Security Contracts', 'Shadow Economy (untaxed)' (all at the pin too; SF's own closed list is treasury.js INCOME_SOURCE_FORMS) | economicState.js:364 `source: 'Subsistence Production',`; :230 'Church Tithes & Rents'; :243 'Pilgrim Trade'; :203 'Military Extraction'; :310 'Enchanted Goods Premium'; :325 'Security Contracts'; :351 'Shadow Economy (untaxed)'; treasury.js:341-401 | 129 |
| P059 | `economicState.primaryExports[]` | MATCH | label strings | economicState.js:874 | 130 |
| P060 | `economicState.primaryImports[]` | MATCH | label strings | economicState.js:875 | 131 |
| P061 | `economicState.necessityImports[]` | MATCH | label strings | economicState.js:880 | 135 |
| P062 | `economicState.transit[]` | MATCH | label strings | economicState.js:877 | 132 |
| P063 | `economicState.isEntrepot` | MATCH | boolean | economicState.js:878 | 133 |
| P064 | `economicState.tradeLinks[]` | MATCH | {good, goodId, direction import\|export, partner NAME, viaNeighbour, viaCategory?} | tradeLinks.js:59; generateEconomy.js:251 | 150,151,152,153,154 |
| P065 | `economicState.compound.inst.hasWalls` | MATCH | compound.inst holds hasWalls (name test over walls, citadel, gates (if walled), palisade, earthwork ...) | priorityHelpers.js:56; economicState.js:883 | 138 |
| P066 | `economicState.foodSecurity.importPct` | MATCH | Math.round(importDependency * 100): percent 0-100 | foodGenerator.js:192, :445 | 202 |
| P067 | `economicState.foodSecurity.chains` | MATCH | object of the five chain names -> boolean | foodGenerator.js:149-155 | 196 |
| P068 | `economicState.activeChains[]` | MATCH | status running\|operational\|vulnerable\|impaired\|entrepot (inside the chainStatus row); 11 needKeys | computeActiveChains.js:373-432 | 142,162,182,158,165,166,172,173,163,184 |
| P069 | `economicState.tradeDependencies[]` | MATCH | severity only 'critical' \| 'vulnerable' (both in the row); institution NAME | economicState.js:715-728 | 140 |
| P070 | `economicState.customChains[]` | MATCH | every confirmed chain with status = activation.state (active\|blocked\|ineligible) and the port's fields; the port's double test is right (closes the row's PLAUSIBLE: SF lists blocked and ineligible chains too) | customSupplyChainActivation.js:948-976 | 149 |
| P071 | `economicState.safetyProfile.blackMarketCapture` | MATCH | blackMarketCapture = min(80, base + stress bonus): percent | safetyProfile.js:638 | 139 |
| P072 | `powerStructure.criminalCaptureState` | MISMATCH (major) | five-rung ladder none\|adversarial\|equilibrium\|corrupted\|capture; 'capture' (the worst) is produced at generation and by the pulse; the crime row has no 'capture' and no else for a present word | factionDynamics.js:225 `if (crimP > govP * 1.5 && crimP >= 24 && govP >= 15 && safetyRatio < 0.35) return 'capture';`; factionCapture.js:137 | 222 |
| P073 | `powerStructure.government` | MISMATCH (major) | government = the governing faction's name. Beyond the row's 18 names SF produces 37 more - at generation (22): Elder Consensus, Grand Guild Council, Guild Authority, Grand Merchant Oligarchy, Democratic assembly, City-State Council, Royal Authority, Headman's Authority, Military Council, Military City Council, Grand Military Council, Church Council's siblings Ecclesiastical Council and High Theocratic Council, Priestly Guidance, Merchant Council, Grand Merchant Senate, Corrupt Council, Corrupt City Council, Shadow Senate, Arcane Council, Arcane Senate, Town Mayor; after a transfer of power (15): Militia Command, Theocratic Council, Noble Regency, Garrison Command, Circle of Adepts, Guildmasters' Moot, Guildhall Council, Grand Guild Assembly, Commons Assembly, Workers' Assembly, Grand Commons Assembly, Foreign Stewardship, Foreign Administration, Occupation Authority, Martial Administration | rulingStructure.js:160-176 (governanceLabelMap; 'village headman': "Headman's Authority" added J23 2026-09-30), :219-249 (council variants), :254-307; rulingPower.js:157-186 (GOVERNMENT_PREFERENCES, ALT_GOVERNMENT_LABELS) | 217 |
| P074 | `powerStructure.publicLegitimacy.score` | MATCH | score 0-100 in publicLegitimacy | rulingStructure.js:795 | 220 |
| P075 | `powerStructure.previousGovernments[].tick` | MATCH | {label, cause, tick} | rulingPower.js:637-640 | 226 |
| P076 | `powerStructure.factions[].faction` | MATCH | power NAME (identity key) | rulingStructure.js:457 | 215,227 |
| P077 | `powerStructure.factions[].category` | MISMATCH (minor) | generation: military\|religious\|criminal\|economy\|government\|noble\|magic\|other (the row's words); LIVED: a transfer of power stamps the seat's archetype word (government, noble, military, merchant, religious, criminal, arcane, craft, labor, outsider, occupation, civic) and the conquest occupier carries category 'occupation' | rulingPower.js:534 `const seatCategory = archetype === A.OTHER ? null : archetype;` and :542; applyWorldPulseOccupationAuthority.js:169 `category: 'occupation',`; factionArchetypes.js:34-47 | 233 |
| P078 | `powerStructure.factions[].power` | MATCH | integer share, roster sums to 100 | rulingStructure.js:459 | 228 |
| P079 | `powerStructure.factions[].isGoverning` | MATCH | true on one | rulingStructure.js:461 | 232 |
| P080 | `powerStructure.factions[].controlledInstitutions` | MATCH | stablePart(id\|\|name) of the first 12 roster rows | factionCompetition.js:155-166, :907 | 238 |
| P081 | `powerStructure.factionRelationships[].pair` | MATCH | [nameA, nameB] | factionDynamics.js:312 | 221,241 |
| P082 | `powerStructure.factionRelationships[].type` | MATCH | exactly the row's six (competitive, corrupted, dependent, subordinate, symbiotic, tense) | factionDynamics.js (every type assignment); rulingPower.js:620-633 | 242 |
| P083 | `powerStructure.factionRelationships[].direction` | MATCH | stable\|escalating\|declining | factionDynamics.js:307-310, :363 | 243 |
| P084 | `neighborRelationship` | MATCH | nine relationship types; the base weight rule zeroes only 'hostile' and counts every other type's links, so all nine are covered | neighbourGenerator.js:171-181; ARCHITECTURE.md l.12478-12480 | 6,419,420,421,429 |
| P085 | `neighbourNetwork[]` | MATCH | {id generated_*\|link_*\|live_*, name, relationshipType, ...}: a SAVED-ONLY top-level key outside both port key lists (F-k), so step 3 drops it | saves.js:357-365; recordRegister.js:62 | 72 |
| P086 | `npcs[].id` | MATCH | 'npc_<n>' \| 'npc.<faction>_<role>_<i>' \| 'npc.successor_<n>' | npcGenerator.js:1631 | 248 |
| P087 | `npcs[].name` | MATCH | string | npcGenerator.js:131 | 249 |
| P088 | `npcs[].role` | MATCH | string | npcGenerator.js:133 | 251 |
| P089 | `npcs[].category` | MATCH | string | npcGenerator.js:135 | 253 |
| P090 | `npcs[].factionAffiliation` | MATCH | power NAME | npcGenerator.js:1190 | 262 |
| P091 | `npcs[].institution` | MATCH | institution NAME | npcGenerator.js:295 | 264 |
| P092 | `npcs[].importance` | MATCH | pillar\|key\|notable\|minor on structural seats; event kills infer it | factionRoles.js:250; mutateEntities.js:526 | 269 |
| P093 | `npcs[].status` | MISMATCH (minor) | NpcStatus = active\|dead\|exiled\|jailed\|missing\|removed\|retired (no 'gone'); a settlement death marks every notable `dispersed: true` (+ dispersedAtTick) without a status; an ousted notable is replaced in place (successor's replacedNpc) | entities/npcs.js:122 `export const NPC_STATUS_VALUES = Object.freeze(['active', 'dead', 'exiled', 'jailed', 'missing', 'removed', 'retired']);`; settlementLifecycleFirstClass.js:629 `{ ...npc, dispersed: true, dispersedAtTick: tick, dispersalNote }` | 269 |
| P094 | `npcs[].replacedBy (field table) / replacedNpc (base key law, J-V8.76)` | MISMATCH (major) | `replacedNpc` holds the ousted notable's NAME; no `replacedBy` key exists | successorNpc.js:51 `replacedNpc: ousted.name \|\| null,` | 271 |
| P095 | `spatialLayout.quarters[].name` | MATCH | the 14 fixed names, all covered by the base's quarter rows (item 82) | spatialGenerator.js:64-218; ARCHITECTURE.md l.12993-12998 | 298,300 |
| P096 | `spatialLayout.quarters[].location` | MATCH | 14 phrases (Waterfront: Along the coast \| Along the river), all covered by the soft-row list | spatialGenerator.js:65-218; ARCHITECTURE.md l.12998-13003 | 301 |
| P097 | `spatialLayout.quarters[].landmarks[]` | MATCH | institution names or fixed strings | spatialGenerator.js:67 | 303 |
| P098 | `activeConditions[].id` | MATCH | 'condition.<archetype>.<suffix>' stable once stored | activeConditions.js:590-604, :645-653 | 37,404 |
| P099 | `activeConditions[].archetype` | MISMATCH (major) | 46 template archetypes (activeConditions.js:58) plus pulse words; 20 template words have no conditions row (alliance_burden, government_overthrown, coup_suppressed, magical_instability, cold_war_sanctions, siege_lifted, war_drain, army_deployed, war_exhaustion, war_mobilization, reinforcement_cost, occupation_lifted, relief_burden, trade_realignment, vassal_trade_coercion, trade_embargo, occupation_resistance, occupation_burden, war_spoils, flourishing). AND every live stressor is promoted to a TWIN condition under a mapped archetype (monster_pressure, under_siege, wartime -> war_pressure; occupied -> vassal_extraction; plague_onset -> plague; mass_migration -> regional_migration_pressure; insurgency, slave_revolt -> rebellion; ...), stamped sourceEventType 'GENERATION' (or the authoring event) | conditionPromotion.js:63 `{ re: /monster\|raider/i, archetype: 'war_pressure' },`; :29-72; activeConditions.js:58 | 405 |
| P100 | `activeConditions[].label` | MATCH | string (template label when absent) | activeConditions.js:661 | 406 |
| P101 | `activeConditions[].severity` | MATCH | number clamped 0-1 | activeConditions.js:625-627 | 408 |
| P102 | `activeConditions[].severityBand` | MATCH | low\|medium\|high\|critical | activeConditions.js:664 | 409 |
| P103 | `activeConditions[].status` | MATCH | worsening\|stable\|easing | activeConditions.js:644-646 | 410 |
| P104 | `activeConditions[].triggeredAt.tick` | MISMATCH (major) | ALWAYS present: a missing tick is written as 0. Generation-promoted, authored-event (PLAGUE, REFUGEE_WAVE, CUT_TRADE_ROUTE, ...) and calamity-aftermath conditions carry 0 whatever the week; only pulse writers stamp the world tick. The calamity's own aftermath condition carries its week only in its id ('condition.disaster_response.<tick>') | activeConditions.js:630 `tick: condition.triggeredAt?.tick ?? 0,`; mutateWorld.js:526 `triggeredAt: { sourceEventType: 'REFUGEE_WAVE', sourceEventTargetId: event.targetId \|\| null },`; calamityKernel.js:396-398 | 411,415 |
| P105 | `activeConditions[].triggeredAt.sourceEventType` | MISMATCH (minor) | about 45 source words. PLAGUE and REFUGEE_WAVE do occur (authored, tick 0); RAID_OR_MONSTER_ATTACK NEVER raises a condition: it appends config._raidHistory[] {source, severity, atEventId, atTimestamp} and impairs a target | mutateWorld.js:591-604 (raidOrMonsterAttack writes `config: { ...config, _raidHistory: raids }`, no withActiveCondition) | 411 |
| P106 | `activeConditions[].duration.elapsedTicks` | MISMATCH (major) | elapsedTicks is in CONDITION-DURATION units, not weeks: +0.25 per one-week tick (the campaign advance runs N one-week kernel calls), +1.0 per month, 2.25 per season, 6.0 per year on the standalone time-progression path. On the campaign line weeks = 4 x elapsedTicks while the advanceMultiTick flag stands at its default (on); with that killswitch off one kernel call spans the whole chosen interval, so neither tick = week nor the x4 rule holds (PLAUSIBLE rare) | activeConditions.js:829 `one_week:   0.25,` and :876 `const elapsedTicks = canonical.duration.elapsedTicks + increment;`; advanceInterval.js:511 `interval: 'one_week',`; lib/flagRegistry.js:88 `advanceMultiTick: true,`; campaignAdvanceSession.js:614 | 412,416 |
| P107 | `activeConditions[].duration.expiresAtTicks` | MISMATCH (major) | expiresAtTicks is a whole-length cap in the same units (expiry when elapsedTicks >= cap), e.g. 6 = 24 weeks of campaign time; null = open-ended | activeConditions.js:937 `if (typeof cap === 'number' && canonical.duration.elapsedTicks >= cap) {` | 412,416 |
| P108 | `stressors` | MATCH | null \| object \| array; type in the 15 stressor words, all in the conditions row; NOTE each one also arrives as a promoted twin condition (P099) | stressGenerator.js:57; conditionPromotion.js:29-72 | 23,402 |
| P109 | `history.age` | MATCH | integer years within AGE_BY_TIER | historyGenerator.js:900; historyData.js:1111-1118 | 346 |
| P110 | `history.founding.age` | MATCH | {age, reason, foundedBy, ...} | historyGenerator.js:901 | 347 |
| P111 | `history.historicalEvents[].type` | MISMATCH (minor) | generation: type = one of the 8 category words; LIVED (campaign-era) entries put a TEMPLATE word in type (external_threat, occupation_legacy, resource_scarcity, outside_debt, crime_wave, infiltration_fear, corruption_scandal, succession_crisis, leadership_vacuum, guild_conflict, population_friction, religious_tension, magical_controversy) with no templateType, and the lifecycle writer uses 'decline' / 'founding' | stressorAftermath.js:162 `type: ... (HISTORY_EVENT_TYPE)[echo.type] \|\| 'external_threat',`; settlementLifecycleFirstClass.js:664 `type: 'decline',`, :718 `type: 'founding',` | 348,350 |
| P112 | `history.historicalEvents[].templateType` | MATCH | 29 data templates; 25 are drawable as templateType (TIMELINE_CATEGORY_TYPES); all nine named rows exist; demographic_pressure is never drawn (a dead row). Census PLAUSIBLE -> CONFIRMED | historyGenerator.js:592, :639; history/historyPolicyData.js:27-60; historyData.js:1120 | 356 |
| P113 | `history.historicalEvents[].yearsAgo` | MATCH | number years | historyGenerator.js:289 | 349 |
| P114 | `history.historicalEvents[].severity` | MISMATCH (minor) | minor\|major\|catastrophic at generation; lived entries also write 'moderate' | stressorAftermath.js:58 `if (peak >= 0.35) return 'moderate';` | 353 |
| P115 | `history.historicalEvents[].name` | MATCH | string; the opt-in ancient fall is "The Fall of <ruin>" | historyGenerator.js:291, :887 | 351 |
| P116 | `history.historicalEvents[].anchored` | MATCH | boolean, conditional | historyGenerator.js:640, :894 | 356 |
| P117 | `history.historicalEvents[].tick` | MATCH | world tick on campaign-era entries (yearsAgo 0) | stressorAftermath.js:157-159; settlementLifecycleFirstClass.js:532 | 357 |
| P118 | `history.historicalEvents[] ancientRuin marker (path not named)` | MATCH | the marker is `history.historicalEvents[].ancientRuin: true` on the 'The Fall of <ruin>' event (type disaster, severity catastrophic), and history.ancientRuin = {name, yearsAgo} with yearsAgo = age + 120..400 (from the PRESENT, not from the founding). Path PLAUSIBLE -> CONFIRMED (F-j) | historyGenerator.js:882-905 | 360 |
| P119 | `tierHistory[]` | MATCH | {fromTier, toTier, direction, outcomeId, institutionFates[]}; no tick; outcomeId ends with the week | tierOutcomeApply.js:379; tierResourceDynamics.js:223 | 57 |
| P120 | `populationHistory[]` | MATCH | {tick\|null, delta, population, reason, outcomeId}, last 12 | populationDynamics.js:599-606 | 51,52,54 |
| P121 | `calamityHistory[]` | MATCH | {type (terrain flavour hint), name, year, tick, deaths, exodus, k, targets[] NAMES, flavorText?}, last 8 | calamityKernel.js:491-504 | 60 |
| P122 | `institutionHistory[]` | MATCH | {name, category, fate, tier, outcomeId, reason} + {year, tick} when stamped; the join field is `name` (closes F-h) | institutionLifecycle.js:912-917, :997-1004 | 58 |
| P123 | `resourceHistory[]` | ABSENT-WITH-FALLBACK (minor) | entries {resource, state, outcomeId, reason}: NO tick (both writers); state = depleted \| allow \| abundant \| discovered \| removed; outcomeId ends `.${tick}` | tierResourceDynamics.js:732-740 `{ resource, state, outcomeId: outcome.id, reason: ... }`; resourceDynamicsKernel.js:877 | 59 |
| P124 | `defenseProfile.readiness.label` | MISMATCH (minor) | labels Fortress \| Well-Defended (hyphen) \| Defensible \| Lightly Defended \| Vulnerable \| Undefended; the score is ALWAYS written, so the label rung never decides today | bandLadders.js:40 `label: 'Well-Defended'`, :41 'Defensible', :44 'Undefended'; defenseGenerator.js:525 `return { score: readiness, label: band.label, ... }` | 365 |
| P125 | `defenseProfile.readiness.score` | MATCH | score 0-100, always present | defenseGenerator.js:519, :525 | 365 |
| P126 | `traditions[]` | MISMATCH (major) | TraditionRec[] {id, coreMotif {element, act}, name, foundedYear, window {startWeekOfYear 1..52, weeks 1\|2}, scaleBand 0..6, ownerKey, ownerKind, ownerLabel, deityRef, expression {trappings[], epithet}, mutationLog, lastHeldYear, lastOutcome, suppressedBy, adoptedFrom}: NO type, NO staging, NO deity; the window is a start week and a length, not a from/to | domain/traditions/genesis.js:306-324 (assembleRec); :80-82 `@property {number} startWeekOfYear  1..52` / `weeks 1 or 2` | 63 |
| P127 | `customContentRoster.traditions` | MISMATCH (major) | custom traditions live at customContentRoster.buckets.traditions (rows {source custom, isCustom, customDefinitionCategory, localUid?, identity, declared fields}); present only when _livingContentLawVersion is 2 | livingContentRoster.js:266-269 `return Object.freeze({ schemaVersion: ..., buckets: Object.freeze(buckets), });` | 50 |
| P128 | `customContentProvenance.materializedDefinitions[]` | MISMATCH (major) | entries {category, definitionId, revisionId, contentHash, localUid, name, surfaces[]}: the bucket field is named `category`, and it ranges over nine categories (deities, factions, institutions, resources, services, stressors, supplyChains, tradeGoods, traditions) | settlementContentProvenance.js:265-272 `return { category, definitionId, revisionId, contentHash, localUid: ..., name: ... };`; :44-54 | 46 |
| P129 | `customContentRoster (institutions, services, resources, supply chains)` | ABSENT-WITH-FALLBACK (minor) | no institutions/services/resources/supply-chain buckets: LIVING_CONTENT_BUCKETS is deities, factions, stressors, traditions only; a custom institution's definition fields are not on the dossier (D05) | livingContentLaw.js:151-156 `export const LIVING_CONTENT_BUCKETS = Object.freeze(['deities', 'factions', 'stressors', 'traditions',]);` | 48 |
| P130 | `availableServices.<category>[] (custom entries)` | MATCH | {name, desc, institution NAME, identity, custom: true, source, customDefinitionCategory, localUid} | serviceRollMaterialization.js:67-87 | 304,305,307,308 |
| P131 | `presentWeek (composite: max of activeConditions[].triggeredAt.tick, calamityHistory[].tick, history.historicalEvents[].tick, populationHistory[].tick, institutionHistory[].tick, resourceHistory[].tick, powerStructure.previousGovernments[].tick)` | ABSENT-WITH-FALLBACK (minor) | no current-week stamp on the dossier (D04). Of the composite's sources, resourceHistory[].tick never exists and triggeredAt.tick is 0 on unstamped conditions; unread stamps exist: economicState.treasury.lastTick (every tick, treasuryEnabled), foodSecurity.stockpile.lastTick (last change), powerStructure.factions[].updatedByPulse, lifecycleHistory[].tick, urbanFabric scars/rebirths week, institutions[].foundedAt.tick | treasury.js:1169 (lastTick each tick, per sf-dossier); foodStockpile.js:410-459; factionCompetition.js:655 | - |

## 2. Mismatches and absences, each with its fix on our side

### P010 `lifecyclePatch (root)` - MISMATCH (major)

- SettlementForge: no stored lifecyclePatch: it is a world-pulse OUTCOME kind. A death stores root lifecycleStatus (relic_ruin|abandoned_site), population 0, every institution status 'removed' with fate abandoned_with_the_settlement, npcs[].dispersed, and lifecycleHistory[] {event:'terminal_death', grade, tick, outcomeId}; a resettlement deletes lifecycleStatus, renames, sets tier thorp and appends {event:'resettled', fromGrade, formerName, tick, outcomeId}
- Source (00b648c9d): settlementLifecycleFirstClass.js:244 `lifecyclePatch: { kind: 'terminal_death', saveId: item.id, ...}` (outcome); :642 `lifecycleStatus: grade,`; :653-656 lifecycleHistory entry; :704-707 resettled entry
- Port expected: object (terminal death / resettlement; resettlement forces thorp); values: resettled + its tick; fallback: none: no destruction or refounding (DR38)
- Fix (ours): read root lifecycleStatus and lifecycleHistory[] (event, grade/fromGrade, formerName, tick) for DR38 death/refounding and history.lifecycle; add both to optionalKeys (read: true); drop the lifecyclePatch row

### P016 `config.nearbyResources[]` - MISMATCH (minor)

- SettlementForge: the 33 deposit keys (same set as the port row, CONFIRMED by a key diff) PLUS each custom resource's display NAME appended to the same list
- Source (00b648c9d): resolveResources.js:331 `nearbyResources = [...nearbyResources, name];` (name = the custom definition's name)
- Port expected: list of deposit keys; values: the `deposits` row: iron_deposits, precious_metals, gemstone_deposits, coal_deposits, stone_quarry, managed_forest, mountain_timber, shipbuilding_timber, ancient_grove, fishing_grounds, river_fish, river_clay, glass_sand, grain_fields, fertile_floodplain, grazing_land, alpine_pasture, camel_herds, date_palms, salt_flats, desert_salt, marshlands, hunting_grounds, foraging_areas, deep_harbour, river_mills, hot_springs, hot_springs_mineral, magical_node, ancient_ruins, crossroads_position, defended_pass, oasis_water; else commons, noted; fallback: none: no deposit and no land use beyond §4.9's rings; no oasis (DR40); a record's hard land-use need derives `res:derived:<landuse>`
- Fix (ours): deposit rows read config.nearbyResources minus the names in config.nearbyResourcesCustom (custom resources come only from nearbyResourceDefinitions); otherwise every custom resource is read twice, once as an unknown key (commons, noted)

### P018 `config.nearbyResourcesDepleted[]` - MISMATCH (minor)

- SettlementForge: native keys plus custom resource NAMES (flatDepletedBySlug takes definition.name)
- Source (00b648c9d): resolveResources.js:525 (`flatDepletedBySlug.set(slug, definition.name);`)
- Port expected: list of deposit keys; values: a listed key -> state `depleted` (drawn worked out); fallback: none depleted
- Fix (ours): as P016: skip names listed in config.nearbyResourcesCustom; read custom depletion from config.nearbyResourceDefinitionsDepleted

### P019 `config.nearbyResourcesState` - MISMATCH (major)

- SettlementForge: OBJECT keyed by deposit key or custom name; values 'allow' | 'abundant' | 'depleted' only. A removal deletes the key; a discovery adds the key to nearbyResources. 'removed' and 'discovered' occur only in resourceHistory[].state
- Source (00b648c9d): tierResourceDynamics.js:580 `resourcePatch: { saveId: item.id, resource, state: previousDrift?.direction === 'demotion' ? 'abundant' : 'allow' }`; resolveResources.js:243; mutateWorld.js:1030 (`for (const k of keys) delete state[k];`); resourceDynamicsKernel.js:877
- Port expected: per-deposit state map; values: available | depleted | removed | discovered (`discovered` opens at the next epoch; removed oasis_water = V06's failing spring); fallback: available
- Fix (ours): map allow and abundant -> available, depleted -> depleted (else available, noted); container = object (closes the port row's open shape question); read 'removed' and 'discovered' from resourceHistory[] (dated by its outcomeId suffix, see P123) or from key presence in nearbyResources

### P020 `config.nearbyResourceDefinitions[]` - MISMATCH (minor)

- SettlementForge: entries {name, localUid, refId, custom: true, source:'custom', customDefinitionCategory:'resources', customDefinitionId/RevisionId/ContentHash/Version/Fingerprint}; NO category word (the identity projection copies no authored field)
- Source (00b648c9d): resolveResources.js:310-317 (materializedResource); customDefinitionIdentityProjection.js:8-11 'it must never copy arbitrary authored fields'
- Port expected: list of custom resource entries {name, localUid, refId, custom, definition ids (revision, contentHash)}; values: custom: true selects the entry; resource family from its carried definition `category` (water | land | special | subterranean), else its name's keywords, else land; fallback: none: no custom resource
- Fix (ours): drop the carried-category rung from the resource-family rule (it never fires); the family comes from the name keywords, else land; keep the row note that a definition category would need SF to carry it (D05)

### P027 `institutions[].name` - MISMATCH (minor)

- SettlementForge: 281 catalogue names; every parenthesised group is in the grammar or the qualifiers row EXCEPT `(high magic)` (3 kinds) and the housing groups `(N-M structures)`, `(5000+ structures)` (housing is told by its kinds row, see P030)
- Source (00b648c9d): data/institutionalCatalog.js: names `Dream parlors (high magic)`, `Airship docking (high magic)`, `Housing (5000+ structures)` (enumerated by executing the catalogue module)
- Port expected: non-empty string with the name grammar; values: `(lo-hi+)` count + openTop; `(lo-hi)` count; `(n+ only)` popQualifier; other parenthesised words -> qualifiers (`qualifiers` row: multiple->COUNT, guild->GUILD, district / red light district->QUARTER, established->SIZE; commercial, part-time, official, if walled, resident, open cast, word of mouth, divine 1st level, powerful -> no step); thousands separators allowed; fallback: none (record quarantined)
- Fix (ours): add `high magic` -> no step (kept in the label) to the qualifiers row; the row's 'fourteen words' becomes fifteen

### P028 `institutions[].category` - MISMATCH (minor)

- SettlementForge: the 11 SHELF_ORDER words (no 'Essential'); 44 kinds changed shelf since the pin; NON-shelf words occur on non-catalogue records: 'civic' (event-added and pulse-built default), 'academic' (the flourishing Academy), a custom record's free text ('Other' default)
- Source (00b648c9d): mutateEntities.js:240 `category: event.payload?.category || 'civic',`; institutionLifecycle.js:985 `category: patch.category || 'civic',`; upswingKernel.js:763 `category: 'academic'`; institutionalCatalog.js:46-49
- Port expected: string; values: Adventuring | Crafts | Criminal | Defense | Economy | Entertainment | Exotic | Government | Infrastructure | Magic | Religious | Essential (`categories` row; else trade, noted); a custom record's free text <= 100 chars matched against the rows, SF's eight content groups and V11's synonyms; fallback: none (record quarantined)
- Fix (ours): run the custom-text matching chain (SF's content groups, then V11's synonyms) for EVERY category word outside the 11 shelves, not only for custom records, so 'civic' -> civic-authority and 'academic' -> its synonym row instead of trade; update V11's kinds-table shelf annotations for the 44 moved kinds

### P030 `institutions[].catalogId` - MISMATCH (major)

- SettlementForge: slug of the name; 281 kinds now; one NEW kind housing_5000_structures (metropolis housing stock, replacing housing_1000_5000_structures in the metropolis block) that V11's kinds table (280 rows, every other id present) lacks; 44 shelf annotations in that table are stale
- Source (00b648c9d): catalogIdForName('Housing (5000+ structures)') = 'housing_5000_structures' (executed); V11-content.md:2676-2677 list only housing_1000_5000_structures and housing_180_1000_structures as `@housing`
- Port expected: catalogue kind key; values: 280 kinds at the pinned line (catalogue manifest); missing on ~12 % of birth records and on every simulator-built record; a renamed record keeps the OLD kind's catalogId; fallback: binds by `inst:uid:` or `inst:name:`; class by name, category and tags (DR24 rungs c-e), noted unmapped_kind
- Fix (ours): add `housing_5000_structures` (Infrastructure) | M | `@housing` to V11's kinds table and regenerate the catalogue manifest for line 00b648c9d (T-V11-2's totality would otherwise fail or send the metropolis housing record to generic-infrastructure, unbounding S2's residential count); refresh the 44 shelf annotations

### P034 `institutions[].inactive (field table) / _worldPulseInactive (base F2, item 14)` - MISMATCH (major)

- SettlementForge: the flag is `_worldPulseInactive`; no `inactive` key exists on any record (factionCompetition's `inactive` is a derived projection, not stored)
- Source (00b648c9d): institutionLifecycle.js:1021 `_worldPulseInactive: true,`; factionCompetition.js:162 `inactive: entry._worldPulseInactive === true,` (projection)
- Port expected: boolean flag; values: true with status remnant = a closure; fallback: false
- Fix (ours): field table row (F-b): read `_worldPulseInactive`, plus the F1 flags `_worldPulseEconomyClosed` and `_worldPulseEconomyBuilt`; keyList and T-V8-20 follow

### P036 `institutions[].remnantReason` - MISMATCH (minor)

- SettlementForge: prose sentence, not a receipt word (e.g. 'Closed after sustained economic decline (bankrupt).')
- Source (00b648c9d): institutionLifecycle.js:1025 `remnantReason: \`Closed after sustained economic decline (${fate.replace(/_/g, ' ')}).\`,`
- Port expected: string; values: receipt word; fallback: none
- Fix (ours): carry it as receipt text (rendered as text, never parsed); the word comes from worldPulseFate

### P038 `institutions[].knownTo` - ABSENT-WITH-FALLBACK (minor)

- SettlementForge: no knownTo field anywhere in src (word-bounded grep: zero hits)
- Source (00b648c9d): grep -rwn knownTo src/ -> no match
- Port expected: word; values: public | local | secret; fallback: public by item 30's defaults (DR20)
- Fix (ours): keep DR20's item-30 defaults (public); drop the path from the field table or mark it 'none on the line'

### P039 `institutions[].facets` - MISMATCH (minor)

- SettlementForge: object whose values are STRINGS: {clandestine: 'clandestine', subterranean: 'subterranean'}, not booleans
- Source (00b648c9d): institutionalCatalog.js:1440 `facets: { clandestine: 'clandestine', subterranean: 'subterranean' }`
- Port expected: object {clandestine?, subterranean?}; values: booleans (11 and 36 of 5 846 birth records); fallback: no concealment
- Fix (ours): read a facet as present when its value is truthy (any non-empty string or true), never by `=== true`

### P058 `economicState.incomeSources[]` - MISMATCH (major)

- SettlementForge: source words outside the sectors row: 'Subsistence Production', 'Church Tithes & Rents', 'Pilgrim Trade', 'Military Extraction', 'Enchanted Goods Premium', 'Security Contracts', 'Shadow Economy (untaxed)' (all at the pin too; SF's own closed list is treasury.js INCOME_SOURCE_FORMS)
- Source (00b648c9d): economicState.js:364 `source: 'Subsistence Production',`; :230 'Church Tithes & Rents'; :243 'Pilgrim Trade'; :203 'Military Extraction'; :310 'Enchanted Goods Premium'; :325 'Security Contracts'; :351 'Shadow Economy (untaxed)'; treasury.js:341-401
- Port expected: list of {source, percentage}; values: source words of the `sectors` row (30 sources; e.g. Market Taxes, Gate Tolls, Port Duties, River Tolls, Church Tithes, Magical ley lines -> also ruin evidence leyLines; Property Rents dropped and renormalised); percentage 0-100 summing to 100, rounded 1/100; fallback: layer 2's standalone economy (the blueprint and our rows)
- Fix (ours): extend the sectors row: Subsistence Production -> agriculture; Church Tithes & Rents -> religion; Pilgrim Trade -> religion; Military Extraction -> military; Enchanted Goods Premium -> magic; Security Contracts -> military; Shadow Economy (untaxed) -> crime (today they fall to none and are dropped, so a subsistence hamlet loses its largest share)

### P072 `powerStructure.criminalCaptureState` - MISMATCH (major)

- SettlementForge: five-rung ladder none|adversarial|equilibrium|corrupted|capture; 'capture' (the worst) is produced at generation and by the pulse; the crime row has no 'capture' and no else for a present word
- Source (00b648c9d): factionDynamics.js:225 `if (crimP > govP * 1.5 && crimP >= 24 && govP >= 15 && safetyRatio < 0.35) return 'capture';`; factionCapture.js:137
- Port expected: string word; values: none 0 | adversarial 0.1 | equilibrium 0.25 | corrupted 0.4 (w of the `crime` row); fallback: null: the `crime` row's neutral
- Fix (ours): add `capture` to the crime row above corrupted (w 0.55, our value, PLAUSIBLE until calibrated) and an else (unknown word -> w 0.25, noted) so the worst state never reads as neutral

### P073 `powerStructure.government` - MISMATCH (major)

- SettlementForge: government = the governing faction's name. Beyond the row's 18 names SF produces 37 more - at generation (22): Elder Consensus, Grand Guild Council, Guild Authority, Grand Merchant Oligarchy, Democratic assembly, City-State Council, Royal Authority, Headman's Authority, Military Council, Military City Council, Grand Military Council, Church Council's siblings Ecclesiastical Council and High Theocratic Council, Priestly Guidance, Merchant Council, Grand Merchant Senate, Corrupt Council, Corrupt City Council, Shadow Senate, Arcane Council, Arcane Senate, Town Mayor; after a transfer of power (15): Militia Command, Theocratic Council, Noble Regency, Garrison Command, Circle of Adepts, Guildmasters' Moot, Guildhall Council, Grand Guild Assembly, Commons Assembly, Workers' Assembly, Grand Commons Assembly, Foreign Stewardship, Foreign Administration, Occupation Authority, Martial Administration
- Source (00b648c9d): rulingStructure.js:160-176 (governanceLabelMap; 'village headman': "Headman's Authority" added J23 2026-09-30), :219-249 (council variants), :254-307; rulingPower.js:157-186 (GOVERNMENT_PREFERENCES, ALT_GOVERNMENT_LABELS)
- Port expected: string (the governing name); values: chartered commune <- Town / City / Grand / Guild / Elder / Household / Free Elder Council, Elected Reeve, People's Council; merchant oligarchy <- Merchant Guild Council, Merchant City Council, Grand Guild Consortium, Merchant oligarchy; seigneurial <- Feudal Stewardship, Feudal Appointee, Noble / Ducal Governorship; ecclesiastical <- Church Council; else chartered commune, noted (`government` row); fallback: chartered commune (the `government` row's else); no governing power
- Fix (ours): replace the closed name list with SF's names plus a keyword rule: Merchant|Oligarchy|Merchant Senate -> merchant oligarchy; Church|Ecclesiastical|Theocratic|Priestly -> ecclesiastical; Feudal|Noble|Ducal|Royal|Regency -> seigneurial; Council|Assembly|Reeve|Mayor|Moot|Headman|Consensus -> chartered commune; military, arcane, corrupt, foreign and occupation seats keep chartered commune (the row's else) with the occupation mark from the condition, noted — today Merchant Council, Royal Authority, Ecclesiastical Council read as chartered commune

### P077 `powerStructure.factions[].category` - MISMATCH (minor)

- SettlementForge: generation: military|religious|criminal|economy|government|noble|magic|other (the row's words); LIVED: a transfer of power stamps the seat's archetype word (government, noble, military, merchant, religious, criminal, arcane, craft, labor, outsider, occupation, civic) and the conquest occupier carries category 'occupation'
- Source (00b648c9d): rulingPower.js:534 `const seatCategory = archetype === A.OTHER ? null : archetype;` and :542; applyWorldPulseOccupationAuthority.js:169 `category: 'occupation',`; factionArchetypes.js:34-47
- Port expected: string word; values: economy (guild if 'Craft', company if 'Merchant'/'Trade'/'Grain') | religious | noble | government | criminal | military | magic | other; else council, noted (`powers` row); fallback: council, noted
- Fix (ours): extend the powers row: merchant -> company; craft and labor -> guild; arcane -> arcane; civic -> council; outsider -> council; occupation -> military (and the seat occupied); today they fall to council, noted

### P093 `npcs[].status` - MISMATCH (minor)

- SettlementForge: NpcStatus = active|dead|exiled|jailed|missing|removed|retired (no 'gone'); a settlement death marks every notable `dispersed: true` (+ dispersedAtTick) without a status; an ousted notable is replaced in place (successor's replacedNpc)
- Source (00b648c9d): entities/npcs.js:122 `export const NPC_STATUS_VALUES = Object.freeze(['active', 'dead', 'exiled', 'jailed', 'missing', 'removed', 'retired']);`; settlementLifecycleFirstClass.js:629 `{ ...npc, dispersed: true, dispersedAtTick: tick, dispersalNote }`
- Port expected: string; values: dead or gone -> the Person retired; fallback: none
- Fix (ours): retire the Person on dead, exiled, jailed, removed, retired (SF's NPC_UNAVAILABLE_STATUSES plus retired) and on dispersed: true; keep a missing notable (may return); drop the word 'gone'

### P094 `npcs[].replacedBy (field table) / replacedNpc (base key law, J-V8.76)` - MISMATCH (major)

- SettlementForge: `replacedNpc` holds the ousted notable's NAME; no `replacedBy` key exists
- Source (00b648c9d): successorNpc.js:51 `replacedNpc: ousted.name || null,`
- Port expected: string: the ousted notable's NAME (`replacedNpc`); values: names a carried notable -> successor re-bound (F17); fallback: none: no successor link
- Fix (ours): field table row (F-a): read `npcs[].replacedNpc` (a name joined to a carried notable by name); keyList and T-V8-20 follow

### P099 `activeConditions[].archetype` - MISMATCH (major)

- SettlementForge: 46 template archetypes (activeConditions.js:58) plus pulse words; 20 template words have no conditions row (alliance_burden, government_overthrown, coup_suppressed, magical_instability, cold_war_sanctions, siege_lifted, war_drain, army_deployed, war_exhaustion, war_mobilization, reinforcement_cost, occupation_lifted, relief_burden, trade_realignment, vassal_trade_coercion, trade_embargo, occupation_resistance, occupation_burden, war_spoils, flourishing). AND every live stressor is promoted to a TWIN condition under a mapped archetype (monster_pressure, under_siege, wartime -> war_pressure; occupied -> vassal_extraction; plague_onset -> plague; mass_migration -> regional_migration_pressure; insurgency, slave_revolt -> rebellion; ...), stamped sourceEventType 'GENERATION' (or the authoring event)
- Source (00b648c9d): conditionPromotion.js:63 `{ re: /monster|raider/i, archetype: 'war_pressure' },`; :29-72; activeConditions.js:58
- Port expected: string word; values: the `conditions` row (under_siege, war_pressure, plague, plague_onset, famine, mass_migration, regional_migration_pressure, occupied, vassal_extraction, reconstruction, boom, bust, resource_strike, vein_exhausted, trade_route_cut, food_anchor_lost, stressor_residual, custom_crisis, monster_pressure, religious_conversion, wartime, slave_revolt, rebellion, insurgency, faction_challenge, politically_fractured, succession_void, dominant_npc_removed, corruption_exposed, infiltrated, recently_betrayed, indebted, regional_*; else no tint, noted) AND the crisis census's archetype list (`crisis.map` row; else none, noted); fallback: no tint and no look, noted unmapped_word
- Fix (ours): (a) join a condition whose triggeredAt.sourceEventType is GENERATION or APPLY_STRESSOR to the listed stressor it was promoted from (same type by the promotion's mapping) and keep ONE overlay keyed by the condition id, tinted and looked by the STRESSOR's row: today a monster_pressure town gets the war_pressure siege tint, paused Works and a siege look; (b) add rows for the war and occupation words (war_mobilization, army_deployed -> siege tint without the pause; occupation_burden, occupation_resistance -> occupation mark; siege_lifted, occupation_lifted -> reconstruction's repair share; flourishing -> boom; trade_embargo -> trade slice), the rest no tint, noted, as now

### P104 `activeConditions[].triggeredAt.tick` - MISMATCH (major)

- SettlementForge: ALWAYS present: a missing tick is written as 0. Generation-promoted, authored-event (PLAGUE, REFUGEE_WAVE, CUT_TRADE_ROUTE, ...) and calamity-aftermath conditions carry 0 whatever the week; only pulse writers stamp the world tick. The calamity's own aftermath condition carries its week only in its id ('condition.disaster_response.<tick>')
- Source (00b648c9d): activeConditions.js:630 `tick: condition.triggeredAt?.tick ?? 0,`; mutateWorld.js:526 `triggeredAt: { sourceEventType: 'REFUGEE_WAVE', sourceEventTargetId: event.targetId || null },`; calamityKernel.js:396-398
- Port expected: integer week; values: SF tick = week; one source of presentWeek; the calamity link (a calamity at that week, else the latest in the 52 weeks up to sinceWeek); arrivals = populationHistory rise across it; fallback: no tick: no contribution to presentWeek; no calamity link by week equality
- Fix (ours): treat tick 0 as UNSTAMPED unless sourceEventType is a pulse word (WORLD_PULSE_*, WAR_LAYER*, OCCUPATION_LAYER, ...) on a dossier whose other stamps are also 0: an unstamped condition gives no presentWeek contribution and no week-equality calamity link; read a disaster_response condition's week from its id suffix (or link it to the latest calamityHistory entry)

### P105 `activeConditions[].triggeredAt.sourceEventType` - MISMATCH (minor)

- SettlementForge: about 45 source words. PLAGUE and REFUGEE_WAVE do occur (authored, tick 0); RAID_OR_MONSTER_ATTACK NEVER raises a condition: it appends config._raidHistory[] {source, severity, atEventId, atTimestamp} and impairs a target
- Source (00b648c9d): mutateWorld.js:591-604 (raidOrMonsterAttack writes `config: { ...config, _raidHistory: raids }`, no withActiveCondition)
- Port expected: string word; values: PLAGUE | REFUGEE_WAVE | RAID_OR_MONSTER_ATTACK (the census events) -> `event`; else the archetype row; fallback: the `archetype` row (V08 §3.16 (7))
- Fix (ours): read config._raidHistory[] as the RAID_OR_MONSTER_ATTACK census event (and as D12's raider evidence); the other source words keep the archetype row's fallback

### P106 `activeConditions[].duration.elapsedTicks` - MISMATCH (major)

- SettlementForge: elapsedTicks is in CONDITION-DURATION units, not weeks: +0.25 per one-week tick (the campaign advance runs N one-week kernel calls), +1.0 per month, 2.25 per season, 6.0 per year on the standalone time-progression path. On the campaign line weeks = 4 x elapsedTicks while the advanceMultiTick flag stands at its default (on); with that killswitch off one kernel call spans the whole chosen interval, so neither tick = week nor the x4 rule holds (PLAUSIBLE rare)
- Source (00b648c9d): activeConditions.js:829 `one_week:   0.25,` and :876 `const elapsedTicks = canonical.duration.elapsedTicks + increment;`; advanceInterval.js:511 `interval: 'one_week',`; lib/flagRegistry.js:88 `advanceMultiTick: true,`; campaignAdvanceSession.js:614
- Port expected: number (weeks; e.g. 3.25 at tick 0); values: sinceWeek = round(W - elapsedTicks); fallback: a missing duration: no untilWeek (stands while listed)
- Fix (ours): sinceWeek = round(W - 4 x elapsedTicks) (campaign line); a dossier advanced only by standalone intervals has no exact week (note the reading PLAUSIBLE there); T-V8-18's measurement is answered: the unit is a quarter-week step, not a week

### P107 `activeConditions[].duration.expiresAtTicks` - MISMATCH (major)

- SettlementForge: expiresAtTicks is a whole-length cap in the same units (expiry when elapsedTicks >= cap), e.g. 6 = 24 weeks of campaign time; null = open-ended
- Source (00b648c9d): activeConditions.js:937 `if (typeof cap === 'number' && canonical.duration.elapsedTicks >= cap) {`
- Port expected: number (weeks); values: untilWeek = round(W + expiresAtTicks - elapsedTicks) (whole-length reading); pre-decided fallback: expiresAtTicks as an absolute tick; fallback: no untilWeek
- Fix (ours): untilWeek = round(W + 4 x (expiresAtTicks - elapsedTicks)); drop the 'absolute tick' alternative reading

### P111 `history.historicalEvents[].type` - MISMATCH (minor)

- SettlementForge: generation: type = one of the 8 category words; LIVED (campaign-era) entries put a TEMPLATE word in type (external_threat, occupation_legacy, resource_scarcity, outside_debt, crime_wave, infiltration_fear, corruption_scandal, succession_crisis, leadership_vacuum, guild_conflict, population_friction, religious_tension, magical_controversy) with no templateType, and the lifecycle writer uses 'decline' / 'founding'
- Source (00b648c9d): stressorAftermath.js:162 `type: ... (HISTORY_EVENT_TYPE)[echo.type] || 'external_threat',`; settlementLifecycleFirstClass.js:664 `type: 'decline',`, :718 `type: 'founding',`
- Port expected: string word; values: economic | political | disaster | religious | magical | demographic | occupation_infiltration | exile_return (8); `historyScars` row (disaster -> fire / flood / disaster by name words; occupation_infiltration -> siege; magical -> no scar, ruin evidence magicalHistory); `historyEvents` type fallback; fallback: no events: no scar, no replay
- Fix (ours): when templateType is absent and type is not one of the 8 categories, read type through the historyEvents row as a template word (external_threat -> siege, occupation_legacy -> occupation, ...); 'decline' and 'founding' are lifecycle receipts (read with lifecycleHistory, P010), not scars

### P114 `history.historicalEvents[].severity` - MISMATCH (minor)

- SettlementForge: minor|major|catastrophic at generation; lived entries also write 'moderate'
- Source (00b648c9d): stressorAftermath.js:58 `if (peak >= 0.35) return 'moderate';`
- Port expected: string word; values: minor 0.3 | major 0.6 | catastrophic 0.9 (destruction candidate, DR38); else 0.5; fallback: 0.5
- Fix (ours): add `moderate` 0.45 to the severity words (today the else 0.5)

### P123 `resourceHistory[]` - ABSENT-WITH-FALLBACK (minor)

- SettlementForge: entries {resource, state, outcomeId, reason}: NO tick (both writers); state = depleted | allow | abundant | discovered | removed; outcomeId ends `.${tick}`
- Source (00b648c9d): tierResourceDynamics.js:732-740 `{ resource, state, outcomeId: outcome.id, reason: ... }`; resourceDynamicsKernel.js:877
- Port expected: list of {tick, state}; values: deposit state changes; fallback: no rung: the next dating rung
- Fix (ours): date an entry by its outcomeId's week suffix (the tierHistory rung) and drop resourceHistory[].tick from the presentWeek composite

### P124 `defenseProfile.readiness.label` - MISMATCH (minor)

- SettlementForge: labels Fortress | Well-Defended (hyphen) | Defensible | Lightly Defended | Vulnerable | Undefended; the score is ALWAYS written, so the label rung never decides today
- Source (00b648c9d): bandLadders.js:40 `label: 'Well-Defended'`, :41 'Defensible', :44 'Undefended'; defenseGenerator.js:525 `return { score: readiness, label: band.label, ... }`
- Port expected: string word; values: Fortress 0.9 fortress | Well Defended 0.7 defended | Lightly Defended 0.4 light | Vulnerable 0.15 vulnerable; else 0.5 defended, noted (used when no score); fallback: null with no score: the threat alone decides need
- Fix (ours): label rows: Well-Defended 0.7 defended; Defensible 0.45 light; Undefended 0.05 vulnerable (our values)

### P126 `traditions[]` - MISMATCH (major)

- SettlementForge: TraditionRec[] {id, coreMotif {element, act}, name, foundedYear, window {startWeekOfYear 1..52, weeks 1|2}, scaleBand 0..6, ownerKey, ownerKind, ownerLabel, deityRef, expression {trappings[], epithet}, mutationLog, lastHeldYear, lastOutcome, suppressedBy, adoptedFrom}: NO type, NO staging, NO deity; the window is a start week and a length, not a from/to
- Source (00b648c9d): domain/traditions/genesis.js:306-324 (assembleRec); :80-82 `@property {number} startWeekOfYear  1..52` / `weeks 1 or 2`
- Port expected: list of {id, name, type, window, staging, deity}; values: type -> `festivals` row (feast, holy, saint, rite, pilgrim, procession -> religious; fair, market -> market; harvest, sowing, midsummer, midwinter, solstice, equinox -> harvest; boat, river, sea, water, fleet -> water; founding, coronation, guild, tournament, civic -> market; else by name, else market noted; a deity -> religious); window -> weeks of the sf445 year (campaign weeks mod 52; from > to wraps; >= 52 weeks the whole year; no readable week -> unscheduled, noted); staging prose -> V11 staging keyword keys (prose never carried); fallback: none: no festival (DR43)
- Fix (ours): festival kind: run the festivals word test over coreMotif.act then coreMotif.element, then the name; a non-null deityRef -> religious; window -> weeks [startWeekOfYear-1, startWeekOfYear-1+weeks) of the 0-based sf445 year; staging keywords from expression.trappings (prose never carried); deity from deityRef

### P127 `customContentRoster.traditions` - MISMATCH (major)

- SettlementForge: custom traditions live at customContentRoster.buckets.traditions (rows {source custom, isCustom, customDefinitionCategory, localUid?, identity, declared fields}); present only when _livingContentLawVersion is 2
- Source (00b648c9d): livingContentRoster.js:266-269 `return Object.freeze({ schemaVersion: ..., buckets: Object.freeze(buckets), });`
- Port expected: list of custom tradition entries (with localUid); values: as traditions[]; key trad:uid:<localUid>; fallback: none
- Fix (ours): read customContentRoster.buckets.traditions (key trad:uid:<localUid>)

### P128 `customContentProvenance.materializedDefinitions[]` - MISMATCH (major)

- SettlementForge: entries {category, definitionId, revisionId, contentHash, localUid, name, surfaces[]}: the bucket field is named `category`, and it ranges over nine categories (deities, factions, institutions, resources, services, stressors, supplyChains, tradeGoods, traditions)
- Source (00b648c9d): settlementContentProvenance.js:265-272 `return { category, definitionId, revisionId, contentHash, localUid: ..., name: ... };`; :44-54
- Port expected: list of {bucket, definitionId, revisionId, contentHash, localUid, name, surfaces}; values: bucket institutions | services | resources | tradeGoods; supplies a custom record's ids when the record lacks them; defines which definition/revision the dossier MATERIALISED; fallback: none: no custom content
- Fix (ours): read `category` as the bucket; accept the nine values (supplyChains and traditions identities included); the four buckets the port fills stay institutions, services, resources, tradeGoods

### P129 `customContentRoster (institutions, services, resources, supply chains)` - ABSENT-WITH-FALLBACK (minor)

- SettlementForge: no institutions/services/resources/supply-chain buckets: LIVING_CONTENT_BUCKETS is deities, factions, stressors, traditions only; a custom institution's definition fields are not on the dossier (D05)
- Source (00b648c9d): livingContentLaw.js:151-156 `export const LIVING_CONTENT_BUCKETS = Object.freeze(['deities', 'factions', 'stressors', 'traditions',]);`
- Port expected: object of buckets of definition entries; values: identities of the definitions (what it holds beyond them is PLAUSIBLE, V08 §12); fallback: none: no custom content
- Fix (ours): drop the four buckets from the row; definition identities come from customContentProvenance.materializedDefinitions (P128); generic siting stays the fallback (item 104)

### P131 `presentWeek (composite: max of activeConditions[].triggeredAt.tick, calamityHistory[].tick, history.historicalEvents[].tick, populationHistory[].tick, institutionHistory[].tick, resourceHistory[].tick, powerStructure.previousGovernments[].tick)` - ABSENT-WITH-FALLBACK (minor)

- SettlementForge: no current-week stamp on the dossier (D04). Of the composite's sources, resourceHistory[].tick never exists and triggeredAt.tick is 0 on unstamped conditions; unread stamps exist: economicState.treasury.lastTick (every tick, treasuryEnabled), foodSecurity.stockpile.lastTick (last change), powerStructure.factions[].updatedByPulse, lifecycleHistory[].tick, urbanFabric scars/rebirths week, institutions[].foundedAt.tick
- Source (00b648c9d): treasury.js:1169 (lastTick each tick, per sf-dossier); foodStockpile.js:410-459; factionCompetition.js:655
- Port expected: integer week or null; values: the dossier's latest stamped tick (item 125 (b)); year position = presentWeek mod 52 on the sf445 calendar; fallback: none stamped: §4.11's clock starts at week 0 and the year position is the user's season control (midsummer, week 19)
- Fix (ours): composite = max over the stamped sources, excluding resourceHistory[].tick and tick-0 unstamped conditions, plus treasury.lastTick, stockpile.lastTick, factions[].updatedByPulse, lifecycleHistory[].tick, institutions[].foundedAt.tick and outcome-id week suffixes; with none, item 125 (b)'s week 0 / midsummer

## 3. Port-internal defects CONFIRMED at source (MATCH rows the port cannot yet read)

- P009: root string written by DESTROY_SETTLEMENT beside status, destroyedAt, destroyedCause; a top-level key outside both of the port key lists (F-l), so step 3 drops it Fix: port side (F-l): add destroyedByEventId, status, destroyedAt, destroyedCause to optionalKeys (read: true)
- P085: {id generated_*|link_*|live_*, name, relationshipType, ...}: a SAVED-ONLY top-level key outside both port key lists (F-k), so step 3 drops it Fix: port side (F-k): add neighbourNetwork to optionalKeys (read: true)
- P118: the marker is `history.historicalEvents[].ancientRuin: true` on the 'The Fall of <ruin>' event (type disaster, severity catastrophic), and history.ancientRuin = {name, yearsAgo} with yearsAgo = age + 120..400 (from the PRESENT, not from the founding). Path PLAUSIBLE -> CONFIRMED (F-j) Fix: name the paths (F-j); yearsBeforeFounding = history.ancientRuin.yearsAgo - history.age; the marked event must be excluded from the disaster scar row (it would otherwise read as a catastrophic disaster, a DR38 destruction candidate)
- F-e: `decrees` is an editor top-level key holding an OBJECT registry of Decree entries {id, op, status applied|pending|withdrawn, addedBy, orderIndex, orderedAt, when {tick?, season?}, appliedAt?, tickRef? (a string), ...} (domain/edit/registry.js:60-64; decreeHook.js:409); it is outside both key lists and dropped from the account export. Base F18's `decrees[]` must read an object, not a list; the week's decreeCauses stay campaign state.
- The public projection drops `_seed` and `_config` (publicSafe.js:110, PRIVATE_KEY_RE matches `seed` and `_config`): a dossier offered from a gallery or public export would be refused E_UNKNOWN_SHAPE by the 41-key check. The port is fed from the owner's save (`row.data`, saves.js:594), which carries both; the design should say so where the offer is defined (PLAUSIBLE risk, no code path read that offers a public projection).
- The port's base assumption 'SF tick = week' holds on the default advance (advanceMultiTick on: N one-week kernel calls, advanceInterval.js:511; lib/flagRegistry.js:88). With that killswitch off, one kernel call (pulseKernel.js:202-209, tick + 1) spans the chosen interval (month by default), so every tick-dated fact would be in intervals, not weeks; the dossier carries no marker of which path ran (PLAUSIBLE rare; worth one sentence in V08's tick rule).
- `generatorVersion` (0.9.0) and `schemaVersion` (1) are identical at 5d699cc68 and 00b648c9d although outputs moved (sf-dossier deltas): the host's declared line, never these stamps, must pick the adapter (V08's existing rule holds).

## 4. Dossier fields the port does not read (UNUSED)

308 of the 463 sf-dossier rows. Rows flagged **should read** are proposals for the design (CONFIRMED present; their value to the map is stated, PLAUSIBLE where marked). The rest carry prose, UI, receipts, generation internals or facts the port takes elsewhere.

### 4.1 Should read

- [61] `urbanFabric`: PLAUSIBLE value: SF's own urban memory - scars [{kind burn_lots|plague_quarter|flood_line|rubble_field|..., severity, week}] and rebirths [{classes, type, week}] (urbanFabricKernel.js:518-534); kind/severity/week portable as HistoryHint scars, the wallSegmentId/districtId are SF geometry
- [64] `thievesGuildStrength`: PLAUSIBLE value: lived 0-1 crime strength beside the crime row
- [65] `lifecycleStatus`: P010 fix: death grade (relic_ruin | abandoned_site) for DR38
- [66] `lifecycleHistory`: P010 fix: terminal_death / resettled with tick (also a presentWeek stamp)
- [67] `status`: with destroyedByEventId: 'destroyed' after DESTROY_SETTLEMENT (DR38, F-l)
- [68] `destroyedAt`: with destroyedByEventId (F-l)
- [70] `destroyedCause`: with destroyedByEventId (F-l)
- [71] `parentRef`: PLAUSIBLE value: a settlement founded from a satellite (foundedTick, foundingTier) for history.founding
- [73] `interSettlementRelationships`: PLAUSIBLE value: reciprocal neighbour back-links for DR3 partners
- [77] `decrees`: base F18 (F-e): an OBJECT registry of Decree {id, op, status applied|pending|withdrawn, when {tick}, appliedAt, tickRef (string)} (edit/registry.js:60-64), not an array; outside both key lists
- [78] `_regenSeed`: PLAUSIBLE value: seed of the last section reroll (generateSettlementPipeline.js:613 per sf-dossier); a change between offers is the candidate F21 reroll receipt (D10, F-i)
- [122] `institutions[]._worldPulseEconomyClosed`: F-b: the F1 closure flag
- [123] `institutions[]._worldPulseEconomyBuilt`: F-b: the F1 built flag
- [157] `economicState.treasury`: lastTick: the only every-tick week stamp (presentWeek, P131)
- [214] `economicState.foodSecurity.stockpile`: lastTick, season, seasonWeek (presentWeek and the year position, P131)
- [240] `powerStructure.factions[].updatedByPulse`: tick of the last pulse change (presentWeek, P131; nearest to D09)
- [270] `npcs[].timesExposed|ousted`: P093 fix: an ousted notable
- [453] `config.nearbyResourcesCustom`: P016/P018 fix: names to exclude from the deposit rows

### 4.2 Not needed (grouped by parent)

- structuralViolations: `structuralViolations`
- structuralSuggestions: `structuralSuggestions`
- settlementReason: `settlementReason`
- relationships: `relationships`, `relationships[].type`, `relationships[].typeName`, `relationships[].description`, `relationships[].tension`, `relationships[].strength`, `relationships[].npc1Id`, `relationships[].npc2Id`, `relationships[].npc1Name`, `relationships[].npc2Name`, `relationships[].npc1Role`, `relationships[].npc2Role`, `relationships[].archetypeKey`, `relationships[].flagDriven`
- factions: `factions`, `factions[].name`, `factions[].members`, `factions[].dominantCategory`, `factions[].powerFactionName|powerFactionPower|powerFactionCat`, `factions[].powerFactionFallback`
- conflicts: `conflicts`, `conflicts[].parties`, `conflicts[].issue`, `conflicts[].stakes`, `conflicts[].intensity`, `conflicts[].desc`, `conflicts[].plotHooks`
- resourceAnalysis: `resourceAnalysis`, `resourceAnalysis.terrain`, `resourceAnalysis.availableResources`, `resourceAnalysis.resourceConditions`, `resourceAnalysis.conditionNotes`, `resourceAnalysis.resourceChains`, `resourceAnalysis.exploitation`, `resourceAnalysis.imports`, `resourceAnalysis.exports`, `resourceAnalysis.gaps`, `resourceAnalysis.featureEffects`, `resourceAnalysis.economicStrengths`, `resourceAnalysis.strategicValue`, `resourceAnalysis.priorityNotes`
- economicViability: `economicViability`, `economicViability.viable`, `economicViability.issues`, `economicViability.warnings`, `economicViability.dependencies`, `economicViability.suggestions`, `economicViability.plotHooks`, `economicViability.summary`, `economicViability.metrics`, `economicViability.metrics.tradeAccess`, `economicViability.metrics.criticalIssueCount`, `economicViability.metrics.dependencyCount`, `economicViability.metrics.warningCount`, `economicViability.metrics.foodBalance.dailyNeed`, `economicViability.metrics.foodBalance.dailyProduction`, `economicViability.metrics.foodBalance.deficit`, `economicViability.metrics.foodBalance.deficitPercent`, `economicViability.metrics.foodBalance.surplus`, `economicViability.metrics.foodBalance.agricultureModifier`, `economicViability.metrics.foodBalance.stressModifier`, `economicViability.metrics.foodBalance.importCoverage`, `economicViability.metrics.foodBalance.rawDeficit`, `economicViability.metrics.foodBalance.importChannel`, `economicViability.metrics.foodBalance.magicFoodOffset`, `economicViability.metrics.foodBalance.magicFoodNote`
- culturalIdentity: `culturalIdentity`, `culturalIdentity.key`, `culturalIdentity.label`, `culturalIdentity.scope`, `culturalIdentity.builtForm`, `culturalIdentity.civicPattern`, `culturalIdentity.exchangePattern`, `culturalIdentity.foodways`, `culturalIdentity.sacredLife`, `culturalIdentity.defensePattern`, `culturalIdentity.socialTexture`, `culturalIdentity.architecturalDetail`, `culturalIdentity.sourceKeys`
- culturalNotes: `culturalNotes`
- stress: `stress`
- _config: `_config`
- pressureSentence: `pressureSentence`
- arrivalScene: `arrivalScene`
- prominentRelationship: `prominentRelationship`
- coherenceNotes: `coherenceNotes`
- generationCoherenceReceipt: `generationCoherenceReceipt`, `generationCoherenceReceipt.version`, `generationCoherenceReceipt.status`, `generationCoherenceReceipt.seed`, `generationCoherenceReceipt.worldLawVersion`, `generationCoherenceReceipt.cultureProfile`, `generationCoherenceReceipt.contentProfile`, `generationCoherenceReceipt.checks`, `generationCoherenceReceipt.judgments`, `generationCoherenceReceipt.repairs`, `generationCoherenceReceipt.authoredTensions`
- simulationTrace: `simulationTrace`, `simulationTrace[]`
- aiOverlays: `aiOverlays`
- userCanon: `userCanon`
- customContentProvenance: `customContentProvenance.schemaVersion`, `customContentProvenance.scope`, `customContentProvenance.environment`, `customContentProvenance.bindingHash`, `customContentProvenance.receiptHash`
- customContentRoster: `customContentRoster.schemaVersion`
- populationHistory: `populationHistory[].delta`, `populationHistory[].reason`, `populationHistory[].outcomeId`
- npcLadder: `npcLadder`
- crossSettlementConflicts: `crossSettlementConflicts`
- peaceOffers: `peaceOffers`
- dmLayer: `dmLayer`
- mapEdits: `mapEdits`
- institutions: `institutions[].baseChance`, `institutions[].desc`, `institutions[].exclusiveGroup`, `institutions[].exclusiveGroupCoexists`, `institutions[].tradeRouteRequired`, `institutions[].terrainAccess`, `institutions[].terrainRequired`, `institutions[].forbiddenTradeRoutes`, `institutions[].exclusionConditions`, `institutions[].magicLicense`, `institutions[].serviceKeys`, `institutions[].minTier`, `institutions[].forcedByToggle`, `institutions[].outOfTier`, `institutions[].nativeTier`, `institutions[].forcedByIsolation`, `institutions[].cascadeAdded`, `institutions[].cascadeBoost`, `institutions[].tier`, `institutions[].factionSource`, `institutions[].coherenceRepair`, `institutions[].isCustom`, `institutions[].customDefinitionCategory`
- economicState: `economicState.tier`, `economicState.situationDesc`, `economicState.localProduction`, `economicState.tradeAccess`, `economicState.priorities`, `economicState.institutionalServices`, `economicState.economicComplexity`, `economicState.nativeTradeLabels`, `economicState.customTradeEndpoints`, `economicState.customTradeLabels`, `economicState.customCategoryExports|customCategoryImports`, `economicState.tradeLinks[].viaNeighbour`, `economicState.tradeLinks[].viaCategory`, `economicState.activeChains[].needLabel`, `economicState.activeChains[].needIcon`, `economicState.activeChains[].needColor`, `economicState.activeChains[].resourceIcon`, `economicState.activeChains[].resourceCondition`, `economicState.activeChains[].resourceActive`, `economicState.activeChains[].resourceInputKey`, `economicState.activeChains[].resourceInputCondition`, `economicState.activeChains[].resourceInputAvailable`, `economicState.activeChains[].services`, `economicState.activeChains[].exportable`, `economicState.activeChains[].entrepot`, `economicState.activeChains[].entrepotNote`, `economicState.activeChains[].externalMillNote`, `economicState.activeChains[].activatedByResource`, `economicState.activeChains[].substituteActive`, `economicState.activeChains[].resourceDepleted`, `economicState.activeChains[].dependency`, `economicState.foodSecurity.label`, `economicState.foodSecurity.foodRatio`, `economicState.foodSecurity.deficitPct`, `economicState.foodSecurity.surplusPct`, `economicState.foodSecurity.dailyNeed`, `economicState.foodSecurity.dailyProduction`, `economicState.foodSecurity.rawDeficit`, `economicState.foodSecurity.importCoverage`, `economicState.foodSecurity.magicOffset`, `economicState.foodSecurity.deficit`, `economicState.foodSecurity.effectiveAgriculture`, `economicState.foodSecurity.activeChains`, `economicState.foodSecurity.activeChainsCount`, `economicState.foodSecurity.diversityNote`, `economicState.foodSecurity.storageMonths`, `economicState.foodSecurity.storageNote`, `economicState.foodSecurity.importDependency`, `economicState.foodSecurity.importNote`, `economicState.foodSecurity.magicTradeChannel`, `economicState.foodSecurity.magicSupplement`, `economicState.foodSecurity.magicNote`, `economicState.foodSecurity.hasFamine`, `economicState.foodSecurity.hasSiege`, `economicState.foodSecurity.prosperityMod`, `economicState.foodSecurity.resilienceScore`, `economicState.foodSecurity.isDeficit|isPressured|isSecure|isSurplus`, `economicState.foodSecurity.customFoodImpact`
- powerStructure: `powerStructure.governingName`, `powerStructure.stability`, `powerStructure.recentConflict`, `powerStructure.powerProjectionVersion`, `powerStructure.economyInputFingerprint`, `powerStructure.conflicts`, `powerStructure.factions[].rawPower`, `powerStructure.factions[].powerLabel`, `powerStructure.factions[].desc`, `powerStructure.factions[].modifier`, `powerStructure.factions[].captureState`, `powerStructure.factions[].source|neighbourName`, `powerStructure.factions[].id`, `powerStructure.factions[].suppressedInstitutions`, `powerStructure.factionRelationships[].ratio`, `powerStructure.factionRelationships[].narrative`, `powerStructure.factionRelationships[].dmNote`, `powerStructure.factionRelationships[].captureState`
- npcs: `npcs[].gender`, `npcs[].title`, `npcs[].personality`, `npcs[].physical`, `npcs[].goal`, `npcs[].secret`, `npcs[].plotHooks`, `npcs[].influence`, `npcs[].power`, `npcs[].presentation`, `npcs[].structuralPosition|activeConstraint|settlementCondition|structuralRank`, `npcs[].secondaryAffiliation`, `npcs[].corrupt`, `npcs[].corruptionVector`, `npcs[].corruptTies`, `npcs[].whereabouts`
- spatialLayout: `spatialLayout.layout`, `spatialLayout.tradeAccess`, `spatialLayout.quarters[].desc`
- availableServices: `availableServices.<bucket>[].desc`
- history: `history.historicalEvents[].description`, `history.historicalEvents[].lastingEffects`, `history.historicalEvents[].plotHooks`, `history.currentTensions`, `history.historicalCharacter`, `history.eventsTimeline`, `history.legacyAnnotations`, `history.siegeNarrative`
- defenseProfile: `defenseProfile.scores`, `defenseProfile.institutions`, `defenseProfile.magicDependency`, `defenseProfile.traditions`, `defenseProfile.chainModifiers`, `defenseProfile.economicGates`
- isolationSupport: `isolationSupport.version`, `isolationSupport.applicable`, `isolationSupport.tier`, `isolationSupport.requiredCapacity`, `isolationSupport.capacity`, `isolationSupport.deficit`, `isolationSupport.magicDependent`
- stressors: `stressors[].source|forcedByConfig`
- activeConditions: `activeConditions[].description`, `activeConditions[].affectedSystems`, `activeConditions[].causes`
- config: `config.eventConditions`, `config.priorityEconomy`, `config.priorityMilitary`, `config.priorityReligion`, `config.priorityCriminal`, `config.tier`, `config.priorityMagic`, `config._routeIntent`, `config.culture`, `config.contentProfile`, `config.contentBoundaries`, `config.terrainOverride`, `config.<raw keys>`, `config.stressType|stressTypes|intendedStressTypes`, `config._population`, `config._isolationSupport|_magicTradeOnly`, `config._neighbourEconBias|_neighbourEconMode`, `config.neighborRelationship`
- neighborRelationship: `neighborRelationship.primaryExports`, `neighborRelationship.primaryImports`, `neighborRelationship.activeChains`, `neighborRelationship.economicStrength`, `neighborRelationship.militaryStrength`, `neighborRelationship.governmentType`, `neighborRelationship.dominantFactionTypes`, `neighborRelationship.dynamics`, `neighborRelationship.npcs`, `neighborRelationship.factions`

### 4.3 Fields found in source that sf-dossier's 463 rows do not list

- Read by the port (MATCH above): institutions[].demotedFrom, promotedFrom, createdByEventId, removedByEventId; history.historicalEvents[].ancientRuin.
- Should read: npcs[].dispersed / dispersedAtTick / dispersalNote (P093); config._raidHistory[] {source, severity, atEventId, atTimestamp} (P105, D12); config._refugeeWaves[] {size small|medium|large, fromRegion, atEventId, atTimestamp} (mutateWorld.js:502-510: an arrival SIZE, D03's fallback); traditions[] record fields (P126).
- Not needed: config.lifecycleStatus / lifecycleDiedAtTick and _config twins (twins of the root, P010); config._destroyed / _destroyedByEventId (twin of the root, P009); config.primaryDeityRef (twin of the snapshot's _deityRef); institutions[].removedReason / removedByWorldPulseOutcomeId (receipt prose and an outcome stamp of the P046 family).

## 5. In-development items (port-fields D01-D13) against 00b648c9d

- D01-D03 armies, coalitions, travelling groups: not on the dossier (sf-dossier, CONFIRMED there; not re-read here). New here: config._refugeeWaves[].size is a per-wave arrival size on the dossier (CONFIRMED, mutateWorld.js:502-510) for D03's fallback.
- D04 week stamp: absent; see P131 for the stamps that exist.
- D05 custom definition fields: absent, CONFIRMED (identity projection copies no authored field; living buckets are deities, factions, stressors, traditions only).
- D06 crisis census: CONFIRMED here - 15 stressor types; 46 condition archetype templates plus pulse words; PLAGUE and REFUGEE_WAVE appear as sourceEventType (tick 0); RAID_OR_MONSTER_ATTACK raises no condition (config._raidHistory).
- D07 the calamity kernel's condition: CONFIRMED - archetype `custom_crisis`, id `condition.disaster_response.<tick>`, label 'Disaster Response Crisis', severity 0.6, no triggeredAt (tick reads 0) (calamityKernel.js:395-404).
- D08 history templates: CONFIRMED - 29 data templates, 25 drawable; festival 'type' words do not exist (traditions use coreMotif element and act, P126).
- D09 a power relation's pulse week: none on factionRelationships (PLAUSIBLE, not grepped exhaustively); factions[].updatedByPulse is the nearest stamp.
- D10 reroll receipt: the root `_regenSeed` (seed of the last section reroll, generateSettlementPipeline.js:613, per sf-dossier) is the candidate receipt for F21 (PLAUSIBLE use).
- D11 climate: no climate key among the root, lived or saved keys (sf-dossier); season/seasonWeek ride the food stockpile under seasonsEnabled only.
- D12 raid/piracy: authored raids are on the dossier as config._raidHistory[] (CONFIRMED); no piracy word.
- D13 item 20 (h) (iv) optional slots: only the pulse/event-minted institutions[].id exists; the others are not generated.

## 6. Labels and limits

- CONFIRMED: every verdict whose evidence cites a file:line was read in 00b648c9d's source; vocabularies marked executed came from importing the data modules (institutionalCatalog, activeConditions, historyData, historyPolicyData, traditionCorpus) from the scratch copy.
- PLAUSIBLE: the lived population ceiling (none found), presence frequencies (no dossier generated), the proposed numeric row values, and the value of the PLAUSIBLE should-read rows.
- Not done (brief): no SettlementForge code was run in its checkout, no git index command there, nothing written there; no design text, plat/ or PROGRESS.md changed.
- Generator: session scratchpad catchup/gen_sf_match.py (one source for this file and table.result.json).
