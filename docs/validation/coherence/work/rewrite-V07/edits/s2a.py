from lib import *
t = extract(511, 722)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t)
R = [
("All lengths in metres (`M`) or centimetres (`Cm`), angles in centidegrees (`Cdeg`), areas in m² or ha as named, as V07 §2.1\ndeclares.",
 "All lengths in metres (`M`) or centimetres (`Cm`), angles in centidegrees (`Cdeg`), areas in m² or ha as named, as §2.1\ndeclares."),
("Nothing in this section restates a base record; base records gain fields only through V07 §10's\nrequests.",
 "Nothing in this section restates a base record; base records gain fields only through the applied items V07 §10\nlists, and the base types it uses are the base's (`Rung`, §1.1, item 201; `TableId`, §7.6)."),
# frame column after E-38 (a_h = 2.275 ha per head)
("| 1.2 km² (1.1 km); 0.36 km² |", "| 1.1 km² (1.1 km); 0.36 km² |"),
("| 5.8 km² (2.4 km); 1.0 km² |", "| 5.7 km² (2.4 km); 1.0 km² |"),
("| 20 km² (4.5 km); 4.0 km² |", "| 19.9 km² (4.5 km); 4.0 km² |"),
# the split sentence (former W40's clause lives here)
("Item 105 (h)'s owner-approved threshold\ndecides a generated works-and-shop split at village rungs as everywhere, its one off switch V11 §3.7.4's\n`siting.web.splitEnabled` (false in the parity presets, `VG` included; J-V7.115);",
 "Item 105 (h)'s owner-approved threshold\ndecides a generated works-and-shop split at village rungs as everywhere (§4.7 S10a), the village rows carrying no split\nswitch of their own; its one off switch is V11 §3.7.4's `siting.web.splitEnabled` (false in the parity presets, `VG` included;\nJ-V7.115);"),
# ProductDecl: the records comment points at the one home (V07-DUP-1)
("""  records?: string /* an EpochPlacement id (V06 §2.1's ProductDeclEpoch.records): the product's placement of a dossier record the
    epoch's dossier step adds, a member a count step adds, or the greater a REPLACEMENT re-key places new (V08 §3.5.1 (c)'s second and third cases, (d)) — a re-key whose greater keeps the lesser's thing being a `rebind`, never offered — called at this product's epochs before the base's placement (§7.7's
    One path sentence) and by that placement on an absorb without an epoch; it places the record or declines it, a declined record
    taking the base's placement; its remove follows the base's removal of a record on both paths — for 'village', 'village.records',
    stage 'S10b' (V07 §3.12 *Records at a village epoch*; J-V7.125, J-V7.129, J-V7.130) */;""",
"""  records?: string /* an EpochPlacement id (V06 §2.1's ProductDeclEpoch.records); its calls are *The records placement* below —
    for 'village', 'village.records', stage 'S10b', its cases V07 §3.12 *Records at a village epoch* (J-V7.125) */;"""),
# LadderRouter: cite §1.1 (VOL-V07-V08-RESTATEMENTS-002); replay: cite §2.9
("""`LadderRouter.route` returns `village` for [1, 1 500) once the village `ProductDecl` is registered, and the base's clamp to a
1 500-person TOWN applies only while it is not (§1.1's text stays true in both states). No recipe field records the product:
`Recipe.rung` (its type widened, item 276) names the creation rung, and the product that registered that rung is the one
whose stage set replays the creation (§2.9's replay); at an epoch""",
"""`LadderRouter.route` routes [1, 1 500) to the village product once it is registered (§1.1; item 202). No recipe field
records the product: `Recipe.rung` (item 276) names the creation rung, whose registering product replays the creation
(§2.9); at an epoch"""),
("**The records placement** (J-V7.125; round 6: TW-01 – TW-03).", "**The records placement** (the one statement of its calls; J-V7.125, J-V7.128 – J-V7.130, J-V7.132)."),
("""typed in V06 §2.1 beside `EpochPhase`, with `place(ctx, record, event)` and `remove?(ctx, record, event)` (TV-02's, TW-01's
and TW-02's V06 companions, landed; cited, not restated) — registered""",
 """typed in V06 §2.1 beside `EpochPhase`, with `place(ctx, record, event)` and `remove?(ctx, record, event)` (cited, not
restated) — registered"""),
("""re-key places new (V07 §3.12 *Records at a village epoch* item 4) (V08 §3.5.1 (c)'s second and third cases, (d)) — a re-key whose greater keeps the lesser's thing being a `rebind`, never offered — at an epoch""",
 """re-key places new (V08 §3.5.1 (c)'s second and third cases, (d); V07 §3.12 *Records at a village epoch* item 4) — a
re-key whose greater keeps the lesser's thing is a `rebind`, never offered — at an epoch"""),
("hooks of the product's registration, landing with item 202 on M4's grow path (item 202; J-V7.132).",
 "hooks of the product's registration, landing with item 202 on M4's grow path (J-V7.132)."),
# §2.2: E-38 — haPerHead derived
("  territory: { haPerHead: number /* ha of territory per inhabitant, from the farm table's village rows */; usableShare: number; minKm2: number; marginShare: number };",
 "  territory: { usableShare: number; minKm2: number; marginShare: number } /* the per-head area is derived, never stored: the sum of the\n    farm table's village rows (V07 §3.9 (1); E-38) */;"),
("    trailMinShare: number; slack: number; emptyDensity: number; bridgeSnapM: M };",
 "    trailMinShare: number /* a track's least limit, × branchSpacingM (V07 §3.5 step 6) */; bridgeSnapM: M };"),
("  open: { chance:", "  open: { chance:"),
("    minStretchM: M /* a non-water closing arc shorter than this between two walled stretches is walled through (V07 §3.4 step 5 c) */ };",
 "    minStretchM: M /* a non-water closing arc shorter than this between two walled stretches is walled through (V07 §3.4 step 5 c) */;\n    denseDialFrom: number /* the dial above which denseChance applies (V07 §3.1 step 4) */; pullM: M /* V07 §3.4 step 4's pull */;\n    section: { palisadeThickCm: Cm; earthworkBankM: M; earthworkDitchM: M; innerThickCm: Cm } /* V07 §3.4 step 6's full sections */ };"),
("  epoch: { encroachShareMax: number /* of a green's or common's area, over its life */; newNucleusShare: number /* of D, one epoch's residual */;",
 "  epoch: { encroachShareMax: number /* of a green's or common's area, over its life */; newNucleusShare: number /* of N, one epoch's residual */;"),
("      (again and reopen by V06's TR-03), hinterland { slack, order, cap }", "      hinterland { slack, order, cap }"),
("`neighbourTracks` is the law `1 + round(log₂(P ÷ 40))` clamped\n1–4, and the ends cap `1 + ⌊households ÷ 25⌋` at most 6 (V07 §3.10). T-V7-41 checks every law.",
 "`neighbourTracks` is the law `1 + round(log₂(P ÷ 40))` clamped\n1–4 (4 from about 227 people), and the ends cap `1 + ⌊households ÷ 25⌋` at most 6 (V07 §3.10). T-V7-41 checks every law."),
("| territory.haPerHead | 2.3 | 2.3 | 2.3 | — (VG has no territory:",
 "| territory per head (derived) | 2.275 ha | 2.275 ha | 2.275 ha | — (VG has no territory:"),
("| own: arable 1.2 incl. fallow, meadow 0.15, pasture and commons 0.6, coppice 0.25, timber 0.075 (V07 §3.9) |",
 "| derived, not a cell (E-38): the sum of the farm table's village rows — arable 1.2 incl. fallow, meadow 0.15, pasture and commons 0.6, coppice 0.25, timber 0.075 (V07 §3.9 (1)); an `editTable` of a farm row moves `A_T` with it |"),
("| `1 + round(log₂(P ÷ 40))`, clamped 1–4: 1 at 40, 3 at 200, 4 from 320 |", "| `1 + round(log₂(P ÷ 40))`, clamped 1–4: 1 at 40, 3 at 200, 4 from about 227 |"),
("| density radialPeak / reachShare / bandWeight / bandMinM | 1.5 / 1.35 / 1.0 / 20 m | as THORP | as THORP | 1.5 / (the map half-width) / 1.0 / — | VG (peak and band); own (reach from demand, band floor) |",
 "| density radialPeak / reachShare / bandWeight / bandMinM | 1.5 / 1.35 / 1.0 / 20 m | as THORP | as THORP | 1.5 / (the map half-width) / 1.0 / — | VG (peak and band; `bandWeight` the elevation band's weight in V07 §3.3's sum); own (reach from demand, band floor) |"),
("| network trailMinShare / slack / emptyDensity | 1.0 / 1.3 / 0.15 | as THORP | as THORP | 1.0 / 1.0 / 0 | VG (a trail is at least one branch spacing long); own |",
 "| network trailMinShare | 1.0 | as THORP | as THORP | 1.0 | VG (a trail is at least one branch spacing long) |"),
("| palisade barrierReachShare / lightHeightCm (palisade, earthwork, inner) / minStretchM |",
 "| palisade denseDialFrom / pullM / section (palisade thickness; earthwork bank and ditch widths; inner thickness) | 1.4 / 10 m / 40 cm; 4 m and 3 m; 120 cm | as THORP | as THORP | 1.4 / 0 m (no pull under `VG`) / as default | own |\n| palisade barrierReachShare / lightHeightCm (palisade, earthwork, inner) / minStretchM |"),
("| epoch.rows.persistence (× the building layer's rate, V06 §3.5.2) | every class V11 §3.5.1 tags `church-family` — `cathedral`, `great_temple`, `church`, `chapel`, `monastery`, `generic-worship`, `generic-monastic`, `v.parish_church`, `v.chapel` — × 0.3;",
 "| epoch.rows.persistence (× the building layer's rate, V06 §3.5.2) | every class V11 §3.5.1 tags `church-family` (the list's home; the cell keys each by class id, T-V7-44 checks the keys equal the tag's members) × 0.3;"),
]
t = apply(t, R)
t = norm_d5(t)
save('04-s2a.md', t)
print('ok', len(t.split()))
