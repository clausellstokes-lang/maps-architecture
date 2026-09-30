# Confidence assessment — watabou's Neighbourhood generator (NG)

Lane `confidence/ng`, 2026-09-25. Question answered: how confident are we that an expert team, working clean-room from
this evidence base only, could (a) build behaviour-equivalent functionality, (b) match NG's visual class, (c) derive
NG's actual algorithms ("derive their code"), (d) reproduce a map seed-for-seed — per capability, with non-uniform,
justified numbers. Product frame (owner, 2026-09-25): NG items are **stage-2 readiness** (a town composed of
NG-class neighbourhoods with consistent seams), never base requirements; that is why §3 closes with what this
assessment implies for stage 2 and nothing more.

Abbreviations: pn = `research/findings/profile-neighbourhood.md` (CA = its 2026-09-21 Critic addendum, RA = its
Ring-template addendum, BG = its Bent-cut geometry addendum, PF = its Bent-cut parent-face test), cvn =
`_critic-vg-ng.md`, cr = `_critic.md`, cos = `_critic-os.md`, vnd = `vg-ng-devlogs.md`, mpb = `mfcg-posts-b.md`,
osg = `os-geometry.md`, xa/xb = `watabou-extra-a/b.md`, vs = `visual-spec.md`, RV = `captures/neighbourhood/README-vertices.md`.
Tags: [STATED] creator text or the build's own trace/asset; [SHOWN] recorded or visible; [INFERRED] reconstruction;
[NAMED-ONLY] symbol or feature with no method. Every number below is CONFIRMED (executed evidence in the cited file, or
executed by this lane, §7) unless a row says PLAUSIBLE.

## §0 Reading record

Read in full, in task order, before any row was written (≈305 k tokens of reading; under the 350 k switch point, so
nothing was downgraded to outline reading and no section was skimmed):

| file | lines | how read |
|---|---|---|
| `research/findings/_critic-vg-ng.md` | 227 | full |
| `research/findings/_critic.md` | 479 | full |
| `research/findings/_critic-os.md` | 435 | full (two pages) |
| `research/findings/profile-neighbourhood.md` | 1 878 | full, in four pages: body §0–§10, CA-1..CA-5, RA-0..RA-9, Critic-2 addendum, **BG-1..BG-4 and PF-1..PF-3** (landed 2026-09-25 07:16 and 07:29, i.e. AFTER `_critic-vg-ng.md` and after the task brief was computed; they are post-critic capture addenda of the same kind as the Ring-template addendum and are treated as evidence, see §1.2) |
| `research/findings/vg-ng-devlogs.md` | 1 039 | full (two pages) — Part A (VG) read for the shared-engine facts only, Part B and Part C in detail |
| `research/findings/mfcg-posts-b.md` | 767 | full |
| `research/findings/os-geometry.md` | 946 | full (two pages) |
| `research/findings/watabou-extra-a.md` | 1 162 | full (two pages) |
| `research/findings/watabou-extra-b.md` | 997 | full (two pages) |
| `research/findings/visual-spec.md` | 743 | full |
| `captures/neighbourhood/README-vertices.md`, `widthfit-2026-09-25.txt` | — | full |
| `captures/README-labelfix-2026-09-25.md` | — | NG-relevant sections (grep), see §1.4 |
| `captures/neighbourhood/2026-09-21T05-04-54/coverage/gen-{0..3}.calls.json`, `…07-20-25/coverage/gen-{0,1}.calls.json` | — | queried for `com.watabou.utils.Random.*` counts only (§1.3) |
| `docs/confidence/mfcg.md`, `docs/confidence/vg.md` | — | section outlines plus the matrix-row and summary-table format only, for consistency; their numbers were not consulted |

Not read: any `captures/**/network/bodies/*.js` (rule); raw `post.md` bodies (the critic seats spot-checked 66/66 quoted
phrases, cvn §3, and 24/24, cr §4, so the findings' quotations are taken as verified); the NG screenshots themselves
(their pixel readings are taken from pn §3, CA-3, RA-4 and vs §3 as written). Per the RESUME RULE this file did not
exist and no LANDED line existed for `confidence/ng`, so this is a fresh assessment.

## §1 Evidence base for NG — what kinds of evidence exist and how far each reaches

NG is the best-instrumented of the four references, and the least documented by its creator. The mix is the
opposite of MFCG's and FTG's:

| kind | what exists | reach |
|---|---|---|
| creator prose about the method | one paragraph on "recursive bisection with a twist" (devlog 315495, vnd B2.1, verbatim), the bent-cut idea post (49191011, xa §2.1: cuts "start and end at the right angle to the edges … a turn somewhere in the middle", "just an idea, not an algorithm"), the ring rule (70917627 / devlog 419786: "if the smallest ring is too small to be cut into blocks, a square, a grove or a single large building is placed there instead"), the templates post (64375271, xa §2.6), large buildings (xa §2.5), uneven streetwall ("I have my doubts about the method", xa §2.4), the character knobs ("minimum and maximum street widths, the average building and block size, and some other variables", 70917627 comment, xb §5), the 1.2.1 code transplant from MFCG (99067664, xb T31), NG's charter as a test-bed (53106327 comment, xa §5) and its supersession by Urban Places (106975409, xb §1 row 48) | names the *idea* of every layout stage; gives **no constant, no threshold, no distribution** (xb §6 "Numbers": almost none published anywhere) |
| our recordings — call counts | 10 coverage samples over 4 templates and 3 sizes (pn §0, CA-1, RA-0): 282+33 executed `com.watabou.*` routines with byte sizes, every never-executed symbol, and ≈ 40 exact call-count identities re-derived on the raw files by the critic seat (cvn §4 items 2, 6, 7, 13, 14) | fixes the pipeline order, the recursion structure, which template does what, the retry behaviour and the class of every algorithm; cannot see inside a routine (`Bisector.makeCut` is 2 938 B of unread code) |
| our recordings — draw logs | 8 base draw logs + 2 ring logs, matched **count for count** against the same-seed coverage counts (RA-5); palette JSON captured verbatim (pn §4.1) | pins the renderer to the pixel for the **default palette only** (§1.4) |
| our recordings — vertices | 4 captures × 2 seeds with every painted path's vertices (RV; BG-1..BG-4; PF-1..PF-3): 519 streets, 5 861 footprints, 12 000+ roof faces measured | turns the stated bent-cut idea into measured distributions (bend position, arrival angle, stop rule, width law, OBB axis, corner rule); cannot see the parent polygon of the 344 hood-side cuts, the RNG, or the rejected cuts |
| 2017 open-source ancestor | `com.watabou.geom` / `utils` (osg; cos §1 constants) — shared package names survive in NG (pn §1.4, §8) | the *kind* of primitive (`cut(gap)` + `peel`, `shrink`, `buffer`, MINSTD `Random`, `weighted`, `gate`) and, for the RNG, the engine itself (§1.3); no NG-specific code existed in 2017 |
| creator prose about NG's design | night/cobbles/tiles/outlined/twisting/dashed roads (xb §1 row 34), multi-colour params (xb T19), fake gables preferred over hip skeletons (101173551, xb T5), "faster and more stable" transplant (xb T31), "a district of any shape" accepted by the bisection (49191011 reply, xa §5) | option surface and design intent |

### §1.1 Anchor facts from the recordings (all [SHOWN]; pn section in brackets)

* **Input = (seed, tags).** `Hood.hx:42: <seed>: <tag, tag[, tag]>` is the whole trace (§0); `?seed=&tags=` is the whole URL; `Math.random` is called once on cold load and never on regeneration (§4.2); three independent page loads of one seed give byte-identical coverage/draw screenshots and identical console traces (RA-0). Determinism per seed is established, not assumed.
* **Pipeline** (§2, RA-1): `MapScene.reset → Hood.create → <template>.new → Hood.new → createShape → build → Hood.populate → getName`, then `MapScene.updateView` rebuilds the whole view. Every whole-map stage runs exactly once per generation in all 10 samples (§7, RA-3) — **there is no whole-map retry loop**.
* **Streets are cuts.** Plain `Bisector`: `Block = Street + 1` (area, street), `Block = Street` (square), `Block = Street + 1 − R` (ring); `extend = 2·Street` (2S − 2 for square); `partition = Normal blocks + P` (P = 1 / 2 / 2 / 1 template-level partitions); `detectStraight = makeCut − (Street − k)`, k = template-laid streets (0 / 1 / 3 / R + N); `makeCut = split = PointExtender.project` in all 10 samples (§3.2, CA-2, RA-2, cvn §4 item 6).
* **Hole-aware bisector** (`BisectorEx` / `ExPolygon`, ring bands only): `makeCut = split + "Trying again"`, `split = N + "Alternative cut"`, `subdivide = ExPolygon.area = 2N`, `not = 2N − R`, `new = 2S + not`, zero `project` calls; console prints 5 AC + 1 TA (7171) and 4 AC + 1 TA (7172) identically in three loads (RA-2, RA-3).
* **Bent-cut geometry** (BG-1, PF-2; 519 streets): 136 straight / 380 one-bend / 3 two-bend; fillet-free corner at 0.40–0.60 of the cut in 80 % (sd 0.05–0.09 per map); 96.2 % of 811 junction ends arrive at ≥ 85° (p50 89.5–90.0°); ends stop exactly one crossed half-width from the crossed centreline (803/811 within 0.05 px); every junction lies on an earlier-drawn road in area/street (361/361); no bend < 3.0°; 53 % of bends are equal-chord circular arcs (chord 30–44 mu; tangent length ÷ shorter leg p50 0.73, ρ = 0.94); cut direction within 20° of the parent face's OBB **minor** axis in 85 % (null 22 %), start side parallel to the major axis in 88 %, longest-edge rule refuted (1 of 69 discriminating faces); corner at the cut midpoint in 82 % (null 20 %), OBB centre 26 %, centroid 32 %; major axis crossed at 0.40–0.60 of its extent in 66 %.
* **Width law** (BG-1, RV headline 3, `widthfit`): `w = a_seed + b·L` with a = 4.14–4.17 (seed 7171) and 5.06–5.07 (seed 7172) across all four templates, b = 0.0023–0.0039 per map, rms 0.005–0.025 mu, plus ≈ 4–6 mu of virtual length per free end; ring roads and template streets take one fixed per-seed width (6.556 / 6.125; 7.750 / 8.639). Widths are model units × a per-map CTM (0.56–1.11), not px (BG-3).
* **Lots**: one `Bisector.partition` per `Normal` block → ≈ 20 leaves → `indentFronts` (`PolyBool.and`) → `validateOuter` (≈ 2.9 per accepted lot) → `validateLot` → `Building.new` on **58 %** of leaves; the perimeter-block look is that filter (§3.4, cvn V18). Footprints: 42–63 % 4-gons, 53–66 % of corners at 89–91°, a distinct 179–190° population (RV headline 4).
* **Content census**: Normal ≈ 88 % / Manor 6–11 % / Empty 0–9 % / `Green` only as the ring centre (§3.3, RA-4); `BlockContent.new − Block.new` = 0–2 (a validity retry).
* **Roofs** (§3.6): two fake-gable faces; lit colour = `Palette.weighted(colorRoof) × (1 + varRoof·N)` with N a 6-uniform pseudo-normal (measured sd 0.069 = 0.3 × 0.2357); `dark = lit × lerp(colorAmbience, colorShadow, ≈ 0.41)` to 0.5 %; hatching = `PolyCut.cut` once per roof, `pierce` ≈ 8.5 per roof, **two** tapered triangles (`shortStroke`) per pierce (2.0006–2.035, cvn S29), ≈ 17.4 triangles per wing = 55–80 % of every draw budget; `drawChimney` once per building but `Wing.addChimney` ≈ 3 %.
* **Shadows** (§3.7, RA-5): one translated footprint per wing, one quad per silhouette edge (2.31–2.44 per wing), flat `colorShadow` under a layer alpha, plus a 1 px same-colour stroke; tree shadow = the crown polygon translated (segment histograms bit-identical).
* **Poisson field** (CA-4, RA-8): `warp ÷ step = 50.000` in 9/9 runs with a pattern; built lazily by the first green or grove; 122–132 steps regardless of demand (fixed tile); `Point.polar ≥ warp` (one annulus offset per candidate).
* **Trees** (§3.9, RA-5): `bloat ÷ doBloat = 4.00`, crown 120–180 vertices ≡ 0 mod 4 in 99 % (8 of 958 exceptions); 6-op per-tree canvas; colour = `weighted(colorTree) × (1 + varTree·N)`; dark ÷ light ≈ (0.911, 0.918, 0.928) → t ≈ 0.17.
* **Layer order** (§4.3, RA-5): greens → roads → shadows → buildings → chimneys/stone → trees (depth-sorted against buildings) → title; three stroke colours only; round joins; **square caps on roads only**.
* **Cost** (§5, RA-6): `MapScene.reset` 10–52 ms (area/street/square, medium), 78–96 ms (ring); rasterisation 73–111 ms — more than generation; `GeomUtils.intersectLines` 140 k–213 k calls is the hottest routine; `openfl.geom.Point.new` 385 k–561 k per generation; ring runs add 12–15 k `ObjectMap.get` under `BisectorEx.makeCut`.

### §1.2 What moved after the critic seats (evidence that postdates cvn, 2026-09-25 06:46)

The **Bent-cut geometry addendum** (BG) and **Bent-cut parent-face test** (PF) in pn landed after `_critic-vg-ng.md`
and after the task brief that lists the post-critic addenda. They change three rulings and this file carries the
changed state:

1. **C13's geometry is closed, its mechanism is not.** cvn §6 item 5 said the bent cut's "bend position, endpoint-edge
   choice, stop predicate, street-width law, reject filter" were unchanged after all sources. BG-1/BG-2 now give the
   bend position (0.5 ± 0.05–0.09), the arrival angles, the stop rule, the width law and the straightness tolerance as
   measured distributions. PF-3 refutes "start from the longest edge", confirms pn §6 H2 ("cut ⟂ OBB long axis") for the
   162 bounded cuts and shows the corner is the cut's midpoint, not the OBB centre or the centroid. **Still OPEN:** which
   of the two major-parallel sides the cut starts from (91/162, chance), the gate's exact bounds (hard 0.40–0.60 with
   retries, or a clamped distribution), why `BisectorEx` is looser (|t − 0.5| p50 0.045 vs 0.011), what decides arc vs
   sharp (no predictor found), the width slope and free-end term, and the 344 hood-side cuts that could not be tested.
   cvn V5 stands: `PointExtender.project` is not the right-angle step.
2. **Two body corrections** (BG-3): NG road widths are model units, not px (pn §3.2/§4.2/RA-5 "px" figures are raw
   `lineWidth`; §4.2's "± 25 % jitter" is refuted — the spread *is* the width law); a building's `#222222` outline is
   the footprint only, no ridge is stroked (pn §3.6's "6 segments = gable, 7 = hip" reading is wrong: 6 = 4-gon, 7 = 5-gon).
3. **cvn's "most valuable next NG measurement" was done** (the vertex recorder) and its two follow-ups (BG, PF) too.
   The remaining single most valuable step is now the forward-prediction test PF-3 proposes on the existing captures (§6).

### §1.3 A measurement made by this lane: NG's RNG engine and its successor-seed rule — CONFIRMED

The critic seats pinned the 2017 engine (MINSTD, `s ← 48271·s mod (2³¹ − 1)`, cos §1.1 rows 1–10, re-executed to
9 s.f.) and the MFCG lane found the live MFCG still on that orbit, but **no NG evidence existed** beyond the shared class
name `com.watabou.utils.Random` (pn §1.4). This lane tested the base capture's nine Enter-successor seed transitions
(pn §0 run inventory) against the orbit of their predecessor (`captures/neighbourhood/seed_orbit.py`, stdlib, ≈ 2 s):

| pass | transition | result |
|---|---|---|
| profile | 1113219554 → 2021930855 → 490351217 → 1720203006 | ON ORBIT at k = 35 102, 48 599, 84 217 |
| coverage | 1113232540 → 1917416504 → 1481152594 → 76965835 | ON ORBIT at k = 84 910, 99 934, 83 595 |
| draw | 1113244956 → 1023197108 → 665320564 → 874025314 | ON ORBIT at k = 50 801, 103 813, 57 547 |

9 of 9 within 2 × 10⁶ steps (all ≤ 103 813; the chance of one hit within 10⁵ steps of a random start is ≈ 5 × 10⁻⁵).
The three cold-load seeds differ by 12 986 and 12 416 — the ≈ 12–13 s the harness left between passes — so the
cold-load seed is clock-derived, exactly MFCG's EG-3 rule. **Consequences.** (a) NG's `Random` is the 2017 MINSTD
engine; `float / int / bool / normal / fuzzy` semantics (cos §1.1) apply. (b) The next seed is the state of the *one
global stream* after the previous generation's k draws, so the whole generation (model, view-side roof and tree
draws, naming) sits on one stream; k = 35 k–104 k draws per medium map. (c) `Random.float` shows only 3–11 calls
and `Random.new` 4 per generation in `calls.json` — `next()` is inlined at every call site as in 2017 (`private static
inline`), so the coverage counter cannot see the draws (PLAUSIBLE; the `new` = 4 is a minified-name collision that the
label-fix README lists for the re-analysed ring capture, §1.4). (d) `Random.save/restore` = 1 brackets random-tag
rolling only when `Settings.randomTags` = 1 (RA-9 item 4; cvn V23) — with URL tags there is no save/restore at all.
(e) For seed-exactness the engine and the successor rule are now known; what is *not* known is the order and count of
the ≈ 10⁵ inlined draws inside the model and the view, which is the entire remaining gap (row A2 vs the rest).

### §1.4 Caveats a reader must carry (from the evidence, not from this lane)

* **One build, one palette.** Every NG number is for itch build 11441280 (2026-06-24); NG is formally superseded by
  Urban Places, of which there is no recording (cvn §6 item 7; xb T23–T25). Every draw record is the **default** palette:
  `night/warm/cool/bw/modern` exist verbatim as JSON but were never rendered; `roadSurface ∈ {Tiles, Cobbles}`,
  `roadOutlined`, `roadTwisting`, `cityLights`, `colorLights`, `colorWater` never executed (pn §4.1, §8).
* **Label caveat.** The base capture `05-04-54` was **not** re-analysed with the fixed attributor; `captures/README-labelfix-2026-09-25.md`
  shows for the re-analysed ring capture that `model.Street` loses one constructor closure to `BlockContent` (60/148
  calls), `visuals.WellView` loses 163 calls to `nlp.Markov`, and `Settings` / `Random` lose 3 / 4 phantom calls. So pn
  §1.3's `WellView.(anon) 163,0,0,0` is `Markov`, pn §1.1's `Random.new 4` is a phantom, and any class-level table
  quoted from the base capture may carry these rows. Totals, timings, identities and draw data are unaffected.
* **Sampled parentage.** Profile call trees are sampled; a routine missing from a tree may still have run (RA method
  note). Every "sampled under" reading below is [INFERRED] on that basis.
* **Never executed in 10 samples** [NAMED-ONLY]: `Settings.getInfo` (601 B), `BisectorEx.detectStraight/getGap`,
  `findBuilding` (547 B), `getGreenTable` (205 B), `assemble` (7 272 B — the largest unexecuted symbol), `PolyCut.peel`,
  `Color.{hsv, rgb2hsv, lerpHSV, lerpHue, dist}`, `loadPalette/getPalette` (RA-1, pn §1.5).

## §2 Capability matrix

Scale for the four confidences: probability in [0, 1] that an expert team, clean-room from this evidence base only,
achieves the stated goal for that capability. `functional` = same feature, same option surface, statistically similar
structure; `visual` = a viewer places the output in the same quality/style class (for non-visual rows the value repeats
`functional` and says so); `algorithm identity` = our derivation matches THEIR algorithm, not merely its output;
`seed-exact` = same seed → same map for that capability, which needs their exact draw order and constants.
Format per row: **Evidence** (tags + citations) · **Known** · **Must invent** · the four confidences with one-line
justifications.

### §2.0 Summary table

| id | capability | functional | visual | algorithm identity | seed-exact |
|---|---|---|---|---|---|
| A1 | Tags, `Settings`, URL state | 0.95 | 0.90 | 0.75 | 0.05 |
| A2 | RNG engine, one stream, successor seed, save/restore | 0.95 | (0.95) | 0.90 | 0.80 (stream only) |
| A3 | Pipeline structure and failure policy | 0.90 | (0.90) | 0.85 | 0.30 |
| B1 | Hood outline (`createShape`) | 0.85 | 0.85 | 0.30 | 0.01 |
| B2 | Templates area / street / square as seed geometry + sub-areas | 0.85 | 0.85 | 0.60 | 0.01 |
| B3 | Street network by bent recursive bisection (plain `Bisector`) | 0.90 | 0.90 | 0.55 | 0.01 |
| B4 | Hole-aware bisection of annuli (`BisectorEx` / `ExPolygon`) | 0.80 | 0.85 | 0.45 | 0.01 |
| B5 | Street course finishing: extend, fillet, width, corridor | 0.90 | 0.90 | 0.65 | 0.02 |
| B6 | Block content dispatch (Normal / Manor / Empty / Green) | 0.85 | 0.85 | 0.40 | 0.01 |
| B7 | Square-template plaza (`buildSquare` / `buildRound`) | 0.85 | 0.85 | 0.50 | 0.01 |
| B8 | Ring-template seed geometry (`createRings / createBlocks / createCenter`) | 0.75 | 0.85 | 0.35 | 0.01 |
| C1 | Lots, setback, validation (the perimeter-block filter) | 0.85 | 0.85 | 0.55 | 0.01 |
| C2 | Buildings, wings, compound plans, roof kinds, landmarks | 0.80 | 0.85 | 0.40 | 0.01 |
| C3 | Manor compounds (walls, hall, grove) | 0.80 | 0.85 | 0.35 | 0.01 |
| C4 | Greens, groves and the shared Poisson field | 0.90 | 0.90 | 0.60 | 0.01 |
| C5 | Trees (crown construction, colour, shading, depth sort) | 0.90 | 0.85 | 0.50 | 0.01 |
| C6 | Pins: wells, fountains, large trees | 0.90 | 0.90 | 0.45 | 0.01 |
| C7 | Uneven streetwall | 0.75 | 0.80 | 0.25 | 0.01 |
| C8 | Size tags, scale, per-neighbourhood character knobs | 0.85 | 0.80 | 0.35 | 0.01 |
| D1 | Naming (Tracery grammar + Markov surnames) | 0.90 | 0.90 | 0.80 | 0.00 |
| D2 | Title layout (corner choice) | 0.95 | 0.95 | 0.70 | 0.05 |
| E1 | Palette / style schema, presets, multi-colour | 0.95 | 0.90 | 0.85 | 0.05 |
| E2 | Canvas, layer order, stroke discipline, depth-sorted trees | 0.95 | 0.95 | 0.85 | 0.60 |
| E3 | Roads rendering (Plain recorded; Cobbles/Tiles/outlined/twisting/dashed stated) | 0.85 | 0.75 | 0.55 | 0.02 |
| E4 | Roof rendering: fake gables, colour law, shading, tapered hatching, special roofs | 0.95 | 0.95 | 0.80 | 0.02 |
| E5 | Shadows (prism quads, tree shadows, layer alpha) | 0.95 | 0.90 | 0.80 | 0.02 |
| E6 | Unrecorded style features (night lights, other presets, `colorWater`) | 0.80 | 0.70 | 0.40 | 0.01 |
| F1 | Toggles, hotkeys, presets, tags dialog, rotation | 0.95 | 0.90 | 0.80 | 0.30 |
| G1 | Export PNG / SVG / JSON and permalinks | 0.85 | 0.85 | 0.40 | 0.30 |
| G2 | Integrations (Procgen Mansion, City Viewer; MFCG→NG rejected) | 0.70 | 0.75 | 0.40 | 0.00 |
| H1 | Performance envelope | 0.90 | (0.90) | 0.60 | (0.00) |

Values in parentheses are not meaningful for that row and repeat `functional` (or are given as 0 for H1's seed-exact),
so the structured summary carries a number for every cell.

### §2.A Framework

**A1 — Tags, `Settings`, URL state.**
Evidence: [STATED] tag vocabulary — sizes `small/medium/large`, templates `area/street/square` (64375271, xa §2.6) and
`ring` (70917627, xb T2), modifiers `leafy` (more trees) and `secular` (no large buildings) (xa §2.13); [SHOWN] the
`Hood.hx:42` trace prints `seed: tag, tag[, tag]` and the URL is `?seed=<uint32>&tags=<list>` (pn §0); [SHOWN]
`Settings.randomTags` 1 / `oneOf` 4 with random tags, `resolve` 1 / `oneOf` 3 + resolved tags with URL tags, and
`tags=ring` rewritten to `ring,medium` by `resolve` (CA-1, RA-0, RA-1); [SHOWN] `Settings.processTags` is 2 511 B
(a larger tag table than the five tags ever observed, pn §9 Q16); [NAMED-ONLY] `Settings.getInfo` 601 B never ran
(RA-1). Known: the whole user-facing vocabulary, the slot structure (template slot, size slot, modifier slots), the
resolve-fills-missing-size rule, the URL contract. Must invent: the prior over random tags, the full modifier list
behind `processTags`, the "3 → ≈ 20 internal parameters" expansion (xb T28) that a tag drives. Confidences:
functional 0.95 — vocabulary and slot structure are complete for everything the reference exposes; visual 0.90 — not
a visual row beyond the tags dialog (xa §2.13 gives its UX rules); algorithm identity 0.75 — a tag → parameter-override
table with a resolve pass is what the counts show, the table's contents are not; seed-exact 0.05 — random tags are
rolled inside `save/restore` on a stream whose draw order is unknown, and with URL tags the roll is skipped, so the only
seed-exact path is the URL-tag one.

**A2 — RNG engine, one global stream, successor seed, save/restore.**
Evidence: [SHOWN, this lane] 9/9 Enter-successor seeds on the MINSTD orbit of their predecessor at k = 35 102–103 813,
cold-load seeds clock-derived (§1.3); [STATED] the 2017 engine's constants and draw semantics (cos §1.1 rows 1–10,
osg §3.1); [SHOWN] `Random.save`/`restore` = 1 iff `Settings.randomTags` = 1, 0 in all six URL-tag runs (RA-9 item 4;
cvn V23), `Random.reset` 1 (random) / 2 (URL seed) per generation; [SHOWN] `Math.random` 1 on cold load, 0 after
(pn §4.2); [SHOWN] naming runs last in the model (`getName` sampled after `populate`) and draws from the main stream
(RA-9 item 4); [SHOWN] byte-identical screenshots across three independent loads of a seed (RA-0). Known: the engine,
the one-stream discipline, the successor rule, the checkpoint around tag rolling, determinism. Must invent: nothing
for the engine; for same-map reproduction, every inlined draw's position (see the other rows). Confidences: functional
0.95 — a seeded MINSTD with save/restore is trivial; visual (0.95) — not a visual row; algorithm identity 0.90 — the
orbit test pins the recurrence and the successor rule, save/restore placement is by counts not positions; seed-exact
0.80 **for the stream alone** (given the seed we can reproduce the stream and the next seed), while same-map needs every
downstream draw in order — that is why every other row's seed-exact is ≈ 0.01.

**A3 — Pipeline structure and failure policy.**
Evidence: [SHOWN] the profile call trees give `reset → Hood.create → <template>.new → Hood.new → createShape → build →
populate → getName`, then `updateView` (pn §2; RA-1 for ring: `build → createShape → createRings → createBlocks →
createCenter`); [SHOWN] every whole-map routine (`Hood.create/new/populate`, `Settings.processTags`, `Namer.reset`,
each template method) runs exactly once per generation in 10/10 samples — no map-level retry (pn §7, RA-3); [SHOWN]
local failure handling: plain `Bisector` drops slivers silently (`2·makeCut + partition − subdivide` = 4–16 in area,
26/0 square, 0/10 street, 34/42 ring; pn §3.2, RA-2), `BisectorEx` repairs inside one cut ("Alternative cut" 4.1 % /
3.7 % of splits, "Trying again" ≈ 1 %, printed from `BisectorEx.hx:215/237`, RA-3), lots without frontage are discarded
not retried (58 % acceptance, pn §3.4), one block-content object is built and discarded per map (`BlockContent.new −
Block.new` = 0–2, pn §7), `Offsetter.filter` once per green (pn §7); [STATED] the method was "too slow and too
unstable" for MFCG in 2021 and NG 1.0 is a from-scratch rewrite "with a better implementation" (315495, vnd B2.1);
"still pretty glitchy, but it works" for the hole-aware version (70917627, xb T1); [STATED] MFCG-side failure modes of
the same primitive — "collapsed or intersecting edges", the null `rect` crash (87882877, 61026228 comments; mpb §2.3).
Known: order, boundaries, the three-tier policy (drop / local retry / discard-lot), the retry rates. Must invent: the
validity test that fires "Alternative cut", the alternative-cut generator, the cap on "Trying again" (max 1 ever seen),
the fallback when all alternatives fail, and an explicit degenerate-polygon guard (the reference crashes on it, mpb
§2.3). Confidences: functional 0.90 — the shape of the policy is fully recorded; visual (0.90); algorithm identity
0.85 — the pipeline order is [SHOWN] twice (call trees and sampled order) and the policy's tiers are arithmetic;
seed-exact 0.30 — with no map-level retry the divergence risk is only how many draws each local retry consumes, which
is unknown but small.

### §2.B Layout stages

**B1 — Hood outline (`<template>.createShape`).**
Evidence: [SHOWN] `AreaHood.createShape` 1 170 B, `RingHood.createShape` 1 434 B, each once per map; sampled child
`PolyBounds.obb` (R1) and `PolyTransform.asScale` = 1 in area and ring runs only, 0 in square and street (RA-7, RA-9
item 1); [SHOWN] `Hood.getCloud` = `layoutTitle` = `setViewport` in 10/10 runs — pn §3.1's "union of 17–30 circles"
is **refuted**, `getCircle/getArc` are street fillets (RA-9 item 1, cvn V21); [SHOWN] silhouettes: D-shape with one
straight chord, rounded lozenge, concave-notched polygon, crescent (area); long spindle (street); disc (square); lumpy
lozenge 920 × 980 px and oval 1 155 × 980 px with no rim road (ring) (pn §3.1, CA-3, RA-4); [SHOWN] hood-side streets
stop as short spurs at the edge, greens and tree clumps sit on the rim (RA-4); [STATED] "I can generate a 'district' of
any shape this way" (49191011 reply, xa §5) — the bisection accepts an arbitrary boundary polygon. Known: that the
outline is a template-owned polygon built before bisection, oriented/fitted with an OBB and scaled; its silhouette
class per template; that no rim road exists; that an arbitrary polygon is accepted (the stage-2 hook). Must invent:
the construction body — whether a noise-perturbed ellipse/superellipse, a Chaikin-smoothed random polygon (a
`Chaikin.render` surplus of 0–3 per map exists, RA-1) or a distorted circle; how the straight chord arises; how
size tags scale it. Confidences: functional 0.85 — any organic-blob generator fitted to the screenshots' aspect and
lumpiness serves, and the "any polygon" property is what stage 2 needs; visual 0.85 — the silhouette is the first thing
a viewer reads and only the class is known; algorithm identity 0.30 — the body is unread and `getCloud` was the wrong
guess; seed-exact 0.01.

**B2 — Templates area / street / square as seed geometry + sub-areas handed to the bisector.**
Evidence: [STATED] Area = generic; Street = "a notable street and its immediate surroundings, usually no more than a
couple of blocks away"; Square = "an open rectangular area at its center … supposed to look like a planned urban
feature"; Junction / Park / River bank / Bridge / Port planned and never built (64375271, xa §2.6; cvn §2 "full
template list": nothing else executes in 10 samples); [SHOWN] `Hood.bisectArea` = 1 (area), 2 (street, square), 0
(ring); `Bisector.partition = Normal + bisectArea`; template-laid streets k = 0 / 1 / 3 skip `detectStraight`
(CA-2); `StreetHood.f` × 4 per hood (CA-1); the street template's main street is one S-curve with alternating turns at
≈ 86 mu spacing at a fixed per-seed width, side lanes leave it at right angles and die after one block (CA-3, BG-1);
[SHOWN] `Street.extend = 2S − 2` for square (two plaza-abutting ends not extended, CA-2); [INFERRED] a template =
"seed geometry + how many sub-areas to hand to the one generic bisector" (CA-2 consequence; xa §2.6 reading). Known:
the three templates' mechanics to the call, the two-sub-area split, the template streets and their fixed widths. Must
invent: the main street's course generator (an S-curve of what law), `StreetHood.f`, how the two sides are cut and
rejoined, the planned templates. Confidences: functional 0.85 — the identities leave little to guess at the template
level; visual 0.85 — CA-3 screenshots give each morphology; algorithm identity 0.60 — the arithmetic pins the structure,
the seed-geometry generators are unread; seed-exact 0.01.

**B3 — Street network by bent recursive bisection (plain `Bisector`) — the core.**
Evidence: [STATED] the idea (49191011, xa §2.1) and its purpose — junctions "more natural", the recursion "less visible
for the naked eye" (315495, vnd B2.1); the FTG author's independent 3-step statement of the same construction (cr C13);
[SHOWN] identities of §1.1 (`Block = Street + 1`, `extend = 2S`, `makeCut = split = project`, `subdivide = isSmallEnough`,
`obb = convexHull` ≈ 2 per cut, `MathUtils.gate` ≈ 1.8 per cut, `ArrayExtender.revert` ≈ 1.15 per cut) (pn §3.2);
[SHOWN] the measured construction (BG-1/BG-2, PF-2/PF-3, §1.1): OBB-minor-axis direction 85 %, start side
major-parallel 88 %, crossing at 0.40–0.60 of the major axis 66 % (mode at the middle; child-area share only 0.40–0.50 in
51 %), corner at the cut midpoint 82 %, right angles 96 %, one end exact in every one-bend JJ street, a directional
construction (exact at p0 in 65 %, at pN in 45 %), straight when the end edges are within ≈ 4–6° of parallel (83/86),
no bend < 3°, cuts end on earlier cuts (361/361); [SHOWN] `detectStraight` (135 B) is skipped by street-level cuts and
run by lot-level cuts (pn §3.2); [SHOWN] `isSmallEnough` (276 B) is the first act of every `subdivide` (pn §3.2);
[STATED] the size knobs are "the average building and block size" (xb §5). Known: the complete output statistics of a
cut and the rule set that reproduces them (BG-4 steps 1–9: OBB axis; leave the start edge perpendicular; straight if a
straight cut would miss 90° by ≲ 2–3° at the far end, else one corner at ≈ 0.5 of the course arriving perpendicular;
fillet half of them; width law; recurse; stop ends at the corridor edge; draw in creation order). Must invent: the
`isSmallEnough` law (area? OBB minor extent? both — and how `medium` maps onto it — the single most consequential
unknown, pn §9 Q1), which major-parallel side is the start (a coin flip fits), the gate's bounds, the second OBB's
purpose, the `detectStraight` tolerance, the alternative-cut generator. Confidences: functional 0.90 — every
distribution a black-box test could demand is measured and a construction that reproduces them is written down;
visual 0.90 — the T-junction hierarchy, right angles and gentle fillets are what the eye reads and they are pinned;
algorithm identity 0.55 — the construction is theirs to the extent BG-4 states it (SHOWN), but the 2 938 B `makeCut`
still hides the start-side rule, the gate, the fillet decision and the stop law, and cvn V5 shows the one recorded
internal step (`project`) is not what CA-5 read it as; seed-exact 0.01 — ≈ 10⁵ inlined draws in unknown order.

**B4 — Hole-aware bisection of annuli (`BisectorEx` / `ExPolygon`).**
Evidence: [STATED] "twisted bisection of polygons with holes", built for MFCG, "still pretty glitchy, but it works"
(70917627, xb T1); Urban Places later tried the primitive for building placement and abandoned it because its issues
were "too obvious" (141198168, xb T24); [SHOWN] identities of §1.1 (RA-2); `BisectorEx.subdivide` = 2N with the first
cut of each band opening the annulus without splitting it (R root + R first-cut children + 2(N − R) = 2N; `Block = N +
C + 1`, not N + R + C + 1) — the *slit* reading of xb T1 (RA-2); [SHOWN] `Hood.getStreetWidth` and `ExPolygon.not`
(sampled child `PolyBool.and`) run inside `makeCut`: the corridor is carved during the cut, not by `indentFronts`
(RA-2); [SHOWN] `BisectorEx.subdivide` never calls `Bisector.isSmallEnough`; `ExPolygon.area` is its size test (RA-1);
[SHOWN] the retry trace (RA-3) and the ObjectMap bookkeeping (12–15 k `get`, 12.5 k `set`, 5–7 ms self, RA-6); [SHOWN]
the same bend/arrival/stop statistics as the plain bisector but a looser corner (|t − 0.5| p50 0.045 vs 0.011; 75 % vs
92 % of crossings in 0.35–0.65) (PF-3); [SHOWN] more lot slivers in the thin curved band blocks (RA-2). Known: the slit
structure, in-cut corridor subtraction, size test, retry loop and rates, cost. Must invent: the hole-routing rule
(when a candidate crosses the hole), the validity test, the alternative-cut generator, the representation (object-keyed
maps in the reference; flat index arrays recommended, RA-6). Confidences: functional 0.80 — the loop structure is
pinned but the repair logic is the part the creator himself calls glitchy; visual 0.85 — RA-4 shows the spider-web of
right-angled spokes and arcs, and the statistics match the plain bisector; algorithm identity 0.45 — structure SHOWN,
repair rules unknown; seed-exact 0.01.

**B5 — Street course finishing: `extend`, `semiSmooth` fillet, `getStreetWidth`, `PolyCreate.stripe`.**
Evidence: [SHOWN] `Street.getCourse` once per street calls `extend` twice (`GeomUtils.intersectLines` 1.7 of 3.5 ms),
so each chord is pushed out at both ends to the next street or the hood edge (pn §3.2); [SHOWN] `Hood.semiSmooth` =
`getStreetWidth` + AC, `getArc` = `getCircle` = `Circle.new` sampled under `semiSmooth ← makeCut`, 18–49 % of cuts
bent-and-filleted per map (RA-2, RA-9 item 1); [SHOWN] fillets are equal-chord circular arcs (chords equal to 0.01 px),
chord 30–44 mu, radius p50 340–710 mu spanning much of both legs, tangent length ÷ shorter leg p50 0.73 (ρ = 0.94),
radius vs bend angle ρ = −0.68, arc share 53 % with no predictor in angle, length or depth (BG-1, PF-2 (e)); [SHOWN]
width law `w = a_seed + b·L` (+ free-end term), drawn length fits better than centreline or fillet-free length in 8/8
(BG-1); a is per seed not per template, so it is drawn before template geometry ([INFERRED], BG-1); [SHOWN]
`PolyCreate.stripe` once per non-ring street builds the model corridor, the view strokes the centreline at
`getStreetWidth` × CTM with square caps (pn §3.2, BG-3, vs §3.6: "a narrow grey stripe inside a wider cream gap");
[SHOWN] ring roads get no `stripe`, no `semiSmooth`, no `getStreetWidth` and one fixed width (RA-2); [STATED] the
`roadTwisting` palette boolean (default false) switches something in this stage (pn §4.1; xb §1 row 34 "Twisting roads")
— never recorded true. Known: extension to earlier streets, fillet geometry and its leg-tracking radius, the width law
and its constants at two seeds, corridor-in-model. Must invent: what draws a and b and the free-end term, the fillet
decision (≈ 53 % by a rule not found), `roadTwisting`'s effect, the `semiSmooth` implementation. Confidences: functional
0.90; visual 0.90 — arcs, widths and caps are measured; algorithm identity 0.65 — mechanism (circular fillet, linear
width) SHOWN, parameters' origin unknown; seed-exact 0.02.

**B6 — Block content dispatch (Normal / Manor / Empty / Green).**
Evidence: [SHOWN] census per map (pn §3.3, CA-3, RA-4): Normal 64/56/39/55 of 66/64/43/62 (area), 88/54 (square),
12/5 (street), 106/87 (ring); Manor 2–11 (8–9 % in ring, 6–11 % square, 3–11 % area); Empty 0–2 (area), 5–6 (square),
9–10 (ring); `Green` only as the ring centre (RA-2); [SHOWN] `ArrayExtender.weighted` 36–109 and `random` 122–189 per
map (pn §3.3); [SHOWN] Manors sit on the rim and at a few interior sites, "at some distance from each other" [STATED]
(xa §2.5), several with domes/pyramids; Empty blocks are pale paved yards that may carry a grove or pins (RA-1, RA-4);
[SHOWN] one content object built and discarded per map (pn §7); [STATED] `secular` suppresses large buildings, large
buildings "take a whole block, but often fail to fill it all" with trees planted around (xa §2.5). Known: the four
classes, their shares by template, the retry, the spacing rule's existence. Must invent: the weights and their
conditioning (block area, rim distance, mutual spacing), the validity test behind the retry, when a block becomes
`Green`. Confidences: functional 0.85 — a weighted choice conditioned on area and spacing reproduces the census;
visual 0.85; algorithm identity 0.40 — weighted random is SHOWN, the weights and conditions are not; seed-exact 0.01.

**B7 — Square-template plaza (`buildSquare` / `buildRound`).**
Evidence: [STATED] "an open rectangular area at its center" (64375271); [SHOWN] `SquareHood.buildSquare` 2 425 B ran
in the `large,square,leafy` runs (rotated-square plaza ≈ 300 px side, grid aligned to its two axes near the centre and
splaying toward the rim) and `buildRound` 1 669 B in the base profile pass ("Dusk Square", disc with a round plaza)
(CA-1, CA-3, pn §3.1); [SHOWN] `PolyBounds.circle` 1 per square map, `PolyCreate.regular` 1–2, one well + one fountain
planted as pins at the plaza's south corner (CA-1); [SHOWN] k = 3 template streets, `Block = Street`, `extend = 2S − 2`
(CA-2); [SHOWN] the plaza is a flat grey polygon drawn under the buildings (vs §3.3 item 7); [STATED] NG's 2021 squares
were formed "by omitting the buildings from several adjoining block frontages" (vnd B2.5, [SHOWN] in 362757) — a
version ladder, the live build has exactly the two branches (cvn V20). Known: two plaza morphologies, their sizing
primitives' names, the propagation of the plaza's axes through the bisection ("the overall shape is more clearly
propagated to inner lines", 49191011). Must invent: the plaza size law, the round/rectangular choice rule, how the two
sub-areas around the plaza are formed. Confidences: functional 0.85; visual 0.85; algorithm identity 0.50 — branch
structure and primitives SHOWN, bodies unread; seed-exact 0.01.

**B8 — Ring-template seed geometry (`createRings` / `createBlocks` / `createCenter`).**
Evidence: [STATED] the rule of §1 (70917627 / 419786); ring streets "staggered", each annulus cut into a different
number of sectors (xb T2 [SHOWN]); [SHOWN] R = 2 / 3 closed ring roads of exactly 48 distinct vertices (50 segments
= pen point + 48 + repeat) at one width per map (6.556 / 6.125 mu), nearly concentric (centroids 9 px apart), each
with its own low-order irregularity (radial harmonics 2–9 %, inner ring n = 3 egg, outer n = 2), profiles
anti-correlated (−0.69) so not scaled copies, spacing widening outward (86 → 309 px; 55 → 182 → ≈ 360 px), same 50-segment
resolution at every radius (RA-4, RA-5, RA-7); [SHOWN] `PolyCut.shrinkEq = pierce = 2R`, `enlarge − Manor.addGreen = R`,
`unhole = R`, each `shrink` = 48 `cut` calls, `ArrayExtender.shuffle/subset/max` 1 each, a 35 B closure in `createRings`
11–14 calls, `Chaikin.render` +1 in R1 only (RA-1, RA-2, RA-7); [SHOWN] bands processed outside-in, streets drawn
[64][ring][53][ring][5] and [61][ring][35][ring][8][ring] (RA-5); [SHOWN] the centre disc is cut by the plain `Bisector`
(5 cuts → 6 blocks, R1) or, when the partition makes zero cuts, replaced by a `Green` grove (R2) — the stated fallback
seen running (RA-2); [INFERRED] hypothesis H-R (RA-7): independent fixed-resolution polar polygons (48 vertices at 7.5°)
with per-ring noise, radii picked among shuffled candidates, corridor prepared by `shrinkEq × 2 / enlarge / pierce ×
2` per ring. Known: R, resolution, spacing character, per-ring independence, the outside-in loop and the degenerate
centre rule. Must invent: the ring-count distribution, the radius law, the noise, the candidate scoring (the closure),
the square and single-large-building branches of the fallback (never seen). Confidences: functional 0.75 — the rule
set is clear but every constant is inferred from two maps; visual 0.85 — RA-4 gives the look precisely; algorithm
identity 0.35 — H-R is a hypothesis with five untested predictions (RA-7 tests 1–5); seed-exact 0.01.

### §2.C Buildings, lots and block interiors

**C1 — Lots, setback, validation (the perimeter-block filter).**
Evidence: [STATED] bent cuts serve "not only for cutting districts into blocks, but also for cutting blocks into
buildings", with "very weird" shapes "filtered out" (58808794, xa §2.1); [SHOWN] one `Bisector.partition` per Normal
block, ≈ 20 leaves, `detectStraight` on every lot cut, `indentFronts` = `PolyBool.and` (+ `augmentPolygons`, 2.3 ms self)
≈ 1.1 × buildings, `validateOuter` ≈ 2.9 per accepted lot, `validateLot` ≈ 1.2 per building, 58 % of leaves built
(pn §3.4); `indentFronts ≠ populate` once in 10 runs (105 vs 106, RA-1); [SHOWN] vnd B2.2's "offset the block and walk
the ring into strips" is **refuted** — the perimeter ring is a filter, not a construction (cvn V18); [SHOWN] footprint
statistics (RV headline 4): 4-gons 42–63 %, 5-gons 22–37 %, 89–91° corners 53–66 %, a 179–190° corner population that
CA-5 reads as bent party walls ([INFERRED]; pairing adjacent footprints across walls is undone); [SHOWN] "Pearl Ward"
shows hollow building rings — a block→building bisection that sometimes yields a courtyard building (xa §3); [STATED]
MFCG's `Processing: Offset` "shifts the front side of every lot" (mpb §2.4) — the same family. Known: the same bisector
with straightness snapping produces lots; setback = lot ∩ (block inset by the corridor); frontage test discards ≈ 42 %;
footprint angle statistics. Must invent: `validateOuter`/`validateLot` semantics (frontage contact? min width? aspect?),
the lot-level `isSmallEnough`, whether party walls bend, the "weird shape" filter thresholds, corner-lot handling.
Confidences: functional 0.85 — a per-block bisection plus a frontage filter reproduces the counts and the look;
visual 0.85 — the terraced ring with hollow or green interior is NG's signature and its statistics are measured;
algorithm identity 0.55 — construction SHOWN, filters INFERRED; seed-exact 0.01.

**C2 — Buildings, wings, compound plans, roof kinds, landmarks.**
Evidence: [SHOWN] `Building.new` → `Rect.ofPoly` (39 B, delegates to `obb`) → `Wing` (≈ 1.01 wings per building);
`buildSimple` 0–7, `buildT` 0–1, `buildCross` 0–2, `buildLarge` 2–7, `addBeam` 3–8 per map — compound plans are rare
(pn §3.5); `Rect.getRidge` ≈ wings, `Rect.swapAxes` ≈ 36 % of wings (gable to the street), `Rect.sub/cap/beam` helpers
(pn §3.5); `Wing.addChimney` 12–33 per map ≈ 3 % of wings, drawn as stone stacks above the roofs (RA-5, RA-9 item 3);
`Cupola.new` = `drawTip` 0–6, `drawDome` 0–3, `drawPyramid` 0–4, `drawDormers` 0–7 (≈ 2.6 dormers each), `drawCone` 4 in
one map with `longStroke` 6 per cone and `attackDecay0` once per cone, `Wing.addEntrance` = `drawEntrance` 2–7 (landmarks)
(pn §3.6, CA-1); [STATED] large buildings are landmarks, one per block, "tend to be at some distance from each other",
cupolas make them read as temples, spires (round/square) and dormers as alternatives to domes, trees around when the
plot is much bigger, `secular` disables (xa §2.5, xb §1 row 34); [STATED] NG's "fake" gable roofs preferred over
correct hips; hip X-ridges on large/square buildings (101173551, xb T3/T5); [STATED] the MFCG→PM handoff passes house
*shape* (70917627). Known: footprint = lot's OBB rectangle; ridge along the long axis with a 36 % flip; the plan and roof
vocabularies and their rarity; landmark rules in words. Must invent: plan selection (block role? lot area? Manor
flag?), roof-kind triggers, the chimney rule, the landmark footprint generator, the min-distance constant. Confidences:
functional 0.80 — the vocabulary is complete but every selection rule is missing; visual 0.85 — screenshots and draw
records give each kind; algorithm identity 0.40; seed-exact 0.01.

**C3 — Manor compounds.**
Evidence: [SHOWN] `Manor.populate` → `getRect` / `shrink` (743 B) / `press` (388 B), `addGreen → addGrove →
getPointsWhole` (the grove fills the whole plot), `PolyCut.enlarge` = `Manor.addGreen` (pn §1.1, §2, RA-1); [SHOWN]
`#bfbfbf` stone walls inside the buildings canvas 2–11 per map = the white enclosure walls around courtyard halls
(pn §3.10); cross-plan halls with domes/pyramids inside compounds, mostly on the rim (CA-3, RA-4); [STATED] Procgen
Mansion integration passes the house to the manor generator (419786; vnd B2.6). Known: a walled plot with one hall,
courtyard grove, cupola options; placement on larger/rim blocks. Must invent: `getRect/shrink/press` (an inner
rectangle pressed to one side?), wall thickness, hall plan selection. Confidences: functional 0.80; visual 0.85;
algorithm identity 0.35 — names and counts only; seed-exact 0.01.

**C4 — Greens, groves and the shared Poisson field.**
Evidence: [SHOWN] `createGreen = Offsetter.run = runEq = filter = FillableMultiPoly.new = getPointsLots = getPointsInner
= spawnInnerTrees = randClosed` per map; `Chaikin.render = FillablePoly.new = getPattern = PoissonPattern.fill = greens +
groves` exactly (pn §3.8); greens on 23–58 % of Normal blocks, 77 % with `leafy` (CA-3); flat `colorGreen` fills of
39–137 points, no outline (pn §4.3); [SHOWN] `PoissonPattern` k = 50 in 9/9 runs, lazy, fixed tile, `Point.polar ≥ warp`
(CA-4, RA-8; cr C2/C3 confirmed on raw files); the "warped 80 × 80 lattice" is **refuted**; [STATED] domain warping is
applied to VG's density noise, not the sampler (cvn V15 — designers must not attribute ragged edges to `warp`);
[SHOWN] Empty blocks can carry a grove (RA-1); Manor groves use `getPointsWhole` (pn §3.8); [STATED] `leafy` = more trees
(xa §2.6). Known: green = Chaikin-smoothed equal-distance inset of the block's inner boundary with self-intersection
repair; one global Bridson-style field clipped per polygon; the green probability and the `leafy` effect. Must invent:
the inset distance, the Chaikin rounds, the field's radius and tile size, `warp`'s exact semantics, which blocks get
greens. Confidences: functional 0.90; visual 0.90; algorithm identity 0.60 — the class of every step is SHOWN and two
of them are exact identities; seed-exact 0.01.

**C5 — Trees (crown construction, colour, shading, depth sort).**
Evidence: [SHOWN] `Pin → Tree → HoodView.placeTree`, `doBloat` ≈ 5 per tree, `bloat` = 4 × `doBloat` exactly, crown
120–180 vertices ≡ 0 mod 4 in 99 % (RA-5 corrects §3.9's "all"), light cap ≈ 0.38 × crown, detail path odd-length,
`drawShaded` 2.8–3.8 per tree (subpaths in one fill), 6-op canvas per tree (pn §3.9); colour law and shading t ≈ 0.17
(§1.1); trees interleaved with the buildings canvas — depth-sorted (pn §4.3, sort key unknown); [STATED] gradients
dropped in 1.2.1, shading strengthened in 1.1.0, "the same algorithm as in Neighbourhood Generator" adopted by MFCG
0.10.2 (xb T31; mpb §2.13), and VG/MFCG trees are cousins (vs §5). Known: the op sequence, the colour and shading laws,
the 4-way bulging structure, counts per template. Must invent: the bulge radius law and lobe layout, the light-cap
derivation, the depth-sort key, tree placement inside greens (from the field) vs pins. Confidences: functional 0.90;
visual 0.85 — a 3–5-lobe scalloped blob with a lighter cap and ink outline is fully specified in appearance; algorithm
identity 0.50 — the 4:1 and mod-4 constraints are hard but the construction is inferred; seed-exact 0.01.

**C6 — Pins: wells, fountains, large trees.**
Evidence: [STATED] "pins (fountains, wells and large trees)" with their own toggle (419965, vnd B2.4); [SHOWN]
`Normal.spawnPin` 23–37 per map but `WellView.new` 0–2 and `FountainView.new` 0–1 (RA-5; pn §9 Q9 — what suppresses the
rest is unknown); wells = tiny 3-op stone canvases (square via `rect`, or round), fountains = 6-op canvases with a
`[CanvasGradient]` basin in `colorCupola`, `createRadialGradient = 2·(domes + fountains)` (RA-5, RA-9 item 3, correcting
pn §3.10/§4.3); `PolyUtils.rand/randInner` single draws on sparse maps (CA-1); the square template plants one well and
one fountain beside the plaza (CA-1). Known: the three kinds, their drawing, their counts by template. Must invent: the
pin-to-object rule and its suppression, placement within a block, "large tree" as a pin. Confidences: functional 0.90;
visual 0.90; algorithm identity 0.45; seed-exact 0.01.

**C7 — Uneven streetwall.**
Evidence: [STATED] "One of the ideas I tested here that is not related to bisection is uneven streetwall. I like the
result a lot, although I have my doubts about the method I use for it" — method withheld, earmarked for MFCG
(58808794, xa §2.4 [NAMED-ONLY]); [SHOWN] fronts jitter ± 10–25 % of a building depth with occasional forward juts,
terraces stay continuous (xa §2.4); [INFERRED] a per-lot inward offset of the street-facing edge after cutting (xa
§2.4), which is what MFCG's `Offset` processing does by name (mpb §2.4); [SHOWN] `indentFronts` runs once per Normal
block, not per lot (pn §3.4) — so the jitter, if present in this build, is inside `indentFronts` or `Building.new`;
the vertex captures could measure it (front-edge offsets of adjacent footprints) and have not (RV "how to measure
further"). Known: it exists and what it looks like. Must invent: the method; the creator's own doubt (the street polygon
and façades disagree) is the design hazard. Confidences: functional 0.75; visual 0.80; algorithm identity 0.25;
seed-exact 0.01.

**C8 — Size tags, scale, per-neighbourhood character knobs.**
Evidence: [SHOWN] `small` 71–96 buildings / 5–13 blocks, `medium` 600–779 / 43–66 (area) and 1 209–1 287 / 105–123
(ring), `large` 762–1 343 / 63–104 — a range with wide spread, not a target (CA-3, RA-4); the view rescales every map
to the canvas (CTM 0.56–1.11), so hood size and block size cannot be separated from screenshots (RA-4, BG-3); [STATED]
the knobs are "minimum and maximum street widths, the average building and block size, and some other variables"
(70917627 comment, xb §5); NG 1.2.1 "internal settings adjusted to make streets and buildings look more like their
counterparts in the city generator" (99067664, xb T31); [STATED] no metric scale anywhere in NG ("Dimensions are a mess
in all my generators", mpb §5; the only absolute figure in the family is UP's ≈ 25 m grid, xb T25k); [SHOWN] the per-seed
base width a (4.1 / 5.1 mu) and template-street width (7.75 / 8.64) are drawn before any template geometry (BG-1).
Known: the size bands' outcomes, the knob names, the absence of a metric. Must invent: the knob → `isSmallEnough` and
width mapping, the size → hood-extent law, a metric of our own (the stage-2 seam requirement makes this ours to fix).
Confidences: functional 0.85; visual 0.80; algorithm identity 0.35; seed-exact 0.01.

### §2.D Naming and title

**D1 — Naming (Tracery grammar + Markov surnames).**
Evidence: [SHOWN] `Assets/grammar.json` (3 827 B) captured verbatim: `district` rule with weighted alternatives
(`regularHood`, `0.3?-gateHood`, `bridgeHood`, `bankHood`, `docksHood`, `centralHood`, `parkHood`), `streetHood`,
`ringHood` (`"{#adj#|0.2?-#proper#{'s}} #ring#"`, fall-throughs to `regularHood`/`streetHood`), `squareHood`,
`manorName`; watabou's extended syntax (`w?-` weights, `{a|b}` inline choice, `TAG?-` conditionals on state flags
`SQUARE / MANOR / PARK / SMALL`, `@list`, `.possessive`/`.s`); terminal list sizes (place 18, ward 4, park 5, …, adj ≈ 95)
(pn §3.11, RA-5); `Assets/words.txt` (360 ordinary English words) trains `nlp.Markov` for `#proper#` ("Goake's Green",
"Gany's Gate"), built once per session (`Markov.new` cold only), `clearState` 46 per generation (pn §3.11); `Namer.
square/street/ring/proper` per template (CA-1, RA-1); every observed title maps onto a grammar path (pn §3.11, RA-5);
[STATED] NG titles are "a simplified version of district names from MFCG … generated purely randomly" (58808794, xa
§2.14); [STATED] naming draws from the main stream after geometry (RA-9 item 4). Known: the engine, the grammar's shape,
the state-flag coupling, the Markov surname path. Must invent: **all content** — by the owner's clean-room ruling the
captured grammar and word list document behaviour and are not reused; our own grammar, corpora and rule weights.
Confidences: functional 0.90 — a Tracery-class grammar with weights and conditionals plus an order-n Markov surname
generator is small work; visual 0.90 — titles are one line of type; algorithm identity 0.80 — the mechanism is captured
verbatim, only the content is ours; seed-exact 0.00 — different content, and the draw positions are unknown anyway.

**D2 — Title layout.**
Evidence: [SHOWN] `MapScene.layoutTitle` (737 B) measures `TextField` bounds (2.4–3.0 ms) and paints one `fillText`
in `72px Voltaire`, `colorText`; corners vary per map (top-left 6, bottom-left 3, top-right 1, bottom-right 2 in the base
runs; ring: bottom-left / top-left) (pn §3.12, RA-0); `Hood.getCloud` is the view-side footprint used to frame the
viewport and pick the corner (RA-9 item 1); [SHOWN] no halo, no subtitle, no scale bar (vs §3.7). Known: one title, a
free-corner rule, the type. Must invent: the corner score (least overlap of text bounds with the hood footprint is the
obvious reading, pn §3.12). Confidences: functional 0.95; visual 0.95; algorithm identity 0.70; seed-exact 0.05 — the
choice is deterministic given the geometry.

### §2.E Rendering

**E1 — Palette / style schema, presets, multi-colour parameters.**
Evidence: [SHOWN] six palette JSONs captured verbatim with an identical **26-key** schema (pn §4.1; cvn S28 corrects the
"27"): `colorBg, colorOutline, colorText, colorRoof[], varRoof, colorGreen, colorTree[], varTree, colorRoad, roadWidth,
roadOutlined, roadSurface, roadTwisting, colorShadow, shadowDir, shadowLength, shadowAlpha, colorAmbience, colorLights,
cityLights, colorStone, colorCupola, colorWater, strokeNormal, strokeThin, details`; every value stored as a string and
re-parsed (`Type.toFloat` 15 768–20 194 per generation); `colorRoof`/`colorTree` are arrays consumed by
`Palette.weighted` (pn §4.1); [STATED] multi-colour parameters ("a random colour from the list is chosen", 70917627,
xb T19), `Details` toggles hatching + tree shading as a speed lever, `Shadow opacity/length` (xa §2.15), five presets
plus a night one, styles editable/saved/loaded (xa §2.15), `Shift+Enter` = new map + random style (xb §1 row 34);
[NAMED-ONLY] `loadPalette` (1 006 B) / `getPalette` (716 B) never ran; [SHOWN] `colorWater`, `cityLights`, `colorLights`,
`roadSurface ∈ {Tiles, Cobbles}`, `roadOutlined` never exercised — a schema written for a bigger sibling (pn §8).
Known: the complete parameter surface and six concrete value sets. Must invent: our own palette values (the captured
ones are the reference's creative content), the semantics of the never-exercised keys (E3, E6). Confidences:
functional 0.95; visual 0.90 — the default preset is pinned to the pixel, the other five are values without renders;
algorithm identity 0.85 — a string-typed JSON palette with weighted colour lists and per-object variance is exactly
what runs; seed-exact 0.05 — style draws (roof k, tree pick) come from the main stream after naming, position unknown.

**E2 — Canvas, layer order, stroke discipline, depth-sorted trees.**
Evidence: [SHOWN] 1500 × 1100 at 1×, OpenFL canvas2D per display object uploaded to WebGL (`texImage2D` 12–528,
tracking layers + trees) (vs §0.1, §3.1); the definitive order greens → roads → shadows → buildings → chimneys/stone →
trees → title, with one tree and a fountain painted before the buildings canvas in some maps (depth-sorted against
buildings) (pn §4.3, RA-5); three stroke colours in every map (`#7a8499`, `#222222`, `#a69e92`), joins always round,
caps round except square on roads, widths only `strokeNormal` 1, `strokeThin` 0.6 and the per-street widths (pn §4.2,
vs §3.2–3.3); ground `#ccc4b7` via `gl.clear`; no dashes, no gradients except dome/fountain basins (vs §3, §5);
per-tree canvases 22–71 px (pn §3.9). Known: everything a renderer needs to reproduce the stack. Must invent: the
tree depth-sort key (y? centroid? bottom of bounds?). Confidences: functional 0.95; visual 0.95; algorithm identity
0.85; seed-exact 0.60 — the order carries no randomness; only the tree interleaving depends on geometry.

**E3 — Roads rendering: Plain (recorded); Cobbles / Tiles / outlined / twisting / dashed (stated).**
Evidence: [SHOWN] one `#a69e92` stroke per street at `getStreetWidth` × CTM, square caps, one 0-segment terminator
(two for ring roads), drawn in creation order; the corridor is not filled — "a narrow grey stripe inside a wider cream
gap" (pn §4.3, RA-5, vs §3.6); `Roads.setMode → drawFull → drawSolid` (pn §1.3) with the other modes never taken;
[STATED] surfaces Plain / Cobbles ("small grey pebble ellipses, each outlined") / Tiles ("rectangles aligned to the road
course"), `Outlined roads`, `Twisting roads`, `Road width` as a ratio of drawn to true width, dashed schematic roads
(70917627, xb §1 row 34; xa §3 NG conventions), and the launch-era negative-space streets (315495, vnd B3.2); the
palette's `roadWidth` 0.1–0.8 and `roadSurface`/`roadOutlined`/`roadTwisting` keys (pn §4.1). Known: the Plain path
completely; the option list and its look from screenshots. Must invent: cobble and tile generators along a curved
course, the outline construction, `roadTwisting`'s geometry, the dashed mode. Confidences: functional 0.85; visual
0.75 — Plain is pinned, the four other surfaces exist only as prose and post images; algorithm identity 0.55; seed-exact
0.02 (cobbles would consume draws).

**E4 — Roof rendering: fake gables, colour law, shading, tapered hatching, special roofs.**
Evidence (all [SHOWN] and measured, pn §3.6, RA-5, BG-3, vs §3.4): per wing `fill lit face`, `fill dark face`, one
`#222222` footprint outline (no ridge stroke), N tapered 3-segment triangles; lit colour = weighted pick × (1 +
varRoof·N₆) with H and S invariant (sd 0.0012 / 0.0026) and k sd 0.069, range 0.79–1.22; dark ÷ lit = (0.7873, 0.8015,
0.8336) sd ≤ 0.012 → `multiply(c, lerp(ambience, shadow, t))`, t ≈ 0.41 vs `shadowAlpha` 0.40 (0.5–0.9 % residual, pn
§9 Q11); `Color.rgbfSafe` clamps after scaling; `PolyCut.cut = hatchRoof` exactly, `pierce` ≈ 8.5 per roof, `shortStroke`
= 2 per pierce (2.0006–2.035) each emitting one filled taper; hatch counts per wing mean 17.1–18.9, even-dominated;
`asRotateYX` ≈ 4 per building (local ridge frame); special roofs `drawPyramid` (2 801 B), `drawDome` (865 B, radial
gradient), `drawDormers`, `drawTip` (cupola), `drawCone` (1 152 B; 6 `longStroke` + 1 `attackDecay0` per cone) rare;
[STATED] "fake gable roofs … look better than mathematically correct hip roofs" (101173551, xb T5), finer hatching
(1.1.0), more pronounced ridges and chimneys (1.2.0) (xa §2.18, xb §1 row 34); MFCG later borrowed "the hatching like
in the VG and NG" as an experiment (mpb §2.20). Known: the entire per-wing op sequence and every colour constant.
Must invent: the taper profile of `shortStroke` (an attack/decay envelope by name), hatch pitch as a function of roof
size, the exact `getDark` constant (t = 0.41 or an extra factor), roof-kind triggers (C2). Confidences: functional 0.95;
visual 0.95 — this is the most exactly characterised rendering in the corpus; algorithm identity 0.80; seed-exact 0.02.

**E5 — Shadows (prism quads, tree shadows, layer alpha).**
Evidence (pn §3.7, RA-5, vs §3.3, [SHOWN]): `drawPrismShadow` once per wing, `PolyTransform.translate` once per wing,
quad fills 2.31–2.44 per wing = one per silhouette edge of the footprint translated by `shadowLength·h` along
`shadowDir` (30°), flat `colorShadow` with the layer at `shadowAlpha` (0.4), every quad followed by the identical path
stroked at 1 px to close seams; tree shadow = the crown polygon translated (segment multiset identical, 314 = 314,
70 = 70, 112 = 112); ≈ 18 % 1-segment strokes unaccounted (pn §9 Q10); composited result over ground `#7a8499 →
#a19e9a` is "not a clean multiply or a single alpha" (vs §7 item 7); [STATED] shadows optional in all his generators,
`Shadow opacity` / `Shadow length` (xa §2.15). Known: construction and constants. Must invent: the per-wing height
source (stored or from area), the silhouette-edge test, the blend mode. Confidences: functional 0.95; visual 0.90;
algorithm identity 0.80; seed-exact 0.02 (height may be drawn).

**E6 — Unrecorded style features: night lights, other presets, `colorWater`, `details` off.**
Evidence: [STATED]+[SHOWN in post images] night styles light the street network ("a yellow glow bleeding from every
street", `Lights` colour; buildings stay dark) (xa §3, vnd B3.2), `cityLights 0.8` / `colorLights #FFF0BF` /
`colorAmbience #5F6F7F` in `night.json` (pn §4.1); `bw` with zero variance and white everything, `modern` with
`roadOutlined true` (pn §4.1); `Details` off = no hatching, no tree shading (xb §1 row 34); `colorWater` present but NG
draws no water in any map (pn §8; the creator's reason for rejecting MFCG→NG: "rivers, city walls" unsupported,
100431269, mpb §2.22). Known: the keys and the intended look. Must invent: the glow construction (VG's `#ffffff @24`
road-graph mask is the family precedent, vs §2.4), the ambience/shadow interaction at night (pn §6 H7 gives the
prediction), what `details=false` removes. Confidences: functional 0.80; visual 0.70 — no render exists to match;
algorithm identity 0.40; seed-exact 0.01.

### §2.F Editing and interaction

**F1 — Toggles, hotkeys, presets, tags dialog, rotation.**
Evidence: [STATED] `T trees · G greens · P pins · R roads · S shadows · C style · 1–6 presets · 0 random style · Tab
tags · Enter new · Shift+Enter new + random style` (419965, vnd B3.1); mouse-wheel map rotation and tag-dialog UX rules
(shift-click descriptions, alphabetical, collapsible, remembered) (64375271, xa §2.13); [SHOWN] the never-executed
binary surface `setRoads, toggleTrees, togglePins, toggleChimneys, toggleGreens, toggleShadows, toggleRoads, feelLucky,
loadPalette, getPalette` — the authoritative six-layer decomposition incl. chimneys (pn §1.5); [STATED] renaming is not
offered in NG (only UP got it, xb T25n); no warp tools, no reroll-of-part (contrast MFCG). Known: the complete
interaction surface. Must invent: nothing structural. Confidences: functional 0.95; visual 0.90; algorithm identity
0.80; seed-exact 0.30 — Enter's successor seed is on the orbit (A2); a random style on Shift+Enter is an unknown draw.

### §2.G Export and interoperability

**G1 — Export PNG / SVG / JSON and permalinks.**
Evidence: [STATED] PNG / SVG / JSON "for opening them in the City Viewer" since 1.0.1 (59046807, xa §1 row 28, §2.17);
permalink = the non-itch URL, an explicit *Permalink…* item on itch (xa §2.21); the SVG path is the shared "generic
converter from drawing calls" library (xa §2.16); [SHOWN] `?seed=&tags=` reproduces byte-identically across loads
(RA-0); [NAMED-ONLY] `assemble` (7 272 B, the largest unexecuted symbol) — plausibly the export/serialisation path (pn
§9 Q17); [INFERRED] the JSON schema from City Viewer renders: footprint + height/storeys + roof orientation, road
polylines with widths, tree positions, open-space polygons (xa §2.17, xb T26). Known: formats, the permalink contract,
the consumer. Must invent: the JSON schema (ours, with the stage-2/-3 ids and layers the owner's rulings require), the
SVG writer. Confidences: functional 0.85; visual 0.85; algorithm identity 0.40 — never executed in a recording;
seed-exact 0.30 — the permalink mechanism itself is exact; the map behind it is the rest of this table.

**G2 — Integrations.**
Evidence: [STATED] NG → Procgen Mansion via GET parameters, passing house shape not just size (70917627; vnd B2.6);
City Viewer consumes NG JSON and renders it as a "tabletop diorama" (xa §2.17, §3); MFCG → NG **rejected** by the creator
("many things in the city generator that are not supported in NG (e.g. rivers, city walls) … I lost interest in NG",
100431269, mpb §2.22) and replaced by MFCG's District View; exact reproduction of an MFCG district inside NG judged
unlikely (70917627 comment, xb §4 item 15); the recurring user request is "MFCG districts rendered at NG fidelity,
stitched into a whole city, with matching roads across seams", resisted on visual-noise grounds (xa §5). Known: the
mechanisms and, importantly for stage 2, the creator's own diagnosis of why NG could not be composed into a city.
Must invent: everything about composition — that is stage 2's design, not a reference capability. Confidences:
functional 0.70; visual 0.75; algorithm identity 0.40; seed-exact 0.00.

### §2.H Scale and performance

**H1 — Performance envelope.**
Evidence: [SHOWN] `MapScene.reset` 10–52 ms (model 6–32, view 4–26) for medium area/street/square, 78–96 ms for ring
(model 44–55, `BisectorEx.partition` 12–16 ms, `ObjectMap` 5–7 ms self); rasterisation `Context3DShape.render` 73–111 ms
> generation; cold load pays 205 ms `lime.media.AudioContext.new` and ≈ 25 ms fonts/shaders; `intersectLines` 140 k–213 k
calls (7.8 ms self), `Point.new` 385 k–561 k, heap 8–39 MB (pn §5, RA-6); per-wing draw budget ≈ 25 ops, ≈ 16 000 ops
for 650 wings (pn §5.4); `Details` off is the creator's speed lever (xb §1 row 34); [STATED] O(n²) is "fine for my use
cases" (101173551, xb §4 item 5). Known: where the time goes and the scaling (linear in wings). Must invent: nothing —
a flat-array, allocation-free line-intersection kernel and index-based hole polygons would beat it (pn §5.3, RA-6).
Confidences: functional 0.90; visual (0.90); algorithm identity 0.60 — costs are known, code is not; seed-exact (0.00).

## §3 Overall verdict

**Aggregation (judgment-weighted, not a plain mean).** The layout core B3, B4, C1 and C8 — the four rows that decide
whether the *statistics* of a neighbourhood match — are weighted double; rendering rows are weighted once; F/G/H once.

* **functional 0.85.** Nothing in NG is infeasible and most of it is over-determined by the recordings; the residual is
  the tuning loop for `isSmallEnough`, the content weights and the ring constants, plus the five unrecorded road/palette
  modes. NG is the reference we could re-create most faithfully by behaviour.
* **visual 0.85.** The default palette is pinned to the pixel (roof and tree colour laws to < 1 %, hatch and shadow
  budgets to a tenth of an op per wing, street geometry to 0.05 px at junctions). The other five presets, the four
  non-Plain road surfaces and the night lights exist only as prose and post images, and the hood silhouette — the first
  thing a viewer reads — is known only by class.
* **algorithm identity 0.55.** NG's *architecture* would be reproduced faithfully (≈ 0.85: templates as seed geometry
  plus sub-areas, one recursive bent bisector for streets and lots, a hole-aware variant for annuli, perimeter blocks
  as a frontage filter, one shared Poisson field, prism shadows, tapered hatching, Tracery + Markov naming, one MINSTD
  stream). Its *rules and constants* inside `makeCut`, `isSmallEnough`, `validateOuter`, the content dispatcher,
  `createShape`, `createRings` and the pin/plan/roof selectors would be re-invented (≈ 0.35–0.45), even where the outputs
  are now measured to the degree BG/PF give. "Same skeleton and the same measured statistics, our muscles."
* **seed-exact 0.02.** The engine and the successor-seed rule are CONFIRMED (§1.3) — a first for the three watabou
  generators beyond MFCG — but a same-seed map needs the position of every one of ≈ 35 k–104 k inlined draws through
  model, naming and view. No capture can give that without reading the bundle, which is barred. 0.02 rather than VG's
  0.01 only because NG has one stream, no reseed points and no map-level retry.

**Effort and shape of the residual risk** are in §4–§5. **What this means for stage 2** (readiness only, no design
here): the two properties stage 2 needs from an NG-class generator are both evidenced — the bisection accepts an
arbitrary boundary polygon (B1) and templates are seed geometry handed to one generic subdivider (B2, B8) — while the
one thing NG never had is exactly what composition needs: any relation to features outside its own outline (water,
walls, roads entering or leaving; G2). The seams, ids, context vectors and the metric (C8) are therefore ours to
design, not theirs to copy; the reference offers statistics to validate against, not a composition model.

## §4 Effort estimate (expert team, NG-class parity with statistically similar output; default style plus the
stated modes)

| block | person-weeks | note |
|---|---|---|
| geometry kernel: polygon boolean/offset (`PolyBool`, `Offsetter`), OBB/hull, `cut(gap)`/`pierce`/`stripe`, allocation-free line intersection, polygon-with-holes type | 3.0 | the 2017 primitives name the contracts (osg §2.1.4–2.1.5, §5 keep-list); a modern rewrite should use index-based half-edges and Clipper-class offsetting rather than the reference's identity-keyed maps |
| bent bisector (B3) + hole-aware variant (B4) + `isSmallEnough`/width/fillet tuning against BG-1/PF-2 statistics | 4.0 | half of it is the measurement harness: a `paths_stats`-style checker that re-derives bend position, arrival, stop rule, OBB-axis share and width fit on our own output and on the captures |
| templates, outline, plaza, rings (B1, B2, B7, B8) | 2.0 | ring is the costliest; the square plaza's axis propagation falls out of the bisector |
| lots, setback, validation, content dispatch, manors, buildings/plans/roof kinds (C1–C3, B6) | 2.5 | selection rules are all ours; calibrate on the census and footprint statistics |
| greens, Poisson field, trees, pins (C4–C6) | 1.5 | Bridson k = 50 with a fixed tile, 4-way bulging crowns |
| renderer: palette schema, layers, roofs/hatching, shadows, roads incl. Cobbles/Tiles/outlined/dashed, night lights, title; PNG/SVG writers (E1–E6, D2, G1) | 2.5 | the default path is specified op by op; the four unrecorded road modes and lights are design work |
| naming engine + own grammar and corpora (D1) | 1.0 | engine is small; the content is a writing task |
| tags, toggles, permalinks, JSON export with stable ids (A1, F1, G1) | 1.0 | |
| validation and tuning loop (size sweep, seam-free statistics, screenshots) | 1.5 | |
| **total** | **≈ 19 (range 15–24)** | excludes stage-2 composition, which is not an NG capability |

## §5 The ten riskiest unknowns, ranked

1. **`isSmallEnough` (276 B) — the termination law and how the size tag and the "average building and block size"
   knobs map onto it** (pn §9 Q1; cvn §2 last row). It sets block count, lot count, density and therefore every
   statistic; the size sweep in §6 is the only way to bound it without code.
2. **`makeCut` internals beyond the measured statistics**: which major-parallel side starts the cut (chance in the
   data), the gate's exact bounds and distribution (hard 0.40–0.60 with retries vs a clamped law), the second OBB, the
   `detectStraight` tolerance, the alternative-cut generator (PF-3 "still OPEN"; RA-3). Statistical parity is reachable;
   identity is not.
3. **Hood outline construction** (`createShape`, 1 170 / 1 434 B; B1) — the silhouette class per template is known,
   the generator is not, and `getCloud` was a wrong guess that stood for four days.
4. **Fillet-vs-sharp and the arc radius law** — 53 % arcs with no predictor found; radius tracks the shorter leg
   (ρ 0.94) but the selection may be random or a fit test (PF-2 (e)).
5. **The width law's origin** — per-seed base a (4.1 / 5.1), slope b (0.0023–0.0039 per map, not size-normalised), the
   ≈ 5 mu free-end term, and the fixed template-street widths (BG-1).
6. **Lot validation semantics and party-wall bending** — `validateOuter`/`validateLot` are 189 / 195 B of unknown
   test; CA-5's adjacent-footprint pairing is still undone, so whether lot cuts bend is unmeasured (C1).
7. **Block-content weights and conditioning** (Manor / Empty / Green shares by area, rim, spacing; the content retry's
   validity test; landmark placement) (B6, C2).
8. **Ring construction** — ring count, radius law, per-ring noise, candidate scoring (the 35 B closure), the square
   and single-building fallback branches never seen (B8, RA-7 H-R untested).
9. **Unrecorded style modes** — Cobbles, Tiles, outlined, twisting, dashed roads; the night glow; `details` off; the
   five other presets (E3, E6): visual parity beyond the default style rests on post images.
10. **Building plan, roof-kind, chimney and pin selection rules** (C2, C6): all vocabularies are complete, every trigger
    is missing, and `spawnPin` 23–37 vs 6–11 rendered is unexplained.

Below the fold but real: `PoissonPattern.warp` semantics (cvn V15); the tree depth-sort key; the uneven-streetwall
method (C7); the `getDark` residual (0.5–0.9 %); the 18 % single-segment shadow strokes; `assemble` (7 272 B) and the
JSON schema; and the fact that every number is for build 11441280 of a generator its author has superseded.

## §6 Cheapest experiments that would raise confidence most, ranked by expected gain per hour

1. **Forward-prediction test on the existing vertex captures (no recording).** Implement PF-3's proposal: for each of
   the 162 bounded faces build the cut from "OBB minor axis, crossing at the measured fraction, leave perpendicular,
   corner at mid-course, arrive perpendicular", compare endpoints with the drawn cut (target: < 0.1 chord error in
   ≥ 80 %), and map RA-3's "Alternative cut" console lines onto street draw ranks to see whether they coincide with the 13
   off-centre crossings. Closes or refutes "OBB axis + midpoint corner" as the whole construction; moves B3's algorithm
   identity to ≈ 0.7 or sends the design to a corner-first reading. ≈ 1 day of scripting on files already on disk.
2. **Size sweep with vertices**: `coverage + draw --vertices` for `small / medium / large` × `area / street / square /
   ring` × 3 seeds (36 runs, one scripted session). Yields the leaf-area and OBB-minor-extent distributions per size
   (bounds `isSmallEnough`), the width law's a / b vs size, block and building counts vs size, and whether a is drawn
   before geometry (same seed, different templates already agree; different sizes would confirm). The single measurement
   that most raises C8 and B3.
3. **Palette and mode sweep on one seed**: the same seed rendered under `night`, `warm`, `cool`, `bw`, `modern` and
   with Cobbles / Tiles / outlined / twisting / dashed roads and `details` off (style dialog or URL, draw pass only).
   Tests pn §6 H7's shading predictions ((0.70, 0.70, 0.70) under night, (0.814, …) under cool), records the cobble and
   tile generators' op signatures, and the glow construction. Raises E3/E6 visual from 0.70–0.75 to ≈ 0.9.
4. **Adjacent-footprint pairing on the existing vertex captures** (CA-5's test, RV "how to measure further"): pair
   footprints across party walls and along fronts. Decides whether lot cuts bend, measures the uneven-streetwall
   jitter (C7), and gives the frontage-width and depth distributions C1 needs. Half a day, no recording.
5. **Ring sweep**: 6–10 `tags=ring` seeds with vertices. Tests RA-7's five predictions (1 / 2 / 1 / 96 identities at
   R = 1, fixed 50-segment resolution at any radius, 7.5° polar sampling about a common centre, C = 0 ⇔ a `Green`/square/
   large building, `Chaikin` extra count < R) and gives the R distribution and spacing law.
6. **Precise block coverage on `Bisector.makeCut`, `isSmallEnough`, `createShape`, `validateOuter`** (byte-range hit
   counts from `coverage.json`, no source text): branch structure and loop counts of the four black boxes without
   opening the bundle — the same trick the VG lane proposed for `createDensity` (cvn §6).
7. **`leafy` / `secular` pairs** on one seed each (coverage only): isolates the green-probability and the large-building
   suppression paths. Low cost, modest gain.
8. **A `Random`-draw census is not available** (inlined `next()`, §1.3); the only seed-level experiment left without the
   bundle is to confirm on 2–3 more captures that the successor seed's k equals the whole generation's draw count
   (e.g. by regenerating twice with identical tags and checking k is stable for the same seed — it must be).

## §7 CONFIRMED vs PLAUSIBLE, and what this lane executed

* **Executed by this lane** (CONFIRMED): the MINSTD orbit test on 9 seed transitions and the cold-load seed deltas
  (`captures/neighbourhood/seed_orbit.py`; output quoted in §1.3); the `com.watabou.utils.Random.*` call census on six
  `calls.json` files (§1.3 (c)). Everything else numeric in this file is quoted from findings whose numbers the critic
  seats re-derived on the raw capture files (cvn §4: 23 identity checks with 0 failures, `warp ÷ step = 50.000` in 9/9,
  the RA-2 arithmetic exact in both ring runs; BG/PF: `paths_stats.py --md` re-run byte-identical to RV, 0 fallback
  snaps, every non-template street with exactly one face component per side) — CONFIRMED at the source, not by me.
* **PLAUSIBLE (reasoning only)**: that the inlined `next()` explains the 3–11 visible `Random.float` calls and that
  `Random.new` = 4 is a label collision in the non-re-analysed base capture (§1.3 (c), §1.4); every "sampled under"
  parentage reading (RA method note); hypothesis H-R for the rings (RA-7); the OBB-position + directional-bend reading of
  `makeCut` beyond the 162 bounded faces (PF-3 limits: 344 hood-side cuts untested); the corner-score reading of
  `layoutTitle`; all effort figures in §4; every confidence number, which is a judgment over the evidence cited in its
  row and not a measurement.
* **Deliberately not done**: no screenshot was re-measured; no new recording was made; the sibling lanes' numbers were
  not consulted, so cross-generator consistency of the four scales is the manager's to check, not this file's claim.
