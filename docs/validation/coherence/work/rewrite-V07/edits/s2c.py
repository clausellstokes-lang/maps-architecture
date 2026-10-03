from lib import *
t = extract(833, 1162)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t)
R = [
("  form: PlanForm; formSource: 'auto'|'request'|'dossier'|'edit';          // S0's feature draw, the request, the culture-weighted dossier draw, or setAttr",
 "  form: PlanForm; formSource: 'auto'|'request'|'dossier'|'edit';          // S0's feature draw, the request, the culture-weighted dossier draw, or setAttr;\n                                                                          // formSource and roadsSource are read by the village WhyProvider and the panel's plan card (V07 §4.5)"),
("**Base records read with village values** (no new field unless V07 §10 says so):", "**Base records read with village values** (no new field beyond the items V07 §10 lists; their homes §2.5, §2.7):"),
("`+w · (D − D̄)` terms push the same way (J-V7.60).", "`+w · (D − D̄)` terms push the same way (J-V7.60); every village reading of it is multiplied by the climate row's sunlight\ncell (item 111 (c); V07 §3.2 (4))."),
("so g's kernel `−w_sun · shade(x)`", "so item 102's kernel `−w_sun · shade(x)`"),
("Item 110's records at village rungs: `RetainingWall` (item 110 (a); §2.7 once applied) for the walls", "Item 110's records at village rungs: `RetainingWall` (item 110 (a); §2.7) for the walls"),
("(`v.hovel`, `v.smithy`, `v.parish_church`, …; V11 §2.3 and V11 §2.9 as SS-01 fixes them; J-V7.95)", "(`v.hovel`, `v.smithy`, `v.parish_church`, …; V11 §2.3, V11 §2.9; J-V7.95)"),
("""*label · synonyms* are the row's display words (item 516's `label` and `synonyms` cells, V11 §2.3 as
seam-settlements-r5 SR5-03 adds them; own, `calibratable: false`):""",
 """*label · synonyms* are the row's display words (item 516's `label` and `synonyms` cells, V11 §2.3; own,
`calibratable: false`):"""),
("""sum of those counts over the 25 rows, rounded to 0.01 and never below 0.01 — written by the seat landing V-M2's rows by
one script kept beside the table and recomputed by T-V7-56 (J-V7.133). Pin kinds take no row: their words are the
V08 §4.6's `host.pinKind.<kind>` rows (seam-settlements-r6 SR6-06).""",
 """sum of those counts over the 25 rows, rounded to 0.01 and never below 0.01 — compiled by V11's compiler, the one producer
of every compiled display cell (V11 §3.2.1 step 5a), and checked by T-V7-56 (J-V7.133). Pin kinds take no row: their words
are V08 §4.6's `host.pinKind.<kind>` rows."""),
("| `v.smithy` | `clientele travellers` |", "| `v.smithy` | `clientele travellers; K spread 200` |"),
("""Pins placed by the village's own rows (V07 §3.10; `rules.pins`): wells (coverage: one per 8 households within 120 m), a pump
in place of a well from the era row's pump date, the green's centrepiece, the moot place, a `cross` at a crossroads inside
the perimeter (0.4), `stocks` near the church or green ((200, 0) → (700, 0.5)), a `maypole` on a green (0.2), a `shrine` at the
settlement edge on a road (0.3; SettlementForge's "Roadside Shrine" forces it), troughs at wells on through roads (0.3);
a `@pin:<kind>` record forces its pin where none stands (V07 §3.10's pin-record rule), and at a village epoch the rows
run through `village.pins` (V07 §3.12).
Decorations from §4.9's table with village rows: a village pond (0.4; VS1 carves it in its L0 batch at the lowest hollow
within 150 m of the heart, V07 §3.2 (8)); the green's centrepiece pond and the manor's fishponds are **uncarved `pond` parts**
drawn in the water tone — sited after the L0 batch, as the moat is (J-V7.13, J-V7.50) — fishponds by the manor (0.5 with a manor), a warren of pillow mounds on the commons (0.2 with a manor),
boundary stones where roads cross the territory frame, a wayside cross per through road.""",
 """Pins placed by the village's own rows (VS8, V07 §3.10; their values `rules.pins`, V07 §2.2a): wells by coverage (by well
yield on an arid climate row, item 111 (b)), a pump in place of a well from the era row's pump date, the green's
centrepiece, the moot place, a `cross` at a crossroads inside the perimeter, `stocks` near the church or green, a
`maypole` on a green, a `shrine` at the settlement edge on a road (SettlementForge's "Roadside Shrine" forces it),
troughs at wells on through roads; a `@pin:<kind>` record forces its pin where none stands (V07 §3.10's pin-record rule),
and at a village epoch the rows run through `village.pins` (V07 §3.12). Decorations from §4.9's table with village rows
(their values `rules.pins.pond` and `rules.manor`, V07 §2.2a; their placement V07 §3.2 (8) and V07 §3.9 (6)): the village
pond (VS1 carves it in its L0 batch); the green's centrepiece pond and the manor's fishponds are **uncarved `pond` parts**
drawn in the water tone — sited after the L0 batch, as the moat is (J-V7.13, J-V7.50) — fishponds by the manor, a warren
of pillow mounds on the commons with a manor, boundary stones where roads cross the territory frame, a wayside cross per
through road."""),
("""A class takes tiers at a village rung only through V11's culture-and-era specialisation rows (X17: the
`stepped_temple`, `terraced_palace` and `tiered_tower` rows naming V02's `stepped` family).""",
 """A class takes tiers at a village rung only through V11 §3.24.3's culture-and-era specialisation rows (the
`stepped_temple`, `terraced_palace` and `tiered_tower` rows naming V02's `stepped` family)."""),
("classes are those the rows reach through the village form of the class each row names (V11 §3.24.3 as SS-31 amends\nit):",
 "classes are those the rows reach through the village form of the class each row names (V11 §3.24.3):"),
("'never'`, `cryptM2`, the cellar row's chance as the crypt chance; critique V11C-02's item 436);",
 "'never'`, `cryptM2`, the cellar row's chance as the crypt chance; §10.2, item 436);"),
("""terrain gate denies the basement a drawn crypt folds to floor vaults (V03's fold, critique V3C-61); a dossier fact naming
a crypt binds to its church's crypt with chance 1 (critique C4-49 (5)).""",
 """terrain gate denies the basement a drawn crypt is not built — no crypt, the dead under ledger slabs in the chancel floor
(V03 §3.7.4); a dossier fact naming a crypt binds to its church's crypt with chance 1 (V04 §3.5.1)."""),
("""Below TOWN no catacomb forms (item 109 (k) (1)): a dossier fact forcing one at a village rung is V04's charnel
vault (critique C4-49 (7)) —""",
 """Below TOWN no catacomb forms (item 109 (k) (1)): a dossier fact forcing one at a village rung is V04's charnel
vault (V04 §3.5.1) —"""),
("(`ArchetypeVillageCell`, SS-09)", "(`ArchetypeVillageCell`)"),
("(V11 §3.12's `multiple_water_sources` row as SS-07 amends it)", "(V11 §3.12's `multiple_water_sources` row)"),
("(it has no village form, V11 §3.22 as SS-03 amends it)", "(it has no village form, V11 §3.22)"),
]
t = apply(t, R, strict=False)
# narration fragments left by the seam-id strip inside the ladder table
t = t.replace("(V08 §3.5.1 (d); seam SR6-01)", "(V08 §3.5.1 (d))").replace(" (after a receipt the one key re-pointed, no alias; seam SR6-01)", " (after a receipt the one key re-pointed, no alias)")
t = t.replace("(after a receipt the one key re-pointed to the hall; V08 §3.5.1 (d); seam SR6-01)", "(after a receipt the one key re-pointed to the hall; V08 §3.5.1 (d))")
t = norm_d5(t)
save('06-s2c.md', t)
print('ok', len(t.split()))
