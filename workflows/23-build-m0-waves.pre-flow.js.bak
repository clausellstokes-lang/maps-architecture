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

// args: { root, scratch, waves: [{ wave, items: [ids], alone?, custom? }], maxLanes (default 4), maxFixRounds (default 2), closingFrom, note }
// args.deps { id: [dependsOn] } (from M0-work.json) and args.noPull [ids] enable EARLY STARTS: while a wave's items are in
// build, check or fix rounds and a seat is free, an item of the NEXT numeric wave whose every dependency has passed its
// check (or lies in an earlier wave) starts inside the current wave - it lands against the current wave's snapshot
// (C-0121: an item landing in a wave before its own owns its files as at its own wave) and the current wave's close
// waits for it and commits it. Never into or out of a custom wave; never an item in noPull (items that need a session
// hand-off before they start, e.g. M0-k-05, M0-k-06). M0-work.json's wave rule: a failed item's fix round holds its
// dependents only.
// A wave with custom: 'vendor-flatbush' is a session-routed seat outside M0-work.json (J162's N1): its own build and check briefs below, same open/close.
// The wave list comes from plat/docs/build/M0-work.json (the session extracts it; scripts cannot read files).
// Timing-phase waves (T, T-fix, T2) and the AFTER-M-1 waves are NOT run here: the session opens them by hand.
const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/waves'
const MODEL = ARGS.model || 'opus'
const MAX = ARGS.maxLanes || 4
const MAXFIX = ARGS.maxFixRounds || 2
const CLOSING_FROM = Object.fromEntries((ARGS.waves || []).filter((w) => w.closingFrom).map((w) => [w.wave, w.closingFrom])) // per-wave override (a wave already in flight keeps its old rule)
const WAVES = ARGS.waves || []

let live = 0
const waiters = []
let onRelease = null // the pull hook (below): a freed seat may start a ready item of the next wave
// A freed seat goes first to a waiting check or steward (they close items and waves and unblock early starts), then to
// a waiting build, in arrival order within each class (2026-10-04: a finished build's check had queued behind a new build).
const gate = async (fn, prio) => {
  while (live >= MAX) await new Promise((r) => waiters.push({ r, prio: prio || 0 }))
  live++
  try { return await fn() } finally {
    live--
    let k = waiters.findIndex((x) => x.prio === 0)
    if (k < 0 && waiters.length) k = 0
    if (k >= 0) waiters.splice(k, 1)[0].r()
    else if (onRelease) onRelease()
  }
}
const seat = (prompt, label, phaseName, schema) => gate(() => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: MODEL }), phaseName === 'Build' ? 1 : 0)

const CLEAN_ROOM = `CLEAN ROOM (§17.1 (1), binding): you are an IMPLEMENTER-SIDE seat. You read ONLY docs/ARCHITECTURE.md, docs/volumes/INDEX.md, the design volumes a milestone builds (M0 builds none), plat/ (and plat/docs/digest/ when it exists), published algorithm papers and the public documentation of adopted libraries. You NEVER open, list, grep or read research/, captures/, reference/, partitioned/, profiler/, docs/confidence/, docs/improvements/, docs/CONFIDENCE.md, docs/IMPROVEMENTS.md, docs/fable-review/, docs/retrovalidation/, docs/validation/ (the review records), docs/calibration/, docs/design/ or any findings, critic or red-team file — not even to search them; a citation in the design that points there is for traceability only and you do not follow it. No code from any other settlement generator is read, ported or paraphrased. THE FULL REFERENCE CORPUS IS PRESENT ON THIS MACHINE, so the firewall is physical: run every search, find and grep INSIDE plat/ or on named design files only — never a recursive search, find, du or ls from the project root or from docs/ — and never follow a symbolic link out of plat/. Sign plat/CLEAN-ROOM.md's seat ledger (seat, date, role, what you read) by the id rule of C-0104.`

const MACHINE = ARGS.machine ? `THE MACHINE: ${ARGS.machine}` : `THE MACHINE: the owner's MacBook Air, §12.1's reference machine (Apple M1 4P+4E, 16 GB, macOS 14.7.8, Node 24.12 arm64; Rosetta 2 for the x86-64 leg; Playwright's Chromium, Firefox and WebKit cached; outbound access to the npm registry, nodejs.org, www.netlib.org and prng.di.unimi.it). pnpm only as "corepack pnpm ..." (never installed globally). Up to four build seats share one working tree, and M-1's research-side seats (Chrome sessions, Python measurements) run on the machine too: never take or gate on a timing here — timing bars are measured only in the timing-phase waves the session opens; a timing a test prints is contended and informative only. Keep output small (logs to ${SCRATCH}/, truncated); stop and report if df -h /Users/cstokes shows under 1 GB free. MEMORY (the owner's Mac ran out of application memory on 2026-10-04 at about 02:00 with four seats each running parallel test and mutation sweeps; J168): 16 GB are shared by every seat, the owner's apps and an FTG recording browser, so give EVERY vitest run --maxWorkers=2 (for example corepack pnpm test -- --maxWorkers=2, or corepack pnpm exec vitest run --maxWorkers=2 <files>), run at most ONE test process at a time (never several vitest runs or scratch mirrors in parallel), run mutation sweeps one mutant after another with --maxWorkers=1, delete a scratch mirror's node_modules when you finish with it, and before any big run check memory_pressure: if it reports under 25 % free, wait and re-check rather than start. A gate's verdict does not depend on the worker count. MUTATION TESTING (J169, the owner's yes on 2026-10-04): mutants are TARGETED - at most about forty, each aimed at a promise the item states (an interface's contract, a listed test's claim, a refusal, a bar) or at a failing line being fixed; never an exhaustive sweep of hundreds; an equivalent survivor needs no test, only a one-line note.`

const NOTE = ARGS.note ? ` SESSION NOTE: ${ARGS.note}` : ''

const GROUND = `PROJECT (root ${ROOT}).${NOTE} PLAT is an original settlement map generator designed in docs/ARCHITECTURE.md; the build of milestone M0 (§16) runs in ${ROOT}/plat/ from the build spec plat/docs/build/M0.md and its machine-readable twin M0-work.json (the twin is the authority where they differ). THE OWNER'S STANDING RULES (J156): the design is a REFERENCE, NOT A CONTRACT — where it is unclear, the seat picks, appends a row to plat/docs/build/choices.md (id rule of C-0104) and names the test that holds it, and the tests judge; tangled features are STAGED (a stub is notBuilt('<milestone>') with a choices row or a §4b entry, never a silent TODO); no new design is added. ${MACHINE} ${CLEAN_ROOM}
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
    : `CLOSE wave ${wave} (items ${JSON.stringify(items)}, all checked pass): run corepack pnpm landed:verify -- wave-${wave} in plat/ and quote it; list every unattributed path. If none: stage EXACTLY the files the wave's landed records and check records name, plus plat/docs/build/choices.md, plat/CLEAN-ROOM.md, plat/docs/build/landed/, plat/docs/build/checks/, any lockfile change a record names, and docs/lane-events.log — by explicit path, never git add -A, -u or a bare directory outside plat/ — check git diff --cached --stat shows nothing outside those, scan the staged diff for secrets (api keys, tokens, private keys), commit with the message "M0 wave ${wave} landed: ${items.join(', ')}" ending with the line "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>", and git push origin main (the owner's standing rule J158, re-confirmed in this session's chat on 2026-10-04 ~02:10: "save all your progress to github"; never force). If anything is unattributed or the push is refused, commit nothing more, push nothing, and return ok false with the paths. Never touch research/, captures/ or docs/calibration/ (M-1's seats own them).`}`

const closingCheckPrompt = (id, wave, lane, prev) => `${GROUND}

LANE ${lane}. You are the CLOSING CHECKER of item ${id} (wave ${wave}), independent of its author, after its first full check and that check's fix round (the rulings J162 and J169: the first check is the critical one and an adversarial checker can always find one more contrived escape, so from wave 3v on the item's SECOND check closes it). (1) For each failing line of the previous check, listed here, re-run its evidence and confirm it is fixed, or report it as still failing: ${JSON.stringify(prev)}. (2) Re-run the gates of plat/docs/build/M0.md section 3 step 3 and landed:verify -- wave-${wave} --item ${id}, quoting the output. (3) A NEW finding fails the item ONLY if it is a blocker: a gate exits non-zero; an interface or test id the item lists is missing; a stub or shortcut on an honest code path without a notBuilt milestone and a choices row; a wrong result on an honest input; a clean-room breach; a path outside plat/. Every other new finding — a contrived or deliberate-writer escape, a further hardening test, a tightening of a claim — is NOT a fail: append it to plat/docs/build/checks/${id}-notes.md (one row: id, observation, suggested handling, the hardening milestone M4 unless it belongs earlier) and record that file with corepack pnpm landed -- check-${id}-notes --lane ${lane} --owns plat/docs/build/checks/${id}-notes.md. Write the verdict to plat/docs/build/checks/${id}.md as section 3 step 5 says. Return pass when (1) leaves nothing failing and (3) finds no blocker; otherwise fail with only those lines.`

const VENDOR_FACTS = `THE ROUTED FIX (J162; plat/docs/build/checks/M0-d-07-notes.md row N1; choices row C-0126 (5)): flatbush 4.6.2 computes this.nodeSize ** level in _collectContained, reached from search (plat/vendor/flatbush@4.6.2/index.js near line 300; flatbush.js near line 341, the UMD build). The operator ** is implementation-approximated by the language, which §6.5 (3) refuses in anything the model runs; the fix §6.5 (4) names is a patch BEFORE ADOPTION, and M0-a-03 writes the flatbush adapter in wave 4, so it lands now, between waves 3 and 4, as its own wave labelled 3v. The patched bytes must compute the same integer by exact repeated multiplication (or an equivalent exact product) for every level the search reaches, in both builds, and change nothing else in the library.`

const vendorBuildPrompt = (wave, lane, fix) => `${GROUND}

LANE ${lane}. You are the IMPLEMENTER of the session-routed VENDOR PATCH vendor-flatbush (wave ${wave}). ${VENDOR_FACTS} Read first, whole: plat/docs/build/M0.md sections 0 and 3 and its vendor paragraphs (the layout table rows for vendor/ and tools/vendor/, §6.5 (3)-(4) as M0.md applies them); choices rows C-0007, C-0010, C-0011, C-0055, C-0126, C-0128 and C-0131 in plat/docs/build/choices.md; plat/docs/build/checks/M0-d-07-notes.md; the two existing patches in plat/vendor/patches/ and how plat/tools/vendor/{import,common,verify}.mjs apply, hash and verify a patch against plat/vendor/vendor.lock.json; plat/tools/lint/vendor-scan.mjs (its REVIEWED exceptions and how a patch is recorded in plat/packages/kernel/vendor-audit.json) and its tests. Then: (1) write plat/vendor/patches/flatbush@4.6.2.json in the existing patches' format (a spec naming the exact text replaced in each build file and its exact replacement), apply it the way the tooling applies patches so the vendored files carry it, and update vendor.lock.json's post-patch hashes; (2) close the reviewed exception: remove flatbush's REVIEWED entries for the power in vendor-scan.mjs, record the patch as the audit's patch exception with its choices row and the adapter it serves, and regenerate vendor-audit.json with node tools/lint/vendor-scan.mjs --write; (3) tests: the vendor-scan test that expects flatbush with its reviewed exceptions now expects the patched library to pass with no open exception, a fixture or case proves the unpatched text still fails on the power, and a property test (seeded, deterministic) proves the patched search returns the same ids as a brute-force box filter and as the unpatched module for random trees of several node sizes and depths (load the unpatched text from the lock's tarball or a fixture copy; never from the network at test time); (4) append one choices row (the next free C-number by the id rule of C-0104) recording the patch and that it closes C-0126 (5) and N1; sign CLEAN-ROOM.md. ATTRIBUTION: the patch, the lock and the vendored files are M0-s-01's owns, and the scan and audit are M0-d-07's: write the records with corepack pnpm landed -- M0-s-01 --lane ${lane} --wave wave-${wave} and corepack pnpm landed -- M0-d-07 --lane ${lane} --wave wave-${wave} (a re-landing replaces those items' records for this wave, as a fix round's does; their earlier records stay in git history); if the tool refuses, read its message and pick the narrowest attribution it accepts, recording the choice in your choices row. Gates until each exits 0: corepack pnpm install --frozen-lockfile, lint (vendor-scan ok with no open exception), build, test (the tools project and the whole tree), vendor:verify, notices:check, and landed:verify -- wave-${wave} --item M0-s-01 and --item M0-d-07. Return ready-for-check with item vendor-flatbush only when every gate exits 0.${fix ? ` THIS IS FIX ROUND ${fix.round}: the independent checker failed the patch (plat/docs/build/checks/vendor-flatbush.md) on these lines — fix every one, then re-run the failed lines and every gate: ${JSON.stringify(fix.lines)}` : ''}`

const vendorCheckPrompt = (wave, lane) => `${GROUND}

LANE ${lane}. You are the INDEPENDENT CHECKER of the session-routed VENDOR PATCH vendor-flatbush (wave ${wave}); you are not its author and you change none of its files. ${VENDOR_FACTS} Check, with quoted evidence: (1) the patch file's spec replaces exactly the power in both build files and nothing else — diff the patched vendored files against the library's published 4.6.2 tarball bytes the lock pins (corepack pnpm vendor:verify, and your own diff in ${SCRATCH}/check-vendor-flatbush/); (2) the replacement is exact for every level the search can reach (reason it out and test it: integer node sizes 2 to 64 and every depth a tree of up to 10^6 items reaches); (3) the scan reports no open exception for flatbush, the reviewed entries are gone, the audit records the patch with its choices row, and vendor-audit.json equals a fresh node tools/lint/vendor-scan.mjs run; (4) the new tests can fail — revert the patch in a scratch copy and watch the scan test and the equality test go red, then restore; (5) the gates of M0.md section 3 step 3 (install --frozen-lockfile, lint with probe-red, build, test), vendor:verify, notices:check, and landed:verify -- wave-${wave} --item M0-s-01 and --item M0-d-07 all exit 0; (6) the choices row exists and C-0126 (5) and N1 are answered; no path outside plat/. Write the verdict to plat/docs/build/checks/vendor-flatbush.md and record it with corepack pnpm landed -- check-vendor-flatbush --lane ${lane} --owns plat/docs/build/checks/vendor-flatbush.md. Return item vendor-flatbush, pass only if every line passes; fail with every failing line, its evidence and the required change.`

const runVendor = async (wave) => {
  let built = await seat(vendorBuildPrompt(wave, 'build/vendor-flatbush', null), 'build/vendor-flatbush', 'Build', BUILD_SCHEMA)
  if (!built || built.status === 'blocked') return { id: 'vendor-flatbush', ok: false, why: built ? 'blocked: ' + built.notes.join('; ') : 'implementer returned nothing', built }
  let check = await seat(vendorCheckPrompt(wave, 'check/vendor-flatbush'), 'check/vendor-flatbush', 'Check', CHECK_SCHEMA)
  let round = 0
  while (check && check.verdict === 'fail' && round < MAXFIX) {
    round++
    built = await seat(vendorBuildPrompt(wave, `build/vendor-flatbush-fix${round}`, { round, lines: check.failing_lines }), `build/vendor-flatbush-fix${round}`, 'Build', BUILD_SCHEMA)
    if (!built || built.status === 'blocked') return { id: 'vendor-flatbush', ok: false, why: 'fix round blocked', built, check }
    const closing = round >= (CLOSING_FROM[wave] || ARGS.closingFrom || 99)
      ? ` CLOSING CHECK (J162): the previous check failed on ${JSON.stringify(check.failing_lines)}; confirm each is fixed and re-run the gates; a NEW finding fails the patch only if it is a blocker (a gate exits non-zero, a wrong result on an honest input, a byte of the library changed beyond the power, a path outside plat/); every other new finding goes as a row to plat/docs/build/checks/vendor-flatbush-notes.md (recorded with corepack pnpm landed -- check-vendor-flatbush-notes --lane check/vendor-flatbush-close-r${round} --owns plat/docs/build/checks/vendor-flatbush-notes.md) for M4.`
      : ''
    const ck = closing ? `check/vendor-flatbush-close-r${round}` : `check/vendor-flatbush-r${round}`
    check = await seat(vendorCheckPrompt(wave, ck) + closing, ck, 'Check', CHECK_SCHEMA)
  }
  return { id: 'vendor-flatbush', ok: !!check && check.verdict === 'pass', rounds: round, built, check }
}

// A wave entry may carry done: [ids] (items that already passed their checks in an earlier run: skipped, counted passed)
// and resume: { id: { round, lines } } (the owner's cut-off, 2026-10-04: "i would allow another round after this one but
// anything more and we move on"): start that item at fix round <round> with the listed failing lines, then a closing check;
// at most ONE more fix round and closing check after that; if the item still fails, its open lines are written to
// checks/<id>-notes.md by a notes seat and the item is accepted CUT OFF so the build moves on.
const RESUME_AT = Object.fromEntries((ARGS.waves || []).flatMap((w) => Object.entries(w.resume || {}).map(([id, r]) => [id, r])))
const CUT = ' CUT-OFF (the owner, 2026-10-04): this item gets at most two more fix rounds in all. Fix exactly the listed lines with the smallest test change that pins each promise; if an earlier attempt under this lane key left a broader mutation sweep in progress, stop it and keep only what the listed lines need (targeted mutants, J169).'
const CONFIRM = ' CONFIRM-ONLY (the owner, 2026-10-04: when the fix is added tests, the re-check only confirms them): for each listed line, re-introduce the fault it describes in a scratch copy (the mutant or edit the earlier check used) and confirm the new test now fails on it and passes without it; then run the gates once. Do NOT search for new findings beyond the listed lines and the gates; pass when every listed line is pinned and the gates exit 0.'
const notesPrompt = (id, wave, lines) => `${GROUND}

LANE check/${id}-cutoff-notes. The owner cut item ${id} off after its allowed fix rounds (2026-10-04: at most one more round, then move on). Append each of these still-open lines as a row to plat/docs/build/checks/${id}-notes.md (one row: id, observation, suggested handling, milestone M4 unless it belongs earlier; say plainly that the owner's cut-off accepted the item with this line open), record the file with corepack pnpm landed -- check-${id}-cutoff-notes --lane check/${id}-cutoff-notes --owns plat/docs/build/checks/${id}-notes.md (if that path is already declared by another record of this wave, re-land that record's id instead and say so), run no git, change no other file. Lines: ${JSON.stringify(lines)}. Return verdict pass with the rows written in report.`
const runResumed = async (id, wave, r) => {
  const CUTX = r.cutoff === false ? ' RESUMED after a stalled seat (2026-10-04): continue this fix round from your files and CHECKPOINT lines; targeted mutants (J169).' : CUT
  let lines = r.lines
  let check = null
  for (let k = 0; k < 2; k++) {
    const round = r.round + k
    const built = await seat(buildPrompt(id, wave, `build/${id}-fix${round}`, { round, lines }) + CUTX, `build/${id}-fix${round}`, 'Build', BUILD_SCHEMA)
    if (!built || built.status === 'blocked') return { id, ok: false, why: 'cut-off fix round blocked', built }
    check = await seat(closingCheckPrompt(id, wave, `check/${id}-close-r${round}`, lines) + CONFIRM, `check/${id}-close-r${round}`, 'Check', CHECK_SCHEMA)
    if (check && check.verdict === 'pass') return { id, ok: true, rounds: round, built, check }
    lines = check ? check.failing_lines : lines
  }
  if (r.cutoff === false) { log(`${id}: still failing after two closing rounds; stopping for the session (J169: a real defect is never cut off)`); return { id, ok: false, rounds: r.round + 1, check } }
  log(`${id}: still failing after the owner's allowed rounds; cut off with its open lines written to notes`)
  const notes = await seat(notesPrompt(id, wave, lines), `check/${id}-cutoff-notes`, 'Check', CHECK_SCHEMA)
  return { id, ok: true, rounds: r.round + 1, check, cutOff: true, notes }
}

const runItem = async (id, wave) => {
  if (RESUME_AT[id]) return runResumed(id, wave, RESUME_AT[id])
  let built = await seat(buildPrompt(id, wave, `build/${id}`, null), `build/${id}`, 'Build', BUILD_SCHEMA)
  if (!built || built.status === 'blocked') return { id, ok: false, why: built ? 'blocked: ' + built.notes.join('; ') : 'implementer returned nothing', built }
  let check = await seat(checkPrompt(id, wave, `check/${id}`), `check/${id}`, 'Check', CHECK_SCHEMA)
  let round = 0
  while (check && check.verdict === 'fail' && round < MAXFIX) {
    round++
    built = await seat(buildPrompt(id, wave, `build/${id}-fix${round}`, { round, lines: check.failing_lines }), `build/${id}-fix${round}`, 'Build', BUILD_SCHEMA)
    if (!built || built.status === 'blocked') return { id, ok: false, why: 'fix round blocked', built, check }
    if (round >= (CLOSING_FROM[wave] || ARGS.closingFrom || 99)) {
      const prev = check.failing_lines
      check = await seat(closingCheckPrompt(id, wave, `check/${id}-close-r${round}`, prev), `check/${id}-close-r${round}`, 'Check', CHECK_SCHEMA)
    } else {
      check = await seat(checkPrompt(id, wave, `check/${id}-r${round}`), `check/${id}-r${round}`, 'Check', CHECK_SCHEMA)
    }
  }
  return { id, ok: !!check && check.verdict === 'pass', rounds: round, built, check }
}

const DEPS = ARGS.deps || {}
const NOPULL = ARGS.noPull || []
const passed = new Set()
const done = []
for (let wi = 0; wi < WAVES.length; wi++) {
  const w = WAVES[wi]
  if (!w.items.length) { log(`wave ${w.wave}: every item started early in the wave before; nothing left`); continue }
  phase('Open')
  const opened = await seat(stewardPrompt(w.wave, 'open', w.items), `steward/wave-${w.wave}-open`, 'Open', STEWARD_SCHEMA)
  if (!opened || !opened.ok) { log(`wave ${w.wave}: snapshot failed; stopping`); return { done, stoppedAt: w.wave, opened } }
  let results
  if (w.custom === 'vendor-flatbush') {
    results = [await runVendor(w.wave)]
  } else {
    const next = WAVES[wi + 1]
    const earlier = new Set(WAVES.slice(0, wi).flatMap((x) => x.items))
    const canPull = next && !next.custom && !w.custom && Object.keys(DEPS).length > 0
    const members = [...w.items]
    const running = []
    let open = true
    const track = (id) => {
      const p = runItem(id, w.wave).then((r) => { if (r && r.ok) passed.add(id); if (open) tryPull(); return r })
      running.push(p)
    }
    const ready = (id) => !NOPULL.includes(id) && (DEPS[id] || []).every((d) => passed.has(d) || earlier.has(d) || (!members.includes(d) && !next.items.includes(d) && !WAVES.slice(wi + 2).some((x) => x.items.includes(d))))
    const tryPull = () => {
      if (!canPull || !open || live >= MAX) return
      const pick = next.items.find((id) => ready(id))
      if (!pick) return
      next.items = next.items.filter((id) => id !== pick)
      members.push(pick)
      log(`wave ${w.wave}: ${pick} (wave ${next.wave}) starts early on a free seat; it lands and commits with wave ${w.wave}`)
      track(pick)
    }
    onRelease = tryPull
    for (const id of (w.done || [])) { passed.add(id) }
    w.items.filter((id) => !(w.done || []).includes(id)).forEach((id) => track(id))
    // wait for every member, including items pulled while earlier members ran (a pull is pushed before the
    // promise that triggered it resolves, so an empty tail means nothing more can start in this wave)
    let seen = 0
    while (seen < running.length) {
      const batch = running.slice(seen)
      seen = running.length
      await Promise.all(batch)
    }
    open = false
    onRelease = null
    results = [...(w.done || []).map((id) => ({ id, ok: true, rounds: 'earlier run' })), ...(await Promise.all(running))]
    w.items = members
  }
  const failed = results.filter((r) => !r || !r.ok)
  log(`wave ${w.wave}: ${results.length - failed.length}/${results.length} items pass` + (failed.length ? `; failed: ${failed.map((r) => r ? r.id : '?').join(', ')}` : ''))
  if (failed.length) { done.push({ wave: w.wave, results }); return { done, stoppedAt: w.wave, failed } }
  const closed = await seat(stewardPrompt(w.wave, 'close', w.items), `steward/wave-${w.wave}-close`, 'Close', STEWARD_SCHEMA)
  done.push({ wave: w.wave, results: results.map((r) => ({ id: r.id, rounds: r.rounds })), closed })
  if (!closed || !closed.ok) { log(`wave ${w.wave}: close failed (unattributed or push refused); stopping`); return { done, stoppedAt: w.wave, closed } }
  log(`wave ${w.wave} landed: ${closed.commit}`)
}
return { done, stoppedAt: null }
