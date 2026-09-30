# Fix-all round 2 — SCOPE area (summary, §1, §13–§17, decisions, judgment calls, staged list)
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r2 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-scope-r2`, 2026-09-25. Status: COMPLETE (2026-09-25; revised the same evening to fold the kernel, pipeline and rendering round-2 requests, which landed after this file's first landing).

## 0. Reading record and method

**In plain words.** Round 1 rewrote the parts of the design that say what is built and in what order, how it is tested,
how it stays legally clean and which decisions were taken. The checkers left fourteen things open in this area. The
two serious ones: the test of "does re-rolling an area give the same kind of result as a fresh town" still failed a
perfect re-roller, and the rules for the owner's side-by-side judgement let "mastered" be declared without the owner
ever looking. Both are now fixed: the re-roll test compares where each re-rolled number ranks among fifty fresh ones —
executed here, a perfect re-roller fails about one campaign in a hundred, as intended, and every kind of wrong
re-roller fails almost always — and a milestone whose panel the owner has not rated goes on building but is marked
*provisional* and can never claim "at parity", "mastered" or the stage-2 gate until the owner has rated it or accepted
it. The other twelve are small contradictions: records kept in a folder the product's tests may not read, two names
still borrowed from FTG's add-on, a test scheduled before the feature it measures, a table row counted wrong, three
stale rows, and interface lines in the package section that disagreed with the sections they point to. Nothing is
deferred: every item is FIXED; none is STAGED-BY-OWNER or INVALID.

**Read in full for this lane:** `docs/ARCHITECTURE.md` (6 350 lines; every owned section line by line — the summary,
§0.4, §1, §13–§17, the delegated decisions, the judgment calls and the staged list — and every section an item's fix
depends on: §2.1–§2.9, §3.1–§3.10, §4.1–§4.12, §8.1–§8.2, §8.8–§8.10, §9.1–§9.6, §10.3's calendar sentence, §11.3,
§12.9, PART II, PART III and Appendix A); `docs/validation/fix-all/r1-verify-scope.md` (all 128 lines);
`docs/validation/fix-all/r2-determinism.md` §0–§1, its §2.9, §6.1, §6.4, §6.5 and §7.3 blocks and its §3–§5 (its SR-1 –
SR-7 requests to this area are carried below); the rendering, determinism and pipeline verifiers' rows for N-22, N-23,
N-24, NF-D12 and NF-P11; `docs/validation/fix-all/r2-rendering.md`'s §8.2 presets table (in progress when read);
`docs/IMPROVEMENTS.md` §3.2 (S1–S6, restated in our own words for NF-S4); `research/findings/ftg-payload-visual.md` §7.2
(the message and field *names* only, to grep for them — no reference code opened); the bench scripts
`docs/validation/bench/fixall_verify_scope_o9c{,_rank}.py` and their outputs. `docs/validation/fix-all/r1-validate.md`
does not exist. Nothing outside the project folder was read.

**Method.** Each item's claim, failure scenario and required change were taken from the verifier files. Each fix is a
mechanism written into a replacement block of a section this area owns; where the text that must change sits in
another area's section, section 3 states the exact change for the integrator. Where a fix rests on a statistical
claim, the claim was executed (section 4).

## 1. Disposition table

All fourteen open items are FIXED. "[…]" names a change in another area's section, stated in section 3.

| item | sev | disposition | sections changed | mechanism, one line |
|---|---|---|---|---|
| NF-D12 | minor | FIX | §14 [§6.1 determinism, §9.5 and §8.10 rendering] | `StageContext.stream(concern: ConcernId, entity: Handle, opts: StreamOpts { reroll, attempt, epoch, salt })` over the kernel's one structured mixer (`rng.stream`), with `streamOpts()` filling the defaults; town-level and per-document furniture draws (compass, emblem) use the town root's entity key, a function of the seed key alone — never `docId`; the attempt cap is the concern registry's (geometric ladders 3, naming 8), which r2-determinism's §6.1 already states |
| NF-P11 | minor | FIX | §15.1, §1.4 | NG B8 now reads II.2's radial-free `RingFabric` (rings are the only seed geometry; radials come from each annulus's bent cut, staggered); NG B1 points to II.1 rule (5) and §4.2 S1 (2)'s outline templates; MFCG B6 names §4.8's in-place repair (angle equalisation, then bloat) before re-siting |
| N-22 | minor | FIX | §14 | `TileBackend` shadows `'off'\|'drop'\|'prism'` (§8.2's values); dependency chain `… plots ← labels ← render ← edit …`; S13b's render inputs arrive as parameters through `ObstacleSource` and `RoleIndex`, declared by `@plat/labels` and implemented by `@plat/render`; `LodBand`, `Role`, `ZoomStop`, `LabelEntity` and `QuarterNode` live in `@plat/model` |
| N-23 | minor | FIX | §16, §13.4 | M2b builds `ink`'s neighbourhood close-up (with the roofs) and its building band, and `lit`'s four bands; M5 builds `hatched`'s city, district, neighbourhood and building bands; B-ZOOM's role-continuity check runs from M2b for `ink` and `lit` and from M5 for `hatched`; the ink-family variants are scheduled at M3b |
| N-24 | minor | FIX | §13.3, §13.8 [§6.5 (9) determinism, §9.1 rendering] | a per-stop **placement digest** (label, chosen candidate, ladder rung, size, glyph positions as exact doubles) over the golden suite at B-ZOOM's 27 stops, stored with the goldens, compared on Node x86 in the PR tier and on the five engines nightly; a moved placement digest needs an S13b shift record (a view shift, no output-version bump) |
| FTG-22 | minor | FIX | §17.1 (2), (9) [§2.9 determinism — already renamed in r2; §11.3 rendering; §10.3 pipeline] | the bridge token is `logHead` (`baseLogHead`, `currentLogHead`); §10.3's calendar sentence uses `view.set { time }` and the module command `sim.advance { hours }`; §17.1 scans this document at every integration pass, not only at M-1; executed on a simulated integration: 0 hits for every identifier in ftg-payload-visual §7.2's table |
| IMP-7 | major | FIX | §15.2 O9 (c), §13.2, §13.8, §16 M3a, J-S4 [§7.3 item 7 (iv) determinism — the rank test is in r2; tie rule, campaign size and reference rerolls requested] | calibrated rank test: per statistic, the rank of the regenerated value among K = 50 from-scratch generations (rerolls 32 768 + i), ties broken by a uniform draw, χ² on a 10-bin histogram, Holm at family-wise 0.01, n = 400 regenerated scopes per nightly campaign; executed: 0.9–1.1 % false campaign failures, 99.5–100 % power against too-snug, too-loose and biased regenerators; without the randomised tie-break a discrete statistic fails 100 % of perfect campaigns |
| NF-S1 | minor | FIX | §13.3, §13.5, §13.6, §13.9, §14 | `ShiftRecord` and `CascadeRecord` JSON in `plat/goldens/shifts/o<k>.json`, `MilestoneRecord` in `plat/goldens/milestones/`, `D5Record` and the seed list in `plat/goldens/d5/`; `ShiftRecord`, `CascadeRecord`, `MilestoneRecord` defined in §13.3, `ParityReport` in §13.5, `D5Record` in §13.6; `docs/validation/shifts/` and `docs/validation/d5/` become research-side copies generated from them; `CalibrationRun.shifts: ShiftRecord[]` |
| NF-S2 | major | FIX | §13.6, §16, D-1, D-5, judgment calls | one rule in §13.6 (7) and §16: a not-rated gating panel lets the build continue with the milestone's D-5 status recorded *provisional — not rated*; "the base at parity" (M2b), "mastered" (M4) and the stage-2 gate (M5) are claimed only by a rated pass or a recorded owner acceptance; the panel is re-offered at every later milestone and at every release until rated; the `house` outcome is pre-decided (candidate 1 ships as `house`, `ink` stays the default, the pick is re-offered); `H32` is defined as lane 0 of §6.1's seed-key derivation over the string's UTF-8 bytes |
| NF-S3 | minor | FIX | §13.5 | FTG's turning per 100 m is a **target for organic presets** with the row's declared 0.5–1.5 × band (an exception to the band rule, stated with its reason) and a pre-decided `headingSigma` recalibration; the no-cliff and entropy clauses stay *weakness* |
| NF-S4 | minor | FIX | §15.2, §13.7 | S2, S4, S5 and S6 letters restated in the matrix with C / P / O classes (IMPROVEMENTS cited only for traceability); a §13.7 row gives S4's square-area band a number; **J-T** defined once in §13.7 |
| NF-S5 | minor | FIX | §13.5, §13.7, §16 M-1 | rows whose reference numbers come from M-1 are marked ⟨M-1⟩ with the pre-decided outcome "unmeasurable → descriptive, gates nothing, `known-defects.json`"; M-1's list gains every such measurement (MFCG streetwall continuity, lots per block, T / Y share, intramural dead ends, blocks per ha and recoverability; FTG turning; NG block counts per template); §13.7: a fallback that moves a threshold to a measured value marks the letter *not achieved* |
| NF-S6 | minor | FIX | §13.7, §16, §13.2 [§5.3 determinism] | O19 (g) confirmed at M2b for `ink` and `lit`; M2a measures flat per-edit validation TOWN → CITY and M2b adds METROPOLIS |
| NF-S12 | minor | FIX | §15.1 | the NG table is headed "31 rows" |

**Carried from the other areas' round-2 drafts (not items of this area):** every request the four other drafts made of
the scope sections is already in the blocks of section 2 — r2-determinism SR-1 – SR-7, r2-kernel S1 – S7, r2-pipeline
S1 – S6 and r2-rendering S1 – S18 (the map is §3.5). One harmonisation: r2-determinism's SR-3 named 29 700 as the top
of the CITY band and r2-rendering's §12.5 names 29 900; §13.2 uses 29 900 for both the cost-model and the first-map
runs, so one set of nine sizes serves both. While folding pipeline S3, the same stale castle phrase NF-P11 corrects in
§15.1 was found in §1.4's "walls, gates, castle" row and corrected there too.

## 2. Replacement blocks

Each block replaces one subsection of `docs/ARCHITECTURE.md` whole (heading line included), matched by the exact current
heading, in document order. Every block carries the review banner directly under its heading; unchanged paragraphs are
repeated verbatim so each block is complete. **These blocks also carry every request the other four round-2 drafts made
of this area** (r2-determinism SR-1 – SR-7, r2-kernel S1 – S7, r2-pipeline S1 – S6, r2-rendering S1 – S18; the map is
§3.5), so the integrator applies each scope section once, from here, and need not re-apply those requests.

=== REPLACE §1.2 The one-click default, stated once ===

### 1.2 The one-click default, stated once

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

`generate({seed})` → a TOWN of 5 000 people whose complete city band — every block in its ground tone, every footprint
mass, street, wall, gate and quarter label — is on screen within 150 ms of the click on the reference machine for the default 5 000-person TOWN (124–145 ms across
§12.2's building range; §12.1); a CITY's and a METROPOLIS's default requests take ≈ 0.33–0.42 s and ≈ 0.86–1.05 s, and
every size follows §12.5's laws of the building count. The first paint is the finished city picture, never a partial
preview (§8.5). Defaults: the `ink` style with MFCG's raised under-copy on and the projected shadow off; walls on at
every rung (R6); first-level features at *auto*, drawn per seed from S0's feature-probability table and reported (§7.8);
coast or river by the site model's request defaults; curved quarter labels at city zoom and district names from district
zoom, in IM FELL Great Primer (§9.4, §17.2);
scale bar and compass; no questionnaire, no hidden state. Every improvement ships behind the defaults (R8): the fast
path never pays for the simulation module, projected shadows, relief, thumbnails or the advanced panel.

=== REPLACE §1.4 Fusion thesis, stage by stage ===

### 1.4 Fusion thesis, stage by stage

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

The rule at every genuine conflict is the owner's DESIGN TIEBREAKER: the approach more faithful to how real settlements
are constrained and laid out — explicit constraints (terrain, water, defence, land use, access, growth) and precise
real-unit geometry with measurable statistics — with legibility and one-click use as a floor. Rows marked **TB** are
where it decided; rows marked "no TB" are where charm and evidence agree and it was not needed. Each criterion carries its
§15.2 class: **C** conformance (true once the rule is built), **P** parity with a measured reference number, **O** an
outcome the references do not reach.

| stage | MFCG-class approach (evidence) | FTG-class approach (evidence) | PLAT adopts | discards, and why (measurable criterion) | TB? |
|---|---|---|---|---|---|
| site: terrain, water | coast = 6-octave noise per cell, `sea` an angle; river = course search with 712 rejections and 21 canal restarts in 58 attempts, whole-city restart on failure (`_critic.md` C15; CONFIDENCE B3/B8) | water first, coast "in two arms", rivers that "may bend back", no terrain ("Mountains aren't properly supported yet", CONFIDENCE C1/C2/D8) | **new (O1)**: heightfield in metres + hydrology; rivers by descent; coasts/lakes/islands from one closed-outline routine; coast and contours agree by construction; water faces enter L0 with typed shores | MFCG's mesh-edge rivers (no bed, restarts) and FTG's border-touch typing — neither has a terrain constraint. Criterion: requested water features delivered by tier with 0 tier-6 omissions (O1 a, O); non-monotonic beds 0, contours cross water 0 (O1 b, C) | **TB** |
| units and frame | an internal unit of **4.00 m** (the SVG scale bar against the map group, three files: 3.9998 / 3.9998 / 3.9991 m); its GeoJSON export is already in metres (road width 8 in the JSON, 2 in the SVG) — `captures/mfcg/exports-sweep-2026-09-25/README.md`, redteam-mfcg MFP-8 | integer centimetres centred on (0,0), +y north (`_critic-ftg.md` F1, CONFIRMED) | FTG's convention | MFCG's internal unit (read only to measure its exports). Criterion: every parameter and export in metres (O6 a, C) | **TB** |
| centre and destinations | plaza = innermost cell; streets = BFS gate → plaza on cell edges; roads to a phantom point 1 000 units out (`os-model.md` §6 via CONFIDENCE B7) | initial-roads type at the origin, no destinations ("most of the settlements in FTG look similar", 112861635) | **MFCG's idea on FTG's substrate**: named destinations (market, gates, bridging points, harbour, external bearings), the plaza and castle reserved and the gate sites picked at S3, arterials routed between them over a cost surface in real metres | FTG's destination-less bloom. Criterion: through-roads at a destination 100 % (O4 a, C); detour ≤ 1.4 (O4 b, P) | **TB** |
| secondary streets | since 0.10.0 every non-arterial street is the district-wide twisted bisection of the merged ward polygon — a real, fully connected secondary network with mostly 3-valent nodes, cut inside a wall built first so the fabric inherits its shape (87882877; `profile-mfcg.md` §4.9 via redteam-mfcg MFP-2); the 2017 ancestor drew streets on cell edges | proposal-queue growth in stages, 15° per-vertex cap, half-step normal streets, prune/trim between stages (`ftg-docs-params.md` §2.2–2.5) | **by regime**: inside the walls S5 grows only district-scale secondaries that join the arterials (separation ≈ 120–250 m) and S8's recursive bent cut of each district polygon cuts every lane and intramural secondary; outside the walls **FTG's staged growth** along the main roads, destination-aware, curvature-continuous, with explicit legality thresholds FTG never states; the suburb regime by preset (§4.4) | FTG growth down to block scale inside the walls (the fabric would neither inherit the wall nor carry MFCG's signature); FTG's clamp-only wiggle (zero mass above 15°, `_critic-ftg.md` §4 row 7). Criterion: MFCG's street signature — lot-orientation coherence at 60 / 120 / 250 m and wall alignment by distance band inside MFCG's measured ranges (P, §13.5); no turn cliff and junction p5 ≥ 30° (O4 b, P) | **TB** |
| districts | grown from seeds around features with `validatePatch/validateEdge`, holes split (CONFIDENCE B9); live typing is feature-named | district = one growth lot typed from the remaining pool "and what the lot is next to"; 49 % of buildings in no ring (`_critic-ftg.md` F4/F13) | **MFCG's grower over FTG's objects**: districts are groups of coarse skeleton faces seeded at features, grown with arterials, walls and water as barriers, **feature-named** (market, gate, harbour, castle, temple, riverbank …), merged into **quarters** for city-zoom labels; the use mix comes from the roster's allocation and the prosperity field, with a mixed-use floor | FTG's one-lot districts (containment 53 %); class-typed wards MFCG itself dropped. Criterion: containment 100 % (O11 b, C); city-zoom quarter labels at MFCG's count per matched size and block-level use mix in band (P, §13.5) | partial TB |
| block fabric (lanes) | twisted bisection of wards into blocks and alleys; restart on "bad poly" (`_critic.md` C13; ST-8) | straight inserted roads to a target area (§2.5) | **NG's bent cut** with the measured signature (start at N(0.5, σ) of the OBB major axis, one bend at mid-course, ≥ 85° arrival; BG-2/BG-4, manager note 3) as a hole-aware kernel transaction with a bounded ladder; the district's class band as the stop law; the deep-interior choice (court, back lane, through-alley, rear plots) by band shares | FTG's straight roads (too regular); MFCG's restart. Criterion: K1/K2 within the measured spread (P); 4-way share per preset, organic 0–15 % (R3, P) | no TB — charm and evidence agree |
| blocks → plots | bisection lots + `filterInner` + `indentFronts`; lots painted as buildings | strips / centroid cuts / shrink-then-split; 441 m² in every class; no owner (`_critic-ftg.md` F17) | **new (O5/O18)**: per-frontage regions of each block, strips perpendicular to each frontage with party walls, typed residue, joins and splits from the prosperity field, alleys and back lanes where the band's deep-interior share says so | both references' cut-then-filter lots. Criterion: access edge 100 % (O5 a, C); streetwall continuity and footprint cover against MFCG's exports at the matched rung, direction declared (P, §13.5); within-district plot-area CV above its floor (O, §13.7) | **TB** — burgage plots were laid from the frontage |
| buildings | lots drawn as buildings ("the illusion of buildings"); Complex = rectangles; landmarks by `lir` | building = plot (Dense) or inset plot (Gaps); entrance 3 m from the road (C9) | **the owner's plot model**: parcel with 0..n footprints and a typed yard; site plan by class (row / compound / detached / hovel / institution / tents); heights on everything; entrance rule kept; landmark footprint templates in the base; the stage-3 generator behind the `outline` / `compose` interface (§2.6) | MFCG's global display switch; FTG's one-building-one-household lot. Criterion: O17 (a)–(i) | TB (owner ruling, metric tables) |
| walls, gates, castle | one ring on cell edges, built before the streets; `gates = N` exact; a tower on every non-gate vertex; castle = a cell with a 0.75 compactness repair loop (B5/B6) | wall = typed edge chain on the district ring after a stage; towers at 39 m median; no gate objects; castle fitted into its lot (C11/C12) | **FTG's staging + MFCG's gate identity and wall-first order**: gate sites picked and the castle and plaza reserved at S3; stage 1's enceinte traced at S3 from the travel-cost boundary over its solved gate routes, each later enceinte at S5a from its stage's boundary, both pulled to defensible ground *before* that stage's streets grow; gates exactly where arterials cross, exact N by MFCG's measured gate law; towers by rule; castle by score with the compactness gate as a shape check, repaired in place first (angle equalisation, then bloat) and only then by re-siting; several enceintes; an open waterfront by default; lifecycle for wall → road | MFCG's cell-as-castle and tower-per-vertex; FTG's ungated crossings. Criterion: O8 (a)–(h); walled share at MFCG's measured 0.87–0.92 (P, §13.5) | **TB** — defence as an explicit constraint |
| hinterland | farms as a ward type, `Cutter.grid`/`splitField`; forests "fill all available space" (the creator: "historically incorrect anyway") | main roads to the border, four farmland modes, farmsteads with driveways, hedgerows, reserves (C14–C16) | **FTG's contract + O14**: land use sized to population, field systems as presets (open-field strips, enclosed, FTG's hedgerows, the MFCG/VG sector look), farmsteads by their fields, woodland by distance, a context margin | MFCG's fill-the-leftovers. Criterion: O14 (a)–(g) | TB |
| content | population ≈ 6.12 × buildings, wards are "hints" (`_critic.md` C1) | roster first from a dependency graph; every building has occupants; people lazy (B1–B6) | **FTG's guarantee, two-way**: a sequential, prefix-stable roster from our own tables → an eager allocation to districts and blocks → placement onto plots → a bounded reconcile; people derived lazily | MFCG's multiplier. Criterion: O7 (a)–(h) | TB |
| determinism | one MINSTD stream, retry continues the stream (A2) | `seed: null`, server-side (A4) | **O2**: 128-bit-keyed sub-streams per (stage, entity lineage, concern, reroll, attempt, epoch); integer geometry; permanent lineage-hash addresses with anchors (§6.3) | both models. Criterion: O2 (a)–(e) | — |
| rendering | ink print, casing idiom, per-ward cache, no zoom ("a big flaw") | lit web map, merged geometry, tiers | **one semantic display list with LOD and paint programs on one drawing path** (Canvas2D the reference backend of every preset); ink default, lit second, hatched for stage 2 | each renderer's coupling of geometry to its drawing path; a second render path for the lit look. Criterion: O12 (a)–(g) | — |
| editing | 8 warp kernels, per-ward reroll, no save | layout editor, regenerate area, bulk edit, "cannot be undone" | **FTG's graph editing on our plat + MFCG's warp kernels**, all as events on permanent addresses with locality, dry-run validation and undo | nothing of substance; neither persists. Criterion: O9 (a)–(f), the MFCG asks as measured scenarios (O9 f, O) | — |
| labels | curved labels on skeleton spines, halo, legend | arced serif labels, 2 m / 5 ft grid, scale bar, no compass | **MFCG's spines made hole-aware and collision-checked, quarter labels at city zoom + FTG's furniture** | none. Criterion: O13 (a)–(h) | — |
| failure policy | whole-city retry incl. wards and geometry (ST-8) | server "gives up"; no fallback in the splitter | **MFCG's tiers minus the restart tier**: typed results, bounded ladders, substitution, and a report that counts every requested feature by delivery tier | both. Criterion: tier-6 omissions of requested features 0 and p95 time on MFCG's worst configurations (O1 a, O3 b, O); hard invariant violations 0 / 1 000 (C) | — |

Where a genuinely new mechanism replaces both: the site model (O1), the plat kernel (O3), frontage-first plots and the
granularity law (O5/O18), the prosperity field (O18), the plot/site-plan model with heights (O17), the greenery rule
family (O19), the semantic display list with paint programs (O12), the document and edit log (O9), the keyed stream
design (O2), the layer model.

**The fused layout, stated as a shape and with its rejected alternatives** (§4.4 has the mechanism): grown arterials
with partitioned blocks *and* a partition seeded from a grown skeleton are the same thesis at two granularities — the
backbone's faces are partitioned by bent cuts, and the cuts are promoted to ways of the same graph; inside the walls
the partition does the street work MFCG's does, outside them growth does FTG's. Rejected in writing: (a) MFCG-first (a
Voronoi cell mesh as truth, growth only outside the walls) — streets without geometry, roads that point at nothing, no
incremental growth without re-meshing; (b) FTG-first end to end (queue growth down to lanes) — the "vaguely circular"
look-alikes the creator names and the loss of the T-junction signature R3 requires; (c) an Urban Places-style quad base
mesh — geometry inherits the mesh resolution, which the precision tiebreaker forbids, and its construction is
unrecovered; (d) bent cuts as queue proposals — the recursion is what yields the measured statistics. The MFCG creator's
own warning that road-first plus block subdivision "seems problematic" (devlog 31287) is the risk the fusion gate O4 (f)
guards — measured at M0 on a flat site and again at M1 on B-CITY-lite's river, coast and relief configurations with the
reordered stages (§16).

=== REPLACE §1.7 Tech stack (reasons; no dependence on any existing project) ===

### 1.7 Tech stack (reasons; no dependence on any existing project)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

| choice | decision | why | rejected |
|---|---|---|---|
| language | **TypeScript** (strict), ES2022 modules, no DOM in model packages | browser-first embeddable library (owner D-4); one language for kernel, pipeline, renderer and app; the reference evidence is JavaScript-shaped (call censuses), so budgets transfer | Rust → WASM core (two languages, slower iteration while constants are still tuned by eye and corpus); a WASM kernel — none: a measured hot loop may get a byte-identical WebAssembly accelerator behind the kernel façade (§3.7); Haxe (the references' tool, no advantage); C++/CGAL desktop (GPL, not browser-first) |
| runtime targets | browser: main-thread UI, **one generation worker** plus a **derivation pool** of up to three workers for the per-district stages (§4.1, §12.3) and a **tile worker** (§8.9), behind a handle-based API (§11.2); Node 24 LTS (CLI, tests, research-side baseline scripts, headless goldens; the CLI's PNG export uses `@napi-rs/canvas` as an optional dependency); an embed bundle (ESM or iframe) | the headless API reproduces the UI's model hash (O11 f); B-CITY runs without a browser | server-side generation (FTG's 3–7 s round trip is the thing to beat) |
| numeric core | integer centimetres in `Int32Array` arenas; exact `orient2d` in doubles under a derived range bound; `robust-predicates` for `incircle`; **booleans, buffers and bands built on the kernel's own arrangement — one engine on every host** (§3.7), with Clipper2 and `polygon-clipping` as CI oracles only; `dmath`, our own TypeScript port of the fdlibm 5.3 routines the model needs (§17) | integers remove float non-determinism and epsilon geometry (FTG's own lesson); one engine means one hash on every host (GEO-9) | doubles with epsilons (the references' whole failure class); exact rationals everywhere (10–100× slower); a runtime boolean fallback (a second engine with different hashes) |
| rendering backends | **Canvas2D — the reference backend of every preset including `lit`**, with a world-aligned tile pyramid (§8.8); **SVG** (layered, ids preserved); **PNG and print** by band-streamed tiles at any DPI; WebGL2 only as the pre-decided tile-compositor fallback (§8.9) | one drawing path keeps screen, PNG and print identical (O12 c) and avoids the duplicate render path both creators warned about; MFCG proves per-group caching keeps 46 000 fills at 590 uploads; NG proves per-primitive canvases do not | three.js as the primary (textures and lighting are one *style*); WebGPU-only (too new for the embed target); a WebGL2 reference backend for `lit` (a second drawing path) |
| text | Canvas2D glyphs from the bundled OFL fonts, composed onto the tiles in the tile worker (§8.8–§8.9); widths from the fonts' own metric tables, parsed by our code (§9.2); no SDF text | the same glyph positions on every output and in every engine | the host text engine for metrics (engines shape differently) |
| build and test | pnpm workspaces monorepo, `tsc` project references, `esbuild` for library bundles, Vite for the app, `vitest` + `fast-check` property tests, Playwright visual regression with `pixelmatch` / SSIM, axe-core for accessibility, a `bench/` package that runs B-CITY / B-EDIT / B-FUZZ / B-REF / B-ZOOM in the three CI tiers of §13.8 | conventional, permissive (axe-core is MPL-2.0 and dev-only), fast | — |
| data | rule tables, presets, style sheets and the rung profiles (`ladder.json`, §1.1) as versioned JSON with a schema (`zod`) and `{value, unit, provenance, calibratable}` per cell | everything editable; corpus calibration through §13.9 | — |
| persistence | a self-contained `.plat` document (JSON manifest + binary blocks); no hosted service — for multi-client use the host is the store (§11.3, §11.5) | O9; embedding needs no backend | a sync service of our own |
| repository | the product lives in its own repository, `plat/`, at the root of this folder, outside `research/`, `captures/` and `reference/`; a CI path rule fails any import, fixture or script path that resolves outside `plat/` (§17) | the clean room (D-29): the product can never read reference material by accident | the product inside the research tree |
| dependencies | permissive licences only, checked over the transitive production closure, pinned exactly and credited in a generated notices file (§17); every third-party routine behind our own adapter | clean room, swap-ability and an open licence choice for the owner (D-22) | — |

=== REPLACE §13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test ===

### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

Every kernel primitive is fuzzed with two input families, held to one bar — **0 crashes, 0 hangs (hard timeout), 0
invalid outputs** — at the sizes of §13.8's tiers.

1. **Random inputs** (`fast-check`): concave, holed, thin, near-collinear, snapped, duplicated-vertex, ≥ 300-vertex and
   zero-area polygons and chains.
2. **Constructive degeneracies (GEO-12).** Random sampling almost never lands on an exact degeneracy — a line across a
   2²⁴ frame holds at most 2²⁴ of its 2⁴⁸ lattice points, so a random third point is collinear with probability
   ≤ 2⁻²⁴ — so every degenerate class is built on purpose from random parameters:
   * lattice points exactly on a segment, placed by gcd stepping (`p₀ + k · d / gcd(dx, dy)`);
   * collinear triples and collinear overlapping edges (shared runs from 1 cm to the whole edge, same and opposite
     direction);
   * cuts through a vertex and cuts grazing a reflex vertex (through it, and offset by 0 and ± 1 lattice unit);
   * antennae (chains dangling into a face) and chains touching a boundary at one point;
   * coincident typed chains — a wall on a bank, a quay on a shore, a street on a district boundary, a track on a field
     boundary;
   * rectangles, squares and regular n-gons (n = 3 … 12) rotated by random angles and snapped to the lattice;
   * holes touching the outer ring at a vertex and along an edge, and holes touching each other;
   * simultaneous skeleton events (regular polygons, equal-sided rectangles, symmetric notches);
   * values exactly on quantisation boundaries (half-centimetre ties before snapping; ± (2²³ − 1)) and values `snap`
     must refuse (± 2²³, NaN, ± ∞);
   * the attraction, move and kept-content cases (GEO-3, GEO-5, GEO-35, VK-1–VK-18): a vertex at (20, 20) against the
     edge (0, 0)–(1 000, 0) (it moves onto (0, 0); no sub-`minEdge` edge); a chain crossing an edge next to a vertex
     standing 25.0–25.7 cm from it; a stretch whose join point lies within `attractCm` of an edge endpoint; a `warp`
     with `fromLevel = 1` over a street ending on a shore (the junction slides along the shore and the step commits); a
     `pinch` that would shorten an edge below `minEdge` and a step that would put two vertices on one lattice point (both
     halve); a 20 × 10 m rectangle with a 3 × 2 m notch on a long side (skeleton path; no roof line outside); star rings
     of radius 2²³ − 2 (`area2` exact); an L1 lane into a face holding S7 band parts (`E_KEPT`); an L2 corridor
     re-derivation beside kept plots with a plot-line end within `attractCm` (promotion; plots byte-identical); an S8
     T-junction on a spine with a width profile (every sampled half-width unchanged); a pool overlay writing outside its
     district (`E_SCOPE`); a logged `moveVertex` replayed after an upgrade that puts an unrelated vertex 20 cm from its
     position (bound to the signature-matching vertex or orphaned, never to the unrelated one); a slot freed and reused
     inside a stage (the query returns the new item).

**Properties** (checked after every operation): output simple; nesting by index (every face inside its parent); no
edge shorter than `minEdge` from any writer, after every insertion and every warp step, and clearance ≥ `minEdge`; Euler characteristic after every insertion;
`remove(insert(x)) ≡ id` on the topology; **`splitFace` children tile the parent exactly at the child level (integer
`area2` equality)**; `mergeFaces ∘ splitFace` restores the ring and the id; `corridorUnion` faces disjoint and covering;
`offset(−d) ∘ offset(+d)` ⊆ original and `insetFace` empties monotonically; **every straight-skeleton output passes the
§3.8 validator — a connected graph inside the face whose number of independent cycles equals the number of holes — or is
a reported downgrade**; OBB contains the hull and collinear input returns `E_DEGENERATE`; LIR inside the face; snap
rounding idempotent and terminating within its bound; the `orient2d` sign equal to a BigInt reference on adversarial
triples; Poisson minimum distance ≥ r; differential agreement with the CI oracles (Clipper2-WASM in Node,
`polygon-clipping`) on booleans and buffers, split by attraction (§3.7): unattracted cases with equal face counts and
symmetric difference ≤ perimeter × 1 cm, attracted cases valid and within perimeter × √2 · `attractCm`, ≥ 10⁵ unattracted
cases per operation; roles preserved on coincident chains (a sliver between a spine and a
shore keeps both); a declared batch's result identical under any permutation of its ops, and a callback-form stage's identical across two
runs, a slot renumbering and pool sizes 0–3 (§3.3); `clearFiner` after a refinement restores
the coarser level exactly; mandatory chains never rejected for precision; 0 stale references after every batch; save →
load → save byte-identical (§3.9); a 3 000 m relief fixture stores without a clamp and D8 is defined on 100 % of the hydrology grid's land
cells over frame and margin (§2.3); every routine returns a typed result on the pathological corpus.

**Ladder coverage (G-R9):** every rung of every ladder in §5.2 is reachable by a fixture, and each downgrade (medial
axis, the plain-roof downgrade, straight cut, substitution) is exercised; no roof line lies outside its footprint; a
skeleton failure is never a crash and never a visual surprise.

=== REPLACE §13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===

### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

* **Invariants.** The §5.3 suite runs by scope — batch-local invariants per batch, stage-end invariants per stage,
  save / load invariants per document, CI-only invariants in the harness — on B-CITY (1 000 seeds × 4 water settings × 3
  rungs in the nightly tier; 50 seeds per rung in the PR tier, §13.8). Each invariant has an id, a severity, a count in
  the report and a CI threshold: hard = 0 per 1 000 cities; soft within its band. The **digest-maintenance oracle**
  checks on every B-CITY-lite city that the Merkle digest maintained batch by batch equals a full recompute (§6.2).
* **The statistics record, split (SCL-21).** The **core record** is O(n) and is emitted by every generation within
  4 ms at CITY (§12.4): counts per entity kind and class; areas per class and band; fixed-bin histograms per district and
  band of plot area, frontage, depth, footprint area and storeys; way length per class; the junction-degree histogram;
  turning per 100 m on ways resampled at 10 m; the walled share and built extent; ladder uses per cause and rung; every
  requested feature's delivery tier (§5.1 principle 7); stage timings. The **bench metrics** — detour index over sampled
  destination pairs, Moran's I, KS distances, junction-to-junction runs, orientation coherence and wall alignment,
  figure-ground metrics on renders (§8.5), tree nearest-neighbour and pair-correlation statistics computed from §8.10's
  stamped scatter — run through `stats(doc, { level: 'bench' })` on demand or in the bench, never on the one-click path.
* **Cost-model tests (SCL-19; NF-S10).** Each stage is timed on **nine sizes — three per rung: the band's bottom, its
  target and its top** — 1 500, 5 000 and 9 900 (TOWN); 10 000, 20 000 and 29 900 (CITY); 30 000, 50 000 and 120 000
  (METROPOLIS) inhabitants, five seeds each (nightly; the METROPOLIS sizes from M2b, when METROPOLIS generation exists,
  §16). Its log-log slope of time against its declared work measure (the `Stage`'s work-limit laws, §5.1 (5), §14) must
  not exceed **1.15** for a stage declared linear and **1.25** for one declared n log n; §12.3's per-rung cost laws are
  fitted on the same runs. **Work limits follow population:** each run reports, per stage, the F-WORK hit rate (work
  cuts per 1 000 batches), and CI fails when the rate at the top of a band exceeds the rate at its bottom by more than
  1 per 1 000 — §5.1 (5)'s pre-decided coefficient fallback then applies and the sweep re-runs. **Per-edit cost against
  model size:** a fixed scope — one plot edit, one block reroll, one district regeneration — costs the same at TOWN, CITY
  and METROPOLIS within ± 20 % (§12.6), and so does per-edit validation (§5.3); both are measured TOWN → CITY from M2a
  and TOWN → METROPOLIS from M2b (§16). **Index work** is fitted against commits × level size (§3.3). A **memory test** per
  rung uses §12.8's definition; a **document-size test** per rung holds ≤ 320 B per building at CITY (§2.9); the
  simulation module's occupancy (one hour for 50 000 people ≤ 50 ms in the worker, §10.3, §12.7) has its own cost-model
  test in the module's milestone (M4b). **First map by size (N-2):** B-CITY's browser runs time the first map at the
  same three sizes per rung — TOWN 1 500 / 5 000 / 9 900, CITY 10 000 / 20 000 / 29 900, METROPOLIS 30 000 / 50 000 /
  120 000 people — and fit §12.5's first-map laws (M1 for TOWN and CITY, M2b for METROPOLIS; nightly thereafter). All
  timings are normalised by §12.1's calibration score.
* **Stage contract tests.** The same inputs and stream give the same digest on Node x86 / arm64, Chromium, Firefox and
  WebKit, with workers on and off and pool sizes 0–3 (G-P10); §6.5's determinism tests run beside them (time dilation
  × 10 and × 0.1, the derived-complete digest over three district orders — S12b and the hinterland unit included, replay = session, truncation identity, the
  host-provider double run, links and documents without their packs or host). S8's working block equals S9's committed
  block (Hausdorff 0; §3.7). The per-stop placement digests of §13.3 are the contract test of S13b.
* **Stage property tests.** 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections and 0
  untyped loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback;
  attached and party-wall shares on curved-street blocks inside the dense band; roster `manifest(P₂) ⊇ manifest(P₁)`
  for P₂ > P₁ on 1 000 seeds; the stage-3 contract (the union of composed wings equals the outline, §2.6); the `ringed`
  fixture (≥ 3 closed rings, radius CV ≤ 10 %); a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 %,
  walled share in band); the derived-complete digest identical across district orders; opening a person leaves the
  digest, the log and the undo stack unchanged; **0 `E_KEPT` on the one-click path** over B-CITY (a stage whose domain
  overlaps an earlier stage's kept content is a pipeline bug; VK-1); every gate and weld vertex on its trace, and stage
  1's trace within 40 m of its boundary (NF-P1); 0 lanes crossing a wall strip and 0 L3 band faces split or cleared
  (NF-P5); the seam exception on New random of 20 districts per B-CITY-lite city (NF-P6); the union rule (composed
  wings = outline) on curved-street row fixtures with `quad` wings (NF-P2); decks on 100 % of way–water crossings,
  moats and canals included (NF-P4).
* **B-EDIT and the locality oracle.** §7.3 item 7 (i)–(iii) and (v), and (iv)'s byte identity of Regenerate (keep
  settings), run **once per sequence** — at its end and at one seeded random position — never per edit (SCL-18).
  Fixtures: the re-parenting set (`drawBoundary`, district merge and split, `outskirtToDistrict`, regenerate around a
  lock, the id-recycling case); terrain-brush sequences in both water modes, and river-control-point, drawn-water and
  drawn-bridge sequences with §7.3 (7)(v)'s assertions (0 decks over land, 0 off-deck crossings, 0 wings off §2.6's
  datum rule, 0 footprints in water); table weight edits and row insertions; drawn features mixed with later attribute
  edits; epochs and rebases; undo and redo from several sessions, with the truncation-identity property (§7.4,
  §6.5 (9)); New random on minimal scopes (§5.1 (6)); the naming-collision replay fixture (§7.3 (7)(i)); the B-EDIT-lite
  identity fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation, §6.3); and **the thirteen MFCG asks of §7.4 as
  scripted scenarios (IMP-16)**, each reporting its locality share (entities outside the effective scope
  byte-identical), its invariant results and its re-run cost against §12.6.
* **The faithfulness campaign (O9 c; §7.3 item 7 (iv); IMP-7).** New random is judged by a campaign, not per sequence.
  Each nightly run draws **n = 400 regenerated scopes** from its B-EDIT New-random events — 200 block scopes and 200
  district scopes, by a seeded draw — and for each generates **K = 50 from-scratch references** of the same scope: the
  same upstream state and context, rerolls 32 768 + i for i = 0 … 49, a range no user reroll reaches, so no reference can
  coincide with the tested regeneration. For each of the four statistics (median plot area, median frontage width,
  density, attached share) the rank r of the regenerated value among the K references counts the references below it
  plus a uniform draw from 0 … t over the t references equal to it (the draw comes from the campaign's own stream), so r
  is exactly uniform on 0 … K for a perfect regenerator, whatever K and however discrete the statistic. The ranks are
  binned into 10 bins of ⌊r · 10 / (K + 1)⌋ with expected counts proportional to the number of rank values each bin
  holds; a χ² test per statistic gives four p-values, and the campaign **fails when Holm's procedure rejects at
  family-wise 0.01** (the smallest p-value below 0.0025). Cost ≈ 20 400 scope generations, ≈ 6 CPU-min at §12.6's
  block and district costs. Executed (`docs/validation/bench/fixall_verify_scope_o9c_rank.out`,
  `fixall_scope_r2_o9c_power.out`): 0.9–1.1 % false campaign failures for a perfect regenerator on continuous and on
  heavily tied statistics; 99.5 % failure for a regenerator 0.8 × too snug, 100 % at 1.5 × too loose, 99.5 % with a
  +0.25 standard-deviation bias and 100 % for FTG's 0.6 × snugness; without the randomised tie-break, a perfect
  regenerator fails every campaign on a tied statistic. A failing statistic's histogram names the fault: a hump is too
  snug, a U too loose, a slope a bias. **A failed campaign is re-run once with the next campaign seed** (a perfect
  regenerator fails two in a row with probability ≈ 10⁻⁴); a second failure is a regeneration defect — entered in
  `known-defects.json`, and M3a does not exit until it is fixed (§16), because no threshold can be relaxed without
  passing a wrong regenerator.
* **Control sweeps.** §7.8's statistical monotonicity and continuity: 21 steps × 50 seeds at TOWN and CITY (nightly);
  METROPOLIS in the milestone tier. The population control's sweep also reports the F-WORK hit rate per stage, which
  must stay flat across each band as above.
* **Option-interaction matrix.** Every pair of toggles rendered and diffed; no option silently disables another (O12 c).
* **Documentation coverage (COV-FTG-A25).** 100 % of controls and entity kinds have a guide anchor (§14 `@plat/docs`);
  every in-app help link resolves (CI link check); the release notes list every open entry of `known-defects.json`.

=== REPLACE §13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1 ===

### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

A golden suite of 12 seeds × {TOWN, CITY, METROPOLIS} × {none, coast, river, coast + river} stores, per stage, its
**stage-isolated digest** (the stage's new code run on the previous output version's frozen upstream outputs, §6.4), its
entity counts, the core statistics record and one PNG per LOD and preset; and, per shipped preset's label style, a
**per-stop placement digest** (below). A release either matches or declares:

* a **shift record** for every stage whose isolated digest moved — the stage, the cause (a rule-table change, a fix, a
  new concern), the seeds and statistics that moved, the expected direction, and the output version the release creates;
* a **cascade record** for every end-to-end golden it re-signs, listing each downstream stage that moved and showing,
  from the isolated goldens, that each moved only through its inputs; a downstream stage whose isolated digest also
  moved needs its own shift record, so an unrelated regression cannot ride on an upstream shift.

An undeclared move fails CI; a declared statistic that moves against its declared direction fails CI until the record
states why; only declared stages are re-signed; stages untouched by a release stay byte-identical (O2 e). A same-seed
output change is never let ride silently (owner non-negotiable 10).

**The records are product files (NF-S1).** Everything the golden gate and the release-notes generator read lives inside
`plat/`, so §17.1 (3)'s path rule and the gate never collide:

```ts
// @plat/testkit — the golden store and its records; JSON with a schema, committed in plat/goldens/
interface ShiftRecord {
  id: string; release: string /* generator version */; outputVersion: string | null /* the o<k> it creates; null for a view shift (S13b) */;
  stage: StageId | 'S13b';
  cause: { kind: 'table'|'fix'|'concern'|'engine'|'feature'|'calibration'|'baselineShift'; ref: string /* table id@version, issue, concern id, CalibrationRun id, baseline id */; note: string };
  seeds: { seed: string; rung: Rung; water: 'none'|'coast'|'river'|'coast+river'; before: Hash128; after: Hash128 /* isolated stage digest, or the placement digest for S13b */ }[];
  statistics: { metric: string /* core-record field or §13.5 metric id */; rung: Rung; before: number; after: number; expected: 'up'|'down'|'none'|'any' }[];
  d5SeedsChanged: string[] /* seeds of any D-5 panel (§13.6) whose render moved */; milestone: string; date: string; author: string }
interface CascadeRecord {
  id: string; outputVersion: string; upstream: string[] /* ShiftRecord ids that explain it */;
  downstream: { stage: StageId; before: Hash128; after: Hash128 /* end-to-end digests */; isolatedUnchanged: true /* otherwise the stage needs its own ShiftRecord */ }[];
  seeds: string[]; date: string }
interface MilestoneRecord {
  milestone: string; date: string; outputVersions: string[] /* created during the milestone */; shifts: string[]; cascades: string[];
  d5: { status: D5Status; record: string /* plat/goldens/d5/<milestone>/record.json, §13.6 */ } | null;
  knownDefects: { opened: string[]; closed: string[] }; exitCriteria: { id: string; result: 'pass'|'fail'|'fallback-applied'; evidence: string }[] }
```

* `plat/goldens/store/o<k>/` holds, per seed and stage, the frozen upstream outputs and the digests, counts, statistics
  and placement digests; PNGs are stored content-addressed in `plat/goldens/png/` (large-file storage) and referenced by
  hash.
* `plat/goldens/shifts/o<k>.json` holds the shift and cascade records that created output version o<k>;
  `plat/goldens/shifts/view/<release>.json` holds a release's S13b view shifts.
* `plat/goldens/milestones/<milestone>.json` is each milestone's exit record.
* The golden CLI refuses a record with a missing field; the release-notes generator of `@plat/docs` reads only these
  files and `plat/docs/known-defects.json`.
* `docs/validation/shifts/<milestone>.md` and `docs/validation/d5/<milestone>.md` are **research-side copies** generated
  from these files by `research/baselines/mirror_records.py` (research may read the product; the product never reads
  research); no CI job reads them, and a hand edit there changes nothing.

**Placement digests (N-24; §9.1's cross-engine promise).** For every golden town, every shipped preset's label style and
each of B-ZOOM's 27 zoom stops, S13b places the band's area and way labels for all candidates and the addresses and
repeated street names of the default view's visible tiles (§9.2's scope); the placement digest hashes, per candidate in
id order, the label id, the chosen alternate (or *yielded*), the ladder rung, the size and every glyph's position and
angle as exact IEEE doubles — placement uses only + − × ÷, `Math.sqrt` and `dmath` on the fonts' integer metrics and
the stop's scale, and `@plat/labels` is held to §6.5's allowlist lint like a model package, so equal code gives equal
bits on every engine. The PR tier compares the digests on Node x86 against the store; the nightly tier
compares them on all five engines with workers on and off. A digest that moves while every model digest holds is a
**view shift**: it needs a `ShiftRecord` with stage `S13b` and `outputVersion: null`, bumps no output version
(placement is view data, §9.1) and bumps the style version of every shipped sheet whose placements moved, because the
style version is the axis that carries pixel identity (§6.4). A digest that differs between engines is a determinism
defect and fails the nightly run.

**From M1 (LC-19).** The output-version stamp, the shift, cascade and milestone records and the stage-isolated golden
tooling are built at M1, not at hardening (§16). Every milestone from M1 on writes its `MilestoneRecord` — each output
version created, its shift records, the D-5 panel seeds that changed — and a milestone cannot exit with an undeclared
shift. **Preview links:** until M4's exit fixes output version 1, every permalink and document made by the app is marked
*preview* — the app shows "preview: made with output version oN; a later release may draw this seed differently and
will say so" — and the link carries its `o=` (§6.4). Retention of output versions N−1 and N−2 (§6.4) is built and its
replay test passes at M3a; from then on a link inside the window replays exactly and one outside it opens with §6.4's
notice.

A nightly cross-platform golden run (Node x86 / arm64, Chromium, Firefox, WebKit; workers on and off; pool sizes 0 and
3) is the reproducibility proof: identical model digests per stage, identical derived-complete digests and identical
placement digests on every engine.

=== REPLACE §13.4 Visual regression, B-ZOOM and the app harness ===

### 13.4 Visual regression, B-ZOOM and the app harness

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

* **Visual regression.** Playwright renders the golden suite per preset, LOD and backend; SSIM / `pixelmatch` against
  the stored PNG with a per-preset threshold; the draw-style census of §8.3 per preset; a "no fills" and a "no outlines"
  render must remain legible (R13).
* **B-ZOOM** (1:50 000 → 1:500, the default view of every rung): legibility floors and no feature popping more than once
  (footprint hash identical across bands); §8.3's checks — hairline fidelity, decoration stability, role continuity
  across band switches, no tree mark over a tier-1/2 casing, no casing pixels in junction mouths, the contrast matrix on
  the rendered city band; §9.4's label checks — floors, at least min(12, the number of districts) area labels on the map,
  0 collisions at settled views and through a scripted zoom sweep, and every placed glyph's text / halo pair at the
  label floor (§9.4); the draw-order census (the logged (slot, pass) sequence non-decreasing, §8.3); decoration
  stability for stamped, `grid` and `line` classes; the reload and two-derivation-order pixel identity of render-time
  keys (§8.3); §8.5's figure-ground metrics — street-edge recoverability against MFCG's value on its matched plain sweep
  renders (measured at M-1, §13.5), access-critical ways drawn ≥ 95 %.
* **Role continuity by family and milestone (VIS-9; N-23).** §8.2's rule — every shipped family defines all four bands
  and the mean roof and mean ground colours move by ΔE2000 < 2 across every band switch — is checked for a family from
  the milestone that ships its four bands: `ink` and `lit` from M2b (M1 ships `ink`'s city and district bands only, and
  B-ZOOM checks that one switch from M1), `hatched` from M5, the ink-family variants from M3b (§16).
* **The app harness** (Playwright, the reference machine of §12.1):
  * **Scripted tasks (O16 c; IMP-11)** — share a view link, export a layered SVG, change the coast side, see five
    variants of one kind, recover from a mistaken regenerate, measure a street with the ruler, find a named building
    through the gazetteer: each passes when it completes in the stated number of UI actions (one action where a
    reference needs a detour; recovery = one undo) with every app response ≤ 1 s, run on every PR.
  * **Accessibility (COV-FTG-A24)** — axe-core on every screen and panel of `@plat/app` reports 0 serious or critical
    violations; every control is reachable and operable by keyboard alone in a scripted run with visible focus; every
    scripted task above also passes keyboard-only; the gazetteer list and search and the "features in view" list reach
    every building, plot, district and pinned person without the canvas.
  * **Input scheme** — every binding of the default `keymap.json` (§14) fires its action while the map has focus and
    none fires while a text field has focus; a user-edited keymap round-trips through save and load.

=== REPLACE §13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file ===

### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

The `parity` CLI in `@plat/testkit` reads **only** `baselines.json` — our own measurements of the references, numbers
only, generated research-side by scripts under `research/baselines/` from the captures and committed into
`plat/packages/testkit/baselines/` (§17, D-29) — and our B-CITY outputs, and reports every metric against its band. It
never opens `captures/`, `research/` or `reference/`.

```ts
interface Baseline {
  id: string; metric: string; unit: string;
  reference: 'MFCG' | 'FTG' | 'NG' | 'VG' | `corpus:${string}`;       // corpus rows arrive through §13.9
  referenceBuild: string;            // itch build, FTG server date + create-request hash, NG / VG build — required (COV-VG-VN-010)
  capture: string; script: string; date: string;                       // provenance: capture folder, research-side script, run date
  matched?: { rung: Rung; mfcgSize?: number; ftgSize?: 'BIG_TOWN' | 'BIG_CITY' | 'CITY' | 'METROPOLIS'; population?: number };
  role: 'target' | 'weakness' | 'descriptive';                        // what the reference number means for us (FTG-15)
  values: { p10?: number; p50?: number; p90?: number; n: number; seeds: number } | { bins: number[]; histogram: number[]; n: number; seeds: number };
}
interface ParityReport {                 // written by the parity CLI per run (NF-S1); read by milestone exits, §13.9's CalibrationRun and the release notes
  runId: string; date: string; outputVersion: string; generatorVersion: string; baselines: Hash128 /* hash of the baselines.json it read */;
  rows: { metric: string; baselineIds: string[]; role: Baseline['role']; rung: Rung; preset?: string;
    band: { lo?: number; hi?: number; ksMax?: number; direction?: 'above'|'below'; margin?: number };
    ours: { p10?: number; p50?: number; p90?: number; ks?: number; n: number; seeds: number };
    verdict: 'pass'|'fail'|'reported' /* descriptive rows are always 'reported' */; note?: string }[];
  summary: { pass: number; fail: number; reported: number } }
```

Each milestone's parity report is stored as `plat/goldens/parity/<milestone>.json` and named in its `MilestoneRecord`
(§13.3).

The CLI refuses a row without `referenceBuild`, `capture`, `script` or `date`. A new reference build never overwrites a
row: it adds a row (the id gains the build) and is a **declared baseline shift** in the milestone's shift record, so a
silently drifting reference build (VG changed geometry for the same seed between builds 19251041 and 19365073) can
never move a gate unnoticed. Rows hold numbers, units and provenance only — no names, colours, grammars or code.

**The band rule (DEF-1; IMP-6).** Every row below has its band rule and its provenance now; a reference number marked
**⟨M-1⟩** is measured by M-1 (§16), which lists every such measurement. **The ⟨M-1⟩ rule (NF-S5):** if M-1 cannot
measure an ⟨M-1⟩ number — the capture lacks the feature, or the measurement is not reproducible across seeds — that
reference cell becomes *descriptive*, gates nothing, and enters `known-defects.json` with the reason; the parity CLI
reports an ⟨M-1⟩ cell without its baseline row as *fail*, never as *pass*. *Target* rows pass when ours lies
in [p10 × 0.9, p90 × 1.1] of the reference's seed spread (a single-value baseline: ± 15 %), and distributions when our
KS distance to the reference is ≤ 1.25 × the reference's own seed-to-seed KS distance at p90. *Weakness* rows are
one-sided: ours must beat the reference in the declared direction by the stated margin. *Descriptive* rows are reported
beside ours and gate nothing. The bands below are this rule applied to today's baselines; when M-1 re-measures a
baseline (five seeds per matched MFCG size, FTG's new captures), the band is recomputed by the same rule with provenance
"M-1 ⟨date⟩", and a recomputation that turns a passing gate into a failing one is declared in the shift record.
Thresholds no reference can set are §13.7's.

**Matched sizes (MN-2; §12.2, §13.6).** TOWN ↔ MFCG size 40 and FTG BIG_TOWN; CITY ↔ MFCG size 80 and FTG BIG_CITY;
METROPOLIS ↔ MFCG size 130 (FTG per D-31). MFCG numbers come from its plain-option size sweep (walls, citadel, plaza and
temple on; shanty town, parks, river and coast off; its JSON export is in metres, the internal unit 4.00 m). **Curves
(FTG-15)** are measured after both sides are resampled at a 10 m arc-length step, so neither FTG's 25–40 m placement
steps nor PLAT's smoothed vertex spacing enters a number.

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| street turning | turning per 100 m; heading change per 50 m (10 m resampling) | FTG: zero mass above 15° per step and a flat heading spectrum (`_critic-ftg.md` §4 rows 7–9) — **weakness**; FTG's median turning per 100 m after 10 m resampling, on its payloads ⟨M-1⟩ — **target for organic presets** (NF-S3), with this row's own band | weakness clauses: no cliff (no empty bin above 15° while the bin below it holds > 1 %) and heading entropy ≥ FTG's; target clause: organic presets' median turning per 100 m within 0.5–1.5 × FTG's — a declared exception to the band rule, because FTG's per-seed spread over at most eight payloads is too narrow to stand for its generator's variation. *Fallback:* `headingSigma` (a table value, §4.4) is set so the organic median equals FTG's and the growth-drift row re-runs; if drift then fails, `headingSigma` returns to its default, the target clause is entered in `known-defects.json` as not met, and the row gates on its weakness clauses | P |
| growth drift | net turn of grown streets over 600 m (organic regimes) | — (our heading model, §4.4) | p50 15–30°; > 90° on ≤ 1 % | C |
| junction arm angles and degrees | every L1 junction | NG 361 / 361 T — **target** for organic presets; FTG median 90.02°, 58 % in 80–100°, 36.4 % 4-way in its Medieval city — **weakness** for organic presets, **target** for `ringed` and `american` | median 85–95°; p5 ≥ 30°; 4-way share organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % (FTG-6) | P |
| street runs by class | junction-to-junction run lengths per class (never edge lengths) | FTG main L + 0.5, district (L + 0.5) / 2, suburb 30.00 m, lot outlines 14.70 m (roadlength100 README) — **target** for the extramural ribbon and suburb regimes, descriptive inside the walls | class medians by the band rule (extramural, suburb) | P |
| MFCG street signature (MFP-2) | lot-orientation coherence R4 within 60 / 120 / 250 m; lot alignment with the wall by distance band; T / Y share; intramural dead ends; blocks per ha; lots per block | MFCG R4 0.84–0.97 / 0.58–0.88 / 0.32–0.68; within 40 m of the wall median deviation 3.5–4.5° and 84–92 % within 15°, 56–70 % at 40–100 m, 38–58 % at 100–200 m (redteam-mfcg MFP-2, from the exports); T / Y share, intramural dead ends, blocks per ha and lots per block from the sweep ⟨M-1⟩ — **target** inside the walls | the band rule, walled districts | P |
| blocks | L2 built-block areas per district | NG block counts per template at `medium` (vertex captures) ⟨M-1⟩ — **target** on the same face shapes; FTG block-lot median 441 m² in every class — **weakness** (no gradient) | KS by the band rule; inside the NG band on the same face shapes (O4 f) | P |
| deep block interiors (IMP-8) | court share of deep blocks per band | NG hollow-block frequency (vertex captures) ⟨M-1⟩; MFCG inner-lot removal (sweep) ⟨M-1⟩ — **target** | the band rule per class (§4.6) | P |
| bent-cut signature | infill and lot cuts | NG: start at N(0.5, σ) of the OBB major axis with σ 0.066 (plain faces) and 0.098 (ring faces); one bend at mid-course in 380 / 519; ≥ 85° arrival in 96 %; 53 % filleted (BG-1 / BG-2 / PF-3; manager note 3) — **target** | σ within ± 0.02; corner within 0.10 of mid-course ≥ 80 %; arrivals ≥ 85° ≥ 95 % | P |
| figure-ground and streetwall (MFP-1; plot texture, IMP-4) | city-band street-edge recoverability; gross footprint cover inside the walls; streetwall continuity on dense frontages | MFCG recoverability on its matched plain sweep renders ⟨M-1⟩ — **target**; MFCG gross cover inside the walls 0.60–0.64 at sizes 40–130 — **descriptive, direction declared**: ours lower because yards exist; MFCG streetwall continuity on the same frontage classes ⟨M-1⟩ — **target** | recoverability ≥ MFCG − 0.03; cover reported (expected below 0.60); streetwall ≥ MFCG's on dense frontages | O |
| plots and footprints | L3 plot areas; L4 footprint areas and sides | FTG footprint median 103 m², p95 154 m², quad side 10.3 m, worst-corner p95 22.9° — **target** for ordinary houses; MFCG footprints (median 225–289 m² at sizes 40–250 in metres) are **lots drawn as buildings — descriptive, never a house-size anchor** (MFP-8) | ordinary houses median 60–160 m², p95 < 400 m²; a sheared minority kept | P |
| entrance rule | L4 | FTG: on the outline, 2.99 m from the road; 53 % of buildings with a vertex ≤ 2 m from a road — **target** | 100 % on the access edge, 2–4 m | P |
| party walls and attachment | row classes | NG 39–43 % of perimeter, 95–99 % attached — **target** for dense / poor; FTG residences 0–5 %, industry 96–98 % — descriptive | attached ≥ 90 % in dense / poor; party-wall share by the band rule per class | P |
| plot-area gradient | Spearman(prosperity, plot area); Moran's I; within-district plot-area CV | FTG 441 m² in every class; NG Moran's I −0.04 … +0.03 — **weakness** | ≥ 0.8 and > 0 (both follow from the rules: C); within-district CV ≥ 0.25 (§13.7: O) | C / O |
| alleys | alley length per ha by prosperity | FTG 0 alley length at every decile — **weakness** | Spearman ≤ −0.7 | C |
| vacancy runs (COV-VG-VN-170) | share of frontage length in vacancy runs, per band | — (our rule; VG's partly ringed blocks are the motive) | within ± 0.02 of the granularity table's share per band | C |
| quays and substitution | quays reachable from the network; blocks left as substitution residue (F-CUT tier 5) | — | quays reachable 100 %; substitution residue ≤ 5 % of blocks | C |
| walled share and ribbons (MFP-6) | buildings inside the outermost wall; extramural buildings within 100 m of an arterial | MFCG 0.87–0.92 at sizes 40–250; 71–85 % (sweep) — **target** | the band rule | P |
| MFCG anchors (MFP-8) | district areas; wall vertex spacing; castle area and compactness; plaza area; city-zoom quarter labels | MFCG district areas 2.4–17.6 ha at size 40 and median 29 ha at size 80; wall vertex spacing p50 88 m at size 40; castle 0.5–3.2 ha (8.7 at size 130); plaza 0.32–0.58 ha; 9 / 12 / 18 districts at sizes 40 / 80 / 130 (sweep) — **target** | the band rule; castle in band on ≥ 99 % of seeds | P |
| outline anisotropy (FTG-5) | land-sector r90 CV; road / non-road r90 ratio | FTG 0.20–0.33 and 1.26–1.65 (both CITY payloads) — **target** for organic presets | the band rule; monotone in the anisotropy row | P |
| block-level use mix (MFP-7) | residential-only block share; per-block use-mix entropy; trade households at their workplace | MFCG's "venue mix with residents, no residential wards" — descriptive | §13.7's bands | O |
| towers and gates | S7 | FTG 39 m median spacing, 17 / 17 towers on ring vertices — **target**; FTG 6 and 2 ungated crossings — **weakness**; MFCG 5 / 8 / 12 gates at sizes 40 / 80 / 130, `gates = N` exact — **target** | spacing by the band rule; ungated crossings 0; N exact; roads leaving each walled stage = N | P |
| water | L0 | FTG 50 m resampling, rivers ≈ 31 m mean at CITY — **target**; MFCG `riverWidth` in metres (142 m at size 200 with river and coast) — descriptive | outline step ≤ 25 m; width band by class | P |
| tree scatter | §8.10's stamped instances, in the bench | FTG nearest-neighbour median 9.7 m, minimum 0.14 m (not Poisson) — **weakness**; MFCG / NG Bridson k = 50 with a 140-point tile — **target** for the sampler | NN p1 ≥ §13.7's canopy threshold; pair-correlation per class reported | O |
| population and buildings | totals | MFCG ≈ 6.12 persons per building (a multiplier) — **weakness**; FTG 3.4 — descriptive | requested population within ± 5 % on ≥ 95 % of seeds; the ratio reported | C |
| generation time (MN-2, MFP-5) | model p95 and time to first map per rung (§12) | MFCG app timings 57 / 131 / 156 ms at sizes 40 / 80 / 130 — descriptive with §12.9's declared trade; FTG CITY: server 2.9–3.2 s, scene 6.4–7.0 s after the click, load 2.0 s busy — **weakness**; NG hood 10–96 ms — **target** for opening a district | §12.3 / §12.5 budgets; model ≤ 2.5 × MFCG at TOWN and CITY and ≤ 5.5 × at METROPOLIS; first map ≥ 10 × sooner than FTG at FTG's timed CITY preset (9 500 people, 2 798 buildings: PLAT's TOWN law ≈ 0.24 s against 6.4–7.0 s), and at BIG_TOWN and BIG_CITY from M-1's captures | P |
| MFCG-worst configurations (IMP-5) | wall-clock p95 per delivered town, ladder costs included: METROPOLIS with river, coast, walls and castle | MFCG size 80 with river and coast: 10 attempts for 3 cities, 3.7–4.0 s (IMPROVEMENTS O1); 24 restarts in 58 attempts — **weakness** | ≤ 1.0 s per delivered town | O |
| requested-feature delivery (IMP-5) | the report's delivery tier per requested feature | MFCG: a requested river fails 7 of 10 attempts at size 80; VG: 4 of 13 highway maps discarded — **weakness** | tier-6 omissions of requested features 0; degraded (tiers 4–5) ≤ 5 % (§13.7) | O |
| ladder use | the report | — | tier ≥ 2 on ≤ 2 % of transactions per stage; p99 ≤ 3 attempts | C |
| draw style (IMP-15, VIS-16) | the display list and renders against the draw records | MFCG: casing = core + 2h on 7 / 7 maps, round joins 4 062 / 4 063, 17-step order; wall, tower and road-core widths 6.2 / 12.4 / 6.5 px at size 40's scale — **target** (`ink`); NG square caps, ≈ 17.4 hatch triangles and 2.33 shadow quads per wing — **target** (`hatched`); NG roof dark / light ratios 0.787 / 0.802 / 0.834 and VG water bands 5.196 : 2.828 : 1 — **descriptive** (they are their palettes' values; the laws are tested on ours, §8.3) | `ink`: casing law on 100 % of ribbons, round joins ≥ 99.9 %, order parity as §8.3 defines it, widths ± 15 %, outline share ≤ 25 %; `hatched`: 15–20 triangles per wing, no ridge stroke, outline = footprint; the roof law on our palette within ± 0.02 and our bands W · (i / N)^1.5 within 1e-4 | P |
| labels | protected overlaps; inside-area share; curvature; holes; count | MFCG: gates and the keep covered, walls straddled — **weakness**; MFCG district counts (the anchors row) — **target** | 0 / ≥ 99 % / within §13.7's curvature limit / 0 labels crossing holes / the anchors row | O |
| between-seed variety (IMP-12) | dispersion of the §7.7 signature vector (radial share of arterials, orthogonality index, street-density profile, block-area CV, enclosed share, outline anisotropy) over 100 seeds per rung and water setting: mean pairwise distance of vectors standardised by the rung's pooled deviations | MFCG over its plain sweep seeds at the matched size ⟨M-1⟩; FTG over every payload at the matched size ⟨M-1⟩ — **target as a floor** | ours ≥ the larger reference dispersion at the matched rung | O |

=== REPLACE §13.6 The owner's side-by-side protocol (D-5) ===

### 13.6 The owner's side-by-side protocol (D-5)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

"Mastered" means the owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, plus the measured
parity numbers (D-5). This protocol makes the eye a recorded, repeatable judgement that cannot be steered by choosing
flattering seeds, and it never lets a milestone claim the eye's verdict without the eye.

1. **When.** At M1 (diagnostic: the base is not yet complete, so the result is recorded and does not gate), at M2b (gates
   "the base at parity"), at M4 (gates "mastered") and at M5 against NG (gates stage 2, and replaces S2's blind preference
   test with n ≥ 20 raters, which the program has no pool for; IMP-11).
2. **Seeds fixed before rendering.** Five seeds per rung and per water setting (none; river + coast), each
   `H32("d5/⟨milestone⟩/⟨rung⟩/⟨water⟩/⟨i⟩")`, where **`H32(s)`** is lane 0 of §6.1's seed-key derivation applied to the
   UTF-8 bytes of `s` — a u32, so every list is reproducible from its formula. The product CLI (`plat d5 seeds
   ⟨milestone⟩`) writes the list to `plat/goldens/d5/⟨milestone⟩/seeds.json`, which is committed before any render; no
   seed is replaced after it is rendered. MFCG seeds come from the same formula with the prefix `d5-mfcg/`, reduced into
   MFCG's accepted seed range by the research-side panel script (the reduction is recorded). FTG cannot be seeded — its
   server draws its own seed — so its side of each pair is taken from the captures in capture order, and the milestone's
   list of capture ids is committed with the seeds, before any PLAT render.
3. **Matched pairs.** Each pair shows PLAT and one reference at the same rung, the same ground scale (metres per pixel)
   and the same frame. Against MFCG, PLAT's population is set so that its building count matches MFCG's at the matched size
   (sizes 40 / 80 / 130; §12.2's rate); against FTG, PLAT is generated at FTG's population (BIG_TOWN ≈ 5 600, BIG_CITY
   24 500; METROPOLIS per D-31). PLAT draws `ink` against MFCG's default style and, from M2b, `lit` against FTG's default
   (`ink` at M1). Against FTG, one pair per seed shows the extramural suburb at FTG's overview framing (VIS-3).
4. **Blind order.** Generator-identifying furniture is removed from both sides (titles, legends, compasses, interface
   chrome) and the blind pairs are rendered without labels; labels are judged in a separate, non-blind pass. Left or right
   is a seeded coin per pair and the pair order is shuffled; the key is sealed — only its hash is committed — and opened
   after the answers.
5. **The rubric** — three questions per pair, each answered *left*, *right* or *same*, with an optional one-line note:
   (1) *Legibility:* which lets you read the town — its streets, walls and quarters — more easily at this size?
   (2) *Realism:* which looks more like a real medieval town? (3) *Charm:* which would you rather use for a game or a
   story?
6. **Pass rule.** For each reference and each question, PLAT is judged better or the same on at least two thirds of the
   milestone's pairs, and on no rung is PLAT judged worse on every pair. A gating milestone whose rated run fails a
   question does not exit until a re-run passes or the owner accepts the failure in the record; the failing question
   and the owner's notes enter `known-defects.json`.
7. **The rater, and one rule for an unrated panel (NF-S2).** The owner is the declared rater; no seat rates on the
   owner's behalf. If the owner has not rated within seven days of the panel being ready, the build continues on the
   milestone's measured numbers and the milestone's D-5 status is recorded **provisional — not rated** in its `D5Record`
   and its `MilestoneRecord` (§13.3). A provisional status never claims what the panel gates: M2b's "the base at parity",
   M4's "mastered" and M5's stage-2 gate are claimed only by a rated pass or by an owner acceptance recorded in the
   `D5Record`. The same panel — the same seeds, re-rendered under the current output version — is offered again at every
   later milestone and, after M5, with every release, until it is rated; a later rated pass turns the status into
   *passed* with its date, and a later rated failure follows (6). The release notes state every provisional status
   (§14 `@plat/docs`). §16 states the same rule at each gating exit.
8. **The threshold panel and the `house` pick.** At the same sitting the owner sees the strips of §13.7 (renders of one
   seed at a threshold's number and one step either side) and picks one or answers *same*; the pick becomes the threshold
   with provenance "owner-eye ⟨milestone⟩". From M4 on, the sitting also shows the three candidate `house` sheets drafted
   at M3b (D-1) on the milestone's seeds. **Pre-decided outcome if no `house` pick is recorded by M4's exit:** candidate 1
   — the first sheet in the M3b draft order — ships as `house`, selectable and never the default; `ink` stays the
   default; the pick is offered again at every later sitting, and a later pick replaces `house`'s sheet as a
   style-version change (pixels only; no model digest moves).
9. **Record and clean room (NF-S1).** The panel is assembled research-side (`research/d5/`) from PNG exports that the
   product's CLI writes and from the reference images in `captures/`; the product repository never reads the captures
   (§17). The machine-readable record lives in the product, committed by the seat that ran the sitting, like
   `baselines.json` (§17.1 (4)) — numbers, hashes and answers only, no reference image or reference data:

   ```ts
   type D5Status = 'diagnostic' /* M1 */ | 'passed' | 'failed' | 'accepted' /* a failure or an unrated panel accepted by the owner in writing */ | 'provisional-not-rated';
   interface D5Record {                    // plat/goldens/d5/<milestone>/record.json
     milestone: string; status: D5Status; date: string; offeredAgainAt: string[] /* later milestones and releases */;
     seeds: { rung: Rung; water: 'none'|'river+coast'; i: number; seed: string }[]; ftgCaptures: string[];
     platImages: Hash128[] /* PNG hashes of PLAT's side */; key: { commitment: Hash128; revealed?: string };
     answers: { pair: number; question: 'legibility'|'realism'|'charm'; answer: 'left'|'right'|'same'; note?: string }[];
     verdicts: { reference: 'MFCG'|'FTG'|'NG'; question: 'legibility'|'realism'|'charm'; betterOrSame: number; pairs: number; worseOnEveryPairAtARung: boolean; pass: boolean }[];
     thresholdPicks: { letter: string; picked: number | 'same' }[]; houseSheet?: string; acceptance?: { by: 'owner'; text: string; date: string } }
   ```

   The research-side `docs/validation/d5/⟨milestone⟩.md` — the human-readable record with the reference images' hashes —
   is generated from this file (§13.3); no CI job reads it.

=== REPLACE §13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30) ===

### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

Every threshold is in one of two classes and there is no third. **Reference-settable** bands are §13.5's, set by its band
rule from `baselines.json`. **Thresholds no reference can set** — the properties the references lack, which is where the
base claims to improve — are listed here: each has a number now (provenance "architecture 2026-09-25"), is confirmed at
the first milestone at which its mechanism runs, and has a pre-decided fallback. The corpus phase may later re-sign any
of them as a declared shift (§13.9).

**J-T, the calibration rule every table row and threshold cites (NF-S4).** Every value has a number now and a
provenance (§17.1 (6)); a reference-settable value is set from `baselines.json` by §13.5's band rule; any value may
later be re-signed only by a declared shift — an M-1 re-measurement, an owner pick on the panel of §13.6 (8), a
calibration run (§13.9); and no acceptance run treats an unset value as passed — a table with an empty cell fails to
load. §4.7's granularity table, §4.9's greenery table and this section cite it as "J-T".

**Fallbacks that move a threshold (NF-S5).** A fallback may change a *mechanism* (a table value, a weight, a radius) and
re-measure against the same threshold. A fallback that instead moves the *threshold* to a measured value makes the
letter pass by construction, so it is marked **not achieved**: the letter and the measured value are entered in
`known-defects.json`, reported in the parity report and the release notes, and never cited as evidence that an
improvement was achieved (§15.2's O class). The rows below say which fallbacks do this. An owner pick on the threshold
panel (§13.6 (8)) is not a fallback: it is the owner setting the number, with provenance "owner-eye ⟨milestone⟩".

| letter | threshold (number now) | confirmed at | pre-decided fallback if the confirmation fails |
|---|---|---|---|
| O18 (i) smooth field | p99 of \|∇P\| ≤ 0.5 per 100 m of the normalised prosperity field, outside hard seams | M2b: B-CITY measurement, and a §13.6 strip at σ = 45 / 60 / 90 m | σ rises one step (60 → 75 m) and the measurement repeats; an owner pick of σ sets σ, and the threshold is re-signed at that σ's measured p99 with provenance "owner-eye" |
| O18 (j) plot-size variety | within-district plot-area CV ≥ 0.25 for districts with ≥ 30 plots | M2b | the granularity rows' frontage CV rises from 0.25 to 0.35 and the measurement repeats; if still failing, the floor becomes the measured p10 — **not achieved** |
| O18 (h), O7 (f), S3 soft seams | across soft seams: Δ median frontage ≤ 25 %, Δ median plot area ≤ 35 %, Δ median storeys ≤ 1 | M2b | the fields' seam smoothing radius doubles and the measurement repeats; if still failing, the band becomes the measured p95 + 5 points — **not achieved** |
| O19 (d) canopy | tree nearest-neighbour p1 ≥ 0.5 × the class's mean crown diameter (orchard, avenue, garden); ≥ 0.3 × for woods | M2b (bench, §8.10's stamps) | the stamp tiles' minimum distance is raised to the threshold (a table value) |
| O19 (g) city-zoom greenery | every green face ≥ 0.3 ha drawn at the city band with a short side ≥ 2 px; the green / ground and green / paper pairs at or above §8.2's contrast floors; no option coupling drops the layer | M2b, for `ink` and `lit` — the milestone that builds S12's greenery rules (NF-S6) | the `green` role steps one value step from `ground` (a style row) and the check repeats |
| O12 (a) legibility floors | minimum drawn feature ≥ 2 px; area-label cap height ≥ 7 px (§9.4) | M1: B-ZOOM and a §13.6 strip at 6 / 7 / 8 px | the owner's pick; with no pick, 7 px stands |
| O13 (a) label curvature | a label's spine turns ≤ 45° over any window of the label's length (§9.3) | M1 | the spine's smoothing step doubles; a label still over the limit takes §9.4's next ladder rung |
| O13 (c) name–feature consistency | a name that references a feature type has that feature within 250 m | M1 | the grammar's feature guard — which admits a feature-referencing name only when the feature lies within the guard radius — shrinks its radius from 250 m to 200 m, and the measurement repeats against 250 m |
| O7 (b) water-dependent trades | within 100 m of water | M2b | the placement score's water term weight doubles |
| O14 (b) farmsteads | every farmstead within 300 m of one of its own fields and within 1 500 m of all of them | M2b | the hinterland unit's S10 re-sites a violating farmstead to its fields' area-weighted centroid (§4.9) |
| O14 (c) wood edges | edge straightness (chord ÷ path length over 200 m windows) median ≤ 0.90; canopy fraction monotone in the wildness control | M3b | the edge-noise amplitude rises by half and the measurement repeats |
| O14 (e) built / map area | settlement-perimeter area ÷ frame area (without margin) within 0.06–0.25 at every rung and population | M1 | the frame side per rung is rescaled in `ladder.json` so the median ratio is 0.12 (a declared shift) |
| block-level use mix (MFP-7) | residential-only blocks ≤ 60 % of blocks in core districts; per-block use-mix entropy p50 ≥ 0.5 bits; ≥ 70 % of trade households live at their workplace | M2b | the live-in default share of craft and shop rows rises one step (§10.2) |
| requested features (IMP-5) | degraded delivery (tiers 4–5) on ≤ 5 % of requested features | M1 | the F-* ladder whose degraded rung fires most gets 5 instead of 3 tier-3 attempts and the measurement repeats; if still over, the band becomes the measured rate + 2 points and the top three causes enter `known-defects.json` — **not achieved** |
| O16 (c) scripted tasks | one UI action where a reference needs a detour; recovery = one undo; every app response ≤ 1 s | M1 (link, SVG, coast side, variants), M2a (undo), M3b (the rest) | a task over its action count gets a toolbar shortcut and repeats |
| O2 (c) carry-over | edited entities kept or carried ≥ 95 % for local actions and re-derivation from S7 on, ≥ 80 % from S4–S6, ≥ 60 % from S1–S3 (§15.2) | M3a (B-EDIT) | §6.3's doubled anchor radii with the IoU test; then an edited building or plot left without a successor re-imposes its last geometry as a drawn constraint |
| S4 (d) square area (stage 2) | typed squares (market, church forecourt, well square, bridgehead, crossroads) inside a district: 0.03–0.15 ha per 1 000 of its inhabitants, over districts of ≥ 1 000 inhabitants | M5 | the square-sizing rows (m² per inhabitant served, per square type) are scaled so the median is 0.08 ha per 1 000, a declared shift, and the measurement repeats |

Realism against real towns is measured by the corpus phase (§13.9), which the owner's roadmap stages after the
standalone generators; until then the base's realism evidence is the D-5 realism question and the P rows of §13.5, and
§15.2 says so.

=== REPLACE §13.8 CI tiers and compute budgets (SCL-18; D-34) ===

### 13.8 CI tiers and compute budgets (SCL-18; D-34)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

The full verification rig costs ≈ 10–20 CPU-hours (12 000 B-CITY generations ≈ 1.6 CPU-h before the suite; 10⁵ oracle
regenerations ≈ 8 CPU-h; 10⁶ fuzz inputs × ≈ 20 primitives ≈ 0.3–5.5 CPU-h), so it cannot gate a single change. It runs
in three tiers, each with a wall-clock budget on a stated runner (a 16-core x86-64 Linux machine; timings normalised by
§12.1's calibration score):

| tier | runs | budget | contents |
|---|---|---|---|
| **PR** | every change | ≤ 15 min on 8 cores | lint (the determinism allowlist, units, dependency direction, the repository path rule), type check, unit and contract tests; B-FUZZ with 10⁴ random inputs per primitive plus the whole constructive-degeneracy set; B-CITY-lite 50 seeds per rung × 4 water settings; B-EDIT 10³ sequences with the oracle once per sequence; stage-isolated goldens and the per-stop placement digests on Node x86 (§13.3); the licence, notices and deny-list scans; the app's scripted and accessibility tasks on Chromium |
| **nightly** | every night | ≤ 4 h on 16 cores | B-CITY 1 000 seeds × 4 water settings × 3 rungs with the invariant suite; B-FUZZ 10⁶ per primitive; B-EDIT 10⁴ sequences; **the O9 (c) faithfulness campaign** (n = 400 scopes × K = 50 references, ≈ 6 CPU-min, §13.2); the five-engine golden run with one PNG per LOD and preset and the placement digests; visual regression and B-ZOOM; cost-model sweeps (nine sizes — every band's bottom, target and top — × five seeds, with the F-WORK flatness check) and the first-map runs at the same three sizes per rung (§12.5); the model budgets re-measured inside Chrome's worker on the same seeds (the Chrome figure governs a gap above ± 15 %, §12.1); control sweeps at TOWN and CITY; the option matrix; the B-REF parity report |
| **milestone** | every milestone exit, and weekly | ≤ 12 h on 16 cores | B-EDIT 10⁵ sequences; METROPOLIS control sweeps; the 20-epoch test; the parity report at five seeds per matched size; the D-5 renders, including every earlier panel still *provisional — not rated* (§13.6 (7)); memory and document-size tests at every rung |

A tier whose normalised wall-clock exceeds its budget by more than 10 % fails with *over budget*; the answer is to split
the job or make it faster, never to raise the cap — a budget changes only by a recorded decision. **Measurement (M0):**
the harness times each tier on the runner. **Pre-decided fallback:** if the PR tier exceeds 15 min, B-CITY-lite drops to
25 seeds per rung and the random fuzz to 5 × 10³ inputs per primitive (the constructive set is never cut), and the
nightly tier absorbs the difference.

=== REPLACE §13.9 The corpus-calibration interface (staged by the owner; DEF-9) ===

### 13.9 The corpus-calibration interface (staged by the owner; DEF-9)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

The owner's roadmap puts calibration against the historical map corpus after the standalone generators (the base,
neighbourhoods, buildings, the village) are built; the corpus lies outside this folder and is not read by this program
(the standalone ruling). The base carries the interface now, so the corpus phase needs one adapter and no other code:

```ts
interface CorpusAdapter { id: string; version: string; maps(): AsyncIterable<CorpusMap> }     // written in the owner's staged phase
interface CorpusMap { id: string; source: string /* archive, sheet, date */; era: string; region: string; populationEstimate?: number;
  features: FeatureCollection /* GeoJSON in metres: ways, blocks, plots, buildings, walls, water, greens, with their kinds */ }
interface CalibrationRun {
  id: string; corpus: { adapter: string; version: string; maps: string[] };
  metrics: string[];                                      // §13.5 metric ids, computed on corpus maps by the same parity code
  changes: { table: string; rowKey: string; column: string; from: unknown; to: unknown; evidence: string[] /* baseline ids */ }[];
  before: ParityReport; after: ParityReport /* §13.5 */; shifts: ShiftRecord[] /* one per moved stage, §13.3; cause.kind 'calibration' */;
}
```

1. The parity code computes every §13.5 metric on the adapter's maps research-side and writes `baselines.json` rows with
   `reference: 'corpus:⟨map id⟩'`, role *target* and `referenceBuild` = the corpus version.
2. A `CalibrationRun` changes table cells only; every cell is `{value, unit, provenance, calibratable}` (§7.6), and each
   changed cell's provenance becomes `{ source: 'corpus', evidence, date }`.
3. The run ships as a table-version bump inside an output-version bump with a shift record for every moved stage
   (§13.3, §6.4), stored in `plat/goldens/shifts/o<k>.json` with the run's id as their cause, so every existing document
   keeps replaying under its own output version.
4. The first tables it re-signs are the era and region presets (D-2), the rung profiles (§1.1), the granularity,
   site-plan and greenery rows (§4.7, §4.9) and the forms' signatures (§7.7); the §13.7 thresholds whose provenance is
   "architecture" or "owner-eye" are re-signed where the corpus measures them.

=== REPLACE §14 Package and module layout, key interfaces, dependency rules, extension points ===

## §14 Package and module layout, key interfaces, dependency rules, extension points

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

*In plain words.* The code is split into small packages with one-way dependencies: the geometry kernel knows nothing
about towns; the town model knows nothing about drawing; the drawing code knows nothing about how the town was made;
the app sits on top of a headless library. New looks, new layout templates, new export formats, new building
generators and new rule tables plug into named registries without touching the pipeline. All of it lives in one
repository, `plat/`, that never reads the research material (§17).

```
@plat/kernel   lattice, predicates, one arena per layer with the five levels as views (§2.2), role and owner tables, resolution of stored
               references, batched transactions, kernel invariants, arrangement booleans / buffers / bands (§3.7), the straight skeleton and
               its validator (§3.8), obb / hull / lir, delaunay (delaunator), poisson (stamped ranked tiles), curves, index (flatbush / rbush /
               grid), noise, dmath (our fdlibm 5.3 port), rng (xoshiro + 128-bit keys; `rng.stream`, the one structured stream mixer of
               §6.1), concern registry
@plat/model    schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-coverage test), lifecycle, provenance, document,
               serialisation (.plat, CBOR twin), migrations, the Merkle model digest, the core statistics record, the control registry; the
               label records `LabelEntity` and `QuarterNode` (§9.1) and the shared view vocabulary `LodBand`, `Role`, `ZoomStop`
@plat/tables   rule tables, presets, style sheets, rung profiles (`ladder.json`, §1.1), the work-limit coefficients (`workLimits.json`,
               §5.1 (5)), setting packs (§10.4) and the default keymap as versioned JSON with provenance; loaders; the override layer
@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces
@plat/content  S2 sequential roster, demand, government and religion rows, S7b / S10a allocation, S10b placement, households and people
               derivation, the relation-store schema, the economy and personality schema stubs (D-32), naming engine + grammar
@plat/layout   S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, S6 grower / typing / fields / the quarter merge tree, S7
               fortification and water furniture, S7b claims, S8 infill (BentCutFabric), S9 corridors, S12a hinterland siting, the hinterland
               unit, S12b greenery; the StrategyRegistry and the ordering of registered StageDecls
@plat/plots    S10 granularity law, per-frontage regions, joins / splits / alleys, boundary treatments; S11 site plans, packer, heights,
               footprint templates; the BuildingGenerator interface (`outline` / `compose`) + OutlineBuildingGenerator; assignment +
               placement solver
@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]
@plat/labels   S13a names (every node of the quarter tree), candidates and spines; S13b view placement over the parameters the renderer
               passes in (`ObstacleSource`, `RoleIndex`, below) — it never imports render; the font-metrics reader; collision; furniture
               incl. the ruler and the emblem generator
@plat/render   S14 columnar display-list builder, paint programs, style sheets, LOD, the tile pyramid and the tile worker (which runs S13b
               by calling `@plat/labels`), backends (Canvas2D, SVG, print tiles; the WebGL2 tile compositor as a fallback), shadow pass,
               decoration stamps, live layers
@plat/edit     edit events, dry-run validation, undo and redo records, scoped regeneration, rebase, the dependency audit, event
               migrations, warp kernels
@plat/export   geojson, svg, png / tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt), gltf / obj, cityjson, csv, permalinks
@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and schedules, calendar, factions, events, economy,
               personality and the stat-block pack (D-32) — over @plat/content ids
@plat/api      the handle-based facade (§11.2), the generation worker host, the derivation pool, the host bridge (§11.3) and DocResolver
               (§11.5), the headless CLI
@plat/app      the reference UI (below)
@plat/docs     the user guide: generated reference pages from the control, entity and table registries plus written pages;
               `known-defects.json`; release notes generated from `plat/goldens/shifts/` and the milestone records (§13.3), the D-5
               statuses (§13.6) and the known defects
@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench statistics and the `parity` CLI
               (reads `baselines/baselines.json` only), golden tooling with shift, cascade and milestone records and placement digests over
               `plat/goldens/` (§13.3), the O9 (c) faithfulness campaign (§13.2), the boolean and buffer oracles (Clipper2-WASM in Node,
               polygon-clipping), the clean-room scanner (§17), the D-5 seed list and export command (`plat d5 seeds`, PNGs for §13.6)
```

**Stage registrations whose declared I/O the round-2 pipeline changed** (§4.1–§4.12 hold the definitions): S3 declares as
outputs the gate routes, the travel-cost field `T`, the stage-1 trace and gates, the carved water with its decks and the
decoration ponds; S6 the settlement perimeter and the `Seam` records (II.1); S12a no geometry (sites only); the
hinterland unit registers as a unit of S10 / S10b / S11 / S12b over the hinterland's blocks (§4.9); `SkyStrategy.place`
takes S7b's sky allocations (II.6); `BuildingInput.fixedWings` and `BaseWing.kind` are §2.6's; `SettingPack.rosterPatch`
is §10.4's.

**Dependency rules (enforced by lint):** `kernel ← model ← tables ← {site, content} ← layout ← plots ← labels ← render
← edit ← export ← api ← app`; **labels ← render** (N-22): the tile worker in `render` runs S13b from `labels`, and the
drawn symbol extents and the display-list index that S13b reads reach it only as the parameters `ObstacleSource` and
`RoleIndex` — interfaces `labels` declares and `render` implements — so `labels` never imports `render`, and the types
both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`) come from `model`; `docs` reads the registries of `model` and `tables` only; `hood` depends on `layout` /
`plots` only through their interfaces; `sim` depends on `content` and `model` only; `render` never imports `layout`;
nothing depends on `app`; no package imports a backend it does not need; every adopted runtime library is imported in
exactly one adapter file of the one package that uses it; model packages obey §6.5's allowlist lint, which also scans
the vendored dependency sources; no import, fixture or script path may resolve outside `plat/` (§17).

```ts
// @plat/layout — stages and strategies (StageDecl, NetworkStrategy and EnceinteStrategy are §4.12's)
interface Stage<I, O> extends StageDecl {
  version: string; lineageUnit: EntityKind /* whose lineage keys its draws, §6.3 */;
  workLimits: WorkLimits /* laws over the batch scope's population-derived counts, §5.1 (5); coefficients in workLimits.json */; budgetMs: Record<Rung, number> /* reporting only */;
  txForm: 'declared'|'callback' /* §3.3: declared op sets in canonical order, or callback sequences in issue order */;
  inputsOf(model: Model, scope: Scope): I; run(input: I, ctx: StageContext): KernelResult<O> }
type ConcernId = number & { readonly __brand: 'ConcernId' };   // u16 from the concern registry (§6.1), generated as typed constants — never a string
interface StreamOpts { reroll: number /* the derivation unit's reroll (§6.1) */; attempt: number /* ladder retry, ≤ the concern's registered cap: 3 for geometric ladders, 8 for naming (§6.1, §9.6) */;
  epoch: number; salt: number /* the concern's current salt from the recipe and the log's rerollLayer events; 0 for geometry concerns */ }
interface StageContext { doc: Document; plats: Record<string /* PlatKey */, Plat>;
  stream(concern: ConcernId, entity: Handle /* its entity key is cached in the arena beside its lineage hash (§6.1); TOWN_ROOT for town-level draws */, opts: StreamOpts): Stream;
  streamOpts(concern: ConcernId, entity: Handle, attempt?: number): StreamOpts /* the defaults: reroll from the entity's derivation unit, epoch from this context, salt from the document */;
  tables: TableView; rung: RungProfile /* §1.1 */; report: ReportSink; scope?: Scope; epoch: number }
// TOWN_ROOT: the handle of the town itself as a derivation unit; its entity key is the seed key mixed with the fixed town lineage (ground arena, no parent,
// creation epoch 0, index 0), so town-level draws — S0's features, terrain noise, the compass and emblem furniture (§9.5) — depend on the recipe alone, never on docId (NF-D12)
type Scope = { kind: 'all' } | { kind: 'entities'; ids: Id[] } | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level } | { kind: 'epoch'; epoch: number };   // no raw face ids at the API
interface StrategyRegistry { terrain: Map<string, TerrainStrategy>; coast: Map<string, CoastStrategy>; river: Map<string, RiverStrategy>; manifest: Map<string, ManifestStrategy>;
  network: Map<string, NetworkStrategy>; enceinte: Map<string, EnceinteStrategy>; fabric: Map<string, FabricStrategy>; plots: Map<string, PlotStrategy>;
  sitePlan: Map<string, SitePlanStrategy>; building: Map<string, BuildingGenerator>; evolution: Map<string, EvolutionStrategy>; sky: Map<string, SkyStrategy>; sewer: Map<string, SewerStrategy> }
interface FabricStrategy  { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc: StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }> }
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext, claims: Claim[], sc: StageContext, k: Kernel): KernelResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: ContextVector, tables: TableView, rng: Stream, k: Kernel): KernelResult<SitePlan> }
interface GranularityLaw  { bands(ctx: ContextVector, rung: RungProfile): { frontageM: [number, number]; depthM: [number, number]; areaM2: [number, number]; joinMax: number; vacancyRunShare: number } }   // the deep-interior choice is S8's (§4.6)
// @plat/kernel — the façade the stages see, and the one stream mixer every reader uses
interface Kernel { plat(key: PlatKey): Plat; view(key: PlatKey, level: Level): LevelView; resolve(ref: GeomRef, key: PlatKey): Resolved; geom: GeomOps; index: SpatialIndex;
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<T>   // exactly one form: tx.ops (declared) or fn (callback), §3.3
}   // KernelTx (§3.3) carries `stage` and `rederivesFrom`; the services resolveVertexAt, signature and sampleProfile are §3.4's
interface Rng { stream(entityKey: Hash128, stage: number /* u16 stage id; STAGE_VIEW = 0xffff for paint programs and furniture */, concern: ConcernId, opts: StreamOpts): Stream }
// StageContext.stream is rng.stream with the calling stage's id and the entity's cached key; paint programs and furniture call rng.stream with STAGE_VIEW.
// No string reaches the mixer; the textual form of a key (§6.1) is rendered for reports only, and a lint rejects a stream call whose concern is not a ConcernId.
// @plat/content — a host's own roster or people; registered only after §11.4's double-run check, its outputs recorded in the document
interface ContentProvider { id: string; version: string; roster(pop: number, character: CharacterVector, tables: TableView, rng: Stream): Roster;
  site(roster: Roster, plots: Plot[], ctx: SitingContext, rng: Stream): SitingResult; people(household: Id, rng: Stream): Person[] }
// @plat/plots — the stage-3 hook: BuildingGenerator { outline(…); compose(…, lod) } is §2.6's
// @plat/labels — S13b's inputs from the renderer, declared here and implemented by @plat/render (labels never imports render)
interface ObstacleSource { protectedExtents(stop: ZoomStop, box: Box): { box: Box; entity: Handle; kind: 'gate'|'castle'|'plaza'|'bridge'|'wall' }[] /* drawn symbol extents at the stop, §9.2 */;
  coverage(stop: ZoomStop, box: Box): { labels: number; protected: number; buildings: number; ways: number; water: number } /* mark cover, for furniture placement, §9.5 */ }
interface RoleIndex { roleAt(p: Point, band: LodBand): Role /* the area mark under a point: halos, §9.4 */; snap(p: Point, radiusPx: number, stop: ZoomStop): Point | null /* the measure tool, §9.5 */ }
interface LabelPlacer { place(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet /* §9.2; view data */ }
// @plat/model — LabelEntity, QuarterNode: §9.1 (model records written by S13a); LodBand, Role, ZoomStop: the shared view vocabulary (§8.1, §8.2, §8.8)
// @plat/render — DisplayList, MarkTable, DisplayDelta, DisplayListBuilder: §8.1; StyleSheet, Symbolisation, OrderSlot, LiveLayerProvider: §8.2; LayerSpec: §8.4;
//                backends and threads: §8.9
interface TileBackend   { raster(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over';
  shadows: 'off'|'drop'|'prism' /* §8.2's StyleSheet.shadows.projected */; sun?: { azimuthCdeg: number; altitudeCdeg: number }; tier: 'low'|'mid'|'high'; dpr: number }): ImageBitmap }
interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }
// @plat/edit
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(token, fates) — an event carrying fates commits only when a fresh dry run computes the same fates (§11.2) */;
  undo(doc: Document, session: string, of?: number): ApplyResult /* appends an undo event for the session, §7.4; `of` only for the owner role */;
  redo(doc: Document, session: string): ApplyResult /* appends a redo event */;
  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: Diff }; rebase(doc: Document, reason: RebaseReason): Document }
// @plat/api — PlatApi and DocHandle: §11.2; BridgeTransport and BridgeMessage: §11.3; DocResolver: §11.5
// @plat/export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Uint8Array | string> }
// @plat/testkit — Baseline, ParityReport: §13.5; ShiftRecord, CascadeRecord, MilestoneRecord: §13.3; D5Record: §13.6; CorpusAdapter, CalibrationRun: §13.9
```

**`@plat/app`, the reference UI.** One click; the basic panel (≤ 12 controls, §7.8) and the advanced panel; the report
panel; the editing tools (draw, move, warp, brushes, the four actions, lock, assign); the tables editor and the style
dialog; the ruler (§9.5); the gazetteer and the "features in view" list; context help; the family-tree view (module).

* **Input scheme (COV-MFCG-L08)** — MFCG's idiom kept and stated, held in `keymap.json` (data, editable, versioned like
  every table). Pointer: *click* selects and opens the context panel; *double-click* zooms to the entity's band (a
  district fills the view — MFCG's district view); *shift+click* is New random on the entity's scope, keeping its kind
  (MFCG's ward reroll); *ctrl / cmd+click* resets the entity to generated (one logged event that applies the inverses of
  the entity's own edits); *alt+click* toggles its lock; right-click or long-press opens the context actions (§7.4);
  dragging a selected vertex is `moveVertex`; wheel or pinch zooms; dragging empty map pans. Keys while the map has focus:
  **A** alleys at the city band, **B** buildings shown / hidden, **D** grid, **N** hairline mode, **L** labels, **T**
  trees, **M** ruler, **W** warp tool (then **1–8** choose the kernel), **G** gazetteer, **F** features in view, **R** New
  random on the selection, **Esc** cancel, **ctrl / cmd+Z** undo, **ctrl / cmd+shift+Z** redo, **+ / −** zoom, **0** fit,
  **?** the keymap overlay. Bindings are active only while the map region has focus; an embedding host can switch global
  bindings off; every bound action is also on a menu or a button.
* **Accessibility (COV-FTG-A24)** — the app's chrome (panels, dialogs, menus, toolbars, the report, the gazetteer, the
  tables editor) meets WCAG 2.2 level AA. Landmarks: header (title and seed), navigation (panels), main (the map region,
  `role="application"` with an accessible name and a live description of the view — rung, band, the district under the
  pointer or the focused entity), complementary (report, gazetteer). Every control's accessible name and description come
  from the control registry (its label and documentation anchor); every icon button has a text label. Every action is
  reachable by keyboard in a focus order that follows the layout, with visible focus and no keyboard trap; the map region
  takes arrow-key panning and **+ / −** zoom. **The non-visual route to the map** is the gazetteer (list and search over
  districts, quarters, streets, buildings, institutions and pinned people through `query`) and the "features in view" list
  (the entities whose marks are visible, grouped by kind, ordered by distance from the view centre, each announcing its
  name, kind and district); selecting in either list selects on the map and the reverse. UI text contrast ≥ 4.5 : 1 and
  UI components ≥ 3 : 1 (the map follows §8.2's contrast matrix); the reduced-motion preference turns off animated zoom;
  the UI scales 100–200 % without loss. Tests: §13.4.
* **Context help and the guide (COV-FTG-A25)** — every control and panel carries a help link to its anchor in
  `@plat/docs` (§7.8's documentation anchor), opened in a side panel. The guide's reference pages are generated from the
  control registry (label, range, unit, output metric, consuming stage, locality class), the entity registry and the table
  schemas (columns, units, provenance); written pages cover getting started, each panel, each edit action, each export and
  the tables editor. Release notes are generated per release from the shift records (§13.3) and `known-defects.json`
  (id, symptom, affected rungs and presets, workaround, since, fixed-in). Tests: §13.2.
* **Family-tree view (COV-FTG-C11; module tier, M4b)** — reads `query(h, { kind: 'relations', person, up: n, down: m })`
  over the relation store (§10.3): generations in rows by birth epoch, partners side by side and children below;
  branches beyond two generations elided into a count that expands on click; re-root on any person; opening a person
  never pins it (§10.3); keyboard-operable as a tree grid.

**Extension points:** every `Map` in `StrategyRegistry` (stage 2 registers the three template fabrics; a village product
registers a tracker `NetworkStrategy`, a palisade `EnceinteStrategy`, a density `StageDecl` and a "houses along ways"
`FabricStrategy`; the owner-staged layers register `SkyStrategy` and `SewerStrategy`; the evolution engine an
`EvolutionStrategy`); `BuildingGenerator` (stage 3); `StageDecl` registration by declared inputs and outputs; the
`PaintProgram`, `StyleSheet` and `LiveLayerProvider` registries; `Exporter`s; rule tables, presets, rung profiles,
setting packs and keymaps (data); `EditEvent` kinds with migrations; `LayerSpec`s; `ContentProvider` (host rosters, after
the double-run check); `BridgeTransport` and `DocResolver`; the `PlacementSolver`; `CorpusAdapter` (§13.9).

=== REPLACE §15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked ===

### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

Tags: **BASE** (delivered by stage 1), **STAGE-2** (delivered by the neighbourhood stage through an interface the base
carries), **VILLAGE-LATER** (the separate product staged by the owner; checked as not precluded, hooks in PART III),
**module** (the optional `@plat/sim`, milestone M4b), **hook**. "Beyond" marks rows where the base deliberately exceeds
the reference's recorded weakness. Rows whose id starts `a:` were added by the fix-all pass from the coverage audits'
rows (COV-FTG-OBS1): the matrix is now no coarser than the findings.

**MFCG (40 rows) — all BASE**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface / blueprint / URL | §4.2 S0, §6.4 permalinks, §7.7 intent (MFCG's flags kept as intent toggles and the features strip, §7.8) | BASE |
| A2 | RNG stream, seed chain, save/restore | §6.1 keyed sub-streams (beyond: no global stream) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (beyond: no whole-city restart; every requested feature counted by delivery tier) | BASE |
| B1 | patch mesh (spiral seeds → Delaunator → Voronoi/DCEL) | replaced by the plat and backbone faces (§2.2, §4.3); Delaunator kept for site sampling; the "denser, regular centre" look carried by the stage regimes | BASE |
| B2 | junction optimisation | §3.6 attraction + §4.3 junction merge (8 m), Y → T | BASE |
| B3 | coast / water field / `sea` | §4.2 S1 closed-outline coast at the request's bearing | BASE |
| B4 | `buildDomains` (land components) | §4.2 S1 flood fill of L0 | BASE |
| B5 | curtain wall, gates, towers, watergate | §4.2 S3 gate sites; §4.4 trace before the stage's growth; §4.8 gates at arterials with exact N by the measured gate law, water gates, towers by rule | BASE |
| B6 | citadel / castle (repair loop, placement, keep) | §4.2 S3 castle reservation by score with the inside / on-enceinte / outside option; §4.8 keep by `lir`, bailey, and the 0.75 compactness gate kept as a shape check, repaired in place first in MFCG's order (angle equalisation, then bloat within the area band), then re-sited, then a keep without a bailey — never a restart (F-CASTLE) | BASE |
| B7 | streets and roads (`Topology`, `aStar`, `tidyUpRoads`) | §4.3 routed arterials, destinations = gates / market / bridges / harbour | BASE |
| B8 | rivers / canals (regular, delta, bridges, mouth) | §4.2 S1 rivers by descent, distributaries (a delta), estuary as a width rule, islands; §4.8 bridges, canals as an intent flag | BASE |
| B9 | districts (seeded region growing, types, holes) | §4.5 grower over coarse faces, `check4holes`, feature-named kinds, quarters | BASE |
| B10 | ward → blocks (alleys by twisted bisection) | §4.6 bent-cut infill of each district polygon: the intramural secondary network and its lanes as spines | BASE |
| B11 | block → lots (twisted bisection, OBB, `indentFronts`) | §4.7 S10 per-frontage plots + front jitter (construction replaced by ruling O5; statistics matched, §13.5) | BASE |
| B12 | outskirts density falloff | §4.4 ribbon regime with the distance-to-gate kernel; §4.5 density field | BASE |
| B13 | shanty town / ribbon sprawl | §4.5 squalid type after the first half of the stages, outside the enceinte, with MFCG's trigger set; §4.4 ribbon regime; the suburb regime on the shanty toggle | BASE |
| B14 | plaza, temple, churches, gate plazas | §4.2 S3 plaza reservation sized per rung; §4.7 S9 `square` faces; §4.8 gate plazas and church forecourts (G-R1); institutions via claims | BASE |
| B15 | landmark / solid buildings, keep plan | §4.7 S11 institution site plans; §2.6 landmark footprint templates and OutlineBuildingGenerator; `lir` keep; solid-ink landmarks in `ink` | BASE (+ stage-3 hook) |
| B16 | greens / parks | §4.9 greenery rule table | BASE |
| B17 | farms and fields | §4.9 hinterland presets incl. the furrow style | BASE |
| B18 | harbour, docks, piers | §4.8 water furniture (basin, moles, quays, piers at 12–20 m) | BASE |
| B19 | trees and forests | §4.9 forests as faces; §8.10 stamped ranked tiles (Poisson k = 50, built once per session) | BASE |
| B20 | elevation field (`Apply elevation`) | §4.2 S1 real heightfield feeding S4 / S5 costs (beyond) | BASE |
| C1 | display modes (Lots / Complex / Block / Hidden) | §8.5 LOD bands + the plot model: the Lots look = footprint masses over the `ground` role at the city band; Hidden = a layer toggle; cadastral layer optional (beyond: no global switch) | BASE |
| C2 | roofs Plain / Hip / Gable, Raised, Solids | §3.8 straight skeleton with the plain-roof downgrade; §8.2 `roof` program; §2.6 roof spec + heights; Raised = `ink`'s offset under-copy, on by default (the projected shadow off, §8.4) | BASE |
| C3 | lot post-processing (`Offset`) | §4.7 S11 front-line jitter parameter | BASE |
| D1 | naming (Tracery + Markov, feature-conditioned) | §10.4 own engine and grammar | BASE |
| D2 | district labels (curved / straight / legend / hidden) | §9 hole-aware spines, quarter labels at city zoom, OBB-arc / straight / legend fallbacks (beyond: protected features) | BASE |
| D3 | map furniture (title, legend, scale bar, grid, compass, emblem, pins) | §9.5 (emblem slot with import and a minimal own generator; compass reroll) | BASE |
| E1 | colour system (schemes, roles, tints, weathering) | §8.2 roles, the contrast matrix, per-entity tints, thematic overrides | BASE |
| E2 | stroke discipline, layer order, caching | §8.2–§8.3 (casing idiom, round joins, order parity, world-aligned tiles) | BASE |
| E3 | alleys layer | §4.6 lanes / alleys are ways; §8.5 access-critical lanes drawn at the city band, the rest by LOD | BASE |
| E4 | district view, framing, no-zoom, thin lines | §8.8 continuous zoom on 2^¼ stops + the district band (beyond "no zoom"); framing §9.5; hairline mode (key **N**) | BASE |
| F1 | warp tools (8) | §3.4 `warp` + §7.1 `warp` event with dry-run and whole-step validation | BASE |
| F2 | rerolls, renames, landmarks | §7.1 the named actions, `setAttr`, `assign` (beyond: persisted, undoable) | BASE |
| F3 | UI / hotkeys / size bands | `@plat/app` input scheme in `keymap.json` (click edits, shift+click New random, ctrl / cmd+click reset, single-key toggles, §14); the measure tool (§9.5); the size ladder as data (§1.1) | BASE |
| G1 | export PNG / SVG / JSON | §11 (beyond: round-trip import, layered SVG) | BASE |
| G2 | integrations (FMG, Armoria, PS, Procgen Mansion) | §11 API, host bridge and static exports serve any host; the emblem is our own generator (§9.5); no third-party service is called (standalone) | BASE (hook) |
| H1 | population and scale model | §10.2 population as input; §2.1 metres (beyond the multiplier) | BASE |
| H2 | performance envelope | §12 (matched sizes 40 / 80 / 130; §12.9's declared trade) | BASE |

**FTG (46 rows + 9 audit rows) — BASE unless noted**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface, presets, save/load | §4.2 S0, §7.6 presets as data, §2.9 document | BASE |
| A2 | two-phase pipeline, staging, failure policy | §4.1 (programme before layout, two-way), §5 | BASE |
| A3 | coordinate system, units, wire format | §2.1 integer cm centred; §2.9 binary blocks / CBOR twin | BASE |
| A4 | determinism, seeding, regeneration of old settlements | §6, §6.4 retention, §7.5 migrate (beyond: FTG has none) | BASE |
| A5 | server/client split, persistence, lazy person generation | §11.2 handle API and workers; §2.9 document; §10.3 lazy people | BASE |
| a:A24 | app accessibility; list and search views reaching buildings and people without the map | §14 `@plat/app` accessibility contract, the gazetteer and "features in view" lists; §13.4 tests | BASE |
| a:A25 | user guide, context-aware documentation links, release notes naming defects | §14 `@plat/docs` and context help; §7.8 anchors; §13.2 coverage and link checks | BASE |
| B1 | size ladder, population and area budget | §1.1 ladder and rung profiles; §4.2 S2 stage quotas; §12.2 | BASE |
| B2 | dependency-graph building selection | §10.2 sequential roster (own tables) | BASE |
| B3 | residents, job postings, backfill, matching | §10.3 households (base); postings and re-matching in the module | BASE + module |
| B4 | people model | §10.3 derived people with ancestry rows (own tables) | BASE + module (data depth) |
| B5 | government, religion, factions, military | §2.7 Faction / Institution entities with seats; §10.2 government and religion rows (base); meetings, roles and goals in the module | BASE + module |
| B6 | relations, friend groups, rivalries, events | the relation store — schema in the base (§10.1), materialised by `@plat/sim` | module |
| a:B10 | economy: resource chains, items and services with prices, stock per building, global price edits | D-32: `@plat/sim` over the base schema stub (§10.3); roster rows' provides / uses edges (§10.2) | module |
| a:C03 | personality, education gated by class, stat block with profession modifiers | D-32: `@plat/sim`, derived from the person key; the stat block a named game-system pack, off by default | module |
| a:C11 | family-tree view (layered generations, elided expansion, re-root) | §14 `@plat/app` family-tree view over the relation store | module |
| C1 | coast generation, islands, ponds | §4.2 S1 closed-outline routine, bank classes (also sky islands) | BASE |
| C2 | rivers, branches, bridges, classification, direction | §4.2 S1 hydrology, tributaries, distributaries, river islands, crossing sites; §4.8 bridges | BASE |
| C3 | manually drawn water | §7.1 `drawWater` | BASE |
| C4 | road-graph substrate (PSLG, incremental faces, edge types) | §2.2 the plat (beyond: attraction policy, levels as views of one arena, role sets on edges) | BASE |
| C5 | road growth (proposal queue, cap, lengths, stages, initial roads) | §4.4 S5 outside the walls (mean-reverting curvature walk, destination-biased, explicit legality; per-preset growth rules for `american` / `ringed`); travel-cost stage boundaries with the anisotropy row (FTG's spoke priority) | BASE |
| C6 | district lots: creation, merge floor, type selection, order | §4.5 grower and typing, merge floor; S7b allocation | BASE |
| C7 | district internal pipeline (landmarks → divide → plots → buildings), placement modes, modifiers | §4.7 claims first → S8 → S10 → S11; Dense / Gaps / Individually placed ≈ row / detached / compound; the tents arrangement row (§4.7 S11) and the building-scale multiplier (§2.5) | BASE |
| C8 | lot → plot subdivision geometry | §4.7 S10 per-frontage regions (replaces recursive random cuts by ruling O5) | BASE |
| C9 | building footprints, landmark templates, entrances | §4.7 S11; entrance rule kept; non-rectangular landmark footprint templates in the base (§2.6) | BASE |
| C10 | suburb stage | §4.4 suburb regime (offshoots, cul-de-sacs, small lots from the outset, density Bernoulli) by preset or the shanty toggle | BASE |
| C11 | walls and towers | §4.8 | BASE |
| C12 | castle district | §4.2 S3 castle reservation + §4.8 | BASE |
| C13 | harbours and waterfront districts | §4.8 water furniture; §4.5 docks | BASE |
| C14 | outer settlement: farmland, farmsteads, outside buildings | §4.9 S12a count-driven outside land, farmsteads, outside buildings on their resources (§10.2 `outside` rows) | BASE |
| C15 | forests, tree areas, trees, hedgerows | §4.9; §8.2 hedgerow instances in `lit` | BASE |
| a:I11 | tree species | §2.7 `Greenery.species` from the climate table; §4.9 inner and outer shares for woods | BASE |
| C16 | landscape decorations, reserve, climate presets | ponds carved at S3 (§4.2 S3 (10)); the rest of the decoration table (copses, stone circles, ruins with trails, counts by rung and biome, keep-clear radii) is S12a's sites, built by the hinterland unit (§4.9); `reserve` land use; climate as a circumstance + style preset | BASE (should-have) |
| a:I05 | feathered field edges | §8.2 `feather` program (vector bands), on in `lit` | BASE |
| C17 | perimeter expand + round; decoration system | §4.5 S6's settlement perimeter, offset and rounded; §4.7 furniture pins (per-block weighted rows, per-district singletons) and plot boundary treatments (§2.5) | BASE |
| a:J05 | market stalls | §4.7 furniture pins: stalls on the square's edge band and round the market hall | BASE |
| C18 | district and building naming, erosion | §10.4 (contraction as an EVO event) | BASE |
| D1 | renderer architecture | §8.1 columnar display list + tile backends (batched; picking through hit-test slices) | BASE |
| D2 | palette and feature treatment | §8.2 `lit` preset on Canvas2D with our procedural texture set | BASE |
| D3 | roofs (straight skeleton) | §3.8, §8.2 (roofs cached per entity revision, not per render) | BASE |
| D4 | water rendering and coast decoration | §8.2 bands, depth ramp, foam, bank classes | BASE |
| D5 | day/night, weather, seasons, window lights | §8.4 sun vector + shadow hook; `night` preset with the `lights` role; lights from the module | BASE (hook) + module |
| D6 | post-process effects | §8.2 post operations per tile (greyscale, sepia, tint, vignette, pixelate, dot screen, scanline, crosshatch noise) | BASE (should-have) |
| D7 | labels, scale bar, grid, units, legend, thematic layers | §9; thematic layers = style overrides keyed by attributes (§8.2) | BASE |
| a:L08 | ruler (distance measuring) | §9.5 measure tool (distance and area, metres and feet, snapping) | BASE |
| D8 | 3-D view, street view, height maps | §11 glTF and CityJSON exports; heights in the model; no 3-D default view (R13 restraint) | BASE (export) |
| E1 | layout editor | §7.1 draw / move / warp events with split-on-cross and dry-run validation | BASE |
| E2 | regenerate area, bulk edit, constrained re-roll | §7.1 the named actions with scope; `setAttr` batches; faithful regeneration (beyond: undoable) | BASE |
| E3 | entity editing, dictionaries, pins, notes, layers | §7.1 `setAttr`, data dictionaries by id (§10.3), annotation layer (§9.5), view notes (§11.3), `LayerSpec` | BASE |
| F1 | schedules, behaviours, sub-locations | §10.3 module; sub-locations with capacities (§2.6) | module |
| F2 | clock, calendar, external time sync | §10.3 module; the time view state and the module's command over the bridge (§11.3) | module |
| G1 | export | §11 (beyond: districts in GeoJSON; per-layer VTT; CityJSON) | BASE |
| G2 | integrations (Foundry, Roll20, public links) | §11 VTT exports (Foundry-class, dd2vtt) + the host bridge over any transport; no hosted service — the host is the store (§11.5) | BASE |
| H1 | data scale | §12.8 memory; lazy people | BASE |
| H2 | performance envelope | §12 (beyond: sub-second client-side at every rung) | BASE |

**NG (31 rows) — STAGE-2 unless the base already delivers it**

| id | capability | where | tag |
|---|---|---|---|
| A1 | tags, `Settings`, URL state | PART II request (fabric id, params, character); §6.4 permalinks | STAGE-2 (request shape in BASE) |
| A2 | RNG engine, one stream, successor seed | §6.1 per-district sub-seed (beyond) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (NG's local retries are the F-CUT ladder) | BASE |
| B1 | hood outline (`createShape`) | the district's typed boundary (II.1); standalone and sky outlines from §4.2 S1 (2)'s closed-outline routine with an outline template — disc, D-shape, lozenge, crescent, spindle (II.1 rule (5)) | STAGE-2 |
| B2 | templates area / street / square | `FabricStrategy` registrations selected per district (II.2) | STAGE-2 |
| B3 | street network by bent recursive bisection | §4.6 (the base's infill primitive; NG signature as regression) | BASE |
| B4 | hole-aware bisection of annuli (`BisectorEx`) | §4.6 slit routing — the primitive `RingFabric` needs | BASE (primitive), STAGE-2 (ring) |
| B5 | street finishing: extend, fillet, width, corridor | §4.6; §4.7 S9 corridors | BASE |
| B6 | block content dispatch (Normal / Manor / Empty / Green) | §4.6 the deep-interior choice by band shares; §4.7 S10 residue typing; §4.9 greens; the weighted, area- and spacing-conditioned choice as a stage-2 table (II.3) | BASE + STAGE-2 |
| B7 | square-template plaza | `SquareFabric`; §4.7 `square` faces | STAGE-2 |
| B8 | ring-template seed geometry | `RingFabric` (II.2): concentric ring roads at a radius law are the only seed geometry — no template radials; each annulus is cut outside-in by the hole-aware bent cut, whose first cut is a slit and whose later cuts are the radial streets, staggered band to band | STAGE-2 |
| C1 | lots, setback, validation (perimeter filter) | §4.7 S10 (construction, 0 discards) | BASE |
| C2 | buildings, wings, compound plans, roof kinds, landmarks | §2.6 wings in the base + stage-3 hook; roof kinds in the base | BASE (+ stage 3) |
| C3 | manor compounds (walls, hall, grove) | §4.7 S11 set-back compound site plan with boundary treatments + §4.9 grove rule | BASE |
| C4 | greens, groves, shared Poisson field | §4.9 greenery rules; §8.10 stamped tiles | BASE |
| C5 | trees (crown construction, colour, shading, depth sort) | §8.2 lobed crowns, depth sort in `hatched`; §8.10 crown library | BASE symbol, STAGE-2 tier |
| C6 | pins: wells, fountains, large trees | §2.7 `Pin` kinds; §4.7 furniture pins in yards and squares; close-up density by the stage-2 table (II.3) | BASE (pins), STAGE-2 (close-up density) |
| C7 | uneven streetwall | §4.7 S11 front-line jitter | BASE |
| C8 | size tags, scale, character knobs | §2.5 character vector; metric scale (beyond) | BASE |
| D1 | naming | §10.4 | BASE |
| D2 | title layout (corner choice) | §9.5 emptiest-corner rule | BASE |
| E1 | palette / style schema, presets, multi-colour | §8.2 (`hatched` / `graphic` presets; multi-colour roles) | BASE |
| E2 | canvas, layer order, stroke discipline, depth-sorted trees | §8.2–§8.3 | BASE |
| E3 | roads rendering (Plain + five modes) | §8.2 programs (paved stripe, cobbles, tiles, outlined, dashed) in `hatched` | STAGE-2 tier |
| E4 | roof rendering: fake gables, colour law, hatching | §8.2 `roof` + `hatch(taper)`; §8.6 | STAGE-2 tier (programs in BASE) |
| E5 | shadows (prism quads, tree shadows) | §8.4 shadow pass from stored heights | BASE hook, STAGE-2 tier |
| E6 | unrecorded style features (night lights, presets) | §8.2 presets as data | STAGE-2 tier |
| F1 | toggles, hotkeys, presets, tags dialog, rotation, renaming | `@plat/app` (keymap, §14); rotation = view (§7.1); `setAttr` rename persists | BASE (app) |
| G1 | export PNG / SVG / JSON, permalinks | §11 | BASE |
| G2 | integrations (Procgen Mansion hand-off) | the stage-3 `BuildingGenerator` takes the plot and entrance directly (beyond the rasterised hand-off) | hook |
| H1 | performance envelope | §12 (open a district ≤ NG's 10–96 ms; per-district regeneration ≤ 30 ms) | STAGE-2 |

**VG (44 rows) — VILLAGE-LATER: not-precluded checks, hooks in PART III**

| rows | capability group | not precluded because |
|---|---|---|
| G1, G20 | tags, descriptive tags | the intent layer and presets are data (§7.7); tags derivable from the statistics record |
| G2 | seed / RNG / retry | §6 streams; §5 no seed swap |
| G3–G5 | river course before terrain, height field, water extraction | S1 shares level-set water and a carved field; VG's course-first, terrain-independent spline is a `RiverStrategy` the village registers, which S1's carve step serves (PART III) |
| G6, G7 | density map, heart | the density field is the same field type (§4.5); a village registers a density `StageDecl` ahead of its network (§4.12) and seeds one heart (§4.2 S3) |
| G8, G9 | tracker roads, bridges | a village registers a tracker-steered `NetworkStrategy` that receives the traced enceintes (§4.12); bridges §4.8 |
| G10, G11 | square + centrepieces, wharf / piers | `square` faces + pins; `quay` / `pier` ways |
| G12–G16 | buildings + population, fields, orchards, forest, palisade | detached / farmstead site plans (§4.7); hinterland presets and orchards (§4.9); forests; the palisade built before the roads by the village's `EnceinteStrategy` (PART III) |
| G17–G19 | naming, legend / POIs, population class | §10.4, §9.5 annotation layer, §10.2; the ladder's village rows (PART III) |
| R1–R17 | rendering (palette, layers, relief, hillshade, spotlight, water bands, roads, buildings, trees, shadows, fields, outlining, palisade, lights, nameplate, grid, numbering) | style sheets + programs (§8.2: bands, contour and hachure marks, outline mix, vignette, `lights`); the relief tier (hillshade, contours, hachures) is an optional base program, off by default; VG's grass-tuft and spotlight looks stay with the village product |
| E1–E6, D1 | export, JSON, permalinks, editing, integrations, performance, scale | §11, §7, §12, §2.1 (metres everywhere; VG's 0.7 m / unit ambiguity removed) |

All 44 rows are not precluded; the base pays for none of them beyond what it needs itself (the relief tier is a base
should-have in its own right, O12 extras). Caution recorded from the parity judge: the five-level plat is the least
village-shaped model — a village with houses along ways leaves L2 / L3 nearly empty — admissible, since a village is one
district and nothing assumes walls or a market (PART III).

=== REPLACE §15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5 ===

### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

Every acceptance letter carries its class: **[C] conformance** — it holds by construction once the rule is built, so it
proves the implementation follows the design and is never cited as evidence that an improvement was achieved; **[P]
parity** — compared with a measured reference number in `baselines.json` by §13.5's band rule; **[O] outcome** — it can
show that the result is better than the references, for a user or for realism. Thresholds without a reference source
have their numbers in §13.7. Letters that `docs/IMPROVEMENTS.md` stated and an earlier draft dropped are restored with
their numbers (IMP-10). Every letter is stated here in full, stage-2 letters included (NF-S4): implementers read this
matrix, never `docs/IMPROVEMENTS.md`, which is cited for traceability only (§17.1 (1)).

**The first-weighted improvements (D-7) and the evidence their own rules cannot fake (IMP-4).**
* *Plot texture* (O5, O17, O18): §13.5's figure-ground and streetwall rows against MFCG's exports at the matched rung,
  with the intended direction of each difference declared; the plots, party-wall and MFCG street-signature rows; the
  within-district plot-area CV floor [P / O].
* *Editability* (O9, O16-core, O2 c): the thirteen MFCG asks as measured scenarios; locality outside the scope;
  faithfulness against from-scratch generations; carry-over rates of edited entities [O].
* *Legibility and charm*: the §13.6 protocol's legibility and charm questions; street-edge recoverability [O / P].
* *Realism*: the §13.6 protocol's realism question and the P rows of §13.5. Realism against real towns is the corpus
  phase's measurement (§13.9), which the owner's roadmap stages after the standalone generators; this matrix makes no
  realism claim beyond those two.

| id | tier | mechanism in this design | acceptance (class of each letter) |
|---|---|---|---|
| O2 deterministic recipe | must | §6.1 keyed streams with the concern registry; §6.3 addresses and lineage; seeded decoration; epoch components | (a) identical model digest on two machines and three browsers, 100 % [O — FTG has no seed; VG drifts between builds]; (b) the scope of stability as §6.3 states it — grammar, decoration and block-reroll perturbations change 0 other entities [C]; (c) per parameter class: entities outside the stage-k closure byte-identical 100 %, the seam exception of §4.6 / II.4 excepted — computed by the oracle from the batches' commit records and checked (§7.3) [C]; edited entities kept or carried ≥ 95 % for local actions and re-derivation from S7 on, ≥ 80 % from S4–S6, ≥ 60 % from S1–S3, measured at M3a with §13.7's fallback [O]; (d) addresses 100 % stable outside the scope on B-EDIT [C]; (e) stage-isolated goldens: only declared stages move (§13.3) [C] |
| O6 metric units, furniture, statistics | must | §2.1 cm + unit lint; §1.1 ladder; §9.5 furniture; §13.2 core statistics record | (a) 100 % of length fields carry a unit (lint) [C]; (b) ordinary-house footprint median 60–160 m², p95 < 400 m² [P — FTG 103 / 154 m²; MFCG's footprints are lots, descriptive only]; (c) scale bar and grid within 0.5 % [C]; (d) 100 % of generations emit the core statistics record with provenance, the bench metrics on demand (§13.2) [C] |
| O3 robust kernel, typed ladders, report | must | §3, §5 | (a) B-FUZZ on random inputs and constructive degeneracies: 0 crash / hang / invalid output [O — all four references crash or retry on degenerate input]; (b) hard invariant violations 0 / 1 000 cities [O]; "no restart path" is a design property, not an acceptance number (IMP-5); (c) B-EDIT 0 planarity violations [C]; (d) model p95 TOWN ≤ 100 ms, CITY ≤ 300 ms, METROPOLIS ≤ 800 ms (§12.3) [P — MFCG at matched sizes, with §12.9's declared trade]; (e) identical digest across platforms [O]; (f) the seed never swapped; ladder uses ≤ 2 % of transactions, p99 ≤ 3 attempts [C]; (g) p95 per delivered town on the MFCG-worst configuration set ≤ 1.0 s against MFCG's 3.7–4.0 s (§13.5) [O] |
| O11 schema, registry, exports, API | must | §2 schema + registry with the CI path test, §11, §14 | (a) registry round-trip 100 %, no type missing from any path [C]; (b) containment 100 % [C]; (c) export → import → export identical [C]; (d) GeoJSON validates and loads in QGIS with districts [P — FTG omits districts]; (e) 0 dangling references [C]; (f) headless digest = UI digest [C]; (g) VTT grid 0 px [C]; (h) layered SVG separable and opening in Inkscape within 120 s at METROPOLIS [O] |
| O1 terrain and hydrology first | must | §4.2 S1 | (a) requested water features counted by delivery tier: tier-6 omissions 0, degraded ≤ 5 % (§13.7) [O — MFCG fails a requested river in 7 of 10 attempts at size 80]; (b) 0 non-monotonic beds; every river has an outfall; width never decreases downstream; every terrain cell has a defined flow path to an outfall (100 %); contours cross water 0 times [C]; (c) 10 / 10 configurations on 100 seeds each — coast, estuary, confluence, river island, lake shore, delta (distributaries), moat, island city, hill town, cliff or ravine [O]; (d) building ∩ water = 0 [O — MFCG's buildings over its river]; (e) the water stage linear in cell count, ≤ 5 ms at a 128²-cell equivalent and inside §12.4's S1 budget [P — VG 17–87 ms for one 128² village]; (f) site classifier ≥ 90 % [O]; (g) unused eligible land components 0 [C]; R11: river within the core when requested = 100 % [C] |
| O4 two-tier street network | must | §4.3, §4.4, §4.6 | (a) 100 % of through-roads reach destinations, bearings ± 10° [C]; (b) detour ≤ 1.4; junction p5 ≥ 30°; no turn cliff (10 m resampling); 4-way share per preset — organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % [P]; (c) width ~ betweenness [C]; (d) slope p95 within class [C]; (e) 0 edges below `minEdge` and 0 clearance violations [C]; (f) network + infill ≤ 100 ms at CITY with block statistics in the NG bands — the fusion gate, at M0 on a flat site and at M1 on river, coast and relief configurations [P]; the MFCG street signature inside the walls (§13.5) [P]; (g) N external connections exactly, island towns counting their shore landings [C]; (h) between-seed dispersion of the signature vector ≥ the larger of MFCG's and FTG's at the matched rung, from M1 (IMP-12) [O] |
| O5 frontage-first plots | must | §4.7 S10 | (a) access edge 100 % [C]; (b) 0 plots < 3 m, wedges < 0.5 % [C]; (c) side walls ± 5° ≥ 90 % [C]; (d) typed coverage 100 %, discard ≤ 0.05 [C]; (e) plot and block distributions by §13.5's band rule [P]; (f) 0 self-intersecting, duplicate or doorless buildings [O — FTG's hourglasses and ≈ 10 % doorless]; (g) streetwall gap ≤ 1 m [C]; streetwall continuity on dense frontages ≥ MFCG's at the matched rung [P] |
| O18 prosperity field + granularity law | must | §4.5 field; §4.7 S10 joins / splits / alleys; §4.6 deep interiors | (a) Spearman(prosperity, plot area) ≥ 0.8 and Spearman(prosperity, plots per ha) ≤ −0.8 [C]; (b) Moran's I of plot area > 0 [C]; (c) detached, yard, attached and coverage shares monotone in prosperity [C]; (d) alley length per ha ~ −prosperity (Spearman ≤ −0.7), 0 alleys below the class minimum, the dead-end share in band [C]; the court share of deep blocks within band per class (IMP-8) [P]; (e) access 100 % [C]; (f) institutions placed 100 %, never gives up [C]; (g) provenance, and the perturbation test ≥ 95 % outside [C]; (h) soft-seam jumps within §13.7's bands [O]; (i) a smooth field — p99 \|∇P\| ≤ 0.5 per 100 m (§13.7) — whose edits replay [C]; (j) within-district plot-area CV ≥ 0.25 (§13.7) [O — FTG's 441 m² in every class]; (k) gap-width modes [C] |
| O17 plot model, site plans, heights | must | §2.5–§2.6, §4.7 S11, §8.4 | (a) coverage within the table [C]; (b) multi-footprint plots > 0 for institutions, manors, inns and farms [C]; (c) party-wall share by band, attached ≥ 90 % in dense bands [P — NG 39–43 %, 95–99 %]; (d) streetwall continuity ≥ MFCG's Lots mode, walled or fenced frontage counted [P]; (e) yards owned 100 % [C]; (f) footprints fit 100 % [C]; (g) heights on 100 %, shadow ∝ height r ≥ 0.99 [C]; (h) ≤ 5 µs per plot median for site plans (§12.4) [C]; (i) footprint hash identical across LOD [C] |
| O7 content-first land use | must | §4.2 S2, §4.5 S7b, §4.7 S10b, §10.2 | (a) every building has a function and an occupancy (100 %); requested population ± 5 % on ≥ 95 % of seeds [O — MFCG's multiplier]; every person a home (100 %) [C]; every person a work or role (100 %) — a module letter, measured at M4b [C]; (b) rule satisfaction ≥ 95 % (noxious trades downstream or extramural; water trades within 100 m of water; market on a tier-1 junction or gate), reported per city [C]; (c) Moran's I (wealth) > 0 and monotone in the requested gradient [C]; (d) 0 constraint violations; per-capita ratio error against the tables reported; no occupation above its per-capita maximum [O — FTG's "20 adventurers" per 100 people]; (e) reconciliation ≤ 3 rounds [C]; (f) seam discontinuity within §13.7's bands [O]; (g) lazy people stable 100 %; opening a person writes nothing [C]; (h) gazetteer 100 % [C]; block-level use mix within §13.7's bands (MFP-7) [O] |
| O19 greenery by prosperity | must | §4.9 rule table | (a) Spearman(prosperity, private green share) ≥ 0.7 within ± 5 points of the table mean, σ ≤ 8 across seeds [C — NG's 23–58 % at identical tags is the weakness]; (b) public-green rules ≥ 95 %; park area per 1 000 inhabitants in band per rung [C]; (c) 100 % of greenery typed and owned or common, untyped leftover green 0 [O — MFCG and NG green is leftover space]; (d) tree nearest-neighbour p1 ≥ §13.7's canopy threshold, pair-correlation per class [O — FTG minimum 0.14 m]; (e) a district-band view with 10 000 visible trees composes in one 16 ms frame from cached tiles (§12.7) [P — VG P1]; (f) the greenery control monotone and continuous (§7.8) [C]; (g) city-zoom greenery passes §13.7's legibility check and no option coupling drops the layer [O] |
| O8 fortification network | must | §4.2 S3, §4.4, §4.8, §4.11 | (a) gates at 100 % of arterial crossings, count exact [C]; (b) 0 buildings in the setback band on both faces [C]; (c) tower spacing in band, 0 sawtooth [P — FTG 39 m]; (d) defensible-ground share; castle ≥ p80 among candidates [C]; castle area and compactness in MFCG's band [P]; (e) walled share in MFCG's band (§13.5) [P]; outer curtain on request [C]; (f) 4 / 4 circuit configurations, including two independent enceintes (polycentric nuclei, §4.2 S3) [O]; (g) wall → road keeps plot ids [C]; (h) the wall an entity in every export [C] |
| O12 display list, LOD, style as data, layers | must | §8 | (a) continuous zoom, footprint hash identical per LOD, minimum drawn feature ≥ 2 px, labels above §9.4's floors at every level, no feature pops more than once [O — MFCG has no zoom]; (b) pan and zoom ≥ 60 fps at 40 000 buildings and 200 000 trees on the reference machine and ≥ 30 fps on the low-end device; edit-to-redraw < 100 ms; roof computations per frame after warm-up = 0; ≤ 80 draw calls per tile (≤ 80 × P per view) and ≤ 4 uploads per frame during gestures, every ready tile at first paint and settle (§12.5) [P — NG 528 uploads per hood; FTG's roofs recomputed every render]; (c) screen = PNG = SVG within threshold, 0 silent couplings [C]; (d) glyph ambiguity 0, legend 100 %, every visible feature hit-testable [C]; (e) 300 dpi A2 [O]; (f) §8.2's contrast matrix on the rendered city band [C]; (g) first map by §12.5's laws of the building count: under 1 s for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings, the miss above declared for the owner's veto [P]; street-edge recoverability ≥ MFCG − 0.03 (§8.5) [P] |
| O9 persistent document, locks, regeneration, undo | must | §2.9, §7 | (a) save / load / save identical [C]; (b) locked preserved 100 %; outside the effective scope byte-identical (§7.3 item 7 ii) [C]; (c) faithfulness = §7.3 item 7 (iv): Regenerate (keep settings) byte-identical [C]; New random judged by §13.2's calibrated rank campaign — per regenerated scope and per statistic (median plot area, frontage width, density, attached share) the rank among K = 50 from-scratch generations of the same scope, ties broken by a uniform draw; the campaign (n = 400 scopes, nightly) passes unless a 10-bin χ² test rejects at family-wise 0.01 (Holm over the four statistics) — executed: ≈ 1 % false failures for a perfect regenerator, ≥ 99.5 % detection of too-snug, too-loose and biased regeneration (IMP-7) [O — FTG's "too snug" regeneration]; (d) every operation undoable (enumeration test) [C]; (e) an upgrade keeps 100 % of edited entities or reports each orphan [O — FTG cannot regenerate old towns]; (f) the thirteen MFCG edit asks of §7.4 as scripted B-EDIT scenarios, each reporting its locality share, invariants and re-run cost (§13.2) [O — MFCG: "no way to save those changes"] |
| O16-core report and honest controls | must | §5.4, §7.1, §7.8 | (a) report 100 %; the requested-vs-built diff and every requested feature's delivery tier shown when non-empty [O — MFCG's 28 silent street failures]; (b) auto-resolved values reported 100 % [C]; (d) hidden couplings 0 [C]; (f) every numeric control monotone and continuous by §7.8's statistical rule [C]; (h) seed → map identity 100 % [C] |
| O13-core labels and names | must | §9, §10.4 | (a) 0 protected overlaps, 0 collisions, inside ≥ 99 %, curvature within §13.7's limit, 0 labels crossing holes [O — MFCG covers gates and the keep]; quarter labels at MFCG's count at matched sizes [P]; (c) name–feature consistency 100 % within 250 m [C]; (e) edited names persist 100 % [C] |
| O14-core hinterland and margin | must | §4.9 | (a) farmland per capita ± 20 % [C]; (b) field access 100 %; every farmstead within 300 m of one of its fields and 1 500 m of all; land-use overlaps 0; unused components 0 [C]; (d) roads leave to destinations 100 %, rivers enter and exit [C]; (e) built / map area 0.06–0.25 at every rung (§13.7) [O — FTG's fixed canvas per class] |
| O10 intent, constraints, assignment, forms | should (input schema + drift bounds: must hook) | §7.7 | (a) 10 / 10 scripted intent tasks without URL editing [O]; (b) hard targets 100 %, achieved-vs-requested reported [C]; (c) monotonicity [C]; (d) pins 100 % [C]; (e) assignments ≥ 99 % within drift, infeasibility reported with the nearest count [C]; (f) size error p90 ≤ 10 % [C]; (g) the forms classifier ≥ 90 % over the forms catalogue, `linear-street`, `island-city` and `twin-town` included [C]; (h) edited tables versioned, default path byte-identical [C] |
| O13 full (street names, addresses, annotation) | should | §9 | (b) ≥ 90 % of named streets labelled at neighbourhood LOD [O — no reference names its streets]; (d) 0 spelling errors [C]; (f) annotation layer [C]; (g) addresses 100 % [C] |
| O14 full (rings, presets, wildness, feasibility) | should | §4.9 | (c) wood-edge straightness median ≤ 0.90, canopy monotone in wildness (§13.7) [O — VG's "Some" ≈ "Many"]; (f) ≥ 95 % of the map land-classed [C]; (g) scatter statistics [P] |
| O16 full (thumbnails, drafts, discoverability, responsive, accessible) | should | §7.8 (S0–S4 proxy thumbnails, G-R4), `@plat/app` (§14) | (c) the scripted tasks of §13.4 — share a view link, export a layered SVG, change the coast side, see five variants of one kind, recover from a mistaken regenerate — each in one action where a reference needs a detour, every response ≤ 1 s (replaces "≥ 90 % of testers"; IMP-11) [O]; (e) six thumbnails < 1 s at TOWN [P]; (g) editor usable at 768 px [C]; the accessibility contract (§14, §13.4) [C] |
| O12 extras (relief tier, tiled export, low-end tier) | should | §8.2 relief tier; §8.8 tiled export; the low tier (§12) | as O12 (b), (e); the relief tier renders at every rung and is off by default [C] |
| O7 simulation module | should | §10.1, §10.3 `@plat/sim` (M4b) | the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported; every person a work or role (100 %); the economy and personality content of D-32 derived deterministically from its keys [C] |
| O11 extras (VTT native, per-layer, binary, 3-D, GIS profile) | should | §11 | (g), (h); format validators, CityJSON's included [C] |
| O9 extras (upgrade replay with diff) | should | §7.5, §6.4 retention | the upgrade test; goldens replay under N−1 and N−2 [C] |
| O2 / O6 extras (golden suite, calibration interface) | should | §13.3, §7.6, §13.9 | the declared-shift protocol in CI from M1; every table value replaceable with provenance; the corpus interface of §13.9 present [C] |
| hooks 1–8 (§5.4) | must | 1 addresses + sub-seeds §6.3 / §6.1; 2 lifecycle + edit log + incremental pipeline + conversions §2.8 / §7 / §4.11; 3 assignment input + solver §7.7; 4 context vector + rules as data §2.5 / §7.6; 5 building-generator interface + heights + shadow hook §2.6 / §8.4; 6 layers + drainage + any-boundary neighbourhood + island outlines §2.1 / §2.3 / PART II / §4.2; 7 editable versioned tables + preference layer §7.6; 8 circumstances timeline + stored editable field §7.7 / §4.5 | every hook field declared in the schema of every entity type and populated when used (registry test, 100 %) [C]; zero cost when unused — with every hook unused, the one-click model time and document size equal a build with the hook fields removed within 2 % (a CI comparison) [C] |
| S1 boundary and seam contract | STAGE-2 (must in base) | §2.5 `SeamContract` from M1, §4.12, PART II | 100 % of districts carry a complete contract; portals 100 %; misalignment 0; Hausdorff 0 for shared entities [C]; at M1 the check is schema completeness only (the field is flat until M2b, so its samples are constants) [C] |
| S3 seam-continuous fields | STAGE-2 (must in base) | §4.5 fields with `hard` flags per seam edge | Δ frontage, area and storeys within §13.7's bands on soft seams [O — NG's hoods cannot share a street] |
| S2 context features inside the neighbourhood | STAGE-2 | II.1 (the request's context), II.3 (context features as constraints), §4.8 water furniture, §4.4 intervallum | (a) a context coverage matrix — district context (waterfront, wall-side, slope, bridgehead, gate approach, sky) × generated feature — with no empty cell: every waterfront district has a quay or bank path, every wall-side district an intervallum or a rear-plot rule [C]; (b) 0 buildings in water; bridges within ± 10° of the channel normal [C]; (c) 0 fragments cut at the close-up frame — the surroundings continue at lower LOD to the frame [C]; (d) S2's blind preference test, run as §13.6's protocol against NG at M5 with the owner as the declared rater (IMP-11) [O] |
| S4 composable context templates, functional squares, landmark-centred neighbourhoods | STAGE-2 | II.2 template fabrics, II.3 dispatch table, §4.7 claims, §2.6 footprint templates | (a) every base district kind has ≥ 1 template [C]; (b) the templates' morphologies are separable by generated statistics — a nearest-centroid classifier over §7.7's signature vector, computed per district, assigns ≥ 90 % of template districts to their template [C]; (c) ≥ 90 % of squares on a tier-1 junction or in front of a landmark [C]; (d) typed-square area per 1 000 inhabitants within §13.7's band [C]; (e) a requested landmark delivered ≥ 99 % [C]; (f) rule satisfaction ≥ 95 % [C] |
| S5 NG-class close-up render tier | STAGE-2 | II.4, §8.2 `hatched`, §8.6, §8.4 shadow pass | (a) opening one district at neighbourhood LOD ≤ NG's 10–96 ms at comparable building counts [P]; (b) generation ≤ NG's 64–75 µs and rendering ≤ ≈ 85 µs per building [P]; (c) draw operations per frame and uploads within §12.5's budgets, against NG's 528 uploads per hood and 55–80 % hatch share of operations [P]; (d) the `hatched` style regression — per-wing operation mix and the roof colour law (§8.3) [P]; (e) shadow length ∝ stored height, r ≥ 0.99 [C]; (f) footprint hash identical to the city LOD [C]; (g) city-zoom legibility unchanged with the tier on (B-ZOOM) [C] |
| S6 stage-2 workflow | STAGE-2 | II.4 workflow, §7.1 named actions, §6.1 per-district streams | (a) five variants of one template in five actions, where NG needs a tags dialog or a URL detour [O]; (b) the default path one action with p95 ≤ 0.5 s for a medium neighbourhood [P — NG]; (c) rerolling one district or block leaves 100 % of entities outside it identical in address and geometry, the seam exception of II.4 excepted [C]; (d) addresses, names and footprints preserved across levels, 100 % [C]; (e) 0 hand-offs to another tool [C] |

=== REPLACE §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 ===

## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at five seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b) and
stage 2 (M5). Effort is stated honestly as a range with its basis: about 150–200 expert person-weeks. The subjects the
owner's roadmap puts later are listed at the end with their hooks; nothing else is out of scope.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 75–100 calendar weeks
at that staffing; staffing per the owner (architecture and rulings on Fable seats; build, verify and measure on Opus
seats). Every milestone ends on executed evidence, never on intention, and every exit writes its `MilestoneRecord`
with the milestone's declared shifts and fails on an undeclared one (§13.3). **One rule for the owner's panel at every
gating exit (NF-S2):** M2b ("the base at parity"), M4 ("mastered") and M5 (the stage-2 gate) claim their D-5 verdict only
by a rated pass of §13.6's protocol or by the owner's acceptance recorded in the `D5Record`; if the owner has not rated
within seven days, the build continues on the measured numbers, the milestone's D-5 status is *provisional — not
rated*, the claim is not made, and the panel is offered again at every later milestone and, after M5, with every release
until it is rated (§13.6 (7)).

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal (IMP-8); **the MFCG sweep at five seeds per matched size** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza, and — every ⟨M-1⟩ number of §13.5 (NF-S5) — streetwall continuity on dense frontages, lots per block, T / Y share, intramural dead ends, blocks per ha, inner-lot removal and street-edge recoverability on its plain renders (the metric of §8.5, implemented research-side and cross-checked against the product's implementation on M1's golden renders within 0.01) (MFP-2, MFP-6, MFP-8); **FTG captures at BIG_TOWN and BIG_CITY**, three of each over six days on the free daily allowance, decoded with the existing tools (FTG-16); outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload (FTG-5, FTG-15, NF-S3); NG block counts per template at `medium` from the vertex captures; the variety dispersions of MFCG and FTG (IMP-12); **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (IMP-1) | every §13.5 baseline row present with its provenance — or, for an ⟨M-1⟩ number M-1 could not measure, the row made descriptive and entered in `known-defects.json` by §13.5's ⟨M-1⟩ rule — and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits | 2–3 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit, calibrated on NG's vertex captures; (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1 (the accelerator, or a declared budget amendment); S11's geometry share ≤ 3 µs per plot median; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-permutation determinism for declared batches and issue-order determinism for callback-form stages (§3.3); (b) start position σ within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, block-area and cut-length KS by the band rule — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (LC-19, NF-S1, N-24; §13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items (IMP-2):** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages (IMP-13)** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (the pool stays primary if its CITY p95 ≤ 300 ms and digests are identical for pool sizes 0–3 on 200 seeds, else the single-worker column is declared); the label-tile measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's (IMP-12); the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY); the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7) | 33–43 pw |
| **M2a — the editing core** (D-7: before the second preset) | the document and log with the one replay fold; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which builds it; NF-S6); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 % | 9–12 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs — ridge hairlines by the roof construction, tapered ticks, prism shadows when shadows are on, cobbles as ink stipple, pins as ink symbols, every named way labelled; wings as ink outlines (§8.2; N-23); the relief tier; METROPOLIS, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS (NF-S6); B-ZOOM role continuity across every band switch of `ink` and `lit` (N-23); O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the moving-sun step budget (§8.4); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: M2b's status is *provisional — not rated* and "the base at parity" is not claimed (the rule above) | 33–42 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3); the `packs` block and the link refusal rules (§2.9, §6.4); GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit; IMP-7) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 (7)(v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them — one digest, 0 lost accepted events; §11.3); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; GeoJSON loads in QGIS with districts | 15–19 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2) | 16–21 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit; **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (no pick by the exit: candidate 1 ships as `house`, `ink` stays the default and the pick is offered again, §13.6 (8)) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets; METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people (under 1 s up to ≈ 14 200 buildings); "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release (the rule above); every table value replaceable with provenance | 11–16 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (every person a work or role 100 %; the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported); one hour for 50 000 people ≤ 50 ms; a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` family at all four bands — city (masses in the lit roof tone, ground = paper, the street stripe, wood fills), district (two-tone roofs by `fakeGablePerWing`), neighbourhood (the render tier: tapered hatch, prism shadows, cobbles, chimneys, wells, lobed depth-sorted trees, hood title) and building (per-wing hatching) (§8.2; N-23); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (S2's preference test with the owner as rater) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated (the rule above) | 14–18 pw |

**Effort, with its basis (IMP-2; D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 9–13 | neither reference has it |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 4–6 | one drawing path; no second backend |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 5–7 | §11 |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 7–11 | new in both references |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 4–6 | forms tuned by eye and the D-5 panel |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 8–12 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 7–10 | no reference line covers it |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 7–10 | §13 |
| mechanisms the fix-all pass added that the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine) | 5–7 | the kernel, pipeline and rendering drafts of 2026-09-25 |
| **base subtotal (M-1 – M4b)** | **136–182** | |
| stage 2 (M5) | 14–18 | as before |
| **total** | **150–200** | equal to the milestone sum above |

The round-2 additions — `ink`'s close-up and building band (M2b), `hatched`'s city and district bands (M5), the
ink-family variants (M3b), the records in `plat/goldens/` and the placement digests (M1), the faithfulness campaign
(M3a) — are style sheets over existing paint programs and test tooling already priced in the O12 renderer, the
verification rig and the stage-2 lines, so the ranges stand (PLAUSIBLE).

*Chose* to state the larger, honest total *over* keeping 100–130 by cutting scope *because* the owner asked that nothing
be deferred and that everything be fixed as soon as possible, and the earlier figure left out the content, the app and
the rig that the base contains. The cuts that would shrink it are recorded for the owner's veto, not applied: the
module M4b (8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the
should-have "full" tiers (4–6 pw) — together a base of ≈ 119–154 pw and a total of ≈ 133–172 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a, with Clipper2-WASM as the pre-decided single
engine, §3.7); the straight skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's
re-pricing is the warning); the thin CITY budget headroom (§12); the D-5 protocol's dependence on the owner's time
(§13.6's rater rule answers it: an unrated panel never stops the build and never lets a gate be claimed).

**Staged by the owner (hooks concrete; documented, not bugs to re-find):** stage-3 building compositions (§2.6's
`outline` / `compose` split, cost contract and intake measurement); the village product THORP → HAMLET → VILLAGE (PART
III); sewers and floating islands (II.6); the evolution engine beyond the one built growth path (§4.11); calibration
against the historical corpus (§13.9); SettlementForge inputs (§11.4's host-input contract). Nothing else is out of
scope: CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted service (§11.5),
setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier is a base program (§8.2).

=== REPLACE §17.1 The clean-room chain (IMP-1; D-29) ===

### 17.1 The clean-room chain (IMP-1; D-29)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

1. **Who reads what.** *Research seats* (readers, measurers, the digest writer) may read the findings, `captures/`,
   `research/` and — under the standing ruling — `reference/`. *Implementer seats* (anyone writing code, tables, style
   sheets, content, assets or tests in `plat/`) read only `docs/ARCHITECTURE.md`, the implementer digest in
   `plat/docs/digest/`, the `plat/` repository, published algorithm papers and the public documentation of adopted
   libraries; they never open `research/`, `captures/`, `reference/`, the findings, the critics, `docs/confidence/`,
   `docs/improvements/`, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` or the red-team files. The citations in this
   document are for traceability; an implementer follows them only into the digest. No code from TownGeneratorOS
   (GPL-3), the FTG Foundry module or any captured bundle is read for implementation, ported or paraphrased.
2. **The implementer digest.** A digest seat writes `plat/docs/digest/` from the research: behaviours, measured numbers
   (each with its `baselines.json` id or finding reference) and the creators' stated ideas — no code excerpts, no
   reference word lists, grammars, palettes, tables or identifiers. A separate checker seat, which reads only the digest,
   runs the content scan below on it and files a report with it; every change to the digest repeats the check. This
   document is held to the same rule: the content scan runs over it at every integration pass that changes it — the
   integration log records the result — and again at M-1, and a hit is corrected in the document before the pass lands
   (FTG-22).
3. **The repository boundary.** The product is its own repository, `plat/`, at the root of this folder, outside
   `research/`, `captures/` and `reference/`. A PR-tier CI rule fails any import specifier, fixture path, script path or
   build input that resolves outside `plat/` (symbolic links resolved). The product's CI never reads the research trees.
4. **Reference numbers only through `baselines.json`.** Research-side scripts (`research/baselines/`) measure the
   captures and write numbers with provenance (§13.5's `Baseline` rows); the file is committed into
   `plat/packages/testkit/baselines/`, and the parity CLI reads only it. The D-5 panel is assembled research-side from
   the product's PNG exports and the capture images (§13.6).
5. **The content scan.** Research-side, `research/baselines/make_denylist.py` builds the deny-list from the creative
   data the findings and captures record — the references' naming-grammar rule names and terminal words, Markov and
   corpus sample words, palette colour values, FTG's building-type, profession, item and service identifiers and names,
   FTG's Foundry-module message and field names (FTG-22), and texture and image file hashes. The list holds only salted
   SHA-256 digests: of single normalised tokens (lower-cased, diacritics stripped) that are not in the spell-check word list §9.6 already needs,
   of token 3-grams in list order (so a copied table is caught even when every word in it is ordinary), of exact six-digit
   colour values, and of file bytes. `@plat/testkit`'s clean-room scanner digests the same way every token of
   `@plat/tables`, assets, source string literals and comments and the digest, in the PR tier; a hit fails the build
   unless an allow entry with a written reason is reviewed and added. At every milestone the checker seat also runs a
   research-side palette audit: a shipped palette with three or more colours within ΔE2000 2 of one reference palette
   fails and is redesigned. Every file in `plat/assets` names the script that generated it or its third-party licence
   (fonts); a file with neither fails the build.
6. **Honest provenance.** Every table cell's provenance names where its number came from: `own`, `ref:⟨reference⟩
   ⟨behaviour⟩` (a measured or stated behaviour of a reference, admissible as a calibration anchor — for example the
   castle's 0.75 compactness gate (MFCG), 40 m bridge spacing and 39 m tower spacing (FTG), NG's lane-width law, Poisson
   k = 50), `owner`, `owner-eye ⟨milestone⟩`, `architecture ⟨date⟩`, `corpus` or `host`. A number that describes a
   behaviour is a fact; a list, grammar, palette or table is creative content and is never reused.
7. **The record.** `plat/docs/CLEAN-ROOM.md` holds the rule, the seat ledger (which seat read which research file, from
   the lane logs), the digest checker's reports and the deny-list's generation record (date, sources, counts — never the
   tokens).
8. **Sources of algorithms.** Published: Shewchuk predicates; snap rounding (Hobby; Guibas–Marimont; Hershberger);
   arrangement booleans by winding number; Bridson Poisson-disc; Felkel–Obdržálek and Aichholzer straight skeletons;
   Chaikin; Visvalingam–Whyatt; Parish–Müller growth; Lloyd relaxation; marching squares; priority-flood;
   Garbrecht–Martz flat resolution; fBm. The creators' *stated* ideas: twisted bisection, the casing idiom, skeleton
   labels, the proposal queue, dependency ratios, lazy people, integer centimetres — with constants calibrated on our
   own measurements.
9. **Protocol names (FTG-22).** The host bridge's vocabulary is our own (§11.3): the concurrency token is `logHead`
   (§2.9), carried as `baseLogHead` and `currentLogHead`; time is the view key `time`, set by `view.set`, and the
   simulation module advances it with its own command `sim.advance { hours }` (§10.3, §11.3). Schema-level ideas — an
   event / command split, an optimistic-concurrency token — are admissible as ideas; the FTG module's message, command and
   field names are not reused, are in the deny-list, and occur nowhere in this document (the scan of (2)).

=== REPLACE §17.2 Fonts (IMP-15) ===

### 17.2 Fonts (IMP-15)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

Fonts are third-party assets under the SIL Open Font License and sit outside the clean-room rule: they are neither the
references' code nor their creative data. *Chose* IM FELL Great Primer (OFL) as the default label face *over* a
different serif chosen "for clean-room distance" *because* it is the face of MFCG's labels and part of the ink look the
owner adopted (D-1), and clean-room distance applies to the references' code and content, not to a public OFL font;
EB Garamond and Cinzel ship as alternatives. Fonts ship unmodified; CI reads each face's name table and refuses to
subset a face that declares a Reserved Font Name; the OFL text ships in the notices file. Label metrics are read from
the bundled files (§9.2). The bundled faces are TrueType-flavoured (`glyf`), whose outlines SVG's default text writes
(§11.1); when the default face lacks `smcp`, the family's OFL small-caps cut is bundled unmodified beside it (§9.2); an
SVG export may embed a face unmodified as a data URI (§11.1). CI checks all three (§9.2).

=== REPLACE Delegated decisions (the owner deferred all judgment; each is final unless vetoed) ===

# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

For each decision: the choice, the rationale in plain words, the alternative rejected, and what it would cost to
reverse later. D-1–D-7 are the owner's adopted defaults (amendment 7), each clause now tied to its mechanism. Decisions
marked *owner veto* touch a subject the owner keeps (a purchase, the licence, new capability): the program has taken
the most option-preserving default and flags it.

| id | decision (final) | rationale in plain words | alternative rejected | cost to reverse |
|---|---|---|---|---|
| D-1 | **Default look = clean ink (MFCG family) with IM FELL Great Primer as the label face; second preset FTG-like `lit`, on Canvas2D like every preset; a hatched preset for the close-up; the house style (the owner's "later") = our own third preset `house`, drafted as three candidate style sheets at M3b and chosen by the owner on the §13.6 panel at M4, `ink` staying the default unless the owner picks otherwise; with no pick by M4's exit, candidate 1 ships as `house` (never the default) and the pick is offered again at every later panel (§13.6 (8))** | the ink map is the most legible and best-loved default and the cheapest to prove first; `lit` on the one drawing path really is "a style file, not an architecture" (IMP-3, VIS-7); the face is MFCG's label signature and an OFL asset outside the clean room (IMP-15) | lit default; a WebGL2 reference backend for `lit` | low (a style file) |
| D-2 | **Era and region centre of gravity = high-to-late medieval Western Europe (12th–15th c.)**, as presets the corpus phase re-signs through §13.9; walled shares and stage rows per rung MFCG-calibrated (≈ 0.9 of buildings inside the outermost wall, §4.2 S2), FTG's lower walled share reachable as a preset | the owner's adopted default; "the corpus refines later" is the owner's staging, and §13.9 is its interface | a hard-coded culture; a 0.35–0.5 walled share (MFCG's shanty case) | low (table rows) |
| D-3 | **Realism in the base; fantasy only as named toggles, each off by default**: floating islands and their conjured rivers (II.6), fantasy sewers (II.6), the game-system stat pack (D-32), the `night` preset's lights | the owner's default; realism is what the corpus can calibrate | fantasy defaults | low |
| D-4 | **Browser-first embeddable TypeScript library with an app on top; permissive dependencies only (§17.4's checker over the production closure); one generation worker, a derivation pool and a tile worker behind a handle-based API (§11.2)** | one language; the reference evidence is JavaScript-shaped; embedding needs no server; permissive licences keep our own licence open (D-22) | a Rust / WASM core from day one; server-side generation | medium after M1 for the core language — a measured hot loop may get a byte-identical WebAssembly accelerator (§3.7), there is no WASM kernel; low for the worker model |
| D-5 | **"Mastered" = the owner's eye on side-by-sides against MFCG and FTG at town / city / metropolis, run through the written blind protocol of §13.6 (seeds fixed beforehand, matched sizes, three questions, a pass rule, a filed record), plus the parity numbers of §13.5; a panel the owner has not rated lets the build continue with the milestone's D-5 status *provisional — not rated*, and "at parity", "mastered" and the stage-2 gate are claimed only by a rated pass or the owner's recorded acceptance (§13.6 (7))** | the owner's default; numbers alone miss charm, eyes alone miss statistics; the protocol makes the eye repeatable and unsteerable (IMP-4, IMP-11) | numbers only; an eye with no protocol | none |
| D-6 | **Original English-fantasy naming; setting packs in §10.4's format, the base shipping one pack; further packs are data** | the owner's default and the clean-room rule; "setting packs later" now means later contents, not a later format (DEF-10) | reuse of reference corpora | low |
| D-7 | **Improvement weighting: realism, editability, plot texture first; speed and export next; novelty last — and it orders the build: the editing core (M2a) before the second preset and the rest of parity (M2b)** | the owner's default; it decides ties in the build plan, and now visibly does (IMP-3) | speed first; editing after the lit look | none |
| D-8 | **3-D export = glTF 2.0 (OBJ secondary) and CityJSON 2.0** | the widest tool support for VTT and game users; CityJSON's integer vertices with a transform carry our centimetre lattice losslessly, so its exporter is thin (§11.1) | CityJSON left for later | low (an exporter) |
| D-9 | **"No restart path" is a design property; the acceptance numbers are requested-feature delivery by ladder tier (a tier-6 omission of a requested feature is a failure, target 0; degraded ≤ 5 %) and p95 time per delivered town on MFCG's worst configurations (≤ 1.0 s against MFCG's 3.7–4.0 s)** | "0 restarts" was true by construction and measured nothing; these two numbers compare with what a user gets from MFCG (IMP-5); a bounded restart tier would still hide feasibility bugs, and the omission count exposes them | "0 whole-map restarts" as the number; a p99-bounded restart tier | low (criteria) |
| D-10 | **Simulation depth in the base = roster, context vector, allocation and placement, households and lazy people, with the relation store's schema in the base from M1; schedules, calendar, factions' meetings, events, economy and personality in the optional `@plat/sim` module, its own milestone M4b** (IMPROVEMENTS J-S kept; the product proposal's widening rejected) | the map never waits for a simulation; with the schema in the base the module materialises data without changing the model (FTG-9); its own milestone keeps it from crowding hardening (IMP-3) | schedules and the calendar in the first release; the module inside M4 | low |
| D-11 | **Poisson-disc k = 50, all candidates evaluated, builds the per-class ranked tiles once per session; per-instance placement is the stamp (§8.10)** | matching the recorded scatter costs nothing per tree once the tiles exist; a measurement (NN p1, pair-correlation) may relax it | k = 30; per-entity Bridson sampling | trivial (a table value) |
| D-12 | **Integer centimetres centred on (0, 0), +y north; range invariant 2²³ cm** | exact geometry on every machine; FTG's proven convention; six-fold headroom over the largest frame — METROPOLIS at the population cap and the extreme aspect (§3.2 (1)) | millimetres; doubles | high after M1 |
| D-13 | **Five refinement levels as views of one arena per layer (level-tagged edges, per-level face records), a separate arena per layer and per sky island, unions for multi-face entities** | locality of edits and regeneration is a tree walk; nesting exact by construction; each boundary stored once; sky and underground never cut ground faces | one flat subdivision; five separate per-level DCELs (nesting cannot hold on the lattice, GEO-1) | high after M1 |
| D-14 | **Booleans, buffers and bands on the kernel's own arrangement — one engine on every host; Clipper2 and `polygon-clipping` as CI oracles only; the straight skeleton built in-house under §3.8's contract and validator; the M0 bars and pre-decided fallbacks in §3.7–§3.8 (Clipper2-WASM as the single engine; the downgrades as the default paths)** | one engine means one digest on every host (GEO-9); no permissive, mature skeleton library exists | CGAL (GPL); a JS skeleton port; a runtime pure-JS boolean fallback (a second engine, different digests) | low (adapters) |
| D-15 | **xoshiro128\*\* streams keyed from structured components (seed key, entity lineage, stage, concern, reroll, attempt, epoch, salt), the lineage separate from the address id, concern ids append-only; Enter = a new document with seed + 1** | locality, feature growth without reshuffling across concerns, epochs; no BigInt | one global stream; a counter-based RNG | high after M1 |
| D-16 | **The fused layout = routed arterials between named destinations; reservations and gate sites at S3 and each enceinte traced before its stage's growth; inside the walls district-scale secondaries plus NG's bent-cut infill with the measured construction, outside them FTG-shaped growth with explicit legality and stage regimes; districts grown over the coarse skeleton, feature-named and grouped into quarters; frontage-first plots with the granularity law** | the owner's "best of both" under the tiebreaker: constraints and metres for the streets, MFCG's street signature inside the walls, FTG's accretion outside; M0 measures the risk and M1 re-measures it on real terrain | the four rejected shapes of §1.4 and §4.4; FTG growth down to block scale inside the walls | high (the layout core) — hence M0 and M1's gate |
| D-17 | **Enceinte = gate sites picked and castle and plaza reserved at S3; stage 1's enceinte traced at S3 from the travel-cost boundary over its solved gate routes, each later enceinte at S5a from its stage's boundary, both pulled to defensible ground before that stage's streets grow; gates exactly at arterial crossings with exact N by the measured gate law; gate plazas; castle by score with the inside / on-enceinte / outside option; an open waterfront by default** | defence as an explicit constraint; MFCG's wall-first order and gate identity; FTG's staging | a wall on cell edges; tower-per-vertex; walls traced after growth | low |
| D-18 | **Budgets per §12.3 as per-rung laws of the building count — model p95 TOWN ≤ 20 ms + 60 µs × B, CITY ≤ 40 ms + 50 µs × B, METROPOLIS ≤ 100 ms + 52 µs × B (100 / 300 / 800 ms at the targets) — with the derivation pool as the primary configuration and the single worker as the pre-decided fallback (measured at M1 at CITY and at M2b at METROPOLIS); time to first map per §12.5 — TOWN ≤ 40 ms + 70 µs × B, CITY ≤ 60 ms + 60 µs × B, METROPOLIS ≤ 120 ms + 62 µs × B — under one second for every TOWN and CITY and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), ≈ 2.3 s at the 120 000 cap, a declared miss of O12 (g); a per-building cost ≈ 2 × MFCG's at TOWN and CITY and ≈ 5 × at METROPOLIS declared as a trade (§12.9)** — *owner veto on the miss above the knee* | the one-click floor and the references' bars; the trade buys terrain, plots, site plans, roster placement, greenery and labels MFCG does not build, which D-7 ranks above speed; size follows population inside a rung, so the budgets are laws, and the one-click path stays complete at every size | workers assumed without a merge protocol; matching MFCG's per-building cost by dropping plot detail; a preview or a coarser one-click path above the knee | low (numbers); ≈ 1 pw for a district-by-district city band above the knee; medium (architecture) if M0 or M1 miss |
| D-19 | **Codename PLAT and `@plat/*`; terrain resolution 5 / 8 / 10 m; frame areas 4 / 25 / 64 km² with aspect 0.5–2 (square by default) + 30 % margin, the side scaling with √(population ÷ target); min edge 25 cm with attraction at 26 cm; min plot width 2.5 m; min plot angle 12°; the district band derived from the count law; the gate law `round(1 + 0.47 √A_ha)`; stage counts and walled shares per rung (§1.1, §4.2 S2); shadows off by default with a fixed sun; heights always populated; tower spacing and every band as calibratable table rows** | defaults and calibration anchors that cost nothing to change | — | trivial (data) |
| D-20 | **Effort ≈ 150–200 expert person-weeks: the base 136–182 (the content module included) plus stage 2 14–18, re-derived line by line in §16; the cuts that would reduce it to ≈ 133–172 recorded for the owner's veto, not applied** | the earlier 100–130 left out content authoring, the app, the test rig and FTG's non-map scope (IMP-2); the owner asked that nothing be deferred | 100–130 pw; cutting scope to hold it | none (an estimate) |
| D-21 | **The document persists a base (the recipe, or a rebased state) and the ordered log, with a digest-verified snapshot cache; one replay fold; a rebase when a saved state is kept; output versions N−1 and N−2 retained in the browser and every version in the CLI; an upgrade is an undoable event** | loads are instant, links never silently change, and a mismatch is always reported and resolved once | events only; "the last N minor versions stay replayable" with no mechanism | low |
| D-22 | **Our own licence: proprietary, all rights reserved to the owner, until the owner chooses (§17.3); no dependency may constrain the choice** — *owner veto* | an open licence cannot be withdrawn once granted, while a proprietary default can be opened by one act — the most option-preserving default (DEF-14) | leaving it undecided; an open licence by default | low (a licence file) until code is published |
| D-23 | **Deterministic transcendentals through `dmath` — our TypeScript port of the fdlibm 5.3 routines with Sun's notice — with an allowlist lint (exact `Math` members only; `**` only with literal exponents 0–4, rewritten to multiplications; `ratio()` for computed divisors) that also scans vendored dependencies** | the same digest on every engine; a vetted algorithm, and no 94-package `@stdlib` closure (IMP-14); the lint makes the rule enforceable (J-11) | in-house polynomial approximations; trusting the engine's `Math.*`; the `@stdlib` packages | low (one adapter and one lint rule) |
| D-24 | **Goldens are stage-isolated (new stage code on frozen upstream outputs) and built at M1; end-to-end goldens are re-signed only with a cascade record; every milestone files its declared shifts; a same-seed output change is never let ride silently** | the owner's non-negotiable as a mechanism from the first viewable town, not from hardening (LC-19) | one whole-model hash per seed; goldens at M4 | trivial (test tooling) |
| D-25 | **The evolution hook in the base is exactly one built and tested path — add a growth stage to an existing town, with wall → ring road as a typed conversion — plus the epoch key component and the transformation-event vocabulary, decline included; the evolution engine is staged by the owner with its interfaces concrete (§4.11)** | it is the path "regenerate this area" uses, so it costs little and proves the persisted plat extends; the owner's roadmap puts the engine later | no incremental path; the full engine now | low |
| D-26 | **Identity: opaque lineage-hash addresses with survival and succession (§6.3)** | an address must not depend on creation order, lazily derived districts or worker scheduling (J-DET-1) | hierarchical creation-order ids; a per-kind counter | high after M1 |
| D-27 | **Work limits, never wall clock, bound every output-affecting budget (§5.1)** | a watchdog would make one seed give different towns on different machines (J-DET-3) | wall-clock watchdogs | low |
| D-28 | **The model digest is a Merkle root over the eager model's content only, maintained at batch commit (§6.2)** | the canonical serialisation costs ≈ 1.2 s per CITY model and provenance must not move goldens (J-DET-4, J-DET-5) | hashing the canonical serialisation per batch | high after M1 |
| D-29 | **The clean-room chain (§17.1): implementers read only this document and a checked implementer digest; the product in its own repository `plat/` with a path rule; reference numbers only through `baselines.json`; a hashed content deny-list scan in CI and a palette audit per milestone; reference-derived constants labelled by origin; a seat ledger in `CLEAN-ROOM.md`** | the owner's clean-room ruling must hold by mechanism, not intention; the findings quote GPL code and reference data, so they cannot be implementer inputs (IMP-1) | findings and captures as implementer inputs; path-only CI rules | low (process) — in place before M0's code |
| D-30 | **Every threshold has a number now: reference-settable bands by §13.5's band rule from `baselines.json`; the thresholds no reference can set in §13.7, each with a provisional number, the first milestone that confirms it and a pre-decided fallback; no placeholder can gate or pass** | "set later by the corpus" left M2 unable to exit or invited silent promotion of placeholders (IMP-6, DEF-1) | placeholders set by the corpus phase (the earlier reading of J-T, which §13.7 now defines as a numbered calibration rule) | trivial (data) |
| D-31 | **Matched references: TOWN = MFCG size 40 and FTG BIG_TOWN (≈ 5 600); CITY = MFCG size 80 and FTG BIG_CITY (24 500); METROPOLIS = MFCG size 130. FTG's premium METROPOLIS is not purchased: the METROPOLIS side-by-side uses MFCG 130, with FTG's published metropolis pictures as an unscored reference card; a one-month premium FTG subscription for one measured capture is the owner's option** — *owner veto* | matched on building count (MN-2) and population (FTG-16); the free captures cover two of three rungs; only the owner can make a purchase | a CITY-only FTG comparison; a purchase by the program | low (one capture day if the owner buys) |
| D-32 | **Economy (resource chains, items and services with prices, stock per building, global price edits), personality (trait sentences, motivation, mannerism, hobbies), education gated by class and a stat block with profession modifiers are `@plat/sim` content (M4b), derived from their keys with our own authored tables; their schema stubs are in the base (§10.3); the stat block is a named game-system pack, off by default (D-3); the family-tree view is in the app (§14)** — *owner veto: new capability rather than repair* | the owner's definition names FTG-class "roster-first population and economy", FTG parity includes them, and the module keeps them off the one-click path (COV-FTG-B10, C03, C11) | leaving them unrecorded; putting them on the one-click path | low (module content; dropping it removes ≈ 2–4 pw from M4b) |
| D-33 | **The two ladders meet at 1 500 inhabitants: the village ladder THORP → HAMLET → VILLAGE ends there and the base's TOWN band starts there (1 500–10 000); size within a rung follows population; per-rung rows live in `ladder.json` (§1.1); a request below 1 500 routes to the village product (clamped and reported while none is registered), one above 120 000 is clamped and reported** | the owner's two ladders and "size follows population"; no gap or overlap exactly where MFCG's creator admits its small towns fail (COV-VG-VN-088, AM-4) | an undefined boundary; a 2 000 floor leaving a gap below the base | trivial (data) |
| D-34 | **Three CI tiers with wall-clock budgets (PR ≤ 15 min, nightly ≤ 4 h, milestone ≤ 12 h) on a stated runner; the oracle once per sequence; an over-budget job is split, never re-capped (§13.8)** | a 10–20 CPU-hour rig cannot gate a change; the owner's efficiency standard asks for structural shortening (SCL-18) | one full run per change | trivial |
| D-35 | **Build order: M-1 → M0 → M1 viewable town → M2a editing core → M2b parity (the second preset, METROPOLIS) → M3a full editing, migration and API → M3b exports, forms and should-have tiers → M4 hardening and the incremental path → M4b the content module → M5 stage 2; nothing leaves the program** | the owner's weighting orders the build; M3 was overloaded (≈ 31–40 pw itemised against 20–26); the module needs the relation store first (IMP-3) | the lit look before editing; moving exports, forms or the module out of the program | low (a plan) |

=== REPLACE Judgment calls ("chose X over Y because Z"; each vetoable) ===

# Judgment calls ("chose X over Y because Z"; each vetoable)

> PENDING FABLE REVIEW — revised by opus stand-in; drafted by fixall/draft-scope-r2

J-1 – J-18 are the synthesis seat's (seven amended by the fix-all pass). The rows added on 2026-09-25 keep their
area prefixes — J-K (kernel), J-DET (determinism), J-P (pipeline), J-R (rendering), J-S (scope) — because the blocks
that made them cite them by those ids; the full reasoning of each sits in the section it names. The J-I rows are the
integration seat's: each settles a disagreement between two area drafts (the record is
`docs/validation/fix-all/r1-integration-log.md` §3). Round 2 of the fix-all pass added J-K9 – J-K21, J-DET-16 – J-DET-28, J-P26 – J-P33,
J-R19 – J-R37 and J-S20 – J-S27, and restated J-K2, J-K5, J-K6, J-K8, J-R7, J-R9, J-R17, J-I2, J-I5, J-P3 and J-S4.

| id | call |
|---|---|
| J-1 | Chose the kernel proposal as the base over the improvement winner because it wins two lenses and the sum, ships the fusion as the owner stated it, and its defects are paragraph-sized repairs; the product proposal's mechanisms were grafted, not its skeleton (`docs/design/judging.md` §2). |
| J-2 | Chose to type districts and solve the fields **before** the bent-cut infill (the parity judge's sequencing repair) over reading the stage regime alone, because a poor quarter's blocks should be smaller than a rich one's and the stage regime is only the floor. |
| J-3 | Chose FTG-shaped growth for the secondary streets outside the walls over least-cost connectors (the pipeline proposal's default) because the owner asked for the best of both and the measured suburb signature (cul-de-sacs, 30 m streets, 14.7 m lots) is unreachable by routing alone; inside the walls the bent cut does the street work (J-P4); the fusion gate guards the cost. |
| J-4 | Chose plat-tree scoping as the primary locality mechanism with the dependency graph as audit and optimisation, over the DAG as primary, because tree scoping is sound by over-invalidation and the DAG is sound only when every spatial read is declared — the CI oracle proves that per stage before the DAG is trusted. |
| J-5 | Chose a 128-bit key hash and 32-bit-lane mixing over SplitMix64 or a 32-bit key because JavaScript lacks native 64-bit multiply and a 32-bit key collides with probability ≈ 0.25 per city (the engineering judge's arithmetic). |
| J-6 | Chose `FaceRef` unions with L2 half-corridor strips and junction wedges over restricting the nesting invariant, because a strict tree makes scoped regeneration and containment proofs trivial and the union costs one indirection; nesting is exact by construction because the five levels are views of one arena per layer (J-K1), checked by index, not by coordinates. |
| J-7 | Chose batched transactions (stage / district / block / edit) over per-insertion transactions; static indexes are rebuilt at stage end per partition, never per batch (§3.3, J-K6), because per-batch rebuilds of a growing level cost seconds (1.9 s at S10, 13.4 s at S11 at CITY, measured). |
| J-8 | Chose a snapshot-plus-replay document over events-only because loads must be instant and a version may be unavailable; the digest verification keeps events-only's honesty. |
| J-9 | Chose IMPROVEMENTS' J-S scope for the simulation over the product proposal's widening because the one-click path must never pay for it and nothing is lost by building the module second (D-10). |
| J-10 | Chose Poisson k = 50 over k = 30 because the critic ruled the references evaluate 50 and scatter is render-time; the ranked tiles are built once per session (§8.10); a measurement, not an assertion, may relax it (D-11). |
| J-11 | Chose `dmath` from an fdlibm port over in-house polynomials because a vetted algorithm is less risk for the same determinism; the lint makes the choice enforceable; the port is our own TypeScript of fdlibm 5.3 (D-23). |
| J-12 | Chose one generation worker plus a derivation pool for the per-district stages, with the merge protocol written first (§4.1) and the pool primary once M1 measures identical digests for pool sizes 0–3 (§12.3), over worker pools assumed in the budget with parallel mutation of one subdivision unspecified, because after the eager allocation the per-district stages are pure functions of eager upstream state and their own sub-streams. |
| J-13 | Chose to write the greenery rule table, the monotone-control mechanism, the control-surface budget, the forms catalogue schema and the intent-expansion example in this document over deferring them to validation, because the improvement judge listed them as gaps no proposal fills and each is a must-have letter or a keep-test. |
| J-14 | Chose to schedule CONFIDENCE §6's experiments #5 and #10 (no recording needed) and #2 as milestone M-1 — with FTG's two free sizes, MFCG's five-seed sweep, the variety baselines and the clean-room inputs (§16) — over starting M0 with placeholder constants, because they set the stop laws and bands every spike is measured against and cost two to three person-weeks. |
| J-15 | Chose to re-cut M1 to the viewable town only and to state 150–200 pw (D-20) over the proposals' 60–90 and the synthesis draft's 100–130, because the per-reference floors bound the base from below and the content, app and rig lines were missing (IMP-2). |
| J-16 | Chose the anchor rule with `supersedes` on top of lineage-hash addresses (J-DET-1) over ids by creation order alone, because edits and regeneration must keep addressable ids (the assignment hook) while a feature added inside a stage may legitimately shift its siblings — stated as a declared golden shift, never a silent one. |
| J-17 | Chose to keep the kernel's `PLAT` codename over a new name because the winner's structure is the document's structure; the name is a placeholder (D-19). |
| J-18 | Chose to run this lane on a relayed status question (recorded in §0.3 and `docs/design/judging.md` §0) over returning without files, because returning would have sent eleven downstream seats at a missing document. |
| J-K1 | Chose one arena per layer with the five levels as views over five separate per-level DCELs, because nesting cannot hold on the lattice across separate structures (GEO-1) and each boundary is stored once (§2.2). |
| J-K2 | Chose vertex, segment and stretch attraction at 26 cm — an incoming vertex moves at most √2 · 26 ≈ 36.8 cm, onto an edge's endpoint when its foot lies within 26 cm of it — over a 5 cm weld beside a 25 cm minimum edge, because the 5–25 cm band was neither welded nor legal (GEO-3) (§3.6). |
| J-K3 | Chose role and owner tables with resolved views over stored face and edge slots in entities, because stored slots go stale on every edit (GEO-5) (§2.2). |
| J-K4 | Chose booleans, buffers and bands on the kernel's own arrangement, one engine on every host, over Clipper2-WASM with a pure-JS fallback, because two engines give two digests for one seed (GEO-9) (§3.7). |
| J-K5 | Chose an in-house straight skeleton under a numeric contract and a four-part validator, with exact OBB roofs for convex near-rectangles, over adopting a port, because no permissive, mature port exists and every output must be checkable (§3.8). |
| J-K6 | Chose static indexes rebuilt at stage end per partition, with query results sorted by a total canonical key per item kind, over per-batch rebuilds, because per-batch rebuilds of a growing level cost seconds (§3.3). |
| J-K7 | Chose `Int32` centimetre heights relative to a per-document datum over `Int16` heights above a fixed datum, because `Int16` wraps above ≈ 327 m of relief (GEO-15) (§2.3). |
| J-K8 | Chose no WASM kernel — a byte-identical WebAssembly accelerator only for a hot loop that misses by more than 2× or breaks its stage row, a declared budget amendment for a smaller miss — over a WASM kernel behind the façade, because a second implementation must reproduce every output bit and is worth it only where the budget needs it (§3.7). |
| J-K9 | Chose role-carrying vertices for every entity-held vertex and role signatures for log positions over persisted lattice points re-bound by distance, because a role travels with its vertex through splits, merges and warps and distance alone cannot tell the intended vertex from an unrelated one (GEO-5) (§2.2). |
| J-K10 | Chose knot profiles for varying chain attributes over arc-length profiles from the chain's start, because rings have no stable start and a warp or an inserted junction would slide arc-length breakpoints off their features (VK-2) (§2.2). |
| J-K11 | Chose to promote a finer vertex a coarser batch lands on over clearing and re-deriving the neighbour's finer content, because promotion keeps the neighbour's plots byte-identical and moves nothing (VK-18) (§2.2). |
| J-K12 | Chose one hydrology grid over frame and margin at 16 / 25 / 32 m over a frame-only grid and over the margin at the old cells, because the cell count and measured cost are unchanged and the margin gets defined flow (VK-9) (§2.3). |
| J-K13 | Chose a magnitude-triggered flush at 2⁵² from the range invariant for `area2` over flush intervals derived from the frame table, because it is exact for every ring `snap` admits and ordinary faces never pay a BigInt addition (VK-8) (§3.2). |
| J-K14 | Chose to keep finer content an earlier stage made, as an obstacle with `E_KEPT`, over letting a coarser batch clear it and re-running the earlier stage, because the wall is built before the fabric it shapes and re-running S7 per district would repeat and ghost the band (VK-1) (§3.3). |
| J-K15 | Chose two transaction forms — declared op sets in canonical order, callback sequences in issue order — over one canonical order for every batch, because a recursion plans each op on the faces the previous op made (VK-6) (§3.3). |
| J-K16 | Chose read-only transferred arena copies with one copy-on-write overlay per district and a lineage-order merge over a `SharedArrayBuffer` arena written in place, because shared memory needs cross-origin isolation in every embedding page and in-place writes would need locks whose order could leak into the output (VK-3) (§3.3). |
| J-K17 | Chose an endpoint rule and one constrained placement rule for every new vertex on an existing edge over plain nearest-point rounding, because two roundings can stack into an edge the hard invariant rejects (GEO-3) (§3.6). |
| J-K18 | Chose to slide a vertex along the fixed coarser route it lies on under a warp over holding or freeing it, because holding makes every shore-side warp a no-op and freeing breaks the Steiner invariant (VK-7) (§3.6). |
| J-K19 | Chose a strict oracle comparison on unattracted cases and an attraction-radius bound on attracted ones over normalising the oracles through our own insertion, because normalised oracles would stop being independent (VK-4) (§3.7). |
| J-K20 | Chose S11's geometry share (≤ 3 µs per plot) as the kernel's M0 bar over a looser `offsetFace` bar, because a kernel bar looser than its stage could pass while the stage missed by 2× (VK-5) (§3.7). |
| J-K21 | Chose a convexity gate on the exact OBB roof path over a post-check of each roof line, because convexity makes containment true by construction and a notched footprint's roof is the skeleton's job (VK-10) (§3.8). |
| J-DET-1 | Chose opaque address ids whose token is the hash of the entity's lineage key over hierarchical creation-order ids and over a per-kind high-water counter, because a hierarchical id breaks under re-parenting and recycles dead ids, and a counter depends on the order in which lazily derived districts and parallel workers mint, while a lineage-hash token is the same in any order; the tombstone check keeps "never reused" (§6.3). |
| J-DET-2 | Chose to keep the lineage (and so the draws) only for entities that survive un-derived, and to hand only the address to an anchor-matched successor, over carrying the lineage in both cases, because New random must really re-roll its scope while names, locks and assignments must follow the building the user means (§6.3). |
| J-DET-3 | Chose operation-count work limits for every output-affecting budget over wall-clock watchdogs, because a watchdog makes one seed give different towns on slow, throttled or busy machines; wall clock only postpones or resumes lazy work (§5.1). |
| J-DET-4 | Chose a Merkle digest maintained at batch commit over hashing the canonical serialisation, because the serialisation costs ≈ 1.2 s per CITY model (measured, SCL-1) and would run thousands of times per generation; the canonical text stays for golden files and exports (§6.2). |
| J-DET-5 | Chose to keep version stamps, rule slices, derivation inputs and deps out of the model digest (a separate provenance digest) over hashing whole entity records, because otherwise a release that changes no output changes every digest (§2.8, §6.2). |
| J-DET-6 | Chose one ordered replay fold — drawn constraints, epochs, rebases and upgrades applied at their log positions — over hoisting drawn constraints before their stage, because hoisting makes every reload regenerate a different town than the one on screen; hoisting survives only as the explicit "Rebuild around my drawings" rebase (§7.2, §7.4). |
| J-DET-7 | Chose a `rebase` event when a saved state is kept over leaving the recipe and log unchanged, because otherwise every later load, undo and migration silently switches back to the other state (§2.9). |
| J-DET-8 | Chose scoped undo records and cost-driven checkpoints over an eight-deep ring of whole-document snapshots, because one CITY snapshot is ≈ 80 MB (SCL-5) against a ≈ 100 MB heap (§7.4). |
| J-DET-9 | Chose output versions that bump only with a declared shift, with N−1 and N−2 retained as lazy browser chunks and every version installable in the Node CLI, over "the last N minor generator versions stay replayable", because a server-less browser library needs a concrete shipping mechanism and most releases change no output (§6.4). |
| J-DET-10 | Chose to make an edited attribute implicitly pinned (IMPROVEMENTS O9's rule) over protecting only locked entities, because users refuse to reroll districts holding work they "already baked in" and FTG's regenerate deletes it (§7.2). |
| J-DET-11 | Chose lock > assignment in the precedence order over assignment > lock, because the owner's hook asks precedence over the generator's class rules, not over the user's own locks; a host that must override a lock sends an unlock first, which the log records (§7.7). |
| J-DET-12 | Chose to recompute the prosperity, density and greenery fields on load over persisting their rasters, because the rasters gzip to 2.7–11 MB (SCL-11) against 3–8 MB document budgets while the drivers and strokes that define them are tiny (§2.9). |
| J-DET-13 | Chose to state control monotonicity and continuity over 50 seeds per step with a fixed ε formula over a per-seed ε, because the design's discrete stop rules make single seeds jump by construction; a per-seed test would fail or be tuned to pass (§7.8). |
| J-DET-14 | Chose to make `drawBoundary` snap to whole L1 cells over creating invisible `district_bound` edges through blocks, because every seam edge must be typed street, water, wall, field, cliff or frame for stage 2's `SeamContract` (§7.1). |
| J-DET-15 | Chose MFCG's whole-map Rotate as a view rotation with a compass that points at model north by default (and can be decoupled) over rotating model coordinates, because wind, sun, aspect and slope read model north and GeoJSON must stay in the model frame (§7.1). |
| J-DET-16 | Chose undo and redo as logged events applied at the head through the same fold, with per-session stacks and a conservative independence check, over removing the last event from the log, because a host-stored log only grows and every client must fold the same events; removal survives only as the unshared-document truncation, which leaves the model digest unchanged through a canonical `nextSeq` (§7.4, §2.9; NF-D1). |
| J-DET-17 | Chose to copy every non-shipped setting pack's content into the document and to refuse links that need it or host content, over recording packs by id and version only, because a pack missing on the opening machine can only fail or rebuild another town; the link offers the `.plat` file or `&doc=` instead (§2.9, §6.4, §7.6; NF-D2). |
| J-DET-18 | Chose an upgrade's undo record to be its `from` output version (undo = a replay under the retained version) and a rebase's to be its previous base (the recipe always; an older rebased state only under the undo cap), over storing whole pre-upgrade models outside the cap, because one METROPOLIS model exceeds the 8 MB document budget while the replay reproduces it exactly; past the window or the cap the undo is withdrawn with a notice and the CLI command (§7.4, §7.5; NF-D4). |
| J-DET-19 | Chose content-addressed snapshot chunks per static-index partition, shared between `base.state` and `model`, over a bespoke delta encoding of `model`, because the partitions already exist for the indexes and the checkpoints and deduplication by hash is exact; saving always writes `model` (§2.9; NF-D5). |
| J-DET-20 | Chose to compare each scope entity's identity-free content digest after New random and advance its reroll up to three more times, keeping the old reroll and reporting when nothing changes, over trusting that a fresh reroll always changes the scope, because a full ladder does not imply a different result on minimal scopes (§5.1 (6); NF-D6). |
| J-DET-21 | Chose to run S13a's scoped delta at each event's log position in replay mode, suppressing only S14 and S13b, over one S13a pass at the end of a replay, because name uniqueness is resolved scope by scope in log order and label events address records S13a creates mid-log; one end pass makes replay differ from the session (§7.3; N-1). |
| J-DET-22 | Chose to remove `labels` from the rerollable concerns and to make rerollability a registry property checked for a reader, over adding a seeded tie-break to label placement, because label candidates are geometric and placement is a deterministic greedy over a total order — view data that should stay a pure function of the model and the zoom stop (§6.1; N-18). |
| J-DET-23 | Chose to make S1's water operator re-site the crossings of the re-traced reach and chain S4, S5, S6 and S7, with F-REDERIVE's way rungs (re-route through a deck, else cut at the bank and prune the stub; a deck over land becomes ordinary road), over declaring every reach edit a Re-derive from S1, because moving a river must stay local while bridges follow it and no road is left running into the water (§7.3; LC-7). |
| J-DET-24 | Chose the terrain brush's `water: 'locked'` default with water and locked footprints masked, drainage re-run into the drainage arrays only, and exact re-basing of everything on the changed ground, over letting every terrain stroke re-trace rivers, because the brush is mostly used to shape ground and a river move re-routes roads — an edit the user chooses with `follow`; exact over tolerance-based re-basing because it costs microseconds per entity (§7.2, §7.3; LC-7). |
| J-DET-25 | Chose work limits as laws over the batch scope's population-derived counts over fixed counts per rung, because size within a rung follows population across a 6.7× (TOWN) or 4× (METROPOLIS) band, so a fixed count fires F-WORK systematically at a band's top and is slack at its bottom; the counts are model values fixed before the batch runs, so limits stay deterministic and a scoped re-run gets the limit its scope had (§5.1 (5); NF-S10). |
| J-DET-26 | Chose grid-bucketed nearest-neighbour succession matching per kind and class family, with a ≤ 2 µs-per-entity budget (measured 0.4–0.6 µs) and district-partition-first matching as the declared-shift fallback, over an unspecified "nearest anchor" search, because the same routine serves regeneration, Re-derive from S1 and the upgrade mapping and needed a stated cost (§6.3; NF-D7). |
| J-DET-27 | Chose, for a control that fails its sweep, a smoothstep over the failing interval of its expansion row and then a declared discrete control, over widening ε until it passes, because a widened ε hides the jump the user sees while the discrete declaration tells the truth (§7.8; NF-D7). |
| J-DET-28 | Chose to require byte identity of the WebAssembly accelerator only, and to admit the Clipper2-WASM fallback as a declared golden shift checked by cross-host digest identity, over requiring byte identity of both, because the fallback engine computes different integers by construction and would otherwise be unshippable (§6.5 (10); VK-13). |
| J-P1 | Chose feature-named district kinds over class-typed kinds because MFCG's live taxonomy dropped class wards and its townspeople lived where they worked (§2.5). |
| J-P2 | Chose a quarter level for city-LOD labels over thinning district labels, because MFCG labels every one of its larger districts (§4.5). |
| J-P3 | Chose reservations and gate sites at S3 and the trace before each stage's growth over claims and walls after growth, because nothing then has to cut, gate or reroute streets and the fabric inherits the wall — stage 1's trace at S3 itself (J-P26) (§4.2, §4.4). |
| J-P4 | Chose the bent cut for the intramural fabric and FTG growth outside the walls over FTG growth everywhere, because MFCG's measured intramural signature comes from recursion on the district polygon (§4.4). |
| J-P5 | Chose MFCG's walled share over 0.35–0.5, because a mostly-extramural default reproduces MFCG's shanty case and a compact walled town with ribbons is the constrained medieval pattern (§4.2 S2). |
| J-P6 | Chose plot counts per band with a measured plot share over one area per class with `1 − 0.38`, because 38 % is footprint over lot and plots span 11× in size across bands (§4.2 S2). |
| J-P7 | Chose a network-travel-cost level set with an anisotropy row over isotropic distance-cost, because FTG's creator retired the circular look and its towns are measurably longer along main roads (§4.4). |
| J-P8 | Chose a mean-reverting curvature walk with goal reversion over a random walk on the rate of turn, because the latter curls 600 m streets through 73–108° (§4.4; `docs/validation/bench/fixall_pipeline_ou_heading.out`). |
| J-P9 | Chose an eager town-wide allocation, a laziness contract and a complete city-LOD first paint over lazy per-district S10–S14, because the lazy tier made the town depend on viewing order and the owner wants footprints at city zoom (§4.1). |
| J-P10 | Chose to specify the district pool and its merge protocol now (§4.1) over leaving pools behind a later measured need; reconciled with J-R18 and D-18 by the fix-all pass: the pool is the primary configuration once M1 measures identical digests for pool sizes 0–3 and CITY p95 ≤ 300 ms, and the single worker is the pre-decided fallback (§12.3), with M2b measuring METROPOLIS single-threaded. |
| J-P11 | Chose to forbid bent-cut continuation across district boundaries over two-district transactions (§4.6). |
| J-P12 | Chose the vector coast with contours clipped to land over a shoreline extracted as the raster's level set, because it keeps centimetre precision and makes the invariant constructive (§4.2 S1). |
| J-P13 | Chose per-frontage regions from the block's straight skeleton over FTG's reflex pre-cut as the primary construction, keeping the pre-cut as its fallback, because regions are exact on curves (§4.7 S10). |
| J-P14 | Chose row footprints by clipping over fitted rectangles, because party walls must be one shared edge on bent and curved frontages (§4.7 S11). |
| J-P15 | Chose to decide the deep-block interior in S8 by band shares over S10 inserting lanes, because S10 cannot write L1 and dense quarters must keep their courts (§4.6). |
| J-P16 | Chose NG's perpendicular-ray far side with a pre-decided fallback chain over an open rule (§4.6 step 4). |
| J-P17 | Chose wings stored in the base over single-wing L / T (§2.6). |
| J-P18 | Chose an `outline()` / `compose()` split with a cost contract over one lazy `compose` (§2.6). |
| J-P19 | Chose `baseCm` = the highest sample plus a plinth, with foundation skirts and stepped wings, over the lowest sample, because no floor may be buried and nothing may float (§2.6). |
| J-P20 | Chose a sequential grid roster keyed by building ordinal over a capped fixed-point iteration, because only the former is prefix-stable in population (§10.2). |
| J-P21 | Chose a base-schema relation store materialised by the module over relations re-derived on every read (§10.1). |
| J-P22 | Chose pinning by explicit edit only over "pinned once seen", FTG's own rule (§10.3). |
| J-P23 | Chose close-up refinement as derived data and template replacement as a model edit over refinements entering the model (II.4). |
| J-P24 | Chose the gate law `round(1 + 0.47 √A_ha)` fitted on MFCG's size sweep over `2 + round(0.9 √(A/10))`, because it reproduces MFCG's 5 / 8 / 12 / 18 gates and the old law gives 4 / 6 / 9 / 12 (`docs/validation/bench/fixall_pipeline_mfcg_fits.out`). |
| J-P25 | Chose an open waterfront as the default over a sea wall, because MFCG's coastal wall stops at the water and FTG's captured wall is an open chain (§2.7). |
| J-P26 | Chose to solve the gate routes at S3 and take the stage-1 boundary, the gates, the castle weld, the wall trace and the moat from one travel-cost construction over a provisional boundary on straight corridors (which still differs from the routed arterials) or sliding the gates at S5a (which leaves a moat carved at S3 off the wall or forces water into L0 after the arterials), because a moat must enter L0 before any L1 edge and can follow the real wall only if the wall is known then (§4.2 S3; NF-P1; `fixall_pipeline_r2_levelset.out`). |
| J-P27 | Chose to run the hinterland unit (the hinterland's S10–S12b) on the otherwise idle generation worker as one more overlay of disjoint faces over an eager L1 field partition before S8, which would add ≈ 12 ms to CITY's critical path, because fields are L3 content of the hinterland's own blocks (§4.1, §4.9; NF-P8). |
| J-P28 | Chose the quarter city cut at `min(N_q, L)` over flooring the district count at N_q, because the floor moves the matched TOWN from 8 to 10 labels — no closer to MFCG's 9 — and shrinks TOWN districts below MFCG's own (§4.5; NF-P9; `fixall_pipeline_r2_quarters.out`). |
| J-P29 | Chose to cut the wall strips off as L1 faces at S7 and build the band, towers and gatehouses inside them after S9 over subtracting band ⊕ setback inside `kerb(F)` while committing the band at L3 before S8, because an L3 face committed before S8 and S9 must be cleared or split by their batches, while an L1 strip boundary makes the wall a barrier the way a reservation is (§4.8; NF-P5). |
| J-P30 | Chose a carve way rule by class — pinned decks for arterials and sole connections, cuts for the rest — over re-routing every way around new water, because a town bridges its through-roads over a new moat or canal while lanes simply end at the new bank (§4.11; NF-P14). |
| J-P31 | Chose a `quad` wing kind that stores the clipped row footprint over re-fitting row houses as rectangles (breaks GEO-26's shared party wall) or storing them as `polygon` wings (loses the ridge the per-wing roofs need) (§2.6; NF-P2). |
| J-P32 | Chose a portal gap that slides a planned lane end away from an existing portal over letting two districts' lanes share a boundary vertex, because a shared vertex is the cross-boundary crossroads GEO-42 forbids and binds either district's reroll to the other's lane (§4.6; NF-P6). |
| J-P33 | Chose one `Seam` record per boundary run, read by both districts, over a contract copied into each district, because one record cannot disagree with itself and a re-derivation then changes the seams a district is party to rather than its neighbour's district record (II.1; NF-P6). |
| J-R1 | Chose a columnar, transferable mark table over `Mark[]` objects because a 60 000-object list costs the receiving thread ≈ 140 ms to deserialise while typed arrays transfer in constant time and slice cheaply into deltas (§8.1). |
| J-R2 | Chose world-aligned tile rasters over per-district rasters because district boundaries are streets and a district bitmap cannot follow continuous zoom (§8.1). |
| J-R3 | Chose low-chroma value steps over saturated hues for the default roles because the restraint clause asks for one ink and a few roles, and eight tones meet every contrast floor (§8.2). |
| J-R4 | Chose Canvas2D as `lit`'s reference backend over WebGL2 because one drawing path keeps screen, PNG and print identical, removes the duplicate render path both creators warned about, and every part of the lit look has a vector or per-tile form within the tile budgets; normal-mapped relief is the only loss (§8.2). |
| J-R5 | Chose the ground tone over kerb hairlines as the city band's figure-ground because a kerb line doubles the linework at city zoom and fights the casing idiom; hairlines are the pre-decided fallback (§8.5). |
| J-R6 | Chose not to draw avenue trees at the city band over a thin green line inside the corridor because at city zoom a corridor is ≈ 2 px, where a line fuses with the casing and adds a ninth tone (§8.5). |
| J-R7 | Chose no S9 preview over a block preview because §12.5's laws hold the one-second bar without one for every TOWN and CITY and for METROPOLIS up to ≈ 14 200 buildings, the slower first map above is declared rather than hidden, and a preview's figure-ground differs from the finished picture (§8.5). |
| J-R8 | Chose settling on exact 2^¼ zoom stops over re-rastering at arbitrary scales because an arbitrary-scale raster defeats the cache and the per-stop label placement; the settled scale is within ± 9 % of the requested one (§8.8). |
| J-R9 | Chose Canvas2D glyphs composed onto the tiles over SDF text because once tiles are composited text never needs the GPU, and one text path keeps text identical on every output (§8.9). |
| J-R10 | Chose a handle-and-tiles worker boundary over sending the document or mark objects to the main thread because structured-cloning a CITY entity table costs ≈ 162 ms and a 60 000-mark list ≈ 140 ms, while bitmaps and typed arrays transfer in constant time (§8.9). |
| J-R11 | Chose stamped, ranked scatter tiles over per-entity Bridson sampling because sampling costs ≈ 12 µs per tree while a stamp costs under 1 µs, and ranked tiles give every band a subset of the finer band by construction (§8.10). |
| J-R12 | Chose label placement as view data measured with our own font metrics over placement in the model, because collisions change with zoom inside a band, and over the host's text engine, because engines shape text differently (§9.1). |
| J-R13 | Chose a minimal own emblem generator plus import over import only and over a full blazon engine, because the legend should carry an emblem in one click at a fraction of a person-week and heraldic depth is not a map-parity item (§9.5). |
| J-R14 | Chose to build CityJSON over leaving it for later because its integer-vertex-plus-transform encoding carries our centimetre lattice losslessly, so the exporter is thin, and it gives GIS users a standard 3-D path (§11.1). |
| J-R15 | Chose host-as-store over a sync service of our own because the product is a standalone, backend-free library, a host already owns accounts and storage, and §11.3's protocol makes any host a correct store (§11.5). |
| J-R16 | Chose a transport-agnostic bridge plus the static VTT exports over a Roll20 extension because an extension needs an account and store publishing outside a standalone program, and FTG's extension only relays the same messages (§11.5). |
| J-R17 | Chose a per-building cost of ≈ 57–74 µs at p95 over matching MFCG's 12–39 µs because PLAT builds what MFCG does not, which D-7 ranks above speed; the first map stays under one second for every TOWN and CITY request and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people), and the slower first map above that — ≈ 2.3 s at the 120 000 cap — is declared for the owner's veto rather than hidden behind a preview (§12.5, §12.9). |
| J-R18 | Chose the derivation pool as the primary configuration over a single worker because after the eager allocation the per-district stages are pure functions of eager upstream state and their own sub-streams, so they run in parallel without shared writes (§12.9). |
| J-R19 | Chose the entity's lineage hash as the one key of every render-time hash over the address and the interned handle, because the lineage keys every other draw of the entity so a New random re-rolls its look with its shape, and handles are session-local, which broke pixel identity across reloads (§8.1; NF-D10). |
| J-R20 | Chose a slot-major draw order with passes inside each slot over the pass-major order, because pass-major drew every road casing over masses, fields, woods and shadows against the slot table's reasons, while separate casing and body slots keep GEO-28's guarantee (§8.1; N-7). |
| J-R21 | Chose composing base and labels into one bitmap per tile in the tile worker over two tile layers committed to the main thread, because it halves first-paint commits and per-frame draws at the same memory while a label change still never re-rasters the map (§8.8; N-5). |
| J-R22 | Chose a canvas budget derived from the viewport (3P + 7 MB) with tier ceilings and a tile-DPR step-down over fixed per-tier numbers, because the fixed low and mid budgets could not hold their own worst-case views (§8.8; N-9). |
| J-R23 | Chose to run every model-reading render step — live-layer providers, override resolution, on-demand bands, `compose()`, close-ups — where the model is, and to give the tile worker display-list tables only, over a model replica in the tile worker, because a replica doubles the working set and must follow every edit (§8.9; N-4). |
| J-R24 | Chose to apply an instance override by ordinal only while the entity's lineage and the ordinal's position both hold over applying it whenever the address survives, because a carried successor keeps the address but not the lineage, so the same ordinal lands on another tree (§8.10; NF-D11). |
| J-R25 | Chose bit-reversal (van der Corput) ranks for jittered grids and lines over a second blue-noise ranking, because the rank is then a pure function of the ordinal and as stable as it (§8.10; N-10). |
| J-R26 | Chose pins fixed at their own and finer stops and yielding at coarser ones over pins fixed at every stop, because a pixel-sized pin grows in world units as the view zooms out and would collide there (§9.2; N-28). |
| J-R27 | Chose to decide the quarter-tree rung from geometry before the greedy, with one ancestor candidate per stop, over letting it arise from collisions inside the greedy, because the local evaluation needs every candidate's place in the strict order fixed in advance (§9.2, §9.4; N-11). |
| J-R28 | Chose `ground` as the one fallback halo role, and darker inks for `lit` and `hatched`, over per-family halo roles and lower floors, because the matrix already guarantees ink against ground in every accepted palette and outlines over masses need the separation (§8.2, §9.4; N-3). |
| J-R29 | Chose to draw `ink`'s walls in the ink and its courts as ground at the city band over a ninth city-band tone, because the restraint clause names one ink and 4–8 roles and an enclosed court's small step adds noise at city zoom (§8.2, §8.5; N-25). |
| J-R30 | Chose a bounded random-style repair — fixed row order, ≤ 100 steps, ≤ 3 draws, then the shipped palette — over the unbounded raise, because only a bounded procedure can promise that every presented style meets the floors (§8.2; N-26). |
| J-R31 | Chose a strict WGS84 GeoJSON by an inverse transverse Mercator at a documented default anchor, plus a metric file by prior arrangement, over a local metric CRS with a `crs` member, because the latter fails RFC 7946 and is read by GIS tools as degrees (§11.1; N-14). |
| J-R32 | Chose glyph outlines as SVG's default text over embedded text, keeping the embedded face as an option, because only outlines draw the same glyphs in every consumer (§11.1; N-13). |
| J-R33 | Chose fate confirmation by token and fate equality (or resubmission with fates filled) over a force flag, because the committed event must carry exactly the fates the user saw (§11.2; NF-D14). |
| J-R34 | Chose a per-viewer `stylePreset` view key over treating the canonical style as a last-writer-wins view key, because a viewer's look must neither rewrite the shared style nor silently diverge from it (§11.3; N-15). |
| J-R35 | Chose first-map budgets as laws of the building count, with the one-second knee and the miss above it declared, over one bar per rung, because size follows population inside a rung (§12.5; N-2). |
| J-R36 | Chose to state load verification as a law of the log (V = M(B) + Σ c(e) + S14 + 5 ms) over saving checkpoints, because checkpoints would multiply edit-heavy documents while the wait is already off the path to the picture (§12.6; N-16). |
| J-R37 | Chose to let a CI font test pick each face's small-caps and figure path — the face's features, the family's OFL SC cut, then synthesis — over assuming the GSUB features, because nothing in the project shows the default face carries them (§9.2; N-12). |
| J-S1 | Chose to tag every acceptance letter C / P / O and to require a P or O letter for each first-weighted improvement over citing the existing numbers as evidence of improvement, because most of them hold by construction and would pass while the town reads worse than MFCG or FTG (IMP-4; §15.2). |
| J-S2 | Chose a written, blind side-by-side protocol with the owner as the declared rater over tester counts and an unstructured "owner's eye", because the program has one human and an eye without fixed seeds, blinding and a pass rule can be steered (IMP-4, IMP-11; §13.6). |
| J-S3 | Chose to give every threshold a number now, with a confirming milestone and a pre-decided fallback, over placeholders set by the corpus phase, because the corpus comes after the whole standalone program and placeholders either block a milestone or get promoted silently (IMP-6; §13.7). |
| J-S4 | Chose byte identity for Regenerate (keep settings) and, for New random, a calibrated rank test — each regenerated statistic's rank among K = 50 from-scratch generations of the same scope, ties broken by a uniform draw, a 10-bin χ² test per statistic with Holm at family-wise 0.01 over a nightly campaign of 400 scopes — over two-sample KS tests per regeneration and over a fixed 95 % pass rate of an empirical central band, because both of those fail a perfect regenerator (the band passes it only 70–79 % of the time on four statistics, executed) while ranks are exactly uniform for any K: executed, ≈ 1 % false campaign failures and ≥ 99.5 % detection of too-snug, too-loose and biased regeneration; the randomised tie-break is what keeps a discrete statistic calibrated (without it a perfect regenerator failed every campaign) (IMP-7; §13.2, §15.2 O9 c). |
| J-S5 | Chose requested-feature delivery by tier and time on MFCG's worst configurations over "0 whole-map restarts" as the acceptance number, because the latter is true by construction (IMP-5; D-9). |
| J-S6 | Chose to state the honest 150–200 pw and record the possible cuts for the owner's veto over cutting scope to keep 100–130, because the owner asked that nothing be deferred (IMP-2; D-20). |
| J-S7 | Chose to put the editing core before the second preset, split M3 and give the module its own milestone over moving exports, forms and the module out of the base release as the red team proposed, because the owner's no-defer rule keeps them in the program while D-7 still orders the work (IMP-3; D-35). |
| J-S8 | Chose implementer inputs = this document plus a checked digest, a separate repository and a numbers-only baseline file over path-based CI rules alone, because the findings themselves quote GPL code and reference creative data (IMP-1; D-29). |
| J-S9 | Chose a hashed deny-list of non-dictionary tokens, ordered 3-grams, colour values and file bytes over a plain word list, because a plain list would copy the reference content into the product repository and would trip on ordinary words any medieval roster shares (§17.1). |
| J-S10 | Chose a proprietary default licence over leaving the licence undecided or defaulting to an open licence, because it keeps every option for the owner (DEF-14; D-22). |
| J-S11 | Chose FTG's free BIG_TOWN and BIG_CITY sizes and no purchase over a CITY-only FTG comparison or a purchase by the program, because a purchase is the owner's alone and the free sizes cover two of three rungs (FTG-16; D-31). |
| J-S12 | Chose 1 500 inhabitants as both the base's floor and the village ceiling over a 2 000 clamp, because a gap would leave requests between the ladders unanswered exactly where MFCG's creator admits its small towns fail (COV-VG-VN-088; D-33). |
| J-S13 | Chose modest per-rung granularity and greenery modifiers in one `RungProfile` table over identical rows at every rung, because the owner asked for them to be defined per rung and land pressure rises with town size (AM-4; §1.1). |
| J-S14 | Chose to put economy, personality, stats and the family tree in the module with base schema stubs, flagged for the owner's veto, over leaving them unrecorded or putting them on the one-click path (COV-FTG-B10, C03, C11; D-32). |
| J-S15 | Chose IM FELL Great Primer as the default label face over a different serif chosen for "clean-room distance", because fonts are OFL assets outside the clean-room rule and the face belongs to the adopted ink look (IMP-15; §17.2). |
| J-S16 | Chose three CI tiers with fixed wall-clock budgets over one full run per change, because the full rig costs 10–20 CPU-hours (SCL-18; D-34). |
| J-S17 | Chose to resample curves at 10 m and compare junction-to-junction runs over per-vertex turn angles and edge lengths, because the latter measure the polyline representation, not the town (FTG-15; §13.5). |
| J-S18 | Chose MFCG's input idiom, stated in an editable keymap, over leaving hotkeys unstated in the app (COV-MFCG-L08; §14). |
| J-S19 | Chose WCAG 2.2 AA for the app's chrome with the gazetteer and "features in view" lists as the non-visual route to the map over no accessibility statement, because FTG's users asked for list access and the map canvas alone reaches no one who cannot see it (COV-FTG-A24; §14). |
| J-S20 | Chose to let a panel the owner has not rated continue the build with the milestone's D-5 status *provisional — not rated*, never claiming the gate and re-offered at every later milestone and release, over blocking the build until the owner rates and over claiming the gate on the numbers alone, because the no-defer rule forbids idling the program on one person's calendar while D-5 makes the owner's eye part of "mastered" (§13.6 (7), §16; NF-S2). |
| J-S21 | Chose to ship candidate 1 as the `house` sheet — selectable, never the default — when the owner has made no pick by M4's exit, with the pick re-offered, over shipping no `house` sheet or letting a seat choose by its own eye, because the owner's later house style must exist in the release while only the owner's eye may choose among the candidates or change the default (§13.6 (8); D-1; NF-S2). |
| J-S22 | Chose machine-readable shift, cascade, milestone, parity and D-5 records inside `plat/goldens/`, with `docs/validation/` copies generated from them, over keeping the records in `docs/validation/` and exempting them from the repository path rule, because an exemption is a hole in the clean-room boundary while the records hold only numbers, hashes and answers (§13.3, §13.5, §13.6; NF-S1). |
| J-S23 | Chose to declare a moved placement digest as an S13b view shift that bumps the style version of every affected sheet and no output version, over bumping the output version or leaving placements untested across engines, because placement is view data outside the model digest (§9.1) and the style version is already the axis that carries pixel identity (§6.4, §13.3; N-24). |
| J-S24 | Chose `labels ← render` with the renderer's symbol extents and display-list index passed into S13b as parameters (`ObstacleSource`, `RoleIndex`) over `render ← labels` or an undirected pair, because the tile worker runs placement and placement needs the drawn extents, while keeping `labels` free of paint code lets placement run and be tested against a stub obstacle source (§14; N-22). |
| J-S25 | Chose FTG's turning per 100 m as a *target* for organic presets with the row's declared 0.5–1.5 × band over dropping the clause or applying the band rule, because FTG's curvature is a legitimate anchor for organic streets while its per-seed spread over at most eight payloads is too narrow to stand for its generator's variation (§13.5; NF-S3). |
| J-S26 | Chose to mark a letter *not achieved* — entered in `known-defects.json`, never cited as improvement — whenever its fallback moves the threshold to a measured value, over letting such a fallback pass silently, because a threshold reset to its own measurement passes by construction (§13.7; NF-S5). |
| J-S27 | Chose to key town-level draws and per-document furniture (the compass, the emblem) from the town root's entity key, which depends on the seed key alone, over the document id, because `docId` is random and minted outside the model, so the same recipe would draw a different compass in every copy and from every link (§14, §9.5; NF-D12). |
| J-I1 | Chose **one quarter merge tree**, built by S6 with one cost (combined area, + 1 000 ha across kind families, + 10 000 ha across a wall or water barrier) and cut at MFCG's count law for the city band, over the two mechanisms the drafts proposed (a flat grouping in §4.5 and a label-side tree in §9.4), because the model and the label ladder must agree on what a quarter is and one tree serves both the count law and the zoom stops between bands (§4.5, §9.1, §9.4; integration C-1). |
| J-I2 | Chose **no preview at any rung** over the pipeline draft's METROPOLIS-only block preview, because the derivation pool meets the one-second bar at every TOWN and CITY and at METROPOLIS up to ≈ 14 200 buildings, a preview's figure-ground differs from the finished picture (MFP-1), and both the slower first map above that knee and the single-worker fallback's lower knee are declared in §12.5 instead of hidden behind a partial map (§4.1, §8.5; C-2). |
| J-I3 | Chose **label placement as view data at every band** (S13b) over eager city-band placement in the model, because placement depends on zoom stop and font metrics (GEO-29) and the bundled fonts' own metrics already make it identical on every engine without entering the digest (§4.1, §4.10, §9.1; C-3). |
| J-I4 | Chose to make every entity schema reach geometry only through the kernel's views and persisted lattice points, and store no seed or stream key, over the pipeline draft's slot lists and stored sub-seeds, because rule 5 of §2.2 (GEO-5) and the lineage-keyed streams of §6.1 (LC-1) are the fixes those findings require; the drafts were written in parallel and the schemas had not yet followed them (§2.4–§2.7, II.1; C-6, C-10). |
| J-I5 | Chose **one travel-cost field** for all growth stages — computed at S3 on the solved gate routes with the road multiplier (recomputed once after S3's L0 batch when a moat was carved) and re-settled incrementally where S5b's main roads lower it; stage 1's boundary is taken at S3, stage k's before its own S5b, each at the cumulative land of stages 1…k — over a fresh field per stage (a Dijkstra per stage) or S4's plaza-rooted field (which lacks the road-corridor anisotropy FTG-5 requires) (§4.2 S3, §4.4, §12.4; C-11; amended by NF-P1). |
| J-I6 | Chose furlong-sized field faces in the model with open-field strips as render-time segmentation over strip faces in the model, because the strip look needs no model faces while crop, livestock and rotation are per furlong (§4.9; C-13). |
| J-I7 | Chose to keep the rendering area's shadow budget (≤ 20 % of a tile's raster time) and add the pipeline area's pre-decided `drop`-mode fallback with an M2b measurement, over a frame-share budget, because tiles are the unit the renderer measures and the fallback costs one mode switch (§8.4; C-15). |
| J-I8 | Chose to re-derive the kernel's range bound at the population cap (120 000; ≈ 6× headroom under 2²³ cm at aspect 2) over the METROPOLIS target (≈ 9×), because the cap is the largest arena the ladder admits (§3.2 (1), §12.2, D-12; C-16). |

## 3. Cross-area requests (changes in sections other areas own; the integrator applies them)

Each request is stated as the exact change. Item ids in brackets.

### 3.1 To the rendering area

| # | section | request |
|---|---|---|
| RR-S1 | §11.3 — r2-rendering's block [FTG-22] | r2-rendering's §11.3 block already renames the token to `logHead` (`baseLogHead`, `currentLogHead`) throughout. Two changes remain: add to the host → PLAT vocabulary `sim.advance { hours }` (module tier: advances the view key `time` by `hours` under the same last-writer-wins rule and lets the module recompute occupancy for the new hour; it changes no model and logs no event); and in "View state" replace the sentence that maps the reference's time commands onto `view.set` ("… time commands map to `view.set { time }` plus the simulation module's own command.") with "Time is the view key `time`: `view.set { time }` sets it and the module's `sim.advance { hours }` advances it (§10.3)." After integration no identifier from `research/findings/ftg-payload-visual.md` §7.2's table may remain (§17.1 (2)). |
| RR-S2 | §9.5 Compass and Emblem — the current text (r2-rendering does not replace §9.5) [NF-D12] | Compass: "rerollable per document (`style/compass/<document>`)" becomes "rerollable per town: its stream is keyed from the town root's entity key (§14 `TOWN_ROOT` — the seed key alone) with the concern `style.compass` and that concern's salt, so a reroll is a logged `rerollLayer('style.compass')` event and a link or a copy of the document draws the same compass". Emblem: "seeded by `naming/emblem/<town>`" becomes "keyed from the town root's entity key with the concern `naming.emblem` and its salt (rerolled by `rerollLayer('naming.emblem')`)". |
| RR-S3 | §8.10 "Per-instance look" — r2-rendering's block [NF-D12] | "built once per session from `style/<sheet>/crowns/<class>/<i>`" becomes "built once per session from `rng.stream` keyed by the sheet's key (the hash of its id@version), `STAGE_VIEW`, the concern `style.crowns` with its salt, and the class and the index i as the creation index (§6.1's structured components; the path form is a report rendering, §14)". |
| RR-S4 | §8.5 "Metrics" — r2-rendering's block [NF-S5] | "at least MFCG's value on its size-40 / 80 / 130 plain sweep renders measured at M1 with the same script, less 0.03" becomes "at least MFCG's value on its size-40 / 80 / 130 plain sweep renders — measured research-side at M-1 by the metric defined here (§13.5 ⟨M-1⟩) and cross-checked against the product's implementation on M1's golden renders within 0.01 — less 0.03". The M1 fallback sentence stays. |
| RR-S5 | §9.1 "Consequences" [N-24] | Already folded into r2-rendering's §9.1 block (its §3.0 table); nothing further to apply. |
| RR-S6 | §8.2 "Presets — each family defines all four bands" — r2-rendering's block [N-23] | After "B-ZOOM checks role continuity (mean roof and mean ground colour ΔE2000 < 2 across every band switch within a family)" add "from the milestone that ships the family's four bands: `ink` and `lit` at M2b, the ink-family variants at M3b, `hatched` at M5 (§13.4, §16)". |
| RR-S7 | §12.6 "Scope invariance" — r2-rendering's block [NF-S6] | "(a B-EDIT test)" becomes "(a B-EDIT test: TOWN → CITY from M2a, TOWN → METROPOLIS from M2b, §13.2)". |
| RR-S8 | §8.1, §8.2, §8.8 [N-22] | State once, where `LodBand` (§8.1), `Role` (§8.2) and `ZoomStop` (§8.8) are introduced: "declared in `@plat/model` (§14), so `@plat/labels` and `@plat/render` share them without either importing the other's code". |

### 3.2 To the pipeline area

| # | section | request |
|---|---|---|
| PR-S1 | §10.3 "Calendar" — the current text (r2-pipeline does not replace §10.3) [FTG-22] | "*Calendar:* a configurable calendar (hours / day, days / week, rest days, weekday names) with [the two reference command names] through the bridge (§11)." becomes "*Calendar:* a configurable calendar (hours / day, days / week, rest days, weekday names); the time is the view key `time` — `view.set { time }` sets it and the module's command `sim.advance { hours }` advances it over the bridge (§11.3) — and occupancy is recomputed for the new hour; neither changes the model." |
| PR-S2 | §4.7 granularity table header; §4.9 S12b paragraph — r2-pipeline's blocks [NF-S4] | "all calibratable, J-T" and "all calibratable (J-T)" become "all calibratable, J-T (§13.7)" and "all calibratable (J-T, §13.7)" — J-T is now defined there. |

### 3.3 To the determinism area

| # | section | request |
|---|---|---|
| DR-S1 | §6.1 "Keys are mixed from structured components" and the salt bullet — r2-determinism's block [NF-D12] | After the entity-key sentence add: "Town-level draws — S0's feature draws, terrain noise and the per-document furniture (the compass and the emblem, §9.5) — use the **town root's** entity key, the seed key mixed with the fixed town lineage (ground arena, no parent, creation epoch 0, index 0), so they depend on the recipe alone and never on `docId`; paint programs and furniture pass the reserved stage id `STAGE_VIEW` (0xffff) to the one mixer (§14 `Rng.stream`)." In the salt bullet, add `style.compass` and `naming.emblem` to the rerollable concerns (read by the compass furniture program and the emblem generator, §9.5). |
| DR-S2 | §5.3 "Cost rule" — r2-determinism's block [NF-S6] | "(a cost test, §13.2, measured at M2a, the editing core)" becomes "(a cost test, §13.2: TOWN → CITY at M2a, the editing core; TOWN → METROPOLIS at M2b, which builds METROPOLIS)". |
| DR-S3 | §6.5 (9) — r2-determinism's block [N-24] | Add to the determinism tests: "**placement digests** — the per-stop S13b placement digests of the golden suite identical on the five engines, workers on and off (§13.3, §9.1)". |
| DR-S4 | §7.3 item 7 (iv) and §6.1's reroll component — r2-determinism's blocks [IMP-7] | In (iv), define the rank with ties: "the references below it plus a uniform draw from 0 … t over the t references equal to it, drawn from the campaign's own stream"; name the references' rerolls "32 768 + i, i = 0 … K − 1" and the campaign "n = 400 regenerated scopes per nightly run (§13.2)"; add the executed power "≥ 99.5 % detection of too-snug (0.8 ×, 0.6 ×), too-loose (1.5 ×) and biased (+0.25 sd) regeneration; without the randomised tie-break a tied statistic fails every perfect campaign (`docs/validation/bench/fixall_scope_r2_o9c_power.out`)". In §6.1's reroll bullet add "a user's reroll count is capped at 32 767 (the rerolls above are reserved for §13.2's faithfulness references)". |

### 3.4 For the integrator (not an area)

* **FTG-22's receipt.** After applying every round-2 block, grep `docs/ARCHITECTURE.md` for every identifier in the table
  of `research/findings/ftg-payload-visual.md` §7.2 (plus the two field names of its §7.2 prose and the calendar pair
  §10.3 used) and record the count in the round-2 integration log; it must be 0. This seat ran that grep on a simulated
  integration (the architecture with r2-determinism's §2.9 block, every block of this file and RR-S1 / PR-S1 applied):
  0 hits for all 41 identifiers, substring match (section 4).
* The §13.7 J-T definition makes PR-S2 a pointer only; the text is already consistent without it.
* Apply this file's scope blocks **instead of** the other drafts' requests to scope (§3.5): each is already inside the
  block for its section, so applying both would duplicate rows.

### 3.5 Requests the other round-2 drafts made of this area, and where they are

| from | request | folded into |
|---|---|---|
| determinism SR-1, SR-2 | §14 `Stage.workLimits` as laws, `workLimits.json`; `EditEngine.undo` / `redo` append events | §14 |
| determinism SR-3, SR-4 | §13.2 nine sizes and F-WORK flatness; B-EDIT fixtures | §13.2 (band top 29 900, harmonised with r2-rendering's §12.5) |
| determinism SR-5, SR-6 | §16 M2a / M3a content; IMP-7 restatements | §16, §15.2 O9 (c), J-S4 |
| determinism SR-7 | J-DET-16 – J-DET-28 | judgment calls, after J-DET-15 |
| kernel S1, S2 | §13.1 constructive fixtures and property wording | §13.1 |
| kernel S3 | §13.2 "0 `E_KEPT` on the one-click path" | §13.2 stage property tests |
| kernel S4 | §16 M0 exit (a) | §16 |
| kernel S5 | §14 `Kernel.tx` two forms, `Stage.txForm`, `KernelTx` fields, new services | §14 |
| kernel S6, S7 | J-K2, J-K5, J-K6, J-K8 restated; J-K9 – J-K21 added | judgment calls |
| pipeline S1 | §15.2 O2 (c) with the seam exception | §15.2 (and S6 (c) likewise) |
| pipeline S2 | J-P26 – J-P33; J-I5 amended; J-P3 appended | judgment calls |
| pipeline S3 | D-17 and §1.4's walls row: stage 1's trace at S3 | delegated decisions, §1.4 |
| pipeline S4 | §14 registrations and interfaces | §14 (a paragraph of stage registrations and the `@plat/layout` line) |
| pipeline S5 | §13.2 derived-complete digest and five property tests | §13.2 |
| pipeline S6 | §13.7 O14 (b) fallback; §15.1 C16, C17 | §13.7, §15.1 |
| rendering S1, S2 | §1.2 first-map wording; §1.7 text row | §1.2, §1.7 |
| rendering S3 | §13.2 first map at three sizes per rung | §13.2 |
| rendering S4 | §13.4 B-ZOOM checks | §13.4 |
| rendering S5 | §13.5 timing row against FTG | §13.5 |
| rendering S6 | §13.8 nightly: Chrome-worker budgets, first-map runs | §13.8 |
| rendering S7, S8 | §14 `EditEngine.apply` fates; `TileBackend` options | §14 |
| rendering S9 | O12 (b), (g) — the request names §15.1, but the O12 row is §15.2's | §15.2 |
| rendering S10, S12 | §16 exits M1, M2a, M2b, M3b, M4; effort "label composition" | §16 |
| rendering S11 | §17.2 fonts | §17.2 |
| rendering S13 | D-18 as laws of the building count, the knee declared | delegated decisions |
| rendering S14 – S18 | J-R17, J-R7, J-I2, J-R9 restated; J-R19 – J-R37 added | judgment calls |

## 4. Evidence status and what a Fable reviewer should re-check first

**CONFIRMED (executed or read at source in this lane):**
* The O9 (c) rank test's calibration and power, extended here: `docs/validation/bench/fixall_scope_r2_o9c_power.py` →
  `.out` (stdlib Python, seeded, ≈ 2 min; bench README entry appended). K = 50, n = 400, 10 bins, Holm at 0.01: a perfect
  regenerator fails 11 / 1 000 campaigns on a continuous statistic and 9 / 1 000 on a heavily tied one (attached share of
  a six-plot block) when ties are broken by a uniform draw — and **200 / 200 when they are not**, which is why the tie
  rule is written into §13.2 and requested for §7.3; power: too snug 0.8 × 199 / 200, too loose 1.5 × 200 / 200, biased
  +0.25 sd 199 / 200, FTG-like 0.6 × 200 / 200. The earlier verifier runs (0.0105 at K = 50, 0.0110 at K = 99; the band
  test's 0.70–0.79) were read at source.
* FTG-22's grep on a simulated integration — the current architecture with the REPLACE blocks of all five round-2
  drafts applied where their headings match (81 blocks, r2-rendering's §11.3 among them), then RR-S1's time sentence
  and PR-S1: 0 hits (substring match) for 41 identifiers — every name in ftg-payload-visual §7.2's table and prose,
  their payload field names and the calendar pair. The same simulation confirmed that none of the stale phrases the
  items name survives ("NG (32 rows)", `'projected'`, `{labels, render}`, the string-keyed `stream` signature, the band
  test, the concentric-radials, outline-template and re-siting-only rows, the 29 700 band top); the two residues left —
  §5.3's "measured at M2a" and §9.5's document-keyed compass — sit in other areas' sections and are covered by DR-S2 and
  RR-S2.
* Every request the other four round-2 drafts made of this area was folded into the blocks by script with an exact-match
  assertion per change (§3.5 lists them); the judgment table holds 172 rows after the additions (132 + 13 kernel + 8
  pipeline + 19 rendering).
* §15.1's row counts: MFCG 40, FTG 46 + 9 audit rows, NG **31** (A1–A3, B1–B8, C1–C8, D1–D2, E1–E6, F1, G1–G2, H1),
  counted from the table itself.

**PLAUSIBLE (this seat's design reasoning, each with its confirming measurement and pre-decided outcome in the blocks):**
the ≈ 6 CPU-minute cost of the nightly faithfulness campaign (from §12.6's scope budgets); the ⟨M-1⟩ list being
complete (it was built from every §13.5 reference cell that holds no number today); that placement digests over exact
doubles are identical on the five engines (the nightly run is the test, and an engine difference is a defect by rule);
that the round-2 schedule additions fit the existing effort ranges; the S4 (d) square-area band 0.03–0.15 ha per 1 000
inhabitants (confirmed at M5 with a mechanism fallback).

**A Fable reviewer should re-check first:**
1. **NF-S2's rule** — an unrated panel lets the build continue *provisional* but never claims "at parity", "mastered" or
   the stage-2 gate (J-S20), and the pre-decided `house` outcome (J-S21). Is "continue, never claim, re-offer at every
   release" the right reading of D-5 plus the no-defer rule, or should a long-unrated panel escalate?
2. **IMP-7's campaign** — the rank test with a randomised tie-break, K = 50, n = 400 nightly, and "a second failure is a
   defect fixed before M3a exits" (J-S4). Check the reference rerolls 32 768 + i and the requested cap of user rerolls
   at 32 767 (DR-S4) against §6.1's u16 reroll component.
3. **N-22 / NF-D12's interface changes in §14** — `labels ← render` with `ObstacleSource` / `RoleIndex` as parameters
   and the shared view types moved to `@plat/model` (J-S24); `StageContext.stream` with explicit `StreamOpts` plus a
   `streamOpts()` default helper, the kernel's `Rng.stream` with `STAGE_VIEW`, and `TOWN_ROOT` keyed from the seed key
   alone (J-S27).
