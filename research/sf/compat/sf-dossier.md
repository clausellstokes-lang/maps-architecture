# SettlementForge dossier at 00b648c9d — the field census (lane catchup/sf-dossier)

> PENDING FABLE REVIEW — Opus-produced (catchup/sf-dossier, 2026-10-03). Companion data: `research/sf/compat/sf-dossier.json` (same rows, machine-readable).

## Outcome

- **What was read (CONFIRMED).** SettlementForge `origin/master` at `00b648c9d` (2026-10-02), which contains the pinned `5d699cc68` and the integration tip `d8fea9898` (both checked with `git merge-base --is-ancestor`). The dossier's producer, schema, serializer and export paths were read at that commit through `git archive` copies whose blobs equal the commit's (81 of 81 cited files). Nothing in SettlementForge was run, written or refreshed; no `git status` was used there.
- **463 field rows** cover the dossier's paths: the 41 root keys every generated dossier carries, the two conditional custom-content keys, the save-path and Edit-Mode keys, the world-pulse (lived) keys, and the sub-fields of every record SettlementForge writes. Each row gives type and shape, required/conditional/lived, the value domain or an example, and `file:line` at `00b648c9d`.
- **The shape barely moved between the pin and 00b648c9d (CONFIRMED).** No root key was added, removed or renamed (SettlementForge's own `GENERATED_KEYS` register is unchanged); the schema, normalizer, migrations, field manifest, save path and export paths have no diff. One record field was removed (`institutions[].minTier`) and one tightened (`institutions[].baseChance` is now always present). What moved is the **values**: the institution catalog was rebuilt (281 kinds, every tier block complete, 44 kinds moved category, metropolis no longer inherits the city block, population and prerequisite guards), and the arrival scene and pressure sentence now draw on their own random streams with new prose — so the same seed gives a different town. **`generatorVersion` stayed `0.9.0` and `schemaVersion` stayed 1**, so neither stamp tells the two lines apart.
- **In-development items (CONFIRMED by reading the writers).** Forces (armies), coalitions and travelling groups are **not** on the dossier: they live in the campaign's world state (`worldState.deployments`, a deployment's coalition join anchor, the migration and envoy ledgers), and armies carry a strength on a 0–100 axis, not a headcount. There is **no current-week stamp** on the dossier; the week lives in `worldState.tick` / `calendar`. Conditions **do** carry `triggeredAt {tick, sourceEventType, sourceEventTargetId}` — the world tick when the pulse raised them, 0 at generation and on authored-event conditions. History ticks exist on `populationHistory`, campaign-era `historicalEvents`, `calamityHistory`, `institutionHistory`, `institutions[].foundedAt` and `previousGovernments`, but **`resourceHistory[]` and `tierHistory[]` carry no tick**.

## 1. Producer, schema, serializer, exports

- **entry** — src/generators/generateSettlementPipeline.js:77 generateSettlementPipeline(config, importedNeighbour, {seed, customContent, contentProvenance, …})
- **steps** — resolveConfig, buildGenerationContext, resolveResources, resolveStress, resolveNeighbour, assembleInstitutions, subsumptionPass, cascadePass, isolationPass, stressConfirmPass, generateEconomy, generatePower, powerEconomyReconcilePass, neighbourFactions, factionCorrelationPass, economyReconcilePass, structuralValidationPass, generatePopulation, corruptionPass, coherenceRepairPass, generateNarratives, assembleSettlement (src/generators/steps/index.js)
- **assembly** — src/generators/steps/assembleSettlement.js:124-181 builds the flat object; :217-219 prose and defence; :282-287 generateCoherence; :301-307 structural NPCs; :314 receipt; :329 trace; :355 normalizeSettlement -> promoteStressorsToConditions -> reapplyEventConditions
- **postAssembly** — generateSettlementPipeline.js:146 _seed, :153 customContentProvenance (conditional), :190 customContentRoster (conditional)
- **normalize** — src/domain/normalizeSettlement.js:162-220 (stamps simulationVersion, generatorVersion, id; resolves FIELD_ALIASES; defaults activeConditions, simulationTrace, aiOverlays, userCanon; migrateSettlementToLatest)

**Schema.** src/domain/settlement.schema.js (1850 lines; unchanged between the two commits); `SCHEMA_VERSION` 1, `SIMULATION_VERSION` 1, `GENERATOR_VERSION` '0.9.0'. src/domain/settlementMigrations.js: one entry 0 -> 1 (stamp only); a newer schemaVersion passes through unchanged with a warning. FIELD_ALIASES {stressors: [stress, stresses]} (settlement.schema.js:56-65); economicState exports/imports aliases resolved at read time (canonicalAccessors.js).

**SettlementForge's own register.** src/domain/edit/recordRegister.js: RECORD_CLASSES, GENERATED_KEYS (the 41), SAVED_ONLY_KEYS (7), KEYED_COLLECTIONS (per-collection identity keys) — SettlementForge's own measured register; the only change between the commits is generationCoherenceReceipt.repairs joining KEY_UNPROVEN_AT_LENGTH_ONE.

**Serializer.** src/lib/saves.js:558 supabaseSave -> row.data = the whole settlement object (:594), neighbour_links = settlement.neighbourNetwork (:598); withNeighbourNetworkFromRelationship (:357) runs first; on read migrateSaveToV2 (:314) + normalizeSettlement (:388). Local backend: src/lib/saves.js: localStorage key 'dnd_settlement_saves' holds the array of save envelopes (JSON.stringify). Save envelope: {id (save UUID), name, tier, timestamp, savedAt, settlement, config, toggles, seed, aiData, campaignState{phase, eventLog, systemState, locks, generatedAt, editedAt, canonizedAt, lastExportAt, narrativeDrift, exportState}, versionHistory, gallery/access fields} (saves.js:395-438).

**Export paths.**

| path | source | what leaves |
|---|---|---|
| account export | `src/lib/accountData.js:548 buildAccountExport / :609 downloadAccountExport` | save envelopes with the whole dossier minus dmLayer and decrees (accountData.js:191-196, also inside versionHistory and parked campaign snapshots) |
| world export | `src/lib/worldExport.js:112 buildWorldExport (format 'settlementforge-world' v1)` | per member {id (save id first, else dossier id), name, tier, dossier: toPublicSafe(dossier, {full: variant==='dm'})}; not wired to an in-app control (consumed by the offline Foundry/MCP packages) |
| public / gallery projection | `src/domain/display/publicSafe.js:253 toPublicSafe` | root allowlist PUBLIC_TOPLEVEL_KEYS (:52-60, 38 keys: drops _seed, _config, simulationTrace, aiOverlays, userCanon, generationCoherenceReceipt, culturalIdentity, culturalNotes, isolationSupport and every lived key not listed; keeps stress and stressors); deep denylist PRIVATE_KEY_RE (:110: secret, dm, hook, seed, _config, decrees, …); NPC allowlist (:122) |

## 2. Required keys and identity keys

**Required root keys (41, CONFIRMED).** `_config`, `_seed`, `activeConditions`, `aiOverlays`, `arrivalScene`, `availableServices`, `coherenceNotes`, `config`, `conflicts`, `culturalIdentity`, `culturalNotes`, `defenseProfile`, `economicState`, `economicViability`, `factions`, `generationCoherenceReceipt`, `generatorVersion`, `history`, `id`, `institutions`, `isolationSupport`, `name`, `neighborRelationship`, `npcs`, `population`, `powerStructure`, `pressureSentence`, `prominentRelationship`, `relationships`, `resourceAnalysis`, `schemaVersion`, `settlementReason`, `simulationTrace`, `simulationVersion`, `spatialLayout`, `stress`, `stressors`, `structuralSuggestions`, `structuralViolations`, `tier`, `userCanon`.

The 41 root keys every generated, normalized dossier carries (SettlementForge's own GENERATED_KEYS, recordRegister.js:52-60, each unconditional in the producer chain: CONFIRMED by reading). Values may be null/[]/{} (neighborRelationship null, stress null, coherenceNotes [], aiOverlays [], userCanon {}).

**Conditional at generation:** `customContentProvenance`, `customContentRoster`. **Save path / app:** `neighbourNetwork`, `interSettlementRelationships`, `crossSettlementConflicts (no writer)`, `populationHistory`, `dmLayer`, `decrees`, `peaceOffers`, `mapEdits (component-stamped {layoutLawVersion: 2})`, `_regenSeed`. **Lived (world pulse, events):** `populationHistory`, `tierHistory`, `institutionHistory`, `resourceHistory`, `calamityHistory`, `urbanFabric`, `npcLadder`, `traditions`, `thievesGuildStrength`, `lifecycleStatus`, `lifecycleHistory`, `status/destroyedAt/destroyedByEventId/destroyedCause`, `parentRef`, `config.peakTier`, `config.eventConditions`, `config.primaryDeitySnapshot`, `config.cultDeitySnapshots`, `economicState.treasury`, `economicState.foodSecurity.stockpile`, `powerStructure.previousGovernments`, `powerStructure.factions[].controlledInstitutions/suppressedInstitutions/updatedByPulse/…`, `institutions[].id/status/impairments/foundedAt/worldPulseFate/…`, `npcs[].timesExposed/ousted/replacedNpc/whereabouts`.

| record | identity key | form | stability |
|---|---|---|---|
| settlement | `id` | 's_' + 16 hex = FNV-1a mix of _seed (normalizeSettlement.js:63-79, :191) | reload, edits, same-seed regeneration; a new seed is a new id |
| settlement (host storage) | `save envelope id (UUID)` | saves.js newSaveId :115 | the realm/campaign/worldState key; worldExport memberKey prefers it (worldExport.js:76-81) |
| settlement seed | `_seed` | string | WORLD class; secret on public projections |
| institution | `name` | catalog row name | SettlementForge's join key (KEYED_COLLECTIONS institutions:'name'); renames via the governed cascade institutionRename.js |
| institution kind | `catalogId` | slug of the name (institutionalCatalog.js:1788-1829) | a KIND key; unchanged for every pinned name |
| custom institution | `localUid / customDefinitionId` | registry uid / exact definition identity | rename-proof |
| institution (pulse/event minted) | `id` | 'institution.<stablePart(name)>' | once minted |
| npc | `id` | 'npc_<n>' \| 'npc.<faction>_<role>_<i>' \| 'npc.successor_<n>' | reload and edits; not an NPC reroll or regeneration |
| power faction | `faction` | name; optional authored id honoured | name-keyed; governed rename cascade factionRename.js |
| social faction | `name` | group name | name only |
| relationship | `(npc1Id, npc2Id, type)` | KEYED_COLLECTIONS | with the NPC ids |
| conflict | `(parties, issue)` | KEYED_COLLECTIONS |  |
| active condition | `id` | 'condition.<archetype>.<suffix>' (SF merges by archetype) | once stored |
| supply chain | `needKey + chainId` | catalog keys (SF keyed merge uses label) | while the chain exists |
| quarter | `name` | 14 fixed names |  |
| service | `name within its bucket` |  |  |
| historical event | `name; campaign-era campaignEventId` | 'campaign.<id>.<resolvedAt\|tick>' |  |
| resource condition / resource chain | `key / chainKey` | catalog keys |  |
| neighbour link | `neighbourNetwork[].id` | 'generated_<name>' \| 'link_*' \| 'live_*' | once persisted |
| trade link | `(direction, good, partner, goodId)` | dedupe key generateEconomy.js:254-262 |  |
| receipt check / judgment / repair | `id / id / (type, subject, action)` | KEYED_COLLECTIONS |  |

## 3. Changes between 5d699cc68 and 00b648c9d

From `git diff 5d699cc68 00b648c9d` over the dossier's sources (80 files read for key changes, then by hand); every entry CONFIRMED by reading both sides.

| kind | path | what changed | source at 00b648c9d |
|---|---|---|---|
| removed | `institutions[].minTier` | 10 pinned catalog rows carried minTier onto their records (Airship docking (high magic), Colosseum/arena, Dragon resident, Dream parlors (high magic), Gambling district, Message network (high magic), Multiple theaters, Opera house, Planar traders, Smuggling network); the rebuilt registry has no such key (ENTRY_KEYS institutionalCatalog.js:52-59) and those kinds now sit only at their own tier (commit 6efa6be61 (2026-09-30, THE URBAN BAND)) | `src/data/institutionalCatalog.js:52-59, :1656-1683` |
| reshaped (tightened) | `institutions[].baseChance` | now on every catalog-drawn record (deriveRow writes required and baseChance always); at the pin 5 kinds lacked baseChance (Inn (multiple), Taverns (5-20), Inns and taverns (district), Warehouse district, Garrison) | `src/data/institutionalCatalog.js:1663-1664` |
| added (registry only, never on a record) | `catalog guards minPopulation / requiresAny` | 11 tier rows: Money changers, Wizard's tower, Mages' guild (town), Cathedral (10,000+ only), Enchanter's shop, Thieves' guild chapter, Bardic college (city) by population floor; Post relay station (town/city/metropolis) and Gates (if walled) by prerequisite | `src/data/institutionalCatalog.js:58, :1684-1786` |
| value domain | `institutions[].name / catalogId` | catalog rebuilt as one family per function: 281 distinct kinds (one new: Housing (5000+ structures)); tier rows 19/38/72/115/130/144 (pin 19/37/59/85/90/26, metropolis merged with city at roll time); every pinned name and therefore every pinned catalogId still exists (commit 6efa6be61) | `src/data/institutionalCatalog.js` |
| value domain | `institutions[].category` | 44 kinds changed shelf (category), e.g. Mercenary quarter Adventuring->Defense, Merchant warehouses Adventuring->Economy, Palisade Infrastructure->Defense, Druid Circle Magic->Religious, Warden's Lodge Magic->Defense, Palace/government complex Government->Infrastructure (full list in catalogDelta.shelfMoves) | `src/data/institutionalCatalog.js` |
| behaviour (rosters move for a same seed) | `institutions[]` | metropolis no longer merges the city block (assembleInstitutions.js:265-270 vs pinned mergeCatalogs); one draw per exclusive group with proportional winner (assembleInstitutions.js:329-450); row guards honoured by assemble, cascade and faction correlation; coherence repairs of hard violations take own-tier rows only (coherenceRepairPass.js:60-80) | `src/generators/steps/assembleInstitutions.js, src/generators/steps/coherenceRepairPass.js` |
| value | `institutions[].priorityCategory` | druidic institutions re-stamped to their faith role by coherenceRepairPass.js:519-525 (J30 a druid is a priest where magic does not work) (commit d04a2f63e) | `src/generators/steps/coherenceRepairPass.js:519-525` |
| value | `defenseProfile.scores.monster / defenseProfile.traditions.hasDruid / economicState.foodSecurity.*` | Warden's Lodge no longer counts as druid (defence, food); it adds +12 monster defence (defenseGenerator.js:213); magicOn now read from the world law (commit e55d37331, a1841d417) | `src/generators/defenseGenerator.js:80-122, :213; src/generators/foodGenerator.js` |
| value (rng) | `pressureSentence, arrivalScene` | each drawn on its own child stream (assembleSettlement.js:217-218); arrivalScene recomposed from new pools (narrative/arrivalScene.js, data/arrivalProse.js); still a string (commit ed3768dc1, d2dfd88b5, e76ea7f3c) | `src/generators/steps/assembleSettlement.js:213-218` |
| value (prose) | `economicViability.summary, .issues[].description, .suggestions[].description` | summary counts the published dependencies list; institution names go through institutionDisplayName (commit 4f4747a2b) | `src/generators/economy/viability.js:80-102, :577-612` |
| value (prose) | `populationHistory[].reason, resourceHistory[].reason` | pulse outcome headlines reworded (herald voice: under way / done); a new appliedHeadline field lives on the outcome, not on the dossier | `src/domain/worldPulse/populationDynamics.js, tierResourceDynamics.js, candidateEvents.js` |
| unchanged | `root keys, schema, normalize, version stamps, save path, exports` | GENERATED_KEYS identical; settlement.schema.js, normalizeSettlement.js, settlementMigrations.js, fieldManifest.js, conditionPromotion.js, activeConditions.js, saves.js, worldExport.js, accountData.js, publicSafe.js have no diff; SCHEMA_VERSION 1 and generatorVersion 0.9.0 did NOT move although outputs moved | `git diff --stat 5d699cc68 00b648c9d -- <those paths> (empty)` |

**The catalog, tier by tier** (pin: metropolis = city ∪ metropolis as rolled; now: each block complete):

| tier | pin rows | now rows | pin required | now required | added | dropped |
|---|---|---|---|---|---|---|
| thorp | 19 | 19 | 5 | 5 | 0 | 0 |
| hamlet | 37 | 38 | 7 | 7 | 1 | 0 |
| village | 59 | 72 | 7 | 8 | 14 | 1 |
| town | 85 | 115 | 13 | 13 | 32 | 2 |
| city | 90 | 130 | 14 | 16 | 49 | 9 |
| metropolis | 115 | 144 | 14 | 16 | 50 | 21 |

Required flips: city: Craft guilds (30-80) (now required); metropolis: Advanced water infrastructure (now required), Craft guilds (100-150+) (now required), District markets (5-10) (now required), Massive walls and fortifications (now required), Multiple court buildings (now required), Multiple garrisons (now required), Parish churches (50-100+) (now required), State granary complex (now required). The full added/dropped name lists per tier and the 44 shelf moves are in the JSON (`catalogDelta`).

## 4. The in-development items

| item | on the dossier? | where it lives | what the dossier shows instead |
|---|---|---|---|
| forces (armies) and their sizes | no (CONFIRMED) | campaign state: worldState.deployments[saveId] (stateful army record: targetId, sinceTick, role, maxStartStrength, currentEffectiveStrength on the 0-100 capacity axis — a strength, not a headcount; pulseShapes.js:44-51; warArmyRecord.js) and spatialLedgers.armyTransit (positions; dormant without spatial canon); worldState.occupations | only conditions: war_mobilization / war_pressure / siege archetypes with triggeredAt {tick, sourceEventType WAR_LAYER_*} and causes; no size field |
| coalitions | no (CONFIRMED) | worldState: one closed join anchor in a deployment's joinLedger, no membership list (warCoalitionLedger.js:1-6); gated by warLayerEnabled + warTerminationEnabled + peaceEngineEnabled + coalitionLedgerEnabled | peaceOffers (saved-only root key) is the one war-adjacent dossier key |
| travelling groups | no (CONFIRMED) | migration columns in spatialLedgers.migration (migrationKernel.js, dormant without spatial canon); envoy errands in worldState envoy ledgers | a refugee flow raises regional_migration_pressure (flows.js:99-104) with no headcount; the count lands only as populationHistory[].delta on source and destination; an individual NPC away carries npcs[].whereabouts {state, placeId, purposeKind, sinceTick, expectedReturnTick, missionId} |
| current-week stamp | no root stamp (CONFIRMED) | worldState.tick and worldState.calendar.elapsedWeeks (campaign) | economicState.treasury.lastTick (every tick, only under treasuryEnabled); economicState.foodSecurity.stockpile.lastTick (tick of the stockpile's last CHANGE; plus season and seasonWeek under seasonsEnabled); powerStructure.factions[].updatedByPulse and neighbourNetwork[].updatedByPulse (tick of last change) |
| conditions' triggeredAt | yes (CONFIRMED) | {tick, sourceEventType, sourceEventTargetId} (activeConditions.js:629-633) | world tick on pulse-raised conditions (37 of the 51 triggeredAt literals in src/ carry it); 0 at generation (sourceEventType GENERATION) and on authored-event conditions (the 10 literals in mutateWorld.js, mutateEntities.js and crisisLifecycle.js carry no tick, so deriveActiveCondition defaults it to 0, activeConditions.js:630); the other 3 tickless literals are record-mode comparison probes (mobilizationEffects.js:62, occupationRecordMode.js:94, warRecordMode.js:94) whose candidate is never stored |
| history ticks | partly (CONFIRMED) | with a tick: populationHistory[].tick (or null); history.historicalEvents[].tick on campaign-era entries; calamityHistory[].tick (+year); institutionHistory[] {year, tick} when stamped; institutions[].foundedAt {year, tick}; powerStructure.previousGovernments[].tick; lifecycleHistory[].tick; urbanFabric.scars[].week / rebirths[].week; parentRef.foundedTick / graduatedTick | without: resourceHistory[] {resource, state, outcomeId, reason} — both writers (tierResourceDynamics.js:732-740, resourceDynamicsKernel.js:875-878); SettlementForge says so itself (rosterProvenance.js:320-323); tierHistory[] {fromTier, toTier, direction, outcomeId, institutionFates} |
| custom definition fields | partly (CONFIRMED) | customContentRoster / customContentProvenance | customContentRoster carries definition fields only for deities, factions, stressors and traditions (livingContentLaw.js:151-156) and only in lit v2 worlds; a custom institution's record carries identity and presentation tokens but none of its definition fields; customContentProvenance carries definition identity, not bodies |

## 5. What this means for our port (facts for the port lane; the fixes are that lane's)

- resourceHistory[] carries no tick at 00b648c9d (and did not at the pin): a port row reading resourceHistory[].tick always takes its fallback.
- tierHistory[] carries no tick.
- generatorVersion stayed 0.9.0 and schemaVersion 1 across 154 commits that moved outputs: neither stamp can select an adapter line between 5d699cc68 and 00b648c9d.
- 44 institution kinds changed category (shelf); any kinds/zoning table keyed by (category, name) or reading category needs the new shelves; catalogIds are unchanged.
- minTier no longer appears on institution records.
- Metropolis rosters no longer inherit the city block; metropolis-scale successors replace the lesser city kinds (e.g. Housing (5000+ structures)).
- No forces, coalitions, travelling groups or current-week stamp on the dossier: the item 125 (b) fallbacks stay in force.

## 6. Field rows

`required`: **required** = written unconditionally whenever its parent exists (for root keys: on every generated, normalized dossier); **conditional** = written at generation only under a stated condition; **lived** = written after birth by the world pulse or an authored event; **saved** = written by the save path or the app (SettlementForge's SAVED_ONLY keys); **editor** = Edit-Mode keys (never exported); **removed** = present at the pin, gone at 00b648c9d. `source` is `file:line` inside the SettlementForge repository at `00b648c9d`. A `delta` mark names a change since the pin.

### Root (67)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `name` | string | required | culture-flavoured name; config.customName wins; a held name under Edit Mode pins | `src/generators/steps/assembleSettlement.js:125` | identity by display only; renames go through the governed rename cascades |
| `tier` | string | required | thorp\|hamlet\|village\|town\|city\|metropolis (schema Tier typedef also lists capital, never emitted) | `src/generators/steps/assembleSettlement.js:126` | LIVE (fieldManifest.js:204); moves only by tierOutcomeApply |
| `population` | integer | required | thorp 8-60, hamlet 61-400, village 401-900, town 901-5000, city 5001-25000, metropolis 25001-100000 (data/constants.js) | `src/generators/steps/assembleSettlement.js:127` | LIVE (fieldManifest.js:195) |
| `institutions` | array<Institution> | required | 7-65 records; see institutions[] rows | `src/generators/steps/assembleSettlement.js:128` | keyed by name (KEYED_COLLECTIONS institutions:"name", recordRegister.js) |
| `structuralViolations` | array<object> | required | usually []; {type, reason, ...} rows from structuralValidator | `src/generators/steps/assembleSettlement.js:129` | snapshot (fieldManifest.js:252) |
| `structuralSuggestions` | array<object> | required | usually [] | `src/generators/steps/assembleSettlement.js:130` | snapshot (fieldManifest.js:264) |
| `neighborRelationship` | object\|null | required | null unless generated against an imported neighbour | `src/generators/steps/assembleSettlement.js:131` | key always present; value null at most births |
| `economicState` | object | required | 19 keys (+ optional custom/neighbour keys) | `src/generators/steps/assembleSettlement.js:138` |  |
| `spatialLayout` | object | required | {layout, quarters[], tradeAccess} | `src/generators/steps/assembleSettlement.js:139` | never rewritten by the world pulse |
| `availableServices` | object<bucket, array<Service>> | required | 11 buckets | `src/generators/steps/assembleSettlement.js:140` |  |
| `powerStructure` | object | required | 10-11 keys incl. the dual-written conflicts | `src/generators/steps/assembleSettlement.js:145` |  |
| `settlementReason` | array<string> | required | prose lines | `src/generators/steps/assembleSettlement.js:146` |  |
| `npcs` | array<NPC> | required | 2-22 notables | `src/generators/steps/assembleSettlement.js:147` | replaced by generateCoherence (narrativeGenerator.js:1003) and appended by ensureFactionStructuralNpcs (assembleSettlement.js:302) |
| `relationships` | array<Relationship> | required | NPC-NPC pairs | `src/generators/steps/assembleSettlement.js:148` |  |
| `factions` | array<SocialFaction> | required | NPC social groups (NOT the power factions) | `src/generators/steps/assembleSettlement.js:149` |  |
| `conflicts` | array<Conflict> | required | 0-2 at birth | `src/generators/steps/assembleSettlement.js:150` |  |
| `resourceAnalysis` | object | required | 13 keys | `src/generators/steps/assembleSettlement.js:151` |  |
| `economicViability` | object | required | 8 keys | `src/generators/steps/assembleSettlement.js:152` | snapshot (fieldManifest.js:240) |
| `history` | object | required | age, founding, historicalEvents, currentTensions, historicalCharacter, eventsTimeline, siegeNarrative (+legacyAnnotations, ancientRuin) | `src/generators/steps/assembleSettlement.js:153` | rewritten by generateCoherence (narrativeGenerator.js:1011) |
| `isolationSupport` | object | required | IsolationSupportReceipt v1; status connected for non-isolated | `src/generators/steps/assembleSettlement.js:154` |  |
| `culturalIdentity` | object | required | CulturalIdentity (11 profile keys + mixed) | `src/generators/steps/assembleSettlement.js:159` |  |
| `culturalNotes` | string | required | prose projection of culturalIdentity | `src/generators/steps/assembleSettlement.js:160` |  |
| `stress` | null\|object\|array<Stressor> | required | null (no stressor), one object, or an array — three shapes | `src/generators/steps/assembleSettlement.js:166` | same object reference as stressors |
| `stressors` | null\|object\|array<Stressor> | required | alias of stress (FIELD_ALIASES stressors:[stress,stresses], settlement.schema.js:62) | `src/generators/steps/assembleSettlement.js:167` |  |
| `config` | object | required | RESOLVED generation config (~30 keys); open bag: raw config keys pass through | `src/generators/steps/assembleSettlement.js:174` | never a generation input; _config is |
| `_config` | object | required | RAW user config with sentinels (random, random_culture …) | `src/generators/steps/assembleSettlement.js:180` | the regeneration input; SECRET on public projections (publicSafe.js:110) |
| `pressureSentence` | string | required | one prose sentence | `src/generators/steps/assembleSettlement.js:217` | drawn on child stream "pressure-sentence" since 2026-10-02 — **delta:** rng-substream (values move for a same seed) |
| `arrivalScene` | string | required | prose scene | `src/generators/steps/assembleSettlement.js:218` | drawn on child stream "arrival-scene"; producer rebuilt (narrative/arrivalScene.js + data/arrivalProse.js) — **delta:** rng-substream + new prose pools (values move) |
| `defenseProfile` | object | required | scores, readiness, institutions, magicDependency, traditions, chainModifiers, economicGates | `src/generators/steps/assembleSettlement.js:219` |  |
| `prominentRelationship` | object\|null | required | {npc1, npc2, type, phrasing, full, tension} or null | `src/generators/narrativeGenerator.js:1009` | key always written by generateCoherence; null on many seeds |
| `coherenceNotes` | array<string> | required | usually [] | `src/generators/narrativeGenerator.js:1010` | snapshot (fieldManifest.js:276) |
| `generationCoherenceReceipt` | object | required | GenerationCoherenceReceipt v1 | `src/generators/steps/assembleSettlement.js:314` | carries the generation seed in .seed |
| `simulationTrace` | array<TraceEntry> | required | 19-118 entries; ~23% of the bytes | `src/generators/steps/assembleSettlement.js:329` | written when non-empty; normalize defaults [] (normalizeSettlement.js:210) |
| `_seed` | string | required | the generation seed (options.seed \| config._seed \| generateSeed()) | `src/generators/generateSettlementPipeline.js:146` | IDENTITY input; also stamped at assembleSettlement.js:338; SECRET on public projections |
| `simulationVersion` | integer | required | 1 (SIMULATION_VERSION, settlement.schema.js:48) | `src/domain/normalizeSettlement.js:186` | stamped only when absent |
| `generatorVersion` | string | required | '0.9.0' (GENERATOR_VERSION, settlement.schema.js:49) | `src/domain/normalizeSettlement.js:187` | stamped only when absent; did not move between the two commits |
| `id` | string | required | 's_' + 16 hex: FNV-1a of _seed (idFromSeed, normalizeSettlement.js:63-79); content hash when no seed | `src/domain/normalizeSettlement.js:191` | IDENTITY KEY; stable across reload and same-seed regeneration; stamped only when absent |
| `activeConditions` | array<ActiveCondition> | required | [] unless a crisis stressor or an authored event condition | `src/domain/normalizeSettlement.js:209` | then promoteStressorsToConditions / reapplyEventConditions (assembleSettlement.js:355) |
| `aiOverlays` | array | required | [] at birth | `src/domain/normalizeSettlement.js:211` | AUTHORED class |
| `userCanon` | object | required | {} at birth | `src/domain/normalizeSettlement.js:212` | AUTHORED class |
| `schemaVersion` | integer | required | 1 (SCHEMA_VERSION, settlement.schema.js:47); migration chain 0->1 only | `src/domain/settlementMigrations.js:54` | a save with schemaVersion > 1 passes through unchanged with a warning (settlementMigrations.js:101-108) |
| `customContentProvenance` | object | conditional | present only when the run had a reviewed content environment, a binding hash or a materialized custom definition | `src/generators/generateSettlementPipeline.js:153` |  |
| `customContentRoster` | object | conditional | present only when config._livingContentLawVersion is 2 AND the run held a living-content definition | `src/generators/generateSettlementPipeline.js:190` | recording, not adoption (generateSettlementPipeline.js:173-175) |
| `populationHistory` | array<object> | saved/lived | last 12 entries {tick, delta, population, reason, outcomeId} | `src/domain/worldPulse/populationDynamics.js:599` | SAVED_ONLY (recordRegister.js:62); tick = outcome.generatedAtTick\|\|outcome.tick\|\|null; reason = outcome headline (prose reworded 2026-10-02) — **delta:** value: reason prose changed (herald voice) |
| `tierHistory` | array<object> | lived | last 12 {fromTier, toTier, direction, outcomeId, institutionFates[]} — NO tick | `src/domain/worldPulse/tierOutcomeApply.js:379` |  |
| `institutionHistory` | array<object> | lived | last 24 {name, category, fate (built\|reopened\|closed …), tier, outcomeId, reason, + {year, tick} founding stamp when stamped} | `src/domain/worldPulse/institutionLifecycle.js:972` | appendInstitutionHistory institutionLifecycle.js:912-917 |
| `resourceHistory` | array<object> | lived | depletion/discovery entries with tick and state | `src/domain/worldPulse/tierResourceDynamics.js:732` |  |
| `calamityHistory` | array<object> | lived | last 8 {type, name, year, tick, deaths, exodus, k, targets[], flavorText?} | `src/domain/worldPulse/calamityKernel.js:501` | stamp literal calamityKernel.js:491-497; realistic_regional (disastersEnabled) |
| `urbanFabric` | object | lived | {drift, stocks{districtClass:0-1}, scars[{kind,severity,week}], rebirths[{classes,type,week}]} | `src/domain/worldPulse/urbanFabricKernel.js:779` | SF's own map memory; urbanFabricEnabled |
| `npcLadder` | object | lived | faction rung ladder | `src/domain/worldPulse/npcLadderKernel.js:1016` |  |
| `traditions` | array<object> | lived | festivals {id, name, type, window, staging, deity, ...} | `src/domain/worldPulse/traditionsKernel.js:843` |  |
| `thievesGuildStrength` | number | lived | 0-1 | `src/domain/worldPulse/thievesGuild.js:108` |  |
| `lifecycleStatus` | string | lived | settlement lifecycle (first-class lifecycle kernel) | `src/domain/worldPulse/settlementLifecycleFirstClass.js:642` |  |
| `lifecycleHistory` | array<object> | lived | lifecycle transitions | `src/domain/worldPulse/settlementLifecycleFirstClass.js:653` |  |
| `status` | string | lived | 'destroyed' after DESTROY_SETTLEMENT | `src/domain/events/mutateEntities.js:69` |  |
| `destroyedAt` | string | lived | event time (ISO) | `src/domain/events/mutateEntities.js:70` |  |
| `destroyedByEventId` | string | lived | event uuid | `src/domain/events/mutateEntities.js:71` |  |
| `destroyedCause` | string\|null | lived | event target or payload cause | `src/domain/events/mutateEntities.js:72` |  |
| `parentRef` | object | lived | SettlementParentRef v1 {parentId, sourceSatelliteId, birthId, liveEdgeId, foundedTick, graduatedTick, foundingTier, graduationTier, graduationPopulation, provenance, site?, resources?, provisioningRecord?, conveyed?} | `src/domain/settlementParentRef.js:88` | typedef settlement.schema.js:196-220; members founded from a satellite |
| `neighbourNetwork` | array<object> | saved | {id generated_*\|link_*\|live_*, name, neighbourName, neighbourTier, tier, relationshipType, description, fromGeneration, updatedByPulse?} | `src/lib/saves.js:365` | SAVED_ONLY; derived from neighborRelationship at save (withNeighbourNetworkFromRelationship saves.js:357); relationshipType LIVE (fieldManifest.js:172); pulse stamp applyWorldPulseRelationshipGraph.js:220 |
| `interSettlementRelationships` | array<object> | saved | reciprocal neighbour back-link records | `src/domain/relationships/neighbourBackLink.js:144` | SAVED_ONLY |
| `crossSettlementConflicts` | array | saved | declared; NOT_YET_WRITTEN_KEYS (recordRegister.js:131) | `src/domain/edit/recordRegister.js:36` | no writer at 00b648c9d |
| `peaceOffers` | object | saved | standing peace offers keyed by counterparty (EM-E4) | `src/domain/edit/recordRegister.js:40` | writers peaceTermsDrafting.js withPeaceOffer/withoutPeaceOffer |
| `dmLayer` | object | editor | the DM's Edit-Mode layer | `src/store/editSlice.js:302` | dropped from account export (accountData.js:191-196) and denied on every public projection (\bdm token) |
| `decrees` | object | editor | the decree registry | `src/domain/worldPulse/decreeHook.js:409` | dropped from account export; denied on public projections (decrees token) |
| `_regenSeed` | string | lived | seed of the LAST section reroll (NPC or history) | `src/generators/generateSettlementPipeline.js:613` | folded onto the root by the store; also :713 |
| `mapEdits` | object | saved | {layoutLawVersion: 2} stamped on every new save (+ legacy cosmetic keys on old saves) | `src/store/operationRegistry.js:326` | written by components at save (SaveToLibraryButton); ignored by the port |

### Custom content (8)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `customContentProvenance.schemaVersion` | integer | required | 1 | `src/domain/content/settlementContentProvenance.js:383` |  |
| `customContentProvenance.scope` | string | required | campaign\|standalone | `src/domain/content/settlementContentProvenance.js:384` |  |
| `customContentProvenance.environment` | object\|null | required | {environmentId, environmentRevisionId, environmentHash, source} | `src/domain/content/settlementContentProvenance.js:385` |  |
| `customContentProvenance.bindingHash` | string\|null | required | sha256 hex or null | `src/domain/content/settlementContentProvenance.js:386` |  |
| `customContentProvenance.materializedDefinitions[]` | array<object> | required | {category, definitionId, revisionId, contentHash, localUid, name, ..., surfaces[]} | `src/domain/content/settlementContentProvenance.js:336` | definition identity only; the definition body is NOT carried |
| `customContentProvenance.receiptHash` | string | required | fingerprint of the core | `src/domain/content/settlementContentProvenance.js:392` |  |
| `customContentRoster.schemaVersion` | integer | required | 1 (livingContentRoster.js:138) | `src/domain/content/livingContentRoster.js:267` |  |
| `customContentRoster.buckets` | object<bucket, array<row>> | required | buckets only from deities, factions, stressors, traditions (livingContentLaw.js:151-156); row = {source custom, isCustom, customDefinitionCategory, localUid?, customDefinition* identity, + the category's declared fields} | `src/domain/content/livingContentRoster.js:268` | NO institutions/services/resources/supply-chain buckets: a custom institution's definition fields are not on the dossier |

### Lived history arrays (5)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `populationHistory[].tick` | integer\|null | required | world tick (week) | `src/domain/worldPulse/populationDynamics.js:602` |  |
| `populationHistory[].delta` | integer | required | signed people | `src/domain/worldPulse/populationDynamics.js:603` |  |
| `populationHistory[].population` | integer | required | population after | `src/domain/worldPulse/populationDynamics.js:604` |  |
| `populationHistory[].reason` | string | required | outcome headline or candidateType | `src/domain/worldPulse/populationDynamics.js:605` |  |
| `populationHistory[].outcomeId` | string | required | pulse outcome id | `src/domain/worldPulse/populationDynamics.js:606` |  |

### Institutions (46)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `institutions[].name` | string | required | catalog row name (281 distinct at 00b648c9d) or custom name | `src/generators/steps/assembleInstitutions.js:503` | IDENTITY KEY (KEYED_COLLECTIONS institutions:"name"); count ranges live in the name, e.g. "Housing (180-1000 structures)" — **delta:** value domain: catalog rebuilt (281 kinds, 518 tier rows) |
| `institutions[].category` | string | required | Economy\|Crafts\|Religious\|Government\|Infrastructure\|Defense\|Magic\|Adventuring\|Criminal\|Entertainment\|Exotic (SHELF_ORDER, institutionalCatalog.js:46); custom: free text | `src/generators/steps/assembleInstitutions.js:503` |  — **delta:** value: 44 kinds changed shelf (category) |
| `institutions[].required` | boolean | required | true for the tier core | `src/data/institutionalCatalog.js:1663` | always written by deriveRow (institutionalCatalog.js:1665); cascade forces false (cascadeGenerator.js:211) — **delta:** now always derived; per-tier required sets changed |
| `institutions[].baseChance` | number | required | 0-1; defaults 1 if required else 0 | `src/data/institutionalCatalog.js:1664` | always written by deriveRow (institutionalCatalog.js:1666) |
| `institutions[].desc` | string | required | catalog text | `src/data/institutionalCatalog.js:52` | catalog rows: every row carries desc |
| `institutions[].tags` | array<string> | required | canonical tag vocabulary (data/entityTags.js) | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].priorityCategory` | string | conditional | government\|economy\|military\|religion\|magic\|criminal\|infrastructure\|… | `src/data/institutionalCatalog.js:52` | druid institutions re-stamped by coherenceRepairPass.js:519-525 (druidicFaithRole) — **delta:** value: druidic rows may change priorityCategory |
| `institutions[].exclusiveGroup` | string | conditional | e.g. government | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].exclusiveGroupCoexists` | boolean | conditional | true | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].tradeRouteRequired` | array<string> | conditional | access keys | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].terrainAccess` | array<string> | conditional | terrain keys | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].terrainRequired` | array<string> | conditional | terrain keys | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].forbiddenTradeRoutes` | array<string> | conditional | access keys | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].forbiddenResources` | array<string> | conditional | deposit keys, e.g. marshlands, fertile_floodplain | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].exclusionConditions` | array<string> | conditional | institution names | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].magicLicense` | string | conditional | e.g. high | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].serviceKeys` | array<string> | conditional | info_calibration\|info_query\|info_feed\|info_plant\|… | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].facets` | object | conditional | {clandestine?: "clandestine", subterranean?: "subterranean"} | `src/data/institutionalCatalog.js:52` |  |
| `institutions[].minTier` | string | removed | was on 10 pinned rows (city/village rows gated to a higher tier) | `src/data/institutionalCatalog.js:58` | no catalog row declares it at 00b648c9d (ENTRY_KEYS institutionalCatalog.js:52-59); the guards minPopulation/requiresAny live in the registry and never ride onto a record (:1676-1683) — **delta:** REMOVED from institution records |
| `institutions[].source` | string | required | required\|generated\|forced\|nearbyResources\|cascade\|faction_boost\|coherence_repair\|custom (+ authored/event values later) | `src/generators/steps/assembleInstitutions.js:503` |  |
| `institutions[].catalogId` | string | conditional | slug of the name (catalogIdForName, institutionalCatalog.js:1826); absent on custom and DM-added records | `src/generators/steps/assembleInstitutions.js:849` | KIND KEY, not an instance key; unchanged for the 280 pinned names |
| `institutions[].forcedByToggle` | boolean | conditional | true on toggle-forced rows | `src/generators/steps/assembleInstitutions.js:656` |  |
| `institutions[].outOfTier` | boolean | conditional | true on a forced row from another tier | `src/generators/steps/assembleInstitutions.js:659` |  |
| `institutions[].nativeTier` | string | conditional | tier key; on forced rows (assembleInstitutions.js:598, :660) and coherence-repair rows | `src/generators/steps/assembleInstitutions.js:660` | coherence repairs of hard violations now draw only own-tier rows (coherenceRepairPass.js:60-80) — **delta:** value: hard-violation repairs own-tier only |
| `institutions[].forcedByIsolation` | boolean | conditional | true on the isolated-settlement magic infrastructure | `src/generators/isolationGenerator.js:84` |  |
| `institutions[].cascadeAdded` | boolean | conditional | true | `src/generators/cascadeGenerator.js:212` |  |
| `institutions[].cascadeBoost` | number | conditional | cascade weight | `src/generators/cascadeGenerator.js:212` |  |
| `institutions[].tier` | string | conditional | on faction-boost rows | `src/generators/factionCorrelation.js:219` |  |
| `institutions[].factionSource` | string | conditional | power faction name that pulled the row | `src/generators/factionCorrelation.js:221` |  |
| `institutions[].coherenceRepair` | string | conditional | repair requirement type (e.g. hard_dependency) | `src/generators/steps/assembleInstitutions.js:816` |  |
| `institutions[].isCustom` | boolean | conditional | true on custom rows | `src/generators/steps/assembleInstitutions.js:707` |  |
| `institutions[].description` | string | conditional | custom row text | `src/generators/steps/assembleInstitutions.js:712` |  |
| `institutions[].localUid` | string | conditional | custom registry uid | `src/generators/steps/assembleInstitutions.js:713` | IDENTITY KEY for custom rows |
| `institutions[].customDefinitionCategory` | string | conditional | 'institutions' | `src/generators/steps/assembleInstitutions.js:714` |  |
| `institutions[].customDefinitionId\|RevisionId\|ContentHash\|Version\|Fingerprint` | string\|number | conditional | exact custom-definition identity (customDefinitionIdentityProjection.js:17-21) | `src/generators/steps/assembleInstitutions.js:715` | rename-proof identity of a custom definition |
| `institutions[].sceneProfileId\|landmarkLevel\|materialFamily\|glyph` | string | conditional | registered presentation tokens (townScene/customBuildingPresentation.js:248-285) | `src/generators/steps/assembleInstitutions.js:719` |  |
| `institutions[].id` | string | lived | 'institution.<stablePart(name)>' on pulse/event-minted rows; generated rows carry none | `src/domain/worldPulse/institutionLifecycle.js:983` |  |
| `institutions[].status` | string | lived | active\|impaired\|removed\|destroyed\|vacant (entities/status.js:107) + ruined (calamity) + remnant (closure) | `src/domain/worldPulse/institutionLifecycle.js:1020` | absent at birth |
| `institutions[].impairments[]` | array<object> | lived | {type capacity\|legitimacy\|influence\|wealth\|staffing\|infrastructure\|access\|corruption\|supply_starved, severity 0-1, causeEventId, description, appliedAt, covert?} | `src/domain/entities/status.js:124` |  |
| `institutions[].worldPulseFate` | string\|null | lived | e.g. destroyed_by_disaster, closure fates | `src/domain/worldPulse/institutionLifecycle.js:1023` |  |
| `institutions[].remnantReason` | string | lived | prose | `src/domain/worldPulse/institutionLifecycle.js:1025` |  |
| `institutions[]._worldPulseInactive` | boolean | lived | true when closed/ruined | `src/domain/worldPulse/institutionLifecycle.js:1021` |  |
| `institutions[]._worldPulseEconomyClosed` | boolean | lived |  | `src/domain/worldPulse/institutionLifecycle.js:1022` |  |
| `institutions[]._worldPulseEconomyBuilt` | boolean | lived | true on pulse-built/reopened rows | `src/domain/worldPulse/institutionLifecycle.js:990` |  |
| `institutions[].foundedAt` | object | lived | {year, tick} — write-once on a NEW pulse institution | `src/domain/worldPulse/institutionLifecycle.js:994` |  |
| `institutions[].createdByWorldPulseOutcomeId\|reopenedBy…\|closedBy…\|builtReason` | string\|null | lived | provenance stamps (domain/provenance/rosterProvenance.js) | `src/domain/worldPulse/institutionLifecycle.js:991` |  |

### Economic state (89)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `economicState.tier` | string | required | tier key | `src/generators/economy/economicState.js:865` |  |
| `economicState.prosperity` | string | required | Subsistence\|Struggling\|Poor\|Moderate\|Comfortable\|Prosperous\|Wealthy | `src/generators/economy/economicState.js:866` |  |
| `economicState.situationDesc` | string | required | prose | `src/generators/economy/economicState.js:867` |  |
| `economicState.incomeSources` | array<object> | required | {source, percentage, desc, weight, priorityNote}; percentages sum to 100 | `src/generators/economy/economicState.js:873` |  |
| `economicState.primaryExports` | array<string> | required | label strings (0-21) | `src/generators/economy/economicState.js:874` |  |
| `economicState.primaryImports` | array<string> | required | label strings (0-12) | `src/generators/economy/economicState.js:875` |  |
| `economicState.transit` | array<string> | required | transit labels | `src/generators/economy/economicState.js:877` |  |
| `economicState.isEntrepot` | boolean | required |  | `src/generators/economy/economicState.js:878` |  |
| `economicState.localProduction` | array<string> | required | labels | `src/generators/economy/economicState.js:879` |  |
| `economicState.necessityImports` | array<string> | required | labels | `src/generators/economy/economicState.js:880` |  |
| `economicState.tradeAccess` | string | required | echo of the access key | `src/generators/economy/economicState.js:881` |  |
| `economicState.priorities` | object | required | {economy, military, religion, magic, criminal} | `src/generators/economy/economicState.js:882` |  |
| `economicState.compound` | object | required | {criminalEffective, militaryEffective, economyOutput, religionInfluence, magicInfluence, raw, inst{has* flags, names}} | `src/generators/economy/economicState.js:883` |  |
| `economicState.safetyProfile` | object | required | {safetyLabel, safetyDesc, guardEffectivenessDesc, crimeTypes[], criminalInstitutions[], economicDragDesc, blackMarketCapture, plotHooks[], safetyRatio, flags, compound} | `src/generators/economy/economicState.js:884` |  |
| `economicState.tradeDependencies` | array<object> | required | {institution, category, resource, detail, severity, impact, affectedServices[]} | `src/generators/economy/economicState.js:885` |  |
| `economicState.institutionalServices` | array<object> | required | {type institutional_service, label, icon, color, output, exportLabel, exportable, institutions[], status} | `src/generators/economy/economicState.js:886` |  |
| `economicState.activeChains` | array<Chain> | required | supply chains by kind | `src/generators/economy/economicState.js:887` |  |
| `economicState.foodSecurity` | object | required | see foodSecurity rows | `src/generators/economy/economicState.js:888` |  |
| `economicState.economicComplexity` | string | required | prose | `src/generators/economy/economicState.js:889` |  |
| `economicState.nativeTradeLabels` | object | conditional | {exports[], imports[]} — only with custom trade endpoints | `src/generators/economy/customTradeEndpointIntegration.js:203` | spread in at economicState.js:872 |
| `economicState.customTradeEndpoints` | object | conditional | {exports[], imports[]} | `src/generators/economy/customTradeEndpointIntegration.js:204` |  |
| `economicState.customTradeLabels` | object | conditional | {exports[], imports[]} | `src/generators/steps/generateEconomy.js:319` |  |
| `economicState.customCategoryExports\|customCategoryImports` | object | conditional | category -> member labels | `src/generators/steps/generateEconomy.js:306` |  |
| `economicState.customChains` | array | conditional | confirmed reviewed custom chains | `src/generators/steps/economyReconcilePass.js:328` |  |
| `economicState.tradeLinks` | array<object> | conditional | only with an imported neighbour | `src/generators/steps/generateEconomy.js:251` |  |
| `economicState.tradeLinks[].good` | string\|boolean | required | label | `src/domain/region/tradeLinks.js:59` |  |
| `economicState.tradeLinks[].goodId` | string\|boolean | required | goods-catalog id or category.<cat> | `src/domain/region/tradeLinks.js:59` |  |
| `economicState.tradeLinks[].direction` | string\|boolean | required | import\|export (flow, not compass) | `src/domain/region/tradeLinks.js:59` |  |
| `economicState.tradeLinks[].partner` | string\|boolean | required | neighbour NAME | `src/domain/region/tradeLinks.js:59` |  |
| `economicState.tradeLinks[].viaNeighbour` | string\|boolean | required | true | `src/domain/region/tradeLinks.js:59` |  |
| `economicState.tradeLinks[].viaCategory` | string\|boolean | conditional | true when matched by category | `src/domain/region/tradeLinks.js:59` |  |
| `economicState.treasury` | object | lived | {coin (absolute integer state coin), openedTick, lastTick, coinFlows{taxed, upkeep, transferredIn, transferredOut, shortfall}} | `src/domain/worldPulse/treasury.js:1257` | treasuryEnabled only; lastTick advances EVERY tick when lit (treasury.js:1169) — the only per-tick week stamp on a dossier |
| `economicState.activeChains[].needKey` | mixed | required | arcane_magical\|knowledge_information\|trade_entrepot\|defense_security\|entertainment_culture\|healing_medicine\|manufacturing\|religion_civic\|food_security\|raw_extraction\|criminal_economy | `src/generators/computeActiveChains.js:373` | IDENTITY: needKey+chainId (KEYED_COLLECTIONS uses label) |
| `economicState.activeChains[].needLabel` | mixed | required |  | `src/generators/computeActiveChains.js:374` |  |
| `economicState.activeChains[].needIcon` | mixed | required |  | `src/generators/computeActiveChains.js:375` |  |
| `economicState.activeChains[].needColor` | mixed | required |  | `src/generators/computeActiveChains.js:376` |  |
| `economicState.activeChains[].chainId` | mixed | required | catalog chain id | `src/generators/computeActiveChains.js:377` | IDENTITY: needKey+chainId (KEYED_COLLECTIONS uses label) |
| `economicState.activeChains[].upstreamChains` | mixed | required | chainIds | `src/generators/computeActiveChains.js:379` |  |
| `economicState.activeChains[].resourceIcon` | mixed | required |  | `src/generators/computeActiveChains.js:380` |  |
| `economicState.activeChains[].resource` | mixed | required | resource label\|null | `src/generators/computeActiveChains.js:381` |  |
| `economicState.activeChains[].resourceKey` | mixed | required | deposit key\|null | `src/generators/computeActiveChains.js:382` |  |
| `economicState.activeChains[].resourceCondition` | mixed | required | available\|depleted\|absent | `src/generators/computeActiveChains.js:383` |  |
| `economicState.activeChains[].resourceActive` | mixed | required | boolean | `src/generators/computeActiveChains.js:384` |  |
| `economicState.activeChains[].resourceInputKey` | mixed | required |  | `src/generators/computeActiveChains.js:385` |  |
| `economicState.activeChains[].resourceInputCondition` | mixed | required |  | `src/generators/computeActiveChains.js:386` |  |
| `economicState.activeChains[].resourceInputAvailable` | mixed | required | boolean | `src/generators/computeActiveChains.js:387` |  |
| `economicState.activeChains[].processingInstitutions` | mixed | required | institution NAMES | `src/generators/computeActiveChains.js:388` |  |
| `economicState.activeChains[].outputs` | mixed | required | labels (<=4) | `src/generators/computeActiveChains.js:389` |  |
| `economicState.activeChains[].services` | mixed | required | labels | `src/generators/computeActiveChains.js:390` |  |
| `economicState.activeChains[].exportable` | mixed | required | boolean | `src/generators/computeActiveChains.js:391` |  |
| `economicState.activeChains[].entrepot` | mixed | required | boolean | `src/generators/computeActiveChains.js:392` |  |
| `economicState.activeChains[].entrepotNote` | mixed | required | string\|null | `src/generators/computeActiveChains.js:393` |  |
| `economicState.activeChains[].externalMillNote` | mixed | required |  | `src/generators/computeActiveChains.js:394` |  |
| `economicState.activeChains[].activatedByResource` | mixed | required | boolean | `src/generators/computeActiveChains.js:395` |  |
| `economicState.activeChains[].substituteActive` | mixed | required | boolean | `src/generators/computeActiveChains.js:396` |  |
| `economicState.activeChains[].resourceDepleted` | mixed | required | boolean | `src/generators/computeActiveChains.js:397` |  |
| `economicState.activeChains[].label` | string | required | chain label | `src/generators/computeActiveChains.js:378` | SF's keyed-merge key for the collection |
| `economicState.activeChains[].dependency` | object | conditional | {institution, resource, severity, impact, affectedServices[]} | `src/generators/computeActiveChains.js:427` |  |
| `economicState.activeChains[].status` | string | required | running\|operational\|vulnerable\|impaired\|entrepot | `src/generators/computeActiveChains.js:432` |  |
| `economicState.foodSecurity.label` | mixed | required |  | `src/generators/foodGenerator.js:403` |  |
| `economicState.foodSecurity.foodRatio` | mixed | required |  | `src/generators/foodGenerator.js:406` |  |
| `economicState.foodSecurity.deficitPct` | mixed | required |  | `src/generators/foodGenerator.js:407` | LIVE (fieldManifest.js) |
| `economicState.foodSecurity.surplusPct` | mixed | required |  | `src/generators/foodGenerator.js:408` | LIVE (fieldManifest.js) |
| `economicState.foodSecurity.dailyNeed` | mixed | required |  | `src/generators/foodGenerator.js:409` | snapshot (fieldManifest.js) |
| `economicState.foodSecurity.dailyProduction` | mixed | required |  | `src/generators/foodGenerator.js:410` | snapshot (fieldManifest.js) |
| `economicState.foodSecurity.rawDeficit` | mixed | required |  | `src/generators/foodGenerator.js:422` |  |
| `economicState.foodSecurity.importCoverage` | mixed | required |  | `src/generators/foodGenerator.js:423` |  |
| `economicState.foodSecurity.magicOffset` | mixed | required |  | `src/generators/foodGenerator.js:424` |  |
| `economicState.foodSecurity.deficit` | mixed | required |  | `src/generators/foodGenerator.js:425` |  |
| `economicState.foodSecurity.effectiveAgriculture` | mixed | required |  | `src/generators/foodGenerator.js:432` |  |
| `economicState.foodSecurity.chains` | mixed | required |  | `src/generators/foodGenerator.js:435` |  |
| `economicState.foodSecurity.activeChains` | mixed | required |  | `src/generators/foodGenerator.js:436` |  |
| `economicState.foodSecurity.activeChainsCount` | mixed | required |  | `src/generators/foodGenerator.js:437` |  |
| `economicState.foodSecurity.diversityNote` | mixed | required |  | `src/generators/foodGenerator.js:438` |  |
| `economicState.foodSecurity.storageMonths` | mixed | required |  | `src/generators/foodGenerator.js:441` | LIVE (fieldManifest.js) |
| `economicState.foodSecurity.storageNote` | mixed | required |  | `src/generators/foodGenerator.js:442` |  |
| `economicState.foodSecurity.importPct` | mixed | required |  | `src/generators/foodGenerator.js:445` |  |
| `economicState.foodSecurity.importDependency` | mixed | required |  | `src/generators/foodGenerator.js:446` |  |
| `economicState.foodSecurity.importNote` | mixed | required |  | `src/generators/foodGenerator.js:447` |  |
| `economicState.foodSecurity.magicTradeChannel` | mixed | required |  | `src/generators/foodGenerator.js:450` | snapshot (fieldManifest.js) |
| `economicState.foodSecurity.magicSupplement` | mixed | required |  | `src/generators/foodGenerator.js:453` |  |
| `economicState.foodSecurity.magicNote` | mixed | required |  | `src/generators/foodGenerator.js:454` |  |
| `economicState.foodSecurity.hasFamine` | mixed | required |  | `src/generators/foodGenerator.js:458` |  |
| `economicState.foodSecurity.hasSiege` | mixed | required |  | `src/generators/foodGenerator.js:459` |  |
| `economicState.foodSecurity.prosperityMod` | mixed | required |  | `src/generators/foodGenerator.js:462` |  |
| `economicState.foodSecurity.resilienceScore` | mixed | required |  | `src/generators/foodGenerator.js:465` | LIVE (fieldManifest.js) |
| `economicState.foodSecurity.isDeficit\|isPressured\|isSecure\|isSurplus` | boolean | required | flags | `src/generators/foodGenerator.js:457` |  |
| `economicState.foodSecurity.customFoodImpact` | object | conditional | {producers, consumers, agricultureCapacityBonus, dailyNeedBonusPct} | `src/generators/foodGenerator.js:476` |  |
| `economicState.foodSecurity.stockpile` | object | lived | {baseDeficitPct, baseSurplusPct, resilienceRest, capacityMonths, reliefPct, tithed, blockaded, blockadeBypass, famished, deployed, lastTick, + season, seasonWeek, seasonalSwingPct, seasonalEvent under seasonsEnabled} | `src/domain/worldPulse/foodStockpile.js:410` | lastTick = tick of the stockpile's LAST CHANGE (record not rewritten on quiet ticks, foodStockpile.js:436-459); seasonWeek = week of year at that change |

### Power structure (33)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `powerStructure.factions` | mixed | required | power factions (2-10) | `src/generators/power/rulingStructure.js:782` |  |
| `powerStructure.governingName` | mixed | required | name of the isGoverning faction | `src/generators/power/rulingStructure.js:787` |  |
| `powerStructure.government` | mixed | required | government type = governing name at birth | `src/generators/power/rulingStructure.js:792` |  |
| `powerStructure.stability` | mixed | required | band string | `src/generators/power/rulingStructure.js:793` |  |
| `powerStructure.recentConflict` | mixed | required | prose\|null | `src/generators/power/rulingStructure.js:794` |  |
| `powerStructure.publicLegitimacy` | mixed | required | {score 0-100, label, breakdown, govMultiplier, crimMultiplier, is* flags} | `src/generators/power/rulingStructure.js:795` |  |
| `powerStructure.factionRelationships` | mixed | required | pairwise relations | `src/generators/power/rulingStructure.js:796` |  |
| `powerStructure.criminalCaptureState` | mixed | required | none\|adversarial\|equilibrium\|corrupted\|capture | `src/generators/power/rulingStructure.js:797` |  |
| `powerStructure.powerProjectionVersion` | string\|number | required | POWER_PROJECTION_VERSION | `src/generators/power/economyReconciliation.js:160` |  |
| `powerStructure.economyInputFingerprint` | string | required | e.g. 'power-economy-v1:c57b7e1d' | `src/generators/power/economyReconciliation.js:161` | RECEIPT class (recordRegister.js:134) |
| `powerStructure.conflicts` | array<Conflict> | required | dual-write of top-level conflicts | `src/generators/steps/assembleSettlement.js:145` |  |
| `powerStructure.previousGovernments` | array<object> | lived | bounded {label, cause, tick} | `src/domain/rulingPower.js:637` | typedef rulingPower.js:92 |
| `powerStructure.factions[].faction` | mixed | required | power faction NAME — the identity key | `src/generators/power/rulingStructure.js:457` | IDENTITY KEY (no id at birth; faction.<snake> derived) |
| `powerStructure.factions[].power` | mixed | required | integer share; roster sums to 100 | `src/generators/power/rulingStructure.js:459` |  |
| `powerStructure.factions[].rawPower` | mixed | required | pre-dynamics power | `src/generators/factionDynamics.js:549` |  |
| `powerStructure.factions[].powerLabel` | mixed | required | Dominant\|Strong\|Significant\|Minor\|Suppressed | `src/generators/factionDynamics.js:564` |  |
| `powerStructure.factions[].desc` | mixed | required | prose | `src/generators/power/rulingStructure.js:460` |  |
| `powerStructure.factions[].isGoverning` | mixed | conditional | true on one | `src/generators/power/rulingStructure.js:461` |  |
| `powerStructure.factions[].category` | mixed | required | government\|military\|economy\|religious\|noble\|magic\|criminal\|… | `src/generators/power/rulingStructure.js:700` |  |
| `powerStructure.factions[].modifier` | string\|null | conditional | governing faction modifier | `src/generators/power/rulingStructure.js:458` |  |
| `powerStructure.factions[].captureState` | string | conditional | stamped on the governing entry when born at equilibrium+ | `src/generators/power/rulingStructure.js:766` |  |
| `powerStructure.factions[].source\|neighbourName` | string | conditional | 'neighbour_mirror' + neighbour name | `src/generators/steps/neighbourFactions.js:89` |  |
| `powerStructure.factions[].id` | string | lived | optional authored/event 'faction.<slug>' id, honoured as alias | `src/domain/factionRefs.js:5` |  |
| `powerStructure.factions[].controlledInstitutions` | array<string> | lived | stablePart(entry.id\|\|entry.name\|\|…) of the first 12 roster rows (factionCompetition.js:155-166) | `src/domain/worldPulse/factionCompetition.js:907` | the only faction->institution link in any output; two factions may hold one kind |
| `powerStructure.factions[].suppressedInstitutions` | array<string> | lived | same id scheme | `src/domain/worldPulse/factionCompetition.js:908` |  |
| `powerStructure.factions[].updatedByPulse` | integer | lived | tick of the last pulse change to the entry | `src/domain/worldPulse/factionCompetition.js:655` | LIVE (fieldManifest.js:162); with momentum, rivals[], momentumBand, legitimacy, controlStrength … |
| `powerStructure.factionRelationships[].pair` | mixed | required | [nameA, nameB] — the keyed-merge key | `src/generators/factionDynamics.js:312` |  |
| `powerStructure.factionRelationships[].type` | mixed | required | symbiotic\|subordinate\|dependent\|competitive\|tense\|… | `src/generators/factionDynamics.js:312` |  |
| `powerStructure.factionRelationships[].direction` | mixed | required | stable\|escalating\|declining | `src/generators/factionDynamics.js:312` |  |
| `powerStructure.factionRelationships[].ratio` | mixed | conditional | number | `src/generators/factionDynamics.js:312` |  |
| `powerStructure.factionRelationships[].narrative` | mixed | required | prose | `src/generators/factionDynamics.js:312` |  |
| `powerStructure.factionRelationships[].dmNote` | mixed | conditional | string\|null | `src/generators/factionDynamics.js:313` |  |
| `powerStructure.factionRelationships[].captureState` | mixed | conditional | on criminal pairs | `src/generators/factionDynamics.js:393` |  |

### People: NPCs, relationships, social factions, conflicts (49)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `npcs[].id` | string | required | 'npc_<n>' in generation order (npcGenerator.js:1631); structural 'npc.<faction>_<role>_<i>'; successor 'npc.successor_<n>' | `src/generators/npcGenerator.js:1631` | IDENTITY KEY (KEYED_COLLECTIONS npcs:"id"); renumbered by an NPC reroll |
| `npcs[].name` | mixed | required |  | `src/generators/npcGenerator.js:131` |  |
| `npcs[].gender` | mixed | required |  | `src/generators/npcGenerator.js:132` |  |
| `npcs[].role` | mixed | required |  | `src/generators/npcGenerator.js:133` |  |
| `npcs[].title` | mixed | required |  | `src/generators/npcGenerator.js:134` |  |
| `npcs[].category` | mixed | required | government\|military\|economy\|criminal\|religious\|magic\|crafts\|other | `src/generators/npcGenerator.js:135` |  |
| `npcs[].personality` | mixed | required | {dominant, flaw, modifier, tell, speech} | `src/generators/npcGenerator.js:136` |  |
| `npcs[].physical` | mixed | required | {age, build, feature, clothes} | `src/generators/npcGenerator.js:143` |  |
| `npcs[].goal` | mixed | required | {short, long} | `src/generators/npcGenerator.js:149` |  |
| `npcs[].secret` | mixed | required | {what, stakes} | `src/generators/npcGenerator.js:150` |  |
| `npcs[].plotHooks` | mixed | required |  | `src/generators/npcGenerator.js:151` |  |
| `npcs[].influence` | mixed | required | high\|moderate\|low | `src/generators/npcGenerator.js:152` |  |
| `npcs[].power` | mixed | required |  | `src/generators/npcGenerator.js:153` |  |
| `npcs[].presentation` | mixed | required |  | `src/generators/npcGenerator.js:154` |  |
| `npcs[].factionAffiliation` | string | required | power faction NAME | `src/generators/npcGenerator.js:1190` |  |
| `npcs[].structuralPosition\|activeConstraint\|settlementCondition\|structuralRank` | string | conditional | structuralRank dominant\|subordinate | `src/generators/npcStructure.js:437` |  |
| `npcs[].institution` | string | conditional | institution NAME | `src/generators/npcGenerator.js:295` |  |
| `npcs[].secondaryAffiliation` | string | conditional | criminal institution name | `src/generators/npcGenerator.js:1334` |  |
| `npcs[].corrupt` | boolean | required | generation verdict | `src/generators/steps/corruptionPass.js:69` | mirrored from worldState.npcStates by the pulse (npcAgency.js:210-236) |
| `npcs[].corruptionVector` | string | conditional | fear\|greed\|… | `src/generators/steps/corruptionPass.js:70` |  |
| `npcs[].corruptTies` | object | conditional | {criminalInstitution, thievesGuild, leash?} | `src/generators/steps/corruptionPass.js:75` |  |
| `npcs[].importance\|status\|linkedInstitutionIds\|linkedFactionIds\|legitimacyContribution\|stabilityContribution\|generatedAs` | mixed | conditional | structural seats only: importance pillar\|key\|notable\|minor, status active, linkedInstitutionIds (an institution id or NAME), linkedFactionIds (id-first handles), generatedAs 'faction_structural' | `src/generators/factionRoles.js:250` |  |
| `npcs[].timesExposed\|ousted` | integer\|boolean | lived | mirrored from worldState.npcStates | `src/domain/worldPulse/npcAgency.js:231` |  |
| `npcs[].replacedNpc` | string\|null | lived | on a pulse successor: the old NPC's NAME | `src/domain/worldPulse/successorNpc.js:51` |  |
| `npcs[].whereabouts` | object | lived | {state, placeId, purposeKind, sinceTick, expectedReturnTick, missionId} (SimNpc typedef settlement.schema.js:477) | `src/domain/settlement.schema.js:477` | an individual NPC away from home (roads/envoy layers) — not a travelling group |
| `relationships[].type` | mixed | required |  | `src/generators/npcGenerator.js:1688` |  |
| `relationships[].typeName` | mixed | required |  | `src/generators/npcGenerator.js:1689` |  |
| `relationships[].description` | mixed | required |  | `src/generators/npcGenerator.js:1690` |  |
| `relationships[].tension` | mixed | required |  | `src/generators/npcGenerator.js:1691` |  |
| `relationships[].strength` | mixed | required |  | `src/generators/npcGenerator.js:1692` |  |
| `relationships[].npc1Id` | mixed | required |  | `src/generators/npcGenerator.js:1693` | keyed by (npc1Id, npc2Id, type) |
| `relationships[].npc2Id` | mixed | required |  | `src/generators/npcGenerator.js:1694` | keyed by (npc1Id, npc2Id, type) |
| `relationships[].npc1Name` | mixed | required |  | `src/generators/npcGenerator.js:1695` |  |
| `relationships[].npc2Name` | mixed | required |  | `src/generators/npcGenerator.js:1696` |  |
| `relationships[].npc1Role` | mixed | required |  | `src/generators/npcGenerator.js:1697` |  |
| `relationships[].npc2Role` | mixed | required |  | `src/generators/npcGenerator.js:1698` |  |
| `relationships[].archetypeKey` | mixed | required |  | `src/generators/npcGenerator.js:1699` |  |
| `relationships[].flagDriven` | mixed | required |  | `src/generators/npcGenerator.js:1700` |  |
| `factions[].name` | mixed | required | group name (keyed-merge key) | `src/generators/power/factionGrouping.js:67` |  |
| `factions[].members` | mixed | required | full NPC copies (MIRROR class) | `src/generators/power/factionGrouping.js:67` |  |
| `factions[].dominantCategory` | mixed | required |  | `src/generators/power/factionGrouping.js:67` |  |
| `factions[].powerFactionName\|powerFactionPower\|powerFactionCat` | mixed | conditional | link to a power faction by NAME | `src/generators/steps/generatePopulation.js:82` |  |
| `factions[].powerFactionFallback` | boolean | conditional | true on the scatter fallback | `src/generators/steps/generatePopulation.js:121` |  |
| `conflicts[].parties` | mixed | required | [social faction names] (keyed with issue) | `src/generators/power/conflicts.js:240` |  |
| `conflicts[].issue` | mixed | required |  | `src/generators/power/conflicts.js:241` |  |
| `conflicts[].stakes` | mixed | required |  | `src/generators/power/conflicts.js:242` |  |
| `conflicts[].intensity` | mixed | required |  | `src/generators/power/conflicts.js:243` |  |
| `conflicts[].desc` | mixed | required |  | `src/generators/power/conflicts.js:244` |  |
| `conflicts[].plotHooks` | mixed | required |  | `src/generators/power/conflicts.js:245` |  |

### Spatial layout and services (12)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `spatialLayout.layout` | string | required | one prose line by tier and terrain | `src/generators/spatialGenerator.js:331` |  |
| `spatialLayout.quarters` | array<Quarter> | required | 0-8 from 14 fixed names | `src/generators/spatialGenerator.js:332` |  |
| `spatialLayout.tradeAccess` | string | required | prose of the access key | `src/generators/spatialGenerator.js:333` |  |
| `spatialLayout.quarters[].name` | mixed | required | Market Quarter\|Religious Quarter\|Roadside Shrine\|Noxious Trades Quarter\|Waterfront District\|Alehouse & Common\|Fishing Landing\|Woodcutters' Ground\|Artisan Quarter\|Government Quarter\|Mages' Quarter\|Shadows District\|Wealthy Residential\|Common Residential | `src/generators/spatialGenerator.js:64` |  |
| `spatialLayout.quarters[].location` | mixed | required | one fixed phrase per name (Waterfront: Along the coast\|Along the river) | `src/generators/spatialGenerator.js:65` |  |
| `spatialLayout.quarters[].desc` | mixed | required |  | `src/generators/spatialGenerator.js:66` |  |
| `spatialLayout.quarters[].landmarks` | mixed | required | institution names or fixed strings | `src/generators/spatialGenerator.js:67` |  |
| `availableServices.<bucket>` | array<Service> | required | buckets lodging, food, equipment, magic, information, healing, transport, legal, employment, entertainment, criminal | `src/generators/servicesGenerator.js:65` |  |
| `availableServices.<bucket>[].name` | string | required | keyed-merge key | `src/generators/services/serviceRollMaterialization.js:70` |  |
| `availableServices.<bucket>[].desc` | string | required |  | `src/generators/services/serviceRollMaterialization.js:71` |  |
| `availableServices.<bucket>[].institution` | string | required | institution NAME or pseudo-name like (covert) | `src/generators/services/serviceRollMaterialization.js:72` |  |
| `availableServices.<bucket>[].custom\|source\|customDefinitionCategory\|localUid\|customDefinition*` | mixed | conditional | custom service identity | `src/generators/services/serviceRollMaterialization.js:75` |  |

### Resources and viability (37)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `resourceAnalysis.terrain` | mixed | required |  | `src/generators/resourceGenerator.js:490` |  |
| `resourceAnalysis.availableResources` | mixed | required |  | `src/generators/resourceGenerator.js:491` |  |
| `resourceAnalysis.resourceConditions` | mixed | required | [{key, label, type, condition, randomDepletionEligible, recoveryMode, conditionDescription}] (resourceSemantics.js:382-391) | `src/generators/resourceGenerator.js:492` |  |
| `resourceAnalysis.conditionNotes` | mixed | required |  | `src/generators/resourceGenerator.js:493` |  |
| `resourceAnalysis.resourceChains` | mixed | required | [{rawResource, processingTags, processingInstitutions, intermediateGoods, finalProducts, exportValue, dependsOn, chainKey}] | `src/generators/resourceGenerator.js:494` |  |
| `resourceAnalysis.exploitation` | mixed | required | {fullyExploited, partiallyExploited, unexploited, warnings} | `src/generators/resourceGenerator.js:495` |  |
| `resourceAnalysis.imports` | mixed | required | {critical, recommended, reasons} | `src/generators/resourceGenerator.js:496` |  |
| `resourceAnalysis.exports` | mixed | required | [{product, chain, value, reason?}] | `src/generators/resourceGenerator.js:497` |  |
| `resourceAnalysis.gaps` | mixed | required | [{chain, missing\|institution, impact, severity}] | `src/generators/resourceGenerator.js:498` |  |
| `resourceAnalysis.featureEffects` | mixed | required |  | `src/generators/resourceGenerator.js:499` |  |
| `resourceAnalysis.economicStrengths` | mixed | required |  | `src/generators/resourceGenerator.js:500` |  |
| `resourceAnalysis.strategicValue` | mixed | required |  | `src/generators/resourceGenerator.js:501` |  |
| `resourceAnalysis.priorityNotes` | mixed | required |  | `src/generators/resourceGenerator.js:502` |  |
| `economicViability.viable` | mixed | required |  | `src/generators/economy/viability.js:588` |  |
| `economicViability.issues` | mixed | required | [{severity, category, title, description, …}] | `src/generators/economy/viability.js:589` |  |
| `economicViability.warnings` | mixed | required | same shape | `src/generators/economy/viability.js:590` |  |
| `economicViability.dependencies` | mixed | required | same shape, severity dependency | `src/generators/economy/viability.js:591` |  |
| `economicViability.suggestions` | mixed | required | [{category, title, description}] | `src/generators/economy/viability.js:592` |  |
| `economicViability.plotHooks` | mixed | required | [{category, hook, severity}] | `src/generators/economy/viability.js:593` |  |
| `economicViability.summary` | mixed | required |  | `src/generators/economy/viability.js:598` | summary text now built from dependencies (prose change) |
| `economicViability.metrics` | mixed | required |  | `src/generators/economy/viability.js:605` |  |
| `economicViability.metrics.tradeAccess` | mixed | required |  | `src/generators/economy/viability.js:607` |  |
| `economicViability.metrics.criticalIssueCount` | mixed | required |  | `src/generators/economy/viability.js:608` |  |
| `economicViability.metrics.dependencyCount` | mixed | required |  | `src/generators/economy/viability.js:609` |  |
| `economicViability.metrics.warningCount` | mixed | required |  | `src/generators/economy/viability.js:610` |  |
| `economicViability.metrics.foodBalance.dailyNeed` | mixed | required |  | `src/generators/economy/foodBalance.js:499` |  |
| `economicViability.metrics.foodBalance.dailyProduction` | mixed | required |  | `src/generators/economy/foodBalance.js:500` |  |
| `economicViability.metrics.foodBalance.deficit` | mixed | required |  | `src/generators/economy/foodBalance.js:501` |  |
| `economicViability.metrics.foodBalance.deficitPercent` | mixed | required |  | `src/generators/economy/foodBalance.js:502` |  |
| `economicViability.metrics.foodBalance.surplus` | mixed | required |  | `src/generators/economy/foodBalance.js:503` |  |
| `economicViability.metrics.foodBalance.agricultureModifier` | mixed | required |  | `src/generators/economy/foodBalance.js:516` |  |
| `economicViability.metrics.foodBalance.stressModifier` | mixed | conditional |  | `src/generators/economy/foodBalance.js:519` |  |
| `economicViability.metrics.foodBalance.importCoverage` | mixed | conditional |  | `src/generators/economy/foodBalance.js:520` |  |
| `economicViability.metrics.foodBalance.rawDeficit` | mixed | conditional |  | `src/generators/economy/foodBalance.js:521` |  |
| `economicViability.metrics.foodBalance.importChannel` | mixed | conditional |  | `src/generators/economy/foodBalance.js:525` |  |
| `economicViability.metrics.foodBalance.magicFoodOffset` | mixed | conditional |  | `src/generators/economy/foodBalance.js:526` |  |
| `economicViability.metrics.foodBalance.magicFoodNote` | mixed | conditional |  | `src/generators/economy/foodBalance.js:531` |  |

### History (18)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `history.age` | integer | required | years | `src/generators/historyGenerator.js:900` |  |
| `history.founding` | object | required | {age, reason, foundedBy, initialChallenge, overcoming, stressNote} | `src/generators/historyGenerator.js:901` | built by genArrivalDetail (narrativeGenerator.js:391-399) |
| `history.historicalEvents` | array<object> | required | 0-16 generated events | `src/generators/historyGenerator.js:902` |  |
| `history.historicalEvents[].yearsAgo` | mixed | required |  | `src/generators/historyGenerator.js:289` |  |
| `history.historicalEvents[].type` | mixed | required |  | `src/generators/historyGenerator.js:290` |  |
| `history.historicalEvents[].name` | mixed | required | name is the keyed-merge key | `src/generators/historyGenerator.js:291` |  |
| `history.historicalEvents[].description` | mixed | required |  | `src/generators/historyGenerator.js:292` |  |
| `history.historicalEvents[].severity` | mixed | required |  | `src/generators/historyGenerator.js:293` |  |
| `history.historicalEvents[].lastingEffects` | mixed | required |  | `src/generators/historyGenerator.js:294` |  |
| `history.historicalEvents[].plotHooks` | mixed | required |  | `src/generators/historyGenerator.js:295` |  |
| `history.historicalEvents[].templateType\|anchored` | string\|boolean | conditional |  | `src/generators/historyGenerator.js:592` |  |
| `history.historicalEvents[].campaignEventId\|campaignEra\|tick` | string\|true\|integer | lived | campaign-era entries: campaignEventId 'campaign.<id>.<resolvedAt\|tick>', campaignEra true, tick = world tick, yearsAgo 0 | `src/domain/worldPulse/stressorAftermath.js:157` | also factionCapture.js:267, settlementLifecycleFirstClass.js:532 |
| `history.currentTensions` | array<object> | required | {type, description, factions[], plotHooks[], severity[]} (data/historyData.js templates) | `src/generators/historyGenerator.js:903` |  |
| `history.historicalCharacter` | string | required | prose | `src/generators/historyGenerator.js:904` | overwritten by generateCoherence (narrativeGenerator.js:1013) |
| `history.ancientRuin` | object | conditional | {name, yearsAgo} — only when config.ancientRuinsEnabled | `src/generators/historyGenerator.js:905` |  |
| `history.eventsTimeline` | array<object> | required | {year, yearsAgo, name, type, anchored} | `src/generators/historyGenerator.js:906` |  |
| `history.legacyAnnotations` | array<object> | conditional | {annotation, eventType, yearsAgo, severity, eventName}; written only when non-empty | `src/generators/steps/generateNarratives.js:77` |  |
| `history.siegeNarrative` | string\|null | required | prose | `src/generators/narrativeGenerator.js:1015` |  |

### Defence, isolation, culture, receipt (38)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `defenseProfile.scores` | mixed | required | {military, monster, internal, economic, magical 0-100, disaster (LIVE), magicDependency, traditions} | `src/generators/defenseGenerator.js:639` |  |
| `defenseProfile.readiness` | mixed | required | {score, label, color, background, border} | `src/generators/defenseGenerator.js:640` |  |
| `defenseProfile.institutions` | mixed | required | {walls, garrison, militia, watch, mercenary, charter, magicDef} (institution copies; domain/institutions/defenseInstitutionBuckets.js:84-101) | `src/generators/defenseGenerator.js:641` |  |
| `defenseProfile.magicDependency` | mixed | required |  | `src/generators/defenseGenerator.js:642` |  |
| `defenseProfile.traditions` | mixed | required |  | `src/generators/defenseGenerator.js:643` |  |
| `defenseProfile.chainModifiers` | mixed | required |  | `src/generators/defenseGenerator.js:644` |  |
| `defenseProfile.economicGates` | mixed | required | {military?, monster, internal?, economic, disaster?} | `src/generators/defenseGenerator.js:650` |  |
| `isolationSupport.version` | mixed | required | 1 | `src/generators/isolationSupport.js:225` |  |
| `isolationSupport.applicable` | mixed | required |  | `src/generators/isolationSupport.js:226` |  |
| `isolationSupport.tier` | mixed | required |  | `src/generators/isolationSupport.js:227` |  |
| `isolationSupport.requiredCapacity` | mixed | required |  | `src/generators/isolationSupport.js:228` |  |
| `isolationSupport.capacity` | mixed | required |  | `src/generators/isolationSupport.js:229` |  |
| `isolationSupport.deficit` | mixed | required |  | `src/generators/isolationSupport.js:230` |  |
| `isolationSupport.status` | mixed | required | connected\|resilient\|viable\|precarious\|untenable\|magic_supported\|magic_dependent | `src/generators/isolationSupport.js:231` |  |
| `isolationSupport.paths` | mixed | required | [{type local_foodshed\|hinterland\|reserves\|seasonal_access\|patronage\|magical_transit, capacity, stability, evidence[]}] | `src/generators/isolationSupport.js:232` |  |
| `isolationSupport.magicDependent` | mixed | required |  | `src/generators/isolationSupport.js:236` |  |
| `culturalIdentity.key` | string | required | germanic\|latin\|celtic\|arabic\|norse\|slavic\|east_asian\|mesoamerican\|south_asian\|steppe\|greek\|mixed (mediterranean -> latin) | `src/data/cultureProfiles.js:564` |  |
| `culturalIdentity.label` | string | required |  | `src/data/cultureProfiles.js:565` |  |
| `culturalIdentity.scope` | string | required |  | `src/data/cultureProfiles.js:566` |  |
| `culturalIdentity.builtForm` | string | required |  | `src/data/cultureProfiles.js:567` |  |
| `culturalIdentity.civicPattern` | string | required |  | `src/data/cultureProfiles.js:568` |  |
| `culturalIdentity.exchangePattern` | string | required |  | `src/data/cultureProfiles.js:569` |  |
| `culturalIdentity.foodways` | string | required |  | `src/data/cultureProfiles.js:570` |  |
| `culturalIdentity.sacredLife` | string | required |  | `src/data/cultureProfiles.js:571` |  |
| `culturalIdentity.defensePattern` | string | required |  | `src/data/cultureProfiles.js:572` |  |
| `culturalIdentity.socialTexture` | string | required |  | `src/data/cultureProfiles.js:573` |  |
| `culturalIdentity.architecturalDetail` | string | required |  | `src/data/cultureProfiles.js:574` |  |
| `culturalIdentity.sourceKeys` | array<string> | conditional | mixed identity only | `src/data/cultureProfiles.js:600` |  |
| `generationCoherenceReceipt.version` | mixed | required |  | `src/generators/generationCoherence.js:535` |  |
| `generationCoherenceReceipt.status` | mixed | required | coherent\|coherent_with_authored_tensions\|needs_review | `src/generators/generationCoherence.js:536` |  |
| `generationCoherenceReceipt.seed` | mixed | required | the generation seed (secret) | `src/generators/generationCoherence.js:537` |  |
| `generationCoherenceReceipt.worldLawVersion` | mixed | required |  | `src/generators/generationCoherence.js:538` |  |
| `generationCoherenceReceipt.cultureProfile` | mixed | required |  | `src/generators/generationCoherence.js:539` |  |
| `generationCoherenceReceipt.contentProfile` | mixed | required |  | `src/generators/generationCoherence.js:540` |  |
| `generationCoherenceReceipt.checks` | mixed | required | [{id, label, status pass\|fail, findings[{path, detail, evidence?}]}] (generationCoherence.js:139-146) | `src/generators/generationCoherence.js:541` |  |
| `generationCoherenceReceipt.judgments` | mixed | required | [{id, label, status, scope single_settlement, summary, findings, evidence}] (generationReceiptJudgments.js:696-706) | `src/generators/generationCoherence.js:542` |  |
| `generationCoherenceReceipt.repairs` | mixed | required | [{id repair.<n>, type, action, subject, reason}] | `src/generators/generationCoherence.js:543` |  |
| `generationCoherenceReceipt.authoredTensions` | mixed | required | [{type, subject, reason}] | `src/generators/generationCoherence.js:544` |  |

### Stressors, conditions, trace, neighbour (30)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `stressors[] (= stress)` | object | required | {type, label, icon, colour, summary, crisisHook, viabilityNote, historyColour} | `src/generators/stressGenerator.js:57` | type in famine\|indebted\|infiltrated\|insurgency\|mass_migration\|monster_pressure\|occupied\|plague_onset\|politically_fractured\|recently_betrayed\|religious_conversion\|slave_revolt\|succession_void\|under_siege\|wartime; summaryRoll deleted at assembly (assembleSettlement.js:206) |
| `stressors[].source\|forcedByConfig` | string\|boolean | conditional | 'forced' on config-intended stress | `src/generators/steps/resolveStress.js:65` |  |
| `activeConditions[].id` | mixed | required | 'condition.<archetype>.<suffix>' — stable once stored | `src/domain/activeConditions.js:659` | IDENTITY KEY; SF keys its merge by archetype (KEYED_COLLECTIONS) |
| `activeConditions[].archetype` | mixed | required |  | `src/domain/activeConditions.js:660` |  |
| `activeConditions[].label` | mixed | required |  | `src/domain/activeConditions.js:661` |  |
| `activeConditions[].description` | mixed | required |  | `src/domain/activeConditions.js:662` |  |
| `activeConditions[].severity` | mixed | required |  | `src/domain/activeConditions.js:663` |  |
| `activeConditions[].severityBand` | mixed | required | low\|medium\|high\|critical | `src/domain/activeConditions.js:664` |  |
| `activeConditions[].status` | mixed | required | worsening\|stable\|easing | `src/domain/activeConditions.js:665` |  |
| `activeConditions[].triggeredAt` | mixed | required | {tick, sourceEventType, sourceEventTargetId} | `src/domain/activeConditions.js:666` |  |
| `activeConditions[].duration` | mixed | required | {elapsedTicks, expiresAtTicks\|null} | `src/domain/activeConditions.js:667` |  |
| `activeConditions[].affectedSystems` | mixed | required |  | `src/domain/activeConditions.js:668` |  |
| `activeConditions[].causes` | mixed | required |  | `src/domain/activeConditions.js:671` |  |
| `activeConditions[].triggeredAt.tick` | integer | required | world tick; 0 at generation and on authored-event conditions (no writer stamps a tick there; deriveActiveCondition default activeConditions.js:630); the pulse writers stamp the tick (37 of the 51 triggeredAt literals carry it; the 14 without are the generation promotion, 10 authored-event mutators and 3 record-mode comparison probes that are never stored) | `src/domain/activeConditions.js:630` |  |
| `activeConditions[].duration.elapsedTicks\|expiresAtTicks` | number | required | interval-scaled (week 0.25, month 1, season 2.25, year 6) | `src/domain/activeConditions.js:636` |  |
| `simulationTrace[]` | object | required | {causes[{source, effect, reason}], downstreamEffects[{target, effect}], targetType, targetId, step, result, ts} | `src/domain/trace.js:242` | ts = deterministic per-run counter (_traceClock) |
| `neighborRelationship.name` | mixed | conditional |  | `src/generators/neighbourGenerator.js:171` |  |
| `neighborRelationship.tier` | mixed | conditional |  | `src/generators/neighbourGenerator.js:172` |  |
| `neighborRelationship.relationshipType` | mixed | conditional | neutral\|trade_partner\|allied\|rival\|cold_war\|hostile\|criminal_network\|vassal\|smuggling_partner | `src/generators/neighbourGenerator.js:173` |  |
| `neighborRelationship.primaryExports` | mixed | conditional |  | `src/generators/neighbourGenerator.js:174` |  |
| `neighborRelationship.primaryImports` | mixed | conditional |  | `src/generators/neighbourGenerator.js:175` |  |
| `neighborRelationship.activeChains` | mixed | conditional |  | `src/generators/neighbourGenerator.js:176` |  |
| `neighborRelationship.economicStrength` | mixed | conditional |  | `src/generators/neighbourGenerator.js:177` |  |
| `neighborRelationship.militaryStrength` | mixed | conditional |  | `src/generators/neighbourGenerator.js:178` |  |
| `neighborRelationship.governmentType` | mixed | conditional |  | `src/generators/neighbourGenerator.js:179` |  |
| `neighborRelationship.dominantFactionTypes` | mixed | conditional |  | `src/generators/neighbourGenerator.js:180` |  |
| `neighborRelationship.tradeRoute` | mixed | conditional | the neighbour's access KEY, not a route | `src/generators/neighbourGenerator.js:181` |  |
| `neighborRelationship.dynamics` | mixed | conditional |  | `src/generators/neighbourGenerator.js:183` |  |
| `neighborRelationship.npcs` | mixed | conditional | full NPC copies | `src/generators/neighbourGenerator.js:185` |  |
| `neighborRelationship.factions` | mixed | conditional |  | `src/generators/neighbourGenerator.js:186` |  |

### Config (31)

| path | type | required | domain / example | source | note |
|---|---|---|---|---|---|
| `config.eventConditions` | array | lived | event-authored condition record re-promoted on regeneration | `src/domain/activeConditions.js:807` |  |
| `config.priorityEconomy` | mixed | required |  | `src/generators/steps/resolveConfig.js:190` |  |
| `config.priorityMilitary` | mixed | required |  | `src/generators/steps/resolveConfig.js:191` |  |
| `config.priorityReligion` | mixed | required |  | `src/generators/steps/resolveConfig.js:192` |  |
| `config.priorityCriminal` | mixed | required |  | `src/generators/steps/resolveConfig.js:193` |  |
| `config.tier` | mixed | required |  | `src/generators/steps/resolveConfig.js:196` |  |
| `config.priorityMagic` | mixed | required |  | `src/generators/steps/resolveConfig.js:197` |  |
| `config.tradeRouteAccess` | mixed | required | road\|river\|port\|crossroads\|isolated\|mountain_pass\|none (random_trade resolved) | `src/generators/steps/resolveConfig.js:198` |  |
| `config._routeIntent` | mixed | required | random\|explicit | `src/generators/steps/resolveConfig.js:199` |  |
| `config.magicLevel` | mixed | required | none\|low\|medium\|high | `src/generators/steps/resolveConfig.js:200` |  |
| `config.monsterThreat` | mixed | required | safe\|civilized\|frontier\|plagued\|heartland | `src/generators/steps/resolveConfig.js:201` |  |
| `config.culture` | mixed | required |  | `src/generators/steps/resolveConfig.js:202` |  |
| `config.cultureProfileKey` | mixed | required |  | `src/generators/steps/resolveConfig.js:203` |  |
| `config.contentProfile` | mixed | required | heroic\|grounded\|grim\|custom | `src/generators/steps/resolveConfig.js:204` |  |
| `config.contentBoundaries` | mixed | required | {human_trafficking, slavery, torture, hard_drugs: bool} | `src/generators/steps/resolveConfig.js:205` |  |
| `config.terrainType` | mixed | required |  | `src/generators/steps/resolveConfig.js:206` |  |
| `config.terrainOverride` | mixed | required |  | `src/generators/steps/resolveConfig.js:207` |  |
| `config.<raw keys>` | mixed | conditional | every raw input key passes through (settType, customName, population, nearbyResourcesRandom, customTradeGoods, ancientRuinsEnabled, _livingContentLawVersion, …) | `src/generators/steps/resolveConfig.js:194` |  |
| `config.nearbyResources` | array | required | deposit keys / definitions | `src/generators/steps/resolveResources.js:537` |  |
| `config.nearbyResourcesNative` | array | required | deposit keys / definitions | `src/generators/steps/resolveResources.js:538` |  |
| `config.nearbyResourcesDepleted` | array | required | deposit keys / definitions | `src/generators/steps/resolveResources.js:539` |  |
| `config.nearbyResourcesCustom` | array | required | deposit keys / definitions | `src/generators/steps/resolveResources.js:542` |  |
| `config.nearbyResourceDefinitions` | array | required | deposit keys / definitions | `src/generators/steps/resolveResources.js:543` |  |
| `config.nearbyResourcesState` | object | conditional | key -> available\|depleted (raw input passes through; lived writers tierResourceDynamics.js:700, mutateWorld.js:203) | `src/generators/steps/resolveResources.js:224` |  |
| `config.stressType\|stressTypes\|intendedStressTypes` | string\|array | required | stress type keys | `src/generators/steps/resolveStress.js:37` |  |
| `config._population` | integer | required | rolled population | `src/generators/steps/resolveStress.js:48` |  |
| `config._isolationSupport\|_magicTradeOnly` | object\|boolean | required | isolation receipt copy / magic-trade flag | `src/generators/steps/coherenceRepairPass.js:514` |  |
| `config._neighbourEconBias\|_neighbourEconMode` | object\|string | conditional | with a neighbour | `src/generators/steps/generateEconomy.js:349` |  |
| `config.neighborRelationship` | object | conditional | with a neighbour | `src/generators/steps/resolveNeighbour.js:55` |  |
| `config.peakTier` | string | lived | high-water tier (also _config.peakTier) | `src/domain/worldPulse/settlementLifecycleKernel.js:721` |  |
| `config.primaryDeitySnapshot\|cultDeitySnapshots` | object\|array | lived | bounded deity embed by assignment (deitySnapshot.js) | `src/domain/worldPulse/applyWorldPulse.js:242` |  |

## 7. Method, limits and labels

- Producer files extracted with git archive 00b648c9d into scratch; every one of the 81 cited files hash-equals its 00b648c9d blob (git hash-object vs git rev-parse 00b648c9d:<path>): CONFIRMED.
- Whole-tree searches streamed git archive 00b648c9d src through a tar reader (no file written).
- Diff: git diff 5d699cc68 00b648c9d -- <80 dossier-source files> (scratch diff-dossier.patch, 347 KB), scanned for added/removed object keys per file, then read by hand.
- Catalog: both institutionalCatalog.js versions parsed textually (no SettlementForge code executed); the pinned parse reproduces Fable's verified 280 kinds and 19/37/59/85/90/26 tier rows.
- No SettlementForge script or module was executed; no dossier was generated in this lane. Shape claims rest on the producers' source; presence/frequency claims cite the earlier executed lanes (research/sf/dossier-outputs.md, at 5d699cc68) where the producer did not change.
- **CONFIRMED** in this file means read in `00b648c9d`'s source (or, for the catalog, parsed from it). Presence frequencies (how many dossiers carry a conditional key) are not re-measured here: no dossier was generated, by the brief's read-only rule; the earlier executed census (`research/sf/dossier-outputs.md`, at `5d699cc68`) still describes every producer this diff did not touch. **PLAUSIBLE**: that same-seed rosters at 00b648c9d differ from the pin's in most towns (follows from the catalog rebuild and the exclusive-group draw change; not executed).
- Not read: SettlementForge's own map programs (`townMap/**`, `townScene/**` beyond the one presentation projector cited, `townCartography/`, `undercity/`, `interior/`), and the 126 world-pulse modules beyond the writers cited.

