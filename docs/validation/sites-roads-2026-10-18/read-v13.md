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

