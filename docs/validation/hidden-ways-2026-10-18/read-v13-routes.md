# THE HIDDEN WAYS: what V13 already says about routes (reader record, read-v13-routes, 2026-10-18)

Lane `hidden-ways/read-v13-routes` (Opus, high effort) of workflow `hidden-ways-design` (J407). It answers the host's request
`docs/host-requests/2026-10-18-hidden-ways.md` (HR below) from V13's side only, as V13 stands on 2026-10-18. It reads
and decides nothing, and applies nothing. Every claim has a line and a tag: **[STATED]** means the text says it, **[OBSERVED]** means
this reader checked it in the repository (a count, a grep, a sum), and **[INFERRED]** means this reader's own reading. "V13:n" is
`docs/volumes/V13-world.md` line n. "HRQ:n" is `docs/HOST-REQUIREMENTS-2026-10-18.md`. "FPI:n" is
`research/sf/fp-physical-integration.md`. "BASE:n" is `docs/ARCHITECTURE.md`. Host facts come only from HRQ and FPI
(Fable-retrovalidated at J392), and this record copies no host code. This is a validation record, not implementer input.
Host document names stay in the evidence.

---

## 1 The seven questions: what V13 already answers

### Q1. Can a route end at a junction that is not a settlement?

- **A host route cannot.** V13:1827–1828 says: "**Legs end at settlements.** On a host-bound world every host route ends at
  two host settlements; a site, a proposal or a junction is a position along a route, never an end of a host route (the
  map's own approach road, (12), ends at it)". [STATED]
- **The map's own road can, at one end.** The approach road (J393) is the only record that ends at a junction today:
  "`WorldRoute { id; a; b /* its two ends: seat ids …; an approach road's (origin 'approach') `a` its site's placement and
  `b` the public route it joins */; join?: { route: Id; atCm: WorldPointCm } /* an approach road only: its junction — the
  joined route's polyline point it ends at */`" (V13:786). [STATED] W7 (12)(b) lays it "ending at the **junction** (the
  joined route's polyline point nearest the path's last cell)" (V13:1850). It is written "as a `WorldRoute` of origin
  `approach` (`a` the site's placement, `b` the joined route, `join` the junction …, no host key)" (V13:1851–1852). [STATED]
- **The junction model is already the host's "a point on a route stretch".** A junction is a `WorldPointCm` on the joined
  route's polyline (V13:786). The joined route stays byte-identical: when a site lies along a route, "**no route is written** —
  its polyline, stations, effort and lay version stay byte-identical" (V13:1844). [STATED] So a way that ends at junctions
  changes no host route's geometry, effort or number of legs. This is the guarantee V13:1828–1829 gives for sites. [INFERRED]
- **No record today has two junction ends.** `join` is singular, and the record allows it on "an approach road only" (V13:786).
  `a` and `b` are typed as seat ids, or as a placement plus a route for an approach road (V13:786). [STATED] A way between
  two routes, or from a route to another way's junction, needs a second junction field or a record of its own. This is
  new schema. [INFERRED]
- **A standalone world's trail already has a non-seat end, but the record does not type it.** W7 (5) says: "every seat still
  unjoined after the passes gets a `trail` to its nearest routed cell (one Dijkstra to the route set)" (V13:1792–1793).
  [STATED] That end is a routed cell, not a seat, yet `b` is typed "seat ids" and `join` is for "an approach road only"
  (V13:786). The trail's far end has no declared field. [INFERRED: a gap in the record, worth a line in the designers' items]
- **A settlement's gate as an endpoint touches door 1.** A placed frame's exits are W7's terminals: "a highway or road meets
  the town at its gate station after `exitRunM` through the margin" (V13:1829–1830). [STATED] An approach road never enters
  a settlement's frame: "every cell inside a placed settlement frame's extent + margin impassable (an approach road never
  enters a settlement's frame, so no settlement's charter changes for a site)" (V13:1848). [STATED] The canon's slots
  carry seat points, not gate stations (V13:848–849). [STATED] A way that "starts at a settlement's gate" (HR:24) can reach
  the host only as a world-scale point: the seat, or a junction outside the frame and its margin. A gate station is frame
  geometry, and door 1 keeps it out. [INFERRED]
- **Milestone.** W7 and its approaches are in M-W2: "W7 Routes … W7 (12)'s approaches to world sites" (V13:3814). [STATED]
  A two-junction way would therefore extend M-W2's W7, or come in a step after it. [INFERRED]

### Q2. Does the port already carry per-stretch ground classes?

- **The record half exists.** `WorldRoute` carries "`stations: Int32Array /* per vertex: cumulative land effort-metres under
  the cost law's time terms … */; vertexClass: Uint8Array /* per segment: the host's terrain class through the adapter
  folder's table */`" and "`byClassM: Record<string, number>`" (V13:790–791). [STATED] W7 (7) evaluates them on the final
  polyline: "`landEffortM` under the time terms, `lengthM`, the water metres by kind, `byClassM`, the crossings, the
  per-vertex `stations` and `vertexClass`" (V13:1800–1802, J-V13.73). [STATED] They came in with amendment item 689
  (`docs/AMENDMENTS-2026-10-17m.md:534`, `:543`). [OBSERVED]
- **The simulator feed sends only totals, not ordered stretches.** `routeFacts` gives, per host edge, "the host key, integer
  land effort-metres, the water metres by kind, the per-class effort, the crossings and the 52-week seasonal sets — never
  `costTotal`" (V13:2484–2485). [STATED] "Per-class effort" is a total for each class, not an ordered list of
  (station, class) runs. [INFERRED] `routes(world)` sends "every host route's polyline with its host key" (V13:2514) on the
  map feed, and the map feed "is never read by a step of its simulation" (V13:2438–2439). [STATED]
- **The host's ledger is behind V13.** Ledger row T2 still reads "`WorldRoute` carries polyline, `costTotal`, `landmass`,
  `reason` — no terrain-class breakdown per segment | MISSING" (FPI:394). HRQ:606 says the same ("no per-stretch
  breakdown"). Neither file names `vertexClass`, `byClassM` or "per-class effort". [OBSERVED: grep over `research/sf/` and HRQ
  returns nothing]
- **What "needs T2" means.** HR:6 and HR:31 say "your 'needs T2', ENC-HP-09". HRQ:625 reads: "It needs the per-stretch terrain
  classes the map does not return ("needs T2") … Ledger row T9, PARTLY". The ledger row is "T9 | terrain along an army's
  route | needs T2 | PARTLY" (FPI:401). "T2" there is **ledger row T2**, "Terrain class per route segment (for receipts)",
  eight classes {water, desert, grassland, forest, wetland, tundra, glacier, mountain} (FPI:58; FPI:394). [STATED] It is
  **not** V13's authoring tool T2 `ground`, the terrain-recipe editor (V13:573–576, V13:3030). HR names both "T2" and
  "needs T2" as if they were the map's word. They are the ledger's word. [INFERRED]
- **The answer.** B (the fallback) is mostly in hand. The record already holds per-segment classes in the host's vocabulary
  and per-vertex stations. The new work is a port addition: send `routeFacts` an ordered run list per host edge, as
  (from station, to station, class), so the host can see which stretches are cover. [INFERRED] The class vocabulary is
  already versioned in the canon envelope: "`vocabulary: { terrainClass: string; climateBand: string }`" (V13:846). [STATED]

### Q3. Does any class already mean "not for armies or caravans"? Is `trail` that?

- **No. `trail` is a rank rule, not an access rule.** The five steps are: "The first `classes.primaryShare` of land edges by the higher
  seat's rank are `highway`, the rest `road`; an edge both of whose seats are rank 0 is `track`; every seat still unjoined
  after the passes gets a `trail` to its nearest routed cell …; water legs are `sea` or `river`" (V13:1791–1793). The
  default row says the same: "the first 30 % of edges by seat rank are `highway`, the rest `road`; trails join every
  remaining seat" (V13:1134). [STATED] A trail is the link of last resort for a seat the passes left unjoined. It says nothing about who may
  use it. [INFERRED]
- **A trail is a public route.** An approach looks for "a public land route of any class … a route's class is highway > road >
  track > trail" (V13:1839–1840). [STATED] A border post can sit at a trail: "at a trail's crossing a watchpost"
  (V13:2090). [STATED] The charter maps it into the frame as a way: "trail → path" (V13:762). [STATED]
- **The six classes.** `'highway'|'road'|'track'|'trail'|'sea'|'river'` (V13:788). Their styles are "highway 2 px solid, road
  1.2 px, track 0.8 px dashed, trail 0.5 px dotted" (V13:3144). [STATED]
- **`hidden` exists in V13 already, as a host grade on an overt road.** It is not a class. "`grade?: string /* bound: the host's grade word,
  hidden among them */`" (V13:788). "a hidden land road is a DM-only ghost … a hidden road counts as no public road"
  (V13:1815–1820). The charter row has "`hidden?: boolean /* a road the host grades hidden: no public road, drawn DM-only */`"
  (V13:764). Patrols: "a road the host grades hidden: none" (V13:2065), and `gradeShift` "highway +1, road 0, track −1 (hidden: none)"
  (V13:1163). [STATED] On the host's side the ledger gives the grade ladder as `highway|road|track|hidden` (FPI:98). Its
  lifecycle runs a "grade ladder down to `hidden`, never absence" (FPI:99). M4 reads "grade penalty on the `hidden` rung;
  'the dangerous goods take the overgrown road'" (FPI:159). [STATED]
- **So making `hidden` a seventh class, or `kind: 'hidden'` (HR:10, HR:24), would give one word two meanings.** It would
  name a demoted overt host edge, which V13 already draws as a DM-only ghost, and also a never-public way born in the map's
  geography. HR:35 itself keeps these apart: "a road that decays to 'overgrown' in the host's ledger does not become a way".
  [INFERRED; the designers must rule]

### Q4. Can the record carry a width or kind hint per way?

- **There is no width or kind field on a land route.** The only width-like facts on a route are the water limits:
  `routeFacts` "on request, a water edge's limits (the shallowest navigable depth and the narrowest width along it, and the
  quarters it freezes), offered for a lane capacity the host does not yet read" (V13:2485–2487). [STATED] The host's own
  capacity rows (C2, sea-lane capacity) are verdict MISSING on the map side (HRQ:609). [STATED]
- **The precedent for a "role" word is the approach road's class from its kind row.** An approach road takes "`class` the row's
  `roadClass`" (V13:1852). A site's road needs come from its card's `roadAccess` and its kind row's `approach.role`
  (V13:1837–1838). [STATED] A way's kind hint (HR:27) would be a new field or rule row. It would be the map's own word,
  registered in the adapter's vocabulary table the way terrain classes are (V13:846). [INFERRED]

### Q5. Who owns "known per town"?

- **V13's rule makes knowledge a host fact, carried with the host's resolved audience.** "**Host facts carry the host's
  resolved audience** (J-V13.77): a host fact the host resolves public is `public`; one it reserves for the DM is DM-only …
  a fact the host hides is never sent; a host fact arriving with no resolved audience is stored DM-only; `local` is admitted on a world only
  through the party's places" (V13:960–963). Every world entity carries `knownTo` (`'public'|'local'|'secret'`), and
  "this volume adds no fourth tier" (V13:957–960). [STATED]
- **The port's laws keep belief out of the canon.** "(3) truth only — no believed fact enters or leaves the canon, believed views
  riding the presentation inputs" (V13:2578–2579). The canon is "a pure function of the inputs its hashes name; no
  political, overlay, lived-route or belief input enters it" (V13:2451–2453). [STATED] So a per-town known flag cannot sit in
  a canon `ways` slot. It must come inbound, the host's preference (HR:42). [INFERRED]
- **Inbound precedents.** (a) The events window: "`events(world, window, events: WorldEvent[])` (the host's dated events
  with the host's resolved audience …)" (V13:2549–2550). `WorldEvent` needs `at` or `pair`, a `kind` in the host's word, a
  `radiusM`, a `week` and an `audience` (V13:834–839). Host track row H9: "the events window after every advance, undo and
  resume, committed facts only … with the resolved audience" (V13:3884). [STATED] (b) A per-edge host state row with a
  windowed replace already exists. The polity window's road watches are "`roadWatch: { edge: string; power: string; kind:
  'closed'|'warden'; since: Week }[]`" (V13:866), and "the fold adds, supersedes and retracts" (V13:2534). [STATED] Knowledge
  of a way is a state per (way, town), not a dated one-off. The roadWatch form fits it more closely than a `WorldEvent`.
  [INFERRED] (c) The party's knowledge comes in as a presentation input: "`audienceKnowledge(world, audience, week)` (optional: the
  political event ids an audience knows …)" (V13:2561–2562). [STATED]
- **The lens audience rule fails closed.** "covert links, columns and patrols fail closed — omitted, never greyed" (V13:3324–3325),
  and "the host's criminal channels and its criminal income never reach a player picture" (V13:3330–3331). [STATED]

### Q6. Which milestone carries A and C?

- W7 and the port's `routes`, `routeFacts`, `mapFeed` and `patrolOffer` are in **M-W2** (V13:3814). The canon's three slots
  ("the travel, water and sites slots") are in **M-W1** (V13:3813). The lenses are in **M-W5** (V13:3816). [STATED]
  A ways slot that needs W7's overt network cannot land in M-W1. A falls with M-W2, or a step after it. C (a reveal that
  reads a host knowledge window) needs the inbound window, so it sits with M-W2's windows or M-W5's lens step. [INFERRED]
- The host's track is numbered up to **H31**, not H30: "H31 | after M-W3, after H19 (optional; J393) | its map surfaces draw
  the map feed's approach roads" (V13:3906). The next host row is H32. [OBSERVED; the task brief said H1–H30]

### Q7. Does a province with 200–2 000 ways break the size budget?

See §8. In short: at the `province` rung 200 ways fit easily and 2 000 sit at the edge of the record headroom. At the same
density a `continent` breaks the 24 MB budget unless the ways are derived on load rather than stored. [INFERRED from
V13:1359–1360 and V13:1037–1039 arithmetic]

---

## 2 The route class model in full

| class | rank rule (V13:1791–1793) | public? | patrol shift (V13:1163) | into the frame (V13:762) |
|---|---|---|---|---|
| `highway` | the first `primaryShare` (0.3, V13:1134) of land edges by the higher seat's rank | yes | +1 | `through` |
| `road` | the rest of the ranked land edges | yes | 0 | `primary` |
| `track` | an edge both of whose seats are rank 0 | yes | −1 | `track` |
| `trail` | a seat still unjoined after the passes, to its nearest routed cell | yes (V13:1840) | not listed | `path` |
| `sea`, `river` | water legs | — | — | — |
| host grade `hidden` (a grade, not a class) | the host's demotion (V13:1813–1820) | **no**: "counts as no public road" | none | `hidden: true`, DM-only (V13:764) |

[STATED per cell. "not listed" is OBSERVED: the `gradeShift` cell at V13:1163 names only highway, road, track and hidden. J-V13.111 at
V13:4026 records "a trail cadence of its own (`gradeShift.trail`)" as the rejected alternative.]

On a host-bound world the classes are "mapped from the host's grade" (V13:788). Genesis lays "**exactly those edges** … with
the host's grades: no pair selection, no rank classes, no trails to host seats" (V13:1805–1806). [STATED] A trail is
therefore a standalone-world artefact. On a host-bound world the host's ladder decides the classes. [INFERRED]

## 3 The junction model and the approach-road precedent

- An approach road is "a road to the map's readers of roads, no road to its pricing and siting". It is read by `roadsAt`, the charters,
  the crop, the view, the exports and `derivedTime`, and never counted by `existingRoute`, W6b's `connectivity`, V14's
  siting plug-ins, the site coherence tests, W8b's patrols or W8b's continuity (V13:1864–1868, J-V13.113 at V13:4028). [STATED]
- It "carries no host key and is in no `canon` slot, `routeFacts` row, `patrolOffer` row or `routes(world)`'s host list: it
  is the map's own road, riding the DM's `mapFeed` keyless" (V13:1871–1873). [STATED]
- Its `knownTo` is its site card's: "the road to a DM-only site is DM-only, absent from every player picture" (V13:1869–1870).
  [STATED]
- It never discounts the cost surface: `existingRoute` applies "when `b` already carries a public route (never an approach
  road, (12))" (V13:1763). [STATED] If ways were put into the sparse `routes` layer (V13:712) without that exclusion, later
  public roads would ride them. [INFERRED]
- **What a hidden way would share with it, and where it would differ.** Shared: the map's own geometry, a junction on a public
  route, no host key, the dry-run naming and re-lay rules (V13:1858–1863). Different: (a) a hidden way must reach the
  host's **simulator** feed (HR:23–28: ground, step cost, junctions), where the approach road is barred from every
  simulator product; (b) it has two junction ends; (c) knowledge is per town, sent by the host, where the approach road
  takes one `knownTo` from a card. [INFERRED]

## 4 Lifecycle and detours (HR part D)

- The lived network is "mirrored, never computed": "only `chartered` lays new geometry …; a demotion keeps the polyline; a
  revival restores the hidden one; a `bypass` … re-lays the route round that radius under the cost law as a dated lay
  version under the same host key, the former lay kept and the hysteresis the host's" (V13:1811–1815). The host's change
  words are a closed list: "chartered, promoted, demoted, abandoned, revived, facet, bypass or retract" (V13:886).
  [STATED] No change word turns a road into a way or a way into a road. [OBSERVED]
- **Detours.** V13 already folds a host `bypass` (`avoids`, `radiusM`, V13:886) into a dated re-lay (V13:1813–1815).
  [STATED] HRQ:653 ("the map offers no detour either") and FPI:421 (R4 "not offered; polylines are fixed by W7 |
  MISSING") predate that fold. The host's side of R4 is still a STUB (FPI:100). [STATED; the staleness is OBSERVED]
- "a grade edit on a host route is refused (`refuse.world.hostRoute`)" (V13:1817). [STATED] The map never promotes on
  its own, which matches HR:35. [INFERRED]
- After birth "nothing moves a bound route silently". Every route outside an edit's transitive closure "stays
  byte-identical, and the dry run names the closure" (V13:1821–1826). [STATED] A way whose junction sits on a re-laid
  (bypassed) host route would have to re-join, as an approach road does when "its joined route is removed, or re-classed
  below its row's `minClass`" (V13:1860–1861). [STATED/INFERRED]

## 5 The canon record's shape, and where a ways layer fits

- `WorldCanon` = `envelope` + `travel` + `water` + `sites` (V13:845–848). The envelope's versions are "`geometry`, `costLaw`,
  `travelLaw`, `vocabulary: { terrainClass; climateBand }`, `water: Hash128`, `sites: Hash128`" (V13:846). [STATED]
- The canon's versions "are per slot …: a slot whose inputs did not change is byte-identical" (V13:1322–1326). [STATED]
  A `ways` slot would add a version entry and an input hash beside `water` and `sites`. [INFERRED]
- **The closest shape is the sites slot**: "`sites: { hostKey: string; ground: { at: WorldPointCm; terrainClass: string /* the
  adapter folder's class table */; stepCost: number /* integer, the host's cost units …*/ }[] }[]`" (V13:848). [STATED] A
  ways slot would hold, per way, an id, two junction ends (host edge key with an integer station or a {num, den} fraction,
  or a seat key), the ordered ground runs (terrain class, integer effort or step cost) and a kind word. All of these are
  integers, host keys, `WorldPointCm`s and words from closed tables, as the simulator feed requires: "admits integers with a stated
  unit, the host's closed vocabularies through the adapter folder's tables, host keys and `WorldPointCm`s — no float, no
  prose, no cache, no echo of a host fact, no raster index" (V13:2435–2437). [STATED/INFERRED]
- **Law (1) admits it, law (3) shapes it.** "the canon's slots are pure functions of the physical layers, the host's cost law and the
  member seats, and no lived host fact enters them" (V13:2576–2577). [STATED] A way generated from terrain and the genesis
  network is physical. Whether it may depend on the **lived** network (which the canon excludes, V13:2452–2453) is a
  question the designers must answer: junctions on genesis edges only, or re-junctioned at each re-canonize. [INFERRED]
- **The additive canon** changes "only the added seats' own rows, the crossings and costs of the seat territories W8a
  re-derives over the landmass they dirty, and the water slot's candidates" (V13:2459–2462). [STATED] A ways slot needs its
  own sentence there: does a founding re-junction ways, or leave them byte-identical? [INFERRED]
- **Door 1.** The owner answered on 2026-10-18 (file r item 926): "The world canon is outside J86's door 1, and door 1
  itself — the settlement frame's geometry — stays closed" (V13:4455–4459; the quoted words at V13:4458–4459). [STATED]
- **Hearing card places.** `WorldWhere.kind` is `'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'`,
  with `edge` and `fraction` (V13:887). It is rendered by `placeOf(world, where)` → "the hearing card's words" (V13:2518–2519).
  [STATED] There is no kind for a way or a junction. A way or junction place (HR:19, HR:28) adds a kind. [INFERRED]

## 6 Determinism and the generation step

- The world's streams are listed per concern, and siting is "reserved: siting draws nothing, its tie-break deterministic"
  (V13:2928–2929). [STATED] A W7c with no draw would follow that pattern: a reserved id, with tie-breaks by cell index and
  lineage key. [INFERRED]
- The work limit is "W7a, W7b ≤ Σ over edges of the search ellipse's cells" (V13:2944). A cut drops "the remaining lowest-rank
  edges" (V13:2947). [STATED] A W7c limit would sit beside it. [INFERRED]
- All searches are "the lifted bucket queue … with integer keys and cell-index tie-breaks, every Dijkstra and flood keyed on
  (cost × 1 000 rounded, cell index)" (V13:2938–2939). [STATED]
- Stage registration: "the `world` product registers W0–W9 (W6a, W7a, W6b, W7b among them)" (V13:244). The stage table's
  W7b row is at V13:1445, and W8a follows at V13:1446. [STATED/OBSERVED]
- The density inputs the owner's rule needs ("several per rough country (forest, hills, mountain, marsh), none across open
  plain", HR:29) are all W5 or W1 rasters: `biome`, `landUse`, `vegetation` (V13:707, V13:713) and `dem` for relief
  (V13:700). [STATED] The cost surface already prices biome and slope (V13:1760–1762). [STATED]

## 7 Word census ("one word, one meaning")

Counts are whole-word and case-insensitive, over V13 / V14 / the base (BASE = `docs/ARCHITECTURE.md`). [OBSERVED]

| word | V13 | V14 | base | what it already means |
|---|---|---|---|---|
| way | 35 | 40 | 1 371 | the base's settlement-frame skeleton: "### 2.4 Ways (the skeleton)", `type WayClass = 'through'|'primary'|…|'track'|'path'|'quay'|'pier'|'bridge'|'ford'|'aqueduct'` (BASE:1090, BASE:1093); in V13 the glyph mark `'way'` (V13:803, V13:1189, V13:2131) and the charter's `class: WayClass` (V13:762); in V14 "way bands", "way corridor", "quay way", "raised way" (OBSERVED in V14) — **taken** |
| ways | 11 | 11 | 201 | the same |
| trace | 51 | 18 | 435 | `TerrainTrace`, `SurfaceTrace` (V13:515, V13:832–833), `SwayTrace` (V13:883), `showTraces`, `deleteTrace` (V13:578) — **taken** |
| hidden | 39 | 15 | 160 | the host's grade on an overt road, DM-only ghost (V13:764, V13:788, V13:1815) — **taken for the grade** |
| ghost | 9 | 8 | 59 | the hidden road's style (V13:601), a submerged ruin (V13:1027), a placement preview (V13:2092) — taken |
| covert | 12 | 0 | 4 | `PolityLink.covert` (V13:875), a covert power's patrols (V13:2082) — taken |
| secret | 3 | 93 | 111 | `knownTo` tier (V13:957) — taken |
| junction | 15 | 17 | 136 | V13: the approach road's join point (V13:786, V13:1850); base: a street-network entity kind (BASE:633) — used at both scales already |
| byway / byways | 0 | 0 | 0 | free in the volumes and the base. **Caution:** the sites-roads design B proposed it as the approach road's name (`docs/validation/sites-roads-2026-10-18/design-B.md:129`, "a `WorldRoute` of origin `byway`"), and the judges cite it (`judge-1.md:108`, `judge-2.md:24`). In plain English it means a minor public road. [OBSERVED] |
| trod / trods | 0 | 0 | 0 | free in every file under `docs/` and `research/` except the lane log (grep). In dialect it means a foot-worn path, as in the "smugglers' trods" of the north of England. [OBSERVED count; the dialect sense INFERRED] |
| holloway, droveway, sidepath, bypath | 0 | 0 | 0 | free. "drove" occurs elsewhere in the repository (FMG notes, calibration). [OBSERVED] |

Also taken or ambiguous, per the brief and confirmed here: `path` and `track` (WayClass, BASE:1093; `track` is also a route
class, V13:788), `trail` (route class), `lane` (WayClass, and the host's "water lanes", V13:865), `ride` (V13:1163 "a garrison's ride";
V13:1786 "later roads ride earlier ones"), `cut` (F-WORK's `work_cut`, V13:2946), `pass` (a mountain pass, V13:2090).
`stretch` is ordinary prose (V13 3, base 295). V13 says **segment** for the per-segment class (V13:790) and for a patrol's
route segment (V13:2063). [OBSERVED]

## 8 Size arithmetic (§2.7's budget)

**What the budget says.** "a `continent` world ≤ 24 MB gzipped (9.2 M cells × ≈ 2.2 B gross across the rasters, plus ≤ 2 MB
of records), a `realm` ≤ 11 MB, a `province` ≤ 3 MB" (V13:1359–1360). The rungs are province 320 × 200 km at 250 m, realm
1 280 × 800 km at 500 m, continent 3 840 × 2 400 km at 1 000 m (V13:1037–1039). The record budget is "≤ 10⁵ records at the
continent rung, ≈ 120 B each gzipped, inside the 2 MB of records below" (V13:1352–1354). [STATED]

**An inconsistency in the text.** 10⁵ × 120 B = 12 MB, which is six times the 2 MB records block. At 120 B each, 2 MB
holds about 16 700 records. [OBSERVED arithmetic] The designers should size against 2 MB, not against 10⁵.

**Headroom per rung** (cells × 2.2 B, against `docMb`): [OBSERVED arithmetic]

| rung | fine cells | rasters | `docMb` | left for every record |
|---|---|---|---|---|
| province | 1 280 × 800 = 1 024 000 | 2.25 MB | 3 | **0.75 MB** |
| realm | 2 560 × 1 600 = 4 096 000 | 9.01 MB | 11 | 1.99 MB |
| continent | 3 840 × 2 400 = 9 216 000 | 20.28 MB | 24 | 3.72 MB (of which the stated records block is 2 MB) |

**One way, stored as a polyline.** These are assumptions, labelled as such [INFERRED]: a `WorldPointCm` pair delta-coded and gzipped at
about 4 B, a station at about 2 B and a class byte RLE'd, so about 6 B per vertex. A header (id, two junctions, kind, length, effort) of
about 80 B. A `ReasonRecord` at §2.7's 120 B. A vertex every 250–500 m after the `routeToleranceM` 60 m simplification
(V13:1135) at the province's 250 m cell:

| mean way length | vertices | bytes with a stored reason | bytes without |
|---|---|---|---|
| 5 km | 11–21 | 270–330 | 150–210 |
| 10 km | 21–41 | 330–450 | 210–330 |
| 20 km | 41–81 | 450–690 | 330–570 |

**Province, 200–2 000 ways at about 350 B each:** 200 ways come to 0.07 MB, which fits easily. 2 000 ways come to 0.70 MB, which is
about 93 % of the province's 0.75 MB left for all records. That is **at the limit**: without stored reasons (≈ 230 B)
2 000 ways come to 0.46 MB. [INFERRED]

**The same density on a continent.** The continent's area is 144 × a province's (9.216 M km² ÷ 64 000 km²). [OBSERVED]
At 200 per province area that is 28 800 ways, about 10 MB at 350 B, or about 4 MB at the continent's coarser 1 km cell
(about 11 vertices per 10 km, about 150 B). At 2 000 per province area it is 288 000 ways, about 42–100 MB. Both are far over the
1.7 MB the stated budget leaves beyond its records block, and 288 000 is past the 10⁵ record cap. [INFERRED]

**Ways that fit.** The budget holds if (a) the ways are **derived on load, not stored**. §2.7's own pre-decided fallback
already does this for "the recomputable rasters …: dropped from the file and rebuilt on load inside V13 §6's load budget"
(V13:1361–1362). A deterministic W7c with no draw over persisted rasters is just as recomputable. Only DM edits and the slot's
version would then be stored. Or (b) the ways' reasons are **computed on demand**, as a cell's is (`whyCell`,
V13:829–830, J-V13.49). Or (c) the ways are stored as fine-cell chain codes, at about 3 bits per step, so a 10 km way at 250 m
is about 20 B. [INFERRED]

**Time.** The W7 law is "≤ 8 ns × Σ ellipse cells over edges (an edge's ellipse ≈ 2.4 × the pair's straight cost² ÷ the cell
area at `maxCostFactor` 6 …)" (V13:3591). [STATED] A 10 km way at 250 m gives 2.4 × (10 000 m)² ÷ (250 m)² ≈ 3 840 cells, or about 31 µs. 2 000
such ways take about 61 ms. The province total is 730 ms against a re-declared 900 ms (V13:3594), so this fits. At the continent's 1 km cell a 10 km way is
about 240 cells, which is negligible per way. [OBSERVED arithmetic on the stated law] The canon's time budget is `WORLD-12`, "the `canon` at the continent rung ≤ 2 s"
(V13:3648). [STATED]

**Memory.** The sparse `routes` layer is `Map<fine cell, Id[]>` (V13:712). 2 000 ways × about 40 cells adds about 80 000 entries at the
province rung. [INFERRED]

## 9 Where each new piece would go (section and line, as V13 stands)

| piece | home | anchor line(s) |
|---|---|---|
| wiring row(s): the way record, its slot, its window | §1b.1 | after the `WorldRoute` row V13:493 |
| interface row(s) (the generator, the port's slot or rows) | §1b.2 | after the `WorldPort` row V13:547, or the `routes`/`roadsAt` rows V13:557 |
| entity row (rendered, labelled, exported, persisted) | §1b.4 | after the `WorldRoute` row V13:601 |
| the record(s) | §2.2 | after `WorldRoute` V13:786–793, or after `SiteApproach` V13:841 (before the port's records comment at V13:842) |
| the canon slot and its version | §2.2 `WorldCanon` | V13:846 (`versions`), V13:848 (slots) |
| a hearing-card place kind | §2.2 `WorldWhere` | V13:887 |
| knowledge (the inbound rows) | §2.2 `PolityFacts.roadWatch` (precedent) or a new window record | V13:866; the knowledge paragraph V13:957–964 |
| rule rows (density, kind words, step) | §2.3: a new interface after `RouteLayRule` V13:1009–1010; its default rows after the `routeLay` table's last row V13:1137 | V13:1131–1137 |
| patrol rows | §2.3 `patrol.gradeShift` | V13:1163 |
| lens or legend rows | §2.3 `LensRule` table | V13:1168–1176 |
| lifecycle rows | §2.6 | V13:1300 and V13:1305 (the `WorldRoute` rows) |
| version and digest sentence; size | §2.7 | V13:1322–1326 (per-slot versions); V13:1332–1335 (the model digest's leaves list "routes"); V13:1359–1362 (budget and fallback) |
| stage-table row W7c | §3.0 | after W7b V13:1445, before W8a V13:1446 |
| the generation step | §3.8 | a new item (13) after (12), which ends at V13:1873; *Output* and *Edges* at V13:1875–1877 updated |
| the cascade's stale paths | §3.14.3 | row 13 V13:2822 |
| the port | §3.11.6 | canon slots V13:2442–2454; the additive canon V13:2454–2483; `routeFacts` (B's ordered runs) V13:2484–2487; `mapFeed` V13:2501–2513; recorded inputs V13:2530–2554; the laws, (9) one word V13:2584–2592 |
| determinism | §3.17 | concern list V13:2928–2931; work limits V13:2944–2948 |
| failure ladder | §3.16 | F-WORLD rows from V13:2910 |
| edit (DM's own way, standalone) | §4.1, §1b.3 | §1b.3 `setAttr` row V13:579 |
| view layer and style | §5.1 | the `routes` row V13:3144, the `patrols` row V13:3148 |
| audience | §5.8 (7) | V13:3323–3331 |
| budgets | §6 | the W7 row V13:3591; the register's next id `WORLD-18`, after `WORLD-17` at V13:3656 |
| tests | §7.3 | after T-V13-58 V13:3720; next id **T-V13-59** (highest in the file is 58) [OBSERVED] |
| report codes | §7.5 | after `W_SITE_NO_ROAD_ACCESS` V13:3766 |
| milestone | §8.2 | the M-W2 row V13:3814 (or a new row) |
| host track | §8.5 | next **H32** (H31 is the last, V13:3906) [OBSERVED] |
| decisions | §9 | next **J-V13.114** (J-V13.113 at V13:4028 is the last) [OBSERVED] |
| base change requests | §10 | next **BCR-V13-41** (BCR-V13-40 at V13:4391–4400; §10.2 begins V13:4402) [OBSERVED] |
| owner questions | §11 | next **Q5** (Q1–Q4 at V13:4423–4462) [OBSERVED] |

## 10 Things noticed in passing (for the critic and the verifier)

1. The ledger rows T2 (FPI:394) and R4 (FPI:421), and HRQ:606 and HRQ:653, are behind V13: `vertexClass`/`byClassM`
   (V13:790–791) and the `bypass` fold (V13:1813–1815) exist. [OBSERVED]
2. The record budget's figures conflict: 10⁵ × 120 B is 12 MB, against "inside the 2 MB" (V13:1352–1354). [OBSERVED]
3. A standalone trail's far end (V13:1792) has no typed field in `WorldRoute` (V13:786). [INFERRED]
4. The host's grade word `hidden` is already V13's DM-only ghost on overt roads (V13:764, V13:1815). The host's own ledger
   ties it to "the overgrown road" (FPI:159), while HR:35 separates the two. [STATED/INFERRED]
5. "province" is two words in V13: a size rung (V13:673, V13:1037) and a standalone world's subdivision (V13:797,
   V13:1165). HR:44's "a province carries … 200–2,000 ways" does not say which it means. [OBSERVED/INFERRED]
6. The brief's "H1–H30" is now H1–H31 (V13:3906). [OBSERVED]

## 11 What the designers must decide (from this reading)

1. **The word.** "way" is taken (BASE:1093, V13:762, V13:803) and "trace" is taken (V13:832–833, V13:883). Free in the volumes
   and the base: "trod", "byway", "holloway", "sidepath", "bypath" (§7). "byway" carries the sites-roads design's rejected
   meaning (an approach road) and the plain-English sense of a minor public road. "trod" is free everywhere it was checked.
2. **The class word.** `hidden` is already the host grade on an overt road (a DM-only ghost, no patrol). The way's class or
   kind needs its own word, or a ruling that the two are one thing. HR:35 says they are not.
3. **Record form.** A `WorldRoute` of a new origin, extending the approach-road precedent (V13:786, V13:789) with a second
   junction, or a record of its own beside it. Either way, the standalone trail's untyped far end (V13:1792) is worth fixing in the same item.
4. **Endpoints.** Junction (route plus `atCm`, or a host edge key with an integer station or fraction), seat, or another way's
   junction. A "settlement's gate" must become a world point outside the frame and its margin (V13:1848, door 1).
5. **Genesis edges or the lived network.** Do junctions sit on the genesis network only (canon law (1), V13:2576–2577), or
   re-join at each re-canonize after bypasses and demotions (V13:1813–1815, V13:1860–1861)? And what does the additive canon
   do to the slot (V13:2459–2462)?
6. **The canon or the optional products.** A `ways` slot in `WorldCanon` (V13:846–848, versioned per slot, V13:1322–1326), or an
   optional simulator product beside `routeFacts` and `patrolOffer`, read behind the host's switch (V13:2484–2491).
7. **B's shape.** The ordered (station, station, class) runs per host edge in `routeFacts`. The record already has
   `stations` and `vertexClass` (V13:790), so this is a port change, not a generator change.
8. **Knowledge.** Inbound as a dated `WorldEvent` (H9, V13:834–839), or as a per-(way, town) windowed-replace row like
   `roadWatch` (V13:866). It must never go into the canon (V13:2578–2579). The party's reveal goes through the presentation inputs
   (V13:2561–2562) or V14's party list. The legend must not count unknown ways: `draw.markersPerView` counts the rest in the
   legend (V13:1176), and that habit must not carry over.
9. **Density rule and its parameters.** From W5 and W1 rasters (biome, landUse, vegetation, dem). Reserve a concern id with no
   draw (as siting does, V13:2928–2929), and set a work limit beside W7's (V13:2944).
10. **Storage.** Derived on load (the V13:1361–1362 fallback pattern) or stored, and stored reasons or `whyCell`-style ones. At
    continent density, storing breaks the 24 MB budget (§8). Also correct the 10⁵-records versus 2 MB conflict (V13:1352–1354).
11. **Patrols and pricing.** Is a way a patrol segment (`gradeShift`, V13:1163), and is it excluded from `existingRoute`
    (V13:1763) and `connectivity`, as the approach road is (V13:1864–1868)?
12. **Hearing-card place.** A new `WorldWhere.kind` for a way or a junction (V13:887), rendered by `placeOf`.
13. **Milestone.** M-W2 for A, since it needs W7's network (V13:3814). C with M-W2's windows or M-W5's lens step (V13:3816).
    The host row is H32.
14. **"province".** Which meaning HR:44 intends: the size rung or a subdivision. This decides whether the continent case
    (§8) is the binding one.
