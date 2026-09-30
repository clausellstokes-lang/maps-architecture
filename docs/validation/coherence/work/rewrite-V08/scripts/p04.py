import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/04-s2-6.md')
e.R("""* **`tiers`** (title word; the rung is the population's, DR23): `thorp`, `hamlet`, `village`, `town`, `city`,
  `metropolis` → the same word as the map's title (§9.5); else the word itself, noted `unmapped_word`.""",
"""* **`tiers`** (title word; the rung is the population's, DR23): `thorp`, `hamlet`, `village`, `town`, `city`,
  `metropolis` → the same word as the map's title (§9.5); else the word itself, noted `unmapped_word`. Its `band`
  column is SettlementForge's own population band per word — `thorp` 8–60, `hamlet` 61–400, `village` 401–900, `town`
  901–5 000, `city` 5 001–25 000, `metropolis` 25 001–100 000 (CONFIRMED on the line) — read by V08 §2.6c's evidence
  (a population's tier) and by the effective peak's size (V06 §3.20.1 (2), at V11's `history.symbolicQuantile` of the
  band).""")
e.R("""  `desert` → the arid biome row, open water only with an `oasis_water` deposit; the older words `grassland` → plains,""",
"""  `desert` → relief `auto` and the arid biome row (V11's climate row with item 111's oasis chance, water-pull weight
  and sunlight cell), keeping every water setting a site can have (item 111 (a)): the water the dossier's other words
  give — access `river` (a river) or `port` (a harbour basin), a realm cell's river or coast, the water deposits DR1 reads
  (`river_fish`, `river_mills`, `river_clay`, `fertile_floodplain` a river; `deep_harbour` a coast; `fishing_grounds` open
  water, a coast or a lake by S0's draw) — stands at chance 1 as on any terrain; a desert with none of them draws river,
  lake and coast at the arid row's chances (§4.2 S0–S1); an `oasis_water` deposit makes an oasis exist (DR40) beside
  whatever else the site holds, and without one the arid row's oasis chance applies, likelier with no other water
  (§4.2 S1). No open water at all is the one dry desert — the toll-bridge rule's failure condition (V08 §2.6b (3));
  the older words `grassland` → plains,""")
e.R("""`oasis_water` → a pond or lake; a custom deposit → its custom""","""`oasis_water` → the oasis (DR40: a spring-fed pond or small lake with its grove and irrigated gardens, §4.2 S0–S1, V11's rows); a custom deposit → its custom""")
e.R("""**A land use a record needs (SR2-04 of
  seam-settlements-r2; item 20 (h): derived, never asked).**""","""**A land use a record needs (item 20 (h):
  derived, never asked).**""")
e.R("a pseudo-class of V11 §3.11 (BCR-V11-9, adopted):","a pseudo-class of V11 §3.11:")
e.R("""  village?: ArchetypeVillageCell /* SS-09's village cell, typed once by V11 §2.8 (class and elseClass — v.<id> classes —,
  pin, delta, composition, ruin; V11's reconciliation round 1 widened the three-field sketch so V07 §2.4's else-classes,
  composition keys and the ruin decoration are data), V11's rows from V07 §2.4's substitutions: read at village rungs by
  item 104's resolver before V11 §3.22's villageForm */ }`""","""  village?: ArchetypeVillageCell /* typed once by V11 §2.8 (class and elseClass — v.<id> classes —, pin, delta,
  composition, ruin), V11's rows from V07 §2.4's substitutions: read at village rungs by item 104's resolver before
  V11 §3.22's villageForm */ }`""")
e.R("""The weights are V11's (active 1.0,
  vulnerable 0.8, impaired 0.6, entrepot 1.0; `sustained` 0.9 as V11 adopted it, J-V11.52, V08 §13 X2 closed); the port never holds
  a weight (J-V8.49).""","""The weights are V11's `siting.web.chainStatus`
  cells, one per neutral key (J-V11.52); the port never holds a weight (J-V8.49).""")
e.R("""  fourteen words are the survey's full list (research V15; twelve of them CONFIRMED again on the 35 births).""",
"""  fourteen words are the survey's full list (CONFIRMED on the births).""")
e.R("""(CONFIRMED over its fifteen
  stressor types and the condition archetypes seen; its full condition registry was not read), so `raider` stays a
  standalone and pack key (J-V8.50).""","""(CONFIRMED over its fifteen
  stressor types and every fixture's condition archetypes), so `raider` stays a standalone and pack key (J-V8.50); an
  archetype word the `conditions` row lacks is `unmapped_word` and yields no key (T-V8-18's totality clause).""")
e.R("""  `cultures` row → `c14`, V11's default row, region `western`; a later table version may give a culture another row;
  else `c14`. The line has no era field, so item 110's era modifier is one constant on dossier maps and the culture is
  the discriminator (V08 §2.6b (4); J-V8.71).""","""  `cultures` row → `c14`, V11's default row, region `western`; else `c14`. This row is the era derivation's one home:
  it reads the culture alone, never the tier (V11 §3.19.2 cites it). The line has no era field, so item 110's era
  modifier is one constant on dossier maps and the culture is the discriminator (V08 §2.6b (4); J-V8.71).""")
e.save()
