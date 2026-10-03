export const meta = {
  name: 'build-m0-waves',
  description: 'Build M0 in waves (J154, J160): per wave a steward opens the snapshot, each item is built by an Opus implementer and accepted by an independent Opus checker under M0.md section 3 (fix rounds on a fail), and the steward closes the wave with landed:verify, a commit and a push',
  phases: [
    { title: 'Open', detail: 'the steward takes the wave snapshot' },
    { title: 'Build', detail: 'one implementer seat per item, inside its owns' },
    { title: 'Check', detail: 'one independent checker per item, M0.md section 3; fix rounds on a fail' },
    { title: 'Close', detail: 'landed:verify over the wave, explicit-path commit, push (J158)' },
  ],
}

// args: { root, scratch, waves: [{ wave, items: [ids], alone? }], maxLanes (default 4), maxFixRounds (default 2) }
// The wave list comes from plat/docs/build/M0-work.json (the session extracts it; scripts cannot read files).
// Timing-phase waves (T, T-fix, T2) and the AFTER-M-1 waves are NOT run here: the session opens them by hand.
const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/waves'
const MODEL = ARGS.model || 'opus'
const MAX = ARGS.maxLanes || 4
const MAXFIX = ARGS.maxFixRounds || 2
const WAVES = ARGS.waves || []

let live = 0
const waiters = []
const gate = async (fn) => {
  while (live >= MAX) await new Promise((r) => waiters.push(r))
  live++
  try { return await fn() } finally { live--; const w = waiters.shift(); if (w) w() }
}
const seat = (prompt, label, phaseName, schema) => gate(() => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: MODEL }))

const CLEAN_ROOM = `CLEAN ROOM (§17.1 (1), binding): you are an IMPLEMENTER-SIDE seat. You read ONLY docs/ARCHITECTURE.md, docs/volumes/INDEX.md, the design volumes a milestone builds (M0 builds none), plat/ (and plat/docs/digest/ when it exists), published algorithm papers and the public documentation of adopted libraries. You NEVER open, list, grep or read research/, captures/, reference/, partitioned/, profiler/, docs/confidence/, docs/improvements/, docs/CONFIDENCE.md, docs/IMPROVEMENTS.md, docs/fable-review/, docs/retrovalidation/, docs/validation/ (the review records), docs/calibration/, docs/design/ or any findings, critic or red-team file — not even to search them; a citation in the design that points there is for traceability only and you do not follow it. No code from any other settlement generator is read, ported or paraphrased. THE FULL REFERENCE CORPUS IS PRESENT ON THIS MACHINE, so the firewall is physical: run every search, find and grep INSIDE plat/ or on named design files only — never a recursive search, find, du or ls from the project root or from docs/ — and never follow a symbolic link out of plat/. Sign plat/CLEAN-ROOM.md's seat ledger (seat, date, role, what you read) by the id rule of C-0104.`

const MACHINE = `THE MACHINE: the owner's MacBook Air, §12.1's reference machine (Apple M1 4P+4E, 16 GB, macOS 14.7.8, Node 24.12 arm64; Rosetta 2 for the x86-64 leg; Playwright's Chromium, Firefox and WebKit cached; outbound access to the npm registry, nodejs.org, www.netlib.org and prng.di.unimi.it). pnpm only as "corepack pnpm ..." (never installed globally). Up to four build seats share one working tree, and M-1's research-side seats (Chrome sessions, Python measurements) run on the machine too: never take or gate on a timing here — timing bars are measured only in the timing-phase waves the session opens; a timing a test prints is contended and informative only. Keep output small (logs to ${SCRATCH}/, truncated); stop and report if df -h /Users/cstokes shows under 1 GB free.`

const GROUND = `PROJECT (root ${ROOT}). PLAT is an original settlement map generator designed in docs/ARCHITECTURE.md; the build of milestone M0 (§16) runs in ${ROOT}/plat/ from the build spec plat/docs/build/M0.md and its machine-readable twin M0-work.json (the twin is the authority where they differ). THE OWNER'S STANDING RULES (J156): the design is a REFERENCE, NOT A CONTRACT — where it is unclear, the seat picks, appends a row to plat/docs/build/choices.md (id rule of C-0104) and names the test that holds it, and the tests judge; tangled features are STAGED (a stub is notBuilt('<milestone>') with a choices row or a §4b entry, never a silent TODO); no new design is added. ${MACHINE} ${CLEAN_ROOM}
WORKING RULES: run NO git command of any kind (the wave's steward commits); write only inside your item's owns plus the permitted appends of M0.md section 3 (a choices row, a CLEAN-ROOM row, C-0064's one index line, your landed record); save as you go; append a CHECKPOINT line to docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); when complete append "<date> <lane key> LANDED <files>" and return the structured result. RESUME RULE: if docs/lane-events.log has a LANDED line for your EXACT lane key and the files it names exist unchanged, return the structured result from them without redoing anything. CONTINUE RULE: if your files exist without that LANDED line, read them and your CHECKPOINT lines, keep what stands and continue from the first unfinished part.`

const BUILD_SCHEMA = { type: 'object', properties: { item: { type: 'string' }, status: { type: 'string', enum: ['ready-for-check', 'blocked'] }, files: { type: 'array', items: { type: 'string' } }, landed_record: { type: 'string' }, tests: { type: 'object', properties: { passed: { type: 'number' }, failed: { type: 'number' } }, required: ['passed', 'failed'] }, gates: { type: 'array', items: { type: 'object', properties: { command: { type: 'string' }, exit: { type: 'number' } }, required: ['command', 'exit'] } }, choices_rows: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['item', 'status', 'files', 'landed_record', 'tests', 'gates', 'choices_rows', 'notes'] }
const CHECK_SCHEMA = { type: 'object', properties: { item: { type: 'string' }, verdict: { type: 'string', enum: ['pass', 'fail'] }, report: { type: 'string' }, failing_lines: { type: 'array', items: { type: 'object', properties: { line: { type: 'string' }, evidence: { type: 'string' }, required_change: { type: 'string' } }, required: ['line', 'evidence', 'required_change'] } } }, required: ['item', 'verdict', 'report', 'failing_lines'] }
const STEWARD_SCHEMA = { type: 'object', properties: { wave: { type: 'string' }, action: { type: 'string' }, ok: { type: 'boolean' }, commit: { type: 'string' }, pushed: { type: 'boolean' }, unattributed: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['wave', 'action', 'ok', 'commit', 'pushed', 'unattributed', 'notes'] }

const buildPrompt = (id, wave, lane, fix) => `${GROUND}

LANE ${lane}. You are the IMPLEMENTER of item ${id} (wave ${wave}). Read first, whole: plat/docs/build/M0.md sections 0, 3 and 4 and the item's entry in section 2; the item in plat/docs/build/M0-work.json (owns, sections, builds, interfaces, defers, tests, exitBars, dependsOn, choices, checker, handsOver, needs); every design section it names, in full; every choices.md row it cites; plat/docs/build/checks/M0-spec-notes.md if it names your item; and the code of the items yours depends on (read their packages, never edit them). Then build exactly the item: its interfaces under the design's names, its tests (every listed test, plus the unit and property tests it adds), its bars marked here (a timing bar: build its harness and record shape only). Run the gates as M0.md section 3 lists them (install --frozen-lockfile, lint with its probe-red check, build, test for your package and your test files, your here-bars) until each exits 0. Write your landed record with corepack pnpm landed -- ${id} --lane ${lane} (and --touched for each file you edited), sign CLEAN-ROOM.md, and append choices rows for every deviation or open case you decided. Return ready-for-check only when every gate exits 0; blocked with the reason otherwise (a missing dependency of an earlier item, a design contradiction you could not decide inside J156).${fix ? ` THIS IS FIX ROUND ${fix.round}: the independent checker failed the item (plat/docs/build/checks/${id}.md) on these lines — fix every one, then re-run the failed lines and the item's whole test set: ${JSON.stringify(fix.lines)}` : ''}`

const checkPrompt = (id, wave, lane) => `${GROUND}

LANE ${lane}. You are the INDEPENDENT CHECKER of item ${id} (wave ${wave}); you are not its author and you change none of its files. Follow plat/docs/build/M0.md section 3 exactly — steps 1 to 5: read the brief whole (the item in M0-work.json, its entry in M0.md, every design section it names in full, the choices rows it cites and any its author appended, plat/docs/build/checks/M0-spec-notes.md where it names the item); read the code whole and attribute it with corepack pnpm landed:verify -- wave-${wave} --item ${id} (quote the output); run the gates and the item's here-bars yourself; go through the checklist line by line with quoted evidence; and write the verdict to plat/docs/build/checks/${id}.md (record your own files with corepack pnpm landed -- check-${id} --lane ${lane} --owns plat/docs/build/checks/${id}.md). Try to refute the item: a test that cannot fail, a bar silently narrowed, a stub without a milestone, a deviation without a choices row, a design clause with no test, a Math member outside the allowlist, a path outside plat/. Return pass only if every checklist line passes; fail with every failing line, its evidence and the required change.`

const stewardPrompt = (wave, action, items) => `${GROUND}

LANE build/steward-wave-${wave}-${action}. You are the WAVE STEWARD, acting for the session: the ONE seat allowed to run git, and only the commands below. ${action === 'open'
    ? `OPEN wave ${wave} (items ${JSON.stringify(items)}): run corepack pnpm snapshot -- wave-${wave} in plat/ and confirm plat/docs/build/landed/snapshots/wave-${wave}.json exists (if it already exists for this wave, keep it and say so). Run no git. Return ok with the snapshot path in notes.`
    : `CLOSE wave ${wave} (items ${JSON.stringify(items)}, all checked pass): run corepack pnpm landed:verify -- wave-${wave} in plat/ and quote it; list every unattributed path. If none: stage EXACTLY the files the wave's landed records and check records name, plus plat/docs/build/choices.md, plat/CLEAN-ROOM.md, plat/docs/build/landed/, plat/docs/build/checks/, any lockfile change a record names, and docs/lane-events.log — by explicit path, never git add -A, -u or a bare directory outside plat/ — check git diff --cached --stat shows nothing outside those, scan the staged diff for secrets (api keys, tokens, private keys), commit with the message "M0 wave ${wave} landed: ${items.join(', ')}" ending with the line "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>", and git push origin main (the owner's standing rule J158; never force). If anything is unattributed or the push is refused, commit nothing more, push nothing, and return ok false with the paths. Never touch research/, captures/ or docs/calibration/ (M-1's seats own them).`}`

const closingCheckPrompt = (id, wave, lane, prev) => `${GROUND}

LANE ${lane}. You are the CLOSING CHECKER of item ${id} (wave ${wave}), independent of its author, after two full checks and their fix rounds (the session's ruling J162: an adversarial checker can always find one more contrived escape, so the third check closes the item). (1) For each failing line of the previous check, listed here, re-run its evidence and confirm it is fixed, or report it as still failing: ${JSON.stringify(prev)}. (2) Re-run the gates of plat/docs/build/M0.md section 3 step 3 and landed:verify -- wave-${wave} --item ${id}, quoting the output. (3) A NEW finding fails the item ONLY if it is a blocker: a gate exits non-zero; an interface or test id the item lists is missing; a stub or shortcut on an honest code path without a notBuilt milestone and a choices row; a wrong result on an honest input; a clean-room breach; a path outside plat/. Every other new finding — a contrived or deliberate-writer escape, a further hardening test, a tightening of a claim — is NOT a fail: append it to plat/docs/build/checks/${id}-notes.md (one row: id, observation, suggested handling, the hardening milestone M4 unless it belongs earlier) and record that file with corepack pnpm landed -- check-${id}-notes --lane ${lane} --owns plat/docs/build/checks/${id}-notes.md. Write the verdict to plat/docs/build/checks/${id}.md as section 3 step 5 says. Return pass when (1) leaves nothing failing and (3) finds no blocker; otherwise fail with only those lines.`

const runItem = async (id, wave) => {
  let built = await seat(buildPrompt(id, wave, `build/${id}`, null), `build/${id}`, 'Build', BUILD_SCHEMA)
  if (!built || built.status === 'blocked') return { id, ok: false, why: built ? 'blocked: ' + built.notes.join('; ') : 'implementer returned nothing', built }
  let check = await seat(checkPrompt(id, wave, `check/${id}`), `check/${id}`, 'Check', CHECK_SCHEMA)
  let round = 0
  while (check && check.verdict === 'fail' && round < MAXFIX) {
    round++
    built = await seat(buildPrompt(id, wave, `build/${id}-fix${round}`, { round, lines: check.failing_lines }), `build/${id}-fix${round}`, 'Build', BUILD_SCHEMA)
    if (!built || built.status === 'blocked') return { id, ok: false, why: 'fix round blocked', built, check }
    if (round >= (ARGS.closingFrom || 99)) {
      const prev = check.failing_lines
      check = await seat(closingCheckPrompt(id, wave, `check/${id}-close-r${round}`, prev), `check/${id}-close-r${round}`, 'Check', CHECK_SCHEMA)
    } else {
      check = await seat(checkPrompt(id, wave, `check/${id}-r${round}`), `check/${id}-r${round}`, 'Check', CHECK_SCHEMA)
    }
  }
  return { id, ok: !!check && check.verdict === 'pass', rounds: round, built, check }
}

const done = []
for (const w of WAVES) {
  phase('Open')
  const opened = await seat(stewardPrompt(w.wave, 'open', w.items), `steward/wave-${w.wave}-open`, 'Open', STEWARD_SCHEMA)
  if (!opened || !opened.ok) { log(`wave ${w.wave}: snapshot failed; stopping`); return { done, stoppedAt: w.wave, opened } }
  const results = await parallel(w.items.map((id) => () => runItem(id, w.wave)))
  const failed = results.filter((r) => !r || !r.ok)
  log(`wave ${w.wave}: ${results.length - failed.length}/${results.length} items pass` + (failed.length ? `; failed: ${failed.map((r) => r ? r.id : '?').join(', ')}` : ''))
  if (failed.length) { done.push({ wave: w.wave, results }); return { done, stoppedAt: w.wave, failed } }
  const closed = await seat(stewardPrompt(w.wave, 'close', w.items), `steward/wave-${w.wave}-close`, 'Close', STEWARD_SCHEMA)
  done.push({ wave: w.wave, results: results.map((r) => ({ id: r.id, rounds: r.rounds })), closed })
  if (!closed || !closed.ok) { log(`wave ${w.wave}: close failed (unattributed or push refused); stopping`); return { done, stoppedAt: w.wave, closed } }
  log(`wave ${w.wave} landed: ${closed.commit}`)
}
return { done, stoppedAt: null }
