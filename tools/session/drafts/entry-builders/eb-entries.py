#!/usr/bin/env python3
"""Build and append the merged round M0-f-02a S3 -> M0-f-02b S2 (Q198, Q175 (b) (c) (d), Q186's read) to specs.json."""
import json
P = '/home/user/maps-architecture/workflows/lane-prompts/session-fix-cloud/specs.json'
s = json.load(open(P, encoding='utf-8'))
tmpl = next(e for e in s['rounds'] if e['id'] == 'M0-c-05' and e.get('round') == 'S4')['session']
a = tmpl.index("Each 'failing line' below is one such row")
b = tmpl.index('THIS ROUND, IN THIS ORDER:')
RULES = tmpl[a:b]
assert "'Hardening round S4'" in RULES
REDS = ("THE HEAD'S DECLARED REDS, should your RELATED@1000 reach them, notes never a failing line of yours: Q152's six bands tests (packages/kernel/test/arr/bands: closing.test.ts ×2, "
        "dryrun.test.ts, hardening-s15.test.ts, restage.test.ts ×2); the reference-machine tests of bench/test/calibrate, host and timing (J176); bench/test/site/summary.test.ts's canary "
        "(J772 (7): the committed site summary is stale until the session's re-run — you neither re-run nor edit a summary); the flake of Q153 (testkit/test/determinism/dilation.test.ts, green alone). ")
MERGED = ("THIS IS LEG {n} OF A MERGED ROUND (the MERGED-ROUND RULE, J443): M0-f-02a S3, then M0-f-02b S2, on ONE tree and ONE branch, no reset between, each leg with its own build and closing check; "
          "the two items share no file, so leg 2 launches when leg 1 has ENDED, whatever its result. ")

def opening(item, rnd, q, rows):
    return (f"This round was opened by the SESSION as {item}'s HARDENING ROUND {rnd} (J237 (2): the M0 hardening phase's fix rounds, batched per owning item; J238: M0 is the bedrock — the default for "
            f"an M0 row is FIX with an exact precaution and a pin; J567: the bar is an independent closing check's PASS on the evidence), on rows the session queued in docs/M0-FIX-QUEUE.md — read each "
            f"row whole by its own grep ({q}); the session's record J787 in docs/PROGRESS.md, read by its own grep: {rows}. ")

f02a = {
 'id': 'M0-f-02a', 'from': 3, 'round': 'S3',
 'session': opening('M0-f-02a', 'S3', "grep '^| Q198 '; grep '^| Q175 '", "Q198's first test and Q175 (d)") + RULES.replace("'Hardening round S4'", "'Hardening round S3'") + MERGED.format(n=1) +
  "THIS ROUND: LINE 1 is TESTS ONLY (a timing-sensitive test made a fact of what it measures); LINE 2 is one small SOURCE change in the tier runner, or REPORTED with its reason. NO-SHIFT: no "
  "tier's manifest, summary or receipt moves. NOTHING HERE JUDGES A TIMING BAR. " + REDS +
  "Notes section 'Hardening round S3'; verdict plat/docs/build/checks/M0-f-02a-s3.md; ledger ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — Q198 (the first of its two tests): bench/test/tiers/exec.test.ts 'spawnExecutor > measures a busy child's CPU time and wall-clock, passes its exit code, and reports its pid' "
           "asserts `r.cpuMs ≥ 150` of a child that spins on the WALL clock for 300 ms (`while (Date.now() < e)`). On a loaded machine the child is given less than half a core and the test is red "
           "with nothing wrong: 'expected 80 to be greater than or equal to 150' in the gate of the seventy-eighth landing (RELATED@1000, two workers beside other runs, load 5 – 7 on four cores); "
           "green alone on the same tree.",
   'evidence': "docs/M0-FIX-QUEUE.md row Q198 — read it whole; plat/bench/test/tiers/exec.test.ts :32 – :43; plat/bench/src/tiers/ — `spawnExecutor` and how it reads the child's CPU time; Q147's "
               "method for a loaded run (bench/test/scan: 'under six busy loops on four cores').",
   'required_change': "TESTS ONLY (the executor reports what the child used: no source change unless you show it wrong): the planted child spins until ITS OWN CPU time (`process.cpuUsage()`) "
               "reaches a target, then idles for a stated wall time before it exits — so that 'CPU time at least the target (less a stated tolerance)' and 'CPU time well under the wall clock' are "
               "facts of the child whatever the machine's load, and the two readings cannot be confused. The exit-code, output and pid assertions stay. PINS AND MUTANTS, in your mirror: the "
               "executor reporting the wall clock as CPU time → red; reporting 0 → red; the test green in 20 of 20 repeats BESIDE SIX BUSY LOOPS on this four-core machine (state the command) and "
               "in 20 of 20 alone. NO-SHIFT."},
  {'line': "LINE 2 — Q175 (d) (the observation of M0-f-02b S1's leg: not an open row of its check): the exported `runTier` still honours `fallback: true` for ANY manifest, while the command line "
           "refuses that switch outside tier:pr (Q151's ruling); no in-tree caller passes it elsewhere, so the rule lives only in the caller.",
   'evidence': "docs/M0-FIX-QUEUE.md rows Q175 (d) and Q151 — read both whole; plat/bench/src/tiers/ — `runTier` and its `fallback` option; plat/bench/src/tier-jobs/cli.ts — where the command line "
               "refuses the switch; plat/docs/build/checks/M0-f-02a-notes.md and M0-f-02b-notes.md 'Hardening round S1'.",
   'required_change': "MAKE THE RULE THE FUNCTION'S: `runTier` itself refuses `fallback: true` for a manifest that is not the PR tier's, with a typed, pinned message (J263 Q6), so that no caller can "
               "run a nightly or milestone tier with a fallback — OR, if the code shows a lawful caller that needs it (name it), the row is REPORTED with that reason and nothing is built. PIN: "
               "`runTier` on a nightly-shaped manifest with `fallback: true` refuses; on the PR manifest it runs as today (the existing fallback tests unchanged). MUTANT: the guard removed → red. "
               "No export is added, removed or renamed; the command line's own refusal and its text stay."},
 ],
}
f02b = {
 'id': 'M0-f-02b', 'from': 2, 'round': 'S2',
 'session': opening('M0-f-02b', 'S2', "grep '^| Q198 '; grep '^| Q175 '; grep '^| Q186 '", "Q198's second test, Q175 (b) and (c), and Q186's read") + RULES.replace("'Hardening round S4'", "'Hardening round S2'") + MERGED.format(n=2) +
  "THIS ROUND, IN THIS ORDER: LINE 1 a one-word SOURCE fix with a deterministic pin; LINE 2 a small SOURCE addition (a deadline); LINE 3 TESTS ONLY; LINE 4 a READ whose deliverable is a table in "
  "your notes — it edits no file of another item. NOT THIS ROUND'S: Q175 (a), the in-run start marker (M0-x-06 writes it: a contract between two items, not required for M0's exit). NO-SHIFT: no "
  "tier's manifest, job list, summary or receipt moves. NOTHING HERE JUDGES A TIMING BAR; a test that needs a clock takes an injected one. " + REDS +
  "Notes section 'Hardening round S2'; verdict plat/docs/build/checks/M0-f-02b-s2.md; ledger ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — Q198 (the second of its two tests): `replayFixture` (plat/bench/src/tier-jobs/cli.ts) declares a hang when the wait is OVER `hangMs` (`performance.now() − current.at > "
           "opts.hangMs`) and then reports `ms: Math.round(performance.now() − current.at)` — so a wait of 1 500.3 ms is reported as 1500 and the log line reads 'no return in 1500 ms (a hang, over "
           "1500 ms)'. bench/test/tier-jobs/cli.test.ts's two `expect(hung.hang?.ms).toBeGreaterThan(1_500)` (:236, :415) then fail by the rounding: 'expected 1500 to be greater than 1500' in the "
           "gate of the seventy-eighth landing; green alone.",
   'evidence': "docs/M0-FIX-QUEUE.md row Q198 — read it whole; plat/bench/src/tier-jobs/cli.ts :384 – :396 (the watchdog's test and the reported `ms`) and :463 (the log line's format); "
               "plat/bench/test/tier-jobs/cli.test.ts :227 – :240 and :405 – :440.",
   'required_change': "FIX: the whole milliseconds reported are never UNDER the measured wait (the ceiling), so the number printed is over `hangMs` whenever a hang is declared and 'over N ms' is true "
               "of it; the log line's format is unchanged (J263 Q6). PIN, DETERMINISTIC (no race): the watchdog reads its time through one injectable clock (an option whose default is "
               "`performance.now`; say where it is threaded) and a test drives it — a wait of `hangMs` exactly declares nothing; `hangMs + 0.3` declares a hang and reports `hangMs + 1`. MUTANTS: "
               "the rounding restored → red; the test `>=` in place of `>` → red on the first half. The two existing assertions stay as written and are green in 20 of 20 repeats beside six busy "
               "loops on this machine."},
  {'line': "LINE 2 — Q175 (b) / N-11: a replay child that hangs OUTSIDE any seed is never stopped — the watchdog arms on a seed's start line, so a child stuck before its first start (in its "
           "imports) or between a `done` and the next `start` leaves no seed in flight, `replayFixture` waits on it without limit and `edge-hangs` names nothing (PLAUSIBLE by reading in the S1 "
           "check; the planted children of today's tests exit by themselves after 8 s, which is what would hide it).",
   'evidence': "plat/docs/build/checks/M0-f-02b-notes.md row N-11 — read it whole; docs/M0-FIX-QUEUE.md row Q175 (b); plat/bench/src/tier-jobs/cli.ts — `replayFixture` whole, `edgeHangs` and its "
               "log lines.",
   'required_change': "CONFIRM IT FIRST (a planted child that prints nothing and never exits; one that hangs after a `done`) — if the code already stops it, say how and pin that. Otherwise MAKE IT "
               "RIGHT: a whole-replay deadline — no line for `hangMs` after the last line (or after the spawn, before the first) stops the child's group and is reported as a hang OUTSIDE A SEED, "
               "with the last seed that returned; `edge-hangs` prints a line for it (new text, pinned verbatim) and exits as for a hang. The result's shape may gain what that report needs; say "
               "so in your choices row. PINS: both planted children stopped within `hangMs` plus one poll by the injected clock of LINE 1 (never by waiting 8 s); the existing in-seed hang "
               "unchanged. MUTANTS: the deadline removed → both pins red; the deadline armed only before the first start → the second pin red."},
  {'line': "LINE 3 — Q175 (c) / N-13 (tests only): the close-time marker read (`if (res.hang === null) readMarks();` at the child's `close`) is pinned only by a race — the S1 check's mutant M9 "
           "(the read dropped) survived its sweep and was killed in 4 of 6 repeats.",
   'evidence': "plat/docs/build/checks/M0-f-02b-notes.md row N-13 — read it whole; checks/M0-f-02b-s1.md (M9); plat/bench/test/tier-jobs/cli.test.ts § Q146.",
   'required_change': "TESTS ONLY: the marker-only child that finishes, run with `pollMs` above its whole run (the note's 60 000), so that ONLY the close-time read can count its three returns. "
               "MUTANT: M9 red in 6 of 6 repeats. NO-SHIFT."},
  {'line': "LINE 4 — Q186, A READ (no code, no other item's file): three coverage assertions can fail a low-strength run on an unlucky seed — packages/kernel/test/insert/step1-2/bfuzz.test.ts "
           ":204 ('every branch of step 2 is exercised'; red at PLAT_FUZZ_RUNS=25 with PLAT_FUZZ_SEED=-1806464159) and packages/kernel/test/tx/oracle.test.ts's kernel-tiny 'undone inside frames: "
           "grow faces[3]' (red at 25 runs on two seeds); green at full strength and at 1 000 runs. Nobody has read at which strength and with which seed each TIER runs them.",
   'evidence': "docs/M0-FIX-QUEUE.md row Q186 — read it whole; plat/bench/src/tier-jobs/ (the PR, nightly and milestone job lists: each vitest job's strength and seed, the tier sizes the runner "
               "clears and sets); plat/tools/vitest/ (the seed's global setup); the two test files (read, never edited).",
   'required_change': "A TABLE IN YOUR NOTES, each row from the job lists and one run: tier × the two files → the strength (PLAT_FUZZ_RUNS) and the seed's source (fresh a run, fixed, the tier's) "
               "they run with; then, for each tier whose strength is under 1 000, the two files run at that tier's strength over 40 seeds of your own, the reds counted with their seeds. THE "
               "ANSWER the session needs: is any tier EXPOSED (a red rate above 0 at its own strength)? If none, say so and Q186 closes on your table; if one is, REPORT the fix shape for the "
               "owners (the tier's strength for those files raised in ITS job list — yours to state, not to build without the session's word — or the assertion conditioned on the run count it "
               "needs, in M0-a-04's and M0-a-06's files). No pin."},
 ],
}
have = {(e['id'], e.get('round')) for e in s['rounds']}
assert ('M0-f-02a', 'S3') not in have and ('M0-f-02b', 'S2') not in have
s['rounds'] += [f02a, f02b]
json.dump(s, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(P, 'a').write('\n')
print('appended; rounds =', len(s['rounds']), len(f02a['session']), len(f02b['session']))
