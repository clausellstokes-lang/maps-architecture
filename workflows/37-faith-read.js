// [Fable-reviewed 2026-10-18 (lane retrovalidation/scripts; J392): this script ran as J380 records; its prompt text stays as fed. Correction to it: line 15 quotes the owner's J380 words with "deity" twice where the owner wrote "diety" (PROGRESS.md J380: "the faith and diety system … local and global diety rankings"); the owner's words are as J380 records them.]
export const meta = {
  name: 'faith-read',
  description: 'Read the SettlementForge faith and deity system in full (docs and code), synthesize one research note, adversarially verify it against the code',
  phases: [
    { title: 'Read', detail: 'six readers over separate slices of the faith system' },
    { title: 'Synthesize', detail: 'one research note: local and global deity ranking, piety, conversion between settlements, map touchpoints' },
    { title: 'Verify', detail: 'adversarial check of the note against code and docs; fixes applied' },
  ],
}

const HOST = '/home/user/clausellstokes-lang/settlement-engine'
const NOTICE = '> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat research/sf-faith; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)'
const COMMON = `
You are a research seat reading SettlementForge's FAITH AND DEITY SYSTEM. Host repository: ${HOST} at origin/master 81f1cd96, READ-ONLY (never write there). Map-module repository: /home/user/maps-architecture (do not write anything in this seat; return data only). Describe in your own words; cite file:line; copy no code. Tag claims [STATED] (a document says it), [OBSERVED] (you read it in code), [INFERRED] (your reasoning, given). For every mechanism say whether it is LIT (runs in the default preset), LIT in some presets (which), BUILT DARK (behind which flag), or DESIGNED ONLY — check the flag in code, not only the docs (the status of record for FP is ${HOST}/docs/DESIGN_FP_COHERENCE_FOLD.md §2; preset definitions are in the simulation presets / FP_LIT code; grep for them).
The owner's question: "see the faith and deity system in settlement-engine in full and comprehensive and note how we have local and global deity rankings and a global piety system and how religion conversions move between settlements." The map module is designing a religion and conversion LENS for its world map (a toggleable derived layer over host facts), so also record every place the faith system reads or could show geometry: distance, adjacency, routes, travel time, territory, the spatial digest, the world map, overlays, sites (temples, shrines, sacred claims), seasons, pilgrim movement.
Read the files named in your slice WHOLE (state line counts). Follow imports to anything faith-central they depend on and read that too; list anything you could not read.`

const READ = {
  type: 'object',
  properties: {
    slice: { type: 'string' },
    filesRead: { type: 'array', items: { type: 'string' }, description: 'path (lines, whole|partial)' },
    mechanisms: { type: 'array', items: { type: 'object', properties: {
      name: { type: 'string' }, what: { type: 'string' }, how: { type: 'string', description: 'inputs, formula shape, constants, update cadence, outputs' },
      state: { type: 'string', description: 'persisted keys/fields it reads and writes, and the one writer' },
      status: { type: 'string' }, citations: { type: 'string' }, spatial: { type: 'string', description: 'what geometry/distance/map it reads or shows; "none" if none' },
    }, required: ['name', 'what', 'how', 'state', 'status', 'citations', 'spatial'] } },
    localRanking: { type: 'string', description: 'everything this slice shows about per-settlement deity ranking/standing/chief' },
    globalRanking: { type: 'string', description: 'everything about global deity rank/tier/pantheon' },
    piety: { type: 'string', description: 'everything about piety (local and global), its meaning, scale, writers, readers' },
    conversionMovement: { type: 'string', description: 'everything about how conversion moves between settlements: carriers, channels, rates, distance, occupation, pilgrims, missionaries' },
    mapTouchpoints: { type: 'string', description: 'every existing map/spatial read, overlay or UI on a map, and what a map lens would need' },
    dmAndAudience: { type: 'string', description: 'DM authoring, secrets, latent/hidden deities, audience/belief about faith' },
    contradictions: { type: 'string', description: 'doc-vs-code disagreements, stale docs, open questions' },
  },
  required: ['slice', 'filesRead', 'mechanisms', 'localRanking', 'globalRanking', 'piety', 'conversionMovement', 'mapTouchpoints', 'dmAndAudience', 'contradictions'],
}

const SLICES = [
  { key: 'docs-core', brief: `Slice: the core design documents. Read WHOLE: docs/RELIGION_REWORK.md (215), docs/DESIGN_FP_FAITH.md (1,706). Then grep docs/DESIGN_FP_COHERENCE_FOLD.md for WF/faith/deity/piety and read those passages (§2 WF row, §3.1.5, §3.2.4–§3.2.6, OD-FC-7 and any other).` },
  { key: 'docs-arch', brief: `Slice: the architecture and history documents. Read WHOLE: docs/DESIGN_FP_ARCH_WF.md (858), docs/PHASE4_FAITH_DELTA.md (1,203). Then grep docs/DESIGN_FP_ARCH_HB.md, docs/DESIGN_FP_COUPLINGS.md, docs/DESIGN_FP_ARCHITECTURE.md, docs/DESIGN_FP_INFORMATION.md and docs/DESIGN_FP_GRAMMAR.md for faith/deity/piety/pilgrim/conversion and read every such passage.` },
  { key: 'code-state', brief: `Slice: the faith STATE and RANKING code. Read WHOLE: src/domain/worldPulse/religionState.js, pantheon.js, piety.js, latentPantheon.js, religionLegitimacy.js, deityAxes.js, deityStance.js, deityStanceLane.js, deityFlaws.js, faithTuningSurface.js, clergyTraitPlane.js; src/domain/deitySnapshot.js, deityConstants.js, deityCommitEmbed.js; src/store/settlementDeityHelpers.js, src/store/deitySnapshot.js. Pin down exactly: the local ranking (shares, standing, chief, slots, niches, incumbency), the global ranking (pantheon tiers, how local success feeds global rank, the containment cap), and piety (what it is, local vs global, its scale and readers).` },
  { key: 'code-spread', brief: `Slice: the faith SPREAD and CONVERSION code. Read WHOLE: src/domain/worldPulse/religiousContest.js, faithField.js, faithChannelBindings.js, sacredClaim.js, faithNews.js, faithWitnessSource.js, faithReceiptPools.js, convergenceReactive.js, src/domain/traditions/pilgrimage.js. Then grep and read the faith/conversion parts of src/domain/worldPulse/occupation.js, convergence.js, momentum.js, pulseKernel.js, applyWorldPulse.js, beliefMap.js, informationStatecraft.js, src/domain/region/propagation.js and src/domain/region/graph.js. Pin down exactly how conversion moves between settlements: which channels (allied/trade/patron/vassal/garrison/war-front/...), their weights, the minimum carrier, regional prevalence per neighbour and its cap, receptivity, occupation-forced conversion, suppressed cults and resurgence, what "faithField" is and what geometry it uses (distance? adjacency? the spatial digest?), cadence per tick, and which flags gate each.` },
  { key: 'code-ui-data', brief: `Slice: the faith UI, MAP and DATA code. Read WHOLE: src/components/map/PantheonPanel.jsx, src/components/map/WarFaithMapOverlay.jsx, src/components/map/AssignDeityFromMap.jsx, src/components/new/tabs/FaithTab.jsx, src/components/new/tabs/WarFaithDesk.jsx, src/components/settlement/FaithSection.jsx, faithPanelModel.js, DeityAssignmentPanel.jsx, src/components/compendium/PantheonActivationStrip.jsx, src/domain/display/pantheonDepth.js, faithDeepening.js, deityEffects.js, deityNames.js, faithEventFilter.js; supabase/migrations/049_custom_content_deities.sql, 056_deity_law_axis.sql, 128_latent_pantheon_public_denylist.sql, 129_strip_latent_pantheon_gallery_dm_full.sql, 200_deity_authored_character.sql. Pin down what the map already shows about faith (the overlay's layers, how it draws, what it reads), how the DM authors and assigns deities, what is hidden from players (latent pantheon, denylist), and the data model of a deity.` },
  { key: 'cross', brief: `Slice: faith ACROSS the rest of the simulator. Grep and read every faith/deity/piety/pilgrim/conversion/holy-war/tithe/temple passage in: docs/PHASE55_SPATIAL_ENGINE_DESIGN.md (faith networks, co-religionist topology keyed on shared dominant deity capped to k-nearest, the religious-center loop, conversion risk), docs/DESIGN_REALM_DIRECTIVES.md, docs/DESIGN_WAR_RULINGS_ARCHITECTURE.md, docs/DESIGN_FP_ARCH_WC.md, docs/DESIGN_FP_ARCH_POP.md, docs/DESIGN_FP_ARCH_TR.md, docs/DESIGN_FP_ARCH_ES.md, docs/DESIGN_FP_ARCH_WY.md (pilgrims and legates as errands), docs/DESIGN_SETTLEMENT_MAP.md and docs/DESIGN_FP_ARCH_MF.md (temples/sacred sites in the town map), and the generation pipeline (grep src/generators for deity/religion/temple: how a settlement's faith is generated at birth). Also check the presets: which faith flags are lit in which preset.` },
]

phase('Read')
const reads = await parallel(SLICES.map(s => () => agent(`${COMMON}\n\n${s.brief}`, { label: `read:${s.key}`, phase: 'Read', schema: READ })))
const got = reads.filter(Boolean)
log(`slices read: ${got.length}/${SLICES.length}`)

phase('Synthesize')
const note = await agent(`${COMMON}

YOUR SEAT: the synthesis seat research/sf-faith. You MAY write exactly one file: /home/user/maps-architecture/research/sf/faith-system.md. Six readers returned the structured readings below. Write a comprehensive note, in your own words, cited, with under the title exactly this notice line:
${NOTICE}
Sections: §1 summary (one page: what the faith system is and the three things the owner named); §2 the deity and its data (axes, niches, rank, authored character, latent deities); §3 LOCAL ranking (per-settlement shares, standing with hysteresis, slots by tier, niches, the chief and incumbency, entry paths, suppressed cults) with exact constants and where they live; §4 GLOBAL ranking (pantheon tiers, how local success raises global rank, the containment cap, latent pantheon); §5 PIETY (what it measures, local and global, scale, writers, readers, how it couples to legitimacy, devotion, the unseating, omens); §6 CONVERSION BETWEEN SETTLEMENTS (every channel and weight, prevalence, receptivity, occupation-forced conversion, pilgrims/legates/missionaries, the co-religionist topology, the faith field, cadence, the frozen-vs-live law where it applies, flags); §7 the rest of the simulator's faith couplings (legitimacy, war/holy war, trade/tithe, information/news, populations, grammar terms, the hearing week, engagement kinds); §8 STATUS (lit/dark/designed per mechanism, by preset, as checked in code); §9 the MAP TOUCHPOINTS today (what the world map and town map already show or read about faith; the overlay; geometry the faith system reads) and what a map-side religion lens would need from the host and could add; §10 doc-vs-code contradictions and open questions; §11 sources read with line counts and anything not read. Expect 600–1,000 lines. Return the section list with line counts and a ten-line summary.

READINGS:
${JSON.stringify(got, null, 1)}`, { label: 'synthesize', phase: 'Synthesize' })

phase('Verify')
const VER = { type: 'object', properties: {
  checked: { type: 'array', items: { type: 'object', properties: { claim: { type: 'string' }, where: { type: 'string' }, verdict: { type: 'string', enum: ['holds', 'wrong', 'unverifiable'] }, evidence: { type: 'string' }, fix: { type: 'string' } }, required: ['claim', 'verdict', 'evidence'] } },
  missing: { type: 'array', items: { type: 'string' } },
}, required: ['checked', 'missing'] }
const ver = await agent(`${COMMON}

YOUR SEAT: adversarial verifier of /home/user/maps-architecture/research/sf/faith-system.md. Read it whole. Then check at least 40 of its most load-bearing claims against the host code and docs (every constant it quotes, every flag status, every channel weight, the local/global ranking mechanics, the piety mechanics, how conversion moves, what the map overlay shows). Default to "wrong" when the cited line does not say it. Also list mechanisms the note missed (grep the host for faith terms the note does not mention). Return the checks and the missing list; do not edit.`, { label: 'verify', phase: 'Verify', schema: VER })

const wrong = (ver && ver.checked || []).filter(c => c.verdict !== 'holds')
const fixed = await agent(`${COMMON}

YOUR SEAT: the fixer for /home/user/maps-architecture/research/sf/faith-system.md (you may edit only that file). A verifier found the problems and omissions below. For each: re-check at the source; if real, fix the note; if the verifier is wrong, leave the text. Add a final section "§12 Verification record" with one row per checked claim that was not "holds" and per missing item: what the verifier said, what you found, what changed. Return a one-line summary per row.

PROBLEMS:
${JSON.stringify(wrong, null, 1)}

MISSING:
${JSON.stringify((ver && ver.missing) || [], null, 1)}`, { label: 'fix', phase: 'Verify' })

return { slices: got.map(g => g.slice), note, verifiedCount: (ver && ver.checked || []).length, problems: wrong.length, missing: (ver && ver.missing || []).length, fixed }
