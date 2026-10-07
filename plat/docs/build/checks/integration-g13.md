# Integration check of stage group 13: M0-c-04, M0-e-04, M0-b-04, M0-k-06 (flow flow-7, 2026-10-06)

Lane `check/integration-flow-7-g13`, about 22:52 – 00:00.

**Verdict: FAIL.** The group has one blocker:

- **B-1 (M0-e-04).** S5's growth stages (M0-c-04) lay one enceinte per walled stage, and each of its gates names its
  own enceinte (`Gate.enceinte`). S6's gate seeds read a single wall (`siteFeatures(p, { gates, wall })`,
  `S6Input.wall`, `SeedAnchor.prefer` as one ring). Composed on c-04's honest three-stage output, every gate ward of
  the outer (stage 2) wall is seeded **inside the inner (stage 1) wall**, 184 – 457 m from its gate, on 5 of 5 seeds
  (8 of 8 wards per seed). The composer cannot avoid it inside the present interface either: with one
  `siteFeatures` call per enceinte, 17 of 160 outer gate wards (20 seeds) are still seeded wholly inside the inner
  wall. Nothing reports it. The ward is typed `gate` and carries the gate as its `namingFeature`.

Everything else holds. Install, lint, build and landed:verify are green. Each item's own tests are green at full
strength. The related set is green except for 2 tests in `bench/test/bentcut-ng/phase-a.test.ts`, which belong to the
busy M0-b-05; replayed afterwards, that file is green. The S3 → S4 → S5a/S5b → S6 → S8 composition commits on every
seed tried. It is deterministic, and containment, the edge test and F-CUT hold on it. The scanner reads the real tree
and finds hits planted in the other items' files at exactly the right lines. The PR tier reaches every test file of
the group, and the deny-list job reads `after-M-1: denylist.json`. Notes N-1 – N-8 follow.

**The seat.** Opus 5.5 in Claude Code on the owner's Windows PC. The machine check
(`python3 tools/machine_profile.py --id`) printed `wsl:Intel(R) Core(TM) i9-10900K CPU @ 3.70GHz:20cpu:16gib`, and
`node --version` printed `v24.12.0`. The seat is independent of the four items' authors and checkers. It changed no
file of any item. Its ledger row is **L-0295**. It ran no git command.

The probes and logs are in `~/maps-scratch/waves/integration-g13/`. Each probe was run from `plat/` with
`corepack pnpm exec tsx --conditions=plat-source`. The probes import the packages' `src/` and two read-only test
supports by absolute path: `layout/test/districts/support.ts` (`edgesL1`, `ownerOfL1`) and, for P1's grid recipe only,
by copy. They write nothing in `plat/`; P2's deny-list, allow file and report live in the scratch folder. No timing was
taken or judged.

**Busy items.** The brief listed none. During the check, `build/M0-b-05` was building `bench/src/bentcut-ng/` (lane log
22:57 – 23:23). Its test file was red in the related run while it was being written, and green when replayed at 23:28.
That red is a note, not the group's (N-7).

## The meeting points

| # | where | who writes / who reads | what the design or choices promise |
|---|---|---|---|
| A | S5's growth state → S6's input | c-04 writes `GrowthState`: each stage's `StageBoundary` (outline CCW, lattice points), `ways` (S4's plus S5b's `primary` roads), each stage's `gates` (one enceinte per walled stage, `Gate.enceinte`) and `wall`. e-04 reads `boundary` (the last stage's), `stageBoundaries`, `ways`, `features` (`siteFeatures` over gates, with one `wall`), `wall` | §4.5: the perimeter is the last stage's boundary offset by 50 m. Seeds are the sited features, gates among them; "gate wards at gates". The edge test refuses any arterial ≥ primary and any wall trace. `growthStage` is the first stage holding the seed. C-0245 (4): "the faces behind the wall first (the gate ward behind its gate)" |
| B | S6's districts → S8 (b-03, passed) under b-04's F-CUT bar | e-04 writes `District`, `Seam`, `lineages`. b-03's `runS8` reads them. b-04's bar reads S8's per-ladder report | §4.6 step 8 (≤ 6 kernel calls, face count never decreases, residue soft 5 %). §2.8 containment through `parent` |
| C | the scanner over the other items' files | k-06 reads every file of `plat/` by its read mode (C-0247). The group's sources, JSON table (`districts/s6.json`) and tests are among them | §17.1 (5): token, in-order 3-gram run (N-33), colour, file and list hits named by file and line, never printed. An allow entry silences exactly its hit |
| D | tier:pr and the deny-list job | f-02a's `prJobs` / `deriveStatus` (passed). k-06's `bench/src/scan/` is the job's source | §13.8. C-0099 / C-0121: `after-M-1: denylist.json` until M-1 and M0-k-07 |

## Gates, run once (CONFIRMED, executed)

| gate | command | result |
|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0 (`Done in 662ms`) |
| lint | `corepack pnpm lint` | exit 0: `lint: eslint 987 files, 0 errors, 0 warnings`. Every planted probe line was listed (`zz-probe.ts:6 Math.pow` … `:16 for…in`), and it printed `lint: probe-red ok` |
| build | `corepack pnpm build` | exit 0 |
| landed:verify | `corepack pnpm landed:verify -- flow-7 --item <id>` for each item | `ok (1 record)` × 4 |
| near, full strength | `vitest run --maxWorkers=6` over `layout/test/growth/s5ab/`, `layout/test/districts/`, `testkit/test/layout/districts/`, `bench/test/bentcut/`, `testkit/test/scanner/` and `bench/test/scan/` (PLAT_FUZZ_RUNS unset), 22:54 – 23:01 | exit 0: `Test Files 27 passed (27) · Tests 213 passed (213)` |
| related, reduced | `PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=3` over the 34 `.ts` sources under `src/` that the four landed records list (`related-sources.txt`), 23:12 – 23:27 | exit 1: `Test Files 1 failed \| 138 passed (139) · Tests 2 failed \| 1941 passed (1943)`. The 2 reds are `bench/test/bentcut-ng/phase-a.test.ts`, the busy M0-b-05's file, written during the run. Replayed alone at 23:28: `Test Files 1 passed (1) · Tests 7 passed (7)`. They are not the group's (N-7). A first attempt (`related-try1-killed.log`) was killed by the task runner (exit 144) before any summary. It was re-run detached |
| whole suite (J194) | `PLAT_FUZZ_RUNS=1000 corepack pnpm test --maxWorkers=2` | WHOLE_RESULT |
| scan (real list) | `corepack pnpm scan` | exit 2: `scan stopped: packages/testkit/baselines/denylist.json: missing file — the scan never passes without its deny-list (C-0101)`. This is the designed stop |

## Composition probes (CONFIRMED, executed)

**P1: S3 → S4 → S5a/S5b → S6 → S8 on the flat CITY fixture (`p1-growth-districts.mts`; meeting points A and B).**

For each seed the probe runs on one arena:

1. `s3Slice`, `commitS3Slice`, `runS4` and c-04's `runS5ab`. That gives three stages: stage 1 walled, stage 2 walled,
   and stage 3 the unwalled ribbon.
2. Optionally (`GRID=150`), e-04's own S5c stand-in. This is the jittered 150 m `secondary` grid of
   `cityRun`, laid over the last outline and kept clear of every wall, the plaza and every gate.
3. The adapter, written here, builds S6's input:
   - `boundary` is the last stage with land's `set.outline`.
   - `stageBoundaries` holds each stage's outline.
   - `ways` is `GrowthState.ways`.
   - `features` is `siteFeatures` over the plaza and **every** stage's gates. `WALL=1` makes one call with
     stage 1's wall. `WALL=perStage` makes one call per stage, each with that stage's wall.
4. It runs `runS6`, then optionally `runS8` on every district S6 made. S8 reads S6's `District`, `Seam` and lineage
   records as they are.
5. It checks the following:
   - S6 commits.
   - `report.unowned` is 0, and every live L1 face is owned. The context margin outside the frame is excluded: its
     outer ring is the arena's reach and its hole is the frame, so it is no S6 land. It is unowned in e-04's own
     fixture too.
   - The edge test holds over the **composed** network. No district holds both sides of a `through` or `primary`
     edge, S5b's roads included, nor of any `wall` / `wall_gate` / `setback` / `reserved` / perimeter edge of any
     stage.
   - The count law holds.
   - Every main gate seeds a ward (none dropped).
   - For each gate, the probe records the distance from the gate to its ward, and for a stage-k gate (k ≥ 2), the
     share of the ward's edges inside the stage k − 1 wall.
   - `growthStage` is in 1 … K.
   - The perimeter holds the last boundary.
   - Determinism: two runs give the same S6 output digest and the same L0 and L1 `recomputeLevelDigest`.
   - With S8: no district refused, every ladder ≤ 6 kernel calls, no ladder leaves < 1 face, residue per district
     (soft), and every L1 face still owned.

Results:

- **Seeds 1 – 20, grid, per-enceinte features, two runs each** (`p1-grid-perstage.log`):
  - S6 committed on 20/20 seeds. Determinism held on 20/20.
  - `report.unowned` was 0 and every L1 face inside the frame was owned on 20/20.
  - The edge test held on the composed network on 20/20, except for a 28 – 29 cm `setback` stub on seeds 5 and 19.
    That stub has the same face on both sides, so no district crosses anything. It is M0-c-02's and is present right
    after S3 (N-5).
  - `growthStage` was always in {1, 2, 3}.
  - The perimeter held the last boundary on 20/20.
  - The count law missed on every seed (`L` 32 – 39 against N_d 18; N-3).
  - The gate-ward median was above the town median on 20/20 (N-3).
- **Gate wards** (`p1-grid-wall1.log`, `p1-grid-perstage.log`, and the inner-wall share runs on seeds 1 and 3): **B-1**.
- **Seeds 1, 2, 4, 5, 6, 9 and 12 without the grid** (`p1-nogrid-dangles.log`):
  - S6 committed on 7/7 seeds, with the same structure.
  - The dangling S5b roads lie only in the hinterland after S6 (N-1).
- **S8 on every S6 district, seeds 1 – 3, grid, per-enceinte** (`p1-s8.log`):

  | seed | lanes | blocks | ladders | max kernel calls | ladders left < 1 face | districts refused | residue above 5 % (soft) |
  |---|---|---|---|---|---|---|---|
  | 1 | 1 186 | 1 201 | 2 306 | 2 | 0 | 0 | 3 districts, max 49 % |
  | 2 | 1 179 | 1 199 | 2 300 | 2 | 0 | 0 | 0 districts, max 4.2 % |
  | 3 | 1 202 | 1 216 | 2 337 | 2 | 0 | 0 | 2 districts, max 26.8 % |

  Every L1 face was still owned after S8 (N-6 for the residue).
- **P1b** (`p1b-dangles.mts`, `p1b.log`) counts dangling L1 edges after each step. **P1c** (`p1c-way14.mts`,
  `p1c-1-40.log`) records the S5b roads' end points on seeds 1 – 40 (N-1). `p1-gates.mts` lists seed 1's gates of every
  stage. Gate ids are unique across stages (`gate:0` … `gate:14`), and each gate names its enceinte.

**P2: the scanner over the real tree (`p2-scan-tree.mts`; meeting point C).**

The probe calls k-06's `bench/src/scan` `run()` with `root` = `plat/`. The deny-list is built by the probe with its
own salt, outside `plat/`. Its planted items come from the other items' files:

- the token `convolution` (e-04's `perimeter.ts` comments);
- the five-token run `s convolution curve with the` (three listed 3-grams, the N-33 run);
- the token `nucleus` (c-04's `mainRoads.ts` comments);
- the list {market, castle, bridgehead, riverbank, temple} (e-04's `types.ts` `SeedKind` line);
- the whole bytes of e-04's `districts/s6.json`.

Results:

- The scan read 1 576 files and none threw: `whole text 15, sources 1073, JSON strings 83, bytes only 405`.
- Exit 1, with `35 hits (token 32, 3-gram 1, colour 0, file 1, list 1)`.
- Every expected place was hit, and nothing else in those files. The token lines in `perimeter.ts` and `mainRoads.ts`
  are exactly their comment lines. The probe computed them independently by reading the files; code identifiers are
  not scanned, by C-0247. There is a 3-gram hit at `perimeter.ts:5`, the list hit at `types.ts:17`, and the file hit at
  `s6.json:0`.
- No planted word appears in the output or in the report.
- One `file` allow entry silenced exactly its hit (`unreviewed` 35 → 34).
- Two runs gave identical reports.
- The group's files hold no six-digit colour value, so the colour check was not exercised here; k-06's own tests
  cover it.

**P3: tier:pr and the deny-list job (`p3-tier-coverage.mts`; meeting point D).** These results come from `prJobs`
and `deriveStatus` on this tree, without running any job:

- The vitest units name all 8 projects. No unit passes `--` before its flags (J182).
- All **27** test files of the group's six test folders lie under a unit's root and include pattern. That is the same
  27 files as the near run.
- The tsc units cover `layout`, `testkit` and `bench`.
- The deny-list job is `{ source: 'bench/src/scan/', inputs: ['packages/testkit/baselines/denylist.json'],
  reviewedBy: ['M0-k-07'], item: 'M0-k-06' }`, and its status is `after-M-1: denylist.json`.
- **Result:** `bad: []`.

## Failing line

**B-1 — M0-e-04 (`packages/layout/src/districts/stage.ts` `siteFeatures` and `S6Input.wall`;
`packages/layout/src/districts/seeds.ts`, the point anchor; `types.ts` `SeedAnchor`). An outer enceinte's gate ward is
seeded behind the inner wall.**

- **The one-call form, as `siteFeatures` documents it** (`WALL=1`, all gates and stage 1's wall; seeds 1 – 5, grid):
  - On every seed, all 8 stage-2 gate wards lie 184 – 457 m from their gates, with `growthStage` 1.
  - Their edges lie inside the stage-1 wall: for example, seed 1 has `gate:7` 174/175, `gate:10` 119/119 and
    `gate:12` 58/58; seed 3 has `gate:8` 85/85 and `gate:11` 105/105. The few edges outside are the shared wall-strip
    edges.
  - The district is typed `gate` and named after a gate it does not touch, and that gate lies beyond another wall.
- **The best the present interface allows** (`WALL=perStage`, one `siteFeatures` call per enceinte, each with its own
  wall; seeds 1 – 20):
  - 17 of 160 stage-2 gate wards are still seeded 198 – 457 m away with `growthStage` 1. Every one of the 17 lies on
    the stage-1 side.
  - For example, `gate:12` on seeds 1 and 3 has 58/58 and 73/73 edges inside the stage-1 wall.
  - The cause: `SeedAnchor.prefer` is one ring, "the faces whose centroid lies inside it first". The inner enceinte's
    faces lie inside the outer wall too. When a gate's adjacent free faces are taken, the anchor takes the nearest
    free face at any distance, across the inner wall.
  - P1's diagnostic shows seed 1's `gate:12` surrounded by `gate:8`'s and `gate:9`'s wards, the strips and the
    hinterland.
- **Why it is the group's.** This is an interface mismatch between c-04 and e-04. c-04 writes several enceintes, with
  each gate's enceinte named. e-04's S6 input and `siteFeatures` take one wall, and its anchor can express only
  "inside one ring". The result is a silently wrong committed record on honest input: a `gate` district not at its
  gate, its `namingFeature` a gate beyond a wall (§4.5 "gate wards at gates"; C-0245 (4) "the gate ward behind its
  gate"). M0 composes these two stages in M0-c-06's integrated run (S4 + S5 + S6 + S8, three stages) and through
  M0-x-04's registration.
- **Why the items' own checks missed it.** e-04's fixtures (`town`, `cityRun`) have one wall. c-04 stops at S5.
- **Required change.**
  - Each main gate's ward must be seeded on its own enceinte's side: behind its own wall and outside every inner
    enceinte. For example, read each gate's wall through `Gate.enceinte` (S6's input carrying the enceinte lines by
    id), or give the point anchor an inner ring to stay outside.
  - By J202's detect-and-refuse preference: when no free face is left there near the gate, drop and report the feature
    (`seedsDropped`) rather than seed it across another wall.
  - `S6Input.wall` for the `extramural` relation needs the same reading (N-4).
  - A test is needed on a two-enceinte arena: c-04's three-stage CITY run, or a synthetic two-wall town.
- **Labels.** CONFIRMED by execution: the placement and the inner-wall shares. PLAUSIBLE, by reading `seeds.ts` and
  P1's neighbourhood diagnostic: the cause.

## Notes (not blockers)

- **N-1 (M0-c-04, KI; for M0-c-06 and the M1 hinterland unit).**
  - An S5b road can end up to 1 m short of the frame. In `courses()` (`mainRoads.ts:860`) the frame point is appended
    only when it lies ≥ 100 cm from the last lattice node in x or y.
  - On 17 of 295 S5b roads (seeds 1 – 40) the last node lies 13 – 99 cm inside the frame. On 12 of them, all with the
    end ≥ 27 cm off, the end vertex keeps degree 1. The road then dead-ends, and up to 274 of its edges have the same
    L1 face on both sides (`p1c-1-40.log`). Those under about 26 cm were attracted onto the border.
  - After S6 the perimeter anchors the road's inner part, so every dangling edge lies in the hinterland face
    (`p1-nogrid-dangles.log`: `way:19@hinterland 143` and so on). No district holds one, and S6's edge test holds.
  - Nothing at M0 reads the hinterland's faces. A primary that is meant to run "to the frame" still divides nothing
    outside the settlement.
  - The fix is cheap: append the frame point whenever the last node is off the border, or snap the end onto it. A
    hardening test can assert that every S5b road's end vertex has degree ≥ 2 at the border.
- **N-2 (M0-e-04, KI).** Even in a one-wall world, a gate's ward can be seeded far from its gate when earlier gates'
  seeds took its adjacent faces. One stage-1 gate per seed did so on the grid fixture, 86 – 278 m away. This is the same
  anchor rule as B-1, without the wall crossing. B-1's fix may cover it, for example with a distance or adjacency bound
  and a report.
- **N-3 (design-level, for M0-c-06's face-count report and the session; not M0-e-06's bar).** Once S5's arterials and
  the second wall are in place, §4.5's count law and the small gate wards cannot hold.
  - S5b's primaries and the stage-2 wall are edge-test barriers, so the land falls into about 29 compartments. Every
    compartment yields a district by the leftover rule (§4.5) and C-0245 (11).
  - `L` is 32 – 39 against N_d 18 (leftovers 15 – 21).
  - The gate-ward median (8.6 – 11.3 ha) is above the town's (4.9 – 7.3 ha) on 20/20 seeds. The many small leftover
    districts pull the town median down.
  - This follows the design's own rules. M0-e-06's bar is on S1 + S4 + S6, with no S5, and is unaffected. M0-c-06's
    "≈ 25 districts" will read about 32 – 39 with S5's three stages.
- **N-4 (M0-e-04 / the composer).** `S6Input.wall` feeds the typing's `extramural` relation, and it is one line. With
  two enceintes, which wall "extramural" means is open. P1 passed stage 1's wall. This should be read with B-1's fix.
- **N-5 (M0-c-02, KI).** On seeds 5 and 19 a 28 – 29 cm piece of `setback:enceinte:1` dangles inside one L1 face. It
  is present right after `commitS3Slice`, and S4 and S5 do not change it (`p1b.log`). Its two sides are the same face,
  so no district crosses the strip. A hardening test could keep the strip lines free of dangles.
- **N-6 (M0-b-03 / M0-b-04, reported).** On S6's real districts the residue soft limit (5 %) is exceeded in 3, 0 and
  2 districts on seeds 1 – 3, with a maximum of 49 %. These are the leftover compartments of N-3. b-04's F-CUT bar
  itself holds on every ladder (≤ 2 calls, 0 decreases).
- **N-7 (session; busy item).** `bench/test/bentcut-ng/phase-a.test.ts` (M0-b-05, being built) was red in the related
  run, with `expected [ 'none', undefined ] …` and `expected [ +0, 1 ] to include 2`, while its author was writing it.
  Replayed at 23:28 it was green (7/7).
- **N-8 (M0-k-06, informative).** `layout/src/districts/s6.json`, like `fields/pass1.json`, is a data table that sits
  outside `packages/tables/data/`. The scanner reads it by its JSON strings and keys (C-0247), not as a whole-text
  table. P2 found the file hit and would find any listed token in its strings. Whether such tables are "@plat/tables'
  data files" for §17.1 (5) is for M0-k-07 to confirm.

## Re-check guidance

1. Re-run P1 with `WALL=1` (or with whatever the fix makes the composer's call) and `WALL=perStage` on seeds 1 – 20
   with the grid.
2. Every stage-k gate ward (k ≥ 2) must have 0 edges inside the stage k − 1 wall, or its gate must be reported in
   `seedsDropped`.
3. S6 must still commit on 20/20 and stay deterministic, with the edge test and containment as above.
4. Re-run e-04's near tests and the related set. The rest stands unless the fix touches it.
