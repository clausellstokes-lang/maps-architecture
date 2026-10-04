export const meta = {
  name: 'm1-wave2',
  description: 'M-1 wave 2 (plan revision 3, closing check 2 pass): plan-fix-3 (tool and text fixes before programme 2), the NG chain, the design corrections DC-01..DC-35, the MFCG chain (W-03b only on the owner go), FTG programme 2 (only on the owner go) with W-05b and W-06 after it, the M0 hand-off draft, then one independent verifier',
  phases: [
    { title: 'Prep', detail: 'm1/plan-fix-3 and its independent check: the prefix rule, the label guard, checklist section I, water.step, stale text' },
    { title: 'NG', detail: 'W-11b, W-10b, W-22' },
    { title: 'Design', detail: 'DC-01..DC-35 applied to the design, then verified' },
    { title: 'MFCG', detail: 'W-01b (after plan-fix-3 and the design seat), the M0 hand-off draft, W-03b (owner go), W-07b, W-09, W-08, W-13, W-14' },
    { title: 'FTG', detail: 'programme 2 by workflows/25 (owner go; after W-01b so binds work), then W-05b and W-06' },
    { title: 'Verify', detail: 'one Opus verifier re-executes every landed item check' },
  ],
}

// args: { root, scratch, maxLanes (default 3), only: ['prep','ng','design','mchain','ftg','verify'], verifyKey }
// Research-side seats (§17.1): read research/, captures/, profiler/, docs/; write research/baselines/, docs/calibration/,
// captures/ (and the design seat docs/ARCHITECTURE.md, docs/volumes/, docs/validation/); never plat/. Site-touching steps
// (FTG programme 2, W-03b's one MFCG load) run only when docs/calibration/owner-go.json, written by the session from the
// owner's answer in chat, says so; a gate seat reads it when the branch reaches the step.
const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/m1w2'
const MODEL = ARGS.model || 'opus'
const RULE_MODEL = ARGS.ruleModel || 'fable'
const MAX = ARGS.maxLanes || 3
const ONLY = ARGS.only || ['prep', 'ng', 'design', 'mchain', 'ftg', 'verify']
const VKEY = ARGS.verifyKey || 'wave2-verify'
const FTG_SUFFIX = ARGS.ftgKeySuffix || '' // a re-run of programme 2 takes new lane keys (m1/W-02-slot<k><suffix>)
const PASS = ARGS.passSuffix || '' // W-05b / W-06 re-pass keys after a re-run of programme 2 (e.g. '-final')

let live = 0
const waiters = []
const gate = async (fn) => {
  while (live >= MAX) await new Promise((r) => waiters.push(r))
  live++
  try { return await fn() } finally { live--; const w = waiters.shift(); if (w) w() }
}
const seat = (prompt, label, phaseName, schema, model, effort) => gate(() => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: model || MODEL, effort }))
const ruledSeat = async (prompt, label, phaseName, schema) => {
  if (RULE_MODEL !== MODEL) {
    const r = await seat(prompt, label, phaseName, schema, RULE_MODEL)
    if (r) return r
    log(label + ': the ' + RULE_MODEL + ' seat returned nothing (limit or error); continuing on ' + MODEL + ' from its files')
  }
  return seat(prompt + ' STAND-IN NOTICE: you continue a ruling seat as an ' + MODEL + ' stand-in; head your record "' + MODEL + ' stand-in for the ' + RULE_MODEL + ' seat, PENDING FABLE REVIEW" and add a row to docs/FABLE-REVIEW-QUEUE.md.', label + '-standin', phaseName, schema, MODEL)
}

const GROUND = `PROJECT (root ${ROOT}). The Maps program designed PLAT, an original settlement map generator (docs/ARCHITECTURE.md and twelve volumes in docs/volumes/), and is building milestone M0 in plat/ while milestone M-1 (calibration and the clean-room inputs, §16) runs research-side. M-1's plan is docs/calibration/M-1-plan.md revision 3 with docs/calibration/M-1-work.json (the plan is authoritative where they differ), the rulings docs/calibration/M-1-rulings-1.md and M-1-rulings-2.md, the closing checks docs/calibration/results/plan-check-close-1.json and plan-check-close-2.json (PASS), and the notes for the wave-2 seats docs/calibration/M-1-plan-notes.md (sections 4 and 6 name items; read what names yours). Records are docs/calibration/E<nn>-*.md with results in docs/calibration/results/. THIS IS WAVE 2 (the work file's wave2 list). YOU ARE A RESEARCH-SIDE SEAT (§17.1): you may read research/ (patreon, devlogs, ftg-docs, external and reference-maps are symbolic links to /Users/cstokes/Desktop/research/; follow them), captures/, profiler/, docs/ and plat/'s docs (read only); you write only what your brief names (research/baselines/, docs/calibration/, new captures/ folders; the design seat its design files); you NEVER write into plat/ (the crossing is wave 3), never copy reference code, word lists, grammars, palettes, identifiers or content tables into any record (numbers, metric ids and our own words only), and never read a captured program bundle (captures/**/network/bodies/*.js). No seat touches a third-party site unless its brief says the owner's go is recorded in docs/calibration/owner-go.json and that file says so. THE OWNER'S STANDING RULES: decisions taken under the owner's delegation (J122) are recorded vetoably with their reason; the design is a reference during the build (J156); fix every finding now or rule it invalid, with no silent deferral. THE MACHINE: the owner's MacBook Air (Apple M1, 16 GB, Node 24, Python 3.9, Chrome); M0's four build seats run in plat/ at the same time and an FTG recording seat may drive a Chrome window: run no benchmark or timing, touch nothing in plat/, keep output small, stop under 1 GB free (df -h /Users/cstokes). GIT: run none that changes state; the session commits and pushes. plan.json and metrics.m-1.json are regenerated by research/baselines/plan.py, which two lanes touch in this wave (m1/W-01b and the FTG recording seats' binds): never hand-edit them; run plan.py --check after any write. WORKING RULES: save as you go; CHECKPOINT lines in docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); write your exact structured result as JSON to the result file your brief names, then append "<date> <lane key> LANDED <files>", and make your final message that JSON. RESUME RULE: if that result file exists and docs/lane-events.log has a LANDED line for your exact lane key, return the file's JSON without redoing anything. CONTINUE RULE: if your files exist without that LANDED line, read them and your CHECKPOINT lines, keep what stands and continue. Long output goes to ${SCRATCH}/ (make it). Report outcome first; label each conclusion CONFIRMED (executed or read) or PLAUSIBLE (reasoning only).`

const ITEM_SCHEMA = { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string', enum: ['landed', 'partial', 'blocked'] }, records: { type: 'array', items: { type: 'string' } }, outputs: { type: 'array', items: { type: 'string' } }, checks: { type: 'array', items: { type: 'object', properties: { check: { type: 'string' }, passed: { type: 'boolean' }, receipt: { type: 'string' } }, required: ['check', 'passed', 'receipt'] } }, rows: { type: 'number' }, owner_notes: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['id', 'status', 'records', 'outputs', 'checks', 'rows', 'owner_notes', 'notes'] }
const VERIFY_SCHEMA = { type: 'object', properties: { verdict: { type: 'string', enum: ['confirmed', 'refuted', 'partial'] }, items: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, verdict: { type: 'string', enum: ['confirmed', 'refuted', 'partial'] }, reexecuted: { type: 'array', items: { type: 'string' } }, problems: { type: 'array', items: { type: 'string' } } }, required: ['id', 'verdict', 'reexecuted', 'problems'] } } }, required: ['verdict', 'items'] }
const GO_SCHEMA = { type: 'object', properties: { exists: { type: 'boolean' }, ftg: { type: 'boolean' }, mfcg: { type: 'boolean' }, said: { type: 'string' } }, required: ['exists', 'ftg', 'mfcg', 'said'] }
const DC_SCHEMA = { type: 'object', properties: { applied: { type: 'array', items: { type: 'object', properties: { dc: { type: 'string' }, files: { type: 'array', items: { type: 'string' } }, status: { type: 'string', enum: ['applied', 'applied-adapted', 'already-true', 'invalid'] }, reason: { type: 'string' } }, required: ['dc', 'files', 'status', 'reason'] } }, m0_items_affected: { type: 'array', items: { type: 'object', properties: { dc: { type: 'string' }, items: { type: 'array', items: { type: 'string' } }, what_changes_for_them: { type: 'string' } }, required: ['dc', 'items', 'what_changes_for_them'] } }, doc_checks: { type: 'array', items: { type: 'object', properties: { doc: { type: 'string' }, exit: { type: 'number' } }, required: ['doc', 'exit'] } }, bundle: { type: 'string' }, record: { type: 'string' }, notes: { type: 'array', items: { type: 'string' } } }, required: ['applied', 'm0_items_affected', 'doc_checks', 'bundle', 'record', 'notes'] }
const HANDOFF_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, rows: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, items: { type: 'array', items: { type: 'string' } }, summary: { type: 'string' } }, required: ['id', 'items', 'summary'] } }, doc_checks_exit: { type: 'number' }, notes: { type: 'array', items: { type: 'string' } } }, required: ['file', 'rows', 'doc_checks_exit', 'notes'] }

// ---------- Prep: m1/plan-fix-3 (one area lane, five units, each with its own receipt) ----------
const fixPrompt = `${GROUND}

LANE m1/plan-fix-3. You fix, BEFORE programme 2 records anything and before m1/W-01b touches plan.py, what the two FTG verifiers and the closing check of plan revision 3 found (docs/calibration/results/W-02-signed-in-verify.json and W-02-signed-in-verifyb.json: the prefix rule; docs/calibration/M-1-plan-notes.md section 6, points 2, 4, 5 and 6). Five units, each with its own receipt, red first where it is code: (U1) research/baselines/ftg_capture_post.py: the water-implied resource class is a PREFIX rule, so a resource change passes requestDiff and vsSlot0 (the verifiers' red test: a scratch copy of slot 5's request with one resource replaced passes, exit 0). Pin the class to the exact leaves the water setting adds (the fishing entry and the six water-implied leaves E02 names), as R-24 pinned the size class: show the red test exit 0 before the fix and exit 1 after, and re-run --check-only on slots 0-5 (all 10/10 still). (U2) research/baselines/plan.py: R-36 guards only the first six labels; once a programme-2 slot is bound, an edit of its FTG_PREMIUM_SCHEDULE row silently relabels the capture (the closing check reproduced it on a scratch mirror). Make compute() refuse any change to a RECORDED slot's label, size or water against the prior plan.json (bound or failed slots, any programme), while striking or reordering unrecorded tail rows stays allowed; red first on a scratch mirror (the relabel writes with exit 0 before, is refused after); then plan.py --check SAME on the live files (do the edit on a scratch mirror and install plan.py by atomic rename; no slot is being bound now, but check the lane log first). (U3) research/baselines/ftg_capture_checklist.md: write SECTION I, programme 2's premium differences, from plan section 2.1b (1)-(10) in the checklist's own voice (site controls named as the checklist already names them, R-27), with THE RETRY RULE CORRECTED (note 4): retry a create only when the PUT did not return 200 AND the settlements list shows no new row; a PUT 200 with no new row is ambiguous and stops the run, reported, never retried; plus the first-of-size rule R-41 as a step list, the --fail-ftg path, the metropolis option only for slots 6-9 by its request value, and the post command with --signed-in --premium. Plan 2.1b (10) gave section I to the first programme-2 seat; it moves to this lane so every programme-2 seat reads the same procedure - record that change in the plan's changelog. (U4) water.step's bucket (note 5): §13.5's water row has the band column 'outline step <= 25 m', a fixed bound, so W-15 treats water.step like the fixed-band rows (the reference value sharpened, the band column kept) and water.riverWidth by the band rule per class; amend R-34 as ruling R-48 in a short addendum section of M-1-rulings-2.md (decided under J122, vetoable, with its reason) and apply it in M-1-plan.md and M-1-work.json. (U5) the text left behind (note 6), each by name: plan §2.2's last sentence and §9's 'freezes on the retry' row reworded as history; W-16b's depends gains W-02b and its inputs say the corpus after programme 2; M-1-work.json's D13, sampleRule.FTG, wave2[0] and the stale risks entry brought in line with the plan; W-03b's checker reads 'plan.py --vectors capture/MFCG/130/plain/10' (it prints the seed; --check prints SAME or DIFFERS only); plan §2.1b (1)'s and M-1-rulings-2.md's literal site-control labels reworded in our terms (the checklist keeps them, R-27; results/rulings-2.json stays as the seat's history). Leave metrics.m-1.json's variety.dispersion text to m1/W-01b (it regenerates that file) and note it in your result. Then run python3 docs/validation/bench/doc_checks.py --doc <each touched document> --heads docs/ARCHITECTURE.md and read every unreviewed hit (our own words only; no allow row for them). Record everything in docs/calibration/M-1-plan-fix-3.md. Result file: docs/calibration/results/plan-fix-3.json (status landed only when every unit's receipt passed).`

const fixCheckPrompt = (r) => `${GROUND}

LANE m1/plan-fix-3-check. You are the INDEPENDENT CHECKER of lane m1/plan-fix-3 (docs/calibration/M-1-plan-fix-3.md; result ${JSON.stringify({ status: r.status, checks: r.checks.length })}), separate from its author; you change none of its files. Re-execute and try to refute each unit: (U1) on a scratch copy, a request with any one resource leaf changed now fails requestDiff or vsSlot0 (try at least three different leaves, one of them the fishing entry's neighbour), and --check-only on slots 0-5 still passes 10/10; (U2) on a scratch mirror of research/baselines/, bind a programme-2 slot then edit its schedule row: refused; strike an unrecorded tail row: allowed; reorder the first six: refused; and plan.py --check SAME (EXPECTED STATE: since design/m1-corrections-1 edited V12 §3.4.2's catalogue at 20:24, plan.py refuses every write with a catalogue mismatch until m1/W-01b registers the new ids, which runs after you; so run U2's tests and --check on a scratch mirror holding the V12 copy from before that edit (plan-fix-3's record names it) or the catalogue check stubbed to the old ids, and report the live mismatch as expected, not as this lane's failure); (U3) checklist section I covers plan 2.1b (1)-(10) and the retry rule reads AND with the ambiguous case stopping; (U4) R-48 is recorded and applied in the plan and the work file and agrees with §13.5's water row; (U5) every point of M-1-plan-notes.md section 6 (6) is done or its reason recorded. Result file: docs/calibration/results/plan-fix-3-check.json (status landed if every unit holds; blocked with the failing units otherwise).`

// ---------- the items (the work file rows; the EXTRA lines carry the closing checks' notes) ----------
const EXTRA = {
  'W-01b': 'FIRST: the design seat design/m1-corrections-1 changed V12 §3.4.2\'s metric catalogue (DC edits: bldg.wallAlign became bldg.wallAlign.median and bldg.wallAlign.share15; cut.length added), so plan.py now refuses every write with "catalogue mismatch" and FTG programme 2 cannot bind slots until you register the current catalogue ids: do that first, with plan.py --check SAME on the live files as the receipt, and write a CHECKPOINT line saying the binds work again. Then: develop on a scratch mirror of research/baselines/ (closing-check note 3): plan.json has a second writer in this wave (the FTG recording seats bind slots with --bind-ftg), so install the new plan.py by ATOMIC RENAME between two binds (check docs/lane-events.log for a CHECKPOINT that says a create or bind is in progress, and wait for its LANDED line), regenerate at once, and compare the 28 FTG slots and their bindings against the LIVE plan.json read after the install. Regenerate metrics.m-1.json so variety.dispersion names W-15 (R-40) and not W-09 / W-05 or "minmax at n = 3", and its open list is empty. Keep m1/plan-fix-3\'s label guard (U2) intact.',
  'W-03b': 'THE OWNER\'S GO for this one automated page load of the public MFCG build on itch.io must be recorded in docs/calibration/owner-go.json with mfcg true: read it first and STOP (status blocked, nothing loaded) if it does not say so. Then exactly the row: the build-id check first (one public game-page fetch, logged as the same contact class); one load of index 10 = seedOf(capture/MFCG/130/plain, [10]) through the J161 tool after W-01b\'s --extend; downloads denied, files from the in-page Blob (E03 section 9); no login, account, payment, terms or consent; stop and report anything else a site asks. The seed is printed by plan.py --vectors capture/MFCG/130/plain/10. Count both ledgers.',
  'W-07b': 'All usable seeds of the sweep including W-03b\'s index 10 if it landed; if W-03b is blocked (no owner go), run on the usable seeds there are, list the missing index, and return partial.',
  'W-09': 'Vectors only (R-40): W-15 forms the dispersions.',
  'W-08': 'Rasterise locally with headless Chrome from the files on disk only: 0 network requests (the render log proves it).',
  'W-13': 'Seeded and reproducible; report the flip table and the outcome rule exactly as the row states.',
  'W-14': 'A ruling spike: decide the descriptive status by the row\'s rule and record the reasons vetoably.',
  'W-11b': '',
  'W-10b': 'The face-record writer puts referenceBuild on EVERY face and EVERY hood record as well as at the top of the candidate ng-faces file (closing-check note N-02: M0-k-05\'s loader refuses a face record without it), and every string in the file matches V12 §3.3 C2\'s patterns; numbers are integer cm and cm2 as plan section 7b names them.',
  'W-22': 'No colour value in the record.',
  'W-05b': 'Every bound slot of programmes 1 and 2 (read plan.json: bound, failed and open slots; measure the bound ones, list the others with their status); vectors only, no dispersion (R-40); the client scene time with its contention flag (R-47).',
  'W-06': 'The last pass: it postdates programme 2\'s close (R-47); every bound FTG payload.',
}
const itemPrompt = (id, key) => `${GROUND}

LANE m1/${key || id}. Your item is ${id} of docs/calibration/M-1-work.json (its row in M-1-plan.md section 2, and any note naming it in M-1-plan-notes.md sections 4 and 6): build its tool from the existing scripts the row names, run it, write its record, and run its checker column yourself as the receipt. ${EXTRA[id] || ''}${key && key !== id ? ` THIS IS A RE-PASS (lane ${key}): an earlier pass under lane m1/${id} (docs/calibration/results/${id}.json) ran before FTG programme 2 was recorded; read it, reuse what still holds (its tools and per-slot files for slots it measured, re-checked), and cover every slot bound now; append a re-pass section to the record rather than rewriting the earlier one.` : ''} Result file: docs/calibration/results/${key || id}.json. Return status landed only when every check in the row passed; partial or blocked otherwise, with the reason.`
const item = (id, phaseName, key) => seat(itemPrompt(id, key), `m1/${key || id}`, phaseName, ITEM_SCHEMA)

const goPrompt = (what) => `${GROUND}

LANE m1/owner-go-${what}. Read docs/calibration/owner-go.json (written by the session from the owner's own answer in chat; nothing else counts as the owner's go). Return exists false and both flags false if the file is absent or unreadable; otherwise return its ftg and mfcg booleans and its said text. Read nothing else; write nothing; append no line.`
const readGo = (what) => seat(goPrompt(what), `m1/owner-go-${what}`, what === 'ftg' ? 'FTG' : 'MFCG', GO_SCHEMA, MODEL, 'low')

const handoffPrompt = `${GROUND}

LANE m1/handoff-m0. Draft the hand-off rows the SESSION carries to M0's implementer side before M0 waves 11 and 13 (M-1-plan-notes.md section 2: N-01 to N-04; plan section 7, 7b, 7c; R-46): (N-01) one table of every row an AFTER-M-1 item of plat/docs/build/M0-work.json reads - metric id, unit, metricVersion and role - from the metrics.m-1.json W-01b just regenerated, for M0-k-05's METRICS registry; (N-02) plan section 7b's ng-faces schema whole (field names, units, which records carry referenceBuild: the top, every hood and every face) for M0-k-05's loadNgFaces, the string check restated as V12 §3.3 C2's patterns; (N-03) the request that M0-k-05's baselines:check gain a denylist.json file kind and that its colour check (M0's C3) reads a colour only inside a JSON string value, never inside a JSON number (integer cm2 areas and 16-hex digests otherwise trip it); (N-04) the 16-hex digest truncation as a header field digestHexDigits: 16 that M0-k-06's scanner must read and refuse when unknown, and W-20's planted-hit control. Write them as rows in the format of plat/docs/build/checks/M0-spec-notes.md (| id | item | observation | handling |), ids continuing after that file's last N-number, into docs/calibration/handoff-M0.md. THE TEXT CROSSES THE CLEAN-ROOM LINE, so it holds only our metric ids, units, field names, numbers we defined and our own words: no research/ or captures/ path (an opaque research: label at most), no reference word, name, palette value, identifier or measured reference number, nothing an implementer-side seat may not read under plat/CLEAN-ROOM.md. Run python3 docs/validation/bench/doc_checks.py --doc docs/calibration/handoff-M0.md --heads docs/ARCHITECTURE.md to exit 0 with every hit read. Result file: docs/calibration/results/handoff-m0.json.`

const dcPrompt = `${GROUND}

LANE design/m1-corrections-1. You are a DESIGN SEAT applying the measured design corrections M-1's ruling seats decided: DC-01 to DC-30 (docs/calibration/M-1-rulings-1.md, its design-corrections section) and DC-31 to DC-35 (M-1-rulings-2.md, its design-corrections section). Each DC names a section, the old number or sentence, the new one and the record that measured it: apply each exactly to docs/ARCHITECTURE.md and docs/volumes/ (V12 for most). Where the text no longer reads as the DC quotes (the coherence pass and the clean-room fix of 2026-10-03 changed wording), apply the DC's intent and say so (applied-adapted); where the design already says it, already-true; a DC that would add new design rather than correct a measured value or definition is ruled invalid with the reason (J156's feature freeze), never applied. No reference word, name, palette value or identifier enters the design (§17.1). Back up every document to ${SCRATCH}/backup/ before its first edit. For EACH DC list the M0 items whose sections (plat/docs/build/M0-work.json, the sections field; read only) include the changed section, and what changes for them, so the session can carry it to the build side. Then run python3 docs/validation/bench/doc_checks.py on every touched document (and the base whole) until each exits 0 with no new allow row for our own words, and regenerate docs/ARCHITECTURE-FULL.md with python3 tools/bundle_architecture.py. Write docs/validation/m1-corrections-1.md (each DC: section, before, after, the measuring record, status). Result file: docs/validation/m1-corrections-1.json.`

const dcVerifyPrompt = (r) => `${GROUND}

LANE design/m1-corrections-1-verify. You are the INDEPENDENT VERIFIER of the design corrections (docs/validation/m1-corrections-1.md; result ${JSON.stringify({ applied: r.applied.length, affected: r.m0_items_affected.length })}). Re-execute and try to refute: every DC of both rulings files is listed with a status; each applied DC's new text is in the design exactly where the DC says, and the backup diff shows no change outside the DCs' hunks; every applied-adapted and invalid status has a reason that holds; no reference word, name or identifier entered (grep the new hunks against the corpus via doc_checks.py); doc_checks.py exits 0 on every touched document; tools/bundle_architecture.py --check says the bundle is current; the M0-affected list is complete (grep M0-work.json's sections for every changed section yourself). Result file: docs/validation/m1-corrections-1.verify.json (verdict confirmed, partial or refuted; items one per DC that has a problem, or one summary item).`

const verifyPrompt = (landed) => `${GROUND}

LANE m1/${VKEY}. You are the INDEPENDENT VERIFIER of M-1 wave 2, separate from every seat that built it. For each item below, read its record and result file, then RE-EXECUTE its checker column yourself from the saved scripts and data - do not trust the receipts - and try to refute each claimed pass. Run nothing that touches a third-party site. Items: ${JSON.stringify(landed)}. Result file: docs/calibration/results/${VKEY}.json.`

// ---------- the branches ----------
const results = {}
let prepOk = null
const prepPromise = (async () => {
  if (!ONLY.includes('prep') && !ONLY.includes('mchain') && !ONLY.includes('ftg')) return null
  const r = await seat(fixPrompt, 'm1/plan-fix-3', 'Prep', ITEM_SCHEMA)
  results.planFix3 = r
  if (!r || r.status !== 'landed') { log('plan-fix-3: ' + (r ? r.status : 'no result') + '; the MFCG and FTG branches wait'); prepOk = false; return false }
  const c = await seat(fixCheckPrompt(r), 'm1/plan-fix-3-check', 'Prep', ITEM_SCHEMA)
  results.planFix3Check = c
  prepOk = !!c && c.status === 'landed'
  log('plan-fix-3: landed; independent check ' + (c ? c.status : 'none'))
  return prepOk
})()

// The design seat edits V12's metric catalogue, which plan.py checks on every write, so W-01b (which registers the
// catalogue's ids in plan.py) runs after both the prep lane and the design seat, and FTG programme 2 binds only after W-01b.
const designPromise = (async () => {
  if (!ONLY.includes('design') && !ONLY.includes('mchain') && !ONLY.includes('ftg')) return null
  const r = await seat(dcPrompt, 'design/m1-corrections-1', 'Design', DC_SCHEMA)
  const v = r ? await seat(dcVerifyPrompt(r), 'design/m1-corrections-1-verify', 'Design', VERIFY_SCHEMA) : null
  results.design = r; results.designVerify = v
  if (r) log(`design corrections: ${r.applied.filter((a) => a.status.startsWith('applied')).length} applied of ${r.applied.length}; verify ${v ? v.verdict : 'none'}`)
  return r
})()
const w01bPromise = (async () => {
  if (!ONLY.includes('mchain') && !ONLY.includes('ftg')) return null
  const ok = await prepPromise
  const d = await designPromise
  if (!ok || !d) { log('W-01b: waiting on plan-fix-3 and the design seat; not run'); return null }
  const w = await item('W-01b', 'MFCG')
  if (!w || w.status === 'blocked') log('W-01b blocked; the MFCG chain and FTG programme 2 stop')
  return w
})()

const branches = []
if (ONLY.includes('ng')) branches.push(async () => {
  const [chain, w22] = await parallel([
    async () => { const a = await item('W-11b', 'NG'); const b = (a && a.status !== 'blocked') ? await item('W-10b', 'NG') : null; return [a, b] },
    () => item('W-22', 'NG'),
  ])
  results.ng = [...(chain || []), w22].filter(Boolean)
})
if (ONLY.includes('mchain')) branches.push(async () => {
  const w01b = await w01bPromise
  results.mchain = [w01b].filter(Boolean)
  if (!w01b || w01b.status === 'blocked') return
  const [ho, rest] = await parallel([
    () => seat(handoffPrompt, 'm1/handoff-m0', 'MFCG', HANDOFF_SCHEMA),
    async () => {
      const go = await readGo('mfcg')
      if (!go || !go.mfcg) { log('W-03b: no owner go for the MFCG load (owner-go.json); the chain from W-03b waits for a later run'); return [] }
      const w03b = await item('W-03b', 'MFCG')
      const w07b = await item('W-07b', 'MFCG')
      const w09 = (w07b && w07b.status !== 'blocked') ? await item('W-09', 'MFCG') : null
      const tail = w09 && w09.status !== 'blocked' ? await parallel([
        () => item('W-08', 'MFCG'),
        () => item('W-13', 'MFCG'),
        () => ruledSeat(itemPrompt('W-14'), 'm1/W-14', 'MFCG', ITEM_SCHEMA),
      ]) : []
      return [w03b, w07b, w09, ...tail]
    },
  ])
  results.handoff = ho
  results.mchain.push(...(rest || []).filter(Boolean))
})
if (ONLY.includes('ftg')) branches.push(async () => {
  const w01b = await w01bPromise
  if (!w01b || w01b.status === 'blocked') { log('FTG programme 2: waiting on W-01b (plan.py binds); not run'); return }
  const go = await readGo('ftg')
  if (!go || !go.ftg) { log('FTG programme 2: no owner go (owner-go.json); not run in this run'); return }
  const slots = Array.from({ length: 22 }, (_, k) => k + 6)
  const p2 = await workflow({ scriptPath: ROOT + '/workflows/25-ftg-signed-in.js' }, { root: ROOT, scratch: SCRATCH + '/ftg', slots, keySuffix: FTG_SUFFIX, programme: 2, premium: true })
  results.ftgProgramme2 = p2
  const took = p2 && p2.results ? p2.results.filter(Boolean) : []
  log(`FTG programme 2: ${took.filter((x) => x.status === 'landed').length} landed, ${took.filter((x) => x.status === 'failed').length} failed of ${slots.length}; verify ${p2 && p2.verify ? 'done' : 'none'}`)
  const w05b = await item('W-05b', 'FTG', PASS ? 'W-05b' + PASS : undefined)
  const w06 = await item('W-06', 'FTG', PASS ? 'W-06' + PASS : undefined)
  results.ftg = [w05b, w06].filter(Boolean)
})
await parallel(branches)
await prepPromise
await designPromise
await w01bPromise

if (ONLY.includes('verify')) {
  const all = [results.planFix3, ...(results.ng || []), ...(results.mchain || []), ...(results.ftg || [])].filter(Boolean)
  const landed = all.filter((r) => r.status !== 'blocked').map((r) => ({ id: r.id, status: r.status, records: r.records, outputs: r.outputs }))
  if (results.handoff) landed.push({ id: 'handoff-m0', status: 'landed', records: [results.handoff.file], outputs: [] })
  results.verify = landed.length ? await seat(verifyPrompt(landed), `m1/${VKEY}`, 'Verify', VERIFY_SCHEMA) : null
}
return results
