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

