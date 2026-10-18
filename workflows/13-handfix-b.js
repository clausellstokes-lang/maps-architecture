export const meta = {
  name: 'handfix-b',
  description: 'Apply the 31 closing fixes of the amendments-b pass (docs/validation/amendments-b/closing-report.md §2: exact old/new texts, 2 major and 29 minor) to docs/ARCHITECTURE.md and the rationale file by script, verify per owning part, repair by blocks (at most two rounds), close with the queue rows and an owner note; Fable-role seats as marked Opus stand-ins; max four lanes',
  phases: [
    { title: 'Apply', detail: 'Opus: archive, one script applying the 31 fixes in the closing order, references, document checks' },
    { title: 'Verify', detail: 'Opus: per owning part, every fix present as required, no new problem in the touched subsections' },
    { title: 'Repair', detail: 'Opus stand-ins for Fable: blocks for anything left; scripted assembly; re-verify (at most two rounds)' },
    { title: 'Close', detail: 'Opus stand-in for Fable: confirm, queue rows, owner note' },
  ],
}

const ROOT = '/Users/cstokes/Desktop/Maps'
const ARGS = (typeof args === 'object' && args) ? args : {}
const FABLE_MODEL = ARGS.fableModel || 'opus'
const OPUS_MODEL = ARGS.opusModel || 'opus'
const STANDIN = FABLE_MODEL !== 'fable'
const MAX_LANES = ARGS.maxLanes || 4
const MAX_REPAIR = ARGS.maxRepairRounds || 2
const DIR = 'docs/validation/amendments-b/handfix'
const SRC = 'docs/validation/amendments-b/closing-report.md'
const SCRATCH = '/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad'
const PARTS = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope']

let liveLanes = 0
const laneQueue = []
const acquireLane = () => new Promise((resolve) => { if (liveLanes < MAX_LANES) { liveLanes++; resolve() } else laneQueue.push(resolve) })
const releaseLane = () => { const next = laneQueue.shift(); if (next) next(); else liveLanes-- }
const limited = async (fn) => { await acquireLane(); try { return await fn() } finally { releaseLane() } }
const standInNote = (label) => `

STAND-IN NOTICE: you run on ${FABLE_MODEL} standing in for the Fable seat ${label} (Fable's weekly limit is exhausted; owner, 2026-09-27: "continue all work with opus until we have fable available … and mark for fable retrovalidation"). Do the full job to Fable's standard. Put under the title of every report file you write (never inside block files): > PENDING FABLE REVIEW — written by ${FABLE_MODEL} standing in for the Fable seat ${label}; queued in docs/FABLE-REVIEW-QUEUE.md. When done, APPEND one row to the table at the end of docs/FABLE-REVIEW-QUEUE.md: | A-${label} | A | what you produced | your files | ${FABLE_MODEL} stand-in | today's date | PENDING | what Fable should re-check first |, unless a row with that id exists.`
const opusNote = (label) => `

FABLE-UNAVAILABLE NOTICE: Opus-role work no Fable seat has checked. Put under your report file's title: > PENDING FABLE REVIEW — Opus-produced (${label}). When done, APPEND one row to the table at the end of docs/FABLE-REVIEW-QUEUE.md: | B-${label} | B | what you produced | your files | ${OPUS_MODEL} | today's date | PENDING | what to re-check |, unless a row with that id exists.`
const fableSeat = (prompt, label, phaseName, schema) => limited(() => agent(STANDIN ? prompt + standInNote(label) : prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: FABLE_MODEL }))
const opusSeat = (prompt, label, phaseName, schema) => limited(() => agent(prompt + opusNote(label), { label, phase: phaseName, schema, agentType: 'general-purpose', model: OPUS_MODEL }))

const GROUND = `
PROJECT (root ${ROOT}; paths relative to it). docs/ARCHITECTURE.md is the design of PLAT, an original settlement map generator; docs/ARCHITECTURE-RATIONALE.md holds its judgment calls (Part A) and history. The amendments-b pass (the owner's items 8–31 of docs/AMENDMENTS-2026-09-25b.md, with 28 (f)) has closed: its closing seat confirmed the validator's 53 issues fixed and left a HAND-FIX LIST of 31 issues (2 major, 29 minor) in ${SRC} §2, in apply order — each with its claim, its owner part and ONE required change whose old strings are quoted exactly and occur once in their file (the closing seat checked 63 anchors by script); §3 holds the closing rulings behind the reconciled texts. This pass applies that list, verifies it and closes it. The owner's NO-DEFER rule holds: every issue is fixed or ruled invalid with evidence; nothing is left open. The owner's rules outrank every wording (docs/OWNER-INSTRUCTIONS-2026-09-25.md, docs/AMENDMENTS-2026-09-25b.md); the dossier is the authority (item 20).
BLOCK PROTOCOL (repair rounds only): repairers never edit the design files; they write block files — "=== REPLACE <exact heading line> ===" + the complete new subsection; "=== INSERT AFTER <exact heading line> ==="; "=== APPEND TO SECTION <exact heading line> ==="; "=== J-ROWS ===" rows for the "# Judgment calls" index; "=== RATIONALE-A ===" entries for Part A; "=== END ===" after each complete block — applied by docs/validation/amendments-b/apply-blocks.py.
WORKING RULES: write files incrementally with a PROGRESS ledger at the top; RESUME RULE: if your output file exists AND docs/lane-events.log has "<your lane key> LANDED", return the structured summary from the file and touch nothing else; CONTINUE RULE: otherwise continue from the first unfinished item. Redirect long output to files under ${SCRATCH}/handfix/ and grep them. DOCUMENT CHECKS: run python3 docs/validation/bench/doc_checks.py --sections "<changed top-level keys>" with the three-copy method (untouched / yours / combined against one corpus snapshot; the corpus under captures/ may change while you run — review only the hits your change adds). When complete: echo "$(date '+%Y-%m-%d %H:%M') <lane key> LANDED <files>" >> ${ROOT}/docs/lane-events.log  Then return only the structured summary.`

const APPLY_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, applied: { type: 'number' }, failed: { type: 'array', items: { type: 'object', properties: { n: { type: 'number' }, id: { type: 'string' }, why: { type: 'string' } }, required: ['n', 'id', 'why'] } }, parts_touched: { type: 'array', items: { type: 'string' } }, broken_references: { type: 'number' }, doc_check_new_hits: { type: 'number' } }, required: ['file', 'applied', 'failed', 'parts_touched', 'broken_references', 'doc_check_new_hits'] }
const CHECK_SCHEMA = { type: 'object', properties: { part: { type: 'string' }, file: { type: 'string' }, issues: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, kind: { type: 'string' }, claim: { type: 'string' }, required_change: { type: 'string' }, owner: { type: 'string', enum: PARTS } }, required: ['id', 'severity', 'kind', 'claim', 'required_change', 'owner'] } } }, required: ['part', 'file', 'issues'] }
const REPAIR_SCHEMA = { type: 'object', properties: { part: { type: 'string' }, file: { type: 'string' }, blocks: { type: 'number' } }, required: ['part', 'file', 'blocks'] }

phase('Apply')
const applied = await opusSeat(`${GROUND}

LANE handfix-b/apply. A mechanical seat. RESUME CHECK FIRST (see WORKING RULES) — if this lane has LANDED, return the summary and touch nothing. Otherwise: (1) archive docs/ARCHITECTURE.md to docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md and the rationale file to docs/archive/ARCHITECTURE-RATIONALE-pre-handfix-b-2026-09-27.md (only if those archive files do not exist; then chmod a-w them; record sha256). (2) Read ${SRC} §2 and §3 completely. Encode EVERY one of the 31 required changes, in the listed apply order, as data in ${DIR}/handfix.py — each sub-change a (file, kind, anchor, text) row: replace the exact old string, insert after an exact anchor, append a J-ROWS row to the "# Judgment calls" index table, or append an entry to the end of Part A of the rationale file (before "## Part B") — asserting that each anchor occurs exactly once before any write; apply them all in one run and write the two files once. If an anchor is missing or ambiguous, do NOT guess: skip that sub-change, record it, and continue with the rest. (3) Run the reference resolver (docs/validation/consistency/assemble-r0-refs.py or its logic) and list broken references; fix only mechanical ones. (4) Document checks over the changed top-level keys. (5) Write ${DIR}/apply.md: a table of the 31 (n, id, owner part, applied / skipped and why, sections changed), the archive hashes, the before/after sizes, the references and document-check results. Return the parts actually touched (their keys: ${PARTS.join(', ')}).`, 'handfix-b/apply', 'Apply', APPLY_SCHEMA)
if (!applied) { log('apply failed — nothing further; the design files are either untouched or archived'); return { error: 'apply failed' } }
log(`applied ${applied.applied}/31; skipped ${applied.failed.length}; parts ${applied.parts_touched.join(', ')}; broken refs ${applied.broken_references}; new doc-check hits ${applied.doc_check_new_hits}`)

const verifyPrompt = (p, round) => `${GROUND}

LANE handfix-b/verify-${p}-r${round}. You VERIFY the ${p.toUpperCase()} part's fixes. Read ${SRC} §2 (every issue whose owner is ${p}, and every issue whose required change edits a section of this part), ${SRC} §3, ${DIR}/apply.md${round > 0 ? ` and ${DIR}/repair-r${round}-*.md with ${DIR}/assemble-r${round}.md` : ''}, the archived text docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md for the before, and the current text of every subsection those fixes touched, whole, with the subsections that cite it. For each fix: PRESENT exactly as required (quote it), PARTIAL, MISSING or MISAPPLIED (applied at the wrong place or twice); then: no other text in the touched subsections changed; single source kept (no second statement of a fact); no broken reference; no deferral wording; no NEW contradiction with an owner rule (in particular: a dossier element or a dossier-roster household is never removed by an epoch, an edit or a solver rung — item 20). Write ${DIR}/verify-${p}-r${round}.md and return every issue with its owning part and an exact required change (old text quoted once, new text in full).`
const repairPrompt = (p, round, issues) => `${GROUND}

LANE handfix-b/repair-${p}-r${round}. Fix these issues in the ${p.toUpperCase()} part: ${JSON.stringify(issues)}. Read the issue sources (${DIR}/verify-*-r${round - 1}.md), ${SRC} §3's rulings, and the current text of every subsection concerned (whole). Write ${DIR}/repair-r${round}-${p}.md containing only blocks per the BLOCK PROTOCOL (the smallest subsections that fix each issue; J-ROWS and RATIONALE-A for any new ruling). Do not edit the design files yourself. CONTINUATION OF A STAND-IN: if the block file and its report ${DIR}/repair-${p}-r${round}-report.md already exist and the report carries a PENDING FABLE REVIEW line (an Opus stand-in began this seat before the session ended), you are the Fable seat that finishes it: first read every block in the file against the issues and the live text and correct any block that is wrong or incomplete (regenerate it whole; never patch the design files); then complete the report's unfinished PROGRESS items (simulated assembly on copies, probes, references, document checks); append to the report a section "## Fable continuation (today's date)" stating what you re-checked and changed; leave the report's PENDING line in place; make sure the queue row the ledger planned (A-handfix-b/repair-${p}-r${round}) exists in docs/FABLE-REVIEW-QUEUE.md, appending it with produced-by "opus stand-in, finished by fable" if it does not; then write the LANDED line.`
const assemblePrompt = (round) => `${GROUND}

LANE handfix-b/assemble-r${round}. RESUME CHECK FIRST — if "handfix-b/assemble-r${round} LANDED" is in docs/lane-events.log, return ${DIR}/assemble-r${round}.md's summary and touch nothing. Otherwise apply every block of ${DIR}/repair-r${round}-*.md with docs/validation/amendments-b/apply-blocks.py (files in name order; a truncated last block — not closed by "=== END ===" — is skipped and reported), run the reference resolver and the document checks, and write ${DIR}/assemble-r${round}.md (blocks applied and skipped, sections changed, sizes, references, doc checks).`
const ASSEMBLE_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, applied: { type: 'number' }, skipped: { type: 'number' }, notes: { type: 'array', items: { type: 'string' } } }, required: ['file', 'applied', 'skipped', 'notes'] }

let parts = PARTS.filter((p) => applied.parts_touched.includes(p))
if (!parts.length) parts = ['determinism', 'scope', 'model', 'pipeline', 'kernel']
let round = 0
let issues = []
while (true) {
  phase('Verify')
  const checks = (await parallel(parts.map((p) => () => opusSeat(verifyPrompt(p, round), `handfix-b/verify-${p}-r${round}`, 'Verify', CHECK_SCHEMA)))).filter(Boolean)
  issues = checks.flatMap((c) => c.issues.map((i) => ({ ...i, reported_by: c.part })))
  log(`verify round ${round}: ${issues.length} issues (${['blocker', 'major', 'minor'].map((s) => `${issues.filter((i) => i.severity === s).length} ${s}`).join(', ')})`)
  if (!issues.length || round >= MAX_REPAIR) break
  round++
  phase('Repair')
  const byPart = PARTS.filter((p) => issues.some((i) => i.owner === p))
  await parallel(byPart.map((p) => () => fableSeat(repairPrompt(p, round, issues.filter((i) => i.owner === p)), `handfix-b/repair-${p}-r${round}`, 'Repair', REPAIR_SCHEMA)))
  await opusSeat(assemblePrompt(round), `handfix-b/assemble-r${round}`, 'Repair', ASSEMBLE_SCHEMA)
  parts = byPart
}

phase('Close')
const close = await fableSeat(`${GROUND}

LANE handfix-b/close. You CLOSE the hand-fix (the Fable seat's role). Read ${DIR}/apply.md, every ${DIR}/verify-*.md, every repair and assemble file, and ${SRC}. Issues still open after the last verification: ${JSON.stringify(issues)} — for each, apply its required change yourself by an exact single-occurrence substitution script (anchors asserted), re-check it on the text, and record it; nothing is left open (the owner's no-defer rule); if one cannot be applied, rule it and say why in plain words. Then: (1) append to docs/ARCHITECTURE-VALIDATION.md's §Ab section the hand-fix rows (issue id, sections changed); (2) append to docs/validation/amendments-b/SUMMARY.md a short "Hand-fix (2026-09-27)" section for the owner in plain language: what the 31 fixes were about (the two major ones: a household of the dossier's population is never taken off the map — its housing is re-provided in its district), and that the pass is closed; (3) write ${DIR}/close.md.`, 'handfix-b/close', 'Close', CHECK_SCHEMA)

return { applied: applied.applied, skipped: applied.failed, repair_rounds: round, remaining_after_verify: issues.length, close_remaining: close && close.issues }
