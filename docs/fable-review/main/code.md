# Fable review — lane fable-review/main/code (the compiled-code readings, their critic and their impact ruling)

Reviewer: Fable (claude-fable-5-1), 2026-09-27 21:22 – 2026-09-28 (two sessions; checkpoint 1 at six rows, completed in the continuation). Rows: every PENDING row of
`docs/FABLE-REVIEW-QUEUE.md` whose id matches `A-code/_critic`, `A-code/_impact` or `B-code/<generator>` with its "(critic)"
and "(impact)" rows — 20 rows, listed by grep at the start (the queue had not grown past them). Sections judged: the design
sections items 33–62 of `docs/AMENDMENTS-2026-09-27c.md` name, and §17.1 (read whole) of the live design
(`docs/ARCHITECTURE.md` sha256 357c02f2…, 13 025 lines; `docs/ARCHITECTURE-RATIONALE.md` 9575f26c…). This seat is the
code-readings seat: it opened the reader session's per-class extracts of the captured bundles
(`/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/454522d3-02d4-4290-bb60-ba2f045c687d/scratchpad/code/<generator>/classes/`,
one prettified file per class, byte ranges into the bundle in each header) and the bundles themselves where a search over
the whole file was needed (NG: unit words; MFCG: the captured grammar body). Nothing of theirs is quoted below beyond a
class or method NAME. Scratch: `…/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/fable-review/` (`fm-bench.out`).

**Status: COMPLETE.** All 20 rows are judged (the PROGRESS table below); every row's file carries an appended review
section; the evidence gate and its completion are appended to `docs/AMENDMENTS-2026-09-27c.md`; no design block was needed
(J-Fcode-7, held through all rows) — the design changes the readings require are carried by pass-c items as corrected here,
and the two additions the live text needs are recorded as design impacts. Executed by this seat: the Fantasy Manor
seed-search replay and Monte Carlo, the Dwellings shape and specification replays (all identical to the readers' outputs),
the Lehmer retry step for the recorded VG pairs, and the folded-draw mean.

## PROGRESS

| row | planned | done |
|---|---|---|
| B-code/mfcg | read whole; firewall; re-derive ≥ 5 claims from the extracts; verdict; append | done (CORRECTED) |
| B-code/mfcg (critic) | R-M1–R-M8 stand?; the not-re-derived list; verdict | done (CONFIRMED) |
| B-code/mfcg (impact) | the claims items 43, 45–48, 51, 53–57 rest on; verdict | done (CONFIRMED) |
| B-code/neighbourhood | read whole; firewall (§2.0/§2.1/§2.7 tables); re-derive fillet, flatten, no walls, rings, pin decay, court, lot filter, recession; verdict | done (CORRECTED) |
| B-code/neighbourhood (critic) | R-N1–R-N5; the list; verdict | done (CONFIRMED) |
| B-code/neighbourhood (impact) | items 33–44, 58; verdict | done (CONFIRMED) |
| A-code/_impact | items 33–62 rulings and gates; every HOLD part RELEASED or REJECTED (appended to 27c); the (c) ranges | done (CORRECTED; completion appended to 27c) |
| A-code/_critic | 37 re-checks and R1–R12 each stand or not; verdict | done (CORRECTED: R5 sharpened, R3 widened, R9 sharpened, R10 carved) |
| B-code/village | read whole; firewall (§2.1 odds — rule logic vs content); re-derive retry = one Lehmer step, density formula, tracker terms and rigidness gate, square rim 12–19 widths, the field claim outward from the houses' centroid (item 57), population houses × U(3,7), class thresholds, palisade lattice; R1–R3; verdict | done (CORRECTED) |
| B-code/village (critic) | R-V1–R-V7; the not-re-derived list; verdict | done (CONFIRMED) |
| B-code/village (impact) | items 51, 53, 57, 61; verdict | done (CONFIRMED) |
| B-code/manor | read whole; firewall (sim.mjs reader-tier, three identifiers); re-derive five equal layouts, hip chance, collision pairs (block–block, dormer–(dormer, block), tower–tower; none against a wing), porch lottery and the ≈ 14 % entrance-less share, fixed 800-unit scale, tower chain; verdict | done (CONFIRMED; replay re-executed, identical) |
| B-code/manor (critic) | R-F1–R-F5, R9; verdict | done (CONFIRMED) |
| B-code/manor (impact) | item 59 (the timing is RELEASED already, see the evidence gate); verdict | done (CONFIRMED) |
| B-code/dwellings | read whole; firewall (grammar by structure; role names citation-only); re-derive basement n/(n+1), the loop rule (half the non-redundant extras), window density 0.8/−0.1, the absent stair check, the > 11-cell URL drop, the zero-trial clock rewind; C19; verdict | done (CORRECTED; both replays re-executed, identical) |
| B-code/dwellings (critic) | R-D1–R-D6, R7, R11; verdict | done (CONFIRMED) |
| B-code/dwellings (impact) | items 52, 60; verdict | done (CONFIRMED) |
| B-code/ftg-client | read whole; firewall (§2.5 widths/heights/breakpoints — rule; 5 colour literals at R5's limit); re-derive field 9 = textures, 8.6 = light position (item 50), edge enum, no lot on the wire, server fill/regenerate, 5 m snapping, round joins; R4; verdict | done (CORRECTED) |
| B-code/ftg-client (critic) | R-T1–R-T6, R4, R10 (as carved below); verdict | done (CONFIRMED) |
| B-code/ftg-client (impact) | items 49 (done here), 50; verdict | done (CONFIRMED) |
| blocks file, design impacts, LANDED | write; log | done: no block (J-Fcode-7 held); impacts below; LANDED logged |

## Verdict table

| row | verdict | one-line reason | corrections (where) |
|---|---|---|---|
| B-code/mfcg | CORRECTED | every claim re-derived holds (castle bloat-then-equalise with 0.75 / 20 % / 0.001 and the Fourier target; the Offset recession law and its 0.5 floor; the 1.2 × raise with class values 0.5 / 1 / 0.3; the farm split 400·(1 + t4), 0.5 ± 0.2, ±22.5° half the time, 2-unit paths, farmhouse 0.2; the label path maximising distance + horizontal separation and its 80 %; the grammar body never references the three Markov externals; grower rates 0.1 / 0.5 / 1 by type and the skip law; ⌊√cells⌋ seeds; 3 pinned wall passes; the gate law with its 0.75 coastal factor); firewall clean under R5 as sharpened (J-Fcode-1); §0 #9's rural rule still carries the wording the critic corrected (R6) | appended review section applies R6 and fixes the §9 scratchpad path note |
| B-code/mfcg (critic) | CONFIRMED | R-M1–R-M8 stand (R-M4 re-derived independently; R-M5 re-derived by the critic; the rest accepted on the quoted class and method); its not-re-derived list is honest and I closed eight of its items (castle order, wall passes, Offset, farm split, Raised, label path, Markov, grower rates) | none |
| B-code/mfcg (impact) | CONFIRMED | every claim the amendments rest on that no seat had re-derived is now re-derived on the extracts (items 43, 45, 46, 47, 54, 55, 56, 57's MFCG half); the "Design says" quotes match the live text (10 of 10 tokens in §4.6, 4 of 4 in §1.4) | item 46's "reproduces" claim corrected in the evidence gate (J-Fcode-6) |
| B-code/neighbourhood | CORRECTED | every mechanism the design adopts re-derived: the flatten test (area ÷ chord < 1 or area ÷ chord² < 0.01), the keep-sharp law sin²(θ/2) then min(1, side ÷ shorter leg) and the whole-shorter-leg arc, the lot filter (½ min area, ½ box, aspect in (⅓, 3)), the court rule, the recession law with its 0.5 floor, the pin decay ÷ 10, the six-point three-pass rings with geometric spacing and the 1/3 centre choice, the layer order (pins under houses, trees above), the export scale 0.35, the holed position law without a centroid term (0 `project` calls against 1 in the plain bisector); no wall / gate / fence / enclosure class exists in the class map; the §2.0, §2.1 and §2.7 tables are logic (J-Fcode-8) | appended review section adds R8's build-name line, supersedes §8.3's firewall sentence by R9, and labels the metre reading as ruled (J-Fcode-2) |
| B-code/neighbourhood (critic) | CONFIRMED | R-N1–R-N5 stand (R-N3 re-derived; R-N2 consistent with my `Hood`, `Normal`, `RingHood`, `Empty`, `BisectorEx` reads); its not-re-derived list is honest and I closed six of its items (fillet and arc, lot filter and setback, ring courses and centre, pin decay, manor walls, layers) | none |
| B-code/neighbourhood (impact) | CONFIRMED | items 33–44 and 58 rest on claims now re-derived in code; the metre reading of 0.35 is released as a labelled inference (J-Fcode-2); item 37's `flatten` default stands (J-Fcode-3) | none beyond the evidence gate |
| B-code/village | CORRECTED | every load-bearing claim re-derived on the extracts (17 receipts below: the retry step also recomputed for the three recorded pairs; the seven blueprint parameters; the tag roll and the seven exclusion groups; the density formula with its wet-reference arm; the highway and road steering terms, the rigidness gate, branching, trails and merges; the square's 12–19 widths, 0.7 / 0.9 round odds, contour stretch and centrepiece odds; frontage placement with no field test; the field seeds, the 9-gon and 12-gon frames, the lot filter and the greedy outward pick; the repulsion field, the shore staircase and the patches; the palisade lattice and gate rules; the river course; the forest tile and tests; the terrain primitives and the three carves; the straight-first bisector; the Poisson annulus); firewall clean (the tag names are identifiers under J-Fcode-1, the odds and thresholds logic under J-Fcode-8) | appended review section applies R1 (7/30), R2 (the no-crossing difference, re-derived on the parity flag), R3 widened to eight cross-references, R8's build line for §3.10, and labels the 0.7 m reading as an inference (J-Fcode-9) |
| B-code/village (critic) | CONFIRMED | R-V1–R-V7 stand (R-V1, R-V2, R-V3, R-V4, R-V6, R-V7 re-derived here; R-V5 accepted); X1, X2, X3, X6, X7 (VG half), I1 stand; its not-re-derived list is honest and this review closed all of it except the confluence course and the tributary carve's constants (read, consistent) — the roads, density, square, frontage, fields, forest, tag roll and stream table are re-derived | none |
| B-code/village (impact) | CONFIRMED | items 51, 53, 57 (VG half) and 61 rest on claims now re-derived (the greedy outward claim and the shape filters, the density formula, the tracker terms and gates, the square sizing, the successor step, the staircase and the repulsion field); the editor texts carry no identifier and match the code; the bundle's single version string is 1.6.9 | none |
| B-code/manor | CONFIRMED | every rule item 59 rests on re-derived on the unminified model classes (the five equal layouts and their side-count odds and radii; the wing width 90 − 30·s4; the mitred slab and free gable ends; the hip block's chance 1 − width ÷ length, its sizes, 60 % snapped position, joint-only swap coin, corner-parity rule and block–block test; the dormer/bay rule (1 − d ÷ width)², slot count, gap drop 1 ÷ (n + 1), 4× stretch, the shape list taken at row start; the four porch options with their preconditions, odds and widths; the door fallback; the two tower branches, ⅓–⅔ side, 1 ÷ (2 + accepted), 0.6–1.0 × width, tower–tower only; the ridge inset by a quarter of the short side; the fixed 800-unit scale; the light angle 90° + 90°·s4; the key bindings); the 51-generation replay RE-EXECUTED here — output identical to the reader's (3 passes, 46 generations, all 39 counters); the 20 000-building Monte Carlo re-run reproduces 13.9 % without an entrance; firewall clean (3 fixed colours + 2 rgb forms ≤ R5's five) | none (a mirror-path note only) |
| B-code/manor (critic) | CONFIRMED | R-F1–R-F5 stand (all five re-derived here); I6 trivial; I7 settled by R9 as ruled (J-Fcode-10 on the three common-noun names); the not-re-derived list is honest and this review closed the porch options, door fallback, dormer rows and bays, the light law and the grass/path/shadow parameters (the latter three by the exact replay) | none |
| B-code/manor (impact) | CONFIRMED | item 59's collision pairs, porch lottery (mechanism CONFIRMED; the ≈ 14 % share is a restatement statistic that reproduces, PLAUSIBLE as a rate), fixed scale, layouts and the hip ≠ pyramid distinction re-derived; the timing RELEASED at checkpoint 1 (J-Fcode-5); the editor text carries no identifier | none |
| B-code/dwellings | CORRECTED | every design-bearing claim re-derived on the readable model extracts (the discarded step; the bands, template stretches and the cell-count-only acceptance; the 11-cell URL drop; the entrance weights 5 / 3 / 1 / 0 with the draw consumed even under a URL entrance; the storey law and its clamp; spiral 0.1 / 0.3 and stairwell (n − 1) ÷ (n + 1); basement n ÷ (n + 1); the partition's stop 6·2^m, its two candidate kinds and tag preferences, the bend at L ÷ 6 and its half-length turn, the score (q₁q₂)² and the hallways inversion, the retry of the same area; the corridor merge; door costs and the priced pruning with round(half) of the non-redundant extras removed; the setback rule best² ÷ current; the coarse-room basement (avg 12) and its drop on a failed connection; the unguarded upper-stair failure and the trapdoor; window density 0.9 − 0.1·(storeys − index) = 0.8 at the top; chimney subset; the pre-reset facade draw; the zero-trial clock rewind; the programme lists and the 13-role pool; the bathroom and bedroom validators); both replays RE-EXECUTED here (13 shapes, 92/92/92) with identical output; firewall clean | appended review section applies R7 (two cross-references) |
| B-code/dwellings (critic) | CONFIRMED | R-D1–R-D6 stand (R-D1–R-D5 re-derived here, R-D6 re-executed here); R7 applied; R11 stands (the first seat's list is unrecorded; the 261-file extract set and the 54 re-read classes are what is checkable); its not-re-derived list is honest and this review closed the corridor merge and pruning, the setback, the stair search and trapdoor, the coarse basement, the assignment trials and two validators, windows and chimneys, and the name's flag hand-off (the grammar's structure below) | none |
| B-code/dwellings (impact) | CONFIRMED | items 52 and 60 rest on claims now re-derived (the clock rewind; n ÷ (n + 1); the loop rule; the window densities; the 11-cell drop; the coarse-room basement; the unguarded stair) — NG's 1–16 hand-off widths accepted on the NG reading (critic X8); editor texts carry no identifier | none |
| B-code/ftg-client | CORRECTED | re-derived on the bundles by symbol name: the 15-value edge enum (fence 6, wall 7), the 25-value texture enum (road 8, lawn 18, sand 20), positions ÷ 100, the light-position field and its first-edge-midpoint fallback with no door field, 27 layout fields and no lot or plot in 46 messages, the 400 m sea rule, the 0.5 pitch, the width / rim / depth / alpha tables and the two quoted road colours, the snap floor max(snap, width ÷ 2), `roadLength` passed through (default 50, 30–100), fill-plot and regenerate as server posts, the +x ray face walk, the three texture roles, per-intersection discs; firewall: five colour literals at R5's limit, paths and UI strings identifiers, the §2.5 tables logic (J-Fcode-8) | appended review section applies R4 (fifteen; one table; C15 before C16) |
| B-code/ftg-client (critic) | CONFIRMED | R-T1–R-T6 stand, all re-derived here; R4 applied; R10 as carved (J-Fcode-4); I3, I4, P2, P3 stand; the coverage grade (PLAUSIBLE range count) is right for a bundle without class markers | none |
| B-code/ftg-client (impact) | CONFIRMED | items 49 and 50 rest on the texture enum, the wire's lack of lots and plots, the two server services, the light-position field and its fallback — all re-derived; editor texts carry no identifier | none |
| A-code/_impact | CORRECTED | every HOLD part ruled (item 37's 0.7 m origin RELEASED labelled; item 49's 49 % REJECTED as a deletion, kept with F4; item 58 (f) RELEASED labelled; item 59's timing RELEASED, re-measured); items 33–62 all CONFIRMED on re-derived evidence (50, 57, 59, 60, 61 in the completion); two editor texts corrected (items 39, 46); the (c) ranges accepted as PLAUSIBLE judgments with two notes | `docs/AMENDMENTS-2026-09-27c.md` "## Fable review (2026-09-27) — evidence gate" and "— evidence gate, completion"; appended section in `code-impact.md` |
| A-code/_critic | CORRECTED | headline (1)–(4) stand ((2) recomputed, (3) re-derived on the parity flag); all 37 re-checks stand (25 re-derived by this seat, the FM replay and both Dwellings replays re-executed); X1–X8, P1–P6, I1–I8 stand; R1–R12 stand with R5 sharpened (J-Fcode-1, J-Fcode-8), R3 widened (eight references), R9 sharpened (J-Fcode-10) and R10 carved (J-Fcode-4) | appended section in `_critic-code.md` |

## What was re-derived, and how (the receipts)

Extract fidelity: each class file's header carries its byte range in the bundle; the MFCG `Ridge` class (bytes
186818–187430) and the NG `JsonExporter` (183808–185419) were read whole; the NG bundle itself was searched for unit words
and for the export scale (`SCALE=.35` in the exporter; the writer's boot default is 1). Nothing was executed except the
reader's Fantasy Manor bench (`manor/sim/bench.mjs`, node 24.12) and a 2·10⁶-draw check of the folded four-draw mean.

**MFCG (itch 12710731), read in the extracts this session:**
1. `Castle.adjustShape`: a bloat loop runs while the nearest ring vertex is under 10 units from the centroid, pushing every
   mesh vertex within 2·max(15, far radius) radially by (d ÷ k)^−¼; only then an equalise loop runs while compactness < 0.75,
   each pass moving the unpinned vertices 20 % toward the first Fourier component's regular polygon (the gate and, when
   the gate is a split midpoint, its two neighbours pinned); a pass gaining under 0.001 throws. Order and constants
   CONFIRMED (item 45).
2. `Block.indentFronts`: h = min(√area ÷ 3, 1.2) × u; skipped when h < 0.5; else the lot is intersected with the block shape
   translated by h toward the block centroid. CONFIRMED (item 43).
3. `BuildingPainter`: the extrusion is 1.2 × the raise; the raise argument defaults to 0.5; the ward view passes 1 for its two
   solid landmark calls and 0 for the monument; the farm painter passes 0.3. Ratios 0.5 : 1 : 0.3 CONFIRMED (item 54).
4. `Farm`: a cell splits while its area ≥ 400 × (1 + t4); the cut sits at 0.5 + 0.2·(2·m3 − 1) of the box's long side, square
   with probability ½ else turned by π/8 × (2·m3 − 1); the cut carries a 2-unit gap; each sub-plot draws a farmhouse with
   probability 0.2 (a 4–5 × 2–3 rectangle). CONFIRMED (item 57, MFCG half).
5. `Ridge.build`: the skeleton is rebuilt with every vertex jittered by 1 unit in a random direction until it closes; the
   label path joins the outline vertex pair maximising distance + |Δx|; `CurvedLabel` uses 0.8 of the path length.
   CONFIRMED (item 55).
6. `Namer`: three externals (a word, a fantasy word, a given name) are registered on the grammar and backed by the four
   Markov chains; the captured grammar body (`0014-5ba58ea2.json`, 4 401 bytes) contains none of those three tokens, and the
   namer calls none of them directly. Markov built, never called: CONFIRMED (item 56).
7. `Grower` constructor: rate 0.1 for district-type indices 1, 3, 4 (castle, bridge, gate in the enum's order), 0.5 for 5
   (bank), 1 otherwise; `grow` skips with probability 1 − rate. `DistrictBuilder`: ⌊√(city cells)⌋ seeds, a shuffled subset
   padded with random cells; round-robin over a shuffled grower list. CONFIRMED (item 47).
8. `CurtainWall`: the ring is smoothed by 3 pinned Laplacian passes when walls are on; the gate count is 2 + ⌊inner cells ÷
   12 × (0.75 with a shore, else 1)⌋ unless explicit or "hub". CONFIRMED independently of the critic (item 46).
9. `City`: arteries smoothed by 2 open passes with the gates pinned; the sea outline by 1–3 passes. CONFIRMED.

**NG 1.2.2 (itch 11441280), read in the extracts this session:**
1. `Hood.semiSmooth`: a three-point course goes straight when area ÷ chord < 1 or area ÷ chord² < 0.01; otherwise it stays
   sharp with probability (1 − cos θ) ÷ 2 = sin²(θ ÷ 2), else with probability min-building-side ÷ shorter leg (a draw under
   a ratio that may exceed 1, i.e. min(1, ·)); otherwise the corner becomes the arc of the circle tangent to the shorter
   leg at its far end and to the longer leg at the same distance from the corner, the rest of the longer leg kept
   straight. CONFIRMED (items 37, 38).
2. `Normal.validateLot`: area ≥ minimum building area ÷ 2; 2 × area ≥ box area; box aspect in (0.333, 3). `Normal.populate`:
   the court is greened and planted when some lots lack frontage and every frontage lot is valid, or with `leafy` on a coin.
   `Normal.indentFronts`: min(√area ÷ 3, maximum street width ÷ 2 × indentation) × u, skipped under 0.5. Court trees kept
   with probability coverage × (1 − t4), sized × 1.6^S. CONFIRMED (items 42, 43, 58 (b)).
3. `Empty`: after a well, large tree or fountain is picked, that kind's chance is divided by 10. CONFIRMED (item 58 (c)).
4. `RingHood`: each ring is six points at one radius with a common phase and a per-point bell jitter, smoothed by three
   Chaikin passes; the spacing is multiplied by the growth factor per ring; the outline radii are 0.5 + 0.5·m3 with a random
   kept-sharp subset of 3 … n − 1 vertices; an uncut centre picks among three contents by ⌊3u⌋. CONFIRMED (item 58 (a)).
5. `HoodView`: children added in the order greens, roads, (shadows inserted at index 2), pins, light, houses, chimneys, trees.
   CONFIRMED (item 58 (d)).
6. `BisectorEx`: the position is 0.5 when the offset exceeds half the axis, else offset + (1 − 2·offset) × m3 along the outer
   contour's box — and the class contains no projection call (the plain `Bisector` has one). No centroid term: CONFIRMED
   (item 35's holed law).
7. `JsonExporter`: sets the shared GeoJSON writer's scale to 0.35 and writes the same feature schema MFCG writes at scale 4
   (values with a road width, earth, roads with widths, buildings, prisms, squares, greens, trees, the outline). The bundle
   holds no unit word ("meter" occurs only inside "parameter"). See J-Fcode-2.
8. The class map (`classes.tsv`, 531 markers) has no class whose name contains wall, gate, fence, enclosure or hedge.
   CONFIRMED (item 44).

**VG 1.6.9 (itch 19365073), read in the extracts this session** (bytes into `0003-b921e835.js` in each file's header):
1. `Blueprint`: a new village's seed is the running stream's NEXT state (one advance), its tags a fresh roll; `adjust` resets to
   the failed seed and takes one step — recomputed here: 2087232953 → 1479091611, 801393661 → 1450476720, 9191 → 443658761
   all reproduce, and 4242 steps to 204765582 (so the "4242 → 4243" row is not this rule, as the reading says). The seven
   parameters: minWidth 8 + 2·B3, maxWidth 10 + 4·B3, ratio 1.2 + 0.6·B3, minBlock = mean width × (4 + 8·B3^1.5), rigidness
   0.05 + 0.2·F4, minRoad 8, maxRoad 10; field factor 1 / ×4 / 0; `organic` zeroes rigidness; tree seed = seed. CONFIRMED (items
   51, 61; critic X7's VG half).
2. `Params`: the roll order and odds of §2.1 exactly (district 0.05; density 0.2; water 0.666 with weights 3 : 2 : 1 : 1 : ½ : ½;
   grove 0.5 with a pond else 0.1; organic 0.1; no square 0.4 / 0.8 / 0.6; through road 0.3 then crossroads 0.3, else dead end
   0.2 removing no square; palisade 0.3 dense else 0.2 unless district or water); seven exclusion groups; resolve appends
   `isolated` when no road tag and removes group-mates only for a tag added by hand; 8 + 2 + 6 + 4 = 20 request tags. CONFIRMED.
3. `Region.createDensity`: reference point polar(min half-view · S, π·u); reference height = its level, or the highest in-frame
   shore-chain vertex when it is wet; q = clamp(1 − 2|d − level| ÷ range); default clamp(f·(q + 1.5·(1 − ρ ÷ (64·frame
   fraction)) − 1)) then smoothstep; `district` q^(1/f). CONFIRMED (item 61).
4. `Region.roll` and the streams: reset to the road seed (else the seed) before the network, houses, fields, forest; grammar init;
   reset to the seed before name, population = round(houses × (3 + 4u)) and legend. `Farmland` resets to the seed; `Forest.roll`
   to the tree seed; the `Forest` mesh is built in its constructor BEFORE that reset — from the state the fields left — and cached
   per frame size for the session. CONFIRMED (§4.3, §4.4's cache mechanism).
5. `Network.build`, `Tracker`: 5-unit steps; the highway's terms — best-aligned gradient vector × 0.5, water term 50 × the
   repulsion when repelled and −200 when bridges are allowed (attraction), target pull 0.2·√(distance ÷ size), wall push 1 —
   never gated; roads — flexibility 0.5 / 1 / 2 / 0 by type, water ±50 / −100, target 0.1·distance ÷ frame, wall ±0.5, applied
   only when the component across the heading exceeds rigidness (trails and highways always); branching when no junction lies
   within minBlock ÷ density, thirds for one side / both / the other, a continuation with 0.9 or 0.1; roads on zero density
   spawn trails; trail limit minBlock ÷ F4; merge when a road point lies within 5 ahead (own trail included); a branch's
   water flag is its parent's opposite; a finished bridge repels; bridges cancelled beyond 3·shallowSize; landings spaced
   shallowSize × (1 + bridges); the T-corner cut. CONFIRMED (item 61).
6. `SquareBuilder`: radius = maxWidth × ⌊12 + 8u⌋ ÷ 2π; the populated point, moved to the densest dry highway vertex when the
   highway passes within two radii; round with 0.9 (water) / 0.7 (dry), a regular polygon with one vertex per ≈ 5 units of rim,
   else a resampled square; stretched by 2^|contour vector| and turned to the contour or the highway; no centrepiece when a
   water patch cuts it; tower 0.1 / 0.5 (side maxWidth·(1 + F4)·ratio), else tree 6·(2 − F4) or well 3 at even odds; radial
   roads from shuffled rim vertices under the junction test scaled by min(1, perimeter ÷ 5·minBlock). CONFIRMED (item 61).
7. `Region.placeBuildings`, `buildAlong`, `validateBuilding`: gatehouses and wall towers first, then the tower, farmsteads,
   the wharf, streets both ways (the square's rim once, ×2); start maxRoad + minWidth·B3; large with 0.15 ÷ largeCount (1 ÷
   largeCount for farmsteads), sizes as §2.11; accept with the density at the chord midpoint; set back offset × (1 + F4), 10 on
   highways else 8; driveway with ((w − min) ÷ (max − min))²; advance width + minWidth·B3 either way; validity = no house
   overlap, no road crossing, ≤ 1 wet corner on fordable water (2 for farmsteads, 0 otherwise), no corner in the wall band — no
   field test. CONFIRMED (item 61).
8. `Legend`: < 20 houses → roadhouse with a highway else hamlet; < 200 village; < 1 000 town; else city; qualifier island, or
   with a wharf coastal / riverside (riverside wins); places by class as §2.15 (village: inn if highway, tavern, a second at ½,
   shop 0.2, smithy 0.7, temple 0.1, a special); ⌊u·⌈log₁₀ pop⌉⌋ persons; stochastic-round(ln(houses ÷ 5)) notes, at least 1
   unless a hamlet, pinned to random houses. CONFIRMED (item 61).
9. `Farmland`: seeds on the highway (resampled 16, simplified 0.999, resampled 120), the shores (120) and — except islands — a
   14-point ring of radius size ÷ 2 about the houses' centroid (each point also nudged by one unit at an angle drawn in [0, 1)
   rad — an omission in §2.13, immaterial), kept when farther than 120 − 70·√density from every kept seed; Voronoi with a 9-gon
   frame at twice the enclosing radius; land = the highway's two half-planes (a 12-gon cut along it, the highway spliced in) ∩
   the land patches; ponds subtracted; regions ≥ 50² kept; wall insets ±minRoad; bisection with minimum (120 − 70·√density)² ×
   2^S and variance 3; inset ½·minRoad; filter ≥ 4 vertices, in-frame centroid, area ≥ 0.55 of the box, aspect ≥ 0.4. The
   first read drops lots touching the square or holding a street vertex, turns lots on an ordinary house into orchards with
   √density (never with `uncultivated` / `no orchards`), then picks greedily: the candidate minimising (a picked lot's key +
   its nearest vertex gap to it), the key being the picked centroid's distance to the houses' centroid, until houses × field
   factor × 1 000. Trails are cut at the first vertex in a field and the farmstead rebuilt on the field edge. CONFIRMED (item 57's
   VG half — "claimed outward from the settlement's centre" is this rule; item 61).
10. `Water`: levels coast (0.3…0.5), island 0.6, pond 0.2 of the range, rivers the pre-carve minimum; flags and shallow sizes as
    §2.5; `createDeflection` = for each land cell the sum over water cells within 16 cells of (unit vector water → cell) ÷
    distance, normalised by π·16²·cell, null when none; used by `initHighway` (redraw the entrance until the point one unit
    inward is dry and outside the field), `avoidWater` (only while heading into water: dot ≤ 0) and bridge headings; shores =
    directed water-cell sides facing in-grid land (border sides not emitted), chained, Laplacian-relaxed twice (once for ≤ 4
    points), resampled at 3 cells; patches close open chains along the frame; the dockable run and the wharf trim. CONFIRMED
    (item 53's two VG sentences).
11. `Palisade`: 10 × 10 lattice at step size ÷ 20, jittered 0.1 + 0.8·B3 per axis, kept with density − 0.1, < 3 throws; hull,
    flattest-vertex clean below 0.1, closed cubic 12 per span, resample 24, the band = the wall drawn 24 wide rasterised at 1
    unit per pixel; road gates need max(perimeter ÷ 6, ½π·minBlock) of wall from every gate, highway gates shifted ≤ 1 along
    the wall; segments between gates, wet parts cut, gateless pieces dropped; gatehouses minWidth × (minRoad + 2·minWidth), wall
    towers on water maps, height 15. CONFIRMED (item 61's palisade sentence).
12. `River`: width 20 + (¼ min half-view − 20)·B3²; entry at π·u on the circle of radius diagonal + width, exit at + π(½ + u);
    two Chaikin passes of entry → centre → exit; knots pushed along the normal by width × (2 or 5) × √B3 × cos(2π(s ÷ λ + g)),
    λ = width·2^(3.5 + B3²), from the first extremum every λ ÷ 2, plus both ends; cubic 8 per span; resample ½ width. CONFIRMED.
13. `Elevation`: persistence 0.3 + 0.15·F4, 5 octaves over a 2√ratio × 2 ÷ √ratio domain; dry type from {plain ×2, hill ×2,
    ridge, valley}; the primitives with the constants of §2.4 (coast ramp 2^(1+S) over radius 2^(2·F4) centred at that radius
    from the centre, sign flipped with 0.3; hill at (B3, B3); island at the centre; pond offset by polar(½·S, π·u); crack along
    a line at π·u); the river carve R = ½·width·(2 − normalised height), channel = distance − R below the minimum, outside ×
    ln(d ÷ R) ÷ 2; the fork's blended distances, −1 in the channel, ÷ 4; the estuary's widening (1 + (k − 1)(1 − ramp)²), ÷ 10;
    vertical scale ½·size ÷ range × (0.1 + 0.9·X); the gradient's four vectors (uphill and downhill scaled by the normal's z²,
    two contour directions unscaled). CONFIRMED (C11).
14. `Forest`: `poisson(12, 96, 96, 0.8)` → periodic Voronoi tiled over the frame, cells with an in-frame vertex mean kept with
    their inscribed radius, rebuilt on a degenerate edge, cached per frame size; roll: dry; `grove` density > 0 else u <
    √(1 − density); in "some" mode the noise read at the point displaced by half of two offset reads > 0; houses within 6:
    distance − 6 ≥ (0.5 + B3)·radius; not in a field, orchard or the square; no non-trail road vertex within 12; not within
    pierLength of a pier root; not in the wall band; shuffled. CONFIRMED.
15. `village.utils.Bisector`: OBB then aabb in 36° frames; position (projection of the centroid + B3) ÷ 2; start edge most
    parallel to the long axis, the cut leaving it perpendicularly; the first far edge along the ray; STRAIGHT when sin² > 0.99 and
    the halves within 2 × variance; else the bend at minOffset ÷ f (½ when over ½, else + (1 − 2·that)·B3), the far edge the
    most squarely facing foot with a clear segment; the processor (default: straighten when the triangle's area ÷ chord < 1,
    i.e. a height under 2 units; fields: the arc) rejected when it leaves the polygon; balance retry; "bad poly" throws when the
    ray finds no far edge. CONFIRMED — the straight-first version (critic X2, R-V4; R8's line added).
16. `PolyBool.and` with `PolyBounds.containsPoint`: the flag is the starting parity and every crossing toggles it, so with the
    subtraction flag the second no-crossing test reads "A's first vertex is OUTSIDE B": A ⊃ B → A; disjoint → nothing (callers
    keep A); A ⊂ B → A. Critic R2 / X6 re-derived: CONFIRMED as the correction.
17. `PoissonPattern`: cell r ÷ √2; 50 candidates at r·(1 + 0.1u) and a uniform angle, wrapped once per axis, checked on the torus
    over 5 × 5 cells; the uneven jitter r·k·u; `fill` tiles the pattern. CONFIRMED (item 53). `JSONExporter`: scale 0.7, road
    width maxRoad × 0.7, wall thickness 0.7, trees 5 × 0.7; no unit word in the class (J-Fcode-9). The bundle holds one version
    string, 1.6.9 (no other 1.6.x). The folded draw's mean: 0.2335 by 4·10⁵ draws (7/30 = 0.2333).

**Fantasy Manor 1.0.0 build 890 (unminified), read in the extracts this session:**
1. `ManorScene`: five equal layout weights; ring sides from an 8-entry list (¼, ⅜, ¼, ⅛ for 4, 5, 6, 8), radius 100 + 100·m3,
   regular, closed on the same object; closed plans from a 6-entry list (⅓, ½, ⅙), radius 80 + 120·m3, angle (i + m3) ÷ n;
   arcs from a 9-entry list, ⌊2 + u(n − 2)⌋ + 1 points (3 … n) → 2 … n − 1 wings; rect 100 + 80·m3 by 160 + 160·m3 at a
   uniform angle; snake on a 4 × 4 lattice of pitch 90 + 30·m3 with stop chance (k − 3) ÷ 13, ten direction tries, collinear
   merge at cosine ≥ 0.999; wing width 90 − 30·s4; grass tone 70 ± 25, free patch ½, vertex patches with chance 2 ÷ stored
   vertices pushed by 1 + 0.5·m3 with radius 40 + 60·m3; path length 100 + 200·m3; shadow offset = the light turned a quarter
   turn × 10 ÷ V(tint); scale min(width, height) ÷ 800; the keys (Enter; Shift+Enter = view-only rebuild; C = slate then the
   same; Space, F, G, N, P, S; no L). CONFIRMED (item 59's layout rows; R-F1, R-F2, R-F5).
2. `Manor`: centring on the vertex mean of the stored list; porches domes with ½, towers round when porches are domes else a
   second coin (¾ round); wings for every segment, open ends pulled in by 1 ÷ segments; passes: all corners, all blocks, all
   rows and porches, towers, then the door fallback (one random lone projecting bay when no porch registered a door); the
   shape list = dormers and blocks only; towers: square-on-blocks with ½ per block at side ⅓–⅔ of the block's short side
   and no test, else path spots (joint bisectors, midpoints, the free end) with continuation 1 ÷ (2 + accepted), radius
   0.6–1.0 × width, rejected only against accepted towers. CONFIRMED (collision pairs; R-F4).
3. `Wing`: mitre corners as the intersection of neighbouring eave lines, the outer corner mirrored through the vertex, free
   ends square; slab chance 1 − width ÷ length, length width + (length − width)(1 − s4), depth width + min(length − width,
   width)·m3, position snapped below 0.2 / above 0.8 / 0.4–0.6, the swap coin only off a linked joint, kept under the
   corner-parity rule and against earlier blocks; rows: element width width(1 + 2·s4) ÷ 3, tip and body depths, projection,
   a true dormer with (1 − d ÷ width)², slot count ⌊u(⌈L ÷ d⌉ − 1)⌋, margin (L − n·d)·m3 ÷ 2, the lone projector's 4× stretch
   with ½, slots dropped with 1 ÷ (n + 1) when n > 1, tested against the shape list taken once; the door candidate on a lone
   projecting element of the outer row (either row on open plans); porches: outer side (empty outer row, eave > width, 1 ÷
   wings), inner side (open plans, 1 ÷ wings), open start and end (½ each), one option run, widths 0.9 − 0.4·s4 capped and
   0.2 + 0.4·m3; dome 33 points, gable width × max(width ÷ 10, 5). CONFIRMED (R-F3; item 59's porch and dormer facts).
4. `Tower`: vertices at half-step angles, 64 or 4, squares turned by the axis; round–round by centre distance, else the
   polygon test. `ManorView.drawDiamond`: each short side's midpoint pushed inward by a quarter of that side gives the
   ridge — two hip triangles and two trapezoids, never a pyramid; `prepareColors`: light angle 90° + 90°·s4. CONFIRMED.
5. Executed: `sim/replay.mjs` re-run (node 24.12) — 524 lines, byte-identical to the reader's `replay.out`: three passes
   with EVERY GENERATION MATCHES and 46 generations "all 39 counters equal"; `sim/mc.mjs` re-run — 13.9 % of 20 000
   buildings without an entrance, 7.44 dormer elements of which 5.13 project (69 %), width mean 83.00, identical to the
   reader's `mc.out`. The reading's [CHECKED] grade is therefore CONFIRMED by this seat's own execution.

**Dwellings build 17195045, read in the readable extracts (`classes_r/`) this session:**
1. `Random`, `Blueprint`, `Drafter`: reset without a seed → the clock; a new seed = the generator's next raw state; URL
   plan decoded only when 0 < w, h ≤ 11 (`MAX_SIZE`), else null → the random path; polyomino stretches round(min ÷ 10) …
   round(max ÷ 10), acceptance by cell count alone; the box path round(2 + 6u) each. CONFIRMED (item 60's 11-cell drop; C1).
2. `Specs`: one discarded step; bands 10–16 / 16–24 / 24–34 with the size drawn in-stream when no tag; entrance weights 5
   (straight run), 3 (one-edge tip), 1 (straight-to-convex), 0 (re-entrant), the weighted draw consumed before a URL edge
   replaces it; storeys round(b·B3) / round(b·F4) / round(b(1 + ½F4)) from b = √cells − 1, clamped 1–8; two-storey minimum
   with spiral or stairwell; spiral 0.1 (two storeys) / 0.3 else stairwell (n − 1) ÷ (n + 1); basement n ÷ (n + 1) unless
   tagged; the spiral corner rule and the stairwell's exterior-side weights. CONFIRMED (R-D1–R-D3; C2, C3, C13, C30).
3. `Plan`: stop at cells ≤ 6·2^B3 (the rectangle rule switched off by the house); wall candidates at straight-run nodes and
   two per re-entrant corner, skipped between narrow cells; mechanical → corners first, organic → walls first, else pooled;
   the cut runs to the outline; a bend with probability L ÷ 6 keeping ⌊L ÷ 2⌋ (+1 with the fraction) edges and turning
   either way; scores (non-narrow + 1) ÷ (cells + 1) squared in product, or with hallways 1 above 6 cells and the narrow
   share below; a rejected cut retries the same area; all-narrow rooms merged when they share exactly one edge; one door per
   adjacent pair at the min-cost edge (1 + in-room neighbours, ×2 on a door cell, ties random), neighbours with fewer
   shared edges first; pruning = redundant doors (a third room joined to both by strictly cheaper doors) removed, a cheapest-
   first spanning tree from a random room, then round(half) of the remaining non-redundant doors removed at random and
   the rest kept — with connectivity 0.5 a single leftover is removed; general windows by whole runs weighted length²
   against edges × density, the entrance and spiral edges excluded, none with blank, all with transparent. CONFIRMED (R-D4;
   C6–C9; item 60's loop baseline).
4. `House`: the facade kit's parameter draw BEFORE the reset to the seed; upper storeys = the storey below minus at most one
   exterior room (not the spiral's, the stairwell's or its landing's), the most box-like remainder, removed with best² ÷
   current, skipped with slab; the basement from a throw-away plan at average 12, its largest room, the stairwell carried
   only with both its cells, dropped when its connection fails; the upper-storey connection's return value ignored (the
   unguarded failure) while the basement's is checked; stair cells common to both storeys, the cell and its eight in-room
   neighbours struck, the trapdoor (direction-less) from the remaining common cells, two console lines; leaf doors by role or
   for single-connection rooms above the basement; window density 0.9 − 0.1·(storeys − index); one chimney candidate per
   storey (never the spiral landing; below the top never the entrance landing nor a cell under or touching the storey above)
   and a kept subset of max(1, stochastic round(ground cells ÷ 16)); name flags: small < 16, large > 24 ground cells, low
   for one storey or fewer than √cells ÷ 2, tall at ≥ √cells; reroll re-plans without the stairwell, keeps a failed basement,
   writes no URL. CONFIRMED (C4, C5, C15, C20, C29, C32).
5. `HouseType`, `RegularHouseType`, `Bedroom`, `Bathroom`, `Namer`: rooms × roles trials, the best (fewest unassigned, stop
   at zero) replayed from its noted state; with zero trials the reset takes the no-seed marker = the clock; roles drawn
   without replacement to the first accepting room; fallbacks stairwell / stairhall / corridor / room / empty; 1 or 2
   specials from thirteen (none with generic), list 1 = living, bathroom, bedroom + the first special, list 2 = kitchen,
   storage, hall, gallery + the rest + one of study/library/workshop + a bedroom per upper storey + bathroom and attic above
   one storey + cellar with a basement; the bedroom's door count exempts only doors to a role object the programme never
   assigns (the dead 1.3.0 rule); the bathroom validator as tabled; the namer binds the grammar engine's random source to
   the seeded generator, uses decks, refills them with 0.3 before a later name, hands the house's flags over upper-cased.
   CONFIRMED (R-D5; C16–C19, C21).
6. Executed: `sim/shape.py` and `sim/specs.py` re-run (python3) — outputs identical to the reader's (13 recorded shapes and
   candidate counts; 92 / 92 / 92 ground cells, storeys, basements). The reading's [CHECKED] grades are CONFIRMED by this
   seat's own execution. The grammar asset's structure is recorded in the Dwellings row section below.

**FTG client (Vite bundles `0020-c9d002ab.js` and `0013-f1a86b06.js`), searched by symbol name this session** (no per-class
extracts exist for a Rollup build; the reader's `code/ftg` scratchpad holds the schema listing generated from the decode
switches and the prettified regions):
1. `IntersectionEdgeType`: 15 values 0–14, ROAD … WATERFRONT, STONE_FENCE 6, STONE_WALL 7. CONFIRMED (R-T1; C1–C3).
2. `TextureType`: 25 values 0–24, ROAD_TEXTURE_TYPE 8, LAWN 18, SAND 20. CONFIRMED (R-T3; item 49's C4).
3. `mapPositionArray`, `convertPosition`: ÷ 100. CONFIRMED (R-T2).
4. `lightPositionForBuilding`: the stored light position, else the midpoint of the outline's first two vertices; the building
   message's field 6 is `lightPosition` (fields: id, outline, name, type, specific type, light position, material, roof shape,
   height, version, note and favourite flags, colour) and no field is a door. CONFIRMED (item 50; C5).
5. The schema listing: 27 fields in the layout message; no message or field named lot or plot among the 46. CONFIRMED (item 49).
6. `determineWaterBodyType`: the outline's border-hugging length < 400 → inland, else sea. CONFIRMED (R-T4).
7. `ROOF_SCALING_FACTOR` = 0.5. CONFIRMED (R-T5).
8. The shared chunk's tables: widths (walls 6, wood wall and piers 3, fence 0.5, border 0, invisible and waterfront 1, main road
   5, road 2.5, small, dirt and trail 1.25), rims (main road 5.5, road 3, small and dirt 1.75, piers 2.25, walls 6.5, wood wall
   3.5, none for border, fence, invisible, waterfront and trail), depths (walls 10, fence and piers 1), alphas (invisible and
   waterfront 0 unless editing, trail 0.2) and the two quoted road colours. CONFIRMED (R-T6; C17, C19).
9. `getSnapDistanceForEdge` = max(snap, width ÷ 2); `mapGenerationStageParams` spreads the stage unchanged, filling only the
   material — `roadLength` verbatim; the stage default 50 and the slider 30–100 step 1. CONFIRMED (C25, C28).
10. `tools/layout/fill-plot` posted with a face polygon, answering a lot id and roofed building outlines; `postRegenerateArea`
    posts to the settlement's `regenerate` path; the face walk casts a +x ray. CONFIRMED (C27, C29, C30).
11. `edges_alpha` sampled per edge type through a UV height range; `circle_alpha` in the window lights; `matrix-green` loaded
    by the green-tint texture hook; intersections drawn as per-intersection discs of the edge's width with a wider rim (the 16
    sides accepted on the reading). CONFIRMED (C17, C20).
The reading's firewall: 0 fences; 5 distinct colour literals; "fourteen" at §0 #2 (R4).

**Accepted on the critic's quoted evidence (not re-opened):** R-M1 (spiral and hexagon), R-M2 and R-M3 (MFCG's bisector and
lot filter), R-M5 (population), R-M6 (per-district laws), R-M7 (billow), R-M8 (the rural rule), R-N1 (the 14 per-map laws),
R-N2 (the plain bisector's construction), R-N4, R-N5 (executed by the critic). Accepted on the readings alone: MFCG's
river course search and validation, district ordering, ward-group clustering, shanty scoring, coast shaping, tints,
random-mode odds and stream order; NG's templates other than rings, manor count / choice / press, building plans and
cupolas, the tree bulge threshold, hatching geometry (the reader's screenshot crop supports it), the session-cache mechanism.

## Rulings (J-Fcode-1 …)

| id | the choice | over | because |
|---|---|---|---|
| J-Fcode-1 | trace and console strings quoted in a reader-tier reading are reference identifiers: citation-only, KEEP (R5 sharpened) — they locate a code path and already stand verbatim in our own captured console logs; the design and the digest never carry them, so item 39's editor text describes NG's two hole-aware messages instead of quoting them | correcting all six readings to paraphrase every message | the paraphrase would lose the only link between a code path and our recorded evidence, and the firewall's target is the design, not the reader tier |
| J-Fcode-2 | NG's export scale 0.35 per model unit is CONFIRMED; the metre reading is released as a labelled inference (the shared GeoJSON writer's schema is metric in MFCG's instance — scale 4 = its 4 m unit; NG's dimensions read as metres are plausible: streets 3.5–21 m, building sides 8.75–12.25 m — while 1 unit = 1 m is not) | holding it until a scale bar is found (there is none in the bundle), or rejecting it | the design texts that use it (item 37's origin note, item 58 (f)'s anchor) call it a reading and recalibrate at M-1; a labelled inference is honest and NO DEFERRALS forbids an open HOLD |
| J-Fcode-3 | item 37's `cut.bendMode` default `flatten` (NG 1.2.2) for the base S8, `straightFirst` for the MFCG parity preset | `straightFirst` as the base default under emulation-first (MFCG is the town's reference) | DEFINITION §3 step 4 names watabou's bent cut "using constants we measured" — measured on NG — and §13.5's bent-cut signature targets are NG's; the MFCG preset keeps its own look; the difference is small (MFCG straightens only square arrivals with balanced halves) |
| J-Fcode-4 | item 49's "49 % of buildings in no ring" stays with source `_critic-ftg.md` F4 (row 16: 1 426 of 2 798 inside the district rings), and only the "(containment 53 %)" clause is withdrawn (row 17, F13's lots) | deleting both as resting on lawn patches | the 49 % is a district-ring figure re-derived by the FTG critic on decoded rings; deleting it mis-attributes it |
| J-Fcode-5 | item 59's timing released as a measurement of the reader's restatement (77.9 µs model-only, 620.5 µs with view geometry, node 24.12 on this machine), never as Fantasy Manor's cost | rejecting a harness timing | the design text uses it only to say the 1 ms compose bound has headroom; the measurement reproduces (the reader had ≈ 0.08 / 0.66 ms) |
| J-Fcode-6 | item 46's editor text says the metric coastal rule approximates MFCG's cell-count law (coded 2 + ⌊0.75 × cells ÷ 12⌋; recorded 3 / 4 / 5 / 7 at sizes 26 / 39 / 51 / 80) instead of "reproduces 4 / 7 / 10 / 14" | leaving the claim | the coded law depends on the cell count, so a land gate count of 8 gives 6 or 7 coastal gates by cells, not always 7 |
| J-Fcode-7 | no design block from these six rows: every correction is carried by a pass-c item (37, 39, 46, 49) as corrected in the evidence gate, and the two additions the live text needs are named as design impacts for the pass-c editors | writing blocks now | SINGLE SOURCE and the passes' order (the assembler would apply a block and then pass c would edit the same passage) |
| J-Fcode-8 | NG's §2.0 per-map parameter table, its §2.1 template constants and §2.7 building constants, and MFCG's constants are LOGIC under R5 (numbers that parameterise an algorithm), admissible in reader-tier files; they enter the design only as reference observations attached to a design decision, never as a table | ruling them content | they are facts about a program's behaviour, restated in our layout; the owner's directive excludes constant tables from the design and the rationale, which none of them enters |
| J-Fcode-9 | VG 1.6.9's export scale 0.7 per model unit is CONFIRMED; its metre reading ("0.7 m per unit", C39, V17) is released as a labelled inference on the same footing as NG's 0.35 (J-Fcode-2): the shared GeoJSON writer is metric in MFCG's instance, VG's class holds no unit word, and the dimensions it yields (houses 5.6–7 m wide, roads 5.6–7 m) are plausible | calling the metre unit read in code, or rejecting it | the design does not depend on it (its one mention, §17's E1–E6 row, records the ambiguity as removed); honesty about what the bundle says costs nothing |
| J-Fcode-10 | the three names the FM restatement harness shares with the reference (`Manor`, `Wing`, `Tower`, as its own class names) are common nouns our design already uses for the same concepts (§2.6 `Wing`), not reference identifiers adopted; R9 is satisfied by the harness staying in the session scratchpad, uncommitted and cited only by path | renaming them in a harness other scripts import | the firewall's object is distinctive identifiers, constants, grammars and code, none of which the harness carries verbatim beyond 2.4 % of 12-token shingles the critic measured; a rename would risk breaking the replay that this review re-executed |

## Row sections

### B-code/mfcg — CORRECTED
Read whole (800 lines). Firewall: no code, no fenced block, no colour literal, no word list; identifiers and source
locators (`City.hx:332`) citation-only; the grammar and palettes described by shape (36 symbols, 279 rules; 13 keys).
Re-derivations 1–9 above. Corrections: §0 #9's rural rule (R6, per the critic's `Canal.updateState` read: rural = no
bridge-site candidate, candidates being the course vertices from the third to the second-last with an inner cell on either
side minus the watergate vertices — §2.6 already says so); §9's scratchpad path names the reader session while the extracts
live in the `454522d3…` mirror. PLAUSIBLE items stay PLAUSIBLE (the 35–41 discard identity, the `City.f`/`City.d`
attributions, the equalise contraction) and none is design-bearing. Design changes this reading requires are items 45–48,
51, 53–57 (pass c), all CONFIRMED here.

### B-code/mfcg (critic) — CONFIRMED
R-M1–R-M8 stand; R-M4 re-derived by this seat with the same result; the "not re-derived" list is accurate, and this review
closed the castle order, the three passes, the Offset law, the farm split, the Raised ratios, the label path, the Markov
question and the grower rates on the extracts. No replay ran in MFCG (G6 stands).

### B-code/mfcg (impact) — CONFIRMED
The impact seat read §0, §2.0–§2.13, §6–§9 and no bundle; every claim it relies on that the queue row lists as un-re-derived
is now re-derived (receipts 1–8). Its "Design says" quotations match the live document at §4.6 and §1.4. Item 46's
"reproduces" sentence is corrected (J-Fcode-6).

### B-code/neighbourhood — CORRECTED
Read whole (791 lines). Firewall: no code; log messages quoted (KEEP under J-Fcode-1); the §2.0 / §2.1 / §2.7 tables are
logic (J-Fcode-8); the default style's values (roof brown, two greens, shadow alpha 0.4, length 0.2, direction 30°, road
width 0.4) are within R5's five examples; the grammar and word list shaped only. Re-derivations 1–8 above; the reader's
[CHECKED] receipts were re-executed by the critic (R-N5). Corrections: (a) R8's cross-reference line — the bisector read
here is NG 1.2.2's bend-first version; MFCG 12710731 and VG 1.6.9 carry a straight-first test (critic X2); (b) §8.3's "a
full re-simulation … should not be attempted: the firewall forbids it" is a lane choice, not a firewall rule (R9); (c) §0
item 10's metre reading is ruled by J-Fcode-2. The B09–B11 addenda (the NG bent-cut geometry rows) are superseded in
mechanism by §6 rows 5–13, 15 and 17 while their measured numbers stand as outputs (item 41) — for the reconciler.

### B-code/neighbourhood (critic) — CONFIRMED
R-N1–R-N5 stand; R-N3 re-derived here; the class extracts I read agree with R-N2's description at every point they touch
(start edge, corner-first, far side, flatten). The not-re-derived list is honest; six of its items are closed above.

### B-code/neighbourhood (impact) — CONFIRMED
Items 33–44 rest on R-N2, R-N5 and the receipts above; item 58 (a)–(e) re-derived except the hatching geometry (accepted on
the reading and the reader's crop), (f) released labelled. Item 37's default ruled (J-Fcode-3). Item 35's holed law re-derived
(receipt 6). The "R1 mismatch" explanation (corner-first) follows from the construction read.

### B-code/village — CORRECTED
Read whole (897 lines). Firewall: no code, no fenced block, no colour literal; class and method names and source locators
citation-only; the console strings (with the reference's spelling slips) are identifiers (KEEP, J-Fcode-1); the 20 request-tag
names and the 21 descriptive-tag constants are a vocabulary (identifiers — they stand in every captured permalink's `tags=`;
never a list in the design); the roll odds, exclusion groups, class thresholds, place odds and field constants are logic
(J-Fcode-8, as the reading's §5 asked); the grammar (symbols counted), the name lists (untranscribed), the palettes (keys by
kind, no values) and the ten clean-ups (shape plus two examples) are shaped only. Re-derivations 1–17 above — every claim the
queue row names (retry step, successor after the render (mechanism), the six streams from one seed by default,
`createDeflection` as a steering field, the staircase shores, the density formula, the steering law and gate, frontage placement
with no field test, greedy fields to 1 000 units per house, population houses × U(3, 7)) is CONFIRMED. Corrections: (1) R1 — the
folded draw's mean is 7/30 ≈ 0.233 (§2 notation, §4.2), recomputed; (2) R2 — §3.8's no-crossing clause, re-derived on the
parity flag (receipt 16); (3) R3 widened — eight cross-references drifted, not five: §0 items 6–10 (§2.10 → §2.8, §2.11 → §2.10,
§2.12 → §2.11, §2.14 → §2.13, §2.15 → §2.14) and §2.8's "Square (§2.11)" → §2.10, "spawnWharf, §2.13" → §2.12, "a farmstead goes at
its end, §2.12" → §2.11; (4) R8 — §3.10 gains the build line (VG 1.6.9 and MFCG 12710731 straight-first; NG 1.2.2 bend-first);
(5) J-Fcode-9 — §1.1's and C39's "0.7 m per unit" is a metre inference; (6) an addendum, not a correction: the ring seeds carry a
one-unit nudge. The PLAUSIBLE items stay PLAUSIBLE: the 4242 → 4243 row is CONFIRMED not to be the 1.6.9 rule (4242 steps to
204765582); the session-cached mesh's effect on permalinks follows from the read cache rule (a replay would settle it); the hull
edge case and the old build's grass marks are unexamined here. Design changes this reading requires: items 51, 53, 57 (VG half)
and 61 (pass c), all CONFIRMED; none needs a block (J-Fcode-7).

### B-code/village (critic) — CONFIRMED
R-V1–R-V7 stand: R-V1 (with the three pairs recomputed), R-V2, R-V3, R-V4, R-V6 and R-V7 re-derived by this seat with the
critic's results; R-V5 (the billow tenth) accepted on its quoted class. X1 and X7's VG half re-derived; X2 and X3 re-derived on
`village.utils.Bisector` (straight-first; the default straightening height 2 units); X6 re-derived (receipt 16). I1 stands and is
widened (R3). P5's "OPEN (version)" is a research gap about an unread old build with a named method (G3/G5: the class-by-class
diff), not a design deferral — no design claim rests on build 19251041 beyond §13.5's drift sentence, which item 61 fixes. The
"not re-derived" list is honest and this review closed it except the confluence course (`Confluence` unopened; its carve read
and consistent) and the crown tables.

### B-code/village (impact) — CONFIRMED
The impact seat read §0 and §6–§9 and no bundle. Item 51 rests on receipt 1 (and MFCG's nine-stage retry, re-derived at the
first checkpoint); item 53's VG sentences on receipts 10 and 17 (the annulus, the torus, the steering field, the staircase; the
domain warp only in the forest noise, receipt 14); item 57's VG half on receipt 9 — "claimed outward from the settlement's
centre" is the greedy rule keyed on the houses' centroid, and the MFCG half on the first checkpoint's receipt 4 (400·(1 + t4)
units² at 4 m = 0.64–1.28 ha, 2-unit = 8 m paths, one farmhouse in five); item 61 on receipts 3, 5–9, 11, 14 and 1. The editor
texts carry no identifier, code, grammar, palette or word list, and the §13.5 build stamp "19365073 = VG 1.6.9" matches the
bundle's single version string.

### B-code/manor — CONFIRMED
Read whole (638 lines). Firewall: no fenced code; three fixed colour values (the ink, the window background, one UI grey) and two
rgb forms (one of them our own measured sample) — within R5's five examples; hue and value ranges are procedural (logic);
the three side-count lists are stated as probabilities; identifiers citation-only; the harness stays reader-tier (R9,
J-Fcode-10). Re-derivations FM 1–5 above: every claim the queue row names (equal-weight layouts with regular rings and 2–7-wing
arcs, the slab as the optional hip block with chance 1 − width ÷ length and the corner-parity rule, ≈ 69 % projecting
elements, the two tower branches and tower–tower test, the porch lottery with its bay fallback and the ≈ 14 % without an
entrance, the fixed 800-unit scale, Shift+Enter and C) is CONFIRMED, and the replay that grounds every [CHECKED] statement
was re-executed with identical output. PLAUSIBLE stays PLAUSIBLE: the §2.16 distributions (a restatement's statistics —
they reproduce exactly, so they are the harness's truth, not a recording's), the stone survivorship reading, the crash's
visible effect; the timing is released as a restatement measurement (J-Fcode-5). No correction is needed; the §9
scratchpad path names the reader session while the extracts and harness this review used are the `454522d3…` mirror.
Design changes this reading requires: item 59 (STAGED, pass c), CONFIRMED; no block (J-Fcode-7).

### B-code/manor (critic) — CONFIRMED
R-F1–R-F5 stand, all five re-derived here with the same results; I6 is trivial (2.8 % of arcs, "under 3 %" and "3 %" both
fair); I7 is settled by R9 as ruled at checkpoint 1, sharpened by J-Fcode-10. The coverage row (61 of 61) matches the extract
directory. The critic did not re-run the replay; this review did, and it is identical.

### B-code/manor (impact) — CONFIRMED
Item 59 rests on FM 1–4 (collision pairs, the porch lottery and fallback, the fixed scale, the five layouts, hip ≠ pyramid)
and on the restatement for the ≈ 14 % share, which the design text never quotes as a number; the timing note is released
(evidence gate). The editor text names no identifier, code, grammar, palette or word list. Its "≈ 0.1 ms per building warm"
is the rounded 77.9 µs of the evidence gate — consistent.

### B-code/dwellings — CORRECTED
Read whole (945 lines). Firewall: no fenced code, no colour literal, no grammar syntax; the validator table and the
furnishing presets are logic (J-Fcode-8); role names, tag names and console lines are identifiers (J-Fcode-1); the
templates are described, never listed; the grammar and the two programme files are shaped with ≤ 5 examples each (four seen
names, three keys each). Re-derivations Dwellings 1–6 above: every §0 settlement the queue row names (the zero-trial clock
rewind and its reach, basement n ÷ (n + 1) over critic B6, the partition rule, the door pruning and loop rule with the R16
reversal, the dead bathroom–bedroom rule) is CONFIRMED in code, the two replays re-executed identically, and C19's grammar
structure is checked below. Correction (critic R7): §1.1's `rooms.*` row cites the furnishing at §2.8 — it is §2.12 (roles
§2.10); §2.2's basement bullet cites the later drop at §2.6 — it is §2.8–§2.9. PLAUSIBLE stays PLAUSIBLE: the C11 count
artefact, C35's rarity reading, the class count ± 5 (R11), and C21's visible two-load divergence (the mechanism is CONFIRMED
in code — the reset takes the no-seed marker — the divergence needs a two-load check this standalone seat cannot run).
Design changes this reading requires: items 52 and 60 (pass c), CONFIRMED; no block (J-Fcode-7). The grammar check: see
the note appended to the reading (structure only, words masked).

### B-code/dwellings (critic) — CONFIRMED
R-D1–R-D6 stand: R-D1–R-D5 re-derived here; R-D6 re-executed here (identical). R7 applied above; R11 stands. The
not-re-derived list is honest; this review closed all of it but the furniture and light recipes, the elevation projection
and the roof painter (accepted on the reading; none is design-bearing).

### B-code/dwellings (impact) — CONFIRMED
Item 52's Dwellings clause (the clock rewind in all-first-list houses) and FM's clock seed are re-derived; item 60's five
coded laws are re-derived (receipts 1–4) and the NG hand-off width 1–16 is accepted on the NG reading (critic X8). The
editor texts carry no identifier; "n/(n + 1) … replay-confirmed" is now confirmed by this seat's own re-execution as well.

### B-code/ftg-client — CORRECTED
Read whole (827 lines). Firewall: no fenced code; five distinct colour literals (roads, dirt road, water, day ambient, sunset
directional) — R5's limit, KEEP; API path templates, the fill-failure message and the seed help text (paraphrased) are
identifiers or citations (J-Fcode-1); the §2.5 widths, heights and breakpoints the header asks about are LOGIC (J-Fcode-8) —
admissible at reader tier, entering the design only as observations attached to a decision; the enum value lists are
vocabularies, never a list in the design. Re-derivations FTG 1–11 above cover every claim the queue row names (field 9 =
textures; 8.6 = light position; the wall as typed edges; material-only colour accepted on the reading's colour functions;
no client road legality and the 5 m metric snap floor; `roadLength` verbatim; regenerate on graph faces; fill-plot as a
server plotter; round joins; the water constants accepted on the reading with the 400 m rule re-derived). Corrections
(critic R4): "fifteen edge-type values (0–14)"; the §6 table joined; C15 before C16. PLAUSIBLE stays PLAUSIBLE (the worker;
server lots as faces of the typed graph; hedgerows as persisted trees; the district detail request). Design changes this
reading requires: items 49 (re-sourced, J-Fcode-4) and 50 (pass c), CONFIRMED; no block (J-Fcode-7).

### B-code/ftg-client (critic) — CONFIRMED
R-T1–R-T6 stand, all six re-derived here; R4 applied; R10 as carved by J-Fcode-4; I3, I4, P2, P3 stand; the coverage
grade is right.

### B-code/ftg-client (impact) — CONFIRMED
Items 49 and 50 rest on receipts 2, 4, 5 and 10; the editor texts carry no identifier; item 49's 49 % keeps F4 as its source
(evidence gate).

### A-code/_impact — CORRECTED (the evidence gate and its completion)

The gate: `docs/AMENDMENTS-2026-09-27c.md` "## Fable review (2026-09-27) — evidence gate" lists every HOLD part with
RELEASED or REJECTED and the evidence, corrects items 39 and 46's editor texts, and re-sources item 49. Items judged
CONFIRMED on re-derived evidence: 33–48, 51–56, 58, 62 (§17.1 (6) and (8) exist as the item assumes; (1)'s J-A21.01 sentence
is where item 32's provenance sentence lands). The "check first" questions: (1) item 37 — J-Fcode-3; (2) item 34 — the band
rows keep their numbers and become the per-face threshold's range, recalibrated at M-1 (a milestone task, not a
deferral): CONFIRMED; (3) item 45 — the order is read in code: CONFIRMED; (4) item 52 — the design's immunity is its own
claim (keyed sub-streams, no render draw on a model stream) and the added test makes it checkable: PLAUSIBLE until the test
runs, which is what the item provides. No editor text of items 33–62 carries a reference identifier, code, grammar,
palette or word list; two "Design says" quotations carry identifiers that the live text already holds (II.3's `createGreen`,
§3.1's `createDeflection`) and their editor changes remove them. The Ruling summary's "KEEP OURS 18" counts item 45's body
clause; the table column reads 17 (cosmetic). Completed in the continuation (appended to 27c as "evidence gate, completion"):
item 50 (the light-position field, its fallback, no door field), item 57's VG half (the greedy pick), item 59 (collision
pairs, porch lottery, fixed scale, the ridge inset; the replay re-executed), items 60 and 61 (five and eleven coded laws),
all CONFIRMED; the (c) ranges accepted as PLAUSIBLE judgments for the CONFIDENCE ruling seat with two notes (a Fantasy Manor
row; VG's range could sit at 0.80–0.85 — no change forced). Section (b)'s overturn lists checked against each reading's §6;
section (d)'s provenance rows each rest on a rule re-derived here.

### A-code/_critic — CORRECTED
Headline (1)–(4) stand; (2) checked: the folded four-draw mean is 0.2333 by a 2·10⁶ Monte Carlo (7/30). R1–R4, R6, R7
(mechanical fixes) stand and R6 is applied in the MFCG review section; R5 stands, sharpened by J-Fcode-1 and J-Fcode-8; R8
stands (applied to the NG reading at the first checkpoint and to the VG reading here; the MFCG line is in its review
section); R9 stands, sharpened by J-Fcode-10 (the harness stays in the scratchpad; its three common-noun names are not
identifier adoption); R10 stands for F13's lot figures and is carved by J-Fcode-4 (the 49 % ring figure is F4's and
survives); R11, R12 stand. All 37 re-checks stand: R-M4, R-N3, R-V1–R-V4, R-V6, R-V7, R-F1–R-F5, R-D1–R-D5, R-T1–R-T6
re-derived by this seat; R-D6 and the FM replay re-executed; the rest accepted on the quoted class. Coverage rows match the
extract directories (232, 192, 152, 61, 261); FTG's range count is the right grade. X1–X8, P1–P6 and I1–I8 stand (P5 a
research gap, not a deferral; I1 widened to eight references). The copy audit is confirmed by this seat's greps of the four
readings it had not re-checked.

## Design impacts (what another part must change; none applied here — J-Fcode-7)

| part | impact |
|---|---|
| pipeline | §4.6, when item 37 lands: the judgment index row J-P16 ("NG's perpendicular-ray far side with a fallback chain") and its Part A entry are restated — the far side is chosen from the corner (NG 1.2.2, read in code) and the ray-with-fallback chain is withdrawn; a recorded shift of the S8 mechanism, no golden exists yet |
| pipeline | §4.6 step 8, §3.5's row and §1.3: NG's console messages described, not quoted (item 39's corrected text, J-Fcode-1) |
| pipeline | §4.2 S3 (4): item 46's coastal sentence as corrected (J-Fcode-6) |
| scope | §1.4 districts row: the 49 % stays, cited to `_critic-ftg.md` F4 (row 16); "(containment 53 %)" goes (J-Fcode-4) |
| scope | §17.1 (2) check (i): the identifier list is FTG-payload only (36 names); it must gain, research-side, the watabou class and method names the six readings cite and the console strings they quote — never copied into the document; §17.1 (1) gains item 32's provenance sentence beside J-A21.01 (pass c) |
| rendering | §8.4 / §8.2 (item 54): the class ratios 0.5 : 1 : 0.3 are read at the painter's default, the ward view's landmark calls and the farm painter — the item may say "read in code" |
| determinism | none new (item 52's test stands as the check of the design's own claim; VG's successor is the NEXT stream state after the render, MFCG's and NG's the current one — the design's wording "the state the renderer leaves" covers both) |
| model, kernel | none — the village (PART III), stage 3 and the plan rung are STAGED; items 59, 60 and 61 carry their reference observations as hook text only |

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed by this reviewer):** every receipt under "What was re-derived" (MFCG 1–9, NG 1–8, VG 1–17,
FM 1–5, Dwellings 1–6, FTG 1–11) at the named class or symbol in the extracts or bundles; the NG and VG bundles' absence of
unit words and their exporter scales; the MFCG grammar body's absence of the three externals; the Dwellings grammar's
structure (masked); the VG bundle's single version string; the executed checks — the Lehmer step on the three recorded VG
pairs, the folded-draw mean, the FM seed-search replay and Monte Carlo, the FM bench, the Dwellings shape and specification
replays (all identical to the readers' outputs); the live text of §4.6, §1.4 (rows quoted), §13.5's bent-cut row, §17.1
whole, and the judgment index rows named.

**Accepted on quoted evidence:** the critic's re-checks not re-opened (listed above) and the readings' [READ] claims outside
the receipts.

**PLAUSIBLE (with the experiment that would settle it):** the metre readings of NG's 0.35 and VG's 0.7 (a scale bar or unit
in a later build, or a measured frontage in a comparable capture); the design's history independence (item 52's test); FM's
≈ 14 % entrance-less share and its other §2.16 rates (a restatement's statistics — a recorded sample would settle them);
Dwellings' visible two-load divergence in all-first-list houses (a two-load check); the (c) confidence ranges (judgments);
the readings' own PLAUSIBLE items (unchanged).

**Not done, stated plainly:** no block was written (J-Fcode-7: every design correction rides a pass-c item as corrected in
the evidence gate, and the two additions the live text needs are design impacts for the pass-c editors); the queue's marker
lines and statuses are the reconciler's; the MFCG `Bisector` and `Canal`, the VG `Confluence`, the FM `Grass`, `PavedRoad`
and `Shadow`, the Dwellings furniture, light and painter classes, and FTG's minified entry chunk beyond the named helpers were
not opened by this seat (accepted on the readings and, where they exist, the replays).
