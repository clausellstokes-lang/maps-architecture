# Edits C: §6, §7.1, §7.2, §8.1, §8.2, §8.3, §9, §10.2, §10.3, §12
import os
S = os.path.dirname(os.path.abspath(__file__))
L = open(os.path.join(S, 'V12.orig.md'), encoding='utf-8').read().split('\n')


def row(prefix):
    ks = [l for l in L if l.startswith(prefix)]
    assert len(ks) == 1, (prefix, len(ks))
    return ks[0]


def add(E, RETITLE):
    # ---------------------------------------------------------------- §6
    h = '## 6 Performance budgets'
    E(h, """| the view pins (items 117, 118: each suite document opened at 52 weeks and each festival display, digests only) | ≤ 5 CPU-min nightly | the milestones that land items 117 and 118 | weeks sampled at every fourth week nightly, all 52 at milestones |
| the render bars of items 114, 117 and 118 (`T114g.greyscale`, `T117i.*`, `T118h.*`) on their fixtures | ≤ 10 CPU-min nightly | the milestones that land them | alternate nights |""",
      """| the view pins (items 117, 118, 120: each suite document opened at 52 weeks, each festival display and each Find chip set, digests only) | ≤ 5 CPU-min nightly | the milestones that land items 117, 118 and 120 | weeks sampled at every fourth week and one chip set per seed nightly, all at milestones |
| the render bars of items 114, 117 and 118 (T114-6, T117-2 with the `T117i.*` specs, T118-2 – T118-6) on their fixtures | ≤ 10 CPU-min nightly | the milestones that land them | alternate nights |
| item 120's statistics (`find.*` on V09's app harness over B-CITY-lite's seeds of every rung, the village fixtures and a dossier fixture, three chip sets per seed); its two timings at the METROPOLIS cap | ≤ 10 CPU-min nightly; the timings inside §13.8's timing phase | the milestone that lands Find (V09 §8) | the rungs alternate nights; the timings never leave the phase |""",
      tag='VAP-30; G120')
    E(h, """| item 119's wait timing (`wait.*`, five seeds per kind at each rung's top and the metropolis cap) | inside §13.8's timing phase; ≤ 30 min wall per milestone run | M1 (TOWN, CITY), M2b (METROPOLIS); M6-E (the replay) |""",
      """| item 119's wait timing (`wait.*`, five seeds per kind at each rung's top and the metropolis cap; advance time and the history replay each in total) | inside §13.8's timing phase; ≤ 30 min wall per milestone run | M1 (TOWN, CITY), M2b (METROPOLIS and the cap); each other wait from the milestone that lands it — M3a (a dossier change applied, a migration), M6-E (advance time and the history replay), M-SF (an open from SettlementForge) |""",
      tag='item 119 (a2)')

    # ---------------------------------------------------------------- §7.1
    h = '### 7.1 The bars'
    E(h, """and SOLO (⌈2n ÷ 3⌉ Yes), the M4-110 group included; a `none` panel""",
      """and SOLO (⌈2n ÷ 3⌉ Yes), the M4-110 group included; the M6 panel's item-110 buildings record one `reads` answer per item in `AnswersFile.item110`, and V4-U5's `styleReference` image is shown and never rated; each of `D5PairStaged`'s five variants round-trips through `seeds.json` and `D5Record.pairs`; a `none` panel""",
      tag='VV1112-11; VAP-31; VAP-32')
    E(h, """(§13.2's conformance clauses of items 105 – 118, V12 §1)""",
      """(§13.2's conformance clauses of items 105 – 118 and 120, V12 §1); the 104 (h) (8) comfort row's spec carries `ownerBar` T104-3 and the 107 (g) row's T107-1 and T107-2""",
      tag='VAP-26; G120')
    E(h, """a planted TOWN change at item 115's bump fails `item115.ceiling`;""",
      """a planted TOWN change at item 115's bump fails `item115.ceiling`, a planted village-rung change with every ceiling row's `enabled` false fails `item115.off`, a planted chip-dependent model write or log entry fails `item120.find`;""",
      tag='VAP-16; G120')
    E(h, row('| T-V12-47 |'),
      """| T-V12-47 | **Item 114's specs and bench bars.** On V06's wall fixtures `T114g.oldestFirst` fails a planted recovery that replaces a younger patch first and `T114g.sustained` a planted change on a driver alternating across its threshold, `bar.T114-4` and `bar.T114-5` resolving to them; `bar.T114-6` fails a planted `patched` row whose luma equals `standing`'s at a band where both draw, and `bar.T114-7` a readiness × wealth fixture whose shares differ from the derivation row's by more than one run; `item114.condition` holds the golden suite at generation and reproduces V06's neglect and repair | C | M2b (T114-6, T114-7 and the pin's generation clause, with §7.7's condition row and the state rows, §13.8); M6-E (the specs and the pin over epochs) |""",
      tag='VAP-30')
    E(h, row('| T-V12-48 |'),
      """| T-V12-48 | **Items 115 and 116.** `bldg.grandeur` counts an `H` dwelling, a court and a second manor on a planted rich HAMLET fixture; the rung pin `item115.ceiling` holds TOWN, CITY and METROPOLIS byte-identical across the ceiling table's bump, and the off-form pin `item115.off`, with every ceiling row's `enabled` false, holds every rung byte-identical to the base; `view.limitStop` reports the whole bounds inside the limit and 0 reachable stops beyond it at every rung THORP – METROPOLIS, and a planted extra stop fails | C | M1 (item 116); M2b (item 115); the village rungs with volume 7 (§13.8) |""",
      tag='VAP-16')
    E(h, row('| T-V12-49 |'),
      """| T-V12-49 | **Items 117 and 118.** `item117.season` and `item118.festival` hold on their suites; `bar.T117-2` counts ≥ 5 crown colours on the autumn fixture and fails a planted single tint, and `T117i.leafCover` fails a planted week whose cover thins; `T117i.arid` fails one planted snowflake; `T117i.ice` fails a planted river frozen before its pond and ice on a mill race; `T117i.styles` runs T112-1 at each season's middle week and fails a planted season whose one legend pair falls below §8.2's threshold; a `{ week }` step moves no model digest; the `BenchBarDef`s T118-2 – T118-6 each fail their planted breach (a decoration a week outside the window; a differing export tile; a CITY banner at a HAMLET; a staging off its keyed place; a pennant across a gate's passage) | C | M3b (items 117 and 118, §13.8) |""",
      tag='VAP-30')
    E(h, row('| T-V12-50 |'),
      """| T-V12-50 | **Item 119's measurements.** On the timing-phase runs every `wait.*` kind is timed click to complete at every rung's top and the metropolis cap, advance time and the history replay each in total (item 119 (a2)): a planted 60-epoch advance of 0.2 s an epoch (12 s in all) fails the comfort bar though no epoch takes a second; a planted 11-second wait fails the comfort bar naming the wait and rung; a planted 1.4-second wait with no progress frame fails, and one showing an empty frame fails; a `perf.qualitySpend` row whose `gainBar` fails, whose gain its runs do not show or whose `run` is absent fails the budget-register check, as does a stage timed above its §12 target with no row standing, while a row whose gain the runs show passes; a relaxed interaction row fails it; a target miss inside ten seconds is reported as D-18's declared miss and gates nothing | C | M1 (TOWN, CITY); M2b (METROPOLIS and the cap; the budget-register check); each other wait from the milestone that lands it — M3a (a dossier change applied, a migration), M6-E (advance time and the history replay), M-SF (an open from SettlementForge) |""",
      tag='VV1112-06; item 119 (a2)')
    r51 = row('| T-V12-51 |')
    E(h, r51, r51 + """
| T-V12-52 | **Item 120's measurements (Find).** `item120.find` holds on its suites: a planted chip-dependent model write, saved byte or log entry fails it, and a planted base tile left redrawn after Clear fails its tiles; `find.matches` fails a planted chip drawing an entity the gazetteer does not return and one missing a row; `find.leaks` fails a planted canary in a suggestion and in a count bubble under a player view; `find.held` fails a chip set dropped at a planted layer change and a match left glowing after its entity's removal; `find.pins` fails a planted city-band match with neither pin nor bubble; `find.cues` fails a planted ninth chip without its glyph; a planted suggestion time above §12.5's budget at the METROPOLIS cap fails its timing row, and a relaxed Find row fails V12 §3.15.9 (5)'s comparison; the chip sets drawn by `find/<seed>` reproduce | C | the milestone that lands Find (V09 §8) |""",
      tag='G120')

    # ---------------------------------------------------------------- §7.2
    h = '### 7.2 Parity metrics for this volume\'s own subject'
    E(h, "The owner's later rules (items 110–119) have no reference at all",
      "The owner's later rules (items 110–120) have no reference at all", tag='G120')
    E(h, "the known-city fixtures, the pins and the M4-110 group — and",
      "the known-city fixtures, the pins, the M4-110 group and item 120's Find statistics — and", tag='G120')

    # ---------------------------------------------------------------- §8.1
    h = '### 8.1 Where it slots into §16'
    E(h, """The harness parts of items 111–119 land with the milestones that land each item's base part (§13.8's schedule;
V12 §3.15).""", """The harness parts of items 111–120 land with the milestones that land each item's base part (§13.8's schedule;
item 120's with the milestone that lands Find, V09 §8; V12 §3.15).""", tag='G120')

    # ---------------------------------------------------------------- §8.2
    h = '### 8.2 Steps, estimates and exits (person-weeks, expert; PLAUSIBLE)'
    E(h, row('| W7 — the owner rules 111–119 and the edges |'),
      """| W7 — the owner rules 111–120 and the edges | M1 (item 111's rate specs and pin; item 116's `view.limitStop`; the `--trial` entry; the edge suite's M1 rows); M2b (`T111d.walk`, `T111d.rich`; the wait timer and the budget-register check over `perf.qualitySpend`; T114-6, T114-7 and `item114.condition`'s generation clause; item 115's two pins and `bldg.grandeur`); M3b (the style line; items 117 and 118: the view pins, T117-2, the `T117i.*` specs on `{ week }` steps, T118-2 – T118-6); M6-E and M6-U (`T113e.lost`, the item-113 registrations and pin, item 114's step specs over epochs, the advance's and the replay's total timing); the milestone that lands Find (V09 §8: `item120.find`, `find.*`, the Find timings); the release candidate (`plat calibrate register --trial`) | V12 §3.15's registrations, V12 §2.13's pins beyond item 110, V12 §3.16's suites; items 111–113's registrations and the style line ride W2, W3 and W6's engines at no added price (§16's rig line absorbs them), and item 120's pin, statistics and timings ride the `view` pin kind, the nightly statistics and the timing phase at none either (J-V12.97), so W7 prices items 114–119's specs and pins, the `exactScript` author and week steps, the `rungScope` and `view` pin kinds, the wait timer and the edge suite | T-V12-42 – T-V12-50 and T-V12-52, each at its milestone | 0.75–1.25 |""",
      tag='VAP-30; VV1112-06; G120')

    # ---------------------------------------------------------------- §8.3
    h = '### 8.3 Risks, spikes and their pre-decided outcomes'
    E(h, """and a slower step survives only with a
   recorded measured gain — never a relaxed comfort level.""",
      """and a slower step survives only with its
   `perf.qualitySpend` row and the gain its bar shows (V11 §3.25.8) — never a relaxed comfort level.""", tag='VV1112-06')

    # ---------------------------------------------------------------- §9
    h = '## 9 Decisions (each vetoable)'
    E(h, """kinds `offForm` (items 102–114), `rungScope` (item 115) and `view` (items 117, 118),""",
      """kinds `offForm` (items 102–115, item 115's `enabled` false among them), `rungScope` (item 115's TOWN and above) and `view` (items 117, 118 and 120),""",
      tag='VAP-16; G120')
    E(h, row('| J-V12.92 |'),
      """| J-V12.92 | chose to measure item 119's comfort level click to complete on the reference hardware, five seeds per wait kind at every rung's top and at the metropolis cap, advance time and the history replay each in total (item 119 (a2)), passing on the p95 ≤ 10 s, with progress within one second, the measured-gain rule read from V11 §3.25.8's `perf.qualitySpend` rows — the record that gates the stage's quality path — matched to §12.10's rows, and interaction rows compared release to release, over a mean, a single run, a per-epoch time or a check of §12.10's rows alone, because the owner's ceiling is total time a user sits through ("Total", J132), a mean hides the slow tail, and a gain must be checked on the record that admits the slower step |""",
      tag='VV1112-06; item 119 (a2)')
    r96 = row('| J-V12.96 |')
    E(h, r96, r96 + """
| J-V12.97 | chose to measure item 120 (Find) by one `view` pin (`item120.find`, tiles included), five 0-by-rule statistics (`find.matches`, `.leaks`, `.held`, `.pins`, `.cues`) on V09's app harness over B-CITY-lite's seeds of every rung, the village fixtures and a dossier fixture with three chip sets each, and its two interaction timings at the METROPOLIS cap among item 119's interaction rows, priced inside W7, over `StatBarSpec`s or a register line, because Find is a view — each of item 120 (k)'s clauses a property that holds or fails, none a tendency or a calibratable value — and the view pin kind, the nightly statistics and the timing phase already exist |
| J-V12.98 | chose to key every base bar this volume registers as a `BenchBarDef` by its §13.2 id (T114-6, T114-7, T117-2, T118-2 – T118-6, T119-2), keeping V12's spec ids (`T114g.*`, `T117i.*`) only for `StatBarSpec`s that carry their base bar as `ownerBar`, and to type item 117's week checks as `exactScript` and `exactMonotone` over `{ week }` steps (`noIceSnow`, `iceOrder`, `seasonStyles`), over spec ids standing for base bars and untyped checks, because `bar.<barId>` resolves only through a registration's `id` or `ownerBar` (V12 §2.1) and a week is a view step the step runner takes as a user does, moving no model digest |""",
      tag='VAP-30; G120')

    # ---------------------------------------------------------------- §10.2
    h = '### 10.2 Hand-offs from this volume — each closed at its destination'
    E(h, """its history, readiness, calendar and festival fixtures items 113, 114, 117 and 118's; none a calibration seed family | V08 §7 |""",
      """its history, readiness, calendar and festival fixtures items 113, 114, 117 and 118's, and a dossier fixture's institution names item 120 (b)'s list entries (V12 §3.15.10); none a calibration seed family | V08 §7 |""",
      tag='G120')
    E(h, row('| X-V12-11 |'),
      """| X-V12-11 | V01 – V11 | every volume pin that restates an owner item's pin — V12 §3.7.8's list: T-V1-4 (e), T-V2-50, T-V3-34, T-V4-47, T-V4-69, T-V4-77 (d), T-V5-15, T-V5-19 (c), T-V5-22 (b) and (k), T-V5-27, T-V5-33's item-111 clause, T-V6-12's `w_sun` clause, T-V6-44, T-V6-65, T-V6-71 – T-V6-74, V07's pins, T-V8-50, T-V8-53, T-V9-57, T-V10-43, T-V10-45, T-V11-13, T-V11-31, T-V11-38 – T-V11-41 (b) — registers its suites on V12 §3.7.8's engine under its V12 §2.13 pin, reads "off" as V11 §3.24.0 (V11 §3.7.4 for items 105 and 107) and follows V12 §3.7.6's bumps | V01 §7; V02 §7; V03 §7; V04 §7; V05 §7; V06 §7; V07 §7; V08 §7; V09 §7; V10 §7; V11 §7 |""",
      tag='VAP-17')
    E(h, """T-V4-54 reads g's *voids* (a deep void a connected component, at most three per town); T-V4-43's and T-V4-58's ± 3 s.e. and 500 seeds as parameters;""",
      """T-V4-54 reads g's *voids* (a deep void a connected component as V12 §3.4.2's `void.*` row defines it, at most three per town); T-V4-43's ± 3 s.e. and 500 seeds per rung and T-V4-58's ± 3 s.e. and ≥ 200 undercities as parameters;""",
      tag='VAP-28; VV1112-13')
    E(h, """V06's T-V6-6 – -10, -13, -16, -18, -28, -31, -32, -40, -43, -54, and T-V6-34 and -37 in their epoch forms; V11's T-V11-30; V03's T-V3-35; the item-111–119 bars of V12 §3.15)""",
      """V06's T-V6-6 – -10, -13, -16, -18, -28, -31, -32, -40, -43, -54, -62, -72, and T-V6-34 and -37 in their epoch forms; V11's T-V11-30; V03's T-V3-35; the base's bench bars of items 112–119 by their §13.2 ids — T112-1; T113-1, T113-3, T113-4, T113-6; T114-6, T114-7; T117-2; T118-2 – T118-6; T119-2 (V12 §3.15))""",
      tag='VAP-27; VV1112-18; VAP-30')
    E(h, """names the cells `raisedWays.structure.span.*` (values in §2.7, item 244);""",
      """names the cells `raisedWays.structure.span.*` (values V11 §3.24.2; the rule §2.7, file f item 244);""",
      tag='VV1112-07')

    # ---------------------------------------------------------------- §10.3
    h = '### 10.3 Hand-offs to this volume — closed here'
    E(h, "| V06 X9 |", "| V06 §7 (T-V6-34, T-V6-36, T-V6-38, T-V6-40) |", tag='VV56-28')
    E(h, "| V06 X19 |", "| V06 §3.19.1 (4); V06 §7 (T-V6-65) |", tag='VV56-28')
    E(h, "| V06 X31 |", "| V06 §2.2's structure knobs; V06 §7 (T-V6-66 – T-V6-69) |", tag='VV56-28')
    E(h, "| V06 X38 |", "| V06 §8's register lines (`bar.T-V6-<n>`) |", tag='VV56-28')
    E(h, "| V06 X49 |", "| V06 §8's register paragraph and line table (J-V6.126) |", tag='VV56-28')

    # ---------------------------------------------------------------- §12
    h = '## 12 CONFIRMED versus PLAUSIBLE'
    E(h, "as were items 102–119, the delegated decisions (J121, J122)",
      "as were items 102–120 (item 119 (a2) and item 120 with their dated routings, J132, J133), the delegated decisions (J121, J122)",
      tag='G120; item 119 (a2)')
    E(h, """the item-111–119 specs' counts (200 towns per cell, ≥ 200 per rate, ≥ 100 towns for `most`, five
   seeds per wait kind);""", """the item-111–120 counts (200 towns per cell, ≥ 200 per rate, ≥ 100 towns for `most`, five
   seeds per wait kind, three Find chip sets per seed);""", tag='G120')
    E(h, """10. That the later corpus runs opening on the owner's word is wanted as M-CAL's is; that a staged layer's last milestone is
   where its run belongs; that volume 7's V-M2u lands only underground cells.""",
      """10. That the later corpus runs opening on the owner's word is wanted as M-CAL's is; that a staged layer's last milestone is
   where its run belongs; that volume 7's V-M2u lands only underground cells.
11. That every bar a register line names has a scalar or per-clause verdict statistic its owner can register; that no
   register line but V12 §3.11's items 103–107 and item-106 lines names a column of registry rows 14–15, 17's `profile`,
   19 or 33–37 (the one-knob-one-entry check finds any at C2's and C4's exits); that `tune`'s "no run when the metric
   holds" clause is wanted only where an owner states it (V07).
12. That the corpus stage can target the default line's columns (a column no frame's run targets closes `fixed` by the
   line's fallback); that the empty-table rule leaves no column holding cells without an entry at any exit (the PR-tier
   per-cell check finds any); that the staged-entry rules, the rows-added row and the extended `--check` behave as written —
   no fixture has run (T-V12-20 runs from M1); that every legitimate move of a named entry's cells already writes a cells
   row (a run by V12 §3.7.6 step 5, a restating line, the command), so the check's extension to named entries catches only
   moves outside a line's method.
13. That V09's app harness evaluates `live.find` on the fixture documents at every band and layer as its frame sampler does
   for the progress view, and that three chip sets per seed reach every match kind item 120 (b) lists (V12 §3.15.10).""",
      tag='VV1112-15; G120')
