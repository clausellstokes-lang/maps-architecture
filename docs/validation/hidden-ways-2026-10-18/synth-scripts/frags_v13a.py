# Items 955-959: V13 §1.3, §1b, §2.2, §2.3, §2.5-2.7, §3.0, §3.8 (13), §3.9, §3.14.3, §3.16, §3.17
V13 = 'docs/volumes/V13-world.md'
F = []
def frag(item, letter, file, line, old, new, locator, evidence):
    F.append(dict(item=item, letter=letter, file=file, line=line, old=old, new=new, locator=locator, evidence=evidence))

# ---------------------------------------------------------------- 955 the owner's rule and the word
frag(955,'a',V13,140,('B','B-1'), r"""> lowering danger" (§5.8) stands as written.
>
> **The host's request w — 2026-10-18** (`docs/host-requests/2026-10-18-hidden-ways.md`; the map's reply
> `docs/HOST-REPLY-HIDDEN-WAYS-2026-10-18.md`; file w, items 955–969; J407): the host's hidden ways are the map's **trods**
> (never *way*, the settlement frame's `WayClass`; never *hidden*, the host's grade of an overt road) — laid by W7 (13) after
> W7b through rough country, never across open plain, each joining two junctions on the overt network; the trod record as the
> simulator feed's third optional product; `routeFacts`' ordered stretches (the host's fallback); a trod `dmOnly` at birth,
> absent from every player surface until revealed through V14 §2.3's three states and the one admission function, known per
> settlement by the host's dated event; no patrol cadence on a trod; a decayed road never a trod and no trod born where a
> road dies. Changed: §1.3, §1b, §2.2 (`Trod`, `TrodJunction`, `WorldWhere`, `WorldEvent`), §2.3 (`world.trod`), §2.5, §2.6,
> §2.7, §3.0, §3.8 (13), §3.9 (14), (16), §3.11.6, §3.14.3, §3.16, §3.17, §5.1, §5.4, §5.8 (6), (7), §5.9 (the plague and
> patrols lenses' notes; D-V13.8), §6, §7 (T-V13-59, 60), §8.2, §8.5 H32, §9 J-V13.114 – 128, §11 Q2 and Q5.""",
 "Volume 13 — §1.3 the owner's-word blocks (insertion after file u's block)",
 "§1.3's blocks carry each file's word (V13:136–140); the reply file is written by this synthesis, so the citation is no longer to a file that does not exist (judge-1 B-e3, judge-3 E-B8). From: B-1, the lens, view-key and BCR mentions removed, the section list corrected.")

frag(955,'b',V13,374,('A','955 (a)'), r"""  a host-placed site is read and reported, never re-sited (V14 §3.4 (a)).
* **The owner's rule on the brigands' ways (2026-10-18; the host's request of that date; file w item 955).** "these are all brigands, they don't travel the overt roads... roads are used for military, caravans, and groups of people because they ease travel and logistics. These are public enemies to most and as such should have a different means of traveling, maybe hidden roads that connect between roads, and multiple of them." Obeyed by W7 (13)'s **trods** (V13 §3.8: the map's own hidden ways laid through every rough patch between junctions on the roads — one asked per `perRoughKm2` of rough country, at most `perPatchMax` per patch, none across open plain, each ending at a junction on a public route and never at a seat), the simulator feed's trod record (V13 §3.11.6: the host's bodies read them as geography; who knows a trod, who rides it and what happens on it are the host's, sent through the events window and its presentation messages), the trod's secret state (V13 §2.2: `dmOnly` until the DM or the host reveals it to the party) and the `trods` layer (V13 §5.1: drawn for a player only as revealed or discovered, the legend never counting them); a trod is never promoted to a route and no trod is born where a road dies.""",
 "Volume 13 — §1.3 The owner rules obeyed (insertion after the file-t bullet's last line)",
 "the owner's words verbatim where the volume lists the owner rules obeyed, as file t did for J393 (V13:370–376); the request quotes them (`docs/host-requests/2026-10-18-hidden-ways.md:4`). From: A 955 (a), the canon slot and the lens replaced by the product and the layer.")

frag(955,'c',V13,2592,('B','B-27'), r"""the water-passage class of a path (V13 §3.13's `routeClass`) is never sent
as a route's class; a hidden edge of the map's own geography is a **trod** (file w; never a *way*, the settlement frame's `WayClass`, nor a *path*, *track* or *trail*), its end a **junction** (on the world: a point on a route's polyline, as the approach road's), its width hint its **kind** — `goat`, `drove` or `broad`: the host's goat path and game trail, drover's way and old road in the map's words —; *hidden* is the host's grade of an overt road only: a trod is never graded and a hidden road never a trod.""",
 "Volume 13 — §3.11.6 the port's laws, (9) one word, one meaning (edit)",
 "law (9) (V13:2584–2593); `way` TAKEN (ARCHITECTURE.md:1093–1104; V13:762, 803; V14:424, 1799–1800), `hidden` TAKEN (V13:764, 788, 1815–1820; research/sf/fp-physical-integration.md:99, 159); `trod`, `goat`, `drove`, `broad` 0 whole-word hits in V13, V14, the host document and research/sf (`broad` once in the base as prose) [OBSERVED]. From: B-27, the kinds re-worded.")

frag(955,'d',V13,1174,('B','B-10'), r"""| `collisions` | monster threat · gate · toll · besieged · prosperity · temperament · alignment · way · hidden · trod (V13 §5.8 (6); file w: *way* is the settlement frame's `WayClass`, *trod* a hidden edge of the map's own, *hidden* the host's grade of an overt road only) | one word, one meaning |""",
 "Volume 13 — §2.3 `LensRule` default rows (the collisions) (edit)",
 "the collision rows (V13:1174) list neither *way* nor *hidden* [OBSERVED]. From: B-10, *trod* added to the row.")

frag(955,'e',V13,3317,('A','955 (ax)'), r"""the host's monster-threat word for a place and its colour are never the plague lens's; *hidden* is the host's road grade only (a lens is *still*, a site's or a trod's secret *DM-only*), a hidden way a *trod* (never a *way*, the settlement frame's), its end a *junction* (file w); *gate* is""",
 "Volume 13 — §5.8 (6) The legend's words (edit)",
 "§5.8 (6)'s collision prose (V13:3316–3318); the three senses of *hidden* in V13 (read-v13-lenses.md §1 (2)). From: A 955 (ax), *path* dropped (it is the base's `WayClass` value, already covered by *way*).")

# ---------------------------------------------------------------- 956 the records
frag(956,'a',V13,493,('B','B-2'), r"""V14's E1 (the world-map case reads the route at the point) | V13 §2.2 |
| `Trod` (a hidden edge of the map's own: two junction ends on the overt network, ordered stretches with the host's terrain class and integer effort, a kind word, the party's secret state; `TrodJunction` its typed end — file w, W7 (13)) | W7c after W7b, and after each `network` window on a host-bound world (V13 §3.8 (13)); never a host edge, never a `WorldRoute`; rebuilt on load, never stored | the port's `trods` (the simulator feed's trod record), `mapFeed` (by secret state), `placeOf` (the `trod` and `junction` places), the `trods` layer, the `events` layer's pins at a trod, V14's E1 (a revealed trod's band in a world crop); never `existingRoute`, W6b, siting, the coherence tests, W8b's patrols, border posts or continuity | V13 §2.2 |""",
 "Volume 13 — §1b.1 Records, fields and tables (insertion after the `WorldRoute` row)",
 "the wiring table lists every new record (V13:479–493). From: B-2, the lens replaced by the `events` layer's pins.")

frag(956,'b',V13,547,('A','955 (c)'), r"""→ `WorldCanon`, with the optional `routeFacts` (its ordered stretches among its fields, file w), `patrolOffer` and `trods` (the trod record, V13 §3.8 (13); file w);""",
 "Volume 13 — §1b.2 Stage outputs and interfaces (the `WorldPort` row) (edit)",
 "the port's wiring row (V13:547) names the optional products. From: A 955 (c), the fourth slot replaced by the third product.")

frag(956,'c',V13,601,('B','B-3'), r"""| `WorldRoute` | by class or the host's grade (a hidden host road a DM-only ghost) | none (a route takes its ends' names) | GeoJSON LineString, the ecosystem-shaped JSON's routes, CSV | entities block |
| `Trod` (file w; W7 (13)) | the `trods` layer (a toggle, default off) by its secret state: for the DM every trod with V14 §5.1's state cue, for a player only a revealed or discovered one (V13 §5.1) | none for a party; the DM's hover caption (its kind and length) | GeoJSON LineString (`kind: 'trod'`) and CSV under the export's admission (a party export carries none its places do not admit); never `ecosystemJson` (the schema has no row) | rebuilt on load by W7c, never persisted; its secret state in the entities block when not `dmOnly` (V13 §2.7) |""",
 "Volume 13 — §1b.4 Entity kinds (insertion after the `WorldRoute` row)",
 "every entity kind is rendered, labelled, exported and persisted by a row of §1b.4 (V13:592–601). From: B-3, the `showTrods` ghost replaced by the layer toggle (C §1.5; judge-2 graft 7).")

frag(956,'d',V13,712,('C','F4'), r"""  routes: Map<number /* fine cell */, Id[]> /* the route ids crossing a cell (W7); sparse */;
  trods: Map<number /* fine cell */, Id[]> /* the trod ids crossing a cell (W7 (13); file w); sparse; read by W7 (13)'s own lay, `worldFactsAt` and V14's E1 — never by the charter or `existingRoute`, which read `routes` */;""",
 "Volume 13 — §2.2 the world's layers (insertion after the `routes` map)",
 "the sparse `routes` layer (V13:712); the charter reads `routes` at the ring (V13:1793) and `existingRoute` the public routes (V13:1763). From: C F4 (A 955 (e) the same).")

frag(956,'e',V13,841,('B','B-4'), r"""— read by the charter's `roads`, W8b (14)'s patrol source, the clerk and the view
interface Trod {                             // W7 (13); file w: a hidden edge of the map's own geography — never a WorldRoute, never a host edge (J-V13.115)
  id: Id; a: Id; b: Id /* its two ends: TrodJunction ids — each a point on a public land route's polyline, shared with another trod where two meet; never a seat id, never a host key */;
  kind: 'goat'|'drove'|'broad' /* the width/kind hint: world.trod's kind rows (V13 §2.3), the first the laid path's ground matches — goat: single file (the host's goat path and game trail), drove: beasts driven abreast (its drover's way), broad: cart-wide (its old road); the host derives its size band from the word, the row's widthM and the stretches' classes — the map records no band */;
  polyline: WorldPointCm[]; stations: Int32Array /* per vertex: cumulative effort-metres from `a` under the cost law's time terms */; vertexClass: Uint8Array /* per segment: the host's terrain class through the adapter folder's class table */;
  lengthM: number; effortM: number /* integers */; roughShare: number /* the share of its length in rough country (world.trod's rough rows), 0–1: the clerk's */; layVersion: number /* bumped by every re-lay; the former course kept as a version */;
  seedCell: number /* the fine cell of its first-laid course's midpoint vertex: its identity (V13 §2.5), which no re-join moves */; landmass: number;
  secret: SecretState /* V14 §2.3's three states, the record's only map-owned knowledge: dmOnly at birth; revealed by the DM's setAttr on trod/secret/state or the host's reveal through the party's places (the trod's id a place's address there); discovered by the host's event or the DM's mark. A settlement's knowledge of a trod is never on the record and never changes this state: it is the host's dated event (V13 §3.8 (13)) */;
  reason: Id /* computed on demand (whyTrod, V13 §4.7) from its patch's record, never stored: a generated trod is rebuilt on load (V13 §2.7) */ }
interface TrodJunction { id: Id; at: WorldPointCm /* a point on the route's polyline */; route: { id: Id; hostKey?: string /* bound: the host's edge key */; stationM: number /* integer effort-metres from the route's `a` */ };
  arms: { trod: Id; stationM: number /* integer effort-metres from the trod's `a`: 0 or its effortM at an end, between at a crossing */ }[] /* sorted by trod id */;
  kind: 'end'|'crossing' /* end: a trod's end on the route; crossing: a public route chartered later across a trod's course (W7 (13) (g)) */;
  nearSeat?: { placement: Id; hostKey?: string } /* the placed settlement whose frame's margin ring lies within world.trod's lay.gateBandM: "at its town gate" for placeOf and the hearing card, with no seat end and no frame point (door 1) */ }   // the hearing card's `junction` place (WorldWhere); nothing sight-related is on it""",
 "Volume 13 — §2.2 New records (insertion after `SiteApproach`, before the port's records)",
 "the records of §2.2 (V13:667, 841); the approach road's `join` is the junction model (V13:786, 1850); V14 §2.3's `SecretState` (V14:763–766) reused verbatim; the request's third endpoint kind, a settlement's gate (`docs/host-requests/2026-10-18-hidden-ways.md:24`), met by `nearSeat` without a seat end (C §1.1; judges 1–3). From: B-4 with the kinds `goat`|`drove`|`broad`, `seedCell` (C F14 adapted by judge-1 graft 1) and `nearSeat` (C's `TrodEnd.nearSeat`).")

frag(956,'f',V13,835,('C','F6'), r"""at?: WorldPointCm /* absent exactly when `pair` is given and no point: placed by `borderSegment` at its week, the placement recorded in its reason — or when `where` names a trod or a junction (file w): placed at fold at the trod's midpoint vertex or the junction's point, likewise recorded; drawn for an audience that does not know the trod only at the seat territory's seat with the country's words (V13 §5.1) */;""",
 "Volume 13 — §2.2 `WorldEvent.at` (edit)",
 "V13:835's invariant ('absent exactly when `pair` is given') would break for a knowledge or hearing event whose `where` is a trod (judge-2 graft 2); the draw rule for an audience that does not know the trod (judge-3 S2, tightened: a junction is itself the ambush point). From: C F6, the draw clause added.")

frag(956,'g',V13,837,('B','B-7'), r"""cause?: string /* the host's cause word — a patron fall's, a trod's learning's (how a settlement came to know a trod, V13 §3.8 (13)) — by the adapter folder's vocabulary table, when sent */""",
 "Volume 13 — §2.2 `WorldEvent.cause` (edit)",
 "the host's how-word on its knowledge event (`docs/host-requests/2026-10-18-hidden-ways.md:33`) rides the field V13 already reserves for the host's cause word (V13:837): one field, one meaning. From: B-7 unchanged.")

frag(956,'h',V13,887,('B','B-5'), r"""interface WorldWhere { kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'|'trod'|'junction' /* trod: a point along a trod (`trod` with `fraction`); junction: a trod's junction (`junction`) — W7 (13); `placeOf` names either for the DM and, for an audience that does not know the trod, only the country it crosses (file w) */; seat?: string; edge?: string; trod?: Id; junction?: Id;""",
 "Volume 13 — §2.2 `WorldWhere` (edit)",
 "the hearing card's where (`docs/host-requests/2026-10-18-hidden-ways.md:19, 28`); `WorldWhere` has no trod or junction kind today (V13:887). From: B-5 unchanged.")

frag(956,'i',V13,958,('A','955 (n)'), r"""the road to a DM-only site DM-only (J393), a trod (W7 (13); file w) `secret` at birth — its `SecretState` V14 §2.3's, `dmOnly` by default, the party's `places` the same key, so a party view neither draws, lists, counts, names nor exports a trod no reveal admits, and a settlement's knowledge of one is the host's dated event, never the record's; V14's""",
 "Volume 13 — §2.2 Knowledge on world facts (edit)",
 "the knowledge paragraph (V13:957–964): one admission function (ARCHITECTURE.md:15744, read as generic — a trod's id a place's address in the party's `places`; no base change). From: A 955 (n), the host's event clause added.")

# ---------------------------------------------------------------- 957 the rule table
frag(957,'a',V13,1010,('B','B-11'), r"""exitRunM: number /* a placed frame's road run through the margin to its gate station */ }   // world.routeLay — the map's own network formation (W7); never the host's, never a time
interface TrodRule {                                                                                           // world.trod — W7 (13); the map's own lay rules (file w), never the host's, never a time
  rough: { landUse: string[] /* the land uses that are rough country */; reliefM: number /* local relief over reliefWindowM that makes any ground rough (hills) */; reliefWindowM: number; patchMinKm2: number /* a rough patch below it lays no trod */ };
  density: { perRoughKm2: number /* one trod asked per this much rough country at the province rung's cell, scaled by (fineCellM ÷ 250)² at a coarser rung */; perPatchMax: number; junctionSpacingM: number /* candidate junctions along one route no closer than this */ };
  lay: { coverFactor: number; openFactor: number /* choice terms on the step cost: a rough cell × coverFactor, an open cell × openFactor — never in a time */; maxCostFactor: number /* the trod's own search ellipse and drop rule, tighter than world.routeLay's */; openShareMax: number /* a trod over more open ground than this share is dropped: none across open plain */; roadNearM: number; roadHugShareMax: number /* a trod within roadNearM of a public route over more than this share shadows the road and is dropped */; minStraightM: number; maxStraightM: number; rejoinM: number /* a moved junction re-joins within this */; gateBandM: number /* a junction within this of a placed frame's margin ring carries nearSeat */ };
  kinds: { kind: 'goat'|'drove'|'broad'; widthM: number /* integer metres: the host derives its band from it */; slopeP95Min?: number; slopeP95Max?: number; landUse?: string[]; minLengthM?: number }[] /* the first matching row names the kind; the last row has no test */ }""",
 "Volume 13 — §2.3 New rule tables (insertion after `RouteLayRule`)",
 "the rule tables of §2.3 (V13:966–1010); the owner's density rule as parameters (`docs/host-requests/2026-10-18-hidden-ways.md:29`); `lay.maxCostFactor` of its own (judge-2/3 E-B2) and `gateBandM` (C's). From: B-11 with the two cells added and the kinds re-worded.")

frag(957,'b',V13,1137,('B','B-12'), r"""| `exitRunM` | 400 (a placed frame's road runs through the margin this far to its gate station) |

| `TrodRule` (`world.trod`: the map's own; the owner's density rule — several per rough country, none across open plain — as parameters the host can read; every cell own, PLAUSIBLE until the B-WORLD sweep measures the counts; file w) | default |
|---|---|
| `rough.landUse` / `reliefM` / `reliefWindowM` / `patchMinKm2` | forest, wetland, alpine, scrub / 120 m over 2 000 m (hills: open ground is rough where the land rises or falls 120 m within 2 km) / 2 000 / 4 km² |
| `density.perRoughKm2` / `perPatchMax` / `junctionSpacingM` | 32 km² (a province whose rough country is two fifths of its 64 000 km² asks at most ≈ 800 trods, fewer under `perPatchMax` and the drops; the continent's coarser cell at most ≈ 7 200 in all) / 12 / 3 000 |
| `lay.coverFactor` / `openFactor` / `maxCostFactor` / `openShareMax` / `roadNearM` / `roadHugShareMax` / `minStraightM` / `maxStraightM` / `rejoinM` / `gateBandM` | 0.5 / 4 / 3 (a trod's ellipse a quarter of a route's at `routeLay`'s 6; a path over 3 × the straight cost is dropped) / 0.2 (a trod over more than a fifth of open ground is dropped) / 500 / 0.3 / 2 000 / 40 000 / 2 × the fine cell / 1 000 |
| `kinds` (first match) | `goat`: slope p95 ≥ 18 % or land use alpine, width 1 m (single file: the host's goat path and game trail) · `broad`: slope p95 < 8 %, land use forest or scrub, length ≥ 8 000 m, width 5 m (cart-wide: the host's old road — a way of the map's own geography, never a decayed host road) · `drove`: slope p95 < 8 %, land use grass, scrub or tundra, width 3 m (the host's drover's way) · else `goat`, width 1 m (the last row has no test) |""",
 "Volume 13 — §2.3 the default tables (insertion after the `routeLay` table's last row)",
 "every cell own, PLAUSIBLE until measured (V13:968–972); the landUse words are V13's biome rows (V13:996); the counts stated as upper figures under `perPatchMax` (judge-2 B-e6); the ellipse arithmetic A §0 Q7. From: B-12 with `maxCostFactor`, `gateBandM` and the three kinds.")

frag(957,'c',V13,1163,('B','B-8'), r"""track −1 (hidden: none; a trod: none, V13 §3.8 (13))""",
 "Volume 13 — §2.3 `PolityRule` default rows (the patrol row) (edit)",
 "patrols option B (J-V13.120); J396 keeps patrols map-only (`docs/PROGRESS.md:455`; file u item 949). From: B-8 unchanged.")

# ---------------------------------------------------------------- 958 identity, lifecycle, digest, storage
frag(958,'a',V13,1260,('B','B-13'), r"""| an approach road (a `WorldRoute` of origin `approach`, V13 §3.8 (12)) | the world root | (`route`, the site placement's lineage, `approach`) — so a re-lay keeps its id and a moved site keeps its road's address |
| a trod (`Trod`, V13 §3.8 (13); file w) | the world root | (`trod`, the landmass, its `seedCell` — the fine cell of its first-laid course's midpoint vertex) — independent of its junctions, so a bypass or re-lay that moves a junction keeps the id and the host's knowledge rows never orphan |
| a trod junction (`TrodJunction`) | the world root | (`junction`, the joined route's lineage, its fine cell) — a re-lay of the route that keeps the cell keeps the junction; one that moves it re-joins within `rejoinM` keeping the id by the anchor below (V13 §3.8 (13) (g)) |""",
 "Volume 13 — §2.5 Identity (insertion after the approach road's row)",
 "identity by creation key (V13:1255–1260); a junction must survive a re-lay of the road it sits on (read-v14-base.md §5.4 (2)); identity independent of the junctions (C F14; judges 1 and 2). From: B-13, the trod's key replaced by the seed cell.")

frag(958,'b',V13,1276,('A','955 (u)'), r"""an approach road by its site; a trod by overlap ≥ 50 % of its course within one fine cell's width, a junction by its trod and which end it is; a sway by its seat.""",
 "Volume 13 — §2.5 Identity (the anchors sentence) (edit)",
 "§6.3's anchor carry-over (V13:1274–1277); a junction 'keeping the id' when its fine cell moves needs the anchor (judge-3 E-B6, graft 11). From: A 955 (u) unchanged.")

frag(958,'c',V13,1306,('B','B-14'), r"""**veil:** its `knownTo` its site card's — a DM-only site's road DM-only |
| a trod (`Trod`; W7 (13); file w) | W7c after W7b, and after each `network` window | the `trods` raster layer, the port's `trods` and `mapFeed`, `placeOf`, the `trods` view layer, the `events` layer's pins, V14's E1; never `existingRoute`, W6b, siting, the coherence tests, W8b's patrols, border posts or continuity | never persisted: rebuilt on load by W7c replayed over the routes' lay versions in order; its `secret` state in the entities block when not `dmOnly` | re-laid only by the closure W7 (13) (g) names (its route re-laid or removed, a route chartered across or along it, a frame or a reach cutting its patch), the former course a lay version; tombstoned `W_TROD_UNJOINED`, or by a road along its course | a host input is never a user's undo target; the DM's `setAttr` on its secret state goes with its edit | absent: W7c at load; **import:** none on an imported legacy world until its genesis; **dark-after-lit:** the host's reader absent reads its prior bytes; **death:** a dead seat moves no trod; **veil:** `dmOnly` at birth — absent from every party surface, never greyed; a settlement's knowledge the host's dated event |""",
 "Volume 13 — §2.6 The lifecycle (insertion after the approach road's row)",
 "the lifecycle table of §2.6 (V13:1279–1306); the approach road's row is the precedent. From: B-14, the view key removed, the rebuild stated as a replay of the lay versions.")

frag(958,'d',V13,1334,('B','B-15'), r"""equal rasters hash alike), the surfaces, reaches, watersheds, routes, territories, W6's proposals, placements, the trods' secret states (the generated trods themselves rebuilt on load, outside every digest, V13 §3.8 (13); file w) and""",
 "Volume 13 — §2.7 The model digest (edit)",
 "the model digest's leaves (V13:1332–1335); the secret states are the only persisted trod facts. From: B-15 unchanged.")

frag(958,'e',V13,1362,('B','B-16'), r"""`watershed`, the distance fields) are dropped from the file and rebuilt on load inside V13 §6's load budget. **The trods are never written to the file** (file w; J-V13.123): W7 (13) is deterministic and drawless, so every generated trod is rebuilt on load by the same rule replayed over the routes' lay versions inside the same budget (`WORLD-18`) and its reason computed on demand as a cell's; only a trod's secret state that is not `dmOnly` is a record (≈ 20 B), so 200–2 000 trods at the province rung add ≤ 40 KB at rest and ≈ 0.07–0.7 MB in memory, and the continent's at most ≈ 7 200 (the density rule's cell scaling, V13 §2.3) ≈ 2.5 MB in memory inside `WORLD-5`.""",
 "Volume 13 — §2.7 Storage (the fallback) (edit)",
 "the size arithmetic (B §1.11; read-v13-routes.md §8) against V13:1359–1362; the host's Q7 (`docs/host-requests/2026-10-18-hidden-ways.md:44`); 2 000 stored trods would take ≈ 93 % of the province's 0.75 MB headroom. From: B-16, the replay said.")

# ---------------------------------------------------------------- 959 the generation step
frag(959,'a',V13,1445,('B','B-17'), r"""| W7b Routes | `W7b` | the final seats (proposals, placements, host seats), the site placements with road access and their cards' kind rows (W7 (12); J393), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s (the approach roads among them), the `routes` layer | none | the world root | F-WORLD (no path) | " |
| W7c Trods | `W7c` | the public land routes in force (W7b's; the network at the week), the placed frames' extents and margins, `landUse`, `dem`, the surfaces, the cost law, `world.trod` | `Trod`s, `TrodJunction`s, the `trods` raster layer | none (`world.trod` reserved; the tie-breaks deterministic, V13 §3.8 (13)) | the world root | F-WORLD (sparse trods) | " |""",
 "Volume 13 — §3.0 the stage table (insertion after W7b)",
 "the stage table (V13:1410–1446): a stage row per step; W7c after W7b, before W8a. From: B-17, the failure rung named.")

frag(959,'b',V13,1875,('B','B-18'), r"""13. **Trods (file w: the host's hidden-ways request of 2026-10-18; the owner's rule that its brigands "don't travel the
   overt roads … hidden roads that connect between roads, and multiple of them").** Run after (12) on both worlds, and on
   a host-bound world after the genesis and after each `network` window; `world.trod` is a reserved id (V13 §3.17): the
   step draws nothing. (a) **Rough country:** over the coarse grid a cell is rough when its majority `landUse` is in
   `rough.landUse` or its local relief (max − min `dem` within `reliefWindowM`) ≥ `reliefM`; the 8-connected rough
   components of area ≥ `patchMinKm2` are the **patches**, each keyed by its lowest cell index, each with one
   `ReasonRecord`; every other land cell is open plain. (b) **Touch points:** for every public land route in force at
   the week (any class; a road the host grades hidden is no public road; never a water leg, an approach road or a trod)
   every polyline vertex inside a patch or within `roadNearM` of it is a candidate junction site, thinned along each
   route to one per `junctionSpacingM` (the lowest station in each window), keyed (route lineage, station).
   (c) **Candidates:** per patch the Urquhart graph of its touch points (the kernel's deterministic triangulation over
   integer metres, as (3)); an edge is a candidate when its straight length lies in [`minStraightM`, `maxStraightM`] and
   its two points are on different routes, or on one route at least 3 × `junctionSpacingM` apart by station; ranked by
   straight length ascending, ties by the sorted junction keys; the patch **asks** min(`perPatchMax`, ⌈patch km² ÷
   `perRoughKm2` × (250 ÷ fineCellM)²⌉) trods and takes the candidates in rank order until that many are laid or the
   candidates are spent. (d) **The lay:** one A\* as (4)'s (the lifted bucket queue, integer costs, the straight
   heuristic, the ellipse at the trod's own `lay.maxCostFactor`, ties by (f, cell index)) over (2)'s cost surface under
   the cost law's time terms, with the lay factors as choice terms — a rough cell × `coverFactor`, an open cell ×
   `openFactor` —; impassable: water, every cell carrying a public route or a trod save the two end cells and junction
   cells, every placed frame's extent + margin; the polyline the cell-centre path simplified at `routeToleranceM`, never
   leaving land; dropped and counted in the patch's reason: a cost > `lay.maxCostFactor` × the straight cost, an
   open-ground share > `openShareMax` (none across open plain), a share of cells within `roadNearM` of a public route >
   `roadHugShareMax`; a patch that lays fewer trods than it asked is reported once, `W_TROD_SPARSE` (the patch, the
   trods asked and laid) — never a trod across open plain to make the count. (e) **Fields and kind:** `lengthM`,
   `effortM`, `stations`, `vertexClass` and `roughShare` evaluated on the final polyline, order-free, under the host's
   law as (7); the kind the first `kinds` row the path satisfies (slope p95 along the polyline, the dominant land use by
   length, the length); `seedCell` the fine cell of the course's midpoint vertex (its identity, V13 §2.5); each end's
   junction the route's polyline point nearest the path's end cell — a junction already within half a fine cell is
   shared (its `arms` gain the trod), else one is written (`kind: 'end'`), carrying `nearSeat` where it lies within
   `gateBandM` of a placed settlement frame's margin ring (the host's "at its town gate", with no seat end and no frame
   point); the trod's cells enter the **`trods` raster layer** (`Map<fine cell, Id[]>`, beside `routes` and never in
   it). (f) **Reasons:** the patch's record names its rough rule, its touch points, its candidates and the drops; a
   trod's reason (its pair rule, its kind row, the three largest cost contributions) is computed on demand by `whyTrod`
   from that record, as a cell's is (J-V13.49) — never stored. (g) **After birth, incremental:** a later run re-lays
   only a trod whose junction's route is re-laid or removed (a host `bypass` or `retract`, a standalone edit) — its
   junction re-joins the new lay's nearest polyline point within `rejoinM`, keeping both ids (the trod's by its seed
   cell, the junction's by V13 §2.5's anchor), else the trod is tombstoned and reported `W_TROD_UNJOINED`; a trod whose
   cells a public route chartered later crosses — the course byte-identical, a `TrodJunction` of kind `crossing` added
   where they meet, unless the route runs along the trod's course (≥ `roadHugShareMax` of its cells within `roadNearM`),
   when the trod is tombstoned: a road born supersedes a trod, never the reverse; a trod whose patch a placed frame's
   extent + margin or a moved reach now cuts — re-laid by the dry run's closure, the former course kept as a lay
   version. A demotion keeps the road's polyline ((9)), so a junction on a road graded hidden stays; the map never
   promotes a trod (no `network` change word names one, and a trod has no class to edit), mints no trod where a road
   dies (a road the host grades hidden is the host's own edge, the overgrown way its ledger describes, with its own key:
   two records would name one thing; and a trod's law is cover, not history), and turns no decayed road into a trod.
   Every other trod stays byte-identical, the lay over one patch is byte-identical whether the others are laid or not,
   and the dry run names the closure ((10)); on load the set is rebuilt by this step replayed over the routes' lay
   versions in order, byte-identical, its secret states re-attached by key (V13 §2.7). (h) **Work limit and cut:** W7c
   ≤ fine cells (the rough pass) + Σ over candidates of their ellipses' cells; a limit reached drops the remaining
   candidates in rank order (`W_TROD_CUT`, F-WORK's `work_cut`). **A trod to the host's bodies, no road to the map:**
   `existingRoute`, W6b's `connectivity`, V14's siting plug-ins, the site coherence tests, W8b (14)'s patrols (a trod
   carries no cadence and has no `patrolOffer` row), W8b (16)'s border posts and W8b (9)'s continuity never read a trod;
   it enters no charter's `roads` and crosses no frame. **Knowledge:** a trod is `dmOnly` at birth — absent from every
   party surface until the DM reveals it (`setAttr` on its secret state) or the host does through the party's places
   (V14 §2.3; the three states the record's only map-owned knowledge); a settlement's knowledge of a trod is the
   host's — a dated `WorldEvent` of the events window whose `where` is the trod, whose `seats` name the knowing seat and
   whose `cause` is the host's how-word, with its resolved audience, retracted by the windowed replace — drawn by the
   `events` layer as the knowing seat's pin where the trod draws for the audience (V13 §5.1), and never a change of
   the trod's secret state. The map draws and never decides; no knowledge enters any simulator product. **Edges:** a
   landmass with no public land route lays no trod; a patch touched by one route with fewer than two spaced touch
   points lays none; a standalone world with no seat lays none.

*Output:* `WorldRoute`s (the approach roads among them), the `route` layer, the `Trod`s and `TrodJunction`s with the `trods` raster layer (W7 (13)); each site placement's approach is the derived `SiteApproach` read over them (V13 §2.2).""",
 "Volume 13 — §3.8 W7 (insertion of item (13) after (12)'s last line, before the *Output* line, which gains the trods)",
 "W7's items (V13:1754–1877): (12) ends at V13:1873, the *Output* line is V13:1875; the step follows the approach road's form (V13:1831–1873); the owner's rule (`docs/host-requests/2026-10-18-hidden-ways.md:4, 29`); J-V13.122 – J-V13.124. From: B-18 with `W_TROD_SPARSE` (A/C), `lay.maxCostFactor`, `seedCell`, `nearSeat`, the patch-isolation sentence (C (g)), the replay on load and the knowledge paragraph re-worded (no view key; the event never a writer of the secret state).")

frag(959,'c',V13,2065,('A','955 (ad)'), r"""a road the host grades hidden: none; a trod, W7 (13), is no segment and carries none, J396 — a watch the host asserts on a trod is a dated event the `events` layer draws, file w). Elsewhere""",
 "Volume 13 — §3.9 W8b (14) Patrols (edit)",
 "patrols option B (J-V13.120); W8b (14)'s cadence rule (V13:2063–2069). From: A 955 (ad), the lens replaced by the `events` layer.")

frag(959,'d',V13,2089,('A','955 (ae)'), r"""every route crossing (never a trod's, W7 (13); file w) of an allegiance border or a debatable band yields a""",
 "Volume 13 — §3.9 W8b (16) Border posts (edit)",
 "W8b (16) (V13:2089–2094): unguarded, a trod crossing a border would raise a border-post ghost pin (read-v13-lenses.md §2.3). From: A 955 (ae) unchanged.")

frag(959,'e',V13,2822,('A','955 (am)'), r"""W7 (12)'s approach roads that joined the route (J393), W7 (13)'s trods whose junction lies on it (file w) |""",
 "Volume 13 — §3.14.3 the drift rows (row 13, the consumers cell) (edit)",
 "cascade row 13 (V13:2822); B edits neither cell (judge-3 graft 10). From: A 955 (am) unchanged.")

frag(959,'f',V13,2822,('A','955 (an)'), r"""re-joins the nearest qualifying public route or its site's approach reads none (`noRoadAccess` where its road access is `required`); every trod whose junction lay on a removed or re-laid route re-joins the lay in force within `rejoinM` keeping its id, else is tombstoned `W_TROD_UNJOINED`, its secret state kept where it survives (W7 (13) (g)) |""",
 "Volume 13 — §3.14.3 the drift rows (row 13, the test cell) (edit)",
 "cascade row 13's test cell (V13:2822). From: A 955 (an), `edgeBandM` replaced by B's `rejoinM`.")

frag(959,'g',V13,2914,('A','955 (ao)'), r"""**seat:** a W8a seed on water or ice; **sparse trods:** W7c lays fewer trods in a rough patch than its density row asks, every further candidate dropped for cost, open ground or road-hugging (W7 (13)) |""",
 "Volume 13 — §3.16 F-WORLD (the detection cell) (edit)",
 "F-WORLD's ladder (V13:2912–2914); B edits no F-WORLD line (judge-3 graft 10). From: A 955 (ao), the country replaced by B's patch.")

frag(959,'h',V13,2914,('A','955 (ap)'), r"""seat: the seed moved to its nearest land cell (`W_POLITY_SEAT_MOVED`); sparse trods: the patch keeps what was laid, reported once `W_TROD_SPARSE` — never a trod across open plain to make the count |""",
 "Volume 13 — §3.16 F-WORLD (the ladder cell) (edit)",
 "F-WORLD's ladder cell (V13:2914). From: A 955 (ap), the country replaced by the patch.")

frag(959,'i',V13,2914,('A','955 (aq)'), r"""T-V13-14 (siting none, no path, seat), T-V13-59 (sparse trods) over the corpus of V13 §7 |""",
 "Volume 13 — §3.16 F-WORLD (the test cell) (edit)",
 "F-WORLD's test cell (V13:2914). From: A 955 (aq) unchanged.")

frag(959,'j',V13,2929,('B','B-28'), r"""(reserved: siting draws nothing, its tie-break deterministic, V13 §3.7 (6); SW-03), `world.trod` (reserved: W7 (13) draws nothing, its tie-breaks by cell index and lineage key; file w),""",
 "Volume 13 — §3.17 Determinism (the concerns) (edit)",
 "the determinism concern list (V13:2928–2931); W7c draws nothing. From: B-28 unchanged.")

frag(959,'k',V13,2944,('B','B-29'), r"""W7a, W7b ≤ Σ over edges of the search ellipse's cells; W7c ≤ fine cells (the rough pass) + Σ over candidate trods of their ellipses' cells at `world.trod`'s `maxCostFactor`; W8a ≤""",
 "Volume 13 — §3.17 Determinism (the work limits) (edit)",
 "the work limits (V13:2942–2948); the law of the §6 row (962 (a)). From: B-29, the rough pass over fine cells (A's law) in place of 2 × coarse cells.")

frag(959,'l',V13,2947,('B','B-30'), r"""W7 drops the remaining lowest-rank edges (W7c the remaining candidates in rank order, `W_TROD_CUT`), W8 stops""",
 "Volume 13 — §3.17 Determinism (the cut) (edit)",
 "F-WORK's cut per stage (V13:2946–2948). From: B-30 unchanged.")
