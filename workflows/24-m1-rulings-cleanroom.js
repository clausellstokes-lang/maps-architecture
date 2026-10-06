export const meta = {
  name: 'm1-rulings-cleanroom',
  description: 'After M-1 wave 1 (J161): the design clean-room fix the deny-list found (a reference field name, study-map names) with the doc_checks corpus kept to reference material, verified; the M-1 rulings and the plan revision on Fable, re-checked; and the MFCG set completed (owner-approved loads)',
  phases: [
    { title: 'Clean room', detail: 'rename the field, reword the names, exclude our own outputs from the checker corpus; then an independent verifier' },
    { title: 'Rulings', detail: 'Fable rules every owed M-1 question and revises the plan; an Opus closing check' },
    { title: 'MFCG', detail: 'seed 0 cold re-export and the retry of 130/plain/8' },
  ],
}

const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/m1r'
const MODEL = ARGS.model || 'opus'
const RULE_MODEL = ARGS.ruleModel || 'fable' // J210 (owner 2026-10-05 ~23:20: "feel free to use fable now where appropriate"; J190 lifted)
const MAX = ARGS.maxLanes || 3
const ONLY = ARGS.only || ['cleanroom', 'rulings', 'mfcg']

let live = 0
const waiters = []
const gate = async (fn) => {
  while (live >= MAX) await new Promise((r) => waiters.push(r))
  live++
  try { return await fn() } finally { live--; const w = waiters.shift(); if (w) w() }
}
const seat = (prompt, label, phaseName, schema, model) => gate(() => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: model || MODEL }))
const ruledSeat = async (prompt, label, phaseName, schema) => {
  if (RULE_MODEL !== MODEL) {
    const r = await seat(prompt, label, phaseName, schema, RULE_MODEL)
    if (r) return r
    log(label + ': the ' + RULE_MODEL + ' seat returned nothing (limit or error); continuing on ' + MODEL + ' from its files')
  }
  return seat(prompt + ' STAND-IN NOTICE: you continue a ruling seat as an ' + MODEL + ' stand-in; head your file "' + MODEL + ' stand-in for the ' + RULE_MODEL + ' seat, PENDING FABLE REVIEW" and add a row to docs/FABLE-REVIEW-QUEUE.md.', label + '-standin', phaseName, schema, MODEL)
}

const GROUND = `PROJECT (root ${ROOT}). The Maps program designed PLAT, an original settlement map generator (docs/ARCHITECTURE.md and twelve volumes in docs/volumes/), and is building milestone M0 in plat/ while milestone M-1 (calibration and the clean-room inputs, §16) runs research-side; M-1's plan is docs/calibration/M-1-plan.md with M-1-work.json, its records are docs/calibration/E<nn>-*.md with results in docs/calibration/results/, and its wave 1 landed 2026-10-03 (W-01, W-02 day 1, W-03 34 of 35, W-04, W-05, W-07, W-10, W-11 landed; W-16 partial; the independent plan check docs/calibration/results/plan-check.json returned fix with 21 issues; the wave verifier's verdicts are in docs/calibration/results/wave1-verify.json). YOU ARE A RESEARCH-SIDE SEAT: you may read research/ (the archives are symbolic links to /Users/cstokes/Desktop/research/), captures/, profiler/ and docs/; you never write into plat/ and never copy reference code, word lists, grammars, palettes, identifiers or content tables into the design or any record. THE OWNER'S STANDING RULES: the design is a reference, not a contract, during the build (J156); new owner rules wait in docs/BACKLOG.md until M1; every decision you take under the owner's delegation (J122) is recorded vetoably with its reason. Build seats run in plat/ on this machine at the same time: never touch plat/, run no benchmark, and run NO git command that changes state (the session commits). THE MACHINE: the owner's MacBook Air (Apple M1, Node 24, Python 3.9, Chrome); about 17 GB free — stop under 1 GB. WORKING RULES: save as you go; CHECKPOINT lines in docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); write your exact structured result to the result file your brief names, then "<date> <lane key> LANDED <files>", and make your final message that JSON. RESUME RULE: a result file plus a LANDED line for your exact lane key means return the file's JSON without redoing. CONTINUE RULE: files without that line mean continue from them. Label conclusions CONFIRMED (executed or read) or PLAUSIBLE.`

const CR_SCHEMA = { type: 'object', properties: { renamed: { type: 'array', items: { type: 'object', properties: { old: { type: 'string' }, new: { type: 'string' }, files: { type: 'array', items: { type: 'string' } }, count: { type: 'number' } }, required: ['old', 'new', 'files', 'count'] } }, reworded: { type: 'array', items: { type: 'string' } }, corpus_exclusions: { type: 'array', items: { type: 'string' } }, doc_checks: { type: 'array', items: { type: 'object', properties: { doc: { type: 'string' }, exit: { type: 'number' } }, required: ['doc', 'exit'] } }, selftest: { type: 'string' }, bundle: { type: 'string' }, record: { type: 'string' }, notes: { type: 'array', items: { type: 'string' } } }, required: ['renamed', 'reworded', 'corpus_exclusions', 'doc_checks', 'selftest', 'bundle', 'record', 'notes'] }
const VERIFY_SCHEMA = { type: 'object', properties: { verdict: { type: 'string', enum: ['confirmed', 'refuted', 'partial'] }, problems: { type: 'array', items: { type: 'string' } }, reexecuted: { type: 'array', items: { type: 'string' } } }, required: ['verdict', 'problems', 'reexecuted'] }
const RULE_SCHEMA = { type: 'object', properties: { record: { type: 'string' }, plan: { type: 'string' }, work_file: { type: 'string' }, rulings: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, question: { type: 'string' }, ruling: { type: 'string' } }, required: ['id', 'question', 'ruling'] } }, plan_issues_fixed: { type: 'number' }, design_corrections: { type: 'array', items: { type: 'string' } }, wave2: { type: 'array', items: { type: 'string' } }, owner_gated: { type: 'array', items: { type: 'string' } } }, required: ['record', 'plan', 'work_file', 'rulings', 'plan_issues_fixed', 'design_corrections', 'wave2', 'owner_gated'] }
const CLOSE_SCHEMA = { type: 'object', properties: { verdict: { type: 'string', enum: ['pass', 'fix'] }, previous_open: { type: 'array', items: { type: 'string' } }, blockers: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['verdict', 'previous_open', 'blockers', 'notes'] }
const MFCG_SCHEMA = { type: 'object', properties: { loads_used: { type: 'number' }, reexport_identical: { type: 'boolean' }, retry: { type: 'string' }, files: { type: 'array', items: { type: 'string' } }, owner_notes: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['loads_used', 'reexport_identical', 'retry', 'files', 'owner_notes', 'notes'] }

const crPrompt = `${GROUND}

LANE design/cleanroom-fix-1. You are a DESIGN SEAT applying a clean-room correction the hashed deny-list found (docs/calibration/E16-denylist.md sections 1, 6 and 7; docs/calibration/results/W-16.json). (1) THE FIELD NAME: the Building field the base names at §2.6 (l. 1369 and 1488) and §10.2 (l. 16013), and V03 (l. 310) and V11 (l. 1433) use, is a field name of FTG's Foundry module, which §17.1 (9) forbids. Rename it — and its record type's name where that also repeats the module — to a name of our own (plain English naming what it holds in our model), everywhere it occurs in docs/ARCHITECTURE.md, docs/volumes/, docs/AMENDMENTS-*.md, docs/validation/coherence/fix-list.md and plat/docs/build/open-design-findings.md (read-only for plat/: list any plat/ occurrence for the session instead of editing it); keep every section number, test id and identifier otherwise unchanged. (2) THE STUDY-MAP NAMES: reword the examples at base l. 15533, V01 l. 3163, V09 l. 4475 and V10 l. 37, 2347 and 3200 in our own invented words (research/reference-maps/README forbids its names in the design), and add V12 l. 1534's coincidence to the allow file with its reason. (3) THE CHECKER'S CORPUS: docs/validation/bench/doc_checks.py reads our own outputs as reference corpus (E01 section 7, E02, E16 section 7: research/baselines/, research/sf/, and the record files M-1's capture lanes write inside captures/ — the README, stats, plan and log files our seats made, as opposed to the reference program's recordings); change its corpus_files and json_files so they hold reference material only, with a comment naming the rule and the date, and keep the corpus-completeness warning. Back up every document to ${SCRATCH}/backup/ before its first edit. Then run doc_checks.py over every document you touched (and the base whole) until each exits 0 with no new allow row for our own words, run python3 research/baselines/make_denylist.py selftest (without the transcription, check 9 skipped) and record its design-set line, and regenerate docs/ARCHITECTURE-FULL.md with python3 tools/bundle_architecture.py. Write docs/validation/clean-room-fix-2026-10-03.md (each rename and rewording with before and after, the corpus change, the receipts). Result file: docs/validation/clean-room-fix-2026-10-03.json.`

const crVerifyPrompt = (r) => `${GROUND}

LANE design/cleanroom-fix-1-verify. You are an INDEPENDENT VERIFIER of the clean-room fix (docs/validation/clean-room-fix-2026-10-03.md; result ${JSON.stringify(r)}). Re-execute and try to refute: the old field name occurs nowhere in the design set, the amendments, the fix list or open-design-findings.md (grep whole words, both cases); the new name is used consistently (same spelling, every reference resolves) and repeats no reference identifier (search the corpus for it); the study-map names are gone from the design and the rewordings use none of that map's names; doc_checks.py's corpus change removes only our own outputs (list what it now excludes and confirm each is ours, and that reference recordings in captures/ are still read); doc_checks.py exits 0 on the base and every touched volume; make_denylist.py selftest's design-set line has no unreviewed hit; the bundle is current (tools/bundle_architecture.py --check). Result file: docs/validation/clean-room-fix-2026-10-03.verify.json.`

const rulePrompt = `${GROUND}

LANE m1/rulings-1. You are the M-1 RULING SEAT (the plan reserves the ⟨M-1⟩ rulings, band exceptions and definition calls for a Fable seat). Read docs/calibration/M-1-plan.md and M-1-work.json whole, docs/calibration/results/plan-check.json (21 issues PC-01 … PC-21), docs/calibration/results/wave1-verify.json, every wave-1 record E01, E02, E03, E04, E05, E07, E10, E11, E16 (their open questions and 'rulings owed' sections), plat/docs/build/M0.md section 1 (b) and (c) and the AFTER-M-1 items and afterM1Needs of plat/docs/build/M0-work.json (the research side may read plat/ docs; never write there), and the design sections each question touches (§13.5, §13.6 (2), §16 M-1, §17.1, V12 §2.4, §3.2–§3.5, §8). Then: (1) RULE every question owed — at least PC-03 (NG's px-to-metre scale: is 0.35 m per model unit adopted, how is it declared), PC-04 (rows only from formula-seed captures: the 2026-09-25 NG captures become fixtures, W-04's 44 formula-seed recordings the rows), PC-05 (the 2026-09-25 FTG payload's non-default road length: pooled or not), the pairing reading (42–46 % or 9–13 %), the 4-way share raw or merged, the street-gap definition, the edge blocks, W-10's rare face shapes (descriptive or awaiting more data), W-05's signature-vector definition (shared with W-09), W-05's five changed FTG reference numbers and W-07's F1–F4 and D24, W-03's replacement-seed rule should 130/plain/8 freeze again, and every other PC issue — each with its reason, decided under the owner's delegation, recorded vetoably; (2) REVISE the plan: fix all 21 plan-check issues in M-1-plan.md and M-1-work.json (keep the old text's history in a short changelog section), in particular deliver what M0 asked for (ng-faces.json with its schema, the cut-lengths-per-face row, denylist.json in normalisationVersion 1 as M0's C-0101 states, the digest entries), and lay out wave 2 and wave 3 with their order, checkers and crossing seats; (3) list the DESIGN CORRECTIONS the measurements require (each: section, the old number or sentence, the new one, the record that measured it) for a design seat to apply — do not edit the design; (4) list anything owner-gated (a new site load, a download) plainly. Write docs/calibration/M-1-rulings-1.md. Result file: docs/calibration/results/rulings-1.json.`

const ruleClosePrompt = (r) => `${GROUND}

LANE m1/plan-check-close-1. You are the CLOSING CHECKER of the revised M-1 plan, independent of its writer (result ${JSON.stringify({ plan: r.plan, rulings: r.rulings.length, fixed: r.plan_issues_fixed })}). For each of the 21 issues of docs/calibration/results/plan-check.json, confirm it is fixed in docs/calibration/M-1-plan.md, M-1-work.json or docs/calibration/M-1-rulings-1.md, or list it in previous_open with what remains. Then confirm the plan now delivers every AFTER-M-1 need of plat/docs/build/M0-work.json (afterM1Needs) with a work item, a format and a checker. A NEW finding fails the plan only if it is a blocker (a deliverable of §16 M-1 or an M0 need with no item, an item ordered before its input, an owner-gated step not marked, a clean-room breach in the crossing); write every other observation to docs/calibration/M-1-plan-notes.md for the wave-2 seats. Result file: docs/calibration/results/plan-check-close-1.json.`

const mfcgPrompt = `${GROUND}

LANE m1/W-03-complete. You complete W-03, the MFCG sweep (docs/calibration/E03-*.md and results/W-03.json: 34 of 35 exports; seed capture/MFCG/130/plain/8 froze at load 29; the cold re-export of seed 0 not run). THE OWNER APPROVED (2026-10-03, J161) at most THREE more automated page loads of the public MFCG build on itch.io, with those maps' own JSON and SVG downloads and nothing else: load 1 = the cold re-export of capture/MFCG/40/plain/0 by exactly the method E03 used (one load, JSON by the URL key, SVG through the app's own window), checked byte-identical to the stored files; load 2 = one retry of capture/MFCG/130/plain/8 by the same method; load 3 is NOT yours — if the retry freezes again, record it in sample.failed with the reason and stop (a substitute seed waits for the ruling seat's replacement rule). Same build-id check first (one public game-page fetch, as before); no login, account, payment, terms or consent; stop and report anything else a site asks. Update E03 and the sweep README, re-run stats.py, and append to the record. Result file: docs/calibration/results/W-03-complete.json.`

const branches = []
if (ONLY.includes('cleanroom')) branches.push(async () => {
  const r = await seat(crPrompt, 'design/cleanroom-fix-1', 'Clean room', CR_SCHEMA)
  if (!r) return { cleanroom: null }
  const v = await seat(crVerifyPrompt(r), 'design/cleanroom-fix-1-verify', 'Clean room', VERIFY_SCHEMA)
  log(`clean-room fix: ${r.renamed.map((x) => x.count).join('+')} renames, ${r.reworded.length} rewordings; verify ${v ? v.verdict : 'none'}`)
  return { cleanroom: r, cleanroomVerify: v }
})
if (ONLY.includes('rulings')) branches.push(async () => {
  const r = await ruledSeat(rulePrompt, 'm1/rulings-1', 'Rulings', RULE_SCHEMA)
  if (!r) return { rulings: null }
  const c = await seat(ruleClosePrompt(r), 'm1/plan-check-close-1', 'Rulings', CLOSE_SCHEMA)
  log(`M-1 rulings: ${r.rulings.length}; plan issues fixed ${r.plan_issues_fixed}; closing check ${c ? c.verdict : 'none'}`)
  return { rulings: r, planClose: c }
})
if (ONLY.includes('mfcg')) branches.push(async () => ({ mfcg: await seat(mfcgPrompt, 'm1/W-03-complete', 'MFCG', MFCG_SCHEMA) }))
const out = await parallel(branches)
return Object.assign({}, ...out.filter(Boolean))
