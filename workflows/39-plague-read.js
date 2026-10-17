export const meta = {
  name: 'plague-read',
  description: 'Read the SettlementForge plague, pestilence and calamity system in full; one verified note; companion to systems-read (workflows/38)',
  phases: [
    { title: 'Read', detail: 'two readers: documents, code' },
    { title: 'Synthesize', detail: 'one research note' },
    { title: 'Verify', detail: 'adversarial check against code and docs, then fixes' },
  ],
}

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
    key: 'plague', file: 'research/sf/plague-system.md', seat: 'research/sf-plague',
    ask: 'PLAGUE: what a plague (pestilence, calamity, disease) is in the simulator, how it starts (seeds, conditions, war, famine, trade, crowding), how it spreads between settlements (carriers, trade routes, caravans, refugees and columns, armies, distance, seasons, quarantine and closure), how it acts inside a settlement (mortality, tier loss, unrest, faith, prosperity, institutions), how it ends and is remembered, the realm picture, and the family that now owns the plague arc (PG absorbed POP-4).',
    slices: [
      { key: 'plague-docs', brief: 'Docs: read WHOLE docs/DESIGN_FP_ARCH_PG.md (431). Grep "plague|pestilence|calamity|disease|quarantine|contagion" and read every passage in docs/DESIGN_FP_ARCH_POP.md, docs/DESIGN_FP_POPULATIONS.md (POP-4), docs/PHASE55_SPATIAL_ENGINE_DESIGN.md, docs/DESIGN_FP_ARCH_EC.md, docs/DESIGN_FP_ARCH_WC.md, docs/DESIGN_FP_ARCH_WY.md, docs/DESIGN_FP_FAITH.md, docs/DESIGN_REALM_DIRECTIVES.md, docs/DESIGN_FP_COHERENCE_FOLD.md (PG membership, §3.1.20, OD rows).' },
      { key: 'plague-code', brief: 'Code: read WHOLE src/domain/spatial/pestilence.js, src/domain/spatial/calamity.js, src/domain/worldPulse/pestilenceKernel.js, src/domain/worldPulse/calamityKernel.js, src/domain/display/settlementPestilence.js, src/domain/display/calamityLedger.js; and the plague/pestilence parts of src/domain/crisisLifecycle.js, src/domain/worldPulse/candidateEvents.js, src/domain/capacityModel.js, src/domain/worldPulse/pulseKernel.js, src/domain/events/mutateWorld.js, src/generators/safetyProfile.js, src/domain/display/newsVoice.js, src/domain/display/stateProse/defenseStateProse.js. Pin down how it spreads between settlements and what geometry, travel time and seasons it reads, and which flags gate each part.' },
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
    const reads = await parallel(s.slices.map(sl => () => agent(`${COMMON}\n\nSUBJECT: ${s.ask}\n\n${sl.brief}`, { label: `read:${sl.key}`, phase: 'Read', schema: READ })))
    return { s, reads: reads.filter(Boolean) }
  },
  async ({ s, reads }) => {
    const summary = await agent(`${COMMON}

YOUR SEAT: the synthesis seat ${s.seat}. You may write exactly one file: ${MAPS}/${s.file}. SUBJECT: ${s.ask}
Write a comprehensive note in your own words, cited, with under the title exactly: ${notice(s.seat)}
Sections: §1 summary (one page; answer the owner's question about this subject directly); §2 the data model; §3 the per-settlement picture (with exact constants and where they live); §4 the realm picture; §5 MOVEMENT BETWEEN SETTLEMENTS (every channel, rate, route and travel-time use, gate, season, capacity, flag); §6 couplings with the rest of the simulator; §7 STATUS by mechanism and preset as checked in code; §8 MAP TOUCHPOINTS today and what a map lens for this subject would need from the host and could add; §9 how this changes the map module's current readings (territory J377–J378, religion J379 and research/sf/faith-system.md §9.6, the lens mechanism) — concrete, numbered; §10 doc-vs-code contradictions, defects and open questions; §11 sources with line counts and what was not read. Return the section list with line counts and a ten-line summary.

READINGS:
${JSON.stringify(reads, null, 1)}`, { label: `synth:${s.key}`, phase: 'Synthesize' })
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

return { notes: done.map(d => ({ key: d.key, file: d.file, checked: d.checked, problems: d.problems, missing: d.missing, summary: d.summary, fix: d.fix })) }
