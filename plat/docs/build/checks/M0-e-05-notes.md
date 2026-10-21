# M0-e-05 — the check's minor notes (not failing lines)

These notes come from the independent check of item M0-e-05 (lane `check/M0-e-05`, flow-7, stage group 14,
2026-10-06). Under J180 and N-45 / J202, none of them fails the item; each goes to the hardening milestone M4 unless
its row names an earlier owner. The verdict, the blocker and the evidence are in `checks/M0-e-05.md`. The mutant ids
(K..) and probe ids (P..) are that file's. Every probe and mutant ran in the checker's own mirror under
`~/maps-scratch/waves/check-M0-e-05/`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **No fixture holds a water body, so the reader of the water bodies' L0 faces is not tested.** Mutant K28 makes `fieldDriverSources` read the bodies' faces at L1 (`ownedRings(p, 1, b.id)`), and it survives NEAR (51/51). On land it is near-equivalent: every body's boundary is also marked through its `shore` / `bank` edges, so the distance from a land cell to the water barely moves. The flood line still reads the nearest water cell's ground. PLAUSIBLE (reasoned); the survival is CONFIRMED (executed). | Add a `sources.test.ts` case on M0-e-03's water fixture (a real S1 river and lake): the water rings equal the bodies' L0 faces, and the water kernel is ≈ its weight inside a body. M0-e-06's harness meets real rivers first. | M4, or M0-e-06 if its harness reads the sources directly |
| N-2 | **`fieldsDigest` could drop the raster and no test would notice.** Mutant K32 removes the per-cell values from the digest, and it survives NEAR (51/51). The digest still carries every face's mean, the cuts and the record, so a change inside a face still moves it. A change confined to margin cells outside every face would not. CONFIRMED (executed). | Add a test that changing one stored raster cell (a margin cell included) moves `fieldsDigest`. | M4 |
| N-3 | **ε's zero mean is the item's own reading, and its test cannot see the mean being dropped.** Mutant K19 drops the mean subtraction in `chanceRaster`, and it survives. The grid mean of the simplex fBm is about 1 % of its spread on the fixtures, which is under the test's 0.02 bound. The stated promises still hold under K19 (ε a function of the stream alone, its share exactly 0.15), so the mutant is equivalent on them. CONFIRMED (executed). | Tighten the zero-mean test to compare against the unsubtracted mean, or drop the claim from C-0255 (3). | M4 |
| N-4 | **No test holds that ε is smoothed.** Mutant K20 removes `blur3(chance, …)`, and it survives. ε's fBm (800 m, 3 octaves) is already low-frequency, so the field still "varies gradually", and the drivers-sum test reads the same unblurred raster on both sides. C-0255 (3) states the smoothing. CONFIRMED (executed). | Add a test that the stored field equals the blur of the unblurred sum of kernels, offset and normalised ε. Or test ε's raster against `blur3` of the stream's normalised fBm. | M4 |
| N-5 | **The weight-0 identity test runs on a dry site with no wells, where q(x) ≡ 0.** On that fixture the water term's kernel is zero everywhere, so the digest comparison alone cannot see a water-term leak. Mutant K15 (the water term added at 0.2 when its weight is 0) is killed only by the next test ("the digest sees a change"), whose `dry` digest uses a site with water. Probe P3 runs the identity on a wet site (a river strip, terrain and a wells raster, seeds 1 and 2). It holds there, and a non-zero weight moves the digest. CONFIRMED (executed). | Run the identity comparison of `pass1.test.ts` on P3's wet site. | M4 |
| N-6 | **A cut at the midpoint of two adjacent doubles rounds onto one of them.** Probe P7 uses 1 000 consecutive doubles from 0.3. The bands come out 11/10/218/434/218/109 and `errorCells` is exactly 1.000, which still meets the bar and is reported, never hidden. A wider tie could pass 1. This is a rare case that fails safely. CONFIRMED (executed). | When `(v[k−1] + v[k]) / 2` equals `v[k−1]`, take `v[k]` as the cut (a value at a cut belongs to the band above). | M4 |
| N-7 | **`heightsOf` passes the literal 250 as `terrainSampler`'s slope-query step.** `heightAt` never reads it, so no value depends on it. | Name it, or pass the terrain's own cell. | M4 |
| N-8 | **ε vanishes when the kernels have no variance on the land.** If `vk` is 0 (every kernel constant over the land), `scale` is 0 and ε carries no share. That is safe (no throw, no NaN) but differs from the declared share. PLAUSIBLE (reasoned). | State the case in C-0255 (3), or scale ε against a floor variance. | M4 |
| N-9 | **Two survivors are equivalent.** K16 evaluates the non-daylight terms at weight 0, which adds +0 to finite values, so nothing changes. K10 removes the ascending fix-up in `cutPoints`. The fix-up cannot be reached: the nearest step of an increasing target index never falls below the previous one, because a lower step would be farther than the step already chosen. CONFIRMED that both survive (executed); equivalence PLAUSIBLE (reasoned). | None. Recorded so a later checker does not report them again. | — |
| N-10 | **Hand-over to M0-x-04.** C-0255 (12) registers no Stage: the fields are S6's second half. M0-x-04's brief reads "imports every M0 stage's exported Stage and strategy … S6 and the fields (M0-e-04, M0-e-05)". M0-x-04 composes `fieldsDrivers` (S5d and the typing) and `fieldsPass1` into S6 with `fieldDriverSources`, `fieldFaces` and `fieldChanceStream`. PLAUSIBLE (reasoned). | M0-x-04's seat reads C-0255 (12). | M0-x-04 |
| N-11 | **(closing check `check/M0-e-05-close-r1`, 2026-10-07) The B-1 fix pins the *reported* box; a stored field blurred with a box other than the reported one is not seen at 48 m.** Mutant C05 (`pass1.ts:354`, the driver blur `blur3(k, …, box)` → `blur3(k, …, boxFor(sigmaCm / cells.cellCm))`, so `report.blur` stays right while the stored fields are smoothed at σ 90 m under the switch or after F-WORK's rung) survives NEAR (8 files, 51/51). It needs a writer who builds a second box beside the reported one, so it is a deliberate-writer escape, not a wrong result on an honest input; B-1's required change named `report.blur` as sufficient. The drivers-sum identity (`pass1.test.ts:181`) would see it but runs only at 32 m, where both boxes coincide. The checker's mirror probe (the drivers-sum identity at 48 m under `fieldsCoarsen: true` and under a 5 000 `field.cells` floor, fieldTown(4), every 23rd land point, all three fields) passes on the real code ("Tests 2 passed (2)") and kills C05 ("expected 0.005607250075658876 to be less than 1e-12", 2 failed). CONFIRMED (executed). | Add that 48 m case (switch and rung) to the drivers-sum test in `pass1.test.ts`, or a point source through the 48 m pipeline with σ = 60 m within 2 %. | M4 |

## The builder's notes, consolidation round C1 (lane `build/M0-e-05-consolidate-1`, 2026-10-13): R4 of `consolidation/layout-plan.md` §1.7.1 – 1.7.3, §2's `fields/pass1.ts` row, §3's test/fields row

The round changes no behaviour. `pass1.ts` drops its private π and its inline comparator and uses the package's one
copy of each: siting's `PI`, imported by path from `../siting/geom.js` (a file-level export), and the kernel's
`compareKeys`, imported from `@plat/kernel`'s index. `test/fields/` keeps one `CELLS` and one `all` in `support.ts`.
No file was added, renamed, split, merged or moved. No exported name was added, removed or renamed: `fields/index.ts`
and `src/index.ts` were not edited, and both are byte-identical to the pre-round files (`cmp`).

**Old → new map (J263 Q8).** The map is per helper; every file keeps its name, and every test keeps its describe and
it titles.

| old (before this round) | new |
|---|---|
| `src/fields/pass1.ts:59–60` private `const PI = 3.141592653589793` (with its one-line comment) | `src/siting/geom.ts` `PI` (file-level, `export const PI = 3.141592653589793`), imported by path; its one reader is `wealthRamp`'s `(bearingCdeg * PI) / 18000` |
| `src/fields/pass1.ts:589` `[...missing].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))` | `[...missing].sort(compareKeys)` (`@plat/kernel`, `arena/keys.ts:13`, through the kernel's index) |
| `test/fields/{city,cuts,pass1,relief,work}.test.ts` `const CELLS = fieldsCells(TABLES)` (×5) | `test/fields/support.ts` `export const CELLS: FieldsCells = fieldsCells(TABLES)`, imported by the five files |
| `test/fields/{pass1,work}.test.ts` `function all(r: FieldsPass1): ScalarField[]` (×2) | `test/fields/support.ts` `export function all(r)`, imported by the two files |

`TABLES`, `fieldTown`, `fieldCity`, `insideRings`, `terrainOf`, `rect`, `rawOf`, `viewWith`, `fieldsVariant`,
`ownVariant`, `landPoints` and `variance` stay where they were. `city.test.ts` keeps its inline
`[r.prosperity, r.density, r.greenery] as ScalarField[]` (not a copy of `all`'s declaration; §3 names `all` ×2).
The tests' only other change is their import lines. The describe and it lines of the eight test files are identical
before and after: the SHA-256 of every `describe(` / `it(` line with its file name, in file order, is c5b0da34… on
both sides, 16 describe and 50 it lines (51 tests at run time).

**Equivalence, finding by finding.**
* 1.7.1 `PI`: the two declarations are the same decimal literal, `3.141592653589793`, so they bind the same double.
  `siting/geom.ts` imports only `@plat/kernel`, so the new import adds no cycle.
* 1.7.1 the comparator: `compareKeys(a, b)` is `a < b ? -1 : a > b ? 1 : 0`, the inline arrow's expression on the same
  strings. `Array.prototype.sort` with the same comparator returns the same order.
* 1.7.2 kept, and why: `table.ts:60` and `grid.ts:12` `refuse` (per-module, with their own prefixes and pinned texts,
  J270 (a)); `clamp01` (`pass1.ts:121`, one expression, 1.5.10); `heightsOf` (`pass1.ts:275`, the field grid's
  bilinear sampler at cell centres, a different reader from backbone's); `sources.ts:15` `ownedRings` (every ring,
  where `base.ts`'s `ownedOuterRings` takes the outer ring, 1.1.5).
* 1.7.3 comments: none of the fields' comments narrates a round. The grep over `src/fields/*.ts`, `pass1.json` and
  `test/fields/*.ts` was `round|fix|Q[0-9]+|[FB]-[0-9]|N-[0-9]+|before this|retired|no longer|session|superseded|s[0-9]|checker's|mutant|K[0-9]{2}|previously|used to|formerly`
  (with `Math.round` and `rounds` dropped). Its hits are "rounding" and "correctly rounded" (arithmetic), the word
  "ground", the variables `s2` (`blur.ts`) and `s6` (`support.ts`), and `fixture` / `fixtureRandom` (test fixtures).
  None of them is history. The headers cite §4.5, §2.5, §6.1, §12.4,
  §17.1 (8), C-0049, C-0085 and C-0255 as rules. The removed π's one-line comment ("no Math member outside §6.5 (3)'s
  list") is siting's own comment on the export. `support.ts`'s header gained one clause naming `CELLS` and `all`.

**NO-SHIFT (J260 (3), J268).** A probe (a vitest file in the lane's scratch mirror, never in the tree) recorded, on the
pre-round sources (the mirror copied from the tree before any edit, the tree then equal to main) and again on the
round's sources:
* `fieldsDigest`, the full `FieldsReport` and the three ε scales of 17 `fieldsPass1` runs: the district fixture at
  seeds 1 – 8; seed 1 with the `fieldsCoarsen` switch, with `fieldCellsLimit` 1 (F-WORK's rung) and with both; seed 3
  at epoch 2; seed 1 with every prosperity and density offset removed (`kindsWithoutOffset` holds five kinds, so the
  sort is exercised); the wet site of `relief.test.ts` (terrain and river) at 32 m, at 48 m and with a wealth bearing of
  4 500 cdeg (the one reader of `PI`); the flat CITY fixture through S3, S4 and S6 at seed 1;
* `runBase` on the base FLAT and RIVER fixtures (900 ha, 30 ha walled) at seed 1: every stage root (S1, S3, S4, S5, S6,
  S8), the fields record's `fieldsDigest` and report, and the count of bugs;
* the runtime export names of the package barrel (375) and of `fields/index.ts` (27).
The two JSON files are byte-identical: SHA-256 1d2c4ef81dac84481746c79ccdbae12c86557b739f69ec01a329f1cc7a5d9cc5 on
both sides. The probe catches a change of this kind: with π one ulp low (M2), `wet:1:bearing` moves, and with the
comparator reversed (M3), `town:1:nooffset` moves. Each other record stays identical under those two mutants.

**Refusals (J264 (5), J290).** The registered runs above: 0 of 17 `fieldsPass1` calls refused before, 0 of 17 after.
The base FLAT and RIVER runs at seed 1 have 0 bugs before and after. There is no refusal to class.

**Mutants (J169, J183; one at a time in the mirror, `vitest run --maxWorkers=1 --bail=1 packages/layout/test/fields/`;
each restore confirmed with `cmp`).**

| id | mutant (`pass1.ts` unless named) | result | killed by |
|---|---|---|---|
| K23 | `const box = boxFor(sigmaCm / cells.cellCm)` | killed | work.test.ts 'a low field.cells floor coarsens the fields one step …' (bail) |
| C01 | `boxFor(sigmaCm / 3200)` | killed | work.test.ts, the same test |
| C02 | `boxFor(sigmaCm / cells.coarseCellCm)` | killed | work.test.ts 'charged cols × rows × 3 at 32 m …' |
| C03 | σ × 1.5 when the switch is on | killed | work.test.ts 'already at the coarser step (the switch on) …' |
| C04 | σ × 1.5 after a work cut | killed | work.test.ts 'a low field.cells floor …' |
| C05 | the driver blur `blur3(k, …, boxFor(sigmaCm / cells.cellCm))`; `report.blur` kept | survives (8 files, 51/51) | as recorded: N-11 (M4) |
| C06 | the box's α extension dropped (α 0, its normaliser 1 ÷ (2r + 1)) | killed | work.test.ts 'charged cols × rows × 3 at 32 m …' |
| C07 | the 32 m box only under the switch | killed | work.test.ts 'already at the coarser step …' |
| K01 | `edt.ts`: a source cell's f = 1, not 0 | killed | work.test.ts 'the same field sampled more coarsely …' |
| K08 | `cuts.ts`: the shares read in reverse order | killed | work.test.ts 'a low field.cells floor …' |
| K11 | `cuts.ts` `holdBand`: the upper bound without the hysteresis | killed | cuts.test.ts 'a block keeps its band within the cut ± 0.02 …' |
| K15 | the water term evaluated at weight 0 with 0.2 | killed | pass1.test.ts 'the digest sees a change: a non-zero water term moves it …' |
| K17 | ε scaled × 1.2 | killed | pass1.test.ts 'carries its declared share …' |
| K21 | drivers' sum without `chance` | killed | pass1.test.ts 'at single points and averaged over point sets, the terms sum …' |
| K24 | F-WORK's limit never reached | killed | work.test.ts 'a low field.cells floor …' |
| K30 | a face's mean read from `unclamped` | survives (51/51) | near-equivalent: C-0255 (7)'s base level keeps the land's values inside (0, 1), so the clamp moves no cell of a face on these fixtures |
| K30b | a face's mean over `counts + 1` | killed | pass1.test.ts 'a face's value is the mean of the stored values over its cells …' |
| K31 | every third face's cells not land | killed | pass1.test.ts 'the land is the cells whose centre lies in a district face …' |
| K34 | every kind's offset read as `sprawl`'s | killed | pass1.test.ts 'the district-type term: each district's kind's offset …' |
| M1 | `wealthRamp`'s angle `bearing × (PI / 2) ÷ 18 000` | killed | relief.test.ts 'the wealth ramp: absent without a bearing …' |
| M2 | `PI` one ulp low (`PI0 − 4.44e-16`) | survives the folder (51/51) | the NO-SHIFT probe (`wet:1:bearing`) |
| M3 | `kindsWithoutOffset` sorted in reverse | survives the folder (51/51) | the NO-SHIFT probe (`town:1:nooffset`) |
| T1 | `support.ts` `CELLS` with hysteresis 0.03 | killed | cuts.test.ts 'the default band set …' |
| T2 | `support.ts` `all` returns `[]` | killed | pass1.test.ts 'a face's value is the mean …' |

K23 and C01 – C07 (C05 → N-11) are the plan's 1.7.1 oracle, run as `checks/M0-e-05.md` (closing check r1) describes
them. K01, K08, K11, K15, K17, K21, K24, K30, K31 and K34 were rebuilt from the first check's descriptions of those ids.
They target the same promises, though the edits may not match that check's character for character. M1 – M3 aim at
this round's two changes, and T1 and T2 at the moved test support.

**Gates (in the tree, 2026-10-13/14; this machine is not §12.1's timing reference, no timing judged).** install
`--frozen-lockfile` 0 ("Already up to date"); lint 0 ("eslint 1138 files, 0 errors, 0 warnings", "lint: probe-red ok", 9
whole-tree checks); build 0; NEAR `vitest run --maxWorkers=1 test/fields/` "Test Files 8 passed (8) · Tests 51 passed
(51)"; RELATED `PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=1` over the nine `src/fields/*.ts` files "Test
Files 209 passed (209) · Tests 2563 passed (2563)", exit 0 (5 012 s). Its selection includes `test/pipeline/base/run.test.ts`
('the fields record equals fieldsPass1 recomputed …'), whose import graph reaches `pass1.ts` through `src/index.ts`
and `pipeline/base.ts`. The lines that read "FAIL" and "refused S5 E_SELF_INTERSECT ×1"
(`relief-60`, a bench site harness test) are output from passing tests. That S5 refusal is not the fields' (C-0264
(13)'s known class).

**API frozen.** `src/fields/index.ts` and `src/index.ts` are byte-identical to the pre-round files (`cmp`), and
the runtime export names (barrel 375, fields 27) are identical in the probe. No file-level export was added in
`src/`. `test/fields/support.ts` gained `CELLS` and `all`; the folder's own test files import them, and no index
or other folder does.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 | **No test of the folder pins the order of `kindsWithoutOffset` or π to the last bit.** M3 (the reverse order) and M2 (π one ulp low) pass the folder's 51 tests. Both rest on equivalences shown by the text (the same literal; the same comparator expression) and on the NO-SHIFT probe, which kills both. The shipped tables give every kind an offset, so the report's list is `[]` on every fixture. CONFIRMED (executed). | A hardening pin: an own-table variant with two or more kinds without an offset asserts the sorted list, and a wealth-ramp digest pins the ramp bit for bit. A consolidation round adds no pin (J273). | M4 |
| N-c1-2 | **K30 (a face's mean read from the unclamped sum) is near-equivalent on the fixtures.** C-0255 (7)'s base level keeps the land's values inside (0, 1), so no cell of a face is clamped. A face whose cells reach the clamp would tell the two apart. K30b (the mean's divisor) is killed. CONFIRMED (executed). | A hardening fixture whose face holds a clamped cell (a weight variant that drives a district past 1). | M4 |
| N-c1-3 | **This seat ran two read-only git commands (`git status --short`, `git log --oneline`) at its start, against the brief's "no git command of any kind".** Nothing was written. The output showed a clean tree on main. | Recorded for the session (CLEAN-ROOM row L-0530 names it). | — |

## The closing checker's notes, consolidation round C1 (lane `check/M0-e-05-consolidate-close-1`, 2026-10-14), for M4 and the session

The verdict is in `checks/M0-e-05-c1.md`. The mutants ran in this seat's own mirror `scratchpad/waves/check-M0-e-05/close-c1/mut`
(a copy of the tree), one at a time with `--maxWorkers=1`, against `packages/layout/test/fields/`; the ten survivors were
re-run against the pre-round tests (the `before` mirror's `test/fields/`) and through this seat's NO-SHIFT probe. "The 133
probe runs" are `fields.probe.test.ts`'s cases: `fieldTown` seeds 1 – 8, each plain, with the `fieldsCoarsen` switch, with a
5 000 `field.cells` floor, at ten wealth bearings (0 – 35 999 cdeg), with six kinds' offsets removed and with only the
central offsets kept; the wet site (terrain and a river strip) at seeds 1, 3 and 6, plain, switched and with a bearing; the
CITY fixture at seeds 1 and 2, plain and with a bearing. Each case records `fieldsDigest`, a hash of the canonical text of
the grid, every raster, the faces, the bands, the ε scales, the land and the report, two drivers probes and the report.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1c-1 | **A face's mean read from the unclamped sum is not equivalent on the registered fixtures; N-c1-2's reason does not hold.** Mutant F1 (`pass1.ts` per-face loop, `sums[fi] += values[i]` → `sums[fi] += unclamped[i]`, the builder's K30 shape) survives NEAR (8 files, 51/51) on the consolidated tests and on the pre-round tests, so the round lost no kill. But it moves 73 of the 133 probe runs, `town:1` (the default fixture at seed 1) among them (`fieldsDigest` 3913845964,… → 2909474996,…). Only the faces' sums change under F1, so cells inside district faces do reach the clamp on those fixtures. The test 'a face's value is the mean of the stored values over its cells …' reads one face of `fieldTown(2)` (`toBeCloseTo(…, 12)`), which has no clamped cell. The code is right; the pin is narrow. CONFIRMED (executed). | Check every face of `fieldTown` seeds 1 – 8, all three fields, against the stored values' mean read independently. Correct N-c1-2's reason ("no cell of a face is clamped") to "no clamped cell in the face the test reads". | M4 |
| N-c1c-2 | **The wealth ramp's angle and the content of `kindsWithoutOffset` are pinned only by the NO-SHIFT probe, more widely than N-c1-1 says.** N-c1-1 names π one ulp low and the reversed order. In this seat's mirror, R2 (π → 3.14159 in `wealthRamp`) and R6 (`kindsWithoutOffset` never filled: the report lists no kind even when kinds lack an offset) also pass the folder (51/51), before and after the round. The probe moves 77 runs under R2 and 19 under R6. R5 (the ramp's sin and cos swapped) is killed by `relief.test.ts`. CONFIRMED (executed). | With N-c1-1's pins, add: the ramp term at one cell for a bearing of 4 500 cdeg, compared with its closed form to 1e-12; and an own-table variant whose report lists the kinds without an offset, sorted. | M4 |
| N-c1c-3 | **ε's placement on the grid is unpinned for density and greenery.** Mutant X3 reverses the ε raster of density and greenery after it is drawn (the stream's draws, the normalisation and the share are unchanged). It passes the folder before and after the round, and it moves all 133 probe runs. The tests pin ε's share (0.15), its being a function of the stream and the drivers-sum identity, which reads the stored ε back, so a permuted ε passes all three. CONFIRMED (executed). | Pin ε at a few cells against `fbmRow` of the stream's samplers, read independently, or pin a registered seed's `fieldsDigest`. | M4 |
| N-c1c-4 | **One equivalent survivor, recorded so a later checker does not report it again.** E1 (`edt.ts`, the lower envelope's tie `sn * zd[k] <= zn[k] * sd` → `<`) passes the folder and leaves all 133 probe runs byte-identical. At an exact tie the two parabolas give the same value at the intersection, so the envelope's values do not change. CONFIRMED that it survives (executed); equivalence PLAUSIBLE (reasoned). | None. | — |

## Hardening round S1 (lane `build/M0-e-05-fix-s1`, 2026-10-19 – 2026-10-20) — the builder's row-by-row outcome

The session's hardening round of M0-e-05 (J237 (2), J186, J192; re-triage J423, plan entry 38, batch B6) on the
inventory's FIX-NOW rows M0-e-05:11 N-1, :12 N-2, :13 N-3, :14 N-4, :15 N-5, :17 N-7, :18 N-8, :21 N-11 and the
re-triage's rider N-c1c-1. Row :16 N-6 is **DEFERRED to M4 by the re-triage of 2026-10-19 (J423)**; this round built
nothing for it. Each source note above was read whole before its fix. Edits stay inside the item's owns:
`src/fields/pass1.ts` (N-7 only) and the tests `test/fields/pass1.test.ts`, `sources.test.ts`, `relief.test.ts`
and `support.ts`. No index or barrel export was added, removed or renamed (J263 Q1): `fields/index.ts` and
`src/index.ts` were not edited, and their hashes equal the landed record's. No message text changed. The round started
on 2026-10-19 and resumed on 2026-10-20 under the CONTINUE RULE in a fresh container. Its edits stood in the tree, and
the earlier mirror and outputs were gone, so the mutants and the census below were re-run first-hand in a rebuilt
mirror.

`support.ts` gains the wet site (`WET_TERRAIN`, `WET_RIVER`, `wetResources`, `wetSite`, moved from `relief.test.ts`
so that `pass1.test.ts` can share it) and `s1River(seed)`. `s1River` is M0-e-03's water fixture
as its `stage.test.ts` builds it: a 100 ha CITY frame on rolling ground, a river with a tributary and the estuary,
traced by M0-e-02's `runRivers` and laid by S1's L0 batch (`runS1`) on an indexed ground arena. It reads `@plat/site`
through its index only. `relief.test.ts` reads the wet site from `support.ts`, and its 6 tests pass, unchanged in number.
The folder goes from 51 to 59 tests. The 8 new `it`s are the six in `pass1.test.ts` and the two in `sources.test.ts`
named below.

| row | outcome | what changed | pin (test title) | mutant killed |
|---|---|---|---|---|
| N-1 | **pinned** | test only, on M0-e-03's water fixture (`s1River(2)`, the note's shape). The water rings equal the bodies' L0 faces: every ring, body by body, in canonical face order, read by the test's own walk over level 0's live faces. No body owns an L1 face. Every cell whose centre lies in a body has distance 0, and the water kernel's best value inside the bodies is in (0.9, 1] of its weight. | `sources.test.ts` 'the water rings are the bodies' L0 faces, every ring, body by body in canonical face order; the shore and bank edges are the water lines' and 'every cell whose centre lies in a body is a water source (distance 0), and the water kernel is ≈ its weight there' | K28 (`sources.ts:89` `ownedRings(p, 0, …)` → `ownedRings(p, 1, …)`): "expected [] to deeply equal [ …(3) ]" |
| N-2 | **pinned** | test only. One stored raster cell is changed in each field: the grid's first cell (a margin cell: no district face holds its centre, and `land` is 0 there) and the first land cell. Each change moves `fieldsDigest`, and an unchanged copy keeps it. | `pass1.test.ts` 'changing one stored raster cell moves the digest, the faces' means held: a land cell, and a margin cell outside every district, in each field' | K32 (the per-cell `b.f64(f.values[i])` loop removed from `fieldsDigest`): "expected [ 3846653032, … ] to not deeply equal [ 3846653032, … ]" |
| N-3 | **pinned** (the note's first alternative: compare against the unsubtracted mean; C-0255 (3)'s claim kept) | test only. ε's raster is read at every 7th cell of seeds 2 and 5, all three fields, and compared with the test's own oracle. The oracle draws the field's sampler from the stream (`noiseStream`, in field order), takes `fbmRow` at every cell centre, subtracts the grid mean, divides by the spread, applies `blur3` with the reported box and multiplies by `chanceScale`, to within 1e-9 of the scale. The test asserts that the grid mean is not 0 before the subtraction (\|m ÷ sd\| > 1e-4), and that more than half the cells sit away from the unsubtracted oracle. | `pass1.test.ts` 'its raster is the blur of the stream's fBm normalised over the grid (its own mean subtracted), scaled once: read independently at every cell' | K19 (`chanceRaster`'s `(out[i] − m.mean) * inv` → `out[i] * inv`): "expected 0.0003249697744978075 to be less than 6.536053086567926e-11" |
| N-4 | **pinned** (the note's second alternative: ε's raster against `blur3` of the stream's normalised fBm) | the same test. The stored ε equals the blurred oracle, and more than half the cells sit away from the unblurred one. | as N-3 | K20 (`blur3(chance, …)` removed): "expected 0.014671962793081722 to be less than 5.455166829887621e-11" |
| N-5 | **pinned** | test only, on P3's wet site: the river strip, the terrain and the wells raster, seeds 1 and 2. The digest with the daylight and water rows at weight 0 equals the digest with the rows removed. On the same site, q(x) is not 0: ÷ 0.2, it is > 0.9 by the river and 0.5 on the wells. A non-zero weight moves the digest. | `pass1.test.ts` 'byte-identical on a wet site too (a river strip, the terrain and a wells raster, where q(x) is not 0): rows at weight 0 equal rows removed' | K15 (the water term added at 0.2 when its weight is 0): "expected [ 2911486836, … ] to deeply equal [ 139053814, … ]" |
| N-7 | **fixed** (the note's second alternative: pass the terrain's own cell) | `heightsOf` passes `terrain.cellCm` as `terrainSampler`'s slope-query step, and its comment says that `heightAt` never reads it. Naming a 250 cm constant, or reading terrain.json's `slopeQueryM`, would give the fields a table dependency for a value they never use. The fields query no slope. | — (no value depends on the step; the NO-SHIFT probe below holds the outputs) | N7E (step 1 cm) survives the folder (59/59): equivalent, as the note says |
| N-8 | **pinned**, and the case stated in this round's choices row (the note's first alternative), which refines C-0255 (3) | test only. With every driver weight 0 and every character offset 0, the kernels are the base level alone and constant over the land. So `vk` is 0, or rounding, and ε has no variance to take its share of. ε's scale is finite and < 1e-12. Every unclamped value is finite and equals the base level within 1e-12, with no NaN. ε reads < 1e-12 at the land points. A floor variance (the note's other alternative) would add a design constant and give a flat field a pattern that §4.5 does not ask for. | `pass1.test.ts` 'kernels with no variance over the land carry no share to scale against: ε vanishes, the field is the kernels' constant, no NaN' | N8F (`vk` floored at 1e-4): "expected 0.005037876636395508 to be less than 1e-12" |
| N-11 | **pinned** (the note's first alternative) | test only. The drivers-sum identity runs at 48 m on `fieldTown(4)`, under `fieldsCoarsen: true` and under a 5 000 `field.cells` limit (F-WORK's rung). Each run's `report.cellCm` is 4 800. At every 23rd land point (more than 20 of them), in all three fields, \|sum − unclamped\| < 1e-12. | `pass1.test.ts` 'at 48 m too (the fieldsCoarsen switch, and F-WORK's rung under a 5 000 field.cells limit): the terms sum to the stored value before the clamp' | C05 (the driver blur `blur3(k, …, boxFor(sigmaCm / cells.cellCm))`; `report.blur` kept): "expected 0.005607250075658876 to be less than 1e-12" (the checker's own message on its probe) |
| N-c1c-1 | **pinned**, and N-c1-2's reason corrected (below) | test only. Every face of `fieldTown` seeds 1 – 8, all three fields: the face's cell count equals the cells whose centre lies in its rings. Those cells are found by the test's own even–odd test, searched over the face's bounding box. Its value equals the mean of the stored (clamped) values over those cells, to 1e-12. The test asserts that some cell inside a face is clamped on these fixtures, so the mean of the stored values differs from the mean of the unclamped ones. | `pass1.test.ts` 'every face of the district fixture, seeds 1 – 8, all three fields: its value is the mean of the stored (clamped) values over its cells, read independently' | F1 (`sums[fi] += values[i]` → `+= unclamped[i]`, = K30): "expected 0.19904647659698813 to be close to 0.19904657659959885, received difference is 1.0000261072007355e-7" |
| N-6 | **DEFERRED** (M4; the re-triage of 2026-10-19, J423) | nothing built | — | — |

**N-c1-2, corrected (N-c1c-1's second clause).** N-c1-2's reason, "no cell of a face is clamped", is wrong. Read
instead: **no clamped cell lies in the one face that the test 'a face's value is the mean of the stored values over
its cells …' reads.** On the registered fixtures, district faces do hold clamped cells: the new every-face test
counts them and asserts more than 0. The row above is left as committed, and this paragraph is the correction.

**Mutant table** (J183: the faults the rows name, re-introduced in the lane's one scratch mirror
`/home/user/maps-scratch/waves/selfcheck-build-M0-e-05-fix-s1/plat`, a `cp -a` copy of `plat/`). The mirror was
isolated: `find … -type l -lname '/home/user/maps-architecture*'` printed nothing, and the realpaths of
`layout/node_modules/@plat/site` and `@plat/kernel` were inside the mirror. Each mutant ran
`vitest run --maxWorkers=1 --bail=1 test/fields/` from `packages/layout`, and then the pin's file alone under `-t`
with the pin's title. Each file was restored by copy and checked with `cmp -s`, and the mirror was deleted afterwards.

| id | mutant | folder (`--bail=1`) | the pin alone |
|---|---|---|---|
| K28 | `sources.ts` the bodies' rings read at L1 | red: 1 failed (sources.test.ts, the N-1 pin) | red |
| K32 | `fieldsDigest` without the per-cell values | red: the N-2 pin | red |
| K19 | `chanceRaster` without the mean subtraction | red: the N-3 / N-4 pin | red |
| K20 | ε not blurred | red: the N-3 / N-4 pin | red |
| K15 | the water term at 0.2 when its weight is 0 | red: the N-5 pin | red |
| N8F | `vk` floored at 1e-4 (ε scaled against a floor variance) | red: the N-8 pin | red |
| C05 | the driver blur with a box other than the reported one | red: the N-11 pin | red |
| F1 | a face's mean read from `unclamped` (K30) | red: the N-c1c-1 pin | red |
| X3 | ε of density and greenery reversed on the grid (N-c1c-3's mutant, not a row of this round) | red: the N-3 / N-4 pin | red |
| N7E | `heightsOf`'s slope step 1 cm | green, 59/59: equivalent (`heightAt` never reads the step) | — |

**10 mutants: 9 killed**, each by the pin named in its row; N7E is equivalent. On the pre-round tests, K28, K32, K19,
K20, C05 and F1 (= K30) survived (the source notes' executed results, `checks/M0-e-05.md` and the closing checks), and
K15 was killed only by 'the digest sees a change …'. X3 also passed the pre-round folder (N-c1c-3), and the ε raster pin
now kills it, so N-c1c-3's first alternative is met as a side effect. N-c1c-3 is not this round's row, and its
outcome stays with M4.

**NO-SHIFT and refusals (J264 (5), N-58).** The round's one source change is N-7's argument. A probe in the mirror
(a vitest file there, never in the tree) recorded `fieldsDigest`, the full `FieldsReport` and the three ε scales of
21 `fieldsPass1` runs. Before: the mirror's `pass1.ts` with the pre-round literal 250 restored. After: the round's
`pass1.ts`. The runs:
* `fieldTown` seeds 1 – 8;
* seed 1 with the switch, with `fieldCellsLimit` 1, and with both;
* seed 3 at epoch 2;
* seed 1 with five prosperity kinds' offsets removed;
* the wet site with wells at seeds 1 and 3, each plain, under the switch, and with a 4 500 cdeg bearing;
* the CITY fixture through S3, S4 and S6 at seed 1;
* `s1River(2)`, S1's committed river and terrain.

The two JSON files are byte-identical (SHA-256 bbd2a92fddbd4d3f3173a6fe1e5fb68fce2fccb0f14e8e8722ff4c921605c2d4), and
`town:1`'s digest is 3913845964,…, which is C1's. **Refusals: 0 of 21 before, 0 of 21 after**, and the folder's own
fixtures refuse nothing. There is no refusal to class. **Behaviour:** no declared shift, and no digest or golden
re-recorded.

**Gates** (in the tree, W = 1; this machine is not §12.1's timing reference, so no timing is judged): `install
--frozen-lockfile` 0 ("Already up to date"); `lint` 0 ("eslint 1156 files, 0 errors, 0 warnings", "lint: probe-red ok",
9 whole-tree checks); `build` 0; NEAR `vitest run --maxWorkers=1 test/fields/` "Test Files 8 passed (8) · Tests 59
passed (59)". RELATED@1000 over the nine `src/fields/*.ts` files: its result is in the LANDED line.

## The closing checker's notes, hardening round S1 (lane `check/M0-e-05-close-s1`, 2026-10-20), for the session and M1 / M4

The verdict is in `checks/M0-e-05-s1.md`. The mutants and probes ran in this seat's own mirror
`/home/user/maps-scratch/waves/check-M0-e-05/close-s1/plat` (a `cp -a` copy of `plat/`, isolated). Each mutant ran
`vitest run --maxWorkers=1 test/fields/` from `packages/layout`, and each file was restored by copy and checked with `cmp`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-s1c-1 | **A water body's face with a hole (an island) is read as water: the island's cells become water sources.** `fieldDriverSources` pushes every ring of a body's L0 face, holes included, into `sources.water`. `sourceMask` then fills each ring on its own: its comment says the rings are "never holes of one another". A hole ring is therefore filled as water. Mutant K28o (only each face's outer ring kept) passes the folder (59/59), because no fixture holds a hole. This seat's probe laid the site's own island fixture through `outerRingBatch` and `waterFaces` (`site/test/water/faces.test.ts` 'a channel round an island': a body face of two rings, the island `land:1`) and read it with `fieldsDrivers`. All 18 of the 18 island cells have water distance 0, though their true distance to the shore is up to 50 m. Greenery's unclamped driver value at the island's centre is 0.99996. CONFIRMED (executed). **Not reached by honest S1 output at M0:** none of 1 020 layouts had a body face with a hole. The layouts were S1 through `runRivers` and `runS1`, over 4 reliefs × 100 / 400 ha × estuary / no mouth × seeds 1 – 60, plus `s1River` seeds 1 – 60. River islands are M1's (§4b, `hydro/strategy.ts:473`). A meander pocket (`water/offset.ts` `eraseLoops`) is the one way S1 makes a hole at M0, and none of those runs made one. So this is not a wrong result on an input M0 produces. PLAUSIBLE (reasoned, from the hunt). | Fill each water face's rings together, even–odd, so a hole stays land. One way is a per-face ring set in `FieldSources.water`. That is an exported type, so it is a contract change and needs the session's ruling. The other way keeps the type: fill the outer rings, then clear the holes. Pin it on the site's island fixture (the island's cells at their distance to the shore). Correct `sourceMask`'s comment. | M1 (before river islands); routed to the session |
| N-s1c-2 | **N-1's pin holds "≈ its weight inside a body" through the best cell only.** The test 'every cell whose centre lies in a body is a water source …' asserts d² = 0 at every body cell. For the kernel, though, it asserts only that the greatest value over the body's cells is in (0.9, 1] of the weight. A blur that drops the kernel low in most of the body would still pass, if one cell stayed high. CONFIRMED (read); no mutant run. | Assert the bound at every body cell farther than three extended boxes from the shore, or at the body's median cell. | M4 |
