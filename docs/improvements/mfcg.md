# improvements/mfcg — weakness ledger for watabou's Medieval Fantasy City Generator

Lane `improvements/mfcg` (Opus weakness-miner seat), started 2026-09-25. Purpose: the raw material for designing
something BETTER than MFCG — every entry names the weakness, who says so, the evidence, the user impact, the root
cause as far as knowable, how a new design could beat it, how the win would be MEASURED, and what the reference gets
right that a fix must not lose.

STATUS: COMPLETE (2026-09-25). Layout: §0 reading log · §1 how to read · §2 recorded census (executed) · §3–§12 the
ledger in the ten tasked groups (32 entries) · §13 the 15 highest-value improvement opportunities · §14 restraint list ·
Appendix A per-source harvest notes (the evidence trail, written while reading) · Appendix B user-voice tally from the raw
comment threads. **Addendum 1** (end of file, 2026-09-25): plot model and plot granularity, GEO-9 and
GEO-10 (34 entries in all), and their effect on §13 and §14.

## 0. Reading log (what was and was not read in full)

| # | source | read | notes |
|---|---|---|---|
| 1 | research/findings/_critic.md | FULL (478 lines) | contradiction verdicts C1–C15, remaining gaps §6 |
| 2 | research/findings/_critic-os.md | FULL (434 lines) | 2017 constants, C1–C18, RNG order §4 |
| 3 | research/findings/os-model.md | FULL (1264 lines, incl. Critic-2 addendum) | 2017 pipeline, retry loop, failure table §12, 2017-vs-live §14 |
| 4 | research/findings/os-wards-render.md | FULL (1147 lines, incl. Critic-2 addendum) | ward geometry, rendering, failure table §11, open design questions §13 |
| 5 | research/findings/mfcg-posts-a.md | FULL (877 lines) | Patreon 0.7.0–0.8.1; §4 philosophy, §5 comment facts, §6 open questions |
| 6 | research/findings/mfcg-posts-b.md | FULL (766 lines) | Patreon 0.8.2–0.11.4 + experiments; §4 philosophy, §5 comment facts, §6 open questions |
| 7 | research/findings/mfcg-devlogs-a.md | FULL (1213 lines, incl. External-sources addendum) | itch devlogs 2017–2019 (0.0.2–0.7.0) + archived Reddit threads |
| 8 | research/findings/mfcg-devlogs-b.md | FULL (1031 lines, incl. Critic addendum) | itch devlogs 2019–2025 (0.7.1–0.11.4) |
| 9 | research/findings/profile-mfcg.md | FULL (2255 lines: base §0–§15, Critic + Critic-2 addenda, Explicit-gates addendum parts 1–2, Styles addendum ST-0…ST-12) | the recorded evidence |
| — | *reading-budget switch* | — | after file 9 the lane had consumed ≈ 360 k tokens of reading; per the task's READING BUDGET rule the remaining four files were read by **section outline (`grep -n '^#'`) plus full reads of the sections that matter** — listed exactly below |
| 10 | research/findings/visual-spec.md | PARTIAL: lines 1–284 (§0 recordings + coordinate spaces, §1 MFCG complete) and 626–743 (§5 cross-generator comparison, §6 minimum renderer list, §7 open questions, §8 files) | NOT read: §2 Village, §3 Neighbourhood, §4 FTG (lines 285–625) — other references, not MFCG |
| 11 | research/findings/os-geometry.md | PARTIAL: outline; §1.4–§1.5 (lines 143–186); §4 complexity/robustness, §5 what a rewrite should replace, §6 open questions, Critic-2 addendum (lines 828–945) | NOT read: §0 provenance, §1.1–1.3 invariants, §2 class-by-class geom, §3 utils (lines 1–142, 187–827) — kernel mechanics already covered by os-model/os-wards-render and verified by _critic-os |
| 12 | research/findings/watabou-extra-a.md | PARTIAL: lines 1–240 (§1 chronological table, §2.1–§2.5 bisection with a bend, perpendicular lots, curvilinear streets, uneven streetwall, landmarks), 464–584 (§2.11 RNG roads, §2.12–2.13 templates/tags, §2.14 naming/legends), 717–917 (§2.17 City Viewer data model → §2.24), 1025–1161 (§4 philosophy, §5 comment facts, §6 open questions) | NOT read: §2.6–§2.10 (NG templates, Dyson hatching, cave painter, Perilous Shores pipeline, forest blobs), §2.15–§2.16 (style keys, SVG library), §3 visual conventions (lines 241–463, 585–716, 918–1024) |
| 13 | research/findings/watabou-extra-b.md | PARTIAL: lines 1–333 (§1 table, T1–T10), 525–764 (T23–T31 incl. Urban Places mesh/buildings/content, City Viewer, stencils, parameter expansion, transplanting), 866–996 (§4 philosophy, §5 comment facts, §6 open questions) | NOT read: T11–T22 (conlang, rivers/coasts/mountains/forests/icons/grid for Perilous Shores, floor plans, multi-colour style, outline parameter, farmlands, fjords), T32–T33, §3 visual conventions (lines 334–524, 765–865) |
| 14 | raw comment threads | FULL: the `## Comments` section of all 30 `research/patreon/watabou-city/*/post.md` and all 46 `research/devlogs/medieval-fantasy-city-generator/*/post.md` (extracted by script, read in full); city-related comments (keyword filter city/MFCG/town/zoom/district/ward) from all 65 `watabou-extra` and 28 `watabou-village` posts and every non-MFCG devlog (63 comments in 28 files, read in full) | Appendix B |
| 15 | `captures/mfcg/*/*/console.jsonl` (15 logs) | census by script, de-duplicated by (seed, size) | §2 |
| 16 | `captures/README-labelfix-2026-09-25.md` | lines 1–135 (cause, fix, MFCG rows) | label caveat, §2 |

Not opened at all (out of this lane's list): the FTG, VG and NG findings files, `_critic-ftg.md`, `_critic-vg-ng.md`,
`manor.md`; the task brief's summaries of their rulings are used only where quoted as such. No captured JavaScript bundle
was opened.


## 1. How to read this ledger

**Entry schema (as tasked):** weakness · who says so · evidence · user impact · root cause · how a new design beats
it · how the win is measured · risk of over-correcting (what MFCG gets right). IDs: ROB robustness, GEO geometry/realism,
VAR variety/control, EDT editing/locality, PERF scale/performance, REN rendering/style, LAB labels, DAT data/export,
SIM simulation/content, UX workflow.

**Who says so:** **CR** = the creator (Oleg Dolya / watabou) in a post, devlog, comment reply or in-code comment ·
**US×n** = n distinct named commenters in the raw threads (names and posts in Appendix B) · **REC** = our recordings of the
live build `12710731` (every MFCG capture is this build) · **OS** = visible in the 2017 open-source ancestor (root-cause
evidence only; the live build replaced most internals, `os-model.md` §14).

**Scope tags (owner, 2026-09-25):** **[BASE]** stage-1 base generator (ranked first everywhere) · **[S2]** stage-2
neighbourhood-composition readiness · **[S3-hook] [EVO-hook] [LAYER-hook]** hooks only (buildings as compositions;
settlement evolution; sewers/sky islands) · **[VG-np]** village not precluded.

**Confidence:** creator quotes, recorded counts and the §2 census are CONFIRMED (read or executed); "root cause" lines
are PLAUSIBLE unless they quote the creator or the 2017 source. Clean-room: every "beat it" line describes an approach of
our own; no reference code, grammar, corpus or palette value is proposed for reuse.

## 2. Recorded evidence census (CONFIRMED, executed in this lane)

Script over all 15 `captures/mfcg/*/*/console.jsonl` (build 12710731): each city keyed by its `City.hx:124 >> seed:S
size:N` line; attempts = `City.hx:151 -->>` lines; every other traced message counted until the next city; a
(seed, size) already seen in another pass of the same capture is skipped, so each distinct city counts once. (The
gates = 0/1/4/9 runs share seed 555001/size 40 and merge into one key; none of them printed a message.)

| quantity | value |
|---|---|
| distinct cities / build attempts | **34 / 58** |
| whole-city restarts | **24** = 21 × `City.hx:156 *** Unable to build a canal!` + 3 × `City.hx:156 *** CRITICAL: A bad poly was provided for besecting` |
| cities needing ≥ 1 restart | **8 of 34 (24 %)**; worst 8 attempts (seed 1058048957, size 57) and 7 attempts (777003, size 80) |
| river-course rejections | **712** `discard` (455 delta-river `Canal.hx:268`, 257 regular-river `Canal.hx:216`) |
| street failures, logged and ignored | **28** × `City.hx:591 Unable to build a street!` in **13 of 34 cities (38 %)**; seed 777002 (size 80) logged 8 and was delivered with 0 outer roads and 0 farms (`profile-mfcg.md` EG-2) |
| local geometry skips | 19 × `Bisector.hx:281 Failed to make a cut`, 4 × `WardGroup.hx:107 Failed to create a non-empty alleys group`, 2 × `District.hx:175 Hole in a group, we need to split it` |
| citadel shape repairs | 178 × `Castle.hx:84 Equalizing…`, 11 × `Castle.hx:60 Bloating the citadel…` |

Cost figures quoted from `profile-mfcg.md` (CONFIRMED there): `buildGeometry` ≈ 19.5 ms + 7.5 µs per building (R² 0.974,
EG-3); one size-80 frame of Canvas2D replay 170–230 ms, ≈ 140 000 draw entries, text 40–73 ms, `AudioContext.new`
136.6 ms of start-up with no audio (§7.2); seeded size-80 river+coast `readyAt` 3.7–4.0 s vs 0.2–1.2 s for small cold
cities (§4.6); tree scatter 0.13–1.37 M point tests per city and a 6133×5988 forest canvas against a 1500×1100, 1× DPR
viewport (ST-2, visual-spec §1.1). Label caveat (`captures/README-labelfix-2026-09-25.md`): no class-table row used in this
ledger is one of the relabelled rows; console lines, timings and draw data are unaffected.

## 3. Generation robustness

### ROB-1 · A hard water constraint, or any geometry exception, throws the whole city away [BASE]
- **Who:** REC (primary) · CR · OS.
- **Evidence:** §2 — 24 whole-city restarts in 58 attempts; size 80 + river + coast took 10 attempts for 3 cities
  (`profile-mfcg.md` §4.6, §11); a bisector exception restarts the city too, 3 of 16 styled-session cities (ST-8, which
  corrects the older reading that only canals restart). Creator: rivers "affect everything they 'touch'" and with a river
  "generation takes much more time" (devlog 11802); water had "a serious negative impact on performance" (4923). 2017:
  the retry loop is unbounded and never falls back ("try without walls" does not exist), `os-model.md` §11;
  `os-geometry.md` §1.4 (scope narrowed by `_critic-os.md` C1).
- **User impact:** the most attractive configurations (coast + river, large cities) are the slowest — seconds instead of
  sub-second — and the user's seed silently becomes "whatever attempt k produced"; each failed attempt discards
  10–30 ms of finished work.
- **Root cause:** the river is fitted into an already-built cell mesh by generate-and-test (course search +
  `validateCourse`, a budget of roughly 40 tries), the failure sits in the restart tier, and one catch-all at
  `City.hx:156` wraps wards and geometry as well (ST-8).
- **Beat it:** make water a precondition, not a late fit — terrain and hydrology exist before the settlement mesh and
  the mesh conforms to them (the sibling VG already creates its river course before terrain, per the `_critic-vg-ng.md`
  ruling quoted in the task brief); route rivers by descent on the heightfield so a course always exists; move geometry
  failures to a local-repair tier (retry the one polygon with an alternative cut, then a simpler primitive); bounded
  attempts, deterministic per-attempt sub-seed, failures surfaced in a report.
- **Measure:** attempts per delivered city on a fixed benchmark (e.g. 1 000 seeds × {coast, river, walls} × sizes
  25/40/80/150): target exactly 1, i.e. 0 whole-city restarts; p50/p95/max generation time per size; 100 % of requested
  features present.
- **Over-correction risk:** MFCG's tiered failure policy (repair, local retry, skip, restart) is sound, and its retries
  continue the RNG stream so every attempt is replayable from its printed seed (EG-3) — keep replayability. Keep the
  tuned "river runs through the town" coincidence (0.6.0 made the river "more likely to run through the city", 67134);
  terrain realism must not push rivers away from the centre.

### ROB-2 · Partial failures are shipped silently [BASE]
- **Who:** REC · CR · OS.
- **Evidence:** §2 — street failures in 38 % of recorded cities; seed 777002 delivered with 0 outer roads and 0 farms
  (EG-2 signature table); `gates=0` yields a sealed city — no road reaches the map edge, 15 farmhouses stand outside with
  nothing connecting them, and no fallback runs (EG2-5); skipped cuts, empty alley groups, split holes (EG-3, ST-8).
  Creator: "Empty areas where they clearly shouldn't be, e.g. inside city walls" — recovery is a user shift/ctrl-click
  reroll, and the glitch is "hard to fix" (87882877, 98918904). 2017: a road `null` is silently dropped and a gate may
  get no road (`os-model.md` §6.3, §12 rows 4–5).
- **User impact:** maps with missing roads, empty blocks or unreachable areas reach the table; the user must spot them.
- **Root cause:** a "silent skip for local geometry" tier (`profile-mfcg.md` §11) and no post-generation validation.
- **Beat it:** explicit invariants checked after each stage — every gate joins the external network and the centre;
  every lot has street access; no unintended empty intramural block; water ∩ buildings = ∅; every declared feature
  present — with local repair and a machine-readable generation report shown in the UI and returned by the API.
- **Measure:** hard-invariant violations per 1 000 cities = 0; "requested vs built" feature diff = 0; share of lots with
  access; count of unintended empty blocks.
- **Over-correction risk:** a deliberately sealed fort or a road-less hamlet is legitimate — make it an explicit,
  modelled choice (postern, water gate, footpaths), not an accident; validity checks must not sand off organic
  irregularity.

### ROB-3 · The geometry kernel breaks on concave, holed and degenerate shapes [BASE]
- **Who:** CR (repeatedly) · US×1 · REC · OS.
- **Evidence:** twisted bisection — "For complex concave shapes it often produces far from perfect results and such
  defects as collapsed or intersecting edges can easily break it completely", with a published failure ladder from
  empty areas to "Browser not responding" (87882877); a user's reproducible crash, "the variable `rect` ends up null",
  answered "since the 'twisted' method is very new, I'm sure there will be more" (Daniel, 61026228); Voronoi lots
  "crashes the generator occasionally" (41711473); straight skeleton "glitches in special cases and I hate dealing with
  special cases" (101173551); bisection with holes "still pretty glitchy" (70917627); 0.7.3 was released mainly to
  fix "an ugly bug which occasionally caused a pretty serious computer freeze" (112574). REC: 3 bad-poly restarts and
  19 skipped cuts (§2). 2017: `cut` with ≠ 2 crossings is a silent no-op, recursive slicers have no depth guard,
  circumcentres go NaN, tolerances are parameter-space (`os-model.md` §13.4, `os-wards-render.md` §4.5,
  `os-geometry.md` §4).
- **User impact:** freezes and crashes with no save (EDT-1) lose work; glitches show as empty or weird blocks.
- **Root cause:** hand-rolled floating-point geometry without robust predicates or declared degeneracy policies; since
  0.10 the district merge feeds concave, holed polygons into a primitive built for convex cells (`mfcg-posts-b.md` §2.2).
- **Beat it:** a kernel designed for robustness from day one (robust orientation/in-circle predicates, snap rounding, a
  boolean/offset engine proven on concave and holed inputs — our own implementation); every primitive declares its
  preconditions and a fallback; hard time budgets; property-based fuzzing in CI.
- **Measure:** a fuzz campaign of e.g. 10⁶ random concave, holed and near-degenerate polygons per primitive: 0 crashes,
  0 hangs, 0 self-intersecting outputs, 0 slivers below the declared minimum angle and area.
- **Over-correction risk:** the bent cut's organic look and the sub-second model are the point; robustness must not
  become rigid grid splitting or a slow CAD kernel.

### ROB-4 · The same inputs do not reliably give the same city [BASE]
- **Who:** REC · US×3 · CR · OS.
- **Evidence:** Enter drops explicit parameters (`gates=4` → `gates=-1`) and rolls size and flags from a non-seeded
  source (EG-3); tree crowns are re-picked and gable counts differ between two renders of one city (ST-2, ST-3); a
  permalink round trip "subtly changed the city geometry" (Silent Observer, 102377277); a custom URL "always just
  generates a new map" (Killians, 494692); FMG World→City→World loaded a different world (Distraction Tactics, 46967);
  the printed attempt seed, not the user's seed, identifies the delivered city (EG-3). 2017: the size button draws from
  `Math.random()`, and breadth-first tie-breaks follow the runtime's hash-map key order (`_critic-os.md` rows 15, 140).
- **User impact:** cities can't be reliably re-created, shared or versioned across sessions and updates.
- **Root cause:** one global stream consumed in program order; UI state outside the blueprint; render-time decoration
  drawn from generation streams.
- **Beat it:** a complete, versioned blueprint (seed + every parameter + generator version) → a byte-identical model;
  named sub-streams keyed by stable entity ids; render-time decoration keyed by entity id, never by draw order; golden
  hashes per release, with every legitimate behaviour shift documented.
- **Measure:** identical model hash across runs, browsers/OSs and save/load (100 %); pixel-identical re-render;
  permalink round-trip identity; 100 % of golden changes carry a documented cause.
- **Over-correction risk:** determinism must not freeze the generator — pin versions rather than forbid improvement.

## 4. Geometric quality and realism

### GEO-1 · Streets are a by-product of the cell mesh: radial arterials to nowhere, a two-level hierarchy, no terrain response [BASE]
- **Who:** CR · US×3 · OS · REC.
- **Evidence:** "districts are the cells of this mesh, roads and rivers run along its edges" (22794); "barely more than
  stylized Voronoi diagrams" (817711); before 0.10 "every street is contained within its patch", after it "an illusion
  of streets following some kind of underlying landscape. There is no underlying landscape" (87882877); roads "radial
  like in MFCG" (39697187); straight segments are "one of the things distinguishing generated maps from real ones most
  prominently" (28088976); curved streets shelved as "too risky" to retrofit (30565716, 34822131); the road-first
  experiment rejected for cost, performance and "Merging these two techniques also seems problematic" (31287). 2017:
  streets are breadth-first paths on the cell-edge graph with pure length cost, no terrain or turn cost; outer roads aim
  at a phantom point 1000 units out (`os-model.md` §6.1–6.3, §15.9). REC: roads end at the crop, and with forests on
  "stop at the forest edge" (ST-2). Users: T-junctions everywhere and a request for planned wide streets crossing in X
  with organic infill (Heath Rezabek, 49191011); "more road based … much more realistic" (PoochieMoo, 31287); roads
  should line up with the region map (Jonathon Hadley, 79147510 — creator: "For inland settlements it doesn't work").
- **User impact:** a realism ceiling; planned, linear and bridge towns are impossible; roads lead nowhere; the street
  pattern cannot explain the town.
- **Root cause:** the block-centric paradigm — areas first, streets as residual gaps and cell-edge paths (CR 31287).
- **Beat it:** fuse the two references: an FTG-style staged backbone (`_critic.md` C12 and §2 version ladder: staged road
  network, large lots handed to districts) of through-roads grown from real destinations (gates, bridges/fords,
  neighbouring places, market) with terrain and turn costs and an explicit hierarchy (through-road → primary →
  secondary → lane → alley); MFCG-style subdivision fills the backbone's blocks. Streets carry centrelines, classes and
  widths in metres. The owner's tiebreaker points this way: explicit constraints and a measurable network.
- **Measure:** exported network statistics per city — junction-degree mix (T/X/Y), orientation entropy, gate-to-centre
  route directness, block-area distribution, length share per street class, grade vs slope on steep ground — for later
  corpus calibration; 100 % of through-roads end at a named external destination.
- **Over-correction risk:** irregular T-junction fabric is historically authentic for organic towns and much of MFCG's
  charm; the creator measured road-first growth as slower and harder to merge — keep the model sub-second and keep block
  subdivision where it looks best, in the fabric.

### GEO-2 · Plots ignore frontage: slivers, triangles, arbitrary side walls, a visible binary tree [BASE; input to S3-hook]
- **Who:** CR (for years) · US×3 · OS · REC.
- **Evidence:** triangular buildings were the most-discussed first-year defect — "I can't eliminate them completely",
  "a rather silly algorithm" (1367, 1579), a building-less view offered "for those of you who are annoyed by
  triangular houses" (2062); "a lot of triangles (or 'triangle looking quadrangles')" (41711473); `No triangles` /
  `Filter lots` mitigations (`mfcg-posts-a.md` T15, 61026228); the creator wants "side walls being perpendicular to
  the street" (28088976); bent cuts were adopted because their "simple recursive nature is less visible for the naked
  eye" than plain bisection's, yet they spawn "very weird ones which need to be filtered out" (58808794);
  twisted-bisection artefacts are "more obvious" at streetwall scale (141198168). 2017: area-only stop test, no aspect
  floor, frontage "an emergent side effect" (`os-wards-render.md` §4.5, §13.9). Users: triangular lot as a fence
  around a rectangular house (agnate, 1367); regularity by town size (Falderol, Ti Munro, 1367).
- **User impact:** implausible plots, and no stable input for per-building generation (stage 3 needs lots with access
  edges).
- **Root cause:** recursive area bisection with no notion of access, depth or plot type.
- **Beat it:** frontage-first plots — each lot owns an access edge on a street; widths and depths come from per-district,
  per-street-class distributions in metres (narrow deep strips on commercial streets, broad plots for elite houses,
  backlands and shared courtyards as explicit residue); side walls perpendicular to the frontage; lots are first-class
  inputs to the building generator.
- **Measure:** share of lots with street access ≥ 98 % (except declared backland); side-wall angle to frontage, median
  within ±5° of 90°; depth:width distributions per class; minimum interior angle; 0 slivers below threshold.
- **Over-correction risk:** over-regular plots read as a modern subdivision; keep the jitter MFCG already has (the
  `Offset` uneven facades, per-roof weathering) and irregular plots where streets bend.

### GEO-3 · Fortifications are the outline of a cell set: one ring, castle = one cell, a tower on every vertex, walls outgrown by the town [BASE; EVO-hook]
- **Who:** CR · US×3 · REC · OS.
- **Evidence:** one ring only — "multiple sets of city walls, both nested and independent" was a 2018 roadmap item that
  never shipped (22717, 39697187); the castle "always occupies one cell of the mesh" and can only be resized by warping
  (41711473 comments); inner castles "surprisingly hard … a separate class of objects" (40345972); "fewer unrealistic
  'sawtooths'" (38048182). REC: at size 80 the wall "no longer encloses the city" and the castle shrinks to "a tiny walled
  parcel" (`profile-mfcg.md` §10.6); a tower on every non-gate vertex (EG2-3; 2017 `os-model.md` §5.4). The creator's
  later walls "looked wrong" for a long time — a judgement problem, not an algorithmic one (139540343). Users: castle
  size, keep and grounds (Allen Varney, 41711473); castle placement (Quenten Walker, 34822131); drawing walls (BCS, 91172).
- **User impact:** implausible defences — tower spacing unrelated to anything, walls not on defensible lines, no outer
  curtain round the grown town.
- **Root cause:** the wall is the circumference of the "inner" cell set, the castle is a cell, and walls are built once
  with no history.
- **Beat it:** fortification as a constrained design object — the trace follows defensible ground and water while
  enclosing the designated core; tower spacing in metres; gates exactly where through-roads cross; several enceintes and
  a citadel as separate objects; every wall segment, tower and gate carries a lifecycle (built, altered, demolished,
  converted to a road), so growth can add an outer curtain and turn the old one into a ring road.
- **Measure:** tower-spacing distribution in metres; share of wall length on locally high ground or along water; gates
  on through-road crossings (100 %); share of built area inside the enceinte by size, flagged when sprawl dominates
  without suburb defences.
- **Over-correction risk:** bold walls and round towers are MFCG's signature — "walls make a pile of polygons look like a
  fantasy city map" (1579); keep them legible and on by default.

### GEO-4 · Water can take only a few shapes, and buildings can overlap it [BASE; LAYER-hook]
- **Who:** CR · US×6 · REC.
- **Evidence:** the shoreline was "always a rough parabola", then noise coasts with "still no islands or landlocked
  lakes" (29813424, 29538966); coasts "almost always lacking interesting features such as bays and peninsulas" (4923);
  one river, constant width, no loops, "so I can't make a moat of it" (11802); the river/coast system "looks pretty dated
  and primitive even comparing to Village Generator … one or more islands, confluence of rivers" (61026228, never shipped);
  "People have been asking for river confluences and islands for a long time" (98918904); headlands removed as ugly
  (109852547); curvilinear rivers made "buildings overlap the river" (40345972); `deltaRiver` is a widened mouth, not a
  delta (`_critic.md` C15). REC: water is one flat polygon — "no beach, no ripple, no depth ramp" (visual-spec §1.5).
  Users: an island city (Nik Balson, 101942512 — "next on my list" in 2026), a river delta (Steve Mangione, 165462094), a
  river reliably through the city (supernal, 34104), bays "unusually narrow" (Daniel, 61026228), a harbour/dock button
  (sectorbob, 1206), surrounding the city with water (stintles, 22794).
- **User impact:** common historical sites — confluence towns, river-island cores, estuary ports, moated castles, lake
  shores, island cities — cannot be made.
- **Root cause:** water added as exceptions to a land mesh — a region "marked as water" before the city, a river as one
  path along cell edges (CR 4923, 11802).
- **Beat it:** a hydrology layer on the heightfield — drainage direction and outfalls, river networks with tributaries,
  confluences, braided and distributary deltas, river islands, lakes, moats fed from rivers; widths in metres; the
  settlement sited against water (bridging points, fords, harbours); drainage stays queryable for the sewer add-on.
- **Measure:** configuration catalogue (coast, estuary, confluence, river island, lake shore, delta, moat, island city)
  8/8 achievable; building ∩ water area = 0; river widths per class within stated ranges; 0 restarts (ROB-1).
- **Over-correction risk:** the minimalist flat water reads well; water complexity must not clutter the plan — default
  to one clear river or coast.

### GEO-5 · No terrain in the layout, and invisible when present [BASE; LAYER-hook]
- **Who:** CR · US×4 · REC.
- **Evidence:** elevation declined because "such features are rarely present on city maps anyway" (41711473); the 0.6.0
  "gradient field" only nudges alleys — "Some people on Twitter say that they don't see the difference" (67134); height
  maps kept internally but never exported (37407181). REC: noise is sampled only for coasts (`Noise.get` only with
  `coast=1`, `profile-mfcg.md` §4.1); 2017 has no terrain. Users: hills and cliffs (Allen Varney, 41711473), a hill with
  contour lines (Quenten, 123268), non-flat ground (bindusara, 123268), terrain (T Mexx, 123268).
- **User impact:** street patterns and castle sites cannot respond to relief; there is no data for drainage, defence or
  views.
- **Beat it:** a heightfield as first-class input — slope-aware street costs and lot orientation, castle and church
  siting on high ground, drainage and outfalls queryable (sewer hook); relief rendering optional and off by default.
- **Measure:** street grade vs slope statistics; castle-site elevation percentile; drainage query answerable at any point.
- **Over-correction risk:** the creator is right that relief shading is noise on a town plan — terrain should show
  through the layout, not through shading.

### GEO-6 · Scale and units cannot be trusted, and "size" means three different things [BASE]
- **Who:** CR · US×6 · REC · OS.
- **Evidence:** "Dimensions are a mess in all my generators. Don't use them for planning anything real" (79147510); "The
  scale in the generator is probably wrong. Buildings often seem way too large", answering a user's > 25 m trees
  (Quenten, 345262). REC: buildings ≈ 13–14 m across at the measured scale and a factor-2 ambiguity in the unit
  (visual-spec §1.4, §7.10). `size` counts cells while the UI reports buildings, and population ≈ 6.1 × buildings
  (`_critic.md` C1); FMG passes `size = population / 1000`, "a little overcrowded" (bindusara, 123268); users find
  "size=60" by trial (Steve Davies, 121415691); a 100 000-person town "can't load" (PliscoFlisco1893, 711706). 2017: no
  units at all (`os-model.md` §15.10).
- **User impact:** the maps can't be used for distances, travel times, populations or battle scale, and integrations
  mis-size towns.
- **Root cause:** a visual scale tuned for the look, and size tied to cell count.
- **Beat it:** SI units end to end (metres; footprints, street widths and wall thickness per class in plausible ranges);
  size given as population and/or area with derived building counts; every statistic exported for the later corpus
  calibration (owner's roadmap).
- **Measure:** footprint-area distribution per class, street width per class, persons per hectare and per building
  within target ranges; requested population honoured within a stated tolerance.
- **Over-correction risk:** MFCG's scale serves legibility at a glance — solve legibility in rendering (LOD, symbol
  scaling), not by distorting the model.

### GEO-7 · Zoning is weak and discontinuous; ward character is a handful of scalars [BASE]
- **Who:** CR · US×3 · OS · REC.
- **Evidence:** 2017 — 21 of 36 deck slots placed at random, zoning ≈ "~14 constrained placements against a random
  background", ward character = four scalars (`os-wards-render.md` §6.1, §8.2); live — ward classes collapsed to `Alleys`
  plus specials, flavour moved to `District` (`profile-mfcg.md` §4.7); the sibling NG "can only choose different values
  for the minimum and maximum street widths, the average building and block size" (70917627 comments). Seams: "on one
  side of a street buildings are tiny and on the opposite side buildings are huge"; the `Continuous` blend that fixed it
  (34104 comments, itch 422446) was removed in 0.5.5 — "I think nobody cared about it anyway" (59798). Users: gate
  wards "show up in the center of town, or there are more than seems right", fixed by rerolling until they vanish (Colt
  Hack, 46967); adjacent, non-rectangular plazas
  (llynglas, 3091 — creator: "I can change it to discard such layouts but it will increase generation time"); district
  colours random and not settable (MrKella, 494692).
- **User impact:** quarters do not read as functional; seams look wrong.
- **Beat it:** land use from explicit rules (access and distance gradients to market, main streets, gates and water;
  nuisance trades downstream or at the edge; religious precincts; elite frontages), with layout parameters as smooth
  fields that jump only at real boundaries (wall, river, main street).
- **Measure:** parameter discontinuity across shared street edges (Δ median footprint, Δ plot depth) below a threshold
  except on declared boundaries; spatial autocorrelation of land use; gate districts within a set distance of their gate.
- **Over-correction risk:** MFCG's "'Gate' doesn't mean that the whole ward is just … gate … a craftsmen ward doesn't
  consist entirely of workshops" (1579) is the historically right mixed-use reading — do not produce modern single-use
  zoning.

### GEO-8 · The hinterland is decoration: few fields, forests fill the rest [BASE]
- **Who:** US×1 in MFCG threads (+2 on VG fields) · CR · REC.
- **Evidence:** "I wish it generated more farms … It never feels like there are enough to support the population"
  (Justa Badge, 47063541), answered "In reality cities should be surrounded by farms, but it just doesn't look
  interesting" (47063541); "If you think they are drawn incorrectly, then you are not alone" (59798); the crowd's fixes —
  smaller, more varied, grouped fields with visible borders (Reddit a1wx6h); sawtooth farmland borders (62336213);
  forests "fill all available space", with edges "too straight" on large maps (114184619). REC: fields have no outline
  and degrade to stipple at metropolis zoom (visual-spec §1.6). VG threads: field size vs population density (Moritz
  Hackl, 38498864), fields pushing back trees (Allen Varney, 42521165).
- **Beat it:** a hinterland sized to the population (arable per capita, meadows, commons, orchards and woods by
  distance, field patterns tied to roads and settlement form), with a view-extent choice for how much of it to show.
- **Measure:** farmland per capita within plausible bounds; field size and shape distributions; forest-edge
  straightness metric.
- **Over-correction risk:** the creator's composition point is real — a sea of fields can bore; keep a framing default
  that looks good.

## 5. Variety and control

### VAR-1 · Control is a pile of checkboxes plus hidden URL keys; intent cannot be expressed [BASE]
- **Who:** CR · US×6 · REC.
- **Evidence:** the Buildings tab has "too many of them … I don't see a single combination … which would be definitely
  the best" (61026228); four options were deleted and a user lost favourite combinations (sb.works, 102377277); "there
  are too many parameters in this generator as it is" (61026228); users hack the URL to aim the harbour or exceed Large
  (Silent Observer, 102377277 and 106975409); `sea` is an undocumented angle (`profile-mfcg.md` §2.1) and there is no
  `farms` key (EG-2); Enter forgets the road count (Tubal, 47063541 — still true in 2026, EG-3) and "That piece of logic
  with the number of roads and rebuilding etc is very confusing" (creator, 47063541); a chaotic-vs-orderly control asked
  for (Ti Munro, 1367); fonts not selectable (Ransom Planet Games, 47063541).
- **User impact:** users can't say what they want; power users reverse-engineer the URL; everyone loses settings on Enter.
- **Beat it:** a small intent vocabulary (tags or presets: planned↔organic, wealth, era, density, defence, water setting)
  that expands deterministically into the full internal parameter vector (the creator's own 3 → ~20 expansion,
  `watabou-extra-b.md` T28); every internal parameter documented with range and provenance and stored in the blueprint;
  "regenerate" keeps explicit settings.
- **Measure:** 100 % of internal parameters reachable through documented controls (advanced panel); scripted tasks
  (harbour to the north; three gates; planned grid; no walls; population 20 000) achievable without editing a URL;
  regenerate preserves explicit parameters (100 %).
- **Over-correction risk:** one-click generation and a small visible surface are core virtues; "there are just too many
  buttons" (Reddit 9ygosn) — tool count is a budget.

### VAR-2 · A narrow repertoire of settlement forms [BASE; VG-np]
- **Who:** CR · US×4.
- **Evidence:** City Painter lists what MFCG cannot make — any-shape or multi-cluster cities, non-radial roads, several
  walls, several castles, islands, confluences, ponds (39697187); wall-less layouts "look … like settlements, but
  layouts are wrong — the borders are too well defined" (Reddit 6cg1ol); users ask for an island city (Nik Balson), a
  delta (Steve Mangione), planned X-crossings (Heath Rezabek) and railroads for non-medieval play (Sherevar, 22717).
- **Beat it:** forms emerge from constraints plus a small set of archetype rules (river crossing → bridge town; road
  junction → market cross; charter → planned grid; spur → hill town; lagoon → island city), selectable or sampled.
- **Measure:** archetype catalogue producible; morphology metrics (elongation, radiality, grid index) separate the
  archetypes.
- **Over-correction risk:** the circular walled town is the best-loved default — keep it the default; the creator's wish
  to "keep it abstract" (22717) argues against hard-coding one culture.

## 6. Editing and regeneration locality

### EDT-1 · Nothing the user does can be saved or re-imported [BASE]
- **Who:** CR (repeatedly) · US×9.
- **Evidence:** Copy URL is "not a replacement for a real save/load feature" (47063541); "No manual changes made to a map
  are encoded into its URL (apart from the city name) … currently there is no way to save those changes" (102377277);
  exported JSON "can't be imported back" (62336213, 494692); save/load waits "before the architecture is stable
  (currently it is not)" (32650629 comments); points of interest are lost on regeneration (219273). The user workaround:
  export SVG twice (labels on and off) and keep editing in Inkscape (Silent Observer, 102377277).
- **User impact:** multi-session work — the campaign city — is impossible inside the tool; users move to vector editors.
- **Beat it:** a document model — blueprint + ordered edit log + stable entity ids — that saves, loads and re-imports
  our own export; edits are recorded events (the same event model the evolution program needs).
- **Measure:** save → load → save byte-identical; 100 % of edit kinds persisted; importing our own export reproduces the
  model hash.
- **Over-correction risk:** keep the one-line permalink for sharing unedited cities.

### EDT-2 · One knob change re-rolls the town [BASE]
- **Who:** REC · CR · OS.
- **Evidence:** same seed, `gates` = 0/1/4/9: the wall and castle stay, but streets, wards, districts, buildings, fields
  and even the city name change (Redchurch / Littlerock / Oldvale / Scribes Grove) (EG2-4); local churches used to
  "disappear after rerolling a ward" (87882877); 2017 — one global stream, "any change of evaluation order anywhere
  changes every downstream map" (`os-model.md` §1.1), and the rewrite advice to split named sub-streams because one
  stream re-rolls every seed on feature work (`os-geometry.md` §5). Present strength: a ward reroll keeps type and shape
  (19034) and sub-generators run between `Random.save/restore` (EG-3).
- **User impact:** a city cannot be refined; every adjustment is a new city.
- **Beat it:** stable ids + hierarchical sub-seeds + a stage dependency graph, so an edit invalidates only dependent
  entities ("same town, one more gate" works; names survive).
- **Measure:** locality index — after a single-parameter edit, the share of entities that do not depend on it and stay
  identical (target ≥ 95 %; adding a gate changes only its road corridor and adjacent blocks); name retention 100 %.
- **Over-correction risk:** whole-town reroll is still wanted — offer "adjust" and "reroll" as separate actions.

### EDT-3 · Editing is vertex warping only — no topology, placement or annotation edits [BASE; assignment hook]
- **Who:** CR · US×12.
- **Evidence:** warping "can't change the topology of a mesh … can't merge or split cell" (41711473); "you can't create an
  island or add a new road … applying too much distortion may cause glitches" (22794); drawing over a coarse mesh was
  "not user friendly at all" (40345972); hand placement of farms, bridges and buildings reserved "for the desktop
  version (but not for the web version)" (91172); user-placed castles blocked by architecture churn (34822131 comments).
  Twelve users asked (B6): add districts (SaintB), draw farms/bridges/buildings/walls (BCS), add or remove roads
  (Dragonzofdeath), delete a district (harpymarpy — "No. What would be on its place?"), move labels (VampriruM), remove
  labels (LionHeart5), set district colours (MrKella), add/delete vertices (Rocketman Dan), more drag points in the sea
  (stintles), castle placement (Quenten Walker), castle size and grounds (Allen Varney), farms in chosen areas (Justa
  Badge).
- **Beat it:** constraint editing — pin, add, remove or move gates, roads, districts, castle, landmarks, labels and
  colours; the generator re-solves downstream while honouring pins (the owner's assignment/constraint input); undo and
  redo; warp kept for shape.
- **Measure:** supported operations vs the 12 recorded asks (target 12/12), each with a locality index (EDT-2); undo depth.
- **Over-correction risk:** tool count is a budget, and the creator's City Painter lesson stands — don't turn the
  generator into a CAD editor; keep context-menu actions.

### EDT-4 · A town exists at one instant: no growth, no history, walls stranded by sprawl [EVO-hook]
- **Who:** REC · US×1 · CR.
- **Evidence:** size-80 cities whose wall no longer encloses the town (`profile-mfcg.md` §10.6); suburbs exist only as
  extramural sprawl and shanty towns, with no defences or absorption; ruined buildings requested, answered "in MFCG
  everything is pretty abstract" (Rocky Weaver, 64375271); no entity carries a date or state.
- **Beat it (hooks only):** a lifecycle history per entity; a pipeline that can extend an existing settlement; first-class
  conversions (wall → ring road, gate → junction, suburb → district); circumstances as time-varying inputs.
- **Measure:** after an epoch step every changed entity traces to a recorded event and every other entity is identical;
  recognisability (share of year-0 street length still present at year 200).
- **Over-correction risk:** the base must not pay for evolution now — the hooks must cost nothing when unused.

## 7. Scale and performance

### PERF-1 · Drawing costs as much as generating, and every change redraws everything [BASE]
- **Who:** REC · CR.
- **Evidence:** at size 80 the model takes 125–260 ms while one Canvas2D replay takes 170–230 ms, text 40–73 ms, and
  `AudioContext.new` 136.6 ms of start-up with no audio used (`profile-mfcg.md` §7.1–7.2); the whole display tree is
  rebuilt on every regeneration (§10.5); tree scatter reaches 1.37 M point tests per city (ST-2). Creator: "Warp mode is
  optimized (and uglified)" (101529); isolines were "slow to draw" (8154); "There may be some memory leaks though
  depending on a browser" (34104 comments).
- **User impact:** large maps are sluggish to show and edit; every tweak costs a full redraw.
- **Beat it:** a retained scene graph with a spatial index, per-level-of-detail tiles/caches and incremental
  invalidation on edits.
- **Measure:** pan and zoom at ≥ 60 fps with 40 000 buildings; edit-to-redraw < 100 ms; time to first frame.
- **Over-correction risk:** "it never takes longer than a fraction of second to generate even a large city" (34104) is a
  strength — keep the model sub-second, and don't add a heavy GPU pipeline for its own sake.

### PERF-2 · Large cities hit ceilings: 100 000 inhabitants, 8 MP bitmaps, no building index [BASE; S3-hook]
- **Who:** US×4 · CR · REC.
- **Evidence:** "Cant Load Town Of Over 100K People" (PliscoFlisco1893, 711706); bitmaps "larger than ~8MP" are
  problematic (11802); numbering every building rejected on performance — "A large town may consist of hundreds houses,
  so it would affect performance badly" (Sherevar, 11802; EltharinFireDragon, 153064); City Viewer struggles at size
  100–200 (Quenten Walker, 34061942). REC: buildings grow ≈ size^2.9 with sprawl (EG-3); maps with forests export at a
  lower PNG resolution (121415691; the 6133×5988 forest canvas, ST-2).
- **Beat it:** building detail generated lazily per lot on demand (the stage-3 interface), tiled export at any
  resolution, vector export as the archival default, and a gazetteer that indexes every building without drawing it.
- **Measure:** e.g. 50 000 buildings in < 2 s of model time with an interactive view; export resolution limited only by
  tiling; every building addressable in the gazetteer.
- **Over-correction risk:** none significant.

## 8. Rendering and style

### REN-1 · No zoom and no level of detail — the city is a fixed picture [BASE; S2; S3-hook]
- **Who:** CR (six statements) · US×7 · REC.
- **Evidence:** "Currently there is no way to zoom in/out. I know it's a big flaw, but there are technical reasons for
  it" (27564017); "due to implementation details of OpenFL … I can't implement zooming" (91172); "technical issues"
  (219273, 494692); real zoom "too difficult for a specific technical reason", and District View is drawn "exactly in the
  same way … no cupolas, shadows, cobbled roads", "often looks disjointed" (101942512); "real zoom is still impossible"
  (100431269); wheel zoom disabled in 2017 after crash reports (1367). REC: fixed 1500×1100 canvas at 1× DPR (visual-spec
  §1.1); outline width fixed in screen pixels while features scale (`profile-mfcg.md` §10.3); at size 80 buildings "read as
  texture rather than as individual houses" (§10.6); roof ridges look right only on medium maps (101173551). Users (B1):
  Callum, Tubal ("I sometimes don't want an entire town, just a local map"), Nelian, QM, T Mexx ("Cities really seem to
  need two different levels of Zoom"), Quenten Walker, Tom (export viewport).
- **User impact:** large cities are illegible; local maps can't be made; the city and the neighbourhood become separate
  products.
- **Root cause:** a scale-baked raster pipeline (CR + INF).
- **Beat it:** a resolution-independent scene with semantic level of detail — city (blocks, landmarks) → district (lots,
  roofs) → neighbourhood (NG-class detail, stage 2) → building (wings, roofs, rooms, stage 3) — and style rules in paper
  units per zoom band.
- **Measure:** continuous zoom over e.g. 1:50 000 – 1:500 with minimum symbol and label sizes met at every level; no
  feature pops more than once across a zoom sweep; the same scene exported to PNG, SVG and tiles.
- **Over-correction risk:** "a whole city drawn like this with all these trees and cobblestones would look too visually
  noisy, wouldn't it?" (58808794 comments) — detail must appear only as you zoom; "busier is fine; noisier is not".

### REN-2 · Streets are not drawn objects, and one ink outlines everything [BASE]
- **Who:** CR · US×3 · REC.
- **Evidence:** "Currently roads are drawn only outside a city, inside a city they are just gaps between buildings"
  (30234656, answering Xariun's request for a separate road colour); a street-colour request filed again on Reddit
  (T Mexx, 87882877); "everything is outlined in the same 'Dark' colour", so water outlines can't differ (Will, 61026228).
  REC: only roads, piers and bridges are stroked, intramural streets are gaps (EG-4), and "Show alleys" draws only the
  shanty-town alleys — in the walled core no pixel changes (ST-4).
- **Beat it:** streets as geometry (centreline, width, class, surface) with style roles per class and per layer; the
  negative-space look kept as a style.
- **Measure:** every street segment has geometry and a class; style roles cover every class; per-layer colours.
- **Over-correction risk:** the negative-space street and the one-ink discipline are why MFCG looks coherent — make them
  the default style.

### REN-3 · Style defects, silent option interactions and export regressions [BASE]
- **Who:** CR · REC · US×3.
- **Evidence:** gable roofs with Raised "look like greenhouses" (101942512); roofs "too smooth, like plastic" (114858238);
  secondary plazas "look ugly" (79147510); PNG export broke on maps with water (Allen Varney, 40345972); forest maps export
  at lower resolution, the fix "based on some assumptions which I can't really verify" (121415691); screen and SVG are
  separate code paths — "all the 'drawing' needs to be implemented two times" (85275); users lost option combinations
  (sb.works, 102377277) and asked for shadows to stay optional (Johnn & Jochen, 114858238). REC: the shipped default
  scheme says Brightness but the app runs Spectrum; Block mode silently drops trees and forests; forests are greyed out
  until trees are on; the Districts dropdown reads "Hidden" while curved labels are drawn (ST-0, ST-2, ST-6); default
  buildings are flat grey blocks with no function styling (visual-spec §1.4).
- **Beat it:** one scene description rendered by every back end (screen, PNG, SVG, tiles); style as complete data (every
  role and option) with automated option-interaction tests; symbology driven by the model (civic, religious, elite and
  craft buildings distinguishable).
- **Measure:** screen vs PNG vs SVG pixel difference below threshold across the full option matrix; 0 options that
  silently disable another; 100 % style-role coverage.
- **Over-correction risk:** keep the minimal inked look, 4–8 colour roles, round joins and caps (visual-spec §1.8), and
  shadows off unless asked.

## 9. Labels and typography

### LAB-1 · Labels escape their areas, hide features, ignore holes and cannot be moved [BASE]
- **Who:** CR · US×3 · REC.
- **Evidence:** old labels "went beyond the borders of their areas and occasionally they were bent in the opposite
  direction" (102377277); "far from perfect" (34104, 46967, 85275); arced labels "not great" (101173551); the creator's curved
  labels in the sibling Perilous Shores — most plausibly the same straight-skeleton family as MFCG 0.11.1
  (`watabou-extra-b.md` T6, inferred there) — don't "take holes into account", "curve too wildly", and are "sometimes
  (rarely) … simply drawn incorrectly" (109092851); no multi-line labels
  (27776897); "currently labels can only be placed automatically" (494692). REC: labels cover gate blocks and the keep and
  straddle the wall (EG-1, EG2-1, EG2-4); district glyphs are fixed 27 px (`profile-mfcg.md` §10.2). Users: labels
  "interfere with seeing the map" (LionHeart5, 494692); move labels (VampriruM, 494692); in a 100 000+ city "the lettering
  covers up buildings" (Silent Observer, 102377277).
- **Beat it:** a placement optimiser with protected features (gates, landmarks, bridges), hole-aware spines, multi-line
  labels sized by area and importance, street names along centrelines, user pinning, and per-zoom label sets.
- **Measure:** overlap with protected features = 0; share of labels wholly inside their area; label–label collisions = 0;
  minimum rendered x-height; pinned labels persist.
- **Over-correction risk:** the letter-spaced curved small caps with a paper halo are part of the beauty — keep the style.

### LAB-2 · Names are random decoration, not derived from the place [BASE]
- **Who:** CR · US×1.
- **Evidence:** district names are random — "Quite often it produces silly names" (85275); after the rework "Not sure they
  got better" (100431269); names reroll only as a whole set (91172); district names are not kept in the URL (91172) — a
  user who renamed every district lost them on reload (Silent Observer, 102377277); no street names exist. A strength to
  keep: the grammar is conditioned on the city's own features (castle, walls, coast, river guards; `profile-mfcg.md` §9).
- **Beat it:** names grounded in the model (a quarter named after its church, gate, trade, family or landform; streets
  after destinations, trades and institutions), per-entity reroll, edit and persistence, and name sets as data of our own
  authoring.
- **Measure:** share of names traceable to a model feature; per-entity reroll; 100 % persistence.
- **Over-correction risk:** whimsical fantasy names are wanted — keep a fantasy name set as an option.

## 10. Data model, export and interop

### DAT-1 · Exports are one-way, non-standard and drifting [BASE; LAYER-hook]
- **Who:** CR · US×15 · REC.
- **Evidence:** GeoJSON abandoned — "My discontent with GeoJSON is just too strong to keep struggling" (37407181); "now it
  just resembles GeoJSON without being compatible with anything", QGIS could not read it and a third-party PHP converter
  exists (HuguesGauthier, 576591); schema drift broke City Viewer at `addWall` (smallfish, 114184619); OBJ holds only
  buildings and walls merged into one mesh (34061942); height maps are not exported (37407181); District View exports the
  whole city as JSON (101942512). Users (B8): standards and CityJSON (Tom, saikofish), QGIS (HuguesGauthier), STL
  (SpaceDiceMan), UE4 (LDOG), resolution (Ealiom), transparent PNG (Hubert Marceau), SVG framing (Tom), water-outline and
  street colours (Will, Xariun, T Mexx), per-building objects, masks and UV-mapped OBJ (Javin Bond), machine-readable
  vectors (buckle2000), an open format exposing cells and neighbours (Glidias), printing (Aktane, cedarwolf).
- **Beat it:** one documented, versioned schema — a standards-conformant GeoJSON profile in metres with a local CRS for
  2-D, an optional 3-D export — carrying stable ids, entity classes, functions and lifecycle, the layer (underground /
  ground / sky) and z-order; per-layer export (e.g. VTT levels); schema migrations; import of our own export.
- **Measure:** exports validate against the spec and open in a GIS (100 %); round-trip import; schema-version test suite;
  per-layer files.
- **Over-correction risk:** "Ideally there would be two different formats … unfortunately that would be too much code to
  maintain" (37407181) — one canonical schema with thin adapters, not N native exporters.

### DAT-2 · The city cannot take or give context; overworld links are lossy [BASE API]
- **Who:** US×4 · CR.
- **Evidence:** "the roads and coastlines don't tally exactly with the overworld" (Glidias, 46967); the round trip loads a
  different world (Distraction Tactics, 46967); FMG sends `size = population / 1000` (bindusara, 123268); inland roads do
  not line up with the region map — "For inland settlements it doesn't work" (Jonathon Hadley and creator, 79147510); map
  orientation is derived from the coast only.
- **Beat it:** an embeddable library API with explicit context inputs (bearings and destinations of external roads,
  water, terrain, population, era) and outputs (road endpoints, footprint, gazetteer) — per the owner's ruling a clean
  boundary now, with no external compatibility criteria.
- **Measure:** given the inputs, 100 % of through-roads leave within a stated tolerance of the requested bearings;
  population honoured within a stated tolerance.
- **Over-correction risk:** none, provided the standalone one-click path stays primary.

### DAT-3 · The city and the neighbourhood are two unrelated models [S2]
- **Who:** US×9 · CR.
- **Evidence:** a request repeated by nine users across five posts (the largest single-feature request in the threads;
  broader themes such as export fidelity collect more distinct voices, Appendix B) — districts at NG fidelity stitched
  into a whole city with roads matching across the seams (B3: Matt Wallis, T Mexx ×3 posts, Moritz Hackl, Rin Vindor,
  Simen Lande, Robert Conley's "slices", C.R. Shelidon's "collage", Javin Bond, Pinguid; 58808794, 59046807, 70917627,
  100431269, 103335095). Creator:
  passing a shape is easy but NG lacks rivers and walls, "I lost interest in NG to be honest" (100431269); "Most likely,
  it won't be possible to reproduce a district in Neighbourhood Generator exactly as it looks in MFCG, and it really
  bother me" (70917627).
- **Beat it:** one model at two scales — a district's polygon, streets, water and walls are the boundary conditions of the
  neighbourhood generator (arbitrary boundary + context), with a seam contract (shared street centrelines, widths and
  frontage lines on both sides).
- **Measure:** 100 % of street crossings on a district border match in position (within tolerance) and class; wall and
  water continuity across seams; the neighbourhood view of a district reproduces the city view's blocks (IoU above a
  threshold).
- **Over-correction risk:** none for the base, as long as stage 2 is designed to depth and not built now.

## 11. Simulation and content (the FTG-class gap)

### SIM-1 · Nobody lives or works anywhere: population is a multiplier, wards are hints, landmarks are not generated [BASE]
- **Who:** US×9 · CR · REC.
- **Evidence:** population ≈ 6.12 × buildings (`_critic.md` C1); ward names are "a hint, not … a literal explanation"
  (46967), a venue mix with residents (1579); landmarks are "not generated", a user list is "distributed across a city
  randomly" (38048182, 219273); the ward taxonomy collapsed to `Alleys` plus specials (`profile-mfcg.md` §4.7).
  Contrast: FTG decides buildings and people before any geometry (`_critic.md` C12). Users (B5): a demographics
  generator tied to city size (LionHeart5, 22717), shop inventories (Agustín Molina, 79147510), socio-economic classes
  (T Mexx, 70917627), stores and services matched to the map (Allen Call, 59046807), commerce generators (Vicky
  Radcliffe, 58808794), enough farms for the population (Justa Badge, 47063541), numbered buildings (Sherevar, 11802;
  EltharinFireDragon, 153064), building counts per district to estimate population (Hubert Marceau, 28088976).
- **Beat it:** adopt FTG's content-first stance — households, trades, institutions and venues assigned to lots by rules
  over the per-lot context vector (lot area and shape, frontage and street class, district type and venue mix, wealth
  gradient, distances to centre/market/gate/water, terrain); population derived bottom-up; a gazetteer with every
  building numbered and addressable; landmarks generated and placed by rule.
- **Measure:** every building has a function and occupancy; venue counts per 1 000 inhabitants within calibrated ranges;
  gazetteer completeness 100 %; landmark placements satisfy their rules (e.g. market cross at the main junction).
- **Over-correction risk:** the map must stay a clean plan — content lives in data, hover and export, not as clutter;
  the creator's test, maps that "look better" but do not "provide more information per square unit" (59046807), applies.

### SIM-2 · Buildings are undifferentiated blocks; the building-detail supplier was never wired in [S3-hook]
- **Who:** US×9 · CR · REC.
- **Evidence:** default buildings are flat grey blocks with no function styling (visual-spec §1.4); Procgen Mansion
  integration requested repeatedly and declined — "Procgen Mansion was initially created more or less for this purpose"
  (101529), "it's not easy to implement and performance is just one of the problems" (123268); right-click-to-mansion
  exists but "buildings are smaller on a city map" (100431269). Users (B4): arlechinu, Hubert Marceau, Navylegokid,
  headzombie, Marius, Kevin Cork, T Mexx ("right click in ANY building for its floor plan"), Javin Bond, Quenten Walker
  (farmhouse with an adjacent barn); ruins (Rocky Weaver, 64375271). REC: `Complex` display mode already assembles
  buildings from rectangles (ST-7).
- **Beat it (hooks only):** a building is a composition generated lazily from the lot's own sub-seed behind a
  building-generator interface; class rules as data read from the per-lot context vector; level of detail outline →
  wings/roofs → rooms.
- **Measure:** class-diversity index per district; share of buildings whose class is set by rule (100 %); lazy
  generation cost per building on zoom.
- **Over-correction risk:** the base must not pay — a trivial outline builder satisfies the interface until stage 3.

## 12. UX and workflow

### UX-1 · Hidden features, confusing state and fragile web delivery [BASE]
- **Who:** US×12 · CR · REC.
- **Evidence (B10):** SVG export hidden under Settlement (sehrgut42, 219273; SophieNicole, 494692); City Viewer drag-and-drop
  import failed repeatedly, "this one causes too much confusion" (Quenten, psotos, 123268); the `~` key unfindable
  (Alresu, 123268); Chrome breakage (Cassilas, Merkron, youseef22, 101529); Enter vs Rebuild vs URL confusion (Tubal,
  47063541; Killians, 494692); the display-mode auto-switch "confused me" (Daniel, 61026228); fonts not selectable (Ransom
  Planet Games, 47063541); compass, legend and scale bar could not be repositioned (Allen Varney, 40345972); Copy URL
  shipped unable to reach the clipboard (47063541); permalinks impossible inside the itch iframe (2062). REC: option
  couplings (ST-0, ST-2) and style state leaking between sessions through localStorage (ST-11 hazard); no undo outside the
  warp commit (22717 roadmap).
- **Beat it:** one explicit state model (blueprint + edits + style); clearly separate "Regenerate (keep settings)" and
  "New random"; undo/redo; discoverable export; option-interaction tests; CI on the major browsers.
- **Measure:** scripted usability tasks completed without help; zero hidden option couplings in the test matrix; undo
  depth; browser matrix green.
- **Over-correction risk:** the minimal chrome, the context menu and the Shift/Ctrl-click idioms are loved
  (`mfcg-devlogs-b.md` §4.1) — keep them.

### UX-2 · Users finish their maps in other programs, and the exports fight them [BASE]
- **Who:** US×8 · CR.
- **Evidence:** workflows through Inkscape (Silent Observer, 102377277; BadgerFiend, 219273), Affinity Designer (John
  Doty, 55050649), Wonderdraft and Krita (Hubert Marceau, 29538966; Will, 61026228), Wonderdraft/Dungeondraft/Inkarnate
  (Fotis Stamatelopoulos, 87882877), Photoshop, Campaign Cartographer and Inkarnate (voters on 43602231), Blender and Unity
  via OBJ (headzombie, 123268), assembled "slices" (Robert Conley, 59046807); asks for transparent backgrounds, separate
  outline colours, a street layer, masks and correct SVG framing (Tom, 91172: "editing every exported file manually").
- **Beat it:** layered, semantically grouped SVG (one group per layer and class, with ids), a transparent-background
  option, per-role colours, correct framing and crop.
- **Measure:** every layer and class separable in the export; export presets for common editors; zero manual re-framing.
- **Over-correction risk:** keep the one-click PNG for users who just want a picture.

## 13. The 15 highest-value improvement opportunities for this reference

Ranked by demand × impact × how many other improvements depend on it; base items first. Every row names the weaknesses
it answers and its headline metric.

| # | opportunity | answers | scope | headline metric |
|---|---|---|---|---|
| 1 | **Terrain- and water-first pipeline**: heightfield + hydrology (rivers with confluences, deltas, islands, lakes, moats) exist before the settlement mesh; no whole-city restarts | ROB-1, GEO-4, GEO-5 | BASE (drainage feeds the sewer hook) | 0 restarts per 1 000 benchmark cities (reference: 24 in 58 attempts); 8/8 water configurations; building ∩ water = 0 |
| 2 | **Hierarchical, destination-driven street network** (FTG-style staged backbone) fused with MFCG-style fabric subdivision, in metres | GEO-1, VAR-2, DAT-2 | BASE — the fusion core | network statistics exported per city; 100 % of through-roads reach a named destination |
| 3 | **Frontage-first plots** in real units, each with an access edge | GEO-2, GEO-6 | BASE (the stage-3 input) | ≥ 98 % lots with access; side walls ±5° of perpendicular (median); 0 slivers |
| 4 | **Complete versioned blueprint + stable ids + hierarchical sub-seeds** | ROB-4, EDT-2 | BASE | identical model hash across runs and platforms; locality index ≥ 95 % after a single edit |
| 5 | **Invariant validation, local repair and a generation report** | ROB-2 | BASE | 0 hard-invariant violations; 0 silently missing features (reference: street failures in 38 % of cities) |
| 6 | **Robust geometry kernel** with declared degeneracy policies and fuzzing | ROB-3 | BASE | 0 crashes/hangs in a 10⁶-polygon fuzz per primitive |
| 7 | **Persistent document**: save/load, import of our own export, edit log as events | EDT-1 | BASE (the same event model serves evolution) | save → load → save byte-identical; 100 % of edits persisted |
| 8 | **Resolution-independent scene with semantic LOD and continuous zoom**; one renderer for screen and every export | REN-1, REN-3, PERF-1, PERF-2 | BASE (display for S2/S3) | 60 fps pan/zoom at 40 000 buildings; screen/PNG/SVG parity |
| 9 | **Land-use and content model on the per-lot context vector**: bottom-up population, gazetteer, rule-placed landmarks | SIM-1, GEO-7 | BASE — FTG fusion | every building has a function and occupancy; parameter jumps only at real boundaries |
| 10 | **Fortification system**: defensible traces, tower spacing in metres, gates at road crossings, several enceintes, lifecycle | GEO-3, EDT-4 | BASE (+ EVO hooks) | tower-spacing distribution; 100 % gates on through-road crossings |
| 11 | **District-to-neighbourhood seam contract** — one model at two scales | DAT-3, REN-1 | S2 readiness | 100 % seam street matches; block IoU city ↔ neighbourhood above threshold |
| 12 | **Constraint editing** with pins, undo and the assignment input | EDT-3, VAR-1 | BASE (+ assignment hook) | 12/12 recorded user edit asks, each with a locality guarantee |
| 13 | **Documented, versioned, standards-conformant export** with layers and stable ids; layered SVG for editors | DAT-1, UX-2, REN-2 | BASE (+ layer hook) | validates and opens in a GIS; round-trip import; per-layer files |
| 14 | **Label engine** (protected features, holes, multi-line, street names, pinning) and names grounded in the model | LAB-1, LAB-2 | BASE | 0 overlaps with protected features; share of names traceable to a feature |
| 15 | **Intent-level controls** expanding into documented parameters; hinterland sized to the population | VAR-1, VAR-2, GEO-8 | BASE | scripted tasks done without URL editing; farmland per capita in range |

Deliberately outside the top 15: the stage-3 building generator (SIM-2, hooks only), the evolution engine (EDT-4, hooks
only), relief rendering (optional, GEO-5), and the underground/sky layers (served by #1's drainage and #13's layers).

## 14. Restraint list — what MFCG gets right, and a better design must keep

1. One click to a believable city; a small visible control surface; tool count treated as a budget (22717; Reddit 9ygosn).
2. Legibility first: the minimalist inked plan, one ink for every outline, 4–8 colour roles, round joins and caps,
   casing + core ribbons (visual-spec §1.8, §6; `profile-mfcg.md` §10.3).
3. Walls, towers and a castle as the signature silhouette (1579).
4. Organic fabric: T-junction streets, shared courtyards, uneven facades, the ragged suburban falloff
   (`profile-mfcg.md` §4.9; `os-model.md` §8.5).
5. Mixed-use wards as venue mixes and hints, not modern zoning (1579, 46967).
6. Speed: the model in a fraction of a second (34104; EG-3) — the budget every improvement must fit.
7. Deterministic, replayable attempts (EG-3); names conditioned on the city's features (`profile-mfcg.md` §9); palettes as
   data (`profile-mfcg.md` §10.1).
8. Tiered failure handling with local repair where it already exists (the citadel equalize loop, `profile-mfcg.md` §11).
9. Shadows, relief and heavy detail optional (114858238 comments; 41711473).
10. Visual restraint as a rule: "busier is fine; noisier is not" (`watabou-extra-b.md` §4.8).

## Appendix A. Per-source harvest (raw weakness candidates, written as each source was read)

Tags: [CR] creator says so · [US×n] users say so (n distinct commenters) · [REC] our recordings show it ·
[OS] visible in the 2017 open-source ancestor (root-cause evidence only; the live build may differ) · [INF] inference.

### A.1 `_critic.md` + `_critic-os.md` (binding rulings that shape the ledger)

* Population is a flat multiplier: ≈ 6.12 persons per building, constant in [6.12, 6.13) across four readings (C1). No
  household, trade or wealth model sits behind the number [CR via readouts / INF]. → simulation & content.
* Voronoi lots (0.8.0) "crashes the generator occasionally", "disabled by default", "triangle looking quadrangles"
  (41711473, spot-check 6) [CR]. Twisted bisection produced "collapsed or intersecting edges" (87882877, spot-check 8)
  [CR]. The own straight-skeleton has "glitches in special cases", is O(n²) and hole-blind (101173551, spot-check 20)
  [CR]. → robustness / geometry.
* `Canal.deltaRiver` is a widened mouth, not a braided delta; a patron was still asking for a river-delta city in
  Aug 2026 (watabou-extra-b row 165462094; C15) [US×1]. → variety & control.
* Twisted-bisection constants (bend position, endpoint-edge choice, stop predicate, street-width law, reject filter for
  "weird" lots) are unrecoverable from every source (§6.4) — the reference's lot rules are not parameterised or
  documented for users either [INF].
* 2017 ancestor robustness (root-cause evidence): only `openfl.errors.Error` is caught by the retry loop; a failed cut
  (≠ 2 crossings) is a silent no-op returning the same polygon; a street `null` is fatal while a road `null` is silently
  dropped; `createAlleys` has no depth/area guard and `createOrthoBuilding` is `while(true)` (C1, S9, S13 of
  _critic-os) [OS]. The retry loop never reseeds and keeps the three flags drawn before it (§4.2) [OS]; _critic-os §4.3 says
  the live build reseeds per attempt — **superseded** by `profile-mfcg.md` EG-3 (read later in this lane): the live retry
  continues the same Lehmer stream and merely prints the stream state as the attempt seed.
* 2017 `Polygon.distance(p)` returns the distance from vertex 0, and every distance-based ward score uses it (row 113,
  87) [OS] — placement quality silently depends on vertex order.
* 2017 street routing is FIFO breadth-first with no heuristic; which of several equal-hop streets wins depends on the
  runtime's hash-map key order (row 140, S7) — a determinism hazard across platforms [OS]. Live open-set discipline is
  OPEN (C10).
* 2017 `buffer` leaves joints unhandled (reflex corners chamfered, crossings inserted twice) (row 114) [OS] — the class
  of offset artefacts later seen as "bad poly".
* 2017 size button draws from `Math.random()`, outside the seed (row 15) [OS] — a URL cannot reproduce a button roll
  unless the size is written into it.

### A.2 `os-model.md` (2017 ancestor pipeline; §14 = 2017 vs live trace)

* Retry loop has **no attempt cap and no fallback** ("try without walls"); structural flags drawn once before it, so a
  chronically bad seed "can spin a long time" (§11) [OS]. os-model §14 says the live build reseeds per attempt; **superseded** by `profile-mfcg.md` EG-3 — it continues the
  stream and prints each attempt's state as its seed [REC].
  A user-visible consequence: the published seed is not the seed of the city you see — the URL seed maps to "whatever
  attempt k succeeded" (§14, §15.8) [REC/INF].
* Known failure table (§12): 15 failure kinds; 4 → full rebuild, 3 **unhandled** (degenerate patch after junction
  collapse, broken circumference chain, non-`Error` exceptions), one silent (gate with no road) [OS].
* Street network = the Voronoi patch-edge graph, cost = Euclidean length, **no terrain, turn penalty or reuse bias**
  (§6.1, §15.9) [OS]. Streets can only run along cell edges → street pattern is a function of the cell mesh, not of
  destinations. Roads run toward a phantom point 1000 units out along the gate's radial from the world origin (§6.3) —
  roads lead to "the edge of the countryside", never to anything (no neighbouring towns, bridges, fords) [OS].
  Castle gates never get an outward road (§6.3) [OS].
* `tidyUpRoads` is greedy first-fit; joinable arteries are never merged (§6.4) [OS] → fragmented street polylines for
  export/labels. Street smoothing is one order-dependent Laplacian pass (§6.5) [OS].
* One patch = one ward in 2017 (§14) — districts cannot span cells; the live build adds `buildDomains` growing districts
  across cells [REC]. Ward deck: fixed 36-entry schedule, three adjacent swaps; beyond 36 patches everything is Slum ⇒ a
  size-40 city has a slum belt by construction (§7.2) [OS]. Ward scoring = simple distance/adjacency heuristics
  (§7.3), no economics [OS].
* Towers at **every** non-gate wall vertex, no spacing rule or target (§5.4) [OS]; gate count is emergent
  ≈ ⌊entrances/3⌋, never a target (§15.7) [OS] — later exposed as the `gates` URL parameter [REC, profile-mfcg].
* Suburbs never appear at size 6; 80–97 % per gate otherwise (§7.4) [OS]. Farms get no fields (2017) (§8.6) [OS].
  Market = one statue/fountain, no stalls (§8.6) [OS].
* No units in 2017 (`MAIN_STREET = 2.0` "units"; §15.10) [OS]; live added `UnitSystem` [REC].
* Streets inside the city are **never stroked** — they are the negative space between inset blocks (§8.1, §8.7) [OS]:
  street width is a per-edge inset constant (1.0/0.5/0.3), not a modelled street with a class, width and surface.
* Offset/boolean fragility: `buffer` keeps the largest loop; in-source comments grade `inset`/`buffer`/`shrink` as
  unreliable on concave shapes (§8.1) [OS]. The artery membership test falsely widens non-consecutive edges (§8.1) [OS].
* Determinism is one global stream: "any change of evaluation order anywhere changes every downstream map" (§1.1) [OS]
  → no locality: editing one ward's parameters would re-roll everything after it.
* The live trace (§14) shows watabou himself fixed many 2017 weaknesses (Delaunator, DCEL, PolyBool, OBB bisector,
  citadel repair instead of throw, tolerated street failures, per-tower radius, Chaikin/Cubic smoothing, districts,
  names). These are **parity items**, not improvements, for our design.

### A.3 `os-wards-render.md` (2017 ward geometry + rendering)

* **Ward character = four scalars** (`minSq`, `gridChaos`, `sizeChaos`, `emptyProb`) per class (§6.1–6.2, §13.9)
  [OS]. "MFCG has no explicit street-frontage rule at all — frontage is an emergent side effect of
  perpendicular-to-longest-edge cutting" (§13.9) [OS/INF]. → realism: houses do not systematically address the street.
* No minimum aspect ratio — "a long thin block yields long thin houses"; `minSq` is area-only (§4.5) [OS].
  An all-dropped leaf set leaves an empty block with no retry (§4.5, §11) [OS].
* Zoning = ~14 constrained placements against a random background: 21 of 36 slots (craftsmen) + park placed uniformly
  at random (§8.2) [OS]. Patriciate/Market see only earlier-placed wards (greedy sequential; §7 caveat 2) [OS].
* "Generate-and-reject at the whole-city level, plus one local retry loop. There is no local repair anywhere" (§11)
  [OS]. Slicers have no depth cap (§4.5, §5.4, §13.6) [OS].
* Two rendering idioms: inside the walls streets are negative space, outside they are stroked casings (§9.3) [OS].
  A consequence for any export: inner streets have no geometry of their own in 2017.
* Absolute world units: a metropolis has the same house size as a small town, just more of them (§13.10) [OS] —
  **a strength to keep** (consistent zoom), noted as an over-correction risk.
* Ward geometry is built once, globally, after assignment — incremental edits must invalidate `getCityBlock` when
  arteries or walls change (§13.8) [OS] → editing locality has no support in the model.
* Class/label mismatch ("Temple" for Cathedral, §6.4) [OS]; hover tooltip is the only per-ward information (§9.6)
  [OS].
* Buffer offsets leave chamfers at reflex corners and "weird steps" for mixed distances (author's own comment, §1.3)
  [OS/CR-in-code].

### A.4 `mfcg-posts-a.md` (Patreon City, 2019-06 → 2021-02, MFCG 0.7.0–0.8.1)

* **No zoom** — "I know it's a big flaw, but there are technical reasons for it" (27564017 comments, 2020-06-12)
  [CR]; repeated user request "the ability to zoom… I sometimes don't want an entire town, just a local map"
  (47063541), answered "harder to implement than it seems" [US×1+, CR] (T22). → rendering/scale.
* **No save/load; URL round-trip is lossy** — "any changes made to a city are not encoded into the resulting URL, so
  it's not a replacement for a real save/load feature" (47063541) [CR]; landmarks "probably not super-useful" without
  save (38048182) [CR]; Copy URL shipped broken and was hot-fixed twice (T22) [CR]. → editing/data model.
* **Hard shape invariants** the creator lists himself via City Painter (39697187, T19): city circular and
  single-cluster; roads radial; exactly one ring wall; at most one castle; no islands, river islands, confluences,
  ponds [CR]. Shoreline was "always a rough parabola" until noise coasts (29813424, T8) [CR].
* **Castle = exactly one mesh cell**; castle size not adjustable except by warping/bloating (41711473 comments) [CR];
  open requests for big/small/keep control, castle-ground size, plaza attached to castle (41711473) [US]. Inner castle
  "one of the most frequently requested features … surprisingly hard … I'm not entirely happy about how they look …
  easier and more correct … as a separate class of objects" (40345972) [CR + US×many].
* **Warp is vertex-only**: "You can't change the topology of a mesh, you can't merge or split cell" (41711473) [CR];
  mesh hygiene tools (Relax/Equalize) exist "to automatically fix weird shapes" (40345972) [CR] → degenerate cells are
  a user-facing problem. City Painter post-mortem: "Drawing over a mesh with large cells turned out to be not user
  friendly at all … you need to adjust that mesh" (40345972, 39697187) [CR].
* **Rivers overlap buildings** after the curvilinear-river change, "will be fixed in the future" (40345972) [CR]:
  water carved independently of block filling, no reconciliation pass [INF].
* **Old bisection lots → "a lot of triangles (or 'triangle looking quadrangles')"**; Voronoi replacement "results in a
  fair amount of weird shapes" and "crashes the generator occasionally", shipped off by default (41711473) [CR]; a
  separate "No triangles" style flag exists as a mitigation (T15) [SHOWN].
* **Farm scarcity vs realism**: user "It never feels like there are enough to support the population"; creator
  "In reality cities should be surrounded by farms, but it just doesn't look interesting" (47063541) [US×1, CR];
  a farm-count parameter was promised [CR].
* **Curved streets cut**: "works very differently … adopting it will affect all parts of the generator" (29813424) [CR]
  → street pattern locked to mesh-edge chains; architecture could not absorb a new street model.
* **Complex-coast experiments broke roads**: "roads are not built when there is a city wall" (29813424) [CR].
* **Road-count UI bug**: count forgotten on Enter; "That piece of logic with the number of roads and rebuilding etc is
  very confusing" (47063541) [US×1, CR] → parameter/regenerate state model is confusing even to its author.
* **Export**: GeoJSON abandoned for "GeoJSON-like" ("My discontent with GeoJSON is just too strong", 37407181) — user
  pushback for standards / CityJSON, a patron wrote a translation script [US×2, CR]; height-maps not exported [CR];
  PNG export regression on maps with water (40345972) [US, CR]; transparent-PNG request (29538966) [US×1]; font not
  user-configurable, request left open (47063541) [US×1].
* **Labels**: "There are no multi-line labels in MFCG"; arced labels "far from perfect … Simplicity is its advantage"
  (27776897) [CR]; holes/branchy shapes acknowledged hard cases [CR]; overflow when name longer than span unstated.
* **Landmarks are not generated**; JSON list of names is "placed randomly across the city" (38048182) [CR].
* **Elevation deliberately not drawn** ("such features are rarely present on city maps anyway", 41711473) [CR] while
  height maps exist internally (T17, T23).
* **3-D viewer: "there is literally nothing beyond the map borders"** — roads and water end at the map edge (37407181)
  [CR].
* **Platform-dependent warp** ("better on the pc version", 27564017) [US×1].
* **Creator on stability**: "that algorithmic basis keeps changing and today it is not more stable than it was 2 years
  ago" (46685301) [CR]; UI redesign "should have been split into several iterations" [CR].
* Strengths to keep (over-correction risks): simplicity over perfection; aesthetics over realism where they conflict
  (farms, compass, elevation) (§4); minimalistic look; one-click generation.

### A.5 `mfcg-posts-b.md` (Patreon City, 2021-03 → 2025-02, MFCG 0.8.2–0.11.4)

* **Twisted-bisection fragility, stated by the creator**: "my implementation of it is not [simple]. For complex concave
  shapes it often produces far from perfect results and such defects as collapsed or intersecting edges can easily
  break it completely" (87882877) [CR]. Failure taxonomy he publishes for 0.10.0: (1) empty areas where they clearly
  shouldn't be, e.g. inside walls → user rerolls with shift/ctrl-click; (2) "Generator not responding" — exception
  escapes; (3) "Browser not responding" — unbounded loop, kill the tab (87882877) [CR]. 0.10.1: freezes gone, "very
  occasional" crashes, empty-area glitch "hard to fix" and remains (98918904) [CR]. User crash report with permalink:
  `Cannot read properties of null (reading '0')`, "the variable rect ends up null" (61026228 comments) [US×1];
  creator: "since the 'twisted' method is very new, I'm sure there will be more" [CR].
* **Option sprawl, admitted**: "too many of them … I don't see a single combination … which would be definitely the
  best" (61026228); display-mode auto-switch "not a perfect solution (for many reasons)"; four options deleted in
  0.11.1; a user protested the loss of favourite combinations (102377277) [CR, US×1]. "there are too many parameters in
  this generator as it is" (widths/sizes not editable) [CR]. → variety & control needs a better control model, not
  more checkboxes.
* **Persistence gap, restated 2024**: "No manual changes made to a map are encoded into its URL (apart from the city
  name) … currently there is no way to save those changes"; landmarks loadable but not savable; a user reports a
  permalink round-trip "subtly changed the city geometry" (102377277) [CR, US×2]. Documented user workaround: export
  SVG twice (labels on/off) and edit in Inkscape (102377277) [US×1].
* **JSON is one-way**: "can't be imported back … City Viewer" only (62336213) [CR]; schema drift broke City Viewer at
  `addWall` (2026 comment, 114184619) [US×1]; district view exports PNG/SVG of the district but JSON of the whole city
  (101942512) [CR].
* **Real zoom "too difficult for a specific technical reason"**; District View is the substitute, drawn "exactly in the
  same way … no cupolas, shadows, cobbled roads"; "often looks disjointed with pieces of rivers, roads, city walls" —
  dashed border as a patch, "I'm not sure it's a good solution" (101942512) [CR]; "real zoom is still impossible"
  (100431269) [CR]. → rendering/scale: level of detail does not increase when you look closer.
* **NG integration rejected**: "not hard to pass a shape, but … NG lacks rivers, city walls … I lost interest in NG"
  (100431269) [CR] → the city and neighbourhood models are not one model (stage-2 readiness gap).
* **Water system dated**: "looks pretty dated and primitive even comparing to Village Generator … any land-water
  configuration including one or more islands, confluence of rivers" (61026228, Jan 2022, still unshipped) [CR];
  "People have been asking for river confluences and islands for a long time … more interesting coasts and wide rivers"
  (98918904) [CR + US×many]; island city "No, but something like that is next on my list" (101942512, 2026) [US×1, CR];
  "The existing bays always seem unusually narrow" (61026228) [US×1]; headlands removed as "ugly" (109852547) [CR].
* **Inland road orientation arbitrary**: roads align with a region map only for coastal towns; "For inland settlements
  it doesn't work" (79147510) [CR] → no external-context input (neighbouring roads/destinations).
* **Scale untrustworthy**: "Dimensions are a mess in all my generators. Don't use them for planning anything real"
  (79147510) [CR]; Procgen Mansion cell ≈ 3 m; 2×2 m and 4×4 m buildings both render as a 1-cell shack [CR].
* **Forests**: oldest outstanding request (since 2017) [US×many]; off by default; fill all remaining space; "on large
  maps forest edges look too straight" (114184619) [CR]; forests broke PNG export, fix "based on some assumptions which
  I can't really verify", maps with forests export at lower resolution (121415691) [CR].
* **Rendering defects left standing**: gable roofs look like "greenhouses" with Raised (101942512) [CR]; roofs "too
  smooth, like plastic" (114858238) [CR]; secondary plazas "look ugly" (79147510) [CR]; roofs were wireframes, faces not
  filled (101942512/114858238) [CR]. Shadows/3-D projection rejected for readability and "10x more polygons"
  (114858238) [CR] — readability is the creator's binding constraint (keep it).
* **Outline colour coupling**: "everything is outlined in the same 'Dark' colour" (61026228 comments) [CR, US×1] —
  later partly fixed (0.9.1 per-class outline toggles).
* **Local churches used to disappear after rerolling a ward** (87882877) [CR] → reroll did not preserve attached point
  features (lifecycle bug class).
* **Technical debt, stated**: "getting more and more difficult to add new features … rewrite it from scratch, or at
  least … a thorough refactoring" (79147510) [CR]; 0.10.0 refactor: "most problems of this version are caused by the old
  code" (87882877) [CR]; shipped as an alpha at a separate URL [CR].
* **District-wide streets were the fix for visible cells** — "every street is contained within its patch" before 0.10
  (87882877) [CR]; the "illusion of streets following some kind of underlying landscape. There is no underlying
  landscape" [CR] → street patterns are not driven by terrain.
* **Size semantics opaque**: `size` counts cells; Medium re-defined from 12–25 to 20–40 patches in 0.10.0; users
  discover "size=60 is a good large medium" (121415691) [CR, US×1].
* Strengths to keep: readability first; cross-generator visual coherence (NG look at city scale); shadows optional;
  honest known-defect list.

### A.6 `mfcg-devlogs-a.md` (itch devlogs 2017–2019 + External-sources addendum)

* **Triangular buildings = "the single most-discussed defect of the first year"**: "I can't eliminate them completely"
  (1367); "unfortunate and unintentional … a rather silly algorithm" (1579); Block view offered "for those of you who
  are annoyed by triangular houses" (2062); "an obligatory item of every change log" (22794) [CR + US×many]. Fix
  arrived via lots-then-buildings (0.5.3) [CR]. A user (`agnate`, 1367) proposed the fix: triangular lot as fence,
  rectangular building inside [US×1].
* **Constraint relaxation instead of rejection, for speed**: adjacent plazas / non-rectangular plazas (`llynglas`, 3091)
  — "I can change it to discard such layouts but it will increase generation time"; "with the current algorithm there
  is not much I can do" (3091) [US×1, CR]. Plaza = a mesh cell, so it is only as rectangular as the cell [INF].
* **Abrupt parameter jumps across a street**: "on one side of a street buildings are tiny and on the opposite side
  buildings are huge" (34104 comment, itch 422446) — "Continuous" option blended parameters, then removed in 0.5.5
  ("I think nobody cared about it anyway", 59798) [CR]. → a measurable seam defect with a known remedy.
* **Gate wards in the centre of town / too many** (`Colt Hack`, 46967) [US×1]; creator: "replace them all with
  something more subtle in the future" [CR].
* **Coast**: "far from perfect — sometimes not suitable for a real coastal settlement and almost always lacking
  interesting features such as bays and peninsulas" (4923) [CR]; "bitten apple" shape [CR]; water had "a serious
  negative impact on performance" [CR].
* **Rivers (0.5.0)**: one per map, constant "not very large" width, cannot loop ("so I can't make a moat of it");
  "generation takes much more time" (11802) [CR]; roadmap asked for multiple channels, tributaries, looped channels
  (22717) [CR]; rivers often missed the town before 0.6.0 [CR].
* **Warp**: "you can't create an island or add a new road … applying too much distortion may cause glitches" (22794)
  [CR]; undo history was a roadmap item for a desktop app (22717) [CR].
* **FMG interop defects**: "the roads and coastlines don't tally exactly with the overworld" (`Glidias`) and a
  World→City→World round trip loads a different world (`Distraction Tactics`, 46967) [US×2]; the boundary is a lossy
  URL vector [INF].
* **Road-centric experiment rejected** (31287): "Many things are much harder to implement with it … performance …
  Merging these two techniques also seems problematic" [CR] — the creator's own verdict on fusing growth-based and
  block-based street generation. Directly relevant to our MFCG+FTG fusion thesis.
* **Dual-renderer tax**: "all the 'drawing' needs to be implemented two times — as 'screen drawing' and 'svg drawing'"
  (85275) [CR]; bitmap export "larger than ~8MP is problematic" (11802) [CR]; hatching was bitmap-filled, slow, moiré on
  non-retina screens (Reddit 6cg1ol) [CR].
* **Per-building numbering rejected on performance** ("hundreds" of houses would "affect performance badly", 11802)
  [CR]; "memory leaks … depending on a browser" (34104) [CR].
* **Elevation effect invisible**: "Some people on Twitter say that they don't see the difference though" (67134)
  [US×some, CR].
* **Farm fields**: "If you think they are drawn incorrectly, then you are not alone" (59798) [CR]; crowd fixes —
  smaller, size-diverse, grouped, visible borders (Reddit a1wx6h) [US×several]; hedges rejected on a consistent-LOD
  argument [CR].
* **Labels**: "far from perfect" (34104), "Still far from perfect" (46967), "not perfect … especially curved ones … all
  the techniques are invented from scratch" (85275) [CR].
* **Wall-less towns**: "the borders are too well defined" (Reddit 6cg1ol) [CR].
* **Community demand signal** (22717 comments): editable/named districts, POI marking with icons and descriptions, a
  demographics generator tied to city size, an open export format [US×many]; a JSON export exposing "the voronoi
  structure/neighbours" (`Glidias`) [US×1]. Creator roadmap items never shipped: multiple nested/independent wall sets,
  flexible castle placement / multiple castles, looped rivers, topography/topology editors, custom ward lists, POI
  generation (22717) [CR].
* **Permalinks impossible on itch** (iframe cannot reach the address bar, 2062) [CR] — a hosting constraint that shaped
  state handling.
* **Ward reroll (0.5.1)** keeps type and shape, re-randomises the interior (19034) [CR] — the reference's only
  locality guarantee; our design must at least match it.
* Strengths to keep: "One click to a believable map" (22717); "walls make a pile of polygons look like a fantasy city
  map" (1579); labels are hints, venue mixes not zoning; generation "a fraction of a second" (34104); tool count is a
  budget ("too many buttons", 9ygosn); consistent level of detail per style (a1wx6h); buildings never touch the curtain
  wall (8jkf7z).

### A.7 `mfcg-devlogs-b.md` (itch devlogs 2019–2025, 0.7.1–0.11.4)

* **No zoom for years because of the drawing engine**: "due to implementation details of OpenFL … I can't implement
  zooming" (91172); "technical issues" (219273, 494692); **three separate users asked over ~4 years** (§5) [CR, US×3].
  Framing therefore had to be solved at generation time (§2.4) [INF].
* **Framing/export page**: "the SVG is always portrait and includes a lot of empty space. That means editing every
  exported file manually" (`Tom`, 91172) [US×1]; 0.7.2 "chooses a 'window' … more correctly" [CR].
* **Edit model gaps (§5)**: districts cannot be added ("I can't say how far this future is") or deleted ("No. What would
  be on its place?"); roads cannot be added or removed after generation; labels cannot be moved ("currently labels can
  only be placed automatically", 494692); district names not persisted in the URL (91172); a city cannot be re-imported
  (494692) [CR, US×several]. Hand-placing farms/bridges/buildings "planned … for the desktop version (but not for the
  web version)" (91172) [CR].
* **District colours cannot be chosen** — "assigned randomly", no parameter ("Nope.", 494692) [CR, US×1].
* **Three incompatible notions of size**: URL `size` (cells), building count, population (≈6.1 × buildings); FMG passes
  `size = population / 1000` and a 6 387-person city arrives "a little overcrowded" (123268 comments) [US×1, CR]
  (§2.19). Practical ceiling: "Cant Load Town Of Over 100K People" (≈16 000 buildings, 0.11.0 comment) [US×1].
* **Scale admitted wrong**: user complains single trees are >25 m across; creator: "The scale in the generator is
  probably wrong. Buildings often seem way too large" (345262) [US×1, CR].
* **Line widths are screen units**: "the thickness of lines doesn't depend on a map scale, so you may want to choose
  'thin lines' for large cities" (101529) [CR] → manual per-size style fiddling.
* **Discoverability**: SVG export hidden under Settlement > Export as — "two separate commenters hunted for it" [US×2];
  City Viewer import by drag-and-drop failed for four commenters ("causes too much confusion") [US×4, CR]; `~` key
  unfindable on non-US layouts [US×several].
* **Browser fragility**: Chrome-specific breakage reported by three users at 0.7.2 [US×3]; 0.7.3 fixed "an ugly bug which
  occasionally caused a pretty serious computer freeze" (112574) [CR]; "I can't be 100% sure that exactly that bug is fixed" [CR].
* **River bug**: river with both ends on the coast (0.7.3) [CR] → no guaranteed inland source.
* **Format drift**: "now it just resembles GeoJSON without being compatible with anything" (576591); QGIS could not read
  it; a third party maintains a PHP converter back to GeoJSON [US×2, CR]. CityJSON considered, dropped [CR].
* **Requests declined**: STL export for 3-D printing [US×1]; Procgen Mansion integration requested three times ("not
  easy to implement and performance is just one of the problems") [US×3, CR] — the building-detail supplier was
  designed for this and never wired in. Directly relevant to our stage-3 hook.
* **POIs lost on regeneration**, not in URL or JSON (219273) [CR]; POI file format answers are inconsistent (JSON array
  vs one per line) [CR].
* **Castle height ∝ city size** in City Viewer "on purpose … more 'fairy-tale'. Ideally it should be customizable"
  [CR] — an authored heuristic users asked about [US×1].
* **Legend deliberately made immovable** in 0.7.2 (later movable again) [CR] — degrees of freedom removed for looks.
* Strengths to keep: Shift+click reroll / Ctrl+click reset idiom (§4.1); modal Warp with Enter/Esc commit/discard
  (§2.16); "one-ink discipline" (single Dark outline colour keeps maps coherent, §3); plaza centre dot signature;
  ship-small, honest changelogs.

### A.8 `profile-mfcg.md` (recordings of the live build 12710731, incl. gates and styles addenda)

Robustness (all [REC]):
* **River course search is generate-and-test with a whole-city restart**: size 80 + river + coast needed **10 attempts
  for 3 cities (7 of 10 attempts restarted)**; failed attempts logged 35–41 `discard`s; successful ones 1–11 (§4.6,
  §11). Each wasted attempt re-runs Delaunay + DCEL + walls + streets (≈10–30 ms), and the seeded run's `readyAt` was
  3.7–4.0 s vs 0.2–1.2 s for a cold small city (§4.6, §7.1).
* **Geometry failures also restart the whole city**: `City.hx:156: *** CRITICAL: A bad poly was provided for
  besecting` in 3 of 16 Enter cities, alongside 12 canal restarts in 4 of them (ST-8). The catch-all encloses wards and
  geometry, so a single bad polygon throws away an entire finished layout.
* **Silent partial failures are accepted as output**: `Unable to build a street!` is logged and ignored — city B1
  (size 80) had **8 street failures, 0 outer roads and 0 farms** and was delivered (§4.5, EG-2 signature table)
  [REC]. `(0) Failed to make a cut` leaves a node uncut; `Failed to create a non-empty alleys group` yields nothing;
  `District.hx:175: Hole in a group, we need to split it` (EG-3, ST-8). Nothing tells the user a feature is missing.
* **`gates=0` gives a sealed city with no fallback**: no road reaches the map edge; 15 farmhouses outside with nothing
  connecting them (EG2-5) [REC] — the generator accepts a settlement no one can enter.
* **No locality under parameter change**: changing only `gates` (0/1/4/9) keeps the wall and castle but **re-rolls
  streets, wards, districts, buildings, fields and the city name** (Redchurch / Littlerock / Oldvale / Scribes Grove)
  (EG2-4) [REC]. Changing one knob gives a different town.
* **Enter drops explicit parameters and rolls new options from a non-seeded source**: `gates=4` → Enter → `gates=-1`;
  size and flags differ between two passes that share the same successor seed (EG-3) [REC] — the 2020 user bug report
  ("forgets the number of roads", 47063541) still describes 2026.
* **Re-render is not deterministic**: tree crowns are re-picked on every render from the un-reset seeded stream;
  `addGables`/skeleton counts differ by a few units between two renders of the same city in 4 of 6 pairs (ST-2, ST-3)
  [REC]. Only whole-page reloads are byte-identical (EG-3).
* The retry loop continues the Lehmer stream (EG-3, corrects os-model §11/§14): any attempt is replayable from its
  printed seed — a strength to keep (debuggability), but the user-visible seed is not the attempt seed.

Scale & performance [REC]:
* Model is cheap: `buildGeometry` ≈ 19.5 ms + 7.5 µs × buildings (R² 0.974), everything else ≤ 30 ms up to size 80
  (EG-3). **Rendering costs as much as generating**: 170–230 ms per frame of Canvas2D replay at size 80, ~140 000 draw
  entries per frame, text 40–73 ms with an outline-filter shader pass, `AudioContext.new` 136.6 ms of pure startup tax
  with no audio (§7.2).
* **No incremental redraw**: `TownScene.recreateMap → FormalMap.new` rebuilds the whole display tree on every
  regeneration (§10.5).
* Buildings grow ≈ size^2.9 across mixed-option cities because sprawl dominates large ones (EG-3); size 80 → 36 480
  buildings "read as texture rather than as individual houses" (§10.6) — the default view is illegible at scale.
* Tree scatter = 0.13–1.37 M point-in-polygon tests per city, the largest count in any step (ST-2). The forest canvas
  is 6133×5988, far larger than the 1500×1100 viewport (ST-2) — the likely cause of the forest PNG-export resolution
  cut the creator could not verify (posts-b 121415691).
* Street search: the A* open-set bookkeeping costs 15.8 ms of a 44.2 ms search (§4.5; FIFO vs priority OPEN per C10).

Rendering / labels / UX [REC]:
* Fixed 1500×1100 canvas; outline width `t` is in screen px (0.119 at size 25 → 0.905 at size 80) while street/river
  widths are world metres (§10.3) — at large sizes outlines swamp the streets.
* Streets and intramural alleys are unstroked gaps; "Show alleys" draws only the shanty-town sprawl's alleys, under
  the wards — in the walled core no pixel changes (ST-4). The one street layer users can toggle does not show the core.
* Labels occlude features: gate blocks and the keep hidden under labels (EG-1, EG2-1); labels standing across the wall
  (EG2-4); district labels are fixed 27 px, one `fillText` per letter (§10.2, ST-5).
* Style/UI state oddities: the Districts dropdown reads "Hidden" while curved labels are drawn (ST-0); the shipped
  `default.json` says `tintMethod: Brightness` but the app runs Spectrum (ST-6); Block display mode silently drops
  trees and forests although both options are on (ST-2); forests greyed out until trees are on (ST-0); style state
  persists in localStorage across sessions (ST-11 hazard).
* At size 80 the wall no longer encloses the city (sprawl has outgrown it) and the castle shrinks to a "tiny walled
  parcel" (§10.6) — no model of growth, no second wall, no suburb defences.
* Roads end at the canvas crop; with forests on, "roads … stop at the forest edge" (ST-2) — roads lead nowhere.
* URL surface: 14 keys; no `farms` key although farms are always built (EG-2) → a farms-off city cannot be linked.

Data model [REC]:
* The ward taxonomy collapsed to `Alleys` + specials; flavour lives in `District` (8 district types via the grammar)
  (§4.7, §9.2) — venue mix / function per building is not modelled at all; population = building count × ≈6.1.
* Tree positions are model data cached per city (ST-2), but roof detail and crowns are render-time randomness.
* Strength to keep: tiered failure policy (repair / local retry / skip / restart) (§11); `Random.save/restore` isolates
  sub-generators so geometry does not consume the main stream (EG-3) — the basis of per-ward reroll; palettes as data
  (§10.1); one-ink discipline; casing+core ribbons (§10.3).

### A.9 `visual-spec.md` §0–§1, §5–§7 (MFCG style from our recordings)

* **1× device pixels, no HiDPI**: one 1500×1100 DOM canvas, `cssW = W` (§1.1) [REC] → exports and on-screen view are
  soft on retina displays; the 2017 hatching moiré complaint (Reddit 6cg1ol) is the same root cause.
* Each ward is rasterised to one cached texture (46 000 fills → 590 uploads) (§1.1) [REC] — good for speed, but means
  the view cannot re-level-of-detail per zoom (consistent with "no zoom").
* **Buildings carry no roof, ridge or per-building colour in the default style** — "MFCG buildings are flat grey
  blocks" (§1.4) [REC]; building size in Feygate ≈ 13–14 m across at the measured scale (§1.4) [REC], consistent with
  the creator's "buildings often seem way too large" (345262).
* **Water = one flat polygon with a hairline coast: "no beach, no ripple, no depth ramp"**; river = constant-width
  stroked polyline (§1.5) [REC]. Fields have no boundary stroke; at metropolis zoom furrows degrade into stipple
  (§1.6) [REC]. At metropolis zoom roads collapse to "a fine double line" (§1.5) [REC].
* **Title has no halo** (legible over water only because water is mid-grey) (§1.7) [REC]; district labels one glyph
  per `fillText` with a bitmap-filter halo (§1.7) [REC].
* World-unit ↔ metre constant ≈ 3.7 m/unit derived from the grid; a different reading would halve it (§7.10) [INF] —
  the reference exposes no trustworthy unit.
* Strengths to keep (§1.8, §6): round joins/caps everywhere ("most of MFCG's soft, inked feel"), the casing idiom,
  flat 4-ink palette, screen-space furniture layer, cache per group not per primitive, strict layer order.

### A.10 `os-geometry.md` §1.4–§1.5, §4–§6, Critic-2 addendum (2017 kernel robustness)

* **"The primitives are permitted to be fragile because the top level retries"** (§1.4) [OS]; the loop is unbounded,
  and a seed that fails deterministically is "an infinite hang with no diagnostic" (§1.4) [OS/INF]; the addendum
  narrows what is caught (C1) but not the unboundedness.
* Numerical weaknesses ranked (§4): NaN circumcentre on horizontal edges; in-circle by `distance < r`; exact `== 0`
  float tests; identity-only topology; NaN-swallowing `sign`/`gate`; parameter-space `DELTA` whose world tolerance
  scales with edge length [OS]. Complexity: Voronoi O(n²) rebuilt 4×, `buffer` up to O(n³), `aStar` O(V²) (§4) [OS].
* The author's own §5 replacement list is effectively a 2017 weakness list: robust predicates, Clipper-class
  offsetting, a heap-based shortest path, split named RNG sub-streams "stops feature work from re-rolling every seed",
  bounded retries with deterministic per-attempt re-seed and surfaced failure (§5) [OS/INF]. Keep list: compactness
  gates, `fuzzy`, per-edge half-street insets, `cut(gap)`+`peel`, pinned smoothing, centre-dense spiral seeding,
  two-pass casing (§5).

### A.11 `watabou-extra-a.md` (selected sections)

* **Straight segments are the main tell of a generated map**: "When looked from a distance, lack of curves is one of
  the things distinguishing generated maps from real ones most prominently — everything consists of straight
  segments. Curved district labels … were designed to hide it" (28088976) [CR].
* **Plain recursive bisection reads as a binary tree**: bent cuts were preferred because "its simple recursive nature
  is less visible for the naked eye" (58808794); plain cuts "are usually straight", and the bend exists "to start and
  end at the right angle to the edges of the polygon" (49191011) [CR]. Bent bisection was "too slow and too unstable"
  for MFCG in 2021 (58808794) [CR]; "occasionally they spawn very weird ones which need to be filtered out" (58808794)
  [CR].
* **T-junctions dominate**; user critique asks for planned wide streets crossing in X-shapes with organic infill
  (Heath Rezabek, 49191011 comments) [US×1] — the reference cannot express a planned street hierarchy.
* **Lots at arbitrary angles**: the creator is "no longer content" with 2018 building generation and wants "side walls
  … perpendicular to the street" (28088976) [CR].
* **Curved streets task "much, much more than just drawing curves"**, "too risky" to retrofit → moved to a separate
  generator (30565716, 34822131) [CR] — architecture could not absorb the street model it wanted.
* **Architecture instability gates features**: save/load waits "before the architecture is stable (currently it is
  not)" (32650629 comments); user-placed castles blocked because the feature "is closely intertwined with the basic
  architecture … changing constantly" and "people started asking about it more often" (34822131 comments) [CR, US×many].
* **Strongest recurring request in this slice: MFCG districts rendered at NG fidelity, stitched into a whole city with
  matching roads across seams** (58808794 / 59046807, multiple users) [US×several]; creator resists on visual-noise
  grounds (§5) [CR]. = our stage 2.
* NG maps "look better, but they don't provide more information per square unit" (59046807) [CR] — detail vs
  information density is a named trade-off.
* Ruined buildings requested; "in MFCG everything is pretty abstract" (64375271 comments) [US×1, CR] → building state /
  lifecycle is absent.
* MFCG did not export trees in 2020; OBJ export only buildings + walls merged into one mesh (§2.17) [CR].
* Users want monochrome styles to **round-trip into Photoshop / Campaign Cartographer / Inkarnate** (43602231 comments)
  [US×several] → export-for-editing is a real workflow.
* PS contrast worth noting: roads as a relative neighbourhood graph with connectivity guarantee and **"virtual towns"
  off-map** so maps look "less like board games" (60165082, §2.11) [CR] — MFCG roads point at nothing.
* The open-source ancestor is frozen ("Won't happen anytime soon", 60165082 comments) [CR].

### A.12 `watabou-extra-b.md` (selected sections)

* **The creator's own later architecture diagnoses MFCG**: Urban Places builds on a persistent, displayable,
  editable, warpable **base mesh** where water and walls are painted cell attributes, rivers are "fixed" to uniform
  width, and an editor "can be implemented relatively easily" (T23, 136013772/138099329) [CR] — the things MFCG's
  bisection-first model made hard.
* **Twisted bisection rejected for streetwalls**: "This method has some issues and here they were too obvious (more
  obvious than in the city generator)"; VG-style spaced rectangles "fail to form a streetwall" (T24, 141198168) [CR].
  Twisted bisection with holes "still pretty glitchy" (T1, 70917627) [CR].
* **City walls are a judgement problem**: "There's nothing special about the algorithms, but for a long time, all the
  results looked wrong" (T25d, 139540343) [CR].
* Straight skeleton: own O(n²), "glitches in special cases and I hate dealing with special cases"; roof ridges good on
  medium maps, bad on small (imperfections visible) and large (noise) (T3, 101173551) [CR]; gable variant "works well
  only with 'clean' shapes" (T4) [CR]; hip roofs judged uglier than NG's fake gables (T5) [CR].
* Labels: "The 'arced' labels in MFCG and PS are not great" (101173551) [CR]; skeleton labels ignore holes (a village
  inside a forest gets overlapped by the forest's label), curve too wildly, sometimes drawn incorrectly (T6,
  109092851) [CR]; label collisions and compass/label overlap (T8, T9) [CR].
* **Integration expected to be lossy**: "Most likely, it won't be possible to reproduce a district in Neighbourhood
  Generator exactly as it looks in MFCG, and it really bother me" (70917627 comments) [CR]; a power user's wishlist:
  per-building objects in JSON so a mansion can be dropped into a neighbourhood, neighbourhoods into cities, cities
  into the realm map, SVG masks per layer, layered UV-mapped OBJs (103335095, Javin Bond) [US×1].
* **Economic character requested twice, unanswered**: tags changing density, building size, proximity and alley
  frequency (141198168, T Mexx) and socio-economic neighbourhood classes (70917627) — "there aren't many tools for
  this: it can only choose different values for the minimum and maximum street widths, the average building and block
  size" [US×2, CR].
* **River-delta MFCG option** asked again in 2026, still unbuilt (165462094) [US×1].
* Custom names cannot be saved (PS, 93887809) and editability is "bolted on late and is expensive" (§4.13) [CR].
* Strengths to keep: parameter expansion (few exposed knobs → many internal parameters, part stochastic, T28);
  stencil rendering to avoid draw-order decisions (T27); shared library with per-product tuning (T31); "busier is fine;
  noisier is not" (§4.8); readability first.

## Appendix B. User-voice tally from the raw comment threads

Source: the `## Comments` section of every `research/patreon/watabou-city/*/post.md` (30 posts; 13 with no comments) and
every `research/devlogs/medieval-fantasy-city-generator/*/post.md` (46 directories; 28 with no parsed comments), read in
full; plus the city-related comments (keyword filter: city / MFCG / town / zoom / district / ward) from the 65
`watabou-extra`, the 28 `watabou-village` posts and all non-MFCG devlogs (63 comments in 28 files, read in full). Counts
are **distinct named commenters** per theme; one person can appear under several themes. Post ids in brackets.

| # | theme | distinct commenters (post) | n | creator's answer | user workaround seen |
|---|---|---|---|---|---|
| B1 | zoom, pan, local view | Callum (27564017), Tubal (47063541), Nelian (219273), QM (494692), T Mexx (100431269), Quenten Walker (34061942), Tom (91172, export viewport) | 7 | "big flaw … technical reasons"; OpenFL; "harder to implement than it seems"; District View instead | crop SVG exports |
| B2 | save/load, persist edits and landmarks, import own JSON | iamdum (153064), Daniel Gill (46685301), Christov (219273), Silent Observer (102377277), Philipp Schlesinger (32650629), Robert Conley (62336213), "no problem!" (494692), maurosson15 (494692), Killians (494692) | 9 | "no way to save those changes"; JSON "can't be imported back"; waits for a stable architecture | SVG → Inkscape; hand-written POI JSON |
| B3 | NG-fidelity districts stitched into the city, detail levels | Matt Wallis, Rin Vindor, Simen Lande, Pinguid (58808794); Moritz Hackl, Robert Conley, C.R. Shelidon (59046807); T Mexx (58808794, 70917627, 100431269); Javin Bond (103335095) | 9 | "too visually noisy"; "lost interest in NG"; exact reproduction "won't be possible … it really bother me" | assemble "slices" / collage by hand |
| B4 | building detail, mansion/floor-plan links | arlechinu (101529), Hubert Marceau (29538966), Navylegokid, headzombie (123268), Marius (64375271), Kevin Cork (86093774), T Mexx (100431269), Javin Bond (103335095), Quenten Walker (37407181) | 9 | "not easy … performance is just one of the problems"; right-click to Procgen Mansion exists | — |
| B5 | content: demographics, shops, class, counts, numbering | LionHeart5 (22717), Agustín Molina (79147510), T Mexx (70917627), Allen Call (59046807), Vicky Radcliffe (58808794), Justa Badge (47063541), Sherevar (11802), EltharinFireDragon (153064), Hubert Marceau (28088976) | 9 | numbering "would affect performance badly"; "why?"; class = "different values for … street widths … building and block size" | external spreadsheets and population generators |
| B6 | edit operations | SaintB, BCS (91172); Dragonzofdeath, harpymarpy, VampriruM, LionHeart5, MrKella (494692); Rocketman Dan (22717); stintles (22794); Quenten Walker (34822131); Allen Varney (41711473); Justa Badge (47063541) | 12 | "No. What would be on its place?"; roads only via a new map; desktop-only; blocked by architecture | reroll; warp/bloat |
| B7 | water configurations | Nik Balson (101942512), Steve Mangione (165462094), supernal (34104), Daniel (61026228), sectorbob (1206), stintles (22794) | 6 | "next on my list" (island, 2026); confluences/islands requested "for a long time" | warp the coast by hand |
| B8 | export formats and fidelity | Tom (37407181, 91172), saikofish, SpaceDiceMan, LDOG (123268), HuguesGauthier (576591), Ealiom (11802), Hubert Marceau (29538966), Will (61026228), Xariun (30234656), T Mexx (87882877), Javin Bond (103335095), buckle2000, Aktane (3091), Glidias (22717), cedarwolf (34104) | 15 | "discontent with GeoJSON"; "too much code to maintain"; 8 MP limit → SVG | third-party GeoJSON converter; Krita/Inkscape post-processing |
| B9 | overworld / region alignment | Glidias, Distraction Tactics (46967), bindusara (123268), Jonathon Hadley (79147510, 68936414) | 4 | "For inland settlements it doesn't work" | set `size` by hand |
| B10 | discoverability, UI state, browser reliability | sehrgut42 (219273), SophieNicole (494692), Quenten, psotos, Alresu (123268), Cassilas, Merkron, youseef22 (101529), Tubal (47063541), Ransom Planet Games (47063541), Killians (494692), Daniel (61026228) | 12 | "causes too much confusion"; "very confusing, but I think I've fixed it" | switch browser; forum hunting |
| B11 | size and scale semantics | bindusara (123268), Steve Davies (121415691), Quenten (345262), PliscoFlisco1893 (711706), Silent Observer (102377277), Na-chans-comics (79147510) | 6 | "Dimensions are a mess"; "scale … probably wrong" | trial-and-error `size` values |
| B12 | terrain and elevation | Allen Varney (41711473), Quenten, bindusara, T Mexx (123268) | 4 | "rarely present on city maps anyway" | — |
| B13 | style and control regressions | sb.works (102377277), Johnn & Jochen (114858238), Allen Varney (40345972), Ransom Planet Games (47063541), Ti Munro, Falderol (1367), PoochieMoo (31287) | 7 | "I will consider this"; shadows optional | old desktop builds to recover removed options |
| B14 | planning and realism critiques | Heath Rezabek (49191011), llynglas (3091), Colt Hack (46967), Rocky Weaver (64375271) | 4 | T vs X not adopted; rejection "will increase generation time"; gate wards "a hint" | reroll until gate wards vanish, warp them away |
| B15 | non-medieval / abstract use | Misteradd (27564017), Sherevar (22717), Ransom Planet Games (47063541), Heath Rezabek (45360377) | 4 | "I do want to keep it abstract" (22717) | Photoshop repaint |

What the tally says (PLAUSIBLE reading of CONFIRMED counts): the loudest *unmet* demands are export fidelity and
interop (15), editing operations (12), UX clarity (12), persistence (9), neighbourhood-scale detail (9), building detail
(9) and content/simulation (9); zoom (7) is lower in raw count but is the one the creator himself calls "a big flaw" six
times. Praise dominates the threads numerically; the complaints above are the minority that states what is missing.

## Addendum 1 (2026-09-25) — plot model and plot granularity

**Why this exists.** The owner's request that triggered this run adds a neighbourhood-level rule. Wealth, or an assigned
institution, JOINS plots into fewer and larger ones with bigger buildings, yards and courts. A poor quarter SPLITS into
more and smaller plots with small yards or none. The gaps become alleys between the roads. The rulings are PLOT MODEL and
PLOT GRANULARITY, 2026-09-25. The ledger above had already landed, so under the resume rule it was **not redone**. It
covers plots only inside GEO-2, GEO-7, REN-2 and SIM-1, with no entry of their own. This addendum adds two entries in the
same schema (GEO-9, GEO-10) from a targeted re-read, and says how they change §13 and §14. This was a judgment call within
the lane's scope, and the owner can veto it. Nothing above was edited except a one-line pointer in the status line.

**Read in full for this addendum:** `mfcg-posts-b.md` §2.1–§2.9 and §2.18; `mfcg-devlogs-a.md` E1.1–E1.5;
`os-wards-render.md` §3.1, §4.3–§4.5, §6.1–§6.4 and §6.8–§6.9; `profile-mfcg.md` §4.7, §4.9, §9.2, §10.4, ST-0, ST-4, ST-7
and ST-12; `watabou-extra-b.md` T24 and §5; `watabou-extra-a.md` §2.4; `_critic-os.md` rows 92–97 and C4. Raw threads: a
script searched the `## Comments` section of every post under `research/patreon/{watabou-city,watabou-extra,watabou-village}/`
and `research/devlogs/*/` for plot, yard, garden, alley, courtyard, wealth, rich/poor, slum, density, mansion, estate and
class terms. All 31 matching lines were read, and every commenter name was checked against the raw post.

### GEO-9 · A lot is drawn as a building: no parcel, no owned yard, no plot with several buildings [BASE; S3 input]
- **Who:** owner ruling ("the illusion of buildings") · REC · CR · OS · US×3, plus the nine B4 building-detail voices.
- **Evidence:**
  - REC: the default Display mode is Lots (ST-0). Lots mode "draws lots edge to edge" (ST-7, ST-12). Every lot polygon is
    painted as a building: a dark under-polygon (the default `Raised` option, ST-0) and a roof fill. 33 746 of 34 950
    recorded building fills have 5–8 path segments, which means quadrilateral-ish lots (§10.4). The block→lot leaf is the
    building: ≈ 71 750 leaves from 3 846 partitions, ≈ 18.6 per block (§4.9, B1).
  - REC: in Lots mode the `Building` class builds only 2–19 landmarks per city (§4.9). `Complex` mode puts one smaller
    building, made of rectangles in stepped L or T shapes, into every lot, "with ground between neighbours" (ST-7). So the
    lot/building split exists only as a global display switch. Either every lot is a wall-to-wall building, or every lot
    is a detached house in a yard.
  - REC + INF: block interiors are courtyards because `Block.filterInner`, called once per block, removes lots with no
    street frontage (§4.9; the removal reading is inferred). The yard is left-over ground that no lot owns or reaches.
    Trees later fill these "shared courtyards" (62336213).
  - CR: in 2017 the creator planned to treat small shapes as plots and place buildings of the desired shape inside them
    (Reddit 6cg1ol, paraphrased in `mfcg-devlogs-a.md` E1.4). A user proposed the same thing: a triangular lot as a fence
    with a rectangular house inside (agnate, 1367). It shipped only as the Complex display mode (0.5.3, 34104).
  - OS: 2017 `createAlleys` returns the houses themselves. A garden is a leaf dropped with probability `emptyProb`: 0.03
    for Slum, 0.04 by default, 0.15 for Merchant, 0.2 for Patriciate and 0.25 for Military. So a garden is a missing
    house, not part of anyone's plot (`os-wards-render.md` §4.4, §6.2).
  - Institutions: a local church is "larger than regular ones … and each of them has a small square next to it"
    (79147510). The temple stands on its own light plot (SHOWN, `mfcg-posts-b.md` §2.18). The 2017 cathedral is a whole
    ward, built 40 % of the time as a hollow ring and 60 % as an orthogonal block (§6.4). The castle "always occupies one
    cell" (41711473). There is nothing in between: no inn with a yard and stables, no manor with outbuildings, no
    workshop court.
  - Users: "Create each individual building as a unique 'object' … A general 'dwelling' generator" (Javin Bond,
    103335095); "using the footprint of the generated building as a starting point" for mansions (Hubert Marceau,
    29538966); the lot as a fence (agnate, 1367). The B4 mansion-integration asks are already counted in SIM-2.
- **User impact:** at city zoom every block reads either as a solid terrace or as evenly spaced detached houses. There
  are no gardens behind the frontage, no inn yards and no estates. The map cannot say who holds a piece of ground or what
  lies behind a frontage. The stage-3 building generator has no parcel to fit into. FTG-class content has nothing to
  attach to except a footprint.
- **Root cause:** one recursive splitter produces the leaves, and the leaf is the only entity. Plot, building and yard
  are not separate model objects. Row versus detached housing is a renderer switch, not a rule.
- **Beat it:** the owner's plot model. A plot is a parcel with an owner, a use, frontage edges and access, and it holds
  0..n footprints plus a yard. A per-plot site-plan step reads coverage ratios and arrangement rules from data tables,
  keyed by class, wealth and density:
  - Row houses and row businesses build end to end on the frontage with party walls, which keeps the continuous
    streetwall.
  - Institutions, manors, inns and workshops set back several separate buildings around one owner's yard.
  - A hovel is one small footprint on a plot that is mostly yard.
  - The renderer draws footprints and yards, never a plot outline as a building. Plot lines are an optional cadastral
    layer.
- **Measure:** all measured per class and district:
  - coverage (footprint area ÷ plot area) against the table targets;
  - buildings per plot, as the share of plots with ≥ 2 buildings, by class;
  - party-wall share of frontage length on row classes;
  - streetwall continuity, the share of frontage occupied by building faces within a setback tolerance; on dense
    frontages it must at least match MFCG's Lots mode;
  - every yard belongs to exactly one plot or to a declared common court;
  - site-plan cost per plot.
- **Over-correction risk:** Lots mode's wall-to-wall terraces are right for a medieval core, and they are why MFCG reads
  as urban. The creator found that spaced, detached rectangles "fail to form a streetwall, making the place look not so
  urban" (141198168, `watabou-extra-b.md` T24). Dense districts must default to continuous frontage with the yards behind
  it, not gaps along the street. Keep the hard-coded setback from the curtain wall (Reddit 8jkf7z, E1.5). Keep it cheap:
  `buildGeometry` costs ≈ 19.5 ms + 7.5 µs per building (EG-3), so a site plan must be one rule evaluation per plot, not
  a search.

### GEO-10 · Plot size is a per-district dice roll, not a function of wealth or use; plots never join; alleys are uniform residue [BASE; S2]
- **Who:** CR · US×1 asking twice, plus two related voices · OS · REC.
- **Evidence:**
  - OS: 2017 ward character is four scalars (GEO-7). Lot size comes from `minSq`, drawn once per ward from a range set by
    the ward class:

    | ward class | `minSq` range |
    |---|---|
    | Slum | [10, 40] |
    | Gate | [10, 60] |
    | Craftsmen | [10, 90] |
    | Merchant | [50, 110] |
    | Patriciate, Administration | [80, 110] |
    | Military | ∝ √block |

    The share of empty lots runs from 0.03 for Slum to 0.2 for Patriciate, which reads as "big houses in gardens"
    (`os-wards-render.md` §6.2). This is the owner's direction in crude form: a constant per class, drawn once. Within a
    ward, lot size is only jittered, by a factor of 0.33×–3.03× at `sizeChaos` 0.8 (`_critic-os.md` C4). It does not
    respond to frontage, street class or distance to the market.
  - OS: a cut leaves a 0.6-unit alley only while the piece is still the size of a block. With s = area ÷ `minSq`,
    P(alley) = 1 − 1/s − (ln s)/s. That is 0.15 at s = 2, 0.40 at s = 4, 0.67 at s = 10 and 0.94 at s = 100 (§4.3;
    `_critic-os.md` row 97). So alley frequency is an unplanned side effect of `minSq`, and every district uses the same
    width, 0.6 (§3.1).
  - REC + INF: the live build dropped the wealth axis. District types describe location only: central, castle, docks,
    park, bridge, gate, bank, sprawl and generic (`profile-mfcg.md` §9.2). Ward classes collapsed to `Alleys` plus a few
    special classes (§4.7). "Slums" survives only as a name for sprawl districts outside the walls (§9.2 labels). The
    per-district parameters (`District.createParams`) cannot be observed, and the 2017 scalars are "gone from view"
    (§14 item 3). The creator, 2018: "Every district has a set of parameters affecting its layout — how regular is the
    grid of its alleys, how big are the buildings etc." (34104 comments; `mfcg-devlogs-a.md` E1.1).
  - Joins: no step merges lots for a larger use. A landmark is either a ward of its own (the castle "always occupies one
    cell"; the temple; the market) or a `createChurch` insert with a small square, 22–27 per city (§4.9;
    `mfcg-posts-b.md` §2.18).
  - Alleys (live): all alleys have one width, narrower than main roads (SHOWN 100431269/03, `mfcg-posts-b.md` §2.9). The
    creator mentions "two types of alleys which are quite different" but never explains them (100431269). The Show alleys
    layer draws only the alleys in the shanty-town sprawl; alleys inside the walls stay as negative space (ST-4). Blocks
    have no back lanes, because lots without frontage are deleted (§4.9).
  - What works: outskirts filtering "decreases the density of streets there, while keeping the density of buildings
    along those streets relatively high" (87882877). This rule changes granularity with distance from the centre, and it
    reproduces ribbon development.
  - Users: T Mexx asked twice.
    - 2022, on NG: "wealthy, clean, large homes spaced out more, while a poorer part of town might be smaller, dense,
      squalid shacks" (70917627).
    - 2025, on UP, unanswered: "economic tags that could change the density, size, and proximity of the buildings and
      perhaps alleys? Wealthier areas would have larger disconnected buildings while impoverished slums would be quite
      dense with adjacent buildings and more alleys than green space between streets" (141198168).

    The creator's 2022 answer: "there aren't many tools for this: it can only choose different values for the minimum
    and maximum street widths, the average building and block size, and some other variables." Related voices ask for a
    selectable "Population Density" (LionHeart5, 22717) and say "if streets and alleyways are sized up" (Matt Wallis,
    58808794).
  - Correction to Appendix A.12: its "US×2" counts requests. It is one commenter asking twice, as Appendix B (B5)
    already lists.
- **User impact:** a rich quarter and a poor one differ only by the dice. There are no estate plots and no joined
  institutional plots. Alleys cannot tell a dense poor quarter (many narrow alleys) from a rich one (few wide ones). A
  stage-2 NG-class neighbourhood would inherit no wealth signal from the city.
- **Root cause:** granularity is the stop threshold of a recursive splitter, set per ward in 2017 and per district in
  the live build. There is no plot entity to join, no context vector to read and no merge step. Alleys are the gaps left
  by the same splitter, at a fixed width.
- **Beat it:** one code path, as the owner ruled. The block → plot subdivision depth and the merge rules read the per-plot
  context vector: wealth gradient, district type, density, assignment, frontage class, and distance to market, centre,
  gate and water.
  - Prosperity joins neighbouring plots into fewer, larger and deeper ones with courts.
  - Poverty splits them into narrow strips and courts.
  - An institution or an assigned large building claims and joins the plots it needs. The assignment input is applied
    first.
  - The leftover gaps become an explicit network of alleys and back lanes, each with a class and a width in metres: many
    narrow alleys in dense poor quarters, a few wide lanes with carriage access to back yards in rich ones.
  - Parameters vary smoothly across a district and jump only at real boundaries (GEO-7).
  - The rule tables are data with provenance, so the corpus can calibrate them later.
  - The same plots and alleys are what a stage-2 neighbourhood view draws in detail, so the seam contract (DAT-3) covers
    plot lines and alleys as well as streets.
- **Measure:**
  - (a) median plot area and frontage width rise with the wealth decile, checked by a rank correlation above a set
    threshold;
  - (b) plots and buildings per hectare, against wealth and density;
  - (c) alley length per hectare and median alley width by wealth decile: poor quarters above rich ones in length, rich
    above poor in width;
  - (d) every institution or assigned building sits on a plot that meets its area and frontage requirement (100 %), and
    the share formed by joins is reported;
  - (e) the GEO-7 seam metric;
  - (f) locality: changing one district's wealth re-plots only that district, and ≥ 95 % of entities elsewhere stay
    identical (EDT-2).
- **Over-correction risk:** part of MFCG's organic variety comes from the dice. A craftsmen ward runs "small to large",
  and the skewed `minSq` draw gives the occasional grand house. Setting everything by wealth would make quarters
  monotonous, so keep random variance around the mean that the context sets: a rich quarter keeps a few small houses,
  and a poor one gets a large inn. Keep ribbon development outside the walls (87882877). Keep mixed use. Wealth is a
  gradient, with rich frontages on the main streets and poor courts behind them, not modern class zoning. In 2017 the
  creator described no purely residential wards except the rich patriciate ones (Reddit 6cg1ol, E1.4). Keep alleys
  unobtrusive at city zoom, where the negative-space look works.

### Effect on §13 and §14
- **§13 #3** widens from "frontage-first plots" to "a frontage-first **plot model** with per-plot site plans and
  granularity set by context (join, split, alleys)". It now answers GEO-2, GEO-6, GEO-9 and GEO-10. It adds three
  headline metrics: coverage by class within the table targets, median plot area rising with wealth, and alley density
  and width by wealth decile. **#9** supplies the context vector that #3 reads, which is the owner's single code path.
  No other rank changes: #3 was already in the base core, and #1, #2 and #4 are still its prerequisites.
- **§14** gains two items:
  - 11. A continuous streetwall on dense frontages, with the yards behind it rather than gaps along the street
    (141198168).
  - 12. Random variety around the mean, so that wealth never makes a quarter monotonous (`os-wards-render.md` §6.2).
- **CONFIRMED vs PLAUSIBLE:** every count, constant, quote and commenter name above was read or executed, so it is
  CONFIRMED. That the live build has no wealth axis is PLAUSIBLE: it is inferred from the district-type list, because the
  per-district parameters cannot be observed. That `Block.filterInner` removes lots without frontage is an inference in
  `profile-mfcg.md` §4.9, drawn from exact call counts and the screenshots.
