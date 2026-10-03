from helper import build
R = []
def r(a, b, c=1): R.append((a, b, c))

# 3.6.1 template families
r("""**Derivation rules** (the compiler, step 5; own; V11C-11): `footprintM2` = [0.7, 1, 1.45] × the authored p50 (the ratios
V02's M10 slot band reads, V2 §13 X2);""",
  """**Derivation rules** (the compiler, step 5; own): `footprintM2` = [0.7, 1, 1.45] × the authored p50 (the ratios
V02's M10 slot band reads as its fixed `sizeBandLo` and `sizeBandHi`, V02 §3.5);""")
r("""two names — and never the church building; SR1-03):""", """two names — and never the church building):""")
r("""**The `manor` override** (class `manor`, V02 §13 X3 reconciled — V02's composition rows were measured against these
values, J-V2.35):""", """**The `manor` override** (class `manor`; V02 §3.10.3's `manor` composition rows are measured against these values,
J-V2.35):""")
r("""`arena`, which reads `hall`. Every family's crypt is `never` unless V11 §3.5.8 says otherwise. The template families
number 35 (the 32 first authored, `burial-ground`, `fort` and `arena`). The `arena` family's oval composition is V02's
`ovalCourt` family row (X-V11-9, answered by V02's X27 and its reconciliation round 1; V11C-48, SCC-11). Provenance: the band structure is `ref:FTG lifestyle
banded pools`""", """`arena`, which reads `hall`. Every family's crypt is `never` unless V11 §3.5.8 says otherwise. The template families
number 35. The `arena` family's oval composition is V02's `ovalCourt` family (V02 §3.3) through V02's `arena` row (V02
§3.10.2), whose `slotBand` reads this table's `arena` plot row and its own `claimShare` (V02 §3.5). Provenance: the band
structure is `ref:FTG lifestyle banded pools`""")
# 3.6.4 heights
r("""`parapetCm` and `towerStoreyCm` are V02's BCR-V2-26 columns with V2 §3.10.6's values, written here once):""",
  """`parapetCm` and `towerStoreyCm` are item 427's columns, their values written here once and their reading rule V02
§3.10.6's):""")
# 3.6.5 role table
r("""**3.6.5 The role table** (`RoleRow`, compiled into every `DesignationTemplateRow.structures` entry; own; V11C-11 (2); the
role ids are the structure names the template families use, and V02's `composition.roleKeys` maps each to its
composition key, V2 §3.10.4 — so V02's and V03's role vocabularies are reached without renaming):""",
  """**3.6.5 The role table** (`RoleRow`, compiled into every `DesignationTemplateRow.structures` entry; own; the role ids
are the structure names the template families use, and V02's `composition.roleKeys` maps each to its composition key,
V02 §3.10.4 — so V02's and V03's role vocabularies are reached without renaming):""")

# 3.7.1 goods
r("""(b) — a hinterland face of that land use, or that deposit, is a provider of the good (BCR-V11-18); `demand` is V11 §2.5's
reverse-pull target; `yarn` is deleted — spinning was household work and the weaver takes wool, general):""",
  """(b) — a hinterland face of that land use, or that deposit, is a provider of the good (item 288); `demand` is V11 §2.5's
reverse-pull target; the table holds no yarn: spinning is household work, and the weaver takes wool, general):""")
r("""*Display words* (BCR-V9-8; reconciliation round 6, SR5-03; J-V11.93): each good's `label` is its key as written""",
  """*Display words* (item 516; J-V11.93): each good's `label` is its key as written""")
r("""(V11 §3.1's *Display cells*). Readers: V09's link view (V9 §4.7) and its goods legend, the clerk's supply explanations
(V10), `@plat/docs`.""", """(V11 §3.1's *Display cells*). Readers: V09's link view (V09 §4.7) and its goods legend, the clerk's supply explanations
(V10), `@plat/docs`.""")
# 3.7.2 produces
r("""**3.7.2 Produces and supply edges.** Every producing class's `produces` names goods above with shares (BCR-V11-3's
`producesShare`, default equal), and the land uses provide the `site` goods of V11 §3.7.1 (arable: grain, hemp, dyestuff;
pasture: livestock, wool, milk; meadow: fodder, herbs;
coppice: firewood, bark; wildwood: pelts, bark; marsh: reed;
vineyard: wine; saltpan: salt):""",
  """**3.7.2 Produces and supply edges.** Every producing class's `produces` names goods above with shares (item 434's
`producesShare`, default equal), and the land uses provide the `site` goods of V11 §3.7.1 (arable: grain, hemp, dyestuff;
pasture: livestock, wool, milk; meadow: fodder, herbs; garden: herbs (item 111's irrigated garden, V11 §3.17.2);
coppice: firewood, bark; wildwood: pelts, bark; marsh: reed; vineyard: wine; saltpan: salt):""")
r("""tannery leather; currier leather; chandler candles; lumber camp
logs; sawmill and timber yard timber 0.5, planks 0.5;""", """tannery leather; currier leather; chandler candles;
sawmill and timber yard timber 0.5, planks 0.5;""")
r("""plus these edges the class tables leave to this list (V11C-06):""", """plus these edges the class tables leave to this list:""")
# 3.7.4 web settings
r("""entrepot 1.0 (its ends take the import and export pulls), sustained 0.9 (V08 §13 X2)""",
  """entrepot 1.0 (its ends take the import and export pulls), sustained 0.9 (J-V11.52)""")
r("""| `orientEnabled` | true | the orientation switch (SCC-34): false""", """| `orientEnabled` | true | the orientation switch: false""")
r("""| `splitEnabled` | true | the split switch (SCC-34): false""", """| `splitEnabled` | true | the split switch: false""")
r("""**The web's off form** (`web.off`; SCC-34; J-V11.72)""", """**The web's off form** (`web.off`; J-V11.72; E-20)""")
r("""(V11 §2.2's preset entries; SCC-51)""", """(V11 §2.2's preset entries)""")
r("""`FM` carries no entry here and leaves the web at its defaults (file f item
376). With the form applied the placement is
byte-identical""", """`FM` carries no entry here and leaves the web at its defaults (item 376). With the form applied the placement is
byte-identical""")

# 3.8 pairs
r("""(relative, BCR-V11-16)""", """(relative, item 437)""", 3)
r("""a values list; T-V11-3 refuses anything else. Two former rows are gone: `mill-leat` (the watermill's hard `nearWater`
with a fall already carries it) and `guildhall-trade` (a guildhall has no trade of its own; a guildhall placed for a
GUILD or COUNT record takes its trade row through §7.7's `PlacementCriteria`, V11 §3.5.7).""",
  """a values list; T-V11-3 refuses anything else. No pair ties a watermill to its leat (the watermill's hard `nearWater`
with a fall carries it) or a guildhall to a trade (a guildhall has no trade of its own; one placed for a GUILD or COUNT
record takes its trade row through §7.7's `PlacementCriteria`, V11 §3.5.7).""")

# 3.9 district kinds
r("""V05 §2.4's rows (BCR-V5-6; keyed apart from every ground kind, J-V5.48)""", """V05 §2.4's rows (item 213; keyed apart from every ground kind, J-V5.48)""")
r("""*Display words* (BCR-V9-8; reconciliation round 6, SR5-03; J-V11.93), read by T5's kind cards (V9 §4.5) and `@plat/docs`;""",
  """*Display words* (item 516; J-V11.93), read by T5's kind cards (V09 §4.5) and `@plat/docs`;""")
r("""`affinity` is BCR-V11-17's `DistrictKindRow.affinity`:""", """`affinity` is `DistrictKindRow.affinity` (item 438):""")

# 3.10 quarter identities
r("""(BCR-V11-19). `slums`, `foreign` and `guild-district` have no `definedBy`""", """(item 439). `slums`, `foreign` and `guild-district` have no `definedBy`""")
r("""words (BCR-V11-25).""", """words (item 442).""")

build('11-s3-6', [(1862, 2316)], R)
