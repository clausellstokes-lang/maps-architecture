# Pass B triage — the M0 fix queue, 2026-11-13

Read on the working tree at 2026-11-13 ~01:00Z: `docs/M0-FIX-QUEUE.md` (202 rows, each row's LAST cell read whole down to its latest dated STATE sentence), the takeover table of `docs/HANDOFF.md` (00:57Z), `specs.json` rounds 170–185 (context of every queue id they name), round 2B's `v4/` entries, `docs/validation/hardening-retriage-2026-11-09/plan.json`, ledger rows J722, J735, J748, J749, J750, J751, J796–J798 by grep, and the landing drafts in `tools/session/drafts/`. The data is `triage.json` beside this file: one object per row-part, with every `evidence` and `exit_words` string checked by script to be a verbatim substring of its row.

## 1. Counts

| class | objects | rows |
|---|---|---|
| IN-FLIGHT | 21 | 20 |
| PLANNED | 37 | 35 |
| NOW | 2 | 2 |
| AFTER | 11 | 11 |
| RULING | 9 | 9 |
| OWNER | 0 | 0 |
| CARRY | 8 | 8 |
| STALE | 5 | 5 |
| UNCLEAR | 0 | 0 |
| **total listed** | **93** | **73** |

A row can appear under more than one class; it is split by its lettered parts.

**Wholly closed, not listed: 129 rows.** 113 are DONE or CLOSED by their latest sentence (Q174, Q186 and Q198 among them: each opens "OPEN" and its latest STATE closes it). The other 16 (Q154–Q169) are wholly CARRIED to M1 by R15 / J735. Q203 and Q204 exist only as drafts and are ignored.

## 2. The NOW batches

Only two rows can be launched now without a ruling or a landing: Q153 and Q201. Both are small, neither is required for M0's exit, and their owning items (M0-d-08, M0-f-02a) are not on the busy list. A third batch becomes launchable the moment the Q197 (a) ruling is taken. Everything else waits on a child that is in flight now.

**Child A — merged round, two legs, lighter checks (tests and bench tooling only):**
1. **M0-d-08 S2 → Q153.** Find the assertion in `testkit/test/determinism/dilation.test.ts` ('restores every clock …') that races real time under load. Bound it with a stated tolerance or an injected clock, and pin it under load (busy loops beside it). Owns `testkit/src|test/determinism/`. Lighter checker.
2. **M0-f-02a S4 → Q201.** In `bench/src/tiers/runner.ts`, one value decides both `runTier`'s guard and `applyFallback`. Pin it with a truthy non-boolean on a nightly manifest. Lighter checker.
   - *Collisions:* no child in flight edits `testkit/src/determinism`, `testkit/test/determinism` or `bench/src/tiers`. Every bound entry, round 2B's v4 included, lists Q153 among its DECLARED REDS. If this lands first, drop Q153 from those lists at round A's binding; that is harmless either way. Land it before the end-of-phase whole-suite run and the edge suite's 1 000-seed write, both of which go through the tiers.

**Child B — launchable at the word on Q197 (a), if (a) is carried as recommended:**
1. **M0-a-11 S8 → Q197 (b), (c), (e).**
   - (b): pin the third reading's work law on its own, so the mutant 'a fresh law for the third reading' goes red.
   - (c): make `skeleton/engine.ts`'s header say what the queue really gathers. This is comment-only.
   - (e): state the census total (39 995) in the next choices row.
   - Owns `kernel/src|test/skeleton/`. Use the **stronger checker**: (c) touches a kernel source file, even though no executable line changes. If the session treats comment-only edits as non-source, the lighter one is enough.
   - *Collisions:* none in flight. Q180 (c)'s reader ruling could move a-11's contract words only if the "kernel walk-to-rings" option is chosen. The recommended option (serve X(F)) leaves a-11 untouched.
   - It can also ride as a third leg of Child A if the ruling comes before A launches. The files do not overlap.

**The earliest landings that unblock the rest:**
1. The gate of landing 83 (a09s20), with landing 82 riding on it. When it passes, push; that closes Q189 (a)–(c) and records Q152 and Q178.
2. **DV's router round (M0-a-05 S16).** It unblocks five things:
   - the RQ2 round's third leg;
   - the M0-c-03 S5 + M0-a-08 S6 child (Q187 (b), Q64 / Q83 B2);
   - the spec of the residual round;
   - round 2B's round A, together with the pushed S20 and the re-run of the runner on the merged tree;
   - and, through 2B, the re-profile, b-03 S9 / b-02 S3, round 3, round 4 and f-03b S2.
3. ED's landing. Then the third leg, and then Q181's merged round (Q194–Q196) and the follow-ups Q182 (a), Q183, Q184.
4. EC's landing (Q173, Q185, Q187, Q200, Q202) and EA's (Q192, Q193 (a)). After both, the end-of-phase site-summary round (Q180 (d), Q188).

## 3. The RULING list (ordered by how much each blocks)

1. **Q90 — is the displaced-run-end KEPT_DEEP class a line of round 2B?** J744 sent "Q7 Q90's fix" to 2B's spec, but neither v4 entry names Q90. **Recommend:** at round A's binding, add a measurement line that counts the class in the shadow at CITY. If it is non-zero, it is a FIX line of round B (J490 (1)); if zero, close the row on that count. Reason: round A is the next kernel-chain round and is otherwise ready to bind.
2. **Q180 (c) — which reading feeds the skeleton's corpus faces?** The readers hand over raw `faceRings` walks, so 13 faces become `notSimple`. **Recommend:** the readers (M0-e-06's and M0-c-06's harnesses) hand over the served exact region X(F) once round 2B serves it, with one graph per lobe for a face joined at one vertex. Run it as a reader leg in the end-of-phase batch, BEFORE the final site-summary re-run, so that the required canary (d) counts it. Reason: no new kernel contract is needed, and no round is named for this today.
3. **Q197 (a) — widen §3.8's coalescing (classes (2)–(4))?** **Recommend NO at M0:** carry it with J238 (1)'s proof. It is the typed downgrade §3.8 designs, the reader's fallback is exact, and it hits 1 registered face in 40 107. Reopen it if the final summary shows a reader cost. This unblocks Child B (Q197 (b), (c), (e)) at once.
4. **Q181 kin (N-13: the reverse order; F5) — M0 work?** **Recommend:** S11's spec measures their reach on the RQ2 head. Make them a line of S11 if any registered family reaches them; otherwise carry them to M4 with J238 (1)'s proof. Reason: this is the same class as S11's main line, and the spec is written there anyway.
5. **Q135 / RL15 — build the read-only split plan in M0?** RL15 says "an a-05 round AFTER this one", and no planned a-05 round carries it. **Recommend: CARRY TO M1 with J238 (1)'s proof.** It costs time only, fails safe, and is counted as a named class. Reopen it only if the re-profile shows the planning batch matters to S5 (Q129). Reason: it would add a cross-item contract to the M0-a-05 residual round, which is already the longest tail.
6. **Q170 — is the per-sub-stage split stamp needed for M0's exit?** **Recommend NO → CARRY TO M1.** The first Mac reference run does not need it, and §16 M0 (c)'s time clause is a sum of per-stage p95s.
7. **Q193 (b) — act on the grazing-river land wedge?** **Recommend: CARRY TO M1 with its reason.** Every hard row holds and no M0 reader claims that land. Re-read it when an M1 stage first claims land beside a grazing river.
8. **Q175 (a) — the in-run start marker?** **Recommend: CARRY TO M1 with Q158.** It is not required, and f-02b S2's whole-replay deadline already names a hang together with the last seed that finished.
9. **Q85 — move the narration list to testkit?** **Recommend:** close it as conditional and carry it to M1, where the move rides with the first second guard. M0 adds no second guard.

## 4. The OWNER list

No queue row needs a decision only the owner can make. What depends on the owner is outside the rows: the Mac timing steps run on the owner's machine, and these wait on them (classed AFTER):
- Q128: the numbers and the D-18 re-declaration on the Mac p95s;
- Q145: the a-16 public-API rows held until after the Mac steps;
- Q171: the §12.4 rebuild sentence.

Round 2B's amendment paragraph (the owner's standing veto of the reversal of item 991 (b)) is not a queue row.

## 5. The STALE list

| row | its state should now read | evidence |
|---|---|---|
| Q29 | the M0-e-06 hand-built chord pin is DELIVERED — remove "stays owed" | `plat/docs/build/checks/M0-e-06-notes.md:50`: note 15 **PINNED** by `hand.test.ts` "one chord A → B: gated …", mutant R15 red |
| Q46 | F-WALL later-rung cases CARRIED TO M1 WITH PROOF (RL2, C-0474) at c-02 S6 (4d490aa7); the non-rung S3 class DONE there | J750: "Q88 and Q46 under RL2; RL2's proof … the 122 S3 runs commit"; Q202: seven of those pinned seeds now commit |
| Q72 | DONE ce009e91 (J749): M0-t-00 S1 times a production bundle, stamp scope per row; f-01's stamps did not move | J749: "M0-t-00 S1: PASS — LINES 1–11 confirmed (RL10: the timing phase times a PRODUCTION bundle, its stamp scope per row …)" |
| Q88 | CLOSED (J782): the re-read at M0-e-06 S4's summary re-run is done | Q122's J782 sentence: "every S3 class gone (122 runs), F-WALL's S5 class gone" |
| Q148 | CLOSED: the summary half 5782c31c (J760); s1c-1, s1c-2, s1c-5 carried by Q158 | Q158: "M0-x-06's notes s1c-1, s1c-2, s1c-5 … CARRIED to M1" |

Smaller stale sentences inside rows that are listed under other classes:
- **Q118:** its last STATE still reads "M0-c-06 S1 in flight (child DC)". c-06 S1 landed as the forty-ninth landing.
- **Q173:** its J789 sentence says the pipeline river fixture seeds 1 and 6 "refuse with F-WALL's later-rung text". Q202 (3) says they commit.
- **Q49:** it routes the whole receipts to "f-02b S1". f-02b S1 landed and its spec said they are "NOT this round's".
- **Q187 (b) and the plan's c-03 S5 / a-08 S6:** both still say "after M0-a-05 S14 lands". The router round is now at S16.

## 6. All listed rows

| q | parts | owner | class | detail | exit? | size |
|---|---|---|---|---|---|---|
| Q29 | (e-06 chord pin) | M0-e-06 | STALE | Row's DONE text still says the chord pin 'stays owed to the hardening phase'; plat/docs/build/checks/M0-e-06-notes.md:50 lists note 15 PINNED by hand.test.ts — the row should say so. | no | S |
| Q39 | (fabric half) | M0-b-03 | PLANNED | M0-b-03 S9 + M0-b-02 S3 (after round 2B and the re-profile; plan.json entry 'M0-b-03 + M0-b-02', line Q39-S8). | unclear | M |
| Q44 | (census residual) | M0-a-05 | PLANNED | THE RESIDUAL ROUND of M0-a-05 (J796 R-1), specced from plat/docs/build/checks/M0-a-05-s16-evidence/residual-cases.tsv after the RQ2 round's third leg; its queue row is opened at DV's landing. | yes | L |
| Q44 | (router class) | M0-a-05 | IN-FLIGHT | Child DV, M0-a-05 S16 (the router round S14 → S15 → S16; S16 resumed 00:46Z 2026-11-13 under J796). | yes | L |
| Q46 | (F-WALL cases) | M0-c-02 | STALE | Row still reads 'OPEN → … census'; J750 (c-02 S6 landed 4d490aa7) records RL2's proof delivered and the S3 runs committing; Q202 shows seven of the rung's pinned seeds now commit. State should read CARRIED TO M1 WITH PROOF (C-0474), non-rung part DONE 4d490aa7. | no | S |
| Q49 | whole | M0-f-02b | PLANNED | The end-of-phase batch (the whole receipts with the edge suite's 1 000-seed write, Q177 (a): 'Q49's batch'), after round 4. | unclear | L |
| Q51 | whole | the session | AFTER | After child ED's landing (its legs touch the kernel's API surface and the session already seams kernel/API.md's role count there); do it in that seam, re-check after the RQ2 third leg. | unclear | S |
| Q62 | (R-12) | M0-a-05 | IN-FLIGHT | Child DV, M0-a-05 S16 (S14's LINE 8 'R-12' confirmed and not re-judged; lands with S16). | yes | S |
| Q64 | (B2 sliver) | M0-a-08 | PLANNED | M0-a-08 S6, the two-leg child M0-c-03 S5 + M0-a-08 S6 after the router round lands (plan.json 'M0-a-08 S6': Q83, R12 ruling B2). | unclear | S |
| Q64 | (router shortfall) | M0-a-05 | IN-FLIGHT | Child DV, M0-a-05 S16 (router round); what it does not route goes to the M0-a-05 residual round (J796 R-1). | yes | L |
| Q69 | (a) (d) | M0-a-05 | AFTER | The re-profile of round 2B's tree (no round names these two; M0-a-05 is busy and its residual round edits the same files — fold there only if the re-profile shows them). | unclear | M |
| Q69 | (b) (c) | M0-a-03 | PLANNED | Round 3 = M0-a-03 S2 (plan.json 'M0-a-03 S2' lines Q127 + Q69bc), after round 2B and the re-profile. | yes | M |
| Q72 | whole | M0-t-00, M0-f-01 | STALE | Row ends at 'RULED RL10 … t-00 S1 before TIMING-PHASE READY'; J749 records M0-t-00 S1 PASS and landed ce009e91 with 'RL10: the timing phase times a PRODUCTION bundle, its stamp scope per row'. State should read DONE ce009e91 (J749); f-01's stamps did not move. | no | S |
| Q74 | (RQ2 shape role) | M0-a-02, M0-a-06 | IN-FLIGHT | Child ED, M0-a-02 S4 → M0-a-06 S10 (spec entries name 'Q79 … with Q74's last remainder'). | yes | M |
| Q76 | whole | M0-a-06 | IN-FLIGHT | Child ED, leg 2 M0-a-06 S10 (Q76 under R10). | yes | M |
| Q77 | whole | M0-a-05 | IN-FLIGHT | Child DV, M0-a-05 S16 (LINE 6 'Q77 and the r = 51 pin' confirmed; MK / ML pinned in S16). | yes | S |
| Q78 | whole | M0-a-06 | IN-FLIGHT | Child ED, leg 2 M0-a-06 S10. | yes | S |
| Q79 | (registry row + tx maintenance) | M0-a-02, M0-a-06 | IN-FLIGHT | Child ED, M0-a-02 S4 → M0-a-06 S10 (the merged RQ2 round's first two legs, J797). | yes | M |
| Q79 | (the write, leg 3) | M0-a-05 | PLANNED | RQ2 round's third leg on M0-a-05, its own child once DV's router round and ED's two legs have landed (split-2026-11-13/README.md). | yes | M |
| Q83 | (B2 cases 253 / 476) | M0-a-08 | PLANNED | M0-a-08 S6 in the two-leg child M0-c-03 S5 + M0-a-08 S6 after the router lands. | unclear | S |
| Q83 | (census residual, trio class-C) | M0-a-05 | PLANNED | The residual round of M0-a-05 (J796 R-1), after the RQ2 round's third leg; queue row opened at DV's landing. | yes | L |
| Q83 | (router class) | M0-a-05 | IN-FLIGHT | Child DV, M0-a-05 S16 (the router round; RL1 / J697). | yes | L |
| Q85 | whole | M0-m-01 | RULING | Question: does M0 add a second narration guard? Recommend NO → close as conditional, CARRIED TO M1 (the move rides with the first second guard; a shared module with one reader buys nothing now). | no | S |
| Q88 | whole | M0-c-02 | STALE | Row says 'CLOSED for the rounds; re-read at M0-e-06 S4's summary re-run'; e-06 S4 landed 908a3f0d and Q122's J782 sentence reports 'F-WALL's S5 class gone'. State should read CLOSED (J782). | no | S |
| Q90 | whole | M0-a-09 | RULING | Question: is Q90 a line of round 2B (J744 sent 'Q7 Q90's fix' to 2B's spec, but the v4 entries never name it)? Recommend: a measurement line in round A's shadow at binding; fix in round B if non-zero, else close. | yes | M |
| Q92 | (a) (b) | M0-b-03 | PLANNED | M0-b-03 S9 + M0-b-02 S3 (plan.json lines Q92a / Q92b; round 2B v4: 'Q92 … wait for M0-b-03's next round on the shifted tree'). | unclear | M |
| Q95 | whole | M0-a-06 | IN-FLIGHT | Child ED, leg 2 M0-a-06 S10 (R14). | yes | S |
| Q102 | whole | M0-b-03 | PLANNED | M0-b-03 S9 (with Q199, Q109, Q92; plan.json line Q102/Q117i), after round 2B and the re-profile. | yes | M |
| Q107 | whole | M0-a-09 | PLANNED | Round 2B (M0-a-09 S22 entry: 'Q107, Q110 (c) and Q117's tip and band-needle classes are re-measured by the session's 1 000-seed run'). | unclear | M |
| Q108 | whole | M0-b-02 | PLANNED | M0-b-02 S3, merged with M0-b-03 S9 (plan.json 'M0-b-03 + M0-b-02 S9 + S3'). | unclear | S |
| Q109 | whole | M0-b-03 | PLANNED | M0-b-03 S9 (plan.json line Q109). | unclear | S |
| Q110 | whole | M0-a-09 | PLANNED | Round 2B + the session's 1 000-seed run (S22 entry names 'Q110 (c)'); the other parts are not named by any entry. | unclear | M |
| Q111 | whole | M0-a-09 | PLANNED | Round 2B (S22 entry: 'Q111 (the replay classing export) and Q178 (a) close as moot at the landing'). | no | S |
| Q117 | (a-09: acute tip, BAND needles) | M0-a-09 | PLANNED | Round 2B + the session's 1 000-seed run (S22 entry). | unclear | M |
| Q117 | (b-03: the two (i) cases) | M0-b-03 | PLANNED | M0-b-03 S9 (plan.json line 'Q102/Q117i'). | unclear | M |
| Q118 | whole | M0-f-03b | PLANNED | M0-f-03b S2 (plan.json: waits on round 4 and the final site-summary re-run); last in J748 (2)'s order after round 4. | yes | L |
| Q119 | whole | M0-b-03 | PLANNED | M0-b-03's next round on round 2B's shifted tree (S22 entry: 'Q119 wait for M0-b-03's next round'), after c-07 phase a over the session's 1 000-seed fusion run. | no | M |
| Q121 | whole | V03 (design) | CARRY | Design round of V03 before M2a; rows at M6-P — no M0 work. | no | L |
| Q126 | whole | M0-a-09 | PLANNED | Round 2B: round A (no-shift, v4/spec-a09-s21.json, keyed S22) then round B (the shift, keyed S23); 2A (S18 + S19) landed 795f4c1e. | yes | L |
| Q127 | whole | M0-a-03 | PLANNED | Round 3 = M0-a-03 S2, after round 2B and the re-profile of its tree. | yes | L |
| Q128 | (round 4) | M0-b-03, M0-b-02, M0-a-10 | PLANNED | Round 4 = M0-b-03 S10 + M0-b-02 S4 + M0-a-10 S3 after round 3 and its re-profile. | yes | L |
| Q128 | (the numbers) | the session | AFTER | The Mac timing steps (owner's machine), after rounds 1–4 and TIMING-PHASE READY. | yes | S |
| Q129 | whole | M0-c-02, M0-c-04, M0-c-05 | AFTER | The re-profile after round 2B; NO round is planned or named for S5's cost. | unclear | L |
| Q130 | whole | M0-c-01 | AFTER | The re-profile after round 2B; NO round is planned or named for S4's cost. | unclear | M |
| Q135 | whole | M0-a-05, M0-c-02, M0-x-02, M0-x-04 | RULING | Question: build RL15's seam in M0 (an a-05 round after the router — none is planned) or carry? Recommend CARRY TO M1 with J238 (1)'s proof: cost-only, fail-safe, counted as a named class; reopen if Q129's re-profile makes it material. | unclear | M |
| Q136 | (values) | M5 / M6 items | CARRY | Design integrated (J668); values at later milestones. | no | L |
| Q142 | whole | M0-a-05 | IN-FLIGHT | Child DV, M0-a-05 S16 (its entry: 'LINE 9 (FAR1; Q142 closed)' confirmed, lands with S16). | yes | S |
| Q145 | whole | M0-a-16 | AFTER | The Mac timing steps (J722 (5): a-16's public-API rows follow the Mac steps, J558). | unclear | S |
| Q148 | (s1c-1, s1c-2, s1c-5) | M0-x-06 | STALE | Summary half CLOSED (5782c31c, J760); the remaining notes are exactly Q158's 'M0-x-06's notes s1c-1, s1c-2, s1c-5' CARRIED to M1 (J735). State should read CLOSED, notes carried by Q158. | no | S |
| Q152 | whole | M0-a-09 | PLANNED | Round 2B's round B (the shift; keyed S23, not yet bound) — 'they stay for round 2B after M0-a-05 S14'. | yes | M |
| Q153 | whole | M0-d-08 | NOW | M0-d-08 S2 (not busy; testkit tests, lighter check). Declared in every gate's red list today. | no | S |
| Q170 | whole | M0-t-00, M0-c-06, M0-e-06 | RULING | Question: is the per-sub-stage split stamp needed for M0's exit? Recommend NO → CARRY TO M1 (the first Mac reference run does not need it and §16 M0 (c)'s time clause is a sum of per-stage p95s). | no | M |
| Q171 | whole | the session | AFTER | The Mac timing steps (the re-budget decision, amendment z item 989 (c)). | unclear | S |
| Q172 | whole | the session (bench/src/profile) | CARRY | Carried to M1 by its own words (ISOLATED bench tooling) unless a pass touches the file first. | no | S |
| Q173 | whole | M0-c-02, M0-c-04 | IN-FLIGHT | Child EC, M0-c-02 S7 LINE 1 (leg 1) → M0-c-04 S7 (leg 2). NB: its J763 sentence on the river fixture seeds 1 and 6 is stale (Q202 (3): they commit). | yes | L |
| Q175 | (a) | M0-x-06, M0-f-02b | RULING | Question: build (a) in M0 or carry? Recommend CARRY TO M1 with Q158: not required for exit, and f-02b S2's whole-replay deadline already names a hang with its last seed. | no | S |
| Q176 | (a) (b) | M0-d-05a, M0-d-05b | CARRY | M1 (a) / M4 (b) by the row's own words. | no | S |
| Q177 | (a) | the session, M0-x-06 | PLANNED | The end-of-phase batch (the 1 000-seed write, Q177 (a)), after round 4. | yes | L |
| Q177 | (b) | M0-x-05 | CARRY | M1 by the row's own words. | no | S |
| Q178 | (a) (b) | M0-a-09 | PLANNED | Round 2B: round A (v4/spec-a09-s21.json LINE 5 for (b)); (a) 'close as moot at the landing' (S22 entry). J795's draft (landing 83) records both. | yes | M |
| Q178 | (c) | M0-a-09 | AFTER | Landing 83's gate (a09s20); the J795 draft states (a) and (b) only — add (c)'s answer (S20's CITY probe on S8's real cuts) when J795 is written. | no | S |
| Q178 | (d) | M0-a-09 | CARRY | M4 (the hardening pass) or the next round that opens the file — round 2B may absorb it. | no | S |
| Q179 | (a) | M0-a-04 | IN-FLIGHT | Child DZ, leg 1 M0-a-04 S7 (spec LINE 1 'N-c6-1 (Q179 (a)'). | unclear | S |
| Q179 | (b) | M0-a-13 | IN-FLIGHT | Child DZ, leg 2 M0-a-13 S3 (spec LINE 1 'N-s2c-2 (Q179 (b))'; in its closing check at 00:30Z). | unclear | S |
| Q180 | (c) | M0-e-06, M0-c-06, M0-a-11 | RULING | Question: which reading feeds the skeleton? Recommend the served exact region X(F) after round 2B (no new kernel contract), one graph per lobe, as a reader leg in the end-of-phase batch before the final summary re-run. No round is named. | unclear | M |
| Q180 | (d) (e) fusion seeds | the session, M0-e-06, M0-c-06 | PLANNED | The end-of-phase batch: M0-e-06's round after S5 with the final site-summary re-run, Q188 and M0-c-06's corpusSpine re-fold. | yes | M |
| Q181 | (N-13 kin: reverse order; F5) | M0-a-06 | RULING | Question: are the N-13 kin M0 work? Recommend: S11's spec measures their reach on the RQ2 head; a line of S11 if any registered family reaches them, else carried to M4 with J238 (1)'s proof. | unclear | M |
| Q181 | (main) | M0-a-06, M0-a-13 | PLANNED | Q181's merged round M0-a-06 S11 → M0-a-13 S4, specced on the RQ2 round's landed head (after the third leg). | yes | L |
| Q182 | (a) | M0-a-15 | PLANNED | The small follow-ups after the RQ2 round (Q182 (a), Q183, Q184), with Q181's merged round or as a leg of a later kernel round. | unclear | S |
| Q182 | (b) | M1 loader | CARRY | M1 by the row's own words. | no | S |
| Q183 | whole | the session, M0-a-02, M0-a-16, M0-a-15 | PLANNED | The follow-ups after the RQ2 round (session seams at its landing; the messages at a-02's / a-16's next touch). | unclear | S |
| Q184 | (a) (b) | M0-a-14, M0-a-04 | PLANNED | The follow-ups after the RQ2 round ('legs of a merged kernel round after the RQ2 round'). | unclear | S |
| Q185 | whole | M0-c-02 | IN-FLIGHT | Child EC, M0-c-02 S7 LINE 2 (leg 1). | unclear | S |
| Q187 | (a) (d) (e) | M0-c-02, M0-c-04, M0-e-06 | IN-FLIGHT | Child EC: (a) M0-c-02 S7 LINE 1, (d) M0-c-04 S7 LINE 2, (e) M0-e-06 S5. | yes | M |
| Q187 | (b) | M0-c-03 | PLANNED | M0-c-03 S5 in the two-leg child M0-c-03 S5 + M0-a-08 S6 after the router round lands. | yes | M |
| Q188 | (a) (b) | M0-e-06 | PLANNED | M0-e-06's round after S5 in the end-of-phase batch (with the final site-summary re-run). | unclear | S |
| Q189 | (a) (b) (c) | M0-c-05 | AFTER | Landing 82 (M0-c-05 S4 + S5) — its full-strength step rides on landing 83's gate (a09s20); J794's draft writes '(a), (b), (c) CLOSED'. | unclear | S |
| Q189 | (d) | M0-c-05 | CARRY | M1 with Q150 (C-0254 (3)'s lattice with S7's gate plazas). | no | S |
| Q190 | (a) (b) (c) | M0-c-01 | IN-FLIGHT | Child DZ, leg 3 M0-c-01 S6 (after M0-a-13 S3 ends). | unclear | S |
| Q190 | (d) | M0-c-02 | AFTER | EC's landing (M0-c-02 S7): its LINE 1 census names relief-3000 seed 1 and the river fixture but not this cell; the session reads it at the landing. | no | S |
| Q191 | whole | M0-a-09 | PLANNED | Round 2B's test lines per the row — but NEITHER v4 entry (spec-a09-s21 / s22) names Q191; add it at round A's binding. | unclear | S |
| Q192 | (a) (b) (c) (d) (e) | M0-e-02 | IN-FLIGHT | Child EA, leg 1 M0-e-02 S3 (PASSED its re-check after fix round -s4; lands with leg 2). | yes | M |
| Q193 | (a) | M0-e-03 | IN-FLIGHT | Child EA, leg 2 M0-e-03 S5 (closing check relaunched 00:06Z). | unclear | S |
| Q193 | (b) | M0-e-03 | RULING | Question (pass B): act at M0? Recommend CARRY TO M1 with its reason: no M0 reader claims that land; re-read when an M1 stage first claims land beside a grazing river. | no | S |
| Q194 | whole | M0-a-06 | PLANNED | Q181's merged round, leg 1 M0-a-06 S11. | yes | M |
| Q195 | whole | M0-a-05 | PLANNED | Decided with Q181's merged round, on a count on the RQ2 round's landed head. | unclear | S |
| Q196 | whole | M0-a-13 | PLANNED | Q181's merged round, leg 2 M0-a-13 S4. | yes | M |
| Q197 | (a) (d) | M0-a-11 | RULING | Question (pass B): widen §3.8's coalescing for classes (2)–(4)? Recommend NO at M0 → carry to M1 with J238 (1)'s proof (typed designed net, exact fallback, 1 registered face of 40 107); reopen if the final summary shows a reader cost. | no | M |
| Q197 | (b) (c) (e) | M0-a-11 | AFTER | The ruling on (a) at pass B: if (a) is carried they run ALONE at once as M0-a-11 S8 (item free); if (a) is built they bind with it. | unclear | S |
| Q199 | whole | M0-b-03 | PLANNED | M0-b-03 S9 (after round 2B and the re-profile). | yes | S |
| Q200 | (a) (c) (g) | M0-c-04 | IN-FLIGHT | Child EC, leg 2 M0-c-04 S7 (LINES 1, 3, 4). | unclear | S |
| Q201 | whole | M0-f-02a | NOW | M0-f-02a S4 (not busy; bench/src/tiers/runner.ts + test, lighter check). | no | S |
| Q202 | (1) | M0-c-02 | IN-FLIGHT | Child EC, leg 1 M0-c-02 S7 (the session's ruling sent 21:24Z); DECLARED RED until it lands. | yes | S |

## 7. Surprises

1. **Two rows routed to round 2B are missing from round 2B's entries.** Neither `v4/spec-a09-s21.json` nor `v4/spec-a09-s22.json` names **Q90**, which J744 sent to "2B's spec" as Q7, or **Q191**, whose own target is "round 2B's test lines". The S22 entry also names only **Q110 (c)**, not Q110's other parts. Fix these at round A's binding.
2. **Required work with no round.**
   - **Q129 and Q130** (the costs of S5 and S4): their measured p95s feed the gate's re-declaration, but nothing is planned after the re-profile.
   - **Q69 (a), (d)** (router-side constant factors on M0-a-05).
   - **Q180 (c)**: routed to "the round after round 2B that owns the readers", and no such round is in the planned list.
   - **RL13** (a structured field on the kernel's refusal, ruled "for an a-05 round AFTER this one" in S16's entry and e-03 S5's) has **no queue row at all**, and neither does RL15, beyond Q135.
3. **Q173 and Q202 contradict each other.** Q173 (J789) says the river fixture seeds 1 and 6 refuse with the later-rung text, and EC's leg 1 is told to read them as S5 refusals. Q202 (3) says they commit on the head.
4. **Q46 never received its RL2 closing**, although J750 records the proof delivered. Q202 later found seven of the rung's own pinned seeds committing. RL2's carried set is smaller than the row implies.
5. **Q29's "owed" pin was delivered long ago** (M0-e-06 notes:50). The row still says it is owed.
6. **Q178:** the J795 draft states (a) and (b) only. (c), which was routed to "the wiring round's binding note", and (d) (M4) are not said. Write (c) as answered by S20's CITY probe when J795 is written.
7. **Q49's carrier round has passed.** Its whole receipts now belong only to the end-of-phase batch, after round 4. That is the last thing before the Mac, so if round 4 slips, Q177 (a) and Q49 slip with it.
8. **Q181's round is the longest chain left.** It waits on the RQ2 third leg, which waits on DV's router round. Q195's possible outcome ("a line of M0-a-05's next round") would land in an M0-a-05 already queued for the third leg and then the residual round — three a-05 rounds in a row on the same files.
9. **Q153 is declared red in every gate yet belongs to no round.** d-08 is ISOLATED and has no exit hold, so the flake is carried by every landing's gate. It is the cheapest NOW item.
10. **Q85, Q170, Q172, Q175 (a), Q193 (b), Q197 and Q201 all name "pass B"** as their decision point. This triage answers them above as rulings or NOW items. None of them blocks M0's exit except possibly Q197 (a), which is recommended carried.
