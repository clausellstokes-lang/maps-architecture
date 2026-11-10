# Confirm pass — M0-a-05 S14 entry r3 against refute-r2.md (2026-11-10)

Seat: refuter (confirm-only). Read-only; this file is the only write; no command run.

Read:
- `spec-a05-s14-r3.json` whole: session 16 494 chars, 12 lines of 1.2–2.9 kB.
- `spec-a05-s14-r3.md`.
- Re-read on the tree: insertChain.ts :1540-1578 (the walk, SEAM, the final reentry refusal), :1631-1670; tx/tx.ts :565-590 (an op refused in a batch over its limit is rejected **E_WORK_LIMIT**, :575; a fn batch :583; commit :588); kernel/test/insert/step3-5/router.test.ts :659-676 (work-limit sweep); tx/cost.test.ts :13-26.

## Findings R2-1 … R2-20

| id | status | the sentence that meets it / what is missing |
|---|---|---|
| R2-1 | **MET** (two notes below: NEW-1, NEW-3) | Session: "pass 5 runs AT MOST ONCE per chain, AFTER that whole sequence has ended, only when its final result is a refusal for the bound (boundRefusal, :706) — never inside passes(); … any other end of pass 5 (a refusal, E_WORK_LIMIT, a retrace) is DISCARDED and the chain returns the base's code and FULL detail byte-identical". LINE 1: "it runs as attempt with chainPath 'back' … reset by attempt — no other pass sets it"; P5-INSIDE named. |
| R2-2 | **MET as written; the bar is over-strict** — see (c) | LINE 12 (f): "WORK, a named source … a NEW E_WORK_LIMIT on any registered family, stage fixture or census seed FAILS; cost.test.ts green with its margin before and after; no limits table edited". |
| R2-3 | **MET** | LINE 1 (a): "every commit pass 5 makes in LINES 2–4's pins is judged by step3-5/fidelity.ts fidelityProblems (Hausdorff both ways) = [], support.ts allProblems = [] and dissolvableProblems = [] … never inFidelity; V-HALF … red". LINES 2–4 and 9 refer to it. |
| R2-4 | **PARTLY** | Met: LINE 2's noSeat adds "OR finer on a route of level ≤ n", and LINE 3 defines noSeat-S. Missing: (1) noSeat-S's "no route" leg is "the readings r1–r8 out of bound", which is the code under test certifying itself; the two test-side legs prove only that the crossed runs have no seat, not that every in-bound route must cross them. (2) LINE 3 does not say noSeat-S is test-side and independent of insert/, as LINE 2 says of noSeat. **Edit:** replace "and the readings r1–r8 out of bound" with "and each crossed run SPANS the bound — both its ends outside the input segment's bound region — so that every in-bound route crosses it (test-side, importing nothing from insert/ but types); the readings r1–r8 out of bound recorded beside it". |
| R2-5 | **MET** | LINE 3: "DIAGNOSE FIRST … at the segment's OWN ends and at ends of provenance 'fallback' (G1's) — another end kind only where the diagnosis shows it matters, named … A PIECE SHARED INTO x IS NEVER THE PIECE SHARED OUT OF x … S-FOLD … red". |
| R2-6 | **MET** | Session: "a set input the round leaves refused is pinned refused and REPORTED, never carried and never a failing line (J697 (4))". LINES 3, 4 and 5 (iii) say the same. |
| R2-7 | **PARTLY** | Met: "RESIDUAL per case only with J238 (1)'s proof …; 'no fixture found' is no reason"; V decided exactly; V-2X named. Missing: (1) V-2X is to be red "on its fixture", but a fixture that needs just over 4 096 evaluations may commit at 8 192, so V-2X survives a correct exact build's table. (2) "an irrational breakpoint by a two-sided interval" does not say what the interval is. **Edit:** "V-BUDGET and V-2X are red on a fixture whose segment-to-route distance EQUALS the bound at a rational breakpoint (no bisection budget closes it; the exact build commits it)", and "an irrational breakpoint decided by comparing squared distances with a rational enclosure of FIDELITY² = 5408 — never a double — its tie refused fail-safe". |
| R2-8 | **MET** | LINE 10: "FIRST THE S8 MODEL — every a-05 S9–S13 feature off in ONE mirror (S9: … S13: …) — which must turn all three pins green; if it does not, the cause is outside insert/ … (passes 3–4 and r6 / r7 predate S9 and are not switched)". |
| R2-9 | **MET**, with the area part rejected for a right reason (see (a)); two small gaps | LINE 11: "a read is judged against its INPUT, never against the pinned read … (iii) THE GATE — … TWO-SIDED, within DRY_MOVE_CM … the PINNED read measured the same way as the oracle's control … OUTCOMES … (c) a defect OUTSIDE insert/ … REPORTED". Gaps: NEW-4 (the grid's error has no direction) and NEW-5 ((ii) lost its consequence). |
| R2-10 | **MET** | Session BANDS GATE: "runs in the base mirror with PLAT_FUZZ_SEED unset, its printed seed s RECORDED (the seedLine), and on the tree and in the checker's runs at PLAT_FUZZ_SEED=s". |
| R2-11 | **MET** | Session: "THE RE-PIN REHEARSAL — in the self-check mirror ONLY, a scratch copy of the test with the declared expectation set to its declared AFTER, run green to its end … the checker repeats it; never in the tree". LINE 12 (e) applies it to other items' tests. |
| R2-12 | **PARTLY** | Met for one order: "S18's LIBRARY half … may land before this round … at this round's landing the SESSION runs M0-a-09's bands NEAR on the merged tree". Missing: (1) the other order — S14 lands first and S18 lands on a head with S14's engine, while S18's construction-relation bar ("within DRY_MOVE_CM … where it attracted", J742 R-A) was measured on the S9 engine; (2) that bar is a CITY measurement, not a bands test, so a bands NEAR does not cover it. **Edit:** "Whichever of S14 and S18 lands second, the session runs on the merged tree M0-a-09's bands NEAR AND S18's construction-relation measurement; a move there is declared by LINE 12's rule or is a finding against the round that landed second." |
| R2-13 | **MET** | LINE 8: "if the captured chain at @13 does NOT retrace, R-12 is rebuilt as a CONSTRUCTED arrangement in form (1″) from the recorded route … pinned red under Z13, the replay's outcome recorded beside it". |
| R2-14 | **MET** | Session: "boundRefusal, :706 … code and FULL detail byte-identical (the stops suffix of an E_BELOW_MIN_EDGE included)". LINE 5 (i): "an 'unclassed' bucket (a throw's detail) whose every member is listed as a finding". |
| R2-15 | **MET** | LINE 2: "a noSeat-certified class-E fixture CONSTRUCTED with a seat in (bound, √2 · bound], stated in the test". |
| R2-16 | **PARTLY** | Met: "{ a, b: LatticePoint \| null } … set per segment by routeSegment as strip is, null in step 2, reset by attempt"; "wedges are step 4's". Missing: "null in step 2" can be read as the FIELD being null in step 2. Then class E's step-2 readings have no pass-5 test, and E-EARLY becomes a real risk. **Edit:** "the field OBJECT is set for the whole of pass 5 (its presence is the only pass-5 test, step 2 included); its a / b are null in step 2 and set per segment by routeSegment". See also NEW-1. |
| R2-17 | **MET** | Rule (4): "kernel: all four; kernel-tiny: the fidelity property only, S13's form". |
| R2-18 | **MET** | "RELATED@1000's known set as the RESUME head's last closing check records it (S9's), re-read at launch". |
| R2-19 | **MET** | "RUNS OVER FOUR MINUTES — … — go to the background with a log and a done-file and are waited for in FOUR-MINUTE chunks …; a CHECK seat hands any wait over forty minutes to the workflow's waiter"; every line is under 3 kB. Check at render time that the brief really appends the WAITING RULE text the session cites as "below". |
| R2-20 | **MET** | Session: "THE CHECKER'S OWN BASE: the closing checker makes its own base from the RESUME head (the parent's git archive), runs both sides of every comparison itself, and diffs … with the command written in its notes". |

## (a) The partial rejection of R2-9 (the area kept as a REPORTED figure)

**Right, on the code and on the text.**
- §3.7 (ARCHITECTURE.md:5403-5410) states perimeter × √2·attractCm as the attracted-case law of a result against B-FUZZ's oracle. It derives the factor from a wedge tip that moves 2·√2·attractCm but sweeps only √2·attractCm per unit of arm.
- kerb.ts keeps two bounds on purpose:
  - MOVE_CM = √2·attractCm + SAGITTA for the overlay (:667-671);
  - DRY_MOVE_CM = 2·√2·attractCm + SAGITTA for the dry-run (:673-679), "N-43's per-segment bound … (wedge routing, a stretch-share's join and leave points)".
- A stretch share can displace a whole run, not just a tip, by up to the per-segment bound. A read that passes the two-sided DRY_MOVE_CM gate can therefore exceed perimeter × √2·attractCm in area.
- The two-sided Hausdorff gate already confines the symmetric difference to a DRY_MOVE_CM band round the boundary, so a second area gate would add nothing lawful.

My R2-9 (iv) asked for the wrong constant. REPORTED is the right handling.

## (b) The open choice: pass 5 under chainPath 'back'

**Right, and stated unambiguously in LINE 1** ("it runs as attempt with chainPath 'back'"). The session text names no path, which is fine because LINE 1 binds.

Why 'back' fits insertChain.ts as it stands:
- Under 'back', a retracing segment is cut back (:1494-1508). Where no cut back routes, the pass refuses REENTRY (:1498, :1502, :1554, :1574), which is reentered and therefore discarded. No cascade and no new text.
- Under 'watch', every retrace would be refused, losing the S10–S13 rescues.
- Under null, a retrace would COMMIT (notBuilt #3's committed residual forms), so pass 5 would newly commit retraces with branches.

Two things a seat still needs:
1. **Setting the path.** `attempt` takes no path; `passes(mode)` sets `ctx.chainPath`, and :1671 resets it. **Edit:** "pass 5 sets ctx.chainPath = 'back' before its attempt; :1671's reset stays after it".
2. **The rest of the attempt's arguments** — see NEW-1.

## (c) The session's work ruling

The law itself is sound on the code:
- insert/classes.ts `charge` (:154-159) adds to the batch's `work` and is never rolled back (`rollback` :783-819 does not touch work).
- tx/state.ts `chargeTx` and `enterWriter` (:163-188) doom a batch past its limit.
- "Pass 5 is charged like any pass" is simply true.

**The bar does fail a CORRECT build in three flows**, all at the batch level:
1. **A plain op batch.** A batch whose chain is refused on the base is rejected E_INVARIANT. On the tree, pass 5 spends more work, fails, and the chain correctly returns the base's detail. If the batch's base total stood within pass 5's spend of its limit, tx.ts:575 now rejects the batch **E_WORK_LIMIT** (`if (overWork(t)) return reject(t, 'E_WORK_LIMIT', …)`). That is a NEW E_WORK_LIMIT from a correct build.
2. **A composite op or fn batch that handles an inner refusal and commits on the base** (an overlay union, a kerb dry-run, a stage op). If it crosses its limit on the tree, it is rejected at :583 / :588. A stage then takes its work rung, and its output moves.
3. **A fixture that forces work cuts** (F-WORK's low-floor tables; router.test.ts :659-676 sweeps limits under one chain). If such a fixture contains a refused chain, the cut moves.

The same holds for "cost.test.ts green":
- PER_FACE 160 is fitted to its worst case (cost.test.ts:13-16; the heavy family's worst is 160).
- A batch that NEWLY commits through pass 5 carries five passes of work in its record. It can cross the fitted constant on a correct build.

**Smallest change to the bar** (no behaviour change; the law stands). Replace LINE 12 (f)'s two sentences with:

> "a NEW E_WORK_LIMIT on any registered family, stage fixture or census seed FAILS unless the notes show that its batch's base total stood within that batch's measured pass-5 spend of its limit — such a batch is DECLARED (batch, base total, limit, pass-5 spend, the code before and after, and any stage rung that moved) and REPORTED to M0-f-03b; cost.test.ts green, or a record over its fitted constant that a pass-5 commit created DECLARED with its figures and REPORTED to M0-a-06."

The engine alternative is to start pass 5 only when its stated worst charge fits the remaining budget. It is weaker, because rewalk's face charges come several at a time, so no small worst charge per segment can be guaranteed. I would not use it.

## NEW in r3

| id | sev | where | issue | edit |
|---|---|---|---|---|
| NEW-1 | **major** | LINE 1; LINES 2, 4 | Pass 5's `attempt(extended, strip)` arguments (and endRules) are unstated. If pass 5 runs with ctx.strip set, passes 3–4's gates already fire, so W-STRIP and P-STRIP ("each gate re-gated on ctx.strip") are equivalent mutants and their bars cannot fail. If it runs with strip null, LINE 2's "the strip's far side" is unreachable (stepTwoStrip returns null without a strip, :489), and the ends are not judged (:1042, `ends` only under strip). | LINE 1 BUILD: "pass 5 = attempt(extended true, strip null), endRules as pass 3's; each strip-gated site that LINES 2–4 use is re-gated explicitly on (ctx.strip ?? the field) — stepTwoStrip :489, readings' ends :1042, the wedge gate :679, stripLanding :710 — and W-STRIP / P-STRIP mean 'that site gated on ctx.strip alone'". |
| NEW-2 | minor | session THE FIX vs LINE 1 | The session says a clean commit is "ok, not reentered, judged as the census judges". The engine cannot run the test-side judge; LINE 1 says only "(ok, not reentered)". A seat could import fidelity.ts into src. | Strike "judged as the census judges" from the session clause; the judge belongs to the pins (LINE 1 (a)). |
| NEW-3 | minor | LINE 1 (c) | P5-INSIDE's fallback kill (LINE 12 (a)'s census diff) may also not occur; the entry says nothing for that case. | "If neither kills it, P5-INSIDE is stated as a survivor with the search made, and the checker confirms by reading the code that pass 5 is called only after :1670." |
| NEW-4 | minor | LINE 11 (iii) | The grid oracle (step ≤ 1 cm) has an error, and the entry gives no direction for it at the gate. | "the grid's worst error e stated; lawful only within DRY_MOVE_CM − e; between DRY_MOVE_CM − e and + e decided exactly or REPORTED". |
| NEW-5 | minor | LINE 11 (ii) | r2's consequence was lost: "where they report none, nothing may move beyond the hot pixel and any move is a defect". (ii) is now a bare statement. | Restore that clause after (ii). |
| NEW-6 | minor | LINE 1 (d) | E-EARLY / S-EARLY cover only LINES 2–3's readings. LINE 4's D/W/P/V gates read early (in passes 1–4) have no mutant. | "(d) a reading of LINES 2–4 run in passes 1–4 (E-, S-, DWPV-EARLY) killed by LINE 12 (a)". |

The split of r2's LINE 1 lost nothing else. The candidates-in-turn, the two-point joint ends, the door writes and the choices-row items are all in LINE 2, and the counts are in LINE 5. Apart from NEW-2, I found no contradiction between LINE 1 and the session clause.

## Ready to bind?

**Yes-with-changes.** Sentence-level edits, in priority order:
1. **(c) / R2-2 — LINE 12 (f):** replace "a NEW E_WORK_LIMIT on any registered family, stage fixture or census seed FAILS; cost.test.ts green with its margin before and after" with the quoted sentence in (c).
2. **NEW-1 — LINE 1 BUILD:** after "it runs as attempt with chainPath 'back'", insert "(ctx.chainPath = 'back' set before it, :1671's reset after), as attempt(extended true, strip null) with endRules as pass 3's; each strip-gated site LINES 2–4 use — stepTwoStrip :489, readings' ends :1042, the wedge gate :679, stripLanding :710 — is re-gated on (ctx.strip ?? the field), and W-STRIP / P-STRIP mean that site gated on ctx.strip alone".
3. **R2-16 — LINE 1:** replace "set per segment by routeSegment as strip is, null in step 2" with "the field OBJECT set for the whole of pass 5 (its presence the only pass-5 test, step 2 included), its a / b null in step 2 and set per segment by routeSegment as strip's are".
4. **R2-4 — LINE 3:** replace "and the readings r1–r8 out of bound" with "and each crossed run spans the bound (both its ends outside the input segment's bound region), so every in-bound route crosses it — test-side, importing nothing from insert/ but types; the readings r1–r8 out of bound recorded beside it".
5. **R2-12 — session SEQUENCING:** replace "at this round's landing the SESSION runs M0-a-09's bands NEAR on the merged tree" with "whichever of this round and S18 lands second, the SESSION runs on the merged tree M0-a-09's bands NEAR and S18's construction-relation measurement".
6. **R2-7 — LINE 4:** after "V-2X (the budget doubled)", insert "— both red on a fixture whose segment-to-route distance equals the bound at a rational breakpoint". Replace "by a two-sided interval" with "by squared comparisons against a rational enclosure of FIDELITY² = 5408, never a double".
7. **NEW-2 to NEW-6** (minor): strike "judged as the census judges" from the session; add P5-INSIDE's survivor clause; give the grid error a direction; restore (ii)'s "where none is reported, any move beyond the hot pixel is a defect"; extend (d) to LINES 2–4.
