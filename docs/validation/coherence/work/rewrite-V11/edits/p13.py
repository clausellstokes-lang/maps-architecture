from helper import build
R = []
def r(a, b, c=1): R.append((a, b, c))

# 3.13 intro and 3.13.1
r("""and a change is a table fix reviewed with V08 (SCC-06; J-V11.65).""", """and a change is a table fix reviewed with V08 (J-V11.65).""")
r("""**3.13.1 The resolution weights** (`siting.custom`; the resolver of item 104 (a) is the base's, applied by g; these are
its weights; `own`, `extension`).""", """**3.13.1 The resolution weights** (`siting.custom`; the resolver of item 104 (a) is the base's; these are its weights;
`own`, `extension`).""")
r("""use (the clerk's "why"; V11C-30):""", """use (the clerk's "why"):""")
# 3.13.2 archetypes
r("""`village` column is each row's optional `ArchetypeVillageCell` (V11 §2.8; V08's shape carries it, V11 §10b X-V11-6): V07""",
  """`village` column is each row's optional `ArchetypeVillageCell` (V11 §2.8; V08 §2.6's shape carries it): V07""")
r("""where the town class has no village form or another one (SS-09; T-V7-21 reads it):""",
  """where the town class has no village form or another one (T-V7-21 reads it):""")
r("""; SR1-19)""", """)""", 2)
r("""class `v.reeve_house` (the reeve's row; SS-03)""", """class `v.reeve_house` (the reeve's row)""")
r("""placed with its stalls by V07 §3.10's pin-record rule (reconciliation round 6, SR5-11 (a))""",
  """placed with its stalls by V07 §3.10's pin-record rule""")
r("""the optional `family` cell — a V08 shape change requested in V11 §10b — wins over the group's family when set, so a
category-only custom farm is sited as a farm, not a shop; V11C-25):""",
  """the optional `family` cell — carried by V08 §2.6's shape — wins over the group's family when set, so a category-only
custom farm is sited as a farm, not a shop):""")
r("""description; a hit is reported low-confidence). The row shape is V08's `{ key, family, weight }` with four OPTIONAL
cells this volume adds (a V08 shape change, V11 §10b X-V11-6):""",
  """description; a hit is reported low-confidence). The row shape is V08 §2.6's `{ key, family, weight }` with its four
OPTIONAL cells, whose effects are these:""")
r("""The rows with optional cells (V11C-02 (6), V11C-38 (3), V11C-47; `own`):""", """The rows with optional cells (`own`):""")
# 3.13.3 generic classes (V11-ICONF-3)
r("""**3.13.3 The generic classes.** For every profile family `f` of V11 §3.4 the compiler emits `generic-<f>`:""",
  """**3.13.3 The generic classes.** For every non-alias profile family `f` of V11 §3.4 the compiler emits `generic-<f>` (an
alias, `civic` or `defence`, resolves to its target's generic class, V11 §3.4):""")
r("""the family default (V11 §3.5.1), and the display cells (V11 §2.3; reconciliation round 6, SR5-03; J-V11.95):""",
  """the family default (V11 §3.5.1), and the display cells (V11 §2.3; J-V11.95):""")
r("""matches, V9 §4.16 (3)).""", """matches, V09 §4.16 (3)).""")
# 3.13.4 custom chain
r("""flow-order placement, the base's per g; `own`, `extension`, calibratable):""",
  """flow-order placement, the base's (item 104 (h)); `own`, `extension`, calibratable):""")
r("""beside the chain's first processor (V11C-30), never a created river""", """beside the chain's first processor, never a created river""")
r("""never a new warehouse use (SS-17)""", """never a new warehouse use""")
# 3.13.5 good words
r("""**3.13.5 Good words** (`dossier.goodWords`, V11's own `GoodWordRow` of V11 §2.8 — this section's matching rule is its
reader (SS-25) — a row set V08's adapter reads to resolve SettlementForge's
`activeChains[].outputs`, mapping.md row 44's export, import, local-production and transit lists, and a custom chain's
goods to V11 §3.7.1's goods; our own words). **The matching rule** (V11C-10 (4); a pure function, J-V11.26):""",
  """**3.13.5 Good words** (`dossier.goodWords`, V11's own `GoodWordRow` of V11 §2.8 — this section's matching rule is its
reader — a row set V08's adapter reads to resolve SettlementForge's `activeChains[].outputs`, the dossier's export,
import, local-production and transit lists, and a custom chain's goods to V11 §3.7.1's goods; our own words). **The
matching rule** (a pure function, J-V11.26):""")
r("""in the 155 frozen dossiers match a good). `yarn` is no good of V11 §3.7.1 (spinning was household work), so its words
resolve to `wool`:""", """in the 155 frozen dossiers match a good). V11 §3.7.1 holds no yarn good, so yarn's words resolve to `wool`:""")

# 3.14 concealment: J122 (Q-V11-1) and V11-MISSING-1
r("""| `kidnap_den`, `trafficking_den` | every | 0.05 | 0.5 | 0.25 | 0.2 | 0.5 |""",
  """| `kidnap_den`, `trafficking_den` | every | 0 | 0.55 | 0.25 | 0.2 | 0.5 |
| `slave_market` | every | 0 | 0.8 | 0.2 | 0 | 0.5 |""")
r("""| custom `criminal` (item 104 (a) (5)) | every | 0.3 | 0.5 | 0.15 | 0.05 | 0.4 |""",
  """| custom `criminal` (item 104 (a) (5)) | every | 0.3 | 0.5 | 0.15 | 0.05 | 0.4 |

**The sensitive kinds (J122).** The catalogue's `slave_market` and `slave_market_district` (class `slave_market`),
`human_trafficking_network` (`trafficking_den`) and `kidnapping_ring` (`kidnap_den`) are kept on the map and concealed by
default: their rows above weigh `none` at 0, so the class-table source of §4.7's *Concealed institutions* step 1 always
resolves a front, a hidden plot or an underground place, and the concealed use's `knownTo` is `secret` — withheld from a
player view's key and shown on the secret view (item 30; §9.2). SettlementForge's own settings come first: a record whose
dossier states a mode or a knowledge (carried by the port, V08 §2.3) is resolved by that fact (§4.7 step 1), so an open
slave market in the dossier is drawn open, as SettlementForge shows it. A slave market's front is drawn from its cover
row below; its true class's `market-hall` template is read only where it is placed open.""")
r("""(`CoverRow.covers[].cls`; V11C-04 (d)); a front class must have a template row at the band""",
  """(`CoverRow.covers[].cls`); a front class must have a template row at the band""")
r("""| `gang_hideout` | `alehouse` 2, `workshop` 2, `lodging_house` 1 | `tavern` 1, `workshop` 1 |""",
  """| `gang_hideout` | `alehouse` 2, `workshop` 2, `lodging_house` 1 | `tavern` 1, `workshop` 1 |
| `slave_market` | `warehouse` 2, `livery_stable` 1, `carrier_yard` 1 | `market_hall` 2, `warehouse` 2, `auction_house` 1 |""")

# 3.16 walls
r("""arc, which carries no depth, is `deepWater` unless its bank kind is `beach` — V11C-29):""",
  """arc, which carries no depth, is `deepWater` unless its bank kind is `beach`):""")
r("""an arc of a sky island's rim chain (V5 §3.21: closure only, no wall)""", """an arc of a sky island's rim chain (V05 §3.21: closure only, no wall)""")
r("""`cliff` (an escarpment, g item 106 (a))""", """`cliff` (an escarpment, item 106 (a))""")
r("""**The arc kind and the closure feature** (SS-15, SCC-01; J-V11.63).""", """**The arc kind and the closure feature** (J-V11.63).""")
r("""V12's `closure` LineString (file f item 447)""", """V12's `closure` LineString (item 447)""")
r("""(an earlier ring closing a later one, g item 106 (f))""", """(an earlier ring closing a later one, item 106 (f))""")
r("""`palisade.barrierReachShare` 0.5 × the settlement radius) instead (BCR-V7-20, J-V7.45; SS-34);""",
  """`palisade.barrierReachShare` 0.5 × the settlement radius) instead (item 312, J-V7.45);""")
r("""(V07 §3.4 step 5; V11 §10b X-V11-2). An island's rim (V5 §3.21)""", """(V07 §3.4 step 5). An island's rim (V05 §3.21)""")

build('13-s3-13', [(2786, 3287)], R)
