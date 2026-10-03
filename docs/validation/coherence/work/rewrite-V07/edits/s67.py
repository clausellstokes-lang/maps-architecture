from lib import *
t = extract(3224, 3359)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t)
t = t.replace('first paint', 'first map')
t = t.replace("`research/findings/profile-village.md` V07 §5", "`research/findings/profile-village.md`, section 5")
t = t.replace("`research/sf/dossier-outputs.md` V07 §3)", "`research/sf/dossier-outputs.md`, section 3)")
t = t.replace("`research/findings/profile-village.md` V07 §3.3,\nV07 §5 and its addenda N1–N5)", "`research/findings/profile-village.md`, sections 3.3\nand 5 and its addenda N1–N5)")
R = [
# §6: G-dwell in the work limits; item 111 and 113 costs; TX-04
("trackers ≤ 4 +\n0.3 × D + 3; slots ≤ 3 × D + the institutions' joins; the daylight sweeps 9 × the cells; all laws of `D` (V07 §3.2 (3)).",
 "trackers ≤ 4 +\n0.3 × N + 3; slots ≤ 3 × N + the institutions' joins; the daylight sweeps 9 × the cells; all laws of `N` (V07 §3.2 (3))."),
("VS4's piers. **The underground tail**", "VS4's piers. Item 111 adds VS1's water proximity ≤ 1 ms (one distance pass over ≈ 72 000 cells) and nothing elsewhere\n(its terms are sums in existing passes). **The underground tail**"),
("on an absorb without an epoch the same per-record bounds inside the absorb's commit.",
 "on an absorb without an epoch the same per-record bounds inside the absorb's commit. **At a base-product epoch** while a\nsuperseded plan exists, the participant `village.density` re-runs VS2 on the old core's recorded inputs: ≤ 6 ms at the\nVILLAGE top's box (≈ 150 000 cells), inside the base product's epoch budget (V06 §6.2's row cites this bound). **History\nreplay at village rungs** (V07 §3.12a): each replay epoch at a village rung within the epoch bound above, inside V06's\ngeneration budget; a refounding reads `history.former` through one spatial index (≤ 1 ms to build at the VILLAGE top)."),
# §7
("`D_v + D_o = D` and every household is housed once; with a dossier, the residential building count (`D_v + D_o`)",
 "`N_v + N_o = N` and every household is housed once; with a dossier, the residential building count (`N_v + N_o`)"),
("(restated for item 110 (a), critique V7C-38)", "(item 110 (a))"),
("a `Toll bridge` fixture on a dry `plains` site gets a brook its through road crosses by a bridge, and on `desert` without `oasis_water` its toll house stands at an entry with `toll_bridge_dry` reported;",
 "a `Toll bridge` fixture on a dry `plains` site gets a brook its through road crosses by a bridge, and on `desert` without `oasis_water` and with no river drawn its toll house stands at an entry with `toll_bridge_dry` reported (V08 §2.6b (3));"),
("| T-V7-20 | item 103 at village rungs (g's statistics suite, village rows):", "| T-V7-20 | item 103 at village rungs (§13.2's statistics suite, village rows):"),
("unit words, section pointers and the restated reference constructions' literals excepted by an allow list keyed to their D5.n rows, and implementation parameters that change no output (a spatial index's cell size) (the doc-check form of critique V1C-33); the item-110 constants of V07 §3.5a, V07 §3.8a and V07 §3.10a included in the scan;",
 "unit words, section pointers and the restated reference constructions' literals excepted by an allow list keyed to row D5, and implementation parameters that change no output (a spatial index's cell size); the item-110 constants of V07 §3.5a, V07 §3.8a and V07 §3.10a and item 111's and item 113's of V07 §3.2 (4a) and V07 §3.12a included in the scan;"),
("| T-V7-46 | no generation below TOWN (item 110 (b) as revised):", "| T-V7-46 | no generation below TOWN (item 110 (b)):"),
("`D_v` exact before and after the add;", "`N_v` exact before and after the add;"),
("an unbroken aqueduct's delivery point counts as a well (no well within 120 m),", "an unbroken aqueduct's delivery point counts as a well (no well within `pins.wellWithinM`),"),
("`D_v` and every toft byte-identical with the deck rows on and off;", "`N_v` and every toft byte-identical with the deck rows on and off;"),
("| T-V7-52 | no-op pins (item 110 (f)): with the terrace, raised-way and deck-plot rows off, `B-VILLAGE` is byte-identical to the pre-110 build; under `VG`, byte-identical to the pre-110 `VG` preset |",
 "| T-V7-52 | no-op pins (item 110 (f)): with the terrace, raised-way and deck-plot rows off — V11 §3.24.0's switch table read as \"off\": every `deck.offer` 0, `terrace.enabled` false — `B-VILLAGE` is byte-identical to the pre-110 build; under `VG`, byte-identical to the pre-110 `VG` preset; registered as the village pin, a `NoOpPin` on V12 §3.7.8's engine with its `terrace.enabled` switch (E-20) |"),
("| T-V7-53 | renders: B-ZOOM's role continuity for the item-110 roles (`retaining_wall`, `way.stair`, `way.ramp`, `raised.deck`, `raised.support`, `raised.ruin`, `aqueduct.channel`, the tier roles)",
 "| T-V7-53 | renders: B-ZOOM's role continuity for the item-110 marks (the base's `retaining`, `raisedWay`, `way.stair` and `ruin` programs in this family's forms `retaining.wall`, `way.stair`, `way.ramp`, `raised.deck`, `raised.support`, `raised.ruin`, `aqueduct.channel`; the tier roles)"),
("every `v.` row carries a `label` (V11's label check, T-V11-4 as seam-settlements-r5 SR5-03 extends it),", "every `v.` row carries a `label` (V11's label check, T-V11-4),"),
("| T-V7-29 | the owner's side-by-side against VG (§13.6's D-5 protocol, twenty pairs over VG's tag sets, the `VG` preset beside VG and the default beside VG)",
 "| T-V7-29 | the owner's side-by-side against VG (§13.6's D-5 protocol, twenty pairs over VG's tag sets, the `VG` preset beside VG and the default beside VG; the panel a `PanelSpec` on V12 §3.9's engine, its pairs item 500's `D5Pair`s)"),
("— V12's `vg.*` family, each metric `vg.<name>` (the accepted share\n`vg.acceptedShare`, the one a register entry names, V07 §3.15).",
 "— V12's `vg.*` family, each metric `vg.<name>` (the accepted share\n`vg.acceptedShare`, the one a register entry names, V07 §3.15), held as `Baseline` rows of input `counts` or `geo` under\nthe `'VG'` reference (item 496)."),
]
t = apply(t, R, strict=False)
t = t.replace('## 8 Build plan', '').rstrip()
# new tests
newtests = """
| T-V7-58 | item 111 at village rungs (V07 §3.2 (4a)): on the bench's arid set the share of households within the water-supply family's walking distance of water exceeds the non-arid baseline's; an oasis stands only on an arid site unless drawn (T2 `ground`'s spring flag) or supplied (`oasis_water`, DR40); arid sites draw the flowing, still and coastal types at the `aridWater` shares within ± 3 s.e.; the richest band's mean distance to water lies below the middle band's on arid seeds; on arid seeds with no other water the heart lies within the oasis's pull radius on ≥ 80 %; every well's yield class at or above its random baseline's on arid seeds; with the oasis chance, `w_water`, `w_waterP`, the coverage factor and the sunlight cell neutral and `aridWater` 1, byte-identical to the build without item 111 (a `NoOpPin` on V12 §3.7.8, E-20) — §13.2's T111-n bars read at village rungs | C, O | V-M2 |
| T-V7-59 | item 113 at village rungs (V07 §3.12a; with M6-E): a "city to village" history fixture shows walls and street lines beyond the present fabric, field boundaries on the old street lines and a church larger than every `v.parish_church` template's p95, while the dossier's present facts match exactly (T-V7-13's clauses); the replay is byte-identical across the five engines per seed and history; a refounded fixture's new roads run within `refound.snapM` of the former ways over a larger share of their length than a random baseline, every former bridge over an unmoved river is rebuilt, and a gate stands at a former gate gap wherever the palisade snapped onto the former wall; buried remnants appear only past `history.burialYears`; a symbolic peak's facts carry `symbolic`; with the replay off, byte-identical (a `NoOpPin`) | C, O | V-M3 |
| T-V7-60 | the village `WhyProvider` (V07 §4.5): every `VillagePlan`, `VillageField` and `VillageEnd` on the bench answers `why` with its row of V07 §4.5's table — the facts, the cause, the pulls and each `says` key present in V09's catalogue; a withheld target answers `withheld` with nothing more; V10's provider-completeness test finds this provider for the three owed kinds | C | V-M3 |
| T-V7-61 | empty and one-item inputs (V07 §3.17): a one-person thorp, a site with no water, an `isolated` topology, no open space, no landing, no institution record, `arableFactor` 0, a single kept palisade point, a single nucleus — each builds with its row's defined outcome, 0 crashes, 0 whole-map retries, every rung reported | C | V-M1 |
| T-V7-62 | degenerate geometry (V07 §3.17; §5.1 (9)): per village failure class one input of each kind — zero-length, zero-area, self-touching, collinear, coincident (coincident nuclei and raised-way feet, a self-touching palisade trace, a zero-area open space, a zero-length wharf, a collinear platform, an empty lasso) — refused by the kernel and handled on the class's ladder, the outcome its row's | C | V-M1 |
| T-V7-63 | lifecycle: every state of V07 §2.6 and every edit kind of V07 §4.4 saved, loaded, undone, redone, regenerated (keep) and migrated from each earlier schema version gives its row's outcome — the save and load byte-identical, undo and redo restoring the prior digest, declarations held, an absent field read as its row says | C | V-M3 |
| T-V7-64 | missing and contradictory data (V07 §3.17): a dossier of only a population and a tier; a housing range the population cannot fill; a count range below S2's count; an unknown kind; an unknown culture key; an `island` water with `roads: through`; a wall record at `isolated` access; a creation below 1 — each with its row's outcome and report | C | V-M2 |
| T-V7-65 | rungs and caps: populations 1, 79, 80, 399, 400, 1 424, 1 426, 1 499 at creation and at epochs (the hand-off band 1 425 / 1 575), each on its rung and product; at the VILLAGE top the raster cell counts, tracker steps (at the work limit F-V-TRACK, reported), the ends cap, the stall and pier counts within V07 §6's bars | C | V-M1 |
"""
t = t.replace("| C | V-M1 (the fair-field clause at V-M2; the village-history clause at V-M3) |", "| C | V-M1 (the fair-field clause at V-M2; the village-history clause at V-M3) |" + newtests.rstrip('\n'))
t += """

**Base bars at village rungs.** Each base hook bar this volume takes over names its test: §13.2's item 109 presence and
access bars are read at the village rungs by T-V7-38 – T-V7-40 and join V12's register at V-M4 (`notApplicable` before it,
never `insufficient`); §13.2's T111-n and item 113 (g) bars by T-V7-58 and T-V7-59; item 110's by T-V7-46 – T-V7-55. Every
no-op pin of this volume (T-V7-52, T-V7-58, T-V7-59, and the village rows of T-V7-19, T-V7-33, T-V7-34, T-V7-38) is a
`NoOpPin` on V12 §3.7.8's engine reading "off" as V11 §3.24.0's switch table (E-20).
"""
save('18-s6-7.md', t)
print('ok', len(t.split()))
