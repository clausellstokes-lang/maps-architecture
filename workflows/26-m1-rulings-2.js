export const meta = {
  name: 'm1-rulings-2',
  description: 'J164: fix the M-1 plan closing check blockers and plan the premium FTG captures the owner bought (BIG_TOWN and BIG_CITY to about ten each, three to five metropolises, a few other sizes), on Fable, then an Opus closing check',
  phases: [
    { title: 'Rulings', detail: 'Fable: the closing check blockers, the premium FTG programme, the stats.json corpus rule' },
    { title: 'Close', detail: 'Opus: confirm every blocker fixed and the premium programme complete; blockers only' },
  ],
}

const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/m1r2'
const MODEL = ARGS.model || 'opus'
const RULE_MODEL = ARGS.ruleModel || 'fable'
const seat = (prompt, label, phaseName, schema, model) => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: model || MODEL })
const ruledSeat = async (prompt, label, phaseName, schema) => {
  if (RULE_MODEL !== MODEL) {
    const r = await seat(prompt, label, phaseName, schema, RULE_MODEL)
    if (r) return r
    log(label + ': the ' + RULE_MODEL + ' seat returned nothing (limit or error); continuing on ' + MODEL + ' from its files')
  }
  return seat(prompt + ' STAND-IN NOTICE: you continue a ruling seat as an ' + MODEL + ' stand-in; head your file "' + MODEL + ' stand-in for the ' + RULE_MODEL + ' seat, PENDING FABLE REVIEW" and add a row to docs/FABLE-REVIEW-QUEUE.md.', label + '-standin', phaseName, schema, MODEL)
}

const GROUND = `PROJECT (root ${ROOT}). The Maps program is building PLAT (docs/ARCHITECTURE.md, docs/volumes/) in plat/ while milestone M-1 (calibration and the clean-room inputs, §16) runs research-side: docs/calibration/M-1-plan.md and M-1-work.json (revised by m1/rulings-1, docs/calibration/M-1-rulings-1.md), records E<nn>-*.md, results in docs/calibration/results/. YOU ARE A RESEARCH-SIDE SEAT: read research/, captures/, profiler/, docs/ freely; never write into plat/ or the design; never copy reference code, word lists, grammars, palettes, identifiers or content tables into any record; run NO git command that changes state and touch no website. THE OWNER (2026-10-03, J163, J164): signed in to FTG with their own account, then SUBSCRIBED TO FTG PREMIUM (unlimited saves; premium-only options such as metropolises) on the session's advice to record more FTG towns — about 20–25 more in one sitting: BIG_TOWN and BIG_CITY topped up to about ten each, three to five METROPOLIS towns, and a few other sizes; FTG towns are recorded in the owner's account, one at a time, by a recording seat; slots 1 and 2 of the original six landed, slots 3–5 are being recorded now (lanes m1/W-02-slot3b …). Build seats run in plat/ on this machine at the same time. WORKING RULES: CHECKPOINT lines in docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); write your exact structured result to the result file your brief names, then "<date> <lane key> LANDED <files>", and make your final message that JSON. RESUME RULE: a result file plus a LANDED line for your exact lane key means return the file's JSON. CONTINUE RULE: files without that line mean continue from them. Label conclusions CONFIRMED or PLAUSIBLE; record every decision vetoably with its reason (J122).`

const RULE_SCHEMA = { type: 'object', properties: { record: { type: 'string' }, blockers_fixed: { type: 'array', items: { type: 'string' } }, ftg_programme: { type: 'array', items: { type: 'object', properties: { slot: { type: 'number' }, size: { type: 'string' }, water: { type: 'string' }, label: { type: 'string' }, premium_only: { type: 'boolean' } }, required: ['slot', 'size', 'water', 'label', 'premium_only'] } }, rows_affected: { type: 'array', items: { type: 'string' } }, corpus_rule: { type: 'string' }, owner_gated: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['record', 'blockers_fixed', 'ftg_programme', 'rows_affected', 'corpus_rule', 'owner_gated', 'notes'] }
const CLOSE_SCHEMA = { type: 'object', properties: { verdict: { type: 'string', enum: ['pass', 'fix'] }, previous_open: { type: 'array', items: { type: 'string' } }, blockers: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['verdict', 'previous_open', 'blockers', 'notes'] }

const rulePrompt = `${GROUND}

LANE m1/rulings-2. You are the M-1 RULING SEAT, round 2. Read M-1-plan.md, M-1-work.json, M-1-rulings-1.md, docs/calibration/results/plan-check-close-1.json (the closing check of round 1: verdict fix, its blockers B-1, B-2 … and its notes; docs/calibration/M-1-plan-notes.md), E02-ftg-captures.md (every section, including the signed-in captures and the stopped slot-3 attempt), research/baselines/plan.py and plan.json, research/baselines/ftg_capture_checklist.md, docs/validation/clean-room-fix-2026-10-03.md with its verifier's file (its P1), and the design sections the programme touches (§13.5's FTG rows and band rule, §13.6 (2), §16 M-1, V12 §2.4, §3.2.1, §3.3 C7, §3.5). Then: (1) FIX every blocker of the round-1 closing check in M-1-plan.md and M-1-work.json, and answer each of its notes or route it; (2) PLAN THE PREMIUM FTG PROGRAMME: extend the FTG family past the six slots — the slot list (size, water options, label in the plan's family form) for BIG_TOWN and BIG_CITY to about ten each with the water mix the band rule needs, three to five METROPOLIS towns, and a few other sizes where the size ladder or a §13.5 row gains from them — about 20–25 new slots in all; rule how the extended FTG sample changes FTG's rows (which become target rows with bands by the band rule, which stay weakness or descriptive, with reasons), what plan.py needs (an --extend for the FTG family with slot order kept, as R-13 did for MFCG), the disk estimate, and the capture procedure's premium differences (read E02's signed-in sections; the checklist's section H stays the procedure); write the slots into plan.py's input and M-1-work.json so a recording seat can take them by number; (3) THE CORPUS RULE: settle the clean-room verifier's P1 (whether captures' stats.json stays out of doc_checks.py's corpus) and apply the change to docs/validation/bench/doc_checks.py if you rule it in, re-running doc_checks.py on the base to exit 0; (4) list anything owner-gated plainly. Write docs/calibration/M-1-rulings-2.md. Result file: docs/calibration/results/rulings-2.json.`

const closePrompt = (r) => `${GROUND}

LANE m1/plan-check-close-2. You are the CLOSING CHECKER of the M-1 plan after rulings round 2, independent of its writer (result ${JSON.stringify({ record: r.record, blockers_fixed: r.blockers_fixed, slots: r.ftg_programme.length })}). (1) For each blocker of docs/calibration/results/plan-check-close-1.json, confirm it is fixed in M-1-plan.md, M-1-work.json or M-1-rulings-2.md, or list it in previous_open. (2) Confirm the premium FTG programme is complete and executable: every new slot has a size, water options and a label in the family form; plan.py takes them in order (run its --check; run any new --extend on a scratch copy only); the band and row rulings follow §13.5's band rule; the disk estimate fits the free space. (3) A NEW finding fails the plan only if it is a blocker (a deliverable or an M0 need with no item, an item ordered before its input, an owner-gated step not marked, a clean-room breach); other observations go to docs/calibration/M-1-plan-notes.md. Result file: docs/calibration/results/plan-check-close-2.json.`

const r = await ruledSeat(rulePrompt, 'm1/rulings-2', 'Rulings', RULE_SCHEMA)
if (!r) return { error: 'rulings-2 returned nothing' }
log(`rulings-2: ${r.blockers_fixed.length} blockers fixed; FTG programme ${r.ftg_programme.length} slots`)
const c = await seat(closePrompt(r), 'm1/plan-check-close-2', 'Close', CLOSE_SCHEMA)
log(`plan closing check 2: ${c ? c.verdict : 'none'}`)
return { rulings: r, close: c }
