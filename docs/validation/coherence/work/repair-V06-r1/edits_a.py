# head, §0, §1.1–§1.3, §1b
EDITS = [
# ---- head: VV56-13 (items 1–119), VV56-15 (S7's citation rule)
('VV56-13+15 head',
 r'''states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's;
`Vnn §n` is a design volume's section, this one included (`V06 §3.2`); a list after a volume prefix stays in that volume
(`V04 §3.5, §3.10` is two sections of volume 4); `item n` is an amendment item — items 1–116 the owner's, items 200 and
above file f's,''',
 r'''states is cited, never restated; every new fact is stated once, here. **Citations** (canon S7): a bare `§n` or `II.n` is
always the base's; a design volume's section always carries its prefix, `Vnn §n` — this one's included (`V06 §3.2`), and in
a list too (`V04 §3.5, V04 §3.10`); `item n` is an amendment item — items 1–119 the owner's, items 200 and
above file f's,'''),
# ---- §0: VV56-07 (item 119 (a2))
('VV56-07 §0 replay',
 r'''thousand"), and the whole replay takes seconds for a town and under a minute for a metropolis, with a progress bar.''',
 r'''thousand"), and the whole replay, with the town built at its start, finishes within ten seconds at any size — in steps
longer than a decade where a long history needs them, the steps it took reported — with a progress bar.'''),
('VV56-07 §0 advance',
 r'''grown instead?"). Before you advance, the card shows you where the town will end up and how many houses it gains or
loses. Anything''',
 r'''grown instead?"). Before you advance, the card shows you where the town will end up and how many houses it gains or
loses; an advance of any length finishes within ten seconds, in longer steps where it must, and says how long its steps
were. Anything'''),
# ---- §1.1
('VV56-15 l119', r'''(V06 §3.1–§3.2; file f item 317)''', r'''(V06 §3.1–V06 §3.2; file f item 317)'''),
('VV56-15 l125', r'''`wallToWay` or the absorbed wall of `absorbWall`) (V06 §3.6–§3.7).''', r'''`wallToWay` or the absorbed wall of `absorbWall`) (V06 §3.6–V06 §3.7).'''),
('VV56-15 l128', r'''   (V06 §3.5, §3.7).''', r'''   (V06 §3.5, V06 §3.7).'''),
('VV56-15 l143', r'''the timeline bar, then-and-now, forks, the animated export (V06 §3.15, §5).''', r'''the timeline bar, then-and-now, forks, the animated export (V06 §3.15, V06 §5).'''),
('VV56-07 §1.1 (14)',
 r'''14. **Budgets** for an epoch and a century per rung (V06 §6).''',
 r'''14. **Budgets** — the targets for an epoch and a century per rung, and the ten-second comfort level that `advance` and the
    history replay each keep in total by one estimate that coarsens their cadence (item 119 (a), (a2); V06 §6).'''),
('VV56-15 l168', r'''crowding hook before the growth decision (V06 §2.1, §3.6, V06 §3.8.1).''', r'''crowding hook before the growth decision (V06 §2.1, V06 §3.6, V06 §3.8.1).'''),
('VV56-15 l175', r'''where they meet these (V06 §3.19, V06 §3.7.6 (5), §3.11, §3.2).''', r'''where they meet these (V06 §3.19, V06 §3.7.6 (5), V06 §3.11, V06 §3.2).'''),
# ---- §1.2
('VV56-15 l196+277+3147', r'''| `MutationPlan` (V06 §2.5, §3.10) |''', r'''| `MutationPlan` (V06 §2.5, V06 §3.10) |''', 3),
('VV56-15 l206', r'''| their epoch halves (V06 §3.7.6, §3.9) |''', r'''| their epoch halves (V06 §3.7.6, V06 §3.9) |'''),
('VV56-15 l207', r'''| II.7.3, II.7.5, II.7.6; V04 §2.2–§2.3, §3.5, §3.10 |''', r'''| II.7.3, II.7.5, II.7.6; V04 §2.2–V04 §2.3, V04 §3.5, V04 §3.10 |'''),
('VV56-15 l208', r'''| the prelude, the crowding hook, the two conversions (V06 §3.2, §3.6, V06 §3.11.6, V06 §3.5.2) |''', r'''| the prelude, the crowding hook, the two conversions (V06 §3.2, V06 §3.6, V06 §3.11.6, V06 §3.5.2) |'''),
('VV56-07 §1.2 hook',
 r'''| §5's no-whole-map-retry rule, the work limits, the report | §5.1, §5.4 (file f item 339) | the epoch's failure ladder and report (V06 §3.17) |''',
 r'''| §5's no-whole-map-retry rule, the work limits, the report | §5.1, §5.4 (file f item 339) | the epoch's failure ladder and report (V06 §3.17) |
| §12's targets and its ten-second comfort level for one-time waits, the progress rule, the measured-gain rule | §12 (item 119 (a)–(f); the owner's "Total" for long runs of time, item 119 (a2)) | the targets of V06 §6.1–V06 §6.7; the comfort estimate that coarsens an `advance`'s cadence and the replay's epoch length (V06 §6.8) |'''),
('VV56-15 l214', r'''`UndercityEpoch.reread` (V04 §1b.2, §3.10);''', r'''`UndercityEpoch.reread` (V04 §1b.2, V04 §3.10);'''),
# ---- §1.3
('VV56-15 l224', r'''the dig, opening and overlap rules and their tables (V04 §2.3, §3.5),''', r'''the dig, opening and overlap rules and their tables (V04 §2.3, V04 §3.5),'''),
# ---- §1b
('VV56-15 l266', r'''| W2 | `EpochPhase`, `EpochContext`, `EpochOps` (V06 §2.1, §3.2);''', r'''| W2 | `EpochPhase`, `EpochContext`, `EpochOps` (V06 §2.1, V06 §3.2);'''),
('VV56-15 l267', r'''| W3 | `EpochParticipant` registrations (V06 §2.1, §3.2's participant table) |''', r'''| W3 | `EpochParticipant` registrations (V06 §2.1, V06 §3.2's participant table) |'''),
('VV56-15+VV56-07 W4',
 r'''| W4 | `Trajectory` and the `advance` request (V06 §2.3, V06 §3.3.2, §4.1) | T1 `intend`'s time card (the app), the clerk's `advance` tool (§11.2), the CLI | `epoch` events appended one at a time in one `group`, each with its `EpochInputs` |''',
 r'''| W4 | `Trajectory` and the `advance` request (V06 §2.3, V06 §3.3.2, V06 §4.1) | T1 `intend`'s time card (the app), the clerk's `advance` tool (§11.2), the CLI | `epoch` events appended one at a time in one `group`, each with its `EpochInputs`, at the cadence W91's estimate admits |'''),
('VV56-15 l269', r'''`EpochInputs.events` (V06 §2.4, §3.11) |''', r'''`EpochInputs.events` (V06 §2.4, V06 §3.11) |'''),
('VV56-15 l270', r'''| W6 | `BuildingShadeMask` (V06 §2.6, §3.4) |''', r'''| W6 | `BuildingShadeMask` (V06 §2.6, V06 §3.4) |'''),
('VV56-15 l273', r'''| W9 | `Enceinte.pathway` (V06 §2.7, §3.7) |''', r'''| W9 | `Enceinte.pathway` (V06 §2.7, V06 §3.7) |'''),
('VV56-15 l276', r'''| W12 | `Use.strain` (V06 §2.9, §3.9) |''', r'''| W12 | `Use.strain` (V06 §2.9, V06 §3.9) |'''),
('VV56-15 l291', r'''| W27 | `EpochInputs.wealthLevel` and the timeline entry's (V06 §2.3, §3.3) |''', r'''| W27 | `EpochInputs.wealthLevel` and the timeline entry's (V06 §2.3, V06 §3.3) |'''),
('VV56-15 l301', r'''| W37 | `ProductDecl.phases` and `.participants` (V06 §2.1, §3.1) |''', r'''| W37 | `ProductDecl.phases` and `.participants` (V06 §2.1, V06 §3.1) |'''),
('VAT0-16 W39', r'''`EpochOps.demandTaken`, `Household.transit` (V06 §2.1, V06 §3.8.1) |''', r'''`EpochOps.demandTaken`, `Household.transit` (§2.7) (V06 §2.1, V06 §3.8.1) |'''),
('VV56-15 l304', r'''accessible void clusters (V04 §3.4, §3.10) |''', r'''accessible void clusters (V04 §3.4, V04 §3.10) |'''),
('VDC0-25 W59', r'''the candidate's kind and the lineages it names; the base's raised-way stream, epoch component 0 |''', r'''the candidate's kind and the lineages it names; `raised.reason` (§6.1), epoch component 0 |'''),
('VAT0-09 W73', r'''the households `under.undercity`'s re-read, a foundation collapse or a void made `lost` (item 113 (e)) vacates |''', r'''the households `under.undercity`'s re-read, a foundation collapse or a void made `lost` after `siting` (item 113 (e)) vacates |'''),
('VV56-15 l337', r'''| V04 §3.4 F6, §3.10; §4.7 |''', r'''| V04 §3.4 F6, V04 §3.10; §4.7 |'''),
('VV56-15 l345', r'''| W81 | the `field` phase's way-surface re-lay (V06 §3.2 row 4, §3.4 (9)) |''', r'''| W81 | the `field` phase's way-surface re-lay (V06 §3.2 row 4, V06 §3.4 (9)) |'''),
('VAT0-13 W81', r'''`setAttr` ops on `Way.surface` (author `engine`, cause `rule:field`) in the phase's batch;''', r'''`setAttr` ops on `Way.surface` (author `epoch`, §7.1's `EditBase.author`; cause `rule:field`) in the phase's batch;'''),
('VV56-07 W88',
 r'''| W88 | the replay's generation budget and lazy detail (V06 §3.20.4, V06 §6.7) | V11's `history.epochYears`; the rung; §12's generation budget; §4.1's laziness contract | the phases a coarse epoch runs or defers; the coarsening rung (fewer, longer epochs) when the estimate exceeds the budget; the report's `replay.ms`, `replay.coarsened`; T-V6-71's budget clause | §4.1 (laziness); §12.6 |''',
 r'''| W88 | the replay's budget and lazy detail (V06 §3.20.4, V06 §6.7) | V11's `history.epochYears`; the rung; W91's estimate against `replay.budgetMs`; §4.1's laziness contract | the phases a coarse epoch runs or defers; the coarsening rung (fewer, longer epochs) when the estimate exceeds the budget; `ReplayPlan.epochYears` and `.coarsened`, the report's `replay.epochYears` and `.coarsened` (V06 §2.10); T-V6-71's budget clause | §4.1 (laziness); §12 (item 119's comfort level); §12.6 |'''),
('VPC-05 W90', r'''the ceiling table (V11) as §4.2 S10b, §10.2 and V02's composition rows read it;''', r'''the ceiling table (V11) as §4.7 S10b, §10.2 and V02's composition rows read it;'''),
('VPC-05 W90 hook+VV56-07 W91',
 r'''`MutationPlan` steps (a re-plan when a stored record exceeds it) | §4.2 S10b, §10.2 (item 115) |''',
 r'''`MutationPlan` steps (a re-plan when a stored record exceeds it) | §4.7 S10b, §10.2 (item 115) |
| W91 | the comfort estimate and the cadence it chooses — `advance` and the history replay each inside the ten-second comfort level in total (item 119 (a2); V06 §3.3.2, V06 §3.20.4, V06 §6.8) | an `advance` request's epochs (V06 §3.3.2's expansion) or the replay plan's (V06 §3.20.1); the rung of each epoch's target; the islands that may stand (from the first CITY or METROPOLIS epoch, with the recipe's island setting) and the islands and hand-placed accesses standing at an `advance`'s request; the rises in the targets; `epoch.costMs`, `epoch.islandMs`, `epoch.handAccessMs`, `epoch.stageMs`, `epoch.stageMsPerBuilding`, `advance.budgetMs`, `replay.budgetMs` (V06 §2.2) | the cadence an `advance` group folds at (its epochs' weeks, W4) and the replay's epoch length (W83); the card's and the clerk's bend line naming the cadence chosen; the report's `advance` section and `replay.epochYears` (V06 §2.10), read by the history panel and the clerk; V09's progress view, counting the epochs at that cadence; T-V6-23, T-V6-24, T-V6-71 | §12 (item 119's comfort level); §4.11 *The clock* |'''),
]
