export const meta = {
  name: 'm1-wave3',
  description: 'M-1 wave 3, phases A and B: the depth re-fit (Opus fit, Fable ruling) and the deny-list at the exit; then the rows, bands and candidate baselines (W-15), one design seat for the measured cells (E12, E15, DC-37, DC-38) with its verifier, and the implementer digest drafted research-side (W-17); the crossing (W-18, W-20, W-19) waits for M0-k-05 and M0-k-06',
  phases: [
    { title: 'A', detail: 'W-12 fit and ruling; W-16b deny-list' },
    { title: 'B', detail: 'W-15 rows and bands; design seat; W-17 digest draft' },
    { title: 'Verify', detail: 'one verifier over what landed' },
  ],
}

// args: { root, scratch, maxLanes (default 2), only: ['A', 'B', 'verify'], verifyKey }
const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/m1w3'
const MODEL = ARGS.model || 'opus'
const RULE_MODEL = ARGS.ruleModel || 'fable'
const MAX = ARGS.maxLanes || 2
const ONLY = ARGS.only || ['A']
const VKEY = ARGS.verifyKey || 'wave3-verify-ab'

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

const GROUND = `PROJECT (root ${ROOT}). The Maps program designed PLAT (docs/ARCHITECTURE.md, docs/volumes/) and builds milestone M0 in plat/ while milestone M-1 (calibration and the clean-room inputs, §16) runs research-side. M-1's plan is docs/calibration/M-1-plan.md revision 3 with docs/calibration/M-1-work.json (the plan is authoritative where they differ), the rulings M-1-rulings-1.md and M-1-rulings-2.md (with its addenda R-48 and R-49), the closing checks results/plan-check-close-1.json and -2.json, and the notes docs/calibration/M-1-plan-notes.md (sections 2, 4, 6 and 7 name items; read every note naming yours). Records are docs/calibration/E<nn>-*.md with results in docs/calibration/results/. WAVE 2 IS DONE: W-01b, W-03b, W-07b, W-08, W-09, W-10b, W-11b, W-13, W-14, W-22 landed and confirmed (results/wave2-verify.json); FTG programme 2 recorded slots 6-27 (28 slots bound; results/W-02b-verifyb.json, W-05b-final.json, W-06-final.json and wave2-verify-ftg.json when they land). THIS IS WAVE 3 (the work file's wave3 list). YOU ARE A RESEARCH-SIDE SEAT (§17.1): you may read research/ (the archives are symbolic links to /Users/cstokes/Desktop/research/), captures/, profiler/, docs/ and plat/'s docs (read only); you write only what your brief names; you NEVER write into plat/ (the crossing is W-20's, after M0-k-05 and M0-k-06 land), never copy reference code, word lists, grammars, palettes, identifiers or content tables into any record or the design (numbers, metric ids and our own words only), never read a captured program bundle, and touch no website. THE OWNER'S STANDING RULES: decisions under the owner's delegation (J122) are recorded vetoably with their reason; fix every finding now or rule it invalid; the design gains no new design (J156). THE MACHINE: the owner's Mac; M0's four build seats run in plat/ and other seats beside you: run no benchmark, keep output small, give any vitest run --maxWorkers=2, run one heavy process at a time, stop under 1 GB free disk or while memory_pressure reports under 25 % free (wait and re-check). GIT: none that changes state; the session commits and pushes. WORKING RULES: CHECKPOINT lines in docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); write your exact structured result as JSON to the result file your brief names, then append "<date> <lane key> LANDED <files>", and make your final message that JSON. RESUME RULE: a result file plus a LANDED line for your exact lane key means return the file's JSON without redoing. CONTINUE RULE: files without that line mean continue from them. Long output to ${SCRATCH}/ (make it). Report outcome first; label each conclusion CONFIRMED or PLAUSIBLE.`

const ITEM_SCHEMA = { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string', enum: ['landed', 'partial', 'blocked'] }, records: { type: 'array', items: { type: 'string' } }, outputs: { type: 'array', items: { type: 'string' } }, checks: { type: 'array', items: { type: 'object', properties: { check: { type: 'string' }, passed: { type: 'boolean' }, receipt: { type: 'string' } }, required: ['check', 'passed', 'receipt'] } }, rows: { type: 'number' }, design_corrections: { type: 'array', items: { type: 'string' } }, owner_notes: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['id', 'status', 'records', 'outputs', 'checks', 'rows', 'design_corrections', 'owner_notes', 'notes'] }
const VERIFY_SCHEMA = { type: 'object', properties: { verdict: { type: 'string', enum: ['confirmed', 'refuted', 'partial'] }, items: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, verdict: { type: 'string', enum: ['confirmed', 'refuted', 'partial'] }, reexecuted: { type: 'array', items: { type: 'string' } }, problems: { type: 'array', items: { type: 'string' } } }, required: ['id', 'verdict', 'reexecuted', 'problems'] } } }, required: ['verdict', 'items'] }

const item = (id, key, extra, phaseName, model) => seat(`${GROUND}

LANE m1/${key}. Your item is ${id} of docs/calibration/M-1-work.json (its row in M-1-plan.md section 2, and every note naming it in M-1-plan-notes.md): build its tool from the existing scripts the row names, run it, write its record, and run its checker column yourself as the receipt. ${extra} Result file: docs/calibration/results/${key}.json. Return status landed only when every check in the row passed; partial or blocked otherwise, with the reason.`, `m1/${key}`, phaseName, ITEM_SCHEMA, model)

const W12_FIT = 'THIS IS THE FIT HALF of W-12 (its seat tier is a Fable ruling over an Opus fit): fit every number the row lists from E09, E10 and E11 by their stated estimators (the depth rows, the regime floors, cut.flattenM, the modest court cell and the ratio-moved bands, the MFCG preset\'s court cell), show each fitted [e_lo, e_hi] reproduces its inputs\' p10 / p90 within rounding and that every band\'s shares sum to 1, and write the fit to docs/calibration/E12-depth-refit.md as a DRAFT section with every candidate value, its inputs and the alternatives a ruling must choose between (J-A34.01: no block band is signed before W-12 lands). Do not rule; list the open choices.'
const W12_RULE = 'THIS IS THE RULING HALF of W-12: read m1/W-12-fit\'s draft (docs/calibration/E12-depth-refit.md, results/W-12-fit.json) and its inputs; decide each open choice with its reason (vetoable, J122); finalise E12 with the numbers table (provenance M-1 <date>), the hand-off note to the design seat (each cell: section, old value, new value) and the digest entry text R-20 (2) and (6) asks for (our words, numbers only); re-run the fit\'s reproduction checks on the ruled values.'
const W16B = 'Build the deny-list at the exit in M0\'s format (plan section 7c; R-17): make_denylist.py build --format m0 over the corpus after FTG programme 2 (both programmes\' capture folders join it), W-03b and W-04, with doc_checks.py\'s two corpus rules (R-30 exclusions; R-38: an M-1 folder\'s stats.json read for its string values only); the header carries digestHexDigits 16 (N-04); the salt kept research-side. Write the candidate research-side only (research/baselines/denylist/; never plat/ - W-20 crosses it). The eleven checks PASS on both lists with check 11 at 0 unreviewed; the planted leak per M0 class is caught by the research twin of M0\'s rules; E16 section 9.'
const W15 = 'You are the SOLE writer of rows.py, bands.py and cross_check.py (R-47). Inputs: every E record, both FTG programmes (28 slots; W-05b-final and W-06-final\'s results), W-12\'s ruled values, W-01b\'s registry. Apply, by name: N-05 (no row M0 gates on carries a floor or sign field: sgd.*, blockc.perHa, junction.*, block.*, cut.*, block.courtShare; the floor lives in metrics.m-1.json); N-22 (C3 reads a colour only inside a JSON string value, never inside a number or a 16-hex digest); N-24 (ids, metric and supersedes match ^[A-Za-z0-9.:/@+_-]{1,120}$, case-sensitive); N-25 (a row id ends in /<subset> or /<subset>/<field>: all, plain, ring, template-<name>, class-<flag>); R-34 with R-48 (water.step keeps section 13.5\'s fixed bound, water.riverWidth by the band rule per class) and R-49 (draw.hatchPerWing\'s pooled plan-seed value, a fixed-band row); R-40 (BOTH variety dispersions formed here from W-09\'s and W-05b\'s vectors); the METROPOLIS FTG rows at n = 4; and the wave-2 verifier\'s W-13 note (fg.recoverability and fg.streetwall are outside W-13\'s bootstrap: re-run W-13\'s bootstrap over those two rows or record why their bands need none). Write the candidate baselines.json and the candidate ng-faces.json check research-side (research/baselines/candidates/; never plat/ - W-20 crosses them), E15, and a hand-off list for the design seat: every recomputed band or reference value a design cell quotes (section, old, new). Run C1-C10 and the T-V12 fixtures the row names.'
const W17 = 'Draft the implementer digest (R-20\'s nine entries) from the findings and E05-E12, logging every file read. It is written for implementer-side seats, who never read research/ or docs/calibration/: our words, numbers, metric ids and design section references only; no reference code, identifiers, word lists, palettes, grammars or tables; no research path but an opaque research: label. Write it to docs/digest-candidate/ (outside plat/: the digest crosses into plat/docs/digest/ only after M0-k-06 has landed, at W-20, through W-18\'s check) with docs/digest-candidate/READING-LOG.md; run docs/validation/bench/doc_checks.py on each entry and read every hit.'

const designPrompt = (handoffs) => `${GROUND}

LANE design/m1-corrections-2. You are a DESIGN SEAT applying the measured design cells of M-1 wave 3, by amendment: (1) E12's hand-off note (W-12: §4.6 / §4.7 depth rows and regime floors, cut.flattenM, the court cells, the ratio-moved bands); (2) E15's hand-off list (W-15: every recomputed band or reference value a design cell quotes); (3) DC-37 (V12 §3.3 C2's string pattern for a row's id, metric and supersedes widened to ^[A-Za-z0-9.:/@+_-]{1,120}$ with case-sensitive matching; M-1-plan-notes.md §7) and DC-38 (§13.5's bent-cut row: the NG reference values from W-10b's plan-seed sample, about 66 % one-bend and about 89 % corner near the middle, the two-fixture 73 % / 82 % named as history; M-1-plan-notes.md §7). Inputs from this run: ${JSON.stringify(handoffs)}. Apply each exactly; where the design text no longer reads as quoted, apply the intent and say so; a change that would add new design is ruled invalid with its reason (J156). Back up every document to ${SCRATCH}/backup/ before its first edit. For each change list the M0 items whose sections (plat/docs/build/M0-work.json, read only) include it and what changes for them, so the session can carry it. Then doc_checks.py on every touched document until exit 0 with no new allow row for our words; regenerate docs/ARCHITECTURE-FULL.md with python3 tools/bundle_architecture.py. Write docs/validation/m1-corrections-2.md. Result file: docs/validation/m1-corrections-2.json.`
const designVerifyPrompt = `${GROUND}

LANE design/m1-corrections-2-verify. You are the INDEPENDENT VERIFIER of design/m1-corrections-2 (docs/validation/m1-corrections-2.md and .json). Re-execute and try to refute: each change is where it says and nothing else moved (diff against the backups); every change traces to E12, E15, DC-37 or DC-38; no reference word or identifier entered; doc_checks.py exits 0 on every touched document; python3 tools/bundle_architecture.py --check is current; the M0-affected list is complete (grep M0-work.json's sections yourself). Result file: docs/validation/m1-corrections-2.verify.json.`

const verifyPrompt = (landed) => `${GROUND}

LANE m1/${VKEY}. You are the INDEPENDENT VERIFIER of M-1 wave 3's phases A and B, separate from every seat that built them. For each item below, read its record and result, then RE-EXECUTE its checker column from the saved scripts and data - do not trust the receipts - and try to refute each claimed pass. Touch no website. Items: ${JSON.stringify(landed)}. Result file: docs/calibration/results/${VKEY}.json.`

const results = {}
if (ONLY.includes('A')) {
  const [w12, w16b] = await parallel([
    async () => {
      const fit = await item('W-12', 'W-12-fit', W12_FIT, 'A')
      if (!fit || fit.status === 'blocked') return fit
      return ruledSeat(`${GROUND}\n\nLANE m1/W-12. Your item is W-12 of docs/calibration/M-1-work.json. ${W12_RULE} Result file: docs/calibration/results/W-12.json. Return status landed only when every check in the row passed on the ruled values.`, 'm1/W-12', 'A', ITEM_SCHEMA)
    },
    () => item('W-16b', 'W-16b', W16B, 'A'),
  ])
  results.w12 = w12; results.w16b = w16b
  log(`phase A: W-12 ${w12 ? w12.status : 'none'}; W-16b ${w16b ? w16b.status : 'none'}`)
}
const W05B_27 = 'AN ADDENDUM to m1/W-05b-final (results/W-05b-final.json, E05 sections 9.6-9.10): FTG slot 27 (TOWN, coast+river; capture 2026-10-04T09-33-54, lane m1/W-02-slot27c, confirmed by m1/W-02b-verifyc) was recorded after that pass measured slots 0-26. Measure slot 27 with the same tool and settings (its MeasureInput file was routed here by m1/W-06-final), append a short section to E05 section 9 and update E05-ftg-metrics.slots.json, keeping every earlier slot byte-unchanged (show it). Note: the settlement list labels slot 27 BIG_TOWN at a listed population of 5 725 against TOWN\'s nominal 3 625 (+58 %; E02 section 39); record both and say which the TOWN-as-a-function-of-population reading uses and why. TOWN slots feed research-side numbers only (R-34).'
if (ONLY.includes('B')) {
  if (ARGS.slot27) results.w05b27 = await item('W-05b', 'W-05b-slot27', W05B_27, 'B')
  const w15 = await item('W-15', 'W-15', W15, 'B')
  results.w15 = w15
  if (w15 && w15.status !== 'blocked') {
    const [d, w17] = await parallel([
      async () => {
        const r = await seat(designPrompt({ w12: 'docs/calibration/E12-depth-refit.md (its hand-off note)', w15: (w15.design_corrections || []) }), 'design/m1-corrections-2', 'B', ITEM_SCHEMA)
        const v = r ? await seat(designVerifyPrompt, 'design/m1-corrections-2-verify', 'B', VERIFY_SCHEMA) : null
        return { r, v }
      },
      () => item('W-17', 'W-17-draft', W17, 'B', RULE_MODEL),
    ])
    results.design = d; results.w17 = w17
  }
  log(`phase B: W-15 ${w15 ? w15.status : 'none'}; design ${results.design && results.design.r ? results.design.r.status : 'none'}; W-17 draft ${results.w17 ? results.w17.status : 'none'}`)
}
if (ONLY.includes('verify')) {
  // the verifier reads every phase-A and phase-B result from disk, whichever run produced it
  const landed = [
    { id: 'W-12', result: 'docs/calibration/results/W-12.json (and W-12-fit.json)' },
    { id: 'W-16b', result: 'docs/calibration/results/W-16b.json' },
    { id: 'W-15', result: 'docs/calibration/results/W-15.json' },
    { id: 'design/m1-corrections-2', result: 'docs/validation/m1-corrections-2.json (and .verify.json)' },
    { id: 'W-17 draft', result: 'docs/calibration/results/W-17-draft.json' },
    { id: 'W-05b slot-27 addendum', result: 'docs/calibration/results/W-05b-slot27.json' },
  ]
  results.verify = landed.length ? await seat(verifyPrompt(landed), `m1/${VKEY}`, 'Verify', VERIFY_SCHEMA) : null
}
return results
