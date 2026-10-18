export const meta = {
  name: 'm1-rulings-3',
  description: 'M-1 rulings round 3 (J171): a Fable ruling seat on S-V12-1 (no extra loads), the D28 draw-row family, the scanner / deny-list question N-26 and F5; then a research apply seat (registry rename water.channelWidth, W-15 held rows, W-17 entries) beside a design apply seat (the stale 39 m quotes and any DC the ruling writes); then one independent check',
  phases: [
    { title: 'Rule', detail: 'Fable ruling seat (Opus stand-in fallback)' },
    { title: 'Apply', detail: 'research apply and design apply, in parallel' },
    { title: 'Check', detail: 'one independent Opus checker' },
  ],
}

// args: { root, scratch, maxLanes (default 2) }
const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/m1r3'
const MODEL = ARGS.model || 'opus'
const RULE_MODEL = ARGS.ruleModel || 'fable' // J210 (owner 2026-10-05 ~23:20: "feel free to use fable now where appropriate"; J190 lifted)
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

const GROUND = `PROJECT (root ${ROOT}). The Maps program designed PLAT (docs/ARCHITECTURE.md, docs/volumes/) and builds milestone M0 in plat/ while milestone M-1 (calibration and the clean-room inputs, §16) runs research-side: plan docs/calibration/M-1-plan.md revision 3 with M-1-work.json; rulings M-1-rulings-1.md and M-1-rulings-2.md (with addenda R-48, R-49); the notes docs/calibration/M-1-plan-notes.md (section 7 lists this round's inputs; read it whole); records E<nn>-*.md and results in docs/calibration/results/. Wave 3's phases A and B landed: W-12 (E12), W-16b (E16 §9), W-15 (E15; partial: 13 rows held), design/m1-corrections-2 (docs/validation/m1-corrections-2.md, its verifier partial), W-17's digest draft (docs/digest-candidate/), and the wave verifier results/wave3-verify-ab.json (read it). THE OWNER'S DECISION J171 (docs/PROGRESS.md): no extra MFCG loads for S-V12-1. YOU ARE A RESEARCH-SIDE SEAT (the design seat writes the design): read research/, captures/, docs/ and plat/'s docs (read only); write only what your brief names; never write into plat/; never copy reference code, word lists, grammars, palettes, identifiers or content tables into any record or the design; touch no website. Decisions under the owner's delegation (J122) are recorded vetoably with their reason; fix every finding now or rule it invalid; the design gains no new design (J156) beyond what a measurement or a ruling here requires. THE MACHINE: the owner's Mac; M0's four build seats run beside you: no benchmark, any vitest run --maxWorkers=2, one heavy process at a time, stop under 1 GB free disk or while memory_pressure reports under 25 % free. GIT: none that changes state. WORKING RULES: CHECKPOINT lines in docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); write your exact structured result as JSON to the result file your brief names, then append "<date> <lane key> LANDED <files>", and make your final message that JSON. RESUME RULE: a result file plus a LANDED line for your exact lane key means return the file's JSON. CONTINUE RULE: files without that line mean continue from them. Long output to ${SCRATCH}/ (make it). Label conclusions CONFIRMED or PLAUSIBLE.`

const SCHEMA = { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string', enum: ['landed', 'partial', 'blocked'] }, records: { type: 'array', items: { type: 'string' } }, checks: { type: 'array', items: { type: 'object', properties: { check: { type: 'string' }, passed: { type: 'boolean' }, receipt: { type: 'string' } }, required: ['check', 'passed', 'receipt'] } }, design_corrections: { type: 'array', items: { type: 'string' } }, carry_rows: { type: 'array', items: { type: 'string' } }, owner_notes: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['id', 'status', 'records', 'checks', 'design_corrections', 'carry_rows', 'owner_notes', 'notes'] }

const rulePrompt = `${GROUND}

LANE m1/rulings-3. You are the M-1 RULING SEAT, round 3. Read the round's inputs whole (M-1-plan-notes.md section 7; E13 whole with its F1-F3; E15 and results/W-15.json; results/wave3-verify-ab.json; docs/validation/m1-corrections-2.md and its verify file; V12 §8.3 and §3.5; plat/docs/build/M0-work.json's M0-k-05 and M0-k-06 items and M0.md's baselines:check text, read only). RULE, each with its reason and the record that measured it, vetoable (J122), as R-50 onward in docs/calibration/M-1-rulings-3.md: (1) S-V12-1 under J171 (no extra loads): E13 F2 shows the pre-decided remedy cannot satisfy the test; restate the test, the remedy or both (V12 §8.3 (1)) so the outcome follows from the measured evidence - for example a stability criterion relative to the band's own sampling uncertainty, or the affected rows' bands widened or marked by a stated rule - and say exactly which MFCG rows change role, band or note, writing any V12 change as a DC for the design seat (DC-39 onward); (2) F1: D28's eight MFCG draw rows have no registered sample family (R-03): rule the family and the plan.py block, or rule the rows descriptive, with W-15's append instructions; (3) N-26: before W-20 crosses baselines.json, either M0's scanner reads crossing JSON by string values only or the deny-list drops number-only 3-grams - rule which (the clean-room and the false-positive cost both weighed) and write the spec-notes row text the session carries to M0-k-05 / M0-k-06 (implementer-safe: our words, field names, design sections; numbered N-26); (4) F5: write the row text for M0-k-05 (the union family, stress rows keyed by sample.family's options segment, n-0 rows listing every member in failed), numbered N-31; (5) D13 (C10 reads a crossing file's strings and keys, not its numbers): record the flag for the owner's veto as R-14 was. Result file: docs/calibration/results/rulings-3.json (carry_rows: the exact rows for the session; design_corrections: the DCs).`

const researchApplyPrompt = (r) => `${GROUND}

LANE m1/round3-apply. Apply round 3 research-side (rulings: docs/calibration/M-1-rulings-3.md; result ${JSON.stringify({ status: r.status, dcs: r.design_corrections.length })}): (a) the registry rename F2: water.riverWidth became water.channelWidth in V12 (design/m1-corrections-2), so make plan.py's catalogue twin and metrics.m-1.json carry water.channelWidth (on a scratch mirror; install by atomic rename; plan.py --check SAME after, and its catalogue check passing on today's V12), then have W-15's tools (the sole writers rows.py, bands.py, cross_check.py, R-47) append the five held channel-width rows to the candidate baselines.json and re-run C1-C10; (b) apply the rulings' row effects: S-V12-1's restated test or remedy on the MFCG rows (roles, bands or notes as R-50 says), D28's eight draw rows as the ruling says, through the same tools, re-running C1-C10 and the T-V12 fixtures; (c) W-17's digest draft (docs/digest-candidate/): entry (6) states the applied deep test (thickness > 0.6 x the band plot depth) and the MFCG preset entry, and the bent-cut entry carries sigma 0.084 / 0.094; run doc_checks.py on each touched entry; (d) the wave verifier's W-15 notes (results/wave3-verify-ab.json): E15's T-V12-28 line reads 'passes under D13 (vetoable); fails whole-text until N-26 is ruled' (or the plain result once N-26 is ruled and applied), and N-26's hit count is restated as the verifier measured it; W-17 entries 4 and 6 state the applied deep test (0.6 x) and call the section 7.6 changes applied (with J-2's extension), not routed. Update E15 with a round-3 section. Result file: docs/calibration/results/round3-apply.json.`

const designApplyPrompt = (r) => `${GROUND}

LANE design/m1-corrections-3. You are a DESIGN SEAT. Apply by amendment: (1) the verifier's record-completeness misses (docs/validation/m1-corrections-2.verify.json): FTG's old 39 m tower spacing is still quoted as the current reference in the base §4.8 S7 Towers (near l. 8419), in §15.2's O8 row (c) evidence tag (near l. 21462) and in V11 (near l. 3485) - restate each with E15 entry 45's re-measured value in the form the corrected O6 / O17 tags use; (2) the verifier's record-wording notes (results/wave3-verify-ab.json, design/m1-corrections-2 item): O6 / O17 / O19 are section 15.2 rows, not section 16, and the calibration-target list is section 0.3 - correct docs/validation/m1-corrections-2.md accordingly; (3) the design corrections round 3's ruling wrote (${JSON.stringify(r.design_corrections)}). Back up each document to ${SCRATCH}/backup/ before its first edit; change nothing else; list for each change the M0 items whose sections include it (plat/docs/build/M0-work.json, read only) and what changes for them; doc_checks.py on every touched document to exit 0 with no new allow row for our words; regenerate docs/ARCHITECTURE-FULL.md with python3 tools/bundle_architecture.py. Append a 'Round 3' section to docs/validation/m1-corrections-2.md. Result file: docs/validation/m1-corrections-3.json.`

const checkPrompt = `${GROUND}

LANE m1/round3-check. You are the INDEPENDENT CHECKER of rulings round 3 (docs/calibration/M-1-rulings-3.md, results/rulings-3.json, results/round3-apply.json, docs/validation/m1-corrections-3.json), separate from every seat that made them. Re-execute and try to refute: each ruling is recorded with its reason, its measuring record and its vetoable mark, and S-V12-1's restatement follows from E13's numbers (recompute at least one row's verdict under the new rule); plan.py --check SAME and its catalogue check passing with water.channelWidth; the candidate baselines.json carries the five channel-width rows and the ruled D28 rows and passes C1-C10 (re-run cross_check.py yourself); the W-17 entries carry 0.6 x and 0.084 / 0.094; the design's three 39 m quotes are restated and nothing else moved (diff against the backups); doc_checks.py exits 0 on every touched design document and the bundle is current (tools/bundle_architecture.py --check); the carry rows N-26 and N-31 are implementer-safe (our words, field names and design sections only). Result file: docs/calibration/results/round3-check.json (status landed if everything holds; partial with the problems otherwise).`

const r = await ruledSeat(rulePrompt, 'm1/rulings-3', 'Rule', SCHEMA)
if (!r || r.status === 'blocked') return { rulings: r }
const [ra, da] = await parallel([
  () => seat(researchApplyPrompt(r), 'm1/round3-apply', 'Apply', SCHEMA),
  () => seat(designApplyPrompt(r), 'design/m1-corrections-3', 'Apply', SCHEMA),
])
const c = await seat(checkPrompt, 'm1/round3-check', 'Check', SCHEMA)
log(`round 3: rulings ${r.status}; research apply ${ra ? ra.status : 'none'}; design apply ${da ? da.status : 'none'}; check ${c ? c.status : 'none'}`)
return { rulings: r, researchApply: ra, designApply: da, check: c }
