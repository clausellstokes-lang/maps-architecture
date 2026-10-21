# Hardening re-triage 2026-10-19 — the plan (seat retriage/plan, Fable/xhigh)

Written 2026-10-19 from the eleven batch records B1–B11 under this folder (each read whole from disk) and
`plat/docs/build/checks/hardening-inventory.md` §3 (:2190-2363, the order words and dependencies). Read-only: no git,
no test, no build. Every round verdict below traces to a batch record's row verdicts (the `batch` column); every size
and every "rows left" list is the batch's, re-stated. Tags: [OBSERVED] = the batch seat read the source line;
[INFERRED] = reasoned. No batch tagged a whole DONE-BY as [INFERRED]; the two partial cases are noted in §6.

The frame: 56 planned rounds (inventory §3); 14 done, 6 in flight (a-09 S9 = the Q18 round, a-05 s9, c-01 s2,
c-03 s3, e-04 s3, k-04 s1), 34 unstarted code rounds re-triaged here (entries 55 session pass and 56 timing items are
not code rounds and were not judged; PROGRESS.md:477 J419). The width ceiling is twelve seats in all — the local seat
and eleven children per five-hour window (HANDOFF.md:240, J373) — so six children in flight leave five child slots
free now. The two gates in flight: Q18/Q19 (a-09 S9) gates a-09's own round, b-03, c-06 and f-02b; a-05 s9 gates
c-02, c-04 and e-03 (§3 entries 1, 9, 12, 25, 29, 31, 33, 36, 50). The refusal census and its ruling seat have landed
(HANDOFF.md:240: J356, J358), so every "after the census" order word is met.

The owner deferred to the session's judgement (J419); the rulings in §6 are the session's and vetoable; §4 lists what is
the owner's and is not decided here.

Corrected 2026-10-19 by the fix seat (retriage/fix) after `critic.md` (PASS-WITH-CORRECTIONS: 0 refuted, gaps G1–G9);
every change is listed row by row in `fix.md`. No verdict, size or wave moved; G2 adds R12 (§6), G8 states the hours
both ways (§5).

## 1. The rounds

Columns: rows open / done / defer are the entry's FIX-NOW rows (queue rows noted beside); size before → after; rows
left by ref; what the round waits on. "ruling:" names a session ruling needed at launch; "owner:" an owner decision.
"rows left" omits the round's defer-candidates (§4); a brief carries rowsLeft + deferPending (`plan.json`, per round)
until the owner rules on §4 — no deferral is applied by a brief before that ruling (G7).

| entry | item | verdict | open / done / defer | size before → after | rows left | waits on | batch |
|---|---|---|---|---|---|---|---|
| 10 | M0-a-07 | KEEP (hosts k-02, §2 M5) | 4 / 1 / 0 | small → small (4 S test pins) | M0-a-05:178 N-c2-7, M0-a-07:9 N-1, M0-a-07:10 N-2 (interior-point half), M0-a-07:12 N-4; rider N-c1c-2 (§6) | nothing of its own; k-04 s1 through the merge | B1 |
| 12 | M0-a-09 | SHRINK (X11 done) | 15 + L21, Q58, Q59 / 1 / 5 | large → large (15 + 3; note 28 L, Q58/Q59 M) | M0-a-01:94 N-c2-1, M0-a-08:287 N-c1-1, M0-a-09:6 1 KI-1, :24 4 K35, :28 5 K05, :32 6, :37 7, :57 12, :59 13, :79 18 R04, :115 23, :123 24 XR1, :158 27, :169 28, :219 32; L21, Q58, Q59; rider: Q60's fix if c-06's third continuation classes it as a band case (`M0-FIX-QUEUE.md:74`; the classification stays in F1) | Q18 + Q19 landed (a-09 S9 in flight); rows 5, 18, 23, 24 re-read against S9's kerb read before the brief | B1 |
| 16 | M0-a-16 | KEEP | 14 (13 + M0-a-16:96 12 moved in from entry 8) / 0 / 1 | medium → medium | M0-a-16:18 3, :23 4, :29 5, :34 6, :40 7, :43 8, :46 9, :78 11 (RQ4's restatement: the choices row striking N-55 (5) (1) + `writer()` on `isOpenTx`), :108 13, :113 14, :227 16, :235 17, :243 18, M0-a-16:96 12 | nothing (RQ4 met the §5 gate; the k-04/d-08 riders are dropped); owner: rows 5 and 7 are public-API additions | B1 |
| 18 | M0-d-04 | KEEP | 13 / 0 (+ L30 DONE-BY m-01 s1) / 2 | large → medium (13 rows, tests and text, no code path) | M0-d-04:6 1 N-1, :10 2 N-2, :16 3 N-3, :22 5 N-5, :32 9 N-9, :34 10 N-10, :44 12 N-12, :49 13 N-13, :53 14 N-14, :62 15 N-15, :152 N-c1-3, :181 N-c1-6, :188 N-c1-7 | nothing (m-01 s1 landed 2026-10-18; "with m-01" no longer binds) | B2 |
| 19 | M0-d-05a | MERGE-WITH d-05b (§2 M1) | 3 / 1 / 0 | small → small (1 test + 2 comments) | M0-d-04:159 N-c1-4, M0-d-05a:15 N-1, M0-d-05a:89 N-c2-2 | nothing; owner: the mint-side N-2 residue | B2 |
| 20 | M0-d-05b | KEEP (hosts d-05a) | 5 / 0 / 1 | small → small (8 S rows with d-05a) | M0-d-05b:11 N-1, :12 N-2, :13 N-3, :134 N-cc1-1, :135 N-cc1-2 | nothing | B2 |
| 21 | M0-d-06 | KEEP | 8 / 0 / 1 | medium → medium (8 S) | M0-d-06:6 1, :12 2, :18 3, :23 4, :28 5, :32 6, :40 8, :48 9 | nothing; row 5's exercise (and 7's if kept) is a Mac step | B3 |
| 22 | M0-d-08 | KEEP | 11 / 0 / 0 | medium → medium (8 S + 3 M; large if N-4/N-7's interpreter is read as a code-path change) | M0-d-08:10 N-1, :11 N-2, :12 N-3, :13 N-4, :14 N-5, :15 N-6, :16 N-7, :17 N-8, :19 N-10, :20 N-11, :22 N-13 | nothing (RQ4 dropped the a-16 11 rider) | B3 |
| 23 | M0-d-09 | KEEP | 7 / 0 / 0 | medium → medium (7 S) | M0-d-09:7 1, :15 2, :26 4, :32 5 (restated: add the fusion spike to the reproduction), :43 7, :47 8, :58 9 | nothing | B3 |
| 24 | M0-b-02 | KEEP | 9 + L28 (planner half) / 0 / 0 | medium → medium | M0-b-02:7 1 N1, :14 3 N3, :19 4 N4, :26 5 N5, :32 6 N6, :35 7 N7, :51 N9, :52 N10, :53 N11; L28; rider N12 (§6) | ruling: L28's one floor for both halves (C-0222 (9)) at launch; it runs before b-03 | B4 |
| 25 | M0-b-03 | KEEP | 11 + Q39, L20, L25, L28 (ladder half), Q65, Q70, Q87 / 0 / 1 | large → large (grows by Q65's code path, Q70, Q87) | M0-b-03:15 N-6, :16 N-7, :19 N-10, :21 N-12, :23 N-14, :25 N-16, :26 N-17, :28 N-19, :31 N-22, :34 N-25, :35 N-26; Q39 (fabric side, only under the ctx.batch shape), L20, L25, L28, Q65, Q70, Q87; rider: Q60's fix if c-06's third continuation classes it as a seed or kerb-component case (`M0-FIX-QUEUE.md:74`; §3 entry 25 lists Q60 here; the classification stays in F1; if F1 lands after b-03 opens, the rider falls to b-03's next round) | Q18 + Q19 landed; b-02 landed; ruling: Q39's shape (§6); owner: §5 Q8 for N-25 | B4 |
| 26 | M0-b-04 | MERGE-WITH b-05 (§2 M4) | 6 / 0 / 0 | small → small (4 S + 2 M) | M0-b-04:12 N-1, :13 N-2, :14 N-3, :15 N-4, :16 N-5, :19 N-8 | b-03 landed (N-1 reads Q65's outcome) | B4 |
| 27 | M0-b-05 | KEEP (hosts b-04) | 7 / 0 / 0 | medium → small-medium (13 rows with b-04, one shape for the twins) | M0-b-05:9 2, :11 4 (tangency half; the straightFirst half carries to the M1 parity presets), :12 5, :13 6, :14 7, :15 8, :16 9 | b-03 landed (through the merge) | B4 |
| 29 | M0-c-02 | KEEP | 22 + Q27, L31 (c-02 part) / 0 / 2 | large → large (N-26 is a declared shift on 42/1000) | M0-c-02:23 3 N-3, :27 4 N-4, :34 5 N-5, :37 6 N-6, :40 7 N-7, :49 8 N-8, :60 9 N-9, :72 10 N-10, :87 11 N-11, :109 13 N-13, :117 14 N-14, :132 15 N-15, :142 16 N-16, :181 21 N-21, :197 22 N-22, :212 23 N-23, :219 24 N-24, :229 26 N-26 (RQ5's shape), :252 28 N-28 (same `whyNot` change), :409 39 N-39, :493 45 N-45, M0-c-04:138 19 N-19; Q27, L31 | a-05 s9 landed (insertChain router); the census is done | B5 |
| 31 | M0-c-04 | KEEP | 17 + L31 (c-04 part) / 0 / 3 | large → large (17 rows) | M0-c-04:6 1 N-1, :10 2 N-2, :15 3 N-3, :26 4 N-4, :31 5 N-5, :38 6 N-6, :42 7 N-7, :46 8 N-8, :53 9 N-9, :68 10 N-10, :74 11 N-11, :77 12 N-12, :82 13 N-13, :291 20 N-20, :324 23 N-23, :333 24 N-24, :349 26 N-26; L31 | c-02 landed (Q27's stops merge, N-10's prelude hook, N-19's typed tag, L31's lowest-free-id rule start in c-02's owns) | B5 |
| 33 | M0-c-06 | MERGE into c-06's third continuation (a build child, §2 F1) | 1 + Q60 / 0 / 0 | small → no hardening child | M0-c-05:62 16 N-16; Q60 | Q18 landed; the harness itself (bench/src/fusion is the scaffold stub, bench/test/fusion absent) | B6 |
| 34 | M0-e-01 | KEEP | 5 + L27 (a) / 0 / 1 | medium → small (6 S) | M0-e-01:103 N-c1-1, :105 N-c1-3, :106 N-c1-4, :117 N-c1-5, :120 N-c1-8; L27 (a) | nothing; resume child P from wip/child-e01s1 (HANDOFF.md:27) | B6 |
| 36 | M0-e-03 | KEEP | 15 + L26, L27 (c), L27 (d), Q45 / 0 / 2 | large → large (row 1, L26, Q45 are code paths) | M0-e-03:6 1, :14 2 (M19 only), :21 3 (the rebuild's effect), :26 4, :32 5, :35 6, :60 10, :310 N-c1-1, :311 N-c1-2, :312 N-c1-3, :313 N-c1-4, :314 N-c1-5, :315 N-c1-6, :326 N-c1-7, :327 N-c1-8; L26, L27 (c), L27 (d), Q45 | a-05 s9 landed (L26 reads the structured refusal); the census is done | B7 |
| 38 | M0-e-05 | KEEP | 8 / 0 / 1 | medium → medium (8 S) | M0-e-05:11 N-1, :12 N-2, :13 N-3, :14 N-4, :15 N-5, :17 N-7, :18 N-8, :21 N-11; rider N-c1c-1 (§6) | nothing | B6 |
| 39 | M0-e-06 | KEEP | 7 + the Q36-class re-run (= row 1's run) / 0 / 1 | medium → medium (7 rows + one ~8 h run) | M0-e-06:9 1, :12 4, :13 5, :14 6, :17 9, :21 13, :23 15; Q36-class re-run | e-03 landed, e-04 s3 landed, M0-e-01 and M0-e-05 landed (§3 entry 39 "after the e-* stage rounds"; both wave 1), Q18 landed (the perf round); the 200-seed run exceeds a five-hour window (§3) | B7 |
| 40 | M0-k-02 | SHRINK (N-10 done; L18 → entry 41); rides a-07's child (§2 M5) | 3 / 1 / 1 | small → small (3 S) | M0-a-15:34 8, M0-k-02:17 N-12, M0-k-04:10 N-2 | k-04 s1 landed and k-04 off the busy list (N-2 and N-12's judge half edit `invariants/constructive.ts`, k-04's owns: the child's k-02 ID carries the one-file owns extension of R12) | B8 |
| 41 | M0-k-03 | KEEP | 0 FIX-NOW + 2 queue (KI-6, L18) / 0 / 0 | small → small-medium (2 M) | KI-6; L18 (both halves; a-08's arr-booleans-buffers/support.ts named in the brief, a-08 s4 having landed) | nothing | B8 |
| 43 | M0-k-05 | MERGE-WITH k-06 (§2 M2) | 2 / 0 / 1 | small → small (2 S) | M0-k-05:12 N-h, :14 N-j | nothing | B8 |
| 44 | M0-k-06 | KEEP (hosts k-05) | 4 / 0 / 4 | medium → medium (K6-1 M + 3 S; 6 rows with k-05) | M0-k-06:11 K6-1, :12 K6-2, :16 K6-6, :19 K6-9 | nothing | B8 |
| 45 | M0-x-02 | KEEP (M0-e-03:140 18 moves to entry 46) | 14 / 0 / 2 | large → medium if the two defers are taken (14: 11 S + 3 M), else large by count (16) | M0-x-02:6 1, :11 2, :17 3, :22 4, :31 5, :34 6, :40 7, :48 8, :61 9, :100 12, :107 13, :142 15, :163 18, :187 21 | the stage rounds it checks landed: b-03, c-02, c-04, e-03 | B9 |
| 46 | M0-x-04 | KEEP | 6 (5 + M0-e-03:140 18 moved in) + Q39 / 0 / 2 | medium → medium (7 rows: 4 S + 3 M) | M0-c-03:97 17, M0-x-04:12 4, :13 5, :14 6, :15 7; Q39 (the base-side door); M0-e-03:140 18 | b-03 landed; ruling: Q39's shape (§6) | B9 |
| 47 | M0-x-05 | SHRINK (3 done) | 7 / 3 / 2 | medium → medium at the floor (7 S, tests-only) | M0-b-03:12 N-3, M0-x-05:5 1, :12 2, :16 3, :21 4, :28 6, :30 7 | b-03 landed (Q65 moves rung (c); one regeneration of the coverage summary) — B10 finds nothing blocks the rows today, so it may fill a slot earlier if the session accepts a second regeneration | B10 |
| 48 | M0-x-06 | KEEP | 8 + Q52's 1 000-seed re-run / 0 / 2 | medium → medium | M0-x-06:12 3, :13 4, :14 5, :16 7, :18 9, :21 12 (shape half), :148 c2-1, :149 c2-2; Q52 re-run | the census rounds landed: a-09's round, c-02, c-04, e-03, and the wave-0 census rounds (a-05 s9, c-01 s2, c-03 s3, e-04 s3) (§3 entry 48; a-06, a-08, a-11, c-05 are among the 14 done, J419) (the re-pins and c2-1's seed lists move with them) | B10 |
| 49 | M0-f-02a | MERGE-WITH f-03a + s-02 (§2 M3) | 4 / 0 / 1 | small → small (2 code+test, 2 doc) | M0-f-02a:9 N-1, :10 N-2, :11 N-3, :12 N-4 | nothing | B11 |
| 50 | M0-f-02b | MERGE into f-02b's build (pass A, unbuilt; §2 F2) | 1 + Q49 / 0 / 0 | small → no hardening child | M0-f-02a:14 N-6; Q49 | Q18 landed; f-02b's own build (no landed record, no notes) | B11 |
| 51 | M0-f-03a | KEEP (hosts f-02a, s-02) | 4 / 0 / 0 | small → small (12 S rows with f-02a and s-02, 5 of them doc) | M0-f-03a:17 N-2, :22 N-7, :72 N-8, :73 N-9 | before f-03b lands (unbuilt) | B11 |
| 52 | M0-s-01 | KEEP | 7 + L14, L15, L24 (s-01 parts) / 0 / 0 | medium → medium (3-4 M) | M0-s-01:49 N-17, :50 N-18, :51 N-19, :52 N-20, :55 N-23, :65 N-25, M0-spec:28 N-17; L14, L15, L24 | nothing; same wave as d-07 (the L14/L15 split as B3/B11 drew it) | B11 |
| 53 | M0-d-07 | KEEP | 4 + L14 (MT, MQ, N7, N8, N9, N10, S-3 lint half), L15 W-2 (d) / 1 / 3 (L15 N2, N5, N6) | medium → medium (12 S) | M0-d-07:54 N11, :55 N12, :56 N13, :57 N14; L14 ×7; L15 W-2 (d) | nothing; same wave as s-01 | B3 |
| 54 | M0-s-02 | MERGE-WITH f-03a (§2 M3) | 3 + L22 / 0 / 0 | small → small | M0-c-05:34 10 N-10, M0-s-02:13 N1, :14 N2; L22 | nothing; must land before M0-b-05a's wave (AFTER-M-1) | B11 |

Verdict tally: KEEP 24, SHRINK 3 (a-09, k-02, x-05), MERGE 7 (d-05a, b-04, c-06, k-05, f-02a, f-02b, s-02), DROP 0.
No round drops: every one of the 34 keeps at least two open rows read in the current source.

## 2. The merges

A merged child runs its rounds in sequence on one branch; each item keeps its own notes section, closing check and
landed record. Merges were chosen only where the owns are disjoint, the rows are few and all S (or one M), and the
order gates are the same.

| # | items | rows | why |
|---|---|---|---|
| M1 | M0-d-05a + M0-d-05b (host d-05b) | 3 + 5 = 8 S | B2's proposal: `model/src/identity/` beside `model/src/match/` (match imports identity/lineage.ts); d-05a's rows are one refusal case and two comments |
| M2 | M0-k-05 + M0-k-06 (host k-06) | 2 + 4 = 6 (K6-1 M) | B8's proposal: both own the bench tier-job entries (`bench/src/parity/`, `bench/src/scan/`) and `testkit/baselines/`; C-0113 (2) names them as the two tier jobs |
| M3 | M0-f-02a + M0-f-03a + M0-s-02 (host f-03a) | 4 + 4 + 4 = 12 S (5 doc) | f-03a and s-02 are one package (`plat/packages/tables/`, `src+test/workLimits` vs `data+test/data`); f-02a is `bench/src/tiers/` plus two C-0241 sentences; no gate on any of the three; s-02's N1/N2 must land before M0-b-05a's wave, which this does |
| M4 | M0-b-04 + M0-b-05 (host b-05) | 6 + 7 = 13 (2 M) | twins in `bench/src/bentcut/` and `bench/src/bentcut-ng/`: b-04 N-8 ≡ b-05 note 5 (the pool `exit` handler), b-04 N-3 ≡ b-05 note 7 (the missed-share gate) — one shape, one seat (B4); the cost is that b-05 waits for b-03 with b-04 instead of filling a slot now, which the allowance favours |
| M5 | M0-a-07 + M0-k-02 (host a-07) | 4 + 3 = 7 S | kernel `src+test/faces` (a-07's owns) beside testkit `src+test/constructive` (k-02's owns); both small and all S; k-02 cannot open before k-04 s1 lands and a-07 loses nothing by waiting one wave. **Owns extension (R12):** k-02's ID also owns `plat/packages/testkit/src/invariants/constructive.ts` — M0-k-04's file (`M0-work.json` k-04: `plat/packages/testkit/src/invariants/`) — for exactly two edits: drop the KI-2 entry from `CONSTRUCTIVE_KNOWN` (row M0-k-04:10 N-2; the entry names its owner "M0-k-02 (the case data)", `constructive.ts:1777-1782`) and the `slot-reused` judge check (row M0-k-02:17 N-12's judge half). Valid only after k-04 s1 lands and k-04 is off the busy list; the busy-list entry names `M0-k-02 (+ testkit/src/invariants/constructive.ts)`; k-02's `land_child.py` call passes that file in `--owns` (land overlays only the owns per file, `tools/session/land_child.py:16, 106`, so an unlisted file would not land) |
| F1 | M0-c-06's round → c-06's third continuation build | 1 + Q60 | not a round of landed code: the harness is the scaffold stub on this tree (B6); Q60 is by its own text "c-06's third continuation" (M0-FIX-QUEUE.md:74), the child HANDOFF.md:240 already names (J's next round). No recipe change: one item |
| F2 | M0-f-02b's round → f-02b's build | 1 + Q49 | M0-f-02b is unbuilt (B11); N-6 rides the build that fills the entries; Q49's receipts re-run after Q18 inside it. No recipe change |

Optional (not taken, the session may): M0-d-06 + M0-d-09 — 8 S + 7 S = 15 rows, disjoint (`testkit/src/crosshost/`
+ `bench/src/crosshost/` vs `bench/src/determinism/`), no gate; it would be the one merge over the "small" line.

What the recipe needs (tools/session/child-recipe.md:4 gives one ID per child; `tools/session/land_child.py:262`
takes one `--item`): (a) the child's brief carries an ordered list of IDs, each with its own owns (from M0-work.json),
TAG and notes file; (b) the child's workflow runs build+check per ID in that order on the one NEW branch, each check
writing its own LANDED line and landed record, so a later ID's build starts from the earlier ID's checked tree;
(c) landing stays one item per `land_child.py` call — `inspect`/`land` run once per ID from the same branch, in the
same order (the first landing's commit is the base of the second); (d) the busy list names every ID of the child.
Nothing else changes: the owns stay disjoint by construction, so the branch's diff partitions by item — with one
declared exception, M5's k-02 ID, whose one-file extension into k-04's owns (R12) is named in its brief, its busy-list
entry and its `--owns`, and opens only with k-04 off the busy list (G2).

## 3. The new order

Twelve seats in all (the local seat and eleven children; HANDOFF.md:240). Six children are in flight, so five child
slots are free now; each landing frees one. Rounds are grouped by their gate state; inside a wave the launch order is
the priority order (the critical-path and the biggest first). A wave does not wait for the previous wave to finish:
a gated round opens the moment its gate lands and a slot is free, and gated rounds take a freed slot before a wave-1
straggler, because every wave-2 round heads a chain.

**Wave 0 (in flight, 6 seats):** a-09 S9 (Q18, then Q19), a-05 s9, c-01 s2, c-03 s3, e-04 s3, k-04 s1 (per J419,
PROGRESS.md:477; the children's own lane lines are not yet in docs/lane-events.log — only a-09 S9's spec run is,
`:10117`, `:10136`).

**Wave 1 — ungated, opens now (14 children, ~60 child-hours), in this launch order:**
1. M0-e-01 (small; resume child P from wip/child-e01s1).
2. M0-b-02 (medium; the session writes the L28 ruling into the brief; it precedes b-03 on the Q18 chain).
3. M0-a-16 (medium).
4. M0-d-04 (medium).
5. M0-d-08 (medium) — these five take the free slots; then, as the in-flight six land and these finish:
6. M0-s-01 and 7. M0-d-07 in the same window (disjoint tool families; the one is-main shape = `tools/landed/snapshot.mjs:250-253`'s realpath form, each family switching its own call sites; L14/L15 split as B3/B11 drew it).
8. M0-d-06, 9. M0-d-09 (or the optional merge).
10. M0-e-05 (+ rider N-c1c-1).
11. M1 d-05a+d-05b. 12. M2 k-05+k-06. 13. M3 f-02a+f-03a+s-02. 14. M0-k-03 (KI-6 + L18 both halves).

**Wave 2 — one gate each (5 hardening children + 2 build children):**
- on k-04 s1 landing (k-04 off the busy list): M5 a-07+k-02 (small; k-02's ID carries R12's one-file owns extension).
- on Q18 + Q19 landing (a-09 S9 checked): M0-a-09's round (large; the brief re-reads rows 5, 18, 23, 24 against S9's
  kerb read first); M0-b-03 (large; also after b-02, with the Q39-shape ruling and the owner's §5 Q8 answer in its
  brief); F1 c-06's third continuation (a build child carrying N-16 and Q60); F2 the M0-f-02b build (on Q18 and the
  session's detached 1 000-seed run; Q49) (pass A; N-6, then Q49's receipts) — the two builds are not hardening children and the session schedules them with pass A's remainder.
- on a-05 s9 landing: M0-c-02 (large; RQ5's shape for N-26/N-28), M0-e-03 (large; L26, Q45).

**Wave 3 — after a wave-2 round lands (5 children):**
- on b-03 landing: M4 b-04+b-05 (medium), M0-x-04 (medium; Q39's base-side door + e-03:140 18), M0-x-05 (medium at the floor).
- on c-02 landing: M0-c-04 (large).
- on e-03 landing (e-04 s3, M0-e-01, M0-e-05 and Q18 having landed): M0-e-06 (medium + the 200-seed site run; the run is ~8 h on four
  workers (B7, notes 1) and exceeds a five-hour window — the brief splits it over two sessions of the child, or hands
  the run to the nightly tier once F2 lands and has the child read the summary; the same run is the Q36-class re-run).

**Wave 4 — the closers (2 children):**
- on b-03, c-02, c-04 and e-03 landing: M0-x-02 (the runner pins; medium or large per §4's two defers).
- on a-09's round, c-02, c-04 and e-03 landing, and the wave-0 census rounds (a-05 s9, c-01 s2, c-03 s3, e-04 s3)
  landed: M0-x-06 (medium; Q52's 1 000-seed edge re-run inside it).

Width: wave 1 never exceeds the free slots because it is launched slot by slot; wave 2 can add at most five hardening
children at once, which with wave-1 stragglers must stay within eleven — the session holds a straggler launch when a
gate is about to land. Wave 3 adds at most five, wave 4 two. Rulings the session writes before the launch they gate:
L28 (before b-02), Q39's shape (before b-03 and x-04; §6 R4), and the a-09 brief's re-read of rows 5/18/23/24 after
S9. The owner's §5 Q8 answer is wanted before b-03 opens (§4); without it b-03 does N-25's KI sentence only.

Critical path in child-hours after the gates land: Q18 → b-03 (8) → x-04 / x-05 / b-04+b-05 (4.5) → x-02 (6) ≈ 18.5;
a-05 → c-02 (8) → c-04 (8) → x-06 (4.5) ≈ 20.5 — four to five windows of calendar time once both gates land, at the
width above.

## 4. The owner decisions

Every DEFER-CANDIDATE row the batches named, grouped by item, with this seat's recommendation (the owner decides; a
"keep" is a row that stays in its round; "M4" is the hardening pass of M4; "route" sends it to another M0 item).
Beyond these, only three things are the owner's: a-16's two public-API rows, b-03's §5 Q8, and d-05a's N-2 residue.

| item | ref | the row | why it can wait | recommend |
|---|---|---|---|---|
| M0-a-09 | :19 3 K34 | the kerb reach formula unpinned | contrived escape (two near-parallel streets closer than a half-width), B1 | defer to M4 |
| M0-a-09 | :42 8 | the agreement's refusal tally classes by prefix | the kernel B-FUZZ replay already classes by replay (K28 killed), B1 | defer to M4 |
| M0-a-09 | :54 11 | the random-network property accepts any refusal count | the agreement carries the strict comparison; the note calls it nice-to-have, B1 | defer to M4 |
| M0-a-09 | :199 30 N12 | `closeEnds` retry unreached by families | fail-safe refusal; 0 pinned closings in 2×10⁴, B1 | defer to M4 |
| M0-a-09 | :207 31 N2 | `ALONG_SQ` / `runVertex` unpinned | equivalent on the 72 closing networks (N-43 bound), B1 | defer to M4 |
| M0-a-16 | :12 2 | writers take raw slot numbers | debug-build only, declared (C-0220 (3)); stamped handles change the writer surface (L), B1 | defer to M4 |
| M0-a-16 | :29 5, :40 7 | public-API additions: `ResolveVertexAt` alias (5, S, additive), `tiling()` / `includeOwnChildren` on `LevelView` (7, M) | owner-gated surface (B1) | allow 5 in the round; hold 7 for M1's first reader |
| M0-d-04 | :24 6 N-6 | face sort-key uniqueness assert | the key is total by §3.3; a visibility assert, one line, B2 | keep (S, in a running round) |
| M0-d-04 | :70 16 N-16 | C-0308 (2)'s cost claim unpinned | a cost claim; adds a counter to `ModelDigest` (M); the note names M4 with the timing record, B2 | defer to M4 |
| M0-d-05a | :16 N-2 residue | `mint` itself does not refuse a repeating live set (`mint.ts:183-187` adds every entry, refuses none) | the note's second alternative is on the tree (`M0-d-05a-notes.md:16`; `liveSetOf`, `carry.ts:55-59`, pinned `carry.test.ts:144, 163`); every other `mint` caller builds its live set by hand from fresh minted ids — `layout/src/districts/stage.ts:267-270` (`input.live ?? []` plus its own ids; no pipeline caller supplies `input.live`), `layout/src/infill/bentCutFabric.ts:425, 455` (`ctx.live`), testkit `edge/s8.ts:125-127`, `ladders/support.ts:156-157, 211, 249` — well-formed by construction [INFERRED], B2 + critic C3 | not taken (M1, with the first caller that passes a live set it did not build) |
| M0-d-05b | :105 N-c1-2 | synthetic set-hash golden | a timing fixture, not a persisted form; the note names M0-t-00, B2 | route to M0-t-00 (entry 56) |
| M0-d-06 | :36 7 | Rosetta slice check of the Node binary | fails safe, meaningful only on the arm64 Mac, B3 | defer to the Mac step / M4 |
| M0-d-07 | L15 N2 | a second eslint config under a walk-skipped folder | a deliberate writer's escape; a lint-verdict change (M), B3 | defer to M4 |
| M0-d-07 | L15 N5 | `constructor.keys`, `eval`, `sort(void 0)`, `WeakRef`, `sh -c` | deliberate-writer escapes; several rule extensions (M), B3 | defer to M4 |
| M0-d-07 | L15 N6 | `.jsx`/`.tsx` in a vendored folder | the writer must also rewrite the lock to pass vendor:verify, B3 | defer to M4 |
| M0-b-03 | :30 N-21 | an offset spine before a court | quality not safety (N-45); fails safe and counted; its value is uncalibrated until the M-1 re-fit, B4 | defer to M4 with N-1/N-2 |
| M0-b-03 | :34 N-25 (§5 Q8) | a seed per kerb component: a record-format change | owner-gated (hardening-inventory.md:2438), B4 | rule before b-03 opens; this seat's view: the KI sentence (C-0344, choices.md:351) now, the format change with M1's records |
| M0-c-02 | :148 17 N-17 | `waterGates` `bankAt` synthetic graze | M20 equivalent for the one caller; a `bankAt` reader is a §4.12 consumer (M1+), B5 | defer to M4 |
| M0-c-02 | :419 40 N-40 | vertex clause vs side clause gap | equivalent in effect on every fixture; the pin needs a contrived vertex, B5 | defer to M4 |
| M0-c-04 | :87 14 N-14 | `withinTraceBatch` arms the first batch only | PLAUSIBLE only; closed outright by N-10's prelude hook, else a watch on c-02's trace, B5 | defer to M4 (N-10 may close it) |
| M0-c-04 | :109 16 N-16 | `wetSetback` tests vertices only | a backstop no honest input reaches (43 probe outlines), B5 | defer to M4 |
| M0-c-04 | M0-d-09:68 10 | why the S5 step draws nothing on seeds 1-3 | an explanation row; the bar is fail-safe (`unmoved` reported, C-0280 (3)), B5 | defer to M4 |
| M0-e-01 | :104 N-c1-2 | lifecycle identity / non-frozenness | unobservable before M2a's in-place writes; the test is one line, B6 | keep (S, in a small round) |
| M0-e-05 | :16 N-6 | the midpoint cut rounding onto `v[k-1]` | reported in `errorCells`, fails safe, a 1 000-doubles probe only; the fix changes the cut rule and so possibly band records, B6 | defer to M4 |
| M0-e-03 | :68 11 | F03/F04 locality pin | killed today by the CITY frames; a speed pin, informational, B7 | defer to M4 |
| M0-e-03 | :330 N-c1-11 | three comment wordings | comments only; minutes, B7 | keep (rides the round's comment pass) |
| M0-e-06 | :24 16 | `mineOver` attributes a wet edge to every enceinte naming it | fails closed; no such edge on seeds 1/9/15; conditional on C-0244, B7 | defer to M4 unless the 200-seed run shows it |
| M0-k-02 | :16 N-11 | seed 1045 (clearance exactly 50) unpinned | K03 equivalent to the case's promise; the note itself says M4, B8 | defer to M4 |
| M0-k-05 | :13 N-i | no named gating count on the parity line | declared in C-0186; the run items' checkers carry the guard, B8 | route to the run items' checkers (M0-b-05b, M0-c-07b) |
| M0-k-06 | :13 K6-3 | a line hit and a column hit are two rows | fails safe; one allow silences both, B8 | defer to M4 |
| M0-k-06 | :15 K6-5 | an allow entry without a file matches everywhere | declared (C-0247 (6)); the allow file is `[]`; k-07's reviewing practice, B8 | defer to M4 |
| M0-k-06 | :17 K6-7 | `\r` not counted as a line | fails safe (hits found, line number wrong), B8 | defer to M4 |
| M0-k-06 | :20 K6-10 | no `0x`-form allow entry tested | fails safe (exit 2 names it), B8 | defer to M4 |
| M0-x-02 | :78 10 | batch-soft rows not judged `unevaluated` | C-0316 (3) declares it; no M0 stage declares a batch-soft row; a recorded rule, B9 | defer to M4 |
| M0-x-02 | :172 19 | integer-like keys enumerate first | deterministic either way; contrived writer, B9 | defer to M4; the one header sentence rides row 21 |
| M0-x-04 | :16 8 | the `landHa === 0` guard only | guards a future owner rule; `unowned` 0 on every probe (M), B9 | defer to M4 |
| M0-x-04 | :19 11 | two-bridge order pin | needs a CITY fixture no sweep produced; e-06's harness is the alternative home (M), B9 | defer to M4 (or e-06's harness) |
| M0-x-05 | :25 5 | second-process byte check | C-0105 bars spawning from vitest; the nightly tier is its home, B10 | route to M0-f-02b's nightly |
| M0-x-05 | :34 8 | a second plain S8 control | strengthens a negative control only; every F-CUT row has its forcing fixture, B10 | defer to M4 |
| M0-x-06 | :19 10 | hang attribution post-hoc | fail-safe (the run goes red, the seed unnamed); pays off in the 1 000-seed nightly, B10 | route to M0-f-02b's nightly |
| M0-x-06 | :20 11 | `notBuilt` style | style only; the coverage test pins the message, B10 | defer to M4 |
| M0-f-02a | :16 N-8 | the idle on the measured path: a sleep seam | the alternative fix is M0-t-00's receipt (elapsed vs 30 s × attempts), B11 | route to M0-t-00 (entry 56) |

Count: 39 defer-candidate rows (36 inventory rows + 3 L15 parts). Recommended: 3 keep, 5 route to another M0 item,
31 defer to M4 — plus the three owner-gated items (a-16 rows 5/7, §5 Q8, the d-05a residue).

## 5. The counts before and after

Hours use the task's bands: a non-large round 3-6 h (small taken at 3, medium at 4.5), a large one 6-10 h (8). The
long runs — e-06's 200-seed site run (~8 h), Q49's receipts, Q52's 1 000-seed re-run — are machine time inside their
child's seat and are not in the per-round figure.

| | before (inventory §3) | after (this plan) |
|---|---|---|
| rounds / children | 34 (7 large, 15 medium, 12 small) | 26 hardening children: 5 large (a-09, b-03, c-02, c-04, e-03), 18 medium, 3 small — plus 2 build children (c-06, f-02b) that already exist in pass A |
| inventory rows in the rounds | 298 (the 34 entries' lists) + 1 moved in (M0-a-16:96 12) = 299 judged | 255 open, 8 done (a-07 N-6, a-09 X11, d-05a N-2, k-02 N-10, x-05 N-4, N-5, c-03 5, d-07 N3), 36 defer-candidates (owner) |
| queue / census rows | 23 unique (L18 listed twice) | 25 open (+ Q65, Q70, Q87 routed to b-03 after the inventory), 1 done (L30), L15's N2/N5/N6 parts defer-candidates |
| rows a child carries | 299 + 26 = 325 | 280 (every defer taken) … 319 (every defer kept) |
| child-hours (point) | 12×3 + 15×4.5 + 7×8 = 159.5 | with x-02's two defers taken: 3×3 + 18×4.5 + 5×8 + 1.5 (x-02 at the top of medium) = 131.5; without them (x-02 large by count, 16): 3×3 + 17×4.5 + 6×8 = 133.5 — the 2 h is the owner's (§4 x-02 rows 10, 19) |
| child-hours (range) | 123 – 232 | 93 – 176 with the defers; 96 – 180 without |
| cut | — | 28 h at the point (17.6 %) and 24 % on the range with x-02's defers; 26 h (16.3 %) and 22 % without |

The three small children are M1 (d-05a+d-05b), M5 (a-07+k-02) and e-01; M3 (f-02a+f-03a+s-02, 12 S rows + L22) is
counted medium in the hours (13 rows, §3's 7–15 band), as the merge saving below (16.5 h) assumes, although §1 labels
the host round f-03a "small"; k-03 (small-medium) and M4 (small-medium) are counted medium.

Where the cut comes from: two rounds folded into builds that exist anyway (c-06, f-02b: 6 h); five merges that save
one child's fixed cost each (M1–M5: 16.5 h); d-04 large → medium (3.5 h); x-02 large → medium with the defers (2 h, the owner's: 0 h without them);
e-01 medium → small (1.5 h); k-03 grows small → medium (−1.5 h). The row cut is 8 done of 299 (2.7 %) and 36 named
for the owner (12 %); the hour cut is mostly structure, not rows, which is what the tree shows: no round since the
inventory touched 27 of the 34 items' owns (B2–B11), and the seven that were touched (a-07, a-09, b-02, b-03, d-04 via
m-01, e-01 via R2, k-02 via k-04) were consolidations or neighbours that fixed three rows between them.

## 6. Session rulings taken in this plan (vetoable) and the inventory bookkeeping

R1. c-06's round and f-02b's round fold into their items' builds (F1, F2): neither is a round of landed code (B6, B11).
R2. M0-e-03:140 18 moves from entry 45 to entry 46 to ride Q39 (B9: one façade-door mechanism).
R3. M0-a-16:96 12 moves from entry 8 (done) to entry 16 (B1; C-0372 (7) handed `writer()`'s `isOpenTx` check to a-16).
R4. Q39's shape — recommended to the session for its ruling before b-03 opens: the façade door in
    `layout/src/pipeline/base.ts:245-255` (`watched`), x-04's owns, which closes Q39 and e-03:140 18 together and
    leaves S8's batch path untouched as R6 planned (M0-b-03-notes.md:106, B4). Under that shape b-03 does not take Q39.
R5. L28 is one ruling for both halves (C-0222 (9)'s reach floor), written by the session before b-02 opens (B4).
R6. L18 goes whole to k-03 with a-08's `arr-booleans-buffers/support.ts` named in the brief (a-08 s4 has landed; B8
    named the split as a decision — this seat rules it a routing).
R7. e-03 is not split into a pins-only half (B7's option): one child after a-05 s9, which is in flight; a split would add
    a child's fixed cost for a one-wave gain the allowance does not buy.
R8. e-06's bench-only pins ride row 1's child (B7's option), for the same reason.
R9. x-05 runs after b-03 (the inventory's order), not now (B10's finding that nothing blocks it today stands; running
    it now would regenerate the coverage summary twice once Q65 lands).
R10. Riders added (all S, in rounds that run anyway): a-07 N-c1c-2 (B1); b-02 N12 `cornerScale` (B4); e-05 N-c1c-1
    (B6: F1 is not equivalent — 73 of 133 probe runs move). e-05's other four post-inventory C1 rows stay at M4.
R11. s-01 and d-07 run in the same window as two children, not merged (both medium; one is-main shape in both briefs).
R12. (fix seat, G2) M5's k-02 ID takes a one-file owns extension, `plat/packages/testkit/src/invariants/constructive.ts`
    (M0-k-04's owns), for rows M0-k-04:10 N-2 and M0-k-02:17 N-12's judge half, opening only after k-04 s1 lands and
    k-04 is off the busy list; named in the brief, the busy-list entry and k-02's `--owns`. Not the alternative (route
    both to "k-04 s2"): §3 plans no second k-04 round (entry 42 is k-04's one round, the s1 in flight), so routing would
    add a child or reopen k-04's for two S edits; the inventory owns both rows to k-02 (:1849, :1859) and the KI-2
    entry names "M0-k-02 (the case data)" as its owner (`constructive.ts:1777-1782`).

Inventory bookkeeping for the session's J-row (the inventory is not edited by this run): mark DONE a-07 N-6 (C1,
`src/faces/fan.ts:64-66`), a-09 X11 (s2, `widthstep.test.ts:293-306`), d-05a N-2 (build/M0-d-05b, by the note's second alternative —
`M0-d-05a-notes.md:16`: the live-set builder states and tests that each id appears once — `liveSetOf`, `carry.ts:55-59`,
`carry.test.ts:144, 163`; the inventory's fix text (:1379) named only the mint alternative, which is not on the tree,
`mint.ts:183-187`, and stays on the §4 owner list as the residue),
k-02 N-10 (build/M0-k-04, `invariants/constructive.ts:418-422, 484-487`), x-05 b-03 N-4 and N-5 and c-03 5
(build/M0-x-05, `rungs-s8.test.ts:32-39, 86-99, 101-114`, `rungs-route.test.ts:19-23`), d-07 N3 (R1,
`coverage.test.mjs:179-184`), queue L30 (m-01 s1, `stage/lifecycle.ts:11-14`); mark L18 once (entry 41); restate
d-09 row 5 (the site spike is in the reproduction, the fusion spike is not; B3) and d-08 N-2's cite (print.ts:170; B3);
note C-0338 → C-0344 for b-03 N-25 (choices.md:351; B4).

INFERRED parts, stated as the task asks: no batch's DONE-BY rests on a lane line alone. Two have an [INFERRED]
component beside their [OBSERVED] source read — x-05's b-03 N-4 and N-5, where B10 observed the S8-run fixtures and
assertions (`rungs-s8.test.ts:32-39, 86-99, 101-114`) but did not re-run b-03's mutants K37/K38/K39; B4 observed
b-03's own C1-9 record (M0-b-03-notes.md:180-183) saying K37/K38 are now killed. The fixes are on the tree [OBSERVED];
the mutant kills are corroborated by a second seat's read of the record, not re-run. Both rows stay DONE-BY here; the
critic may re-run them. a-09 row 28 is STILL-OPEN with an [INFERRED] measure (the code path is OBSERVED unchanged);
the s-01 parts of L14 (A6/A4/B6/V3) and L22's code lines were not re-read line by line (B11) and are STILL-OPEN by the
rule that an unread row stays open.
