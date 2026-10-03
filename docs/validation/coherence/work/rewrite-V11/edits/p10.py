from helper import build
R = []
def r(a, b, c=1): R.append((a, b, c))
r("""**Class overrides of the `underground` column** (BCR-V11-15): `brewery`, `vintner` and `guildhall` take `allowed` (the""",
  """**Class overrides of the `underground` column** (II.7.3, item 553): `brewery`, `vintner` and `guildhall` take `allowed` (the""")
r("""**The derived and defaulted class columns** (V11C-12; the compiler writes them, step 5a, and lists them in the manifest):""",
  """**The derived and defaulted class columns** (the compiler writes them, step 5a, and lists them in the manifest):""")
r("""  (`tags +x`). Only the profile family key is a lot-mix family (§4.5 (2)); the class id is an identity-row counter.""",
  """  (`tags +x`). Only the profile family key is a plot-mix family (§4.5 (2)); the class id is an identity-row counter.""")
r("""  `underground` families 0.3 at every band, before the concealment multiplier (§10.2's `accessMultiplier`); every other
  family 0.05. These are the base's prose defaults (§10.2's *underground* paragraph) written as rows; `extension`.""",
  """  `underground` families 0.3 at every band, before the concealment multiplier (§10.2's `accessMultiplier`); every other
  family 0.05 — the one statement of these values, which §10.2 and II.7.3 read; `extension`.""")
r("""* `useRules`: no class states its own by default; V06 §3.9.9's clientele defaults apply (V11 §10b asks V06 to read "V11
  writes none by default; a class row may").""", """* `useRules`: no class states its own by default; V06 §3.9.9's clientele defaults apply (a class row may state one).""")
r("""* `icon` (reconciliation round 6, SR5-03): the class's profile family's `icon` (V11 §3.4), unless the row states one.
* `commonness` (reconciliation round 6, SR5-03; J-V11.94), for every town-and-city row, the row's **roster share at""",
  """* `icon`: the class's profile family's `icon` (V11 §3.4), unless the row states one.
* `commonness` (J-V11.94), for every town-and-city row, the row's **roster share at""")
r("""  same compile; a row may not state it (T-V11-4). The same meaning as V07's village rule (J-V7.133) at the other product's rung; the reader compares rows of the document's rung only, a village rung's tie going to the `v.` row (V9 §4.16 (3) as seam-settlements-r6 SR6-03 scopes it; SR6-09 (b), applied by the finalization).""",
  """  same compile; a row may not state it (T-V11-4). A `v.` row's `commonness` is V07 §2.4's rule (the row's roster share at
  VILLAGE, rounded to 0.01, never below 0.01), computed by the compiler at the same step — the one producer of every
  compiled display cell. The two rules give one meaning at each product's rung; the reader compares rows of the
  document's rung only, a village rung's tie going to the `v.` row (V09 §4.16 (3)).""")
r("""`roster.settings` (one row; `own` unless marked): `rosterMode` `minimiseUnemployment` (FTG's default; `ref:FTG
workplace placement default`; the `matchRatios` value is FTG's alternative, RV-pc-5), `unemploymentThreshold` 0.08,
`propagation.depth` 3 (§4.2 S2), `placement.extensionWeight` 1 (0 in the parity presets, §4.7 S10b), `detourFactor` 1.3
(§4.7 S10b, calibrate-later at M1 with its fallback),""",
"""`roster.settings` (one row; `own` unless marked): `rosterMode` `minimiseUnemployment` (FTG's default; `ref:FTG
workplace placement default`; the `matchRatios` value is FTG's alternative), `unemploymentThreshold` 0.08,
`propagation.depth` 3 (§4.2 S2), `placement.extensionWeight` 1 (0 in the parity presets, §4.7 S10b), `detourFactor` 1.3
(§4.7 S10b; provisional, its register entry V11 §8's, measured at M1 by T16-4 with its fallback),""")
r("""**The roster's coverage option (item 103 (f); V11C-07).** Without a dossier count, a class with a coverage row draws its
count at S2's Δ grid point as `round((1 − w) × perCapitaCount + w × coverageCount)`, `w` = `coverage.rosterWeight` —
except at the rungs whose `RungProfile.frameLaw` is `territory`, where it adds no member and a `V` cell is a siting pull
only (V07 §2.4's presence column; BCR-V7-36 (a); J-V7.101; reconciliation round 3, SR2-05; J-V11.73).""",
"""**The roster's coverage option (item 103 (f)).** Without a dossier count, a class with a coverage row draws its
count at S2's Δ grid point as `round((1 − w) × perCapitaCount + w × coverageCount)`, `w` = `coverage.rosterWeight` —
except at the rungs whose `RungProfile.frameLaw` is `territory`, where it adds no member and a `V` cell is a siting pull
only (V07 §2.4's presence column; J-V7.101; J-V11.73).""")
r("""*family* names the ONE profile family the row inherits (V11 §3.4; T-V11-4 refuses a row without it). *Profile deltas*
(V11C-03), on the family's compiled profile:""", """*family* names the ONE profile family the row inherits (V11 §3.4; T-V11-4 refuses a row without it). *Profile deltas*,
on the family's compiled profile:""")
r("""* T-V11-5's reading, stated once: a compiled profile fails only when it both emits a nuisance at level 2 or more and is
  sensitive to it at level 2 or more.
* A `singular` class's competition compiles to `neutral` and a `district-defining` class's to `cluster`, whatever its
  family says (J-V11.25); the manifest lists each such override.""",
"""* T-V11-5's rule is V11 §3.3.2's; the competition mode of a `singular` or `district-defining` class is V11 §2.3's rule.""")
r("""**Default reading rules** (V11C-04; the compiler applies them and lists each in the manifest's `defaultsApplied`):""",
  """**Default reading rules** (the compiler applies them and lists each in the manifest's `defaultsApplied`):""")
r("""| `butcher` | `food-works` | meat | shopfront | disp · 0.6 | 1/900, ≥1 | clientele dailyLocal; V walk : 600 m | everyday · mkt · split works-noxious+shopfront (the slaughterhouse and the stall; SCC-10) |""",
  """| `butcher` | `food-works` | meat | shopfront | disp · 0.6 | 1/900, ≥1 | clientele dailyLocal; V walk : 600 m | everyday · mkt · split works-noxious+shopfront (the slaughterhouse and the stall) |""")
r("""| heavy · mkt · split works-noxious+tavern-row (the brewhouse and the taphouse; SCC-10) | guild · crafts | supply `malt` 1 000 m street hard, `nearWater` soft (§10.2's example); underground `allowed` (its cellar workshop, BCR-V11-15) |""",
  """| heavy · mkt · split works-noxious+tavern-row (the brewhouse and the taphouse) | guild · crafts | supply `malt` 1 000 m street hard, `nearWater` soft (§10.2's example); underground `allowed` (its cellar workshop, item 553) |""")
r("""underground `allowed` (its cellar, BCR-V11-15) |""", """underground `allowed` (its cellar, item 553) |""")
r("""`nearWater` hard, `extramural` soft (§10.2's example as BCR-V11-20 rewrites it); supply `hides` 800 m street, `bark` 2 000 m road |""",
  """`nearWater` hard, `extramural` soft (§10.2's example, item 440); supply `hides` 800 m street, `bark` 2 000 m road |""")
r("""`nearGate` 150 soft (§10.2's example as BCR-V11-20 rewrites it); supply `beer` 1 200 m street, `fodder` 2 500 m road |""",
  """`nearGate` 150 soft (§10.2's example, item 440); supply `beer` 1 200 m street, `fodder` 2 500 m road |""")
r("""an unrecorded guildhall has no trade row); underground `allowed` (guild vaults, BCR-V11-15) |""", """an unrecorded guildhall has no trade row); underground `allowed` (guild vaults, item 553) |""")
r("""on an institution island, V05's island siting applies and the ground rows do not (V5 §3.5) |""", """on an institution island, V05's island siting applies and the ground rows do not (V05 §3.5) |""", 2)
r("""**The crypt column (item 109 (k) (2) as revised ~20:05, J111; BCR-V11-13).** "CHURCHES GET CRYPTS: the cathedral always
has a crypt, the largest crypt in the settlement, and every other church may have one". The column's meanings are V11
§2.3's; the rows (own, `general` — crypts under the east ends of cathedrals and great churches, and undercrofts under
some parish, guild and castle chapels; calibrate-later, V12 cells):""",
"""**The crypt column (item 109 (k) (2), J111).** "CHURCHES GET CRYPTS: the cathedral always has a crypt, the largest crypt
in the settlement, and every other church may have one". The column's meanings are V11 §2.3's; the rows (own, `general` —
crypts under the east ends of cathedrals and great churches, and undercrofts under some parish, guild and castle chapels;
provisional, each with its V12 §3.11 register entry):""")
r("""* A dossier crypt record bound to a building (V08's DR-V8.4), or a custom institution whose name or description matches
  the `crypt` keyword (V11 §3.13.2), makes its building `always` with the chapel's `cryptM2` unless its class states more
  (V3C-61 (1); C4-05).""", """* A dossier crypt record bound to a building (DR32), or a custom institution whose name or description matches the
  `crypt` keyword (V11 §3.13.2), makes its building `always` with the chapel's `cryptM2` unless its class states more.""")
r("""  applies; on an institution island V05's rim-slab vault, V5 §3.10 (5)).""", """  applies; on an institution island V05's rim-slab vault, V05 §3.10 (5)).""")
r("""* **Village rows.** V07 §2.4's village classes (keyed `v.<id>`, V11 §2.9) carry their own cells (its `v.parish_church`
  `basement` at a cellar chance of 0.1 with `cryptM2` 20 / 25 / 35 / 45; its chapel of ease `v.chapel` `never`; J-V7.64),
  cited, not restated; they are the rows the village rungs read (J-V7.41) — separate keys, never a shadow of the town
  `church` or `chapel` row — and `v.parish_church` counts as a church for V11 §3.23.8's catacomb count.""",
"""* **Village rows.** V07 §2.4's village classes (keyed `v.<id>`, V11 §2.9) carry their own crypt and cellar cells
  (J-V7.64): they are the rows the village rungs read (J-V7.41) — separate keys, never a shadow of the town `church` or
  `chapel` row — and `v.parish_church` counts as a church for V11 §3.23.8's catacomb count.""")
r("""**3.5.13 The sky classes** `sky_landing` and `sky_landing_top`: rows compiled from V05 §2.4's facts — family
`transport`, template `yard` (ground) and `landing-yard` (island), `sing · 1`, positioned (never pulled; their NEEDS met
by construction), E traffic 2, noise 1, clientele townWide, alignment neutral (a `guarded` landing takes its prison's
law +), no coverage, `extension` (V05 BCR-V5-6's class rows). `sky_landing` carries the `front` cell V05 §2.2 names: a""",
"""**3.5.13 The sky classes** `sky_landing` and `sky_landing_top`: the rows encoding V05 §2.4's facts — family
`transport`, template `yard` (ground) and `landing-yard` (island), `sing · 1`, positioned, E traffic 2, noise 1,
clientele townWide, alignment neutral (a `guarded` landing law +), no coverage, `extension`. `sky_landing` carries the
`front` cell V05 §2.2 names: a""")
r("""**3.5.14 Village classes and generic classes.** The village classes are V07 §2.4's rows (cited, not restated; compiled by
the same rules — V11 §3.2.1 step 6 runs T-V11-3, -4, -5, -7 and -25 over them; SR1-08), keyed
`v.<id>` (V11 §2.9); where a village class and a town class share a function the town class's `villageForm` names it
(V11 §3.22). The compiler adds
one `generic-<family>` class per profile family (V11 §3.13.3). Count: 181 authored town and city classes above (167 table rows — item 110's `fort` and `lighthouse` among them, which the count of 179 predated; reconciliation round 6 —, the two further cluster structures and the twelve
clandestine classes) + 45 generic classes (one per non-alias profile family) + V05's 2 + V07's village classes. Every
class row names its family (the `family` column).""",
"""**3.5.14 Village classes and generic classes.** The village classes are V07 §2.4's rows (cited, not restated; compiled by
the same rules — V11 §3.2.1 step 6 runs T-V11-3, -4, -5, -7 and -25 over them), keyed `v.<id>` (V11 §2.9); where a village
class and a town class share a function the town class's `villageForm` names it (V11 §3.22). The compiler adds one
`generic-<family>` class per non-alias profile family (V11 §3.13.3). Count: 181 authored town and city classes (167 table
rows, `fort` and `lighthouse` among them, the two further cluster structures and the twelve clandestine classes) + 45
generic classes + V05's 2 + V07's village classes. Every class row names its family (the `family` column).""")
r("""**3.5.15 Display words** (BCR-V9-8 = file f item 516; reconciliation round 6, seam-settlements-r5 SR5-03; J-V11.93). The""",
  """**3.5.15 Display words** (item 516; J-V11.93). The""")
build('10-s3-5', [(1292, 1860)], R)
