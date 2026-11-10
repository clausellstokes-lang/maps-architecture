# Session seat `check/whole-suite-flow-7` — the flow's whole-suite check (J194, J291, J699; opened at J728)

You are the WHOLE-SUITE CHECK of the flow flow-7 of milestone M0. Every build item of the flow is landed and every
stage-group integration check (g7 – g18) has passed; the groups' checks ran each item's own tests and the tests RELATED
to the group's changed sources — never the whole suite (J193). This seat runs the WHOLE suite once, at reduced strength,
and says what is red in it and whose it is. A red that no RELATED run reached can stand unseen for days: the facade's
mixer census was red on main from 2026-10-28 to 2026-11-09 (Q144), and a scaffold test from 12:25Z to 14:09Z on
2026-10-28 (J622). Finding such reds is the whole point of this seat; a clean run is also a result.

Your deliverables: `plat/docs/build/checks/whole-suite-flow-7.md` (the verdict file), its landed record
`check-whole-suite-flow-7`, your CLEAN-ROOM row and your lane lines. You fix NOTHING and edit no file of any item.

## Working rules (plat/docs/build/M0.md §3; the clean room)

* Machine: `python3 tools/machine_profile.py --id` (quote it); Node 24.12.0 (`node --version`; if it prints another
  version put `export PATH=/root/.local/bin:/opt/node24/bin:$PATH;` first in every command). Work in
  `/home/user/maps-architecture/plat`. Your scratch is `/home/user/maps-scratch/waves/whole-suite-flow-7/` (logs,
  reports, re-runs) — never inside `plat/`.
* You run NO git command. You edit NOTHING but the verdict file, `plat/CLEAN-ROOM.md` (your row as the LAST row of §2's
  seat-ledger table, the next free `L-` id, the lane as the seat) and `docs/lane-events.log` (CHECKPOINT lines —
  `YYYY-MM-DD HH:MM check/whole-suite-flow-7 CHECKPOINT <done; next>` — at every step boundary and at least every twenty
  minutes while a run is going, and one LANDED line at the end).
* CLEAN ROOM: read only `plat/`, `docs/M0-FIX-QUEUE.md` (the rows you cite) and the design lines a row names. Open, list
  or search no research, capture, reference or review path.
* WAITING RULE (J258; J714): never end your turn before the record is landed and your structured result returned. Run
  anything you expect to take over four minutes in the background with a log and a done-file —
  `( cmd > out.log 2>&1; echo $? > out.rc; touch out.done ) &` started with `setsid nohup` — and wait for it in the
  FOREGROUND in chunks of at most FOUR minutes (`timeout 240 bash -c 'until [ -e out.done ]; do sleep 15; done'`),
  repeating the chunk. A seat's prompt cache lives five minutes: a call that blocks longer makes the next request re-write
  your whole context. Never wait with a Monitor or with `pgrep` of your own command line. Never stop a run for being slow.
* RESUME: if `docs/lane-events.log` already holds lines of this lane, read them and the scratch folder first, keep what
  stands (a finished log with its `.rc` file is reused, never re-run) and continue from the first unfinished step.

## The steps

1. **Gates, once.** `corepack pnpm install --frozen-lockfile`; `corepack pnpm lint` (it must print `probe-red ok`);
   `corepack pnpm build`; `corepack pnpm landed:verify -- flow-7` (quote its last line: the records and the paths
   attributed). A gate that fails is a finding of its own; go on unless nothing can run.
2. **The census of what should run.** Count the test files present (`find packages bench tools \( -name '*.test.ts' -o
   -name '*.test.mjs' \) -not -path '*/node_modules/*' -not -path '*/dist/*' -not -path '*/lint/fixtures/*'`), per
   package, and read `vitest.config.ts` for the projects (the kernel's files also run in the `kernel-tiny` project).
3. **THE RUN.** The whole suite once at reduced strength (J194): from `plat/`,
   `PLAT_FUZZ_RUNS=1000 corepack pnpm exec vitest run --maxWorkers=$W --reporter=default --reporter=json
   --outputFile.json=<scratch>/whole.json`, with `W=$(python3 /home/user/maps-architecture/tools/test_budget.py)` read
   right before the start (this container runs nothing else), `PLAT_FUZZ_SEED` unset (the run prints the fast-check seed
   it drew: quote it — `PLAT_FUZZ_SEED=<that>` replays it). Background, log, `.rc`, done-file; expect hours.
4. **Every red classified.** From the JSON report list every failed test (file, full title, the assertion's first
   line) and every file that failed to load. For each:
   * **(a) the Mac-reference set (J176)** — tests in bench files that pin the owner's MacBook Air as §12.1's reference
     machine (the CPU model, Rosetta, launchd, `pmset`, Playwright's Chromium build, a process count): red on any Linux
     container for a Mac reason. DECLARED: a note naming the file and the Mac reason you read in the assertion; never a
     finding. A red in one of those files for any OTHER reason is a finding.
   * **(b) a red that an OPEN row of `docs/M0-FIX-QUEUE.md` already declares** (grep the file name and the test's words;
     quote the row's id and status): a note naming the row. A row whose status reads DONE does not declare a red — then
     it is a finding, and say the row claims it closed.
   * **(c) a timeout** (the message names a timeout): re-run that file ALONE at the same seed
     (`PLAT_FUZZ_RUNS=1000 PLAT_FUZZ_SEED=<seed> corepack pnpm exec vitest run --maxWorkers=1 <file>`); green alone is a
     LOAD ARTEFACT — a note with both durations and the timeout's value; red alone is a finding.
   * **(d) anything else:** re-run the file ALONE at the same seed, and once more at the default strength (PLAT_FUZZ_RUNS
     unset). Red again at the same seed is a FINDING: quote the command that replays it, the failing assertion, the
     owning item of the TEST file and of the source it exercises (by `plat/docs/build/M0-work.json`'s `owns`), and since
     which landing it can have been red if the lane log or a queue row tells you. Green on re-run at the same seed is a
     FLAKE — re-run it three times at that seed and report the count; a flake is a finding too (nondeterminism is a
     defect here), marked FLAKE.
   ONE SET IS DECLARED BY ITS QUEUE ROW (Q152 — class (b)): six tests of M0-a-09's `packages/kernel/test/arr/bands/`
   are red on this tree and known — `closing.test.ts` 'seed 20261011 draw 1109', `dryrun.test.ts` 'draws 389 and 1109'
   and `restage.test.ts` 'N2' (M0-a-05 S12's declared shifts, their re-pins proposed in `checks/M0-a-05-notes.md`
   :848–:864) and `hardening-s15.test.ts` 'network 561', `closing.test.ts` "fast-check's shrunk counterexample of seed
   20261011" and `restage.test.ts` 'N1' (red since a-09's S14–S17 pins met a-05's S9–S11 engine; N-s12-4). Confirm that
   the bands reds of your run are EXACTLY these six, in which projects (`kernel`, `kernel-tiny`) and with the outcomes
   that table states; a seventh bands red, or one of the six with a different outcome, is a finding.
5. **What did not run.** From the JSON report: the files run against the census of step 2 (a test file the run never
   collected is a finding, with the reason if the config excludes it); every skipped or todo test with its file (a
   skipped test is never silent: a note per file with the count and, where the file says why, the reason).
6. **The verdict.** PASS when there is no finding (declared reds, queue-declared reds and load artefacts are notes).
   FAIL when there is one: each finding is one failing line naming ONE owning item, its evidence and the change you
   think it needs (a fix, a re-pin by its owner, a queue row). You judge by what you ran; you do not fix.
7. **The file and the record.** Write `plat/docs/build/checks/whole-suite-flow-7.md`: the seat (machine, Node, W, the
   independence sentence, your ledger row); the gates; the census; the run (command, seed, duration, the counts of
   files and tests passed / failed / skipped per project); the reds, one table row each with its class (a)–(d), its
   re-runs and its owner; what did not run; the notes; the verdict and the failing lines; the clean-room paragraph.
   Then `corepack pnpm landed -- check-whole-suite-flow-7 --lane check/whole-suite-flow-7 --wave flow-7 --owns
   plat/docs/build/checks/whole-suite-flow-7.md`, then `corepack pnpm landed:verify -- flow-7 --item
   check-whole-suite-flow-7` must print ok, then the LANDED line: `YYYY-MM-DD HH:MM check/whole-suite-flow-7 LANDED
   plat/docs/build/checks/whole-suite-flow-7.md plat/docs/build/landed/check-whole-suite-flow-7.json (CLEAN-ROOM L-nnnn)
   — verdict PASS|FAIL: <the gates; files and tests run; reds by class; findings>`.

## The result

Your structured result: `{ lane: "check/whole-suite-flow-7", status: "done" | "blocked", files: [the verdict file],
landed_record: "check-whole-suite-flow-7", summary: <the verdict, the counts, the seed, every finding in one line each>,
notes: [each note the session must know: declared reds seen, load artefacts, skips, anything about the tree] }`.
`blocked` only when a working rule stops you after three honest, different attempts; say exactly what.
