# Step 2 — THE RED LIST

Commands: `scripts/suite.sh <plat> <out> results/step2/chunks.tsv 20261112` (and its reverse twin `scripts/suite-rev.sh`):
the whole suite split into 109 chunks — one per directory of test files, the 421 files whose static import graph reaches
packages/kernel/src/arr/kerb.ts first (chunks 001 – 075, `REL`, by esbuild's metafile: results/related.tsv), then the 170
that cannot reach it (076 – 109, `NOT`) — each chunk `PLAT_FUZZ_SEED=20261112 corepack pnpm exec vitest run --maxWorkers=1
--reporter=default --reporter=json --outputFile=<out>/<n>.json <files>` from the mirror's plat/ (PR size: PLAT_FUZZ_RUNS
unset). Red list: `python3 scripts/redlist.py <plat> <out> <json>` (each red file, its owner by M0-work.json's owns —
longest prefix —, its red tests and each one's first failing assertion: file:line and the message's first 200 characters).
Logs: results/step2/<P|L|B>/<n>.{log,json,rc}.

## A. Under P (stopped by the managing session after the P′ ruling) — results/step2/redlist-P.json, P-table.md
RAN: chunks 001 – 010 (the bands folder, kernel/tx, testkit arr-bands, bench fusion, layout infill fabric, testkit
infill-fabric, ladders, bentcut, fusion-ng, layout districts) and 069 – 109 (every NOT chunk, and REL 069 – 075: testkit
kernel/io, growth-s5cd, layout-*, parity, scaffold, scanner). NOT RUN: 011 (layout/enceinte: killed after 2 h 12 min inside
its full-strength seed tests) – 068.
36 red files, 128 red tests, by owner (files / tests): M0-a-09 16 / 91, M0-f-01 5 / 13, M0-b-03 5 / 7, M0-a-06 3 / 4,
M0-c-06 2 / 4, M0-x-05 2 / 3, M0-d-07 1 / 4, M0-b-04 1 / 1, M0-c-07 1 / 1.
Classes (results/step2/classes-draft.tsv gives every test's reading; B from the known head reds — Q152's six; M0-f-01's
reference-machine tests — and from the BASE re-run of section B where the file was re-run):
| owner | C | W | L | X | B | tests |
|---|---|---|---|---|---|---|
| M0-a-09 | 31 | 27 | 24 | 3 | 6 (Q152's six) | 91 |
| M0-a-06 | 4 | | | | | 4 |
| M0-c-06 | | 2 | 2 | | | 4 |
| M0-b-03 | | 2 | 5 | | | 7 |
| M0-x-05 | | | 3 | | | 3 |
| M0-b-04 | | | 1 | | | 1 |
| M0-c-07 | | 1 | | | | 1 |
| M0-d-07 | | | 4 (W1's kernel-boundary rows: kerb.ts string `kerb` 9 > 8, ident 23 > 20 — `./kerbExact.js`, `KerbRead` in the new signatures) | | | 4 |
| M0-f-01 | | | | | 13 (calibrate, host, timing ×3: the reference machine) | 13 |
| **total** | **35** | **32** | **39** | **3** | **19** | **128** |

## B. Under P′ without R (stopped by the managing session after step 9) — results/step2/redlist-L.json
RAN: chunks 001 – 007 and 071 – 109 (46 chunks). NOT RUN: 008 – 070. Red: 30 files, 117 tests; by owner (files / tests): M0-a-06 3 / 5, M0-a-09 18 / 92, M0-b-03 2 / 2, M0-d-07 1 / 4, M0-f-01 5 / 13, M0-x-05 1 / 1.
Against P on the same chunks: bench/test/fusion (drift, hausdorff: the S8 ≡ S9 law) GREEN; layout infill fabric sharedVertex GREEN (seeds, strips still red); testkit infill-fabric (abandon, relocate) GREEN; ladders coverage GREEN (rungs-s8 1 of 2 left). The bands folder stays about as red as under P (18 files / 92 tests: most of its pins read `readKerb`, which is X under P′ too) and adds bfuzz.test.ts (the 8 lay refusals over its own cap). M0-a-06's three tx files: red ('lay: the face has no owner' in savepoint :471 and cost :171 — S-3; oracle :402 'marks compared for dry-run frames' 0 — the lay's frames are op frames, not dry-run ones).


## C. Under P′ + R+ (M5; stopped by the managing session after step 10) — results/step2/redlist-R.json
RAN: 51 chunks (001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 069, 070 … 109; i.e. 001 – 010 and 069 – 109; 068 killed unfinished). Red: 28 files, 113 tests; by owner (files / tests): M0-a-06 2 / 3, M0-a-09 17 / 89, M0-b-03 2 / 3, M0-d-07 1 / 4, M0-f-01 5 / 13, M0-x-05 1 / 1.
Against P′ (no R) on the shared chunks: bfuzz.test.ts GREEN (its kerb own cap holds: 1 lay refusal in the main family); kernel/tx/cost.test.ts GREEN (the placeholder entity: S-3 answered); savepoint.test.ts 1 red (:425 'dry-run' frames from a kerb read: 0 — the lay opens op frames) and oracle.test.ts 2 (:402, the same); bench fusion GREEN; register.test.ts and hardening-s17 move (R+ changes kerbs the bands pins hold).

| packages/kernel/test/tx/oracle.test.ts | M0-a-06 | 2 | oracle.test.ts:402 — AssertionError: marks compared for dry-run frames: expected 0 to be greater than 0 |
| packages/kernel/test/tx/savepoint.test.ts | M0-a-06 | 1 | savepoint.test.ts:425 — AssertionError: expected 0 to be greater than or equal to 2 |
| packages/kernel/test/arr/bands/closing.test.ts | M0-a-09 | 5 | closing.test.ts:87 — AssertionError: expected 'none' to be 'taken' // Object.is equality |
| packages/kernel/test/arr/bands/corridor.test.ts | M0-a-09 | 3 | corridor.test.ts:207 — AssertionError: expected [ Array(1) ] to deeply equal [ …(2) ] |
| packages/kernel/test/arr/bands/deadend.test.ts | M0-a-09 | 11 | deadend.test.ts:170 — AssertionError: expected 'none' to be 'taken' // Object.is equality |
| packages/kernel/test/arr/bands/derived.test.ts | M0-a-09 | 4 | derived.test.ts:1993 — Error: tx 8/L1/callback/fn: oblique.left: expected true to be false // Object.is equality |
| packages/kernel/test/arr/bands/dryrun.test.ts | M0-a-09 | 7 | dryrun.test.ts:92 — AssertionError: dead end 871 read 0: savepoints: expected 2 to be less than or equal to 1 |
| packages/kernel/test/arr/bands/hardening-s15.test.ts | M0-a-09 | 8 | hardening-s15.test.ts:66 — AssertionError: expected [ '0,0 4000,0 4000,4000 0,4000', …(2) ] to deeply equal [ '0,0 4000,0 4000,4000 0,400 |
| packages/kernel/test/arr/bands/hardening-s16.test.ts | M0-a-09 | 3 | hardening-s16.test.ts:111 — AssertionError: face 0 kerb vertex 3746,3992: expected 3.216696093503467 to be less than or equal to 1 |
| packages/kernel/test/arr/bands/hardening-s17.test.ts | M0-a-09 | 6 | hardening-s17.test.ts:76 — AssertionError: face 1: expected [ '0,0 4000,0 4000,2000 0,2000' ] to deeply equal [ Array(1) ] |
| packages/kernel/test/arr/bands/hardening.test.ts | M0-a-09 | 8 | hardening.test.ts:51 — AssertionError: expected [ '10,2244 413,1809 15,1805' ] to deeply equal [ '10,2244 412,1824 15,1820' ] |
| packages/kernel/test/arr/bands/observer.test.ts | M0-a-09 | 4 | observer.test.ts:287 — TypeError: Cannot read properties of undefined (reading 'by') |
| packages/kernel/test/arr/bands/register.test.ts | M0-a-09 | 1 | register.test.ts:146 — AssertionError: expected 1 to be +0 // Object.is equality |
| packages/kernel/test/arr/bands/restage.test.ts | M0-a-09 | 3 | restage.test.ts:104 — AssertionError: expected [ Array(1) ] to deeply equal [ Array(1) ] |
| packages/kernel/test/arr/bands/shadow-prod.test.ts | M0-a-09 | 1 | shadow-prod.test.ts:33 — AssertionError: expected +0 to be 1 // Object.is equality |
| packages/kernel/test/arr/bands/shadow.test.ts | M0-a-09 | 8 | shadow.test.ts:436 — AssertionError: half: expected [] to deeply equal [ 'start', 'done', 'start', …(13) ] |
| packages/kernel/test/arr/bands/vertexcontact.test.ts | M0-a-09 | 7 | vertexcontact.test.ts:365 — AssertionError: expected [ [ [ -2966, -76994 ], …(4) ] ] to deeply equal [ [ [ -2966, -76994 ], …(5) ] ] |
| packages/kernel/test/arr/bands/widthstep.test.ts | M0-a-09 | 5 | widthstep.test.ts:268 — AssertionError: expected [ { x: 9000, y: 1000 }, …(1) ] to deeply equal [ { x: 9000, y: 1000 }, …(1) ] |
| packages/testkit/test/kernel/arr-bands/agreement-corridor.test.ts | M0-a-09 | 5 | agreement-corridor.test.ts:25 — AssertionError: expected [ …(20) ] to deeply equal [] |
| packages/layout/test/infill/fabric/seeds.test.ts | M0-b-03 | 1 | seeds.test.ts:161 — AssertionError: expected 267 to be less than or equal to 100 |
| packages/layout/test/infill/fabric/sharedVertex.test.ts | M0-b-03 | 2 | sharedVertex.test.ts:200 — AssertionError: expected 0 to be greater than 0 |
| tools/lint/kernel-boundary.test.mjs | M0-d-07 | 4 | kernel-boundary.test.mjs:30 — AssertionError: expected [ …(5) ] to deeply equal [] |
| bench/test/calibrate/calibrate.test.ts | M0-f-01 | 3 | calibrate.test.ts:59 — Error: Command failed: /usr/bin/arch -x86_64 /opt/node24/bin/node --no-warnings --input-type=module -e const m |
| bench/test/host/host.test.ts | M0-f-01 | 2 | host.test.ts:28 — AssertionError: expected 'Intel(R) Xeon(R) Processor @ 2.10GHz' to be 'Apple M1' // Object.is equality |
| bench/test/timing/contention.test.ts | M0-f-01 | 3 | contention.test.ts:412 — AssertionError: expected 98 to be greater than 100 |
| bench/test/timing/harness.test.ts | M0-f-01 | 3 | harness.test.ts:273 — AssertionError: expected [ …(4) ] to include 'power: battery' |
| bench/test/timing/sampler.test.ts | M0-f-01 | 2 | sampler.test.ts:41 — AssertionError: expected 'process_api' to be '/sbin/launchd' // Object.is equality |
| packages/testkit/test/ladders/rungs-s8.test.ts | M0-x-05 | 1 | rungs-s8.test.ts:153 — AssertionError: expected { 'S8 F-CUT antenna': 1 } to deeply equal { 'S8 F-CUT a@attempt>=1': 1, …(1) } |

## D. THE LADDER — the whole suite at full strength on treeLD/ (seed 20261112), and the base re-run of every red file

WRITTEN BY THE MANAGING SESSION (20:52Z, 2026-11-12) from `step2/redlist-LD.json` (109 chunks; 32 red files, 121 red tests),
`step2/redlist-B.json` (the same 32 files re-run on the base mirror: 12 red files, 28 red tests) and each chunk's JSON:
the measurement seat was cut off by a restart of the container at its classification and could not be resumed. Every
class below is by READING the test's title and its first failing assertion; none is a re-run. `step2/classes-LD.json`
holds the 121 rows (owner, file, place, class, title, message).

THE CLASSES:
* **B (28) — red on the base mirror too**, with the same assertion: not the ladder's. DECLARED: Q152's six (closing ×2,
  dryrun ×1, hardening-s15 ×1, restage ×2), the reference-machine tests of J176 (calibrate 3, host 2, timing 8) and the
  site summary's canary (1). NOT DECLARED, FOUND BY THIS RUN: the seven 'F-WALL's later rungs (M1)' cases of
  `packages/layout/test/enceinte/s5seeds.test.ts` (each `expected null to deeply equal { code: 'E_SELF_INTERSECT' … }`:
  the run no longer refuses) — cases that register only at FULL strength, so no gate at 1 000 runs has seen them; and
  `packages/testkit/test/kernel/arr-bands/agreement-corridor.test.ts` :25 (`expected [ …(4) ] to deeply equal []`). The
  session re-runs both on the design head itself.
* **X (18) — the prototype's or the box's, not the ladder's:** observer.test.ts ×4, shadow.test.ts ×8 and
  shadow-prod.test.ts ×1 (S20's shadow hook, which the prototype's kerb.ts no longer carries: round A's line 1 folds
  and re-points them); tools/lint/kernel-boundary.test.mjs ×4 (a mirror carries no allow-row seam); and
  bench/test/timing-phase/script.test.ts ×1 (the real detector met another busy process on the shared box).
* **I (17) — pins of the construction's INTERNALS** (the faithful read's 'taken' / 'tried', the one savepoint of a read,
  the dry-run frames, the closings' counts, the construction relation's classes): closing ×3, deadend ×4,
  hardening-s17 ×3, dryrun ×2, derived ×4, and M0-a-06's kernel/test/tx/savepoint.test.ts :425. They are re-pointed to
  the second rung (the construction's read) or served through the debug switch; savepoint.test.ts by the session's
  seam on support.ts.
* **R (38) — the READ's shift:** a kerb ring, vertex or bound that moved because the served read is the lay —
  corridor ×1, deadend ×3, dryrun ×3, hardening-s15 ×8, hardening-s16 ×3, hardening ×9, vertexcontact ×6,
  widthstep ×5. Each is re-judged by the two-sided check against the served value. THREE TO LOOK AT CLOSELY, because
  the pinned BOUND, not a literal, fails: hardening-s16 :110 (a committed block vertex 10.6 cm deep in a way's band
  where the pin allows 1 cm; :109 its area bound) and hardening-s15 :179 and :247 (1.29 cm and 3.15 cm where the pin
  allows 1 cm), hardening.test.ts :170 (27.02 cm against 26).
* **F (7) — a pinned REFUSAL that no longer happens** (the read or the commit succeeds on the first rung where the
  construction refused; the census falls): deadend ×3, hardening :253, vertexcontact :633, restage :165, and
  register.test.ts :146 (two cases of the refusal register no longer refuse).
* **C (13) — the COMMIT's shift, or a count downstream of it:** corridor.test.ts :207 and :322; testkit's
  agreement-corridor :131; M0-a-05's q104.test.ts ×6; M0-b-03's fabric/seeds.test.ts :161 and fabric/strips.test.ts
  :119; M0-x-05's ladders/rungs-s8.test.ts :153; M0-d-09's determinism/runner.test.ts :57. TO EXAMINE BEFORE ROUND B
  BINDS: (1) corridor.test.ts :322 — the kernel's own property 'S8's kerb ≡ S9's block over every face, at least the
  share measured before round S9' FAILS after 32 tests (its shrunk counterexample two chords, one of half-width 1 cm
  and one width-less with a profile): whether its pinned share is the construction's or a floor the ladder must meet;
  (2) fabric/strips.test.ts :119 — 'every lane end on the setback line stays there, square to it (85 – 95°)' reads
  77.6°: a property of S8's OUTPUT, not a literal; (3) fabric/seeds.test.ts :161 (`expected 267 to be less than or
  equal to 100`); (4) q104.test.ts — five of M0-a-05's pins of Q104's residual ('no seat on F's boundary within the
  bound', notBuilt #4) read false and the sixth reads a Hausdorff of 11.18 cm where more than 26 was pinned: the
  ladder appears to CHANGE the residual class, for M0-a-05's owner to judge; (5) determinism/runner.test.ts :57 — the
  report's pinned counts moved; `runs` 2 and `differing` 0 still match, so it is NOT a loss of determinism.

AGAINST P: 36 files were red under P (its partial run); TEN of them are green under the ladder —
bench/test/bentcut/fcut, bench/test/fusion-ng/phase-a, bench/test/fusion/drift and hausdorff, kernel/test/tx/cost and
oracle, layout/test/infill/fabric/sharedVertex, testkit/test/ladders/coverage, testkit/test/layout/infill-fabric/abandon
and relocate.

THE TOTALS: 121 red tests = B 28 + X 18 + I 17 + R 38 + F 7 + C 13. The ladder's own shift (R + F + C) is 58 tests in
17 files; 16 of the 58 are OUTSIDE M0-a-09's files (M0-a-05 6, M0-b-03 2, M0-x-05 1, M0-d-09 1 — and M0-a-09's testkit
folder 1 — with M0-a-06's one internal pin beside them): they are round B's cross-item list.

| owner | file | B | X | I | R | F | C | first assertions (place: message) |
|---|---|---|---|---|---|---|---|---|
| M0-a-09 | packages/kernel/test/arr/bands/closing.test.ts | 2 |  | 3 |  |  |  | 87: AssertionError: expected 'none' to be 'taken' // Object.is equality; 87: AssertionError: expected 'none' to be 'taken' // Object.is equality; 87: AssertionError: expected 'none' to be 'taken' // Object.is equality |
| M0-a-09 | packages/kernel/test/arr/bands/corridor.test.ts |  |  |  | 1 |  | 2 | 207: AssertionError: expected [ Array(1) ] to deeply equal [ …(2) ]; 322: Error: Property failed after 32 tests; 433: AssertionError: expected [] to deeply equal [ 1 ] |
| M0-a-09 | packages/kernel/test/arr/bands/deadend.test.ts |  |  | 4 | 3 | 3 |  | 170: AssertionError: expected 'none' to be 'taken' // Object.is equality; 187: AssertionError: expected [ [ [ 72631, -32135 ], …(23) ] ] to deeply eq; 284: AssertionError: expected [] to deeply equal [ { x: 75127, y: -31705 }  |
| M0-a-09 | packages/kernel/test/arr/bands/derived.test.ts |  |  | 4 |  |  |  | 1993: Error: tx 8/L1/callback/fn: oblique.left: expected true to be false //; 2060: AssertionError: N: expected [ 'EQUAL', 'NEAR' ] to include 'BEYOND'; 940: AssertionError: expected [ Array(1) ] to deeply equal [] |
| M0-a-09 | packages/kernel/test/arr/bands/dryrun.test.ts | 1 |  | 2 | 3 |  |  | 92: AssertionError: dead end 871 read 0: savepoints: expected 2 to be less; 92: AssertionError: [{"a":863,"b":12958,"hw":300,"knots":[302,62],"ends":"; 213: AssertionError: expected [] to deeply equal [ '2534,3430 3045,4000 294 |
| M0-a-09 | packages/kernel/test/arr/bands/hardening-s15.test.ts | 1 |  |  | 8 |  |  | 66: AssertionError: expected [ '0,0 4000,0 4000,4000 0,4000', …(2) ] to de; 100: AssertionError: expected [ Array(1) ] to deeply equal [ '0,0 2000,0 20; 165: AssertionError: expected [ …(2) ] to deeply equal [ …(2) ] |
| M0-a-09 | packages/kernel/test/arr/bands/hardening-s16.test.ts |  |  |  | 3 |  |  | 110: AssertionError: face 0 block vertex 1079,742: expected 10.617058384513; 109: AssertionError: face 0: expected 187028 to be less than or equal to 58; 110: AssertionError: face 0 block vertex 1079,742: expected 10.621222947265 |
| M0-a-09 | packages/kernel/test/arr/bands/hardening-s17.test.ts |  |  | 3 |  |  |  | 277: AssertionError: expected 'none' to be 'tried' // Object.is equality; 277: AssertionError: expected 'none' to be 'tried' // Object.is equality; 295: AssertionError: expected 'none' to be 'taken' // Object.is equality |
| M0-a-09 | packages/kernel/test/arr/bands/hardening.test.ts |  |  |  | 9 | 1 |  | 51: AssertionError: expected [ '10,2244 413,1809 15,1805' ] to deeply equa; 73: AssertionError: expected [ Array(2) ] to deeply equal [ …(2) ]; 121: AssertionError: expected [ '0,0 97,77 33,75 0,81', …(4) ] to include ' |
| M0-a-09 | packages/kernel/test/arr/bands/observer.test.ts |  | 4 |  |  |  |  | 287: TypeError: Cannot read properties of undefined (reading 'by'); 446: AssertionError: expected undefined not to be undefined // Object.is eq; 474: AssertionError: expected 0 to be greater than 0 |
| M0-a-09 | packages/kernel/test/arr/bands/register.test.ts |  |  |  |  | 1 |  | 146: AssertionError: expected 2 to be +0 // Object.is equality |
| M0-a-09 | packages/kernel/test/arr/bands/restage.test.ts | 2 |  |  |  | 1 |  | 104: AssertionError: expected [ Array(1) ] to deeply equal [ Array(1) ]; 134: AssertionError: expected [ Array(1) ] to deeply equal [ Array(1) ]; 165: AssertionError: expected 'ok' to be 'E_INVARIANT arr: a vertex of the  |
| M0-a-09 | packages/kernel/test/arr/bands/shadow-prod.test.ts |  | 1 |  |  |  |  | 33: AssertionError: expected +0 to be 1 // Object.is equality |
| M0-a-09 | packages/kernel/test/arr/bands/shadow.test.ts |  | 8 |  |  |  |  | 436: AssertionError: half: expected [] to deeply equal [ 'start', 'done', '; 450: AssertionError: expected true to be false // Object.is equality; 482: AssertionError: expected [] to deeply equal [ 'start', 'done' ] |
| M0-a-09 | packages/kernel/test/arr/bands/vertexcontact.test.ts |  |  |  | 6 | 1 |  | 365: AssertionError: expected [ [ [ -2966, -76994 ], …(4) ] ] to deeply equ; 365: AssertionError: expected [ [ [ 83184, -23204 ], …(11) ] ] to deeply eq; 365: AssertionError: expected [ [ [ 2339, 2855 ], …(14) ] ] to deeply equal |
| M0-a-09 | packages/kernel/test/arr/bands/widthstep.test.ts |  |  |  | 5 |  |  | 268: AssertionError: expected [ { x: 9000, y: 1000 }, …(1) ] to deeply equa; 283: AssertionError: expected [ '4000,10 4000,207 3097,31' ] to deeply equa; 311: AssertionError: expected [ Array(1) ] to deeply equal [ Array(1) ] |
| M0-a-06 | packages/kernel/test/tx/savepoint.test.ts |  |  | 1 |  |  |  | 425: AssertionError: expected 0 to be greater than or equal to 2 |
| M0-a-09 | packages/testkit/test/kernel/arr-bands/agreement-corridor.test.ts | 1 |  |  |  |  | 1 | 25: AssertionError: expected [ …(4) ] to deeply equal []; 131: AssertionError: expected false to be true // Object.is equality |
| M0-b-03 | packages/layout/test/infill/fabric/seeds.test.ts |  |  |  |  |  | 1 | 161: AssertionError: expected 267 to be less than or equal to 100 |
| M0-b-03 | packages/layout/test/infill/fabric/strips.test.ts |  |  |  |  |  | 1 | 119: AssertionError: expected 77.5552832380274 to be greater than or equal  |
| M0-x-05 | packages/testkit/test/ladders/rungs-s8.test.ts |  |  |  |  |  | 1 | 153: AssertionError: expected { 'S8 F-CUT antenna': 1 } to deeply equal { ' |
| M0-c-02 | packages/layout/test/enceinte/s5seeds.test.ts | 7 |  |  |  |  |  | 107: AssertionError: expected null to deeply equal { code: 'E_SELF_INTERSEC; 107: AssertionError: expected null to deeply equal { code: 'E_SELF_INTERSEC; 107: AssertionError: expected null to deeply equal { code: 'E_SELF_INTERSEC |
| M0-a-05 | packages/kernel/test/insert/step3-5/q104.test.ts |  |  |  |  |  | 6 | 95: AssertionError: Hausdorff 11.18 cm: expected 11.179754774609794 to be ; 232: AssertionError: expected true to be false // Object.is equality; 232: AssertionError: expected true to be false // Object.is equality |
| M0-d-09 | bench/test/determinism/runner.test.ts |  |  |  |  |  | 1 | 57: AssertionError: expected { Object (seeds, factors, ...) } to match obj |
| M0-e-06 | bench/test/site/summary.test.ts | 1 |  |  |  |  |  | 258: AssertionError: relief-60 coarse seed 46 moved: re-run the summary (Q3 |
| M0-t-00 | bench/test/timing-phase/script.test.ts |  | 1 |  |  |  |  | 238: AssertionError: process: MainThread (pid 17752) at ≥ 10 % CPU: named,  |
| M0-f-01 | bench/test/calibrate/calibrate.test.ts | 3 |  |  |  |  |  | 59: Error: Command failed: /usr/bin/arch -x86_64 /opt/node24/bin/node --no; 149: AssertionError: expected 'Intel(R) Xeon(R) Processor @ 2.10GHz' to be ; 227: AssertionError: expected false to be true // Object.is equality |
| M0-f-01 | bench/test/host/host.test.ts | 2 |  |  |  |  |  | 28: AssertionError: expected 'Intel(R) Xeon(R) Processor @ 2.10GHz' to be ; 52: Error: Command failed: /usr/bin/arch -x86_64 /opt/node24/bin/node --no |
| M0-f-01 | bench/test/timing/contention.test.ts | 3 |  |  |  |  |  | 412: AssertionError: expected 94 to be greater than 100; 435: AssertionError: expected [ Array(1) ] to deeply equal [ 'process: node; ?: Error: Executable doesn't exist at /opt/pw-browsers/chromium_headless_ |
| M0-f-01 | bench/test/timing/harness.test.ts | 3 |  |  |  |  |  | 273: AssertionError: expected [ …(4) ] to include 'power: battery'; 319: AssertionError: expected 'native-x64' to be 'native-arm64' // Object.i; 450: AssertionError: expected 'Intel(R) Xeon(R) Processor @ 2.10GHz' to be  |
| M0-f-01 | bench/test/timing/sampler.test.ts | 2 |  |  |  |  |  | 41: AssertionError: expected 'process_api' to be '/sbin/launchd' // Object; 72: AssertionError: expected 'unknown' to be 'battery' // Object.is equali |
| M0-d-07 | tools/lint/kernel-boundary.test.mjs |  | 4 |  |  |  |  | 30: AssertionError: expected [ …(6) ] to deeply equal []; 39: AssertionError: expected [ …(6) ] to deeply equal []; 50: AssertionError: expected 6 to be 1 // Object.is equality |
