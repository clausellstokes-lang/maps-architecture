# The map lenses over SettlementForge's simulated systems — what alignment, trade, populations, prosperity, plague and faith share, what each lens may honestly draw, and how they change the territory reading

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — the readings, rules and 35 asks rest on host facts or the owner's words; 38 fragments correct citations, stale FILE-M quotes, three audience cells and one hysteresis figure (lane retrovalidation/lenses; J392)

Implications seat `research/sf-lenses` (workflows/38-systems-read, the step after the four system reads that J380 names:
"then research/sf/lens-implications.md"; plague joined from workflows/39, J381). Host:
`/home/user/clausellstokes-lang/settlement-engine` at `origin/master` `81f1cd96` (HEAD `81f1cd963553`, verified),
read-only — nothing was written there. Map module: `/home/user/maps-architecture`; this file is the only file this seat
writes. The note reads the six system notes (four whole plus plague whole, faith in its named sections), the territory
rulings (J377–J382), the realm review's pending amendments for the sway and the two earlier simulator notes, and
re-reads the host only where a lens decision leans on a fact (§7.3). Everything is in my own words; no code is copied;
constants are quoted as values; formulas are restated as arithmetic.

**Tags.** **[STATED]** a document says it (a host document, or one of the map module's notes, named); **[OBSERVED]** I
read it in host code at `81f1cd96` in this seat; **[INFERRED]** my reasoning, with the reason given. A claim a system
note made from code and I did not re-read is tagged [STATED <note> §n] — the note is my source.

**Notes.** ALIGN = `research/sf/alignment-system.md`; TRADE = `research/sf/trade-system.md`; POP =
`research/sf/population-system.md`; PROSP = `research/sf/prosperity-system.md`; PLAGUE = `research/sf/plague-system.md`;
FAITH = `research/sf/faith-system.md`; FPSIM = `research/sf/fp-simulator.md`; FPPHYS =
`research/sf/fp-physical-integration.md`; FILE-M = `docs/AMENDMENTS-2026-10-17m.md` (the realm review's amendments,
pending application when this note was written, **APPLIED** 2026-10-17 (FILE-M:7; the sway is in V13 §3.9) [Fable-reviewed 2026-10-18: was "PENDING APPLICATION — the sway they design is not yet in V13"]); V13 = `docs/volumes/V13-world.md`. Host paths: `wp/` =
`src/domain/worldPulse/`, `sp/` = `src/domain/spatial/`, `rules` = `wp/simulationRules.js`, LWG =
`src/components/settlements/LivingWorldGates.jsx`, FOLD = `docs/DESIGN_FP_COHERENCE_FOLD.md`.

**Status codes used throughout** (preset bodies re-read, §7.3):

| Code | Meaning | Evidence |
|---|---|---|
| **RRb** | a campaign born through `createCampaign`: the plain normalized defaults; its preset id still reads `realistic_regional`, but it carries none of the virtual keys (WAVES, ONE_REGEN, FP_LIT_*, `commodityFlowEnabled`, `disastersEnabled`, `allyIntelSharingEnabled`) | [OBSERVED rules:31 (the birth constant is null), :705-752, :873-902; STATED PROSP §7.1 (probe), TRADE preamble] |
| **RRa** | `realistic_regional` actually applied: the Instant World composer's fallback tone, the DM's preset chip, or the World's Temper picker's "A steady realm" / "The long winter" [ALIGN §2.6] | [OBSERVED rules:890-894 comment; STATED TRADE preamble] |
| **c** | only on a spatially canonized campaign (`worldState.spatialCanonVersion` > 0), written by the premium one-shot "Map geography" action, offered only for a loaded generated map | [OBSERVED LWG:101-131, :133-134] |
| **+D / +W / +F** | lightable per campaign by a premium DM on the Living-World row: Relationship drift (default on; off in SC), War layer (disabled while drift is off), Faith spread (writes the canonical and the legacy key together). The row has **no** plague, trade, population, prosperity or alignment lane | [OBSERVED LWG:55-73, :235-236, :259-261] |
| **+S** | the realm Simulation Rules dialog's engine-wave toggles, which can set the WAVES keys per campaign; no premium check of its own in its opener, mount or store write, but it opens only under an active campaign, which only a campaign manager (premium or elevated) holds, so it is premium-gated like the Living-World row (POP §7 legend as Fable-reviewed 2026-10-18) | [STATED POP §7 legend, verification V5; TRADE §7 legend "t"] |
| QL RR DC SC NC LR FS | the seven shipped presets; RR the default id | [OBSERVED rules:6, :863-1223] |
| **DARK(flag)** / **DESIGNED** / **SEAM** | built and lit in no preset (the flag named) / no code / a function with no caller | — |

Three preset facts recur [OBSERVED]: beliefs exist only on canon with a non-omniscient information mode, which DC and
LR (`perfect_delayed`, rules:953, :996) and FS (`full`, :1073) set and RR leaves at the omniscient default (:56); RR,
DC, LR and FS carry WAVES and ONE_REGEN (:900-901, :961-963, :1007-1008, :1220-1221), QL, SC and NC carry neither;
`commodityFlowEnabled` is in RR and FS only (:896, :1081).

---

## §1 What the six systems share, and where they differ in how they touch geography

### 1.1 The six readings, and the plague read's state

All six system notes exist and each ends with its verification record: ALIGN §12 (1,246 lines), TRADE §12 (1,307),
POP §12 (1,091), PROSP §12 (1,116), PLAGUE §12 (1,085; the companion workflow's read, finished — its §12 records eleven
problems and fourteen omissions re-checked), and FAITH §12 (1,516; read here in §1, §6 and §9 as the task names). So no
plague row is left open in this note. ALIGN and PROSP carried uncommitted edits by their own seats when I read them
(the working tree at map-module commit `7d04e75`); I read them as they stood (§7.1).

### 1.2 What they have in common [the evidence for each item is the notes named; my synthesis is INFERRED]

1. **Every fact is settlement-grain or pair-grain; none is a field over land.** Alignment has no aggregate and never
   diffuses [STATED ALIGN §1 item 4, §4.1]; prosperity never diffuses, spreads or averages [STATED PROSP §5 opening];
   faith is a mixture per settlement carried along links [STATED FAITH §1 (b)]; plague is "a graph over trade links timed
   by the digest, not a field over territory" [STATED PLAGUE §1]; people sit in four places, none a density
   [STATED POP §4]; trade has no realm market and no price [STATED TRADE §4]. A lens that paints any of them as a
   continuous surface draws something the host does not hold.
2. **The canon marker is the one switch that gives any of them geography.** Without it, nothing among the six reads a
   distance; with it, faith pull is attenuated, the plague front walks, refugees become columns, caravans run, pilgrim
   catchments, booms and ransoms exist, and in three presets beliefs begin [STATED POP §9.3 #1; PLAGUE §5.1 rows 3–5;
   FAITH §6.14; TRADE §1; PROSP §7.1; ALIGN §8.1 "frozen digest" row]. The marker is data the premium DM writes, not a
   rule flag [OBSERVED LWG:101-131].
3. **All of them read geometry through one substrate.** Path cost, `hopWeeks`, `distanceWeight` and `chooseRoute` over
   the frozen digest; none reads a polygon, a coordinate or the world map's road polylines; only caravans (the gate
   graph is the territory adjacency) and steading sites (inside the parent's partition) touch the host's territory at
   all [STATED TRADE §5.2, §8.3; POP §8.2; FPSIM §8 item 4].
4. **None keeps history.** Every ledger is current state; history is the pulse history (80 records, one per advance,
   a multi-week advance keeping only its last week), world news (240) and a 12-row population ring; many movers'
   receipts are computed and dropped [STATED TRADE §2.3, §6 "missing links"; PROSP §2 "absent", D8; POP §2.3, §8.5;
   PLAGUE §8.3; FAITH §9.5 item 7; ALIGN §9.3 item 13]. Every lens's time scrub therefore needs map-side snapshots for
   most of what it draws (§4.6).
5. **The status of record under-reports what runs.** FOLD §2 has no alignment or prosperity row, shows "—" in its LIT column for both trade (TR → EC)
   and populations while the Phase 5.5 trade stack, the legacy population movers, the four prosperity writers and
   the alignment consumers ALIGN §7 marks lit (28 of its 60 rows in RR, some only with a seated deity or on canon) run in lit presets [OBSERVED FOLD:333-351; STATED ALIGN §4.4, §7, PROSP C15, TRADE §10.1 item
   3, POP §10.1 #14]. For lenses the record is the preset code and the canon marker, read as the campaign's resolved
   rules.
6. **The default preset's name overstates what a born campaign runs.** RRb reads "Realistic Regional" with none of RR's
   virtual keys; its prosperity is frozen, its steadings never found, its festivals never run, its caravans (once
   canonized) run the M2 model, not M6a [OBSERVED rules:31; STATED PROSP §7.1, TRADE §1 "what a DM in the default preset
   actually feels", ALIGN §7 birth caveat, FAITH §8].
7. **Audience is DM truth by default, and belief is narrow.** The host projects no audience on most of these ledgers;
   believed variants exist only in DC, LR and FS on canon; RR is omniscient, so a player view there is either the
   public facts or nothing [STATED PLAGUE §8.5, §9 #14; FAITH §9.6 #10; PROSP §9.3 #13; POP §8.5; ALIGN §9.3 #12; TRADE §9
   #16].
8. **Links decide who; geometry modulates.** Whatever crosses a settlement line rides regional-graph edges and channels
   first; geometry attenuates (faith), delays (plague, columns, ripples) or prices (caravans). Geometry decides *who*
   in only four places: a supply link's three cheapest producers, the M4 pool of eight nearest, the pilgrim catchment of
   eight nearest, and a steading's site inside its parent's partition [STATED TRADE §5.3; POP §5.2 C; PROSP §5.5;
   POP §3.4].

### 1.3 How each touches geography — as built at `81f1cd96`

| System | No geometry (config strings) | Relational links only | Distance as a weight | Travel time | Routes chosen | The host's territory / gates | Seasons | Town map |
|---|---|---|---|---|---|---|---|---|
| **Alignment** | the two axes and aggressiveness are live reads of regime, roster, legitimacy, patron, deeds [ALIGN §3] | conversion carriers, occupation, moral drift actor → victim, tolerance partners [ALIGN §5.1] | faith prescription σ (floor 0.35) [ALIGN §8.1] | none of its own; beliefs that misjudge are stale by road-priced news [ALIGN §5.1 ch.3] | caravan caution, the worst transit gate's bans and conscience, refugee and named-traveller route risk [ALIGN §5.2] | none (no border read uses the axes) [ALIGN §8.1] | route choices take the season [ALIGN §8.1] | the urban-fabric chaos grain in the v2 layout [ALIGN §6] |
| **Trade** | the whole generation economy (route class, terrain, resources) [TRADE §3.1] | channels, cascade, trade war, relief, credit, purchase [TRADE §5.1 rows 1–4, 9–11] | trade salience (floor 0.35) [TRADE §5.10] | M2/M6a arrivals; roads missions [TRADE §5.2, §5.13] | caravans re-scored by season, danger, tolls; re-chosen at arrival; **no path stored** [TRADE §5.2] | **the caravan graph is the territory adjacency**; gates per settlement [TRADE §9 #1–2] | road season always; overlay on new canons [TRADE §5.2] | transshipment institutions [TRADE §8.2] |
| **Populations** | legacy growth and tier drift [POP §3.1] | netted dispersal, stressor flow, steadings, resettlement, sack [POP §5.2 A, B, D–F] | M4 closeness; pilgrim attendance [POP §8.2] | M4 arrival = depart + pair `hopWeeks` [POP §5.2 C] | M4 picks a route for danger only, not stored [POP §5.3] | steading sites inside the parent's partition [POP §3.4] | M4 road deaths by calendar season [POP §5.2 C] | none traced [POP §8.1] |
| **Prosperity** | generation band from the route class [PROSP §3.1] | purchase, ransom pairs; vassal extraction, raids [PROSP §5.1, §5.3, §5.12] | pilgrim lift [PROSP §5.5] | ransom legs [PROSP §5.3] | boom = own-endpoint throughput + intermediate centrality [PROSP §3.2] | none [PROSP §5.11] | festival seasonal severity [PROSP §3.3] | v2 attractor strength and the district wealth band [PROSP §8.2] |
| **Plague** | disease pressure (no season, no distance) [PLAGUE §3.1] | aspatial one-hop spread on channels, same tick [PLAGUE §5.1 row 1] | none (distance never lowers spread odds) [PLAGUE §5.2] | front latency = `hopWeeks` at the road season; consequences parked by `hopWeeks` [PLAGUE §5.1 rows 3, 15] | only believed plague bends named travellers' routes (belief presets) [PLAGUE §5.1 row 16] | **never** [PLAGUE §5.5] | latency only [PLAGUE §2.3] | condition badge, hazard pin, scene marker [PLAGUE §8.1 item 6] |
| **Faith** | the local contest [FAITH §1] | carriers: allied/trade/patron/vassal edges at 0.45, war_front 0.72 (hostility carries hardest of the two-way carriers; an overlord's authority channel reaches its vassal at 0.82, one way), garrison and authority channels [FAITH §6.2] | reach, prevalence, prescription (0.35–1.0) [FAITH §6.14] | none on the contest; the conversion's parked ripple only [FAITH §6.14] | none [FAITH §9.3] | none; "no faith geometry" [FAITH §9.3] | parked ripple; moral founding weight [FAITH §6.14] | creed-agnostic spires [FAITH §9.2] |

### 1.4 Where they differ [INFERRED from the table]

- **What moves.** Goods (13 shippable kinds, non-food, on canon), people (columns on canon, netted otherwise), the
  plague *record* (hop by hop on canon), a creed's *share* (spread lane only) move. Alignment and prosperity never move:
  they are pressed through their inputs (an occupation, a purchase, a festival stopped by an overlord's extraction).
  A lens must draw moving things as movement and pressed things as dated causes on links, never the reverse.
- **What can be positioned.** Only two movers carry a host clock a lens can place: the named merchant (and every named
  traveller) on a Roads journey, which keeps a frozen settlement path and a leg clock [STATED TRADE §5.13], and the M4
  column, which keeps departure and arrival ticks but no path [STATED POP §2.2]. A plague hop keeps its source (while
  the record lives), its arrival and its onset tick [STATED PLAGUE §8.2]. A caravan keeps its source, destination and arrival tick, but no
  path and no departure tick [STATED TRADE §2.3]. Faith, alignment and prosperity have nothing positionable.
- **What is relative to the mover.** Route danger is weighed by a mover's tolerance (alignment law for refugees,
  personality for named travellers — inverted in the host, ALIGN §10 item 28; a constant 0.6 for caravans), so one road
  is safe for one mover and not another [STATED ALIGN §8.1, the host's "danger is relative to the mover"]. Plague's
  route touch is a *belief*, not a danger fact [STATED PLAGUE §5.1 row 16].
- **What carries across water.** Sea lanes and teleport circles are lit **by digest data**, not by a flag: caravans,
  M4 pricing and plague latency use them wherever a new canon found at least two eligible ports or circle holders; the
  "Sea lanes" toggle (`navalEnabled`) governs naval war only [OBSERVED `sp/distanceRead.js:286-293`; STATED TRADE §9 #7,
  POP §5.3, PLAGUE §5.2]. Faith has no water carrier and is ruled to get none (J382 (c)).
- **What the town map shows.** Alignment (fabric grain), prosperity (attractor strength and the district wealth word)
  and plague (the condition) already reach the town map; faith and trade reach it only as buildings; populations: none
  traced (POP §8.1) [STATED as in the table].

### 1.5 As designed (no code, or built dark) — the geography each design would add [STATED in each note]

Positioned caravans with a path and a departure tick (WY-3) and grain caravans (TR-4/EC-12) [TRADE §5.12]; pilgrims,
legates and the co-religionist network (WF-2; PHASE55) [FAITH §6.12]; faith cargo on columns (WY-4) [FAITH §6.12;
POP §5.5]; column-carried contagion (PG pg-1), belief refusal at the gates (pg-3), caravan plague avoidance (pg-4)
[PLAGUE §5.1 rows 11–14]; the army plague hazard (built, fenced, no caller) [PLAGUE §5.1 row 10]; Wave P's push-pull
columns over the never-written lived route network and the founding land law (DARK `demographicsEnabled`) [POP §5.2 G,
§5.4]; prosperity riding shipments (UPSWING A2) and prosperity drift in the town fabric (MF §11.4, out of FP)
[PROSP §5.1, §8.6 item 5 (A2); §7.3 item 3 (MF §11.4)]; alignment-shaped army and fleet routes (a SEAM: every caller passes nothing) and a believed alignment
(PHASE55; none in the built belief record) [ALIGN §5.2, §6 Information]. None of these is a fact a lens may draw today.

### 1.6 Corrections the six notes make to the map module's earlier readings [STATED in each note]

FPPHYS row C6 (granary capacity from prosperity) and its line 280 (prosperity as the migration axis) describe design;
the code reads tier and institutions for granaries and `economic_capacity` for migration [PROSP §9.3 item 16]. FPPHYS
line 283 credits plague with army contraction and calamity's frequency law [PLAGUE §10.1 item 5]. FPSIM:255's riverside
flood is a cosmetic hint [PLAGUE §10.1 item 6]. TRADE §3.7 lists non-writers as prosperity writers [PROSP C16]. FAITH
§9.6 item 1 should add the two lit moral flows (prescription, tolerance drift) [ALIGN §9.2 item 8]. FPPHYS §8's row A1
(territory SUPPLIED) is owed a correction to PARTLY [STATED FILE-M preamble]. This note edits none of those files.

---

## §2 The lenses — one table per lens

**How to read a table.** Each row is one element a lens could draw. *Host facts* names the fact and the note section
that read it. *Drawn* uses one vocabulary: **glyph** (a mark at a settlement), **link** (a straight relation between two
settlements; no route implied), **route flow** (a mark along a host-chosen route, re-derived by the host's own route
function and labelled so), **moving marker** (a mover placed by a host clock), **catchment** (the host's own neighbour
set drawn as a ring), **hinterland fill** (a settlement's own value painted uniformly over its area — W8a's seat
territory unless the row says the sway — never interpolated or blended at borders), **overlay** (hatch, ring or tint on
an area or segment). *RR* says what is honest in the default preset (RRb, RRa, with or without c). *Lit lanes* says what
appears when lanes are lit. *Audience*: **DM** = DM truth; **public** = the host shows it to players already;
**believed** = a per-observer belief the host keeps (DC, LR, FS on c only). *Scrub*: where history comes from. The last
column marks **INVENTION** — a draw with no host fact today — and names the host change that would make it real (§5 ask
number).

### 2.1 Territory — the sway (J377, J378, J382; FILE-M items 660–662, 714)

The sway is a map derivation the owner ruled for (T1–T3); its inputs must be host facts and it must say it is a
projection. Its terms and their host facts are in §3; this table lists what it draws.

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| Seat territory W8a (diagnostic) | the host's own nearest-settlement partition, total, no wild land; its gates are the caravan graph [TRADE §5.2, §9 #1] | thin borders, crossing ticks | c (RRb and RRa) | every preset, c | DM | changes only at a re-canonize | — |
| Sway fill per allegiance | tier, size third, prosperity rung, relations, links, culture bands, lit water lanes (§3) | fill by allegiance; unclaimed land unfilled | computable on RRb (prosperity frozen, no faith term in culture, no military); RRa adds moving prosperity | military term only once the host bands strength; occupation with war | DM; players: re-derived over public facts, or the truth under an omniscient preset [FILE-M item 737] | the sway's own revision log (map-side) | the polity facts window itself → **ask 1** (H13) |
| Debatable land | adversarial relation classes (rival, cold war, hostile) from relationship drift, which in RR mints hostile pairs, raids and subjugation proposals without any war layer [OBSERVED `wp/relationshipEvolution.js:98-103`; `wp/relationshipRulesAdversarial.js:66-67` (rival → cold war), `:226-227` (cold war → a proposed hostile relabel), `:266-365` (the rules of pairs already hostile)] | cross-hatch in both colours | **lit on RRb and RRa** (+D is on by default) | SC needs +D first | DM; public where the relation is public | revisions | — |
| Held by force (tie-break) | garrison and standing bands | holder fill with a hatch | **dark**: the host has no garrison or standing band [STATED PROSP §9.1 item 4; FILE-M item 693 as it stands: "absent until the host sends it (V13 §8.5)"] [Fable-reviewed 2026-10-18: the host does band the whole of its theoretical capacity on five latent-strength floors (`src/domain/display/armyStrength.js:48-54`) and keeps a garrison institution bucket (`src/domain/institutions/defenseInstitutionBuckets.js:83-91`); J384 (4) and V13 §8.5 H13 band the capacity facets bar the economy on those floors, with the garrison presence from that bucket] | — | DM | revisions | **INVENTION** until banded → **ask 3** |
| Occupation hatch | `worldState.occupations[occupied]` with `occupierId` and the rung contested / unstable / extractive / stabilized / vassalized [OBSERVED `sp/embattlement.js:117-118`; STATED ALIGN §2.1, §5.1 ch.2] | hatch by rung | dark (no war layer) | DC, FS, +W | host-resolved; sieges resolve public [STATED FILE-M item 694 evidence] | start tick; the occupation_continuation term's length (pressed by the victor's patron evil) [STATED ALIGN §6 Peace] | — |
| Fighting over the march (MarchHold) | war-layer verdicts (sieges, conquests, occupation collapse, supply-web raids) [STATED ALIGN §5.1 ch.3, TRADE §5.11]; in RR, drift's `hostile_raid` names aggressor and victim and stamps `war_pressure` on the victim, with **no outcome and no place** [OBSERVED `wp/relationshipRulesAdversarial.js:277-314`] | crossed blades on a segment; hold band | drift raids only, and they carry no verdict | DC, FS, +W | DM; public where the host resolves it | half-life a season | a raid's outcome and place → **ask 4** |
| Allegiances, members, exclaves, tributaries | graph `vassal` and patron/client labels (drift proposes a `vassal` relabel for a hostile pair whose defence-plus-economy pressure gap exceeds 0.48 under conflict stress above 0.55, the overlord being the side of no lower tier (at equal tier, at least 0.72 × the target's population) whose strength is at least 0.82 × (the target's strength + 0.8 × its protectors' backing) — a label proposal whose acceptance path was not traced) [OBSERVED `wp/relationshipRulesAdversarial.js:269`, `:316-365`; `wp/relationshipRuleHelpers.js:453-466`]; drift's vassal rebellion (a rebellion stressor, `:762-807`), whose success proposes relabelling the vassal link to rival [OBSERVED `wp/relationshipRulesCore.js:762-807`, `:810-831`; a quashed rebellion keeps the link, `:833-847`]; `hostile_forced_tribute` [OBSERVED rule id, `wp/relationshipEvolution.js:101`]; the occupation ledger's vassalized rung with its occupier [OBSERVED `src/domain/rulingPowerSeat.js:290-294`]; the satellites ledger [STATED POP §3.4] | member borders, exclave halo, tributary band | graph links lit (drift and DM authoring); vassalized rung needs war | +W for occupation-born vassals | DM; covert links fail closed | link `since` ticks | a host continuity verdict: the host's reach law sits in the dark sovereignty lane over an unwritten network [STATED TRADE §5.12] → the map's own verdict, labelled → **ask 5** |
| Steadings as claim points | satellites ledger: parent, tier, population, site cell (c) or orbit index [STATED POP §3.4, §8.1] | dots at the site cell's centroid (c) or on the orbit ring | RRa, DC, LR, FS; on RRb (or any campaign) only once +S lights "New & lost steadings" | — | the host draws them without a secrecy check [STATED POP §8.1] | `foundedTick`; ≤ 8 history rows | — |
| Coastal footholds [Fable-reviewed 2026-10-18: V13's register word is *lodgement*; *foothold* is a landed host word (J-RR.8; rulings.md J382(b))] | the digest's sea-lane slot, present only on a new canon with ≥ 2 eligible ports [OBSERVED `sp/distanceRead.js:286-293`] | foothold fill on the far shore's landing | c (new canons) in every preset | — | as the sway | re-canonize | — |
| Culture resistance | the host's `cultureDistance` over its live culture vector [OBSERVED `sp/cultureDistance.js:165-199`; `wp/migrationKernel.js:154-174`] | not drawn; the legend and the per-cell "why" | computable everywhere; faith term 0 on born worlds | — | DM | sampled at revisions | which call form → **ask 2** |
| Gate-site proposals | route crossings of allegiance borders (map-side) | ghost pins the DM accepts | map tier | — | DM | none | projects nothing until the host names a holder [STATED FILE-M item 714 (16)] |
| Wild land | none (the host has none) | unfilled | — | — | — | — | not a host fact, and correctly so: the session's reading of J377 (vetoable), carried by FILE-M items 659 (e) and 714 (7) [Fable-reviewed 2026-10-18: was "the owner ruled it" (J377); the owner's (T1) and (T2) say nothing of wild land, and the rulings lane upheld the reading as the session's (J377(b).6)]; the legend must say the host's own partition has no wild land [STATED TRADE §9 #1] |

### 2.2 Patrols (J378; FILE-M item 714 (14))

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| Cadence per route segment and power | garrisons (bands: dark), adversarial neighbours (drift: lit), road grade (the host's lived grades are dark; map route classes) [STATED FILE-M item 714 (14); TRADE §5.12] | tint per segment by cadence | computable from relations and map route classes only; the garrison input is a proxy | +W adds war fronts | DM; covert DM-only | revisioned with the sway | the garrison input → **ask 3** |
| A road the host closes | the DM "cut trade route" event (`config._cutRoutes`): names no closer, feeds propagation and the trade cascade, stops no caravan [STATED TRADE §5.13] | closed-segment mark, legend "stops no caravan" | lit (DM verb), every preset | — | DM | the event's tick | a closer and a caravan read → **ask 9** |
| A warden's term | TR-1's route_wardenship / route_predation pairs are registered with no producer; EC-6's stance term is unowned [STATED TRADE §9 #4] | — | DESIGNED | — | — | — | **INVENTION** → **ask 8** |
| A patrol lowering danger | none: routing has no patrol term; the nearest slot is embattlement's security relief, weight 0.4, capped 0.25 [OBSERVED `sp/embattlement.js:95-96`, `:204`]; in a realm that never held a live war front route danger is zero [STATED TRADE §9 #4, §10.2 #40] | must not be drawn as an effect | — | — | — | — | **INVENTION** → **ask 8** (a refinement of H16's patrol coverage; the security input is this note's own proposal, resting on `sp/embattlement.js:95-96`, `:204` — H16 names no security term) |
| Gate character along a route | per transit settlement: bans slave cargo (malice < 0.4 or law > 0.6; fires only on custom slave-labelled goods), bans arcana (law > 0.6), seizure take by conscience [STATED ALIGN §3.4, §6 Trade, §9.1 item 5] | glyph at the gate settlement, not per segment | RRa c | FS c | DM | current state | a per-segment judgement would be invention (the host judges at the route's worst gate) |
| Road escort quality | named travellers' escort from military capacity and readiness [STATED ALIGN §5.2] | legend citation | RRa c | DC, LR, FS c | DM | — | — |
| Quarantine lines | none: no verb, no stance input [STATED PLAGUE §9 #2] | **never** | — | — | — | — | DESIGNED only as an owner value (PG pg-4) |

### 2.3 Religion (J379, J380; FAITH §9)

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| Patron and mixture | `config.primaryDeitySnapshot`; `faithProfile` shares, standing, piety, contested, patron security [FAITH §9.4] | glyph (pie or bar) + hinterland fill by patron | lit wherever a deity is seated (no flag); **born worlds hold none** [FAITH §1 (a)] | every preset | public once embedded [FAITH §9.4] | no share history → snapshots | — |
| Faith fronts | `religious_authority` mints: gm by default, no deity id, never retired [FAITH §6.3] | link, styled "historic front" | dark | DC, FS, +F | DM; dropped from published maps | channel status only | deity id, source, retirement → **ask 10** |
| Spread pressure | the host's pure carrier and reach functions with distance weights [FAITH §6.4–6.5, §9.5 item 3] | link weight, labelled "re-derived" | inert (spread off) | DC, FS, +F; attenuated on c | DM | recompute per snapshot | — |
| Faith prescribes | `buildFaithReach` × the moral-institution pressure; every carrier-linked neighbour of a patron-bearing town [FAITH §6.11; ALIGN §5.1 ch.6] | link from presser to target | **lit** in RR (institution lifecycle; needs a seated deity somewhere); attenuated on c | QL, DC, NC, LR, FS; not SC | DM; abolition and founding headlines public once applied [ALIGN §8.2] | headline ticks | — |
| Conversion | patron change; receipt names only the convert [FAITH §6.7] | dated glyph at the convert | local flips only (two faiths in one pantheon) | +F for creeds from elsewhere | public headline | dated | the arrow's source → **ask 10** |
| Fracture crisis | the stressor's affected set; parked arrivals [FAITH §6.10] | footprint; arrival halo | lit (stressors; spreads first-order on service and information channels) | DC, FS spread on mints too | DM | arrival ticks | — |
| Faith places | `pilgrimage_center` / `religious_superior` links and the unconsumed `regionalAuthority` hierarchy; the `holySite` resource [FAITH §9.3] | links and labels at settlement grain | lit (pure derivation) | every preset | follows the authored neighbour data | static | positioned holy sites and hidden cult sites → owner ruling (§6 Q10), then a host adoption |
| Pilgrim catchment | the eight nearest reachable, by path cost; deity-agnostic; discards who came [FAITH §6.12] | catchment for grand rites | RRa c | DC, LR, FS c | DM | yearly windows | pilgrim *flows* → WF-2 (DESIGNED) |
| Rite adoption | traditions `adoptedFrom` from column influx [POP §9.2 #2] | dated link origin → destination | RRa c | DC, LR, FS c | DM | dated | — |
| Imposed rite under vassalization | the overlord's rite copy keeps its deity [PROSP §9.2 item 9] | dated link overlord → vassal | dark | DC, FS, +W | DM | dated | — |
| Crisis disorder | stressor load (plague included), war, small tier, inverse prosperity [FAITH §6.6; PLAGUE §9 #7] | shading | lit where a deity is seated | — | DM | snapshots | "plague drives conversion" arrows → never |
| Believed faith | the belief record's faith label [FAITH §9.4] | the player's view | none (omniscient) | DC, LR, FS c | believed | belief ticks | — |
| Realm piety | `g` is exactly 1.0 unless spread is on [FAITH §1] | legend figure | inert | DC, FS, +F | DM | — | — |
| A sea carrier for faith | none | **never** | — | — | — | — | ruled out (J382 (c)) |

### 2.4 Alignment (ALIGN §8–§9)

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| The two axes | the host's selector recomputed on the pulse snapshot; bands 0.33 / 0.67 [ALIGN §2.1, §8.2] | two-dimensional hinterland fill (law × malice) | lit everywhere (a read); on a born world archetype + roster + legitimacy only, **skewed malicious and belligerent** by the trait tables [ALIGN §3.5] | deity, deeds and war add terms | **DM only** — a new disclosure | none kept → snapshots | a dated digest → **ask 12** |
| Aggression band | the selector; the host's own chip words [ALIGN §2.1] | glyph | lit | — | DM — Library/Realm cards and the premium PDF, once the card's live-world row opens; no player surface traced (the dossier's own posture block is dark) [ALIGN §1 item 7, §6 Display] [Fable-reviewed 2026-10-18: was "the chip is public on cards once the live-world row opens"; `comp/settlements/livingWorldSignals.js:236-262` feeds `SettlementCard` only, `src/pdf/lib/liveWorld.js:318` the PDF] | snapshots | — |
| "Why" card | archetype, scored NPCs, legitimacy, patron, exhaustion, occupations, drift [ALIGN §8.2] | card | lit | — | DM | — | — |
| Tolerance pull | `institutionTolerance` offsets with ≤ 3 cause names, no tick [ALIGN §5.1 ch.5] | link partner → settlement | lit (deity somewhere) | QL, DC, NC, LR, FS | DM | no tick → snapshots | — |
| Moral drift reckonings | the moral-drift ledger; reckoning news (actor, victim, tick) [ALIGN §5.1 ch.3] | dated link actor → victim | only on c with +W raids; **frozen between raid ticks in RR** (host defect) [ALIGN §10 item 9] | DC, FS c; LR c +W | DM; "a reckoning" in rumours | news ticks; a replay must use the host's compounding decay, not the designed curve [ALIGN §9.3 item 13] | — |
| Quadrant postures | three classes (schism unreachable), patrons' good/evil only [ALIGN §9.2 item 7] | link style | only with seated deities | — | DM | — | — |
| Gate character | as §2.2 | glyph at gate | RRa c | FS c | DM | — | — |
| Town grain | urban-fabric drift → v2 layout [ALIGN §6 Town map] | town-map lens | RRa | DC, LR, FS | the built form is visible | 104-week half-life | — |
| Believed alignment | none in the built belief record [ALIGN §6 Information] | **never** | — | — | — | — | DESIGNED (PHASE55) |
| Alignment flowing between towns | none: it never diffuses [ALIGN §1 item 4] | **never** | — | — | — | — | — |

### 2.5 Trade (TRADE §8–§9)

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| Production and need | `economicState` lists, keyed on the **normalized** catalog id; food never ships; catalog services never move; alchemy and planar service exports ship as goods [TRADE §2.2, §3.4] | glyphs by category, with "never ships" marks | lit everywhere (generation) | — | public in the dossier; criminal income flagged | static between surveys | — |
| Food coverage | the route-class rate; the siege/occupation *stressor* cut [TRADE §3.8] | ring | lit; the cut in all but SC | — | public | — | — |
| Channel web | `regionalGraph.channels` by type, status and visibility [TRADE §8.4] | links styled as *relations* | lit; the cascade on RRb and RRa | depth 2 in DC, FS | per channel visibility | channel status | — |
| Supply links | `supplyShipments` (arrival tick; M6a carries the load) + the ranked sources re-derived from the digest [TRADE §5.3–5.5] | link consumer ← source with ETA; route flow labelled "re-derived" | **c only**: M2 on RRb c; M6a on RRa c | M2: QL, DC, SC, NC, LR c; M6a: FS c | DM | arrival tick only → snapshots | a caravan's position → **ask 15** (WY-3) |
| Stocks, throughput, boom | stock bands, the tally, entrepôt ledger [TRADE §8.5 items 3–4] | glyphs; entrepôt heat | RRa c | FS c | DM by default; own bands and market phrases public only by the lens's own rule (TRADE §9 #16, after EC:671's designed veil, unbuilt) | the tally forgets in ~6 ticks → snapshots | — |
| Gates seizing | M7 smuggle outcomes at the worst gate [TRADE §5.8] | glyph at the gate | RRa c | FS c | DM | not news → snapshots | — |
| Trade war | `tradeWarState`; the prize diamond the host already draws [TRADE §8.1] | glyph + primacy link | dark | DC, FS, +W | public (prize) | flip ticks | — |
| Supply-web plans | `campaignPlans` [TRADE §5.11] | DM links | dark | DC, FS c; RRa/LR c +W | DM | stages | — |
| Relief, credit, purchase | generosity ledgers and news [TRADE §5.9] | instant relational links | RRa | DC, LR, FS | news public; purchase news carries no ids [PROSP D9] | news ticks | ids on purchase news → **ask 23** |
| Named merchants | Roads trade missions: frozen settlement path, leg clock [TRADE §5.13] | moving marker at the path node | RRa c | DC, LR, FS c | unverified → DM | mission dates | — |
| DM cut and chartered routes | `config._cutRoutes`, `config._userRoutes` [TRADE §5.13] | relation marks: "stops no caravan", "no caravan gate" | lit (DM verbs) | — | DM | event ticks | — |
| Danger on a route | embattlement × median hop × tolerance [TRADE §5.2] | see §2.10 | 0 in peace | +W | DM | — | — |
| Food, service or channel "flows" | none (they do not move) [TRADE §9 #17] | **never** | — | — | — | — | — |

### 2.6 Populations (POP §8–§9)

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| Size and tier | `settlement.population`, the tier label (map icons read the label, population only as fallback) [POP §8.1] | glyph by tier label | lit everywhere | — | the tier label is public; numbers DM [Fable-reviewed 2026-10-18: the host's dossier prints the head count to every viewer (`src/components/new/tabs/OverviewTab.jsx:287`; population.md V-1), so by this note's own definition the number is public too; V13 §5.9 (5) keeps numbers DM as a design choice stricter than the host] | 12-row ring | — |
| Trend | the sign of the summed recent deltas [POP §8.3 item 2] | arrow glyph | lit (all but SC) | believed trend DC, LR, FS c [POP P-17] [Fable-reviewed 2026-10-18: the courts' belief record holds that trend but no surface reads it (population.md V-1; POP §8.5 as Fable-reviewed), so "believed for players there" reaches no player; what every dossier viewer gets is the host's own head count and its retrospective direction sentence over the 12-row ring (`src/components/new/tabs/OverviewTab.jsx:183`, `:287`; `src/domain/display/trendLens.js:19-29`) — a public host fact a lens may draw] | DM; believed for players there | ring | — |
| Netted transfers | dispersal (45 % credited, 55 % lost), stressor refugee flow (one destination per source per tick), steadings, resettlement, sack [POP §5.2 A, B, D–F] | **dated links** along regional links, never along roads | dispersal and stressor flow lit on **RRb and RRa** while uncanonized; the stressor flow also beside columns on c ("double service") [POP §10.2 #4] | DC, FS distributed; sack FS only | DM | pulse records (one per advance) → snapshots | the dispersal's lost share → never estimated |
| Refugee columns (M4) | origin, destination, survivors, departure and arrival ticks; no path, no toll [POP §2.2] | **moving marker** from the departure tick; the map's "likely road" polyline labelled as such | c (RRb mass emigration; RRa adds calamity and dying towns) | DC, LR, FS c | DM-secret | depart/arrive ticks | path and toll → **ask 19**; origin on arrival → **ask 20** |
| Steadings | satellites ledger [POP §3.4] | dots (site cell on c, orbit ring otherwise) | RRa (+S) | DC, LR, FS | as the host draws them | `foundedTick` | — |
| Ruins and resettlement | lifecycle status and remnant grade; "New X"; donors realm-wide (no distance) [POP §3.5] | dimmed glyph; donor links "the realm's richest" | RRa | DC, LR, FS | DM | lifecycle ticks | — |
| Pressure | the pressure index (qualitative) [POP §8.4] | label "pressure", never "capacity" | lit | — | DM | snapshots | the bound and its binding wall: DARK(`demographicsEnabled`) |
| Losses on the road | dropped receipts [POP §2.3] | **never estimated** | — | — | — | — | → **ask 19** |
| Migrants carrying faith or plague | none [POP §9.2 #1; PLAGUE §5.1 row 12] | **never** | — | — | — | — | DESIGNED (WY-4, PG pg-1) |
| Founding ground | the §5b land law [POP §5.4] | — | DARK(`demographicsEnabled`) | — | — | — | — |

### 2.7 Prosperity (PROSP §8–§9)

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| The band | `economicState.prosperity` on the seven-rung ladder, read case-insensitively, string or `{tier}` [PROSP §2, §8.3 item 1] | glyph; hinterland fill labelled "this settlement's band over its area" | **frozen on RRb**; moves on RRa by festivals and purchases | DC, LR, FS; booms RRa c, FS c | public (the herald prints the word) [PROSP §8.2]; believed pull band DC, LR, FS c | no history → snapshots | a band-change receipt → **ask 6** |
| Boom and bust | the upswing ledger; `condition.boom.<tick>` / `condition.bust.<tick>`; arteries [PROSP §2] | marker + artery links ("fragile" under two) | RRa c only (commodity flow) | FS c; inert in DC, LR | mint and bust are news; sustain rungs are silent [PROSP §3.2] | dated mint/bust | — |
| Purchase and ransom pairs | the `trade_warmth` incident; ransom resolution [PROSP §5.1, §5.3] | dated links | purchase RRa; ransom RRa c | DC, LR, FS | news public (purchase ids empty) | dated | → **ask 23** |
| Festival stoppers | `vassal_extraction` and `war_pressure` conditions with their source edge; suppressed rites [PROSP §5.12] | mark linked to overlord or raider | the conditions are lit wherever drift runs; the band effect needs traditions (RRa) | DC, LR, FS; rite imposition +W | DM | condition ticks | — |
| Pilgrim catchment | as §2.3 [PROSP §5.5] | catchment | RRa c | DC, LR, FS c | DM | yearly | pilgrims carrying prosperity → DESIGNED (UPSWING B4) |
| Through-route mark | entrepôt centrality (one of a boom's two preconditions) [PROSP §8.4] | glyph | RRa c | FS c | DM | snapshots | — |
| Donor lines | the resettlement pool: the realm's top three by band, no distance [PROSP §4] | links legended "the realm's richest" | RRa | DC, LR, FS | DM | proposal ticks | the honest word or a distance term → **ask 24** |
| District wealth word (town lens) | the district profile's six words: category plus a one-step band nudge [PROSP §3.10] | quarter tint | lit (v2 layout) | — | built form visible | — | — |
| A wealth field, gradient or "hinterland wealth" | none (no diffusion) [PROSP §8.5] | **never** | — | — | — | — | — |
| A cause for a band | none kept [PROSP §2] | **never** | — | — | — | — | → **ask 6** |

### 2.8 Plague (PLAGUE §8–§9)

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| Lane banner | the canon marker (front versus footprint) and the propagation mode [PLAGUE §9 #10, #16] | legend first row | RRb and RRa: footprint uncanonized, front on c | QL, NC uncanonized: nothing moves | — | — | — |
| Phase and band (front) | the epidemic ledger: phase, level, `sourceId`, `arrivedTick`, `incubateUntil`, `refractoryUntil` [PLAGUE §2.1, §8.2] | glyph by phase in the host's words (approaching, active, receding), bands 0.2 / 0.45 / 0.7 | c, **no rules flag** | any preset with a live plague, c | the host: "a plague is not a secret"; the banded player fiction is sanctioned [PLAGUE §8.5] | records prune → snapshots | a front history → **ask 27** |
| Source arrows | `sourceId` while the record lives [PLAGUE §9 #9] | link along the carrier (trade channel or shipment link), hop weeks at the season | c | — | DM; player banded | until prune | the source id on the materialized stressor → **ask 26** |
| Approach halo and ETA | `incubateUntil` | ring with weeks | c | — | public in the host's fiction ("word of plague has reached") | — | the display's weeks-away ignores the season → **ask 28** |
| Next-hop forecast | the host's pure onset and care functions [PLAGUE §8.3] | dotted links, labelled a projection | c | — | DM | — | — |
| Footprint (unmapped) | the stressor's affected set and per-settlement severities [PLAGUE §8.4] | same-week footprint, **no arrows, no ETA** | RRb and RRa | LR, DC, FS; not QL, NC, SC | per the record | the record's stages | — |
| Consequence wave | regional impacts parked `hopWeeks` on c [PLAGUE §5.1 row 15] | the host's generic impact rings | RR, LR depth 1 | DC, FS depth 2 | DM | arrival ticks | — |
| Believed plague on the roads | the rumour ledger; named travellers avoid, refuse or wait [PLAGUE §5.1 row 16] | "heard of plague" (player) | none (omniscient) | DC, LR, FS c | believed | rumour life 26 ticks | — |
| Town condition | the `plague` condition: badge, hazard pin, scene marker [PLAGUE §8.1 item 6] | link to the town view | lit (a stressor-only arrival shows nothing there — the condition gap) | — | audience projection | — | the condition gap → **ask 29** |
| Aftermath | the echo's memory, the six-tick residual [PLAGUE §3.14] | ring at the origin | lit | — | DM | ~20 ticks | — |
| Borders, patrols, quarantine, armies, migrants, deaths, divine meaning | none [PLAGUE §5.5, §9 #1–3, #11] | **never** | — | — | — | — | DESIGNED (PG pg-1…4), or kept a DM-attributed reading, never engine-originated (OD-FC-8; PLAGUE §9 #11) |

Two honesty notes belong in this lens's legend: organic plague is measured silent at default tuning, so what it shows is
almost always a DM-authored outbreak [STATED PLAGUE §1, OD-FC-28]; and the Table Ledger's `plague` obligation mints a
second roaming type the front ignores [STATED PLAGUE §3.15] (→ **ask 31**). "Plagued" and its red already mean monster
threat on the world map [STATED PLAGUE §8.5].

### 2.9 Culture (justified by J382 and ALIGN §4.2; the term territory now reads)

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| Pair distance | `cultureDistance` = 0.30 faith (patrons' good/evil and law/chaos) + 0.25 alignment (both axes) + 0.18 economy (`economic_capacity` gap) + 0.27 governance (0.6 regime-axes gap + 0.4 "different governing name"), then × (1 − 0.25 × trade tie) × (1 − 0.2 × shared festival motifs) [OBSERVED `sp/cultureDistance.js:41-60`, `:165-199`] | link shading between seats within reach, banded in fifths | computable everywhere (a live read); on born worlds the faith term is 0 for deity-free pairs | traditions kinship needs ONE_REGEN (RRa…) | DM | live; sampled at dated events | — |
| Its consumers | M4 destination choice (with a direct-edge trade tie: trade partner 1, allied 0.7, vassal 0.6, patron 0.6) [OBSERVED `wp/migrationKernel.js:197`, `:230`]; contraband at arrival gates (no tie passed) [OBSERVED `wp/supplyKernel.js:754-756` (the caller passes none), `sp/smuggle.js:164` (the default 0), `:176`; STATED TRADE §5.8]; the foreign-seat weight (tie by the pair's label) [OBSERVED `src/domain/rulingPowerSeat.js:352-371`; its gating not traced] | legend | M4 c; contraband RRa c | FS c | DM | — | — |
| The "same governing name" term | the governing faction's name, which is a government *label* ("Elder Council" …), not an overlord; conquest never closes it [STATED ALIGN §4.2, §5.1] | legend line: towns of the same label read ≈ 0.108 closer | lit | — | DM | — | the meaning of the term → **ask 35** |
| Culture regions, ethnic identity, a culture id per cell | none: the host derives culture per pair from behaviour; it has no culture coordinate [OBSERVED `sp/cultureDistance.js:4-8`] | **never** (V13's culture raster is for names only, FILE-M item 683) | — | — | — | — | — |

### 2.10 Danger (embattlement and believed danger; the "danger" J379 names)

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| Embattlement | per settlement 0..1 with a hysteresis phase; entry 0.55 needs a live war front (0.85), a contested or unstable occupation under weak security (contested below security 0.5, unstable below about 0.22), or war exhaustion with high crime or the hub premium against weak security (relief = min(0.25, 0.4 × security)) [OBSERVED `sp/embattlement.js:74-118`, `:195-206`; STATED TRADE §10.2 #40] | ring at the settlement | c; **zero in peace** | DC, FS c; +W | DM (the host's movers and embattlement phases are a designed presentation message, FILE-M H17) | current only → snapshots | — |
| Route danger | re-derived `chooseRoute` per mover tolerance [STATED TRADE §5.2] | route flow tinted, labelled with the mover | as above | — | DM | — | — |
| Believed danger | named travellers' known world, plague rumours included [STATED PLAGUE §5.1 row 16] | per-observer tint | none | DC, LR, FS c | believed | rumour life | — |
| March or border danger | none: danger is at settlements, never along borders [STATED TRADE §9 #3] | **never** | — | — | — | — | — |

### 2.11 Calamity (POP §3.6; PLAGUE §8.5 keeps it apart)

| Element | Host facts (note §) | Drawn | RR | Lit lanes / other presets | Audience | Scrub | INVENTION today → host change |
|---|---|---|---|---|---|---|---|
| Strike pins | `calamityHistory` stamps; news [STATED POP §3.6] | pins | RRa | DC, FS (not QL, NC, LR, SC; not RRb) | news public | permanent | — |
| Exposure | terrain risk at weight 0.6 plus 0.15 per prior strike, normalised to a realm mean of 1 [STATED POP §3.6] | relative-hazard shading, never a forecast | RRa | DC, FS | DM | — | — |
| Merged with plague | none | **never** | — | — | — | — | — |

### 2.12 One event, many lenses [INFERRED]

Several dated host facts move more than one lens: an occupation (territory hatch, alignment acts and law drag,
prosperity festivals stopped for the occupier, the creed following the garrison under +F); a conversion (religion mark,
alignment's patron terms, culture's faith term — so a culture band and a sway revision); a boom or bust (prosperity,
trade, a territory trigger after a dwell); a tier change (population glyph, territory τ, faith mass); a raid (territory
fighting overlay, prosperity festival stop, alignment drift under the web war). The lens framework should hold each as
**one dated event record tagged with the lenses it moves** (§4.1), so the scrub agrees across lenses.

---

## §3 How the six systems change the territory reading (J377, J378, J382) — the term-by-term host facts

FILE-M (pending application when this note was written; applied 2026-10-17, FILE-M:7) has turned J377–J382 into W8a (the host's seat territory, frozen in the canon) and W8b (the
sway) with named terms and a `PolityFacts` window the host would send [STATED FILE-M items 693, 695, 699, 714]. This
section names, for each term, the exact host fact it should read, what the six notes found about that fact, and what it
gives in the default preset.

### 3.1 The two partitions stay two [STATED TRADE §9 #1; FILE-M items 659 (b), 714]

The host's own territory is total (no wild land) and its cheapest crossings are the caravan gate graph, so a budgeted
sway with unclaimed land and debatable marches must never be handed to the host as its territory: two settlements
separated by wild land would lose their gate. FILE-M already rules this (W8a vs W8b; J-RR.53). The six reads add three
consequences [INFERRED]: (a) per-settlement attribute fills (alignment, prosperity, the patron colour) should paint the
**W8a** seat area — the host's own meaning of a settlement's area, frozen and complete — and say so, while the political
lenses paint the sway; (b) gates are per settlement, so a lens painting a vassal in its overlord's colour must still mark
the vassal's own gate decisions (interception, contraband, tolls) [STATED TRADE §9 #2]; (c) a contested march is not a
road hazard in the host [STATED TRADE §9 #3].

### 3.2 The terms, and the host fact each should read

| Term (FILE-M) | The host fact, named | Where | RR (RRb / RRa) | What the six notes add |
|---|---|---|---|---|
| **τTier[tier]** | the settlement's tier **label** on its save row (`settlement.tier` / `config.tier`), ranked on the host's tier order — never a tier derived from population | [STATED POP §2.1, §8.1] | lit / lit | Promotion is proposal-gated in RR, LR, QL, NC and minted (up to 8 % of the new floor) when it lands; key the revision on the tier change, not on the head count [POP §3.3, §9.1 #2]. Whether the pulse writes a promotion back to the save row's label was not traced [POP §11.4]. |
| **kSize[size third]** | `settlement.population` within the tier's band (thorp 8–60 … metropolis 25,001–100,000) | [STATED POP §2.1] | lit / lit | Population has no ceiling in any preset (Wave P is dark), but the third is bounded by the band, so the term is safe [POP §1, §9.1 #1]. Below about 1,030 people RR's legacy lane cannot grow a settlement, so small seats' size is static unless transfers move it [POP §3.1]. Steadings project themselves (FILE-M item 714 (12)), so the size third should count the parent alone, not parent + steadings — this differs from POP §9.1 #5's conserved size on purpose, to avoid counting a steading twice [INFERRED]. |
| **kProsperity[rung]** | `economicState.prosperity` on the seven-rung ladder (Subsistence … Wealthy, rank 0..6), case-insensitive, string or `{tier}` — not `prosperityRank01`, not rank ÷ 6, not `economic_capacity` | [STATED PROSP §2, §9.1 item 1] | **frozen** / moves (festivals yearly, purchases on refusals; booms RRa c) | The band drifts upward realm-wide in lit presets (the festival ratchet; booms climb a rung about every seven weeks; little pulls down), so an absolute kProsperity inflates every reach together over years — relativise or bound it (§6 Q1) [PROSP §3.3, §4, §9.1 item 2]. The host keeps no band history and boom rungs are silent; `prosperityDwellWeeks` (13) is the map's own hysteresis and needs the map's own band snapshot [PROSP §9.1 item 3]. |
| **Relation class** (kin / respect / neutral / adversarial) | the regional graph's canonical relationship labels: allied/ally and patron/client → respect; vassal → a member link; trade_partner and none → neutral; rival, cold_war, hostile → adversarial; plus live war fronts → `atWar` | [OBSERVED rule ids `wp/relationshipEvolution.js:48-110` (the whole matrix; criminal_network at `:104-109`); STATED FAITH §6.2] | **lit** / lit (drift is on in the defaults) | Drift escalates rivals toward hostility, raids by the stronger side and proposes subjugation in RR with no war layer [OBSERVED `wp/relationshipRulesAdversarial.js:266-365`], so debatable land is honest in the default preset. A `criminal_network` label had no class in FILE-M's table when this note was written; item 714 (8), revised after J384, classes criminal network as neutral [INFERRED then; §5 ask 1, answered]. |
| **The host's own "who is stronger"** | `settlementStrength`: 0.36 tier rank + 0.20 log-population + 0.18 (1 − conflict pressure) + 0.12 (1 − economy pressure) + 0.08 (1 − trade pressure) + 0.06 (1 − legitimacy pressure), minus a war-cost penalty, clamped 0..1 — the comparator drift uses to pick the raider, to qualify the would-be overlord, and to raise a vassal's independence pressure toward rebellion | [OBSERVED `wp/relationshipRuleHelpers.js:312-331`, `:453-466`; callers `wp/relationshipRulesAdversarial.js:21-22`, `:277-278`; `wp/relationshipRulesCore.js:764`] | lit / lit | **New for territory.** The host already decides, in the default preset, which of two hostile neighbours is stronger, and with a ranking (no prosperity band; pressures and war cost instead) that differs from τ = tier × size × prosperity. The sway can therefore give a debatable cell's lead to the side the host's raids treat as weaker. Either send this scalar banded with the seats and let the adversarial lead defer to it, or show the disagreement in the cell's "why" (§5 ask 1; §6 Q3) [INFERRED]. |
| **cd (culture resistance)** | `cultureDistance` over the host's own `buildCultureVector` (the patron's axes, the live alignment axes, `economic_capacity` ÷ 100, the governing archetype and governing name, the active tradition motifs) | [OBSERVED `sp/cultureDistance.js:165-199`; `wp/migrationKernel.js:154-174`] | computable / computable | Three callers use two forms: with a direct-edge trade tie (migration, the foreign seat) and without (contraband) [OBSERVED §2.9 row 2]. The sway's relation classes already account for the pair's relationship, so the **plain** form (no tie) avoids counting the relation twice and matches TRADE §9 #8; FILE-M must name the form (§5 ask 2; §6 Q2). The composite moves continuously (alignment moves with rosters, legitimacy and drift; economy with war drains; faith with a patron change), so it must be sampled at dated events and held for `culture.dwellWeeks` — never recomputed on read [ALIGN §9.1 item 2]. On a born world the faith term is 0 for every deity-free pair [OBSERVED `sp/cultureDistance.js:171-172`; an absent patron reads neutral on both axes, STATED ALIGN §2.4]. The governance identity term compares government labels, so towns of the same label (most small villages share "Elder Council") read ≈ 0.108 closer and a vassal does not share its overlord's name [ALIGN §4.2, §9.1 item 6]. The patron's axes enter twice (faith 0.30, and inside alignment) [ALIGN §9.2 item 10]; prosperity enters through the economy term (0.18 of the core) [PROSP §9.1 item 4]. |
| **Water lanes** (`waterLanes.lit`, `lanes`) | "lit" = the frozen digest carries a sea-lane slot (version ≥ 1, at least one edge), which only a canon built by the current canonize (new, or re-canonized) with ≥ 2 eligible ports has — every older digest holds a null slot; lanes = that slot's edges; ports = its port list | [OBSERVED `sp/distanceRead.js:277-311`; STATED PLAGUE §2.3, TRADE §9 #7] | c / c | **Not `navalEnabled`**: the "Sea lanes" toggle gates fleets and blockades; caravans, M4 pricing and plague latency use the slot in every preset [STATED TRADE §9 #7; POP §5.3]. Teleport edges sit beside the sea lanes in the same digest but the owner ruled sea carriage only (J382 (b)); they are not a territory carrier [INFERRED]. Older canons hold a null slot, so water bars the sway there until a re-canonize. |
| **B (the chain of vassals)** | member links: graph `vassal` labels (overlord and vassal ids ride the drift patch) [OBSERVED `wp/relationshipRulesAdversarial.js:355-358`]; the occupation ledger's vassalized rung with its occupier [OBSERVED `src/domain/rulingPowerSeat.js:290-294`]; tributaries from drift's forced-tribute rule and treaty tribute [OBSERVED rule id `wp/relationshipEvolution.js:101`]; steadings from the satellites ledger [STATED POP §3.4] | as cited | graph links lit / lit; the vassalized rung needs war | **Continuity** has no lit host verdict: the host's reach band lives in the dark sovereignty lane, whose reach reads the unwritten lived network [STATED TRADE §5.12], so the map's own adjacency-or-road test decides, labelled "map verdict" (§5 ask 5). Vassal chains pool nothing in the host: no band is tributed (indexed tribute is designed only); a vassal edge mints `vassal_extraction`, which stops the vassal's festivals [PROSP §9.1 item 7]; a *direct* vassal or patron edge closes culture distance by up to 15 % only for that pair [Fable-reviewed 2026-10-18: in the trade-tie form only (migration, the foreign seat); the sway reads the plain form (J384 (2); V13 §3.9 (6)), so no edge closing enters the territory term], never along the chain [ALIGN §9.1 item 6]. A dark conveyance can move a steading to another parent without moving anyone (`sovereigntyTradeEnabled`) [POP §3.4]. |
| **M (military, the tie-breaker)** | the host has no garrison or standing bands [Fable-reviewed 2026-10-18: it does band the whole of its theoretical capacity on five latent-strength floors (`src/domain/display/armyStrength.js:48-54`, display phrases over 0..100) and keeps a garrison institution bucket (`src/domain/institutions/defenseInstitutionBuckets.js:83-91`); J384 (4) and V13 §8.5 H13 read those as the force band's floors and the garrison presence]; its structured capacity model has six facets — manpower 0.26, institutions 0.24, materiel 0.20, logistics 0.12, economy 0.10, will 0.08 — and is a pure read [OBSERVED `wp/militaryStrength.js:75-82`, `:152`, `:327`] | as cited | computable, but its live facets move only with war; readiness exists only after a war footing [OBSERVED `wp/militaryStrength.js:65-68` for the live facets' hooks (war exhaustion, war drain, army deployed); STATED ALIGN §6 Strength for readiness] | Proposed banding: **garrison** from the institutions facet (the host's own garrison/barracks/fort pattern), **standing** from manpower scaled by the readiness ratchet; **exclude the economy facet** so prosperity is counted once (it is already in kProsperity and in culture's economy term) [PROSP §9.1 item 4]; the will facet carries the patron's temper (+8 warlike, −6 peacelike on the facet), which is alignment by another door — keep or drop by the owner's word [ALIGN §9.1 item 4] (§5 ask 3; §6 Q4). Until the host sends bands, M is dark and debatable land stays debatable — honest in RR. |
| **MarchHold (fights over the march)** | war-layer verdicts: siege outcomes, conquests, occupation collapse, supply-web raids and their atrocities; in RR without war, drift's `hostile_raid` (aggressor and victim, `war_pressure` on the victim) and `hostile_truce` | [OBSERVED `wp/relationshipRulesAdversarial.js:277-314`; STATED ALIGN §5.1 ch.3, TRADE §5.11] | drift raids only / same | A drift raid is a *pressure*, not a verdict: it has no "won" or "repelled" and no place. FILE-M item 714 (11), revised after J384 (5), reads it so: a drift raid moves no band and marks the victim's facing segments fighting for `fightingWeeks`; a verdict needs the host's outcome word [Fable-reviewed 2026-10-18: was "… verdict table (raid won +1 to the raider …) cannot read it"; "raid won" occurs nowhere in FILE-M, the realm review or V13]; either the host adds an outcome word, or the owner rules that a drift raid counts as "won by the aggressor" (§5 ask 4; §6 Q5). A raid on the victim also stops its festivals (`war_pressure` is in the cancel set) [PROSP §5.12] — a dated cause the prosperity lens shares. |
| **Occupation (overlay)** | `worldState.occupations` keyed by the occupied settlement, `occupierId`, the rung | [OBSERVED `sp/embattlement.js:117-118`; STATED ALIGN §2.1] | dark / dark | DC, FS, +W. The peace term occupation_continuation (base 3 years, ceiling 6) holds occupied ground, and its length is pressed by the victor's patron evil (0.6 + 0.8 × evil) — an evil-patron victor holds longer [STATED ALIGN §6 Peace]; the hatch can show the term's expiry as a dated cause. The occupier's own garrison cost stops *its* festivals [PROSP §5.12]. |
| **Patrol inputs** | road watch "closed": only the DM's cut-route event exists, with no closer; "warden": designed only (TR-1, EC-6); garrisons: as M; hostility: relations; grade: the lived network is dark, so the map's route classes | [STATED TRADE §5.13, §9 #4] | partial / partial | No host consumer of patrols exists; the one slot is embattlement's capped security relief, and route danger is zero in a realm that never held a live war front [OBSERVED `sp/embattlement.js:95-96`, `:204`; STATED TRADE §10.2 #40]. Plague gives patrols no job [PLAGUE §9 #2]. |

### 3.3 What the default preset actually feeds the sway [INFERRED from §3.2]

On **RRb** (most campaigns born today): tier, size third, a **frozen** prosperity rung, drift relations with hostile
pairs and raids, drift-proposed vassal links once the DM accepts them, culture with no faith term, water only on a new
canon; no military, no occupation, no verdicts. On **RRa**: the same plus a moving prosperity rung (yearly festivals,
purchases; booms on c), steadings as claim points, and tradition kinship inside culture. War (+W) adds occupations,
verdicts and the war's capacity moves. So a default-preset sway is honest as "reach by tier, size and wealth, split by
hostility, resisted by culture" — and should say that military enforcement is not yet a host fact.

### 3.4 Revision triggers the six systems supply [INFERRED]

From populations: a tier change at its mint, a death (the seat stops projecting; its seat territory unchanged), a
resettlement, a steading founded or dropped [POP §3.3–3.5]. From prosperity: a rung held 13 weeks; a boom mint or bust
(dated, carrying their own hysteresis: enter at throughput 3.0 with centrality 0.3 after a 3-tick dwell that survives dips to 1.5; leave only by a bust below 1.0 or on embattlement [Fable-reviewed 2026-10-18: 1.5 is the building-phase floor, not a boom exit — `wp/upswingKernel.js:644-653`, `:669-671`; trade.md C8 corrects TRADE §9 #6 the same way]) [PROSP §9.1 item 3; TRADE §9 #6]. From alignment and
faith: a culture band crossing held 13 weeks — moved by a conversion, a coup, an occupation regime, a legitimacy swing
or a roster change [ALIGN §9.1 items 2–3; §9.2 item 9]. From relations: a class change, a link made or broken, a
subjugation accepted, a vassal rebellion (drift's independence pressure, fed by the strength comparator) [OBSERVED
`wp/relationshipRulesCore.js:762-770`]. From plague and trade: nothing territorial — plague never reads borders and borders never stop it
[PLAGUE §9 #1]; caravans route on W8a [TRADE §9 #1].

### 3.5 What the territory reading must not take from the six [INFERRED]

Prosperity three times (kProsperity, culture's economy term, the military economy facet) — once is enough; faith as a
territory term (it enters only through culture, by J382's ruling); population as a raw count; the host's moral drift or
belief as strength; caravan danger or plague as border effects; a vassal's band added to its overlord's.

---

## §4 The lens mechanism, refined (J379's "derived layer with legend, audience filter and time scrub")

FILE-M already makes the territory and patrol layers "the first rows of one lens mechanism" [STATED FILE-M item 737].
The six reads give that mechanism its rules.

### 4.1 The record — one `LensLayer` per lens (a design sketch in prose; the map module's own, no host shape)

| Field | What it holds | Why (note) |
|---|---|---|
| identity | the lens id, the owner row that asked for it (J377 … J382), its subject system | traceability |
| sources | each host fact it reads: the fact's path, the note section that read it, and the **gate expression** that makes it live (flag set, canon, slot, deity, belief) | §1.2 items 2, 5, 6 |
| regime | a **mode word** computed from the campaign's resolved rules (virtual keys included), the canon marker, the digest's slots (sea lanes, teleport, seasonal overlay) and data gates (a seated deity, a live plague): e.g. plague *footprint / front / still*; trade *none / M2 / M6a*; faith *still pantheons / spread*; prosperity *frozen / moving / booming* | PLAGUE §9 #16; TRADE §9 #12; FAITH §9.6 #1; PROSP §9.1 #5 |
| elements | the rows of its §2 table, each with its **fact class** (4.3), its draw grammar and its audience | §2 |
| events | references into one shared store of dated events, each tagged with the lenses it moves | §2.12 |
| legend | the host's own words (bands, phases, chip words), the regime banner, the polarity table, the bias notes, the derivation labels | 4.4 |
| scrub source | per element: host-dated, the host's per-advance pulse frames, the map's per-advance snapshot, or the sway's revision log; and the horizon | 4.6 |
| refusals | the "never" rows of its table, enforced (a draw request for one is refused with the reason) | §2 |
| why | a per-mark explanation naming the host facts and the deciding rule (the sway's `whyCell` generalised) | ALIGN §8.3 item 4; FILE-M item 714 (17) |

### 4.2 The default-preset honesty rule (one rule for every lens)

1. **Name the regime before the picture.** The legend's first row states, from the resolved rules and never from the
   preset id: born or applied (RRb / RRa), canonized or not (and whether the digest carries sea lanes and the seasonal
   overlay), a seated deity or none, beliefs on or off, war and faith spread lit or not [TRADE §9 #12; PROSP C14; FAITH
   §9.6 #1; POP §9.3 #2].
2. **Draw stillness as stillness.** An element whose gate is false is shown as "still" with its reason (e.g. "no creed
   crosses borders: Faith spread is off"; "this band has not moved: the campaign carries no prosperity writers"), never
   as an empty map and never extrapolated [FAITH §9.6 #1; PROSP §9.1 #5].
3. **Say the built bias.** Where a born world reads biased by the host's tables — alignment's malicious and belligerent
   lean, prosperity's upward ratchet, population's static small seats — the legend says it is the host's arithmetic,
   not the realm's history [ALIGN §9.3 #17; PROSP §4; POP §3.1].
4. **Say who authored it.** At default tuning organic plague is silent and born worlds seat no deity; a lens that shows
   them shows DM-authored content, and says so [PLAGUE §9 #16; FAITH §9.6 #2].

### 4.3 The "no invented fact" rule — four classes of mark, and only four

1. **Host-stored**: a fact the host persists, drawn as stored (a band, a ledger row, a dated news item).
2. **Host-derived**: recomputed on the same snapshot by the host's **own exported pure function** [Fable-reviewed 2026-10-18: V13 §5.8 (4)(b) places this derivation on the host's side — the host computes the value by its own law on the same window and sends it (H23: "where it chooses, the values its own laws compute"), labelled "by the host's law"; the map never calls or re-implements a host law, under the clean-room rule (FILE-M preamble: the new texts name no host source file, function or identifier)] (the alignment
   selector, `cultureDistance` with `buildCultureVector`, the faith reach functions, the plague onset and care
   functions, `chooseRoute`), labelled "re-derived by the host's law" — never a reimplementation, since the host already
   has three settlement-character derivations and four archetype tables that disagree [ALIGN §9.3 #14].
3. **Placement**: map geometry used only to *place* a host fact (a settlement's W8a area for a uniform fill, a route
   polyline for a link's "likely road", a site cell's centroid), labelled when it is a guess [POP §8.4].
4. **Owner-ruled map derivation**: the sway and the patrol cadence, which the owner asked for (T1–T3, J382), drawn as the
   map's own projection and never offered as host truth; they reach the host only as offers it may consume [FILE-M item
   714 (13)–(14)].

Everything else is refused: a quantity the host discards (column tolls, the dispersal's lost share, a conversion's
source), a field interpolated from point facts, motion without a host clock (caravans mid-road), an effect the host
does not apply (patrols lowering danger, borders stopping plague, migrants carrying faith), and a meaning the host does
not compute (plague as punishment, a "valley of the war god" region) [§2 "never" rows].

### 4.4 The legend

- **Host vocabulary as data.** Band words, phase words and chip words are the host's (the clean-room rule keeps them in
  the adapter's tables) [STATED FILE-M preamble].
- **One word, one meaning.** A register of collisions the lens must not merge: "plagued" (monster threat) vs plague;
  "gate" (digest crossing / route intermediary / town gate); "toll" (four meanings); "besieged" (war front vs stressor);
  "prosperity" (band vs `economic_capacity` vs lifecycle health); "temperament" (five meanings); "alignment" (moral vs
  bloc) [PLAGUE §8.5; TRADE §2.4; PROSP §9.3 #14; ALIGN §2.7].
- **Polarity normalised.** Settlement lawfulness has lawful = 1, deity chaos has lawful = 0, malice has saintly = 0,
  tolerance + is lenient, institution lean + is cruel [ALIGN §9.3 #15].
- **Derivation labels.** "re-derived route", "likely road", "projection", "map verdict" wherever class 2–4 applies.
- **Two drawing grammars for movement.** Dated links for netted, same-tick transfers; moving markers for clocked movers;
  never one for the other [POP §9.3 #3].

### 4.5 The audience filter

- **Default DM.** Every lens opens DM-only unless the host resolves a fact public; a fact arriving with no resolved
  audience is DM-only; covert links, exclaves and patrols fail closed [STATED FILE-M item 694; WY §3c via FPSIM §8 #6].
- **Public facts the host already shows**: a settlement's pantheon once embedded, the prosperity word in the herald, the
  tier label [Fable-reviewed 2026-10-18: the aggression chip, listed here before, is a DM surface — Library/Realm cards and the premium PDF; no player surface traced (ALIGN §1 item 7, §6 Display)], trade-war prizes, public channels, founded institutions, news headlines, the plague
  fiction ("word of plague has reached") [FAITH §9.4; PROSP §8.2; ALIGN §6 Display; TRADE §8.4; PLAGUE §8.5].
- **Believed views** only where beliefs exist (DC, LR, FS on c): believed faith label, believed pull band and
  route-position band, believed population trend (held by the courts' belief record and read by no surface — population.md V-1; the dossier's own trend sentence and head count are the public facts instead) [Fable-reviewed 2026-10-18: see §2.6's trend row], heard plague; under an omniscient preset the player picture is the
  truth or nothing [FAITH §9.6 #10; PROSP §9.3 #13; POP §8.5; PLAGUE §9 #14].
- **No believed alignment exists** — the alignment lens has no player view [ALIGN §9.3 #12].

### 4.6 The time scrub

- **Host-dated first**: news ticks, condition ids carrying ticks (boom, bust), ledger tick fields (moral drift,
  epidemic, columns' depart/arrive, steadings' founding, occupation start), sway revisions.
- **The host's own frames next**: the V-3 timelapse already scrubs the pulse history one frame per advance; a lens should
  share its frame grammar, read population deltas as the arrays they are (the host track reads them as a map and probably
  never fires), and read the mechanical outcomes too [STATED POP §8.1, §10.2 #13].
- **Map snapshots for the rest**: one shared per-advance snapshot service — a derived cache outside any model digest,
  from the first advance the map observes — for every fact with no history (bands, shares, axes, stocks, front states)
  [PROSP §9.3 #12; POP §9.3 #4].
- **Declare the horizon and the gaps**: 80 pulse records, one per advance (interior weeks dropped), 240 news, 12
  population rows; a lens says where its scrub is partial [POP §8.5].
- **Replay with the host's arithmetic**: where a lens reconstructs a decaying quantity it uses the host's actual advance
  (moral drift compounds in the host and freezes between raid ticks in RR) [ALIGN §9.3 #13].

### 4.7 Shared substrates [INFERRED]

One travel-time read (the host's travel law as data, FILE-M's `TravelLaw`; no map-side travel-time law for host facts)
[TRADE §9 #5]; one area grammar (W8a for attribute fills, W8b for politics); one dated-event store with lens tags; one
snapshot service; one audience projector; one vocabulary register.

### 4.8 Build order [INFERRED; owner question §6 Q8]

Plague first — one sparse ledger with phases, a source, two forward ticks and a host player/DM split; it exercises legend,
audience and scrub with the least invention [PLAGUE §9 #12]. Then territory and patrols (FILE-M's layers), religion on the
W8a hinterlands, trade links, populations (two grammars), prosperity; alignment last (a DM-only new disclosure with a
born bias to explain).

---

## §5 Host asks (each an offer; the host chooses; FILE-M's host track H1–H21 is cited where an ask refines it)

| # | Ask | Lens | Note § |
|---|---|---|---|
| 1 | In the polity facts window (H13): send each seat's host strength comparator (`settlementStrength`, banded) beside tier, size third and rung; map every relation label, `criminal_network` included, to a class; send drift's accepted subjugations and forced tributes as links with their ticks | territory | this note §3.2; FILE-M item 693 |
| 2 | Name the culture-distance call form the window carries (recommended: the plain form, no trade tie), banded in fifths, with the tick each band was sampled | territory, culture | ALIGN §4.2; TRADE §9 #8 |
| 3 | Define the garrison and standing bands as a banding of the capacity model's institutions and manpower × readiness, excluding the economy facet (and the will facet, if the owner so rules) | territory, patrols | PROSP §9.1 #4; ALIGN §9.1 #4 |
| 4 | Give drift's `hostile_raid` an outcome word and, where known, a place (or a pair the map places by `borderSegment`) | territory (MarchHold), prosperity | this note §3.2 |
| 5 | Send a continuity verdict per member link when the host has one (its reach band lives in the dark sovereignty lane today) | territory | TRADE §5.12; FILE-M item 714 (9) |
| 6 | Persist a band-change receipt {settlement, from, to, writer, tick}, boom sustain rungs included | prosperity, territory | PROSP §8.6 #1, D8 |
| 7 | Say whether a promotion writes back to the save row's tier label, and send tier changes as dated facts | territory, populations | POP §8.1, §11.4 |
| 8 | Give patrol coverage a host meaning: a producer for TR-1's route_wardenship / route_predation, or patrol coverage as embattlement's security input (this note's proposal for how H16's patrol coverage could be consumed; H16 itself names no security term) | patrols, danger | TRADE §9 #4 |
| 9 | Name the closer on a DM cut route, and either let caravans read the cut or label it propagation-only in the host's own UI | patrols, trade | TRADE §5.13 |
| 10 | Put the deity id and the strongest carrier source on each `religious_authority` mint and conversion receipt; retire a mint when its carrier ends | religion | FAITH §9.6 #5 |
| 11 | Persist a share history (or a dated share-change receipt) per settlement pantheon | religion | FAITH §9.5 #7 |
| 12 | A per-pulse alignment digest (both axes, bands, the top constituent causes), published like the faith projection | alignment, culture | ALIGN §9.3 #13 |
| 13 | Fix moral drift's compounding decay and its freeze outside belief worlds, so a scrub's replay matches the design | alignment | ALIGN §10 item 9 |
| 14 | Put a tick on each tolerance offset's causes | alignment, religion | ALIGN §8.2 |
| 15 | Store a shipment's path and departure tick (WY-3) | trade | TRADE §9 #13 |
| 16 | Emit caravan arrivals, starvations and entrepôt foundings as news (today computed and dropped) | trade, prosperity | TRADE §6 "missing links", §10.2 #36 |
| 17 | Correct the "Sea lanes" toggle's copy: it governs fleets and blockades, while caravans, refugee pricing and plague latency use the digest's sea lanes whatever it says | trade, territory | TRADE §10.2 #38 |
| 18 | Clarify whether a DM-confirmed `war_front` channel from discovery can embattle with War dark | danger, trade | TRADE §10.3 |
| 19 | Store each column's dispatched route and its toll (departures, origin deaths, road deaths) | populations | POP §8.6 #1 |
| 20 | Name the origin on M4 arrival rows; keep each delta's own reason in the history ring | populations | POP §8.6 #2 |
| 21 | Dispatch columns when a queued spatial emigration, terminal death or `FORCE_ABANDON` is approved | populations | POP §8.6 #3, §10.2 #2 |
| 22 | Serve each crisis netted or physical, not both (WY-4's fence) | populations, plague | POP §8.6 #4 |
| 23 | Put settlement ids on purchase news | prosperity, trade | PROSP §8.6 #2 |
| 24 | A distance term in the resettlement donor pool, or the honest word "richest" | prosperity, populations | PROSP §8.6 #3 |
| 25 | Freeze the genesis band for town drawing (the v2 layout and the district wealth word re-read the live band) | prosperity (town lens) | PROSP §9.3 #15 |
| 26 | Put the source settlement id on each materialized plague record | plague | PLAGUE §8.6 #1 |
| 27 | Keep a bounded front history (a receipt per hop: source, carrier, weeks, onset outcome) | plague | PLAGUE §8.6 #2 |
| 28 | Read the road season in the display's weeks-away | plague | PLAGUE §8.6 #3 |
| 29 | Close the condition gap (an arrived plague writes its condition) | plague, populations | PLAGUE §8.6 #4 |
| 30 | Treat a settlement missing from the digest as "no spatial delay known", not one week | plague, populations | PLAGUE §8.6 #5 |
| 31 | Map the Table Ledger's `plague` obligation to the one plague type | plague | PLAGUE §8.6 #7 |
| 32 | Attach the host's resolved audience to every fact a lens reads (H9's rule beyond events) | all | FILE-M item 694; PLAGUE §8.5 |
| 33 | Light the birth door (`NEW_CAMPAIGN_SIMULATION_PRESET_ID`), or export the resolved regime (virtual keys, canon, slots) with every snapshot so a lens never infers RR from the id | all | PROSP §7.1; TRADE §10.1 #2 |
| 34 | Keep the interior weeks of a multi-week advance (or a compact per-week delta log) | all scrubs | POP §8.5 |
| 35 | Decide what the culture "same governing name" term means (a label or a real overlord) and correct its header | culture, territory | ALIGN §10 item 27 |

---

## §6 Owner questions

> [Fable-reviewed 2026-10-18: all thirteen were answered by the session under the owner's "i leave all judgemtn to you" — J384 (1)–(13), in this order; the rulings lane upheld twelve and amended (11)'s word "members" to claim points (docs/validation/retrovalidation-2026-10-18/rulings.md). Q8's order became plague, the sway and patrols, trade and populations, religion, prosperity and alignment (J384 (8)).]

1. **Prosperity in territory: absolute or relative?** The band ratchets upward realm-wide in lit presets; relative to the
   realm median at each dated advance, or a bounded multiplier topping out at Comfortable? [PROSP §9.1 #2, §10.3 g]
2. **Culture resistance: which form, and all of it?** The plain distance (recommended) or the trade-tie form; and should
   the alignment half (0.25) stay in, given that it drifts continuously and biases born worlds? [ALIGN §10 item 25 (c)]
3. **Whose "stronger"?** Should the sway's adversarial lead defer to the host's own strength comparator, which already
   decides raids and subjugation in the default preset, or keep τ and show the disagreement? [§3.2]
4. **Military bands: with or without the economy and will facets?** [PROSP §10.3 h; ALIGN §9.1 #4]
5. **Does a drift raid count as a fight over the march** in RR without the war layer, and as a win for the aggressor? [§3.2]
6. **Should a port-backed native world count as canonized at birth?** It would light columns, the plague front, rite
   adoption, pilgrim catchments, booms and (in three presets) beliefs for every new campaign — every lens's regime moves
   with this answer [POP §10.3 #1].
7. **Should any lens show derived alignment to players**, and in what words? [ALIGN §10 item 25 (a)]
8. **Build order**: plague first as the mechanism's proving lens, then territory and patrols? [§4.8; PLAGUE §9 #12]
9. **Where does the snapshot service keep its frames, and for how long?** (a derived cache outside the model digest; its
   horizon is the scrub's horizon) [POP §9.3 #4]
10. **Holy places and hidden cult sites as map-side sites** — rule them in (and ask the host to adopt them) or keep them
    out? [FAITH §9.6 #6]
11. **Steadings**: drawn at their frozen site cells and counted as claim points before they graduate? [POP §10.3 #3]
12. **Show columns the host overlay hides** (port and teleport columns) in a native lens? [POP §10.3 #5]
13. **A born campaign's lenses**: show them in "still" mode with the regime banner, or hide a lens whose every gate is
    false? [§4.2]

---

## §7 Sources

### 7.1 Read whole (line counts as read, map module at `7d04e75` with the working tree as it stood)

`research/sf/alignment-system.md` (1,246; uncommitted edits by its seat present), `research/sf/trade-system.md` (1,307),
`research/sf/population-system.md` (1,091), `research/sf/prosperity-system.md` (1,116; uncommitted edits by its seat
present), `research/sf/plague-system.md` (1,085; ends with its §12 verification record). Host, by me at `81f1cd96`:
`src/components/settlements/LivingWorldGates.jsx` (381), `src/domain/spatial/cultureDistance.js` (210).

### 7.2 Read in the sections the task names, or in part

`research/sf/faith-system.md` (1,516): §1 (28-99), §6 (533-812), §9 (1114-1279), and the heading map. `docs/PROGRESS.md`
(1,056): J377–J379 (436-438) with J375–J382 for context (434-441). `research/sf/fp-physical-integration.md` (481): §1
(11-25) and §8 (369-460). `research/sf/fp-simulator.md` (1,098): 1-54 and §8 (1076-1098). `docs/volumes/V13-world.md`
(2,988): §3.9 (1360-1396) and the `TerritorySeed` grep. `docs/AMENDMENTS-2026-10-17m.md` (2,220): 1-146 (preamble and
items 659–662), 550-707 (items 693–699), 922-1067 (item 714), 1470-1505 (item 737), 1672-1731 (items 749–750), and a
grep for "lens". `research/sf/fp-realm-review.md` (746): grep for "lens" and J-RR.50–56 only.

### 7.3 My re-reads of the host at `81f1cd96` (read-only)

`wp/simulationRules.js` (1,593): 1-180 (defaults and the birth constant), 676-1224 (the spreads and all seven preset
bodies). `docs/DESIGN_FP_COHERENCE_FOLD.md` (708): §2, 326-352. `wp/migrationKernel.js` (517): 128-232 (the culture
vector, the trade-tie and hostility tables) and the line grep. `sp/smuggle.js`: the culture-distance call at :176 by
grep. `src/domain/rulingPowerSeat.js`: 280-372 (the vassal-overlord read; the culture closeness helper) and its
importers by grep. `wp/militaryStrength.js` (329): 1-90 and the function index. `wp/relationshipRuleHelpers.js`:
295-331 (the strength comparator) and 440-491 (the overlord test; §2.1 and §3.2 cite `:453-466`). `wp/relationshipRulesAdversarial.js`: 12-40, 266-372. `wp/relationshipEvolution.js`:
85-130. `sp/distanceRead.js` (1,192): 270-316 (§3.2 cites `:277-311`). `sp/embattlement.js` (449): 69-125 (the tuning constants; `ENTER_THRESHOLD` 0.55 at `:74`) and 195-206 (`:204`, the security relief). `wp/relationshipRulesCore.js`: 745-851 (the vassal rules §2.1 and §3.4 cite) [Fable-reviewed 2026-10-18: ranges widened to cover every line this note cites OBSERVED].

### 7.4 Not read, and what that leaves open

FAITH §2–§5, §7–§8, §10–§12 (the religion lens rests on §1, §6 and §9 and on the other notes' cross-references);
`fp-realm-review.md` beyond the grep and the rest of FILE-M (the sway is taken from items 693–714 only); V13 beyond §3.9;
the host's `foreignSeatOf` gating (so the third culture-distance caller's lit status is unknown); the drift relabel's
acceptance path (`labelProposal`) and whether an accepted `vassal` relabel writes the overlord and vassal ids where the
map would read them; how `hostile_forced_tribute` records its tributary; whether a promotion writes back to the save
row's tier label; `wp/martialReadiness.js` (readiness as a standing input is proposed from ALIGN §6, not re-read); the
host's `spatialDigest.js` territory flood (taken from TRADE §5.2); every host test. No file was unreadable.
