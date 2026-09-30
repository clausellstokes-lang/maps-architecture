# Seam check, round 3: content (V11) and calibration (V12), with V02 and V06 as readers

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-content-calibration-r3; covered by the whole-design retrovalidation (J84).

PROGRESS (kill-safe; one line per section: planned | done)
- §0 Inputs and method | done
- §1 Re-check of round 2 (SCC-51 – SCC-72) | done
- §2 New findings (SCC-73 onward) | done
- §3 Table and calibration census, round 3 | done
- §4 Disposition by owning volume | done
- §5 CONFIRMED versus PLAUSIBLE | done
- §6 Continuation (2026-09-29 10:56 –, re-issued task) | done
  - §6.0 Why, inputs, method, decisions | done
  - §6.1 Re-check of round 2's continuation (SCC-R2C-1 – SCC-R2C-17) | done
  - §6.2 New findings (SCC-R3C-1 onward) | done
  - §6.3 Disposition of the continuation | done
  - §6.4 CONFIRMED versus PLAUSIBLE (continuation) | done

## 0 Inputs and method

Inputs at this round (md5, lines): `docs/volumes/V11-content.md` 3679161b… (4 417), `docs/volumes/V12-calibration.md`
3f19345c… (2 932), `docs/volumes/V02-buildings.md` 77417d41… (4 420), `docs/volumes/V06-evolution.md` 62ab91db… (4 048),
`docs/volumes/_integrate.md` d868438e… (369), `docs/AMENDMENTS-2026-09-28f.md` 38c29d39… (1 238), base
`docs/ARCHITECTURE.md` 01fea21f… (unchanged since round 0), file g 3e7f674d… (unchanged). Every round-3 reconcile lane
that edits these files had landed before this lane started (V02 06:08, BASE-F 06:08, V06 06:17, V11 06:25, V12 06:35;
V07 06:21 and V08 06:30 for the V07 and V08 lines read below).

**What was read, and how.** The texts round 2 read exist as exact snapshots, each verified by md5 against round 2's
recorded inputs: V11 4cf57d39… (`rcV11r3/V11-pre-reconcile-r3.md`), V12 baa90921… (`rcV12r3/V12-pre-r3.md`), V02
dc951b81… (`rcV2r3/V02-pre-r3.md`), V06 07e78fe8… (`rcV6r3/V06-pre-reconcile-r3.md`), `_integrate` a8c72fb4… and file f
a85996a2… (`rcBFr3/`). So **every line changed since round 2 was read whole** — the full diffs of V11 (216 diff lines), V12
(279), V02 (309), V06 (350), `_integrate` (7) and file f (123), saved under `scratchpad/volumes/scc-r3/`. Then the seam's
core was **re-read whole in its current form**: V11 §2.1–§2.2 (the registry types, the source cell, the preset entries),
§3.1's registry rows 1–85, §3.7.4 with the web's off form, §3.13's and §3.16's calibratable statements, §8 whole (the
exits, the register paragraph, the non-g lines, the preset-entry landing); V12 §2.5–§2.6 (the run and the entry), §3.7.1–
§3.7.2, §3.11 whole (every register line, the panel rule, the lint, the exits); V06 §2.2's table and its non-calibratable
paragraph, §8's register paragraph and table; V02 §2.3, §3.2's sunlit choice, §3.10.9's constants and §3.10.10 whole.
Outside the four volumes, read at their lines because round 3's texts reach them: V07 §2.2 (the default rows' provenance,
the `VG` column), §2.2a's `terrace` and `ladders` rows, §2.4's range prose, §3.15 whole, §8's milestone table and risks;
file f items 291, 376, 377, 447, 575; base §7.6's per-preset paragraph (l. 8910–8945).

**Scripts** (`scratchpad/volumes/scc-r3/`): round 2's `secs.py` re-run — 506 cross-volume section citations among the four
volumes, 0 unresolved; `ids.py` — 229 cross-cited T-, J- and BCR- ids among the four volumes, 0 dangling (V02's T-V2-31 and
-32 are paragraph-defined, checked by hand); every metric id V02 §3.10.10, V06 §8 and V11 §8 name, checked against V12
§3.4.2's 124 catalogue ids and families (`catalogue.txt`) — all present (`ribbon.share`, `vacancy.share`, `walled.share`,
`catacomb.rank`, `crypt.present`, `time.model`, `fm.*`, `tier.count`, `deck.buildings`, `usemix.*`, `pop.perBuilding`,
`bldg.*`, `plot.area`, `district.area`, `quarter.count`, `void.*`, `link.*`, `shade.gap`, `retaining.lengthM`,
`raised.count`); every bar V02 §3.10.10 and V06 §8 name as `bar.<id>` checked against X-V12-15's list — equal; greps for
`BenchBarDef`, `StatBarSpec` and `NullModelSpec` in V02, V04, V06, V07, V11 and the base (0 hits each).

**Method.** (1) Each round-2 issue (SCC-51 – SCC-72) was re-checked against its owner's current text and every volume that
restated it (§1). (2) The whole seam was swept again, since round 3's repairs add new obligations across it (§2). (3) The
table and calibration censuses were redone (§3). New findings start at SCC-73. Severity: **blocker** (the seam cannot be
built), **major** (a contradiction or an unwired piece a builder would hit), **minor** (wording, a stale pointer, a
restatement whose values agree).

## 1 Re-check of round 2's issues

| id | owner | status now | evidence (current text) |
|---|---|---|---|
| SCC-51 | V11 | FIXED; **one residue — the `VG` requirement's scope, new SCC-77 (and V07's half, SCC-79)** | V11 §2.2 l. 323–349 (`PresetId`, `PresetEntry`, `presets` and `ext.over` over the four presets, the carrying cells, `fixed:` notes), §3.2.1 step 4 l. 827–833, §3.7.4 l. 1733–1737, §3.24.0, §8 l. 3742–3749, §2.10's lifecycle row, W68, J-V11.74; file f items 376–377 cited |
| SCC-52 | V02 | FIXED | BCR-V2-14 l. 3657–3663, V2 §3.2 step 5 l. 919–921, §1b l. 260, §1c l. 353, §3.10.8's lead, J-V2.100; file f item 376 carries the same sentence word for word |
| SCC-53 | BASE-F | FIXED | file f item 376 (note = SCC-52's sentence; *Needed by* V02, V11, V12), item 377 (*Needed by* V07, V11, V12) |
| SCC-54 | V12 | FIXED | V12 §3.11 l. 1889–1890 (two lines: V11's four structure cells at C3b; the base persistence cells, owner `base`, by the seat landing V06's E2 at M6-E), l. 1850–1852, T-V12-20's clause, J-V12.66 |
| SCC-55 | V06 | FIXED | V6 §8 l. 3207–3209 and the register table's persistence row |
| SCC-56 | V12 | FIXED in V12; **the owners' side is unwired — new SCC-73 (V06), SCC-74 (V02), SCC-75 (V11)** | V12 §2.1 l. 335–374 (`bar.<barId>`, `frame.<table>.<column>`, `BenchBarDef`), §2.6's `metric: MetricId[]`, §3.4.2's rows, the lint l. 1905–1907, the exit rule l. 1913–1916, X-V12-15, J-V12.65 |
| SCC-57 | V06 | FIXED | V6 §8's E7 row, the register paragraph l. 3200–3214 and its table (method, metric, exit, fallback per family), V6 §2.2's non-calibratable paragraph, J-V6.111 |
| SCC-58 | V02 | FIXED | V2 §3.10.10 (one line per family: metric, method, due, fallback), V2 §2.3's pointer, J-V2.101 |
| SCC-59 | V02 | FIXED | V2 §2.3 l. 546–549 (measured-rate entries only; the code-read `FM` entries move by no run) |
| SCC-60 | V12 | FIXED in V12's rule; **the rule's pointer to V07's `VG` run names cells V07 never defines — new SCC-78 (V07), SCC-80 (V12)** | V12 §2.5 l. 551–552, §2.6's `preset` target and `@FM`/`@VG` ids, §3.7.2 (3) l. 1485–1493, T-V12-9, T-V12-24, J-V12.11, J-V12.63, J-V12.67 |
| SCC-61 | V12 | FIXED in V12; **item 575 states no per-run `id` or ordinal — new SCC-86 (BASE-F)** | V12 §2.2's *Runs merged on read* l. 444–456, T-V12-4's runs clause, J-V12.68; V12's own §12 marks the `id` reading PLAUSIBLE |
| SCC-62 | V07 | FIXED | V07 §2.4 l. 984 and §2.2a l. 673 (`rules.ladders.ranges` `calibratable: false`), J-V7.114 |
| SCC-63 | V11 | FIXED | V11 §3.12 l. 2197–2199 (step type and member class, the qualifier the row's label) |
| SCC-64 | V06 | FIXED | V6 §3.9.1 (2) l. 1597–1598 |
| SCC-65 | V11 | FIXED | V11 §3.18 l. 2888 ("V06's `streets.abandonAfterYears` (V6 §2.2)") |
| SCC-66 | V11 | FIXED | T-V11-13 (non-`settlement` units), T-V11-18 (the reference arm under the web's off form, `unit: 'district'`), T-V11-21 (the off form's values) |
| SCC-67 | V11 | FIXED; **the same policy is not applied to V07's village switches — new SCC-87** | V11 §3.24.1 l. 3261–3264, T-V11-37's switch clause, J-V11.75 |
| SCC-68 | V12 | FIXED | V12 §3.11 l. 1877 (`enabled` takes no entry), §1b l. 250's producers |
| SCC-69 | V06 | FIXED at the lines named; **the same class remains at V6 §3.19.2 (2) and §3.19.4 (3) — new SCC-84** | V6 §3.9.10 (2)–(3), the `uses.splitHysteresis` row, §3.18.2 (3), §2.2's structures paragraph now cite the cells |
| SCC-70 | V06 | FIXED | V6 §3.9.10 (3)'s *A split with no threshold*, T-V6-43's clause, J-V6.113 |
| SCC-71 | V02 | FIXED | V2 X13 l. 4222, J-V2.56 |
| SCC-72 | V11 | FIXED; its paragraph still speaks of V12's families as future — folded into SCC-75 | V11 §8 l. 3724–3740, J-V11.76 |

Round 2's 22 issues: **all 22 FIXED in their owners' text.** Seven repairs reach a sibling that has not caught up, each
raised anew in §2: SCC-51 → SCC-77, SCC-79; SCC-56 → SCC-73, -74, -75; SCC-60 → SCC-78, SCC-80; SCC-61 → SCC-86; SCC-67 →
SCC-87; SCC-69 → SCC-84.

## 2 New findings (SCC-73 onward)

| id | sev. | owner | kind | claim (with evidence) | required change |
|---|---|---|---|---|---|
| SCC-73 | major | V06 | unwired producer (the bars V6 §8 names) | V12 §2.1 makes `bar.<barId>` resolve only to a registered bar — a `StatBarSpec`, a `NullModelSpec`, or a `BenchBarDef` "which an owner registers for every bar its register lines name that no spec carries" (l. 346–351); the lint fails an entry naming an unregistered bar (l. 1905–1907, T-V12-20), and X-V12-15 (l. 2726–2731) asks V06 for T-V6-6 – -10, -13, -16, -18, -28, -31, -32, -40, -43, -54 and the epoch forms of T-V6-34 and -37. V6 §8's register table (l. 3216–3230) names exactly those bars, but V06 states no registration anywhere (0 hits for `BenchBarDef`, `StatBarSpec`, `NullModelSpec`; no §1b row), and its live text still treats the family as future: §8 l. 3235 "which V12's round-3 lane adds … the lint passes them only once it exists", X38 (l. 3880) "until `bar.*` exists the lint fails V6 §8's measure lines". The seat landing E2 writes `bar.T-V6-8`, the lint fails, and the seat must decide what to register, over which towns, stages and tier. | V6 §8's register paragraph adds: "Each bar a line names as `bar.T-V6-<n>` is registered by the seat landing that line's exit, in the same change, as a V12 `BenchBarDef` (V12 §2.1; X-V12-15) — `id` the bar id, `owner` `'V06'`, `statistic` the bar's own quantity, `towns` its fixture family (H-100, H-TERRACE, H-DESERT, H-VOID …) with their settings, `stages` the V06 phase ids it reads, `tier` `'milestone'`, `run` the check V6 §7 states — unless a `StatBarSpec` or `NullModelSpec` of V12's bar map already carries it as `id` or `ownerBar` (T-V6-34 and T-V6-37 register their epoch forms beside V04's bars)"; a §1b row (producer: the E2–E8 seats; consumers: `plat parity`'s `bar.` rows, V12's lint); l. 3235's sentence and X38 read "landed (V12 §2.1, J-V12.65; the split `decline` line, J-V12.66) — V06 owes the registrations above". |
| SCC-74 | major | V02 | unwired producer (the bars V2 §3.10.10 names) | V2 §3.10.10 (l. 1937–1960) names `bar.T-V2-22`, -28, -29, -30, -32, -36, -37, -42, -46, -47 and -51 — the list X-V12-15 asks V02 to register — and calls the family "volume 12's … the verdict statistic of one registered owner bar", but V02 states no registration (0 hits for `BenchBarDef`, `StatBarSpec`, `NullModelSpec`), and X33 (l. 4242) still carries its round-3 fallback ("J-V12.64's pattern: one descriptive `model` metric per V2 §3.10.10 line"), which J-V12.65 declined. The M3a-V2, M6a–M6c seats' entries fail the lint until someone registers the bars. | V2 §3.10.10's lead adds the registration sentence of SCC-73 for V02 (`owner` `'V02'`; `towns` the bar's fixtures — B-CITY, B-CITY-lite, B-MASS, the terrace-wall sub-fixture, the second known-city fixture, the free-frame harness; `tier` the bar's CI tier, V2 §7's CI paragraph), by the seat landing the line's milestone; a V2 §1b row; X33 reads "landed (V12 §2.1, J-V12.65); V02 owes the registrations of V2 §3.10.10", its fallback cell "none". |
| SCC-75 | major | V11 | unwired producer (the base's bar and V11's own) | V11 §8's `detourFactor` line (l. 3734) names `bar.T16-4`, owner `base`, entry written at C1, and V12's item-102 line (l. 1844) names `bar.T-V11-30`, entry written at V11's C2; X-V12-15 asks "the base" and V11 to register them. V11 states no registration, and nobody can register the base's bar: the base holds no such text and changes only through a base change request. V11 §8 l. 3726 still says the two families "are the ones SCC-56 asks V12 to add". | V11 §8's non-g paragraph: "The two metric families are V12's (V12 §2.1; J-V12.65). The seat landing C1 registers the base's T16-4 as a `BenchBarDef` (`owner: 'base'`, B-CITY, stage S10b, tier `'milestone'`) in the change that writes the `detourFactor` entry; the seat landing C2 registers T-V11-30 as a `paired` `StatBarSpec` (V12 §2.7b) with `id` `'T-V11-30'`"; a V11 §1b row; X-V11-12 notes it. |
| SCC-76 | major | V12 | unwired calibratable columns (file g's lines lack their catch-all) | V12 §3.11's items 103–107 line (l. 1841) names "siting-family and signature-pair weights, coverage targets, item 105's web weights, `comfortM` and orientation factors, item 107's spacing radii" and the item-106 line (l. 1842) "the defensibility thresholds, `wall.barrierReachM`, the waterfront size threshold"; the rule that "a line ending 'and every other calibratable column' binds the table's remaining calibratable columns" is stated only for items 109–110 (l. 1853–1855), and V12's own §12 (l. 2811–2812) says every line carries that catch-all. V11 leaves file g's rows to V12's lines (V11 §8 l. 3724–3725) and marks calibratable, among others: `siting.web`'s `relaxPasses`, `relaxGain`, `splitThreshold`, `volume`, `chainStatus`, `reverseShare`, `valuableSecurity` (l. 1698); every `siting.custom` rule cell — `featureHaPerVolume`, the first-processor, step-inward and final-seller distances and weights (l. 2338, 2641–2650); every goods column of `roster.resources` beyond `comfortM` (l. 1607, `maxDistanceM` …); `walls.barriers`' thickness · height and tower-spacing factors (l. 2788–2800). V12 names none of them (0 hits each). C2's and C4's exits cannot be register-green (V11 §8) without inventing entries. | V12 §3.11: the items 103–107 line's rows cell ends "…, and every other calibratable column of the tables and columns items 103–107 add — registry rows 33–37 (`siting.profiles`, `.families`, `.pairs`, `.web`, `.custom`), row 19's goods columns, row 17's profile, coverage, balance, orientation and split columns, and `roster.settings`' `coverage.rosterWeight` (V11 §2.3–§2.5, §3.3–§3.8, §3.13)"; the item-106 line ends "…, and every other calibratable column of `walls.barriers` and `walls.waterfront` (rows 14–15; V11 §3.16)"; the *File g's rows by column family* paragraph states the catch-all rule as the items 109–110 paragraph does. (V11 may instead mark a cost bound such as `relaxPasses` or a word map such as `chainStatus` `calibratable: false`; either way no calibratable cell is left without a line.) |
| SCC-77 | major | V11 | a check that its writers cannot satisfy (the `VG` preset's scope) | V11 §3.2.1 step 4 (l. 827–833) and §2.1's comment (l. 292): "for every zeroing preset whose file ships … (`VG` from V07's V-M0), a `presetsRequired` column's cell without its entry stops" the build. The base (§7.6, l. 8934–8937) makes every categorical option cell carry an entry for each parity preset — `cut.bendMode` among them — and BCR-V7-13 adds `VG` as "a third parity preset, read at village rungs only". Only V11's five cells are given `VG` entries (V11 §8 l. 3744–3747); V07 gives `VG` values to `village.json`'s cells and switches only. No text writes a `presets.VG` entry on the base's categorical option cells or any other volume's, so the compile stops at V-M0 on the first of them and the seat must invent `VG` values for cells VG never reads. | V11 §2.1's comment and §3.2.1 step 4: "under `VG` a `presets.VG` entry is required only on the `presetsRequired` cells of tables whose `readers` include a stage `ProductDecl('village').stages` registers (V07 §2.1; conditional registrations included); a cell of any other table carries none and is never resolved under `VG` (read at village rungs only, BCR-V7-13); the compile writes the village-read `presetsRequired` cells to its manifest, so V07 §3.15's list (SCC-79) is checked complete"; V11 §8's preset paragraph: "the seat landing V07's V-M0 writes those entries from V07 §3.15's list, V11's five by V11 §2.2's rule"; a J-V11 row. |
| SCC-78 | major | V07 | unwired run (V-M4's "tuning") | V07 §8's V-M4 row (l. 2943) reads "`baselines.json`'s VG rows; tuning; the D-5 panel against VG" — the only "tuning" in V07 — while V07's `VG` column is code-read (`ref:VG 1.6.9 … (code)`, l. 535, 598) and V07 writes no register entry. V12 §3.7.1 (c) (l. 1468) opens "V07's `VG` preset cells at V-M4, each a `reference` run on the preset's own entries", and V12 §3.7.2 (3) as round 3 amended it (l. 1485–1493) admits a `presets.VG` entry only when a register entry names it, never a code-read one. So the run V12 plans is refused before evaluation, and V-M4's builder must choose the cells. The one measured-rate `VG` knob V07 implies — risk (2)'s fallback, "a density raised to a power fitted so the built share per density band matches VG's" (l. 2960) — has no cell. | V07 §2.2a adds the cell `rules.race.densityPower` (unit none, range [0.5, 3], default 1 — the plain density — at every rung, `own`), whose `presets.VG` entry is V07's one measured-rate `VG` entry, provisional 1 until V-M4, with the register entry `cal.village.*.race.densityPower@VG` (`target.cell.preset: 'VG'`; method `tune`, a `reference` run against VG at V-M4 with `layer: { preset: 'VG' }`; metric the `vg.*` metric of T-V7-23's accepted-share row; fallback `not-achieved`, reported to the owner); V07 §8's V-M4 row reads "`baselines.json`'s VG rows; T-V7-23 under `VG`; the one `reference` run on `rules.race.densityPower@VG` (risk (2)), only if T-V7-23's accepted-share row misses its band; the D-5 panel"; V07 §3.15 states that every other `VG` entry is code-read and moves by no run (V12 §3.7.2 (3)); a J-V7 row. |
| SCC-79 | major | V07 | unwired writer (the `VG` preset's landing) | V11 §8 (l. 3744–3747) makes V11's five `presets.VG` entries land "with V07's **V-M0**, in the change that ships the `VG` preset file (file f item 377), written by the seat landing V-M0", and V11's compile check runs from V-M0 (SCC-77). V07 never mentions these entries (its round 3 landed before V11's), and V07 §8 puts "the `VG` preset with the request mapping" in V-M1's row (l. 2939) while V-M0's exit already runs "under `VG`" (l. 2938). With SCC-77, V07 must also give the `VG` value of every categorical option cell a village stage reads. | V07 §8's V-M0 row adds "the `VG` preset file (file f item 377): V07 §3.15's `VG` column and switches, V11's five `presets.VG` entries written by V11 §2.2's rule (V11 W68), and the `presets.VG` entry of every `presetsRequired` cell of a table a village stage reads, from V07 §3.15's list — V11 §3.2.1 step 4 green at the exit"; V-M1's row reads "the `VG` request mapping"; V07 §3.15 gains that list, each cell with its `VG` value (VG's own behaviour where the reference has it, `ref:VG 1.6.9 … (code)`; else the `MFCG` entry's value, `own`, `fixed: the parity value`), `cut.bendMode` among them where S8 is registered for risk (1)'s fallback; a V07 W row. |
| SCC-80 | minor | V12 | stale pointer (SCC-78's other half) | V12 §3.7.1 (c) (l. 1468), §3.7.2 (3) (l. 1488–1490: "V07's run against VG at V-M4"; "a `presets.VG` entry's [fallback], where V07 states one"), J-V12.11, J-V12.63 and §12 (l. 2810) speak of "V07's `VG` preset cells" tuned at V-M4; V07's `VG` column is code-read and names no measured-rate entry. | After SCC-78: "V07's one measured-rate `VG` entry, `rules.race.densityPower@VG` (V07 §2.2a), at V-M4 — every other `VG` entry is code-read and never a run's cell"; §3.7.2 (3)'s VG fallback clause reads "none — that entry falls to `not-achieved`". |
| SCC-81 | minor | V12 | one knob set on two lines | V12 §3.11 (l. 1886): "the stepped tiers: V02's stepped compositions (V02 §3.15) and V11's `stepped-shrine` heights row | V02; V11 | `panel` (M4-110) at M4 | `tier.count` | the panel rule". V2 §3.10.10 (l. 1951) registers the same V02 cells on its own line — `measure` at M3a-V2 (T-V2-46, -44, -45), then `panel` at M4 and M6, metrics `tier.count` and `bar.T-V2-46`, V2 §3.15.1's fallbacks — and says each V02 cell takes its entry "from exactly one line below" (l. 1938). Two lines for one set of knobs: two entries (the lint fails, "two entries … for one knob") or a seat choosing between two methods, dues and fallbacks. | V12's line reads "\| the stepped tiers: V11's `stepped-shrine` heights row (§3.6.4); V02's stepped compositions take V2 §3.10.10's stepped line \| V11 \| …", its owner cell `V11`. |
| SCC-82 | minor | V12 | undefined term | V12 §2.6 (l. 588) types `method: 'measure' \| 'tune' \| 'panel' \| 'corpus'`, and no text says what `tune` means or which lines use it; V2 §3.10.10's `FM` line writes "`reference` run against Fantasy Manor at M6c" in its method cell (l. 1949), and V12 §3.7.1 (c)'s item-34 cells are reference runs too. | V12 §2.6's `method` comment: "`'tune'` — confirmed by a `reference` run against the entry's own reference (V12 §3.7.1 (c): V02 §3.10.8's `FM` entries at M6c, item 34's cells at M0, V07's `@VG` entry at V-M4), its accepted value the confirmation, a rejected run applying the entry's fallback"; §3.11's column sentence: "a line whose method is a `reference` run writes `method: 'tune'`". |
| SCC-83 | minor | V12 | exit rule against a `notApplicable` metric | V12 §2.1 (l. 353–358) makes every `frame.*` member `notApplicable` before M-CAL, and the exit rule (l. 1913–1916) confirms an entry "when every `bar.` metric it names passes and every other metric meets the condition its line states". V11 §8's lines (l. 3733, 3735, 3737, 3738) and V12's items 103–107 line name `frame.*` beside the M1 or M2b metrics that confirm them first; read strictly, no such entry can be confirmed at M1 or M2b, and it goes overdue at its due milestone. | The exit rule adds: "a `frame.*` metric is read only at the `corpus` stage (M-CAL); at an earlier exit it is not read and does not hold the entry back, and its row is appended at M-CAL". |
| SCC-84 | minor | V06 | restated V11 values (SCC-69's class, left at two paragraphs) | V6 §3.19.2 (2) (l. 2569): "V11 §3.18's `aqueduct.disuseAfterYears` (30; SCC-14)"; §3.19.4 (3) (l. 2662–2664): "`retaining.stretchM` (20 m; terrace walls fail in short slumps)", "`retaining.holdM` (10 m)", "`retaining.neglectAfterYears` (30)". V6 §2.2 (l. 623–625) now says these are V11 §3.18's cells, "their values V11's, SCC-69". Values agree today. | Drop the four numbers, keeping "terrace walls fail in short slumps" as the reason; each cell cites V11 §3.18. |
| SCC-85 | minor | V02 | a parity-neutral value the zeroing breaks | V2 §3.2 (l. 1048) and §3.10.9 (l. 1916): `sunBias` 0.7, `extension`, "0.5 in the `MFCG`, `FTG` and `FM` presets, where the coin is byte-identical to the unbiased one". By V11 §2.2's order (l. 336–339) a zeroing preset with no entry gives an extension number 0; V02 states no `presets.VG` entry, so under `VG` `sunBias` resolves to 0 and the coin weights a sun-facing option by 0 and a shaded one by 1 — the reverse of item 102 (d) — wherever an L, T, U or tower house draws at a village rung under `VG`. V02's `MFCG` and `FTG` entries state no provenance, while V11 §2.2's rule (a) gives such parity-neutral entries `own` with a `fixed:` note (only the `FM` entry's `ref:… (code)` is stated, V2 §3.10.10 l. 1950). | V2 §3.2 and §3.10.9's `sunBias` row: "0.5 in the `MFCG`, `FTG`, `VG` and `FM` presets"; §3.10.9 adds "the `MFCG`, `FTG` and `VG` entries `own`, note `fixed: the parity neutral` (V11 §2.2's rule (a)); the `FM` entry code-read (V2 §3.10.10)". |
| SCC-86 | minor | BASE-F | base change request lagging its readers | File f item 575 (l. 162) splits §11.1's wall LineStrings "per run of equal condition" but states no property on a run — item 447 gives its retaining runs `wall` and `run` — and is *Needed by* V05, V06 only, though V12 §2.2 merges the runs by the enceinte's `id` and T-V12-4 reads them (V12's own §12 marks that reading PLAUSIBLE, with a base change request as its fallback). Item 291 (BCR-V6-26) is *Needed by* V04, V06, though V11 §3.18 cites its persistence rows and V12 §3.11 registers its cells (owner `base`). | Item 575's note: "each run's LineString carries its enceinte's `id` (§11.1's entity address) and `run`, its ordinal from the trace's first vertex, as item 447's retaining runs do"; *Needed by* V05, V06, V12. Item 291: *Needed by* V04, V06, V11, V12. |
| SCC-87 | minor | V07 | switch policy (SCC-67's sibling) | V07 §2.2 (l. 535–536): "every cell calibratable"; §2.2a's `terrace` row (l. 680) holds the village's own `enabled` switch (on; off under `VG`) — the switch V12 registers the village no-op pin with (l. 2725) — and `vg.emptyRoadPrune`, `vg.fieldOneHouse`, `vg.orchardOnHouse` and `vg.forestMode` are switches or modes. V11 holds that a switch is `calibratable: false` (J-V11.75, T-V11-37), since a calibratable cell is one a run may name (V12 §3.7.2 (1)), and V12 §3.11 registers no switch (SCC-68). | V07 §2.2: "the switch and mode cells — `terrace.enabled` (§2.2a), `vg.emptyRoadPrune`, `vg.fieldOneHouse`, `vg.orchardOnHouse`, `vg.forestMode` — carry `calibratable: false` (V11 J-V11.75)"; T-V7-44's compile clause refuses a calibratable switch, as T-V11-37 does; a J-V7 row. |

## 3 Table and calibration census, round 3

**Tables read across the seam.** Every table V12, V02 and V06 read in V11's content system exists in V11 §3.1's registry
with its rows; the round-2 census (its §2) holds, with these changes:

| reader | table / cells | V11 home (registry row) | status |
|---|---|---|---|
| V12 §3.11's lines | file g's rows (7, 9, 14–15, 17, 19, 24, 27, 33–37, 43, 46, 50, 58, 58a, 59, 71, 78–85) | V11 §2.3–§2.8c, §3.3–§3.24 | present; items 109–110 bound column by column with a catch-all; items 103–107 and 106 bound only by named families (SCC-76); the stepped line doubles V02's (SCC-81) |
| V12 §2.5–§2.6, §3.7.2 (3) | the preset entries (`presets.FM`, `presets.VG`) and their register targets | V11 §2.2 (`PresetId`, `PresetEntry`; row 73) | present and typed (SCC-51 fixed); V11's own entries `fixed:`; the `VG` requirement's scope unwritable (SCC-77, SCC-79); V07's `VG` run undefined (SCC-78, SCC-80) |
| V12 `NoRegressionSpec.off`, §2.13's pins | the web's off form; §3.24.0's switch table | V11 §3.7.4, §3.24.0 (rows 36, 19, 78, 80, 82–84) | present; the compile now checks every off form under each zeroing preset (V11 §3.2.1 step 4) |
| V12 §2.2, T-V12-4 | retaining and wall exports per run (file f items 447, 575) | the base (§11.1 as amended) | V12 merges on read; item 575's per-run properties unstated (SCC-86) |
| V06 §2.2 `tables/evolution.json` | V06's own rows; 11 columns and the `calamities` set non-calibratable | V11 row 60 ("written (V06)") | present; every calibratable column has a V6 §8 line (checked column by column against V6 §2.2's 71 knob names) |
| V06 §3.9, §3.18, §3.19 | `siting.web`, class `profile`, `dossier.ladders`, `CatacombRule`, the structures block, `raisedWays`, `deck` | V11 §3.7.4, §3.12, §3.23.8, §3.18, §3.24 (rows 17, 36, 46, 58a, 66, 80, 82) | present; values cited, except §3.19.2 (2) and §3.19.4 (3) (SCC-84) |
| V02 `composition.json` | V02's own rows with `presets.FM` entries | V11 row 39 ("written (V02)") | present; every family has a V2 §3.10.10 line; `sunBias` lacks its `VG` neutral (SCC-85) |
| V02 §3.10 | 35 template families, `roleKeys`, `HeightsRow`, `DigRule`, `roster.specialisations`, `deck`, `deck.landmarks`, V07's `v.` keys | V11 §3.6, §3.23.7, §3.24.3–§3.24.4; V07 §2.4 compiled by V11 (rows 5, 17, 58a, 82–84) | present |

**Calibration census.** The register now has a writer for every volume that ships calibratable cells across this seam
(V11 §8 C1–C8, V02 §3.10.10's four milestones, V06 §8's E1–E8, the base cells by the seat landing their request) and a
metric for every line (catalogue ids, `siting.<spec>`, `bar.<barId>`, `frame.<table>.<column>`). Three joints remain:

1. **The bars' registrations.** `bar.<barId>` resolves only to a registered bar; V12 asks the owners to register theirs
   (X-V12-15), and none of V02, V06 or V11 says it does — nor can anyone register the base's T16-4 without a named seat
   (SCC-73, SCC-74, SCC-75).
2. **The lines' completeness.** File g's items 103–107 and 106 lines leave most calibratable columns of `siting.web`,
   `siting.custom`, the goods and the wall barrier rows unbound (SCC-76); the stepped line binds V02's cells twice (SCC-81).
3. **The `VG` layer.** V11's compile now requires `VG` entries on every categorical option cell from V-M0, with writers
   only for V11's five cells; V07 does not yet know it writes them; and V12 plans a `VG` tuning run on cells V07 never
   defines (SCC-77 – SCC-80, with SCC-87's switch policy).

## 4 Disposition by owning volume (round 3)

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V07 | 0 | 2 | 1 | SCC-78, -79 (major); SCC-87 (minor) |
| V11 | 0 | 2 | 0 | SCC-75, -77 (major) |
| V12 | 0 | 1 | 4 | SCC-76 (major); SCC-80, -81, -82, -83 (minor) |
| V06 | 0 | 1 | 1 | SCC-73 (major); SCC-84 (minor) |
| V02 | 0 | 1 | 1 | SCC-74 (major); SCC-85 (minor) |
| BASE-F | 0 | 0 | 1 | SCC-86 (minor; file f items 575, 291) |
| **total** | **0** | **7** | **8** | 15 findings (SCC-73 – SCC-87) |

Round 2's 22 are all fixed. No blocker: every new defect closes inside one volume or one file-f note, and none stops a
milestone from starting — each would stop a milestone's **exit** (a red register lint or compile), which is why the seven
are major. **Grouped for the lanes:** the bars' registrations — SCC-73, -74, -75 (each owner's register paragraph, one
sentence and one §1b row); file g's register lines — SCC-76, -81, -82, -83 (V12 §3.11 and §2.6, one lane); the `VG` layer —
SCC-77 (V11), SCC-78, -79, -87 (V07), SCC-80 (V12, after V07's choice); restatements and base notes — SCC-84, -85, -86.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED by reading** (the lines cited in each row, in the files at the md5s of §0) **and by executed script** (§0: 506
cross-volume section citations and 229 cross-cited ids resolved; every metric id the owners' register lines name found in
V12's catalogue; every `bar.<id>` of V2 §3.10.10 and V6 §8 matched against X-V12-15; the greps for `BenchBarDef`,
`StatBarSpec` and `NullModelSpec` in V02, V04, V06, V07, V11 and the base, 0 each; V6 §2.2's 71 knob names matched against V6
§8's lines and its non-calibratable paragraph): the 22 re-checks of §1; SCC-73 (V12 l. 346–351, 1905–1907, 2726–2731; V6
l. 3216–3235, 3880), SCC-74 (V2 l. 1937–1960, 4242), SCC-75 (V11 l. 3726, 3734; V12 l. 1844), SCC-76 (V12 l. 1841–1842,
1853–1855, 2811–2812; V11 l. 1607, 1698–1714, 2338, 2643–2650, 2788–2800, 3724–3725; the V12 greps), SCC-77 (V11 l. 292,
827–833, 3744–3747; base l. 8934–8937; V07's BCR-V7-13), SCC-78 (V07 l. 535–536, 598, 2943, 2960, the "tuning" and
"register" greps; V12 l. 1468, 1485–1493), SCC-79 (V11 l. 3744–3747; V07 l. 2938–2939), SCC-80 (V12 l. 1468, 1488–1490,
2810), SCC-81 (V12 l. 1886; V2 l. 1938, 1951), SCC-82 (V12 l. 588; V2 l. 1949), SCC-83 (V12 l. 353–358, 1913–1916; V11
l. 3733–3738), SCC-84 (V6 l. 623–625, 2569, 2662–2664), SCC-85 (V2 l. 1048, 1916, 1950; V11 l. 336–345), SCC-86 (file f
items 575, 447, 291; V12 §2.2, §12), SCC-87 (V07 l. 535–536, 680; V12 l. 2725; V11 J-V11.75, T-V11-37).

**PLAUSIBLE**: that the required changes are the owners' best mappings — in particular SCC-78's new cell
`rules.race.densityPower` (V07 may instead state that V-M4 runs no tuning at all and route risk (2)'s fallback to its fix
list), SCC-77's reader-set scope for `VG` (V11 may instead resolve an unlisted categorical cell under `VG` by another stated
rule, through a note on BCR-V7-13), SCC-79's value rule for the village-read categorical cells, SCC-75's choice of a
`paired` `StatBarSpec` for T-V11-30, and SCC-76's list of rows (V11 may mark some of those cells non-calibratable instead);
that SCC-77 fires on cells beyond `cut.bendMode` (which categorical option cells other volumes hold is not enumerated in any
text read here); and that SCC-85's reversed coin shows on a map (it needs a mirror-coin family to draw at a village rung
under `VG`, where V07 lays VG's house rectangles). The parts of the four volumes that did not change since round 2 and lie
outside the sections re-read whole in §0 were swept in rounds 0–2 and here only by the scripted citation, id and metric
checks; a defect in that unchanged text that no changed text touches would not have been re-found this round.

## 6 Continuation (2026-09-29 10:56 –, re-issued task)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-content-calibration-r3 (continuation); covered by the whole-design retrovalidation (J84).

### 6.0 Why a continuation, inputs, method, decisions

**Why.** The workflow re-ran this lane. §0–§5 above landed at 06:54 and cover what this round's brief then held: round 2's
SCC-51 – SCC-72 re-checked (§1) and a sweep (SCC-73 – SCC-87). They stand as written and are returned as written (the
resume rule). The brief's "previous round" file, `seam-content-calibration-r2.md`, gained a continuation at 10:12 (§7 there)
with seventeen findings, **SCC-R2C-1 – SCC-R2C-17**, which no seam round has re-checked. This continuation re-checks each in
the live text at every volume its required change names (§6.1) and sweeps the one repair surface no seam round has read:
every change since the round-2 continuation's inputs, made by the third-brief reconcilers — the continuations of
reconcile-V01, -V02, -V03, -V04, -V05, -V06, -V07, -V08, -V09, -V10, -V11, -V12 and -BASE-F-r3, landed 10:24–10:55 (V12's
marked edit of file f item 497 at 10:44 among them).

**Inputs** (md5, lines; snapshots in `scratchpad/volumes/sccr3c/now/`): V01 925e51b5… (4 052), V02 0c432111… (4 719), V03
e83ffac3… (3 434), V04 fed9e0c2… (3 896), V05 a60dbcc9… (3 649), V06 c1499809… (4 295), V07 bb68ff1b… (4 043), V08
594909a3… (3 614), V09 a843d0a3… (4 542), V10 9e3fdbd3… (3 656), V11 cd7e6c42… (4 778), V12 013d6f78… (3 149), file f
b4546425… (1 526), `_integrate` 965ab696… (468, unchanged), file g 8df8841b… (unchanged), base 01fea21f… (unchanged since
round 0). No lane editing these files was open when this continuation started (the last, reconcile-V10-r3, landed at
10:55); seam-surfaces-r3 and seam-stage2-3-r3 run beside it and write only their own critique files.

**What was read, and how.** The pre-repair texts exist as verified snapshots (`sccr3c/pre/`): the round-2 continuation's
inputs V11 8b4ca3f9, V12 d4e8c1a4, V02 bd45a3b4, V06 22519528, V07 91b15f53, V10 e737f403 and file f ae1bb8ca
(`sccr2c/now/`), and the reconcilers' own backups V01 7ba65e0b, V03 1bf49bc9, V04 7d89f86a, V05 5bc1289c, V08 a2bdf6d3, V09
4d08c4fa. The thirteen diffs (`sccr3c/*.diff`: V01 98 lines, V02 148, V03 357, V04 158, V05 85, V06 77, V07 201, V08 253, V09
178, V10 173, V11 206, V12 165, file f 127) were **read whole**. Around them, read at source in the current text: V12 §3.11
whole, §2.1's `PresetArm` and `BenchBarDef`, §2.6's `CalibrationEntry`, §3.5 steps 2–3, §3.9.1's panel table, §3.10.1,
§8.1–§8.2, X-V12-15 and X-V12-16; V11 §2.1 (`ColumnSpec`, `TableSchema`), §2.2 (`PresetId`, the source cell, the preset
entries), registry rows 17, 38, 39, 46, 51, 56–62 and 73, the *Readers* paragraph, §3.2.1 steps 1–7, §3.2.2, §8 whole;
V01 §1b's rows, §2.2's table types, V1-3.15, V1-8.1 with its register paragraph, BCR-1, BCR-32 and cross-volume note (31);
V03 §2.4's register lines, the `circulation` note of its programme table, §8's PE row, J-V3.116 – J-V3.118 and its §13
hand-offs; V04 §8's register paragraph, BCR-12 and BCR-13; V05 §8's register paragraph and §13 item 29; V06 §3.2's phase
table; V07 §2.2's epoch rows, §8's register paragraph and §1's dependencies (10)–(11); V08 §2.6's header and row sets,
§10's BCR-V8-10, X19, X20 and §12; file f items 207, 233, 241, 301, 323, 345, 386, 497, 505, 510 and 578; the base's *One
capacity function* (§2.6), §13.7's item-28 row and every `NG` and "parity preset" mention (grep).

**Scripts** (`sccr3c/`): `cites.py` (the round-2 continuation's script, run over the thirteen diffs) resolved every
cross-volume section citation in the added lines (666) and every cross-cited T-, J-, X- and BCR- id (981) against the live
volumes — 0 missing, 0 suspect; `tcensus.py` collected every table id and `.json` name the twelve volumes and file f use in
a table phrase (62) and matched each against V11's registry rows — among content tables only `way.surface` and
`squares.quota` have no row (the other ten are V12's harness files and fixtures); greps: `register --check` (V01 4, V03 5,
V04 11, V05 5, V07 8 hits), `BenchBarDef` (V02 6, V03 6, V06 7, V11 7), the preset vocabulary (`PresetId`, `presets.NG`,
"`NG` preset") in V01, V11, V12, file f and the base, and "M-CAL" and "default line" in V02, V06 and V11 (0 hits each).

**Decisions of this continuation (vetoable).**
* **JC3C-1** — Continued this landed lane for the seventeen round-2 continuation findings and the unread repair surface,
  over returning the 06:54 summary alone, because the resume rule protects landed work and these reached no seam lane — the
  choice the round-1 and round-2 continuations (JC1-1, JC2-1) and every third-brief reconciler made.
* **JC3C-2** — Numbered the new findings **SCC-R3C-1 …**, over SCC-88 onward, because round 4's re-run starts at SCC-88
  and the earlier continuations used SCC-R1C-n and SCC-R2C-n.
* **JC3C-3** — Did not re-check this round's own SCC-73 – SCC-87 as a list (round 4's re-run owns them, as JC1-2 left
  them), but read every repair since the round-2 continuation whole, so a repair that broke one would surface here.
* **JC3C-4** — Raised defects in volumes outside the seam's four where they reach the content system's registry, its preset
  vocabulary or the calibration register (V01's `NG` preset and its two unregistered tables, file f's labels for them, V03's
  register lines, V04's and V07's register paragraphs, V08's hand-off), each under its own owner so every half reaches a
  lane (JC2-3).
* **JC3C-5** — Scoped the file-f labelling finding (SCC-R3C-5) to the items that carry V01's tables or their readers (207,
  301, 505) and V01's future `NG` request, naming items 323 and 345 as the same sweep, over one finding per item, because
  one BASE-F lane re-labels them together against V1-8.1.

### 6.1 Re-check of round 2's continuation findings (SCC-R2C-1 – SCC-R2C-17)

| id | owner (halves) | status now | evidence (current text) |
|---|---|---|---|
| SCC-R2C-1 | V08 | **FIXED**; its found-in-passing row set lags in file f (new SCC-R3C-10) and its hand-off is stale (SCC-R3C-11) | V08 §2.6's header l. 737–740 (`calibratable: false`, a table fix, T-V11-37), `cultures` l. 869, `relations` l. 932, `calamitySeverity` l. 970, J-V8.26 l. 2725, J-V8.107 l. 2806, T-V8-18's compile clause, §12 l. 3246–3258 (`calibratable` kept only for V11's `siting.web.chainStatus`, J-V8.49); `customWeights` added as a non-calibratable row set (J-V8.108) and listed in BCR-V8-10 (l. 2936–2937) |
| SCC-R2C-2 | V11 (V04) | **FIXED** at both ends | V11 row 63 l. 832 (`sanitation`, `subterranean`, `owner` `'V04'`, rows home V4 §2.3a, readers `port.digest` and `@plat/app`), the row-set paragraph l. 864–865, T-V11-1 (a) l. 3747, W73, §2.10's row, J-V11.83; V4 §1b.1 l. 359 "not calibratable" |
| SCC-R2C-3 | V07 | **FIXED** | V07 §2.1's participants comment l. 501–504 (`stage: 'VS1'`, `'VS2'`), §3.12 l. 2288, 2294–2299, 2406, §3.14 l. 2533–2535, W28 l. 376, T-V7-14 l. 3032, J-V7.122 — equal to V6 §2.1 l. 507, §3.16 l. 2186–2191, W3 l. 383 and X43, and to V11 row 61's readers |
| SCC-R2C-4 | V12 | **FIXED**; X-V12-16 now stale (SCC-R3C-12) | V12 §3.11's default line l. 1893–1898 (V03 in, V08, V09, V10 out, rows 63–66 and 86–89 non-calibratable), X-V12-16 (addressing V01, V03, V04, V05, V07), J-V12.71 amended |
| SCC-R2C-5 | V12 | **FIXED** | (a) l. 1887–1890 (only columns holding a compiled cell; an empty table's none), §2.11's row l. 843, §4.2's verb, T-V12-20's clause; (b) l. 1880–1883 (the source manifest's author seat, the first `rowsHome` between two writers, never moved), the lint l. 1980–1982, J-V12.73; V11 §3.2.1 step 1's manifest names each file's author seat (l. 885) |
| SCC-R2C-6 | V12 (file f) | **FIXED**; the spelled-out union lacks V01's `NG` (SCC-R3C-6) | BCR-V12-2's new text (the row's `preset: 'default' \| 'MFCG' \| 'FTG' \| 'VG' \| 'FM'`), J-V12.74; file f item 497's note l. 832 |
| SCC-R2C-7 | V02 | **FIXED** | V2 §3.10.10 l. 1969–1970 (each setting's `preset` `'default'`), J-V2.105 (c) |
| SCC-R2C-8 | V11 | **FIXED** (a)–(d); the same class remains on rows 38 and 62, and the writer rule stops short of an existing stage's new read (SCC-R3C-7) | §8 l. 3872–3879 (a participant's registered `stage`; a module reader by the seat of its first read), row 57 l. 825 (U-FADE), row 61 l. 830 (S10b), rows 39 l. 807 and 62 l. 831 (`@plat/hood`), *Readers* l. 757–760, §2.1's list l. 321–322, J-V11.85 |
| SCC-R2C-9 | V11 | **FIXED** | V11 §2.1 l. 334–340 (every row from C0, an empty table until its rows-home milestone, *status* unchanged, totality from the first row), §3.1's preamble l. 745–746, §8 l. 3879–3881, §2.10's row l. 709, J-V11.84; V12's `--defaults` follows it (SCC-R2C-5 (a)) |
| SCC-R2C-10 | V11 (V08) | **FIXED** at both ends | V11 §2.8c l. 633–634, §3.24.2 l. 3418–3422, §3.24.7 (4) l. 3604–3606, W74, J-V11.86; V08 DR-V8.8 l. 1128, §1b l. 306 and 363, T-V8-38, J-V8.70 REVISED; V12's `raisedWays` line l. 1954 names the cell |
| SCC-R2C-11 | V06 | **FIXED** | V6 §3.16 l. 2186–2191 (`SKY`, `S9b`, `U-FADE`, `VS1`, `VS2`; the adapters' own draw on `EVO_UNDER`), §2.1 l. 507, §3.2's head l. 1008, W3 l. 383, J-V6.79 amended, X43 |
| SCC-R2C-12 | V07 (V11) | **FIXED** at both ends; V07 §1 (11) still calls V11's half pending (SCC-R3C-14 (b)) | V07 §3.15 (3) l. 2576–2583, W67 l. 415, V-M2u's row l. 3099, J-V7.123; V11 §8 l. 3859–3864, J-V11.87 |
| SCC-R2C-13 | V01 | **FIXED**; its register paragraph cites a replaced owner rule and names two tables V11 does not register (SCC-R3C-9 (b), SCC-R3C-4) | V1-8.1's *The register at every exit* l. 2890–2907, §1b's row l. 397, W11 l. 2925, J-V1.97 with its fallback |
| SCC-R2C-14 | V04 | **FIXED**; two wordings lag V11's empty-table rule and the default line's due (SCC-R3C-13) | V4 §8's exit cells l. 2704–2711, *The register at each exit* l. 2719–2763 (the plan by step, the due steps, the pre-decided moves), §1b.1 l. 373–374, J-V4.117, J-V4.118; V12's `under.openings`, `under.dig` and `sourceWeight` lines now due at U3b and U4 (l. 1941, 1943–1947) |
| SCC-R2C-15 | V05 | **FIXED** in V05; its V12 half (V5 §13 item 29) reached no lane (SCC-R3C-1) | V5 §8's P1 and P2 exits l. 2666–2667, *The register at the exits* l. 2692–2709, §1b l. 344, §2.4's intro l. 638–641, J-V5.80 |
| SCC-R2C-16 | V07 | **FIXED**; one wording lags the empty-table rule (SCC-R3C-14 (a)) | V07 §8's six exit cells l. 3096–3101, *The register at the exits* l. 3104–3135, W69 l. 417, §2.6's row l. 1091, J-V7.124 |
| SCC-R2C-17 | V03 (V12) | **FIXED** at both ends; its rationale meets the capacity's inputs (SCC-R3C-8), and row 38's readers stay short (SCC-R3C-7 (a)) | V03 §2.4's opening l. 557–559, *The register lines of `roomProgram.json`* l. 922–945, T-V3-35 l. 2378, §8's PE, P1, P2 and P6 exits, §1b's row l. 284, J-V3.118; V12's default line l. 1894, X-V12-15, X-V12-16, §1b's `BenchBarDef` row |

Round 2's continuation in all: **17 FIXED at their owners, every half included.** Ten repairs leave a residue raised anew in
§6.2 under its own owner: SCC-R2C-1 → SCC-R3C-10, -11; SCC-R2C-4 → SCC-R3C-12; SCC-R2C-6 → SCC-R3C-6; SCC-R2C-8 →
SCC-R3C-7; SCC-R2C-12 → SCC-R3C-14 (b); SCC-R2C-13 → SCC-R3C-4, -9 (b); SCC-R2C-14 → SCC-R3C-13; SCC-R2C-15 → SCC-R3C-1;
SCC-R2C-16 → SCC-R3C-14 (a); SCC-R2C-17 → SCC-R3C-7 (a), -8.

### 6.2 New findings (SCC-R3C-1 onward)

| id | sev. | owner | kind | claim (with evidence) | required change |
|---|---|---|---|---|---|
| SCC-R3C-1 | major | V12 | unwired due (the default line for a column that lands after M-CAL) | V12 §3.11's default line fixes `due` M-CAL (l. 1883); the lint fails a `line: 'default'` entry whose due differs (l. 1980–1982) and refuses a due other than M-CAL for an entry of `frame.*` metrics alone (l. 1996–1999); at an exit an entry still `provisional` past its due fails the exit (l. 2001–2003). Yet M-CAL opens after M4, M5, M6 and V-M4, and "the sky and underground layers and the evolution engine join by later runs of the same process as they land" (§3.10.1 l. 1731–1733; J-V12.21 "the staged layers may land much later"; §8.1), V04's BCR-13 builds M6-U "after M5 or beside it", and V04 and V05 put their columns on the default line (V4 §8 l. 2719–2752, "M-CAL for the default line"; V5 §8 l. 2692–2709). A layer column whose first cell lands after M-CAL's record is committed gets an entry due at a milestone already past, so its own landing exit fails, and no admissible due exists for it. V05 named exactly this as V12's half (V5 §13 item 29, l. 3509–3513); V12's continuation (landed 10:49) did not take it. The same §3.10.1 sentence says those layers' cells "are already register entries with `method: 'corpus'`", which V06 contradicts: V6 §8's lines are `measure` and `panel`, and no V06 line or default entry names M-CAL (0 hits). | V12 §3.11's default line: "`due` M-CAL — or, for a column whose first compiled cell lands after M-CAL's `ReconciliationRecord` is committed, the later run of the corpus process that takes its layer (V12 §3.10.1), milestone id `M-CAL/<layer>` (`M-CAL/sky`, `M-CAL/under`, `M-CAL/evolution`), which `--defaults` writes from the landing change's milestone"; V12 §2.8's milestone ids admit the form; the lint's due clause and its `frame.*`-only clause accept that id for such a column; T-V12-20 gains the clause (a fixture layer column landing after a committed M-CAL takes `M-CAL/<layer>`, and its landing exit passes); §3.10.1's parenthetical reads "their tables' calibratable cells already hold register entries — the default line's `corpus` entries, due at their layer's run, and the named lines' at their own steps; V06's lines carry no corpus stage (V6 §8)"; a J-V12 row. V5 §13 item 29 then closes; V04's sentence follows (SCC-R3C-13). |
| SCC-R3C-2 | major | V11 | unwired preset (V01's `NG`; the compiler refuses it) | V11 §2.2 types `PresetId = 'MFCG'\|'FTG'\|'VG'\|'FM'` (l. 353) and the source cell's `presets` and `ext.over` over those four (l. 357–358); registry row 73 holds the same four (l. 842); §3.2.1 step 4 stops the build on "a `presets` key or an `ext.over` value outside `PresetId`" (l. 902); V11 §8: "The source type admits all four `PresetId` keys from C0" (l. 3851). V01 ships a fifth: "Every `hood.*` table below and `squares.quota` carries §7.6's per-preset cells: the `default` value, and the `MFCG`, `FTG` and `NG` preset values where they differ" (V1 §2.2 l. 465–467); V1-3.15 fills an `NG` column of `ref:NG 1.2.2 … (code)` cells in every stage-2 table (V1 §1b l. 396; J-V1.41), and T-V1-31 and T-V1-32 "run under `NG`". The first compile carrying an `NG` entry stops — at M5 at the latest (the `hood.*` column), at M2b if `squares.quota`'s `NG` values differ (V1-8.1). | V11 §2.2's `PresetId`, `SourceCell.presets`, `ext.over`, registry row 73 and §8's preset paragraph admit `NG` as V01 states it (SCC-R3C-3) — by default a zeroing parity preset read by V01's NG harness and panel, resolving a cell by its own `presets.NG` entry, else as the cell resolves under `MFCG`; §3.2.1 step 4 requires `NG` entries only on `presetsRequired` cells of the tables whose readers include a V01 stage (S7c, S8.seed, S9b, its S13a step) or `@plat/hood`, the rest resolving through `MFCG`, and checks `web.off` and the switch table under `NG` as under `MFCG`; T-V11-0's and T-V11-9's preset clauses name it; a W row and a J-V11 row. |
| SCC-R3C-3 | major | V01 | unregistered mechanism (the `NG` preset) | V01 builds `NG` into every stage-2 table and `squares.quota` (V1 §2.2 l. 465–467; V1-3.15; J-V1.41), runs its parity bar and panel under it (T-V1-31, T-V1-32) and tunes its metre readings on the NG pairs (V1-3.15's `ng.plazaM2`; V1-8.1's register paragraph, W17). But no request of V01 §10 registers `NG` in §7.6's parity presets — BCR-1 only lists `@plat/tables`' stage-2 tables "each with its `NG` preset column" (l. 3102–3104) — the base knows NG only as a reference (§13.5's `reference: 'NG'`, §13.6 (2)), file f registers `FM` and `VG` (items 376–377) and no `NG`, and V01 never states how a cell without an `NG` entry resolves (by `MFCG`'s zeroing, or the default), which categorical cells need an `NG` entry, or how an `NG` entry of provenance `own` (the tuned metre readings) takes its register entry. A builder of M5 holding the base and V01 cannot resolve a town under `NG`. | V1-3.15 states `NG` in §7.6's terms: its kind (a zeroing parity preset), its resolution (a cell's `presets.NG` entry, else the cell's `MFCG` resolution — so no base table needs an `NG` entry), its scope (read by the NG harness and the M5 panel only; entries on V01's tables and `squares.quota`), and each entry's provenance (`ref:NG … (code)`, or `own` with a register entry `…@NG` — method `measure` on the NG pairs at M5, V12 §2.6 as SCC-R3C-6 widens it); V01 §10 gains a request adding `NG` to §7.6's parity presets, as BCR-V2-14 and BCR-V7-13 add `FM` and `VG`; a J-V1 row. (Or V01 drops the `NG` column and states NG's rules as a recipe profile outside §7.6, V1-3.15, J-V1.41, T-V1-31 and T-V1-32 saying so.) |
| SCC-R3C-4 | major | V11 | unwired tables (not in the content system) | V01 lands two tables at M2b (V1-8.1 l. 2874–2877; J-V1.39): `way.surface` (`SurfaceRow`, V1 §2.2 l. 527; rows home V1-3.7.3; read at S10a's end by the way-surface rule, l. 1572) and the base table `squares.quota` (`SquareQuotaRow`, l. 496; BCR-32; read by S7b (3) and, from M5, S9b; V1 §1b l. 365–366), names both in `@plat/tables`' list (BCR-1, l. 3103–3104) and puts both under its M2b register check (§1b l. 397; V1-8.1 l. 2894–2895). V11's registry has no row for either (0 hits in V11; `tcensus.py`: the only two content tables named anywhere without a row); row 62 holds `hood.*` and `fabric.select` only. A table outside the registry cannot load (V11 §2.1), T-V11-1 (a) fails, and V12's lint and run scope never reach their cells. V01 raised it (cross-volume note (31), l. 3612–3621). | V11 §3.1 gains two rows: `way.surface` (file `way/surface.json`, `SurfaceRow`, rows home V1-3.7.3, reader S10a, owner `'V01'`, `written (V01)`; its `surface` an enumeration, not calibratable, so it takes no register entry) and `squares.quota` (file `squares/quota.json`, `SquareQuotaRow`, rows home §4.5 S7b (3) and §4.7 S9 as BCR-32 words them, readers S7b and S9b, owner `'base'`, `parity: 'perPreset'` with the `MFCG`, `FTG` and `NG` cells, its `haPer1000` and kind factors calibratable); the catalogue count ("ninety") moves wherever it is stated; T-V11-1 (a)'s grep names both; a W row and a J-V11 row. |
| SCC-R3C-5 | major | BASE-F | base change requests lagging their reader's milestones (V01's early pieces) | V1-8.1 (l. 2867–2885) lands pieces of V01's requests inside the base's milestones "because the base reads them or its goldens would otherwise shift twice": at M1 the schema and the reserved `S8.seed` id (BCR-31); at M2b `Way.slopeP95` and the way-surface rule (BCR-6), the S7b and S10a hook points (BCR-26) and the base table `squares.quota` that S7b (3) sizes its square claims from (BCR-32; J-V1.39); at M3a item 110's pieces. File f labels every V01 item outside item 110's **STAGED (M5, stage 2)**: item 207 (BCR-6), 301 (BCR-32), 323 (BCR-26), 345 (BCR-31), and item 505's V01 line (`@plat/tables` gaining `way.surface` and `squares.quota`) "STAGED (each with its own stage (M5 …))". So the base built at M2b has neither table nor S7b (3)'s reading, V01's M2b content cannot land, and at V01's M2b register check V12's lint fails every entry "for a base cell whose base change request has not landed" (V12 §3.11; SCC-54). V01's note (31) names item 301. No item will carry V01's `NG` request either (SCC-R3C-3). | File f re-labels V01's items by V1-8.1: item 301 **BASE (M2b)** for BCR-32 (a)'s S7b half, (b) and (d), **STAGED (M5, stage 2)** for (a)'s dispatch clause and (c); item 505's V01 line: `way.surface` and `squares.quota` **BASE (M2b)**, the stage-2 tables **STAGED (M5)**; item 207 (BCR-6) **BASE (M2b)** for (a)'s `slopeP95` and the way-surface rule; the same sweep over item 345 (the `S8.seed` id reserved at M1), item 323 (the hook points declared at M2b) and every other V01 request V1-8.1 names at M1–M3a; and, once V01 writes it (SCC-R3C-3), an item carrying V01's `NG` request beside items 376–377, labelled with the milestone of the first `NG` cell; a J-RF row. |
| SCC-R3C-6 | minor | V12 | vocabulary (SCC-R3C-2's V12 half) | V12's `PresetArm = 'default' \| PresetId` (l. 383) follows V11, but four V12 texts spell the presets out: `CalibrationEntry.id`'s suffix "'@FM' or '@VG'" and `target.preset?: 'FM' \| 'VG'` (§2.6 l. 606–607), so V01's tuned `NG` metre readings cannot be registered; §3.5 step 3 names the arms "`MFCG` or `FTG` for P rows, `'default'` for O and C rows" (l. 1207–1209), so T-V1-31's NG rows (and V07's VG and V02's FM rows) have no stated arm; BCR-V12-2's new text and file f item 497's note spell the report row's `preset` as `'default' \| 'MFCG' \| 'FTG' \| 'VG' \| 'FM'` (SCC-R2C-6); T-V12-24 names "the `MFCG`, `FTG`, `FM` and `VG` presets' goldens" (l. 2322). The M5 panel's NG groups (§3.9.1) state no `preset`, though T-V1-32 runs under `NG`. | After SCC-R3C-2: §2.6's id suffix and `target.preset` add `'NG'` (`@NG`); §3.5 step 3 reads "the reference's own preset for P rows — `MFCG`, `FTG`, `NG` (V01's T-V1-31), `VG` (V07's T-V7-23), `FM` (V02's rows) — and `'default'` for O and C rows"; BCR-V12-2's union and file f item 497's note add `'NG'`; §3.9.1's M5 row states `preset: 'NG'` for the NG pairs; T-V12-24 names `NG`. |
| SCC-R3C-7 | minor | V11 | incomplete readers (SCC-R2C-8's class, rows 38 and 62) and the writer rule's reach | (a) Row 38 (`roomProgram`, `interiorLadder`; l. 806) lists only the plan rung, a module reader. The base's *One capacity function* (§2.6) reads the class programme's `circulation` and the `room` form's `RoomRuleRow.area[0]` from this table and is called by S10b's placement, S11's household clamp and the epoch's `relet`s (V6 §3.5.1, §3.6, §3.8); from M2b it also reads `stair.ladder` and `stair.landingCm` (BCR-V3-12; file f item 233); from M3a S11 reads `datum.maxSteps`, `stair.riserCm`, `exposureAllStoreys`, `moduleCm` and `door.mainCm` (`Entrance.storey`, `basementDoor(b)`; items 241, 578); from M5 `@plat/hood`'s entrance reserve calls `basementDoor(b)` (V1-3.8.2 step 5). V03 handed this to V11 (V03 §13's second-brief hand-off). (b) Row 62 (l. 831) lists S7c, S9b, S13a and `@plat/hood`; V01 also reads `hood.templates` in S7b (1)'s reconcile (`templateLandM2`, V1 §1b l. 358) and in S8's seed primitives under `S8.seed` (l. 363, 746 — the id V11's *Readers* paragraph says "stay[s] a StageId", l. 760), `hood.dispatch`'s land in S2's estimate (l. 368), and the template cards and the S4 (b) classifier (l. 364). (c) V11 §8's writer rule (l. 3872–3879) covers a new stage, a participant and a module's first read, not a change that makes a registered stage read a table it did not read (a base change request: BCR-V3-12, BCR-V3-26, BCR-V3-32, V01's BCR-4). T-V11-1 (b) fails on each unlisted pair. | Row 38's readers add S10b, S11 and the phases that relet (EVO_DEPARTURES, EVO_SITING, EVO_GROWTH, as V6 §3.2 runs them) for the capacity, and `@plat/hood`; row 62's add S2, S7b, `S8.seed` (or `S8`, whichever id the loader tags the seed pass with — T-V11-1 (b)'s recorded reads settle it), `@plat/app` and `testkit.bench`; §8's rule adds "and a change that makes a registered stage, phase or module read a table it did not read before — a base change request included — writes that reader in the same change"; a J-V11 row. |
| SCC-R3C-8 | minor | V03 | a register line tunes cells the base's eager capacity reads (against J-V3.118's own reason) | J-V3.118 keeps PE's cells on the default line "because a retune at V3-P6 would shift the capacity, entrance storeys and outside doors built at M2b and M3a". But the base's capacity function (§2.6) also reads the poorest band row's `circulation` ("The poorest row's circulation is the one §2.6's capacity reads", V03 l. 726–727) and the `room` form's area minimum (`minRoomCm2`), and V03 §2.4's register lines put every `RoomRoleRow`'s and override row's `area` triple under `measure` at V3-P6 "after P6's tuning" (l. 938) and `circulation` under the §13.7 item-28 threshold "whose fallback steps a `circulation` cell once" (l. 942; the base's §13.7 row). A P6 tuning or that fallback moves every shell's capacity — the households S10b and S11 have built since M2b — with no declared shift named. | V03 §2.4's lines move the `room` form's area minimum and each class programme's poorest-band `circulation` onto the PE row (the default line), the §13.7 fallback stepping the `circulation` of the band rows the capacity does not read — or V03 states that a V3-P6 move of either is a declared shift of the capacity (T28-13's fixtures and the goldens re-signed with that cause, §13.3); J-V3.118 amended either way. |
| SCC-R3C-9 | minor | V01 | record and rule mismatches with the content system | (a) `hood.constants` is typed as rows `{ key, value, unit, provenance, calibratable, extension }` (V1 §2.2 l. 523–524) — one constant per row, each with its own unit and calibratable flag — while V11's `ColumnSpec` holds one unit and one `calibratable` per column and the compiled cell takes both from it (V11 §2.1; l. 387), and V12 binds a column with one entry (`cal.hood.constants.*.value`): the rows' units never reach the compiled cell, a row marked `calibratable: false` is covered by the column's entry and its corpus run, and V1-8.1's per-row reading ("the four `hood.constants` rows", "a history row to its one entry") gets one entry for every constant. (b) V1-8.1 gives `squares.quota`'s entries "`owner` `base`, by V12 §3.11's `rowsHome` rule" (l. 2895), a rule V12's round-3 continuation replaced with the source file's author seat (J-V12.73). | (a) `hood.constants` becomes one record of named numeric cells — V11's settings form, as `roster.settings` and `raisedWays.settings` are — each V1-3.14 key a column with its `ColumnSpec` (unit, range, `calibratable`, `extensionAllowed`) and its own register entry `cal.hood.constants.*.<key>`, the keys unchanged; (b) "its entries' `owner` `base`, the base's seat writing the table's source file (V12 §3.11's owner rule, J-V12.73)". |
| SCC-R3C-10 | minor | BASE-F | request lag (`customWeights`) | V08's continuation added the dossier row set `customWeights` (V08 §2.6, J-V8.108), wrote it into BCR-V8-10's list (V08 §10, l. 2936–2937), and V11 registered it (row 63). File f item 510 applies BCR-V8-10 and BCR-V11-4 "once" by its own consolidated list (l. 873), which lacks `customWeights`, so the base's §14 item 7 would name every row set but this one. | Item 510's list gains `customWeights` after `materials`, as BCR-V8-10 orders it, citing J-V8.108. |
| SCC-R3C-11 | minor | V08 | stale hand-off | V08's X19 (l. 3313) reads "OPEN until V11's text holds them" for `elevated.landmarkMinSignificance` and `customWeights` in row 63, and §12's continuation paragraph keeps them PLAUSIBLE "(open until those lanes land)" (l. 3239–3240); V11's continuation landed both at 10:48 (V11 §3.24.2 l. 3418–3422; row 63 l. 832). (X20 is V09's, outside this seam.) | X19 **CLOSED**, citing V11 §3.24.2 and row 63; §12's sentence moves V11's half to CONFIRMED. |
| SCC-R3C-12 | minor | V12 | stale hand-offs | X-V12-16 still reads as a request — "Until a volume's §8 says so, the default line binds its columns anyway …" — and offers V04 and V07 lines "in V2 §3.10.10's form … (V04's T-V4-45, T-V4-62, T-V4-68; V07's village bars)"; all five volumes now carry the clause (V1-8.1; V03 §2.4 and §8; V4 §8; V5 §8; V07 §8), V01, V04, V05 and V07 chose no line of their own (J-V1.97, J-V4.117, J-V5.80, J-V7.124), and V12's own `under.ruin` line says T-V4-62 "reads the span-rule line's cells, not these" (l. 1942). X-V12-15 says V2 §3.10.10 writes "no parity preset", where it now writes `preset 'default'` (SCC-R2C-7). | X-V12-16 marked met, naming each volume's paragraph, that V03 writes its §2.4 lines and the four others none; T-V4-62 dropped from its list; X-V12-15's V02 clause reads "V2 §3.10.10 writes `preset: 'default'`". |
| SCC-R3C-13 | minor | V04 | wording against V11's empty-table rule and the default line's due | V4 §8's register paragraph: a table "lands whole, every column, in the first step whose change compiles it", and "a table that compiles in an earlier step than planned below takes its entries in that step" (l. 2724–2726); V11 §2.1 compiles every registry row from C0 as its schema's empty table (J-V11.84), and V12's `--defaults` writes no entry for an empty table's column (SCC-R2C-5 (a)), so the entries follow a table's first rows, not its first compile. *The due steps* give the default line's entries "M-CAL" (l. 2752), which fails for a step landing after M-CAL (SCC-R3C-1). | "compiles" → "first ships rows (holds a compiled cell; V11 §2.1's empty-table rule)" in both sentences and the table's header; "M-CAL for the default line" → "the default line's due (V12 §3.11: M-CAL, or the underground's later corpus run when a step lands after M-CAL; SCC-R3C-1)". |
| SCC-R3C-14 | minor | V07 | wording and a stale dependency | (a) V07 §8's register paragraph: "a table or column that compiles in an earlier milestone than planned below takes its entries there" and its table header "first compiled here" (l. 3109, 3119), against V11 §2.1's empty-table rule, as SCC-R3C-13. (b) V07 §1 (11) (l. 335–338) still reads "V11 — pending: §8's preset-entries paragraph says in one clause …"; V11 landed it at 10:48 (V11 §8 l. 3859–3864, J-V11.87). | (a) As SCC-R3C-13's first half; (b) (11) marked landed with V11's anchors, its fallback withdrawn. |
| SCC-R3C-15 | minor | V11 | a loader premise that fails at village epochs (`VG`) | V11 §3.2.2: "under `VG` the preset step resolves the village-read tables only … any other table entering the view without it, since no stage a `VG` document runs reads it" (l. 943–944). But a village runs epochs (V07 §3.12; V6 §3.2 at a village rung), whose `EVO_*` phases read `evolution.json`, `decline.json` and the other epoch tables — not village-read, since `productStages.village` holds no `EVO_*` id (V11 §3.2.1 step 1) — and V06 states cells "0 in the parity presets" there (`decline.turnoverVacancy`, l. 630, 1554; the splits, l. 1832; the fire-ordinance row, l. 1954). Evolved under `VG`, those cells enter the view at their defaults, not zeroed. | §3.2.2's clause: "under `VG` the preset step resolves every table by §7.6's zeroing order; `VG` entries are required and allowed on the village-read tables only (§3.2.1 step 4), so another table resolves its extension cells 0 or off and every other cell to its default — an epoch at a village rung under `VG` keeps V06's parity values"; the premise "no stage a `VG` document runs reads it" dropped; J-V11.77 amended. |

### 6.3 Disposition of the continuation

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V11 | 0 | 2 | 2 | SCC-R3C-2, -4 (major); SCC-R3C-7, -15 (minor) |
| V12 | 0 | 1 | 2 | SCC-R3C-1 (major); SCC-R3C-6, -12 (minor) |
| V01 | 0 | 1 | 1 | SCC-R3C-3 (major); SCC-R3C-9 (minor) |
| BASE-F | 0 | 1 | 1 | SCC-R3C-5 (major; file f items 207, 301, 323, 345, 505 and V01's `NG` request); SCC-R3C-10 (minor; item 510) |
| V03 | 0 | 0 | 1 | SCC-R3C-8 |
| V04 | 0 | 0 | 1 | SCC-R3C-13 |
| V07 | 0 | 0 | 1 | SCC-R3C-14 |
| V08 | 0 | 0 | 1 | SCC-R3C-11 |
| **continuation** | **0** | **5** | **10** | SCC-R3C-1 – SCC-R3C-15; round 2's continuation SCC-R2C-1 – SCC-R2C-17 all fixed at their owners (§6.1) |
| **round 3 in all** | **0** | **12** | **18** | SCC-73 – SCC-87 (§4: 7 major, 8 minor) and SCC-R3C-1 – SCC-R3C-15 |

No blocker: each defect closes inside one volume's text or one file-f label, and none stops a milestone from starting. The
five majors are the ones a builder meets with no admissible move: a layer column landing after M-CAL takes a due its own
exit fails (SCC-R3C-1); V01's `NG` preset, which the compiler refuses and the base never registers (SCC-R3C-2, -3); two V01
tables the loader refuses (SCC-R3C-4); and V01's early pieces, which file f stages at M5 while V01 lands them at M1 and M2b
(SCC-R3C-5). **Grouped for the lanes:** the `NG` preset — SCC-R3C-3 (V01) first, then SCC-R3C-2 (V11), SCC-R3C-6 (V12)
and SCC-R3C-5's last clause (BASE-F); V01's early tables — SCC-R3C-4 (V11), SCC-R3C-5 (BASE-F), SCC-R3C-9 (V01); the
register's dues and wording — SCC-R3C-1 (V12), SCC-R3C-13 (V04), SCC-R3C-14 (V07), SCC-R3C-12 (V12); the readers and the
loader — SCC-R3C-7, -15 (V11); the capacity's cells — SCC-R3C-8 (V03); the lagging request and hand-off — SCC-R3C-10
(BASE-F), SCC-R3C-11 (V08).

### 6.4 CONFIRMED versus PLAUSIBLE (continuation)

**CONFIRMED by reading at source** (the files at §6.0's md5s): §6.1's seventeen re-checks at the lines cited, every half
included; SCC-R3C-1 (V12 l. 1731–1733, 1883, 1980–1982, 1996–2003, 2360, J-V12.21; V4 §8 l. 2719–2752 and BCR-13; V5 §8
l. 2692–2709, §13 item 29 l. 3509–3513; V06 0 hits for "M-CAL" and "default line"); SCC-R3C-2 (V11 l. 353, 357–358, 842,
902, 3851; V1 §2.2 l. 465–467, §1b l. 396, V1-3.15, J-V1.41, T-V1-31, T-V1-32); SCC-R3C-3 (V01 §10's BCR-1 l. 3102–3104 and
no `NG` request; base §13.5 and §13.6 (2)'s `reference: 'NG'` and no `NG` preset; file f items 376–377); SCC-R3C-4 (V1 §2.2
l. 496, 527, §1b l. 365–366, 397, l. 1572, V1-8.1 l. 2874–2877, 2894–2895, note (31) l. 3612–3621; V11: 0 hits); SCC-R3C-5
(V1-8.1 l. 2867–2885; file f items 207, 301, 323, 345, 505; V12 §3.11's SCC-54 clause); SCC-R3C-6 (V12 l. 383, 606–607,
762, 1207–1209, 2322, BCR-V12-2's new text; file f item 497); SCC-R3C-7 (V11 l. 760, 806, 831, 3872–3879; the base's
capacity function; V6 §3.2's phase table and §3.5.1, §3.6, §3.8; V1 §1b l. 358, 363–364, 368, l. 746; file f items 233,
241, 578; V03 §13's hand-off); SCC-R3C-8 (V03 l. 726–727, 938–942, J-V3.116 – J-V3.118; base §2.6 and §13.7's item-28
row); SCC-R3C-9 (V1 §2.2 l. 523–524, V1-8.1 l. 2895; V11 l. 300–309, 387; V12 J-V12.73); SCC-R3C-10 (file f item 510 l.
873; V08 §10 l. 2936–2937, J-V8.108; V11 row 63); SCC-R3C-11 (V08 l. 3239–3240, 3313; V11 l. 832, 3418–3422);
SCC-R3C-12 (V12's X-V12-15, X-V12-16, l. 1942; the five volumes' register paragraphs and J-V1.97, J-V4.117, J-V5.80,
J-V7.124); SCC-R3C-13 (V4 l. 2724–2726, 2752; V11 §2.1 l. 334–340; V12 l. 1887–1890); SCC-R3C-14 (V07 l. 335–338, 3109,
3119; V11 l. 3859–3864); SCC-R3C-15 (V11 l. 943–944, §3.2.1 step 1 and step 4, J-V11.77; V07 §3.0's stage set l.
1181–1184 and §3.12; V6 l. 630, 1554, 1832, 1954). **CONFIRMED by execution:** the thirteen diffs against snapshots whose
md5s equal the round-2 continuation's inputs or the reconcilers' recorded backups (`sccr3c/*.diff`); `cites.py` (666
citations, 981 ids, 0 missing, 0 suspect); `tcensus.py` (62 table names, `way.surface` and `squares.quota` the only content
tables without a registry row); the register, bar-registration, preset and default-line greps of §6.0.

**PLAUSIBLE:** that M6-U, M6-sky or the evolution milestones will land after M-CAL's record is committed (V12 §3.10.1 and
J-V12.21 expect it; V04's BCR-13 allows M6-U beside M5) — SCC-R3C-1 bites only then and costs nothing otherwise; that the
plan rung (M6-P) lands before M-CAL (V12 §3.10.1 names only the layers and evolution as later joiners — if not, SCC-R3C-1's
rule covers it too); the `NG` semantics proposed in SCC-R3C-2 and SCC-R3C-3 (V01 may choose another, such as a recipe
profile outside §7.6, so long as the compiler and the base agree); that the loader tags the seed pass's reads `S8.seed`
rather than `S8` (SCC-R3C-7 (b), which names either); that every `relet` phase calls the capacity function (the base says
§4.11's `relet` reads it); that V1-8.1's schedule is right and file f's labels wrong rather than the reverse (SCC-R3C-5;
V01's reason — the base reads those pieces at M1 and M2b and its goldens would otherwise shift twice — and J-V1.39 support
it); whether P6's tuning would in fact move the capacity's cells (SCC-R3C-8 stands on the lines as written); and that a
village under `VG` runs epochs at all (SCC-R3C-15 stands on V07 §3.12 and V6 §3.2 naming no preset gate; V07 §2.2's "VG has
no epochs", l. 627, describes the reference, not a document). The parts of the twelve volumes that no repair touched since
round 2's continuation and that lie outside the sections read whole in §6.0 were swept in earlier rounds and here only by
the scripted citation, id and table checks; a defect in that unchanged text that no change touches would not have been
re-found by this continuation.
