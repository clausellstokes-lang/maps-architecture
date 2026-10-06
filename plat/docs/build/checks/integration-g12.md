# Integration check of stage group 12: M0-c-03, M0-b-03, M0-e-03, M0-f-02a (flow flow-7, 2026-10-06)

Lane `check/integration-flow-7-g12`, about 19:10 – 20:15.

**Verdict: FAIL.** The group has four blockers:

- **B-1 (M0-e-03).** A gate is red because of a group file. The whole suite fails `site/test/terrain/range.test.ts`
  ("the one door") on M0-e-03's `water/outfalls.ts`.
- **B-2 (M0-c-03).** On honest river inputs, S4 lays a through-road's last stub inside the river and commits it
  silently.
- **B-3 (M0-c-03).** On an honest river input, F-ROUTE's `another_site` re-solve doubles back over the gate corridor.
  The kernel then refuses S4's whole batch.
- **B-4 (M0-c-01, a passed dependency of M0-c-03, not busy).** On an honest river input, a gate route of the S3 slice
  carries an A→B→A spur at its pick. S4 cannot commit that route, and the kernel refuses its whole batch.

Everything else holds. Install, lint, build and landed:verify are green. Each item's own tests are green at full
strength, and the related set is green at reduced strength. The S3 → S4 → S8 composition is clean on 12 seeds. The
PR tier reaches every test file of the group. Seven notes follow (N-1 – N-7).

**The seat.** Opus 5.5 in Claude Code on the owner's Windows PC. The machine check
(`python3 tools/machine_profile.py --id`) printed `wsl:Intel(R) Core(TM) i9-10900K CPU @ 3.70GHz:20cpu:16gib`, and
`node --version` printed `v24.12.0`. The seat is independent of the four items' authors and checkers. It changed no
file of any item. Its ledger row is **L-0278**. It ran no git command.

The probes and logs are in `~/maps-scratch/waves/integration-g12/`. Each probe was run from `plat/` with
`corepack pnpm exec tsx --conditions=plat-source`. The probes import the packages' `src/` and three read-only test
supports by absolute path: `site/test/water/support.ts`, `layout/test/backbone/support.ts` and
`layout/test/infill/fabric/support.ts`. They write nothing in `plat/`. No timing was taken or judged.

**Busy items.** M0-c-04, M0-e-04 and M0-b-04 were busy. No probe reads their files. The whole-suite run loads their
tests. The `bentcut: … FAILS` lines in the logs are b-04's planted bar failures, and their tests pass.

## The meeting points

| # | where | who writes / who reads | what the design or choices promise |
|---|---|---|---|
| A | the crossing site becomes a bridge | e-03 writes S1's L0 batch: each `Bridge` in state `site`, with its two pinned `('deck_end', bridge, 0 \| 1)` vertices and `S1Output.sites`. c-03 reads them through the lattice's `WaterPlan.decks` (`DeckSegment {id, a, b}`, "the deck_end vertices' points") and `water.bridges`, and writes `built`, `Way.bridge` and the span | §4.2 S1 (5), §4.3 *Decks*, §2.2 rule 7, C-0076: "a route reaching a crossing site passes along the site's deck segment … and the Bridge's state becomes built (a site no route uses stays a site)", and "a route that would cross water away from a site is refused by the lattice" |
| B | the outer ring | e-03 (`outerRingBatch(reachOf(frame))`) and c-02 (`commitOuterRing`, or `outerRing: 'present'`) | §4.1: one outer ring, S1's, first |
| C | S4's ways as S8's spines | c-03 writes `Way` (class, a scalar or `width_knot` width, `way:<n>`), `Junction` and the L1 spines. b-03 reads `ways`, the `widths` map the kernel's `spineWidths` reads, the seams (C-0046) and the class for continuation | §4.6 steps 7 and 9 – 10: seam portals on district-bounding spines, continuation only across a lower-or-equal class inside the district, lane widths never narrower than a lower class, the wall strips never cut |
| D | tier:pr over the group | f-02a's `prJobs` (vitest per project from `vitest.config.ts`, tsc per reference) and the group's test folders | §13.8: the PR tier runs the unit and contract tests. C-0099: statuses are derived |

## Gates, run once (CONFIRMED, executed)

| gate | command | result |
|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0 (`Already up to date`) |
| lint | `corepack pnpm lint` | exit 0: `lint: eslint 935 files, 0 errors, 0 warnings`. Every planted probe line was listed, and it printed `lint: probe-red ok` |
| build | `corepack pnpm build` | exit 0 (`build: tsc -b ok`, six esbuild bundles) |
| landed:verify | `corepack pnpm landed:verify -- flow-7 --item <id>` for each item | `ok (1 record)` × 4 |
| near, full strength | `vitest run --maxWorkers=4` over `layout/test/backbone/`, `layout/test/infill/fabric/`, `testkit/test/layout/infill-fabric/`, `site/test/water/` and `bench/test/tiers/` (PLAT_FUZZ_RUNS unset) | exit 0: `Test Files 31 passed (31) · Tests 236 passed (236)` |
| related, reduced | `PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=4` over the 32 `src/` files the four landed records list (`related-sources.txt`) | exit 0: `Test Files 78 passed (78) · Tests 603 passed (603)` |
| whole suite (J194) | `PLAT_FUZZ_RUNS=1000 corepack pnpm test --maxWorkers=4` (19:25 – 19:42) | exit 1: `Test Files 7 failed \| 374 passed (381) · Tests 16 failed \| 4769 passed (4785)`. **14** reds are J176's five Mac-reference bench files (calibrate 3, host 2, contention 4, harness 3, sampler 2), each for a Mac reason (`Apple M1`, `arch -x86_64`, `launchd`, pmset). **1** is `model/test/types/types.test.ts`, a 5 s timeout under load that passes alone (N-6). **1** is `site/test/terrain/range.test.ts`, which is **B-1** |

The related set misses B-1 because `range.test.ts` is a source scan (`ts.createProgram` over `site/src`), not an
import of `outfalls.ts`. The `vitest related` graph therefore never selects it. Integration checks g10 and g11 already
saw the same red, while M0-e-03 was in flight, and recorded it as foreign. Now that M0-e-03 is in this group, the red
belongs to the group.

## Composition probes (CONFIRMED, executed)

**P1: S1 → S3 → S4 on traced rivers (`p1-water-backbone.mts`; meeting points A and B).** For each seed the probe does
this:

1. It builds the small flat site (`flatFixture(seed, {frameAreaHa: 400, walledHa: 30})`, C-0016). The river is
   e-03's own fixture, `riverFixture(seed, {relief: 'rolling'}, …)`, on the same frame (equality asserted). Its
   request is the exit bar's form: a bearing on `seed % 4 = 1`, a tributary on even seeds, no estuary.
2. It runs `runS1` on an indexed ground arena.
3. It builds the lattice's `WaterPlan`. The faces are the outer rings of `waterPolygons(S1's bodies)`. The decks are
   `{id, a, b}` read from the committed `('deck_end', id, 0 | 1)` vertices, as `DeckSegment` defines them.
4. It runs `s3Slice`, `commitS3Slice(…, {outerRing: 'present', water})` and `runS4` on the same arena.
5. It runs the checks:
   - S4 returns S1's bridges one for one, with the same ids and deck refs.
   - Each `built` bridge has a way whose `bridge` names it, and exactly one way edge between its two deck_end
     vertices. Those vertices keep their rows and ordinals and do not move.
   - Each remaining site has `state: 'site'`, `way: null` and no way edge at its ends.
   - No way edge has its midpoint in water unless it is a span.
   - The kernel's CI sweep holds every hard row over the whole arena.
   - A second run gives a byte-identical S4 output and arena digest.

Results over seeds 1 – 30 (`p1-small.log`, and `p1-resolved-6.log` for the six seeds that matter):

- S1 committed on 30/30 seeds, with 479 sites. S4 committed on 28/30.
- **4 bridges became `built`, and every one passed the checks:** seed 6 `bridge:3`, seed 8 `bridge:13`, seed 16
  `bridge:15` and seed 30 `bridge:8`. On seed 16 F-ROUTE's `another_site` gave up `bridge:14` and took `bridge:15`
  (held), which is C-0076's rung working on S1's real sites. Every other site stayed a site.
- Seeds 4 and 22 report `gate:2/out` as `unserved`, after `another_site` (none in band) and `extra_bridge`
  (`notBuilt(M1)`). That is reported, never silent.
- Determinism held on 28/28 composed seeds. The CI sweep held on every committed seed. The outer ring of B is one
  ring: c-02's `arenaReach` and e-03's `reachOf` are the same formula, and S3's `present` mode took S1's ring.
- **Seeds 17 and 21: B-2.** **Seed 28: B-3.** **Seed 19: B-4.** **Seed 30: N-1.**

**P2: S3 → S4 → S8 over the walled interior (`p2-backbone-infill.mts`; meeting point C).** For each seed the probe
does this:

1. It commits c-02's slice and runs c-03's S4 on one arena. The kernel's `spineWidths` is b-03's
   `spineWidthsOf(widths)`, filled with S4's way widths.
2. Each unowned L1 face that an inner wall strip bounds becomes its own district, minted as in b-03's strips test.
   S4's inward primaries now divide those faces.
3. It writes one minimal Seam per S4 way that has two districts on its sides, then runs `runS8` with S4's `ways`.
4. It checks the following:
   - No district is refused.
   - Every S4 way survives: its edge-union length is the same (S8 only splits it at T-junctions), its spine
     resolves, and every S4 junction resolves to the same point.
   - No strip face is split or loses a corner. A new vertex on a strip ring lies at most 0.569 cm off its old ring,
     which is the kernel's lattice snap.
   - Every lane edge has one district on both sides.
   - There is no crossroads on a district-bounding S4 way.
   - No lane is wider than the narrowest S4 way.
   - b-03's `portalInvariant` finds no problem on the S4 seams after S8.
   - The CI sweep holds every hard row.
   - Two runs give byte-identical results.

**Result** on seeds 1 – 12, 3 districts and 3 seams each: `{"probe":"P2","seeds":12,"lanes":1111,"blocks":1083,`
`"refusedDistricts":0,"bad":[]}`. No S4 way carried a `width_knot` profile on these seeds (N-3).

**P3: tier:pr over the group (`p3-tier-coverage.mts`; meeting point D).** These results come from `prJobs(plat)` and
`deriveStatus` on this tree, without running any job:

- The vitest units name all 8 projects of `vitest.config.ts`. No unit passes `--` before its flags (J182).
- All **31** test files of the group's five test folders lie under a project's root and include pattern. That is the
  same 31 files as the near run.
- The tsc units cover `kernel`, `model`, `site`, `layout`, `testkit` and `bench`.
- Derived statuses: lint, type check, unit and contract tests, B-FUZZ, licence, notices and vendor are `built`. The
  deny-list scan is `after-M-1: denylist.json`, and both B-CITY-lite stand-ins are `not-built: M0-f-02b`. That agrees
  with C-0099 and C-0121.
- **Result:** `bad: []`.

## Failing lines

**B-1 — M0-e-03 (`packages/site/src/water/outfalls.ts`). A gate is red because of a group file.**

- **The failing test.** `site/test/terrain/range.test.ts` › "no source of @plat/site writes an Int32Array's cells but
  range.ts (a type-checked scan)" fails. The scan finds `"water/outfalls.ts: new Int32Array(n).fill()"` and
  `"water/outfalls.ts: bodyOf[c]"` × 2. These are outfalls.ts:93 `const bodyOf = new Int32Array(n).fill(-1)`, and the
  writes at :101 and :108.
- **Replay.** Replayed alone with `vitest run packages/site/test/terrain/range.test.ts`: still red. Every other site
  source passes the scan.
- **Required change.** `outfalls.ts` must stop writing Int32Array cells outside `terrain/range.ts`, for example with a
  plain array or another typed array for the body index. The alternative is that the rule's owner (M0-e-01) narrows
  the rule through a choices row. That is not this group's to decide.
- **Why the item's own gates missed it.** The source scan is outside `vitest related`'s import graph (see the gates
  table).

**B-2 — M0-c-03 (`packages/layout/src/backbone/stage.ts` `routesFromSlice`, the frame stub; `commit.ts` line 339,
which commits the lattice course whatever it crosses). S4 commits a way inside the river, silently.**

- **What happens.** The outward part's last point is `toFrame(last lattice node, last direction)`. This is the
  "through-roads continue to the context margin" stub (C-0236). The lattice never routed it, so nothing kept it off
  water. `chainKeeps` rejects the chain on water. Its fallback climbs to the lattice course, which carries the same
  stub, and the loop at commit.ts:339 stops at level 2 and commits it anyway. The report counts only `unsmoothed`.
- **Seed 21** (small site, rolling relief, no bearing): `way:3` (through, `gate:1` → bearing 8797) ends with the edge
  (98582, 13414) → (100000, 13518), 14.2 m long. The arena's own L0 point-locate at its midpoint is the face
  `water:river:0`. (98582, 13414) is a shore vertex, and the frame point lies in the channel between the shore edges
  at x ≈ 98 590 and x ≈ 100 370.
- **Seed 17:** `way:3` ends with (−4260, 97824) → (−5607, 100000), 25.6 m long, also in `water:river:0`.
- **In P1:** 2 of 28 composed seeds. Neither the CI sweep nor the S4 report flags it.
- **Required change.** By J202's detect-and-refuse preference, the stub (and any lattice-course chain that still fails
  the water rule) must never be committed across water off a deck. For example, end the through-road at its last dry
  node, or report the part as `unserved` or `offGate`. A test is needed on a river that reaches the frame edge where a
  through-road leaves.

**B-3 — M0-c-03 (`packages/layout/src/backbone/stage.ts` `routesFromSlice`, the outward part's assembly). F-ROUTE's
`another_site` re-solve doubles back, and S4 is refused.**

- **What happens.** `nodes = [...r.nodes.slice(gi + 1, outFrom), ...outward.nodes]`. When the ladder re-solves the
  outward part from `r.nodes[outFrom]` with a deck excluded, the new path can step back through the held corridor
  nodes `r.nodes[gi + 1 .. outFrom − 1]`.
- **Seed 28:** `gi` 10, `WAY_SPAN_NODES` 4, `outFrom` 15. The `gate:0/out` points run (−17046, −25154) gate,
  (−17737, −26381), (−18641, −27816), **(−20403, −30576), (−21458, −32470)**, (−22358, −34624), then **(−21458,
  −32470), (−20403, −30576)** again, then north. The rung recorded is `{"rung":"another_site","from":"bridge:27",`
  `"to":null,"held":true}`.
- **The refusal.** The way branches. The kernel refuses S4's batch on the smoothed and the lattice courses: `E_INVARIANT
  S4: the spines' batch was refused (E_INVARIANT: (way, way:1) branches: a linear role forms simple chains or rings
  (§3.10 role consistency))`. The town gets no backbone at all.
- **Classification.** This fails safely (a typed refusal, no throw). It is still a blocker: the rung reports success
  (`held: true`) for a route the commit cannot insert, and one route part's re-solve loses every way of the stage on an
  honest river input.
- **Required change.** A re-solved (or any) route part must reach the commit as a simple path, for example by cutting
  the loop at its first repeated node, or by re-solving from the gate side. Otherwise that one part must take
  `unserved`, never the whole stage. A test is needed on this shape.

**B-4 — M0-c-01 (`packages/layout/src/siting/routes.ts`, the gate route's join at its pick; a passed dependency of
M0-c-03, not busy). A gate route revisits a node, and S4 is refused.**

- **What happens.** On **seed 19**, slice route 0 has 48 nodes, `pickAt` 9 and `routeIndex` 12. Node 4268,
  (−16463, 14793), appears at indices 8 and 10: the path runs (−16463, 14793) → (−18756, 15583) (the pick) →
  (−16463, 14793). The attach → pick solve and the pick → rim solve are joined at the pick, and the second steps back
  along the first.
- **The refusal.** S4 commits the route without re-solving (§4.3), so `way:0` branches and the batch is refused with
  the same `E_INVARIANT … (way, way:0) branches`. This is an interface mismatch: `GateRoute.nodes` ("the lattice
  nodes from the attach node through the pick to the rim") is read by S4 (and by c-02's strip corridor) as a path.
- **Required change.** The joined route is a simple path, with the spur at the pick removed. A test is needed.
- **Alternative.** If M0-c-03's fix of B-3 cuts loops in every route part before the commit, B-4 no longer refuses S4.
  The session may then fold B-4 into that fix and keep c-01's spur as a hardening row.

## Notes (not blockers)

- **N-1 (M0-e-03 hardening, KI; and the composer, M0-e-06 / M0-x-04).** `S1Output.sites[i].deck` is documented as
  "the deck's ends … the bank points the L0 batch inserts into the reach's shore". On seed 30, `bridge:11`'s committed
  `('deck_end', bridge:11, 0)` vertex is (71828, 59162), but the site says (71807, 59147): 25.8 cm apart. The kernel
  attracted the end on insertion (S1 reports `W_ATTRACTED` 1). The same offset appears in e-03's own `ground()` arena.
  The committed state is right (e-03's exit bar measures the resolved ends), and `sites` is not a persisted key. A
  composer that builds `WaterPlan.decks` from `sites` instead of the resolved VertexRefs would still put a deck end
  25.8 cm off its vertex. P1 reads the resolved refs, as `DeckSegment` says. With `ADAPTER=sites` the seed-30 deck
  mismatch is the only change.
- **N-2 (M0-c-03, C-0236 (9); for M0-e-06's river bars).** On the river seeds S4 reports route parts that meet the wall
  off their gate: seed 17 `offGate` 2, and seed 28 `wallCrossings` 3 (`gate:0/out`, `gate:1/in`, `gate:2/out`). C-0236
  (9) says "0 on the fixtures", and that holds on the flat fixture. They are reported, not silent.
- **N-3 (M0-x-04 / M0-e-04 as S8's composer).** S8 takes one width per way (`widths: Map<Id, number>`, half of it the
  kerb), but S4 writes a `width_knot` profile on a way whose class changes. The composer must pick one number. P2 used
  the widest knot, and no profile occurred on its 12 seeds.
- **N-4 (M0-b-03, KI).** `continuationVerdict` ranks every class but alley, lane and secondary as 3. So `track` and
  `path` (F-ROUTE's slope rung, which takes effect only with grade limits) count as higher than a lane, and
  continuation across them is refused. That is conservative and fails safe.
- **N-5 (identity).** S4's ids are sequential (`way:<n>`, `junction:<n>`, C-0236 (10)), and S8's are minted
  (`way:<13-char token>`). They cannot collide. S4's ways carry no lineage for S8's `live` list. No group item needs
  it.
- **N-6 (session).** The whole suite timed out `model/test/types/types.test.ts` › "reflection over the list" at 5 s
  under load. Replayed alone it passes (2 files, 16/17 with B-1's red only).
- **N-7 (M0-f-02a, informative).** `vitestProjects()` reads project names by regex (`pkg('…'` / `name: '…'`). It
  matches `vitest.config.ts` exactly today (8 of 8). A project added in another form would drop out of tier:pr
  silently. That is hardening only.

## Re-check guidance

Re-run P1 on seeds 17, 19, 21 and 28 (`LIST=17,19,21,28`) and the whole set 1 – 30. Each seed must commit S4 with
`bad: []`, or report a part `unserved` or `offGate`. Re-run `range.test.ts`. The rest of the probes and gates stand
unless the fixes touch them.
