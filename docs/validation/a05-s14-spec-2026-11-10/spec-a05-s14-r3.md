# M0-a-05 round S14, the router round: revision 3 of the spec entry (spec seat, 2026-11-10)

The entry is `spec-a05-s14-r3.json`, which sits beside this file. It has the model's form: {id "M0-a-05", from 14, round "S14", session, lines[12]}.

- The session text is 16 494 characters.
- Every line is between 1.2 and 2.9 kB.
- Whitespace is collapsed. r2's lines carried mid-sentence `\n` escapes; r3's do not.

r3 answers `refute-r2.md` (R2-1 to R2-20) under the session's rulings (1) to (10). Every code cite a finding rests on was re-read on b81502bd before the finding was applied; the log is in `working-notes.md`, R3 steps 1–3. No command was run and no git was used. The generator is the scratchpad's `a05s14/gen3.py`.

## 1. Findings and what changed

| finding | ruling | verified on | what changed in r3 |
|---|---|---|---|
| R2-1 (blocker) | (1) | insertChain.ts :1658-1670 (watch → back → `back.ok ? back : passes(null)`) | NEW LINE 1, THE FIFTH PASS, mirrored in the session's THE FIX. Pass 5 runs at most once per chain, after the whole watch/back/null sequence has ended with boundRefusal (:706), and never inside passes(). It runs with chainPath 'back'. Only a clean commit (ok, not reentered) counts; any other end is discarded and the base's code and full detail are returned byte-identical. attempt resets the field. Mutant **P5-INSIDE**: killed by a reentry.test.ts form-(1′)/(2) case whose base commits through passes(null), with its contentPrint pinned from the base. If no such case can be made, the named kill is LINE 12 (a)'s per-case census diff. |
| R2-2 (blocker) | (2) | classes.ts charge :154-159; tx/state.ts chargeTx :163-170, enterWriter :185-188; cost.test.ts :13, :25-26 | Work is named as a shift source in THE FIX and in LINE 12 (f). The notes state pass 5's worst charge per segment. Measured base → tree: the work in the commit records (census families, cost.test.ts families, stage fixtures, CITY receipts) and the count of E_WORK_LIMIT refusals. A NEW E_WORK_LIMIT on any registered family, stage fixture or census seed fails the round. cost.test.ts must stay green, with its margin given before and after. No limits table is edited; a needed change is REPORTED to M0-f-03b with its figure. |
| R2-3 | apply | fidelity.ts :126 (imports nothing of the router); support.ts :317, :334; bfuzz.test.ts :22-26 | LINE 1 (a): every commit made by pass 5 is judged by fidelityProblems (both ways), allProblems and dissolvableProblems, never by inFidelity. LINES 2–4 and 9 refer to that judge. Mutant **V-HALF** is killed by an end that lands behind its input point. |
| R2-4 | apply | stretch.ts :821-823 (a finer vertex on a route of level ≤ n is a contact) | LINE 2: noSeat now also counts a vertex that is finer but stands on a route of level ≤ n. LINE 3: a separate certificate, **noSeat-S** (crossed runs within the bound of the input *segment*, vertices of any level on routes, r1–r8 out of bound, naming (B) as the later material). An S case without noSeat-S cannot be carried. |
| R2-5 | apply | snapRound.ts :648 (`reenters(j)` only; k from :649 is unchecked) | LINE 3: the diagnosis comes first. r8 is limited to the segment's own ends and to 'fallback' ends (G1's), with another end kind allowed only if the diagnosis shows it, and named. New rule: a piece shared into x is never the piece shared out of x. New mutant **S-FOLD**, with a fixture at ∠ < 2·minFaceAngle. |
| R2-6 | (8) | J697 (4) | LINES 3 and 4: each router-set chain either commits (judged as LINE 1 (a)) or is pinned refused with the base's detail and REPORTED; the line does not fail on it. LINE 5 (iii) and the session's RULINGS say the same. |
| R2-7 | apply | inFidelity covered :903-918 (at d0 = d1 = FIDELITY the bisection never closes) | LINE 4: the per-case residual is J238 (1)'s proof, using LINE 2's or 3's certificate, re-run by the checker; "no fixture found" is no reason. V is decided exactly at breakpoints (squared integer comparisons, BigInt past 2^53; an irrational breakpoint by a two-sided interval, its tie refused fail-safe and counted). V-BUDGET and **V-2X** are both killed. r2's "budget no in-bound route exhausts" is struck. |
| R2-8 | (4) | M0-a-05-notes.md :269-300 (S9's features), the S12F table | LINE 10: the **S8 model** (every S9–S13 feature off in one mirror) comes first and must turn the three pins green; if it does not, outcome (c) applies. Then one switch at a time. Passes 3–4 and r6/r7 are no longer switched. |
| R2-9 | (3) | kerb.ts :673-679 (DRY_MOVE_CM: a move from the INPUT); definition.ts absent on b81502bd | LINE 11 judges each read against its INPUT, two-sided within DRY_MOVE_CM. It uses M0-a-09's definition.ts if that stands on the RESUME head; otherwise a scratch two-sided grid oracle (step ≤ 1 cm) quoted whole. The pinned read is the oracle's control and must pass. Old (v) is dropped; a vanished ring is judged like any other difference. Outcomes (a) fix, (b) declare, (c) defect outside insert/, REPORTED. r2's memo Q3 is withdrawn (not confirmed). **Partly rejected:** the refuter's "(iv) the area against X(F)" is kept as a REPORTED figure, not a gate. §3.7's perimeter × √2·attractCm is B-FUZZ's result-vs-oracle law (ARCHITECTURE.md:5403-5410). A kerb read's own bound is DRY_MOVE_CM = 2·√2·attractCm + SAGITTA (kerb.ts:673-679, "wedge routing, a stretch-share's join and leave points"), so an area gate at √2·attractCm could fail a lawful move. |
| R2-10 | (5) | tools/vitest/fuzz-seed.mjs :1-8 | The session's BANDS GATE: the base runs with the seed unset and its printed seed s is recorded; the tree and the checker run at PLAT_FUZZ_SEED=s. |
| R2-11 | (6) | (step 8 of the notes: the first failing expect masks later ones) | The BANDS GATE and LINE 12 (e) add the scratch re-pin rehearsal: run in the self-check mirror only, the test green to its end, repeated by the checker, never in the tree. |
| R2-12 | (7) | J742 R-D | SEQUENCING: S18's library half may land first and this round never edits its files. At this round's landing the session runs M0-a-09's bands NEAR on the merged tree; a new red there is this round's declared cell or a finding. |
| R2-13 | apply | — | LINE 8: if the captured chain at @13 does not retrace, R-12 is rebuilt as a constructed form-(1″) arrangement from the recorded route, red under Z13, with the replay's outcome recorded beside it. |
| R2-14 | apply | :706, :1645-1650, caps.ts countedRefusal | Gate = boundRefusal on the final result. The text is now "the base's code and FULL detail" (stops suffix included). The census tally gains an "unclassed" bucket whose members are findings (LINE 5 (i)). |
| R2-15 | apply | — | LINE 2: E-WIDE's fixture is constructed with a seat in (bound, √2·bound], stated in the test. |
| R2-16 | apply | stretch.ts :184-194; routeSegment :931-937 | LINE 1: the field is { a, b: LatticePoint \| null }, set per segment by routeSegment, null in step 2, reset by attempt. "Step 2 included" is struck from W (wedges are step 4's). |
| R2-17 | (9) | M0-a-05-notes.md :234 | Rule (4) and LINE 5: kernel runs all four families; kernel-tiny runs the fidelity property only. |
| R2-18 | apply | — | DECLARED REDS: RELATED's known set is "as the RESUME head's last closing check records it (S9's), re-read at launch". |
| R2-19 | (9) | — | THE BURDEN AND THE WAITING names the runs over four minutes (q133, the trio, NEAR, RELATED, every census seed, the bands folder and each bfuzz seed, the along replay, family T). Each goes to the background with a log and a done-file and is waited for in four-minute chunks; a check seat hands any wait over 40 minutes to the waiter. The rendered brief already appends the WAITING RULE text. The old LINE 1 is split; every line is under 3 kB. |
| R2-20 | apply | — | Session text, THE CHECKER'S OWN BASE: the checker builds it from the RESUME head (git archive), runs both sides itself, and diffs reporters and logs with a command written in its notes. |

Rulings (9) and (10) are also written in:

- **THE BURDEN:** census seeds run three at a time; the per-case BEFORE log is kept with its hash; build iterations replay only base-refused cases; the checker verifies BEFORE by hash plus four seeds of its own; each mutant runs only its killing file.
- **Rule (3):** another item's moved test is DECLARED by the round (file, test, before, after) and never edited. The session opens one queue row per owner and re-pins by seams.
- **Q4:** the plan is annotated by the session; the entry follows J742 R-D.

**Nothing was rejected outright.** R2-9 is rejected only in its area-gate part, for the reason in the table.

**One choice the rulings left open:** pass 5 runs with chainPath 'back', as the refuter recommended. Ruling (1) does not name a path. With 'back', a retrace in pass 5 is cut back as S10–S13 build it, and a pass-5 result that is reentered is discarded anyway.

## 2. The lines

| # | builds | gating bar | mutants |
|---|---|---|---|
| 1 | THE FIFTH PASS: once per chain, after watch/back/null, on a final boundRefusal; a clean commit only; the new field; work charged | every pass-5 commit = [] by fidelityProblems / allProblems / dissolvableProblems; a refused chain's detail byte-identical to the base | V-HALF, CODE, P5-INSIDE; E-EARLY / S-EARLY via LINE 12 (a) |
| 2 | class E: in-bound end candidates in turn | a trio E case commits; a certified residual (seat in (bound, √2·bound]) stays refused; a later-candidate case | E-OFF, E-WIDE, E-FIRST |
| 3 | class S: diagnosis, then r8 at own and fallback ends with the no-fold rule; noSeat-S | register S cases → s14-rescues; 243/310/751/999 commit, or are pinned refused and REPORTED; fallback-end, wide-angle and fold fixtures | S-OFF, S-SEGEND, S-ANGLE, S-FOLD |
| 4 | D/W/P gates and an exact V, in pass 5 | 73/183/77 commit or are pinned refused and REPORTED; register cases; a V fixture; J238 (1) proof per residual case | D-OFF, W-STRIP, P-STRIP, V-BUDGET, V-2X |
| 5 | measures: census by class (unclassed bucket), trio, router's set, proof | cells equal or lowered with every property green; a trio refusal whose text changes fails; q133 moves only on the set | (measurement; CODE via LINE 1) |
| 6 | Q77's inclusive BigInt tie | 40 km / bound / off-lattice / r = 51 ties | Q77-DBL, -STRICT, -THROW, -HALF |
| 7 | MK / ML constructed pins, or a proof the checker re-reads | red under each mutant | MK, ML |
| 8 | R-12 re-measured from the capture, or a constructed form (1″) | pinned commit | Z13 |
| 9 | FAR1's constructed two-candidate arrangement | the arrangement asserted | FAR1 (FAR2 stated) |
| 10 | group B's cause: S8 model first, then single switches, with a trace | the checker re-applies the S8 model and the switch; files' SHA-256 unchanged | (diagnosis) |
| 11 | group B's judgment against the input (definition.ts or a grid oracle, two-sided, DRY_MOVE_CM; the pinned read as control); outcome a/b/c | the checker recomputes (iii) | the defect restored (outcome a) |
| 12 | the shift: per-case census and N-7 diff; bands gate with rehearsal; roots; other items DECLARED; work (f) | an unsourced committed→differently-committed case fails; a new E_WORK_LIMIT fails; an undeclared bands move fails; a RELATED red outside the list is a finding | kills P5-INSIDE, E-EARLY, S-EARLY |

## 3. Time, under the reduced plan (ruling (9), the refuter's estimate checked against the notes' figures)

- **Census pass:** three seeds in parallel, about 1.3–1.6 h. The rate is 32 seeds × 375–461 s per seed, ÷ 3.
- **Build seat:** about 7–9 h of measurement.
  - BEFORE census: about 1.5 h, in the background during diagnosis.
  - AFTER census: about 1.5 h, run alongside RELATED (2–2.5 h).
  - Trio (538 s ×2), q133 (≤ 900 s ×2), the bands folder and six bfuzz seeds, the N-7 slice, roots and R-12: 2–3 h together.
  - Mutants on their killing files: 1–1.5 h.
  - Plus diagnosis and the build itself.
- **Check seat:** about 4.5–6 h.
  - BEFORE: hash check plus four seeds, 0.4 h.
  - AFTER and RELATED run together: about 2.5 h.
  - Trio, q133, bands, LINES 10–11 and the re-kills: 2–3 h.
- **Elapsed:** about 2 days.
- **Long-wait hand-off:** both seats still exceed one five-hour window, so it is still needed.
- **Unmeasured:** the bands bfuzz seeds' runtime. The seat should time one seed first.

## 4. Rendered brief sizes

From a copy of specs.json with the r3 entry appended, rendered with this machine's fitted args (linux Xeon 4cpu 16gib; maxLanes 2, workerCap 8):

- **build:** 63 396 characters
- **check:** 61 611 characters

r2 rendered to 65 741 / 63 956.

## 5. What I could not verify

- Whether definition.ts (M0-a-09 S18's library half) will stand on the RESUME head. It is absent on b81502bd.
- That a reentry form-(1′)/(2) case exists whose pass-5-inside-'back' outcome differs, which P5-INSIDE's pin needs. The fallback kill is named.
- The worst work charge of pass 5 per segment, and whether it can push any batch past its law.
- Whether R-12's chain still retraces at @13.
- The group-B outcomes (not judged).
- The census-by-class BEFORE.
- The bands bfuzz runtime.
- S9's landed state (frames, oracle).
- No command was run in this pass.
