# design-B — sites, roads and autocorrect: the pipeline-first design (lane `sites-roads/design-B`, J393)

- **Lane:** `sites-roads/design-B` (fable; J393) — a designer under the owner's staffing rule J390 (Fable designs,
  judges and critiques; Opus reads and verifies). This file is a DRAFT design for amendments file t; it applies nothing.
- **Started:** 2026-10-18 05:24 UTC. Written as it goes.
- **The owner's words (J393, 2026-10-18, verbatim):** "make sure that sites have road access where appropriate, they
  are integrated into road infrastructure and that depending on the catalogue, where appropriate, their geography in the
  world map autocorrects to meet the coherence expectation."
- **Angle:** PIPELINE-FIRST — every rule placed in a stage or operator that exists (V13 W6, W7 (1)–(11), W8b (14)–(16),
  P1–P5, §3.11.4's charter roads, §3.14's cascade; V14 G1, G3, G5 (e)–(f), G8, E1 (4)), naming what each reads and
  writes; standalone and host-bound; edit events, undo, locality, locks, the stamp, the DM's verbs; determinism and
  identity; the host track under door 1.
- **Inputs read whole:** the five reader records (`read-v14.md` md5 `6d127498…`, `read-v13.md` `64637654…`,
  `read-base.md` `33635e21…`, `read-research.md` `d97b4fcc…`, `read-checks.md` `28609ac2…`; all 980 + 1 013 + 880 + 562
  + 1 268 lines) and the lane README (`eabd68cd…`); then the primary texts below, from byte-identical snapshots taken
  at 05:25 UTC (`scratchpad/sites-roads/snap-B/`, md5s in `md5-at-read.txt`).
- **Cite form:** `V14:<line>` = `docs/volumes/V14-sites.md` line at md5 `a1c6d7c2bf08595776b1f913765cf1cb` (3 208
  lines); `V13:<line>` = `docs/volumes/V13-world.md` at md5 `c8759307398388249547f71e1912feca` (4 452 lines);
  `base:<line>` = `docs/ARCHITECTURE.md` at md5 `b03ba26e4eedfa446d517280cd83e67f` (24 462 lines); `INDEX:<line>` at
  `39b0c51960df130cb068744dd2eb3ee6` (259); `SUMMARY:<line>` at `9d1422839ab63a3ec3bf6d13e3ea8265` (214); `brief:<line>`
  = `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` at `fc2520709752ef77f397ba7d6a89c169` (212). These are
  the md5s the readers read (unchanged at 05:25 UTC); J392 edits the live files, so the apply step re-verifies every
  fragment of §2 against the files as they then stand.
- **Standing rules obeyed:** read whole; no deferrals; the owner's words never re-judged; a reference, not a contract;
  one word, one meaning; determinism (no random or jitter term; ties by cell index then lexicographic id); J86's door 1
  closed (the host's simulator never reads a settlement frame's geometry; the world canon outside door 1, file r item
  926); file j items 131–141 (134 (a) the admissibility table, 134 (c) sites as destinations, 135 (a)–(e) scale
  coherence, 137 (c) locks hold geometry and anomalies are reported with the DM's choice never silently moved, 140 the
  M0 gate); V13 §1.3's settlement-first correction (the bare coherent minimum; the nearest lawful placement offered;
  anomalies reported; the DM's explicit verbs); V14 §3.4 (a) "A host-placed site (its record's position) is never
  re-sited" stands.

## 0 The owner's words, clause by clause — this designer's reading

The owner's words are the authority and are not re-judged; what follows is this seat's reading of each clause, where
it agrees with the lane README's reading, where it differs, and which readings must be the owner's (those are in §3).

| # | the owner's clause (verbatim) | this seat's reading | agrees with the README? |
|---|---|---|---|
| 0.1 | "make sure that sites" | **World sites** — V14's cards (`WorldSite`, the 21 kinds of V14 §2.5), the owner's item 132 "Persistent location" (forts, towers, ruins, temples, dungeons …). Never the base's S1 site or a bridge's crossing site (one word, one meaning; SW-34). Every attachment is covered, each where it stands: a `free` site in the world, an `inFrame` or `ground` site in a settlement's frame, a `surface` site on a plot, an `attached` site behind an anchor (whose "access" is its access record, not a road — V14 §2.3). | yes |
| 0.2 | "have road access where appropriate" | A **per-kind access row**: whether the site is joined to the road network at all, by a way of what class, from what reach, and what the join is (a spur to the nearest route; standing on the route; standing off every route). "Where appropriate" is read as **by kind, from the table**: a toll house stands on a road, a fort has a road, a mine a track, a hermitage a path, a hideout keeps off the roads, a cave has none — and by attachment: an `attached` site reads no access row, a `surface` site has its plot's access edge (base §4.7), an `inFrame` site is joined by the settlement's own ways. Editable like every rule table (item 134 (a)'s form). | yes (the README says "a per-kind access class") |
| 0.3 | "they are integrated into road infrastructure" | The join is **part of the one road network, not a decoration**: on a standalone world the spur is a `WorldRoute` laid by W7 and a `routed` site is a W7 seat; on a host-bound world a `routed` site is a position along the host's edge (W7 (11)) and a spur a map-tier route that is never a leg; the site's frame charter carries the spur as a road row so the site's own tracks meet it at the frame edge and its gate faces it; the encounter crop reads it as a way band; patrols count a garrisoned site on or at a route as a source; the travel law gives a spur time stations for the map's walking-time annotation; the lenses draw it in its class. Nothing of this reaches the host's simulation but through the existing offers (`routeFacts`, `patrolOffer`, the map feed's site offers). | yes |
| 0.4 | "depending on the catalogue" | **The kind rows** (`tables/sites/kinds`, V14 §2.5): the access row and the correction policy are **columns of the kind row**, so the rule depends on the catalogue by construction. The word "catalogue" is used nowhere in the volumes for the kind rows (read-v14 §"catalogue": V09 §4.9's message catalogue, §7.7's forms catalogue, V11's symbol catalogue). This seat reads the owner's "catalogue" as the list of site kinds the DM picks from (the kind rows, the dialog's kind list) and **not** V09's message-key catalogue — no geography could depend on message keys. The admissibility table (`tables/sites/admissibility`, keyed by context and kind) is read as the catalogue's other half: it decides which kinds exist where; the kind row decides how each joins. Flagged as the one reading that must be the owner's (§3 OQ-1), with no design consequence under the alternative. | yes |
| 0.5 | "where appropriate" (the second) | **Not every kind autocorrects, and not every correction is a move.** Per kind the correction policy is `snap` (the point moves at the drop, within the kind's reach, the bend named), `offer` (the point stays; the anomaly is reported with the nearest lawful placement offered — the DM's `takeOffer` moves it), or `report` (reported, no offer: the kind may stand unserved — a wizard's tower without a path). Three cases never move by the map: a host-placed site (V14 §3.4 (a), kept); a DM-placed devotion site (J384 (10): DM-placed only, `report`); a site under a settlement's frame (`inFrame`: the settlement's ground is one owner's — the site's join is the settlement's ways, never a world move). | yes |
| 0.6 | "their geography in the world map autocorrects" | **The site's placement (its point and bearing) is what autocorrects**, in the world document's `Placement`, by V13's own placement operators: at the drop's dry run the asked point is measured against the kind's expectation and, where the policy is `snap`, moved to the nearest coherent point within the kind's reach (a toll house onto the road's nearest station, a bridge fort onto the crossing), the ghost showing the corrected point and the DM accepting it (declared means held, V14 §4.1); beyond the reach, or under `offer`, the nearest lawful placement is offered as it is for a settlement. After acceptance nothing moves the site silently: a later change of the world (a route re-laid, a road the host demotes to hidden) raises a `PlacementAnomaly` with the DM's choice (item 137 (c)). This is **not** the settlement-first rule: a settlement never moves (the world bends to it); a site may move within its reach because a site is a point the world defines by its roads, and the owner's new words say so. The README reads the same ("the site analogue of V13 §3.11's placement coherence … made catalogue-dependent"). | yes |
| 0.7 | "to meet the coherence expectation" | **The expectation is the kind's, and it is a coherence term** of the placement's `CoherenceCost`: one new term `access`, computed for a site subject only, whose raw cost is 0 when the kind's access row is met at the point (on the route, a route within reach, off every route), and whose weight makes a missed expectation unlawful as a coast error is for a port (C13-26's precedent). Scored once at the placement edit and stored, never re-scored silently; the live reading after a world change is the anomaly. The purpose weights' `hard` terms (V14 §2.5) stay the siting expectation for a drop with no point; the access row is the expectation for a drop with a point, where today "a point drop takes the point as given" (read-v14 fact 116). | yes |

**Where this seat's reading differs from the README.** Nowhere in substance. Two sharpenings the README leaves open:
(a) the README names only `routed` and `attraction` as the existing per-kind road data; this design keeps both with
their landed meanings and adds the access row beside them (`routed` stays "a W7 seat"; it does not become the access
class — one word, one meaning); (b) the README's "autocorrects" is read as **the site moves, bounded, at the drop, and
is offered later** — not the world moving a road to a mis-dropped site, which on a host-bound world is barred
(J-RR.17: nothing moves a bound route silently) and on a standalone world would be the opposite of the owner's "their
geography … autocorrects".

**Readings that must be the owner's** (each in §3 with a recommendation): OQ-1 "the catalogue" = the kind rows; OQ-2
whether a DM-dropped site may be moved by the map at the drop (`snap`) or only ever offered; OQ-3 whether a `routed`
site on a host-bound world bends the host's edge through it (the landed W7 (11) text) or only joins it by a spur.

## 1 The design — pipeline-first

### 1.1 The rule in one paragraph

Every site kind row (`tables/sites/kinds`, V14 §2.5) gains a **road-access row** `roadAccess` — how the kind joins the
road network (`join`: `onRoute`, `byway`, `offRoute`, `none`), the class of way it needs, the reach within which the
expectation holds, and the correction policy when a drop misses it (`snap`, `offer`, `report`). The row is copied to
the card at the drop (as `attraction` and `routed` are) and read in three places that already exist: **V13 P1** (a
site pass of the coherence operator, one new `CoherenceCost` term `roadAccess`, which is the owner's "coherence
expectation" and the autocorrect at the drop's dry run), **V13 W7** (one new point (12), which lays the site's
**byway** — a `WorldRoute` of origin `byway` from the site to the nearest public route, never a leg — on a standalone
and on a host-bound world alike, and on a host-bound world lays a `routed` site as a **station** of the nearest host
edge: "a position along a route, never an end", W7 (11)) and **V13 P4** (the site frame's charter carries the byway
or the route the site stands on as a `roads` row, `forced`, so V14 G3 (c)'s hinterland tracks and G5 (e)'s gate meet
it at the ring — "integrated into road infrastructure"). After the drop nothing moves a site silently: a world
change that breaks the row is one of three new `PlacementAnomaly` kinds with the DM's `keep` / `takeOffer` (item 137
(c)). A host-placed site is measured and reported, never re-sited (V14 §3.4 (a) stands). Nothing of this reaches
the host's simulation but through the existing offers (`routeFacts`, `patrolOffer`, the map feed's site offers):
door 1 stays closed; a byway is never a host edge and enters no canon slot.

### 1.2 The road-access row — per kind

```ts
// a column of SiteKindRow (V14 §2.5) and a field of WorldSite (V14 §2.2); every cell {value, unit, provenance own, calibratable}
interface SiteRoadAccessRow {
  join: 'onRoute'|'byway'|'offRoute'|'none';   // calibratable: false (a key)
  class?: 'trail'|'track'|'road';   // byway: the byway's class (W7 (12)); onRoute: the least class of the route the site stands on (`road` admits highway); absent for offRoute and none
  reachM: number;                   // 'm': byway — the longest byway laid, beyond it the site is unserved; onRoute — the snap reach from the asked origin to the route; offRoute — the least distance from every public route; none — 0
  correction: 'snap'|'offer'|'report' }   // calibratable: false (a key): what a miss at the drop does (V13 §3.11.1's site pass)
```

| kind | `join` | `class` | `reachM` (m) | `correction` | why (own) |
|---|---|---|---|---|---|
| `fort` | byway | road | 3 000 | offer | a garrison rides its road; the DM's ridge stands, the nearest ridge by a road is offered |
| `tower` | byway | trail | 2 000 | report | a wizard's tower may be pathless; a path where one is near |
| `temple` | byway | track | 3 000 | offer | pilgrims walk a track |
| `shrine` | byway | trail | 1 000 | report | a wayside or a hilltop shrine |
| `manor` | byway | road | 2 000 | offer | a market in small (never `free`: `inFrame` only, V14 §2.5) |
| `guildhall` | none | — | 0 | report | urban only: its plot's access edge (§4.7) |
| `ruin` | byway | trail | 2 000 | report | stone is robbed along what track is left |
| `cave` | none | — | 0 | report | a feature of the ground |
| `mine` | byway | track | 4 000 | offer | ore is carted |
| `hideout` | offRoute | — | 300 | offer | kept off every public route; dropped on one, the nearest concealed cell is offered |
| `crypt` | none | — | 0 | report | below ground |
| `cellarComplex` | none | — | 0 | report | below ground |
| `sewerLair` | none | — | 0 | report | below ground |
| `dungeon` | none | — | 0 | report | a dungeon's mouth is where the DM put it |
| `camp` | byway | trail | 500 | report | a camp by a road gets a path; off it none |
| `battlefield` | none | — | 0 | report | the ground remembers, nothing is built |
| `graveyard` | byway | trail | 1 000 | report | a path to the graves |
| `watchpost` | byway | track | 2 000 | offer | a garrison's round trip (`tauMilDays.watchpost`) runs on a track |
| `hermitage` | byway | trail | 2 000 | report | a path, or none |
| `bridgeFort` | onRoute | road | 500 | snap | stands at the route's river crossing: snapped to the nearest crossing station |
| `tollhouse` | onRoute | road | 500 | snap | the gatehouse astride the road: snapped to the route's nearest station |

**By attachment (the row's readers).** `free` (a site in the world): the whole row, at P1's site pass and W7 (12).
`inFrame` (a site with a ground policy inside a settlement's frame): the row's `join` and `class` only — read by the
settlement's own ways (§1.10); `reachM` and `correction` are not read (the settlement's ground is one owner's and the
site never moves in it). `ground` (camp, battlefield, graveyard as markers): nothing — a marker has no placement.
`attached` (levels behind an anchor): nothing — its access is V14 §2.3's access record. `surface` (a building on a
plot): nothing — its plot's access edge (§4.7's guarantee). A **border post** accepted from W8b (16)'s proposal
(`postKind` fort, bridgeFort, watchpost, tollhouse) is a `dropSite` whose request **states** `roadAccess` with `join:
'onRoute'` and the proposal's route class, overriding the kind row (`SiteRequest.roadAccess?: Stated<SiteRoadAccessRow>`,
stated or default — never derived: G2 adds no rule for it). A `routed` card (V14 §2.5's column, unchanged in meaning: a
W7 seat) is joined by seating on a standalone world and by a station on a host-bound one (§1.4); its row's `join` is
read only where seating or the station fails (no host edge within reach): then it joins by its row as any site.

### 1.3 Where each rule runs — the stages and operators that exist

| stage or operator (existing) | the new reading | reads | writes | standalone | host-bound |
|---|---|---|---|---|---|
| V14 G1 (admissibility) | nothing new: the row is by kind, the context by G1 as today | — | — | = | = |
| V14 G2 (the request) | `SiteRequest.roadAccess` stated → the card's row; else the kind row's (default) | the kind row; the request | `WorldSite.roadAccess` (declared, in the model digest) | = | = |
| V14 G3 (a) → **V13 P1, the site pass** (§3.11.1) | `coherence(world, site, origin, bearing)` for a site subject measures one term, `roadAccess` (+ `dossier` for a host-placed site); the bearing is derived from the join, not searched; `snap` moves the asked origin in the dry run (`bend.site.roadAccess`); `nearestLawful` for a site returns the three nearest lawful points by the join's own search | the card's row; the route layer at the week (W7 (9)); the purpose row's `hard` terms (`offer`/`offRoute` offers) | `Placement.coherenceCost` (the `roadAccess` term, scored once); the dry run's ghost and bend | runs | runs (the host's edges are the routes read; a host-placed site: measured only) |
| V13 P4 (§3.11.4 (6)) | a site frame's charter `roads` carries the byway or the stood-on route at the ring, `forced`, with `toward` the next host settlement along the joined route (never a site) | the route layer (the byway among them) | `FrameCharter.roads` for the site frame; the transient `charterFor` for a crop frame (E1 (4)) | = | = |
| V13 P5 (§3.11.5 (4)) | three anomaly kinds against the card's row, derived at every read of the placement card and at the cascade: `siteOffRoute`, `siteUnserved`, `siteNearRoute`; choices `keep` (default), `takeOffer` (never on `hostLocked`) | the row; the route layer at the week | `PlacementAnomaly[]` (derived, never persisted) | = | = (a hidden host road counts as no public road, W7 (9)) |
| V13 W7 (12), new (§3.8) | lays every site's byway after the passes (standalone: after (5); host-bound: after (8)'s edges and (9)'s changes); lays a `routed` site as a station of the nearest host edge within `siteStationReachM` on a host-bound world | every site placement's card (`roadAccess`, `routed`) through R-V14-1's resolver; the network at the week; the cost law; `world.routeLay` | `WorldRoute`s of origin `byway`; a host edge's dated lay version (the station); the `routes` layer | a byway from each `byway` site to its nearest public routed cell; a `routed` site is a seat (1) | the same byways over the host's network; a `routed` site a station of the nearest host edge, else a byway |
| V13 W7 (11), unchanged | legs end at settlements; a byway is not a leg; a station site changes a leg's geometry and effort, never the count | — | — | — | the mechanism is now (12)'s station |
| V13 W8b (14) (§3.9) | the patrol source "along the segment" includes a garrisoned site joined to the segment by a byway, its round trip measured from the junction plus the byway's effort twice; a byway is no patrol segment | the byways; `PolitySite` | `PatrolCadence` (unchanged record) | = | = |
| V13 §3.14.2 step 5 (world) | "W7's byways (a byway re-laid where its joined route moved or its site's placement changed, (12))" joins the consumers | the dirty set | the byways; the anomaly readings | = | = |
| V14 G3 (c), G5 (e)–(f) | the site frame's hinterland tracks join the enclosure's gate (G5 (e)'s forced `GateSite` on the approach side) to the charter road's station at the ring (the through-road contract, §4.3 *Result*; BCR-V13-30 read for a site frame); an `onRoute` site's route runs through its gatehouse (two ring crossings, two forced gates — the toll house's `entrances` 2) | `Recipe.charter.roads` | the site document's ground ways | = | = |
| V14 G5 (b) 2 | "the side facing the nearest route" → the side facing the byway or the stood-on route (the approach side) | the charter's `roads` | the entrance's target point | = | = |
| V14 G8 (g) (`inFrame`) | the gate is joined to the host's ways by the row's `join` and `class` (§1.10) | the row | a hinterland way of the class (S12a) or a `worldSite` `Destination` (S4) | = | = |
| V14 G8 (e) (adoption) | the site's byway is tombstoned; the settlement's charter `roads` and W7's legs for the new seat take over; the site's gate is the `worldSite` destination as today | — | — | W7–W8 over the landmass (as today for a new seat) | the host names the new seat's edges (as today) |
| V14 E1 (4) (iii) | the crop frame's "charter's `roads` as way bands" include a byway (a `path` or `track` band) | the transient charter | the crop's `fixed` faces | = | = |
| V13 §3.11.6 the port | `routes(world)`, `routeFacts`, `patrolOffer` and every canon slot exclude origin `byway`; the map feed's DM-placed site offers carry the site's corrected point and its byway's polyline as presentation | — | — | — | the host never reads a byway as an edge |
| V13 W9, §5.1 `routes` layer | a byway drawn in its class's style (`trail` dotted, `track` dashed, `road`), "byway" on hover | the routes | the view | = | = |

### 1.4 Standalone versus host-bound

| question | standalone world | host-bound world |
|---|---|---|
| which routes exist | W7 (1)–(5): seats (placements, proposals, `routed` sites), Urquhart, A\*, classes, trails | exactly the host's genesis edges and lived changes (W7 (8)–(10)); the map chooses no leg |
| a `routed` site | a seat of rank 0 (W7 (1)); its edges are its roads | a **station** of the nearest host edge within `routeLay.siteStationReachM` (2 000 m, own): the edge re-laid as a dated lay version (W7 (10)) through the site's cell when the detour's effort ≤ `routeLay.siteStationMaxDetour` (1.5, own) × the edge's effort without it, the dry run naming the edge, `timeDelta` the leg (`W_TRAVEL_BAND_CROSSED` as any); else the site joins by its row (a byway) and is reported `siteUnserved` only when that fails too |
| a `byway` site | a byway to the nearest public routed cell within `reachM` (one Dijkstra, the `existingRoute` discount) | the same, over the host's edges; the byway has no host key, is never in `routes(world)`, `routeFacts`, `patrolOffer` or the canon |
| an `onRoute` site | snapped to the nearest station of a route of class ≥ `class` within `reachM` | the same against the host's edges (a hidden host road is no public road); the route itself never moves (J-RR.17) |
| an `offRoute` site | the expectation against every public route | the same; a hidden host road is no public road, so a hideout on a hidden road is coherent |
| after the drop | nothing moves silently: the anomaly readings with `keep` / `takeOffer` | the same; a host-placed site (`Placement.hostLocked`) `keep` only |
| the site frame's charter | the byway or the stood-on route as a `roads` row, `forced` | the same, `hostKey` on the stood-on route's row, none on a byway's |
| re-lays | a byway follows its site's placement and its joined route's lay version (W7 (12)); W7–W8 over the landmass when a `routed` site is dropped (a new seat, as today) | a byway as standalone; a station's edge a dated lay version the host adopts as a live overlay (W7 (10)); nothing else moves |
| what the host reads | — | `routeFacts`'s effort of a re-laid edge (optional, its switch); `patrolOffer`'s nearest garrisoned site key (existing); the map feed's site offers (existing, + the byway's polyline as presentation); nothing of a site's frame |

### 1.5 Determinism and identity

* **No draw anywhere.** P1's site pass and W7 (12) draw nothing. Ties: the nearest routed cell by (cost × 1 000
  rounded, cell index) — W7 (4)'s rule; the nearest station of a route by (plan distance, the route's lineage key,
  the lower station); the nearest host edge by (straight cost, the host key, codepoint order); `nearestLawful` for a
  site by (plan distance, cell index); the three anomaly kinds in a fixed order on the card (`siteOffRoute`,
  `siteUnserved`, `siteNearRoute`). `world.siting` and `place.search` stay reserved ids; `world.patrol`'s key never
  enters a byway (a byway is no segment).
* **Identity.** A byway's creation key is (`route`, the site placement's lineage, `byway`, `land`) — one byway per
  site placement, its id kept across every re-lay (a re-lay bumps `layVersion` as any route's, the former course a
  version); its anchor for §6.3's matching "a byway by its site". `WorldRoute.a` is the site placement's id, `.b` the
  joined route's id, `.byway: { site; joins; atStation }` names the junction vertex on the joined route. A station
  site adds no record: it is a vertex of the host edge's new lay version (`WorldRoute.polyline`), the edge's id and
  host key unchanged (J-RR.6: identity (pair, mode)). `WorldSite.roadAccess` is a declared field of the card (in the
  model digest, moved only by events); `Placement.coherenceCost.terms[roadAccess]` is scored once at the placement
  edit and stored (as the `territory` term is: never re-scored silently); the anomalies are derived (never persisted,
  V13 §2.4). No arena digest moves: a site's placement, byway and anomalies live in the world document (T-V13-2,
  T-V14-25, SW-11 hold). Integer `WorldPointCm` everywhere; integer metres into any kernel predicate (SW-16).
* **Byte-identity bars.** Two runs of a drop, a byway lay, a station re-lay and an anomaly read are bit-identical
  on the five engines (T-V13-57, T-V14-34); a byway's polyline is a pure function of (the site placement, the network at
  the week, the cost law, `world.routeLay`).

### 1.6 The edit events, undo, locality, locks, the stamp and the DM's verbs

* **No new edit kind.** The drop is V14's `dropSite` (its dry run now carries the snapped origin and the byway as a
  ghost); the move is V13's `setPlacement` on the site subject; the DM's acceptance of an offer is the existing
  `ConflictAction` `takeOffer { offer: n }`, which issues that `setPlacement`; `keep` keeps. `setAttr` gains the card
  path `site/roadAccess` (and, closing a gap read-v14 found, `site/attraction` and `site/routed`, stated editable at
  V14 §1b.1 and §2.2 but absent from §4.2's list). `placeFrame` admits `frame: Uuid | { site: Id }` so a site document
  generated standalone can be placed settlement-first as V14 §3.4 (a) and R-V14-11 already say (read-v13 found no
  such form declared).
* **The precedence stamp.** A dropped site is placed world-first (`requestCharter` with a site subject): stamp
  `world`, the world ladder (dossier > the DM's locks and drawn constraints > the charter's boundary facts > …). The
  accepted origin is a **declared** fact (V14 §4.1: "declared means held, §7.2") — above the charter's roads in the
  ladder — so after acceptance a road that moves never moves the site: the mismatch is an anomaly, a reading. A site
  document placed later (`placeFrame` with a site subject) is settlement-first: stamp `settlement`, P1's full terms
  over the site frame's ring plus `roadAccess`, P2–P3 over a band of `blendBandM` capped at the site frame's own side
  (one fine cell at least), P4, P5; the correction policy applies to the asked origin exactly as at a drop.
* **Locks.** The accepted origin is held; `Placement.hostLocked` (a host-placed site) refuses any origin edit
  (`refuse.place.hostLocked`) and withholds `takeOffer` as it withholds `moveTown`. No new lock.
* **Undo.** A drop's undo removes the card and its placement; the byway, a derived route, goes with the placement
  (V13 §4.4: the former placement restored); a `setPlacement`'s undo is V13's; a station's edge keeps the former lay as
  a version (W7 (10)), the undo restoring it; a `setAttr site/roadAccess`'s undo the inverse, the byway re-laid at W7
  (12)'s next run. A host input (a bound edge, a `network` change) is never a user's undo target (V13 §4.4).
* **Locality** (V13 §4.3 and V14 §4.7, new rows): `dropSite` (free) / `setPlacement` on a site → P1's site pass → P4 →
  P5 → W9 (the glyph) → W7 (12) over the site's byway and, host-bound, the one host edge a `routed` site is a station
  of; standalone, W7–W8 over the landmass when the site is `routed` (a new seat, as today); pinned: every other route
  and every frame. `setAttr site/roadAccess` → the card; W7 (12) over that site's byway; P5's readings. A route's
  re-lay (a `network` change, a `setAttr(class)`, a seat removed) → the byways joining it (the cascade's step 5 and
  §3.14.3 row 13). `editTable` on the kind rows → new drops only (a card is declared; V14 §4.7's table row).
* **The DM's explicit verbs** stay the two: `mirrorFrame` and `worldWins` change a settlement; a site moves only by
  `setPlacement` (its own `takeOffer` sugar) and never by the map after acceptance — the one exception is the
  **snap at the dry run**, before anything is declared, shown as the ghost and named as a bend (the owner's
  "autocorrects"; OQ-2).

### 1.7 The anomalies and the DM's choices

| kind (new `PlacementAnomaly.kind`) | raised when (a derived reading at every read of the card and at the cascade's step 5) | the DM's choices | never |
|---|---|---|---|
| `siteOffRoute` | an `onRoute` site's nearest public route of class ≥ its `class` lies beyond `reachM` (the route re-laid, demoted below the class, abandoned, or graded hidden) | `keep` (default); `takeOffer` (the nearest lawful station re-searched, up to three) | on `hostLocked`: `keep` only; the site is never moved by the map |
| `siteUnserved` | a `byway` site has no public routed cell within `reachM` (none at the drop under `offer`/`report`, or the route gone), so no byway is laid | `keep`; `takeOffer` (the nearest cell within `reachM` of a qualifying route where the purpose row's `hard` terms are non-zero) | as above; under `report` the kind stands unserved and the reading is a notice, not a cost |
| `siteNearRoute` | an `offRoute` site has a public route within `reachM` (a hideout on a highway; a road chartered past it later) | `keep`; `takeOffer` (the nearest cell ≥ `reachM` from every public route with the hard terms non-zero) | as above |

The readings are "reported readings, never annotations" (as `roadToNowhere` and `roadUnmatched` are, V13 §2.2):
drawn as the `anomalies` layer's notice pins, listed on the placement card and in the clerk's `why placement`;
`W_PLACE_ANOMALY` gains `takeOffer` beside `keep` and `worldWins` for these three kinds (a `worldWins` on a site is a
re-materialization, never a move, SW-19). At the drop the dry run's outcome is one of: the bend (`snap`, the origin
moved within `reachM`, `bend.site.roadAccess` named); unlawful with offers (`offer` missed: the `roadAccess` term's raw
cost 2 × weight 3 = 6 > `lawfulMax` 4 — `W_PLACE_NO_LAWFUL` with `keep`, `takeOffer`, `cancel`, V13's existing row);
lawful with a reading (`report` missed: raw 1 × 3 = 3 ≤ 4; the anomaly on the card). Every number is a table cell
(`place.coherence.weights.roadAccess` 3; the row's `reachM`; `lawfulMax` 4).

### 1.8 The host-placed site

V14 §3.4 (a) stands: "A host-placed site (its record's position) is never re-sited." Its placement is created by
`requestCharter` with `author: 'host'` (V14 Q2's `WorldSiteRecord`, DR-V14-1 through V13's `Placement`) and carries
`hostLocked`; P1's site pass runs with the `dossier` term ∞ against any origin other than the host's — so the
asked origin is kept whatever the row says, flagged, and the `roadAccess` reading (`siteOffRoute`, `siteUnserved`,
`siteNearRoute`) is reported with `keep` alone; W7 (12) still lays its byway or station (the road may come to the
site; the site never goes to the road), and the reading reaches the host only as the map feed's site offer (door 5
presentation; H31). Until the host's record exists every site is map-tier and the DM's (V14 Q2).

### 1.9 The site frame's charter roads (the frame charter for the site frame)

`charterFor(world, placement)` for a site subject fills `roads` as for a frame (§3.11.4 (6)) over the site frame's
ring: a `byway` site's byway crosses the ring once (its `class` mapped as any: trail → `path`, track → `track`,
road → `primary`; `forced: true` — the site's one road is always the gate's road; `toward` the next host settlement
along the joined route from the junction, with its effort; `hostKey` absent); an `onRoute` site's route crosses the
ring twice (in and out), both rows `forced`, `hostKey` the host edge's on a bound world. V14 G3 (c): S1 and the
hinterland unit read `charter.roads` as a settlement frame does (BCR-V13-30 and §3.11.4's "S1's ways-at-the-edge
take `charter.roads`" read for a site frame): the hinterland unit's tracks run from the enclosure's gate — G5 (e)'s
`GateSite` `forced: true` at the entrance unit on the approach side, the approach side now the charter road's bearing
(G5 (b) 2) — to the charter road's station at the ring, the through-road contract of §4.3 *Result* ("through-roads
continue to the context margin with their bearings"; M0-c-03's test); a toll house's two gates sit astride the
route's two crossings (the kind row's `entrances` 2 and its grammar "the gatehouse astride the road" need no change).
A site frame's track that cannot reach the ring (water between, no deck) is S4's F-ROUTE `unserved` (reported, never
silent) and the placement card reads `roadUnmatched` (an existing kind). The crop over the site's ground
(`site.ground` profile) shows the track; a crop beside the site on the byway reads the `road` profile.

### 1.10 `inFrame` sites: joined by the settlement's own ways

An `inFrame` site (a site with a ground policy dropped inside a settlement's frame; adoption at the drop, V14 §3.9
(g)) has no placement and never moves; its join is the host's: by its row's `join` and `class`, (a) `byway` of class
`trail` or `track` → the hinterland unit lays a way of that class from the site's gate (the reservation's `GateSite`)
to the nearest way corridor, exactly as §4.9's decoration table's `trail` row ("a row with `trail` links its
decoration to the nearest way corridor by an L3 `path` face") and the outside plots' `driveway` do, inside §7.3's S12
row round the reservation (V14 §4.7's `inFrame` locality row unchanged in scope); (b) `byway` of class `road`, or
`onRoute` → the site's gate is a `Destination` of kind `worldSite` for S4's router (BCR-V14-13's "for S4 after adoption
only" widened to "after adoption, and at an `inFrame` drop of class `road`"; BCR-V14-26), S4's §7.3 row re-routing
only the arterials whose destination moved; (c) `offRoute` and `none` → nothing is laid (a hideout in the hinterland
is `attached`, levels only, V14 §2.5). The same holds for an adopted site after G8 (e) (the destination rule as today).

### 1.11 The encounter crop

E1 (4) (iii) — "the charter's `roads` as way bands of their class" — now includes a byway (a `path` or `track` band
from `corridorUnion`), so a click on the track to the mine shows the track; the `road` profile row ("within 15 m of a
way or route", V14 §2.5) matches it. A station site's re-laid host edge is the route the crop reads at that point
(`WorldFacts.route`). The crop reads the polity at the point and week as today (patrols at a byway: none, §1.12).
Nothing is written (E1 (5)).

### 1.12 Patrols and the travel law

A byway is **no patrol segment**: `PatrolCadence` is per (route segment, power) over the network's legs (W8b (14));
a garrisoned site joined to a segment by its byway is a **source** for that segment ("the power's nearest garrisoned
seat, fort or watchpost along the segment" → "along the segment, or joined to it by its byway, the round trip then
measured from the junction plus the byway's effort twice"), with its `garrisonBand` as today (J-V13.97); a station
site lies on the segment and is a source as today. `patrolOffer` names "the nearest garrisoned seat or site" as today
(its key). The travel law: a byway's `stations` are evaluated as any route's (W7 (7)) for the map's own walking-time
annotation ("twenty minutes on foot to the shrine", labelled, `derivedTime`); never sent to the host; a station's
edge carries its new effort in `routeFacts` and `timeDelta` (T-V13-43's clause as today). An army's or a column's
path never takes a byway (the host's movers run on the host's legs; a byway is not a leg).

### 1.13 The lenses and the view

The `routes` layer (V13 §5.1) draws a byway in its class's style, "byway" on hover, lengths in km as any; the
`anomalies` layer carries the three kinds as notice pins; the `placements` layer and the placement card show the
`roadAccess` term beside the others; the patrols lens draws no byway (no cadence); the sway lens is unchanged (a
garrisoned site a claim point as today); the trade lens's "likely road" is the host's path (unchanged). T6 `place`
shows the snapped origin as the ghost with the bend's sentence and the byway as a ghost polyline.

### 1.14 Performance (every number a register row)

`WORLD-16` (new; §6's register): P1's site pass ≤ 5 ms (one route-index query per row; the three nearest stations by
one scan of the routes' spatial index); a byway's lay ≤ 20 ms (one Dijkstra to the route set bounded by `reachM`'s
disc — ≤ π × (4 000 ÷ 250)² ≈ 800 fine cells at the province rung, ≈ 50 at the continent's); a station re-lay = one
host edge's A\* (W7's row, the `maxCostFactor` ellipse); the anomaly readings inside the existing "anomaly list ≤ 5
ms". V14 §6's G3 (free-standing) row gains "+ V13's `WORLD-16`". Pre-decided fallback: a byway laid on the coarse
grid (W7's SP-W7 fallback) where the fine lay misses its budget.

### 1.15 The failure ladder (F-PLACE for a site; F-SITE's G3 row)

| detection | ladder, in order | report |
|---|---|---|
| the row missed at the drop, `snap` | the origin moved to the nearest lawful station within `reachM`, the bend named | `bend.site.roadAccess` (V09's catalogue) |
| the row missed, `offer` (or `snap` with no station within `reachM`) | unlawful: the asked origin kept, the three nearest lawful offered | `W_PLACE_NO_LAWFUL` (`keep`, `takeOffer`, `cancel`) |
| the row missed, `report` | lawful: the asked origin kept | `W_PLACE_ANOMALY` with the kind, `keep` (`takeOffer` offered) |
| no public routed cell within `reachM` for a byway | no byway laid; the site stands | `siteUnserved` |
| a station's detour over `siteStationMaxDetour` | no station; the site joins by its row | the dry run's note |
| the site frame's track cannot reach the ring station | S4's F-ROUTE: `unserved` | `roadUnmatched` on the card |
| a host-placed site's row missed | kept (never moved) | the reading, `keep` only |
| a world change breaks a met row | the reading at the cascade | `W_PLACE_ANOMALY`, the kind |

No whole-site retry; nothing silent; a refusal only where the host's lock or the dossier stands (item 101 R2).

### 1.16 The host track under door 1

No new read of the map by the host's simulator. The host's track gains one row, **H31** (with M-W2's route step and
V14's M-SITE-F; waits on H13, H16 and V14 §11 Q2): the host's site record (`WorldSiteRecord`) carries its position as
the host's own fact — never re-sited by the map, the map's `siteOffRoute` / `siteUnserved` / `siteNearRoute` readings
reaching it only as the map feed's site offers for its own command; its `routeFacts` per host edge carry a station
site's detour effort as any lay version's (H16's route facts as overlays); its adoption of a DM-placed site (H28's
command for a devotion site, V14 Q2's record for any) takes the map's corrected point (`placeOf`) and the card's
`roadAccess` row as data; nothing of a site's frame geometry crosses (door 1 closed; the world canon outside it by
file r item 926 carries no byway — the sites slot stays the host's satellite ground).

### 1.17 Tests (T- rows in V13 §7's and V14 §7's form)

| id | family | bar | tier |
|---|---|---|---|
| T-V13-57 (new) | sites and roads (the owner's word of 2026-10-18) | on B-WORLD-lite with V14's B-SITE kinds dropped by a script: (a) a toll house dropped 300 m off a road is snapped onto its nearest station at the dry run with `bend.site.roadAccess` named, and at 600 m is kept unlawful with three stations offered (`W_PLACE_NO_LAWFUL`); a bridge fort snaps to the route's crossing station; (b) a mine 2 km from a track gets a byway of class `track` whose `a` is the site placement, `b` the joined route, `atStation` the junction vertex, its polyline on land cells, its creation key (`route`, the site's lineage, `byway`, `land`), re-laid with the same id when the joined route re-lays; a mine 5 km from every route gets none and reads `siteUnserved` with `takeOffer` offering three cells within 4 km of a route whose `ore` term is non-zero; a tower 5 km from every road reads `siteUnserved` as a lawful reading (raw 1) and stands; (c) a hideout dropped on a highway reads `siteNearRoute`, `keep` keeps it, `takeOffer` moves it ≥ 300 m off every public route by one `setPlacement`; (d) on the mock host: a `routed` fort dropped 800 m from a host edge becomes a station of it — the edge's new lay version passes through the fort's cell, the host key and id unchanged, the leg count unchanged, `timeDelta` naming the leg, `W_TRAVEL_BAND_CROSSED` where a band is crossed — and at 3 km joins by a byway instead; a byway appears in no `routes(world)`, `routeFacts`, `patrolOffer` or canon slot (a schema lint over the port's outputs); a hidden host road counts as no public road for every row; (e) a host-placed site (`author: 'host'`, `hostLocked`) 400 m off its road is kept, reads `siteOffRoute` with `keep` alone, and W7 (12) lays its byway; (f) a garrisoned fort joined by a byway is the patrol source of the segment it joins and the cadence's round trip includes the byway's effort twice; a byway carries no `PatrolCadence`; (g) every outcome bit-identical on the five engines and across permuted drop order; (h) undo of each drop removes the byway with the placement and restores a station's former lay; (i) the eleven anomaly kinds each on a fixture (T-V13-12's count re-declared) | PR (fixtures), nightly (B-WORLD-lite) |
| T-V13-12 (amended) | "four fixtures, one per anomaly kind" → one fixture per anomaly kind (eleven: the eight of V13 §2.2 and the three site kinds, the latter on T-V13-57's fixture) | — |
| T-V13-43 (amended) | "a site dropped on a host route leaves the leg count unchanged and moves its effort by the detour only" → "a `routed` site dropped within `siteStationReachM` of a host route becomes its station (W7 (12)) and leaves the leg count unchanged, moving its effort by the detour only; beyond it the route's effort is unchanged and the site joins by a byway" | — |
| T-V13-21 row 13 (amended) | the assertion gains "every byway that joined a removed route re-joins the nearest public route or reads `siteUnserved`" | — |
| T-V14-34 (new) | road access (the owner's word of 2026-10-18) | on B-SITE: (a) every kind row carries a `roadAccess` row and every free card copies it at the drop (`setAttr site/roadAccess` edits it and re-lays the byway); (b) the fort's and the mine's site frames: the hinterland unit's track runs from the enclosure's gate (the forced `GateSite` on the approach side) to the charter road's station at the ring within one hydro cell, the entrance faces the byway, a toll house's two gates sit on the route's two ring crossings (M0-c-03's through-road assertion read on the site frame); (c) the `inFrame` manor's gate is a `worldSite` destination S4 routes a street to, the `inFrame` watchpost's gate gets a hinterland `track` to the nearest way corridor, the `inFrame` graveyard a `path`, and nothing outside the reservation's faces and the blocks they touch reshuffles (T-V14-9's bar); (d) a crop on the mine's byway reads the `road` profile and shows the track as a band; (e) the adopted fort's byway is tombstoned and the settlement's charter `roads` carry the fort's road; (f) `dropSite`'s dry run shows the snapped origin and the byway as a ghost with the bend's sentence; (g) a border-post proposal accepted states `onRoute` on its request; (h) two drops of one card are bit-identical; the site document's digest never moves with any of it (T-V14-25, T-V14-31) | PR (fixtures), nightly (from V13's W1) |
| T-V14-8 (amended) | "(a routed fort gains a road)" → "(a routed fort gains a road; every kind's `roadAccess` row is honoured as T-V14-34 and T-V13-57 assert)" | — |

### 1.18 Decisions ("chose X over Y because Z"; vetoable)

| id | decision |
|---|---|
| J-V13.107 | chose a site's road as a **byway** — a `WorldRoute` of origin `byway`, laid by W7 (12) from the site to the nearest public routed cell on a standalone and a host-bound world alike, never a leg, never a host edge, never in a canon slot, re-laid with its site and its joined route — over (a) W7 (5)'s trail pass alone (it joins only seats, so a non-`routed` tower, mine or shrine had no road), (b) a frame-scale approach mark (the crop, the charter, the patrol source and the travel annotation could not read it), (c) a host-chartered route (a site is not a host settlement: legs end at settlements, W7 (11); J-RR.21) — because the owner's "integrated into road infrastructure" asks that one road network be read by every reader, and a byway lives in the route layer without being a leg |
| J-V13.108 | chose **the site snaps to the route, never the route to the site** for an `onRoute` kind (a toll house, a bridge fort), and **a `routed` site as a station of the nearest host edge within reach** on a host-bound world (the detour a dated lay version, its effort in `timeDelta` and `routeFacts`), over bending a host road to every dropped site or never bending it — because nothing moves a bound route silently (J-RR.17; W7 (10)) while W7 (11) and T-V13-43 already say a dropped site changes a route's geometry and effort, and a toll house is defined by its road (OQ-3) |
| J-V13.109 | chose **P1's site pass as one coherence term `roadAccess`** scored at the drop with a derived bearing and three correction policies (`snap` at the dry run, `offer` as the existing unlawful-with-offers rung, `report` as a lawful reading), with three `PlacementAnomaly` kinds and the existing `keep` / `takeOffer` choices, over a V14-side check in G3 or a new verb — because the owner's "coherence expectation" is V13's coherence cost, the existing rungs (`W_PLACE_NO_LAWFUL`, `W_PLACE_ANOMALY`, `takeOffer`) already carry the DM's choices, and a settlement's rule (never moved by the map) and a site's (moved at the dry run within its reach, offered after) then differ in one table row, not in a mechanism |
| J-V14.57 | chose a **per-kind `roadAccess` row** (join, class, reach, correction) as a column of the kind row copied to the card, with `routed` and `attraction` kept in their landed meanings, over folding the join into `routed` or a per-purpose rule — because the owner's "depending on the catalogue" is the kind row, "where appropriate" is a cell per kind, and one word keeps one meaning (`routed` stays "a W7 seat") |
| J-V14.58 | chose an **`inFrame` site joined by the settlement's own ways** — a hinterland way of the row's class to the nearest way corridor (§4.9's `trail` row and driveway rule) for `trail` and `track`, the gate a `worldSite` destination for S4 for `road` and `onRoute` — over a byway inside a frame or no join — because one ground has one owner (J-V14.41), the base already lays such ways round a reservation, and the destination rule is BCR-V14-13's widened by one clause (BCR-V14-26) |
| J-V14.59 | chose the **site frame's charter `roads`** (the byway or the stood-on route, `forced`) as the one way the site's own tracks and gate meet the world's road — the through-road contract read for a site frame — over the hinterland unit's own tracks alone, because item 135 (b)'s handoff is boundary conditions, and a site frame is a frame |

### 1.19 Base change requests and cross-volume requests

| request | to | the change |
|---|---|---|
| BCR-V14-26 | the base, §4.12 `Destination` (line 9718) and §2.5 `Reservation` (line 1170) | the `Destination` comment "admitted for S4 after adoption only" → "after adoption, and at an `inFrame` drop whose `roadAccess` class is `road` or whose join is `onRoute`"; the reservation comment names the gate's way of the row's class (§4.9's `trail` row read for a `worldSite` reservation) |
| BCR-V13-30 (standing, no admission item) | the base, §4.2 S3 (4) | read for a site frame: the site frame's charter road is the forced gate pick of G5 (e)'s enceinte trace and the hinterland unit's track to the ring station; this design depends on BCR-V13-30's admission (INDEX §1 names it pending) — a note on the request, no new BCR |
| V14 §10.2 → V13 (18) | V13 | the site pass of P1 (`roadAccess` term, the derived bearing, the snap, `nearestLawful` for a site), W7 (12) (byways; station sites), P4's site-frame roads, P5's three anomaly kinds with `takeOffer`, `WorldRoute.origin 'byway'` and `.byway`, `RouteLayRule.siteStationReachM` and `.siteStationMaxDetour`, `place.coherence.weights.roadAccess`, the cascade's byway consumer, `WORLD-16`, R-V14-1 reading `roadAccess` |
| V14 §10.2 → V09 | V09 | the ghost of the snapped origin and the byway in T6's dry run; the catalogue key `bend.site.roadAccess`; `takeOffer` on the three anomaly kinds |
| V14 §10.2 → V11 | V11 | the kind rows' `roadAccess` column (21 rows, own, calibratable) in `tables/sites/kinds`'s registry row |
| V13 §10.2 R-V14-1 (amended) | V14 | the resolver also gives the card's `roadAccess` row |

### 1.20 The M0 gate's new row (item 140's form; "do not foreclose", no feature)

| # | the row | verification |
|---|---|---|
| M12 | A through-road's frame end (`Way.to`'s external `bearing` NodeRef, §2.4; M0-c-03's "its end a `bearing` NodeRef from the gate to that point") can be pinned at a **given ring point** (a charter road's station, V13 §2.2 `FrameCharter.roads[].atCm`) as well as derived from a bearing, with no change to any digest: so a placed settlement's or a site frame's track can meet the world's road where the charter says (BCR-V13-30; V14 §3.4 (c)) | read S4's frame-end pin and the `NodeRef` form; a test: a way ending at a ring point given as a point commits and replays byte-identically, the arena digest equal whether the point came from a bearing or a station; if the pin admits a bearing only, carry to M1 with the smallest addition named |

### 1.21 Words — new and reused

New, one meaning each: **byway** (the way from a site to the network; `WorldRoute.origin 'byway'`, the field `byway`),
**road access** / `roadAccess` (the kind row's column, the card's field, the coherence term — the owner's own phrase),
the join kinds `onRoute`, `byway`, `offRoute`, `none`, the policies `snap`, `offer`, `report`, the anomaly kinds
`siteOffRoute`, `siteUnserved`, `siteNearRoute`, the key `bend.site.roadAccess`, the cells `siteStationReachM`,
`siteStationMaxDetour`, the register row `WORLD-16`. Reused in their landed meanings: *station* (a point along a
route: `stations`, "the gate station"), *seat* (W7's node), *leg* (a host route between two host settlements),
*routed* (a W7 seat), *attraction*, *approach side* (V14 G5 (b): the side facing the road), *the access record* (V14
§2.3, untouched), *access* in `WaterAccess` and `WaterClassReport.access` (untouched), *unserved* (S4's outcome word,
here the site's), *gate* (a town gate, never bare), *border post*, *road patrol*, *track*, *trail*, *path* (`WayClass`).
Avoided: *spur* (V13's terrain feature), *via* (four field meanings), *approach* as a route, *link*, *access road*.

### 1.22 Lifecycle rows for every new field (V13 §2.6's and V14 §2.9's form)

| field | create | read | persist | regenerate | undo | migrate | identity |
|---|---|---|---|---|---|---|---|
| `SiteKindRow.roadAccess` (a table column) | shipped; `editTable` | G2 (the card's copy), the dialog | the override layer | new drops only (a card is declared) | §7.4's editTable row | an older table reads the shipped rows | the kind's |
| `WorldSite.roadAccess` | `dropSite` (the kind row's, or the request's stated row), `promoteEncounter` (the kind row's) | P1's site pass, W7 (12), P4 (the site frame's roads), P5's readings, G3 (c), G5 (b) 2, G8 (g), the clerk, the exports (a property of the site's GeoJSON point) | the card (declared; in the model digest) | kept (declared); `setAttr site/roadAccess` the only mover | the inverse | absent: the kind row's at load, reported | the card's |
| `SiteRequest.roadAccess?` | the user (the dialog's "stands on the road" / "off every road"); a border-post acceptance (`onRoute`) | G2 → the card | the card's request | an input override kept | the former request | absent | — |
| `Placement.coherenceCost.terms[roadAccess]` | P1's site pass at every placement edit of a site subject | the placement card, the clerk, `SettlementMapRecord.coherence` | the world's entities block (on the `Placement`) | scored once per edit, never re-scored silently (as `territory`) | with the placement edit | absent on an older placement: `world-first` detail, the reading computed at the next read | the placement's |
| `WorldRoute` of origin `byway` (`a` the site placement, `b` the joined route, `byway { site; joins; atStation }`) | W7 (12) at the drop, at `setPlacement` of the site, at the joined route's re-lay | the route layer, the charter's `roads` (the site frame's; a crop frame's), the view, the exports (GeoJSON LineString with `origin`), the clerk, the patrol source rule, `derivedTime` | the world's entities block, every lay version kept | derived: re-laid by W7 (12) when its site's placement or its joined route's lay version changes, its id kept; tombstoned at `unplaceFrame` and at adoption | with its placement's edit (a derived route; no undo target of its own) | absent on an older world: laid at the next W7 (12) run, reported | (`route`, the site placement's lineage, `byway`, `land`); anchor: by its site |
| a `routed` site's station on a host edge | W7 (12) on a host-bound world (a dated lay version of the host's edge, W7 (10)) | as any lay version: `routeFacts`, `roadsAt`, the view, `timeDelta` | the edge's lay versions | re-laid when the site's placement changes or the host's `network` re-lays the edge; the former lay a version | the former lay version | — | the host edge's (pair, mode; its host key) — no new record |
| `PlacementAnomaly` kinds `siteOffRoute`, `siteUnserved`, `siteNearRoute` | P5 at a placement edit; the cascade's step 5; every read of the placement card | the `anomalies` layer, the placement card, the clerk, the map feed's site offers | never (derived, V13 §2.4) | re-read | — | — | the placement's and its subject's |
| `RouteLayRule.siteStationReachM` (2 000 m), `.siteStationMaxDetour` (1.5, a ratio); `CoherenceRule.weights.roadAccess` (3) | shipped; `editTable` | W7 (12); P1's site pass | the override layer | a table edit re-derives from its first reader stage (§7.6) | §7.4's row | an older table reads the shipped cells | — |

## 2 The fragments — every text change (file t, numbered from 939 after file s's 927–938)

**Form.** File r's: each fragment names its target and the line(s) **as read from the live file after file s landed**
(05:31 UTC), the file's md5 at that read, the current text quoted **exactly once** as it stands (a line break inside a
quote written ⏎), the new text in full (the lines that replace the quoted lines, line breaks written ⏎), and one line
of reason. An insertion quotes the line it follows and repeats it first in the new text. Order: V13 in line order,
then V14, the base, INDEX, SUMMARY, the brief, the M0 gate spec. The md5s as read (05:46–05:48 UTC): V13
`a896c8dbdb41dd38516becc970b4db81` (4 465 lines); V14 `70d8aa1b3c14e7cab6a135adbd3caa00` (3 213); the base
`1f871a01961de8a4994125d7bb1993be`; INDEX `b19971d37d98710d9a195fb09021dd11`; SUMMARY `9d1422839ab63a3ec3bf6d13e3ea8265`;
the brief `fc2520709752ef77f397ba7d6a89c169`; the gate spec `plat/docs/build/M0-world-sites-gate.md`
`b6c5be2a5d89fbd19035a3c606194fb9`. The apply step re-verifies every quote against the files as they then stand. "Item
939" below is file t's first item as this seat expects it; the synthesis fixes the number.

### 2.1 V13 — `docs/volumes/V13-world.md` (md5 `a896c8db…`)

**B-1.** V13 §1.3 (the owner rules obeyed) — insertion after the settlement-first paragraph. Line 340.
*Current text:* `  precedence stamp with its two explicit verbs (V13 §3.11.5, V13 §4.1) and the compass rule (V13 §5.3; BCR-V13-16).`
*New text:* `  precedence stamp with its two explicit verbs (V13 §3.11.5, V13 §4.1) and the compass rule (V13 §5.3; BCR-V13-16).⏎* **The owner's road-access rule (2026-10-18; file t item 939).** "make sure that sites have road access where⏎  appropriate, they are integrated into road infrastructure and that depending on the catalogue, where appropriate, their⏎  geography in the world map autocorrects to meet the coherence expectation." Obeyed by the kind row's `roadAccess` row⏎  (V14 §2.5 — the catalogue: a join, a class, a reach and a correction policy per kind), P1's site pass (V13 §3.11.1 —⏎  the coherence expectation as the `roadAccess` term: the drop's origin snapped within the kind's reach at the dry run⏎  where the row says so, the nearest lawful placement offered, a reading reported with the DM's choice and never a⏎  silent move after acceptance, item 137 (c)), W7 (12) (V13 §3.8 — the integration: a site's byway laid on a standalone⏎  and a host-bound world alike, never a leg; a `routed` site a station of the nearest host edge), P4's site-frame roads⏎  (V13 §3.11.4 (6)) and W8b (14)'s patrol source; a host-placed site is measured and reported, never re-sited (V14 §3.4⏎  (a)).`
*Reason:* the owner's new words quoted verbatim where V13 quotes every owner rule it obeys, with the mechanisms named.

**B-2.** V13 §1b.1 (records) — the `PlacementAnomaly` row. Line 456.
*Current text:* `| `PlacementAnomaly` (a reported impossibility under a lock) | P5 and the cascade | the clerk, the report, V09's panel | V13 §2.2 |`
*New text:* `| `PlacementAnomaly` (a reported impossibility under a lock; a site's road-access reading, V13 §3.11.5 (4)) | P5 and the cascade | the clerk, the report, V09's panel, the map feed's site offers (V13 §3.11.6) | V13 §2.2 |`
*Reason:* the three site readings are anomalies of the same record, and the host reads them only as offers.

**B-3.** V13 §1b.1 — the `WorldRoute` row. Line 457.
*Current text:* `| `WorldRoute` (a graph edge: ends, mode, class or the host's grade, polyline, time stations, lay version, origin; bound: the host's edge key) | W7 — on a standalone world by its own selection; on a host-bound world laying exactly the host's genesis edges and lived changes (V13 §3.8) | the charter's `roads`, the port's `routes`, `routeFacts` and `mapFeed`, W6's economic stage, W9's labels, the view, the exports; V14's E1 (the world-map case reads the route at the point) | V13 §2.2 |`
*New text:* `| `WorldRoute` (a graph edge: ends, mode, class or the host's grade, polyline, time stations, lay version, origin; bound: the host's edge key; a **byway** — a site's way to the network, origin `byway`, never a leg, V13 §3.8 (12)) | W7 — on a standalone world by its own selection; on a host-bound world laying exactly the host's genesis edges and lived changes (V13 §3.8); on either world the byways and station sites of W7 (12) | the charter's `roads` (a site frame's byway among them, V13 §3.11.4 (6)), the port's `routes`, `routeFacts` and `mapFeed` (host edges only — never a byway), W6's economic stage, W9's labels, the view, the exports; V14's E1 (the world-map case reads the route at the point); W8b (14)'s patrol source | V13 §2.2 |`
*Reason:* the byway is a `WorldRoute` by producer and consumer, and the port's exclusion is a wiring fact.

**B-4.** V13 §1b.2 (interfaces) — the `coherence` row. Line 504.
*Current text:* `| `coherence(world, frame, origin, bearing)` → `CoherenceCost` and `nearestLawful(world, frame, origin)` → `Placement[]` (P1) | `@plat/world/place` | the `placeFrame` dry run; V09's placement tool; the clerk's `placeAt` proposal on the world |`
*New text:* `| `coherence(world, frame, origin, bearing)` → `CoherenceCost` and `nearestLawful(world, frame, origin)` → `Placement[]` (P1); for a site subject the **site pass** — the one term `roadAccess`, the bearing derived from the join, the snap and the site's own `nearestLawful` (V13 §3.11.1) | `@plat/world/place` | the `placeFrame` dry run; V09's placement tool; the clerk's `placeAt` proposal on the world; V14's `dropSite` dry run (G3 (a)) |`
*Reason:* the site pass is a reading of the existing operator, wired to its new caller.

**B-5.** V13 §2.2 — `CoherenceCost`. Line 748.
*Current text:* `interface CoherenceCost { total: number; terms: { term: 'coastSide'|'riverCrossing'|'edgeElevation'|'relief'|'biome'|'territory'|'dossier'; cost: number; detail: string }[]; lawful: boolean /* total ≤ place.coherence.lawfulMax */; detail?: 'world-first' /* no P1 ran (V13 §3.11) */ }`
*New text:* `interface CoherenceCost { total: number; terms: { term: 'coastSide'|'riverCrossing'|'edgeElevation'|'relief'|'biome'|'territory'|'dossier'|'roadAccess' /* a site subject's only term beside `dossier` (V13 §3.11.1's site pass): the card's `roadAccess` row against the route layer at the week */; cost: number; detail: string }[]; lawful: boolean /* total ≤ place.coherence.lawfulMax */; detail?: 'world-first' /* no P1 ran (V13 §3.11): a frame's world-first placement; a site subject's site pass always runs */ }`
*Reason:* the coherence expectation is a coherence term, scored once and stored as the others are.

**B-6.** V13 §2.2 — `WorldRoute`, the ends. Line 750.
*Current text:* `interface WorldRoute { id: Id; a: Id; b: Id /* seat ids (the glyphs' settlements, or V14 sites standalone) */; hostKey?: string /* bound: the host's edge key, the pair and the mode */;`
*New text:* `interface WorldRoute { id: Id; a: Id; b: Id /* seat ids (the glyphs' settlements, or V14 sites standalone); a byway: `a` the site placement, `b` the route it joins (V13 §3.8 (12)) */; hostKey?: string /* bound: the host's edge key, the pair and the mode; never on a byway */;`
*Reason:* a byway's ends are a site and a route; it never carries a host key.

**B-7.** V13 §2.2 — `WorldRoute`, the origin. Line 753.
*Current text:* `  origin: 'genesis'|'chartered'|'standalone'|'import'|'user'; layVersion: number /* bumped by every re-lay; a dated re-lay keeps the former course as a version */;`
*New text:* `  origin: 'genesis'|'chartered'|'standalone'|'import'|'user'|'byway'; layVersion: number /* bumped by every re-lay; a dated re-lay keeps the former course as a version */;⏎  byway?: { site: Id /* the site placement (its card's `roadAccess` row chose the class, V14 §2.5) */; joins: Id /* the public route it meets */; atStation: number /* the vertex of `joins` at the junction */ } /* origin 'byway' only (V13 §3.8 (12)): one per site placement, keyed by it (V13 §2.5); never a leg, never sent to the host, re-laid when its site or its joined route moves */;`
*Reason:* the byway's own fields, so the charter, the crop, the patrol source and the view find the junction.

**B-8.** V13 §2.2 — `PlacementAnomaly`. Line 801.
*Current text:* `interface PlacementAnomaly { placement: Id; subject: Id /* the locked entity */; kind: 'riverUphill'|'coastInland'|'lockedBelowTable'|'lockedInWater'|'roadToNowhere'|'roadUnmatched'|'windSide'|'sunDiffers'; detail: string; reason: Id }   // derived, V13 §2.4; `roadToNowhere` (a charter road no exit meets) and `roadUnmatched` (a frame exit no charter road meets) are reported readings, never annotations`
*New text:* `interface PlacementAnomaly { placement: Id; subject: Id /* the locked entity; a site reading: the site placement */; kind: 'riverUphill'|'coastInland'|'lockedBelowTable'|'lockedInWater'|'roadToNowhere'|'roadUnmatched'|'windSide'|'sunDiffers'|'siteOffRoute'|'siteUnserved'|'siteNearRoute'; detail: string; reason: Id }   // derived, V13 §2.4; `roadToNowhere` (a charter road no exit meets) and `roadUnmatched` (a frame exit no charter road meets) are reported readings, never annotations; so are the three site readings of V13 §3.11.5 (4) against the card's `roadAccess` row — `siteOffRoute` (an `onRoute` site whose route lies beyond its reach), `siteUnserved` (a `byway` site with no public route within its reach), `siteNearRoute` (an `offRoute` site with a public route within its reach)`
*Reason:* the three readings are declared once, in the record every reader of anomalies already reads.

**B-9.** V13 §2.3 — `RouteLayRule`. Line 970.
*Current text:* `  sea: { trunk: boolean /* every well-ported landmass gets one sea trunk to the largest landmass */; gapFixRatio: number /* a port pair whose sea cost ≤ ratio × its land cost gets the sea leg too */ }; exitRunM: number /* a placed frame's road run through the margin to its gate station */ }   // world.routeLay — the map's own network formation (W7); never the host's, never a time`
*New text:* `  sea: { trunk: boolean /* every well-ported landmass gets one sea trunk to the largest landmass */; gapFixRatio: number /* a port pair whose sea cost ≤ ratio × its land cost gets the sea leg too */ }; exitRunM: number /* a placed frame's road run through the margin to its gate station */;⏎  siteStationReachM: number /* 'm': on a host-bound world a `routed` site within this of a host edge is laid as a station of it (V13 §3.8 (12)) */; siteStationMaxDetour: number /* 'ratio': the station is laid only when the edge's effort through the site ≤ this × its effort without it; else the site joins by its `roadAccess` row */ }   // world.routeLay — the map's own network formation (W7); never the host's, never a time`
*Reason:* the station rule's two numbers as table cells with units.

**B-10.** V13 §2.3 — the `RouteLayRule` table, insertion after the `exitRunM` row. Line 1097.
*Current text:* `| `exitRunM` | 400 (a placed frame's road runs through the margin this far to its gate station) |`
*New text:* `| `exitRunM` | 400 (a placed frame's road runs through the margin this far to its gate station) |⏎| `siteStationReachM` / `siteStationMaxDetour` | 2 000 m / 1.5 (host-bound: a `routed` site within 2 km of a host edge becomes its station when the detour costs at most half again the edge's effort, V13 §3.8 (12); own, PLAUSIBLE) |`
*Reason:* the shipped cells.

**B-11.** V13 §2.3 — the `CoherenceRule` table, the weights row. Line 1157.
*Current text:* `| `weights` | coastSide 3 · riverCrossing 2 · edgeElevation 1 · relief 0.5 · biome 0.3 · territory 0.2 · dossier ∞ (a hard constraint, V13 §3.11.1) |`
*New text:* `| `weights` | coastSide 3 · riverCrossing 2 · edgeElevation 1 · relief 0.5 · biome 0.3 · territory 0.2 · dossier ∞ (a hard constraint, V13 §3.11.1) · roadAccess 3 (a site subject only, V13 §3.11.1's site pass: a row missed under `snap` or `offer` is raw 2 × 3 = 6 > `lawfulMax`, unlawful as a coast error is; missed under `report` raw 1 × 3 = 3, lawful and reported) |`
*Reason:* the one weight that makes the site expectation decide, with its arithmetic on the page.

**B-12.** V13 §2.5 (creation keys) — the `WorldRoute` row. Line 1219.
*Current text:* `| a `WorldRoute` | the world root | (`route`, the two seats' lineages sorted, the mode `land`\|`water`) — the class or grade an attribute, so a re-grade keeps the id and a land road and a sea leg between one pair keep two |`
*New text:* `| a `WorldRoute` | the world root | (`route`, the two seats' lineages sorted, the mode `land`\|`water`) — the class or grade an attribute, so a re-grade keeps the id and a land road and a sea leg between one pair keep two; a byway (`route`, the site placement's lineage, `byway`, `land`) — one per site placement, its id kept across every re-lay (V13 §3.8 (12)) |`
*Reason:* the byway's identity rule.

**B-13.** V13 §2.5 — the anchors sentence. Line 1235.
*Current text:* `territory by its seat; a placement by its subject; a surface by its body and date; a route by its ends and mode; a sway by its seat. Tested by`
*New text:* `territory by its seat; a placement by its subject; a surface by its body and date; a route by its ends and mode; a byway by its site; a sway by its seat. Tested by`
*Reason:* the byway's anchor for §6.3's carry-over.

**B-14.** V13 §2.6 (lifecycle) — the `WorldRoute`, `Territory`, `SitingProposal` row. Line 1258.
*Current text:* `| `WorldRoute`, `Territory`, `SitingProposal` (W6's own) | W7, W8a, W6; on a host-bound world W7 lays only the edges `genesis` and `network` name | the charter, the port, W8b, W9, the view | entities block | standalone: re-derived from their stage (a `setSeats` from W8, a lay-rule change from W7); host-bound: a happened edit re-lays a route from its week as a dated lay version, an always-so edit, a regenerate or an adjust mints a lay version the host adopts by its re-canonize (`W_HOST_CANON_BEHIND` until then), a cost-law change is the host's own re-canonize | the replaced scope | absent: re-derived on load |`
*New text:* `| `WorldRoute`, `Territory`, `SitingProposal` (W6's own) | W7, W8a, W6; on a host-bound world W7 lays only the edges `genesis` and `network` name, and on either world the byways of W7 (12) | the charter, the port (never a byway), W8b, W9, the view | entities block | standalone: re-derived from their stage (a `setSeats` from W8, a lay-rule change from W7); host-bound: a happened edit re-lays a route from its week as a dated lay version, an always-so edit, a regenerate or an adjust mints a lay version the host adopts by its re-canonize (`W_HOST_CANON_BEHIND` until then), a cost-law change is the host's own re-canonize; a byway (origin `byway`): derived from its site's placement and the network at the week, re-laid with its id when either changes, tombstoned at `unplaceFrame` and at adoption, never a host edge | the replaced scope (a byway with its site's placement edit) | absent: re-derived on load (a byway at the next W7 (12) run, reported) |`
*Reason:* every new record has its lifecycle row.

**B-15.** V13 §3.0 (the stage table) — the W7b row. Line 1402.
*Current text:* `| W7b Routes | `W7b` | the final seats (proposals, placements, host seats, V14's routed sites), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s, the `routes` layer | none | the world root | F-WORLD (no path) | " |`
*New text:* `| W7b Routes | `W7b` | the final seats (proposals, placements, host seats, V14's routed sites), every site placement's card `roadAccess` row (W7 (12)), the surfaces, `dem`, `biome`, the reaches, the cost law, `world.routeLay` | `WorldRoute`s (the byways among them; host-bound, a station site's dated lay version), the `routes` layer | none | the world root | F-WORLD (no path); a byway's miss a P5 reading | " |`
*Reason:* the stage declares what it now reads and writes.

**B-16.** V13 §3.8 W7 — insertion of point (12) after (11). Line 1786.
*Current text:* `   before the charter is emitted.`
*New text:* `   before the charter is emitted.⏎12. **Sites joined to the network (the owner's road-access rule, 2026-10-18; V14 §2.5's `roadAccess` row).** After (5) on a⏎   standalone world and after (8)–(10)'s host edges on a host-bound one, W7 reads every site placement's card — its⏎   `roadAccess` row and `routed` flag through the resolver (R-V14-1) — against the network at the week ((9): a hidden⏎   host road is no public road) and lays, drawing nothing: (a) a **byway** for every site whose `join` is `byway` and⏎   whose card is not a seat already — one `WorldRoute` of origin `byway` and the row's `class` from the site's placement⏎   origin to the nearest public routed cell (one Dijkstra to the route set under the cost law with the `existingRoute`⏎   discount, bounded by the row's `reachM` disc, ties by (cost × 1 000, cell index)), its `a` the site placement, its⏎   `b` the route it meets, `byway.atStation` the junction vertex, its stations evaluated as (7)'s for the map's own⏎   walking-time annotation; no routed cell within `reachM` lays none, and P5 reads `siteUnserved` (V13 §3.11.5 (4)); a⏎   byway is **never a leg** (11) — no host key, no `routes(world)`, `routeFacts`, `patrolOffer` or canon slot, no patrol⏎   segment (V13 §3.9 (14)) — and is re-laid, never moved silently, whenever its site's placement or its joined route's lay⏎   version changes, the dry run naming it in the closure of (10); (b) on a host-bound world a `routed` site within⏎   `routeLay.siteStationReachM` of a host edge (the nearest by straight cost, ties by host key) is laid as a **station**⏎   of that edge — the edge re-laid as a dated lay version (10) through the site's cell, its id and host key unchanged,⏎   when the edge's effort through the site ≤ `siteStationMaxDetour` × its effort without it, `timeDelta` naming the leg⏎   (`W_TRAVEL_BAND_CROSSED` as any) — which is how dropping or removing a site changes a route's geometry and effort and⏎   never the number of legs (11); a `routed` site with no such edge joins by its row as (a); (c) a site whose `join` is⏎   `onRoute` stands on its route (P1's site pass snapped it there at the drop) and gets no byway, as does an `offRoute`⏎   or `none` site. On a standalone world a `routed` site is a seat of (1) and needs none of this.`
*Reason:* the owner's "integrated into road infrastructure", placed in the stage that lays roads, standalone and host-bound alike.

**B-17.** V13 §3.9 W8b (14) — the patrol source. Line 1979.
*Current text:* `   the travel law's foot pace from the power's nearest garrisoned seat, fort or watchpost along the segment, moved one`
*New text:* `   the travel law's foot pace from the power's nearest garrisoned seat, fort or watchpost along the segment or joined to it by its byway (V13 §3.8 (12): the round trip then measured from the junction plus the byway's effort twice; a byway is itself no patrol segment), moved one`
*Reason:* a garrisoned site reached by a byway is a patrol source of the road it joins — the integration for patrols.

**B-18.** V13 §3.11 (the preamble) — the world-first order. Line 2078.
*Current text:* `'world-first' }` — P1 is **not** run, there is no frame to measure — and runs P4 only; the frame size the charter needs`
*New text:* `'world-first' }` — P1 is **not** run for a frame, there is no frame to measure — and runs P4 only (for a **site** subject, V14's `dropSite`, P1's **site pass** runs first, V13 §3.11.1: its one term `roadAccess` scored, the asked origin snapped where the card's row says so); the frame size the charter needs`
*Reason:* the one place the world-first order is stated.

**B-19.** V13 §3.11.1 P1 — the count of terms. Line 2090.
*Current text:* ``CoherenceCost` whose six terms are, each ≥ 0 before its weight:`
*New text:* ``CoherenceCost` whose terms are (eight: the first seven a frame's, the last a site subject's), each ≥ 0 before its weight:`
*Reason:* the text said six and listed seven (read-v13's gap); now eight, said so.

**B-20.** V13 §3.11.1 — the terms table, insertion after the `dossier` row. Line 2100.
*Current text:* `| `dossier` (weight ∞) | on a dossier-bound frame (V08), every DR1 and DR29 site fact — `site.terrain`'s relief class, `site.access`'s coast and its side, river and inflow, the water deposits, `site.culture`'s latitude — against what the charter at this placement would say | 0 when every dossier fact holds at the placement; ∞ when any would be contradicted (an inland placement of a `coastal` site, a river side the charter cannot give, a latitude outside the culture's band): **the placement is unlawful whatever the other terms** — item 20's one-way rule applied: the dossier is the truth, a placement is a map fact (C13-08; J-V13.50) |`
*New text:* `| `dossier` (weight ∞) | on a dossier-bound frame (V08), every DR1 and DR29 site fact — `site.terrain`'s relief class, `site.access`'s coast and its side, river and inflow, the water deposits, `site.culture`'s latitude — against what the charter at this placement would say | 0 when every dossier fact holds at the placement; ∞ when any would be contradicted (an inland placement of a `coastal` site, a river side the charter cannot give, a latitude outside the culture's band): **the placement is unlawful whatever the other terms** — item 20's one-way rule applied: the dossier is the truth, a placement is a map fact (C13-08; J-V13.50) |⏎| `roadAccess` (a site subject only; the owner's road-access rule, 2026-10-18) | the card's `roadAccess` row (V14 §2.5: `join`, `class`, `reachM`, `correction`) against the route layer at the week (a hidden host road no public road) | 0 when the row is met at the origin — `onRoute`: a public route of class ≥ `class` within `reachM`; `byway`: one within `reachM`; `offRoute`: none within `reachM`; `none`: always —; 1 when missed under `correction: 'report'`; 2 when missed under `snap` or `offer` (unlawful at weight 3: 6 > `lawfulMax`) — the site pass below; a host-placed site (`hostLocked`) adds `dossier` ∞ against any origin but the host's |`
*Reason:* the coherence expectation as one table row beside the others.

**B-21.** V13 §3.11.1 — insertion after the `nearestLawful` paragraph: the site pass. Line 2115.
*Current text:* `by term as the frame is dragged (V13 §4.2).`
*New text:* `by term as the frame is dragged (V13 §4.2).⏎⏎**The site pass (a site subject; V14 §3.4 (a); the owner's road-access rule, 2026-10-18).** For a `Placement` whose subject⏎is a site `coherence` measures the `roadAccess` term (and `dossier` for a host-placed site) and no other — a site has no⏎frame to measure at the drop; its frame is made from the charter — and the bearing is **derived, not searched**: an⏎`onRoute` site faces its route's bearing at the station (the gatehouse astride the road), a `byway` site the byway's⏎leaving bearing (V14 G5 (b)'s approach side), an `offRoute` or `none` site the request's bearing, default north. **The⏎snap:** under `correction: 'snap'` the dry run moves the asked origin to the nearest lawful point within `reachM` — the⏎nearest station of the nearest public route of class ≥ `class` (a `bridgeFort`: the station of that route's nearest⏎river crossing), ties by the route's lineage key then the lower station — and names the bend (`bend.site.roadAccess`,⏎V14 §4.9); the accepted drop is declared at the moved point and held (V14 §4.1). **`nearestLawful` for a site** returns⏎up to three points by ascending plan distance from the asked origin, ties by cell index, bounded by `originSearchM`:⏎`onRoute` the nearest qualifying stations; `byway` the nearest cells within `reachM` of a qualifying route at which the⏎purpose row's `hard` terms (V14 §2.5) are non-zero; `offRoute` the nearest cells at least `reachM` from every public⏎route with the hard terms non-zero; none → F-PLACE's no-lawful rung as for a frame. A row missed under `offer` is that⏎rung (the asked origin kept unlawful, the three offered, `W_PLACE_NO_LAWFUL` with `keep`, `takeOffer`, `cancel`); missed⏎under `report` it is lawful and P5 reads it (`siteOffRoute`, `siteUnserved`, `siteNearRoute`, V13 §3.11.5 (4)). The⏎pass draws nothing and costs `WORLD-16` (V13 §6).`
*Reason:* the autocorrect at the drop, in the operator that owns coherence, with the DM's existing choices.

**B-22.** V13 §3.11.4 P4 (6) — the charter's roads for a site frame. Lines 2156–2160.
*Current text:* `6. `roads`: every world route crossing the ring, with the class mapped to §2.4's `WayClass` as the record says and⏎   capped in class and count by the dossier's access word, the bearing in frame terms, `toward` the next host⏎   settlement along the route (never a site, a proposal or a junction) with its effort, a highway or road crossing⏎   `forced` — S3 (4) picks its gate there and routes it through the margin to its station (BCR-V13-30) — and a hidden⏎   host road marked `hidden`; sea and river routes bind to the harbour and the landings.`
*New text:* `6. `roads`: every world route crossing the ring, with the class mapped to §2.4's `WayClass` as the record says and⏎   capped in class and count by the dossier's access word, the bearing in frame terms, `toward` the next host⏎   settlement along the route (never a site, a proposal or a junction) with its effort, a highway or road crossing⏎   `forced` — S3 (4) picks its gate there and routes it through the margin to its station (BCR-V13-30) — and a hidden⏎   host road marked `hidden`; sea and river routes bind to the harbour and the landings. For a **site** frame (V14 §3.4⏎   (c)) the site's byway, or the route it stands on, crosses the ring as a road row — `forced` whatever its class (the⏎   site's one road is its gate's road), a byway's `toward` the next host settlement along the joined route from the⏎   junction and its `hostKey` absent — so V14 G3 (c)'s tracks and G5 (e)'s gate meet it at its station (BCR-V13-30 read⏎   for a site frame; V13 §3.8 (12)).`
*Reason:* the handoff downward is boundary conditions (item 135 (b)); the site's road is one of them.

**B-23.** V13 §3.11.5 P5 (4) — the DM's choices per anomaly. Lines 2293–2297.
*Current text:* `   C13-40; its model digest never moves, T-V13-2). The anomaly list is `PlacementAnomaly[]` (V13 §2.4), shown on the placement card and in the⏎   clerk's `why placement`, with the DM's choices per anomaly: keep (default), or `worldWins { placement, ids: [the⏎   anomaly's subject] }` — the scoped form of the one verb (V13 §4.1: the named entities re-derived from the world's⏎   charter with §6.3's carry-over, confirmed with the change count) — so the owner's two verbs stay the only two ways a⏎   settlement changes (C13-25).`
*New text:* `   C13-40; its model digest never moves, T-V13-2). The anomaly list is `PlacementAnomaly[]` (V13 §2.4), shown on the placement card and in the⏎   clerk's `why placement`, with the DM's choices per anomaly: keep (default), or `worldWins { placement, ids: [the⏎   anomaly's subject] }` — the scoped form of the one verb (V13 §4.1: the named entities re-derived from the world's⏎   charter with §6.3's carry-over, confirmed with the change count) — so the owner's two verbs stay the only two ways a⏎   settlement changes (C13-25). **The site readings** (a site subject; the owner's road-access rule, 2026-10-18): at every⏎   read of the placement card and at the cascade's step 5 the card's `roadAccess` row is read against the route layer at⏎   the week, and a miss is `siteOffRoute` (an `onRoute` site whose nearest public route of class ≥ its `class` lies beyond⏎   `reachM` — re-laid away, demoted, abandoned or graded hidden), `siteUnserved` (a `byway` site with no public routed cell⏎   within `reachM`, so no byway stands) or `siteNearRoute` (an `offRoute` site with a public route within `reachM`), each⏎   with the choices `keep` (default) and `takeOffer` (the site pass's `nearestLawful` re-run, the move V13 §4.1's⏎   `setPlacement` on the site subject) — never `takeOffer` on a `hostLocked` placement, as `moveTown` is never offered⏎   there — so a site moves only by the DM's `setPlacement`, and a `worldWins` on a site stays its re-materialization,⏎   never a move (SW-19).`
*Reason:* nothing moves a site silently after acceptance (item 137 (c)); the choices reuse the existing actions.

**B-24.** V13 §3.11 — the output of P1–P5. Line 2472.
*Current text:* `anomalies, the glyph (W9 re-run for the placement), the world's routes and seat territories re-run when the placement adds a`
*New text:* `anomalies, the glyph (W9 re-run for the placement), a site subject's byway laid or re-laid and, host-bound, the host edge a `routed` site is a station of re-laid as a dated lay version (W7 (12)), the world's routes and seat territories re-run when the placement adds a`
*Reason:* the output names what a site placement now produces.

**B-25.** V13 §3.11.6 — the map feed's DM-placed site offers. Lines 2383–2386.
*Current text:* `  only on a host-bound world. For an imported legacy campaign the holders are given per `HostGateRef`. The DM-placed⏎  devotion sites (V14 §2.2's `SiteDevotion`) ride the DM's map feed as offers — the card's world point, kind, deity⏎  key and role — which the host adopts only by its own command, binding the card's host element; never a player's⏎  feed while the card is DM-only.`
*New text:* `  only on a host-bound world. For an imported legacy campaign the holders are given per `HostGateRef`. The DM-placed⏎  site offers — the devotion sites (V14 §2.2's `SiteDevotion`), and every DM-placed site once the host's site record⏎  exists (V14 §11 Q2; V13 §8.5's H31) — ride the DM's map feed as offers — the card's world point (as placed, after any⏎  snap), its kind, its `roadAccess` row, its byway's polyline as presentation (never a host edge, V13 §3.8 (12)), the⏎  three site readings of V13 §3.11.5 (4) when any stands, and for a devotion site its deity key and role — which the⏎  host adopts only by its own command, binding the card's host element; never a player's feed while the card is DM-only.`
*Reason:* the one door through which a site's road reaches the host, as presentation under door 5.

**B-26.** V13 §3.11.6 — `routes(world)`. Line 2387.
*Current text:* `- `routes(world)` → every `WorldRoute`'s polyline with its host key; `pathGeometry(world, hostPath)` → the path a host`
*New text:* `- `routes(world)` → every host-keyed `WorldRoute`'s polyline with its host key (never a byway, which has none; V13 §3.8 (12)); `pathGeometry(world, hostPath)` → the path a host`
*Reason:* a byway is never a host edge.

**B-27.** V13 §3.14.2 — the cascade's step 5, the world cell. Line 2663.
*Current text:* `| 5 the consumers | water classes of every unit in the dirty set; flood classes (the seasonal pair); outfalls (V04's sewer network, its stage re-run where an outfall moved); fords and spans (S1's crossing sites, §4.3's decks: a deck no longer over water is F-REDERIVE's row); wells (V04's yields); the damp-ground term (§4.5's prosperity); the siting score; the open `Encounter`'s memo at every address whose rectangle the dirty set reaches (invalidated; V14 §3.10) and the `waterStamp` of every scene exported over it (V14 §2.4; SW-17); every site document whose anchor or placement lies in the dirty set (V14's G6 and the site's lifecycle); V05's fallen islands' decoration faces under a raised sea (V05 §3.16) | W5's biomes, W6's proposals, the charter's facts of every placement in the set (marked stale when changed), the glyphs' `water` marks, W7's crossings (a route crossing a moved reach re-costs its edge), W8a (a river border moved: re-run for the seat territories touching it — on a host-bound world an offer to the host's re-canonize), W8b at the next revision | 4 | each consumer's records, each with a reason naming the edit |`
*New text:* `| 5 the consumers | water classes of every unit in the dirty set; flood classes (the seasonal pair); outfalls (V04's sewer network, its stage re-run where an outfall moved); fords and spans (S1's crossing sites, §4.3's decks: a deck no longer over water is F-REDERIVE's row); wells (V04's yields); the damp-ground term (§4.5's prosperity); the siting score; the open `Encounter`'s memo at every address whose rectangle the dirty set reaches (invalidated; V14 §3.10) and the `waterStamp` of every scene exported over it (V14 §2.4; SW-17); every site document whose anchor or placement lies in the dirty set (V14's G6 and the site's lifecycle); V05's fallen islands' decoration faces under a raised sea (V05 §3.16) | W5's biomes, W6's proposals, the charter's facts of every placement in the set (marked stale when changed), the glyphs' `water` marks, W7's crossings (a route crossing a moved reach re-costs its edge), W7's byways (a byway re-laid where its joined route moved or its site's placement lies in the set, V13 §3.8 (12)) and the site readings of every site placement in the set (V13 §3.11.5 (4)), W8a (a river border moved: re-run for the seat territories touching it — on a host-bound world an offer to the host's re-canonize), W8b at the next revision | 4 | each consumer's records, each with a reason naming the edit |`
*Reason:* the cascade re-reads a site's road when the world under it changes.

**B-28.** V13 §3.14.3 — drift row 13. Line 2693.
*Current text:* `| 13 | removing or editing a route does not re-route journeys or trade | `setAttr(class)` on a `WorldRoute`, or a seat removed by `setSeats` | W7b over the landmass (the discount changes), the charter's `roads` of every placement the route crossed, W6b's `connectivity` term | the charters' `roads` and the proposals' `connectivity` terms change; no route touches a removed seat |`
*New text:* `| 13 | removing or editing a route does not re-route journeys or trade | `setAttr(class)` on a `WorldRoute`, or a seat removed by `setSeats` | W7b over the landmass (the discount changes), the charter's `roads` of every placement the route crossed, W6b's `connectivity` term, the byways that joined the route and the site readings along it (W7 (12); V13 §3.11.5 (4)) | the charters' `roads` and the proposals' `connectivity` terms change; no route touches a removed seat; every byway that joined a removed route re-joins the nearest public route or its site reads `siteUnserved` |`
*Reason:* a route removed must not leave a site's road hanging; T-V13-21's row asserts it.

**B-29.** V13 §3.16 — F-PLACE. Line 2787.
*Current text:* `| F-PLACE† a placement cannot be made as asked [V13 §3.11] | the placement operators P1–P5 | **does not fit:** the frame's extent + margin exceeds the world's at any bearing; **no lawful placement within reach:** `nearestLawful` returns none; **blend over band:** the edge RMS after `blendBandMaxM` exceeds `edgeRmsRefCm`; **overlap:** another placement's extent + margin intersects; **charter miss:** S1 reports `W_CHARTER_RIVER_MISSED` on a world-first frame; **anomaly:** V13 §3.11.5's locked-term anomalies | does not fit: refused (`refuse.place.fit`, the smallest fitting rung named); no lawful: the asked placement kept, flagged unlawful, the three least-cost offered (`W_PLACE_NO_LAWFUL`); blend over band: the residual accepted and reported `W_PLACE_BENT` as the cost's `edgeElevation` detail; overlap: refused unless accepted (`W_PLACEMENT_OVERLAP`, V13 §3.11's edges); charter miss: a coherence fact in the placement card, never a failure; anomaly: reported with the DM's two choices (keep, or the scoped `worldWins`; C13-25) | T-V13-23 (fit, unlawful, overlap), T-V13-24 (blend residual), T-V13-13 (charter honoured) |`
*New text:* `| F-PLACE† a placement cannot be made as asked [V13 §3.11] | the placement operators P1–P5 | **does not fit:** the frame's extent + margin exceeds the world's at any bearing; **no lawful placement within reach:** `nearestLawful` returns none; **blend over band:** the edge RMS after `blendBandMaxM` exceeds `edgeRmsRefCm`; **overlap:** another placement's extent + margin intersects; **charter miss:** S1 reports `W_CHARTER_RIVER_MISSED` on a world-first frame; **anomaly:** V13 §3.11.5's locked-term anomalies; **road access:** a site subject's `roadAccess` row missed at the site pass (V13 §3.11.1), or a `byway` site with no public routed cell within its reach at W7 (12) | does not fit: refused (`refuse.place.fit`, the smallest fitting rung named); no lawful: the asked placement kept, flagged unlawful, the three least-cost offered (`W_PLACE_NO_LAWFUL`); blend over band: the residual accepted and reported `W_PLACE_BENT` as the cost's `edgeElevation` detail; overlap: refused unless accepted (`W_PLACEMENT_OVERLAP`, V13 §3.11's edges); charter miss: a coherence fact in the placement card, never a failure; anomaly: reported with the DM's two choices (keep, or the scoped `worldWins`; C13-25); road access: under `snap` the origin moved within `reachM` at the dry run (`bend.site.roadAccess`), under `offer` the no-lawful rung above, under `report` a reading (`siteOffRoute`, `siteUnserved`, `siteNearRoute`) with `keep` and `takeOffer`; a host-placed site kept and reported with `keep` alone; never a whole-site retry, never silent | T-V13-23 (fit, unlawful, overlap), T-V13-24 (blend residual), T-V13-13 (charter honoured), T-V13-57 (road access) |`
*Reason:* the failure ladder for the new detection, in the class's own row.

**B-30.** V13 §4.1 — `placeFrame`'s subject. Line 2848.
*Current text:* `  | { t: 'placeFrame'; frame: Uuid; originCm: WorldPointCm; bearingCdeg: Cdeg; preview?: true /* the dry run: the cost and the offers, no write */; accept?: ('overlap'|'unlawful')[] /* the warnings the DM accepted */ }   // settlement-first; always `happened` (`verb` ignored, C13-55)`
*New text:* `  | { t: 'placeFrame'; frame: Uuid | { site: Id } /* a site document generated standalone and placed later: settlement-first as a frame is, P1's full terms plus the site pass's `roadAccess` (V14 §3.4 (a); R-V14-11) */; originCm: WorldPointCm; bearingCdeg: Cdeg; preview?: true /* the dry run: the cost and the offers, no write */; accept?: ('overlap'|'unlawful')[] /* the warnings the DM accepted */ }   // settlement-first; always `happened` (`verb` ignored, C13-55)`
*Reason:* V14 §3.4 (a) and R-V14-11 already name `placeFrame` with a site subject; the event declares it (read-v13's gap).

**B-31.** V13 §4.1 — the warnings' actions. Lines 2887–2888.
*Current text:* ``W_PLACEMENT_OVERLAP` (`accept`, `cancel`), `W_CHARTER_RIVER_MISSED`, `W_SURFACE_BELOW_BED`, `W_PLACE_ANOMALY` (`keep`,⏎`worldWins` with `ids`) — `ConflictAction.kind` gaining `'keep'|'takeOffer'|'accept'|'cancel'` and `offer?: number``
*New text:* ``W_PLACEMENT_OVERLAP` (`accept`, `cancel`), `W_CHARTER_RIVER_MISSED`, `W_SURFACE_BELOW_BED`, `W_PLACE_ANOMALY` (`keep`,⏎`worldWins` with `ids`; for the three site readings `keep`, `takeOffer` with `offer: n`, never on a host-locked placement — V13 §3.11.5 (4)) — `ConflictAction.kind` gaining `'keep'|'takeOffer'|'accept'|'cancel'` and `offer?: number``
*Reason:* the site readings' actions reuse the existing kinds; no new action.

**B-32.** V13 §4.3 (locality) — insertion of the site subject's row after the world-first `setPlacement` row. Line 2922.
*Current text:* `| `setPlacement` (origin) of a world-first placement | P4 (the charter re-emitted, marked stale on the frame) → P5 → W9 → W7–W8 over the landmass | the frame | the frame's `worldWins` re-derivation: declared (SW-19) |`
*New text:* `| `setPlacement` (origin) of a world-first placement | P4 (the charter re-emitted, marked stale on the frame) → P5 → W9 → W7–W8 over the landmass | the frame | the frame's `worldWins` re-derivation: declared (SW-19) |⏎| `requestCharter` / `setPlacement` with a **site** subject (V14's `dropSite` and its move, C14-15; the owner's road-access rule) | P1's site pass → P4 (the site frame's charter) → P5 (the site readings) → W9 → W7 (12) over the site's byway and, host-bound, the one host edge a `routed` site is a station of; standalone, W7–W8 over the landmass when the site is `routed` (a new seat) | every other route; every frame and every other placement; the site's arenas (bar 3) | a `routed` site's W7–W8 over the landmass is declared (standalone) |`
*Reason:* the locality row for the new operator run.

**B-33.** V13 §4.3 — the host's named edges. Line 2927.
*Current text:* `| `bindSeat`, `unbindSeat`, `importSeats`, `genesis`, `network` (host-bound) | the placement's key; W7 over the named edges only | every route the host did not name | a new seat territory is offered to the host's re-canonize (`W_HOST_CANON_BEHIND`) |`
*New text:* `| `bindSeat`, `unbindSeat`, `importSeats`, `genesis`, `network` (host-bound) | the placement's key; W7 over the named edges only, then W7 (12) over the byways and station sites those edges carry | every route the host did not name and every byway joining one | a new seat territory is offered to the host's re-canonize (`W_HOST_CANON_BEHIND`) |`
*Reason:* a host edge re-laid carries its byways with it.

**B-34.** V13 §5.1 — the `routes` layer. Line 3013.
*Current text:* `| `routes` | vector | `WorldRoute` by class, or by the host's grade on a host-bound world, at the network in force at the view's week; a hidden host road a DM-only ghost, a hidden water lane a quiet-quay mark; lengths labelled in km (never a travel time on the world view: times are the host's, or `derivedTime` labelled with the law and "on foot") | highway 2 px solid, road 1.2 px, track 0.8 px dashed, trail 0.5 px dotted, sea 1 px dashed blue, river (navigable) a darker water line |`
*New text:* `| `routes` | vector | `WorldRoute` by class, or by the host's grade on a host-bound world, at the network in force at the view's week; a byway (origin `byway`, V13 §3.8 (12)) in its class's style, "byway" on hover; a hidden host road a DM-only ghost, a hidden water lane a quiet-quay mark; lengths labelled in km (never a travel time on the world view: times are the host's, or `derivedTime` labelled with the law and "on foot") | highway 2 px solid, road 1.2 px, track 0.8 px dashed, trail 0.5 px dotted, sea 1 px dashed blue, river (navigable) a darker water line |`
*Reason:* the view draws what the route layer holds.

**B-35.** V13 §6 — the budget register. Line 3523.
*Current text:* `whole plate and its deltas decoded, the marks laid) and one scrub step ≤ 120 ms. Each has its T-V13 row in §7.`
*New text:* `whole plate and its deltas decoded, the marks laid) and one scrub step ≤ 120 ms; `WORLD-16` a site's road pass — P1's site pass ≤ 5 ms (one route-index query per row, the three nearest stations by one scan), a byway's lay ≤ 20 ms at `reachM` 4 000 m (one Dijkstra bounded by the reach's disc: ≈ 800 fine cells at the province rung, ≈ 50 at the continent's), a station's re-lay one host edge's A\* under W7's row (pre-decided fallback: the byway laid on the coarse grid, SP-W7's). Each has its T-V13 row in §7.`
*Reason:* every number a register row with a unit and a fallback.

**B-36.** V13 §7.3 — T-V13-12's fixture count. Line 3577.
*Current text:* `| T-V13-12 | the orientation-dependent terms: after a bearing change the sun's azimuth in frame terms, the wind bearing, the sea side and the river directions equal the world's turned by the bearing (mirrored: reflected); the compass rose turns; the arenas are unchanged (T-V13-2); each locked anomaly kind is reported on its fixture | four fixtures, one per anomaly kind |`
*New text:* `| T-V13-12 | the orientation-dependent terms: after a bearing change the sun's azimuth in frame terms, the wind bearing, the sea side and the river directions equal the world's turned by the bearing (mirrored: reflected); the compass rose turns; the arenas are unchanged (T-V13-2); each locked anomaly kind is reported on its fixture | one fixture per anomaly kind (eleven: V13 §2.2's eight and the three site readings, the latter on T-V13-57's fixture) |`
*Reason:* the count said four against eight kinds (read-v13's gap); now eleven, said so.

**B-37.** V13 §7.4 — T-V13-43's site clause. Line 3602.
*Current text:* `| T-V13-43 | time: two routes sharing a corridor report equal effort per shared metre whatever their laying order; a site dropped on a host route leaves the leg count unchanged and moves its effort by the detour only; after a seat is added every leg outside the closure keeps identical time fields and every changed leg appears in `timeDelta`; a band crossing raises `W_TRAVEL_BAND_CROSSED`; under every basis (absolute, normalized, normalized-frozen) a vassal drawn continuous passes the host's own band read at the week shown, its Treinf in cost units under the sent calibration | the travel-law fixture |`
*New text:* `| T-V13-43 | time: two routes sharing a corridor report equal effort per shared metre whatever their laying order; a `routed` site dropped within `siteStationReachM` of a host route becomes its station (W7 (12)) and leaves the leg count unchanged, moving its effort by the detour only, while beyond that reach the route's effort is unchanged and the site joins by a byway; after a seat is added every leg outside the closure keeps identical time fields and every changed leg appears in `timeDelta`; a band crossing raises `W_TRAVEL_BAND_CROSSED`; under every basis (absolute, normalized, normalized-frozen) a vassal drawn continuous passes the host's own band read at the week shown, its Treinf in cost units under the sent calibration | the travel-law fixture |`
*Reason:* the clause names the mechanism it tests.

**B-38.** V13 §7.4 — insertion of T-V13-57 after T-V13-56. Line 3615.
*Current text:* `| T-V13-56 | the trade lens's production and need (J380): every economy row's goods are keyed by the host's catalog key as its supply links key them — two labels the host keys alike draw as one good, each label kept on its card, a loosely read key marked — with the category and shippable flag the host sends, no flag derived from a category (a custom good the host sends shippable draws shippable); production, needs, exports, imports, services and food coverage draw under every regime, loads, arrivals, relations and still alike; a food good and a catalog service never draw moving (on a route, a mover or a shipment-styled link), while a service export the host ships as a good draws as a shippable good; a food coverage ring is filled to the share the host sent, kept at its surveyed share while a cut is in force, the cut marked by the stressor's word and never by the war's siege mark; a supply arrival captions the good its link names where the host sent one and guesses none where it did not; no criminal channel and none of the host's criminal income reaches a player picture; stocks, throughput (its inbound and outbound words) and the entrepôt heat draw in the loads regime only; relief and credit draw no link where the host names no giver | the trade fixtures |`
*New text:* `| T-V13-56 | the trade lens's production and need (J380): every economy row's goods are keyed by the host's catalog key as its supply links key them — two labels the host keys alike draw as one good, each label kept on its card, a loosely read key marked — with the category and shippable flag the host sends, no flag derived from a category (a custom good the host sends shippable draws shippable); production, needs, exports, imports, services and food coverage draw under every regime, loads, arrivals, relations and still alike; a food good and a catalog service never draw moving (on a route, a mover or a shipment-styled link), while a service export the host ships as a good draws as a shippable good; a food coverage ring is filled to the share the host sent, kept at its surveyed share while a cut is in force, the cut marked by the stressor's word and never by the war's siege mark; a supply arrival captions the good its link names where the host sent one and guesses none where it did not; no criminal channel and none of the host's criminal income reaches a player picture; stocks, throughput (its inbound and outbound words) and the entrepôt heat draw in the loads regime only; relief and credit draw no link where the host names no giver | the trade fixtures |⏎| T-V13-57 | sites and roads (the owner's road-access rule, 2026-10-18): on B-WORLD-lite with V14's B-SITE kinds dropped by a script, (a) a toll house dropped 300 m off a road is snapped onto its nearest station at the dry run with `bend.site.roadAccess` named, and at 600 m is kept unlawful with three stations offered (`W_PLACE_NO_LAWFUL`); a bridge fort snaps to the route's crossing station; (b) a mine 2 km from a track gets a byway of class `track` whose `a` is the site placement, `b` the joined route and `atStation` the junction vertex, its polyline on land cells, its creation key (`route`, the site's lineage, `byway`, `land`), re-laid with the same id when the joined route re-lays; a mine 5 km from every route gets none and reads `siteUnserved`, `takeOffer` offering three cells within 4 km of a route whose `ore` term is non-zero; a tower 5 km from every road reads `siteUnserved` as a lawful reading (raw 1) and stands; (c) a hideout dropped on a highway reads `siteNearRoute`, `keep` keeps it, `takeOffer` moves it at least 300 m off every public route by one `setPlacement`; (d) on the mock host a `routed` fort dropped 800 m from a host edge becomes its station — the edge's new lay version through the fort's cell, its id and host key unchanged, the leg count unchanged, `timeDelta` naming the leg, `W_TRAVEL_BAND_CROSSED` where a band is crossed — and at 3 km joins by a byway; a byway appears in no `routes(world)`, `routeFacts`, `patrolOffer` or canon slot (a schema lint over the port's outputs); a hidden host road counts as no public road for every row; (e) a host-placed site (`author: 'host'`, `hostLocked`) 400 m off its road is kept, reads `siteOffRoute` with `keep` alone, and its byway is laid; (f) a garrisoned fort joined by a byway is the patrol source of the segment it joins, the cadence's round trip including the byway's effort twice, and no byway carries a `PatrolCadence`; (g) every outcome bit-identical on the five engines and across permuted drop order (no draw); (h) undo of each drop removes the byway with the placement and restores a station's former lay; (i) the eleven anomaly kinds each on a fixture (T-V13-12) | the site-road fixtures (PR); B-WORLD-lite (nightly) |`
*Reason:* every new behaviour has a test, in V13 §7's form.

**B-39.** V13 §8.5 — insertion of H31 after H30. Line 3768.
*Current text:* `| H30 | with M-W5's prosperity and alignment step | the alignment asks: a per-advance alignment reading in the lens window (both axes and their bands by its own law, the aggression chip word, the top constituent causes), published as its faith projection is; its moral drift's compounding decay, and its freeze outside belief worlds, fixed if the host so chooses (a defect its alignment read found; the lenses replay nothing, they scrub plates, V13 §5.8 (8)); a week on each tolerance offset's causes | H23 |`
*New text:* `| H30 | with M-W5's prosperity and alignment step | the alignment asks: a per-advance alignment reading in the lens window (both axes and their bands by its own law, the aggression chip word, the top constituent causes), published as its faith projection is; its moral drift's compounding decay, and its freeze outside belief worlds, fixed if the host so chooses (a defect its alignment read found; the lenses replay nothing, they scrub plates, V13 §5.8 (8)); a week on each tolerance offset's causes | H23 |⏎| H31 | with M-W2's route step and V14's M-SITE-F | the site-road asks (the owner's road-access rule, 2026-10-18): its site record (V14 §11 Q2's `WorldSiteRecord`) carries the site's position as the host's own fact — never re-sited by the map, the map's `siteOffRoute`, `siteUnserved` and `siteNearRoute` readings reaching it only as the map feed's site offers (V13 §3.11.6) for its own command; its route facts per host edge carrying a station site's detour effort as any lay version's (H16's route facts as overlays; V13 §3.8 (12)); its adoption of a DM-placed site (H28's command for a devotion site; its site record's for any) taking the map's point as placed (`placeOf`) and the card's `roadAccess` row as data; nothing of a site's frame reaching it (J86's door 1 closed; the canon's sites slot stays its own satellite ground, file r item 926) | M-W2; H13; H16; V14 §11 Q2 |`
*Reason:* the host track names what the host must do, and that it is nothing of the frame.

**B-40.** V13 §9 — insertion of J-V13.107 – J-V13.109 after J-V13.106. Line 3883.
*Current text:* `| J-V13.106 | chose **the additive canon built over the adopted canon's inputs** (J388; V13 §3.11.6) — on a campaign born canonized, the adopted canon with only the seats added since on a founding event (a placement or a satellite's graduation, never an imported row), their seat territories and the water candidates they move re-derived, every other row as that canon has it, its causes the additions alone and what the host adopted read from those causes, never from its log head; the host carrying its own versions, slots, sub-records and the prior seats' ports and circles forward (H22); each travel-band crossing it causes reported with `keep` alone because the founding is the host's — over the canon at the request's log head (it would carry every unadopted geometry shift, lay version, cost law and removal onto the path the entitlement never gates, the DM's premium act made free) and over refusing the additive canon while any other change is pending (one pending lay version would then leave every later founding unmapped until the DM's premium re-canonize, the outcome J388 rules out) |`
*New text:* `| J-V13.106 | chose **the additive canon built over the adopted canon's inputs** (J388; V13 §3.11.6) — on a campaign born canonized, the adopted canon with only the seats added since on a founding event (a placement or a satellite's graduation, never an imported row), their seat territories and the water candidates they move re-derived, every other row as that canon has it, its causes the additions alone and what the host adopted read from those causes, never from its log head; the host carrying its own versions, slots, sub-records and the prior seats' ports and circles forward (H22); each travel-band crossing it causes reported with `keep` alone because the founding is the host's — over the canon at the request's log head (it would carry every unadopted geometry shift, lay version, cost law and removal onto the path the entitlement never gates, the DM's premium act made free) and over refusing the additive canon while any other change is pending (one pending lay version would then leave every later founding unmapped until the DM's premium re-canonize, the outcome J388 rules out) |⏎| J-V13.107 | chose **a site's road as a byway** (the owner's road-access rule, 2026-10-18; V13 §3.8 (12)) — a `WorldRoute` of origin `byway` laid by W7 from the site to the nearest public routed cell on a standalone and a host-bound world alike, never a leg, never a host edge, never in a canon slot or a port feed, re-laid with its site and its joined route — over W7 (5)'s trail pass alone (it joins seats only, so a tower, a mine or a shrine that is not `routed` had no road), a frame-scale approach mark (the charter, the crop, the patrol source and the walking-time annotation could not read it) or a host-chartered route (a site is not a host settlement: legs end at settlements, (11); J-RR.21) — because "integrated into road infrastructure" asks that one network be read by every reader, and a byway lives in the route layer without being a leg |⏎| J-V13.108 | chose **the site snapping to its route, never the route to the site**, for an `onRoute` kind (a toll house, a bridge fort), and **a `routed` site laid as a station of the nearest host edge within reach** on a host-bound world (the detour a dated lay version, its effort in `timeDelta` and `routeFacts`; V13 §3.8 (12)), over bending a host road to every dropped site or never bending it — because nothing moves a bound route silently (J-V13.79; (10)) while (11) and T-V13-43 already say a dropped site changes a route's geometry and effort, a toll house is defined by its road, and the host adopts the lay version by its own choice (V13 §11 Q5) |⏎| J-V13.109 | chose **P1's site pass as one coherence term `roadAccess`** scored at the drop with a derived bearing and three correction policies — `snap` at the dry run, `offer` as the existing unlawful-with-offers rung, `report` as a lawful reading — with three `PlacementAnomaly` kinds and the existing `keep` and `takeOffer` choices (V13 §3.11.1, §3.11.5 (4)), over a V14-side check in G3 or a new verb, because the owner's "coherence expectation" is this volume's coherence cost, the existing rungs already carry the DM's choices, and a settlement's rule (never moved by the map) and a site's (moved at the dry run within its reach, offered after) then differ in one table row, not in a mechanism |`
*Reason:* the decisions, each "chose X over Y because Z", vetoable.

**B-41.** V13 §10 — BCR-V13-30, read for a site frame. Line 4170.
*Current text:* `exit no charter road meets) are reported readings, never annotations.`
*New text:* `exit no charter road meets) are reported readings, never annotations. Read for a **site** frame too (V14 §3.4 (c); the owner's road-access rule, 2026-10-18): the site's byway, or the route it stands on, is its charter road, `forced` whatever its class — the forced gate pick G5 (e)'s enceinte trace takes on the approach side — and the hinterland unit's track runs from that gate to the road's ring station; a track that cannot reach it is S4's F-ROUTE `unserved`, read as `roadUnmatched` on the site's placement card.`
*Reason:* the standing request names the site frame it now covers; no new base request.

**B-42.** V13 §10.2 — R-V14-1. Line 4261.
*Current text:* `| R-V14-1 | every `Placement` with a `site` subject gives the site's `at` (`originCm`); its card's `attraction` (0–1) and `routed` are read through `@plat/api`'s resolver from the site document (V14 §2.2), cached per (placement, the card's digest) — for W6's `destination` term, W7's routed sites and the charter's `sites` (SW-20) | V13 §2.2, §3.7, §3.8, §3.11.4 |`
*New text:* `| R-V14-1 | every `Placement` with a `site` subject gives the site's `at` (`originCm`); its card's `attraction` (0–1), `routed` and `roadAccess` (V14 §2.5's row) are read through `@plat/api`'s resolver from the site document (V14 §2.2), cached per (placement, the card's digest) — for W6's `destination` term, W7's routed sites, byways and station sites (W7 (12)), P1's site pass and P5's site readings, and the charter's `sites` and `roads` (SW-20) | V13 §2.2, §3.7, §3.8, §3.11.1, §3.11.4, §3.11.5 |`
*Reason:* the one resolver gives the one more column.

**B-43.** V13 §11 — Q5, inserted before the first "Ruled" paragraph. Line 4317.
*Current text:* `**Ruled — who keeps a gate under the sway** (J385; J-V13.96; recorded here as a ruling, not an open question). The`
*New text:* `**Q5 — A host road bending to a map site (the owner's road-access rule, 2026-10-18; a capability across the SettlementForge⏎boundary).** On a host-bound world a `routed` site the DM drops within `siteStationReachM` of a host edge is laid as a⏎station of that edge (V13 §3.8 (12)): the host's road is re-laid through it as a dated lay version, its effort changing⏎in `routeFacts` and `timeDelta`, adopted by the host as any lived change (W7 (10)); beyond that reach, and for every⏎other kind, the site joins by its own byway and the host's road keeps its course. The owner decides whether the host's⏎road may bend for a site the map places at all. *Recommendation:* yes, within the reach and the detour bound (both⏎table cells): (11) and T-V13-43 already say a dropped site changes a route's geometry and effort, the change is a⏎dated lay version the host adopts by its own choice and never silent, and a fort or toll house the DM sets on a⏎campaign's road is the owner's "integrated into road infrastructure"; *if no:* `siteStationReachM` reads 0, every site⏎joins by a byway, and (11)'s and T-V13-43's site clauses are amended to say so.⏎⏎**Ruled — who keeps a gate under the sway** (J385; J-V13.96; recorded here as a ruling, not an open question). The`
*Reason:* a change to the host's road geometry by a map act is a capability across the boundary, so the owner's.

