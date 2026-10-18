# hidden-ways / read-host — the host's recorded facts the HIDDEN WAYS request leans on (2026-10-18)

Lane: hidden-ways/read-host (reader, Opus/high), workflow hidden-ways-design (J407). Applies nothing; no git.
Request read: `docs/host-requests/2026-10-18-hidden-ways.md` (47 lines), cited below as REQ:n.
Host facts read: `docs/HOST-REQUIREMENTS-2026-10-18.md` (HR:n) §6 (587–715) whole, §7 (716–800) whole, §8 (801–880);
`research/sf/fp-physical-integration.md` (FPI:n), `fp-simulator.md` (FPS:n), `trade-system.md` (TRD:n),
`plague-system.md` (PLG:n), `lens-implications.md` (LNS:n), `fp-realm-review.md` (FRR:n), `population-system.md` (POP:n),
`faith-system.md` (FTH:n) — each carries a "Fable-reviewed 2026-10-18 … (J392)" header at its line 3 [OBSERVED].
Map-side cross-checks: `docs/volumes/V13-world.md` (V13:n, 4,611 lines as read), `docs/volumes/V14-sites.md` (V14:n),
`docs/ARCHITECTURE.md` (BASE:n), `docs/volumes/V08-settlementforge.md` (V08:n).
Tags: [STATED] the cited text says it; [OBSERVED] checked in the repository by this lane; [INFERRED] this lane's reasoning.
Clean-room note: this is a reader record, not an implementer input. Host identifiers appear only inside quotations of the
research and host document, as evidence; nothing here is to be copied into V13, V14 or the base.

---

## 1. The host facts the request relies on, one by one

### 1.1 The hidden rung and the "hidden road class" (ENC-HL-12, ledger row M4)

- F1. ENC-HL-12 reads: "A 'hidden' road class: paths only smugglers and wanderers use, never armies. The host's road
  ladder ends in 'hidden', designed but dark; the map's classes end at 'trail'." Verdict MISSING; ledger row M4, STUB;
  ledger I/O TICK [STATED HR:655]. The request quotes it faithfully [OBSERVED REQ:6 vs HR:655].
- F2. Ledger row M4: "Hidden paths usable by wanderers and smugglers (armies may not)"; design "grade penalty on the
  `hidden` rung; 'the dangerous goods take the overgrown road'"; STUB, "route lifecycle dark; roamer physics J4 unbuilt";
  law "Law 5 NOTHING IS FORGOTTEN" [STATED FPI:159]. Map side: "a `hidden` route class | the world's classes end at
  `trail`; the host's `hidden` rung has no world counterpart | MISSING" [STATED FPI:455].
- F3. The host's ladder: genesis edges `grade: highway|road|track|hidden`, genesis access "major→highway,
  standard→road, seasonal→track, isolated→none" [STATED FPI:98]; the route lifecycle's "grade ladder down to `hidden`,
  never absence", 17 modules built DARK (`routeLifecycleEnabled: false`) [STATED FPI:99]; trade's reading: "the lived
  network with grades highway / road / track / hidden … nothing writes the network" [STATED TRD:636-638]. So in the
  host's own design the `hidden` rung is where a road DECAYS to ("down to hidden, never absence"), and M4's quotation calls
  it "the overgrown road" [STATED FPI:99, FPI:159].
- F4. The host's migrants refuse the rung: columns price legs "highway 0.75, road 1, track 1.5), hidden hops refused"
  [STATED POP:420].
- F5. V13 ALREADY CARRIES the host's `hidden` grade, with the decay meaning: `WorldRoute.grade?: string /* bound: the
  host's grade word, hidden among them */` [OBSERVED V13:788]; the frame charter's road row `hidden?: boolean /* a road
  the host grades hidden: no public road, drawn DM-only */` [OBSERVED V13:764]; the lived network "a demotion keeps the
  polyline; a revival restores the hidden one … a hidden land road is a DM-only ghost and a hidden water lane a quiet-quay
  mark … a hidden road counts as no public road" [OBSERVED V13:1811-1820]; H12 checks "the quiet-quay rule for a decayed
  water lane" [OBSERVED V13:3887]; the patrol grade shift "(hidden: none)" [OBSERVED V13:1163]; T-V13-42 "a hidden road
  has none" [OBSERVED V13:3737]; the routes layer "a hidden host road a DM-only ghost" [OBSERVED V13:3144]. Source
  ruling: J-RR.18/J-RR.19, "grade with `hidden`" [STATED FRR:239-247, FRR:553].

### 1.2 Per-stretch terrain classes (ledger rows T2, T9; ENC-HS-06, ENC-HP-09)

- F6. T2: "Terrain class per route segment (for receipts) … eight classes {water, desert, grassland, forest, wetland,
  tundra, glacier, mountain}; elevation is an overlay (above the knee reads 'mountain' whatever the biome) … DIGEST
  `routeReceipts` … ONE-SHOT"; law "The DM can always ask 'why this road?'" [STATED FPI:58]. Map-side verdict: "`WorldRoute`
  carries polyline, `costTotal`, `landmass`, `reason` — no terrain-class breakdown per segment | MISSING" [STATED FPI:394].
- F7. The host document files T2 under "The host supplies today" (ENC-HS-06): "The host records eight classes … per
  stretch … The map's world port … gives each route a line, a total cost and a reason, but no per-stretch breakdown. If
  the host stops building its own frozen digest it loses these receipts unless the map adds them; army pace along a route
  (T9) depends on them" [STATED HR:606].
- F8. T9 / ENC-HP-09: "Terrain as a modifier of army pace and the defender's ground … DERIVED readiness/terrain pace;
  'defender's-ground' term … TICK" [STATED FPI:65]; map side "terrain along an army's route | needs T2 | PARTLY" [STATED
  FPI:401]; HR: "It needs the per-stretch terrain classes the map does not return ('needs T2')" [STATED HR:625].
- F9. STALENESS: V13 has since gained the per-segment class. `WorldRoute.vertexClass: Uint8Array /* per segment: the
  host's terrain class through the adapter folder's table */`, `byClassM: Record<string, number>` [OBSERVED V13:790-791],
  evaluated on the final polyline with the stations (J-V13.73) [OBSERVED V13:1797-1802]; it entered by amendments m
  [OBSERVED docs/AMENDMENTS-2026-10-17m.md:543, :933]. The research note read V13 at 2,988 lines, §2.2 and §3.11 only
  [STATED FPI:484, FPI:491], so its T2 = MISSING (FPI:394) and HR's ENC-HS-06 / ENC-HP-09 wording (HR:606, HR:625) predate
  it [INFERRED].
- F10. But the two feeds split it: the simulator feed's `routeFacts` gives "per host edge: the host key, integer land
  effort-metres, the water metres by kind, the per-class effort, the crossings and the 52-week seasonal sets — never
  `costTotal`" [OBSERVED V13:2484-2485] — per-class TOTALS, not the ordered stretches; the ordered `vertexClass` rides on
  `WorldRoute`, i.e. in `routes(world)`, the MAP FEED, which "is never written into the host's world state and is never
  read by a step of its simulation" [OBSERVED V13:2437-2439]. `routeFacts` and `patrolOffer` are "Both optional; the host
  reads either only behind its own switch" [OBSERVED V13:2490-2491]; they land with M-W2 [OBSERVED V13:3814].
- F11. The canon's crossings already carry class words: `crossings: { … classes: [string, string] /* the two crossing
  cells' terrain classes */ … }` [OBSERVED V13:796]; the canon's version vector carries `vocabulary: { terrainClass;
  climateBand }` [OBSERVED V13:846]; the sites slot's ground points carry `terrainClass /* the adapter folder's class
  table */` and an integer `stepCost` [OBSERVED V13:848]; H5's satellite-ground reader reads "each ground point's terrain
  class and step cost from the sites slot" [OBSERVED V13:3880].

### 1.3 Detours and the lived network (R3, R4; ENC-HP-13, ENC-HL-10)

- F12. ENC-HP-13 / R3: "Roads that rise, decay and become hidden over the campaign … No way was found for the host to
  write its lived road grades back … An encounter on an 'overgrown road' depends on a grade only the host knows" PARTLY
  [STATED HR:629; FPI:99, FPI:420].
- F13. ENC-HL-10 / R4: "Detours around a dangerous place. The host designed roads that bend around danger and stay bent
  after it clears, but did not build it; the map offers no detour either" — STUB, "waypoints 'are geometry, never new
  graph nodes; the frozen digest is untouched'" [STATED HR:653; FPI:100, FPI:421].
- F14. STALENESS: V13 now has the inbound `network(world, window, changes)` mirroring the host's changes by kind
  "chartered, promoted, demoted, abandoned, revived, facet, bypass or retract", with `avoids` and `radiusM` for a bypass
  [OBSERVED V13:886], and re-lays a host `bypass` "round that radius under the cost law as a dated lay version under the
  same host key, the former lay kept and the hysteresis the host's" [OBSERVED V13:1813-1815]. So the read half of R3 and
  the geometry half of R4 are designed map-side; the map still has no detour operator of its own [INFERRED from V13:1811-1817
  and FPI:421].

### 1.4 Route ends, junctions and places

- F15. Bound mode: "every host route ends at two host settlements, so a site drop never" re-routes it [STATED FRR:212;
  J-RR.15 FRR:544]. `WorldRoute { a; b /* its two ends: seat ids … an approach road's … `a` its site's placement and `b`
  the public route it joins */; join?: { route: Id; atCm: WorldPointCm } /* an approach road only: its junction */ }`
  [OBSERVED V13:786]. The approach road is the map's own and appears "never [in] the canon, `routeFacts`, `patrolOffer` or
  `routes(world)`'s host list" [OBSERVED V13:1306; also V13:1872]; H31 lets the host draw it as "map road", "read by no
  step of its simulation" [OBSERVED V13:3906].
- F16. Typed places: `WorldWhere { kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage';
  seat?; edge?; mode?; fraction?; pair?; at? }` "resolved at fold, kept as a dated fact" [OBSERVED V13:887] (J-RR.38
  [STATED FRR:587]). There is no `way` or `junction` kind; a point on a road is `road` + `edge` + `fraction` [OBSERVED
  V13:887].
- F17. No raster index crosses the port: "every position a world point" (J-RR.5) [STATED FRR:529]; the simulator feed
  "admits integers with a stated unit, the host's closed vocabularies through the adapter folder's tables, host keys and
  `WorldPointCm`s — no float, no prose, no cache, no echo of a host fact, no raster index" [OBSERVED V13:2435-2437].

### 1.5 Smuggling, quarantine, patrols, line of sight

- F18. Smuggling (M7): "At arrival the route's worst gate is ranked hostile > contraband > toll, then by danger. Only a
  hostile or contraband gate triggers the one roll; detected at a hostile gate → seizure … at a contraband gate →
  confiscation … undetected → delivered"; the criminal channel's network term includes "an underways bonus" [STATED
  TRD:565-576]. Supply shipments carry "optional ranDanger / smuggle flags — no path, no departure tick" [STATED TRD:179].
  The word "gauntlet" occurs in no research note [OBSERVED grep research/sf]; the recorded smuggling is one roll at the
  route's worst gate, not a run along a path [INFERRED from TRD:565-568].
- F19. Gates: "a route from A to C crossing B's territory makes B a gate … per-gate policy: toll, prohibit, confiscate …
  'Geography becomes political: hold the pass, hold the trade'" [STATED FPI:112]; answered since by the canon's crossings
  (J-RR.3) [STATED HR:608, FPI:458-468].
- F20. Quarantine: plague-R7 is an OPEN OWNER QUESTION: "PG pg-4's quarantine or gate-closure verb is DESIGNED ONLY and
  PG names quarantine an owner value: is it to be built … never as a patrol fact the map draws (a patrol holds no quarantine
  line)?" [STATED HR:481]. "No route capacity, no per-edge throughput limit and no quarantine exist" [STATED PLG:556];
  "the host has no quarantine enforcement and no gate closure" [STATED PLG:798-799]; "Borders are not plague barriers"
  [STATED PLG:795]. V13's lenses refuse "a quarantine line" and "a patrol drawn … holding a quarantine line" [OBSERVED
  V13:3385, V13:3428]; LNS: quarantine lines "**never**" [STATED LNS:196].
- F21. Patrols: map-only by the owner's decision of 2026-10-18 — "the host is not asked to consume the coverage, the
  legend says patrols change nothing in the simulation, and the optional door (H16) stays open" [STATED HR:489; law 11
  HR:672; open point HR:711]. "No host consumer of patrols exists" [STATED LNS:371]; "A patrol lowering danger … must not
  be drawn as an effect" [STATED LNS:193]. The patrol cadence is "host-asserted coverage first (… a hidden road none)"
  (J-RR.54) [STATED FRR:613].
- F22. Line of sight: L1 ABSENT; "nothing planned on the host side" [STATED FPI:137; HR:654]; the VTT export's sight lines
  "are map geometry, and the map must not present it as host truth" [STATED HR:654]. V13 has a map-own post viewshed on
  hover, class P [OBSERVED V13:3426].

### 1.6 The hearing week (ENC-HL-13) and "every engagement has a place"

- F23. "The hearing week: the host's designed pause at a one-week advance where every engagement between settlements is
  docketed with who, upon whom, where and the default verdict … H16's 'border segment as a hearing card's where' and law 7
  below assume it … Not scheduled" [STATED HR:656]. Requirement 24: "dark-identical behind `hearingWeekEnabled`; the pending
  card names 'who, upon whom, where, the default verdict'" [STATED FPS:474]; the flag, `registerEngagementKind` and
  `pendingEngagements` are absent from host code [STATED FPS:221-227, FPS:1064]. The registry is "one closed ENGAGEMENT
  REGISTRY" [STATED FPS:474]; "No row names terrain" [STATED FPS:869]; `armies_meet`'s place is "a road" [STATED FPS:877].
- F24. Law 7: "Every engagement has a place … Route geometry used for forecasts must give the same answer throughout one
  advance" [STATED HR:668].

### 1.7 Knowledge, audience and the snapshot

- F25. "the host's snapshot hard-deny already hides `spatialLedgers`" (REQ:17) is NOT a recorded fact. What is recorded:
  "`pantheon` is the **only** world ledger on the public snapshot allowlist …; `religionStates` is hard-denied" [STATED
  FTH:435-436]; the public projector "hard-denies `religionStates` … and strips every covert, seed and prose key by
  `COVERT_KEY_RE`" [STATED HR:799]. That `spatialLedgers` is withheld follows only by inference from the allowlist
  [INFERRED from FTH:435]; no source names it [OBSERVED grep research/sf, HR].
- F26. Audience contract: the per-row audience of the events and lens windows "must come from that one projector,
  `hidden` never sent, `gm` folded DM-only, the party's rows from the belief map, not from a new allowlist in the port
  client" [STATED HR:799]; "Every lens opens DM-only … covert links, columns and patrols are omitted rather than greyed"
  [STATED HR:797].
- F27. Law 8: "Belief exists only when the world's geography has been captured and the information mode is not
  all-knowing, which three of seven presets set. The map's site knowledge … must stand on its own; it cannot count on host
  belief being on" [STATED HR:669].
- F28. The site precedent: the party's known places are new host state (`MapRecord.party`), written by V08's reveal from
  M-SITE-A [STATED HR:601]; the three states `SecretState { state: 'dmOnly'|'revealed'|'discovered' }` [OBSERVED V14:763];
  the two-writer question for the shared `party` key is a day-one question [STATED HR:873].

### 1.8 Laws, contracts and budgets that bind any answer

- F29. Law 1 frozen geography, side records only, changes as "a dated event or a receipted re-capture, never as a silent
  rewrite" [STATED HR:662]. Law 2 one distance law: "New terrain costs or travel modes enter that rule or the one graph as
  edge types, never a second pathfinder or another distance price" [STATED HR:663]. Law 5: "A richer terrain model reaches
  FP only as a new record value, off until present, with a named consumer stage" [STATED HR:666]. Law 6 "Show presence,
  not intention … secret movers stay hidden unless the viewer may see them ('fail closed')" [STATED HR:667]. Law 9
  "Nothing is scheduled to be built on the host side yet" [STATED HR:670]. Law 10 the four mark classes and "Everything
  else is refused" [STATED HR:671]. Law 15 "Weather slows travel, never cuts it" (S2's "WINTER TRAVEL — SLOW, NOT SEVER",
  cap `SLOW_NOT_SEVER_MAX` 6) [STATED HR:676; FPI:124].
- F30. Canon versions "per slot, never the file format alone … a slot whose inputs did not change is byte-identical"
  [STATED HR:777]; the slots today: geometry, costLaw, travelLaw, vocabulary, water, sites [OBSERVED V13:846]; the host's
  three version axes (geometry, cost law, seasonal overlay) [STATED HR:779]; "Every port message carries the canon
  envelope's version vector" [STATED HR:791].
- F31. "Host exports change no simulated byte" within H23–H30; every optional read "lands switched off and data-gated,
  absent meaning the prior bytes" [STATED HR:793].
- F32. Budgets: continent ≤ 24 MB gzipped, realm ≤ 11 MB, province ≤ 3 MB, "plus ≤ 2 MB of records"; reason records
  "≤ 10⁵ records at the continent rung, ≈ 120 B each gzipped … routes … among them" [OBSERVED V13:1351-1360]; the host's
  frozen digest is capped at 400,000 bytes and H5 keeps that cap [STATED HR:840].
- F33. Vocabulary register: "every closed ladder minted into the VOCABULARY REGISTER with a homonym check — 'one word,
  one meaning per surface'"; "A map program's vocabulary (e.g. scale, route grade, terrain class) must not collide with
  the register" [STATED FPS:471].

## 2. What the host document's own words mean by H9, H23 and H16

- **H9, "the events window"**: "After every advance, undo and resume, send an events window: committed facts only, keyed
  by the advance nonce where the advance epoch is lit, else by pulse-history sequence, each fact with who may see it"
  [STATED HR:68]; "The dated events of the turn (an occupation, a conversion, a boom, a raid): committed facts only, never a
  forecast … Each row carries its resolved audience: the host's `gm` means DM-only; `hidden` is never sent … one event moves
  every lens at the same week" [STATED HR:734]. Map side: inbound `events`, each `WorldEvent` with `kind` "the host's word",
  `where?: WorldWhere`, and lens tags "by the adapter folder's event table" [OBSERVED V13:835-838]. So a `way_known` row is a
  new EVENT KIND in an existing channel: it needs an adapter event-table row and a resolved audience [INFERRED].
- **H23, "the week's presence rows"**: the host document never uses "presence rows". H23 is "the lens window (`lensWindow`):
  the ledger rows the host already keeps (plague, faith, economy, rites, supply, travellers, transfers, columns, head counts,
  its alignment reading), each with who may see it … its resolved regime with every window" [STATED HR:102]; it is
  "Export, changes no simulated byte" and every lens reads it, "No lens waits on it to open" [STATED HR:102]; it lands
  "With M-W5's first step" [STATED HR:578]. Movers' positions are H17: "presentation messages: movers and embattlement
  phases, projected for the audience" [STATED HR:83, HR:577]. So where bodies are on a way is an H17 mover (or an H23 row
  only if the host keeps the bodies as a ledger the lens window carries) [INFERRED].
- **H16, "stays your inbound door; the host does not consume it"**: in the host document H16 is the HOST's optional reads
  of the map's offers — "The optional reads: patrol coverage, crossing holders, the sway overlay, the border segment. The
  only door through which patrols or the sway can ever touch the simulation" [STATED HR:576]; "Lets the map's patrol, sway
  and route facts reach the host's outcomes; until a part is adopted it stays a map-feed reading only" [STATED HR:82]. Seen
  from the map it is an outbound offer door, not the map's inbound door [INFERRED]. One of H16's parts is "a border segment
  as a hearing card's 'where'" [STATED HR:82; V13:3891], and "route facts as overlays" is another [STATED HR:82].

## 3. Which asks are covered, partly covered, or new

| Ask (REQ line) | Already in a recorded row | Verdict |
|---|---|---|
| A. hidden-ways layer, versioned (REQ:23) | M4 (FPI:159, :455), ENC-HL-12 (HR:655); canon slots geometry/costLaw/travelLaw/vocabulary/water/sites (V13:846) — no ways slot | NEW (a canon slot or record) |
| A. endpoints as junctions off a settlement (REQ:24) | approach roads' `join { route, atCm }` (V13:786), keyless and outside the simulator feed (V13:1306); host routes end at two settlements (FRR:212) | NEW for the simulator feed; a map precedent exists |
| A. ordered cells/stretches with ground class (REQ:25) | `vertexClass` per segment on `WorldRoute` (V13:790); class table referenced, rows unwritten (§4) | PARTLY (shape exists for routes); "cells" conflicts with no-raster-index (F17) |
| A. step cost in cost units (REQ:26) | `stations` per vertex (V13:790); sites slot `stepCost` integer (V13:848); the host's cost law handed in (V13:1797-1799) | PARTLY (pattern exists) |
| A. width/kind hint (REQ:27) | none; routes carry class only (V13:788); C2 route capacity MISSING (FPI:23; HR:609) | NEW |
| A. junction records as typed places (REQ:28) | `WorldWhere` kinds (V13:887) lack way/junction; road + edge + fraction exists | PARTLY |
| A. density rule (REQ:29) | none | NEW (map genesis) |
| B. per-stretch ground classes on overt routes (REQ:31) | `vertexClass`, `byClassM` (V13:790-791) in the map feed; per-class effort in `routeFacts` (V13:2484); crossings' classes (V13:796) | LARGELY COVERED by V13 text since amendments m; ordered stretches not in the simulator feed (F10); class table rows unwritten |
| C. reveal and legend (REQ:33) | hidden host road a DM-only ghost (V13:1815, :3144); site reveal states (V14:763; HR:601, :647); lens audience rules (HR:797-799) | PARTLY (precedents); `way_known` event NEW |
| C. `way_known` through H9 (REQ:33) | H9 channel (HR:68, :734) | channel COVERED; event kind NEW |
| D. no promotion of a way; decayed road not a way (REQ:35) | `network` kinds incl. demoted/revived (V13:886); host ladder decays to `hidden` (FPI:99) | CONFLICTS with the word (§5 C1) |
| D. detours (REQ:35) | `bypass` re-lay (V13:1813-1815, :886) | COVERED map-side for the host's bypass |
| Q1 non-settlement junction | approach-road `join` (V13:786), never a host edge (V13:1306) | answerable now |
| Q2 per-stretch ground classes | V13:790, :2484, :2437-2439 | answerable now (yes in the map feed; totals in the simulator feed) |
| Q3 which class means "not for armies" | classes highway/road/track/trail/sea/river (V13:788); `trail` a standalone rank class, "no trails to host seats" (FRR:553; V13:1806); WayClass map trail → path (V13:762) | answerable: neither `trail` nor a seventh class; `hidden` exists only as a host GRADE of a decayed host road |
| Q7 budget | V13:1351-1360 | map's own arithmetic |

## 4. The host's eight stretch classes against V13's words (the adapter's class table)

- [OBSERVED] V13 names "the adapter folder's class table" as the source of every host terrain class it emits
  (`vertexClass` V13:790; crossings V13:796; `CanonSeat.terrainClass`, sites ground V13:848-849; `classFactor` V13:1006;
  V13:1900) and stamps its version in the canon (`vocabulary.terrainClass`, V13:846), but the TABLE'S ROWS ARE NOT WRITTEN
  in V13: "grassland" occurs nowhere in V13, V14 or the base [OBSERVED grep]. V13 §2.8/§3.15 is the generator-import
  adapter (V13:1366-1400, :2838) and holds no host terrain-class table [OBSERVED].
- [STATED] The host's rule: eight classes, "elevation is an overlay (above the knee reads 'mountain' whatever the biome)"
  (FPI:58); the knee is FMG height 60 (`MOUNTAIN_HEIGHT`, FPI:72). V13's cost-law schema carries the knee as
  `elevationKneeM` handed in with the host's law (V13:1006, :1797-1799).
- [OBSERVED] V13's biome rows and their `landUse` (V13:996, :1082-1096): ice→ice; tundra→tundra; boreal, temperateForest,
  tropicalSeasonal, rainforest→forest; temperateGrass, savanna→grass; mediterranean→scrub; hotDesert, coldDesert→desert;
  wetland→wetland; alpine→alpine.
- [INFERRED] crosswalk the designers can write as the table's rows (to be confirmed, not a host fact):

| host class | V13 source words | note |
|---|---|---|
| water | a water surface or reach (sea, lake, river) under the step | the host's T1 guards marine at 99 (FPI:57); a route's water runs are `waterRuns` (V13:787) |
| desert | landUse `desert` (hotDesert, coldDesert) | |
| grassland | landUse `grass` (temperateGrass, savanna) | `scrub` (mediterranean) has no obvious host word: grassland or desert — a ruling |
| forest | landUse `forest` (boreal, temperateForest, tropicalSeasonal, rainforest) | |
| wetland | landUse `wetland` | V13's W5 wetland test by `flowAccum` and slope (V13:1655) |
| tundra | landUse `tundra` | |
| glacier | landUse `ice` | |
| mountain | landUse `alpine`, OR any step above the host law's `elevationKneeM` whatever the biome | the overlay rule of FPI:58 |

- [STATED/INFERRED] There is NO "hills" class among the eight (FPI:58); hills are "unknowable" to the host's cost law
  (FPI:15; ENC-HL-07 HR:650). "Hills" is a word of the host's OTHER vocabulary, the seven settlement terrain words
  {plains, hills, forest, riverside, coastal, mountain, desert} (T3, FPI:59; HR:624). The request's cover set
  "forest/hills/mountain/wetland" (REQ:31) and density words "forest, hills, mountain, marsh" (REQ:29) mix the two
  vocabularies; "marsh" is neither (the eight say wetland) [OBSERVED REQ:29, :31 vs FPI:58-59].
- [OBSERVED] A third "terrain class" exists in the base: `ContextVector.terrainClass: 'high'|'mid'|'low'|'damp'|'flood'|'rock'`,
  a settlement-frame term (BASE:1247; V14:1443). V13's "the host's terrain class" is a different meaning on the world surface;
  the designers should keep the qualifier "the host's" wherever the eight are meant [INFERRED].

## 5. Contradictions and gaps between the request and the recorded facts

- C1. `hidden` would carry two meanings. The request uses `hidden` for a class of born geography that a decayed road
  never becomes (REQ:10, REQ:35), calling it "its own ladder's last word" (REQ:10). In the recorded host design that rung is
  where roads decay ("grade ladder down to `hidden`, never absence", FPI:99; "the overgrown road", FPI:159), and V13
  already mirrors it as a demoted host road drawn as a DM-only ghost (V13:764, :788, :1813-1820, :3887). Minting `hidden`
  as the hidden-ways class collides on both sides. [STATED FPI:99, :159; OBSERVED V13 lines]
- C2. "way" collides on the map side: `WayClass` and `Way` are the base's settlement-frame skeleton (BASE:1090-1096), with
  1,025 lines with the whole word "way" in the base, 32 in V13, 34 in V14, 52 in V08 [OBSERVED grep -ciw, lines not uses]. Free words in V13,
  V14, V08 and the base: "byway" (0/0/0/0), "trod" (0/0/0/0), "holloway", "droveway" [OBSERVED grep]; "byway" was a
  candidate name for the approach road in the sites-roads lane (docs/validation/sites-roads-2026-10-18/design-B.md:25-56;
  judge-1.md:108, :221) and was not adopted (V13 says "approach road", V13:786) [OBSERVED]; "trace" is taken (47 lines in
  V13, 336 lines in the base) [OBSERVED].
- C3. Armies. Recorded: M4 "armies may not" (FPI:159), ENC-HL-12 "never armies" (HR:655). The request admits "A small
  military unit may take one to cross unseen — slowly, with attrition, size-capped" (REQ:15). A changed host rule, not a
  recorded one. [STATED]
- C4. Capacity. No route capacity exists on the map (C2, FPI:23; HR:609 "the map's routes carry no capacity at all"); the
  host's only capacity is a recorded, unenforced sea-lane factor (HR:609). A size band per way (REQ:16) is new on both sides.
- C5. The request's B (a host-derived stand-in "cover graph from ground classes between route junctions", REQ:31) is the
  host deriving geography; the request's own rule says "the host never invents geography" (REQ:11). If the map ever draws
  that stand-in, law 10 admits it only as a host-derived mark "labelled 'by the host's law'" (HR:721) [INFERRED]. And it needs
  ORDERED stretches with their positions; the simulator feed carries per-class totals only (V13:2484), the ordered
  `vertexClass` sits in the map feed, never read by a step of the simulation (V13:2437-2439) [OBSERVED].
- C6. "CELLS" (REQ:25): no raster index crosses the port (J-RR.5, FRR:529; V13:2437). A way must be points/stretches in
  `WorldPointCm` with per-stretch classes, like `WorldRoute` (V13:790) [OBSERVED].
- C7. Junction endpoints (REQ:24): host routes end at two host settlements (FRR:212); the map's only junction-ended road
  (the approach road) is keyless and excluded from the canon, `routeFacts`, `patrolOffer` and the host list (V13:1306).
  A way with host-readable junctions is the first junction-ended edge in the simulator feed; it needs a key the host can
  name (the approach road deliberately has none) [OBSERVED/INFERRED].
- C8. Quarantine (REQ:20): there is no quarantine or gate-closure verb (PLG:556, :798-799); plague-R7 is an open owner
  question (HR:481); V13 refuses a quarantine line on every lens (V13:3385, :3428). "Your lens can draw it when lit" is only
  admissible once the host's verb exists and sends the closure as a stored fact (class S, HR:720) — and never as a patrol
  holding a line (HR:481) [STATED/INFERRED].
- C9. Patrols catching bodies (REQ:17): the host has no patrol rule (HR:711; LNS:371); the map's patrol cadence is a
  projection the host is not asked to consume (HR:489, :672). "A patrol catches a body on it … a known way can be watched"
  needs a host rule of the host's own; the map's cadence cannot stand in. V13's cadence gives a hidden host road "none"
  (V13:1163, :3737) — which would also read as "none" on a way if the way inherited the `hidden` grade [INFERRED].
- C10. "presence rows (H23)" (REQ:11): H23 is the lens window of ledger rows; movers are H17 (HR:83, :102, :577). The
  designers should name H17 for bodies on ways [STATED/INFERRED].
- C11. "H16 stays your inbound door; the host does not consume it" (REQ:11): H16 is the host's optional reads of map offers
  (HR:576); one of its parts is the border segment / typed place as a hearing card's "where" (HR:82; V13:3891). The request's
  item 5 needs the hearing card to name a way or junction (REQ:19). If the host does not consume H16, the way ids must reach
  the host by the canon (the simulator feed), not by H16 [INFERRED]; this should be said, not left implicit.
- C12. The hearing week is unbuilt and its registry closed (HR:656; FPS:221-227, :474); "No row names terrain" (FPS:869).
  A gang sortie engagement kind is a new registry row on the host side; `WorldWhere` has no way/junction kind (V13:887).
- C13. "spatialLedgers hard-deny" (REQ:17) is not recorded (F25); the recorded allowlist (FTH:435) implies it only by
  inference. A host day-one confirmation, not a map fact.
- C14. "the existing smuggling gauntlet" (REQ:15): no recorded "gauntlet"; the recorded smuggling is one roll at the route's
  worst gate (TRD:565-568), on shipments with "no path" (TRD:179). Moving it onto ways means the gate roll needs the way's
  territorial crossings; today crossings exist per seat pair in the travel slot (V13:796; FRR:527) [INFERRED].
- C15. Knowledge per town vs law 8: belief exists only in three of seven presets (HR:669); the request's per-town
  KNOWN/UNKNOWN (REQ:17) is the host's own ledger, so in a preset without belief the map must still stand on its own
  (DM view draws all ways, the party view by the DM's reveal) [STATED HR:669; INFERRED].
- C16. "An unknown way is undrawn" (REQ:33) vs "every lens opens DM-only" (HR:797) and V13's DM-only ghost precedent
  (V13:1815): undrawn must mean undrawn in the party's and a town's believed view, not in the DM's [INFERRED]; the request
  does not say which view.
- C17. Two writers of a DM reveal: the request has the host send `way_known` (REQ:33) and also "a way the DM reveals draws
  for the party's view" (REQ:33); the site precedent already carries the open two-writer question for `party` (HR:873).
- C18. Stale citations in the host document [OBSERVED]: HR cites V13 H9/H16/H23 at lines 3747/3754/3761 (HR:68, :82, :102);
  they now stand at V13:3884, :3891, :3898. HR's open point "Both research notes are marked 'pending Fable review'"
  (HR:713) is stale: both carry "Fable-reviewed 2026-10-18" at line 3 (FPI:3, FPS:3). The request names "the host's track
  (H1–H30)"; V13 now has H31 (V13:3906), so a new host row would number from H32 [OBSERVED].

## 6. What the designers must decide (open points)

1. The class word: not `hidden` (C1) unless the host re-words its decay rung; and not "way" (C2). Candidates free in all
   four volumes: "trod", "byway" (with its sites-roads history), "holloway", "droveway"; the host side's register check
   (FPS:471) is the host's.
2. Whether a demoted host road graded `hidden` and a born hidden way are one record kind or two (V13:788 vs REQ:35), and
   whether the patrol cadence's "hidden: none" (V13:1163) applies to the new kind.
3. Where the layer lives: a new canon slot with its own input hash and version (HR:777; V13:846), versus rows of
   `WorldRoute`; and how its junctions get host-nameable keys (C7).
4. The adapter class table's rows (§4), including `scrub` and the mountain overlay by the host law's knee; whether a
   "hills" relief word is offered beside the eight (it is not one of them).
5. Whether ordered per-stretch classes enter the simulator feed (for B and for T9), or only per-class totals stay there
   (V13:2484 vs :2437-2439).
6. The width/kind words and whether a capacity band is recorded or left to the host (C4); the density rule's parameters
   from terrain (REQ:29).
7. A `WorldWhere` kind for a way and a junction (V13:887), for the hearing card (C12) and `placeOf`.
8. The reveal: DM view draws all; party and believed views by the host's `way_known` with resolved audience and by the
   DM's reveal; who writes when bound (C16, C17); the legend line that says ways exist without a count (REQ:33).
9. The quarantine sentence: refused today (V13:3385, :3428); admissible only as a host-stored closure once plague-R7 is
   ruled (C8).
10. The milestone (Q6): the layer needs W7's routes (M-W2, V13:3814) and the canon; the reveal needs H9 (M-W1) and the lens
    rules (M-W5) — the designers name it; the host row numbers from H32.
11. Q7's arithmetic: 200–2,000 ways per province against the province's 3 MB and the continent's ≤ 10⁵ reason records
    (V13:1351-1360) — a continent of many provinces at 2,000 each could take a large share of the record cap [INFERRED].
12. Corrections to send back: B is largely designed already (F9-F10); detours and lived grades are mirrored (F14);
    H23 vs H17 (C10); H16's direction (C11); the hard-deny claim (C13); "gauntlet" (C14); the stale HR line numbers (C18).
