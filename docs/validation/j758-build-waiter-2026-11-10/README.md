# J758 — the round workflow's waiter for build seats, 2026-11-10

`workflows/34-session-fix.js` gave the long-wait hand-off (J714) to check seats only. Child DT's build seat
(M0-e-06 S4) owed a re-run of hours, could return only `ready-for-check` or `blocked`, and ended the round
`blocked`. The script now lets a build seat return `waiting` with the chain's directory: the same haiku
waiter, then a fresh build seat of the same lane under the CONTINUE RULE.

`wf-test.mjs <script>` runs the script's own body (its `meta` block cut out) against scripted seats and
prints each course's calls.

| log | script | result |
|---|---|---|
| after.log | the script as changed | seven courses, seven PASS |
| before-control.log | the script before the change | the two courses with no waiting build PASS; the five in which a build waits FAIL (the control) |

Run: `node docs/validation/j758-build-waiter-2026-11-10/wf-test.mjs workflows/34-session-fix.js`.
