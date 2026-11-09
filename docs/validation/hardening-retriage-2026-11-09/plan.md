# Hardening re-triage 2026-11-09 — the plan (planner seat retriage-2; read-only)

Written 2026-11-09 by the planner seat "retriage-2". It reads and judges; it applies nothing (no edit outside this
folder, no git command that changes anything, no build, no test). Inputs read for this plan: docs/PROGRESS.md rows J237,
J238, J264, J567, J637 (the queue-rounds plan and RL1–RL15), J618 / J627 (the amendment's rounds), J717;
docs/COMPOUNDING-MAP-2026-10-27.md Appendix G.A (:2097–2142); every non-DONE row of docs/M0-FIX-QUEUE.md (80 rows; Q121
and Q136 are design rows with no M0 item and are not judged); the LANDED lines of docs/lane-events.log (highest
`check/<item>-close-sN` per item); the latest closing-check section of each candidate item's notes file; the drafted a-05
S14 spec; the in-flight spec entries in workflows/lane-prompts/session-fix-cloud/specs.json (a-06 S8 / S9, c-02 S6,
c-04 S5); and the current source at every row's cited lines (searched by symbol where lines moved).

The frame. IN FLIGHT, not planned: M0-a-06 (S8 landing, S9 specced), M0-c-02 (S6), M0-c-04 (S5), M0-t-00 (S1). CHAIN,
included and marked: M0-a-06 S9 → M0-a-09 S18 → M0-a-05 S14. Their cross-item write scopes are collisions for anything
touching kernel/src/arena/, index/items.ts, index/spatial.ts, insert/{splitThrough,insertChain,rewalk,snapRound,stretch}.ts,
faces/{split,merge,claim,common}.ts, warp/warp.ts and layout/src/pipeline/runner.ts (a-06 S8 LINE 2, a-06 S9's
cross-item paragraph), and for all of layout/src/growth/ (c-04 S5's OWNS) and layout/src/enceinte/ +
testkit/test/edge/repins.test.ts (c-02 S6). DONE TODAY: Q144 (J717); g18 PASS with Q151.

Rules applied (PROGRESS.md): J238 (an M0 row defaults to FIX with a pin; carry only with proof it needs later material);
J264 (zero refusals of lawful input); J567 (COMPOUNDS hardened to an independent PASS; ISOLATED takes its contract
check plus a queue row naming the absorbing milestone; MIXED hardens its contract part); N-45 (a contrived escape that
fails safe is a KI row). The amendment's rounds 1–4 are REQUIRED by J618 (991 (e): before TIMING-PHASE READY) whatever
the map class of the item that hosts them (a-03 is MIXED).
## 1. The rounds

Columns: class from COMPOUNDING-MAP-2026-10-27.md Appendix G.A (:2097-2142); REQ = REQUIRED-FOR-M0-EXIT, QRS = QUEUE-ROW-SUFFICES; rows open / done / defer / note / ruling-gated as judged in §2; check tier per task step 4.

| # | item | round | class | REQ / QRS | open / done / defer / note / ruling | size | waits on | collides with | check tier |
|---|---|---|---|---|---|---|---|---|---|
| R01 | M0-a-09 | S18 (CHAIN) | COMPOUNDS | REQ | 6 / 0 / 0 / 2 / 1 | large (code-path: amendment item 986) | M0-a-06 S9 landed (chain); M0-c-06 S1 landed (harness co-edit order, J637); RL14 (Q111) | M0-c-06 S1 (bench/src/fusion harness, item 986 '+ c-06's harness'); M0-b-03 S9 / S10 (the fabric's kerb reads, item 986); M0-a-05 S14 (chain order) | heavier (kernel) |
| R02 | M0-a-05 | S14 (CHAIN) | COMPOUNDS | REQ | 4 / 1 / 0 / 2 / 1 | large (code-path: the router) | M0-a-09 S18 landed (chain a-06 S9 -> a-09 S18 -> a-05 S14) | M0-a-04 S6 (S14's LINES 1-2 reach 'the placement rule's endpoint fallback'; placement.ts is a-04's - UNVERIFIED); M0-a-08 S6, M0-c-03 S5 (sequence: they re-measure on S14's head) | heavier (kernel) |
| R03 | M0-c-06 | S1 | ISOLATED | REQ | 3 / 0 / 6 / 1 / 0 | small | nothing | M0-a-09 S18 (must land BEFORE it: the harness co-edit) | lighter (bench/testkit/tools) |
| R04 | M0-f-03b | S2 | COMPOUNDS | REQ | 8 / 0 / 0 / 0 / 0 | large (table re-fit, a declared shift) | M0-c-06 S1 landed; the amendment's round 4 landed (R12); M0-e-06 S4's summary re-run (R25) | none on files (bench/src/worklimits, tables/data/workLimits.json); reads R03 / R25 outputs | lighter (bench/testkit/tools) |
| R05 | M0-a-16 + M0-a-15 | S4 + S2 | COMPOUNDS | REQ | 4 / 1 / 0 / 2 / 2 | small | R9 for the Q145 line only (the round can land without it) | none | heavier (kernel) |
| R06 | M0-x-02 + M0-x-04 | S4 + S3 | COMPOUNDS | REQ | 6 / 3 / 1 / 3 / 2 | medium (Q39's runner door is a code-path change) | M0-a-06 S8 landed (layout/src/pipeline/runner.ts:342 is in S8's cross-item scope); RL3 (Q39) | M0-a-06 S8 (runner.ts); M0-b-03 S9 (Q39's S8 half: sequence, door first) | heavier (layout) |
| R07 | M0-e-04 | S5 | COMPOUNDS | REQ | 4 / 0 / 0 / 1 / 1 | small | R11 (the rung-sign shape, N-s4c-3) | none | heavier (layout) |
| R08 | M0-e-03 + M0-e-02 + M0-e-01 | S4 + S2 + S2 | COMPOUNDS | REQ | 8 / 1 / 0 / 1 / 1 | medium | nothing | none | heavier (site) |
| R09 | M0-d-05a + M0-m-01 | S2 + S2 | COMPOUNDS | REQ | 2 / 0 / 0 / 4 / 0 | small | nothing | none | heavier (model) |
| R10 | M0-b-03 + M0-b-02 | S9 + S3 | COMPOUNDS | REQ | 9 / 3 / 0 / 2 / 3 | medium (large if RL6's fix changes the seed rule) | M0-a-09 S18 landed and the session's re-profile of round 2's tree; RL6, RL7, RL3; R06 (x-02's door, for Q39's S8 half) | M0-a-09 S18 (fabric reads); R12 (same owns); R06 (Q39 sequence) | heavier (layout) |
| R11 | M0-a-03 | S2 | MIXED | REQ | 2 / 0 / 0 / 0 / 0 | large (code-path, NO-SHIFT perf: amendment item 987) | M0-a-09 S18 landed + the re-profile of round 2's tree; M0-a-06 S9 landed (index/spatial.ts) | M0-a-06 S8 (index/items.ts); M0-a-06 S9 (index/spatial.ts) | heavier (kernel) |
| R12 | M0-b-03 + M0-b-02 + M0-a-10 | S10 + S4 + S3 | COMPOUNDS | REQ | 1 / 0 / 0 / 2 / 0 | large (code-path: items 988-989) | R10 and R11 landed + the re-profile of round 3's tree | R10 (same owns); M0-a-09 S18 | heavier (layout) |
| R13 | M0-a-08 | S6 | COMPOUNDS | REQ | 3 / 3 / 0 / 2 / 1 | small | M0-a-05 S14 landed; R12 ruling (B2) | none | heavier (kernel) |
| R14 | M0-a-04 | S6 | COMPOUNDS | REQ | 3 / 0 / 0 / 1 / 0 | small | M0-a-06 S8 landed (insert/splitThrough.ts in its scope) | M0-a-06 S8; M0-a-05 S14 (placement fallback; UNVERIFIED) | heavier (kernel) |
| R15 | M0-a-13 | S2 | MIXED | REQ | 2 / 0 / 0 / 1 / 0 | small | M0-a-06 S8 landed (warp/warp.ts in its scope) | M0-a-06 S8 | heavier (kernel) |
| R16 | M0-a-02 | S4 | COMPOUNDS | REQ | 4 / 0 / 0 / 0 / 2 | small (medium if RL4 adds the shape role) | M0-a-06 S9 landed (arena/write.ts); R10 (Q76); RL4 (Q79) | M0-a-06 S8 (arena/*); M0-a-06 S9 (arena/write.ts) | heavier (kernel) |
| R17 | M0-a-11 | S6 | COMPOUNDS | REQ | 1 / 1 / 0 / 0 / 1 | medium (a contract angle with a declared shift) | RL5 | UNVERIFIED: RL5 names a cross-item scope | heavier (kernel) |
| R18 | M0-c-05 | S3 | COMPOUNDS | REQ | 2 / 0 / 0 / 4 / 1 | small | M0-c-04 S5 landed (it owns all of layout/src/growth/ and test/growth/); R13 (Q150) | M0-c-04 S5 | heavier (layout) |
| R19 | M0-c-03 | S5 | COMPOUNDS | REQ | 3 / 0 / 0 / 0 / 0 | small | M0-a-05 S14 landed | none | heavier (layout) |
| R20 | M0-c-01 | S4 | ISOLATED | REQ | 2 / 0 / 1 / 1 / 0 | small | M0-c-02 S6 landed (its REPORTED siting share) | none | heavier (layout) |
| R21 | M0-c-07 | S1 | MIXED | REQ | 3 / 0 / 5 / 4 / 0 | small | nothing | none | lighter (bench/testkit/tools) |
| R22 | M0-b-05 | S2 | MIXED | REQ | 2 / 0 / 2 / 0 / 0 | small | nothing | none | lighter (bench/testkit/tools) |
| R23 | M0-x-06 | S2 | ISOLATED | QRS | 1 / 0 / 3 / 1 / 0 | small | nothing | M0-c-02 S6 only if the round touches testkit/test/edge/repins.test.ts (c-02's seam) | lighter (bench/testkit/tools) |
| R24 | M0-x-05 | S3 | ISOLATED | QRS | 2 / 1 / 2 / 0 / 0 | small | nothing | none | lighter (bench/testkit/tools) |
| R25 | M0-e-06 | S4 | ISOLATED | QRS | 3 / 0 / 1 / 2 / 0 | small | M0-c-02 S6 and M0-c-04 S5 landed (the re-run line) | R04 (sequence: f-03b reads the summary) | lighter (bench/testkit/tools) |
| R26 | M0-f-02a + M0-f-02b | S2 + S1 | ISOLATED | QRS | 3 / 0 / 9 / 3 / 0 | small | M0-t-00 S1 landed (UNVERIFIED overlap on bench tier files) | M0-t-00 S1 (UNVERIFIED) | lighter (bench/testkit/tools) |
| R27 | M0-k-06 | S2 | ISOLATED | QRS | 1 / 0 / 3 / 0 / 0 | small | nothing | none | lighter (bench/testkit/tools) |
| Q01 | M0-d-09 | S3 | ISOLATED | QRS | 0 / 0 / 2 / 1 / 0 | none: one queue row naming M1 | nothing | none | lighter (bench/testkit/tools) |
| Q02 | M0-d-08 | S2 | ISOLATED | QRS | 0 / 0 / 2 / 3 / 0 | none: one queue row naming M1 | nothing | none | lighter (bench/testkit/tools) |
| Q03 | M0-k-04 | S2 | ISOLATED | QRS | 0 / 0 / 2 / 0 / 0 | none: one queue row naming M1 | nothing | none | lighter (bench/testkit/tools) |
| Q04 | M0-k-05 | S2 | MIXED | QRS | 0 / 0 / 3 / 1 / 0 | none: one queue row naming M1 | nothing | none | lighter (bench/testkit/tools) |
| Q05 | M0-b-04 | S4 | MIXED | QRS | 0 / 0 / 3 / 2 / 0 | none: one queue row naming M1 | nothing | none | lighter (bench/testkit/tools) |
## 2. The judged rows, item by item

Conventions. "notes" = `plat/docs/build/checks/<item>-notes.md`; "queue" = `docs/M0-FIX-QUEUE.md` (line numbers as of
2026-11-09). Last landed = the highest `check/<item>-close-sN LANDED` line in `docs/lane-events.log` (or the item's
named check lane where it has no sN rounds). Verdicts: STILL-OPEN / DONE-BY / DEFER-CANDIDATE / NOTE /
RULING (= OWNER/SESSION-RULING; the ruling's id is in §4). [SRC] = this seat read the current source line;
[NOTES] = judged from the notes row only (the pin's absence not re-proved by reading the test file) — UNVERIFIED in the
strict sense, and the round's builder re-reads it first.

### 2.1 M0-a-09 — S18 (CHAIN: after M0-a-06 S9; spec not yet written) — COMPOUNDS (a-08/a-09, map G.A row "a-08/a-09 … COMPOUNDS (b,e)")

Last landed S17 (`check/M0-a-09-close-s17`, notes :1844). Content fixed by J618 (b) / J637 (1) (PROGRESS.md:675, :694):
round 2 of the kernel amendment (item 986, the derived kerb) with Q107 / Q110 / Q111 / Q117's a-09 part folded in.
Queue routing words: Q107 "ONE class with a-09 S15's line 4 and S16's row 145"; Q110 "a-09's next touch"; Q111
"a-09's next touch, if c-06's fourth continuation still needs it"; Q117 "M0-a-09 (the acute tip and the two BAND
needle classes: its next hardening round …)"; Q126 "round 2 on M0-a-09 after round 1's landing and measurement";
Q90 "re-measured at the amendment's round 2 … if the class survives round 2 it is FIX under J490 (1)".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q126 (item 986) | STILL-OPEN (chain) | kerb state per face + the derived kerb (one exact lattice clip), never inserted; S9 reads the same state; DECLARED model shift §6.5 (7); pin: the equality test against today's read within KI-13's bound; bars per J618 | queue:140; PROGRESS.md:675 |
| Q117 a-09 part (fusion 24 acute tip; integrated 11 / 36, fusion 23 BAND needles) | STILL-OPEN (chain) | the four named fixtures in `drift-fixtures.json` re-read on the derived kerb; pin: `drift.test.ts` cases flip to within N-43's bound | queue:131 |
| Q107 | STILL-OPEN (chain) | the T-junction wedge tip of C-0422 (kernel's corridor_split wedge) — one class with Q117's acute tip | queue:121 |
| Q110 | STILL-OPEN (chain) | closed ring's first corner cut to the centreline (hw 27–36); attraction depth 38.34 vs read ≤ 25.95; the 2.3° tip | queue:124; checks/M0-a-09-s16.md rows 144–145 |
| Q111 | RULING RL14 (§4) | the kernel export for replay classing — build only if c-06 still needs it | queue:125 |
| Q90 | STILL-OPEN (re-measure line) | re-measure the displaced-run-end class on round 2's tree; FIX if it survives (RL11, already ruled) | queue:104 |
| notes 156 (NB5, NB7) | STILL-OPEN | two unit pins: `splitsOn` on the recorded fold (red on NB5); the planted out-and-back piece commits (red on NB7) | notes:1852 |
| notes 157 | NOTE | observations, no ask | notes:1872 |
| notes 158 | NOTE | disclosures | notes:1882 |

### 2.2 M0-a-05 — S14 (CHAIN: after M0-a-09 S18; spec drafted `docs/validation/a05-s14-spec-2026-11-02/spec-a05-s14.json`) — COMPOUNDS (map row "a-04/a-05 … COMPOUNDS (d,e)")

Last landed S13 (`check/M0-a-05-close-s13`, notes :952). The drafted spec carries six lines; this seat adds nothing to
them and judges the rows not in them.

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q83 / Q44 / Q64 (notBuilt #2, classes E, S, D/W/P/V) | STILL-OPEN (chain) | spec LINES 1–3 (MAKE-IT-SUCCEED, RL1 CONFIRMED J693; bar = the router's set J697) | queue:97, :58, :78; spec-a05-s14.json |
| Q77 + MK / ML pins | STILL-OPEN (chain) | spec LINE 4 (the 2^53 tie in BigInt) | queue:91 |
| Q62 R-12 | STILL-OPEN (chain) | spec LINE 5 (re-measured on the S9 head, pinned either way) | queue:76 |
| Q142 / N-s13c-1 (FAR1) | STILL-OPEN (chain) | spec LINE 6 (T 516 267 pinned, red under `.slice(0, 1)`) | queue:156; notes:961 |
| N-s13c-2 (LOOSE) | NOTE | equivalent survivor under the fidelity bound | notes:962 |
| Q105 (notBuilt #3) | DONE-BY a-05 S12 131ed5ae + S13 | forms (3)–(5), (1′) built in S12; (1″) built S13 (C-0455); (1′)/(2) KEPT with J238 (1)'s proof (C-0456 (3)) — stale row, §5 | checks/M0-a-05-s13.md:120–122; reentry.test.ts (s13.md:46) |
| Q69 (a), (d) (reparent early return; one neighbour set per vertex in rewalk) | STILL-OPEN, not in S14 | NO-SHIFT perf; candidate line for an a-05 S15 after the re-profile of round 2's tree (with amendment round 3) | queue:83 |
| Q135 (a) (read-only split plan) | RULING RL15 (§4) | — | queue:149 |
| Q141 (the hit count of e-04's buffer rung) | NOTE | shrinks with LINES 1–3; re-measured by e-04 S5 | queue:155 |

### 2.3 M0-c-06 — S1 — ISOLATED for its own code ("c-06/c-07/a/b … ISOLATED / MIXED for the table cells"); REQUIRED by dependency (its per-stage work blocks are M0-f-03b's COMPOUNDS input)

Last landed: `check/M0-c-06` (first check, PASS) and the continuations to 4abd334a (J554); no sN round. Queue routing:
Q118 "c-06 S1 adds the fusion summary's [per-stage work blocks]" (J637). J637 (1): "c-06 S1 … before round 2 co-edits
the harness" — so this round must land BEFORE M0-a-09 S18.

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q118 (fusion per-stage work blocks) | STILL-OPEN | the fusion summary gains `stageWork` per stage × counter (e-06 S3's form in `bench/src/site/report.ts`); pin: a summary test that every charged counter appears at each stage that charges it | [SRC] summaries/M0-c-06.json has no `stageWork` key (keys: item, longRun, sizes, pass, verdicts, sharedS5, runs, timing, findings, longRunFindings); queue:132 |
| notes 3 (s9Refused / kerbReads counters) | STILL-OPEN (recommended in-round, J264 census row) | a test wrapping `kernel.tx` to refuse level-2 specs; asserts the two counters and `beyond` (kills M3, M4) | notes:11 |
| notes 5 (`foldRun` sums) | STILL-OPEN (recommended in-round) | extend the sums test to every summed field (kills R10) | notes:13 |
| notes 1 (BigInt comment overstates) | DEFER-CANDIDATE (ISOLATED; absorbed by M1's B-CITY-lite re-run of the harness) | reword the comment; a ≥ 13 km edge fixture only if the BigInt is to be pinned | notes:9 |
| notes 2 (evaluation budgets) | DEFER-CANDIDATE (M1) | injectable budgets + saw-tooth fixture | notes:10 |
| notes 4 (corpus downgrades pass-through) | DEFER-CANDIDATE (M1) | plant a sharp face; assert downgrades ≥ 1 (kills M14) | notes:12 |
| notes 6 (`stopRegion` box pre-filter) | DEFER-CANDIDATE (M1) | a diagonal lane whose box overlaps (kills D6) | notes:14 |
| notes 7 (derive.test.ts stand-in set) | DEFER-CANDIDATE (M1) | pin the stand-in set against an independent read (kills U2 in its own file) | notes:15 |
| notes 8 (per-seed floor) | DEFER-CANDIDATE (M1) | per-seed floor on the smoke's report | notes:16 |
| notes 9 (`--workers` cap) | NOTE | informative; report independent of W | notes:17 |

### 2.4 M0-f-03b — S2 — COMPOUNDS ("f-03a/b … COMPOUNDS (b)")

Last landed S1 (`check/M0-f-03b-close-s1`, lane log :12137). Queue routing: Q118 "the re-fit (f-03b S1) after the
amendment's round 4 … the C-0445 ruling applies a re-fit from S2, not F0's bytes; S2 re-freezes S1's fixtures as a
declared change"; J637 (1) "f-03b S1 (Q118's re-fit)" after round 4.

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q118 (the re-fit, v3) | STILL-OPEN | re-fit on summaries carrying per-stage blocks (e-06's landed, c-06 S1's), after round 4's counts; declared table shift (C-0104 form); pins: the fit test on re-frozen fixtures | queue:132 |
| N-12 (narrowed report fails: hitBound's ⌈n/1000⌉ margin) | STILL-OPEN | the law's per-row margin set in the re-fit; pin at a block whose n is not a multiple of 1 000 | notes:109 |
| N-13 (v3 hand-over no longer the fit) | STILL-OPEN | re-freeze fixtures from S2's base (declared) | notes:110 |
| N-14 (K16: pass ignoring unbounded rows) | STILL-OPEN | `live.test.ts` case: one unbounded row + live worst > 1 ⇒ fail | notes:111 |
| N-11 (test title states the target met) | STILL-OPEN | retitle to the PENDING-LONG-RUN reading | notes:20 |
| N-6 (S3 E_INVARIANT at v3, relief-3000 seed 8) | STILL-OPEN (REPORT line) | the re-fit's census names it; MAKE-IT-SUCCEED for S3's owners if v3 ships | notes:15 |
| N-8 + e-06 N-s3-2 (the reader reads one stage per counter) | STILL-OPEN | `bench/src/worklimits` reader loops every stage's block | notes:17; checks/M0-e-06-notes.md (N-s3-2, section "Notes for the session") |
| N-4 (summary says version 3) | STILL-OPEN | `shipped` field beside the fit's version | notes:13 |

### 2.5 M0-a-16 S4 + M0-a-15 S2 — ONE MERGED ROUND (RL9, J637) — COMPOUNDS (a-16 "COMPOUNDS (a)"; a-15 "COMPOUNDS (c)")

Last landed: a-16 S3 (`check/M0-a-16-close-s3`, notes :325; the 2026-11-09 seam session/a16-mixer-seam-1 changed tests
only, J717); a-15 S1 (`check/M0-a-15-close-s1`, notes :280). Queue routing: Q75 "a-16's round takes it — RULED RL9: a
MERGED ROUND … a-16 S4 (the REFUSED row in facade/notBuilt.ts and the stubs census) then a-15 S2 (io/encode.ts:113
`fail` → notBuilt('M1'))"; Q145 "M0-a-16 (export refuseNotBuilt; widen Milestone …) — or the session rules the table's
own stub lawful".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q75 (REFUSED row + encode.ts `fail` → `notBuilt('M1')`) | STILL-OPEN | a-16: REFUSED row `io/encode.ts M1` in `facade/notBuilt.ts` + stubs census; a-15: the loop-route case throws `notBuilt('M1', …)`; pin: `stubs.test.ts` green only with both (probe P9's red) | [SRC] kernel/src/io/encode.ts:113 still `fail(… not written at M0 (C-0207))`; queue:89 |
| Q75's isOpenTx half (a-16 note 12, `writer()`) | DONE-BY a-16 S3 + a-06 S7 | `writer()` checks `isOpenTx` | [SRC] kernel/src/facade/kernel.ts:43, :170; kernel/src/tx/state.ts:91 |
| Q145 (refuseNotBuilt export; Milestone lacks M5, M6-E, M4b) | RULING R9 (§4) | public API (J263 Q1) | [SRC] facade/index.ts:7 exports `notBuilt` not `refuseNotBuilt`; facade/types.ts:45 `Milestone = 'M1' \| 'M2a' \| 'M2b' \| 'M3a' \| 'M4' \| 'M6-P' \| 'M6-U'`; queue:159 |
| a-16 note 19 (`ResolveVertexAt`'s `nearest?` unheld) | STILL-OPEN | a `bind` returning `{ orphaned: true }` + a `// @ts-expect-error` with `nearest: 0` in reflection.test.ts (kills T3, T6) | notes:327 |
| a-16 note 20 (façade's own `refuseNotBuilt` escapes the census) | NOTE (KI, N-45: contrived, inverts layering, fails nowhere today) — cheap to fix in-round | seed the helper set from `facade/notBuilt.ts` too | notes:335 |
| a-15 N-s1c-4 (title understates L4) | STILL-OPEN (text) | retitle "L2 – L4 (partition chunks)" | notes:291 |
| a-15 N-s1c-7 (= queue L16 / Q76, stale stamp after compactSlots / load) | RULING R10 (§4) — not this round | — | notes:294; queue:90 |
| a-15 N-s1c-6 (id collision C-0367 / L-0542) | NOTE (renumbered at commit per ID RULE; UNVERIFIED that the renumber happened) | — | notes:293 |
| a-15 N-s1c-8 (= Q75) | see Q75 | — | notes:295 |

### 2.6 M0-x-02 S4 + M0-x-04 S3 — ONE MERGED ROUND (both own `layout/src/pipeline/index.ts`) — COMPOUNDS ("x-02/x-04 … COMPOUNDS (a,d)")

Last landed: x-02 S3 (`check/M0-x-02-close-s3`, notes :298); x-04 S2 (`check/M0-x-04-close-s2`, lane log 2026-11-02
11:49, notes :207). Queue routing: Q139 "RULED (J674) → M0-x-02's next touch (the E_-only pin)"; Q39 "M0-b-03 (route
S8's batches through ctx.batch) / M0-x-04" with RL3 "the runner door — x-02 S4, not S3" (J637 (3)); Q135 (c) "watchers
that skip a marked batch (M0-x-02 / M0-x-04's receipts)".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q139 | STILL-OPEN | `warning(code)` refuses a code opening `E_` (RangeError), W_ codes pass; pin: E_ offered to `warning` throws, `W_CUT_SLID` counts | [SRC] layout/src/pipeline/report.ts:266–270 accepts any non-empty code; queue:153 |
| x-02 note 27 (C04d, C10c survivors) | STILL-OPEN | probes P1, P2 as cases in runner.test.ts / rows.test.ts | notes:304 |
| x-02 note 28 (`classFloor` row with no floor reads as held) | STILL-OPEN (with Q39) | count a classFloor row only when `env.floors` gives its class a floor; pin: a row with no floor injected counts 0 | notes:319; kernel/src/tx/tx.ts:389–390 (cited by the note) |
| x-02 note 29 (run.test.ts:211 declared red) | DONE-BY x-04 S2 (e0e45b7c) | the fixture built on the registered view | [SRC] layout/test/pipeline/base/run.test.ts:54, :212–215 |
| Q39 (S8's batches bypass the batch door) | RULING RL3 (§4), then STILL-OPEN in this round (runner half) + b-03 S9 (S8 half) | a batch door S8 can call (`ctx.batch`), counted in the report; NO-SHIFT (report only) | [SRC] layout/src/infill/bentCutFabric.ts:1595 (`expect: [BLOCK_FLOOR_ROW]`), :1674 (`k.tx(b.spec, b.fn)`); queue:53 |
| Q135 (c) | RULING RL15 (§4) | — | queue:149 |
| x-04 note 16 (pass 1 recomputed on the bare view) | STILL-OPEN | recompute on `REGISTERED` (`run.test.ts:499, :510`) | notes:214 |
| x-04 note 17 (`baseS6Input` handed a context without a view) | STILL-OPEN | `tables: REGISTERED` in the test's ctx (`run.test.ts:392–394`) | notes:215 |
| x-04 note 18 (river seeds 1, 6 S5 E_SELF_INTERSECT, F-WALL) | NOTE (routed: the c-02 S6 / c-04 S5 rounds in flight carry the class — Q88 / Q46) | — | notes:216 |
| x-04 note 19 (harnesses call `run` on `baseArena`'s default) | DEFER-CANDIDATE (no caller hands a variant view today; the bench owners' harnesses are ISOLATED; M1's tiers absorb) | — | notes:217 |
| x-04 notes 20, 21 | NOTE (API accounting; disclosures) | — | notes:218–219 |
| Q138 | DONE-BY x-04 S2 e0e45b7c (stale, §5) | — | [SRC] run.test.ts:212–215; checks/M0-x-04-s2.md:26 |
| Q99 x-04 line (base.ts) | DONE-BY x-04 S2 | — | checks/M0-x-04-s2.md:3 (LINE 2 fixed) |

### 2.7 M0-e-04 — S5 — COMPOUNDS ("e-04 … COMPOUNDS (d)")

Last landed S4 (`check/M0-e-04-close-s4`, notes :592; 25a5cde0, J686). Queue routing: Q143 "M0-e-04's next round: the
two probes as cases … and the rung's sign on runS6 … the session rules the shape in that round's spec; else M4"; Q141
"the timing phase … and e-04's next round for the recursion width".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q143 / N-s4c-1 (halving pinned one level deep) | STILL-OPEN | the notches at the 1/16 points and x = 35 000 refused (kills M11) | notes:596; [SRC] layout/src/districts/perimeter.ts:341 `NEAR_HALVINGS = 32` |
| Q143 / N-s4c-2 (`NEAR_HALVINGS` pinned to depth 2) | STILL-OPEN | the N = 16 and 64 near-collinear blocks pass at 5 cm and 104 cm (kills M12) | notes:597 |
| Q143 / N-s4c-3 (bare `runS6` carries no sign of the rung) | RULING R11 (§4), then STILL-OPEN | the shape the ruling picks; pin: a bare `runS6` on a rung input shows the sign | notes:598; [SRC] districts/stage.ts:464 |
| Q141 / N-s4-2 (unbounded recursion width) | STILL-OPEN (N-45 KI today; cheap) | iterative halving with a piece budget, refusing when spent; pin: a ridge ring exhausts the budget and refuses typed | notes:590; queue:155 |
| Q141 / N-s4-1 (buffer rung 10–18 s) | NOTE (measurement; re-measure after a-05 S14 removes class A from the rung) | — | notes:589 |

### 2.8 M0-e-03 S4 + M0-e-02 S2 (+ M0-e-01 S2 as a one-line rider) — ONE MERGED ROUND (@plat/site: water/, hydro/, terrain/) — COMPOUNDS (e-03 "COMPOUNDS (a)", e-02 "COMPOUNDS (a)", e-01 "COMPOUNDS (d)")

Last landed: e-03 S3 (notes :456); e-02 S1 (notes :218); e-01 S1. Queue routing: Q114 / Q115 "M0-e-03's next hardening
round"; Q123 "M0-e-02 / M0-e-03's next round: the F-RIVER fallback's trigger on the 3 000 m relief"; Q122 "S1's 1 into
e-03's next"; Q87 "each owner's next round: M0-e-01 …"; J637 (1) planned e-03 S4, e-02 S2, e-01 S2 separately.

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q114 / N-s3c-1 (R1c cell re-finding) | STILL-OPEN | a planted façade moving a shore vertex across a hydro cell edge; asserts the outfall's `cell` follows `at` (kills R1c) — or the re-finding removed with a reason | [SRC] site/src/water/stage.ts:184, :242 (`onCommittedShores`); notes:464; queue:128 |
| Q115 / N-s3c-2 (near-edge fallback on SMALL_RIVER 1890815356, 2893352673) | STILL-OPEN | read both seeds; pin the fallback as lawful (a DP-clipped vertex 20 / 46 cm inside the edge) or fix the clip to keep the edge | notes:465; queue:129 |
| Q122 S1 share (relief-3000 default seed 184, S1 E_INVARIANT "offset: a pocket inside a pocket … rings meet") | STILL-OPEN | MAKE-IT-SUCCEED (J264); seed pinned | [SRC] plat/docs/build/summaries/M0-e-06.json groups[2].refusals (S1, seeds [184]); queue:136 |
| Q123 (river degrades on 27–32 % of relief-3000 seeds) | STILL-OPEN (judgment line: e-02 + e-03) | the F-RIVER fallback trigger judged against §4.2 S1's rules; declared shift if pinned seeds move | queue:137; checks/M0-e-06-notes.md row 20 |
| e-02 N-s1c-1 (corridor's last cell's neighbours) | STILL-OPEN | the 7 × 7 probe as a case (kills D2c) | e-02 notes:226 |
| e-02 N-s1c-2 (degraded pick's tie-break) | STILL-OPEN | `valleyFallingEast` 45°, seed 3 delivers attempt 0 (kills K20t) | e-02 notes:227 |
| e-02 N-s1c-3 (`edgePoint` clamp) | STILL-OPEN | a grid whose corner centres lie beyond reach (kills N02c) | e-02 notes:228 |
| Q87 e-01 copy (`generatedLifecycle` hand-written in terrain) | STILL-OPEN (rider) | `site/src/terrain/heightfield.ts:41` → `@plat/model`'s `generatedLifecycle`; the build is the pin | [SRC] site/src/terrain/heightfield.ts:41–42; queue:101 |
| e-03 N-s3c-3 (x-06's declared reds) | DONE-BY x-06 S1 (J700, Q113) | — | queue:127 |
| e-03 N-s3c-4 (a read-only `git log` disclosed) | NOTE | — | notes:467 |
| L26 (structured refusal field in place of the water stage's regex) | RULING RL13 (§4) — not this round unless ruled | — | queue L26 (lower-severity section) |

### 2.9 M0-d-05a S2 + M0-m-01 S2 — ONE MERGED ROUND (@plat/model: identity/ and stage/ ) — COMPOUNDS (d-05a "COMPOUNDS (d)", m-01 "COMPOUNDS (c,d)")

Last landed: d-05a S1 (notes :129); m-01 S1 (notes :133). Queue routing: Q93 "RULED RL11 (J637): FIX — … a mint-side
refusal with one pin in d-05a S2 (or a stated reason in its choices row)"; Q85 "the item that adds the second guard
(pass B), with M0-m-01's one import line in its next round".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q93 (mint accepts a live set repeating an id) | STILL-OPEN | `mint` refuses a repeated live id (RangeError, the builder's wording of carry.ts:59); pin in test/identity | [SRC] model/src/identity/mint.ts:184–189 (no repeat check); model/src/match/carry.ts:59 refuses; queue:107 |
| m-01 N-s1-1 (guard's reach over non-comment lines) | STILL-OPEN | a planted `it` title containing "(kept since round 3)" is red | m-01 notes:140 |
| m-01 N-s1-2 (phrasings that pass the patterns) | NOTE (KI, N-45: the deny-list fails safe) | — | m-01 notes:141 |
| m-01 N-s1-3 (`lawLimit` accepts a negative floor) | NOTE (KI, N-45: UNLAWFUL, refused first at the table door `tables/src/workLimits/table.ts:71`) | — | m-01 notes:142 |
| Q85 (narration list into @plat/testkit) | NOTE (asks nothing until a second guard exists; the move rides pass B) | — | queue:99 |
| d-05a N-cs1-1 | NOTE (disclosure) | — | d-05a notes:138 |

### 2.10 M0-b-03 S9 + M0-b-02 S3 — ONE MERGED ROUND (the b-03 / b-02 precedent) — COMPOUNDS ("b-02/b-03 … COMPOUNDS (b,e)")

Last landed: b-03 S8 (`check/M0-b-03-close-s8`, PASS, "None (confirm-only scope)", checks/M0-b-03-s8.md:97–99, so
the S7 check's rows notes :426–440 are the latest unfixed); b-02 S2 (`checks/M0-b-02-s2.md`, PASS, CONFIRM-ONLY, no
row; the S1 check's rows notes :182–193 stand). Queue routing: Q102 "M0-b-03's next round after S7"; Q117 "M0-b-03 (the
two (i) cases, with Q102)"; Q109 "M0-b-03's next touch"; Q92 "M0-b-03's L28 round"; Q119 "b-03's next round when the
real-size figure exists"; Q108 "M0-b-02's next round"; J637 (1): "AFTER round 2 and the re-profile: b-03 S9 (Q102 /
Q117 (i) per RL6, Q109, Q92, Q119), b-02 S3 (Q108; RL7)".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q102 + Q117 (i) (fusion 25 776 cm; integrated 38 974 cm: a kerb in two parts, the seedless one across a spine's band) | RULING RL6 (§4), then STILL-OPEN | re-measured on round 2's tree first; then a seed in every kerb component (or the part courted / merged); pin: the two named drift fixtures within N-43's bound | queue:116, :131 |
| Q109 / S7-4 (seedless-part recount; `seedless-part.json` is the before-image's) | STILL-OPEN | recount seedless split parts over the registered seeds with the fusion harness (landed); restate C-0426 (13) | notes:438; queue:123 |
| Q92 (b) / b-02 S1-c3 (L28 fusion seeds 1, 2, 11, 30) | STILL-OPEN (measurement line; was blocked only by c-06's empty scaffold, now landed) | derive the four seeds; floor hits counted; no code change expected | b-02 notes:193; queue:106 |
| Q92 (a) / b-02 S1-c1 (65 `flatten` E_NOT_TWO_CROSSINGS on holed stars) | STILL-OPEN (measurement line) | ladder statistics on the star probe's holed faces name the rung taken; a face refused at the ladder's end is MAKE-IT-SUCCEED | b-02 notes:191 |
| S7-1 (`squaredFarEnd`'s strict foot, Y18) | STILL-OPEN | one unit case whose stub point's nearest ring point is a vertex ⇒ null | [SRC] layout/src/infill/ladder.ts:330–332 (`t > 0 && t < 1`); squared.test.ts names `squaredFarEnd` only in a comment (:6); notes:435 |
| S7-2 (N-21's "the nearer first", Y37) | STILL-OPEN [NOTES] | holes.test.ts case where both offsets cut; the nearer is committed | notes:436 |
| S7-3 (squareness only through the judge) | STILL-OPEN [NOTES] | assert `kerbEndsSquare` on the committed lane in squared.test.ts | notes:437 |
| S7-5 (a) (`cut/antenna` red) | DONE-BY x-05 S1 | no longer reproduces | checks/M0-x-05-notes.md:52–53 |
| S7-5 (b) (K6-6 timeout) | see M0-k-06 (Q147) | — | notes:439 |
| S7-6 (census restatement) | DONE-BY b-03 S8 (C-0427 (4) restates S7-4 and S7-6) | — | notes:467 ("C-0427 (4) restates both") |
| Q39 S8 half | RULING RL3 (§4), then STILL-OPEN | S8's batches through the runner's door; NO-SHIFT | [SRC] bentCutFabric.ts:1674; queue:53 |
| Q119 (court share 0.78–0.84 vs band 0.45 / 0.65) | NOTE (asks a measurement first: c-07 phase a at real size; ruling R14) | — | queue:133; [SRC] no c-07 summary in plat/docs/build/summaries/ |
| Q108 (KerbPortal has no per-portal reach) | RULING RL7 (§4), then STILL-OPEN | an optional per-portal reach on KerbPortal (additive API) read by the slide and `lengthAt`; pin: a clipped cross-chain portal reserves only its own reach | [SRC] layout/src/infill/planner.ts:84–89 (`at`, `laneWidthCm` only); queue:122 |
| b-02 S1-c2 (`alternate: null` two meanings) | NOTE (nothing reads the reason; an API field only if a reader needs it) | — | b-02 notes:192 |
| Q87 b-03 part | DONE-BY b-03 S7 0b734e7c | — | [SRC] bentCutFabric.ts:960, :1024 call `generatedLifecycle` |

### 2.11 M0-a-03 — S2 = the kernel amendment's ROUND 3 (item 987) — MIXED ("a-03 … MIXED (e)"); REQUIRED by J618 (991 (e): rounds 1–4 before TIMING-PHASE READY), not by its map class

Last landed S1. Queue routing: Q127 "round 3 on M0-a-03 after the re-profile of round 2's tree … briefed after the
re-profile of round 2's tree and scoped by its shares"; Q69 "a-05's and a-03's hardening rounds (or a dedicated perf
round per item)".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q127 (item 987) | STILL-OPEN (waits on the re-profile of round 2's tree) | the `large` set in a coarse grid; generation-stamped seen array; faces-only queries on one level; NO-SHIFT; bars per J607 | queue:141 |
| Q69 (b), (c) (faces-only level skip; `gridCandidates` without per-call Set) | STILL-OPEN (folds into Q127; same file) | — | queue:83 |

### 2.12 M0-b-03 S10 + M0-b-02 S4 + M0-a-10 S3 — the kernel amendment's ROUND 4 (items 988–989) — b-02/b-03 COMPOUNDS; a-10 MIXED; REQUIRED by J618 (991 (e))

Queue routing: Q128 "round 4 on M0-b-03 after the re-profile … the work outside the kernel ≤ 2 ms a cut"; HANDOFF.md:311
"round 4 (b-03 + b-02 + a-10)". a-10 has no unfixed row of its own: its S2 check found none
(`checks/M0-a-10-s2.md` §3 "None"); its share here is item 988's geometry (UNVERIFIED which a-10 function: the
re-profile names it).

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q128 (items 988–989: the fabric's per-visit work) | STILL-OPEN (waits on the re-profile of round 3's tree) | pointLocate by face id and version, a portal memo per district, thickness against its threshold with the pole reused, side runs from the kerb state, the digest over the dirty set; NO-SHIFT; the provisional ceiling ≤ 10 s S8 at CITY | queue:142 |
| Q129 / Q130 (S5 and S4 costs) | NOTE (the D-18 re-declaration is a sum and waits for their measured p95 after the re-profile; no round asked now) | — | queue:143, :144 |

### 2.13 M0-a-08 — S6 — COMPOUNDS ("a-08/a-09 … COMPOUNDS (b,e)")

Last landed S5 (`check/M0-a-08-close-s5`, notes :551). Queue: Q83's tail (J697) "253 / 476 are B2 (arr/winding.ts,
a-08's)"; Q64's tail "the B2 sliver (106–108 cm against 104) is the overlay's".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| N-s5c-4 (register.json re-recorded when the router round lands) | STILL-OPEN (waits on a-05 S14) | rows that commit leave the register (a declared change); pin: the 88-line count re-measured equal to the register + fuzz | notes:563 |
| B2 sliver (integrated 253, 476; overlay 106–108 cm vs 104) | RULING R12 (§4) | measured at a-05 S14's landing; FIX in this round if it survives | queue:97 (J697 tail), :78 |
| N-s5c-2 (seed line invisible on a green run) | STILL-OPEN (text) | one line in the trio's headers ("read with `--reporter=verbose` or `PLAT_FUZZ_COUNTS`") | notes:561 |
| N-s5c-1 (RQ1 fixture exercises one cut site) | NOTE (equivalent on the promise; the router's own pins hold the rest) | — | notes:560 |
| N-s5c-3 (a pin writes under `os.tmpdir()`) | NOTE (session; the pattern stands in nine files) | — | notes:562 |
| Q97, Q106 a-08 half, Q74 RQ1 | DONE-BY a-08 S5 8c5411cd (stale prefixes, §5) | — | queue:111, :120, :88 |

### 2.14 M0-a-04 — S6 — COMPOUNDS ("a-04/a-05 … COMPOUNDS (d,e)")

Last landed S5 (`check/M0-a-04-close-s5`, notes :161). No queue row routed (L1 "M0-a-04 (M1)" is outside this seat's
Q-row scope).

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| N-c5-1 (F1g: WEDGE_S cannot tell sub-edge j from j + 1) | STILL-OPEN | a placement case whose exact position's nearest sub-edge end differs between j and j + 1 (kills F1g) | notes:165 |
| N-c5-2 (CM3: `carriesRow` boundary at vertex slot 0) | STILL-OPEN | a row on vertex slot 0 answers true without throwing (kills CM3) | notes:166 |
| N-c5-3 (N-13's scanner misses contrived shapes) | NOTE (KI, N-45: deliberate-writer shapes absent from the five sources) | — | notes:167 |
| N-c5-4 (C-0373 misstates attractVertex's E_LEVEL count: 459 / 10 000, not 0) | STILL-OPEN (record text) | the next choices row restates the family's figure | notes:168 |

### 2.15 M0-a-13 — S2 — MIXED ("a-13 … MIXED"; the rows sit on the warp's placement, the contract M3a's warp kernels consume)

Last landed S1 (notes :215).

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| N-s1c-1 (`placeOnRoute` charges before test (i)) | STILL-OPEN | the probe (shore, way:1 dragged −1 990 cm, way:2 foot outside) as a case (kills W4e) | notes:223 |
| N-s1c-2 (the band's attractCm boundary) | STILL-OPEN | a fixture whose qualifying point is exactly 26 cm from P (kills R2attr) | notes:224 |
| N-s1c-3 (`<=` at the hot-pixel boundary) | NOTE (equivalent below len² ≈ 2³⁸ by the lattice argument); retitle the test | — | notes:225 |

### 2.16 M0-a-02 — S4 — COMPOUNDS ("a-02 … COMPOUNDS (c,d)")

Last landed S3 (notes :189). Queue routing: Q76 "M0-a-02 (arena/resolve.ts) or M0-a-06 (tx/savepoint.ts) — the
session assigns it"; Q79 "the session (design), then M0-s-02 (tables) and M0-a-06 (the hook)"; Q74 RQ2 "the registry
role `shape` (M0-a-01 / M0-a-02's registry file)".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| N-s3c-2 (free-list pins vertex slots only) | STILL-OPEN | a capacity-1 table per kind; assert each free-list branch does not grow it (kills B7, B8 alone) | notes:197 |
| N-s3c-1 (support.ts header vs the tree) | STILL-OPEN (comment) | restate the header; the tx comparison compares the generator with itself | notes:196 |
| Q76 / L16 (stale stamp after compactSlots / load) | RULING R10 (§4) | — | queue:90; checks/M0-a-15-notes.md:294 (probe P16) |
| Q79 + Q74 RQ2 (the `shape` role) | RULING RL4 (§4) | — | queue:93, :88; [SRC] kernel/src/arena/roles.json has no `shape` |

### 2.17 M0-a-11 — S6 — COMPOUNDS ("a-11 … COMPOUNDS (b)")

Last landed S5. Queue routing: Q67 "M0-a-11's hardening round with Q63 and Q73"; J637 "a-11 S6 (Q67 (B); RL5)".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q67 (A) (the pre-clean criterion) | DONE-BY a-11 S3–S5 (pinned, `spur.test.ts`) | — | checks/M0-a-11-notes.md:271, :313 |
| Q67 (B) (contract angle 1° for spine and regions; roof keeps 5°) | RULING RL5 (§4), then STILL-OPEN | measure the [1°, 5°) validator pass rate first; then the contract change with a declared shift | queue:81; [SRC] kernel/src/skeleton/prepare.ts:219, :273 (`sharpCorner`) |

### 2.18 M0-c-05 — S3 — COMPOUNDS ("c-04/c-05 … COMPOUNDS (b)")

Last landed S2 (notes :347). Queue routing: Q98 "before M0-b-05a's wave (AFTER-M-1): c-05's prune.test.ts derives its
expectation from regimes.json"; Q149 "M0-c-05's next round"; Q150 "M0-c-04 / M0-c-05's next round (a design question;
M1 if the frame is the cause)"; Q129 (S5c's share) after the re-profile.

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q98 (literal 3 000 cm) | STILL-OPEN | derive from `regimes.json` (`pair('dense_core', 'blockDepthFloorM')[0] × 100`); the test is its own pin | [SRC] layout/test/growth/s5cd/prune.test.ts:83; queue:112 |
| Q149 (no secondary street at flat 2, 3, 6 on 900 / 30 ha) | STILL-OPEN (judgment line) | judge growth defect vs frame-size effect vs expected; a pin of the verdict either way | queue:163; checks/integration-g15.md N-2 |
| Q150 (S5c / S5d draw at few seeds of a small frame) | RULING R13 (§4) | — | queue:164 |
| N-s2c-1, N-s2c-2 (Z21b, Z19 survivors) | NOTE (equivalent by stated evidence) | — | notes:354–355 |
| N-s2c-3 (NO-SHIFT not re-measured byte for byte) | NOTE | — | notes:356 |
| N-s2c-4 (refusals met; the relief-60 S5 one is Q88's) | NOTE (routed; Q88 in c-02 S6 / c-04 S5) | — | notes:357 |

### 2.19 M0-c-03 — S5 — COMPOUNDS ("c-03 … COMPOUNDS (a)")

Last landed S4 (`checks/M0-c-03-s4.md` §3 "None"; the S3 check's rows notes :405–413 are the latest open). Queue:
Q122 "S4's 4 into c-03's next" (today 1 seed in each relief-3000 configuration).

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q122 S4 share (relief-3000 default + coarse seed 109: "S4: the spines' batch was refused (E_INVARIANT: (way, way:13) branches …); on the lattice courses too") | STILL-OPEN (waits on a-05 S14: the message is the router-retrace family of Q62 R-12, spec LINE 5) | re-derive seed 109 on S14's head; if it still refuses, MAKE-IT-SUCCEED in backbone with the seed pinned | [SRC] summaries/M0-e-06.json groups[2], [3] refusals S4 seeds [109]; queue:136 |
| N-c3-1 (spur cut's side guard, QA1g) | STILL-OPEN | a spur whose shortcut meets the plaza's / wall's side keeps the spur | notes:412 |
| N-c3-2 (`partLeavesWall` excuses a segment along the gate's own wall edge) | STILL-OPEN [NOTES] — UNVERIFIED whether S4's B-N1 fix closed it (S4 pinned B-N2's guard, notes :448–453); the round re-reads first | narrow the excuse to the gate's point; pin with B-N1's seed | notes:413; [SRC] layout/src/backbone/stage.ts:141, :202 |

### 2.20 M0-c-01 — S4 — ISOLATED ("c-01 … ISOLATED (stand-in; evidence keyed to it)"); its Q99 line is a contract seam (the registered table view), so the round is kept

Last landed S3 (`checks/M0-c-01-s3.md` §3 none). Queue routing: Q99 "c-01 S4's fixtures/flat.ts:43 line remains";
Q122 "S3's 32 + 13 into … else c-01 / c-02's next round"; e-06 note 24 "S3 ×25 per configuration to c-01 / c-02".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q99 c-01 line | STILL-OPEN | `flatFixture`'s default view = the registered one (or the caller must pass it); pin: a bare `flatFixture` reads `REGISTERED.hash` | [SRC] layout/src/fixtures/flat.ts:43 `opts.tables ?? tableView()`; queue:113 |
| Q122 S3 share (relief-60 E_SELF_INTERSECT 32 / 200; relief-3000 E_DEGENERATE `empty` 25) | STILL-OPEN only for what c-02 S6 REPORTS as the siting's share (c-02 S6 owns the class first) | — | queue:136; checks/M0-e-06-notes.md:387 |
| N-s2c-1 (M9 / M10: the deck re-solve's unserved branch) | DEFER-CANDIDATE (ISOLATED; the stand-in is replaced by S3 at M1) | — | notes:339, :377 |
| Q130 (S4 cost; routed to "M0-c-01's lane") | NOTE (after the re-profile; D-18) | — | queue:144 |

### 2.21 M0-c-07 — S1 — "ISOLATED / MIXED for the table cells": the recalibration path writes table cells, so rows on the gate's verdict and the recalibration are its contract part

Last landed `check/M0-c-07-close-r1` (PASS; notes :1–17 are the first check's rows, none fixed since).

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| notes 4 (`statisticsMiss` counts `run`: `--recalibrate` on unplaced hoods) | STILL-OPEN (contract part: a table write) | an entry test: a hood that does not fit, statistics holding, `--recalibrate` ⇒ exit 2, NO_MISS (kills E04) | notes:10 |
| notes 1 (a `reported` target row with n 0 on a gating cell) | STILL-OPEN (the gate's verdict) | plant it on `sgd.tShare/all`; the run fails (kills B02) | notes:7 |
| notes 3 (a hood S8 refuses: `run`, exclusion, census class) | STILL-OPEN (the gate's verdict and J264's census) | judge a planted refused HoodRecord (probe P3's shape) (kills C03, C07, D04) | notes:9 |
| notes 2, 5, 9, 10, 11 | DEFER-CANDIDATE (ISOLATED part; M1's B-CITY-lite re-run absorbs) | — | notes:8, :11, :15–17 |
| notes 6, 7 | NOTE (equivalent survivors, stated) | — | notes:12–13 |
| notes 8 (`recalibrate` signature vs the work twin) | NOTE (wording; a spec pass restates) | — | notes:14 |
| Q119 (real-size court figure) | NOTE + R14 (§4): phase a over the 1 000-seed records is a measurement this round can host | — | queue:133 |

### 2.22 M0-b-05 — S2 — MIXED ("b-04/b-05/b-05a/b … MIXED (b)": run items writing table cells)

Last landed S1 (notes :62).

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| N11 (the applied-table line's pass text asserted nowhere) | STILL-OPEN (contract part: the table write) | probe P1's shape in `phase-a.test.ts` (kills X8b) | notes:72 |
| N12 (`tolBand`'s guard reach) | STILL-OPEN (contract part: the band's verdict) | narrow the doc to duplicates, or a planted M-1 row reaches the guard | notes:73 |
| N10 (`arcTangency` tolerance unpinned at its own scale) | DEFER-CANDIDATE (the bar's sensitivity, not a table write; M1's run items re-run it) | — | notes:71 |
| N13 (the `replay` clause fails a whole run on a lawful fall-back) | DEFER-CANDIDATE (absorbed by M0-b-05a / b-05b, AFTER-M-1, inside M1 per J558) | — | notes:74 |

### 2.23 M0-b-04 — S4 (optional) — MIXED (b); every open row is off the table-writing part

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| N-9, N-10, N-11 | DEFER-CANDIDATE (harness report lines and an unreached guard; M1's run items absorb) | — | notes:101–103 |
| N-12 | NOTE (equivalent survivors) | — | notes:104 |
| N-13 | NOTE (session: a disclosed `git show`) | — | notes:105 |

### 2.24 M0-x-06 — S2 — ISOLATED ("e-06, f-01, f-02a/b, x-05, x-06, k-01..k-04, k-06/k-07, t-00 … ISOLATED")

Last landed S1 (`check/M0-x-06-close-s1`, notes :210). Queue routing: Q148 "M0-x-06's next round (S2)".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q148 summary rewrite (`totals.lawfulRefusals` 35 → the S1 census's 0) | STILL-OPEN (recommended: the committed summary misstates a J264 (4) exit-bar figure) | re-write `summaries/M0-x-06.json` to the S1 census | [SRC] plat/docs/build/summaries/M0-x-06.json `totals.lawfulRefusals` 35 (bridge×frame 19, EP-20/M0 3, …) |
| Q148 / s1c-1 (C15) | DEFER-CANDIDATE (equivalent in composition; M1's tiers) — cheap, may ride | `kindLaidProblem(sq, degenerateRing(sq, 'zero-area'))` under 'collinear' | notes:219 |
| Q148 / s1c-2 (C11, C11c) | DEFER-CANDIDATE — may ride | a unit pin of the driver's default insert against `insertDefault` | notes:220 |
| Q148 / s1c-5 (bridge × frame meets a span on 2 of 100) | DEFER-CANDIDATE (M4 named by the checker) | — | notes:223 |
| s1c-3 | NOTE (equivalent, confirmed) | — | notes:221 |
| s1c-4 | see M0-k-06 (Q147) | — | notes:222 |
| Q146 (nightly per-seed hang attribution) | routed to M0-f-02b — see 2.27 | — | queue:160 |

### 2.25 M0-x-05 — S3 — ISOLATED

Last landed S2 (`check/M0-x-05-close-s2`, notes :146, CONFIRM-ONLY; the S1 check's rows :101–111 stand). Queue
routing: Q116 "RULED J552 … x-05's next hardening round, tests only"; Q87 "M0-x-05".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q116 / S1c-2 (§5.2's V13 / V14 classes; the repeated F-SITE key) | STILL-OPEN (ruled J552; tests only) | the three V13 classes and F-SITE†V14 listed by name with their milestones; DESIGN_5_2 updated | [SRC] testkit/src/ladders/table.ts:21, :28 (no F-WORLD / F-GW / F-PLACE); queue:130 |
| Q87 x-05 copy | STILL-OPEN (one line) | `generated()` → `generatedLifecycle(0)` | [SRC] testkit/src/ladders/support.ts:140–141 |
| S1c-1 (CK03 court forced) | DEFER-CANDIDATE (equivalent in practice; M1's tiers) | fault-injection pin via a `tryOn` seam | notes:108 |
| S1c-3 (bugs fold reaches chain runs only) | DEFER-CANDIDATE (M4 named) — or a choices row stating the scope | — | notes:110 |
| S1c-4 | see M0-k-06 (Q147) | — | notes:111 |

### 2.26 M0-e-06 — S4 — ISOLATED

Last landed S3 (`check/M0-e-06-close-s3`, notes :378). Queue routing: Q137 "→ M0-e-06 S4 (with Q118's reader line if
f-03b has not taken it)"; J648: "e-06 S4 = the batched summary re-run after the last stage round on the site spike's
path".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q137 (`scopeDigest` moves on a citation renumber) | STILL-OPEN (recommended: it turns a pin red at landings) | normalise `L-\d{4}` / `C-\d{4}` / `N-\d+` tokens before hashing; pins: a renumbered copy keeps the digest, a code edit moves it; re-record once | [SRC] plat/bench/src/site/anchor.ts:69–75 hashes raw bytes; queue:151 |
| The batched summary re-run (Q122's re-measure) | STILL-OPEN (waits on c-02 S6 and c-04 S5) | regenerate the 200-seed summary on the head carrying both | queue:136 |
| note 25 (a class keeps one message) | STILL-OPEN (recommended; the owners route by message) | each distinct text with its seeds | notes:388 |
| note 22 (`fold.test.ts` key) | DEFER-CANDIDATE (killed twice by digest and summary; M1's tiers) | — | notes:385 |
| note 23 (attribution not bisected) | NOTE | — | notes:386 |
| note 24 (E_DEGENERATE classes confirmed) | NOTE (routed to c-01 / c-02, c-04) | — | notes:387 |

### 2.27 M0-f-02a S2 + M0-f-02b S1 — ONE MERGED ROUND (the f-02a / f-02b precedent; Q94 spans both owns) — ISOLATED

Last landed: f-02a S1 (`check/M0-f-02a-close-s1`, notes :87); f-02b `check/M0-f-02b-close-r2` (notes :19–24). Queue
routing: Q94 "f-02b S1 still takes the argv half and REPORTS the test half to f-02a (or the session merges the two in one
child)"; Q151 "M0-f-02a's next round … the row waits for f-02a's round without holding M0's exit (J567)"; Q146
"M0-f-02b's nightly"; Q49 "the whole receipts in f-02b S1 after the amendment's rounds 1–4".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q94 (argv half + test half) | STILL-OPEN | `fuzzUnits` appends `--no-ladders --no-s11` after `--no-summary`; manifest.test.ts:97 expects them | [SRC] bench/src/tier-jobs/index.ts:72; bench/test/tiers/manifest.test.ts:97; queue:108 |
| Q151 (`--fallback` accepted on nightly / milestone) | STILL-OPEN (fail-safe today; ISOLATED) | refuse `--fallback` outside tier:pr (exit 64 with the usage); pin per tier | [SRC] bench/src/tiers/index.ts:5, :11, :37; queue:165 |
| Q146 (no per-seed hang attribution) | STILL-OPEN (ISOLATED) | a per-seed start marker in the edge replay (`edgeHangs`) | queue:160; f-02b notes:15 (N-6) |
| Q49 (whole receipts) | STILL-OPEN, NOT this round's (waits on the amendment's rounds 1–4: S8 ≤ 10 s) | a session receipt run after round 4 | queue:63 |
| f-02b N-1, N-3 | DEFER-CANDIDATE (ISOLATED; M1's tiers) — cheap riders | exit 1 on a failing verdict; the test map with all three tiers | f-02b notes:10, :12 |
| f-02b N-2, N-4, N-5, N-7, N-8 | DEFER-CANDIDATE (informative figures; M1's tiers) | — | f-02b notes:11, :13, :14, :16, :17 |
| f-02b N-9 | NOTE (M0-t-01 takes the new digests) | — | f-02b notes:23 |
| f-02b N-10 | NOTE (= Q49) | — | f-02b notes:24 |
| f-02a N-9, N-10 | DEFER-CANDIDATE (test-seam fidelity; M1) | — | f-02a notes:93–94 |
| f-02a N-11 (whole-wave landed:verify FAIL on tier-jobs/index.ts) | NOTE — UNVERIFIED as closed: f-02b has landed since (J695), so the claim should resolve | — | f-02a notes:95 |

### 2.28 M0-k-06 — S2 — ISOLATED

Last landed S1 (notes :115). Queue routing: Q147 "M0-k-06 (an explicit timeout on K6-6 or a smaller scanned set)".

| ref | verdict | fix shape and pin | evidence |
|---|---|---|---|
| Q147 (K6-6 exceeds vitest's 5 s) | STILL-OPEN (recommended now: the one foreign red in every RELATED@1000 since x-04 S1) | an explicit timeout on the case (the scan's measured 5.1–7.3 s × 3) | [SRC] bench/test/scan/scan.test.ts:140 (no timeout argument); queue:161 |
| K6-11, K6-12, N-s1-1 | DEFER-CANDIDATE (layouts no source uses; M1's k-07 crossing) | — | notes:123–124, :112 |

### 2.29 Optional QUEUE-ROW-SUFFICES items (ISOLATED or off the contract part; every row DEFER or NOTE)

| item (class) | last landed | rows | verdicts |
|---|---|---|---|
| M0-d-09 (ISOLATED, tools) | S2 (notes :276) | 14 (K4: `lawfulHandOn`'s kind check), 15 (K13: count-only kept reference), 16 (a disclosed `ls`) | 14, 15 DEFER-CANDIDATE (M1's B-CITY re-run, SCOPE:161); 16 NOTE (session rule wording) — notes:284, :292, :298 |
| M0-d-08 (ISOLATED) | S1 (notes :79) | N-14, N-15 (S-N4d, S-N4f), N-16 (equivalents), N-17 (inherited census), N-18 (disclosure) | N-14, N-15 DEFER-CANDIDATE (M1 pool 0–3); N-16–N-18 NOTE — notes:87–91 |
| M0-k-04 (ISOLATED) | S1 (notes :106) | N-21 (N9c), N-22 (N1e) | DEFER-CANDIDATE (M1 tiers) — notes:115–116 |
| M0-k-05 (MIXED (b): metricVersion) | S1 (notes :106) | N-s1-1, N-s1-2 (routed to k-06 / k-07, b-05b / c-07b), N-s1-3 (X06), N-s1-4 (folder named like the report: exit 1 not 2) | N-s1-1, N-s1-2 DEFER-CANDIDATE (AFTER-M-1 items inside M1); N-s1-3 DEFER-CANDIDATE (the entry, not metricVersion); N-s1-4 NOTE (KI, N-45: non-zero either way) — notes:103–104, :114–115 |
| M0-b-04 (MIXED (b)) | S3 | see 2.23 | — |

### 2.30 Items with open rows but NO round proposed

| item | rows | verdict |
|---|---|---|
| M0-a-10 (MIXED) | none of its own (S2 check: none); Q78 is routed to a-06 | its share is a rider of round 4 (2.12) |
| M0-a-07 (MIXED) | Q71 (every cut images the whole arena as a savepoint) | NOTE: absorbed by M0-a-06 S9 LINE 1 (opSave / rollback in `faces/common.ts` re-seated on the undo log, specs.json a-06 S9) — close Q71 at S9's landing |
| M0-d-04 (COMPOUNDS) | Q95's tail ("d-04's F1 re-read may be narrowed in a later d-04 touch") | NOTE: optional, after a-06 S10 lists the re-parented children |
| M0-s-02 (COMPOUNDS) | Q79's tables side | waits on RL4 (§4); a round only if the `shape` role enters M0's tables |

### 2.31 In flight — NOT planned here (their open rows, for the record)

| item | in flight | open rows not carried by the in-flight round |
|---|---|---|
| M0-a-06 | S8 (landing soon), S9 specced | J637's a-06 S10: Q78 (faceNeighbours between allocation and free), Q95 (relevel lists re-parented children, relevel.ts:1025), Q76's tx side (R10); Q125 closes at S9's landing |
| M0-c-02 | S6 (Q131, Q132, Q87 water.ts:358, Q122 S3, Q88 / Q46 F-WALL, RL2's proof) | Q135 (b) (RL15), Q129 S5a cost (after the re-profile) |
| M0-c-04 | S5 (Q122 S5, Q88 growth part) | Q150 (with c-05, R13), Q129 S5c cost |
| M0-t-00 | S1 (Q72; RL10) | — |

### 2.32 Session rows (no item round)

| ref | verdict | evidence |
|---|---|---|
| Q51 (API.md Appendix B four names behind) | STILL-OPEN (session documentation pass) — best AFTER a-06 S9, whose undo log may add tx exports | [SRC] kernel/test/num/api-surface.test.ts:49–51 (`AFTER_APPENDIX_B` holds restoreGeneration, restoreSavepoint, takeSavepoint, Savepoint); queue:65 |
| Q72 | in t-00 S1 (in flight) | queue:86 |
| Q129, Q130, Q128's budget | NOTE (D-18, after the Mac; J618) | queue:142–144 |

## 3. Waves — the order of launch

Groups that can run in parallel: no two rounds inside a group share an owned file or a file their lines touch, and
each group's entry condition is the landing named. Most valuable for the M0 exit first inside each group. The width
ceiling is twelve seats per five-hour window (J373); today about five are busy (a-06 S8's check, c-02 S6, c-04 S5,
the g15 re-check, t-00 S1), so wave 1 is seven children.

**Wave 1 — NOW (touches nothing in flight).**
1. M0-c-06 S1 (small) — first: it must land before a-09 S18 co-edits the fusion harness (J637), and its per-stage work
   blocks are f-03b's re-fit input.
2. M0-a-16 S4 + M0-a-15 S2 (small; merged per RL9) — COMPOUNDS, and the a-16 public-API rows (R9) sit on M1's gate.
3. M0-e-04 S5 (small) — COMPOUNDS; R11 rules its one shape line at the spec.
4. M0-e-03 S4 + M0-e-02 S2 + M0-e-01 S2 (medium; merged) — COMPOUNDS; carries the S1 lawful refusal (seed 184).
5. M0-d-05a S2 + M0-m-01 S2 (small; merged) — COMPOUNDS.
6. M0-k-06 S2 (small, QRS) — one line; removes the one foreign red of every RELATED@1000 run since x-04 S1.
7. M0-c-07 S1 (small) — its three contract-part pins.

**Wave 2 — as each landing frees it (a-06 S9 may run beside it: its scope is faces/common.ts, index/spatial.ts,
arena/write.ts, none touched here).**
- On a-06 S8's landing: M0-x-02 S4 + M0-x-04 S3 (medium; after RL3), M0-a-04 S6 (small), M0-a-13 S2 (small).
- On c-04 S5's landing: M0-c-05 S3 (small; R13 at its spec).
- On c-02 S6's landing: M0-c-01 S4 (small); and, on both c-02 S6 and c-04 S5: M0-e-06 S4 (small, QRS; the summary re-run).
- On t-00 S1's landing: M0-f-02a S2 + M0-f-02b S1 (small, QRS).
- Any time in this wave: M0-x-06 S2 (small, QRS; keep clear of repins.test.ts while c-02 S6 runs), M0-x-05 S3 (small,
  QRS), M0-b-05 S2 (small).

**Wave 3 — on a-06 S9's landing.** M0-a-09 S18 (CHAIN; large; needs c-06 S1 landed), M0-a-02 S4 (small; after R10 and
RL4), M0-a-11 S6 (medium; after RL5). The session's Q51 appendix pass fits here (a-06's exports settled).

**Wave 4 — on a-09 S18's landing and the session's re-profile of round 2's tree.** M0-a-05 S14 (CHAIN; large),
M0-b-03 S9 + M0-b-02 S3 (medium; after RL6, RL7 and R06's door), M0-a-03 S2 = the amendment's round 3 (large).

**Wave 5 — on a-05 S14's landing (and, for round 4, on round 3's landing and its re-profile).** M0-a-08 S6 (small;
R12), M0-c-03 S5 (small), and M0-b-03 S10 + M0-b-02 S4 + M0-a-10 S3 = the amendment's round 4 (large). The session
re-measures e-04's buffer-rung cost (N-s4-1) on S14's head.

**Wave 6 — on round 4's landing.** M0-f-03b S2 (large; also needs c-06 S1 and e-06 S4 landed), then the session's whole
tier receipts (Q49) and the D-18 inputs (Q129, Q130).

**Queue rows only (no seat):** M0-d-09, M0-d-08, M0-k-04, M0-k-05, M0-b-04 — one queue row each naming M1 (R15).

The chain keeps its order (a-06 S9 → a-09 S18 → a-05 S14: waves 2/3 → 3 → 4). No group holds two rounds with a
shared file: wave 4's three touch kernel/src/insert (a-05), layout/src/infill (b-03/b-02) and kernel/src/index (a-03);
wave 5's touch kernel/src/arr/{winding,booleans}.ts and test (a-08), layout/src/backbone (c-03) and layout/src/infill
plus geometry (round 4). UNVERIFIED overlaps flagged in §1: a-05 S14 ↔ a-04 S6 (placement.ts) — sequenced, a-04 in
wave 2, S14 in wave 4; f-02 merged ↔ t-00 S1 — sequenced.

## 4. Rulings needed before specs can be written

RL-ids are J637 (3)'s DEFERRED rulings ("to an adversarial review workflow at their rounds", J631 (2) (a)); R-ids are new here. Each is the session's (vetoable) unless marked owner.

| id | question | recommendation | blocks |
|---|---|---|---|
| RL3 | Q39: route S8's batches through the runner's batch door (x-02's door, b-03's call)? | YES: x-02 S4 adds the door (with note 28's classFloor count), b-03 S9 calls it; NO-SHIFT expected (the report is outside every digest); adversarial review per J631 (2) (a) on the door's signature only. | x-02 S4 + x-04 S3 (Q39 line); b-03 S9 (S8 half) |
| RL4 | Q79 / Q74 RQ2: does the 'shape' role enter M0's roles.json now? | DECIDE NOW, before the first golden: ROLE_REGISTRY_VERSION rides in blocks (map row a-02 'COMPOUNDS (c,d)'), so a later append shifts encoded blocks; add the role in a-02 S4 (append-only), the hook in a-06 S10, the §2.2 rule 3 sentence by the session. If the session finds no M0 producer, record the carry with J238 (1)'s proof instead. | a-02 S4 (Q79); a-06 S10's hook; s-02 if tables |
| RL5 | Q67 (B): the skeleton contract angle 1 deg for spine and regions (roof keeps 5 deg)? | Measure first in a-11 S6 (the [1, 5) deg validator pass rate on the corpus and the 1 000-seed faces); adopt only if the validator passes every face it admits; a declared shift; owner-vetoable as RQ7 says. | a-11 S6 |
| RL6 | Q102 / Q117 (i): who owns the kerb-in-two-parts class (fusion 25, integrated 38)? | Re-measure on a-09 S18's derived kerb; if the seedless part survives, b-03 S9 owns it (a seed per kerb component, or the part courted), a-09 only if the derived kerb itself splits. | b-03 S9 (Q102 / Q117 (i)) |
| RL7 | Q108: a per-portal reach on KerbPortal (an exported type, J263 Q1)? | YES as an OPTIONAL field (additive, existing callers unchanged), defaulting to today's gap; reviewed with the b-03 S9 + b-02 S3 spec. | b-02 S3 (Q108) |
| RL13 | L26: a structured field on the kernel's refusal naming the refused body (e-03's regex over the message)? | YES, additive, in an a-05 round after S14 (insert/ is busy until then); e-03 reads it in its following touch. Not a blocker for e-03 S4. | none now (a later a-05 round, then e-03) |
| RL14 | Q111: build a-09's kernel export for replay classing? | NO unless c-06 S1 / the round-2 measurement shows a replay it cannot class; close Q111 at a-09 S18's landing otherwise. | a-09 S18's spec |
| RL15 | Q135: which seam removes the always-rejected planning batch? | (a) a read-only split plan from the kernel (the checker's cleanest seam), in an a-05 round after S14; until then the receipts keep counting it as the named class. | a later a-05 round (Q135) |
| R9 | Q145: export refuseNotBuilt and widen Milestone with M4b, M5, M6-E? | YES in a-16 S4 as one of 'a-16's public-API rows' (J558's order lists them before M1): the design's milestone list is the contract the edge table reads; the alternative (a lawful local stub) keeps two texts in step by a word-for-word pin. | a-16 S4's Q145 line (owner-facing: one of 'a-16's two public-API rows', J558) |
| R10 | Q76 / L16: a stale stamp reads current after compactSlots / load; arena identity (a-02) or a generation bump (a-06)? | The generation (a-06's restore generation, which Q28 / Q33 / Q38 / Q34 already key stamps on): compactSlots and load move it; no chunk-header change. Build in a-06 S10, pin in a-02 S4 (probe P16 red). | a-02 S4 (pin), a-06 S10 (build) |
| R11 | Q143 N-s4c-3: the shape of the buffer rung's sign on a bare runS6 (exports frozen)? | W_PERIMETER_BUFFER on runS6's KernelResult.warnings (no type or export change), as the pipeline already reports it. | e-04 S5's N-s4c-3 line |
| R12 | The overlay's B2 sliver (integrated 253, 476; 106-108 cm vs 104): a-08 fix or KI? | Measure at a-05 S14's landing; if it survives, FIX in a-08 S6 (J264: a lawful-input refusal is a defect even when e-04's 10-18 s buffer rung absorbs it). | a-08 S6's B2 line |
| R13 | Q150: should S5c / S5d draw at every seed of a small frame? | c-05 S3 sweeps frame sizes; if the draws vanish only below a stated frame size, CARRY to M1 with J238 (1)'s proof (the frame is the cause); else FIX. | c-05 S3's Q150 line |
| R14 | Q119: when is c-07's phase a run at real size (court share per band)? | With round 2's s8s9 re-run over the chunk records (they stay until round 2 takes its seeds, J636); b-03's court rule is judged in b-03 S10 or later, never by re-tuning the band table. | b-03's Q119 (none of the proposed rounds) |
| R15 | Ratify the DEFER-CANDIDATE list (plan.json deferCandidates) as queue rows with M1 as the absorbing milestone (J567: ISOLATED pieces take a queue row). | RATIFY; one queue row per item listing its refs and 'M1'. | the queue rows of the QRS items |

Already ruled and only to be applied (no ruling needed): RL1 (notBuilt #2 → a-05 S14), RL2 (F-WALL carry, c-02 S6), RL8 (Q99 per-owner lines), RL9 (Q75 merged round), RL10 (Q72), RL11 (Q90 re-measure; Q93 FIX), RL12 (Q131), J552 (Q116), J674 (Q139).


## 5. Queue hygiene — stale statuses, with evidence

For the managing seat to close (whole rows) or trim (the done part noted, the rest left open). This seat edited nothing.

| row | evidence |
|---|---|
| Q52 | status opens OPEN, ends 'DONE (J700, THE FORTY-FIFTH LANDING bffe7ad2 + the seam 8920ebf8)' (queue:66) |
| Q58 | a-09's part DONE 9f631a41 (J532); partner draw 1 524 landed 131ed5ae (J678) (queue:72) |
| Q59 | draw 7644 commits (a-09 S14, 9f631a41); the class moved to Q104, DONE 131ed5ae (queue:73, :118) |
| Q86 | DONE J686; [SRC] layout/src/districts/types.ts:4 imports QuarterNode from @plat/model (queue:100) |
| Q97 | OPEN -> DONE (J693, a-08 S5) (queue:111) |
| Q104 | OPEN -> ... DONE 131ed5ae (J678) (queue:118) |
| Q105 | forms (3)-(5), (1') built in a-05 S12 131ed5ae; (1'') in S13; (1'), (2) KEPT with J238 (1)'s proof C-0456 (3) (checks/M0-a-05-s13.md:120-122) (queue:119) |
| Q106 | both halves DONE (J693, J700); [SRC] testkit/test/edge/repins.test.ts:156-157 (queue:120) |
| Q112 | DONE 131ed5ae (J678) (queue:126) |
| Q113 | DONE (J700, x-06 S1) (queue:127) |
| Q133 | status opens DIAGNOSED, ends DONE (J686, 25a5cde0, e-04 S4) (queue:147) |
| Q138 | DONE by x-04 S2 e0e45b7c; [SRC] layout/test/pipeline/base/run.test.ts:212-215; checks/M0-x-04-s2.md:26 (queue:152) |
| Q140 | status opens RULED, ends DONE (J700, L-0731) (queue:154) |
| Q144 | status opens OPEN, ends DONE (J717) (queue:158) |
| Q74 (trim) | RQ1 fixture DONE (a-08 S5); x-06 RQ3 pin flip DONE (Q106); isOpenTx exported [SRC] kernel/src/tx/state.ts:91 and used [SRC] facade/kernel.ts:170; only RQ2's shape role remains = Q79 (queue:88) |
| Q75 (trim) | the isOpenTx half DONE [SRC] facade/kernel.ts:170 (a-16 S3); the REFUSED row + encode.ts:113 remain (queue:89) |
| Q67 (trim) | (A) DONE and pinned (a-11 notes :271, :313); only (B) remains (queue:81) |
| Q87 (trim) | b-03 (S7) and x-06 (J700) copies DONE; remaining: e-01 heightfield.ts:41, c-02 water.ts:358 (in c-02 S6), x-05 support.ts:140 (queue:101) |
| Q99 (trim) | x-02 S3, e-04 S4 and x-04 S2 lines DONE (x-04 S2 LANDED 2026-11-02, the status still says LAUNCHED); only c-01's fixtures/flat.ts:43 remains (queue:113) |
| Q122 (trim) | S6 class CLOSED (J686); S3 -> c-02 S6 (in flight), S5 -> c-04 S5 (in flight), S4 seed 109 -> c-03 S5 after a-05 S14, S1 seed 184 -> e-03 S4 (queue:136) |
| Q92 (premise) | (b)'s blocker 'bench/src/fusion/index.ts is M0-c-06's empty scaffold' is gone: c-06 landed (J554) (queue:106) |
| Q71 / Q125 (close at landing) | a-06 S9's LINE 1 re-seats opSave / rollback on the undo log (specs.json a-06 S9); close both at S9's landing (queue:85, :139) |

Out of this seat's scope but seen in passing (UNVERIFIED, not judged): several lower-severity L rows read as done or superseded — L18 (= Q97's ask, done by a-08 S5), L19 (= Q77, in a-05 S14 LINE 4 for stretch.ts; a-01's own half closed in a-01 S1), L21 (a-09 S14 pinned the long edges; its measurement rode c-06's fourth continuation), L16 (= Q76). The managing seat may want an L-row pass.


## 6. Counts

- Proposed entries: 32 — 27 rounds with lines (2 of them the CHAIN rounds a-09 S18 and a-05 S14, already planned) and 5 queue-row-only entries (d-09, d-08, k-04, k-05, b-04).
- REQUIRED-FOR-M0-EXIT: 22 rounds (19 by their map class — COMPOUNDS, or MIXED with the rows on the contract part (a-13, c-07, b-05) — plus a-03 S2 by J618 991 (e), c-06 S1 by its dependency (f-03b's input), c-01 S4 by its Q99 contract seam); QUEUE-ROW-SUFFICES: 5 rounds with lines (x-06, x-05, e-06, f-02a + f-02b, k-06 — each recommended for a stated reason) + 5 queue-row-only.
- Merges: 7 (a-16 + a-15; x-02 + x-04; e-03 + e-02 + e-01; d-05a + m-01; b-03 + b-02 for S9 / S3; b-03 + b-02 + a-10 for round 4; f-02a + f-02b).
- Sizes of the rounds with lines: small 18, medium 4, large 5 (the large: a-09 S18, a-05 S14, f-03b S2, a-03 S2 = round 3, round 4).
- Row verdicts counted in plan.json (per round): lines (STILL-OPEN, ruling-gated lines included) 92; DONE-BY 14; DEFER-CANDIDATE 45; NOTE 46; awaiting a ruling 16 (overlaps the lines).
- Rulings needed: 15 (8 deferred by J637, 7 new). Stale or trimmable queue rows: 22 (14 whole rows, 8 trims / closes-at-landing).
- Check tiers: heavier-judgment seats for the kernel / model / layout / site rounds (a-09, a-05, a-16+a-15, a-03, a-08, a-04, a-13, a-02, a-11, d-05a+m-01, x-02+x-04, e-04, e-03+e-02+e-01, b-03+b-02 ×2, c-05, c-03, c-01); lighter seats for the bench / testkit / tools rounds (c-06, c-07, f-03b, b-05, x-06, x-05, e-06, f-02a+f-02b, k-06). f-03b ships a table (tables/data/workLimits.json): a lighter seat by package, but its declared table shift merits the heavier one — the session's call.
- UNVERIFIED (flagged in §2 / §1): b-03 S7-2 and S7-3 judged from the notes row only; c-03 N-c3-2 possibly closed by S4's B-N1 fix; a-15 N-s1c-6's renumber; f-02a N-11 resolved by f-02b's landing; the a-05 S14 ↔ a-04 placement.ts and f-02 ↔ t-00 S1 file overlaps; which a-10 function round 4 touches; RL5's cross-item scope for a-11 S6.

