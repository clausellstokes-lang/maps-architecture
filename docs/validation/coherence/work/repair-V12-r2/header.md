# Repair round 2 — V12 (calibration) — lane coherence/repair-V12-r2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V12-r2; covered by the whole-design retrovalidation (J84).

# §8 total: 7.25–11 pw base side (was 6.75–10.25) — W7 + 0.5–0.75 pw (items 121–126's measurements: two pin kinds, the
# device, crisis, force, damage, weather, required-keys and layout fixtures); M-CAL 4.75–8 pw and each later corpus run
# 0.25–0.75 pw unchanged, staged. V12 §8.2 now states the total in one line (*The total*), so scope reads it there (R2-06).
#
# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V12-calibration.md. Live unit: V12 as assemble-r1 installed it
# (sha256 996dee3b5baba28b…, 453 363 bytes; base 137ecc0e…; no round-2 assemble has run). Each REPLACE body is the live
# subsection with count-asserted substitutions (work/repair-V12-r2/build.py over edits_a.py … edits_e.py: 85 edits, each
# applied exactly its asserted count; build.py also proves the blocks alone reproduce the edited volume); every untouched
# line is verbatim. Blocks: 24 REPLACE — §0, §1, §1b, §2.8, §2.10, §2.11, §2.13, §3.4, §3.7, §3.11, §3.12, §3.15 (retitled
# "The owner rules 111–126 on the harness"; its new §3.15.11 – §3.15.16 inside it), §3.16, §4.4, §5.2, §6, §7.1, §7.2, §8.1,
# §8.2, §9, §10.2, §10.3, §12. Ruling requests: 0.
# Binding rulings applied (adjudication-r2, V12's row): R2-05, R2-06, R2-07 (ASSEMBLE NOTE below), R2-08, R2-09, R2-10,
# R2-15, R2-17, R2-26 (d), R2-28 (b), R2-30, R2-32, R2-35, R2-36, R2-37, R2-38, R2-40, R2-41; R2-11's form (DR numbers) in
# the rows touched.
#
# PROGRESS (lane coherence/repair-V12-r2, 2026-10-01)
# - P0 brief read whole (16 issues: 11 major, 5 minor; 7 G-parts new design); adjudication-r2's TOC, V12's eighteen rulings
#   whole, Part H · V12 and its receiving ends read: done
# - P1 issue sources (verify-agree-host, -agree-proof, -edges-life, -vol-V01-V02, -vol-V03-V04, -vol-V05-V06,
#   -vol-V11-V12 r1t), g items 121–126 with 122 (h)–(i) and 126 (a2) whole, the canon's dated routings (J134 – J140) and
#   its adjudication ruling; every V12 subsection concerned read whole; the landed round-2 texts of model, pipeline,
#   determinism, rendering, V02, V04, V06, V09 and V10 read for the names V12 cites (`crises`, the crisis framing,
#   `RosterTables.crisis`, DR44, `plan.damage`, `decayLevel`, *The week's source*, `AppPrefs.resolution`,
#   `AppPrefs.weatherEffects`, §8.8's Resolution and Auto loop, §8.4 (i), R12-35 – R12-38, T-V9-22, T-V9-83 – T-V9-87,
#   T-V4-82 (g), T-V6-75, T-V6-76): done
# - P2 edits_a … edits_e written; blocks built: done
# - P3 dry run of apply-blocks.py on copies of the live V12 and rationale, this file routed as Assemble routes it (the FILE
#   line dropped): 24 found, 24 applied, 0 skipped, audit not-OK 0, one note (the §3.15 retitle), headings 67 → 67, fences
#   30 → 30 balanced, title block unchanged, rationale unchanged; output sha256 5285ff5bdbe28e2e…, byte-identical to the
#   builder's expected volume; tables, ids, internal references and doc_checks below: done
#
# ISSUES → WHERE FIXED (16 routed ids; all FIXED in text or written as NEW DESIGN; none INVALID; none parked)
#  VAH-r1-11 (R2-10)  `RuleAnswer` cited as §11.2's, read by the clerk (V10 §3.5), at the four sites — §2.10, §2.11's
#        `CalibrationEntry` row, §4.4, T-V12-21 — and at X-V12-7's closing cell (the same citation: "§11.2
#        (`RuleAnswer.register`); V10 §3.5", as V10 r2's hand-off row reads).
#  VAP-r1-08 (R2-08)  T-V12-48's head "(takes T115-1's statistic, T115-4's two pins and T116-1's statistic)"; T-V12-50's
#        "(takes T119-1's target report, T119-2's timer, T119-4's budget-register check and T119-5's interaction-row
#        comparison)".
#  VAP-r1-11 (R2-09)  §3.7.8's list: V05's "… T-V5-33's item-111 clause and T-V5-34 – T-V5-36", V07's "(… T-V7-62, T-V7-63,
#        T-V7-65, T-V7-66, T-V7-68)"; §2.13's `item115.off` suites "V07's village goldens (T-V7-63)", `item120.find`'s
#        "V07's village goldens (T-V7-68)".
#  VAP-r1-12  §10.3's structure-knob row cites T-V6-61 and T-V6-62 (the issue's text).
#  VV12-r1-08 (R2-15)  §3.11's `deck` line ends at "the panel rule".
#  VV34-r1-07 (R2-28 (b))  §3.11's "V04's other item-109 cells" row: `accessForecastMin` is `under.rule`'s base cell
#        (registry row 57; II.7.4's `UndergroundRule`, its default written there beside `forecastSafety`'s), owner `base`,
#        its entry landed at `V4-U3b`, the step of its reader P7, on the same default line; the other cells V04's (as V04
#        r2's U3b row reads).
#  VV56-r1-07 (R2-09)  §2.13: `item117.season` "the sky goldens (V05, T-V5-34)", `item118.festival` adds "the sky goldens
#        (V05, T-V5-35)", `item120.find` adds "the sky goldens (V05, T-V5-36)"; X-V12-11's list adds T-V5-34 – T-V5-36
#        (§3.7.8's list by VAP-r1-11 above).
#  VV1112-r1-02 (R2-17)  the due map — which stands in §2.8's *Milestone ids* (l. 721), not §2.6 as the issue's
#        location says — reads "C4a `M2b`, C4b `M-SF` (no entry: the dossier row sets are not calibratable), C5 …, C8
#        `M6-U`, C9 the milestone that lands each owner item's base part (V11 §8; §13.8)"; §12 PLAUSIBLE 11 reads "at C2's
#        and C4a's exits".
#  VV1112-r1-03 (R2-09)  §3.7.8 (1) names V03's `roomProgram` `exposureAllStoreys` among item 110's off forms; §2.13's
#        item-110 row: "`item110.terrace`'s overlay also sets V03's `exposureAllStoreys` false (item 110 (a)), so the four
#        pins together are V11 §3.24.0's six switches off".
#  G126-V12 (R2-41, R2-35, R2-36)  §3.15.10 drops "phone sheet"; new §3.15.16 *Item 126 — tablets and desktops only*:
#        `layout.touch` (T126-1 at 600 × 480 under touch events), `layout.belowMedium` and the pin `item126.resize` (T126-2:
#        the resize script 1 024 × 768 → 600 × 480 → 599 × 479 → 480 × 360 → 1 024 × 768, the model digest, saved bytes,
#        view key and selection byte-identical, the medium layout held, no tool withheld), no phone viewport in any fixture;
#        on the harness registry's `conformance` list (§3.15's head; T-V12-35); §1b, §1, §2.13, §3.4.2, §3.12 rows; §3.16
#        row 37; §6 row; T-V12-59; J-V12.105; W7's M2a cell. Numbered §3.15.16, the six new items in item order
#        (§3.15.11 – §3.15.16), where the issue wrote "3.15.11".
#  G121-V12 (NEW DESIGN; R2-35, R2-09 `item121.display`, R2-36 M4)  new §3.15.11: on V09's app harness, three device fixtures,
#        T121-2 (`resolution.changes` on a threshold fixture straddling the loop's two tests: 0 changes in a gesture, ≤ 1
#        per 10 s), T121-3 (`resolution.p95` on the reference and low-end devices), T121-5 (`resolution.textPx`, a pixel
#        test on V09's T-V9-84 captures), T121-6 (`item121.display`, `view` with `exports`), T121-8 (`resolution.ultra4k`:
#        ≤ 512 MB by §12.8's measurement, no light rung given up); T121-1, T121-4, T121-7 named as V09's T-V9-84 (R2-35, so
#        the edges-life version's (c) and (f) are V09's); a screen above 4K at its 4K-equivalent DPR; R12-36's change on a
#        miss. §3.4.2, §1b, §1, §2.13, §3.12, §3.16 row 32 (a device below the low tier; 5K and 8K), §6, T-V12-53,
#        J-V12.100, W7's M4 cell, §12 PLAUSIBLE 14.
#  G122-V12 (NEW DESIGN; R2-35, R2-37, R2-09 `item122.crises`, R2-36)  new §3.15.12: T122-1 and T122-7 by the pin (`view`,
#        `tiles`: `follow` every week, `off`, each look's `preview`), T122-2 `crisis.weeks`, T122-3 `crisis.stable`, T122-5
#        `crisis.scale`, T122-6 `crisis.blocked` (a carriageway included, §10.2 (d)); T122-4 named as V11's compile check
#        and V08's census; the looks' raster (R12-37, rendering's hand-off) by `time.crisisReskin` and
#        `crisis.rasterShare`; previews from M3b, V08's dossier crisis fixtures from M-SF. Rows as G121; T-V12-54; J-V12.101.
#  G122h-V12 (NEW DESIGN; R2-35: the four bars V12's own; R2-30, R2-37 (8))  §3.15.12's second part on V08's force fixtures:
#        `crisis.areaPerHead` in [0.9, 1.1], `crisis.coalition` in [1.8, 2.2], `crisis.framing` (every camp inside the
#        opening view, Fit and the limit while a look stands; item 116's limit back in the first week none stands; a moved
#        view never re-framed), `crisis.ring` (the 60 000-head THORP siege: the ring's arcs; frame, margin, digest and hash
#        unchanged). T-V12-55; §3.16 row 33.
#  G123-V12 (NEW DESIGN; R2-35, R2-38, R2-09 `item123.damage`, R2-36)  new §3.15.13: T123-2 `damage.nested` (21 levels of
#        §6.3's one comparison, and V06's decay runs from M6-E), T123-3 `damage.breakLevel` (across regeneration, load,
#        undo and migration; the five engines determinism §6.5 (9)'s), T123-7 the pin `item123.damage` of the new kind
#        `entityScope` (buildings whose lineage never held `abandoned`, `decayed` or `ruined`), V04's T-V4-82 (g) its
#        underground suite; T123-1, T123-4, T123-5, T123-6 named as V03's, V04's, V06's and V02's (R2-35). T-V12-56;
#        J-V12.102; §3.16 row 34.
#  G124-V12 (NEW DESIGN; R2-35, R2-39, R2-09 `item124.effects`; MOOT in part, R2-41: no phone default)  new §3.15.14:
#        T124-1 and T124-8 by the pin (`view` with `cache` and `exports`), T124-2 `weather.frameMs` (R12-38), T124-3
#        `weather.snow`, T124-4 `weather.aridRain` (a Poisson count over a clock expecting ≥ 50 spells), T124-6
#        `weather.cover`, T124-7 `weather.luma` against §8.4 (i)'s limit, T124-9 `weather.replay`; T124-5 named as V09's
#        T-V9-87. T-V12-57; J-V12.103; §3.16 row 35.
#  G125-V12 (NEW DESIGN; R2-35, R2-40, R2-09 `item125.host`)  new §3.15.15: T125-1 `port.fallbacks` on the required-keys
#        dossier (every used, absent field reported with its fallback; every stage's output; week 0 and midsummer by R2-40's
#        sentence), T125-2 the pin `item125.host` of the new kind `input` (no host context and each fixture `HostContext`:
#        `audience`, `displayNames`, `line` — `customLibrary` retired); T125-3 named as V08's (R2-35). T-V12-58; J-V12.104;
#        §3.16 row 36.
#  The pins and kinds (R2-09; J-V12.99, J-V12.87 marked amended): `NoOpPin.kind` gains `entityScope` and `input`; `view.key`
#        gains `crises`, `resolution`, `effects`, `viewport` and the clauses `exports`, `cache`, `session`; §3.7.8 (5)
#        states each, (6) its planted cases; registration refuses an `entityScope` pin without `entities` and an `input`
#        pin without values. Items 121 – 126's cells in the register: the look cells of items 122 – 124 on the default line,
#        items 121, 124 and 126's ladders, thresholds, frame cost and window minimum engineering constants (J-V12.106).
#
# RECEIVING ENDS (Part H · V12 and the landed round-2 texts)
#  R2-26 (d): §3.11's `raisedWays.structure` line covers `stripMarginM` (the under-deck strip's one margin cell, §4.6 S8).
#  R2-30: `view.limitStop`, §3.15.6 and T-V12-48 read "the whole bounds, or stop 0 where they do not fit" (the METROPOLIS
#        cap at 1 280 × 720 and 600 × 480 CSS px).
#  R2-32: T-V12-52 and §6's Find row at M5; §8.1 and W7 place Find at M5; §3.15.10 "from M5".
#  R2-35: T-V12-52 takes T120-1 and T120-6, its statistics measuring T120-2 – T120-5 whose interface clauses V09's
#        T-V9-83 takes; §2.13's `item120.find` bar reads T120-1.
#  R2-36: §3.15's head, §8.1 and W7 place items 120 – 126 (M5; M4; M3b; V03's damaged-plan step and M6-E; M-SF; M2a).
#  R2-11: the dossier table's rows touched cite DR40 (the oasis; the row read "DR1"), DR41, DR42, DR43, DR44.
#  R2-40 (1): the dossier table's week row reads the stamped ticks as the present week's one source (§4.11 *The clock*).
#  V04 r2 (landed 07:43): T-V4-82 (g)'s `item123.damage` suite in §2.13, §3.7.8's list, X-V12-11 and §10.3.
#  V09 r2 (landed 07:39): "T121-5's pixel captures are taken on V09's harness by T-V9-84; V12's bar cites it" — §3.15.11,
#        §10.3, X-V12-20.
#  rendering r2 (landed 07:49): "V12: measurements for R12-35 – R12-38" — R12-35 (V12 §3.15.10's timings, as before),
#        R12-36 (§3.15.11), R12-37 (§3.15.12's raster bullet, new), R12-38 (§3.15.14).
#  V06 r2 (landed 07:35): §2.13's `item115.ceiling` row and §3.7.8's list already name T-V6-74; T-V6-75 and T-V6-76 named as
#        V06's clauses in §3.15.12, §3.15.13 and §10.3.
#  pipeline r2: §10.2 *Crisis looks* (i)'s "V12's item-122 (h)–(i) measurements" — §3.15.12 (T-V12-55), §10.3.
#
# ASSEMBLE NOTE (R2-07; Part H · V12's receiving end). docs/volumes/V12-calibration.md line 8, inside the title's level-1
#  subsection (the reading guide, not a marker line), reads "`item n` is an amendment item — 1–101 the owner's
#  instructions, 102–120 file g's owner and program rules, 200 and above file f's"; in R2-07's form the g clause states no
#  upper number: "1–101 the owner's instructions, file g's items, from 102, its owner and program rules, 200 and above file
#  f's". Text inside the title block is Assemble's to set (R2-07); no block here touches it.
#
# WORDS (principle (9)'s report; `wc -w`): 72 151 before, 81 674 after (+9 523, +13.2 %). Sources: new design of owner
#  items 121 – 126 and their wiring, lifecycle, edge, test, budget and decision rows (+9 320); the defect fixes and receiving
#  ends (+203, net of R2-15's removed stand-in clause, a ruled removal). No restatement or narration was found in the units
#  touched; this is a repair round adding owner items' parts, so the unit grows and its shrink stays the rewrite's.
#
# CHECKS. Dry run (above). Tables: every new row has its header's cell count (the six pre-existing escaped-pipe rows
#  unchanged). Ids: T-V12-1 – T-V12-59, J-V12.1 – J-V12.106, X-V12-1 – X-V12-20 and §3.16's rows 1–37 each defined once;
#  every T-V12 and J-V12 id cited is defined; every "V12 §3.15.n" cited exists. Phone: every mention states an absence (item
#  126 (a2)). doc_checks (WARNING: reference corpus INCOMPLETE — captures, research/patreon, research/devlogs,
#  research/ftg-docs and research/external absent — so the clean-room results are NOT authoritative; provisional): before
#  → after C1 8 → 8 (0 unreviewed), C2 0 → 0, C3 126 → 141 hits (114 → 128 unreviewed: runs of common words and section
#  numbers, no identifier, palette or list), C4 2 → 2 (0 unreviewed), S1 0 → 0, S2 107 → 113 (12 → 12 unreviewed:
#  volume-prefixed pointers S2 resolves against the base's headings only).
#
# HAND-OFFS (R2-05 (3): ends no ruling names, for round 3's verifiers; none is open wording in the design text)
#  * V08 (not landed when this file was written): X-V12-5 now names its crisis fixtures, force fixtures (single armies of
#    1 000, 4 000 and 12 000 heads; a two-army coalition of 4 000 each; a migrant group of 3 000; a 60 000-head siege of a
#    THORP) and its required-keys dossier, each in §13.2's frozen manifest; V08 §7 is their home. Should V08's T125-2 test
#    register its port fixtures as a suite of `item125.host`, V12 §2.13's row and §3.7.8's list add its test id (R2-09).
#  * V03 (not landed): V12 cites "the V03 step that draws a decayed or ruined plan (V03 §8)" as item 123's placement
#    (R2-36); should V03's T123-7 test register B-PLAN on `item123.damage`, V12 §2.13's row and §3.7.8's list add its id.
#  * V07 (not landed): T-V12-54 and §3.15.12 cite "V07's village test" for T122-5 and T122-6 at the village rungs (R2-35);
#    V07 names its test id there.
#  * rendering (landed): §8.2's greyscale bar (ARCHITECTURE.md l. 12681, and the round-2 text) cites "V12's
#    `T114g.greyscale`"; V12 has no such spec — item 114's greyscale bar is the `BenchBarDef` `T114-6` (V12 §3.15.4,
#    J-V12.98), its statistic `bar.T114-6`. The base's end should cite `bar.T114-6`.
#  * scope (R2-35, R2-06): §13.2's take-over table's V12 row names T120-1, T120-6, T121-2, T121-3, T121-5, T121-6, T121-8,
#    T122-1 – T122-3, T122-5 – T122-7, T123-2, T123-3, T123-7, T124-1 – T124-4, T124-6 – T124-9, T125-1, T125-2, T126-1's
#    medium-minimum clause and T126-2, beside item 122 (h)–(i)'s four bars (T-V12-55); §16's rig line and INDEX §1 read
#    V12's base side as 7.25–11 pw (W7 1.25–2); §13.2's convention (6)'s `conformance` list holds items 120 – 126's
#    statistics' clauses (V12 §3.15's head; T-V12-35).
#  * V11 (not landed): items 122, 123 and 124's look cells (the crisis look rows and settings, the damage threshold ranges,
#    decay rates and default age, the climate weather columns) are calibratable and take V12 §3.11's default line; their
#    `ColumnSpec`s mark them so.

