export const meta = {
  name: 'wave2-followups',
  description: 'Fix the wave-2 findings now (no deferral): the hatch-reference ruling for W-22 (Fable), the design-corrections verifier\'s five minors plus any new DC, and plan.py\'s recorded-slot guard widened to day and programme (after m1/W-01b lands), each with an independent check',
  phases: [
    { title: 'Rule', detail: 'Fable: W-22 row (1a), the hatch reference value' },
    { title: 'Design', detail: 'the five minors of design/m1-corrections-1-verify and any DC the ruling adds; then a verifier' },
    { title: 'Guard', detail: 'plan.py: a recorded slot\'s day and programme guarded too; after W-01b; then a checker' },
  ],
}

// args: { root, scratch, maxLanes (default 2) }
const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/followups'
const MODEL = ARGS.model || 'opus'
const RULE_MODEL = ARGS.ruleModel || 'opus' // J190 (owner 2026-10-05: "in place of using fable for anything, use opus 5.5")
const MAX = ARGS.maxLanes || 2

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
  return seat(prompt + ' STAND-IN NOTICE: you continue a ruling seat as an ' + MODEL + ' stand-in; head your record "' + MODEL + ' stand-in for the ' + RULE_MODEL + ' seat, PENDING FABLE REVIEW" and add a row to docs/FABLE-REVIEW-QUEUE.md.', label + '-standin', phaseName, schema, MODEL)
}

const GROUND = `PROJECT (root ${ROOT}). The Maps program designed PLAT (docs/ARCHITECTURE.md, docs/volumes/) and builds milestone M0 in plat/ while milestone M-1 (calibration, §16) runs research-side: plan docs/calibration/M-1-plan.md revision 3 with M-1-work.json, rulings M-1-rulings-1.md and M-1-rulings-2.md, results in docs/calibration/results/. M-1's wave 2 runs now (workflows/27: m1/W-01b is regenerating plan.py's registry; FTG programme 2's recording seats bind slots with plan.py --bind-ftg after it). THE OWNER'S RULES: fix every finding now or rule it invalid (no silent deferral); decisions under the owner's delegation (J122) are recorded vetoably with their reason; the design is a reference during the build (J156) and gains no new design. YOU ARE A RESEARCH-SIDE SEAT (§17.1): read research/, captures/, profiler/, docs/ and plat/'s docs (read only); write only what your brief names; never write into plat/; never copy reference code, word lists, grammars, palettes, identifiers or content tables into any record or the design (numbers, metric ids, our own words); touch no website. THE MACHINE: the owner's Mac; M0's four build seats and M-1's seats run beside you (an FTG recording seat may drive Chrome): run no benchmark, keep output small, stop under 1 GB free. GIT: none that changes state. WORKING RULES: CHECKPOINT lines in docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); write your exact structured result as JSON to the result file your brief names, then append "<date> <lane key> LANDED <files>", and make your final message that JSON. RESUME RULE: a result file plus a LANDED line for your exact lane key means return the file's JSON. CONTINUE RULE: files without that line mean continue from them. Long output to ${SCRATCH}/ (make it). Label conclusions CONFIRMED or PLAUSIBLE.`

const RESULT_SCHEMA = { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string', enum: ['landed', 'partial', 'blocked'] }, records: { type: 'array', items: { type: 'string' } }, checks: { type: 'array', items: { type: 'object', properties: { check: { type: 'string' }, passed: { type: 'boolean' }, receipt: { type: 'string' } }, required: ['check', 'passed', 'receipt'] } }, new_dcs: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['id', 'status', 'records', 'checks', 'new_dcs', 'notes'] }

const rulePrompt = `${GROUND}

LANE m1/rulings-2b. A small ruling (the M-1 plan reserves reference-value and definition calls for a Fable ruling seat). W-22 (the NG draw census, docs/calibration/results/W-22.json and E20-*.md, its finding F1) returned partial on its row (1a): the checker says the 2026-09-25 draw records must reproduce §13.5's figure of about 17.4 hatch triangles per wing within rounding; the census pools those eight records to 17.5072 (map means 17.17-17.65; gen-0 only 17.4361), and E20 F1 traces the 17.4 to one 2026-09-21 record's ratio, with no single wing rule reproducing both halves. Read W-22's record and result, the row in M-1-plan.md and M-1-work.json, §13.5's draw-style row and V12's draw.hatchPerWing definition. RULE: which reference value and which definition the row carries (the pooled plan-seed value over the 44 W-04 recordings, the 2026-09-25 fixture value, or the old figure), how the checker row (1a) is restated so it tests what it should, and whether §13.5's figure needs a design correction (if so, write it as DC-36 in the DC form of the rulings files: section, old text, new text, measuring record). Record the ruling as R-49 in an addendum section of docs/calibration/M-1-rulings-2.md (vetoable, with its reason), apply the checker restatement to M-1-plan.md and M-1-work.json, and re-run W-22's check under the restated row (research/baselines/ng_draw_census.py --check) as the receipt; if it now passes, update docs/calibration/results/W-22.json's status and that check with a note naming R-49. Result file: docs/calibration/results/rulings-2b.json (new_dcs lists DC-36 if you wrote one).`

const designFixPrompt = (newDcs) => `${GROUND}

LANE design/m1-corrections-1-fix. You are a DESIGN SEAT fixing what the independent verifier of the design corrections found (docs/validation/m1-corrections-1.verify.json, verdict partial; the record docs/validation/m1-corrections-1.md): (1) DC-08: the new key sentence reads every 'a / b' FTG cell as a per-capture pair, so the towers-and-gates row's older '17 / 17 towers on ring vertices' (17 of 17) now misreads - write it as '17 of 17 towers' or limit the key's scope; (2) DC-19: the record says 13 rows rendered as plain text; the backup shows 10 - correct the count in the record and its JSON notes; (3) DC-05: the reason's premise is half wrong (poor IS one of §4.5's six bands; there is no dense band) - reword the reason; the design text stays; (4) DC-24: the §4.7 S11 arrangement table's row arrangement (base near l. 7918) still says 'NG 95-99 % attached' without a definition - use the same wording as §4.7's granularity anchor; (5) DC-16: §4.5 (base near l. 6791) still cites the anchors row's old 2.4-17.6 ha range for size 40 - restate it as the anchors row now does. ${newDcs.length ? `ALSO apply the new design correction(s) ${JSON.stringify(newDcs)} from docs/calibration/M-1-rulings-2.md's addendum (R-49), in the same way the corrections round did, and list the M0 items whose sections include the changed section (plat/docs/build/M0-work.json, read only).` : 'No new design correction was ruled.'} Back up each document to ${SCRATCH}/backup/ before its first edit; change nothing else. Then python3 docs/validation/bench/doc_checks.py on every touched document (and the base whole if the base changed) until each exits 0 with no new allow row for our own words; python3 tools/bundle_architecture.py to regenerate docs/ARCHITECTURE-FULL.md; append a 'Fix round 1' section to docs/validation/m1-corrections-1.md and update docs/validation/m1-corrections-1.json's notes. Result file: docs/validation/m1-corrections-1-fix.json (new_dcs: the DCs applied in this round, with any M0 items affected written into notes as 'DC-nn: items').`

const designFixVerifyPrompt = `${GROUND}

LANE design/m1-corrections-1-fix-verify. You are the INDEPENDENT VERIFIER of design/m1-corrections-1-fix (docs/validation/m1-corrections-1-fix.json and the 'Fix round 1' section of docs/validation/m1-corrections-1.md). Re-execute and try to refute: each of the five findings of docs/validation/m1-corrections-1.verify.json is fixed where it says; any new DC is applied exactly and its M0-affected list is complete (grep M0-work.json's sections yourself); the backup diff shows nothing changed outside those hunks; doc_checks.py exits 0 on every touched document; python3 tools/bundle_architecture.py --check says the bundle is current. Result file: docs/validation/m1-corrections-1-fix.verify.json (status landed if everything holds, partial with the problems otherwise).`

const guardPrompt = `${GROUND}

LANE m1/plan-guard-2. The independent check of m1/plan-fix-3 (docs/calibration/results/plan-fix-3-check.json, its failed line 'U2 refutation beyond the unit's stated scope') found that plan.py's recorded-slot guard still lets a write change a RECORDED slot's day or programme (swapping programme-1 rows 2 and 4 swaps two bound slots' days with exit 0; moving programme 1's last row to the head of programme 2 moves bound slot 5 into programme 2 with its day nulled). Widen the guard: compute() refuses any change to a recorded slot's label, size, water, day or programme against the prior plan.json (bound or failed slots, any programme), while striking or reordering unrecorded tail rows stays allowed. FIRST WAIT: m1/W-01b is rewriting plan.py now; do not touch research/baselines/plan.py until docs/lane-events.log has a LANDED line for m1/W-01b (poll it: one Bash call of the form until grep -q ' m1/W-01b LANDED' docs/lane-events.log; do sleep 30; done, with a timeout under ten minutes, repeated; write a CHECKPOINT line while you wait every twenty minutes; if W-01b reports blocked, stop and return blocked). Then work on a scratch mirror of research/baselines/ built from the plan.py W-01b installed; red first (each of the checker's three cases writes with exit 0 before your change and is refused after; a struck unrecorded tail row still writes); install by ATOMIC RENAME between two binds (FTG programme 2's recording seats bind slots now: wait while docs/lane-events.log shows a CHECKPOINT 'THE CREATE CLICK HAPPENS NOW' for a slot without that slot's LANDED line yet), then python3 research/baselines/plan.py --check SAME on the live files at once. Record in docs/calibration/M-1-plan-fix-3.md as a 'Guard round 2' section. Result file: docs/calibration/results/plan-guard-2.json.`

const guardCheckPrompt = `${GROUND}

LANE m1/plan-guard-2-check. You are the INDEPENDENT CHECKER of m1/plan-guard-2 (docs/calibration/results/plan-guard-2.json; the 'Guard round 2' section of docs/calibration/M-1-plan-fix-3.md). On a scratch mirror of research/baselines/ only: a recorded slot's label, size, water, day or programme change is refused (try each, and the three cases of plan-fix-3-check's finding); striking or reordering unrecorded tail rows writes; then python3 research/baselines/plan.py --check SAME on the live files. Result file: docs/calibration/results/plan-guard-2-check.json (status landed if every case holds; blocked with the failing cases otherwise).`

const out = await parallel([
  async () => {
    const r = await ruledSeat(rulePrompt, 'm1/rulings-2b', 'Rule', RESULT_SCHEMA)
    const newDcs = r && r.new_dcs ? r.new_dcs : []
    const f = await seat(designFixPrompt(newDcs), 'design/m1-corrections-1-fix', 'Design', RESULT_SCHEMA)
    const v = f ? await seat(designFixVerifyPrompt, 'design/m1-corrections-1-fix-verify', 'Design', RESULT_SCHEMA) : null
    log(`hatch ruling: ${r ? r.status : 'none'} (new DCs ${newDcs.length}); design fix ${f ? f.status : 'none'}; verify ${v ? v.status : 'none'}`)
    return { ruling: r, designFix: f, designFixVerify: v }
  },
  async () => {
    const g = await seat(guardPrompt, 'm1/plan-guard-2', 'Guard', RESULT_SCHEMA)
    const c = g && g.status === 'landed' ? await seat(guardCheckPrompt, 'm1/plan-guard-2-check', 'Guard', RESULT_SCHEMA) : null
    log(`plan guard 2: ${g ? g.status : 'none'}; check ${c ? c.status : 'none'}`)
    return { guard: g, guardCheck: c }
  },
])
return Object.assign({}, ...out.filter(Boolean))
