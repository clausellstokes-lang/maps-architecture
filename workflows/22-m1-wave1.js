export const meta = {
  name: 'm1-wave1',
  description: 'M-1 wave 1 (J159): the capture plan, FTG day 1, the MFCG sweep, the NG recordings, the twins on what is on disk, the deny-list, an independent check of the plan, and one verifier over every landed item',
  phases: [
    { title: 'Plan', detail: 'W-01 plan.json and the metric ids; an independent check of M-1-plan.md; W-16 the deny-list' },
    { title: 'Capture', detail: 'W-02 FTG day 1, W-03 the MFCG sweep, W-04 the NG programme (owner approved 2026-10-03)' },
    { title: 'Measure', detail: 'W-05, W-07, W-10, W-11 on the captures already on disk' },
    { title: 'Verify', detail: 'one Opus verifier re-executes every landed item check' },
  ],
}

// Research-side seats (§17.1): they read research/ and captures/, write research/baselines/, docs/calibration/ and
// captures/, and never write into plat/ (the crossing is wave 3, W-20). At most MAX seats at once.
const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/m1'
const MODEL = ARGS.model || 'opus'
const MAX = ARGS.maxLanes || 3
const SKIP = ARGS.skip || []

let live = 0
const waiters = []
const gate = async (fn) => {
  while (live >= MAX) await new Promise((r) => waiters.push(r))
  live++
  try { return await fn() } finally { live--; const w = waiters.shift(); if (w) w() }
}
const seat = (prompt, label, phaseName, schema) => gate(() => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: MODEL }))

const GROUND = `PROJECT (root ${ROOT}). The Maps program designed PLAT, an original settlement map generator (docs/ARCHITECTURE.md and twelve volumes in docs/volumes/), and is building it in plat/. Milestone M-1 (calibration and the clean-room inputs, §16) runs on the owner's Mac beside M0's build. Its plan is docs/calibration/M-1-plan.md with docs/calibration/M-1-work.json (landed 2026-10-03 03:58): read the plan's sections 0–2, 4, 5, 6 and 9 and your item's row before anything else. YOU ARE A RESEARCH-SIDE SEAT (§17.1): you may read research/ (patreon, devlogs, ftg-docs, external and reference-maps are symbolic links to /Users/cstokes/Desktop/research/; follow them), captures/, profiler/ and docs/. You write only research/baselines/, docs/calibration/ (your records E<nn>-<slug>.md with their .json numbers, as the plan names them) and captures/ (new capture folders). You NEVER write into plat/ (the crossing is wave 3) and never copy reference code, word lists, grammars, palettes or content tables into any record; numbers, metric ids and our own words only. Never read a captured program bundle (captures/**/network/bodies/*.js) — the code-reading findings are the only route. THE OWNER APPROVED (2026-10-03, J159): (1) six Fantasy Town Generator towns, one per day from today, on the site's free one-per-day allowance — no account, no login, no purchase, no premium; on a cookie or consent notice choose the most private option (decline non-essential) and accept nothing else; (2) the MFCG sweep on itch.io — 35 automated loads of the public build and its 70 downloads (35 JSON, 35 SVG, about 260 MB from html-classic.itch.zone); (3) the NG programme on itch.io — 44 automated loads, no downloads. Nothing else that touches a third-party site is approved: if a site asks for a login, an account, a payment, new terms, or anything outside that list, STOP and report it as owner_notes. THE MACHINE: MacBook Air, Apple M1, 16 GB, Node 24.12, Python 3.9, Google Chrome; about 18 GB free — run df -h /Users/cstokes before and after every capture folder and stop under 1 GB. M0's build seats run on this machine at the same time: do not run benchmarks or timing, and touch nothing in plat/. GIT: run none that changes state; the session commits and pushes. WORKING RULES: save as you go; append a CHECKPOINT line to docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); when complete write your exact structured result as JSON to docs/calibration/results/<your item id>.json (make the folder), then append "<date> <lane key> LANDED <files>", and make your final message that JSON. RESUME RULE: if that result file exists and docs/lane-events.log has a LANDED line for your exact lane key, return the file's JSON without redoing anything. CONTINUE RULE: if your files exist without that LANDED line, read them and your CHECKPOINT lines, keep what stands and continue. Long output goes to ${SCRATCH}/ (make it). Report outcome first; label each conclusion CONFIRMED (executed or read) or PLAUSIBLE (reasoning only).`

const ITEM_SCHEMA = { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string', enum: ['landed', 'partial', 'blocked'] }, records: { type: 'array', items: { type: 'string' } }, outputs: { type: 'array', items: { type: 'string' } }, checks: { type: 'array', items: { type: 'object', properties: { check: { type: 'string' }, passed: { type: 'boolean' }, receipt: { type: 'string' } }, required: ['check', 'passed', 'receipt'] } }, rows: { type: 'number' }, build_ids: { type: 'array', items: { type: 'string' } }, owner_notes: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['id', 'status', 'records', 'outputs', 'checks', 'rows', 'build_ids', 'owner_notes', 'notes'] }
const PLANCHECK_SCHEMA = { type: 'object', properties: { verdict: { type: 'string', enum: ['pass', 'fix'] }, issues: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, where: { type: 'string' }, problem: { type: 'string' }, required_change: { type: 'string' }, affects_wave1: { type: 'boolean' } }, required: ['id', 'where', 'problem', 'required_change', 'affects_wave1'] } } }, required: ['verdict', 'issues'] }
const VERIFY_SCHEMA = { type: 'object', properties: { items: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, verdict: { type: 'string', enum: ['confirmed', 'refuted', 'partial'] }, reexecuted: { type: 'array', items: { type: 'string' } }, problems: { type: 'array', items: { type: 'string' } } }, required: ['id', 'verdict', 'reexecuted', 'problems'] } } }, required: ['items'] }

const EXTRA = {
  'W-01': 'Write research/baselines/plan.py, plan.json and metrics.m-1.json; the three seed vectors in the item row must reproduce docs/validation/bench/v12_h32_vectors.out byte for byte.',
  'W-02': `TODAY IS DAY 1 of the six-day FTG schedule (plan section 2.1): BIG_TOWN with the water options nearest none (no coast, rivers off), every other form value at the preset default. Drive the session with profiler/session.mjs --target ftg --headful and profiler/drive.mjs as the plan describes, with the persistent guest profile profiler/.profiles/ftg; a browser window opens on the owner's screen. Write research/baselines/ftg_capture_checklist.md first and follow it step by step; take a drive.mjs text and shot reading before every click; click the dialog's create button only when it is the one hit-testable match; never click anything that accepts terms, logs in, buys or upgrades. If the day's allowance is refused, record the slot in sample.failed with the reason and stop (the schedule slides). Keep the capture folder small (no CPU profile). Write the README the plan asks for (id, WaterSetting, population and its source, server time, buildings, request hash) and decode the payload with tools/pb_raw.py as the item's check. Leave a one-paragraph note in the record on exactly how to run day 2 (BIG_CITY, none) tomorrow.`,
  'W-03': 'First the build-id check: resolve the live MFCG build as the plan says; if it is not 12710731, the pre-decided outcome of plan section 9 applies (the new captures carry the new build, the pin moves as a declared shift) — record it in build_ids and owner_notes and continue. Then the 35 exports by plan.json seeds, one cold navigation each; the retry detection of section 2.2; stats.py on the folder.',
  'W-04': 'Run after the build-id check of NG (12710731 is MFCG; NG is 11441280 in the plan): 44 single-generation recordings by plan.json seeds, medium first (it is M0 (b) input), then small and large; df between folders.',
  'W-05': 'On the two existing CITY payloads only (the new FTG capture is measured when the six land); the twin must reproduce the item row numbers before any new number is declared.',
  'W-07': 'The fixture pass on the 2026-09-25 exports only (the sweep rows are wave 2); the twin must reproduce the item row numbers.',
  'W-10': 'On the 2026-09-25 NG vertex captures; this is M0 (b)\'s input: per face class (curved, round-joined, triangular, C-shaped, holed) the trace rows and distributions, the pooled numbers reproducing the item row first.',
  'W-11': 'On the 2026-09-25 NG vertex captures; the twin must reproduce plot_granularity_baseline.py and README-vertices.md as the item row says.',
  'W-16': 'The authoritative clean-room corpus is now the one catchup/cleanroom used (docs/validation/clean-room-mac-2026-10-03.md; its two blind spots — the 994 Dwellings bodies with unquoted keys and the reference prose files C3 never reads — are sources the deny-list must cover). Write research/baselines/make_denylist.py and its output research-side only (research/baselines/denylist/); the salt generated once and kept with the list; the generation record (date, sources, counts, never tokens) in your E record; the self-test of the item row.',
}

const itemPrompt = (id) => `${GROUND}

LANE m1/${id}. Your item is ${id} of docs/calibration/M-1-work.json (and its row in M-1-plan.md section 2): build its tool from the existing scripts the row names, run it, write its record, and run its checker column yourself as the receipt. ${EXTRA[id] || ''} Return status landed only when every check in the row passed; partial or blocked otherwise, with the reason.`

const planCheckPrompt = `${GROUND}

LANE m1/plan-check. You are an INDEPENDENT CHECKER of docs/calibration/M-1-plan.md and M-1-work.json, a seat separate from the plan's writer. Check the plan by its own section 11 and against the design: every §16 M-1 deliverable and exit appears once with a class, source and work item; every ⟨M-1⟩ cell of §13.5 appears in section 1 or 8; the M0 build's AFTER-M-1 needs are covered — read plat/docs/build/M0.md section 1 (b) and (c) and the AFTER-M-1 items of plat/docs/build/M0-work.json (the research side may read plat/ docs; it never writes there) and confirm M-1 delivers each named row, file or statement (baselines.json rows, ng-faces.json, denylist.json, the digest entries) or say which is missing; each work item has a tool, inputs, outputs, a checker and a correct order; V12 §3.2.1's seed formula and §3.4.2's metric definitions are applied as written. Read; run nothing that touches a site. Return pass or fix with every issue and whether it affects wave 1 (W-01, W-02, W-03, W-04, W-05, W-07, W-10, W-11, W-16). Result file: docs/calibration/results/plan-check.json.`

const verifyPrompt = (landed) => `${GROUND}

LANE m1/wave1-verify. You are the INDEPENDENT VERIFIER of M-1 wave 1, separate from every seat that built it. For each item below, read its record and result file, then RE-EXECUTE its checker column yourself (the twin reproductions, the seed vectors, the payload decode, the export count and byte identity, the deny-list self-test) from the saved scripts and data — do not trust the receipts — and try to refute each claimed pass. Run nothing that touches a third-party site. Items: ${JSON.stringify(landed)}. Result file: docs/calibration/results/wave1-verify.json.`

const run = async (id, phaseName) => SKIP.includes(id) ? null : seat(itemPrompt(id), `m1/${id}`, phaseName, ITEM_SCHEMA)

// W-01 gates the captures and the measurements; the plan check and the deny-list run beside them (no barrier).
const pCheck = SKIP.includes('plan-check') ? Promise.resolve(null) : seat(planCheckPrompt, 'm1/plan-check', 'Plan', PLANCHECK_SCHEMA)
const pW16 = run('W-16', 'Plan')
const w01 = await run('W-01', 'Plan')
const rest = (!w01 || w01.status === 'blocked') ? [] : await parallel([
  () => run('W-02', 'Capture'),
  async () => { const b = await run('W-03', 'Capture'); const c = (b && b.status !== 'blocked') ? await run('W-04', 'Capture') : null; return [b, c] },
  () => run('W-10', 'Measure'),
  () => run('W-11', 'Measure'),
  () => run('W-05', 'Measure'),
  () => run('W-07', 'Measure'),
])
const check = await pCheck
const w16 = await pW16
if (check) log(`plan check: ${check.verdict}, ${check.issues.length} issues (${check.issues.filter((i) => i.affects_wave1).length} touch wave 1)`)
const all = [w01, w16, ...rest.flat()].filter(Boolean)
for (const r of all) log(`${r.id}: ${r.status}; ${r.checks.filter((c) => c.passed).length}/${r.checks.length} checks; owner notes ${r.owner_notes.length}`)
const landed = all.filter((r) => r.status !== 'blocked').map((r) => ({ id: r.id, status: r.status, records: r.records, outputs: r.outputs }))
const verify = landed.length ? await seat(verifyPrompt(landed), 'm1/wave1-verify', 'Verify', VERIFY_SCHEMA) : null
return { items: all, planCheck: check, verify }
