# Weakness ledger — watabou's Neighbourhood generator (NG)

Lane: `improvements/ng` (Opus weakness miner). Started 2026-09-25. STATUS: COMPLETE (2026-09-25) — §1 summary, §2 ledger (41 entries in 10 groups), §3 restraint register, §4 top-15, §5 deferrals; Appendix H = the per-source harvest the ledger was built from. **Plus the Plot-granularity addendum at the end of the file** (2026-09-25, written after the owner's PLOT GRANULARITY ruling): 3 more entries NG-PG-1..3, restraint items K13–K14, and one new measurement (PG-A1).

Purpose: the raw material for designing something BETTER than NG. Product-scope reminder (owner, 2026-09-25): NG is the reference for **STAGE 2** (the base town/city composed of NG-class neighbourhood close-ups with consistent seams). The base (MFCG/FTG fusion) is built first; NG items are *stage-2 readiness*; stage-3 (Fantasy-Manor-style buildings on lots) and VG items are "not precluded / hooks present" checks, never requirements. Every ledger entry therefore carries a scope tag:
- **BASE** — the weakness also bites the town/city base (its subdivision, lots, buildings, rendering, export), so the base should already beat it;
- **STAGE-2** — matters for neighbourhood composition (district → NG-class close-up, seams, boundary polygons, floating-island neighbourhoods);
- **STAGE-3** — matters for the per-lot building generator hook (manor-style compositions, class rules, context vector);
- **LATER** — evolution / assignment / add-on-layer hooks (only "not precluded" checks now).

Evidence tags follow the program convention: **[STATED]** creator words, **[SHOWN]** creator image/demo, **[REC]** our recordings (captures/*), **[USERS ×n]** comment threads (n = distinct commenters), **[INFERRED]** reasoning. Confidence is per item, never uniform.

## §0 Reading record

Progress log (incremental, so partial work survives an account switch):
- read in full: `_critic.md` (479 lines), `_critic-vg-ng.md` (227 lines), `_critic-os.md` (435 lines).
- read in full: `vg-ng-devlogs.md` (1 039 lines incl. Critic-2 addendum).
- read in full: `profile-neighbourhood.md` (1 878 lines: body §0–§10, Critic addendum CA-1..CA-5, Ring-template addendum RA-0..RA-9, Critic-2 addendum, Bent-cut geometry addendum BG-1..BG-4, Bent-cut parent-face test PF-1..PF-3).
- read in full: `mfcg-posts-b.md` (767 lines).
- read in full: `os-geometry.md` (945 lines incl. Critic-2 addendum).
- read in full: `watabou-extra-a.md` (1 161 lines).
- read in full: `watabou-extra-b.md` (996 lines).
- read in full: `visual-spec.md` (743 lines; §3 NG and §5–§6 are the NG-relevant sections, the rest read for the cross-generator comparison).
- read in full: `_critic-ftg.md` §0–§6 (256 lines; FTG facts used only as the content/scale contrast for NG).
- read in full (raw, H9): every `## Comments` section of the 6 NG itch devlogs; of the NG Patreon posts 49191011, 53106327, 58808794, 59046807, 64375271, 70917627, 99067664; of 100431269, 101942512 (MFCG ↔ NG / district view), 103335095, 86093774, 101173551, 106975409, 136013772, 137631332, 138099329, 139540343, 141198168, 141879891, 145997186, 165462094 (Urban Places and cross-generator wishes), 87882877, 98918904 (MFCG twisted-bisection era), MFCG devlogs 22717, 34104, 46967, and `watabou-manor/158074424` (flagged by a keyword scan). A keyword scan (`neighbo|NG|urban place`) over all 273 archived comment sections (229 k chars) found no other NG-relevant thread; the `watabou-manor` copies of 49191011/70917627/86093774 are byte-identical to the `watabou-extra` ones. Post BODIES re-opened to verify quotes: 58808794, 59046807, 64375271, 70917627, 99067664, devlog 419965.
- read (recordings, H10): all 14 NG `console.jsonl` files (message census), all 8 capture `meta.json` headers, `captures/neighbourhood/README-vertices.md` (128 lines), the NG rows of `captures/README-labelfix-2026-09-25.md`.


## §1 Summary (outcome first)

NG's weaknesses share one root: it is an **area-filling subdivider whose only inputs are (seed, tags)**. It has no boundary input, no context (no water, walls, terrain or neighbours), no persistent model (every Enter rebuilds model and view from scratch), no metric scale, and no semantics (no uses, occupants, points of interest or street names). The users' requests follow from that root, and so does the creator's own reason for abandoning composition: "there are many things in the city generator that are not supported in NG (e.g. rivers, city walls) … I lost interest in NG" (100431269). Across the 24 distinct commenters on NG's own threads:
- 10 asked for neighbourhoods composed into a city, a city-to-district zoom, or districts that "congruently fit together … and all the roads would connect" (Javin Bond asked the same elsewhere, making 11);
- 5 asked for landmarks or "what is where";
- 5 across the corpus asked for building-level zoom.

The geometry is NOT the weak part. The bent cut is now measured:
- at most one bend, at 0.5 of the course;
- 96 % of junction ends arrive at ≥ 85°;
- the OBB chooses the axis.

The perimeter-block, terrace and hatch look is what users single out as NG's value ("The detail of NG is by far your best yet").

The improvement programme is therefore:
- **keep** the look, as acceptance-tested style constants (§3);
- **replace** the context-free, filter-based, rebuild-from-scratch pipeline with one that consumes context, constructs lots directly and persists its model;
- carry the other changes the list below names.

These are the same properties the base needs for the owner's evolution, assignment, layer and stage-3 hooks. Most NG items below are therefore tagged BASE as well as STAGE-2.

Headline numbers (all [REC], build 11441280):
- **Robustness:** 34 generation-loads, 0 errors, 0 whole-map retries. The failures are silent instead:
  - ≈ 42 % of lot leaves are discarded;
  - sliver drops run 0–42 per map (34–42 in ring bands);
  - in the ring template, 4 % of cuts are thrown away and 1 % restart.
- **Cost:** generation takes 10–96 ms per hood (64–75 µs per building), and rasterising costs more than generating (73–111 ms). Hatch triangles are 55–80 % of all draw operations, and there are up to 528 GPU uploads per map.
- **Scale:** there is none. Widths are in model units, and the view scale differs per map (0.56–1.11).
- **Size tags:** `large` can equal `medium` (762 vs 736–779 buildings).

## §2 The ledger

Entry format:
- **Who:** C = creator [STATED id], U×n = distinct users, R = our recordings.
- **Evid.:** the evidence.
- **Impact:** what it costs the user.
- **Cause:** the root cause as far as it is knowable.
- **Beat:** how a new design beats it.
- **Measure:** how the win would be measured.
- **Risk:** the risk of over-correcting, i.e. what NG gets right here.

Every entry also carries a scope tag (BASE / STAGE-2 / STAGE-3 / LATER) and a confidence label:
- CONFIRMED = the weakness itself is recorded or stated verbatim;
- PLAUSIBLE = inferred.

The "Beat" and "Measure" lines are design proposals and are always PLAUSIBLE until built and measured. NG baselines quoted in "Measure" are [REC] unless marked.

### 2.1 Generation robustness

**NG-RB-1 — Lots are made by partition-then-reject; ≈ 42 % of lot leaves are silently discarded.** BASE · CONFIRMED
- Who: R; C ("occasionally they spawn very weird ones which need to be filtered out", 58808794).
- Evid.: H3.5, H3.13 (1 333 leaves → 779 buildings); H10.5 (discarded lots are neither drawn nor exported); V18 (the perimeter-block look "is a *filter*, not a construction").
- Impact:
  - building count and courtyard size are uncontrolled by-products;
  - lot bisection is the largest model cost (≈ 42 % of model time), partly spent on leaves that are then discarded;
  - vacant plots do not exist as entities, so nothing can later be assigned to them (owner's ASSIGNMENT hook) or evolved (EVOLUTION hook).
- Cause: the whole block is bisected, then `validateOuter` removes the leaves that lost their street frontage after `indentFronts`.
- Beat: construct plots from the frontage band. Walk each street frontage, cut plots with side walls perpendicular to the frontage (burgage plots) and apply a depth law. The remaining interior becomes explicit typed entities: courtyard, garden, yard, green or vacant. Rejections become typed outcomes, never silent deletions.
- Measure:
  - discard ratio (NG ≈ 0.42) → target ≤ 0.05;
  - typed-area coverage (area of typed entities ÷ block area) → 100 %;
  - the courtyard share and the vacant-frontage share each hit a requested target within ± 5 points across 1 000 seeds.
- Risk: hollow courtyards and partly built frontages are part of NG's charm ("some blocks are partially built", vnd B2.2). Keep them as parameterised outcomes, not accidents.

**NG-RB-2 — The hole-aware twisted bisection is "still pretty glitchy". Its retries are local but have no known cap or fallback, and its MFCG sibling hangs or crashes on concave input.** BASE · CONFIRMED
- Who: C ("still pretty glitchy, but it works", 70917627; "For complex concave shapes it often produces far from perfect results and such defects as collapsed or intersecting edges can easily break it completely", 87882877); R (RA-3: "Alternative cut" 4.1 %/3.7 %, "Trying again" ≈ 1 %); U×1 (Daniel's crash report: "the variable `rect` ends up null", 61026228).
- Evid.: H1.4, H3.5, H4.4, H7.1.
- Impact: stage-2 districts are exactly the hard inputs — concave, with holes (plazas, keeps, courtyards, ring roads), clipped by walls and water. MFCG's failure modes include "Browser not responding" and empty areas inside walls.
- Cause:
  - degeneracies are not classified;
  - a failed cut is retried with fresh random parameters;
  - holes are opened by a first "slit" cut;
  - [PLAUSIBLE] the 2017 ancestor kernel uses exact float tests (H5.1; unknown for live NG).
- Beat:
  - geometry operations return typed results (ok, degenerate with a reason, or rejected with a reason);
  - retries are bounded, with a deterministic sub-seed per attempt;
  - a fallback ladder runs: bent cut → straight cut on the mean normal → axis cut → landmark or green substitution (the creator's own ring rule, which we keep);
  - predicates are robust;
  - a pathological-polygon test corpus covers concave, holed, thin, near-collinear and snapped shapes.
- Measure: over 10 000 seeded districts × every template and context:
  - 0 hangs (hard timeout per district);
  - 0 uncaught exceptions;
  - retry and fallback rates reported per template, every fallback logged with its cause;
  - p99 time per district bounded.
- Risk: the look depends on the bent cut. Robustness must not come from replacing it with straight cuts. The measured signature (BG-1/PF-3) is the regression suite: one bend at 0.5 ± 0.1 in ≥ 80 % of bent cuts, ≥ 85° arrival in ≥ 95 % of junction ends.

**NG-RB-3 — Near-parallel cuts leave hairline slivers, and wedge or triangular lots leak into the output.** BASE · CONFIRMED
- Who: R; C [SHOWN 49191011/09, 11: slivers "survive as alleys"].
- Evid.:
  - `subdivide` deficits of 4–16 (area), 0–26 (square, street) and 34–42 (ring bands) (RA-2);
  - only 42–63 % of footprints are 4-gons;
  - roof faces with 0–60° corners (43/69 in the ring maps) and triangular roof faces (14 in ring 7172) (H10.4).
- Impact: hairline alleys, unbuildable wedges and odd roofs, concentrated in curved or annular blocks.
- Cause: no minimum-width or minimum-angle constraint on the choice of a cut, only a post-hoc drop.
- Beat: score candidate cut positions by the children's minimum width and minimum corner angle, and take the best admissible one inside the measured position band (0.40–0.60). Merge or absorb residual slivers into a neighbour (a lane, a yard extension) instead of dropping them.
- Measure: share of lots whose minimum width is below w_min (target 0); share of corners below 30° (target < 0.5 %); count of triangular roof faces (target 0 outside deliberate wedge plots).
- Risk: real medieval fabric has wedge plots at acute street forks, so keep a bounded, explicit wedge class.

**NG-RB-4 — Failures are silent and leave no record.** BASE · CONFIRMED
- Who: R.
- Evid.:
  - one ring Normal block skipped its setback (`indentFronts` 105 vs `populate` 106, RA-1);
  - `BlockContent.new − Block.new` = 0–2 content retries (§7);
  - the only log is two console lines; nothing reaches the user or the export (H10.1).
- Impact: a defect cannot be found, reproduced or regression-tested except by eye.
- Cause: the generator is a demo harness ("It is still just a place to test stuff", 58808794).
- Beat:
  - every generation emits a machine-readable report (retries, fallbacks, discards, invariants checked);
  - invariants are asserted in development builds (every Normal block gets its setback, the identity checks of CA-2/RA-2 hold).
- Measure: an invariant suite runs on every seed of a nightly 10 000-seed sweep with 0 violations. Report fields are complete, i.e. every fallback has a cause code.
- Risk: none for the user; keep the product quiet.

### 2.2 Geometric quality and realism

**NG-GQ-1 — The street network is a tree of T-junctions: no crossroads, no through-routes across ring bands, no inherited hierarchy.** BASE · STAGE-2 · CONFIRMED
- Who: R; U×1 (Heath Rezabek: planned streets "crossing in squared off X shapes", 49191011).
- Evid.:
  - `Block = Street + 1 − R` (a cut tree);
  - "every junction lies on an earlier-drawn road: 361/361" (BG-2);
  - ring radials are "staggered … They do not continue from one band into the next" (RA-4).
- Impact: real towns have through-streets, market crossroads and loops. The NG network looks organic but routes badly, and it cannot carry a city's arterials across a district.
- Cause: every street is a cut inside one face, and each ring band is bisected independently.
- Beat: build the network in two tiers.
  - Tier 1: through-routes (inherited from the base city network, entering at portals and continuous across ring roads) are laid first.
  - Tier 2: bent-cut infill fills the faces between them.
  - Allow a cut to continue across an existing street when it is collinear within a tolerance, which gives occasional crossroads.
- Measure:
  - share of 4-way junctions (NG ≈ 0 by construction, [INFERRED from the identity]);
  - cycles per km² (cyclomatic number);
  - detour index = network distance ÷ straight-line distance over random frontage pairs (NG baseline measurable on the existing vertex captures; target ≤ 1.4);
  - radial continuity across ring roads.
- Risk: the dominance of T-junctions is the organic look. The creator's `RIGID` experiment: "on average, places without this tag look better" (139540343). Keep crossroads rare and tied to the hierarchy, and never produce a grid.

**NG-GQ-2 — Street width follows street length, not role.** BASE · CONFIRMED
- Who: R.
- Evid.:
  - w = a_seed + b·L, rms ≤ 0.025 model units (mu) (BG-1);
  - ring roads (a template road class) can be narrower than an ordinary street: R2 has one street at 6.244 against rings at 6.125 (RA-5).
- Impact: widths carry no information about traffic or importance, and there is no metric meaning.
- Cause: width is derived after the fact from the drawn course.
- Beat: width by class — arterial, street, lane, alley, cul-de-sac — in metres with small jitter. The class comes from network role (inherited portal class and betweenness).
- Measure:
  - width distribution per class in metres;
  - Spearman(width, betweenness) > Spearman(width, length);
  - 0 cases of a higher class narrower than a lower class.
- Risk: the length law gives a pleasant proportional variety; keep mild variation within a class.

**NG-GQ-3 — Building diversity is thin.** STAGE-3 · BASE · CONFIRMED
- Who: C (large buildings' "shapes are not diverse enough", 64375271); R.
- Evid.:
  - 99 % of buildings are one oriented rectangle (`Wing.new` ≈ `Building.new`);
  - compound plans (T, cross, large) occur in single digits per map and only for landmarks;
  - chimneys on ≈ 3 % of wings (H3.13).
- Impact:
  - houses look alike from hovel to merchant house;
  - the only building-level detail comes from handing a footprint to Procgen Mansion, which "approximates irregular polygons with squares" and fails for large buildings (70917627 body).
- Cause: lot → OBB → `Rect` → wing; plan choice is not driven by any lot or district context.
- Beat: a per-lot building-generator interface (the owner's stage-3 hook).
  - Inputs: the lot polygon, access edges and the context vector (area, frontage, road class, district type, wealth, distance to centre/market/gate/water, roster assignment, terrain).
  - Class rules as data tables choose among hovel, cottage, terrace house, merchant house with rear range, courtyard house, manor, workshop and so on.
  - Compositions (wings, L/T/U, courtyard, outbuildings) are generated lazily from each lot's own sub-seed.
- Measure:
  - entropy of plan type per district class;
  - share of lots with rear or outbuildings;
  - Spearman(wealth, footprint area) > 0.5;
  - footprint vertex-count distribution;
  - identical footprints at every zoom.
- Risk: NG's terrace rhythm — continuous streetwall, alternating roof tones — is its strongest visual. Diversity must not break the streetwall or add noise at city zoom (the creator's visual-noise ceiling, H6.9).

**NG-GQ-4 — Plots lose right angles and curved frontages break.** BASE · CONFIRMED
- Who: R; C (Urban Places: twisted bisection's "issues … too obvious (more obvious than in the city generator)"; VG-style rectangles "fail to form a streetwall", 141198168).
- Evid.: only 53–66 % of footprint corners are 89–91°; there is a distinct population of 179–190° "bent" vertices (H10.4).
- Impact: wedge-shaped houses, gaps at bends, an unconvincing streetwall.
- Cause: lot cuts come from recursive bisection of the whole block, not from the frontage.
- Beat: frontage-band plots (NG-RB-1) with explicit corner-plot rules, shared party walls, and fanned plots at convex bends that are absorbed into the rear.
- Measure:
  - share of plot side walls within ± 5° of the frontage normal (target ≥ 90 % on straight frontage);
  - streetwall gap length per 100 m of frontage;
  - share of corner plots handled by a rule rather than left as a leftover.
- Risk: the creator likes the uneven streetwall ("I like the result a lot", 58808794). Keep front-line jitter as a parameter.

**NG-GQ-5 — The boundary is generated, not an input: no rim road, dangling spurs, truncated rings, no connection to anything outside.** STAGE-2 · CONFIRMED
- Who:
  - R;
  - C (the ring template clipped by "an independently-generated patch outline", vnd B2.3 [SHOWN 419786]);
  - C ("I can generate a 'district' of any shape this way", 49191011 comment);
  - U×11 composition requests (H9 U1, including Callum Macleod's city "based on a pre-defined shape").
- Evid.: H3.11, H3.12, H1.6, H6.3.
- Impact: two NG hoods can never share a street, so a city cannot be composed from them.
- Cause: `<template>.createShape` owns the outline; nothing is fixed at the edge.
- Beat: a boundary contract. The input is a boundary polygon (with holes) whose edges are typed:
  - a street shared with a neighbour, with its width and class;
  - wall, with gates;
  - water — quay or bank;
  - open field;
  - cliff;
  - sky edge, for the owner's floating-island hook.
  Portals are fixed entry points with position, bearing, width and class. The generator must connect every portal and must not add street ends at shared edges.
- Measure:
  - portal connection rate (100 %);
  - cross-seam misalignment (0 by construction: shared edges are generated once and read by both sides);
  - dangling spurs on internal seams (0);
  - ring-truncation incidents per 100 ring hoods (0 once rings are fitted to the boundary).
- Risk: the "floating patch with trees on the rim" look is charming standalone, and is exactly what a sky island needs (no roads in or out). Keep a standalone / no-portal mode.

**NG-GQ-6 — No terrain, water, walls or other context.** STAGE-2 (context from BASE) · CONFIRMED
- Who:
  - C ("Another thing these maps would benefit from is an occasional natural feature like a stretch of coast or a cliff edge", 58808794) — never added;
  - C (planned but unbuilt templates: *River bank, Bridge, Port, Junction, Park*, 64375271);
  - C (composition rejected for lack of "rivers, city walls", 100431269);
  - R (no water in any recorded map, and no water routine appears in any of the 10 coverage samples; `colorWater` is never exercised).
- Evid.: H2.10, H4.1, H6.6, H8.2.
- Impact: docks without sea, bridgeheads without bridges, gate quarters without gates. A "docks district in NG doesn't make much sense if it's not displayed next to the sea" (creator).
- Cause: NG is flat and context-free by construction, and its area filler "could not" add water or walls naturally, which is the creator's stated reason for moving to a base mesh in Urban Places (H7.5).
- Beat: the neighbourhood consumes the base's context layers as constraints and features:
  - slope → stepped streets and building platforms;
  - water polygons → quays, banks, bridges perpendicular to flow, water gates;
  - walls → an intervallum lane, gatehouses and towers;
  - roads → portals.
  - Expose slope and flow direction per street segment for the SEWER add-on hook (gutters and drains follow street slope toward outfalls).
- Measure:
  - a context coverage matrix (district context × generated feature present), e.g. every waterfront district has a quay or bank path;
  - 0 buildings in water;
  - bridges within ± 10° of perpendicular to flow;
  - every wall-side district has an intervallum or rear-lot rule applied.
- Risk: complexity and cost. A context-free standalone hood must stay a one-click default.

**NG-GQ-7 — Squares are shapes, not places.** BASE · CONFIRMED
- Who: C (Urban Places squares needed "more right angles" plus a monument at the "nexus" "to look more like planned features rather than random empty spaces", 139540343); R.
- Evid.:
  - exactly two branches, rectangular and round (V20);
  - ring and square centres are chosen by template, not by function (RA-4).
- Impact: a market, a church forecourt and a crossroads square all look the same, and none is where town logic would put it.
- Cause: the square is template seed geometry.
- Beat: squares typed by function (market, church forecourt, well square, bridgehead), placed by rules (the junction of through-routes, in front of a landmark) and sized in m² from the population they serve.
- Measure:
  - share of squares on a tier-1 junction or in front of a landmark (target ≥ 90 %);
  - square area per 1 000 inhabitants within a target band (calibratable later).
- Risk: keep NG's "square as a void in the fabric" alongside planned squares; small squares can be accidental.

**NG-GQ-8 — No metric scale.** BASE · CONFIRMED
- Who:
  - C ("Dimensions are a mess in all my generators. Don't use them for planning anything real :)", 79147510 comment);
  - R (widths in model units; per-map view scale 0.56–1.11, BG-3; "the view rescales every map to fit the canvas", RA-4).
- Evid.: H3.4, H4.8, H5.5.
- Impact: neighbourhoods cannot be placed side by side, measured, or checked against real towns. Users of TTRPG and VTT exports need distances.
- Cause: abstract units and fit-to-canvas framing.
- Beat: metres throughout.
  - Plot frontage and depth, block size, street width, building footprint and storey height all come from distributions in metres.
  - FTG's decoded ordinary building is ≈ 10 × 10 m (103 m² median, `_critic-ftg.md` §4), a fused reference point.
  - The view scale is a viewer property, never baked into geometry.
- Measure:
  - every length in the export is in metres;
  - statistical distance (e.g. Kolmogorov–Smirnov) between generated and target distributions, targets from the later corpus phase — for now only that the statistics exist and are reported.
- Risk: none. Keep line widths and hatch pitch in screen space so the style survives any scale.

### 2.3 Variety and control

**NG-VC-1 — Neighbourhood character is controlled by 4 tag slots; wealth, class and function cannot be expressed.** BASE · STAGE-2 · CONFIRMED
- Who:
  - C ("there aren't many tools for this: it can only choose different values for the minimum and maximum street widths, the average building and block size, and some other variables", 70917627 comment);
  - U×1, asked twice (T Mexx 2022, 2025: "wealthy, clean, large homes spaced out more … poorer part … smaller, dense, squalid shacks"; "economic tags … density, size, and proximity of the buildings and perhaps alleys").
- Evid.: H3.2, H7.2.
- Impact: every hood feels like the same place in a different shape.
- Cause: the parameter surface is a handful of hidden constants behind size and template tags.
- Beat: a district character vector — wealth, density, age, function mix, planned vs organic, greenery, fortification — mapped through data tables to parameter bundles: plot frontage/depth, building-class mix, alley frequency, green share, street-width classes.
  - Exposed as a few named presets (slum, artisan quarter, merchant quarter, patrician quarter, docks, suburb) plus advanced sliders.
  - Supplied automatically by the base per district.
- Measure:
  - monotone response curves (e.g. wealth ↑ ⇒ median plot area ↑ and buildings per ha ↓) with Spearman ≥ 0.8 over sweeps;
  - preset distinctness (a classifier on generated statistics separates presets with ≥ 90 % accuracy).
- Risk: option overload is a named failure in the family ("too many of them", MFCG 61026228 comment; four options later deleted). Keep one-click defaults and put sliders behind "advanced".

**NG-VC-2 — Size control is loose and depends on the template.** BASE · CONFIRMED
- Who: R.
- Evid.:
  - `large` seed 5152 = 762 buildings vs `medium` 736–779 (CA-3);
  - ring `medium` = 1.6–2.1× the buildings of area `medium` (RA-4).
- Impact: a user cannot ask for "about 300 houses" or "2 hectares".
- Cause: size tags set a scale range with wide spread, and the view refit hides the difference.
- Beat: size as a target in area (ha), population or building count, with a tolerance, met by the generator (adjust plot depth and the green share within character bounds).
- Measure: |achieved − requested| ÷ requested at p90 ≤ 10 % across templates.
- Risk: exact counts can force unnatural packing. Honour tolerance bands, not exact numbers.

**NG-VC-3 — Few templates, and the planned context templates never shipped.** STAGE-2 · CONFIRMED
- Who:
  - C (planned *Junction, Park, River bank, Bridge, Port*, 64375271);
  - C (the ring was "a mean to test 'twisted bisection of polygons with holes'", 70917627);
  - R (only area, street, square and ring execute in 10 coverage samples).
- Impact: morphologies are limited to organic, spine, plaza and ring.
- Cause: templates are code, and new ones needed context NG lacked.
- Beat: templates as composable data — seed features (spine street, plaza, ring, bridgehead, gate approach, quay, market crossroads) plus constraints — chosen automatically from the base's district context, or requested.
- Measure: number of distinct morphologies separable by generated statistics; coverage of the base's district types (every district type has at least one template).
- Risk: CA-2's insight is that a template is "seed geometry + how many sub-areas to hand to the generic bisector". Keep templates that cheap.

**NG-VC-4 — Landmarks are generic: placed by mutual distance only, with cupolas that make them read as temples.** BASE · STAGE-2 · CONFIRMED
- Who:
  - C ("This makes them look like temples more than I'd like. Also their shapes are not diverse enough", 64375271);
  - C (the top wish was "large special buildings - temples, palaces and such", 58808794);
  - U×2 (C.R. Shelidon: "all houses and no fun"; Tubal: "generate areas around a central landmark").
- Evid.: H6.5, H7.9, H9 U3.
- Impact: a landmark has no function to hang a scene on.
- Cause: landmarks are `Manor` or large-building content chosen by weight and distance.
- Beat: landmarks typed by function (parish church, guildhall, market hall, manor, mill, inn, bathhouse) and placed by rules (the church on its square, the mill on water, the manor on a large edge lot), from the base's building roster. Add a "neighbourhood around a landmark" template.
- Measure: rule satisfaction rate (target ≥ 95 %); landmark density per ha within band; users can request a landmark and get it ≥ 99 % of the time.
- Risk: landmarks break monotony only if rare; keep density low.

**NG-VC-5 — Greenery varies more than the user can steer.** STAGE-2 · CONFIRMED
- Who: R.
- Evid.: `createGreen` on 23–58 % of Normal blocks without a tag, 77 % with `leafy` (H3.15).
- Impact: two maps with identical tags differ by up to 35 points of green share.
- Cause: a per-block random draw with no target.
- Beat: green share as a character parameter with a target mean and a controlled spread.
- Measure: at fixed parameters, the standard deviation of green share across seeds ≤ 8 points; the mean within ± 5 points of target.
- Risk: variance is also variety; control the mean, keep some spread.

**NG-VC-6 — Latent seam problem: adjacent districts would jump in character across a shared street.** STAGE-2 · CONFIRMED (in the family) / PLAUSIBLE (for composed NG)
- Who: C, MFCG devlog 34104 thread: "on one side of a street buildings are tiny and on the opposite side buildings are huge. When the 'Continuous' option is checked, the generator tries to change these parameters across districts gradually to avoid abrupt shifts."
- Evid.: H9 C5.
- Impact: a city stitched from independently parameterised neighbourhoods shows hard seams in plot size, height and density exactly along the shared streets that users want continuous (H9 U1).
- Cause: parameters are set per district with no neighbour awareness. NG has no neighbours at all, so the problem is latent there and appears the moment neighbourhoods are composed.
- Beat: parameters defined as fields over the city (per-district values plus interpolation near seams, with a per-boundary "hard / soft" flag). Hard is kept for walls, rivers and planned breaks. Both sides of a shared street read the same edge parameters.
- Measure: across every shared street, the difference in median plot frontage, building footprint area and storeys between the two sides stays within a set band on soft seams; hard seams are only where flagged.
- Risk: contrast between quarters is realistic (a patrician square beside a tanners' lane). Keep hard seams where the city model says so.

### 2.4 Editing and regeneration locality

**NG-ED-1 — No editing at all: the whole model and view are rebuilt on every Enter, and only the name can be edited.** BASE · CONFIRMED
- Who:
  - R ("there is no incremental update path", §2);
  - C (the name "can be edited and rerolled" is the only edit, 59046807 body);
  - U×2 workarounds: John Doty rerolls until it looks right, then exports to "a program where I can tweak it more"; Robert Conley assembles "slices" by hand.
- Evid.: H3.1, H9 W1–W2.
- Impact: a nearly right map cannot be fixed. The owner's EVOLUTION hook (grow, extend, convert) needs an incremental pipeline, and NG has none.
- Cause: a stateless demo architecture ("not a full-fledged generator … I chose not to spend time on UI, customisation features", 58808794).
- Beat: a persistent model with stable ids. Local operations:
  - reroll a block, lot or street with that entity's own sub-seed;
  - lock or pin entities;
  - move a street, merge or split lots.
  After each edit the pipeline re-solves only the affected region. The same machinery runs incremental growth and conversion (street widened, block densified, lot converted).
- Measure:
  - locality: after rerolling one block, 100 % of entities outside it keep identical ids and geometry;
  - edit–save–load round trip is identical;
  - the incremental and from-scratch paths agree on unaffected regions.
- Risk: the one-click reroll (Enter) is NG's simplest joy; keep it as the default, with editing optional.

**NG-ED-2 — One RNG stream couples unrelated outputs.** BASE · CONFIRMED (NG) / PLAUSIBLE (the re-roll-on-change consequence for live NG)
- Who: R (naming draws from the main stream after the model and "could still shift view-side randomness … roof tones and tree shapes", RA-9 item 4); 2017 ancestor ("any change to the order or count of random draws changes every map for every seed", os-geometry §1.3); C (a missed random call made the step images diverge from the final map, 41103311).
- Evid.: H3.22, H5.4.
- Impact:
  - adding a feature or editing the grammar changes old seeds;
  - goldens are fragile;
  - EVOLUTION requires that nothing surviving an epoch is re-rolled.
- Cause: `Random` is a single stream; `save/restore` only brackets tag rolling.
- Beat: hierarchical, hash-derived sub-seeds per entity (city → district → block → lot → building) and per concern (geometry, naming, style jitter, content), plus an epoch sub-stream for evolution.
- Measure: perturbation tests.
  - Changing the name grammar changes 0 geometry or style values.
  - Adding a layer changes 0 entities of the other layers.
  - Rerolling one block changes nothing outside it.
  - Epoch N+1 leaves every surviving entity of epoch N untouched.
- Risk: none. Keep NG's full determinism from its inputs (renders identical across independent page loads, RA-0/H10.2).

**NG-ED-3 — Saves carry (seed, tags) only; edits and overrides cannot be saved; the JSON is one-way.** BASE · CONFIRMED
- Who: C (MFCG: "No manual changes made to a map are encoded into its URL (apart from the city name)", 102377277; UP: the name is "the only thing about the place you can currently change", 145997186; JSON "can't be imported back", 62336213).
- Evid.: H4.11, H6.12, H7.12.
- Impact: nothing a user decides survives.
- Cause: the permalink is the only storage, and the export is written for City Viewer.
- Beat: a save holds seed + inputs + an ordered override/edit log (assignments, locks, edits), and JSON round-trips.
- Measure: save → load → render is byte-identical; the log replays deterministically; the edit log survives a generator version bump via a documented migration.
- Risk: format churn; version the schema from day one.

**NG-ED-4 — With random tags, Enter re-rolls the template.** STAGE-2 · CONFIRMED (behaviour) / PLAUSIBLE (UX impact)
- Who: R (H10.3).
- Impact: exploring variants of one kind needs a detour through the Tags dialog or the URL.
- Beat: "same kind, new seed" as the default regeneration; "surprise me" as a separate action (NG already has Shift+Enter for style).
- Measure: actions needed to see 5 variants of one template (target: 1 action each). The NG baseline is unmeasured: we did not record whether a non-random Tags-dialog choice persists across Enter.
- Risk: minor.

### 2.5 Scale and performance

**NG-SP-1 — Rasterising costs more than generating, and the draw architecture does not scale.** BASE · CONFIRMED
- Who: R.
- Evid.:
  - `MapScene.reset` 10–52 ms (area/street/square) and 78–96 ms (ring);
  - rasterisation 73–111 ms;
  - hatch triangles are 55–80 % of all draw operations, at ≈ 25 canvas ops per wing;
  - each tree gets its own offscreen canvas, up to 528 GPU uploads per map;
  - `Point.new` 385 k–561 k per generation;
  - ring `ObjectMap` bookkeeping 5–7 ms (H3.16–H3.18, H8.4).
- Impact:
  - NG fidelity across a whole city — the users' #1 request — multiplies these costs. A medium MFCG city has 1 000–2 000 buildings (121415691 comment), and large ones several times that. At NG's rates (≈ 75 µs of generation and ≈ 85 µs of rasterising per building, from ring R1: 1 287 buildings, 110.6 ms raster), a 20 000-building city would take ≈ 1.5 s to generate and ≈ 1.7 s per full redraw [PLAUSIBLE arithmetic];
  - the `Details` checkbox exists partly as a speed lever (70917627).
- Cause:
  - per-object canvases;
  - immediate-mode redraw of everything;
  - allocation-heavy point objects;
  - identity-keyed maps.
- Beat:
  - a retained display list with level of detail;
  - hatching batched per layer as instanced or merged geometry;
  - caching per block or district tile (MFCG's "cache per ward, not per building", visual-spec §1.1);
  - flat typed arrays and an indexed vertex arena;
  - lazy generation of close-up detail (stage 2 and 3) from sub-seeds when a region is first viewed at that level.
- Measure:
  - ms per building for generation (NG 64–75 µs) and for rendering;
  - draw ops and GPU uploads per frame at each LOD;
  - time-to-first-render of a full city at district LOD;
  - time to open one district at neighbourhood LOD (target ≤ NG's per-hood 10–96 ms at comparable building counts);
  - peak memory.
- Risk: the hand-inked tapered hatch is the charm. Keep it at close zoom through LOD rather than remove it.

**NG-SP-2 — No zoom: the geometry is fit to one canvas, and the family calls "real zoom" impossible.** BASE · CONFIRMED
- Who:
  - C ("real zoom is still impossible", 100431269 comment; District View instead of "a real zoom feature (which is too difficult for a specific technical reason)", 101942512);
  - R (NG refits every map; the wheel rotates, H10.7);
  - U×5 building-level zoom (H9 U2);
  - U×11 composition/zoom (H9 U1).
- Evid.: H4.2–H4.3.
- Impact: the region → city → district → building workflow means hopping between apps with lossy handoffs (Procgen Mansion "approximates irregular polygons with squares").
- Cause:
  - geometry and style are baked to one scale per map [INFERRED, mfcg-posts-b §2.12];
  - separate apps linked by URL parameters (382428: integration "via GET method requests").
- Beat: one resolution-independent model with LOD levels — city → district → neighbourhood → building — and scale-aware styling: screen-space line widths, hatch and label density keyed to zoom. The owner's stage-3 rule: building footprints are identical at every zoom.
- Measure:
  - continuous zoom without regeneration;
  - identical footprint geometry at every LOD (hash equality);
  - minimum drawn feature size ≥ 2 px at each LOD, with detail suppressed below it;
  - frame time at every zoom.
- Risk: the creator's objection is real: "a whole city drawn like this with all these trees and cobblestones would look too visually noisy" (58808794). LOD rules must hide detail at city zoom, and they must pass a legibility check at city zoom.

**NG-SP-3 — Cold-start overhead unrelated to generation.** LATER (web product) · CONFIRMED
- Who: R.
- Evid.:
  - `lime.media.AudioContext.new` 124–205 ms, 27–31 % of cold-load busy time "in a generator that plays no sound";
  - reloads wait ≈ 3 s on web fonts (H3.17).
- Impact: slower first map. Minor for a library, visible for a web app.
- Cause: framework defaults.
- Beat: no unused subsystems at start-up; fonts preloaded or bundled.
- Measure: cold-start time to first map (NG ready-at 202–411 ms on an M1, recorded).
- Risk: none.

### 2.6 Rendering and style

**NG-RS-1 — The neighbourhood is drawn as a context-free floating patch; the city's own close-up (MFCG District View) is "disjointed" and has none of NG's detail.** STAGE-2 · CONFIRMED
- Who: C (District View "often looks disjointed with pieces of rivers, roads, city walls … I'm not sure it's a good solution"; "no cupolas, shadows, cobbled roads or any other niceties of NG", 101942512); R (NG: no terrain, water or context, H2.10, H8.1).
- Impact: neither reference offers a convincing close-up of a district inside its city.
- Cause: two generators with no shared model; District View re-fits the viewport to a sub-polygon.
- Beat: render the chosen district at neighbourhood LOD with its surroundings at lower LOD — neighbour blocks, walls, water, roads continuing to the frame — plus an optional soft vignette instead of a dashed border.
- Measure:
  - every feature crossing the frame continues to the frame edge (0 "pieces");
  - a blind preference test of close-up vs District View-style screenshots, n ≥ 20 raters.
- Risk: keep a standalone vignette style (NG's shadowed "plateau on paper") as an option.

**NG-RS-2 — Heights are not a model property, so shadows and the 3-D export are cosmetic.** BASE · STAGE-3 · PLAUSIBLE
- Who: R.
- Evid.:
  - one `shadowLength × height` translate per wing, and "whether a wing's height is stored or derived … unknown" (§3.7);
  - City Viewer shows buildings at varying heights, so some height is exported or invented (watabou-extra-b T26 [INFERRED]).
- Impact: no skyline logic (towers, halls, two- vs four-storey houses), and 2-D shadows do not agree with 3-D.
- Cause: height is a rendering constant.
- Beat: storeys and height per building in the model, from building class and wealth; shadows computed from them; the same numbers exported.
- Measure: shadow length ∝ stored height (r ≥ 0.99); 2-D vs 3-D consistency check.
- Risk: of his hard-shadow experiment the creator wrote "(and a bit too dramatic), but not very readable" (114858238). Keep shadows subtle and optional.

**NG-RS-3 — The palette schema is not tied to what the renderer draws.** BASE · CONFIRMED
- Who: R.
- Evid.:
  - 26 keys, of which `colorWater`, `cityLights`, `colorLights` and `roadSurface` variants go unused in NG runs;
  - values are stored as strings and re-parsed 15–20 k times per generation (§4.1, H3.19).
- Impact: dead style controls; cost.
- Cause: a schema shared across generators without per-layer declaration.
- Beat: every drawable layer declares its style keys in a layer registry; palettes are validated against it; values are parsed once.
- Measure: 0 orphan keys, 0 unstyled layers, 0 parses per frame.
- Risk: styles-as-data is a strength — keep portable palette files and the six presets idea.

**NG-RS-4 — Detail competes with legibility and speed.** BASE · CONFIRMED
- Who: C (`Details` "can help to make the image cleaner. Also, skipping those details makes drawing faster", 70917627; "busier is fine; noisier is not", watabou-extra-b §4 item 8).
- Impact: users trade detail for speed, globally.
- Cause: one detail level for the whole map.
- Beat: per-LOD detail budgets (hatch, cobbles, trees) set automatically by zoom and hardware, with manual override.
- Measure: frame time within budget at every LOD, with detail enabled wherever the budget allows.
- Risk: none.

### 2.7 Labels and typography

**NG-LT-1 — Only a title: no street, square or landmark names, no legend, no scale bar, no compass, no grid.** BASE · CONFIRMED
- Who:
  - R (exactly one `fillText` per map, H8.1);
  - C (planned "street names, POIs etc.", 53106327 comment — never shipped);
  - U×3 ("where every baker is located", Allen Call; "visual indicators … an alley or a large shop", Matt Wallis; landmarks, C.R. Shelidon).
- Impact: at the one scale where streets and houses are individually legible, nothing can be named or measured.
- Cause: the demo scope.
- Beat:
  - street labels along centrelines;
  - square and landmark labels;
  - an optional numbered-pin legend;
  - a metric scale bar;
  - label density keyed to LOD, with collision avoidance (the family's skeleton-ridge labels for areas, mfcg-posts-b §2.11).
- Measure:
  - label collisions = 0;
  - labelled share of named streets at neighbourhood LOD ≥ 90 %;
  - labels stay inside their own feature;
  - a scale bar is present at every LOD.
- Risk: the creator's regional-map lesson: labels "got too noisy", so he used a legend (44405211). Keep labels optional and LOD-thinned.

**NG-LT-2 — Names are not tied to content.** BASE · CONFIRMED
- Who: C ("In the city generator these names are chosen depending on a district location and adjacent features, but here they are generated purely randomly", 58808794); R (a ring hood named "Small Ward"; the grammar offers bridge, bank and docks names on water-free maps, H3.23).
- Impact: the name promises features that are not there ("Narrow Bridge" without a bridge) [PLAUSIBLE instance: the grammar allows it; the specific map is not verified to lack a bridge beyond NG having no water at all].
- Cause: the naming grammar is conditioned only on template flags.
- Beat: naming conditioned on the context vector and the actual features:
  - district names from location and landmarks;
  - street names from destinations and uses (Bridge Street leads to the bridge, Mill Lane to the mill).
- Measure: name–feature consistency — every name that references a feature type has that feature within X m — 100 %.
- Risk: over-literal names are dull. Allow whimsy that does not claim an absent feature.

### 2.8 Data model, export and interop

**NG-DM-1 — No addressable entity model: no stable ids, no per-building objects, links by URL only, and the PM handoff is lossy.** BASE · CONFIRMED
- Who:
  - U×1 (Javin Bond's wishlist: buildings as "unique 'object[s]' … stored in the JSON", neighbourhoods "dropped into the 'cities'", masks per layer, OBJ, 103335095);
  - U×5 building zoom (H9 U2);
  - C (integration "via GET method requests", 382428; PM "approximates irregular polygons with squares", 70917627).
- Evid.: H2.8, H7.10.
- Impact:
  - nothing can be assigned, referenced across apps, or kept consistent across levels;
  - the owner's ASSIGNMENT hook needs district, neighbourhood, lot and building ids that survive regeneration and edits.
- Cause: stateless pictures, not models.
- Beat:
  - an embeddable library API with stable hierarchical ids (district/block/lot/building);
  - typed entities, and per-building parameter records so a building can be re-opened at higher detail deterministically;
  - an assignment input that overrides class rules;
  - a placement-solver interface ("N buildings of kind X dispersed under criteria Y").
- Measure:
  - id stability: 100 % of ids outside an edited region survive regeneration and edits;
  - assignment honoured ≥ 99 % within drift bounds;
  - a registration manifest test (every entity kind is registered for generation → render → export → import; the palisade "ghost" of VG 1.6.1 cannot recur, vnd A2.9).
- Risk: over-engineering a toy. It is justified here because the owner's roadmap requires the library boundary.

**NG-DM-2 — Lots and open space are not entities.** BASE · CONFIRMED
- Who: R (H10.5).
- Evid.: lots without a building are not drawn; greens are drawn fills; courtyards are negative space.
- Impact: there is no place to put a garden, a well-yard, a vacant plot for evolution, or an assignment.
- Cause: the filter-based construction (NG-RB-1).
- Beat: the block is completely partitioned into typed entities (plot: built / yard / garden / vacant / green; street; square).
- Measure: 100 % of block area is covered by typed entities; the export lists them.
- Risk: none.
- Caution: FTG has the analogous gap — "district-stage lots are not serialised as lot polygons (53 % of buildings lie in no lot)" (`_critic-ftg.md` F13). The fusion must not inherit it.

**NG-DM-3 — The generator family shares code by manual "transplant", and NG lags its siblings.** BASE · CONFIRMED
- Who: C ("I just remembered that I should transplant some of the code from the latest versions of MFCG", 99067664; "internal settings have been adjusted to make streets and buildings look more like their counterparts in the city generator").
- Evid.: H2.9, H7.4.
- Impact: NG and city output diverge, so a district looks different in each (the creator: "won't be possible to reproduce a district in Neighbourhood Generator exactly as it looks in MFCG, and it really bother me", 70917627).
- Cause: separate apps over a copied library.
- Beat: one library in which the city and the neighbourhood are two LODs of one model, not two products.
- Measure: seam and consistency test — a district's streets, walls and water at neighbourhood LOD coincide with the city LOD geometry (Hausdorff distance 0 for shared entities).
- Risk: none.

**NG-DM-4 — The export carries no semantics, no metres and no heights.** BASE · PLAUSIBLE (NG JSON schema not recorded)
- Who: C (JSON exists "for opening them in the City Viewer", 59046807); visual-spec / City Viewer evidence (watabou-extra-a §2.17: elevation not in the payload).
- Impact: third-party tools (VTT, game engines) get geometry without meaning.
- Beat: GeoJSON in metres plus a native JSON with typed entities, heights, functions and per-layer export (the owner's LAYER hook: separate VTT levels for underground, ground and sky).
- Measure: schema coverage of every model field; the round trip is lossless.
- Risk: none.

### 2.9 Simulation and content (the FTG contrast)

**NG-SC-1 — No content: no uses, occupants, shops or points of interest.** BASE · CONFIRMED
- Who:
  - C ("They look better, but they don't provide more information per square unit"; "what kind of action takes place exactly in a neighbourhood? … turf wars?", 59046807 body);
  - U×5 (H9 U3; Allen Call keeps "RNG based formula on spreadsheets" for stores and services and matches them to the map by hand).
- Evid.: H6.8, H9 W4.
- FTG contrast: buildings and people are decided before any geometry (C12 upheld); a dependency graph of ≈ 209 building kinds; ≈ 3.4 people and 5 sub-locations per ≈ 103 m² building (`_critic-ftg.md` §4).
- Impact: users run adventures in neighbourhoods (chases, curfews, guard or thief campaigns — H9 U9), but the map cannot answer "who lives here, where is the smith".
- Cause: NG is a picture generator.
- Beat: the base's content roster (FTG-class: buildings by function, households) is assigned to plots by class rules and the context vector. The close-up shows function glyphs or labels and tooltips at neighbourhood LOD.
- Measure:
  - share of buildings with a function (target 100 %, "house" counts);
  - queryable facts per hectare (NG = 0 beyond geometry);
  - rule consistency (every function sits on a plot of a suitable class, ≥ 95 %).
- Risk: clutter, and FTG's weight (server-side generation of ≈ 3–7 s per city). Keep content optional at close zoom and generate it lazily.

**NG-SC-2 — No age, decay or ruins; no lifecycle.** LATER (EVOLUTION) · CONFIRMED
- Who: U×1 (Rocky Weaver: ruin percentage, hollow fragmented footprints with rubble, 64375271); C ("in Neighbourhoods this needs to be more concrete … NG seems to me a better candidate", 64375271) — never shipped.
- Impact: every neighbourhood looks freshly built; the "wall demolished, suburb absorbed" evolution the owner wants has no representation.
- Cause: no entity state.
- Beat: a lifecycle state per entity (built, altered, converted, ruined, demolished) with an event log. Ruins are a rendering of state, not a separate generator.
- Measure: the ruin-share parameter is honoured within ± 3 points; every state change traces to a logged event.
- Risk: keep ruins opt-in.

### 2.10 UX and workflow

**NG-UX-1 — The purpose gap: a standalone patch with no place in a larger world.** STAGE-2 · CONFIRMED
- Who: C (the "uselessness" post, 59046807; "I can't see how it can be useful for anything", 58808794; demoted from Arcana, 99067664/106975409); U×9 defend its use (H9 U9) and U×11 ask for composition (H9 U1).
- Impact: the most-liked visual in the family was abandoned, and the successor (Urban Places) had to start over.
- Cause: NG was a technique demo, not a view onto a city.
- Beat: stage-2 is the answer. A neighbourhood is a zoom level of a city district, with the city's context; the standalone "urban location" mode stays for users who want a lone place.
- Measure: every district of every base city opens at neighbourhood LOD with 100 % seam continuity, within the time budget (NG-SP-1).
- Risk: do not force every user through a city first; one click must still give a lone neighbourhood.

**NG-UX-2 — Map navigation: no pan or zoom, the wheel rotates, and the scale differs per map.** BASE · CONFIRMED
- Who: C (the wheel rotates, 64375271 body); R (per-map view scale 0.56–1.11).
- Impact: a large hood's details cannot be inspected, and screenshots are not comparable.
- Beat: standard map navigation (pan, zoom, rotate) on a fixed metric scale with a scale bar.
- Measure: feature presence; scale constant across maps (metres per pixel shown and exported).
- Risk: none.

**NG-UX-3 — Hopping between generators to get detail is lossy and manual.** BASE · STAGE-3 · CONFIRMED
- Who: U×1 (T Mexx: "'zoom in' from region all the way down to floor plan", 100431269); U×1 (Pinguid: previously had to "slice and dice the city-scale image", 58808794); C (PM "is not designed to visualized 'palaces' or 'cathedrals'", 70917627).
- Impact: continuity is lost at every hop — names, shapes, what is where.
- Beat: nested navigation inside one library; each level derived deterministically from the level above plus its sub-seed; footprints identical across levels.
- Measure: information preserved across levels (ids, names, footprints identical); 0 hops outside the tool.
- Risk: none.

**NG-UX-4 (restraint entry) — One-click simplicity is NG's strength.** BASE · CONFIRMED
- Who: R (a new map in 10–96 ms of model and view time; tags only); U×1 (John Doty: "I love your generators because I can tweak the settings and re-roll a bit until I find something").
- Impact of losing it: users who want a quick map leave.
- Beat: every improvement above ships behind defaults that reproduce a good NG-like hood in one action.
- Measure: default path = 1 action to a finished map; p95 time to first map ≤ 0.5 s for a medium hood.
- Risk: this *is* the over-correction guard for the whole ledger.

## §3 Restraint register — what NG gets right, and the tests that keep it

Each item is to be preserved and verified by a regression test on generated output.

| # | property | evidence | keep-test (acceptance criterion) |
|---|---|---|---|
| K1 | Bent cut: straight or one bend near the middle; right-angled arrival; stop at the crossed corridor edge | BG-1/BG-2/PF-3 (380/519 one-bend, 80 % in 0.40–0.60; 96 % ≥ 85°; offset = half-width ± 0.01 px) | the same statistics within the measured spread on 1 000 seeds per template |
| K2 | The OBB chooses the axis; the split is positional near the middle of the major axis; child area share p10 ≈ 0.26 | PF-3 rules 1–3 | chord within 20° of the OBB minor axis in ≥ 80 % of bounded cuts |
| K3 | Perimeter blocks with courtyards, partly built frontages, uneven streetwall, terraces with alternating roof tones | vnd B2.2, xa §2.4, §3.6 | courtyard and vacant-frontage shares hit their targets; front-line jitter parameter present |
| K4 | Hand-inked look: tapered-triangle roof hatching, two-tone roof faces (dark = light × lerp(ambience, shadow, shadowAlpha)), prism shadows, lobed tree crowns | §3.6–§3.9, RA-5 | a style regression test (per-wing op mix and colour laws) at neighbourhood LOD |
| K5 | "Fake" gable roofs preferred over correct hips | C 101173551 | roof style is a parameter; default = fake gable at neighbourhood LOD |
| K6 | Degenerate subdivision → landmark substitution ("a square, a grove or a single large building") | C 70917627, RA-2 (R2 grove) | fallback ladder includes it; logged |
| K7 | Templates are cheap (seed geometry + generic bisector) | CA-2 | a new template is data, not code |
| K8 | Palettes as data; presets; selective-outline idea from the family | §4.1, vnd A2.13, xb T20 | palette file round-trip; ≥ 6 presets |
| K9 | Full determinism from the inputs | RA-0, H10.2 | byte-identical renders across runs and machines |
| K10 | One-click generation, fast | §5.2 | NG-UX-4 |
| K11 | Title placed in the emptiest corner | §3.12 | kept for standalone mode |
| K12 | Small life details (chimneys, wells, fountains, pins, trees depth-sorted against buildings) | RA-5, §4.3 | present at neighbourhood LOD, absent at city LOD |

## §4 The 15 highest-value improvement opportunities for this reference

The list is ranked by the value to the owner's product; base-applicable items rank first where their value is comparable (owner rule). "Answers" names the ledger entries each opportunity closes. Every "win measure" is PLAUSIBLE until built. The NG baseline is [REC] unless marked.

| rank | opportunity | answers | who says so | scope | win measure (headline) | NG baseline |
|---|---|---|---|---|---|---|
| 1 | **Neighbourhood on an arbitrary boundary with typed edges and portals, consuming the city's context** (water, walls, terrain, roads; sky edge for floating islands) | GQ-5, GQ-6, RS-1, UX-1 | C (composition rejected for missing "rivers, city walls"; coast/cliff wished), U×11, R | STAGE-2 (+BASE emits portals and context) | portal connection 100 %; cross-seam misalignment 0; context coverage matrix full; 0 dangling seam spurs | no boundary input; no rim road; no water in any recorded map |
| 2 | **Constructive, typed plots** — frontage-band burgage plots with perpendicular side walls; every m² of a block becomes a typed entity; no silent discard | RB-1, GQ-4, DM-2 | R, C ("weird ones … filtered out") | BASE | discard ratio ≤ 0.05; typed-area coverage 100 %; side walls ± 5° of the frontage normal ≥ 90 % | 42 % of lot leaves discarded; 53–66 % right-angle corners |
| 3 | **One model, many levels of detail** (city → district → neighbourhood → building) with identical footprints at every zoom | SP-2, RS-4, DM-3, UX-3 | C ("real zoom is still impossible"), U×5 + U×11, owner stage-3 rule | BASE | continuous zoom without regeneration; footprint hash equality across LODs; legibility at city zoom | no zoom; the wheel rotates; per-map refit; District View disjointed |
| 4 | **Robust bent-cut kernel**: typed results, bounded deterministic retries, a fallback ladder that ends in landmark substitution, robust predicates, a pathological-polygon test corpus — while keeping the measured look (K1–K2) | RB-2, RB-3, RB-4 | C ("still pretty glitchy"; MFCG hangs and crashes), R, U×1 (crash report) | BASE | 0 hangs and 0 exceptions over 10 000 districts × templates; fallback rate reported; K1/K2 statistics preserved | AC 4 %, TA 1 %; sliver drops 0–42 per map; MFCG "Browser not responding" |
| 5 | **Two-tier street network**: inherited through-routes first, bent-cut infill second; role-based metric widths; rare crossroads; radials continuous across rings | GQ-1, GQ-2 | R, U×1 (X-crossroads) | BASE / STAGE-2 | detour index ≤ 1.4; 4-way share > 0 and small; Spearman(width, betweenness) > Spearman(width, length) | tree of T-junctions (361/361 on earlier roads); width = a + b·length |
| 6 | **Stable hierarchical ids + hash-derived sub-seeds + lifecycle states** → local reroll, locks, assignment input, incremental growth, evolution epochs | ED-1, ED-2, DM-1, SC-2 | R, C (edits not savable), U×2 workarounds, U×1 ruins | BASE (hooks) | locality 100 % outside the edited region; perturbation-isolation tests pass; epoch N+1 leaves survivors untouched | rebuild from scratch on every Enter; one RNG stream |
| 7 | **Content semantics**: the base's FTG-class roster (functions, households, landmarks) assigned to plots by class rules and shown at close zoom | SC-1, VC-4 | C ("no more information per square unit"), U×5 | BASE | share of buildings with a function 100 %; queryable facts per ha > 0; rule consistency ≥ 95 % | pictures only; landmarks generic, read as temples |
| 8 | **District character vector** (wealth, density, age, function, planned/organic, greenery) → parameter bundles in data tables; size as a target with tolerance | VC-1, VC-2, VC-5 | C ("aren't many tools for this"), U×1 ×2 | BASE / STAGE-2 | monotone response curves (Spearman ≥ 0.8); preset separability ≥ 90 %; size error p90 ≤ 10 % | 4 tag slots; `large` ≈ `medium`; green share 23–58 % at fixed tags |
| 9 | **Seam-continuous parameters** (soft seams interpolate, hard seams only where the city model says: wall, river, planned break) | VC-6 | C (MFCG "Continuous") | STAGE-2 | cross-street parameter differences within band on soft seams | latent (NG has no neighbours) |
| 10 | **Metric units end to end** + reported statistics (frontage, depth, block size, widths, footprints) ready for later corpus calibration | GQ-8, UX-2 | C ("Dimensions are a mess"), R | BASE | every length in metres; statistics emitted per generation | model units; view scale 0.56–1.11 per map |
| 11 | **Per-lot building-generator interface** (stage-3 hook): lot polygon + access edges + context vector → composition (wings, L/T/U, courtyard, outbuildings) lazily from the lot's sub-seed; class rules as data; heights stored | GQ-3, RS-2 | C ("shapes are not diverse enough"), R | STAGE-3 hook + BASE data | plan-type entropy per district class; Spearman(wealth, footprint) > 0.5; streetwall continuity preserved | 99 % single-wing rectangles; lossy handoff to Procgen Mansion |
| 12 | **Render architecture for city-scale fidelity**: retained display list, batched/instanced hatching, per-block or per-tile caches, flat arrays, lazy close-up detail | SP-1, RS-3 | R, C (`Details` as a speed lever) | BASE | ms per building, render ops per frame and GPU uploads within budget at each LOD | rasterising 73–111 ms > generating; up to 528 uploads; hatch = 55–80 % of ops |
| 13 | **Labels and names tied to features**: streets, squares and landmarks named from destinations and uses; LOD-thinned; metric scale bar | LT-1, LT-2 | C (promised "street names, POIs"), U×3, R | BASE | name–feature consistency 100 %; 0 label collisions; ≥ 90 % of named streets labelled at neighbourhood LOD | one title, random name |
| 14 | **Round-trip saves and exports**: seed + inputs + override/edit log; native JSON + GeoJSON in metres; per-layer export (underground / ground / sky → VTT levels) | ED-3, DM-4 | C (edits not savable; JSON one-way), U×1 (Javin Bond) | BASE (+LATER layer hook) | save → load → render byte-identical; schema covers every model field | (seed, tags) permalink; one-way JSON for City Viewer |
| 15 | **Functional squares and landmarks + context templates** (market crossroads, church forecourt, bridgehead, quay, gate approach, "around a landmark"), chosen from the district's context | GQ-7, VC-3, VC-4 | C (planned Junction/Park/River bank/Bridge/Port never built), U×2 (landmark-centred hoods) | BASE / STAGE-2 | rule satisfaction ≥ 95 %; every base district type has ≥ 1 template | 4 templates; squares are shapes only |

**Why this order.**
- 1–4 remove the reasons NG could not become a city's close-up at all. These are its creator's reasons (context, zoom) and its recorded failure modes (discard, glitchy cuts). 2–4 are base-level in their own right, because the base subdivides blocks into plots with the same family of methods.
- 5–10 make the result realistic, steerable and persistent, and carry the owner's hooks: assignment, evolution, calibration.
- 11–15 are the richer surface that users asked for: building variety, speed at scale, names, interop, functional places.

Improvements NOT proposed (restraint):
- no oblique or 3-D default view (the creator rejected it: "not very readable", "10x more polygons", 114858238);
- no correct-hip roofs by default (K5);
- no grid-like `RIGID` default (139540343);
- no always-on labels or shadows.

## §5 Deferred — documented, not bugs to re-find

- NG baselines not yet measured, each measurable on the EXISTING vertex captures (`captures/neighbourhood/2026-09-25T10-55-*`, `profiler/paths_stats.py`, `bentcut_parent_face.py`) without a new recording:
  - detour index;
  - 4-way junction share;
  - cycles per km²;
  - plot minimum-width distribution;
  - streetwall gap length per 100 m.

  Deferred to the architecture/validation lanes that will set the targets. The ledger's "NG ≈ 0" for 4-way share is inferred from the cut-tree identity, not counted.
- The NG JSON/SVG/PNG export schemas and limits were never recorded, so NG-DM-4 stays PLAUSIBLE. One export capture would settle it; it was not needed for ranking.
- Build scope: every recorded number is itch build 11441280 (2026-06-24). NG is abandoned (99067664) and superseded by Urban Places, for which no recording exists (`_critic-vg-ng.md` §6 item 7). Urban Places facts here come from posts only.

## Appendix H — raw harvest, per source (working notes; the ledger in §2 is built from these)

### H1. From the three critic seats (`_critic.md`, `_critic-vg-ng.md`, `_critic-os.md`) — binding rulings that shape the NG ledger

- H1.1 NG recordings are all ONE itch build, 11441280 (asset tag `?428900`, 2026-06-24); NG is "formally superseded by Urban Places" (xb T23–T25), for which there is NO recording (`_critic-vg-ng.md` §6 item 7). Every NG number below is build-stamped 11441280.
- H1.2 Bent-cut (twisted bisection) parameters are UNKNOWN after all sources: bend position, endpoint-edge choice, stop predicate, street-width law, reject filter (`_critic.md` §6.4; `_critic-vg-ng.md` §6.5). C13 is back to plain OPEN: `makeCut = PointExtender.project` holds for plain `Bisector` (MFCG, VG fields, NG) but NOT for NG's `BisectorEx`, whose streets still meet both rings at right angles (V5). → a new design must specify its own bent-cut law and MEASURE right-angle arrival rather than inherit an unknown.
- H1.3 NG lots are produced by the same recursive `Bisector.partition` per `Normal` block + `indentFronts` setback; `validateOuter` DISCARDS ≈ 42 % of leaves — "the perimeter-block look is a filter, not a construction" (V18). → a waste/discard ratio of ≈ 42 % is a measurable inefficiency and a controllability problem (the look emerges from rejection, not from intent).
- H1.4 NG `BisectorEx` retry loop: ≈ 4 % alternative cuts, ≈ 1 % restarts; console shows ring-template retry lines "5 AC + 1 TA (seed 7171), 4 AC + 1 TA (7172)" per load, 0 in other files (V6, P3, re-derivation §4 item 14). Corridor subtracted inside the cut (`ExPolygon.not`); bends filleted by `getArc` (§2 row "bent-cut parameters").
- H1.5 NG content classes: `Normal` (≈ 88 %), `Manor`, `Empty`, `Green` (ring centre); `createGreen` on 23–58 % of Normal blocks, 77 % with `leafy` (§2). Templates recorded: `AreaHood`, `StreetHood`, `SquareHood` (`buildRound`, `buildSquare`), `RingHood`; planned-but-never-shipped templates per creator (64375271): Junction, Park, River bank, Bridge, Port (§2 row "full template list"). No fifth template executes in 10 samples.
- H1.6 NG hood outline = `<template>.createShape` (sampled child `PolyBounds.obb`; `PolyTransform.asScale` only in area/ring) — construction body still unrecovered; `getCloud` is VIEW FRAMING, not the outline (V21). → the NG boundary is template-generated, NOT an input: a stage-2 design needs the opposite (arbitrary boundary polygon in).
- H1.7 NG squares: exactly two branches live, rectangular (`buildSquare`) and round (`buildRound`) (V20).
- H1.8 NG RNG: `Random.save/restore` brackets random TAG rolling only (=1 when `Settings.randomTags` = 1) (V23). NG knobs a neighbourhood can vary, per creator (70917627): "minimum and maximum street widths, the average building and block size" — the stop predicate is a per-neighbourhood block-size parameter, form unknown (§2 last row).
- H1.9 Never executed in 10 NG samples: `Settings.getInfo`, `assemble` (7 272 B), `findBuilding`, `getGreenTable` (§6 item 6).
- H1.10 NG draw record keeps only SEGMENT COUNTS, not vertex coordinates → bent-cut geometry unmeasurable from our recordings until the recorder stores vertices (`_critic-vg-ng.md` §6 "most valuable next measurement — NG"; a later lane `ng-draw-vertices` LANDED `captures/neighbourhood/README-vertices.md` and `profile-ng-bends` / `profile-ng-bends-obb` addenda — read: BG-1..PF-3 and README-vertices, see H3.9, H10.4).
- H1.11 NG palette schema = 26 keys (not 27) (V27/S28). Colours: `colorRoof ["#7F604C"]`, `varRoof 0.3`, `shadowAlpha 0.4`, `colorShadow #7A8499`, `colorAmbience #FFFFFF` (P4).
- H1.12 2017 substrate robustness (from `_critic-os.md`, relevant because MFCG/NG descend from the same author's geometry habits): `Polygon.cut` with ≠ 2 crossings is a SILENT NO-OP returning the same polygon; `createAlleys` has NO depth or area guard (escape only via re-rolled ratio/angle/threshold; a stack overflow is not caught); only `openfl.errors.Error` is caught by the retry loop; a null road is silently dropped (C1, S9, S13). Determinism hazard: `aStar` neighbour order depends on the runtime's `ObjectMap` key order (row 140, §4.3 item 5). → a new design must (a) make every geometric failure explicit and typed, (b) bound recursion, (c) never let iteration order of hash maps decide geometry.
- H1.13 Critic process facts: NG profile first written from ONE capture that happened to roll the `area` template 4× at size `medium`; square/street templates, `Namer.square/street`, `Settings.resolve`, `GraphUtils.longStroke/attackDecay0`, `BuildingView.drawCone`, `PolyUtils.rand/randInner` were first misread as never-executed (`_critic.md` §1.2, CA-1). Lesson for our own validation: template-conditioned coverage — any validation of the new generator must sample every template/preset, not the default.

### H2. From `vg-ng-devlogs.md` (Part B = 6 NG itch devlogs; Part A/C only where NG-relevant)

- H2.1 Origin/robustness admission [STATED 315495]: bent-cut bisection was meant for MFCG but "wasn't polished enough - too slow and too unstable"; NG 1.0 is a from-scratch rewrite "with a better implementation of the bisection idea". → the core technique's robustness is creator-admitted fragile; what the stabilisation was is unrecovered (B4.3).
- H2.2 Aesthetic goal [STATED 315495]: bent cuts give "more natural-looking junctions" and make the recursion "less visible for the naked eye" → the design target is *unreadability of the partition*; a win must be MEASURED (e.g. junction-angle distribution, collinear-run length across generations), not asserted.
- H2.3 "Uselessness" framing [STATED 317489] + "now a part of the stack of my 'big' generators after all" [STATED 362757]: NG began as a technique demo; its PURPOSE (what a user does with a lone neighbourhood patch) was never settled by the creator. → our stage-2 answers the purpose question structurally: a neighbourhood is a district of a real city, with context.
- H2.4 Templates [NAMED-ONLY 362757 → recorded]: area/street/square/ring. Ring fallback [STATED 419786]: "If the smallest ring is too small to be cut into blocks, a square, a grove or a single large building is placed there instead" — the degenerate-case → landmark substitution pattern (good; keep).
- H2.5 Ring outline clipped by an independently generated patch outline [SHOWN 419786/01]: "the outermost ring is broken where the patch boundary cuts it". → the template and the boundary are not co-designed; rings get truncated arbitrarily.
- H2.6 Large buildings + "pins" (fountains, wells, large trees) are separate systems [STATED 419965 shortcut P]; large buildings occupy a whole block (hipped pyramid, dome) [SHOWN 362757, 419786].
- H2.7 Squares: an "absence in the block fabric" (1.1.0 image, omitted frontages) vs inserted circular plaza (419786) (B2.5) → live build has `buildSquare`/`buildRound` (V20).
- H2.8 Integration: Procgen Mansion via GET parameters (419786) — the only way to "open" an NG building in more detail is to hand a footprint to another app by URL. [STATED 382428 for VG: "all the integration users requested could be implemented via GET method requests"]. → building detail lives in a different product; no in-map level of detail.
- H2.9 Code transplant [STATED 687554]: "I should transplant some of the code from the latest versions of MFCG (and my other generators)" — NG receives shared-engine fixes only by manual back-port, periodically; NG lags MFCG between transplants.
- H2.10 NG is flat and context-free [SHOWN, all 5 NG images; 419965 layers]: no terrain, no water, no contours, no shading, no spotlight; "a floating patch on an empty field of colour"; nameplate title only, no population. Layer toggles: trees, greens, pins, roads, shadows (+ chimneys in the 2026 binary).
- H2.11 Block morphology [SHOWN, all NG images]: perimeter blocks with courtyards, alternating roof tones, some blocks entirely green, some partially built; whole block casts one drop shadow. (B2.2 construction REFUTED as ring-walk; actually bisection + ≈ 42 % discard filter — V18.)
- H2.12 Streets: launch = negative space; ≥1.1.0 = cobbled pebble texture with stippled kerb; night styles light the street network instead of windows (B3.2). NG's most distinctive device.
- H2.13 Cross-cutting (Part C): one scalar field (VG density map) drives settlement form; two block regimes (VG free-standing vs NG perimeter) are "layout templates over a common substrate"; handle degenerate subdivision by substituting a landmark; style is data and the renderer must survive no-fill and no-outline styles; every entity must be threaded through generation → render → export → viewer (palisade 740285 missed export — the "ghost write" bug class).
- H2.14 Unknowns that matter for design (B4): bent-cut parameters, cut-direction choice & stop criterion, what made it unstable/slow, patch-outline generation, frontage subdivision law, rules for greens/squares/partial blocks.
- H2.15 Comment-thread facts in this file are VG-only; NG devlog comment threads need the raw pass (H9 below).

### H3. From `profile-neighbourhood.md` (our recordings of build 11441280; all [REC])

Pipeline / regeneration
- H3.1 "The whole model and the whole view are rebuilt from scratch on every Enter — there is no incremental update path" (§2). No edit tools exist at all in NG (no warp, no drag, no per-block reroll); the only inputs are (seed, tags) (§0). → editing/locality is absent, not merely weak.
- H3.2 Inputs = seed + a 4-slot tag list (size small/medium/large; layout area/street/square/ring; modifier leafy …) (§0, CA-1). `Settings.getInfo` (601 B) and `assemble` (7 272 B, the largest unexecuted symbol) never ran in 10 samples — some UI/serialisation path is unobserved (RA-1, §9 Q17).
- H3.3 Size control is loose: `small` 71–96 buildings / 5–13 blocks; `medium` 600–779 / 43–66; `large` 762–1 343 / 63–104 — "`large` seed 5152 is no bigger than `medium` — the size tag sets a range with a wide spread, not a fixed target" (CA-3). Ring maps at `medium` carry 1.6–2.1× the buildings of area maps "for the same size tag" (RA-4).
- H3.4 No metric scale and per-map view normalisation: "the view rescales every map to fit the canvas" (RA-4); CTM scale is one value per map, 0.56–1.11 across 8 maps; widths are model units, not px (BG-3). → two NG maps cannot be laid side by side at one scale; area/length statistics are not comparable across maps. Canvas fixed at 1500 × 1100 CSS px, one canvas, zero SVG nodes (§0).

Robustness (retries/discards)
- H3.5 No whole-map retry: every whole-map stage runs exactly once (§7, RA-3). Failure handling is local and silent: (a) sliver drop — `subdivide` deficit 4–16 nodes/map in area, 26/0 square, 0/10 street, 34–42 in ring bands (RA-2); (b) `validateOuter` DISCARDS ≈ 42 % of lot leaves (1 333 leaves → 779 buildings, "58 % of lots receive a building") — a discard, not a retry, "building count varies freely" (§3.4, §7); (c) block-content retry: `BlockContent.new − Block.new` = 0–2 (§7, RA-1); (d) ring `BisectorEx`: "Alternative cut" 4.1 % / 3.7 % of splits (a fully built cut thrown away), "Trying again" ≈ 1 % (no usable cut line; restart with fresh random parameters) — console lines `BisectorEx.hx:215/237` (RA-3). The recording "cannot show whether the retry loop has a cap … or what the fallback is if every alternative fails" (RA-3).
- H3.6 One recorded content-skip: `Normal.indentFronts` 105 vs `Normal.populate` 106 in ring R1 — "one R1 Normal block skipped the setback" (RA-1) — a silent inconsistency.
- H3.7 Offsetting self-intersections handled by `Offsetter.filter`; shadow seams patched by a same-colour ½-px stroke dilation (§7) — cosmetic patches for geometric artefacts.

Geometry
- H3.8 Street network = one recursive OBB bisection of the hood (`Block = Street + 1 − R`; square `Block = Street`) — a TREE of cuts; ring is the only template with closed loops (RA-4). T-junctions only: "every junction lies on an earlier-drawn road: 361/361" (BG-2 item 6). No 4-way crossings except where two cuts happen to meet a road at the same point; no through-routes across ring bands: "Radial streets are staggered across the outer ring. They do not continue from one band into the next" because each band is bisected independently (RA-4).
- H3.9 Bent cut MEASURED (BG-1..PF-3): ≤ 1 bend (380 one-bend, 136 straight, 3 two-bend of 519); bend at 0.5 of the course (80 % in 0.40–0.60); ≥ 85° arrival at 96 % of junction ends; straight only when the two end edges are within ≈ 4–6° of parallel; fillet on 53 % of bends, no clean predictor; the OBB chooses the axis (85 % of chords within 20° of the minor axis; "start from the longest edge" REFUTED); split position along the major axis 0.40–0.60 in 66 %, child area share p10 0.26. → the characteristic look is now reproducible from measured constants; the reference itself has no hierarchy-aware street layout (all streets are cuts of one tree; every street is a T onto an older street).
- H3.10 Street width law measured: w = a_seed + b·L (drawn length), rms ≤ 0.025 mu, + ≈ 5 mu per free end; ring roads/template streets at fixed per-seed widths 6.1–8.6 mu (BG-1, BG-4). → width tracks LENGTH, not traffic/connectivity/function; the ring road can be narrower than an ordinary street (R2: one street 6.244 wider than the 6.125 rings, RA-5).
- H3.11 No rim road; streets end at the hood edge as short spurs; "some outer-band streets overshoot the hood edge as bare road spurs" (RA-4 R2); the hood "simply stops — no rim street, no outline" (CA-3 small,street). The hood has no gates/entries/connections to anything outside.
- H3.12 Hood outline from `<template>.createShape` (OBB-fitted, scaled); getCloud is view framing (RA-9 item 1). Ring roads: fixed 48-vertex polar polygons regardless of radius 55–360 px (RA-5/RA-7) → coarse at large radius, over-dense at small; the rings are not co-designed with the outline (correlation 0.33 / −0.06, RA-7).
- H3.13 Lots: `Bisector.partition` per Normal block (~20 lots) → `indentFronts` (`PolyBool.and`) → `validateOuter` ≈ 2.9 calls per accepted lot → `Building.new`; a lot = OBB `Rect`; 99 % of buildings are one wing (`Wing.new` 787 vs `Building.new` 779); compound plans rare (`buildSimple/T/Cross/Large` single digits per map); ridge axis flipped on ≈ 36 % of wings; chimneys on ≈ 3 % of wings (§3.4–3.6, RA-5). → building diversity is thin: nearly every building is one oriented rectangle; the few compound plans are landmark-only.
- H3.14 Block content: Normal ≈ 88 %, Manor ≈ 6–11 %, Empty 0–9 %, Green (ring centre only); "Manors are visibly placed on larger blocks and often at the map edge … weight probably conditioned on block area" [INFERRED] (§3.3, RA-4). No land-use semantics beyond these four classes (no market, church, guild, workshop, inn …); pins (wells/fountains/trees) are decoration.
- H3.15 Greens: `createGreen` on 23–58 % of Normal blocks (77 % with `leafy`) — ordinary variance of ±35 points between seeds with the same tags (§3.8, CA-3).

Rendering / performance
- H3.16 Cost (§5, RA-6): `MapScene.reset` 10–52 ms (area/street/square), 78–96 ms (ring); model ≈ 45–61 %; lot bisection ≈ 42 % of model time, boolean setback ≈ 22 %; roof hatching ≈ 36 % of view time and ≈ 20 % of the whole generation; ring `BisectorEx` 2–3× dearer per street, "up to half of that overhead is object-keyed map bookkeeping" (`haxe.ds.ObjectMap` 5–7 ms self). RASTERISATION 73–111 ms "costs more than the whole generation" (§5.2, RA-6). Per-wing draw budget ≈ 25 canvas ops; 55–80 % of all draw calls are 3-segment hatch triangles (§3.6, §5.4).
- H3.17 Cold start: `lime.media.AudioContext.new` 124–205 ms self = 27–31 % of cold-load busy time "in a generator that plays no sound" (§5.1, RA-6); reloads wait ≈ 3 s on web fonts ("Could not load web font Voltaire") (RA-0).
- H3.18 Allocation pressure: `openfl.geom.Point.new` 385 k–561 k per generation; `GeomUtils.intersectLines` 140 k–213 k calls = the hottest generator routine (§5.3). Palette values stored as strings and re-parsed (`Type.toFloat` 15 768–20 194× per generation) (§4.1).
- H3.19 Palette = 26 keys, schema shared with MFCG/VG; `colorWater`, `cityLights`, `colorLights`, `roadSurface ∈ {Plain, Tiles, Cobbles}` are present but never exercised in these runs (§4.1, §8) — the NG renderer carries unused vocabulary; the cobble/tile street surface visible in devlog images is palette-selected.
- H3.20 Shadows = translate-and-overdraw prism with ONE `shadowLength × height` per wing; heights not evidenced as stored ("whether a wing's height is stored or derived … unknown") (§3.7). Trees depth-sorted against buildings (§4.3). Crown vertex multiple-of-4 is a 99 % tendency (RA-5).
- H3.21 Title: one `fillText` 72px Voltaire; corner chosen per map (TL 6, BL 3, TR 1, BR 2 of 12) by least overlap [INFERRED] (§3.12). No street names, no block/building labels, no legend, no scale bar recorded.

Naming / RNG / determinism (what NG gets RIGHT — restraint list)
- H3.22 Fully deterministic from (seed, tags): coverage and draw screenshots byte-identical across independent page loads; `Math.random` ≈ never called (§4.2, RA-0). Random tags are rolled on a saved/restored RNG so a seed gives the same geometry whether tags were rolled or supplied (RA-9 item 4). BUT naming draws from the main stream after the model → "could still shift view-side randomness drawn after it, such as roof tones and tree shapes" (RA-9 item 4) → one global stream couples unrelated outputs.
- H3.23 Naming: Tracery grammar with weights/conditionals + Markov surnames; a ring hood's name need not mention a ring ("Small Ward") (RA-5). Name is not tied to content (e.g. "Narrow Bridge", "North Bank", "Meat Walk" on a map with no bridge, no bank/water, no market) [INFERRED from grammar vs flat, water-free maps — see H9/H10 for user reaction].
- H3.24 Templates are cheap: "seed geometry + how many sub-areas to hand to the generic bisector" (CA-2) — except ring, which needs a hole-aware bisector (RA-9). Restraint: this cheapness is a virtue to keep.

### H4. From `mfcg-posts-b.md` (MFCG Patreon 2021-03 → 2025-02; the NG-relevant half: MFCG ↔ NG coupling)

- H4.1 NG ↔ city composition REJECTED by the creator [STATED 100431269 comment]: "It's not hard to pass a shape, but there are many things in the city generator that are not supported in NG (e.g. rivers, city walls). Opening a docks district in NG doesn't make much sense if it's not displayed next to the sea, does it? At some point I was planning to implement some of these missing features, but then I lost interest in NG to be honest." → THE single most important stage-2 fact: the reason NG never became a city's close-up is missing CONTEXT (water, walls, neighbours), not missing geometry.
- H4.2 District View as the substitute [STATED 101942512]: "Instead of implementing a real zoom feature (which is too difficult for a specific technical reason) and integration with the Neighbourhood Generator (which is doable, but complicated for a number of reasons), I've added something in between." It is "drawn exactly in the same way as in the 'city view'. So there are no cupolas, shadows, cobbled roads or any other niceties of NG." Known weakness: "District view often looks disjointed with pieces of rivers, roads, city walls … district border is drawn explicitly as a thick semi-transparent dashed line. I'm not sure it's a good solution." [SHOWN 101942512/06]: roof details are NOT more detailed in district view (no level of detail); JSON export still exports the whole city.
- H4.3 "Real zoom is still impossible" (100431269 comment); inferred cause: geometry/line widths baked to one generation-time scale (§2.12 [INFERRED]). → multi-scale rendering (city ↔ district ↔ neighbourhood ↔ building) is an architectural gap across watabou's whole family.
- H4.4 Twisted bisection fragility in MFCG [STATED 87882877]: "The idea of twisted bisection is simple enough, but my implementation of it is not. For complex concave shapes it often produces far from perfect results and such defects as collapsed or intersecting edges can easily break it completely." Failure modes: (1) empty areas inside walls → user rerolls via shift-/ctrl-click; (2) "Generator not responding" (exception escapes; press Enter); (3) "Browser not responding" (unbounded loop). 0.10.1: freezes gone, crashes "very occasional", empty-area glitch "hard to fix" (98918904). User crash report with permalink: `Cannot read properties of null (reading '0')`, "the variable `rect` ends up null" in twisted+complex+offset (61026228 comments). Creator: "since the 'twisted' method is very new, I'm sure there will be more."
- H4.5 Twisted lots "Occasionally it produces weirdly looking shapes, but for my taste this method is currently the best-looking-on-average one" (61026228) — the creator trades occasional ugliness for average beauty; no filter guarantees.
- H4.6 Smoothing the input boundary is itself a robustness measure (98918904: smoother curved alleys and district borders "reduce the number of glitches").
- H4.7 District-wide merging makes streets propagate the outer shape inward: "There is no underlying landscape of course, it's just 'twisted bisection' propagating properties of the outer shape inside" (87882877) — the NG look is a function of the boundary; therefore a stage-2 neighbourhood's look depends on the district boundary the base hands it.
- H4.8 Scale honesty [STATED 79147510 comment]: "Dimensions are a mess in all my generators. Don't use them for planning anything real :)"; Procgen Mansion cell ≈ 3 m; 2×2 m and 4×4 m buildings both render as a 1-cell "shack".
- H4.9 Military (oblique) projection rejected [STATED 114858238]: unreadable ("hard to see individual streets and some buildings get completely obscured"), "much slower with all the checks, sortings and 10x more polygons", walls/trees hard to draw raised; the creator suggests the projection would suit "a future focused 'urban location' generator (squares, alleys, crossroads, bridges)" — i.e. an NG-class close-up. Shadows "will be optional, as in my other generators".
- H4.10 MFCG converges on NG visually (wider alleys, NG tree algorithm with fewer details, `Natural` preset ≈ NG `Cool`, weathered roofs "the same way as in NG and VG but without shadows") (§4 item 4) → NG's look is the family's quality reference for close-ups; restraint: keep it.
- H4.11 Manual edits not persisted; permalink round-trip keeps only the city name; re-pasting a permalink "subtly changed the city geometry" (102377277 comment) — same-seed reproducibility gap across versions; JSON export one-way, City Viewer the only loader, schema drifted (2026 `addWall` failure) (62336213, 114184619 comments).
- H4.12 Options overload admitted: "too many of them" (61026228 comment), four options deleted in 0.11.1; users protested losing favourite combinations (102377277 comments). → NG's near-zero option surface (tags only) is the opposite pole; both extremes frustrate somebody.

### H5. From `os-geometry.md` (2017 geometry/utility layer — the ancestor of the `com.watabou.geom` substrate NG still runs on, per profile-neighbourhood §8)

- H5.1 Shared substrate, inherited habits: NG's hottest routine is `GeomUtils.intersectLines` (140 k–213 k calls/gen, H3.18), whose 2017 form uses exact `== 0`/`!= 0` float tests for parallelism and component choice and returns "enormous finite parameters rather than null" for near-parallel lines (§2.5, §4 item 3). Whether the live NG kept these tests is unknown (bundle closed) — but NG's recorded silent failure handling (H3.5) is consistent with a kernel that does not classify degeneracies.
- H5.2 "The primitives are permitted to be fragile because the top level retries" (§1.4) — the 2017 design philosophy; NG has NO top-level retry (H3.5), only local silent drops, so a fragile primitive in NG shows up as a missing lot/block or a sliver rather than a re-roll.
- H5.3 Identity-keyed topology and object-keyed maps (§1.1; profile RA-6 shows NG's `ExPolygon` still spends 5–7 ms in `haxe.ds.ObjectMap`) → un-serialisable state, O(n) adjacency, aliasing. Rewrite verdict in the source file: DCEL / indexed vertex arena.
- H5.4 One global PRNG stream: "any change to the order or count of random draws changes every map for every seed" (§1.3) → NG inherits: naming shifts view-side randomness (H3.22); a new feature re-rolls every existing seed. Rewrite verdict: named, hash-derived sub-streams.
- H5.5 Abstract units: "regular street is 1.0 wide" (§1.5) — never metric; NG likewise (model units, per-map CTM, H3.4).
- H5.6 Keep-list (restraint): per-edge inset by half the adjoining street width as the street-corridor mechanism; `cut(gap)` + `peel` corridor carving; `Random.fuzzy(f)` fuzziness dial; compactness as a shape gate (0.7/0.75); pinned-vertex Laplacian smoothing (§5).
- H5.7 Non-robust Voronoi/in-circle predicates and the unbounded retry loop ("a seed that fails deterministically is an infinite hang with no diagnostic", §1.4) — MFCG-side, but the same author's "Browser not responding" failure in twisted bisection (H4.4) is the same class: no iteration caps surfaced to the user.

### H6. From `watabou-extra-a.md` (33 other watabou posts 2019-07 → 2022-04; NG launch era)

- H6.1 NG's charter [STATED 53106327 comment]: "a pretty compact thing … for testing the 'recursive bisection with a twist' algorithm before transplanting it into MFCG." Curved streets had been moved to "an alternative city generator-editor" because retrofitting MFCG was "too risky" (34822131) — that alternative became NG. → NG was never designed as a context-aware close-up of a city.
- H6.2 Bent cuts cut district→blocks AND block→buildings; "occasionally they spawn very weird ones which need to be filtered out" [STATED 58808794] — degenerate footprints are discarded, not repaired. Near-parallel adjacent cuts leave hairline slivers that "survive as alleys" [SHOWN 49191011/09, 11].
- H6.3 Junctions are almost all T, never X [SHOWN]; user Heath Rezabek (49191011, 2021-03-25) proposes "planned wide streets crossing in X shapes with organic streets filling in" — not adopted. Creator: "I can generate a 'district' of any shape this way" — the bisection accepts an arbitrary boundary (so the arbitrary-boundary input a stage-2 design needs exists in principle; the product never exposed it).
- H6.4 Uneven streetwall [STATED 58808794]: "I like the result a lot, although I have my doubts about the method I use for it" — method withheld; [INFERRED] the street polygon and the building polygons disagree afterwards.
- H6.5 Large buildings [STATED 64375271]: landmarks, one per block, "often fails to fill it all" (planned fix: trees around it); they "tend to be at some distance from each other"; cupolas make them read as temples; shapes "not diverse enough"; `secular` tag suppresses them. → landmark function is ambiguous (temple? hall?) and footprints are thin in variety.
- H6.6 Templates Area / Street / Square; planned but never built: Junction, Park, River bank, Bridge, Port [STATED 64375271]. The water/bridge/port templates are exactly the context NG lacks (H4.1).
- H6.7 NG titles [STATED 58808794]: "a simplified version of district names from MFCG. In the city generator these names are chosen depending on a district location and adjacent features, but here they are generated purely randomly." → name ↔ content decoupled (a hood can be called "Narrow Bridge" without a bridge).
- H6.8 Information density [STATED 59046807]: "I know these neighbourhood maps are perceived as more detailed than MFCG's city maps, but in reality they are not. They look better, but they don't provide more information per square unit." Test for worth: "what kind of action takes place exactly in a neighbourhood?" → the reference's own author names its weakness: detail without semantics (no uses, no occupants, no interiors, no points of interest).
- H6.9 Visual-noise ceiling [STATED 58808794 comment 2022-02-05]: "a whole city drawn like this with all these trees and cobblestones would look too visually noisy, wouldn't it?" — creator's reason to resist the users' strongest request (H6.10). → an improvement must solve composition with LEVEL OF DETAIL, not by drawing NG fidelity everywhere at city zoom.
- H6.10 Users' strongest recurring request in this slice [USERS, 58808794/59046807, multiple]: MFCG districts rendered at NG fidelity, stitched into a whole city, with matching roads across seams (counted in H9: U×11).
- H6.11 Ruins [64375271 comments]: "in MFCG everything is pretty abstract and I could draw ruined buildings just lighter (or darker). But in Neighbourhoods this needs to be more concrete" — user proposed hollow fragmented footprint + rubble underlay; creator put NG first in line; never shipped (no ruin symbol in the 2026 recording). Building counter for NG/VG agreed in principle ("a window with a single number looks... sad") [64375271 comment].
- H6.12 Export: NG 1.0.1 exports PNG / SVG / JSON "for City Viewer" [STATED 59046807]; the SVG path is watabou's generic draw-call capture library (no text/gradients originally, dashed lines as many solid segments, §2.16). City Viewer's "Macro" orthographic view renders NG as a tabletop diorama (64845431). JSON is one-way (H4.11); save/load postponed "before the architecture is stable" (32650629 comment).
- H6.13 Palette-invertible layer stack (§3): "Old Ward" fills streets, "Pearl Ward" fills blocks and leaves streets as paper — keep every layer separately colourable (restraint: a good NG property). Hollow courtyard buildings appear from the block→building bisection ("Pearl Ward") [SHOWN].
- H6.14 Style model: one parameterised renderer, styles as data; four hand-written VG styles killed because they blocked SVG export (43602231); users wanted non-default styles for round-tripping into Photoshop / Campaign Cartographer / Inkarnate, not for aesthetics (43602231 comments).
- H6.15 Rendering nuance [STATED 55959636]: "snap the simulation to the grid, never the drawing" (1PDG water) — a family principle worth keeping.
- H6.16 Map rotation on mouse wheel (NG 1.1.0) — a view feature; tags dialog UX: shift-click a tag shows its effect (1PDG/PS).

### H7. From `watabou-extra-b.md` (32 other watabou posts 2022-07 → 2026-08; NG 1.2.x, NG's demotion, Urban Places)

- H7.1 Ring template = a test harness, not a goal [STATED 70917627]: "adding this template wasn't my goal, but a mean to test 'twisted bisection of polygons with holes'" — "still pretty glitchy, but it works"; destined for MFCG. (Recorded: AC 4 %, TA 1 % retries, H3.5.)
- H7.2 Neighbourhood CHARACTER control is thin [STATED 70917627 comment, reply to a request for socio-economic neighbourhood classes]: "The generator does try to convey a different feeling (it's a little broader than 'class') … However, with the current algorithm/approach, there aren't many tools for this: it can only choose different values for the minimum and maximum street widths, the average building and block size, and some other variables." Same request again, unanswered, for Urban Places [USERS: T Mexx, 141198168: "economic tags changing density, building size, proximity and alley frequency"].
- H7.3 MFCG ↔ NG integration [STATED 70917627 comment]: "popular request … will be implemented in some form", but "Most likely, it won't be possible to reproduce a district in Neighbourhood Generator exactly as it looks in MFCG, and it really bother me." (Later abandoned: "I lost interest in NG", H4.1.) → the composition seam problem is creator-acknowledged as unsolved.
- H7.4 NG 1.2.1 = pure transplant [STATED 99067664]: "faster and more stable", gradients dropped for trees, presets more contrast, "internal settings adjusted to make streets and buildings look more like their counterparts in the city generator"; NG excluded from Arcana. 106975409: NG demoted; its successor Urban Places is "focused less on filling an area with blocks (because it's clearly a domain of MFCG), more on creating relatively small urban locations with their own character". → the creator himself concluded NG's area-filling approach competes with MFCG and lacks "character".
- H7.5 Why NG could not grow (the successor's stated advantages, 136013772): on a persistent base mesh "more diverse content (e.g. water, fortifications) can be added naturally", "an editor (to mark blocks, water areas etc.) can be implemented relatively easily", "the concept of the warp tools is also applicable here" — i.e. NG's area-filling subdivider could not add water/walls/editing naturally. UP: "Once the map is created, the base mesh is 'fixed' in a number of ways … rivers now tend to be more uniform in width" (138099329).
- H7.6 Twisted bisection rejected for frontage buildings in UP [STATED 141198168]: "Initially I tried the 'twisted bisection' method, which is used in MFCG. This method has some issues and here they were too obvious (more obvious than in the city generator)." VG-style detached rectangles "fail to form a streetwall" at bends (gaps "can't be zero"). New wall-to-wall method along curved streets gives "not exactly rectangular" buildings; "almost rectangles will do"; may force straight-skeleton roofs. → both of watabou's lot methods have a named failure at curved frontages.
- H7.7 UP: `WALL` tag "much harder than I could expect. There's nothing special about the algorithms, but for a long time, all the results looked wrong" (139540343); `RIGID` 90° turns but "on average, places without this tag look better"; `STREET` highway tag; constant-width rivers with perpendicular bridges; squares get "more right angles" + a monument at the "nexus" to read as planned; grid ≈ 25 m, cell size in metres (145997186) — the only metric statement in the family.
- H7.8 Roofs: NG draws "fake" gable roofs that "for my eye … look better than mathematically correct hip roofs" (101173551) — restraint: correctness lost to appearance by the creator's choice; straight-skeleton ridges look good only at medium map scale ("on small maps … imperfections … more visible, and on large maps all the roof details blend together").
- H7.9 NG 1.2.0 features (70917627): NG→Procgen Mansion handoff now passes house SHAPE, not just size; road surfaces Plain/Cobbles/Tiles; `Road width` ratio (drawn centre vs. true building-to-building width); dashed schematic roads; large buildings get spires/dormers, trees planted around them when the plot is much bigger than the building, "mutually spaced apart"; `Details` checkbox (roof hatching + tree shading) doubles as a SPEED lever; multi-colour style parameters.
- H7.10 Power-user data-model wishlist [USER Javin Bond, 103335095 comment, unanswered]: per-building objects in the JSON "so a mansion can be dropped into a neighbourhood; neighbourhoods droppable into cities; cities droppable into the realm map; SVG masks for every layer; simple OBJ export for shadow maps; layered, UV-mapped OBJs". → exactly the nested city ⊃ neighbourhood ⊃ building hierarchy the owner's stage 2/3 wants.
- H7.11 Labels: curved labels ignore holes; wild curvature not smoothed (109092851) — relevant because NG has no street labels at all (H3.21).
- H7.12 Editing honesty (§4 item 13): "Editability is bolted on late and is expensive" — in UP the name is "the only thing about the place you can currently change" (145997186).
- H7.13 Design rulings to respect (restraint): "correctness loses to appearance" (fake gables, `RIGID` off by default, labels unsmoothed); "busier is fine; noisier is not"; scale-dependent detail; "ship the imperfect auto-placement plus a manual override".

### H8. From `visual-spec.md` (our draw records and screenshots; NG §3, cross-generator §5–§6)

- H8.1 NG furniture is minimal: "Voltaire 72 px … one line, top-left, no halo, no subtitle, no scale bar, no compass, no grid. Exactly one `fillText` per map" (§3.7); comparison table §5: NG is the ONLY one of the four with no scale bar, no compass, no grid, no halo, no labels beyond the title. → at the scale where streets and houses are individually legible, NG offers no way to read distance or to name anything.
- H8.2 No water in any captured NG map; 3 stroke colours total (§3, §3.2). NG "does not fill the street corridor, it draws a stripe down its middle" — pixel cut: building → ink → ground 10 px → street stripe 6 px → opposite row's shadow 6 px → ink (§3.6). Road casing absent ("the only street colour, no casing").
- H8.3 Street caps square; two `05-38-59` maps carry one extra very wide width repeated 7× ("a high-street/market-frontage class", §3.3 [MEASURED]; per BG-3 these are template streets at a per-seed fixed width, in model units).
- H8.4 ≈ 80 % of all NG fills are roof-hatch triangles (§3.4); trees each get their own offscreen canvas → up to 528 GPU uploads per map, "the opposite trade" of MFCG's per-ward caching (46 000 fills in 590 uploads) (§6 item 20). → NG's renderer is the least scalable of the family: city-scale NG fidelity with this draw architecture would multiply texture uploads by the district count (feeds H6.9's visual-noise AND cost ceilings).
- H8.5 Recorder caveat: several NG draw logs hit the 60 000-entry cap (`logDropped` up to 270 k) — heavy NG maps exceed our own instrumentation's capacity; layer-order claims come from uncapped logs only (§8).
- H8.6 Shadows = one flat `#7a8499` pass (fill + 1 px stroke, 0.5 px dilation), compositing mode unknown (`#7a8499` → `#a19e9a` over ground is "not a clean multiply or a single alpha") (§3.3 item 4, §7 item 7). Single fixed light direction (`shadowDir` per palette) (§4.1 in profile).
- H8.7 Cross-generator minimum renderer list (§6) — what the base's renderer must already do; NG adds: tapered-triangle hatch ticks, per-tree lobed canopies (143–291 segs), square-cap per-street widths, prism shadows.

### H9. Original comment threads — what USERS ask for, complain about, or work around (raw pass)

NG itch devlogs: only 2 comments in 6 threads (praise; one French request for a forest/"Lord of the Rings" style, 419965). NG's user voice is on Patreon. Distinct commenters, deduplicated across threads:

| theme | who (distinct users) | n | representative words (≤ 1 short quote each) | creator's answer |
|---|---|---|---|---|
| U1 compose neighbourhoods into a city / link MFCG districts to NG / NG-fidelity city / roads matching across seams / "zoom in" | Callum Macleod (49191011, city from a pre-defined shape), Pinguid (49191011, 58808794), Vicky Radcliffe (58808794), Matt Wallis (58808794), T Mexx (58808794, 70917627, 100431269), Moritz Hackl (59046807), C.R. Shelidon (59046807), Robert Conley (59046807), Rin Vindor (59046807), Simen Lande (59046807), Javin Bond (103335095) | **11** | Matt Wallis: districts "that can congruently fit together … and all the roads would connect" | visual-noise objection (58808794); "will be implemented in some form … won't be possible to reproduce a district … exactly" (70917627); finally "I lost interest in NG" (100431269) → District View substitute |
| U2 building-level zoom (any building → its plan) | T Mexx (100431269: "right click in ANY building for its floor plan"), Javin Bond (103335095), Kevin Cork (86093774), Marius (64375271), T. Hill-Hand (MFCG devlog 22717: drawn polygon → floor plan) | **5** | T Mexx: "Cities really seem to need two different levels of Zoom" | PM handoff exists but "Procgen Mansion approximates irregular polygons with squares" and large buildings "will look not like you expect them to" (70917627 body) |
| U3 landmarks / points of interest / "what is where" (shops, bakers, a bank, a temple avenue) | C.R. Shelidon ("all houses and no fun made Jack a dull boy"), Tubal ×3 comments (areas around a central landmark), Allen Call (map ↔ store spreadsheets; players asking where every baker is), Matt Wallis (visual indicators of an alley or a large shop), Vicky Radcliffe (building counts to populate) | **5** | Tubal: "generate areas around a central landmark, instead of … generic neighbourhoods" | large buildings added 1.1.0/1.2.0 (no function); street names/POIs promised in 53106327 ("street names, POIs etc.") — never shipped |
| U4 neighbourhood character by wealth/class/function | T Mexx (70917627 in 2022; again for UP 141198168 in 2025) | 1 (×2) | "wealthy, clean, large homes spaced out more, while a poorer part of town might be smaller, dense, squalid shacks" | "there aren't many tools for this" — only min/max street width, average building and block size |
| U5 ruins | Rocky Weaver (64375271) | 1 | percentage slider; hollow fragmented footprints + rubble | "NG seems to me a better candidate"; never shipped |
| U6 X-crossroads / planned main streets vs organic fill | Heath Rezabek (49191011) | 1 | planned streets "drawn first, crossing in squared off X shapes" | not adopted |
| U7 bug | Tubal (64375271): Tags → Generate gives a blank map | 1 | — | fixed |
| U8 style | doubledy (itch 419965) | 1 | forest / LOTR style | — |
| U9 usefulness affirmed + use cases | Pinguid, John Doty, Vicky Radcliffe, Allen Call, C.R. Shelidon, Robert Conley, Moritz Hackl, Rin Vindor, Simen Lande | **9** | Allen Call: chase scenes, home cities, "where every baker is located"; C.R. Shelidon: curfew/plague quarantine, jurisdiction-split investigations; Robert Conley: neighbourhood-life campaigns, city guards, thieves | creator: "what kind of action takes place exactly in a neighbourhood? … turf wars?" (59046807 body) |

Workarounds users describe (the demand signal behind them):
- W1 reroll-until-right then export to another program to tweak (John Doty, 58808794) → no in-generator editing; the only editable property is the name (59046807 body: "The name of a neighbourhood can be edited and rerolled").
- W2 assemble a city by hand from NG slices / collage (Robert Conley, C.R. Shelidon, 59046807) and, before NG, "slice and dice the city-scale image" of MFCG (Pinguid, 58808794).
- W3 hop generators for a region → city → floor-plan "zoom" workflow (T Mexx, 100431269); MFCG's own editing is "a slog because it focuses on an entire city at once" (Robert Conley).
- W4 external spreadsheets for shops/services matched to the map by hand (Allen Call, 59046807); LionHeart5 in MFCG devlog 22717 asks for a demographics generator tied to a map with distance scale.

Creator statements surfaced only in the raw bodies/threads (verified verbatim):
- C1 "It is still just a place to test stuff, not a full-fledged generator. That's why I chose not to spend time on UI, customisation features etc." (58808794 body).
- C2 "The main (and only?) reason why I'm not planning to turn this into a 'real generator' is that I can't see how it can be useful for anything. But if I would decide to keep working on it, the most important thing to add would be large special buildings - temples, palaces and such." + "Another thing these maps would benefit from is an occasional natural feature like a stretch of coast or a cliff edge." (58808794 body) — the coast/cliff was never added.
- C3 "functionalities of the neighbourhood generator and the city generator overlap too much … They look better, but they don't provide more information per square unit" (59046807 body).
- C4 "I have a couple of ideas on how to improve NG … but since I am planning to exclude this one from the Arcana, it's probably not worth spending time on them." (99067664 body) — NG is abandoned except for transplants.
- C5 MFCG "Continuous" layout option [STATED, MFCG devlog 34104 thread]: "Every district has a set of parameters affecting its layout … on one side of a street buildings are tiny and on the opposite side buildings are huge. When the 'Continuous' option is checked, the generator tries to change these parameters across districts gradually to avoid abrupt shifts." → the district-SEAM problem is known in the family; its fix is parameter interpolation across districts (evidence for stage-2 seam design).
- C6 Clean-room consonance: asked for the source to feed an AI assistant, the creator refuses ("they're just going to feed the code to Claude or whatever. No.", watabou-manor/158074424 thread) — consistent with our standing clean-room rule; no weakness, recorded so no future lane asks.

### H10. Our recordings, re-counted for this ledger (captures/neighbourhood/*, no bundle opened)

- H10.1 34 generation-loads recorded across 8 captures (05-04-54: 12; 05-38-59: 4; 05-40-05: 4; 07-20-25: 6; 10-55-19/36/47/59: 8), one build (11441280). Console census: only `Hood.hx:42` stage lines, `BisectorEx.hx` retry lines (ring only: 11 per two-seed pass = 9 "Alternative cut" + 2 "Trying again"), web-font warnings on reload, a deprecated meta-tag warning. **Zero errors, zero crashes, zero whole-map retries** [REC]. NG's robustness weakness is silent discard, not failure.
- H10.2 Determinism holds across independent page loads and across the vertex-recorder flag (README-vertices "Same-seed check") [REC].
- H10.3 `key:Enter` re-rolls the template when tags are random: "NG's default regeneration (`key:Enter`) picks a new template: the base capture … changed tags on every Enter. Reload keeps gen-1 on the same template" (README-vertices) — to get a new layout of the SAME kind the user must fix tags in the Tags dialog/URL [REC; UX reading INFERRED].
- H10.4 Footprints: only 42–63 % of building footprints are 4-gons; 53–66 % of corners are 89–91°; a distinct population of 179–190° vertices (bent edges); roof faces include triangles (14 in ring 7172) and 0–60° corners (43/69 in the ring maps) (README-vertices tables) → the "weird shapes" the creator filters still leak as wedge/sliver roofs in ring maps [REC].
- H10.5 "Lots without a building are not drawn at all" (README-vertices) — the ≈ 42 % discarded lots leave no trace in the image or export (no yard/garden/vacant-plot entity) [REC].
- H10.6 Label-fix caveat (captures/README-labelfix-2026-09-25.md): NG class tables before 2026-09-25 mis-credit `Street.(anon@208613)` (a `BlockContent` closure) and `WellView.(anon@287226)` (a `nlp.Markov` closure); every count this ledger uses is a NAMED method count (`Street.new`, `Block.new`, `BlockContent.new`, `WellView.new` …), which the fix does not move. The profile's §1.3 row "`WellView.(anon)` 163,0,0,0" is Markov corpus building, not wells.
- H10.7 Not recorded at all (so NOT claimed as weaknesses): PNG export resolution limits, SVG export fidelity, JSON export schema, `Settings.getInfo` UI, performance at sizes beyond `large`. Zoom: NG has NO zoom/pan — the mouse wheel ROTATES the map (64375271 body) and the view is refit per map (H3.4); the shortcut list has no zoom (419965 body) [STATED + REC].
- H10.8 Time per stage, size and render vs generation [REC, profile §5 + RA-6; profiles exist only for `medium` area/street/square (05-04-54) and `medium` ring (07-20-25)]:
  - `MapScene.reset` runs 10.4–52.2 ms (non-ring) and 77.7–96.0 ms (ring). The model is 45–61 % of it; within the model, lot bisection is ≈ 42 % and the boolean setback ≈ 22 %. Within the view, roof hatching is ≈ 36 % (61–69 % of `BuildingView.draw` in ring).
  - Per building: 64–75 µs of `MapScene.reset` (ring).
  - Rasterisation (`Context3DShape.render`) is 73.3 ms (area gen-2) and 100–111 ms (ring). In all three maps where it was reported it costs more than generation (47.1 / 96.0 / 77.7 ms).
  - Size scaling is recorded only through draw volume: ops scale linearly with wing count (≈ 25 canvas ops per wing, §5.4). No `small` or `large` profile exists, so time-vs-size is extrapolated, not measured.
  - Our recorder's 60 000-entry draw-log cap was hit by heavy NG maps (H8.5). The 1500 × 1100 canvas is the recorder's viewport, not an NG export limit.

## Plot-granularity addendum (2026-09-25, after the owner's PLOT GRANULARITY ruling)

Lane `improvements/ng-plot-granularity` (same Opus weakness-miner seat as the ledger). STATUS: COMPLETE (2026-09-25).

**Why this section exists (judgment call, vetoable).** The owner's PLOT MODEL and PLOT GRANULARITY rulings (2026-09-25) arrived after this ledger landed (08:06). Under the RESUME RULE the ledger was not redone: §0–§5 and Appendix H are unchanged, and only the status line at the top was touched. The ruling is about exactly the level this reference covers: a prosperous neighbourhood JOINS plots, a poor one SPLITS them, institutions join the plots they need, and the gaps between plots become ALLEYS and back lanes. The IMPROVEMENTS synthesis that reads this file had not landed. So the NG evidence that bears on the ruling is gathered here:
- three entries, NG-PG-1 to NG-PG-3;
- two restraint items, K13 and K14;
- one new measurement on existing captures.

To veto, delete this section.

Sources re-opened and checked verbatim for this section:
- `watabou-extra/70917627/post.md`: T Mexx's comment (2022-09-04), the creator's reply (2022-09-05), and the body passages on large buildings and the ring fallback;
- `watabou-extra/141198168/post.md`: the body, and T Mexx's comment of 2025-10-15, which has no reply among the 2 archived comments;
- `watabou-extra/64375271/post.md`: the body passage on large buildings;
- findings: `profile-neighbourhood.md` §3.2–§3.5, §3.8, §3.10; `_critic-vg-ng.md` row "pn §9 Q1"; `os-wards-render.md` §4, §4.1, §4.4, §6.2; `_critic-os.md` rows 81, 84, 96, 101; `mfcg-devlogs-a.md` §2.10, §2.29; `profile-mfcg.md` §4.7, §12.1, ST-4; `watabou-extra-a.md` §2.1; `ftg-posts-a.md` §2.12;
- `docs/improvements/ftg.md` GEO-1 census.

### PG-A1 Measured NG baseline — size structure and party walls [REC]

This is a new measurement on the eight existing 2026-09-25 vertex captures: build 11441280, size `medium`, seeds 7171 and 7172, four templates. No bundle was opened.
- Command: `python3 captures/neighbourhood/plot_granularity_baseline.py` (stdlib only). The table below is its verbatim output.
- Footprints are the building outlines after the set-back (`profiler/paths_stats.py` class "lots").
- Units are canvas px. Every statistic is computed within one map, so the per-map view scale (0.56–1.11) cancels out.

| capture · gen (template) | footprints | area p10 / p50 / p90 (px²) | CV | Spearman(dist, area) | outer⅓ ÷ inner⅓ median area | Moran I (k=8) | ≥ 1 shared wall | shared-wall length ÷ perimeter | exact shared vertex |
|---|---|---|---|---|---|---|---|---|---|
| 2026-09-25T10-55-19 · gen-0 (ring) | 1334 | 123 / 188 / 276 | 0.43 | -0.06 | 0.95 | -0.04 | 96 % | 42 % | 64 % |
| 2026-09-25T10-55-19 · gen-1 (ring) | 1270 | 194 / 286 / 406 | 0.34 | +0.01 | 1.01 | +0.01 | 96 % | 43 % | 63 % |
| 2026-09-25T10-55-36 · gen-0 (area) | 950 | 132 / 208 / 304 | 0.45 | +0.01 | 1.02 | -0.03 | 95 % | 42 % | 65 % |
| 2026-09-25T10-55-36 · gen-1 (area) | 858 | 249 / 360 / 503 | 0.29 | -0.04 | 0.95 | +0.02 | 97 % | 43 % | 61 % |
| 2026-09-25T10-55-47 · gen-0 (street) | 449 | 326 / 486 / 717 | 0.37 | -0.03 | 0.93 | -0.03 | 99 % | 41 % | 65 % |
| 2026-09-25T10-55-47 · gen-1 (street) | 447 | 389 / 550 / 787 | 0.31 | +0.02 | 1.02 | -0.01 | 96 % | 41 % | 59 % |
| 2026-09-25T10-55-59 · gen-0 (square) | 258 | 460 / 741 / 1200 | 0.38 | +0.00 | 0.93 | -0.01 | 97 % | 42 % | 67 % |
| 2026-09-25T10-55-59 · gen-1 (square) | 295 | 457 / 654 / 884 | 0.25 | -0.06 | 0.93 | +0.03 | 99 % | 39 % | 56 % |

Definitions:
- "dist" is the distance from a footprint's centroid to the area-weighted centroid of all footprints.
- Moran's I uses the 8 nearest centroids with binary weights.
- A shared wall is a collinear overlap of at least 2 px between two footprint edges that lie no more than 0.1 px apart.
- "Exact shared vertex" uses the definition FTG's ledger used (a vertex within 1e-6 px of another footprint's vertex).

What the table shows:
- **Building size has no spatial structure inside a hood.**
  - There is no radial gradient: Spearman(distance to centre, area) is −0.06 to +0.02, and the outer third's median area is 0.93–1.02 × the inner third's.
  - There is no clustering: Moran's I is −0.04 to +0.03, so no patch of the hood is richer or poorer than another at any scale above the single lot.
  - The within-map spread in size (CV 0.25–0.45) is spatially random.
- **Attached terraces are near-universal.**
  - 95–99 % of footprints share at least one wall with another footprint, and 39–43 % of all footprint perimeter is party wall.
  - 56–67 % share an exact vertex, against 6.4 % for FTG (`docs/improvements/ftg.md` GEO-1).
  - NG is therefore the family's party-wall reference. It has no detached regime: only 1–5 % of footprints stand free.

### PG-A2 Cross-walk — the ruling's clauses against NG

| ruling clause | NG today (evidence) | ledger entries already carrying it | new entry |
|---|---|---|---|
| a prosperous neighbourhood joins plots: fewer, larger plots with bigger buildings, yards and courts | one building-size knob per hood [STATED 70917627 reply]; no size structure within a hood [REC PG-A1]; "yards" only as random greens (23–58 % of Normal blocks) and the ≈ 42 % of discarded leaves [REC H3.5, H3.15] | VC-1, VC-5, RB-1 | NG-PG-1 |
| a poor neighbourhood splits plots: more, smaller plots with little or no yard | the same knob; the dense terrace is the only regime | VC-1 | NG-PG-1 |
| an institution or an assigned large building joins the plots it needs | a whole block or nothing: `Manor` blocks (6–11 %) are never partitioned, typically carry one large building [INFERRED from counts], and the rest becomes a grove [REC §3.2–§3.5, §3.8] | VC-4, GQ-3, DM-1 | NG-PG-2 |
| the gaps between plots and buildings become alleys and back lanes: many narrow ones in dense poor quarters, few wide ones in rich quarters | no alley or lane class; slivers survive as alleys by accident [SHOWN]; block interiors are leftover residue [REC §3.4] | RB-3, GQ-2, DM-2 | NG-PG-3 |
| one code path: subdivision depth and merge rules read the same per-plot context vector as the class rules | per-hood constants; the content class is a weighted draw per block [REC §3.3] | VC-1, GQ-3, DM-1 | NG-PG-1, measure (d) |
| row houses end to end with party walls (PLOT MODEL) | already done, near-universally [REC PG-A1] | GQ-4 (streetwall) | restraint K13 |
| institutions set back, with several disjoint buildings around a yard | typically one hall inside a walled compound [INFERRED from counts]; the rest is trees [REC §3.5, §3.8, §3.10] | GQ-3 | NG-PG-2 |
| a hovel is one small footprint on a plot that is mostly yard | no detached or hovel regime [REC PG-A1] | GQ-3 | NG-PG-1 |

### PG-A3 New ledger entries

**NG-PG-1 — Plot granularity is one constant per neighbourhood: building and lot size do not respond to wealth, district type, density or position, and there is no detached regime.** BASE · STAGE-2 · CONFIRMED
- Who:
  - C. Asked for socio-economic classes, the creator named the only knobs: "minimum and maximum street widths, the average building and block size, and some other variables" (70917627 reply).
  - U×1, asking twice. T Mexx in 2022: "wealthy, clean, large homes spaced out more, while a poorer part of town might be smaller, dense, squalid shacks" (70917627). In 2025, unanswered: "Wealthier areas would have larger disconnected buildings while impoverished slums would be quite dense with adjacent buildings and more alleys than green space between streets" (141198168). This is the one user request in the corpus that states the owner's ruling almost word for word.
  - R: PG-A1.
- Evid.:
  - PG-A1: Spearman −0.06 to +0.02; Moran's I −0.04 to +0.03; 95–99 % of footprints attached.
  - H1.8: the recursion's stop test is a per-neighbourhood block-size parameter of unknown form (`_critic-vg-ng.md` row "pn §9 Q1").
  - H3.3 (size tags) and H3.15 (green share).
- Impact:
  - A patrician quarter and a slum differ only by seed and hidden constants, and within a hood no street is richer than another.
  - There are no detached houses with gardens, no hovels in yards and no large town houses on wide plots.
  - Neither the owner's "prosperous joins, poor splits" nor T Mexx's request can be expressed.
- Cause:
  - the recursion stops at a per-hood threshold;
  - block content is a weighted draw ([INFERRED] the weight is probably conditioned on block area, §3.3);
  - no quantity varies over space.
- Precedent in the family — the idea is proven, and NG is the member that lost it:
  - **2017 ancestor.** Granularity was set per ward class:
    - minimum lot area `minSq`: Slum 10–40 and Craftsmen 10–90, against Merchant 50–110 and Patriciate 80–110 (abstract units);
    - leaf-drop probability `emptyProb` (holes that read as courtyards): Slum 0.03, against Merchant 0.15 and Patriciate 0.2;
    - location rules: merchants near the centre, slums far from it, patriciate next to parks and away from slums.
    - Sources: `os-wards-render.md` §4.4 and §6.2; `_critic-os.md` rows 81, 84 and 101, all SUPPORTED.
  - **Live MFCG.** The 13 ward classes collapsed into `Alleys` plus special wards (`profile-mfcg.md` §4.7, §12.1). Each district keeps randomly drawn layout parameters: "how regular is the grid of its alleys, how big are the buildings" (`mfcg-devlogs-a.md` §2.10). The option that smoothed those parameters across districts, "Continuous", was removed in 0.5.5 (§2.29).
  - **FTG.** Lifestyle drives the district look: "squalid districts render like tents, poor districts to be super dense, and wealthy districts to have more trees and other decorations" (84680671, `ftg-posts-a.md` §2.12).
- Beat: one plot-granularity law.
  - A data table maps the per-plot context vector (wealth, district type, density, frontage road class, assignment) to a target band for plot frontage, depth and area.
  - Frontage-first subdivision (§4 rank 2) cuts down to the band's lower end, and a merge pass (NG-PG-2's operator) joins neighbours up to its upper end. JOIN and SPLIT are the two directions of one law.
  - The same vector then sets coverage and building class in the site plan.
  - Wealth is a field: a district value plus gradients toward the high street, market and centre. Granularity can therefore vary within a district and within a block (frontage against rear), not only per hood.
  - Minimal version: the 2017 per-class stop threshold, driven by the per-plot vector instead of a per-ward constant. The merge pass is the part 2017 lacked.
- Measure:
  - (a) Spearman(wealth, plot area) ≥ 0.8 and Spearman(wealth, buildings per ha) ≤ −0.8 over parameter sweeps. NG has no wealth input, and its within-hood Spearman(position, size) is ≈ 0.
  - (b) Moran's I of plot area > 0, and its pattern follows the requested wealth field. NG: −0.04 to +0.03.
  - (c) As wealth rises, the detached share and the yard share rise and the attached (party-wall) share falls, all monotonically.
  - (d) One code path, checked two ways:
    - provenance: every plot records which context-vector fields its split-depth, merge and class decisions read;
    - perturbation: raising one district's wealth by one step must lower the plot count, raise the median plot area and the yard share, and lower the alley length per ha, all together, while changing nothing outside that district and its soft-seam band (see ED-1/ED-2 for locality).
- Risk:
  - NG's uniform terraces ARE its look (PG-A1: 95–99 % attached). The dense default must keep a continuous streetwall, and detachment must stay a rich or semi-rural class used sparingly. The creator plans the same for Urban Places: "I don't want to completely give up detached houses … Probably, there will be a special type of semi-rural blocks spawned sparingly" (141198168).
  - A checkerboard of rich and poor districts is less plausible than gradients plus contrast within a block, frontage against rear [INFERRED; to be calibrated in the corpus phase].
  - Hard contrast across a shared street is the family's known "Continuous" failure (VC-6). Seams interpolate unless the city model flags them as hard.

**NG-PG-2 — Joins are all-or-nothing: an institution takes a whole block, typically with one hall, and the leftover is filled with trees.** BASE · STAGE-3 hook · LATER (ASSIGNMENT) · CONFIRMED
- Who:
  - C (1.1.0): "A large building takes a whole block, but often fails to fill it all. In the future I'm planning to add trees (or something else) around it in such cases" (64375271).
  - C (1.2.0): "If there is enough space around a large building (i.e. when the plot it's placed on is significantly larger than the building itself), trees are planted around it" (70917627).
  - R.
- Evid., all from `profile-neighbourhood.md`:
  - §3.3: `Manor` is 6–11 % of blocks, chosen by a weighted draw, and "visibly placed on larger blocks and often at the map edge".
  - §3.2 identity 3: `Manor` and `Empty` blocks are never partitioned.
  - §3.5: `buildLarge` counts 2/7/3/5 against `Manor` 2/7/4/6, i.e. about one large building per manor [INFERRED; what selects a plan builder is open, §9 Q12].
  - §3.8: the grove fills the whole walled compound.
  - §3.10: stone enclosure walls surround the courtyard halls.
  - The ring fallback is the same move: "a square, a grove or a single large building" (70917627).
- Impact:
  - An institution's size follows whatever block it lands on, not its need.
  - There are no multi-building compounds — house, hall, stables and workshop around a yard, one owner — which is what the owner's plot model calls for.
  - A guildhall or inn that needs two or three lots on one street is impossible.
  - The ASSIGNMENT hook ("this building is the X") has no operator that makes a plot of the right size.
- Cause: content is dispatched per block (`Normal` / `Manor` / `Empty` / `Green`), and a `Manor` block is never subdivided.
- Beat: a MERGE operator on the plot graph.
  - Input: a required area and frontage, from the class rule or from an assignment.
  - It joins k adjacent plots, either along one frontage or back to back to reach a rear lane, keeping at least one street frontage.
  - It hands the merged plot to the site plan, which places several disjoint buildings around a typed yard or court.
  - A whole block is taken only when the requirement exceeds a set share of it.
  - The merged plot keeps its member plots' ids as history, so a later split can restore them (EVOLUTION hook).
- Measure:
  - (a) Institution plot area within ± 15 % of its class requirement. NG: the whole block's area, uncontrolled.
  - (b) An institution occupies a whole block only when its requirement is ≥ 70 % of the block area (the threshold is a parameter).
  - (c) The share of institutions with ≥ 2 disjoint buildings around a typed yard or court meets its target. NG: typically one hall and a grove [INFERRED from counts].
  - (d) 100 % of assigned buildings receive a plot within their drift bounds.
  - (e) A merge followed by a split restores the original plot ids and geometry.
- Risk: the walled compound set in trees is one of NG's best images (K3, K12, K14). Keep "grove or walled compound around a landmark" as a site-plan option, and keep landmarks rare.

**NG-PG-3 — Alleys and back lanes are not a designed output: the only alleys are slivers left by near-parallel cuts, block interiors have no access, and alley density does not respond to density or wealth.** BASE · LATER (SEWER) · CONFIRMED (no alley class; accidental slivers) / PLAUSIBLE (interiors without access)
- Who:
  - C [SHOWN]: near-parallel cuts leave hairline slivers that, in NG, survive as alleys rather than being removed (the findings reader's description of 49191011 images 09 and 11, `watabou-extra-a.md` §2.1).
  - U×1: T Mexx wants slums with "more alleys than green space between streets" (141198168).
  - R.
- Evid.:
  - NG draws its streets in one colour with no casing, and has no alley or lane stroke (H8.2).
  - Sliver drops run 0–42 per map (RB-3).
  - A lot survives only if it keeps a street frontage (`validateOuter`, §3.4). Block interiors are therefore leftover residue — hollow courtyards or greens — with no passage entity [INFERRED: an interior can be reached only where a frontage lot happened to be discarded].
  - MFCG contrast: its alleys are the gaps left by the ward-to-block level of the two-level bisector. Its "alleys" line layer appears only with a shanty town: present in all 10 cities with `shantytown=1`, absent in both with `shantytown=0`, although those two have `WardGroup.createAlleys` counts of 44 and 30 (`profile-mfcg.md` ST-4). Alleys inside the walls stay unstroked gaps [INFERRED there].
  - 2017 contrast: the ancestor leaves an alley gap at a cut only while the piece is still large relative to its ward's minimum lot area (a randomised threshold), and a party wall below it. Alley COUNT per area therefore scales with ward class [INFERRED from the rule], but the alley WIDTH is one constant (0.6 units) everywhere (`os-wards-render.md` §4, §4.1).
- Impact:
  - Dense quarters lack the web of alleys and courts that makes them read as poor and old.
  - Rich quarters lack service lanes behind large plots.
  - Courtyards cannot be reached. That removes scene hooks, removes the drainage path the SEWER hook needs, and leaves rear plots without the access edge the stage-3 building interface needs.
  - Hairline slivers read as mistakes, not as alleys.
- Cause: an alley is not an entity. Everything between streets is either a lot or discarded residue.
- Beat: alleys and back lanes become typed ways, emitted by the plot-granularity step.
  - Where a block is deeper than its class's plot-depth band, or where a split or merge creates rear plots, insert an access lane (width by class, in metres) instead of cutting those plots off from the street.
  - Dense and poor classes get many narrow alleys and courts; rich classes get few, wider back lanes serving large plots.
  - A sliver below the minimum plot width becomes an alley if it connects two ways; otherwise it is absorbed into a neighbour's yard (RB-3).
- Measure:
  - (a) Alley length per ha falls monotonically with wealth (Spearman ≤ −0.7), and median alley width rises monotonically with wealth.
  - (b) Every plot and every court has an access edge to a street or an alley: 100 %. NG leaves interiors unconnected by construction.
  - (c) 0 alleys narrower than the class minimum (e.g. 1.5 m), i.e. no hairline slivers.
  - (d) The dead-end share of alleys stays within a band per class: closes are realistic, but not every alley is one.
  - (e) Alleys carry slope and flow direction for the SEWER hook, since open gutters run along them.
- Risk:
  - An alley web everywhere reads as a maze and costs legibility at city zoom (the creator's visual-noise ceiling, H6.9). At city LOD alleys stay unstroked gaps, as MFCG draws them inside the walls, and are stroked only at neighbourhood LOD.
  - Perimeter-block courtyards stay courtyards (K3): not every interior needs a lane.

### PG-A4 Restraint register additions

| # | property | evidence | keep-test (acceptance criterion) |
|---|---|---|---|
| K13 | Attached terraces with party walls: 95–99 % of footprints share a wall; party walls are 39–43 % of footprint perimeter; 56–67 % share an exact vertex (FTG 6.4 %) | PG-A1 [REC] | in dense and poor classes, the attached share is ≥ 90 % and the party-wall share of perimeter stays within ± 5 points of NG's 39–43 %, unless the class table says otherwise |
| K14 | A landmark on an oversized plot gets a grove or a walled compound, never a bare leftover | C 64375271, 70917627; `profile-neighbourhood.md` §3.8, §3.10 | "grove or walled compound" remains a site-plan option; no institution plot leaves untyped residue |

### PG-A5 Effect on §4, and what was not measured

- §4 is not re-ranked, under the resume rule. The new entries attach to existing ranks:
  - NG-PG-1 → ranks 2 and 8;
  - NG-PG-2 → ranks 2, 11 and 15, plus rank 6 for the merge history;
  - NG-PG-3 → ranks 2 and 5.
- The owner's ruling turns the plot-granularity half of rank 8 from a stage-2 refinement into a BASE requirement. The synthesis should carry NG-PG-1 measure (d) — one code path, checked by provenance and a perturbation test — as a BASE acceptance test.
- Not measured, and why:
  - alley and sliver widths: the draw record holds road centrelines, not corridor polygons;
  - areas of discarded lots: they are not drawn (H10.5);
  - per-block statistics: the draw record carries no block ids;
  - the time cost of finer granularity (more bisection): it can only be extrapolated from §5.
