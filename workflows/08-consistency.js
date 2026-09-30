export const meta = {
  name: 'consistency-and-compression',
  description: 'After the fix-all loop (20 minor items left, document 1.4 MB): inventory every normative fact, give each one canonical home, rewrite the six parts so each fact is stated once and referenced elsewhere, fix the remaining items, move rationale out, reassemble by script, verify nothing was lost, final validation and owner summary; Fable-role seats as marked Opus stand-ins; max four lanes',
  phases: [
    { title: 'Inventory', detail: 'Six Opus surveyors: every rule, mechanism, interface, number, test and decision per part' },
    { title: 'Canon', detail: 'Opus: merge inventories, one canonical home per fact, list every conflicting statement' },
    { title: 'Rewrite', detail: 'Six editors (Fable role): state each fact once, reference elsewhere, fix open items, compress' },
    { title: 'Assemble', detail: 'Opus: rebuild ARCHITECTURE.md by script, resolve references, document checks' },
    { title: 'Verify', detail: 'Six Opus verifiers: no fact lost or changed, open items fixed, parts agree' },
    { title: 'Repair', detail: 'Targeted fixes (Fable role) applied by script; re-verify (max two rounds)' },
    { title: 'Validate', detail: 'Final validator (Fable role): whole-document coherence and the owner summary' },
  ],
}

const ROOT = '/Users/cstokes/Desktop/Maps'
const DIR = 'docs/validation/consistency'
const ARGS = (typeof args === 'object' && args) ? args : {}
const FABLE_ROLE_MODEL = ARGS.fableModel || 'opus'
const OPUS_MODEL = ARGS.opusModel || 'opus'
const STANDIN = FABLE_ROLE_MODEL !== 'fable'
const MAX_LANES = ARGS.maxLanes || 4
const MAX_REPAIR = ARGS.maxRepairRounds || 2
// open items: args.openIds = { part: [ids] } — the full items (why, required change, source) are read by the seats from docs/validation/fix-all/still-open-r5.json
const OPEN_IDS = (ARGS.openIds && typeof ARGS.openIds === 'object') ? ARGS.openIds : {}
const OPEN = Object.entries(OPEN_IDS).flatMap(([owner, ids]) => ids.map((id) => ({ id, owner })))

let liveLanes = 0
const laneQueue = []
const acquireLane = () => new Promise((resolve) => { if (liveLanes < MAX_LANES) { liveLanes++; resolve() } else laneQueue.push(resolve) })
const releaseLane = () => { const next = laneQueue.shift(); if (next) next(); else liveLanes-- }
const limited = async (fn) => { await acquireLane(); try { return await fn() } finally { releaseLane() } }
const standInNote = (label) => `

STAND-IN NOTICE: you run on ${FABLE_ROLE_MODEL} standing in for the Fable seat ${label} (Fable is unavailable; owner: "mark everything that has not gone through the touch of Fable for review next time we have Fable"). Do the full job to Fable's standard. Put under the title of every report, log or rationale file you write (NOT inside the section files under ${DIR}/new/ and NOT inside repair blocks — those become docs/ARCHITECTURE.md text, which carries one document-wide banner instead): > PENDING FABLE REVIEW — written by ${FABLE_ROLE_MODEL} standing in for the Fable seat ${label}; queued in docs/FABLE-REVIEW-QUEUE.md. When done, APPEND one row to the table at the end of docs/FABLE-REVIEW-QUEUE.md: | A-${label} | A | what you produced | your files | ${FABLE_ROLE_MODEL} stand-in | today's date | PENDING | what Fable should re-check first |. Add nothing if you resumed from disk.`
const opusNote = (label) => `

FABLE-UNAVAILABLE NOTICE: Opus-role work no Fable seat has checked. Put under your file's title: > PENDING FABLE REVIEW — Opus-produced (${label}). When done, APPEND one row to the table at the end of docs/FABLE-REVIEW-QUEUE.md: | B-${label} | B | what you produced | your files | ${OPUS_MODEL} | today's date | PENDING | what to re-check |.`
const fableSeat = (prompt, label, phaseName, schema) => limited(() => agent(STANDIN ? prompt + standInNote(label) : prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: FABLE_ROLE_MODEL }))
// Fable became available again on 2026-09-26 ~14:45 EDT, after the six rewrites had landed as Opus stand-ins and before any
// verify/repair/validate seat had completed: the seats still to run in the Fable role take args.lateFableModel (default:
// fableModel); the completed rewrite seats keep their cached (prompt, opts) untouched.
const LATE_FABLE_MODEL = ARGS.lateFableModel || FABLE_ROLE_MODEL
const LATE_STANDIN = LATE_FABLE_MODEL !== 'fable'
const lateFableSeat = (prompt, label, phaseName, schema) => limited(() => agent(LATE_STANDIN ? prompt + standInNote(label) : prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: LATE_FABLE_MODEL }))
const REPAIR_SCHEMA = { type: 'object', properties: { part: { type: 'string' }, file: { type: 'string' }, blocks: { type: 'number' } }, required: ['part', 'file', 'blocks'] }
const opusSeat = (prompt, label, phaseName, schema) => limited(() => agent(prompt + opusNote(label), { label, phase: phaseName, schema, agentType: 'general-purpose', model: OPUS_MODEL }))

// The six parts, by top-level heading prefix (every heading of docs/ARCHITECTURE.md belongs to exactly one part).
const PARTS = [
  { key: 'model', heads: ['## §2 '], fixOwners: [], note: '§2 domain model and schemas (the storage parts are used by the kernel part; the document and snapshot parts by the determinism part — you own the TEXT of §2, they own the mechanisms)' },
  { key: 'kernel', heads: ['## §3 '], fixOwners: ['kernel'], note: '§3 geometry kernel' },
  { key: 'pipeline', heads: ['## §4 ', '## §10 ', '# PART II', '## II.', '# PART III'], fixOwners: ['pipeline'], note: '§4 generation pipeline, §10 simulation and content, PART II (stage 2) and PART III (village readiness)' },
  { key: 'determinism', heads: ['## §5 ', '## §6 ', '## §7 '], fixOwners: ['determinism'], note: '§5 failure handling, §6 determinism, §7 editing and regeneration locality' },
  { key: 'rendering', heads: ['## §8 ', '## §9 ', '## §11 ', '## §12 '], fixOwners: ['rendering'], note: '§8 rendering and styles, §9 labels, §11 export and interop, §12 performance budgets' },
  { key: 'scope', heads: ['# ARCHITECTURE', '## The whole design', '## §0 ', '# PART I — ', '## §1 ', '## §13 ', '## §14 ', '## §15 ', '## §16 ', '## §17 ', '# Delegated decisions', '# Judgment calls', '# Staged by', '# Appendix A'], fixOwners: ['scope'], note: 'the title and one-page summary, §0 provenance, §1 scope and fusion thesis, §13 testing, §14 modules and interfaces, §15 matrices, §16 build plan, §17 clean-room and licences, Delegated decisions, Judgment calls, Staged by the roadmap, Appendix A' },
]
const openFor = (p) => OPEN.filter((o) => p.fixOwners.includes(o.owner))

const GROUND = `
PROJECT (root ${ROOT}; paths relative to it). docs/ARCHITECTURE.md is the design of PLAT, an original settlement map generator (the base: an MFCG/FTG-fused town/city generator; PART II neighbourhoods; PART III village readiness). Five fix rounds (docs/validation/fix-all/, docs/ARCHITECTURE-VALIDATION.md) resolved every blocker and major finding, but each rewrite grew the document (≈ 2 200 → 11 477 lines, 1.4 MB) and seeded small contradictions because the same fact is written in several places. This pass removes that cause. It is a CONSISTENCY-AND-COMPRESSION pass, not a redesign: it must not add, drop or change any design decision, mechanism, interface, number, budget, rule or test — except to fix the ${OPEN.length} remaining minor items listed in docs/validation/fix-all/still-open-r5.json and to reconcile statements that disagree (the canonical home wins).
PRINCIPLES: (1) SINGLE SOURCE — every normative fact has exactly one canonical home (the section that owns its subject); everywhere else it is referenced ("see §x.y"), never restated; (2) NOTHING LOST — every item in the inventory survives with the same meaning, and a mapping table records where it now lives; (3) PLAIN AND SHORT — prose compressed, history and "round N" narration removed from the normative text (the validation record keeps the history), executed-evidence citations kept as short pointers, the decision rationale ("Judgment calls") moved to docs/ARCHITECTURE-RATIONALE.md with a compact index left behind; target: the normative document at most about 55–65 % of its current size; (4) the standing rules hold — the owner's no-defer rule (no "TBD", "later", "open"), emulation-first defaults (MFCG/FTG behaviour as defaults), clean-room (no reference code, grammars, palettes, wordlists or content tables; nothing from any other project on this machine; nothing from partitioned/), and the owner's rules in docs/OWNER-INSTRUCTIONS-2026-09-25.md; (5) the review markers: the 133 per-section "> PENDING FABLE REVIEW" lines are replaced by ONE banner under the document title stating that the whole normative text was consolidated by Opus stand-ins and is pending Fable review (the queue keeps the rows).
WORKING RULES: write your files incrementally (skeleton first); if your output file exists AND docs/lane-events.log has a LANDED line for your lane key, return the structured summary from it without redoing the work; if it exists without one, continue from the first unfinished part. Redirect long tool output to files under /private/tmp/claude-502/-Users-cstokes-Desktop-Maps/3fbc58a0-613c-43b5-9c94-a4f47a8689a6/scratchpad/ and grep them; never print whole JSON files. Only the Assemble seat writes docs/ARCHITECTURE.md. When your files are complete append: echo "$(date '+%Y-%m-%d %H:%M') <lane key> LANDED <file>" >> ${ROOT}/docs/lane-events.log  Then return only the structured summary.`

const INV_SCHEMA = { type: 'object', properties: { part: { type: 'string' }, file: { type: 'string' }, facts: { type: 'number' }, restatements_of_other_parts: { type: 'number' }, internal_conflicts: { type: 'number' } }, required: ['part', 'file', 'facts', 'restatements_of_other_parts', 'internal_conflicts'] }
const CANON_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, facts: { type: 'number' }, multi_stated: { type: 'number' }, conflicts: { type: 'number' } }, required: ['file', 'facts', 'multi_stated', 'conflicts'] }
const REWRITE_SCHEMA = { type: 'object', properties: { part: { type: 'string' }, dir: { type: 'string' }, old_kb: { type: 'number' }, new_kb: { type: 'number' }, facts_mapped: { type: 'number' }, facts_unmapped: { type: 'number' }, open_fixed: { type: 'array', items: { type: 'string' } }, cross_notes: { type: 'array', items: { type: 'string' } } }, required: ['part', 'dir', 'old_kb', 'new_kb', 'facts_mapped', 'facts_unmapped', 'open_fixed', 'cross_notes'] }
const ASSEMBLE_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, old_kb: { type: 'number' }, new_kb: { type: 'number' }, broken_references: { type: 'number' }, doc_check_hits: { type: 'number' }, notes: { type: 'array', items: { type: 'string' } } }, required: ['file', 'old_kb', 'new_kb', 'broken_references', 'doc_check_hits', 'notes'] }
const CHECK_SCHEMA = { type: 'object', properties: { part: { type: 'string' }, file: { type: 'string' }, issues: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, kind: { type: 'string', enum: ['lost', 'changed', 'unfixed', 'conflict', 'broken-reference', 'new-problem', 'deferral-wording'] }, claim: { type: 'string' }, required_change: { type: 'string' }, owner: { type: 'string', enum: PARTS.map((p) => p.key) } }, required: ['id', 'severity', 'kind', 'claim', 'required_change', 'owner'] } } }, required: ['part', 'file', 'issues'] }

// ───────── Inventory ─────────
phase('Inventory')
const inventories = (await parallel(PARTS.map((p) => () => opusSeat(`${GROUND}

LANE consistency/inventory-${p.key}. Your part: ${p.note} — the top-level sections of docs/ARCHITECTURE.md whose headings start with ${JSON.stringify(p.heads)} (extract them with python by heading; read them COMPLETELY in ranges). Build the INVENTORY of every normative item stated in your part: rules, mechanisms, algorithm steps, interfaces and types (by name), numbers and budgets (with units), tests and acceptance bars, decisions (D- and J- ids), defined terms. For each: an id (${p.key.toUpperCase()}-001 …), kind, a one-line statement in our own words WITH its exact value(s), the section where it is stated (and every other place in your part that restates it), and whether its SUBJECT belongs to your part or to another part (then name that part — e.g. a budget belongs to rendering's §12, a stream-key rule to determinism's §6, a record type to model's §2). Also list every INTERNAL CONFLICT (your part states the same fact two different ways). Write ${DIR}/inventory-${p.key}.json (array of objects) and ${DIR}/inventory-${p.key}.md (a readable table plus the conflicts list).`, `consistency/inventory-${p.key}`, 'Inventory', INV_SCHEMA)))).filter(Boolean)
log(`inventories: ${inventories.length}/6; facts ${inventories.reduce((n, i) => n + i.facts, 0)}; cross-part restatements ${inventories.reduce((n, i) => n + i.restatements_of_other_parts, 0)}; internal conflicts ${inventories.reduce((n, i) => n + i.internal_conflicts, 0)}`)

// ───────── Canon ─────────
phase('Canon')
const canon = await opusSeat(`${GROUND}

LANE consistency/canon. Read the six inventories ${DIR}/inventory-{model,kernel,pipeline,determinism,rendering,scope}.json (query with python) and their .md conflict lists. Produce ${DIR}/canon.json and ${DIR}/canon.md: (1) one entry per distinct fact across the whole document, with its CANONICAL HOME (the part and section that owns its subject — budgets in §12, stream and seed rules in §6, record types in §2, stage behaviour in §4, tests in §13, licences in §17, and so on) and the list of every place it is stated; (2) every CONFLICT — the same fact stated with different values or meanings in two places — with both statements, where each is, and which one is canonical (the canonical home wins unless it is plainly the stale one; then say so and why, citing the validation record docs/ARCHITECTURE-VALIDATION.md or docs/validation/fix-all/ for the latest ruling); (3) for each part, the list of facts it must STATE (it is their home) and the facts it must only REFERENCE. Keep ids stable.`, 'consistency/canon', 'Canon', CANON_SCHEMA)
if (!canon) { log('canon failed — stopping; inventories are on disk'); return { error: 'canon failed' } }
log(`canon: ${canon.facts} facts, ${canon.multi_stated} stated more than once, ${canon.conflicts} conflicts`)

// ───────── Rewrite ─────────
phase('Rewrite')
const rewrites = (await parallel(PARTS.map((p) => () => fableSeat(`${GROUND}

LANE consistency/rewrite-${p.key}. You are the EDITOR of the ${p.key.toUpperCase()} part: ${p.note} (top-level sections starting with ${JSON.stringify(p.heads)}). Read completely: your part of docs/ARCHITECTURE.md, ${DIR}/inventory-${p.key}.md/.json, ${DIR}/canon.md/.json (your STATE and REFERENCE lists and every conflict touching your part), the section headings of the other parts (for references), docs/OWNER-INSTRUCTIONS-2026-09-25.md and docs/DEFINITION.md.
${openFor(p).length ? `Also fix these remaining items owned by your part: ${openFor(p).map((o) => o.id).join(', ')} — read each one's why, required change and source in docs/validation/fix-all/still-open-r5.json (query it with python by id) and in the verify file it cites.` : 'No remaining open item is owned by your part; still resolve every conflict the canon lists for it.'}
Write the COMPLETE new text of each of your top-level sections, one file per section, into ${DIR}/new/${p.key}/ (file names NN-slug.md, NN = the order they appear in the document; each file starts with the section's heading line EXACTLY as it is today so the assembler can place it; keep every subsection heading number that other sections cite unless you record the renumbering in your report). Rules: state each fact your part owns exactly once, precisely, with its value; replace every restatement of another part's fact by a reference to its canonical section; resolve conflicts as the canon says; keep mechanisms, interfaces (as code blocks), numbers, tests and decisions — change none of them except the listed open items and conflict resolutions; cut narration of how the text evolved ("round 3 added …", "per VD2-10 …") — keep at most a short pointer to the validation record where a figure needs its evidence; plain, compact prose. ${p.key === 'scope' ? 'SCOPE PART EXTRA: move the full "Judgment calls" section and the rationale-heavy parts of §0 Provenance and Appendix A to docs/ARCHITECTURE-RATIONALE.md (verbatim content, a new title and a one-paragraph preface), and leave in the main document a compact "Judgment calls" index (id and one-line choice each, pointing to the rationale file); keep "Delegated decisions" in the main document (final choices, one short paragraph each); rewrite the one-page summary so it is true to the whole design; put the single "> PENDING FABLE REVIEW" banner under the document title.' : ''}
Write ${DIR}/rewrite-${p.key}.md: sizes before and after, a MAPPING TABLE (every inventory id of your part → its new section, or "referenced to §x" for facts owned elsewhere — no id may be missing), the open items fixed and how, conflicts resolved, and CROSS-PART NOTES (anything another part's canonical text must change; do not edit their files).`, `consistency/rewrite-${p.key}`, 'Rewrite', REWRITE_SCHEMA)))).filter(Boolean)
log(`rewrites: ${rewrites.length}/6; size ${Math.round(rewrites.reduce((n, r) => n + r.old_kb, 0))} KB → ${Math.round(rewrites.reduce((n, r) => n + r.new_kb, 0))} KB; unmapped ${rewrites.reduce((n, r) => n + r.facts_unmapped, 0)}; open fixed ${rewrites.reduce((n, r) => n + r.open_fixed.length, 0)}/${OPEN.length}`)
if (rewrites.length < 6) { log('not every part was rewritten — stopping before assembly; nothing in docs/ARCHITECTURE.md changed'); return { error: 'rewrite incomplete', rewrites: rewrites.map((r) => r.part) } }

// ───────── Assemble ─────────
const assemblePrompt = (round) => `${GROUND}

LANE consistency/assemble-r${round}. You are the ASSEMBLER (a mechanical step — use python, not hand edits). ${round === 0 ? `First copy the current docs/ARCHITECTURE.md to docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md (create the folder). Then build the new docs/ARCHITECTURE.md from the section files under ${DIR}/new/{model,kernel,pipeline,determinism,rendering,scope}/ — placing each file by its heading line in the order the headings appear in the archived document (every archived top-level heading must be matched by exactly one file; report any heading with no file or any file with no heading and STOP without writing if one exists).` : `Apply every repair block in ${DIR}/repair-r${round}-*.md to docs/ARCHITECTURE.md: each block starts with "=== REPLACE <exact heading line> ===" (replace that heading's whole subsection up to the next heading of the same or higher level) or "=== INSERT AFTER <exact heading line> ===" and ends at the next "===" line or end of file (ignore any text before a file's first "===" line, such as its title and review marker); apply them with a python script; report any block whose heading is not found and skip it.`} Then: (1) resolve references — every "§x" / "§x.y" / "§x.y.z", D-n, J-… and II.n reference in the document must name a heading or id that exists; list broken ones in your log and fix only the mechanical ones (renumbered targets named in the rewrite reports' renumbering notes); (2) run python3 docs/validation/bench/doc_checks.py --sections "<every top-level heading key of the document, comma-separated>" (see its --help; the allow file is docs/validation/doc-checks-allow.tsv; allow rows that point at text this pass removed may be dropped, with a note); correct mechanical hits, add a reviewed allow row (check, exact hit text, written reason) only where the hit is a false positive, re-run until it exits 0 or only design-level hits remain, and record the counts (C1–C4, S1, S2: hits and unreviewed); (3) write ${DIR}/assemble-r${round}.md with sizes, the broken-reference list, the doc-check counts and anything you could not place.`
phase('Assemble')
let asm = await opusSeat(assemblePrompt(0), 'consistency/assemble-r0', 'Assemble', ASSEMBLE_SCHEMA)
if (!asm) { log('assembly failed — the archived copy (if made) is docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md'); return { error: 'assembly failed' } }
log(`assembled: ${Math.round(asm.old_kb)} KB → ${Math.round(asm.new_kb)} KB; broken references ${asm.broken_references}; doc-check hits ${asm.doc_check_hits}`)

// ───────── Verify → Repair loop ─────────
const verifyPrompt = (p, round) => `${GROUND}

LANE consistency/verify-${p.key}-r${round}. You VERIFY the ${p.key.toUpperCase()} part of the new docs/ARCHITECTURE.md (sections starting with ${JSON.stringify(p.heads)}) against the archived docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md, ${DIR}/inventory-${p.key}.json, ${DIR}/canon.json and ${DIR}/rewrite-${p.key}.md (its mapping table)${round > 0 ? ` and the repair files ${DIR}/repair-r${round}-*.md` : ''}. Check EVERY inventory id of your part: LOST (no longer stated anywhere it should be, or a reference points at a section that does not state it), CHANGED (a value, rule or meaning differs from the archive without being one of the listed open items or a canon conflict resolution), UNFIXED (a listed open item owned by this part not fixed: ${JSON.stringify(openFor(p).map((o) => o.id))}), CONFLICT (your part now disagrees with another part's canonical statement), BROKEN-REFERENCE, DEFERRAL-WORDING, or a NEW-PROBLEM the rewrite introduced. ${round === 0 ? `CROSS-PART NOTES: the six rewrites ran in parallel, so also read the cross-part notes of the other five ${DIR}/rewrite-*.md reports and check every note addressed to your part against your part's text — a valid note not reflected is an issue (kind conflict, owner ${p.key}); a note you judge wrong is recorded in your file with the reason and not raised. Sample nothing: go through the whole mapping table.` : `This round re-checks what repair round ${round} touched: every inventory id whose home or reference lies in a replaced or inserted subsection, each issue the repair claimed to fix (all must now be fixed) and that no new problem appeared there; other ids keep their earlier verdict (cite your earlier report).`} Write ${DIR}/verify-${p.key}-r${round}.md (the checked list with verdicts) and return every issue with its owning part.`
const repairPrompt = (p, round, issues, sources) => `${GROUND}

LANE consistency/repair-${p.key}-r${round}. Fix these issues in your part (${p.note}) of docs/ARCHITECTURE.md: ${JSON.stringify(issues)}. Read the issue sources (${sources}), the archived text docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md for anything lost, and the canon. Write ${DIR}/repair-r${round}-${p.key}.md containing only repair blocks: each starts with a line "=== REPLACE <exact current heading line> ===" or "=== INSERT AFTER <exact current heading line> ===" followed by the complete new text of that subsection (targeted, smallest subsection that fixes the issue), stating facts once and referencing the canonical homes. Do not edit docs/ARCHITECTURE.md yourself.`

let round = 0
let issues = []
while (true) {
  phase('Verify')
  const checks = (await parallel(PARTS.map((p) => () => opusSeat(verifyPrompt(p, round), `consistency/verify-${p.key}-r${round}`, 'Verify', CHECK_SCHEMA)))).filter(Boolean)
  issues = checks.flatMap((c) => c.issues.map((i) => ({ ...i, reported_by: c.part })))
  log(`verify round ${round}: ${issues.length} issues (${['blocker', 'major', 'minor'].map((s) => `${issues.filter((i) => i.severity === s).length} ${s}`).join(', ')})`)
  if (!issues.length || round >= MAX_REPAIR) break
  round++
  phase('Repair')
  const byPart = PARTS.filter((p) => issues.some((i) => i.owner === p.key))
  await parallel(byPart.map((p) => () => lateFableSeat(repairPrompt(p, round, issues.filter((i) => i.owner === p.key), `${DIR}/verify-*-r${round - 1}.md`), `consistency/repair-${p.key}-r${round}`, 'Repair', REPAIR_SCHEMA)))
  phase('Assemble')
  asm = await opusSeat(assemblePrompt(round), `consistency/assemble-r${round}`, 'Assemble', ASSEMBLE_SCHEMA) || asm
}

// ───────── Validate ─────────
const CLOSING_DUTIES = `CLOSING DUTIES (a real Fable seat performs them; a stand-in leaves them undone and says so): (1) docs/FABLE-REVIEW-QUEUE.md — for every row of THIS pass (ids beginning A-consistency/ and B-consistency/) change ONLY the status cell from PENDING to REVIEWED-CONFIRMED or REVIEWED-CORRECTED (the correction stated in your file), by an in-place python line replacement keyed on the row id; never rewrite other rows; rows of earlier passes stay PENDING for workflows/05-fable-review.js. (2) In each of this pass's files under ${DIR}/ replace the "> PENDING FABLE REVIEW …" line with "> Fable-reviewed <date>: <VERDICT> — ${DIR}/validate.md". (3) Replace the one banner line under the title of docs/ARCHITECTURE.md with a line stating what is now true: the consolidated text was validated by Fable on <date> (${DIR}/validate.md), and the design decisions taken by Opus stand-ins during the fix rounds stay queued in docs/FABLE-REVIEW-QUEUE.md until workflows/05-fable-review.js has run. (4) Write ${DIR}/SUMMARY.md for the owner in PLAIN LANGUAGE (the owner does not code): what this pass did, sizes before and after (bytes and lines, and the rationale file), what was fixed, what if anything remains and why, and what comes next (the Fable review of the earlier queue, then the 2026-09-25b amendments, then the first build milestone).`
const validatePrompt = `${GROUND}

LANE consistency/validate. You are the FINAL VALIDATOR of the consolidated docs/ARCHITECTURE.md (with docs/ARCHITECTURE-RATIONALE.md) — the Fable seat of this pass. Read the whole document, ${DIR}/canon.md, every ${DIR}/verify-*.md, ${DIR}/assemble-r0.md (its §5 lists what the assembler left for you) and the last assemble log. Judge what part-by-part checks cannot: is the design coherent end to end (stage contracts, data model, determinism, editing, rendering and build plan agree); is every fact stated once with valid references; did each verifier really cover every inventory id of its part (its verdict count against the inventory count — a sampled report is itself an issue); is anything the owner ruled missing (docs/OWNER-INSTRUCTIONS-2026-09-25.md — docs/AMENDMENTS-2026-09-25b.md items 8–27, including item 21's GPL-3 licence, are applied by the next pass, not this one, so RULING-1 in the scope report is not an issue here); does any deferral wording remain; can the first milestone (§16 M0/M1) be built from the text; is the document now a size a builder can use (the assembler reports 76.5 % of the pre-pass size against this pass's 55–65 % target: judge usability, not the number, and say whether a further compression is worth its risk). RULED by the manager (J30, docs/PROGRESS.md): the ≈ 450 fix-record tags (VS…, SCL-…, GEO-… and the like) stay as short evidence pointers; their uneven spread across parts is not an issue. Issues the repair rounds left open: ${JSON.stringify(issues)}. Return every issue you raise with its owning part and an exact required change (a repair round follows if you raise any); write ${DIR}/validate.md (verdict, coherence findings, the verifier-coverage table, the size judgment, the issues). If you raise NO issue, also perform the closing duties now. ${CLOSING_DUTIES}`
phase('Validate')
const fin = await lateFableSeat(validatePrompt, 'consistency/validate', 'Validate', CHECK_SCHEMA)
const finIssues = (fin && fin.issues) ? fin.issues.map((i) => ({ ...i, reported_by: 'validate' })) : []
log(fin ? `validate: ${finIssues.length} issues (${['blocker', 'major', 'minor'].map((s) => `${finIssues.filter((i) => i.severity === s).length} ${s}`).join(', ')})` : 'validate: FAILED (no result)')
let closing = null
if (finIssues.length && ARGS.finalRepair !== false) {
  round++
  phase('Repair')
  const byPart = PARTS.filter((p) => finIssues.some((i) => i.owner === p.key))
  await parallel(byPart.map((p) => () => lateFableSeat(repairPrompt(p, round, finIssues.filter((i) => i.owner === p.key), `${DIR}/validate.md`), `consistency/repair-${p.key}-r${round}`, 'Repair', REPAIR_SCHEMA)))
  phase('Assemble')
  asm = await opusSeat(assemblePrompt(round), `consistency/assemble-r${round}`, 'Assemble', ASSEMBLE_SCHEMA) || asm
  phase('Verify')
  const checks = (await parallel(byPart.map((p) => () => opusSeat(verifyPrompt(p, round), `consistency/verify-${p.key}-r${round}`, 'Verify', CHECK_SCHEMA)))).filter(Boolean)
  issues = checks.flatMap((c) => c.issues.map((i) => ({ ...i, reported_by: c.part })))
  log(`final verify (round ${round}: ${byPart.map((p) => p.key).join(', ')}): ${issues.length} issues`)
  phase('Validate')
  closing = await lateFableSeat(`${GROUND}

LANE consistency/closing. You CLOSE the pass (the Fable seat). The validator (${DIR}/validate.md) raised ${finIssues.length} issues; repair round ${round} answered them (${DIR}/repair-r${round}-*.md, assembled per ${DIR}/assemble-r${round}.md) and the re-verification (${DIR}/verify-*-r${round}.md) reports ${issues.length} issues: ${JSON.stringify(issues)}. Read those files and the repaired subsections of docs/ARCHITECTURE.md; confirm each validator issue is fixed as required (return any that is not, with its owner — it is handled by hand next; nothing is deferred). Then perform the closing duties, with REVIEWED-CORRECTED where a repair was needed. ${CLOSING_DUTIES}`, 'consistency/closing', 'Validate', CHECK_SCHEMA)
}

return { parts: rewrites.map((r) => ({ part: r.part, kb: [Math.round(r.old_kb), Math.round(r.new_kb)], unmapped: r.facts_unmapped, open_fixed: r.open_fixed.length })), assembled_kb: asm && [Math.round(asm.old_kb), Math.round(asm.new_kb)], repair_rounds: round, verify_remaining: issues, validator_issues: finIssues, closing_remaining: closing && closing.issues }
