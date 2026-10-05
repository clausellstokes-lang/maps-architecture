# M1 — the design volumes' shares (extracted from their §8 build plans)

Filler task `filler/m1-volume-shares`, 2026-10-05. Written by an implementer-side seat under the CLEAN_ROOM text of
`workflows/23-build-m0-waves.js`. The design is a reference, not a contract (J156). This file adds no design: every row
below is a pointer to its source line in `docs/volumes/`, with a one-line summary. Where the volumes and §16 differ, the
volume and §16 rows govern, not this file. Line numbers are those of the working copy on 2026-10-05.

**Clean-room basis.** CLEAN_ROOM lets an implementer-side seat read "the design volumes a milestone builds". §16's M1 row
(`docs/ARCHITECTURE.md` ≈ line 21512) and its *carried in the rows' milestones* row name the M1 shares of V01 (its M1
schema), V09 (AP1 and AP11's zoom-out stop), V11 (C1 and the C9 rows beside M1's items) and V12 (its rig share: W2 and W7's
M1 part). §16's staged table puts V07's V-M0 beside M1. The volumes' §8 sections were read in place: V01 3379–3522,
V09 4664–4742, V12 3215–3294, V11 5055–5173, V07 3754–3853.

**V08 not read (blocked).** Neither §16's M1 row nor its carried row nor INDEX §1/§3 gives V08 an M1 share. The dossier
port's creation half at M1 is the base's (§14, items 73–86, named in §16's M1 row), and V08 is built at M-SF (SF0–SF7)
and VH. So no milestone this seat prepares builds V08, and CLEAN_ROOM does not let this seat open it. Its M1 items, if any,
are left for a seat whose milestone builds V08, or for the owner to allow the read. Recorded, not dropped.

**Id convention.** Where a volume gives an item an id, that id is used (AP1, W2, W7, C1, V-M0). Where it does not, the id
is this file's own, `<volume>-M1-<n>` or `V07-VM0-<n>`, for cross-reference only.

## V01 — neighbourhoods (§8.1)

V01 is built at M5. Its M1 share is schema and naming only (≈ 0.5 pw inside M1's naming and schema lines).

| id | summary | source |
|---|---|---|
| V01-M1-1 | Schema only: `Block.content` (always `ordinary`), `Block.overrides`, `HoodPlace`'s registry row with no producer, `DistrictContext` declared beside §2.5's `TypedBoundary`, `Recipe.product` (`town`), the three concerns' ids and the `S8.seed` stage id reserved in the registry (append-only; item 345) | V01-neighbourhoods.md:3388–3391 |
| V01-M1-2 | The way-naming context's features in S13a, with the M1 naming grammar authored against them (V01 §3.7.2) | V01-neighbourhoods.md:3391 |
| V01-M1-3 | `hood.constants`' one `settings` row shipped whole, every column at its V01 §3.14 default; before M3a only the naming context reads it | V01-neighbourhoods.md:3392–3393 |
| V01-M1-4 | `camp.reachM` ships inside the M1 `hood.constants` row; it is not calibratable and takes no register entry (its reader `campLand` lands at M3b) | V01-neighbourhoods.md:3403–3404 |
| V01-M1-5 | Exit: `plat calibrate register --check` green over the M1 cells, entries written by `--defaults --milestone M1`; the whole `hood.constants` row lands, with four columns read by naming (`name.curvedShare`, `name.bentDeg`, `name.landmarkM`, `name.tradeShare`); every calibratable column takes its entry at M1 | V01-neighbourhoods.md:3415–3420 |
| V01-M1-6 | `terrace.siteShare` is landed at M1 as part of `hood.constants` (read later by `terraceState` at M3a) | V01-neighbourhoods.md:3424 |
| V01-M1-7 | Forward note: the naming context's features exist from M1, and M5 declares a one-time way-name shift when squares and places first appear; M1 goldens carry no places | V01-neighbourhoods.md:3408–3410 |
| V01-M1-8 | Forward note: an M5 tuning that moves an M1 `hood.constants` value appends a history row to its existing entry (M1's entries must exist for this) | V01-neighbourhoods.md:3436–3439 |

## V09 — the application (§8.1)

| id | summary | source |
|---|---|---|
| AP1 | The shell at M1: the frame (top bar, rail with the existing tools, map region, context panel, view bar), the chrome tokens, icon sprite and two themes, the empty state's card (the proxies' strip waits for M3b), the report, gazetteer and "features in view" panels in plain words, the basic panel, the keymap, the accessibility contract, context help's skeleton, the message catalogue's first rows with its coverage test, and open and download of generated towns. Exit T-V9-1 (shell), T-V9-15, T-V9-21 (shell). 2.5–3.5 pw | V09-application.md:4674 |
| V09-M1-1 | AP11's zoom-out stop at the milestone §16 names for item 116 (§16's carried row says M1) | V09-application.md:4685 |
| V09-M1-2 | `toolkit.json` and `messages/en.json` rows ship with V09's shell (V11's registry rows 86–89; file f item 516, BASE M1–M3b) | V11-content.md:5144–5145 |

## V12 — calibration (§8)

| id | summary | source |
|---|---|---|
| V12-M1-1 | The panels of later milestones (M5, M6, V-M4 and the volumes' steps) register on the panel engine that M1 builds | V12-calibration.md:3226 |
| W2 | Measure, parity and panels at M1: `@plat/testkit/metrics` with `METRICS`, `measureInputOf` with the enclosure profile, the MFCG shore split, `plat measure`, `plat baselines check / aggregate`, `plat parity` with dashboard and CSV; `@plat/testkit/seeds` with B-CITY's and the goldens' formulas (item 491); the panel engine (`PanelSpec`, `plat d5 verdict`, the widened `D5Record`) and `build_sitting.py`; the research-side checks `check_t3.py` and `check_t6.py`; `history.jsonl`; the M-1 metric rows' product side; the register with §13.7's letters and the M1–M2b constants, and `plat calibrate register --defaults --milestone <id>`. Exit T-V12-1 – T-V12-7, T-V12-16 – T-V12-20, T-V12-22, T-V12-32's MFCG clauses, T-V12-51; the M1 panel sat or *provisional — not rated*. 1.75–2.25 pw | V12-calibration.md:3237 |
| W7 (M1 part) | Owner rules at M1: item 111's rate specs and pin; item 116's `view.limitStop`; the `--trial` entry; the edge suite's M1 rows. Exit: those of T-V12-42 – T-V12-50 and T-V12-52 – T-V12-59 due at M1 (T-V12-51 is W2's) | V12-calibration.md:3242 |

Note: W2 names `build_sitting.py` beside the panel engine and two research-side checks (`check_t3.py`, `check_t6.py`). Their location and who writes
them is a clean-room question for the M1 build spec; this file only records that W2 names them.

## V11 — content (§8)

| id | summary | source |
|---|---|---|
| C0 (M1 exit) | C0 itself lands at M0 (b). Its exit has two M1 parts: a compile of the M1 tables byte-identical on two hosts, and `plat calibrate register --check` joining CI at M1 (T-V12-20) | V11-content.md:5059 |
| C1 | The M1 rows: the M1 classes (housing, food, crafts, trade, lodging, civic, worship, the outside classes) with their template families and heights, district kinds, greenery and climate rows, and the era and material rows. Exit: B-CITY's M1 gate on these rows and the register green over them. 2.0–2.5 pw inside M1's content line | V11-content.md:5060 |
| V11-M1-1 | C9 rows sit beside each item's base milestone. Per §16's M1 row (items 111, 116 and 119), the M1 ones are item 111's dry-country cells and `garden` row, item 116's margin cell (row 92), and item 119's empty `perf.qualitySpend`. Inferred from §16, so PLAUSIBLE | V11-content.md:5070 |
| V11-M1-2 | Register at C1's exit: one `target.column` entry per calibratable column, written by the seat landing C1 and never deferred | V11-content.md:5073–5077 |
| V11-M1-3 | The seat landing C1 registers the base's T16-4 as a V12 `BenchBarDef` (statistic: detour factor; stages `S10b`; towns `bcity`; tier `milestone`), together with the `detourFactor` entry | V11-content.md:5084–5088 |
| V11-M1-4 | The C1 entries for roster columns `perCapita`, `min`, `firstAtPopulation`, `perOther` and `shopProb`, `unemploymentThreshold`, and `roster.households`: `measure` at M2b, then `corpus` at M-CAL | V11-content.md:5098 |
| V11-M1-5 | `roster.settings`' `detourFactor` (owner `base`): `measure` at M1 by T16-4 (`bar.T16-4`) | V11-content.md:5099 |
| V11-M1-6 | The M1 template families' footprint and plot budgets and the role table's `footprintShare`: `measure` at M1's gate against §13.5's footprint rows, with a one-move pre-decided fallback | V11-content.md:5100 |
| V11-M1-7 | The C1 entries for `undergroundAccess.prob` (panel at V4-U5), `roster.districtKinds` weights (measure at M2b), `heights` (corpus at M-CAL) and "the rest" (corpus at M-CAL) | V11-content.md:5101–5105 |
| V11-M1-8 | Display cells: `label` and `synonyms` land with the C1 class rows; the labels of district kinds land with their table at C1; the compiler's `commonness` and `icon` from C1; the shipped style sheets' labels with §16's M1 sheet (the words ≈ 0.1 pw inside C1's and C3's ranges; the C1 share is M1's) | V11-content.md:5148–5157 |
| V11-M1-9 | Dependency: C1 lands before M1's gate. Risk R4: C1 is scoped to the M1 classes so M1 never waits on the full ladder | V11-content.md:5159, 5166 |

## V07 — the village, V-M0 (§8; beside M1)

V-M0 is its own milestone, right after M0 and beside M1. It is not an M1 item.

| id | summary | source |
|---|---|---|
| V-M0 | The tracker spike: VS2 + VS3 + VS4 and the slot race on flat, river and coast sites at the VILLAGE target, headless, on the spike's own fixtures (no M2b input); `village.json` whole (three rung rows, every column of V07 §2.2 and §2.2a) with its register entries; the `VG` preset file (item 377) with V11's five `presets.VG` entries and every village-read `presetsRequired` cell's `VG` entry; the source manifest's `productStages.village`. Exit: 0 whole-map retries on 1 000 seeds; VS2 + VS4 ≤ 8 ms at VILLAGE; road-topology shares under `VG` within ± 5 % of VG's roll; the legibility check on 20 renders; the V11 preset check green; the register check green. 1.25–1.75 pw | V07-village.md:3765 |
| V07-VM0-1 | Slot and dependencies: after M0, on M0's kernel, M0 (b)'s tables and its own synthetic fixtures; beside M1 | V07-village.md:3757–3759 |
| V07-VM0-2 | Register at V-M0: `village.json` (registry row 61); the named entry `cal.village.*.rules.race.densityPower@VG` (method `tune`, due V-M4) is written first, then every other calibratable column by the default line (owner `V07`) | V07-village.md:3800 |
| V07-VM0-3 | Risk (1) spike: V-M0's 20 renders at 1 400 people against §8.5's figure-ground metrics. Pre-decided fallback above 800 people: the `nucleated` law, and the base's bent-cut lanes on faces larger than 4 ha | V07-village.md:3807–3811 |
| V07-VM0-4 | The same V-M0 change writes V11's `presets.VG` entries and `productStages.village` (the V11 side of the same rule) | V11-content.md:5107–5111 |

## V08 — the SettlementForge connection

Not read; see *V08 not read (blocked)* above. The base's M1 port work (the creation half, the `DossierDigest`, one adapter,
the frozen fixtures, B-DOSSIER-lite) is in §16's M1 row and §14. It is the base's and is not listed here.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read in place): every row's source line and its paraphrase from the §8 text quoted at those lines.
**PLAUSIBLE**: V11-M1-1's mapping of C9 items to M1, inferred from §16's M1 row naming items 111, 116 and 119; V09-M1-1's
M1 slot, read through §16's carried row; and whether V08 holds any M1-tagged item, which was not read.
