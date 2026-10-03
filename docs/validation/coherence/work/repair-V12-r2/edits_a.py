"""edits_a — the defect issues of V12's round-2 list and the receiving ends of R2-15, R2-17, R2-26 (d), R2-28 (b), R2-30,
R2-32 (tags: the issue or ruling each edit applies). New design of items 121–126 is edits_b … edits_e."""


def apply(sub, after_line):
    # ---- VAH-r1-11 (R2-10): `RuleAnswer` is §11.2's; the clerk reads it (V10 §3.5) --------------------------------------
    sub('VAH-r1-11 §2.10',
        "The tables editor's cell inspector (V09 §4.14) and the clerk's provenance answer (V10 §2.13's `RuleAnswer`)\n"
        "read this file",
        "The tables editor's cell inspector (V09 §4.14) and the clerk's provenance answer (§11.2's `RuleAnswer`, read by the\n"
        "clerk, V10 §3.5) read this file")
    sub('VAH-r1-11 §2.11',
        "hence V09 §4.14's cell inspector and V10 §2.13's `RuleAnswer`)",
        "hence V09 §4.14's cell inspector and §11.2's `RuleAnswer`, read by the clerk, V10 §3.5)")
    sub('VAH-r1-11 §4.4',
        "clerk's \"why\" (V10 §2.13's `RuleAnswer`) answers a question about a value",
        "clerk's \"why\" (§11.2's `RuleAnswer`, read by the clerk, V10 §3.5) answers a question about a value")
    sub('VAH-r1-11 T-V12-21',
        "the cell inspector (V09 §4.14) and the clerk's `RuleAnswer` (V10 §2.13) show the plain line",
        "the cell inspector (V09 §4.14) and §11.2's `RuleAnswer`, read by the clerk (V10 §3.5), show the plain line")
    sub('VAH-r1-11 X-V12-7 (the same citation at its closing cell)',
        "a stamped cell answers \"the owner's rule, item …\"; the clerk never starts a run | V10 §2.13 |",
        "a stamped cell answers \"the owner's rule, item …\"; the clerk never starts a run | §11.2 (`RuleAnswer.register`); V10 §3.5 |")

    # ---- VAP-r1-12: the structure knobs' tests are T-V6-61 and T-V6-62 ----------------------------------------------------
    sub('VAP-r1-12 §10.3',
        "| V06 §2.2's structure knobs; V06 §7 (T-V6-66 – T-V6-69) | `retaining.holdM`, `.neglectAfterYears`, `.stretchM` and "
        "`aqueduct.disuseAfterYears` as V11 §3.18's cells; T-V6-66 – T-V6-69 in the nightly tier | V12 §3.11's `decline` line "
        "(owner V11); T-V6-66 – T-V6-69 are V06's, nightly on its fixtures by §13.8, each a `BenchBarDef` where a line names it |",
        "| V06 §2.2's structure knobs; V06 §7 (T-V6-61, T-V6-62) | `retaining.holdM`, `.neglectAfterYears`, `.stretchM` and "
        "`aqueduct.disuseAfterYears` as V11 §3.18's cells; T-V6-61 and T-V6-62 in the nightly tier | V12 §3.11's `decline` line "
        "(owner V11); T-V6-61 and T-V6-62 are V06's, nightly on its fixtures by §13.8, each a `BenchBarDef` where a line names it |")

    # ---- VV12-r1-08 (R2-15): no deck stand-in anywhere ---------------------------------------------------------------------
    sub('VV12-r1-08 §3.11 deck line',
        "| `deck.buildings` | the panel rule; V02's stand-ins `deck.fallbackM2` and `deck.fallbackFloors` close `fixed: superseded "
        "by V11's deck row` when that row lands |",
        "| `deck.buildings` | the panel rule |")

    # ---- VV34-r1-07 (R2-28 (b)): `accessForecastMin` is `under.rule`'s base cell --------------------------------------------
    sub('VV34-r1-07 §3.11 V04 row',
        "| V04's other item-109 cells (`voidDwellings`, `accessForecastMin`, `under.layout`'s `overlapShaftM` and "
        "`overlapShaftChance`, the fade rows) | V04 | the default line",
        "| V04's other item-109 cells (`voidDwellings`, `under.layout`'s `overlapShaftM` and `overlapShaftChance`, the fade "
        "rows); and `accessForecastMin`, `under.rule`'s base cell (registry row 57; II.7.4's `UndergroundRule`, its default "
        "written there beside `forecastSafety`'s), its entry landed at `V4-U3b`, the step of its reader P7 | V04; "
        "`accessForecastMin` `base` | the default line")

    # ---- R2-26 (d): the under-deck strip's one margin cell is in `raisedWays.structure` ------------------------------------
    sub('R2-26 (d) §3.11 raisedWays.structure line',
        "`pierMinCm`, `material` by band, `slideMaxFactor` (file f item 244), and every other calibratable column but the `span` "
        "block (the span-rule line's)",
        "`pierMinCm`, `material` by band, `slideMaxFactor` (file f item 244), `stripMarginM` (the under-deck strip's one margin "
        "cell, read by §4.6 S8, shipped with item 110's rows from M3a), and every other calibratable column but the `span` "
        "block (the span-rule line's)")

    # ---- VV1112-r1-02 (R2-17): V11's content milestones C4a and C4b; C9 dated -----------------------------------------------
    sub('VV1112-r1-02 §2.6 due map',
        "C0 `M0`, C1 `M1`, C2 `M2b`, C3 and C3b `M3a`, C4's wall rows `M2b`, C5 `M2b` for\n"
        "its O13-core part and `M3b` for the rest, C6 `M4`, C7 `M4b`, C8 `M6-U` — so no `V11-` id exists,",
        "C0 `M0`, C1 `M1`, C2 `M2b`, C3 and C3b `M3a`, C4a `M2b`, C4b `M-SF` (no entry:\n"
        "the dossier row sets are not calibratable), C5 `M2b` for its O13-core part and `M3b` for the rest, C6 `M4`, C7 `M4b`,\n"
        "C8 `M6-U`, C9 the milestone that lands each owner item's base part (V11 §8; §13.8) — so no `V11-` id exists,")
    sub('VV1112-r1-02 §12 PLAUSIBLE 11',
        "(the one-knob-one-entry check finds any at C2's and C4's exits)",
        "(the one-knob-one-entry check finds any at C2's and C4a's exits)")

    # ---- VV1112-r1-03 (R2-09): item 110's six switches ---------------------------------------------------------------------
    sub('VV1112-r1-03 §3.7.8 (1)',
        "1. **\"Off\" is stated once**: V11 §3.24.0's switch table for item 110 (one named off form per row set: `terrace`,\n"
        "   `raisedWays`, `deck`, `roster.specialisations`, `deck.landmarks`) and its rows",
        "1. **\"Off\" is stated once**: V11 §3.24.0's switch table for item 110 (one named off form per row set: `terrace`,\n"
        "   `raisedWays`, `deck`, `roster.specialisations`, `deck.landmarks`, and V03's `roomProgram` `exposureAllStoreys`) and\n"
        "   its rows")
    sub('VV1112-r1-03 §2.13 item-110 row',
        "| V11 §3.24.0's switch table, one row set per family (the stepped family's `roster.specialisations` included, which a pin "
        "leaving it on would not isolate) |",
        "| V11 §3.24.0's switch table, one row set per family (the stepped family's `roster.specialisations` included, which a pin "
        "leaving it on would not isolate); `item110.terrace`'s overlay also sets V03's `exposureAllStoreys` false (item 110 (a)), "
        "so the four pins together are V11 §3.24.0's six switches off |")

    # ---- VAP-r1-11, VV56-r1-07 (R2-09): the volume pins that register, by test id ------------------------------------------
    sub('VAP-r1-11 §3.7.8 list (V05)',
        "V05's T-V5-15, T-V5-19 (c), T-V5-22 (b)\n"
        "and (k), T-V5-27 and T-V5-33's item-111 clause;",
        "V05's T-V5-15, T-V5-19 (c), T-V5-22 (b)\n"
        "and (k), T-V5-27, T-V5-33's item-111 clause and T-V5-34 – T-V5-36;")
    sub('VAP-r1-11 §3.7.8 list (V07)',
        "V07's pins by its §7 rule (T-V7-33, T-V7-38, T-V7-52, T-V7-58, T-V7-59, T-V7-62, T-V7-65, T-V7-66);",
        "V07's pins by its §7 rule (T-V7-33, T-V7-38, T-V7-52, T-V7-58, T-V7-59, T-V7-62, T-V7-63,\n"
        "T-V7-65, T-V7-66, T-V7-68);")
    sub('VAP-r1-11 §2.13 item115.off',
        "| `item115.off` | T115-4 (T-V11-41 (b)) | offForm | V11 §3.24.0's `grandeur.ceiling` `enabled` false on every row | the "
        "golden suite; V07's village goldens |",
        "| `item115.off` | T115-4 (T-V11-41 (b)) | offForm | V11 §3.24.0's `grandeur.ceiling` `enabled` false on every row | the "
        "golden suite; V07's village goldens (T-V7-63) |")
    sub('VV56-r1-07 §2.13 item117.season',
        "| `item117.season` | T117-1 | view | weeks 0 – 51 | the golden suite; the sky goldens (V05); V07's village goldens "
        "(T-V7-65) |",
        "| `item117.season` | T117-1 | view | weeks 0 – 51 | the golden suite; the sky goldens (V05, T-V5-34); V07's village "
        "goldens (T-V7-65) |")
    sub('VV56-r1-07 §2.13 item118.festival',
        "| the golden suite; V07's village goldens (T-V7-66); the festival fixtures |",
        "| the golden suite; the sky goldens (V05, T-V5-35); V07's village goldens (T-V7-66); the festival fixtures |")
    sub('VV56-r1-07 VAP-r1-11 R2-35 §2.13 item120.find',
        "| `item120.find` | §13.2's item-120 bar of item 120 (k)'s hash and tiles clauses | view (`tiles`) | Find `off`; each Find "
        "fixture's chip sets, Show gaps off and on (V12 §3.15.10) | the golden suite; V07's village goldens |",
        "| `item120.find` | T120-1 | view (`tiles`) | Find `off`; each Find fixture's chip sets, Show gaps off and on "
        "(V12 §3.15.10) | the golden suite; the sky goldens (V05, T-V5-36); V07's village goldens (T-V7-68) |")
    sub('VV56-r1-07 X-V12-11',
        "T-V5-27, T-V5-33's item-111 clause, T-V6-12's `w_sun` clause,",
        "T-V5-27, T-V5-33's item-111 clause, T-V5-34 – T-V5-36, T-V6-12's `w_sun` clause,")

    # ---- VAP-r1-08 (R2-08): the take-over heads name their base bars -------------------------------------------------------
    sub('VAP-r1-08 T-V12-48 head',
        "| T-V12-48 | **Items 115 and 116.** `bldg.grandeur`",
        "| T-V12-48 | **Items 115 and 116** (takes T115-1's statistic, T115-4's two pins and T116-1's statistic). `bldg.grandeur`")
    sub('VAP-r1-08 T-V12-50 head',
        "| T-V12-50 | **Item 119's measurements.** On the timing-phase runs",
        "| T-V12-50 | **Item 119's measurements** (takes T119-1's target report, T119-2's timer, T119-4's budget-register check "
        "and T119-5's interaction-row comparison). On the timing-phase runs")

    # ---- R2-30: item 116 at the METROPOLIS cap — the whole bounds, or stop 0 where they do not fit -------------------------
    sub('R2-30 §3.4.2 view.limitStop',
        "| `view.limitStop` | model | f | per map, the zoom-out limit's stop (§8.8), whether the whole `bounds` fits the viewport's "
        "short side there, and the count of reachable stops beyond it (0 by rule) |",
        "| `view.limitStop` | model | f | per map and viewport, the zoom-out limit's stop (§8.8), whether the whole `bounds` fits "
        "the viewport's short side there, or, where no stop fits them, whether the limit is stop 0 (J122), and the count of "
        "reachable stops beyond it (0 by rule) |")
    sub('R2-30 §3.15.6',
        "**3.15.6 Item 116 — the zoom-out limit.** T116-1 — at every rung from THORP to the cap the limit shows the whole bounds and\n"
        "no stop beyond it is reachable — is a conformance sweep on B-ZOOM (§13.4) over B-CITY-lite's seeds of every rung and V07's\n"
        "village fixtures (V07's T-V7-64), its statistic `view.limitStop` (0 reachable stops beyond the limit; the whole bounds\n"
        "inside the limit's view), reported in the nightly statistics;",
        "**3.15.6 Item 116 — the zoom-out limit.** T116-1 — at every rung from THORP to the cap the limit shows the whole bounds, or\n"
        "is stop 0 where they do not fit (§8.8; J122), and no stop beyond it is reachable — is a conformance sweep on B-ZOOM (§13.4)\n"
        "over B-CITY-lite's seeds of every rung and V07's village fixtures (V07's T-V7-64), its statistic `view.limitStop` (0\n"
        "reachable stops beyond the limit; the whole bounds inside the limit's view, or the limit at stop 0 where they do not fit —\n"
        "the METROPOLIS cap's frame in a 1 280 × 720 and a 600 × 480 CSS-px viewport among the cases), reported in the nightly\n"
        "statistics;")
    sub('R2-30 T-V12-48',
        "`view.limitStop` reports the whole bounds inside the limit and 0 reachable stops beyond it at every rung THORP – "
        "METROPOLIS, and a planted extra stop fails",
        "`view.limitStop` reports the whole bounds inside the limit, or the limit at stop 0 where they do not fit (the "
        "METROPOLIS cap at 1 280 × 720 and at 600 × 480 CSS px), and 0 reachable stops beyond it at every rung THORP – "
        "METROPOLIS, and a planted extra stop fails")

    # ---- R2-32: Find lands at M5 -------------------------------------------------------------------------------------------
    sub('R2-32 T-V12-52 tier',
        "the chip sets drawn by `find/<seed>` reproduce | C | the milestone that lands Find (V09 §8) |",
        "the chip sets drawn by `find/<seed>` reproduce | C | M5 (Find's milestone, §16) |")
    sub('R2-32 §6 item-120 row',
        "| ≤ 10 CPU-min nightly; the timings inside §13.8's timing phase | the milestone that lands Find (V09 §8) |",
        "| ≤ 10 CPU-min nightly; the timings inside §13.8's timing phase | M5 (Find's milestone, §16) |")
