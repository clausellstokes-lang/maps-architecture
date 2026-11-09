export const meta = {
  name: 'session-fix',
  description: 'A session-opened fix round on an item committed in an earlier wave (J186): an Opus implementer under the build brief of workflows/23, an independent Opus closing checker, at most two further fix rounds',
  phases: [
    { title: 'Build', detail: 'the fix round, inside the item\'s owns' },
    { title: 'Check', detail: 'an independent closing check of the session\'s lines' },
  ],
}

// args: { id, briefs, maxRounds (default 3), from (default 1: the first round's number; a later session round on the same item starts after the earlier one's, J192),
//         seats: { build: { model, effort }, fix: { model, effort }, check: { model, effort } } (J252, the owner on 2026-10-10: the most efficient and effective
//         combination of models and effort — defaults opus/high (J187), a confirm-only re-check ('recheck') opus/medium (J254); the session sets build to sonnet/low when the first build seat only returns from disk
//         under the RESUME RULE, and check to fable/high where the verdict is mostly judgment on the bedrock; a further fix round is a real build and uses 'fix') }
//       — briefs is a JSON file the session rendered from workflows/23's buildPrompt and
// closingCheckPrompt (keys build, check); scripts cannot read files, so each seat reads its own brief first. A further round
// appends the checker's failing lines to the build brief and re-runs the closing check on them.
const BUILD_SCHEMA = { type: 'object', properties: { item: { type: 'string' }, status: { type: 'string', enum: ['ready-for-check', 'blocked'] }, files: { type: 'array', items: { type: 'string' } }, landed_record: { type: 'string' }, tests: { type: 'object', properties: { passed: { type: 'number' }, failed: { type: 'number' } }, required: ['passed', 'failed'] }, gates: { type: 'array', items: { type: 'object', properties: { command: { type: 'string' }, exit: { type: 'number' } }, required: ['command', 'exit'] } }, choices_rows: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['item', 'status', 'files', 'landed_record', 'tests', 'gates', 'choices_rows', 'notes'] }
const CHECK_SCHEMA = { type: 'object', properties: { item: { type: 'string' }, verdict: { type: 'string', enum: ['pass', 'fail', 'waiting'] }, wait: { type: 'object', properties: { dir: { type: 'string' }, expect_minutes: { type: 'number' } }, required: ['dir'] }, report: { type: 'string' }, failing_lines: { type: 'array', items: { type: 'object', properties: { line: { type: 'string' }, evidence: { type: 'string' }, required_change: { type: 'string' } }, required: ['line', 'evidence', 'required_change'] } } }, required: ['item', 'verdict', 'report', 'failing_lines'] }
const ID = args.id
const MAX = args.maxRounds || 3
const FROM = typeof args.from === 'number' ? args.from : 1 // J271: a flow round's first build and first check are round 0
// J263: args.lane 'consolidate' names the lanes of a consolidation round (build/<id>-consolidate-N, check/<id>-consolidate-close-N); default 'fix-s' (a session fix round);
// J271: args.lane 'flow' runs a flow-7 item as a dispatched round with the flow's own lane keys (from 0: build/<id> then check/<id>; from n: build/<id>-fix<n> then check/<id>-close-r<n>)
const LANE = args.lane === 'consolidate' ? { build: (n) => `build/${ID}-consolidate-${n}`, check: (n) => `check/${ID}-consolidate-close-${n}`, file: (n) => `${ID}-c${n}` }
  : args.lane === 'flow' ? { build: (n) => (n === 0 ? `build/${ID}` : `build/${ID}-fix${n}`), check: (n) => (n === 0 ? `check/${ID}` : `check/${ID}-close-r${n}`), file: () => ID } // J271: a flow-7 item run by hand as a dispatched round (attempt 14): the flow's lane keys and its one verdict file checks/<id>.md
  : { build: (n) => `build/${ID}-fix-s${n}`, check: (n) => `check/${ID}-close-s${n}`, file: (n) => `${ID}-s${n}` }
const brief = (key) => `Your brief is the string under the key "${key}" in the JSON file ${args.briefs}. Print it whole first (python3 -c "import json;print(json.load(open('${args.briefs}'))['${key}'])") and follow it exactly; everything below adds to it.`
args.build = brief('build')
args.check = brief('check')
// J714 (THE LONG-WAIT HAND-OFF; the owner on 2026-11-09: the most effective and efficient usage of tokens for each task): a workflow seat's prompt cache lives five
// minutes, so a check seat that sits on NEAR, RELATED@1000 or a census pays its whole context at every wake (CS, CT, CU of 2026-11-06: 85 % of a fable check seat's cost
// was cache creation after ten-minute waits). The brief's WAITING RULE now polls in four-minute chunks (a cache read); a wait over forty minutes is handed to a haiku
// WAITER (a context of a few thousand tokens) and a FRESH seat of the same lane re-enters under the CONTINUE RULE when the chain's done-file exists.
const ROOT = args.root || '/home/user/maps-architecture'
const HANDOFF = ` LONG-WAIT HAND-OFF (J714; binding, read with your brief's WAITING RULE): every wake of yours re-reads your whole context, so a long wait is handed to a cheap waiter seat instead of being sat on. WHEN: the runs still ahead of you (NEAR at full strength, RELATED@1000, an observer or oracle suite, a census or a sweep, mutants already written as scripts) will take MORE THAN 40 MINUTES in total and nothing else of your check can proceed meanwhile. HOW: (1) put every such run into ONE chain script D/chain.sh, D an absolute directory of your lane's scratch under /home/user/maps-scratch: the runs one after another (never two test processes at once; read the worker budget inside the script before each run), each as '<command> > D/<name>.log 2>&1; echo $? > D/<name>.rc', the run most likely to fail first; the script's FIRST line is 'echo $$ > D/chain.pid' (the chain records its own PID — never $! of the launching shell, which setsid may leave pointing at a process that has already exited) and its LAST line 'touch D/chain.done'. Start it detached as two separate commands — 'cd <where the runs belong>' and then 'setsid nohup bash D/chain.sh > D/chain.log 2>&1 < /dev/null &' (no && before the &: a list followed by & runs the whole list in the background) — and confirm after thirty seconds that D/chain.pid exists, its process is alive (kill -0 "$(cat D/chain.pid)") and the first log grows. (2) Leave the tree and the mirrors clean (every mutant restored — say so) and save what a successor needs in FILES: D/plan.md (your probe plan and its reasons), your mutant table with each result so far, every figure you measured, and the verdict draft in the verdict file itself with each open row marked PENDING <log name>. (3) Append a CHECKPOINT line: 'handed to the waiter: chain D (<name>.log decides …; …), expect ~N min; done so far: …; mirrors clean; next: <the exact steps after the chain>'. (4) Return at once with verdict "waiting", wait {dir: D, expect_minutes: N}, report = that line, failing_lines []. WHAT FOLLOWS: a waiter seat watches D/chain.done; then a FRESH seat of your lane starts, continues under the CONTINUE RULE from the lane's CHECKPOINT lines and your files, REUSES every finished log that has its .rc (never re-runs it) and writes the verdict, the records and the CLEAN-ROOM row. A wait of forty minutes or less is polled in four-minute chunks as the WAITING RULE says. Never return "waiting" without a live chain and its chain.pid, and never for work that could have gone into the chain you already ran.`
const WAIT_SCHEMA = { type: 'object', properties: { done: { type: 'boolean' }, why: { type: 'string' }, waited_minutes: { type: 'number' } }, required: ['done', 'why'] }
const waiterPrompt = (dir, lane) => `You are the WAITER of lane ${lane} (J714): no judgment, no edits, no git, no test runs of your own, no reading of the logs. A background chain of test runs is running on this machine in the directory ${dir}; it wrote its PID to ${dir}/chain.pid when it started and it creates ${dir}/chain.done when its last run has finished. Your whole job is to wait for that file. Run this ONE Bash command with the tool's timeout set to 600000 ms, and repeat exactly the same command — no other tool call, no commentary — for as long as its LAST output line starts with RUNNING: ` +
  `timeout 570 bash -c 'until [ -e ${dir}/chain.done ] || ! kill -0 "$(cat ${dir}/chain.pid 2>/dev/null)" 2>/dev/null; do sleep 10; done'; m=$(date -u +%M); if [ $((10#$m % 20)) -lt 10 ] && [ ! -e ${dir}/chain.done ]; then printf '%s ${lane} CHECKPOINT waiter: the chain in ${dir} is running (%s runs finished)\\n' "$(date -u '+%Y-%m-%d %H:%M')" "$(ls ${dir}/*.rc 2>/dev/null | wc -l)" >> ${ROOT}/docs/lane-events.log; fi; if [ -e ${dir}/chain.done ]; then echo "DONE $(date -u +%H:%MZ)"; elif kill -0 "$(cat ${dir}/chain.pid 2>/dev/null)" 2>/dev/null; then echo "RUNNING $(date -u +%H:%MZ)"; else sleep 20; if [ -e ${dir}/chain.done ]; then echo "DONE $(date -u +%H:%MZ)"; else echo "GONE $(date -u +%H:%MZ)"; fi; fi ` +
  `— DONE: return done true, why "chain.done exists", waited_minutes. GONE: return done false, why "the chain's process is gone without its done-file", waited_minutes. The chain may run for many hours and being slow is expected: never stop for any other reason, never kill or start anything.`
const MAX_WAITS = 6 // a lane hands a wait off at most six times in one round; past that the next seat finishes in the foreground
const settle = async (check, lane, kind) => {
  let n = 0
  while (check && check.verdict === 'waiting') {
    n++
    const dir = check.wait && check.wait.dir
    if (!dir || n > MAX_WAITS) {
      log(`${lane}: "waiting" returned ${dir ? `a ${n}th time` : 'without a chain directory'} — the next seat finishes in the foreground`)
      check = await agent(`${args.check} RE-ENTRY ${n} (J714): a seat of your lane returned "waiting" ${dir ? `for the chain ${dir}, the lane's hand-offs are used up` : 'without naming a chain directory'}. You are a FRESH seat of the same lane: continue under the CONTINUE RULE from the lane's CHECKPOINT lines and the files on disk, reuse every finished log that has its .rc, and finish the check in the foreground with four-minute polls — the hand-off is closed to you: return pass or fail.`, opts(`${lane} (re-entry ${n})`, 'Check', CHECK_SCHEMA, kind))
      if (check && check.verdict === 'waiting') { log(`${lane}: "waiting" again after the hand-off was closed — the round stops for the session`); return null }
      break
    }
    const w = await agent(waiterPrompt(dir, lane), { label: `${lane} (waiter ${n})`, phase: 'Check', schema: WAIT_SCHEMA, model: 'haiku', effort: 'low' })
    log(`${lane}: waiter ${n} on ${dir} → ${w ? `${w.done ? 'done' : 'NOT done'} (${w.why})` : 'no result'}`)
    check = await agent(`${args.check} RE-ENTRY ${n} (J714's long-wait hand-off): a seat of your lane started the background chain ${dir} and returned to be woken; the waiter reports ${w ? JSON.stringify(w) : 'nothing (it died)'}. You are a FRESH seat of the same lane ON THE SAME MACHINE: what your predecessor left here — the chain's logs, its scratch files, its mirrors — DOES exist (this overrides, for them, any note in your brief that an earlier seat's mirrors and outputs are gone). Under the CONTINUE RULE read the lane's CHECKPOINT lines (the last "handed to the waiter" line names the chain's logs and the next steps), ${dir}/plan.md and the files your predecessor saved, and the verdict file as it stands. REUSE every finished log that has its .rc beside it (never re-run it); the mirrors are clean where that line says so (rebuild a mirror only when you need one that is missing or not declared clean). If ${dir}/chain.pid is still alive and ${dir}/chain.done is absent, start no second test process: return "waiting" again with the same dir. If the chain died early (a run without its .rc), re-run only what is missing — by a new chain and "waiting" when that is over forty minutes. Then finish the check: judge the results by your own reading of the sources they rest on, write the verdict, the notes, the records and the CLEAN-ROOM row as the lane's seat, and return the structured result.`, opts(`${lane} (re-entry ${n})`, 'Check', CHECK_SCHEMA, kind))
  }
  return check
}
const DEFAULT_SEAT = { build: { model: 'opus', effort: 'high' }, fix: { model: 'opus', effort: 'high' }, check: { model: 'opus', effort: 'high' }, recheck: { model: 'opus', effort: 'medium' } } // J187; J254: a confirm-only re-check at medium
const SEAT = (kind) => ({ ...(DEFAULT_SEAT[kind] || DEFAULT_SEAT.check), ...((args.seats || {})[kind] || {}) }) // the session overrides per kind (J252)
const opts = (label, phase, schema, kind) => { const s = SEAT(kind || (phase === 'Build' ? 'build' : 'check')); return { label, phase, schema, model: s.model, effort: s.effort } }

let built = await agent(args.build, opts(LANE.build(FROM), 'Build', BUILD_SCHEMA, 'build'))
if (!built || built.status === 'blocked') return { id: ID, ok: false, why: 'blocked', built }
args.check += HANDOFF
let check = await settle(await agent(args.check, opts(LANE.check(FROM), 'Check', CHECK_SCHEMA)), LANE.check(FROM))
let round = FROM
while (check && check.verdict === 'fail' && round < FROM + MAX - 1) {
  round++
  const lines = JSON.stringify(check.failing_lines)
  built = await agent(`${args.build} FURTHER ROUND ${round}: the closing checker (plat/docs/build/checks/${LANE.file(FROM)}.md) failed the round on these lines — fix every one inside the owns with a test that pins it, re-run the item's whole test set and the gates, re-land under lane ${LANE.build(round)}: ${lines}`, opts(LANE.build(round), 'Build', BUILD_SCHEMA, 'fix'))
  if (!built || built.status === 'blocked') return { id: ID, ok: false, why: `round S${round} blocked`, built, check }
  check = await settle(await agent(`${args.check} RE-CHECK ${round} (CONFIRM-ONLY for these lines, then the gates; record under lane ${LANE.check(round)}): ${lines}`, opts(LANE.check(round), 'Check', CHECK_SCHEMA, 'recheck')), LANE.check(round), 'recheck')
}
return { id: ID, ok: !!check && check.verdict === 'pass', rounds: round - FROM + 1, built, check }
