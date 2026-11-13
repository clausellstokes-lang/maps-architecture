#!/usr/bin/env python3
"""Build and append M0-a-05 S16 — the RESUME of the router round's killed fix round, under the session's ruling J796 R-1
(the census residual of notBuilt #2 is split from the round) — to specs.json."""
import json
P = '/home/user/maps-architecture/workflows/lane-prompts/session-fix-cloud/specs.json'
s = json.load(open(P, encoding='utf-8'))
s14 = next(e for e in s['rounds'] if e['id'] == 'M0-a-05' and e.get('round') == 'S14')
assert (('M0-a-05', 'S16') not in {(e['id'], e.get('round')) for e in s['rounds']})
OLD = s14['session']
assert OLD.startswith("This round was opened by the SESSION as M0-a-05's HARDENING ROUND S14")

SESSION = (
"This round was opened by the SESSION as M0-a-05's HARDENING ROUND S16 — THE ROUTER ROUND'S CLOSING ROUND: the RESUME of fix round S16 of the round bound as S14 (the same child, the same tree), "
"killed by a restart of the container on 2026-11-13 at about 00:29Z, after its builder had pinned its lines and fixed one source line and before its last re-run chain ended — rendered at "
"'from': 16 so that the lane keys are build/M0-a-05-fix-s16 / check/M0-a-05-close-s16 (child-recipe rule 5: THE KILLED ROUND IS THE ROUND), with ONE RULING OF THE SESSION that changes what the "
"round owes (J796 R-1, below). READ FIRST, each by its own grep, never a large file whole: the S15 re-check's verdict plat/docs/build/checks/M0-a-05-s15.md WHOLE (its section 5 returned six "
"failing lines: this entry's five lines are those six under the ruling); in plat/docs/build/checks/M0-a-05-notes.md the sections 'Hardening round S14', 'Closing check of S14', 'Hardening round "
"S15' and 'Hardening round S16' (the last is this round's own, unfinished); the lane's own CHECKPOINT lines (grep 'build/M0-a-05-fix-s16' docs/lane-events.log); "
"/home/user/maps-scratch/waves/s16-fix/HANDOFF.md. "
"THE RULING (J796 R-1; the session's, vetoable by the owner; binding on both seats): THE CENSUS RESIDUAL OF notBuilt #2 IS SPLIT FROM THIS ROUND. The facts, as rounds S14 – S16 measured them: the "
"fifth pass lowered the census from 203 counted refusals to 196 over the 32 seeds and raised it nowhere; of the 196 (E 51, S 98, D 18, W 17, V 8, P 4; C and A none) ONE — class D: seed −6803, the "
"random property's case 1707 — carries the noSeat-S certificate; on each of the other 195 a seat, a free spot or a route vertex stands within the bound, so J238 (1)'s proof does not hold for it, "
"and no reading of passes 1 – 5 routes it; the certificates are sufficient conditions only (their falsity shows no route). WHAT IS RULED: (1) the 195, and the trio's one class-C case (M0-a-08's "
"harness), are NOT carried to M4 and NOT closed — they are OPEN IN M0, on a row of the session's queue opened at this round's landing, owed to THE RESIDUAL ROUND of this item: a source round the "
"session specs from this round's per-case evidence (LINE 5 (d)); (2) RL1's sentence ('every class is MAKE-IT-SUCCEED in this round or carried to M4 class by class WITH J238 (1)'s proof … a bare "
"carry is a failing line') is amended in its first clause — 'in this round' becomes 'in M0, by the residual round': for THIS round the state 'refused today, no proof, OPEN on the session's row' is "
"a lawful outcome of LINES 2 – 4's residual and of LINE 5 (iv), and neither seat fails the round for it; (3) what DOES fail: any text of the round (notes, choices row, a register, a test title, a "
"comment) that calls the residual closed, done, proven, carried or M4's — but for the one certified case — and any carry without its certificate; (4) the registers keep '(notBuilt #2, M4)' as the "
"class's NAME (J697): the name is not a carry, and the choices row says so once; (5) the reason, for the record: three build rounds have shown that the measured residual needs new router readings "
"whose design a fix round cannot spec for itself (the builder's own reading in the S16 notes: 'the remaining work is a router change in insert/ … not a proof'), while the round's built and pinned "
"work — the fifth pass and its seven rescues, Q77's fix, R-12, FAR1, MK / ML, the cause and the judgment of Q152's group B, the leave gate's re-read — is whole, and the kernel chain waits on its "
"landing. "
"WHAT THE S14 AND S15 CHECKS CONFIRMED STAYS CONFIRMED and is not judged again: LINE 1 (the fifth pass), LINE 6 (Q77 and the r = 51 pin), LINE 8 (R-12), LINE 9 (FAR1; Q142 closed), LINES 10 – 11 "
"(Q152's group B), LINE 5 (i) – (iii), LINE 12 (c) – (d) as declared — except through NEAR and this entry's LINE 4, which run their pin files and figures on the final sources. NOTES OF THOSE CHECKS "
"THAT ARE NO LINE OF THIS ENTRY (the session queues them at the landing; neither seat fails the round for them): the surviving mutants S-ANCH, S-PLAIN, P5-INSIDE, P5-ENDRULES, P5-NOEXT, DEPTH and "
"FAR2, as the S15 verdict's table states them. "
"THE RESUME (it replaces the S14 clause's FRESH paragraph): the tree is child DV's own tree as it stands — the design head the child was launched on, the LANDED rounds S14 and S15, and the "
"unfinished work of S16 (its snapshot is wip/child-a05s14); never a fresh clone, never an overlay. THE BUILD SEAT continues under the CONTINUE RULE from its lane's last CHECKPOINT lines: the pins, "
"the source fix, the round's choices row and ledger rows and its notes section stand as written (re-read, not re-done); the chain /home/user/maps-scratch/waves/s16-fix died with the container — "
"near.rc and undo.rc are finished; related.log, census/ and work-tree2.jsonl are partial; there is no chain.done — so the seat re-runs ONLY the unfinished steps (a finished step is one whose own "
"exit-code file exists), follows that directory's HANDOFF.md to its end, and adds what this entry's LINE 5 (c) – (d) ask and the killed seat did not know of. The S14 build seat's base mirror "
"/home/user/maps-scratch/waves/base-build-M0-a-05-fix-s14/plat is THE BASE (never written; if it is gone, return blocked). THE CHECK SEAT is a full closing check of THIS entry's five lines on the "
"final tree; its base is the S14 closing check's own, kept at /home/user/maps-scratch/waves/check-M0-a-05/base/plat (its identity shown again as the S15 re-check showed it; lost, return blocked "
"and ask the parent for the base's plat/); the S15 re-check's tools under /home/user/maps-scratch/waves/check-M0-a-05/s15/ (mut.py, sweep.sh, the S8-model copy, probe/ewide.py) are the lane "
"family's own and may be re-used after reading. "
"THE RESTARTS (a fact of this platform on 2026-11-12 / 13: a container restarts about every two hours whether or not background tasks are live; /home/user/maps-scratch survives, every process "
"dies, /tmp does not survive): every run over ten minutes is a STEP OF A RE-ENTRANT CHAIN under /home/user/maps-scratch/waves/ — its log and its exit-code file beside it, and for a run of many "
"parts one exit-code file per part, so that a seat that comes back after a restart skips what is finished: the census one file per seed; RELATED@1000 IN CHUNKS — collect RELATED's own file list "
"once (`vitest related --run` with the JSON reporter and a test-name filter that matches nothing, e.g. -t '^__no_such_test__$'), split it by 12 files, run each chunk with `vitest run "
"--passWithNoTests` at PLAT_FUZZ_RUNS=1000 under ONE recorded PLAT_FUZZ_SEED, each chunk's JSON report and exit code beside it, the totals summed from the JSON reports (a file that registers no "
"test at 1 000 runs is named); NEAR one run per project. A CHECKPOINT line names the chain's directory and its next unfinished step at least every twenty minutes of the seat's own work. "
"THE CHECKER'S CENSUS (for this entry it replaces the S14 clause's 'the checker … re-runs AFTER in full'; the session's ruling, with its reason): the S14 closing check ran the AFTER census in full "
"itself, on sources that differ from the final ones by ONE gate (LINE 2's re-read), which only the fifth pass reaches, and the fifth pass runs only on a chain the base refuses for the bound. So "
"the checker (a) reads the builder's final per-case log by its SHA-256 and diffs it against ITS OWN S14 AFTER log (kept under /home/user/maps-scratch/waves/check-M0-a-05/), (b) re-runs in full, on "
"its own mirror of the final tree, FOUR seeds of its own choosing AND every seed on which (a) shows a line moved, and compares those seeds' per-case lines with the builder's byte for byte, (c) "
"fails LINE 4 on any difference it cannot trace to the gate. If its own S14 AFTER log is gone, it runs the AFTER census in full. "
"THE SEATS (unchanged): build opus/high, fix opus/high, check fable/high, recheck opus/medium. THE ROUND NUMBER: lanes build/M0-a-05-fix-s16 / check/M0-a-05-close-s16; verdict "
"plat/docs/build/checks/M0-a-05-s16.md; the notes section 'Hardening round S16' is CONTINUED, not started again; the records M0-a-05 and build-M0-a-05-notes are landed under "
"build/M0-a-05-fix-s16; the round's choices row and ledger rows keep the ids they have, further rows take the next free. "
"DECLARED REDS of the child's base that are no finding of this round (as the S15 re-check's RELATED read them): Q152's six bands tests; the four bench / site reds the S14 check named (J176's "
"reference-machine tests and bench/test/site/summary.test.ts's stale-summary canary among them); Q153's flake (testkit/test/determinism/dilation.test.ts, green alone); and — the session's finding "
"since this round was bound (Q202) — the seven 'later rungs' cases of packages/layout/test/enceinte/s5seeds.test.ts, which register only at FULL strength (PLAT_FUZZ_RUNS unset; at 1 000 runs the "
"file reports 'No test found') and are red on the base and the tree alike (the lane's CHECKPOINT of 2026-11-12 22:52 met them as 'F-WALL … red on both'): another item's, re-pinned by a round in "
"flight, NAMED in the RELATED and stage-work readings and never a failing line here. "
"THE S14 ENTRY'S SESSION CLAUSE STAYS BINDING wherever this entry does not replace it — RL1 (as amended above) and J697, the owns and the NO-CROSS-ITEM rule, the pin and mutant rule, the "
"declared-shift rule, the census rule (4), the frozen API, the write door, the base-mirror and before / after discipline, the bands gate, the waiting rule — and is quoted whole between the marks "
"below; where it says S14's lanes, FRESH, 'the RESUME head' or 'the checker … re-runs AFTER in full', read the paragraphs above. «" + OLD + "»")

LINES = [
 {'line': "LINE 1 — LINE 2's THREE PINS (the S15 re-check's returned line 1, its pin part): the fifth pass's joint ends (E-JOINT), its order and ties (E-TIES) and its bound (E-WIDE) have no "
          "fixture — each mutant survived the twelve pin files, and the S15 round's reason for having no E-WIDE fixture ('noSeat is false wherever class E fires') was refuted by the checker's "
          "own construction.",
  'evidence': "plat/docs/build/checks/M0-a-05-s15.md §1.1 and §3 (E-JOINT, E-TIES, E-WIDE: SURVIVE 370 / 370; the construction /home/user/maps-scratch/waves/check-M0-a-05/s15/probe/ewide.py); "
              "insertChain.ts — the fifth pass's step-2 landing list and its pick (`fifthPick`), `turns`' joint branch, `verticesWithin` at FIDELITY_SQ; test/insert/step3-5/router.test.ts, "
              "noseat.ts, register/s14-rescues.json; the S16 notes' rows 'LINE 2 (class E) — E-JOINT', 'LINE 2 — E-TIES', 'LINE 2 — E-WIDE'. Re-read every cite on the tree.",
  'required_change': "PINNED, each pin killing its mutant with the S15 re-check's exact replacement: E-JOINT — a two-point chain that commits ONLY through the joint branch (the notes say which "
              "pair of landings committed and how that was observed); E-TIES — the list's order pinned on an arena where two candidates stand at the SAME distance (nearest first, ties y then x) "
              "and its count pinned; E-WIDE — a class-E end certified by noSeat (TRUE on it, FALSE on a control stated in the test) with a seat in (bound, √2 · bound] stays refused with the "
              "base's exact detail, writes nothing, and the mutant judging at 2 · FIDELITY_SQ is red on it; what the fixture adds to the checker's construction, and why the construction alone "
              "does not kill the mutant, is STATED in the test and the notes; C-0490 (2)'s sentence is withdrawn in the choices row, append-only. THE CHECKER re-kills the three on its own "
              "mirror, runs the new tests on a copy of its base (the pins of the fifth pass red there — it does not exist on the base —, the arena pins green, as the notes say), and reads the "
              "E-WIDE fixture's arithmetic against its own construction's."},
 {'line': "LINE 2 — LINE 4's D-RL PIN AND THE SOURCE DEFECT IT EXPOSED (the S15 re-check's returned line 3, its pin part; C-0286 (4)): the gate on a stretch's leave landed AFTER the join had no "
          "fixture (D-RL survived); the builder's fixture for it then went red in kernel-tiny — S14's fifth-pass gate in snapRound.ts's `route` read the leave vertex k's point from X / Y cached "
          "at the function's entry, and the landing may allocate k and GROW the vertex table, which replaces p.vertices: the gate judged (undefined, undefined), found it out of bound and "
          "refused — fail-safe (a fifth-pass refusal is discarded) but capacity-dependent: a lawful chain's outcome depended on when the table grew.",
  'evidence': "plat/docs/build/checks/M0-a-05-s15.md §1.3 (D-RL SURVIVES); snapRound.ts `route` — the fifth pass's gate on the leave after `planLandingAfter` / `applyLanding` (:671 on the S15 "
              "tree; re-read), the two `fifthExit` calls; arena/plat.ts's re-read rule and choices.md C-0286 (4); the S16 lane's CHECKPOINT lines of 2026-11-12 22:52 and 22:59 and "
              "/home/user/maps-scratch/waves/s16-chain/near.json (kernel 402 / 402; kernel-tiny one red: 'a stretch's leave at (undefined, undefined) lands beyond the fidelity bound'); the S16 "
              "notes' rows 'LINE 4 — D-RL' and 'LINE 4 D — the source fix (found by D-RL)'.",
  'required_change': "(a) D-RL PINNED by a constructed fixture: the PLANNED leave within the bound of the input segment, the LANDED leave beyond it; the fifth pass refuses with the gate's pinned "
              "text, passes 1 – 4 share the stretch as the base does; the mutant (the gate off) red. (b) THE FIX, ONE GATE: k's point is re-read from p.vertices after the landing; the message "
              "text is unchanged; pinned by STALE-K (the S14 line restored → D-RL's fifth-pass test red in kernel-tiny). `diff -rq` of packages/*/src between the S15 re-check's tree mirror (the "
              "S14 sources) and the final tree shows snapRound.ts ALONE, and within it that gate alone (the diff quoted in the notes). (c) THE AUDIT, per site with file:line, of every OTHER "
              "read the fifth pass's code makes from a column cached before a call that may allocate — `route`'s two `fifthExit` calls, and in stretch.ts and insertChain.ts every read inside or "
              "after `attractStretch`, `verticesWithin`, `exactlyCovered`, `fifthPick` and the landing list — each shown to precede every allocation of its call or to sit in a function that "
              "allocates nothing. THE CHECKER repeats (c) by its own reading of the three files' fifth-pass code and runs NEAR's kernel-tiny project (every allocation a growth) as the "
              "mechanical half; ANOTHER stale read it finds is a BLOCKER of this line, fixed in the same form by the further round. (d) Because (b) changes what the kernel does on a lawful "
              "chain whose landing grows the table, S14's AFTER figures are taken again on the final sources: LINE 4."},
 {'line': "LINE 3 — LINE 7, MK / ML (the S15 re-check's returned line 5; J371, N-s8c-4): M0-a-06 S7's two surviving mutants of this item's rewalk.ts and snapRound.ts — both "
          "`segmentBox(…, REACH)` of rewalk.ts back at 1 cm (MK) and `recordHolding`'s reach at 1 cm (ML) — still survive: the S15 round built no arena and gave no proof.",
  'evidence': "plat/docs/build/checks/M0-a-05-s15.md §1.6; rewalk.ts's two `segmentBox(…, REACH)` and snapRound.ts's `recordHolding` (re-read); plat/docs/build/checks/M0-a-05-notes.md N-s8c-4 "
              "and N-s8-3; the S16 notes' rows 'LINE 7 — MK' and 'LINE 7 — ML'.",
  'required_change': "Each PINNED on a hand-built arena — stated in the test as one no LAWFUL input reaches where that is so (N-s8-3's kind), with the reason it is still the right pin (the reach "
              "is the code's own precaution) — green on the base copy and on the tree, MK and ML each KILLED by its test alone. N-s8c-4's two 'equivalent on lawful input' readings are CORRECTED "
              "in the notes, append-only, to what the arenas show, and the notes say in one line FOR THE SESSION whether the ML arena (or the MK one) can be reached by lawful input — a lawful "
              "input on which the kernel's outcome hangs on that reach is a row of the session's queue, not a line of this round. THE CHECKER re-kills both, runs both tests on a copy of its "
              "base, and judges the reachability sentence by its own reading."},
 {'line': "LINE 4 — LINE 12 (f) AND THE ROUND'S FIGURES ON THE FINAL SOURCES (the S15 re-check's returned line 6, with LINE 2 (d) above): the stage fixtures' work under the fifth pass was never "
          "measured ('Stage fixtures beyond the CITY derivations: not run'), and every AFTER figure of rounds S14 – S15 was taken on sources one gate short of the final ones.",
  'evidence': "plat/docs/build/checks/M0-a-05-s15.md §1.10 and §2; the S14 entry's LINE 12 (f) and its clause's 'WORK IS A NAMED SHIFT SOURCE' (quoted in this entry's session clause); the S16 "
              "lane's CHECKPOINT lines (the first chain's stage-work reading — base 6 438 327 calls, 1 364 refused, 3 E_WORK_LIMIT; tree: the fifth pass ran 14 times, committed once, 21 137 "
              "more calls, 3 E_WORK_LIMIT) and the chain directories /home/user/maps-scratch/waves/s16-chain and /home/user/maps-scratch/waves/s16-fix with their HANDOFF.md files.",
  'required_change': "ON THE FINAL SOURCES, each with its command, seed and log, every long run re-entrant (THE RESTARTS): (a) NEAR — kernel/test/insert/step3-5 in the kernel and kernel-tiny "
              "projects — green; (b) RELATED@1000 over snapRound.ts, in chunks — its red set equal to the declared reds this entry's clause names, each red named; (c) the undo oracle "
              "(PLAT_UNDO_ORACLE=1 over the folder) green; (d) THE AFTER CENSUS in full over the 32 seeds — never above S14's AFTER in any cell; every per-case line that differs from S14's "
              "AFTER log DECLARED with its cause (a chain the stale read made the fifth pass refuse and that now commits, or a later chain of the same sequence), the counted refusals tallied "
              "again by class; (e) M0-a-08's trio at seed 8611 × 1 000, and M0-a-09's bands folder at the base's recorded seed with bfuzz.test.ts at its six seeds, each compared with the "
              "round's own S14 / S15 AFTER figures: equal, or every moved test and cell DECLARED per test and cell with its cause (the bands gate of the S14 clause stands: a moved test or cell "
              "with no declaring line fails); the stage roots fusion 3 / integrated 4 (and 1 / 1) base = tree shown again; (f) THE STAGE FIXTURES' WORK base → tree in instrumented probe copies "
              "(sources byte-identical but the counter, `diff -r` shown): per fixture the calls, the refused calls and the E_WORK_LIMIT count, and for the tree the fifth pass's runs, commits "
              "and extra work — a NEW E_WORK_LIMIT on any fixture FAILS unless declared in the S14 clause's form (batch, base total, limit, fifth-pass spend, the code before and after, any "
              "stage rung that moved) and REPORTED to M0-f-03b; cost.test.ts green, or its record declared likewise. THE CHECKER runs (a) and (b) itself on the tree, (c) once, reads (d) as THE "
              "CHECKER'S CENSUS in this entry's clause says, re-runs the trio and the bands folder of (e) at the recorded seeds and diffs the JSON reports against the builder's, and for (f) "
              "re-runs ONE stage fixture of its own choosing in its own probe copy and reads the rest from the logs."},
 {'line': "LINE 5 — THE CENSUS RESIDUAL, AS RULED (the S15 re-check's returned lines 1 – 4, their residual parts; RL1 as amended by J796 R-1): the residual of classes E, S, D, W, P and V was "
          "carried '(notBuilt #2, M4)' with no J238 (1) proof (C-0490 (2), (4)); the per-class proof of LINE 5 (iv) was absent but for one router-set case; class C had neither a reading nor a "
          "certificate; the record of the readings beside the certificate was absent.",
  'evidence': "plat/docs/build/checks/M0-a-05-s15.md §1.1 – §1.4 and §5; the S16 notes' 'THE CERTIFICATES PER CASE' (196 counted refusals on the tree's census: E 51, S 98 — 97 and the fidelity "
              "property's 7507 / 837 —, D 18, W 17, V 8, P 4, C and A none; noSeat at no input point of any; noSeatS on the refused segment of ONE: seed −6803, the random property's case 1707, "
              "way:b1, class D) and its 'Open'; test/insert/step3-5/noseat.ts; choices.md C-0456 (3) (the proof's form), C-0490 (2), (4) and the round's own row; the ruling J796 R-1, quoted "
              "whole in this entry's session clause (the session's ledger row is on the parent's branch, not in your tree).",
  'required_change': "(a) LINE 5 (iv): the per-class table (refusals; noSeat at any input point; noSeatS on the refused segment; carriable) in the choices row in C-0456 (3)'s form, taken on the "
              "FINAL sources (taken again if LINE 4 (d) moved any counted refusal). (b) THE ONE CERTIFIED CASE is CARRIED with its proof in the choices row: the case, the refused segment, the "
              "crossed run, what the certificate checked and found, the design sentence it rests on (§3.6 'no existing vertex moves') and M4's rounding move named as the later material. (c) THE "
              "REST — every other counted refusal of the final census, and the trio's one class-C case — is stated in the notes and the choices row EXACTLY as J796 R-1 rules it: refused today "
              "with its typed code; a seat, a free spot or a route vertex stands within the bound, so no J238 (1) proof holds; NOT carried to M4, NOT closed; OPEN IN M0 on the session's queue "
              "row, owed to this item's RESIDUAL ROUND. C-0490 (4)'s sentence that carried it is amended append-only to that state; the registers' '(notBuilt #2, M4)' is named once as the "
              "class's NAME, not a carry. (d) THE HAND-OVER TO THE RESIDUAL ROUND — evidence, not analysis: plat/docs/build/checks/M0-a-05-s16-evidence/residual-cases.tsv (claimed by the "
              "round's notes record; a field longer than 2 000 characters cut at 2 000 with its length noted), one line per counted refusal of the final census: project, seed, property, case, "
              "way, r1's class letter, the returned code and detail, THE FIFTH PASS'S OWN DISCARDED END for that chain (its code and detail, or 'retrace', or E_WORK_LIMIT, or 'not run' with "
              "the reason — logged by a hook in a probe copy whose sources are otherwise byte-identical, `diff -r` shown; never in the tree), and noSeat's and noSeatS's outcomes; and in the "
              "notes ONE tally of the file by class × the fifth pass's end. No reading of mechanisms is owed. (e) FAILS THIS LINE: a text of the round that calls the residual, or any case of "
              "it but (b)'s, closed, done, proven, carried or M4's; a carry without its certificate; a count in (a) that the file of (d) does not reproduce. THE CHECKER derives (a) and the "
              "tally again from the file, re-runs the certificate on (b)'s case on its own mirror and reads noseat.ts for soundness in the one direction it claims (no seat ⇒ no in-bound route "
              "under 'no existing vertex moves'), replays TEN refusals of its own choosing from the file through its own probe copy (the returned detail and the fifth pass's end equal the "
              "file's), and greps the round's notes, choices row, registers and test titles for the wording (e) forbids."},
]

entry = {'id': 'M0-a-05', 'from': 16, 'round': 'S16', 'session': SESSION, 'lines': LINES}
s['rounds'].append(entry)
json.dump(s, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(P, 'a').write('\n')
print('appended; rounds =', len(s['rounds']), 'session', len(SESSION), 'lines', [len(l['required_change']) for l in LINES])
