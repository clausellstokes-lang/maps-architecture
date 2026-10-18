# sites-roads/read-research — what the research notes and the host say about sites and roads (J393)

**Lane:** `sites-roads/read-research` (opus; J390, Fable-checked). A reader: this file records what the texts say,
with cites; it judges nothing. Tags: **[READ]** the cited text says it; **[INFERRED]** this reader's inference from
the cited text(s), with the reasoning given. Line numbers are those of the file at the md5 below, read 2026-10-18
from ~05:12Z. Host repository read-only at revision 81f1cd96.

**Session reading used as context:** `docs/validation/sites-roads-2026-10-18/README.md` (29 lines, md5
`eabd68cd5eec8bb1a35539c4a08e1bfd`). This reader states no reading of the owner's words (a reader judges nothing);
see §Z for points where the texts bear on the README's reading.

## Files read (whole unless stated)

| file | lines | md5 | scope read |
|---|---|---|---|
| `research/sites/survey.md` | 919 | `38d2bf654796b3b25f3e99c7deaa1664` | whole |
| `research/fmg/FMG-survey.md` | 394 | `834e166ec6ca099e926b162ae8825610` | whole |
| `research/fmg/notes/fmg-human-layers.md` | 354 | `66ca39ceab75ac7240091327548d0ff6` | whole |
| `research/fmg/notes/fmg-physical-pipeline.md` | 300 | `1e7341bfd3b97eb4a29518013bba55d1` | whole |
| `research/sf/fp-physical-integration.md` | 493 | `48252479047cfcd15e0fae89f8a9a1fe` | whole |
| `research/sf/fp-realm-review.md` | 870 | `2f62d9b4e517f8855d95e4c0a90d73bc` | whole |
| `research/sf/lens-implications.md` | 613 | `95957c0d74da9b405b974d189c3999f9` | whole |
| `research/sf/trade-system.md` | 1307 | `94d85edd98a74d4b906d9ba8ac0b45ac` | §9 and §10.3 (as the task names) |
| `research/sf/population-system.md` | 1091 | `6c51fbb91a40090fa1015b2bb747216f` | §9.1 (as the task names) |

(Host files are listed in §H with their line counts and md5s.)

## A. `research/sites/survey.md` (md5 38d2bf65…, 919 lines; read whole)

A1 [READ] The survey is of dungeon/site/battle-map generators and techniques; it contains no treatment of roads,
routes, road access or a site's placement on a world map. The words "road" and "route" occur only once each in a
non-road sense ("flanking route existence", tactical metric, L658; "two routes with different obstacles", Unexplored
cycle types, L554). (`research/sites/survey.md`:554, 658; grep over the whole file.)
A2 [READ] "No surveyed generator takes *where it is* as input; the admissibility table (item 134(a)) and the
encounter extent table (item 132(d)) are therefore without precedent and must be designed, not copied. The nearest
analogue is Unexplored's early-set 'biomes' … context facts set early, consulted by every later resolution."
(`research/sites/survey.md`:771-774; summary at :71-73 "context as an input (urban/underground/hinterland/country
decides what a site may be)".)
A3 [READ] Entrances appear only inside a site's own topology: unit-graph roles "entrance, hub, chokepoint, loop, dead
end, secret, vertical link" (:567); the embedding's constraint layer includes "entrance side" (:618); "defensive
depth" = rings between entrance and core (:635); dungen.app's / Donjon's "peripheral egress" is a count of exits from
the map edge (:195-196, :251). No reference ties a site's entrance to an outside road. [READ; :195-251, :567, :618, :635]
A4 [INFERRED from A1-A3] The survey offers no precedent for road access of sites; the only bridge is "entrance side"
as an embedding constraint (:618), which a road-facing entrance could feed — this reader's inference, not the survey's.
A5 [READ] The survey's §6.2 "Context as an input" places the site's world context (urban/underground/hinterland/
country) as an early input; it names no road term among the context facts. (`research/sites/survey.md`:71-73, :771-774)

## B. `research/fmg/FMG-survey.md` (md5 834e166e…, 394 lines; read whole)

Note: this survey's host citations are at host HEAD `00b648c` (L5), not 81f1cd96; the host facts in §H below are
re-read at 81f1cd96.

B1 [READ] FMG's human-layer order is "suitability → placement → routes → everything that reads connectivity (burg
population, inns, brigands, disease zones, journeys all read routes)", stated as "the ordering constraint worth
preserving verbatim". (`research/fmg/FMG-survey.md`:117)
B2 [READ] FMG burg population includes a "connectivity rate (0.8 + 0.2 per road/sea link + 0.1 per trail)"; burg
groups include "fort, monastery, caravanserai, trading post, village, hamlet, town" evaluated by rules. (:124)
B3 [READ] FMG routes: "per landmass the capitals' Delaunay reduced to an Urquhart graph for main roads, all burgs for
trails, ports per water body for sea routes (sea built first); land cost = squared distance × habitability modifier ×
height modifier × 0.5 if already a connection × 3 unless the target holds a burg"; stored cell chains. (:127; matrix
row :260 "KEEP … the engine routes polylines and the host keeps selection; the cost law to match is the host's
`spatialCost.js`")
B4 [READ] Only burgs are route endpoints in FMG's network (capitals for roads, all burgs for trails, ports for sea
routes); markers are not route endpoints. Markers are "37 types with candidate predicates (mostly geographic: height,
river, coast, routes)" — i.e. markers *read* routes as a predicate. (:127, :136; matrix :274 "GENERALIZE predicates …
political/economic ones must read host data; criteria 'can change between versions' so version them")
B5 [READ] Zones are grown "from FMG's own campaigns, religions, volcano markers and routes"; "'grow N cells from a seed
along routes/rivers/coast' is a rendering helper". (:137, :275)
B6 [READ] FMG journeys: "land legs try the route network then A* over cells with terrain cost and road discount …
off-road halves speed"; stated contract: "land legs across landmasses are refused 'rather than silently routed through
the sea'"; the survey recommends "refusal rather than silent fallback" as the engine's path-query contract. (:135, :273)
B7 [READ] The Watabou handoff carries `hub` (crossroads) and village tags "highway/dead end/isolated" computed from
routes: "Everything except the institution booleans is computed from geography and routes". (:139)
B8 [READ] Model-drift list: "#13 Route removal/edit does not re-route journeys or trade"; "#16 Burg relocation does not
re-route roads". (:179, :182)
B9 [READ] FMG 2017 rule "remove implausible settlements and leave the island uninhabited" to guarantee trade
reachability → REJECT: "PLAT should record unreachability (no port, no sea lane) as a property of the settlement and let
the host decide, which matches the host's existing 'genesis is sacred' rule". (:262)
B10 [READ] (host @00b648c, as reported by the survey) `computeRoadNetwork` is "an A* over `pack.cells` with
biome/elevation/river/corridor-reuse costs, sea bias 1.15, 25,000-iteration cap, batch-order dependent"; `placeSettlement`
"does not add a burg". (:210)
B11 [READ] (host, as reported) "`routeNetworkGenesis` derives a birth road network from frozen `tradeRouteAccess`
grades, k-NN pairs, port pairs and an Urquhart pass, purely and without RNG, but 'unmounted'"; road-edge selection
"(Prim MST + Urquhart, computed host-side but routed in the iframe and never persisted)"; mode speeds "foot 150, cart
110, river 280, coastal 450, sea 900 km/week". (:212)
B12 [READ] (host, as reported) "`config.terrainType` is minted in `resolveConfig` from the trade route (port→coastal,
river→riverside, crossroads/road→plains, isolated→forest, mountain pass→mountain, desert road→desert)"; genesis is
"sacred": "generation-time `tradeRouteAccess` is frozen truth … divergence … is surfaced honestly rather than reconciled
by mutation". (:214)
B13 [READ] "the canonical cost law to match is the host's `spatialCost.js`, not FMG's". (:216)
B14 [READ] Import mapping: `pack.routes`/`pack.cells.routes` → "routes graph … group → edge class"; `pack.markers` →
DIRECT. (:321-322)
B15 [READ] FMG markers and zones are not tied to roads as endpoints; nothing in the survey describes FMG moving a
marker or burg to a road or a road to a marker. [READ by absence over the whole file; the only relocation is Risk mode's
"relocates burgs by nearest land", :161, :168]
B16 [INFERRED from B3, B4] In FMG the "road access" of a non-burg place is incidental (a marker predicate may require a
route nearby); there is no per-kind access rule.

## C. `research/fmg/notes/fmg-human-layers.md` (md5 66ca39ce…, 354 lines; read whole)

C1 [READ] Pipeline order (human slice): `burgs` (30) → `states` (31) → `routes` (32) → `religions` (33, reads routes for
passage cost) → `burgsSpecify` (34, reads "routes connectivity") → … → `markers` (45, reads routes) → `zones` (46,
reads routes) → `journeys` (48, reads routes). Routes read "burgs (capital/port/feature/xy)" and write `pack.routes`
(roads/trails/searoutes) and `cells.routes`. (`research/fmg/notes/fmg-human-layers.md`:25-46)
C2 [READ] FMG burg groups include non-town site-like kinds: "fort (citadel without walls/plaza/port, ≤ 1), monastery
(temple without walls/plaza/port, ≤ 0.8), caravanserai (plaza, no port, ≤ 0.8, desert/savanna biomes), trading_post
(plaza, ≤ 0.8, forest/tundra/wetland biomes)"; these are burgs, hence trail endpoints. (:125; preview: "fort,
monastery, caravanserai and trading_post have no preview", :248)
C3 [READ] Routes (3.6): main roads = per-landmass capitals' Delaunay → Urquhart; trails = "the same per landmass over
*all* burgs"; sea routes = per water body Urquhart over ports; "sea, roads, trails" computation order. (:159-162)
C4 [READ] Land cost: "water cells and zero-habitability biomes are impassable; cost = squared distance × habitability
modifier (1 + max(100 − habitability, 0)/1000) × height modifier (1 + max(h − 25, 25)/25 …) × 0.5 if the step is
already a connection × 3 unless the target holds a burg" ("burg cells one third"). (:164)
C5 [READ] Paths are "smoothed by pulling non-burg vertices … toward the chord midpoint" — burg vertices are pinned.
Route names use group suffix pools (road/route/way/highway; trail/path/track/pass; route/lane/passage/water way). (:168)
C6 [READ] "Depended on by: burg population (connectivity), religions (passage cost), markers (inns at crossroads,
brigands on roads, pirates/sea monsters on sea routes, lighthouses), zones (disease spread, avalanche), journeys, trade
animation. Helpers `isCrossroad` (> 3 links or > 2 road links) and `getConnectivityRate` feed the Watabou handoff."
(:170)
C7 [READ] Markers (3.14): "37 marker types … candidates are drawn at random and a cell is used once; a marker on a
burg cell takes the burg's position". Road-reading predicates: "inns at populated crossroads; lighthouses on harbour > 6
cells next to a routed water cell; … sea monsters on routed ocean cells; … brigands on road cells; pirates on routed
water; … circuses on routed cultured land"; "dungeons at pop < 3 with a Watabou One-Page-Dungeon iframe seeded by map
seed + cell id". (:221)
C8 [READ] Markers are placed after routes and are never route endpoints; no marker generates or attracts a road.
[READ by the pipeline order :43 and the routes inputs :33 "burgs (capital/port/feature/xy)"]
C9 [READ] Zones: "diseases spread from a burg along routes (cost 5 on a route, 100 off, budget 20-40)"; "avalanches on
routed cells h ≥ 70". (:225)
C10 [READ] Journeys: land legs "first try a BFS over the existing route network (rejecting sea links), else A* over
cells with cost = distance × terrain … × 0.5 on routes (or ×5 when avoiding roads)"; "off-road halves speed". (:217)
C11 [READ] Village handoff tag: one of "`highway` (connectivity > 1) / `dead end` (= 1) / `isolated`". City handoff:
`hub` = "1 when the cell is a crossroads (> 3 route links or > 2 road links)". (:288, :265)
C12 [READ] Recommendation [INFERRED in source]: "Preserve FMG's ordering constraint: suitability → placement → routes →
everything that reads connectivity. In SettlementForge, routes must exist before the host computes anything
connectivity-dependent." (:333)
C13 [READ] Determinism: routes re-seed a local Alea from the map seed (`routes-generator.ts:222`); markers consume the
global PRNG ("candidates are drawn at random"). (:229, :221)
C14 [READ] Regenerate of burgs "re-runs ports, specify and routes" (:129); no step re-routes when a single burg moves
(cf. B8). FMG's stated route limitations: "no river-aware `Routes.connect`" (:236).

## D. `research/fmg/notes/fmg-physical-pipeline.md` (md5 1e7341bf…, 300 lines; read whole)

D1 [READ] The note covers the physical steps only (grid → … → ice); routes, burgs and markers are human-layer steps
"…(human layers)…" not treated here. (`research/fmg/notes/fmg-physical-pipeline.md`:15, 32-56)
D2 [READ] Heightmap-editor Risk mode "forces any grid cell holding a burg to h ≥ 20 before re-markup" — FMG's only
physical correction driven by a placed burg (terrain yields to the burg, not the burg to the terrain). (:197)
D3 [READ] "Distance scale and distance unit only affect display and routing distances". (:203)
D4 [READ] The note's "Boundary conditions the world should hand to a settlement frame" lists datum/edge elevations, sea
sides, river entry/exit, off-map drainage, rainfall/evaporation, water table, biome/distance fields — no road or route
entry/exit is listed. (:272-279)
D5 [INFERRED from D1, D4] This note gives no evidence about roads at sites; its relevance is the frame boundary-condition
pattern (rivers cross the frame edge with a crossing point and direction), which a road crossing could mirror — this
reader's inference only.

## E. `research/sf/fp-physical-integration.md` (md5 48252479…, 493 lines; read whole)

Status line of the note: "PENDING FABLE REVIEW … to be retrovalidated overall" (L3). Host at `81f1cd96` (L5).

E1 [READ] The host has no "site" concept at realm scale in this note's ledger: the only site-like rows are the
satellite/founding-site ground (T5: satellites "sample spatial rasters READ-ONLY at a seeded draw inside the orbit
annulus; they never join the frozen spatial digest") and the town-scale "watchtower on the height … an OUTLYING siting
ring (MF §161c), not a viewshed" (L1). The V13 charter is listed with a `sites[]` field (§8 opening). (`research/sf/
fp-physical-integration.md`:61, 137, 371)
E2 [READ] Every mover reads "one distance law, `hopWeeks`/`calibration` over the frozen `spatialDigest`" (L13); the
sim's routes are settlement-to-settlement (D1 "Settlement-to-settlement least-cost path cost over land … all-pairs
matrix for reachable pairs"; D10 neighbour tiers "by gates crossed"). (:13, :36, :45)
E3 [READ] R1: routed road polylines are "LIVE-MAP computed in the iframe (`computeRoadNetwork`), held in component
state, never persisted"; planned: "consume routed polylines and the genesis network from the port … `WorldRoute.polyline`
(V13 §2.2)". (:97)
E4 [READ] R2: the genesis route network has "edges `{a, b, grade: highway|road|track|hidden, mode: land|water}`; grade
from genesis access (major→highway, standard→road, seasonal→track, isolated→none); k-NN pairs + port pairs + user routes +
an Urquhart pass; ids `route.<a>.<b>.<mode>`"; "pure, law version 1, 'unmounted'"; planned "mounted at world birth …
(OD-FC-18)"; laws "Law 2 'GENESIS IS SACRED'; Law 6 ports totality". (:98)
E5 [READ] R3: route charter/decay/hidden: "corridor demand in three flow classes; cost = 'travel-cost raster × distance ×
terrain …'; danger-adjusted by BELIEVED danger; grade ladder down to `hidden`, never absence"; "17 modules built, DARK
(`routeLifecycleEnabled: false`)". (:99)
E6 [READ] R4: bypass geometry: waypoints "are geometry, never new graph nodes; the frozen digest is untouched"; "a worn
bypass persists after danger clears"; STUB; "would need route geometry the port returns (R1)". (:100)
E7 [READ] R5: user-created routes — "the engine paths via the spatial travel-cost raster", provenance `user`,
lifecycle-immune; `roads/userRoutes.js`. (:101)
E8 [READ] R6: route explanation receipts "per primary hop: segments, terrain classes, overlays applied"; "'why this
road?'". (:102)
E9 [READ] R7: carrier-specific route choice: "M1 embattlement re-score of k candidates at dispatch + `knownWorld`'s
believed danger"; "never re-pathfind per tick". (:103)
E10 [READ] R8/R9: the town map's arterial seeds and road entry points/bearings at the frame edge — STUB in the host;
planned source the charter's `roads[] { side, atCm, bearingCdeg, class, toward }` (V13 §2.2 item 6). D14: "a bearing per
campaign neighbour, from the frozen digest's territory adjacency/gates"; owner §164a "(a) SPATIALLY ALIGNED WITH THE
REALM … never a decorative direction; (b) ONLY WHEN CONNECTED IN A CAMPAIGN, NEVER BEFORE". (:104-105, :49)
E11 [READ] A2 gates: "a route from A to C crossing B's territory makes B a gate"; "per-gate policy: toll, prohibit,
confiscate"; "'Geography becomes political: hold the pass, hold the trade'". (:112)
E12 [READ] A4 isolation: "isolation today = a user-chosen config string" (`tradeRouteAccess: isolated`), "not a
detection"; PHASE55 §4e "an EMERGENT property of the cost field". (:114)
E13 [READ] A6 embattlement: "a region's embattled level IS its routes' danger term". (:116)
E14 [READ] D8 / I21 (owner amendment M, 2026-08-01): "THE ROAD IS A REAL LOCATION, NOT A GAP BETWEEN TWO PLACES";
"no path may teleport a named person between settlements". (:43, :325)
E15 [READ] I9 (owner round 16): "FROZEN GEOMETRY: elevation, terrain, permanent water, base road geometry, fixed
crossings, distance. LIVE OVERLAYS: road damage, occupation, weather, embattlement, blockade, border closure, magical
access, temporary bridges, seasonal passability." (:313)
E16 [READ] I5 (owner 2026-07-11): imported maps: "the spatial cost-field derives from the USER-DRAWN overlay/annotations
(roads, biomes, terrain the DM paints) … The DM authors the geography; the sim respects it deterministically." (:309)
E17 [READ] I17: "THE DIGEST STAYS FROZEN: the network is a SIDECAR LEDGER … route lifecycle NEVER mutates territory,
membership, or positions." (:321) I18 (owner): "Isolation remains a possible fate … that is character, not failure."
(:322)
E18 [READ] I15 (owner directive 3 / J-D3): "USER ROUTES — … the path reacts to map geography"; "the engine paths via the
spatial travel-cost raster". (:319)
E19 [READ] I16 (directive 4 / J-D4): satellites "never join the frozen spatial digest". (:320)
E20 [READ] I34 (MF §15.2): "REGIONAL ROUTES BEFORE NUCLEI … terrain → REGIONAL ROUTE SKELETON (… the landed
route-network ledger's arterial seeds …) → founding nuclei"; "The crossroads exists before the crossroads town". MF law:
"Sites are FOUND, not placed — a suitability field (flat enough, dry enough, defensible, near water/road potential)".
(:338, :191, :194)
E21 [READ] §8 mapping: R1 SUPPLIED by `WorldRoute.polyline`; R2 PARTLY ("the host's grade ladder keys on
`tradeRouteAccess` and must map the classes; Law 2 … the world fits routes to it"); R3 PARTLY ("write-back not found");
R4 MISSING ("polylines are fixed by W7"); R7 MISSING; A2 MISSING (later bracket: "row A2 (gates) is answered by the
canon's crossings (J-RR.3)"); M4 `hidden` rung MISSING ("the world's classes end at `trail`"). (:418-428, :455, :468)
E22 [READ] Dated bracket (2026-10-17, amendments n): the host's territory "is now W8a, the seat territory — its total
nearest-seat partition with its crossings, built by the map into the canon's travel slot and adopted by the host's
receipted re-canonize". (:458-468)
E23 [READ] The V13 `WorldRoute` as read then: "`{ a, b, class: highway|road|track|trail|sea|river, polyline,
costTotal, landmass, reason }`" — endpoints a, b are seats. (:371)
E24 [INFERRED from E2, E4, E19, E23] In every host model this note records, route endpoints are settlements (seats);
nothing in the note models a non-settlement site as a route endpoint or as a node of the sim graph.

## F. `research/sf/fp-realm-review.md` (md5 2f62d9b4…, 870 lines; read whole)

Status: "PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat … to be retrovalidated" (L3). Its
rulings were carried by file m items 659–779 (L19-21); §5 is superseded by V13 §8.5 (dated bracket L622-637).

F1 [READ] RR-2 / J-RR.3: the canon has three slots — "a travel slot (the unbudgeted seat territory W8a under the host's
cost law …: seats, crossings with the host's receipt inputs, integer costs), a water slot (latent candidates, geography
only), a sites slot (frozen candidate ground per seat inside its orbit)". (`research/sf/fp-realm-review.md`:114-117, 527)
F2 [READ] J-RR.5: "every position a world point; site candidates and gate sides as points; legacy satellite cells
translated once through the import's export". H5: "a satellite's site gains a world point"; the host's cell-level
consumers incl. "orbit annulus" move to the canon's per-seat queries. (:529, :652)
F3 [READ] RR-12 / J-RR.15: "in bound mode every host route ends at two host settlements, so a site drop never splits a
leg". (:212-213, :544)
F4 [READ] RR-14 evidence: "every placement, cost-law change, cascade, site drop and regenerate re-derives W7 today
(V13:883,1682,1871,1890-1904; V14:2349)"; refinement J-RR.17 "nothing moves a bound route silently: W7 incremental (it
lays only edges a host change names)". (:226-233, :551)
F5 [READ] J-RR.16: in a bound world "bound W7 lays exactly those edges in host-key order with the host's grades, no pair
selection, no rank classes, no trails to host seats"; "the host owns the genesis network's topology and grades …, the
world owns its geometry". (:550)
F6 [READ] J-RR.18: "the route layer, the frame's road rows (`roadsAt(placement, week)`) and siting all read the network
at the week, hidden roads counting as no public road". (:552; RR-15 :240-241)
F7 [READ] J-RR.19: "grade edits on a host route refused; the DM charters through the host's own command …; isolation a
fate (no trails to host seats, a widening ladder, an unpathed edge drawn honestly)"; "a world-first settlement's access
word derived host-side from its charter". (:553; RR-17 :249-256)
F8 [READ] RR-24 / J-RR.25: "roads meet the world at the gates on every placed frame: highway and road charter crossings
forced gate picks …; every placed frame's exits W7's terminals; … `roadToNowhere` and `roadUnmatched` reported readings,
never annotations; the dossier's access word caps class and count; sea and river roads binding to the harbour and
landings". Evidence: "W7 seats a town at its centre; `roadToNowhere` is declared and never raised (V13:590,1315,1606;
ARCHITECTURE.md:6231-6236)". (:307-313, :569)
F9 [READ] RR-28 / J-RR.29: "Site adoption on a settlement-stamped placement is the DM's choice"; "V14 adopts on every
`placed` outcome (V14:1887-1898,2311-2318)"; "a free site is never inside a frame (J-V14.41)"; "automatic only on a world
stamp; on a settlement stamp the dry run lists covered sites with adopt / move the site (preselected) / cancel". (:334-337,
:573)
F10 [READ] J-RR.31: "on a dossier-bound frame the map never builds defences from a derived reading …; it may offer a
watchpost or bridge fort world site at an exit facing a standing debatable land". (:575)
F11 [READ] J-RR.9 (port consumption law): any answer the host consumes mid-campaign — "a founding's site, a
resettlement's charter, a re-derived border, patrol coverage" — "is requested between advances or at an advance head
against a named world state and baked with its stamp". (:533)
F12 [READ] RR-8 / J-RR.32 register words: "'road patrol', 'border post', lodgement, keyframe (never `contingent`,
*foothold*, *checkpoint* or a bare *gate*: landed host words)". Review row 24: "demand `gate` → `borderPost`, `gateKind` →
`postKind`, 'Gate sites' → 'Border posts' … (V14:938's `gate` row; the base's own S3 *gate sites* on the town wall …; no
hit for *border post* in either repository)". Row 34: "`checkpoint` → `barricade` at a border post …; `patrol` added to
`TransientItem`". (:170-173, :843, :853)
F13 [READ] RR-56 / J-RR.56: "transient border-post proposals"; "the territory and patrol layers as the first rows of
J379's lens mechanism". (:498-501, :615)
F14 [READ] RR-54 / J-RR.54 patrols: evidence "the owner's T3 ('also there should be patrols'); the host's interdiction
patrols, wardenship receipts, Law 5 hidden roads unwatched (`routeNetworkConsumersInterdiction.js:1-36`;
`commercialReceiptPools.js:206-211`)"; ruling "per (route segment, power) a cadence of a pass every 1, 4 or 13 weeks or
none — host-asserted coverage first (an interdiction every week while it stands; a warden at least monthly; a hidden road
none), else the round trip at the host's foot pace from the power's nearest garrisoned seat or fort over the segment,
moved one rung by neighbour hostility and the host's route grade; presence on a fixed phase …; drawn as tints with no
arrows; read by encounters as map-tier presentation, never a host encounter; offered to the host per host edge per power
as an extent, a basis and the nearest garrison's key — never a time". Review row 4: "`patrolOffer` sends the extent, the
basis and the nearest garrisoned seat's or site's key". (:485-491, :613, :823)
F15 [READ] J-RR.52: "a garrisoned site a held point except inside a seat's own cell or a placed frame's extent (an
occupation mark there)"; RR-49 evidence "V14's dangling `WorldSiteHost.strength` (V14:559,1021,1994)". (:611, :461-464)
F16 [READ] J-RR.44 / RR-43: `@plat/world/sight` consumers "site coverage, a patrol detection modifier, beacon graphs";
J-RR.54 "a fixed post's viewshed only a detection modifier". (:421, :598, :613)
F17 [READ] J-RR.48: the seat territory changes "only at a membership re-canonize (a placement, an unplacement, a future
graduation; never a death, a resettlement or a satellite)"; review row 33: "satellites leave the member list and the
ranking, staying claim points that project inside the parent's allegiance"; RR-17 evidence "satellites never join the
digest (J-D4)". (:607, :852, :252)
F18 [READ] J-RR.53: gate keeper "today the intermediary settlement whose territory the path crosses, Phase 5.5
§II.3-4-e"; the crossing holder enters the per-gate pipeline only by an owner-signed re-ruling. (:612; row 5 :824)
F19 [READ] Review row 26: "`WorldSiteHost.holder`'s DM entry is refused on a host-bound world, the polity facts
governing". (:845)
F20 [READ] §8: "the standalone travel law's speeds (cart 120, river 250, coastal 600, sea 900 km a week) and the toll
house's kind row" are PLAUSIBLE own values; row 51: "`tauMilDays.tollhouse` 0.3". (:746, :870)
F21 [READ] Q-RR-1 (J86 door 1 and the world canon): "Recommendation: confirm that the world canon is outside door 1 …;
the settlement frame's geometry stays behind the closed door." (:679-684) [The task states this was answered: "the world
canon is outside door 1 since file r item 926" — not read here; the reader did not open file r.]
F22 [READ] J-RR.38: typed places `WorldWhere` include "road with mode and leg fraction". (:587)
F23 [INFERRED from F3, F5, F7, F17] Under the review's rulings a host-bound world's routes are host edges between two host
settlements; a world site (watchpost, bridge fort, border post, satellite site) is never a route end and never a host
graph node; any "road access" a site has on a bound world is by lying along or beside a host route.

## G. `research/sf/lens-implications.md` (md5 95957c0d…, 613 lines; read whole)

Status: "PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat … to be retrovalidated" (L3).

G1 [READ] "All of them read geometry through one substrate. Path cost, `hopWeeks`, `distanceWeight` and `chooseRoute`
over the frozen digest; none reads a polygon, a coordinate or the world map's road polylines; only caravans (the gate
graph is the territory adjacency) and steading sites (inside the parent's partition) touch the host's territory at all".
(`research/sf/lens-implications.md`:68-71)
G2 [READ] "Geometry decides *who* in only four places: a supply link's three cheapest producers, the M4 pool of eight
nearest, the pilgrim catchment of eight nearest, and a steading's site inside its parent's partition". (:90-94)
G3 [READ] Lens vocabulary: "**route flow** (a mark along a host-chosen route, re-derived by the host's own route function
and labelled so)"; "link (a straight relation between two settlements; no route implied)". (:155-157)
G4 [READ] Territory lens rows: "Steadings as claim points | satellites ledger: parent, tier, population, site cell (c) or
orbit index [POP §3.4, §8.1] | dots at the site cell's centroid (c) or on the orbit ring | RRa, DC, LR, FS (+S); never on
RRb"; "Gate-site proposals | route crossings of allegiance borders (map-side) | ghost pins the DM accepts | map tier | … |
projects nothing until the host names a holder [FILE-M item 714 (16)]". (:180, :183)
G5 [READ] Patrol lens (§2.2): "Cadence per route segment and power | garrisons (bands: dark), adversarial neighbours
(drift: lit), road grade (the host's lived grades are dark; map route classes)"; "A road the host closes | the DM 'cut
trade route' event (`config._cutRoutes`): names no closer, feeds propagation and the trade cascade, stops no caravan";
"A warden's term | TR-1's route_wardenship / route_predation pairs are registered with no producer; EC-6's stance term
is unowned | DESIGNED"; "A patrol lowering danger | none: routing has no patrol term; the nearest slot is embattlement's
security relief, weight 0.4, capped 0.25 [OBSERVED `sp/embattlement.js:95-96`, `:204`] … must not be drawn as an
effect"; "Gate character along a route | per transit settlement … glyph at the gate settlement, not per segment". (:186-196)
G6 [READ] Religion row: "Faith places | `pilgrimage_center` / `religious_superior` links …; the `holySite` resource |
links and labels at settlement grain | … | positioned holy sites and hidden cult sites → owner ruling (§6 Q10), then a host
adoption". (:208)
G7 [READ] Trade rows: "DM cut and chartered routes | `config._cutRoutes`, `config._userRoutes` | relation marks: 'stops no
caravan', 'no caravan gate'"; "Supply links … route flow labelled 're-derived' | c only"; "Named merchants | Roads trade
missions: frozen settlement path, leg clock". (:239, :245-246)
G8 [READ] Populations rows: "Refugee columns (M4) | origin, destination, survivors, departure and arrival ticks; no path,
no toll | moving marker …; the map's 'likely road' polyline labelled as such"; "Steadings | satellites ledger | dots (site
cell on c, orbit ring otherwise)"; "Netted transfers … dated links along regional links, never along roads". (:256-258)
G9 [READ] Danger: "March or border danger | none: danger is at settlements, never along borders [TRADE §9 #3] |
never". (:317)
G10 [READ] §3.2 Patrol inputs: "road watch 'closed': only the DM's cut-route event exists, with no closer; 'warden':
designed only (TR-1, EC-6); garrisons: as M; hostility: relations; grade: the lived network is dark, so the map's route
classes … No host consumer of patrols exists; the one slot is embattlement's capped security relief, and route danger is
zero in a realm that never held a live war front". (:371)
G11 [READ] §4.3 fact classes: class 3 "Placement: map geometry used only to *place* a host fact (… a route polyline for a
link's 'likely road', a site cell's centroid), labelled when it is a guess"; class 4 "Owner-ruled map derivation: the
sway and the patrol cadence". Refused: "an effect the host does not apply (patrols lowering danger …)". (:442-451)
G12 [READ] Legend register: "'gate' (digest crossing / route intermediary / town gate)" is a collision the lens must not
merge. (:458)
G13 [READ] Host asks: #8 "Give patrol coverage a host meaning: a producer for TR-1's route_wardenship / route_predation,
or patrol coverage as embattlement's security input (H16)"; #9 "Name the closer on a DM cut route, and either let caravans
read the cut or label it propagation-only"; #15 "Store a shipment's path and departure tick (WY-3)"; #19 "Store each
column's dispatched route and its toll". (:520-521, :527, :531)
G14 [READ] Owner questions open in this note: Q10 "Holy places and hidden cult sites as map-side sites — rule them in (and
ask the host to adopt them) or keep them out?"; Q11 "Steadings: drawn at their frozen site cells and counted as claim
points before they graduate?". (:568-570)
G15 [INFERRED from G1, G5, G10] The host simulation today has no consumer that would read a map-side site's road access:
roads on the map are presentation ("likely road", "re-derived route"), patrols have no host effect, and only steading
sites touch host geometry (a site cell inside the parent's partition).

## H0. `research/sf/trade-system.md` (md5 94d85edd…, 1307 lines) — §9 (L902-1000) and §10.3 (L1135-1151) read whole as
named; §5.2 (L487-516) and §5.13 (L656-688) also read whole because §9 leans on them. The rest of the file was not read
(stated so; nothing below characterizes it).

T1 [READ] §9 item 1: "The caravan graph is the host's territory adjacency, and it has no wild land. The host's gates are
the cheapest crossings between nearest-settlement-by-cost territories frozen at canonize, and every reachable cell belongs
to some settlement". (`research/sf/trade-system.md`:906-914)
T2 [READ] §9 item 2: "Gates are per settlement, not per realm. Interception, contraband and tolls are decided at the
individual intermediary settlement". (:915-918)
T3 [READ] §9 item 3: "Contested marches have no trade analogue. No host mechanism treats a contested border as a road
hazard; route danger is embattlement *at settlements* (war-front siege 0.85, occupation 0.75 × its state, war exhaustion
0.45, crime 0.3, minus security), not along borders." (:919-921)
T4 [READ] §9 item 4: "Patrols have one nearby host slot, and it is weak. Caravan routing has no patrol term. The
embattlement ramp's security relief (0.4 × security, capped at 0.25 …) … in a realm whose graph has never held a live war
front, route danger is zero and patrols would have nothing to reduce [OBSERVED … `sp/embattlement.js:66-98`, `:113-115`,
`:196-206`, `:239-247`; `wp/pulseKernel.js:2365-2394`] … Designed slots: TR-1's route_wardenship / route_predation pairs
(registered, no producer) and EC-6's route_wardenship stance term (unowned, OD-FC-2). J378's 'patrol coverage per route
segment …' should be offered … with the segment keyed to the host's *gates*, not to map road polylines." (:922-932)
T5 [READ] §9 item 5: "Travel time from seats must be the host's week … a lens with its own travel-time law will disagree
with every caravan's arrival". (:933-935)
T6 [READ] §9 item 7: sea lanes "lit by data, not by a flag … only trips with a port endpoint use water". (:943-948)
T7 [READ] §9 item 13: "Links and ETAs, not positions, for caravans until the host stores a path and departure tick (WY-3)
… Named merchants on Roads missions already carry both a path and a leg clock (§5.13)." (:974-977)
T8 [READ] §9 item 18: "Unmapped settlements are visible as such. Foundings after the canonize have no links until a
premium re-map". (:992-993)
T9 [READ] §9 item 20: "DM route verbs are relational, not physical. A DM-cut route feeds propagation and the cascade but
stops no caravan. A DM-chartered route adds a neutral neighbour link that discovery reads, but no caravan gate (§5.13)."
(:997-999)
T10 [READ] §10.3: "Would the host adopt patrol coverage as a route_wardenship producer or a security input (§9, item 4)?";
"TR-5's trade half (grain provision, route wardenship, the realm-pressure consumer) has no owner (OD-FC-2)"; "Will the
host canonize from the native map? Today 'Map geography' accepts only a generated FMG map's pack". (:1137-1146)
T11 [READ] §5.2 the road model: "Territories come from one multi-source flood over the FMG pack cells …; for every pair of
adjacent territories the *gate* is the cheapest boundary crossing … the gates form a sparse settlement graph and
Floyd–Warshall fills the all-pairs distance matrix [OBSERVED re-checked `sp/spatialDigest.js:690-740`]"; "Up to three routes
per pair: the shortest path plus single-edge detours, memoized per digest, never re-pathfound [`sp/distanceRead.js:1078-
1129`]"; choice = seasonal cost + danger + toll; "Capacity. None on land"; "A settlement founded after the canonize has no
territory, gate or distance row until a premium re-map". (:489-516)
T12 [READ] §5.13: THE ROADS trade mission — "routed by the caravan layer's own `chooseRoute` on the digest … a mission
with a frozen settlement path … Its current node is interpolated along the path [`wp/roadsKernel.js:183-206`, `:1005-1030`;
`src/domain/roads/state.js:246`, `:253`]"; gate `roadsEnabled` plus an active digest. (:658-671)
T13 [READ] §5.13: DM "cut trade route" appends `config._cutRoutes` … "The caravan layer reads neither … a DM-cut route
stops no M2 or M6a caravan"; DM user routes (CREATE_ROUTE): "charters an edge between two owned settlements. Its cost band
is read from the frozen digest's distance matrix, and its mode is water if the frozen sea-lane set already connects the
pair, else land (`src/domain/roads/userRoutes.js:1-30`) … does not reach caravan routing, which reads digest gates only.
The lived-network genesis that would read `_userRoutes` is dark (§5.12)." (:672-688)
T14 [INFERRED from T1, T11, T13] In the host's road model every node is a settlement and every edge a gate between two
settlements' territories; a non-settlement place cannot be a node, so a map-side site has no slot in it.

## I. `research/sf/population-system.md` (md5 6c51fbb9…, 1091 lines) — §9.1 (L773-799) read whole as named; §3.4
(L259-294, satellite steadings) also read whole because §9.1 item 4 leans on it. The rest was not read.

P1 [READ] §9.1 item 4: "Steadings are the only sub-seat claim points the host has. They sit inside the parent's own
territory partition on canonized realms, never join the digest, and stop at 401 'charter pending' … they should not
extend the border or seed a new territory until the host graduates them (`lineageClaimEnabled`, dark). The host map
already draws them as orbit dots". (`research/sf/population-system.md`:784-790)
P2 [READ] §9.1 item 6: "Refugee columns are evidence, not ownership. M4 columns cross marches and die by embattlement ×
season … J378's patrols could lower road danger only if the host chooses to consume a patrol fact; today road deaths read
the M1 embattlement ledger alone (§5.2 C)." (:793-795)
P3 [READ] §9.1 item 8: "The §5b land law is the host's own spacing rule (minimum separation by tier pair, maximum reach
1.25 median hops), expressed in median primary hops". (:798-800)
P4 [READ] §3.4: "Site: on a canonized realm the site is a frozen-pack cell sampled inside the parent's own territory
partition (gate cells first, then the cost field); aspatial realms record no site. `orbit` is a small ring index for
cosmetic placement [`:54-60`; `wp/steadingTopography.js:1-40`]". (:282-284)
P5 [INFERRED from P4] A steading's host "site" is chosen gate-cells-first — the nearest the host comes to placing a sub-seat
place on a road-like feature (a gate is a territory crossing on the cheapest path, not a road polyline).

## HOST. The host repository at 81f1cd96 (read-only; greps and the line ranges named; nothing written)

**Deviation, recorded:** this reader ran one read-only `git rev-parse --short HEAD` in the host clone (it printed
`81f1cd9`), against the lane's "never run any git command" rule. Nothing was changed; the HEAD it printed agrees with the
stated revision. No other git command was run.

Host files opened (line count; md5 at read; range read): `src/domain/worldPulse/routeNetworkLedger.js` (776;
`0ef0945d…`; 1-200); `src/domain/worldPulse/routeNetworkGenesis.js` (643; `6cd8807c…`; 1-120);
`src/domain/worldPulse/routeNetworkCharterBypass.js` (454; `efe7095b…`; 1-110);
`src/domain/worldPulse/routeNetworkConsumersInterdiction.js` (287; `be81595d…`; whole);
`src/domain/worldPulse/routeNetworkConsumers.js` (540; `5368a448…`; 225-240); `src/domain/worldPulse/steadingTopography.js`
(523; `93acf614…`; 1-70); `src/domain/worldPulse/satellitesLedger.js` (184; `56e2dade…`; grep only);
`src/domain/spatial/spatialDigest.js` (923; `22499e24…`; 587-700 + grep); `src/domain/spatial/embattlement.js` (449;
`70be65cb…`; 90-100, 198-208); `src/domain/spatial/spatialSubstrate.js` (277; `96c73c4e…`; 1-40);
`src/domain/roads/userRoutes.js` (228; `c6e1f692…`; 1-45); `src/domain/tradeRouteSemantics.js` (193; `2381ac98…`; grep +
82-97); `src/domain/institutions/defenseInstitutionBuckets.js` (182; `e2abdc95…`; grep); `src/domain/compendium/
catalogData.js` (63; `c8a1555c…`; grep); docs `DESIGN_FP_ARCH_WY.md` (1737; `ceab55a5…`; grep + 105-115, 178-192),
`PHASE55_SPATIAL_ENGINE_DESIGN.md` (1710; `8633bcc4…`; grep + 50-58, 898-906), `DESIGN_FP_ARCH_EC.md` (2996; `02d35525…`;
grep + 1318-1324), `DESIGN_ROUTE_LIFECYCLE.md` (300; `99d2e807…`; 52-62, 128-148, 220-230). No host file is characterized
beyond the ranges named.

HS1 [READ] The digest's nodes are the placements: `buildSpatialDigest` resolves `seeds` from `input.placements`; a
multi-source Dijkstra from each seed cell gives `territory` as a per-cell settlement INDEX, "Consumers resolve index → id
via digest.settlementIds"; step 3 derives "territory adjacency + gates". (`src/domain/spatial/spatialDigest.js`:587-590,
649-697)
HS2 [READ] The lived route network's edge: "`RouteEdge` { a, b (endpoints, codepoint order), grade (one of ROUTE_GRADES),
mode, charter, provenance, lifecycleImmune?, strategicNeed?, usage?, bypass? }"; "Geometry is DERIVED (travelersGeometry /
seaRoads), never stored: a RouteEdge carries its endpoints and its mode, and any consumer that needs the path asks the
digest for it"; "LAW 1: THE DIGEST STAYS FROZEN … Nothing here reads or writes territory, membership or positions"; edge id
"`route.<a>.<b>.<mode>`". (`src/domain/worldPulse/routeNetworkLedger.js`:11-17, 30-38, 116-139)
HS3 [READ] Route grades: `ROUTE_GRADES = ['highway', 'road', 'track', 'hidden']` — "hidden is the remnant a corridor
demotes to instead of vanishing (Law 5, NOTHING IS FORGOTTEN)"; modes `['land', 'water']`; charter flavors
`['mercantile', 'military', 'migration', 'genesis', 'user']`; provenance `generated` / `user` (user edges
"LIFECYCLE-IMMUNE to organic removal"). (routeNetworkLedger.js:55-103)
HS4 [READ] Lived-network dormancy: "`routeLifecycleEnabled` is VIRTUAL … absent means dormant. DORMANT MEANS ABSENT MEANS
BYTE-IDENTICAL". (routeNetworkLedger.js:19-28)
HS5 [READ] Genesis: candidates are "THE k-NEAREST NEIGHBOUR PAIRS … THE PORT PAIRS the frozen sea-lane set links … THE
USER-ROUTE PAIRS"; "takes NO entropy at all"; grade ladder from the minimum of the endpoints' access tiers: "major
(crossroads / port) highway; standard (road / river / coastal) road; seasonal (mountain pass) track; isolated / unknown no
land edge at all"; `ROUTE_GENESIS_LAW_VERSION = 1`, "The lane is unmounted, so no world carries a stamp yet".
(`src/domain/worldPulse/routeNetworkGenesis.js`:11-31, 64-110)
HS6 [READ] The access-word → tier table: `crossroads: 'major'`, `port: 'major'`, `river: 'standard'`, `road: 'standard'`,
`coastal: 'standard'`, `mountain_pass: 'seasonal'`, `isolated: 'isolated'` (+ legacy major/minor/standard/none).
(`src/domain/tradeRouteSemantics.js`:82-97)
HS7 [READ] Bypass: "when the believed danger at a place a through-road passes THROUGH crosses the bypass band, the
through-traffic may pay a DETOUR PREMIUM and swing wide of it"; "WAYPOINTS ARE GEOMETRY, NEVER GRAPH NODES (Law 1) … It
mints no edge, no corridor, no settlement"; persisted `bypass { avoid, sinceTick, lastDangerTick, detourPremium01 }`;
tuning (L72-78) `BYPASS_BAND 0.4, BYPASS_CANDIDATE_K 6, BYPASS_HYSTERESIS_TICKS 26, DETOUR_PREMIUM_FLOOR 0.05, DETOUR_PREMIUM_CAP
0.6`. The avoided "places" are intermediary settlements (design: "BELIEVED danger at an intermediate settlement").
(`src/domain/worldPulse/routeNetworkCharterBypass.js`:1-42, 72-78; ledger :176-182; `docs/DESIGN_ROUTE_LIFECYCLE.md`:132-145)
HS8 [READ] Interdiction (the host's one "patrol" mechanism in code): "An interdiction PATROLS. A hidden path is, by Law 5,
the way the realm has forgotten: no traffic, no upkeep, nobody watching it … a target reachable only by a hidden way reads
`hidden_only` and the patrol severs nothing"; verdicts `['severed', 'no_route', 'no_traffic', 'hidden_only', 'dormant']`;
it reads `livedNeighbours(worldState, targetId)` and the edge's `usage`; "READS ONLY, STRUCTURALLY … never touches the route
ledger"; its `satelliteId` is a supply-web source settlement (the far end `hop.toId`), not a steading.
(`src/domain/worldPulse/routeNetworkConsumersInterdiction.js`:1-37, 51-53, 141-157, 213-261)
HS9 [READ] Other "patrol" hits in the domain are prose only: receipt lines "put patrols on the ${x.route}" and "patrol fires
along the ${x.route}" (`src/domain/worldPulse/commercialReceiptPools.js`:206, 211); relationship-memory flavour
(`relationshipMemory.js`:322-338); a stressor reason "Standing defenses patrol the approaches." (`stressorGates.js`:653);
a comment "no naval-patrol damper" (`navalLayer.js`:608). [READ by grep over src/domain/spatial, worldPulse, roads]
HS10 [READ] Security relief, the nearest host slot a patrol could feed: `W_SEC: 0.4, SECURITY_MAX_RELIEF: 0.25` — "CAPPED …
so a garrison can never nullify an active siege"; `relief = Math.min(T.SECURITY_MAX_RELIEF, T.W_SEC * sec)`.
(`src/domain/spatial/embattlement.js`:91-96, 204)
HS11 [READ] Steading site: "satellites sample spatial rasters READ-ONLY at a seeded draw inside the orbit annulus; they
never join the frozen spatial digest"; the annulus "is therefore realized as the parent's EXCLUSIVE TERRITORY … with the
parent's gate cells as its outer rim"; a site's ground is read from `gate_terrain` (authoritative) or `cost_band`; the pick
is seeded via "`satellite:<parent>:<tick>:site`". The ledger row carries `site { cell, landform, cost, source }` — "the cell
is a READ key into the frozen rasters". (`src/domain/worldPulse/steadingTopography.js`:1-56; `satellitesLedger.js`:62-66)
HS12 [READ] User routes: "an edge the DM charters by hand between two settlements they already own"; "THE COST IS READ, NOT
INVENTED … (spatialDigest distanceMatrix) … An unreachable pair is not an error to route around, it is the
isolation-as-fate law"; "MODE is derived, not chosen: two settlements the frozen sea-lane set already connects charter a
water route, everyone else charters a land route". (`src/domain/roads/userRoutes.js`:1-24)
HS13 [READ] Mover positions: "`whereabouts.placeId` is ALWAYS a settlement id ('On the road to X' names the destination) …
route positions stay derived; the typed `{kind:'settlement'|'route_node'}` discriminator is the only lawful widening";
WY premise "the roads are inhabited at freeze … the map tells positions only". (`docs/DESIGN_FP_ARCH_WY.md`:111-114,
183-189)
HS14 [READ] PHASE55: "Gates: a route from A to C that crosses B's territory makes B a GATE — B can tax, throttle, or (if
hostile) block the flow"; "DM override: force a road / trade route (a low-cost authored edge that bypasses gates)";
Routine-Autonomy "Auto: trade/couriers/minor-migration/ally-seeking/patrols/local outreach". (`docs/PHASE55_SPATIAL_ENGINE_
DESIGN.md`:52-56, 903)
HS15 [READ] EC fold bracket: "RULED BY DELEGATION 2026-10-16 (OD-FC-2 — `route_wardenship` is recommended as an EC-6
STANCE …" (the bracket continues past the read range). (`docs/DESIGN_FP_ARCH_EC.md`:1321)
HS16 [READ] Door 1's built substrate is town-scale: `spatialSubstrate.js` — "THE SPATIAL SUBSTRATE GEOMETRY (DOOR 1, owner
ruling #8) … the engine NEVER reads the render or the layout model directly … PURE GEOMETRY over an already-built
TownMapModel" (districts, wall ring, gates). (`src/domain/spatial/spatialSubstrate.js`:1-20)
HS17 [READ] The host's "watch" is a town institution: defence bucket `watch: ['town watch', 'city watch', 'professional
city watch' …]`, `garrison: ['garrison', 'barracks', …]`. (`src/domain/institutions/defenseInstitutionBuckets.js`:88-96)
HS18 [READ] The host's only "outpost" is a settlement archetype: "Frontier Outpost … tier: thorp or hamlet, threat:
frontier … Exists to hold a line". (`src/domain/compendium/catalogData.js`:38)
HS19 [READ by absence] No hit for `watchpost`, `watchtower`, `road watch`/`roadWatch`, `held site`/`heldSite`, `border post`
or `outpost` (as a non-settlement place) in `src/domain/spatial`, `src/domain/worldPulse`, `src/domain/roads`; no
`satellite` hit in `src/domain/spatial`. [grep, recorded in this section]
HS20 [INFERRED from HS1-HS3, HS7, HS11-HS13] What a map-side site on or off a road could mean to the host's simulation
today: the simulation reads none of it. Its graph nodes are settlements (digest seeds, route-edge endpoints, whereabouts
place ids); road geometry is derived from the digest, never stored; bypass waypoints are explicitly not nodes; a steading's
site is a frozen-raster cell chosen gate-cells-first inside the parent's territory and never joins the digest. A map-side
site's road access, if the host ever consumed it, would arrive only through a new host change (e.g. a typed `route_node`
place, a patrol coverage producer for route_wardenship, or the canon's sites slot) — none exists at 81f1cd96.

