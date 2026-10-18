# Integration check of stage group 14: M0-c-05, M0-e-05, M0-d-06, M0-b-05 (flow flow-7, 2026-10-07)

Lane `check/integration-flow-7-g14`, 2026-10-07 11:47 – 12:14.

**Verdict: PASS.** No blocker was found. Install, lint, build and landed:verify are green. Each item's own tests are green
at full strength, and the related set over the group's changed sources is green at reduced strength. The whole suite
(J194, reduced strength) has 14 reds, and all of them are in the five J176 bench files for Mac-reference reasons.

The composition probes ran these meeting points end to end on honest inputs:

- S5d (M0-c-05) read its band through M0-e-05's driver-only prosperity field, both with the stand-in demand and with a
  per-band demand that forces the top-up.
- The whole chain S3 → S4 → S5 (c-05) → S6 (M0-e-04, a passed dependency) → fields pass 1 (e-05) ran on the CITY and
  small flat fixtures.
- The same chain ran through M0-d-06's cross-host bundle, with workers on and off.
- M0-b-05's table-cell writer fed M0-c-05's regime reader.

Every run committed, was deterministic, and matched what the design promises at the meeting point. Notes N-1 – N-5 follow.
They are not blockers.

**The seat.** Opus 5.5 in Claude Code on the owner's Windows PC. `python3 tools/machine_profile.py --id` printed
`wsl:Intel(R) Core(TM) i9-10900K CPU @ 3.70GHz:20cpu:16gib`, and `node --version` printed `v24.12.0`. The seat is
independent of the four items' authors and checkers. It changed no file of any item. It ran one read-only `git status` by mistake, with its output discarded unread; it ran no other git command and changed no git state. Its ledger
row is **L-0324**. The probes and logs are in `~/maps-scratch/waves/integration-g14/`. Each probe was run from `plat/`
with `corepack pnpm exec tsx --conditions=plat-source`. The probes import the packages' `src/` by absolute path and
write nothing in `plat/`. No timing was taken or judged.

**Busy items.** The brief listed none. None of the four items' files changed during the check: landed:verify was `ok`
for each at the start, and the lane log shows no seat on them.

## The meeting points

| # | where | who writes / who reads | what the design or choices promise |
|---|---|---|---|
| A | S5d's band ← the prosperity field | e-05 writes the driver-only state (`fieldsDrivers` → `DriverField { name: 'driver-only', prosperityAt }`, 32 m cells over frame + margin, cm). c-05's `capacityCheck` / `capacityStep` / `runS5` read a `FieldProvider { name, prosperityAt(p: XY) }` at each priced face's centroid (cm) | §4.4 S5d ("the band by the driver-only field cut by provisional cut points"); C-0034 (the ramp in the fusion run, the driver-only pass-1 field in the integrated run, wired by M0-c-06); e-05 `types.ts`: `DriverField.prosperityAt` is "the FieldProvider form S5d reads" |
| B | S5's arena and records → S6 → fields pass 1 | c-05 adds S5c's secondaries, prune / trim and S5d's top-up (grown boundary) to c-04's `GrowthState` and the arena. e-04's S6 reads them (passed, through the g13 re-check's `walls` adapter, C-0257). e-05 reads the committed arena (`fieldDriverSources`: plaza, markets, `through` / `primary` ways, gates, water, walls; `fieldFaces`) and S6's districts | §4.5: pass 1 at S6, the driver kernels then the district-type term; FieldBands' cuts give the shares' land within one cell (§16 M0 (e)); "pass 1 is a function of committed state" |
| C | the stages inside the cross-host bundle | d-06's runner bundles a stage table (esbuild, `plat-source`) and runs it per leg, with workers off and on, comparing model / records digests. c-05's and e-05's stages (with `@plat/tables`' data) are what M0-d-09's spike-city run will carry | §6.5 (9), §13.2: the same inputs and stream give the same digest on every leg, with workers on and off |
| D | the table-cell writer → the regime reader | b-05's `writeCells` (phase a: `granularity`, `regimes`) writes `regimes.json`'s calibratable `blockDepthFloorM`. c-05's `growthRules` reads it for the legality clearance and the prune length | C-0117 (a version bump, the cells, nothing else; round-trips through M0-s-02's loader); C-0254 (2) (clearance = max(depth, separation ÷ 2) + half width) |
| E | the bench dispatcher | b-05's `bentcut-ng` and d-06's `crosshost` share `scripts/bench.mjs`'s table | each entry dispatches and refuses bad arguments with exit 64 |

## (1) Gates, run once (CONFIRMED, executed)

| gate | command | result |
|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0 |
| lint | `corepack pnpm lint` | exit 0: `lint: eslint 1018 files, 0 errors, 0 warnings`. Every planted probe line was listed (`zz-probe.ts:6 – 16`), and it printed `lint: probe-red ok` |
| build | `corepack pnpm build` | exit 0 |
| landed:verify | `corepack pnpm landed:verify -- flow-7 --item <id>` for M0-c-05, M0-e-05, M0-d-06 and M0-b-05 | `ok (1 record)` × 4 |
| near, full strength | `vitest run --maxWorkers=8` over `layout/test/growth/s5cd/`, `testkit/test/layout/growth-s5cd/`, `layout/test/fields/`, `testkit/test/crosshost/`, `bench/test/crosshost/` and `bench/test/bentcut-ng/` (PLAT_FUZZ_RUNS unset) | exit 0: `Test Files 44 passed (44) · Tests 312 passed (312)` |
| related, reduced | `PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=7` over the 40 sources the four landed records list under `packages/*/src/` and `bench/src/` (`related-sources.txt`) | exit 0: `Test Files 150 passed (150) · Tests 2033 passed (2033)` |
| whole suite (J194), reduced | `PLAT_FUZZ_RUNS=1000 corepack pnpm test --maxWorkers=7` | exit 1: `Test Files 5 failed / 414 passed (419) · Tests 14 failed / 5070 passed (5084)`. All 14 reds are in the five J176 files (`calibrate`, `host`, `timing/contention`, `timing/harness`, `timing/sampler`) for Mac-reference reasons: `expected 'Intel(R) Core(TM) i9-10900K…' to be 'Apple M1'`, `'systemd'` vs `'/sbin/launchd'`, `'native-x64'` vs `'native-arm64'`, `arch -x86_64` (Rosetta), pmset battery readings, the Chromium headless shell missing from the cache, and process counts. This is the same 14 as the g13 check. There is no red outside them |
| bench dispatch | `corepack pnpm bench -- bentcut-ng --phase z`; `corepack pnpm bench -- crosshost nope` | each exits 64 with its own usage line (`cli-*.log`) |

## (2) Composition probes (CONFIRMED, executed)

**P1 — S5d on e-05's driver-only field** (`p1-s5d-field.mts`, meeting point A). Run A is S3 → S4 → `runS5` with the
default ramp. The probe reads `fieldDriverSources` from A's arena and runs `fieldsDrivers` to get the prosperity
`DriverField`. Run B is a fresh S3 → S4 → `runS5({ field })`, run twice.

| run | log | result |
|---|---|---|
| CITY seeds 1 – 8 | `p1-seed1.log`, `p1-seeds2-8.log` | B commits 8/8. The two B runs give identical S5 records and L1 digests (8/8). Every S5d record reports `field: 'driver-only'`. Every priced face's value lies in [0, 1] and equals the provider's own value at its centroid, so units and points agree (cm on both sides). Every face's band equals `bandOf(value, cuts)`, and the cuts never decrease. At k = 1 each band's cumulative built land is within one face of its household share (the cut-point rule of C-0254 (9)). P(centre) ≈ 0.80 and P(corner) 0.25 – 0.33 (falling outward). The field is not flat: 23 – 30 distinct values over 23 – 31 faces per stage. Top-up decisions equal the ramp's (N-2) |
| small fixture seeds 1 – 4 | `p1-small1-4.log` | the same checks: 4/4 clean |
| CITY seeds 1 – 3, `DEMAND=1.3` (a per-band demand of 1.3 × the stage quota by the household shares) | `p1-demand1.3.log`, `-detail.log` | the top-up path ran on the driver field. Walled stages: `skipped_walled` (C-0254 (11)). Unwalled k3: `grown`, rim grown, re-checked, remainder reported (seed 1: pre 25.87 ha → after 23.94 ha, built 21.6 → 57.0 ha). Deterministic on all 3 seeds, no restart, 0 issues (N-2) |

**P2 — S3 → S4 → S5 (c-05) → S6 (e-04) → fields pass 1 (e-05)** (`p2-s5-s6-fields.mts`, meeting point B)

| run | log | result |
|---|---|---|
| CITY seeds 1 – 6 | `p2-seed1.log`, `p2-seeds2-6.log` | S5, S6 and pass 1 commit 6/6, with 54 – 61 S5c streets and 32 – 38 districts per seed. On the composed land (2 524 – 2 562 cells): every field's cuts give each band's share of the land within one cell (max error 0.29 – 0.88 cells), `from: 'shares'`, and `middle = 'comfortable'`. `kindsWithoutOffset` is empty, so every kind S6 typed has a `characterOffset` cell. The per-face list covers every live L1 face. `drivers([p]).sum` equals the stored unclamped value at 40 land cells per seed (error ≤ 1e-9). Sourced: plaza, market, mainStreet, gate, wall. Pass 1 run twice gives one digest. A second fresh composition gives the same pass-1 digest and L1 digest. Pass 1 given the driver state taken after S5 and before S6 (what S5d would read) equals pass 1 computed after S6, with 0 driver-raster cells differing |
| CITY seeds 1 – 4, `DRV=1` (S5d reading the driver-only field from the arena after S4) | `p2-drv1-4.log` | the same 4/4 clean. Outputs equal the ramp runs' outputs, because the stand-in demand never tops up (N-2) |
| small fixture seeds 1 – 4 | `p2-small1-4.log` | the same 4/4 clean (8 – 9 streets, 17 – 21 districts, 711 – 715 land cells) |

**P3 — the chain inside d-06's cross-host bundle** (`p3/g14-stages.ts`, `p3/run-p3.mts`, meeting point C). The probe
built a stage table with two stages: `s5` (the small fixture through c-05's `runS5`; model = L0 / L1 digests + ways,
records = S5d's results) and `fields` (carry → e-04's S6 → e-05's pass 1; model = `fieldsDigest` + L1, records = the
cuts and per-band cells). `crossHostFixtureFrom` loaded it with the scratch folder as root, and `runCrossHost` ran it
with legs `node-x64-rosetta` and `chromium`, workers off and on, seeds 1 – 2 (`p3.log`):

- `node-x64-rosetta workers off: ran [node v24.12.0, x64, native-x64, thread main]`;
- `workers on: ran […, thread worker] — agrees bit for bit`;
- all 8 leg cells equal the same table run in-process from source (tsx);
- chromium was blocked by the no-download rule (no Playwright cache here). That leg is a Mac step (N-3).

The bundle carries `@plat/tables`' data and the layout stages, with no file read from inside a leg.

**P4 — b-05's writer → c-05's reader** (`p4-cells.mts`, meeting point D). `writeCells` on the shipped `regimes.json`
set `blockDepthFloorM` of `ribbon` and `dense_core` to [95, 110] with provenance `M-1 2026-10-07`. The version went
1 → 2, two cells changed, and 0 other cells changed. The table round-trips through `tableText` → `parseTable` with the
version and value intact. Over a view holding the written table, c-05's `growthRules` reads the new minimum: the
clearance is ribbon 3 300 → 9 800 cm and dense_core 8 300 → 9 800 cm, equal to the hand computation from the cells in
both cases. A whole S5 on the small fixture with the written view commits, deterministically (×2 equal), and grows
fewer streets (9 → 3 and 8 → 4 on seeds 1 – 2) where the larger minimum binds. 0 issues.

**P5 — which band set S5d and the fields read** (`p5-bands-view.mts`; the evidence for N-1). With a run view whose
`bands.json` moves 0.1 of share from `comfortable` to `modest`, `fieldsCells(view).shares` follows the view. S5d's
provisional cuts are byte-identical to those of the shipped view (k1 – k3).

## Notes (not blockers)

- **N-1 (M0-c-05; for M0-c-06 / M0-x-04 and the hardening pass, KI under J202; vetoable).** S5d's band shares come
  from the shipped table (`capacity.ts:101`, `bandShares()` → `loadTable('bands')`). The fields read the run's
  `TableView` (`fieldsCells(tables)` → `tables.table('bands')`). With a run view carrying another band set, the two
  disagree (P5, CONFIRMED). S5d's provisional cuts keep the shipped shares while FieldBands' recorded cuts move. At M0
  every honest run uses the shipped tables: no M0 item writes `bands.json` (b-05 writes `granularity`, `regimes` and
  `cut`), and the roster's shares are M1's (C-0049). So the composed output is identical today, and it is not judged a
  blocker. When M1's roster shares or a view-carried band set arrive, S5d should read the run's view
  (`state.slice.site.tables`). The same `loadTable` pattern stands in about ten other layout sources.
- **N-2 (M0-c-05 / M0-c-06, informative).** Under C-0254 (10)'s stand-in demand, the band field cannot move S5d's
  decision: the demand is spread over the bands as the built land is, so the driver field and the ramp give identical
  top-ups (none on the fixture) and identical geometry (P1, P2 `DRV=1`). c-05's own N-11 already records this. With a
  per-band demand (P1, `DEMAND=1.3`), the driver field does move the per-stage shortfall (for example, k2 on seed 3:
  55.68 ha with the ramp, 61.01 ha with the driver field). The unwalled top-up's rim lands mostly in the low bands, so
  most of a per-band shortfall survives the one top-up and is reported, never restarted, as §5.2 states. M0-c-06's
  integrated run and M1's S2 demand should expect this.
- **N-3 (M0-d-06, PENDING-MAC).** The browser legs and the arm64 / Rosetta legs cannot run on this machine. They were
  blocked and named, never faked. On this x64 host the `node-x64-rosetta` leg stamps `kind: native-x64`, as C-0028
  says. P3's composed chain agreeing across workers on and off on the x64 leg is the evidence available here. The
  five-leg run of the spike city is M0-d-09's.
- **N-4 (M0-c-05, informative).** S5d's provisional cuts work at face granularity (C-0254 (9)). At k = 1 the two
  lowest bands (household shares 1.1 % each) receive 0 built land on every CITY seed (the first two cuts coincide),
  because one face's built land exceeds their targets. The fields' cell-level cuts on the composed land hold every band
  within one cell (P2). The provisional cuts are S5d's own and are not recorded.
- **N-5 (informative).** The composed run reproduces the g13 re-check's S6 notes on c-05's real secondaries: 0 – 2
  dropped gate seeds per seed (N-9), and some seeds without a `central` or `market` district on the small fixture or
  CITY seed 4. Pass 1 handles both (`kindsWithoutOffset` empty, the bar held).
