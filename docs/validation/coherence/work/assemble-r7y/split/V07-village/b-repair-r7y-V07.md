
=== REPLACE ### 3.5a A raised way on a village map (item 110 (b); J-V7.83) ===
### 3.5a A raised way on a village map (item 110 (b); J-V7.83)

The owner: "i think raised ways for cities is fair for the genertor to generate adn then a user can decide to add or
remove". A village never generates one (the rung gate, V07 §3.5), but a user may add one at any rung, and one generated in
a city epoch stays when the place falls through TOWN below the hand-off band (V07 §3.12; V06 §3.19: a fall below CITY never
removes one). On every derivation and every village epoch the village's own stages lay their ways, plots and fields around
it.

**(1) Sources at village rungs.** Exactly two: a **declaration** — T4 `road` with `raised`, or the aqueduct class, or the
skeleton file's line (V07 §4.1) — and a way **carried down** through the hand-off from a CITY epoch (V07 §3.12). No village
stage and no village phase creates one. No village tool refuses a raised stroke for its rung (item 101 R2; J-VI.4): the
rung gate binds only generation (item 290); a raised stroke is refused only where §7.1's dry-run outcomes refuse a
declaration, a meeting with a wall-like structure that §2.7's laws give no lawful shape among them (law 2 (c); V07 §3.5a
(4)).

**(2) The data key.** `raised` (§4.1's `RaisedRead`): the ground arena's parts from 1 read as one key — per raised way
its deck strip, its supports and spans by their keys with their `state`, two feet and, for an aqueduct, its channel —
published by the declaration layer (V07 §3.0). VS3, VS4, VS5, VS6, S10, S12a, the hinterland unit and VS8 declare it as an
input (V07 §3.0's table). No village stage writes a part from 1. **A support stands for the village while its `state` is
absent or `ruined`** (a ruined pier is a stump of masonry): such a support is an obstacle ((3)), built into the palisade's
line where it stands in its band ((4)), and a hole in the faces beneath ((5), (6)); a `cleared` support (taken down in
V06 §3.19.2's decline, its stone credited) is none of these, its ground free at the next derivation.

**(3) VS4 — the trackers around it.**
* **Merging on part 0 only.** The merge test (V07 §3.5 step 4), and S4's router whenever a village stage calls it, read ways
  on ground part 0 only; of a raised way only its two feet may be merged onto.
* **Supports are obstacles.** A support whose `state` is absent or `ruined`, the raised way's ramps and stairs, and the
  under-deck strip of each `vault` span (impassable by §4.3 *Lattice and costs*, but one §2.7's laws read `open`,
  law 1 (8)), each grown by `raised.supportClearM` (1 m), is an obstacle, looked up in a uniform grid index
  of those obstacles (cell 10 m). When a step would enter one, the heading turns by `raised.turnStepCdeg` (15°) steps —
  first to the side nearer the tracker's target, else to the side of higher density, alternating sides — up to
  `raised.turnMaxCdeg` (60°) either way; failing that the tracker goes to F-V-TRACK's first rung.
* **Under a span.** A tracker crosses the under-deck strip only where §4.3 *Lattice and costs* admits a part-0 way —
  under an `open` span whose clear width between the standing supports' rings is at least the way's width +
  `raisedWays.structure.clearWidthM` and whose soffit meets §2.7's *The clearance* for the way's class, within ±
  `raisedWays.structure.squareDeg` of square to the deck, never along the strip. A step that would enter the strip
  elsewhere turns by the rule above. Where it crosses there is no junction, no crossing record, no gate and no stop; a
  `cleared` support's ring is open ground ((2); §4.3 *Lattice and costs*), and a span is crossed by this rule whatever its
  `state`.
* **The feet.** After the rounds and before the finish, at every derivation, each foot joins the nearest part-0 way vertex
  within `raised.endSnapM` (20 m) as a `T` junction (the vertex attracted onto the foot by §3.6's attraction); with no vertex
  in reach, a stub `track` is routed by S4's router (rung gate closed) from the foot to the nearest way, lineage
  `way:raised/<raised way>/foot<0|1>` (V07 §2.5), reported `W_RAMP_STUB`; failing that, F-V-FOOT (V07 §3.13). The joins and
  stubs are in VS4's L1 batch.
* **No frontage.** A raised way, its ramps included, carries no frontage run (VS6) and is never a way VS5's interior cut
  measures from (V07 §3.7 (1)).

**(4) VS3 — the palisade.** A palisade meets a raised way by §2.7's laws (their worked examples §2.7's crossing table).
Laid after it — VS3's trace at generation and at every derivation that re-lays it, or a palisade T3 `wall` draws — it is
*beneath* (§2.7's laws, law 1 (2)–(9); its worked example *beneath*): its band laid through each road deck's support
standing in it, so it stands whole where one goes (law 1 (3)); its line, band and wall strips by §2.7's laws, taking
only shapes they admit (law 1 (2)–(6), (9)–(11), read with their terms; law 2 (a), law 3; its worked example the
bent-group sentence), and its anchors only where §2.7's laws admit them (law 1, read with its terms; chiefly (4)–(6);
law 2; its worked example the fixed-place sentence); no arch vault in a `vault` span under it (law 1 (8); V04 §3.5.4
(d)); its top as §2.7's laws give it (law 1 (7): capped beneath a road deck's standing span, an aqueduct capping none);
no gate on the deck, and a gate VS4 makes placed where §2.7's laws admit it (law 1, read with its terms, chiefly (5);
law 2 (a), law 3) and `raised.supportClearM` off a support's ring, as VS4's tracker keeps (V07 §3.5a (3)), the track
following it. Each crossing of its line with a deck line is reported once, in VS3's `W_RAISED_CROSSING` (§5.4) for a
palisade VS3 lays and in `bend.wall.raisedCrossing`'s line for a T3 `wall` stroke (§2.7's laws, law 4; its worked
example *beneath*, *Reported*); with no lawful shape VS3 takes F-V-RAISED (V07 §3.13) and a T3 `wall` stroke is refused,
`refuse.raised.meeting` (§2.7's laws, law 2 (c)). A hand aqueduct drawn across the standing palisade — the palisade
placement-locked by the user or not, the drawing holding nothing (§2.7's laws, law 2; its worked example the lock
sentence; J147) — crosses it in the form the aqueduct's level there gives (law 1 (2): over, on a span clearing the
palisade's top, or merged, never into a shape-locked palisade, law 1 (10); its worked example *over the band*), and a
hand raised road comes down before it (law 1 (3), law 2 *Carried way*; its worked example *down before the wall*;
`bend.raised.wall`). A raised way carried down with the town (V07 §3.12) meets the palisade — the innermost standing
enceinte — as it met that enceinte (§2.7's laws, law 4; its worked example row W9). A raised way crossing the circuit
makes no gate (its deck passes over; law 1 (1)). The barrier closure never treats a raised way as a barrier.

**(5) VS5, VS6 and S10 — no house under the arches.** The **under-deck strip** — §4.6 S8's: the deck's ground projection
over its piers and spans, widened each side by `raisedWays.structure.stripMarginM` (V11 §3.24.2) — holds no toft yard part
and no building. S10's `toft` strategy lays a frontage slot whose toft
would meet the strip as a **close** by V07 §3.8's close rule (a paddock, orchard or garden, joined to or held by the nearest
built dwelling's household), never raced; VS6's capacity estimate subtracts those slots before F-V-SLOT's rungs; S10a's
quotas are allocated over the raceable slots only, so `N_v` stays exact. Crofts, closes (a reached close included) and
paddocks may pass beneath, the supports whose `state` is absent or `ruined` cut out as holes (§3.6's hole rule). The
perimeter is not changed by a raised way.

**(6) S12a and the hinterland unit.** Field, meadow, common, pasture and wood faces pass beneath, the supports whose
`state` is absent or `ruined` as holes (fields under arches are the historical sight); a furlong's strips run through; no
hedge, headland or field line follows a deck; V07 §3.9's outward claim and suitability ignore the deck.

**(7) The spans.** V04's arch-vault source is registered at every village rung (V04 §3.5.4 (d): arch vaults follow their
raised way at every rung; V07 §3.16 (1)); the span rule (§2.7, item 244) decides each span, and its `country` reason keeps a
span over hinterland faces — field, meadow, common, pasture or wood — open at every rung (J-C4). Inside the perimeter the
strip holds no plot, so a vault there is `storage` by V04's chamber row and holds an institution only by declaration. The
street-vault and bridge-vault sources keep their TOWN gate.

**(8) An aqueduct at a village.** Its terminal is a fountain `Pin` or a basin, as its declaration says (a basin by default;
V01 §3.17.8's terminal form); a cistern terminal comes only by declaration (V04 §3.5.4 (e)). VS8's well coverage (V07 §3.10)
counts each delivery point of an aqueduct whose channel is unbroken as a well, so no well is sited within
`pins.wellWithinM` (120 m) of one. When a span is ruined or cleared in the engine's decline (V06 §3.19.2), the channel is
broken, its points stop counting, and the coverage rule sites wells at the next derivation or epoch.

**(9) VS8 and names.** A raised way is never an end anchor: `crossing` reads part-0 bridges and fords only (as V01 §3.4.2 (a)
reads bridgeheads). The name's descriptive tags (V07 §3.10) and the plate's water qualifier (V07 §5.3) read part-0 crossings
only; a raised way's own label is the base's way label and V07 §5.3's landmark word.

**(10) Adding and removing are local** (V07 §4.3's rows).
* **Adding** (T4 `road` with `raised`, or the aqueduct class): the declaration's commit joins its feet to ground vertices by
  the base's rule, and VS4 re-joins them at every later derivation. The dry run re-races the blocks whose raceable slots the
  strip removes — each keeping its recorded quota; a block that can no longer hold its quota passes the shortfall to its
  neighbouring blocks (those sharing a frontage way with it) by largest remainder on their free slots' density, failing that
  F-V-SLOT's rungs — so `N_v` stays exact; it re-cuts the hinterland faces beneath with the support holes, and shows the
  count badge (item 101 R14): "the arches pass over 6 tofts; 4 houses move within their blocks".
* **Removal** is V09's delete of a declared way (the declaration's inverse) or, for a carried generated way, V06 §3.19.3's
  suppression (its reason key in the log), the dry run saying "the town will not rebuild this aqueduct; undo brings it
  back". The strip's slots return to the race in their blocks, the faces beneath are re-cut, and V04's vaults under it go in
  the same commit (V04 §3.5.4 (d)).

**(11) Order and determinism.** Every rule above is draw-free — the turns, joins, strip, holes and coverage are pure
functions of `raised` and the recorded inputs — so with no raised part on the map every village stage's output is
byte-identical to the build without this section (T-V7-46, T-V7-52), and with one it is the same on every engine.
=== END ===

=== REPLACE ### 3.11 The SettlementForge small-settlement dossiers — what the village product accepts, and how ===
### 3.11 The SettlementForge small-settlement dossiers — what the village product accepts, and how

**Routing.** The village package registers its `ProductDecl` (V07 §2.1; range `[1, 1 500)`), which the one port consults
through `LadderRouter` (§1.1; item 202): a dossier whose population lies in that range — every SettlementForge thorp (8–60),
hamlet (61–400) and village (401–900) and every town from 901 to 1 499 (the mapping's population census,
`research/sf/mapping.md`: 70 of 70 small dossiers and 5 of 38 towns in the surveyed 155) — is created on the village rows,
and the port stops refusing it. The rung follows the population (DR23); the dossier's own tier word titles the map (§9.5): a
1 105-person SettlementForge town is drawn by the village product on the VILLAGE rung and titled a town.

**What a small dossier holds** (`research/sf/dossier-outputs.md` §3.4, §6): one population integer; a tier word; 7–42
institution records, one of them a housing record with a count range (4–16, 17–80 or 80–180 dwellings); a government name
(an elder or household council, a feudal stewardship, an elected reeve); a terrain word, an access word, deposit keys; a
wall record in 6–8 of 20 dossiers per tier (`hasWalls` and `hasGates` together); 0–2 quarters with fixed location phrases
(Religious Quarter, Alehouse & Common, Fishing Landing, Woodcutters' Ground, Roadside Shrine; the small towns' Market
Quarter); 0–4 landmark strings; culture, wealth and power records; no port institution below the town tier; no coordinate of
anything. Every gap is derived by our rules (items 20 (h), 22).

**The derivation rows at village rungs** (§7.7's DR table read with the village's values; only what differs from the base's
rows is stated; the row sets are V08 §2.6's):
* **DR1 site.** `plains` → the water draw with the coast, island and estuary weights 0; `riverside` → a brook, stream or
  river by the water row's flowing weights (renormalised), course-first (V07 §3.2 (2)); `coastal` → a coast; `hills` → the
  `hilly` relief row; `mountain` → `mountainous` and a pass when `defended_pass` is listed; `forest` → the forest toggle,
  woods × 2 in V07 §3.9's claim and `forest_strip` and `infield_outfield` × 2; `desert` → the arid row: S0's
  water weights re-weighted by V07 §3.1 (1) (each type at its class's arid chance — a brook, stream, river, pond or coast all
  stay possible) and the oasis exactly when `oasis_water` is listed (DR40; V08 §2.6's `site` row). A bridge-implying record
  (`Toll bridge`) applies V08 §2.6b (3)'s rule at the village rung (V07 §3.1 (1)). `site.culture` → `cultureForms` (V07 §2.2)
  and the longhouse factor.
* **DR2 walls.** A wall record → the palisade stage runs and its chance draw is skipped; its kind from the record's words:
  `Palisade` alone → `palisade`; "Palisade or earthworks" (the small dossiers' other wall record) leaves the choice open, so
  it is drawn from `palisade.kinds` restricted to `palisade` and `earthwork` and renormalised, on `blueprint.features`,
  recorded in `autoResolved`; a record naming a bank and ditch → `earthwork`; a record naming stone, "Town walls" or "City
  walls and gates" (a small town's greater ladder tiers, V07 §2.4's third table) → `inner`. No wall record → no palisade
  (walls exactly when the dossier lists one, DR2's bar). The palisade's generation-time condition is §7.7's DR41
  (the dossier's `readiness` label and wealth; V07 §3.4 (8)). **The waterfront** (item 106 (d) at village rungs) is `open`
  whatever the threats: a village's palisade never fences its water (V07 §3.4 step 5); a **sea threat** — any key of
  `PortValues.threats` (V08's `threats` row: `naval`, `hostileSeaPartner`, `seaMonster`; `exposedPort` never fires below
  20 000 people) — raises the `v.watchtower` row's chance to 1 and sites it at the wharf or chief landing instead of a gate —
  a lookout, not a sea wall (J-V7.28) — and no harbour-mouth chain is built (a village has no harbour basin). The access word
  → the road topology: `road` → `through`; `crossroads` → `crossroads`; `river` → `through` along the river with a landing
  (and a wharf when the water is navigable); `port` → `through` with a wharf; `isolated` → `isolated`; `none` → `dead_end`;
  `mountain_pass` → `through` along the pass. An unwalled village's "gates" are its road entries (V08 §2.6's `access` row).
* **DR3 partners.** A `road` partner's bearing is a through road's or neighbour road's entry bearing (V07 §3.5 seeding 1, 7).
* **DR5 districts → ends.** One district. Each quarter claims an **end** by §7.7 item 16's naming claim, anchored as its
  phrase says: Religious Quarter → the church end; Alehouse & Common ("Village centre") → the green end with the alehouse on
  the green; Fishing Landing ("At the water's edge") → the wharf end with the `v.landing`; Woodcutters' Ground ("At the
  forest edge") → an end at the wood edge with the `v.wood_yard`; Roadside Shrine ("At the settlement edge") → a shrine at
  the perimeter on a road, and its name on that end when houses stand there; Market Quarter ("Central") → the open space's
  end, which carries the market; Noxious Trades Quarter → the downstream end with the tannery; Government Quarter → the
  manor's or reeve's end; Artisan Quarter → the smithy's end; Waterfront District → the wharf end; Shadows District → the
  lowest-value end; Mages' Quarter → an end apart (`far` from the heart); **Wealthy Residential** ("High ground, good
  views") → a `claim` end on the plots of highest mean prosperity (pass 1), on the high ground, its band bias applied to that
  end's plots only, never to the one district (a one-district village would otherwise shift its whole wealth); **Common
  Residential** ("Spread throughout") → no end and no bias (the village is its common residence) (J-V7.59). A claim with no
  anchor makes a `claim` anchor at the claimed class's place (V07 §3.10). **The Religious Quarter's east phrase** ("Eastern
  district (traditional)"), the one compass statement a small dossier makes: the parish church's siting gains the base's soft
  east row at its low weight (§7.7 item 16's quarter row, `tables/dossier/quarters`), so the church end tends east of the
  heart — a placeholder the owner may drop (J80 Q5), with which T-V7-13's east clause lapses.
* **DR6 wealth.** `wealth.label` → `intent.wealthLevel` (V08's `wealth` row) shifts `bandShares` as §4.2 S2 shifts the
  base's; the bar (the population-weighted mean band within one band of the label's) holds at village rungs. A band moves a
  dwelling only along its capped row, and the manor count never rises with wealth (item 115; V07 §3.8's ceiling).
* **DR7 households** (J-V7.55). `H₀ = round(P ÷ meanSize)`; with the housing record's range `[min, max]`:
  1. **Too few households** (`H₀ < min`): `H = min(min, max(1, ⌊P ÷ household.minSize⌋))` — the mean household size falls to
     `P ÷ H`, never below `household.minSize` (1.5 persons) — and `N = min`, one household a dwelling; when `H < min` the
     `min − H` surplus dwellings are built **vacant** and reported (`W_VACANT_TO_RANGE`; a village in decline is the
     historical reading). A 10-person thorp with the thorp record's range 4–16: `H₀ = 2`, `H = 4`, `N = 4`, sizes 3, 3, 2, 2.
  2. **Otherwise** `H = H₀` and `N_raw = Σ_b round(H_b ÷ (1 + share2_b))`. If `N_raw > max`, the doubling is re-solved band by
     band from the poorest up, at most two households a dwelling, only until `N = max`; if even full doubling leaves
     `⌈H ÷ 2⌉ > max`, the household size rises instead (`H = 2 · max`), reported. If `N_raw < min`, the doubling is undone
     band by band from the richest doubling band down until `N = min` (reachable, since `H ≥ min`).
  3. **The members sum to `P` exactly**: each household gets `⌊P ÷ H⌋` persons and the remainder goes one each to the
     households in address order (largest remainder over equal shares).
  `N = N_v + N_o` (V07 §3.2 (3)) — the outlying farmsteads count as dwellings of the settlement — so the residential building
  count lies inside the record's range (DR7's bar) and every household is housed once.
* **DR9 and DR24 institutions → classes** (J-V7.56). DR24's class rule (item 12; V11's catalogue rows) gives each record's
  class or pseudo-class; at a village rung it resolves in this order, the first that applies deciding:
  1. **a pseudo-class** goes to its reader and builds nothing of its own (V11 §3.11): `@office` binds to its seat's building —
     at a village rung the `villageSeat` member's, a religious office the parish church's (V07 §3.2 (3)); `@seat` to the
     government row's `villageSeat` (V11 §3.21.1); `@pin:<kind>` to VS8's pins, forcing its pin where none stands (V07
     §3.10); `@landuse:<kind>` to V07 §3.9's claim; `@housing` to DR7; `@wall` to DR2; `@layer:*` to the layer toggles;
     `@none` to the gazetteer only; `@absent:<class>[+<class>]` to S2 — each named class's `min` and per-capita demand 0
     unless another record names one, and at a village rung each named class read through its `villageForm` (V11 §3.22):
     `@absent:church` (`access_to_parish_church`, tiers T and H) zeroes `v.parish_church` — its presence entries and its
     members — and with it the classes keyed on a parish church, `v.parsonage` (its `×1 v.parish_church`) and `v.tithe_barn`
     (its `with v.parish_church`), while `v.chapel`'s `without v.parish_church` entry stands (a chapel of ease served a
     parish whose church was a neighbour's); `@absent:watermill+windmill` zeroes `v.watermill` and `v.windmill` (J-V7.103) —
     never to the fallback, so a `priest_resident` binds to the parish church and a `village_musician` stays a gazetteer
     entry;
  2. **a class with a `villageForm`** (V11 §3.22) is substituted by the `v.` class that plays it;
  3. **a class with its own row** plays itself — allowed at any rung once a dossier names it (a `pawnshop`, a
     `smugglers_store`);
  4. **only a kind that fell to V11's `generic-<family>` class** takes the **tag fallback** (our rows); the port's one
     `unmapped_kind` note names the class the fallback gives (V08 §4.6), and no second report is written: `religious` →
     `v.parish_church` from 400 people, else `v.chapel`; `market` → the open space's market (V07 §3.6 (4)); `lodging` →
     `v.inn` on a through road, else `v.alehouse`; `food` with a keyword `brewer`, `brewery` (family `food-works`), `tavern` or
     `alehouse` (family `lodging`) in the record's name (a drink) → `v.alehouse` (any other `food` record goes on down this
     list); `metalwork` → `v.smithy`; a keyword of family `food` with the key `mill` in the name → `v.watermill`, else
     `v.windmill`; `law_enforcement` or `defense` → `v.watchtower`; `civic` or `legal` → `v.reeve_house`; `healing` → V11's
     `healer` class, playing itself on a toft slot (its `dwelling-row` template read as V07 §2.4's dwelling plot); `leather`
     with `industry` → `v.tannery`; `port`, or a keyword of family `port` in the name → `v.landing`; a keyword of family
     `timber-yard` in the name → `v.wood_yard`; a keyword of family `industry` with the key `kiln` in the name → `v.potter`;
     else the generic class itself. Every keyword is a row of V11 §3.13.2's keyword table (`dossier.keywords`), matched whole
     on the case-folded name as that table states, so the fallback reads one table (J-V7.106).
  **The burial records** (J-V7.57): a `cemetery`-class record (`burial_ground` at tiers T and H, `graveyard` at V; V11's
  rows) is seated as the parish church's **churchyard** when a church stands, its yard part enlarged to V11 §3.6.1's
  `burial-ground` family plot area at the church plot's band (the churchyard part grown by S10 (7)'s join law over the
  adjacent slots until it holds that area, the church's own template unchanged; J-V7.100); else as its own `cemetery` plot at
  the settlement's edge on a road (S10b; `use: 'cemetery'`), with a `v.chapel` only where a religious record also asks for
  one. The seat carries the record's binding key and is a burial face (V07 §2.4) — the face the town's catacomb rule reads
  after a hand-off up (V07 §3.12 step 6; J111: catacombs lie only under cemeteries). A `parish_burial_grounds` record (tier W;
  every small SettlementForge town carries one) reads V11 §3.12's COUNT: one member per standing `v.parish_church`'s
  `churchyard` part, each bound `#k` and a burial face, none enlarged; a `cemetery` plot at the settlement's edge only where
  no church stands (J-V7.107).
  **The external mill**: `access_to_external_mill` (`@absent:watermill+windmill`, V11 §3.11) suppresses S2's mill demand —
  neither a watermill nor a windmill — and makes milling an import through the entry store (below), reported (J-V7.58).
  A count range clamps the class's count; a singular record is placed once (DR9's bars). The housing record assigns nothing
  (DR7).
* **DR11 seats.** `Feudal Stewardship` (seigneurial) → the `v.manor_house` as the seat; an elder, household or free elder
  council or an elected reeve (chartered commune; V08 §2.6's `government` row set) → the `v.reeve_house` and the moot place;
  ecclesiastical → the `v.parsonage` beside the church — the `@seat` binding being V11 §3.21.1's `GovernmentRow.villageSeat`.
  A dossier's government (or an `@seat` record) forces its `villageSeat` class present with at least one member (V07 §2.4's
  forced seats) at every village rung, whatever its presence entries and whatever an `@absent:` record zeroes (J-V7.104,
  J-V7.113) — so a crown village has its manor house and a merchant-oligarchy village its reeve's house, and a
  `lord_s_reeve` or `village_headman` record always finds its seat; a forced manor is "specified" under item 115's ceiling
  (V07 §3.8).
* **DR16–DR18.** The hidden share is 0 and a clandestine record takes the front mode (PART III). The underground at village
  rungs: caverns and ruins by the site (item 109 (j) (1); V07 §3.16) with access by dig, well, opening, a dug passage or a
  mine breach, and scattered dwellings only after access; no sewer network, undercity, catacomb, quarry, vaults or buried
  town (their TOWN gates, item 109 (j) (1), (k) (1)) — save a shrunk town's standing systems in maintenance mode (V07 §3.12)
  and a dossier catacomb fact, which is V04's charnel vault (V07 §2.4); an author's dug passage (item 66) as everywhere;
  informal clusters appear only under a migration condition (tents at the perimeter; V08 §2.6's `conditions` row set), the
  squalid band otherwise living in hovels at the green's or common's edge (V07 §3.12's encroachment).
* **DR19 deposits.** V08's `deposits` rows open their land uses in V07 §3.9's claim; `river_mills` forces a `v.watermill`
  when a mill seat exists; `grazing_land` doubles the commons' share; `managed_forest` doubles the coppice. The mining
  deposits (iron, precious metals, gemstones, coal, copper) raise the cavern chance by `cavern.mineBoost` and make a mining
  class's working a breach candidate (V07 §3.16 (4)); `ancient_ruins`, `magical_node` and the ley-line income rows are ruin
  sources (V07 §3.16 (1); V08's ruin and magic rows).
* **Landmark strings** (V08's `landmarks` row, the village-product rows): `Alehouse` → the alehouse use's name; `Common well`
  → the green's well pin; `Net mending post` → a `net_rack` yard part of the landing; `Drying racks` → `drying_rack` yard parts
  of the landing; `Beaching ground` → the named beach (V07 §2.3); `Timber stacks` → a `timber_stack` yard part of the wood
  yard; `Tool shed` → a named outbuilding in a farmstead; `Charcoal pit` → the charcoal pit's name.
* **DR9 with item 108 — ladder records.** A record whose name carries a count range, or a ladder qualifier ("(multiple)",
  "(guild)", "(district)", "(established)"), or whose kind is a greater tier of a ladder pair, is read by its step type (V11's
  step-type table; V08 parses the qualifier): COUNT → that many members of the member class keyed `#k`, their count S2's
  per-capita rows at `P` clamped into the range (V07 §2.4's third table for an unnumbered one), spaced by the class's
  same-kind row; QUARTER → an end claimed and owning its members (V07 §3.10); GUILD → one `guildhall` plus the trade's
  members, its hall bound into a guild COUNT record of its `categories` family by V08 §3.5.1 (c) (J-V8.83), never a further
  hall; a GUILD record of another family, or with no COUNT record of its family in the dossier, keeps its own hall; SIZE → one
  larger building by the class's template; REPLACEMENT → the greater only. Where a greater and a lesser of one ladder both
  arrive (a custom kind, an event adding the lesser, a stale record) the lesser becomes a member of the greater's collective,
  and the roster's own per-capita members of that class **are** the record's members (item 108 (c)): no double count. A
  small-town dossier's count-range records (8–10 in a town's records, `research/sf/dossier-outputs.md` §3.4) are the common
  case at the VILLAGE rung's top. A `town_watch` record's member (V11's `guard_post`, played by `v.watchtower` through its
  village form) carries the assignment's own soft row (`Assignment.criteria`, the base's `PlacementCriteria`; id `pc/…`, as
  DR2's sea-threat row): `near` → `open:green`, `open:square` 80 soft 0.8 — the watch's yard by the green.
* **Supply chains (item 105 (i)).** The dossier's `activeChains[]` (0–4 in a thorp, 2–9 in a hamlet, 6–13 in a village,
  `research/sf/dossier-outputs.md` §3.4) become links between the bound members through V08's chain row: each processor name
  resolves by kind family to the village class that plays it (DR24 with `villageForm`); a chain whose processor is absent
  from the map binds nothing and is reported, never invents a building (the dossier is the truth of what exists; DR9 places
  what it lists); an `impaired` or `vulnerable` chain's links weaken by V11 §3.7.4's `chainStatus` weights, keyed by V08's
  neutral status; an `entrepot` chain's ends are item 104 (b)'s import and export pulls, served by the **entry store**.
* **The entry store** (imports and exports at village scale). A village has no warehouse district: the store is a `store` use
  (§2.7's `Use`, assigned by S10b, never a new building) on the plot that faces the partner — the inn on the through road's
  entry at the partner's bearing (DR3) when there is one (the carriers' inn); else the wharf's or chief landing's `v.landing`
  for water trade; else the farmstead nearest that entry, whose barn holds it (J-V7.29). Its pulls are item 104 (b)'s and 105
  (i)'s; the clerk names it ("the carriers' store at the inn").
* **Item 104 at village rungs.** A custom institution resolves its profile by item 104's order, its archetype read through V11
  §3.13.2's `village` cells (V07 §2.4); an **active custom chain** is placed as one connected thing (item 104 (h)) by V11
  §3.13.4's rules (`siting.custom`), read through the village's context (item 576 (b)): its resource at its terrain feature in
  the hinterland (`resourceSite`; V07 §3.9's claim reserves the face), its first processor by the resource or on the road
  toward it (`firstProcessor`, outside the perimeter when it emits a nuisance), its later processors each a step nearer the
  village's centre of trade and its final seller by it (`stepInward` and `finalSeller`, reading `dist.market`: the market's
  open space, else the first nucleus's, else the heart; J-V7.111); a compatible chain sits close at street scale
  (`compatible`, item 104 (h) (3) as revised by item 107) and names the end it stands in only when item 72's quarter-identity
  threshold is crossed there or the dossier or the author declares it (a chain is never assigned an end); an incompatible
  one stretches along its road; its imports and exports pass the entry store (`endpointStore`'s village reading).

**The absorb half at village rungs.** Every later dossier change is the base's absorb (§7.7, V08): an added institution is
placed first by `village.records` — a market, claim-sized or pin record by V07 §3.12's *Records at a village epoch*, at an
epoch in its `dossier` step and without one in the absorb's commit (item 202; J-V7.125, J-V7.128) — and otherwise by a
`dossier` request to S10b on the current map; a removed one closes its use and is then handed to `village.records`' `remove`
for the fair field's reservation and the pins it forced or bound (V07 §3.12 *Records at a village epoch*); a population
change moves the epoch's target (V07 §3.12); a new wall record builds a palisade by `drawWall` in its derived form (the VS3
construction over the current density and the barrier closure, gates where the ways cross it); a changed access word adds or
retires a through road's classification (never its geometry); an added or changed supply chain re-derives the links it names
(links are never stored, item 105 (a)); and a ladder step — a promotion or a demotion carried by the record's `promotedFrom` /
`demotedFrom` receipt — changes the members by item 108 (d)'s least disruption: an upgrade keeps the standing building as
member #1 and places the rest — save a REPLACEMENT whose greater is a new thing, placed by V07 §3.12 *Records at a village
epoch* item 4 (V08 §3.5.1 (d)); a demotion keeps the member nearest its demand and vacates the rest by fate (item 17).
**The palisade's REPLACEMENT** ("Palisade or earthworks" → "Town walls"): when at least `ladders.replaceShare` (80 %) of
the standing dwellings lie inside the palisade's enclosure, the wall is **rebuilt on the palisade's trace** — `setAttr`
of the enceinte's kind to `inner`, `material: 'stone'`, its full stretches taking the stone section and its light ones
the parapet (item 106 (c)), gates kept, every run `standing` and robust (a patched run rebuilt in stone) — where a
standing raised way crosses the trace, the run laid again in its new section, resolved by §2.7's laws, law 2, in its
order — (a) its line kept where its new band is lawful, re-traced locally where not, its gates kept, never moved for a
meeting (J148); (b) else the ground ways, plots and unlocked buildings that shape meets moved as law 2 (b) moves them;
(c) else, and wherever a kept gate would then stand where those laws bar one (law 1, read with its terms; chiefly (5)),
the REPLACEMENT waiting (`walls.waited`) — its worked example row W14 — the least disruptive reading, and the historical
one where a stone wall replaced a timber circuit on its line; otherwise the town wall is a new ring by the base's
later-ring rule, anchoring on the barriers and on the palisade (item 106 (f)), and the palisade is `supersededBy` the
new ring and decays by the persistence rows (J-V7.32). The `town_walls` record's key binds the rebuilt enceinte, else
the new ring, with the palisade's key as its alias — after a `promotedFrom` receipt the record's one key is re-pointed
to that enceinte and no alias is written (V08 §3.5.1 (d)); the superseded palisade keeps no binding.
=== END ===

=== REPLACE ### 3.13 Failure handling — the village ladders (never a whole-map retry, §5) ===
### 3.13 Failure handling — the village ladders (never a whole-map retry, §5)

VG retries a failed build on the next generator state without bound (`ref:VG 1.6.9 retry on the next state (code)`); we
never do. Every village stage's ladder is below; each rung is bounded, each outcome reported with its delivery tier (§5.4).

| class | detected at | ladder (in order) | test |
|---|---|---|---|
| F-V-HEART no heart candidate | VS1 | slope limit `heart.slopeMax` 0.1 → `heart.slopeRelaxed` 0.2 → any dry cell above the flood line → the driest cell of the frame's middle half, reported | T-V7-4 |
| F-V-DENS populated area below the demand's `A_s` | VS2 | `δ` × `fail.dialStep` (1.25) `fail.dialTries` (2) times → `reachShare` × `fail.reachStep` (1.25) → carry on; F-V-SLOT covers capacity | T-V7-5 |
| F-V-PAL fewer than 3 kept points (collinear points counting as fewer), or no nucleus inside | VS3 | `keepBelow` → 0 → a ring through the `fail.palRingPoints` (12) densest lattice points around the heart → the palisade omitted, reported (a dossier's wall: kept as a ring of `fail.palRingShare · R_s` (0.8) around the heart) | T-V7-6 |
| F-V-ANCHOR a walled stretch whose end finds no barrier to anchor on (item 106 (h)'s F-WALL at village kinds) | VS3 step 5 d | the stretch follows the pre-reach trace around the barrier's end until it meets another barrier → it closes the ring on the pre-reach trace (that run's reach undone) → the barrier closure off for this enceinte (VG's water cut), reported | T-V7-31 |
| F-V-RAISED a palisade line with no lawful crossing of a standing raised way, a fixed place with no point in reach that §2.7's laws admit, or a held building's widened strip or a shape-locked raised way's `vault`-use span's strip it cannot keep clear (§2.7's laws, law 2 (c), law 1 (9), (10); its worked examples (G3) and *beneath*) | VS3 | its rung alone, no other rung of this table running on it: the ring re-laid once with law 1's exclusions impassable and its search band widened to VS3's barrier reach (V07 §3.4 step 5 b), so that it may pass round the raised way (§2.7's laws, law 2 (c)) → the palisade omitted, reported (VS3's `W_RAISED_MEETING`, §5.4) | T-V7-48 |
| F-V-GATE a palisade with no gate | VS4 finish | a gate where the nearest road to the heart crosses the trace → a gate stub way from the nearest junction square to the trace (`placeGate`'s form, §7.1) | T-V7-6 |
| F-V-TRACK a tracker that meets itself, is stopped by water with no crossing, leaves an unfinished crossing, exceeds its step limit, or is still blocked by a raised way's obstacle or its under-deck strip after its turns (V07 §3.5a (3)) | VS4 step | retreat `branch.retreatSteps` (3) and re-steer along the contour vector → the nearest crossing site within `branch.crossingSearchShare` × `bridgeSnapM` → for a through road, the remainder routed by S4's router (§4.3) to its target; for others, stop and record a landing → reported | T-V7-7 |
| F-V-OPEN the open space meets water, the mill or leaves the palisade | VS4 seeding 2 | shrink × `openShape.shrink` (0.8) up to `openShape.shrinkTries` (3) times → the next densest populated point → no open space, reported (the market to a flanking square) | T-V7-8 |
| F-V-FAIR the fair field meets water, the mill reservation, a raised way's strip or support, or the frame's margin | VS5 (V07 §3.6 (4b)); at a village epoch `village.records` (a record) or step (m) (a roster member; V07 §3.12 (a)) | slid outward along its road one field length at a time, up to `R_s` → the other side of the road, slid likewise → the nearest dry hinterland face adjoining a road that holds its area → no reservation: the fair is held on the reservation that carries the market (the member bound to it), reported `W_FAIR_ON_GREEN` | T-V7-13 |
| F-V-SLOT fewer slots than dwellings and institutions | VS6's capacity check (rungs 1–3); S10a and S10b (rungs 4–5) | slot widths to the band minimum → track frontage at full weight → up to `fail.slotTopUp` (3) top-up road trackers from the densest perimeter junctions, grown inward, VS6's second L1 batch → the doubled-household share to the templates' `households.max` → the unhoused households reported, never dropped (§5.2 F-PLAN's rule) | T-V7-9 |
| F-V-MILL no mill seat | VS1 | the leat limit `mill.leatMaxM` 300 → `mill.leatFallbackM` 600 m → a `v.windmill` by its row → the milling imported, reported (the need propagation's substitution, §4.2 S2) | T-V7-10 |
| F-V-FOOT a raised way's foot with no part-0 way vertex within `raised.endSnapM` | VS4 (V07 §3.5a (3)) | a stub `track` routed by S4's router (rung gate closed) from the foot to the nearest way, reported `W_RAMP_STUB` → the foot left unjoined, reported `W_RAMP_UNJOINED` (the way still reached by its other foot); never a moved foot, never a raised part laid | T-V7-48 |
| F-V-TERRACE a platform wall between the door and the frontage whose drive or path cannot meet its grade inside the toft | S11 (V07 §3.8a (6)) | the ramp laid along the wall inside the toft yard → the platform's frontage edge dropped to the way's level (two levels, the wall moved back by the ramp's length) → a stair only, the drive omitted, reported `W_TERRACE_NO_CART`; never a gap in the wall, never a retry of the map | T-V7-47 |
| F-V-FIELD arable short of its demand | S12a | wood and pasture faces re-claimed by suitability → the import share raised and reported (§4.9's rule) | T-V7-11 |

Every other rung of this table re-lays the palisade by VS3, so by §2.7's laws as VS3's line meets it. Every base ladder
a reused stage has (F-RIVER, F-ROUTE, F-PLOT, F-SITING …) applies as in the base; the edges of every village mechanism
are V07 §3.17's.
=== END ===

=== REPLACE ## 4 Editing — declarations, events, locality, undo and the clerk's view ===
## 4 Editing — declarations, events, locality, undo and the clerk's view

Everything a village has is editable with item 101's twelve tools (§7.1's *The authoring toolkit* and its binding); the
village adds no thirteenth tool — two parameters and one sugar expansion (item 357) — and every declaration is held
(declared means held, §7.2) until its author changes it, bent to the nearest lawful form by its dry run otherwise (item 101
R2): no village tool refuses a declaration but where §7.1's dry-run outcomes refuse one (a meeting of a wall-like
structure and a raised way that §2.7's laws give no lawful shape among them, law 2 (c)).

### 4.1 The twelve tools on a village

| tool | what it does on a village | events (§7.1) | derived by |
|---|---|---|---|
| T1 `intend` | the site card carries the village's form (grown, street, green, nucleated, polyfocal, row, dispersed), water (an oasis on an arid site included, item 111), palisade, field system, organic roads, orchards, the forest and the field factor; the size is the population; the density and wealth sliders; the history option ("once a city, now a village", §4.2 S0; V09), which replays a village over a former settlement (V07 §3.12a) | the recipe's intent at creation; afterwards Adjust / Re-derive on `VillageRequest` (V07 §2.7); a form edit that makes the held `forest_strip` unlawful is bent by its dry run to `open_field` with a one-line note (item 101 R2) | S0's resolution (V07 §3.1) |
| T2 `ground` | reshape the ground; draw a brook or a pond; add or remove an oasis (the lake's point-and-level form with its spring flag, item 111 (a)); move the course-first river's knots; **draw a terrace** (item 110 (a)): the faces under the stroke are levelled and walled along its edge — a field terrace or lynchet included (J-V7.87); retype land by the land-use chip | `setField(terrain)`, `warp`, `drawWater` (its `spring`), `moveCourseKnot` (the course's knots are `WaterBody.controls`, V07 §3.2 (2)); the terrace stroke (item 110 (a)'s T2 form), its edge a drawn `RetainingWall` where the step exceeds `terrace.stepMinCm`, held; `convert` `retypeLand` (item 209) | S1's operators (§7.3); S10–S11's levelling inside the perimeter, the hinterland unit outside |
| T3 `wall` | draw a palisade, a bank and ditch or a stone circuit; add a gate; let a river, cliff or marsh close it; repair a run robust or with a patch (item 114 (f)); draw a **retaining wall** (item 110 (a)) — held, never an enclosure | `drawWall` with `kind` ∈ `palisade`, `earthwork`, `inner`, or `retaining` (a `RetainingWall`, its high side picked by the drawing direction or the ground, the plots it crosses re-levelled; a way it crosses becomes a stair or ramp by V07 §3.8a (7)); its points form derives the village trace (VS3's smoothing and pull between the points, closing when the ends meet); a stretch's end snaps to a barrier within the reach and the barrier arcs show as part of the circuit (item 106 (g), V09's snapping); `placeGate`; `repairWall` with its material (robust, or one of the kind's patch rows, V07 §3.4 (8); V09's panel) | VS3's construction with steps 5–6; S7 |
| T4 `road` | draw a road, lane or track between points — or **walk** one from a point in a direction, as the village's own roads grew; draw a **raised way** or an **aqueduct** (item 110 (b): the user may add one at any rung); retire, efface or reopen a way by its way chip | `drawWay` with its class and the `walk` parameter (§7.1; item 357; V07 §4.2); `raised: true`, or the aqueduct class, **by points only** — `walk` with `raised` is bent by its dry run to the points form (a walker follows the ground), with a one-line note (item 101 R2); the dry run shows the count badge (V07 §3.5a (10)); `convert` `retireWay`, `effaceWay`, `reopenWay` (item 268), its dry run keeping every live plot's access — a stretch that is some plot's only access stays in use with a one-line note | S4's router (points) or VS4's tracker (walk); a raised way by the base's raised-part commit, the village stages around it (V07 §3.5a) |
| T5 `quarter` | at a village rung: **declare an end** by lassoing its houses (item 101 R4: areas are lassos), with its kind and name; the anchor defaults to the most significant entity inside (the church, the manor, the mill, the open space, else the lasso's centroid) or is picked (a point, a building or a pin) | the sugar `quarter` expands at village rungs to `declareEnd` with its `boundary` (§7.1; item 357); the dry run shows the count badge | VS8 (the lassoed plots join the declared end; the rest their nearest anchor; declared ends held, never merged or capped) |
| T6 `place` | place the village's heart, the church, the mill, the manor, a well, the green's centrepiece; assign a use; place on a **deck face** (a pier head or a widened bridge): a store, a net shed, a boat shed, a toll house or a chapel (V07 §3.10a (4)); place or reshape a building grander than the rung's ceiling (item 115 (c): honoured, never refused; the clerk notes it exceeds the tier's usual) | `placeAt` (point form); the heart is `placeAt` of `VillagePlan.heart` (`heartSource: 'edit'`); `assign`, `build`; on a deck face, S10b's request path with V11's `deckOk` in the village reading (a dwelling there is bent to the nearest toft with a note); a works-and-shop split by `assign` with the new use's `branchOf` naming the works' use (item 310), held and merged back by its inverse | VS1 (the heart); S10b's solver (a class; a mill bent to the nearest mill seat, V07 §3.2 (7)) |
| T7 `roster` | list what the village must hold ("a church, two alehouses, a smithy by the ford") | `roster`; with a dossier the author may only place (§7.1) | S10b claims-first |
| T8 `fill` | brush "more houses here" or "fewer"; draw a green; brush the class mix | `setField(density)` on the village density field; `drawGreen` with `kind: 'green'` (a green `Reservation` and its `Greenery`) | S10a quotas and the slot race in the touched blocks (V07 §4.3) |
| T9 `shape` | split or join tofts; build on a close; move a house; set a croft's depth; change a furlong's strips; widen a deck | `split`, `join`, `build` (a close becomes a toft), `moveFootprint`, `setAttr` (yard parts, `furrowAxisCdeg`, `rotation.slot`, a deck's width, a generated wall's material), `drawFootprint` | S10–S11 in the plot; the hinterland unit in the furlong |
| T10 `hold` | lock a toft, the green or the church; revert; regenerate the village (keep) or re-roll a block's houses, the roads or the fields; **delete** anything, a raised way included (item 110 (b): "a removal is an edit that holds through regeneration") | `lock`, `pin`, `revert`, `regenerate`; New random on a block re-races its slots, on the plan redraws the `auto` village draws; `rerollLayer('village.track')` re-grows the roads; `delete` — a declared raised way by its declaration's inverse, a carried generated one by V06 §3.19.3's suppression (its reason key in the log), the dry run saying "the town will not rebuild this aqueduct; undo brings it back" (V09 §4.3's gesture) | as scoped (V07 §4.3); a raised way's removal by V07 §3.5a (10) |
| T11 `name` | name the village, an end, a green, a lane, a great field, a common, a wood | `setAttr(name)` on `VillageEnd`, `VillageField`, the reservation, the way; `moveLabel`, `hideLabel`, `group` | S13 |
| T12 `dress` | the painterly or the ink look; show fields, relief, the spotlight, the shade map, the underground (with the unexcavated voids, V09's toggle), the palisade's whole circuit (`LayerSpec.showCircuit`, item 413); re-roll the woods' trees (**New trees**) | `setStyle`, `setLayer`, `paintGround`; `rerollLayer('render.instances')` (New trees: town-wide and display only — the trees, hedgerows and render-time field strips re-drawn, nothing else moving; §6.1, §7.1; V09 §4.5) | V07 §5 |

The underground under a village — a cavern or ruin drawn or pinned, an access dug or sealed, a void excavated — is edited with
V04's tools and events (`drawTunnel`, `drawChamber` with system `ruin` or `cavern`, `addUndergroundAccess`, the closure states;
V04 §4), their lifecycle rows and undo V04's; a church's crypt is its building's basement, edited by V02's and V03's events.
**The count badge** (item 101 R14): the dry runs of `declareEnd`, `drawGreen`, the density brush, a raised way's add and
removal, a retaining wall and a terrace stroke show the plots, households and buildings they touch before commit. The supply
links (item 105 (j)) are pinned, moved or cut by the base's link events through V09's link view, stored map-side and never
written to the dossier; at village rungs they add nothing: a cut link between the bakehouse and the mill makes the
bakehouse's flour an import. **Item 110's edits at village rungs**: a drawn retaining wall, a terrace stroke, a declared raised
way and a placed deck plot are declarations, held through Regenerate (keep) until their author changes them; a generated wall
(V07 §3.8a) is edited by `setAttr` on its material or by drawing over it (the drawn wall wins and holds); a deck is widened by
`setAttr` of its width, which makes its face buildable (V07 §3.10a (2)).

### 4.2 The new event forms

The forms are §7.1's (item 357): `declareEnd { anchor?, boundary?, kind, name? }` and `drawWay`'s optional `walk { headingCdeg,
class: 'road'|'track', maxLengthM? }`; `retypeLand { landUse, to, crop?, rotation? }` is V06's `EvolveOp` member, one op
for both volumes (item 209). Their village semantics:
* **`declareEnd`** — the sugar `quarter` at a village rung expands to it; it creates a declared `VillageEnd` keyed by this
  event's address, held; an absent `anchor` is the most significant entity inside the boundary; the lasso's plots join it
  whatever their nearest anchor (V07 §3.10).
* **`walk`** — one tracker from `points[0]` by VS4's step rules (V07 §3.5), its branches off; the dry run resolves the laid
  spine into `points`, and the stored spine is the recorded input (never re-walked). `walk` and item 110 (b)'s `raised` flag
  are exclusive: a `drawWay` carrying both is bent by its dry run to the points form (the walked spine resolved into
  `points`, the walk dropped) with a one-line note — a walker follows the ground and a deck does not (item 101 R2).
* **`setAttr`** reaches the village's recorded inputs — `VillagePlan.form`, `.roads`, `.nuclei`, `.character.*` (each a
  recorded input, V07 §2.3; a changed `form` or `roads` sets its source to `edit`), `VillageRequest.*` (T1's Adjust events),
  `Reservation.kind` between `green` and `plaza`, `Enceinte.kind` among the village kinds, `VillageField.name` and `.kind`,
  `VillageEnd.name` — each with the base's dry run, fate report and inverse (§7.1, §7.4).

### 4.3 Locality — what each village edit re-derives

| edit | re-derives from | effective scope (§7.3) | fate report says |
|---|---|---|---|
| heart moved (`placeAt` of the heart), form or road topology changed, nuclei edited | VS1 | the settlement: VS1–VS8 and the S7–S11 stages on the district; the hinterland only on faces the perimeter's move touches; locked and pinned entities held, declared entities re-placed by their declarations | a coarse edit: "the village is re-laid around the new heart; N houses move" |
| character (`branchSpacingM`, widths, `turn`) | VS4 | the network and everything after it in the district | as above |
| density brush (T8 `fill`) | S10a | the blocks the stroke touches: their quotas re-allocated among themselves (their sum kept), their slots re-raced | "N houses in the brushed blocks" |
| `drawGreen` | VS4's open-space step for the green only, then VS6–S11 | the blocks the green overlaps or fronts: frontage re-laid around it; quotas among them | "the green takes N tofts; they move within the same blocks" |
| `drawWall` (village kinds) | VS3's form, then S7 | the wall's band: plots and footprints in the band cleared and re-cut (S10 on the touched blocks); gates where ways cross | "N plots in the wall's band" |
| `repairWall` on a palisade run (item 114) | the run's condition and material | the run alone | "the gap is closed with hurdles" / "rebuilt in timber" |
| `drawWay` (points or walk) | VS6 on the faces it splits | the split blocks: runs, slots and quotas re-derived there | "N plots re-cut beside the new road" |
| `declareEnd` | VS8 | the ends only: the lassoed plots join the declared end, the others re-assigned to anchors; labels | "N plots, H households join the new end" (the count badge) |
| a class placed or assigned | S10b's request path | the target plot and the relocated occupants (§4.7) | the base's |
| a market hall's claim or the fair field moved (T6 `place`'s `placeAt` of its member) | VS4's claim step (V07 §3.6 (4a)) along the rim, or VS5's fair step (V07 §3.6 (4b)) at the point | the open space's remainder and the hall's plot; or the fair field's face and the commons around it (S12a on those faces) | "the hall moves along the green's edge" / "the fair field moves; N ha of common re-laid" |
| field system changed (T1 Adjust) | S12a | the hinterland unit's faces; the outlying farmsteads re-sited; nothing inside the perimeter | "the fields are re-laid; N farmsteads move" |
| an oasis added or removed (T2 `ground`) | S1's water and the fields it feeds: VS2 (the water pull), then as a density stroke's scope inside the perimeter, S12a outside | the blocks whose density the pull moves re-raced with their quotas kept; the gardens and grove re-laid | "N houses move toward the new water" |
| `retypeLand`, a furlong's `rotation.slot`, `furrowAxisCdeg` | the hinterland unit on that face | the face | the base's |
| `retireWay`, `effaceWay`, `reopenWay` | the network's readers of that way | the way alone: no live plot takes its access from a hollow way, so no frontage moves; a reopened way's runs are raced again only by regrowth | the base's |
| New random on a block | S10b's race in that block | that block | "N houses re-chosen in this block" |
| `rerollLayer('village.track')` | VS4 | as a character edit | as above |
| T3 `wall` `retaining` at a village | S10–S11 in the plots it crosses | those plots re-levelled and re-cut; a way it crosses gets its stair or ramp (V07 §3.8a (7)) | "N plots re-levelled beside the new wall" |
| T2 `ground` terrace stroke | S10–S11 inside the perimeter; the hinterland unit outside | the faces under the stroke re-levelled; their plots re-cut; the furlongs beneath re-cut | "N plots and M fields re-levelled" |
| T4 `road` raised way or aqueduct added | V07 §3.5a (10) | the blocks whose raceable slots the strip removes re-raced with their quotas kept (a shortfall passed to their neighbouring blocks), the faces beneath re-cut with the support holes, the feet joined; VS8's well coverage | the count badge: "the arches pass over N tofts; M houses move within their blocks" |
| a raised way removed (T10 `hold`'s delete or the suppression) | V07 §3.5a (10) | the strip's blocks re-raced, the faces beneath re-cut, V04's vaults under it removed in the same commit | "N slots return; the arches' vaults go with them" |
| a deck plot placed (T6 on a deck face) | S10b's request path on the deck face | the deck plot and its occupant | the base's |
| a deck widened (`setAttr` of its width) | S10 on the deck face | the deck's face made buildable; no dwelling | "the pier head can now hold a shed" |

The coarse edits are declared coarse by their dry run (§7.3's rule for a re-derivation from an early stage); everything else is
local by the recorded quotas and the lineage-keyed draws (V07 §3.14). A density stroke never moves a block quota outside its
stroke's blocks, so "more houses here" never empties another end.

### 4.4 Lifecycle of every village edit kind (§7.4's columns)

| edit kind | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `declareEnd` | the event (sugar `quarter` at a village rung) | VS8, labels, exports | log | held: its lasso's plots re-joined on every re-derivation; never merged or capped (V07 §3.10) | the event's inverse removes the end | the event's schema version; an event without `boundary` reads a point declaration |
| `drawWay` with `walk` | the event; its resolved spine stored | VS6 on the split faces | log (the spine, resolved) | never re-walked: the stored spine is the recorded input | inverse removes the way; faces re-joined | as `drawWay` |
| `retypeLand` (one lifecycle row with V06's, item 209) | `convert` (hand) or an epoch's op | S12b, the hinterland unit, render | log / the epoch record | kept | the conversion's undo record | new op kind, versioned |
| `retireWay`, `effaceWay`, `reopenWay` (a hand `convert`, or the epoch's ops at a village rung) | the event or the epoch's op | the network's readers (a hollow way read by none), V07 §5.1's `hollow_way` role, GeoJSON `hollow_ways` | log / the epoch record | kept | the conversion's undo record | new op kinds, versioned |
| `setAttr` on `VillagePlan`, `VillageRequest`, `VillageField`, `VillageEnd` | the event | as V07 §2.6's rows | log | the recorded value read on regenerate | inverse | as V07 §2.6 |
| village density stroke | `setField(density)` | S10a, the race | log (strokes) | strokes composited onto the recomputed raster (§7.2) | stroke inverse | as the base field |
| `drawGreen` (`kind: 'green'`) | the event | VS6–S11 | log | the drawn green held (declared) | inverse | as `drawGreen` |
| `drawWall` `retaining`; the T2 terrace stroke | the event | S10–S11's levelling, the hinterland unit, render, exports, the clerk | log | held (a drawn wall, a stroked terrace) | the event's inverse | absent in an older document: nothing |
| `repairWall` on a palisade run, with its material (item 114) | the event (T3 `wall`) | the run's condition and material: render (V07 §5.1), exports, the clerk | log | held: the run keeps its repaired state until an epoch's walls step or a later edit changes it | the event's inverse restores the run's condition and material | an older event without a material reads robust |
| `drawWay` with `raised` or the aqueduct class | the event | the stages of V07 §3.5a (VS3–VS6, S10, S12a, the hinterland unit, VS8), V04's arch-vault source | log | held; its feet re-joined at every derivation (V07 §3.5a (3)) | the event's inverse | absent: nothing |
| a raised way's removal (T10 `hold`'s delete; V06 §3.19.3's suppression) | the event | the declaration layer (`raised`), V06 §3.19's ledger from the first CITY epoch | log (the reason key for a generated way) | held through Regenerate (keep), every village epoch and both hand-offs (V07 §3.12) | the event's inverse restores the way and its vaults with their ids | absent: nothing |
| a deck plot placed; a deck widened | the event | S10b, V02 (`DeckContext`), render | log | held while its deck stands; falls with its deck (V07 §3.10a (6)) and is re-offered when the deck is rebuilt | the event's inverse | absent: nothing |
| a grand building placed or reshaped beyond the rung's ceiling (item 115 (c)) | the event (T6 `place`, T9 `shape`) | S10b, S11, V02's composition, the clerk | log | held (declared means held); never reshaped down by the ceiling | the event's inverse | absent: nothing |

### 4.5 The clerk's view

The clerk (V10, over §11.2's tool API) reads the same records a person sees: the `VillagePlan` (form, heart, character, the
sources), the ends, the fields, the palisade and the dossier's facts; it proposes with the twelve tools and its proposals are
dry runs shown as ghosts (J-A101.74). **Describe-to-map** on a village returns a skeleton — "a green village by a ford, the
church on the rise, a watermill below the ford, three open fields" becomes `intend` (VILLAGE, 600 people, form `green`, water
`stream`), `place` (`v.parish_church`, high ground within 200 m of the heart), `place` (`v.watermill`), `intend` (field system
`open_field`) — never a picture.

**The village `WhyProvider`** (V10 §3.9's owed table; item 270's interface (§2.8); W74; J-V7.140). `@plat/village` registers one
`WhyProvider` whose `kinds` are `VillagePlan`, `VillageField` and `VillageEnd`; it answers §11.2's `why` in `asPlaced` and
`asNow` modes (§11.2's `WhyAnswer`) from the committed records alone — the heart's terms recomputed by VS1's score (a pure
function of the site and the recorded inputs, never stored) — save its three view-bound rows (the season, the festival and
the crisis line), which read the view the `why` carries (`opts.view`, V10 §2.13; §11.2's view-bound `why`), never the
model, a `why` without a view giving none of the three; its rows are V09 §4.9's catalogue's, their words written here:
* `info.village.heart` — the heart's score terms ("the heart is at the ford (+0.6) on the sunny slope"), or "you moved it"
  (`heartSource: 'edit'`);
* `info.village.form` and `info.village.roads` — the form and the road topology with their sources (`formSource`,
  `roadsSource`): drawn, asked, the dossier's (the culture that weighted it, the access word) or yours;
* `info.village.end` — an end's kind and anchor, derived or declared, and the dossier quarter that claimed it;
* `info.village.field` — a field's system and kind, its rotation slot, a strip's holder ("this strip belongs to the third toft
  on the street");
* `info.village.platformWall` — a generated wall's platform and its step ("This wall holds the house platform above the lane —
  the ground falls 22 % here"); a scarp ("The terrace of a house that stood here until year N");
* `info.village.raisedCarried` — a carried raised way ("The arches were built in year N, when this was a city, for its water;
  they outlived it"; `RaisedRead.origin` and `reason`); `info.village.belowCity` — the village rungs' `belowCity` wording
  ("No viaduct here: villages never build them; you may draw one"); a removal ("You removed the viaduct; the town will not
  rebuild it");
* `info.village.palisadeRun` — a palisade run's condition and material and its epoch ("patched with hurdles in the lean years;
  rebuilt in timber when raiders came"; item 114 (f)); `info.village.unwalled` — an unwalled side from the barrier arc that
  closes it (item 106 (g): "the river is the wall here"; "the scarp is the wall here");
* `info.village.ceiling` — a building grander than the rung's usual ("the dossier names this hall"; "you placed it"; item 115
  (c));
* `info.village.remnant` — a village over a former town (V07 §3.12a): "the village grew in the old town's core"; the story
  itself is V10's from the replay record ("the walls were built when this was a city of twelve thousand"; for a symbolic peak
  "its exact size is not recorded");
* `info.village.superseded` — a superseded plan ("the old village, now the town's core");
* `info.village.season` and `info.village.festival` — a seasonal look and a festival shown ("the millpond is frozen: it is
  midwinter, and winters here are cold"; "the green is set for the harvest feast, weeks 34–35; the tables are on the green";
  items 117 (h), 118 (g)), read from `opts.view` — its `yearWeek`, its `festival` display and its `looks` answer's
  festivals (§7.7's DR43 over the dossier's schedule);
* the **crisis line** (item 122 (f); V07 §5.6) — while a crisis look stands at the viewer's key, the answer for a
  `VillageEnd` of a disaster look's units (§10.2 (d)) while the look stands over a building on its plots
  (`villageUnitPlots`; §10.2 (f): V06 §3.22 (3)'s `crisisLookYields` not yet true on it at `opts.view`'s week, a preview
  never handing over — as the end's `ruinTone` stands, §8.2) and for a `VillageField` a famine look leaves bare carries
  V09 §4.21.12 (4)'s `info.crisis.ruinedFor` row ("For now: Ruined quarters, the mill-end fire, weeks 30–34") in the form
  that section chooses — `ruinedForOpen`, `ruinedForUnnamed` or `ruinedForUnnamedOpen` for a look with no `untilWeek`, no
  name or neither, `ruinedForPreview` under a preview —, the one row its why card shows for it, read from `opts.view` — its
  `crises` and `week` and its `looks` answer's standing looks (§7.7's DR44 at the viewer's key); a condition the key
  withholds gives none.
Its completeness is item 270's test over these three kinds (T-V7-61). **The other "why"s** come from the kinds' own
providers and the section providers, reading this volume's rows: a house from its slot's density and rim multiplier and its
block's quota; a class from its V07 §2.4 profile, the relation and coverage rows the solver summed and the signature pairs that
fired (item 103 (e)); a wood from V07 §3.9's suitability terms, the shade among them (item 102 (f)); a custom institution from
its resolved profile's sources (item 104 (a)); a trade from the links and goods that pulled it (item 105 (j): "the bakehouse
stands by the green because its bread is eaten there; its flour comes from the mill at the ford"), or from the coverage and
spacing that pushed it ("the second alehouse serves the mill end; the first is 300 m away"); a market hall from its claim
("the fish hall stands on the green's edge, as halls stood on their markets"); the fair field from its record ("the annual
fair is held on this field by the north road; between fairs it is common"); a pin from the record that forced it or the VS8
row and epoch that placed it, read from its provenance ("the wayside shrine the dossier lists"; "the old shrine is the
churchyard cross now"; "a well sunk in year N for the new cottages by the mill lane"); a ladder record from its members
("Blacksmiths (3-10): three smithies, at the ford, the green and the north entry"); the underground from V04's records (V10's
rows): an unexcavated void ("the ruins under the green; nobody has dug down yet"), an access from its `cause` ("the smith's
cellar broke into the cave"; "the old mine broke into a gallery"), a dwelling from its access; a church's crypt or its absence
("most village churches had none; the dead lie in the churchyard"); a burial face ("the churchyard: where the town's catacombs
may begin"); a hollow way from its disuse epoch; a pier head ("A net store on the pier head: the landing's"); the water pull
("the cottages crowd the oasis shore").
=== END ===

=== REPLACE ### 5.1 The look — the `painterly` family built, `ink` one click away ===
### 5.1 The look — the `painterly` family built, `ink` one click away

The village product opens in the **`painterly`** family — the base reserves the slot for VG's look (§8.2) and this volume
builds it at all four bands — and every other family draws a village from the same display list (§8.1), `ink` one click away
(J-V7.25). The family's style sheet is data (§8.2): roles, programs, layer order, palette on §8.2's targets (the
corpus-anchored bands, item 69) — our own colours, never VG's (§17.1). Its programs (each a `PaintProgram` in §8.2's registry,
the constants ours unless a provenance says otherwise):
* **Ground.** A ground ramp by relief class and moisture over the paper tone; the base's `hillshade` on the terrain field
  (multiply for the shade side, add for the lit side, at 0.5 and 0.25 strength) and the relief tier **on** — contours,
  hachures or grass marks by the sheet's `relief` option (§8.2's relief tier; grass the painterly default: short slope-aligned
  ticks, alternately longer and shorter, light or dark by the side they face the light from).
* **Water.** The water-band law of §8.3's census (`W · (i ÷ N)^1.5`, N = 3), a stony edge drawn as a pair of jittered strokes
  along every shore, one tide line on flowing water and two on still water and the sea (`ref:VG 1.6.9 water look (code)`,
  restated as geometry only).
* **Ways.** Through roads wide, the village street narrow, lanes narrower, tracks as dotted lines (a dash of 1 % of the width, a
  gap of two widths), driveways as flared patches, junction corner fills where two roads meet at more than 26°; fords as a pale
  band across the water with stepping marks; hollow ways (a way of a land class on ground part 0 in the `abandoned` existence,
  V07 §3.12) as a sunken double hairline with an inner shade. **`way.edgeFade`**: a road or track leaving the frame turns, over
  its last `fadeM` (60 m), into a dotted trail whose dot spacing widens geometrically (× 1.4 per dot) to the frame edge.
  **`bridge.shadow`** is `deck.shadow` (below) for a part-0 bridge: each bridge deck casts a soft offset band on the water below
  it along the light model's sun direction (§8.4), its offset the deck's height above the water × the sun's cotangent. A pier
  head is the pier's plank deck widened. **`way.stair`** (the painterly program for §8.2's stair interval): step ticks across the
  way or yard part over the stair's interval only, one tick per `stairTickM` (0.3 m) of run, the tick side toward the low end;
  **`way.ramp`** (for its ramp interval): a tapered wedge tint along the ramp, darkest at its low end.
* **Fields.** Each furlong filled with its crop's tone from the palette, varied by a bounded jitter; **strips** as furrow strokes
  along `furrowAxisCdeg` at the strip width, dashed from a small set of dash patterns, the headlands left plain; enclosed fields
  hedged by the hedgerow instances (§8.10); orchards as rows of crowns (a jittered grid, §4.9); meadow a fine stipple, commons a
  coarse one; an oasis's irrigated gardens in the garden tone with their channels as water hairlines; great-field boundaries a
  faint dashed line at the township band.
* **Woods.** **`crown.bands`**: along each wood's margin, a **rim** band of separate full crowns, then one or two **muted** bands
  of crowns offset inward and drawn at `mutedMix` (0.35) toward the wood's fill tone, and a **solid interior** — a billowed
  thicket fill; **`crown.groupShade`**: each crown shaded on its side away from the light, and a cluster of touching crowns shaded
  as one mass on its far edge, with a per-crown radial gradient as a sheet option (off in `ink`). Crowns come from §8.10's
  instances on the `render.instances` stream (never stored), so T12 `dress`'s New trees (`rerollLayer('render.instances')`)
  redraws them, nothing in the model moving.
* **The palisade.** A `palisade` as a thick dark line with stake ticks every 1.5 m on its outer side; an `earthwork` as a bank
  of short hachures toward the ditch with the ditch a thin water-toned or dark line outside it; an `inner` stone circuit as the
  ink family's wall symbol at half width; gates as a gap with two posts or a gatehouse footprint. A light stretch (V07 §3.4 step
  6) is drawn at half the full stretch's weight — a wattle fence as a thin line with short cross-hatches, a low bank as sparse
  hachures, a parapet as the stone symbol at a third width; a barrier anchor as a post dot (palisade, earthwork) or a small tower
  (stone); closing arcs are drawn only as the barrier they are, and the `wall` layer's `LayerSpec.showCircuit` ("Show the whole
  circuit", item 413; V09) traces them as a faint dashed line so the enclosure reads whole. **The run conditions** (item 114;
  V07 §3.4 (8); §8.2's state rows and legend): a `breached` run a clear break in the line with a spill of fallen stakes or rubble
  at every band; a `patched` run by its `walls.patchMaterials` row's `look` role (V11 §3.25.3; §8.2's patch looks and their
  patterns) — thinner, lighter and irregular beside the robust section, at every band; a `worn` run at the district
  band and finer only (broken stakes, a slumped bank crest); a `dismantled` run as the base draws it; each state distinguishable
  in greyscale by its pattern, never by colour alone (item 112), and named in the legend.
* **Buildings** (the painterly family's signature; J-V7.73). Roof shapes are V02's roof rows (gable default for cottages and
  longhouses, hip for the manor and the church's nave by their templates). **`roof.faces`**: each roof drawn as its planes — the
  lit faces in the roof tone, the unlit faces mixed toward the shadow tone by `unlitMix` (0.45), and on each face a pair of hatch
  strokes alternating across the ridge at `hatchM` (0.8 m) spacing, parallel to the fall of the face — plus the entrance mark (a
  short stroke at the door, V02's entrance). **`roof.palette`**: the roof tone drawn from the sheet's weighted list (thatch, tile,
  slate, shingle; our own weights, about one roof in three slate where the geology row gives slate) with a per-building tone
  variance of ± `roofJitter` (6 %) keyed by the building's lineage; **`roof.oblique`**: an oblique extrusion (walls drawn below
  the roof toward the viewer by the building's height × `obliqueShare`) as a sheet option, off by default (the base's
  no-oblique-default rule). **`roof.ruin`**: a `ruined` or `decayed` building drawn as its wall ring with gaps and no roof planes,
  a `cleared` one as its footprint trace — the **house platform**, a low rectangle with hachured sides, and where the platform
  was levelled its kept walls drawn by `retaining.wall` in their decay as the scarp (V07 §3.12). **Selective outlining** (§8.2's
  outline-mix program) and cast shadows by the base's light model (§8.4; the cursor sun, on by default).
* **Item 110's structures** (J-V7.93; geometry only, our cells; the painterly programs for §8.2's item-110 roles).
  **`retaining.wall`** (the retaining-wall role): a line whose weight follows the wall's step profile (a hairline at
  `stepMinCm`, the full wall weight at 300 cm and above), with short stone ticks toward the low side every `tickM` (0.8 m), and
  the low-side cast shadow from §8.4's sun at the wall's height; a decayed stretch as a broken line with a slumped stipple on its
  low side (the scarp). **`raised.deck`** (the raised way's deck): the deck band drawn above everything it crosses, as
  §8.2's slot 19a, this order's one home, places it (item 110 (b)), in the way's tone for a viaduct or elevated road,
  with parapet hairlines, and **`deck.shadow`** — `bridge.shadow` generalised to every deck: an offset band on whatever
  lies beneath (ground, a way or water), its offset the deck's height above that surface × the sun's cotangent, sampled
  per span; the arch openings show only under `roof.oblique`'s option. **`raised.support`** (its piers): small filled
  rectangles at the district band and finer, only their shadows at the city band. **`raised.ruin`**: a ruined span as a
  gap with a rubble stipple between its standing supports, a cleared span as a plain gap. **`aqueduct.channel`**: a thin
  line in the water tone along the deck's centre while the channel is unbroken, dry (the deck tone) once broken.
  **Stepped tiers** (V02's `tier`, `shrine` and `stair` roles, program `stairFlight`): each tier drawn by `roof.faces`
  at its own height, with its own cast shadow. **Deck-plot buildings**: the buildings program unchanged, their shadows
  falling on the water.
* **The spotlight.** A radial vignette (§8.2's `vignette` program in the painterly slot): **`spotlight.focus`** ∈ `heart`
  (default: `VillagePlan.heart`), `centre` (the view's centre) or `edge` (pushed from the heart toward the frame edge opposite the
  light, along the shadow angle); **`spotlight.size`** the radius as a share of the distance to the farthest visible corner (1 by
  default); a lightened centre that fades out by half the radius, then a shade that deepens from half the radius outward to the
  edge, its two intensities separate cells (`ref:VG 1.6.9 spotlight (code)` — `spotlight.core` 0.2 and `spotlight.rim` 0.8), a
  view program that never enters the model; off in exports unless the sheet says so.
* **Night.** The base's night view (§8.4 (e), item 68): lit windows by occupancy, the alehouse's and the inn's lamps, no street
  lighting in a village (the era row's public-lighting density at village rungs is 0).
* **The shade map** (item 102 (f)): a thematic view of the daylight share `D` over the settlement and the fields, from VS1's
  `daylight.terrain` with the palisade's shade (terrain and walls, item 102 (b)); a `setLayer` toggle, never on by default.
* **The village through the year** (item 117, the village's part; J-V7.141). A season is a look only, drawn by §8.2's
  *Seasons* rows — the year position and DR42, the surfaces, autumn's covers, water in winter, snow and the sun — which hold
  the village's readings; nothing here moves, adds or removes a building, way, wall, field boundary or water edge, and the
  document hashes identically in every week. The village's own part is which of its records each row reads: each **great
  field** takes the `season.surfaces` row of its rotation slot's crop (the winter grain, the spring crop, the fallow; the
  infield's continuous crop; the outfield's cropped or grazed year), `field.harvest`'s stooks set in rows along its strips;
  its **strips** carry their furlong's row, a strip's week offset within the band keyed by its strip index on
  `render.instances`, so a furlong turns strip by strip; the **meadow** takes the meadow rows, the **commons** and the
  **green** the grass rows (the green grazed short), an oasis's gardens their climate's garden rows; the **crofts** and
  **closes** are among the green and lawn faces §8.2's fallen-leaf cover lies on and the tofts' yard parts among its garden
  yard parts, the palisade and the yard walls among the wall lines it gathers at; for **water in winter** the L0 village
  pond, the green's centrepiece pond, the manor's fishponds and the fair field's watering places are `pond` marks, the
  manor's moat a `moat`, the **leat** the mill's canal (`millpond`, its take-off an open lead), and the brook, stream or
  river `slowRiver` or `river` by its fall. The painterly family draws these rows in its own palette, `ink` by §8.2's ink
  rows.
* **Festivals** (item 118, the village's part; J-V7.142). A look only, drawn by §8.2's *Festival decorations* — DR43's
  schedule, the festival display, the place table with its village readings, keyed placement, the glyphs, motifs and
  bands. The village's own part: **the village tiers' kinds**, V11's decoration rows for each tier — at **THORP** a
  garland or a bonfire at the heart; at **HAMLET** a maypole or a bonfire on the green, garlands on doors; at **VILLAGE** a
  maypole, bunting along the church lane, stalls and tables on the green — never a larger tier's kinds; and **the church
  lane**, §8.2's `churchLane` place: the lane V07 §3.10 names so, else the shortest way from the church's door to the
  green.

The program cells above (`fadeM`, the dot factor, `unlitMix`, `hatchM`, the roof weights, `roofJitter`, `obliqueShare`,
`mutedMix`, the spotlight's; item 110's `stairTickM`, `tickM` and the wall-weight ramp) are the
`painterly` sheet's own cells — our constants, described as geometry, never the reference's values (§17.1) — each in B-ZOOM's
role list (T-V7-25). The underground's marks under a village — the cavern's irregular fill, the ruin's masonry style, the
unexcavated style — are V04's programs and V09's toggle. New **roles** (rows in every family's sheet, with defaults so `ink`,
`lit` and `hatched` draw them too): `village.green`, `village.close`, `village.croft`, `palisade`, `earthwork`,
`palisade.light`, `wall.anchor`, `hollow_way`, `house_platform`, `strip_field`, `headland`, `great_field_edge`, `meadow`,
`common`, `ford`, `village.pond_part` (an uncarved pond part in the water tone), `roof.ruin`, the landmark yard parts'
`village.net_rack` (two posts with a hatched span), `village.drying_rack` (a short ladder of bars) and `village.timber_stack` (a
rectangle of log-end rings) (a named beach is drawn by the base's shore program as its `beach` run, no new role), and the pin
symbols `stocks` and `maypole` (§8.3's symbol catalogue gains the two glyphs and the well, pump, cross, market cross, shrine,
trough and stall glyphs at village scale, so every pin VS8, `village.pins` or a pin record places is drawn). Item 110's
structures take §8.2's roles (the retaining wall, the raised way with its piers and an aqueduct's channel, the stair and ramp
intervals), which the painterly family draws by the programs above; the palisade's run conditions take §8.2's state rows (item
114), the seasons §8.2's season rows, cover rows and its `ice` and `snow` roles (item 117), the festivals §8.2's decoration rows
(item 118), the crisis looks §8.2's crisis look rows and roles (item 122; V07 §5.6).
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

**The bench.** `B-VILLAGE`: 200 seeds per village rung × four water settings (none, a stream, a river, a coast) × the seven
forms at their default weights (PR tier: 20 seeds per rung; nightly: the full bench; §13.8's tiers), plus an arid set (item
111), the frozen small-dossier fixtures (the 70 thorps, hamlets and villages and the 5 small towns of the 155 surveyed,
`research/sf/dossier-outputs.md` §3) and the 10-person thorp fixture, plus `B-VG`: 200 seeds per VG request-tag set under the
`VG` preset, each request set mapped onto `VillageRequest` by the request-mapping table (item 495). Each bar is labelled C (a
rule followed), P (parity with a measured VG number) or O (an outcome VG does not reach), as §13 labels them. A class a bar
names in words (the church, the smithy, every watermill) is its `v.` row of V07 §2.4 (J-V7.95). These tests take over the
village rungs' clauses of the base's hook bars (§13.2's take-over row: T13-1, T14-1, T30-4, T65-2, T102-1, T110-7, T111-1 –
T111-5, the village halves of T113-1 and T113-3, and the village clauses of items 114–120's bars and of item 122's T122-5 and
T122-6, each test naming in its head the bars it takes over); every no-op pin registers on V12 §3.7.8's engine — its test
stating that registration in one clause — and reads "off" as V11 §3.24.0's switch table.

| id | bar | class | milestone |
|---|---|---|---|
| T-V7-1 | routing: populations 1, 8, 79, 80, 399, 400 and 1 499 build THORP, THORP, THORP, HAMLET, HAMLET, VILLAGE and VILLAGE; 1 500 builds a TOWN; with the product unregistered a dossier below 1 500 is refused naming the village product, registered it is created | C | V-M1 |
| T-V7-2 | population exact: the households' members sum to `P` on every bench seed; `N_v + N_o = N` and every household is housed once; with a dossier, the residential building count (`N_v + N_o`) lies inside the housing record's range on every fixture; the 10-person thorp (range 4–16) builds 4 households in 4 dwellings; a fixture below `household.minSize` builds the surplus vacant and reports `W_VACANT_TO_RANGE` | C | V-M1, V-M2 |
| T-V7-3 | registration: every input key of every stage in `ProductDecl('village').stages` has exactly one producer in the set (the declaration layer counting as the one producer of `declarations.*` and `raised`, V07 §3.0); no village stage writes a ground part from 1; the order has VS2 and VS3 before VS4 and VS5 before S7, and contains none of S3–S6, S8; on a registration fixture L0 is written only by S1 and VS1 and L1 only by VS1 (the border first), VS4, VS5, S7, S7b and VS6, in that order, none after S9 (the kernel's writer check) | C | V-M1 |
| T-V7-4 | the heart is dry, above the flood line and within its slope limit, or F-V-HEART's rung is reported | C | V-M1 |
| T-V7-5 | density: under `VG` the raster equals the restated formula's reference implementation bit for bit on 100 fixtures; the mean populated area is monotone in `δ` | C | V-M1 |
| T-V7-6 | palisade: every nucleus inside the trace; every gate on a way; no footprint in the band; a dossier wall record gives a palisade on 100 % of fixtures, none without one | C | V-M1, V-M2 |
| T-V7-7 | network: one connected component; every through road reaches its entries; 0 self-intersections; every bridge within ± 10° of the channel normal; through-road length over its grade limit ≤ 5 % outside `VG` | C, O | V-M1 |
| T-V7-8 | the open space lies inside the palisade and clear of water and the mill; its area grows with `√(P ÷ target)` within the scale clamp | C | V-M1 |
| T-V7-9 | every built plot has an access edge on a way and every dwelling's main door faces it (the hidden share 0); every built plot's access edge reaches its main door on the ground, directly or by a `ramp` or `stair` yard part; every drive that crosses a platform wall is a ramp within `rules.grade.track`, or F-V-TERRACE's rung is reported | C | V-M1 |
| T-V7-10 | every watermill stands on a reach with ≥ 1 m of fall and a leat within its limit, else F-V-MILL's outcome is reported | C | V-M2 |
| T-V7-11 | hinterland: arable per head within ± 20 % of its row outside `VG`; ≥ 80 % of meadow below the flood line; great fields within ± 25 % of each other; the furrow axis downslope on ≥ 90 % of furlongs steeper than 2 %; the territory's area per head equals the sum of the farm rows and moves with an `editTable` of one | C, O | V-M2 |
| T-V7-12 | institutions: each V07 §2.4 presence row's rate within ± 5 % of its anchor law at the fixture's population over 1 000 seeds; the church within 200 m of the heart or on the green on ≥ 80 % | C | V-M2 |
| T-V7-13 | dossiers: every small fixture is created; every institution record placed or bound by V07 §3.11's resolution order; every quarter on an end; walls exactly per record; the title word the dossier's; a `burial_ground` or `graveyard` record resolves to one burial face (the churchyard enlarged or its own `cemetery` plot) carrying its binding key; `access_to_external_mill` gives 0 mills and a reported milling import; Wealthy Residential claims the end of highest mean prosperity and biases only its plots, Common Residential claims nothing; the Religious Quarter's east phrase puts the church east of the heart more often than its random baseline (while §7.7 item 16's east row stands; the clause lapses with it, J80 Q5); a `Toll bridge` fixture on a dry `plains` site gets a brook its through road crosses by a bridge, and on `desert` without `oasis_water` its toll house stands at an entry with `toll_bridge_dry` reported (V08 §2.6b (3)); a coastal fixture whose `PortValues.threats` holds `naval` stands its watchtower at the wharf or chief landing and walls none of its water; an `access_to_parish_church` fixture at THORP and at HAMLET has no parish church, no parsonage and no tithe barn of its own (a chapel of ease by its row); a crown fixture and a merchant-oligarchy fixture each stand their `villageSeat` class; an `ecclesiastical` hamlet fixture with `Access to parish church` stands its `v.parsonage` with no parish church and no F-SITING report; a `fish_market` fixture puts the market on the open space and its hall's plot on the space's rim — the hall within 60 m of the market, no toft slot taken, the open ground left no smaller than the unhalled size; a port fixture with `Docks and port facilities` stands its harbour master within 60 m of the wharf's quay; an `annual_fair` fixture lays one secondary `market` reservation of `market.fairHa` outside the perimeter at the through road's crossing nearest the heart, claimed as common, with 0 pins on it, or reports F-V-FAIR's rung; a `monastery_or_friary` fixture seats its cloister on joined slots of `claimArea.cloister`'s area at its band; a `town_watch` fixture's `v.watchtower` lies nearer the green than its random baseline; a crown, a seigneurial, an ecclesiastical and a chartered-commune fixture at VILLAGE place no `palace`, `castle`, `cathedral`, `courthouse` or `guildhall` of the government row's and no `v.watchtower` beyond its presence row, each standing its `villageSeat` class; a coastal `slave_market` fixture seats its slave market on joined slots with no claim on the open space, its site nearer the wharf or an entry than its random baseline; a thorp fixture with a `Wayside shrine` record and no Roadside Shrine quarter stands exactly one `shrine` pin bound to that record, on every seed; a hamlet fixture with `Wayside shrine` and `Parish church` binds the shrine record to a `cross` pin inside the church's `churchyard` part, nearest its door, with no shrine pin at the settlement edge bound to it; a `Water source` thorp fixture binds its record to a well pin. **Its village-history clause** (run on M4's grow path at item 202's call points before M6-E and on V06's runner after): an `annual_fair` record arriving at an epoch lays its fair field outside the perimeter on `commons` faces, never inside the district, still extramural after an (8v) extension and standing as a secondary market after the hand-off up; a `fish_market` record arriving at an epoch cuts its hall's claim from the rim with the open space not grown and the encroached share within `epoch.encroachShareMax`, else its reported rung; a `monastery_or_friary` record arriving at an epoch opens on joined plots of `claimArea.cloister`'s area or an outside plot, else its reported rung; every record the port adds at a village epoch is placed or bound in that epoch's `dossier` step — by `village.records` for the market, claim-sized and pin records, by the base's placement for the rest — with 0 records left unplaced at the `epoch` event's check; the `fish_market` record's hall stands **built with its use open** (`openUse`, cause `dossier`) in the epoch the record arrives, its plot the rim claim or joined plots, and a `monastery_or_friary` record's cloister likewise, its outside plot cut from a hinterland face whose remnant keeps its land use; a roster `fair_ground` member with no standing field — the fixture's field held on the green at creation by F-V-FAIR's last rung — is laid by step (m) at the first epoch whose perimeter crossings offer a dry face, outside the perimeter on `commons` faces, each face gone from its `VillageField`'s `furlongs` in that batch; a `Wayside shrine` record added at an epoch stands its bound `shrine` pin at that epoch; an `annual_fair` record removed at a later epoch leaves its reservation tombstoned in that epoch and its faces `commons`, and a `Wayside shrine` record removed leaves its forced pin tombstoned, while one whose record had bound a chance shrine leaves that pin standing, unbound; a `weekly_market` record removed below the law's crossing clears the principal market rank in that batch, 0 stalls at the next village epoch and `dist.market` measured to the first nucleus's open space, and one removed above it keeps the market by the law, its stalls at count; a `Wayside shrine` hamlet fixture whose record is promoted to `Parish church` at a village epoch stands its church bound to the record's key and one churchyard `cross` laid for the record with no binding row, the roadside shrine standing unbound, a hamlet fixture whose next offer drops `Wayside shrine` and adds `Parish church` with no receipt binds the shrine's key to the churchyard `cross`, the church bound to its own key, and a `fish_market` record added at an epoch beside a standing fishmonger stands its hall on the market's rim with the fishmonger's shop keeping its use; and, at V-M2, an `annual_fair` and a `fish_market` record absorbed without an epoch lay the fair field and the built, open hall in that absorb's commit — the hall standing finished, with no Works — and S10b's `dossier` request receives neither (J-V7.128); two `fish_market` records absorbed in two weeks between the same pair of epochs stand two halls with two distinct use addresses, each minted from its own dossier event's `seq`, and a record carried by an epoch mints the addresses and draws the values the same dossier event mints and draws folded standalone at that `seq` (J-V7.129); the `Wayside shrine` promotion to `Parish church` absorbed without an epoch stands the church on the record's key and its churchyard `cross` with no binding row in that absorb's commit | C, O | V-M2 (its village-history clause at V-M3) |
| T-V7-14 | the hand-off up: a fixture village grown past the band over epochs keeps every surviving entity byte-identical, retypes its district `central` keeping `village-ways`, turns its green into the market (its `Greenery` a `market_green` part) when the town has none, and grows the town's first stage from its perimeter; a re-derivation of the old core after the hand-off runs the village fabric on its recorded inputs, the participants registered with stage `VS1` (`village.plan`) and `VS2` (`village.density`), T-V11-1 (b) recording their reads of `village.json` under those two ids and never under a participant id; a target alternating 1 480 / 1 520 changes the product 0 times and one alternating 1 400 / 1 600 at every epoch; no catacomb exists before the first TOWN epoch; after it at most one, sourced at a burial face, 0 sourced at a church; a drawn crypt stays with its church, unchanged by the crossing, joining only by the crypt-join draw; the churchyard's age at the crossing equals its creation age plus the logged years; an epoch undone after a save restores on load; one document | C | V-M3 |
| T-V7-15 | the hand-off down: a TOWN fixture falling below the band creates a `VillagePlan` (a former village revives its one plan at the same address, its declared fields kept), re-cuts no district and runs the village phases at later epochs; a second crossing up and down leaves one plan record | C | V-M3 |
| T-V7-16 | desertion: a target of 0 vacates every dwelling but a locked or pinned one, which keeps its state — with 0 households under a dossier fall, with its last household under any other (V06 §3.5.1 (5)); after ten epochs the church stands on ≥ 60 % of seeds and the hollow ways persist; the replay reproduces the history | C, O | V-M3 |
| T-V7-17 | locality: a block's re-race changes nothing outside the block; a density stroke changes only its blocks; a field-system switch — `forest_strip` included, its strips starting at the crofts' rear lines — changes nothing inside the perimeter (the oracle of §7.3) | C | V-M3 |
| T-V7-18 | determinism: digests identical across the five engines of §13.3 on 100 seeds per rung; removing one branch (a density stroke that suppresses it) leaves every draw of every other tracker identical and changes the geometry only of the trackers in its computed influence set — those that merge onto, or test junctions within `branchSpacingM` of, the removed branch's ways — asserted on 100 fixtures; a stage with no draws consumes no stream index | C | V-M1 |
| T-V7-19 | item 102 at village rungs (T102-1's village clause): with `sunTerm` and `woodShade` at 0 the output equals the build without them byte for byte; at their defaults the dwellings' mean daylight share exceeds the density box's and the woods' mean share is below the arable's, across the bench | C, O | V-M2 |
| T-V7-20 | item 103 at village rungs (the statistics suite, village rows): the smithy's distance to the through road and the church's to the heart below their random baselines; the tannery downstream in ≥ 70 % of river villages that hold one | O | V-M2 |
| T-V7-21 | item 104 at village rungs: the custom fixtures (a category only; tags; an archetype; an active chain) resolve, site and report; a chain's nodes closer than a random baseline; the flow order holds; a `mercantile-market` custom record at VILLAGE binds a `market_cross` pin at the centre of the reservation carrying the market (the open space, else the flanking square), in place of the drawn centrepiece, and a `sacred-shrine` custom record binds a `shrine` pin at the perimeter on a road | C, O | V-M2 |
| T-V7-22 | editing: each V07 §4.1 row's event is identical from the canvas, the tool API and the skeleton file; a declared heart, green, end and walked road survive Regenerate (keep); a lassoed end holds exactly the plots inside its lasso and survives the merge and the cap however few its plots; the dry runs of `declareEnd`, `drawGreen` and the density brush return the count badge; an unlawful form edit under `forest_strip` is bent to `open_field` with its note; a zero-length stroke or zero-area lasso is refused by its dry run as a shape, never logged | C | V-M3 |
| T-V7-23 | parity with VG (`B-VG`, under `VG`): dwellings per village in VG's recorded range per tag set; the accepted-frontage share (`vg.acceptedShare`) in VG's measured 63–82 %; the square's rim radius, the trail and approach counts, bridges per river map, the palisade rate on dry maps (0.2, 0.3 when dense) and the road-topology shares, the orchard share and the wood cover per map each within the band rule of §13.5 against `baselines.json`'s VG rows; the arena's frame VG's view at `rules.vg.frameM` for the matched size plus `rules.vg.marginM` on each side (the base's `Frame.marginShare`, §3.2 (9)) | P | V-M4 |
| T-V7-24 | performance: V07 §6's laws and bars on `B-VILLAGE`; `R_s` recomputed from `village.json` at each rung target lies within 5 % of V07 §3.2 (6)'s figures (≈ 100, 245 and 480 m) and the density box's cell count within 10 % of V07 §3.3's; `village.density` at a base-product epoch within its bound (V07 §6) | C | V-M1 (the epoch clause at V-M3) |
| T-V7-25 | renders: B-ZOOM's role continuity across every band switch of `painterly` and `ink` at village rungs, the programs `roof.faces`, `roof.palette`, `roof.ruin`, `way.edgeFade`, `bridge.shadow`, `crown.bands`, `crown.groupShade`, `spotlight.focus` and `spotlight.size` in its role list | C | V-M3 |
| T-V7-26 | labels: no end label over the church, a gate or a well; the title plate never over the heart | C | V-M3 |
| T-V7-27 | exports: the GeoJSON village layers validate (with `hollow_ways`, `house_platforms`, `landmark_parts`, a strip's `holder`, a declared end's flag, a reached close's flag); `VillagePlan`, `VillageEnd` and `VillageField` round-trip through `.plat` byte-identical | C | V-M3 |
| T-V7-28 | robustness: 10 000 seeds per rung — 0 whole-map retries, 0 crashes, 0 tier-6 omissions of a requested feature; every F-V rung counted in the report | C, O | V-M1 |
| T-V7-29 | the owner's side-by-side against VG (§13.6's D-5 protocol, twenty pairs over VG's tag sets, the `VG` preset beside VG and the default beside VG) — rated, or the owner's acceptance recorded; unrated, the milestone is *provisional — not rated* | O | V-M4 |
| T-V7-30 | desertion traces: after a desertion fixture every hollow way is a way of a land class on ground part 0 in the `abandoned` existence with its disuse epoch and every house platform a dwelling in the `cleared` existence; 0 hollow ways on a deck, a ford or a raised part (T-V7-50); every retirement is a `retireWay` op (a primary included), struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight `E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), and every effacement an `effaceWay`, while 0 `downgradeWay` lowers a primary at any rung; both render in every family, export in their GeoJSON layers, round-trip through `.plat`, and regrowth rebuilds on the platforms and reopens the hollow ways first | C | V-M3 |
| T-V7-31 | the barrier closure (item 106 at village kinds): a river-bend fixture is fenced across its neck only and its enclosure is sealed; a scarp-backed fixture has 0 walled edges along its sheer arcs; no walled edge lies within `palisade.bandM` of any shore; 100 % of landings and wharves are reached from the heart without crossing a walled stretch; every walled stretch's ends anchor on a barrier, or F-V-ANCHOR's rung is reported; the reached ground holds only commons-owned closes typed by S12b, no dwelling, and is excluded from S10a's quotas and VS6's capacity; under `VG` the palisade is byte-identical to the build with the closure off | C | V-M1 |
| T-V7-32 | the palisade's REPLACEMENT: with ≥ `ladders.replaceShare` (80 %) of dwellings inside, a town-wall promotion keeps the trace's vertices (save where a raised way crosses it: §2.7's laws, law 2 (a); T-V7-48) and gates, retypes the kind to stone and stands every run robust; below it, a new ring anchors on the barriers and the palisade, and the palisade is superseded; one document | C | V-M3 |
| T-V7-33 | the supply web at village rungs: every good of V07 §2.4's supply rows is an id of V11 §3.7.1 and every provider class produces the good it provides (T-V11-3 and T-V11-28 pass over the village rows); with its weights at 0 the output is byte-identical (item 105 (k)'s no-op pin — the `item105.web` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat); the district term changes nothing (one district); every dwelling's toft is identical with the web on and off; across the bench the bakehouse and the alehouse lie nearer the open space, the smithy nearer a through-road entry or the crossroads, and the charcoal pit and the wood yard nearer the wood edge than their random baselines; with two mills each consumer binds to the nearer | C, O | V-M2 |
| T-V7-34 | balance at village rungs: with `comfortM` and the spacing at 0 the output equals items 103 and 105 alone byte for byte; the nearest-alehouse distance between alehouses exceeds its random baseline; every end of ≥ 40 households lies within 400 m walk of an alehouse on ≥ 80 % of VILLAGE seeds; no end is named for a trade without a dossier claim, a declaration or item 72's threshold (0 on the bench) | C, O | V-M2 |
| T-V7-35 | ladders at village rungs: on the small-town fixtures every COUNT (save `multiple_water_sources`, a floor), QUARTER and GUILD record shows members inside its range, non-decreasing across a population sweep from 900 to 1 499; a `Blacksmiths` record's smithies spaced by the row's `K spread 200`; a craft- or merchant-guild COUNT record stands that many `guildhall` members, a GUILD record of that COUNT's `categories` family adds no hall beside them (its hall one of the COUNT's members), and one of another family keeps its own hall (V08 §3.5.1 (c)); a `multiple_water_sources` record's wells number at least the range's low end and the coverage count; a `Wayside shrine` beside a `Parish church` record leaves no edge shrine and one churchyard cross bound to it; a lesser record beside its greater adds no building; a SIZE record is one building; a promotion whose greater's thing is the lesser's (V08 §3.5.1 (c)'s first case) keeps member #1 byte-identical, and one to a REPLACEMENT greater of a new thing places the greater new and leaves the lesser's former thing byte-identical and unbound; a demotion keeps the member nearest its demand | C | V-M2, V-M3 |
| T-V7-36 | chains and the entry store: every dossier chain whose members stand on the map becomes links on 100 % of fixtures with chains; a chain with an absent processor binds nothing, adds no building and is reported; an `entrepot` chain's store stands at the entry facing its partner (the inn, else the landing, else a farmstead) on 100 % | C | V-M2 |
| T-V7-37 | splits at village rungs: 0 split pairs below 900 people across the bench and 0 under `VG`; above 900, pairs only where item 105 (h)'s threshold fires; an author's `branchOf` assignment makes one, held through Regenerate (keep) and removed by its inverse; a town shrinking into a village keeps its standing pairs | C | V-M3 |
| T-V7-38 | caverns and ruins at every village rung: across the bench (with a mountainous-relief set and a dossier-ruin set) caverns and ruins occur at THORP, HAMLET and VILLAGE at their rows' rates within ± 3 s.e.; cavern frequency higher with mining than without per relief class; a dossier `ancient_ruins` fixture gets a ruin with its marker linked, or a reported reason; with the ruin chance 0 and the base's relief, boost and fissure rows the village is byte-identical to the build without these kinds (a `NoOpPin` — the `item109.underground` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2u seat); the village rungs' levels of item 109's presence and access bars join at V-M4, `notApplicable` before, never `insufficient` (V12) | C | V-M2u |
| T-V7-39 | access grows with the village: across a growth sweep from 40 to 1 499 people over one fixed void, the accessible share rises monotonically with the buildings over it; a 40-person thorp over a void is sealed on ≥ 60 % of seeds; a mining working with a gallery within `breachM` at its depth gives a `mineBreach` access on 100 %; a dug passage crossing a sealed void makes it accessible, transitively through its links | C, O | V-M2u |
| T-V7-40 | dwellings only after access: 0 dwellings in a void without an access; every `AccessPoint` carries its `cause`; 0 undercity at any village rung; 0 catacomb, quarry, vaults or buried systems created at a village rung save the charnel vault of a dossier catacomb fact and a replay's buried former settlement (V07 §3.12a (2)) | C | V-M2u |
| T-V7-41 | smooth scaling: across a population sweep from 60 to 1 499 in steps of 10, every presence rate and every count is monotone non-decreasing within its tolerance and no rate changes by more than 0.1 between adjacent steps — the grandeur ceiling's rung step (V07 §3.8) excepted and asserted by T-V7-63; at 40, 200 and 700 people every cell equals its rung column | C | V-M1 |
| T-V7-42 | the resolution order: every catalogue kind of tiers T, H, V and W — the count read from `dossier.catalogue`'s manifest, never written into the bar (176 at the pinned line: 97 kinds of tiers T, H and V and 85 of W, six in both) — resolves at the three village rungs to exactly one of pseudo-reader, village class (a `v.` key), own class or fallback; no pseudo-class builds a building (an `@absent:` kind zeroes its classes' demand through their village forms, asserted at THORP and HAMLET for `@absent:church`); the fallback is reached only through `unmapped_kind` and is reported; the compile refuses an unprefixed village row and a `villageForm` naming a non-`v.` key (V11's T-V11-3 clause); every class a kind of tiers T, H, V or W plays itself at a village rung has a finite plot area at THORP, HAMLET and VILLAGE (a compile check: a template family whose plot is "the claim's" reads `rules.claimArea`, V07 §2.2a) | C | V-M2 |
| T-V7-43 | the hand-off down's underground: a TOWN fixture with sewers and a catacomb shrinks into a village over epochs; every tunnel record survives; the catacomb's extent is non-decreasing (never below `extentFloorM2`), its state `stagnant` with `'rung'` in `blockedBy`, its `fill` non-decreasing, its `source` a burial face; after the parish's desertion the reason is `'sourceClosed'` and the complex stays; a fixture town with a cathedral keeps the cathedral and its crypt at every village epoch; a later rise past the band resumes the catacomb's growth | C | V-M3 |
| T-V7-44 | rules are data: a scan of V07 §1 and V07 §3 finds no numeric rule constant that is not a `village.json` cell (V07 §2.2, V07 §2.2a), a class row of V07 §2.4 or a cited base, V04 or V11 cell (every reference cell of V07 §2.2a resolving to an existing cell of its unit, and no `village.json` cell copying a value it could reference) — unit words, section pointers and the restated reference constructions' literals excepted by an allow list keyed to row D5 (V07 §2.2a's reference trace), and implementation parameters that change no output (a spatial index's cell size); the item-110 constants of V07 §3.5a, V07 §3.8a and V07 §3.10a included in the scan; `epoch.rows.persistence`'s church keys equal V11 §3.5.1's `church-family` members; the table compile refuses a switch or mode cell of `village.json` marked calibratable (`terrace.enabled`, the `vg.*` switches and `vg.forestMode`, `plate.qualifier`, the `epoch.rows` op, class-list and order cells), and a reference cell so marked, as T-V11-37 refuses V11's | C | V-M1 |
| T-V7-45 | crypts and burial faces: over every parish church built across the village bench, the crypt share lies within the binomial band of 0.1; 0 chapels carry a crypt or a churchyard part; below TOWN 0 catacomb complexes and 0 gallery systems sourced at a burial face; every dossier-bound `graveyard` or `burial_ground` record resolves to exactly one burial face, a churchyard it enlarges holding at least V11's `burial-ground` plot area at its band; a dossier crypt fact gives its church a crypt on 100 %; a church's crypt state is identical before and after a rung change; a `parish_burial_grounds` record binds one member per standing parish church's churchyard, enlarges none, and places a `cemetery` plot only where no church stands | C | V-M2 |
| T-V7-46 | no generation below TOWN (item 110 (b)): across `B-VILLAGE` with a ravine-and-valley set (a dry gorge across a neighbour bearing, mountainous relief), 0 raised parts created by generation, by any router call a village stage makes or by a village epoch at THORP, HAMLET and VILLAGE; with item 110 (b)'s rows on, the output is byte-identical to rows off when no declaration is held; the rung gate is no `village.json` cell (an `editTable` on it is refused) | C | V-M1 |
| T-V7-47 | levelling (V07 §3.8a): on a flat fixture (every platform below `terrace.slopeMin`) 0 retaining walls; on the hilly and mountainous sets, walls only on house-platform edges whose step exceeds `terrace.stepMinCm`; 0 walls on a croft, close, reached ground, green, churchyard, under-deck strip, hinterland face or the district's perimeter; on a cliff-edge village fixture 0 walls on a cliff bank segment, a `cliff` or `sheer` arc or a cliff inside the district, every platform there keeping the shore setback's `cliff` distance from it (V07 §3.8a (2)); the longhouse's byre end downslope on ≥ 95 % where the ground falls > 3 %; every plot's access reaches its door on the ground, by a ramp or by a stair, and every drive crossing a wall is a ramp within grade or F-V-TERRACE is reported; a re-derivation of one plot changes no other plot's walls but a shared one | C, O | V-M1 |
| T-V7-48 | a raised way on a village map (a declared viaduct and aqueduct, and one carried down from a CITY fixture): 0 junctions between VS4's ways and a raised part except its two feet; 0 VS4 ways on a ramp, a stair or a `vault` span's under-deck strip (but one §2.7's laws read `open`, law 1 (8); its way-and-channel table) or along the strip, each VS4 way crossing a span under an `open` span within §4.3's clear width, clearance and `squareDeg` (the declared viaduct crossing the populated area with a `vault` span and an `open` span whose soffit is below §2.7's *The clearance* for a `road`), and, with both those spans `ruined`, then `cleared`, by `DeclineOp`'s `breach` and `dismantle` as the state sweep scripts them (§13.2), the next derivation's VS4 ways crossing each by the same rule whatever its `state` — none over the `cleared` `vault` span's strip (its arch vault `collapsed`, V04 §3.5.4 (d) (2)), the `cleared` `open` span's crossed only within that clear width, clearance and `squareDeg`, never along the strip (V07 §3.5a (3)); 0 toft yard parts or buildings in the under-deck strip; 0 hinterland faces over a standing support (a support whose `state` is absent or `ruined` is a hole); the palisade's band laid through each support of the declared viaduct standing in it, no gap in the line, its line — planned across a standing support of the declared aqueduct whose channel runs above the palisade's top along the deck within the line's reach — bent locally to the nearest lawful crossing, under a span clearing that top (§2.7's laws, law 1 (2), law 2 (a), law 3) and, where it crosses a ramp, bent to the nearer by law 3 of the first lawful crossing under the deck and the one beyond the ramp's foot (§2.7's laws, law 1 (4), law 3; its worked example the bent-group sentence (i)), no raised way's ends under its line, band or wall strips (§2.7's laws, law 1 (4)), each crossing of the palisade's line with a deck line reported `W_RAISED_CROSSING` once (§2.7's laws, law 4; its worked example row W1), and no arch vault in a `vault` span under it (on a declared viaduct with a `vault` span in the planned palisade's band); 0 gates where §2.7's laws, law 1 (5), bar one, and 0 on a deck; 0 palisade runs above a road deck's standing span's soffit, at a span or at a support bearing it, and the palisade at its own top beneath the declared aqueduct (§2.7's laws, law 1 (7)); a hand aqueduct drawn across the standing palisade crossing it in the form its level there gives (§2.7's laws, law 1 (2)): over — its supports off the band and a span over it clearing the palisade's top — where its channel runs above that top, and, on a variant whose palisade is the stone `inner` circuit and whose aqueduct is drawn with its channel within the circuit's height, merged, the circuit built up round its arch or pier at its own top, no gate in it, nothing of either record written; a hand raised road drawn across the standing palisade brought down before it, with `bend.raised.wall`; the carried-down raised way meeting the palisade as it met its CITY fixture's innermost ring (its aqueduct created across that ring in the form its level there gives, §2.7's laws, law 1 (2)); a palisade stretch T3 `wall` draws across it at a standing support, its channel above the palisade's top along the deck within the stroke's reach, bent locally to the nearest lawful crossing, under a span clearing that top (§2.7's laws, law 1 (2), law 2 (a), law 3; its worked example the bent-group sentence), with `bend.wall.raisedCrossing`, and a hand `placeGate` whose `at` lies in its under-deck strip where §2.7's laws bar a gate (law 1 (5): the span over `at` not clearing the gate) moved along the palisade to the nearest lawful point (law 2 (a), law 3; its worked example row W13), the stub with it; after a support is `cleared` the band stands whole across its footprint and the next derivation makes no obstacle or hole at it; a village Regenerate of the carried-down fixture (the palisade re-laid as before); a V07 §3.4 (8) decay, a hand `convert` `breach` and `dismantle`, a `repairWall` and a hand `delete` of the palisade's run beneath the carried-down deck and, on a second run, beneath the declared viaduct — each an *unchanged meeting* (§2.7's laws, law 4), the deck unchanged; a hand `convert` `gateToJunction` of a palisade gate, and `wallToWay` and `absorbWall` of the palisade beneath it — the gate opened as any (§2.7's laws, law 4; its worked example row W6), the ring road by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's row (c)), the absorbed palisade's runs dismantled in time as any; and its CITY fixture's aqueduct sourced beyond the frame, its deck extended by a frame growth before the hand-off down, carried down and meeting the palisade as a standing raised way does; that CITY fixture handed down over the state sweep (§13.2; §2.7's laws, law 4; its worked example row W9), each state made before the hand-off — the hand-off writing nothing of the raised way or the ring's runs, and the palisade read by §2.7's laws at that state (law 1 (2)–(9); its worked example *beneath*: its run at its own top beneath each fallen span, no chamber under the `vault` span, the band whole across a cleared support's footprint); VS3's later re-lay of the palisade on that fixture over the state sweep — the palisade by §2.7's laws at each state (law 1 (2)–(9); its worked examples *beneath* and row W1 at a village); the palisade's REPLACEMENT under the declared aqueduct, rebuilt in stone on its trace (V07 §3.11) — crossing the aqueduct in the form its level gives against the stone wall's new top (§2.7's laws, law 1 (2)), re-traced locally where its new band would cross in neither form (law 2 (a), law 3; its worked examples the bent-group sentence and row W14); and, on a variant whose palisade gate stands under the declared aqueduct's arch, the arch clearing the palisade and the gate but not the stone wall's top, the REPLACEMENT waiting (`walls.waited`), the palisade, its gate and the aqueduct unchanged (§2.7's laws, law 1 (5), law 2 (c)); and, on a variant whose declared aqueduct's channel runs above the palisade's top all along and whose `raisedWays.structure.pierSpacingM` band a table edit narrows so that no span of it admits the palisade's band, F-V-RAISED's ladder — the ring re-laid once round the aqueduct, else the palisade omitted, reported `W_RAISED_MEETING` (V07 §3.13; §2.7's laws, law 2 (c)); and, on that variant, a T3 `wall` palisade stroke across the declared aqueduct refused `refuse.raised.meeting` with the nearest lawful declarations, nothing of either written (§2.7's laws, law 2 (c); V07 §3.5a (4)); VS3's palisade on a river village whose shore anchor falls in the declared viaduct's fixed-place zone — the anchor moved along the shore with its end post to the nearest place §2.7's laws admit it (law 1 (4)–(6), law 2 (a), law 3; its worked example the fixed-place sentence); and the REPLACEMENT under a carried-down raised way, over the state sweep (§2.7's laws, law 4; its worked example row W14 at a village, its C9 cell); `N_v` exact before and after the add; after Regenerate (keep) the feet re-join within `raised.endSnapM` or `W_RAMP_STUB` / `W_RAMP_UNJOINED` is reported; the add's dry run shows the count badge; every span over a hinterland face open (the span rule's `country`); an unbroken aqueduct's delivery point counts as a well (no well within 120 m), and after a span is ruined or cleared a well is sited at the next derivation; 0 ends anchored on a raised way | C | V-M3 (its carried-down clauses and state-sweep runs as V07 §8's V-M3 exit states) |
| T-V7-49 | deck plots (V07 §3.10a): every deck plot inside its deck's width and budget, and no deck face buildable below V11's `minPlotDepthM` for its kind; 0 dwellings on a deck generated at village rungs; `N_v` and every toft byte-identical with the deck rows on and off; the pier head's rate within ± 3 s.e. of `deck.headChance` at the fixture's population over 1 000 seeds with a landing; each deck plot falls with its deck and is re-offered when the deck is rebuilt; every deck plot inside the village district or the hinterland pseudo-district | C | V-M3 |
| T-V7-50 | decline: 0 hollow ways on a deck, a ford or a raised part; on a hilly desertion fixture every generated wall persists as a decaying scarp beside its platform, none removed by a re-derivation after its dwelling is cleared; regrowth rebuilds on the platforms first and repairs their walls at the datum | C | V-M3 |
| T-V7-51 | hand-offs: a CITY fixture with a generated aqueduct and a viaduct falls to VILLAGE, and both stand, with their supports and reasons, at every village epoch, declining only by stretch; 0 raised ways created at a TOWN or village-rung epoch; a removed generated way stays removed through the fall, the village epochs and a rise back to CITY; a village's declared raised way crosses the hand-off up held; the old core keeps the house-platform rule at TOWN; a shrunk town's deck plots keep their dwellings | C | V-M3 |
| T-V7-52 | no-op pins (item 110 (f); T110-7's village clause): with every `deck.offer` 0 and `terrace.enabled` false (V11 §3.24.0's switch table) and no raised way declared, `B-VILLAGE` is byte-identical to the pre-110 build; under `VG`, byte-identical to the pre-110 `VG` preset; the suite registers on V12 §3.7.8's engine with its `terrace.enabled` switch, its switch-on shifts following V12 §3.7.6's four bumps | C | V-M1 |
| T-V7-53 | renders: B-ZOOM's role continuity for §8.2's item-110 roles (the retaining wall, the raised way with its piers and channel, the stair and ramp intervals, the tier roles) drawn by the painterly programs (`retaining.wall`, `way.stair`, `way.ramp`, `raised.deck`, `raised.support`, `raised.ruin`, `aqueduct.channel`) and by `ink` at village rungs; every retaining wall draws its low-side shadow and every raised deck its shadow on the surface beneath | C | V-M3 |
| T-V7-54 | editing: each item-110 row of V07 §4.1 (the terrace stroke, `retaining`, `raised` and the aqueduct class, a deck face, the removal) gives the same event from the canvas, the tool API and the skeleton file; a drawn wall, a declared raised way and a placed deck plot survive Regenerate (keep); `walk` with `raised` is bent to the points form with its note; each dry run returns the count badge | C | V-M3 |
| T-V7-55 | performance: the platform levelling ≤ 1 ms at the VILLAGE top; VS4 with a declared raised way within its 4.5 ms; the item-110 edit budgets of V07 §6 | C | V-M3 |
| T-V7-56 | the village rows compile: V11's compile checks T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 pass over every `v.` row of V07 §2.4 (V11's T-V11-0 run over them); every row names one family of V11 §3.4, one template family of V11 §3.6.1 whose template compiles for every band, a `deckOk` list, a `distribution` of the base's enum and a significance; every presence entry names only `PresenceWhen` conditions and a `PLaw`, and the class order has no cycle; every authored row's `to` is a class id, a `#tag` or a feature class of V11 §3.3.3; every supply cell compiles to a `SupplyEdge` whose good is a V11 §3.7.1 id; with a dossier government, its `villageSeat` class stands with at least one member at THORP, HAMLET and VILLAGE on 100 % of fixtures; every `v.` row carries a `label` (T-V11-4's display-cell check), the 25 labels distinct, and each row's `commonness`, compiled by V11 at step 5a, equals its roster share at VILLAGE recomputed from the compiled rows within 0.01 (J-V7.133) | C | V-M2 |
| T-V7-57 | the village's furniture (J-V7.118): across `B-VILLAGE` and the dossier fixtures at every village rung, 0 `statue`, `fountain`, `bandstand` and `monument` pins; every pin placed by a VS8 row (its row recorded in the pin's provenance), 0 by S11's furniture step (its trace); each open space carries at most one centrepiece and, where it carries the market, exactly VS8's stall count (V07 §3.10); 0 pins on a fair field; on the village-history fixture at every village epoch (run on M4's grow path at item 202's call points before M6-E and on V06's runner after): every housed household served by a well, pump or aqueduct delivery point within `pins.wellWithinM` under the coverage row's capacity, every market (a street market included) at VS8's stall count for the epoch's households and a closed market with 0 stalls, a new nucleus's open space with its centrepiece, 0 standing pins moved and 0 removed whose host stands — save step 2's stalls (the surplus as households fall, and a closed market's), an engine-placed centrepiece no one holds that a market cross replaced and a forced pin whose record the dossier removed — every pin whose host face an epoch tombstoned gone in that epoch (step 0), every housed household served after an epoch that took a well with its host or broke an aqueduct's delivery point, a `Roadside Shrine` quarter added at an epoch anchored on a shrine in that epoch and one added by an absorb anchored at the next village epoch, each new host's row pin (a cross, trough, maypole or centrepiece) the one a regeneration of the grown village places on that host; after the hand-off up the green made the market carries its stalls; after the hand-off down a shrunk town's standing statues, fountains and bandstands stand unchanged and no new one appears | C | V-M1 (the fair-field clause at V-M2; the village-history clause at V-M3) |
| T-V7-58 | item 111 at village rungs (T111-1 – T111-5's village clauses): on the arid set the share of households within `pins.wellWithinM` of water exceeds the non-arid baseline; an oasis stands only on an arid site unless drawn (T2 `ground`) or given by `oasis_water`; arid sites still draw rivers, ponds and coasts at the arid row's re-weighted shares (a rate `StatBarSpec` per water kind); the richest band's mean distance to reliable water below the middle band's on arid seeds; the density's `wp` term leans the dwellings toward reliable water on arid seeds (their mean `pw` above the box's); an oasis village's heart, `site water` test and wells read the oasis as water, its spring never a well access, its shore a barrier the palisade never fences; with the oasis chance, `w_water` and the climate cell at their neutral values the output is byte-identical to the build before item 111 (a `NoOpPin` — the `item111.water` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M1 seat) | C, O | V-M1 (the dossier clause at V-M2) |
| T-V7-59 | item 113 at village rungs (the village halves of T113-1 and T113-3, and T114-9's village clause; run on V06's replay engine): a CITY-to-VILLAGE history fixture shows walls and street lines beyond the village's fabric, hollow ways on the old streets, an oversized church and a kept market square, with a `VillagePlan` created at the replay's hand-off down epoch and the dossier's present population and institutions matched exactly; a symbolic-peak fixture (a village with a ruined "City walls and gates" record) sizes its remnants inside CITY's range at `history.symbolicQuantile`, each remnant fact `symbolic`, and a fixture with no evidence has no peak; a refounded-village fixture over a ruined town reuses the old roads (the share of new way length within `refound.traceReachM` of a ruined way trace above the same site's unrefounded baseline), rebuilds its ruined bridges where its trackers cross, crosses the ruined wall only at gate gaps and breaches save a through road's cut (the run set `dismantled` over its width, V07 §3.12a (4) (d)), with 0 violations of §5.3's wall-crossing row (T114-9), and races slots over ruined footprints above their random baseline; a former city buried past `history.burialYears` lies under the village as V04's buried former settlement in maintenance mode, a former hamlet's refounding lays none; the replay is byte-stable per seed and history on the five engines; with the replay off the output is byte-identical (a `NoOpPin` — the `item113.history` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat) | C, O | V-M3 (with M6-E) |
| T-V7-60 | the edge suite (V07 §3.17): each clause runs its V07 §3.17 rows on their edge fixtures at THORP (P = 1, 40), HAMLET, VILLAGE (P = 1 499), under `VG` and each switch off, and through save, load, undo, redo, regenerate and migrate — each case ending in its row's defined outcome and reported rung, with 0 crashes, 0 hangs, 0 lost records, 0 whole-map retries and 0 silent changes (every changed output named in the report). The clauses: **(a)** the records, the request block and the pipeline; **(b)** S0, VS1 and VS2; **(c)** VS3, VS4 and the raised way; **(d)** the open space, VS5, VS6 and levelling; **(e)** the hinterland, the wharf, ends and pins, and deck plots; **(f)** the dossier readings, the epochs and hand-offs, and the failure ladders; **(g)** the underground; **(h)** editing, the clerk, rendering, labels and exports, Find and the crisis looks; **(i)** every combination row of V07 §3.17 (b). (Determinism's row is T-V7-18's, the one-time waits' T-V7-67's.) | C | (a), (b), (d) at V-M1, (a)'s landmark-part clause at V-M2; (c) at V-M1, its raised-way row at V-M3; (e) at V-M2, its deck-plot row at V-M3; (f) at V-M2, its epoch and hand-off row at V-M3; (g) at V-M2u; (h) at V-M3; (i) each row at the later milestone of the two mechanisms it joins |
| T-V7-61 | the village `WhyProvider` (item 270's completeness test over V10 §3.9's owed kinds for V07): a `why` on every `VillagePlan`, `VillageField` and `VillageEnd` of the bench answers in both modes with at least one row whose key resolves in V09 §4.9's catalogue (`info.village.*`, V07 §4.5); the heart's terms recomputed equal VS1's recorded score; a `dossier`-sourced form and an `edit`-sourced heart answer with their sources; a superseded plan answers with its superseded line; the provider reads committed records only (a pending proposal changes no answer) | C | V-M3 |
| T-V7-62 | item 114 at village rungs (item 114 (g)'s village clauses; takes T114-1 – T114-8's village clauses): a poor, threatened palisade fixture shows patched runs in its kind's `walls.patchMaterials` rows (V11 §3.25.3), each drawn by its row's `look` role, and no robust rebuild; a rich, threatened one rebuilds its breached runs robust; a safe one wears through `worn` to `breached`; recovery replaces patches oldest first; no run changes condition without a sustained driver (no flicker across two epochs at a threshold); every state distinguishable in greyscale at its bands; a dossier village's generation-time conditions follow its readiness and wealth by §7.7's DR41; `VG` draws every run standing; with need and means at neutral values the existing neglect and repair behaviour is reproduced (a `NoOpPin` — the `item114.condition` registration of the palisade goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat); a patched run exports as a wall and a breached one as an opening; `repairWall` with a material is undone by its inverse | C, O | V-M2 (generation), V-M3 (epochs, with M6-E) |
| T-V7-63 | item 115 at village rungs (item 115 (f)'s village clauses; takes T115-1 – T115-4's village clauses): rich THORP, HAMLET and VILLAGE fixtures at the wealth maximum have no `H`, `U`, court, tower or turret dwelling but the manor; at most one manor, only with a lord or when specified (V08 §3.16 (3); none at THORP and HAMLET otherwise); a dossier-specified grand building — a manor record, and at a HAMLET a `castle` or `tower_house` record, a town class playing itself (V07 §3.11 step 3) — and a hand-placed manor keep their design, the clerk noting the excess; a village grown into a town builds its new grand buildings from that epoch, a shrunk town keeps its grand buildings as they stand; the manor count never rises with wealth (a wealth sweep at a fixed population and government leaves it unchanged); with every `grandeur.ceiling` row's `enabled` false (V11 §3.24.0's off form) `B-VILLAGE` is byte-identical to the build before item 115 — the `item115.off` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat (T115-4) | C | V-M2 (the class mix, the manor rule and the `item115.off` pin); the composition clause with V02's M6 (`notApplicable` before) |
| T-V7-64 | item 116 at village rungs (takes T116-1 – T116-4's village clauses): at THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) the zoom-out limit shows the whole territory frame with one stop of margin and no stop beyond it is reachable in the view; the pyramid draws every stop from the limit inward and none beyond; the first view unchanged; an epoch that grows the frame moves the limit; an export frames within it | C | V-M3 |
| T-V7-65 | item 117 at village rungs (item 117 (i)'s village clauses, (f2) included; takes T117-1 – T117-8's village clauses): the same village document hashes identically in all 52 weeks — the `item117.season` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat; every village surface (each great field by its slot, the strips, orchards, meadow, commons, green, gardens, ponds, the moat, the leat, the stream) has a season row in every week of every climate with no gap; an arid fixture never draws ice or snow; a cold fixture freezes the ponds and the moat before the leat's slow reach and the leat before the stream, and keeps open water at the mill race, the leat's take-off and springs; stooks only in the harvest weeks; in autumn a wood's rim crowns take several colours (their count per wood above a floor), the leaf cover's density non-decreasing through the leaf-fall weeks on the green, lanes, tofts, churchyard and roofs; a dossier village opens on its present week (its latest stamped tick), one with no stamped tick on the season control's midsummer; each week's look passes the contrast and colour-blind checks (item 112) | C | V-M3 |
| T-V7-66 | item 118 at village rungs (item 118 (h)'s village clauses; takes T118-1 – T118-6's village clauses): the same document hashes identically with decorations on and off and in every week; a festival shows exactly in its window's weeks; the same festival draws identically across views and exports (byte-stable tiles per seed); a THORP fixture shows only a garland or a bonfire at the heart, a HAMLET a maypole or a bonfire on the green and door garlands, a VILLAGE a maypole, church-lane bunting and the green's stalls and tables — no larger tier's kinds; staging lands on the named or keyed village place of §8.2's place table, else its kind's fallback; nothing blocks a gate or covers a label's keep-out; with no traditions and no preview, byte-identical (a `NoOpPin` — the `item118.festival` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat) | C | V-M3 (the dossier-window clause with V08's reading of `traditions`) |
| T-V7-67 | the one-time waits (item 119 (f)'s village clauses; takes T119-2 – T119-4's village clauses): on §12.1's reference machine, at THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499), each on its largest frame, generate, regenerate, opening a map from SettlementForge (the small-dossier fixtures), a dossier change applied, an epoch and the history replay (V07 §3.12a's fixture; each timed as V06's part of item 119 times it), every export format and a migration each complete within 10 s from the click to the complete result; every wait past 1 s shows V09 §4.21.9's progress, never an empty screen; every step slower than its §12 or V07 §6 target has its `perf.qualitySpend` row with its recorded gain (0 rows and 0 slower steps at shipping); V07 §6's edit and switch budgets and §12.5's frame budgets hold unchanged | C | V-M3 |
| T-V7-68 | Find at the village rungs (item 120 (k)'s village clauses; takes T120-1's and T120-4's village clauses): on THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) fixtures, with and without a dossier, the document hashes identically with Find on and off and turning every chip off restores byte-identical tiles — the `item120.find` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat; each chip's matches equal the gazetteer query's rows at the key — the `v.` classes by their labels and synonyms (a "farms" chip holding the village's farmsteads and the outlying ones), the dossier's names, the village, the ends, the field groups and V07 §5.3's places — and the list offers nothing the village lacks; Show gaps outlines exactly the ends (with one end or none, the village) holding no member of the chip's class and never a class its row sites outside the perimeter; at the township view every match has a pin or a count bubble; an epoch that opens a smithy lights it and one that closes its use darkens it in that commit; an end's chip reads 0 after the hand-off up and lights again after the hand-off down; under a player view the knowledge canary (T-V9-66's fixture read at a village rung) surfaces in no suggestion, count, glow or pin; the chips survive every band and layer change, a village epoch and an undo; at a scrubbed week whose frame is not the head, on a VILLAGE fixture whose later epoch opened a smithy, closed another's use and merged two ends, each chip's matches, the ends listed and Show gaps' units equal §11.2's listing at that week, re-evaluated within 100 ms of that frame being drawn, and the head's are back at the head; suggestions within 50 ms and a chip's glow within 100 ms at the VILLAGE top | C | the later of V-M3 and M5 (Find's milestone; risk (13)); its scrubbed-week clause at the latest of V-M3, M5 and V06's E6 (V06 §3.15.2's frames) |
| T-V7-69 | item 122 at village rungs (item 122 (g)'s village clauses; takes T122-5's and T122-6's village clauses): on THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) fixtures — with and without a palisade (one closing only by barrier arcs among them), a green, a market, an entry, an outlying farmstead, an arable field and an end — each look kind previewed at severity 0, 0.5 and 1 and, from M-SF, a dossier fixture carrying each mapped condition, among them a disaster whose rebuild Works begin on some of an end's buildings inside its weeks; and two test-side mutations of one of V07 §7's frozen small-dossier VILLAGE fixtures, each from M-SF — a calamity whose `targets` name uses on more ends than its severity's share k of the village's units, and a fire at severity 1 whose `targets` name a use on an end that no other end neighbours (V07 §5.6 (3)'s `neighbours`: an end parted from the rest by a water face or by land no plot of either touches), its order ending at that end before k, the harness asserting the end's isolation before the clause reads it: **(a)** each look's extent lies within its rung's `scale` cell, linear in severity, a camp the dossier sizes taking `areaPerHeadM2` × its heads within 10 %, and no siege at THORP or HAMLET draws a trench or earthwork line (T122-5); **(b)** 0 look elements on water, in a gate's passage (a palisade gate's opening and 4 m along its way each side) or over a label's keep-out, and no camp on the green or on a plot — a toft, a close, a croft, a plot of DR18's clusters (T122-6); **(c)** a disaster ruins whole units of `villageDisasterUnits` — the ends, or the toft groups of a village with no end — each unit's `DisasterUnit` fields as V07 §5.6 (3) reads them, the calamity's matched targets first, every building the look stands over (§10.2 (f): a building of a returned unit until V06 §3.22 (3)'s `crisisLookYields` turns true on it, a preview never handing over) drawing the ruined look, a building of a returned unit whose rebuild Works begin in the condition's weeks drawing its Works from that week, and none outside; a look scaled as a share of its place's n units at share s takes round(s × n) clamped to [1, n] where s is above 0 — a disaster's units the first max(k, \|`matched`\|) of its order, k that count, or all of a shorter fire order (V01 §3.16 (5)) — on a VILLAGE fixture whose calamity names more ends than k (every named end struck) and on a fire whose order ends before k (the shortfall reported); **(d)** each place reads as V07 §5.6 (2) states: a siege of a village with no walled stretch draws the blockade on its entries' ways, a palisaded one its camps beyond the walled stretches and its engines facing the weakest runs, then the gates; beast's torn sections only on a standing palisade, else watch-fires along the perimeter; famine bares every arable face, the meadow and the commons, its pens empty and the market's stalls shuttered; raiders burn the outermost outlying farmsteads, else the farm tofts farthest from the heart; the refugee camp on `campLand` by the main approach road's gate; the quarantine's marked doors and cordon in one unit of V07 §5.6 (3); **(e)** the answer to a `why` carrying the view (`opts.view`; §11.2's view-bound `why`) on an end of a disaster look's units and on a field a famine look leaves bare carries `info.crisis.ruinedFor` in the form V09 §4.21.12 (4) chooses (under a preview `ruinedForPreview`) while the look stands at the viewer's key, and none otherwise, an end every building of which has begun its rebuild's Works (the look standing over none of them, its `ruinTone` gone) among the none, a `why` without a view included; **(f)** an epoch, an edit or a hand-off that changes the ends re-derives the units in that commit, a look over a hand-off reads the rung in force, and under `VG` no look draws | C | V-M3 (the previews and the readings); the dossier clauses with V08's reading at M-SF; the disaster clause at the later of V-M3 and M5 (V01's `disasterSource`), the refugee camp's frontier clause at the later of V-M3 and M6-E (V06's `frontierFor`) (risk (14)) |

**Parity metrics** read from `baselines.json`'s VG rows (item 495; `referenceBuild` 19365073 = VG 1.6.9, §13.5's stamp),
generated research-side from the existing recordings (`captures/village/*`, `research/findings/profile-village.md` §3.3, §5 and
its addenda N1–N5): dwellings per village by tag set, the accepted share of frontage draws, the square's rim radius, trackers
per village (4–11) and steps per village (≈ 200), bridges and piers per water map, the palisade's kept lattice points (13–20)
and the model time per stage — V12's `vg.*` family, each metric `vg.<name>` (the accepted share `vg.acceptedShare`, the one a
register entry names, V07 §3.15). The village's panels are `PanelSpec`s on V12 §3.9's engine, their `D5Pair` variants V12's and
their reference rows `Baseline` rows of input `counts` or `geo` under V12's `'VG'` reference.

**Goldens and the one-time shift** (item 110; a legitimate change of outputs is stated, never silent). The village goldens are
re-recorded once, with the terrace and deck rows on, and item 110 is stated as the cause beside them: hilly and mountainous
fixtures gain house-platform walls and their stairs and ramps, fixtures with a landing and a pier gain pier heads at
`deck.headChance`'s rate; T-V7-52 pins that nothing else moved. Items 111 (the water pull at its temperate weight), 115 (the
manor rule) and the derived area per head (V07 §3.9 (1); the territory 1.1 % smaller) are stated the same way when their changes land: the goldens re-recorded
once each, the cause named beside them, their no-op pins (T-V7-58) and T-V7-11's clause pinning that nothing else moved.
=== END ===

=== REPLACE ## Integration notes ===
## Integration notes

The volumes-integration decisions this volume carries (`docs/volumes/_integrate.md`) are folded into the body at their homes:
**J-VI.1** and **J-VI.23** (clean-room) — the request field is `arableFactor` (V07 §2.7) and the VG slot rule's large-house
probability is stated in our words (V07 §3.8); **J-VI.16** — V04's `blockedBy 'rung'`, counted `v.parish_church`, maintenance
mode, ruin centre, well pins and `DigRule` rows are read at their V04 homes (V07 §1 (1), V07 §3.12, V07 §3.16), the span rule's
`country` reason keeps country spans open (V07 §3.5a (7); J-C4), V06's raised-way step runs only its lapse and repair at a
village rung (V07 §3.12) and the village cap is `rules.tiers.capPerSettlement` (V07 §2.4); **J-VI.17** — a toll bridge reads V08
§2.6b (3)'s rule at the village rung (V07 §3.1 (1)), the palisade's barrier arcs read V11's `walls.barriers` rows by their
`arcKind` (V07 §3.4 step 5) and its "show circuit" control is `LayerSpec.showCircuit` (V07 §3.4 step 7, V07 §5.1);
**J-VI.4** — no village tool refuses a declaration but where §7.1's dry-run outcomes refuse one (a meeting of a
wall-like structure and a raised way that §2.7's laws give no lawful shape among them, law 2 (c)), a raised stroke at a
village rung drawn as declared (V07 §3.5a (1), V07 §4); **J-VI.25** — the dossier trace reads deposits through
`site.deposits` to DR19 and W20 (V07 §1b).
=== END ===

