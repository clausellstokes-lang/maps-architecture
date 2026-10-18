# design-A — sites, road access, road integration and the catalogue-dependent autocorrect: the catalogue-first design (J393)

> Designed on Opus 5.5 under the owner's staffing word of 2026-10-18 (J394); Fable critique closes the run (lane sites-roads/critic)

**Continuation note.** The Fable seat that began this record (lane `sites-roads/design-A` (fable; J393), 05:24–05:46
UTC) was killed by the usage limit with §0 and §1.0–§1.7 written and §2–§4 empty. Its text is kept whole, as it stood,
in `docs/validation/sites-roads-2026-10-18/design-A.partial-fable.md` (401 lines, md5
`89fe8df058970ac36f228d39f2114520`). This continuation (lane `sites-roads/design-A` (opus; J394, Fable-critiqued),
from 09:06 UTC) re-read every input whole and keeps the partial's design — the catalogue columns on the kind row, the
coherence rows as one more term of V13's placement law searched by `nearestLawful` and reported by
`PlacementAnomaly`, the plug-in slot in V13 with the tests in V14, a site never a seat of W7's pair selection, a
host-placed site never re-sited, the frame side and the `inFrame` path rule — and changes nine things, each named
where it lands:
(1) **no route is ever bent to a site** (the partial's W7c step 2 gave a route a new vertex at the site's fine cell):
a site whose frame a route meets lies **along** it and nothing moves; the autocorrect brings a tollhouse or a bridge
fort to the road instead — because a bound route's geometry is the host's lived network ("mirrored, never computed",
V13:1766; J-RR.17 "nothing moves a bound route silently"), and a vertex at a 250–1 000 m cell's centre would shift a
road by up to half a cell;
(2) **one word, one meaning:** the partial's *snap*, *spur*, *station* and bare *expectation* collide with words the
volumes and the base already use (`snapToGrid` and "snapped to the grid", V14:1038, V14:2054; the base's `SiteFeature`
`spur` and polygon spurs, base:968, base:5469; V13's charter `stations` and route `stations`, V13:718, V13:754; the
kernel batch's *Expectations*, base:4529), so the autocorrect is a **bend** (V14's own family: `bend.site.*`,
V14:2429), the site's road an **approach road** (the base's own phrase for the road by which a place is reached,
base:13986), the role **along** (V13's "a position along a route", V13:1783), and the kind's rows **coherence rows**
(the owner's "coherence expectation", always with *coherence*);
(3) **`routed` retired**, replaced on the kind row and the card by `roadAccess` (the partial kept `routed` as a derived
boolean: two fields with one meaning);
(4) only the rows whose cost makes a placement unlawful are the **expectation** that moves a site; a preference costs and
is shown, never moves a site and raises no anomaly pin (the partial raised `expectationUnmet` on any cost > 0, a pin
for every camp off a road), so exactly four kinds bend (tollhouse, bridge fort, mine, hideout) and the partial's
fort, tower, shrine, cave, watchpost and hermitage "snap" values — which never fired, their rows being preferences
under `lawfulMax` — are `report`;
(5) the tests' targets are **points** where the feature is a line (a route, a crossing, a pass, a border) and cells
where it is a raster, and the bend searches those targets first, then a spiral, within the row's `bendM`; beyond it
the nearest lawful placement is **offered**, not taken, within V13's own `originSearchM` (V13 §1.3's "nearest lawful
placement offered");
(6) the approach road's length bound is a **per-kind column** (`maxRoadM`: 5 000 m required, 1 500 m preferred), so
"preferred — laid where a road is near" is a number;
(7) `inFrame`: a `required` kind takes the outside plot's **`driveway`** face, a `preferred` one the decoration's
**`path`** face (base:8662, base:8678);
(8) the partial's OQ-A2 (may the world move a DM's point drop) is **withdrawn as an owner question**: the owner's
own word "autocorrects" decides it, the bend law gives its form and the DM's `keep` holds the point (J-A.6); its
OQ-A3 (an approach road on a host-bound world) becomes the session's decision J-A.16, vetoable, since it amends a
session ruling (J-RR.21) and crosses no boundary — the one host-facing part is an optional host row (H31); so the one
owner question left is the reading of "the catalogue" (OQ-A1);
(9) the partial's tests are re-cast in each volume's own form (V14 §7's `| id | family (§13) | bar | tier |`), its H31
(the host's site record carrying an edge key) is replaced (the map reads *along* by geometry; the host has no site
record yet, V14 §11 Q2), its numbering follows file s's end at item 939 (the fix-design lane's item, applied at 05:51),
and every cite is re-taken at the targets' current md5s (the partial's §1.0 claimed new-md5 cites but quoted, e.g.,
"V14:902" for the `attraction` paragraph, which stands at V14:907 now).

- **Lane:** `sites-roads/design-A` (opus; J394, Fable-critiqued). A designer: nothing here is applied. Every text
  change is a fragment of §2 for the synthesis (draft t, numbered after file s); the apply step re-verifies every
  fragment's current text.
- **Started:** 2026-10-18 05:24 UTC (Fable, J393); continued 09:06 UTC (Opus, J394). Written as it goes.
- **Angle:** CATALOGUE-FIRST — start from V14 §2.5's kind rows; give every kind its road access class, its role in the
  road infrastructure, its coherence expectation on the world map and its correction, as calibratable columns and rule
  tables with shipped values; then the mechanism that reads them.
- **Inputs read whole by this seat (md5 at the read, `md5sum`):** the README (29 lines,
  `eabd68cd5eec8bb1a35539c4a08e1bfd`); the partial record (401, `89fe8df058970ac36f228d39f2114520`); the five readers
  `read-v14.md` (980, `6d127498c88c67d4d314d8f8b967f764`), `read-v13.md` (1 013, `6463765400374407b5260d7b607c67ca`),
  `read-base.md` (880, `33635e2143d5c4b7e2d8aeacec5bc37e`), `read-research.md` (562, `d97b4fcc56f23f94898d634c57e2267c`),
  `read-checks.md` (1 268, `28609ac256bf0aaa569d6c77f93619cf`); file s `docs/AMENDMENTS-2026-10-18s.md` (285,
  `090329b6c51ca9abe907a8970acc5677`, items 927–939); the gate spec `plat/docs/build/M0-world-sites-gate.md` (45,
  `b6c5be2a5d89fbd19035a3c606194fb9`); and the primary sections of §1.0 below.
- **The targets now (09:08 UTC; re-hashed before §2 was written, unchanged):** `docs/volumes/V13-world.md`
  `09fbe522c52b4b1c7c89e7c243f0f19d` (4 465 lines: file s's 13-line note after line 104 and its one-line corrections,
  then fix-design's three one-line edits at 105, 112, 3860 — so a reader's V13 line above 104 is the same text 13 lines
  lower now); `docs/volumes/V14-sites.md` `70d8aa1b3c14e7cab6a135adbd3caa00` (3 213: a 5-line note after line 70 —
  a reader's V14 line above 70 is 5 lower now); `docs/ARCHITECTURE.md` `1f871a01961de8a4994125d7bb1993be` (24 462;
  line 5 only since the readers); `docs/volumes/INDEX.md` `4288179616d26f75b3d717deb23ed0ce` (259; line 14 only);
  `docs/volumes/SUMMARY.md` `9d1422839ab63a3ec3bf6d13e3ea8265` (214; unchanged);
  `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` `fc2520709752ef77f397ba7d6a89c169` (212; unchanged);
  `plat/docs/build/M0-world-sites-gate.md` `b6c5be2a5d89fbd19035a3c606194fb9` (45). File s touches none of the
  passages this design changes (its items edit V13 §2.2 `waterLanes`, §2.3 `RouteCostLaw` and `reach.kProsperity`,
  §3.11.6 *Retention*, §5.8 (7), §5.9 (5)–(7), §9 J-V13.83, V14 §2.4 and the index's state line), so no fragment below
  quotes a pre-change text; the readers' line numbers are stale by the offsets above and are not used.
- **Cite form.** `V14:n` = `docs/volumes/V14-sites.md` line n at `70d8aa1b…`; `V13:n` at `09fbe522…`; `base:n` =
  `docs/ARCHITECTURE.md` at `1f871a01…`; `INDEX:n` at `42881796…`; `SUMMARY:n` at `9d142283…`; `brief:n` at
  `fc252070…`; `gate:n` = the gate spec at `b6c5be2a…`; `rv14 n`, `rv13 n`, `rb Fn`, `rr Xn`, `rc Xn` = a fact of the
  reader records by its own number.

---

## 0. The owner's words, clause by clause

**The owner's words (2026-10-18 ~05:05Z, verbatim; journal row J393):** "make sure that sites have road access where
appropriate, they are integrated into road infrastructure and that depending on the catalogue, where appropriate, their
geography in the world map autocorrects to meet the coherence expectation."

The owner's words are the authority and are not re-judged; what follows is this seat's reading, stated so it can be
vetoed, with the places where it differs from the session's README reading and the one reading that must be the
owner's.

| clause | this seat's reading | where it differs from the README / must be the owner's |
|---|---|---|
| "sites" | the owner's persistent locations — V14's **world sites**, the twenty-one kinds of `WorldSiteKind` (V14:526–527) — in every attachment: `free` on the world, `inFrame` in a settlement's hinterland, `surface` on a plot, `attached` behind an anchor, `ground` as a marker-like card. The base's word *site* (S1's ground, a bridge's crossing site) keeps its meaning (V13:131–132; SW-34, rc D16). | none. |
| "have road access where appropriate" | every kind says whether a road must reach it, may, need not, or must not: one **road access** class per kind (`required` / `preferred` / `none` / `avoided`) — "where appropriate" is the column's value, never a judgement made at a drop. *Road access* is always the two words (record `roadAccess`); the bare *access* keeps its three meanings (the `AccessPoint` of an attached site, V14:727 and V14 §2.3; the water access class of a site's entrances, V14:813, V13:2611; the dossier's access word, base §7.7 DR1). | none on the reading; the class names and every shipped value are this seat's (vetoable). |
| "they are integrated into road infrastructure" | a site's road is part of the one route network, never a decoration: the site lies **along** a route (a route meets the site's frame) or an **approach road** — a `WorldRoute` of origin `approach` — joins it to the network; the site frame's charter carries that road, the site's ground joins it to the gate, and every reader of roads reads the same record (the route layer, `roadsAt`, the charters, the encounter crop's way bands, the patrol cadence, the travel law, the view's layers, the exports). On a host-bound world the host's network is untouched ("a position along a route, never an end", V13:1782–1784; J-RR.16): the approach road is the map's own road, never a host edge. | the README reads "integrated" as V13 §3.8 W7's seats and legs; this seat reads it as *along a route or joined by an approach road, never a seat* (J-A.1). |
| "depending on the catalogue" | **the catalogue is V14 §2.5's site kind rows** (`tables/sites/kinds.json`, one row per `WorldSiteKind`, V14:866): the one per-kind table every drop reads and the DM picks a kind from. V14 never calls the kind rows "the catalogue" (rv14 233: its ten uses are V09 §4.9's message-key catalogue, the base's forms catalogue and V11's symbol catalogue); none of those could carry what a site's geography depends on, and the sentence needs a per-kind source of "where appropriate". | **must be the owner's (OQ-A1):** only the owner can say what the word meant; if another list was meant, the columns move to it unchanged in substance. |
| "where appropriate" (the second) | per kind again: a kind's `correction` is `bend` (the world moves the site) or `report` (the world records where it stands and says what it lacks). Four kinds bend — the tollhouse onto its road, the bridge fort onto its road's river crossing, the mine onto its ore, the hideout off the road — and every other kind reports; a host-placed site never moves (V14:1416–1417, kept). | none on the reading; which kinds bend is this seat's table (vetoable). |
| "their geography in the world map" | the site's **placement** on the world — its origin (and so its frame) — and what the world holds there: the route, the crossing, the pass, the height, the ore, the cliff, the water, the shore, the border, the distance to every road, the nearest settlement. Not the site's own arenas, which no placement edit changes (bar 3; T-V13-2 on a site subject). | none. |
| "autocorrects" | the site's analogue of the owner's settlement-first correction (1) (V13:332–334: "the world autocorrects to the bare coherent minimum … nearest lawful placement offered"), turned on the site because the owner's words name *their* geography: at the site's own placement edits — the drop, `requestCharter`, `setPlacement` — the dry run **bends** the site, within its kind's `bendM`, to the nearest placement that meets its kind's coherence expectation, names the bend (`bend.site.placement`) and lets the DM's `keep` hold the asked point; beyond `bendM` nothing moves — the placement is kept, flagged unlawful, and the nearest lawful placement within V13's `originSearchM` is offered. Never later by itself: a later world change that breaks a placed site's expectation is a reported anomaly with the DM's choices (item 137 (c): "never silently deleted or moved"). The road's half of the correction is the world's: it lays the approach road (V13 §3.8 (12)); it never bends an existing route. | the reading is this seat's (J-A.6, vetoable); the owner's own word "autocorrects" decides that the site moves, so it is not an owner question (the partial's OQ-A2 withdrawn, note (8)). |
| "to meet the coherence expectation" | each kind row's **coherence rows** — deterministic tests over V13's rasters, the route layer and the sway, each with a tolerance in metres and a cost — joined to V13's placement law as one more term (`siteKind`) of `CoherenceCost` for a site subject, so one mechanism judges, searches, offers, stores and reports for settlements and sites alike. "Coherence" is V13's word for that law (`CoherenceCost`, `lawful`, `nearestLawful`, `PlacementAnomaly`); the **expectation** proper is the rows whose cost exceeds `lawfulMax` (the placement is unlawful without them); the rest are preferences, costed and shown, never moving a site. | none on the reading; the eleven tests and their numbers are this seat's (vetoable). |

**Readings that must be the owner's:** one — OQ-A1, "the catalogue" (§3). The standing rule "a host-placed site (its
record's position) is never re-sited" (V14:1416–1417) is kept, not re-opened.

**What this seat does not read into the words:** no hour, no traffic and no economy (item 138 (d)'s "not built"); no
random or jitter term (a bend is a search with deterministic ties); nothing of the simulator (a site's road is a map
fact the host never reads, rr HS20; what reaches the host rides the existing offers, and one optional host row, H31,
lets its map surface draw what the map draws).

---

## 1. The design

### 1.0 The primary texts read, as they stand now

Read whole, in context, at the md5s above (every number a line now): **V14** §1b.1's `WorldSite` row (V14:362), §1b.6's V13
dependency rows (V14:474–491), §2.2's card fields (V14:540–562), §2.5 whole (V14:826–1095), §2.8–§2.9 (V14:1128–1200),
§3.4 whole (V14:1402–1461), §3.6 (e)–(f) (V14:1673–1698), §3.9 whole (V14:1844–1954), §3.14's G3 and G8 rows
(V14:2138–2153), §4.1–§4.2 (V14:2239–2275), §4.7 (V14:2371–2398), §4.9's key list (V14:2428–2431), §6's G3 row
(V14:2763), §7 whole (V14:2804–2871), §8's SE6 row (V14:2895), §9's last rows (V14:2991–3010), §10 (V14:3012–3064), §11
(V14:3065–3075); **V13** §1.3's settlement-first correction (V13:332–340), §2.2 whole (V13:631–925), §2.3 whole
(V13:926–1176), §2.4 (V13:1177–1192), §2.5–§2.6 (V13:1194–1269), §3.0 (V13:1367–1416), §3.7–§3.8 whole (V13:1638–1790),
§3.9 (10) and (14)–(17) with its edges (V13:1904–1916, 1976–2015), §3.11 whole (V13:2061–2483), §3.14.2–§3.14.3
(V13:2655–2707), §3.16–§3.18 (V13:2781–2832), §4.1–§4.4 (V13:2836–2953), §5.1's layer table (V13:2999–3024), §6 whole
(V13:3443–3523), §7 whole (V13:3525–3656), §8 whole (V13:3658–3772), §9's last rows and deferred list (V13:3877–3898),
§10's BCR-V13-30, -39, -40 (V13:4166–4170, 4231–4255), §10.2 (V13:4257–4273), §11 (V13:4275–4338); **the base**
§2.4's `WayClass` (base:1091), §2.5's `Reservation` kinds (base:1170–1171), §4.9's outside plots and decorations
(base:8653–8679), §4.12's `Destination` (base:9718), §7.3's S12 row (base:11709); **INDEX** §2's V13 and V14 rows
(INDEX:71–72) and §6 whole (INDEX:181–228); **SUMMARY** (SUMMARY:13–21, 57–89, 183–214); **the brief** Part D
(brief:139–161); **the gate spec** whole (gate:1–45). The base sections the readers read whole (§4.2 S3, §4.9, §4.12,
§7.1, §7.3, §11.4) are relied on through `read-base.md` where this design changes nothing of them.

### 1.1 The words (one word, one meaning)

| word | meaning here | reused from / new |
|---|---|---|
| **road access** (the two words always together; record `roadAccess`) | whether, by its kind, a road of the route network must, may, need not or must not reach a site: `required`, `preferred`, `none`, `avoided` | the owner's words; never bare *access* (V14 §2.3's `AccessPoint`; the water access class, V14:813, V13:2611; the dossier's access word, base §7.7 DR1) |
| **along** (`Placement.approach.role: 'along'`) | a route of the kind's class or better meets the site's frame: the site lies along it, its approach point the route's nearest polyline point to the origin; nothing of the route moves | V13's "a position along a route, never an end" (V13:1783): the same meaning made a value |
| **approach road** (`WorldRoute.origin: 'approach'`) | the map's own road from a site to the nearest route, laid by W7 (12), class `track` or `trail`, never a host edge | the base's "approach road" (the road by which a place is reached, base:13986, base:16529); one meaning — here the place is a world site |
| **approach** (`Placement.approach`; `SiteKindRow.approach`) | how the network reaches a site — along a route, by an approach road, or not — and, on the kind row, which of these the kind takes | V14's "approach side" (the side facing the nearest route, V14:1405, V14:1609) is the side the approach comes in by: consistent. The grammar shape `'approach'` (V14:927; a unit chain with a turn at every step, V14:1650) is the interior's way in — the same idea at the unit scale, kept, named in §4 |
| **coherence rows** (`SiteKindRow.coherence`; the `CoherenceCost` term `siteKind`) | the kind's coherence expectation: deterministic tests at the placement, each with a tolerance and a cost; the **expectation** proper is the rows whose cost exceeds `lawfulMax`, the rest preferences | the owner's "coherence expectation"; V13's *coherence* (`CoherenceCost`, `lawful`, `nearestLawful`); never the bare *expectation*, the kernel batch's word (base:4529) |
| **bend** (outcome `bend.site.placement`; `SiteKindRow.correction: 'bend'`, `.bendM`) | the autocorrect: a site's asked placement moved, within its kind's `bendM`, to the nearest placement meeting its expectation, named in the dry run, the DM's `keep` holding the asked point | V14's bend family (`bend.site.kind`, V14:1300–1303; J-VI.4; the base's "bent to the nearest lawful one, named in one line", item 101 R2) |
| **report** (`SiteKindRow.correction: 'report'`) | the world does not move the site: the cost and any anomaly are shown, the nearest lawful placement offered | the dry run's reporting, V13 §3.11.1 |
| `siteIncoherent`, `noRoadAccess` (`PlacementAnomaly.kind`) | a placed site whose expectation is unmet; a site whose road access is `required` and no approach was laid | **new** kinds of V13's existing record |
| **border post** | a bridge fort, fort, watchpost or toll house at a route's border crossing (V13 §3.9 (16)) | V13's; never a bare *gate* (V13:2463) |

`routed` is **retired** (J-A.2): the kind row's and the card's `roadAccess` replace it, read by the one rule of §1.4 (d).
The records and texts that name it are amended in §2; the dated records that cite it (V14's Revision 1 note at V14:11,
J-V14.37 at V14:2991) stay as history.

### 1.2 The catalogue columns — the kind rows (the design's centre)

**Five new `SiteKindRow` columns** (V14 §2.5's `tables/sites/kinds.json`; own; calibratable unless marked; `roadAccess`
copied to the card at the drop as `attraction` is):

```ts
roadAccess: 'required'|'preferred'|'none'|'avoided';   // the owner's "road access where appropriate": required — a road must reach it (the approach is laid; none laid is the anomaly noRoadAccess); preferred — laid where a road is within maxRoadM, else none and nothing reported; none — no approach is laid; avoided — no approach, and its coherence rows keep it off the roads; calibratable: false (an enumeration)
approach: { role: 'along'|'any'|'none' /* along — the kind lies along a route of class ≥ minClass or has no road; any — along where a route meets its frame, else an approach road; none — no approach; calibratable: false */;
            minClass?: 'highway'|'road'|'track'|'trail' /* the least route class that counts */; roadClass?: 'track'|'trail' /* the approach road's class */; maxRoadM?: number /* 'm': the longest approach road, straight-line */ };
coherence: SiteCoherenceRow[];                          // the coherence expectation on the world map; [] none
correction: 'bend'|'report';                            // bend — a placement edit whose asked point misses a row of cost > lawfulMax is bent, within bendM, to the nearest placement meeting every such row, named (bend.site.placement); report — nothing moves; calibratable: false
bendM: number;                                          // 'm': how far the bend searches; 0 with report
// SiteCoherenceRow { test: SiteCoherenceKind; tolM: number /* 'm': within this distance of the test's feature the row holds; 0 where the test is a threshold at the point's cell */;
//                    cost: number /* 'cost': the raw cost when the row fails — 5 (> place.coherence.lawfulMax 4) makes the placement unlawful: the expectation proper; 1 or 3 a preference */;
//                    minClass?: 'highway'|'road'|'track'|'trail' /* the route-borne tests: the least class that counts */; group?: string /* rows of one group are alternatives: the group costs the least of its rows */ }
// SiteCoherenceKind = 'onRoute'|'atCrossing'|'atPass'|'atBorder'|'onOverlook'|'onOre'|'onCliff'|'byWater'|'onShore'|'awayFromRoutes'|'inReach'   // V14's eleven plug-ins in V13's slot (§1.4 (a)); calibratable: false
```

**The shipped rows** (own, PLAUSIBLE until the V14-P panel and M-CAL/world measure them; every number a calibratable cell
with its unit; `—` an absent cell; "role · minClass · roadClass · maxRoadM"; a coherence row "test tolM · cost [class] [group]"):

| kind | `roadAccess` | `approach` | `coherence` rows | `correction` · `bendM` | why, in plain words |
|---|---|---|---|---|---|
| `fort` | required | any · track · track · 5 000 m | group `command`: onOverlook 0 m · 3, atPass 1 000 m · 3, atCrossing 1 000 m · 3 [track]; atBorder 2 000 m · 1 [track] | report · 0 m | a fort is supplied by road, so one must reach it; it wants to command a height, a pass or a crossing, and a border — preferences shown as cost; a fort stands where its builders put it |
| `tower` | preferred | any · trail · trail · 1 500 m | onOverlook 0 m · 1 | report · 0 m | a path where a road is near; a height preferred; solitude is its siting term (V14 §2.5), not a road rule |
| `temple` | preferred | any · track · track · 1 500 m | — | report · 0 m | pilgrims come by a road where one is near; a temple is where its faith put it |
| `shrine` | preferred | any · trail · trail · 1 500 m | onRoute 300 m · 1 [trail] | report · 0 m | a wayside shrine sits by the road (the base's "wayside shrines (one per through-road by default)", base:8676–8677) — a preference: a holy spring needs no road |
| `manor` | required | any · track · track · 5 000 m | inReach 20 000 m · 1 | report · 0 m | a manor has its drive; it is never free (V14:852's `country` row excludes it), so the columns act through the `inFrame` rule (§1.4 (f)) and the reach row is met by construction |
| `guildhall` | required | none | — | report · 0 m | a surface site: a building on a plot, whose access edge the base guarantees (base:7504, `Plot.access` ≥ 1 edge) — no world approach exists for it |
| `ruin` | preferred | any · trail · trail · 1 500 m | — | report · 0 m | the stone-robbers' track where a road is near; a ruin is where it fell |
| `cave` | none | none | onCliff 0 m · 1 | report · 0 m | a cave is found at a face, not served by a road; a cave on flat ground takes its face from the terrain pre-edit (`cliffFace`, V14:1358; SE9) |
| `mine` | required | any · track · track · 5 000 m | onOre 200 m · 5 | **bend · 1 500 m** | the ore must be there (the `extraction` purpose's hard `ore`, V14:1001, read at a point drop) and it is carted out, so a track must reach it |
| `hideout` | avoided | none | awayFromRoutes 300 m · 5 | **bend · 1 000 m** | a hideout on a road is no hideout: dropped beside one it is bent off it; a road laid past it later is reported, never moves it |
| `crypt` | none | none | — | report · 0 m | a tomb's levels; reached through its host or its own ground |
| `cellarComplex` | none | none | — | report · 0 m | never free; its host building's |
| `sewerLair` | none | none | — | report · 0 m | never free; the sewer's |
| `dungeon` | avoided | none | awayFromRoutes 300 m · 1 | report · 0 m | hidden by nature, but where the DM put it: a road beside it is shown as cost, never corrected |
| `camp` | preferred | any · trail · trail · 1 500 m | group `rest`: onRoute 300 m · 1 [trail], byWater 300 m · 1 | report · 0 m | a camp is pitched by a road or by water; transient, never moved |
| `battlefield` | none | none | — | report · 0 m | a battlefield is where the fight was (the host's event or the DM's): it expects nothing |
| `graveyard` | preferred | any · trail · trail · 1 500 m | inReach 20 000 m · 1 | report · 0 m | the dead lie near the living, reached by a path |
| `watchpost` | preferred | any · trail · trail · 1 500 m | group `post`: onOverlook 0 m · 1, onRoute 300 m · 1 [track] | report · 0 m | a post sees from a height or watches a road (V13 §3.9 (16) proposes one "on open ground" at a road's border crossing, which the `post` group admits) |
| `hermitage` | none | none | awayFromRoutes 1 000 m · 1 | report · 0 m | solitude: the hermit's own path is the site's ground |
| `bridgeFort` | required | along · road · — · — | atCrossing 100 m · 5 [road] | **bend · 1 500 m** | a gatehouse astride a road's river crossing: dropped near one it is bent onto it; off every crossing within reach it is unlawful |
| `tollhouse` | required | along · road · — · — | onRoute 0 m · 5 [road]; atBorder 2 000 m · 1 [road] | **bend · 1 000 m** | "the gatehouse astride the road" (V14:1572): on a road of class road or highway, or it is unlawful; a border crossing is where it earns |

Against today's `routed` column (V14:911–921: fort, bridgeFort, tollhouse, mine, manor, guildhall, temple `yes`): the
seven keep a road (`required` or `preferred`; temple `preferred`), and tower, shrine, ruin, camp, graveyard and
watchpost gain a `preferred` one (a path where a road is near, nothing reported where none is); no kind loses a road;
`attraction` is untouched. The kinds that **bend** are exactly the four whose expectation rows cost 5: tollhouse, bridge
fort, mine, hideout.

**Which columns act on which attachment.** On a **`free`** site every column, through V13's placement operators and W7
(12) (§1.4 (b)–(d)). On an **`inFrame`** site `roadAccess` alone, through the hinterland's link to the nearest way
corridor (§1.4 (f); BCR-V14-26): its placement is no world placement (V14:1937), so it has no coherence term and no bend.
On a **`surface`** site nothing new: the plot's access edge (base §4.7's guarantee). On an **`attached`** site nothing:
its host building's or element's. On a **`ground`** card nothing: a marker-like card has no gate (J-A.14). A
**host-placed** site takes its coherence rows as a reading and its approach as the world's work, never a bend (§1.4 (h)).

**The tests' constants** (own, calibratable; stated with the plug-ins in V14 §2.5's comment block, as the seventeen
terms' are): `passRunM` 1 000 m (a pass point is the highest vertex of a route within ± 1 000 m along it),
`passCrossM` 300 m and `passReliefM` 60 m (the ground 300 m to each side across the route stands ≥ 60 m above it),
`overlookMin` 0.5 (the `overlook` plug-in's value, i.e. ≥ 20 m above the 300 m mean), `cliffSlope` 0.30 (A2's
`cliffFace` threshold, V14:1358). Every other number is a row's own `tolM`, `cost`, `maxRoadM` or `bendM`.

### 1.3 The rule tables V13 gains (shipped, with units)

| table · cell | value | unit | why |
|---|---|---|---|
| `place.coherence.weights.siteKind` (V13 §2.3's `CoherenceRule.weights`, which is keyed by the term union and so gains the key) | 1 | weight | the kind's rows carry their own costs; one weight keeps a row's cost its cost |
| `world.polity.patrol.gradeShift.trail` (beside highway +1, road 0, track −1) | −1 | rung | a trail — an approach road of class `trail`, or W7 (5)'s trail to an unjoined seat — is patrolled as sparsely as a track; today no row names a trail (V13:1123) |

No other V13 table cell: the bend reads `place.coherence`'s `lawfulMax` (4), `originSearchM` (20 000 m, the offer's
reach) and `originStepCells` (2); the approach road reads `world.routeLay`'s `existingRoute` (0.5), `maxCostFactor` (6)
and `routeToleranceM` (60 m) and `world.routes`' cost law — so every number of the mechanism has a table home (C13-31).

### 1.4 The mechanism that reads the columns

**(a) The coherence tests — V14's plug-ins in V13's slot (J-A.3, J-A.4).** V13 §2.2 gains, beside `SuitabilityTerm`, a
second slot of the same pattern (SW-01: V13 owns the slot, V14 the plug-ins):

```ts
interface SiteCoherenceTest { kind: string;   // a SiteCoherenceKind (V14 §2.5)
  holds(at: WorldPointCm, ctx: SuitabilityContext, row: { tolM: number; minClass?: string }): boolean;            // pure, deterministic — no draw (SW-03)
  target(at: WorldPointCm, ctx: SuitabilityContext, row: { tolM: number; minClass?: string }, withinM: number): WorldPointCm | null }
  // the nearest point within withinM of `at` where `holds` is true — a point on the feature for a line-borne test, a fine cell's centre for a raster test; ties by the lower cell index, then the lower (y, x); null where none
declare const siteCoherence: { register(test: SiteCoherenceTest): void; get(kind: string): SiteCoherenceTest };   // @plat/world/siting; a duplicate kind is refused at registration
```

V13 defines none. V14 §2.5 defines the eleven once in `@plat/sites/siting` beside the seventeen terms, each a pure
function of the context. Every route-borne test reads the network at the week (V13:1773–1775: "a hidden road counts as
no public road"), counts a route only at `minClass` or better (highway > road > track > trail; water legs never), and
ignores the site's own approach road:

| test | holds at point p when | its target |
|---|---|---|
| `onRoute` | a route's polyline passes within `tolM` of p | the nearest point on such a polyline |
| `atCrossing` | a point where such a route's polyline crosses a reach ≥ `riverMinM3s` (W7's crossings, V13:755) lies within `tolM` | the nearest such crossing point |
| `atPass` | a pass point of such a route lies within `tolM`: a polyline vertex whose ground is the highest of the route's vertices within ± `passRunM` along it and whose ground `passCrossM` to each side across the route stands ≥ `passReliefM` higher | the nearest pass point |
| `atBorder` | a point where such a route crosses an allegiance border or a debatable band of the sway in force (the points V13 §3.9 (16) proposes border posts at) lies within `tolM` | the nearest such point |
| `onOverlook` | V14's `overlook` plug-in at p's cell ≥ `overlookMin` | the nearest cell centre where it is |
| `onOre` | a W5 resource site of kind ore lies within `tolM` (V14's `ore` plug-in is 1 there) | the nearest ore site's `at` |
| `onCliff` | the dem's gradient at p's cell ≥ `cliffSlope` | the nearest cell centre where it is |
| `byWater` | `distToRiverM` at p ≤ `tolM` (a lake or a spring counts, as V14's `waterNear` reads it) | the nearest land cell centre where it is |
| `onShore` | `distToShoreM` at p ≤ `tolM` | the nearest land cell centre where it is |
| `awayFromRoutes` | no route of any land class passes within `tolM` of p | the nearest cell centre where none does |
| `inReach` | a settlement placement's origin lies within `tolM` | none (a reading only) |

**(b) P1 for a site subject — the `siteKind` term and the bend's search (J-A.3, J-A.5).** `coherence(world, frame,
origin, bearing)` on a `Placement` whose subject is a site evaluates two terms only: **`siteKind`** — Σ over the card's
kind row's coherence rows of the row's `cost` where `holds` is false, a group counting the least cost of its failing
rows and nothing when one of its rows holds — and **`dossier`** (unchanged; today no host site fact is a DR row, so 0).
`total = Σ w_t · raw_t` with `place.coherence.weights.siteKind` 1; `lawful = total ≤ lawfulMax` (4): one failing row of
cost 5 makes the placement unlawful (C13-26's precedent: the decisive error unlawful at the bound), and preferences add
up without moving anything. The site form runs in both orders — in world-first mode too, where a frame's P1 does not
run (V13:2077–2078: "there is no frame to measure"), because a site's two terms need no frame — and it has no bearing
search (the bearing is the request's, by default the approach side facing the nearest route, V14:1405), no P2 and no P3
(the world never blends to a site: the site's ground is materialized under its charter, V14 §3.4 (c)).
`nearestLawful(world, frame, origin)` for a site subject, with a radius R, takes as candidates (i) each failing
row's `target(origin, ctx, row, R)` and (ii) the spiral stations over the fine grid out to R in steps of
`originStepCells`, evaluates the two terms at each, and returns up to three lawful placements by ascending `total`,
ties by distance from the asked origin, then by the lower cell index, then by (y, x) — V13's contract (V13:2112) with
a point list beside the spiral. R is the kind row's **`bendM`** for the bend and V13's **`originSearchM`** (20 000 m)
for the offers. No draw anywhere.

**(c) A placement edit with a point — the bend (J-A.6).** `dropSite`'s dry run for a free-standing drop with a point
(V14:2243) runs (b) on the scratch overlay at the asked origin; the same runs for `requestCharter` and `setPlacement`
with a site subject:
1. **lawful** → the ghost at the asked point, the cost by row beside it (a preference unmet reads, say, "off the road: 1").
2. **unlawful, `correction: 'bend'`, a lawful placement within `bendM`** → the ghost is drawn **at the best one**, the
   move named in one line as a bend (`bend.site.placement`: "bent 420 m onto the road", with the row and the
   distance), the asked point a faint mark; the actions are `W_PLACE_NO_LAWFUL`'s (V13:2886) with the offer
   preselected: `takeOffer` (the default; `offer: n` for the second and third), `keep` (the asked point, flagged
   unlawful), `cancel`.
3. **unlawful otherwise** (`correction: 'report'`, or nothing lawful within `bendM`) → the asked point kept, flagged
   unlawful, the nearest lawful placements within `originSearchM` offered, none preselected (`keep` the default,
   `takeOffer`, `cancel`); none found → kept with no offer (V13 §3.18 (1)'s form).
The accepted event carries the chosen origin (`dropSite.placement`, V14:2261; `setPlacement.originCm`), so the log
replays the DM's choice; the fold writes the `Placement` with the `coherenceCost` at the chosen origin, a kept
unlawful point keeping `lawful: false` (V13:2849's `accept: ['unlawful']` admits it on `setPlacement`; a site's
`requestCharter` is never refused for its coherence, item 101 R2). **A drop with no point** ("a fort somewhere on the
pass") adds every row of cost > `lawfulMax` as a refusing filter beside the purpose row's `hard` terms (G3's search,
V14:1407–1414), so its result meets the expectation by construction and no bend runs. **Never later by itself:** a
world edit, a re-derivation or a network window that breaks a placed site's expectation moves nothing (the placement is
an input, kept by every world re-derivation, V13:1254; item 137 (c)); it is (e)'s anomaly.

**(d) The approach — W7 (12) (J-A.1, J-A.7, J-A.9, J-A.10).** V13 §3.8 gains a twelfth point, **Approaches**, run as
W7b's last step on a standalone world (after (5)'s trails, before (6)'s reasons), after the genesis and after each
`network` window on a host-bound world, and as a local operator of a site's placement edits (`requestCharter`,
`setPlacement`, `unplaceFrame` with a site subject), of `setAttr site/roadAccess` and of adoption. For every
`Placement` with a site subject whose card's `roadAccess` is `required` or `preferred` and whose kind row's
`approach.role` is not `none`, in the placements' lineage-key order:
1. **Along.** Where a route of class ≥ `minClass` meets the site's frame (the placement's charter rectangle through
   `toWorld`), the site lies along the nearest such route (by the distance from the origin to its polyline, ties by the
   lower route lineage key): `Placement.approach = { role: 'along'; route; atCm }`, `atCm` the polyline's nearest point
   to the origin (integer cm; ties by the lower vertex index). **No route is written:** its polyline, stations, effort
   and lay version stay byte-identical.
2. **An approach road.** Else, where the role is `any`: one A\* (W7 (4)'s lifted bucket queue, heuristic, ellipse and
   tie rule; integer costs) from the origin's fine cell to the nearest fine cell carrying a route of class ≥ `minClass`
   that lies outside every placed settlement frame's extent + margin (an approach road never enters a settlement's frame,
   so no settlement's charter changes for a site), within `maxRoadM` of the origin in a straight line, over W7 (2)'s
   cost surface with the `existingRoute` discount against every route already laid (earlier approach roads among them),
   a path over `maxCostFactor` × the straight cost dropped; the polyline the origin point, then the path's cell centres
   simplified at `routeToleranceM`, ending at the **junction** — the joined route's polyline point nearest the path's
   last cell — and never crossing a water cell. It is written as a `WorldRoute` of origin `approach` (`a` the site's
   placement, `b` the joined route, `class` the row's `roadClass`, `mode` `land`, no `hostKey`), its integer fields and
   stations evaluated as (7) says, its cells entering the `route` layer: `Placement.approach = { role: 'road'; route:
   the approach road; junction: { route; atCm } }`.
3. **None.** Else (an `along` kind no route meets; no path; no route within `maxRoadM`): `Placement.approach = { role:
   'none' }`; a `required` site raises `W_SITE_NO_ROAD_ACCESS` (the site, the nearest route of its class and its
   distance) and stands under the anomaly `noRoadAccess` (e); a `preferred` one reports nothing.
4. **Order, determinism, locality.** Every along reading first, then the approach roads in lineage-key order, so a later
   one rides the earlier (the discount) and may join an earlier approach road of class ≥ its `minClass`; every search
   keyed as W7's (cost × 1 000 rounded, cell index); no draw. A site's edit re-lays its own approach and then every
   approach road that joined it, in order — its closure, named by the dry run (W7 (10)); a W7a/W7b re-run (a seat, a
   cost law, a lay rule) re-lays every approach of the landmass after it; the cascade's step 5 re-lays an approach road
   whose cells a moved reach crosses (V13 §3.14.2). An approach road is tombstoned when its site is unplaced or adopted
   (a settlement founded there is a seat W7 routes to), when its `roadAccess` becomes `none` or `avoided`, or when a
   route laid later meets the site's frame (the site then lies along it).
5. **What reads an approach road** — every reader of `WorldRoute` and the `route` layer, unchanged: `roadsAt`; P4 (6)'s
   charter `roads` (the site's own frame, or another site's; never a settlement's, by 2); V14 E1 (4)'s way bands; the
   patrol cadence (g); the view's `routes` layer and the exports; `derivedTime` and `pointAtTime` along it (a label,
   never sent). It is not in `routes.stage1` (laid after W7b), so W6b's `connectivity` never reads it, and it joins no
   seat, so it makes no member continuous (W8b (9)).
6. **On a host-bound world** the host's network is untouched: no host route moves (so no `timeDelta`, no
   `W_TRAVEL_BAND_CROSSED`), and an approach road carries no host key and is in no `canon` slot, no `routeFacts` row,
   no `patrolOffer` row and not in `routes(world)`'s host-keyed list; it rides the DM's `mapFeed` keyless as the map's
   own road, drawn by the host's map surface only by its own choice (H31). J-RR.21's "a `WorldRoute` only for a
   host-named edge" is read as the host network's rule (J-A.16).
7. **What it is not:** a seat (W7 (1) no longer seats a site), a host edge, a leg's end — W7 (11) stands: a site is a
   position along a route, or the end of the map's own approach road.

**(e) The anomalies and the DM's choices.** `PlacementAnomaly.kind` gains **`siteIncoherent`** (a placed site whose
coherence, evaluated now, is unlawful: the detail names the failing rows and the nearest lawful origin within
`originSearchM` where one exists) and **`noRoadAccess`** (a `required` site whose approach is `none`). Both are derived
readings (V13 §2.4; V13:801: never persisted), re-evaluated at every placement edit of the site, every W7 (12) run and
every W7a/W7b run, `network` window, sway revision and cascade whose inputs reach the site's rows — so a tollhouse whose
road the host demotes to hidden reads `siteIncoherent` at the next window (a hidden road is no public road) and a
hideout a new road passes reads it at the next lay. The stored `Placement.coherenceCost` stays the edit's (as the
`territory` term is "evaluated once, stored … never re-scored", V13:2099); the anomaly is the live reading. Neither
moves the site. The DM's choices on a site's `W_PLACE_ANOMALY` are `keep` (the default) and `takeOffer` (a
`setPlacement` to the nearest lawful origin the detail names; not offered under `hostLocked`): `ConflictAction.kind`
already carries `takeOffer` (BCR-V13-9). `worldWins { ids }` keeps its meaning (V14's re-materialization on a stale
charter, V13:2923) and is not offered for these two kinds: a site's incoherence is cured by moving the site, not by
re-deriving its arenas (J-A.13). A preference unmet raises no anomaly: it is the cost by row on the placement card.

**(f) The frame side.** (1) **A site frame's charter carries its roads.** P4 (6) runs for a site subject as for any
frame (V13:2070–2072), so the route the site lies along, or its approach road, crossing the site frame's ring is a
charter road of its class; V14's §1b.6 charter row (V14:478) and §3.4 (c)'s list (V14:1436–1437) name the charter
without roads and gain them. A charter road's `forced` reads only on a settlement frame (no S3 runs on a site document,
V14:1218). (2) **The ground joins the road to the gate.** G5 (f) (V14:1696–1698) gains a last step: for each
charter road, one way of its `WayClass` from its ring station to the nearest entrance `GateSite` of the envelope (G5
(e)'s `forced` gates, V14:1675–1676), routed by S4's router as `drawWay` routes a pair (base §7.1) — the hinterland
unit's ground round it; a route the site lies along crosses the ring twice and reaches two gates, so the road runs
through a tollhouse's or a bridge fort's two entrances; a gate no road can reach reports the way `unserved` (F-ROUTE's
rung, never silent). This is item 135 (a)'s refinement: the world's road ends at the site's frame, the frame's way at
the gate. (3) **`inFrame`** (BCR-V14-26; J-A.8): a card whose `roadAccess` is `required` links its reservation's
entrance gate to the nearest way corridor by an L3 **`driveway`** face (the outside plot's form, base:8662), one
`preferred` by an L3 **`path`** face (the decoration's form, base:8678), laid by §7.3's S12 row round the reservation
at the drop; `none` and `avoided` link nothing. No S4 `Destination` is minted (base:11703's gate-count rule would
re-derive S3 for a new destination); after adoption the gate is S4's `worldSite` destination as today (base:9718).
(4) **`surface`**: the plot's access edge. (5) **`attached`, `ground`**: none.

**(g) The encounter crop, patrols, the travel law, the lenses.** E1 (4) (iii) lays the charter's roads as way bands
(V14:1990): an approach road crossing the 100 m crop frame is a band of its class and the `road` profile row
("within 15 m of a way or route", V14:966) reads it — nothing new. W8b (14)'s "the power's nearest garrisoned seat,
fort or watchpost along the segment" (V13:1979) reads: a garrisoned fort or watchpost is along a segment when its
approach lies along it or its approach road joins it, the round trip measured from the site's origin over its approach;
an approach road carries its own cadence as a route segment of its class (`gradeShift.trail` −1, §1.3); `patrolOffer`
stays per host edge. The travel law: an approach road has its `stations`, so `derivedTime` from a settlement to a site
runs along the route to the junction and up the approach road — a label on the map, never a time sent to the host (a
site is no host node). The view: the `routes` layer draws an approach road at its class's existing style (V13:3013);
the `anomalies` layer carries the two new kinds (V13:3023); the patrols lens draws an approach road's cadence as any
segment's; the sway lens is untouched (a garrisoned site is a claim point whatever its road, V13:1912–1914).

**(h) The host-placed site (the kept rule; J-A.12).** "A host-placed site (its record's position) is never re-sited"
(V14:1416–1417) stands. Its position arrives as a `requestCharter` with a site subject and `author: 'host'`, the
`Placement` written `hostLocked: true` (V13:746's meaning: an origin edit refused); (b) runs for the reading only — no
bend, no offer — its cost stored and `siteIncoherent` reported DM-only; W7 (12) lays its approach as for any site
(the world yields to the host's fact, as it yields to a canonized seat, V13:2408–2410). Nothing of this reaches the
host (bar 9). Until the host's site record exists (V14 §11 Q2) no site is host-placed.

**(i) Standalone and host-bound, one rule.** Every step above runs on both; the differences are W7's own: on a
host-bound world W7 (12) never selects a pair, never mints or moves a host edge, and its approach road is the map's
road (d) 6; on a standalone world the same, inside W7's own selection.

**(j) Edit events, undo, locks, the stamp, the DM's verbs.** No new event kind: `dropSite` (its `placement` the chosen
origin), V13's `requestCharter` / `setPlacement` / `unplaceFrame` with a site subject, and one new `setAttr` path
`site/roadAccess` (V14 §4.2; W7 (12) re-run for the site). The outcome key `bend.site.placement` (V14 §4.9's family);
the warning `W_SITE_NO_ROAD_ACCESS`; `W_PLACE_NO_LAWFUL` and `W_PLACE_ANOMALY` gain their site forms. **Locks:** the
approach is derived — never locked, never an undo target, rebuilt by W7 (12); a standalone route's class stays the DM's
`setAttr` (an approach road's too, as any standalone route's). **Undo:** a site placement edit's undo is V13's (the
former placement restored), W7 (12) re-laying the former approach as a derived product, the approach road keeping its
id by its creation key (§1.5). **The stamp:** a site's placement is world-first (`'world'`): the site has no arenas
before it is placed and is materialized under its charter; a bend moves only the proposal; `worldWins` on a site stays
V14's re-materialization under the new charter, its roads included. **The DM's verbs** stay the owner's: `keep`,
`takeOffer`, `cancel`, `setPlacement`, `worldWins` (scoped), `setAttr`.

**(k) Performance** (V13 §6's register gains two rows). `WORLD-16`: a site's placement dry run — the two terms at
the asked point, the bend's search within `bendM` — ≤ 20 ms at the realm rung, and with the offers' search out to
`originSearchM` ≤ 150 ms; `WORLD-17`: W7 (12) for one site ≤ 20 ms, a whole landmass's approaches ≤ 0.1 × the W7a + W7b
row (V13:3460). The work: a test is ≤ 11 raster, index or distance reads (the route distance is V14's `routeNear`
read); the bend's candidates are ≤ 11 targets plus (2 · ⌈bendM ÷ fineCellM⌉ ÷ originStepCells + 1)² spiral stations —
49 at the province rung for 1 500 m, 25 at the realm rung —; the offers' spiral out to 20 km is ≤ 1 681 stations at the
realm rung (≈ 18 500 reads); an approach road's A\* is bounded by its ellipse inside `maxRoadM` (≤ 5 km: ≤ 10⁴ fine
cells at the province rung). Fine cells are 250 / 500 / 1 000 m (V13:997–999), so a 200 m tolerance is a sub-cell
test made at a point, never a cell lookup alone.

**(l) The failure ladder.** F-PLACE (V13:2787) gains two detections for a site subject: **site incoherent** — the asked
point unlawful: `bend` → the nearest lawful within `bendM` preselected (`bend.site.placement`), else (and under
`report`) the asked placement kept, flagged, the nearest lawful within `originSearchM` offered (`W_PLACE_NO_LAWFUL`);
**no road access** — W7 (12)'s step 3: `role` `none`, `W_SITE_NO_ROAD_ACCESS`, the anomaly `noRoadAccess` where
`required`. F-SITE's G3 row (V14:2138) gains the bend as a point drop's first rung. Never a refusal of the drop: a
declaration is bent or kept and reported (item 101 R2; base §7.1's outcomes).

**(m) The host track under door 1 (H-rows).** Door 1 stays closed and the canon carries no site road: an approach
road, an along reading and the two anomalies are map facts; no host route moves; nothing new is sent to the simulator
feed. One **optional** host row, V13 §8.5's **H31**: "with M-W2, after H19: its map surfaces draw the map feed's
approach roads — the map's own roads to world sites, keyless — as presentation labelled 'map road', read by no step of
its simulation" — waits on M-W2 and H19 (its map surfaces re-pointed to the map feed's paths). The partial's H31 (the
host's site record carrying the edge key a site stands on) is withdrawn: the map reads *along* by geometry, and the host
has no site record (V14 §11 Q2).

**(n) Border posts.** V13 §3.9 (16)'s transient `SitingProposal` of demand `borderPost` takes as its `at` the crossing
point on the route's polyline (a point, never a cell centre), so an accepted card lies along the route by construction
and meets its kind's rows: a toll house `onRoute`, a bridge fort `atCrossing`, a fort `atPass` in its `command` group, a
watchpost `onRoute` in its `post` group.

### 1.5 Identity, lifecycle, determinism

| new field or record | identity (V13 §2.5 / V14 §2.8) | lifecycle (V13 §2.6 / V14 §2.9's columns: create · read · persist · regenerate · undo · migrate) |
|---|---|---|
| `SiteKindRow.roadAccess`, `.approach`, `.coherence`, `.correction`, `.bendM` | table cells of `tables/sites/kinds.json`, no entity | shipped; `editTable` · G1's dialog, the drop, P1's site form, W7 (12) · the override layer · a table edit governs new drops and the next placement edit of a site; existing cards keep their `roadAccess` (a card is declared, V14:2396) · §7.4's editTable row · an older document reads the shipped defaults |
| `WorldSite.roadAccess` (replacing `.routed`) | the card's declared field, in its model digest as `attraction` is (V14:559) | copied from the kind row at the drop; `setAttr site/roadAccess` · W7 (12) through the resolver (R-V14-1) · the card · kept by every re-derivation · the inverse · an older card with `routed`: `true` reads the kind row's value where that is `required` or `preferred`, else `preferred`; `false` reads the kind row's value where that is `none` or `avoided`, else `none`; reported in the load's migration report |
| `Placement.approach { role: 'along'\|'road'\|'none'; route?; atCm?; junction?: { route; atCm } }` | none of its own: a reading of its placement | W7 (12) · the charter's roads, the patrols, the clerk's `why placement`, the view · persisted with the placement, as `coherenceCost` is, rewritten only by W7 (12) · re-laid by W7 (12) at every run reaching it · never an undo target (re-laid after the placement's undo) · absent: W7 (12) at load |
| an approach road (`WorldRoute` of origin `approach`) | creation key (`route`, the site placement's lineage, `approach`) — so a re-lay keeps its id and a moved site keeps its road's address; anchor: by its site | W7 (12) · (d) 5's readers · the entities block, each re-lay bumping `layVersion` · re-derived by W7 (12) · with its site's placement edit (derived) · absent: W7 (12) at load; tombstoned as (d) 4 says |
| `CoherenceCost.terms[].term` gains `'siteKind'` | — | stored on the `Placement` at the edit, as every term is; re-evaluated live for the anomaly only |
| `PlacementAnomaly.kind` gains `'siteIncoherent'`, `'noRoadAccess'` | derived, never persisted (V13:801) | re-evaluated as (e) says |
| the `siteCoherence` registry (`@plat/world/siting`) | code, never persisted | registered at load by `@plat/sites`; a duplicate kind refused |
| `place.coherence.weights.siteKind`, `world.polity.patrol.gradeShift.trail` | table cells | `editTable`; a change re-reads at the next placement edit (the weight) and at the next sway revision (the patrol shift) |

**Determinism and no draw.** The tests, the bend's search, the offers and W7 (12) draw nothing; every tie falls to a
value or an index (the lower cell index, then (y, x); the lower route lineage key; the lower vertex index; ascending
cost, then distance); the comparator lint (T-V13-1) covers `@plat/world/siting` and V14's `@plat/sites/siting`;
`world.siting` and `place.search` stay reserved ids with no stream (V13:2799–2801). **No hour** anywhere: the tests read
the week only through the network and the sway in force. **Nothing of the simulator:** the host's graph has settlement
nodes only (rr HS20); no site node, time or road is sent.

### 1.6 Tests (each new behaviour has one)

V13 §7.3's form (`| id | what it asserts | how |`):

| id | what it asserts | how |
|---|---|---|
| T-V13-57 | **approaches (W7 (12)):** on B-WORLD-lite with one card of every `required` and `preferred` kind dropped free: a tollhouse and a bridge fort on a road lie along it (`approach.role` `along`, `atCm` on the polyline) and **every route is byte-identical** before and after (polyline, stations, effort, lay version); a fort 3 km from a road gets an approach road of class `track` ending at a junction on the nearest track-or-better route, its cells in the `route` layer, its site frame's charter naming it as a road; a shrine 2 km from every road (beyond its 1 500 m `maxRoadM`) gets none and nothing is reported, a mine 6 km from every road gets none with `W_SITE_NO_ROAD_ACCESS` and `noRoadAccess`; no approach road crosses water or enters a placed settlement frame's extent + margin, and no settlement's charter changes; two runs are byte-identical; a later approach road rides an earlier one (shared cells); on the host-bound fixture no host route moves, `timeDelta` is empty, no approach road carries a host key or appears in the canon, `routeFacts`, `patrolOffer` or `routes(world)`'s host list, and the DM's map feed carries it keyless; a re-lay keeps the approach road's id; unplacing the site tombstones it; a route laid later through the site's frame turns the approach to `along` and tombstones the road | the world fixtures; a mock host |
| T-V13-58 | **a site's coherence:** every shipped kind row's coherence rows evaluated at a fixture point per row, met and unmet (each of the eleven tests at its tolerance ± 1 cell or ± 1 m on a line); a tollhouse dropped 600 m off a road is unlawful, the dry run preselects the road point 600 m away with `bend.site.placement` naming the row and the distance, `keep` places it at the asked point unlawful with `siteIncoherent`, `takeOffer` places it on the road; a hideout dropped 150 m from a road is bent to the nearest point beyond 300 m; a tollhouse dropped 4 km from every road (beyond its 1 000 m `bendM`) is kept unlawful with the nearest lawful within 20 km offered, none preselected; a camp off every road and water is lawful at cost 1 and raises no anomaly; a fort with no height, pass or crossing is lawful at cost 4 (3 + 1); a host-placed tollhouse (`hostLocked`) off every road is neither bent nor offered and reads `siteIncoherent` DM-only; a road the mock host demotes to hidden under a placed tollhouse raises `siteIncoherent` at the next window and moves nothing; a drop with no point never lands on a point failing a row of cost 5; the stored `coherenceCost` is the edit's while the anomaly reads the present; every search is bit-identical across two runs | the placement fixtures |
| T-V13-21b (extended) | the cascade's consumers gain (21) W7 (12)'s approach roads: a cascade that moves a reach under an approach road re-lays it and nothing outside its closure | one more consumer test |
| T-V13-42 (extended) | a garrisoned fort whose approach lies along a segment, or whose approach road joins it, is that segment's patrol source and its round trip runs over the approach; one with approach `none` is not; an approach road of class `trail` runs one rung sparser than a road (`gradeShift.trail` −1) | the patrol fixtures |
| T-V13-43 (amended clause) | a site dropped beside a host route leaves the leg count, the route's polyline and its effort unchanged, the site lying along it or joined by an approach road that no `routeFacts` row names | the travel-law fixture |

V14 §7's form (`| id | family (§13) | bar | tier (§13.8) |`):

| id | family (§13) | bar | tier (§13.8) |
|---|---|---|---|
| T-V14-8 (amended clause) | siting | "a routed fort gains a road" reads "a fort, whose road access is `required`, gains an approach — along a route or by an approach road — and is no seat of W7's pair selection" | nightly (from V13's W1) |
| T-V14-34 | rule bar (the catalogue) | every kind row carries `roadAccess`, `approach`, `coherence`, `correction` and `bendM` with the shipped values; `correction` `bend` exactly on the four kinds with a row of cost > `lawfulMax`; no kind row or card carries `routed`; an older card's `routed` migrates by V14 §2.9's row and is reported; the card copies `roadAccess` at the drop and an `editTable` of a kind row's `bendM` changes the next drop and no placed site; a `setAttr site/roadAccess` to `none` on a fort tombstones its approach road and leaves every other route byte-identical; the eleven `SiteCoherenceTest` plug-ins are pure (a fixture point per test, two runs bit-identical) and registered once; the one-click drop of every kind at a point reads its rows — a bend named in one line or a cost by row — with no dialog; every word a catalogue key (`bend.site.placement`) | PR |
| T-V14-35 | rule bar (the frame side) | on B-SITE over V13's world fixture: a free fort's site frame's charter carries its approach road as a road of its class and its ground lays one way from that road's ring station to the nearest entrance gate; a tollhouse along a road carries the road through its two gates; a gate no road reaches reports the way `unserved`; an `inFrame` fort's reservation gains one L3 `driveway` face from its entrance gate to the nearest way corridor, an `inFrame` shrine one `path` face, an `inFrame` hideout none, and nothing else of the host is re-derived (bar 6's oracle); a `ground` graveyard gains no face; a crop at a tollhouse reads the profile `road` with the road's band inside its frame | PR |

### 1.7 Decisions (J-A.n; each "chose X over Y because Z"; vetoable; landing rows in §2)

| id | decision | lands as |
|---|---|---|
| J-A.0 | chose to read "the catalogue" as V14 §2.5's site kind rows, carrying every per-kind rule as kind-row columns, over another list (V09 §4.9's message keys, V11's symbol catalogue), because the sentence needs a per-kind source of "where appropriate" and only the kind rows are one; put to the owner as OQ-A1 | J-V14.57 |
| J-A.1 | chose a site to lie **along** a route or be joined by an **approach road**, never a seat of W7's pair selection, on both worlds, and **no route bent** to a site, over seating a `routed` site among the Urquhart seats (V13:1713–1716; V14:1446–1447) or giving a route a vertex at the site's cell (the partial's W7c), because (a) W7 (11) already makes a site "a position along a route, never an end" on a host-bound world and one rule beats two; (b) a rank-0 seat beside a capital pulls a pair edge classed by the higher seat (V13:1748: a highway to a mine); (c) a bound route's geometry is the host's lived network, "mirrored, never computed" (V13:1766), and a fine-cell vertex would shift a road by up to half a cell; (d) the bend brings the site that must stand on the road to it | J-V13.107 |
| J-A.2 | chose to **replace `routed` with `roadAccess`** on the kind row and the card, over keeping `routed` as a derived boolean beside it, because two fields with one meaning would be a drift and the owner's own words name the field | J-V14.58 |
| J-A.3 | chose the kind's coherence rows as **one more term (`siteKind`) of V13's coherence cost** for a site subject, searched by `nearestLawful` and reported by `PlacementAnomaly`, over a V14-side check before the drop, because the owner's word is "coherence" and V13's placement law already judges, searches, offers, stores and reports | J-V13.108 |
| J-A.4 | chose the eleven tests as **V14's plug-ins in a V13 slot** (`SiteCoherenceTest`, `siteCoherence.register`), over formulas in V13, because SW-01's pattern keeps one registry and the kinds are V14's domain | J-V13.108 |
| J-A.5 | chose **per-row costs under the one `lawfulMax`** (5 the expectation proper, 1 or 3 a preference; groups of alternatives), over a `required` flag and a second weight, because C13-26's bound already decides "unlawful" by cost and a calibrator edits one cell per row | J-V13.108 |
| J-A.6 | chose the bend **preselected in the dry run within `bendM`, the DM's `keep` holding the asked point, and beyond it the nearest lawful placement offered, never taken**, and **never a bend after the edit** (a later break is an anomaly), over the offer shown and not taken, or a placed site re-sited by a later world change, because the owner's word is that the site's geography autocorrects, item 101 R2 bends rather than refuses, V13 §1.3's correction offers the nearest lawful placement, and item 137 (c) keeps a locked thing where it stands | J-V13.109 |
| J-A.7 | chose the world's road to **end at the site's frame**, the site's ground joining it to the gate by S4's router, over a world-scale polyline to the envelope, because fine cells are 250–1 000 m and item 135 (a) refines the coarse fact at the finer scale | J-V14.59 |
| J-A.8 | chose the **`inFrame` road access by the hinterland's own faces** (`driveway` for `required`, `path` for `preferred`), over an S4 `worldSite` destination at the drop, because the base's gate-count rule re-derives S3 for a new destination (base:11703) and the hinterland's faces cost no gate | J-V14.60 |
| J-A.9 | chose an approach road as a **`WorldRoute` of origin `approach`**, over a polyline on the placement, because every reader of roads reads `WorldRoute` and a second source would fork the one network; `Placement.approach` keeps the reading | J-V13.110 |
| J-A.10 | chose W7 (12) **after W7b, incremental per site** (its closure: the site and the approach roads that joined it), over re-running W7a/W7b at every drop, because W7 (10) moves nothing outside a closure and V14 §4.7 promises the same | J-V13.110 |
| J-A.11 | chose a garrisoned fort or watchpost to be a **patrol source through its approach** only, over any site near the segment, because W8b (14)'s "along the segment" needs a reading and the approach is the one the road gives | J-V13.111 |
| J-A.12 | chose to **keep "a host-placed site is never re-sited"** (V14:1416–1417) with its rows read and its approach laid, over an owner question, because the host's record is a dossier-tier fact (item 20 (h)) and the world yields to it as to a canonized seat (V13:2408–2410) | J-V14.61 |
| J-A.13 | chose `takeOffer` as the DM's second choice on a site's `W_PLACE_ANOMALY` and **no anomaly for a preference**, over the scoped `worldWins` and a pin per cost, because a site's incoherence is cured by moving it, not by re-deriving its arenas, and a camp off a road is no fault | J-V13.112 |
| J-A.14 | chose that a **`ground` card takes no approach**, over a path to a camp or a battlefield, because a marker-like card has no gate and the base's decorations already link what wants a trail (base:8678) | J-V14.62 |
| J-A.15 | chose **four bending kinds** (tollhouse, bridge fort, mine, hideout) and `report` for the other seventeen, over bending every kind with a preferred feature, because only those four are nonsense off their feature (a toll off the road, a bridge fort off the crossing, a mine off the ore, a hideout on the road); a fort, a temple or a tower stands where its builders put it | J-V14.63 |
| J-A.16 | chose an approach road on a **host-bound world as the map's own road** — no host key, in no simulator-feed message, keyless in the DM's map feed, drawn by the host's map surface only by its own choice (H31) — reading J-RR.21's "a `WorldRoute` only for a host-named edge" as the host network's rule, over no approach road on a host-bound world, because the owner's "integrated into road infrastructure" holds on every world, the host reads no site geometry (rr HS20), and a road the host's simulation never travels changes no simulated byte | J-V13.110 |
| J-A.17 | chose **no nineteenth row of T-V13-21's drift table** (the owner's eighteen, item 138 (c)) and the approach roads as one more consumer of T-V13-21b, over extending the owner's list | J-V13.110 (a clause) |

### 1.8 Base change requests, cross-volume requests, the M0 gate

- **BCR-V14-26 (base §4.9's hinterland decorations and §7.3's S12 row):** "a `worldSite` reservation whose card's
  `roadAccess` is `required` links its entrance gate to the nearest way corridor by an L3 `driveway` face, one whose
  `roadAccess` is `preferred` by an L3 `path` face; `none` and `avoided` link nothing; §7.3's S12 row lays it round the
  reservation at the drop" (§1.4 (f) (3); fragments A-26, A-60).
- **BCR-V14-13 amended:** its new text's "V13's siting reads the card's `attraction` and `routed`" reads "… `attraction`
  and `roadAccess`" (fragments A-25, A-61).
- **V14 §10.2's V13 row gains (18):** the `SiteCoherenceTest` slot and `siteCoherence.register`; P1's site form (the
  `siteKind` and `dossier` terms, the bend within `bendM`, the offers within `originSearchM`); W7 (12)'s approaches
  (along, approach roads of origin `approach`) and `Placement.approach`; the anomalies `siteIncoherent` and
  `noRoadAccess`; `W_SITE_NO_ROAD_ACCESS`; the site frame's charter roads; `takeOffer` on a site's `W_PLACE_ANOMALY`;
  border posts' `at` on the polyline (fragment A-27).
- **V13 §10.2:** R-V14-1 reads `roadAccess` for `routed`; **R-V14-14:** V14 supplies the card's `roadAccess`, the kind
  row's `approach`, `coherence`, `correction` and `bendM`, and the eleven `SiteCoherenceTest` plug-ins (fragments A-55,
  A-56).
- **V09:** nothing new beyond V14 §4.9's key list (its V09 row already carries "the catalogue keys of V14 §4.9",
  V14:3060); T6's **Drop a site** shows the dry run's bend as it shows every bend.
- **V11:** nothing new: the columns are cells of the existing `tables/sites/kinds` row (BCR-V14-10).
- **The M0 gate (item 140's form; no K row — the kernel is untouched, the world is no plat arena, K3 already keeps every
  world position out of every digest):** one model row, **M12** — "The hinterland unit's L3 access faces (an outside
  plot's `driveway`, a decoration's `path`) can begin at a point on a reservation's boundary — the face's origin a point,
  not a plot or a decoration id — without a new role, layer or digest change" · verification "read the hinterland
  unit's face types and S12's operator; if the origin is typed to a plot or decoration, an M1 item" (fragment A-64).
  PLAUSIBLE: base §4.9 names "its decoration" and "each plot" as the face's origin, both sited points; the test, where
  one can be written at M0, lays a `path` face from an arbitrary hinterland point to the nearest corridor on the golden
  CITY and asserts every other face and id byte-identical. "Do not foreclose", no feature added; recorded as M1's.

