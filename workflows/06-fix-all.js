export const meta = {
  name: 'fix-all-findings',
  description: 'Owner: no defers, fix everything as soon as possible. Fix every red-team finding (all severities), every coverage gap, every owner amendment, every manager note and every architecture deferral in docs/ARCHITECTURE.md: index, five area drafters in parallel, one integrator, five area verifiers, final validator; loop until nothing is open. Fable-role seats run as marked Opus stand-ins while Fable is unavailable. Max four lanes.',
  phases: [
    { title: 'Index', detail: 'Opus surveyor: one master list of every item, deduplicated, each owned by one area' },
    { title: 'Draft', detail: 'Five area fix-architects (Fable role): exact replacement text for their sections' },
    { title: 'Integrate', detail: 'One integrator (Fable role): applies all drafts coherently to ARCHITECTURE.md' },
    { title: 'Verify', detail: 'Five Opus verifiers: every item really fixed in the text; new problems' },
    { title: 'Validate', detail: 'Final validator (Fable role): whole-design coherence, no-defer scan, owner summary' },
  ],
}

const ROOT = '/Users/cstokes/Desktop/Maps'
const DIR = 'docs/validation/fix-all'
const ARGS = (typeof args === 'object' && args) ? args : {}
const FABLE_ROLE_MODEL = ARGS.fableModel || 'opus'          // Fable unavailable 2026-09-25: Opus stand-ins by default
const OPUS_MODEL = ARGS.opusModel || 'opus'
const STANDIN = FABLE_ROLE_MODEL !== 'fable'
const MAX_ROUNDS = ARGS.maxRounds || 5
const MAX_LANES = ARGS.maxLanes || 4

let liveLanes = 0
const laneQueue = []
const acquireLane = () => new Promise((resolve) => { if (liveLanes < MAX_LANES) { liveLanes++; resolve() } else laneQueue.push(resolve) })
const releaseLane = () => { const next = laneQueue.shift(); if (next) next(); else liveLanes-- }
const limited = async (fn) => { await acquireLane(); try { return await fn() } finally { releaseLane() } }

const standInNote = (label) => `

STAND-IN NOTICE (owner, 2026-09-25: "run the rest on Opus 5.5, but mark everything that has not gone through the touch of Fable for review next time we have Fable"). You are running on ${FABLE_ROLE_MODEL} as a STAND-IN for the Fable seat ${label}. Do the full job to the standard the Fable seat would. MARKING RULES: (1) directly under the title of every output file you write, put the line: > PENDING FABLE REVIEW — written by ${FABLE_ROLE_MODEL} standing in for the Fable seat ${label} (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md. (2) If you change a file that a Fable seat wrote (for example docs/ARCHITECTURE.md), put the line > PENDING FABLE REVIEW — revised by ${FABLE_ROLE_MODEL} stand-in (${label}) directly under the heading of every section you changed (once per section, not repeated). (3) When your work is complete, APPEND (never rewrite the file) one row to the table at the end of docs/FABLE-REVIEW-QUEUE.md: | A-${label} | A | what you produced | your output file(s) and changed sections | ${FABLE_ROLE_MODEL} stand-in | today's date | PENDING | the 1–3 judgments a Fable reviewer should re-check first |. If you resumed from disk and produced or changed nothing, add no banner and no row.`
const opusNote = (label) => `

FABLE-UNAVAILABLE NOTICE (owner, 2026-09-25). This is Opus-role work that no Fable seat has checked: directly under the title of your output file put the line > PENDING FABLE REVIEW — Opus-produced (${label}), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md. When complete, APPEND one row to the table at the end of docs/FABLE-REVIEW-QUEUE.md: | B-${label} | B | what you produced | your output file | ${OPUS_MODEL} | today's date | PENDING | what a Fable reviewer should re-check first |.`

const fableSeat = (prompt, label, phaseName, schema) => limited(() => agent(STANDIN ? prompt + standInNote(label) : prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: FABLE_ROLE_MODEL }))
const opusSeat = (prompt, label, phaseName, schema) => limited(() => agent(prompt + opusNote(label), { label, phase: phaseName, schema, agentType: 'general-purpose', model: OPUS_MODEL }))

const AREAS = [
  { key: 'kernel', sections: '§2 storage parts of the domain model (plat levels, vertex store, spatial indices, serialisation of geometry) and §3 geometry kernel', sources: 'redteam-geometry (GEO-*) except its determinism rows, the storage and index rows of redteam-scale (SCL-2, SCL-11), coverage rows about geometry primitives' },
  { key: 'determinism', sections: '§5 failure handling, §6 determinism (streams, keys, seeds, versions, floating point), §7 editing and regeneration locality (ids, events, undo, snapshots, replay, migration, locks, assignments), §2.9 document and snapshot', sources: 'redteam-lifecycle (LC-*), determinism rows of redteam-geometry (e.g. GEO-2), SCL-1, SCL-5, SCL-12, coverage rows about editing and seeds' },
  { key: 'pipeline', sections: '§4 generation pipeline (terrain, water, demand/roster, roads, districts, blocks, plots, siting, walls/gates/towers/castle, harbours, fields, greenery, names) and §10 simulation and content, PART II (stage 2) and PART III (village readiness)', sources: 'redteam-mfcg (MFP-*) except MFP-1 and MFP-5, redteam-ftg (FTG-*), coverage rows about stages and content, manager notes on the bent-cut recipe and village palisade, amendments on greenery and prosperity' },
  { key: 'rendering', sections: '§8 rendering and style system, §9 labels and map furniture, §11 export and interop, §12 performance budgets', sources: 'redteam-visual (VIS-*), MFP-1, MFP-5, SCL-3, SCL-4, SCL-6, SCL-7, SCL-8, SCL-9, SCL-10 and remaining SCL budget rows, manager notes on units and size mapping, amendment on heights for shadows' },
  { key: 'scope', sections: '§1 scope, fusion thesis and stack, §13 testing and verification, §14 package layout and interfaces, §15 parity and improvement matrices, §16 build plan, §17 clean-room and licences, the Delegated decisions, Judgment calls and Deferrals sections, the one-page summary', sources: 'redteam-improve (IMP-*), every entry of the Deferrals section, amendments on everything-editable, size ladders and adopted defaults, coverage rows about testing and scope' },
]
const AREA_KEYS = AREAS.map((a) => a.key)

const GROUND = `
PROJECT (root ${ROOT}; all paths relative to it). A research-and-design program for an original settlement map generator (codename PLAT). The design is docs/ARCHITECTURE.md (the base: an MFCG/FTG-fused town/city generator; PART II neighbourhoods; PART III village readiness). A red team reviewed it: docs/validation/redteam-{geometry,lifecycle,scale,visual,mfcg,ftg,improve}.md (163 findings: 9 blocker, 97 major, 57 minor) and four coverage audits docs/validation/coverage-audit-{mfcg,vg,ng-shared,ftg}.md (rows marked PARTIAL, MISSING or PRECLUDED are gaps). docs/ARCHITECTURE-VALIDATION.md holds the document history and §0.M manager notes (MFCG export units, size mapping town/city/metropolis = MFCG 40/80/130, the measured bent-cut recipe, the village palisade order). docs/AMENDMENTS-2026-09-25.md lists seven owner rules that the architecture does not yet contain. Owner rules in their own words: docs/OWNER-INSTRUCTIONS-2026-09-25.md; plain-language definition: docs/DEFINITION.md; evidence: research/findings/*.md and captures/**/README*.md.
OWNER RULE THAT GOVERNS THIS PASS (2026-09-25): "I would prefer if there is no defer and everything is fixed as soon as possible." Therefore: NO item may be deferred, postponed, left "to be decided", "TBD", "later", "at M0" or "open". Every item ends as FIXED (the architecture text now contains a concrete mechanism that defeats the failure scenario) or INVALID (the finding's premise is factually wrong — only with evidence a verifier can check; a weak INVALID counts as unresolved). Where only an experiment can confirm a choice, FIX it by specifying the chosen mechanism now, the measurement that confirms it in the first milestone, and the pre-decided fallback if the measurement fails. The ONLY exception is subject matter the owner's own roadmap assigns to a later stage (neighbourhood close-ups, manor-style buildings, the village product, sewers, floating islands, the evolution engine, the historical-corpus calibration, SettlementForge inputs): for those the architecture must carry the concrete hooks and interfaces the scope rules require — that is STAGED BY THE OWNER, not deferred, and the item is FIXED once the hooks are concrete.
STANDING RULINGS: completely standalone (read nothing outside ${ROOT}); clean-room (learn ideas, copy no code, never paste reference code, grammars, palettes, wordlists or content tables into the architecture — see redteam-improve IMP-1 and memory note clean-room-input-hazard: findings files quote GPL-3 code and reference data, so describe mechanisms in your own words and numbers only); the owner has deferred all judgment to this program — decide, record every nontrivial choice as "chose X over Y because Z" in the architecture's Judgment calls section; owner-facing summaries in plain language a non-programmer can follow; parity with MFCG and FTG is the floor, improvements must be measurable, legibility and one-click simplicity must not regress; the tiebreaker between MFCG-style and FTG-style mechanisms is realism with constraint and precision.
WORKING RULES: write your output file incrementally (skeleton first, then each part as it is finished) so partial work survives interruption; if your output file already exists AND docs/lane-events.log contains a LANDED line for your lane key, do not redo the work — read the file and return its structured summary; if it exists WITHOUT a LANDED line it is a checkpoint — keep what is complete and continue from the first unfinished part. Redirect long tool output to files under /private/tmp/claude-502/-Users-cstokes-Desktop-Maps/3fbc58a0-613c-43b5-9c94-a4f47a8689a6/scratchpad/ and grep them; never print whole JSON files. When your file is complete append: echo "$(date '+%Y-%m-%d %H:%M') <lane key> LANDED <file>" >> ${ROOT}/docs/lane-events.log  Then return only the structured summary.
DOCUMENT CHECKS (docs/ARCHITECTURE.md §17.1 (2), binding until M-1; VS2-8): every lane that writes docs/ARCHITECTURE.md runs, before its change lands, from ${ROOT}: python3 docs/validation/bench/doc_checks.py --sections "<every section heading key the lane changed, comma-separated>" — then corrects each hit or adds a reviewed row (check, exact hit text, written reason) to docs/validation/doc-checks-allow.tsv, re-runs until it exits 0, and records the counts (C1–C4, S1, S2: hits and unreviewed) in its output file.`

const INDEX_SCHEMA = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    items: { type: 'array', items: { type: 'object', properties: {
      id: { type: 'string' },
      kind: { type: 'string', enum: ['blocker', 'major', 'minor', 'coverage', 'amendment', 'manager-note', 'deferral'] },
      owner: { type: 'string', enum: AREA_KEYS },
      also: { type: 'array', items: { type: 'string', enum: AREA_KEYS } },
      duplicate_of: { type: 'string' },
    }, required: ['id', 'kind', 'owner', 'also', 'duplicate_of'] } },
  },
  required: ['file', 'items'],
}
const DRAFT_SCHEMA = {
  type: 'object',
  properties: {
    area: { type: 'string' }, file: { type: 'string' },
    items: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, disposition: { type: 'string', enum: ['FIX', 'INVALID', 'STAGED-BY-OWNER'] }, sections: { type: 'string' } }, required: ['id', 'disposition', 'sections'] } },
    cross_requests: { type: 'array', items: { type: 'object', properties: { to_area: { type: 'string', enum: AREA_KEYS }, section: { type: 'string' }, request: { type: 'string' } }, required: ['to_area', 'section', 'request'] } },
  },
  required: ['area', 'file', 'items', 'cross_requests'],
}
const INTEGRATE_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, changed_sections: { type: 'array', items: { type: 'string' } }, changed_areas: { type: 'array', items: { type: 'string', enum: AREA_KEYS } }, fixed: { type: 'number' }, invalid: { type: 'number' }, staged: { type: 'number' }, conflicts_resolved: { type: 'array', items: { type: 'string' } } }, required: ['file', 'changed_sections', 'changed_areas', 'fixed', 'invalid', 'staged', 'conflicts_resolved'] }
const CHECK_SCHEMA = {
  type: 'object',
  properties: {
    area: { type: 'string' }, file: { type: 'string' },
    unresolved: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, why: { type: 'string' }, required_change: { type: 'string' }, owner: { type: 'string', enum: AREA_KEYS } }, required: ['id', 'severity', 'why', 'required_change', 'owner'] } },
    new_findings: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, claim: { type: 'string' }, required_change: { type: 'string' }, owner: { type: 'string', enum: AREA_KEYS } }, required: ['id', 'severity', 'claim', 'required_change', 'owner'] } },
  },
  required: ['area', 'file', 'unresolved', 'new_findings'],
}

// ───────────────────────── Index ─────────────────────────
phase('Index')
const index = await opusSeat(`${GROUND}

LANE fixall/index. Build the MASTER LIST of every item this pass must fix, in ${DIR}/index.md (human-readable table) and ${DIR}/index.json (machine-readable: an array of objects with id, kind, owner, also, duplicate_of, source file and section, severity, one-line claim, the required change as stated by its source). Items: (1) every finding row of the seven red-team files (extract the tables with python — every id with its severity, claim and required change; the lenses cite each other by id, so keep one item per finding id); (2) every coverage-audit row whose status is PARTIAL, MISSING or PRECLUDED (ids COV-<slice>-<row number or row id>; rows marked COVERED or NOT-PRECLUDED are not items); (3) the seven numbered items of docs/AMENDMENTS-2026-09-25.md (ids AM-1 … AM-7); (4) the four numbered manager notes in docs/ARCHITECTURE-VALIDATION.md §0.M (ids MN-1 … MN-4); (5) every entry of the architecture's "Deferrals" section (ids DEF-1 …) — each must become a decision. KIND: blocker / major / minor for red-team rows, coverage, amendment, manager-note, deferral. OWNER: assign each item to exactly ONE area that owns the architecture sections the fix must change, using this section map: ${JSON.stringify(AREAS.map((a) => ({ area: a.key, sections: a.sections })))}; list other affected areas in also. DUPLICATES: where two items describe the same defect (the lenses flag several, e.g. LC-2 with FTG-1, MFP-3 with FTG-3), keep both ids but set duplicate_of on the secondary to the primary id and give both the same owner. Read only what you need to classify: the tables, plus a finding's full text where its owner is unclear. Also write a per-area count table and the total into index.md. Return every item in the structured output.`, 'fixall/index', 'Index', INDEX_SCHEMA)
if (!index || !index.items || !index.items.length) { log('index failed — nothing to fix'); return { error: 'index failed' } }
const byOwner = (items) => Object.fromEntries(AREA_KEYS.map((k) => [k, items.filter((i) => i.owner === k).map((i) => i.id)]))
const alsoFor = (items) => Object.fromEntries(AREA_KEYS.map((k) => [k, items.filter((i) => i.owner !== k && (i.also || []).includes(k)).map((i) => i.id)]))
log(`index: ${index.items.length} items — ${AREA_KEYS.map((k) => `${k} ${index.items.filter((i) => i.owner === k).length}`).join(', ')}`)

// ───────────────────────── Draft → Integrate → Verify → Validate, loop until dry ─────────────────────────
const draftPrompt = (a, round, owned, touching, openDetail) => `${GROUND}

LANE fixall/draft-${a.key}-r${round}. You are the FIX ARCHITECT for the ${a.key.toUpperCase()} area, round ${round}. Your area owns these architecture sections: ${a.sections}. Typical sources: ${a.sources}.
${round === 1 ? `Your items (you own them; the master list with claims and required changes is ${DIR}/index.md and index.json): ${JSON.stringify(owned)}. Items owned by other areas that also touch your sections (coordinate; the owner writes the fix, you may add a cross-area request): ${JSON.stringify(touching)}.` : `Round ${round}: these items are still OPEN after verification (unresolved fixes, new problems found by verifiers or the final validator) — each with why and the required change: ${JSON.stringify(openDetail)}. Read ${DIR}/r${round - 1}-verify-${a.key}.md and ${DIR}/r${round - 1}-validate.md if present.`}
Read completely: docs/ARCHITECTURE.md (the current integrated text), the source files for your items (red-team lens files, coverage audits, amendments, manager notes), docs/ARCHITECTURE-VALIDATION.md, and the evidence a fix depends on (findings, capture READMEs — numbers only, never reference content).
For EVERY item decide FIX, INVALID (with checkable evidence that the finding's premise is false) or STAGED-BY-OWNER (only for subject matter the owner's roadmap assigns to a later stage, and only with the concrete hooks written into the architecture now). NO DEFERRALS of any kind.
Write ${DIR}/r${round}-${a.key}.md with: (1) a disposition table (item id, disposition, sections changed, one line on the mechanism); (2) for each change, a block starting with a line "=== REPLACE <section number and exact heading> ===" (or "=== INSERT AFTER <section number and exact heading> ===") followed by the COMPLETE new text of that subsection — targeted at subsection granularity, written in the architecture's voice, coherent with the rest, with mechanisms not assertions, interfaces as code blocks where the architecture uses them, and each new choice recorded as "chose X over Y because Z"; (3) CROSS-AREA REQUESTS: changes needed in sections other areas own (the integrator applies them). Do NOT edit docs/ARCHITECTURE.md yourself — the integrator applies every area's blocks in one coherent pass.`

const integratePrompt = (round, drafts) => `${GROUND}

LANE fixall/integrate-r${round}. You are the INTEGRATING ARCHITECT, round ${round}. The area drafts are ${DIR}/r${round}-{${drafts.map((d) => d.area).join(',')}}.md (summaries: ${JSON.stringify(drafts.map((d) => ({ area: d.area, items: d.items.length, cross_requests: d.cross_requests.length })))}).
Work area by area (read one draft, apply it, save, log progress in ${DIR}/r${round}-integration-log.md, then the next — so an interruption loses nothing): apply every REPLACE/INSERT block to docs/ARCHITECTURE.md in place; apply every cross-area request; resolve conflicts between areas coherently (record each resolution in the log and as a judgment call); keep section numbering and every cross-reference valid; keep the one-page plain-language summary at the top true to the revised design; convert the former "Deferrals" section into "Staged by the owner's roadmap" listing ONLY roadmap-staged subjects with the section that carries their hooks — every other former deferral must now be a decision in the body. Then update docs/ARCHITECTURE-VALIDATION.md: append a round-${round} disposition table covering EVERY item id handled this round (id, source, severity or kind, disposition FIXED / INVALID / STAGED-BY-OWNER, where in ARCHITECTURE.md, one-line reason) and a round-${round} changelog. Your output file is ${DIR}/r${round}-integration-log.md (list of changed sections, conflicts resolved, counts).`

const verifyPrompt = (a, round, ids) => `${GROUND}

LANE fixall/verify-${a.key}-r${round}. You are the VERIFIER for the ${a.key.toUpperCase()} area after integration round ${round}. Your area's sections: ${a.sections}. Items to check this round: ${JSON.stringify(ids)} (details in ${DIR}/index.json, the round-${round} disposition table in docs/ARCHITECTURE-VALIDATION.md, and ${DIR}/r${round}-${a.key}.md if present).
Read docs/ARCHITECTURE.md completely (the integrated text) and the source of each item. For EACH item: FIXED is accepted only if the architecture text now contains a concrete mechanism that defeats the item's failure scenario (quote the sentence); an assertion, a promise, "TBD", "later", "at M0", "open" or any deferral wording counts as UNRESOLVED; INVALID is accepted only if its evidence really refutes the premise; STAGED-BY-OWNER is accepted only if the subject is on the owner's roadmap list and the hooks are concrete. Then hunt NEW problems the revision introduced in your sections (contradictions between fixes, broken cross-references, regressions of legibility, speed, determinism or editability). Also scan your sections for any remaining deferral language. Write ${DIR}/r${round}-verify-${a.key}.md (table: id, verdict ACCEPTED / UNRESOLVED, quoted evidence, required change) and return unresolved items and new findings, each with the owning area.`

const validatePrompt = (round) => `${GROUND}

LANE fixall/validate-r${round}. The verifiers report nothing open after round ${round}. You are the FINAL VALIDATOR. Read docs/ARCHITECTURE.md completely, docs/ARCHITECTURE-VALIDATION.md (all rounds), ${DIR}/index.md and every ${DIR}/r*-verify-*.md. Check what lens-by-lens verification cannot: whole-design coherence (fixes for different areas contradicting each other or duplicating mechanisms; stage contracts inconsistent across sections); that every item id in the master list has a final accepted disposition; that no deferral wording remains anywhere in the architecture; that the references' strengths (legibility, speed, charm, one-click simplicity) have not regressed; that the owner's rules in docs/OWNER-INSTRUCTIONS-2026-09-25.md are all honoured; that the first milestone can actually be built from the text. Write ${DIR}/r${round}-validate.md. If you find nothing open, ALSO write ${DIR}/SUMMARY.md for the owner in plain language: what the red team found, what was fixed and how (grouped by theme, not by id), what changed in the design, the final counts, and what the first milestone now builds. Return open items (unresolved or new), each with severity and owning area.`

let round = 1
let open = null
let lastOpen = []
while (round <= MAX_ROUNDS) {
  const openByArea = open ? Object.fromEntries(AREA_KEYS.map((k) => [k, open.filter((o) => o.owner === k)])) : null
  const areasNow = open ? AREAS.filter((a) => openByArea[a.key].length) : AREAS
  const owned = byOwner(index.items)
  const touching = alsoFor(index.items)

  phase('Draft')
  const drafts = (await parallel(areasNow.map((a) => () => fableSeat(draftPrompt(a, round, owned[a.key], touching[a.key], openByArea ? openByArea[a.key] : null), `fixall/draft-${a.key}-r${round}`, 'Draft', DRAFT_SCHEMA)))).filter(Boolean)
  const counts = drafts.reduce((c, d) => { d.items.forEach((i) => { c[i.disposition] = (c[i.disposition] || 0) + 1 }); return c }, {})
  log(`round ${round} drafts: ${drafts.length}/${areasNow.length} areas; dispositions ${JSON.stringify(counts)}`)
  if (!drafts.length) { log(`round ${round}: no draft landed — stopping`); lastOpen = open || []; break }

  phase('Integrate')
  const integ = await fableSeat(integratePrompt(round, drafts), `fixall/integrate-r${round}`, 'Integrate', INTEGRATE_SCHEMA)
  if (!integ) { log(`round ${round}: integration failed — stopping; drafts are on disk`); lastOpen = open || []; break }
  log(`round ${round} integrated: fixed ${integ.fixed}, invalid ${integ.invalid}, staged ${integ.staged}; sections changed ${integ.changed_sections.length}`)

  phase('Verify')
  const verifyAreas = AREAS.filter((a) => areasNow.some((x) => x.key === a.key) || integ.changed_areas.includes(a.key))
  const checks = (await parallel(verifyAreas.map((a) => () => {
    const ids = round === 1 ? owned[a.key] : [...(openByArea[a.key] || []).map((o) => o.id), ...(integ.changed_areas.includes(a.key) ? ['(re-check every earlier FIXED item whose sections changed this round)'] : [])]
    return opusSeat(verifyPrompt(a, round, ids), `fixall/verify-${a.key}-r${round}`, 'Verify', CHECK_SCHEMA)
  }))).filter(Boolean)
  open = checks.flatMap((c) => [
    ...c.unresolved.map((u) => ({ id: u.id, severity: u.severity, why: u.why, required_change: u.required_change, owner: u.owner || c.area })),
    ...c.new_findings.map((n) => ({ id: n.id, severity: n.severity, why: n.claim, required_change: n.required_change, owner: n.owner || c.area })),
  ])
  log(`round ${round} verified: ${open.length} open (${open.filter((o) => o.severity === 'blocker').length} blocker, ${open.filter((o) => o.severity === 'major').length} major, ${open.filter((o) => o.severity === 'minor').length} minor)`)

  if (!open.length) {
    phase('Validate')
    const fin = await fableSeat(validatePrompt(round), `fixall/validate-r${round}`, 'Validate', CHECK_SCHEMA)
    open = fin ? [...fin.unresolved.map((u) => ({ id: u.id, severity: u.severity, why: u.why, required_change: u.required_change, owner: u.owner })), ...fin.new_findings.map((n) => ({ id: n.id, severity: n.severity, why: n.claim, required_change: n.required_change, owner: n.owner }))] : []
    log(`round ${round} final validation: ${open.length} open`)
    if (!open.length) { lastOpen = []; break }
  }
  lastOpen = open
  round++
}
if (lastOpen.length) log(`STOPPED after ${Math.min(round, MAX_ROUNDS)} rounds with ${lastOpen.length} items still open — listed in the return value; run again with resumeFromRunId to continue`)

return { items: index.items.length, rounds: Math.min(round, MAX_ROUNDS), still_open: lastOpen }
