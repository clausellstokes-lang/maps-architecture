from helper import build
R = []
def r(a, b, c=1): R.append((a, b, c))

# 3.17.1 climate rows + item 111's cells (V11-MISSING-2; DEFER-2)
r("""**3.17.1 Climate rows** (`ClimateRow`; §4.9's species and field system; `own`, calibratable; species are generic kinds
our crown symbols draw, not a reference's list; `rain` is the mean yearly rainfall V11 §3.24.6's water balance reads,
general — orders of magnitude for each climate, calibrate-later):""",
  """**3.17.1 Climate rows** (`ClimateRow`; §4.9's species and field system; `own`, calibratable; species are generic kinds
our crown symbols draw, not a reference's list; `rainMmPerYear` is the mean yearly rainfall V11 §3.24.6's water balance
reads, general — orders of magnitude for each climate; provisional, its entry V12 §3.11's register):""")
r("""| `cold` | `ground.cold` | spruce 0.6 / 0.4, birch 0.2 / 0.4, larch 0.2 / 0.2 | infieldOutfield | gable · 1.3 | 0.2–0.8 | 500 |""",
  """| `cold` | `ground.cold` | spruce 0.6 / 0.4, birch 0.2 / 0.4, larch 0.2 / 0.2 | infieldOutfield | gable · 1.3 | 0.2–0.8 | 500 |

**Item 111's dry-country cells** (the same rows; `own`, general — desert towns on exotic rivers and coasts, spring-fed
oases with their palm groves and channel-fed gardens, the wealthy holding the watered and shaded ground; calibratable,
provisional, their entries V12 §3.11's register; `extension`, so the parity presets read their neutral values by §7.6's
zeroing where the neutral value is 0 and by explicit `presets.MFCG`, `.FTG` and `.VG` entries where it is 1 — the
`aridChance` factors, `sunlight` and `wellCoverageFactor`). The cells' meanings are V11 §2.8's `ClimateRow`; their
readers are registry row 43.

| biome | `arid` | `aridChance` river · lake · coast | `oasisChance` · `oasisNoWaterFactor` | `oasisAreaHa` | `gardenFactor` · `channelReachM` · `groveBandM` | `grove` | `w_water` · `pullRadiusM` | `w_waterP` | `sunlight` | `wellYieldWeight` · `wellCoverageFactor` |
|---|---|---|---|---|---|---|---|---|---|---|
| `temperate-deciduous`, `temperate-coniferous`, `mixed` | false | 1 · 1 · 1 | 0 · 1 | — | — | — | 0.1 · 300 m | 0.01 | 1 | 0.2 · 1 |
| `maritime` | false | 1 · 1 · 1 | 0 · 1 | — | — | — | 0.02 · 200 m | 0 | 1 | 0.1 · 1 |
| `cold` | false | 1 · 1 · 1 | 0 · 1 | — | — | — | 0.1 · 300 m | 0.01 | 1 | 0.2 · 1 |
| `arid` | true | 0.4 · 0.25 · 1 | 0.3 · 2 | 0.5–4 ha | 3 · 250 m · 30 m | palm 0.7, fig 0.15, tamarisk 0.15 | 0.6 · 800 m | 0.08 | −0.5 | 0.6 · 0.6 |

Ranges (`ColumnSpec.range`): each `aridChance` factor [0, 1]; `oasisChance` [0, 1]; `oasisNoWaterFactor` [1, 5], the
product with `oasisChance` capped at 1 (§4.2 S0); `oasisAreaHa` within [0.1, 20], low ≤ high; `gardenFactor` [0, 10];
`channelReachM` [20, 1 000]; `groveBandM` [5, 100]; the `grove` shares summing to 1; `w_water` [0, 0.9] (§4.2 S3 (6):
below 1, so no edge's cost reaches 0); `pullRadiusM` [50, 2 000]; `w_waterP` [0, 0.3]; `sunlight` [−1, 1];
`wellYieldWeight` [0, 1]; `wellCoverageFactor` [0.2, 1]. A non-arid row's oasis cells are never read (§4.2 S0 reads them
only on an arid row; P(oasis) is 0 elsewhere), so they hold their neutral values and `—` is "absent, never read".

How they read, each at its home: S0's P(river), P(lake) and P(coast) take the rung feature table's value ×
`aridChance` on an arid row, and P(oasis) = min(1, `oasisChance` × `oasisNoWaterFactor` when no river, lake or coast was
drawn, else `oasisChance`) (§4.2 S0); S1 sizes the oasis by `oasisAreaHa` (§4.2 S1 (2)); S12a lays `garden` land-use
faces of `gardenFactor` × the oasis's water area within `channelReachM` of its shore, and S12b plants the `grove` in a
band of `groveBandM` (§4.9); S3's travel-cost edges take × (1 − `w_water` · q(x)), q falling to 0 at `pullRadiusM`
(§4.2 S3 (6)), and V07's village crowding map reads the same two cells; §4.5's prosperity field adds `w_waterP` · q(x)
and multiplies item 102's sun term by `sunlight` — `w_sun` × `sunlight` is 0.02 in the temperate and cold rows, item
102 as filed, and −0.01 in the arid row, where shade is valued and the water term carries the pull (V11 §3.3.5); S10b's
well and public-fountain classes add `wellYieldWeight` × the plot's well yield (V11 §3.24.6's raster values) and their
water-supply walking-coverage radius takes × `wellCoverageFactor` (V11 §3.5's water-supply rows). A sky island reads
none of these cells (§4.2 S0; V05). Item 111's off form — every `aridChance` 1, `oasisChance` 0, `w_water` and
`w_waterP` 0, `sunlight` 1, `wellYieldWeight` 0, `wellCoverageFactor` 1 — is V11 §3.24.0's row for the item (T111-5).
The rows are checked by T-V11-38.""")
r("""tiles): `arable` — role `field.arable`, crops by climate (grain default);""",
  """tiles): `arable` — role `field.arable`, crops by climate (grain default); `garden` — `field.garden`, an irrigated garden
of beds and channels (item 111's oasis gardens, §4.9; a provider of `herbs`, V11 §3.7.2);""")

# 3.18 decline
r("""(§4.11, BCR-V6-26 = file f item 291; V6 §3.5.2; SCC-30)""", """(§4.11, item 291; V06 §3.5.2)""", 2)
r("""after V06's `streets.abandonAfterYears` (V6 §2.2; SCC-65)""", """after V06's `streets.abandonAfterYears` (V06 §2.2)""")
r("""**Structures** (item 110; V11C-43; V06 §3.5.2's pool units; the cells V06 §3.19.2 and §3.19.4 read — V06 keeps no copy,
X-V11-11; `own`, general — terrace walls slump and are robbed when the fields above them are abandoned, arches fall
before their piers — calibrate-later, V12's register):""",
  """**Structures** (item 110; V06 §3.5.2's pool units; the cells V06 §3.19.2 and §3.19.4 read; `own`, general — terrace
walls slump and are robbed when the fields above them are abandoned, arches fall before their piers — provisional, V12
§3.11's register):""")
r("""`RuinRule.monument.tierDecay` (0.85 a tier, C4-110-8)""", """`RuinRule.monument.tierDecay` (0.85 a tier)""")
r("""`retaining.holdM`, `retaining.neglectAfterYears`, `retaining.stretchM` and `aqueduct.disuseAfterYears` are V06's
proposed values (V6 §2.2's table), now stated here once. The strike weights of a stretch and a span are NOT this
table's: they are the base decline table's persistence rows `retaining` and `raised` (§4.11 as BCR-V6-26 writes it, file f
item 291), which V06's lottery reads as a layer weight inside the churn cap (`w = E(x) · rate · u`, V6 §3.5.2), never a
per-year chance; this block holds no rate (SCC-30; J-V11.71 — V11C-43's two rates withdrawn from here).""",
  """`retaining.holdM`, `retaining.neglectAfterYears`, `retaining.stretchM` and `aqueduct.disuseAfterYears` are stated here
once (V06 §2.2 cites them). The strike weights of a stretch and a span are the base decline table's persistence rows
`retaining` and `raised` (§4.11, item 291), which V06's lottery reads as a layer weight inside the churn cap
(`w = E(x) · rate · u`, V06 §3.5.2), never a per-year chance; this block holds no rate (J-V11.71).""")
r("""masonry (ashlar and rubble), so the material factor of this column is 1 there and is not applied twice (J-V11.31). The
new wall materials of item 110 read these rows:""", """masonry (ashlar and rubble), so the material factor of this column is 1 there and is not applied twice (J-V11.31).
Item 110's wall materials read these rows:""")

# 3.19 era, region, materials
r("""**3.19.1 The era table** (`era`; `EraRow`, BCR-V11-7;""", """**3.19.1 The era table** (`era`; `EraRow`, item 400;""")
r("""**3.19.2 Era default from the dossier:** V08 derives `era` from
`site.culture` and the tier (every culture defaults to `c14`; a culture row may name another era; the region is
`western` unless a pack adds region rows).""", """**3.19.2 Era default from the dossier:** the era is
V08 §2.6's era row's reading of the culture (every culture defaults to `c14`; a culture row may name another era); the
region is `western` unless a pack adds region rows.""")
r("""a STRUCTURE key (`retaining`, `raised:<kind>`, `pier`, `deck`; item 110, V11C-43 (2)),""",
  """a STRUCTURE key (`retaining`, `raised:<kind>`, `pier`, `deck`; item 110),""")
r("""the keys §8.2's texture and colour roles use (the three new wall roles by
BCR-V11-30);""", """the keys §8.2's texture and colour roles use (item 110's three wall roles by
item 412);""")

# 3.20 naming
r("""the part-0 crossing kind (bridge, ford, none), a wood (SS-18) |""", """the part-0 crossing kind (bridge, ford, none), a wood |""")
r("""and `raised` — the raised way's kind, item 110 (b); X-V11-8) |""", """and `raised` — the raised way's kind, item 110 (b)) |""")
r("""weights per V1-3.7.2.""", """weights per V01 §3.7.2.""")
r("""Guard `anchorLane` (village rungs, V07 §3.10; SS-18: the anchor""", """Guard `anchorLane` (village rungs, V07 §3.10: the anchor""")
r("""| a village's ends (V07 §3.10 VS8; SS-18) |""", """| a village's ends (V07 §3.10 VS8) |""")
r("""| great fields, meadows, commons and woods (V07 §3.9, §3.10; SS-18) |""", """| great fields, meadows, commons and woods (V07 §3.9, §3.10) |""")
r("""| `naming.landmark` (item 110's forms, V11C-46) |""", """| `naming.landmark` (item 110's forms) |""")
r("""| `naming.undercity` | undercity neighbourhoods (item 65) | the parent quarter's name | "Under-" + parent, parent + "Below" … (our two forms, weighted) |""",
  """| `naming.undercity` | undercity neighbourhoods (item 65) | the parent quarter's name | "Under-" + parent, parent + "Below" … (our two forms, weighted) |
| `naming.undercity.plaza` | the undercity core's plaza (II.7.5; V04 §5.4) | the parent quarter's name, the plaza's first institution | `the #plaza.word#`; `#quarter.name# #plaza.word#`; the black market's plaza `the #market.word# Below` |
| `naming.sewer` | sewer trunks and culvert runs (V04 §5.4) | the run's role (trunk, culvert), the brook it carries, the quarter above, the way it follows | `the #way.name# #sewer.word#`; `the #quarter.name# #sewer.word#`; guard `culvert`: the brook's name + `Culvert` |
| `naming.catacomb` | catacomb complexes (V04 §5.4) | the source face (cemetery, churchyard, quarry ossuary) and its cemetery's, church's or quarter's name | `the Catacombs of #cemetery.name#`; under a churchyard `the Catacombs of #church.name#`; guard `ossuary`: `the Ossuary of #quarter.name#` |
| `naming.cavern` | cavern systems (item 109 (a); V04 §5.4) | relief, the terrain feature above, the depth class | `the #cavern.word# of #terrain.name#`; `#place.root# #cavern.word#` |
| `naming.quarry` | quarry gallery systems (V04 §5.4) | the stone, the quarter above | `the #quarter.name# Galleries`; `#stone.word# #quarry.word#` |
| `naming.vaults` | cisterns, vaults and arch-vault runs (V04 §5.4) | the chamber kind, the raised way's name, the landmark above | guard `archVault`: `the #way.name# Arches` (a run under a raised way, item 110 (b)); else `the #vault.word# of #landmark.name#` |
| `naming.buried` | buried old towns and buried former settlements (II.7.6; item 113 (c); V04 §5.4) | the source (old town or former settlement), the quarter above, the settlement's name | an old town `Old #quarter.name#`; guard `former`: `Old #settlement.name#` |""")
r("""| `building.wingRole` | a building's wing, for V02's hover label (V2 §5.4) | the wing's `WingRole`, the class, the band | one plain word or two per role — including item 110's "a tier", "the shrine", "a stair" (V02 X6) — from `#wing.word#`; the role id is the fallback |""",
  """| `building.wingRole` | a building's wing, for V02's hover label (V02 §5.4) | the wing's `WingRole`, the class, the band | one plain word or two per role — including item 110's "a tier", "the shrine", "a stair" and the arena's "the seating" and "a gate passage" — from `#wing.word#`; the role id is the fallback |""")
r("""Each culture row also carries a **building block** `{ aqueductM, elevatedM, raisedVaultM }` (item 110 (b); V11C-34 (5);
the dossier's `site.culture` is the discriminator, since every culture's default era is `c14`, critique-V8 C8-44; own,
general — Roman and later Mediterranean arcaded aqueducts, raised causeway aqueducts, northern conduits laid in the
ground rather than on arches; calibrate-later),""", """Each culture row also carries a **building block** `{ aqueductM, elevatedM, raisedVaultM }` (item 110 (b); the
dossier's `site.culture` is the discriminator, since every culture's default era is `c14`; own, general — Roman and later
Mediterranean arcaded aqueducts, raised causeway aqueducts, northern conduits laid in the ground rather than on arches;
provisional, V12 §3.11's register),""")
r("""| `naming.villageEnd`, `naming.field`, `naming.way`'s `anchorLane` guard (SS-18) |""", """| `naming.villageEnd`, `naming.field`, `naming.way`'s `anchorLane` guard |""")
r("""| way, landmark, district, `building.wingRole` (item 110; V11C-46) | 8–15 each (`wing.word` one to three per `WingRole`) | ordinary English topographic and building words |""",
  """| way, landmark, district, `building.wingRole` (item 110) | 8–15 each (`wing.word` one to three per `WingRole`) | ordinary English topographic and building words |
| `sewer.word`, `cavern.word`, `quarry.word`, `stone.word`, `vault.word`, `plaza.word`, `market.word` | the underground slices | 8–15 each | ordinary English words for drains, caves, workings, stone, vaults and open places |""")
r("""ward and landmark names of the reference map item 110 was assessed on (J114; file g's preamble) — maintained by the""",
  """ward and landmark names of the reference map item 110 was assessed on (J114) — maintained by the""")
r("""a hit in any corpus, table row or fixture name fails the
PR (V11C-51).""", """a hit in any corpus, table row or fixture name fails the
PR.""")
r("""Authoring runs at C5 (V11 §8): the
O13-core corpora (district, way, place, landmark, settlement) at M2b, the rest at M3b.""", """The vocabularies are written
during the build, clean-room (J122): authoring runs at C5 (V11 §8), the O13-core corpora (district, way, place,
landmark, settlement) at M2b, the rest at M3b.""")

# 3.21 government
r("""offices' seat classes and the guard posts (with the barracks column) are the base rungs' (V07 §3.2 (3); BCR-V7-36 (c);
SR3-01) — a village's officers sit in the seat's house and its watch keeps no post of its own (reconciliation round 4,
SR3-03).""", """offices' seat classes and the guard posts (with the barracks column) are the base rungs' (V07 §3.2 (3); item 576
(c)) — a village's officers sit in the seat's house and its watch keeps no post of its own.""")

# 3.22 villageForm
r("""### 3.22 The `villageForm` column (V07's BCR-V7-21, filled here)""", """### 3.22 The `villageForm` column (item 430, filled here)""")
r("""green; SS-05); `town_hall`""", """green); `town_hall`""")
r("""never a reeve's house (SS-03);""", """never a reeve's house;""")
r("""kind that fell to a `generic-<family>` class (`unmapped_kind`) (SS-02).""", """kind that fell to a `generic-<family>` class (`unmapped_kind`).""")
r("""`@absent` reading (each named class zeroed through the `v.` class that plays it, V11 §3.11; SR1-02) (SR1-21).""",
  """`@absent` reading (each named class zeroed through the `v.` class that plays it, V11 §3.11).""")

r("""No feature is a strict priority (V1-3.7.2's rule, applied to every
slice).""", """No feature is a strict priority (V01 §3.7.2's rule, applied to every
slice).""")

build('14-s3-17', [(3289, 3545)], R)
