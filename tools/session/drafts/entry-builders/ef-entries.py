#!/usr/bin/env python3
"""Build and append pass B's second batch — M0-e-02 S5 (Q208), M0-c-05 S6 (Q203 (a)), M0-t-00 S2 (Q209 (a)), M0-e-04 S6
(Q209 (b)) — to specs.json. Four independent legs on file-disjoint items that no child is editing."""
import json
P = '/home/user/maps-architecture/workflows/lane-prompts/session-fix-cloud/specs.json'
s = json.load(open(P, encoding='utf-8'))
tmpl = next(e for e in s['rounds'] if e['id'] == 'M0-c-05' and e.get('round') == 'S4')['session']
a = tmpl.index("Each 'failing line' below is one such row")
b = tmpl.index('THIS ROUND, IN THIS ORDER:')
RULES = tmpl[a:b]
assert "'Hardening round S4'" in RULES

REDS = ("THE HEAD'S DECLARED REDS, should your RELATED@1000 reach them, notes never a failing line of yours: Q152's six bands tests (packages/kernel/test/arr/bands: closing.test.ts ×2, "
        "dryrun.test.ts, hardening-s15.test.ts, restage.test.ts ×2); two SEED-DEPENDENT reds of the same item's folders (Q191: derived.test.ts 'straight lanes …'; Q206: testkit's "
        "arr-bands/agreement-tilerings.test.ts — red at some run seeds, green at others); the reference-machine tests of bench/test/calibrate, host and timing (J176); "
        "bench/test/site/summary.test.ts's canary (J772 (7): the committed site summary is stale until the session's re-run — you neither re-run nor edit a summary); Q202 — the seven 'later "
        "rungs' cases of packages/layout/test/enceinte/s5seeds.test.ts, which register only at FULL strength (PLAT_FUZZ_RUNS unset); the flake of Q153 "
        "(testkit/test/determinism/dilation.test.ts, green alone — a round in flight fixes it); and Q209's two LOAD FLAKES, which legs 3 and 4 of this very round fix — "
        "bench/test/timing-phase/script.test.ts's real-detector case and packages/layout/test/districts/perimeter.test.ts's 'equals §3.4's buffer …': a seat that meets either before its leg "
        "has landed in the tree re-runs it alone and says so. ")
RESTARTS = ("THE RESTARTS (a fact of this platform on 2026-11-12 / 13: a container restarts about every two hours, at times more often, whether or not background tasks are live; "
            "/home/user/maps-scratch survives, every process dies, /tmp does not survive): every run over ten minutes is a STEP OF A RE-ENTRANT CHAIN under /home/user/maps-scratch/waves/ — "
            "its log and its exit-code file beside it, and for a run of many parts one exit-code file per part, so that a seat that comes back after a restart skips what is finished; "
            "RELATED@1000 IN CHUNKS — collect RELATED's own file list once (`vitest related --run` with the JSON reporter and a test-name filter that matches nothing, e.g. "
            "-t '^__no_such_test__$'), split it by 12 files, run each chunk with `vitest run --passWithNoTests` at PLAT_FUZZ_RUNS=1000 under ONE recorded PLAT_FUZZ_SEED, each chunk's JSON "
            "report and exit code beside it, the totals summed from the JSON reports; each mutant its own exit-code file. ")
MERGED = ("THIS IS LEG {n} OF A MERGED ROUND (the MERGED-ROUND RULE, J443): M0-e-02 S5, then M0-c-05 S6, then M0-t-00 S2, then M0-e-04 S6, on ONE tree and ONE branch, no reset between, each "
          "leg with its own build, closing check, LANDED line and record. THE LEGS ARE INDEPENDENT (four items with no file in common; none reads another's change): each leg launches when "
          "the one before it has ENDED, passed or not. ")


def opening(item, rnd, q, rows):
    return (f"This round was opened by the SESSION as {item}'s HARDENING ROUND {rnd} (J237 (2): the M0 hardening phase's fix rounds, batched per owning item; J238: M0 is the bedrock — the default for "
            f"an M0 row is FIX with an exact precaution and a pin; J567: the bar is an independent closing check's PASS on the evidence), on rows the session queued in docs/M0-FIX-QUEUE.md — read each "
            f"row whole by its own grep ({q}) — in PASS B's second batch (the session's records J800, J805 and J808 in docs/PROGRESS.md, each by its own grep): {rows}. ")


e02 = {
 'id': 'M0-e-02', 'from': 5, 'round': 'S5',
 'session': opening('M0-e-02', 'S5', "grep '^| Q208 '", "Q208 — the three closing notes of this item's round S3 (the hydrology's joint bed): N-s3c-4, N-s3c-5, N-s3c-6") +
  RULES.replace("'Hardening round S4'", "'Hardening round S5'") + MERGED.format(n=1) +
  "THIS ROUND, IN THIS ORDER: LINE 1 is the round's ONE SOURCE CHANGE (a wrong field on a lawful input) and a DECLARED SHIFT of that field alone; LINE 2 is a doc sentence; LINE 3 is one pin "
  "and a statement — NO change to the carve. OWNS: plat/packages/site/src/hydro/ and plat/packages/site/test/hydro/ (plat/docs/build/M0-work.json); the water stage (site/src/water/, "
  "M0-e-03's) and the model's records (packages/model/, M0-m-01's) are READ and RUN, never edited — a reader of the field that must change is REPORTED with its file, function and run. THE SESSION'S OWN READING OF THE READERS, to be confirmed or refuted by yours: the water stage reads a "
  "tributary's `flowTo` for its PRESENCE only (polygons.ts's chain: the nearest course point over ALL earlier bodies) and compares the id only against an ESTUARY's — so no polygon should "
  "move; the model carries the field as an optional id and orders it. "
  "THE "
  "JOINT BED OF ROUND S3 STANDS AS LANDED (ab6af015): no bed, no raster cell and no fit may move in this round — LINE 3 says how that is shown. THE SESSION'S RULING ON N-s3c-6 (J808; "
  "vetoable): the tributary's centreline cells that stand above the receiving channel's floor are NOT lowered at M0 — the closing check that found the step recommended exactly that "
  "('None needed at M0'); no bar and no M0 reader reads the channel's floor; and a lowering would re-open the joint bed that rounds S3 and S4 closed (the unconditional form is the S3 "
  "check's mutant M1e: beds rise, a tributary ends below its receiver). It is MEASURED and PINNED here (LINE 3) and CARRIED to the first reader of the raster that needs a flush floor, "
  "with the rule that reader would take written beside it. " + REDS + RESTARTS +
  "Notes section 'Hardening round S5' in plat/docs/build/checks/M0-e-02-notes.md; verdict plat/docs/build/checks/M0-e-02-s5.md; lanes build/M0-e-02-fix-s5 / check/M0-e-02-close-s5; ledger "
  "ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — N-s3c-4 (Q208 (a)): A WRONG FIELD ON A LAWFUL INPUT, older than round S3 — `flowTo` names the RIVER when a tributary joins another tributary: strategy.ts writes "
           "`flowTo: mainId` for every joining tributary. On `eastward`, river 160°, tributaries 250° and 70° (seeds 1 – 3, both cells) tributary 0 leaves by the frame and tributary 1 ends on "
           "tributary 0's corridor (`outfall: 'join'`; the joint bed rightly takes tributary 0 as the receiving course) — and its body reads `flowTo: 'water:river:0'`, a course it never "
           "meets (410 – 1 246 m away over the S3 check's 105 such joins). No refusal, no throw.",
   'evidence': "plat/docs/build/checks/M0-e-02-notes.md 'Closing check of hardening round S3' N-s3c-4 (read the row whole) and plat/docs/build/checks/M0-e-02-s3.md (3); "
               "packages/site/src/hydro/strategy.ts — the tributary plan's `...(joined && fits ? { flowTo: mainId } : {})` and the corridor's owner the joint bed keeps (`corridorOwner`), the "
               "body's `flowTo` where the plans become bodies; packages/site/test/hydro/river.test.ts (round S4's pin 'a tributary received by another tributary …', which reads the bed and "
               "not `flowTo`); THE READERS of the field: packages/model/src/records/site.ts (`flowTo?: Id`, its doc), packages/model/src/schema/order.ts, packages/site/src/water/polygons.ts "
               "(every use of `flowTo`: the river's own head, the estuary's joins, the `else if (body.flowTo !== undefined)` branch). Re-read every cite on your tree.",
   'required_change': "FIX: a joining tributary's `flowTo` is the id of the course that RECEIVES it — the owner of the corridor it ends on, which the joint bed already knows — the river's id where "
               "it joins the river, as today; a tributary that leaves by the frame or does not fit carries none, as today. DECLARED SHIFT of that one field for a tributary received by a "
               "tributary; nothing else moves — bodies' geometry, the raster, the report and every fit identical (shown on the census below). EVERY READER NAMED AND READ: for each reader "
               "listed in the evidence say, with its file and function, what it does when a tributary's `flowTo` names another tributary, and RUN the water stage's own path on the pinned "
               "run if it accepts two tributaries (before / after: the bodies, the fallbacks, the refusals); a reader that would go wrong is REPORTED with the run — never edited (it is "
               "another item's file), and then the session decides whether this line lands before that reader is fixed. THE BENCH'S SITE SUMMARY hashes the bodies: say, by reading the "
               "registered families' options, whether any holds a tributary received by a tributary — if one does, the committed summary moves at the session's final re-run: REPORT it, "
               "never re-run or edit a summary. PINS: on `eastward`, river 160°, tributaries 250° and 70°, seeds "
               "1 – 3, default and `hydroCoarsen` — tributary 1's body reads `flowTo` = tributary 0's id and `outfall: 'join'`, tributary 0 (leaving by the frame) has no `flowTo`; on a run "
               "where a tributary joins the river (round S3's `valleyWithSide` case) it reads the river's id. MUTANT in your mirror: `flowTo: mainId` restored → the first pin red, the "
               "second green. THE CENSUS (J264 (4)): a tributary sweep of the item's fixtures in the S3 closing check's form (its probe is described in M0-e-02-s3.md: fixtures × bearings × "
               "one and two tributaries × both cells × seeds 1 – 3), before = your base mirror, after = the tree — every row identical but the `flowTo` of tributaries received by "
               "tributaries (count them: the S3 check read 105 such joins); refusals 0 → 0."},
  {'line': "LINE 2 — N-s3c-5 (Q208 (b); text): since round S3 a course's reported `maxCarveCm` is its deepest cut on the JOINT bed against the raster before any carve — so a tributary's "
           "figure includes the receiving course's cut on the cells they share (`valley` 16000 / 7000, seed 1: the tributary's own carve is 0 cm and it reports 134 cm). True to the raster; the "
           "field's doc does not say so.",
   'evidence': "plat/docs/build/checks/M0-e-02-notes.md N-s3c-5; packages/site/src/hydro/types.ts (`RiverOutcome.maxCarveCm`, its doc comment); round S3's choices row (C-0510 on the landed "
               "tree: 'each laid course's reported `maxCarveCm` is its deepest cut on the joint bed'); river.test.ts's pin 'the reported deepest cut is read on the joint bed …'.",
   'required_change': "ONE DOC SENTENCE at the field: it is read on the joint bed, against the raster before any carve, shared cells included — so it can exceed the course's own carve; and the "
               "same sentence in this round's choices row. COMMENT ONLY: the built site bundle byte-identical before and after this line (its SHA-256 in the notes). No second field is added: "
               "no reader at M0 needs a course's own carve apart."},
  {'line': "LINE 3 — N-s3c-6 (Q208 (c); a pin and a statement — NO change to the carve, by the session's ruling in this entry's clause): a tributary's centreline cells INSIDE the receiving "
           "course's channel keep their own bed — on `valleyFallingEast` 8000 / 17000, seed 3, `hydroCoarsen`, the tributary's last cell stands at 724 cm, 40 cm above the channel floor "
           "beside it, the bed still descending to the joined cell — because no channel lowers another course's centreline (round S3's rule, which removed the pit).",
   'evidence': "plat/docs/build/checks/M0-e-02-notes.md N-s3c-6 and 'Hardening round S3' (the joint bed; 'never on a centreline'); packages/site/src/hydro/carve.ts `carveJoint` (the "
               "channel's skip of centreline cells); river.test.ts's carveJoint unit title and round S4's pins (N-s3c-1).",
   'required_change': "TESTS AND TEXT: (a) ONE PIN of what stands, on the note's run: the tributary's centreline cells inside the receiving channel are never BELOW the joint bed's level for "
               "that course and never above the raster before any carve; the step to the channel floor beside them is bounded by the receiving course's cut there (state the bound you can "
               "prove from `carveJoint`, and assert it); both beds still non-increasing on the final raster. (a2) THE CENSUS OF THE STEP, read on LINE 1's census runs (no new run owed): the count of runs where a course's centreline cell "
               "inside another course's channel stands above that channel's floor beside it, the largest step in cm, and the fixtures and cells it occurs on (the S3 check counted 36 runs "
               "that moved by this alone) — the figures in the notes and in the choices row. (b) The choices row STATES the step as the designed outcome of round S3's rule, "
               "says in one sentence why it is not made flush at M0 (the clause's ruling), and writes the rule a later reader would take — a joining course's cells inside the receiving channel "
               "lowered toward that channel's level, never below the receiving bed at the joined cell, never past the cap, the joining bed still non-increasing. NO-SHIFT of the whole round's raster: on the census of "
               "LINE 1, every raster digest before = after. No mutant is owed for (b); for (a), the mutant 'the channel lowers another course's centreline cells' (the S3 check's M1e) is "
               "already red on round S4's pins — say which, and that (a) is red under it too."},
 ],
}

c05 = {
 'id': 'M0-c-05', 'from': 6, 'round': 'S6',
 'session': opening('M0-c-05', 'S6', "grep '^| Q203 '", "Q203 (a) — a closing note of this item's round S4 (the street trim): the new branch's guard on the street's end row has no pin") +
  RULES.replace("'Hardening round S4'", "'Hardening round S6'") + MERGED.format(n=2) +
  "THIS ROUND: ONE LINE — a hand case first, and a source change ONLY if the hand case shows a lawful input refused. OWNS: the growth files of this item (growth/proposals.ts, heading.ts, "
  "legality.ts, capacity.ts, prune.ts, index.ts) and packages/layout/test/growth/s5cd/ (plat/docs/build/M0-work.json); growth/boundary.ts, mainRoads.ts and test/growth/s5ab/ are M0-c-04's "
  "and IN FLIGHT in another child — read, never edited. Round S4's branch stands as landed (a6b04f90): a provisional street whose cut lands on its OWN end is made final. " + REDS + RESTARTS +
  "Notes section 'Hardening round S6' in plat/docs/build/checks/M0-c-05-notes.md; verdict plat/docs/build/checks/M0-c-05-s6.md; lanes build/M0-c-05-fix-s6 / check/M0-c-05-close-s6; ledger "
  "ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — N-s4c-2 (Q203 (a)): THE NEW BRANCH's GUARD ON THE END ROW HAS NO PIN. Round S4's branch in growth/prune.ts fires where the vertex the kernel committed for the trim's "
           "cut IS the street's end AND the street's `to` is its own `end` row with one arm; with those conditions dropped every test and all 404 runs stay as they are, because every "
           "provisional street S5c makes carries that row. A street of another shape whose cut lands on its end keeps the old typed refusal (`E_DEGENERATE`, the street left provisional) — "
           "met in no run.",
   'evidence': "plat/docs/build/checks/M0-c-05-s4.md (3) and plat/docs/build/checks/M0-c-05-notes.md 'Closing check S4' N-s4c-2 (read whole); packages/layout/src/growth/prune.ts — the "
               "round-S4 branch and its three conditions, the old path and its `E_DEGENERATE`; packages/layout/test/growth/s5cd/ (trim.test.ts: round S4's hand cases and round S5's "
               "two-street case); the choices rows of rounds S4 and S5 (C-0505, C-0506 on the landed tree); docs/M0-FIX-QUEUE.md row Q203.",
   'required_change': "THE SESSION'S CHOICE (the closing check left it to the session: 'a hand case for the guard, or drop the guard and make such a street final too'): IT TURNS ON ONE FACT, "
               "which you establish FIRST and write down before any test — CAN THE STAGE ITSELF MAKE THE SHAPE? By the code: every place a provisional street's `to` and its end row are "
               "written before the trim runs (S5c's proposals, the commit, any caller of the trim inside this item) — can a provisional street reach the trim with a `to` that names no row, "
               "or with an end row that is not of kind `end`, or that holds a second arm, WHILE the kernel's cut for its trim lands on its end? Name each writer, with file and line, and the "
               "sequence of stage steps that would make each shape, or the invariant that forbids it. THEN ONE OF TWO: (i) NO DOOR OF THE STAGE MAKES IT — the guard is DEFENSIVE: pin it on "
               "a street built by hand through the test seam round S4's hand cases use (one case per shape you named: no row; a second arm) — the typed refusal `E_DEGENERATE` verbatim, the "
               "street left provisional, nothing written, the arena's bits equal before and after — the MUTANT 'the three end-row conditions dropped' (the check's M11) red on those cases "
               "alone, and the choices row names the guard defensive WITH the invariant that makes the shape unreachable. NO SHIFT (tests and text). (ii) A DOOR OF THE STAGE MAKES IT — "
               "then the refusal is a refusal of OUR OWN INTERMEDIATE on lawful input (J264: MAKE-IT-SUCCEED): show the sequence as a run, make such a street final in prune.ts as round S4 "
               "did for the own-end case (the cut lands on its end: nothing is trimmed away, the street is whole), with the run as its pin, M11 red, and the shift DECLARED — and since no "
               "run of the 404 meets the shape, show the sweep unchanged: prune refusals 0 → 0, every root equal. Under either outcome: the refusal census of the item's registered runs "
               "and the 360-run sweep unchanged, and round S5's two-street case (M8's pin) still green and still red under M8."},
 ],
}

t00 = {
 'id': 'M0-t-00', 'from': 2, 'round': 'S2',
 'session': opening('M0-t-00', 'S2', "grep '^| Q209 '", "Q209 (a) — a LOAD-SENSITIVE test of this item, red once in a landing gate run with three workers and green alone at the same seed") +
  RULES.replace("'Hardening round S4'", "'Hardening round S2'") + MERGED.format(n=3) +
  "THIS ROUND: ONE LINE, TESTS ONLY. OWNS: plat/bench/src/timing-phase/ and plat/bench/test/timing-phase/ (plat/docs/build/M0-work.json); no source of the script changes, and the DETECTOR "
  "(plat/bench/src/timing/contention.ts, M0-f-01's file) is READ and RUN, never edited — it is right to name a busy process: the TEST judged the machine it ran on. A nondeterministic test is a defect, and the fix is to assert what the test controls, never to widen a number until "
  "it stops failing. " + REDS + RESTARTS +
  "Notes section 'Hardening round S2' in plat/docs/build/checks/M0-t-00-notes.md; verdict plat/docs/build/checks/M0-t-00-s2.md; lanes build/M0-t-00-fix-s2 / check/M0-t-00-close-s2; ledger "
  "ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — Q209 (a): bench/test/timing-phase/script.test.ts 'a real python3 child of this test, outside ownPids, read by the REAL detector (ps over every process): REFUSE naming "
           "exactly it, by the kind clause' failed in a gate run with three test workers — 'process: MainThread (pid 6562) at ≥ 10 % CPU: named, yet neither the child, the launch chain nor "
           "a prior offender': the test snapshots the machine's offenders BEFORE it spawns its child and allows only those, the child and its own launch chain; a sibling worker that turns "
           "busy between the snapshot and the script's own detection is none of the three. Green alone at the same seed, on two trees.",
   'evidence': "plat/bench/test/timing-phase/script.test.ts — the test (its `priorOffenders` snapshot, the 300 ms wait, the loop over `named`) and the test before it ('after the idle a "
               "planted python3 or Chromium outside the tree still refuses, naming exactly it …', which supplies its own process rows); plat/bench/src/timing/contention.ts (M0-f-01's) — `contention`, "
               "`sampleMachine`, `ancestors`: the detector's two clauses (C-0103: a process of a listed kind, and any process at ≥ 10 % CPU), the calling process never named, its launch "
               "chain exempt from the KIND clause only (C-0138) — plat/docs/build/choices.md, each row by its own grep; the test folder's fixtures.ts (`detector`, `machine`, `PYTHON3`); docs/validation/j795-gate83-2026-11-13/ (the failure text and the two runs alone); "
               "docs/M0-FIX-QUEUE.md row Q209.",
   'required_change': "(a) SHOW THE RACE BY CONSTRUCTION, never by loading the machine and hoping: in a scratch copy, a busy process started AFTER the snapshot and before the script's detection "
               "(a second child spinning the CPU) turns today's test red with the gate's message. (b) THE TEST ASSERTS WHAT IT CONTROLS: against the REAL detector — its own python3 child is "
               "named exactly once, by the KIND clause; the test's own process is never named; a member of its launch chain is named only by the CPU clause; and every OTHER process the "
               "live table shows is LISTED in the test's output and judged only for the lawful FORM of its reason (a listed kind, or '… at ≥ 10 % CPU') — never for who it is. THE SAME RACE "
               "IN ITS OTHER PLACES: the fixed 300 ms wait becomes a bounded poll for the child's own row in the live table (its pid under python3's name) — a fixed sleep is the same bet "
               "on the machine; and the child outlives the test's own timeout by construction (it is killed in `finally`, as today). The strict "
               "claim 'nothing else is named' stays where the test supplies the process rows itself: say which existing test holds it, and add the missing case there if none does (a "
               "supplied table with the child, the chain and one quiet stranger: exactly the child named). (c) GREEN UNDER LOAD: the file 50 times in a row beside three busy loops (the "
               "command and the count in the notes), and the construction of (a) no longer red. (d) NOTHING TODAY'S TEST KILLS IS LOST — MUTANTS in your mirror (in the detector's file, which the mirror may change and the tree may not), each red on "
               "the restated test: python3 dropped from the listed kinds; the calling process no longer exempt (the test's own process named); the launch chain's exemption from the kind "
               "clause removed (a chain member named by its kind); and say, for the one judgement dropped (who a stranger is), which supplied-rows test holds it. No source file changes; "
               "the bundle is not built from tests."},
 ],
}

e04 = {
 'id': 'M0-e-04', 'from': 6, 'round': 'S6',
 'session': opening('M0-e-04', 'S6', "grep '^| Q209 '", "Q209 (b) — a LOAD-SENSITIVE test of this item, timed out once in a landing gate run with three workers and green alone at the same seed") +
  RULES.replace("'Hardening round S4'", "'Hardening round S6'") + MERGED.format(n=4) +
  "THIS ROUND: ONE LINE, TESTS ONLY. OWNS: plat/packages/layout/src/districts/ and plat/packages/layout/test/districts/ (plat/docs/build/M0-work.json); no source changes. A timeout is "
  "allowed only with its derivation (what the test builds, the time measured alone and under load, the factor taken) — never a bare bigger number. " + REDS + RESTARTS +
  "Notes section 'Hardening round S6' in plat/docs/build/checks/M0-e-04-notes.md; verdict plat/docs/build/checks/M0-e-04-s6.md; lanes build/M0-e-04-fix-s6 / check/M0-e-04-close-s6; ledger "
  "ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — Q209 (b): packages/layout/test/districts/perimeter.test.ts 'equals §3.4's buffer of the closed ring united with the boundary (the synthetic towns' last boundaries)' "
           "timed out at vitest's default 5 000 ms in a gate run with three workers — it builds two synthetic towns (`town(seed, { noGrid: true })`, seeds 1 and 2) inside the test and "
           "declares no timeout. Green alone at the same seed, on two trees.",
   'evidence': "plat/packages/layout/test/districts/perimeter.test.ts (the test, :53 on the landed tree) and test/districts/support.ts (`town`); every other test of the folder that calls "
               "`town(` inside an `it` with no timeout; docs/validation/j795-gate83-2026-11-13/ (the failure text and the two runs alone); docs/M0-FIX-QUEUE.md row Q209.",
   'required_change': "(a) MEASURE: the test's time alone and beside three busy loops, ten runs each (the figures in the notes), and the time of one `town` build. (b) THE FIX, in the test "
               "folder only — THE FOLDER'S OWN CONVENTION, which this one test missed: stage.test.ts and land.test.ts state `{ timeout: 120_000 }` (or more) on every test that builds a "
               "town, and stage.test.ts builds each seed's town once through `bySeed`. Bring this test under it: a STATED timeout, shown to be at least ten times the loaded figure of (a) "
               "(if the folder's figure is not, derive a larger one and say so), with one comment saying what it covers; and build the two towns once for the file ONLY if another test "
               "of the file reads them (none does today — say so; a memo for one reader is not owed). (c) THE CENSUS OF THE FOLDER, by reading: every `it` that builds a town or runs a stage "
               "under the default timeout, listed with its measured time; each within a factor of five of 5 000 ms under load is treated as (b) in this round, the rest are named as "
               "measured. (d) GREEN UNDER LOAD: the folder 50 times in a row beside three busy loops (the command and the count in the notes). NO SHIFT: no assertion's expected value "
               "changes; no source file changes; the refusal census of the item's registered families is untouched (tests only — say so, no run owed)."},
 ],
}

have = {(e['id'], e.get('round')) for e in s['rounds']}
for e in (e02, c05, t00, e04):
    assert (e['id'], e['round']) not in have, e['id']
s['rounds'] += [e02, c05, t00, e04]
json.dump(s, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(P, 'a').write('\n')
print('appended; rounds =', len(s['rounds']), [len(e['session']) for e in (e02, c05, t00, e04)])
