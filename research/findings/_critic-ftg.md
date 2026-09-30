# _critic-ftg — second critic seat, restricted to the five FTG findings files

Seat run 2026-09-25 (Claude Fable 5.1) over `ftg-posts-a.md`, `ftg-posts-b.md`, `ftg-posts-c.md`,
`ftg-docs-params.md`, `ftg-payload-visual.md`, answering `_critic.md` §0 / §6.9 ("a second critic seat restricted
to the FTG trio"). Clean-room: no captured JavaScript bundle was opened; the protobuf payload was read only through
`tools/pb_raw.py`. Nothing outside `/Users/cstokes/Desktop/Maps` was consulted. Working notes:
`research/findings/_workflow-results/critic-ftg-notes.md`. Re-derivation scripts and their outputs are saved under
`research/ftg-capture/critic2/` (stdlib + PIL only).

**Headline ruling (changes what a designer would believe).** The captured settlement payload stores coordinates as
protobuf `sint32` (zig-zag), exactly as the creator states in post 164816716 (`ftg-posts-c.md` §2.21): the map is
centred on (0,0) and spans ±2500 m. `ftg-payload-visual.md` §2 decoded the varints as unsigned, which folds all four
quadrants onto one and doubles every coordinate. Consequently **every length in `ftg-payload-visual.md` §5 is 2× too
large and every area 4× too large**, the "self-intersecting district ring", "duplicate ring vertices" and "building
outside the extent" hazards are decoding artefacts, `+y` is north (not south), the "field-boundary lattice" edge type
is the water outline, the "outer world roads" edge type is the map border, and the missing piers are edge type 12.
FTG's buildings are ~10 m × 10 m (median footprint 103 m²), not 23 × 19 m. Details in §1 (F1–F13) and §4.

## 0. What this seat did and did not do (read this first)

* **Read cover to cover, every line:** `ftg-posts-a.md` (1033 lines), `ftg-posts-b.md` (1010), `ftg-posts-c.md`
  (1001), `ftg-docs-params.md` (630), `ftg-payload-visual.md` (990, including the 2026-09-21 critic addendum) —
  ≈ 380 KB, read in 250-line ranges. Also read in full: `_critic.md` §0, §1.1–1.2, §2, §3, §4, §5, §6;
  `research/ftg-capture/analyse_layout.py`, `probe_layout.py`, `layout-structure.md`; `tools/pb_raw.py`.
* **Raw sources opened for spot-checks (§3):** 20 of the 30 FTG `post.md` files (91451446, 84680671, 75844005,
  93999105, 95869798, 99652534, 106664214, 112861635, 120828892, 123982784, 127128581, 130937474, 133016301,
  137812814, 144226579, 147332188, 153121107, 157283634, 159738553, 164816716) by grep + line print; 13 guide pages
  (`useSettlements__export`, `createSettlement__algorithm`, `__settlement_layout`, `__districts`,
  `__dependency_graph`, `__water`, `__overview`, `editSettlement__map`, `__regenerate_area`, `__people`,
  `useSettlements__settings`, `__map`, `__simulation`); `create-request.json` and `presets.json` traversed
  programmatically; the Foundry module `README.md`.
* **Payload:** the whole `intercept-0018-b39aab95.bin` decoded twice (zig-zag and raw) with
  `research/ftg-capture/critic2/zigzag_rederive.py` and four follow-up probes; two renders of the decoded map
  (`critic2/map_zigzag.png`, `map_zigzag_centre.png`) compared by eye with `captures/ftg/2026-09-21T05-23-58/steps/
  001-load-settlement.png` and `007-building-level.png`; both scale bars measured in pixels (295 px = 500 m; 134 px =
  100 m).
* **Images opened:** the two screenshots above and `research/patreon/ftg/106664214/images/09.png` (the "market
  stalls" 3-D shot). **Not opened:** any other post or guide image (the readers' [SHOWN] descriptions were taken on
  trust unless a contradiction depended on them), the `.cpuprofile` files, the GIFs.
* **Not done:** no new FTG capture; no GeoJSON export exists in the corpus, so the "1 unit = 1 metre" export claim
  could not be tested against the wire format; the ten oldest posts (65223067 … 88558259 except those listed) were
  checked only through `_critic.md` §4 #14 and the quotes already verified there.
* **Method for contradictions (§1):** every cross-file hook was written down while reading (notes file), then each
  was tested against the raw source or the payload. The verdict vocabulary is `_critic.md`'s: RESOLVED (one side
  refuted by evidence in the corpus), RECONCILED (both right about different versions/aspects), OPEN.

## 1. Contradictions among the five FTG files (and against `_critic.md` C12)

| # | subject | file A says | file B says | verdict |
|---|---|---|---|---|
| F1 | **wire coordinate convention** | `ftg-payload-visual.md` §2: "All positions are unsigned integer varints … 0..500000 in both axes"; field 5 = "map corner ring, 5 corner points at 499999/500000"; "+y is south-ish on screen". `ftg-docs-params.md` §0.1 `[INFERRED]`: "vertex coordinates spanning 101..500000 … persisted protobuf = integer centimetres" | `ftg-posts-c.md` §2.21 `[STATED]` (164816716, verified verbatim): "the FTG map is centered around 0,0, roughly half of those numbers are negative. Switching to the sint32 type" | **RESOLVED against A.** The coordinates are zig-zag `sint32`. Proof executed on the payload: field 5 decodes to `(250000,250000) (250000,−250000) (−250000,−250000) (−250000,250000) (250000,250000)` — a perfect closed ±2500 m square (unsigned, it is five points 1 cm apart in one corner); field 22.5 `[12,14]` decodes to `[6,7]` = the request's `restDaysInWeek`; all four district rings become simple polygons; the decoded map (`critic2/map_zigzag.png`) reproduces the screenshot (sea west, NW–SE coast, harbour on the waterfront district, river forking from the NE), the folded one (`map_raw_folded.png`) does not. Axis: `+x` east, `+y` north (district label anchors Greenwood (−475, 418) top-left, Ticwick (24, 178) centre, Ashton (77, −237) bottom-right, as on screen). 1 unit = 1 cm still holds (±250000 = the CITY width of 5000 m). |
| F2 | **absolute scale of every measured length/area** | `ftg-payload-visual.md` §2 "CONFIRMED three ways", §5: roadLength modes 50.5/60/29.4 m, buildings OBB 22.98 × 18.82 m, footprint mean 434 m², blocks 1764 m², roads 361 km, fields ~10 ha, forests 7.27/6.35 km², water resampled at 100 m, towers 38–101 m apart, "FTG's building is a large compound structure (~20 × 20 m, ~400 m²)" | `ftg-posts-b.md` §T-18 `[STATED]`: after the 3× scale bug the creator "did more research with real world buildings … and updated the generation parameters"; `ftg-docs-params.md` §3.1 CITY width 5000 m; the on-screen scale bar | **RESOLVED against A: halve every length, quarter every area.** Within one quadrant the unsigned reading is an exact 2× dilation. Correct values (§4): building footprint median **103 m²**, quad side median **10.3 m**, roads **192 km**, block-lot median **441 m²**, water step **50 m**, tower spacing median **39 m**, forests 1.82/1.59 km², fields ~2.5 ha. Independent check: the decoded distance between the Ticwick and Greenwood label anchors is 554 m; on `001-load-settlement.png` the two labels are 327 px apart at 295 px = 500 m → 554 m; the folded reading gives 1024 m. The "~27 px ≈ 20 m building" pixel check in A was mis-measured. |
| F3 | **configured `roadLength` vs persisted segment length** | `ftg-payload-visual.md` §2/§5.1: edge-length modes "reproduce" `roadLength` 50/60/30 exactly; `ftg-docs-params.md` §1.3: form label "Road segment length (m)" | measured under correct decoding: type-0 modes **30 m ×481, 15 m ×254, 25 m**; type-4 (suburb) **15 m ×943**; block-lot edges 15 m / 30 m | **OPEN (measurement CONFIRMED, cause not).** Persisted segments are exactly **half** the configured values (60→30, 30→15, 50→25). It is not a collinear midpoint split (only 1 % of type-0 and 19 % of type-4 degree-2 nodes are straight; junction-to-junction runs are mostly single 15/30 m edges), and "branch after N segments" evidently counts these half-length segments (suburb junction spacing modes 15/30/45 m for `minOffshootSectionLength` 1–2). Either the form's "(m)" is a doubled unit or the generator emits `roadLength/2`. A's "reproduces exactly" was the 2× decoding error cancelling this. |
| F4 | **district-ring simplicity** | `ftg-payload-visual.md` §5.7, §9.1–2, §11.12: "Rustic Village's ring is self-intersecting (shoelace 4.47× too small)… a real generator failure mode"; "duplicate consecutive vertices in every district ring (min segment 0.0 m)" | — | **RESOLVED against A.** Decoded correctly, all four rings have **0 self-intersections** (O(n²) test) and areas 9.6 / 8.0 / 10.1 / 4.9 ha; minimum segment 3.3 / 3.9 / 4.3 / 0.87 m. The 0.0 m segments were the ring-closure vertex (first == last) counted as a segment by `analyse_layout.py`. Retract the even-odd-fill advice. |
| F5 | **buildings outside the declared extent** | `ftg-payload-visual.md` §5.8/§9.4: centroid at y = −39 m "outside the declared 0..5000 extent … placed without clamping" | — | **RESOLVED against A.** Folding artefact; decoded centroid bbox x −1952..1577 m, y −776..2259 m, all inside ±2500 m; centre of mass (4, 212) m ≈ the map centre. |
| F6 | **`minDistrictArea` units and semantics** | `ftg-payload-visual.md` §4.1/§6: "`minDistrictArea` (100000 then 70000 cm² = 10 ha then 7 ha) is the area threshold at which a district gets split off" | `ftg-docs-params.md` §1.3 `[STATED]` (`createSettlement__settlement_layout.md` L144, verified): "Minimum district area (m²)… If a district lot is created with an area less than this, it will be merged into an adjacent district" | **RESOLVED for B.** 100000 cm² would be 10 m²; the value is 100000 m² = 10 ha, and it is a *merge* floor, not a split trigger. Caution: the decoded rings are 9.6/8.0/10.1/**4.9** ha, i.e. smaller than the stage minima — rings hug the built area, so ring area ≠ district-lot area. |
| F7 | **`verticalBranchSegments` / `horizontalBranchSegments`** | `ftg-payload-visual.md` §4.1: "the number of cross-street segments generated per branch — a rectangular sub-lattice grown off each spoke" | `ftg-docs-params.md` §1.3 `[STATED]` (L131–132, verified): "How many segments of a road to create before proposing a left and right branch" | **RESOLVED for B** (segments *before* a branch, not per branch). |
| F8 | **`spokeStaySpokeProbability`** | `ftg-payload-visual.md` §4.1: "at each step it either remains a spoke or demotes to a normal road" | `ftg-docs-params.md` §1.3 `[STATED]`: "chance of creating a new main road when branching from an existing main road" | **RESOLVED for B** (P(branch of a spoke is itself a spoke)). |
| F9 | **edge type 14** | `ftg-payload-visual.md` §5.1/§6.11: "field-boundary / hedgerow lattice — 100 m segments, near-zero curvature" | `ftg-docs-params.md` §2.1 (docs: roads "don't end in bodies of water"; an `Invisible` edge type exists; §2.7 suburb lots "make some of the lot edges invisible") | **RESOLVED by measurement: type 14 = water-outline edges.** 340/348 type-14 edges have an endpoint on a water-polygon vertex; 122 lie on the river outlines (99 with both endpoints exact river vertices), 106 within 3 m of the coast, 120 double as lot edges (lots bounded by water); their 50 m modes are the water resampling step. The road graph carries the shoreline as (invisible) edges so lot detection treats water as a boundary. |
| F10 | **edge type 3** | `ftg-payload-visual.md` §5.1: "outer world roads leaving the map (max 3544 m)" | — | **RESOLVED by measurement: type 3 = the map border.** The 14 edges are the four sides of the ±2500 m square (one is exactly (−2500,−2500)–(−2500,2500) = 5000 m), split where rivers and the coast reach the edge. |
| F11 | **where the piers are** | `ftg-payload-visual.md` §11.2: "~14 uniform pier bars are clearly drawn, but no field in the payload has 14 harbour-local geometries … Unresolved" | `ftg-docs-params.md` §4.3 `[SHOWN]`: pier option "No branches": "evenly spaced straight jetties ⟂ to the quay, identical length" | **RESOLVED: edge type 12 = the piers.** 12 edges, every one 75.6 m, parallel, 15 m apart, all inside the harbour basin bbox (x −324..−136, y −34..174 m); "~14" was a miscount from the render. |
| F12 | **calendar fields 22.2 / 22.5** | `ftg-docs-params.md` §3.10: "the payload shows a settlement with a **9-day week** configured, `layout-structure.md` 22.2"; `ftg-payload-visual.md` §3.1: 22.5 `[12,14]` vs `restDaysInWeek [6,7]` "unexplained … [NAMED-ONLY]" | `ftg-payload-visual.md` §3.1: 22.2 = 9 "(start hour)"; 22.4 = 7 weekday names; screenshot clock "9:00 Monday" | **RESOLVED against docs-params on the 9-day week** (22.4 has exactly seven names; 22.2 = 9 is the current hour, 22.1 = "Monday" the current day) **and RESOLVED for 22.5** (zig-zag → `[6,7]`). |
| F13 | **blocks and packing** | `ftg-payload-visual.md` §5.3/§6.5: "Blocks contain mean 3.39 buildings … 116/901 (12.9 %) empty … ~57 % block coverage"; probe printed 3052 buildings inside blocks (> 2798 exist) | — | **RESOLVED against A.** Decoded: group-18 lots hold **1.52 buildings each**, **206/901 (22.9 %) are empty**, 271 m² of lot per building against a 103 m² footprint (**38 %**); only **1487/2798 (53 %)** of buildings lie inside *any* serialised lot polygon (group 18: 1362, plazas: 115, group 2: 10) — district-stage lots are not serialised as lot polygons. The "3052" was folded polygons capturing buildings from other quadrants. |
| F14 | **pipeline order** | `ftg-posts-c.md` §5: "1. Layout stage … 2. Water … 8. People"; `ftg-payload-visual.md` §6: landscape incl. forests first, function assignment step 10, populate step 13 | `ftg-posts-a.md` §2.5, `ftg-posts-b.md` §T-19/§4.1, `ftg-docs-params.md` §0.2 `[STATED]` (91451446 L23–27, 127128581 L111, `createSettlement__algorithm.md` L8/L80/L127 — all verified) | **RESOLVED for B — `_critic.md` C12 upheld, with the cause found.** `ftg-posts-c.md` §5 step 1 rests on the 144226579 comment "If you set the **first stage of generation (layout settings)** to be large enough, the castle will be generated within the **first ring**" (L141, verified): "first stage" there is the first *layout stage* of the `stages[]` table (its lots form the first ring), not the first phase of generation. `ftg-payload-visual.md` §6 puts forests in step 2; the docs put farms/forests in the last map step ("Outer settlement"), and function assignment is phase 1. |
| F15 | **wall geometry** | `ftg-posts-a.md` §2.14 `[INFERRED]`: "convex-hull-then-simplify … over the built-up plot centroids"; "does not follow the ragged lot boundary"; towers "at most direction changes"; the 2023 UI "Estimate percentage of buildings within wall" 20/60 | `ftg-docs-params.md` §1.3 `[STATED]`: `placeWallAfter` per stage, `wallPlacement` `Around all lots`/`Around stage lots`; `ftg-payload-visual.md` §5.5: all 17 towers are vertices of the Beer Forest district ring (re-verified: 17/17) | **RECONCILED by version, RESOLVED against the hull for the current build.** The 2023 percentage rows are the ancestors of `stages[].proportionOfBuildings` + `placeWallAfter` (stage 1 = 20 % of buildings, walled); the wall follows lot/district outlines, tower spacing median 39 m (decoded), open chain 473 m end-to-end from the river bank to the coast. |
| F16 | **the saturated coloured squares** | `ftg-posts-b.md` §T-14/§3: "market stalls … the only saturated colour on the map" (from 106664214/09, which I opened: coloured conical tents beside a grey hipped pavilion) | `ftg-posts-a.md` §2.13 `[STATED]` "squalid districts render like tents"; `ftg-docs-params.md` §4.10 `[STATED]` (`createSettlement__districts.md` L116, verified): "Shanty town districts create dense areas of tents, with dirt backgrounds, dirt roads, and fire pits", `tentPlacement: INDIVIDUALLY_PLACED` | **RECONCILED — two features share the glyph.** Market stalls (market districts) and shanty-town tents (squalid/poor lifestyle only, placed after the first half of the settlement). posts-b's "only saturated colour" describes its own images, which contain no shanty town. |
| F17 | **lot → building subdivision, three descriptions** | `ftg-posts-c.md` §2.1 (July 2025: longest-edge rule replaced by nearest-edge-to-centroid + reflex pre-cut) vs §2.2 (July 2026 describes the replaced algorithm as "pick an outside edge, project ⟂, bend in the middle") vs `ftg-docs-params.md` §2.5 ("Divide lots to area … new roads … splitting the current areas into two") and §2.6 `[INFERRED]` edge-driven strip subdivision; `ftg-posts-a.md` §3.3 `[INFERRED]` burgage strips / recursive band split; `_critic.md` C13 | | **RECONCILED as three levels + two dates.** (i) district lot → block lots by *inserted roads* until < target area (docs, regenerate tool default 10000 m²); (ii) block lot → building plots by recursive random perpendicular cuts (July 2025 proposal rule = which edge; July 2026 projection rule = how far, now stopped by an inset blocking ring); (iii) the 2023 image-based inferences describe the same level (ii) before either rewrite. No file contradicts another once the level is named; a designer must not merge (i) and (ii). |
| F18 | **Delegating person type** | `ftg-posts-a.md` §2.17 `[INFERRED]`: "presumably children/dependants following a parent" | `ftg-docs-params.md` §3.10 `[STATED]` (`editSettlement__people.md` L111–113, verified): "people who cannot be independent (like babies). They need a caregiver to follow at every hour" | **RESOLVED for B** (inference confirmed and narrowed to babies + caregiver). |
| F19 | **required distance between bridges** | `ftg-posts-a.md` §2.15/§6.12: default **100**, "units unknown" (Dec 2022 UI) | `ftg-docs-params.md` §4.1/§4.4: capture **40**, manual-draw default 40.00, "(in meters)" (`createSettlement__water.md` L209/L239, verified) | **RECONCILED by version** (default changed 100 → 40); the unit question is answered: metres. |
| F20 | **static site vs server-side generation** | `ftg-posts-b.md` §T-04: "deployed as static files, no server" | `ftg-payload-visual.md` §1: "Generation is entirely server-side" (~300 s wall, client busy 4.6 s); `ftg-posts-c.md` §2.21 server-hosted protobuf | **RECONCILED** (B's own note already says so): static front-end + generation/storage API. `ftg-posts-c.md` §7.18 "no generation-time figure appears" is answered by pv §1: ≈ 300 s for a CITY. |
| F21 | **farmland modes** | `ftg-posts-c.md` §2.6: two named modes ('Farmsteads', 'Around perimeter') + a desert rule "around rivers if a river is present" (Jan 2026) | `ftg-docs-params.md` §4.6 `[STATED]` (`createSettlement__overview.md` L115–122, verified): `Default / Farmsteads / Around perimeter / Around rivers` | **RECONCILED by version** (the desert rule became the fourth option). |
| F22 | **calendar length** | `ftg-posts-a.md` §2.17: week "hard-coded to 7 days" (2023) | `ftg-posts-b.md` §T-31 / `ftg-docs-params.md` §3.10: configurable hours/day, days/week, rest days (2025+) | **RECONCILED by version** (not a contradiction; keep as ladder). |
| F23 | **person types** | `ftg-posts-a.md` §2.21: working / unemployed / retired / delegating | `ftg-posts-c.md` §2.22, `ftg-docs-params.md` §3.10: + **Studying** | **RECONCILED by version.** |
| F24 | **raw-resource vocabulary** | `ftg-posts-a.md` §2.16: 14-item 2022 checklist incl. **Gems** | `ftg-docs-params.md` §3.4: 13-value `requiresRawResources` vocabulary (no GEMS) | **RECONCILED**: in `presets.json` GEMS is a *produced* resource (`JEWELER`/`JEWELLERY_SHOP` provide it, `ARTIFICER` uses it), gated through ORE/mines; the 2022 UI exposed it as raw. |
| F25 | **palette values** | `ftg-posts-a.md` §3.2 (2023: beige core ≈#DCD6CA, roof ≈#5F4038), `ftg-posts-b.md` §3 (2025: core ≈#7a5a45, roof ≈#5b4032), `ftg-posts-c.md` §3 (2026: ≈#6b5240) | `ftg-payload-visual.md` §8.1 (Sept 2026 render, sampled: wood ≈#81695b, grass ≈#a4c28e, paving ≈#c6c2bb) | **RECONCILED as an era ladder**; all are by-eye estimates of lit vs shaded faces. Use pv §8.1 for the current look. |
| F26 | **GeoJSON contents** | `ftg-posts-b.md` §T-33: districts missing from GeoJSON (Jan 2025, "added to the to-do list") | `ftg-docs-params.md` §2.9: GeoJSON = "backgrounds, edges, buildings, and their outlines" (`useSettlements__export.md` L23, verified) | **Consistent — still open in the product** (the 2026-09 guide lists no districts). |
| F27 | **performance ladder** | a §2.23 (Oct 2023 gen ~8 % faster; Dec 2023 file −5 %, gen +5 %, sim +20 %), b §T-34 (Jan 2025 gen ~10 % faster), c §2.21 (Jul 2026 sim +10 %, file −5 %; Mar 2026 metropolis load 20 s → 10 s; May 2026 download −50 %) | `ftg-docs-params.md` §5.7 / `ftg-payload-visual.md` §1: CITY generation ≈ 300 s server-side (Sept 2026) | **RECONCILED (ladder)**; all figures verified at source (§3). |

**Evolution over time that is NOT a contradiction (version ladder to keep):** road hierarchy (2022 Small/Large road → 2026 Road/Main road/Small road/Dirt road/Invisible + walls/fences; 14 wire edge types of which 0/1/2/10 streets, 4 suburb, 6 rural lanes, 7 minor, 12 piers, 14 water outline, 3 map border are now identified); district model (2023 lifestyle groups → 2023-06 overall + sub-districts with backfill → 2025-01 V2 large district lots typed from the remaining pool → 2026-05 residential order configurable, districts drawn not lot-picked); road growth (V1 orthogonal proposal queue from a 4-way crossroad → V2 staged spokes with `branchType`, `initialRoadsType` 7 values, suburb offshoots with priority queue); lots (2023 image-inferred strips → 2025-07 centroid cut rule → 2026-07 shrink-then-split); walls (2023 % of buildings checkpoints → 2025 per-stage `placeWallAfter` + `wallPlacement`, stone default, scalable towers, split across rivers → 2025-08 castle walls); water (2022 manual drawing, bridge distance 100 → 2024-05 path tool width/smoothness → 2025-06 coast decoration + harbours → 2026-03 islands, depth/foam, ponds → 2026-05 compass direction, bridge distance 40); farms/forests (2022 overhaul → 2025-11 tree areas, 'Around perimeter'/'Farmsteads' → 2026-01 climates, outside decorations → docs: four farm layouts, reserved natural area); simulation (2023 7-day week, hour quantum → 2025-03 custom calendar → 2026-01 day/night from sim state); export (GeoJSON/SVG 2023 → PNG/CSV/JSON → settings file 2025; districts still absent from GeoJSON); size cap (10 000 → 50 000, 2024-03); render (rect roof texture → 2024-05 straight-skeleton roofs, 3-D → 2025-08 post-process effects → 2026-03 on-demand rendering stated).

## 2. `[NAMED-ONLY]` / low-confidence FTG items that another available source resolves

| where flagged | item | resolving source(s) |
|---|---|---|
| `ftg-payload-visual.md` §2, §11.3 (axis) | is +y north or south? | this seat §1 F1: decoded anchors vs `001-load-settlement.png` → **+x east, +y north** |
| `ftg-payload-visual.md` §3.1 (field 22.5 `[NAMED-ONLY]`) | `[12,14]` vs `restDaysInWeek [6,7]` | zig-zag decode → `[6,7]` (F12) |
| `ftg-payload-visual.md` §11.2 | where are the piers | edge type 12 (F11) |
| `ftg-payload-visual.md` §5.1 (types 3, 14 `[INFERRED]`) | what edge types 3 and 14 are | map border; water outline (F9, F10) |
| `ftg-payload-visual.md` §11.9 | which building types render stone | `ftg-docs-params.md` §1.2 `[STATED]` "temples will always be stone brick" (`createSettlement__settlement_layout.md` L55) + per-district/per-building material overrides |
| `ftg-payload-visual.md` §11.11 | `initialRoadsType` alternatives | `ftg-docs-params.md` §1.2: 7 values (Random, Dead-end, Single through-road, Three/Four/Five/Six-way crossroad) + `Ringed` presets; `ftg-posts-b.md` §T-21 |
| `ftg-payload-visual.md` §5.6 (`11.9.3.2` f32 = "scale") | meaning of the f32 on forest polygons | `ftg-docs-params.md` §2.9/§4.7 `[STATED]`: decoration *areas* are "shape + density", filled at render; `forestTreesMultiplier = 1` in the request → the f32 is the density multiplier |
| `ftg-payload-visual.md` §6 step 12 (trees lumped) | which trees are persisted | `ftg-posts-c.md` §2.5 `[STATED]` (144226579 L35): forest trees are not persisted — the 4125 instances are individual trees (hedgerows, suburbs, scatter) |
| `ftg-posts-a.md` §2.22 (`[NAMED-ONLY]` GeoJSON / SVG) | export schema/units | `ftg-docs-params.md` §2.9 (`useSettlements__export.md`: GeoJSON backgrounds/edges/buildings/outlines, 1 unit = 1 m; SVG simplified trees); `ftg-posts-b.md` §T-33 (districts absent) |
| `ftg-posts-a.md` §2.15/§6.12 | units of "Required distance between bridges", coordinate system | metres (`createSettlement__water.md` L209); wire = cm, centred (F1) |
| `ftg-posts-a.md` §2.1 (single segments or polylines?) | road record shape | payload: 62 % degree-2 nodes, "road" = chain of 15–30 m edges; docs §1.3 "A road segment is a line with a start and an end" |
| `ftg-posts-a.md` §6.1 (road network generation "never described") | growth model | `ftg-docs-params.md` §2.2–2.4 (priority queue, legality, stage boundaries, branch types), `ftg-posts-b.md` §T-20/T-21 |
| `ftg-posts-a.md` §6.3, §6.4 (lot→plot, footprints) | subdivision | `ftg-posts-c.md` §2.1–2.2; `ftg-docs-params.md` §2.5–2.6 (F17) |
| `ftg-posts-a.md` §6.5 ("Can merge when") | district merging | `ftg-docs-params.md` §1.3 `minDistrictArea` merge rule (partial — the 2023 enum is gone) |
| `ftg-posts-a.md` §6.6 (dense/sparse phases) | placement phases | `ftg-docs-params.md` §1.1–1.3: ordered `stages[]` with `buildingPlacement` DENSE/GAPS/INDIVIDUALLY_PLACED + suburb stage |
| `ftg-posts-a.md` §6.7 ("building modifier") | modifier enum | `ftg-docs-params.md` §2.6 `[STATED]`: None / Small tents / Smaller (½) / Bigger (2×) |
| `ftg-posts-a.md` §6.8 (wall geometry) | wall rule | F15 |
| `ftg-posts-a.md` §6.9–6.11 (farmland, forests, generated water) | methods | `ftg-docs-params.md` §2.8, §4.2, §4.4, §4.6, §4.7; `ftg-posts-c.md` §2.5, §2.6, §2.12–2.13 |
| `ftg-posts-a.md` §6.13–6.14 (dependency evaluation order, `Dependency type` enum) | model | `ftg-docs-params.md` §3.3 `[STATED]` (virtual-population loop; `oneBuildingForNumberOfPeople` / `perOtherBuildingConfig`; `alwaysPlaceWorkplace`) |
| `ftg-posts-a.md` §6.17 (name erosion) | mechanism | `ftg-posts-c.md` §2.17 (syllable-budgeted name parts) + payload 10.2/10.3 pairs (Rustic Village→Ticwick, Ash Town→Ashton, Green Wood→Greenwood) |
| `ftg-posts-a.md` §6.19–6.21 (renderer, where computed, determinism) | | `ftg-payload-visual.md` §1 (Three.js, server-side ≈ 300 s); `ftg-docs-params.md` §5.14 (`seed: null`); `ftg-posts-c.md` §2.4 |
| `ftg-posts-a.md` §6.22 (tick semantics) | | `ftg-posts-b.md` §T-08 (schedule = deterministic query per hour), §T-31; `ftg-docs-params.md` §3.10 |
| `ftg-posts-b.md` §T-10 (snapping distance "11 world units" `[INFERRED]`) | unit | still not stated anywhere (the guide's `editSettlement__map.md` names snapping but no unit; `ftg-docs-params.md` §4.5's "metres" is itself an inference) — **remains open**, but all other lengths in the form are metres |
| `ftg-posts-b.md` §T-11 (river width 125, units) | unit | `createSettlement__water.md` L205 "(in meters)" |
| `ftg-posts-b.md` §T-12 (brush distributions `[NAMED-ONLY]`) | tree placement statistics | `ftg-payload-visual.md` §5.6 (no minimum distance, round-robin sprites) — for *generated* individual trees; brushes still unmeasured |
| `ftg-posts-b.md` §T-15/§6.12 (height maps) | status | `ftg-posts-c.md` §6 comments (2026-01, 2026-04): "Mountains aren't properly supported yet" — still shelved |
| `ftg-posts-b.md` §T-20/§6.2 (validity checks) | road legality | `ftg-docs-params.md` §2.1 `[STATED]` (not too close, not ending in water, snap to intersection) — thresholds still unknown |
| `ftg-posts-b.md` §6.3 (wiggliness / branching strategy) | parameters | `ftg-docs-params.md` §1.3 `maxMainRoadAngle`/`maxNormalRoadAngle` (15° cap CONFIRMED on the payload), `branchType` CONTINUE / CURVE_AROUND_ORIGIN |
| `ftg-posts-b.md` §6.4 (phase termination, area budget) | | `ftg-docs-params.md` §1.2 `proportionOfBuildings` per stage, suburb takes the remainder |
| `ftg-posts-b.md` §6.5 (district type selection) | | `ftg-docs-params.md` §2.5 + §3.4 `poolTags` (13 classes ↔ 17 district configs); `ftg-posts-c.md` §2.22 residential order |
| `ftg-posts-b.md` §6.7 (suburb rules) | | `ftg-docs-params.md` §1.4 (offshoot 1–2 segments, branch probabilities 0.75, priority increase 1, perimeter spokes) |
| `ftg-posts-b.md` §6.10 (farmland partition), §6.11 (harbour fitting) | | `ftg-docs-params.md` §2.8 (extend main roads to the border, split to count, cluster similar features), §4.3 (harbour shape carved from the waterfront district; F11 piers) |
| `ftg-posts-b.md` §6.13 (skeleton roofs at render) | | `ftg-docs-params.md` §2.9 `[STATED]` "not stored in the server" |
| `ftg-posts-b.md` §6.16 (sub-location assignment), §6.17 (serialisation) | | `ftg-docs-params.md` §3.10 (per-sub-location limits, guest workers); `ftg-posts-c.md` §2.21 (protobuf; F1) |
| `ftg-posts-c.md` §7.13 ("Reserve natural area") | meaning | `ftg-docs-params.md` §4.7 `[STATED]` (`createSettlement__overview.md` L143) |
| `ftg-posts-c.md` §7.15 (roof modes) | enum | `ftg-docs-params.md` §2.9: Flat / Flat–roof shape texture / 3D roofs / Flattened 3D |
| `ftg-posts-c.md` §7.16 (layout presets) | catalogue | `ftg-docs-params.md` §1.2: Custom, Medieval europe, Medieval europe (more twisty), American, Ringed, Ringed (no suburbs) |
| `ftg-posts-c.md` §7.18 (generation time) | | `ftg-payload-visual.md` §1: ≈ 300 s for a CITY, server-side |
| `ftg-posts-c.md` §7.20 (tree-area holes) | | payload 11.9.3: two forest outlines (61 and 179 vertices, no hole rings); the island-lake look must be water drawn above forest (docs layer order) — partial |
| `ftg-posts-c.md` §7.21 (Delegating), §7.22 (supply chain) | | F18; `ftg-docs-params.md` §3.3–3.4 (80-node dependency graph, 209 buildings) |
| `ftg-docs-params.md` §0.1 (wire = cm `[INFERRED]`, 0..500000) | | F1: cm confirmed, but signed and centred |
| `ftg-docs-params.md` open-q 10 (castle moat/cliff null) | | `ftg-posts-c.md` §2.3 (already noted by `_critic.md` §3) |
| `ftg-docs-params.md` open-q 14 (seeding) | | `ftg-posts-a.md` §2.22 (no seed model in the product's design); `ftg-posts-c.md` §2.5 (render-time fills) — determinism remains untested |

## 3. Spot-checks of `[STATED]` claims against the cited source

Method: open the cited `post.md` / guide page / JSON, grep the quoted words, print the line. 37 checks across the five
files: **35 SUPPORTED, 0 UNSUPPORTED, 2 WORDING** (tag or reading corrections, no fact refuted).

| # | findings file § | claim | source opened | verdict |
|---|---|---|---|---|
| 1 | `ftg-posts-a` §2.5 | "split into two main steps: 1. Generating the settlement … 2. Generating the map" | `ftg/91451446/post.md` L23–27 | SUPPORTED |
| 2 | `ftg-posts-a` §2.6 | "1 tailor, 3 weavers, and 6 farms per 100 people"; generation "about 8% faster" | 91451446 L48, L92 | SUPPORTED |
| 3 | `ftg-posts-a` §2.8–2.9 | old algorithm quote ("At this point, the road network is generated … claim a lot … adjacent lot"); "randomly pick buildings to fill in the space" | `ftg/84680671/post.md` L32, L44 | SUPPORTED |
| 4 | `ftg-posts-a` §2.5/§5 | "the factions are generated before buildings are placed" (comment 2023-07-23) | 84680671 L184 | SUPPORTED |
| 5 | `ftg-posts-a` §2.15, §2.4 | "Rivers … can be crossed with a bridge, while oceans cannot be crossed"; "supposed to snap so it splits the existing road in two" | `ftg/75844005/post.md` L53, L84 | SUPPORTED |
| 6 | `ftg-posts-a` §2.17/§2.23 | file ~5 % smaller, generation 5 % faster, simulation 20 % faster | `ftg/93999105/post.md` L51 | SUPPORTED |
| 7 | `ftg-posts-b` §T-01 | family of four = 6 one-to-one relations; relations 30 % → ~10 % of file | `ftg/95869798/post.md` L45 | SUPPORTED |
| 8 | `ftg-posts-b` §T-03 | 50 000 people, "5x more than previously", free up to 25 000 | `ftg/99652534/post.md` L17, L23 | SUPPORTED |
| 9 | `ftg-posts-b` §T-18 | 1:1 scale only on z; buildings "3x bigger"; reliability "regularly give up" | `ftg/106664214/post.md` L71–75 | SUPPORTED (post says "internal users", a typo the file silently corrects to "units") |
| 10 | `ftg-posts-b` §T-19 | the five-line V1 pipeline | 106664214 L83–89 | SUPPORTED |
| 11 | `ftg-posts-b` §T-22/T-24/T-26 | "old algorithm created small lots first … new algorithm creates large district lots, places landmark buildings, then divides"; "Almost 800 files, and 70000 lines"; "~10% faster"; gaps "shrinks the area so buildings aren't touching"; "Scalable wall towers"; "Walls now split across rivers" | `ftg/120828892/post.md` L88–90, L102, L46, L25, L50–51 | SUPPORTED |
| 12 | `ftg-posts-b` §T-23 | "placed without roads around them"; "changes how hamlets & villages are generated"; "grow along the main roads" | 120828892 L21–22, L82 | SUPPORTED |
| 13 | `ftg-posts-b` §T-31 | custom hours in a day / days in a week / rest days; "Respect road settings in inner district lots"; zero-length roads fix | `ftg/123982784/post.md` L34–35, L43–44 | SUPPORTED |
| 14 | `ftg-posts-b` §4.1, §T-31 | "generates the details before the layout … I don't see this ever changing"; Simple Calendar "only updating every hour" | `ftg/127128581/post.md` L111, L66 | SUPPORTED |
| 15 | `ftg-posts-b` §T-28/T-29 | "too close to the ocean edge"; harbours "the most requested feature … created as part of waterfront districts" | `ftg/130937474/post.md` L19, L51 | SUPPORTED |
| 16 | `ftg-posts-c` §2.1 | "repeatly dividing a lot area"; old rule "longest edge … perpendicular … center of the edge"; new rule "edge that is closest to the centroid … cut … through the centroid" | `ftg/133016301/post.md` L35, L37, L45 | SUPPORTED |
| 17 | `ftg-posts-c` §2.2 | the 3-step bend algorithm; "initial split by shrinking the lot, and adding that internal border as blocking edges" | `ftg/164816716/post.md` L37–39, L53 | SUPPORTED |
| 18 | `ftg-posts-c` §2.21 | "saved as a protobuf file … two int32s … map is centered around 0,0 … Switching to the sint32 type"; sim +10 %, file −5 % | 164816716 L27 | SUPPORTED — and independently CONFIRMED on the payload (§4) |
| 19 | `ftg-posts-c` §2.3 | castles only with a king/queen feudal government; wall layout → fit → gatehouse → keep → paths → cliffs/moats → connector road → surround → decorate; park option | `ftg/137812814/post.md` L19, L35 | SUPPORTED |
| 20 | `ftg-posts-c` §2.5, §2.6, §2.8 | >50k trees drops framerate; "50k trees is almost 1MB"; "save a shape which is filled with trees when the map is rendered"; farmstead "driveway"; perimeter "expanded … rounded off" | `ftg/144226579/post.md` L35, L49, L61 | SUPPORTED |
| 21 | `ftg-posts-c` §5 step 1 | "first stage of generation (layout settings) … castle … within the first ring" | 144226579 L141 (comment) | **WORDING / misread**: quote exact, but "first stage" = first layout stage; the file's pipeline order built on it is wrong (F14) |
| 22 | `ftg-posts-c` §2.13, §2.14, §2.12, §2.21 | ocean/river border heuristic; "road network is basically a graph data structure"; islands "only one 'arm', not two"; "only render on demand"; metropolis 10 s vs 20 s | `ftg/153121107/post.md` L71, L39, L59, L75, L90 | SUPPORTED |
| 23 | `ftg-posts-c` §2.22, §2.17, §2.24, §2.21 | largest-population district placed first, closer to centre; syllables ≤ 3 for nicknames; water compass direction, rivers perpendicular; download −50 % | `ftg/157283634/post.md` L43, L19, L27, L53 | SUPPORTED |
| 24 | `ftg-posts-c` §2.19 | 2×2 m / 5×5 ft grid; off > light > dark; lines too thin when zoomed out | `ftg/159738553/post.md` L56, L66 | SUPPORTED |
| 25 | `ftg-posts-c` §2.9–2.11 | "Only buildings that have an awake adult"; desert fields around the perimeter "unless there is a river"; polar "permanently snow"; decorations "no two are alike", connecting paths | `ftg/147332188/post.md` L65, L133, L139, L45 | SUPPORTED |
| 26 | `ftg-docs-params` §0.1 | GeoJSON "1 unit = 1 meter" | `ftg-docs/useSettlements__export.md` L24 | SUPPORTED |
| 27 | `ftg-docs-params` §0.2 | "two phases: the buildings and people, and then drawing the map"; "First, we generate any initial bodies of water"; "Outer settlement" step | `ftg-docs/createSettlement__algorithm.md` L8, L80, L127–134 | SUPPORTED |
| 28 | `ftg-docs-params` §1.3–1.4 | Gaps "and then shrunk"; Individually placed "specific building shapes"; Continue "right angles to the origin road"; Curve "fixed distance away from the center"; "until the desired area for the stage is met"; `nextSegmentPriority = currPriority + mainSpokePriorityIncrease`, "lowest priority will be processed next"; offshoot section length; branch probability | `ftg-docs/createSettlement__settlement_layout.md` L77, L79, L100, L104, L97, L221–223, L208, L212 | SUPPORTED |
| 29 | `ftg-docs-params` §1.3, §2.3 | "Minimum district area … merged into an adjacent district"; "Branch after # of segments: How many segments of a road to create before proposing a left and right branch"; between stages "unconnected normal roads are pruned, and main roads are trimmed" | settlement_layout L144–146, L131–132, L23 | SUPPORTED |
| 30 | `ftg-docs-params` §2.5–2.6 | "divide lots to area determines the maximum area of lots … New roads will be created, splitting the current areas into two"; modifiers Small tents / Smaller (halves) / Bigger (double); "If anywhere in lot is false, buildings will only be placed next to roads" | `ftg-docs/editSettlement__regenerate_area.md` L118–120, L97–101, L103 | SUPPORTED |
| 31 | `ftg-docs-params` §2.5, §4.10 | shanty towns "only be placed after the first half of the settlement"; "dense areas of tents, with dirt backgrounds, dirt roads, and fire pits"; singleton plot decorations "in one of the unused plots" | `ftg-docs/createSettlement__districts.md` L121, L116, L92–112 | SUPPORTED |
| 32 | `ftg-docs-params` §3.3 | "converts both of these nodes into a ratio per person"; "pretend … the population is now 200"; "FTG prioritises minimising the unemployment"; disable "Always place workplace"; "shops will always be placed" | `ftg-docs/createSettlement__dependency_graph.md` L25–43, L53 | SUPPORTED |
| 33 | `ftg-docs-params` §4.2, §4.4 | coast "generated in two arms"; "etches details … bay or a headland"; river branch "connect the two sections to form an island"; "bending back around in to the ocean"; width and bridge distance "(in meters)" | `ftg-docs/createSettlement__water.md` L34, L62–63, L188, L174, L205, L209 | SUPPORTED |
| 34 | `ftg-docs-params` §4.5, §2.1 | "You cannot draw water bodies that intersect with the red circle"; snapping distance "metres"; "Roads can't overlap – they must have properly defined intersections"; "invisible edges help guide the fill features" | grep of all 36 guide pages; `ftg-docs/editSettlement__map.md` L14–15, L21–23 | **WORDING**: the overlap/invisible-edge sentences are SUPPORTED (L21–23, L14–15); the red-circle sentence and the snapping unit are not in any page's prose — they are on-screen text inside the GIFs, so `[SHOWN]` not `[STATED]`, and "metres" for snapping is an inference |
| 35 | `ftg-docs-params` §2.9, §3.10, §4.7, §1.2 | 3D roofs "not stored in the server"; Delegating "cannot be independent (like babies) … caregiver"; "only a few key details are saved per person … locked in"; "Reserving natural landscape"; "temples will always be stone brick" | `useSettlements__map.md` L129–139, `editSettlement__people.md` L111–113, `useSettlements__settings.md` L25–26, `createSettlement__overview.md` L143, settlement_layout L55 | SUPPORTED |
| 36 | `ftg-payload-visual` §4.1, §4.4 | every `layoutParameters` value; the size ladder | `create-request.json`, `presets.json` (programmatic) | SUPPORTED (values identical) |
| 37 | `ftg-payload-visual` §7.2 | unmatched weekday "simulated as an unknown day (which usually means that everyone has a clear schedule)" | `reference/towngenerator-foundrymodule/README.md` L183 | SUPPORTED |

(Two WORDING verdicts: #21 and #34; several rows bundle more than one quoted sentence from the same source line.)

## 4. Payload re-derivations

All executed with `research/ftg-capture/critic2/zigzag_rederive.py` (both decodings, outputs in
`zigzag_rederive.out.txt` / `raw_rederive.out.txt`) and `zigzag_probe_*.py`. "raw" = the reader's unsigned decoding,
reproduced first to make sure the pipeline itself matches; "zz" = zig-zag `sint32`, the correct one (F1).

| # | quantity | `ftg-payload-visual.md` says | raw re-run | **zig-zag (correct)** | verdict |
|---|---|---|---|---|---|
| 1 | edges / nodes / buildings / districts / water bodies / towers / trees | 5326 / 4303 / 2798 / 4 / 4 / 17 / 4125 | same | same | **reproduces** (counts are decoding-invariant) |
| 2 | node degree histogram | 1: 83, 2: 2678, 3: 969, 4: 561, 5: 10, 6: 2 | same | same | **reproduces** |
| 3 | tree sprite variants | 590/590/589×5 round-robin | same | same | **reproduces** |
| 4 | map extent | 0..5000 m, corner ring at one corner | 0..5000 | **−2500..+2500 m, field 5 = the four corners** | does not reproduce (F1) |
| 5 | edge-length modes by type | type 0: 60/29/51 m; type 4: 29–30 m; type 14: 100 m; type 10: 200 m | reproduced | **type 0: 30 ×481, 15 ×254, 25 ×50; type 4: 15 ×943; type 14: 50 ×204; type 10: 100 ×37; type 12: 75.6 ×12** | does not reproduce — all ×½ (F2, F3) |
| 6 | total road length | 361.0 km | 361.0 | **191.9 km** | ×½ |
| 7 | 15° turn cap (types 0/1/2/10) | zero mass at 15–16° | reproduced | **reproduces** (type 0 bins 12°:28, 13°:19, 14°:16, 15°:0, 16°:0) | reproduces (angles are scale-invariant inside a quadrant) |
| 8 | junction arm angle median | 90.02°, 56 % in 80–100° | 90.02 / 56.4 % | **90.02°, 58.2 %** | reproduces |
| 9 | heading spectrum flat | max bin 8.0 % | reproduced | max bin 7.8 % | reproduces |
| 10 | building footprint | mean 433.8 m², median 406, p95 613, max 6399 | reproduced | **mean 110.4, median 102.7, p95 154, max 1600 m²** | ×¼ |
| 11 | quad side length | median 20.66 m (p5 12.0, p95 27.2) | reproduced | **median 10.34 m (p5 6.2, p95 13.6)** | ×½ |
| 12 | quad worst-corner deviation | median 0.91°, p95 27.5°, p99 68.5° | reproduced | **median 0.68°, p95 22.9°, p99 42.2°** | partly (the tail was inflated by folded quads) |
| 13 | landmarks | temples 371/1401/1702/2645 m², market square 102 × 102 m, theatre 123 × 97 m | reproduced | **temples 350/350/426/661 m²; market square 51 × 51 m (1168 m²); theatre 62 × 49 m** | ×¼ |
| 14 | buildings sharing a vertex | 8.6 % (0.5 m tolerance) | 6.4 % exact | **6.4 % exact** | reproduces in kind |
| 15 | entrance geometry | on outline (0.01 m); 4.56 m from road; centroid 5.61 m from road; 82 % of buildings have a vertex within 2 m of a road | reproduced | **on outline (0.003 m); 2.99 m; 6.23 m; vertex→road median 1.99 m, 53 % within 2 m** | qualitative claims reproduce; the 82 % does not |
| 16 | district rings | Rustic Village self-intersecting (4.47×); min segment 0.0 m in every ring; 1983 buildings (71 %) inside rings | reproduced (selfX = 2/1/2/0) | **selfX = 0/0/0/0; areas 9.6/8.0/10.1/4.9 ha; min segment 3.3/3.9/4.3/0.87 m; 1426 buildings (51 %) inside** | does not reproduce (F4) |
| 17 | lots | 901 block lots, median 1764 m²; 3.39 buildings/block, 12.9 % empty; 57 % coverage; fields ~10 ha; forests 7.27/6.35 km² | reproduced | **median 441 m²; 1.52 buildings/lot, 22.9 % empty; 38 % coverage; fields ~2.5 ha; forests 1.82/1.59 km²; 53 % of buildings in any lot** | does not reproduce (F13) |
| 18 | water | 100 m resampling; sea 5.59 km² | reproduced | **50 m steps on all four; sea 11.0 km² (44 % of the map); rivers ≈ 31 m mean width; harbour basin 188 × 208 m** | ×½ / ×¼ |
| 19 | wall towers | open chain, segments 37.9–101 m, median ≈ 75 m; all on the Beer Forest ring | reproduced | **segments 18.9–72 m, median 39 m; 17/17 on the Beer Forest ring; chain 473 m end-to-end (river bank → coast)** | ×½; topology reproduces |
| 20 | trees NN spacing | median 14.14 m, min 0.28 m → not Poisson-disc | reproduced | **median 9.66 m, mean 11.5, min 0.14 m** | ×½; the negative result stands |
| 21 | harbour rubble (11.8) | NN median 3.0 m, bbox 216 × 222 m | reproduced | **NN median 1.5 m, bbox 109 × 159 m at x −327..−218, y −43..116** | ×½ |
| 22 | settlement footprint | CoM (441, 681) m; radius p50 487, p90 954, p99 1524 m | reproduced | **CoM (4, 212) m; p50 399, p90 715, p99 906 m** | does not reproduce; core ≈ 1.4 km across, centred on the map origin |
| 23 | calendar 22.5 | `[12,14]` unexplained | — | **`[6,7]`** = `restDaysInWeek` | resolved |
| 24 | scale bars | 500 m = 295 px (001), 100 m = 134 px (007) | — | **295 px, 134 px** (pixel scan) | reproduces; and the decoded Ticwick→Greenwood anchor distance (554 m) matches the on-screen 327 px |

**Conclusions a designer should carry:** FTG at CITY scale is a 5 km × 5 km map centred on (0,0) with a ~1.4 km
built core; ordinary buildings are ~10 × 10 m (103 m² median, 3.4 people, 5 sub-locations); street edges are 15–30 m
with a hard 15° per-vertex turn cap and locally orthogonal junctions; the wire graph also carries the water outline
(type 14), the map border (type 3) and the piers (type 12); district rings are simple; the only unexplained scale fact
is the configured-vs-persisted `roadLength` factor of two (F3).

## 5. Critic-2 addenda written in this pass

Each is an appended section titled `## Critic-2 addendum (FTG seat, 2026-09-25)`; no existing text was edited.

1. **`ftg-payload-visual.md`** — the zig-zag ruling with the executed proof, the corrected §5 numbers (table), axis
   orientation, retraction of hazards §9.1/9.2/9.4, edge types 3/12/14 identified, field 22.5 resolved, the
   `minDistrictArea` / `verticalBranchSegments` / `spokeStaySpokeProbability` readings corrected to the documented
   ones, and the open `roadLength`-halving observation with a discriminating test.
2. **`ftg-docs-params.md`** — §0.1 wire format corrected (signed, centred; "101..500000" is the zig-zag range),
   §3.10 "9-day week" corrected (current hour), §4.5 tag corrections (red circle / snapping unit are `[SHOWN]`),
   the halved persisted segment length noted against the "(m)" label, GeoJSON districts still absent.
3. **`ftg-posts-c.md`** — §5 pipeline order corrected (the "first stage" comment explained; docs order restated),
   §2.21 confirmed on the payload, open questions 13/15/16/18/21 pointed to their resolving sources.
4. **`ftg-posts-b.md`** — T-14 stalls vs shanty tents reconciled, T-10/T-11 units, T-04 server split, T-33 GeoJSON,
   and the §6 open questions that the guide answers (2, 3, 4, 5, 7, 10, 11, 12, 13, 16, 17).
5. **`ftg-posts-a.md`** — §2.14 wall inference superseded, §2.15 bridge-distance unit and new default, §2.17
   Delegating confirmed, and the §6 open questions resolved elsewhere (1, 3, 5, 6, 7, 8, 9–14, 19–22).

## 6. Remaining gaps and the single most valuable next measurement

1. **The `roadLength` factor of two (F3)** — the only dimensional constant a designer would copy that is now
   ambiguous: is the form's "Road segment length (m)" a doubled unit, or does the generator emit half-segments?
   Every other length (map width, buildings, scale bar, bridge distance) agrees with 1 wire unit = 1 cm.
2. **Road-legality thresholds** (minimum separation, snap radius), **district-type scoring**, **the plot-generation
   rule** (frontage width, depth, the shrink distance of the 2026 rewrite) and **`Number of districts`** — unchanged
   from `_critic.md` §6.7 and `ftg-docs-params.md` §5; nothing in the payload isolates them.
3. **District-stage lots are not serialised** as lot polygons (53 % of buildings lie in no `field 9` lot); the
   district ring is the only geometry for the core, so the core's block structure can only be recovered as road-graph
   faces, which this seat did not compute.
4. **Determinism** (`seed: null`; render-time forest/decoration fills) and the **snapping-distance unit** remain
   untested/unstated.
5. **Bridges** could not be isolated cleanly (154 road nodes lie inside the river polygons; the river polygon evidently
   includes bank strips), so `minDistanceBetweenBridges = 40 m` was not verified.
6. **Not re-read by this seat:** the post and guide images (except three), so `[SHOWN]` descriptions of images stand on
   the readers' word; the ten oldest posts were spot-checked only through `_critic.md`.

**Single most valuable next measurement:** one more FTG capture of a small settlement (VILLAGE, no coast, no river)
created with **stage-1 `roadLength` set to 100 m** and `verticalBranchSegments` 2, decoded with
`critic2/zigzag_rederive.py`. If the persisted type-0 modes land at 50 m the generator halves the configured length
(and every "(m)" in the layout form must be read as 2 wire-metres); if at 100 m the Galeiaward halving was
stage-specific. The same capture gives a clean, water-free road-graph face set for the block-structure gap (3) and a
second sample for the 15° cap and the 1.5-buildings-per-lot figure.
