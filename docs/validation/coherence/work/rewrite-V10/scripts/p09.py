import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/09-s3-9.md')
# default providers table: water body, greenery, district, raised way spans, retaining wall, history record
e.R("""| a district | name, kind, identity, band, band range, the character's components | S6's seed kind and grower, or its declaring `quarter` or `drawBoundary` event; S12c's identity with the quarter identity row that won (item 72) | `drivers` averaged over its plots for `path` `prosperity` or `band` (item 102 (f)); `history` (renames, epochs) |""",
"""| a district | name, kind, identity, band, band range, the character's components | S6's seed kind and grower, or its declaring `quarter` or `drawBoundary` event; S12c's identity with the quarter identity row that won (item 72) | `drivers` averaged over its plots for `path` `prosperity` or `band` (item 102 (f)); for `path` `water`, the water rows (*Water in a dry land*, below); `history` (renames, epochs) |""")
e.R("""| a water body | kind, level, bank class | S1 by descent, or its `drawWater` | DR1 for a dossier site |""",
"""| a water body | kind, level, bank class; for an oasis (`spring`, item 111 (a)) its area, `spring.flow` and the grove and gardens it feeds (`fedBy`) | S1 by descent, S1's oasis feature (§4.2 S1), or its `drawWater` (with `spring`, a hand oasis) | DR1 for a dossier site, DR40 for a dossier's oasis; an oasis's water rows |""")
e.R("""| greenery | kind, density | S12b's rule row | — |""",
"""| greenery | kind, density; `fedBy` for an oasis grove or garden (§2.3) | S12b's rule row (the oasis grove row, §4.9) | the water row `fed` |""")
e.R("""| a plot's prosperity (`path` `prosperity`) | value, band | the field's two passes (§4.5) | `drivers` at the plot's sample points, with the daylight term's `sources` |""",
"""| a plot's prosperity (`path` `prosperity`) | value, band | the field's two passes (§4.5) | `drivers` at the plot's sample points, with the daylight term's `sources` and climate cell and the water term (item 111 (b), (c)); on a hot arid row the water row `shadePrized` |""")
e.R("""**carried:** "built in year {n}, when {town} was a city" (a generated way standing below CITY); **declared:** its event, "declared by you" (at TOWN and below the only source) | the `raised` section (below); each span's use with its reason (`open` by way, water, flood, tall, low, slope or land; `vault`; `user`) from the base's span record |""",
"""**carried:** "built in year {n}, when {town} was a city" (a generated way standing below CITY); **declared:** its event, "declared by you" (at TOWN and below the only source) | the `raised` section (below); each span's use (`open` or `vault`) with its `reason` from the base's span record (§2.7: every value of its union, J-C4's `country` among them) |""")
e.R("""| a `RetainingWall` (item 110 (a)) | step range, material, towers or buttresses, high side, source |""",
"""| a `RetainingWall` (item 110 (a)) — this default until V01's provider for the kind registers (M5; V01 §4.5), which then answers every retaining wall (one provider per kind, the same rows) | step range, material, towers or buttresses, high side, source |""")
e.R("""| a deck plot, and a building on one (item 110 (d)) | the deck, its kind and host way, the budget band and `maxFloors` (V02's `massing/deck`), a landmark slot's `head` or `mid` | the deck's plotting at S10, or its `placeAt` | "falls with its deck"; a refused class's or storey's bend |""",
"""| a deck plot, and a building on one (item 110 (d)) | the deck, its kind and host way, the budget band and `maxFloors` (V02's `massing/deck`), a landmark slot's `head` or `mid` (V02's registry path `deck/landmarks/<head \\| mid>`) | the deck's plotting at S10, or its `placeAt` | "falls with its deck"; a bent class's or storey's line |
| the `HistoryRecord` (item 113; one per document, §2.7) | the peak's rung, its population (absent when `symbolic`), `symbolic`, the evidence kinds with their tiers (DR36), the span, the epoch count and length | `rule: 'historyReplay'` (V06 §3.20) with DR36–DR39's rows | the `past` section's epoch rows (V10 §3.9b) |""")
e.R("""| `district.fabric`, `block.content`, `block.squareType`, `HoodPlace`, hood pins; section `fabric` | V01 | V01 §4.5 | the fabric pick, quotas, the siting pushes as pulls, the naming feature, the pin's gate |""",
"""| `district.fabric`, `block.content`, `block.squareType`, `HoodPlace`, hood pins, `district.terrace`, `RetainingWall` (from M5), `district.raised`; section `fabric` | V01 | V01 §4.5 | the fabric pick, quotas, the siting pushes as pulls (V11's families), the naming feature, the pin's gate; the terrace state and its source; a retaining wall's producer, slope and step; an under-deck strip's raised way and its reason |""")
e.R("""| `building` paths `massing`, `wings/<key>`, `composition`; section `massing` | V02 | V02 §4.5, V02 §4.6 (6); CVR-V10-8 |""",
"""| `building` paths `massing`, `wings/<key>`, `composition`; section `massing` | V02 | V02 §4.5, V02 §4.6 |""")
e.R("""| `room`, `building` path `plan`; sections `plan` and **`crypt`** | V03 | V03 §4.6; CVR-V10-2, CVR-V10-9 | the programme rows and owed rows; the crypt (V10 §3.9a); item 110's room causes `landingDoor`, `terraceDoor`, `terraceExit`, `walkOut`, `tombDoor`, `gradeFace`, `deckRefusal` |""",
"""| `room`, `building` path `plan`; sections `plan` and **`crypt`** | V03 | V03 §4.6 | the programme rows and owed rows; the crypt (V10 §3.9a); V03 §4.6's room causes, one key each (`deckNoCellar`: why a deck building has no cellar) |""")
e.R("""| underground systems, `AccessPoint`, `UndergroundLink`, `RuinRecord`, `CatacombComplex`, void clusters; section **`underground`** on burial faces, buildings over a void and districts above a ruin | V04 | V04 §4.5; CVR-V10-1, CVR-V10-10 | V10 §3.9a; item 110's arch vaults with their span and its reason, a ruin's stepped monument (tiers laid, standing, truncated), an aqueduct's terminal cistern, a void met by a support's footing ("the builders filled what they met") |""",
"""| underground systems, `AccessPoint`, `UndergroundLink`, `RuinRecord`, `CatacombComplex`, void clusters; section **`underground`** on burial faces, buildings over a void, districts above a ruin, raised ways with arch vaults and an aqueduct's terminal building | V04 | V04 §4.5 | V10 §3.9a: item 109's rows; item 110's arch vaults, a ruin's stepped monument, an aqueduct's terminal cistern, a void met by a support's footing; item 113's lost cluster and buried former element |""")
e.R("""| `SkyIsland`, `SkyAccess`, the `fallen_island` decoration; section `island` on shaded ground | V05 | V05 §4.5; CVR-V10-14 |""",
"""| `SkyIsland`, `SkyAccess`, the `fallen_island` decoration; section `island` on shaded ground | V05 | V05 §4.5 |""")
e.R("""| `Use` (lifecycle `detail.why`), `Enceinte` (pathway), `district` path `prosperity` (`FieldDrivers.since`), `MutationPlan`; section `move` | V06 | V06 §4.5; CVR-V10-5, CVR-V10-11 |""",
"""| `Use` (lifecycle `detail.why`), `Enceinte` (pathway), `district` path `prosperity` (`FieldDrivers.since`), `MutationPlan`; section `move` | V06 | V06 §4.5 |""")
e.R("""| the village records (`VillagePlan`, `VillageField`, `VillageEnd`) | V07 | V07 §4.5; CVR-V10-14 | the heart's terms, a field's system, an end's reason; a house-platform wall; arches carried from when the place was larger |""",
"""| the village records (`VillagePlan`, `VillageField`, `VillageEnd`); section `village` on the base kinds at village rungs | V07 | V07 §4.5 (T-V7-58) | the heart's terms, a field's system, an end's reason; a house-platform wall; arches carried from when the place was larger; the village's water pull, its oasis and its former city (`info.village.*`) |""")
e.R("""The section names V09's why card renders (V09 §2.7) are exactly those in this table's first column and this volume's
`raised`.""","""The section names V09's why card renders (V09 §2.7) are exactly those in this table's first column and this volume's
`raised` and `past`. A volume that registers a provider for a base kind (V01's `RetainingWall`) replaces this volume's
default for that kind: the registry keeps one provider per kind (§2.8).""")
e.R("""   `asPlaced` scores against the members as they stood when the item was placed: from the item's `PlacementOrder` (BCR-
   V10-15), the committed uses""","""   `asPlaced` scores against the members as they stood when the item was placed: from the item's `PlacementOrder` (item
   271), the committed uses""")
# water block and value provenance after raised section's knowledge paragraph
e.R("""building, its use and its stored plan follow V04's and V03's knowledge rules in the `underground` rows and in the
effects list.""","""building, its use and its stored plan follow V04's and V03's knowledge rules in the `underground` rows and in the
effects list.

**Water in a dry land** (item 111 (a)–(c); J-V10.112). The clerk explains the oasis, the water pull on growth, the
prosperity field's water term and the climate row's sunlight cell only from the records item 111 writes — the oasis's
`WaterBody.spring` and `fedBy` links (§2.3), DR40, S0's resolved features with their reasons (the report's
`autoResolved`, §4.2 S0), the growth field's water pull (§4.2 S3, §4.4), the field's drivers (V10 §2.13 `FieldDrivers`:
the water term's `distM` and `source`, the daylight term's `climate`) and V06's springs step (V06 §3.12.1) — never by a
rule of its own. Every row's words are one catalogue key `info.water.<row>` (V09 §4.9 loads the family's `en` texts from
this table):

| row | subject and condition | words (the `en` text) | values shown |
|---|---|---|---|
| `oasis` | a generated oasis | "{town} grew around its oasis: a spring-fed {pond \\| lake} in the {hollow \\| fault line}" | its area; the arid row's oasis chance from `autoResolved` |
| `oasisDossier` | an oasis DR40 made (a dossier's `oasis_water`) | "the settlement's record lists an oasis here" | a `facts` row of tier `dossier` with DR40 |
| `oasisDrawn` | an oasis made by T2 `ground`'s lake with `spring` | "you made this oasis" | the event's week |
| `failing` | an oasis or spring whose `spring.flow` < 1 | "its spring has been failing since year {n}: {share} of its flow is left" | `flow`; the chronicle's `springFailed` week (V06 §3.12.1) |
| `fed` | a grove or garden with `fedBy` | "watered by {spring}" | a `ref` to the water body |
| `pull` | a district, `path` `water`, on an arid climate row | "water is scarce here: the town crowds to its water, and this quarter lies {m} m from {source}" | the district's mean `distM` and nearest `source` from the water term |
| `wealthWater` | a plot's or district's prosperity on a climate row with a water weight | "the wealthy hold the land nearest the water: {m} m from {source}" | the water term's `delta`, `distM` and `source` |
| `shadePrized` | a plot's prosperity where the climate cell is ≤ 0 | "in this hot, dry land shade is prized: the shaded streets are the better ones" | the daylight term's `climate` and `delta` |
| `noOasis.<reason>` | a district, `path` `water`, with no oasis in the settlement — `notArid` (P(oasis) is 0 off an arid row), `chance` (the draw gave none), `dossier` (a dossier-bound site whose record lists no `oasis_water`), `island` (a sky island's ground: its water is V05's) | "not dry country: oases come only in arid lands" · "the rules gave {town} no oasis this time ({p})" · "the settlement's record lists no oasis" · "an island keeps its own water" | the reason's value (the chance `p` shown as J-V10.23 shows the chance term) |

A sky island reads none of item 111's rows but `noOasis.island` (V05 §4.5; item 111). The rows are `purpose: false`: an
oasis names no purpose. Tests: T-V10-45.

**A value's provenance** (V12 §4.4). "Why is this value so?" is `read_map rule` with the cell's table and key: the
answer's `RuleAnswer.evidence` (V10 §2.13) gives the plain line first ("tuned so organic lanes turn as much as FTG's
streets per 100 m"), the run id only behind "details"; a stamped cell reads "the owner's rule, item …" (status `owner`);
a cell with no entry answers from its provenance alone. The clerk never starts a calibration run (no tool or API call
can).""")
# 3.9a edits
e.R("""The clerk explains item 109's subjects only from the records their volumes write — V04's `RuinRecord`, `CatacombComplex`,
`AccessCause`, `LinkCause`, `reusedBy` and the excavation reading, and §2.6's `Basement.crypt` (V03) with its rank — and""",
"""The clerk explains item 109's subjects, item 110's underground rows and item 113's lost and buried rows only from the
records their volumes write — V04's `RuinRecord`, `CatacombComplex`, `AccessCause`, `LinkCause`, `reusedBy`, the
excavation reading, the reader fact `under/wayIn` and the buried former settlement (V04 §4.5), and §2.6's
`Basement.crypt` (V03) with its rank — and""")
e.R("""**`underground`** (V04's provider), on a void element, a system, an access, a link, a burial face, a building
over a void and a district above a ruin:""","""**`underground`** (V04's provider, V04 §4.5), on a void element, a system, an access, a link, a burial face, a
building over a void, a district above a ruin, a raised way with arch vaults and an aqueduct's terminal building:""")
e.R("""| an access point | its `cause.rule`, one of `AccessCause.rule`'s values (V04 §2.2) — `neighbourhood`, `basement`, `system`, `dig`, `opening` (with its opening kind), `overlap`, `mineBreach`, `lifeline`, `edit`, `dossier`, `crypt` and `legacy` — worded by V09 §4.17.3's lines, the catalogue rows `info.under.cause.<rule>` (V09 §4.9; this volume writes no words for them), with its system and the event or epoch that made it (item 109 (j) (3), (3b)) |""",
"""| an access point | its `cause.rule` (V04 §2.2's `AccessCause.rule`), worded by V09 §4.17.3's lines, the catalogue rows `info.under.cause.<rule>` (this volume writes no words for them), with its system and the event or epoch that made it (item 109 (j) (3), (3b)) |""")
e.R("""| a void cluster (cavern or ruin) | `excavation`; when accessible, the chain of links and accesses that joins it to the surface, transitively ("through the old mine, then the breach into the gallery"); when unexcavated (a `secret` key only): "not yet found by anyone in town" (`info.under.sealed`) |""",
"""| a void cluster (cavern or ruin) | `excavation`; when accessible, the chain of links and accesses that joins it to the surface (`under/wayIn`, V04 §4.5), transitively ("through the old mine, then the breach into the gallery"); when unexcavated (a `secret` key only): "not yet found by anyone in town" (`info.under.sealed`); when **lost** (item 113 (e); to every key that admits its elements, V04 §3.5.7 (g) (5)): "once known; its way in closed in year {n}" — `info.under.lost`, the element first closed on the last open path and the commit or epoch that closed it, the year from that epoch's week (the words V09 §4.9's row carries) |""")
e.R("""| a sealed deep void | "below the reach of every cellar above" (`info.under.deep`) — deeper than `DigRule.maxM` under every building over it (item 109 (j) (5)) |""",
"""| a sealed deep void | "below the reach of every cellar above" (`info.under.deep`) — deeper than `DigRule.maxM` under every building over it (item 109 (j) (5)) |
| a buried former element (item 113 (c); DR39) | "the old {town}'s {street \\| wall \\| building} lies buried here, {m} m down, since {yearsAgo} years ago" (`info.under.former`) — its former record, burial epoch and rise (V04 §4.5); with the `past` section's rows of the record it came from (V10 §3.9b) |
| an arch vault (item 110) | "an arch of {way} walled up as a vault: {reason}" (`info.under.arch.<reason>`, one key per value of the span record's `reason`, §2.7) — its raised way and its span |
| a ruin's stepped monument | "{laid} tiers laid, {standing} standing{, cut short}; its mound {m} m" (`info.under.monument`) — `Chamber.monument` |
| the terminal cistern | "the cistern where {aqueduct} ends, under {building}" (`info.under.terminal`) |
| a void met by a footing | "the builders filled what they met: the footing of {pier or wall}" (`info.under.footing`) — the `FoundationsResult` entry or the derivation's collapsed stretch and pillar |""")
e.R("""rank 1 "the largest catacomb in {town}, under its largest cemetery that holds one", any other "{n} of {count}", a growth stopped by the 0.9 cap `blockedBy: 'rank'` "it may not outgrow the Catacombs of {largest}";""",
"""rank 1 "the largest catacomb in {town}, under its largest cemetery that holds one", any other "{n} of {count}", a growth stopped by the rank cap (`CatacombRule.rankCap`, V04 §3.5.1 (5)) `blockedBy: 'rank'` "it may not outgrow the Catacombs of {largest}";""")
e.R("""| no crypt | "no crypt: its row gave it none"; on wet ground "no crypt: ledger slabs in the chancel floor" |""",
"""| no crypt | "no crypt: its row gave it none"; on wet ground (V03 §3.7.4 *Wet ground*) an `always` class takes the raised-choir crypt (the form row), and any other church "no crypt: its burials are marked by ledger slabs in the chancel floor" |""")
e.save()
