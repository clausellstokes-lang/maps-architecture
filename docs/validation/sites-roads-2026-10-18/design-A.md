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
- **The targets now (09:08 UTC; re-hashed at 09:36 before §2 was rendered — V13 alone had moved, to
  `d0de9ad8dadfeccc89ac86f2ea4d62f4`, by an edit to its file-s revision note at lines 107 and 116 that moves no line and
  touches no text this design quotes; §2's note):** `docs/volumes/V13-world.md`
  `09fbe522c52b4b1c7c89e7c243f0f19d` at 09:08 (4 465 lines: file s's 13-line note after line 104 and its one-line corrections,
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
- **Cite form.** `V14:n` = `docs/volumes/V14-sites.md` line n at `70d8aa1b…`; `V13:n` at `d0de9ad8…` (the same lines as at `09fbe522…`); `base:n` =
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
| `bridgeFort` | required | along · road · — · — | atCrossing 5 m · 5 [road] | **bend · 1 500 m** | a gatehouse astride a road's river crossing: dropped near one it is bent onto it; off every crossing within reach it is unlawful |
| `tollhouse` | required | along · road · — · — | onRoute 5 m · 5 [road]; atBorder 2 000 m · 1 [road] | **bend · 1 000 m** | "the gatehouse astride the road" (V14:1572): on a road of class road or highway, or it is unlawful; a border crossing is where it earns |

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
`setPlacement`, `unplaceFrame` with a site subject — after P1 and before P4, so the site's charter carries its approach
road; a later run that changes a site's approach marks its charter stale, V13 §3.11.5 (1)), of `setAttr site/roadAccess`
and of adoption. For every
`Placement` with a site subject whose card's `roadAccess` is `required` or `preferred` and whose kind row's
`approach.role` is not `none`, in the placements' lineage-key order:
1. **Along.** Where a route of class ≥ `minClass` crosses the site frame's ring (its rectangle through `toWorld`, as
   P4 (6) lists a charter road), the site lies along the nearest such route (by the distance from the origin to its polyline, ties by the
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
  reservation at the drop" (§1.4 (f) (3); fragments A-15, A-29 in V14 and A-81, A-83 in the base).
- **BCR-V14-13 amended:** its new text's "V13's siting reads the card's `attraction` and `routed`" reads "… `attraction`
  and `roadAccess`" (fragments A-28 in V14, A-82 in the base).
- **V14 §10.2's V13 row gains (18):** the `SiteCoherenceTest` slot and `siteCoherence.register`; P1's site form (the
  `siteKind` and `dossier` terms, the bend within `bendM`, the offers within `originSearchM`); W7 (12)'s approaches
  (along, approach roads of origin `approach`) and `Placement.approach`; the anomalies `siteIncoherent` and
  `noRoadAccess`; `W_SITE_NO_ROAD_ACCESS`; the site frame's charter roads; `takeOffer` on a site's `W_PLACE_ANOMALY`;
  border posts' `at` on the polyline (fragments A-30, A-31).
- **V13 §10.2:** R-V14-1 reads `roadAccess` for `routed`; **R-V14-14:** V14 supplies the card's `roadAccess`, the kind
  row's `approach`, `coherence`, `correction` and `bendM`, and the eleven `SiteCoherenceTest` plug-ins (fragments A-78,
  A-79).
- **V09:** nothing new beyond V14 §4.9's key list (its V09 row already carries "the catalogue keys of V14 §4.9",
  V14:3060); T6's **Drop a site** shows the dry run's bend as it shows every bend.
- **V11:** nothing new: the columns are cells of the existing `tables/sites/kinds` row (BCR-V14-10).
- **The M0 gate (item 140's form; no K row — the kernel is untouched, the world is no plat arena, K3 already keeps every
  world position out of every digest):** one model row, **M12** — "The hinterland unit's L3 access faces (an outside
  plot's `driveway`, a decoration's `path`) can begin at a point on a reservation's boundary — the face's origin a point,
  not a plot or a decoration id — without a new role, layer or digest change" · verification "read the hinterland
  unit's face types and S12's operator; if the origin is typed to a plot or decoration, an M1 item" (fragments A-95, A-96).
  PLAUSIBLE: base §4.9 names "its decoration" and "each plot" as the face's origin, both sited points; the test, where
  one can be written at M0, lays a `path` face from an arbitrary hinterland point to the nearest corridor on the golden
  CITY and asserts every other face and id byte-identical. "Do not foreclose", no feature added; recorded as M1's.

---

## 2. The fragments table

Every text change, in file order (V14, V13, the base, INDEX, SUMMARY, the brief, the gate spec; within a file in line order). Each fragment is an exact replacement: its current text occurs **exactly once** in the target as it stands now (checked by `grep -F -c` = 1 for every one-line text and by an exact count for the 16 that span lines, whose first line also greps once), and applying the fragments of a file in order to a copy finds each current text once at its turn and each new text once after (the build script's check, 0 errors); an insertion quotes the line it follows as its current text and repeats it as its new text's first line. A line break inside a text is written ⏎. Line = the text's first line in the target now; md5 = the target's now (`md5sum` at 09:36 UTC). **V13 moved while this seat worked:** from `09fbe522…` (09:08) to `d0de9ad8dadfeccc89ac86f2ea4d62f4` (by 09:33), an edit to its file-s revision note at lines 107 and 116 (J-V13.83 named there; `diff` against this seat's 09:08 copy shows those two lines only), which touches no fragment's text and moves no line; every V13 cite in this record holds at `d0de9ad8…` as at `09fbe522…`. The machine-readable copy is `docs/validation/sites-roads-2026-10-18/design-A.fragments.json` (the same 96 fragments, texts unescaped).

| id | target | line | md5 | kind | reason (one line) |
|---|---|---|---|---|---|
| A-1 | `docs/volumes/V14-sites.md` | 179 | `70d8aa1b…` | replacement | the volume's plain-words account carries J393 (§0's reading). |
| A-2 | `docs/volumes/V14-sites.md` | 362 | `70d8aa1b…` | replacement | `routed` retired for `roadAccess` (J-A.2); the reader is W7 (12)'s approach, a site no longer a W7 seat (J-A.1). |
| A-3 | `docs/volumes/V14-sites.md` | 478 | `70d8aa1b…` | replacement | P4 (6) already gives a site frame its roads (V13:2070–2072); V14's list omitted them (rv14 35) — the frame side of "integrated". |
| A-4 | `docs/volumes/V14-sites.md` | 481 | `70d8aa1b…` | replacement | the two V13 mechanisms the catalogue columns ride (§1.4 (b), (d)). |
| A-5 | `docs/volumes/V14-sites.md` | 545 | `70d8aa1b…` | replacement | the card copies `roadAccess` in place of `routed` (J-A.2). |
| A-6 | `docs/volumes/V14-sites.md` | 559 | `70d8aa1b…` | replacement | `roadAccess` is declared as `attraction` is (in the model digest). |
| A-7 | `docs/volumes/V14-sites.md` | 872 | `70d8aa1b…` | replacement | the five catalogue columns and the row and test types (§1.2) — the design's centre. |
| A-8 | `docs/volumes/V14-sites.md` | 907 | `70d8aa1b…` | replacement | the catalogue: `attraction` keeps its table; the five new columns with every kind's shipped values and reasons and the eleven plug-ins (§1.2, §1.4 (a); J-A.0, J-A.2, J-A.15). |
| A-9 | `docs/volumes/V14-sites.md` | 1179 | `70d8aa1b…` | insertion | every new record field has a lifecycle row (§1.5). |
| A-10 | `docs/volumes/V14-sites.md` | 1404 | `70d8aa1b…` | replacement | the autocorrect at the drop (§1.4 (c); J-A.6). |
| A-11 | `docs/volumes/V14-sites.md` | 1420 | `70d8aa1b…` | replacement | a moved site re-lays its own approach only; it is no seat, so W7a/W7b do not re-run for it (J-A.10). |
| A-12 | `docs/volumes/V14-sites.md` | 1437 | `70d8aa1b…` | replacement | the site frame's charter carries its roads (§1.4 (f) (1)). |
| A-13 | `docs/volumes/V14-sites.md` | 1444 | `70d8aa1b…` | replacement | the owner's "road access" and "integrated into road infrastructure" for a free site (§1.4 (d); J-A.1). |
| A-14 | `docs/volumes/V14-sites.md` | 1697 | `70d8aa1b…` | replacement | the world's road ends at the site's frame and the frame's way reaches the gate (item 135 (a); J-A.7). |
| A-15 | `docs/volumes/V14-sites.md` | 1943 | `70d8aa1b…` | replacement | road access for an `inFrame` site by the hinterland's own faces (§1.4 (f) (3); J-A.8). |
| A-16 | `docs/volumes/V14-sites.md` | 2138 | `70d8aa1b…` | replacement | the failure ladder's rows (§1.4 (l)). |
| A-17 | `docs/volumes/V14-sites.md` | 2266 | `70d8aa1b…` | replacement | the card's two siting columns are editable as V14:362 and V14:545 say; the list lacked both (rv14 174). |
| A-18 | `docs/volumes/V14-sites.md` | 2377 | `70d8aa1b…` | replacement | the locality of a free drop now names the approach and keeps every route byte-identical (J-A.1, J-A.10). |
| A-19 | `docs/volumes/V14-sites.md` | 2380 | `70d8aa1b…` | replacement | as above, for a moved site. |
| A-20 | `docs/volumes/V14-sites.md` | 2429 | `70d8aa1b…` | replacement | the bend's outcome key (§1.4 (c)). |
| A-21 | `docs/volumes/V14-sites.md` | 2763 | `70d8aa1b…` | replacement | performance rows (§1.4 (k)). |
| A-22 | `docs/volumes/V14-sites.md` | 2838 | `70d8aa1b…` | replacement | T-V14-8's clause follows J-A.1. |
| A-23 | `docs/volumes/V14-sites.md` | 2863 | `70d8aa1b…` | insertion | every new behaviour of V14's side has a test (§1.6). |
| A-24 | `docs/volumes/V14-sites.md` | 2895 | `70d8aa1b…` | replacement | the build plan carries the new columns. |
| A-25 | `docs/volumes/V14-sites.md` | 2895 | `70d8aa1b…` | replacement | SE6's exit names the two new tests. |
| A-26 | `docs/volumes/V14-sites.md` | 2997 | `70d8aa1b…` | replacement | the decision log says what changed (the dated-note form of J-V13.25, V13:3802). |
| A-27 | `docs/volumes/V14-sites.md` | 3010 | `70d8aa1b…` | insertion | the decisions V14 owns (§1.7). |
| A-28 | `docs/volumes/V14-sites.md` | 3035 | `70d8aa1b…` | replacement | BCR-V14-13's new text follows J-A.2. |
| A-29 | `docs/volumes/V14-sites.md` | 3047 | `70d8aa1b…` | insertion | the base change the `inFrame` rule asks (§1.8). |
| A-30 | `docs/volumes/V14-sites.md` | 3053 | `70d8aa1b…` | replacement | item (1) of the V13 row names the retired field. |
| A-31 | `docs/volumes/V14-sites.md` | 3053 | `70d8aa1b…` | replacement | V14's request list names what V13 must supply for J393 (§1.8). |
| A-32 | `docs/volumes/V14-sites.md` | 3075 | `70d8aa1b…` | insertion | the one owner question (§3, OQ-A1). |
| A-33 | `docs/volumes/V13-world.md` | 727 | `d0de9ad8…` | replacement | a site frame's charter road may be an approach road; its `toward` needs a rule (§1.4 (d) 5). |
| A-34 | `docs/volumes/V13-world.md` | 743 | `d0de9ad8…` | replacement | the placement records how the network reaches a site (§1.4 (d); §1.5). |
| A-35 | `docs/volumes/V13-world.md` | 748 | `d0de9ad8…` | replacement | the coherence expectation as one more term of the one placement law (J-A.3). |
| A-36 | `docs/volumes/V13-world.md` | 750 | `d0de9ad8…` | replacement | a site is no longer a seat (J-A.1); an approach road's ends need naming. |
| A-37 | `docs/volumes/V13-world.md` | 753 | `d0de9ad8…` | replacement | the approach road is a `WorldRoute` so every road reader reads it (J-A.9). |
| A-38 | `docs/volumes/V13-world.md` | 772 | `d0de9ad8…` | replacement | `routed` retired for `roadAccess` (J-A.2). |
| A-39 | `docs/volumes/V13-world.md` | 777 | `d0de9ad8…` | insertion | V13 owns the slot, V14 the tests (J-A.4). |
| A-40 | `docs/volumes/V13-world.md` | 801 | `d0de9ad8…` | replacement | the two anomalies of a site's road and coherence (§1.4 (e)). |
| A-41 | `docs/volumes/V13-world.md` | 1123 | `d0de9ad8…` | replacement | an approach road of class trail is patrolled; no row named a trail (§1.3). |
| A-42 | `docs/volumes/V13-world.md` | 1157 | `d0de9ad8…` | replacement | the one new weight, shipped (§1.3). |
| A-43 | `docs/volumes/V13-world.md` | 1219 | `d0de9ad8…` | insertion | the new record's identity (§1.5). |
| A-44 | `docs/volumes/V13-world.md` | 1235 | `d0de9ad8…` | replacement | the approach road's anchor (§1.5). |
| A-45 | `docs/volumes/V13-world.md` | 1254 | `d0de9ad8…` | insertion | every new record field has a lifecycle row (§1.5). |
| A-46 | `docs/volumes/V13-world.md` | 1263 | `d0de9ad8…` | insertion | the approach road's lifecycle (§1.5). |
| A-47 | `docs/volumes/V13-world.md` | 1402 | `d0de9ad8…` | replacement | W7 (12) runs as W7b's last step (§1.4 (d)). |
| A-48 | `docs/volumes/V13-world.md` | 1714 | `d0de9ad8…` | replacement | a site no longer seats W7's pair selection (J-A.1). |
| A-49 | `docs/volumes/V13-world.md` | 1776 | `d0de9ad8…` | replacement | the one map-laid road on a host-bound world is the approach road (J-A.16). |
| A-50 | `docs/volumes/V13-world.md` | 1783 | `d0de9ad8…` | replacement | no route is bent to a site (J-A.1); T-V13-43's clause follows. |
| A-51 | `docs/volumes/V13-world.md` | 1786 | `d0de9ad8…` | insertion | the twelfth point, the mechanism that makes a site's road part of the one network (§1.4 (d)). |
| A-52 | `docs/volumes/V13-world.md` | 1788 | `d0de9ad8…` | replacement | W7's output names what (12) writes. |
| A-53 | `docs/volumes/V13-world.md` | 1892 | `d0de9ad8…` | replacement | an approach road makes no vassal continuous (§1.4 (d) 5). |
| A-54 | `docs/volumes/V13-world.md` | 1979 | `d0de9ad8…` | replacement | "along the segment" read through the approach (J-A.11). |
| A-55 | `docs/volumes/V13-world.md` | 2001 | `d0de9ad8…` | replacement | a border post sits on its road by construction (§1.4 (n)). |
| A-56 | `docs/volumes/V13-world.md` | 2070 | `d0de9ad8…` | replacement | a site's placement edits run its coherence in world-first mode too (§1.4 (b)). |
| A-57 | `docs/volumes/V13-world.md` | 2115 | `d0de9ad8…` | insertion | the site's coherence and the bend, in V13's placement law (§1.4 (b), (c); J-A.3, J-A.5, J-A.6). |
| A-58 | `docs/volumes/V13-world.md` | 2297 | `d0de9ad8…` | insertion | the DM's choices on a site's anomalies (§1.4 (e); J-A.13). |
| A-59 | `docs/volumes/V13-world.md` | 2375 | `d0de9ad8…` | replacement | the map feed carries the approach roads as presentation (J-A.16). |
| A-60 | `docs/volumes/V13-world.md` | 2387 | `d0de9ad8…` | replacement | the host's route list stays the host's network (J-A.16). |
| A-61 | `docs/volumes/V13-world.md` | 2472 | `d0de9ad8…` | replacement | P1–P5's output names the approach. |
| A-62 | `docs/volumes/V13-world.md` | 2663 | `d0de9ad8…` | replacement | the cascade's step 5 consumer (§1.4 (d) 4). |
| A-63 | `docs/volumes/V13-world.md` | 2706 | `d0de9ad8…` | replacement | the consumer list gains the approach roads (J-A.17). |
| A-64 | `docs/volumes/V13-world.md` | 2886 | `d0de9ad8…` | replacement | the bend rides the existing warning's actions (§1.4 (c)). |
| A-65 | `docs/volumes/V13-world.md` | 2887 | `d0de9ad8…` | replacement | the site form of the anomaly's actions (§1.4 (e)). |
| A-66 | `docs/volumes/V13-world.md` | 2922 | `d0de9ad8…` | insertion | the locality of a site's placement edit (§1.4 (j)). |
| A-67 | `docs/volumes/V13-world.md` | 3013 | `d0de9ad8…` | replacement | the lens/view draws the approach roads at existing styles (§1.4 (g)). |
| A-68 | `docs/volumes/V13-world.md` | 3523 | `d0de9ad8…` | replacement | the two new budget rows (§1.4 (k)). |
| A-69 | `docs/volumes/V13-world.md` | 3565 | `d0de9ad8…` | replacement | T-V13-21b's count follows the list (J-A.17). |
| A-70 | `docs/volumes/V13-world.md` | 3584 | `d0de9ad8…` | insertion | every new V13 behaviour has a test (§1.6). |
| A-71 | `docs/volumes/V13-world.md` | 3601 | `d0de9ad8…` | replacement | patrols over the approach have a test (§1.6). |
| A-72 | `docs/volumes/V13-world.md` | 3602 | `d0de9ad8…` | replacement | T-V13-43's clause follows "no route bent" (J-A.1). |
| A-73 | `docs/volumes/V13-world.md` | 3629 | `d0de9ad8…` | insertion | the new report code (§1.4 (d) 3). |
| A-74 | `docs/volumes/V13-world.md` | 3677 | `d0de9ad8…` | replacement | M-W2 builds the approaches (they need routes). |
| A-75 | `docs/volumes/V13-world.md` | 3677 | `d0de9ad8…` | replacement | M-W2's gate names the two new tests (the estimate unchanged: PLAUSIBLE inside its row). |
| A-76 | `docs/volumes/V13-world.md` | 3768 | `d0de9ad8…` | insertion | the one host row, optional, map surface only (§1.4 (m)). |
| A-77 | `docs/volumes/V13-world.md` | 3883 | `d0de9ad8…` | insertion | the decisions V13 owns (§1.7). |
| A-78 | `docs/volumes/V13-world.md` | 4261 | `d0de9ad8…` | replacement | R-V14-1 follows J-A.2. |
| A-79 | `docs/volumes/V13-world.md` | 4273 | `d0de9ad8…` | insertion | what V13 needs from V14 for J393 (§1.8). |
| A-80 | `docs/volumes/V13-world.md` | 4286 | `d0de9ad8…` | replacement | the host's list now has H31. |
| A-81 | `docs/ARCHITECTURE.md` | 8678 | `1f871a01…` | replacement | BCR-V14-26's application to the base (§1.4 (f) (3)); the synthesis may hold it for the coherence pass as the volumes' BCRs are usually held. |
| A-82 | `docs/ARCHITECTURE.md` | 9718 | `1f871a01…` | replacement | BCR-V14-13's text in the base follows J-A.2. |
| A-83 | `docs/ARCHITECTURE.md` | 11709 | `1f871a01…` | replacement | the S12 operator lays the `inFrame` site's face (BCR-V14-26). |
| A-84 | `docs/volumes/INDEX.md` | 71 | `42881796…` | replacement | the wiring table names what V13 now reads of V14 (J393). |
| A-85 | `docs/volumes/INDEX.md` | 72 | `42881796…` | replacement | as above, V14's side. |
| A-86 | `docs/volumes/INDEX.md` | 186 | `42881796…` | replacement | one owner question added (OQ-A1). |
| A-87 | `docs/volumes/INDEX.md` | 222 | `42881796…` | replacement | as above. |
| A-88 | `docs/volumes/INDEX.md` | 222 | `42881796…` | replacement | the host schedule names H31. |
| A-89 | `docs/volumes/INDEX.md` | 228 | `42881796…` | insertion | the one owner question in the index (OQ-A1). |
| A-90 | `docs/volumes/SUMMARY.md` | 15 | `9d142283…` | replacement | the count follows the one new owner question (OQ-A1). |
| A-91 | `docs/volumes/SUMMARY.md` | 84 | `9d142283…` | replacement | the owner-facing account of J393's design (plain words). |
| A-92 | `docs/volumes/SUMMARY.md` | 197 | `9d142283…` | replacement | the owner question in plain words (OQ-A1). |
| A-93 | `docs/volumes/SUMMARY.md` | 209 | `9d142283…` | replacement | the count follows. |
| A-94 | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | 153 | `fc252070…` | replacement | the brief places the owner's thread of 2026-10-18 with the volume that carries it. |
| A-95 | `plat/docs/build/M0-world-sites-gate.md` | 31 | `b6c5be2a…` | replacement | the heading counts the new row. |
| A-96 | `plat/docs/build/M0-world-sites-gate.md` | 45 | `b6c5be2a…` | insertion | item 140's form: a "do not foreclose" model row for the `inFrame` road-access face, recorded as M1's (§1.8). |

Full md5s: V14 `70d8aa1b3c14e7cab6a135adbd3caa00`; V13 `d0de9ad8dadfeccc89ac86f2ea4d62f4`; the base `1f871a01961de8a4994125d7bb1993be`; INDEX `4288179616d26f75b3d717deb23ed0ce`; SUMMARY `9d1422839ab63a3ec3bf6d13e3ea8265`; the brief `fc2520709752ef77f397ba7d6a89c169`; the gate spec `b6c5be2a5d89fbd19035a3c606194fb9`.

### 2.1 The fragments, text by text

**A-1.** `docs/volumes/V14-sites.md`, line 179 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the volume's plain-words account carries J393 (§0's reading).

*Current text:*
```text
hidden temple concealment and one hard approach, a tower solitude), and it is a **destination** the settlement siting⏎score reads.
```
*New text:*
```text
hidden temple concealment and one hard approach, a tower solitude), and it is a **destination** the settlement siting⏎score reads. Its kind says whether a road must reach it (its **road access**): it lies **along** a road the world⏎already has, or the world lays an **approach road** to it, never bending a road to reach it; and four kinds put⏎themselves right where they are dropped wrong — a toll house onto the road, a bridge fort onto the road's river⏎crossing, a mine onto its ore, a hideout off the road — the move shown in the dry run and the spot the game master⏎chose one click away (the owner's word of 2026-10-18, J393).
```

**A-2.** `docs/volumes/V14-sites.md`, line 362 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* `routed` retired for `roadAccess` (J-A.2); the reader is W7 (12)'s approach, a site no longer a W7 seat (J-A.1).

*Current text:*
```text
| `WorldSite.attraction`, `.routed` (V14 §2.2; C14-04) | the kind row's columns, copied to the card at the drop and editable by `setAttr` | V13 W6's `destination` term (the pull within `reach.siteKm`) and W7's seats (a routed site) | the card |
```
*New text:*
```text
| `WorldSite.attraction`, `.roadAccess` (V14 §2.2; C14-04; J393) | the kind row's columns, copied to the card at the drop and editable by `setAttr` (`site/attraction`, `site/roadAccess`, V14 §4.2) | V13 W6's `destination` term (the pull within `reach.siteKm`) and V13 W7 (12)'s approach (a site with road access lies along a route or is joined by an approach road, V14 §3.4 (d)) | the card |
```

**A-3.** `docs/volumes/V14-sites.md`, line 478 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* P4 (6) already gives a site frame its roads (V13:2070–2072); V14's list omitted them (rv14 35) — the frame side of "integrated".

*Current text:*
```text
| the frame charter for a site's own frame (edge elevation profiles, datum, water edges, climate, water table, biome, resources, territory) | V13 §2 `FrameCharter`; P4 | G5 (f) (the ground composer's S1 inputs); G6 (the water table) |
```
*New text:*
```text
| the frame charter for a site's own frame (edge elevation profiles, datum, water edges, climate, water table, biome, resources, territory, and the roads that cross its ring — the route the site lies along or its approach road, V13 §3.11.4 (6), §3.8 (12)) | V13 §2 `FrameCharter`; P4 | G5 (f) (the ground composer's S1 inputs and its way from each charter road to a gate); G6 (the water table) |
```

**A-4.** `docs/volumes/V14-sites.md`, line 481 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the two V13 mechanisms the catalogue columns ride (§1.4 (b), (d)).

*Current text:*
```text
| W7's seats reading `WorldSite.routed` from the card | V13 §3.8 (1) | G3 (d) | — |
```
*New text:*
```text
| W7 (12)'s approaches reading `WorldSite.roadAccess` from the card and the kind row's `approach` (a site lies along a route or is joined by an approach road; never a seat of W7's pair selection) | V13 §3.8 (12) | G3 (d) | — |⏎| P1's site form: the `siteKind` coherence term over the kind row's `coherence` rows through the `siteCoherence` plug-ins, the bend within `bendM` and the offers within `originSearchM`; the anomalies `siteIncoherent` and `noRoadAccess` | V13 §2.2, §3.11.1, §3.11.5 (4) | G3 (a) | until V13's M-W2 lays routes a point drop takes its point as given, its cost unread |
```

**A-5.** `docs/volumes/V14-sites.md`, line 545 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the card copies `roadAccess` in place of `routed` (J-A.2).

*Current text:*
```text
  attraction: number; routed: boolean;                          // the kind row's columns copied at the drop, editable: V13's `destination` term reads `attraction` (0–1) within `reach.siteKm`; W7 seats a `routed` site (C14-04)
```
*New text:*
```text
  attraction: number; roadAccess: 'required'|'preferred'|'none'|'avoided';   // the kind row's columns copied at the drop, editable (`setAttr` `site/attraction`, `site/roadAccess`): V13's `destination` term reads `attraction` (0–1) within `reach.siteKm`; V13's W7 (12) lays the approach of a site whose `roadAccess` is `required` or `preferred` (C14-04; J393)
```

**A-6.** `docs/volumes/V14-sites.md`, line 559 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* `roadAccess` is declared as `attraction` is (in the model digest).

*Current text:*
```text
// `attraction`, `routed`, `lifecycle` (every Dated state),
```
*New text:*
```text
// `attraction`, `roadAccess`, `lifecycle` (every Dated state),
```

**A-7.** `docs/volumes/V14-sites.md`, line 872 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the five catalogue columns and the row and test types (§1.2) — the design's centre.

*Current text:*
```text
  importKinds: string[] /* the map import's marker words this kind answers to (V13 §3.15 (3); V14 §3.2's import candidates; SW-04); `calibratable: false` */ }
```
*New text:*
```text
  importKinds: string[] /* the map import's marker words this kind answers to (V13 §3.15 (3); V14 §3.2's import candidates; SW-04); `calibratable: false` */;⏎  roadAccess: 'required'|'preferred'|'none'|'avoided' /* the owner's "road access where appropriate" (J393): required — a road must reach it (V13 W7 (12) lays its approach; none laid is the anomaly noRoadAccess); preferred — laid where a road lies within maxRoadM, else nothing reported; none — no approach; avoided — no approach, its coherence rows keeping it off the roads; `calibratable: false` */;⏎  approach: { role: 'along'|'any'|'none' /* along — on a route of class ≥ minClass or no road; any — along where a route meets its frame, else an approach road; none; `calibratable: false` */; minClass?: 'highway'|'road'|'track'|'trail'; roadClass?: 'track'|'trail' /* the approach road's class */; maxRoadM?: number /* 'm': the longest approach road, straight-line */ };⏎  coherence: SiteCoherenceRow[] /* the coherence expectation on the world map (V13 §3.11.1's `siteKind` term); [] none */; correction: 'bend'|'report' /* `calibratable: false` */; bendM: number /* 'm': how far the bend searches; 0 with report */ }⏎interface SiteCoherenceRow { test: SiteCoherenceKind; tolM: number /* 'm' */; cost: number /* 'cost': 5 (> place.coherence.lawfulMax 4) the expectation proper, 1 or 3 a preference */; minClass?: 'highway'|'road'|'track'|'trail'; group?: string /* alternatives: the group costs its least failing row, nothing when one holds */ }⏎type SiteCoherenceKind = 'onRoute'|'atCrossing'|'atPass'|'atBorder'|'onOverlook'|'onOre'|'onCliff'|'byWater'|'onShore'|'awayFromRoutes'|'inReach';   // this volume's plug-ins in V13's `siteCoherence` slot (V13 §2.2); `calibratable: false`
```

**A-8.** `docs/volumes/V14-sites.md`, line 907 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the catalogue: `attraction` keeps its table; the five new columns with every kind's shipped values and reasons and the eleven plug-ins (§1.2, §1.4 (a); J-A.0, J-A.2, J-A.15).

*Current text:*
```text
Two more kind-row columns feed V13's siting (C14-04; `SiteKindRow.attraction: number` 0–1 and `.routed: boolean`,⏎own, calibratable), copied to the card at the drop (`WorldSite.attraction`, `.routed`) and read by V13's `destination` term⏎within its `reach.siteKm` and by W7's seats:⏎⏎| kind | `attraction` | `routed` | why |⏎|---|---|---|---|⏎| fort, bridgeFort | 0.6 | yes | protection and a toll draw settlement and roads |⏎| tollhouse | 0.3 | yes | a toll on the road between two powers draws a stop, an inn, a hamlet |⏎| watchpost | 0.2 | no | a garrison's post, no market |⏎| mine | 0.5 | yes | ore is traded |⏎| manor, guildhall | 0.3 | yes | a market in small |⏎| temple, shrine, graveyard, hermitage | 0.15 | temple yes, the rest no | pilgrims |⏎| ruin | 0.1 | no | stone to rob |⏎| camp | 0.05 | no | transient |⏎| cave, hideout, cellarComplex, sewerLair, dungeon, crypt, battlefield, tower | 0 | no | unknown to siting, or a solitude that repels (a tower's `solitude` term already keeps settlements off) |
```
*New text:*
```text
One more kind-row column feeds V13's siting (C14-04; `SiteKindRow.attraction: number` 0–1, own, calibratable), copied⏎to the card at the drop (`WorldSite.attraction`) and read by V13's `destination` term within its `reach.siteKm`:⏎⏎| kind | `attraction` | why |⏎|---|---|---|⏎| fort, bridgeFort | 0.6 | protection and a toll draw settlement and roads |⏎| tollhouse | 0.3 | a toll on the road between two powers draws a stop, an inn, a hamlet |⏎| watchpost | 0.2 | a garrison's post, no market |⏎| mine | 0.5 | ore is traded |⏎| manor, guildhall | 0.3 | a market in small |⏎| temple, shrine, graveyard, hermitage | 0.15 | pilgrims |⏎| ruin | 0.1 | stone to rob |⏎| camp | 0.05 | transient |⏎| cave, hideout, cellarComplex, sewerLair, dungeon, crypt, battlefield, tower | 0 | unknown to siting, or a solitude that repels (a tower's `solitude` term already keeps settlements off) |⏎⏎**Road access, the approach, the coherence expectation and the correction** (the owner's word of 2026-10-18, J393:⏎"make sure that sites have road access where appropriate, they are integrated into road infrastructure and that⏎depending on the catalogue, where appropriate, their geography in the world map autocorrects to meet the coherence⏎expectation"; the catalogue read as these kind rows, V14 §11 Q5). Five more columns, own, PLAUSIBLE until the V14-P⏎panel and M-CAL/world measure them; `roadAccess` copied to the card at the drop; read by V13's W7 (12) (the approach:⏎the site lies **along** a route that meets its frame, or an **approach road** of `roadClass` joins it to the nearest⏎route of `minClass` or better within `maxRoadM`; never a seat, no route bent) and by V13's P1 in its site form (the rows⏎are the `siteKind` term of the coherence cost; a point missing a row of cost > `lawfulMax` is **bent** within `bendM` to⏎the nearest placement meeting it, `bend.site.placement`, where the kind bends, else kept, flagged and the nearest lawful⏎placement within V13's `originSearchM` offered). A row reads "test tolM · cost [the least route class] [group]":⏎⏎| kind | `roadAccess` | `approach` (role · minClass · roadClass · maxRoadM) | `coherence` | `correction` · `bendM` | why |⏎|---|---|---|---|---|---|⏎| fort | required | any · track · track · 5 000 m | group `command`: onOverlook 0 m · 3, atPass 1 000 m · 3, atCrossing 1 000 m · 3 [track]; atBorder 2 000 m · 1 [track] | report · 0 m | supplied by road, so one must reach it; it wants to command a height, a pass or a crossing, and a border — preferences shown as cost; a fort stands where its builders put it |⏎| tower | preferred | any · trail · trail · 1 500 m | onOverlook 0 m · 1 | report · 0 m | a path where a road is near; a height preferred (solitude is its siting term) |⏎| temple | preferred | any · track · track · 1 500 m | — | report · 0 m | pilgrims come by a road where one is near; a temple is where its faith put it |⏎| shrine | preferred | any · trail · trail · 1 500 m | onRoute 300 m · 1 [trail] | report · 0 m | a wayside shrine sits by the road (the base's wayside shrines, §4.9) — a preference: a holy spring needs no road |⏎| manor | required | any · track · track · 5 000 m | inReach 20 000 m · 1 | report · 0 m | a manor has its drive; never `free` (the `country` row), so its road access acts through V14 §3.9 (g) |⏎| guildhall | required | none | — | report · 0 m | a building on a plot: the plot's access edge (§4.7's guarantee) |⏎| ruin | preferred | any · trail · trail · 1 500 m | — | report · 0 m | the stone-robbers' track where a road is near |⏎| cave | none | none | onCliff 0 m · 1 | report · 0 m | found at a face, not served; a cave on flat ground takes its face from the terrain pre-edit |⏎| mine | required | any · track · track · 5 000 m | onOre 200 m · 5 | bend · 1 500 m | the ore must be there (the `extraction` row's hard `ore`) and is carted out |⏎| hideout | avoided | none | awayFromRoutes 300 m · 5 | bend · 1 000 m | a hideout on a road is no hideout; a road laid past it later is reported, never moves it |⏎| crypt | none | none | — | report · 0 m | a tomb's levels, reached through its host or its ground |⏎| cellarComplex | none | none | — | report · 0 m | never free; its host building's |⏎| sewerLair | none | none | — | report · 0 m | never free; the sewer's |⏎| dungeon | avoided | none | awayFromRoutes 300 m · 1 | report · 0 m | hidden by nature, but where the DM put it: a road beside it shown as cost |⏎| camp | preferred | any · trail · trail · 1 500 m | group `rest`: onRoute 300 m · 1 [trail], byWater 300 m · 1 | report · 0 m | pitched by a road or by water; transient |⏎| battlefield | none | none | — | report · 0 m | where the fight was: it expects nothing |⏎| graveyard | preferred | any · trail · trail · 1 500 m | inReach 20 000 m · 1 | report · 0 m | the dead lie near the living, reached by a path |⏎| watchpost | preferred | any · trail · trail · 1 500 m | group `post`: onOverlook 0 m · 1, onRoute 300 m · 1 [track] | report · 0 m | it sees from a height or watches a road (V13's border post "on open ground" meets `post`) |⏎| hermitage | none | none | awayFromRoutes 1 000 m · 1 | report · 0 m | solitude: the hermit's own path is the site's ground |⏎| bridgeFort | required | along · road · — · — | atCrossing 5 m · 5 [road] | bend · 1 500 m | a gatehouse astride a road's river crossing |⏎| tollhouse | required | along · road · — · — | onRoute 5 m · 5 [road]; atBorder 2 000 m · 1 [road] | bend · 1 000 m | the gatehouse astride the road; a border crossing is where it earns |⏎⏎The four kinds that bend are exactly those with a row of cost 5; a preference costs and is shown on the placement card,⏎never moves a site and raises no anomaly. **The plug-ins** (`@plat/sites/siting`, each a pure `SiteCoherenceTest {⏎kind; holds(at, ctx, row); target(at, ctx, row, withinM) }` registered through V13's `siteCoherence.register`; a⏎route-borne test reads the network at the week — a hidden road no public road —, counts a route of `minClass` or better⏎(highway > road > track > trail; never a water leg) and ignores the site's own approach road; a target is the nearest⏎point where the test holds, on the feature for a line and a cell centre for a raster, ties by the lower cell index then⏎(y, x); constants own, calibratable): `onRoute` — a route's polyline within `tolM`, target its nearest point;⏎`atCrossing` — a crossing of such a route with a reach ≥ `riverMinM3s` within `tolM`; `atPass` — a pass point within⏎`tolM`, a route vertex highest among its vertices within ± `passRunM` 1 000 m along it whose ground `passCrossM` 300 m to⏎each side across it stands ≥ `passReliefM` 60 m higher; `atBorder` — a crossing of such a route with an allegiance⏎border or a debatable band of the sway in force within `tolM` (V13 §3.9 (16)'s points); `onOverlook` — the `overlook`⏎plug-in ≥ `overlookMin` 0.5 at the point's cell; `onOre` — a W5 ore resource site within `tolM`, target its `at`;⏎`onCliff` — the dem's gradient ≥ `cliffSlope` 0.30 (A2's `cliffFace` threshold); `byWater` — `distToRiverM` ≤ `tolM` (a⏎lake or spring counts); `onShore` — `distToShoreM` ≤ `tolM`; `awayFromRoutes` — no route of any land class within⏎`tolM`; `inReach` — a settlement placement's origin within `tolM` (a reading, no target). Which columns act where: a⏎`free` site every column (V13's placement operators and W7 (12)); an `inFrame` site `roadAccess` alone (V14 §3.9 (g));⏎a `surface` site its plot's access edge; an `attached` site its host's; a `ground` card none; a host-placed site its⏎rows as a reading, never a bend (V14 §3.4 (a)).
```

**A-9.** `docs/volumes/V14-sites.md`, line 1179 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), insertion. *Reason:* every new record field has a lifecycle row (§1.5).

*Current text:*
```text
| `WorldSite.history`'s ages where `request.age` is stated | the request | G7 | the card (declared) | kept | with the request | — |
```
*New text:*
```text
| `WorldSite.history`'s ages where `request.age` is stated | the request | G7 | the card (declared) | kept | with the request | — |⏎| `WorldSite.roadAccess` (J393) | the drop (the kind row's value); `setAttr site/roadAccess` | V13's W7 (12) through the resolver (R-V14-1) | the card (declared) | kept by every re-derivation | the inverse | an older card's `routed`: `true` reads the kind row's value where that is `required` or `preferred`, else `preferred`; `false` reads the kind row's value where that is `none` or `avoided`, else `none`; reported in the load's migration report |
```

**A-10.** `docs/volumes/V14-sites.md`, line 1404 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the autocorrect at the drop (§1.4 (c); J-A.6).

*Current text:*
```text
A free-standing `dropSite` with a point takes that point as its placement origin and⏎the request's bearing (default: the approach side faces the nearest route, by V13's route field, else north); V13's⏎P1–P5 produce the `Placement` and the frame charter for the site's frame (V13 §3's placement, run for a⏎non-settlement frame as V13 §2's charter admits, V14 §1b.6).
```
*New text:*
```text
A free-standing `dropSite` with a point takes that point as its asked origin and⏎the request's bearing (default: the approach side faces the nearest route, by V13's route field, else north); V13's⏎P1–P5 produce the `Placement` and the frame charter for the site's frame (V13 §3's placement, run for a⏎non-settlement frame as V13 §2's charter admits, V14 §1b.6) — P1 in its site form (V13 §3.11.1): the kind row's⏎coherence rows (V14 §2.5) are the `siteKind` term of the coherence cost, so a point that misses its kind's coherence⏎expectation (a row costing more than `lawfulMax`) is **bent** within the kind's `bendM` to the nearest placement that⏎meets it, the bend named in the dry run (`bend.site.placement`) and the asked point one `keep` away, or, where the kind⏎reports or nothing lawful lies within `bendM`, kept, flagged unlawful and the nearest lawful placement within V13's⏎`originSearchM` offered; no later world change moves it (J393; the owner's "their geography in the world map⏎autocorrects to meet the coherence expectation").
```

**A-11.** `docs/volumes/V14-sites.md`, line 1420 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* a moved site re-lays its own approach only; it is no seat, so W7a/W7b do not re-run for it (J-A.10).

*Current text:*
```text
the hinterland decoration, the⏎world glyph and V13's W6/W7 re-run,
```
*New text:*
```text
the hinterland decoration, the⏎world glyph, V13's W6 at its next run and V13's W7 (12) for the site's approach re-run,
```

**A-12.** `docs/volumes/V14-sites.md`, line 1437 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the site frame's charter carries its roads (§1.4 (f) (1)).

*Current text:*
```text
edges, climate, water table, biome, resources: M5's one input record), giving the site's terrain and water; the
```
*New text:*
```text
edges, climate, water table, biome, resources: M5's one input record — and the roads that cross the frame's ring, the⏎route the site lies along or its approach road, V13 §3.11.4 (6), §3.8 (12), each joined to an entrance gate by G5 (f)),⏎giving the site's terrain and water; the
```

**A-13.** `docs/volumes/V14-sites.md`, line 1444 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the owner's "road access" and "integrated into road infrastructure" for a free site (§1.4 (d); J-A.1).

*Current text:*
```text
**(d) A site as a destination (item 134 (c); C14-04).** Every free-standing site carries `attraction` (0–1) and⏎`routed` from its kind row (V14 §2.5's table; editable on the card): V13 W6's `destination` term sums the `attraction`⏎of the sites within its `reach.siteKm` into a settlement candidate's score, and W7 seats a `routed` site among the⏎route graph's seats, so a road is drawn to a fort or a mine as to a settlement. A hideout, a cave or a crypt has⏎`attraction` 0 and is unknown to siting.
```
*New text:*
```text
**(d) A site as a destination, and its road (item 134 (c); C14-04; J393).** Every free-standing site carries⏎`attraction` (0–1) and `roadAccess` from its kind row (V14 §2.5's tables; editable on the card): V13 W6's⏎`destination` term sums the `attraction` of the sites within its `reach.siteKm` into a settlement candidate's score,⏎and V13's W7 (12) gives a site whose `roadAccess` is `required` or `preferred` its approach — it lies **along** a route⏎that meets its frame, or an **approach road** of its kind's class joins it to the nearest route within its kind's⏎`maxRoadM` — so a road reaches a fort or a mine as the network reaches a settlement, though a site is never a seat of⏎W7's pair selection and no route bends to it; a `required` site no road reaches stands under V13's anomaly⏎`noRoadAccess`. A hideout, a cave or a crypt has `attraction` 0 and is unknown to siting; a hideout's `roadAccess` is⏎`avoided`.
```

**A-14.** `docs/volumes/V14-sites.md`, line 1697 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the world's road ends at the site's frame and the frame's way reaches the gate (item 135 (a); J-A.7).

*Current text:*
```text
S1 (terrain and water from the charter), the terrain pre-edit (G3 (b)), S12a and S12b with the envelope as the⏎perimeter, then (e); an attached site has no ground.
```
*New text:*
```text
S1 (terrain and water from the charter), the terrain pre-edit (G3 (b)), S12a and S12b with the envelope as the⏎perimeter, then (e), then **the way to the gate** (J393): for each charter road (the route the site lies along, or its⏎approach road, V13 §3.8 (12)), one way of its `WayClass` from its ring station to the nearest entrance `GateSite` of⏎(e), routed by S4's router as `drawWay` routes a pair (§7.1) — a route the site lies along crosses the ring twice and⏎reaches two gates, so the road runs through a tollhouse's or a bridge fort's two entrances; a gate no road reaches⏎reports the way `unserved` (F-ROUTE's rung, never silent); an attached site has no ground.
```

**A-15.** `docs/volumes/V14-sites.md`, line 1943 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* road access for an `inFrame` site by the hinterland's own faces (§1.4 (f) (3); J-A.8).

*Current text:*
```text
run (the host's S12a fields stand, re-derived locally round the reservation by §7.3's S12 row)
```
*New text:*
```text
run (the host's S12a fields stand, re-derived locally round the reservation by §7.3's S12 row, which links the⏎reservation's entrance gate to the nearest way corridor by an L3 `driveway` face where the card's `roadAccess` is⏎`required` and by a `path` face where it is `preferred`, §4.9; BCR-V14-26)
```

**A-16.** `docs/volumes/V14-sites.md`, line 2138 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the failure ladder's rows (§1.4 (l)).

*Current text:*
```text
| G3 siting | no candidate passes the hard terms; a free-standing drop with no point before V13 lands | the hard terms relaxed one at a time in the row's order → refused with the terms; refused `refuse.site.noWorld` (C14-49) | the terms failed |
```
*New text:*
```text
| G3 siting | no candidate passes the hard terms; a free-standing drop with no point before V13 lands; a point drop that misses its kind's coherence expectation (V14 §2.5; J393) | the hard terms relaxed one at a time in the row's order → refused with the terms; refused `refuse.site.noWorld` (C14-49); the point bent within the kind's `bendM` (`bend.site.placement`) → kept, flagged unlawful, the nearest lawful placement offered (V13's F-PLACE) | the terms failed; the rows failed and the bend |⏎| G3 road access (J393) | a `required` site no road reaches within its kind's `maxRoadM` (V13 §3.8 (12)) | the approach `none`, reported, the anomaly `noRoadAccess` on the placement — never a refusal | `W_SITE_NO_ROAD_ACCESS` |
```

**A-17.** `docs/volumes/V14-sites.md`, line 2266 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the card's two siting columns are editable as V14:362 and V14:545 say; the list lacked both (rv14 174).

*Current text:*
```text
`site/name`, `site/host/*` (dossier-owned, refused),
```
*New text:*
```text
`site/name`, `site/attraction`, `site/roadAccess` (V13's W7 (12) re-run for the site; J393), `site/host/*` (dossier-owned, refused),
```

**A-18.** `docs/volumes/V14-sites.md`, line 2377 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the locality of a free drop now names the approach and keeps every route byte-identical (J-A.1, J-A.10).

*Current text:*
```text
| `dropSite` (free) | the site document (created on first open); V13's W6 `destination` term and W7's seats read the card's `attraction` and `routed` at their next run (a settlement already placed never moves: a term is read at placement only) | the host documents; every other site |
```
*New text:*
```text
| `dropSite` (free) | the site document (created on first open); V13's P1 site form at the drop (its bend in the dry run) and W7 (12)'s approach for the site and the approach roads that joined it; V13's W6 `destination` term reads the card's `attraction` at its next run (a settlement already placed never moves: a term is read at placement only) | the host documents; every other site; every route (no route is bent to a site) |
```

**A-19.** `docs/volumes/V14-sites.md`, line 2380 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* as above, for a moved site.

*Current text:*
```text
| `setPlacement` / `placeFrame` / `unplaceFrame` on a site (V13's events; C14-15) | V13's: the placement, the charter marked stale, the glyph, W6/W7's re-run;
```
*New text:*
```text
| `setPlacement` / `placeFrame` / `unplaceFrame` on a site (V13's events; C14-15) | V13's: the placement (P1's site form, its bend), the charter marked stale, the glyph, W7 (12)'s approach for the site;
```

**A-20.** `docs/volumes/V14-sites.md`, line 2429 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the bend's outcome key (§1.4 (c)).

*Current text:*
```text
`bend.site.*` (`bend.site.kind`, `bend.site.storey`, `bend.site.levels`, `bend.site.removeAdopted`),
```
*New text:*
```text
`bend.site.*` (`bend.site.kind`, `bend.site.storey`, `bend.site.levels`, `bend.site.removeAdopted`, `bend.site.placement`),
```

**A-21.** `docs/volumes/V14-sites.md`, line 2763 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* performance rows (§1.4 (k)).

*Current text:*
```text
| G3 (free-standing) | V13's score over its candidates (V13's `WORLD-10` row; SW-32); the terrain pre-edit (one `setField`, §12.6's terrain stroke) | V13 §6 | V13's row + 5 ms |
```
*New text:*
```text
| G3 (free-standing) | V13's score over its candidates (V13's `WORLD-10` row; SW-32); the terrain pre-edit (one `setField`, §12.6's terrain stroke); a point drop's coherence dry run and bend (V13's `WORLD-16`) and the site's approach (V13's `WORLD-17`) | V13 §6 | V13's rows + 5 ms |
```

**A-22.** `docs/volumes/V14-sites.md`, line 2838 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* T-V14-8's clause follows J-A.1.

*Current text:*
```text
the card's `attraction` and `routed` reach V13's `destination` term and W7 (a routed fort gains a road);
```
*New text:*
```text
the card's `attraction` reaches V13's `destination` term and its `roadAccess` V13's W7 (12) (a fort, whose road access is `required`, gains an approach — along a route or by an approach road — and is no seat of W7's pair selection);
```

**A-23.** `docs/volumes/V14-sites.md`, line 2863 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), insertion. *Reason:* every new behaviour of V14's side has a test (§1.6).

*Current text:*
```text
| T-V14-33 | the DM-placed devotion site (J384 (10)) | a `devotion` is admitted only as `stated` (a G2 run, a preset and every generator leave it absent); a `cult` devotion derives `secrecy` `secret` while a `holy` one keeps its kind's default, and every devotion card starts unrevealed to the party, a `cult` site staying so until the DM reveals it; a `setSiteRequest` touching only `devotion` re-lays an entrance edge only when the derived `hiddenEntrance` flips and re-lays no other unit; the card appears in the DM's map feed as an offer and in no player feed while DM-only; V13's religion lens draws it labelled "DM-placed" (T-V13-54) | PR |
```
*New text:*
```text
| T-V14-33 | the DM-placed devotion site (J384 (10)) | a `devotion` is admitted only as `stated` (a G2 run, a preset and every generator leave it absent); a `cult` devotion derives `secrecy` `secret` while a `holy` one keeps its kind's default, and every devotion card starts unrevealed to the party, a `cult` site staying so until the DM reveals it; a `setSiteRequest` touching only `devotion` re-lays an entrance edge only when the derived `hiddenEntrance` flips and re-lays no other unit; the card appears in the DM's map feed as an offer and in no player feed while DM-only; V13's religion lens draws it labelled "DM-placed" (T-V13-54) | PR |⏎| T-V14-34 | rule bar (the catalogue; J393) | every kind row carries `roadAccess`, `approach`, `coherence`, `correction` and `bendM` with V14 §2.5's shipped values; `correction` `bend` exactly on the four kinds with a row of cost > `lawfulMax`; no kind row or card carries `routed`, and an older card's migrates by V14 §2.9's row and is reported; the card copies `roadAccess` at the drop and an `editTable` of a kind row's `bendM` changes the next drop and no placed site; a `setAttr site/roadAccess` to `none` on a fort tombstones its approach road and leaves every other route byte-identical; the eleven `SiteCoherenceTest` plug-ins are pure (a fixture point per test, two runs bit-identical) and registered once; the one-click drop of every kind at a point reads its rows — a bend named in one line or a cost by row — with no dialog; every word a catalogue key (`bend.site.placement`) | PR |⏎| T-V14-35 | rule bar (the frame side; J393) | on `B-SITE` over V13's world fixture: a free fort's site frame's charter carries its approach road as a road of its class and its ground lays one way from that road's ring station to the nearest entrance gate; a tollhouse along a road carries the road through its two gates; a gate no road reaches reports the way `unserved`; an `inFrame` fort's reservation gains one L3 `driveway` face from its entrance gate to the nearest way corridor, an `inFrame` shrine one `path` face, an `inFrame` hideout none, nothing else of the host re-derived (bar 6's oracle); a `ground` graveyard gains no face; a crop at a tollhouse reads the profile `road` with the road's band inside its frame | PR |
```

**A-24.** `docs/volumes/V14-sites.md`, line 2895 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the build plan carries the new columns.

*Current text:*
```text
G3 (d)'s `attraction` and `routed` on the card;
```
*New text:*
```text
G3 (d)'s `attraction` and `roadAccess` on the card, P1's site form with its bend and V13's W7 (12) approaches once V13's M-W2 lands (J393);
```

**A-25.** `docs/volumes/V14-sites.md`, line 2895 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* SE6's exit names the two new tests.

*Current text:*
```text
| T-V14-7, T-V14-8, T-V14-9 (bar 6), T-V14-10 (c),
```
*New text:*
```text
| T-V14-7, T-V14-8, T-V14-9 (bar 6), T-V14-10 (c), T-V14-34, T-V14-35,
```

**A-26.** `docs/volumes/V14-sites.md`, line 2997 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* the decision log says what changed (the dated-note form of J-V13.25, V13:3802).

*Current text:*
```text
over terms V13 does not have, a term of this volume's own and a pull-class table, because V13 owns the interface, the context and the registry and this volume owns the terms (C14-04; SW-01, SW-03) |
```
*New text:*
```text
over terms V13 does not have, a term of this volume's own and a pull-class table, because V13 owns the interface, the context and the registry and this volume owns the terms (C14-04; SW-01, SW-03) — *amended 2026-10-18 by J393 (J-V14.58): `routed` is replaced by `roadAccess`, read by V13's W7 (12), a site no longer a W7 seat* |
```

**A-27.** `docs/volumes/V14-sites.md`, line 3010 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), insertion. *Reason:* the decisions V14 owns (§1.7).

*Current text:*
```text
| J-V14.56 | **(J384 (10).)** chose holy places and hidden cult sites to be ordinary world-site cards of the existing kinds carrying a DM-stated `devotion` (a deity key and a role), DM-only by default, a cult site secret, drawn by V13's religion lens labelled "DM-placed" and offered to the host for adoption by its own command, over a new site kind (the temple, shrine, crypt, cave and hideout rows already lay them), generated holy sites (the host holds no positioned faith place) or a deity read from a site's name (a guess) (vetoable) |
```
*New text:*
```text
| J-V14.56 | **(J384 (10).)** chose holy places and hidden cult sites to be ordinary world-site cards of the existing kinds carrying a DM-stated `devotion` (a deity key and a role), DM-only by default, a cult site secret, drawn by V13's religion lens labelled "DM-placed" and offered to the host for adoption by its own command, over a new site kind (the temple, shrine, crypt, cave and hideout rows already lay them), generated holy sites (the host holds no positioned faith place) or a deity read from a site's name (a guess) (vetoable) |⏎| J-V14.57 | **(J393.)** chose to read "the catalogue" of the owner's word of 2026-10-18 as this volume's site kind rows and to carry every per-kind road rule as kind-row columns (`roadAccess`, `approach`, `coherence`, `correction`, `bendM`), over another list (V09 §4.9's message keys, V11's symbol catalogue), because the sentence needs a per-kind source of "where appropriate" and only the kind rows are one — put to the owner as V14 §11 Q5 (vetoable) |⏎| J-V14.58 | **(J393.)** chose to replace `routed` with `roadAccess` (`required`, `preferred`, `none`, `avoided`) on the kind row and the card, over keeping `routed` beside it as a derived boolean, because two fields with one meaning drift and the owner's own words name the field (vetoable) |⏎| J-V14.59 | **(J393.)** chose the world's road to end at the site's frame — the site frame's charter carrying it — and the site's ground to join it to the nearest entrance gate by S4's router, over a world-scale polyline to the envelope, because fine cells are 250–1 000 m and item 135 (a) refines the coarse fact at the finer scale (vetoable) |⏎| J-V14.60 | **(J393.)** chose an `inFrame` site's road access by the hinterland's own faces — a `driveway` face for `required`, a `path` face for `preferred` — over an S4 `worldSite` destination at the drop, because the base's gate-count rule re-derives S3 for a new destination and the hinterland's faces cost no gate (BCR-V14-26; vetoable) |⏎| J-V14.61 | **(J393.)** chose to keep "a host-placed site is never re-sited" (V14 §3.4 (a)), its coherence rows read and its approach laid, over bending it, because the host's record is a dossier-tier fact (item 20 (h)) and the world yields to it as to a canonized seat (vetoable) |⏎| J-V14.62 | **(J393.)** chose that a `ground` card takes no approach, over a path to a camp or a battlefield, because a marker-like card has no gate and the base's decorations already link what wants a trail (vetoable) |⏎| J-V14.63 | **(J393.)** chose four bending kinds — tollhouse, bridge fort, mine, hideout — and `report` for the other seventeen, over bending every kind toward a preferred feature, because only those four are nonsense off their feature (a toll off the road, a bridge fort off the crossing, a mine off the ore, a hideout on the road), while a fort, a temple or a tower stands where its builders put it (vetoable) |
```

**A-28.** `docs/volumes/V14-sites.md`, line 3035 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* BCR-V14-13's new text follows J-A.2.

*Current text:*
```text
V13's siting reads the card's `attraction` and `routed`, never a destination |
```
*New text:*
```text
V13's siting reads the card's `attraction` and `roadAccess`, never a destination |
```

**A-29.** `docs/volumes/V14-sites.md`, line 3047 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), insertion. *Reason:* the base change the `inFrame` rule asks (§1.8).

*Current text:*
```text
| **BCR-V14-25** the encounter's door through `PlatApi` (C14-07) | §11.2 `PlatApi` and the `query` kinds | the API's members (`generate`, `edit`, `query`, `export`, `scratch`, …) | `encounter.open(h, address): Promise<Encounter>`, `encounter.items(h, key, ops: ItemOp[])`, `encounter.crop(h, key): Promise<EncounterCrop>`, `encounter.close(h, key)` and the `query` kind `encounter` — the resolve, the completion, the crop, the transient arena and its items in the generation worker behind the boundary; `EncounterService` in `@plat/app` their client; the bridge's vocabulary gains them (§11.3) |
```
*New text:*
```text
| **BCR-V14-25** the encounter's door through `PlatApi` (C14-07) | §11.2 `PlatApi` and the `query` kinds | the API's members (`generate`, `edit`, `query`, `export`, `scratch`, …) | `encounter.open(h, address): Promise<Encounter>`, `encounter.items(h, key, ops: ItemOp[])`, `encounter.crop(h, key): Promise<EncounterCrop>`, `encounter.close(h, key)` and the `query` kind `encounter` — the resolve, the completion, the crop, the transient arena and its items in the generation worker behind the boundary; `EncounterService` in `@plat/app` their client; the bridge's vocabulary gains them (§11.3) |⏎| **BCR-V14-26** a world site's road access in a settlement's hinterland (J393; V14 §3.9 (g)) | §4.9's hinterland decorations ("a row with `trail` links its decoration to the nearest way corridor by an L3 `path` face"); §7.3's S12 row | a decoration's or an outside plot's link to the nearest way corridor | a `worldSite` reservation whose card's `roadAccess` is `required` links its entrance gate to the nearest way corridor by an L3 `driveway` face, one whose `roadAccess` is `preferred` by an L3 `path` face; `none` and `avoided` link nothing; §7.3's S12 row lays it round the reservation at the drop |
```

**A-30.** `docs/volumes/V14-sites.md`, line 3053 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* item (1) of the V13 row names the retired field.

*Current text:*
```text
W7 reads `WorldSite.routed`;
```
*New text:*
```text
V13's W7 (12) reads `WorldSite.roadAccess` (J393; formerly W7 read `WorldSite.routed`);
```

**A-31.** `docs/volumes/V14-sites.md`, line 3053 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), replacement. *Reason:* V14's request list names what V13 must supply for J393 (§1.8).

*Current text:*
```text
(17) SW-30: BCR-V13-22's sentence on V06 §3.23 (2)'s `r` merges V14's unit material rate (`SiteDamageRow.ratePerYear`) into one text |
```
*New text:*
```text
(17) SW-30: BCR-V13-22's sentence on V06 §3.23 (2)'s `r` merges V14's unit material rate (`SiteDamageRow.ratePerYear`) into one text; (18) J393: the `SiteCoherenceTest` slot and `siteCoherence.register` beside `terms.register`; P1's site form (the `siteKind` and `dossier` terms, no bearing search, no P2 or P3, the bend within the kind's `bendM` preselected in the dry run, the offers within `originSearchM`); W7 (12)'s approaches (along, approach roads of origin `approach`) and `Placement.approach`; the anomalies `siteIncoherent` and `noRoadAccess` with `keep` and `takeOffer`; `W_SITE_NO_ROAD_ACCESS`; the site frame's charter roads; border posts' `at` on the route's polyline; `gradeShift.trail` |
```

**A-32.** `docs/volumes/V14-sites.md`, line 3075 (md5 `70d8aa1b3c14e7cab6a135adbd3caa00`), insertion. *Reason:* the one owner question (§3, OQ-A1).

*Current text:*
```text
| Q4 | **A capability across the VTT boundary (the survey's open question 1, `research/sites/survey.md` §6.4):** should the `.dd2vtt` emitter carry each unit's reason-record id and the anchor's knowledge state in a namespaced vendor block of the `plat` object, so a Foundry module could show them — or is the contract strictly the common fields? | yes, as an **optional, namespaced block off by default** (`ExportOpts.vtt.vendorBlock`; `plat.sites`; J-V14.47): every importer reads the common fields unchanged, the block is admitted by the export's key as any fact, and a module that reads it gets the owner's "why" at the table |
```
*New text:*
```text
| Q4 | **A capability across the VTT boundary (the survey's open question 1, `research/sites/survey.md` §6.4):** should the `.dd2vtt` emitter carry each unit's reason-record id and the anchor's knowledge state in a namespaced vendor block of the `plat` object, so a Foundry module could show them — or is the contract strictly the common fields? | yes, as an **optional, namespaced block off by default** (`ExportOpts.vtt.vendorBlock`; `plat.sites`; J-V14.47): every importer reads the common fields unchanged, the block is admitted by the export's key as any fact, and a module that reads it gets the owner's "why" at the table |⏎| Q5 | **A reading of the owner's own word (J393, 2026-10-18):** in "depending on the catalogue, where appropriate, their geography in the world map autocorrects to meet the coherence expectation", is "the catalogue" the list of site kinds the DM picks from — V14 §2.5's kind rows, where this volume now carries each kind's road access, approach, coherence rows and correction? | yes: the sentence needs a per-kind source of "where appropriate", and no other list in the design (V09's message keys, V11's symbol catalogue) could carry what a site's geography depends on; if another list was meant, the columns move to it unchanged in substance (J-V14.57) |
```

**A-33.** `docs/volumes/V13-world.md`, line 727 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* a site frame's charter road may be an approach road; its `toward` needs a rule (§1.4 (d) 5).

*Current text:*
```text
toward: Id | null /* the next host settlement along the route, never a site, a proposal or a junction */;
```
*New text:*
```text
toward: Id | null /* the next host settlement along the route, never a site, a proposal or a junction; on an approach road (V13 §3.8 (12)) the next host settlement along the route it joins from its junction, the nearer by land effort, ties by the lower key */;
```

**A-34.** `docs/volumes/V13-world.md`, line 743 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the placement records how the network reaches a site (§1.4 (d); §1.5).

*Current text:*
```text
  coherenceCost: CoherenceCost /* as computed at the last placement edit (V13 §3.11.1) */;
```
*New text:*
```text
  coherenceCost: CoherenceCost /* as computed at the last placement edit (V13 §3.11.1) */;⏎  approach?: { role: 'along'|'road'|'none'; route?: Id /* along: the route; road: the approach road */; atCm?: WorldPointCm /* along: the route's nearest polyline point */; junction?: { route: Id; atCm: WorldPointCm } /* road: where it joins */ } /* a site subject only: how the network reaches it, written by W7 (12) alone (V13 §3.8 (12); J393) — a reading of the placement, never an undo target */;
```

**A-35.** `docs/volumes/V13-world.md`, line 748 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the coherence expectation as one more term of the one placement law (J-A.3).

*Current text:*
```text
term: 'coastSide'|'riverCrossing'|'edgeElevation'|'relief'|'biome'|'territory'|'dossier'; cost: number;
```
*New text:*
```text
term: 'coastSide'|'riverCrossing'|'edgeElevation'|'relief'|'biome'|'territory'|'dossier'|'siteKind' /* a site subject's kind rows (V14 §2.5; V13 §3.11.1) */; cost: number;
```

**A-36.** `docs/volumes/V13-world.md`, line 750 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* a site is no longer a seat (J-A.1); an approach road's ends need naming.

*Current text:*
```text
a: Id; b: Id /* seat ids (the glyphs' settlements, or V14 sites standalone) */;
```
*New text:*
```text
a: Id; b: Id /* seat ids (the glyphs' settlements); an approach road's `a` its site's placement and `b` the route it joins (V13 §3.8 (12)) */;
```

**A-37.** `docs/volumes/V13-world.md`, line 753 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the approach road is a `WorldRoute` so every road reader reads it (J-A.9).

*Current text:*
```text
  origin: 'genesis'|'chartered'|'standalone'|'import'|'user';
```
*New text:*
```text
  origin: 'genesis'|'chartered'|'standalone'|'import'|'user'|'approach' /* the map's own road to a world site, W7 (12): never a host edge, never a host key */;
```

**A-38.** `docs/volumes/V13-world.md`, line 772 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* `routed` retired for `roadAccess` (J-A.2).

*Current text:*
```text
  sites: { placement: Id; at: WorldPointCm; attraction: number; routed: boolean }[] /* every Placement with a site subject, its card's attraction and routed read through the resolver (R-V14-1) */;
```
*New text:*
```text
  sites: { placement: Id; at: WorldPointCm; attraction: number; roadAccess: 'required'|'preferred'|'none'|'avoided' }[] /* every Placement with a site subject, its card's attraction and roadAccess read through the resolver (R-V14-1) */;
```

**A-39.** `docs/volumes/V13-world.md`, line 777 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* V13 owns the slot, V14 the tests (J-A.4).

*Current text:*
```text
declare function score(cell: number, ctx: SuitabilityContext, weights: Record<string, number>, hard?: string[] /* a term whose value is 0 refuses the cell */): number;   // no random or jitter term anywhere in siting (item 132 (b) extended; SW-03; J-V13.53)
```
*New text:*
```text
declare function score(cell: number, ctx: SuitabilityContext, weights: Record<string, number>, hard?: string[] /* a term whose value is 0 refuses the cell */): number;   // no random or jitter term anywhere in siting (item 132 (b) extended; SW-03; J-V13.53)⏎interface SiteCoherenceTest { kind: string /* V14's SiteCoherenceKind */; holds(at: WorldPointCm, ctx: SuitabilityContext, row: { tolM: number; minClass?: string }): boolean /* pure, deterministic — no draw (SW-03) */;⏎  target(at: WorldPointCm, ctx: SuitabilityContext, row: { tolM: number; minClass?: string }, withinM: number): WorldPointCm | null /* the nearest point within withinM where `holds` is true — on the feature for a line-borne test, a fine cell's centre for a raster test; ties by the lower cell index, then the lower (y, x); null where none */ }   // J393: V13 OWNS the slot, V14 the eleven plug-ins (V14 §2.5), as for SuitabilityTerm (SW-01)⏎declare const siteCoherence: { register(test: SiteCoherenceTest): void; get(kind: string): SiteCoherenceTest };   // @plat/world/siting's second registry; a duplicate kind is refused at registration
```

**A-40.** `docs/volumes/V13-world.md`, line 801 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the two anomalies of a site's road and coherence (§1.4 (e)).

*Current text:*
```text
'riverUphill'|'coastInland'|'lockedBelowTable'|'lockedInWater'|'roadToNowhere'|'roadUnmatched'|'windSide'|'sunDiffers'; detail: string; reason: Id }   // derived, V13 §2.4; `roadToNowhere` (a charter road no exit meets) and `roadUnmatched` (a frame exit no charter road meets) are reported readings, never annotations
```
*New text:*
```text
'riverUphill'|'coastInland'|'lockedBelowTable'|'lockedInWater'|'roadToNowhere'|'roadUnmatched'|'windSide'|'sunDiffers'|'siteIncoherent'|'noRoadAccess'; detail: string; reason: Id }   // derived, V13 §2.4; `roadToNowhere` (a charter road no exit meets) and `roadUnmatched` (a frame exit no charter road meets) are reported readings, never annotations; `siteIncoherent` (a placed site whose coherence, evaluated now, is unlawful: the detail names its failing rows and the nearest lawful origin within `originSearchM`) and `noRoadAccess` (a site whose road access is `required` and no approach was laid) are a site subject's (V13 §3.11.1, §3.8 (12); J393)
```

**A-41.** `docs/volumes/V13-world.md`, line 1123 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* an approach road of class trail is patrolled; no row named a trail (§1.3).

*Current text:*
```text
| `patrol.cadenceWeeks` / `hostileDays` / `gradeShift` / `forceShift` | 1, 4, 13 / 3 / highway +1, road 0, track −1 (hidden: none) /
```
*New text:*
```text
| `patrol.cadenceWeeks` / `hostileDays` / `gradeShift` / `forceShift` | 1, 4, 13 / 3 / highway +1, road 0, track −1, trail −1 (an approach road of class `trail` or a W7 (5) trail; J393) (hidden: none) /
```

**A-42.** `docs/volumes/V13-world.md`, line 1157 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the one new weight, shipped (§1.3).

*Current text:*
```text
| `weights` | coastSide 3 · riverCrossing 2 · edgeElevation 1 · relief 0.5 · biome 0.3 · territory 0.2 · dossier ∞ (a hard constraint, V13 §3.11.1) |
```
*New text:*
```text
| `weights` | coastSide 3 · riverCrossing 2 · edgeElevation 1 · relief 0.5 · biome 0.3 · territory 0.2 · dossier ∞ (a hard constraint, V13 §3.11.1) · siteKind 1 (a site subject's kind rows carry their own costs, V13 §3.11.1; J393) |
```

**A-43.** `docs/volumes/V13-world.md`, line 1219 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* the new record's identity (§1.5).

*Current text:*
```text
| a `WorldRoute` | the world root | (`route`, the two seats' lineages sorted, the mode `land`\|`water`) — the class or grade an attribute, so a re-grade keeps the id and a land road and a sea leg between one pair keep two |
```
*New text:*
```text
| a `WorldRoute` | the world root | (`route`, the two seats' lineages sorted, the mode `land`\|`water`) — the class or grade an attribute, so a re-grade keeps the id and a land road and a sea leg between one pair keep two |⏎| an approach road (a `WorldRoute` of origin `approach`, V13 §3.8 (12)) | the world root | (`route`, the site placement's lineage, `approach`) — so a re-lay keeps its id and a moved site keeps its road's address |
```

**A-44.** `docs/volumes/V13-world.md`, line 1235 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the approach road's anchor (§1.5).

*Current text:*
```text
a route by its ends and mode; a sway by its seat.
```
*New text:*
```text
a route by its ends and mode, an approach road by its site; a sway by its seat.
```

**A-45.** `docs/volumes/V13-world.md`, line 1254 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* every new record field has a lifecycle row (§1.5).

*Current text:*
```text
| `Placement` | `placeFrame` (settlement-first) or `requestCharter` (world-first, bound to the frame's `docId` by `bindPlacement`); `setPlacement`, `mirrorFrame`, `worldWins`; V14's adoption | the transform, the glyph, the port, the compass, the sun and wind terms | the world's entities block | an input: kept by every world re-derivation; a world `adjust` that changes the extent re-validates every placement (one outside the new extent is reported and kept) | the former placement, blend and charter | the subject by `docId`; a subject the world cannot open stays placed and is reported |
```
*New text:*
```text
| `Placement` | `placeFrame` (settlement-first) or `requestCharter` (world-first, bound to the frame's `docId` by `bindPlacement`); `setPlacement`, `mirrorFrame`, `worldWins`; V14's adoption | the transform, the glyph, the port, the compass, the sun and wind terms | the world's entities block | an input: kept by every world re-derivation; a world `adjust` that changes the extent re-validates every placement (one outside the new extent is reported and kept) | the former placement, blend and charter | the subject by `docId`; a subject the world cannot open stays placed and is reported |⏎| `Placement.approach` (a site subject; J393) | W7 (12) | the charter's `roads`, the patrol cadence's source (V13 §3.9 (14)), the clerk's `why placement`, the view | with its placement in the world's entities block, as `coherenceCost` is, rewritten only by W7 (12) | re-laid by W7 (12) at every run that reaches it | never an undo target: re-laid after the placement's undo | absent: W7 (12) at load |
```

**A-46.** `docs/volumes/V13-world.md`, line 1263 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* the approach road's lifecycle (§1.5).

*Current text:*
```text
| `WorldRoute` on a host-bound world | W7 laying the edges `genesis` names and `network`'s `chartered` changes | the charter's `roads`, `routes`, `routeFacts`, `mapFeed`, the view | entities block, every lay version kept | never silently: a happened edit is a dated lay version; an always-so edit, a regenerate or an adjust a lay version the host adopts by its re-canonize | a host input is never a user's undo target; a user's dated re-lay goes with its edit | the record schema's chain; **import:** a legacy campaign's drawn roads stay presentation and become host routes only through the host's elective genesis; **dark-after-lit:** with the host's route lane dark its genesis still arrives as a presentation call and nothing is laid beyond it; **death:** a dead seat's routes keep the host's grades until the host's `network` demotes or abandons them, and a campaign's deletion takes them with the world; **veil:** a hidden host road is a DM-only ghost, a covert power's patrols omitted |
```
*New text:*
```text
| `WorldRoute` on a host-bound world | W7 laying the edges `genesis` names and `network`'s `chartered` changes | the charter's `roads`, `routes`, `routeFacts`, `mapFeed`, the view | entities block, every lay version kept | never silently: a happened edit is a dated lay version; an always-so edit, a regenerate or an adjust a lay version the host adopts by its re-canonize | a host input is never a user's undo target; a user's dated re-lay goes with its edit | the record schema's chain; **import:** a legacy campaign's drawn roads stay presentation and become host routes only through the host's elective genesis; **dark-after-lit:** with the host's route lane dark its genesis still arrives as a presentation call and nothing is laid beyond it; **death:** a dead seat's routes keep the host's grades until the host's `network` demotes or abandons them, and a campaign's deletion takes them with the world; **veil:** a hidden host road is a DM-only ghost, a covert power's patrols omitted |⏎| an approach road (`WorldRoute` of origin `approach`; J393) | W7 (12) for a site placement whose road access is `required` or `preferred` (V13 §3.8 (12)) | the `route` layer, `roadsAt`, the charters' `roads`, the patrol cadence, the view, the exports, `derivedTime`; on a host-bound world the DM's `mapFeed` keyless — never the canon, `routeFacts`, `patrolOffer` or `routes(world)`'s host list | entities block, each re-lay bumping `layVersion` | re-derived by W7 (12); tombstoned when its site is unplaced or adopted, its road access becomes `none` or `avoided`, or a route laid later meets the site's frame | with its site's placement edit (a derived product) | absent: W7 (12) at load |
```

**A-47.** `docs/volumes/V13-world.md`, line 1402 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* W7 (12) runs as W7b's last step (§1.4 (d)).

*Current text:*
```text
| W7b Routes | `W7b` | the final seats (proposals, placements, host seats, V14's routed sites), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s, the `routes` layer |
```
*New text:*
```text
| W7b Routes | `W7b` | the final seats (proposals, placements, host seats), the site placements with road access and their cards' kind rows (W7 (12); J393), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s (the approach roads among them), the `routes` layer, every site placement's `approach` |
```

**A-48.** `docs/volumes/V13-world.md`, line 1714 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* a site no longer seats W7's pair selection (J-A.1).

*Current text:*
```text
every stage-1 or final proposal when W7 runs for W6, and⏎   every site placement whose card is flagged `routed` (V14 §2.5's kind row, copied at the drop; SW-20). A seat's rank is its tier (a placement's frame tier; a proposal's pass:⏎   capital 2, town 1, port + 1; a site 0).
```
*New text:*
```text
every stage-1 or final proposal when W7 runs for W6 —⏎   a world site is never a seat: it lies along a route or an approach road joins it ((12); J393). A seat's rank is its⏎   tier (a placement's frame tier; a proposal's pass: capital 2, town 1, port + 1).
```

**A-49.** `docs/volumes/V13-world.md`, line 1776 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the one map-laid road on a host-bound world is the approach road (J-A.16).

*Current text:*
```text
W7 on a host-bound world is incremental: it lays only edges a⏎   host change names;
```
*New text:*
```text
W7 on a host-bound world is incremental: it lays only edges a⏎   host change names (and the map's own approach roads to world sites, (12), never a host edge);
```

**A-50.** `docs/volumes/V13-world.md`, line 1783 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* no route is bent to a site (J-A.1); T-V13-43's clause follows.

*Current text:*
```text
so dropping or removing a site changes a route's⏎   geometry and effort, never the number of legs.
```
*New text:*
```text
so dropping or removing a site changes no route's⏎   geometry, effort or number of legs: the site lies along a route, or the map's own approach road joins it ((12)).
```

**A-51.** `docs/volumes/V13-world.md`, line 1786 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* the twelfth point, the mechanism that makes a site's road part of the one network (§1.4 (d)).

*Current text:*
```text
   before the charter is emitted.
```
*New text:*
```text
   before the charter is emitted.⏎12. **Approaches (J393: "make sure that sites have road access where appropriate, they are integrated into road⏎   infrastructure").** Run as W7b's last step on a standalone world (after (5)'s trails, before (6)'s reasons), after⏎   the genesis and each `network` window on a host-bound world, and as a local operator of a site's placement edits⏎   (`requestCharter`, `setPlacement`, `unplaceFrame` with a site subject: after P1, before P4, so the site's charter⏎   carries its approach road), of V14's `setAttr site/roadAccess` and of adoption (a later run that changes a site's⏎   approach marks its charter stale, V13 §3.11.5 (1)). For every `Placement` with a site subject whose card's `roadAccess` is `required` or `preferred` and whose⏎   kind row's `approach.role` is not `none` (V14 §2.5), in the placements' lineage-key order: (a) **along** — where a⏎   route of class ≥ the row's `minClass` (highway > road > track > trail; the network at the week, a hidden road no⏎   public road) crosses the site frame's ring (its rectangle through `toWorld`, as P4 (6) lists a charter road), the⏎   site lies along the⏎   nearest such route (by the distance from the origin to its polyline, ties by the lower route lineage key):⏎   `Placement.approach = { role: 'along'; route; atCm }`, `atCm` the polyline's nearest point (ties by the lower vertex⏎   index); **no route is written** — its polyline, stations, effort and lay version stay byte-identical; (b) **an⏎   approach road** — else, where the role is `any`: one A\* as (4)'s (the lifted bucket queue, the heuristic, the⏎   ellipse, the tie rule) from the origin's fine cell to the nearest fine cell carrying a route of class ≥ `minClass`⏎   outside every placed settlement frame's extent + margin, within the row's `maxRoadM` of the origin in a straight⏎   line, over (2)'s cost surface with the `existingRoute` discount against every route already laid (earlier approach⏎   roads among them), a path over `maxCostFactor` × the straight cost dropped; the polyline the origin, then the path's⏎   cell centres simplified at `routeToleranceM`, ending at the **junction** (the joined route's polyline point nearest⏎   the path's last cell) and never crossing a water cell; written as a `WorldRoute` of origin `approach` (`a` the site's⏎   placement, `b` the joined route, `class` the row's `roadClass`, `mode` `land`, no host key), its fields evaluated as⏎   (7) says, its cells entering the `route` layer: `Placement.approach = { role: 'road'; route; junction }`; (c)⏎   **none** — else (an `along` kind no route meets, no path, no route within `maxRoadM`): `{ role: 'none' }`, and a⏎   `required` site raises `W_SITE_NO_ROAD_ACCESS` (the site, the nearest route of its class and its distance) and stands⏎   under the anomaly `noRoadAccess` (V13 §3.11.5 (4)); a `preferred` one reports nothing. Every along reading comes⏎   first, then the approach roads in order, so a later one rides the earlier and may join an earlier approach road of⏎   class ≥ its `minClass`; no draw. A site's edit re-lays its own approach and then every approach road that joined it⏎   — its closure, named by the dry run ((10)); a W7a/W7b re-run re-lays every approach of the landmass after it; the⏎   cascade re-lays an approach road a moved reach crosses (V13 §3.14.2 step 5). An approach road is tombstoned when its⏎   site is unplaced or adopted, when its road access becomes `none` or `avoided`, or when a route laid later meets the⏎   site's frame. Every reader of `WorldRoute` and the `route` layer reads it — `roadsAt`, the charters' `roads` (a site⏎   frame's, never a settlement's), V14's encounter crop, the patrol cadence, the view, the exports, `derivedTime` —;⏎   W6b's `connectivity` never does (it is laid after W7b), and it joins no seat, so it makes no member continuous (V13⏎   §3.9 (9)). On a host-bound world no host route moves (no `timeDelta`, no `W_TRAVEL_BAND_CROSSED`), and an approach⏎   road carries no host key and is in no `canon` slot, `routeFacts` row, `patrolOffer` row or `routes(world)`'s host⏎   list: it is the map's own road, riding the DM's `mapFeed` keyless (V13 §3.11.6; J-V13.110).
```

**A-52.** `docs/volumes/V13-world.md`, line 1788 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* W7's output names what (12) writes.

*Current text:*
```text
*Output:* `WorldRoute`s and the `route` layer.
```
*New text:*
```text
*Output:* `WorldRoute`s (the approach roads among them), the `route` layer and every site placement's `approach`.
```

**A-53.** `docs/volumes/V13-world.md`, line 1892 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* an approach road makes no vassal continuous (§1.4 (d) 5).

*Current text:*
```text
or a road the host does not grade hidden joins its seat to that sway within Treinf —
```
*New text:*
```text
or a road the host does not grade hidden joins its seat to that sway within Treinf (an approach road to a world site, V13 §3.8 (12), joins no seat) —
```

**A-54.** `docs/volumes/V13-world.md`, line 1979 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* "along the segment" read through the approach (J-A.11).

*Current text:*
```text
the travel law's foot pace from the power's nearest garrisoned seat, fort or watchpost along the segment, moved one
```
*New text:*
```text
the travel law's foot pace from the power's nearest garrisoned seat, fort or watchpost along the segment (a fort or⏎   watchpost is along a segment when its approach lies along it or its approach road joins it, the round trip measured⏎   from the site's origin over its approach, V13 §3.8 (12)), moved one
```

**A-55.** `docs/volumes/V13-world.md`, line 2001 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* a border post sits on its road by construction (§1.4 (n)).

*Current text:*
```text
between allegiances that are not adversarial — drawn as a ghost pin the DM accepts (a
```
*New text:*
```text
between allegiances that are not adversarial — its `at` the crossing point on the route's polyline, so an accepted⏎   card lies along the route and meets its kind's coherence rows (V14 §2.5) — drawn as a ghost pin the DM accepts (a
```

**A-56.** `docs/volumes/V13-world.md`, line 2070 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* a site's placement edits run its coherence in world-first mode too (§1.4 (b)).

*Current text:*
```text
takes the site document as the frame through every edit⏎below;
```
*New text:*
```text
takes the site document as the frame through every edit⏎below — its P1 the site form of V13 §3.11.1 in both orders (`requestCharter` runs it too: a site's two terms need no⏎frame to measure), with no bearing search, no P2 and no P3 (the world never blends to a site), its approach W7 (12)'s⏎(J393);
```

**A-57.** `docs/volumes/V13-world.md`, line 2115 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* the site's coherence and the bend, in V13's placement law (§1.4 (b), (c); J-A.3, J-A.5, J-A.6).

*Current text:*
```text
by term as the frame is dragged (V13 §4.2).
```
*New text:*
```text
by term as the frame is dragged (V13 §4.2).⏎⏎**A site subject's coherence (J393).** On a `Placement` whose subject is a site, `coherence` evaluates two terms only:⏎**`siteKind`** — Σ over the card's kind row's coherence rows (V14 §2.5) of the row's `cost` where its test's `holds` is⏎false (V14's plug-ins through `siteCoherence`, V13 §2.2), a group counting the least cost of its failing rows and⏎nothing when one of its rows holds — and **`dossier`** (as above; no host site fact is a DR row today); `total` and⏎`lawful` as above, so one failing row of cost 5 is unlawful (C13-26's precedent) and preferences add up without moving⏎anything. There is no bearing search (the bearing is the request's: the approach side facing the nearest route, V14⏎§3.4 (a)). `nearestLawful` for a site subject, with a radius R, takes as candidates each failing row's⏎`target(origin, ctx, row, R)` and the spiral stations out to R in steps of `originStepCells`, and returns up to three⏎lawful placements by ascending `total`, ties by distance from the asked origin, then by the lower cell index, then by⏎(y, x). **The bend** (the owner's "their geography in the world map autocorrects to meet the coherence⏎expectation"): a placement edit with a point whose site is unlawful at it, of a kind whose `correction` is `bend`,⏎searches R = the kind's `bendM`; the dry run draws the ghost at the best placement found, names it⏎(`bend.site.placement`: the row and the distance) and preselects `takeOffer`, `keep` holding the asked point unlawful;⏎with nothing found, or under `report`, the asked point is kept, flagged, and the nearest lawful placements within R =⏎`originSearchM` are offered, none preselected (none found: kept with no offer). A host-locked site placement takes the⏎reading only — no bend, no offer. The stored cost is the edit's; no later world change moves a site (item 137 (c)): it⏎is the anomaly `siteIncoherent` of V13 §3.11.5 (4).
```

**A-58.** `docs/volumes/V13-world.md`, line 2297 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* the DM's choices on a site's anomalies (§1.4 (e); J-A.13).

*Current text:*
```text
   settlement changes (C13-25).
```
*New text:*
```text
   settlement changes (C13-25).⏎   A site subject's two anomalies, `siteIncoherent` and `noRoadAccess` (V13 §3.11.1, §3.8 (12); J393), are live readings⏎   re-evaluated at every placement edit of the site, every W7 run, `network` window, sway revision and cascade reaching⏎   its rows (a road the host demotes to hidden under a toll house raises `siteIncoherent` at the next window), with the⏎   DM's choices `keep` (default) or `takeOffer` (a `setPlacement` to the nearest lawful origin the detail names; not⏎   under `hostLocked`): a site's incoherence is cured by moving the site, so `worldWins` stays V14's re-materialization⏎   on a stale charter, and neither moves the site by itself; a preference unmet raises no anomaly.
```

**A-59.** `docs/volumes/V13-world.md`, line 2375 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the map feed carries the approach roads as presentation (J-A.16).

*Current text:*
```text
the glyphs,⏎  the patrol tints,
```
*New text:*
```text
the glyphs, the map's own⏎  approach roads to world sites keyless (V13 §3.8 (12); drawn by the host's map surface only by its own choice, H31), the patrol tints,
```

**A-60.** `docs/volumes/V13-world.md`, line 2387 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the host's route list stays the host's network (J-A.16).

*Current text:*
```text
- `routes(world)` → every `WorldRoute`'s polyline with its host key;
```
*New text:*
```text
- `routes(world)` → every host route's polyline with its host key (on a standalone world every `WorldRoute`'s; an⏎  approach road to a world site, V13 §3.8 (12), is never in it on a host-bound world, riding the `mapFeed` instead);
```

**A-61.** `docs/volumes/V13-world.md`, line 2472 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* P1–P5's output names the approach.

*Current text:*
```text
anomalies, the glyph (W9 re-run for the placement), the world's routes and seat territories re-run when the placement adds a
```
*New text:*
```text
anomalies, the glyph (W9 re-run for the placement), a site subject's approach (W7 (12) for that site and the approach⏎roads that joined it; J393), the world's routes and seat territories re-run when the placement adds a
```

**A-62.** `docs/volumes/V13-world.md`, line 2663 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the cascade's step 5 consumer (§1.4 (d) 4).

*Current text:*
```text
W7's crossings (a route crossing a moved reach re-costs its edge),
```
*New text:*
```text
W7's crossings (a route crossing a moved reach re-costs its edge), W7 (12)'s approach roads (one a moved reach crosses is re-laid; J393),
```

**A-63.** `docs/volumes/V13-world.md`, line 2706 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the consumer list gains the approach roads (J-A.17).

*Current text:*
```text
(20) V05's fallen islands' decoration faces under a raised⏎sea.
```
*New text:*
```text
(20) V05's fallen islands' decoration faces under a raised⏎sea, (21) W7 (12)'s approach roads (re-laid where a moved reach crosses one; J393).
```

**A-64.** `docs/volumes/V13-world.md`, line 2886 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the bend rides the existing warning's actions (§1.4 (c)).

*Current text:*
```text
`W_PLACE_NO_LAWFUL` (`keep`, `takeOffer` with `offer: n`, `cancel`),
```
*New text:*
```text
`W_PLACE_NO_LAWFUL` (`keep`, `takeOffer` with `offer: n`, `cancel` — on a site subject `takeOffer` preselected where its kind bends within `bendM`, V13 §3.11.1; J393),
```

**A-65.** `docs/volumes/V13-world.md`, line 2887 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the site form of the anomaly's actions (§1.4 (e)).

*Current text:*
```text
`W_PLACE_ANOMALY` (`keep`,⏎`worldWins` with `ids`)
```
*New text:*
```text
`W_PLACE_ANOMALY` (`keep`,⏎`worldWins` with `ids`; on a site subject's `siteIncoherent` or `noRoadAccess` `keep` or `takeOffer`, V13 §3.11.5 (4))
```

**A-66.** `docs/volumes/V13-world.md`, line 2922 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* the locality of a site's placement edit (§1.4 (j)).

*Current text:*
```text
| `setPlacement` (origin) of a world-first placement | P4 (the charter re-emitted, marked stale on the frame) → P5 → W9 → W7–W8 over the landmass | the frame | the frame's `worldWins` re-derivation: declared (SW-19) |
```
*New text:*
```text
| `setPlacement` (origin) of a world-first placement | P4 (the charter re-emitted, marked stale on the frame) → P5 → W9 → W7–W8 over the landmass | the frame | the frame's `worldWins` re-derivation: declared (SW-19) |⏎| a site subject's `requestCharter`, `setPlacement` or `unplaceFrame` (V14 §3.4 (a); J393) | P1's site form (the bend's dry run, V13 §3.11.1) → W7 (12) for the site and the approach roads that joined it → P4 (the site's charter, its roads among it) → P5 → W9 (the site's glyph) | every route (no route is bent to a site); every other placement; the site's arenas (bar 3) | `worldWins` on a site: V14's re-materialization (SW-19) |
```

**A-67.** `docs/volumes/V13-world.md`, line 3013 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the lens/view draws the approach roads at existing styles (§1.4 (g)).

*Current text:*
```text
| `routes` | vector | `WorldRoute` by class, or by the host's grade on a host-bound world,
```
*New text:*
```text
| `routes` | vector | `WorldRoute` by class, or by the host's grade on a host-bound world (the map's approach roads to world sites by their class on both, V13 §3.8 (12)),
```

**A-68.** `docs/volumes/V13-world.md`, line 3523 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the two new budget rows (§1.4 (k)).

*Current text:*
```text
and one scrub step ≤ 120 ms. Each has its T-V13 row in §7.
```
*New text:*
```text
and one scrub step ≤ 120 ms; `WORLD-16` a site's placement dry run (P1's site form and the bend's search within⏎`bendM`) ≤ 20 ms at the realm rung, ≤ 150 ms with the offers' search out to `originSearchM` (V13 §3.11.1; J393);⏎`WORLD-17` W7 (12) for one site ≤ 20 ms, a whole landmass's approaches ≤ 0.1 × the W7a + W7b row (V13 §3.8 (12)). Each⏎has its T-V13 row in §7.
```

**A-69.** `docs/volumes/V13-world.md`, line 3565 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* T-V13-21b's count follows the list (J-A.17).

*Current text:*
```text
| T-V13-21b | the cascade's twenty consumers (V13 §3.14.3's second list):
```
*New text:*
```text
| T-V13-21b | the cascade's twenty-one consumers (V13 §3.14.3's second list; the twenty-first W7 (12)'s approach roads, J393):
```

**A-70.** `docs/volumes/V13-world.md`, line 3584 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* every new V13 behaviour has a test (§1.6).

*Current text:*
```text
| T-V13-39 | W7 and W8: every coordinate passed to `delaunay` is an integer metre inside §3.2 (1)'s range invariant (a lint on the call; SW-16); no land leg crosses water; the `existingRoute` discount makes later roads share earlier cells (the shared-cell share ≥ 20 % on B-WORLD-lite, own bar); every member sway is one connected component after normalization or is flagged an exclave (enclaves ≤ `enclaveMaxCells` removed); every seat territory is one component; standalone provinces partition their seat territory | statistics and invariants |
```
*New text:*
```text
| T-V13-39 | W7 and W8: every coordinate passed to `delaunay` is an integer metre inside §3.2 (1)'s range invariant (a lint on the call; SW-16); no land leg crosses water; the `existingRoute` discount makes later roads share earlier cells (the shared-cell share ≥ 20 % on B-WORLD-lite, own bar); every member sway is one connected component after normalization or is flagged an exclave (enclaves ≤ `enclaveMaxCells` removed); every seat territory is one component; standalone provinces partition their seat territory | statistics and invariants |⏎| T-V13-57 | approaches (W7 (12); J393): on B-WORLD-lite with one card of every `required` and `preferred` kind dropped free, a tollhouse and a bridge fort on a road lie along it (`approach.role` `along`, `atCm` on the polyline) and every route is byte-identical before and after (polyline, stations, effort, lay version); a fort 3 km from a road gets an approach road of class `track` ending at a junction on the nearest track-or-better route, its cells in the `route` layer and its site frame's charter naming it as a road; a shrine 2 km from every road gets none and nothing is reported, a mine 6 km from every road none with `W_SITE_NO_ROAD_ACCESS` and `noRoadAccess`; no approach road crosses water or enters a placed settlement frame's extent + margin, and no settlement's charter changes; two runs are byte-identical; a later approach road rides an earlier one; on the host-bound fixture no host route moves, `timeDelta` is empty, no approach road carries a host key or appears in the canon, `routeFacts`, `patrolOffer` or `routes(world)`'s host list, and the DM's map feed carries it keyless; a re-lay keeps its id; unplacing the site tombstones it; a route laid later through the site's frame turns the approach to `along` and tombstones the road | the world fixtures; a mock host |⏎| T-V13-58 | a site's coherence (V13 §3.11.1; J393): every shipped kind row's coherence rows evaluated at a fixture point per row, met and unmet (each of V14's eleven tests at its tolerance ± 1 cell, or ± 1 m on a line); a tollhouse dropped 600 m off a road is unlawful, the dry run preselects the road point with `bend.site.placement` naming the row and the distance, `keep` places it at the asked point unlawful with `siteIncoherent`, `takeOffer` on the road; a hideout dropped 150 m from a road is bent beyond 300 m; a tollhouse 4 km from every road (beyond its 1 000 m `bendM`) is kept unlawful with the nearest lawful within 20 km offered and none preselected; a camp off every road and water is lawful at cost 1 with no anomaly; a fort with no height, pass or crossing is lawful at cost 4; a host-locked tollhouse off every road is neither bent nor offered and reads `siteIncoherent` DM-only; a road the mock host demotes to hidden under a placed tollhouse raises `siteIncoherent` at the next window and moves nothing; a drop with no point never lands on a point failing a row of cost 5; every search is bit-identical across two runs | the placement fixtures |
```

**A-71.** `docs/volumes/V13-world.md`, line 3601 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* patrols over the approach have a test (§1.6).

*Current text:*
```text
of band 1 or less one rung sparser, and with no band sent for its source no shift | fixtures |
```
*New text:*
```text
of band 1 or less one rung sparser, and with no band sent for its source no shift; a garrisoned fort whose approach lies along a segment, or whose approach road joins it, is that segment's patrol source with its round trip over the approach, one with approach `none` is not, and an approach road of class `trail` runs one rung sparser than a road (`gradeShift.trail`; J393) | fixtures |
```

**A-72.** `docs/volumes/V13-world.md`, line 3602 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* T-V13-43's clause follows "no route bent" (J-A.1).

*Current text:*
```text
a site dropped on a host route leaves the leg count unchanged and moves its effort by the detour only;
```
*New text:*
```text
a site dropped beside a host route leaves the leg count, the route's polyline and its effort unchanged, the site lying along it or joined by an approach road no `routeFacts` row names (V13 §3.8 (11), (12); J393);
```

**A-73.** `docs/volumes/V13-world.md`, line 3629 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* the new report code (§1.4 (d) 3).

*Current text:*
```text
| `W_ROUTE_NO_PATH` | warning | W7 | the two seats |
```
*New text:*
```text
| `W_ROUTE_NO_PATH` | warning | W7 | the two seats |⏎| `W_SITE_NO_ROAD_ACCESS` | warning | W7 (12) (J393) | the site, the nearest route of its kind's class and its distance |
```

**A-74.** `docs/volumes/V13-world.md`, line 3677 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* M-W2 builds the approaches (they need routes).

*Current text:*
```text
W8a and W8b with the patrol step and the border-post proposals;
```
*New text:*
```text
W7 (12)'s approaches to world sites and P1's site form with its bend (J393); W8a and W8b with the patrol step and the border-post proposals;
```

**A-75.** `docs/volumes/V13-world.md`, line 3677 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* M-W2's gate names the two new tests (the estimate unchanged: PLAUSIBLE inside its row).

*Current text:*
```text
| T-V13-14, 16, 17, 38, 39, 41 – 43, 46; the B-WORLD statistics bars | 8 pw |
```
*New text:*
```text
| T-V13-14, 16, 17, 38, 39, 41 – 43, 46, 57, 58; the B-WORLD statistics bars | 8 pw |
```

**A-76.** `docs/volumes/V13-world.md`, line 3768 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* the one host row, optional, map surface only (§1.4 (m)).

*Current text:*
```text
| H30 | with M-W5's prosperity and alignment step | the alignment asks: a per-advance alignment reading in the lens window (both axes and their bands by its own law, the aggression chip word, the top constituent causes), published as its faith projection is; its moral drift's compounding decay, and its freeze outside belief worlds, fixed if the host so chooses (a defect its alignment read found; the lenses replay nothing, they scrub plates, V13 §5.8 (8)); a week on each tolerance offset's causes | H23 |
```
*New text:*
```text
| H30 | with M-W5's prosperity and alignment step | the alignment asks: a per-advance alignment reading in the lens window (both axes and their bands by its own law, the aggression chip word, the top constituent causes), published as its faith projection is; its moral drift's compounding decay, and its freeze outside belief worlds, fixed if the host so chooses (a defect its alignment read found; the lenses replay nothing, they scrub plates, V13 §5.8 (8)); a week on each tolerance offset's causes | H23 |⏎| H31 | after M-W3, after H19 (optional; J393) | its map surfaces draw the map feed's approach roads — the map's own roads to world sites, keyless — as presentation labelled "map road", read by no step of its simulation | M-W2; H19 |
```

**A-77.** `docs/volumes/V13-world.md`, line 3883 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* the decisions V13 owns (§1.7).

*Current text:*
```text
| J-V13.106 | chose **the additive canon built over the adopted canon's inputs** (J388; V13 §3.11.6) — on a campaign born canonized, the adopted canon with only the seats added since on a founding event (a placement or a satellite's graduation, never an imported row), their seat territories and the water candidates they move re-derived, every other row as that canon has it, its causes the additions alone and what the host adopted read from those causes, never from its log head; the host carrying its own versions, slots, sub-records and the prior seats' ports and circles forward (H22); each travel-band crossing it causes reported with `keep` alone because the founding is the host's — over the canon at the request's log head (it would carry every unadopted geometry shift, lay version, cost law and removal onto the path the entitlement never gates, the DM's premium act made free) and over refusing the additive canon while any other change is pending (one pending lay version would then leave every later founding unmapped until the DM's premium re-canonize, the outcome J388 rules out) |
```
*New text:*
```text
| J-V13.106 | chose **the additive canon built over the adopted canon's inputs** (J388; V13 §3.11.6) — on a campaign born canonized, the adopted canon with only the seats added since on a founding event (a placement or a satellite's graduation, never an imported row), their seat territories and the water candidates they move re-derived, every other row as that canon has it, its causes the additions alone and what the host adopted read from those causes, never from its log head; the host carrying its own versions, slots, sub-records and the prior seats' ports and circles forward (H22); each travel-band crossing it causes reported with `keep` alone because the founding is the host's — over the canon at the request's log head (it would carry every unadopted geometry shift, lay version, cost law and removal onto the path the entitlement never gates, the DM's premium act made free) and over refusing the additive canon while any other change is pending (one pending lay version would then leave every later founding unmapped until the DM's premium re-canonize, the outcome J388 rules out) |⏎| J-V13.107 | **(J393.)** chose a world site to lie **along** a route that meets its frame or to be joined by the map's own **approach road**, never a seat of W7's pair selection, on both worlds, and **no route bent** to a site, over seating a site among the Urquhart seats or giving a route a vertex at the site's cell, because W7 (11) already makes a site a position along a route on a host-bound world and one rule beats two, a rank-0 seat beside a capital pulls a pair edge classed by the higher seat (a highway to a mine), a bound route's geometry is the host's lived network (§3.8 (9)–(10)), and a cell-centre vertex would shift a road by up to half a cell — the bend brings the site that must stand on the road to it (vetoable) |⏎| J-V13.108 | **(J393.)** chose a site's coherence expectation as **one more term of the coherence cost** (`siteKind`), the kind row's rows with their own costs under the one `lawfulMax` (5 the expectation proper, 1 or 3 a preference; groups of alternatives), tested by V14's plug-ins in a V13 slot (`SiteCoherenceTest`), searched by `nearestLawful` and reported by `PlacementAnomaly`, over a V14-side check before the drop, a `required` flag beside a second weight, or the formulas in V13, because the owner's word is "coherence", this volume's placement law already judges, searches, offers, stores and reports, C13-26's bound already decides unlawfulness by cost, and SW-01's pattern keeps one registry (vetoable) |⏎| J-V13.109 | **(J393.)** chose the autocorrect as a **bend preselected in the dry run within the kind's `bendM`**, the DM's `keep` holding the asked point, beyond it the nearest lawful placement **offered, never taken**, and **no bend after the edit** (a later break is the anomaly `siteIncoherent`), over the offer shown and not taken, or a placed site re-sited by a later world change, because the owner's words say the site's geography autocorrects, item 101 R2 bends rather than refuses, §1.3's correction offers the nearest lawful placement, and item 137 (c) keeps a locked thing where it stands (vetoable) |⏎| J-V13.110 | **(J393.)** chose the approach road as a **`WorldRoute` of origin `approach`**, laid by W7 (12) **after W7b and incrementally per site** (its closure: the site and the approach roads that joined it), never entering a settlement frame, the approach roads one more consumer of T-V13-21b and no nineteenth drift row (item 138 (c)'s eighteen are the owner's), and on a **host-bound world the map's own road** — no host key, in no simulator-feed message, keyless in the DM's map feed, drawn by the host only by its own choice (H31) — reading J-RR.21's "a `WorldRoute` only for a host-named edge" as the host network's rule, over a polyline on the placement, re-running W7a/W7b at every drop or no approach road on a host-bound world, because every reader of roads reads `WorldRoute`, (10) moves nothing outside a closure, the owner's "integrated into road infrastructure" holds on every world and a road the host's simulation never travels changes no simulated byte (vetoable) |⏎| J-V13.111 | **(J393.)** chose a garrisoned fort or watchpost to be a segment's **patrol source through its approach** only, and an approach road of class `trail` to take `gradeShift` −1, over any site near the segment and an unpatrolled trail, because §3.9 (14)'s "along the segment" needs a reading and the approach is the one the road gives (vetoable) |⏎| J-V13.112 | **(J393.)** chose `takeOffer` as the DM's second choice on a site's `siteIncoherent` and `noRoadAccess`, and **no anomaly for a preference**, over the scoped `worldWins` and a pin for every cost, because a site's incoherence is cured by moving the site, not by re-deriving its arenas, and a camp off a road is no fault (vetoable) |
```

**A-78.** `docs/volumes/V13-world.md`, line 4261 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* R-V14-1 follows J-A.2.

*Current text:*
```text
its card's `attraction` (0–1) and `routed` are read through `@plat/api`'s resolver from the site document (V14 §2.2), cached per (placement, the card's digest) — for W6's `destination` term, W7's routed sites and the charter's `sites` (SW-20)
```
*New text:*
```text
its card's `attraction` (0–1) and `roadAccess` are read through `@plat/api`'s resolver from the site document (V14 §2.2), cached per (placement, the card's digest) — for W6's `destination` term, W7 (12)'s approaches and the charter's `sites` (SW-20; J393)
```

**A-79.** `docs/volumes/V13-world.md`, line 4273 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), insertion. *Reason:* what V13 needs from V14 for J393 (§1.8).

*Current text:*
```text
| R-V14-13 | the card's `devotion` (V14 §2.2: a DM-placed holy or hidden cult site's deity key and role; stated only, never generated; DM-only by default) — read by the religion lens and offered in the DM's map feed (J384 (10)) | V13 §3.11.6, §5.9 |
```
*New text:*
```text
| R-V14-13 | the card's `devotion` (V14 §2.2: a DM-placed holy or hidden cult site's deity key and role; stated only, never generated; DM-only by default) — read by the religion lens and offered in the DM's map feed (J384 (10)) | V13 §3.11.6, §5.9 |⏎| R-V14-14 | (J393) the card's `roadAccess`; the kind row's `approach`, `coherence`, `correction` and `bendM` (V14 §2.5), read through the resolver with the card; the eleven `SiteCoherenceTest` plug-ins (`onRoute`, `atCrossing`, `atPass`, `atBorder`, `onOverlook`, `onOre`, `onCliff`, `byWater`, `onShore`, `awayFromRoutes`, `inReach`) registered through `siteCoherence.register`, each pure, their constants V14's | V13 §2.2, §3.8 (12), §3.11.1 |
```

**A-80.** `docs/volumes/V13-world.md`, line 4286 (md5 `d0de9ad8dadfeccc89ac86f2ea4d62f4`), replacement. *Reason:* the host's list now has H31.

*Current text:*
```text
The host's own changes (V13 §8.5's H1–H30) are the host's
```
*New text:*
```text
The host's own changes (V13 §8.5's H1–H31) are the host's
```

**A-81.** `docs/ARCHITECTURE.md`, line 8678 (md5 `1f871a01961de8a4994125d7bb1993be`), replacement. *Reason:* BCR-V14-26's application to the base (§1.4 (f) (3)); the synthesis may hold it for the coherence pass as the volumes' BCRs are usually held.

*Current text:*
```text
row with `trail` links its decoration to the nearest way corridor by an L3 `path` face; fields and woods keep back by
```
*New text:*
```text
row with `trail` links its decoration to the nearest way corridor by an L3 `path` face — and a `worldSite` reservation⏎  (V14 §3.9 (g)) is linked from its entrance gate to the nearest way corridor by an L3 `driveway` face where its card's⏎  `roadAccess` is `required` and by a `path` face where it is `preferred`, nothing where it is `none` or `avoided`⏎  (BCR-V14-26; J393); fields and woods keep back by
```

**A-82.** `docs/ARCHITECTURE.md`, line 9718 (md5 `1f871a01961de8a4994125d7bb1993be`), replacement. *Reason:* BCR-V14-13's text in the base follows J-A.2.

*Current text:*
```text
V13's siting reads the card's `attraction` and `routed`, never a destination (C14-04) */;
```
*New text:*
```text
V13's siting reads the card's `attraction` and `roadAccess`, never a destination (C14-04; J393) */;
```

**A-83.** `docs/ARCHITECTURE.md`, line 11709 (md5 `1f871a01961de8a4994125d7bb1993be`), replacement. *Reason:* the S12 operator lays the `inFrame` site's face (BCR-V14-26).

*Current text:*
```text
| S12 | the covered hinterland faces and greenery entities; the hinterland unit re-lays its headland parts along the perimeter by step (0) first (§7.3 item 2) |
```
*New text:*
```text
| S12 | the covered hinterland faces and greenery entities; the hinterland unit re-lays its headland parts along the perimeter by step (0) first (§7.3 item 2); round a `worldSite` reservation, its road-access face (§4.9; BCR-V14-26) |
```

**A-84.** `docs/volumes/INDEX.md`, line 71 (md5 `4288179616d26f75b3d717deb23ed0ce`), replacement. *Reason:* the wiring table names what V13 now reads of V14 (J393).

*Current text:*
```text
V14 (`WorldSite.attraction` and `routed`, the site's glyph marks, its `placementRef`)
```
*New text:*
```text
V14 (`WorldSite.attraction` and `roadAccess`, the kind rows' `approach`, `coherence`, `correction` and `bendM`, the eleven site coherence plug-ins, the site's glyph marks, its `placementRef`)
```

**A-85.** `docs/volumes/INDEX.md`, line 72 (md5 `4288179616d26f75b3d717deb23ed0ce`), replacement. *Reason:* as above, V14's side.

*Current text:*
```text
V13 (the seventeen purpose-term plug-ins, `attraction` and `routed`, the site's glyph marks, `adoptSite` on `world.placed`)
```
*New text:*
```text
V13 (the seventeen purpose-term plug-ins and the eleven site coherence plug-ins, `attraction` and `roadAccess` with the kind rows' road columns, the site's glyph marks, `adoptSite` on `world.placed`)
```

**A-86.** `docs/volumes/INDEX.md`, line 186 (md5 `4288179616d26f75b3d717deb23ed0ce`), replacement. *Reason:* one owner question added (OQ-A1).

*Current text:*
```text
Volumes 13 and 14's eight questions carry the session's recommendation: the owner deferred
```
*New text:*
```text
Volumes 13 and 14's nine questions carry the session's recommendation (V14 Q5, put on 2026-10-18 under J393, among them): the owner deferred
```

**A-87.** `docs/volumes/INDEX.md`, line 222 (md5 `4288179616d26f75b3d717deb23ed0ce`), replacement. *Reason:* as above.

*Current text:*
```text
(V13 §8.5's H1–H30) against M-W1 – M-W3 and M-W5,
```
*New text:*
```text
(V13 §8.5's H1–H31) against M-W1 – M-W3 and M-W5,
```

**A-88.** `docs/volumes/INDEX.md`, line 222 (md5 `4288179616d26f75b3d717deb23ed0ce`), replacement. *Reason:* the host schedule names H31.

*Current text:*
```text
H23–H30 with M-W5, H18–H20 after M-W3;
```
*New text:*
```text
H23–H30 with M-W5, H18–H20 and the optional H31 after M-W3;
```

**A-89.** `docs/volumes/INDEX.md`, line 228 (md5 `4288179616d26f75b3d717deb23ed0ce`), insertion. *Reason:* the one owner question in the index (OQ-A1).

*Current text:*
```text
| V14 | Q4 — a vendor block in the VTT export carrying each unit's reason and the anchor's knowledge state | yes, as an optional namespaced block off by default; the common fields unchanged (recommended; vetoable) |
```
*New text:*
```text
| V14 | Q4 — a vendor block in the VTT export carrying each unit's reason and the anchor's knowledge state | yes, as an optional namespaced block off by default; the common fields unchanged (recommended; vetoable) |⏎| V14 | Q5 — a reading of the owner's word of 2026-10-18 (J393): is "the catalogue" the list of site kinds the DM picks from (V14 §2.5's kind rows, carrying each kind's road access, approach, coherence rows and correction)? | yes; if another list was meant, the columns move to it unchanged in substance (recommended; vetoable) |
```

**A-90.** `docs/volumes/SUMMARY.md`, line 15 (md5 `9d1422839ab63a3ec3bf6d13e3ea8265`), replacement. *Reason:* the count follows the one new owner question (OQ-A1).

*Current text:*
```text
There are thirty-three decisions that are yours by rule (twenty-five from the first twelve volumes, eight from the two⏎new ones: seven you deferred to the session on 16 October, and one — whether the world's canon stays outside the⏎closed door that keeps your host's simulator from reading the map — that you answered yourself on 18 October: yes); each of the
```
*New text:*
```text
There are thirty-four decisions that are yours by rule (twenty-five from the first twelve volumes, nine from the two⏎new ones: seven you deferred to the session on 16 October; one — whether the world's canon stays outside the⏎closed door that keeps your host's simulator from reading the map — that you answered yourself on 18 October: yes; and one⏎put to you on 18 October with your word on sites and their roads — what "the catalogue" meant); each of the
```

**A-91.** `docs/volumes/SUMMARY.md`, line 84 (md5 `9d1422839ab63a3ec3bf6d13e3ea8265`), replacement. *Reason:* the owner-facing account of J393's design (plain words).

*Current text:*
```text
    abandoned, damaged, ruined and restored as transforms over one persisted plan, never a re-roll; a village can grow up⏎    around an old fort and adopt it.
```
*New text:*
```text
    abandoned, damaged, ruined and restored as transforms over one persisted plan, never a re-roll; a village can grow up⏎    around an old fort and adopt it. Every kind of site knows whether it needs a road: a fort, a mine or a toll house⏎    gets one — it stands on a road the world already has, or the world lays a track to it — a shrine or a tower a path⏎    where a road is near, and a hideout keeps off the roads; and four kinds put themselves right when dropped in the⏎    wrong spot — a toll house moves onto the road, a bridge fort onto the road's river crossing, a mine onto its ore, a⏎    hideout off the road — each move shown before you accept it, one click keeping the spot you chose; no road is ever⏎    bent to reach a site.
```

**A-92.** `docs/volumes/SUMMARY.md`, line 197 (md5 `9d1422839ab63a3ec3bf6d13e3ea8265`), replacement. *Reason:* the owner question in plain words (OQ-A1).

*Current text:*
```text
  an optional block that is off unless you turn it on.
```
*New text:*
```text
  an optional block that is off unless you turn it on.⏎- **The sites and their roads** (one question, put to you on 18 October with your word on sites and roads): whether⏎  "the catalogue" in that word means the list of site kinds you pick from, each of which now says whether it needs a⏎  road and whether it moves itself to fit — recommended yes; the design reads it so until you say otherwise.
```

**A-93.** `docs/volumes/SUMMARY.md`, line 209 (md5 `9d1422839ab63a3ec3bf6d13e3ea8265`), replacement. *Reason:* the count follows.

*Current text:*
```text
the eight decisions above (seven proceed on their recommendation until you⏎say otherwise; the eighth you answered on 18 October),
```
*New text:*
```text
the nine decisions above (eight proceed on their recommendation until you⏎say otherwise; one you answered on 18 October),
```

**A-94.** `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md`, line 153 (md5 `fc2520709752ef77f397ba7d6a89c169`), replacement. *Reason:* the brief places the owner's thread of 2026-10-18 with the volume that carries it.

*Current text:*
```text
  knowledge layers; scale and the VTT crop scope with a stable grid origin.
```
*New text:*
```text
  knowledge layers; scale and the VTT crop scope with a stable grid origin; and, by the owner's word of 2026-10-18⏎  (J393), each site kind's road access, its place on the road network and the catalogue-dependent autocorrect of its⏎  placement on the world map (with V13's routes and placement law).
```

**A-95.** `plat/docs/build/M0-world-sites-gate.md`, line 31 (md5 `b6c5be2a5d89fbd19035a3c606194fb9`), replacement. *Reason:* the heading counts the new row.

*Current text:*
```text
## Model rows (M1–M11)
```
*New text:*
```text
## Model rows (M1–M12)
```

**A-96.** `plat/docs/build/M0-world-sites-gate.md`, line 45 (md5 `b6c5be2a5d89fbd19035a3c606194fb9`), insertion. *Reason:* item 140's form: a "do not foreclose" model row for the `inFrame` road-access face, recorded as M1's (§1.8).

*Current text:*
```text
| M11 | The projection and the vertical exaggeration are view state outside the document hash; the style store's schema admits a projection family | §2.9 view state, §8.2 styles |
```
*New text:*
```text
| M11 | The projection and the vertical exaggeration are view state outside the document hash; the style store's schema admits a projection family | §2.9 view state, §8.2 styles |⏎| M12 | The hinterland unit's L3 access faces (an outside plot's `driveway`, a decoration's `path`) can begin at a point on a reservation's boundary — the face's origin a point, not a plot or a decoration id — without a new role, layer or digest change (V14 §3.9 (g), BCR-V14-26; J393) | read the hinterland unit's face types and S12's operator; if the origin is typed to a plot or a decoration, an M1 item |
```


---

## 3. Owner questions (true owner decisions only)

| id | the question | recommendation | if yes | if no |
|---|---|---|---|---|
| OQ-A1 | **A reading of your own word of 2026-10-18 (J393).** In "depending on the catalogue, where appropriate, their geography in the world map autocorrects to meet the coherence expectation", is "the catalogue" the list of site kinds the DM picks from — V14 §2.5's kind rows (`tables/sites/kinds.json`), where this design puts each kind's road access, approach, coherence rows and correction? Only you can say what the word meant; the design reads it so until you say otherwise. | **yes** — the sentence needs a per-kind source of "where appropriate"; the volumes' other catalogues (V09 §4.9's message keys, V11's symbol catalogue, the base's forms catalogue) carry nothing a site's geography could depend on | the five columns stand on the kind rows as §1.2 ships them; nothing else moves | the columns move, unchanged in substance, to the list you name (a new table keyed by kind, read by the same two V13 mechanisms); every fragment of §2 keeps its mechanism and changes only where the columns live (A-5, A-7, A-8, A-9, A-32, and the INDEX and SUMMARY lines) |

It lands as V14 §11 Q5 (A-32), with its rows in INDEX §6 (A-89) and SUMMARY (A-90, A-92, A-93).

**Considered and not put to the owner** (each with its reason; each a vetoable decision of §1.7):
- *May the world move a site the DM dropped at a point?* (the partial's OQ-A2) — the owner's own words say the site's
  geography "autocorrects", so the move is the owner's; its form is this volume's bend law (named in the dry run, the
  DM's `keep` one click away) and its reach a calibratable `bendM` per kind (J-A.6, J-A.15).
- *An approach road on a host-bound world?* (the partial's OQ-A3) — it crosses no SettlementForge boundary: the road is a
  map fact the host's simulation never reads (rr HS20), in no simulator-feed message; the one host-facing part is an
  optional host row the host schedules (H31, under V13 §11 Q2's schedule); the ruling it reads, J-RR.21, is a session
  ruling under the delegation (J-A.16).
- *Should a host-placed site be re-sited to meet its kind's expectation?* — no: the standing rule "a host-placed site
  is never re-sited" (V14:1416–1417) is kept; its incoherence is reported DM-only (J-A.12).

---

## 4. Left unchanged, and why

- **The owner's words and rules** — J393's sentence, items 131–141, the settlement-first correction (V13:332–340), the
  territory rules: quoted, never re-judged.
- **V14 §3.4 (a)'s "a host-placed site (its record's position) is never re-sited"** (V14:1416–1417) — kept (J-A.12).
- **V13 §3.8 (2)–(9)** — the cost surface, the Urquhart graph, the paths, the classes, the genesis lay and the lived
  network: no route is bent to a site, so no step of them changes; (5)'s trails still join every unjoined *seat* (a site
  is no longer one).
- **V13 §3.11.4 P4 (6)** — the charter's `roads` already gives a site frame its roads (V13:2070–2072); only the record's
  `toward` comment gains the approach road's rule (A-33).
- **V13 §3.11.6's canon, `routeFacts` and `patrolOffer`** — keyed by host edges; an approach road is none, so their text
  stands (only `routes(world)` and `mapFeed` name it, A-59, A-60).
- **V13 §3.14.3's eighteen drift rows** — the owner's (item 138 (c)); the approach roads join the consumer list instead
  (J-A.17).
- **V13 T-V13-12** ("four fixtures, one per anomaly kind") — its fixtures are the locked-term anomalies of P5's
  orientation table; the two site kinds are T-V13-58's.
- **V13 §5.1's `anomalies` and `patrols` layers** — they draw the record kinds, the new anomaly kinds and the approach
  roads' cadence included; only the `routes` row names the approach roads (A-67).
- **BCR-V13-30** (charter highways and roads as forced gate picks) — unchanged: an approach road never enters a
  settlement's frame (§1.4 (d) 2), and its class is `track` or `trail`.
- **V14 §2.5's seventeen purpose terms and weights** — they site a drop with no point; the expectation's rows of cost 5
  join that search as a filter (§1.4 (c)) without changing a weight.
- **V14 G5 (e)'s enclosure and its gates** — unchanged; G5 (f)'s new step joins the charter roads to them.
- **V14 E1 (4), E3, E4 (b)** — they read the charter's roads, the route layer and the patrol cadence, which now include
  the approach roads: no text changes (T-V14-35's crop clause tests it).
- **V14 §2.8's identity table** — the card's `roadAccess` is a declared field of the card (no entity); an approach road's
  identity is V13's (A-43).
- **Dated records that name `routed`** — V14's Revision 1 note (V14:11), J-V14.37 (V14:2991) and §12's CONFIRMED line
  "W7 reads `routed`" (V14:3113, what was confirmed at Revision 1) stay as history; J-V14.43 gains a dated note (A-26).
- **`research/sf/fp-realm-review.md`'s J-RR.21** — a research record, not a target of this lane; J-V13.110 (A-77)
  states how the design reads it.
- **The series' bookkeeping** — the revision notes under V13's and V14's titles, the INDEX state line, the file's
  number (draft t from 940, file s ending at 939) and the repository README's amendment row are the synthesis's and the
  apply step's (file s items 927, 936, 938's form), not a designer's.
- **SUMMARY:213's count** ("item 140: fourteen 'do not foreclose' checks") — it predates this design and does not match
  the gate's rows (K1–K13 and M1–M11 before this design's M12); this lane did not read the record the number came from,
  so it does not re-count it; observed here for the synthesis, not a question of J393.
- **V13 §12 and V14 §12 (CONFIRMED / PLAUSIBLE)** — the new values are stated PLAUSIBLE where they are shipped (V14
  §2.5's new paragraph, A-8); V13 §12's PLAUSIBLE paragraph already covers "the coherence weights and the lawful bound".

---

## Verification of this record

- Every quoted current text re-checked at 09:36 UTC against the targets at the md5s of §2 (`grep -F -c` = 1 for the
  one-line texts; an exact count = 1 for the sixteen multi-line ones), and the 96 fragments applied in order to copies of
  the seven targets (0 errors: each old once at its turn, each new once after). The build and render scripts and the
  after-copies are in the lane's scratchpad (`sites-roads/fragA/`); the fragments' JSON is beside this record.
- The partial's text is kept whole in `design-A.partial-fable.md` (md5 `89fe8df058970ac36f228d39f2114520`).
- No file outside `docs/validation/sites-roads-2026-10-18/` and the lane's scratchpad was edited; no git command was
  run; the host repository was not touched.
