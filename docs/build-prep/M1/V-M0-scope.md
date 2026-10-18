# V-M0 scope — the village's tracker spike

*Lane filler/v-m0-scope, 2026-10-05. Implementer-side, clean room. This is an extract of what V07 §8 already says V-M0 contains. It adds no design (J156): where it and the design differ, the design governs. Line numbers are `docs/volumes/V07-village.md`'s working copy as of 2026-10-05, 1-based.*

## Clean-room basis and what was read

CLEAN_ROOM (`workflows/23-build-m0-waves.js:74`) lets an implementer-side seat read "the design volumes a milestone builds". `docs/volumes/INDEX.md:79` and `:100`, and `docs/ARCHITECTURE.md:21528`, name V07 as the volume V-M0 builds, so this seat read V07. These parts were read: §3.0 (1084–1155), §3.3 (1324–1361), §3.4 (1364–1446), §3.5 (1448–1565), §3.8 (1769–1861), §3.15 (2823–2872), §6's VILLAGE split and confirming measurement (3584–3631), the W67–W69 rows (278–280), and §8 whole (3754–3852). §2.2 and §2.2a were located (398, 516) but not read row by row. From `plat/`, the working copy only (there is no git in this lane): `docs/build/M0.md` (the M0-b-05 lines), the `M0-b-05`, `M0-b-05a`, `M0-b-05b` and `afterM1Needs` entries of `docs/build/M0-work.json`, the `bendMode` and `flattenM` rows of `packages/tables/data/cut.json`, and a listing of `docs/build/landed/` and `docs/build/summaries/`. `docs/ARCHITECTURE.md` §16's M0 row (21511) and V-M0 row (21528) were also read. No forbidden path was opened.

## Placement (from the design)

V-M0 runs **right after M0, beside M1**. It runs on M0's kernel, on **M0 (b)'s tables** and on its own fixtures (synthetic flat, river and coast sites, with its own frontage slotting), and it takes **no M2b input** (V07:3756–3758; INDEX:100; ARCHITECTURE:21528). The estimate is 1.25–1.75 pw (V07:3765).

## What "M0-b-05a/b's final tables" are

The source is `plat/docs/build/M0-work.json` (working copy):

* **M0-b-05a** (AFTER-M-1 (a), a run item) owns `packages/tables/data/granularity.json` and `regimes.json`. Its run writes M-1's re-fitted plot-depth rows and regime block-depth minimums into them as cells with provenance 'M-1 ⟨date⟩', as a table-version bump.
* **M0-b-05b** (AFTER-M-1 (b), a run item) owns `packages/tables/data/cut.json`. Its run calibrates `cut.flattenM` against NG's recorded shapes and writes the result as a table-version bump of `cut.json`.
* **State on 2026-10-05:** neither item has a summary under `docs/build/summaries/` or a record under `docs/build/landed/`. Both depend on M0-x-01 and on M-1's files, so the cells above (`cut.flattenM` 0.7 `own` in the working copy; the depth rows) are **not final**.

These three tables are the bent cut's (§16 M0 (b)). V-M0's core pipeline (VS2 to VS4 and the slot race) reads none of them: toft depths and frontages come from `village.json`'s own cells (V07:1789–1793). They enter V-M0 by only two routes: risk (1)'s fallback, which registers S8's `BentCutFabric`, and the `VG` preset entry on `cut.bendMode`.

## Items

**Waits** has three values:
* **yes**: the item writes or judges on one of those tables, so it cannot close before the named run lands.
* **conditional**: it waits only if risk (1)'s fallback fires.
* **no**: neither applies.

### Contents

| id | item | source lines | waits for M0-b-05a/b |
|---|---|---|---|
| V-M0-01 | VS2, the density raster: the 4 m box around the heart at the VILLAGE target, every term a `density` cell (§3.3), and the bands that VS3, VS4 and the race read. Without item 111's water pull and climate term (1339, 1347), which are V-M1's (3766: "VS2 with item 111's water pull"). V-M0's raster is the pre-item-111 raster that 1354 describes (`w_water` 0, `c_sun` 1) | 3765; 1324–1361 less 1339 and 1347; 1354 | no |
| V-M0-02 | VS3, the palisade before the roads (§3.4): step 1 lattice, step 2 hull and flattening, step 3 smoothing, step 4 the defensible pull, and step 7 a planned trace that VS4 commits. Without step 5's barrier closure and step 6's graded stretches (item 106), which are V-M1's (3766: "the palisade's barrier closure and graded stretches (item 106)"), and without step 8's condition, patch and recovery rows (item 114), which are V-M2's (3767). Risk (6)'s pre-decided fallback (3818–3822) names `VG`'s water cut as what V-M1 ships if the base's barrier closure has not landed; it is a V-M1 fallback, not V-M0 content | 3765; 1364–1380 (steps 1–4); 1419–1425 (step 7); 1445–1446 (failure routing: F-V-PAL and F-V-GATE; not F-V-ANCHOR, step 5's); excluded: 1381–1407 (step 5), 1408–1418 (step 6), 1426–1443 (step 8) | no |
| V-M0-03 | VS4, the tracker-steered network: the step rules, the seeding order, the plan forms, the finish and the empty-road prune, output as one L1 batch with the palisade (§3.5). Without the router's rung gate (1535–1542), which is V-M1's by 3766 once the base's item 110 lands, and without the raised-way clauses that read §3.5a (1472, 1484, 1487, 1527), 1494's `trace` term (item 113's, §3.12a) and 1563's pier head (§3.10a (3), item 110's), which are V-M3's by 3769; V-M0's VS4 lays plain piers and `trace` is 0 | 3765; 1448–1565 less 1535–1542, the raised-way clauses at 1472, 1484, 1487 and 1527, 1494's `trace` term and 1563's pier head | no |
| V-M0-04 | The slot race (S10b) on the spike's own frontage slotting: keys `−ln(u)/max(10⁻⁶, density^p·m)` with `p` = `race.densityPower` (1) and `h` = 1 on the spike (1822's `else 1`; `refound.foundationSlot` is item 113's, V-M3's by 3769), giving the exact count of dwellings | 3765; 3758; 1807–1825 less 1821–1823's `h_i` clause | no |
| V-M0-05 | The spike's own fixtures: synthetic flat, river and coast sites at the VILLAGE target, headless, with no M2b input | 3758; 3765 | no |
| V-M0-06 | `village.json` whole: its three rung rows, every column of §2.2 and §2.2a (registry row 61) | 3765; 3800; §2.2 at 398, §2.2a at 516 | no |
| V-M0-07 | The register entries for `village.json`. First the named `cal.village.*.rules.race.densityPower@VG` (method `tune`, due V-M4), then `plat calibrate register --defaults --milestone V-M0` for every other calibratable column, all in the landing change (W69) | 3765; 3779–3800; 2864–2872; 280 | no |
| V-M0-08 | The `VG` preset file (item 377), part 1: V07's `VG` column and switches (§2.2, §2.2a, §3.15's lists). No `village.json` column is `presetsRequired` | 3765; 2825–2852 | no |
| V-M0-09 | The `VG` preset file, part 2: V11's five `presets.VG` entries (`siting.web.bulkyWater`, `.perishableShort`, `.orientEnabled`, `.splitEnabled`, `terrace.enabled`), written by V11 §2.2's rule | 3765; 2835–2837; 2851 | no |
| V-M0-10 | The `VG` preset file, part 3: a `presets.VG` entry on every `presetsRequired` cell of another table that a village stage reads. **`cut.bendMode` is named**: `VG` entry `straightFirst`, provenance `own`, note `fixed: the parity value`. The rest of the compile's `villagePresetCells` follow one rule (VG's code-read behaviour, else the `MFCG` entry's value) | 3765; 2851–2863; 278 | **yes, M0-b-05b**, because the entry lands in `cut.json`, which M0-b-05b owns and version-bumps. The value is fixed by the design and needs no calibration, so only the write waits. **Conditional, M0-b-05a**, if the compile counts a `presetsRequired` cell of `granularity.json` or `regimes.json` as village-read (PLAUSIBLE: a working-copy grep finds no literal `presetsRequired` in either file, but the compile manifest decides) |
| V-M0-11 | The source manifest's `productStages.village` from §3.0's stage set, conditional registrations included (V11 §3.2.1 step 1). The conditional one that matters here is S8's bent cut, registered for risk (1)'s fallback | 3765; 1086–1119; 2853–2854 | no for the registration itself (a stage id, not a cell value) |
| V-M0-12 | Measuring §6's VILLAGE split (PLAUSIBLE until V-M0 measures it; VS2 ≈ 6 ms, VS4 ≈ 4.5 ms of ≈ 65 ms), with the raster-coarsening fallback if a rung's p95 misses | 3588–3594; 3628–3631 | no |

### Exit bars (executed)

| id | bar | source lines | waits for M0-b-05a/b |
|---|---|---|---|
| V-M0-E1 | 0 whole-map retries on 1 000 seeds | 3765 | **conditional, both**: if risk (1)'s fallback fires, the bar is re-run with the bent cut on interior faces, which then reads `cut.json` (05b) and the depth rows (05a) |
| V-M0-E2 | VS2 + VS4 ≤ 8 ms at VILLAGE | 3765; 3588–3594 | no (the bent cut runs in S8, outside VS2 and VS4) |
| V-M0-E3 | Under `VG`, the road-topology shares within ± 5 % of VG's roll | 3765 | no (VG cuts no block; `cut.bendMode`'s `VG` entry is the parity value) |
| V-M0-E4 | Risk (1)'s legibility check: 20 renders at 1 400 people, judged against §8.5's figure-ground metrics. *Pre-decided fallback:* above 800 people the branch spacing takes the `nucleated` law, and faces over 4 ha inside the perimeter get S8's `BentCutFabric`, re-measured | 3765; 3807–3811; J-V7.43 at 3904 | **conditional, both**: the first pass does not wait. A fallback re-measure on bent-cut lanes is only final once M0-b-05b's `cut.flattenM` and M0-b-05a's plot-depth rows and regime floors (which M0-b-05a's T34-1 re-run shows the bent cut reads) have landed |
| V-M0-E5 | V11 §3.2.1 step 4's preset check green with the `VG` file shipped | 3765; 2855; 2862–2863 (T-V11-9's equality check) | **yes, M0-b-05b**, through V-M0-10. Also conditional on M0-b-05a, as for V-M0-10 |
| V-M0-E6 | `plat calibrate register --check` green over the cells it lands (`village.json`'s; V-M0 is the only V07 milestone that lands a whole table) | 3765; 3800 | no (`cut.bendMode` is `calibratable: false`; a preset entry is not a register entry) |

## Summary of the waits

* **Hard wait on M0-b-05b:** V-M0-10's `cut.bendMode` entry, and with it V-M0-E5. The value is known now (`straightFirst`). Only the write into `cut.json` has to follow M0-b-05b's version bump.
* **Conditional on M0-b-05a:** V-M0-10 and V-M0-E5, only if a `granularity.json` or `regimes.json` cell turns out to be `presetsRequired` and village-read.
* **Conditional on both, only if risk (1)'s fallback fires:** V-M0-E4's re-measure and V-M0-E1's re-run.
* **Everything else** (V-M0-01 to 09, 11, 12, E2, E3, E6) reads no table that M0-b-05a/b finalise.

## Noted, not resolved

* V07:3757 and ARCHITECTURE:21528 say V-M0 runs "on M0 (b)'s tables" without listing them. `cut.json` is named by ARCHITECTURE:21511 (b), where `cut.flattenM` is calibrated, so it is grounded. `granularity.json` and `regimes.json` follow from M0-b-05a's `owns` in `M0-work.json`; that part is the inference.
* M0-b-05b has an alternative outcome: M-1 may record that it cannot deliver `ng-faces.json` (C-0071). The work entry then makes its clauses descriptive. Whether `cut.flattenM` still gets a final calibrated value in that case is not stated in what was read, so V-M0-E4's fallback could then run on the uncalibrated 0.7.
* V-M0's row (3765) says "VS2", "VS3" and "VS4" without qualification. The exclusions in V-M0-01 to 03 come from the V-M1, V-M2 and V-M3 rows (3766, 3767, 3769), which claim those parts. §8 does not say what VS3 does in V-M0's runs where step 5 would sit (for example, whether it runs `VG`'s water cut); this file does not decide that.
