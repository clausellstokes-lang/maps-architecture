export const meta = {
  name: 'build-m0-spec',
  description: 'Start the build (J153, J154): write the M0 build spec and work breakdown from the architecture set, then scaffold the plat/ monorepo with its toolchain, test harness and clean-room seat ledger',
  phases: [
    { title: 'Spec', detail: 'M0 build spec: scope here and on the Mac, work items with files, sections, tests, bars and order' },
    { title: 'Scaffold', detail: 'plat/ pnpm workspace, strict TypeScript, vitest + fast-check, lint and CI scripts, empty packages, the seat ledger' },
    { title: 'Check', detail: 'an independent checker reads the spec against §16, §13 and §14 and runs the scaffold' },
  ],
}

const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/home/user/maps-architecture'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/build'
const MODEL = ARGS.model || 'opus'
const seat = (prompt, label, phaseName, schema) => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: MODEL })

const CLEAN_ROOM = `CLEAN ROOM (§17.1 (1), binding): you are an IMPLEMENTER-SIDE seat. You read ONLY docs/ARCHITECTURE.md, docs/volumes/INDEX.md, the design volumes a milestone builds (M0 builds none), plat/ (and plat/docs/digest/ when it exists), published algorithm papers and the public documentation of adopted libraries. You NEVER open, list, grep or read research/, captures/, reference/, partitioned/, profiler/, docs/confidence/, docs/improvements/, docs/CONFIDENCE.md, docs/IMPROVEMENTS.md, docs/fable-review/, docs/retrovalidation/, docs/validation/ (the review records), docs/design/ or any findings, critic or red-team file — not even to search them; a citation in the design that points there is for traceability only and you do not follow it. No code from any other settlement generator is read, ported or paraphrased. Record yourself in plat/CLEAN-ROOM.md's seat ledger (seat, date, role, what you read).`

const GROUND = `PROJECT (root ${ROOT}). PLAT is an original settlement map generator, designed in docs/ARCHITECTURE.md (the base) and twelve design volumes; the owner has ruled (docs/PROGRESS.md J153, J154) that the build starts now at milestone M0 of §16, with the code in ${ROOT}/plat/ (the repository §14 names), built by implementer seats and verified by checker seats. The stack is §0's table (TypeScript strict, ES2022 modules, no DOM in model packages, pnpm workspaces, tsc project references, esbuild, vitest with fast-check) and §17.4's pinned dependencies. This machine is a 4-CPU x86 Linux container with Node 22 and pnpm 10, while §12's bench is Node 24 on Apple M1: every timing bar measured here is PROVISIONAL and is recorded as such until re-run on the bench. M-1 (captures and calibration) and every bar that needs the reference recordings or M-1's baselines cannot run here: they are recorded as WAITING-ON-M-1 with what they need, never faked or estimated. ${CLEAN_ROOM}
WORKING RULES: save your files as you go; append a CHECKPOINT line to docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); when complete append "<date> <lane key> LANDED <files>" and return the structured result. Long command output goes to files under ${SCRATCH}/ (make it). Commit and push nothing (the session commits).`

const SPEC_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, work_file: { type: 'string' }, items: { type: 'number' }, here: { type: 'array', items: { type: 'string' } }, waiting_on_m1: { type: 'array', items: { type: 'string' } }, open_questions: { type: 'array', items: { type: 'string' } } }, required: ['file', 'work_file', 'items', 'here', 'waiting_on_m1', 'open_questions'] }
const SCAFFOLD_SCHEMA = { type: 'object', properties: { packages: { type: 'array', items: { type: 'string' } }, commands: { type: 'array', items: { type: 'object', properties: { command: { type: 'string' }, exit: { type: 'number' } }, required: ['command', 'exit'] } }, files: { type: 'number' }, notes: { type: 'array', items: { type: 'string' } } }, required: ['packages', 'commands', 'files', 'notes'] }
const CHECK_SCHEMA = { type: 'object', properties: { verdict: { type: 'string', enum: ['pass', 'fix'] }, issues: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, where: { type: 'string' }, problem: { type: 'string' }, required_change: { type: 'string' } }, required: ['id', 'where', 'problem', 'required_change'] } } }, required: ['verdict', 'issues'] }

const specPrompt = (fix) => `${GROUND}

LANE build/m0-spec. You write the M0 BUILD SPEC. Read completely: §16 (the milestone table, M0's row and its exits, and the staged table's V-M0 row), §0's stack table, §3 (the geometry kernel) whole, §6 (determinism) whole, §12 (budgets; §12.4's site-and-fields mechanisms), §13 (testing: every test id and bar M0 names, §13.1's B-FUZZ, §13.2, §13.8's CI tiers and schedule), §14 (the package layout, dependency rules and the interfaces of @plat/kernel and @plat/model that M0 needs), §17.1 and §17.4, and §1 and §2 as far as the kernel's and the digest's records require. Write ${ROOT}/plat/docs/build/M0.md and ${ROOT}/plat/docs/build/M0-work.json:
(1) SCOPE: M0's pieces (a)–(f) with, for each, what is built HERE now, what is WAITING-ON-M-1 (it needs the reference recordings or M-1's baselines — M0 (b)'s calibration on NG's vertex captures and (c)'s comparisons with the NG and MFCG bands among them — with exactly what it needs), and what is provisional here (timing bars on this machine);
(2) THE WORK BREAKDOWN: items small enough for one implementer seat in one sitting (a few hours), each with: id (M0-a-01 …), title, package and the files it owns (no two items own one file; shared files — a package's index, package.json, the workspace config — belong to the scaffold or to an integration item), the design sections it implements (exact §x.y), its interfaces (by the design's names), its tests (the design's test ids and the unit and property tests it adds), its exit bars (from §16 and §13, each marked here / provisional / waiting-on-M-1), its dependencies on other items, and an order (waves of items that can run side by side);
(3) THE CHECK PROTOCOL: how a checker seat accepts an item (reads the spec item and the design sections, reads the code, runs the tests and the item's bars, fails it on any undeclared shortcut, deviation or missing test);
(4) THE SCAFFOLD: the exact plat/ layout for M0 — the workspace files, tsconfig base and references, the packages M0 needs with their package.json, vitest and fast-check setup, the lint that holds §6.5's determinism allowlist (no Math.random, Date.now or unordered iteration where §6 forbids it), the vendor folder of §17.4 and the commands (install, build, test, lint, bench) — and plat/CLEAN-ROOM.md (§17.1's seat ledger, with its rules stated at the top);
(5) OPEN QUESTIONS: anything the design leaves for M0 to decide, each with your decision and its reason (decided under the owner's delegation, J122 and J154; nothing left open);
(6) OPEN DESIGN FINDINGS: read ${ROOT}/plat/docs/build/open-design-findings.md (the architecture set's coherence pass ended with findings open by the owner's ruling J153; these touch M0) and decide EVERY row: resolved in this spec (the decision, its reason and the work item that carries it), or not affecting M0 (why) — the build follows the decision, and the design text is corrected later from the fix list.
Quote no reference material; cite the design by section.${fix ? ` A CHECKER found these problems in your previous spec — fix every one (or answer it with the design's text if it is wrong): ${JSON.stringify(fix)}` : ''}`

const scaffoldPrompt = (fix) => `${GROUND}

LANE build/m0-scaffold. You are the SCAFFOLD implementer. Read ${ROOT}/plat/docs/build/M0.md (its scaffold section (4)) and the design sections it cites. Create exactly that layout under ${ROOT}/plat/: the pnpm workspace, the strict TypeScript base and project references, every M0 package with its package.json (exact pinned versions, §17.4), its tsconfig and an index that exports nothing yet, vitest with fast-check, the determinism lint, the vendor folder with its README, the commands, a README for plat/ in plain words (what it is, how to build and test, the clean-room rule) and plat/CLEAN-ROOM.md with your own ledger row. Install with pnpm (the registry is reachable) and commit the lockfile to disk. Then run install, build, test (an empty suite passes or a single smoke test per package) and lint, and report each command's exit status; everything must exit 0. Write no product code beyond the smoke tests.${fix ? ` A CHECKER found these problems — fix every one: ${JSON.stringify(fix)}` : ''}`

const checkPrompt = `${GROUND}

LANE build/m0-check. You are the CHECKER of the M0 spec and scaffold, a seat independent of both writers. Read the design sections the spec cites (§16's M0 row, §13, §14, §3, §6, §12.4, §17) and ${ROOT}/plat/docs/build/M0.md and M0-work.json, and run the scaffold's commands yourself (install, build, test, lint). Fail the spec if: an M0 piece, test id or exit bar of §16 or §13 is missing or misread; anything is marked "here" that needs the reference recordings or M-1's baselines, or anything marked waiting-on-M-1 that could be built here; items share a file; an item's design sections are vague; the waves violate a dependency; an open question is left undecided; a row of plat/docs/build/open-design-findings.md is not decided. Fail the scaffold if any command exits non-zero, a dependency is not pinned or not on §17.4's list, the lint does not hold §6.5's allowlist, or the clean-room ledger is missing. Return verdict pass or fix with every issue (where, problem, required change).`

phase('Spec')
let spec = await seat(specPrompt(null), 'build/m0-spec', 'Spec', SPEC_SCHEMA)
if (!spec) return { error: 'spec failed' }
log(`spec: ${spec.items} work items; here: ${spec.here.length}; waiting on M-1: ${spec.waiting_on_m1.length}`)
phase('Scaffold')
let scaffold = await seat(scaffoldPrompt(null), 'build/m0-scaffold', 'Scaffold', SCAFFOLD_SCHEMA)
phase('Check')
let check = await seat(checkPrompt, 'build/m0-check', 'Check', CHECK_SCHEMA)
let round = 0
while (check && check.verdict === 'fix' && round < (ARGS.maxFixRounds || 2)) {
  round++
  const specIssues = check.issues.filter((i) => /spec|M0\.md|M0-work/i.test(i.where))
  const scaffoldIssues = check.issues.filter((i) => !specIssues.includes(i))
  log(`check round ${round - 1}: ${check.issues.length} issues (${specIssues.length} spec, ${scaffoldIssues.length} scaffold)`)
  if (specIssues.length) spec = await seat(specPrompt(specIssues), `build/m0-spec-fix${round}`, 'Spec', SPEC_SCHEMA) || spec
  if (scaffoldIssues.length || specIssues.length) scaffold = await seat(scaffoldPrompt(scaffoldIssues), `build/m0-scaffold-fix${round}`, 'Scaffold', SCAFFOLD_SCHEMA) || scaffold
  check = await seat(checkPrompt, `build/m0-check-r${round}`, 'Check', CHECK_SCHEMA)
}
return { spec, scaffold, check, fix_rounds: round }
