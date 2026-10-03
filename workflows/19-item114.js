export const meta = {
  name: 'item114-switches',
  description: 'Owner rule 114 (J126): enumerate every kind of thing the generator adds by its own rules that no dossier record requires (the "Built by the town" switch list), settle the catalogue with a completeness critic, and write the per-unit changes as checked operator findings for the coherence loop',
  phases: [
    { title: 'Find', detail: 'one reader per slice of the base and the volumes: every generator-added kind, its rule, default, control and removal behaviour' },
    { title: 'Catalogue', detail: 'merge, name and classify the kinds; a completeness critic sweeps the set until nothing new' },
    { title: 'Route', detail: 'the per-unit changes item 114 needs, as operator findings' },
    { title: 'Check', detail: 'per unit: an adversarial check of its findings against the live text' },
  ],
}

// Stage-driven, so the Find phase can run as several runs side by side (the harness allows 2 agents per run here):
//   args.phase = 'find', args.slices = [slice keys]   → the readers of those slices
//   args.phase = 'settle'                             → catalogue, critic loop, routing, per-unit checks
const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/home/user/maps-architecture'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/item114'
const DIR = 'docs/validation/coherence/item114'
const MODEL = ARGS.model || 'opus'
const NOTE = ARGS.note ? `\n\n${ARGS.note}` : ''
const seat = (prompt, label, phaseName, schema) => agent(prompt + NOTE, { label, phase: phaseName, schema, agentType: 'general-purpose', model: MODEL })

const SLICES = [
  { key: 'base-pipeline', what: 'docs/ARCHITECTURE.md §4 (the generation pipeline and every stage S0–S13 with its sub-stages), §10 (simulation and content), PART II (the district and neighbourhood interface, templates, block dispatch, the render tier workflow, what the base carries, the staged layers, the sewer layer II.7) and PART III' },
  { key: 'base-model-kernel', what: 'docs/ARCHITECTURE.md §2 (the domain model: every record, its lifecycle, §2.8 identity and the suppression bullet) and §3 (the geometry kernel)' },
  { key: 'base-rest', what: 'docs/ARCHITECTURE.md §0, §1, §5–§9 and §11–§17 (failure handling, determinism, editing incl. §7.1 edits, §7.4 lifecycle rows, §7.6 settings layers, §7.7 the dossier contract, §7.8 the parameter registry, rendering and layers, labels, export and persistence, budgets, tests, packages, matrices, the build plan)' },
  { key: 'V01-V02', what: 'docs/volumes/V01-neighbourhoods.md and docs/volumes/V02-buildings.md' },
  { key: 'V03-V04', what: 'docs/volumes/V03-interiors.md and docs/volumes/V04-underground.md' },
  { key: 'V05-V06', what: 'docs/volumes/V05-sky.md and docs/volumes/V06-evolution.md' },
  { key: 'V07-V08', what: 'docs/volumes/V07-village.md and docs/volumes/V08-settlementforge.md' },
  { key: 'V09-V10', what: 'docs/volumes/V09-application.md and docs/volumes/V10-clerk.md' },
  { key: 'V11-V12', what: 'docs/volumes/V11-content.md and docs/volumes/V12-calibration.md' },
]
const UNITS = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope', 'V01', 'V02', 'V03', 'V04', 'V05', 'V06', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']
const UNIT_NOTE = 'the base parts by key: model = §2, kernel = §3, pipeline = §4, §10, PART II, PART III; determinism = §5, §6, §7; rendering = §8, §9, §11, §12; scope = the title, the summary, §0, §1, §13–§17, the decisions, the judgment index, the staged list, Appendix A; V01 to V12 are the volumes'

const GROUND = `PROJECT (root ${ROOT}; paths relative to it). PLAT is an original settlement map generator and the map layer of SettlementForge. Its design is a SET: the base docs/ARCHITECTURE.md (with docs/ARCHITECTURE-RATIONALE.md), the twelve design volumes docs/volumes/V01-…V12-*.md and docs/volumes/INDEX.md. It is mid-way through a coherence pass (docs/validation/coherence/; do not touch its files except your own under ${DIR}/). OWNER RULE 114 (docs/AMENDMENTS-2026-09-28g.md, item 114 — read it whole, the owner's words are the authority; judgment J126 in docs/PROGRESS.md): what the town builds by itself becomes a COMPREHENSIVE list of on/off switches in the advanced panel ("Built by the town"), one per kind of thing the generator adds by its own rules that no dossier record requires; a delete of one generated instance is for now (it holds while the town is unchanged and lapses at the next change that re-reads the kind); the reason-keyed suppression that held deletions forever is withdrawn. Standing rules: the dossier is the sole immutable truth (items 20, 22: a dossier-bound instance is never switched off or suppressed by the map); clean-room (no reference code, identifiers, grammars, palettes or word lists); emulation-first defaults; plain words for users. WORKING RULES: write your files incrementally and save often; append a CHECKPOINT line to docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <what is done, what is next>"); just before LANDED write the exact structured result you will return to ${DIR}/results/<lane key with / replaced by _>.json; RESUME RULE: if your output file exists AND docs/lane-events.log has a LANDED line for your lane key, return that results file's content verbatim; CONTINUE RULE: if it exists without one, continue from the first unfinished part (the files on disk are the truth). Redirect long output to files under ${SCRATCH}/ (make it) and grep them; read whole sections, never samples. Edit no design file. Commit and push nothing. When complete: echo "$(date '+%Y-%m-%d %H:%M') <lane key> LANDED <files>" >> ${ROOT}/docs/lane-events.log and return the structured result.`

const KIND_FIELDS = 'kind (a plain name), examples, home (the unit and section that states its rule), builders (the stages or epoch steps that add it), rule (when the generator adds it, with its conditions, rungs and caps), table (the content table and row that hold its chance, cap or default, normally in V11), default (what happens today with no setting touched), controls (every existing setting, preset, layer switch or table override that already turns it on or off, with where it lives), removal (what a delete of a generated instance does today: suppressed by reason key, a plain delete that holds by identity, not removable, …), dossier (whether and how a dossier record can make it exist or bind an instance), epochs (whether growth or decline adds or removes it over time), classification (EXTRA: added on the generator\'s own initiative and plausible for an author to want on or off; CORE: part of every settlement\'s fabric and governed by other settings — streets, blocks, plots, ordinary buildings, districts, the town wall itself; DOSSIER: exists only because the dossier says so; BORDERLINE: say both sides) and reason, evidence (short quotes with their section)'
const KIND = { type: 'object', properties: { kind: { type: 'string' }, examples: { type: 'string' }, home: { type: 'string' }, builders: { type: 'string' }, rule: { type: 'string' }, table: { type: 'string' }, default: { type: 'string' }, controls: { type: 'string' }, removal: { type: 'string' }, dossier: { type: 'string' }, epochs: { type: 'string' }, classification: { type: 'string', enum: ['EXTRA', 'CORE', 'DOSSIER', 'BORDERLINE'] }, reason: { type: 'string' }, evidence: { type: 'string' } }, required: ['kind', 'home', 'builders', 'rule', 'default', 'controls', 'removal', 'dossier', 'classification', 'reason', 'evidence'] }
const FIND_SCHEMA = { type: 'object', properties: { slice: { type: 'string' }, file: { type: 'string' }, kinds: { type: 'array', items: KIND }, suppression_sites: { type: 'array', items: { type: 'string' } } }, required: ['slice', 'file', 'kinds', 'suppression_sites'] }
const CAT_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, rows: { type: 'number' }, extra: { type: 'number' }, borderline: { type: 'number' }, excluded: { type: 'number' }, groups: { type: 'array', items: { type: 'string' } } }, required: ['file', 'rows', 'extra', 'borderline', 'excluded', 'groups'] }
const CRITIC_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, missing: { type: 'array', items: { type: 'object', properties: { kind: { type: 'string' }, evidence: { type: 'string' }, why: { type: 'string' } }, required: ['kind', 'evidence', 'why'] } }, wrongly_included: { type: 'array', items: { type: 'object', properties: { kind: { type: 'string' }, why: { type: 'string' } }, required: ['kind', 'why'] } } }, required: ['file', 'missing', 'wrongly_included'] }
const ISSUE = { type: 'object', properties: { id: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, kind: { type: 'string' }, claim: { type: 'string' }, required_change: { type: 'string' }, owner: { type: 'string' } }, required: ['id', 'severity', 'kind', 'claim', 'required_change', 'owner'] }
const ROUTE_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, issues: { type: 'array', items: ISSUE } }, required: ['file', 'issues'] }
const CHECK_SCHEMA = { type: 'object', properties: { unit: { type: 'string' }, file: { type: 'string' }, kept: { type: 'number' }, corrected: { type: 'number' }, dropped: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, why: { type: 'string' } }, required: ['id', 'why'] } }, issues: { type: 'array', items: ISSUE } }, required: ['unit', 'file', 'kept', 'corrected', 'dropped', 'issues'] }

const findPrompt = (s) => `${GROUND}

LANE item114/find-${s.key}. You are a READER for owner rule 114's switch list. Your slice: ${s.what}. Find EVERY kind of thing the generator adds to a map by its own rules, chances or reasons — whatever an author might want on or off: raised ways (viaducts, elevated roads, aqueducts), terrace retaining walls and their stairs and ramps, building plots on bridges and decks, quay and sea walls and sea gates, harbour-mouth chains and towers, oases and springs, floating islands and their sky accesses, the underground's systems (sewers, caverns, ruins, catacombs, ossuaries, crypts, undercities, tunnels), buried former settlements and other history traces, lights, gardens, fountains and wells, landmarks, decorative or optional furniture, special shapes — and anything else of the kind, named or not in this list. Method: read whole every section of your slice that defines generation, a stage, a layer, a record that a stage creates, a content row, an existence chance, a cap, a preset, a setting or a removal rule; and grep the whole slice for the vocabulary of optional generation (chance, cap, existence, by itself, raises, adds, generated, optional, suppress, re-add, removed, preset, layer, toggle, switch, none, "as the rules say") to find what the reading would miss. For each kind record: ${KIND_FIELDS}. List CORE and DOSSIER kinds you meet too (with the reason), so the catalogue can show what is deliberately not switched. Also list every SUPPRESSION SITE in your slice — every sentence, record, field, row, test or message that implements or states the reason-keyed suppression item 114 withdraws (detail.suppress, file f item 260, J-VI.14, a suppressed set, removed slots counted as filled, "will not rebuild", "won't rebuild", info.remove.holds, "counts as filled", "Remove them too"), with its section. Write ${DIR}/find-${s.key}.json (the structured result) and ${DIR}/find-${s.key}.md (the same, readable).`

const catPrompt = (round, extra) => `${GROUND}

LANE item114/catalogue-r${round}. You build the CATALOGUE of owner rule 114's switch list. Read every ${DIR}/find-*.json (query with python)${round > 0 ? `, your previous ${DIR}/catalogue.json and the completeness critic's ${DIR}/critic-r${round - 1}.json (its missing kinds and wrong inclusions: verify each against the text yourself and add, correct or reject it with the reason)` : ''}, the glossary of docs/validation/coherence/canon.md (one term per concept), base §7.6 and §7.8 (the settings layers and the parameter registry's naming), V09 §4.14 (the advanced panel) and V11's table catalogue (§3.1). Produce ${DIR}/catalogue.json and ${DIR}/catalogue.md: one row per DISTINCT kind (merge synonyms and duplicates across slices; the canon's term), with every field the readers record, its final classification (EXTRA rows are the switches; BORDERLINE settled to EXTRA or excluded with the reason; CORE and DOSSIER kept in an "Not on the list, and why" table), and for each switch row: the user-facing label in plain words, the group it sits in (for example Streets and raised ways, Ground, Walls and waterfront, Plots, Water, Sky, Underground, History, Furniture), the setting's key in the registry's naming, its default (the kind's current default, so a document that never touches the list generates exactly as before), the rungs at which the row applies, the stage or epoch step that must read it, and what turning it off removes (the generator's standing instances only; never a drawn or dossier-bound one). EXISTING CONTROLS: where a kind already has a control (a layer switch, a preset, the "Raised ways the town builds by itself" row, a T1 sheet chip, a table chance), rule ONE setting per concept: either the switch row IS that setting (shown in the list and wherever it already appears, one stored value) or the existing control is replaced — never two settings for one thing; record the ruling and its reason. Also the union of the readers' SUPPRESSION SITES, deduplicated, each with its section. ${extra || ''}`

const criticPrompt = (round) => `${GROUND}

LANE item114/critic-r${round}. You are the COMPLETENESS CRITIC of owner rule 114's switch list. Read ${DIR}/catalogue.json and .md. Then search the whole set for anything the catalogue misses, each way independently: (1) every table of V11 §3.1's catalogue and its §3.x section that holds a chance, a cap, an existence rule or a default for something optional — each must map to a catalogue row or a stated exclusion; (2) every stage of base §4 (the stage table and each stage's outputs) and every epoch step of V06 that adds a feature not every settlement has; (3) every record of base §2 and of the volumes' §2 whose lifecycle cause is a generation or epoch rule and that is optional; (4) every existing control: V09 §4.14's advanced panel, the T1 Kind of place sheet's chips and toggles (V09), the presets of §7.6 and §15, every layer switch of §8 and the volumes; (5) every remaining suppression site (grep detail.suppress, suppress, removed slots, rebuild, info.remove.holds, Remove them too). Also flag any catalogue row wrongly included (a CORE or DOSSIER kind made a switch, or one that would let a switch touch a dossier-bound instance). Write ${DIR}/critic-r${round}.json and .md with the missing kinds (each with its evidence and why it belongs) and the wrong inclusions. Report only what you verified in the text.`

const routePrompt = `${GROUND}

LANE item114/route. You write the CHANGES owner rule 114 needs, unit by unit, as findings for the coherence pass's next repair round (they are applied by that pass's repair seats, one per unit, as blocks of new text). Read item 114 whole, ${DIR}/catalogue.json and .md (the switch list, the rulings on existing controls, the suppression sites), and the live text of every section a change lands in. Units: ${UNIT_NOTE}. For EVERY unit that item 114's HOMES name or that hosts a listed kind, a builder of one, a control of one or a suppression site, write findings in this exact form: id "G114-<unit>-NN", severity "major", kind "F-MISSING", owner the unit key, claim = what the live text says or lacks now (quote it and give the section), required_change = the exact new behaviour and where it is stated, with enough detail that an editor can write it without re-deriving the rule. Cover: (a) the list itself — its home (V09 §4.14's group and rows, the registry rows of §7.8 and V11's rows for keys and defaults; one stored value per concept, as the catalogue rules); (b) the switch — a map-side setting on §7.6's layers, never written to the dossier (§7.7, V08), changed by one adjust event, previewed and undone, OFF removing only the generator's standing instances, ON re-admitting the kind at the next derivation, every builder reading its switch; (c) delete-for-now — §2.8's suppression bullet replaced, §7.1's dry run and §7.4's lifecycle rows, V06's ledger and §3.19 without the suppressed set, V05's removed slots no longer counted as filled (the archive kept for undo), the lapse rule (holds while unchanged: Regenerate, reload, crash recovery; lapses at the next epoch, a New random over the place, or a Re-derive of the building stage), no cap counting, Build it again kept; EVERY suppression site of the catalogue rewritten or removed; (d) the words — V09's info.remove.holds row and the history row, V06's dry-run lines and V10's clerk lines in item 114's terms, the clerk answering "why is there no …?" with the switch; (e) the bars and tests of item 114 (e) at §13.2 and V12, plus the unit tests of each changed mechanism, and the migration of older documents' suppression records as plain deletions; (f) every cross-reference, wiring row and lifecycle row the change touches (principle: everything wired both ways), and the agreement between units (one name per switch everywhere). One finding per unit per distinct change; nothing vague. Write ${DIR}/route.json (the issues) and ${DIR}/route.md.`

const checkPrompt = (unit, issues) => `${GROUND}

LANE item114/check-${unit}. You are an ADVERSARIAL CHECKER of owner rule 114's findings for unit ${unit} (${UNIT_NOTE}). The findings: ${JSON.stringify(issues)}. Read item 114 whole, ${DIR}/catalogue.md, and the LIVE text of every section the findings name (whole sections). For each finding: is the claim true of the live text (quote it); is the required change complete, exact and consistent with item 114, the catalogue's rulings, the dossier rules (no dossier-bound instance switched or suppressed), the other owner rules and the rest of the set; is anything this unit needs for item 114 missing. Keep a finding as it is, correct it (rewrite its claim or required change), drop it (with the reason: false, already done, or belongs to another unit — name it), or add a missing one (id "G114-${unit}-Ann"). Default to correcting rather than keeping when a required change is vague. Write ${DIR}/check-${unit}.json (the final findings for the unit) and .md.`

if (ARGS.phase === 'find') {
  const sel = SLICES.filter((s) => (ARGS.slices || []).includes(s.key))
  if (!sel.length) return { error: `args.slices must name some of ${SLICES.map((s) => s.key).join(', ')}` }
  phase('Find')
  const found = await parallel(sel.map((s) => () => seat(findPrompt(s), `item114/find-${s.key}`, 'Find', FIND_SCHEMA)))
  return { phase: 'find', slices: sel.map((s, i) => ({ slice: s.key, ok: !!found[i], kinds: found[i] ? found[i].kinds.length : null, sites: found[i] ? found[i].suppression_sites.length : null })) }
}

if (ARGS.phase === 'settle') {
  phase('Catalogue')
  let cat = await seat(catPrompt(0), 'item114/catalogue-r0', 'Catalogue', CAT_SCHEMA)
  if (!cat) return { error: 'catalogue failed' }
  log(`catalogue: ${cat.rows} kinds, ${cat.extra} switches, ${cat.borderline} borderline, ${cat.excluded} excluded`)
  // loop until dry: a critic sweeps the set; whatever it verifies as missing or wrong goes back to the catalogue seat
  let round = 0
  const MAX = ARGS.maxCriticRounds || 3
  while (round < MAX) {
    const crit = await seat(criticPrompt(round), `item114/critic-r${round}`, 'Catalogue', CRITIC_SCHEMA)
    const n = crit ? crit.missing.length + crit.wrongly_included.length : 0
    log(`critic round ${round}: ${crit ? crit.missing.length : '?'} missing, ${crit ? crit.wrongly_included.length : '?'} wrongly included`)
    if (!crit || !n) break
    round++
    cat = await seat(catPrompt(round), `item114/catalogue-r${round}`, 'Catalogue', CAT_SCHEMA) || cat
    log(`catalogue r${round}: ${cat.rows} kinds, ${cat.extra} switches`)
    if (round === MAX) log(`critic cap of ${MAX} rounds reached — the last critic's findings were folded but not re-swept`)
  }
  phase('Route')
  const route = await seat(routePrompt, 'item114/route', 'Route', ROUTE_SCHEMA)
  if (!route) return { error: 'route failed', catalogue: cat }
  const byUnit = {}
  for (const i of route.issues) (byUnit[i.owner] = byUnit[i.owner] || []).push(i)
  const units = Object.keys(byUnit)
  log(`routed: ${route.issues.length} findings over ${units.length} units (${units.join(', ')})`)
  phase('Check')
  const checks = await pipeline(units, (u) => seat(checkPrompt(u, byUnit[u]), `item114/check-${u}`, 'Check', CHECK_SCHEMA))
  const final = checks.filter(Boolean).flatMap((c) => c.issues)
  const failed = units.filter((u, i) => !checks[i])
  if (failed.length) log(`checks that returned nothing (their routed findings are used unchecked): ${failed.join(', ')}`)
  const unchecked = failed.flatMap((u) => byUnit[u])
  return { phase: 'settle', catalogue: cat, critic_rounds: round, routed: route.issues.length, final: final.length + unchecked.length, dropped: checks.filter(Boolean).flatMap((c) => c.dropped), unchecked_units: failed, issues: [...final, ...unchecked] }
}

return { error: "args.phase must be 'find' (with args.slices) or 'settle'" }
