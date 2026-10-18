export const meta = {
  name: 'systems-read-continue',
  description: 'Continue the systems read from its recorded readings (journal of wf_0e759907-c33): prosperity docs read live; then synthesize, verify and fix each note; then the lens implications (with plague when its note has landed)',
  phases: [
    { title: 'Read', detail: 'readers per subject: alignment (2), trade (3), populations (2), prosperity (2)' },
    { title: 'Synthesize', detail: 'one research note per subject' },
    { title: 'Verify', detail: 'adversarial check per note against code and docs, then fixes' },
    { title: 'Implications', detail: 'what the three systems change for territory, religion and the lens framework' },
  ],
}

const A = (typeof args === 'object' && args) ? args : {}
const HOST = '/home/user/clausellstokes-lang/settlement-engine'
const MAPS = '/home/user/maps-architecture'
const notice = (seat) => `> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat ${seat}; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)`
const COMMON = `
You are a research seat reading part of SettlementForge's simulator. Host repository: ${HOST} at origin/master 81f1cd96, READ-ONLY (never write there). Map-module repository: ${MAPS}. Describe in your own words; cite file:line; copy no code. Tag claims [STATED] (a document says it), [OBSERVED] (you read it in code), [INFERRED] (your reasoning, given). For every mechanism say whether it is LIT in the default preset (realistic_regional), LIT in which other presets (quiet_local, dramatic_campaign, static_campaign, narrative_campaign, living_realm, full_simulation), BUILT DARK (behind which flag) or DESIGNED ONLY — check flags in code (src/domain/worldPulse/simulationRules.js presets; the Living-World gate in src/components/settlements/LivingWorldGates.jsx lets a premium DM light some lanes per campaign), not only in docs; the FP status of record is ${HOST}/docs/DESIGN_FP_COHERENCE_FOLD.md §2.
Context: the map module (${MAPS}) is designing a native world map for this host with derived, toggleable LENSES over host facts: territory (a strength projection over travel time from seats with vassal chains, contested marches decided by military enforcement, patrols; docs/PROGRESS.md rows J377–J378), religion (research/sf/faith-system.md; J379), and a general lens mechanism (a derived layer with legend, audience filter and time scrub). Two earlier notes describe the simulator: research/sf/fp-simulator.md and research/sf/fp-physical-integration.md (read their summaries and any section on your subject). So also record every place your subject reads or could show geometry: distance, adjacency, routes, travel time, territory, gates, the frozen spatial digest, seasons, the world map, overlays, the town map.
Read the files named in your slice WHOLE (state line counts); follow imports to anything central and read it; list what you could not read.`

const READ = {
  type: 'object',
  properties: {
    slice: { type: 'string' },
    filesRead: { type: 'array', items: { type: 'string' } },
    mechanisms: { type: 'array', items: { type: 'object', properties: {
      name: { type: 'string' }, what: { type: 'string' }, how: { type: 'string', description: 'inputs, formula shape, constants, cadence, outputs' },
      state: { type: 'string', description: 'persisted keys it reads and writes; the one writer' },
      status: { type: 'string' }, citations: { type: 'string' }, spatial: { type: 'string' },
    }, required: ['name', 'what', 'how', 'state', 'status', 'citations', 'spatial'] } },
    local: { type: 'string', description: 'the per-settlement picture' },
    realm: { type: 'string', description: 'the realm/global picture' },
    movement: { type: 'string', description: 'how it moves or acts between settlements' },
    couplings: { type: 'string', description: 'what else reads or writes it' },
    mapTouchpoints: { type: 'string' },
    dmAndAudience: { type: 'string' },
    contradictions: { type: 'string' },
  },
  required: ['slice', 'filesRead', 'mechanisms', 'local', 'realm', 'movement', 'couplings', 'mapTouchpoints', 'dmAndAudience', 'contradictions'],
}

const SUBJECTS = [
  {
    key: 'alignment', file: 'research/sf/alignment-system.md', seat: 'research/sf-alignment',
    ask: 'ALIGNMENTS: what a settlement\'s (and an NPC\'s, a faction\'s, a deity\'s) alignment and temperament are, how they are set at generation, how they drift, how they move or press between settlements (moral drift, cohesion weave, moral institution pressure), and everything they drive (war, razing, peace, trade, faith, corruption, politics, disposition).',
    slices: [
      { key: 'alignment-docs', brief: 'Docs: read WHOLE docs/DESIGN_COHESION_WEAVE.md (338). Grep "alignment|temperament|moral" and read every passage in docs/PHASE55_SPATIAL_ENGINE_DESIGN.md, docs/DESIGN_WAR_CONVENIENCE_AND_TRIBUTE.md, docs/DESIGN_FP_ARCH_EDITOR.md, docs/DESIGN_REALM_DIRECTIVES.md, docs/PHASE4_FAITH_DELTA.md, docs/DESIGN_FP_ARCH_EC.md, docs/DESIGN_FP_ARCH_WC.md, docs/DESIGN_FP_SPINE.md, docs/DESIGN_FP_ARCH_SP.md, docs/DESIGN_FP_ARCH_TR.md, docs/DESIGN_FP_COHERENCE_FOLD.md (vocabulary rows), docs/SETTLEMENT_CAPABILITY_ATLAS.md (grep only).' },
      { key: 'alignment-code', brief: 'Code: read WHOLE src/domain/worldPulse/settlementAlignment.js, src/domain/spatial/moralDrift.js, src/domain/worldPulse/moralInstitutionPressure.js, src/domain/worldPulse/moralMartialLean.js, src/domain/worldPulse/temperamentPresets.js, src/domain/spatial/cohesionWeave.js, src/domain/worldPulse/disposition.js; the alignment parts of src/domain/npc/paradigmAxisCatalog.js, src/domain/worldPulse/settlementPolitics.js, razing.js, src/domain/corruption.js, supplyKernel.js, migrationKernel.js, peaceReasons.js, warSeatBooks.js; the alignment fields in src/domain/settlement.schema.js; and how alignment is set at generation (grep src/generators for alignment/temperament).' },
    ],
  },
  {
    key: 'trade', file: 'research/sf/trade-system.md', seat: 'research/sf-trade',
    ask: 'TRADE AND CARAVANS: how each settlement\'s production and consumption of GOODS and of SERVICES are determined, how its imports and exports follow from them, how goods and services flow between settlements (caravans, shipments, commodity flow, supply chains, entrepôts, tolls, gates, smuggling, generosity/relief, trade wars, supply-web warfare, brokerage), the routes and travel they use, seasons and capacity, and the realm picture.',
    slices: [
      { key: 'trade-docs', brief: 'Docs: read WHOLE docs/DESIGN_FP_TRADE.md (1,472), docs/DESIGN_FP_ARCH_TR.md (627), docs/DESIGN_SUPPLY_WEB_WARFARE.md (120), docs/DESIGN_MAGIC_ECONOMY.md (223). Read docs/DESIGN_FP_ARCH_EC.md (2,996) headings and every section on production, consumption, imports, exports, prices, flows, services and caravans; read PHASE55 §4b–§4d and every trade/caravan/entrepôt/toll/gate passage (grep); docs/world-pulse-roadmap.md trade parts.' },
      { key: 'trade-economy', brief: 'Code, the settlement economy (production, consumption, goods and services): read WHOLE src/generators/steps/generateEconomy.js, src/generators/economy/tradeGoods.js, src/data/tradeGoodsData.js, src/domain/supplyChainState.js, src/domain/inferSupplyChains.js, src/domain/region/goodsCatalog.js, src/domain/goods.schema.js, src/domain/capacityModel.js, src/data/foodImportRates.js, src/generators/servicesGenerator.js, src/generators/services/serviceClassifier.js; read the structure (schema and a sample of entries, not every row) of src/data/supplyChainData.js, src/data/institutionServices.js and src/generators/services/serviceCategoryTables.js. Pin down exactly how imports and exports of each good and service are derived per settlement and what changes them over time.' },
      { key: 'trade-flow', brief: 'Code, flows between settlements: read WHOLE src/domain/spatial/tradeFlow.js, commodityFlow.js, supplyShipments.js, entrepots.js, dispatchEV.js, dispatchDestination.js, smuggle.js, generosityGate.js; src/domain/worldPulse/supplyKernel.js, tradeWar.js, tradeSalience.js, routeNetworkConsumers.js, routeNetworkConsumersTransit.js, routeNetworkConsumersRace.js, brokerageServices.js, brokerageServicesRules.js, supplyWebWarfare.js, sovereigntyMarketStage.js, generosityKernel.js (trade parts). Pin down: what a caravan or shipment is, who sends what to whom and why, the route and travel time it uses, capacity, tolls and gates, interception and smuggling, seasons, and which flags gate each.' },
    ],
  },
  {
    key: 'population', file: 'research/sf/population-system.md', seat: 'research/sf-population',
    ask: 'POPULATION FLOWS: births, deaths, growth and tier change per settlement; migration push and pull; refugees, columns, émigrés and settlers; how people move between settlements (netted flows vs columns on roads), what geometry and travel time they use, founding of new settlements, war and plague effects, and the realm picture.',
    slices: [
      { key: 'pop-docs', brief: 'Docs: read WHOLE docs/DESIGN_DEMOGRAPHIC_ENGINE.md (728), docs/DESIGN_FP_ARCH_POP.md (617), docs/DESIGN_FP_POPULATIONS.md (1,406). Grep and read every migration/refugee/column/settler/population passage of docs/PHASE55_SPATIAL_ENGINE_DESIGN.md (§4c), docs/DESIGN_FP_ARCH_WY.md (WY-4 columns), docs/DESIGN_FP_ARCH_WC.md, docs/DESIGN_REALM_DIRECTIVES.md (the razing population law), docs/DESIGN_FP_COHERENCE_FOLD.md (OD-FC-13 and others).' },
      { key: 'pop-code', brief: 'Code: read WHOLE src/domain/worldPulse/demographicsKernel.js, demographicsRates.js, demographicsPlans.js, demographicsMigration.js, demographicsPushPull.js, demographicsLand.js, demographicsResponses.js, demographicsWar.js, demographicsRisk.js, demographicsLadder.js, demographicsObservation.js, demographicsWorks.js, demographicsHerald.js (skim), migrationKernel.js, populationDynamics.js, emigreErrand.js; src/domain/spatial/migration.js, migrationRumors.js; src/domain/roads/migrationReason.js; src/generators/steps/generatePopulation.js; and the popToTier path (grep). Pin down: who moves where and why, netted flows vs physical columns, travel time and route use, road mortality, founding, and flags.' },
    ],
  },
  {
    key: 'prosperity', file: 'research/sf/prosperity-system.md', seat: 'research/sf-prosperity',
    ask: 'PROSPERITY: what a settlement\'s prosperity is (its scale, bands, rank), how it is set at generation, what raises and lowers it over time (trade, production, upswing and momentum, treasury, corruption, war, plague, generosity, traditions, roads, lifecycle), how it compares across the realm (ranking), how it moves or presses between settlements, and everything it drives (tier change, migration pull, territory strength in the map module\'s reading, faith, politics, the town map\'s condition grammar).',
    slices: [
      { key: 'prosperity-docs', brief: 'Docs: read docs/DESIGN_UPSWING_RELATIONSHIP_FLOWS.md whole; grep "prosperity" and read every passage in docs/DESIGN_FP_ARCH_EC.md, docs/GENERATION_COHERENCE_AUDIT.md, docs/SIMULATION_LOGIC_AUDIT.md, docs/DESIGN_FP_ARCH_MF.md, docs/DESIGN_WAR_CONVENIENCE_AND_TRIBUTE.md, docs/DESIGN_FP_ARCH_PG.md, docs/PHASE55_SPATIAL_ENGINE_DESIGN.md, docs/PHASE4_FAITH_DELTA.md, docs/A_PLUS_ROADMAP.md, docs/simulation-intelligence-layer.md, docs/DESIGN_FP_COHERENCE_FOLD.md, docs/SETTLEMENT_CAPABILITY_ATLAS.md (grep only).' },
      { key: 'prosperity-code', brief: 'Code: read WHOLE src/generators/economy/prosperity.js, src/domain/prosperityRank.js, src/domain/worldPulse/upswingKernel.js, src/domain/worldPulse/momentum.js, src/domain/worldPulse/treasury.js, src/domain/worldPulse/treasuryNews.js, src/domain/worldPulse/generosityUpdates.js; the prosperity parts of src/domain/worldPulse/traditionsKernel.js, settlementLifecycleKernel.js, settlementLifecycleFirstClass.js, roadsKernel.js, corruptionWeb.js, generosityKernel.js, demographicsPushPull.js, informationStatecraft.js, src/domain/corruption.js, src/domain/spatial/entrepots.js, src/domain/roads/state.js, src/domain/compendium/bandLadders.js, src/domain/townMap/arch/conditionGrammar.js, src/domain/state/deriveSystemState.js, src/components/map/heraldRegister.js. Pin down the scale, the bands and their hysteresis, the writers and cadence, the realm ranking, and every reader.' },
    ],
  },
]

const VER = { type: 'object', properties: {
  checked: { type: 'array', items: { type: 'object', properties: { claim: { type: 'string' }, where: { type: 'string' }, verdict: { type: 'string', enum: ['holds', 'wrong', 'unverifiable'] }, evidence: { type: 'string' }, fix: { type: 'string' } }, required: ['claim', 'verdict', 'evidence'] } },
  missing: { type: 'array', items: { type: 'string' } },
}, required: ['checked', 'missing'] }

const results = await pipeline(
  SUBJECTS,
  async (s) => {
    if (s.key === 'prosperity') {
      const sl = s.slices.find(x => x.key === 'prosperity-docs')
      const r = await agent(`${COMMON}\n\nSUBJECT: ${s.ask}\n\n${sl.brief}`, { label: `read:${sl.key}`, phase: 'Read', schema: READ })
      return { s, extra: r ? [r] : [] }
    }
    return { s, extra: [] }
  },
  async ({ s, extra }) => {
    const summary = await agent(`${COMMON}

YOUR SEAT: the synthesis seat ${s.seat}. You may write exactly one file: ${MAPS}/${s.file}. SUBJECT: ${s.ask}
Write a comprehensive note in your own words, cited, with under the title exactly: ${notice(s.seat)}
Sections: §1 summary (one page; answer the owner's question about this subject directly); §2 the data model; §3 the per-settlement picture (with exact constants and where they live); §4 the realm picture; §5 MOVEMENT BETWEEN SETTLEMENTS (every channel, rate, route and travel-time use, gate, season, capacity, flag); §6 couplings with the rest of the simulator; §7 STATUS by mechanism and preset as checked in code; §8 MAP TOUCHPOINTS today and what a map lens for this subject would need from the host and could add; §9 how this changes the map module's current readings (territory J377–J378, religion J379 and research/sf/faith-system.md §9.6, the lens mechanism) — concrete, numbered; §10 doc-vs-code contradictions, defects and open questions; §11 sources with line counts and what was not read. Return the section list with line counts and a ten-line summary.

READINGS: the recorded reader outputs for this subject are in ${A.dir}/${s.key}-reads.json — a JSON array of the readers' structured outputs (100–200 KB); read it WHOLE, in parts if needed (for example with python), before writing anything.${extra.length ? '\n\nADDITIONAL READING (read live in this run):\n' + JSON.stringify(extra, null, 1) : ''}`, { label: `synth:${s.key}`, phase: 'Synthesize' })
    return { s, summary }
  },
  async ({ s, summary }) => {
    const ver = await agent(`${COMMON}

YOUR SEAT: adversarial verifier of ${MAPS}/${s.file}. Read it whole. Check at least 40 of its most load-bearing claims against the host code and docs (every constant, flag status, rate, channel, formula shape, what moves between settlements, what the map shows). Default to "wrong" when the cited line does not say it. List mechanisms the note missed (grep the host for terms it does not mention). Do not edit.`, { label: `verify:${s.key}`, phase: 'Verify', schema: VER })
    const wrong = ((ver && ver.checked) || []).filter(c => c.verdict !== 'holds')
    const fix = await agent(`${COMMON}

YOUR SEAT: the fixer for ${MAPS}/${s.file} (edit only that file). For each problem and omission below: re-check at the source; fix the note when real; leave it when the verifier is wrong. Add a final section "§12 Verification record" with one row per non-holding check and per omission: what the verifier said, what you found, what changed. Return a one-line summary per row.

PROBLEMS:
${JSON.stringify(wrong, null, 1)}

MISSING:
${JSON.stringify((ver && ver.missing) || [], null, 1)}`, { label: `fix:${s.key}`, phase: 'Verify' })
    return { key: s.key, file: s.file, summary, checked: ((ver && ver.checked) || []).length, problems: wrong.length, missing: ((ver && ver.missing) || []).length, fix }
  },
)

const done = results.filter(Boolean)
log(`notes landed: ${done.map(d => d.key).join(', ')}`)

phase('Implications')
const impl = await agent(`${COMMON}

YOUR SEAT: the implications seat research/sf-lenses. You may write exactly one file: ${MAPS}/research/sf/lens-implications.md, with under the title exactly: ${notice('research/sf-lenses')}
Read WHOLE: ${done.map(d => MAPS + '/' + d.file).join(', ')}, and ${MAPS}/research/sf/plague-system.md if it exists and ends with its §12 verification record (the plague read runs in a companion workflow; if it is absent or unfinished, say so in §1 and leave a marked plague row to be filled), and ${MAPS}/research/sf/faith-system.md §1, §6, §9; ${MAPS}/docs/PROGRESS.md rows J377–J379; ${MAPS}/research/sf/fp-physical-integration.md §1 and §8. Then write: §1 what the six systems (alignment, trade, populations, prosperity, plague, faith) have in common and where they differ in how they touch geography (relational links vs routes vs travel time vs none), as built and as designed; §2 one table per proposed lens (territory, patrols, religion, alignment, trade, populations, prosperity, plague, and any other the systems justify) with: the host facts it draws (with the note section), what is drawn (glyph, link, route flow, field, hinterland fill), what is honest in the default preset vs when lanes are lit, the audience rule (DM truth vs believed), time scrub, and every element that would be INVENTION today (no host fact) with the host change that would make it real; §3 how these change the territory reading (J377–J378): which host facts the projection's strength, culture resistance, sea, military and vassal terms should read, named exactly; §4 the lens mechanism refined (one framework: its record, legend, audience filter, time scrub, the "no invented fact" rule, the default-preset honesty rule); §5 host asks (numbered, each tied to a lens and a note section); §6 owner questions. Return a twenty-line summary.`, { label: 'implications', phase: 'Implications' })

return { notes: done.map(d => ({ key: d.key, file: d.file, checked: d.checked, problems: d.problems, missing: d.missing, summary: d.summary, fix: d.fix })), impl }
