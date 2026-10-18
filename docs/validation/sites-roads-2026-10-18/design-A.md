# design-A — sites, road access, road integration and the catalogue-dependent autocorrect: the catalogue-first design (J393)

> Designed on Opus 5.5 under the owner's staffing word of 2026-10-18 (J394); Fable critique closes the run (lane sites-roads/critic)

**Continuation note (Opus 5.5, 2026-10-18 from 09:06 UTC; lane `sites-roads/design-A` (opus; J394, Fable-critiqued)).**
The Fable seat that began this record (05:24–05:46 UTC) was killed by the usage limit with §0 and §1.0–§1.7 written and
§2–§4 empty; its text is kept below as it stood (copy in the scratchpad, `design-A.partial-0546.md`, md5
`89fe8df058970ac36f228d39f2114520`), except where this note and §1.8 name a change. *(The list of changes is completed
in §1.8 as this seat re-reads; written as it goes.)*

- **Lane:** `sites-roads/design-A` (fable; J393). A designer under the owner's staffing rule J390: this seat reads,
  designs, judges and critiques; nothing here is applied. Every text change is a fragment of §2 for the synthesis
  (draft t, numbered after file s); the apply step after J392 re-verifies every fragment's current text.
- **Started:** 2026-10-18 05:24 UTC. Written as it goes.
- **Angle:** CATALOGUE-FIRST — start from V14 §2.5's kind rows; give every kind its road access class, its role in the
  road infrastructure, its coherence expectation on the world map and its correction, as calibratable columns and rule
  tables with shipped values; then the mechanism that reads them.
- **Inputs read whole:** the README (29 lines, md5 `eabd68cd5eec8bb1a35539c4a08e1bfd`); the five reader records
  `read-v14.md` (980 lines, md5 `6d127498c88c67d4d314d8f8b967f764`), `read-v13.md` (1,013, `6463765400374407b5260d7b607c67ca`),
  `read-base.md` (880, `33635e2143d5c4b7e2d8aeacec5bc37e`), `read-research.md` (562, `d97b4fcc56f23f94898d634c57e2267c`),
  `read-checks.md` (1,268, `28609ac256bf0aaa569d6c77f93619cf`); then the primary texts named in §1.0 below, each quoted
  with its line and the file's md5 at the moment read.
- **Primary targets at the moment this lane began (05:25 UTC, `md5sum`):** `docs/volumes/V13-world.md`
  `c8759307398388249547f71e1912feca` (4,452 lines); `docs/volumes/V14-sites.md` `a1c6d7c2bf08595776b1f913765cf1cb`
  (3,208); `docs/ARCHITECTURE.md` `b03ba26e4eedfa446d517280cd83e67f` (24,462); `docs/volumes/INDEX.md`
  `39b0c51960df130cb068744dd2eb3ee6` (259); `docs/volumes/SUMMARY.md` `9d1422839ab63a3ec3bf6d13e3ea8265` (214);
  `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` `fc2520709752ef77f397ba7d6a89c169` (212). These equal
  the readers' md5s: J392 had not yet touched a target when this lane read. Every cite `V13:n`, `V14:n`, `base:n`
  below is against these md5s unless a later md5 is stated at the cite.
- **Cite form.** `V14:902` = `docs/volumes/V14-sites.md` line 902 at md5 `a1c6d7c2…`; `V13:1700` likewise at
  `c8759307…`; `base:8677` = `docs/ARCHITECTURE.md` at `b03ba26e…`; `rv14 §n` = a fact of `read-v14.md`, etc.

---

## 0. The owner's words, clause by clause

**The owner's words (2026-10-18 ~05:05Z, verbatim; journal row J393):** "make sure that sites have road access where
appropriate, they are integrated into road infrastructure and that depending on the catalogue, where appropriate, their
geography in the world map autocorrects to meet the coherence expectation."

The owner's words are the authority and are not re-judged; what follows is this seat's reading, stated so it can be
vetoed, with the places where it could differ from the session's README reading and where a reading must be the owner's.

| clause | this seat's reading | where it could differ / must be the owner's |
|---|---|---|
| "sites" | the owner's persistent locations — V14's **world sites** (the cards: fort, tower, temple … tollhouse), free-standing on the world, `inFrame` in a settlement's hinterland, `surface` on a plot, `attached` behind an anchor, `ground` as a marker-like card. The base's word *site* (S1's ground, a bridge's crossing site) keeps its meaning (V13:117–119; SW-34). | none: the session's reading is the same. |
| "have road access where appropriate" | every site kind says whether a road must reach it, may reach it, does not, or must not: a per-kind **road access** class (`required` / `preferred` / `none` / `avoided`) — the owner's "where appropriate" is the column's value, not a judgement made at each drop. *Road access* (the two words together) means: a way of the route network reaches the site's entrance; it is never the bare word *access*, which already names the `AccessPoint` of an attached site (V14 §2.3), the water access class of a site's entrances (V14:808; V13:2597) and the dossier's access word (base §7.7 DR1). | none on the reading; the class names and the shipped values are this seat's (vetoable). |
| "they are integrated into road infrastructure" | the road that reaches a site is part of the one route network, not a decoration: the site is a **station** on a route (the route passes its gate) or the end of a **spur** (a way of its row's class from the route to its gate), its cells enter the route layer, so the frame charter's `roads`, the site frame's own ways, the encounter crop's road band, the patrol cadence, the travel law's stations, the lenses and the exports all read the same road. On a host-bound world the host owns the network's topology and grades and a site is "a position along a route, never an end" (V13:1769–1771; J-RR.16): integration there is the station on a host route, or a map-tier spur that is no host edge. | the README reads this as W7's seats and legs; this seat reads it as *station or spur, never a seat*, for the reasons of J-A.1 (§1.3). Whether a map-tier spur to a site is admissible on a host-bound world is put to the owner (OQ-A3). |
| "depending on the catalogue" | **the catalogue is V14 §2.5's site kind rows** (`tables/sites/kinds`, one row per `WorldSiteKind`): the per-kind table every drop reads. V14 never calls the kind rows "the catalogue" (rv14 §233: its ten uses are V09 §4.9's message-key catalogue, the §7.7 forms catalogue and V11's symbol catalogue), so the word is read by what the sentence needs: a per-kind source of "where appropriate". The message-key catalogue and the symbol catalogue carry nothing a site's geography could depend on. | **must be the owner's (OQ-A1):** the session reads "catalogue" as the kind rows; if the owner meant another list, this design's columns move to it unchanged in substance. |
| "where appropriate" (second) | per kind again: some kinds autocorrect (a tollhouse onto the road, a bridge fort to the crossing, a mine onto ore), some only report (a ruin, a battlefield: the world records what is there), and a host-placed site never moves (V14:1411–1412, kept). The column is `correction`. | none on the reading; which kinds snap and which report is this seat's table (vetoable). |
| "their geography in the world map" | the site's **placement** on the world — its origin (and bearing) — and what the world holds at that origin: the route, the crossing, the pass, the overlook, the ore, the shore, the border. Not the site's own arenas (its levels and ground), which no placement edit changes (bar 3; T-V13-2 on a site subject). | none. |
| "autocorrects" | the site analogue of the owner's settlement-first correction (1) (V13:319–327): the world does the bare coherent minimum by itself and reports it. For a site this seat reads it as a **snap**: a site dropped at a point that misses its kind's expectation is moved, within its row's tolerance, to the nearest point that meets it — shown as the dry run's ghost, named as a bend (`bend.site.snap`), the DM able to keep the asked point; beyond the tolerance nothing moves: the asked placement is kept, flagged unlawful or costed, the nearest lawful placement offered, the anomaly reported with the DM's choices (V13 §3.11.1's `nearestLawful`, §3.11.5 (4)'s choices, §4.1's `keep` / `takeOffer` / `cancel`). The road's half of the correction is the world's: the route bends to the gate station or the spur is laid, never silently, never on a host route's topology. | **must be the owner's (OQ-A2):** whether a DM's point-dropped site may be moved by the snap at all (this seat's reading: yes, within the row's tolerance, preselected and named, the DM's `keep` holding the point), or whether the DM's point stands and only the world bends (the settlement-first spirit). The owner's words say *their* geography autocorrects, which is why this seat reads the snap. |
| "to meet the coherence expectation" | every kind row states its **expectation** — what the world must hold at the site for the site to make sense: on a route, at a river crossing of a route, on a pass, on an overlook, on ore, on a cliff, by water, on a shore, at a territory border, away from routes, inside a settlement's reach, or none — as a deterministic test over V13's rasters, the route layer and the sway, with a tolerance in metres. "Coherence" is V13's word for the placement law (`CoherenceCost`, `lawful`, `nearestLawful`, `PlacementAnomaly`): the expectation becomes one more term of that law for a site subject, so one mechanism judges, searches, offers and reports for settlements and sites alike. | none on the reading; the expectation kinds and their tests are this seat's (vetoable). |

**Readings that must be the owner's (collected; §3 carries each with its recommendation and consequences):** OQ-A1 the
catalogue = the kind rows; OQ-A2 the snap may move a DM's point-dropped site within the row's tolerance; OQ-A3 a map-tier
spur to a site on a host-bound world. The standing rule "a host-placed site (its record's position) is never re-sited"
(V14:1411–1412) is kept, not re-opened.

**What this seat does not read into the words:** no hour, no traffic, no economy (the owner's "not built" list, item 138
(d)); no new random term (a snap is a search with a deterministic tie-break); nothing of the simulator (a site road is a
map fact the host never reads, HS20; what reaches the host rides the existing offers).

---

## 1. The design

*(written as it goes; §1.0 the primary texts read, §1.1 the per-kind table, §1.2 the rule tables, §1.3 the mechanism …)*

---

## 2. The fragments table

*(to be written after §1)*

---

## 3. Owner questions

*(to be written)*

---

## 4. Left unchanged, and why

*(to be written)*

### 1.0 The primary texts read, and the moving targets

J392's apply step landed while this lane read (file s, `docs/AMENDMENTS-2026-10-18s.md`, items 927–938, applied
05:30 UTC): V13 went from `c8759307…` (4,452 lines) to `a896c8dbdb41dd38516becc970b4db81` (4,465: a 13-line revision
note inserted after line 104 and nine one-line corrections at former lines 812, 953, 1100, 2454, 3184, 3339, 3367,
3392–3394 — none of them a text this design touches); V14 from `a1c6d7c2…` (3,208) to `70d8aa1b3c14e7cab6a135adbd3caa00`
(3,213: a 5-line note after line 70, lines 65 and 795 changed); the base to `1f871a01961de8a4994125d7bb1993be` (line 5
only); INDEX to `b19971d37d98710d9a195fb09021dd11` (line 14 only). **Draft t therefore numbers from 939.** This lane
re-read every passage it quotes at the new md5s (the diffs against the 05:12 snapshots were taken and are in the
record's scratch; a V13 line read at the old md5 and above 104 is the same text 13 lines lower, a V14 line above 70
five lines lower). Every cite below is against the NEW md5s (`V13:n` = line n at `a896c8db…`, `V14:n` at
`70d8aa1b…`, `base:n` at `1f871a01…`, `INDEX:n` at `b19971d3…`), re-verified by exact search when the fragments table
was written (§2's verification note).

Read whole, in context (every number a line at the NEW md5 — this lane's own reads of the volumes, it turned out, were all taken after J392 landed; the readers' numbers are 13 (V13) and 5 (V14) lower): V14 §2.5 (V14:826–1085), §3.2 (1276–1330), §3.4 (1402–1461), §3.9 (1844–1959), §1b.1 (342–390), §1b.6 (473–487), §2.2 (522–610), §2.8–§2.9 (1128–1195), §3.1's stage table (1252–1262), §3.6 (b) 2 and (e)–(f) (1608–1612, 1673–1698), §3.10 E1 (1956–1994), §3.13 (b) (2090–2100), §3.14 (2127–2222), §4.1–§4.2 (2239–2268), §4.3 (2291–2310), §4.7–§4.9 (2371–2431), §6 (2740–2775), §7 (2804–2863), §8 (2873–2945), §9 (2947–3010), §10 (3012–3063), §11 (3065–3075); V13 §1.3 (319–384), §2.2 (631–911), §2.3 (926–1189), §3.7 (1638–1709), §3.8 (1711–1790), §3.9 (14) and (16) (1976–1992, 1999–2003), §3.11 whole (2061–2483), §3.14.3 (2671–2694), §3.16–§3.17 (2781–2806), §4.1–§4.4 (2834–2946), §5.1's routes, patrols and anomalies rows (3013–3023), §5.9 (3) (3286–3303), §7 (3525–3656), §8.5 (3724–3772), §9 (3774–3898), §10 (3900–4273); the base §4.2 S3 (4) (base:6214–6256), §4.9 (8551–8759), §4.12's `Destination` (9718–9719), §7.1's outcomes (11389–11463), §7.3's rows (11700–11719) and closure edits (11948–12006); INDEX §1, §2, §3, §6 (INDEX:30–48, 65–72, 130–137, 181–228); SUMMARY items 13–14 (SUMMARY:59–89); the brief's Part D and E (brief:141–180); file s whole (273 lines, md5 `76fb99dc3b4fbcec1171c6e56db8aaf5`).

### 1.1 The words (one word, one meaning)

| word | meaning here | reused from / new |
|---|---|---|
| **road access** (two words, always together; record `roadAccess`) | a way of the route network reaches a site: the site is a station of a route or the end of a spur | the owner's words; never bare *access* (the `AccessPoint`, V14 §2.3; the water access class, V14:813, V13:2610; the dossier's access word, base §7.7 DR1) |
| **approach** (record `Placement.approach`) | the way by which the route network reaches a site, and its role: `station` or `spur` | V14's "approach side" (the side facing the nearest route, V14:1404, 1609) — the approach meets the envelope on that side; V14's `oneApproach` term counts approach directions: consistent |
| **station** | a vertex of a route's polyline with its cumulative effort (W7's `stations`, V13:754); a site's station is the vertex W7c inserts at the site's cell | V13's word (`fromStation`, `toStation`, "its gate station", V13:1784) |
| **spur** | a `WorldRoute` of origin `spur` from a route's station to a site's placement, class `track` or `trail`, map-tier, never a host edge | **new**; defined once in V13 §2.2 |
| **expectation** (record `SiteKindRow.expectation`; the `CoherenceCost` term `expectation`; the anomaly `expectationUnmet`) | what the world must hold at a site's placement for the kind to make sense, as a deterministic test with a tolerance | the owner's "coherence expectation"; **new** as a record word |
| **snap** (outcome key `bend.site.snap`) | the autocorrect: a site's placement moved, within its row's `snapM`, to the nearest lawful placement by `nearestLawful` | V13's `nearestLawful` and §7.1's bend law (a declaration bent, named, never refused); "snap" is new as the site's word (the crop's `snapToGrid` snaps a rectangle to cells, V14:1043 — a different object; the clash is noted in §4) |
| `routed` | true exactly when the card's `roadAccess` is `required` or `preferred`: the one boolean V13 reads to run the approach (W7c) for a site; **derived at the drop**, no longer a shipped column | V14 §2.5's column, re-defined (J-A.2) |
| **gate station** | the point where a charter road meets a frame (V13:1784, BCR-V13-30); for a site frame, where the approach crosses the site frame's ring | V13's |
| **border post** | a bridge fort, fort, watchpost or toll house at a route's border crossing (V13 §3.9 (16)) | V13's; a site posted there is never a bare *gate* |

### 1.2 The catalogue columns — the per-kind rows (the design's centre)

**Four new `SiteKindRow` columns** (V14 §2.5; `own`, calibratable unless marked; copied to the card: `roadAccess` only):

```ts
roadAccess: 'required'|'preferred'|'none'|'avoided';   // the owner's "road access where appropriate": required — the kind needs a road and the world lays one; preferred — laid where one is near, none reported; none — no approach is laid; avoided — no approach, and the kind's expectation keeps routes off
approach: { role: 'station'|'any'|'none'; minClass: 'highway'|'road'|'track'|'trail'; spurClass?: 'road'|'track'|'trail' };   // the role in the road infrastructure: station — the site lies on a route of class ≥ minClass (its cell or an 8-neighbour carries one), never a spur; any — a station where such a route passes, else a spur of spurClass to the nearest cell carrying a route ≥ minClass; none — no approach
expectation: ExpectationRow[];                           // the coherence expectation on the world map: each row a test with a tolerance and a cost (below); [] none
snapM: number;                                           // 'm': how far the autocorrect searches for a lawful placement (0: never snaps, the correction is report-only)
correction: 'snap'|'report';                             // snap — a point drop that misses a required row is moved within snapM to the nearest lawful placement, preselected and named (bend.site.snap), the DM's keep holding the point; report — nothing moves, the cost and the anomaly are reported
// ExpectationRow { kind: ExpectationKind; tolM: number /* 'm': within this of the target the row holds; 0 where the test is a threshold at the cell */; cost: number /* the raw cost when unmet: 5 (> lawfulMax 4) makes the placement unlawful — the owner's "where appropriate" at its strongest; 1 a preference */; minClass?: WorldRoute['class'] /* onRoute, atCrossing, atPass, atBorder: the route class that counts */; group?: string /* rows of one group are alternatives: the group's cost is the least of its rows' */ }
// ExpectationKind = 'onRoute'|'atCrossing'|'atPass'|'atBorder'|'onOverlook'|'onOre'|'onCliff'|'byWater'|'onShore'|'awayFromRoutes'|'inReach'
```

**The shipped rows** (own; every number a calibratable cell with its unit; the reasons in plain words):

| kind | `roadAccess` | `approach` (role · minClass · spurClass) | `expectation` rows (kind · tolM · cost [· minClass / group]) | `snapM` | `correction` | why |
|---|---|---|---|---|---|---|
| `fort` | required | any · track · road | group `control`: onOverlook · 0 · 3; atPass · 1 000 · 3; atCrossing · 1 000 · 3 (the least counts); atBorder · 2 000 · 1 | 1 000 | snap | a fort wants a road and something to control — a height, a pass, a crossing; a border is better still |
| `tower` | preferred | any · trail · trail | onOverlook · 0 · 1 | 1 000 | snap | a wizard's tower stands on a height at the end of a path; solitude is its purpose term, not a road rule |
| `temple` | preferred | any · track · road | — | 0 | report | pilgrims come by road where one lies; a temple is where the faith put it |
| `shrine` | preferred | any · trail · trail | onRoute · 300 · 1 · trail | 500 | snap | a wayside shrine sits on the road (the base's own "wayside shrines, one per through-road", base:8676); a shrine off every road stays, costed |
| `manor` | required | any · track · road | inReach · 20 000 · 1 | 0 | report | a manor is never free in the world (V14:852: `country` admits every kind but … `manor`): inside a frame its driveway is the hinterland unit's (§1.3 (f)); the reach row is met by construction there |
| `guildhall` | required | none | — | 0 | report | a surface site: a building on a plot with the plot's access edge (base:7504's guarantee) — no world approach exists for it |
| `ruin` | preferred | any · trail · trail | — | 0 | report | stone-robbers' track where a road is near; a ruin is where it fell |
| `cave` | none | none | onCliff · 0 · 1 | 1 000 | snap | a cave is found at a face, not served; a point drop on flat ground snaps to the nearest face (A2's `cliffFace` rule, V14:1358, reads the slope the same way) |
| `mine` | required | any · track · track | onOre · 0 · 5 | 1 500 | snap | ore is traded (the kind's `attraction` 0.5): a track must reach it; a mine off the ore is unlawful (the `extraction` row's hard `ore` term, V14:1001, read at a point drop) |
| `hideout` | avoided | none | awayFromRoutes · 1 000 · 1 | 1 000 | snap | concealment: a hideout within a kilometre of a road is moved off it; a road laid later past it is reported, never moved |
| `crypt` | none | none | — | 0 | report | a tomb in the country; levels only |
| `cellarComplex` | none | none | — | 0 | report | never free; the host building's |
| `sewerLair` | none | none | — | 0 | report | never free; the sewer's |
| `dungeon` | avoided | none | awayFromRoutes · 1 000 · 1 | 0 | report | hidden by nature, but where the DM put it: the nearness of a road is reported, never corrected |
| `camp` | preferred | any · trail · trail | group `rest`: onRoute · 300 · 1 · trail; byWater · 300 · 1 | 0 | report | a camp is pitched by a road or by water; transient, never moved |
| `battlefield` | none | none | onRoute · 1 000 · 1 · track | 0 | report | armies meet on roads; a battlefield is where the host's event says |
| `graveyard` | preferred | any · trail · trail | inReach · 20 000 · 1 | 0 | report | the dead lie near the living, on a path |
| `watchpost` | preferred | any · trail · trail | onOverlook · 0 · 5 | 1 000 | snap | a post that sees nothing is unlawful (the `watch` row's hard `overlook`, V14:997, read at a point drop); its path is laid where a road is near |
| `hermitage` | none | none | awayFromRoutes · 1 000 · 1 | 1 000 | snap | solitude: a cell a kilometre from every road; no approach — its path is the site frame's own |
| `bridgeFort` | required | station · road · — | atCrossing · 1 500 · 5 · road | 1 500 | snap | a bridge fort is a gatehouse astride a road's river crossing: a point drop snaps to the crossing (`riverMatchM`'s 1 500 m, V13:1160, the same tolerance a settlement's river takes); off every crossing it is unlawful |
| `tollhouse` | required | station · road · — | onRoute · 0 · 5 · road; atBorder · 2 000 · 1 · road | 1 000 | snap | "the gatehouse astride the road" (V14:1572): a tollhouse is on a road of class road or highway or it is unlawful; a border crossing is where it earns |

`routed` (derived): fort, tower, temple, shrine, manor, guildhall, ruin, mine, camp, graveyard, watchpost, bridgeFort,
tollhouse → true; cave, hideout, crypt, cellarComplex, sewerLair, dungeon, battlefield, hermitage → false. Against
today's column (V14:911–921: fort, bridgeFort, tollhouse, mine, manor, guildhall, temple `yes`): tower, shrine, ruin,
camp, graveyard and watchpost gain a `preferred` approach (a path where a road is near; none reported, never an
anomaly), nothing loses one. `attraction` is untouched.

**Attachment rule.** The columns act on a **free** site (a `Placement` with a site subject) through V13's placement
operators and W7c; on an **`inFrame`** site through the hinterland unit's path rule (§1.3 (f)); on a **`surface`** site
through nothing (the plot's access edge); on an **`attached`** site through nothing (the host building's); on a
**`ground`** card through nothing (`roadAccess` read as `none`: a marker-like card takes no approach; J-A.14). A
host-placed site (its record's position) takes the expectation as a reading and the approach as the world's work,
never a snap (§1.3 (h)).

### 1.3 The mechanism that reads the columns

**(a) The expectation tests — V14's plug-ins in V13's slot (J-A.3, J-A.4).** V13 §2.2 gains beside `SuitabilityTerm`
a second slot of the same pattern (SW-01): `interface ExpectationTest { kind: ExpectationKind; holds(cell: number, ctx:
SuitabilityContext, row: ExpectationRow): boolean; target(cell, ctx, row): number | null /* the nearest cell within
row.tolM (or the kind's threshold) that would make `holds` true, ties by the lowest cell index; null where none */ }`
and `expectations.register(test)` (`@plat/world/siting`; a duplicate kind refused). V13 defines none; V14 §2.5 defines the
eleven once, in `@plat/sites/siting` beside the seventeen terms, each pure over the context (no draw; the route layer at
the week, V13:1787–1788's rule: a hidden road counts as no public road):

| kind | holds at cell c when | the target |
|---|---|---|
| `onRoute` | a route of class ≥ `minClass` crosses a cell within `tolM` of c (the `route` layer and `distToRoute` by class) | the nearest such cell |
| `atCrossing` | a crossing of such a route (W7's `crossings`, V13:755: the cells where its polyline crosses a reach ≥ `riverMinM3s`) lies within `tolM` | the nearest crossing cell |
| `atPass` | a pass station of such a route lies within `tolM`: a route station whose `dem` is the maximum over the stations within ± `world.routeLay.approach.passRunM` (1 000 m) along the route and exceeds the dem `passCrossM` (300 m) to each side across the route by ≥ `passReliefM` (60 m) | the nearest pass station's cell |
| `atBorder` | a crossing of such a route with an allegiance border or a debatable band (the points W8b (16) proposes border posts at, V13:1999–2003) lies within `tolM` | the nearest such crossing cell |
| `onOverlook` | V14's `overlook` plug-in at c ≥ `overlookMin` (0.5) | the cell within `snapM` with the greatest `overlook` (ties: the lowest cell index) |
| `onOre` | V14's `ore` plug-in at c > 0 (a W5 resource site of kind ore within 1 000 m, V14:989) | the nearest ore resource site's cell |
| `onCliff` | the dem's gradient at c ≥ `cliffSlope` (0.30 — A2's `cliffFace` threshold, V14:1358) | the nearest cell whose gradient is ≥ it |
| `byWater` | `distToRiverM` at c ≤ `tolM` (a lake or spring counts, V14:986) | the nearest water-edge cell |
| `onShore` | `distToShoreM` at c ≤ `tolM` | the nearest shore cell |
| `awayFromRoutes` | no route of any class crosses a cell within `tolM` of c | the nearest cell with no route within `tolM` (the snap away) |
| `inReach` | a placement's origin (a settlement's) lies within `tolM` (shipped `reach.settlementKm`'s 20 km) | none (report only) |

The three threshold constants (`overlookMin`, `cliffSlope`, the pass trio) are cells of a new table block
`world.routeLay.approach` (V13 §2.3; shipped below), so every number has a table home (C13-31).

**(b) The site's coherence — P1 for a site subject (J-A.3, J-A.5).** `coherence(world, frame, origin, bearing)` on a
`Placement` whose subject is a site evaluates **two terms only**: `expectation` — the raw cost Σ over the kind row's
rows (a group counting its least row) of `row.cost` where `holds` is false at the origin's cell — and `dossier`
(unchanged: ∞ where the card's host fields contradict the placement; today no host site fact is a DR row, so 0). The
weight `place.coherence.weights.expectation` is 1; `lawful = total ≤ lawfulMax` (4), so one unmet row of cost 5 is
unlawful (C13-26's precedent: a lawful bound that makes the decisive error unlawful) and preferences add up to a cost
that is never unlawful. The bearing search is skipped for a site (its bearing is the request's, V14:1404; no coast
side exists). `nearestLawful(world, frame, origin)` for a site subject searches the spiral out to the row's `snapM`
(not `originSearchM`) in steps of `originStepCells`, the full (two-term) cost at every station (the two-tier search is
a frame's: a site's terms are cheap), and returns up to three lawful placements by ascending total, ties by distance
then by cell index — the existing contract (V13:2106–2113). `snapM` 0 → no search (correction `report`).

**(c) The drop with a point — the snap (J-A.6; OQ-A2).** `dropSite`'s dry run for a free-standing drop with a point
runs (b) on the scratch overlay: **lawful** → the ghost at the point, the cost by row beside it (a preference unmet
reads "off the road: 1"); **unlawful and `correction: 'snap'`** → `nearestLawful` within `snapM`; found → the ghost
is drawn **at the best offer**, the move named in one line as a bend (`bend.site.snap`: "snapped 420 m onto the road",
the row and the distance), the asked point shown as a faint mark, and the dry run's actions are `keep` (place at the
asked point, flagged unlawful, the anomaly below), `takeOffer` (the default; `offer: n` for the other two) and
`cancel` — the existing `W_PLACE_NO_LAWFUL` actions (V13:2886) with the offer preselected; none found → the asked
placement kept and flagged, the three least-cost unlawful ones offered (V13's rung, unchanged); **unlawful and
`correction: 'report'`** → as "none found" without a search. The accepted event carries the chosen origin in
`dropSite.placement` (V14:2261) as today; V13's fold (`requestCharter` with a site subject, world-first: no blend, P4
and P5) writes the `Placement` with `coherenceCost` as computed at the chosen origin (a kept unlawful point keeps
`lawful: false`). A `setPlacement` on a site runs the same (b) and offers (V13:2849's `accept: ['unlawful']` admits
the kept point). **A drop with no point** ("a fort somewhere on the pass") adds every row of cost 5 as a refusing
filter beside the purpose row's `hard` terms (G3's search, V14:1407–1414), so its result is lawful by construction and
no snap runs.

**(d) The approach — W7c (J-A.1, J-A.9, J-A.10).** V13 §3.8 gains a twelfth point, **Approaches**, run as W7c after
W7b on a standalone world and after the genesis and network lays on a host-bound one, and incrementally at every site
placement edit and `setAttr site/roadAccess` (the closure: that site, the route its station bends, the spurs that
ride it). For every `Placement` with a site subject whose card reads `routed`, in lineage-key order:
1. **The site's cell** `c` is the placement origin's fine cell. The world-scale approach ends at `c`: the last
   metres — from the charter road's gate station at the site frame's ring to the envelope's entrance — are the site
   frame's own (f), item 135 (a)'s refinement.
2. **Station.** Where a route of class ≥ `approach.minClass` crosses `c` or one of its 8 neighbours (the `route`
   layer; `world.routeLay.approach.stationCells` 1), the nearest such route (by the polyline's distance to `c`'s
   centre, ties by the route's lower lineage key) **gains a vertex at `c`'s centre** between the two polyline vertices
   its nearest point lies between — a dated lay version of that route (W7 (10): a placement is `happened`; on a
   host-bound world the host's edge keeps its key, topology and grade — the world owns its geometry, J-V13.79 — and
   `routeFacts` carries the changed effort as the detour, T-V13-43's clause made concrete); its `stations` and integer
   fields are re-evaluated on the final polyline (W7 (7)). `Placement.approach = { role: 'station', route, station }`.
3. **Spur.** Else, where the role is `any`: one A\* (W7 (4)'s, the same queue, heuristic, ellipse and tie rule) from
   `c` to the nearest cell carrying a route of class ≥ `minClass`, bounded by `approach.maxSpurM` (5 000 m) of straight
   distance and by `maxCostFactor`, with the `existingRoute` discount against every route already laid; the polyline
   simplified at `routeToleranceM`, never crossing water on a land leg; written as a **`WorldRoute` of origin `spur`**
   (V13 §2.2: `a` the site's placement id, `b` the parent route's nearer end seat, `junction: { route; station }` the
   parent route and the station the spur meets, `class` the row's `spurClass`, `mode` `land`, no `hostKey`), its cells
   entering the `route` layer. `Placement.approach = { role: 'spur', route: the spur's id, junction }`.
4. **None.** Where the role is `station` and no route passes, or the spur finds no path or no route within
   `maxSpurM`: `Placement.approach = { role: 'none' }`, reported `W_SITE_NO_APPROACH` (the site, the nearest route
   and its distance); when `roadAccess` is `required` the anomaly `noApproach` stands on the placement (e).
5. **Order and determinism.** Sites in lineage-key order; station bends before spurs; later spurs ride earlier spurs
   and routes (the discount, W7 (2)); every search keyed as W7's (cost × 1 000, cell index); no draw. Incremental: a
   site's edit re-lays its own approach and nothing else; a W7a/W7b re-run (a seat added, a cost law, a lay-rule edit)
   re-lays every approach of the landmass after (5)'s trails and before (6)'s reasons; a cascade whose dirty set moves
   a route or a reach under an approach re-lays that approach (§3.14.2 step 5's consumer list gains it).
6. **What reads a spur, unchanged:** the `route` layer (so `roadsAt`, the charter's `roads` — a spur crossing a
   frame's ring enters as a road of its class, `toward` the parent route's nearer host settlement, `forced` false —,
   E1 (4)'s way bands, W6b's `connectivity` (spurs are laid after W7b, so never in `routes.stage1`), the view's
   `routes` layer, the exports); `routes(world)` returns it with no host key (the map feed draws it; the host's
   edge-keyed readers skip a keyless row); `routeFacts` and the canon never name it; W8b (14)'s patrol cadence applies
   to it as to any route segment of its class (a spur is a route; `gradeShift` gains `trail −1` beside `track −1`).
7. **What a spur is not:** a seat (W7 (1) no longer seats a site: J-A.1), a host route (never a host key, never in
   the genesis), a leg's end on a host-bound world (W7 (11) stands: a site is a position along a route — its station —
   or the end of the map's own spur; OQ-A3 asks the owner whether the spur is wanted there at all).

**(e) The anomalies and the DM's choices.** `PlacementAnomaly.kind` gains `expectationUnmet` (a site placement whose
`coherenceCost` is unlawful, or lawful with a cost > 0: the detail names the rows unmet and the nearest lawful origin
where one exists) and `noApproach` (a `required` site with `approach.role` `none`). Both are derived readings (V13
§2.4), re-evaluated at every placement edit, every W7c run and every W7 re-run — so a tollhouse whose road the host
demotes to `hidden` reads `expectationUnmet` at the next lay (a hidden road is no public road), and a hideout a new
road passes reads it too; neither moves the site (item 137 (c): "an impossible locked thing is kept as a reported
anomaly with the DM's choice, never silently deleted or moved"). The DM's choices on `W_PLACE_ANOMALY` for a site
subject are `keep` (default) and `takeOffer` (a `setPlacement` to the nearest lawful origin named in the detail; J-A.13)
— `worldWins { ids }` keeps its meaning (V14's re-materialization) and is offered on a stale charter as today.

**(f) The frame side.** (1) **The site frame's charter carries `roads`:** V14 §1b.6's row and §3.4 (c) list the
charter's contents without roads; both gain them — P4 (6) runs for a site subject as for any frame, so the approach
(the route the station is on, or the spur) crossing the site frame's ring is a charter road of its class — and G5 (f)
lays the hinterland unit's tracks from each charter road's gate station to the envelope's entrance `GateSite` (G5 (e)'s
`forced: true` gate on the approach side), so the road reaches the gate at frame scale. (2) **`inFrame`:** the
hinterland unit's path rule (base:8677–8678: "a row with `trail` links its decoration to the nearest way corridor by an
L3 `path` face") is extended to a `worldSite` reservation whose card's `roadAccess` is `required` or `preferred`: its
entrance `GateSite` is linked to the nearest way corridor by an L3 `path` face (a `driveway`-like face, base:8662), laid
by §7.3's S12 row round the reservation at the drop; `none` and `avoided` link nothing (BCR-V14-26; J-A.8). An S4
`Destination` is not minted (the gate-count rule of base:11703 would re-pick the town's gates; after adoption the gate
is S4's `worldSite` destination as today). (3) **`surface`:** the plot's access edge. (4) **`attached`, `ground`:** none.

**(g) The encounter crop, patrols, the travel law, the lenses.** E1 (4) (iii) lays the charter's roads as way bands:
a spur or a station bend inside the 100 m frame is a band of its class, nothing new. W8b (14)'s "the power's nearest
garrisoned seat, fort or watchpost along the segment" reads: a garrisoned site whose approach is a station on the
segment, or whose spur's junction lies on it, the round trip measured from the site's cell over its approach; a spur
carries its own cadence as a route segment of its class. The travel law: a station vertex enters the route's
`stations`, so `pointAtTime` and `derivedTime` reach a site along the network (a label on the map feed, never a time
sent to the host: a site is no host node). The view's `routes` layer draws a spur at its class style with a site-end
cap; `anomalies` carries the two new kinds; the patrols lens draws a spur's cadence as any segment's; the sway lens is
untouched (a garrisoned site is a claim point whatever its road, V13 §3.9 (10)).

**(h) The host-placed site (the kept rule; J-A.12).** "A host-placed site (its record's position) is never re-sited"
(V14:1416–1417) stands. The host's record creates the card (V14 §2.8's second row) and its position arrives as a
`requestCharter` with a site subject and `author: 'host'`, the `Placement` written `hostLocked: true` (V13:746's
meaning: an origin edit refused): (b) runs for the reading only — no `nearestLawful`, no offer, the cost stored and
`expectationUnmet` reported DM-only; W7c lays the approach as for any site (the world yields: a station bend or a
spur). Nothing of this reaches the host unasked (bar 9; the H-row below asks one optional thing).

**(i) Standalone and host-bound, in one rule.** Every step above runs on both; the differences are W7's own: on a
host-bound world W7c never selects a pair, never minted a host edge, bends a host edge's geometry only as a dated lay
version under its key (adopted by the host as W7 (10) says), and a spur is the map's road. On a standalone world the
same, with W7's own selection round it.

**(j) Edit events, locks, undo, the precedence stamp, the DM's verbs.** No new event kind: `dropSite` (its
`placement` the chosen origin), V13's `requestCharter` / `setPlacement` / `unplaceFrame` / `worldWins` with a site
subject, `setAttr site/roadAccess` (a new `setAttr` path; `routed` re-derived; W7c re-run for the site), `setAttr
class` on a spur (standalone only, as any standalone route's). The outcome keys `bend.site.snap` (V09's catalogue) and
the warnings `W_SITE_NO_APPROACH`; `W_PLACE_NO_LAWFUL` and `W_PLACE_ANOMALY` gain their site forms. **Locks:** the
approach is derived (never locked, never an undo target, rebuilt by W7c); a route's class edit is the DM's as today.
**Undo:** a placement edit's undo is V13's (the former placement restored, W7c re-laying the former approach as a
derived product; the spur's identity keeps its address, §1.4). **The stamp:** a site placement is world-first
(`'world'`): the site has no arenas before its placement and is materialized under its charter; a snap moves nothing
but the proposal; `worldWins` on a site is V14's re-materialization under the new charter, its roads included.
**The DM's verbs** stay the owner's: `keep`, `takeOffer`, `cancel`, `setPlacement`, `worldWins` (scoped), `mirrorFrame`
(a site has no mirror: refused as today), `setAttr`.

**(k) Performance** (V13 §6's register gains `WORLD-16`: a site's placement dry run — P1's two terms and
`nearestLawful` within `snapM` — ≤ 50 ms at the realm rung; `WORLD-17`: W7c per site ≤ 20 ms, a whole-landmass
approach pass ≤ 0.1 × W7a + W7b's row). The work: (b) ≤ (2 · ⌈snapM ÷ fineCellM⌉ ÷ originStepCells + 1)² ≤ 49 stations
at the realm rung, each ≤ 11 raster or distance-field reads; (d) 2 one static-index query; (d) 3 an A\* inside an
ellipse of ≤ 5 km (≤ 400 cells at the realm rung). Fine cells are 250 / 500 / 1 000 m (V13:997–999), so every
tolerance above is at least one cell at the province rung and the snap step is `originStepCells` (2) cells, at least
one.

**(l) The failure ladder.** F-PLACE (V13 §3.16) gains two detections for a site subject: **expectation unmet** — the
asked point unlawful: `correction` `snap` → the nearest lawful within `snapM` offered and preselected (`bend.site.snap`),
else the asked placement kept, flagged, the three least-cost offered (`W_PLACE_NO_LAWFUL`); `report` → kept, flagged,
offered without a search; **no approach** — W7c (d) 4: `role` `none`, `W_SITE_NO_APPROACH`, the anomaly `noApproach`
where `required`. F-SITE's G3 row (V14 §3.14) gains the snap as its first rung for a point drop. Never a refusal of
the drop: a declaration is bent or kept and reported (item 101 R2; base:11392–11394).

**(m) The host track under door 1 (H-rows).** Door 1 stays closed and the canon carries no site road: a spur, a
station bend and the two anomalies are map facts; `routeFacts` already carries a bent edge's effort; nothing new is
sent. One optional ask, V13 §8.5's H31 (with V14 §11 Q2's site record): the host's `WorldSiteRecord` may carry, beside
its position, the host edge key the site stands on where it has one, so a host-placed border post's station reads the
host's own word (absent: the map's nearest-route rule). No other row.

### 1.4 Identity, lifecycle, determinism

| new field or record | identity (V13 §2.5 / V14 §2.8) | lifecycle (V13 §2.6 / V14 §2.9) |
|---|---|---|
| `SiteKindRow.roadAccess`, `.approach`, `.expectation`, `.snapM`, `.correction` | table cells (`tables/sites/kinds`), no entity | an `editTable` governs new drops and the next placement edit; existing cards keep their `roadAccess` and their approach (a card is declared, V14:1307–1309) |
| `WorldSite.roadAccess` (copied at the drop; editable by `setAttr site/roadAccess`); `routed` derived from it | the card's (declared, in the model digest, as `attraction`) | kept by every re-derivation; the inverse on undo; absent on an older card: the kind row's value, `routed` re-derived, reported |
| `Placement.approach { role; route?; station?; junction? }` | none of its own: a reading of the placement (derived, V13 §2.4's rule for anomalies) | rebuilt by W7c at every placement edit, W7 run and cascade reaching its route; never an undo target; absent: `none` until W7c runs |
| a spur `WorldRoute` (origin `spur`) | creation key (`route`, the site placement's lineage, `spur`, `land`) — so a re-lay keeps the id and a moved site keeps its spur's address; anchor: by its site | re-derived by W7c; a dated lay version per re-lay (W7 (10)); tombstoned when the site is unplaced or adopted (the settlement's charter roads take over); `class` an attribute (`setAttr`, standalone) |
| `CoherenceCost.terms[].term` gains `expectation` | — | stored on the `Placement` at the edit as every term is; re-evaluated for the anomaly only |
| `PlacementAnomaly.kind` gains `expectationUnmet`, `noApproach` | derived, never persisted (V13:801's rule) | re-evaluated with the placement, W7c and the cascade |
| `world.routeLay.approach { stationCells 1; maxSpurM 5 000 m; passRunM 1 000 m; passCrossM 300 m; passReliefM 60 m; overlookMin 0.5; cliffSlope 0.30 }`; `place.coherence.weights.expectation 1`; `patrol.gradeShift.trail −1` | table cells | editable by `editTable`; a change re-lays the approaches of the landmass at the next W7 run (declared) |

**Determinism and no draw:** the tests, the search and W7c draw nothing; every tie falls to a value or an index (the
lowest cell index; the lower lineage key; the ascending cost then distance); the comparator lint (T-V13-1) covers the
new code; `world.siting` and `place.search` stay reserved ids. **No hour** anywhere. **Nothing of the simulator:** the
host's graph has settlement nodes only (read-research HS20); no site node, time or road is sent.

### 1.5 Tests

| id | what it asserts | how |
|---|---|---|
| T-V13-57 | **approaches (W7c):** on the B-WORLD-lite fixture with one card of every `routed` kind dropped: a tollhouse and a bridge fort dropped on a road are stations (the route gains one vertex at the site's cell, a dated lay version, every other route byte-identical); a fort 3 km from a road gets a spur of class `road` to the nearest `track`-or-better cell, its cells in the `route` layer, `roadsAt` and the charter's `roads` of a frame it crosses naming it with `toward` the parent's nearer settlement; a mine's spur is a `track`; a spur never crosses water; a site 6 km from every route reads `role` `none` with `W_SITE_NO_APPROACH`; two runs are byte-identical and permuting the drop order changes nothing but the lineage keys (the later spur rides the earlier); on the host-bound fixture a station bend keeps the host key, topology and grade, `routeFacts` shows the detour's effort, no spur carries a host key, `routes(world)` returns spurs keyless and the canon names none; `WorldRoute`'s identity keeps a re-laid spur's id | the world fixtures; a mock host |
| T-V13-58 | **a site's coherence:** every shipped kind row's expectation evaluated at a fixture cell per row (met and unmet); a tollhouse point-dropped 600 m off a road is unlawful, `nearestLawful` within 1 000 m returns the road cell first, the dry run preselects it with `bend.site.snap` naming 600 m, `keep` places it unlawful with `expectationUnmet`, `takeOffer` places it on the road; a hideout dropped 400 m from a road snaps to the nearest cell ≥ 1 000 m away; a camp off every road and water is lawful at cost 1 and reports no anomaly; a host-placed tollhouse (`hostLocked`) off every road is neither snapped nor offered and reads `expectationUnmet`; a road the mock host demotes to `hidden` under a tollhouse raises `expectationUnmet` at the next lay; `snapM` 0 never searches; a no-point fort drop never lands on a cell failing a cost-5 row | the placement fixtures |
| T-V13-21b (extended) | the consumer list gains W7c's approaches: a cascade that moves a reach under a spur re-lays the spur and nothing outside the closure | one more consumer test |
| T-V13-42 (extended) | a garrisoned fort at a station is the segment's patrol source; one with `approach.role` `none` is not; a spur of class `trail` takes `gradeShift` −1 | the patrol fixtures |
| T-V14-8 (amended) | "a routed fort gains a road" reads "a routed fort gains an approach — a station or a spur — and is never a seat of W7's pair selection" | as today |
| T-V14-34 | **the catalogue columns:** every kind row carries the five columns with the shipped values; `routed` is derived (a kind row with `roadAccess` `preferred` and no shipped `routed` cell reads `true`); a `setAttr site/roadAccess` to `none` on a fort re-runs W7c, tombstones its spur and leaves every other route byte-identical; an `editTable` of a kind row's `snapM` changes the next drop and no placed site; an `inFrame` fort's reservation gains one L3 `path` face to the nearest way corridor and an `inFrame` hideout none, nothing else of the host re-derived (bar 6); a `ground` graveyard takes no path; the site frame's charter carries the approach as a road and the hinterland unit's track reaches the entrance gate; a crop at a tollhouse's station reads profile `road` with the band inside its frame; the one-click drop of every kind at a point reads its row (snap or cost) with no dialog; every word a catalogue key (`bend.site.snap`, `info.site.approach`) | B-SITE on the world fixture, the CITY fixture |

### 1.6 Decisions (J-A.n; each vetoable)

| id | decision |
|---|---|
| J-A.1 | chose a site as a **station or a spur, never a seat** of W7's pair selection, on both worlds, over the kind row's `routed` site seated among the Urquhart seats (V14:1446–1447; V13:1713–1716), because (a) W7 (11) already makes a site "a position along a route, never an end" on a host-bound world and one rule beats two; (b) a rank-0 seat next to a capital would pull a pair edge whose class is "by the higher seat's rank" (V13:1761) — a highway to a mine; (c) a spur is what W7 (5) already lays for an unjoined seat, now with the kind's class and bound |
| J-A.2 | chose to keep `routed` as the one boolean V13 reads (R-V14-1's resolver, V13 §3.0's W7b row), **derived from `roadAccess`**, over renaming it, because the wiring exists on both sides and a derived boolean costs one rule; the shipped column goes (two shipped columns with one meaning would be a drift) |
| J-A.3 | chose the expectation as **one more term of V13's coherence cost** for a site subject, searched by `nearestLawful` and reported by `PlacementAnomaly`, over a V14-side check before the drop, because the owner's word is "coherence" and V13's placement law already judges, searches, offers, stores and reports — one mechanism for settlements and sites |
| J-A.4 | chose the eleven tests as **V14's plug-ins in a V13 slot** (`ExpectationTest`, `expectations.register`), over formulas in V13, because SW-01's pattern (V13 owns the slot, V14 the terms) keeps one registry and the kinds are V14's domain |
| J-A.5 | chose **per-row costs on the kind row** (5 unlawful, 1 a preference; groups of alternatives) under the one `lawfulMax`, over a `required` flag and a second weight, because C13-26's lawful bound already decides "unlawful" by cost, the calibrator edits one cell per row, and a group says "one of these" without a second grammar |
| J-A.6 | chose the **snap preselected in the dry run** with the DM's `keep` holding the asked point (OQ-A2), over the offer shown and not taken, because the owner's words say the site's geography autocorrects and item 101 R2 bends rather than refuses; the asked point is one click away |
| J-A.7 | chose the world-scale approach to **end at the site's cell**, the site frame's charter carrying the road and its hinterland unit laying the last track to the gate, over a world-scale polyline to the envelope, because fine cells are 250–1 000 m and item 135 (a) refines the coarse fact at the finer scale |
| J-A.8 | chose the **`inFrame` approach by §4.9's own path rule** (a `worldSite` reservation linked to the nearest way corridor by an L3 `path` face) over an S4 `worldSite` destination at the drop, because the base's gate-count rule re-derives S3 for a new destination (base:11703) and the hinterland's `path` face costs no gate |
| J-A.9 | chose a spur as a **`WorldRoute` of origin `spur`** (its `a` the site's placement, `b` the parent's nearer seat, a `junction`) over a polyline on the placement, because every reader of roads (the route layer, `roadsAt`, the charter, the crop, the view, the exports, the patrols) reads `WorldRoute` and a second source would fork the one network; `Placement.approach` keeps the reading |
| J-A.10 | chose W7c **after W7b, incremental per site** (the closure: the site, the bent route, the spurs riding it) over re-running W7a/W7b at every drop, because W7 (10) requires that nothing outside a closure moves and V14 §4.7's locality row promises the same |
| J-A.11 | chose a garrisoned site to be a **patrol source only through its approach** (a station on the segment, or a spur's junction on it) over any site near the segment, because W8b (14)'s "along the segment" needs a reading and the approach is the one the road gives |
| J-A.12 | chose to **keep "a host-placed site is never re-sited"** (V14:1416–1417) with the expectation read and the approach laid, over an owner question, because the host's record is a dossier-tier fact (item 20 (h)) and the world yields to it as it yields to a canonized seat (V13:2408–2410) |
| J-A.13 | chose `takeOffer` as the DM's second choice on a site's `W_PLACE_ANOMALY` over the scoped `worldWins`, because a site's anomaly is cured by moving the site, not by re-deriving its arenas, and the action kind exists (BCR-V13-9) |
| J-A.14 | chose that a **`ground` card takes no approach** over a path to a camp or a battlefield, because a marker-like card has no gate and the base's decorations already link what wants a trail (base:8677) |
| J-A.15 | chose **no nineteenth row in T-V13-21's drift table** (the owner's eighteen, item 138 (c)) and the approach as one more consumer of T-V13-21b, over extending the owner's list |

### 1.7 BCRs and cross-volume requests, and the M0 gate

- **BCR-V14-26 (base §4.9, the hinterland decorations' path rule):** a `worldSite` reservation whose card's
  `roadAccess` is `required` or `preferred` is linked to the nearest way corridor by an L3 `path` face from its entrance
  gate; `none` and `avoided` link nothing (§1.3 (f) 2; fragment A-28).
- **V14 §10.2's V13 row gains (18):** the `ExpectationTest` slot and `expectations.register`; P1's `expectation` term
  for a site subject and `nearestLawful` within `snapM`; `Placement.approach`; the spur `WorldRoute`; W7c; the two
  anomalies; `W_SITE_NO_APPROACH`; a site frame's charter `roads`; `takeOffer` on a site's `W_PLACE_ANOMALY`.
- **V13 §10.2 gains R-V14-14:** V14 supplies `roadAccess` (through the resolver as `attraction` and `routed` are), the
  kind row's `approach`, `expectation`, `snapM` and `correction`, and the eleven `ExpectationTest` plug-ins.
- **BCR-V13-41 (V09):** T6 `place`'s site drop shows the snap ghost, the cost by row and the `keep` / `takeOffer` /
  `cancel` actions; the catalogue gains `bend.site.snap`, `info.site.approach` and `W_SITE_NO_APPROACH`.
- **The M0 gate (item 140's form; no K row — the kernel is untouched, the world is no plat arena):** one model row,
  **M12 — a hinterland `path` face from a reservation's gate point:** "the hinterland unit's L3 `path` face (§4.9: a
  decoration linked to the nearest way corridor) can be laid from a point on a reservation's boundary — the face's
  origin a point, not a decoration id — without a new role, layer or digest change." PLAUSIBLE: the rule names "its
  decoration", a sited point; the test (joins M0's exit suite where it can be written): on the golden CITY a `path`
  face laid from an arbitrary hinterland point to the nearest corridor leaves every other face and id byte-identical.
  "Do not foreclose", no feature added; recorded as M1's.
