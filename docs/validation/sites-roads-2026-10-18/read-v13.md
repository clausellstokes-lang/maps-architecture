# read-v13 — the reader's record of V13 for J393 (sites, roads, autocorrect)

**Lane:** `sites-roads/read-v13` (opus; J390, Fable-checked). A reader: this record states what the text says, with
line numbers; it judges nothing.

**Files read (whole), at 2026-10-18 05:12Z:**

| file | lines | md5 at read |
|---|---|---|
| `docs/volumes/V13-world.md` | 4,452 | `c8759307398388249547f71e1912feca` |
| `docs/validation/sites-roads-2026-10-18/README.md` | 29 | `eabd68cd5eec8bb1a35539c4a08e1bfd` |

All V13 line numbers below are against md5 `c8759307398388249547f71e1912feca` (a snapshot copy was taken at the read and
read from, so the cites hold even while J392 edits the live file). The apply step re-verifies every cite.

**Reading of the README.** No difference recorded by this reader (a reader does not re-read the owner's words); see the
gaps section for what the volume text does and does not say against the README's "What exists today".

## Facts, in the order found

### Front matter, §0, §1 (lines 1–423)

1. Owner's word r (file r item 926): the world canon is outside J86's door 1; door 1 itself (the settlement frame's
   geometry) stays closed; H5 and H22's birth canon no longer wait on Q4. (V13:100–103)
2. The base word **site** keeps its base meaning (S1 Site, `@plat/site`); the owner's persistent sites are **world
   sites** and V14's. (V13:117–119)
3. §0 plain words: the charter hands down "which roads arrive"; a town made before its world is dropped later and "the
   world then bends itself to the town, never the town to the world"; "If the spot the game master chose cannot be made
   coherent — a port dropped inland — the world offers the nearest spot that can." (V13:134–148)
4. §1.1 engine row W-ROUTES W7: "`WorldRoute` records: on a standalone world the Urquhart neighbourhood graph per
   landmass under the cost law, ports as the final reachable water body, sea routes; on a host-bound world exactly the
   host's genesis edges and lived changes laid as geometry, with time stations". (V13:186)
5. §1.1 W-SUIT W6: "the pluggable suitability score, two-stage scoring, `SitingProposal` records for the host".
   (V13:185)
6. §1.1 W-POLITY W8 lists `PatrolCadence` among W8b's records. (V13:187)
7. §1.1 P-PLACE P1–P5: "`Placement` records, the coherence cost and the nearest lawful placement, the blend band, the
   local drainage re-run, the `FrameCharter` emitted both ways, the precedence stamp, the mirror edit". (V13:189)
8. §1.2: S1 takes the charter as its one input record; the roads land as "S3 (4)'s requested bearings". (V13:204)
9. §1.2 V14 row: V14 consumes `FrameCharter`, `Placement`, the suitability score, the water class test and
   `ReasonRecord`. (V13:241)
10. §1.3 item 134 obeyed by §3.7's suitability score admitting a world site as a destination term (134 (c)) and "the
   charter's `territory` and `sites` rows, which a settlement founded there reads so the site claims its ground first";
   both-way flow is P1–P5 with the charter emitted both ways; 134 (d)'s adoption is V14 §3's G8 over V13's placement.
   (V13:259–265)
11. §1.3 item 135 (scale coherence) quoted: "make sure that scaling is completely scaled according to encounter, city,
   and world generating processes"; obeyed by one chain of refinement (world reach, frame river, crop bank), handoff as
   boundary conditions (the charter), deterministic resolution (position-keyed fBm, BCR-V13-29; a declared deviation until
   it lands, V13 §12), edits at their scale, extent/detail per regime by table. (V13:266–274)
12. §1.3 the owner's settlement-first correction, quoted: "(1) a settlement generated standalone is placed on a world
   later and the world autocorrects to the bare coherent minimum (blend band, local drainage re-run, coherence cost
   reported, nearest lawful placement offered); (2) … the settlement glyph …; (3) a mismatch of coast orientation is
   resolved by the bearing first, the world's blend second, and the settlement never unless the DM explicitly chooses
   mirror (warned) or the world-wins verb; orientation-dependent derived terms … recompute from placement with locks
   holding geometry and anomalies reported; the compass is derived presentation." Obeyed by P1–P5 (§3.11), the glyph,
   the precedence stamp with its two explicit verbs (§3.11.5, §4.1). (V13:319–327)
13. §1.3 territory rules (T1)–(T3) quoted; T3: "…also there should be patrols"; obeyed by "garrisoned sites as held
   points, armies presence only" ((10)) and "patrols as a derived cadence per route segment and power (T3; (14))", the
   encounter crop reading all of it at its point and week (V14 E1 (4), E4 (b)). (V13:328–348)
14. §1.4: V13 "reads nothing of V14's but `WorldSite` positions as a suitability input (V13 §3.7) and a site's
   `Placement` as a world fact (`WorldFacts.sites`, V13 §2.4; SW-20)". (V13:372–374)
15. §1.4: the host's political facts per window include "held sites; satellites at their frozen site points; … lit
   water lanes; road watches"; no cost vector is asked of the host. (V13:377–382)
16. §1.4: a phantom of the host is "never a seat, never placed, never projecting, patrolling or contesting"; sight, air
   and teleport are readers and marks, "never edges the map invents"; `aerialLegs(world, seats)` fed only to a canon
   whose envelope names this world. (V13:413–419)
17. §1.4: any settlement rung THORP–METROPOLIS may be placed; a standalone neighbourhood document never (J-V13.47).
   (V13:420–422)

### §1b wiring and §2.1 (lines 424–617)

18. §1b.1 `FrameCharter` fields: "frame in cm, datum, edge elevation profiles, water edges, river crossings, downstream
   head, roads, climate scalars, water table, biome, resources, territory, sites, `source`"; fed by P4 both directions;
   feeds S0/S1, `Recipe.charter`, V14's G3 and E1, the port's per-campaign charter, the clerk. (V13:441)
19. §1b.1 `Placement` (subject, origin, bearing, `mirrored`, `precedenceStamp`, `coherenceCost`, `since`): fed by P1
   (proposed), `placeFrame` / `setPlacement` / `mirrorFrame` / `worldWins`, and "V14's G8 adoption moves a site's
   placement into its settlement's"; feeds the transform, P2–P5, the glyph, the orientation terms, the compass, the port,
   "V14's free-standing site (its card's `placementRef`, V14 §2.2; SW-11)". (V13:442)
20. §1b.1 `PlacementAnomaly` ("a reported impossibility under a lock"): fed by P5 and the cascade; feeds the clerk, the
   report, V09's panel. (V13:443)
21. §1b.1 `WorldRoute` ("a graph edge: ends, mode, class or the host's grade, polyline, time stations, lay version,
   origin; bound: the host's edge key"): fed by W7 (standalone own selection; host-bound laying exactly the host's genesis
   edges and lived changes); feeds "the charter's `roads`, the port's `routes`, `routeFacts` and `mapFeed`, W6's economic
   stage, W9's labels, the view, the exports; V14's E1". (V13:444)
22. §1b.1 W8b records include `PatrolCadence`; consumers include the port's `mapFeed` and `patrolOffer`, "V13 §3.9 (16)'s
   border-post proposals, V14's `territoryBorder` term, E1 and E4". (V13:446)
23. §1b.1 `SitingProposal` ("a scored candidate site with its reason and its `WaterAccess`"): fed by W6 and "V13 §3.9
   (16)'s transient border-post proposals"; feeds the host, V14's G3, the clerk. (V13:448)
24. §1b.1 `TravelLaw` feeds `derivedTime`, time stations, `timeDelta`, the world dialog's span, W8b's paces, "the patrol
   cadence". `RouteLayRule` (`world.routeLay`) feeds W7. `PolityFacts` carry "held sites, satellites, … road watches";
   feeds W8b and "the patrol cadence". (V13:453–455)
25. §1b.1 `RouteGenesis`, `NetworkChange`: fed by `WorldPort.genesis`, `WorldPort.network` (recorded inputs); feed
   "bound W7; the route layer; the frame's road rows at a week (`roadsAt`)". (V13:460)
26. §1b.1 table list includes `world.suitability`, `world.routes` ("the host's cost law: a host slice and the default
   row"), `world.routeLay` ("the map's lay rules"), `world.travel`, `world.polity`, `place.coherence`. (V13:472)
27. §1b.1 stage warnings include `W_PLACE_BENT`, `W_PLACE_NO_LAWFUL`, `W_PLACE_ANOMALY`, `W_BLEND_CLIPPED`,
   `W_TRAVEL_BAND_CROSSED`. (V13:473)
28. §1b.1 concern `world.patrol`: "the patrol phase hash keyed by (segment, power), V13 §3.9 (14); no stream of draws";
   `place.search` a concern; `world.siting` a concern. (V13:475)
29. §1b.2 `charterFor(world, placement | transient)` (P4 world-first; transient record-less form for a crop frame, SW-05)
   and `charterFrom(frame, blend)` (P4 settlement-first). (V13:488)
30. §1b.2 message `world.placed { placement; subject; extent; covers }` (P4/P5's outcome row → the application →
   `@plat/sites`; SW-10). (V13:490)
31. §1b.2 `coherence(world, frame, origin, bearing)` → `CoherenceCost` and `nearestLawful(world, frame, origin)` →
   `Placement[]` (P1), callers the `placeFrame` dry run, V09's placement tool, the clerk's `placeAt`. (V13:491)
32. §1b.2 `score(cell, ctx, weights, hard?)` over the `terms` registry, `terms.register(term)`; V14 registers its purpose
   terms; "no jitter, SW-03". (V13:495)
33. §1b.2 `RouteCostLaw` ("the host's law as data: its values and version, each term tagged `time` or `choice`; the
   default row ours") and `RouteLayRule` ("the map's network formation"); consumers W7, W8a, W8b's travel times,
   `derivedTime`, V14's E1. (V13:496)
34. §1b.2 effort-metre: "one metre of level open ground at the cost law's base rate (effort = Σ step cost under the time
   terms ÷ (`landBase` × `perM`))"; `derivedTime` by `basis` absolute / normalized / normalizedFrozen. (V13:497)
35. §1b.2 `WorldPort` offers include `routeFacts`, `patrolOffer`, `routes(world)`, `pathGeometry`, inbound `genesis`,
   `network`, `polity`, "the outbound offers `physicalChange` and the DM-placed site offers of the DM's map feed". (V13:498)
36. §1b.2 `worldFactsAt` returns terrain, surfaces, biome, route, the seat territory, the polity (incl. patrols), "the
   site placements", recent events. (V13:504)
37. §1b.2 `roadsAt(placement, week)` ("the frame's road rows at a week, from the lived network"), consumers include "the
   charter's re-emission at a growth or a re-placement"; `patrolAt(world, segment, power, week)` → boolean "on its fixed
   phase". (V13:508–509)
38. §1b.3 placement edits: `requestCharter`, `bindPlacement`, `placeFrame`, `setPlacement`, `mirrorFrame`, `worldWins`
   ("whole or scoped by `ids`"), `unplaceFrame`, the frame's own `charter` event; tool T6 `place`. (V13:528)
39. §1b.3 `setAttr` on a `WorldRoute` (`class`, "standalone only; a host route's grade is the host's") and on a
   `Placement` (`bearingCdeg`, `originCm`). (V13:530)
40. §1b.3 `setSwayLock`: on a host-bound world a presentation lock "the map feed's crossing holders and `patrolOffer`
   never do" read. (V13:533)
41. §1b.4 `WorldRoute` rendered "by class or the host's grade (a hidden host road a DM-only ghost)"; labelled "none (a
   route takes its ends' names)"; exported as GeoJSON LineString, ecosystem JSON routes, CSV. `PatrolCadence` rendered as
   "the `patrols` tints", "derived on load from the revision". `PlacementAnomaly` "a notice pin … derived; never persisted
   (V13 §2.4)". (V13:552, 555, 562)
42. §2.1: on a host-bound world "political and military event kinds are refused (`refuse.world.hostPolitical`), the world
   editor opening the host's own command for them as for routes (V13 §3.8 (9))". (V13:588–589)

### §2.2 New records (lines 618–911)

43. `FrameCharter.roads` (full text): "`roads: { route: Id; hostKey?: string /* the host's edge key when bound */; side:
   'N'|'E'|'S'|'W'; atCm: Cm; bearingCdeg: Cdeg; class: WayClass /* a world class mapped to §2.4's: highway → through,
   road → primary, track → track, trail → path; capped in class and count by the dossier's access word */; toward: Id |
   null /* the next host settlement along the route, never a site, a proposal or a junction */; towardKey?: string /* its
   host key */; towardEffortM?: number /* the land effort from the edge station to it, for the leaf's walking-time
   annotation */; forced: boolean /* a highway or road crossing: a forced gate pick of S3 (4), routed through the margin to
   its station (BCR-V13-30) */; hidden?: boolean /* a road the host grades hidden: no public road, drawn DM-only */ }[]`".
   No field of `roads` carries a site as an end; `toward` excludes a site explicitly. (V13:713–715)
44. `FrameCharter.territory` "changes only at a membership re-canonize"; `polityAtCharter` read ONCE; "a sway revision
   never re-emits it". (V13:720–721)
45. `FrameCharter.sites`: "`sites: { site: Id; at: PointCm; kind: string; footprint?: PolygonCm }[] /* V14's world sites
   inside the frame + margin (item 134 (c)) */`". No access/road field on a charter site row. (V13:722)
46. `Placement` (full): `subject: { kind: 'frame'; doc: Uuid } | { kind: 'site'; site: Id /* V14's WorldSite: a
   free-standing site before adoption */ }`; `originCm`, `bearingCdeg`, `mirrored`; `precedenceStamp:
   'settlement'|'world'`; `coherenceCost: CoherenceCost /* as computed at the last placement edit (V13 §3.11.1) */`;
   `charter: Id`; `blend: { bandM; cells } | null /* … (settlement-first only) */`; `hostKey?`; `hostLocked?: boolean /*
   the host's move-lock: an origin edit is refused (`refuse.place.hostLocked`) while it is set; the map additionally
   refuses a DM's unplacement of a host seat in the world editor …; bearing and mirror admitted */`; `since`. (V13:726–734)
47. `CoherenceCost`: "`{ total: number; terms: { term:
   'coastSide'|'riverCrossing'|'edgeElevation'|'relief'|'biome'|'territory'|'dossier'; cost: number; detail: string }[];
   lawful: boolean /* total ≤ place.coherence.lawfulMax */; detail?: 'world-first' /* no P1 ran (V13 §3.11) */ }`". No
   road or access term among the seven. (V13:735)
48. `WorldRoute`: `a: Id; b: Id /* seat ids (the glyphs' settlements, or V14 sites standalone) */`; `hostKey?` ("bound:
   the host's edge key, the pair and the mode"); `mode: 'land'|'water'`; `waterRuns?`; `class:
   'highway'|'road'|'track'|'trail'|'sea'|'river' /* standalone: W7's rank class; bound: mapped from the host's grade
   */`; `grade?` ("bound: the host's grade word, hidden among them"); `origin:
   'genesis'|'chartered'|'standalone'|'import'|'user'`; `layVersion`; `polyline`; `stations` (cumulative land
   effort-metres); `vertexClass`; length/effort tallies; `crossings: Id[]`; `seasonal?`; `costTotal` ("presentation only,
   never a time and never sent to the host's simulation"); `landmass`; `reason`. (V13:737–744)
49. `RecipeSeat { at; key; tier: Rung; culture? }` — a standalone world's seats; "budgets and cost vectors are retired
   (J-V13.63)". (V13:745)
50. `SitingProposal` carries `harbourCandidate`, `waterAccess`, `demand?` ("'borderPost' for V13 §3.9 (16)'s transient
   border posts"), `postKind?: 'bridgeFort'|'fort'|'watchpost'|'tollhouse'`. (V13:757)
51. `SuitabilityContext` (full): `raster; coast; reaches; surfaces; routes: WorldRoute[]; placements: Placement[]; sites:
   { placement: Id; at: WorldPointCm; attraction: number; routed: boolean }[] /* every Placement with a site subject, its
   card's attraction and routed read through the resolver (R-V14-1) */; resources; springs; territories; sways: Sway[] /*
   SW-01: V14's territoryBorder reads … the sway in force, never the seat territory (V14 §2.5) */; wetStage(reach);
   stage: 'a'|'b'`. (V13:758–761)
52. `SuitabilityTerm { id; compute(cell, ctx): number /* 0–1; pure, deterministic — no draw (SW-03) */ }`; "V13 OWNS the
   slot (SW-01; J-V13.51): V13's eight generic terms live here; V14's purpose terms are V14's plug-ins"; `terms.register`
   refuses a duplicate id; `score(..., hard?)` — "a term whose value is 0 refuses the cell"; "no random or jitter term
   anywhere in siting (item 132 (b) extended; SW-03; J-V13.53)". (V13:762–764)
53. `PlacementAnomaly` (full): "`{ placement: Id; subject: Id /* the locked entity */; kind:
   'riverUphill'|'coastInland'|'lockedBelowTable'|'lockedInWater'|'roadToNowhere'|'roadUnmatched'|'windSide'|'sunDiffers';
   detail: string; reason: Id }   // derived, V13 §2.4; `roadToNowhere` (a charter road no exit meets) and `roadUnmatched`
   (a frame exit no charter road meets) are reported readings, never annotations`". (V13:788)
54. `CanonRequest`/`WorldCanon`: the canon has a `sites` slot: `{ hostKey; ground: { at; terrainClass; stepCost }[] /*
   frozen candidate ground inside the seat's orbit */ }[]` — the host's orbit ground, not V14 world sites; `skipped`
   reasons `'unbound'|'unplaced'|'phantom'|'offWorld'`. (V13:791–795)
55. `TravelEdge`: `a, b` host keys, integer `cost`, `crossStep`, `classA/B`, `crossingCm`, `sideA/B`, `landmass`.
   (V13:797)
56. `TravelLaw` (full fields: `kmPerWeek` per foot/cart/river/coastal/sea, `water`, `leg` floor/cap/rounding, `gradeLeg`,
   `army`, `news`, `season`, `reachBandEdgesWeeks`, `bandEdges`, `tiers`, `prosperityRungs`, `basis`, `calibration?`,
   `legWeeks?`); "a standalone world reads the default row (V13 §2.3); nothing derived from a default is ever sent".
   (V13:801–807)
57. `PolityFacts` (full): `window; seats; links; relations; sites: PolitySite[]; satellites; claims; culture; waterLanes;
   roadWatch: { edge: string; power: string; kind: 'closed'|'warden'; since: Week }[]; christened`. (V13:809–813)
58. `PolitySite { site: Id; holder?: string; garrisonBand?: 0|1|2|3|4; status: string }` (the held sites). (V13:824)
59. `PolitySatellite.at?` — "its frozen site's point (the canon's sites slot); absent: an orbit-only satellite, neither
   drawn nor projected (`W_POLITY_SATELLITE_UNPLACED`)". (V13:825)
60. `PatrolCadence` (full): "`{ route: Id; fromStation: number; toStation: number; power: string; everyWeeks:
   1|4|13|null; basis: 'hostWatch'|'garrison'|'debatable'; rev: number }`". (V13:831)
61. `RouteGenesis` (full): "`{ lawVersion: string; edges: { hostKey: string; a: string; b: string; mode:
   'land'|'water'; grade: string }[]; week: Week }`". (V13:832)
62. `NetworkChange` (full): "`{ hostKey: string; kind: string /* the host's word, mapped by the adapter folder's network
   table to chartered, promoted, demoted, abandoned, revived, facet, bypass or retract */; grade?: string; avoids?: string
   /* a bypass: the seat the host's detour avoids */; radiusM?: number; facet?: Record<string, string>; via?:
   WorldPointCm[] /* a charter's course hint */; week: Week; window: AdvanceWindow }`". (V13:833)
63. `WorldWhere.kind` includes `'road'` and `'supplyLine'` (with `edge`, `mode`, `fraction`). (V13:834)
64. `LensElement.label` derivation labels include "likely road" and "likely carriage"; `placed?` "a host fact positioned
   by map geometry (a seat area, a likely road, a site point)". (V13:849–851)
65. `Document.worldRef` written only by the frame's own `charter` event; `Recipe.charter` present exactly when the frame
   was generated or re-derived from a world-sourced charter; "a settlement-first placement's charter lives on the world's
   `Placement` alone, C13-03". A placement whose latitude differs from the recipe's is a `PlacementAnomaly` `sunDiffers`.
   (V13:895–900)
66. Knowledge: a `SitingProposal` defaults `local`; a host fact with no resolved audience is stored DM-only. (V13:904–911)
67. No record named `WorldFacts` is declared in §2.2's code block (the name appears in §1.4 as `WorldFacts.sites`
   pointing at V13 §2.4); see §2.4 below. (V13:618–884; V13:374)

### §2.3 rule tables and §2.4 transients (lines 913–1180)

68. `SuitabilityRule` (`world.suitability`, W6a/W6b): `weights` over exactly eight terms `habitability | discharge |
   lowland | coastType | resource | spring | destination | connectivity`; `reach: { estuaryKm; resourceKm; siteKm;
   overlookKm; roadControlKm; settlementKm }`. (V13:947–951)
69. `world.suitability` shipped values: weights "habitability 1.0 · discharge 0.6 · lowland 0.4 · coastType 0.5 ·
   resource 0.3 · spring 0.4 · destination 0.5 (the world-site term, `reach.siteKm`; SW-01) · connectivity 0.8 (stage 2
   only)"; reach radii "`reach.estuaryKm` / `resourceKm` / `siteKm` / `overlookKm` / `roadControlKm` / `settlementKm` | 10 /
   10 / 15 / 1 / 2 / 20 (the terms' reach radii, V13 §3.7)"; spacing capital 120 km / town 25 km / shrink 0.85 /
   targetShare 0.7; `minPortsPerBody` 2; `portPromote` 1.5; `stage2.connectivityRefRoutes` 3. (V13:1061–1068)
70. The radii `overlookKm` (1), `roadControlKm` (2), `settlementKm` (20) sit in V13's table but name no V13 term among
   the eight weights (V13 §2.2 says V14's purpose terms are V14's plug-ins). (V13:950, 1066; V13:762)
71. `RouteCostLaw` (`world.routes`): `version` (0 the default row), `landBase`, `perM`, `slopePerPct`, `biomeFactor`,
   `classFactor?` ("when present it replaces biomeFactor"), `elevationKneeM?`, `elevationKneeFactor?` ("a step above it
   costs × the factor"), `riverCellAdd?`, `riverCrossing`, `waterPerM`, `seaPerM`, `navigableRiverPerM`, `bears` (each
   term tagged `time` or `choice`; "riverCrossing bears choice"). (V13:952–955)
72. `world.routes` shipped values: landBase 1 / perM 0.001 / slopePerPct 0.15 (time); biomeFactor = each biome's
   `moveCost` (time); knee and river-cell add "absent in the default row (the host's law carries its own)"; riverCrossing
   40 (choice); waterPerM ∞ on land / seaPerM 0.0004 / navigableRiverPerM 0.0006 (time). "a host-bound world reads only
   the host's slice; the default row ours". (V13:1070–1076)
73. `RouteLayRule` (`world.routeLay`): "`{ existingRoute: number; portOnly: boolean; classes: { primaryShare: number };
   routeToleranceM: number; maxCostFactor: number; sea: { trunk: boolean; gapFixRatio: number }; exitRunM: number /* a
   placed frame's road run through the margin to its gate station */ }   // world.routeLay — the map's own network
   formation (W7); never the host's, never a time`". (V13:956–957)
74. `world.routeLay` shipped values: existingRoute 0.5 ("× on a cell already carrying a route: choice only, never in a
   time") / portOnly true; primaryShare 0.3 ("standalone: the first 30 % of edges by seat rank are `highway`, the rest
   `road`; trails join every remaining seat"); routeToleranceM 60 / maxCostFactor 6 ("a path over 6 × the straight cost
   is dropped"); sea.trunk true / gapFixRatio 1.5; `exitRunM` 400 ("a placed frame's road runs through the margin this
   far to its gate station"). (V13:1078–1084)
75. `world.travel` default row (standalone only): kmPerWeek foot 150 / cart 120 / river 250 / coastal 600 / sea 900;
   leg floor 1 / cap 52 / nearest; army 1.5 / news 0.5; reachBandEdgesWeeks 1, 4, 13, 52; reinforcement band 5 army
   weeks; basis absolute. (V13:1086–1093)
76. `PolityRule.military`: `tauMilDays: Record<'seat'|'fort'|'watchpost'|'bridgeFort'|'tollhouse'|'tower', number>;
   garrisonBonus; offRoadFactor; dwellWeeks`; shipped "seat / fort / watchpost / bridgeFort / tollhouse / tower | 0.5 / 1
   / 0.4 / 0.5 / 0.3 / 0.3; 1 band; 2; 4 | a garrison's ride along its roads". (V13:962, 1105)
77. `PolityRule.patrol`: "`{ cadenceWeeks: [1, 4, 13]; hostileDays: number; gradeShift: Record<string, -1|0|1>;
   forceShift: { denserFromBand: number; sparserToBand: number } }`"; shipped "1, 4, 13 / 3 / highway +1, road 0, track
   −1 (hidden: none) / one rung denser from force band 3, one sparser at band 1 and below | a garrison's round trip at
   walking pace; T3's 'military strenght to enforce'". No `trail` row in `gradeShift`. (V13:965, 1110)
78. `PolityRule.river.crossingDays` 0.25 — "the sway's own resistance, never a route time". (V13:960, 1103)
79. `CoherenceRule` (`place.coherence`, P1, P2, P4): "`{ weights: Record<CoherenceCost['terms'][number]['term'],
   number>; lawfulMax; bearingStepCdeg; originSearchM; originStepCells; blendBandM; blendBandMaxM; stationCm;
   edgeRmsRefCm; coastSearchM; riverMatchM; sunDiffersDeg; coarse: { bearings; stations; keep } }`". (V13:970–971)
80. `place.coherence` shipped values: weights "coastSide 3 · riverCrossing 2 · edgeElevation 1 · relief 0.5 · biome 0.3 ·
   territory 0.2 · dossier ∞ (a hard constraint, V13 §3.11.1)"; lawfulMax 4 / bearingStepCdeg 100 (1°) / originSearchM
   20 000 / originStepCells 2; blendBandM 2 000 / blendBandMaxM 6 000 / stationCm 2 500 / edgeRmsRefCm 2 000;
   coastSearchM 3 000 / riverMatchM 1 500 / sunDiffersDeg 5; coarse 36 / 100 / 3. No road weight. (V13:1142–1148)
81. `WorldLabelRule.priority` includes `site` 3; `zoomExtent` site [2, 3]. (V13:1127–1128)
82. §2.4 `WorldFacts` (full): "`{ at; week; demCm; surfaces; reach?; biome; landUse; route?: Id; territory?; sites: Id[]
   /* the site Placements at the cell */; polity: { swayRevision; sway?; holder?; allegiance?; status:
   'held'|'heldByForce'|'debatable'|'unclaimed'; sides?; occupation?; patrols: { power: string; everyWeeks: 1|4|13;
   present: boolean }[]; fighting? }; recent: … }   // worldFactsAt(world, wCm, sinceWeek?)'s answer (V14's E1)`". A
   single `route?` per point. (V13:1171–1173)
83. §2.4 `Blend { box; weights /* smoothstep */; targetCm }` (P2's working record); `worldFactsAt` outside the extent
   answers the nearest edge cell. (V13:1167, 1176–1179)

### §2.5–§2.8 and §3.0 (lines 1181–1404)

84. §2.5 creation keys: `WorldRoute` "(`route`, the two seats' lineages sorted, the mode `land`|`water`) — the class or
   grade an attribute, so a re-grade keeps the id and a land road and a sea leg between one pair keep two";
   `PatrolCadence` "(`patrol`, the route's lineage, the station span, the power)"; `Placement` "(`placement`, the
   subject's docId or site lineage) — so re-placing a frame keeps its placement's address"; `FrameCharter` "a new charter
   per re-placement, the old one a tombstone". Anchors: "a placement by its subject … a route by its ends and mode".
   (V13:1206, 1212, 1213, 1216, 1221–1222)
85. §2.5: a charter's `sites` is a cross-document reference "written whole" (namespaced). (V13:1187)
86. §2.6 `Placement` lifecycle: "an input: kept by every world re-derivation; a world `adjust` that changes the extent
   re-validates every placement (one outside the new extent is reported and kept)"; created by `placeFrame` /
   `requestCharter` + `bindPlacement`, `setPlacement`, `mirrorFrame`, `worldWins`, "V14's adoption". (V13:1241)
87. §2.6 `Placement.blend`'s world cells: re-blended by a placement edit; "a world terrain re-derivation under a placed
   frame re-blends after it (V13 §4.3)"; former values a `TerrainTrace`. (V13:1243)
88. §2.6 `WorldRoute` standalone: "re-derived from their stage (a `setSeats` from W8, a lay-rule change from W7)";
   host-bound: "W7 lays only the edges `genesis` and `network` name"; a happened edit re-lays as a dated lay version;
   always-so/regenerate/adjust mints a lay version the host adopts by re-canonize (`W_HOST_CANON_BEHIND`). (V13:1245)
89. §2.6 `WorldRoute` on a host-bound world: read by "the charter's `roads`, `routes`, `routeFacts`, `mapFeed`, the
   view"; "a legacy campaign's drawn roads stay presentation and become host routes only through the host's elective
   genesis"; "a dead seat's routes keep the host's grades until the host's `network` demotes or abandons them"; "a hidden
   host road is a DM-only ghost, a covert power's patrols omitted". (V13:1250)
90. §2.6 `PatrolCadence` (with `Allegiance`, `MarchHold`): derived, rebuilt on load from the revision; read by the view,
   `worldFactsAt`, the port's `patrolOffer`. (V13:1247)
91. §2.7: "A placement is in the world's digest and in no arena's"; the same for a site subject (SW-11; J-V13.60): "a
   free-standing world site's placement is a `Placement` of the world document keyed by the subject id … the site document
   holds only a `placementRef`"; every placement edit leaves the site document's model digest byte-equal (T-V13-2).
   (V13:1281–1291)
92. §2.7: "a placed frame opened without its world falls back to its recorded charter values and refuses placement
   edits". (V13:1273–1274)
93. §2.8 import: routes `DERIVE` — "`WorldRoute` as W7 re-derives it over the import's seats; the import's routes matched
   by ends and kept as `imported` provenance … W7a/W7b run under the default cost law"; markers → POI records like
   `SitingProposal` with `demand: 'import'`, "handed to V14's G1 as site candidates (V13 §10.2's request)". (V13:1337, 1342)
94. §3.0: "The placement step P1–P5 is not a stage": §7.3 local operators of the placement edits, run by those edits'
   folds and by nothing else — never by `generate` or a Re-derive (C13-27); one stage id `WORLD_PLACE`. (V13:1364–1368)
95. §3.0 stage table: W6a reads "everything above; V14's sites"; W7a reads "`proposals.stage1`, the placements and host
   seats, …, the cost law"; W7b reads "the final seats (proposals, placements, host seats, V14's routed sites), the
   surfaces, `dem`, `biome`, the reaches, the cost law"; W8b reads "the network at the week, the held sites"; P1–P5 write
   "`Placement`, the blend, the charter, the frame's `charter` event, anomalies", stream "none (`place.search` reserved,
   no draw)", ladder F-PLACE. (V13:1386–1393)
96. §3.0: P1–P5 write in the frame document "exactly one thing: the frame's own `charter` event"; "the anomaly list is
   derived — never an arena, a plot, a building, a lock or a hashed field (bar 3; J-V13.5)". (V13:1395–1401)

### §3.1–§3.7 (lines 1405–1697); §3.7 W6 read whole

97. §3.3 (1): a land component is a landmass, "the index W7 and W8 read"; §3.3 (4) the coast polyline is "P1's
   coast-side test input". (V13:1460, 1478–1480)
98. §3.6 (4): a resource inside a placed frame's extent + margin enters the charter's `resources`; the base's siting
   term reads them through the charter, never the raster. (V13:1616–1618)
99. §3.7 preamble: W6 answers three callers with one function — the standalone world, the host (a demand for *n* sites
   of a kind, item 134 (c)) and V14's G3 (a site's purpose weights); "It never creates a settlement"; W6 is two stages,
   run W6a → W7a → W6b → W7b in the declared I/O (C13-33). (V13:1627–1632)
100. §3.7 the plug-in: "The registry holds V13's eight generic terms (below); V14 registers its purpose terms (V14 §2.5)
   through `terms.register(term)` and they are V14's to state — this volume defines none of them (J-V13.51)"; the
   context carries "the routes, the placements, the site placements …"; "No term, V13's or V14's, draws" (SW-03;
   J-V13.53). (V13:1634–1643)
101. §3.7 (1) W6a: `score1(c) = Σ_t w_t · term_t(c)` over the weights except `connectivity`; terms habitability,
   discharge (+`navigableBonus` on a navigable reach), lowland, coastType, resource (within `reach.resourceKm`), spring.
   (V13:1645–1657)
102. §3.7 (1) `destination` (full): "(the world-site term, named so everywhere — V13 §2.3's weight key and
   `reach.siteKm`; SW-01): the placed world sites' pull: Σ over site placements within `reach.siteKm` of the card's
   `attraction` (0–1, read through the resolver) × (1 − d ÷ reach), clamped — the owner's item 134 (c): a site makes the
   ground around it worth settling." The term reads `attraction`; no V13 term reads `SuitabilityContext.sites[].routed`.
   (V13:1658–1661; V13:759)
103. §3.7 (1): a cell on water, on `ice`, or above `reliefLimitM` scores 0; the raster is transient. (V13:1662)
104. §3.7 (2) spacing passes: capital then town, descending score, ties by cell index; shrink ×0.85 up to four times;
   `W_SITING_SPARSE`. (V13:1663–1668)
105. §3.7 (3) ports: a candidate on an `open`, `bay` or `estuary` coast whose landmass has another candidate across water
   × `portPromote`; the highest-scoring port candidate per landmass is a `harbourCandidate`, as is every candidate with a
   navigable reach whose coast type is not `none` (standalone the harbour itself; host-bound a suggestion, the host keeps
   the verdict; J-V13.74); "a water body with fewer than `minPortsPerBody` port candidates on its shores gets none".
   (V13:1669–1676)
106. §3.7 (4) stage 2 (W6b): `connectivity` = min(1, routes of `routes.stage1` touching its cell ÷
   `connectivityRefRoutes`); re-rank, spacing re-applied (never adding, only dropping); W7b routes over the final list;
   one iteration only (J-V13.10). (V13:1677–1681)
107. §3.7 (5) host demand `proposals(world, demand)` with `kind: 'capital'|'town'|'port'|'site'`, `count`, `near?`,
   `withinKm?`, `weights?`, `exclude?`; a host's weights never persist. (V13:1682–1686)
108. §3.7 (6) "The one tie-break of siting, stated once for every caller (SW-03; V14 cites it): two candidates of equal
   score are ordered by the lowest cell index, then by the lexicographic order of their ids — no draw; `world.siting` is a
   reserved concern id with no stream." (V13:1689–1691)
109. §3.7 output: the standalone world's seats are the capital-pass proposals when the recipe gave none. (V13:1693–1694)

### §3.8 W7 Routes — read whole, all eleven points (lines 1698–1777)

110. W7 (1) the seats (full): "The route graph's nodes are the seats: every `Placement` (a placed frame's origin mapped
   to its fine cell), every host seat with a position (through the port), every stage-1 or final proposal when W7 runs
   for W6, and every site placement whose card is flagged `routed` (V14 §2.5's kind row, copied at the drop; SW-20). A
   seat's rank is its tier (a placement's frame tier; a proposal's pass: capital 2, town 1, port + 1; a site 0)."
   (V13:1700–1703)
111. W7 (2) cost surface: land step `d × perM × (1 + slopePerPct × slope%) × biomeFactor[biome(b)]`; + `riverCrossing`
   on crossing a reach ≥ `riverMinM3s` neither cell carries; × `existingRoute` when `b` already carries a route ("what
   makes roads converge"); water cell `waterPerM` (∞) on a land leg; a water leg at `seaPerM` / `navigableRiverPerM`
   "may start and end only at a harbour seat when `portOnly` — on a standalone world a W6 `harbourCandidate`, on a
   host-bound world the port seats the host's genesis water edges name — (a non-port seat reaches the sea by a land leg
   to the nearest port)". (V13:1704–1713)
112. W7 (3) neighbour graph: Urquhart graph of the Delaunay triangulation per landmass (J-V13.11) in integer metres
   (SW-16); across water only port pairs (Urquhart per sea); `sea.trunk` (a landmass with ≥ `minPortsPerBody` ports gets
   one trunk to the nearest port of the largest landmass) and the gap fix (sea cost ≤ 1.5 × land cost). (V13:1714–1723)
113. W7 (4) paths: edges in descending rank, ties by sorted lineage keys; one A* per edge (integer costs × 1 000; the
   heuristic `landBase × perM`; ties by (f, cell index); C13-36) from lower seat to higher, confined to the
   `maxCostFactor` ellipse, `existingRoute` discount against routes already laid; Visvalingam at `routeToleranceM`; a path
   over `maxCostFactor` × straight cost dropped, `W_ROUTE_NO_PATH`, "never a route through the sea". (V13:1724–1734)
114. W7 (5) classes (full): "The first `classes.primaryShare` of land edges by the higher seat's rank are `highway`, the
   rest `road`; an edge both of whose seats are rank 0 is `track`; every seat still unjoined after the passes gets a
   `trail` to its nearest routed cell (one Dijkstra to the route set); water legs are `sea` or `river`. A cell's `route`
   layer is the set of route ids crossing it (the charter reads it at the frame's edge, V13 §3.11.4)." Since a site's
   rank is 0, a site–site edge is a `track`. (V13:1735–1738; V13:1703)
115. W7 (6) reason per route: ends, class rule, cost total, three largest contributions. (V13:1739–1740)
116. W7 (7) the host's law: `classFactor` for `biomeFactor`, `riverCellAdd` on a river cell, × `elevationKneeFactor`
   above `elevationKneeM`; "`existingRoute`, `maxCostFactor` and the classes are lay rules (`world.routeLay`) and never
   enter a time"; integer fields evaluated order-free on the final polyline (J-V13.73). (V13:1741–1746)
117. W7 (8) genesis (full sense): the host sends one frozen `RouteGenesis`; "W7 then lays exactly those edges, in
   host-key order, with the host's grades: no pair selection, no rank classes, no trails to host seats, a water edge as
   one water route between its two port seats; (1)–(5)'s own selection runs only on a standalone world, and a standalone
   world's routes among seats later bound to a host are tombstoned at binding. A campaign whose host has no genesis keeps
   its drawn roads as presentation only." (V13:1747–1752)
118. W7 (9) lived network: "mirrored, never computed": only `chartered` lays new geometry (course hint honoured); a
   demotion keeps the polyline; a revival restores the hidden one; a `bypass` re-lays round the avoided seat's radius as a
   dated lay version; hidden land road a DM-only ghost, hidden water lane a quiet-quay mark; "a grade edit on a host route
   is refused (`refuse.world.hostRoute`) — the DM charters through the host's own command from the world editor, the
   world offering a read-only path preview. The route layer, the frame's road rows (`roadsAt(placement, week)`) and
   siting read the network at the week; a hidden road counts as no public road." (V13:1753–1762)
119. W7 (10): "After birth nothing moves a bound route silently": incremental; happened edit → dated lay version (live
   overlay); always-so / recipe op / adjust / regenerate → lay version adopted only by re-canonize (`W_HOST_CANON_BEHIND`);
   every route outside the edit's transitive closure stays byte-identical, the dry run names the closure. (V13:1763–1768)
120. W7 (11) (full): "Legs end at settlements. On a host-bound world every host route ends at two host settlements; a
   site, a proposal or a junction is a position along a route, never an end, so dropping or removing a site changes a
   route's geometry and effort, never the number of legs. A placed frame's exits are W7's terminals: a highway or road
   meets the town at its gate station after `exitRunM` through the margin, and `requestCharter` lays the town's own links
   before the charter is emitted." The text does not state the mechanism by which a site changes a host route's
   geometry. (V13:1769–1773)
121. W7 edges: one seat no route; two seats on separate landmasses, neither a port: no route (reported); a one-cell
   island seat: no zero-length trail. (V13:1775–1777)

### §3.9 W8 — sites, held sites, border posts, patrols, road watches (lines 1779–2002; read whole)

122. W8a (1) seeds: "A satellite of the host, a world site, a phantom and a dead settlement's remnant add nothing: W8a's
   membership follows the host's exactly". (V13:1790–1793)
123. W8b (5) inputs include "held sites; the host's satellites at their frozen site points; … the road watches"; on a
   standalone world "the recipe's seats at their tiers". (V13:1808–1813)
124. W8b (8) the seat rule: "a seat's own cell and a placed frame's extent are always held by their seat; only an
   occupation marks them". (V13:1864–1865)
125. W8b (9) continuity: a member is continuous by the host's own reach verdict, else a shared bonus-free border, "or a
   road the host does not grade hidden joins its seat to that sway within Treinf". (V13:1876–1881)
126. W8b (10) military: force sources are member seats, continuous members' force, "and each garrisoned site whose holder
   is in the allegiance (its `garrisonBand`)"; "A garrisoned site's footprint is held by its holder even in wild or foreign
   sway — a claim point — except inside a seat's own cell or a placed frame's extent, where the seat rule of (8) holds
   and a foreign-held site is drawn as an occupation mark; a site with no holder projects nothing; a field army is
   presence only". (V13:1891–1903)
127. W8b (11): a raid on a settlement is a `WorldEvent` "at its victim (its place a settlement)". (V13:1910–1911)
128. W8b (12): a satellite is "drawn at its frozen site's point"; "a satellite the host has not placed at a site point is
   neither drawn nor projected (`W_POLITY_SATELLITE_UNPLACED`)". (V13:1929–1935)
129. W8b (13) revision triggers include "a host road grade or a map route edit that flips a continuity". (V13:1945–1946)
130. W8b (14) patrols (full sense): "Per (route segment, power): a cadence of one pass every 1, 4 or 13 weeks, or none. A
   road watch the host asserts comes first (a road the host closes: its closer every week while it stands; a warden's
   term: at least every four weeks; a road the host grades hidden: none). Elsewhere the cadence is the rung that holds
   the round trip at the travel law's foot pace from the power's nearest garrisoned seat, fort or watchpost along the
   segment, moved one rung by an adversarial neighbour within `patrol.hostileDays`, by the host's road grade
   (`gradeShift`) and by the force band of the source … (`forceShift` …)"; both sides patrol their own side of a
   debatable segment; an overlord patrols through a continuous chain; revisioned with the sway; presence `(w + phase) mod
   everyWeeks = 0`, phase "the `world.patrol` hash of (segment, power) mod everyWeeks — one fixed phase … never a roll";
   "a map-tier presentation, never a body the host conserves"; the host never receives the cadence as a time
   (`patrolOffer` sends the extent and its basis); "Drawn as tints per segment (V13 §5.1), read by V14's encounters,
   offered to the host per host edge (`patrolOffer`) and consumed only by the host's choice; a covert power's patrols are
   DM-only". Patrols exist only on route segments. (V13:1963–1979)
131. W8b (15) normalization never removes "a held site's footprint". (V13:1980–1983)
132. W8b (16) border posts (full): "At each revision every route crossing of an allegiance border or a debatable band
   yields a transient `SitingProposal` of demand `borderPost` — a bridge fort at a river crossing, a fort at a pass, a
   watchpost on open ground, a toll house on a highway or road between allegiances that are not adversarial — drawn as a
   ghost pin the DM accepts (a V14 card, map tier) or leaves; nothing unaccepted persists (J-V13.38); an accepted border
   post projects nothing until the host names its holder and garrison." A border post sits on a route by construction.
   (V13:1986–1990)
133. W8 edges: a host seat with no polity facts projects at its tier with the middle rung until the first window.
   (V13:2000–2002)

### §3.10 W9 and §3.11 P1–P4 (lines 2004–2203)

134. §3.10 (2): label candidates — "a site at its placement's origin". (V13:2014)
135. §3.10 (4): a world site's glyph by the same path (SW-08; R-V14-8; J-V13.57): `@plat/sites` runs its own `glyphOf`;
   the world places it as a `Glyph` with `subject: 'site'`. (V13:2041)
136. §3.11 preamble: `PlaceContext { world; frame; frameSize; edit; rules: CoherenceRule; mode:
   'worldFirst'|'settlementFirst' }`; "The mode is a fact of the edit": `worldFirst` for `requestCharter` and every later
   edit of a placement whose frame carries a `Recipe.charter` from this world; `settlementFirst` for `placeFrame` of an
   existing frame without one. (V13:2050–2056)
137. §3.11 preamble (full): "A `Placement` whose subject is a site (V14 §3.4 (a); SW-19) takes the site document as the
   frame through every edit below; its placement lives in the world document and the site document holds only its
   `placementRef` (V13 §2.7; SW-11). The operators never call V14 (SW-10; J-V13.59): P4/P5 end by emitting the outcome
   row `placed { placement; subject; extent; covers: Id[] /* the site placements the new extent covers */ }`, which …
   `@plat/api` publishes as the message `world.placed`; `@plat/sites` listens and runs its own adoption (V14 §3.9 (e))."
   (V13:2056–2061)
138. §3.11 world-first order: `requestCharter` creates the `Placement` with `precedenceStamp: 'world'`, `subject: {
   kind: 'frame', pending: Uuid }`, `coherenceCost: { total: 0, terms: [], lawful: true, detail: 'world-first' }` — "P1
   is not run, there is no frame to measure — and runs P4 only"; `frameOf(size, aspect)`; a `growPlacement` edit re-emits
   the charter at the new ring under a `world` stamp or re-blends under a `settlement` stamp; `bindPlacement` sets
   `subject.doc`. (V13:2061–2071)
139. §3.11 settlement-first order: "`placeFrame` runs P1, P2, P3, P4 (the settlement-sourced charter, stored on the
   `Placement` only) and P5". (V13:2071–2073)
140. §3.11.1 P1: `coherence(...)` "returns the `CoherenceCost` whose six terms are" — the table then lists seven rows:
   `coastSide`, `riverCrossing`, `edgeElevation`, `relief`, `biome`, `territory`, `dossier` (weight ∞). (V13:2076–2087)
141. §3.11.1 the coherence terms table (raw costs): coastSide 0 / 2 (adjacent side) / 3 (opposite or absent), "so at
   weight 3 any coast error is unlawful (6 > `lawfulMax` 4; C13-26) and the port is first turned"; riverCrossing per frame
   reach 0 / 0.5 / 1 (within `riverMatchM` 1 500), a navigable world reach entering with no frame reach 1; edgeElevation
   RMS ÷ `edgeRmsRefCm`; relief |Δ range| ÷ `edgeRmsRefCm`; biome 0 / 0.5 / 1; territory "0 when the land is unclaimed or
   of the same allegiance; 0.5 when debatable; 1 otherwise — evaluated once, stored in `Placement.coherenceCost`, never
   re-scored by a later sway revision (politics never re-opens a placement)"; dossier 0 / ∞ (C13-08; J-V13.50). No row
   measures roads or road access. (V13:2079–2087)
142. §3.11.1 bearing search: every bearing in `bearingStepCdeg` steps (360), mirrored set only when `mirrorAllowed`
   ("never by default: the DM's explicit `mirrorFrame` only"); best = least total, ties by smaller bearing, then
   unmirrored. (V13:2089–2093)
143. §3.11.1 `nearestLawful(world, frame, origin)` (full sense): spiral over the fine grid out to `originSearchM` in
   `originStepCells` steps, two tiers (C13-37): coarse pass at 10 × step, 36 bearings, only `coastSide` and
   `riverCrossing` (plus `dossier` where one applies) over 100 stations; the three best take the full terms at 1° over 400
   stations; "returns up to three lawful placements by ascending `total`, ties by distance from the asked origin; none
   found → `F-PLACE` rung 'no lawful placement within reach' (the asked placement is kept, flagged unlawful, and the three
   least-cost unlawful ones are offered)"; dry run `placeFrame` with `preview`. (V13:2093–2102)
144. §3.11.2 P2 blend (settlement-first): band `blendBandM` outside extent + margin, widened up to `blendBandMaxM` (+1 000 m
   per retry, three retries); smoothstep; "the DEM inside the frame's extent + margin is replaced by the frame's dem
   re-based (the frame is the truth inside its own ground — the owner's rule: the settlement never changes)"; one
   `TerrainTrace` (`oldGround`), "a placement is always `happened`"; `W_BLEND_CLIPPED` before `W_PLACE_BENT`; the cost
   re-measured after the blend and reported — "the cost is reported, never hidden". (V13:2104–2115)
145. §3.11.3 P3: dirty set extent + margin + band grown to touched watersheds; W4 re-run; reaches keep ids by ≥ 50 %
   overlap; groundwater and W5 re-read; "W6's proposals inside the set are dropped"; P3 never writes the frame. No step of
   P3 re-lays or touches routes. (V13:2117–2125)
146. §3.11.4 P4 (6) `roads` (full): "every world route crossing the ring, with the class mapped to §2.4's `WayClass` as
   the record says and capped in class and count by the dossier's access word, the bearing in frame terms, `toward` the
   next host settlement along the route (never a site, a proposal or a junction) with its effort, a highway or road
   crossing `forced` — S3 (4) picks its gate there and routes it through the margin to its station (BCR-V13-30) — and a
   hidden host road marked `hidden`; sea and river routes bind to the harbour and the landings." (V13:2143–2147)
147. §3.11.4 P4 (10): "`resources`, `sites`, `territory`, `polityAtCharter`: W5's resources and V14's sites inside or
   over the extent, in frame cm; …". (V13:2153–2155)
148. §3.11.4 `charterFrom(frame, blend)` (settlement-first) is built "from the frame's own edge (its dem, its water
   bodies' edge crossings, its ways at the edge, the climate row …) — what the world now owes the frame". (V13:2159–2161)
149. §3.11.4 where a charter lives: world-sourced on the `Placement` and in the frame's `Recipe.charter`;
   settlement-sourced on `Placement.charter` only; "the frame's next Regenerate (keep settings) is byte-identical"
   (T-V13-13; "the settlement never changes but by `mirrorFrame` or `worldWins`"). (V13:2161–2168)
150. §3.11.4 dossier precedence: "the charter fills `map`-tier inputs only (the edge profile, the water levels, the
   crossings' discharge, the roads, the table, the biome's land-use shares, the resources, the territory)";
   `refuse.charter.dossier` names the fact and the nearest lawful origin. (V13:2170–2181)
151. §3.11.4 transient form: `charterFor(world, TransientPlacement)` "writes nothing … a view read"; V14's E1 (4) calls
   it for a world crop frame (100 m; the click as `originCm`), `WORLD-9`. (V13:2183–2188)
152. §3.11.4 S0 reads "`charter.sites` as drawn constraints (V14's adoption)". (V13:2195–2196)

### §3.11.4 (end), §3.11.5, §3.11.6 and P1–P5's output (lines 2203–2470)

153. §3.11.4 S1 reading: "S1's ways-at-the-edge (S4's arterial seeds, §4.2) take `charter.roads`"; an `out` river
   crossing missed reports `W_CHARTER_RIVER_MISSED` ("a coherence fact, never a failure"). No analogous report is named
   for a charter road the frame's ways do not meet (the anomaly `roadToNowhere` is §2.2's). (V13:2216–2219; V13:788)
154. §3.11.4 deterministic refinement: the frame's S1 is a pure function of (`Recipe.seed`, `Recipe.charter`, the
   tables); the declared deviation until BCR-V13-29 lands (C13-05) recorded in V13 §12. (V13:2220–2230)
155. §3.11.5 (1) the stamp and forced-fact precedence (J-V13.75): `world` ladder — dossier > DM's locks and drawn
   constraints > charter's boundary facts > tier priors > terrain plausibility > draw; `settlement` ladder — dossier >
   the frame whole, world facts only as derived readings; "`worldWins` is the only path from the second ladder to the
   first". (V13:2234–2241)
156. §3.11.5 (1) re-derivation: a world terrain re-derivation under a `settlement` stamp re-blends after it; under a
   `world` stamp the charter is marked stale and the DM offered `worldWins`; a world edit contradicting a dossier fact of
   a world-stamped frame raises `W_EDIT_DOSSIER` "with three choices: `keepDossier` (the stamp becomes `settlement`, …),
   `moveTown` (the nearest lawful origin; not offered when `Placement.hostLocked`), `cancel`"; "No lawful origin leaves an
   unlocked frame standalone; on a `hostLocked` placement the edit is refused (`refuse.place.hostLocked`) unless the DM
   takes `keepDossier`"; a dossier event changing DR1/DR29 re-runs P1's bearing search at the fixed origin then P2–P3
   ("the origin never moved under `hostLocked`"); no blend meets it → `W_PLACE_ANOMALY` with the nearest lawful origin
   offered. (V13:2241–2253)
157. §3.11.5 (2) mirror: `mirrorFrame` sets `mirrored`; frame arenas never change; the verb warns and the DM confirms;
   "the coast mismatch is resolved by bearing first, the world's blend second, the settlement never unless the DM
   explicitly chooses the mirror or `worldWins`". (V13:2254–2260)
158. §3.11.5 (3) world-wins: replaces `Recipe.charter` with `charterFor(world, placement)`, Re-derive from S1 with
   carry-over (locks and drawn constraints kept); stamp → `world`; blend trace restored, P3 re-runs over the former band;
   "the only verb that changes a settlement's generated facts from the world"; DM's explicit choice with a confirmation
   naming the change count. (V13:2261–2266)
159. §3.11.5 (4) orientation terms table: sun (`sunDiffers`), wind (`windSide`), sea side ("the harbour's facing, the
   coastal road, the quay fronts" → `coastInland`), seasonality (none), compass, river flow (`riverUphill`), water table
   (`lockedBelowTable`), territory and culture (no anomaly; "a sway revision never re-emits the charter and never stales
   the frame"). No row of the table recomputes roads or produces `roadToNowhere` / `roadUnmatched`. (V13:2267–2278)
160. §3.11.5 (4) the DM's choices per anomaly (full): "The anomaly list is `PlacementAnomaly[]` (V13 §2.4), shown on the
   placement card and in the clerk's `why placement`, with the DM's choices per anomaly: keep (default), or `worldWins {
   placement, ids: [the anomaly's subject] }` — the scoped form of the one verb (V13 §4.1: the named entities re-derived
   from the world's charter with §6.3's carry-over, confirmed with the change count) — so the owner's two verbs stay the
   only two ways a settlement changes (C13-25)." (V13:2279–2284)
161. §3.11.6 consumption law (J-V13.70): every answer the host consumes mid-campaign ("a founding's site, a
   resettlement's charter, a re-derived border, patrol coverage") is requested between advances or at an advance head;
   two feeds (J-V13.71): simulator feed `canon`, optional `routeFacts`, `patrolOffer`; map feed `derivedFacts`,
   `mapFeed`, `routes`, `pathGeometry`, `borderSegment`, `placeOf`. (V13:2287–2299)
162. §3.11.6 the canon's **sites slot** is "frozen candidate ground per seat inside its orbit, as points with their
   terrain class and step cost under the host's cost law … (a satellite founded on it never joins the travel slot)"; "no
   political, overlay, lived-route or belief input enters it". (V13:2307–2313)
163. §3.11.6 `routeFacts` (per host edge: host key, land effort-metres, water metres, per-class effort, crossings,
   seasonal sets — never `costTotal`); `patrolOffer(world, revision)` → per host edge and power: the extent, the basis
   and "the host key of the nearest garrisoned seat or site — never a time-derived cadence"; both optional behind the
   host's switch. (V13:2344–2351)
164. §3.11.6 `SettlementMapRecord` carries `routes: string[] /* host edge keys */`, `waterAccess`, `coherence:
   CoherenceCost`. (V13:2354–2360)
165. §3.11.6 `mapFeed` carries route paths keyed by host edge, the patrol tints, the crossing holders; "The DM-placed
   devotion sites (V14 §2.2's `SiteDevotion`) ride the DM's map feed as offers … which the host adopts only by its own
   command". (V13:2361–2373)
166. §3.11.6 `pathGeometry(world, hostPath)` — "the path a host route takes through the seat territories' crossings, laid
   on demand under the cost law and frozen at its dispatch week (a derived path, never a `WorldRoute`)". (V13:2374–2376)
167. §3.11.6 `charter(world, campaign)`: the host names origin, bearing, frame size; "For a settlement the host founds in
   a world-first campaign, the host derives its access word from the charter's road and water facts, and its terrain
   word … before generation." (V13:2379–2386)
168. §3.11.6 inbound recorded: `importSeats` — "a canonized row is never moved — the world bends locally around it,
   bearing first, the blend second —, unverified rows sited by W6 and offered, `W_IMPORT_PLACEMENT_UNVERIFIED`";
   `hostRequires` refuses a stranding edit (`refuse.world.hostRequires`) unless `keepResidual`; `genesis` once at world
   birth; `network` per window. (V13:2395–2405)
169. §3.11.6 presentation input `beliefView` carries "the believed standing and danger of places and roads in banded
   words". (V13:2418–2420)
170. §3.11.6 port law (8): a phantom is never "patrolling"; law (9) one word one meaning: "'road patrol'"; "the political
   boundary on a route is a border crossing, never a *gate*, and a site posted there a **border post**"; `routeClass`
   "is never sent as a route's class". (V13:2440–2452)
171. §3.11 output of P1–P5 (full sense): "the world's routes and seat territories re-run when the placement adds a seat
   (standalone: W7 and W8 over the dirty landmass only; host-bound: W7 lays the edges the host names for the new seat,
   and the new seat territory and its crossings are offered to the host's re-canonize, `W_HOST_CANON_BEHIND` until
   adopted …)". No re-run is named for a placement whose subject is a site. (V13:2458–2462)
172. §3.11 edges: a frame wholly in the sea → `nearestLawful` offers the shore; larger than the world refused ("does not
   fit"); overlapping extents refused unless `W_PLACEMENT_OVERLAP` accepted, "except where one subject is a site (SW-10):
   admitted, the `placed` outcome row's `covers` names the site placement and `world.placed` is posted (V14 adopts)";
   overlapping margins admitted (item 135 (c); C13-05). (V13:2462–2470)

### §3.12–§3.14 (lines 2472–2694); §3.14's effect on placements and routes

173. §3.13.3 a site's water summary: `access` = "the best route class over its entrances; `none` closes the site to
   anyone without another way in" — a water-passage class, distinct from road access (port law (9): `routeClass` never
   sent as a route's class). (V13:2597–2599; V13:2451–2452)
174. §3.13.5: a locked unit's class is reported as `PlacementAnomaly` `lockedBelowTable` / `lockedInWater` "when a
   placement or cascade puts it under a surface". (V13:2614–2616)
175. §3.14.1: "a placement is always `happened`, C13-55"; an edit is stored at the scale it was made ("the world never
   rewrites a frame's log, the frame never the world's"). (V13:2630, 2636–2637)
176. §3.14.2 cascade step 5 (world): "W5's biomes, W6's proposals, the charter's facts of every placement in the set
   (marked stale when changed), the glyphs' `water` marks, W7's crossings (a route crossing a moved reach re-costs its
   edge), W8a (… on a host-bound world an offer to the host's re-canonize), W8b at the next revision"; (frame) "every
   site document whose anchor or placement lies in the dirty set (V14's G6 and the site's lifecycle)". (V13:2650)
177. §3.14.2 cascade step 6 (world): "the world marks every placement whose charter facts moved (`Placement.charter`
   stale) and offers `worldWins` per frame; it never writes a frame"; (frame) posts `charter.stale`. The cascade moves no
   placement origin. (V13:2651)
178. §3.14.3 row 2: a `setField(terrain)` where a seat's cell becomes water → "W8 re-runs over the landmass (the seat
   moved to its nearest land cell with `W_POLITY_SEAT_MOVED`), W7 re-routes it"; assertion "the seat's new cell is land".
   (V13:2669)
179. §3.14.3 row 3: `setPlacement` of a placed frame → "P1 → (P2, P3 settlement-first) → P4 → P5 → the glyph → W7 and W8
   over the landmass → W9's label candidate"; assertion "the glyph, the routes to the seat, the territory and the label
   anchor follow the placement". (V13:2670)
180. §3.14.3 row 6: `setAttr(subtype)` / `setAttr(open)` → "W7's water legs" among consumers. (V13:2673)
181. §3.14.3 row 11: `costLaw` through the port → "W7a/W7b over every edge (declared whole-world)". (V13:2678)
182. §3.14.3 row 13 (full): "`setAttr(class)` on a `WorldRoute`, or a seat removed by `setSeats` | W7b over the landmass
   (the discount changes), the charter's `roads` of every placement the route crossed, W6b's `connectivity` term | the
   charters' `roads` and the proposals' `connectivity` terms change; no route touches a removed seat". (V13:2680)
183. §3.14.3 row 16 (full): "relocating a settlement does not re-route its roads | `setPlacement` of a seat's frame, or a
   standalone seat moved through `setSeats` (a host seat's origin is the host's, refused under its move-lock) | W7a/W7b
   over the landmass; the charter's `roads` of the moved frame | every route whose end is the seat ends at its new cell;
   the old polyline is gone". (V13:2683)
184. §3.14.3 T-V13-21b consumer list item (15) "W7's river crossings", (19) "V14's G6 over every site document whose
   anchor or placement lies in the dirty set". No consumer row names a site's road access. (V13:2687–2694)

### §3.15–§3.18 (lines 2696–2819)

185. §3.15 (3) import stages: "W6a, W7a, W6b and W7b run over the seats under the default cost law, the import's routes
   matched by ends and kept as provenance"; markers become POI candidates for V14's G1. (V13:2749–2754)
186. §3.16 F-PLACE (full row): class "a placement cannot be made as asked"; detections **does not fit**, **no lawful
   placement within reach**, **blend over band**, **overlap**, **charter miss** (`W_CHARTER_RIVER_MISSED` on a world-first
   frame), **anomaly** (§3.11.5's locked-term anomalies); ladder: does not fit refused (`refuse.place.fit`, smallest
   fitting rung named); no lawful "the asked placement kept, flagged unlawful, the three least-cost offered
   (`W_PLACE_NO_LAWFUL`)"; blend over band → `W_PLACE_BENT`; overlap refused unless accepted (`W_PLACEMENT_OVERLAP`);
   charter miss "a coherence fact in the placement card, never a failure"; anomaly "reported with the DM's two choices
   (keep, or the scoped `worldWins`; C13-25)"; tests T-V13-23, T-V13-24, T-V13-13. No F-PLACE detection names a road.
   (V13:2774)
187. §3.16 F-WORLD: "no path: W7's Dijkstra reaches no end or exceeds `maxCostFactor`" → "the pair unjoined, reported";
   "seat: a W8a seed on water or ice" → moved to nearest land (`W_POLITY_SEAT_MOVED`). (V13:2772)
188. §3.17: `world.siting` reserved (siting draws nothing; tie-break §3.7 (6)); `world.polity` and `place.search` reserved
   ids, not streams ("W8 and P1 draw nothing"); `world.patrol` "a fixed-key reading and never a stream", "the week never
   enters the key"; every Dijkstra and flood keyed on (cost × 1 000 rounded, cell index); W7 work limit Σ over edges of
   the search ellipse's cells; a limit reached: "W7 drops the remaining lowest-rank edges". (V13:2780–2805)
189. §3.18 edges: (1) a world with no land — a placement "unlawful everywhere (… `W_PLACE_NO_LAWFUL` with no offer)"; (5) a
   deleted frame document — placement stays with a stale glyph and a report; (7) `refuse.place.worldRef`. (V13:2809–2817)

### §4 Editing (lines 2821–2982): §4.1 placement edit events, §4.3 locality, §4.4 undo

190. §4.1 `requestCharter` event: "`{ t: 'requestCharter'; subject: { kind: 'frame'; pending: Uuid } | { kind: 'site';
   site: Id }; originCm; bearingCdeg; frame: { widthCm; heightCm; marginCm } /* frameOf(size, aspect) */ }` // world-first
   (C13-04): creates the Placement (stamp 'world', cost 'world-first') and runs P4; author 'host' through
   WorldPort.charter, else 'user'". A site subject is admitted in `requestCharter`. (V13:2833)
191. §4.1 `bindPlacement { placement; doc }` (author `world`); `placeFrame { frame; originCm; bearingCdeg; preview?;
   accept?: ('overlap'|'unlawful')[] }` ("settlement-first; always `happened`"); `setPlacement { placement; originCm?;
   bearingCdeg?; accept? }`; `mirrorFrame { placement; mirrored; confirmed: true }`; `worldWins { placement; ids?;
   confirmed: true }`; `unplaceFrame { placement }`; `growPlacement { placement; size }`. `placeFrame` names a `frame:
   Uuid` only — no site form of `placeFrame` is declared. (V13:2834–2839, 2847)
192. §4.1 `setSeats` refused on a host-bound world (`refuse.world.hostSeats`); `bindSeat`, `unbindSeat`, `importSeats`
   author `host`. (V13:2840–2843)
193. §4.1 `setAttr` admits "a standalone route's `class` (a host route's grade is the host's: `refuse.world.hostRoute`);
   a placement's `bearingCdeg`, `originCm` — the last two sugar for `setPlacement`". (V13:2858–2860)
194. §4.1 new refusals include `refuse.place.fit`, `refuse.place.worldRef`, `refuse.charter.dossier`,
   `refuse.place.hostLocked`, `refuse.world.hostSeats`, `refuse.world.hostRoute`, `refuse.world.hostRequires`
   (`keepResidual`), `refuse.world.hostPolitical`. (V13:2863–2868)
195. §4.1 warnings with `ConflictAction`s: "`W_EDIT_DOSSIER` (`keepDossier`, `moveTown` where the placement is not
   host-locked, `cancel`; V13 §3.11.5 (1)), `W_PLACE_NO_LAWFUL` (`keep`, `takeOffer` with `offer: n`, `cancel`),
   `W_PLACEMENT_OVERLAP` (`accept`, `cancel`), `W_CHARTER_RIVER_MISSED`, `W_SURFACE_BELOW_BED`, `W_PLACE_ANOMALY` (`keep`,
   `worldWins` with `ids`) — `ConflictAction.kind` gaining `'keep'|'takeOffer'|'accept'|'cancel'` and `offer?: number`
   (BCR-V13-9)". No action named `worldWins` appears on `W_PLACE_NO_LAWFUL`; `moveTown` appears only on `W_EDIT_DOSSIER`.
   (V13:2872–2876)
196. §4.1: "A placement edit is always `happened` (`verb` ignored on it; its `oldGround` trace covers the extent + margin +
   band, C13-55)". (V13:2878–2880)
197. §4.2 T6 `place`: *Charter here*; outline dragged; rotation handle; "the coherence cost by term beside the pointer
   (V13 §3.11.1; green at lawful), the three offers as ghost outlines on request (`nearestLawful`), the mirror toggle
   (warned), the `worldWins` button on a stale charter"; shows "the anomaly list". (V13:2888)
198. §4.3 locality rows: `placeFrame` / `setPlacement` (settlement-first) → "P1 → P2 → P3 → P4 → P5 → W9 (the glyph) →
   W7–W8 over the landmass when the frame is a new seat" (W7–W8 declared); `bindPlacement` → "… P5 → W9 → W7–W8 over the
   landmass (a new seat)"; `mirrorFrame`/bearing only → "P1 → P4 → P5 → W9" (no W7); `setPlacement` (origin) of a
   world-first placement → "P4 (the charter re-emitted, marked stale on the frame) → P5 → W9 → W7–W8 over the landmass";
   `worldWins` → on a site subject "V14's G5 (f) re-materialization under the new charter … run by `@plat/sites` on the
   `placed` row (SW-19)"; `unplaceFrame` → "the blend trace restored, P3 over the former band, the placement, charter
   and glyph tombstoned; W7–W8 over the landmass"; `bindSeat … genesis, network` (host-bound) → "W7 over the named edges
   only". (V13:2905–2914)
199. §4.3 a `worldRecipe` op pins "every placement (its blend re-applied after W1 under a `settlement` stamp; its charter
   marked stale under a `world` stamp …)"; `adjust` of `world.size` keeps placements inside the new extent, "one outside is
   kept and reported". (V13:2901, 2916)
200. §4.3 edit fates: "a placement is `kept`; a proposal inside a changed watershed `discarded`"; recorded inputs of the
   world "its recipe, its seats and every placement". (V13:2919–2922)
201. §4.4 undo: a placement edit's undo restores the former placement, blend and charter copy and emits the inverse
   frame `charter` event; world and frame have separate logs and undo stacks; the world's undo record holds the pair;
   "The frame's user cannot undo the world's placement from the frame; `unplaceFrame` on the world is the way"; a host
   input is never a user's undo target; a `consumed` world edit is sealed; T-V13-27. (V13:2926–2940)
202. §4.7 the clerk's `placeAt` proposal "is `nearestLawful` rendered as a proposal the user accepts"; `whatIf` renders
   "the coherence cost for a placement". (V13:2976–2979)

### §5.1–§5.8 (lines 2984–3205): anomaly pins, route styles, sites in the view and the lenses

203. §5.1 `routes` layer (full row): "`WorldRoute` by class, or by the host's grade on a host-bound world, at the network
   in force at the view's week; a hidden host road a DM-only ghost, a hidden water lane a quiet-quay mark; lengths
   labelled in km (never a travel time on the world view: times are the host's, or `derivedTime` labelled with the law and
   'on foot') | highway 2 px solid, road 1.2 px, track 0.8 px dashed, trail 0.5 px dotted, sea 1 px dashed blue, river
   (navigable) a darker water line". (V13:3000)
204. §5.1 `patrols` layer: "`PatrolCadence` per route segment at the revision in force at the view's `lensWeek`: tinted
   by cadence (weekly, monthly, seasonal), both colours striped on a debatable segment, no arrows or headings; a covert
   power's DM-only". (V13:3004)
205. §5.1 `settlements` layer: every `Glyph`; "a site's drawn at level 0 by its `glyph` mark's `class` icon at the pin
   size (SW-08)". `proposals` pins "W6's proposals (while shown)". `placements` layer: placed frames' outlines and the
   blend band's outline on hover. (V13:3007–3009)
206. §5.1 `anomalies` layer (full row): "`anomalies` | pins | `PlacementAnomaly` | the notice style". (V13:3010)
207. §5.1 `sway` layer: "satellites dots only, at their frozen site points". (V13:3002)
208. §5.1 player picture: covert patrols omitted as entities, never greyed; `seatTerritory`, `sway`, `occupation`,
   `debatable`, `fighting` are the sway lens and `patrols` the patrols lens, "their scrub the sway's revision history".
   (V13:3013–3024)
209. §5.1 frame overlays: the encounter crop reads `classifyWater` and "`routeClass` over its ways (V14's E3 (7))".
   (V13:3033–3034)
210. §5.2 hover placement card shows "name, tier, population, the stamp, the coherence cost by term, anomalies, `open`,
   `worldWins` when stale". (V13:3047–3048)
211. §5.4 exports: `ecosystemGeoJson` routes "LineString with class or grade"; `worldCsv` includes routes; settlements
   Point with `placement` properties (origin, bearing, mirrored, stamp). (V13:3065–3067)
212. §5.7: routes and patrol tints draped on the DEM (`{ surface: 'dem' }`). (V13:3095–3099)
213. §5.8 preamble: four places where nearness picks include "a satellite's site"; "a lens draws nothing at random, and
   sends the host nothing but the DM-placed site offers". (V13:3110–3116)
214. §5.8 (4): class (c) placement includes "a path laid by `pathGeometry` for a link's 'likely road'; a frozen site's
   point"; class (d) "the sway and the patrol cadence the owner's territory rules asked for, labelled 'projection'"; "A
   world site the DM placed (V14) is the map's own fact, class `dmPlaced`, labelled 'DM-placed'"; refused: "an effect the
   host does not apply (a patrol lowering danger, …)". (V13:3154–3166)
215. §5.8 (5): transfers the host nets within one week draw as dated links "along the host's own links, never along a
   road"; movers the host clocks as moving markers "along a placed path". (V13:3167–3169)
216. §5.8 (6) one word one meaning: "*gate* is written a border crossing, a route's intermediary settlement or a town
   gate, never bare; *toll* names which of its meanings it is". (V13:3173–3175)

### §5.9 the lenses — patrols, roads, held sites (lines 3207–3428; read whole)

217. §5.9 (1) plague: hop "no road implied"; refusals include "a border, march, patrol, army or migrant drawn carrying
   or stopping it". (V13:3230, 3240–3242)
218. §5.9 (2) sway lens elements include "satellites | `PolityFacts.satellites` | dots at their frozen site points | S,
   placed"; refusals "a debatable land drawn as a road hazard". No sway-lens element draws a held site (`PolitySite`) as
   its own element. (V13:3266, 3269–3270)
219. §5.9 (3) patrols lens (full): regimes **watched** (road watches sent, drawn first), **derived** ("the cadence from
   garrisons, hostility, grade and the force band only; the garrison input a proxy until force bands are sent"),
   **still** ("no route laid, or no seed"); elements cadence (`PatrolCadence`, M "projection", DM; covert DM-only), "a road
   the host closes | `roadWatch` (`closed`) | a closed-segment mark, legend 'cut by the DM: the host names no closer and
   its caravans do not heed it (until H25)' | S | watched | DM | host-dated", "a warden's term | `roadWatch` (`warden`) |
   the warden's colour on the segment", "a post's sight | `@plat/world/sight` | the post's viewshed on hover | P";
   refusals "a patrol drawn lowering danger or holding a quarantine line; a cadence sent to the host as a time"; not drawn
   "the character of a route's intermediary settlements"; "a road's escort quality". (V13:3273–3289)
220. §5.9 (4) trade: "likely road | `pathGeometry` over the host's edges | a route flow labelled 'likely road' | P |
   arrivals, loads, on the DM's request | DM"; "entrepôt heat … at the route's intermediary settlement"; "cut and chartered
   roads | the DM's road events | marks, legend as the patrols lens's | S | — | DM | host-dated"; not drawn "seizures at a
   route's worst intermediary settlement". (V13:3309–3314, 3321)
221. §5.9 (5) populations: columns "a moving marker … along a likely road (labelled) … sea along the water lane's laid
   path"; satellites "dots at their frozen site points". (V13:3341–3342)
222. §5.9 (6) religion: "holy and hidden cult sites | V14's cards with a `devotion` (V14 §2.2) | the site's mark in its
   deity's colour, labelled 'DM-placed' | DM-placed | every | DM-only by default"; refusal "a holy place or cult site the
   map generates or positions". (V13:3378, 3383–3384)
223. No lens of §5.9 draws a site's road access or a site's link to the route network. (V13:3207–3428)

### §6 budgets and §7 tests — T- rows on placement and routes (lines 3430–3643)

224. §6 budgets: W7a + W7b "Σ over edges of the search ellipse's cells (A*, V13 §3.8; C13-36)" 60 / 200 / 520 ms
   (province / realm / continent), "300 edges at the continent rung ≈ 6 × 10⁷ cells"; a placement edit (settlement-first,
   CITY) ≤ 250 ms (P1 ≤ 40, `nearestLawful` ≤ 600 ms by two tiers, P2 ≤ 30, P3 ≤ 120, P4 ≤ 10, P5 ≤ 20, glyph ≤ 30); a
   `requestCharter` ≤ 30 ms; "the anomaly list ≤ 5 ms"; register `WORLD-2` placement edit ≤ 250 ms, `WORLD-3`
   `nearestLawful` ≤ 600 ms, `WORLD-9` transient `charterFor` ≤ 10 ms, `WORLD-10` a caller's score pass. No budget row
   names a site's road link or a site relocation. (V13:3447, 3471–3479, 3489, 3496–3503)
225. T-V13-2 (bar 3): every placement edit "(`requestCharter`, `bindPlacement`, `placeFrame`, `setPlacement`,
   `mirrorFrame`, `unplaceFrame`) leaves the frame's model digest byte-equal". (`worldWins` is not in the list.) (V13:3533)
226. T-V13-10: the clerk answers for "a placement". T-V13-15: invariants include "every route's polyline stays on land
   cells on land legs; every placement's extent lies inside the world". (V13:3536–3537)
227. T-V13-12: orientation terms after a bearing change; "each locked anomaly kind is reported on its fixture" — "four
   fixtures, one per anomaly kind". (V13:3564)
228. T-V13-13: the charter honoured in the world-first order; "every `in` crossing enters at its station ± `riverMatchM`
   …, every `out` crossing leaves"; no clause asserts the charter's `roads` are met by the frame. (V13:3550)
229. T-V13-14: "two seats on separate landmasses without ports stay unjoined; a seat on water moves to land". (V13:3565)
230. T-V13-23 (F-PLACE): refused larger than world; unlawful keeps asked and offers three; extent overlap refused/accepted,
   margin overlap admitted; `nearestLawful` sorted by cost then distance; "no placement with a coast-side error is ever
   `lawful` (C13-26)". (V13:3566)
231. T-V13-24: the blend; a dossier re-terrain event re-runs P1 at the fixed origin then P2–P3, "the origin unmoved under
   `hostLocked`". T-V13-36: P3. (V13:3567–3568)
232. T-V13-37: "a land road and a water leg between one pair keep two ids and a re-grade keeps the id"; `score` as V14's G3
   calls it refuses a cell whose hard term is 0, bit-identical across two calls. (V13:3569)
233. T-V13-38: W6 spacing; "ports are promoted on coasts only; stage 2 drops, never adds". (V13:3570)
234. T-V13-39: W7 and W8 — integer-metre `delaunay` input; "no land leg crosses water; the `existingRoute` discount makes
   later roads share earlier cells (the shared-cell share ≥ 20 % on B-WORLD-lite, own bar)". (V13:3571)
235. T-V13-16: "route length per seat 40–200 km" among the B-WORLD statistics bands. (V13:3578)
236. T-V13-41 (f): "a vassal beyond Treinf is an exclave, a new road within it makes it continuous at the next revision,
   the host grading that road hidden makes it an exclave again"; (u) a bypass re-lays round the avoided seat's radius as
   a dated lay version under the same host key. (V13:3587)
237. T-V13-42 patrols: `patrolAt` identical across runs, exact cadence on its fixed phase; coverage moves only at
   revisions; `patrolOffer` carries no time; a closed road covered by its closer every week; a hidden road has none; both
   sides patrol a debatable segment; force-band shifts. (V13:3588)
238. T-V13-43 (full): "time: two routes sharing a corridor report equal effort per shared metre whatever their laying
   order; a site dropped on a host route leaves the leg count unchanged and moves its effort by the detour only; after a
   seat is added every leg outside the closure keeps identical time fields and every changed leg appears in `timeDelta`;
   a band crossing raises `W_TRAVEL_BAND_CROSSED`; …". (V13:3589)
239. §7.5 codes: `W_ROUTE_NO_PATH` (W7, the two seats); `W_POLITY_SEAT_MOVED` (W8a); "`W_PLACE_NO_LAWFUL`, `W_PLACE_BENT`,
   `W_PLACE_ANOMALY`, `W_PLACEMENT_OVERLAP`, `W_CHARTER_RIVER_MISSED`, `W_CHARTER_WIDTH_CLAMPED`, `W_BLEND_CLIPPED` |
   warning | the placement operators, S1 | the placement, the cost or residual, the anomaly, the other placement, the
   crossing". No road-specific code (e.g. a charter road missed) is listed. (V13:3616–3617, 3630)
240. §7.5 bars: bar 3 → T-V13-2; bar 13 → T-V13-21. (V13:3639–3643)

### §8 build plan and §8.5's H-rows on roads, sites and patrols (lines 3645–3759)

241. §8.2 M-W1 contents include "P1–P5 with the charter both ways and S0/S1 reading it"; M-W2 "W7 Routes under the host's
   cost law with the time stations, the genesis lay and the lived network; W8a and W8b with the patrol step and the
   border-post proposals; W6 stage 2; the port's `routes`, `routeFacts`, `mapFeed`, `patrolOffer`, `pathGeometry` …";
   gates M-W2 T-V13-14, 16, 17, 38, 39, 41 – 43, 46; M-W5 religion "with V14's devotion cards and their offers on the
   DM's map feed". (V13:3663–3666)
242. §8.3 step 8: "P1–P5 with the charter, S0/S1's reading, the orientation terms; T-V13-2, 12, 13, 23, 24, 36"; step 9
   port incl. T-V13-43 (time). (V13:3683–3684)
243. §8.4 risks: SP-W2 coherence search (P1 ≤ 40 ms; `nearestLawful` ≤ 600 ms; fallback 36 bearings on drag); SP-W7 W7's
   A* ≤ 520 ms (fallback: low-rank edges routed on the coarse grid); "the blend band cannot meet a frame whose edge relief
   exceeds the world's | … | the residual is reported as cost; the DM takes an offer or `worldWins`". (V13:3693–3698)
244. H5 (full sense): the host's second builder over the canon; "a satellite's site a world point; its satellite-ground
   reader and that reader's certification row reading each ground point's terrain class and step cost from the sites
   slot"; waits on M-W1 (Q4 answered, file r item 926). (V13:3730)
245. H12 (full): "genesis at world birth over the canon with the founding members placed first, sent as one frozen record
   (even while dark); its render-tier roads retired; route changes and grades per window; genesis on a member's joining,
   with its ports' totality per evaluation; its charter command reachable from the world editor; the quiet-quay rule for
   a decayed water lane checked; the move-lock's release named per seat" — waits on M-W2, H4, H5, its genesis mount.
   (V13:3737)
246. H13 (polity facts per window): includes "held sites", "its satellites with their parent, tier and frozen site
   point", "its road closures and wardens' terms". (V13:3738)
247. H14 (full sense): "for a settlement generated from a world charter, its access word derived from the charter's road
   and water facts, and its terrain word … before generation; its terrain-agreement notice retired, its role taken by
   `refuse.charter.dossier`". (V13:3739)
248. H16 (full sense, roads/patrols): the intermediary settlement whose territory the path crosses keeps a gate until the
   sway's soak, the crossing holder then offered as a per-gate policy; "patrol coverage re-priced through its one distance
   reader, read by outcome rolls only, any route choice reading it through its belief (the known world), and the crossing
   holder likewise"; the sway as an advance-head overlay; seasonal sets; "route facts as overlays, with a water edge's
   limits on request"; aerial legs. (V13:3741)
249. H19: "roads → the map feed's paths; … the charter road card → its edge's path". (V13:3744)
250. H22: the birth canon "its genesis network laid at birth (H12)"; a seat bound after the birth canon joins by the
   additive re-canonize. (V13:3747)
251. H25 (full sense, roads/patrols): "patrol coverage given a host meaning (a producer for its road-warden and
   road-predation pair kinds, or coverage as its embattlement's security input, H16); a DM-cut road's closer named, and
   its caravans reading the cut or the cut labelled propagation-only in its own interface"; a raid's outcome word; the
   culture-distance "same governing name" question. (V13:3750)
252. H26: "each seizure at a route's worst intermediary settlement (its gate, the good, the take) as a dated row of the
   events window (DM-only)". H27: each column's dispatched route and carriage stored. H28: "its own command adopting a
   DM-placed holy or hidden cult site (V14 §2.2's `devotion`; J384 (10))". (V13:3751–3753)
253. No H-row asks the host for a site's road access, for a host route to a site, or for a site as a route end
   (consistent with W7 (11): a site is never an end on a host-bound world). (V13:3724–3755; V13:1769–1771)

### §9 Decisions — J- rows on routes and placement (lines 3761–3885)

254. J-V13.5: "a placement writes nothing in a frame but `worldRef`, `Recipe.charter`, the datum and the orientation
   terms … because bar 3 requires no arena digest to move and the owner's rule says the settlement never changes".
   (V13:3769)
255. J-V13.11: Urquhart over full Delaunay "on a standalone world (a host-bound world lays the host's genesis edges,
   J-V13.79)". (V13:3775)
256. J-V13.13: coherence weights coast first, river second (owner's correction (3); C13-41). J-V13.14: blend band
   smoothstep, "the cost of the band is reported, never hidden". J-V13.15: charter emitted both ways, the frame storing
   only the one its generation used. (V13:3777–3779)
257. J-V13.24: mirror as a placement flag. J-V13.31: per-document undo stacks. J-V13.33: position-keyed fBm. J-V13.35:
   A* confined to a cost ellipse for W7 (C13-36). J-V13.37: two-tier `nearestLawful` "36 bearings and the two decisive
   terms, then the full six on the three best". J-V13.38: demand proposals transient. J-V13.39: P1–P5 as local operators
   of the placement edits. (V13:3788–3803)
258. J-V13.51 (SW-01): V13 owns the suitability slot and "its eight generic terms while V14 owns its purpose terms as
   plug-ins, over defining V14's seventeen formulas here …; the world-site term is `destination` with `reach.siteKm`".
   J-V13.53 (SW-03): no random or jitter term in siting, one deterministic tie-break. J-V13.54: transient `charterFor`.
   (V13:3806–3809)
259. J-V13.59 (SW-10): a `placed` outcome row published as `world.placed`, `@plat/sites` answering with its own adoption,
   "over V13 calling V14, because `@plat/world` sits below `@plat/sites`". J-V13.60 (SW-11): a site's placement lives in
   the world document as a `Placement` keyed by the subject id, the site document holding only a `placementRef`, "because
   bar 3 holds for every subject". (V13:3814–3815)
260. J-V13.50: dossier facts as hard placement constraints; "the host moves its placement or amends its dossier".
   (V13:3818)
261. J-V13.66 (full sense): "patrols derived, never rolled — a cadence of 1, 4 or 13 weeks per route segment and power,
   the host's road watches first, presence on a fixed phase per (segment, power) …, map-tier presentation offered to the
   host as an extent and its basis, never as a time, and never imposed — over a float coverage, a weekly roll, a map
   mounted speed or patrols as host bodies". (V13:3830)
262. J-V13.68: "garrisoned sites as held points, field armies as presence". (V13:3832)
263. J-V13.72: "effort, never weeks (integer land effort-metres …; the host's travel law handed in as data …)". J-V13.73:
   "the host's cost-law values in this volume's schema, tagged time or choice, split from the map's lay rules, with time
   stations on every route". J-V13.74: the world supplies only the geography half of the host's port rule. (V13:3836–3838)
264. J-V13.75: forced-fact precedence by the placement's stamp, with `W_EDIT_DOSSIER`. J-V13.76: politics read once into
   the charter; the coherence term scored once at the placement edit. (V13:3839–3840)
265. J-V13.78: one word one meaning — includes "road patrol, border post"; "no bare … gate". (V13:3842)
266. J-V13.79 (full): "chose the host owning the genesis network's topology and grades and the world its geometry — W7
   laying exactly the host's genesis edges at world birth and mirroring its lived changes, nothing moving a bound route
   silently — over W7 as the genesis (a rank law replacing the host's access-graded one) or two selections side by side".
   (V13:3843)
267. J-V13.80: edits on a host-bound world under the host's decree law; political and military kinds refused, "the host's
   own command opened". (V13:3844)
268. J-V13.85: satellites drawn at their frozen site points. J-V13.95: holy places and hidden cult sites only as DM-placed
   world sites, offered to the host for adoption. J-V13.96: who keeps a gate — the host's intermediary settlement until
   the sway's soak, then the crossing holder offered per gate (J385). J-V13.97: patrol cadence moved one rung by the
   source's force band. J-V13.99: a bypass mirrored in the lived network. (V13:3849, 3859–3863)
269. Deferred D-V13.3: "a sea-route cost by wind (the climate's belts) if the host asks for sailing times". No D- row on
   site access or site relocation. (V13:3872–3875)
270. No J-V13 row decides a site's road access, a site's link to the network, or a site's coherence-driven relocation; the
   only site-placement rows are J-V13.59 and J-V13.60 (and the `destination` term, J-V13.51). (V13:3763–3870)

### §10 BCRs touching placement, routes, sites (lines 3887–4260)

271. BCR-V13-4 (S1 reads the charter): the full text of (1)–(3) names edges, coast, lakes, sea, river crossings; it does
   not name `charter.roads` (the roads' landing is BCR-V13-30 and §3.11.4's S1 reading "S4's arterial seeds … take
   `charter.roads`"). (V13:3920–3926; V13:2218–2219)
272. BCR-V13-5: `Recipe.product` gains `'world'|'site'`; `Recipe.charter?`; `Document.worldRef?` "written only by the
   frame's own `charter` event"; `Document.namespace`. (V13:3928–3936)
273. BCR-V13-9: `EditEvent` gains `requestCharter`, `bindPlacement`, `placeFrame`, `setPlacement`, `mirrorFrame`,
   `worldWins` with `ids?`, `unplaceFrame`, …; `ConflictAction.kind` gains `'keep'|'takeOffer'|'accept'|'cancel'` with
   `offer?`; `verb` "ignored on every other kind, a placement included". (`growPlacement` is not in BCR-V13-9's list of
   variants.) (V13:3976–3988; V13:2847)
274. BCR-V13-10 placement row (full): "a placement (`placeFrame`, `setPlacement`, `mirrorFrame`, `worldWins`,
   `unplaceFrame`) | P1–P5 then W9, W7–W8 over the landmass (V13 §4.3) | the frame's arenas, plots, buildings and locks;
   other placements | `worldWins`'s Re-derive from S1 on the frame: declared". (V13:3995)
275. BCR-V13-11 (original text kept): outbound `routes(world) → WorldRoute[]`; inbound "`seats(world, seeds)` and
   `costLaw(world, law)`"; revised 2026-10-17 (file m): the port's messages, two feeds and consumption law are V13
   §3.11.6's; (file n) the DM-placed site offers join its map feed. (V13:3997–4007)
276. BCR-V13-18: F-PLACE† row "P1–P5 … each ending in a reported clamp, default, offer or refusal … T-V13-3, 5, 13, 14,
   22, 23, 24". (V13:4054–4058)
277. BCR-V13-28: the registry gains `WorldRoute`, `SitingProposal`, `Placement`, `FrameCharter` kinds; §6.3's anchor
   table gains "a placement by its subject, … a route by its ends"; `EntityKind` gains `'placement'`. (V13:4126–4139)
278. BCR-V13-30 (full): "§4.2 S3 (4): roads meet the world at the gates. On a placed frame every charter road of class
   highway or road is a forced gate pick: S3 (4) places a gate where the road meets the enceinte and routes the road
   through the margin to the charter's station, the dossier's access word capping the class and the count; sea and river
   routes bind to the harbour and the landings; `roadToNowhere` (a charter road no exit meets) and `roadUnmatched` (a frame
   exit no charter road meets) are reported readings, never annotations." (V13:4153–4157)
279. BCR-V13-31: neighbour edge annotations only where a dossier partner names the far settlement, as walking time under
   the travel law; walking rings isochrones; world-zoom scale bar in `worldUnits`. (V13:4159–4164)
280. BCR-V13-32 crosswalk: "the exit bearings and arterial meeting at the edge | met, BCR-V13-30"; "the arterial seeds |
   met for the auto forms, BCR-V13-36"; "road drift | met for the host, `roadsAt`". (V13:4171–4186)
281. BCR-V13-36: "On a frame with two or more road entries a regional skeleton is laid before the nuclei (the auto forms
   only)". (V13:4201–4203)
282. §10.2 R-V14-1 (full): "every `Placement` with a `site` subject gives the site's `at` (`originCm`); its card's
   `attraction` (0–1) and `routed` are read through `@plat/api`'s resolver from the site document (V14 §2.2), cached per
   (placement, the card's digest) — for W6's `destination` term, W7's routed sites and the charter's `sites` (SW-20)".
   (V13:4248)
283. §10.2 R-V14-2: a site's `Placement` as a world fact (`WorldFacts.sites`); the `SiteReach` resolved across documents.
   R-V14-3: G3 calls `score` with purpose rows over V14's plug-ins and V13's eight generic terms; no jitter; §3.7 (6)'s
   tie-break. (V13:4249–4250)
284. §10.2 R-V14-11 (full): "a site subject goes through every placement edit as the frame does (`setPlacement`,
   `worldWins` as G5 (f)'s re-materialization, `unplaceFrame`); the site document holds only its `placementRef` (SW-11,
   SW-19)". R-V14-12: adoption on `world.placed`. R-V14-13: the card's `devotion`. (V13:4258–4260)
285. No BCR or R-V14 row asks for a site's access class, a site-to-road link, or a catalogue-dependent coherence rule for
   sites. (V13:3887–4260)

### §11 owner questions, §12 CONFIRMED/PLAUSIBLE, §13 and integration notes (lines 4262–4452)

286. §11 Q1 (elective rebase): "a settlement placed on it is placed settlement-first, the world bending to it,
   `worldWins` never run automatically"; recommendation: per campaign, premium, default keep, full forecast diff.
   (V13:4264–4271)
287. §11 Q2 (host schedule; launch classification), Q3 (share codes: embed the charter, recommended), Q4 (answered
   2026-10-18, file r item 926: "1. yes"; world canon outside door 1). No owner question in §11 concerns sites' road
   access, sites' integration into the road network, or site relocation. Two "Ruled" paragraphs (who keeps a gate,
   J385/J-V13.96; the birth canon and the fight verdict, J386–J388). (V13:4273–4325)
288. §12 CONFIRMED: "the owner's rules of items 131–141 and the settlement-first correction as quoted in V13 §1.3".
   (V13:4329–4337)
289. §12 PLAUSIBLE (placement and routes): "the suitability weights and spacings, the route cost rows, the polity rule's
   cells …, the coherence weights and the lawful bound, the blend band" — measured by T-V13-16's statistics bars at M-W1
   and M-W2 and re-celled by `editTable`. No separate CONFIRMED/PLAUSIBLE row names W7's mechanism, `RouteLayRule`,
   `exitRunM` or `nearestLawful` by name. (V13:4339–4349)
290. §12 the one owner-rule deviation: item 135 (c) until BCR-V13-29 lands (T-V13-13's two-frame fixture expected-fail).
   (V13:4351–4356)
291. §12 parity table rows on W6/W7: "ports: the two-ports rule (KEEP) | `minPortsPerBody` (V13 §3.7 (3)) | reached";
   "routes: the cost law, the trunk, well-ported islands, the gap fix, cabotage (KEEP) | the host's law as data;
   `sea.trunk`, `sea.gapFixRatio` (V13 §3.8); cabotage not built | deviated on cabotage: no coastal chaining of short sea
   legs — D-V13.6 if the host asks". (D-V13.6 is said to be §12's; §9's deferred list says "D-V13.5 – D-V13.7 are
   §12's".) (V13:4382–4383; V13:3876)
292. Integration notes: V14 reads `FrameCharter` (`sites`, `resources`, `territory`, `outlines`) — `roads` not listed —,
   `Placement` and the transforms, `SitingProposal`, the suitability slot, `worldFactsAt`; "V14 writes `WorldSite`
   positions (read by W6 and the charter) and an attached site's `SiteReach`"; IN-V13-3: "a free site has a placement,
   not an anchor". (V13:4402–4409, 4432–4433)
293. Integration notes R1-1: the import's markers as `SitingProposal`s with `demand: 'import'` vs V14 §3.2's `dropSite` per
   marker — open for reconciliation round 1. (V13:4450–4452)

## Gaps — what this reader looked for in V13 and did not find

* **A site's road access.** No field, term, rule or table states whether a site has road access, of what class, or how
  a site is linked to the network beyond W7 (1)'s `routed` seat flag (V13:1700–1703) and W7 (11)'s rule that on a
  host-bound world a site is "a position along a route, never an end" (V13:1769–1771). No access class per site kind.
* **How a site becomes "a position along a route" on a host-bound world.** W7 (11) and T-V13-43 say a dropped site
  "changes a route's geometry and effort, never the number of legs" / "moves its effort by the detour only"
  (V13:1770–1771, 3589), but no W7 step, cost term, lay rule or port message states the mechanism that bends a host
  route to a site (W7 (9) says the lived network is "mirrored, never computed" and only `chartered` lays new geometry,
  V13:1753–1754).
* **A trail or spur from a standalone site to the network.** W7 (5) gives "every seat still unjoined" a `trail`
  (V13:1736–1737), which covers a `routed` site; nothing covers a non-`routed` site.
* **Site placement coherence.** `CoherenceCost` has seven terms (coastSide, riverCrossing, edgeElevation, relief, biome,
  territory, dossier) (V13:735, 2079–2087) — none about roads or sites; no catalogue-dependent coherence rule for a site
  subject; no road or access weight in `place.coherence` (V13:1144). §3.11.1's text says "six terms" while listing seven
  rows (V13:2077).
* **Autocorrect of a site's geography.** P2's blend, P3's drainage and P4's charter are stated for frames; a site subject
  "takes the site document as the frame through every edit below" (V13:2056–2058), but no text states whether a site
  placement runs P1's coherence, P2's blend or P3 (settlement-first), or how `nearestLawful` applies to a site. No
  `placeFrame` form with a site subject is declared (V13:2835); `requestCharter` admits a site subject (V13:2833).
* **The DM's choice verbs for a site.** `keep`/`worldWins` (anomaly), `keep`/`takeOffer`/`cancel` (`W_PLACE_NO_LAWFUL`),
  `keepDossier`/`moveTown`/`cancel` (`W_EDIT_DOSSIER`) are stated for placements generally (V13:2872–2876); no
  site-specific verb, no `moveSite`, and `moveTown` exists only on `W_EDIT_DOSSIER`.
* **Road anomalies at P5.** `roadToNowhere` / `roadUnmatched` are declared (V13:788; BCR-V13-30 V13:4153–4157) but P5's
  orientation-terms table (V13:2269–2278) and F-PLACE's detections (V13:2774) do not list them; T-V13-12 counts "four
  fixtures, one per anomaly kind" against eight kinds (V13:3564); no T- row asserts either road anomaly.
* **A route re-run after a site placement.** P1–P5's output and §4.3 re-run W7–W8 "when the frame is a new seat"
  (V13:2458–2462, 2905); no row names a W7 re-run when a `routed` site is placed or moved, though W7b reads "V14's routed
  sites" (V13:1389).
* **The `routed` flag's reader in W6.** `SuitabilityContext.sites[].routed` is declared (V13:759) but no V13 suitability
  term reads it (`destination` reads `attraction` only, V13:1658–1661).
* **`routeNear` and `roadControl` (named in the README).** No term of these names appears in V13; V13 holds only the radius
  `reach.roadControlKm` (2 km) and `overlookKm`, `settlementKm` with no V13 term reading them (V13:950, 1066); they are
  V14's plug-ins by J-V13.51 (V13:3806).
* **`FrameCharter.sites` access.** The charter's `sites` rows carry `site`, `at`, `kind`, `footprint?` only (V13:722); no
  road or access field; `FrameCharter.roads[].toward` excludes a site (V13:714).
* **Patrols at sites.** Patrols are per route segment and power (V13:1963); a garrisoned site is a patrol source only as
  "a fort or watchpost along the segment" (V13:1965–1966); `patrolOffer` names "the nearest garrisoned seat or site"
  (V13:2349); nothing states a patrol to a site off the network.
* **H-rows.** No H-row asks the host for a site's road link or access (V13:3724–3755).
* **§11 owner questions.** None about sites and roads (V13:4262–4325).
* **`WorldFacts`** is declared in §2.4 (V13:1171), not §2.2; the task's list placed it in §2.2.
* **H22's text and §12's "D-V13.5 – D-V13.7 are §12's"** — D-V13.5 and D-V13.6 are named in §12's parity table
  (V13:4373, 4383, 4388); D-V13.7 likewise (V13:4385). No D- row concerns sites or roads.

## Verification of this record

* Snapshot read: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/V13-snapshot.md`,
  md5 `c8759307398388249547f71e1912feca`, 4,452 lines, read whole in order (lines 1–4452).
* Live file re-hashed at 05:19Z after the read: `docs/volumes/V13-world.md` md5 `c8759307398388249547f71e1912feca`
  (unchanged during the read).
* 60 cited lines spot-checked by script against the snapshot (each cited line contains its quoted key string): 60/60.
* Counts: 293 facts recorded; 16 gap entries.
