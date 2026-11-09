export const meta = {
  name: 'integration-seat',
  description: 'One stage-group INTEGRATION CHECK of flow-7 (J173 / J695 (1)) run as a single Opus seat from a prompt the session rendered with workflows/lane-prompts/session-fix-cloud/render-int.mjs; applies nothing itself',
  phases: [
    { title: 'Integrate', detail: 'the group\'s items composed: gates, relative-locality tests, composition probes, the verdict file and its record' },
  ],
}

// args: { promptFile (the absolute path of render-int.mjs's output JSON: keys group, ids, lane, busy, prompt), group, lane,
//         seat: { model, effort } (default opus/high — J631's tiering for a check that is mostly gates and probes), prev (optional:
//         the previous check's failing lines when this is the re-check after an integration fix; informative only — the prompt
//         already carries them when render-int.mjs was given prevLinesJson) }
// Scripts cannot read files, so the seat reads its own prompt first (34-session-fix.js's form). The seat's return value is the
// checker's structured verdict; the child session hands it back to the parent with the lane lines (child-recipe.md step 7).
const CHECK_SCHEMA = {
  type: 'object',
  properties: {
    group: { type: 'string' },
    pass: { type: 'boolean' },
    verdict_file: { type: 'string' },
    record: { type: 'string' },
    ledger_row: { type: 'string' },
    failing_lines: { type: 'array', items: { type: 'object', properties: { line: { type: 'string' }, item: { type: 'string' }, evidence: { type: 'string' }, required_change: { type: 'string' } }, required: ['line', 'item', 'evidence', 'required_change'] } },
    notes: { type: 'array', items: { type: 'string' } },
    report: { type: 'string' },
  },
  required: ['group', 'pass', 'failing_lines', 'report'],
}
const seat = { model: 'opus', effort: 'high', ...((args && args.seat) || {}) }
const group = String(args.group)
const lane = args.lane || `check/integration-flow-7-g${group}`
const brief = `Your brief is the string under the key "prompt" in the JSON file ${args.promptFile} (keys group, ids, lane, busy, prompt). Print it whole first (python3 -c "import json;print(json.load(open('${args.promptFile}'))['prompt'])") and follow it exactly; everything below adds to it. ` +
  `Write a CHECKPOINT line to docs/lane-events.log (the form "<YYYY-MM-DD HH:MM> ${lane} CHECKPOINT <what is done; next: …>") when you start, after the gates, after each probe batch and before the verdict, and the LANDED line ("<YYYY-MM-DD HH:MM> ${lane} LANDED plat/docs/build/checks/integration-g${group}.md plat/docs/build/landed/check-integration-g${group}.json (CLEAN-ROOM L-nnnn) — verdict PASS|FAIL: <the gates, the tests, the probes, the notes>") when the verdict file and its record are written — the lane log is the only progress the parent reads. ` +
  `WAITING RULE (J258; J714's cache-warm chunk): never end a turn before you have returned your structured result; run anything you expect to take over four minutes (NEAR, RELATED@1000, a probe batch) in the background with a log and a done-file — ( cmd > out.log 2>&1; touch done ) & — and wait for it in the FOREGROUND in chunks of at most FOUR minutes — timeout 240 bash -c 'until [ -e done ]; do sleep 15; done' — repeating the chunk and writing a CHECKPOINT line about every twenty minutes until the done-file exists; a seat's prompt cache lives five minutes, so a call that blocks longer makes the next request re-write your whole context instead of re-reading it at a tenth of the price (measured 2026-11-06); never wait with a Monitor or with pgrep of your own command line (J227). ` +
  `Run no git command at all (the child session snapshots the tree); edit no file of any item; write only the verdict file, its notes, its landed record and your CLEAN-ROOM row (plat/CLEAN-ROOM.md §2, the next free L-id, the lane as seat). Return group "${group}", pass, verdict_file, record, ledger_row, failing_lines (each with the ONE item whose files must change), notes and a short report.`

phase('Integrate')
log(`integration check ${lane}: items of group ${group}, one ${seat.model}/${seat.effort} seat`)
const result = await agent(brief, { label: lane, phase: 'Integrate', schema: CHECK_SCHEMA, model: seat.model, effort: seat.effort })
if (!result) { log(`${lane}: the seat returned nothing (skipped or died) — the child reports to the parent`); return { group, lane, pass: null, failing_lines: [], report: 'no result' } }
log(`${lane}: ${result.pass ? 'PASS' : 'FAIL'} — ${result.failing_lines.length} failing line(s)`)
return { lane, ...result }
