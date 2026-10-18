R = [
("""**The default providers** (this volume's, for the base kinds; the volumes register theirs, table below):""",
"""**The default providers** (this volume's, for the base kinds; the volumes register theirs, table below). One provider
answers a kind at a time: a volume's provider registered for a base kind takes it over from that volume's milestone —
V01's `RetainingWall` from M5, V06's `Enceinte` from M6-E — and this default answers it until then (J-V10.120)."""),
("""| a district | name, kind, identity, band, band range, the character's components | S6's seed kind and grower, or its declaring `quarter` or `drawBoundary` event; S12c's identity with the quarter identity row that won (item 72) |""",
"""| a district | name, kind, identity, band, band range, the character's components | S6's seed kind and grower, or its declaring `quarter` or `drawBoundary` event; S12c's identity with the quarter identity row that won (item 72); on an arid site the growth field's water pull that drew it (S3 (6), item 111 (b)) with its climate row |"""),
("""| an enceinte, gate or tower | kind, closure, the stretch profile | S3 or S5a's trace from its stage boundary, its gate law, or its `drawWall`/`placeGate` | `closure`: each arc a barrier closes with its barrier and defensibility class (item 106 (g)); for a gate, the road that crosses it |""",
"""| an enceinte, gate or tower | kind, closure, the stretch profile; each run's condition and material with its last change (§2.7, item 114) | S3 or S5a's trace from its stage boundary, its gate law, or its `drawWall`/`placeGate`; each run's generation-time condition from §7.7's condition row — the town's defence readiness and wealth at the table's shares (item 114 (d)) — or the event that last changed it (`repairWall`, `wearWall`) | `closure`: each arc a barrier closes with its barrier and defensibility class (item 106 (g)); for a gate, the road that crosses it; each run worded by V09's `info.wall.run` (V10 §3.9b (3)) |"""),
("""| a water body | kind, level, bank class | S1 by descent, or its `drawWater` | DR1 for a dossier site |""",
"""| a water body | kind, level, bank class; an oasis's `spring` with its `flow`, its grove and gardens by `fedBy` (§2.3, item 111 (a)) | S1 by descent — an oasis by the arid row's chance — its `drawWater` (T2's spring flag for a drawn oasis), or a dossier's `oasis_water` (DR40, tier `dossier`) | DR1 for a dossier site; for an oasis, that it is water to every rule that reads water (V10 §3.9b (1)) |"""),
("""| a plot's prosperity (`path` `prosperity`) | value, band | the field's two passes (§4.5) | `drivers` at the plot's sample points, with the daylight term's `sources` |""",
"""| a plot's prosperity (`path` `prosperity`) | value, band | the field's two passes (§4.5) | `drivers` at the plot's sample points, with the daylight term's `sources`, the water term and the climate cell (`climateSun`; item 111 (b), (c)) |"""),
("""| a `RetainingWall` (item 110 (a)) | step range, material, towers or buttresses, high side, source |""",
"""| a `RetainingWall` (item 110 (a); V01 §4.5's provider from M5, the same rows) | step range, material, towers or buttresses, high side, source |"""),
("""| a `Use`, a building, a plot | class, use, band, name, each with its tier and, for a dossier-derived fact, its DR row |""",
"""| a `Use`, a building, a plot | class, use, band, name, each with its tier and, for a dossier-derived fact, its DR row; a design above its rung's grandeur ceiling as V09's `info.grand.beyondTier` (tier `declared`) or `info.grand.dossier` (tier `dossier`) (item 115; V10 §3.9b (4)) |"""),
# owed table: W-IF-03 (V01), IN-V10-3 (V02), V03's keys, V04's lost and buried, V06 and V07 closures
("""| `district.fabric`, `block.content`, `block.squareType`, `HoodPlace`, hood pins; section `fabric` | V01 | V01 §4.5 | the fabric pick, quotas, the siting pushes as pulls, the naming feature, the pin's gate |""",
"""| `district.fabric`, `block.content`, `block.squareType`, `HoodPlace`, hood pins, `district.terrace`, `RetainingWall` (from M5), `district.raised` (the under-deck strip); section `fabric` | V01 | V01 §4.5 | the fabric pick, quotas, the siting pushes as pulls of V11's families, the naming feature, the pin's gate; the terrace state and its source; a wall's producer, slope and step and each way that crosses it; the raised way over an under-deck strip with its reason |"""),
("""| `building` paths `massing`, `wings/<key>`, `composition`; section `massing` | V02 | V02 §4.5, §4.6 (6); CVR-V10-8 | the massing family, its rows and alternatives, the rejected tower; item 110's stack facts `massing/stack/*`, `wings/<key>/on`, `wings/<key>/solid`, `massing/stairSteep` and a deck building's `massing/deck` |""",
"""| `building` paths `massing`, `wings/<key>`, `composition`; section `massing` | V02 | V02 §4.5, V02 §4.6 (6), V02 §4.6 (7) | the massing family, its rows and alternatives, the rejected tower; item 110's stack facts `massing/stack/*`, `wings/<key>/on`, `wings/<key>/solid`, `massing/stairSteep`, a deck building's `massing/deck`, and the facts `massing/bend/<id>`, `stack.grade` and the derived aspect, each bend of V02 §1b worded by its V09 §4.9 row |"""),
("""| `room`, `building` path `plan`; sections `plan` and **`crypt`** | V03 | V03 §4.6; CVR-V10-2, CVR-V10-9 | the programme rows and owed rows; the crypt (V10 §3.9a); item 110's room causes `landingDoor`, `terraceDoor`, `terraceExit`, `walkOut`, `tombDoor`, `gradeFace`, `deckRefusal` |""",
"""| `room`, `building` path `plan`; sections `plan` and **`crypt`** | V03 | V03 §4.6 | the programme rows and owed rows; the crypt (V10 §3.9a); item 110's room causes (`info.plan.cause.<cause>`: `landingDoor`, `terraceDoor`, `terraceExit`, `seatingExit`, `walkOut`, `tombDoor`, `gradeFace`, `deckNoCellar`, `stoop`, `exposure`, `stackCarried`) and `PlanReport.notes`' `shrineOneRoom`, `solidMonument` and `stackCarried` by the same ids |"""),
("""| underground systems, `AccessPoint`, `UndergroundLink`, `RuinRecord`, `CatacombComplex`, void clusters; section **`underground`** on burial faces, buildings over a void and districts above a ruin | V04 | V04 §4.5; CVR-V10-1, CVR-V10-10 | V10 §3.9a; item 110's arch vaults with their span and its reason, a ruin's stepped monument (tiers laid, standing, truncated), an aqueduct's terminal cistern, a void met by a support's footing ("the builders filled what they met") |""",
"""| underground systems, `AccessPoint`, `UndergroundLink`, `RuinRecord`, `CatacombComplex`, void clusters; section **`underground`** on burial faces, buildings over a void and districts above a ruin | V04 | V04 §4.5 | V10 §3.9a; item 110's arch vaults with their span and its reason, a ruin's stepped monument (tiers laid, standing, truncated), an aqueduct's terminal cistern, a void met by a support's footing ("the builders filled what they met"); item 113's `lost` clusters and buried former settlements |"""),
("""| `SkyIsland`, `SkyAccess`, the `fallen_island` decoration; section `island` on shaded ground | V05 | V05 §4.5; CVR-V10-14 |""",
"""| `SkyIsland`, `SkyAccess`, the `fallen_island` decoration; section `island` on shaded ground | V05 | V05 §4.5 |"""),
("""| `Use` (lifecycle `detail.why`), `Enceinte` (pathway), `district` path `prosperity` (`FieldDrivers.since`), `MutationPlan`; section `move` | V06 | V06 §4.5; CVR-V10-5, CVR-V10-11 | the recorded move reasons, the wall's pathway, the shade since year N; a raised way built at an epoch, a slumped retaining wall, a struck deck |""",
"""| `Use` (lifecycle `detail.why`), `Enceinte` (pathway, from M6-E), `district` path `prosperity` (`FieldDrivers.since`), `MutationPlan`; section `move` | V06 | V06 §4.5 | the recorded move reasons, the wall's pathway and each run's condition, material and last change (item 114), the shade since year N and the water term's fall ("the spring failed in year N"), a re-plan under the grandeur ceiling; a raised way built at an epoch, a slumped retaining wall, a struck deck |"""),
("""| the village records (`VillagePlan`, `VillageField`, `VillageEnd`) | V07 | V07 §4.5; CVR-V10-14 | the heart's terms, a field's system, an end's reason; a house-platform wall; arches carried from when the place was larger |""",
"""| the village records (`VillagePlan`, `VillageField`, `VillageEnd`) | V07 | V07 §4.5 (its `info.village.*` rows; T-V7-61) | the heart's terms, a field's system, an end's reason; a house-platform wall; arches carried from when the place was larger |"""),
("""The section names V09's why card renders (V09 §2.7) are exactly those in this table's first column and this volume's
`raised`.""",
"""The section names V09's why card renders (V09 §2.7) are exactly those in this table's first column and this volume's
`raised` and `history` (V10 §3.9b (2))."""),
("""| `suppressed` | "you removed it in week {w}; the town will not rebuild it" (one key with V08's history panel; CVR-V10-14) | the removal's week and `seq` |""",
"""| `suppressed` | "you removed it in week {w}; the town will not rebuild it" (one key with V08's history panel, V08 §4.6) | the removal's week and `seq` |"""),
# the solver's explanation: the base states the inputs and terms (item 311); this volume fixes the placed set, shares, candidates and drift
("""**The solver's explanation** (`PlacementSolver.explain`, item 311) — read-only, deterministic, no stream advanced,
nothing written:

1. **Inputs.** The committed model's context vectors, the solver's distance and provider rasters (built lazily for the
   classes the item's rows name when they are not resident, one distance transform per class as §4.7 S10b builds them),
   the effective tables — the class's relation rows, item 103's families, coverage and signature pairs, item 105's
   supply web, item 107's balance rows and item 102 (d)'s sunlit preference, as the coherence pass applies them to
   S10b's score — and the placed set the mode names.
2. **The placed set** (J-V10.44).""",
"""**The solver's explanation** (`PlacementSolver.explain`, item 311) decomposes S10b's own score read-only, as §4.7 S10b
states it — its inputs, its lazily built rasters, every hard row and soft term, the chance term recomputed without
advancing a stream, the top candidates and the links. This volume fixes the placed set, the shares, the candidates' form
and drift:

1. **The placed set** (J-V10.44)."""),
("""3. **At the plot.** Each hard row with pass or fail; each soft term's satisfaction × weight as a signed contribution,
   grouped into `WhyPull` families by V10 §2.13's mapping, each with its sentence; the field term, the sunlit term, the
   character term, the district allocation that put the class in this district (S7b's row with item 105 (g)'s supply
   term), and the controlled chance term — its draw recomputed from its stream key, which is a pure function of the key
   (§6.1), so no stream is advanced. Shares are each term over the plot's total score. A cross-arena term names its
   landing (`via`, V05 §3.20).
4. **Candidates and links.**""",
"""2. **At the plot.** Each term's signed contribution grouped into `WhyPull` families by V10 §2.13's mapping, each with its
   sentence — the district allocation's term being S7b's row with item 105 (g)'s supply term; shares are each term over
   the plot's total score; a cross-arena term names its landing (`via`, V05 §3.20).
3. **Candidates and links.**"""),
("""5. **Equivalence and drift.**""", """4. **Equivalence and drift.**"""),
("""   10⁻⁹ and that the chance term equals its draw.

**The field's drivers** (`ProsperityField.drivers(points)`, item 297): for sample points (a plot's centroid; a
district's plot centroids), each term of §4.5's `P(x)` evaluated separately — every driver kernel `w_i · kernel_i(x)`
(item 102's daylight term `−w_sun · shade(x)` among them, with V05 §4.5's per-caster `sources`), `characterOffset`, the
brush strokes' composite, an epoch's drift where §4.11 applied one, and `ε` as `chance` — averaged over the points; the
terms sum, before the clamp, to the value the field stores (T-V10-10). V06's `district` provider fills `since` from the
shade masks of the history frames ("the island's shade since year N").""",
"""   10⁻⁹ and that the chance term equals its draw.

**The field's drivers** are §4.5's `ProsperityField.drivers(points)` (item 297), sampled at a plot's centroid or at a
district's plot centroids: every term of `P(x)` apart — the daylight term with V05 §4.5's per-caster `sources`, the water
term and the climate cell (item 111 (b), (c)) among them — summing before the clamp to the stored value (T-V10-10). V06's
`district` provider fills `since` from the shade masks of the history frames ("the island's shade since year N") and the
water term's fall ("the spring failed in year N")."""),
# 3.9a
("""in an encoder, since the source rule lives in the engine alone (J111). Two section providers carry the rows; every row's
words are a key of V09's catalogue (`info.under.*`, `info.catacomb.*`, `info.crypt.*`), one key per value of every union
named below, so the clerk and V09's panels say the same words (T-V10-29).

**`underground`** (V04's provider; CVR-V10-1), on a void element, a system, an access, a link, a burial face, a building
over a void and a district above a ruin:""",
"""in an encoder, since the source rule lives in the engine alone (J111). Two section providers carry the rows — V04 §4.5's
and V03 §4.6's, which key them — and every row's words are a key of V09's catalogue (`info.under.*`, `info.catacomb.*`,
`info.crypt.*`), one key per value of every union named below, their `en` words written here once and loaded by V09
§4.9, so the clerk and V09's panels say the same words (T-V10-29).

**`underground`** (V04 §4.5's provider), on a void element, a system, an access, a link, a burial face, a building over a
void and a district above a ruin:"""),
("""| a void cluster (cavern or ruin) | `excavation`; when accessible, the chain of links and accesses that joins it to the surface, transitively ("through the old mine, then the breach into the gallery"); when unexcavated (a `secret` key only): "not yet found by anyone in town" (`info.under.sealed`) |
| a void with no dwellings | "no dwellings: no way in" while unexcavated (item 109 (j) (4)); else the undercity's or the scattered dwellings' count |""",
"""| a void cluster (cavern, ruin or buried former settlement) | `excavation`; when accessible, the chain of links and accesses that joins it to the surface, transitively ("through the old mine, then the breach into the gallery"); when unexcavated (a `secret` key only): "not yet found by anyone in town" (`info.under.sealed`); when `lost` (item 113 (e); at the key that admitted it while accessible): "once known; every way in has closed", with the closing that ended its last path where the commit record names it (V09's `info.under.lost`) |
| a buried former settlement (item 113 (c)) | its burial — the replay epoch that buried it and why (floods, silt, rebuilding on top; DR39) — and the former fabric it lies under, from the `HistoryRecord` (V10 §3.9b (2)): "the old town lies under the new one, buried since the floods of year {n}" |
| a void with no dwellings | "no dwellings: no way in" while unexcavated (item 109 (j) (4)) or lost ("every way in has closed; its people have left", item 113 (e)); else the undercity's or the scattered dwellings' count |"""),
("""any other "{n} of {count}", a growth stopped by the 0.9 cap `blockedBy: 'rank'` "it may not outgrow the Catacombs of {largest}";""",
"""any other "{n} of {count}", a growth stopped by V04's rank cap (`CatacombRule.rankCap`, `blockedBy: 'rank'`) "it may not outgrow the Catacombs of {largest}";"""),
("""**`crypt`** (V03's provider; CVR-V10-2), on every church-class building (the cathedral, great-temple, church, parish
church and monastery-church classes):""",
"""**`crypt`** (V03 §4.6's provider, its keys `info.crypt.presence.*`, `.form.*`, `.rank.*`, `.join` and `.none.*`), on every
church-class building (the cathedral, great-temple, church, parish church and monastery-church classes):"""),
("""| area and form | `Basement.crypt.ring`'s area; the form: full, half, "a raised-choir crypt" (`Basement.kind 'raised'`, V02 §3.14.5), or on a sky island "a vault cut into the island's rim" (V05 §3.10) |""",
"""| area and form | `Basement.crypt.ring`'s area; the form: full, half, "a raised-choir crypt" (`Basement.kind 'raised'`, V02 §3.14.5 — an `always` class on wet ground takes it, V03 §3.7.4: "raised over wet ground"), or on a sky island "a vault cut into the island's rim" (V05 §3.10) |"""),
("""| no crypt | "no crypt: its row gave it none"; on wet ground "no crypt: ledger slabs in the chancel floor" |""",
"""| no crypt | "no crypt: its row gave it none" (`info.crypt.none.row`); a church that is not an `always` class on wet ground (V03 §3.7.4): "no crypt on wet ground: its burials are marked by ledger slabs in the chancel floor" (`info.crypt.none.wet`) |"""),
]
