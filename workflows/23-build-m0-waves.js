export const meta = {
  name: 'build-m0-waves',
  description: 'Build M0 in waves (J154, J160): per wave a steward opens the snapshot, each item is built by an Opus implementer and accepted by an independent Opus checker under M0.md section 3 (fix rounds on a fail), and the steward closes the wave with landed:verify, a commit and a push',
  phases: [
    { title: 'Open', detail: 'the steward takes the wave snapshot' },
    { title: 'Build', detail: 'one implementer seat per item, inside its owns' },
    { title: 'Check', detail: 'one independent checker per item, M0.md section 3; fix rounds on a fail' },
    { title: 'Close', detail: 'landed:verify over the wave, explicit-path commit, push (J158)' },
    { title: 'Integrate', detail: 'flow mode (J173): one integration check per stage group once all its items passed' },
    { title: 'Commit', detail: 'flow mode (J173): the steward commits and pushes checked work every few passed items' },
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
// FLOW MODE (J173; the owner, 2026-10-04: "Do that after this current one"): args.flow = { label, groups: [{ group, items }],
// done: [ids], resume: { id: { round, lines, cutoff } }, hold: [ids], est: { id: hours }, commitEvery } replaces the
// wave loop. ONE snapshot (label) for the whole run; an item starts the moment every item it depends on has passed its
// check (no stage barrier); a free seat goes to (0) the steward, (1) a check or fix of an item another item of the run
// still depends on, or a group's integration check, (2) a build, (3) a check or fix of a LEAF (nothing in the run
// depends on it: its check waits for spare seats and the end), each class by the longest chain of estimated hours still
// hanging on the item; when every item of a group (a former wave) has passed, one INTEGRATION CHECK reads the group's
// pieces together (blockers only; one fix per implicated item, then a confirm-only re-check); the steward commits and
// pushes checked work every commitEvery passed items (append files cut to their checked lines) and closes at the end.
// A failed item holds its own dependents only; everything else continues. hold: items that start only once every
// earlier group has passed (the old noPull, for an item still waiting on a session hand-off).
const ARGS = (typeof args === 'object' && args) ? args : {}
const FLOW = ARGS.flow || null
const LBL = (wave) => (FLOW ? FLOW.label : `wave-${wave}`)
const WTXT = (wave) => (FLOW ? `stage group ${wave} of the flow ${FLOW.label}; no stage barrier, J173` : `wave ${wave}`)
let PRI = () => [] // flow mode sets it: [class, rank] per item and seat kind
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/waves'
const MODEL = ARGS.model || 'opus'
const MAX = ARGS.maxLanes || 4
const MAXFIX = ARGS.maxFixRounds || 2
const CLOSING_FROM = Object.fromEntries((ARGS.waves || []).filter((w) => w.closingFrom).map((w) => [w.wave, w.closingFrom])) // per-wave override (a wave already in flight keeps its old rule)
const WAVES = ARGS.waves || []

let live = 0
const waiters = []
let wseq = 0
let onRelease = null // the pull hook (below): a freed seat may start a ready item of the next wave
// A freed seat goes first to a waiting check or steward (they close items and waves and unblock early starts), then to
// a waiting build, in arrival order within each class (2026-10-04: a finished build's check had queued behind a new build).
// Flow mode adds classes and a rank (lower class first, then higher rank, then arrival). A freed seat is HANDED to the
// chosen waiter (live stays the same), so a newcomer can never take it between the release and the waiter's wake-up.
const better = (a, b) => (a.cls !== b.cls ? a.cls < b.cls : a.rank !== b.rank ? a.rank > b.rank : a.seq < b.seq)
const gate = async (fn, cls, rank) => {
  if (live >= MAX) await new Promise((r) => waiters.push({ r, cls: cls || 0, rank: rank || 0, seq: wseq++ }))
  else live++
  try { return await fn() } finally {
    if (waiters.length) {
      let k = 0
      for (let i = 1; i < waiters.length; i++) if (better(waiters[i], waiters[k])) k = i
      waiters.splice(k, 1)[0].r()
    } else {
      live--
      if (onRelease) onRelease()
    }
  }
}
// J187 (the owner, 2026-10-05: "the optimal and most efficient combination without dropping quality ... with the appropriate
// effort level"): builders, checkers and integration checks think at high effort; the steward runs a staging script, medium.
const EFFORT = (label) => (label.startsWith('steward/') ? 'medium' : 'high')
const seat = (prompt, label, phaseName, schema, cls, rank) => gate(() => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: MODEL, effort: EFFORT(label) }), cls !== undefined ? cls : (phaseName === 'Build' ? 1 : 0), rank || 0)

const CLEAN_ROOM = `CLEAN ROOM (§17.1 (1), binding): you are an IMPLEMENTER-SIDE seat. You read ONLY docs/ARCHITECTURE.md, docs/volumes/INDEX.md, the design volumes a milestone builds (M0 builds none), plat/ (and plat/docs/digest/ when it exists), published algorithm papers and the public documentation of adopted libraries. You NEVER open, list, grep or read research/, captures/, reference/, partitioned/, profiler/, docs/confidence/, docs/improvements/, docs/CONFIDENCE.md, docs/IMPROVEMENTS.md, docs/fable-review/, docs/retrovalidation/, docs/validation/ (the review records), docs/calibration/, docs/design/ or any findings, critic or red-team file — not even to search them; a citation in the design that points there is for traceability only and you do not follow it. No code from any other settlement generator is read, ported or paraphrased. THE FULL REFERENCE CORPUS IS PRESENT ON THIS MACHINE, so the firewall is physical: run every search, find and grep INSIDE plat/ or on named design files only — never a recursive search, find, du or ls from the project root or from docs/ — and never follow a symbolic link out of plat/. Sign plat/CLEAN-ROOM.md's seat ledger (seat, date, role, what you read) by the id rule of C-0104.`

const SEAT_RULES = `MEMORY (J168; J170 keeps it in every brief): the seats share one machine, so give EVERY vitest run --maxWorkers=2 (for example corepack pnpm test --maxWorkers=2 (never put -- before vitest flags: vitest ignores every flag after it, J182), or corepack pnpm exec vitest run --maxWorkers=2 <files>), run at most ONE test process at a time (never several vitest runs or scratch mirrors in parallel), run mutation sweeps one mutant after another with --maxWorkers=1, delete a scratch mirror's node_modules when you finish with it, and before any big run check free memory (memory_pressure on macOS, free -m on Linux): under about a quarter free, wait and re-check rather than start. A gate's verdict does not depend on the worker count. MUTATION TESTING (J169, the owner's yes on 2026-10-04): mutants are TARGETED - at most about forty, each aimed at a promise the item states (an interface's contract, a listed test's claim, a refusal, a bar) or at a failing line being fixed; never an exhaustive sweep of hundreds; an equivalent survivor needs no test, only a one-line note.`
const TEST_SCOPE = `TEST SCOPE (J179, the owner on 2026-10-05: "localize the tests and only do a full test run at the end of a phase"): a builder, a fixer and an item checker (first or closing) run the test gate LOCALLY, as M0.md section 3 step 3 already words it: corepack pnpm test --project <package> --maxWorkers=2 (no -- before the flags, J182) for each package whose files the item created or changed (testkit: also the item's packages/testkit/test/<package>/<folder>/), plus --project <p> for every workspace package that imports a package in which the item changed a file that existed before it (a new file breaks no one else's tests), plus the item's own test files and its here-bars; install --frozen-lockfile, lint with its probe-red check and build stay whole (they are fast). NEVER run the whole workspace suite (a bare corepack pnpm test) in a build, fix or item-check seat. The WHOLE suite runs only where a phase ends: in every integration check and integration re-check (lane check/integration-...) and at the flow's close, which keep their gates exactly as their briefs state. A red test outside your local scope that you happen to see is a note for the session, not your gate.`
const MACHINE = ARGS.machine ? `THE MACHINE: ${ARGS.machine} ${SEAT_RULES} ${TEST_SCOPE}` : `THE MACHINE: the owner's MacBook Air, §12.1's reference machine (Apple M1 4P+4E, 16 GB, macOS 14.7.8, Node 24.12 arm64; Rosetta 2 for the x86-64 leg; Playwright's Chromium, Firefox and WebKit cached; outbound access to the npm registry, nodejs.org, www.netlib.org and prng.di.unimi.it). pnpm only as "corepack pnpm ..." (never installed globally). Up to four build seats share one working tree, and M-1's research-side seats (Chrome sessions, Python measurements) run on the machine too: never take or gate on a timing here — timing bars are measured only in the timing-phase waves the session opens; a timing a test prints is contended and informative only. Keep output small (logs to ${SCRATCH}/, truncated); stop and report if df -h /Users/cstokes shows under 1 GB free. MEMORY (the owner's Mac ran out of application memory on 2026-10-04 at about 02:00 with four seats each running parallel test and mutation sweeps; J168): 16 GB are shared by every seat, the owner's apps and an FTG recording browser, so give EVERY vitest run --maxWorkers=2 (for example corepack pnpm test --maxWorkers=2 (never put -- before vitest flags: vitest ignores every flag after it, J182), or corepack pnpm exec vitest run --maxWorkers=2 <files>), run at most ONE test process at a time (never several vitest runs or scratch mirrors in parallel), run mutation sweeps one mutant after another with --maxWorkers=1, delete a scratch mirror's node_modules when you finish with it, and before any big run check memory_pressure: if it reports under 25 % free, wait and re-check rather than start. A gate's verdict does not depend on the worker count. MUTATION TESTING (J169, the owner's yes on 2026-10-04): mutants are TARGETED - at most about forty, each aimed at a promise the item states (an interface's contract, a listed test's claim, a refusal, a bar) or at a failing line being fixed; never an exhaustive sweep of hundreds; an equivalent survivor needs no test, only a one-line note. ${TEST_SCOPE}`

const NOTE = ARGS.note ? ` SESSION NOTE: ${ARGS.note}` : ''

const GROUND = `PROJECT (root ${ROOT}).${NOTE} PLAT is an original settlement map generator designed in docs/ARCHITECTURE.md; the build of milestone M0 (§16) runs in ${ROOT}/plat/ from the build spec plat/docs/build/M0.md and its machine-readable twin M0-work.json (the twin is the authority where they differ). THE OWNER'S STANDING RULES (J156): the design is a REFERENCE, NOT A CONTRACT — where it is unclear, the seat picks, appends a row to plat/docs/build/choices.md (id rule of C-0104) and names the test that holds it, and the tests judge; tangled features are STAGED (a stub is notBuilt('<milestone>') with a choices row or a §4b entry, never a silent TODO); no new design is added. ${MACHINE} ${CLEAN_ROOM}
WORKING RULES: run NO git command of any kind (the wave's steward commits); write only inside your item's owns plus the permitted appends of M0.md section 3 (a choices row, a CLEAN-ROOM row, C-0064's one index line, your landed record); save as you go; append a CHECKPOINT line to docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); when complete append "<date> <lane key> LANDED <files>" and return the structured result. RESUME RULE: if docs/lane-events.log has a LANDED line for your EXACT lane key and the files it names exist unchanged, return the structured result from them without redoing anything. CONTINUE RULE: if your files exist without that LANDED line, read them and your CHECKPOINT lines, keep what stands and continue from the first unfinished part.`

const BUILD_SCHEMA = { type: 'object', properties: { item: { type: 'string' }, status: { type: 'string', enum: ['ready-for-check', 'blocked'] }, files: { type: 'array', items: { type: 'string' } }, landed_record: { type: 'string' }, tests: { type: 'object', properties: { passed: { type: 'number' }, failed: { type: 'number' } }, required: ['passed', 'failed'] }, gates: { type: 'array', items: { type: 'object', properties: { command: { type: 'string' }, exit: { type: 'number' } }, required: ['command', 'exit'] } }, choices_rows: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['item', 'status', 'files', 'landed_record', 'tests', 'gates', 'choices_rows', 'notes'] }
const CHECK_SCHEMA = { type: 'object', properties: { item: { type: 'string' }, verdict: { type: 'string', enum: ['pass', 'fail'] }, report: { type: 'string' }, failing_lines: { type: 'array', items: { type: 'object', properties: { line: { type: 'string' }, evidence: { type: 'string' }, required_change: { type: 'string' } }, required: ['line', 'evidence', 'required_change'] } } }, required: ['item', 'verdict', 'report', 'failing_lines'] }
const STEWARD_SCHEMA = { type: 'object', properties: { wave: { type: 'string' }, action: { type: 'string' }, ok: { type: 'boolean' }, commit: { type: 'string' }, pushed: { type: 'boolean' }, unattributed: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['wave', 'action', 'ok', 'commit', 'pushed', 'unattributed', 'notes'] }

const selfCheck = (id, lane, fix) => {
  const mirror = `${SCRATCH}/selfcheck-${lane.replace(/\//g, '-')}`
  const MIRROR = `Use ONE mirror for this lane at ${mirror}/plat (outside ${ROOT}, never under plat/: vitest would run a copy there in other seats' gates). Build it as a real copy: cp -a ${ROOT}/plat ${mirror}/ (node_modules included; pnpm's links are relative and stay inside the copy); before the first mutant prove isolation: find ${mirror} -type l -lname '${ROOT}*' prints nothing and realpath of a workspace dependency under ${mirror}/plat/packages/<package>/node_modules/@plat/ starts with ${mirror}. Mutate ONLY files in the mirror, never in the shared tree (other seats import your files); restore each mutated file by copying it back from plat/ and confirm with cmp -s before the next mutant. Run each mutant in the foreground as corepack pnpm exec vitest run --maxWorkers=1 --bail=1 <the item's own test folder, B-FUZZ included> from ${mirror}/plat, never while another test run of yours is live, checking free memory first (SEAT_RULES). When done, rm -rf ${mirror}. Under the CONTINUE RULE, delete any mirror left at this path (it may hold a live mutant), rebuild it and skip only the mutants your CHECKPOINT lines record as finished.`
  return fix
    ? ` SELF-CHECK IN THIS FIX ROUND (J183): do NOT run the full self-check. For each failing line, re-introduce the fault the check names (its mutant or probe) in a scratch mirror, confirm your new or changed test fails on it and passes without it, then run the gates. ${MIRROR} Write one CHECKPOINT line "self-check (fix): <line ids> pinned".`
    : ` SELF-CHECK BEFORE HAND-IN (J183; the owner on 2026-10-05: "Have builders check their own work before handing it in"): 25 of the first 29 first checks failed, mostly on tests that could not catch a break. So once your code is complete and your gates are green, and BEFORE you write your landed record and your LANDED line, check your own work the way the independent checker will. (1) List the item's stated promises: each listed interface's contract, each listed test's claim, each refusal, each here-bar, each clause of every design section the item names (read in full), each choices row you wrote, and each duty an earlier item hands to yours. (2) Rank them by risk (the clauses most likely untested first) and mutate the lines that keep each the way a checker would, one mutant at a time: drop or zero each input the promise says enters the result, move each bound or count by one in BOTH directions, swap each ordering or tie-break. ${MIRROR} A mutant survives only if it survives the item's whole own test set. (3) A survivor on a stated promise means no test can fail on it: write the test the design asks for IN YOUR OWNS IN plat/ (never only in the mirror), copy it into the mirror, and re-run until the mutant is killed. If that test FAILS on your real code, the code is wrong: fix it to the design, or, if you chose that reading on purpose, append a choices row naming the section, the choice and the test. Never alter the code to hide a mutant. An equivalent mutant needs a one-line reason. (4) PROBES in the mirror: run the scenarios the named design sections describe, including ones that combine your feature with what earlier items built, and check the RESULT (through the oracle or validator), not only that it runs; assert the CONTENT of every handed-over duty or field a consumer reads, never toBeDefined; confirm each fixture's precondition still holds at the step under test and each measurement covers all it claims. (5) Wherever your code picks a reading of an unclear clause, confirm a choices row names the section, the choice and the test. (6) Budget: at most about twenty-five mutants and one probe file, about forty-five minutes of wall clock in all (J169's cap of about forty still applies); stop at the budget and name the promises you did not reach. Write a CHECKPOINT line every few mutants ("self-check: M01 killed, M02 survived -> test strengthened in <file>, ...") and a final one "self-check: N mutants, K killed, E equivalent, tests strengthened: <files>; not reached: <promises>", and put the same summary in your result's notes. Then re-run the gates on the strengthened tests and write the landed record and LANDED line; if any file changes after the record, re-run corepack pnpm landed for it and landed:verify --item ${id} before you return. The self-check writes nothing outside your owns and the permitted appends (a strengthened or added test lies in your owns and goes into your landed record like any other file; the mirror lives only in ${SCRATCH}), and it changes nothing about the gates, the checker's probes or J180's blocker list (the owner: "the independent check stays exactly as strict").`
}
const NOT_EVIDENCE = (id) => ` The author's self-check (its CHECKPOINT lines and result notes, J183) is neither evidence nor a map: do not read it before you have planned your own probes; plan and run your own targeted mutants and probes exactly as before, in your own mirror under ${SCRATCH}/check-${id}/, never the author's ${SCRATCH}/selfcheck-* folder. An author's 'equivalent' label never reclassifies a survivor: you judge equivalence yourself, and a survivor on a stated promise you do not find equivalent stays a BLOCKER.`

const buildPrompt = (id, wave, lane, fix) => `${GROUND}

LANE ${lane}. You are the IMPLEMENTER of item ${id} (${WTXT(wave)}). Read first, whole: plat/docs/build/M0.md sections 0, 3 and 4 and the item's entry in section 2; the item in plat/docs/build/M0-work.json (owns, sections, builds, interfaces, defers, tests, exitBars, dependsOn, choices, checker, handsOver, needs); every design section it names, in full; every choices.md row it cites; plat/docs/build/checks/M0-spec-notes.md if it names your item; and the code of the items yours depends on (read their packages, never edit them). Then build exactly the item: its interfaces under the design's names, its tests (every listed test, plus the unit and property tests it adds), its bars marked here (a timing bar: build its harness and record shape only). Run the gates as M0.md section 3 lists them (install --frozen-lockfile, lint with its probe-red check, build, test for your package and your test files, your here-bars) until each exits 0. Write your landed record with corepack pnpm landed -- ${id} --lane ${lane}${FLOW ? ` --wave ${FLOW.label}` : ''} (and --touched for each file you edited), sign CLEAN-ROOM.md, and append choices rows for every deviation or open case you decided. Return ready-for-check only when every gate exits 0; blocked with the reason otherwise (a missing dependency of an earlier item, a design contradiction you could not decide inside J156).${fix ? ` THIS IS FIX ROUND ${fix.round}: the independent checker failed the item (plat/docs/build/checks/${id}.md) on these lines — fix every one, then re-run the failed lines and the item's whole test set: ${JSON.stringify(fix.lines)}` : ''}${selfCheck(id, lane, fix)}`

const checkPrompt = (id, wave, lane) => `${GROUND}

LANE ${lane}. You are the INDEPENDENT CHECKER of item ${id} (${WTXT(wave)}); you are not its author and you change none of its files. Follow plat/docs/build/M0.md section 3 exactly — steps 1 to 5: read the brief whole (the item in M0-work.json, its entry in M0.md, every design section it names in full, the choices rows it cites and any its author appended, plat/docs/build/checks/M0-spec-notes.md where it names the item); read the code whole and attribute it with corepack pnpm landed:verify -- ${LBL(wave)} --item ${id} (quote the output); run the gates and the item's here-bars yourself; go through the checklist line by line with quoted evidence; and write the verdict to plat/docs/build/checks/${id}.md (record your own files with corepack pnpm landed -- check-${id} --lane ${lane}${FLOW ? ` --wave ${FLOW.label}` : ''} --owns plat/docs/build/checks/${id}.md). Try to refute the item: a test that cannot fail, a bar silently narrowed, a stub without a milestone, a deviation without a choices row, a design clause with no test, a Math member outside the allowlist, a path outside plat/. Go through EVERY checklist line and every probe you planned before you write the verdict — never stop at the first finding — so one fix round can clear them all. Then CLASSIFY each finding (J180, the owner on 2026-10-05: what needs fixing gets fixed, the minor goes to hardening). A BLOCKER fails the item: a gate exits non-zero because of the item's files; a wrong result on an honest input; a listed interface or listed test missing; a stub or shortcut on an honest path without a notBuilt milestone and a choices row; a listed test or bar that CANNOT FAIL on the promise it states (a vacuous pass, a fixture that erases what it tests, a measurement that omits part of what it claims to time, a surviving targeted mutant on a stated promise or interface contract); an interface that disagrees with the design or with an item it hands to; a clean-room breach; a path outside plat/. Everything else is MINOR (a surviving mutant off the stated promises, an extra edge case the design does not name, wording, naming, a missing comment, a stricter test that would be nice, a style point): write each to plat/docs/build/checks/${id}-notes.md as a numbered note for the hardening milestone M4 (record that file with your check record) and do NOT fail the item for it. Return pass when no blocker remains (list the minor notes in the report); fail with EVERY blocker line, its evidence and the required change, and only blockers in failing_lines.${NOT_EVIDENCE(id)}`

const stewardPrompt = (wave, action, items) => `${GROUND}

LANE build/steward-wave-${wave}-${action}. You are the WAVE STEWARD, acting for the session: the ONE seat allowed to run git, and only the commands below. ${action === 'open'
    ? `OPEN wave ${wave} (items ${JSON.stringify(items)}): run corepack pnpm snapshot -- wave-${wave} in plat/ and confirm plat/docs/build/landed/snapshots/wave-${wave}.json exists (if it already exists for this wave, keep it and say so). Run no git. Return ok with the snapshot path in notes.`
    : `CLOSE wave ${wave} (items ${JSON.stringify(items)}, all checked pass): run corepack pnpm landed:verify -- wave-${wave} in plat/ and quote it; list every unattributed path. If none: stage EXACTLY the files the wave's landed records and check records name, plus plat/docs/build/choices.md, plat/CLEAN-ROOM.md, plat/docs/build/landed/, plat/docs/build/checks/, any lockfile change a record names, and docs/lane-events.log — by explicit path, never git add -A, -u or a bare directory outside plat/ — check git diff --cached --stat shows nothing outside those, scan the staged diff for secrets (api keys, tokens, private keys), commit with the message "M0 wave ${wave} landed: ${items.join(', ')}" ending with the line "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>", and git push origin main (the owner's standing rule J158, re-confirmed in this session's chat on 2026-10-04 ~02:10: "save all your progress to github"; never force). If anything is unattributed or the push is refused, commit nothing more, push nothing, and return ok false with the paths. Never touch research/, captures/ or docs/calibration/ (M-1's seats own them).`}`

const closingCheckPrompt = (id, wave, lane, prev) => `${GROUND}

LANE ${lane}. You are the CLOSING CHECKER of item ${id} (${WTXT(wave)}), independent of its author, after its first full check and that check's fix round (the rulings J162 and J169: the first check is the critical one and an adversarial checker can always find one more contrived escape, so from wave 3v on the item's SECOND check closes it). (1) For each failing line of the previous check, listed here, re-run its evidence and confirm it is fixed, or report it as still failing: ${JSON.stringify(prev)}. (2) Re-run the gates of plat/docs/build/M0.md section 3 step 3 and landed:verify -- ${LBL(wave)} --item ${id}, quoting the output. (3) A NEW finding fails the item ONLY if it is a blocker: a gate exits non-zero; an interface or test id the item lists is missing; a stub or shortcut on an honest code path without a notBuilt milestone and a choices row; a wrong result on an honest input; a clean-room breach; a path outside plat/. Every other new finding — a contrived or deliberate-writer escape, a further hardening test, a tightening of a claim — is NOT a fail: append it to plat/docs/build/checks/${id}-notes.md (one row: id, observation, suggested handling, the hardening milestone M4 unless it belongs earlier) and record that file with corepack pnpm landed -- check-${id}-notes --lane ${lane}${FLOW ? ` --wave ${FLOW.label}` : ''} --owns plat/docs/build/checks/${id}-notes.md. Write the verdict to plat/docs/build/checks/${id}.md as section 3 step 5 says. Return pass when (1) leaves nothing failing and (3) finds no blocker; otherwise fail with only those lines.${NOT_EVIDENCE(id)}`

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
const RESUME_AT = Object.fromEntries([...(ARGS.waves || []).flatMap((w) => Object.entries(w.resume || {})), ...Object.entries((FLOW && FLOW.resume) || {})])
const CUT = ' CUT-OFF (the owner, 2026-10-04): this item gets at most two more fix rounds in all. Fix exactly the listed lines with the smallest test change that pins each promise; if an earlier attempt under this lane key left a broader mutation sweep in progress, stop it and keep only what the listed lines need (targeted mutants, J169).'
const CONFIRM = ' CONFIRM-ONLY (the owner, 2026-10-04: when the fix is added tests, the re-check only confirms them): for each listed line, re-introduce the fault it describes in a scratch copy (the mutant or edit the earlier independent check used, never a mutant from the author self-check) and confirm the new test now fails on it and passes without it; then run the gates once. Do NOT search for new findings beyond the listed lines and the gates; pass when every listed line is pinned and the gates exit 0.'
const notesPrompt = (id, wave, lines) => `${GROUND}

LANE check/${id}-cutoff-notes. The owner cut item ${id} off after its allowed fix rounds (2026-10-04: at most one more round, then move on). Append each of these still-open lines as a row to plat/docs/build/checks/${id}-notes.md (one row: id, observation, suggested handling, milestone M4 unless it belongs earlier; say plainly that the owner's cut-off accepted the item with this line open), record the file with corepack pnpm landed -- check-${id}-cutoff-notes --lane check/${id}-cutoff-notes${FLOW ? ` --wave ${FLOW.label}` : ''} --owns plat/docs/build/checks/${id}-notes.md (if that path is already declared by another record of this wave, re-land that record's id instead and say so), run no git, change no other file. Lines: ${JSON.stringify(lines)}. Return verdict pass with the rows written in report.`
const runResumed = async (id, wave, r) => {
  const CUTX = r.cutoff === false ? ' RESUMED after a stalled seat (2026-10-04): continue this fix round from your files and CHECKPOINT lines; targeted mutants (J169).' : CUT
  let lines = r.lines
  let check = null
  for (let k = 0; k < 2; k++) {
    const round = r.round + k
    const built = await seat(buildPrompt(id, wave, `build/${id}-fix${round}`, { round, lines }) + CUTX, `build/${id}-fix${round}`, 'Build', BUILD_SCHEMA, ...PRI(id, 'fix'))
    if (!built || built.status === 'blocked') return { id, ok: false, why: 'cut-off fix round blocked', built }
    check = await seat(closingCheckPrompt(id, wave, `check/${id}-close-r${round}`, lines) + CONFIRM, `check/${id}-close-r${round}`, 'Check', CHECK_SCHEMA, ...PRI(id, 'check'))
    if (check && check.verdict === 'pass') return { id, ok: true, rounds: round, built, check }
    lines = check ? check.failing_lines : lines
  }
  if (r.cutoff === false) { log(`${id}: still failing after two closing rounds; stopping for the session (J169: a real defect is never cut off)`); return { id, ok: false, rounds: r.round + 1, check } }
  log(`${id}: still failing after the owner's allowed rounds; cut off with its open lines written to notes`)
  const notes = await seat(notesPrompt(id, wave, lines), `check/${id}-cutoff-notes`, 'Check', CHECK_SCHEMA, ...PRI(id, 'check'))
  return { id, ok: true, rounds: r.round + 1, check, cutOff: true, notes }
}

const runItem = async (id, wave) => {
  if (RESUME_AT[id]) return runResumed(id, wave, RESUME_AT[id])
  let built = await seat(buildPrompt(id, wave, `build/${id}`, null), `build/${id}`, 'Build', BUILD_SCHEMA, ...PRI(id, 'build'))
  if (!built || built.status === 'blocked') return { id, ok: false, why: built ? 'blocked: ' + built.notes.join('; ') : 'implementer returned nothing', built }
  let check = await seat(checkPrompt(id, wave, `check/${id}`), `check/${id}`, 'Check', CHECK_SCHEMA, ...PRI(id, 'check'))
  let round = 0
  while (check && check.verdict === 'fail' && round < MAXFIX) {
    round++
    built = await seat(buildPrompt(id, wave, `build/${id}-fix${round}`, { round, lines: check.failing_lines }), `build/${id}-fix${round}`, 'Build', BUILD_SCHEMA, ...PRI(id, 'fix'))
    if (!built || built.status === 'blocked') return { id, ok: false, why: 'fix round blocked', built, check }
    if (round >= (CLOSING_FROM[wave] || ARGS.closingFrom || 99)) {
      const prev = check.failing_lines
      check = await seat(closingCheckPrompt(id, wave, `check/${id}-close-r${round}`, prev), `check/${id}-close-r${round}`, 'Check', CHECK_SCHEMA, ...PRI(id, 'check'))
    } else {
      check = await seat(checkPrompt(id, wave, `check/${id}-r${round}`), `check/${id}-r${round}`, 'Check', CHECK_SCHEMA, ...PRI(id, 'check'))
    }
  }
  return { id, ok: !!check && check.verdict === 'pass', rounds: round, built, check }
}

const DEPS = ARGS.deps || {}
const NOPULL = ARGS.noPull || []
const passed = new Set()
const done = []

// ---- FLOW MODE (J173) ----
// Review wf_a3074073-6cf (2026-10-04) shaped what follows: staging is a script (tools/flow_stage.mjs), never a recipe;
// an item under an integration fix is never committed until its re-check passes; every item not yet committed-safe
// is BUSY for the steward and the integration checker; a hand-over successor starts only once its giver is committed.
const INT_SCHEMA = { type: 'object', properties: { group: { type: 'string' }, verdict: { type: 'string', enum: ['pass', 'fail'] }, report: { type: 'string' }, failing_lines: { type: 'array', items: { type: 'object', properties: { item: { type: 'string' }, line: { type: 'string' }, evidence: { type: 'string' }, required_change: { type: 'string' } }, required: ['item', 'line', 'evidence', 'required_change'] } } }, required: ['group', 'verdict', 'report', 'failing_lines'] }
const ATTEMPT = (FLOW && FLOW.attempt) || 1

const flowStewardPrompt = (action, n, ids, ints, busy, outside) => {
  const L = FLOW.label
  const close = action === 'close'
  const stage = `node tools/flow_stage.mjs --label ${L}${ids.length ? ` --items ${ids.join(',')}` : ''}${ints.length ? ` --records ${ints.join(',')}` : ''}${busy.length ? ` --busy ${busy.join(',')}` : ''} --scratch ${SCRATCH}/steward-${L} --stage`
  return `${GROUND}

LANE build/steward-${L}-a${ATTEMPT}-${action}${n ? `-${n}` : ''}. You are the FLOW STEWARD (J173: M0 builds without stage barriers under one snapshot, ${L}), acting for the session: the ONE seat allowed to run git, and only the commands below. The RESUME RULE does not apply to you: if git log -5 --format=%s already shows your exact commit message, return that commit; otherwise do the work. ${action === 'open'
    ? `OPEN the flow (items ${JSON.stringify(ids)}). (1) Run git status -sb and git log -1 --format=%H%n%s: the branch is main and not behind origin/main; the index holds nothing staged. (2) Every dependency outside the run — ${JSON.stringify(outside)} — has its landed record and its check record committed: git ls-files --error-unmatch plat/docs/build/landed/<id>.json plat/docs/build/landed/check-<id>.json for each (an item with no check record of its own, e.g. the scaffold M0-s-01, needs only its record). (3) Run corepack pnpm snapshot -- ${L} in plat/ and confirm plat/docs/build/landed/snapshots/${L}.json exists (if it already exists, keep it and say so: the flow's one snapshot is taken once). Change nothing else. Return ok only if (1)-(3) hold; ok false naming what failed otherwise.`
    : `${close ? 'CLOSE the flow: commit the last checked work' : 'COMMIT checked work'}: items ${JSON.stringify(ids)} and records ${JSON.stringify(ints)}; BUSY (nothing of theirs is committed): ${JSON.stringify(busy)}. (1) In plat/: run corepack pnpm landed:verify -- ${L} --item <id> for each item (an item whose record names another label against that label) and quote each result; any failure stops you. Then run corepack pnpm landed:verify -- ${L} and quote its summary line. ${close
      ? 'Nothing is busy now: it must exit 0, else commit nothing and return ok false with its problems.'
      : 'Mid-run it names the busy items\' work in progress; copy into notes only problems that name no busy item\'s files, record or checks/ files, and carry on (the close verifies the whole flow).'} (2) Stage with the session's staging script, from the repository root, exactly: ${stage} — quote its JSON. It stages each committed record's files whole (only while the tree matches the record), never a busy item's path (a hand-over is carried by its successor), the append files cut to HEAD's lines plus the committed records' claimed lines, crossings.json whole only when every added record is claimed, the flow's snapshot and docs/lane-events.log, and re-checks every staged blob. If it exits 1 it has unstaged its paths: commit nothing and return ok false with its problems. Never stage anything by hand. (3) git diff --cached --stat shows only what the script staged; scan the staged diff for secrets (api keys, tokens, private keys); commit with the message "M0 flow ${L} ${close ? 'landed' : `a${ATTEMPT} commit ${n}`}: ${[...ids, ...ints].join(', ')}" ending with the line "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>", and git push origin main (the owner's standing rule J158, re-confirmed in this session's chat on 2026-10-04 ~02:10: "save all your progress to github"; never force). If the push is refused, return ok false. Never touch research/, captures/ or docs/calibration/ (M-1's seats own them).`}`
}

const integrationPrompt = (group, ids, lane, prev, busy) => `${GROUND}

LANE ${lane}. You are the INTEGRATION CHECKER of stage group ${group} of the flow ${FLOW.label} (items ${JSON.stringify(ids)}; each already passed its own independent check), independent of their authors; you change none of their files. Your purpose (J173): catch what one-item checks miss — the pieces working TOGETHER. Items BUSY right now (being built, checked or fixed by other seats; their files are work in progress): ${JSON.stringify(busy)}. ${prev
    ? `This is the RE-CHECK after the integration fix: (1) for each line of the previous integration check, listed here, re-run its evidence and confirm it is fixed: ${JSON.stringify(prev)}; (2) run the gates once; (3) read the files the fixed items' re-landed records changed and fail only on a blocker there (a stub or shortcut on an honest path without a notBuilt milestone and a choices row, a wrong result on an honest input, a clean-room breach, a path outside plat/). Do NOT search for new findings elsewhere.`
    : `(1) Read the group's items in plat/docs/build/M0-work.json (interfaces, handsOver, dependsOn, tests) and the design sections where two of them — or one of them and an item it depends on — meet: a record or field one writes and another reads, a shared table, an order, unit, id or determinism promise across them. (2) Run the gates once (install --frozen-lockfile, lint with its probe-red check, build, test with --maxWorkers=2) and corepack pnpm landed:verify -- ${FLOW.label} --item <id> for each item (an item whose record names another label against that label). (3) Write a few composition probes under ${SCRATCH}/integration-g${group}/ (never in plat/): run each meeting point end to end on honest inputs (the items' own fixtures, a seeded random case) and compare with what the design promises.`} A finding FAILS the group only if it is a BLOCKER: a gate exits non-zero because of a file of the group or of a passed item it depends on; a wrong result on an honest input when the pieces are composed; an interface mismatch between them (a field, unit, id or order one writes and the other reads differently). NOT blockers, only notes: anything in a busy item's files (a red test, a type error, an unfinished module); a landed:verify hash mismatch on a path a busy item now owns through a handsOver. Name, for each failing line, the ONE item whose files must change — an item of the group, or a dependency that has passed and is not busy. Write the verdict, the probes you ran and the notes to plat/docs/build/checks/integration-g${group}.md and record it with corepack pnpm landed -- check-integration-g${group} --lane ${lane} --wave ${FLOW.label} --owns plat/docs/build/checks/integration-g${group}.md (a re-check re-lands the same record). Return group "${group}", pass, or fail with only the blocker lines.`

const INTFIX = (group) => ` INTEGRATION FIX (J173): the failing lines above come from the stage-group integration check plat/docs/build/checks/integration-g${group}.md (the pieces composed), not from the item's own check file. Fix them inside your item's owns with a test that pins each, re-run your item's whole test set and the gates, and re-land your record with --wave ${FLOW ? FLOW.label : ''}.`

if (FLOW) {
  const L = FLOW.label
  const groups = FLOW.groups || []
  const all = groups.flatMap((g) => g.items)
  const inRun = new Set(all)
  const gIndex = Object.fromEntries(groups.map((g, i) => [g.group, i]))
  const groupOf = Object.fromEntries(groups.flatMap((g) => g.items.map((id) => [id, g.group])))
  const doneSet = new Set(FLOW.done || [])
  doneSet.forEach((id) => passed.add(id))
  const HOLD = FLOW.hold || []
  // J189: waitFor { id: { cmd, why } } — the item starts only once a shell test (exit 0 = ready) passes, e.g. a session fix
  // of a dependency outside the run committed on main; a Haiku probe polls it (zero judgment, J187's tiers) and the rest
  // of the flow runs meanwhile. A probe that never sees it ready after its tries fails the item for the session.
  const WAIT_FOR = FLOW.waitFor || {}
  const waitOk = new Set()
  const waiting4 = new Set()
  const waitProbe = async (id) => {
    const w = WAIT_FOR[id]
    for (let tries = 0; tries < 80; tries++) {
      const p = await agent(`Run exactly this one bash command and nothing else (it polls for up to 9 minutes): for i in $(seq 54); do if ${w.cmd}; then echo READY; break; fi; sleep 10; done; echo DONE. Return ready = true only if it printed READY.`, { label: `wait:${id}:${tries + 1}`, phase: 'Build', schema: { type: 'object', properties: { ready: { type: 'boolean' } }, required: ['ready'] }, model: 'haiku', effort: 'low' })
      if (p && p.ready) return true
    }
    return false
  }
  const EVERY = FLOW.commitEvery || 4
  const est = FLOW.est || {}
  const HANDS = FLOW.handsOver || {} // giver -> [successors]: a successor starts only once its giver is committed
  const giversOf = (id) => Object.keys(HANDS).filter((g) => (HANDS[g] || []).includes(id))
  const dependents = Object.fromEntries(all.map((id) => [id, all.filter((x) => (DEPS[x] || []).includes(id))]))
  const cp = {}
  const cpOf = (id) => (cp[id] !== undefined ? cp[id] : (cp[id] = (est[id] || 1) + Math.max(0, ...dependents[id].map(cpOf))))
  all.forEach(cpOf)
  const leaf = (id) => dependents[id].length === 0
  PRI = (id, kind) => (kind === 'build' ? [2, cp[id] || 0] : [inRun.has(id) && leaf(id) ? 3 : 1, cp[id] || 0])
  const outside = [...new Set(all.flatMap((id) => DEPS[id] || []).filter((d) => !inRun.has(d)))].sort()
  log(`flow ${L} (attempt ${ATTEMPT}): ${all.length} items in ${groups.length} groups (${doneSet.size} passed earlier); leaves, checked last: ${all.filter(leaf).join(', ') || 'none'}`)

  phase('Open')
  const opened = await seat(flowStewardPrompt('open', 0, all, [], [], outside), `steward/${L}-a${ATTEMPT}-open`, 'Open', STEWARD_SCHEMA, 0, 0)
  if (!opened || !opened.ok) { log(`flow ${L}: open failed (snapshot, branch or an uncommitted outside dependency); stopping`); return { done, stoppedAt: L, opened } }

  const failed = new Map()
  const started = new Set()
  const fixing = new Set()          // items under an integration fix: never committed until the re-check passes
  const runningGroups = new Set()   // integration checks in progress
  const committed = new Set([...(FLOW.committed || []), ...[...doneSet].filter((id) => !(FLOW.uncommitted || []).includes(id))])
  const results = {}
  const running = []
  const commits = []
  const groupsDone = new Set(FLOW.integrated || [])
  const integrations = {}
  let uncommitted = [...(FLOW.uncommitted || [])]   // passed earlier, not yet committed (a relaunch names them)
  let intUncommitted = []
  let commitChain = Promise.resolve()
  let commitN = 0
  let halt = null

  const earlierGroupsPassed = (id) => groups.slice(0, gIndex[groupOf[id]]).every((g) => g.items.every((x) => passed.has(x)))
  const ready = (id) => (DEPS[id] || []).every((d) => passed.has(d) || (!inRun.has(d) && !failed.has(d))) &&
    giversOf(id).every((g) => committed.has(g) || !inRun.has(g)) && (!HOLD.includes(id) || earlierGroupsPassed(id))
  // BUSY: every run item that is not passed-and-settled, every item under an integration fix, every failed item
  // (an item not yet started has touched nothing, so it is not busy: a hand-over giver's file is committed before its successor starts)
  const busyList = () => [...new Set([...all.filter((id) => started.has(id) && !passed.has(id)), ...fixing, ...failed.keys()])]

  const commit = (final) => {
    commitChain = commitChain.then(async () => {
      if (halt) return
      const ids = uncommitted.filter((id) => !fixing.has(id) && !failed.has(id) && !committed.has(id))
      const ints = intUncommitted
      if (!final && !ids.length && !ints.length) return
      uncommitted = uncommitted.filter((id) => !ids.includes(id))
      intUncommitted = []
      commitN++
      const action = final ? 'close' : 'commit'
      let r
      // a steward that throws or fails gives its items back, so a relaunch built from the result never counts them committed
      try { r = await seat(flowStewardPrompt(action, commitN, ids, ints, final ? [] : busyList(), outside), `steward/${L}-a${ATTEMPT}-${action}-${commitN}`, 'Commit', STEWARD_SCHEMA, 0, 0) }
      catch (e) { uncommitted = [...ids, ...uncommitted]; intUncommitted = [...ints, ...intUncommitted]; throw e }
      commits.push({ n: commitN, action, ids, ints, commit: r ? r.commit : null, ok: !!(r && r.ok) })
      if (!r || !r.ok) {
        halt = { commitN, steward: r }
        uncommitted = [...ids, ...uncommitted]
        intUncommitted = [...ints, ...intUncommitted]
        log(`flow ${L}: steward ${action} ${commitN} failed (a staging problem or a refused push); no new item starts — the session must look`)
      } else {
        ids.forEach((id) => committed.add(id))
        log(`flow ${L}: ${action} ${commitN} ${r.commit} (${ids.concat(ints).join(', ')})`)
        launch()
      }
    }).catch((e) => { halt = { commitN, error: String(e) }; log(`flow ${L}: steward commit threw (${e}); no new item starts — the session must look`) })
    return commitChain
  }

  const runIntegration = async (g) => {
    const ids = g.items
    const rank = Math.max(...ids.map((id) => cp[id] || 0))
    const lane = `check/integration-${L}-g${g.group}`
    runningGroups.add(g.group)
    let verdict = 'none'
    let first = null
    try {
      let r = await seat(integrationPrompt(g.group, ids, lane, null, busyList()), lane, 'Integrate', INT_SCHEMA, 1, rank)
      first = r
      if (r && r.verdict === 'fail') {
        // fix only what may be fixed now: a group item, or a passed, settled item (in or before the run)
        // never a hand-over giver whose successor has started: the successor already edits the handed-over file
        const allowed = (id) => !(HANDS[id] || []).some((s) => started.has(s)) && (ids.includes(id) || (inRun.has(id) ? passed.has(id) && !fixing.has(id) && !failed.has(id) : !failed.has(id) && /^M0-[a-z]-\d+[a-z]?$/.test(id)))
        const byItem = {}
        const refused = []
        for (const f of r.failing_lines) (allowed(f.item) ? (byItem[f.item] = byItem[f.item] || []) : refused).push({ item: f.item, line: f.line, evidence: f.evidence, required_change: f.required_change })
        if (refused.length) log(`flow ${L}: group ${g.group}'s integration named items it may not fix now (${refused.map((x) => x.item).join(', ')}); left for the session`)
        const hit = Object.keys(byItem)
        if (!hit.length) verdict = 'fail'
        else {
          hit.forEach((id) => fixing.add(id))
          uncommitted = uncommitted.filter((id) => !hit.includes(id))
          await commitChain // a commit already staging one of them finishes on its checked state before any fix edits it
          const fixes = await Promise.all(hit.map((id) => seat(buildPrompt(id, groupOf[id] !== undefined ? groupOf[id] : g.group, `build/${id}-int-g${g.group}-fix1`, { round: 'I (integration)', lines: byItem[id] }) + INTFIX(g.group), `build/${id}-int-g${g.group}-fix1`, 'Build', BUILD_SCHEMA, 1, rank)
            .then((b) => ({ id, ok: !!b && b.status !== 'blocked' }), (e) => ({ id, ok: false, why: String(e) }))))
          const prev = r.failing_lines
          r = fixes.every((f) => f.ok) ? await seat(integrationPrompt(g.group, ids, `${lane}-close`, prev, busyList()), `${lane}-close`, 'Integrate', INT_SCHEMA, 1, rank) : null
          hit.forEach((id) => fixing.delete(id))
          if (r && r.verdict === 'pass' && !refused.length) {
            verdict = 'pass'
            hit.forEach((id) => { if (!uncommitted.includes(id)) uncommitted.push(id) })
          } else {
            verdict = 'fail'
            hit.forEach((id) => { passed.delete(id); failed.set(id, `group ${g.group} integration still failing`) })
            log(`flow ${L}: group ${g.group}'s integration still fails after one fix (items ${hit.join(', ')}); they stay uncommitted and their dependents not yet started wait for the session (J169: a real defect is never cut off)`)
          }
        }
      } else verdict = r ? (r.verdict === 'pass' ? 'pass' : 'fail') : 'none'
      if (r || first) intUncommitted.push(`check-integration-g${g.group}`)
      if (verdict === 'none') log(`flow ${L}: group ${g.group}'s integration seat returned nothing; recorded for the session`)
    } catch (e) {
      verdict = 'error'
      log(`flow ${L}: group ${g.group}'s integration threw (${e}); recorded for the session`)
    }
    runningGroups.delete(g.group)
    integrations[g.group] = verdict
    if (uncommitted.length + intUncommitted.length >= EVERY) commit(false)
    launch()
    return { group: g.group, verdict }
  }

  const maybeIntegrate = (g) => {
    if (halt || groupsDone.has(g.group) || !g.items.every((x) => passed.has(x))) return
    groupsDone.add(g.group)
    if (g.items.length >= 2) running.push(runIntegration(g))
    else { integrations[g.group] = 'single'; log(`flow ${L}: group ${g.group} has one item; its own check stands for the group`) }
  }

  const onDone = (id) => (r) => {
    results[id] = r
    if (r && r.ok) {
      passed.add(id)
      // J185: an item a relaunch names as committed returns PASS from disk; it is never queued for another commit
      if (!committed.has(id) && !uncommitted.includes(id)) uncommitted.push(id)
      maybeIntegrate(groups[gIndex[groupOf[id]]])
      // a hand-over giver commits at once so its successor can start on committed ground
      if (uncommitted.length >= EVERY || (HANDS[id] || []).some((s) => inRun.has(s))) commit(false)
    } else {
      failed.set(id, r ? (r.why || 'still failing') : 'no result')
      log(`flow ${L}: ${id} FAILED (${failed.get(id)}); its dependents will not start, everything else continues`)
    }
    launch()
    return r
  }

  function launch() {
    if (halt) return
    for (const id of all) {
      if (started.has(id) || doneSet.has(id) || failed.has(id) || !ready(id)) continue
      if (WAIT_FOR[id] && !waitOk.has(id)) {
        if (!waiting4.has(id)) {
          waiting4.add(id)
          log(`flow ${L}: ${id} is ready but waits for: ${WAIT_FOR[id].why}`)
          running.push(waitProbe(id).then((ok) => {
            if (ok) { waitOk.add(id); log(`flow ${L}: ${id}'s wait is over`) } else { failed.set(id, 'waitFor never ready: ' + WAIT_FOR[id].why); log(`flow ${L}: ${id} FAILED (its wait never ended); its dependents will not start`) }
            launch()
          }))
        }
        continue
      }
      started.add(id)
      log(`flow ${L}: ${id} starts (group ${groupOf[id]}; chain ${cp[id]} h${leaf(id) ? '; leaf' : ''})`)
      running.push(runItem(id, groupOf[id]).catch((e) => ({ id, ok: false, why: 'error: ' + e })).then(onDone(id)))
    }
  }

  phase('Build')
  groups.forEach(maybeIntegrate) // a group made only of items passed earlier and not yet integrated
  if (uncommitted.length) commit(false) // items a relaunch names as passed but uncommitted
  launch()
  let seen = 0
  while (true) {
    while (seen < running.length) {
      const batch = running.slice(seen)
      seen = running.length
      await Promise.all(batch)
    }
    await commitChain // a commit can unblock a hand-over successor, which pushes new work
    if (seen === running.length) break
  }
  const waiting = all.filter((id) => !started.has(id) && !doneSet.has(id) && !failed.has(id))
  const intOk = Object.values(integrations).every((v) => v === 'pass' || v === 'single')
  const ok = !halt && failed.size === 0 && waiting.length === 0 && intOk
  if (ok) await commit(true)
  else if (!halt && (uncommitted.some((id) => !failed.has(id)) || intUncommitted.length)) await commit(false)
  log(`flow ${L}: ${all.filter((id) => passed.has(id) && !doneSet.has(id)).length}/${all.length - doneSet.size} items passed; failed ${failed.size}; waiting ${waiting.length}; integrations ${JSON.stringify(integrations)}; ${commits.length} commits`)
  return {
    flow: L,
    attempt: ATTEMPT,
    ok: ok && !halt,
    results: Object.fromEntries(Object.entries(results).map(([id, r]) => [id, r ? { ok: r.ok, rounds: r.rounds, why: r.why, cutOff: r.cutOff } : null])),
    integrations,
    integrated: Object.keys(integrations).filter((k) => integrations[k] === 'pass' || integrations[k] === 'single'),
    failed: Object.fromEntries(failed),
    waiting,
    committed: [...committed],
    uncommitted,
    commits,
    halt,
    stoppedAt: ok && !halt ? null : L,
  }
}

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
