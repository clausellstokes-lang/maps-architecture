# M0 hardening inventory (J237 (1); lane `session/hardening-inventory-1`, 2026-10-14)

The M0 hardening phase's triage: every M0 row of `docs/KNOWN-ISSUES.md` and every row of every `plat/docs/build/checks/M0-*-notes.md`, each classed once —
DONE / FIX-NOW / CARRY-FORWARD / DUPLICATE / ROUTED-TO-CENSUS / NOTE (the brief `workflows/lane-prompts/session-seats/hardening-inventory-1.md`).
Reconciled with `docs/M0-FIX-QUEUE.md` (the queue row is the home wherever one exists) and with the refusal census L23 (lane `session/refusal-census-1`;
refusal classes are routed there by N-58's words, not re-judged here). Read as files only; no git command, no test run (no class needed one).

## §0 The tree and the counts

* Tree: `.git/HEAD` = `ref: refs/heads/main`; `.git/refs/heads/main` = `6cc9b85a206bcc8c77313515eced6d1be3addf71` (read 2026-10-13 23:57 UTC).
* Date: 2026-10-13 23:57 – 2026-10-14 UTC. Machine: `linux:Intel(R) Xeon(R) Processor @ 2.80GHz:4cpu:16gib` (`python3 tools/machine_profile.py --id`); Node 24.12.0.
* Read first: PROGRESS J237, J238, J264, J290, J351–J354; M0-spec-notes N-45, N-56 §7, N-58; M0-FIX-QUEUE.md whole (Q1–Q64, L1–L32); M0.md §3; M0-work.json (owns).
* What a "row" is here. The brief's count (~494) is below the tree's: the 53 files hold **1 494 table rows** (every `| id |` line under a header,
  including the old→new file maps and mutant tables), plus **377 numbered notes** (`N. **…**` items, the only form some files use: a-09, c-02, d-06,
  d-09, x-05 …) and **51 bold note paragraphs** (`**N-c1-…**`). All 1 922 are classed, one line each — a skipped note would be a defect of this
  inventory, so the file exceeds the ~600-line target (§5 Q1).
* KI rows: 13 (KI-1 … KI-13; KI-4 sits below KI-13 in the file).

Rows per class (notes; all items / table rows only):

| class | all items | table rows | KI rows |
|---|---|---|---|
| DONE | 123 | 92 | 0 |
| FIX-NOW | 512 | 248 | 2 |
| CARRY-FORWARD | 40 | 22 | 6 |
| DUPLICATE | 138 | 106 | 2 |
| ROUTED-TO-CENSUS | 78 | 60 | 3 |
| NOTE | 1031 | 966 | 0 |
| total | 1922 | 1494 | 13 |

Rows per file (all items; table rows in brackets; classes D=DONE F=FIX-NOW C=CARRY-FORWARD U=DUPLICATE R=ROUTED-TO-CENSUS N=NOTE):

| file | items (table) | D | F | C | U | R | N |
|---|---|---|---|---|---|---|---|
| M0-a-01 | 123 (119) | 13 | 3 | 0 | 2 | 0 | 105 |
| M0-a-02 | 51 (51) | 9 | 4 | 0 | 3 | 0 | 35 |
| M0-a-03 | 47 (47) | 2 | 4 | 0 | 1 | 0 | 40 |
| M0-a-04 | 32 (32) | 5 | 5 | 0 | 2 | 0 | 20 |
| M0-a-05 | 115 (115) | 5 | 23 | 1 | 14 | 5 | 67 |
| M0-a-06 | 119 (119) | 21 | 14 | 0 | 9 | 6 | 69 |
| M0-a-07 | 6 (6) | 0 | 4 | 1 | 0 | 0 | 1 |
| M0-a-08 | 60 (20) | 3 | 15 | 0 | 6 | 5 | 31 |
| M0-a-09 | 34 (0) | 5 | 19 | 3 | 0 | 2 | 5 |
| M0-a-10 | 15 (15) | 0 | 5 | 1 | 1 | 1 | 7 |
| M0-a-11 | 43 (43) | 1 | 0 | 1 | 1 | 2 | 38 |
| M0-a-12 | 25 (25) | 0 | 0 | 0 | 0 | 0 | 25 |
| M0-a-13 | 47 (35) | 2 | 13 | 1 | 1 | 0 | 30 |
| M0-a-14 | 46 (22) | 0 | 20 | 3 | 2 | 1 | 20 |
| M0-a-15 | 28 (9) | 2 | 14 | 0 | 2 | 0 | 10 |
| M0-a-16 | 47 (29) | 3 | 15 | 0 | 0 | 0 | 29 |
| M0-b-02 | 11 (3) | 1 | 9 | 0 | 0 | 0 | 1 |
| M0-b-03 | 27 (27) | 3 | 16 | 2 | 2 | 0 | 4 |
| M0-b-04 | 8 (8) | 0 | 6 | 1 | 0 | 0 | 1 |
| M0-b-05 | 9 (9) | 0 | 7 | 1 | 0 | 0 | 1 |
| M0-c-01 | 36 (11) | 3 | 14 | 2 | 1 | 0 | 16 |
| M0-c-02 | 46 (0) | 1 | 23 | 0 | 7 | 4 | 11 |
| M0-c-03 | 56 (36) | 1 | 16 | 0 | 4 | 1 | 34 |
| M0-c-04 | 64 (37) | 1 | 20 | 0 | 6 | 0 | 37 |
| M0-c-05 | 59 (30) | 2 | 18 | 2 | 3 | 2 | 32 |
| M0-d-04 | 35 (8) | 3 | 17 | 2 | 2 | 0 | 11 |
| M0-d-05a | 18 (18) | 2 | 3 | 1 | 0 | 0 | 12 |
| M0-d-05b | 38 (33) | 1 | 6 | 1 | 2 | 0 | 28 |
| M0-d-06 | 9 (0) | 0 | 9 | 0 | 0 | 0 | 0 |
| M0-d-07 | 24 (24) | 1 | 5 | 0 | 8 | 0 | 10 |
| M0-d-08 | 13 (13) | 1 | 11 | 0 | 0 | 0 | 1 |
| M0-d-09 | 10 (0) | 0 | 8 | 2 | 0 | 0 | 0 |
| M0-e-01 | 22 (22) | 0 | 6 | 0 | 2 | 0 | 14 |
| M0-e-02 | 62 (62) | 0 | 8 | 0 | 5 | 0 | 49 |
| M0-e-03 | 98 (80) | 2 | 18 | 1 | 20 | 1 | 56 |
| M0-e-04 | 70 (48) | 1 | 16 | 2 | 7 | 4 | 40 |
| M0-e-05 | 11 (11) | 1 | 9 | 0 | 0 | 0 | 1 |
| M0-e-06 | 16 (16) | 2 | 8 | 4 | 0 | 0 | 2 |
| M0-f-02a | 8 (8) | 1 | 7 | 0 | 0 | 0 | 0 |
| M0-f-03a | 25 (25) | 1 | 8 | 0 | 0 | 0 | 16 |
| M0-k-02 | 6 (6) | 1 | 4 | 0 | 1 | 0 | 0 |
| M0-k-03 | 2 (2) | 0 | 1 | 0 | 0 | 0 | 1 |
| M0-k-04 | 20 (20) | 1 | 17 | 2 | 0 | 0 | 0 |
| M0-k-05 | 3 (3) | 0 | 3 | 0 | 0 | 0 | 0 |
| M0-k-06 | 10 (10) | 0 | 8 | 0 | 0 | 0 | 2 |
| M0-m-01 | 29 (29) | 0 | 2 | 0 | 0 | 0 | 27 |
| M0-s-01 | 31 (31) | 5 | 7 | 1 | 8 | 0 | 10 |
| M0-s-02 | 25 (25) | 0 | 2 | 1 | 3 | 0 | 19 |
| M0-spec | 59 (59) | 15 | 1 | 2 | 6 | 0 | 35 |
| M0-x-02 | 28 (6) | 1 | 16 | 0 | 2 | 0 | 9 |
| M0-x-04 | 11 (11) | 0 | 6 | 1 | 2 | 1 | 1 |
| M0-x-05 | 9 (0) | 0 | 8 | 0 | 1 | 0 | 0 |
| M0-x-06 | 76 (76) | 1 | 11 | 1 | 2 | 43 | 18 |

## §1 The KI rows (docs/KNOWN-ISSUES.md)

- KI-1 | ROUTED-TO-CENSUS | M0-a-05 | insertChain refusals below the caps: N-58 class "lawful-input refusal" (J264) — Q44 is its queue home; census verdict, MAKE-IT-SUCCEED expected | KNOWN-ISSUES.md:19; Q44; L23
- KI-2 | FIX-NOW | session | ARCHITECTURE amendments round: §3.6/§3.7 for N-38, N-40, N-43, N-44, N-46 (Chain classes), §13.1 and C-0177 (14), §16 M4 row for N-45 — one spec-lane amendments round, no code; no pin (text) | KNOWN-ISSUES.md:20; J191–J211
- KI-3 | CARRY-FORWARD | spec lane | consumer contract for a refused mandatory chain — no M0 stage consumes it; M1's spec | KNOWN-ISSUES.md:21; N-46 (6f)
- KI-4 | CARRY-FORWARD | M1 | per-town refusal budget needs real towns to measure — M1's first towns | KNOWN-ISSUES.md:31; N-46 (6g)
- KI-5 | CARRY-FORWARD | M0-a-06 | non-LIFO removal leaves a valid degree-2 split vertex (fail-safe) — drained by M2a's edit log (design not yet built) | KNOWN-ISSUES.md:22; C-0225 (3)
- KI-6 | FIX-NOW | M0-k-03 | polygon-clipping oracle hang (seed 6101): guard the oracle call with a step/time budget that reports the seed as an oracle refusal; pin with register.json oracleHang run under the guard | KNOWN-ISSUES.md:23; L18
- KI-7 | ROUTED-TO-CENSUS | M0-a-08 | insetRing bisection reads an overlay refusal as empty — N-58 class "our own intermediate" refusal; the census verdict (J290) | KNOWN-ISSUES.md:24; N-58
- KI-8 | CARRY-FORWARD | owner | town vocabulary inside @plat/kernel — only for the kernel extraction (owner-gated, not before M1) | KNOWN-ISSUES.md:25
- KI-9 | CARRY-FORWARD | owner | kernel benches load town code via the testkit barrel — testkit/kernel subpath only for the extraction | KNOWN-ISSUES.md:26; J224
- KI-10 | ROUTED-TO-CENSUS | M0-c-02 | 900 ha river × walled S5 refusals — N-58 "lawful-input refusal" (Q40/Q46's class); the census verdict | KNOWN-ISSUES.md:27; Q46
- KI-11 | CARRY-FORWARD | M0-e-04 | S6 district count on small base fixtures (whole-town behaviour; the bar holds on e-04's fixture) — M1's towns | KNOWN-ISSUES.md:28; C-0265
- KI-12 | DUPLICATE | M0-a-09 / M0-b-03 | S8 cost ≈ 158 s per CITY derivation — Q18 is the home (the perf round, first per N-56 §7) | KNOWN-ISSUES.md:29; Q18
- KI-13 | DUPLICATE | M0-a-09 | S8 ≡ S9 exact-0 share — Q19 is the home (Q18's closing check) | KNOWN-ISSUES.md:30; Q19

## §2 The notes rows, per file in order

Format: `<file>:<line> <id> | class | owner | reason / fix shape (pin? where FIX-NOW) | evidence`. FIX-NOW rows that add or change behaviour want a pin unless the reason says "no pin".

### M0-a-01

- M0-a-01:14 test/num/{area2,bfuzz,direction,frame,i… | NOTE | M0-a-01 | R1 old→new file map row (informative) | C-0314
- M0-a-01:15 test/types/types.test.ts | NOTE | M0-a-01 | R1 old→new file map row (informative) | C-0314
- M0-a-01:16 — | NOTE | M0-a-01 | R1 old→new file map row (informative) | C-0314
- M0-a-01:17 — | NOTE | M0-a-01 | R1 old→new file map row (informative) | C-0314
- M0-a-01:18 — | NOTE | M0-a-01 | R1 old→new file map row (informative) | C-0314
- M0-a-01:19 src/num/{index,frame,predicates,snap}.t… | NOTE | M0-a-01 | R1 old→new file map row (informative) | C-0314
- M0-a-01:28 N-1 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:29 N-1 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:30 N-1 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:31 N-1 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:32 N-2 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:33 N-2 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:34 N-2 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:35 N-2 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:36 N-2 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:37 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:38 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:39 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:40 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:41 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:42 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:43 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:44 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:45 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:46 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:47 N-3 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:48 N-4 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:49 N-4 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:50 N-4 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:51 N-4 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:52 N-4 | NOTE | M0-a-01 | copy-table row; each later swap held by copies.ts importsShared ratchet | C-0314; equivalence.test.ts
- M0-a-01:56 N-1 | NOTE | M0-a-01 | equivalence shown for N-1..N-4 (exhaustive windows, fuzz arenas) | C-0314
- M0-a-01:63 N-2 | NOTE | M0-a-01 | equivalence shown for N-1..N-4 (exhaustive windows, fuzz arenas) | C-0314
- M0-a-01:68 N-3 | NOTE | M0-a-01 | equivalence shown for N-1..N-4 (exhaustive windows, fuzz arenas) | C-0314
- M0-a-01:76 N-4 | NOTE | M0-a-01 | equivalence shown for N-1..N-4 (exhaustive windows, fuzz arenas) | C-0314
- M0-a-01:83 N-c1-1 (KI) | DUPLICATE | M0-a-01 | segmentCloserThan exact only to 2^53 (36 km) — home L19 | L19
- M0-a-01:84 N-c1-2 | NOTE | M0-a-01 | process note: a renamed private copy fails the table by design | copies.ts
- M0-a-01:85 N-c1-3 | DONE | M0-a-01 | lp/isLatticeCoord/distinctRing/halfPlaneOf homed in exact.ts | C-0330 (round C2)
- M0-a-01:86 N-c1-4 | NOTE | M0-a-01 | arena-indexed point-in-ring adapters: consolidation swap, copies held equal by equivalence.test.ts; faces copy rides R7 (a-07, pass A in flight) | faces/common.ts:128, insert/rewalk.ts:93
- M0-a-01:94 N-c2-1 | FIX-NOW | M0-a-09 | arr/bandUnion.ts insideKerb (a 12th crossing-rule copy) still private and outside copies.ts: point it at windingNumber summed over rings, or add the copy-table row; pin = the table row | arr/bandUnion.ts:210
- M0-a-01:95 N-c2-2 | NOTE | M0-a-01 | divScaled kind unpinned; mutant D4 equivalent while RATIO_FLOOR is 1 for every kind — pin rides any floor-table change | N-c2-5
- M0-a-01:96 N-c2-3 | NOTE | session | design clause tags (GEO-32, GEO-7) dropped from comments — a session wording choice (§5 Q) | num/predicates.ts:1
- M0-a-01:97 N-c2-4 | DONE | M0-a-01 | wedge.ts and insetRing.ts read divScaled | insert/wedge.ts:16, arr/insetRing.ts:76
- M0-a-01:98 N-c2-5 | NOTE | M0-a-01 | three equivalent survivors A4/A7/D4 with stated evidence | 
- M0-a-01:109 src/geom/common.ts:47–49 isLatticeCoord | DONE | M0-a-10 | G-1 copy swapped: geom/common.ts re-exports exact.ts names | J352 a-10 c1 15ea150
- M0-a-01:110 src/geom/common.ts:65–67 lp | DONE | M0-a-10 | G-1 copy swapped: geom/common.ts re-exports exact.ts names | J352 a-10 c1 15ea150
- M0-a-01:111 src/geom/common.ts:88–97 distinctRing | DONE | M0-a-10 | G-1 copy swapped: geom/common.ts re-exports exact.ts names | J352 a-10 c1 15ea150
- M0-a-01:112 src/skeleton/roof.ts:61 half (private) | DONE | M0-a-11 | S-1 copy swapped to halfPlaneOf | J353 a-11 c1 d553b2f
- M0-a-01:113 src/skeleton/engine.ts:210 half (privat… | DONE | M0-a-11 | S-1 copy swapped to halfPlaneOf | J353 a-11 c1 d553b2f
- M0-a-01:114 src/warp/validate.ts:106 lambda half in… | DONE | M0-a-13 | warp/validate.ts reads halfPlaneOf (R10) | warp/validate.ts:11,103
- M0-a-01:125 S1a | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:126 S1b | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:127 S1c | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:128 S1d | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:129 S1e | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:130 S1f | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:131 G1a | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:132 G1b | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:133 G1c | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:134 G1d | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:135 G1e | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:136 G1f | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:137 G1g | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:138 G1h | NOTE | M0-a-01 | round C2 mutant killed | C-0330
- M0-a-01:139 G1i | NOTE | M0-a-01 | mutant alive, equivalence stated (closing-repeat loop) | 
- M0-a-01:140 A1 | NOTE | M0-a-01 | round C2 mutant killed | 
- M0-a-01:141 A2 | NOTE | M0-a-01 | round C2 mutant killed | 
- M0-a-01:142 E1 | NOTE | M0-a-01 | round C2 mutant killed | 
- M0-a-01:143 E2 | NOTE | M0-a-01 | round C2 mutant killed | 
- M0-a-01:144 E3 | NOTE | M0-a-01 | mutant alive, equivalent (= N-c2-5 A4) | 
- M0-a-01:165 N-c3-1 | DONE | M0-a-01 | barrel export-set ratchet = test/num/api-surface.test.ts | L32 (a); C-0337 (round C3)
- M0-a-01:166 N-c3-2 | DONE | M0-a-01 | exact.ts leaf ratchet in exact.test.ts | L32 (b); C-0337
- M0-a-01:167 N-c3-3 | DONE | M0-a-11 | S-1 copies replaced by halfPlaneOf imports (skeleton R13, warp R10) | J353 a-11 c1 d553b2f; warp/validate.ts:11
- M0-a-01:168 N-c3-4 | DONE | M0-a-01 | three wording points fixed in round C3 | notes lines 197-205; C-0337
- M0-a-01:169 N-c3-5 | NOTE | M0-a-01 | two equivalent survivors G11/G13 with evidence | 
- M0-a-01:180 src/faces/common.ts:444 comparePoints (… | NOTE | M0-a-01 | T-4 copy map row; tx/relevel now import comparePoints (R6) | tx/tx.ts:56, tx/relevel.ts:82
- M0-a-01:181 src/tx/relevel.ts:349 pointCmp (private) | NOTE | M0-a-01 | T-4 copy map row; tx/relevel now import comparePoints (R6) | tx/tx.ts:56, tx/relevel.ts:82
- M0-a-01:182 src/tx/tx.ts:234 pointCmp (a const arro… | NOTE | M0-a-01 | T-4 copy map row; tx/relevel now import comparePoints (R6) | tx/tx.ts:56, tx/relevel.ts:82
- M0-a-01:183 src/arr/kerb.ts:120 comparePoints (priv… | NOTE | M0-a-01 | T-4 copy map row; tx/relevel now import comparePoints (R6) | tx/tx.ts:56, tx/relevel.ts:82
- M0-a-01:184 src/digest/levelDigest.ts:169 cmpYX | NOTE | M0-a-01 | T-4 copy map row; tx/relevel now import comparePoints (R6) | tx/tx.ts:56, tx/relevel.ts:82
- M0-a-01:228 N-c3-1 | NOTE | M0-a-01 | round C3 mutant killed | C-0337
- M0-a-01:229 N-c3-2 | NOTE | M0-a-01 | round C3 mutant killed | C-0337
- M0-a-01:230 T1 | NOTE | M0-a-01 | round C3 mutant killed | C-0337
- M0-a-01:231 T2 | NOTE | M0-a-01 | round C3 mutant killed | C-0337
- M0-a-01:232 T3 | NOTE | M0-a-01 | round C3 mutant killed | C-0337
- M0-a-01:233 T4 | NOTE | M0-a-01 | round C3 mutant killed | C-0337
- M0-a-01:234 T5 | NOTE | M0-a-01 | round C3 mutant killed | C-0337
- M0-a-01:235 T6 | NOTE | M0-a-01 | round C3 mutant killed | C-0337
- M0-a-01:236 T7 | NOTE | M0-a-01 | mutant T7 alive, equivalent (read only when a.y !== b.y) | 
- M0-a-01:237 T8 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:238 T9 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:239 T10 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:240 TC1 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:241 TC2 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:242 TC3 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:243 TC4 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:244 AS1 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:245 AS2 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:246 AS3 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:247 AS4 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:248 AS5 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:249 AS6 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:250 LF1 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:251 LF2 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:252 LF3 | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:253 S2 (c2) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:254 S4 (c2) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:255 G1 (c2) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:256 G6 (c2) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:257 G10 (c2) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:258 A1 (c2) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:259 A1 (c1) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:260 C1 (c1) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:261 C9 (c1) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:262 D1 (c1) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:263 D5 (c1) | NOTE | M0-a-01 | round C3 mutant killed | 
- M0-a-01:288 N-c3b-1 | DONE | M0-a-06 | tx.ts dirtyFaces imports comparePoints (R6) | tx/tx.ts:56,233
- M0-a-01:289 N-c3b-2 | DUPLICATE | session | API.md Appendix B four names behind — home Q51 | Q51
- M0-a-01:290 N-c3b-3 | NOTE | M0-a-01 | exportedNames syntactic reading holds while isolatedModules is on | 
- M0-a-01:305 N-c3c-1 | FIX-NOW | M0-a-01 | exact.test.ts header still says "nothing re-exports it" — reword (comment only; no pin) | test/num/exact.test.ts:6
- M0-a-01:306 N-c3c-2 | FIX-NOW | M0-a-01 | comparePoints docstring claims callers that still use own copies (faces R7 pending, kerb) — reword (comment only) | num/exact.ts:205
- M0-a-01:307 N-c3c-3 | NOTE | M0-a-01 | two equivalent survivors C6/K5 with evidence | 
- M0-a-01:308 N-c3c-4 | NOTE | session | clean-room disclosures (ls of docs/, by-blob before-image, PROGRESS rows) — recorded in L-0472 | 

### M0-a-02

- M0-a-02:11 N-s1-1 (KI) | DONE | session | PLAT_TINY_TABLES env sentinel landed with the kernel-tiny project | Q26 DONE 7525b175
- M0-a-02:12 N-s1-2 (KI) | FIX-NOW | M0-a-02 | mutant K11 (hole pool doubles in tiny mode) survives: add faces[l].holes === slots.holesTop[l] to the exactly-full growth assertion; pin | test/arena/slots.test.ts:596-602
- M0-a-02:13 N-s1-3 | DONE | session | kernel-tiny PR-tier project landed | Q26 DONE 7525b175
- M0-a-02:14 N-s1-4 (cross-item, M0-a-04) | DONE | M0-a-04 | six tiny-only test-side reds fixed before the PR-tier entry | Q26 (after M0-a-04 s3); Q1
- M0-a-02:23 N-s2-1 (KI) | DONE | M0-a-02 | faces/edges view generation survivors K15/K16 now red (C1 mutants S5/S6) | notes line 95; C-0332
- M0-a-02:24 N-s2-2 (cross-item, M0-a-16; the Q33 cl… | DONE | M0-a-16 | façade stamps carry the restore generation | Q38 DONE f2f7f835
- M0-a-02:25 N-s2-3 (KI, M0-a-15) | DUPLICATE | M0-a-15 | compactSlots copies key+version so old stamps read current on the copy — home L16 | L16
- M0-a-02:26 N-s2-4 (session; testkit agreement owne… | DUPLICATE | M0-k-03 | agreement-buffer oracle refusals unseeded, cap 1 at size 1000 — home L18 | L18
- M0-a-02:40 A-1 | NOTE | M0-a-02 | R4 change/equivalence row (no behaviour change) | C-0332
- M0-a-02:41 A-2 | NOTE | M0-a-02 | R4 change/equivalence row (no behaviour change) | C-0332
- M0-a-02:42 A-3 | NOTE | M0-a-02 | R4 change/equivalence row (no behaviour change) | C-0332
- M0-a-02:43 A-4 | NOTE | M0-a-02 | R4 change/equivalence row (no behaviour change) | C-0332
- M0-a-02:44 A-5 / C-arena-1 | NOTE | M0-a-02 | R4 change/equivalence row (no behaviour change) | C-0332
- M0-a-02:45 T-support-1 | NOTE | M0-a-02 | R4 change/equivalence row (no behaviour change) | C-0332
- M0-a-02:73 test/arena/support.ts permutation's inl… | NOTE | M0-a-02 | R4 old→new file map row | C-0332
- M0-a-02:74 test/arena/slots.test.ts private genera… | NOTE | M0-a-02 | R4 old→new file map row | C-0332
- M0-a-02:75 — | NOTE | M0-a-02 | R4 old→new file map row | C-0332
- M0-a-02:76 — | NOTE | M0-a-02 | R4 old→new file map row | C-0332
- M0-a-02:77 — | NOTE | M0-a-02 | R4 old→new file map row | C-0332
- M0-a-02:83 E1 (= K07) | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:84 E2 (= K08) | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:85 E3 (= K25) | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:86 E4 (= K26) | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:87 E5 | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:88 E6 | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:89 E7 | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:90 E9 | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:91 E10 | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:92 E11 | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:93 S1 (= S2's K7), S2 (= S2's K8), S8 (= S… | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:94 S3, S4 | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:95 S5 (= S2's K15), S6 (= S2's K16) | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:96 S7 (= K11), S9 (= K23) | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:97 F1, F2 | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:98 V1 (= K27), V2 (= N31) | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:99 R1 (= S1's K22), R3 (= S1's K23), R2 (=… | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:100 G1 – G5 | NOTE | M0-a-02 | R4 mutant re-killed | 
- M0-a-02:101 E8 | NOTE | M0-a-02 | mutant E8 alive, equivalent on lawful input (N-c1-3) | 
- M0-a-02:109 N-c1-1 (R5, M0-a-03; the Q33 class) | DONE | M0-a-03 | R5 kept index/query.ts own version-only stamp with the stated comment (QueryResult/Location shape kept; façade carries generation) | index/query.ts:89-96; Q38
- M0-a-02:110 N-c1-2 (plan) | NOTE | session | consolidation plan wording: T-1 oracle list names levelDigest as a reader; plan record only | 
- M0-a-02:111 N-c1-3 (equivalent) | NOTE | M0-a-02 | equivalent mutant E8 (degenerate ring only) | 
- M0-a-02:112 N-c1-4 (R6, T-tx-new-1) | DONE | M0-a-06 | T-tx-new-1 runsOfPairs ≡ edgeRuns property in R6 | test/tx/chains.test.ts:170
- M0-a-02:113 N-c1-5 (T-support-1) | NOTE | M0-a-02 | mulberry32 copies (num, skeleton, medial, geom, step1-2 support) pinned equal by support.test.ts; adoption is a consolidation nicety | test/arena/support.test.ts
- M0-a-02:114 N-c1-6 (machine timing; M0-a-15's file) | FIX-NOW | M0-a-15 | io/roundtrip "random batch arenas" runs 5.2-5.7 s against vitest 5 s default (red twice): explicit timeout on the case; no pin | test/io/roundtrip.test.ts:114
- M0-a-02:115 N-c1-7 (foreign; M0-x-06 with M0-b-03) | DONE | M0-x-06 | EP-01/S8/zero-length 2521534151 re-pinned laddered | Q41 DONE b6eb081d
- M0-a-02:124 N-c2-1 (comment tightening; T-support-1) | FIX-NOW | M0-a-02 | support.ts header claims other folders import rng; five copies remain — make the clause future (comment) | test/arena/support.ts header; N-c1-5
- M0-a-02:125 N-c2-2 (comment tightening; C-0286 (2)) | FIX-NOW | M0-a-02 | tiny-tables comments overstate ("EVERY allocation replaces") — free-list allocations grow nothing; reword (comment only) | arena/plat.ts:176,320; arena/debug.ts
- M0-a-02:126 N-c2-3 (equivalent survivors) | NOTE | M0-a-02 | three equivalent survivors E4/E10/G4 with evidence | 
- M0-a-02:127 N-c2-4 (R6, T-1 / T-tx-new-1) | DONE | M0-a-06 | runsOfPairs ≡ edgeRuns property run in R6 | test/tx/chains.test.ts:170
- M0-a-02:128 N-c2-5 (R13, M0-a-16; A-4) | NOTE | M0-a-16 | vertexAt −1 mutant red in test/facade and test/arena — N11 class killed on the tree | N-c2-5
- M0-a-02:129 N-c2-6 (foreign, RELATED) | DUPLICATE | M0-a-02 | the two foreign RELATED reds are N-c1-6 / N-c1-7 of this file | N-c1-6, N-c1-7

### M0-a-03

- M0-a-03:15 N-5 | FIX-NOW | M0-a-03 | off-line finer vertices covered only one level deep: add the CHAIN probe (L1 run with L2/L3/L4 off-line vertices) as a query/pointLocate fixture; pin | checks/M0-a-03-notes.md N-5; test/index has no CHAIN
- M0-a-03:16 N-6 | NOTE | M0-a-03 | HOT_PIXEL padding equivalence executed (K15); recorded so it is not re-reported | 
- M0-a-03:29 X-1 (a) | NOTE | M0-a-03 | R5 change/equivalence row | C-0345
- M0-a-03:30 X-1 (b) | NOTE | M0-a-03 | R5 change/equivalence row | C-0345
- M0-a-03:31 X-1 (c) | NOTE | M0-a-03 | R5 change/equivalence row | C-0345
- M0-a-03:32 X-1 (d) | NOTE | M0-a-03 | R5 change/equivalence row | C-0345
- M0-a-03:33 X-2 | NOTE | M0-a-03 | R5 change/equivalence row | C-0345
- M0-a-03:34 X-3 | NOTE | M0-a-03 | R5 change/equivalence row | C-0345
- M0-a-03:35 X-4 | NOTE | M0-a-03 | R5 change/equivalence row | C-0345
- M0-a-03:36 §2 | NOTE | M0-a-03 | R5 change/equivalence row | C-0345
- M0-a-03:37 §3.4 / T-support-1 | NOTE | M0-a-03 | R5 change/equivalence row | C-0345
- M0-a-03:43 ay ≤ qy, by ≤ qy | NOTE | M0-a-03 | insideRing four-case equivalence table (117 649 inputs) | 
- M0-a-03:44 ay ≤ qy, by > qy | NOTE | M0-a-03 | insideRing four-case equivalence table (117 649 inputs) | 
- M0-a-03:45 ay > qy, by ≤ qy | NOTE | M0-a-03 | insideRing four-case equivalence table (117 649 inputs) | 
- M0-a-03:46 ay > qy, by > qy | NOTE | M0-a-03 | insideRing four-case equivalence table (117 649 inputs) | 
- M0-a-03:82 src/index/query.ts | NOTE | M0-a-03 | R5 old→new file map row | C-0345
- M0-a-03:83 src/index/spatial.ts | NOTE | M0-a-03 | R5 old→new file map row | C-0345
- M0-a-03:84 src/index/items.ts | NOTE | M0-a-03 | R5 old→new file map row | C-0345
- M0-a-03:85 src/index/index.ts | NOTE | M0-a-03 | R5 old→new file map row | C-0345
- M0-a-03:86 src/index/{fresh,grid}.ts, src/adapters… | NOTE | M0-a-03 | R5 old→new file map row | C-0345
- M0-a-03:87 test/index/support.ts | NOTE | M0-a-03 | R5 old→new file map row | C-0345
- M0-a-03:88 test/index/items.test.ts | NOTE | M0-a-03 | R5 old→new file map row | C-0345
- M0-a-03:89 test/index/query.test.ts | NOTE | M0-a-03 | R5 old→new file map row | C-0345
- M0-a-03:90 test/index/grid.test.ts | NOTE | M0-a-03 | R5 old→new file map row | C-0345
- M0-a-03:91 the other eight test files | NOTE | M0-a-03 | R5 old→new file map row | C-0345
- M0-a-03:101 K12 | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:102 K13 | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:103 K14 | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:104 A9 | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:105 A10 | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:106 K1 | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:107 A1 | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:108 X1c-up | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:109 X1c-num | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:110 X1b-stamp | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:111 X1a-box | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:112 X1d-five | NOTE | M0-a-03 | mutant X1d-five killed by the new grid.test pin | 
- M0-a-03:113 X4-holes | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:114 X4-level | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:115 X4-swap | NOTE | M0-a-03 | R5 self-check mutant killed | 
- M0-a-03:148 N-c1-1 | NOTE | M0-a-03 | index stamp kept version-only by design (production QueryResult/Location gain no generation; façade side table carries it); any change is a behaviour round with M0-a-16 — see §5 | C-0345 (1)(b); stamps.test.ts
- M0-a-03:149 N-c1-2 (BLOCKER, cross-item, M0-a-01) | DONE | M0-a-01 | copies.ts BINDINGS gained crossingStep | J326, session/M0-a-01-bindings-1, L-0483
- M0-a-03:161 N-c1-3 | FIX-NOW | M0-a-03 | foreign-key refusal text pinned only as /handed the key/: pin the key name (underground/0) in query.test and one pointLocate case | test/index/query.test.ts:491
- M0-a-03:162 N-c1-4 | FIX-NOW | M0-a-03 | query.ts stamp doc should cite C-0317 beside C-0313 (comment only) | index/query.ts:89-94
- M0-a-03:163 N-c1-5 | FIX-NOW | M0-a-03 | "one seeded generator" comment while seven copies remain — reword or let R14 close the copies (comment) | test/index/support.ts:62
- M0-a-03:164 N-c1-6 (for the session) | DONE | session | C-0345/L-0484 id collision resolved by the id rule at the transplant | notes line 133 (C-0345, L-0484 standing)
- M0-a-03:165 N-c1-7 (for the session; foreign red) | DUPLICATE | M0-a-15 | io/roundtrip random-batch timeout — same as M0-a-02 notes N-c1-6 (FIX-NOW home there) | M0-a-02-notes N-c1-6

### M0-a-04

- M0-a-04:16 N-6 | FIX-NOW | M0-a-04 | fallback onto a run with a finer vertex untested (mutant F1f survives, not equivalent): add WEDGE_S (L2 vertex on the long L1 edge) to placement/attract tests; pin | checks/M0-a-04-notes.md N-6; mutant map line 93
- M0-a-04:17 N-7 | DONE | M0-a-05 | insertChain folds decimate W_ATTRACTED into the transaction | insert/insertChain.ts:4-5,859; step3-5/bfuzz.test.ts:299
- M0-a-04:25 N-8 | DUPLICATE | M0-a-09 | S8≡S9 exact-0 red is N-52 (1)'s KI — home Q19 / KI-13 | Q19
- M0-a-04:26 N-9 | NOTE | M0-a-04 | mutant MC equivalent (reasoned, run supports) | 
- M0-a-04:27 N-10 | FIX-NOW | M0-a-04 | mutant K09 (clearance radius minEdge+1) survives: boundary pin at nearFrame d=24/25 cm (fallback vs placed); pin | N-10; mutant map line 96
- M0-a-04:36 N-11 | DONE | M0-a-04 | closed check precedes plan/read/charge pinned | Q30 DONE 39ee72bc
- M0-a-04:37 N-12 | DONE | M0-a-04 | attractVertex/attractRun check closed first | Q30 DONE 39ee72bc
- M0-a-04:45 N-13 | FIX-NOW | M0-a-04 | source.test.ts closed-check audit regex sees only one-line (tx: InsertTx signatures: parse with the TS compiler (or flatten whitespace, any param name, arrow exports); pin with planted writers | test/insert/step1-2/source.test.ts:60
- M0-a-04:71 test/insert/step1-2/splitThrough.test.t… | NOTE | M0-a-04 | R2 old→new file map row | C-0321
- M0-a-04:72 splitThrough.test.ts 319 – 491: "a spli… | NOTE | M0-a-04 | R2 old→new file map row | C-0321
- M0-a-04:73 splitThrough.test.ts 493 – 652: "a spli… | NOTE | M0-a-04 | R2 old→new file map row | C-0321
- M0-a-04:74 splitThrough.test.ts 654 – 850: "N-55 (… | NOTE | M0-a-04 | R2 old→new file map row | C-0321
- M0-a-04:75 support.ts | NOTE | M0-a-04 | R2 old→new file map row | C-0321
- M0-a-04:76 placement.test.ts | NOTE | M0-a-04 | R2 old→new file map row | C-0321
- M0-a-04:77 attract.test.ts, classes.test.ts | NOTE | M0-a-04 | R2 old→new file map row | C-0321
- M0-a-04:78 bfuzz.test.ts, decimate.test.ts, source… | NOTE | M0-a-04 | R2 old→new file map row | C-0321
- M0-a-04:90 K01, K01b, D1, D2, F3 (checks/M0-a-04.m… | NOTE | M0-a-04 | mutant map row: killed on the tree | 
- M0-a-04:91 K03, K05, K07, K28, F1e | NOTE | M0-a-04 | mutant map row: killed on the tree | 
- M0-a-04:92 K04 | NOTE | M0-a-04 | mutant map row: killed on the tree | 
- M0-a-04:93 K06, K08, F1a, F1b, F1c (F1f survives,… | NOTE | M0-a-04 | mutant map row (F1f survivor is N-6's FIX-NOW) | N-6
- M0-a-04:94 K10 | NOTE | M0-a-04 | mutant map row: killed on the tree (s2 K09 is N-10's) | 
- M0-a-04:95 s1 MA, MB, MD, ME, MF, MG; s7 MQ17 (a t… | NOTE | M0-a-04 | mutant map row: killed on the tree (s2 K09 is N-10's) | 
- M0-a-04:96 s2 K01 – K08, K10 – K12 (C-0284's prech… | NOTE | M0-a-04 | mutant map row: killed on the tree (s2 K09 is N-10's) | 
- M0-a-04:97 s3 MA1 – MA6, s4 M1 – M17 (the closed c… | NOTE | M0-a-04 | mutant map row: killed on the tree (s2 K09 is N-10's) | 
- M0-a-04:98 s3 MB1 – MB6 (the P1 pins under the tin… | NOTE | M0-a-04 | mutant map row: killed on the tree (s2 K09 is N-10's) | 
- M0-a-04:99 this round's own: R1 (carriesRow reads… | NOTE | M0-a-04 | mutant map row: killed on the tree (s2 K09 is N-10's) | 
- M0-a-04:105 N-c1-1 | DONE | M0-a-05 | R3 kept insertChain's own cross-multiplied comparison, stated in its doc | insert/insertChain.ts:259
- M0-a-04:106 N-c1-2 | DONE | M0-a-05 | R3 kept placeOnRun's own candidate loop, stated in its doc | insert/crossings.ts:268-271
- M0-a-04:107 N-c1-3 | DUPLICATE | M0-a-02 | step1-2 mulberry32 copy kept — same as M0-a-02 notes N-c1-5 | M0-a-02-notes N-c1-5
- M0-a-04:113 N-c2-1 | FIX-NOW | M0-a-04 | parity case vacuous since stretch.ts re-exports the originals (I-1): compare with an independent BigInt oracle or narrow the case | test/insert/step1-2/splitThrough.test.ts:275; stretch.ts:69
- M0-a-04:114 N-c2-2 | NOTE | session | plan text still says bandCandidates (lint refuses "band"); plan wording only | 
- M0-a-04:115 N-c2-3 | FIX-NOW | M0-a-04 | mutant CR2 (carries reads ordinal 0) held only by B-FUZZ: unit pin with two explicit ordinals on one vertex | N-c2-3

### M0-a-05

- M0-a-05:16 N-1 | NOTE | session | pnpm test -- <flags> drops flags: records quoting "kernel 163 files" are whole-workspace runs; M0.md §3 step 3 writes the form without -- | M0.md §3 step 3
- M0-a-05:17 N-2 | FIX-NOW | M0-a-05 | wedge cap equality unpinned (mutant K5 survives, not equivalent): chain-corner landing at distance² 5408 stays W_WEDGE_ROUTED; pin | N-2
- M0-a-05:18 N-3 | FIX-NOW | M0-a-05 | routeSegment final E_INVARIANT unreached/untested (K8): white-box test forcing every fallback to fail asserts E_INVARIANT, atomicity, no throw; pin | N-3
- M0-a-05:19 N-4 | FIX-NOW | M0-a-05 | "a refused strict route is the segment's" unpinned (K9): constructed case where design route breaks clearance and the strict route refuses E_KEPT; pin | N-4
- M0-a-05:20 N-5 | FIX-NOW | M0-a-05 | walkRun overshoot guard unpinned (K15; K16 equivalent): walk case with a run vertex beyond the leave point; pin | N-5
- M0-a-05:21 N-6 | FIX-NOW | M0-a-05 | final checkClearance after all segments throws a bare Error: return E_INVARIANT (or record it as an assertion); pin | insert/snapRound.ts checkClearance; N-6
- M0-a-05:22 N-7 | FIX-NOW | M0-a-05 | "nothing changes for chains that commit today" held by one-time receipts: golden digest of a fixed B-FUZZ slice, re-recorded only with a choices row; pin | N-7
- M0-a-05:23 N-8 | FIX-NOW | M0-a-05 | endpoint route may commit a chain's rows on a there-and-back edge (A→P→Q→P→R→B; §3.10 holds) — session ruling owed (C-0205 (3)), then pin the ruled form; see §5 | C-0205 (3); N-8
- M0-a-05:24 N-9 | DONE | M0-a-05 | N-43 B far landings bounded by the fidelity bound rounds S4–S6 | C-0215, C-0217, C-0221; router.test.ts "N-43 B: the fidelity bound"
- M0-a-05:25 N-10 | ROUTED-TO-CENSUS | M0-a-05 | band B-FUZZ reaching insertChain E_INVARIANT — insertChain counted-bound class "no route … keeps clearance within the fidelity bound (N-43)" (KI-1) | Q44; KI-1
- M0-a-05:26 N-11 | FIX-NOW | M0-a-05 | survivors KD, KI, KL, KO, KQ, KR: constructed fallback-route cases (second candidate routes; placeAcross split clearance; endpoint route refused E_KEPT); pins | N-11
- M0-a-05:27 N-12 | FIX-NOW | M0-a-05 | a failing B-FUZZ seed shrinks for 45+ min (looks like a hang): shrink cap (interruptAfterTimeLimit/markInterruptAsFailure or endOnFailure) on the properties | N-12; no interruptAfterTimeLimit in tree
- M0-a-05:28 N-13 | DONE | M0-a-06 | remove(insert(x)) leftover own-child records ruled lawful; index-freshness reading fixed | N-55 (ruling quoting this N-13)
- M0-a-05:29 N-14 | FIX-NOW | M0-a-05 | rescue-rate survivors Q14/Q15 lose rescues only (Q16 equivalent): pin the rescue counts now that the target is zero refusals (J264) | N-14
- M0-a-05:30 N-15 | DONE | M0-a-05 | B-FUZZ per-property counts written under PLAT_FUZZ_COUNTS | notes line 59 (PLAT_FUZZ_COUNTS); C-0221
- M0-a-05:31 N-16 | ROUTED-TO-CENSUS | M0-a-05 | buffer (68.6/1e4) and offsetFace (32.5/1e4) E_INVARIANT residuals — insertChain counted-bound class (KI-1); per-town projection waits KI-4 | Q44; KI-1; KI-4
- M0-a-05:32 N-17 | DUPLICATE | session | multi-seed family-cap aggregate superseded by J264 zero target — the census counts per family before/after (L23) | L23
- M0-a-05:33 N-18 | FIX-NOW | M0-a-05 | optional N-43 class refusal names the bound when the third pass stopped on a precision rule: carry the stopping reason as sub-detail (code and "(N-43)" key unchanged) so the census reads the cause | N-18
- M0-a-05:34 N-19 | FIX-NOW | M0-a-05 | lifecycle register lacks a free-spot landing commit (mutant Q19 killed by unit test only): add pass4-free fixture with exact undo; pin | N-19
- M0-a-05:35 N-20 | DONE | M0-e-03 | site range-door red: water/outfalls.ts no longer writes Int32Array cells | site/src/water/outfalls.ts:95
- M0-a-05:36 N-21 | ROUTED-TO-CENSUS | M0-a-05 | J208 residual (constructive 12, buffer 66.5/1e4, offsetFace) — insertChain counted-bound class (KI-1) | Q44; KI-1
- M0-a-05:37 N-22 | FIX-NOW | M0-a-05 | ownShapeVertex pair/level clauses (M5, M10) differ on a same-key second op (CONFIRMED): same-key second-op pins, or refuse a same-key re-insert at checkRows if ruled | N-22
- M0-a-05:38 N-23 | FIX-NOW | M0-a-05 | coincident fold-back vertex dissolved by a later chain's removal (canonical form) — session reading owed (second flag / per-key owner / "shape vertex of a live chain never dissolved"), then a coincident-foldback register kind; see §5 | C-0302 (3); N-23
- M0-a-05:39 N-24 | DUPLICATE | M0-a-06 | restore.test.ts foldedBase assertions to toBe(0) — home L11 | L11; test/tx/restore.test.ts:499,605
- M0-a-05:71 I-1 (R3 half) | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:72 I-2 | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:73 I-3 (J263 Q2, J286 (1)) | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:74 I-4 (J286 (2)) | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:75 I-7 | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:76 I-8 | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:77 I-9 | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:78 I-10 | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:79 I-11 | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:80 I-12 – I-14 | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:81 I-15 | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:82 I-16 | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:83 N-c2-4 (M0-a-01's notes; J276 (4)) | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:84 I-5 | NOTE | M0-a-05 | R3 finding-by-finding row (done / ruled / kept with stated reason) | C-0328
- M0-a-05:85 N-c2-1 (M0-a-04's notes; J286 (4)) | DUPLICATE | M0-a-04 | parity case vacuous — M0-a-04 notes N-c2-1 | M0-a-04-notes N-c2-1
- M0-a-05:86 R14 (J286 (5)) | NOTE | M0-a-05 | R14 test-support decision recorded | C-0328
- M0-a-05:102 routerGap.test.ts: "N-37: the router's… | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:103 routerGapS3.test.ts: "N-42 (a): a cross… | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:104 routerGapS4.test.ts: "N-43 B: the fidel… | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:105 routerGapS5.test.ts: "S5: the bound of… | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:106 routerGapS6.test.ts: the two F4 describ… | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:107 foldback.test.ts | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:108 placementEnds.test.ts | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:109 lifecycle.test.ts | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:110 chaikin.test.ts | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:111 farWedge.test.ts | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:112 crossings.test.ts | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:113 insertChain.test.ts | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:114 register.test.ts | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:115 support.ts | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:116 bfuzz, fidelity, promote, rewalk, stret… | NOTE | M0-a-05 | R3 old→new file map row | C-0328
- M0-a-05:129 K04 (M0-a-04) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:130 K03 (M0-a-04) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:131 K06, K08 (M0-a-04) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:132 F1a (M0-a-04) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:133 F1b, F1c (M0-a-04) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:134 M9 (s7) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:135 KA, KP, KC, KE, KF, KG, KN (S4) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:136 R1, R2 (S6) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:137 R4, R6 (S6) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:138 R5 (S6) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:139 K1 (S6) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:140 ST3 (r1) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:141 SJ1 (r1) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:142 M3, M4 (s7) | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:143 this round's own: CW, KC1, FE1, WB1, I2… | NOTE | M0-a-05 | R3 mutant map row: red on the named case | 
- M0-a-05:157 N-c1-1 | ROUTED-TO-CENSUS | M0-a-05 | lawful L4 mandatory chain refused E_INVARIANT "no route … (N-43)" (seed 26800) — insertChain counted-bound class (KI-1) | Q44
- M0-a-05:158 N-c1-2 | NOTE | M0-a-05 | I-3/I-4 not adopted, reasons in code comments | insert/crossings.ts:268; insertChain.ts:259
- M0-a-05:159 N-c1-3 | DUPLICATE | M0-a-04 | parity case vacuous — M0-a-04 notes N-c2-1 | M0-a-04-notes N-c2-1
- M0-a-05:160 N-c1-4 | FIX-NOW | M0-a-05 | stretch.ts vertexDist2 has no reader: drop it (hygiene; file-level export, not in the index) | insert/stretch.ts
- M0-a-05:161 N-c1-5 | DUPLICATE | M0-a-05 | RT1 unpinned — same as N-c2-1 of this file (FIX-NOW there) | N-c2-1
- M0-a-05:162 N-c1-6 | FIX-NOW | M0-a-05 | walks' exact ties unpinned (PF1, EX1, SH1, OE1): constructed pins (shared piece with two finer vertices; tip with two route neighbours; exact projection tie) | N-c1-6; N-c2-2
- M0-a-05:172 N-c2-1 | FIX-NOW | M0-a-05 | RT1 (finer vertex step 3 routes through not promoted) survives; lawful input then refused: pin in promote.test.ts (neighbourStep + L2 chain commits W_PROMOTED) | test/insert/step3-5/promote.test.ts:29
- M0-a-05:173 N-c2-2 | DUPLICATE | M0-a-05 | walks' exact ties — same as N-c1-6 of this file | N-c1-6
- M0-a-05:174 N-c2-3 | FIX-NOW | M0-a-05 | PO1/NP1 survive: pins (sliver whose near sub-edge cannot split → null; two equally near pieces → first in query order) | N-c2-3
- M0-a-05:175 N-c2-4 | FIX-NOW | M0-a-05 | insertChain module comment reads wider than code ("a refused chain keeps the second pass's code") — reword (comment) | insert/insertChain.ts:33
- M0-a-05:176 N-c2-5 | ROUTED-TO-CENSUS | M0-a-05 | 12 counted-class E_INVARIANT lawful refusals (dense 17560/0 first chain into empty square) — insertChain counted-bound class (KI-1) | Q44
- M0-a-05:177 N-c2-6 | FIX-NOW | M0-a-04 | carriesRow skips rowElement's mark assertion on a malformed set: assert e <= -2 as rowElement does | N-c2-6 (b)
- M0-a-05:178 N-c2-7 | FIX-NOW | M0-a-07 | faces' reading of splitBreaksClearance unpinned (SB1): faces pin where the boundary split must be refused (R7 in flight) | N-c2-7
- M0-a-05:179 N-c2-8 | DONE | M0-c-02 | foreign red layout enceinte water.test "oblique crossing has no chord" — test reworked by the water-gate rounds (title gone) | layout/test/enceinte/water.test.ts (no such title)
- M0-a-05:195 kernel/src/insert/rewalk.ts coarserRegi… | NOTE | M0-a-05 | S8 survey row: fixed in owns or consistent | 
- M0-a-05:196 kernel/src/insert/rewalk.ts the level-n… | NOTE | M0-a-05 | S8 survey row: fixed in owns or consistent | 
- M0-a-05:197 kernel/src/insert/snapRound.ts recordHo… | NOTE | M0-a-05 | S8 survey row: fixed in owns or consistent | 
- M0-a-05:198 kernel/src/insert/rewalk.ts reparent (p… | NOTE | M0-a-05 | S8 survey row: fixed in owns or consistent | 
- M0-a-05:199 kernel/src/insert/splitThrough.ts:324 (… | NOTE | M0-a-05 | S8 survey row: fixed in owns or consistent | 
- M0-a-05:200 kernel/src/warp/warp.ts:411 | NOTE | M0-a-05 | S8 survey row: fixed in owns or consistent | 
- M0-a-05:201 kernel/src/warp/held.ts:134 nestedVerti… | NOTE | M0-a-05 | S8 survey row: fixed in owns or consistent | 
- M0-a-05:202 kernel/src/invariants/common.ts:111 fac… | DUPLICATE | M0-a-14 | faceLeftOf ±0 cm box — home Q56 (ROUND, a-14 s3) | Q56
- M0-a-05:203 kernel/src/tx/relevel.ts:168 recordLeft… | DUPLICATE | M0-a-06 | recordLeftOf ±1 cm box — home Q57 | Q57
- M0-a-05:204 kernel/src/tx/relevel.ts:465 saveRecord… | NOTE | M0-a-05 | S8 survey row: consistent | 
- M0-a-05:205 kernel/src/index/query.ts:271–280 point… | NOTE | M0-a-05 | S8 survey row: consistent | 
- M0-a-05:206 model/src/match/source.ts:29 | NOTE | M0-a-05 | S8 survey row: consistent | 
- M0-a-05:230 M1 | NOTE | M0-a-05 | S8 mutant killed | 
- M0-a-05:231 M2 | NOTE | M0-a-05 | S8 mutant killed | 
- M0-a-05:232 M3 | NOTE | M0-a-05 | S8 mutant killed | 
- M0-a-05:233 M4 | NOTE | M0-a-05 | S8 mutant killed | 
- M0-a-05:234 M5 | NOTE | M0-a-05 | mutant M5 equivalent under the new lookup (N-s8-2) | 
- M0-a-05:235 M6 | NOTE | M0-a-05 | S8 mutant killed | 
- M0-a-05:236 M7 | NOTE | M0-a-05 | S8 mutant killed | 
- M0-a-05:237 M8 | NOTE | M0-a-05 | S8 mutant killed | 
- M0-a-05:238 M9 | DUPLICATE | M0-a-05 | M9/M10/M11 survivors — N-s8-3 of this file | N-s8-3
- M0-a-05:239 M10 | DUPLICATE | M0-a-05 | M9/M10/M11 survivors — N-s8-3 of this file | N-s8-3
- M0-a-05:240 M11 | DUPLICATE | M0-a-05 | M9/M10/M11 survivors — N-s8-3 of this file | N-s8-3
- M0-a-05:249 N-s8-1 | DUPLICATE | session | faceLeftOf / recordLeftOf reach — homes Q56 / Q57 | Q56; Q57
- M0-a-05:250 N-s8-2 | NOTE | M0-a-05 | guard own-child exemption unpinned, equivalent under new lookup | 
- M0-a-05:251 N-s8-3 | FIX-NOW | M0-a-05 | widened boxes unpinned (M9 midpoint fallback; M10/M11 equivalent on lawful input per N-s8c-4): constructed arenas (Steiner vertex two levels finer in a sliver; new-edge cycle in a sliver) as pins | N-s8-3; N-s8c-4
- M0-a-05:262 N-s8c-1 | DUPLICATE | session | same two sites — Q56 / Q57 | Q56; Q57
- M0-a-05:263 N-s8c-2 | NOTE | M0-a-05 | face slot renumbering only; no digest or persisted output moves | 
- M0-a-05:264 N-s8c-3 | CARRY-FORWARD | M0-a-05 | coarserRegion work +36 %: read against §12.4 ≤ 8 µs per insertion — timing phase (J212) | M0-t-01/M0-t-02
- M0-a-05:265 N-s8c-4 | DUPLICATE | M0-a-05 | MK/ML equivalent on lawful input; constructed-arena pins — N-s8-3 / Q57 | N-s8-3; Q57
- M0-a-05:266 N-s8c-5 | FIX-NOW | M0-a-05 | Q53 pin's batch door: add the sliver chain after an unrelated L2 chain in one transaction (mutant ME) | test/insert/step3-5/sliver.test.ts; N-s8c-5

### M0-a-06

- M0-a-06:12 N-7 | NOTE | M0-a-06 | mutant A07 equivalent (later guard skips every case) | 
- M0-a-06:13 N-8 | DONE | M0-a-06 | M18 settled: CONFIRMED equivalent (X02) in re-check S2 | N-16; C-0223 (2)
- M0-a-06:14 N-9 | FIX-NOW | M0-a-06 | cost bar constant 160/touched face fitted to its 24 seeds (fresh worst 224, 246): restate per touched face and edge, or quote the worst cases with the constant | test/tx/cost.test.ts; C-0189 (6)
- M0-a-06:15 N-10 | DONE | M0-a-14 | indexFreshness refusing lawful removals (dead own-child ITEM_FACE deletes) ruled and fixed | N-55 (ruling on this N-10 / a-05 N-13)
- M0-a-06:16 N-11 | DONE | M0-a-06 | shared-stretch end vs N-46 (6)(e) ruled: rule 3 (b) read with the strip set | Q9 DONE 9585d3be; N-55 (1)
- M0-a-06:17 N-12 | FIX-NOW | M0-a-06 | survivors K05 (owner-set own child also a base), K14 (ancestor walks uncharged, work pin), K16 (freed ancestor slot reused in-batch): hardening pins; rest equivalent | N-12
- M0-a-06:18 N-13 | DONE | M0-a-06 | restore.test.ts generator widened (zigzag, LIFO, inner, 3-segment) in rounds S2–S4 | checks/M0-a-06-s2..s4; notes N-17, N-22
- M0-a-06:19 N-14 | DUPLICATE | M0-a-15 | io/roundtrip random-batch timeout — M0-a-02 notes N-c1-6 | M0-a-02-notes N-c1-6
- M0-a-06:20 N-15 | DONE | M0-a-06 | M18 (X02) CONFIRMED equivalent in re-check S2 | N-16
- M0-a-06:21 N-16 | FIX-NOW | M0-a-06 | on-run survivors X06/X09/X10/X11 (byte-identical outputs): constructed fixtures per reading (re-target if the reading changes) | N-16
- M0-a-06:22 N-17 | FIX-NOW | M0-a-06 | mutant Y03 (inner stretch pairs) killed only at 1e5 runs: pin candidate 333402 as a fixture or raise the inner quota | N-17
- M0-a-06:23 N-18 | DUPLICATE | M0-a-06 | out-of-LIFO removal leaves a degree-2 split vertex — home KI-5 (M2a) | KI-5
- M0-a-06:24 N-19 | FIX-NOW | M0-a-06 | mutant S06 (rule 3 (b) after-batch row identity) not equivalent, unpinned: pin probe-s06 case in removals/forms (flag cleared, unflagged lists it) | N-19
- M0-a-06:25 N-20 | FIX-NOW | M0-a-06 | mutant C05 (no-op batch leaves overlay open → writes outside a transaction) unpinned: add a noop ending to forms.test.ts staleOverlay | N-20
- M0-a-06:26 N-21 | FIX-NOW | M0-a-06 | mutant D06 (onCommit throw rolls back) unpinned: pin onCommit throw — prefixed …/commit:, cause kept, version +1, commit stands | N-21
- M0-a-06:27 N-22 | FIX-NOW | M0-a-06 | restore.test.ts LIFO branch still skips chunk/digest asserts when shared (if (!shared2)): drop the guard (109 shared pairs restore); rides L11's touch | N-22; L11
- M0-a-06:28 N-23 | FIX-NOW | M0-a-06 | restoreSavepoint restores one image twice silently (9 allProblems): used mark throw, and throw while a batch is open; pin | N-23; tx/savepoint.ts
- M0-a-06:29 N-24 | DUPLICATE | M0-a-06 | dead-image restore collides (generation, version) keys and can throw in restoreIndex — home L17 | L17
- M0-a-06:30 N-25 | FIX-NOW | M0-a-06 | restore-generation count pin for a forward restore and a LIFO nested take/restore property in savepoint.test.ts (with L17) | N-25; L17
- M0-a-06:45 T-1 | NOTE | M0-a-06 | R6 change/equivalence row | C-0350
- M0-a-06:46 T-2 | NOTE | M0-a-06 | R6 change/equivalence row | C-0350
- M0-a-06:47 T-3 | NOTE | M0-a-06 | R6 change/equivalence row | C-0350
- M0-a-06:48 T-4 | NOTE | M0-a-06 | R6 change/equivalence row | C-0350
- M0-a-06:49 T-5 | NOTE | M0-a-06 | R6 change/equivalence row | C-0350
- M0-a-06:50 §1.0 N-1 | NOTE | M0-a-06 | R6 change/equivalence row | C-0350
- M0-a-06:51 §1.0 N-3 | NOTE | M0-a-06 | R6 change/equivalence row | C-0350
- M0-a-06:52 T-6 | NOTE | M0-a-06 | R6 change/equivalence row | C-0350
- M0-a-06:53 T-7 / T-8 / T-9, §2 | NOTE | M0-a-06 | R6 change/equivalence row | C-0350
- M0-a-06:63 :255 → :229 dissolvable | NOTE | M0-a-06 | T-3 call-site table (every rotation read closed) | C-0350
- M0-a-06:64 :285 → :258 onStretch | NOTE | M0-a-06 | T-3 call-site table (every rotation read closed) | C-0350
- M0-a-06:65 :431 → :401 runsBefore | NOTE | M0-a-06 | T-3 call-site table (every rotation read closed) | C-0350
- M0-a-06:66 :508 → :478 aroundV | NOTE | M0-a-06 | T-3 call-site table (every rotation read closed) | C-0350
- M0-a-06:67 :528 → :498 saveRun | NOTE | M0-a-06 | T-3 call-site table (every rotation read closed) | C-0350
- M0-a-06:68 :658 → :628 the second reading | NOTE | M0-a-06 | T-3 call-site table (every rotation read closed) | C-0350
- M0-a-06:69 :684 → :654 rule 3 (c) | NOTE | M0-a-06 | T-3 call-site table (every rotation read closed) | C-0350
- M0-a-06:70 :1227 → :1197 dissolve | NOTE | M0-a-06 | T-3 call-site table (every rotation read closed) | C-0350
- M0-a-06:71 :1238 → :1208 dissolve (ua's rotation) | NOTE | M0-a-06 | T-3 call-site table (every rotation read closed) | C-0350
- M0-a-06:72 :1301 → :1271 restoreSplit | NOTE | M0-a-06 | T-3 call-site table (every rotation read closed) | C-0350
- M0-a-06:110 stretch without the rekey → E_INVARIANT… | NOTE | M0-a-06 | stretch without rekey: UNLAWFUL, REFUSE, alternative named in message (rekey first) | C-0350
- M0-a-06:111 insertChain (M0-a-05's finerNear) → E_K… | ROUTED-TO-CENSUS | M0-a-05 | insertChain E_KEPT "a chain vertex inside a finer face (kept content)" under rederivesFrom 0 — class to be judged lawful/unlawful | N-c1-2
- M0-a-06:112 tx's clearance row on a whole-way remov… | ROUTED-TO-CENSUS | M0-a-06 | tx clearance row refusing a lawful whole-way removal (vertex left within minEdge) | N-c1-3
- M0-a-06:113 expectations (class floors) E_BELOW_MIN… | NOTE | M0-a-06 | floors / work limit: REFUSE by design with the onFail ladder as alternative | 
- M0-a-06:114 E_WORK_LIMIT | NOTE | M0-a-06 | floors / work limit: REFUSE by design with the onFail ladder as alternative | 
- M0-a-06:123 test/tx/smoke.test.ts | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:124 test/tx/restore.test.ts | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:125 test/tx/order.test.ts | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:126 test/tx/fuzzgen.ts | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:127 test/tx/support.ts | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:128 — | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:129 test/tx/profiles.test.ts, expect.test.t… | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:130 test/tx/source.test.ts | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:131 clauses, cost, fixtures.test, fixtures.… | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:132 src/tx/{chains,profile,relevel,state,tx… | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:133 src/tx/{index,savepoint}.ts | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:134 src/tx/{ops,types}.ts | NOTE | M0-a-06 | R6 old→new file map row | C-0350
- M0-a-06:153 T1a | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:154 T1b | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:155 T1c | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:156 T2a | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:157 T2b | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:158 T2c | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:159 T2d | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:160 K01 / K03 / K11 | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:161 X04 / X08 | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:162 X12 | NOTE | M0-a-06 | X12 equivalent (record orders removed lists by removedKeys) | 
- M0-a-06:163 Y01 | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:164 S01 | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:165 W01 | NOTE | M0-a-06 | W01 = X02 equivalent (CONFIRMED) | 
- M0-a-06:166 T4a | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:167 T4b | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:168 T5a | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:169 T5b | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:170 T5c | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:171 T5d | NOTE | M0-a-06 | T5d equivalent by reading (overLimit never meets failed === null) | 
- M0-a-06:172 T5e | DUPLICATE | M0-a-06 | T5e pre-existing gap — N-c1-4 | N-c1-4
- M0-a-06:173 T5f | NOTE | M0-a-06 | T5f killed by new expect pin | 
- M0-a-06:174 N1 | DUPLICATE | M0-a-06 | N1 pre-existing gap — N-c1-4 | N-c1-4
- M0-a-06:175 N3 | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:176 TT1 | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:177 TT2 | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:178 M01 | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:179 E01 | NOTE | M0-a-06 | R6 self-check mutant killed | 
- M0-a-06:199 N-c1-1 | NOTE | M0-a-06 | plan's "X12 must stay killed" never held; X12 equivalent, T4b holds the promise | 
- M0-a-06:200 N-c1-2 | ROUTED-TO-CENSUS | M0-a-05 | insertChain E_KEPT kept-content class in tx families (57/336, 100/384, 43/220) | N-c1-2
- M0-a-06:201 N-c1-3 | ROUTED-TO-CENSUS | M0-a-06 | lawful whole-way removal refused by tx clearance row (regressions 5413 #28, 5606 #10) — needs a design reading | N-c1-3
- M0-a-06:202 N-c1-4 | FIX-NOW | M0-a-06 | re-homed constants unpinned (T5e nearSegment 4·HOT_PIXEL_SQ; N1/C12 clearance row ±1-2 cm): pins with a split vertex 0.71–1.42 cm off its run and a removal leaving a vertex at 24/25/26 cm | N-c1-4; N-c1-8
- M0-a-06:203 N-c1-5 | DONE | M0-a-06 | committed arenas the encoder refused (restoreSplit level) | Q54 DONE c4f1005 (S6)
- M0-a-06:213 N-c1-6 | DONE | M0-a-06 | 14 sequences encodable and readable; readable.test.ts pins them | Q54 DONE c4f1005
- M0-a-06:214 N-c1-7 | FIX-NOW | M0-a-06 | enterWriter limit boundary unpinned (C10 >=): pin a callback charged exactly workLimit then a writer that proceeds | N-c1-7
- M0-a-06:215 N-c1-8 | DUPLICATE | M0-a-06 | clearance row boundary — N-c1-4 | N-c1-4
- M0-a-06:216 N-c1-9 | NOTE | M0-a-06 | X16/X16c subsumed by the second on-run reading | 
- M0-a-06:217 N-c1-10 | FIX-NOW | M0-a-06 | comment completions: C-tx-1 lost "never a batch's substitute"; state.ts op doc omits order/(prepare) (comments) | tx/index.ts; tx/state.ts
- M0-a-06:246 along ×104 729 seed 91 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:247 along 235 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:248 along 307 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:249 along 719 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:250 along 980 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:251 heavy ×15 485 863 seed 106 (fuzz.test.t… | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:252 heavy 210 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:253 heavy 213 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:254 heavy 333 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:255 heavy 361 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:256 heavy 395 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:257 heavy 402 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:258 heavy 443 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:259 heavy 739 | DONE | M0-a-06 | broken sequence fixed by restoreSplit bound and pinned in readable.test.ts | Q54 DONE c4f1005
- M0-a-06:323 M1 | NOTE | M0-a-06 | S6 mutant killed (M3/M4 by new pins) | 
- M0-a-06:324 M2 | NOTE | M0-a-06 | S6 mutant killed (M3/M4 by new pins) | 
- M0-a-06:325 M3 | NOTE | M0-a-06 | S6 mutant killed (M3/M4 by new pins) | 
- M0-a-06:326 M4 | NOTE | M0-a-06 | S6 mutant killed (M3/M4 by new pins) | 
- M0-a-06:327 M5 | NOTE | M0-a-06 | M5 equivalent (rows ≤ lv identical by precondition) | 
- M0-a-06:328 M6 | NOTE | M0-a-06 | S6 mutant killed | 
- M0-a-06:341 N-s6-1 | DUPLICATE | M0-a-06 | restoration trigger for a finer chain ending on the run (the kept vertex) — home Q62 | Q62
- M0-a-06:342 N-s6-2 | DUPLICATE | M0-a-14 | every-level constancy validator row — home Q61 (ROUND a-14 s3) | Q61
- M0-a-06:351 N-s6c-1 | ROUTED-TO-CENSUS | M0-a-06 | tx index-freshness E_INVARIANT "an L2 batch wrote the L1 index … outside its promotions and demotions" on remove lane at a kept split vertex (lawful) | Q62
- M0-a-06:352 N-s6c-2 | FIX-NOW | M0-a-06 | restored vertex's changed-face levels unpinned (N12, N8 over-list): pin the ending fixture's record.faces[L2].changed and levels [lv, finer) | N-s6c-2
- M0-a-06:353 N-s6c-3 | DUPLICATE | M0-a-14 | (c) single row comparison fixture rides Q61's row; tx every-level reading is a-06's hardening round | Q61
- M0-a-06:354 N-s6c-4 | ROUTED-TO-CENSUS | M0-a-06 | insert way E_INVARIANT "(way, way:13) branches: a linear role forms simple chains or rings" (along 648 @13), unclassed; record half done at commit | Q62 (second part); N-s6c-4
- M0-a-06:355 — | NOTE | M0-a-06 | equivalents N10, N11, X03 judged, golden-identical | 

### M0-a-07

- M0-a-07:9 N-1 | FIX-NOW | M0-a-07 | B-FUZZ tiles check is a tautology (interior twins cancel): compare children's sum with the parent's area before the split (+ landing moves); same in split.test slanted/attraction/antenna/holed cases | test/faces/bfuzz.test.ts
- M0-a-07:10 N-2 | FIX-NOW | M0-a-07 | attractCm radius of vertex rule and interior-point rule held only by B-FUZZ (M01/M02): deterministic fixtures (P1 L-face 14.1/28.3 cm; interior point 15 cm from top way) | N-2
- M0-a-07:11 N-3 | CARRY-FORWARD | M0-a-07 | §3.6 (6) export omits antennae: the export (§11.1) is not built; name the clause's milestone in a choices row and test at the export | C-0192; §11.1 notBuilt
- M0-a-07:12 N-4 | FIX-NOW | M0-a-07 | ringBand width refusal boundary unpinned (M26): fixtures at exactly 26 cm (E_BELOW_MIN_WIDTH) and 27 cm | N-4
- M0-a-07:13 N-5 | NOTE | M0-a-07 | M03/M29/M32 redundant guards, equivalent survivors | 
- M0-a-07:14 N-6 | FIX-NOW | M0-a-07 | rayHit parameters in doubles (C-0192 (7) declares it): a comment in rayHit naming C-0192 (7) (comment; R7 in flight may carry it) | faces/fan.ts:63-85

### M0-a-08

- M0-a-08:6 1 K30 | FIX-NOW | M0-a-08 | K30 (longer half-width list accepted) unpinned: pin buffer(…, [100,100,100]) throws RangeError | buffer.test.ts:208
- M0-a-08:12 2 | FIX-NOW | M0-a-08 | overlay defences glueWalks/balanceFlow never reached on drawn domains (K14/K15/K16): construct an input reaching them, or turn them into asserted invariants; pin overlay.net before balancing | notes 2, 14; N-c1c-2
- M0-a-08:22 3 K31 | NOTE | M0-a-08 | K31 equivalent (proof given); stricter comment wording acceptable | 
- M0-a-08:28 4 | FIX-NOW | M0-a-08 | H04: re-judge's area bound has no meta-test: harness test with a planted oracle failing the area bound | testkit support.ts
- M0-a-08:32 5 | FIX-NOW | M0-a-08 | H06: judgeInset lattice-edge settle not wired to a test: plant an E_OUT_OF_RANGE through judge for an in-range face | harness.test.ts
- M0-a-08:37 6 | FIX-NOW | M0-a-08 | H07: judgeInset non-convex branch has no meta-test: harness test | harness.test.ts
- M0-a-08:40 7 | FIX-NOW | M0-a-08 | H08: oracleOffset covered-face shortcut unpinned: face whose distance lies between half and full farthest-vertex distance | harness
- M0-a-08:45 8 | DONE | M0-a-05 | PENDING-S3 cases pinned as tests by M0-a-05's rounds (registers, router.test.ts) | N-43; router.test.ts residual/rescue registers
- M0-a-08:48 9 | FIX-NOW | M0-a-08 | traceKept throws a plain Error on a non-closing walk (unreachable on a valid overlay): return E_INVARIANT (§3.11) | arr/ traceKept
- M0-a-08:51 10 | NOTE | M0-a-08 | PR run prints the share line of failing ops only; --silent=false shows all | 
- M0-a-08:55 11 | NOTE | M0-a-08 | kernel-side property sizes fixed; the agreement here-bar scales | 
- M0-a-08:58 12 | ROUTED-TO-CENSUS | M0-a-05 | offsetFace line-B far landing (1 572.9 cm) — insertChain counted-bound class N-43 (KI-1) | Q44; KI-1
- M0-a-08:68 13 K35t | DONE | M0-a-08 | K35t dent pin added in C1 (M17 red) | notes line 237; offset-inset.test.ts "a dent of 1 cm"
- M0-a-08:77 14 | DUPLICATE | M0-a-08 | glueWalks/balanceFlow unreached — note 2 of this file | note 2
- M0-a-08:84 15 | ROUTED-TO-CENSUS | M0-a-05 | line A/B replays on insertChain alone: E_INVARIANT "no route … keeps clearance (§3.10)" — insertChain counted-bound class (KI-1) | Q44; KI-1
- M0-a-08:101 16 | DONE | M0-a-09 | corridorUnion E_DEGENERATE in a-09 B-FUZZ handled by a-09's rounds (codes list / booleans empty) | M0-a-09 build/check rounds; Q53
- M0-a-08:116 17 | FIX-NOW | M0-a-08 | Q07: per-family refusal-cap binding unpinned: loop verdict over every REFUSAL_MEASURE op at cap and cap+1 | harness.test.ts:324
- M0-a-08:124 18 | DUPLICATE | session | refusal ratchet baseline unpinned against a raise — superseded by J264 zero target; the census counts before/after (L23) | L23
- M0-a-08:130 19 | NOTE | M0-a-08 | Q09 equivalent on the drawn domain (stricter direction) | 
- M0-a-08:135 20 | ROUTED-TO-CENSUS | M0-a-05 | offsetFace/buffer insertChain refusal rates (35.8 / 70.2 per 1e4) — KI-1 class | KI-1; Q44
- M0-a-08:143 21 | DUPLICATE | M0-k-03 | polygon-clipping oracle hang as a gate flake — home KI-6 | KI-6
- M0-a-08:155 22 | FIX-NOW | M0-a-08 | T03: oracleInset's largest-k use unpinned: pin a k∈1..3 case or assert oracleInset equals the construction at 2^insetFrameExponent | note 22
- M0-a-08:163 23 | FIX-NOW | M0-a-08 | T07: dedupe and zero-area drop after final rounding unpinned: unit pin of oracleInset on a sub-centimetre sliver | note 23
- M0-a-08:167 24 | NOTE | M0-a-08 | T08/T09 equivalent (reasons given) | 
- M0-a-08:169 25 | NOTE | M0-a-08 | T08/T09 equivalent (reasons given) | 
- M0-a-08:173 26 | FIX-NOW | M0-a-08 | C-0261 sentence "the oracle carries the one rounding ours carries" holds only at moderate angles (28.6 cm at thin tips): reword or build strips from exact line coefficients | note 26
- M0-a-08:181 27 | NOTE | session | oracle refusal shift within C-0150 allowance; J226 recorded only in C-0261 | 
- M0-a-08:189 28 | FIX-NOW | M0-a-08 | M7: bridge splice into walk.steps unpinned: pin inspecting walk.steps / per-pair net after a bridged ring, or a tied-twin case | note 28; C-0196 (1)
- M0-a-08:264 M01 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:265 M02 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:266 M03 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:267 M04 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:268 M05 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:269 M06 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:270 M07 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:271 M08 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:272 M09 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:273 M10 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:274 M11 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:275 M12 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:276 M13 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:277 M14 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:278 M15 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:279 M16 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:280 M17 | NOTE | M0-a-08 | C1 mutant: red, or equivalent (N-c1-3) | 
- M0-a-08:281 M18 – M32 | NOTE | M0-a-08 | earlier mutants all red | 
- M0-a-08:282 M33 | NOTE | M0-a-08 | s3 M1 red | 
- M0-a-08:283 M34 – M37 | DUPLICATE | M0-a-08 | K14/K15/K31/K16 survive as recorded — note 2 / 3 | notes 2, 3, 14
- M0-a-08:287 N-c1-1 | FIX-NOW | M0-a-09 | tileRings.ts keeps private simpleLoops/dropStraight copies and arr/index.ts header scaffold sentence: import from winding.ts (R9) or reword | N-c1-1; N-c1c-1
- M0-a-08:292 N-c1-2 | NOTE | M0-a-08 | B-4 needed no Q5 report; differential is the heap evidence | 
- M0-a-08:296 N-c1-3 | NOTE | M0-a-08 | equivalent survivors M02/M04/M11 | 
- M0-a-08:302 N-c1-4 | NOTE | M0-a-08 | plan oracle lines that did not hold, recorded | 
- M0-a-08:306 N-c1-5 | ROUTED-TO-CENSUS | M0-a-05 | buffer/offsetFace insertChain E_INVARIANT on our own intermediate parts — MAKE-IT-SUCCEED expected (router) | L23; Q44
- M0-a-08:317 N-c1-6 | NOTE | session | process disclosure: one read-only git diff --stat | 
- M0-a-08:325 N-c1c-1 | DUPLICATE | M0-a-09 | trace helpers' comments name tileRings as reader — N-c1-1 of this file | N-c1-1
- M0-a-08:331 N-c1c-2 | DUPLICATE | M0-a-08 | shortestPath unreached end to end — note 2 (perf remark for the perf pass) | note 2
- M0-a-08:342 N-c1c-3 | FIX-NOW | M0-a-08 | C11/C13 fallbacks unpinned: offsetFace part crossing the lattice box; clip unit case with sp=0, sq just below 0 | N-c1c-3
- M0-a-08:351 N-c1c-4 | NOTE | M0-a-08 | C03/C06 equivalent (C06 CONFIRMED on 197 897 loops) | 
- M0-a-08:359 N-c1c-5 | FIX-NOW | M0-a-08 | provenance phrases in testkit support.ts / pins.test.ts header: cite C-0231, N-46 (4); move round names here (comment) | N-c1c-5
- M0-a-08:365 N-c1c-6 | ROUTED-TO-CENSUS | M0-a-05 | 93 refusals at seed 8611 — insertChain E_INVARIANT on our own intermediate geometry | L23; Q44

### M0-a-09

- M0-a-09:6 1 KI-1 | FIX-NOW | M0-a-09 | dangling antenna (two-point loop) left in committed corridor faces, 17-27/1e4 attracted cases: draw the split only where the commit kept its kerb end, or remove the dangling edge in the same batch; count pinned at 0 | C-0212 (8), C-0218 (5); note 34 dangling spurs
- M0-a-09:14 2 K06 | DONE | M0-a-09 | turn-away fixture kills K06/K36 | note 17; corridor.test.ts
- M0-a-09:19 3 K34 | FIX-NOW | M0-a-09 | K34 near-filter margin untested (contrived escape): fixture with a bounding way running back parallel inside its half-width | note 3
- M0-a-09:24 4 K35 | FIX-NOW | M0-a-09 | K35 ON_BOUNDARY_SQ tolerance unpinned: kerb parallel to a shore at 5 cm, kerb edge inserted | note 4
- M0-a-09:28 5 K05 | FIX-NOW | M0-a-09 | K05 unspiked has no deterministic fixture: keep the PR-size spike seed as a register row | note 5; note 18 spike half
- M0-a-09:32 6 | FIX-NOW | M0-a-09 | judgeTile settles any attracted overlap refusal: check the oracle result for a hole or parts within attractCm (§13.1) | note 6
- M0-a-09:37 7 | FIX-NOW | M0-a-09 | corridor agreement loses ~4 % draws as input-refused (judge chord leaves frame): clamp the chord to the frame; cap input-refused and not-united in verdict | note 7
- M0-a-09:42 8 | FIX-NOW | M0-a-09 | agreement classes refusals by detail prefix, not replay: classify by replay (B-FUZZ already does) | note 8; C-0218 (3)
- M0-a-09:45 9 | CARRY-FORWARD | M0-a-09 | BandResult strip/wedge classing blurs when half-width < attractCm — S9 (M1) reads these lists; M1 must know | M1 S9 Corridor/Junction
- M0-a-09:50 10 | ROUTED-TO-CENSUS | M0-a-05 | insertChain-class refusals in bands families (kerb 6, corridorUnion 9, bandUnion 7, tileRings 1) — "no route … (N-43)" class | KI-1; Q44
- M0-a-09:54 11 | FIX-NOW | M0-a-09 | random-network property bounds /area difference/ and admits any number of E_KEPT/E_INVARIANT: use the symmetric difference and count refusals | corridor.test.ts:129
- M0-a-09:57 12 | FIX-NOW | M0-a-09 | vacuous assertion normalises a literal ring (now kerb.test.ts:204): replace with an output assertion or drop | note 12; note 19
- M0-a-09:59 13 | FIX-NOW | M0-a-09 | generators draw straight frame-to-frame chords only (no dead ends, bent spines, turn-away, profiles, square ends); holes-clockwise-inside unchecked: widen B-FUZZ/agreement generators and assert hole orientation | note 13
- M0-a-09:64 14 | CARRY-FORWARD | M0-a-09 | kept content refuses E_KEPT wider than §3.7 (any finer face inside F) — nesting staged to M3a with a choices row; one-click order makes no such input at M0 | M3a (choices row); note 14
- M0-a-09:68 15 | CARRY-FORWARD | M0-a-09 | bandCore read-back scans every face slot (O(arena)) — perf pass / timing bar §3.7 (ii) ≤ 3 ms per district | M0-t-00/M0-t-01; perf pass
- M0-a-09:70 16 | DONE | session | plat/undefined.cur removed (C-0218 date order cosmetic) | L7 DONE 2026-10-08
- M0-a-09:76 17 | NOTE | M0-a-09 | note 2 closed by fix round 1 | 
- M0-a-09:79 18 R04 | FIX-NOW | M0-a-09 | R04: readKerb's final unspiked pass and ring order unpinned: raw toEqual on kerb() for the turn-away face | note 18
- M0-a-09:85 19 | NOTE | M0-a-09 | turn-away fixture pins insertChain-dependent coordinates; a later legitimate move is a re-pin with cause | 
- M0-a-09:96 20 X01 | NOTE | M0-a-09 | X01/X04/X06 each redundant to within attractCm; X07 handled in s1 | 
- M0-a-09:102 21 X11 | FIX-NOW | M0-a-09 | X11 (splice point kept after guard drop, ≤0.71 cm dent on 385 faces): fixture chord case 43 face 3 asserting kerb equals the no-splice kerb | note 21
- M0-a-09:107 22 | DONE | M0-a-09 | guard drop now retries the next target | note 23; C-0281 (1); widthstep.test.ts
- M0-a-09:115 23 | FIX-NOW | M0-a-09 | residue: 8 of 13 316 probe junctions have every target dropped by the guard and draw no split (band partition S9 reads): take the kerb vertex nearest the meeting point or another aim; count to 0 | note 23; Q2 status (notes 20/24)
- M0-a-09:123 24 XR1 | FIX-NOW | M0-a-09 | XR1 retry after the first corner target unpinned: fixture chord case 214 face 4 or polygon case 158 face 1 asserting the redrawn split | note 24
- M0-a-09:132 25 | NOTE | M0-a-09 | XF equivalent on the probe; XG a 3.6 cm quality gap, no safety effect | 
- M0-a-09:146 26 | DONE | M0-a-09 | first-end closing pinned (seed 20261011 case 3140 closes end 0) | note 30 preamble (S4)
- M0-a-09:158 27 | FIX-NOW | M0-a-09 | pinContact guards and degenerate-chord skip unpinned (C7/C9/C8/C6; C11 equivalent): pin a contact whose nearest route piece leaves F's boundary | note 27
- M0-a-09:169 28 | FIX-NOW | M0-a-09 | corridorUnion blocks beyond 2·√2·attractCm where no closing ran (25-29/1e4; cases 2392 337 cm, 2577 574 cm): class each as folded sliver (by design) or wrong union, MAKE-IT-SUCCEED the latter; seeds pinned | note 28; note 34; C-0327 (3)
- M0-a-09:183 29 | DONE | M0-a-09 | C-0327 (3) example re-measured by line 1's fix round (S4) | note 30 preamble
- M0-a-09:199 30 N12 | FIX-NOW | M0-a-09 | N12: retry into the pinned-first path unpinned (families never reach it): fixture/seam plant whose along closing cannot go in | note 30
- M0-a-09:207 31 N2 | FIX-NOW | M0-a-09 | N3/N6 closing guards unpinned (N2 equivalent): synthetic face with two contacts on one route piece (N6); seam placement 5-20 cm off the contact (N3) | note 31
- M0-a-09:219 32 | FIX-NOW | M0-a-09 | bandUnion.ts header overstates the along closing bound: "at most the tip's offset (≤ 2·√2·attractCm, N-43)" (comment) | note 32
- M0-a-09:230 33 | NOTE | M0-a-09 | at-contact closing never stands on the families; re-read at M0-c-06's re-run | 
- M0-a-09:235 34 | ROUTED-TO-CENSUS | M0-a-05 | corridorUnion 16 / bandUnion 2-3 per 1e4 lawful refusals "no route … (N-43)" (insertChain class); the beyond-bar blocks and dangling spurs are notes 28 and 1 of this file | KI-1; Q44; notes 1, 28

### M0-a-10

- M0-a-10:12 N-7 | FIX-NOW | M0-a-10 | neighbours.ts "f live" check (mutant MLV) has no failing test: add probe P3 (allocate before free under the kept key) to boundary.test.ts | neighbours.ts:160
- M0-a-10:13 N-8 | FIX-NOW | M0-a-10 | kept neighbour map answer depends on history when two live records claim one ring (transient inside a batch): a choices row restating C-0163 (1)'s premise (disjoint rings), or settle shared rings to the lowest slot on both paths; M0-a-06 confirms no query between alloc and free | N-8; C-0163 (1)
- M0-a-10:14 N-9 | FIX-NOW | M0-a-10 | B-FUZZ hexLattice property draws one-ring regions only (mutant MHO passes): draw an optional hole ring | test/geom/bfuzz.test.ts:174
- M0-a-10:15 N-10 | CARRY-FORWARD | M0-a-10 | kept-map complete re-check O(faces) per "no face" claim (O(F²) per walk) — measure in the timing phase / perf pass; an arena face-record change counter would make it O(1) | M0-t-01; perf pass
- M0-a-10:16 N-11 | DUPLICATE | M0-a-06 | out-of-stack-order savepoint restore leaves (generation, version) naming two contents — home L17 | L17
- M0-a-10:32 G-1 | NOTE | M0-a-10 | R13 geom change/evidence row | C-0358
- M0-a-10:33 G-2 | NOTE | M0-a-10 | R13 geom change/evidence row | C-0358
- M0-a-10:34 G-3 | NOTE | M0-a-10 | R13 geom change/evidence row | C-0358
- M0-a-10:35 G-4 | NOTE | M0-a-10 | R13 geom change/evidence row | C-0358
- M0-a-10:36 §2 | NOTE | M0-a-10 | R13 geom change/evidence row | C-0358
- M0-a-10:64 N-c1-1 | ROUTED-TO-CENSUS | M0-a-10 | lir E_DEGENERATE empty on self-crossing star rings (UNLAWFUL as face rings; REFUSE typed, no user door) | J352 (2); L23
- M0-a-10:72 N-c1c-1 | FIX-NOW | M0-a-10 | hexLattice empty-region exit for 1-2 edge regions unpinned (mutant H7 draws from the stream): extend the empty-region test with one- and two-point rings and the next draw | hex-lattice.ts:72
- M0-a-10:73 N-c1c-2 | FIX-NOW | M0-a-10 | lir.ts isConvexRing comment gives the wrong reason for a star polygon on hull vertices: reword "(… or visit them out of order)" (comment) | geom/lir.ts:166-172
- M0-a-10:74 N-c1c-3 | NOTE | session | plan finding ids in source comments — ruled to stand (kernel plan's citation form) | J352 (2)
- M0-a-10:75 N-c1c-4 | NOTE | session | builder disclosed one read-only git status — no breach | J352 (2)

### M0-a-11

- M0-a-11:11 N-1 (KI) | ROUTED-TO-CENSUS | M0-a-11 | prepareRings refuses sharpCorner on asymmetric spur walks (5/60 000 random sets; no arrangement face walk reaches it) — class to be judged lawful/unlawful | N-1 (KI)
- M0-a-11:12 N-2 (KI) | NOTE | M0-a-11 | refusal code of non-simple rings depends on reduction order; both refuse | 
- M0-a-11:13 N-3 | CARRY-FORWARD | M0-a-11 | a spur crossing its ring or a hole is dropped and the face accepted (no arrangement face can hold one) — decide refuse notSimple vs record in C-0276 when an outside caller (M1 footprints) can pass such rings | M1 footprints; C-0276
- M0-a-11:14 N-4 | DONE | M0-a-11 | seam edge map pinned: M13/M14 killed by spur.test.ts S2 pins | notes line 123
- M0-a-11:42 src/skeleton/prepare.ts | NOTE | M0-a-11 | R13 old→new file map row | C-0359
- M0-a-11:43 src/skeleton/roof.ts, src/skeleton/engi… | NOTE | M0-a-11 | R13 old→new file map row | C-0359
- M0-a-11:44 src/skeleton/types.ts | NOTE | M0-a-11 | R13 old→new file map row | C-0359
- M0-a-11:45 src/skeleton/index.ts | NOTE | M0-a-11 | R13 old→new file map row | C-0359
- M0-a-11:46 src/skeleton/{coalesce,skeleton,validat… | NOTE | M0-a-11 | R13 old→new file map row | C-0359
- M0-a-11:47 test/skeleton/{contract,downgrade,spur,… | NOTE | M0-a-11 | R13 old→new file map row | C-0359
- M0-a-11:48 test/skeleton/{fixtures,known,property,… | NOTE | M0-a-11 | R13 old→new file map row | C-0359
- M0-a-11:49 — | NOTE | M0-a-11 | R13 old→new file map row | C-0359
- M0-a-11:55 prepare.ts segmentsMeet (N-2) | NOTE | M0-a-11 | S-1 site convention and equivalence (CONFIRMED) | 
- M0-a-11:56 prepare.ts insideRing (N-3) | NOTE | M0-a-11 | S-1 site convention and equivalence (CONFIRMED) | 
- M0-a-11:57 roof.ts half, engine.ts half | NOTE | M0-a-11 | S-1 site convention and equivalence (CONFIRMED) | 
- M0-a-11:100 A1 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:101 A2 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:102 A3 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:103 A4 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:104 A5 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:105 A6 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:106 A7 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:107 H1 | NOTE | M0-a-11 | H1/H2 equivalent (probe: 0 lines move) | 
- M0-a-11:108 H2 | NOTE | M0-a-11 | H1/H2 equivalent (probe: 0 lines move) | 
- M0-a-11:109 H3 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:110 H4 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:111 H5 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:112 H6 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:113 K01 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:114 K03 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:115 K04, K04b | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:116 K05 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:117 K06 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:118 K07 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:119 K08 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:120 K16b | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:121 K38 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:122 M04, M05, M12 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:123 M13, M14 | NOTE | M0-a-11 | R13 mutant killed | 
- M0-a-11:131 R-c1-1 | ROUTED-TO-CENSUS | M0-a-11 | lawful corpus footprints 1144/1840 take the planarity downgrade — MAKE-IT-SUCCEED engine repair (declared shift) after the census | Q63; J353 (2)
- M0-a-11:132 R-c1-2 | NOTE | M0-a-11 | golden digests re-recorded with a choices row on a deliberate engine change | 
- M0-a-11:142 N-c1c-1 | NOTE | M0-a-11 | roof.ts half-plane split unobservable; H1/H3 equivalent (CONFIRMED on 12 232 rings) | 
- M0-a-11:143 N-c1c-2 | DUPLICATE | M0-a-11 | the two lawful downgrades — R-c1-1 / Q63 | Q63

### M0-a-12

- M0-a-12:13 packages/kernel/src/medial/axis.ts | NOTE | M0-a-12 | R13 medial old→new file map row | C-0355
- M0-a-12:14 packages/kernel/src/medial/index.ts | NOTE | M0-a-12 | R13 medial old→new file map row | C-0355
- M0-a-12:15 bench/src/skeleton/index.ts | NOTE | M0-a-12 | R13 medial old→new file map row | C-0355
- M0-a-12:16 bench/test/skeleton/medial.test.ts | NOTE | M0-a-12 | R13 medial old→new file map row | C-0355
- M0-a-12:17 packages/kernel/test/medial/{support,de… | NOTE | M0-a-12 | R13 medial old→new file map row | C-0355
- M0-a-12:45 exported names (TypeScript checker): sr… | NOTE | M0-a-12 | NO-SHIFT measure: identical before/after; lawful refusals 0 | 
- M0-a-12:46 medialAxis over the corpus at steps 100… | NOTE | M0-a-12 | NO-SHIFT measure: identical before/after; lawful refusals 0 | 
- M0-a-12:47 refusals of the registered families (la… | NOTE | M0-a-12 | NO-SHIFT measure: identical before/after; lawful refusals 0 | 
- M0-a-12:48 the unlawful family (off-lattice, two i… | NOTE | M0-a-12 | unlawful off-lattice input: REFUSE E_OUT_OF_RANGE typed (snap is the door) — verdict stated | 
- M0-a-12:49 unresolved (answered, not refused: self… | NOTE | M0-a-12 | NO-SHIFT measure: identical before/after | 
- M0-a-12:50 corepack pnpm bench -- skeleton summary… | NOTE | M0-a-12 | NO-SHIFT measure: identical before/after | 
- M0-a-12:51 the item's tests | NOTE | M0-a-12 | NO-SHIFT measure: identical before/after | 
- M0-a-12:61 MS1 | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:62 X15 | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:63 MS3 | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:64 MS4 | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:65 MS2 | NOTE | M0-a-12 | MS2 equivalent in the medial folder, killed at its home (J351 (2)) | J351 (2)
- M0-a-12:66 X1 | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:67 X6 | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:68 X9 | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:69 X10 | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:70 X14c | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:71 X17 | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:72 R9 | NOTE | M0-a-12 | R13 mutant killed | 
- M0-a-12:78 N-c1-1 | NOTE | M0-a-12 | MB4 red only at the predicate's home; ruled a note | J351 (2)

### M0-a-13

- M0-a-13:7 1 | FIX-NOW | M0-a-13 | path check (M12) and rotation check (M14) shadow each other: fixtures isolating each (rotation flip crossing no unmoved edge; a jump nesting cannot see) | note 1; C-0193 (4)
- M0-a-13:14 2 | FIX-NOW | M0-a-13 | placementBoundProblem call site untested (M20): fixture placing a re-seat before an end of its own route that is placed elsewhere | note 2
- M0-a-13:17 3 | FIX-NOW | M0-a-13 | region fixture vacuous (M22): brush wider than the region so the region bites | note 3
- M0-a-13:21 4 | FIX-NOW | M0-a-13 | smoother weight untested (M29): pin one pass's expected position | note 4; C-0193 (6)
- M0-a-13:24 5 | FIX-NOW | M0-a-13 | simplify tie-break (M34) untested; ring floor M35 possibly unreachable: pin the tie, note the floor | note 5; N-r10c-4
- M0-a-13:27 6 | NOTE | M0-a-13 | M36/M38/M39/M40 equivalent (reasons given) | 
- M0-a-13:32 7 | CARRY-FORWARD | M0-a-13 | simplify O(n³) worst case — perf pass (heap + packed index) if long chains appear | perf pass
- M0-a-13:34 8 | FIX-NOW | M0-a-13 | B-FUZZ never draws fromLevel 0 and never locks a face: widen the generator (held (2) fromLevel 0, held (1) face branch) | note 8
- M0-a-13:37 9 | FIX-NOW | M0-a-13 | §13.1 "warp fromLevel 1 over finished fabric gives 0 E_KEPT" and the water-gate fixture not among tests: add both (coverage) | note 9
- M0-a-13:47 10 | FIX-NOW | M0-a-13 | slide clamp tested one side only (K10): add probe P2 beside the held-vertex slide fixture | note 10
- M0-a-13:53 11 | FIX-NOW | M0-a-13 | held (5) closure tested one round only (K15 still survives after R10): add P3 asserting the held list and halvings 0 | note 11; notes line 136
- M0-a-13:60 12 | DONE | session | tx doc lines attributed under build/M0-a-13-fix1 at the flow commit | C-0197 (1)
- M0-a-13:77 validate.ts closerThan (a private body) | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:78 validate.ts MIN_EDGE = 25; warp.ts ATTR… | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:79 validate.ts, warp.ts HOT_PIXEL_SQ = HOT… | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:80 view.ts BOX_RANGE = 16_777_216 | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:81 warp.ts nearestLattice (a body) | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:82 warp.ts placeOnRoute | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:83 held.ts check | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:84 validate.ts, simplify.ts segmentsMeet f… | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:85 validate.ts ascents()'s lambda half | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:86 validate.ts private winding(px, py, xs,… | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:87 held.ts insideRegion (a body) | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:88 simplify.ts PI = 3.141592653589793 | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:89 index.ts "The scaffold created this ind… | NOTE | M0-a-13 | R10 before/after source map row | C-0334
- M0-a-13:124 W1-copy | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:125 W2-attract / W2-minedge | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:126 W2-hotpixel (validate.ts) | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:127 W2-hotpixel-warp | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:128 W2-boxrange | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:129 W3-K08 | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:130 W6-meet | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:131 WS1-half | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:132 N3-winding | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:133 N3-region | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:134 M01, M03, M04, K01, K09, K14, K19 (chec… | NOTE | M0-a-13 | R10 mutant map row: red | 
- M0-a-13:140 N-r10-1 | NOTE | session | W-4 differing class (work count only, never a placement): kept, comment only; one enumerator optional (J263 Q2) | N-r10-1
- M0-a-13:141 N-r10-2 | NOTE | M0-a-13 | K08 through warp door red on T-warp-new-1 | 
- M0-a-13:142 N-r10-3 | DONE | M0-x-06 | foreign red EP-01/S8/zero-length re-pinned laddered | Q41 DONE b6eb081d
- M0-a-13:152 N-r10c-1 | FIX-NOW | M0-a-13 | warp per-candidate charge unpinned (W4b): pin insert.placementCandidates on the §13.1 kerb fixture and a W_PLACED case | N-r10c-1
- M0-a-13:153 N-r10c-2 | FIX-NOW | M0-a-13 | nesting before-side read unpinned (N3b): add probe P-N3b to validate.test.ts | N-r10c-2
- M0-a-13:154 N-r10c-3 | FIX-NOW | M0-a-13 | warp test (i) threshold unpinned (W2c): placeOnRoute pin on N-r10-1's input (77 candidates, rank-16 refused) | N-r10c-3
- M0-a-13:155 N-r10c-4 | DUPLICATE | M0-a-13 | band tie-break unpinned — note 5 of this file | note 5
- M0-a-13:156 N-r10c-5 | NOTE | M0-a-13 | W4c/WS1a/W6a/W6b equivalent (reasons given) | 
- M0-a-13:157 N-r10c-6 | FIX-NOW | M0-a-13 | warp rounding tie in attempt() unpinned: fixture whose re-seat target is exactly x.5, assert y-then-x pick | N-r10c-6
- M0-a-13:158 N-r10c-7 | NOTE | session | fast-check seed tokens in bfuzz comments are replay records; optional move | 
- M0-a-13:159 N-r10c-8 | NOTE | session | HOT_PIXEL_SQ home: placement.ts re-exports; R5 kept it (X-3) | M0-a-03 notes X-3

### M0-a-14

- M0-a-14:6 1 | DUPLICATE | M0-a-14 | clearance second loop not isolated (K03) — note 17's control X20 isolates it | note 17
- M0-a-14:13 2 | FIX-NOW | M0-a-14 | simple-faces "pair joined twice" (K08) and "overlap at a shared endpoint" (K09) lack isolating negatives: fixture only these clauses see | note 2
- M0-a-14:18 3 | FIX-NOW | M0-a-14 | nesting "an L0 face names no parent" (K13) untested (off the stated promise): pin it or drop the clause | note 3
- M0-a-14:20 4 | NOTE | M0-a-14 | K02/K16 equivalent (624 not a sum of two squares; run ends) | 
- M0-a-14:23 5 | FIX-NOW | M0-a-14 | placement-bound row reads only moved vertices without a note when BatchContext.placed is absent: hand placed in the fuzz runs and write a note when missing | note 5; C-0200 (3)
- M0-a-14:27 6 | CARRY-FORWARD | M0-a-14 | kept-content clear-region clause not built (clearRegion is notBuilt('M3a')); name the deferral in the row's deferredTo / C-0200 | M3a (§4b)
- M0-a-14:31 7 | CARRY-FORWARD | M0-a-14 | "sideEffects": false lets a bundle drop invariants/debug.ts so the arena's debug switch stays on — M1's app bundle must keep the switch (e.g. read the flag in arena/debug.ts) | M1 app bundle
- M0-a-14:38 8 | FIX-NOW | M0-a-14 | suiteEnv with a function context hands kernelChecks an empty context, so expect entries never see it: pass the context through; pin | note 8
- M0-a-14:40 9 | DUPLICATE | M0-a-14 | face-corner threshold boundary unpinned — N-c1-4 of this file | N-c1-4
- M0-a-14:42 10 | NOTE | M0-a-14 | probe B suite-only reports all expected | 
- M0-a-14:58 11 | FIX-NOW | M0-a-14 | references-resolve: role row on a dead edge slot has no negative (C07): control X07 | note 11
- M0-a-14:61 12 | FIX-NOW | M0-a-14 | references-resolve: ring knots in ordinal order with one wrap untested (C08): controls X08/X08b (closed kerb ring, four knots) — constructible now | note 12; C-0200 (12)
- M0-a-14:66 13 | FIX-NOW | M0-a-14 | "two knots share one vertex" fires only for an open run with exactly two knots (C09): rule whether knots stand on distinct vertices, then make the check agree for every count | note 13; C-0200 (12)
- M0-a-14:71 14 | CARRY-FORWARD | M0-a-14 | stored VertexRef finding >1 vertex untested for knot/non-indexed roles (C10) — no entity stores one at M0 | M1 (first stored VertexRef)
- M0-a-14:74 15 | FIX-NOW | M0-a-14 | over-reporting guards unexercised: level-consistency vertex-role half (C25, control X25) now; prepared-contacts own-level filter (C15, X15) with M3a's clear-region batches | note 15
- M0-a-14:80 16 | FIX-NOW | M0-a-14 | arena-isolation dead face slot / dead demoted half-edge negatives (C18/C19): controls X18, X19 | note 16
- M0-a-14:83 17 | FIX-NOW | M0-a-14 | clearance second loop strict bound (C20): control X20 (re-indexed vertex exactly minEdge from a touched edge) | note 17
- M0-a-14:89 18 | FIX-NOW | M0-a-14 | simple-faces rotation at degree 3 (C21): control X21 | note 18
- M0-a-14:92 19 | FIX-NOW | M0-a-14 | nesting "no live parent" not isolated (C23): control X23 (free the real L1 parent) | note 19
- M0-a-14:96 20 | FIX-NOW | M0-a-14 | level-consistency "exactly two coarser of one level" (C26): control X26 | note 20
- M0-a-14:100 21 | FIX-NOW | M0-a-14 | role-consistency absorption (C35): control X35 with absorbSliver | note 21
- M0-a-14:102 22 | NOTE | M0-a-14 | C33/C22 equivalent, C34 contrived | 
- M0-a-14:109 23 | ROUTED-TO-CENSUS | M0-a-05 | insertChain B-FUZZ seed -1863295922 E_INVARIANT "no route … keeps clearance (§3.10)" (N-37/N-40 router gap) — KI-1 class | KI-1; Q44
- M0-a-14:126 24 | FIX-NOW | M0-a-14 | indexFreshness ITEM_FACE guard unpinned (X10, deliberate-writer escape): hand-logged coarser ITEM_VERTEX tombstone whose slot is a free face slot must be refused | note 24
- M0-a-14:145 V-1 PI | NOTE | M0-a-14 | R11 change/equivalence row | C-0357
- M0-a-14:146 V-1 uniq | NOTE | M0-a-14 | R11 change/equivalence row | C-0357
- M0-a-14:147 V-1 neighbours | NOTE | M0-a-14 | R11 change/equivalence row | C-0357
- M0-a-14:148 V-1 faceArea2 | NOTE | M0-a-14 | R11 change/equivalence row | C-0357
- M0-a-14:149 V-2 segmentsMeet | NOTE | M0-a-14 | R11 change/equivalence row | C-0357
- M0-a-14:150 V-2 segmentBox | NOTE | M0-a-14 | R11 change/equivalence row | C-0357
- M0-a-14:151 V-3 | NOTE | M0-a-14 | R11 change/equivalence row | C-0357
- M0-a-14:152 V-4 | NOTE | M0-a-14 | R11 change/equivalence row | C-0357
- M0-a-14:153 V-5, C-inv-1 | NOTE | M0-a-14 | R11 change/equivalence row | C-0357
- M0-a-14:162 a seed vertex / a point on a seed edge | NOTE | M0-a-14 | V-3 boundary rule before = after | C-0357
- M0-a-14:163 interior / exterior of a simple seed | NOTE | M0-a-14 | V-3 boundary rule before = after | C-0357
- M0-a-14:164 interior of a doubly wound seed (windin… | NOTE | M0-a-14 | V-3 boundary rule before = after | C-0357
- M0-a-14:165 a two-point seed: a point on its segmen… | NOTE | M0-a-14 | V-3 boundary rule before = after | C-0357
- M0-a-14:166 a one-point seed: that point | NOTE | M0-a-14 | V-3 boundary rule before = after | C-0357
- M0-a-14:167 the empty seed | NOTE | M0-a-14 | V-3 boundary rule before = after | C-0357
- M0-a-14:209 N-c1-1 | FIX-NOW | M0-a-14 | index-freshness changed-list dedupe unpinned: hand record with one vertex in moved and promoted counts once | N-c1-1
- M0-a-14:210 N-c1-2 | NOTE | M0-a-14 | recordVertices dedupe equivalent (Set) | 
- M0-a-14:211 N-c1-3 | NOTE | M0-a-14 | families hold no holed face; identity pin and items.test holed fixtures hold the measure | 
- M0-a-14:222 N-c1-4 | FIX-NOW | M0-a-14 | face-corners threshold unpinned (φ ×1.02 survives): lattice corners at 4.9° and 5.1° for the soft and the hard (optional) rows | N-c1-4; note 9
- M0-a-14:223 N-c1-5 | FIX-NOW | M0-a-14 | simple-faces touch/overlap half has no isolating control: add C-touch and C-overlap asserting cross | N-c1-5
- M0-a-14:224 N-c1-6 | FIX-NOW | M0-a-14 | invariants/batch.ts:599 comment line 137 chars: rewrap (cosmetic) | N-c1-6
- M0-a-14:225 N-c1-7 | FIX-NOW | M0-a-03 | index/items.ts faceArea2 doc stale after V-1 (package exports this body): reword (comment) | N-c1-7

### M0-a-15

- M0-a-15:6 1 | FIX-NOW | M0-a-05 | after a load the next commit record can name the other split part and its work move by ≤2 ring reads (stored outer start): make the re-walk's record/work independent of the stored start, or rule loads out of §3.3's identical-next-edit list (C-0207 (5)) | note 1
- M0-a-15:12 2 | FIX-NOW | M0-a-15 | loaded outer/out starts unpinned (C35/C34): unit test that outer is the key's half-edge after a load | note 2; C-0207 (5)
- M0-a-15:17 3 | FIX-NOW | M0-a-15 | level-ℓ row on a level-ℓ vertex partition untested (C37): add an L2 lane with width knots (or a gate row) to the CITY-shaped arena, check its district chunk | note 3; C-0207 (4)
- M0-a-15:21 4 | FIX-NOW | M0-a-15 | constructive round trip runs 4 seeds per case: say so in the test header citing C-0122 (comment) | note 4
- M0-a-15:24 5 | FIX-NOW | M0-a-15 | opts.digests not distinguished from the recompute fallback (C18): also assert hasLevelDigests(r.value) | note 5
- M0-a-15:27 6 | FIX-NOW | M0-a-15 | three corrupt-cache guards lack crafted negatives (C39/C40/C47): three crafted chunks in corrupt.test.ts | note 6
- M0-a-15:31 7 | FIX-NOW | M0-a-15 | kernel random arenas never write an L4 split (C50): one L4 chain ending on a coarser edge in roundtrip.test.ts | note 7
- M0-a-15:34 8 | FIX-NOW | M0-k-02 | testkit-side bar arenas carry no non-zero face kind: census precondition asserting at least one bar arena carries one | note 8; note 15
- M0-a-15:36 9 | FIX-NOW | M0-a-15 | two cases staged to M1 throw a plain Error: use notBuilt('M1') so the staging is greppable | note 9; C-0207 (3)
- M0-a-15:40 10 | FIX-NOW | M0-a-15 | angle sort quadrant (−x,0) choice: a comment stating the equivalence (C08) | note 10
- M0-a-15:42 11 | FIX-NOW | M0-a-15 | decodeArena never-throws property fixed at 300 draws: read PLAT_FUZZ_RUNS | note 11
- M0-a-15:45 12 | FIX-NOW | M0-a-15 | roundtrip header claims promotions/demotions occur, unasserted: tally assertion like seen.splits | note 12
- M0-a-15:55 13 K12 | FIX-NOW | M0-a-15 | K12 (drop kind at L4 only) still survives: add probe CP2's L4 setback chains and residue sliver to the face-kind test | note 13; notes line 163
- M0-a-15:62 14 K9 | DONE | M0-a-15 | K9 now killed by the 0xfffe face case | notes line 161; C-0352
- M0-a-15:67 15 | DUPLICATE | M0-a-15 | testkit-side kind census — note 8 | note 8
- M0-a-15:116 src/io/encode.ts | NOTE | M0-a-15 | R12 old→new file map row | C-0352
- M0-a-15:117 src/io/format.ts | NOTE | M0-a-15 | R12 old→new file map row | C-0352
- M0-a-15:118 src/io/decode.ts | NOTE | M0-a-15 | R12 old→new file map row | C-0352
- M0-a-15:119 src/io/index.ts | NOTE | M0-a-15 | R12 old→new file map row | C-0352
- M0-a-15:120 src/io/bytes.ts | NOTE | M0-a-15 | R12 old→new file map row | C-0352
- M0-a-15:121 src/io/{compact,types}.ts | NOTE | M0-a-15 | R12 old→new file map row | C-0352
- M0-a-15:122 test/io/corrupt.test.ts | NOTE | M0-a-15 | R12 old→new file map row | C-0352
- M0-a-15:123 test/io/{support,roundtrip,outer-ring,d… | NOTE | M0-a-15 | R12 old→new file map row | C-0352
- M0-a-15:124 testkit/test/kernel/io/* | NOTE | M0-a-15 | R12 old→new file map row | C-0352
- M0-a-15:161 K9 | NOTE | M0-a-15 | K9 killed by the new corrupt case | 
- M0-a-15:163 K12 | DUPLICATE | M0-a-15 | K12 survives — note 13 | note 13
- M0-a-15:175 16 | FIX-NOW | M0-a-15 | decode.ts module comment omits the vertices step of the load order (comment) | note 16; decode.ts:2-3
- M0-a-15:182 17 | DONE | session | C-0352 / L-id collision renumbered by the id rule at commit (C-0352 is M0-a-15's) | choices.md C-0352

### M0-a-16

- M0-a-16:5 1 | DONE | M0-a-06 | stale overlay writing outside a transaction: every barrel writer throws on a closed overlay | Q13 DONE a8266569
- M0-a-16:12 2 | FIX-NOW | M0-a-16 | slot numbers passed to writers carry no stamp (C-0220 (3)): a reused/foreign FaceId is checked only for liveness — carry stamped handles in the debug build | note 2; §3.4
- M0-a-16:18 3 | FIX-NOW | M0-a-16 | K22 (overlay check weakened to "an arena under this key") survives: test a second kernel over another ground arena with the same key | note 3
- M0-a-16:23 4 | FIX-NOW | M0-a-16 | S05 (stampOf prefers inline stamp) equivalent today only: pinning test with an inline-stamped value from a rejected batch | note 4
- M0-a-16:29 5 | FIX-NOW | M0-a-16 | resolveVertexAt design signature carried by no type: add a ResolveVertexAt type alias beside CarryMap (M2a compiles unchanged) | note 5; C-0089
- M0-a-16:34 6 | FIX-NOW | M0-a-16 | mixer census misses element-access calls and Streams built from unmixed keys (testkit constructive/draw.ts:50): widen the census or make it a lint rule | note 6
- M0-a-16:40 7 | FIX-NOW | M0-a-16 | LevelView.faces() omits a coarser own-child face (C-0220 (4)) — a trap for level-n tiling readers: add tiling()/includeOwnChildren (API pass, before M1 readers) | note 7
- M0-a-16:43 8 | FIX-NOW | M0-a-16 | notBuilt site census matches only notBuilt('M…', with single quotes: match every form (double quotes, template, helper) | note 8
- M0-a-16:46 9 | FIX-NOW | M0-a-16 | §4b kernel-entry filter KERNEL_MARKS matches hook-cell substrings: a marker column in §4b or an explicit row list | note 9
- M0-a-16:56 10 | DONE | M0-a-16 | N11 killed by T-facade-new-1 (no-index signature with content) | notes line 197; C-0351
- M0-a-16:78 11 | FIX-NOW | M0-a-16 | N-55 (5) (1)'s ruled "no open frame of this kernel" guard not built (C-0290 guard is closed-overlay): session ruling first — if wanted, rounds on M0-k-04 primitives.ts writer() and M0-d-08 issue.ts runBatch, then flip a-16's pins; see §5 | note 11; C-0290
- M0-a-16:96 12 | FIX-NOW | M0-a-06 | a fabricated InsertTx shell with open:true writes through a façade writer outside any transaction: tx/state.ts exports isOpenTx (open WeakSet ∧ !closed) and writer() checks it; pin | note 12
- M0-a-16:108 13 | FIX-NOW | M0-a-16 | value returned through a kernel that did not open the batch is not re-stamped at commit (PLAUSIBLE, debug-only fail-loud): pin, or route the stamp through the transaction | note 13
- M0-a-16:113 14 | FIX-NOW | M0-a-16 | in-batch stamp after a cross-commit restore unpinned (M22): in stamps.test Q38 block assert current and generation 1 inside the next batch | note 14
- M0-a-16:124 15 | DONE | M0-a-16 | stampNow returns the arena's stamp(p) (one law); the message copy is note 17 | C-0351 (notes line 139)
- M0-a-16:159 src/facade/stamp.ts | NOTE | M0-a-16 | R13 façade old→new map row | C-0351
- M0-a-16:160 src/facade/kernel.ts | NOTE | M0-a-16 | R13 façade old→new map row | C-0351
- M0-a-16:161 src/facade/{index,types,notBuilt,engine… | NOTE | M0-a-16 | R13 façade old→new map row | C-0351
- M0-a-16:162 test/facade/facade.test.ts | NOTE | M0-a-16 | R13 façade old→new map row | C-0351
- M0-a-16:163 test/facade/stamps.test.ts | NOTE | M0-a-16 | R13 façade old→new map row | C-0351
- M0-a-16:164 test/facade/{mixer,reflection,stubs}.te… | NOTE | M0-a-16 | R13 façade old→new map row | C-0351
- M0-a-16:197 N11 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:198 N11b | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:199 N09 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:200 N10 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:201 K01 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:202 K03 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:203 K04 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:204 K05 | NOTE | M0-a-16 | K05 equivalent (every minted overlay carries a boolean closed) | 
- M0-a-16:205 K07 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:206 K10 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:207 TXT | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:208 K21 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:209 KN1 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:210 KN2 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:211 M02 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:212 M02f | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:213 M05 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:214 M01 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:215 M20 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:216 S01 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:217 S02 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:218 S04 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:219 M07 | NOTE | M0-a-16 | R13 mutant killed | 
- M0-a-16:227 16 | FIX-NOW | M0-a-16 | stampNow key copy unpinned (X14): expect stampOf(r).key not toBe p.key; mutating it leaves p.key unchanged | note 16
- M0-a-16:235 17 | FIX-NOW | M0-a-16 | generation message tail unpinned (X19) — the second copy of assertStamp's text: pin the whole text or compare with the arena's after prefixes | note 17
- M0-a-16:243 18 | FIX-NOW | M0-a-16 | foreign-arena writer message arena name unpinned (KN7): pin the whole text (K05, N11e equivalent) | note 18

### M0-b-02

- M0-b-02:7 1 N1 | FIX-NOW | M0-b-02 | straight cut's two-end re-check untested (m40 survives): two-gap straight-cut test | N1; planner.ts:967-977
- M0-b-02:12 2 N2 | NOTE | M0-b-02 | m16 equivalent; λ = 2o test exists | 
- M0-b-02:14 3 N3 | FIX-NOW | M0-b-02 | planner accepts minFrontageM < minEdgeCm/100 (m29 equivalent only on honest inputs): refuse it, or test the case | N3
- M0-b-02:19 4 N4 | FIX-NOW | M0-b-02 | dropped-K straight leg A→foot can cross a hole (5/2 580 on holed faces): test segmentClear(A, foot) when K is dropped; keep K or return E_NOT_TWO_CROSSINGS flatten | N4
- M0-b-02:26 5 N5 | FIX-NOW | M0-b-02 | a slide can lower a kept corner below the flatten threshold (C-0222 (10) step order): decide whether slid geometry re-runs the flatten test; choices row either way | N5
- M0-b-02:32 6 N6 | FIX-NOW | M0-b-02 | T36-1 "draws nothing" sub-test is self-referential: drop or relabel | N6
- M0-b-02:35 7 N7 | FIX-NOW | M0-b-02 | renumbering property fixed at 200 cases: read PLAT_FUZZ_RUNS | N7
- M0-b-02:37 8 N8 | DONE | M0-b-03 | planner exports handed over through infill/index.ts (planCut, workingFrame) | layout/src/infill/index.ts:10
- M0-b-02:51 N9 | FIX-NOW | M0-b-02 | gap + edge dropped by rounding in inGap (~5 % of portal positions; 8 nextRung cases): skip the own gap or compare with half-unit tolerance; pin seed-9 trapezoid | N9
- M0-b-02:52 N10 | FIX-NOW | M0-b-02 | T37-1 curved squareness reference shares sideDir with the planner (c03 survives): farDirAt via runTangent(run, foot, 500), or a sides.test case sideDir ≡ runTangent | N10
- M0-b-02:53 N11 | FIX-NOW | M0-b-02 | stream reroll/epoch components unpinned by value (c11/c12): twin tests at reroll≠0, epoch≠0 for cut.stop, cut.t, cut.arc | N11; §6.1

### M0-b-03

- M0-b-03:10 N-1 | CARRY-FORWARD | M0-b-03 | all S8 blocks deep under today's tables — depth rows re-fitted at M-1 (§4.6 step 1, E12); M0-c-06 reads deep share as uncalibrated | M-1 / M0-c-07a
- M0-b-03:11 N-2 | CARRY-FORWARD | M0-b-03 | ~half of back_lane/through_alley spines refused by the block floor (child ≈ ½t < d_lo), drifting shares to court; re-read the child floor with a choices row and re-judge with N-1's re-fit | M-1 re-fit; M1 court-share row
- M0-b-03:12 N-3 | FIX-NOW | M0-x-05 | substitution rung area bound untested (K19): face above 2·e_hi² reaching (d) — cut by (c)'s slide or unresolved, never a court | N-3; C-0085
- M0-b-03:13 N-4 | FIX-NOW | M0-x-05 | reflex pre-cut and antenna split unit-tested only (K38/K37): S8-run fixtures (L-face deeper than d̄; face around a cul-de-sac antenna) | N-4
- M0-b-03:14 N-5 | FIX-NOW | M0-x-05 | W_CUT_SLID reporting on an S8 run untested (K39): assert warning and step count on a slide fixture | N-5
- M0-b-03:15 N-6 | FIX-NOW | M0-b-03 | step 10 continuation wiring untested (K23): fixture with a cut within attractCm of an interior lane junction (collinear ≤6° admitted, else refused) and one on a bounding spine | N-6; L25
- M0-b-03:16 N-7 | FIX-NOW | M0-b-03 | Portal.bearing direction unpinned (K44) — persisted in the Seam record: assert 270° west / 90° east | N-7
- M0-b-03:17 N-8 | DUPLICATE | M0-x-04 | KernelTx.expect BLOCK_FLOOR_ROW inert without injected floors; appliesTo for block when the runner injects — rides Q39 (S8 batches through the runner's batch door) | Q39
- M0-b-03:18 N-9 | DONE | M0-b-03 | seam-portals evaluated at every S8 end | Q15 DONE 952b24f8
- M0-b-03:19 N-10 | FIX-NOW | M0-b-03 | T34-1 commit clause judged on stop-test blocks only: one sentence in a choices row (court/unresolved/work/empty exempt by construction) | N-10
- M0-b-03:20 N-11 | DONE | M0-b-03 | undo failure abandons the district batch (detect-and-refuse) | C-0243 (3) (N-17 confirms the path)
- M0-b-03:21 N-12 | FIX-NOW | M0-b-03 | fallback constants (continuationCdeg 600, softShare 0.05) when a cut cell is unreadable: refuse (stopError) like the other cells | N-12
- M0-b-03:22 N-13 | FIX-NOW | session | superseded interior.json settings.deepFactor = 2 unread: name its re-fit in M0-c-07a's hand-over or stage the cell | N-13; C-0237 (6)
- M0-b-03:23 N-14 | FIX-NOW | M0-b-03 | test support faceCase cannot always find the district face (ring equality): locate by pointLocate | N-14
- M0-b-03:24 N-15 | DONE | M0-b-04 | per-district residue soft bound reported in the bentcut summary (residueSoftExceeded) | summaries/M0-b-04.json; Q25
- M0-b-03:25 N-16 | FIX-NOW | M0-b-03 | end-rows touched mark untested (K03): fixture forcing an end row to fail with a later candidate on the same face | N-16
- M0-b-03:26 N-17 | FIX-NOW | M0-b-03 | C-0243 (3) abandonment untested (K07/K10/K11/K12): inject faceAgain/takeOut failure; assert typed refusal, no commit, unchanged digests | N-17
- M0-b-03:27 N-18 | NOTE | M0-b-03 | K06/K08/K09/K13 equivalent | 
- M0-b-03:28 N-19 | FIX-NOW | M0-b-03 | refused district batch leaves stale entries in the shared widths map: snapshot in partition, restore on k.tx refusal | N-19
- M0-b-03:29 N-20 | NOTE | M0-b-03 | K10/K12 equivalent; re-pin if makeBlock ever accepts a slit | 
- M0-b-03:30 N-21 | FIX-NOW | M0-b-03 | deep block whose spine runs onto a hole keeps a court (18/98 deep rungs): try an offset spine (or parallel to the hole's long side) before the court; count recovered | N-21; C-0288 (2)
- M0-b-03:31 N-22 | FIX-NOW | M0-b-03 | portalInvariant unresolved (K21) and two-portals (K15) branches lack pins: planted-record pins in seamPortalsRow.test.ts | N-22
- M0-b-03:32 N-23 | DUPLICATE | M0-b-03 | S4 survivors K13, K16, K19-K23 and the antenna corner check — home L25 | L25
- M0-b-03:33 N-24 | NOTE | M0-b-03 | S4 one-time shift reaches integrated 1–7; c-06's continuation expects each digest to move once | N-24
- M0-b-03:34 N-25 | FIX-NOW | M0-b-03 | a split child's kerb with two components on one side leaves a seedless part (integrated 5, fusion 28; driftBeyond 2/6): session ruling — one seed per kerb component (record format, owner-gated) or the harness's split reading; correct C-0338's KI sentence; see §5 | N-25; C-0338; Q60 / N-60 (b)
- M0-b-03:35 N-26 | FIX-NOW | M0-b-03 | S5 survivors C11 (child with no component inside the parent) and C12 (holed-face pole) unpinned: makeBlock case and extend the holed-face property to split children | N-26
- M0-b-03:36 N-27 | NOTE | session | block id typo in J318 (block:628bxf1f87e33) | 

### M0-b-04

- M0-b-04:12 N-1 | FIX-NOW | M0-b-04 | F-CUT depth-0 ladders end unresolved on 59/1e5 concave faces, not named in the verdict: print the unresolved count beside the F-CUT verdict and a choices row that unresolved ends the ladder; rung (c) on concave faces is b-03 N-3's class (M0-x-05) | N-1
- M0-b-04:13 N-2 | FIX-NOW | M0-b-04 | arrival clause ~100 % by construction (measured against the planner's own direction): report a committed-geometry arrival beside the judged one (planner cuts and all lanes) | N-2; C-0242 (6)
- M0-b-04:14 N-3 | FIX-NOW | M0-b-04 | corner/arrival clauses do not gate on replay misses: fail or flag when missed > 0 or a bent cut lacks cornerT | N-3
- M0-b-04:15 N-4 | FIX-NOW | M0-b-04 | harness survivors K15, K16, K13/K27, K30, K12, K21, K09: planted-record cases through run(), a rung-(b)/(c) lane in the replay test, a refused district in fold tests, an overLimit replay | N-4
- M0-b-04:16 N-5 | FIX-NOW | M0-b-04 | replay landing tolerance unpinned (K10): lands test refusing a 28 cm offset | N-5
- M0-b-04:17 N-6 | NOTE | M0-b-04 | K11/K22 equivalent | 
- M0-b-04:18 N-7 | CARRY-FORWARD | M0-b-04 | straightFirst branch never exercised (MFCG preset) — run the signature under the MFCG cells when the parity presets land | M1 parity presets / M0-b-05b
- M0-b-04:19 N-8 | FIX-NOW | M0-b-04 | worker pool has no exit handler (an OOM-killed worker hangs the run): handle exit with non-zero code as failure | N-8; bench/src/bentcut/pool.ts

### M0-b-05

- M0-b-05:8 1 | NOTE | M0-b-05 | K29 equivalent (gridValues ascending); optional comment | 
- M0-b-05:9 2 | FIX-NOW | M0-b-05 | duplicate σ rows: tolBand overwrites M0-k-05's diagnosis note: keep or append it when baselineIds.length !== 1 | note 2; verdicts.ts 83-87
- M0-b-05:10 3 | CARRY-FORWARD | M0-b-05 | phase b gates every ⟨M-1⟩ subset key ours emits; if M-1 delivers whole-sample rows only, M0-b-05b cannot pass — settle (ask M-1 for subset rows or narrow to §13.5's keys) before M0-b-05b runs | AFTER-M-1 M0-b-05b; C-0256 (4)
- M0-b-05:11 4 | FIX-NOW | M0-b-05 | T-bar clauses checked in part (T38-1 tangency, lower bound; T39-1 proxy): add tangency and lower-bound checks; straightFirst run with the parity presets | note 4; C-0256 (7)
- M0-b-05:12 5 | FIX-NOW | M0-b-05 | a worker dying without an error event hangs runNgTasks: handle exit | note 5; pool.ts 31-63
- M0-b-05:13 6 | FIX-NOW | M0-b-05 | flattenSearch returns a Promise of a superset: a word in C-0256 or the interface list (doc) | note 6
- M0-b-05:14 7 | FIX-NOW | M0-b-05 | replay misses do not gate (carried from M0-b-04): gate on a missed-share bound or report it as a clause | note 7; M0-b-04 N-3
- M0-b-05:15 8 | FIX-NOW | M0-b-05 | phase a --apply writes tables whatever the verdict: print the verdict beside "applied" | note 8
- M0-b-05:16 9 | FIX-NOW | M0-b-05 | σ missingKey guard untested (C16): judgeB case — ring face with no cut gives cut.sigma/ring notApplicable and fails | note 9

### M0-c-01

- M0-c-01:5 1 N-1 | FIX-NOW | M0-c-01 | gatesOnBoundary(routes, t1, set) differs from the listed signature with no choices row: a choices line (or take the Field) | N-1
- M0-c-01:9 2 N-2 | FIX-NOW | M0-c-01 | OUTLINE_CHAIKIN_PASSES = 2 code constant while ways.json holds graph.chaikinPasses: read the cell (one source) | N-2; C-0201 (5)
- M0-c-01:12 3 N-3 | FIX-NOW | M0-c-01 | several selection components: the largest wins with no report: a requestedVsBuilt row or typed warning | N-3; N-14
- M0-c-01:16 4 N-4 | FIX-NOW | M0-c-01 | filled pockets count as land in levelSet.landCm2 with no report row: report the filled excess | N-4
- M0-c-01:19 5 N-5 | FIX-NOW | M0-c-01 | a route with no gate stays in T's road set; gatesDropped names no ordinal: name it, list in unserved | N-5
- M0-c-01:22 6 N-6 | FIX-NOW | M0-c-01 | gatePicks taken exclusion (K06) equivalent in practice: forcing test (contour of two candidates) | N-6
- M0-c-01:25 7 N-7 | FIX-NOW | M0-c-01 | duplicate-route permutation subtest misses a parity mutant (K09): compare roadSet for [...r, r[0]] | N-7
- M0-c-01:29 8 N-8 | FIX-NOW | M0-c-01 | side check after simplify (K19) redundant on tested inputs: fixture carrying a guard node across, or a comment | N-8
- M0-c-01:32 9 N-9 | DONE | M0-c-01 | GATE_REDRAWS cap fixture kills K25 | N-14
- M0-c-01:36 10 N-10 | CARRY-FORWARD | M0-c-01 | plaza area bands, compactness floor and pick-score weights held in plaza.ts (C-0201 (3)) — M1's reservation rows and rule table take them over | M1 reservation rows
- M0-c-01:38 11 N-11 | DONE | M0-a-05 | foreign testkit agreement red (router crossing) closed by the insertChain fix rounds | M0-a-05 S1–S8; agreement green since
- M0-c-01:42 12 N-12 | NOTE | M0-c-01 | relief smoothing guard may refuse every pass — correct by C-0201 (5); e-06 runs relief | 
- M0-c-01:49 13 N-13 | FIX-NOW | M0-c-01 | a bridgehead gate can stand in the river up to half a spacing (3/460 layouts, 10-12 m deep): decide bank snap or C-0087 water gate; bound the gate's distance from the bank; update the heads pin | N-13; C-0204 (2)
- M0-c-01:62 14 N-14 | NOTE | M0-c-01 | status of earlier notes (N-9 closed; N-3 stays open as its own row) | 
- M0-c-01:67 15 N-15 | DONE | M0-c-03 | deckOf −1 pin added in backbone/route.test.ts | Q24 DONE f3a038d2
- M0-c-01:74 16 N-16 | FIX-NOW | M0-c-01 | edgeCost is exported and applies no frame rule (only buildLattice cuts decks): source-scan test that edgeCost is called only from buildLattice, or edgeCost takes the frame | N-16
- M0-c-01:80 17 N-17 | CARRY-FORWARD | M0-c-01 | frame test reads the ring, M0-x-06 fixture reads the bbox — same while every frame is an axis-aligned rectangle; reconcile when frames of other shapes arrive | non-rectangular frames (post-M0)
- M0-c-01:100 src/siting/geom.ts:17 private CDEG_PER_… | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:101 src/siting/slice.ts:40 private HA_CM2;… | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:102 geom.ts distToSegment (one body ending… | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:103 src/siting/lattice.ts:14 private COS30,… | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:104 src/siting/routes.ts:32 private WorkLim… | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:105 routes.ts gateRoutes :96–97 and reroute… | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:106 geom.ts header | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:107 src/siting/levelset.ts:287 (the second… | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:108 test/siting/lattice.test.ts | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:109 test/siting/gates.test.ts | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:110 test/siting/fwall.test.ts | NOTE | M0-c-01 | R1 change row | layout-plan §1.0
- M0-c-01:150 N-c1-1 | NOTE | M0-c-01 | plan count / H4 equivalent | 
- M0-c-01:152 N-c1-2 | NOTE | M0-c-01 | plan count / H4 equivalent | 
- M0-c-01:162 N-c1c-1 | FIX-NOW | M0-c-01 | boxOf minimum y unpinned for a ring wholly north of y=0 (X3): boxOf case in x>0,y>0 and a water-rule band north of the nucleus | N-c1c-1
- M0-c-01:169 N-c1c-2 | FIX-NOW | M0-c-01 | reroute work-limit exit unreached (H13): fwall case with a tilted site whose reroute hits routeNodesLimit (reroute rung to:-1, no throw) | N-c1c-2
- M0-c-01:175 N-c1c-3 | FIX-NOW | M0-c-01 | reroute outward stretch not pinned as least-cost (H14 changes 7/264 probes): pin rerouted cost = Dijkstra on the selection-blocked graph | N-c1c-3; C-0201 (6)
- M0-c-01:183 N-c1c-4 | DUPLICATE | M0-c-01 | reroute first rim target (H15) — covered by N-c1c-3's pin | N-c1c-3
- M0-c-01:187 N-c1c-5 | NOTE | M0-c-01 | rim target order equivalent (H1) | 
- M0-c-01:191 N-c1c-6 | FIX-NOW | M0-c-01 | geom.ts header "the one home of exact plane geometry" while copies remain: re-read after R11 (say "the shared home" if a copy stays) | N-c1c-6

### M0-c-02

- M0-c-02:6 1 N-1 | DONE | M0-c-02 | graze departure now measured against the boundary as given (B-1's fix) | checks/M0-c-02.md closing round; C-0232 (3)
- M0-c-02:14 2 N-2 | ROUTED-TO-CENSUS | M0-c-02 | F-WALL trace refused E_SELF_INTERSECT on relief (pull sawtooth; probes PH/PI/PC) — "S5 F-WALL self-touch" class | Q46; Q52 E; KI-10
- M0-c-02:23 3 N-3 | FIX-NOW | M0-c-02 | §4.4 inward-pull cap (S5d tolerance) neither built nor named: build it or stage it with a choices row (M0-c-05 or M1) | N-3; C-0226
- M0-c-02:27 4 N-4 | FIX-NOW | M0-c-02 | survivors M26/M27 (strip guards) and M34 (selfTouches adjacent fold-back) off the listed promises; M35 equivalent: hardening tests | N-4; N-44
- M0-c-02:34 5 N-5 | FIX-NOW | M0-c-02 | trace.ts claims each bank vertex is re-checked after commit; only main gates are: check the banks or reword | N-5
- M0-c-02:37 6 N-6 | FIX-NOW | M0-c-02 | water can split a strip into two faces of one owner: C-0226 (10) states the reading (choices wording) | N-6
- M0-c-02:40 7 N-7 | FIX-NOW | M0-c-02 | departure() samples every metre (reads high by <1 cm): an exact measure or a stated tolerance in the check | N-7
- M0-c-02:49 8 N-8 | FIX-NOW | M0-c-02 | in-batch band re-proof (N04) has no failing test: plant a vertex within 26 cm outside a band-edge trace vertex; assert refused band, nothing written | N-8; C-0232 (2)
- M0-c-02:60 9 N-9 | FIX-NOW | M0-c-02 | band margins/reference rings unpinned (N06, N10, N12, N13, N17); smoothing rounds after proving: prove the rounded points; chorded-crossing fixture under an outward field | N-9; C-0232 (3)
- M0-c-02:72 10 N-10 | FIX-NOW | M0-c-02 | chord-in-water test sampled at nine points and reads outer rings only: exact test (no ring edge crossed, holes included); spit and island fixtures | N-10
- M0-c-02:87 11 N-11 | FIX-NOW | M0-c-02 | the two water proofs (K05/K06/K07) have no failing test; prove rounded points so the pond case commits; pond pin; attraction-onto-wet-edge fixture | N-11; C-0282
- M0-c-02:102 12 N-12 | NOTE | M0-c-02 | K09/K12/K13 redundant alone (K14 killed); unit case only if contracts change | 
- M0-c-02:109 13 N-13 | FIX-NOW | M0-c-02 | side test corners unpinned (K18, K19): sides.test cases (non-adjacent shore vertices across water; firstOver closing side) | N-13
- M0-c-02:117 14 N-14 | FIX-NOW | M0-c-02 | pull ramp steps unpinned (K26): pin the replay's report.pull (now moved 150, line 224) and a ramp-step fixture | N-14; N-46
- M0-c-02:132 15 N-15 | FIX-NOW | M0-c-02 | bank settling corners unpinned (M15, M27): probes P1/P2 as crossWater cases in chord.test.ts | N-15
- M0-c-02:142 16 N-16 | FIX-NOW | M0-c-02 | settled chord leaving the water unpinned (M14): crossWater case whose shore vertex pulls a bank off the water — clear false, refused | N-16
- M0-c-02:148 17 N-17 | FIX-NOW | M0-c-02 | waterGates(trace, water, k) untested with arena vertices (M20): case on the synthetic graze with bankAt[0] = shore vertex V | N-17
- M0-c-02:153 18 N-18 | DUPLICATE | M0-c-02 | in-commit edge proof (M23) untested — N-11 of this file | N-11
- M0-c-02:159 19 N-19 | ROUTED-TO-CENSUS | M0-c-02 | S3 strict refusal "water: the crossing … has no clear chord (its chord would leave the water)" (1/24 relief-60 derivations) — lawful | Q46; Q52 D
- M0-c-02:174 20 N-20 | DUPLICATE | M0-e-06 | seed 9 no longer exercises the graze; M0-e-06's hand-built chord pin owed — M0-e-06 notes 15 | M0-e-06-notes 15; Q29
- M0-c-02:181 21 N-21 | FIX-NOW | M0-c-02 | stage-2 replay cost-field coverage narrowed (misses within 80 m read cost 0): recapture costs around the settled bank; restore misses 0 | N-21; C-0300
- M0-c-02:197 22 N-22 | FIX-NOW | M0-c-02 | corridor bound pinned by value only (Z03/Z04): pin family seed 1149953023 (or 3436289613) typed, and a hand twin 80–140 cm in refused | N-22
- M0-c-02:212 23 N-23 | FIX-NOW | M0-c-02 | outer side's corridor clauses unpinned (Z10 types an outer face 1.1–2 m in on 3/300): twin whose outer face holds the gate vertex refused | N-23
- M0-c-02:219 24 N-24 | FIX-NOW | M0-c-02 | strip-width clause unpinned (Z12): twin where a strip probe meets open ground beyond the strip width | N-24; C-0226 (10)
- M0-c-02:227 25 N-25 | NOTE | M0-c-02 | Z06 equivalent | 
- M0-c-02:229 26 N-26 | FIX-NOW | M0-c-02 | committed strip faces cover an arterial's corridor away from the gate (42/1000 seeds) — session ruling: defect of the strip or of the route; then membership by area or setback cut along the whole way; see §5 | N-26
- M0-c-02:245 27 N-27 | NOTE | session | owner-only shift land:0 → wall_strip accepted as part of the Q22 fix | C-0311 (4)
- M0-c-02:252 28 N-28 | FIX-NOW | M0-c-02 | 6/1000 seeds leave a 1-2 m strip piece untyped (land:0): separate a cap closed past a deep trace vertex from a true crossing (area, or re-cut on the corridor edge) | N-28; C-0311 (4)
- M0-c-02:259 29 N-29 | NOTE | session | clean-room/working-rule slips disclosed | 
- M0-c-02:282 30 N-30 | DUPLICATE | M0-c-02 | Y07 bank-route chord clause — home L31 | L31
- M0-c-02:294 31 N-31 | DUPLICATE | M0-c-02 | Y12/Y15/Y17/Y13 route guards — home L31 | L31
- M0-c-02:309 32 N-32 | ROUTED-TO-CENSUS | M0-c-02 | boundary intruding into a U-shaped water body by its inner shores refused E_INVARIANT water (our own intermediate if reached) | N-32
- M0-c-02:321 33 N-33 | ROUTED-TO-CENSUS | M0-c-02 | lawful S5/S3 refusals: RIVER 900 ha seeds 8, 14, 12; RIVER_BLUEPRINT 3, 4, 5; relief-60 seed 2 | Q46
- M0-c-02:334 34 N-34 | DUPLICATE | M0-c-04 | earlierWaterGates guard redundant — home L31 (the RELATED red is Q41, DONE) | L31; Q41
- M0-c-02:344 35 N-35 | NOTE | session | disclosures | 
- M0-c-02:358 36 N-36 | NOTE | M0-c-02 | R8 map / 1.3.2 equivalence and a KI-only nuance (public wetSides RangeError on non-lattice ring: unlawful, typed) | C-0336
- M0-c-02:379 37 N-37 | NOTE | M0-c-02 | R8 map / 1.3.2 equivalence and a KI-only nuance (public wetSides RangeError on non-lattice ring: unlawful, typed) | C-0336
- M0-c-02:396 38 N-38 | NOTE | M0-c-02 | kernel keys arenas by value (J302 Q6) | 
- M0-c-02:409 39 N-39 | FIX-NOW | M0-c-02 | R8 survivors A07 (commitS3Slice warnings), A08 (plaza handed to the trace), A11 (depthOf far-side shortcut): pins | N-39; N-42; N-43
- M0-c-02:419 40 N-40 | FIX-NOW | M0-c-02 | M06/M07 (smoothing vertex clause alone) survive; not exactly equivalent (bandCm−TOUCH_CM vs bandCm−1): pin a vertex between the limits | N-40
- M0-c-02:429 41 N-41 | NOTE | M0-c-02 | NO-SHIFT and census: base 0→0; the three EP-01/S5a/coincident refusals are Q37's | Q37
- M0-c-02:465 42 N-42 | DUPLICATE | M0-c-02 | plaza pin (A04/A08) — N-39 | N-39
- M0-c-02:474 43 N-43 | DUPLICATE | M0-c-02 | commitS3Slice warnings pin (A07) — N-39 | N-39
- M0-c-02:482 44 N-44 | NOTE | M0-c-02 | recorded mutants re-judged; K20 equivalent through the strategy; M34 as N-4 | 
- M0-c-02:493 45 N-45 | FIX-NOW | M0-c-02 | comment tightening: C-0300 (1) vs (3) citations; counterfactual figures in test headers (comments) | N-45
- M0-c-02:500 46 N-46 | NOTE | session | session notes (151 vs 150; traceWithStrips plaza type; wetSides precondition measured; Q41 red) | 

### M0-c-03

- M0-c-03:6 1 | FIX-NOW | M0-c-03 | report.offGate has no positive control (X29): synthetic routesFromSlice part meeting the wall off its gate, offGate = 1 | note 1
- M0-c-03:11 2 | FIX-NOW | M0-c-03 | stretchShared mixes way–way braids with a way sharing the plaza ring (smallSite 5): count only way–way shares, or keep the chain's second vertex ≥ attractCm off the plaza ring | note 2
- M0-c-03:17 3 | DONE | M0-c-03 | band exclusion of decks beyond the first given-up deck's band | note 13; C-0297 (2); Q24
- M0-c-03:22 4 | FIX-NOW | M0-c-03 | foldParallel can splice in a loop (PLAUSIBLE): run the repeat/loop cut on the folded route | note 4
- M0-c-03:26 5 | FIX-NOW | M0-x-05 | F-ROUTE rungs' path from the slice into S4Report.rungs untested: per-rung fixtures through runBase | note 5; C-0085
- M0-c-03:30 6 | FIX-NOW | M0-c-03 | §4.3 Test clause "every deck's way within ±10° of the channel normal" untested: assert it on M0-e-06's river fixture | note 6
- M0-c-03:33 7 | NOTE | M0-c-03 | Y→T never applied on CITY; exercised on synthetic graphs | 
- M0-c-03:36 8 | FIX-NOW | M0-c-03 | §13.2 walk in backbone.test.ts follows arena edge order: walk wayLine(...) | note 8
- M0-c-03:45 9 | FIX-NOW | M0-c-03 | T band edges unpinned (N04 75–105° → 70–110°): fixture with branches at 74/76° and 104/106° asserting Y,T,T,Y | note 9
- M0-c-03:50 10 | FIX-NOW | M0-c-03 | class from first chain / knot on first chain of a run (N08/N09) never occur on honest sites: commitRoutes fixture with two inward routes sharing only their gate end | note 10
- M0-c-03:58 11 | NOTE | M0-c-03 | N12 equivalent (addWarning merges by code) | 
- M0-c-03:61 12 | FIX-NOW | M0-c-03 | junction kinds read from smoothed courses even when the batch falls back to lattice courses: recompute kinds from committed courses after a fallback | note 12
- M0-c-03:76 13 | NOTE | M0-c-03 | status: note 3 closed by C-0297 (2) | 
- M0-c-03:79 14 | FIX-NOW | M0-c-03 | band measured once from the first deck given up (Z10) while §5.2 reads it per crossing — a second-reach usable site can be lost: measure per deck; synthetic two-river fixture | note 14; §5.2
- M0-c-03:86 15 | FIX-NOW | M0-c-03 | band rule details unpinned (Z09, Z11, Z16): one synthetic fixture each | note 15
- M0-c-03:91 16 | FIX-NOW | M0-c-03 | slope rung after a failed band search unpinned (Z17, Z18; unreachable without grade limits, C-0158): synthetic part with grade limits | note 16
- M0-c-03:97 17 | FIX-NOW | M0-x-04 | run report never receives S3/S4 unserved parts or F-ROUTE rungs (stageS3/stageS4 do not call ctx.report.unserved/ladderUse): forward them in pipeline/base.ts | note 17
- M0-c-03:119 src/backbone/junctions.ts private PI (3… | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:120 src/backbone/route.ts private COS30 (0.… | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:121 src/backbone/route.ts private class Wor… | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:122 src/backbone/route.ts private dist(a, b) | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:123 src/backbone/graph.ts private footDist | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:124 src/backbone/graph.ts private orient an… | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:125 src/backbone/stage.ts private unit | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:126 src/backbone/stage.ts private heightsOf | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:127 src/backbone/commit.ts the Junction.arm… | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:128 test/backbone/{classify,junctions,route… | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:129 test/backbone/{backbone,water}.test.ts… | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:130 test/backbone/route.test.ts nearest(lat… | NOTE | M0-c-03 | R7 old→new helper map row | layout-plan §1.4
- M0-c-03:177 A01 | DUPLICATE | M0-c-03 | A01 directionCdeg scale — N-c1b-1 | N-c1b-1
- M0-c-03:178 A02 | NOTE | M0-c-03 | R7 mutant killed | 
- M0-c-03:179 A03 | NOTE | M0-c-03 | R7 mutant killed | 
- M0-c-03:180 A04 | DUPLICATE | M0-c-03 | A04 routeGraph cone — N-c1b-2 | N-c1b-2
- M0-c-03:181 X38 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:182 A05 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:183 A06 = X22 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:184 A07 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:185 A08 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:186 A09 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:187 A10 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:188 A11 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:189 A12 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:190 A13 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:191 A14 (≈ X16) | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:192 A15 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:193 A16 (≈ X20) | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:194 A17 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:195 X01, X02, X03, X07, X08, X23, X25, X35,… | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:196 N02, N14, N15, N07, N07m | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:197 Z20 | NOTE | M0-c-03 | R7 mutant killed (some by assertions added this round) | 
- M0-c-03:203 N-c1b-1 | FIX-NOW | M0-c-03 | directionCdeg exported value unpinned (A01): assert it on the four axis directions | N-c1b-1
- M0-c-03:206 N-c1b-2 | FIX-NOW | M0-c-03 | routeGraph's own 30° cone redundant with the lattice's (A04/X38): two-deck synthetic lattice (decks <1 spacing apart, >30° to each other) | N-c1b-2; N-c1c-2
- M0-c-03:210 N-c1b-3 | ROUTED-TO-CENSUS | M0-c-02 | base chain small river frame seed 27 refuses S3 E_INVARIANT "trace: gate gate:1 is not on the committed trace at its point" (lawful) | Q52 C
- M0-c-03:229 N-c1c-1 | FIX-NOW | M0-c-03 | fold nearness measure unpinned (R04): graph.test fold fixture parallel to the middle of a long earlier segment | N-c1c-1; C-0236 (16)
- M0-c-03:230 N-c1c-2 | DUPLICATE | M0-c-03 | routeGraph cone — N-c1b-2 | N-c1b-2
- M0-c-03:231 N-c1c-3 | DUPLICATE | M0-c-02 | S3 seed-27 refusal — N-c1b-3 (census); disclosure noted | N-c1b-3

### M0-c-04

- M0-c-04:6 1 N-1 | FIX-NOW | M0-c-04 | resettleT lowered list on exact ties (B05 inflates GrowthStage.lowered): test on a lattice with a symmetric tie | N-1
- M0-c-04:10 2 N-2 | FIX-NOW | M0-c-04 | nothing pins "to the frame at its bearing" (M12/N10 change every CITY print): assert the end at the rim node at the bearing, or record the out-frame fallback | N-2; N-22
- M0-c-04:15 3 N-3 | FIX-NOW | M0-c-04 | guards no tested seed reaches (M14, M15, M29, B15; fallbacks and invalid refusal): unit fixture per guard, and a check that S5b roads meet standing ways only at their junction vertex (C-0244 (6)) | N-3; N-25
- M0-c-04:26 4 N-4 | FIX-NOW | M0-c-04 | defensive fixes no seed needs (B10 gate snap, M16 APPROACH_NODES): fixtures that need them, or record them in C-0244 as defensive | N-4
- M0-c-04:31 5 N-5 | FIX-NOW | M0-c-04 | branches integrated runs never take (N_k ≤ c → none end to end; capped unfolded S5b, short record — M32 survives): fixture with c ≥ N_k and a capped stage that adds land | N-5
- M0-c-04:38 6 N-6 | FIX-NOW | M0-c-04 | "never recomputed per stage" checked only by reading: spy/count Dijkstra runs, or assert lowered ⊂ nodes strictly | N-6
- M0-c-04:42 7 N-7 | FIX-NOW | M0-c-04 | s5aStage declares txForm 'declared' while its trace runs callback batches: align the declaration or the choices row (M0-x-04 enforces) | N-7; C-0244 (8)
- M0-c-04:46 8 N-8 | FIX-NOW | M0-c-04 | bar's §13.2 descriptive rows only console.logged (no durable record): write them to a report under docs/build/ | N-8; C-0244 (12)
- M0-c-04:53 9 N-9 | FIX-NOW | M0-c-04 | c counts a meeting, not a crossing (a graze counts; recount shares the reading): count only sign-changing meetings in code and recount; tangent-way fixture | N-9; C-0248
- M0-c-04:68 10 N-10 | FIX-NOW | M0-c-04 | always-rejected planning batch counted as a refused S5 batch (and work spent twice): plan without a batch (C-0285 prelude hook) or mark it so receipts skip it | N-10
- M0-c-04:74 11 N-11 | FIX-NOW | M0-c-04 | two-gates-at-one-bridgehead guard unpinned (X11): pin probe P6's message | N-11
- M0-c-04:77 12 N-12 | FIX-NOW | M0-c-04 | dead/redundant code (X09 bearingCdeg never read; X08 gate splits redundant): pin a case where they matter or record as defensive in C-0285 | N-12
- M0-c-04:82 13 N-13 | FIX-NOW | M0-c-04 | a crossing within 2·TOUCH_CM of the far deck end gates at the far end (vertex snap before span rule), against C-0285 (1)'s wording: record the precedence or apply the span rule first | N-13
- M0-c-04:87 14 N-14 | FIX-NOW | M0-c-04 | withinTraceBatch arms only the first callback batch (trace and strips): test one callback batch, or take C-0285's prelude hook | N-14; N-18
- M0-c-04:97 15 N-15 | DUPLICATE | M0-c-04 | stageStops copies stopsFromArena's way-stop rule — home Q27 | Q27; C-0292
- M0-c-04:109 16 N-16 | FIX-NOW | M0-c-04 | strips batch water proof checks vertices only (a setback edge crossing a water corner with dry ends passes): test each setback edge's crossing; pin with a withheld stop | N-16
- M0-c-04:118 17 N-17 | DONE | M0-c-04 | pin 5 re-targeted (S3) | N-19 (N-17 closed by S3); Q29
- M0-c-04:134 18 N-18 | DUPLICATE | M0-c-04 | single-batch seam covers strips too — N-14 | N-14
- M0-c-04:138 19 N-19 | FIX-NOW | M0-c-02 | span.test pin 5 matches M0-c-02's refusal text verbatim: a typed reason or stable tag (water: loose-gate) for the chord refusal, or loosen the pin | N-19; C-0300
- M0-c-04:162 src/growth/mainRoads.ts private idNumbe… | NOTE | M0-c-04 | R11 old→new helper map row | C-0354
- M0-c-04:163 src/growth/mainRoads.ts private heights… | NOTE | M0-c-04 | R11 old→new helper map row | C-0354
- M0-c-04:164 src/growth/mainRoads.ts private rimAtBe… | NOTE | M0-c-04 | R11 old→new helper map row | C-0354
- M0-c-04:165 src/growth/mainRoads.ts private boxOf(p… | NOTE | M0-c-04 | R11 old→new helper map row | C-0354
- M0-c-04:166 src/growth/boundary.ts traceStage1's ta… | NOTE | M0-c-04 | R11 old→new helper map row | C-0354
- M0-c-04:167 src/growth/boundary.ts private segD2(p,… | NOTE | M0-c-04 | R11 old→new helper map row | C-0354
- M0-c-04:168 src/growth/boundary.ts export const HA_… | NOTE | M0-c-04 | R11 old→new helper map row | C-0354
- M0-c-04:169 test/growth/s5ab/span.test.ts header an… | NOTE | M0-c-04 | R11 old→new helper map row | C-0354
- M0-c-04:257 N01 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:258 N02 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:259 N03 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:260 B12s | NOTE | M0-c-04 | B12s killed on its owner's folder (N-21) | 
- M0-c-04:261 N06 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:262 M01 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:263 N07 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:264 N08 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:265 M19 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:266 M20 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:267 M10b | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:268 M11 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:269 M02 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:270 M13a | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:271 M13b | DUPLICATE | M0-c-04 | M13b survivor — N-20 | N-20
- M0-c-04:272 B07 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:273 B08 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:274 B09 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:275 B11 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:276 B14 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:277 X02 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:278 X03 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:279 X04 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:280 X05 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:281 X06 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:282 X07 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:283 X12 | NOTE | M0-c-04 | R11 mutant killed | 
- M0-c-04:284 N09 | NOTE | M0-c-04 | N09 equivalent on every reachable input | 
- M0-c-04:285 N10 | DUPLICATE | M0-c-04 | N10 survivor — N-2 / N-22 | N-2
- M0-c-04:291 20 N-20 | FIX-NOW | M0-c-04 | the junction a road starts from has no pin (M13b changes all 16 CITY prints): pin each S5b road's from junction on one seed, or a hand case keeping the nearer candidate | N-20
- M0-c-04:300 21 N-21 | NOTE | M0-c-04 | stage1.test now compares two calls of one function; widths pinned by the owner's test | 
- M0-c-04:306 22 N-22 | DUPLICATE | M0-c-04 | outer course rim at the bearing — N-2 | N-2
- M0-c-04:324 23 N-23 | FIX-NOW | M0-c-04 | S5b road batch lineage index unpinned (K04 changes every S5b way's lineage — §6.3 regeneration key): pin lineageHash(index n) for way:n on one CITY seed | N-23
- M0-c-04:333 24 N-24 | FIX-NOW | M0-c-04 | stage1.test pins commitS3ThenStage1 only without water and never its warnings (K11/K13): add a river-band water case and warnings equality | N-24
- M0-c-04:342 25 N-25 | DUPLICATE | M0-c-04 | roadFault near filter (K08) — N-3 | N-3
- M0-c-04:349 26 N-26 | FIX-NOW | M0-c-04 | stray copy of courses' header above interface Routing (mainRoads.ts:593-602): delete (comment) | N-26
- M0-c-04:358 27 N-27 | NOTE | session | C-0354 (7) names citations the files do not hold; read N-45 as N-54 (3) | 

### M0-c-05

- M0-c-05:6 1 N-1 | NOTE | M0-c-05 | M17 equivalent (armsSquare checks the met segment) | 
- M0-c-05:9 2 N-2 | FIX-NOW | M0-c-05 | 30° rule at a meeting on a vertex unpinned (M16): legality.test case — step meeting a primary at a vertex whose other segment runs back at 20° | N-2
- M0-c-05:13 3 N-3 | FIX-NOW | M0-c-05 | C-0254 (6) Y→T bend on a hit unpinned (M18): oblique hit within the curvature limit must end at the foot | N-3
- M0-c-05:16 4 N-4 | FIX-NOW | M0-c-05 | first curvature's concern unpinned (M27): first proposal κ = s × first normal of growth.curvature under S5 | N-4
- M0-c-05:19 5 N-5 | FIX-NOW | M0-c-05 | prune dangling guard reached only by rare input (M32): hand case of a short secondary carrying another street's T that survives | N-5
- M0-c-05:22 6 N-6 | FIX-NOW | M0-c-05 | walled top-up staged to M1 without a marker (topUp skipped_walled): name the milestone (notBuilt('M1')) in the rung | N-6; C-0254 (11)
- M0-c-05:25 7 N-7 | NOTE | M0-c-05 | chunked median clause fragile; M0-c-06's 1 000-seed reading pools it | 
- M0-c-05:29 8 N-8 | DONE | M0-c-05 | proposals.ts header jitter wording corrected | R10 map (notes lines 168-169); C-0353
- M0-c-05:31 9 N-9 | CARRY-FORWARD | M0-c-05 | §4.4 slope ≤ grade-limit rule neither built nor declared (unobservable on M0's flat fixture): declare it now (§4b / choices), build with M1's relief runs | M1 relief; N-9
- M0-c-05:34 10 N-10 | FIX-NOW | M0-s-02 | regimes.json dense_core.blockDepthFloorM [30, 45] vs §4.4's 37–45 m (prune block width reads it): align the cell or record the deviation in a choices row (re-fit at M-1) | N-10
- M0-c-05:37 11 N-11 | CARRY-FORWARD | M0-c-05 | stand-in demand reduces S5d's per-band comparison (declared C-0254 (10)) — re-check when M1's S2 supplies the demand | M1 S2
- M0-c-05:46 12 N-12 | FIX-NOW | M0-c-05 | metricDoc origin reading unpinned on the fixture (R14): share one reader with drift-grown.test or pin on a reversed arena run | N-12
- M0-c-05:50 13 N-13 | FIX-NOW | M0-c-05 | seeds' quarter-spacing keep-away unpinned (R15): hand case with two arterials meeting at a shallow angle | N-13
- M0-c-05:53 14 N-14 | FIX-NOW | M0-c-05 | dead-end share 72.9 % vs C-0254 (14)'s declared 55–65 %: update the row's figure (or hand it to M0-c-07a's dead-end row) | N-14
- M0-c-05:57 15 N-15 | FIX-NOW | M0-c-05 | acceptance tally keyed on the GrowthState object (a copied model reads 0 silently): refuse in capacityStep when the tally is 0 but S5c recorded streets, or carry it in the record; M0-x-04 registers S5c/S5d on one state | N-15
- M0-c-05:62 16 N-16 | FIX-NOW | M0-c-06 | fixture drift pool thin (59 windows): M0-c-06's integrated run reports the window count with the row | N-16; N-27
- M0-c-05:69 17 N-17 | FIX-NOW | M0-c-05 | C-0260 (1) "every way segment holding the step's start" unpinned (S05): step starting at an arterial vertex between two segments | N-17
- M0-c-05:74 18 N-18 | NOTE | M0-c-05 | S10/S20, S19, U05 equivalent | 
- M0-c-05:77 19 N-19 | NOTE | M0-c-05 | S10/S20, S19, U05 equivalent | 
- M0-c-05:82 20 N-20 | NOTE | M0-c-05 | S10/S20, S19, U05 equivalent | 
- M0-c-05:86 21 N-21 | FIX-NOW | M0-c-05 | U06 side margin survives (contrived, not impossible): arterial bending ~70° within 60 m of a seed with a collinear continuing way | N-21
- M0-c-05:94 22 N-22 | FIX-NOW | M0-c-05 | U09 "on the way" tolerance survives: street segment crossing the parent street with its start 5 m off it | N-22
- M0-c-05:100 23 N-23 | DONE | M0-c-05 | later steps read the far side over the street's whole life | C-0263 (1); N-24 (V01 killed)
- M0-c-05:118 24 N-24 | FIX-NOW | M0-c-05 | C-0263 (1) whole-life part beyond the second step unpinned (V02 changes 15/30 runs): refuse 3-step stubs in growth.test 0.9-pitch test, or a legality case with steps: 2 | N-24
- M0-c-05:125 25 N-25 | FIX-NOW | M0-c-05 | V08/V10/V12/V12b survive (contrived shapes): tests for V10 (nearest point at the step's end) and V08 (T beside a far-side street) | N-25
- M0-c-05:135 26 N-26 | NOTE | M0-c-05 | V09/V19/V14 equivalent; drift pool 35→6 windows (c-06 re-judges) | 
- M0-c-05:141 27 N-27 | NOTE | M0-c-05 | V09/V19/V14 equivalent; drift pool 35→6 windows (c-06 re-judges) | 
- M0-c-05:162 src/growth/legality.ts crossingMatrix:… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:163 src/growth/proposals.ts newJunction, sn… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:164 src/growth/proposals.ts growthArea's en… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:165 src/growth/prune.ts private byId (:63) | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:166 src/growth/capacity.ts sofar's and face… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:167 src/growth/prune.ts:164 "the street end… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:168 src/growth/proposals.ts GrowthStreams'… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:169 src/growth/proposals.ts header, branchi… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:170 src/growth/heading.ts RAD_PER_CDEG's do… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:171 src/growth/legality.ts header lines 7–9… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:172 test/growth/s5cd/heading.test.ts, legal… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:173 test/growth/s5cd/capacity.test.ts:190 "… | NOTE | M0-c-05 | R10 old→new map row | C-0353
- M0-c-05:208 K1 | NOTE | M0-c-05 | R10 mutant killed | 
- M0-c-05:209 M15′ | NOTE | M0-c-05 | R10 mutant killed | 
- M0-c-05:210 R08 / R09 | NOTE | M0-c-05 | R10 mutant killed | 
- M0-c-05:211 S11 / S12 | NOTE | M0-c-05 | R10 mutant killed | 
- M0-c-05:212 U01 – U04 | NOTE | M0-c-05 | R10 mutant killed | 
- M0-c-05:213 M25 | NOTE | M0-c-05 | R10 mutant killed | 
- M0-c-05:214 M31 | NOTE | M0-c-05 | R10 mutant killed | 
- M0-c-05:215 C1 | NOTE | M0-c-05 | R10 mutant killed | 
- M0-c-05:216 C2 | DUPLICATE | M0-c-05 | C2/C3 arms-order survivors — N-c1-1 | N-c1-1
- M0-c-05:217 C3 | DUPLICATE | M0-c-05 | C2/C3 arms-order survivors — N-c1-1 | N-c1-1
- M0-c-05:218 C4 | NOTE | M0-c-05 | R10 mutant killed (C4 after its pin) | 
- M0-c-05:219 S07, S08, S09 | NOTE | M0-c-05 | R10 mutant killed (C4 after its pin) | 
- M0-c-05:220 U07, U08 | NOTE | M0-c-05 | R10 mutant killed (C4 after its pin) | 
- M0-c-05:221 V01 | NOTE | M0-c-05 | R10 mutant killed (C4 after its pin) | 
- M0-c-05:226 R10-1 | ROUTED-TO-CENSUS | M0-c-05 | S5c inner refusals on our own intermediate: W_END_UNMARKED ×4 (plain 9,17,20,23), F-NUM reject ×2 (plain 20,23) | Q55
- M0-c-05:231 R10-2 | DUPLICATE | M0-c-05 | arms order of re-armed junctions — N-c1-1 | N-c1-1
- M0-c-05:249 N-c1-1 | FIX-NOW | M0-c-05 | arms order unpinned at snapArm, joinState, pruneAndTrim (Z19-Z21): one hand case per site asserting compareKeys order | N-c1-1; R10-2
- M0-c-05:250 N-c1-2 | FIX-NOW | M0-c-05 | J302 Q8 "two radians-per-centidegree doubles never swapped" held only by the import (Z25): boundary pin at 600·RAD_PER_CDEG and the next double | N-c1-2
- M0-c-05:251 N-c1-3 | NOTE | M0-c-05 | Z22/Z23 equivalent (Z22 reachable at M1 presets, compareKeys fixes the order) | 
- M0-c-05:252 N-c1-4 | ROUTED-TO-CENSUS | M0-c-05 | the six inner refusals (Q55) and the relief-60 S5 E_SELF_INTERSECT (Q46's class) | Q55; Q46

### M0-d-04

- M0-d-04:6 1 N-1 | FIX-NOW | M0-d-04 | digestLeaf(entry, geometry) differs from the listed digestLeaf(record): a sentence in C-0194 (or §14 at M1) | N-1
- M0-d-04:10 2 N-2 | FIX-NOW | M0-d-04 | reach paths K3, K5, M1, M19 survive (redundant on the runs): fixtures needing each alone; rename the changedEntities test or find a fixture outside owners | N-2
- M0-d-04:16 3 N-3 | FIX-NOW | M0-d-04 | chain item's entity lane (K12): two keys differing only in entity in one bucket hash alike in items — test renaming one chain's entity | N-3
- M0-d-04:19 4 N-4 | CARRY-FORWARD | M0-d-04 | records leaf kind (M23) equivalent at M0 (derivation and naming never share a stream) — pin when M3a adds the order kind | M3a order kind
- M0-d-04:22 5 N-5 | FIX-NOW | M0-d-04 | no test changes a naming record and checks the records digest moves | N-5
- M0-d-04:24 6 N-6 | FIX-NOW | M0-d-04 | face sort key ties fall back to insertion order for a degenerate face ([0,0,0,0]): assert key uniqueness in debug builds | N-6
- M0-d-04:27 7 N-7 | NOTE | M0-d-04 | M16 bad match; behaviour covered by M26 | 
- M0-d-04:29 8 N-8 | CARRY-FORWARD | M0-d-04 | timeDigest omits the plats layer's level-digest recompute — the timing record (M0-t-00) states which workload it timed | M0-t-00 / M0-t-01
- M0-d-04:32 9 N-9 | FIX-NOW | M0-d-04 | isOwnChild keeps a re-owned own child silently: test with a re-owned materialised own child | N-9
- M0-d-04:34 10 N-10 | FIX-NOW | M0-d-04 | test name "the oracle catches a stale leaf" covers the model half only: name the half | N-10
- M0-d-04:36 11 N-11 | DONE | M0-a-08 | scratch zz-debug files gone and the agreement reds fixed | testkit/test/kernel/arr-booleans-buffers/ listing
- M0-d-04:44 12 N-12 | FIX-NOW | M0-d-04 | chain x coordinates unpinned (K13x): arena pair differing only in x | N-12
- M0-d-04:49 13 N-13 | FIX-NOW | M0-d-04 | hole geometry beyond presence unpinned (K16c): same face with its hole at two positions | N-13
- M0-d-04:53 14 N-14 | FIX-NOW | M0-d-04 | face kind at the model leaf (K11) killed only kernel-side: a model test moving a leaf through a retype | N-14
- M0-d-04:62 15 N-15 | FIX-NOW | M0-d-04 | ModelDigest.layer() restore sync unpinned (M6): add layer() reads to the "read at once, no commit and no re-attach" pin | N-15; C-0308
- M0-d-04:70 16 N-16 | FIX-NOW | M0-d-04 | C-0308's "O(arenas) per step when nothing moved" cost claim unpinned (M8 breaks it silently): count pin of leaves re-hashed per commit after a sync | N-16
- M0-d-04:78 17 N-17 | DUPLICATE | M0-a-06 | dead-image restore reaches the (generation, version) key — home L17 | L17; M0-a-06 N-24
- M0-d-04:99 src/digest/model.ts writeHash (5 call s… | NOTE | M0-d-04 | R6 change map row | model-tables-plan §1.6
- M0-d-04:100 src/digest/leaf.ts:149 inline four lane… | NOTE | M0-d-04 | R6 change map row | model-tables-plan §1.6
- M0-d-04:101 src/digest/records.ts:87, :93 inline fo… | NOTE | M0-d-04 | R6 change map row | model-tables-plan §1.6
- M0-d-04:102 src/digest/timing.ts:51 same | NOTE | M0-d-04 | R6 change map row | model-tables-plan §1.6
- M0-d-04:103 comments: index.ts:1–5, model.ts:19–22,… | NOTE | M0-d-04 | R6 change map row | model-tables-plan §1.6
- M0-d-04:104 test/digest/leaf.test.ts:32, model.test… | NOTE | M0-d-04 | R6 change map row | model-tables-plan §1.6
- M0-d-04:105 test/digest/model.test.ts:2–5 header ("… | NOTE | M0-d-04 | R6 change map row | model-tables-plan §1.6
- M0-d-04:106 leaf.test.ts "refuses an entry holding… | NOTE | M0-d-04 | R6 change map row | model-tables-plan §1.6
- M0-d-04:141 N-c1-1 | DONE | M0-d-04 | D-3 refusal message pins added (C1-C5 killed) | N-c1-1
- M0-d-04:147 N-c1-2 | NOTE | M0-d-04 | B3/B4/H3 equivalent or golden-only | 
- M0-d-04:152 N-c1-3 | FIX-NOW | M0-d-04 | records root partition lane and node/layer/root writer lane forms have no golden — persisted roots unpinned (A12, X15): roots golden on syntheticCity(1)'s model and records roots, plus unit pins of writeHash128 lane order and sameHash | N-c1-3; N-c1-8
- M0-d-04:159 N-c1-4 | FIX-NOW | M0-d-05a | lineage.ts:14 comment omits the digest module as an isU32 reader (comment) | N-c1-4
- M0-d-04:169 N-c1-5 | FIX-NOW | session | comments and two describe titles cite C-0305 for the restore-generation reading; the row is C-0308: replace at next touch (kernel + model digest), decide the titles, correct the plan's C-model-4 | N-c1-5
- M0-d-04:181 N-c1-6 | FIX-NOW | M0-d-04 | plats node's level-4 lane unpinned (X22; fuzz writes L1-L3): pin that an L4 commit moves the model root and the plats layer | N-c1-6
- M0-d-04:188 N-c1-7 | FIX-NOW | M0-d-04 | subtree oracle's identity comparison unpinned (X25): stale tombstone/event block under subtreeOracle names identity | N-c1-7
- M0-d-04:193 N-c1-8 | DUPLICATE | M0-d-04 | helper survivors X4/X7/X27/X28/X15 — N-c1-3's roots golden and lane pins | N-c1-3
- M0-d-04:204 N-c1-9 | NOTE | M0-d-09 | a fourth copy of sameHash in bench/src/determinism/records.ts — bench consolidation plan (dependency direction) | 
- M0-d-04:210 N-c1-10 | DONE | M0-x-06 | foreign red EP-01/S8/zero-length re-pinned | Q41 DONE b6eb081d

### M0-d-05a

- M0-d-05a:15 N-1 | FIX-NOW | M0-d-05a | handed-on kind compared exactly but unpinned (Q2 case-folding survives): refusal case — record of kind Plot handed a plot: address | N-1; C-0179 (3)
- M0-d-05a:16 N-2 | FIX-NOW | M0-d-05a | a live set listing one id twice (one retired) lets a hand-on reach a survivor's address: mint refuses a live set repeating an id (RangeError + test) | N-2; §6.3
- M0-d-05a:17 N-3 | CARRY-FORWARD | M0-d-05a | parent check refuses §2.6's room id form (room:<building>/<level>/<i>) — no M0 entity has a room parent; decide when V03's stored plans land | V03 stored plans (rooms)
- M0-d-05a:48 src/identity/lineage.ts 34 – 35 isU32,… | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:49 src/identity/address.ts 22 isU32 | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:50 src/identity/mint.ts 95 – 96 isU32, isO… | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:51 mint.ts 123 typeof reroll !== 'number' \ | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:52 (none) | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:53 mint.ts HashSet, compareLanes | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:54 lineage.ts header | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:55 test/identity/lineage.test.ts | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:56 test/identity/address.test.ts "refuses… | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:57 test/identity/mint.test.ts 5 "(C-0184,… | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:58 test/identity/city.test.ts | NOTE | M0-d-05a | R4 old→new map row | C-0322
- M0-d-05a:78 N-c1-1 | NOTE | M0-d-05a | 39 refusal shifts are non-number values now refused by the field's RangeError (as promised) | 
- M0-d-05a:79 N-c1-2 | DONE | M0-x-06 | foreign red cell/river×frame 1595424233 re-pinned (now commits) | Q20 (x-06 round 2)
- M0-d-05a:88 N-c2-1 | DONE | M0-d-05b | lineage.ts:14-15 sentence made exact by R5's adoption (digest word: M0-d-04 N-c1-4) | M0-d-05b notes R5 preamble
- M0-d-05a:89 N-c2-2 | FIX-NOW | M0-d-05a | mint.ts:96-99 compareLanes doc omits its second use (refusing two records with one key) (comment) | N-c2-2

### M0-d-05b

- M0-d-05b:11 N-1 | FIX-NOW | M0-d-05b | call's end-probe position unpinned (F1g moves it before the sort/freeze): test that at probe(null, 'end') the result is already frozen, or a source check | N-1; C-0190 (1)
- M0-d-05b:12 N-2 | FIX-NOW | M0-d-05b | a class with no re-derived entity loses its spans (classes do not add to callMs): state the exception in C-0190 or record unattributedMs; pin | N-2; C-0190 (3)
- M0-d-05b:13 N-3 | FIX-NOW | M0-d-05b | assign.test.ts input-order property on vitest's default timeout: explicit bound (or a workspace testTimeout via a choices row) | N-3; N-c1-3
- M0-d-05b:30 src/match/match.ts:48 cmpId (sites :289… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:31 src/match/match.ts:47 the local isU32 (… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:32 src/match/match.ts:567, :568 (the carry… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:33 src/match/carry.ts:63 the same cast in… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:34 src/match/grid.ts:101 the private meets… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:35 comments: index.ts:2–3 (scaffold senten… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:36 X-3: the four ratio wrappers match.ts i… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:37 X-4: synthetic.ts:41 "mulberry32 over a… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:38 test/match/assign.test.ts "coincident a… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:39 test/match/carry.test.ts "resolveRef re… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:40 test/match/source.test.ts | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:41 test/match/support.ts, split.test.ts, s… | NOTE | M0-d-05b | R5 change map row | C-model-3
- M0-d-05b:56 X1a | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:57 X1b | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:58 X1c, X1d | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:59 X1e, X1f | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:60 X1g | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:61 X2a, X2b, X2c | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:62 X2d | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:63 X2e, X2f, X2g | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:64 X2h, X2i, X2j | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:65 X5a – X5f | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:66 X3d | NOTE | M0-d-05b | R5 mutant killed | 
- M0-d-05b:67 X3a, X3b, X3c | NOTE | M0-d-05b | X3a/X3c unreached, X3b equivalent (N-c1-1) | 
- M0-d-05b:68 X4a | DUPLICATE | M0-d-05b | X4a synthetic stream — N-c1-2 | N-c1-2
- M0-d-05b:69 K03, K04, K10, K25, K25b, F1a | NOTE | M0-d-05b | earlier mutants killed | 
- M0-d-05b:96 N-c1-1 | NOTE | M0-d-05b | ratio wrappers' refusals unreached (fail-safe kept) | 
- M0-d-05b:105 N-c1-2 | FIX-NOW | M0-d-05b | synthetic sets' content has no golden (X4a): a set-hash golden (timing fixture) | N-c1-2
- M0-d-05b:111 N-c1-3 | DUPLICATE | M0-d-05b | input-order property timeout — N-3 | N-3
- M0-d-05b:114 N-c1-4 | NOTE | session | read-only git on resume disclosed | 
- M0-d-05b:119 N-c1-5 | DONE | M0-x-06 | foreign red EP-01/S8/zero-length re-pinned | Q41 DONE b6eb081d
- M0-d-05b:134 N-cc1-1 | FIX-NOW | M0-d-05b | carry list order by address only partly pinned (C09 sorts by fresh id): two successions whose fresh ids sort opposite to their addresses | N-cc1-1
- M0-d-05b:135 N-cc1-2 | FIX-NOW | M0-d-05b | frozen copies of carry/tombstone lineages unpinned (L10, L13): isFrozen and !== input checks | N-cc1-2
- M0-d-05b:136 N-cc1-3 | CARRY-FORWARD | M0-d-05b | "a fresh <kind> names <id>, both a fresh provisional id and a survivor's address" refusal (C-0188 (1)) — no stage calls match at M0; decide MAKE-IT-SUCCEED (side-tagged reference / dup first) or REFUSE with the layer when the first stage wires match | M1 (first match caller); N-58
- M0-d-05b:137 N-cc1-4 | NOTE | session | read-only git on resume — no breach | 

### M0-d-06

- M0-d-06:6 1 | FIX-NOW | M0-d-06 | runner's thread-mismatch path has no end-to-end test (M17): leg stub answering the wrong thread → run failed with the mismatch reason (Node leg now; browser leg at the Mac step) | note 1
- M0-d-06:12 2 | FIX-NOW | M0-d-06 | "a fresh carry per seed" not held (M21): first stage digests carry.size before writing; assert 0 per seed | note 2
- M0-d-06:18 3 | FIX-NOW | M0-d-06 | seeded dmath and xoshiro stages have no recompute test (M25): recompute both digests in stages.test.ts | note 3
- M0-d-06:23 4 | FIX-NOW | M0-d-06 | any kernel run rewrites the committed summary, even a narrowed one: write it only for the full run, or record the legs/workers asked | note 4; summaries/M0-d-06.json
- M0-d-06:28 5 | FIX-NOW | M0-d-06 | browser run's time limit does not bound page.evaluate (a silent Worker hangs): race evaluate against timeoutMs → failed (exercised at the Mac step) | note 5
- M0-d-06:32 6 | FIX-NOW | M0-d-06 | Node legs' bundle written to os.tmpdir(): a choices-row sentence (an output, C-0067 holds) | note 6
- M0-d-06:36 7 | FIX-NOW | M0-d-06 | non-universal Node on the Mac makes the Rosetta leg failed, not blocked: plan-time check of the binary's slices with a reason (exercised at the Mac step) | note 7; C-0028
- M0-d-06:40 8 | FIX-NOW | M0-d-06 | blocked browser reasons always end "— a Mac step" even on the Mac (wording) | note 8
- M0-d-06:48 9 | FIX-NOW | M0-d-06 | known-answer anchor alters one case per file (R02-R05 survive): alter every expected value of every vector file (probe kat-all exists) | note 9

### M0-d-07

- M0-d-07:10 N1 | DONE | M0-s-01 | flatbush routed as a patch spec (vendor/patches/flatbush@4.6.2.json, adapter wrapper) | vendor/patches/flatbush@4.6.2.json; vendor-audit.json:92-103
- M0-d-07:11 N2 | DUPLICATE | M0-d-07 | second ESLint config in a walk-skipped folder escapes model-coverage — home L15 | L15
- M0-d-07:12 N3 | FIX-NOW | M0-d-07 | config === undefined branch untested (MC10): stub ESLint returning undefined; message "ignored, or matched by no configuration" | N3
- M0-d-07:13 N4 | DUPLICATE | M0-d-07 | node_modules spelling disagreement between checks — home L15 | L15
- M0-d-07:14 N5 | DUPLICATE | M0-d-07 | deliberate-writer escapes (constructor.keys, eval, sort(void 0), WeakRef; shell -c pnpm) — home L15 | L15
- M0-d-07:15 N6 | DUPLICATE | M0-d-07 | .jsx/.tsx in a vendored folder via node_modules spelling passes the lint — home L15 (W-2 (d)) | L15
- M0-d-07:25 directives.test.mjs | NOTE | M0-d-07 | R1 test map row: mutants red | 
- M0-d-07:26 paths.test.mjs | NOTE | M0-d-07 | R1 test map row: mutants red | 
- M0-d-07:27 vendor-scan.test.mjs | NOTE | M0-d-07 | R1 test map row: mutants red | 
- M0-d-07:28 coverage.test.mjs | NOTE | M0-d-07 | R1 test map row: mutants red | 
- M0-d-07:29 index.test.mjs | NOTE | M0-d-07 | R1 test map row: mutants red | 
- M0-d-07:30 rules.test.mjs | NOTE | M0-d-07 | R1 test map row: mutants red | 
- M0-d-07:31 kernel-boundary.test.mjs | NOTE | M0-d-07 | R1 test map row: mutants red | 
- M0-d-07:32 bench-boundary.test.mjs | NOTE | M0-d-07 | R1 test map row: mutants red | 
- M0-d-07:33 no-bare-pnpm.test.mjs, licences.test.mj… | NOTE | M0-d-07 | R1 test map row: mutants red | 
- M0-d-07:41 N7 | DUPLICATE | M0-d-07 | .cjs read as module (L1-cjs) — pin gap, home L14 (d-07 pins) | L14
- M0-d-07:42 N8 | DUPLICATE | M0-d-07 | type-only reference skip fixture (D1-typeonly) — home L14 | L14
- M0-d-07:43 N9 | DUPLICATE | M0-d-07 | reportUnusedDisableDirectives for other extensions (C2-unused) — home L14 | L14
- M0-d-07:44 N10 | DUPLICATE | M0-d-07 | scan cjs extension (W2c-cjs) — home L14 | L14
- M0-d-07:54 N11 | FIX-NOW | M0-d-07 | inTypePosition TSTypeQuery clause untested (D2-noquery): pass fixture type O = typeof Object; let g: typeof globalThis; | N11
- M0-d-07:55 N12 | FIX-NOW | M0-d-07 | lintedFile physicalFilename nuance untested (D3-physical): RuleTester case with a virtual filename | N12
- M0-d-07:56 N13 | FIX-NOW | M0-d-07 | ratio-division n! judged by its own type unpinned (D5-merge): add x / n! with n: 2 / undefined to pass-typed.ts | N13; C-0128 (4)
- M0-d-07:57 N14 | FIX-NOW | M0-d-07 | lint report prefix held only by output comparison (C1-print): test pinning lint <name>: prefixes | N14
- M0-d-07:58 N15 | NOTE | M0-d-07 | no-bare-pnpm run() without root throws like the other checks; optional default | 

### M0-d-08

- M0-d-08:10 N-1 | FIX-NOW | M0-d-08 | renumberSlots role-row permutation unpinned (C21): assert a live role row moves and its content lands at maps.role[row] | N-1; C-0199 (2)
- M0-d-08:11 N-2 | FIX-NOW | M0-d-08 | recordPrint sorts demoted edges, so the record's own order (C-0185 (17)) is not compared (K11): print in record order; fixture demoting two edges in one batch | N-2; print.ts:320
- M0-d-08:12 N-3 | FIX-NOW | M0-d-08 | kernel slot-order mutants K06/K07/K08/K10 unreached: constructive fixtures with two promotions in one batch, an equal-length merge, a multi-role batch; re-run | N-3
- M0-d-08:13 N-4 | FIX-NOW | M0-d-08 | constructive sequences take only leading insertChain steps (six cases' later inserts, incl. slot-reuse, never run; no partition rebuild): interpret rebuildPartitions and later steps | N-4; C-0199 (3)
- M0-d-08:14 N-5 | FIX-NOW | M0-d-08 | geom/cut-through-vertex: harness locates the face at the cut's midpoint (a vertex) and throws in the harness: take an interior point off the cut | N-5
- M0-d-08:15 N-6 | FIX-NOW | M0-d-08 | M0-a-07's inline declared fixture and pinVertices/connectHole/absorbSliver not in partitionerSequence: add them | N-6
- M0-d-08:16 N-7 | FIX-NOW | M0-d-08 | declared form permuted only on a-06/a-07 fixtures: issue each constructive case's same-level chains also as one declared batch and permute it | N-7
- M0-d-08:17 N-8 | FIX-NOW | M0-d-08 | outcomePrint prints a refusal by code alone (a refused last batch's arena never compared): append the arena print | N-8
- M0-d-08:18 N-9 | DONE | session | plat/undefined.cur removed | L7 DONE
- M0-d-08:19 N-10 | FIX-NOW | M0-d-08 | permutationCompare first-divergence break unpinned (V02): control diverging in the reversal only | N-10
- M0-d-08:20 N-11 | FIX-NOW | M0-d-08 | random permutation variants not asserted distinct (V04): assert pairwise-distinct orders | N-11
- M0-d-08:21 N-12 | NOTE | M0-d-08 | V05 equivalent (digests read slot-free content the arena print prints) | 
- M0-d-08:22 N-13 | FIX-NOW | M0-d-08 | a nothing outcome without its arena print passes (V09): print test that it changes when the arena does | N-13; with N-8

### M0-d-09

- M0-d-09:7 1 | FIX-NOW | M0-d-09 | summary authority counts untested (TP): report from one contended and one authoritative stamp, assert counts | note 1
- M0-d-09:15 2 | FIX-NOW | M0-d-09 | matchPair rootsEqual untested on a failing input (P10): tampered S4 root → rootsEqual false | note 2
- M0-d-09:20 3 | CARRY-FORWARD | M0-d-09 | standing check lineage/stage compare equivalent at M0 (E1) — revisit when standing records carry their own Identity | M1 (records carry Identity)
- M0-d-09:26 4 | FIX-NOW | M0-d-09 | dilation runs read no clock (reads 0) on the spike city: planted scratch stage reading performance.now(), dilation names it first | note 4
- M0-d-09:32 5 | FIX-NOW | M0-d-09 | byte-for-byte reproduction covers half the spike city (no site spike): add the site spike or a second seed | note 5
- M0-d-09:37 6 | CARRY-FORWARD | M0-d-09 | "0 duplicate ids" counted through a bench copy of §6.3's ~k rule (records carry no lineage keys at M0) — re-run through mint once M1 records carry Identity | M1 (records carry Identity); C-0274
- M0-d-09:43 7 | FIX-NOW | M0-d-09 | summary names the x86-64 leg node-x64-rosetta on a native host (wording; C-0228 (1) keeps the id): say so in the summary | note 7
- M0-d-09:47 8 | FIX-NOW | M0-d-09 | bugs.refused counts in-process seeds only (cross-host leg refusals uncounted): count leg refusals, or state the scope in the summary | note 8
- M0-d-09:58 9 | FIX-NOW | M0-d-09 | records tree mismatch count not wired-tested (T5b): add probe zz-probe-recmiss to runner.test, verdict fail through buildReport | note 9
- M0-d-09:68 10 | FIX-NOW | M0-c-04 | fusion {S5: 1} reroll re-draws nothing at the test frame (C-0280 (3)): S5 owners explain or fix; matters for test-frame matching workloads | note 10

### M0-e-01

- M0-e-01:16 N-6 | DUPLICATE | M0-e-01 | low band edge inclusive but unpinned (E11) — home L27 (d) | L27
- M0-e-01:17 N-7 | NOTE | M0-e-01 | strategy.test line 34 type-checks the concern name; no kill of its own | 
- M0-e-01:33 E-1: src/terrain/grid.ts arenaReach | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:34 E-2: src/terrain/resources.ts:46–48 pri… | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:35 E-3: src/terrain/primitives.ts:12–14 pr… | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:36 E-4: src/terrain/heightfield.ts:36–38 p… | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:37 E-5: src/terrain/strategy.ts:23–25 priv… | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:38 E-6: none (the idiom is written out in… | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:39 C-terrain-1: src/terrain/index.ts:1–4 (… | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:40 plan §2 comment (a), (b) | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:41 T-terrain (a): test/terrain/strategy.te… | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:42 T-terrain (b): the raster-grid literal… | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:43 T-terrain (c) | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:44 E-6's pin | NOTE | M0-e-01 | R1 terrain change map row | site-plan §1.1
- M0-e-01:103 N-c1-1 | FIX-NOW | M0-e-01 | rasterGrid cols/rows order unpinned (RG1; square frames only): resourceGrid equality on a non-square frame | N-c1-1
- M0-e-01:104 N-c1-2 | FIX-NOW | M0-e-01 | "a fresh lifecycle object per call" unpinned (L4/L2/L3): generatedLifecycle(3) not toBe another; two records' lifecycles distinct and not frozen | N-c1-2; N-c1-6
- M0-e-01:105 N-c1-3 | FIX-NOW | M0-e-01 | unknown primitive kind throws a TypeError (undefined preparer): detect and refuse E_OUT_OF_RANGE 'primitive <i>: unknown kind' | N-c1-3
- M0-e-01:106 N-c1-4 | FIX-NOW | M0-e-01 | a negative radius/width is silently reinterpreted (terrace −1 m builds as 1 m): refuse in inverse()'s callers with a message pin | N-c1-4
- M0-e-01:117 N-c1-5 | FIX-NOW | M0-e-01 | π and RAD_PER_CDEG pinned only to tolerance (RD1/RD2 change float bits): bit-exact pins in primitives.test.ts | N-c1-5
- M0-e-01:118 N-c1-6 | DUPLICATE | M0-e-01 | frozen fresh lifecycle — N-c1-2 | N-c1-2
- M0-e-01:119 N-c1-7 | NOTE | M0-e-01 | RG4/CC4 equivalent; R2 re-judges RG4 | 
- M0-e-01:120 N-c1-8 | FIX-NOW | M0-e-01 | grid.ts header says every other grid reads centres through centreX/centreY/cellCentre; hydro hot loops keep inline arithmetic (E-6): qualify the sentence after R2/R3 (comment) | N-c1-8

### M0-e-02

- M0-e-02:15 N-1 | DUPLICATE | M0-e-02 | C-0175 (5) line-fault cell closing unpinned (L3e) — home L27 (d) | L27
- M0-e-02:33 H-1: src/hydro/strategy.ts:28–29 privat… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:34 H-1: strategy.ts:95–97 private generate… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:35 H-1: strategy.ts:99–101 private isBaseR… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:36 H-1: strategy.ts:401 the inline reach {… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:37 H-1: carve.ts:34–36 rasterGeom's five-f… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:38 H-1: trace.ts:290–294 centreOf, trace.t… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:39 H-2: d8.ts:15–18 and trace.ts:152–155 t… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:40 H-2: d8.ts:30–44 flowCode's first loop… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:41 H-3: trace.ts:145–149 invOf(cols) ('tra… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:42 H-4: 22 sites of Math.round((c − i) · i… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:43 H-5: cellAt + j · cols + i at trace.ts:… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:44 H-6: course.ts:87–101 pointSegDist2's p… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:45 H-7 | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:46 H-8: d8.ts:143–160 class Counts (add, g… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:47 H-9: strategy.ts:35–39 quotient ('river… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:48 H-10: strategy.ts:303–306 private better | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:49 H-11, H-12 | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:50 H-13 / C-hydro-1 – 3 | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:51 H-14 | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:52 T-hydro: test/hydro/support.ts | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:53 T-hydro: river.test.ts:44, 61–79, 130–1… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:54 T-hydro: relief-bar.test.ts:48–49, 53–6… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:55 T-hydro: surface.test.ts:1–6, 13–20, 17… | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:56 T-hydro, kept apart | NOTE | M0-e-02 | R2 hydro change map row | site-plan §1.2
- M0-e-02:108 A1 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:109 A2 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:110 A3 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:111 A4 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:112 A5 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:113 A6 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:114 A7 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:115 B1 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:116 B2 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:117 B3 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:118 B4 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:119 B5 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:120 C1 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:121 C2 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:122 D1 | DUPLICATE | M0-e-02 | D1 rowOf rounding — N-c1-1 | N-c1-1
- M0-e-02:123 D2 | DUPLICATE | M0-e-02 | D2 corridor neighbour row — N-c1-2 | N-c1-2
- M0-e-02:124 D3 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:125 D4 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:126 E1 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:127 E2 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:128 F1s | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:129 F2s | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:130 F3s | NOTE | M0-e-02 | F3s equivalent (ratio floor gives t = 0) | 
- M0-e-02:131 G1 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:132 G2 | NOTE | M0-e-02 | R2 mutant killed | 
- M0-e-02:133 H1 | DUPLICATE | M0-e-02 | H1 unscaled ray divisor — N-c1-3 | N-c1-3
- M0-e-02:134 K01, K02, K03, K11, K13, K17, K18, K21,… | NOTE | M0-e-02 | round 1 mutants red | 
- M0-e-02:135 K20 | DUPLICATE | M0-e-02 | K20 degraded pick order — N-c1-4 | N-c1-4
- M0-e-02:136 F1, L3a, L3c, L3g | NOTE | M0-e-02 | close-r1 mutants red | 
- M0-e-02:146 N-c1-1 | FIX-NOW | M0-e-02 | rowOf rounding has no fixture where it matters (D1; 49 columns etc.): property rowOf(c, c % cols, invOfCols(cols)) === floor(c / cols) over 1–5 000 columns | N-c1-1; C-0044
- M0-e-02:147 N-c1-2 | FIX-NOW | M0-e-02 | recomputeCorridors neighbour scan row shift unseen (D2): corridor stopping short of the border, cells beside its last cell re-point | N-c1-2
- M0-e-02:148 N-c1-3 | FIX-NOW | M0-e-02 | no inlet ray onto an east/west edge at an oblique bearing (H1): inletOf at 60° and 240° | N-c1-3
- M0-e-02:149 N-c1-4 | FIX-NOW | M0-e-02 | degraded pick distance order unpinned (K20): assert the delivered attempt passes nearest the centre | N-c1-4; C-0175
- M0-e-02:159 N-c1-5 | FIX-NOW | M0-e-02 | course Chaikin smoothing unpinned (K24/K24c): course equals rounded(chaikin(knots, 3)) | N-c1-5
- M0-e-02:160 N-c1-6 | FIX-NOW | M0-e-02 | inletMasks' wall on the inlet's own edge untested (K15′): assert inletMasks on a small grid | N-c1-6
- M0-e-02:161 N-c1-7 | FIX-NOW | M0-e-02 | edgePoint row on east/west border cells unpinned (N02): one case per side on a non-square grid | N-c1-7
- M0-e-02:162 N-c1-8 | FIX-NOW | M0-e-02 | two helper comments name readers R3 adds (segParam etc.): re-read after R3; reword if not adopted | N-c1-8

### M0-e-03

- M0-e-03:6 1 | FIX-NOW | M0-e-03 | bank outfalls up to 22 cm off the committed shore chain (§2.3: at on the receiving body's shore chain): project onto (or snap to) the committed shore; test the distance on the bar seeds | note 1
- M0-e-03:14 2 | FIX-NOW | M0-e-03 | stage detect-and-refuse guards untested (M15, M19, M36): bridge whose deck_end resolves to nothing → E_INVARIANT; seed in a face its rings do not bound → E_INVARIANT | note 2
- M0-e-03:21 3 | FIX-NOW | M0-e-03 | L0 partition rebuild at stage end unpinned (M16): after runS1 assert the L0 dynamic grids empty | note 3
- M0-e-03:26 4 | FIX-NOW | M0-e-03 | a polygon part with no seed is dropped without a report: report it in fallbacks/dropped, or seed from an interior point | note 4
- M0-e-03:32 5 | FIX-NOW | M0-e-03 | span ≤ 3 widths filter untested (M22): bend fixture where the perpendicular ray runs along the reach | note 5
- M0-e-03:35 6 | FIX-NOW | M0-e-03 | bridge ids after the input's bridges untested (M33): run with one input bridge, expect bridge:1 first | note 6
- M0-e-03:38 7 | ROUTED-TO-CENSUS | M0-e-03 | tributary refused on both polygon paths at a grazing mouth (bar seed 62) — lawful, MAKE-IT-SUCCEED expected | Q45
- M0-e-03:43 8 | DONE | M0-x-02 | a stage refusal now rolls the stage's batches back (runner rollback) | Q14 DONE a0dfc5c2 / b6eb081d
- M0-e-03:51 9 | CARRY-FORWARD | M0-e-03 | S1's L0 batch on a full CITY frame takes seconds vs §12.4's 25 ms — perf pass (Q50's profile) then the timing waves | Q50; M0-t-01
- M0-e-03:60 10 | FIX-NOW | M0-e-03 | a site's deck can lag the committed deck by centimetres (seed 64 bridge:7 25 cm): re-read deck from the resolved deck_end vertices after commit, or bound by attractCm in a test | note 10; C-0233
- M0-e-03:68 11 | FIX-NOW | M0-e-03 | flow mutants F03/F04 caught only by full CITY frames: hand-built course with a short kink in crossings.test.ts | note 11
- M0-e-03:80 12 | DUPLICATE | M0-e-03 | provedRings 2 cm band unpinned (K04) — home L27 (d) | L27
- M0-e-03:91 13 | DUPLICATE | M0-e-03 | fast ring cause unpinned in the refusal (K13) — home L27 (d) | L27
- M0-e-03:97 14 | DUPLICATE | M0-e-03 | fast flag counting polygon-refused bodies (K18) — home L27 (d) | L27
- M0-e-03:106 15 | DONE | M0-x-06 | EP-01/S1/self-touching rate re-pinned with cause and share | Q20 (x-06 round 2)
- M0-e-03:121 16 | DUPLICATE | M0-e-03 | references-resolve subject classes K09/K10/K11 unpinned — home L27 (d) | L27
- M0-e-03:136 17 | NOTE | M0-e-03 | K05/K15 equivalent | 
- M0-e-03:140 18 | FIX-NOW | M0-x-02 | runner's S1 work line reads 0 though S1 batches commit (S1 commits through the façade, not ctx.batch): count a committed record's work in the façade wrapper or route S1 through ctx.batch — same mechanism as Q39 | note 18; Q39
- M0-e-03:170 W-1: geometry.ts:16–19 reachOf's own ⌈w… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:171 W-1: geometry.ts:72–84 segDist2's body | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:172 W-1: geometry.ts:87–97 footOn's body | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:173 W-1: geometry.ts:113–120 segSeg2's body | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:174 W-1: faces.ts:71–73 private generated(e… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:175 W-1: offset.ts:164 the literal 3.141592… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:176 W-1: outfalls.ts:163–166 private cellOf | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:177 W-1: outfalls.ts:99, 103, 122 g.originX… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:178 W-2: crossings.ts:32–34, polygons.ts:11… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:179 W-3: offset.ts:21 private unitOf; polyg… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:180 W-4: stage.ts:60–61 KERNEL_RING; polygo… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:181 W-5: polygons.ts:454–459 (provedRings)… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:182 W-6: polygons.ts:447–448 and :512–513 t… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:183 W-7: params.ts:27 ESTUARY_SPLIT_M = 400 | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:184 W-8: offset.ts:124–130 the module varia… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:185 W-9 | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:186 W-10: crossings.ts:54 the closure clear… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:187 W-11: stage.ts:217 (ctx as { report?: u… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:188 W-12 | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:189 W-13 | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:190 W-14 / C-water-1 – 2 | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:191 C-water-3 (tests) | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:192 T-water: test/water/support.ts | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:193 T-water: faces.test.ts:13–29 | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:194 T-water: slow-rings.test.ts:30–47, 75–7… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:195 T-water: crossings.test.ts:16–30 | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:196 T-water: outfalls.test.ts:21–32, 73 | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:197 T-water: exit-bar.test.ts:33–48, 87–95 | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:198 T-water: stage.test.ts:156–169, referen… | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:199 T-water, kept apart | NOTE | M0-e-03 | R3 water change map row | site-plan §1.3
- M0-e-03:261 A1 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:262 A2 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:263 A3 | NOTE | M0-e-03 | A3 survives by design: footOn's clamp kept for the −0 case | 
- M0-e-03:264 A4 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:265 A5 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:266 A6 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:267 A7 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:268 A8 | DUPLICATE | M0-e-03 | A8 — N-c1-1 | N-c1-1
- M0-e-03:269 A9 | DUPLICATE | M0-e-03 | A9 — N-c1-2 | N-c1-2
- M0-e-03:270 A10 | DUPLICATE | M0-e-03 | A10 — N-c1-3 | N-c1-3
- M0-e-03:271 B1 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:272 B3 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:273 C1 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:274 C2 | DUPLICATE | M0-e-03 | C2 — N-c1-3 | N-c1-3
- M0-e-03:275 D1 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:276 D2 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:277 D3 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:278 E1 – E4 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:279 E5 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:280 E6 | DUPLICATE | M0-e-03 | E6/E7 — N-c1-4 | N-c1-4
- M0-e-03:281 E7 | DUPLICATE | M0-e-03 | E6/E7 — N-c1-4 | N-c1-4
- M0-e-03:282 K15 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:283 K14b | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:284 K14 | DUPLICATE | M0-e-03 | K14 — N-c1-4 | N-c1-4
- M0-e-03:285 K02, K03, K17 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:286 K04 | DUPLICATE | M0-e-03 | K04 — note 12 (L27) | L27
- M0-e-03:287 F1 | DUPLICATE | M0-e-03 | F1/F2 — N-c1-5 | N-c1-5
- M0-e-03:288 F2 | DUPLICATE | M0-e-03 | F1/F2 — N-c1-5 | N-c1-5
- M0-e-03:289 G1 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:290 H1 | DUPLICATE | M0-e-03 | H1-H4 — N-c1-6 / N-c1-10 | N-c1-6
- M0-e-03:291 H2 | DUPLICATE | M0-e-03 | H1-H4 — N-c1-6 / N-c1-10 | N-c1-6
- M0-e-03:292 H3 | DUPLICATE | M0-e-03 | H1-H4 — N-c1-6 / N-c1-10 | N-c1-6
- M0-e-03:293 H4 | DUPLICATE | M0-e-03 | H1-H4 — N-c1-6 / N-c1-10 | N-c1-6
- M0-e-03:294 I1 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:295 J1 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:296 S2K01, S2K02, S2K08, S2K12 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:297 K10, K12 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:298 K13 | DUPLICATE | M0-e-03 | K13 — note 13 (L27) | L27
- M0-e-03:299 F06 | NOTE | M0-e-03 | R3 mutant killed | 
- M0-e-03:310 N-c1-1 | FIX-NOW | M0-e-03 | no outfalls test tells a polygon cell from a course cell one row off (A8): pin bodyOf's cell centre | N-c1-1
- M0-e-03:311 N-c1-2 | FIX-NOW | M0-e-03 | no test reads a site Bridge's lifecycle (A9): add lifecycle GENERATED_AT_0 to stage.test sites match | N-c1-2
- M0-e-03:312 N-c1-3 | FIX-NOW | M0-e-03 | fast ring round caps and sub-centimetre unitOf null unpinned (A10, C2): pins | N-c1-3
- M0-e-03:313 N-c1-4 | FIX-NOW | M0-e-03 | fast ring proofs and kernel ring holes lack fault injection (E6, E7, K14): planted rings | N-c1-4
- M0-e-03:314 N-c1-5 | FIX-NOW | M0-e-03 | fixed rule cut points and band width unpinned on the fast path (F1, F2): hand rings at 1/2 cm and an estuary cut | N-c1-5; N-c1-9
- M0-e-03:315 N-c1-6 | FIX-NOW | M0-e-03 | fast ring refusal texts unpinned (H2-H4): pin each text | N-c1-6
- M0-e-03:326 N-c1-7 | FIX-NOW | M0-e-03 | deck end clearance unpinned per end (I1): right bank end case | N-c1-7
- M0-e-03:327 N-c1-8 | FIX-NOW | M0-e-03 | order of the ring proofs unpinned (E6/E7 checker): pin the first-failing proof's text on a ring failing two | N-c1-8
- M0-e-03:328 N-c1-9 | DUPLICATE | M0-e-03 | fixed band width between √2 and 2 cm — N-c1-5 | N-c1-5
- M0-e-03:329 N-c1-10 | NOTE | M0-e-03 | H1 precedence equivalent on every reachable input | 
- M0-e-03:330 N-c1-11 | FIX-NOW | M0-e-03 | three comment sentences claim a little more than the code (ON_CM, …) (comments) | N-c1-11

### M0-e-04

- M0-e-04:6 1 | FIX-NOW | M0-e-04 | quarterTree(leaves, adjacency, opts): QuarterTree differs from the brief's quarterTree(districts): QuarterNode: a choices sentence (or a thin wrapper) | note 1
- M0-e-04:12 2 | FIX-NOW | M0-e-04 | edge test's water clause and the riverbank/bridgehead seeds have no test on a water fixture (M09/M10 equivalent at M0): stage on a river + bridge fixture | note 2
- M0-e-04:28 3 | FIX-NOW | M0-e-04 | LLOYD_ROUNDS, UNLOOP_WINDOW, PREFER_PENALTY are code constants: make them cells (unit, provenance, calibratable) or state them algorithmic in a choices row | note 3; C-0245
- M0-e-04:32 4 | FIX-NOW | M0-e-04 | s6.json outside the run's TableView (typingCells/minBarrierClass ignore input.tables; not in the table hash): register s6 or thread input.tables | note 4
- M0-e-04:40 5 | FIX-NOW | M0-e-04 | F-WORK work-cut runs and the degenerate-face merge use a one-edge test (could hold a barrier edge): grid with an arterial dead-ending inside a compartment under turn limit 0 | note 5
- M0-e-04:47 6 | FIX-NOW | M0-e-04 | merge rule skips the patch test's hole check: add it (or a test) for a district sharing two disjoint boundary pieces | note 6
- M0-e-04:51 7 | CARRY-FORWARD | M0-e-04 | count law miss at seed 121 (+2) and gate bar 97/100 on seeds 101-200 — whole-town behaviour (KI-11's kind) | KI-11; M1 towns
- M0-e-04:56 8 | CARRY-FORWARD | M0-e-04 | settlementPerimeter frame test uses the frame bbox — every M0 frame is a rectangle (§3.2 (9)); revisit with non-rectangular frames | non-rectangular frames (post-M0)
- M0-e-04:58 9 | FIX-NOW | M0-e-04 | no fixture has an outside region cut off from the frame (M38): arterial loop between perimeter and frame, enclosed faces take the hinterland id | note 9
- M0-e-04:71 10 | DONE | M0-e-04 | collinear vertices merged before convolution and isSumRing | Q21 DONE 0cc9b533; N-56 (2)
- M0-e-04:92 11 | ROUTED-TO-CENSUS | M0-e-04 | perimeter at a 180 m offset refuses E_INVARIANT "the union: insert: no route … (N-43)" on 6/30 flat outlines (lawful) | Q64
- M0-e-04:97 12 | FIX-NOW | M0-e-04 | three isSumRing clauses not isolated (N02, N03, N04b; A02): P5's hole ring, a ring edge 30 m from a spike tip, an X crossing | note 12; N-c1c-2
- M0-e-04:107 13 | FIX-NOW | M0-e-04 | run-unit keys (hinterland, seams, quarter nodes under 2³²−1/−2/−3) unpinned — lineage keys: P5's derivations as a stage test | note 13; C-0245 (17)
- M0-e-04:116 14 | FIX-NOW | M0-e-04 | largestOuter's choice untested and dropping smaller clip pieces unspecified: boundary hugging the frame with a notch, plus the rule for dropped pieces | note 14
- M0-e-04:123 15 | FIX-NOW | M0-e-04 | overlay's outer ring not checked for simplicity (isSumRing assumes simple): apply simpleCcw to it | note 15
- M0-e-04:134 16 | FIX-NOW | M0-e-04 | wall strips' exclusion with S1 land owners unpinned (K06 killed only via the plaza): land.test case on cityRun/growthRun asserting every strip face keeps its owner | note 16
- M0-e-04:153 17 | ROUTED-TO-CENSUS | M0-e-04 | non-simple (coincident) boundary refused by the union's clearance — unlawful input; REPAIR candidate (union-outer pre-step) | note 17; N-56 (2)
- M0-e-04:184 src/districts/perimeter.ts private segD… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:185 src/districts/seeds.ts private segDist2… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:186 src/districts/perimeter.ts meet's body… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:187 src/districts/quarters.ts private HA_CM… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:188 src/districts/stage.ts private GROUND =… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:189 src/districts/stage.ts typingCells(s6Ta… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:190 src/districts/faces.ts polsbyPopper's l… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:191 src/districts/typing.ts and quarters.ts… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:192 test/districts/collinear.test.ts and pe… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:193 test/districts/grow.test.ts graphOf, ce… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:194 integration.test.ts RUNS + city, stage.… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:195 quarters.test.ts and typing.test.ts con… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:196 law.test.ts districtWith(row, cell, val… | NOTE | M0-e-04 | R9 old→new map row | C-0360
- M0-e-04:287 N04 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:288 N04b | DUPLICATE | M0-e-04 | N04b — note 12 | note 12
- M0-e-04:289 N13 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:290 M34 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:291 K06s2 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:292 D01 / D01b | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:293 D02 / D02b | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:294 N03 | DUPLICATE | M0-e-04 | N03 — note 12 | note 12
- M0-e-04:295 B01 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:296 B02 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:297 M22 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:298 M23 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:299 H01 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:300 H02 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:301 M31 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:302 M33 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:303 N23 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:304 M14 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:305 M29 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:306 Q01 / Q01b | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:307 P01 / P01b | DUPLICATE | M0-e-04 | P01 — N-c1b-1 | N-c1b-1
- M0-e-04:308 T01 / T01b | DUPLICATE | M0-e-04 | T01 — N-c1b-2 | N-c1b-2
- M0-e-04:309 G01 / G01b | DUPLICATE | M0-e-04 | G01 — N-c1b-3 | N-c1b-3
- M0-e-04:310 S01 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:311 S02 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:312 S03 | NOTE | M0-e-04 | S03 equivalent test-helper fault | 
- M0-e-04:313 S04 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:314 S05 | NOTE | M0-e-04 | S05/S06 equivalent test-helper faults | 
- M0-e-04:315 S06 | NOTE | M0-e-04 | S05/S06 equivalent test-helper faults | 
- M0-e-04:316 S07 | NOTE | M0-e-04 | R9 mutant killed | 
- M0-e-04:323 N-c1b-1 | FIX-NOW | M0-e-04 | polsbyPopper has no reader and no pin (header claims a report): pin it, or drop the report claim | N-c1b-1; J354 (3)
- M0-e-04:328 N-c1b-2 | FIX-NOW | M0-e-04 | typing's tie order by id unpinned (T01/A12 live on 52/60 equal-area cases): typing.test case with two equal-area districts | N-c1b-2; J354 (3)
- M0-e-04:331 N-c1b-3 | FIX-NOW | M0-e-04 | S6's default arena key unpinned (G01): stage.test case with key omitted equals the keyed run | N-c1b-3; J354 (3)
- M0-e-04:334 N-c1b-4 | NOTE | M0-e-04 | S03/S05 equivalent test-helper faults | 
- M0-e-04:339 N-c1b-5 | ROUTED-TO-CENSUS | M0-e-04 | cityRun(3) refuses at the 180 m fixture offset — Q64's class | Q64
- M0-e-04:358 N-c1c-1 | FIX-NOW | M0-e-04 | S6's hand-over of the band top and quarter families unpinned (A08/A14 change 152/160 and 198 runs): two stage.test pins | N-c1c-1; J354 (3)
- M0-e-04:359 N-c1c-2 | DUPLICATE | M0-e-04 | isSumRing nearness "both ends" (A02) — note 12 | note 12
- M0-e-04:360 N-c1c-3 | DUPLICATE | M0-e-04 | confirmation of N-c1b-1..3 | N-c1b-1..3
- M0-e-04:361 N-c1c-4 | NOTE | M0-e-04 | test-side faults of the consolidated support, equivalent or killed | 
- M0-e-04:362 N-c1c-5 | ROUTED-TO-CENSUS | M0-e-04 | 180 m perimeter refusals (lawful) — Q64 | Q64; J354 (2)

### M0-e-05

- M0-e-05:11 N-1 | FIX-NOW | M0-e-05 | no fixture holds a water body (K28 survives): sources.test case on M0-e-03's water fixture (rings = bodies' L0 faces) | N-1
- M0-e-05:12 N-2 | FIX-NOW | M0-e-05 | fieldsDigest could drop the raster unnoticed (K32): test that changing one stored raster cell (a margin cell too) moves the digest | N-2
- M0-e-05:13 N-3 | FIX-NOW | M0-e-05 | ε zero-mean test cannot see the mean dropped (K19): compare against the unsubtracted mean, or drop the claim from C-0255 (3) | N-3
- M0-e-05:14 N-4 | FIX-NOW | M0-e-05 | no test holds that ε is smoothed (K20): stored field equals the blur of the unblurred sum | N-4; C-0255 (3)
- M0-e-05:15 N-5 | FIX-NOW | M0-e-05 | weight-0 identity runs on a dry site (q ≡ 0): run it on probe P3's wet site | N-5
- M0-e-05:16 N-6 | FIX-NOW | M0-e-05 | a cut at the midpoint of two adjacent doubles rounds onto one: take v[k] when (v[k−1]+v[k])/2 equals v[k−1] | N-6
- M0-e-05:17 N-7 | FIX-NOW | M0-e-05 | heightsOf passes the literal 250 as the slope-query step (unread): name it or pass the terrain cell | N-7
- M0-e-05:18 N-8 | FIX-NOW | M0-e-05 | ε vanishes when kernels have no variance on land: state the case in C-0255 (3) or scale against a floor variance | N-8
- M0-e-05:19 N-9 | NOTE | M0-e-05 | K16/K10 equivalent | 
- M0-e-05:20 N-10 | DONE | M0-x-04 | fields composed into S6 in the base registration | layout/src/pipeline/base.ts:17,714
- M0-e-05:21 N-11 | FIX-NOW | M0-e-05 | stored fields blurred with a box other than the reported one unseen at 48 m (C05): add the 48 m drivers-sum case (switch and rung) | N-11

### M0-e-06

- M0-e-06:9 1 | FIX-NOW | M0-e-06 | committed summary is an 8-seed run that M0-f-03b reads (p999 = max of 8): run the 200-seed site summary (J238 (2) full strength) before M0-f-03b, after the perf round | note 1; C-0271 (9); J238
- M0-e-06:10 2 | CARRY-FORWARD | M0-e-06 | stage stamps omit the runner's stage-end rebuild (~1/5 of S4's row) — timing items decide whether §12.4 rows include it (C-0082's window) | M0-t-01 / M0-x-01
- M0-e-06:11 3 | CARRY-FORWARD | M0-e-06 | timing-phase batch exceeds 60 s per derivation; gate p50s >100× over — partition batches; the perf round (Q50) then the timing items | M0-t-00/M0-t-01; Q50
- M0-e-06:12 4 | FIX-NOW | M0-e-06 | RunRecord.corpus drops CorpusReport.causes (sharpCorner vs validator unknowable from the report): keep the causes | note 4; receipts.ts:659-661
- M0-e-06:13 5 | FIX-NOW | M0-e-06 | byte-for-byte test covers relief-60 default at test size only: add coarse, 3 000 m and CITY across worker counts | note 5; entry.test.ts:17-18
- M0-e-06:14 6 | FIX-NOW | M0-e-06 | holed district faces not pinned whole into the corpus (K30): fixture with a holed district face | note 6
- M0-e-06:15 7 | DONE | M0-c-04 | bridge:41 way over water off its span fixed; spans whole and dry | Q8 DONE 9f521e94
- M0-e-06:16 8 | CARRY-FORWARD | M0-e-06 | 3 000 m fixture never exercises the water clauses — M1's gate re-run (further configurations deferred there) | M1 gate re-run
- M0-e-06:17 9 | FIX-NOW | M0-e-06 | a river can fit with a 2-3 cell bed (monotone check trivial): count only fitting rivers or report short ones apart | note 9
- M0-e-06:18 10 | CARRY-FORWARD | M0-e-06 | hydroReceipt treats cell centres outside the frame as land — coast/margin water arrives at M1 | M1 (coast)
- M0-e-06:19 11 | NOTE | M0-e-06 | containment sampled every 50 m; S6's own unowned count sees thinner gaps | 
- M0-e-06:20 12 | NOTE | session | routed notes surfaced by the harness; each is classed in its own file here | 
- M0-e-06:21 13 | FIX-NOW | M0-e-06 | WET_DEPTH_CM pinned to a window not 2 cm (C01/C02 survive): add a probe point at 3 cm | note 13
- M0-e-06:22 14 | DONE | M0-c-02 | seed 9 gate:w0 wet side now one chord | Q29 DONE 15b51044
- M0-e-06:23 15 | FIX-NOW | M0-e-06 | chord half of the strict reading pinned only by seed 9's former defect (M2 will survive): hand-built pin — wet wall edge with one wall_gate row, two resolving gate_end refs, one end off the edge | note 15; Q29
- M0-e-06:24 16 | FIX-NOW | M0-e-06 | mineOver counts a wet edge carrying two wall rows in both enceintes (fails closed): attribute by the gate's enceinte, or settle C-0244's shared-side reading | note 16

### M0-f-02a

- M0-f-02a:9 N-1 | FIX-NOW | M0-f-02a | CLI arguments and exit codes held by receipts only (C01-C03): let run() take an injected manifest/root so a fixture test holds --fallback, --mode and the exit codes | N-1; C-0105
- M0-f-02a:10 N-2 | FIX-NOW | M0-f-02a | a job whose units() throws rejects the whole runTier (runner.ts:203): catch into the job's failBefore like C-0241 (3)'s load error | N-2
- M0-f-02a:11 N-3 | FIX-NOW | M0-f-02a | normalisation wording: say in C-0241 that "normalised by 1" is the measured ratio ≈ 1 on the reference machine (doc) | N-3
- M0-f-02a:12 N-4 | FIX-NOW | M0-f-02a | C-0241 (8) "no tier job writes into plat/" — type-check units emit gitignored declarations: reword (doc) | N-4
- M0-f-02a:13 N-5 | FIX-NOW | M0-k-04 | B-FUZZ partition repeats per-process work in every unit (batched sum overstated ×24): --no-ladders/--no-s11 for partition units or subtract a measured per-process floor; choices row — before the timing items | N-5
- M0-f-02a:14 N-6 | FIX-NOW | M0-f-02b | no real PR job declares suites (§13.8 empty-suite edge only over fixtures): M0-f-02b declares the spikes' seed families as suites | N-6
- M0-f-02a:15 N-7 | DONE | M0-f-02a | batched-mode idle test title covered by B-1's fix | N-7; checks/M0-f-02a.md B-1
- M0-f-02a:16 N-8 | FIX-NOW | M0-f-02a | batched idle default on the measured path held by a probe only (R19e): a sleep seam in RunTierOptions keeping readings measured, or M0-t-00's receipt records elapsed vs 30 s × attempts | N-8

### M0-f-03a

- M0-f-03a:16 N-1 | FIX-NOW | session | harness-injected context (memory index, git status) has no CLEAN-ROOM §1 sentence; seats disclose it row by row: one session ruling and a §1 sentence; see §5 | N-1; L-0120, L-0121
- M0-f-03a:17 N-2 | FIX-NOW | M0-f-03a | no test ties the table's warp.halvings floor to the kernel's MAX_HALVINGS (two separate literal-8 pins): a cross-pin reading both | N-2; C-0301
- M0-f-03a:18 N-3 | DONE | session | census unchanged at 182 (TABLE_IDS excludes workLimits); Q16 closed with it | Q16 DONE 105bc980
- M0-f-03a:19 N-4 | FIX-NOW | session | M0-work.json M0-f-03a builds/test id still say every row has placeholder provenance: amend to "every counting row (a fixed row's floor is pinned, C-0301)" (spec lane) | N-4
- M0-f-03a:20 N-5 | FIX-NOW | session | M0-f-03b's twin entry still reads as if every row is rewritten (no fixed-row exemption): spec-lane edit | N-5; Q16 note
- M0-f-03a:21 N-6 | FIX-NOW | session | skeleton.events any-version law (perUnit ≥ 8, floor ≥ 64) will refuse M0-f-03b's measured 1.73/vertex: rule (a) max(measured, law) in f-03b's brief or (b) gate skeletonLaw on PIN.version — before f-03b lands; see §5 | N-6; C-0168 (5)
- M0-f-03a:22 N-7 | FIX-NOW | M0-f-03a | the PIN gate itself exercised only by a real hand-over (T1): route through placeholderGate(t) and expect skipped past the PIN on simulations | N-7
- M0-f-03a:33 W-1 | NOTE | M0-f-03a | R2 tables change map row | C-0325
- M0-f-03a:34 W-2 | NOTE | M0-f-03a | R2 tables change map row | C-0325
- M0-f-03a:35 W-2 (test) | NOTE | M0-f-03a | R2 tables change map row | C-0325
- M0-f-03a:36 W-3 | NOTE | M0-f-03a | R2 tables change map row | C-0325
- M0-f-03a:37 W-4 | NOTE | M0-f-03a | R2 tables change map row | C-0325
- M0-f-03a:38 C-tables-5 | NOTE | M0-f-03a | R2 tables change map row | C-0325
- M0-f-03a:48 K06 | NOTE | M0-f-03a | R2 mutant map: killed | 
- M0-f-03a:49 K07 | NOTE | M0-f-03a | R2 mutant map: killed | 
- M0-f-03a:50 K09, K10, K11 | NOTE | M0-f-03a | R2 mutant map: killed | 
- M0-f-03a:51 K16 – K18, K20, M01, M03, M05, M07, M08… | NOTE | M0-f-03a | R2 mutant map: killed | 
- M0-f-03a:52 K19, M10 | NOTE | M0-f-03a | R2 mutant map: killed | 
- M0-f-03a:53 M04 | NOTE | M0-f-03a | R2 mutant map: killed | 
- M0-f-03a:54 M09 (as N12: tableCensus's filter dropp… | NOTE | M0-f-03a | R2 mutant map: killed | 
- M0-f-03a:55 N01 – N11, N16, N17 (new, on the W-1 li… | NOTE | M0-f-03a | R2 mutant map: killed | 
- M0-f-03a:56 N13, N14 (census reversed; census ignor… | NOTE | M0-f-03a | R2 mutant map: killed | 
- M0-f-03a:57 N15 (pinnedFile's sha line voided) | NOTE | M0-f-03a | N15 equivalent on the shipped file | 
- M0-f-03a:72 N-8 | FIX-NOW | M0-f-03a | key shape of row-only issues unpinned (A2 adds an undefined cell key): Object.keys pin for a row-only issue | N-8
- M0-f-03a:73 N-9 | FIX-NOW | M0-f-03a | table.ts header "every refusal names the table, the row and the cell" overstates: tighten (comment) | N-9

### M0-k-02

- M0-k-02:12 N-7 | FIX-NOW | M0-k-04 | a judge silent on the first seed makes the whole case pending (later failing verdicts unseen): decide pending on the case's declared coverage, or count a later verdict as failure; negative control in deferred.test.ts | N-7
- M0-k-02:13 N-8 | DUPLICATE | M0-k-04 | prefix replay at 10 seeds per case — declined by C-0227 (13); home M0-k-04 notes N-10 | M0-k-04-notes N-10
- M0-k-02:14 N-9 | DONE | M0-k-04 | the two warp cases are judged on the landed warp by the constructive runner (only KI-2 is a known finding) | testkit/src/invariants/constructive.ts CONSTRUCTIVE_KNOWN
- M0-k-02:15 N-10 | FIX-NOW | M0-k-02 | remove/stretch-way step rekey farPart from j2 does not say which end (119/200 draws ambiguous after C-0191): name the far end in the step | N-10; C-0191
- M0-k-02:16 N-11 | FIX-NOW | M0-k-02 | index/slot-reuse-stage 50 cm bound not pinned exactly (K03): pin seed 1045 (clearance exactly 50) | N-11
- M0-k-02:17 N-12 | FIX-NOW | M0-k-02 | no test asserts slot-reuse cases reuse a slot (K10): a slot-reused hold in both cases and its check in the judge (M0-k-04) | N-12

### M0-k-03

- M0-k-03:14 N1 | FIX-NOW | M0-a-08 | unattracted comparison reads ours as a region (a duplicated face passes): M0-a-08's and M0-a-09's harnesses check §3.10 hard invariants (ringProblems) on every case | N1; C-0144 (3)
- M0-k-03:15 N2 | NOTE | M0-k-03 | C-0150's test column omits fix round 3's F5 block; the next C-0150 amendment cites it | 

### M0-k-04

- M0-k-04:9 N-1 | FIX-NOW | M0-k-04 | C-0227 (3)/(4)/(14) wording ("no case materialises a coarser record") does not hold for the primitive's arena: amend; count judged remove∘insert per level in the report | N-1
- M0-k-04:10 N-2 | FIX-NOW | M0-k-02 | KI-2 limit/cap-move-halvings case data puts p exactly minEdge from q (inside attractCm): move p beyond attractCm, drop KI-2 | N-2; CONSTRUCTIVE_KNOWN
- M0-k-04:11 N-3 | FIX-NOW | M0-k-04 | known-pattern check reads failures capped at 20: count failures by pattern inside the judge or lift the cap | N-3
- M0-k-04:12 N-4 | FIX-NOW | M0-k-04 | bugs empty in runFuzz is vacuous (no family reaches mandatory E_OUT_OF_RANGE; K03): one planted bug outcome | N-4
- M0-k-04:13 N-5 | FIX-NOW | M0-k-04 | s11Problems split-count clause and S11 bench exit (K40/K41) survive: bench-level control | N-5; N-16
- M0-k-04:14 N-6 | CARRY-FORWARD | M0-k-04 | S11 workload times a refusal on ~1/3 of plots and counts setup failures as call-list faults — re-measured on B-CITY-lite's S11 | M1 (B-CITY-lite S11)
- M0-k-04:15 N-7 | FIX-NOW | M0-k-04 | kernelReadsNoModel resolves packages/kernel relative to the testkit source (throws from the built bundle): resolve via the package export | N-7
- M0-k-04:16 N-8 | FIX-NOW | M0-k-04 | §13.1 offset(−d)∘offset(+d) ⊆ original and corridorUnion "disjoint and covering" have no direct check: name the reading in a choices row or add the checks | N-8
- M0-k-04:17 N-9 | FIX-NOW | M0-k-04 | LIR "inside the face" checked on four corners only (a non-convex face): check LIR edges against ring edges | N-9
- M0-k-04:18 N-10 | CARRY-FORWARD | M0-k-04 | prefix replay at the PR size declined (C-0227 (13)) — revisit once the tier is timed | M0-t-01
- M0-k-04:19 N-11 | FIX-NOW | M0-k-04 | same-code-every-rung is a static reading that cannot fail on a code path: name it static in the case data | N-11
- M0-k-04:20 N-12 | FIX-NOW | M0-k-04 | summary ladder rows keep fixture.split(' ')[0] (prints "F-PLOT,"): keep the whole fixture id | N-12
- M0-k-04:21 N-13 | FIX-NOW | M0-k-04 | buffer yields ~4.3×10⁴ unattracted cases at the nightly 10⁶, below §13.1's ≥10⁵ per operation, and the guard is neither asserted nor reported: report it per primitive; draw buffer inputs that stay unattracted more often | N-13; spec N-14
- M0-k-04:22 N-14 | DONE | M0-k-04 | K34 negative control folded into B-4's required control | N-14; checks/M0-k-04.md B-4
- M0-k-04:33 N-15 | FIX-NOW | M0-k-04 | T9 (splitParent recorded after the split) survives: constructive control changing the arena after the split in a swapped-children way | N-15
- M0-k-04:34 N-16 | FIX-NOW | M0-k-04 | B3g (whole-run exit ignores report.pass) survives: whole toy run with a planted crash expects exit 1 | N-16
- M0-k-04:35 N-17 | FIX-NOW | M0-k-04 | K07b (E_BELOW_MIN_ANGLE term dropped) survives: plant it in judges.test | N-17
- M0-k-04:36 N-18 | FIX-NOW | M0-k-04 | K15b (insetRing collapsed-branch monotone) survives: plant collapse at d1 with ok d2 | N-18
- M0-k-04:37 N-19 | FIX-NOW | M0-k-04 | K42w (refused warp changed the arena) survives: add warp to the it.each | N-19
- M0-k-04:38 N-20 | FIX-NOW | M0-k-04 | T4 (landing bound ×10) killed only by the printed value: control just past the bound (2 cm landing move) | N-20

### M0-k-05

- M0-k-05:12 N-h | FIX-NOW | M0-k-05 | a stop (exit 2) leaves an earlier parity-report.json in place: remove it before the CLI runs (+ bench test pass-then-stop), or fresh output folders | N-h; C-0186
- M0-k-05:13 N-i | FIX-NOW | M0-k-05 | a run of reported rows exits 0 (no row gated): name the gating count in the summary, or exit 0 only when no gating cell is named | N-i; C-0186
- M0-k-05:14 N-j | FIX-NOW | M0-k-05 | baselines:check passes a crossing of an empty baselines.json: refuse or flag empty baselines/ng-faces (C1 line) | N-j

### M0-k-06

- M0-k-06:11 K6-1 | FIX-NOW | M0-k-06 | some source layouts of a list escape the column check (records one per line, two strings per line): read an array literal's strings as a column; three fixtures | K6-1; C-0247 (4)
- M0-k-06:12 K6-2 | FIX-NOW | M0-k-06 | a regex after ) (if/while/for head) is lexed as division, hiding a listed token: track the token before / | K6-2
- M0-k-06:13 K6-3 | FIX-NOW | M0-k-06 | one copied list on one JSON line is reported twice (line + column hit): report the column hit only when no line hit names it, or document | K6-3
- M0-k-06:14 K6-4 | NOTE | M0-k-06 | #facade-style colour candidate fails safe; allow if met | 
- M0-k-06:15 K6-5 | FIX-NOW | M0-k-06 | an allow entry without file silences its content everywhere: report how many hits each entry silenced (M0-k-07 reviewers prefer file-scoped entries) | K6-5; C-0247 (6)
- M0-k-06:16 K6-6 | FIX-NOW | M0-k-06 | scan.test "no deny-list" returns early once the list exists: assert the other branch (exit 0 or 1, never 2) | K6-6
- M0-k-06:17 K6-7 | FIX-NOW | M0-k-06 | JSON reader counts only \n as a line end: count a lone \r in json.ts ws() | K6-7
- M0-k-06:18 K6-8 | NOTE | M0-k-06 | M31/M33 equivalent | 
- M0-k-06:19 K6-9 | FIX-NOW | M0-k-06 | allow near-misses C05/C06/C10 survive: three cases in "near misses stay unreviewed" | K6-9
- M0-k-06:20 K6-10 | FIX-NOW | M0-k-06 | no test shows a 0x colour allow entry accepted (C12): add a 0x-form entry | K6-10

### M0-m-01

- M0-m-01:14 M-1 | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:15 M-1 | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:16 M-1 | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:17 M-1 | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:18 M-1 (pin) | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:19 M-2 | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:20 M-3 | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:21 C-model-1 | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:22 C-model-1 | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:23 C-model-1 | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:24 C-model-1 (pin) | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:25 §3.4 tests | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:26 (gate) | NOTE | M0-m-01 | R3 model change map row | C-model-1
- M0-m-01:37 A1 – A4 (new: Lifecycle from ../types/i… | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:38 A5 (new: export * for identity.js in ty… | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:39 A6 (new: walls.ts's import without the… | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:40 B1, B2 (new: "not yet landed when this… | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:41 B3 (new: BatchScope's edit typed string) | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:42 R1, R4, R12, R14 | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:43 R6, M4, M11 | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:44 R9 | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:45 P2, P16 | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:46 P7 | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:47 P8, P15 | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:48 P9 | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:49 P12, P13 | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:50 P17 | NOTE | M0-m-01 | R3 mutant map: killed | 
- M0-m-01:83 N-c1-1 | FIX-NOW | M0-m-01 | no-narration guard scans src only by a deny-list regex (tests and other phrasings escape): extend to test/ folders and share one pattern list with the other packages' guards | N-c1-1
- M0-m-01:84 N-c1-2 | FIX-NOW | M0-m-01 | import-path guard reads declarations only (an inline import('…').T type query escapes): walk ImportTypeNodes too | N-c1-2

### M0-s-01

- M0-s-01:12 N-1 | DONE | M0-s-01 | bundlePackage step pinned (MA5 red) | R2 test map (notes line 39)
- M0-s-01:13 N-2 | DUPLICATE | M0-s-01 | kernel-boundary slack verdict pin (MD1) — home L14 | L14
- M0-s-01:14 N-3 | DUPLICATE | M0-s-01 | dynamic import() in a kernel bench pin (MD14) — home L14 | L14
- M0-s-01:15 N-4 | DUPLICATE | M0-s-01 | kernel-boundary escapes (regex tokens, concatenation) — home L15 | L15
- M0-s-01:16 N-5 | DUPLICATE | M0-s-01 | bench-boundary escapes (require, createRequire, relative into testkit) — home L15 | L15
- M0-s-01:17 N-6 | CARRY-FORWARD | M0-s-01 | a packed @plat/kernel names registry versions (unpatched upstream), plat-source export and test declarations — before any publication (owner-gated; the kernel-extraction step) | publication / KI-8 kernel extraction
- M0-s-01:18 N-7 | FIX-NOW | session | nothing keeps API.md current: export list half held by api-surface.test (L32 (a)); add the marker check (each <!-- src/…:line --> code against its cited line) with Q51's documentation pass | N-7; Q51; L32
- M0-s-01:19 N-8 | DONE | M0-s-01 | kernel/src/index.ts header rewritten (X-1) | packages/kernel/src/index.ts:1-2
- M0-s-01:20 N-9 | NOTE | M0-s-01 | f2x.c credited collectively; no notice owed (optional mention) | 
- M0-s-01:21 N-10 | DONE | session | plat/undefined.cur removed; drift-grown runtime noted | L7
- M0-s-01:22 N-11 | DUPLICATE | M0-s-01 | landed tool pin gaps A6/A4/B6/V3 — home L14 | L14
- M0-s-01:23 N-12 | DUPLICATE | M0-s-01 | landed tool pin gaps A6/A4/B6/V3 — home L14 | L14
- M0-s-01:24 N-13 | DUPLICATE | M0-s-01 | landed tool pin gaps A6/A4/B6/V3 — home L14 | L14
- M0-s-01:25 N-14 | DUPLICATE | M0-s-01 | landed tool pin gaps A6/A4/B6/V3 — home L14 | L14
- M0-s-01:26 N-15 | NOTE | M0-s-01 | B7/A14 equivalent | 
- M0-s-01:27 N-16 | DONE | M0-s-01 | passed-ownership files resolved at the hand-over wave under any label | L12 DONE ef789977
- M0-s-01:37 landed/landed.test.mjs | NOTE | M0-s-01 | R2 test map row: mutants red | 
- M0-s-01:38 notices/notices.test.mjs | NOTE | M0-s-01 | R2 test map row: mutants red | 
- M0-s-01:39 notices/shipped.test.mjs | NOTE | M0-s-01 | R2 test map row: mutants red | 
- M0-s-01:40 scaffold/workspace.test.mjs | NOTE | M0-s-01 | R2 test map row: mutants red | 
- M0-s-01:41 vendor/verify.test.mjs, vendor/flatbush… | NOTE | M0-s-01 | R2 test map row: mutants red | 
- M0-s-01:49 N-17 | FIX-NOW | M0-s-01 | tools/landed pin gaps (A1-sym, A1-undef, A2-nested, A4-sep-true, A4-seat-loose, A4-2a): fixtures per gap | N-17
- M0-s-01:50 N-18 | FIX-NOW | M0-s-01 | checkLicences name-then-version order unpinned (N1-clo-ver/rev): planted dev map with two names and two versions | N-18
- M0-s-01:51 N-19 | FIX-NOW | M0-s-01 | listFiles final full-path sort unpinned (VT1-final): test a.js before a/x | N-19
- M0-s-01:52 N-20 | FIX-NOW | M0-s-01 | four more tools/landed pin gaps (A1-del-true, A2-false-landed, A4-ledger-cont, A4-col-sep): fixtures | N-20
- M0-s-01:53 N-21 | DONE | M0-s-01 | landed writes the index owner's per-line header claims; verify takes per-line removals from the index owner | L12 DONE ef789977 (J273 Q2)
- M0-s-01:54 N-22 | NOTE | session | X-1 edit timing vs M0-a-01 lanes: no collision | 
- M0-s-01:55 N-23 | FIX-NOW | M0-s-01 | tiny-sentinel header says "the thrown message is pinned text" — no test pins it: reword or add the test | N-23
- M0-s-01:64 N-24 | NOTE | session | label naming no wave reads every wave open; a giver loses its claim on re-landing (specified reading) | 
- M0-s-01:65 N-25 | FIX-NOW | M0-s-01 | a folder owner's edit of its own barrel line is claimed only by the index owner (fails safe at the close): let the folder owner's record claim its own line's removal in landed and verify | N-25; C-0064
- M0-s-01:66 N-26 | NOTE | M0-s-01 | M7/V4 equivalent | 

### M0-s-02

- M0-s-02:13 N1 | FIX-NOW | M0-s-02 | past a table's golden version every default pin of that table is skipped, not only the handed-over cells: pin the cells outside each hand-over unconditionally (run-item checkers also diff against version 1) | N1; C-0162 (1)
- M0-s-02:14 N2 | FIX-NOW | M0-s-02 | census snapshot, extension-cell list and "never a new key value" exact at every version (a hand-over adding a cell turns tables red, run items cannot edit tests): gate exact equality on atGolden and hold "no calibratable cell lost" past the pin | N2; C-0115/C-0117
- M0-s-02:15 N3 | CARRY-FORWARD | M0-s-02 | preset values not checked against the cell's admissible words (only defaults read) — M1's preset resolution reads presets through the same reader | M1 parity presets (§4b, §7.6)
- M0-s-02:26 T-1 | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:27 T-2 | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:28 T-3 | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:29 T-4 | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:30 T-5 (a) | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:31 T-5 (b) | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:32 T-5 (c) | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:33 T-6 | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:34 T-7 | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:35 T-8 | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:36 T-9 | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:37 C-tables-1 – 4 | NOTE | M0-s-02 | R1 tables change map row | C-0323
- M0-s-02:43 refusal(f) (failure path 'no refusal') | NOTE | M0-s-02 | R1 test helper map row | C-0323
- M0-s-02:44 deepCopy(x), rawTable(id) | NOTE | M0-s-02 | R1 test helper map row | C-0323
- M0-s-02:45 cell(value, unit, calibratable?) | NOTE | M0-s-02 | R1 test helper map row | C-0323
- M0-s-02:46 oneCell(c), ONE_CELL | NOTE | M0-s-02 | R1 test helper map row | C-0323
- M0-s-02:47 pinnedFile(file, id, pin) | NOTE | M0-s-02 | R1 test helper map row | C-0323
- M0-s-02:66 N4 | DUPLICATE | M0-s-02 | TableError undefined-valued class fields — home L22 | L22
- M0-s-02:67 N5 | NOTE | M0-s-02 | checkCell via issueAt equivalent for every CellAt | 
- M0-s-02:76 N6 | DUPLICATE | M0-s-02 | STABLE_KEY admits "/" (N07) — home L22 | L22
- M0-s-02:77 N7 | DUPLICATE | M0-s-02 | tables.test.ts:281 round citation — home L22 | L22
- M0-s-02:78 N8 | NOTE | M0-s-02 | TABLE_IDS was never frozen; the plan's sentence is the error | 

### M0-spec

- M0-spec:12 N-01 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | M0-work.json items; checks/<item>.md
- M0-spec:13 N-02 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | M0-work.json items; checks/<item>.md
- M0-spec:14 N-03 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | M0-work.json items; checks/<item>.md
- M0-spec:15 N-04 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | M0-work.json items; checks/<item>.md
- M0-spec:16 N-05 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | M0-work.json items; checks/<item>.md
- M0-spec:17 N-06 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | M0-work.json items; checks/<item>.md
- M0-spec:18 N-07 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | M0-work.json items; checks/<item>.md
- M0-spec:19 N-08 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | M0-work.json items; checks/<item>.md
- M0-spec:20 N-09 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | M0-work.json items; checks/<item>.md
- M0-spec:21 N-10 | CARRY-FORWARD | session | fix rounds after M0-x-01 (e.g. a deny-list reuse fix) listed and re-tested in M0-x-03's addendum (AFTER-M-1) | M0-x-03
- M0-spec:22 N-11 | DUPLICATE | session | validator exceptions and rule — N-17 of this file | N-17
- M0-spec:23 N-12 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | 
- M0-spec:24 N-13 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | 
- M0-spec:25 N-14 | DUPLICATE | M0-k-04 | §13.1 ≥10⁵ unattracted guard at the nightly size — M0-k-04 notes N-13 | M0-k-04-notes N-13
- M0-spec:26 N-15 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | 
- M0-spec:27 N-16 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) | 
- M0-spec:28 N-17 | FIX-NOW | M0-s-01 | the M0-work.json validator (V1-V3: owns, dependsOn, waves) lives only in a scratchpad: port it into tools/scaffold as a test over M0-work.json | N-17; C-0122
- M0-spec:29 N-18 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:30 N-19 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:31 N-20 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:32 N-21 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:33 N-22 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:34 N-23 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:35 N-24 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:36 N-25 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:37 N-27 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:38 N-28 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:39 N-29 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (design hand-offs applied) | 
- M0-spec:40 N-30 | CARRY-FORWARD | session | re-fitted plot-depth, dense-core floor and deep shares applied to the tables by M0-b-05a (AFTER-M-1); Block.depthClass doc carries no stale factor | M0-b-05a; records/districts.ts:79
- M0-spec:41 N-26 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (M-1 hand-offs) | 
- M0-spec:42 N-31 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (M-1 hand-offs) | 
- M0-spec:43 N-32 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (M-1 hand-offs) | 
- M0-spec:44 N-33 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (M-1 hand-offs) | 
- M0-spec:45 N-34 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (M-1 hand-offs) | 
- M0-spec:46 N-35 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (M-1 hand-offs) | 
- M0-spec:47 N-36 | NOTE | session | build-time spec guidance for the named item; consumed by its landed build and checks (the checker rows read it) (M-1 hand-offs) | 
- M0-spec:48 N-37 | DONE | M0-a-05 | endpoint route before any refusal (N-37) | M0-a-05 S1/S2; C-0202
- M0-spec:49 N-38 | DUPLICATE | session | wedge routing ruling — its §3.6 amendment is KI-2's | KI-2
- M0-spec:50 N-39 | DONE | M0-a-08 | harness records each refusal's step; oracle-own refusals excluded from the allowance | C-0231; M0-a-08 S1
- M0-spec:51 N-40 | DUPLICATE | session | N-37/N-38 amendments — §3.6 text amendment is KI-2's | KI-2
- M0-spec:52 N-41 | DONE | M0-a-08 | stretch leave point bound reading; harness measures §3.7 (i) on such cases | C-0205; M0-a-08 rounds
- M0-spec:53 N-42 | DONE | M0-a-05 | round S3 diagnosis and fix of the clearance class | M0-a-05 S3-S6; residual KI-1 → census (Q44)
- M0-spec:54 N-43 | DONE | M0-a-05 | fidelity bound N-43 B ruled and built; line A pinned | C-0215, C-0217; router.test.ts
- M0-spec:55 N-44 | NOTE | session | standing owner-approved rule (N-44 failure bar; N-45 fail safe now, harden later) | J201; J202
- M0-spec:56 N-45 | NOTE | session | standing owner-approved rule (N-44 failure bar; N-45 fail safe now, harden later) | J201; J202
- M0-spec:57 N-46 | DUPLICATE | session | N-46's amendments of §3.6/§13.1/C-0177 (14) — home KI-2 | KI-2
- M0-spec:58 N-47 | DONE | M0-a-06 | remove path leaves own-child records — fixed | M0-a-06 rounds; N-55
- M0-spec:59 N-48 | NOTE | session | standing rule N-48 (closing-check survivors on confirmed-correct code are KI notes) | J214
- M0-spec:60 N-49 | DONE | M0-a-14 | indexFreshness admits dead coarser ITEM_FACE writes | C-0235 (M0-a-14 s1)
- M0-spec:61 N-50 | DONE | M0-c-05 | far-side clearance change (a) built | C-0260
- M0-spec:62 N-51 | DONE | M0-e-04 | claimable predicate treats land:<n> as S1's background owner | C-0265
- M0-spec:63 N-52 | DONE | M0-a-09 | N-52's rounds (kerb split, spurs, slit lane) landed; its exact-0 half is Q19 | Q2, Q3, Q4 DONE; Q19
- M0-spec:64 N-53 | DONE | M0-a-04 | N-53's rounds landed | Q1, Q17 DONE
- M0-spec:65 N-54 | DONE | M0-c-02 | N-54's rounds landed | Q5-Q8 DONE
- M0-spec:66 N-55 | DONE | M0-a-06 | N-55's rounds landed | Q9-Q14 DONE
- M0-spec:67 N-56 | DONE | M0-e-03 | N-56's rounds landed | Q16, Q20-Q22, Q28 DONE
- M0-spec:68 N-57 | DONE | M0-b-03 | N-57's rounds landed (the kerb offset is L21) | Q41-Q43; L21
- M0-spec:69 N-58 | NOTE | session | standing owner-approved rule N-58 (one verdict per refusal class; the census L23) | J290; L23
- M0-spec:70 N-59 | DUPLICATE | M0-b-03 | N-59's hardening pins and KIs — home L25 | L25

### M0-x-02

- M0-x-02:6 1 | FIX-NOW | M0-x-02 | callback stage batch with ops: [] (U18) untested: assert batch({…, ops: []}, fn) throws "callback form" | note 1
- M0-x-02:11 2 | FIX-NOW | M0-x-02 | bind's refusal of a second key for one address untested (U22): PB's shape → "bound to another entity key" | note 2; C-0224 (6)
- M0-x-02:17 3 | FIX-NOW | M0-x-02 | census run option untested (U23): KeyCensus size ≥ stream requests | note 3
- M0-x-02:22 4 | FIX-NOW | M0-x-02 | a batch failing two hard rows reports the second as pass: true (the kernel names only problems[0]): mark the other rows "not evaluated", or return every failed expect | note 4
- M0-x-02:31 5 | FIX-NOW | M0-x-02 | a batch refused before its expectations ran counts them as passing evaluations: count only on commit or an expect code | note 5
- M0-x-02:34 6 | FIX-NOW | M0-x-02 | RunOptions.arenas precondition (spatial index) unstated: document it or refuse an unindexed arena by name | note 6
- M0-x-02:40 7 | FIX-NOW | M0-x-02 | sink accepts ladderUse tier < 2 and a §3.1 kernel code in warning (§5.4): refuse both | note 7
- M0-x-02:48 8 | FIX-NOW | M0-x-02 | listed test 6 compares S6/S8 by draws, not faces: also compare the faces they create | note 8
- M0-x-02:61 9 | FIX-NOW | M0-x-02 | B-1's test fixes n < r (V04 max(n, r) survives): add an n > r case (r = 0 under {S5: 1}) | note 9
- M0-x-02:78 10 | FIX-NOW | M0-x-02 | guard does not judge batch-scope soft rows (C-0316 (3)): require ≥1 evaluation when the stage committed through the door | note 10
- M0-x-02:86 11 | DUPLICATE | M0-b-03 | S8 block-floor reads count 0 (batches bypass the runner's door) — home Q39 | Q39
- M0-x-02:100 12 | FIX-NOW | M0-x-02 | K19: no test pins that a guard-refused stage's warnings are dropped: fixture stage returning a warning without reporting its row | note 12
- M0-x-02:107 13 | FIX-NOW | M0-x-02 | a stage returning ok({}) with a non-null input is not judged (C-0316 (4) exemption too wide): judge every stage whose inputsOf returned non-null | note 13
- M0-x-02:114 14 | DONE | M0-c-02 | base RIVER seed 2 S5 refusal fixed | Q40 DONE 194eb090; note 17
- M0-x-02:130 test/pipeline/core/order.test.ts | NOTE | M0-x-02 | R2 test map row | 
- M0-x-02:131 test/pipeline/core/registry.test.ts | NOTE | M0-x-02 | R2 test map row | 
- M0-x-02:132 test/pipeline/core/runner.test.ts | NOTE | M0-x-02 | R2 test map row | 
- M0-x-02:133 test/pipeline/core/rows.test.ts | NOTE | M0-x-02 | R2 test map row | 
- M0-x-02:134 test/pipeline/core/rows-base.test.ts | NOTE | M0-x-02 | R2 test map row | 
- M0-x-02:135 test/pipeline/core/support.ts | NOTE | M0-x-02 | R2 test map row | 
- M0-x-02:142 15 | FIX-NOW | M0-x-02 | sink's undeclared-row refusal pinned by pattern only (R5); evaluate/neverEvaluated texts unpinned (R09): pin the three texts exactly | note 15; note 20
- M0-x-02:149 16 | NOTE | M0-x-02 | two titles keep "Q32" (a title is an oracle's name) | 
- M0-x-02:153 17 | NOTE | M0-x-02 | note 14's refusal no longer met (Q40) | 
- M0-x-02:163 18 | FIX-NOW | M0-x-02 | kernel block name order unpinned (R04): assert Object.keys(report.kernel.warnings) | note 18
- M0-x-02:172 19 | FIX-NOW | M0-x-02 | integer-like names escape the report records' name order (JS key order): refuse integer-like codes/counters at the sink and registration, or document | note 19
- M0-x-02:180 20 | DUPLICATE | M0-x-02 | undeclared-row texts of evaluate/neverEvaluated — note 15 | note 15
- M0-x-02:187 21 | FIX-NOW | M0-x-02 | report.ts:14-16 omits C-0316 (4)'s scope ("of a stage that reached its end") (comment) | note 21
- M0-x-02:194 22 | NOTE | session | choices id collision ahead (drift.test cites C-0331) — renumbered by the id rule at its landing | 

### M0-x-04

- M0-x-04:9 1 | ROUTED-TO-CENSUS | M0-c-04 | S5 refuses on river fixtures (E_DEGENERATE stretch; F-WALL E_SELF_INTERSECT "later rungs are M1's"; gate not on trace) — later-stage trace across a river; verdict incl. notBuilt naming | KI-10; Q46; Q52
- M0-x-04:10 2 | DUPLICATE | M0-c-04 | S5a batches callback vs §4.1 "declared" — M0-c-04 notes N-7 | M0-c-04-notes N-7
- M0-x-04:11 3 | DUPLICATE | M0-e-04 | S6 district count above N_d ± 1 on the base fixtures — home KI-11 | KI-11
- M0-x-04:12 4 | FIX-NOW | M0-x-04 | enceintes and reservations data keys unpinned (M39/M41): run.test asserts enceintes = S3's + every walled stage's, reservations = [plaza] | note 4
- M0-x-04:13 5 | FIX-NOW | M0-x-04 | registerBase's doc claims a run-time order assertion it does not make: say "tested" or add the stageOrder check | note 5; base.ts:832-844
- M0-x-04:14 6 | FIX-NOW | M0-x-04 | districtValue falls back to the field's value at the origin: detect and refuse E_INVARIANT | note 6; base.ts:748-749
- M0-x-04:15 7 | FIX-NOW | M0-x-04 | "base.ts is the one file" scan weak (a file naming nine factories passes): no other file imports more than one stage factory from another item | note 7
- M0-x-04:16 8 | FIX-NOW | M0-x-04 | W_LAND_UNCLAIMED fires only on landHa 0: soft check that S6's land ≥ the land under S5's last boundary less reservations and strips | note 8
- M0-x-04:17 9 | NOTE | session | author's read-only git status disclosed (L-0328) | 
- M0-x-04:18 10 | CARRY-FORWARD | M0-x-04 | S3 throws (no S5 rank) in a stage set without S5 — only a product reusing S3 without S5 (PART III) meets it | M1 products
- M0-x-04:19 11 | FIX-NOW | M0-x-04 | order of S4's built bridges reaching S6 unpinned (F9; one bridge on every fixture): fixture with two bridgehead bridges (CITY frame) asserting the order | note 11

### M0-x-05

- M0-x-05:5 1 | FIX-NOW | M0-x-05 | table not cross-checked against the stages' own ladder declarations (S3's unserved, F-WALL reroute): walker test over registerBase's ladder declarations | note 1
- M0-x-05:12 2 | FIX-NOW | M0-x-05 | verdict does not fold in fixture runs' bugs: carry a bugs count per fixture, require 0 | note 2
- M0-x-05:16 3 | FIX-NOW | M0-x-05 | F-BUDGET-STAGE accept_shortfall reached via the walled skip: stronger fixture (×4 demand: top_up then accept_shortfall); M0-c-05 looks at the shortfall growing after the top-up | note 3
- M0-x-05:21 4 | FIX-NOW | M0-x-05 | checkLadderTable pre-names kernel ladders without consulting the kernel report: derive them from kernel.ladders | note 4
- M0-x-05:25 5 | FIX-NOW | M0-x-05 | "reproduces byte for byte" tested in one process without the plain baseline: second-process comparison | note 5
- M0-x-05:28 6 | FIX-NOW | M0-x-05 | W_CUT_SLID leaf counts slide steps, not slid cuts: name the unit or count cuts | note 6
- M0-x-05:30 7 | FIX-NOW | M0-x-05 | route.nodes fixtures use the direct option, not a workLimits table (law path unexercised): table injection in S3/S4, or a note in C-0269 | note 7; C-0269 (3)
- M0-x-05:34 8 | FIX-NOW | M0-x-05 | F-CUT's "nowhere on the plain fixture" rests on one 200×150 m control: second convex non-rectangular control | note 8; C-0269 (2)
- M0-x-05:37 9 | DUPLICATE | M0-c-06 | RELATED red hausdorff S8≡S9 is Q19's (exact-0); the S5b unserved stage-3 road is F-ROUTE's designed rung (C-0304), M0-c-04's | Q19; C-0304

### M0-x-06

- M0-x-06:10 1 | ROUTED-TO-CENSUS | M0-x-06 | planted unlawful kinds refused whole (zero-length/self-touching E_DEGENERATE/E_INVARIANT) are stage-ladder shortfalls: REFUSE vs REPAIR per stage owner, the census judges | note 1; N-58
- M0-x-06:11 2 | DONE | M0-x-06 | stage bug abort leaving earlier committed batches: runner rolls the whole stage back | Q14 DONE (runner rollback)
- M0-x-06:12 3 | FIX-NOW | M0-x-06 | S5c/S5d laddered judge takes any F-NUM rung: match the rung code and proposal to the planted insert; pin with mutant M27 | note 3; M27
- M0-x-06:13 4 | FIX-NOW | M0-x-06 | cliff x frame recomputes the hydro grid: read S1's stored terrain.hydro; pin that a stored-grid change is seen | note 4
- M0-x-06:14 5 | FIX-NOW | M0-x-06 | bridge x frame meets no built span on probed seeds: pick a frame/seed where S4 builds spans so the "every built span" half is live; pin | note 5
- M0-x-06:15 6 | CARRY-FORWARD | M0-x-06 | trace not inset by the outer strip at M0 (inset >= 0 accepted vs EP-20 > 0): waits for the M1 strip/trace law | note 6; S3 (6); C-0273 (9)
- M0-x-06:16 7 | FIX-NOW | M0-x-06 | EP-20 requestedVsBuilt clause has no milestone in the coverage table: add its milestone row | note 7
- M0-x-06:17 8 | DUPLICATE | M0-f-02b | edge suite cost far above C-0100 estimate: the nightly budget home | Q49
- M0-x-06:18 9 | FIX-NOW | M0-x-06 | S5 driver parity pinned only on SMALL_FLAT 11/12 (M29 survived): add MID_FLAT and EP-20 frame parity seeds | note 9; M29
- M0-x-06:19 10 | FIX-NOW | M0-x-06 | hang judged after the run returns; vitest timeout not attributed to a seed: per-seed attribution of timeouts | note 10
- M0-x-06:20 11 | FIX-NOW | M0-x-06 | deferred stubs hand-roll notBuilt error: use the project notBuilt helper (message pinned by coverage test) | note 11
- M0-x-06:21 12 | FIX-NOW | M0-x-06 | S6 cells: drop the unneeded zero-length exemption and check the kind's shape, not vertex count only | note 12
- M0-x-06:22 13 | FIX-NOW | session | verify EP-26 milestone (M-SF vs M1) against §16 row text; fix coverage.ts EP_ROWS if wrong | note 13
- M0-x-06:23 14 | NOTE | M0-x-06 | EP-16 tau within e_hi*2^-48, fail-safe; disclosure | note 14; C-0273 (10)
- M0-x-06:24 15 | NOTE | M0-x-06 | equivalent mutant M12 with stated reason | note 15
- M0-x-06:61 A | ROUTED-TO-CENSUS | M0-c-03 | census class A: S4 spines batch refused E_INVARIANT role consistency (lawful-input refusal) | x-06 fix2 A; Q52
- M0-x-06:62 B | ROUTED-TO-CENSUS | M0-c-02 | census class B: layStrips closed no strip face (Q37 class) | x-06 fix2 B; Q37; Q52
- M0-x-06:63 C | ROUTED-TO-CENSUS | M0-c-02 | census class C: gate not on committed trace | x-06 fix2 C; Q52
- M0-x-06:64 D | ROUTED-TO-CENSUS | M0-c-02 | census class D: water crossing has no clear chord (Q40 remainder, Q46) | x-06 fix2 D; Q46; Q52
- M0-x-06:65 E | ROUTED-TO-CENSUS | M0-c-02 | census class E: F-WALL trace touches after re-offset/union-simplify rungs; later rungs M1 (C-0085) | x-06 fix2 E; Q52
- M0-x-06:66 F | ROUTED-TO-CENSUS | M0-c-02 | census class F: trace insert E_DEGENERATE empty | x-06 fix2 F; Q52
- M0-x-06:72 A | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:73 A | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:74 A | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:75 A | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:76 A | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:77 A | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:78 A | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:79 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:80 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:81 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:82 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:83 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:84 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:85 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:86 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:87 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:88 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:89 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:90 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:91 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:92 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:93 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:94 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:95 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:96 B | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:97 C | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:98 D | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:99 D | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:100 D | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:101 D | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:102 E | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:103 E | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:104 E | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:105 E | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:106 F | ROUTED-TO-CENSUS | M0-c-02 | per-seed lawful-refusal row of census classes A-F (owners c-03/c-02/c-01 by class) | x-06 fix2 seed table; Q52
- M0-x-06:117 X1 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:118 X2 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:119 X3 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:120 X4 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:121 X5 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:122 X6 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:123 X7 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:124 X8 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:125 X9 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:126 X10 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:127 X11 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:128 X12 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:129 X13 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:130 X14 | NOTE | M0-x-06 | mutant killed (pin holds) | x-06 fix2 mutant table
- M0-x-06:138 r2-1 | NOTE | M0-x-06 | census counts preparation-state refusals; outcome counts may move after a stage fix (disclosure) | r2-1
- M0-x-06:139 r2-2 | DUPLICATE | M0-f-02b | folder timing / 1000-seed wall time: nightly budget home | Q49
- M0-x-06:148 c2-1 | FIX-NOW | M0-x-06 | rare pin seed list checked only at nightly size (X12): a PR-size check of every named seed list | c2-1
- M0-x-06:149 c2-2 | FIX-NOW | M0-x-06 | S8 cell rollback branch unexercised: a fabricated-refusal test drives takeSavepoint/restoreSavepoint path | c2-2
- M0-x-06:150 c2-3 | NOTE | M0-x-06 | brief seed transposition 1595423433 vs 1595424233; disclosure | c2-3
- M0-x-06:151 c2-4 | ROUTED-TO-CENSUS | M0-a-05 | S5a coincident 5 refusals classed UNLAWFUL by lawfulPlant; whether a coincident doubled trace is lawful is a census/session ruling (M0-a-05 / M0-c-02) | c2-4

## §3 The fix-round batching (J237 (2))

One proposed round per owning item, in the recommended order (dependencies first). "rows" are this file's FIX-NOW rows; "queue" the
HARDENING / OPEN rows of docs/M0-FIX-QUEUE.md it also takes (refusal classes excluded); "census" where a MAKE-IT-SUCCEED round of the
refusal census (L23) merges into the same item's round. Size: small ≤ 6 rows + queue rows, medium 7–15, large > 15 or a code-path change.
Rounds with no dependency on each other run in parallel children; the kernel leaves (a-01 … a-04, a-07, a-10, a-13, a-15) can open at once.

1. **M0-a-09 + M0-b-03 (Q18 perf round)** — large; order: FIRST (N-56 §7): reading the kerb on the real arena's overlay; after a-09 s6 (Q48) lands.
   queue: Q18 (KI-12), closing check Q19 (KI-13); the session's Q50 per-stage profile runs beside it. census: none (fix rows stay in the items' own rounds below).
2. **M0-a-14** — large; order: running now; independent of Q18.
   rows (19): M0-a-14:13 2, M0-a-14:18 3, M0-a-14:23 5, M0-a-14:38 8, M0-a-14:58 11, M0-a-14:61 12, M0-a-14:66 13, M0-a-14:74 15, M0-a-14:80 16, M0-a-14:83 17, M0-a-14:89 18, M0-a-14:92 19, M0-a-14:96 20, M0-a-14:100 21, M0-a-14:126 24, M0-a-14:209 N-c1-1, M0-a-14:222 N-c1-4, M0-a-14:223 N-c1-5, M0-a-14:224 N-c1-6.
   queue: Q56, Q61 — IN FLIGHT as M0-a-14 s3 (child I, J352); the rows below join s3 if it is still open, else an s4. census: —.
3. **M0-a-01** — small; order: kernel leaf: early, parallel.
   rows (2): M0-a-01:305 N-c3c-1, M0-a-01:306 N-c3c-2.
   queue: L19 (BigInt fallback past the 2^53 bound, 40 km pin), (L32 reads OPEN but both its ratchets landed with C-0337: mutants N-c3-1/N-c3-2 red at M0-a-01-notes:228-229 — mark it DONE, §5 Q14). census: —.
4. **M0-a-02** — small; order: kernel leaf: early, parallel.
   rows (3): M0-a-02:12 N-s1-2 (KI), M0-a-02:124 N-c2-1 (comment t…, M0-a-02:125 N-c2-2 (comment t….
   queue: —. census: —.
5. **M0-a-03** — small; order: kernel leaf: early, parallel.
   rows (5): M0-a-03:15 N-5, M0-a-03:161 N-c1-3, M0-a-03:162 N-c1-4, M0-a-03:163 N-c1-5, M0-a-14:225 N-c1-7.
   queue: —. census: —.
6. **M0-a-04** — medium; order: early, parallel.
   rows (6): M0-a-04:16 N-6, M0-a-04:27 N-10, M0-a-04:45 N-13, M0-a-04:113 N-c2-1, M0-a-04:115 N-c2-3, M0-a-05:177 N-c2-6.
   queue: L1 (exempt parameter, placeAcross one call). census: —.
7. **M0-a-15** — medium; order: early, parallel.
   rows (13): M0-a-02:114 N-c1-6 (machine t…, M0-a-15:12 2, M0-a-15:17 3, M0-a-15:21 4, M0-a-15:24 5, M0-a-15:27 6, M0-a-15:31 7, M0-a-15:36 9, M0-a-15:40 10, M0-a-15:42 11, M0-a-15:45 12, M0-a-15:55 13 K12, M0-a-15:175 16.
   queue: L16 (compacted arena: fresh generation or key). census: —.
8. **M0-a-06** — large; order: after a-06 s6 lands (in flight) and the census verdict on Q62.
   rows (15): M0-a-06:14 N-9, M0-a-06:17 N-12, M0-a-06:21 N-16, M0-a-06:22 N-17, M0-a-06:24 N-19, M0-a-06:25 N-20, M0-a-06:26 N-21, M0-a-06:27 N-22, M0-a-06:28 N-23, M0-a-06:30 N-25, M0-a-06:202 N-c1-4, M0-a-06:214 N-c1-7, M0-a-06:217 N-c1-10, M0-a-06:352 N-s6c-2, M0-a-16:96 12.
   queue: Q57 (recordLeftOf to WALK_REACH_CM + MK/ML pins), L11 (foldedBase ≤ … → 0), L17 (generation on nested restore), L10 (seeded fc.assert, with M0-k-01), L8 (split-face rank, with M0-a-05), Q61's tx (c) `single` part. census: Q62 (lawful remove-lane refusals, MAKE-IT-SUCCEED expected) merges here.
9. **M0-a-05** — large; order: after the census; before c-02/c-04/e-03 (they consume insertChain).
   rows (22): M0-a-05:17 N-2, M0-a-05:18 N-3, M0-a-05:19 N-4, M0-a-05:20 N-5, M0-a-05:21 N-6, M0-a-05:22 N-7, M0-a-05:23 N-8, M0-a-05:26 N-11, M0-a-05:27 N-12, M0-a-05:29 N-14, M0-a-05:33 N-18, M0-a-05:34 N-19, M0-a-05:37 N-22, M0-a-05:38 N-23, M0-a-05:160 N-c1-4, M0-a-05:162 N-c1-6, M0-a-05:172 N-c2-1, M0-a-05:174 N-c2-3, M0-a-05:175 N-c2-4, M0-a-05:251 N-s8-3, M0-a-05:266 N-s8c-5, M0-a-15:6 1.
   queue: L26 (structured refusal field, with M0-e-03 reading it), L8 (with a-06). census: Q44 / KI-1 (insertChain router, MAKE-IT-SUCCEED expected) merges here; Q64 if the census names insertChain.
10. **M0-a-07** — small; order: kernel: parallel.
   rows (5): M0-a-05:178 N-c2-7, M0-a-07:9 N-1, M0-a-07:10 N-2, M0-a-07:12 N-4, M0-a-07:14 N-6.
   queue: —. census: —.
11. **M0-a-08** — large; order: after the census verdict on KI-7.
   rows (15): M0-a-08:6 1 K30, M0-a-08:12 2, M0-a-08:28 4, M0-a-08:32 5, M0-a-08:37 6, M0-a-08:40 7, M0-a-08:48 9, M0-a-08:116 17, M0-a-08:155 22, M0-a-08:163 23, M0-a-08:173 26, M0-a-08:189 28, M0-a-08:342 N-c1c-3, M0-a-08:359 N-c1c-5, M0-k-03:14 N1.
   queue: —. census: KI-7 (insetRing reads an overlay refusal as empty) merges here if the census rules REPAIR/MAKE-IT-SUCCEED.
12. **M0-a-09** — large; order: after Q18 and a-09 s6 (Q48): same code.
   rows (21): M0-a-01:94 N-c2-1, M0-a-08:287 N-c1-1, M0-a-09:6 1 KI-1, M0-a-09:19 3 K34, M0-a-09:24 4 K35, M0-a-09:28 5 K05, M0-a-09:32 6, M0-a-09:37 7, M0-a-09:42 8, M0-a-09:54 11, M0-a-09:57 12, M0-a-09:59 13, M0-a-09:79 18 R04, M0-a-09:102 21 X11, M0-a-09:115 23, M0-a-09:123 24 XR1, M0-a-09:158 27, M0-a-09:169 28, M0-a-09:199 30 N12, M0-a-09:207 31 N2, M0-a-09:219 32.
   queue: L21 (kerb long edges pinned before the read). census: Q58, Q59 (MAKE-IT-SUCCEED, N-45 (a)) merge here.
13. **M0-a-10** — small; order: kernel: parallel.
   rows (5): M0-a-10:12 N-7, M0-a-10:13 N-8, M0-a-10:14 N-9, M0-a-10:72 N-c1c-1, M0-a-10:73 N-c1c-2.
   queue: —. census: —.
14. **M0-a-11** — small; order: after the census.
   queue: —. census: Q63 (skeleton planarity downgrade on two corpus footprints, MAKE-IT-SUCCEED) is the round.
15. **M0-a-13** — medium; order: kernel: parallel.
   rows (13): M0-a-13:7 1, M0-a-13:14 2, M0-a-13:17 3, M0-a-13:21 4, M0-a-13:24 5, M0-a-13:34 8, M0-a-13:37 9, M0-a-13:47 10, M0-a-13:53 11, M0-a-13:152 N-r10c-1, M0-a-13:153 N-r10c-2, M0-a-13:154 N-r10c-3, M0-a-13:157 N-r10c-6.
   queue: —. census: —.
16. **M0-a-16** — medium; order: after the §5 ruling on note 11 (the open-frame guard).
   rows (14): M0-a-16:12 2, M0-a-16:18 3, M0-a-16:23 4, M0-a-16:29 5, M0-a-16:34 6, M0-a-16:40 7, M0-a-16:43 8, M0-a-16:46 9, M0-a-16:78 11, M0-a-16:108 13, M0-a-16:113 14, M0-a-16:227 16, M0-a-16:235 17, M0-a-16:243 18.
   queue: —. census: —.
17. **M0-m-01** — small; order: the API pass: before the stages that import the stamp builder.
   rows (2): M0-m-01:83 N-c1-1, M0-m-01:84 N-c1-2.
   queue: L3, L4 (re-exports into @plat/model), L30 (generatedLifecycle builder, with M0-d-04). census: —.
18. **M0-d-04** — large; order: with or right after M0-m-01.
   rows (15): M0-d-04:6 1 N-1, M0-d-04:10 2 N-2, M0-d-04:16 3 N-3, M0-d-04:22 5 N-5, M0-d-04:24 6 N-6, M0-d-04:32 9 N-9, M0-d-04:34 10 N-10, M0-d-04:44 12 N-12, M0-d-04:49 13 N-13, M0-d-04:53 14 N-14, M0-d-04:62 15 N-15, M0-d-04:70 16 N-16, M0-d-04:152 N-c1-3, M0-d-04:181 N-c1-6, M0-d-04:188 N-c1-7.
   queue: L30 (with M0-m-01). census: —.
19. **M0-d-05a** — small; order: parallel.
   rows (4): M0-d-04:159 N-c1-4, M0-d-05a:15 N-1, M0-d-05a:16 N-2, M0-d-05a:89 N-c2-2.
   queue: —. census: —.
20. **M0-d-05b** — small; order: parallel.
   rows (6): M0-d-05b:11 N-1, M0-d-05b:12 N-2, M0-d-05b:13 N-3, M0-d-05b:105 N-c1-2, M0-d-05b:134 N-cc1-1, M0-d-05b:135 N-cc1-2.
   queue: —. census: —.
21. **M0-d-06** — medium; order: parallel.
   rows (9): M0-d-06:6 1, M0-d-06:12 2, M0-d-06:18 3, M0-d-06:23 4, M0-d-06:28 5, M0-d-06:32 6, M0-d-06:36 7, M0-d-06:40 8, M0-d-06:48 9.
   queue: —. census: —.
22. **M0-d-08** — medium; order: parallel (note a-16 11's guard may add to it).
   rows (11): M0-d-08:10 N-1, M0-d-08:11 N-2, M0-d-08:12 N-3, M0-d-08:13 N-4, M0-d-08:14 N-5, M0-d-08:15 N-6, M0-d-08:16 N-7, M0-d-08:17 N-8, M0-d-08:19 N-10, M0-d-08:20 N-11, M0-d-08:22 N-13.
   queue: —. census: —.
23. **M0-d-09** — medium; order: parallel.
   rows (7): M0-d-09:7 1, M0-d-09:15 2, M0-d-09:26 4, M0-d-09:32 5, M0-d-09:43 7, M0-d-09:47 8, M0-d-09:58 9.
   queue: —. census: —.
24. **M0-b-02** — medium; order: before M0-b-03's own round.
   rows (9): M0-b-02:7 1 N1, M0-b-02:14 3 N3, M0-b-02:19 4 N4, M0-b-02:26 5 N5, M0-b-02:32 6 N6, M0-b-02:35 7 N7, M0-b-02:51 N9, M0-b-02:52 N10, M0-b-02:53 N11.
   queue: L28 (spineHit's two floors, planner half; ladder half M0-b-03). census: —.
25. **M0-b-03** — large; order: after Q18 (same files) and b-02.
   rows (12): M0-b-03:15 N-6, M0-b-03:16 N-7, M0-b-03:19 N-10, M0-b-03:21 N-12, M0-b-03:23 N-14, M0-b-03:25 N-16, M0-b-03:26 N-17, M0-b-03:28 N-19, M0-b-03:30 N-21, M0-b-03:31 N-22, M0-b-03:34 N-25, M0-b-03:35 N-26.
   queue: Q39 (S8 batches through ctx.batch, with M0-x-04), L20 (needle kerb test), L25 (S4 pins K13/K16/K19–K23), L28 (ladder half). census: Q60 (c-06's third continuation classifies it) and the census's corner-check class (L25) merge here.
26. **M0-b-04** — small; order: after b-03 (bentcut numbers move).
   rows (6): M0-b-04:12 N-1, M0-b-04:13 N-2, M0-b-04:14 N-3, M0-b-04:15 N-4, M0-b-04:16 N-5, M0-b-04:19 N-8.
   queue: —. census: —.
27. **M0-b-05** — medium; order: parallel.
   rows (7): M0-b-05:9 2, M0-b-05:11 4, M0-b-05:12 5, M0-b-05:13 6, M0-b-05:14 7, M0-b-05:15 8, M0-b-05:16 9.
   queue: —. census: —.
28. **M0-c-01** — medium; order: after the census.
   rows (14): M0-c-01:5 1 N-1, M0-c-01:9 2 N-2, M0-c-01:12 3 N-3, M0-c-01:16 4 N-4, M0-c-01:19 5 N-5, M0-c-01:22 6 N-6, M0-c-01:25 7 N-7, M0-c-01:29 8 N-8, M0-c-01:49 13 N-13, M0-c-01:74 16 N-16, M0-c-01:162 N-c1c-1, M0-c-01:169 N-c1c-2, M0-c-01:175 N-c1c-3, M0-c-01:191 N-c1c-6.
   queue: —. census: Q52 classes C/F (gate off trace; empty trace insert) merge here or in c-02 as the census assigns.
29. **M0-c-02** — large; order: after a-05's round and the census.
   rows (24): M0-c-02:23 3 N-3, M0-c-02:27 4 N-4, M0-c-02:34 5 N-5, M0-c-02:37 6 N-6, M0-c-02:40 7 N-7, M0-c-02:49 8 N-8, M0-c-02:60 9 N-9, M0-c-02:72 10 N-10, M0-c-02:87 11 N-11, M0-c-02:109 13 N-13, M0-c-02:117 14 N-14, M0-c-02:132 15 N-15, M0-c-02:142 16 N-16, M0-c-02:148 17 N-17, M0-c-02:181 21 N-21, M0-c-02:197 22 N-22, M0-c-02:212 23 N-23, M0-c-02:219 24 N-24, M0-c-02:229 26 N-26, M0-c-02:252 28 N-28, M0-c-02:409 39 N-39, M0-c-02:419 40 N-40, M0-c-02:493 45 N-45, M0-c-04:138 19 N-19.
   queue: Q27 (dedupe stopsFromArena), L31 (Y07/Y12/Y13/Y15/Y17 pins). census: Q46 / KI-10 and Q52 B/D/E (MAKE-IT-SUCCEED for B–D, E is M1's) merge here.
30. **M0-c-03** — medium; order: after the census.
   rows (14): M0-c-03:6 1, M0-c-03:11 2, M0-c-03:22 4, M0-c-03:30 6, M0-c-03:36 8, M0-c-03:45 9, M0-c-03:50 10, M0-c-03:61 12, M0-c-03:79 14, M0-c-03:86 15, M0-c-03:91 16, M0-c-03:203 N-c1b-1, M0-c-03:206 N-c1b-2, M0-c-03:229 N-c1c-1.
   queue: —. census: Q52 class A (spines role consistency) merges here.
31. **M0-c-04** — large; order: with or right after c-02 (shared stops).
   rows (20): M0-c-04:6 1 N-1, M0-c-04:10 2 N-2, M0-c-04:15 3 N-3, M0-c-04:26 4 N-4, M0-c-04:31 5 N-5, M0-c-04:38 6 N-6, M0-c-04:42 7 N-7, M0-c-04:46 8 N-8, M0-c-04:53 9 N-9, M0-c-04:68 10 N-10, M0-c-04:74 11 N-11, M0-c-04:77 12 N-12, M0-c-04:82 13 N-13, M0-c-04:87 14 N-14, M0-c-04:109 16 N-16, M0-c-04:291 20 N-20, M0-c-04:324 23 N-23, M0-c-04:333 24 N-24, M0-c-04:349 26 N-26, M0-d-09:68 10.
   queue: L31 (earlierWaterGates guard removal). census: Q37 (spike corridor; a lawful plant must commit) merges here.
32. **M0-c-05** — large; order: after the census.
   rows (16): M0-c-05:9 2 N-2, M0-c-05:13 3 N-3, M0-c-05:16 4 N-4, M0-c-05:19 5 N-5, M0-c-05:22 6 N-6, M0-c-05:46 12 N-12, M0-c-05:50 13 N-13, M0-c-05:53 14 N-14, M0-c-05:57 15 N-15, M0-c-05:69 17 N-17, M0-c-05:86 21 N-21, M0-c-05:94 22 N-22, M0-c-05:118 24 N-24, M0-c-05:125 25 N-25, M0-c-05:249 N-c1-1, M0-c-05:250 N-c1-2.
   queue: L29 (growth/index.ts explicit exports). census: Q55 (S5c inner refusals) merges here.
33. **M0-c-06** — small; order: after a-09 s6 and Q18.
   rows (1): M0-c-05:62 16 N-16.
   queue: Q60 (third continuation; classifies the drift block). census: —.
34. **M0-e-01** — medium; order: parallel.
   rows (6): M0-e-01:103 N-c1-1, M0-e-01:104 N-c1-2, M0-e-01:105 N-c1-3, M0-e-01:106 N-c1-4, M0-e-01:117 N-c1-5, M0-e-01:120 N-c1-8.
   queue: L27 (a). census: —.
35. **M0-e-02** — medium; order: parallel.
   rows (8): M0-e-02:146 N-c1-1, M0-e-02:147 N-c1-2, M0-e-02:148 N-c1-3, M0-e-02:149 N-c1-4, M0-e-02:159 N-c1-5, M0-e-02:160 N-c1-6, M0-e-02:161 N-c1-7, M0-e-02:162 N-c1-8.
   queue: L27 (b). census: —.
36. **M0-e-03** — large; order: after a-05's round (L26) and the census.
   rows (17): M0-e-03:6 1, M0-e-03:14 2, M0-e-03:21 3, M0-e-03:26 4, M0-e-03:32 5, M0-e-03:35 6, M0-e-03:60 10, M0-e-03:68 11, M0-e-03:310 N-c1-1, M0-e-03:311 N-c1-2, M0-e-03:312 N-c1-3, M0-e-03:313 N-c1-4, M0-e-03:314 N-c1-5, M0-e-03:315 N-c1-6, M0-e-03:326 N-c1-7, M0-e-03:327 N-c1-8, M0-e-03:330 N-c1-11.
   queue: L26 (reader of a-05's structured refusal), L27 (c). census: Q45 (tributary mouth, MAKE-IT-SUCCEED expected) merges here.
37. **M0-e-04** — large; order: after the census.
   rows (16): M0-e-04:6 1, M0-e-04:12 2, M0-e-04:28 3, M0-e-04:32 4, M0-e-04:40 5, M0-e-04:47 6, M0-e-04:58 9, M0-e-04:97 12, M0-e-04:107 13, M0-e-04:116 14, M0-e-04:123 15, M0-e-04:134 16, M0-e-04:323 N-c1b-1, M0-e-04:328 N-c1b-2, M0-e-04:331 N-c1b-3, M0-e-04:358 N-c1c-1.
   queue: —. census: Q64 (S6 perimeter at 180 m) merges here if the census names the perimeter.
38. **M0-e-05** — medium; order: parallel.
   rows (9): M0-e-05:11 N-1, M0-e-05:12 N-2, M0-e-05:13 N-3, M0-e-05:14 N-4, M0-e-05:15 N-5, M0-e-05:16 N-6, M0-e-05:17 N-7, M0-e-05:18 N-8, M0-e-05:21 N-11.
   queue: —. census: —.
39. **M0-e-06** — medium; order: after the e-* stage rounds.
   rows (8): M0-e-06:9 1, M0-e-06:12 4, M0-e-06:13 5, M0-e-06:14 6, M0-e-06:17 9, M0-e-06:21 13, M0-e-06:23 15, M0-e-06:24 16.
   queue: Q36-class summary re-run if stage outputs move. census: —.
40. **M0-k-02** — small; order: parallel.
   rows (5): M0-a-15:34 8, M0-k-02:15 N-10, M0-k-02:16 N-11, M0-k-02:17 N-12, M0-k-04:10 N-2.
   queue: L18 (oracle test replays from PLAT_FUZZ_SEED; cap per size). census: —.
41. **M0-k-03** — small; order: parallel.
   queue: KI-6 (oracle hang guard), L18 if the oracle half is k-03's. census: —.
42. **M0-k-04** — large; order: parallel (note a-16 11 may add the writer guard).
   rows (18): M0-f-02a:13 N-5, M0-k-02:12 N-7, M0-k-04:9 N-1, M0-k-04:11 N-3, M0-k-04:12 N-4, M0-k-04:13 N-5, M0-k-04:15 N-7, M0-k-04:16 N-8, M0-k-04:17 N-9, M0-k-04:19 N-11, M0-k-04:20 N-12, M0-k-04:21 N-13, M0-k-04:33 N-15, M0-k-04:34 N-16, M0-k-04:35 N-17, M0-k-04:36 N-18, M0-k-04:37 N-19, M0-k-04:38 N-20.
   queue: —. census: —.
43. **M0-k-05** — small; order: parallel.
   rows (3): M0-k-05:12 N-h, M0-k-05:13 N-i, M0-k-05:14 N-j.
   queue: —. census: —.
44. **M0-k-06** — medium; order: parallel.
   rows (8): M0-k-06:11 K6-1, M0-k-06:12 K6-2, M0-k-06:13 K6-3, M0-k-06:15 K6-5, M0-k-06:16 K6-6, M0-k-06:17 K6-7, M0-k-06:19 K6-9, M0-k-06:20 K6-10.
   queue: —. census: —.
45. **M0-x-02** — large; order: after the stage rounds it checks.
   rows (17): M0-e-03:140 18, M0-x-02:6 1, M0-x-02:11 2, M0-x-02:17 3, M0-x-02:22 4, M0-x-02:31 5, M0-x-02:34 6, M0-x-02:40 7, M0-x-02:48 8, M0-x-02:61 9, M0-x-02:78 10, M0-x-02:100 12, M0-x-02:107 13, M0-x-02:142 15, M0-x-02:163 18, M0-x-02:172 19, M0-x-02:187 21.
   queue: —. census: —.
46. **M0-x-04** — medium; order: with b-03's round.
   rows (7): M0-c-03:97 17, M0-x-04:12 4, M0-x-04:13 5, M0-x-04:14 6, M0-x-04:15 7, M0-x-04:16 8, M0-x-04:19 11.
   queue: Q39 (with M0-b-03). census: —.
47. **M0-x-05** — medium; order: after the stage rounds (ladder tables move).
   rows (12): M0-b-03:12 N-3, M0-b-03:13 N-4, M0-b-03:14 N-5, M0-c-03:26 5, M0-x-05:5 1, M0-x-05:12 2, M0-x-05:16 3, M0-x-05:21 4, M0-x-05:25 5, M0-x-05:28 6, M0-x-05:30 7, M0-x-05:34 8.
   queue: —. census: —.
48. **M0-x-06** — medium; order: after the census rounds (re-pins move).
   rows (10): M0-x-06:12 3, M0-x-06:13 4, M0-x-06:14 5, M0-x-06:16 7, M0-x-06:18 9, M0-x-06:19 10, M0-x-06:20 11, M0-x-06:21 12, M0-x-06:148 c2-1, M0-x-06:149 c2-2.
   queue: —. census: Q52's edge re-run at 1 000 seeds after the census rounds.
49. **M0-f-02a** — small; order: parallel.
   rows (5): M0-f-02a:9 N-1, M0-f-02a:10 N-2, M0-f-02a:11 N-3, M0-f-02a:12 N-4, M0-f-02a:16 N-8.
   queue: —. census: —.
50. **M0-f-02b** — small; order: after Q18 and the session's 1 000-seed run.
   rows (1): M0-f-02a:14 N-6.
   queue: Q49 (re-run both receipts whole). census: —.
51. **M0-f-03a** — small; order: before M0-f-03b lands (N-6 ruling).
   rows (4): M0-f-03a:17 N-2, M0-f-03a:22 N-7, M0-f-03a:72 N-8, M0-f-03a:73 N-9.
   queue: —. census: —.
52. **M0-s-01** — medium; order: parallel; tools before the rounds that land through them is not needed.
   rows (7): M0-s-01:49 N-17, M0-s-01:50 N-18, M0-s-01:51 N-19, M0-s-01:52 N-20, M0-s-01:55 N-23, M0-s-01:65 N-25, M0-spec:28 N-17.
   queue: L14, L15 (tools pins and verdict changes), L24 (landed/flow_stage deleted list). census: —.
53. **M0-d-07** — medium; order: with M0-s-01.
   rows (5): M0-d-07:12 N3, M0-d-07:54 N11, M0-d-07:55 N12, M0-d-07:56 N13, M0-d-07:57 N14.
   queue: L14, L15. census: —.
54. **M0-s-02** — small; order: parallel.
   rows (3): M0-c-05:34 10 N-10, M0-s-02:13 N1, M0-s-02:14 N2.
   queue: L22 (tables next touch). census: —.
55. **session (spec/doc pass)** — medium; order: any time; Q50 beside Q18; KI-2 before M1 planning.
   rows (8): M0-b-03:22 N-13, M0-d-04:169 N-c1-5, M0-f-03a:16 N-1, M0-f-03a:19 N-4, M0-f-03a:20 N-5, M0-f-03a:21 N-6, M0-s-01:18 N-7, M0-x-06:22 13.
   queue: KI-2 (amendments round), Q51 (API.md Appendix B regenerate + empty AFTER_APPENDIX_B), Q50 (profile, beside Q18), L5, L6 (M0-work.json), L9 (one bugs-key vocabulary). census: —.
56. **timing items (M0-t-00 … M0-t-02)** — medium; order: LAST (J212), after the perf pass.
   queue: every timing CARRY-FORWARD of §4. census: —.

Awaiting the census (not rounds of this inventory): the ROUTED-TO-CENSUS rows of §1/§2 (78 notes items + KI-1, KI-7, KI-10); each census
verdict lands in the owning item's round above (a-05, a-06, a-08, a-09, a-11, c-01 … c-05, e-03, e-04) or, for REFUSE, as a recorded refusal.

## §4 The CARRY-FORWARD ledger by phase

Deliberately deferred, with the phase each waits for — not bugs to re-find. Notes rows by `<file>:<line> <id>`; KI and queue rows by id.

### The perf pass (Q18 first per N-56 §7, then Q50's per-stage profile)

- KI-12 / Q18 and KI-13 / Q19 are DUPLICATEs homed in the queue; Q50 (every stage 2–4 orders over §12.4) is the pass's profile
- M0-a-09:68 15 (M0-a-09) — bandCore read-back scans every face slot (O(arena)) — perf pass / timing bar §3.7 (ii) ≤ 3 ms per district — waits for: M0-t-00/M0-t-01; perf pass
- M0-a-10:15 N-10 (M0-a-10) — kept-map complete re-check O(faces) per "no face" claim (O(F²) per walk) — measure in the timing phase / perf pass; an arena face-record change counter would make it O(1) — waits for: M0-t-01; perf pass
- M0-a-13:32 7 (M0-a-13) — simplify O(n³) worst case — perf pass (heap + packed index) if long chains appear — waits for: perf pass
- M0-e-03:51 9 (M0-e-03) — S1's L0 batch on a full CITY frame takes seconds vs §12.4's 25 ms — perf pass (Q50's profile) then the timing waves — waits for: Q50; M0-t-01
- M0-e-06:11 3 (M0-e-06) — timing-phase batch exceeds 60 s per derivation; gate p50s >100× over — partition batches; the perf round (Q50) then the timing items — waits for: M0-t-00/M0-t-01; Q50

### The timing items (M0-t-00 … M0-t-02; J212: last)

- M0-a-05:264 N-s8c-3 (M0-a-05) — coarserRegion work +36 %: read against §12.4 ≤ 8 µs per insertion — timing phase (J212) — waits for: M0-t-01/M0-t-02
- M0-d-04:29 8 N-8 (M0-d-04) — timeDigest omits the plats layer's level-digest recompute — the timing record (M0-t-00) states which workload it timed — waits for: M0-t-00 / M0-t-01
- M0-e-06:10 2 (M0-e-06) — stage stamps omit the runner's stage-end rebuild (~1/5 of S4's row) — timing items decide whether §12.4 rows include it (C-0082's window) — waits for: M0-t-01 / M0-x-01
- M0-k-04:18 N-10 (M0-k-04) — prefix replay at the PR size declined (C-0227 (13)) — revisit once the tier is timed — waits for: M0-t-01

### M1 (first towns, M1 stages, records with Identity, parity presets, relief, coast)

- KI-3 (consumer contract for a refused mandatory chain; M1's spec)
- KI-4 (per-town refusal budget; M1's first towns)
- KI-11 (S6 district count on small fixtures; M1's towns)
- M0-a-09:45 9 (M0-a-09) — BandResult strip/wedge classing blurs when half-width < attractCm — S9 (M1) reads these lists; M1 must know — waits for: M1 S9 Corridor/Junction
- M0-a-11:13 N-3 (M0-a-11) — a spur crossing its ring or a hole is dropped and the face accepted (no arrangement face can hold one) — decide refuse notSimple vs record in C-0276 when an outside caller (M1 footprints) can pass su… — waits for: M1 footprints; C-0276
- M0-a-14:31 7 (M0-a-14) — "sideEffects": false lets a bundle drop invariants/debug.ts so the arena's debug switch stays on — M1's app bundle must keep the switch (e.g. read the flag in arena/debug.ts) — waits for: M1 app bundle
- M0-a-14:71 14 (M0-a-14) — stored VertexRef finding >1 vertex untested for knot/non-indexed roles (C10) — no entity stores one at M0 — waits for: M1 (first stored VertexRef)
- M0-b-04:18 N-7 (M0-b-04) — straightFirst branch never exercised (MFCG preset) — run the signature under the MFCG cells when the parity presets land — waits for: M1 parity presets / M0-b-05b
- M0-c-01:36 10 N-10 (M0-c-01) — plaza area bands, compactness floor and pick-score weights held in plaza.ts (C-0201 (3)) — M1's reservation rows and rule table take them over — waits for: M1 reservation rows
- M0-c-05:31 9 N-9 (M0-c-05) — §4.4 slope ≤ grade-limit rule neither built nor declared (unobservable on M0's flat fixture): declare it now (§4b / choices), build with M1's relief runs — waits for: M1 relief; N-9
- M0-c-05:37 11 N-11 (M0-c-05) — stand-in demand reduces S5d's per-band comparison (declared C-0254 (10)) — re-check when M1's S2 supplies the demand — waits for: M1 S2
- M0-d-05b:136 N-cc1-3 (M0-d-05b) — "a fresh <kind> names <id>, both a fresh provisional id and a survivor's address" refusal (C-0188 (1)) — no stage calls match at M0; decide MAKE-IT-SUCCEED (side-tagged reference / dup first) or REFU… — waits for: M1 (first match caller); N-58
- M0-d-09:20 3 (M0-d-09) — standing check lineage/stage compare equivalent at M0 (E1) — revisit when standing records carry their own Identity — waits for: M1 (records carry Identity)
- M0-d-09:37 6 (M0-d-09) — "0 duplicate ids" counted through a bench copy of §6.3's ~k rule (records carry no lineage keys at M0) — re-run through mint once M1 records carry Identity — waits for: M1 (records carry Identity); C-0274
- M0-e-04:51 7 (M0-e-04) — count law miss at seed 121 (+2) and gate bar 97/100 on seeds 101-200 — whole-town behaviour (KI-11's kind) — waits for: KI-11; M1 towns
- M0-e-06:16 8 (M0-e-06) — 3 000 m fixture never exercises the water clauses — M1's gate re-run (further configurations deferred there) — waits for: M1 gate re-run
- M0-e-06:18 10 (M0-e-06) — hydroReceipt treats cell centres outside the frame as land — coast/margin water arrives at M1 — waits for: M1 (coast)
- M0-k-04:14 N-6 (M0-k-04) — S11 workload times a refusal on ~1/3 of plots and counts setup failures as call-list faults — re-measured on B-CITY-lite's S11 — waits for: M1 (B-CITY-lite S11)
- M0-s-02:15 N3 (M0-s-02) — preset values not checked against the cell's admissible words (only defaults read) — M1's preset resolution reads presets through the same reader — waits for: M1 parity presets (§4b, §7.6)
- M0-x-06:15 6 (M0-x-06) — trace not inset by the outer strip at M0 (inset >= 0 accepted vs EP-20 > 0): waits for the M1 strip/trace law — waits for: note 6; S3 (6); C-0273 (9)

### Later milestones and designs not yet built (M-1 / AFTER-M-1, M3a, V03, §11.1 export, PART III products, non-rectangular frames, publication)

- KI-5 (non-LIFO removal; M2a's edit log)
- KI-8, KI-9 (town vocabulary in the kernel; testkit subpath — the kernel extraction, owner-gated)
- L2 (per-batch arena image memory cost: measure at M1 — M0-a-06)
- L13 (two table-data observations for M1's schema — spec lane)
- M0-a-07:11 N-3 (M0-a-07) — §3.6 (6) export omits antennae: the export (§11.1) is not built; name the clause's milestone in a choices row and test at the export — waits for: C-0192; §11.1 notBuilt
- M0-a-09:64 14 (M0-a-09) — kept content refuses E_KEPT wider than §3.7 (any finer face inside F) — nesting staged to M3a with a choices row; one-click order makes no such input at M0 — waits for: M3a (choices row); note 14
- M0-a-14:27 6 (M0-a-14) — kept-content clear-region clause not built (clearRegion is notBuilt('M3a')); name the deferral in the row's deferredTo / C-0200 — waits for: M3a (§4b)
- M0-b-03:10 N-1 (M0-b-03) — all S8 blocks deep under today's tables — depth rows re-fitted at M-1 (§4.6 step 1, E12); M0-c-06 reads deep share as uncalibrated — waits for: M-1 / M0-c-07a
- M0-b-03:11 N-2 (M0-b-03) — ~half of back_lane/through_alley spines refused by the block floor (child ≈ ½t < d_lo), drifting shares to court; re-read the child floor with a choices row and re-judge with N-1's re-fit — waits for: M-1 re-fit; M1 court-share row
- M0-b-05:10 3 (M0-b-05) — phase b gates every ⟨M-1⟩ subset key ours emits; if M-1 delivers whole-sample rows only, M0-b-05b cannot pass — settle (ask M-1 for subset rows or narrow to §13.5's keys) before M0-b-05b runs — waits for: AFTER-M-1 M0-b-05b; C-0256 (4)
- M0-c-01:80 17 N-17 (M0-c-01) — frame test reads the ring, M0-x-06 fixture reads the bbox — same while every frame is an axis-aligned rectangle; reconcile when frames of other shapes arrive — waits for: non-rectangular frames (post-M0)
- M0-d-04:19 4 N-4 (M0-d-04) — records leaf kind (M23) equivalent at M0 (derivation and naming never share a stream) — pin when M3a adds the order kind — waits for: M3a order kind
- M0-d-05a:17 N-3 (M0-d-05a) — parent check refuses §2.6's room id form (room:<building>/<level>/<i>) — no M0 entity has a room parent; decide when V03's stored plans land — waits for: V03 stored plans (rooms)
- M0-e-04:56 8 (M0-e-04) — settlementPerimeter frame test uses the frame bbox — every M0 frame is a rectangle (§3.2 (9)); revisit with non-rectangular frames — waits for: non-rectangular frames (post-M0)
- M0-s-01:17 N-6 (M0-s-01) — a packed @plat/kernel names registry versions (unpatched upstream), plat-source export and test declarations — before any publication (owner-gated; the kernel-extraction step) — waits for: publication / KI-8 kernel extraction
- M0-spec:21 N-10 (session) — fix rounds after M0-x-01 (e.g. a deny-list reuse fix) listed and re-tested in M0-x-03's addendum (AFTER-M-1) — waits for: M0-x-03
- M0-spec:40 N-30 (session) — re-fitted plot-depth, dense-core floor and deep shares applied to the tables by M0-b-05a (AFTER-M-1); Block.depthClass doc carries no stale factor — waits for: M0-b-05a; records/districts.ts:79
- M0-x-04:18 10 (M0-x-04) — S3 throws (no S5 rank) in a stage set without S5 — only a product reusing S3 without S5 (PART III) meets it — waits for: M1 products

## §5 Open questions for the session

- **Q1 The inventory's length.** The brief asks for one line per row and every row, and also ~600 lines; the tree holds 1 494 table rows + 428 numbered/bold notes (the brief's ~494 predates the later rounds' sections). I kept one line per row (~2 400 lines). Recommendation: Accept the length; for the next inventory, count a row as a table row OR a numbered note, and let a uniform block (a mutant table all killed, a per-seed census table) collapse to one range line.
- **Q2 Whether numbered and bold notes are rows.** The brief's definition names table rows only; several files (a-09, c-02, d-06, d-09, x-05, f-03a …) carry their findings only as numbered notes, so excluding them would drop real FIX-NOW items. Recommendation: Rule them in (as done here).
- **Q3 KI-2's amendments round.** The ARCHITECTURE amendments for N-38/40/43/44/46 (§3.6 Chain classes, §3.7), §13.1 and C-0177 (14), §16's M4 row (N-45) are still unlanded; several notes rows (spec N-38 …) duplicate into it. Recommendation: Schedule one spec-lane amendments round now, before M1 planning; it needs no code and no fix round waits on it.
- **Q4 M0-a-05 N-8: a route that retraces an edge (A→P→Q→P→R→B).** §3.10 holds, but whether a chain may commit a there-and-back is unruled (C-0205 (3)). Recommendation: Rule it unlawful for chains (refuse or simplify the retrace in the router), then pin the ruled form in a-05's round.
- **Q5 M0-a-05 N-23: the coincident fold-back vertex reading (C-0302 (3)).** Two readings of a fold-back at a coincident vertex coexist. Recommendation: Rule the one the census's coincident-plant verdict (x-06 c2-4) needs; pin it in the same a-05 round.
- **Q6 M0-x-06 c2-4: is a coincident doubled trace a lawful plant?** lawfulPlant makes it lawful only when the kernel took the doubled chain; the census count moves 35 ↔ 40 with the reading. Recommendation: The census decides (routed); recommend lawful-iff-the-kernel-commits stays, so the 5 refusals are REFUSE-class and not MAKE-IT-SUCCEED.
- **Q7 M0-a-16 note 11: the "no open frame of this kernel" guard (N-55 (5)(1)) vs C-0290's closed-overlay guard.** The ruled guard was never built; building it touches M0-k-04 primitives writer() and M0-d-08 issue.ts. Recommendation: Build it (N-45 (a): fail loudly) in the a-16 round with the two small riders; or strike the clause from N-55 (5) by a choices row.
- **Q8 M0-b-03 N-25: one seed per kerb component.** A split child's kerb with two components on one side leaves a seedless part; the record format is owner-gated (Q60 / N-60 (b)). Recommendation: Ask the owner for the format change (a seed per component) and take it in b-03's round; until then c-06 classifies under N-60 (b).
- **Q9 M0-c-02 N-26: strip faces over an arterial's corridor (42/1000 seeds).** Defect of the strip or of the route is unruled. Recommendation: Rule it the strip's (membership by area or a setback cut along the whole way); fix in c-02's round.
- **Q10 M0-f-03a N-6: skeleton.events law vs M0-f-03b's measured 1.73/vertex.** The any-version law (perUnit ≥ 8, floor ≥ 64) would refuse the measured coefficient. Recommendation: Option (a) max(measured, law) in f-03b's brief — simplest, no version gate; rule before f-03b lands.
- **Q11 M0-f-03a N-1: harness-injected context (memory index, git status) has no CLEAN-ROOM §1 sentence.** Seats disclose it row by row. Recommendation: Add one §1 sentence by session record; seats then cite it.
- **Q12 M0-a-01 N-c2-3 and M0-a-03 N-c1-1.** Design-clause tags in comments; index stamps taken without a generation. Recommendation: Comments: tag at next touch, no round. Stamps: take with Q33/Q38's generation reading in a-03's round.
- **Q13 The C-0305 → C-0308 citation sweep (d-04 N-c1-5) and the spec-lane edits (f-03a N-4/N-5, L5, L6, x-06 13 EP-26 milestone).** Text-only corrections across items' owns. Recommendation: One session documentation pass with Q51 (API.md Appendix B) and s-01 N-7's marker check.
- **Q14 L32 status.** The queue row reads OPEN, but the a-01 consolidation round (C-0337) built both ratchets: the barrel-set test and the leaf test turn mutants N-c3-1 / N-c3-2 (and AS1–AS6, LF1–LF3) red (M0-a-01-notes.md:228-252). Recommendation: Mark L32 DONE (C-0337) in the queue; nothing of it stays in a-01's round.
- **Q15 Ordering against the census.** Eleven items' rounds wait for census verdicts (§3). Recommendation: Launch Q18 and the census-free kernel leaves now; launch census-dependent rounds as each class's verdict lands, not after the whole census.
