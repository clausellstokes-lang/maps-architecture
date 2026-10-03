from lib import *
t = extract(2035, 2216)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t); t = norm_d5(t)
R = [
# §3.9 (1): E-38
("""**(1) The land budget.** The farm table's village rows (§4.9's `FarmTable`, village-rung values; own, calibratable)
restate V07 §2.2's `haPerHead`: arable""",
 """**(1) The land budget.** The farm table's village rows (§4.9's `FarmTable`, village-rung values; own, calibratable) are the
territory's per-head area — V07 §3.2 (1) derives `a_h` as their sum, 2.275 ha per head, so an `editTable` of a farm row
moves `A_T` with it (E-38): arable"""),
("rerollable alone by `rerollLayer('forest')` (T10).", "rerollable alone by `rerollLayer('forest')` (T10 `hold`)."),
("""**(3) The field system** (S0's draw, V07 §3.1 (6); the factor rows, our own, calibratable: climate `cold` or `maritime` ×2
`infield_outfield`; relief `hilly` ×1.5 and `mountainous` ×3 `infield_outfield`, ×0.3 `open_field`; culture `celtic` or
`norse` ×2 `infield_outfield`, `germanic` or `slavic` ×1.5 `forest_strip` when the terrain is `forest`, `latin` ×1.5
`enclosed`; the era row's open-field start date — before it `open_field` is 0). Inside the arable:""",
 """**(3) The field system** (S0's draw, V07 §3.1 (6), with the climate, relief, culture and era factor rows of
`rules.fields.factor`, V07 §2.2a). Inside the arable:"""),
("""green is the village's inner common (its `Greenery` is commons-owned). The fair field (V07 §3.6 (4b)), where laid, is claimed
as a `common` face before the outward claim and joins the nearest `common` field.""",
 """green is the village's inner common (its `Greenery` is commons-owned). The fair field (V07 §3.6 (4b)), where laid, is claimed
as a `common` face before the outward claim and joins the nearest `common` field. **An oasis's gardens and grove** (item
111 (a); V07 §3.2 (4a)): §4.9's oasis rows run at village rungs unchanged — outside the perimeter S12a lays the irrigated
`garden_irrigated` faces before the outward claim, each fed by the spring (`LandUse.fedBy`, §2.7); inside it the tofts
nearest the water take garden crofts by prosperity's water term; S12b's grove row plants the shore. The gardens form no
`VillageField` (no field system rotates them)."""),
("**(5) Outlying farmsteads.** Their count is `D_o = ⌈H_o ÷ householdsPerFarmstead⌉`", "**(5) Outlying farmsteads.** Their count is `N_o = ⌈H_o ÷ householdsPerFarmstead⌉`"),
("""**(6) Decorations** (§4.9's table, village rows, our own): fishponds within 300 m of a manor (0.5), a warren of pillow
mounds on a common (0.2 with a manor), boundary stones where roads cross the territory frame, a wayside cross per through
road, a gallows hill on a through road at the frame (VILLAGE 0.1, seigneurial government only).""",
 """**(6) Decorations** (§4.9's table, village rows, our own; their chances and reaches `rules.manor`, V07 §2.2a): fishponds near
a manor, a warren of pillow mounds on a common with a manor, boundary stones where roads cross the territory frame, a
wayside cross per through road, a gallows hill on a through road at the frame (seigneurial government only)."""),
# §3.10
("the pier count reads S2's dwelling count `D`, known before\nthe network,", "the pier count reads S2's dwelling count `N`, known before\nthe network,"),
("`1 + ⌊√(5 · D ÷ (4 · L ÷ 0.7 m)) + u⌋`", "`1 + ⌊√(5 · N ÷ (4 · L ÷ 0.7 m)) + u⌋`"),
("(`rules.ends`; 1 at 40 people, 2 at 200, 6 from 625)", "(`rules.ends`; 1 at 40 people, 2 at 200, 6 from about 563)"),
("""(V07 §3.6); **wells** by the coverage row (one per 8 households within 120 m of their dwellings; an unbroken aqueduct's
delivery point counts as a well, V07 §3.5a (8)), on the green, at junctions
or in yards, a **pump** instead from the era row's pump date;""",
 """(V07 §3.6); **wells** by the coverage row (`pins.wellPerHouseholds` within `pins.wellWithinM` of their dwellings, that radius
× the climate row's coverage factor; an unbroken aqueduct's delivery point counts as a well, V07 §3.5a (8)), on the green, at
junctions or in yards, each candidate scoring the well-yield term with the climate row's weight (§4.7 S10b *Water in dry
country*, read by VS8; item 111 (b)), a **pump** instead from the era row's pump date;"""),
("""a **cross** at a crossroads inside the perimeter (0.4);
**stocks** near the church or on the green (VILLAGE 0.5; item 255); a **maypole** on a green (0.2); a **shrine** at the
perimeter on a road (0.3; a dossier's Roadside Shrine forces it); **troughs** at wells on through roads (0.3);""",
 """a **cross** at a crossroads inside the perimeter (`pins.cross`);
**stocks** near the church or on the green (`pins.stocks`; item 255); a **maypole** on a green (`pins.maypole`); a **shrine** at
the perimeter on a road (`pins.shrine`; a dossier's Roadside Shrine forces it); **troughs** at wells on through roads
(`pins.trough`);"""),
("`stall` pins, one per `stalls.perHouseholds` (40) households, at\nleast `stalls.min` (3),", "`stall` pins, one per `stalls.perHouseholds` households, at\nleast `stalls.min`,"),
# §3.10a
("a raised deck carries none (V02's J-V2.71; critique-V1 I110R-5).", "a raised deck carries none (V02's J-V2.71)."),
("2. **Widths** (item 292 as amended; own, calibratable):", "2. **Widths** (item 292; own, calibratable):"),
("composed by V02's `@deck` rows through `DeckContext` within the deck budget (X16).", "composed by V02's `@deck` rows through `DeckContext` within the deck budget (V11 §3.24.4's `deck` table)."),
]
t = apply(t, R, strict=False)
t = t.replace('`D_v`', '`N_v`')
save('11-s3d.md', t)
print('ok', len(t.split()))
