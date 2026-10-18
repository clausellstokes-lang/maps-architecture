# The FP simulator and the realm: the refined approach to the world integration

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — the 57 rulings hold (49 upheld, 8 amended by the session's own later rulings and one verifier list fix, none overturned); 25 research corrections, no new design fragment (lane retrovalidation/realm; J392)

Synthesis seat (the manager's seat for `workflows/36-realm-review`, resumed as `workflows/36b-realm-review-continue.js`
after the usage limit; this seat finished its own earlier draft), 2026-10-17. Inputs: the two research notes
(`research/sf/fp-simulator.md`, 1,098 lines; `research/sf/fp-physical-integration.md`, 481 lines, whose §1 count
correction is taken: 80 ledger rows, 30 SUPPLIED, 17 PARTLY, 7 MISSING, 26 NONE-OWED), both read whole first; the
verified findings of eight dimensions (DT distance/time/scale, RL routes, PS port shape, WS water/ports/seasons, SF
settlement frame and fabric, BA belief/audience/determinism/time, TI transition and import, TR territory) with every
verifier's amendment and every "missed" item weighed; the map side as it stands (`docs/volumes/V13-world.md`,
`docs/volumes/V14-sites.md`, `docs/design/proposal-world-native.md`, the owner brief of 2026-10-16, `docs/ARCHITECTURE.md`
§7.7, §11.4, §14, `plat/docs/build/M0-world-sites-gate.md`). Host: `clausellstokes-lang/settlement-engine` at
`origin/master` `81f1cd96`, read-only; host paths are relative to its root, map paths to this repository's root. Tags:
[STATED] a document says it (a rule cited); [OBSERVED] code or git, or this repository's own design text read as the object under review (its line citations are to the revisions before file m was applied); [INFERRED] this seat's reasoning, given. Nothing here was copied
from host code. Every ruling below is the session's under the owner's delegation and is vetoable; the owner's own
words are quoted verbatim where they bind (T1–T3).

The amendments that carry this review into the design's own documents are `docs/AMENDMENTS-2026-10-17m.md`, items
**659–779**: the owner's territory rules (T1)–(T3) and the owner's J382 answer as items 659–662, then 117 change
items — volume 13 663–756, volume 14 757–768, the proposal 769–773, the brief 774–776 and
the base 777–779 (the base only where it is itself wrong). **J382 landed while this review was being
written** (the owner's "yes" to culture as a resistance and the sea as cheap carriage): it is ruled into J-RR.49 (with RR-46)
below — never into J-RR.52, which carries no J382 clause [Fable-reviewed 2026-10-18] — and into V13 §3.9 (6), and the two owner questions it answered are gone from §6. **Revised 2026-10-17** after two adversarial reviews of this
note and file m (51 issues): each was verified against the host's code and the map's targets, and §10 records where it
fell, its severity, whether it was accepted and what changed; the rulings and findings below carry the accepted fixes.

---

## 1 The simulator in one page

**What it is.** SettlementForge's campaign simulator is a realm simulation layered on a seeded settlement generator:
the generator makes one coherent settlement dossier per seed; the campaign advances many saved settlements tick by
tick through economy, movement, politics, belief, religion, war, peace and consequence propagation, with a DM-truth
Herald and player-safe projections (`fp-simulator.md` §1.1). "FP" is the program family layered on that engine
(thirteen programs plus later families), now governed by the 2026-10-16 coherence fold, whose requirements 15–24
bind every wave (`fp-simulator.md` §0, §2.1). Most of FP is dark: in the default preset only pact formation and the
patron's fall are lit, and belief exists only under spatial canon with a non-omniscient information mode
(`fp-simulator.md` §1.10).

**How it advances.** One frozen pulse kernel runs one weekly tick; an advance (week, month, season, year) runs N
ticks and collapses their records to one; decrees apply at the head of each tick; the majors docket can park an
advance; the hearing week (requirement 24, the owner's law) dockets every inter-settlement climax at a one-week
advance with its default verdict and resolves it first at the next advance; the advance epoch (EP, dark) mints a
fresh nonce per user advance so undo discards a suffix and replay feeds recorded nonces ("living futures, immutable
pasts") (`fp-simulator.md` §1.7–§1.9).

**What it reads of the map.** One thing: the frozen spatial digest built once at a receipted canonize from a one-shot
capture of the FMG fork's pack — positions, a nearest-settlement territory per cell, the cheapest crossing between
adjacent territories (the gates), an integer all-pairs cost matrix (Floyd–Warshall over the gate graph), neighbour
tiers (BFS over gates), per-hop terrain receipts, water and teleport edge sets, an optional climate sub-digest, and a
`kmScale` datum nobody writes. Every mover clock derives from it through one reader (`hopWeeks`/`calibration`);
everything the campaign adds is lived history in sidecar ledgers keyed to digest ids; generation-time truth is never
rewritten ("genesis is sacred", the digest stays frozen) (`fp-simulator.md` §1.2, §2.3–§2.4;
`fp-physical-integration.md` §2, §5). The design already says the digest's geometry comes "from the map" without
saying which map, and the producer side (a scale, a terrain substrate at the town) is where the stubs concentrate
(`fp-physical-integration.md` §2.11, §8.1).

**What binds a map engine.** The fold's requirements 15–24 (TIER lines and degraded arms, measured bands, provenance
`causedBy`, one word one meaning, ten lifecycle paths, retention horizons, the hearing week's "where"), the war
program's §1a/§1b laws (byte-identity forever, dormancy, seeded purity, finite semantics, K3 "nobody is ever current",
law M's one week per leg), the one-substrate distance law, the per-map spectrum law, the nine one-way flows, the
ledger discipline, and the map-touching rulings OD-FC-18 (genesis network at world birth), OD-FC-22 (the world scale
from the map's exported scale and unit), OD-FC-28 (mode speeds owner-signed), OD-FC-38 (the FABRIC program out of FP,
the map family's own) (`fp-simulator.md` §2, §4).

---

## 2 How the map's physical dimensions enter the simulator

| family | today, as built [OBSERVED] | the host's design [STATED] | V13 before this review | after this review (rulings §4) |
|---|---|---|---|---|
| distance and time | integer cost per pair from the digest; weeks by per-digest normalization (2–8 march weeks); only the foot speed is read (`distanceRead.js:560-627`, `modeSpeeds.js:47-64`) | absolute weeks = km ÷ mode speed once a per-world scale exists; one distance law (WY §1a; WC:4815) | `WorldRoute.costTotal`, order-dependent, unitless; no speed, no week | the canon's travel slot (integer seat costs under the host's cost law); effort-metres and water metres separate; no weeks emitted; the host's travel law handed in as data (J-RR.11–J-RR.14) |
| scale | `kmScale` never written; FMG pixels y-down | the map's exported scale + unit at canonize (OD-FC-22) | world cm, y-north, unstated to the host | a declared world header; the host stamps its own unit's km; reframed on a geometry change; census first (J-RR.10) |
| terrain and cost | FMG biome × height knee, no slope (`spatialCost.js:30-70,380-388`) | the host's law, versioned (V.1) | `RouteCostLaw` mixes cost and lay rules | the host's law written in the map's schema (cost law 2), lay rules map-owned (J-RR.12) |
| territory, gates, tiers | one total nearest-settlement flood; gates are crossings (`spatialDigest.js:651-845`) | frozen geometry; occupation and border closure are live overlays (PHASE55 V.1) | W8 budgeted polity flood offered as the host's territory | two partitions: the seat territory (frozen, the host's meaning) in the canon; the sway (political, revisioned) in the map feed; culture slowing by the host's own measure and water carrying only along its lit lanes (J382) (J-RR.4, J-RR.47 – J-RR.57) |
| routes | render-tier roads in the iframe, never persisted; genesis unmounted (`routeNetworkGenesis.js:630`) | genesis at world birth (OD-FC-18); lived ledger over the frozen digest | W7 picks its own pairs and classes | the host selects and grades, the world lays geometry; the lived network mirrored; nothing moves silently (J-RR.15–J-RR.19) |
| water and ports | coastal/river predicates, flux band, bounding-box ocean guess (`seaLanes.js:258-273`, `waterBodies.js:1-60`) | PORT = GEOGRAPHY ∧ INSTITUTIONS; ports totality (§4j; Law 6) | `port: boolean` from W6's promotion | the world supplies geography only; latent water candidates per sailing body; navigability per vertex (J-RR.20–J-RR.22) |
| seasons and climate | one realm-wide season label; climate band in FMG units (`worldState.js:742-751`, `spatialDigest.js:129-170`) | season a pure function of the tick; slow, not sever | phase 30/4 (a January-first value on a spring-first grid) | phase 23/49; the calendar hemisphere; seasonal states as 52-week sets the host prices (J-RR.23) |
| elevation and slope | two thresholds, no gradient | a slope law is a cost-law bump | DEM in cm | the DEM feeds the cost law's knee and slope cells under the host's version (J-RR.12) |
| the settlement frame | the town is synthesised from the dossier alone | the realm-coherence law; MF's terrain-first law | the charter both ways; precedence partly stated | precedence by stamp; roads at the gates; politics as derived readings only (J-RR.24–J-RR.31) |
| line of sight, aerial, teleport | none; airship a regex; teleport a frozen clique | aerial field and teleport edges as sibling graphs (VI.3) | none | a viewshed reader; aerial legs for world-stamped canons; no teleport link drawn (J-RR.44) |
| time, belief, audience | — | EP undo; K3; WY covert and ambiguity laws; the hearing week | `events` append-only; `clock` a view command | windowed replace; audience fail-closed by the host's resolved audience; belief and presence through a presentation-only door (J-RR.32–J-RR.40) |

---

## 3 The findings, merged and deduplicated

Eight dimensions returned 127 kept findings (DT 13, RL 19, PS 17, WS 11, SF 13, BA 17, TI 16, TR 21), every one verified
(most amended) and none refuted, plus 36 missed items (DT 2, RL 4, PS 6, WS 5, SF 4, BA 5, TI 5, TR 5). Thirty-three of them merge into the 59
findings below; WS missed 2, WS missed 5 and BA missed 5 are carried by no finding and no item of file m (their record, the scratch `surviving.json`, was not kept) [Fable-reviewed 2026-10-18]. Each names its sources (dimension ids), the evidence that decided it, the gap, the
ruled refinement (with the J-RR row of §4) and its targets (file m's items; items 663 — the volume's revision note — and 771 — the proposal's §6 pointer — carry every finding,
item 751 — the volume's new decisions J-V13.63 – J-V13.82 — every finding but RR-59 [Fable-reviewed 2026-10-18], and
they are not repeated per finding). Host citations are the verifiers' where a
verifier corrected the analyst.

### 3.1 The port's shape

**RR-1 — The port replaces the FMG capture, not the frozen digest.** *From* PS-1, BA-11, PS-5, PS-17, TI-8 (part).
*Evidence:* the digest is the per-tick substrate — deep-frozen, capped at 400 KB, refused mid-advance, canon-versioned,
read through one gate by 31 modules (`campaignSpatialCanonize.js:36,158-186`; `distanceRead.js:115-132`) [OBSERVED];
lived ledgers are sidecars keyed to it (`DESIGN_ROUTE_LIFECYCLE.md:25-32`) [STATED]; six map-side places say the port
replaces the digest (V13:146; AMENDMENTS-j:279; brief:99; proposal:19,182,253) [OBSERVED]. *Gap:* read literally, a
live map call sits inside every tick (replay diverges after any map edit) or canon-version semantics vanish.
*Refinement:* the port replaces the capture; the host's builder takes one port canon; the digest stays the host's
engine state; nothing the host simulates calls the port inside an advance; answers are baked with stamps (J-RR.1, J-RR.9). *Targets:* items 665, 666, 721, 745, 749, 769, 773, 774, 778; §5 H4, H5.

**RR-2 — One atomic canon product; the host keeps its own derivations.** *From* PS-2, TR-1, RL-7 (a), PS-5 (ii), PS-6,
WS-2 (1), TI-8. *Evidence:* the builder is multi-source Dijkstra → crossings → Floyd–Warshall → BFS tiers → receipts;
candidates derive from gates "no keystone amendment" (`spatialDigest.js:651-845`; `distanceRead.js:905-948`)
[OBSERVED]; the receipts attribute cost to the two crossing cells' classes (`spatialDigest.js:813-835`) [OBSERVED];
`WorldRoute.costTotal` is path-dependent (existingRoute 0.5, V13:757) [OBSERVED]. *Gap:* W7's costs and Urquhart graph
cannot serve as the host's distance or adjacency; the port withholds crossings and class shares; per-tick founding
reads would read a live world. *Refinement:* `canon(world, request)` at one log head, refusing rather than partial:
a travel slot (the unbudgeted seat territory W8a under the host's cost law, on the coarse raster with crossings refined
on the fine grid: seats, crossings with the host's receipt inputs, integer costs), a water slot (latent candidates,
geography only), a sites slot (frozen candidate ground per seat inside its orbit). The host's second builder keeps
Floyd–Warshall, BFS, candidates and its sea-lane law, with a cross-implementation conformance row. TI-8's `hostPack`
is rejected (J-RR.3, J-RR.4, J-RR.5). *Targets:* items 671, 675, 693, 721, 741, 742, 745, 747, 748; §5 H5.

**RR-3 — Two feeds: the simulator's and the map's.** *From* PS-7, RL-2, PS-10. *Evidence:* the digest is integer and
codepoint-sorted; finite semantics forbids a float on a surface (war §1a law 7) [STATED]; `SettlementMapRecord` carries
cached glyphs, float costs and echoed tier/pop/name (V13:1661-1665) [OBSERVED]. *Gap:* a persisted record would depend on
cache freshness and carry floats and stale echoes. *Refinement:* the simulator feed (`canon`) admits integers with
units, closed vocabularies, host ids and world points only; the map feed (`mapFeed`, `derivedFacts`, `routes`) carries
geometry and presentation and is never written into the host's world state (J-RR.2). *Targets:* items 665, 675, 721, 742, 745, 778.

**RR-4 — Join keys and route identity.** *From* PS-8, RL-2. *Evidence:* the host keys seeds and lived edges by settlement
id, edge id `route.<a>.<b>.<mode>` (`DESIGN_ROUTE_LIFECYCLE.md:71-86`) [STATED; OBSERVED `routeNetworkLedger.js:241`]; V13's route key includes the class
(V13:849) and a land road and a gap-fix sea leg share ends (V13 §3.8 (3)) [OBSERVED]. *Refinement:* every row names the
host's settlement id (bound once by `bindSeat`); route creation key (pair lineages, mode); class/grade an attribute;
anchor "by its ends and mode" (J-RR.6). *Targets:* items 678, 688, 689, 701, 702, 721, 730, 745.

**RR-5 — Versions, content identity and causes.** *From* PS-4, TI-7, WS-9 (1), PS-12 (3). *Evidence:* at least twelve
self-describing canon axes, each bumped only by a discrete re-canonize (six in `spatialDigest.js:117-179`; `spatialCost.js:82`; `seaLanes.js:85`; `waterBodies.js:60`; `spatialSubstrate.js:65`; `teleportEdges.js:64`; `captureSidecar.js:41`; the thirteenth `*_VERSION` under `src/domain/spatial/`, `armyTransit.js:120`, is a decision-record schema, not a canon axis) [OBSERVED; Fable-reviewed 2026-10-18]; V13
versions messages by format version only (V13:1678) [OBSERVED]. *Refinement:* a canon envelope with a per-slot version
vector, per-slot input hashes (the "facts digest"), the world header, and `causes` (the world-log entries since the
prior canon) the host may record as `causedBy` parents; geometry 2 = "built from the map module's world" (J-RR.7).
*Targets:* items 671, 693, 706, 721, 745.

**RR-6 — The base's host doors are not amended for the world port, and door 1 is unreconciled.** *From* PS missed 1–2,
TI missed 1, TR missed 1, BA missed 1, PS-16, BA-4 (2). *Evidence:* the base says the map reads the host "only through [the dossier
port] — never its campaign state, simulator, derived reads, realm map or code" and "the host's simulator never reads
the map's geometry … it opens only on the owner's explicit word" (`docs/ARCHITECTURE.md:17680-17698`) [OBSERVED];
the never-read list names "the realm map, its scale … the frozen `spatialDigest`" (`:12776-12778`) [OBSERVED]; the world
port (applied at `:12891`) takes seats, cost law and events [OBSERVED]. *Gap:* the base contradicts the world port it
already carries. *Refinement:* a fifth door, "the world port, world documents only": recorded inputs (logged,
replayable) and presentation inputs (never logged, never read by anything replayable); the never-read list binds the
dossier door; door 1 — the world canon replaces the capture the host's simulator already reads, carries no frame or
arena geometry and reaches the simulation only at a DM-confirmed re-canonize, so it is ruled not door 1, the owner
asked to confirm (J-RR.8; §6 Q-RR-1). *Targets:* items 666, 675, 721, 745, 752, 755, 777, 778, 779; §5 H4.

**RR-7 — The fold's obligations at the port; phantoms; retention.** *From* PS-12, PS-14, PS-13, BA-16, RL-13, TI missed
5. *Evidence:* requirements 15, 17, 20, 22, 23 (`DESIGN_FP_COHERENCE_FOLD.md:97-174`) [STATED]; L10(c)'s phantom policy
(`DESIGN_FP_ARCHITECTURE.md:214`) [STATED]; V13's lifecycle table has six columns (V13:865) [OBSERVED]; the host's provenance
kernel records parents only for pulse receipts (`provenanceKernel.js:12-43`) [OBSERVED]. *Refinement:* V13 states its
standing (outside the FP corpus, a map-family volume; host waves reading a canon slot carry the TIER line); a TIER table
per slot with its degraded arm; the ten lifecycle paths for the adopted canon and every bound route record; phantoms
never seats, never project, never contest (real-only), home+record acts as off-stage events; the host's retention
governs host facts (the port gains removal and collapse rows), the map declares horizons only for user events and
polity supersession (J-RR.40, J-RR.42). *Targets:* items 670, 704, 721, 745.

**RR-8 — One word, one meaning across the seam.** *From* PS-11, DT-12, TR-14, RL-19, WS-11, BA-1 (4), BA-14 (7).
*Evidence:* the host's landed `territory` (the per-settlement partition), `march` (army time, `armyTransit.js:51-59`),
`contested` (an occupation rung, `occupation.js:13`), `embattled` (one meaning, fold :452), `realm` (the whole campaign
world), `hinterland` (a placement-evidence word, `demographicsLand.js:128`), `epoch` (the advance epoch, EP:2), `levy`
(a treasury direction) [OBSERVED/STATED]; the manager's "hinterland and realm" collide twice each. V13's `routeClass`
(water passage) beside `WorldRoute.class` [OBSERVED]; the wind bearing's direction is unstated in V13 and in the base's
`Terrain.wind` (ARCHITECTURE.md:968, :7772-7774) [OBSERVED]. *Refinement:* `territory` = the host's seat territory only;
`Sway`, `Allegiance`, `debatable` (prose "the debatable land" or "the contested march", never a bare march), `heldByForce`,
`unclaimed`, `exclave`, `fighting`, `swayRevision`, `memberForce`, "road patrol", "border post", lodgement, keyframe
(never `contingent`, *foothold*, *checkpoint* or a bare *gate*: landed host words) [Fable-reviewed 2026-10-18: J-V13.78 later added `outranked` (never *claimant*, the host's word for an heir), *plate* for a lens's per-advance record and *the sway lens*]; `advanceNonce` never `epoch`;
V13 §3.13's `routeClass` never sent as a route's class; `windCdeg` stated as the bearing the wind blows from (J-RR.32, J-RR.57). *Targets:* items 667, 686, 711, 745.

### 3.2 Distance, scale and time

**RR-9 — The scale datum.** *From* DT-1, PS-15, TI-16, DT-13, BA-17. *Evidence:* the absolute arm reads `kmScale` behind an
admitted scale and a known cost law; `COST_UNITS_PER_MAP_UNIT` knows only law 1 at 100 per FMG pixel and an absent law
reads as law 1; nothing writes `kmScale`; carry-forward ignores a frame change (`distanceRead.js:147-163,617-627`;
`modeSpeeds.js:94,136-169`) [OBSERVED]; OD-FC-22's source is the FMG export [STATED fold:515], which disappears with the fork [INFERRED: H20 retires the fork];
`realmReach` has no consumer and `MAX_REINFORCEMENT_WEEKS` 5 was measured on a 2–8 week spectrum
(`sovereigntyReach.js:60-81`) [OBSERVED]. *Gap:* four guesses for a host engineer; a province world's bands go dead.
*Refinement:* the world header declares unit, axes, origin, extent; the host stamps its own unit's km, never the
default; a cost-law-2 row; explicit cost-law stamps; carry-forward only within one geometry version; one host
coordinate adapter both ways; native scale stamped only after the host's band census; the scale-vs-mystery readout in
the world dialog (J-RR.10, J-RR.14). *Targets:* items 671, 673, 681, 693, 721, 743, 745, 749; §5 H2, H6, H7.

**RR-10 — Effort, never weeks; the host's travel law as data; the cost law in the map's schema.** *From* DT-2, DT-3,
RL-6, RL-7 (b). *Evidence:* one cost both chooses and times a route; water priced by cost (12 per distance against land
≥ 90); lived legs take a grade multiplier and floor; army time is ceil(1.5 × weeks ÷ (1 + 0.4·(2·readiness − 1))), clamped to [1, 52]; news is floor(0.5 ×
weeks) (`distanceRead.js:728-744`; `seaLanes.js:92-121`; `routeNetworkConsumersTransit.js:83-88,140-150`;
`armyTransit.js:51-59,293-301`; `distancePricedNews.js:18-32`) [OBSERVED]; the v1 law has an elevation knee and a
river-cell add and no slope (`spatialCost.js:30-70,380-388`) [OBSERVED]. *Gap:* emitting weeks makes a second clock;
inventing speeds makes two physics; V13's schema cannot write the host's law. *Refinement:* routes carry order-free
integer land effort-metres with water metres apart; a time/choice tag on each cost term; `travelLaw` inbound (stored
as a `world.travel` host slice; standalone default row); every map time `derivedTime(…)` labelled and stamped; the cost
law split into the host-owned `RouteCostLaw` (with `elevationKnee`, `riverCellAdd`, `terrainClass`) and the map-owned
`RouteLayRule`; `costTotal` presentation only (J-RR.11, J-RR.12). *Targets:* items 671, 672, 674, 689, 693, 695, 698, 721, 745.

**RR-11 — A world edit must not silently move a leg across a week band.** *From* DT-5. *Evidence:* rounding, the army
round-up, the lower-median anchor and the band edges (`distanceRead.js:583-585,728-731`; `armyTransit.js:293-301`;
`modeSpeeds.js:198-223`) [OBSERVED]; placement edits re-run W7–W8 over the landmass (V13:2090-2101) [OBSERVED].
*Refinement:* a port bump is an offer the host adopts by its own re-canonize; inbound `canonized`; a one-entry time
baseline; `timeDelta` in every dry run, route class edit and fork preview with `W_TRAVEL_BAND_CROSSED`; a
`TimeDeltaReceipt` naming the edits; fragile legs flagged; locality is a transitive closure (J-RR.13). *Targets:* items 672, 693, 698, 721, 732, 736, 743, 744, 745.

**RR-12 — Movers, venues and host paths need time stations.** *From* DT-10, RL-8, DT-4. *Evidence:* movers are placed by
distance fraction on straight lines, y-down (`travelersGeometry.js:40-78`); legs are priced at the dispatch season
(`armyTransit.js:706`; `routeNetworkConsumersTransit.js:143`) [OBSERVED]; law M's one-week floor is per leg between
settlements (`namedPersonTransit.js:18-22`) [OBSERVED]. *Refinement:* per-vertex time stations and terrain class;
`pointAtTime` weighted by the dispatch season, held for the leg; `pathGeometry` for host paths over the catchment's
gate crossings, frozen at dispatch; in bound mode every host route ends at two host settlements, so a site drop never
splits a leg (J-RR.15). *Targets:* items 689, 713, 721.

### 3.3 Routes

**RR-13 — Genesis at world birth: the host selects and grades, the world lays the geometry.** *From* RL-1, PS missed 3,
RL missed C, RL-15. *Evidence:* OD-FC-18 mounts genesis at world birth (fold:511); Law 2; the grade ladder reads the
access words; genesis returns by reference once a ledger exists; it has no caller (`routeNetworkGenesis.js:85,105-108,
425-473,630-643`) [OBSERVED/STATED]; three selection laws coexist (host genesis, the render tier, W7) [OBSERVED].
*Refinement:* the host's generation path places its founding members through the port, then derives genesis over the
canon's products and sends one frozen `RouteGenesis` record; bound W7 lays exactly those edges in host-key order,
grades from the host; the render tier retires; standalone routes are tombstoned at binding; installed campaigns with
no genesis keep their drawn roads as presentation (J-RR.16). *Targets:* items 664, 671, 693, 713, 721, 743, 746, 749, 750; §5 H12.

**RR-14 — After birth nothing moves a bound route silently.** *From* RL-3, RL missed D, DT-5 (6). *Evidence:* every
placement, cost-law change, cascade, site drop and regenerate re-derives W7 today (V13:883,1682,1871,1890-1904;
V14:2349) [OBSERVED]; the host refuses to move a canonized placement (`mapSlice.js:486-494`) [OBSERVED]. *Refinement:*
incremental W7; happened edits re-lay from their week as dated versions; always-so, regenerate and adjust mint a lay
version adopted only by the host's re-canonize (`W_HOST_CANON_BEHIND` until then); a cost-law change is the host's
own re-canonize; origin moves of a host seat refused under the host's move-lock (`refuse.place.hostLocked`), a DM's
unplacement of one refused by a map rule, the host's own removal arriving as `unbindSeat` (J-RR.17).
*Targets:* items 688, 705, 713, 722, 732, 744.

**RR-15 — The lived network is mirrored, never computed.** *From* RL-4, RL missed A and B, RL-18. *Evidence:* the ledger's
facets and five events; "patrolled is not a change"; hidden never absence; a revival warm-starts the remembered
corridor (`routeNetworkLedger.js:64-181`; `subtypes in subsystemRowsWaves.js:360-366`; `DESIGN_ROUTE_LIFECYCLE.md:40-43,
205-213`) [OBSERVED/STATED]. *Refinement:* inbound `network(world, changes)` under the windowed replace; only `chartered`
lays new geometry; demotion keeps the polyline, revival restores the hidden one; a hidden land edge is a DM-only ghost,
a hidden water edge a quiet-quay mark; the route layer, `roadsAt(placement, week)` and siting all read the network at
the week; hidden roads count as no public road (J-RR.18). *Targets:* items 671, 693, 713, 721, 737.

**RR-16 — The route record: identity, facts, receipts, limits, names, exports.** *From* RL-2, RL-7, RL-12, RL-14. *Refinement:*
`WorldRoute { hostKey; mode land|water; waterRuns; grade incl. hidden; origin; … }`; `routeFacts` (ids, integers, bands;
no `costTotal`) for the host and `routes` (polylines) for presentation; a per-class receipt for the clerk; limits as an
on-demand reading; the host's paired name when sent; a hidden route admitted as a secret link (withheld as marks)
(J-RR.19). *Targets:* items 671, 679, 689, 721, 731.

**RR-17 — Route edits, isolation, joins and world-first access.** *From* RL-5, RL-10, RL-16, RL-17, SF missed M2.
*Evidence:* J-D3 user routes; isolation "a possible fate"; genesis gives an isolated end no land edge
(`DESIGN_ROUTE_LIFECYCLE.md:20-22`; `routeNetworkGenesis.js:93-108,218-223`); a joining member gets an edge only by a
years-long charter; satellites never join the digest (J-D4) [STATED/OBSERVED]. *Refinement:* grade edits on a host route
refused; the DM charters through the host's own command (the world offers a read-only path preview, never a command
channel); course corrections are recorded geometry; no trails to host seats; unpathed edges drawn honestly; the host's
genesis-on-join; for a world-first settlement the host derives its access word from the charter's road and water facts
(J-RR.19). *Targets:* items 713, 721.

### 3.4 Water, ports, seasons and climate

**RR-18 — The port rule's two halves.** *From* WS-1, WS-8, WS missed-3. *Evidence:* PORT = GEOGRAPHY ∧ INSTITUTIONS, verdicts
frozen per version (`PHASE55:718-728,755-758`; `seaLanes.js:76-85,149-205,271`) [STATED/OBSERVED]; V13 never says which
half `port: boolean` carries and runs W6's promotion over an import (V13:1286-1291,1662,1952-1956) [OBSERVED].
*Refinement:* `waterAccess` (the geography half in true metres under the host's thresholds); the host's verdict comes
back view-only; W6's promotion standalone only; the host's frozen verdicts arrive as `hostRequires` and the cascade
refuses to strand them (`refuse.world.hostRequires` with `keepResidual`) (J-RR.20, J-RR.26). *Targets:* items 671, 690, 693, 712, 721.

**RR-19 — Water legs, navigability, lakes as sailing water.** *From* WS-2, WS-3, WS missed-4. *Evidence:* sailing groups,
the domination prune, MST + K=4 (`seaLanes.js:433-506`); the CAP-2 headwater cure (`spatialCost.js:150-184`) [OBSERVED];
a main stem is one reach whose whole course inherits the mouth's `navigable` (V13:503,1164-1171) [OBSERVED]. *Refinement:*
the canon's water slot lists latent candidates per sailing body (MST + K nearest by water cost; rivers along reach
courses; lakes included) as geography; their paths are map-feed geometry; a `WorldRoute` exists only for a host-named
edge; per-vertex navigability bands; per-leg water mode (river, lake, coastal, open) (J-RR.21). *Targets:* items 685, 721.

**RR-20 — Lakes and the settlement's own physical facts.** *From* WS-4, WS-7. *Evidence:* the world calls every closed lake
salt, the frame calls it brackish unless arid (V13:1093,1707-1709) [OBSERVED]; the host's band law is in FMG units
(`spatialDigest.js:129-170`) [OBSERVED]; the settlement map record carries no physical facts (V13:1661-1663).
*Refinement:* one subtype union fresh|brackish|salt|dry with one precedence rule; `frozen` becomes `iceWeeks`; a
`physical` block on the record sampled from the world after the blend; `floodSummary` rename; the host re-versions its
lake and climate laws over these (J-RR.22). *Targets:* items 671, 684, 693, 710.

**RR-21 — Seasons agree with the host's calendar.** *From* WS-5, WS-6, BA-8, DT missed-2. *Evidence:* the host's quarters
spring 0–12 … winter 39–51 from tick 0 (`worldState.js:742-751`) [OBSERVED]; the base's midsummer week 19 and midwinter
45 (ARCHITECTURE.md:12974, :14785-14795) [OBSERVED]; V13's hottest week 30 puts the frost in the host's spring (V13:684,
1114-1119) [OBSERVED]; V11's ice bands centre near week 46–47 [OBSERVED]. *Refinement:* hottest week 23 in the calendar
hemisphere (midsummer 19 plus four weeks of land lag), 49 in the other; the calendar hemisphere is the realm's; a
cross-equator host world keeps physical truth and reports lagged seats; the seasonal states as 52-week sets keyed to
the host's week of year with per-quarter counts; every multiplier stays the host's (J-RR.23). *Targets:* items 672, 689, 697, 711, 743, 744.

**RR-22 — A water edit reaches the simulator only through the facts digest; host floods never raise a world surface by
themselves.** *From* WS-9, WS-10. *Evidence:* the host's divergence signal is session-only and under-covers
(`mapSlice.js:229-245`); a calamity's flood flavour is cosmetic (`calamity.js:79-95`) [OBSERVED]. *Refinement:* the
`physicalChange` offer carries the edit's durability (event, permanent, retcon); event durability may be a dated live
overlay; permanent and retcon go through the host's receipted re-canonize; a host flood event raises water only when the DM
attributes it (J-RR.26). *Targets:* items 721.

### 3.5 The settlement frame and the fabric program

**RR-23 — Forced-fact precedence by stamp; world edits against the dossier.** *From* SF-2. *Evidence:* MF's ladder
"user-truth > state > tier > terrain-plausibility > jitter" (`DESIGN_FP_ARCH_MF.md:239`) [STATED]; V13:133 already ranks
dossier > charter > feature table on a placed frame [OBSERVED]; a world edit marks a world-stamped charter stale and
offers `worldWins`, which re-derives from S1 under a charter that may contradict a dossier fact (V13:1626,1634-1640,1872)
[OBSERVED]. *Refinement:* the ladder per stamp (world: dossier > DM locks > charter boundary facts > tier priors >
terrain plausibility > jitter; settlement: dossier > the frame whole > world facts as derived readings only); a world
edit that would contradict a dossier fact raises `W_EDIT_DOSSIER` (keepDossier, moveTown, cancel); the mode keys on the
stamp; no lawful origin leaves the frame standalone (J-RR.24). *Targets:* items 672, 719, 732, 744, 770.

**RR-24 — Roads meet the world at the town's gates.** *From* SF-3, RL-9, SF missed M1, M3, M4. *Evidence:* MF's continuity and
wall laws and §164a (`DESIGN_FP_ARCH_MF.md:192-193,443`) [STATED]; charter roads are soft jittered bearings; W7 seats a
town at its centre; `roadToNowhere` is declared and never raised (V13:590,1315,1606; ARCHITECTURE.md:6231-6236) [OBSERVED].
*Refinement:* highway and road charter crossings become forced gate picks routed through the margin to their station;
every placed frame's exits are W7's terminals; `roadToNowhere` and `roadUnmatched` are reported readings, never
annotations; the dossier's access word caps class and count; sea and river roads bind to the harbour and landings;
requestCharter lays the town's own links first (J-RR.25). *Targets:* items 686, 693, 713, 717, 753, 770.

**RR-25 — The town leaf's neighbour edges, walking times and rings.** *From* SF-4, DT-11, DT missed-1. *Evidence:* MF §12.2–§12.3;
the foot row "every day of the week"; no hour exists (`modeSpeeds.js:52-55`) [STATED/OBSERVED]. *Refinement:* the join
(`towardKey` per crossing; `hostKey` on the placement); the neighbour edge drawn only where a DR3 dossier partner names
the far seat; time from the host's law labelled "on foot", frozen weeks on a normalized campaign; rings as isotropic
effort isochrones; `worldUnits` a view key (never an `adjust`) with a world-zoom scale bar (J-RR.25). *Targets:* items 686, 717, 753.

**RR-26 — The fabric charter: a crosswalk and three conflicts ruled.** *From* SF-1, SF-5, SF-13. *Evidence:* OD-FC-38 sends the
FABRIC program to "the map program's own family"; its §0.0 rule "governs every decision in this family"
(`DESIGN_FP_ARCH_MF.md:12,156-158`) [STATED]; the base sites a river through the core 100 % (`docs/design/judging.md:105`)
[OBSERVED]; relief off by default (ARCHITECTURE.md:13717) [OBSERVED]; item 23's parity default
(AMENDMENTS-2026-09-25b.md:216-220) [STATED]. *Refinement:* a crosswalk in the base's §15 recording every MF law's status
(evidence, not adoption — MF §0.0 is not PLAT's decision rule); on a chartered frame a non-riverside dossier town is
never bisected (`near` mode); riverside shares a table tendency with the parity presets keeping "through"; relief auto-on
in hachure on the default preset only (J-RR.28). *Targets:* items 753.

**RR-27 — A placed town that grows keeps meeting its charter.** *From* SF-6. *Refinement:* `requestCharter` sizes the frame at
the dossier's peak; a `growPlacement` edit re-emits (world stamp) or re-blends (settlement stamp) at the new ring
(J-RR.29). *Targets:* items 715, 730.

**RR-28 — Site adoption on a settlement-stamped placement is the DM's choice.** *From* SF-7. *Evidence:* V14 adopts on every
`placed` outcome (V14:1887-1898,2311-2318), against C13-25's two verbs and T-V13-13's byte identity; a free site is never
inside a frame (J-V14.41) [OBSERVED]. *Refinement:* automatic only on a world stamp; on a settlement stamp the dry run
lists covered sites with adopt / move the site (preselected) / cancel (J-RR.29). *Targets:* items 763, 767.

**RR-29 — The world document needs a home in the host.** *From* SF-8. *Evidence:* frames are stored by the host (base §11.3,
V08's MapStore) [OBSERVED]; the world document (≤ 24 MB) has no store, key or lifecycle (V13 §8.5, proposal §6) [OBSERVED].
*Refinement:* a per-campaign world record on the MapStore pattern with ten lifecycle paths; a placed frame opened
without its world falls back to recorded values and refuses placement edits (J-RR.27). *Targets:* items 706, 721, 749; §5 H10.

**RR-30 — Two small frame readings.** *From* SF-10, SF-11. *Refinement:* a regional skeleton before nuclei on frames with
two or more road entries (auto forms only); besiegers' camps and razing scars by the force's direction through the
world, the razing bearing recorded once in the epoch (J-RR.28). *Targets:* items 753.

**RR-31 — Every user-facing generate and reroll mints entropy.** *From* SF-9, BA-12. *Evidence:* EP's generator law and
census A11 "COUNTER, NOT ENTROPY" (`DESIGN_FP_ARCH_EP.md:299-309,2705,3788`) [STATED]; Enter and "Same kind, new seed"
are seed + 1; New random and rerollLayer are counters (ARCHITECTURE.md:10183-10237,10390,11204) [OBSERVED]; the kernel
packs reroll and salt as opaque u16 (`plat/packages/kernel/src/rng/mixer.ts:145-157`) [OBSERVED]. *Refinement:* app-layer
entropy recorded in the event; the host mints the world seed and keeps it with the campaign seed (the address door)
(J-RR.41). *Targets:* items 753; §5 H7.

### 3.6 Belief, audience, determinism and time

**RR-32 — The world follows the host back after a rewind.** *From* BA-1, BA missed 3. *Evidence:* undo deletes the history
entry and the next advance mints a fresh nonce (`DESIGN_FP_ARCH_EP.md:264-310,2500-2506`); `undoLastPulse` is live today;
a parked advance supersedes its pause commit at resume (`advanceInterval.js:325-340`) [STATED/OBSERVED]; no message
retracts an event (V13:880,1674-1677) [OBSERVED]. *Refinement:* every recorded host input arrives as a windowed replace
keyed by host keys with `advanceNonce`; caused facts retract as groups; the present week of a host-bound world is the
latest window's end; a consumed DM edit inside a discarded window is unsealed (J-RR.36). *Targets:* items 671, 680, 692, 704, 721, 735, 750.

**RR-33 — Host facts carry the host's resolved audience.** *From* BA-2, BA missed 2. *Evidence:* war §1a law 6; WY §3c
fail-closed; the host resolves an absent siege visibility to public (`warStatus.js:70-123`) [STATED/OBSERVED]; DR44 draws
siege camps public without reading the host's audience (ARCHITECTURE.md:12976) [OBSERVED]. *Refinement:* gm → DM-only,
hidden never sent, one mapping at both scales; `local` admitted only through places on a world (J-RR.33). *Targets:* items 692, 694, 721.

**RR-34 — Players have no world view.** *From* BA-3. *Refinement:* a host `WorldRecord` with a party picture set rendered
under the party key; a world record whose existence is the secret is omitted with its geometry (J-RR.34). *Targets:* items 721, 737.

**RR-35 — Belief and live presence through one presentation-only door.** *From* BA-4, BA-5, PS-16, BA missed 4. *Evidence:*
the known-versus-true law and the DM-only believed view (`knownWorld.js:1-30`; `PerspectiveStandings.jsx:1-20`;
`BeliefDivergenceBand.jsx:1-27`); WY's ambiguity and covert laws [OBSERVED/STATED]. *Refinement:* `beliefView` (DM,
premium, belief-recording info mode) and `hostOverlay` (movers, embattlement phase) as transient presentation inputs drawn
through the base's live-layer registry, never read by a stage, an encounter or the clerk; dated standing states ride
`WorldEvent` windows; forecasts never enter the world (J-RR.35). *Targets:* items 675, 721.

**RR-36 — Places and hearings.** *From* BA-6, BA-7. *Evidence:* requirement 24(g)'s "where"; the registry's places
(`DESIGN_FP_COHERENCE_FOLD.md:249-251,353-388`); the base's `ConditionOverlay` window (ARCHITECTURE.md:2457) [STATED/OBSERVED].
*Refinement:* the typed `WorldWhere`, resolved at fold and kept as a dated fact under the verb law; `placeOf` words;
engagement states; docket pins DM-only; re-derivation only on resolved engagements (J-RR.38). *Targets:* items 671, 676, 692, 693, 721.

**RR-37 — History is an axis.** *From* BA-9. *Refinement:* `worldFactsAt(…, atWeek)`; past territory rebuilt from the log
(sway keyframes and traces, TR-21) (J-RR.39). *Targets:* items 676, 700.

**RR-38 — Edits on a host-bound world.** *From* BA-10, BA-15. *Evidence:* the decree law and read-only applied acts
(`DESIGN_FP_ARCHITECTURE.md:216`); the parked advance refuses edits (`settlementPendingEdits.js:134-143`) [STATED/OBSERVED].
*Refinement:* the genesis window closes at canonize; retcons only through a receipted re-canonize (`geometryShift`);
happened edits dated at the next tick head and posted as `physicalChange`; sealed undo on `consumed`; edits held while
advancing or parked; political and military kinds refused, the host's own command opened (no message proposes one); forks neither send
nor receive (J-RR.37). *Targets:* items 680, 721, 735, 736.

**RR-39 — First-visible signs and provenance both ways.** *From* BA-13. *Refinement:* an `events` layer with an "this
advance" filter; a glyph lifecycle mark at once; host receipt ids in reason inputs and world event ids in outbound
notices (J-RR.38). *Targets:* items 737.

### 3.7 The transition and the import

**RR-40 — The import of FMG maps.** *From* TI-1, TI-2, TI-3, DT-7, TI missed 3. *Evidence:* the fork is 1.114.2 and its own
full export already carries the grid-to-pack link (`public/map/versioning.js:19`; `export-json.js:26-221`); the scale is
drawn per map, the unit follows the browser locale, the frame is the window (`options.js:611-613`;
`sf-bridge.js:152-163`); FMG pixels are y-down [OBSERVED]; V13 refuses below 1.152, clamps the extent and states no flip
(V13:936-951,1919-1934) [OBSERVED]. *Refinement:* a pinned 1.114 adapter folder beside 1.152; a unit table in the schema
file (one table, two readers); no silent rescale (the DM's consent to rescale, crop or coarsen; the int32 lane
refusal); one stated y-flip transform reported on the import (J-RR.43). *Targets:* items 696, 707, 708, 725, 726, 728, 732, 739, 743, 744, 772.

**RR-41 — Legacy campaigns: placements, digests, captures, the plan.** *From* TI-4, TI-6, TI-10, TI-11, TI-15, DT-6, PS-6,
TI missed 2 and 4, RL-15. *Evidence:* embedded snapshots carry no burgs, states or provinces (`sf-bridge.js:123-150,509-514`);
re-canonize captures the live iframe and refuses without it (`campaignSpatialCanonize.js:69-78`); absent scale is legacy
forever (`DESIGN_FP_ARCH_WY.md:251-275`) [OBSERVED/STATED]. *Refinement:* host placements arrive as a recorded import
request (locked rows fixed in place); FMG cultures and states never steer an embedded snapshot's borders; geometry-1
digests kept forever; a capture freeze before retirement; the transition phases 0–5 with Bar T; a normalized-frozen
time basis for migrated campaigns; elective rebase (J-RR.5, J-RR.43, J-RR.45, J-RR.46). *Targets:* items 709, 725, 727, 728, 749, 754, 772, 773, 774, 775; §5 H18, H19, H20.

**RR-42 — Seed-only worlds and the launch classification.** *From* TI-5, TI-9. *Refinement:* a geography-source axis
beside the plan law; the realm map's replacement classed as part of the map module's post-launch disposition (owner
question Q-RR-2) (J-RR.46). *Targets:* items 749, 754.

**RR-43 — Modalities: sight, air, teleport.** *From* TI-12, TI-13, TI-14. *Refinement:* `@plat/world/sight` (viewshed and
intervisibility; consumers: site coverage, a patrol detection modifier, beacon graphs); `aerialLegs` only for canons
whose stamp names the world; no teleport or magic link drawn (J-RR.44). *Targets:* items 670, 676.

### 3.8 Territory, sovereignty, vassals, occupation, enforcement and patrols (owner rules T1–T3)

**RR-44 — The port's political input asks for map tuning the host lacks and cannot carry what it has.** *From* TR-2, PS-9,
BA-14 (3), PS missed 5 and 6. *Evidence:* the host's relationship planes, subordinating term kinds, occupation rungs with
dwell, satellites as property, sovereignty transfer at mint (`canonicalRelationship.js:11-35,100-106,197-219`;
`occupation.js:5-19`; `hegemony.js:9-18,49-60`; `sovereigntyTransfer.js:9-19`) [OBSERVED]; no budget, cost vector or
state key exists in the host (grep) [OBSERVED]; hegemony is a pattern, never an entity [OBSERVED]. *Refinement:*
`polity(world, PolityFacts)` per advance window (seats with tier, population, prosperity, banded military; links with
canonical labels and term kinds; pairwise relations; holdings; claims), folded into dated dossier-tier events; no realm
entity, names only by the DM's christening (J-RR.47). *Targets:* items 667, 668, 671, 678, 682, 689, 693, 709, 714, 721, 724, 727, 730, 731, 733, 734, 746, 749; §5 H13.

**RR-45 — Two partitions, never one.** *From* TR-1, PS-3. *Evidence:* the host's territory is total and is the substrate of
its distance law (above); W8 is budgeted and leaves land unclaimed (V13:1366-1375) [OBSERVED]. *Gap:* gates from a
political partition would sever travel, re-tier pairs and re-pathfind on every border move. *Refinement:* W8a seat
territory (the host's meaning, in the canon, changing only at a membership re-canonize); W8b sway (the political
overlay, revisioned, map feed) (J-RR.48). *Targets:* items 664, 667, 671, 677, 679, 683, 689, 693, 701, 703, 705, 714, 722, 723, 737, 742, 746, 750.

**RR-46 — The strength law: bounded but exponential.** *From* TR-3, DT-8, TR-19. *Evidence:* the owner's T2; the one-substrate
law; the host's foot speed and army factor (`modeSpeeds.js:53-54`; `armyTransit.js:57`) [STATED/OBSERVED]; the manager's
formula gives reach linear in tier [INFERRED]. *Refinement:* log-domain integer strength over travel time on the host's
cost law; τ growing at least ×1.5 per tier, × size × prosperity × (1 + chain bonus); a navigable river adding its own
crossing time; reach = min(Λτ, capTier); unclaimed land wild;
J382: culture slows each step by the host's own culture distance (banded in fifths, held for a dwell and through an occupation; no map-invented measure — and the host's measure counts a shared sovereign; sent plain, without a trade tie, J384 (2)), and water carries the sway only along the host's lit lanes, to a coastal lodgement, never the far shore (J-RR.49). *Targets:* items 664, 667, 683, 693, 695, 699, 714, 743, 746, 756.

**RR-47 — Neighbours and the debatable land.** *From* TR-4. *Refinement:* four classes from the host's relationship-state labels (the plane its simulation reads; *tributary* has no
relation-label producer there, so a tributary is a live tribute term); the local pair
decides; a debatable band only between adversaries within the civil margin; seat cells always held; smoothing never
crosses an allegiance line (J-RR.50). *Targets:* items 667, 693, 695, 699, 714, 743, 746.

**RR-48 — The vassal chain.** *From* TR-5. *Evidence:* amendment S's three-leg reach; `MAX_REINFORCEMENT_WEEKS` counts army
weeks (`sovereigntyReach.js:19-34,81`) [OBSERVED/STATED]. *Refinement:* an allegiance graph; continuity from the host's
verdict when sent, else the physical reading within the host's band; a bounded chain bonus that grows the overlord's own
limit (T2's clause); reinforcement in adversarial comparisons only; the cap derived from the host's band in cost units under its sent calibration (under three and a half median
tier-1 hops on its normalized arm), never a day count and never authored; continuity in two passes; exclaves kept
(J-RR.51). *Targets:* items 667, 672, 693, 695, 699, 714, 743, 744, 746.

**RR-49 — Military enforcement is a tie-breaker only.** *From* TR-6, WS missed-1. *Evidence:* the owner's T3 ("still having
the cieling … where contested, this also becomes part of the tie breaker"); V14's dangling `WorldSiteHost.strength`
(V14:559,1021,1994) [OBSERVED]. *Refinement:* a max-composed military log-strength at army pace, read only in debatable
cells; garrisoned sites held points; field armies presence only; no water cell is ever held, so there is no contested water
(J-RR.52). *Targets:* items 667, 693, 695, 699, 714, 743, 746, 758, 761, 763, 765, 768.

**RR-50 — Fights over the march.** *From* TR-7. *Refinement:* `MarchHold` bands moved only by the host's own engagement kinds (a
field battle, an intervention clash, a lifted siege or occupation; a raid on a settlement is an event at its victim),
decaying by a season, entering only the tie-break; the `fighting` overlay never moves a line; `borderSegment` places a
field battle whose record names no place (J-RR.56). *Targets:* items 667, 676, 692, 693, 695, 699, 714, 721, 743, 746.

**RR-51 — Events and the sway.** *From* TR-8, TR missed 2 and 5. *Evidence:* "OCCUPATION IS NOT ANNEXATION"; a razing demotes
"AND THEY LEAVE" (`DESIGN_REALM_DIRECTIVES.md:918-921,1064-1130`); death keeps the digest cell
(`DESIGN_SETTLEMENT_LIFECYCLE.md:12-15`); occupation's two spellings (`stressorGates.js:938-949`) [STATED/OBSERVED].
*Refinement:* the event → sway-effect table (J-RR.56). *Targets:* items 667, 693, 695, 699, 714, 743, 746.

**RR-52 — THE TENSION: frozen territory and gates versus live politics.** *From* TR-9, PS-3 (corrected), the manager's
reading. *Evidence:* the digest is never re-derived on load or per tick; re-canonize rebuilds the whole digest
(`campaignWorldPulseSlice.js:368-371`; `campaignSpatialCanonize.js:103-108`); occupation and border closure are live
overlays sampled at the hop (PHASE55:1197-1201,1365-1369) [OBSERVED/STATED]. *Refinement:* ruled at J-RR.53 below. (J-RR.53). *Targets:* items 667, 678, 693, 695, 699, 705, 706, 714, 721, 723, 724, 730, 734, 743, 746.

**RR-53 — Politics must not churn settlement maps.** *From* TR-10, SF-12. *Refinement:* the charter carries a political
snapshot read once; `polityOf` / `frameStanding` derived readings through `worldRef`; the coherence term evaluated once
at the placement edit; on a dossier-bound frame built responses arrive only as dossier changes (J-RR.30, J-RR.31). *Targets:* items 667, 676, 687, 693, 695, 699, 714, 716, 717, 718, 720, 743, 746, 770.

**RR-54 — Patrols.** *From* TR-11, DT-9, RL-11, PS-10, BA-14. *Evidence:* the owner's T3 ("also there should be patrols");
the host's interdiction patrols, wardenship receipts, Law 5 hidden roads unwatched (`routeNetworkConsumersInterdiction.js:1-36`;
`commercialReceiptPools.js:206-211`) [OBSERVED]. *Refinement:* cadence per (route segment, power) in weeks {1, 4, 13} or
none; host-asserted coverage first; else derived from the round trip at foot pace from garrisons and forts, moved one
rung by hostility and grade; presence on a fixed phase per (segment, power); map-tier presentation, never a host encounter;
offered per host edge per power as an extent and its basis, never a time (a cadence the host read would be a sixth
distance price); audience by the owning force's (J-RR.54). *Targets:* items 667, 671, 672, 679, 693, 695, 699, 714, 721, 729, 737, 743, 746, 766.

**RR-55 — Encounters and player borders.** *From* TR-12, TR-13. *Refinement:* `WorldFacts.polity` at point and week;
crop items; player sway re-derived over the whitelisted subset, covert omitted, force and culture bands only where the whitelist
admits them; per-audience lag only with a host change
(J-RR.55). *Targets:* items 667, 676, 700, 714, 721, 737, 743, 746, 764, 766.

**RR-56 — Rendering, border posts, provinces, the import's polity.** *From* TR-16, TR-17, TR-18. *Refinement:* allegiance and
member borders, tributary band, exclave halo, occupation hatch by rung (neutral ink when the occupier is unrecorded),
debatable cross-hatch, fighting marks; transient border-post proposals; provinces only standalone; FMG's Rival maps to
rival (J-RR.56). *Targets:* items 667, 679, 691, 709, 714, 737, 738, 739, 740, 743, 746, 756, 757, 759, 760, 762.

**RR-57 — Tests, budgets and retention for territory.** *From* TR-20, TR-21. *Refinement:* T-V13-16 and T-V13-39 rewritten
(the unclaimed share an output; exclaves flagged); new pins (flicker, snowball, debatable width, seat cells,
partition invariance); W8a on the coarse raster; sway keyframes with a retention horizon (J-RR.4, J-RR.57). *Targets:* items 667, 683, 699, 701, 705, 714, 729, 741, 742, 743, 746.

**RR-58 — Legacy gates and border closure.** *From* TR missed 3 and 4. *Refinement:* an imported legacy world keeps the host's
gate references as world points so the optional per-crossing reads can light for legacy campaigns; an optional dated
trade stance per pair drawn on the shared border, dark until the host sends it (J-RR.56). *Targets:* items 689, 693, 714, 727.

**RR-59 — What flows each way for territory, and the host's changes.** *From* TR-15, PS missed 4. *Refinement:* §5's H13 and H16 (J-RR.47, J-RR.53). *Targets:* items 669, 721, 749, 776; §5 H1 – H21.

---

## 4 The refined approach, as rulings (vetoable under the delegation)

Each row: **J-RR.n | chose X over Y because Z.** File m's items carry them; the volume's own J-V13 rows (J-V13.63 –
J-V13.82, item 751) restate the ones that change a volume decision, and J-V13.11, .25, .30 and .56 are narrowed or
superseded (item 750).

### 4.1 The port's shape

| id | ruling |
|---|---|
| J-RR.1 | chose **the port replaces the FMG capture, not the frozen digest** — the host's digest builder takes one port canon at a receipted canonize and the digest stays the host's per-tick engine state — over "the digest is replaced by the port" because the digest is the deep-frozen, canon-versioned, capped substrate every mover reads through one gate and every lived ledger is keyed to; a live map call inside a tick would make replay depend on the world document and put asynchronous reads in a synchronous pure pulse (RR-1) |
| J-RR.2 | chose **two feeds** — the simulator feed (`canon`: integers with stated units, the host's closed vocabularies, host ids, world points; no float, prose, cache or echo) and the map feed (`mapFeed`, `derivedFacts`, `routes`: geometry and presentation, never persisted in the host's world state, never read by a pulse stage) — over one record with optional presentation fields because a persisted record must not depend on glyph-cache freshness and finite semantics forbids a float on a surface (RR-3) |
| J-RR.3 | chose **a canon of the map's own geodesic seat territory under the host's cost law** (travel slot: seats, crossings with the host's receipt inputs, integer costs; water slot: latent candidates, geography only; sites slot: frozen candidate ground per seat) with the host keeping Floyd–Warshall, tiers, candidate routes and its sea-lane law, over (a) the port emitting the all-pairs matrix, tiers and candidates (two implementations of the host's one distance law, and the N² matrix presses the 400 KB cap), (b) a resampled FMG-shaped pack at the host's cell budget (`hostPack`, TI-8) because a pack is a second lossy geometry whose cell ids would become lived keys and whose 0–100 heights and FMG biome ids would turn an import mapping into host law, and (c) W7's `costTotal` (path-dependent); the ecosystem export stays the reader for tools that are not the host; a conformance row ties the host's two builders on one fixture (RR-2) |
| J-RR.4 | chose **W8a on the coarse raster with each crossing refined on the fine grid within one coarse cell** over a fine-raster flood because the host's own resolution class is ~10⁴ cells, the continent's fine flood costs ~1.8 s on a path already over budget, and only the crossing cells feed receipts (RR-2, RR-57) |
| J-RR.5 | chose **no raster index crossing the port** — every position a world point; site candidates and gate sides as points; legacy satellite cells translated once through the import's export under a confirmed capture stamp — over cell ids tagged with a geometry version because an extent adjust or a rung change re-points every index and the host already persists a cell as lived history (RR-2, RR-41) |
| J-RR.6 | chose **the host's settlement id on every row and route identity (pair, mode)** over joining by name or keying routes by class because names are not unique, the host's edge id is (pair, mode), and a grade change must not re-key a route (RR-4) |
| J-RR.7 | chose **a canon envelope with a per-slot version vector, per-slot input hashes and a `causes` list** (geometry 2 = built from the map module's world; cost law as handed in; the host's vocabulary mapping versions; the overlay axis for seasonal and patrol slots) over one format version because a schema version says nothing of content, law or which axis moved, and requirement 20 wants a nameable parent (RR-5) |
| J-RR.8 | chose **a fifth host door in the base, "the world port, world documents only"** — recorded inputs logged and replayable (seat bindings and placements, polity facts, cost law, travel law, water requirements, events, network changes, genesis, `canonized`, `consumed`), presentation inputs never logged and read by nothing replayable (`clock`, `hostOverlay`, `beliefView`, `audienceKnowledge`) — with the never-read list scoped to the dossier door, over leaving the base contradicting the port it already carries, because a world document must still replay without its host and a frame still reads only its dossier and its charter (RR-6) |
| J-RR.9 | chose **the port consumption law**: the host simulation reads map-derived facts only from its own frozen record; any answer it consumes mid-campaign (a founding's site, a resettlement's charter, a re-derived border, patrol coverage) is requested between advances or at an advance head against a named world state and baked with its stamp; adoption of a new canon is the host's receipted canonize — H22's birth canon, its additive re-canonize on a later founding (new host behaviours, J386–J388; V13 §8.5's H22) or the DM's existing premium re-canonize — refused only while an advance is in flight or parked [Fable-reviewed 2026-10-18: J388/J389 refine the adoption path; the law's substance stands]; docketed engagements keep the place they baked; the world-port client joins K3's import scan — over live reads or automatic re-canonize because both break "a lived history, once lived, forever" (RR-1) |
| J-RR.10 | chose **the scale as a declaration** (a world header: unit cm, x east, y north, origin south-west, extent; the host stamps its own map unit's km — 0.001 for metres, 0.00001 for cm — never its default; a native cost-law row; explicit cost-law stamps; carry-forward only within one geometry version, a carried value never re-applied across the bump; an unscaled legacy campaign stays unscaled unless the DM elects; one host adapter converting y-north cm and the host's y-down render frame both ways) over a per-world float scale or carrying FMG's slider because a native world has one fixed unit and an unstated unit is OD-FC-22's miles defect again (RR-9) |

### 4.2 Distance, time and the cost law

| id | ruling |
|---|---|
| J-RR.11 | chose **effort, never weeks**: the port emits travel geometry and integer time-bearing land effort-metres with water metres apart (coastal, open sea, river, lake), and the host's travel law reaches the map as data (`travelLaw`: modes read, water pricing, rounding, floor, cap, grade multipliers, army and news arithmetic, the season calendar, terrain-season factors, band edges), stored as a `world.travel` host slice with a standalone default row whose derived values are never sent; every map-side time is `derivedTime(effort, mode, week, law)`, continuous except where it must match a host leg, labelled and stamped with the law's version; a day is a week ÷ 7 — over emitting weeks (a second clock and a sixth distance price) or a map speed table (two physics) (RR-10) |
| J-RR.12 | chose **the host's cost-law values in the map's schema**: `RouteCostLaw` (host-owned values and version; terms tagged `time` or `choice`; an elevation knee and a river-cell add so the host's v1 law is expressible; terrain-class rows as data) split from `RouteLayRule` (map-owned network formation: the reuse discount, classes, tolerance, cutoff, sea trunk and gap fix, exit run); adopting a native world is the host's declared cost law 2; `costTotal` is the undiscounted cost along the laid course, presentation only — over the map owning the law (a library update would move the host's times) or porting the v1 law verbatim (its inputs do not exist natively) (RR-10) |
| J-RR.13 | chose **no world edit reaches the simulation by itself**: a port version is an offer; inbound `canonized` names the version the host's digest read; every dry run, route-class edit and fork preview carries `timeDelta` against that baseline under the host's law with `W_TRAVEL_BAND_CROSSED`; the next port version carries a `TimeDeltaReceipt`; locality after a seat change is a transitive closure — over forbidding band-crossing edits (the DM's canon wins) or re-canonizing on every bump (RR-11) |
| J-RR.14 | chose **native worlds canonize on the normalized arm until the host's per-map band census lands** (every mover band derived from the measured spectrum or justified, the reinforcement band first), with tier-1 adjacency from the canon so the spectrum stays comparable, and the world dialog showing the scale-vs-mystery readout under the host's law — over lighting absolute distance at once because an authored band measured on a 2–8 week spectrum goes dead on a province world — a re-sequencing of OD-FC-22's lighting for worlds from the map module, recorded as H3's dated bracket (RR-9) |
| J-RR.15 | chose **time stations along every route and leg** (per-vertex cumulative effort and terrain class), `pointAtTime` weighted by the dispatch season and held for the leg, `pathGeometry` laid through the host path's gate crossings and frozen at dispatch, and in bound mode every host route ending at two host settlements — over interpolating by length or by the view week (columns race over passes; markers jump at season boundaries) (RR-12) |

### 4.3 Routes: the genesis network at world birth and route changes after it

| id | ruling |
|---|---|
| J-RR.16 | chose **the host owns the genesis network's topology and grades (its law and version), the world owns its geometry**: in a bound new world the host's generation path places its founding members through the port, derives genesis over the canon's products and sends one frozen `RouteGenesis` record (sent even while the lane is dark as a presentation call writing no world state); bound W7 lays exactly those edges in host-key order with the host's grades, no pair selection, no rank classes, no trails to host seats, a water edge as one water route between its port seats; standalone W7 routes among bound seats are tombstoned at binding; a campaign with no genesis keeps its drawn roads as presentation and gains a simulated network only by an owner-elective receipted genesis — over W7 as the genesis (a seat-rank law replacing the sacred access-graded one) or two selections side by side (RR-13) |
| J-RR.17 | chose **nothing moves a bound route silently**: W7 incremental (it lays only edges a host change names); a happened edit re-lays a route from its week as a dated version the host may adopt as a live overlay; an always-so edit, a recipe op, an adjust or a regenerate mints a lay version adopted only by the host's re-canonize (`W_HOST_CANON_BEHIND` until then); a cost-law change is the host's own re-canonize; a host seat's origin is refused under the host's move-lock (`refuse.place.hostLocked`; bearing and mirror admitted) and its unplacement in the world editor by a map rule, the host's own removal arriving as `unbindSeat` (the host locks moves only; adding and removing stay ungated) — over re-derive-and-notify or freezing all world editing (RR-14) |
| J-RR.18 | chose **the lived network mirrored as host facts** (`network(world, changes)`: chartered, promoted, demoted, abandoned, revived, facet, retract; only `chartered` lays new geometry; a revival restores its hidden polyline; a hidden land edge a DM-only ghost, a hidden water edge a quiet-quay mark) with the route layer, the frame's road rows (`roadsAt(placement, week)`) and siting reading the network at the week, hidden roads counting as no public road — over drawing only genesis or letting the map run the lifecycle (RR-15) |
| J-RR.19 | chose **the route record keyed to the host** (`hostKey`, mode land or water with water runs, grade with `hidden`, origin, catchment and political runs, stations, receipt) with `routeFacts` (ids, integers, bands, no `costTotal`) for the simulator and `routes` (polylines) for presentation; grade edits on a host route refused; the DM charters through the host's own command from the world editor (the world offering a read-only path preview, never a command channel); a course correction recorded geometry; isolation a fate (no trails to host seats, a widening ladder, an unpathed edge drawn honestly); genesis-on-join a host change; a world-first settlement's access word derived host-side from its charter — over the map writing lived edges or a map-to-host command flow the identity ruling does not admit (RR-16, RR-17) |

### 4.4 The port rule, water and seasons

| id | ruling |
|---|---|
| J-RR.20 | chose **the world supplies the geography half of the port rule only** (`waterAccess`: class, eligibility in true metres under the host's reach and band thresholds, the sea or lake fronted, the river band, the sailing body), the host keeping its institution half and its verdict, which returns only as a view-only seat attribute; W6's harbour promotion runs on standalone worlds and as a suggestion — over the map computing the port (a fork of the host's single writer) or keeping `port: boolean` (W6's one-per-landmass rule contradicts the owner's) (RR-18) |
| J-RR.21 | chose **latent water candidates in the canon's water slot** (per sailing body: MST plus each eligible seat's K nearest by water cost, K the host's; rivers along reach courses; lakes as sailing water) as geography, their paths map-feed geometry, a `WorldRoute` only for a host-named edge — over laying water legs only between flagged ports (every harbour founding a geometry re-canonize) or the map applying the host's domination prune (RR-19) |
| J-RR.22 | chose **one lake vocabulary and a physical record per settlement**: subtype fresh, brackish, salt or dry by one precedence rule at both scales, ice as 52-week sets; `SettlementMapRecord.physical` sampled from the world after the blend; the host re-versions its lake and climate laws over these, owner-signed — over two vocabularies or the map computing the host's band (RR-20) |
| J-RR.23 | chose **the calendar agrees with the host's**: the hottest week 23 in the calendar hemisphere (midsummer 19 plus four weeks of land lag; the coldest 49, inside the host's winter quarter and V11's ice bands) and 49 in the other; the calendar hemisphere is the one the host's seasons name; a cross-equator host world keeps physical truth and reports lagged seats (`W_WORLD_HEMISPHERE`) with an optional, owner-signed host lag; the seasonal states (ice, high water, snow on a route's highest segment) as 52-week sets keyed to the host's week of year with per-quarter counts, every multiplier the host's — over phase 30/4 (frost in the host's spring), phase 19 (no lag) or clamping southern cells (falsifies climate) (RR-21) |

### 4.5 The settlement frame and the fabric laws

| id | ruling |
|---|---|
| J-RR.24 | chose **the forced-fact precedence by the placement's stamp**: a frame generated from a placement (stamp `world`) — dossier-tier facts > the DM's locks and drawn constraints > the charter's boundary facts (MF's "state" slot) > tier priors > terrain plausibility > jitter; a frame that predates its placement (stamp `settlement`) — dossier-tier facts > the frame whole, generated and edited > world facts only as derived readings through `worldRef` (the world bends, P2–P3); `worldWins` the only path from the second to the first, keeping the first two rungs; a world edit whose cascade would contradict a dossier fact on a world-stamped frame raises `W_EDIT_DOSSIER` (keepDossier: the stamp becomes `settlement`, `Recipe.charter` kept, the mode keyed on the stamp; moveTown; cancel); no lawful origin leaves the frame standalone with an optional DM-authored terrain offer — over MF's ladder verbatim (world facts below tier priors break realm coherence) or one ladder for both stamps (existing towns re-derived) (RR-23) |
| J-RR.25 | chose **roads meet the world at the gates on every placed frame**: highway and road charter crossings forced gate picks routed through the margin to their station; every placed frame's exits W7's terminals; `requestCharter` laying the town's own links first; `roadToNowhere` and `roadUnmatched` reported readings, never annotations; the dossier's access word caps class and count; sea and river roads binding to the harbour and landings; the neighbour edge drawn only where a dossier partner names the far seat, labelled walking time ("on foot") or the host's frozen weeks — over routing to the centre or speculative annotations (RR-24, RR-25) |
| J-RR.26 | chose **a water edit reaches the simulator only through the facts digest** (the `physicalChange` offer with its durability — event, permanent or retcon; event durability a dated live overlay; the rest the host's receipted re-canonize), a host flood raising world water only by the DM's attribution, and the host's frozen water verdicts as `hostRequires` guarding the cascade (`refuse.world.hostRequires`, `keepResidual`) — over polling, automatic re-canonize or physics from a cosmetic flavour (RR-18, RR-22) |
| J-RR.27 | chose **the world document stored by the host per campaign** on the frames' store pattern, with ten lifecycle paths, a placed frame opened without its world falling back to its recorded values and refusing placement edits — over "may store" (placed frames could not replay) (RR-29) |
| J-RR.28 | chose **the FABRIC program as evidence, not as PLAT's decision rule**: a crosswalk row per MF law (met, met for the host, conflict ruled, realm seam open, not applicable); the three conflicts ruled — a chartered frame whose dossier is not riverside is never bisected (`near`), riverside shares are a table tendency with the parity presets keeping "through"; relief auto-on in hachure on the default preset only; the reroll counter replaced by entropy (J-RR.41); and two small readings (a regional skeleton before nuclei for auto forms; siege and razing bearings from the world, recorded once in the epoch) — over adopting MF §0.0 (its "risk is never a veto" sits against the base's pre-decided fallbacks and the M0 freeze) or ignoring it (RR-26, RR-30) |
| J-RR.29 | chose **a placed town that grows keeps meeting its charter** (`requestCharter` sized at the dossier's peak; `growPlacement` re-emits or re-blends) and **site adoption automatic only on a world stamp** (on a settlement stamp the DM picks adopt, move the site — preselected — or cancel) over forbidding growth or adopting without consent (RR-27, RR-28) |
| J-RR.30 | chose **the charter carries a political snapshot read once** (`polityAtCharter`), the frame's live political context a derived reading (`polityOf`, `frameStanding`) and the territory coherence term evaluated once at the placement edit — over a live territory row in the charter (every border revision would stale world-stamped frames and offer `worldWins`) (RR-53) |
| J-RR.31 | chose **on a dossier-bound frame the map never builds defences from a derived reading** (walls, repairs, glacis arrive only as dossier changes); it may offer a watchpost or bridge fort world site at an exit facing a standing debatable land — over a map epoch fortifying a town against its dossier (RR-53) |

### 4.6 Belief, audience, determinism and time

| id | ruling |
|---|---|
| J-RR.32 | chose **every map-side vocabulary token checked against the host's register**, recorded both sides (§3.1 RR-8's list) over prose qualification (code reads records) or renaming the host's landed words (RR-8) |
| J-RR.33 | chose **host facts carry the host's resolved audience**: public → public; gm → DM-only (`SecretState dmOnly`, so geometry is withheld too); hidden never sent; an unresolved audience stored DM-only; one mapping on world events and on the dossier conditions the frame draws; on a world `local` admitted only through the party's places — over a public default (leaks gm sieges) or a map-chosen secret default for military facts (contradicts the host's own public deployments) (RR-33) |
| J-RR.34 | chose **players see the world through a host `WorldRecord` party picture set** rendered by the module under the party key; a world record whose existence is the secret omitted with its geometry from every export a key does not admit — over a host-drawn second renderer or a read-only document for players (RR-34) |
| J-RR.35 | chose **one presentation-only door for belief and presence**: `beliefView` (DM, premium, belief-recording info mode; banded words only; "assumed safe" for what the observer never heard) and `hostOverlay` (movers, embattlement phase; projected for the audience before sending), drawn through the base's live-layer registry, never logged, never in a digest, export or reason chain, never read by a stage, an encounter or the clerk; standing states as `WorldEvent` windows; forecasts never enter the world — over the map deriving belief (a second writer, K3) or persisting movers (RR-35) |
| J-RR.36 | chose **the windowed replace** for every recorded host input (events, polity facts, network changes): after every advance, undo and resume the host sends its live set for a window keyed by host keys with `advanceNonce`, or by the host's pulse-history sequence while its advance epoch is dark (lit in no preset); the fold adds, supersedes and retracts, a retraction a forward host event never an undo target; caused facts retract as groups; the present week of a host-bound world is the latest window's end — over per-key retraction (the host would remember what it sent) or rewinding the world log (destroys the DM's edits) (RR-32) |
| J-RR.37 | chose **edits on a host-bound world follow the host's decree law**: the genesis window closes at canonize; retcons, regenerates, size and climate adjusts only as a receipted re-canonize (`geometryShift`); happened edits dated at the host's next tick head and posted as `physicalChange`; a `consumed` acknowledgement seals the edit; edits held while the host advances or is parked; political and military event kinds refused (`refuse.world.hostPolitical`), the host's own command opened from the world editor and no message proposing one; forks neither send nor receive — over free retcons under lived history or a shared undo stack (RR-38) |
| J-RR.38 | chose **typed places** (`WorldWhere`: settlement, wall, road with mode and leg fraction, border, supply line, region, point, off-stage) resolved at fold and kept as dated facts under the verb law, `placeOf` giving the hearing card's words, engagement states with DM-only docket pins and re-derivation only on a resolved engagement, an events layer with "this advance", a glyph lifecycle mark and provenance both ways — over raw points (stale, wordless) or re-deriving at the climax (RR-36, RR-39) |
| J-RR.39 | chose **history as an axis** (`worldFactsAt` as of a week; past territory from the log through sway keyframes and traces) over a second canonical history (RR-37) |
| J-RR.40 | chose **phantoms real-only**: never a seat, never placed, never projecting, patrolling or contesting; a home-and-record act an off-stage event at the home — over dropping phantom facts or drawing contests with no simulated side (RR-7) |
| J-RR.41 | chose **entropy for every user-facing generate and reroll**, minted at the app layer and recorded in the event (Enter and "Same kind, new seed" a fresh seed; New random and a layer reroll a fresh value in the recorded field; replay reads the record; typing a seed the address door), the host minting a bound world's seed and keeping it with the campaign's seed — over counters (EP census A11's defect) or entropy in the engine (RR-31) |
| J-RR.42 | chose **retention by owner of the fact**: the host's horizon governs host facts (the port gains removal and collapse rows); the map's horizons cover user events, the polity supersession chain and — by J384 (9), V13 §5.8 (8) — the lens plates (520 weeks whole, then one per 13 weeks, DM-pinned plates kept), in multiples of the host's interval keys, UNMEASURED until a long run of B-WORLD-lite under B-POLITY (V13 §7) [Fable-reviewed 2026-10-18: the plates' horizon added] — over a map-side collapse of host facts (RR-7) |

### 4.7 The transition for existing campaigns

| id | ruling |
|---|---|
| J-RR.43 | chose **the import reads what the host actually has**: a pinned 1.114 adapter folder for the fork's own full export beside the 1.152 one for users' files; the unit read per file through one unit table (shared with the host's scale conversion); no silent rescale — the DM consents to rescale, crop or coarsen, and an extent beyond the int32 lane is refused; one y-flip transform stated, rounded deterministically and reported; host placements as a recorded import request (verified rows become seats at their exact points, locked rows never moved, unverified rows sited); FMG cultures, states and burgs never steer an embedded snapshot; the host's frozen per-settlement verdicts carried as `hostRequires` — over the 1.152 floor (refuses the whole estate), a clamp, or an implicit flip (RR-40, RR-41) |
| J-RR.44 | chose **sight, air and teleport as readers and marks, never edges the map invents**: `@plat/world/sight` (a viewshed and intervisibility over the DEM with curvature; site coverage, a patrol detection modifier, beacon graphs); `aerialLegs` for named seats feeding only canons whose stamp names the world; teleport circles and magic as host seat facts drawn as marks with no link — over prominence proxies alone or drawn links (RR-43) |
| J-RR.45 | chose **the transition plan** replacing "migrate or freeze": Phase 0 now on the fork (the capture carries frame, seed, kind, scale and unit; a read-only export command; the regenerate seed recorded); Phase 1 before retirement (every saved map's capture frozen beside its digest, on the owner's next open and by a headless batch to a published deadline, public gallery rows first; verdicts confirmed, absent-with-witness, changed); Phase 2 the import on request, never on load; Phase 3 the world view of a legacy campaign with no world-state write (its overlays converted through its stored capture and the import transform; a world edit raising the host's divergence signal); Phase 4 an elective, premium, receipted rebase onto geometry 2 carrying every lived ledger by key; Phase 5 retirement at the deadline — every geometry-1 digest kept forever, Bar T (phases 0–3 change no world-state byte) — over forced migration under a geometry bump (rewrites lived futures, §764.3) or freezing on the fork forever (RR-41) |
| J-RR.46 | chose **a geography-source axis on share codes** separate from the plan law (old codes replay their plan byte-identically and draw natively, members at their plan positions through a declared transform) and **a normalized-frozen time basis** for migrated campaigns (every time the map shows for them from the host's frozen weeks) — over overloading the plan law or re-timing a living campaign (RR-41, RR-42) |

### 4.8 Territory and sovereignty (owner rules T1–T3)

| id | ruling |
|---|---|
| J-RR.47 | chose **borders as a projection of host political facts, never a fact**: `polity(world, PolityFacts)` per advance window (seats: tier, population, prosperity, the host's force band (its capacity facets bar the economy facet, renormalised on its existing five floors — J384 (4)) and garrison presence; links: the vassal labels of the host's relationship-state plane — the plane its simulation reads; the regional plane is never sent, merging the two being owner-gated (ODQ §64.2) — and its subordinating treaty terms, a treaty-held occupation flagged, occupation rungs from the union of the host's two spellings, `continuous?` when the host has a verdict; relations pairwise; holdings; claims), folded into dated dossier-tier events, budgets and cost vectors retired from the port, no realm entity and names only by the DM's christening — over the host authoring map tuning or the map reading host ledgers (RR-44) |
| J-RR.48 | chose **two partitions**: W8a the seat territory — the host's meaning of "territory", unbudgeted, total over reachable land, frozen, in the canon, changing only at a membership re-canonize (a placement, an unplacement, a future graduation; never a death, a resettlement or a satellite) — and W8b the **sway**, the political overlay with unclaimed and debatable cells on its own revision axis, in the map feed; gates never come from the sway — over one partition (politics would sever travel and move every week) (RR-45) |
| J-RR.49 | chose **the strength law in the log domain, integer and draw-free**: travel time t over the host's cost law at foot pace (civil) and army pace (military); L = Λ − t ÷ τ with τ = τTier[tier] × kSize × kProsperity × (1 + chain bonus), τTier rising at least ×1.5 per rung, kSize = 1.15^(size third − 1) and kProsperity = 1.1^(relative rung) — the seat's rung minus the realm's held lower-median rung, clamped ±3 (J384 (1); J385 gap 4; V13 §3.9 (7), J-V13.83) — so reach = min(Λ·τ, capTier) grows at least exponentially with tier, size and prosperity and is capped per tier [Fable-reviewed 2026-10-18: the log-linear factors J385 ruled added] — T2's "bounded but exponential" — every coefficient a `world.polity` cell UNMEASURED until the sweep of B-WORLD-lite under B-POLITY; a cell no seat reaches is wild; a navigable river adds its own crossing time (`river.crossingDays`); under the owner's J382: culture slows each step by the host's own culture distance (banded in fifths, held for a dwell and through an occupation, a pair the host did not send reading 0; no map-invented measure — and the host's measure is not purely cultural: its governance term counts a shared sovereign as closeness and shared traditions close it, recorded owner-visible, J382's reading vetoable; sent in its plain form, no trade tie, by J384 (2)), and water carries the sway only along the host's lit lanes — lit as its caravans read it: its frozen record's versioned lane slot with at least one lane, never its fleet switch (the 2026-10-18 re-judge of J382 (b); V13 §8.5's H25) — to a coastal lodgement, never the far shore — over the manager's S·e^(−t/τ) (reach only linear in tier), budgets in cell counts (rung-dependent) or a filled Voronoi (FMG's behaviour, against T2's limit) (RR-46) |
| J-RR.50 | chose **neighbour classes from the host's relationship-state labels** (the plane its simulation reads; kin: same allegiance; respect: alliance, patron–client, a live compelled-alliance term — the midline within each reach, no pushing; neutral: the stronger holds by the map's L; adversarial: the push is the host's — the two local seats compared on travel time at the steeper fade plus `margins.pushPerBand` per band of the host's own strength order, the map's τ keeping each side's reach, floor and ceiling (J384 (3); V13 §3.9 (8), J-V13.84) — with a debatable band where the lead lies within the civil margin), decided by the local pair at each cell, a third allegiance named `outranked` (never *claimant*, the host's word for an heir; J-V13.98) [Fable-reviewed 2026-10-18], seat cells and placed extents always held, smoothing never across an allegiance line; the host's own subordination set {tribute, compelled alliance, puppet seat, treaty-held occupation} is drawn three ways — puppet seats as members beside vassals and the vassalized occupation rung, tribute as a band, a compelled alliance as respect, a treaty-held occupation as an overlay — a divergence recorded and vetoable — over the roots' relation (invents a vassal's war) or one flood with relation-dependent costs (RR-47) |
| J-RR.51 | chose **the continuous chain of vassals as an allegiance graph** (members: vassals, the occupation's vassalized rung, puppet seats; a treaty-held occupation an overlay; satellites claim points; tributaries — a live tribute term — outside) whose continuity is the host's verdict when sent, else a shared bonus-free border or a route within the host's reinforcement band (in cost units under the host's sent calibration — on its normalized arm under three and a half median tier-1 hops — never a day count, never authored; hidden roads excluded), decided in two passes and never iterated, a bounded chain bonus that grows the overlord's own limit (δ 0.25, depth ≤ 2, capped), reinforcement only in adversarial comparisons, the realm's cap derived from the host's band, exclaves kept and drawn detached, tributaries outside the allegiance — over frontier-only reinforcement (misses T2's clause) or unbounded summation (snowball) (RR-48) |
| J-RR.52 | chose **military strength as a tie-breaker only**, T3's "still having the cieling": a max-composed military log-strength at army pace from members' force bands and garrison presence (the host's capacity facets bar the economy facet, renormalised on its existing latent-strength floors, J384 (4)), continuous members' forces (`memberForce`) and garrisoned sites, entering only cells the civil law left debatable, never extending reach, never moving a decided line, never touching a seat cell; a garrisoned site a held point except inside a seat's own cell or a placed frame's extent (an occupation mark there); a field army presence only (it moves borders only through dated outcomes); no water cell is ever held, so naval strength breaks no tie — over additive military everywhere or live per-tick armies (RR-49) |
| J-RR.53 | chose, **on THE TENSION**, the manager's event law for borders and the unweighted partition for gates: the frozen seat territory (with its gates, tiers and matrix) stays frozen and changes only at a membership re-canonize; the sway moves only on dated host events — a seat projecting or ceasing, a tier change, a prosperity rung held 13 weeks, a relationship class change, a link made, broken or re-rooted, an occupation rung, a sovereignty transfer at mint, a force band held for its dwell, a march-hold band crossing, a route-grade change that flips continuity, a DM lock — folded one revision per week, order-free, re-derived over its dirty box (the closure of every seat whose τ, M, reinforcement or continuity changed, grown to whole normalization components, byte-identical to a whole re-derivation), each window read as its end state with each fact's since-week, receipted (`polityRevision`, `SwayRevision`, sparse `SwayTrace`) on its own `swayRevision` axis with its own law version; a host read, if any, takes the sway as an advance-head overlay (fixed for an advance, at most one advance stale, stamped on the host's overlay axis, its own live occupation, relationship and closure reads overriding it at a hop); gate politics stay the host's live reads, with an optional per-crossing holder reading in the map feed that enters the host's per-gate pipeline only after the sway has passed its soak, as a per-gate policy the host may adopt gate by gate (J385; V13 §11's ruling, J-V13.96, §8.5's H16 — the intermediary settlement whose territory the path crosses, Phase 5.5 §II.3-4-e, keeps the gate until then) [Fable-reviewed 2026-10-18: J385's ruling replaces the owner-signed re-ruling] — over gates from the weighted partition (severs travel, re-tiers, re-pathfinds), gates as live overlays (re-pathfinds the memoized graph), continuous re-derivation (flicker, per-tick cost), a host re-canonize per political event (re-freezes geometry for politics), and borders drawn with gates simply left alone without the holder reading (it gives no reading the host could adopt; whether enforcement reaches a toll is the host's re-ruling) (RR-52) |
| J-RR.54 | chose **patrols derived, never random**: per (route segment, power) a cadence of a pass every 1, 4 or 13 weeks or none — host-asserted coverage first (an interdiction every week while it stands; a warden at least monthly; a hidden road none), else the round trip at the host's foot pace from the power's nearest garrisoned seat or fort over the segment, moved one rung by neighbour hostility, the host's route grade and the force band of the source the round trip is measured from (`forceShift`, J-V13.97 — T3's "military strenght to enforce" carried into the patrols) [Fable-reviewed 2026-10-18]; presence on a fixed phase — the week w with (w + phase) mod cadence = 0, the phase a hash of (segment, power) — so a patrol passes exactly every 1, 4 or 13 weeks; segments are stations fixed per lay version, owners read per week; both sides patrol their side of a debatable stretch; drawn as tints with no arrows; read by encounters as map-tier presentation, never a host encounter; offered to the host per host edge per power as an extent, a basis and the nearest garrison's key — never a time, which the host prices through its one distance reader, outcome rolls only and route choice through its belief —, consumed only by the host's choice; audience by the owning force's resolved audience; a fixed post's viewshed only a detection modifier — over a float coverage, a weekly roll, a map mounted speed or the host computing geometry (RR-54) |
| J-RR.55 | chose **encounters and player maps read the polity at the point and week** (`WorldFacts.polity`: holder, allegiance, status, sides, occupation, patrols, fighting) and players' sway re-derived over the host's whitelisted subset with covert links omitted and force and culture bands read only where the whitelist admits them, per-audience news lag only through an optional host change — over showing players the truth or reading per-court belief (RR-55) |
| J-RR.56 | chose **the fights, events and pictures of the sway**: `MarchHold` bands moved only by the VERDICTS of the host's own engagement kinds (a field battle's or an intervention clash's winner, the relieving side of a lifted siege or a liberated occupation; a raid once the host sends its outcome word, H25) — never by an open engagement (J384 (5); J386; V13 §3.9 (11)) — and decaying by a season, entering only the tie-break; a `fighting` overlay that never moves a line [Fable-reviewed 2026-10-18]; `borderSegment` placing a field battle whose record names no place, a raid on a settlement an event at its victim; the event table (occupation an overlay, never ownership, a treaty-held one included; a razing transfers nothing, the reach following the host's own next tier; a death keeps the seat territory, drops its sway and draws the remnant by its grade; a resettlement re-projects at the smallest tier; vassalized joins; a transfer re-roots); allegiance and member borders, the tributary band, exclave halo, occupation hatch by rung (neutral ink when unrecorded), debatable cross-hatch; transient border-post proposals; provinces only on a standalone world; an optional dated trade stance per pair; the territory and patrol layers as the first rows of J379's lens mechanism (legend, audience filter, time scrub) — over FMG's states, provinces and diplomacy as data (RR-50, RR-51, RR-56, RR-58) |
| J-RR.57 | chose **the register words** of RR-8 and **the territory tests and budgets** (T-V13-16's unclaimed bar replaced by a measured band; exclaves flagged; pins for flicker, snowball, debatable width, seat cells, partition invariance, retention; W8b replacing W8's budget row; sway keyframes every 52 revisions with traces between, thinned past a century) over keeping the old bars (they would force reaches that fill the map) (RR-57) |

---

## 5 The refined host-change list (supersedes proposal-world-native §6's eight items)

> **[Dated bracket, 2026-10-17 — amendments n (`docs/AMENDMENTS-2026-10-17n.md`, items 817, 818 and 832; the realm review
> critic's gap 3, `docs/validation/coherence/realm-m-critic.md:48-61`): this list is SUPERSEDED BY V13 §8.5,** the design's
> one host-change list. V13 §8.5 carries H1–H21 with the clauses its first carry dropped restored — H12's per-evaluation
> ports totality, quiet-quay check and per-seat move-lock release; H13's claims, now with a W8b reader (V13 §3.9 (12));
> H14's terrain inputs, as the charter's terrain word — and gives content to the two phrases this list left undefined:
> H16's "route limits" (a water edge's limits read on demand, the physical half of row C2's capacity, through V13
> §3.11.6's `routeFacts`) and "flood exposure for new worlds" (the host's calamity exposure reading the terrain word H14
> derives from the charter — a riverside or coastal word already weights it — and the settlement's physical record's
> wet-season flood share only as a finer reading the host chooses, a declared shift; corrected 2026-10-17 by amendments o,
> `docs/AMENDMENTS-2026-10-17o.md`, the lens critic's gap 13, `docs/validation/coherence/lens-n-critic.md:110-112`, to
> agree with V13 §8.5's H16). It records the gate rule as J385 ruled it (H16) and adds H22–H30: a native
> world canonized at birth (J384 (6)) and the lens asks of `research/sf/lens-implications.md` §5. This section is kept as
> the review's record; read V13 §8.5 for the list in force. The host documents this review left unread (critic gap 13:
> the ODQ, `map-corpus/docs/GENERATION-SPEC.md`, the MF charter, `PHASE55_EXECUTION_PLAYBOOK.md` §0.2,
> `DESIGN_EDIT_MODE_AND_DECREES.md`, `DESIGN_NAVY.md`, `src/domain/roads/userRoutes.js`) are listed in amendments n item
> 817's evidence, the first three named generically in V13 §8.5's H21.]

Each item names the host program, document or law it touches, what changes, what it depends on (the host rows it builds on, and the map milestone of
V13 §8.2: M-W1 the world and the port's first calls, M-W2 routes, polity, siting stage 2, M-W3 labels, exports, the
adapter; M-SF the SettlementForge connection the port rides) and its order. Every optional read lands dark and
data-gated (absent ⇒ prior bytes) with its TIER line, degraded arm and coupling-registry row (requirements 17, 20;
CW-0). The old items map: 1 → H4, H5; 2 → H11; 3 → H12; 4 → H5, H18, H19; 5 → H11; 6 → H14; 7 → H18, H19, H20; 8 → H21.
The list is carried into the design as V13 §8.5 (file m item 749) and replaces the proposal's §6 (item 771).

| # | order | the host's program, document or law | what changes | depends on |
|---|---|---|---|---|
| H1 | 1 (now, pre-launch, on the fork) | Phase 5.5's spatial capture and canonize; the capture stamp (SEAM-3); EP's generator law (A12) | the capture reply carries the graph width and height, the map seed and kind, the distance scale and its unit; one read-only bridge command returns the fork's full JSON export for the loaded snapshot (one documented module patch: the export function is module-private and refuses in edit mode); the world regenerate records its seed | nothing |
| H2 | 2 (now) | WY §1a.3, the per-map spectrum law and its lint census | every mover band derives from the realm's measured spectrum or carries an in-file justification, the reinforcement band first | nothing |
| H3 | 3 (now, documents) | the fold's §5 register and OD-FC-22; WY §1a.4; the mode-speed table's comment | register rows mirroring the map's tokens (RR-8); OD-FC-22's dated bracket: FMG's default unit follows the browser locale (mi on en-US, km otherwise), and for a world from the map module the source is the world's declaration, FMG's scale and unit read only inside the map's import; the disclosure's home is the map's world dialog; and OD-FC-22's lighting of absolute distance for new worlds waits, for a world from the map module, on the per-map band census (WY §1a.3, H2), by the host's own dead-band law — a dated bracket recording J-RR.14's re-sequencing | nothing |
| H4 | 4 | the host client (V08's message unions); FP L1 and K3; CW-0 | the world port's messages: outbound `canon`, `derivedFacts`, `mapFeed`, `charter`, `proposals`, `routes`, `routeFacts`, `patrolOffer`, `pathGeometry`, `borderSegment`, `placeOf`; inbound recorded `bindSeat`, `unbindSeat` (a host removal, offered to the re-canonize like an addition — the move-lock locks moves only), `importSeats`, `events`, `costLaw`, `travelLaw`, `hostRequires`, `canonized`, `consumed`, `genesis`, `network`, `polity`; presentation `clock`, `hostOverlay`, `beliefView`, `audienceKnowledge`; the offer `physicalChange` (with its durability); THE PORT CONSUMPTION LAW in code — no port call inside a tick, answers baked with their stamps, the world-port client in K3's pinned import scan | M-SF; M-W1 |
| H5 | 5 (lit only after Q-RR-1's answer) | Phase 5.5's keystone (II.2, II.4), J-D4, the satellites ledger, the territory lens | a second digest builder over the canon (travel, water and sites slots) with the reader-facing shape unchanged and every sub-digest sourced or declared absent; the conformance row (one fixture, two builders, identical ids, gates, costs, matrix, tiers); the cell-level consumers (orbit annulus, frontier map, the certification row, the territory lens) moved to the canon's per-seat queries and points; a satellite's site gains a world point | M-W1 (the canon); V13 §11 Q4 (Q-RR-1) |
| H6 | 6 | PHASE55 V.1 (the cost-law axis); WY-1's scale datum; OD-FC-22 | cost law 2 written in the map's schema (elevation knee, river-cell add, terrain-class rows), its cost-units row, an explicit cost-law stamp on every native digest; the scale stamp from the world's declaration (its own unit's km); carry-forward only within one geometry version, a reframe receipt across it; one coordinate adapter between y-north cm and the host's y-down frame, both directions | M-W1; H4; H5 |
| H7 | 7 (after H2) | WY-1's creation flow; EP's generator law | the host mints a native world's seed at its store layer per new-world click and stores it with the campaign seed (the address door); the first canonize stamps the scale only after H2 (until then the normalized arm with the canon's tier-1 adjacency); the scale-vs-mystery readout from the host's law | H2; M-W1; H4; H5 |
| H8 | 8 | WY §1a, WC §5.3 | send the travel law as data with its calibration (weeks per cost unit as two integers: its anchor weeks over its median tier-1 hop cost) at every re-canonize, normalized or absolute, and `canonized` per re-canonize; store the time-delta receipt at re-canonize; for a migrated normalized campaign, send its frozen leg weeks | M-W1; H4 |
| H9 | 9 | EP §0.1/§3c; war §1a law 6; WY §3c | send the events window after every advance, undo and resume, keyed by the advance nonce when the advance epoch is lit (`advanceEpochEnabled`, lit in no preset until OD-FC-31/32 are built) and by the pulse-history sequence until then, committed facts only (never a forecast); the resolved audience mapping (gm → DM-only; hidden never sent), applied to the dossier conditions the frame draws as well | M-W1; H4 |
| H10 | 10 | L4 and requirement 22 (persisted shape); the veil; the gallery | a per-campaign world record beside the per-settlement map records (snapshot, log, backups, quota; ten lifecycle paths); the players' realm tab from its party picture set; world pictures through the gallery's veil | M-W1; H4 |
| H11 | 11 | PHASE55 §4j; route lifecycle Law 6; J-D11; CAP-3, CAP-4 | the port verdict computed over the canon's eligibility and sent back view-only; per-settlement `hostRequires` from the frozen canon; sea lanes and earned-port edges over the canon's latent candidates under the host's own sea law; a lake-typology version admitting salt (and brackish by choice) and a climate-band version over the settlement's physical record, both owner-signed; the biome mapping read from the map's adapter; existing configs' terrain words untouched | M-W1 (physical record), M-W2 (water slot); H4; H5 |
| H12 | 12 (with OD-FC-18's mount, chain C3's first unit after the release) | route lifecycle (Laws 1–6); OD-FC-18; J-D3 | genesis at world birth over the canon's products with the founding members placed first; the genesis list sent even when the lane is dark (presentation); the later-lit ruling; the render tier's roads retired; route events and facet diffs per advance; genesis-on-join and §8's per-evaluation ports totality; the charter command reachable from the map's world editor through the host client; the quiet-quay rule for water decay checked; the move-lock's release named per seat | M-W2; H4; H5; OD-FC-18's mount |
| H13 | 13 | the war program (law I), occupation, sovereignty, hegemony, the strength facets, route lifecycle, the relationship planes | polity snapshots per advance window: seats with tier, population, prosperity and its force band and garrison presence (the capacity facets manpower, institutions, materiel, logistics and will — the economy facet excluded by J384 (4) — renormalised and banded on `STRENGTH_BANDS`' five floors; the garrison institution bucket — no new banding); links in the relationship-state plane's vassal labels (the plane the simulation reads; merging the planes is owner-gated, ODQ §64.2) and the four subordinating terms, tribute and compelled alliance as live treaty terms, a treaty-held occupation (`occupation_continuation`) flagged; occupation as the union of the ledger and the stressor; relations pairwise in the same plane; holdings and claims; route grades; patrol facts (interdictions, wardenship terms); **by J382, the host's `cultureDistance` in its plain form over its whole vector (no trade tie, J384 (2)) for every pair within its reinforcement band or at neighbour tier ≤ 2, banded in fifths, and whether its sea-lane system is lit with its adopted lanes**; the DM's christenings; the per-link continuity verdict whenever the sovereignty market is lit (optional while dark); optionally, the host's choice, a per-tick capture of political deltas during an advance (the dated rung changes of tier, prosperity and force band) into the window | M-W2; H4; H9 |
| H14 | 14 | proposal §6 item 6; Law 2 | for a settlement generated from a world charter, the access word derived from the charter's road and water facts before generation (the table of RR-17) and the terrain inputs from the world; existing campaigns' configs stay canonical | M-W1 (charter), M-W2 (roads); H4 |
| H15 | 15 | L10(d); PHASE55 V.1; OD-FC-8 | world edits held while an advance runs or is parked; `physicalChange` applied at the next tick head as a first-class cause carrying the DM's attribution; `consumed` acknowledgements; `geometryShift` and lay versions adopted only by the receipted re-canonize; a canon-diff dry run (membership, edges, reach-band crossings) before adoption | M-W2; H4; H5 |
| H16 | 16 (each optional) | requirements 17 and 20; CW-0; the provenance ledger; Phase 5.5 §II.3-4-e (the per-gate pipeline); the one-substrate distance law | optional consumers: the crossing holder enters the per-gate pipeline only by an owner-signed re-ruling of who keeps a gate (today the intermediary settlement whose territory the path crosses), with its own register row — until then a map-feed reading only; patrol coverage re-priced through the host's one distance reader, read by outcome rolls only, any route choice reading it through the host's belief (`knownWorld`), and the crossing holder likewise — never a time or a cadence from the map; the sway as an advance-head overlay (fixed for an advance, at most one advance stale, stamped with `swayRevision` on the overlay version axis, the host's live occupation, relationship and closure reads overriding it at a hop); the border segment and the typed place as a hearing card's "where" — a field battle placed at the settlement its record names (its persisted `region`) where it names one, and a border segment offered where it names none touching the owner-gated field-battle place question (Q-W4), lit only on the owner's word; the seasonal block in the seasonal overlay; route-fact deltas as overlays; route limits; flood exposure for new worlds; aerial legs for the air field; the canon's cause list as `causedBy` parents of a canonize receipt; a hemisphere lag in the season read (an owner-signed shift) | M-W2; H12; H13 |
| H17 | 17 | WY §3a–§3c; the believed-world reads | the presentation messages: `hostOverlay` (movers and embattlement phases, projected for the audience) and `beliefView` (DM, premium, belief-recording info mode) | M-W2; H4 |
| H18 | 18 (before the fork retires) | Phase 5.5; the capture stamp; the gallery | Phase 1: every saved map's capture frozen and stored with its export (owner's next open plus a headless batch to a published deadline; public gallery rows first; confirmed, absent-with-witness or changed verdicts); legacy re-canonize reads the stored capture through its existing injected capture seam; satellites' cell keys translated once from the export under a confirmed verdict | M-W3 (the 1.114 adapter); H1 |
| H19 | 19 (after M-W3) | WY §1a.1; II.5-3; §764.3; the host's map surfaces | Phase 4's elective, premium, receipted rebase per campaign; share codes gain a geography-source axis; custom-backdrop campaigns gain an elective trace-a-world path; the host's map surfaces re-pointed (the territory lens stays on the seat territory, H5 — its own law draws the frozen partition verbatim, `TerritoryLayer.jsx:1-31` — and the sway is drawn by a new lens under its own registered name, the allegiance lens, the owner's choice; roads → map-feed paths; travel rings → host bands; travellers → the overlay; the charter road card → its edge's path) | M-W3; H5; H6; H18 |
| H20 | 20 (at H18's deadline) | the fork | the fork, its CSP, origin, hash manifests and validation gate retired; snapshot blobs and exports kept read-only for a stated retention | H18 |
| H21 | any | the audit's unknowns | the modified upstream source, the missing design documents (the FMG weave volume on the ledger branch), the production frame size, other snapshot versions | nothing |

---

## 6 The owner questions that remain

Only questions the owner's own earlier words reserve, or that move a living campaign's lived future, are asked; every
other choice is ruled above under the delegation. Two questions this review first carried — culture as a resistance to
the sway and the sea as cheap carriage with coastal lodgements — were answered by the owner while it was being written
(J382, "yes") and are ruled into J-RR.49 (with RR-46) — never into J-RR.52, which carries no J382 clause [Fable-reviewed 2026-10-18: RV-4's second site].

- **Q-RR-1 — J86's door 1 and the world canon** (V13 §11 Q4, file m item 755). The base reserves opening J86's door 1
  (the host's simulator reading the map's geometry) to the owner's explicit word. The world canon replaces the FMG capture
  the host's simulator already reads, carries no frame or arena geometry, and reaches the simulation only at a
  DM-confirmed receipted re-canonize. *Recommendation:* confirm that the world canon is outside door 1 (or open door 1 for
  world-scale derived facts only); the settlement frame's geometry stays behind the closed door. Until the answer, the
  host's builder over the canon (H5) stays dark; the design proceeds. (J-RR.8.) [Fable-reviewed 2026-10-18: answered — the owner's
  "1. yes" of 2026-10-18 (docs/AMENDMENTS-2026-10-18r.md item 926; J391 (1)): the world canon stays outside J86's door 1,
  door 1 itself stays closed, H5 and H22's birth canon are lit; V13 §11 Q4.]
- **Q-RR-2 — The host's schedule and the launch classification** (V13 §11 Q2, item 754). ODQ §764.5 clears only the
  settlement-layer map module for post-launch; the world regime replaces the launch-core realm map. *Recommendation:*
  class the realm map's replacement with the map module's post-launch disposition; the host launches on the fork with
  H1–H3 done; H4–H11 with M-W1, H12–H17 with M-W2, H18–H20 after M-W3; the transition per campaign, opt-in and
  data-preserving. (J-RR.45.)
- **Q-RR-3 — The elective rebase of a living campaign** (V13 §11 Q1, item 754). Phase 4 moves a campaign's lived
  futures (§764.3's owner-gated class of same-seed movement). *Recommendation:* offer it per campaign, premium, default
  keep, with the full forecast diff; never automatic. (J-RR.45, J-RR.46.)

---

## 7 The M0 impact statement

**No refinement changes a frozen kernel row or stream; one append to the kernel's concern registry (`world.patrol`,
beside BCR-V13-8's world concerns) is a reviewed C-0020 change, lawful under K6 after M0.** Every new record, stage, reader and message lives in `@plat/world`,
`@plat/port/world`, `@plat/sites`, `@plat/layout`, `@plat/export`, V08's unions or the host's own code. Checked against
`plat/docs/build/M0-world-sites-gate.md`:

- K3 (`Frame` purely local; no absolute position in a digest) holds: placements, the canon, the sway and every world
  point live in the world document; a frame's model digest still reads neither `worldRef` nor `Recipe.charter`
  (J-RR.30 keeps politics out of the charter's re-emission, so T-V13-2 stays true).
- K6 (registries append-only; a new stream independent) covers the one new concern this review adds, `world.patrol`
  (a fixed-key phase hash through the one mixer — the segment's lineage as the entity key, the power's host key hashed
  into the u16 salt, epoch 0, attempt 0, the week never in the key — no stream of draws; V13 §3.17, item 729); W8b and
  the border-post proposals draw nothing (`world.polity` stays a reserved id). The world's concerns (`world.*`) and
  stage ids (`W0` … `W9`, with `W8a` and `W8b` beside `W6a`/`W6b` and `W7a`/`W7b`) are append-only rows of the
  kernel's two registry files, none present today (`plat/packages/kernel/src/registry/concerns.json`, 93 rows, and
  `stages.json`, 25 rows; the mixer refuses a concern no row holds, `plat/packages/kernel/src/rng/mixer.ts:141-157`),
  landed with M-W1 and M-W2 through BCR-V13-8 (item 752), never before M0 — a change to the kernel package's data, not
  to a frozen row.
- K13 (no elevation in the kernel) holds: the viewshed's curvature and slopes, the strength law and the time stations are
  `@plat/world` arithmetic over the DEM and integers; no kernel primitive reads a z.
- J-RR.41's entropy changes only how the app layer chooses the recorded reroll and salt values; the kernel packs them as
  opaque u16 and refuses anything else (`plat/packages/kernel/src/rng/mixer.ts:145-157`; `types/rows.ts:22-27`), so the
  values are drawn in [1, 32 767] and [1, 65 534]; no kernel change.
- The model rows: M6's placement record gains fields (`hostKey`, `hostLocked`; the forced-fact ladder keyed on the stamp)
  without touching an arena digest; M5's one input record stays one (the charter gains fields — forced roads, the next
  settlement, `polityAtCharter` — and keeps one entry point); M8's reason record gains host receipt ids among its inputs
  (data, not shape); M9's list gains the new drawables (sway borders, hatches, patrol tints, event pins), each draped on
  the DEM (`{ surface: 'dem' }`, V13 §5.7, item 740); M1's namespace segment, M2's carve delta, M3's datum
  accessor and M4's water-table function are unchanged; the M1-carried rows (K10, K12, M1, M2, M4) are unaffected. No
  kernel row (K1–K13) changes; no model row's verification changes; nothing here is owed before M0 commits.
- The frame-side refinements (forced gate picks, the water mode, frame growth, the skeleton term, the relief default)
  are base requests owed to S0–S4 and §8–§9 (V13 BCR-V13-30 – BCR-V13-36), all after M0 and none in the kernel.

---

## 8 What stays PLAUSIBLE, and how it would be confirmed

| claim | why PLAUSIBLE | how it is confirmed |
|---|---|---|
| the canon builds in ≤ 2 s at the continent rung (WORLD-12) | coarse flood plus refined crossings, never measured | spike SP-W8 on B-WORLD-lite before M-W1's port |
| the host's two digest builders agree | conformance never run | the cross-implementation fixture row (H5) |
| every coefficient of the strength law, the margins, the chain bonus, the dwells, the patrol cadence rungs, J382's culture slowing (`phi` 0.5), the lodgement depth (0.5 foot-days) and the river's crossing time (0.25 foot-days) | historical anchors only (a market day, a city-state's two to three days, a realm limited by weeks of courier travel; the loss-of-strength gradient; central places; the Debatable Lands) | the 300-year soak of B-WORLD-lite under B-POLITY (V13 §7's scripted host) and M-CAL/world; each cell UNMEASURED until then (requirement 18) |
| the hottest week 23 (four weeks of lag) | land thermal lag is 4–6 weeks; maritime longer | T-V13-44's season pin over V11's climate rows; continentality-scaled lag if the pin shows a coastal bias |
| the fragile-leg flag (`TimeDeltaReceipt.fragile`, V13 §2.2), whose margin no design text states (5 % was this note's working value), and the time-delta usefulness | never exercised | B-WORLD with a host travel-law fixture |
| the 1.114 adapter's key list | read from the fork's export code, never run over a real snapshot | Phase 1's batch run and T-V13-45's synthetic 1.114 fixture |
| the league units (3 mi, 3 nmi) | FMG only labels them | shown and editable in the import dialog |
| the viewshed's refraction coefficient 0.13 | the standard terrestrial value, not this world's | none needed beyond the ridge and horizon pins |
| the capture freeze's coverage before the deadline | owners who never return | the headless batch's report; uncovered rows receipted "geometry not frozen" (their digests still simulate) |
| the host's acceptance of the fifth door and its presentation inputs | a base change the owner's door rules govern | Q-RR-1 and the coherence pass applying items 777, 778 and 779 |
| the standalone travel law's speeds (cart 120, river 250, coastal 600, sea 900 km a week) and the toll house's kind row | own values | the default row is never sent to a host; B-WORLD's statistics |
| the culture term as a per-step resistance rather than a destination penalty | the session's reading of J382 | the J382 pin of T-V13-41 (l) and the owner's veto |

---

## 9 Sources

**Read whole:** `research/sf/fp-simulator.md` (1,098); `research/sf/fp-physical-integration.md` (481); the eight
dimensions' verified findings (the scratch `surviving.json` rebuilt from `wf_e54a90fb-43c`'s journal, about 925 KB: every
kept finding with its verification, every missed item);
`docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` (182); `plat/docs/build/M0-world-sites-gate.md` (45).

**Read in part (map side):** `docs/volumes/V13-world.md` (2,988: §1.2–§1.4, §1b.2–§1b.3, §2.1–§2.8, §3.3 (3), §3.4,
§3.8, §3.9, §3.11 head and §3.11.4–§3.11.6, §3.12.1, §3.15, §4.1, §4.3–§4.5, §5.1, §5.4, §6's register, §7's rows,
§8, §9's rows, §10's head and BCR-V13-11, §11); `docs/volumes/V14-sites.md` (2.2 kinds and `WorldSiteHost`, the
siting terms, §3.9 (e), §3.10 E1, §3.13 E4, §4.5); `docs/design/proposal-world-native.md` (§0, §5–§13);
`docs/ARCHITECTURE.md` (§4.2 S3 (1) and (4), §2.3's `Terrain`, §4.7's wind rows, §6.1's reroll, §7.1's Same kind,
§7.7 item 1 and the world port paragraph, §8.2's relief tier, §9.5, §10.2's crisis looks, §11.4, §15's headings);
`docs/AMENDMENTS-2026-10-17l.md` (header and items 648–649, for form); `docs/AMENDMENTS-2026-10-16j.md` (items 131–136,
for the owner-rule form); `docs/PROGRESS.md` (J375–J382); `docs/HANDOFF.md` (the resume record); V13's §2.2 – §2.8,
§3.3 – §3.4, §3.7 – §3.9, §3.11, §3.14 – §3.17, §4, §5, §6 – §12 re-read whole for file m's quotes; V14's §2.2, §2.5,
§3.5, §3.9 – §3.13, §4.5 and T-V14-29; the base's §7.7 item 1 and port paragraph and §11.4; `plat/packages/kernel/src/rng/mixer.ts` (packing) and
`types/rows.ts`.

**The eight dimensions' verified findings** (DT-1 – DT-13 and two missed; RL-1 – RL-19 and four missed; PS-1 – PS-17
and six missed; WS-1 – WS-11 and five missed; SF-1 – SF-13 and four missed; BA-1 – BA-17 and five missed; TI-1 – TI-16
and five missed; TR-1 – TR-21 and five missed): every host citation above is the verifier's where the verifier
corrected the analyst; the host files themselves were read by those seats at `81f1cd96` and are cited here as they
cited them. This seat re-read the map-side anchors it quotes in file m and verified every quote by exact search and by
applying all 117 change items in order to copies of their targets (each quote exactly once at its turn, each
new text exactly once after: 0 quote failures). That first pass did not examine what each replacement leaves behind,
and item 754's quote stopped mid-sentence; at the revision (§10) the check gained a residue test (what the target keeps
after each quote must agree with how the new text ends) and a census of retired words over the applied targets — 170
fragments, 0 quote failures, one residue flag read and kept (item 713 (b), whose new text closes on a dash that the
target's parenthesis continues).

**Read in the host by this seat:** `src/domain/spatial/cultureDistance.js:1-60,140-200` (the culture-distance composite J382
names: five derived terms and a tradition-kinship closing pull (`:53-56`, `:195-198`), a live read of the world state, never of the frozen digest; symmetric, in [0, 1]). At the
revision, to verify the adversarial issues: `src/domain/worldPulse/peaceTermsCatalog.js:185-200`,
`peaceTermsDrafting.js:258-268`, `occupation.js:1-20,1240-1258`, `treatyEnforcement.js:125-152`,
`conquestExecution.js:30-45`, `hegemony.js:1-62`, `src/domain/relationships/canonicalRelationship.js:1-240`,
`src/domain/regionalGraph.js:28-42`, `convergence.js:795`, `sovereigntyReach.js:50-85`,
`src/domain/spatial/distanceRead.js:74-78,580-595,722-736`, `armyTransit.js:288-303`,
`routeNetworkConsumersInterdiction.js:1-36`, `src/domain/spatial/smuggle.js:245-272`, `commodityFlow.js:590-598`,
`advanceInterval.js:140-160`, `cultureDistance.js:1-70,140-205`, `migrationKernel.js:197,229-230`,
`src/components/map/TerritoryLayer.jsx:1-31`, `src/store/mapSlice.js:470-496`, `src/domain/display/engagementNarrative.js:10-108`,
`relationshipRulesAdversarial.js:262-315`, `armyTransitKernel.js:595-630`, `src/domain/display/armyStrength.js:40-56`,
`defenseInstitutionBuckets.js:80-93`, `src/domain/display/forceComposition.js:20-30`; docs
`PHASE55_SPATIAL_ENGINE_DESIGN.md:137-156,1046-1052,1186-1214,1363-1378`, `DESIGN_REALM_DIRECTIVES.md:1100-1121`,
`DESIGN_FP_ARCH_EP.md:5`, `DESIGN_FP_ARCH_WC.md:3742`, `DESIGN_FP_COHERENCE_FOLD.md:164-176,412`,
`DESIGN_ROUTE_LIFECYCLE.md:56-57,120`; and on the map side the kernel's `concerns.json`, `stages.json` and
`mixer.ts:135-160`. Every other
host citation is a verified dimension's. **Not read by this seat:** the host's ODQ (ledger branch); `docs/DESIGN_FMG_WEAVE.md`
(absent at `81f1cd96`).

---

## 10 Review record

Two adversarial reviews (2026-10-17) raised 51 issues against this note and `docs/AMENDMENTS-2026-10-17m.md` (file m).
Each was verified by opening the host's code or documents at `81f1cd96` and the map's targets; the fixes were made in
place in both files, folded into existing items as new fragments where a new place needed text, so file m keeps items
659–779. Every Current text was then re-verified by exact search and by applying all 170 fragments in order to copies
of their targets (0 quote failures; the new residue check flagged one fragment, item 713 (b), read and kept). Verdicts:
48 accepted (several merged with a sibling, four aligned with J384 as below), 2 accepted with a correction of the
issue's own claim or fix (11, 34), 1 whose gap was accepted and whose fix was rejected for another issue's (32). "Merged" names the issue whose text
carries the shared fix. Four fixes were aligned with the session's J384 rulings (`docs/PROGRESS.md` J384, landed while this
revision ran and to be carried whole by amendments n): the culture band in its plain form, without the trade tie two
issues asked for (J384 (2); rows 8, 35); the force band from the host's capacity facets without the economy facet
(J384 (4); row 12); a raid marking its march fighting while moving no band (J384 (5); row 11); a satellite inside its
parent's allegiance but no chain member (J384 (11); row 33).

| # | where | severity | verdict | what changed, or why not |
|---|---|---|---|---|
| 1 | m 714 (9), 659 (d); J-RR.51 | major | accepted | a treaty-held occupation (the host's ceded-garrison term) is no member: it stays an occupation overlay at the host's rung, flagged `heldByTreaty` (693 `PolityLink`), a member only at the vassalized rung (714 (9), (12)); the two-liege ranking drops *garrisoned* — and *satellite* by issue 33 — to vassalized, vassal, puppet; 659 (d) reworded with satellites as claim points (issue 33) rather than members as the issue's own text had it; T-V13-41 (h) pins it. Verified: `occupation.js:1248-1253`, `treatyEnforcement.js:132-151`, `conquestExecution.js:38-41`, `peaceTermsCatalog.js:194` |
| 2 | m 693, 714 (8)–(9), 749 H13; J-RR.47, J-RR.50 | major | accepted | the polity facts carry the host's relationship-state plane (the one its simulation reads; the regional plane never sent; merging owner-gated); (8)'s classes rebuilt on the host's labels (*indifference* dropped, criminal network added, the legacy *tense* and any pair at war adversarial); a tributary is a live tribute term, never a label (no producer: `canonicalRelationship.js:140-150`, `convergence.js:795`); the host's four-term subordination set and the map's three-way drawing recorded as a vetoable divergence (714 (9), J-V13.67, J-RR.50); H13 in both lists |
| 3 | m 699, 693 `TravelLaw`, 714 (9), 743 T-V13-43; RR-48, J-RR.51 | major | accepted (with 29) | Treinf is the largest seat-to-seat cost whose host hop weeks, at neutral readiness, stay within the band edge, in cost units under the calibration now sent with the travel law (`basis` gains `normalized`; `calibration { weeks, perCost }` as exact integers — the host's weeks per cost is its anchor over an integer median hop cost); T(a, b) in the same units; H8 sends the calibration at every canonize on either arm; H13's continuity verdict sent whenever the sovereignty market is lit; T-V13-43 holds on every basis. Verified: ceil(1.5 × hop) ≤ 5 ⇔ hop ≤ 3 (`armyTransit.js:293-301`; `distanceRead.js:76,588-591,728-733`; `sovereigntyReach.js:55-81`) |
| 4 | m 721 `patrolOffer`, 714 (14), 749 H16; J-RR.54, §5 H16 | major | accepted | `patrolOffer` sends the extent, the basis and the nearest garrisoned seat's or site's key, never a cadence or a time; (14) states the rungs are the map's presentation; H16 re-prices coverage through the host's one distance reader, read by outcome rolls only, route choice through belief, and the crossing holder likewise (`fp-simulator.md:324,714-720`; `DESIGN_ROUTE_LIFECYCLE.md:56-57`; `routeNetworkConsumersInterdiction.js:1-36`) |
| 5 | m 749 H16, 751 J-V13.65; J-RR.53 | major | accepted | the crossing holder enters the per-gate pipeline only by an owner-signed re-ruling of who keeps a gate (today the intermediary settlement), with its own register row, until then a map-feed reading; the rejected alternative's reason rewritten (`smuggle.js:249-271`; `commodityFlow.js:595-597`; PHASE55:137-156,1048-1050) |
| 6 | m 721 `mapFeed`, 714 (13), 749 H16 | major | accepted (with 46) | the sway reaches the host only as an advance-head overlay: fetched at the advance head, fixed for the advance and sampled from that baked table at each hop, at most one advance stale, stamped with `swayRevision` on the host's overlay axis, the host's live occupation, relationship and closure reads overriding it; a revision caused inside an advance takes effect from the next (PHASE55:1189-1199,1365-1374) |
| 7 | m 693 `PolitySeat`, 714 (13), 743 T-V13-41 (m); J-RR.39, J-RR.53 | major | accepted (with 31) | (13) states that a window is the host's end-of-window state with since-weeks, revisions minted at since-week plus dwell and at dated events within the host's news retention, and that a fact risen and fallen inside one window never reaches the sway; (m) qualified; H13 gains an optional per-tick capture of political deltas (`advanceInterval.js:146-158`; fold req 23) |
| 8 | m 714 (6), 662 (a), 749 H13; J-RR.49, RR-46 | major | accepted (with 35), the trade tie aligned with J384 (2) | the band between an occupied seat and its occupier's allegiance is held at its first-window value while the occupation stands; the host's measure recorded as not purely cultural (shared-sovereign identity, trade ties, traditions; owner-visible, J382's reading vetoable); H13 sends each band for pairs the host names itself — in its plain form over its whole vector, not with the trade tie the issue asked: J384 (2) rules the plain form because the sway's relation classes already count the pair's relationship (`cultureDistance.js:21-23,52-59,183-198`; `migrationKernel.js:197,229-230`) |
| 9 | m 749 H19; §5 H19 | major | accepted | the territory lens stays on the seat territory (H5); the sway is drawn by a new lens under its own registered name, the allegiance lens, the owner's choice (`TerritoryLayer.jsx:1-31`) |
| 10 | m 749, 693 `AdvanceWindow`; §5 | major | accepted | every H row names the host rows it builds on (H5 Q4; H6, H7, H11, H15 H4 and H5; H8, H9, H10, H14, H17 H4; H12 H4, H5 and OD-FC-18's mount after the release; H13 H4, H9; H16 H12, H13; H18 H1; H19 H5, H6, H18); `AdvanceWindow` gains `hostSeq` with the nonce optional, H9 keyed on the nonce when the epoch is lit, else the history sequence (`DESIGN_FP_ARCH_EP.md:5`; fold :511) |
| 11 | m 714 (11), 749 H16; J-RR.56, RR-50 | major | accepted with a correction | the bands move only on the host's own engagement kinds; a raid on a settlement is an event at its victim (`relationshipRulesAdversarial.js:262-312`), conquest, sea battle and blockade move none. Correction: the host already persists a field battle's place as a settlement id where its transit layer resolves one (`armyTransitKernel.js:620-628`, `wizardNews.js:108,725`), while its narrative leaf still calls that place owner-gated (`engagementNarrative.js:13-31`); so a band goes to the segment nearest the recorded place, and only where the record names none does `borderSegment` place it, labelled a map reading — H16 lights that fallback only on the owner's word; and by J384 (5) a raid marks the victim's facing segments `fighting` for `fightingWeeks` |
| 12 | m 693, 714 (10), 749 H13 | minor | accepted | `military { forceBand 0–4, garrisonPresent }` — the host's capacity facets bar the economy facet (J384 (4), so prosperity counts once), renormalised and banded on its existing five latent-strength floors, and the garrison bucket; μ from the band plus `military.garrisonBonus`; (10) notes the manpower facet already carries tier and population; H13 asks no new banding (`armyStrength.js:44-55`; `defenseInstitutionBuckets.js:83-92`). The field is `forceBand`, not the issue's `capacityBand`, a local name in the host's code |
| 13 | m 688, 701, 675, 721, 749 H4; J-RR.17 | minor | accepted | `hostLocked` refuses an origin edit; the DM's unplacement of a host seat is a map rule; the recorded `unbindSeat` added (675, 678, 721, 730, 734, 742 (d), 745, 778, H4), offered to the re-canonize like an addition (`mapSlice.js:473-494`) |
| 14 | m 714 (12), 743 T-V13-41 (h) | minor | accepted | a razing is an event at the town; the sway re-projects at the host's next tier, the victor taking nothing (`DESIGN_REALM_DIRECTIVES.md:1104-1121`) |
| 15 | m 721 law (9), 751 J-V13.78, 714 (10), 661; RR-8, J-RR.52 | minor | accepted | `contingent` → `memberForce`, *contingent* added to the barred tokens (`forceComposition.js:23-29`; WC:3742; fold :412) |
| 16 | m 737; J-RR.55, RR-55 | minor | accepted | the player picture reads force and culture bands only where the host's whitelist admits them; absent, debatable stays debatable and culture reads 0 (`hegemony.js:18-22`; PHASE55:1210-1214) |
| 17 | §7; m 672 (c), 729 | minor | accepted | §7's first sentence: no frozen row or stream changes, `world.patrol` is one reviewed C-0020 append, lawful under K6 after M0; BCR-V13-8 gains the row (752 (a)) (`concerns.json:2`) |
| 18 | m 749 H3, H7; J-RR.14 | minor | accepted | H3 records, as a dated bracket, that OD-FC-22's absolute-distance lighting waits for worlds from the map module on the per-map band census; J-RR.14 names the re-sequencing (fold :515; WY:290-294) |
| 19 | m 754 | blocking | accepted | the Current text gains its last line, "M-W2, and retires its fork after M-W3's exports and adapter pass the ecosystem round trip." (V13:2860-2861); the verifier gained the residue check; file m's header and §9 say so |
| 20 | m (V13 §7.1 T-V13-7) | major | accepted | 742 (d) rewrites T-V13-7's port clause over the twelve recorded inputs (with `unbindSeat`), the presentation inputs writing nothing, no political, overlay, lived-route or belief input in a canon slot (V13:2383); a fragment, not a new number |
| 21 | m (V13 §3.0, §3.16, T-V13-14, §12) | major | accepted | 714 (b)–(e): the stage row becomes W8a and W8b with their ids, F-WORLD's budget rung the seat rung (condition, action and test reference); 742 (e) T-V13-14; 756 (c) §12. The retired-word census found more of the class, mended: W7 (2)'s `port: true` (713 (b)), §3.14 row 16's host seat moved through `setSeats` (724 (d)), V14 §1b.6's `foreignCulture` row (757 (c)), the proposal's §3.8 budgeted floods (770 (b)), BCR-V13-8's "W8 draws nothing" and stage list (752 (a)–(b)) |
| 22 | m 778 | major | accepted | the Current text runs to the paragraph's end (ARCHITECTURE.md:12891); the new text ends with the derived-facts sentence, the client carrying V13 §3.11.6's messages with the envelope's version vector, and the milestone split |
| 23 | m 777, 779 (base §11.3, §11.4, §13.2) | major | accepted | 779 (c)–(g): a settlement frame reads only through the dossier port, a world's recorded inputs being door (5)'s; "never host inputs to a frame"; T125-3 for the dossier port's adapter and a sibling T125-3w for the world port's; §11.3's host projection says "of a frame", a world's points reaching a host only through door (5); 779 (a) says T125-3w scans the world port |
| 24 | m 690, 714 (16), 671, 746, 766; J-V13.78 | major | accepted | demand `gate` → `borderPost`, `gateKind` → `postKind`, "Gate sites" → "Border posts", every gate-site phrase renamed (here too, RR-56, J-RR.56); *border post* added to J-V13.78 and law (9) (V14:938's `gate` row; the base's own S3 *gate sites* on the town wall, ARCHITECTURE.md:20920, 21435, 23430; no hit for *border post* in either repository) |
| 25 | m 680, 721, 732, 744; J-RR.37, J-V13.80, RR-38 | major | accepted | political and military event kinds are refused on a host-bound world (`refuse.world.hostPolitical`), the world editor opening the host's own command; no message proposes one (ARCHITECTURE.md:17579-17581; J-RR.19) |
| 26 | m 714 (12), 758, 730, 678, 721 | major | accepted | the DM names an occupier only on a standalone world; `WorldSiteHost.holder`'s DM entry is refused on a host-bound world, the polity facts governing; crossing holders and `patrolOffer` are computed without `setSwayLock`s, which are presentation there |
| 27 | m 714 (9) | major | accepted | continuity in two passes (pass 1 bonus- and reinforcement-free; pass 2 applies both to pass 1's continuous members; never iterated); T-V13-41 (o); J-RR.51 |
| 28 | m 714 (13), 734 | major | accepted | the dirty box is the closure of the seats whose τ, M, reinforcement or continuity changed (every continuous member under a changed root), their cap discs and every disc meeting them, grown to whole normalization components; T-V13-41 (p) pins incremental equals whole; J-RR.53 |
| 29 | m 693, 674, 721, 743 | major | accepted (with 3) | `basis` gains `normalized` with one `calibration`; 674 defines an effort-metre (Σ step cost under the time terms ÷ (`landBase` × `perM`), V13 §3.8 (4)'s level-ground rate) and `derivedTime` per basis; `timeBasis` widened; T-V13-43 under every basis |
| 30 | m 695, 699, 714 (6), 660 (c) | major | accepted | polity cell `river.crossingDays` (0.25 foot-days, UNMEASURED; "a big river is a border") added to t at a step across a navigable reach; T-V13-41 (q) pins the split at the river when one seat is nearer it by less than the cell — the issue's unqualified pin fails for seats far from the river |
| 31 | m 693, 714 (13), 743 T-V13-46, 749 H13 | major | accepted (with 7) | `PolitySeat.since` optional, with an optional dated `changes` log (tier, prosperity, force, garrison — issue 12's fields, not garrison and standing); without it a rung dwell is measured at window resolution and declared; T-V13-46 (b) pins weekly-versus-yearly identity given the log and the declared resolution without it (`research/sf/prosperity-system.md:98,126`, working copy) |
| 32 | m 693, 714 (8)–(9), 749 H13 | major | gap accepted, fix rejected | the gap is issue 2's; the regional plane is no fix — it is the generation's structural vocabulary (supplier, dependent, protector …; `regionalGraph.js:28-42`), not the campaign's relationship state, and *tributary* and *war* have no producer in the live state (`canonicalRelationship.js:140-150`; `convergence.js:795`); war is read from `PolityRelation.atWar`, a tributary from a live tribute term |
| 33 | m 714 (9), (12), 743 T-V13-41 (g) | major | accepted | satellites leave the member list and the ranking, staying claim points that project inside the parent's allegiance with no bonus or continuity test (`hegemony.js:47-57`; J384 (11)); the tributary's bonus clause reworded ("each tributary of o, though outside the allegiance, counting in B at × `wTributary`") |
| 34 | m 766 (V14 §2.2, §2.5, §5.4) | major | accepted with a correction | `checkpoint` → `barricade` at a border post, `fightingDebris` → `debris`; `patrol` added to `TransientItem` (757 (b)) with a density row and a width by cadence (759 (c)) and a height of 180 cm in §5.4's row (766 (b)) — that row declares heights per kind, so a height rather than the issue's `{ surface: 'ground' }` |
| 35 | m 693, 714 (6), 749 H13 | major | accepted (with 8) | the host sends bands, plain (J384 (2)), for pairs it can name itself (within its reinforcement band or at its neighbour tier ≤ 2); a pair not sent reads 0, reported once per window (`W_POLITY_CULTURE_ABSENT`, 672 (b), 744 (a)); the base's "no message asks the host for a fact" holds |
| 36 | m 699, 741, 742, 743 | major | accepted | B-POLITY — a seeded scripted host (T-V13-37's mock host extended) emitting 15 600 weekly windows over B-WORLD-lite — defined in V13 §7's corpus paragraph (742 (f)); 699, 741, 743 (d), (n), 756 (c), J-RR.42, J-RR.49 and §8 cite it |
| 37 | m 719, 732 | major | accepted | `moveTown` not offered on a `hostLocked` placement, the edit refused there unless the DM takes `keepDossier`, which meets the dossier bearing first and the blend second |
| 38 | m 714 (14), 676, 672 (c), 729, 661, 751 J-V13.66, 743 T-V13-42; J-RR.54 | minor | accepted | presence on a fixed phase ((w + phase) mod everyWeeks = 0, the phase a `world.patrol` hash of (segment, power)); `patrolAt` defined in 676; the week leaves the key, so issue 49's key components use epoch 0 |
| 39 | m 730, 744, 672 (b), 732 | minor | accepted | `W_SWAY_LOCK_CONTRADICTED` (`keep`, `release`), standalone only after issue 26 |
| 40 | m 699, 714 (7), 660 (a), 751 J-V13.64; J-RR.49 | minor | accepted | the margins anchor now states the formula's widths (about a sixth of a foot-day between towns — 0.75 τ = 0.15 —, about half a day between cities — 0.47 —, about a day between metropolises — 1.125); "geometrically" → "by a factor of at least 1.5" |
| 41 | m 695, 699, 705, 741, 766 | minor | accepted | `water.lodgementDays`, "coastal lodgement"; `retention.keyframeEvery`, keyframes; the V14 `checkpoint` item dropped (issue 34); neither new word has a hit in the host or the map docs (*keyframe* appears in the host only as CSS animation and video-encoding terms, never as a simulation word); the census also found *checkpoint* already landed in the base for §7.4's copy-on-write checkpoints (ARCHITECTURE.md:12184) |
| 42 | m 739 (a), 693 | minor | accepted | the reference generator's keys and its state-0 convention move to the schema file; `stance` and `NetworkChange.kind` typed as strings mapped by the adapter's tables; file m's lint sentence says what was found |
| 43 | m 693, 671, 681, 721 | minor | accepted | `span` leaves `WorldHeader`; the travel span is the map feed's and the world dialog's readout, never the canon's |
| 44 | m 745, 746, 749, 753, 778 | minor | accepted | V13 §8.2's range 28–36 → 30–38 pw (746 (b)), the base's §16 rows by BCR-V13-37 (753); M-W1 gains `events`, `hostRequires`, `unbindSeat` and the `physicalChange` offer; M-W2 gains `pathGeometry` and the presentation inputs and loses `events` |
| 45 | m 714 (10), 763 (b); J-RR.52 | minor | accepted | inside a seat's own cell or a placed frame's extent the seat rule holds and a foreign-held site is an occupation mark |
| 46 | m 721, 714 (13) | minor | accepted (with 6) | "sampled at the hop" gives way to the advance-head overlay; a revision caused inside an advance takes effect from the next |
| 47 | m 687, 717 (b), 777, 751 J-V13.76 | minor | accepted | `polityAtCharter` reduced to `{ swayRevision, culture? }`; 777 says a frame's model reads the charter's culture reading only |
| 48 | m 705 | minor | accepted | three rows — the adopted canon, a host-bound route, the host-stored world document — state the ten lifecycle paths, the four with no column written in the last cell |
| 49 | §7; m 729, 752 | minor | accepted | §7's K6 bullet names the world concerns and the stage ids W8a, W8b as append-only rows of the kernel's two registries (none present: `concerns.json` 93 rows, `stages.json` 25), landed with M-W1 and M-W2, never before M0; 729 (a) states the key components; BCR-V13-8 gains `world.patrol` and W8a, W8b (752) |
| 50 | lines 20-21, §9 | minor | accepted | "116" → "117"; §9 says 0 quote failures at the first pass, which examined no residue and no stale sentence, and what the revision ran |
| 51 | m 680, 672 (b), 721, 726, 699, header | minor | accepted | (1) on a host-bound world the latest window's end takes the place of the greatest folded week; (2) `W_IMPORT_LEGACY_BURG` and `W_IMPORT_PLACEMENT_UNVERIFIED` in 672 (b), the latter raised by `importSeats` (721); (3) only a file with no scale takes 3 km per pixel; (4) `tauMilDays.tollhouse` 0.3; (5) deviation (k) in file m's header |
