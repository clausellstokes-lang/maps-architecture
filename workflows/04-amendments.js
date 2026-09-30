export const meta = {
  name: 'apply-amendments',
  description: 'Fold the owner rules received after the review architects were queued (docs/AMENDMENTS-*.md) into docs/ARCHITECTURE.md coherently, then validate (Fable) and verify (Opus); max four lanes',
  phases: [
    { title: 'Amend', detail: 'Fable architect: apply every amendment in place, coherent with the architecture' },
    { title: 'Validate', detail: 'Fable validator: does each amendment really land as a mechanism; regressions' },
    { title: 'Verify', detail: 'Opus verifier: text-level check that every amendment item is present and consistent' },
    { title: 'Repair', detail: 'Fable: fix unresolved items (one round)' },
  ],
}

const ROOT = '/Users/cstokes/Desktop/Maps'
const AMEND = (typeof args === 'object' && args && args.amendmentsFile) || 'docs/AMENDMENTS-2026-09-25.md'
const ARGS = (typeof args === 'object' && args) ? args : {}
const STANDIN_MODEL = ARGS.fableModel && ARGS.fableModel !== 'fable' ? ARGS.fableModel : null
const OPUS_MODEL = ARGS.opusModel || 'opus'

const MAX_LANES = 4
let liveLanes = 0
const laneQueue = []
const acquireLane = () => new Promise((resolve) => { if (liveLanes < MAX_LANES) { liveLanes++; resolve() } else laneQueue.push(resolve) })
const releaseLane = () => { const next = laneQueue.shift(); if (next) next(); else liveLanes-- }
const limited = async (fn) => { await acquireLane(); try { return await fn() } finally { releaseLane() } }
const standInNote = (label) => `

STAND-IN NOTICE (owner, 2026-09-25: "run the rest on Opus 5.5, but mark everything that has not gone through the touch of Fable for review next time we have Fable"). You are running on ${STANDIN_MODEL} as a STAND-IN for the Fable seat ${label}. Do the full job to the standard the Fable seat would. MARKING RULES: (1) directly under the title of every output file you write, put the line: > PENDING FABLE REVIEW — written by ${STANDIN_MODEL} standing in for the Fable seat ${label} (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md. (2) If you change a file that a Fable seat wrote (for example docs/ARCHITECTURE.md), put the line > PENDING FABLE REVIEW — revised by ${STANDIN_MODEL} stand-in (${label}) directly under the heading of every section you changed. (3) When your work is complete, APPEND (never rewrite the file) one row to the table at the end of docs/FABLE-REVIEW-QUEUE.md: | A-${label} | A | what you produced | your output file(s) and changed sections | ${STANDIN_MODEL} stand-in | today's date | PENDING | the 1–3 judgments a Fable reviewer should re-check first |. If you resumed from disk under the RESUME RULE and produced or changed nothing, add no banner and no row.`
const fable = (prompt, label, phaseName, schema) => limited(() => agent(STANDIN_MODEL ? prompt + standInNote(label) : prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: STANDIN_MODEL || 'fable' }))
const opus = (prompt, label, phaseName, schema) => limited(() => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: OPUS_MODEL }))

const GROUND = `
PROJECT (root ${ROOT}; paths relative to it). A validated architecture for a settlement map generator exists in docs/ARCHITECTURE.md (with docs/ARCHITECTURE-VALIDATION.md, docs/design/*, docs/validation/*). After its architects were queued, the owner gave further rules, listed with dates in ${AMEND}. Standing rulings: COMPLETELY STANDALONE (read nothing outside ${ROOT}); CLEAN-ROOM (learn ideas, copy no code, reuse no reference data assets); the owner has deferred ALL judgment to this program — decide, state the choice as final, explain in plain language a non-programmer can follow; write to disk as you go; when your file is complete append a line to docs/lane-events.log with: echo "$(date '+%Y-%m-%d %H:%M') <lane key> LANDED <file>" >> ${ROOT}/docs/lane-events.log
RESUME RULE: if your output file already exists AND docs/lane-events.log has a LANDED line for your lane key, do not redo the work — read the file and return the structured summary. CONTINUE RULE: write your file's skeleton in your first minute and each section as you finish it; if your file exists WITHOUT a LANDED line it is a checkpoint from an interrupted seat — keep what is complete and continue from the first unfinished section; if told to checkpoint, append 'CHECKPOINT <time> — incomplete' with done/remaining sections, then carry on.
DOCUMENT CHECKS (docs/ARCHITECTURE.md §17.1 (2), binding until M-1; VS2-8): every lane that writes docs/ARCHITECTURE.md runs, before its change lands, from ${ROOT}: python3 docs/validation/bench/doc_checks.py --sections "<every section heading key the lane changed, comma-separated>" — then corrects each hit or adds a reviewed row (check, exact hit text, written reason) to docs/validation/doc-checks-allow.tsv, re-runs until it exits 0, and records the counts (C1–C4, S1, S2: hits and unreviewed) in its output file.`

const FILE_SCHEMA = { type: 'object', properties: { key: { type: 'string' }, file: { type: 'string' }, headline: { type: 'string' }, items: { type: 'array', items: { type: 'string' } } }, required: ['key', 'file', 'headline', 'items'] }
const CHECK_SCHEMA = { type: 'object', properties: { key: { type: 'string' }, file: { type: 'string' }, unresolved: { type: 'array', items: { type: 'object', properties: { amendment: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, why: { type: 'string' }, required_change: { type: 'string' } }, required: ['amendment', 'severity', 'why', 'required_change'] } } }, required: ['key', 'file', 'unresolved'] }

phase('Amend')
const amended = await fable(`${GROUND}

LANE amendments/apply. You are the chief architect. Read completely: ${AMEND}, docs/ARCHITECTURE.md, docs/ARCHITECTURE-VALIDATION.md, docs/IMPROVEMENTS.md, docs/DEFINITION.md, and the plot-model addenda in docs/improvements/*.md. For EVERY numbered amendment: edit docs/ARCHITECTURE.md IN PLACE so the rule becomes a mechanism where it belongs (domain model, pipeline stage, rule tables, rendering, export, build plan, parity/improvement matrices) — coherent with the rest, never a bolt-on appendix; where an amendment conflicts with an existing decision, decide, and record the choice in the "Judgment calls" section in the form "chose X over Y because Z". Keep a changelog section "Amendments applied (date)" listing, per amendment, the sections changed. Then append to docs/ARCHITECTURE-VALIDATION.md a table "Amendment dispositions" (amendment, sections changed, new risks, what the red team should re-check). Write docs/validation/amendments-applied.md as your report (per amendment: where it landed, in plain language).`, 'amend:apply', 'Amend', FILE_SCHEMA)

phase('Validate')
const [val, ver] = await parallel([
  () => fable(`${GROUND}

LANE amendments/validate. You are the validator. Read ${AMEND}, docs/validation/amendments-applied.md and the REVISED docs/ARCHITECTURE.md completely. For each amendment: is it a real mechanism in the architecture (data model fields, stage, rule table, interface), not an assertion? Does it contradict another part of the design or regress a reference strength (legibility, speed, charm, one-click)? Does the plot model + prosperity field + granularity + greenery form ONE rule family reading one context vector? Are the size ladders reflected in budgets and classes? Is editability first-class everywhere? Write docs/validation/amendments-validate.md with a table of unresolved items (blocker/major/minor) and concrete required changes.`, 'amend:validate', 'Validate', CHECK_SCHEMA),
  () => opus(`${GROUND}

LANE amendments/verify. You are the verifier. Read ${AMEND} and the REVISED docs/ARCHITECTURE.md completely. For each numbered amendment, quote the exact section(s) that implement it and check the text is internally consistent (terms used the same way in the domain model, pipeline, rendering and export sections; no stale sentences that still describe lots as buildings, binary wealth, or fixed sizes). Write docs/validation/amendments-verify.md with a per-amendment PRESENT / PARTIAL / MISSING table and the stale sentences found (with their section).`, 'amend:verify', 'Verify', CHECK_SCHEMA),
])
const open = [...((val && val.unresolved) || []), ...((ver && ver.unresolved) || [])].filter((u) => u.severity !== 'minor')
log(`amendments: ${open.length} blocker/major items open after validation`)

if (open.length) {
  phase('Repair')
  await fable(`${GROUND}

LANE amendments/repair. Read docs/validation/amendments-validate.md, docs/validation/amendments-verify.md and docs/ARCHITECTURE.md completely. Fix every blocker/major item in place: ${JSON.stringify(open.map((u) => ({ amendment: u.amendment, change: u.required_change })))}. Update the "Amendments applied" changelog and the dispositions table in docs/ARCHITECTURE-VALIDATION.md. Write docs/validation/amendments-repair.md listing what changed.`, 'amend:repair', 'Repair', FILE_SCHEMA)
}

return { amended: amended && amended.headline, open_after_validation: open }
