export const meta = {
  name: 'filler-m1-prep',
  description: 'Filler work for seats the M0 flow leaves idle (owner 2026-10-05): the E16 §9.7 hand-off rows for M0-k-06, the W-20 dry run on M0-k-05, E19, M1 scope prep and the phase-C / M1-spec workflow drafts — at most 2 seats, never above 5 with the M0 run, nothing written under plat/',
  phases: [
    { title: 'Gate', detail: 'probe M0 live seats, memory and load before every seat' },
    { title: 'Work', detail: 'one seat per task' },
    { title: 'Verify', detail: 'an independent critic per deliverable; one revision on a fail' },
  ],
}

// args: { root, scratch, cap (default 5), maxFiller (default 2), only: [task keys] }
// The owner (2026-10-05): "Give the idle agents other work. Preparing the next milestone's spec, or the parts of M-1 that
// M0-k-05 already unblocked, wouldn't make M0 itself faster, but it would make the whole program faster."
// Scope from wf_2dccb46b-5d7 (three readers + a refuting critic). RULES: no seat writes under plat/ (any new plat/ file is
// unattributed at the flow's close); no seat runs git; M0 live + filler live <= cap; clean-room roles as tagged below.
const ROOT = args.root
const S = `${args.scratch}/filler`
const CAP = args.cap || 5
const MAXF = args.maxFiller || 2
const ONLY = args.only || null

const PROBE_SCHEMA = { type: 'object', properties: { ok: { type: 'boolean' }, last: { type: 'string' } }, required: ['ok', 'last'] }
const DONE_SCHEMA = { type: 'object', properties: { status: { type: 'string', enum: ['done', 'blocked'] }, files: { type: 'array', items: { type: 'string' } }, summary: { type: 'string' }, rows: { type: 'string' } }, required: ['status', 'files', 'summary'] }
const VERDICT_SCHEMA = { type: 'object', properties: { verdict: { type: 'string', enum: ['pass', 'fail'] }, problems: { type: 'array', items: { type: 'object', properties: { problem: { type: 'string' }, evidence: { type: 'string' }, fix: { type: 'string' } }, required: ['problem', 'evidence', 'fix'] } } }, required: ['verdict', 'problems'] }

let fillerLive = 0
const waiters = []
const acquire = async (key) => {
  while (fillerLive >= MAXF) await new Promise((r) => waiters.push(r))
  fillerLive++
  for (let tries = 0; ; tries++) {
    const p = await agent(`Run exactly: python3 ${ROOT}/tools/m0_live.py --need ${fillerLive} --cap ${CAP} --wait 540 (it waits up to 9 minutes for a free seat and prints one JSON line). Return ok = the "ok" field of the LAST line it printed, last = that line. Run nothing else.`, { label: `gate:${key}:${tries + 1}`, phase: 'Gate', schema: PROBE_SCHEMA, model: 'haiku', effort: 'low' })
    if (p && p.ok) return
    if (tries >= 40) { fillerLive--; const w = waiters.shift(); if (w) w(); throw new Error(`no free seat for ${key} after ${tries + 1} probes`) }
  }
}
const release = () => { fillerLive--; const w = waiters.shift(); if (w) w() }
const seat = async (key, prompt, opts) => {
  await acquire(key)
  try { return await agent(prompt, opts) } finally { release() }
}
const fable = async (key, prompt, opts) => (await seat(key, prompt, { ...opts, model: 'fable' })) || seat(`${key}-opus`, prompt, opts)

const COMMON = `PROJECT ${ROOT} (the Maps program; WSL2 Ubuntu, 20 CPUs, shared with the M0 flow build run wf_8f7c7489-304, whose seats write plat/ in this same tree). FILLER RULES (owner 2026-10-05; scope wf_2dccb46b-5d7): write NOTHING under plat/ and nothing outside the paths your task names (scratch work under ${S}/); run NO git command; run no vitest; keep any tool run to one process at a time; read HEAD state of plat/ files with git show HEAD:<path> is NOT allowed (no git) — where you need a plat/ file's checked state, the session gave it to you or you read the working copy and say so; append to docs/lane-events.log only lines "$(date '+%Y-%m-%d %H:%M') filler/<key> CHECKPOINT|LANDED <paths or a content-free note>" (keys and paths only, never a listed token). The design is a reference, not a contract (J156): add no design.`
const RESEARCH = ` CLEAN-ROOM ROLE: RESEARCH-SIDE. You may read research/, docs/calibration/, docs/validation/ and the design. Nothing you write may contain a token from the deny-list (research/baselines/denylist/) or any reference generator's code, names or strings: your words and counts only.`
const IMPL = ` CLEAN-ROOM ROLE: IMPLEMENTER-SIDE. Read the CLEAN_ROOM constant in workflows/23-build-m0-waves.js first and obey it exactly. You must NOT open research/, docs/calibration/, docs/validation/, docs/IMPROVEMENTS.md, docs/digest-candidate/, captures/ or reference/. Read only the design (docs/ARCHITECTURE*.md, docs/design/ where CLEAN_ROOM allows) and plat/.`

const TASKS = [
  { key: 'k06-handoff', role: RESEARCH, tier: 'fable', est: 30,
    work: `Draft the session's hand-off rows for M0-k-06 from docs/calibration/E16*.md §9.7 (and docs/calibration/results/W-16b.json's hand-off notes): items (1) a 3-gram hit is a RUN of three or more consecutive listed 3-grams, (3) the colour-hit literal rule (#rrggbb / 0xrrggbb forms), (4) a list word is a maximal run of category-L letters, four or more long, and a token holding a digit is never one, (5) the list's size (bytes and digest count). Item (2) (the version-2 id/phr counts) goes to M0-k-07 with R-17's request: name it in one line, do not draft it. Read plat/docs/build/checks/M0-spec-notes.md's existing rows N-18..N-32 and copy their format exactly; number the new rows from N-33. Write each rule in your own words, implementer-readable, with counts only and NO listed token and no example token from the list. Do not write into plat/: put the rows in ${S}/k06-handoff/rows.md and return them in "rows". Also write ${S}/k06-handoff/why.md: for each row, the E16 / W-16b passage it carries (paths and section numbers only).`,
    check: `You are the independent research-side CHECKER of the drafted hand-off rows in ${S}/k06-handoff/rows.md (sources in why.md). Check: (a) each row says exactly what E16 §9.7's item says (re-read it), no more (no new design) and no less; (b) no listed token: run the twin deny-list scan the M-1 tools provide (find the scanner in tools/ or research/baselines/, e.g. make_denylist.py's scan mode, with research/baselines/denylist/denylist.json) over rows.md and quote its output; (c) the format matches rows N-18..N-32 of plat/docs/build/checks/M0-spec-notes.md; (d) an implementer who has never seen research/ could build the scanner rule from the row alone.` },
  { key: 'w20-dryrun', role: RESEARCH, tier: 'opus', est: 45,
    work: `W-20 dry run on the landed M0-k-05 (plan W-20; plat/packages/testkit/baselines/README.md "How a file crosses"). (1) Build a real-copy mirror: rm -rf ${S}/w20/ && mkdir -p ${S}/w20 && cp -a ${ROOT}/plat ${S}/w20/ ; prove isolation (find ${S}/w20 -type l -lname '${ROOT}*' prints nothing). (2) Copy research/baselines/candidates/baselines.json, research/baselines/candidates/ng-faces.json (check its exact path) and research/baselines/denylist/denylist.json into ${S}/w20/plat/packages/testkit/baselines/. (3) In ${S}/w20/plat run, one at a time, corepack pnpm baselines:check -- packages/testkit/baselines/<file> for each file, and load ng-faces.json through loadNgFaces and baselines.json through the parity CLI's loader (find both in packages/testkit/src). Save every output to ${S}/w20/out-<step>.txt. NOTE the corrected scope: C2's note-token scan and N-32's scanner half belong to M0-k-06 (not built: its scanner is a stub) — record them as NOT RUN, never as pass. (4) Write docs/calibration/results/W-20-dryrun.json: per file and per check, the command, exit code, a content-free summary, and which spec-notes rows (N-20, N-21, N-22, N-24, N-25, N-31, N-32 partial) each confirms; plus status "dry-run" and the M0-k-05 commit (3e6f5971/2315b4df) it ran against. (5) rm -rf ${S}/w20/plat/node_modules when done (keep the outputs).`,
    check: `You are the independent CHECKER of the W-20 dry run. Read docs/calibration/results/W-20-dryrun.json and the outputs in ${S}/w20/out-*.txt. Re-run at least two of the baselines:check commands yourself in ${S}/w20/plat (re-create node_modules with cp -a ${ROOT}/plat/node_modules if it was removed... prefer: rebuild the mirror as the record describes) and compare exit codes. Refute any claim that a row is confirmed when its check did not run, any check reported pass that was NOT RUN (C2 note-token scan, the scanner half), and any listed token in the record.` },
  { key: 'e19-known-defects', role: RESEARCH, tier: 'opus', est: 40,
    work: `Draft E19 (known defects of the candidate baselines): read docs/calibration/E15-baselines.md and .json and research/baselines/candidates/baselines.json; list every row with values.n 0 or a ⟨M-1⟩ cell that cannot be measured, in C-0116's descriptive form (find C-0116 in plat/docs/build/choices.md — read only). Write docs/calibration/E19-known-defects.md and docs/calibration/E19-known-defects.json (ls first: if either exists, stop and report). Counts and row ids only; no listed token.`,
    check: `You are the independent research-side CHECKER of docs/calibration/E19-known-defects.{md,json}. Recount the rows with values.n 0 and the unmeasurable ⟨M-1⟩ cells from the sources yourself and compare; check C-0116's form; check no listed token (twin deny-list scan if available).` },
  { key: 'phase-c-workflow', role: '', tier: 'opus', est: 60,
    work: `Author workflows/32-m1-phase-c.js (WRITE ONLY, never launch) from workflows/29-m1-wave3.js's pattern, with ROOT from args, GROUND/THE MACHINE text for this WSL2 Linux machine (J181, J182: test commands without a -- before vitest flags). Phases: (A) the W-20 dry run (already done by filler: read docs/calibration/results/W-20-dryrun.json if present and skip), (B) gated on "M0-k-06 LANDED" (the seat checks docs/lane-events.log and returns blocked if not): W-18 (implementer-side digest check of docs/digest-candidate/ with M0's scanner; research-twin half), then W-20 (crossing of baselines.json, ng-faces.json, denylist.json into plat/packages/testkit/baselines/ with CrossingRecords, per plan W-20 and N-23's planted-hit control) which ENDS at an explicit STOP before any plat/ placement or commit and returns 'needs-owner-word' (plan §5 (6): the crossing commit is on the owner's word in the chat) and refuses to place anything while the M0 flow run is live, then W-19 (the seat ledger), then the M-1 exit. Use the plan rows for W-18/W-19/W-20 in docs/calibration/ (M-1 plan files) and plat/docs/build/checks/M0-spec-notes.md N-18..N-32 for the gates. Write also workflows/lane-prompts/m1-phase-c-args.json. Check syntax with node --check and by rendering each prompt function once with a stub (no agent runs).`,
    check: `You are the independent CHECKER of workflows/32-m1-phase-c.js. Refute: any path that places or commits into plat/ without the owner's word; any step that runs before M0-k-06 LANDED; any clean-room breach (an implementer-side seat reading research/ or docs/calibration/; a research-side seat writing plat/); a test command with -- before vitest flags; a missing W-18/W-19/W-20 gate the plan names; syntax (node --check). Compare with workflows/29-m1-wave3.js.` },
  { key: 'm1-scope-inventory', role: IMPL, tier: 'opus', est: 75,
    work: `M1 scope inventory: read docs/ARCHITECTURE.md §16 (the M1 row and its preamble), §13.8 and every section those cite. Write docs/build-prep/M1/scope.md and scope.json (create the folder): a numbered list of every M1 clause, each with its source section, marked specifiable-now, M0-dependent (name the M0 item or interface) or needs-M-1 (name the M-1 deliverable). Add no design (J156 (1)).`,
    check: `You are the independent implementer-side CHECKER of docs/build-prep/M1/scope.{md,json}. Re-read §16's M1 row and the cited sections; find clauses the inventory missed, misattributed sources, and wrong markings (an "M0-dependent" clause naming an item that does not provide it — check plat/docs/build/M0-work.json).` },
  { key: 'm1-volume-shares', role: IMPL, tier: 'opus', est: 80,
    work: `Extract the M1-tagged build-plan work items and exits from the design volumes' §8 build plans (V01 §8.1, V09 §8.1, V12 §8, V11 §8, V08 §8, and V07 §8 for V-M0). First locate the volumes and confirm the CLEAN_ROOM text lets an implementer-side seat read them; if not, stop and return blocked with the reason. Write docs/build-prep/M1/volume-shares.md: per volume, each M1 item with its id, one-line summary and source line.`,
    check: `You are the independent implementer-side CHECKER of docs/build-prep/M1/volume-shares.md. Re-scan each volume's §8 for M1-tagged items and compare counts and ids; refute any item not in the source or any omission.` },
  { key: 'm1-spec-workflow', role: '', tier: 'opus', est: 75,
    work: `Author workflows/33-build-m1-spec.js (WRITE ONLY, never launch) from workflows/20-build-m0-spec.js (read it whole), for the M1 build spec: spec and ruling seats on Fable with an Opus stand-in (§16 preamble, J157 (5)), scaffold and checker seats on Opus; ROOT and machine text for this WSL2 Linux machine; every output path OUTSIDE plat/ (docs/build-prep/M1/) until the M0 flow closes, with a one-line note where the final move into plat/docs/build/ happens; inputs docs/build-prep/M1/scope.json and volume-shares.md when present. Check syntax with node --check and by rendering prompts with a stub. Write workflows/lane-prompts/m1-spec-args.json.`,
    check: `You are the independent CHECKER of workflows/33-build-m1-spec.js. Compare with workflows/20-build-m0-spec.js step by step: refute any dropped check (closing check J160, clean-room, spec-notes), any write under plat/, any seat tier contrary to J157 (5), syntax (node --check), and any step that cannot work on this machine (absent captures/ or reference/).` },
]

const run = async (t) => {
  const P = `${COMMON}${t.role}\n\nTASK filler/${t.key} (about ${t.est} minutes): ${t.work} Append a CHECKPOINT line at least every twenty minutes and a LANDED line when done. Return status, the files you wrote and a summary.`
  const opts = { label: `work:${t.key}`, phase: 'Work', schema: DONE_SCHEMA }
  let done = t.tier === 'fable' ? await fable(t.key, P, opts) : await seat(t.key, P, opts)
  if (!done || done.status !== 'done') return { key: t.key, done, verdict: null }
  const C = `${COMMON}${t.role}\n\n${t.check} Report only problems grounded in the files (quote them), each with a concrete fix. Pass when none remains.`
  let v = await fable(`${t.key}-check`, C, { label: `check:${t.key}`, phase: 'Verify', schema: VERDICT_SCHEMA })
  if (v && v.verdict === 'fail') {
    const F = `${P}\n\nREVISION: an independent checker failed your deliverable on these problems; fix every one (re-read your files first): ${JSON.stringify(v.problems)}`
    done = await seat(`${t.key}-fix`, F, { label: `work:${t.key}-fix1`, phase: 'Work', schema: DONE_SCHEMA })
    v = await fable(`${t.key}-recheck`, `${C}\n\nCLOSING RE-CHECK: confirm each earlier problem is fixed (${JSON.stringify(v.problems)}); a new problem fails only if it is a real error, not a nicety.`, { label: `check:${t.key}-r2`, phase: 'Verify', schema: VERDICT_SCHEMA })
  }
  return { key: t.key, done, verdict: v }
}

const tasks = TASKS.filter((t) => !ONLY || ONLY.includes(t.key))
log(`filler: ${tasks.length} tasks, at most ${MAXF} seats, cap ${CAP} with the M0 run`)
const results = await pipeline(tasks, run)
return results
