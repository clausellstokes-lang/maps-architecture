# critic-ftg working notes (second critic seat, FTG trio + docs + payload) — 2026-09-21
Append-only. Final output: research/findings/_critic-ftg.md

## Checklist
- [ ] read _critic.md §0 §2 §3 §4 §6 (DONE 1st turn)
- [ ] read ftg-docs-params.md 1-630
- [ ] read ftg-payload-visual.md 1-366, 597-990 (§5 read)
- [ ] read ftg-posts-a.md 1-1033
- [ ] read ftg-posts-b.md 1-1010
- [ ] read ftg-posts-c.md 1-1001
- [ ] contradictions table (T1)
- [ ] spot-checks >=15 (T2)
- [ ] NAMED-ONLY resolutions (T3)
- [ ] payload re-derivations >=5 (T4, subagent)
- [ ] addenda appended (T5)
- [ ] _critic-ftg.md written; lane-events.log line

## Contradiction candidates (file:§ → claim)

## 2026-09-25 seat restart (Fable 5.1). Prior checklist above was empty; reusing this file as working notes.

### ftg-posts-a.md — READ IN FULL (1033 lines) 2026-09-25
Cross-check hooks:
- a§2.5 pipeline: content phase (people/factions → buildings → districts) then map; "factions generated before buildings are placed" (84680671 comments)
- a§2.8 OLD district algo (84680671): group by lifestyle → "At this point, the road network is generated" → claim lot → adjacent lot → new district elsewhere
- a§2.9 NEW: overall district + sub-districts; empty-space backfill invents buildings (+people)
- a§2.14 walls: "Estimate percentage of buildings within wall" rows 20/60; two rings [SHOWN 84680671 img 13/22]
- a§2.15 water: rivers bridgeable, oceans not; "Required distance between bridges" = 100 (units unknown, a§6.12)
- a§2.16 Size = "Town (~4000 people)"; raw resources list of 14
- a§2.17 7-day week, hour granularity; schedules lazy per job; 5%/5%/20%
- a§2.22 GeoJSON/SVG [NAMED-ONLY]; NO seed model ("deepest divergence")
- a§2.23 8% faster (91451446)
- a§3.2 palette hex by eye; fixed top-left light; drop shadow down-right
- a§3.3 lot→plot→building [INFERRED]; burgage strips; dense regime = recursive band split
- a§6.1 road network generation "never described" (in this slice)
- a§6.21 determinism: no seed anywhere

### ftg-posts-b.md — READ IN FULL (1010 lines) 2026-09-25
Cross-check hooks:
- b§T-03 max 50k (premium) / 25k free; prior cap 10k; Custom slider (18000 shown)
- b§T-04 site = static files, no server (Next.js rejected); reader's note: generation server-side, render client-side → CHECK vs payload-visual/docs on "server-side"
- b§T-10 snapping distance 11 (world units [INFERRED])
- b§T-11 river path tool: width 125, smoothness 3; red circle exclusion; units unknown
- b§T-14 coloured squares on 2-D maps = MARKET STALLS (3-D image 106664214/09) → CHECK vs a§2.13 "squalid districts as tents, saturated colours" (a says FLEASTEAD tents [INFERRED]); b§3 says market stalls are "the only saturated colour on the map"
- b§T-15 heightmap shelved; Perlin/simplex named, neither committed
- b§T-18 scale bug 3× (x/y not 1:1 metres; z was); scale bars 20m / 250m
- b§T-19 V1 pipeline (106664214): people+buildings → districts grouped → roads until lot area → districts claim lots; districts grouped BEFORE roads
- b§T-20 V1 roads: proposal queue, straight + L/R right angles; 2 phases (dense inner, outer)
- b§T-21 V2 (112861635): initial junction 3/4/5-way; phases {ends-in-wall, wiggliness, branching strategy, building placement}; "3 different algorithms" tried
- b§T-22 V2 plan (106664214) + shipped (120828892): large district lots → landmarks → divide → remaining buildings; ~800 files/70k lines; ~10% faster
- b§T-23 suburbs: ribbons, buildings without surrounding roads; "changes how hamlets & villages are generated"
- b§T-24 "gaps" default outside centre
- b§T-26 walls: stone default; scalable towers; split across rivers; phase terminator; ring road inside wall [SHOWN]
- b§T-31 custom calendar (Mar 2025): hours/day, days/week, rest days → ladder vs a§2.17 hard-coded 7 days (2023)
- b§T-33 GeoJSON omits districts (Jan 2025); CSV people; PNG; JSON building export ≠ edit request format
- b§3 palette: dense core ground mid-brown ≈#7a5a45 vs a§3.2 urban ground beige ≈#DCD6CA (era difference? check payload-visual)
- b§6.1 V2 subdivision unknown → docs slice

### ftg-posts-c.md — READ IN FULL (1001 lines) 2026-09-25
Cross-check hooks:
- c§2.1 July 2025 (133016301): recursive random-cut subdivision; OLD cut = longest edge ⟂ from midpoint; NEW = edge nearest centroid, cut through centroid; reflex-corner pre-cut; narrow/sharp filters
- c§2.2 July 2026 (164816716): 3-step bend algorithm replaced by shrink-then-split (inset ring = blocking edges)
- c§2.3 castle only for king/queen feudal govt; 10-step pipeline
- c§2.4 effects; Three.js EffectComposer [INFERRED]; render settings client-side cookies; "Flattened 3D" roofs
- c§2.5 forests: tree-area shape filled at render; 50k trees ≈ 1MB; >50k trees framerate
- c§2.6 farmland modes 'Around perimeter' (default hamlets) / 'Farmsteads' (renamed old)
- c§2.8 perimeter expanded+rounded AFTER suburbs
- c§2.9 hour granularity; weather matrix; seasons
- c§2.13 ocean vs river: border-contact heuristic; render on demand, no animation
- c§2.14 road network = graph (fill tool); duplicate-intersection bug (Mar 2026)
- c§2.19 grid 2 m / 5 ft; scale bar 100m
- c§2.21 protobuf; int32→sint32; map centred 0,0; "positions are integers" → CHECK vs payload-visual units
- c§2.22 person types Unemployed|Delegating|Working|Studying|Retired; residential district order: largest pop first = closest to centre (157283634)
- c§5 PIPELINE ORDER: layout first, water second, people step 8 ← refuted by critic C12; verify the "first stage of generation (layout settings)" comment in 144226579
- c§3 palette: grass ≈#a8c08a, buildings ≈#6b5240; roads cream/white fill, light-grey casing (vs b§3 body #cfc8bd + centre stripe; vs a§3.2 cream #E3DED0)
- c§7.18 generation server-side; no generation-time figure
- c§2.12 coast = 2 arms; island = 1 arm

### ftg-docs-params.md — READ IN FULL (630 lines) 2026-09-25
Cross-check hooks:
- d§0.1 units: GeoJSON 1 unit = 1 m [STATED]; wire = cm [INFERRED] from "vertex coordinates spanning 101..500000" for CITY width 5000 m → CONTRADICTS c§2.21 "map centred around 0,0, half the numbers negative" [STATED by Thomas] UNLESS the 101..500000 is the ZIG-ZAG (sint32) encoding of −250000..250000 → TEST ON PAYLOAD (task 4)
- d§1.1 capture stage values: roadLength 50/60/30 m; angles 15; branch segs 4/3; minDistrictArea 100000/70000 m²; spokeStaySpoke 0.5/0.1; suburb density 0.8, offshoot 1..2, branch prob 0.75, spokePriorityChange 1, perimeterSpokeDistanceMultiplier 5
- d§1.2 stage percentages 0.2/0.5 → suburb 0.3 remainder; default form 50/50; minDistrictArea default-form 25000
- d§2.2 priority queue: lowest priority first; offset roads +1; main spoke +spokePriorityChange
- d§2.3 stage boundaries: prune unconnected normal roads; trim main roads to perimeter
- d§2.5 district decided when lot created; landmarks → divide (to 10000 m² default) → place → decorate; merge if < minDistrictArea; shanty after first half; residentialDistrictOrder MOST_POPULOUS
- d§2.6 Dense/Gaps/Individually placed; modifiers Small tents/Smaller(½)/Bigger(2×)
- d§2.9 roof modes Flat / Flat-roof-texture / 3D roofs / Flattened 3D; layer order background,water,below road,above road; decoration areas filled at render
- d§3.1 sizes: HAMLET 90/1500 … TOWN 3625/3500 … CITY 9500/5000 … METROPOLIS 49500/6000
- d§3.9 military 0.0067; religion 0.01; feudal titles → castle/keep/manor
- d§3.10 calendar 24 h; payload 9-day week; person types incl Studying; Delegating = babies w/ caregiver
- d§4.1 minDistanceBetweenBridges 40 (capture; manual default 40.00) vs a§2.15 = 100 (Dec 2022) → ladder
- d§4.2 coast two arms; overall shape / detail shape / ease-into-detail
- d§4.5 river width 40→75, smoothness 0→3 (vs b§T-11 125 / 3); snapping distance 5.00→15.2 "metres" (vs b§T-10 = 11 world units [INFERRED]) → check doc page wording
- d§4.6 farmland: Default/Farmsteads/Around perimeter/Around rivers (vs c§2.6 two named modes + desert rule) → ladder
- d§4.10 shanty town: tents INDIVIDUALLY_PLACED, saturated colours (bd9f407300.png) → supports a§2.13; vs b§T-14/§3 "market stalls … only saturated colour" → RECONCILE
- d§5.7 CITY generation wallMs ≈ 300 s (steps.jsonl) → vs c§7.18 "no generation-time figure"; check payload-visual perf
- d§2.1 payload: 5326 edges, 4303 vertices, 14 edge types → re-derive
- d§5.14 seed null

### 2026-09-25 DONE. Output: research/findings/_critic-ftg.md (§0–§6). Addenda appended to all five FTG files. Scripts/outputs: research/ftg-capture/critic2/. Lane event logged.
Key ruling: payload coordinates are zig-zag sint32 (centred, ±2500 m); ftg-payload-visual §5 lengths ×½, areas ×¼; district rings simple; edge types 3 = border, 12 = piers, 14 = water outline; roadLength halving OPEN.
