from lib import *
t = extract(1279, 1511)
t = strip_narr_ids(t); t = strip_narr_more(t); t = strip_narr_tail(t); t = norm_items(t)
R = [
("— first paint —", "— first map —"),
("`roster` (`D` for the piers,", "`roster` (`N` for the piers,"),
# VS1 row: the water proximity output (item 111)
("| `village.plan` (heart, nuclei, character, radius), `daylight.terrain`, `lattice`,",
 "| `village.plan` (heart, nuclei, character, radius), `daylight.terrain`, `water.proximity` (item 111, V07 §3.2 (4a)), `lattice`,"),
("| VS2 | `site.terrain`, `site.water`, `village.plan`, `daylight.terrain` |", "| VS2 | `site.terrain`, `site.water`, `village.plan`, `daylight.terrain`, `water.proximity` |"),
("| VS5 | `network`, `enceintes`, `village.density`, `village.plan`, `reservations.mill`, `reservations.open`, `daylight.terrain`, `raised`,",
 "| VS5 | `network`, `enceintes`, `village.density`, `village.plan`, `reservations.mill`, `reservations.open`, `daylight.terrain`, `water.proximity`, `raised`,"),
# §3.1 step 1: the toll-bridge watercourse rule cited at its home (E-31); arid water and the oasis (item 111)
]
t = apply(t, R, strict=False)
i = t.index('   replaces the draw. **A bridge-implying record**')
j = t.index('2. **Plan form**')
step1_tail = """   replaces the draw. **Dry country** (item 111 (a)): on an arid climate row the shares first take `rules.aridWater`'s
   multipliers by kind (V07 §2.2a; renormalised with `none`), and the oasis is then drawn by V07 §3.2 (4a). **A
   bridge-implying record** — a dossier record whose `kinds` row carries `implies: 'bridge'` (V11's `toll_bridge` row) —
   forces a watercourse that the through road crosses, by V08 §2.6b (3)'s rule read at its village column (E-31): S0 sets
   the water type and raises the road topology as that rule gives, V07 §3.2 (2) step 2 draws the course's entry and exit
   bearings on the two frame arcs the through road's two entries divide (unless the realm block fixes the course's line),
   and VS4 bridges the crossing, whose deck may carry the toll house by `deckOk` (V07 §3.10a (4)). Where the rule fails, no
   brook is forced: the toll house stands at an entry (else on the heart's approach) and `toll_bridge_dry` is reported
   (J-V7.97).
"""
t = t[:i] + step1_tail + t[j:]
R2 = [
("present with probability `chance` (or `denseChance` when the dial exceeds\n   1.4),", "present with probability `chance` (or `denseChance` when the dial exceeds\n   `palisade.denseDialFrom`, 1.4),"),
("× 1.5 under a `district` request, clamped to `density.dial`.", "× `formRules.districtDensity` (1.5) under a `district` request, clamped to `density.dial`."),
("else true when the intent's planned ↔ organic dial is at least 0.75;", "else true when the intent's planned ↔ organic dial is at least `formRules.organicDialFrom` (0.75);"),
# §3.2 (1): E-38
("""**(1) The territory frame.** `A_T = max(territory.minKm2, territory.haPerHead · P ÷ territory.usableShare ÷ 100)` km²
(V07 §2.2; 700 people → 20.1 km²),""",
 """**(1) The territory frame.** `A_T = max(territory.minKm2, a_h · P ÷ territory.usableShare ÷ 100)` km², with `a_h` the
territory per head derived as the sum of the farm table's village rows (2.275 ha; V07 §3.9 (1); E-38) (V07 §2.2; 700
people → 19.9 km²),"""),
# §3.2 (3): G-dwell
("dwellings `D_b = round(H_b ÷ (1 + share2_b))`;", "dwellings `N_b = round(H_b ÷ (1 + share2_b))`;"),
("the outlying farmsteads `D_o = ⌈H_o ÷ householdsPerFarmstead⌉`; the village dwellings `D_v = D − D_o`, with `D` the\ndwellings above",
 "the outlying farmsteads `N_o = ⌈H_o ÷ householdsPerFarmstead⌉`; the village dwellings `N_v = N − N_o`, with `N` the\ndwellings above"),
("V07 §3.8's quotas and race place `D_v`; V07 §3.9 (5) places `D_o`;\nevery household is housed once, and DR7's residential count is `D_v + D_o = D`.",
 "V07 §3.8's quotas and race place `N_v`; V07 §3.9 (5) places `N_o`;\nevery household is housed once, and DR7's residential count is `N_v + N_o = N`."),
# §3.2 (4): item 102's day, the climate cell, the water pull
("one per sun position of g's representative day", "one per sun position of item 102's representative day"),
("+0.3 × (D(x) − D̄) (the sunny slope);", "+0.3 × (D(x) − D̄) × the climate row's sunlight cell (the sunny slope; toward shade where the cell is negative, item 111 (c));"),
("+0.2 ×\nthe relative height within 300 m (prominence: a village on or beside a rise);", "+0.2 ×\nthe relative height within 300 m (prominence: a village on or beside a rise); + `heart.pull` × `w_water` × `prox(x)` (the\nwater pull, (4a));"),
]
t = apply(t, R2, strict=False)
# (4a) after (4)'s polyfocal sentence, before (5)
k = t.index('**(5) The character**')
para4a = """**(4a) Water in dry country** (item 111; VS1 with S0 and S1). *The oasis.* On an arid climate row S0 draws the oasis after
the water type (V07 §3.1 step 1) with §4.2 S0's chance — the climate row's oasis chance, times its no-other-water factor
when the water type is `none` — on `blueprint.features`; a request's `oasis` (`'on'|'off'`, §4.2 S0's site request)
decides it, a dossier's `oasis_water` makes it exist (DR40), and T2 `ground`'s spring flag adds or removes one (§7.1). S1
builds it by §4.2 S1 (2)'s construction over the territory (a spring-fed pond or small lake in the best hollow or fault
line of the frame's middle two thirds, sized by the climate row's oasis area band), and the hinterland unit lays its grove
and irrigated gardens (V07 §3.9 (1)). An oasis is water for every village rule that reads water — the mill seat where it
falls, VS2's water term, the palisade's barriers, the wells, `v.landing`'s `site water` presence. An **oasis village** is
one whose only water is its oasis: the terms below put its heart on the oasis shore and its houses and gardens around it.
*The water pull.* VS1 computes `water.proximity` — §4.2 S3 (6)'s proximity `prox(x)` ∈ [0, 1] to reliable water (1 on a
river bank, a lake or oasis shore, a spring, or ground of the top well-yield class, §4.2 S1 (10); falling linearly to 0 at
the climate row's pull radius) — over the frame at `rasters.daylightCm`. It enters three village terms, each weighted by
the climate row's water-pull weight (V11; strong in arid rows, near zero in wet ones): the heart score (`heart.pull ×
w_water × prox(x)`, (4)), the crowding map (VS2's `p(x)`, V07 §3.3) and prosperity pass 1 (§4.5's water term `w_waterP ×
prox(x)`, V07 §3.7 (3)); VS8 sites wells by well yield with the climate row's coverage factor (V07 §3.10). Every village
reading of item 102's sunlight — the heart's `sun` term, VS2's `s(x)`, pass 1's daylight term — is multiplied by the
climate row's sunlight cell (item 111 (c)); the hinterland's suitability keeps its daylight term unscaled, since sun is a
growing condition of the crops, not a preference of the settlers (J-V7.134). With the oasis chance, `w_water`, `w_waterP`,
the coverage factor and the sunlight cell at their neutral values and `rules.aridWater` at 1, a village is byte-identical
to one without item 111 (T-V7-58). A spring or oasis that fails over the epochs weakens its pull by V06's rule (item 111
(b)); `village.density` reads `water.proximity` as the epoch leaves it.

"""
t = t[:k] + para4a + t[k:]
t = t.replace("**(8) S3's non-siting jobs, taken over by VS1** (J-V7.50).", "**(8) S3's non-siting jobs, taken over by VS1** (J-V7.50).")
t = t.replace('Σ_b D_v,b · toftArea_b', 'Σ_b N_v,b · toftArea_b')
t = norm_d5(t)
save('08-s3a.md', t)
print('ok', len(t.split()))
