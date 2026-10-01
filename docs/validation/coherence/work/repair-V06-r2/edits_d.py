"""edits_d — V06 §7, §8, §9, §10, §11, §12 (tags: the issue or ruling each edit applies)."""

T75 = (
    "| T-V6-75 | hook | **crisis looks and the epoch path** (item 122 (a); V06 §3.22; takes T122-1's hand-over clause), on "
    "H-DOSSIER with a fire calamity under a `disaster` condition over its quarter, a `regional_migration_pressure` condition "
    "whose newcomers stay, and a condition with no calamity and no population change: (a) the model digest and the document "
    "hash identical with crises followed, off and previewed, at every week of every condition (T122-1's hand-over clause) — "
    "a look writes no op, event or record; (b) the aftermath only through the epoch: before the epoch that holds the "
    "calamity's week no building, household or way differs from the same dossier without that calamity; at that epoch the "
    "fire's targets are struck in place (V06 §3.11.1), the deaths and the exodus are in its target and the newcomers who "
    "stay are seated by `siting` and `growth`; the condition with neither leaves the model byte-identical; (c) **the "
    "frontier**: on a fixture whose standing plan holds no vacancy beyond `decline.turnoverVacancy` and whose next epoch "
    "raises the target by exactly the camp's households in an unwalled stage, `frontierFor(doc, n)`'s faces are the "
    "hinterland faces that stage builds on; below the quantum, with no reachable land left, at a village rung and on a "
    "standalone neighbourhood document, the overflow belt by the gate (at a village rung, by the through road's entry); "
    "after an epoch builds on the camp's ground, the next frontier out; zero households, none; every stream's position "
    "unchanged by a call; (d) **the yield**: at no week is a building drawn both under the disaster look and under its "
    "rebuild's Works stage; a building no rebuild reaches keeps the look until its condition ends; a `decay` Works never "
    "ends it, the higher of the look's level and the building's own drawn; (e) a look standing when its aftermath epoch "
    "folds; the aftermath epoch undone on a what-if copy (the look over the restored buildings); an `undo` naming the port "
    "epoch that carries the calamity, F-EDIT (§7.4 *Replay semantics*); a replay epoch (no condition, the history's "
    "calamities as events); `frontierFor` and `crisisLookYields` equal across a save and a load, a regeneration and an "
    "undo; every rung | exact; byte-identical |"
)

T76 = (
    "| T-V6-76 | property + hook | **the decay level** (item 123 (b); V06 §3.23; takes T123-4's epoch clause), over H-100's "
    "decline and regrowth and on H-DOSSIER: (a) every lineage's `decayLevel` is non-decreasing in the week while its decay "
    "run lasts and lies in its state's third; a timber or thatch building reaches each level no later than a stone one of "
    "the same state and years; (b) restoration: under a `repair` Works the level falls with the Works' fraction to 0 at "
    "FINISHED, the damaged elements leaving in reverse threshold order, the highest first, each element above the present "
    "level and at or below `decayPeak` drawn repaired in patch material until a rebuild (T123-4's epoch clause); with no "
    "Works it is 0 from the event's week; a decay run beginning during a repair starts from the level the repair left; "
    "(c) a rebuild, a successor on the trace and a `reused` or `cleared` trace read level and peak 0; a fire's burn reads "
    "the decayed third from its week; (d) a building generated ruined, and H-HISTORY's ruins first met in the replay, read "
    "V11's default age over the plans they were built with (V03's T123-1 ids unchanged); with V11's item-123 rows absent, "
    "each state's floor; (e) the level is the same for a given seed, week and lineage on the five engines (§6.5), across a "
    "save and a load, a regeneration and an undo of the epoch (the earlier history's level), and at a scrubbed frame's "
    "week (V06 §3.15.2); no op, draw or digest reads it — the history's digests byte-identical with the level's reader "
    "replaced by a constant | exact; byte-identical |"
)

J136 = (
    "| J-V6.136 | chose to coarsen a dossier catch-up whose epochs at the port's cadence would pass the comfort level — one epoch "
    "per k crossed year ends, k the smallest whole number whose V06 §6.8 estimate fits `advance.budgetMs`, every dossier "
    "event still at its own week, a calamity in the coarse epoch that holds its week at its week, the population crossings "
    "read into the coarse epochs' targets, the last epoch at the dossier's week (V06 §6.8 (6)) — over keeping the port's "
    "cadence for every catch-up, because item 119 (a)'s ten seconds hold for \"a dossier change applied\" and \"open a map "
    "from SettlementForge\" too (the owner's \"Total\", J132), a catch-up of decades at the port's cadence passes them "
    "(≈ 23 years at CITY, ≈ 7 at METROPOLIS, fewer with islands), the estimate `advance` uses keeps one mechanism (principle "
    "(9)), and the dossier's events, calamities and present facts are met exactly at any grain, so the host's clock still "
    "owns the time (item 20); one epoch over the span always fits, so no catch-up is refused or shortened |"
)
J137 = (
    "| J-V6.137 | chose to hand a crisis over to the history by the epoch path alone — the calamity through "
    "`EpochInputs.events` and the `hazards` phase, the deaths, the exodus and the newcomers through the epoch's population "
    "target, a condition's weight on building through the `works` share, a look writing nothing — and to place the refugee "
    "camp by `frontierFor`, a pure, draw-free query of where the `growth` phase would seat the camp's households next over "
    "the model the view draws (the unwalled frontier; the overflow belt by a gate where there is none), over a look that "
    "writes its aftermath or a camp site stored with its condition, because item 122 (a) makes a look purely cosmetic and "
    "its aftermath real, a query over committed state keeps the camp where the next epoch's suburb would grow with no record "
    "to keep in step, and a query that draws nothing moves no stream (V06 §3.22 (1)–(2)) |"
)
J138 = (
    "| J-V6.138 | chose to end a disaster's ruined look building by building — `crisisLookYields` true once a Works other than "
    "a `decay` Works has started on the building and did not finish before its condition began — over ending the whole look "
    "in the week the first rebuild's Works begins or only at the condition's end, because \"no week draws both\" (item 122 "
    "(a)) must hold on each building while a town's rebuild runs over years, a building no rebuild reaches still stands in "
    "the look until its condition ends, and a `decay` Works is ruin, not rebuild (V06 §3.22 (3)) |"
)
J139 = (
    "| J-V6.139 | chose to derive item 123's decay level per building lineage at a week — each existence state owning a third "
    "of [0, 1], the years since its decay run began at V11's rate by material inside that third, a restoration lowering it "
    "with its `repair` Works' progress, `decayPeak` keeping the highest level since the plan was built for item 114's "
    "patched elements, V11's default age where the log holds no run — over a stored decay field or a level by years alone, "
    "because the lifecycle events and the Works already date every step (a stored value would repeat them, principle (9)), "
    "the thirds keep each state's look (item 123 (c)) whatever the years, the level only climbs while the run lasts (item 123 "
    "(b)), and a reading no op or draw takes changes no model, replay or hash (V06 §3.23) |"
)
J140 = (
    "| J-V6.140 | chose that a wall opening under a standing aqueduct is the aqueduct's station on the trace — the curtain "
    "under the arch carrying the deck, its pier the wall's band (§2.7's support step (3)) — kept through V06 §3.7.2 (2)'s "
    "dismantling as a raised gate's stretch is and taken by the same draw from the epoch after the aqueduct is removed or "
    "its crossing span `dismantled` (V06 §3.7.6 (5)), over letting the opening go with its stretch (J-V6.114's former "
    "rule), because the support step's clear-span bound reads the spans on either side of that station: a span over the "
    "whole wall strip and its setbacks would pass `maxClearSpanM`, so the aqueduct stands on the curtain and its run "
    "cannot fall under it |"
)


def apply(sub, after_line):
    # ======================================== §7 ========================================================================
    sub('R2-08 R2-35 G122-V06 G123-V06 §7 head: the bars taken',
        "T114-8's epoch clause, and\nT115-1 and T115-2 across a rung change), each test naming",
        "T114-8's epoch clause,\nT115-1 and T115-2 across a rung change, T122-1's hand-over clause and T123-4's epoch clause), each "
        "test naming")
    sub('VAT1-03 R2-19 §7 take-over T20-2',
        "the undo of a lapsing epoch with no dossier event restores the hold |",
        "the undo of a lapsing epoch outside the port's session `host:port` (an advance on a what-if copy) restores the hold |")
    sub('VAT1-03 R2-19 §7 take-over T20-6',
        "an `undo` naming an epoch that carried a dossier event F-EDIT (T-V6-27) |",
        "an `undo` naming a port epoch, with or without a dossier change, F-EDIT (T-V6-27) |")
    after_line('G122-V06 G123-V06 R2-08 R2-35 §7 take-over T122-1, T123-4', "| T115-1, T115-2, across a rung change | T-V6-74 |",
               "| T122-1, its hand-over clause | T-V6-75 | the model and the hash identical with crises followed, off and previewed "
               "at every week of the conditions; the aftermath only through the epoch path |\n"
               "| T123-4, its epoch clause | T-V6-76 | the decay level falls under a restoration, the damage leaving in reverse "
               "threshold order, a repaired element drawn in patch material until a rebuild |")
    sub('R2-26 (c) J-V6.140 T-V6-11 the aqueduct opening',
        "after `absorbWall` every run is `dismantled` in time but one holding a raised gate under a standing deck, which is "
        "taken from the epoch after that raised way's removal (on H-METRO, the superseded curtain's fate set to `absorb` by a "
        "hand `setAttr` and a viaduct crossing it by a raised gate)",
        "after `absorbWall` every run is `dismantled` in time but one holding a raised gate under a standing deck or a wall "
        "opening under a standing aqueduct, each taken from the epoch after that raised way's removal (on H-METRO, the "
        "superseded curtain's fate set to `absorb` by a hand `setAttr` and a viaduct crossing it by a raised gate; on H-AQUA, "
        "a curtain the aqueduct crosses by its opening set to `absorb` likewise)")
    sub('VV56-r1-04 R2-31 (b) T-V6-23 Accept after edits',
        "an accept on an unchanged head takes the preview's folded state byte-identical to a re-fold;",
        "an accept on an unchanged head takes the preview's folded state byte-identical to a re-fold; an Accept after edits "
        "that raise the estimate (hand-placed accesses added on the preview's islands) folds at the re-estimated cadence, "
        "inside the comfort level;")
    sub('VV56-r1-01 R2-31 (a) T-V6-24 the catch-up',
        "timed from the click to the complete result (V12's `wait.advanceTime`, `wait.historyReplay`) |",
        "timed from the click to the complete result (V12's `wait.advanceTime`, `wait.historyReplay`); **a dossier catch-up** "
        "(V06 §6.8 (6)) of 20 and of 100 years at CITY and at METROPOLIS, the sky layer off and on, timed inside §12's waits "
        "for a dossier change applied and an open from SettlementForge, its cadence reported |")
    sub('VV56-r1-01 T-V6-24 bar',
        "its measured time at most its estimate plus its reserve (else the cost rows rise, V06 §6.7's fallback);",
        "its measured time at most its estimate plus its reserve (else the cost rows rise, V06 §6.7's fallback); every "
        "catch-up's dossier facts met exactly at its last epoch;")
    sub('VAT1-03 R2-19 T-V6-27',
        "and an undo of a lapsing epoch that carried no dossier event restores the hold (T20-2's epoch clause); an `undo` "
        "naming an epoch that carried a dossier event returns F-EDIT and changes nothing (T20-6's epoch clause)",
        "and an undo of a lapsing epoch outside the port's session `host:port` (an advance on a what-if copy of the fixture) "
        "restores the hold (T20-2's epoch clause); an `undo` naming a port epoch, with or without a dossier change, returns "
        "F-EDIT and changes nothing (T20-6's epoch clause)")
    sub('VEL1-04 R2-18 (a) T-V6-70 (f)',
        "(f) decline with no candidate, one leaver and a spent cap, undone and reloaded, and every",
        "(f) decline with no candidate, one leaver and a spent cap, undone and reloaded; a fall whose leaving household is a "
        "locked or pinned dwelling's last — a `relet` down to 0, no `vacate`, the building's state kept (V06 §3.5.1 (5)); and "
        "every")
    sub('VAT1-05 R2-20 R2-27 (a) T-V6-73',
        "the `enceinte` provider tells its story;",
        "the `enceinte` provider tells its story; **across a history replay**: on a history-first fixture whose walls are "
        "patched in replay epochs and again in live epochs, the means then returning, the rebuild takes every replay-era patch "
        "before any live-era one, each era oldest first by `EpochRecord.week`, ties in chain order (V06 §3.7.7 (3)); **the "
        "welded stretch**: on a CITY fixture with an `on_enceinte` castle over 10 epochs at a poor, safe town's drivers and then "
        "a poor, threatened one's, the welded stretch's town and bailey profiles are equal at every commit, decayed and patched "
        "on the town ring's draws and λ (V06 §3.7.7);")
    sub('VAP-r1-10 R2-09 T-V6-74 the item115.ceiling registration',
        "a history that never stands below TOWN is byte-identical with the ceiling on and off | exact; byte-identical |",
        "H-100 at TOWN and above is byte-identical with the ceiling on and off — the `item115.ceiling` registration of H-100 "
        "on V12 §3.7.8's engine (V12 §2.13), written by V06's E2 seat | exact; byte-identical |\n" + T75 + "\n" + T76)

    # ======================================== §8 ========================================================================
    sub('G122-V06 G123-V06 R2-06 (c) §8 head price',
        "Priced below at **29.75–42.25\nperson-weeks**, the owner's items 111, 113–115 and 119 included",
        "Priced below at **31–44\nperson-weeks**, the owner's items 111, 113–115, 119, 122 and 123 included")
    sub('G122-V06 G123-V06 R2-36 §8 E2',
        "the grandeur ceiling across a rung change (item 115, V06 §3.8.5) | T-V6-5–8, 28, 31, 32, 54 (passages), 62, 63, 66, 74 "
        "| 4.25–6 |",
        "the grandeur ceiling across a rung change (item 115, V06 §3.8.5); the crisis hand-over (item 122 (a), V06 §3.22: the "
        "aftermath through the epoch path, `frontierFor`, `crisisLookYields`) and the decay level (item 123 (b), V06 §3.23: "
        "`decayLevel`, `decayPeak`, restoration, the default-age form) | T-V6-5–8, 28, 31, 32, 54 (passages), 62, 63, 66, 74–76 "
        "| 5.25–7.5 |")
    sub('VV56-r1-01 VV56-r1-04 §8 E6',
        "the report's `advance` section and the accept's adoption of the preview's fold (item 119 (a2); V06 §6.8) | T-V6-21–24, "
        "53 | 3.25–4.75 |",
        "the report's `advance` section and the accept's adoption of the preview's fold, re-estimated on a changed head; a "
        "dossier catch-up's coarsening (item 119 (a2); V06 §6.8) | T-V6-21–24, 53 | 3.5–5 |")
    sub('R2-06 (c) §8 total', "| **total** | | | **29.75–42.25** |", "| **total** | | | **31–44** |")
    sub('G123-V06 §8 V11 cells registered by V11',
        "item 114's\n`walls.condition` cells and `walls.patchMaterials` rows) are registered by V11's seats, never here.",
        "item 114's\n`walls.condition` cells and `walls.patchMaterials` rows, item 123's decay rates by material and default age) are "
        "registered by V11's seats, never here.")
    sub('VAP-r1-10 R2-09 §8 the no-op pins',
        "`.deck` and `.stepped` (H-100, H-AQUA, H-TERRACE, H-DECK; T-V6-65), E3 `item114.condition`",
        "`.deck` and `.stepped` (H-100, H-AQUA, H-TERRACE, H-DECK; T-V6-65), E2 `item115.ceiling` (H-100 at TOWN and above; "
        "T-V6-74), E3 `item114.condition`")
    sub('R2-12 §8 order: AccessPassStrategy',
        "(its time step,\n`CatacombGrowth` and `AccessPass`)",
        "(its time step,\n`CatacombGrowth` and `AccessPassStrategy`)")
    sub('G122-V06 G123-V06 R2-36 §8 order: the parts E2 needs',
        "E2's ceiling part needs §4.7 S10b's ceiling and V11's ceiling table (item 115).",
        "E2's ceiling part needs §4.7 S10b's ceiling and V11's ceiling table (item 115); its crisis hand-over reads item 122's "
        "base parts (§10.2's crisis look table and its placement, at M3b), and its decay level V11's item-123 rows (until they "
        "ship, each state's floor, V06 §3.23 (4)) — V03's damage layer reading every building at V11's default age until E2 "
        "lands.")
    sub('G123-V06 §8 risks (4)',
        "(4) *Volume 11's rows* (profiles, coverage, goods, ladders, barriers, the history and wall-condition rows) — E2, E3, E4 and\n"
        "E9 run on defaults or neutral values until they land, a declared shift.",
        "(4) *Volume 11's rows* (profiles, coverage, goods, ladders, barriers, the history, wall-condition and item-123 decay rows) —\n"
        "E2, E3, E4 and E9 run on defaults or neutral values until they land, a declared shift.")

    # ======================================== §9 ========================================================================
    sub('R2-26 (c) §9 J-V6.114 amended', "| J-V6.114 | chose to keep,", "| J-V6.114 | *amended by J-V6.140.* Chose to keep,")
    sub('§9 J-V6.136–J-V6.140',
        "and one epoch over the whole span always fits, so no request is refused or shortened (item 101 R2) |\n\n## 10 Base change requests",
        "and one epoch over the whole span always fits, so no request is refused or shortened (item 101 R2) |\n"
        + J136 + "\n" + J137 + "\n" + J138 + "\n" + J139 + "\n" + J140 + "\n\n## 10 Base change requests")

    # ======================================== §10 =======================================================================
    sub('G122-V06 G123-V06 VV56-r1-02 §10 the owner items',
        "Items 111, 113, 114, 115 and 119 of file g are applied to the base by the coherence pass at their homes (§2.3's\n"
        "`WaterBody.spring`; §4.11 *History-first generation*, §7.7's DR36–DR40, §2.7's `HistoryRecord`, §2.8's\n"
        "`Provenance.symbolic`; §2.7's `Enceinte.condition` ladder and §7.7's condition row; §4.7 S10b's ceiling and §10.2's\n"
        "table; §12's targets and comfort level); this volume holds only their epoch halves (V06 §3.7.7, V06 §3.8.5, V06 §3.11.7,\n"
        "V06 §3.12.1, V06 §3.20, V06 §6.8).",
        "Items 111, 113, 114, 115, 119, 122, 123 and 125 of file g are applied to the base by the coherence pass at their homes\n"
        "(§2.3's `WaterBody.spring`; §4.11 *History-first generation*, §7.7's DR36–DR40, §2.7's `HistoryRecord`, §2.8's\n"
        "`Provenance.symbolic`; §2.7's `Enceinte.condition` ladder and §7.7's condition row; §4.7 S10b's ceiling and §10.2's\n"
        "table; §12's targets and comfort level; §2.7's `ConditionOverlay` read for the look, §7.7's DR44, §10.2's crisis look\n"
        "table and §8.2's look rows; §2.6 step 7's damage layer and §6.3's `plan.damage`; §4.11 *The clock* (1)'s week); this\n"
        "volume holds only their epoch halves (V06 §3.7.7, V06 §3.8.5, V06 §3.11.7, V06 §3.12.1, V06 §3.20, V06 §3.22, V06\n"
        "§3.23, V06 §6.8) and cites the week (V06 §3.20.3, V06 §5.2).")

    # ======================================== §11 =======================================================================
    sub('R2-06 (c) §11 Q1 price', "It is priced at 29.75–42.25 person-weeks (V06 §8)", "It is priced at 31–44 person-weeks (V06 §8)")

    # ======================================== §12 =======================================================================
    sub('G122-V06 G123-V06 VV56-r1-02 §12 CONFIRMED',
        "V12's\n`BenchBarDef`, `CalibrationRun` kinds and register lint as V06 §8 names them; file g's item 119 (a) and (a2) as V06 §6.8\napplies them.",
        "V12's\n`BenchBarDef`, `CalibrationRun` kinds and register lint as V06 §8 names them; file g's item 119 (a) and (a2) as V06 §6.8\n"
        "applies them; §10.2's crisis look table and its placement, V01's `campLand`, §2.6 step 7's damage layer with §6.3's\n"
        "`plan.damage`, and §4.11 *The clock* (1)'s week, as V06 §3.22, V06 §3.23, V06 §3.20.3 and V06 §5.2 read them.")
    sub('VV56-r1-01 G122-V06 G123-V06 §12 PLAUSIBLE (1)',
        "the way-surface re-lay under a\n   millisecond,",
        "the way-surface re-lay under a\n   millisecond, a dossier catch-up's coarsening by the same estimate (V06 §6.8 (6)), V06 §6.9's rows for the hand-over\n"
        "   and the decay level,")
    sub('G122-V06 G123-V06 §12 PLAUSIBLE (7)',
        "6. that the engine's histories and the replayed pasts read as historically faithful to the owner (the side-by-side\n"
        "   protocol, §13.6, on H-100 and H-HISTORY).",
        "6. that the engine's histories and the replayed pasts read as historically faithful to the owner (the side-by-side\n"
        "   protocol, §13.6, on H-100 and H-HISTORY);\n"
        "7. that the decay level's form — a third of the range per existence state, the years at V11's rate inside it — reads as\n"
        "   item 123 (b)–(c)'s progressive damage, and the unwalled frontier as the ground the next suburb takes (the same\n"
        "   protocol on H-100's decline and H-DOSSIER's camp); V11's item-123 rates and default age are PLAUSIBLE in V11's register.")
