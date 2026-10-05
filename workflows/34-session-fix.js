export const meta = {
  name: 'session-fix',
  description: 'A session-opened fix round on an item committed in an earlier wave (J186): an Opus implementer under the build brief of workflows/23, an independent Opus closing checker, at most two further fix rounds',
  phases: [
    { title: 'Build', detail: 'the fix round, inside the item\'s owns' },
    { title: 'Check', detail: 'an independent closing check of the session\'s lines' },
  ],
}

// args: { id, briefs, maxRounds (default 3) } — briefs is a JSON file the session rendered from workflows/23's buildPrompt and
// closingCheckPrompt (keys build, check); scripts cannot read files, so each seat reads its own brief first. A further round
// appends the checker's failing lines to the build brief and re-runs the closing check on them.
const BUILD_SCHEMA = { type: 'object', properties: { item: { type: 'string' }, status: { type: 'string', enum: ['ready-for-check', 'blocked'] }, files: { type: 'array', items: { type: 'string' } }, landed_record: { type: 'string' }, tests: { type: 'object', properties: { passed: { type: 'number' }, failed: { type: 'number' } }, required: ['passed', 'failed'] }, gates: { type: 'array', items: { type: 'object', properties: { command: { type: 'string' }, exit: { type: 'number' } }, required: ['command', 'exit'] } }, choices_rows: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['item', 'status', 'files', 'landed_record', 'tests', 'gates', 'choices_rows', 'notes'] }
const CHECK_SCHEMA = { type: 'object', properties: { item: { type: 'string' }, verdict: { type: 'string', enum: ['pass', 'fail'] }, report: { type: 'string' }, failing_lines: { type: 'array', items: { type: 'object', properties: { line: { type: 'string' }, evidence: { type: 'string' }, required_change: { type: 'string' } }, required: ['line', 'evidence', 'required_change'] } } }, required: ['item', 'verdict', 'report', 'failing_lines'] }
const ID = args.id
const MAX = args.maxRounds || 3
const brief = (key) => `Your brief is the string under the key "${key}" in the JSON file ${args.briefs}. Print it whole first (python3 -c "import json;print(json.load(open('${args.briefs}'))['${key}'])") and follow it exactly; everything below adds to it.`
args.build = brief('build')
args.check = brief('check')
const opts = (label, phase, schema) => ({ label, phase, schema, model: 'opus' })

let built = await agent(args.build, opts(`build/${ID}-fix-s1`, 'Build', BUILD_SCHEMA))
if (!built || built.status === 'blocked') return { id: ID, ok: false, why: 'blocked', built }
let check = await agent(args.check, opts(`check/${ID}-close-s1`, 'Check', CHECK_SCHEMA))
let round = 1
while (check && check.verdict === 'fail' && round < MAX) {
  round++
  const lines = JSON.stringify(check.failing_lines)
  built = await agent(`${args.build} FURTHER ROUND S${round}: the closing checker (plat/docs/build/checks/${ID}-s1.md) failed the round on these lines — fix every one inside the owns with a test that pins it, re-run the item's whole test set and the gates, re-land under lane build/${ID}-fix-s${round}: ${lines}`, opts(`build/${ID}-fix-s${round}`, 'Build', BUILD_SCHEMA))
  if (!built || built.status === 'blocked') return { id: ID, ok: false, why: `round S${round} blocked`, built, check }
  check = await agent(`${args.check} RE-CHECK S${round} (CONFIRM-ONLY for these lines, then the gates; record under lane check/${ID}-close-s${round}): ${lines}`, opts(`check/${ID}-close-s${round}`, 'Check', CHECK_SCHEMA))
}
return { id: ID, ok: !!check && check.verdict === 'pass', rounds: round, built, check }
