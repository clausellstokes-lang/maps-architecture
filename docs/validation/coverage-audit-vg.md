# Coverage audit — VG/NG slice (lane `validation/coverage-audit-vg`)

Lane `validation/coverage-audit-vg`, workflow run `wf_e306f20c-a9f`, 2026-09-25. Status: **COMPLETE** (written
incrementally; the summary in §1 was written last, after the full table in §3).

**What this file is.** The master capability checklist for the Village Generator (VG) and Neighbourhood (NG) slice of
the findings — every distinct technique or capability recorded in `research/findings/vg-posts-a.md`, `vg-posts-b.md`,
`vg-ng-devlogs.md`, `profile-village.md` and `_critic-vg-ng.md` (with every critic addendum and post-critic capture
addendum those files carry) — each row tagged with its tier and checked against `docs/ARCHITECTURE.md`, plus the
architecture features this slice cannot motivate (scope creep).

---

## §0 Reading record (the READING BUDGET rule applied)

| file | lines | read how |
|---|---|---|
| `research/findings/_critic.md` | 470 | §0, §1.1–1.2, §2 (all 15 rows), §3, §4, §5, §6 read in full (lines 1–67, 333–470); §1.3 (the per-source citation table, lines 68–332) **not read** — it is a coverage census, not capability content |
| `research/findings/_critic-vg-ng.md` | 226 | **every line** (read first, after `_critic.md`) |
| `research/findings/vg-posts-a.md` | 1 195 | **every line**, incl. its Critic-2 addendum |
| `research/findings/vg-posts-b.md` | 995 | **every line**, incl. its Critic-2 addendum |
| `research/findings/vg-ng-devlogs.md` | 1 038 | **every line** (Part A VG, Part B NG, Part C, Critic-2 addendum) |
| `research/findings/profile-village.md` | 2 545 | **every line**: body §0–§10, Appendix A call tables, Critic addendum (2026-09-21), River-course addendum R1–R6, Critic-2 addendum, River-course addendum part 2 P0–P6, New-build block-coverage addendum N0–N6 (landed 15:16 today) |
| `docs/ARCHITECTURE.md` | 2 200 | **every line** |
| `docs/IMPROVEMENTS.md` | 1 939 | §3.2 (S1–S6), §3.3 (V1–V3), §4 (R1–R16 + "not proposed"), §5 (5.1–5.5) read in full (lines 1332–1600); the rest by heading outline plus targeted greps for the scope-creep terms of §4 below; O1–O19 bodies, §6 traceability, §7 and Appendix A **not read** |

Not opened: any capture, any captured JavaScript bundle, `reference/`, any other findings file (`profile-neighbourhood.md`
is outside this slice — NG facts below come from `vg-ng-devlogs.md` Part B and `_critic-vg-ng.md`, which cite it).
About 210 k tokens of reading; nothing was downgraded to outline reading inside the five slice files.

**Method.** (1) Every technique, rule, construction, measured law, stated failure and design constraint in the five
files was enumerated file by file (204 raw rows, kept as the `raw` column: A = vpa, B = vpb, D = vnd Part A,
N = vnd Part B, P = pv, C = critic seat). (2) Rows were merged where two files describe the same capability, keeping
per-reference and per-build variants as separate rows. (3) Every critic ruling was applied (V1–V27, C7–C10, C13, C15):
where a body and its addendum disagree the addendum's reading is the row. (4) Each row was tagged and checked against
the architecture text; the `where / gap` column cites the section that carries it.

**Tier rules.** **BASE** = a capability MFCG or FTG also has (evidenced in this slice or in `_critic.md` §3's
cross-references), or a property `docs/IMPROVEMENTS.md` makes a base obligation (a §4 keep-property R1–R16 or a §5.1/5.2
must/should-have) — the base must cover it. **STAGE-2** = an NG capability the district → neighbourhood interface must
be ready for. **VILLAGE-LATER** = a VG-only capability — only checked that the base does not preclude it. A VG or NG
row whose technique the base adopts is tagged by the obligation, not by the source (e.g. VG's selective outlining is
BASE through R13).

**Status rules.** BASE and STAGE-2 rows: **COVERED** (section cited) / **PARTIAL** (what is missing) / **MISSING**.
VILLAGE-LATER rows: **NOT-PRECLUDED** (extension point cited) / **PRECLUDED** (why). "(note)" marks a covered row whose
citation or wording in the architecture is contradicted by this slice's evidence — the design stands, the text needs a
fix.

## §1 Outcome

**192 master rows** (from 204 raw rows): **120 BASE, 17 STAGE-2, 55 VILLAGE-LATER**. BASE rows are many because much
of what VG and NG record is shared with MFCG or FTG, or is made a base obligation by an IMPROVEMENTS keep-property
(R3, R8, R9, R11–R13, R15, R16) or should-have (O12 extras, O13).

| tier | rows | COVERED | PARTIAL | MISSING | NOT-PRECLUDED | PRECLUDED |
|---|---|---|---|---|---|---|
| BASE | 120 | 113 (2 with a wording note) | 6 (3 medium, 3 low) | 1 (medium) | — | — |
| STAGE-2 | 17 | 16 | 1 (low) | 0 | — | — |
| VILLAGE-LATER | 55 | — | — | — | 55 (4 with a caveat, 2 with a note) | **0** |

The architecture covers this slice well: every NG capability except partly built frontages (VN-170) and the
square-as-a-void option (VN-179) has a complete home in the base or in PART II, and nothing in the base precludes the
village product. The gaps are concentrated in three places — **relief rendering** (a base
should-have the architecture both maps and declares out of scope), **NG's partly built frontages** (a named keep-property
whose only source the base removes), and **the undefined population boundary between the base's TOWN rung and the
village ladder** — plus low-severity items and five wording corrections where the architecture cites VG/NG evidence
that this slice contradicts. No substantive scope creep is visible from this slice (§4).

**CONFIRMED vs PLAUSIBLE.** Every coverage verdict is CONFIRMED only as a reading: both texts were read in full and
each verdict cites the architecture section; whether the cited mechanisms *work* is PLAUSIBLE, as the architecture
itself declares (§A.3) until M-1 / M0 run. Evidence tags inside rows are the findings' own.

## §2 PARTIAL and MISSING rows by severity, VILLAGE-LATER caveats, wording corrections

### 2.1 Medium severity (BASE)

| row | gap | why medium | smallest fix |
|---|---|---|---|
| **VN-031** hillshade — MISSING | IMPROVEMENTS §5.2 makes "O12 extras: relief tiers (hillshade, contours)" a base should-have; §8.2's program vocabulary has no hillshade program (`texture + light(dir)` lights FTG roofs, not terrain); only the reserved `painterly` row names a "hillshade tier" | IMPROVEMENTS §5's rule: "should-haves need a mechanism and a place in the build plan" — this has neither; unlike MFCG and FTG, the base has a real heightfield to shade | add a `hillshade(sun, strength)` program over the §2.3 raster (Lambert on cell normals, strength from the shadow role — VG's measured recipe, pv §4.10) to §8.2 and a milestone slot in §16 (M2 or M4), default off |
| **VN-029** relief marks (hachures / grass / contours) — PARTIAL | `contourMarks(levels, mark)` exists but only the reserved `painterly` preset uses it; §15.1 says relief "is not built in the base", §16 lists "VG's … relief renderer" out of scope and PART III says the base "does not pay for … the relief renderer", while §15.2 maps O12 extras to §8.5, which has no relief text | the same should-have; the architecture contradicts itself on whether the base carries it | reconcile §15.1 / §16 / PART III with §15.2: relief tiers are a base should-have (optional, off by default); VG-specific looks (grass tufts, spotlight) stay village-only |
| **VN-170** NG's partly built blocks (runs of frontage left empty) — PARTIAL | IMPROVEMENTS R3 names "partly built frontages" as part of the organic fabric to keep; in NG the look comes from `validateOuter`'s ≈ 42 % discard (V18), which the base removes by construction (0 discards, streetwall continuity ≥ MFCG Lots); `vacant` residue and the suburb's density Bernoulli exist, but no rule leaves frontage runs vacant inside built districts | a named keep-property silently lost is a regression by IMPROVEMENTS §4's own rule; it matters at district LOD in the base and at the stage-2 close-up | a vacancy-run share per band / class in the granularity table (§4.7 S10), typed `vacant` or `yard`, with a keep-test on the share of frontage length left open |
| **VN-088** the population boundary between the base's TOWN rung and the village ladder — PARTIAL | TOWN is ≈ 5 000 people (§1.1, §12); S0 accepts `population?`, but no section states the base's minimum supported population or who owns ≈ 1 500–5 000; PART III gives THORP / HAMLET / VILLAGE no bounds; VG reaches ≈ 1 700 and MFCG's creator says small towns are where MFCG fails (VN-060) | the owner's two ladders meet here and neither side owns the band; the creator locates MFCG's failure exactly here — "the smaller the town, the less it resembles anything real" (35854256) | state the base's population floor in the ladder table (§12) and the village ladder's ceiling in PART III, and say which product answers a 1 500–5 000 request |

### 2.2 Low severity

| row | tier | gap | fix |
|---|---|---|---|
| VN-008 per-layer reroll | BASE (R8) | isolation holds by stream design, but no named "reroll this layer only" action with a persisted salt (VG's Shift+T / `&trees=`); §7.1's `regenerate` re-derives entities; II.4 reads R8 as per-district only | add a `rerollLayer(concern)` edit event that bumps the `render.*` / `naming/*` stream salt |
| VN-010 reference build stamps | BASE (B-REF provenance) | §13.5 uses VG / NG capture numbers as bands with no reference-build field; VG's live build changed under the recordings (V25) | add `referenceBuild` to every B-REF baseline |
| VN-158 tree instances in 3-D / JSON export | BASE (O11 extras) | trees are "never stored" and no exporter says it instances them from the display list | state that glTF / GeoJSON exporters instance trees from the display list (seeded, reproducible) |
| VN-179 NG square as a void of omitted frontages | STAGE-2 | IMPROVEMENTS S4's restraint has no mechanism in II.2 (only carved rectangular / round plazas; the void is NG 1.1.0's older morphology) | a `SquareFabric` option that leaves a plaza as unbuilt frontage |

### 2.3 VILLAGE-LATER caveats and notes (all NOT-PRECLUDED; none is a base cost)

| row | caveat |
|---|---|
| VN-002 | VG computes density **before** its network; the base computes it in S6 after growth (drivers unspecified; the prosperity field's read streets and gates) — a village needs a density stage ahead of S4 / S5. Admissible through `Stage` registration with declared I/O (§14) only if the stage graph is ordered from declared I/O; §4.1 draws it as a fixed chain |
| VN-003 / VN-128 | on the live build the palisade precedes the roads and trackers query it each step; the base traces walls after growth, `NetworkStrategy.grow` has no enceinte input and user-drawn walls enter "before S7" (§7.2) — same remedy as VN-002 |
| VN-090 | no `ruined` lifecycle state or ruin roof kind, although IMPROVEMENTS V3 counts on "the EVO lifecycle gives ruin as a state" |
| VN-156 | frames are stated as single sizes (2 / 5 / 8 km); VG shows non-square maps are structural — state frames as width × height |

### 2.4 Wording corrections (the design stands; the text cites evidence this slice contradicts)

1. §6.1: NG / VG successor seeds are called "irreproducible" — pv R6 / P0 show VG's is reproducible per build (VN-007).
2. §4.2 S1 (3): VG's course is cited as "a Chaikin-smoothed control polyline with alternating offsets" — on the live build
   the knots are not strictly alternating and the curve is a cubic spline (pv P4); the base's own course is
   descent-traced, so "course first, terrain follows" (V2) describes VG, not S1 (VN-038). PART III's "course-first
   river … reused unchanged" and §15.1's "G3–G5 … §4.2 S1 is shared" need the same correction (VN-037, VN-040).
3. §3.1 Poisson row: "a domain-warped variant for wood edges" — V15 / pv N3 put the warp on the density noise
   (`PoissonPattern.warp` is a coordinate wrap for a periodic tile); §4.9 already says so (VN-120).
4. §1.6 / PART III: "Nothing in §2–§4 assumes walls, districts or a market" — `Block.district` / `Plot.district` are
   required and §5.3 enforces building ⊂ plot ⊂ block ⊂ district; say that a village is modelled as one district (§5).
5. §8.4 lists buildings, walls, towers and trees as shadow casters; bridges (which cast shadows on water in VG) are not
   named (VN-051).

## §3 The master checklist (full table)

Abbreviations: vpa / vpb = `vg-posts-a/b.md`, vnd = `vg-ng-devlogs.md`, pv = `profile-village.md` (pv R#, P#, N# = its
River-course R1–R6, River-course part 2 P0–P6 and New-build N0–N6 addenda), V# / S# = rows of `_critic-vg-ng.md` §1 / §3,
C# (one digit or two, in the evidence column) = `_critic.md` §2 rows; the `raw` column's A / B / D / N / P / C ids are
the raw enumeration of Appendix A. Build stamps: VG **19251041** (all
09-21 captures, the pv body, R1–R6) and **19365073** (09-25 captures, pv P0–P6 and N0–N6) — differences are version
drift, not contradiction. Section numbers in the last column are `docs/ARCHITECTURE.md` unless prefixed IMPR
(`docs/IMPROVEMENTS.md`).

### 3.1 Pipeline, determinism, failure handling, process lessons

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-001 | Measured stage order: river course → fBm → per-type shape primitive (carve) → gradient → water extraction → density → roll { network (+square, wharf) → buildings → fields → forest → name, legend, descriptive tags }; URL rewrite is the model's last act | VG both builds | pv Critic addendum, R1, R4 [SHOWN sample timestamps]; V1 / C7 | P35, A02 | VILLAGE-LATER | NOT-PRECLUDED | §4.1 keeps terrain and water first and buildings (S10–S11) before fields and forest (S12); the two order differences a village needs are VN-002 / VN-003 |
| VN-002 | Density field computed **before** the road network (it fixes the heart, branching and building spacing) | VG | pv R1, R4; vpa §3.3 [STATED 35854256]; vnd A2.1 | P35, D01 | VILLAGE-LATER | NOT-PRECLUDED (caveat) | the base builds density in S6, after S4 / S5 (§4.1, §4.5; its driver table is unspecified, the sibling prosperity field's drivers read streets and gates); a village must register a density stage ahead of its network — admissible through "`Stage` registration by name with declared I/O types" (§14), but §4.1 draws a fixed chain, so the order must be resolved from declared I/O, not hard-coded |
| VN-003 | Palisade built **before** the roads on build 19365073; every tracker step consults it; gates where trackers meet it | VG 19365073 | pv N2 item 3 [SHOWN identities; INFERRED order] | P43 | VILLAGE-LATER | NOT-PRECLUDED (caveat) | S7 runs after S5 growth (§4.1; FTG's `placeWallAfter`); `NetworkStrategy.grow` has no enceinte input (only `StageContext.plats`); user-drawn walls enter "before S7", not before S4/S5 (§7.2); same remedy as VN-002 |
| VN-004 | Whole-map validate-and-retry on highway failures ("intersects itself", "terminated by water", "unfinished bridge"); failed seed kept as `&trees=` | VG | pv §3.2 [STATED console], H8 | P08 | VILLAGE-LATER | NOT-PRECLUDED | §5 ladders F-ROUTE / F-RIVER; "seed never swapped" (O3 f) — a village inherits the no-restart policy |
| VN-005 | Population-0 villages; planned fix = regenerate until population > 0 | VG | vpa §3.1 [STATED 35854256] | A06 | VILLAGE-LATER | NOT-PRECLUDED | population is an input honoured ± 5 % with a bounded reconcile (§10.2); no retry path |
| VN-006 | Map = pure function of (seed, tags, name, population override); permalink `?seed=&tags=&trees=` | VG | vpa §3.19 [STATED 56941736]; pv §3.1 [STATED]; vnd A2.12 | A47 | BASE (R9; MFCG A1) | COVERED | §6.2 `model = G(version, seed, params, assignments, edits)`; §6.4 permalink |
| VN-007 | "Next random village" (Enter) reproducible from the starting seed, per build | VG | pv R6, P0 [SHOWN, two browsers] | P48 | BASE (R9) | COVERED (note) | §6.1 `Enter = seed + 1`; but §6.1's rationale says the NG/VG successor is "irreproducible" — pv R6/P0 show it is reproducible per build (and NG is byte-identical across loads, IMPR R9); fix the wording, keep the design |
| VN-008 | Per-subsystem streams: the tree layer is rerollable alone (Shift+T / Ctrl+T); `&trees=` stream; `Random.reset` = 6 per regeneration | VG | vpa §3.13.2 [STATED 50688261]; vnd A3.1 [STATED 426543]; pv §3.2; pv Critic-2 item 4 [SHOWN] | A37, C03, D17 | BASE (IMPR R8 keep-test: per-layer reroll isolation) | PARTIAL (low) | isolation holds by construction (§6.1 per-concern streams `forest`, `render.trees`, `style/*`); missing: a named "reroll this layer only" action with a persisted salt — §7.1's `regenerate` re-derives the scope's entities (greenery faces too), and PART II §II.4 reads R8 as per-district isolation only |
| VN-009 | NG isolates random tag rolling from the main stream (`Random.save/restore` only when tags are random) | NG | V23 [SHOWN] | C03 | BASE (NG A2) | COVERED | §6.1 streams never shared across concerns |
| VN-010 | Reference builds drift silently: VG 19251041 → 19365073 changed geometry for the same seed; NG numbers exist for itch build 11441280 only; stamp every reference output with its build | VG, NG | V25; pv Critic-2 item 1, P0; `_critic-vg-ng.md` §6 items 1, 7 | P41, C08 | BASE (B-REF provenance; owner non-negotiable 10) | PARTIAL (low) | §13.5 B-REF reads "the capture records already on disk" and quotes VG / NG numbers as bands (VG 5.196 : 2.828 : 1, NG 10–96 ms) with no reference-build field; add `referenceBuild` to every B-REF baseline |
| VN-011 | Behaviour-shift release announced (1.6.1 density rewrite: same seeds now denser, "not sure it's a good thing") | VG | vpb §2.23 [STATED 105215836] | B27 | BASE (owner non-negotiable 10) | COVERED | §13.3 declared-shift protocol; D-24 |
| VN-012 | Name and POI streams seed-stable across builds while geometry is not | VG | pv Critic-2 item 1 [SHOWN] | P41 | BASE (O2 b) | COVERED | §6.1 `naming/*` streams; §10.4 "names never move geometry" |
| VN-013 | Two tag layers: request tags (URL, `randomTags`, `resolve` dependency / exclusion pass fills the mandatory road slot) vs descriptive tags derived from the finished model (`updateTags`) that feed the grammar | VG | pv §3.1 [STATED; INFERRED], R6 | P11 | BASE (IMPR R16: VG's tags feed the names) | COVERED | §7.7 intent layer and its expansion (request side); §9 / §10.4 names conditioned on the model (descriptive side) |
| VN-014 | Closed tag vocabulary; exactly one road tag always selected; permissive composition with documented-unsupported combinations (`palisade` + water) | VG | vpb §2.1 [STATED 88749133, 104796798] | B02, A45 | BASE (IMPR R15 "a small tag vocabulary") | COVERED | §7.7 intent fields; §7.8 control-surface budget (≤ 12 basic controls); infeasible requests reported (§5.4 `requestedVsBuilt`) |
| VN-015 | Generation-time tag vs render-time hide: `uncultivated` ≠ hide fields, `no orchards` ≠ hide orchards; "Wilderness" = a render filter over the full model (the clearing survives) | VG | vpa §3.10, §3.17, §3.18 [STATED 71653886, 80494491, 66544756] | A33, A46 | BASE (IMPR R8 "tag versus hide") | COVERED | S0 generation toggles (farms, forests, greens, walls … §4.2) vs display-list groups toggled by `semantic` (§2.1 wording note, §8.1) |
| VN-016 | Twelve independently toggleable layers (relief, fields, shading, orchards, shadows, buildings, roads, outlines, nameplate, grid, trees, spotlight) and two RNG scopes | VG | vnd A3.1 [STATED 426543] | D17 | BASE (IMPR R8) | COVERED | display-list groups (§8.1); `LayerSpec` and backend `layers` / `shadows` options (§14) |
| VN-017 | Naming, the legend and the descriptive tags are produced inside the model build | VG | pv R4 [SHOWN parentage] | P40 | BASE (R16; MFCG D1) | COVERED | S13 inside the pipeline (§4.1, §4.10) |
| VN-018 | Every entity must be threaded generation → 2-D render → export → external viewer (the palisade shipped without export or viewer support) | VG | vnd A2.9, Part C 7 [STATED 740285] | D12 | BASE (IMPR O11 a) | COVERED | §2.8 entity registry with a CI path-coverage test ("VG's palisade 'ghost' cannot recur") |
| VN-019 | One shared engine (geometry, polygons, utils, Tracery, NLP, app framework) under thin per-product layers; code transplanted MFCG → NG | VG, NG | pv §0.10, §8 [SHOWN]; vnd B2.6 [STATED 687554] | P10, N12 | BASE | COVERED | §14 package layout; per-product strategies in the registry |
| VN-020 | Rivers rewritten from scratch because the internals were "a total mess" → make the river a replaceable subsystem | VG | vnd A2.7 [STATED 589997]; vpb §2.3 | D08 | BASE (lesson; MFCG river restarts) | COVERED | `RiverStrategy` (§4.12, §14) |
| VN-021 | Cost profile: water level-set dominates the model (no-water model ≈ 14 ms); drawing dominates overall (trees, hachures, furrows); ≈ 85 % of calls are vector plumbing — batch paths | VG | pv §0.9, §5 [SHOWN]; vpa §3.13.4, §3.23 [STATED 66544756] | P09, A40 | BASE (IMPR R1, R14; O12 b) | COVERED | §8.5 instanced batches, typed-array paths, per-district tiles; §3.1 marching squares avoids the `createDeflection` hot spot; §4.9 (e) 10 000 trees in 16 ms |
| VN-022 | Design constraints stated by the creator: ship only what you know how to build; removal is progress; partial beats complete; ship named defects; features must interact before they ship (cliffs) | VG | vpa §5.8–5.9; vpb §4 [STATED] | B46 | BASE (IMPR R15: release notes name known defects) | COVERED | §7.8 "release notes name known defects"; §5.4 report |

### 3.2 Terrain and relief

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-023 | A genuine 2-D height field supporting a gradient, isolines and 3-D | VG | vpa §3.1–3.2 [STATED 35854256, 71653886] | A02 | BASE (IMPR O1 must-have) | COVERED | §2.3 `Terrain` raster in metres with flow direction, accumulation, outfalls; §4.2 S1 |
| VN-024 | Height field = 5-octave fBm sampled once per 128² cell + global gradient tilt + tag-gated primitives (mount, hollow, ridge, crack, island; `createHill` on 19365073) + min / max normalisation | VG | pv §4.2, R2, P1 [SHOWN identities]; V7 | P16, P37 | BASE (O1) | COVERED | §4.2 S1 (1): 5-octave fBm (V7 cited), relief-character amplitude, authored site primitives (hill, spur, valley, terrace, cliff, ravine, hollow) |
| VN-025 | One fixed 128² heightmap at every map size | VG | pv §0.7, §4.2 [SHOWN] | P07 | VILLAGE-LATER | NOT-PRECLUDED | resolution per size class (§2.3; D-19) — a village sets its own row |
| VN-026 | Relief follows rivers: the terrain is carved to the river course by distance to the course, so contours never run into water | VG | vpb §2.4 [STATED 89314043]; V2; pv R1–R2 [SHOWN] | B05, P36 | BASE (IMPR R11 keep-test) | COVERED | §4.2 S1 (3) "the terrain carved to the course"; §5.3 invariant "contours never cross a shore" |
| VN-027 | Carve by exact point-to-segment distance with a naïve linear scan (16 384 cells × 36–94 segments) | VG | pv R2, P1 [SHOWN] | P47 | BASE (performance lesson) | COVERED | §3.1 marching squares / distance transform in linear time; §12 S1 budget 30 ms |
| VN-028 | Cliffs: "not real … just fancy contour lines"; unshipped because every object would have to interact; no hairpins because terrain is deliberately gentle | VG | vpb §2.22, §2.31 [STATED 90033685] | B26 | VILLAGE-LATER | NOT-PRECLUDED | cliff is a site feature, a bank class and a seam type (§2.3, §4.2 (7), II.1); slope limits per way class (§4.4) |
| VN-029 | Relief marks along evenly resampled isolines: Hachures / Grass (→ "noisier hachures") / Contours as a palette mode (`relief`); `LevelsView` walks ≈ 79–114 level polylines | VG | vpa §3.14 [STATED 71653886]; vpb §2.31 [STATED 169047704]; pv §6 [SHOWN] | A41, B36, P05, P01 | BASE (IMPR §5.2 should-have "O12 extras: relief tiers (hillshade, contours)") | PARTIAL (medium) | a `contourMarks(levels, mark)` program exists (§8.2) but only the reserved `painterly` preset uses it; §15.1 says relief "is not built in the base", §16 puts "VG's … relief renderer" out of scope and PART III says "the base does not pay for … the relief renderer", while §15.2 maps O12 extras to §8.5, which contains no relief tier — a should-have without a mechanism or a build-plan slot |
| VN-030 | Relief mark and colour chosen from slope / aspect relative to the light (`verifySlope`; 1 176 : 31 light : dark on a flat coast) | VG | pv §6 [SHOWN counts] | P05 | VILLAGE-LATER | NOT-PRECLUDED | mark `attrs` feed paint programs (§8.1) |
| VN-031 | Ground hillshade: Lambert normals on the 127² interior, stack-blurred bitmap under trees and houses; affects ground, roads and fields; water exempt; strength from the shadow colour | VG | vpb §2.30 [STATED 110526365]; pv §4.10 [SHOWN] | B35, P07 | BASE (IMPR §5.2 O12 extras "hillshade") | MISSING (medium) | no hillshade paint program in §8.2's vocabulary (`texture + light(dir)` is FTG's roof lighting); only the reserved `painterly` row names a "hillshade tier"; the sun vector (§8.4) and the terrain raster (§2.3) make the mechanism cheap to state |
| VN-032 | Relief and shading are separate toggles; three expositions of one heightfield; offshore bathymetric bands | VG | vnd A2.11 [STATED 785801, 426543] | D14 | VILLAGE-LATER | NOT-PRECLUDED | separate paint programs and layer toggles (§8.2) |
| VN-033 | Height maps not exported — the 3-D viewer shows a flat plane | VG | vpa §3.2, §3.20 [STATED 37407181]; vnd A2.12 | A49 | BASE (IMPR §5.2 O11 extras 3-D) | COVERED | §11 glTF "terrain as a heightfield mesh" |

### 3.3 Water, shores, bridges, piers

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-034 | Water configurations: none, coast, river, island (1.2.2), pond, confluence, estuary (1.5.x), selected by tag | VG | vpa §3.8; vpb §2.1–2.7 [STATED] | A19, B02 | BASE (MFCG B3 / B8; FTG C1 / C2) | COVERED | §4.2 S1 (2)–(4): coast intents bay / headland / straight / fjord / islands; lakes, ponds, islands; tributaries; estuary; `WaterBody.kind` (§2.3) |
| VN-035 | Weakness: water and the "potential village area" generated independently → villages detached from their water | VG | vpa §3.8 [STATED 36199609] | A20 | BASE (O1; IMPR R11) | COVERED | §4.2 S3 "the site is placed relative to the river"; invariant "river within the core when requested" (§5.3) |
| VN-036 | Land ("earth bounds") must be multi-component — a river splitting the map left fields on one bank; land patches are built lazily during field layout | VG | vpa §3.8, §3.10.3 [STATED 50688261, 57968729]; pv R4 [SHOWN] | A21 | BASE (O1; MFCG B4) | COVERED | §4.2 S1 (8) land components by flood fill; every component gets uses (O14 g) |
| VN-037 | River course made **first, independent of terrain** (no noise); build 19251041: random polyline → fixed-step resample → Chaikin → per-vertex curvature (36–51 segments ≈ 40 px each) | VG 19251041 | pv R1, R2 [SHOWN]; V9 | P36, B04 | VILLAGE-LATER | NOT-PRECLUDED | a `RiverStrategy` registration (§4.12); the base's own course is traced by descent (§4.2 S1 (3)) |
| VN-038 | Build 19365073 course: two polar points + one interior point → Chaikin ×2 (6-point base curve) → 6–7 knots at even stations pushed along the normal (not a strict alternation) → cubic spline (7 samples per span) → fixed-step resample (64–94 segments); no shared-RNG call inside the constructor | VG 19365073 | pv P2–P4, N5 [SHOWN; INFERRED] | P36 | VILLAGE-LATER | NOT-PRECLUDED (note) | `RiverStrategy`; §4.2 S1 (3) cites "a Chaikin-smoothed control polyline with alternating offsets — VG's construction relayed in V9" and PART III lists a "course-first river" as reused unchanged — P4 refutes strict alternation on the live build, and the base's course is descent-traced, not course-first; wording fix only |
| VN-039 | Meandering requires narrow rivers (width and meander amplitude are coupled) | VG | vpb §2.3 [STATED 89314043] | B04 | BASE (FTG rivers; O1) | COVERED | width `w0 · acc^0.4` clamped per class + lateral meander term (§4.2 S1 (3)) |
| VN-040 | Every water type = a height-field primitive (`digRiver`, `digFork`, hollow → mount, island → mount) plus one shared level-set extraction (`setLevel → createDeflection → buildCurves → createPatches`); islands read as mounts with concentric relief rings | VG | pv R1, R3, P1 [SHOWN] | P37, P14 | BASE (IMPR R11 "water and terrain as one picture") | COVERED | different construction, same keep-property: §4.2 S1 draws coast / lake / pond / island outlines with one closed-outline routine and then lowers the heightfield so "contours and coast agree by construction"; lakes from sinks |
| VN-041 | Level-set water extraction cost: a ≈ 31 × 31 windowed search per land cell (≈ 945 inner steps; 13.8–14.5 M per map), a 129² contour lattice, quadratic segment linking, border walks to close land patches | VG | pv §4.1, P1 [SHOWN counts; INFERRED] | P46 | VILLAGE-LATER | NOT-PRECLUDED | §3.1 "the VG hot spot (`createDeflection`) avoided by construction" |
| VN-042 | Shorelines kept as chains (1 coast / 2 river / 3 confluence); open-chain (river) vs closed-ring (pond, island) handling | VG | pv §4.1, R3 [SHOWN] | P14, P38 | BASE (FTG shore types) | COVERED | L0 faces with typed `shore` / `bank` edges and per-segment `bankKinds` (§2.3, §4.2 (7)–(8)) |
| VN-043 | Ponds: usually one round pond, sometimes 2–3 or irregular; never piers; a pond is a level set of a radial hollow | VG | vpb §2.2 [STATED 88749133]; V8 | B03 | BASE (FTG C1 ponds) | COVERED | hollow primitive + closed-outline routine (§4.2 S1 (1)–(2)); piers only on harbour candidates (§4.8) |
| VN-044 | Coasts: coves and rarer headlands; a straight shore is the degenerate case | VG | vpb §2.5 [STATED 91692684] | B06 | BASE (MFCG B3; FTG C1) | COVERED | coast intent bay / headland / straight / fjord / islands (§4.2 S1 (2)) |
| VN-045 | Confluence: two arms merge (two carved polylines, `digFork`); the village sits in the wedge downstream | VG | vpb §2.6 [STATED 91692684]; pv R2 [SHOWN] | B07 | BASE (FTG C2 branches) | COVERED | tributaries from secondary inlets (§4.2 S1 (3)); village-in-the-wedge siting is a village scoring row (S3 table) |
| VN-046 | Estuary = a regular river + a bay | VG | vpb §2.7 [STATED 91692684] | B08 | BASE (MFCG `deltaRiver` = widened mouth, C15) | COVERED | "an estuary is a width-profile rule" (§4.2 S1 (3)); `WaterBody.kind` estuary |
| VN-047 | Island villages (the island is a mount; tiny forest; piers on the settled shore) | VG | vpa §3.8 [STATED 42521165]; pv R1, R5 [SHOWN] | A19, P37 | BASE (FTG C1 islands) | COVERED | islands as raised closed outlines (§4.2 S1 (2)) |
| VN-048 | Water rendering: deep fill + `shallowBands` boundary strokes of width W·k^1.5 (5.196 : 2.828 : 1 in three draw records) masked by the water polygon; colours lerp(deep, shallow, k/n); n − 1 tide lines; a sand halo (16 px + 8 px core); river centre streak; the ramp can invert | VG | pv §4.3 [SHOWN]; V10; vpa §3.8; vpb §2.10 | A22, B11, P03 | BASE (FTG D4 water rendering; IMPR R13) | COVERED | §8.2 `bands(N, W, exponent 1.5, ramp)` ("VG's law"); §13.5 draw-style check "VG bands 5.196 : 2.828 : 1"; bank class `beach` |
| VN-049 | Piers: "if a layout allows", inside the village border, perpendicular to the shore, 1–5 per map, plank-drawn, no shadow; suppressed on ponds and narrow rivers; connected to roads (stated) though most show no land connection | VG | vpa §3.9 [STATED 38498864, 50688261]; vpb §2.9; vnd A2.8 [SHOWN]; pv R3, R5 | A23, B10, D09 | BASE (MFCG B18; FTG C13) | COVERED | piers as `pier` ways at 12–20 m spacing on harbour candidates (§4.8; §4.2 S1 (6)) |
| VN-050 | Wharf pipeline `findDockable → getWharf → buildPiers / buildWharf`, landing validation; on dockable water the village heart is tied to the wharf | VG | pv §4.1, R4 [SHOWN; INFERRED] | P15, P39 | VILLAGE-LATER | NOT-PRECLUDED | S3 siting scores harbour candidates (§4.2) — a village scoring row |
| VN-051 | Bridges wherever a road crosses water; secondary bridges; several per map; crossing "as right as possible" by choosing a straight reach; deck plank-hatched, shadow cast on the water; fork bugs at bridge ends fixed | VG | vpb §2.8 [STATED 89314043, 91692684]; vnd A2.8; pv §4.3, R3, N4 | A25, B09, P17 | BASE (MFCG B8; FTG C2) | COVERED | crossing sites at the narrowest reaches with minimum spacing (§4.2 S1 (5)); deck ⟂ flow ± 10° and class from the way (§4.8); invariant "bridges within ± 10°" (§5.3). Note: §8.4's shadow pass lists buildings, walls, towers and trees — bridges are not named (VG casts bridge shadows; low) |
| VN-052 | Known defect: bridges near confluences cross at wrong angles | VG | vpb §2.6 [STATED 91692684] | B07 | BASE (weakness) | COVERED | invariant "bridges within ± 10° of the channel normal" (§5.3) |
| VN-053 | Mark existing buildings as special (watermills) instead of generating special geometry | VG | vpa §3.9 [STATED 36199609] | A24 | BASE (FTG mills on water) | COVERED | S10b siting: "mills on water" (§4.7) |

### 3.4 Density field and village heart

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-054 | One scalar "population density map" fixes the centre, the packing, the extent and the enclosure; the highway biases it ("often it's a place on the highway") | VG | vnd A2.1, Part C 1 [STATED 736720, 507254]; vpa §3.3 [STATED 35854256] | A04, D01 | VILLAGE-LATER (IMPR R11 names "one density field (VG)" but gives it no keep-test) | NOT-PRECLUDED | §4.5 density field of the prosperity field's type; PART III "a density field as the organising principle instead of districts"; order caveat VN-002 |
| VN-055 | Density drives branching frequency and buildings per unit length; a Low / Medium / High dial; `dense` / `sparse` / `district` tags nudge it | VG | vpa §3.3 [STATED 38498864]; vpb §2.24 [STATED 91692684] | A04, B28 | VILLAGE-LATER | NOT-PRECLUDED | a tracker `NetworkStrategy` reads fields through `StageContext` (§14); density is an intent field (§7.7) |
| VN-056 | Density on 19365073 = one per-cell 128² pass with every parameter fixed in a set-up (heart, radius, a water term that runs only on watered maps) and a rare shoreline arm | VG 19365073 | pv N1 [SHOWN loop shape; INFERRED formula] | P42 | VILLAGE-LATER | NOT-PRECLUDED | fields are rasters in the document (§2.9 snapshot `fields`) |
| VN-057 | Village extent scales with map size ("the larger the map, the larger the village") | VG | vpa §3.3 [STATED 38498864] | A05 | VILLAGE-LATER | NOT-PRECLUDED | frames per rung are table rows (D-19) |
| VN-058 | Further density consumers: spotlight focus, the palisade's "populated" set, field size, square placement | VG | vpb §2.24 [STATED 104226049, 104796798]; vpa §3.10.4, §3.12 | B28 | VILLAGE-LATER | NOT-PRECLUDED | the same field is readable by stages and by paint programs (`attrs`, §8.1) |
| VN-059 | Water as a veto surface by a downstream overlap test (no centrepiece over water) | VG | vnd A2.1 [STATED 507254] | D02 | BASE (invariant) | COVERED | §5.3 "water ∩ footprints = ∅" |

### 3.5 Roads and trails

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-060 | Road-first layout for small settlements (MFCG's subdivision-first "doesn't work too well" below a few hundred buildings) | VG | vpa §3.1, §5.1 [STATED 35854256] | A01 | BASE (the fusion thesis) | COVERED | arterials routed and secondaries grown before infill and plots (§1.4, §4.3–4.4) |
| VN-061 | Height field → gradient field → "trackers" (streamline walkers) draw roads; the tracker is a reusable component (Procgen Tarot, Winter Trees) | VG | vpa §3.1 [STATED 35854256]; pv §4.4 | A02 | VILLAGE-LATER | NOT-PRECLUDED | "a village product registers a tracker `NetworkStrategy`" (§14; PART III) |
| VN-062 | Tracker heading = momentum ("normally they 'resist' the relief trying to stay straight") + field term; `organic` raises the field weight | VG | vpa §3.1 [STATED 71653886] | A03 | VILLAGE-LATER | NOT-PRECLUDED | tracker strategy; the base's `planned ↔ organic` intent maps the heading sigma (§7.7) |
| VN-063 | Roads prefer isohypses as a function of slope — tracker steering, no path search (`Elevation.g` called 1–5 times per village; the gradient array is read inline) | VG | vpb §2.22 [STATED 104226049]; V3 / C10 | B25 | VILLAGE-LATER | NOT-PRECLUDED | `NetworkStrategy.grow(…, terrain, …)` receives the terrain (§14) |
| VN-064 | Tracker step contract `flexibility → findRoadAhead → avoidWater → endBridge → advance`; `branch` / `branchFrom`; neighbour queries; junction validation (4–11 trackers × ≈ 30–40 steps) | VG | pv §4.4 [SHOWN; INFERRED] | P04 | VILLAGE-LATER | NOT-PRECLUDED | tracker strategy over the kernel's `insertChain` (snap, split, weld — §3.4) |
| VN-065 | Tracker classes by `flexibility` arm (one arm = highway trackers); a bridge is one tracker step; a road-ahead hit triggers `shortcut` | VG 19365073 | pv N4 [SHOWN; INFERRED] | P45 | VILLAGE-LATER | NOT-PRECLUDED | same |
| VN-066 | Highway topology: a highway from a random map edge, through-running by default; tags `isolated` (none), `dead end` (ends at the square), `highway`, `crossroads` (two highways; branches loop back or get cut — glitchy); the creator: design for N highways | VG | vpa §3.4, §7.17 [STATED 84106820]; vpb §2.19 [STATED 88749133, 116745476]; pv §4.4 | A10, B20 | BASE (O4 g "N external connections exactly") | COVERED | external destinations = bearings (§4.2 S3), one arterial route per bearing (§4.3); invariant "no branch re-joins its parent within k segments" (§5.3); village tags map to 0 / 1 / 2 bearings |
| VN-067 | Junction policy: fewer crossroads, more T-junctions, new right-angle turns | VG | vpa §3.4 [STATED 57968729] | A07 | BASE (IMPR R3 "crossroads rare") | COVERED | T-preference, 4-way share 0–15 % (§4.4); Y → T (§4.3) |
| VN-068 | "Unreasonably curvy" roads fixed together with a density rewrite (a right-angled pattern was unobtainable on flat land) | VG | vpb §2.23 [STATED 105215836] | B27 | BASE (O4 b turn-angle spectrum) | COVERED | bounded, curvature-continuous heading change and the `planned` control (§4.4, §7.7) |
| VN-069 | Road classes: highway, secondary streets, lanes / field tracks, trails (dashed) | VG | vpa §3.4 [SHOWN]; vnd A2.5 | A08 | BASE | COVERED | `WayClass` incl. `track`, `path` (§2.4) |
| VN-070 | Geometric street width (house spacing) is separate from the drawn stroke width per class | VG | vpa §3.4 [STATED 80494491] | A09 | BASE | COVERED | `Way.widthCm` vs paper-unit stroke widths (§2.4, §8.2) |
| VN-071 | Seamless junctions: casing pass under the body, round joins and caps (100 % round joins in the draw record) | VG | vpa §3.4 [SHOWN]; pv §7.2 [SHOWN] | A11, P27 | BASE (MFCG casing idiom) | COVERED | `casing(w, h)`; "every casing before any body is a program property" (§8.2) |
| VN-072 | Road merging: side roads curve into the trunk with a filleted Y; view-side, toggled by palette `mergeRoads` ("quite crude") | VG | vpb §2.20 [STATED 104226049]; V11; pv App. A | B23 | VILLAGE-LATER | NOT-PRECLUDED | "junction fillets are a style-time smoothing" (§4.6) |
| VN-073 | Driveways for some, mostly larger, buildings; connecting all "looked wrong, like modern suburbia" (view-side) | VG | vpb §2.21 [STATED 104226049]; V11 | B24 | VILLAGE-LATER | NOT-PRECLUDED | "partial driveways" (PART III; §1.6); FTG farmstead driveways (§4.9) |
| VN-074 | Trails and "lonely houses" — an emergent by-product kept and tuned (fewer, longer trails running off-map) | VG | vpa §3.5 [STATED 57968729]; pv App. A (`spawnAt`, `shortcut`) | A12 | BASE (adopted on purpose) | COVERED | "farmsteads beside their fields with a `track` to the nearest lane (VG's lonely houses, on purpose)" (§4.9) |
| VN-075 | Repair rule: a trail crossing a field is truncated there and its end house moves to the new end, aligned to the field edge (`Farmland.fixTrails`) | VG | vpa §3.5 [STATED 57968729]; pv §4.7 | A13 | VILLAGE-LATER | NOT-PRECLUDED | exclusive land uses + tier-2 local repair (§5.1) |
| VN-076 | "No empty roads": roads without buildings are removed | VG | vpa §3.6 [STATED 36199609] | A16 | VILLAGE-LATER | NOT-PRECLUDED | prune dangling secondaries between stages (§4.4) |
| VN-077 | Roads leaving the map fade into dotted trails with widening spacing | VG | vpb §2.19 [SHOWN] | B22 | VILLAGE-LATER | NOT-PRECLUDED | roads continue to the context margin (§4.9); the fade is a paint program |
| VN-078 | Two recurring plans: a radial-concentric web around the plaza vs a crossroads / linear village | VG | vpb §2.19 [SHOWN]; vnd A2.5 | B21 | BASE (forms) | COVERED | forms catalogue rows `radial`, `linear-street` (§7.7); `ringed` preset (§4.4) |

### 3.6 Buildings, placement, classes, population

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-079 | Frontage placement: rectangles along road centrelines, uniform setback, long axis ∥ street, jittered gaps, both sides; rejection sampling (road test + `BinGrid` neighbour hash, 63–82 % acceptance); MFCG 0.7.5 adopted it for its outskirts ("placed more sparsely … all proper rectangles") | VG (+ MFCG) | vpa §3.6 [SHOWN; STATED 37407181]; pv §4.8 [SHOWN]; vnd A2.6 | A14, P21 | BASE (MFCG outskirts) | COVERED | ribbon regime (plots on the arterial, distance-to-gate density) and suburb regime (§4.4); detached / hovel site plans (§4.7 S11); a village "houses along ways" fabric (PART III) |
| VN-080 | Houses in short parallel runs of 2–6, oriented to the nearest road or boundary, standing in their own plots with grass between (not perimeter blocks) | VG | vnd A2.6 [SHOWN] | D06 | VILLAGE-LATER | NOT-PRECLUDED | detached-in-yard site plans (§4.7; §1.6) |
| VN-081 | The same place-along-a-curve rule rings the square with tangential houses and lines the shore in port areas | VG | vpa §3.6, §3.9 [SHOWN; STATED 38498864]; pv §4.5 | A17 | BASE | COVERED | frontage-first plots on every kerb edge, incl. `square` and `quay` frontages (§4.7 S10) |
| VN-082 | Footprint dimensions are real model data (the interior generator sizes its plan from them) | VG | vpa §3.6, §3.19 [STATED 66544756] | A15 | BASE | COVERED | footprints in cm and `Heights` on every building (§2.6) |
| VN-083 | Composite L / T footprints; special kinds (hall with spire, church or keep with a round tower, mills with round roofs); roof towers (`GableRoof.drawTower`) | VG | vnd A2.6 [SHOWN]; pv §4.8, R3 | D07, P21 | BASE (MFCG Complex; landmarks) | COVERED | `OutlineBuildingGenerator` rectangles and L / T (§2.6); institution site plans and tower heights (§4.7 S11) |
| VN-084 | "Large buildings" are special locations — monuments, a tree, a rock, a graveyard — moved onto street frontage; drawn as polyominoes or towered rectangles | VG | vpa §3.7 [STATED 36199609] | A18 | BASE (landmarks) | COVERED | claims first (§4.7 S10 (3)); pins (II.1); decoration table (§15.1 FTG C16); churchyards (§4.9) |
| VN-085 | Function and name assignment to existing buildings: inn, tavern, smithy, person, temple, basic / special shop, special (lighthouse only on a shore) | VG | pv §4.11, R6 [STATED console + grammar] | P25 | BASE (FTG roster) | COVERED | §10.2 roster + S10b siting (§4.7) |
| VN-086 | Population derived after layout by a per-building household draw (3.6–6.9 persons per building); plate rounded to 10; printed population editable | VG | pv §3.3, R6 [SHOWN; INFERRED]; vpa §3.22 [STATED 56941736] | P13, A06 | VILLAGE-LATER | NOT-PRECLUDED | a layout-first entry point exists (§4.7 S10b); households derived (§10.3) |
| VN-087 | Settlement class from building count with a water qualifier: roadhouse (≲ 17), hamlet (≈ 18–20), village; riverside / coastal / island | VG | pv §3.3, R6 [STATED console; INFERRED thresholds] | P12 | VILLAGE-LATER | NOT-PRECLUDED | the ladder "is a table open below TOWN" (§1.6, PART III); a descriptive class can be read from the statistics record |
| VN-088 | VG spans ≈ 130–1 700 inhabitants (the 1 700 map is a small town with a full radial-concentric web); the creator: villages of 15 k "should be generated in MFCG" and VG exists because MFCG's small towns fail | VG | vpb header [SHOWN 169696051]; vpa §3.16 [STATED 38498864], §5.1 [STATED 35854256] | B01, A01 | BASE (the size ladder's floor, IMPR O6; the owner's two ladders meet here) | PARTIAL (medium) | TOWN is ≈ 5 000 people / 1 200–1 500 buildings (§1.1, §12); §4.2 S0 accepts `population?` but no section states the base's minimum supported population or which product owns ≈ 1 500–5 000, and PART III gives the village ladder no population bounds — the boundary is undefined exactly where MFCG's creator admits failure |
| VN-089 | Roofs: one roof colour with the unlit plane = lit × a lightened shadow colour (t ≈ 0.92); several roof colours (weighted list, 1-in-3 slate); roof hatch colour → numeric Details; Slope; Gable / Hip / Flat (+ dome on large flat roofs); inner shadows on flat roofs; colour variance | VG | vpa §3.15 [STATED 71653886, 84106820]; vpb §2.27 [STATED 88749133, 104226049]; V14; pv §7.1, §7.3 | A42, B31, P29, P30 | BASE (MFCG C2 roofs; NG E4 colour law) | COVERED | `roof(kind, dark = lit × lerp(ambience, shadow, α))` — α and a white ambience reproduce VG's t ≈ 0.92 (§8.2); roof kinds incl. dome (§2.6); per-entity jitter (§8.2 E1) |
| VN-090 | `ruin` roof style: no roofs, incomplete walls; the random-style button can pick it | VG | vpb §2.27 [STATED 91692684]; vnd A5 [STATED 426543] | B31 | VILLAGE-LATER | NOT-PRECLUDED (caveat) | `LifecycleState` has no ruined state and `roof.kind` no ruin (§2.6, §2.8), while IMPR V3 relies on "the EVO lifecycle gives ruin as a state" — add the state (a schema-versioned enum value) |
| VN-091 | Rectangular houses are a consequence of the fake-perspective renderer; plans for non-rectangular houses, chimneys and dormers | VG | vpb §2.27–2.28 [STATED 117634240, 169696051] | B32 | BASE (stage-3 hook) | COVERED | top-down footprints with heights (§2.6); `Wing.dormers`; chimneys at neighbourhood LOD (§8.5) |
| VN-092 | Fake perspective: one global oblique extrusion for houses and trees; a Top-down option meant to become permanent | VG | vpb §2.28 [STATED 169047704] | B33 | VILLAGE-LATER | NOT-PRECLUDED | `PaintProgram` registry (§14); IMPR "no oblique default view" respected |
| VN-093 | Building glyph: three shaded roof planes, hatch lines crossing the ridge, footprint outline, an entrance mark; prism shadow | VG | pv §7.3 [SHOWN] | P29 | BASE (FTG entrance rule; MFCG / NG roofs) | COVERED | `Building.entrance` on the access edge (§2.6); `roof`, `hatch`, `shadowPass(prism)` (§8.2) |
| VN-094 | House numbering: mark a subset (shift-click), numbers in creation order (centre-outward along streets, outliers last), stored in permalinks from 1.6.5; `NumbersLayer` paints only marked houses | VG | vpb §2.34 [STATED 116745476, 117634240]; Critic-2 (vnd) | B40 | BASE (IMPR O13 addresses) | COVERED | "addresses as monotone numbering along each way (a layer)" and the annotation layer (§9); marks persist as edit events (§7.1) |
| VN-095 | Roundhouses "would look unnatural with grid-like road patterns" — building shape is coupled to road topology | VG | vpa §6 [STATED 50688261] | A59 | VILLAGE-LATER | NOT-PRECLUDED | `ClassRules` keyed by the context vector (§2.6) |
| VN-096 | Farmhouses "always touching and aligned to one of the field edges … more elongated" (MFCG plan quoted in the VG thread); VG applies the same alignment to trail-end houses | MFCG, VG | vpa §6 [STATED 37407181] | A13 | BASE | COVERED | farmsteads beside their fields (§4.9); compound site plans on the plot's OBB grid (§4.7 S11) |

### 3.7 Village square and centrepieces

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-097 | Square: at a high-density spot (often on the highway) a circle "of a reasonable size", distorted a little; ≈ half of villages; `no square` | VG | vpa §3.12 [STATED 80494491]; vnd A2.2 | A35 | VILLAGE-LATER | NOT-PRECLUDED | `square` corridor faces (§2.2, §4.7 S9); village siting row |
| VN-098 | Centrepiece: a large tree, a well or a tower prop — exactly one `props.{Tower, Tree, Well}` per `addCenterpiece` — suppressed when the square overlaps water; the tower is a prop not counted in "Buildings: N" | VG | vpa §3.12 [STATED]; vpb §2.26; pv R3 [SHOWN 6 / 6]; V16, V26 | A35, B30, D03 | BASE (FTG plot decorations WELL / BANDSTAND / STATUE, `_critic.md` §3; NG pins) | COVERED | `Pin` kinds well / large_tree / fountain (II.1); "a tree by the well" rule (§4.9); a tower as a claimed landmark |
| VN-099 | Square variants: round (favoured "as more natural"), rectangular / rotated-square, ellipse, irregular plaza with paved and green sub-areas; aligned to the highway when they overlap | VG | vpb §2.26 [STATED 89314043, 91692684]; pv §4.5 [SHOWN] | B30, P17 | VILLAGE-LATER | NOT-PRECLUDED | square faces sized from population; `SquareFabric` rectangular / round (II.2) |
| VN-100 | The square does not scale with population and sits at the density peak, not the enclosure centroid | VG | vnd A2.2 [SHOWN] | D03 | VILLAGE-LATER | NOT-PRECLUDED | the base sizes squares from population on purpose (§4.7 S9) |
| VN-101 | The square is made by whichever seeding routine fixes the village heart (`spawnWharf` / `spawnIsolated` / `build`) | VG | pv R4 [SHOWN parentage; INFERRED] | P39 | VILLAGE-LATER | NOT-PRECLUDED | S3 siting (§4.2) |
| VN-102 | Creator: medieval villages "didn't really have squares (village greens were different)" — built anyway for the genre | VG | vpa §3.12 [STATED 80494491] | A35 | VILLAGE-LATER | NOT-PRECLUDED | `green` / `commons` greenery and era presets (§4.9, D-2) |

### 3.8 Fields and orchards

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-103 | Field brief: mostly rectangular with a "comfortable" aspect, hinting at relief, clustered near houses (fantasy-map convention, not history) | VG | vpa §3.10.1 [STATED 50688261] | A26 | BASE (MFCG B17; FTG C14) | COVERED | hinterland field-system presets and land-use rings (§4.9) |
| VN-104 | Layout rules: fields adjoin the main road and water near the centre and "line up in circles" further out; grouped; on one side of small villages; sectors centred on the village; some curvilinear edges | VG | vpa §3.10.2, §3.10.4 [STATED 57968729]; vpb §2.11 [STATED 88749133] | A27, B12 | BASE (as a preset) | COVERED | "the MFCG/VG sector look … as a style preset" (§4.9) |
| VN-105 | Recorded construction: Voronoi of the land ∩ (PolyBool) → recursive OBB bisection to a minimum area (`makeCut = split = PointExtender.project`) → `pickLots` / `filterLots` (field vs pasture) → arc-rounded corners (`semiSmooth`, `getArc`) → `fixTrails` | VG | pv §4.7 [SHOWN]; C9, V4 | P19 | BASE (the OBB bisector is MFCG's primitive) | COVERED | §4.9 "(Voronoi of ring seeds ∩ land cut by the OBB bisector, the recorded construction)"; OBB built in the kernel (§3.1) |
| VN-106 | At most one house per field — otherwise the **field** is discarded, not the houses | VG | vpa §3.10.4 [STATED 57968729] | A28 | VILLAGE-LATER | NOT-PRECLUDED | exclusive land uses (§5.3) and farmstead site plans (§4.7) |
| VN-107 | Field size inverse to density — make the rejection unit small where rejection is likely (no holes; croft look) | VG | vpa §3.10.4 [STATED 57968729] | A29 | BASE (IMPR R12 "make the rejection unit small where rejection is likely") | COVERED | ladders act on the smallest failing entity with substitution (§5.1); class bands (§4.7) |
| VN-108 | Shape-quality predicate discards triangular, sectorial and non-compact fields | VG | vpa §3.10.4 [STATED 57968729] | A30 | BASE (O5 wedge / min-angle rules) | COVERED | min angle / width invariants (§5.3); `wedge` class (§4.7 S10 (5)) |
| VN-109 | Polygon Booleans leave "thorn" slivers along the road | VG | vpa §3.10.3 [STATED 50688261] | A31 | BASE (O3) | COVERED | §3.5 "boolean 'thorns' (VG 50688261) → integer Clipper2 with re-snapping" |
| VN-110 | Field anatomy: cells inset from each other by ground-coloured lanes; furrows along the long axis — dashed (1.2.7), slightly curvilinear (1.5.3), constant within a field and varying between fields, constant spacing, numeric intensity; multi-colour crops; one dashed polyline per furrow | VG | vpa §3.10 [SHOWN; STATED]; vpb §2.12 [STATED 91692684, 169696051]; pv §4.7 [SHOWN] | A32, B13, P20 | BASE (MFCG furrows) | COVERED | `LandUse.furrowAxisCdeg` (§2.7); `hatch(angle …)` program (§8.2); `field_bound` edges |
| VN-111 | Field mosaic from recursive axis-varying cuts; hedgerow trees planted along lanes and at parcel corners | VG | vnd A2.4 [SHOWN] | D04 | BASE (FTG hedgerows) | COVERED | enclosed fields with hedgerow lines; `hedgerow` greenery (§4.9, §2.7) |
| VN-112 | Crofts / kitchen gardens inside the palisade; several field fill classes (hatched crop, pale, unhatched paddock) | VG | vnd A2.4 [SHOWN] | D05 | BASE (yard parts; land-use kinds) | COVERED | yard parts `garden`, `orchard`, `pen` (§2.5); `LandUse.kind` arable / meadow / pasture / commons … (§2.7) |
| VN-113 | Fields exported to JSON for the 3-D viewer | VG | vpa §3.10 [STATED 50688261] | A32 | BASE | COVERED | GeoJSON per entity incl. land use (§11) |
| VN-114 | Orchards = fields overlapped by one or more houses; rows of small trees, or a chaotic fill when the plot is irregular (`getRows` vs `getPoisson`, `validateTree`); `no orchards` tag; hideable | VG | vpa §3.11 [STATED 80494491]; vpb §2.13 [SHOWN]; pv §4.7; Critic-2 (vnd) | A34, B14, P20 | BASE for orchards (IMPR O19 / O14); VILLAGE-LATER for the house-overlap trigger | COVERED / NOT-PRECLUDED | orchards in hinterland ring 1 and as edge greens, trees on a 6–8 m jittered grid (§4.9); the trigger is a village rule |
| VN-115 | Land-use rings proposed by a patron and partly adopted: vegetable gardens near the centre, fields, woodland further out; field size from density | VG (comment) | vpa §6 (38498864, Moritz Hackl) | — | BASE (IMPR O14 rings) | COVERED | rings gardens / closes / orchards → fields → meadow / pasture / commons → coppice → wild wood (§4.9) |

### 3.9 Trees and forests

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-116 | Trees "fill → carve": `Many` fills the map, `Some` makes random patches; trees too close to cottages or roads are removed (the clearing survives Wilderness mode) | VG | vpa §3.13.2 [STATED 42521165] | A36 | VILLAGE-LATER | NOT-PRECLUDED | "the `grove` tag and VG's dramatic forest kept as options" (§4.9) |
| VN-117 | Tree density = domain-warped fBm (a separate 6-octave field) with settlement avoidance; `grove` reverses it (hug buildings, bare map edges); hedgerow belts emerge between land uses | VG | vpb §2.15 [STATED 88749133]; pv R2 [SHOWN]; V15 | B16 | BASE (forest edges) | COVERED | "forest edges by domain-warped density noise (a render-time property)" and `grove` option (§4.9) |
| VN-118 | Forest construction: Poisson → Voronoi (Delaunator) → DCEL; cells labelled by a noise threshold; flood-filled patches; outline → `shrink` / `shrinkExcl` against roads, fields and buildings; the forest asks farmland to give ground (`Farmland.reroll`) | VG | pv §4.6 [SHOWN; INFERRED] | P18 | VILLAGE-LATER | NOT-PRECLUDED | woods as `wood` greenery faces (§2.7); exclusive land uses |
| VN-119 | Poisson-disc sampling with k = 50 candidates per step, all evaluated (shared by MFCG, VG, NG) | VG, NG | pv §0.6, §4.6 [SHOWN]; C2, V6 | P06 | BASE | COVERED | "Bridson with k = 50 candidates, all evaluated" (§3.1); D-11 |
| VN-120 | `PoissonPattern.warp` wraps each coordinate into the pattern period (toroidal tile) and `fill` tiles it 6 × 6 — not a domain warp; the ragged wood edges come from the density noise | VG 19365073 | pv N3 [SHOWN shape; INFERRED W1]; V15 | P44 | BASE (MFCG's tile trick) | COVERED (note) | "a fixed 140-point tile stamped per area" (§3.1); the same row also lists "a domain-warped variant for wood edges" under the Poisson primitive — V15 / N3 put the warp on the density noise, as §4.9 already does; wording fix |
| VN-121 | Forest depiction at the "inconvenient middle scale": rim crowns drawn individually, a muted band, a solid interior ("Improved"); a `thicket` interior colour; far-field woods as a flat tint with a scalloped edge | VG | vpa §3.13.3 [STATED 42144467, 71653886]; vpb §2.16 [STATED 104226049] | A38, B17 | BASE (FTG area-filled forests, IMPR R14) | COVERED | "calm at city zoom (area fill → crowns → lobed trees by LOD)" (§4.9) |
| VN-122 | Tree glyph = concentric bands with a per-type vertical offset (fake 3-D); `treeShape` Cotton / Conifer / Palm; per-tree colour from a weighted list; crowns are a few prototypes instanced by scale / translate; one linear gradient per crown | VG | vpb §2.14 [STATED 91692684]; pv §7.1, §7.3 [SHOWN] | B15, A39, P28 | BASE (NG C5 crowns) | COVERED | `crown(lobes, jitter)` and `instances(symbol, stream)` (§8.2); VG's band glyph is a registrable program |
| VN-123 | Tree shadows: offset silhouette, conifer jagged triangle, a group shadow drawn once as a union; shadows of varying length | VG | vpb §2.17 [STATED 91692684, 121415691]; vpa §3.13.3 [STATED 71653886] | B18, A39 | BASE (single-pass shadows, IMPR R13) | COVERED | crown offset in the shadow pass, composited once per layer (§8.4) |
| VN-124 | Tree-group shading and per-crown gradients None / Linear / Radial | VG | vpb §2.18 [STATED 110526365, 169047704] | B19 | VILLAGE-LATER | NOT-PRECLUDED | paint programs (§8.2, §14 registry) |
| VN-125 | Trees too large relative to houses ("this is buildings being tiny"); tree count vs speed | VG | vpa §3.13.1 [STATED 42144467] | A38 | BASE | COVERED | "crown diameters in metres consistent with building sizes" (§4.9); 10 000 trees per 16 ms frame |

### 3.10 Palisade

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-126 | `palisade` tag: an enclosure whose shape "depends on the population density map"; dense villages get a larger radius on average | VG | vpb §2.25 [STATED 104796798]; vnd A2.9 [STATED 736720] | B29 | VILLAGE-LATER (IMPR R6 names VG's cheap palisade) | NOT-PRECLUDED | `Enceinte.kind` palisade (§2.7); trace from a stage boundary (§4.8) |
| VN-127 | Build 19251041 construction: the populated set → convex hull → 32-segment cubic → raster push-off from buildings (`BitMap.check` 1 463) → gates snapped to wall segments and validated; passage shadows | VG 19251041 | pv §4.9 [INFERRED from counts]; V12 | P22 | VILLAGE-LATER | NOT-PRECLUDED | S7 trace pipeline (smoothing, simplification, band) (§4.8) |
| VN-128 | Build 19365073 construction: 10 × 10 density lattice → 13–20 kept samples → convex hull → clean → closed cubic spline (11 samples per span) → fixed-step resample (29–45 vertices) → a read-back raster for overlap tests; 3–4 gates | VG 19365073 | pv N2 [SHOWN identities; INFERRED] | P43 | VILLAGE-LATER | NOT-PRECLUDED (caveat VN-003) | needs the wall before the network |
| VN-129 | The fence cuts through woods (some trees left inside) and fields (small fields and orchards inside; overlaps "quite common") | VG | vpb §2.25 [STATED 104796798] | B29 | VILLAGE-LATER | NOT-PRECLUDED | wall band and setback band subtract land uses (§4.8) |
| VN-130 | Gates are ordinary houses where roads cross the wall; gate count = road crossings; gates numberable and openable in the interior generator | VG | vpb §2.25 [STATED 105215836]; vnd A2.9 [SHOWN] | B29, D10 | BASE (MFCG / FTG gates at crossings) | COVERED | gates exactly where arterials cross (§4.8); `Gate.kind` gatehouse with heights (§2.7) |
| VN-131 | The palisade does not enclose every field or house | VG | vnd A2.9 [SHOWN] | D10 | BASE (O8 e enclosed share) | COVERED | enclosed share reported; ribbon and suburb regimes outside the enceinte (§4.4) |
| VN-132 | Rendering: a bank with stake beads and rampart ticks; the gate shadow shows the arch; the 3-D viewer shows a smooth low wall | VG | vpb §2.25, §5 [SHOWN; comment]; vnd A2.9 | B29, B47, D10 | VILLAGE-LATER | NOT-PRECLUDED | style programs; walls as prisms in glTF (§11) |
| VN-133 | Exported as its own polyline channel, deliberately not as a city wall ("would look really weird") | VG | vpb §2.25 [STATED 104796798, 105215836] | B29, B45 | BASE (O8 h: the wall as an entity in every export) | COVERED | enceinte entity with its `kind` in every export (§11; registry §2.8) |
| VN-134 | Villages sit on or next to hills (palisade + hill = motte-and-bailey for free); the palisade is the only fortification primitive (no keep, no ditch) | VG | vnd A2.9, A5 [STATED 613514] | D11 | VILLAGE-LATER | NOT-PRECLUDED | S3 siting scores elevation; enceinte kinds earthwork / bailey (§2.7) |

### 3.11 Names, legend, points of interest

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-135 | Tracery grammar (69 symbols) with `TAG?-` feature guards, `p?-` weights, inline alternation and optional letters; a deck selector (no repeats); given-name lists + compound surnames; Markov syllables — shared with MFCG | VG | pv §4.11 [STATED assets]; `_critic.md` §3 | P24 | BASE (MFCG D1) | COVERED | own Tracery-class engine with modifiers, feature guards and weighted decks, syllable and Markov generators over our own corpora (§10.4); `deck(table)` helper (§6.1) |
| VN-136 | Over-long names shrink by removing interior syllables ("shrinking amelriceing" → Amelceing) | VG | pv §4.11 [STATED console] | P24 | BASE (FTG folk contraction) | COVERED | folk-contraction with a "≤ 3 syllables" parameter (§10.4) |
| VN-137 | Village names (compounds of a nature word + a settlement or landform suffix); rename by click; reroll | VG | vpa §3.22 [SHOWN; STATED 38498864] | A51 | BASE | COVERED | names rerollable, editable, persisted per entity (§9) |
| VN-138 | Points of interest generated (e.g. "Arnald's Blades (smithy)"), exactly two per village, console-only from 2020 to the 2026 builds — blocked on where to put a legend ("sick and tired of implementing the legend"; "everything on one page") | VG | vpa §3.21, §5.6–5.7 [STATED]; pv §4.11, R6; Critic-2 (vpa) | A50, A57, P25 | BASE (IMPR O13 annotation layer) | COVERED | annotation layer with numbered markers and a separate legend sheet; legend from the symbol registry (§9) |
| VN-139 | MFCG's legend with a scale bar and a numbered district list (VG has none) | MFCG (in the VG slice) | vpb §3 [SHOWN 121415691] | B50 | BASE | COVERED | furniture: scale bar, legend (§9) |
| VN-140 | Nameplate: name over "Pop. N", placed in the emptiest corner (`measureRect`, `layoutPlate`), paper-coloured halo, Hide-population option, fonts per role | VG | vpa §4.1–4.2; vpb §2.37 [STATED 117634240]; pv §7.5 [SHOWN] | A53, B43, P31 | BASE (IMPR R16 title in the emptiest corner) | COVERED | "the title in the emptiest corner (NG's rule)", halos, type roles (§9, §8.2) |

### 3.12 Rendering and style

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-141 | Palette as JSON — ≈ 17 slots in 2020, ≈ 40 keys live — incl. algorithm-mode keys (`relief`, `roofType`, `treeShape`), weighted colour lists, string-typed values; six themes loaded eagerly; a style dialog; persistence | VG | vpa §4.1 [STATED 42521165]; pv §7.1 [STATED asset] | A52, P01 | BASE (MFCG E1; IMPR R13) | COVERED | style sheets = palette roles (`Color` or `Color[]`) + a program table; "VG 40 … map onto it without loss" (§8.2) |
| VN-142 | 2020 styles were separate renderers with separate palette schemas; consolidated onto one renderer | VG | vpa §4.1 [SHOWN palette files] | A52 | BASE (IMPR R13 "one geometry, many looks") | COVERED | one display list, many style sheets (§8.1–8.2) |
| VN-143 | Colour formulas: outline / detail = lerp(fill, ink, factor × pressure) (hard-light composite); selective outlining ("shades of the objects themselves"); `Pressure` special values (1.0 = solid ink, 0 = no outlines, "1 and 0.999 … very different") | VG | pv §7.4 [verified ± 0.005]; vpb §2.32 [STATED 169696051]; V13 | P02, B37, B38 | BASE (IMPR R13 "selective outlining") | COVERED | `outlineMix(factor)` (§8.2); §7.8 makes the 1 vs 0.999 discontinuity a named failure — improved |
| VN-144 | Shadow parameters colour, length, angle; consistent offset drop shadows | VG | vpa §3.15 [STATED 57968729]; pv §7.1 | A43 | BASE (MFCG ink shadow; FTG lit) | COVERED | `shadowPass(colour, alpha, offset or prismFromHeight(sun))` (§8.2, §8.4) |
| VN-145 | Spotlight / "dramatic light": a radial gradient focused on the density maximum (or the centre, or pushed to an edge by the shadow angle), shadow colour vs its complement, independent intensities, size; composited over everything | VG | vpb §2.29 [STATED 104226049]; vnd A2.10; pv §4.10 [SHOWN] | B34, D13, P23 | VILLAGE-LATER | NOT-PRECLUDED | `vignette` program; the reserved `painterly` preset (§8.2) |
| VN-146 | Night: warm per-building glows (VG) vs a lit street network (NG); from 1.6.8 VG's lights switch by one continuous map | VG, NG | vpa §4.3 [SHOWN]; vpb §2.33 [STATED 169696051]; vnd A3.4 [SHOWN] | A54, B39, D19 | BASE (FTG D5; IMPR R13 soft lights) | COVERED | `night` preset with a `lights` role and glow instances; lights from the module (§8.2; §15.1 FTG D5) |
| VN-147 | Printer-friendly presets (Outlines, Minimal); twelve styles over one seed prove the renderer must survive no fills (bw, subtle) and no outlines (minimal); geometry exposes semantic categories | VG | vpa §5.10 [STATED 44111493]; vnd A3.6 [SHOWN 635140] | A55, D18 | BASE (IMPR R13 keep-test) | COVERED | "every preset survives a render with no fills and with no outlines" (§8.2, §13.4); `bw-print`; semantic marks (§8.1) |
| VN-148 | Road / field outlining none / hard / soft; per-class road line thickness decoupled from house spacing (`smallRoad`, `largeRoad`, `outlineRoads`, `outlineFields`) | VG | vpa §1 row 13 [STATED 80494491]; pv §7.1 | A56 | BASE | COVERED | casing parameters and outline factors per semantic (§8.2) |
| VN-149 | Layer order shading → relief → roads → fields → bank → mask → water → bridges and shore → shadows → buildings → forest → light → labels | VG | pv §7.2 [SHOWN] | P26 | VILLAGE-LATER | NOT-PRECLUDED | "Layer order is data" (§8.2) |
| VN-150 | Everything pre-tessellated (no Bézier reaches the canvas); round joins and caps; a handful of named stroke widths | VG | pv §7.2 [SHOWN] | P27 | BASE (MFCG stroke discipline) | COVERED | round joins ≥ 99.9 % in the draw-style census; paper-unit widths (§8.2–8.3) |
| VN-151 | Per-instance colour jitter (`roofVariance`, `fieldVariance`, `treeVariance`) and weighted base colours | VG | pv §7.1, §7.4 [STATED; INFERRED] | P30 | BASE (MFCG E1 tints) | COVERED | per-entity jitter attributes from `style/jitter` streams (§6.1, §8.2) |
| VN-152 | Grid overlay (size in abstract units, adjustable opacity) | VG | vpb §2.35 [STATED 169696051]; V17 | B41 | BASE (FTG / MFCG grids) | COVERED | grid at a round ground distance, metres or feet (§9) |
| VN-153 | Random style preset ("surprisingly hard to generate a colour scheme that looks good"); a shared style-collection page | VG | vpb §2.36 [STATED 89314043, 94118928] | B42 | BASE (O12 f) | COVERED | random styles must pass minimum luminance contrast (§8.2); styles are data files |
| VN-154 | Miscellaneous marks: grass tufts, fences / hedges between plots, a paper texture overlay, a painterly raster post-process | VG | vnd A3.8 [SHOWN] | D20 | BASE (FTG D6 post-process) | COVERED | `parchment` preset; post-process hooks (§15.1 FTG D6); hedgerow instances |
| VN-155 | Scale: sizes 300 / 500 / 800 units; the JSON export uses 0.7 m per unit (medium ≈ 350 × 350 m); "about 300 or maybe 200 meters"; the on-screen grid is in abstract units | VG | vpa §3.16 [STATED 84106820]; vnd A5 [STATED 613514]; V17 | A44 | BASE (O6 metres) | COVERED | integer centimetres everywhere (§2.1) — the ambiguity cannot arise |
| VN-156 | Non-square maps (custom width and height; rotation removed to allow them; "too much time … not such a wild idea"); layout adapts to the aspect; the initial map sized to the window | VG | vpa §3.16 [STATED 84106820]; vpb §2.38 [STATED 169047704]; vnd Part C 10 [STATED 541652] | B44, D22 | VILLAGE-LATER | NOT-PRECLUDED (note) | `Terrain.cols / rows` allow rectangles (§2.3), but frames are stated as single sizes (2 / 5 / 8 km, D-19); state the frame as width × height so aspect is a table value |

### 3.13 Export and integration

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-157 | Exports: PNG; a "GeoJSON-like" JSON (strict GeoJSON rejected as too rigid; two formats "too much code"); SVG through one retained draw list (≈ 1 000 lines shorter, more features exportable); an exporter version string | VG | vpa §3.20 [STATED 37407181, 44111493, 56941736]; vpb §2.39 | A49, B45 | BASE (MFCG G1) | COVERED | native `.plat`, RFC 7946 GeoJSON, layered SVG from the display list, PNG (§11) |
| VN-158 | Exported 3-D semantics: building footprints with orientation and height, trees with position and radius, the square with its well, road ribbons with width, fields, the palisade with gates; elevation not exported | VG | vnd A2.12 [SHOWN 740285]; vpb §2.39 | D15 | BASE (IMPR §5.2 O11 extras 3-D) | PARTIAL (low) | glTF covers buildings, walls, towers, terrain and water (§11); tree instances are "never stored" (§2.7, §4.9) and no exporter says it instances them from the display list (MFCG also exports forests, vpb §5) |
| VN-159 | Hand-offs by URL / GET parameters: region → village (name, coastal setting), building → interior generator (dimensions; street-facing entrances planned for MFCG / NG), village → 3-D viewer by JSON; "several smaller apps" over one giant one | VG, NG | vpa §3.19 [STATED 56941736, 66544756]; vnd A2.12, A4.1 [STATED 382428]; vnd B2.6 [STATED 419786] | A48, D16, N11 | BASE (MFCG G2) | COVERED | embedding API + `postMessage` bridge (§11); the stage-3 `BuildingGenerator` receives the plot and entrance directly (§2.6) |
| VN-160 | Patron request: granular JSON, a picking UI and a query / edit API for third-party tools | VG | vpb §5 (169696051, unanswered) | B48 | BASE (owner roadmap: embeddable API) | COVERED | `query`, `edit`, `subscribe`, `Backend.pick` (§11, §14) |
| VN-161 | Patron requests: a manor for a fiefdom; a ruin slider; wear / dirt; villages around rocks and big trees; livestock enclosures; wells; roof variety | VG | vpb §5 (91692684); vnd A5 (426543) | B48, D21 | VILLAGE-LATER | NOT-PRECLUDED | assignments (§7.7) and the stage-3 hook; yard part `pen` (§2.5); pins; roof kinds; lifecycle (ruin caveat VN-090) |
| VN-162 | Philosophy "fantasy-map convention over history" (fields, squares: "probably not a very realistic layout, but it looks nice") | VG | vpa §5.5 [STATED 50688261]; vpb §4.1 [STATED 88749133, 104796798] | A58, B46 | VILLAGE-LATER | NOT-PRECLUDED | the owner's tiebreaker and D-3 (realism in the base) govern the base; the VG looks survive as presets (sector look, `grove`, §4.9) |
| VN-163 | Detail cascade: trees imply fields, hedges and wells, i.e. assumptions about technology and social organisation | VG | vpa §5.3 [STATED 38498864] | — | VILLAGE-LATER | NOT-PRECLUDED | era / region presets (D-2) and circumstances (§7.7) make those assumptions data |

### 3.14 Neighbourhood (NG) capabilities in this slice

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-164 | Bent-cut recursive bisection ("recursive bisection with a twist"): more natural junctions, the recursion unreadable; "too slow and too unstable" for MFCG; NG 1.0 a from-scratch rewrite | NG | vnd B2.1, Part C 3 [STATED 315495] | N01 | BASE (IMPR R3; parity NG B3) | COVERED | the bent cut as a kernel transaction with a bounded ladder (§4.6); robustness from the kernel (§3.3–3.5) |
| VN-165 | Bent-cut parameters (bend position, endpoint edge, stop predicate, width law, reject filter) unrecovered; `makeCut = PointExtender.project` holds for the plain bisectors of MFCG, VG and NG but not for `BisectorEx` → C13 plain OPEN | NG, VG | V5; `_critic-vg-ng.md` §6 item 5; pv Critic-2 item 2 | C05 | BASE | COVERED (own design) | C13 declared OPEN and an own construction calibrated on measured outputs (§0.5, §4.6); `isSmallEnough` bounded by M-1 #2 (§16) |
| VN-166 | Hole-aware bisection of annuli (`BisectorEx`): the corridor subtracted inside the cut, a retry loop (≈ 4 % "Alternative cut", ≈ 1 % restarts), bends filleted by arcs, streets meeting both rings at right angles | NG | V5; `_critic-vg-ng.md` §2 [SHOWN] | C05 | BASE (primitive) / STAGE-2 (ring) | COVERED | "Holes (the `BisectorEx` case, C13 OPEN — ours)": slit routing + the same ladder (§4.6) |
| VN-167 | Street corridor: a model stripe (`PolyCreate.stripe`) plus a view stroke at `getStreetWidth`; streets as negative space at launch, roughly constant width | NG | vnd B2.1 [SHOWN]; V19 | N02 | BASE (parity NG B5) | COVERED | `corridorUnion` (§4.7 S9); "negative-space streets is purely a style" |
| VN-168 | Lots = the same recursive Bisector per block + `indentFronts` setback + `validateOuter`, which discards ≈ 42 % of lot leaves — the perimeter-block look is a filter, not a ring walk | NG | V18 [SHOWN] | N04 | BASE (parity NG C1) | COVERED (replaced) | frontage-first construction with 0 discards (§4.7 S10) |
| VN-169 | Perimeter-block look: narrow frontage strips of varying width and constant depth, interior courtyards (trees or bare), whole green blocks | NG | vnd B2.2 [SHOWN] | N04 | BASE (IMPR R3, R4) | COVERED | strips perpendicular to frontages; residue typed `court` / `green` (§4.7 S10 (4)–(6)); green blocks through the dispatch (II.3) |
| VN-170 | Partly built blocks: runs of frontage left empty, "which prevents the 'every block fully ringed' monotony" | NG | vnd B2.2 [SHOWN]; V18 (their source is `validateOuter`'s discard) | N04 | BASE (IMPR R3 names "partly built frontages") | PARTIAL (medium) | `vacant` residue exists and suburb plots carry a density Bernoulli (§4.4), but no rule leaves frontage runs vacant inside built districts; O5 / O17 drive discards to 0 and streetwall continuity ≥ MFCG Lots, so NG's source of the look is removed without a replacement — a vacancy-run share per band in the granularity table (§4.7) would close it |
| VN-171 | Alternating light / dark roof tones per house; the whole block casts one drop shadow (blocks read as plateaus) | NG | vnd B2.2, B3.3 [SHOWN] | N05 | STAGE-2 (NG E4 / E5 tier) | COVERED | `hatched` preset: one flat shadow pass, two-tone roofs, jitter (§8.2) |
| VN-172 | Template system: Area, Street, Square (round and rectangular branches), Ring; Junction, Park, River bank, Bridge, Port planned and never built | NG | vnd B2.3; Critic-2 (vnd) [SHOWN 10 samples; STATED 64375271] | N06 | STAGE-2 | COVERED | `RingFabric`, `SquareFabric`, `StreetFabric`, `area` = the base default (II.2); context templates (II.2–II.3) |
| VN-173 | Ring template: one or more concentric ring roads (48 / 50-vertex rings at one width), annuli cut by `BisectorEx`; a too-small centre becomes a square, a grove or a single large building | NG | vnd B2.3 [STATED 419786]; Critic-2 (vnd) | N07 | STAGE-2 (+ BASE substitution, IMPR R12) | COVERED | `RingFabric` (II.2); ladder rung (d) substitution (§4.6, §5.1 tier 5) |
| VN-174 | Templates clipped by an independently generated patch outline (ring radials truncated) | NG | vnd B2.3 [SHOWN] | N03 | STAGE-2 (weakness) | COVERED | templates run inside the district's typed boundary (II.1–II.2) |
| VN-175 | Hood outline = `<template>.createShape` (OBB-sampled; `asScale` only in area / ring); `getCloud` is view framing, not the outline | NG | V21; `_critic-vg-ng.md` §2 [SHOWN] | C01, N03 | STAGE-2 | COVERED | the district's typed boundary; the standalone / sky outline from §4.2's closed-outline routine (II.1) |
| VN-176 | Large buildings (a long hall, a hipped-pyramid mansion, a domed rotunda) occupying a block or most of one | NG | vnd B2.4 [SHOWN] | N08 | BASE (parity NG C2 / C3) | COVERED | claims first (§4.7 S10 (3)); institution site plans; roof kinds pyramid / dome (§2.6) |
| VN-177 | Pins: fountains, wells, large trees — a point-landmark layer with its own toggle, the same vocabulary as VG's centrepieces | NG | vnd B2.4 [STATED 419965] | N09 | STAGE-2 | COVERED | `Pin` in the registry from M1 (II.1); placement gate per kind and band (II.3) |
| VN-178 | NG props: chimneys (`Wing.addChimney`), wells, fountains (radial gradients), domes | NG | V22 [SHOWN] | C02 | STAGE-2 | COVERED | `hatched` tier chimneys and wells; `Pin` fountain; roof `dome` (§8.2, II.1) |
| VN-179 | Squares: rectangular (`buildSquare`) and round (`buildRound`) in the live build; 1.1.0's irregular square formed as a void of omitted frontages | NG | vnd B2.5 [SHOWN]; V20 | N10 | STAGE-2 | COVERED (live) / PARTIAL (low) | `SquareFabric` rectangular or round plaza (II.2); IMPR S4's restraint "keep NG's square as a void in the fabric beside planned ones" has no mechanism in II.2 |
| VN-180 | Block content classes Normal (≈ 88 %) / Manor / Empty / Green; `createGreen` on 23–58 % of Normal blocks (77 % with `leafy`) | NG | `_critic-vg-ng.md` §2 [SHOWN] | C06 | STAGE-2 (+ BASE residue and greenery) | COVERED | dispatch table with a target per band (II.3); greenery rules (§4.9) |
| VN-181 | Knobs a neighbourhood varies: minimum and maximum street widths, average building and block size | NG | `_critic-vg-ng.md` §2 [STATED 70917627] | C04 | STAGE-2 | COVERED | `District.fabricParams`; lane width law (§4.6 step 6); granularity table (§4.7) |
| VN-182 | Tag space: `Settings.resolve` fills missing slots from URL tags; `ring`, `small` / `large`, `leafy`, `secular`; multi-colour style parameters; a tags window | NG | `_critic-vg-ng.md` §2 [SHOWN; STATED 64375271, 70917627]; vnd B3.1 | C07, N13 | STAGE-2 | COVERED | `NeighbourhoodRequest.params` and district context (II.1); style sheets (§8.2) |
| VN-183 | Layers trees / greens / pins / roads / shadows; presets 1–6 and random; Enter = new hood, Shift+Enter = new hood and new random style | NG | vnd B3.1 [STATED 419965] | N13 | STAGE-2 (app) | COVERED | display-list groups; presets as data; "same kind, new seed" per district (II.4) |
| VN-184 | NG is flat and terrain-free: a floating patch with its own ground tone and drop shadow; a title-only sans-serif nameplate | NG | vnd B3.1, B3.5 [SHOWN] | N14 | STAGE-2 | COVERED | standalone no-portal mode and the sky context (II.1 rule 5); title rule (§9) |
| VN-185 | Cobbled streets (pebble outlines, kerb stipple); at night the street network is the light source | NG | vnd B3.2 [SHOWN] | N15 | STAGE-2 (tier) | COVERED | `hatched` road programs cobbles / tiles / outlined / dashed (II.4); `night` preset |
| VN-186 | NG buildings: narrow rectangles, ridge-and-rafter hatching, alternating tones; large buildings with hipped pyramids or domes; few tree tints, no hedgerows | NG | vnd B3.3–B3.4 [SHOWN] | N05, N08 | STAGE-2 (tier) | COVERED | `hatched`: tapered hatch, two-tone roofs, lobed crowns in two greens (§8.2) |
| VN-187 | Building hand-off to Procgen Mansion by GET (footprint approximated) | NG | vnd B2.6 [STATED 419786] | N11 | STAGE-2 (stage-3 hook) | COVERED (beyond) | the stage-3 interface takes the plot and entrance (§2.6) |
| VN-188 | Two block regimes — VG's free-standing houses on open plots vs NG's perimeter blocks — are the lever between village and town-quarter feel | VG, NG | vnd Part C 2 [INFERRED] | N16 | BASE | COVERED | site-plan arrangements row / compound / detached / hovel by class × band (§4.7 S11) |
| VN-189 | Degenerate subdivision → substitute a landmark (square, grove, single large building) instead of slivers | NG | vnd Part C 4 [STATED 419786] | N07 | BASE (IMPR R12) | COVERED | tier-5 substitution (§5.1); ladder rung (d) (§4.6) |
| VN-190 | Polyline / polygon helpers (resample, simpleInset, warpOpen / warpClosed, offsetOpen / Closed, smoothOpen, testShapeVsCurve) and `Bloater` iterative inflation (use unrecovered); grid / numbers / plate layers built every run and painted only when enabled | VG | pv App. A, §8, §10.11 [SHOWN counts] | P32, P33, P34 | BASE | COVERED | kernel operations `sampleBoundary`, `insetRing`, `offsetFace`, `bufferChain`, `warp`, curves (§3.1, §3.4); lazy display-list groups (§8.1) |

### 3.15 Rows added by the dedupe check (every raw row is now referenced)

| id | capability / technique (variant) | ref | evidence | raw | tier | status | where in ARCHITECTURE / gap |
|---|---|---|---|---|---|---|---|
| VN-191 | MFCG's `size` is a number of cells, each divided into blocks and then buildings; a "medium" city is usually 1 000–2 000 buildings, so building counts vary at a fixed size | MFCG (in the VG slice) | vpb §5 [STATED 121415691] | B49 | BASE (parity MFCG F3 / H1) | COVERED | size as population, area or buildings on the TOWN → CITY → METROPOLIS ladder (§4.2 S0, §12) |
| VN-192 | NG began as a technique demo for the bent cut, was called "useless" by its author, and became a "big" generator by user demand (campaigns run in it) | NG | vnd B2.7 [STATED 317489, 362757; INFERRED arc] | N17 | STAGE-2 | COVERED | the stage-2 workflow: open any district as a close-up, "same kind, new seed", standalone mode (II.1, II.4; IMPR S6) |

## §4 Scope creep — architecture features no row in this slice and no IMPROVEMENTS item motivates

Restricted, as the lane requires, to what this slice can judge: architecture features in VG / NG territory (terrain,
water, village-scale fabric, squares and pins, vegetation, relief and style, the stage-2 interface, the village page).
Each candidate was checked against every row above and by grep against `docs/IMPROVEMENTS.md`.

| feature (section) | slice rows | IMPROVEMENTS | verdict |
|---|---|---|---|
| `Pin` kinds `cross`, `shrine`, `pump`, `gallows` (II.1 `interface Pin`) | none — NG pins are fountains, wells and large trees (VN-177); VG centrepieces are a well, a tree or a tower (VN-098) | 0 hits for gallows / shrine / pump | **Unmotivated here** — data-only enum values at negligible cost; the FTG coverage audit should confirm whether FTG's decoration tables motivate them, else drop or move them to a data table |
| bank class `marsh` (§2.3 `bankKinds`, §4.2 S1 (7)) | none — VG banks are sand strips (VN-048); no marsh anywhere in the slice | 0 hits; R11 names beach / rock / cliff | **Unmotivated here** — negligible cost; the FTG audit should confirm (FTG's coast classes) |
| coast intent `fjord` (§4.2 S1 (2)) | only the observation that an off-centre pond "may look like … a fjord" (vpb §2.2) | 0 hits | motivated outside the slice (`watabou-extra-b.md` T22 "fjords", read by the critic seat) — not creep |
| mid-channel river islands (§4.2 S1 (4)) | VG's plans post lists "river island" as a candidate water configuration (vpb §1 row 3, 90033685) | "river island" 1 hit | motivated — not creep |
| the reserved `painterly` preset slot and the `vignette`, `contourMarks`, `outlineMix` programs (§8.2) | VN-029, VN-143, VN-145 | R13, O12 extras | motivated; a reserved row costs nothing, so it does not breach "the base must not pay for the village" |
| per-rung terrain resolution (§2.3) | VN-025 (VG's fixed 128² grid is the contrast) | O1 | motivated |

**Verdict: no substantive scope creep is visible from this slice.** Two data-only values (four pin kinds, one bank
class) have no motivating row here or in IMPROVEMENTS; both are free to keep or drop and should be settled by the FTG
audit, which can see FTG's decoration and coast tables.

## §5 Cross-check against ARCHITECTURE §15.1 (its VG and NG rows) and PART III

| architecture claim | this audit | verdict |
|---|---|---|
| §15.1 VG "G3–G5 … §4.2 S1 is shared (course-first with a carved field and level-set water)" | VN-037, VN-038, VN-040, VN-043 | **overstated.** The base carves terrain to the course (shared) but traces its course by descent and draws coasts, ponds and islands with the closed-outline routine; VG's course is terrain-independent and its water is a level set. Not precluded (a `RiverStrategy` registration); PART III's "course-first river … reused unchanged" needs the same correction |
| §15.1 VG "G6, G7 density map, heart — the density field is the same field type (§4.5)" | VN-002, VN-054–VN-058 | true for the type; the **order** differs (VG builds density before the network; the base in S6 after growth) — caveat VN-002 |
| §15.1 VG "G12–G16 … `palisade` enceinte kind (§2.7)" | VN-003, VN-126–VN-134 | true for the kind; on the live build (19365073) the palisade precedes the roads and the trackers query it, while the base traces walls after growth — caveat VN-003 |
| §15.1 VG "R1–R17 … relief / hillshade / spotlight are optional effects not built in the base" | VN-029, VN-031 | **conflicts with §15.2**, which maps IMPR O12 extras "relief tiers (hillshade, contours)" — a BASE should-have — to §8.5, where no relief tier is described; spotlight is correctly village-only (VN-145) |
| §15.1 NG A2 "RNG engine, one stream, successor seed" and §6.1 "irreproducible" successors | VN-007, VN-009 | the design is fine; the rationale's "irreproducible" is contradicted by pv R6 / P0 (reproducible per build) |
| §15.1 NG B6 / C1 "block content dispatch … lots, setback, validation (perimeter filter) — 0 discards" | VN-168–VN-170, VN-180 | covered, but NG's partly built frontages — a named part of IMPR R3 — lose their only source; no replacement rule (VN-170) |
| §15.1 NG B7 "square-template plaza → `SquareFabric`" | VN-179 | covered for the live build's rectangular and round branches; IMPR S4's "square as a void in the fabric" restraint has no mechanism (low) |
| §1.6 / PART III "Nothing in §2–§4 assumes walls, districts or a market" | VN-087, VN-080 | **inaccurate wording, not a preclusion**: `Block.district` and `Plot.district` are required fields (§2.5) and §5.3 enforces "building ⊂ plot ⊂ block ⊂ district, 100 %"; a village is admissible as one district, which PART III should say |
| PART III "the base does not pay for … VG's grammar and its tag vocabulary" | VN-013, VN-014, VN-135 | consistent: the base builds its own grammar engine and intent layer; nothing VG-specific is paid for |
| §15.1 "All 44 [VG] rows are not precluded" | 55 VILLAGE-LATER rows here | **agreed — 0 PRECLUDED**, with the four caveats of §2 (stage order ×2, the ruin state, the frame aspect) |

## Appendix A — raw enumeration index (every raw row → the master row(s) that carry it)

Raw rows were harvested file by file before merging: A = `vg-posts-a.md`, B = `vg-posts-b.md`, D = `vg-ng-devlogs.md` Part A, N = `vg-ng-devlogs.md` Part B, P = `profile-village.md` (body and all addenda), C = `_critic-vg-ng.md` (new rows only; its rulings V1–V27 were applied to the other rows). All 204 raw rows are referenced by at least one master row.

| raw | label | master row(s) |
|---|---|---|
| A01 | road-first layout for small settlements | VN-060, VN-088 |
| A02 | height field → gradient → trackers draw roads | VN-001, VN-023, VN-061 |
| A03 | tracker momentum vs field; organic tag | VN-062 |
| A04 | density map drives branching and building counts | VN-054, VN-055 |
| A05 | village extent scales with map size | VN-057 |
| A06 | population derived; retry at population 0; editable | VN-005, VN-086 |
| A07 | fewer crossroads, more T-junctions | VN-067 |
| A08 | road classes incl. dashed trails | VN-069 |
| A09 | geometric width vs stroke width | VN-070 |
| A10 | highway topology tags; design for N highways | VN-066 |
| A11 | seamless junction rendering | VN-071 |
| A12 | trails and lonely houses | VN-074 |
| A13 | trail truncation + house re-anchoring | VN-075, VN-096 |
| A14 | frontage rejection placer; MFCG outskirts adopted it | VN-079 |
| A15 | footprint dimensions are model data | VN-082 |
| A16 | no empty roads | VN-076 |
| A17 | place-along-curve (square ring, shore) | VN-081 |
| A18 | large buildings = special locations | VN-084 |
| A19 | water configurations | VN-034, VN-047 |
| A20 | water and village generated independently | VN-035 |
| A21 | multi-component land (earth bounds) | VN-036 |
| A22 | water rendering anatomy | VN-048 |
| A23 | piers if the layout allows | VN-049 |
| A24 | mark existing buildings as special (watermills) | VN-053 |
| A25 | bridges drawn with planks and rails | VN-051 |
| A26 | fields brief | VN-103 |
| A27 | fields adjoin main road, rings further out | VN-104 |
| A28 | ≤ 1 house per field | VN-106 |
| A29 | field size inverse to density | VN-107 |
| A30 | field shape-quality predicate | VN-108 |
| A31 | polygon Booleans and thorns | VN-109 |
| A32 | field anatomy, furrows, export | VN-110, VN-113 |
| A33 | tag vs render toggle | VN-015 |
| A34 | orchards from fields with houses | VN-114 |
| A35 | village square algorithm and centrepiece | VN-097, VN-098, VN-102 |
| A36 | trees fill → carve | VN-116 |
| A37 | tree layer rerollable (own stream) | VN-008 |
| A38 | forest depiction at middle scale; tree size | VN-121, VN-125 |
| A39 | tree shapes, shadows, foliage colours | VN-122, VN-123 |
| A40 | render dominates cost | VN-021 |
| A41 | relief marks along isolines | VN-029 |
| A42 | roof rendering rules | VN-089 |
| A43 | shadow colour / length / angle | VN-144 |
| A44 | map sizes and 0.7 m per unit | VN-155 |
| A45 | tags dialog | VN-014 |
| A46 | Wilderness mode | VN-015 |
| A47 | permalinks; pure function of seed and parameters | VN-006 |
| A48 | cross-generator hand-offs | VN-159 |
| A49 | exports PNG / JSON / SVG | VN-033, VN-157 |
| A50 | POIs console-only | VN-138 |
| A51 | village names, rename, reroll | VN-137 |
| A52 | palette JSON, presets, style dialog | VN-141, VN-142 |
| A53 | fonts and nameplate | VN-140 |
| A54 | night preset with lights | VN-146 |
| A55 | printer-friendly presets | VN-147 |
| A56 | outlining modes; per-class road thickness | VN-148 |
| A57 | everything on one page; legend fatigue | VN-138 |
| A58 | genre convention over history | VN-162 |
| A59 | building shape coupled to road topology | VN-095 |
| B01 | VG range 130–1 700 inhabitants | VN-088 |
| B02 | closed tag vocabulary | VN-014, VN-034 |
| B03 | ponds | VN-043 |
| B04 | river rewrite, meandering, narrow | VN-037, VN-039 |
| B05 | relief follows rivers | VN-026 |
| B06 | coves and headlands | VN-044 |
| B07 | confluence | VN-045, VN-052 |
| B08 | estuary = river + bay | VN-046 |
| B09 | bridge rules | VN-051 |
| B10 | pier rules | VN-049 |
| B11 | water bands | VN-048 |
| B12 | field grouping and sectors | VN-104 |
| B13 | furrows | VN-110 |
| B14 | orchards as a grid | VN-114 |
| B15 | tree glyph bands | VN-122 |
| B16 | tree density, grove, hedgerow belts | VN-117 |
| B17 | woods: thicket fill + crowns + far-field tint | VN-121 |
| B18 | tree shadows | VN-123 |
| B19 | tree-group shading, crown gradients | VN-124 |
| B20 | crossroads tag | VN-066 |
| B21 | radial-concentric vs linear plans | VN-078 |
| B22 | roads fade into dotted trails | VN-077 |
| B23 | road merging (view-side) | VN-072 |
| B24 | driveways (partial) | VN-073 |
| B25 | isohypse preference (steering) | VN-063 |
| B26 | no hairpins; cliffs unimplemented | VN-028 |
| B27 | behaviour-shift density rewrite | VN-011, VN-068 |
| B28 | density consumers and tags | VN-055, VN-058 |
| B29 | palisade | VN-126, VN-129, VN-130, VN-132, VN-133 |
| B30 | square variants, tower centrepiece, dome | VN-098, VN-099 |
| B31 | roof styles incl. ruin | VN-089, VN-090 |
| B32 | rectangularity from fake perspective | VN-091 |
| B33 | fake perspective + Top-down | VN-092 |
| B34 | spotlight | VN-145 |
| B35 | hillshade | VN-031 |
| B36 | relief modes | VN-029 |
| B37 | selective outlining + Pressure | VN-143 |
| B38 | detail strokes from base colour | VN-143 |
| B39 | village lights from one continuous map | VN-146 |
| B40 | house numbering | VN-094 |
| B41 | grid overlay | VN-152 |
| B42 | style collection; random style | VN-153 |
| B43 | hide population; nameplate corner | VN-140 |
| B44 | window-sized map; aspect adaptive | VN-156 |
| B45 | JSON, 3-D viewer, Dwellings hand-off | VN-133, VN-157 |
| B46 | creator philosophy | VN-022, VN-162 |
| B47 | gate shadow arch | VN-132 |
| B48 | patron requests (manor, ruin slider, API) | VN-160, VN-161 |
| B49 | MFCG size = number of cells | VN-191 |
| B50 | MFCG legend with scale bar | VN-139 |
| D01 | one density field is the spine | VN-002, VN-054 |
| D02 | water as a veto surface | VN-059 |
| D03 | square does not scale; at density peak | VN-098, VN-100 |
| D04 | field mosaic, lanes, hedgerows | VN-111 |
| D05 | crofts and field classes | VN-112 |
| D06 | runs of houses on own plots | VN-080 |
| D07 | composite footprints, special buildings | VN-083 |
| D08 | river as a replaceable subsystem | VN-020 |
| D09 | piers not connected on land | VN-049 |
| D10 | palisade gates = crossings; partial enclosure | VN-130, VN-131, VN-132 |
| D11 | hill sites; palisade only fortification | VN-134 |
| D12 | thread every entity through all paths | VN-018 |
| D13 | spotlight auto-centred | VN-145 |
| D14 | relief and shading separate toggles | VN-032 |
| D15 | exported 3-D semantics | VN-158 |
| D16 | integration by GET parameters | VN-159 |
| D17 | 12 layer toggles, two RNG scopes | VN-008, VN-016 |
| D18 | renderer survives no fills / no outlines | VN-147 |
| D19 | night: lit buildings vs lit streets | VN-146 |
| D20 | misc marks, paper texture, painterly filter | VN-154 |
| D21 | user wishes (wear, livestock, wells) | VN-161 |
| D22 | non-square maps are structural | VN-156 |
| N01 | bent-cut recursive bisection | VN-164 |
| N02 | street corridor model + view | VN-167 |
| N03 | ragged hood outline clipping blocks | VN-174, VN-175 |
| N04 | perimeter-block look; partial blocks | VN-168, VN-169, VN-170 |
| N05 | alternating roof tones; block shadow | VN-171, VN-186 |
| N06 | template system | VN-172 |
| N07 | ring template and fallback | VN-173, VN-189 |
| N08 | large buildings occupying blocks | VN-176, VN-186 |
| N09 | pins | VN-177 |
| N10 | squares | VN-179 |
| N11 | Procgen Mansion hand-off | VN-159, VN-187 |
| N12 | one shared engine | VN-019 |
| N13 | NG layers, tags, presets | VN-182, VN-183 |
| N14 | flat floating patch; title | VN-184 |
| N15 | cobbles; night streets | VN-185 |
| N16 | two block regimes | VN-188 |
| N17 | technique demo promoted to a product | VN-192 |
| P01 | palette ≈ 40 keys with mode keys | VN-029, VN-141 |
| P02 | closed-form outline / detail colours | VN-143 |
| P03 | water band law | VN-048 |
| P04 | tracker step contract | VN-064 |
| P05 | relief engine | VN-029, VN-030 |
| P06 | Poisson k = 50 | VN-119 |
| P07 | 128² heightmap; hillshade bitmap | VN-025, VN-031 |
| P08 | validate-and-retry contract | VN-004 |
| P09 | cost model | VN-021 |
| P10 | shared substrate with MFCG | VN-019 |
| P11 | request vs descriptive tags | VN-013 |
| P12 | settlement class by building count | VN-087 |
| P13 | population per-building draw | VN-086 |
| P14 | water body by level set; shore chains | VN-040, VN-042 |
| P15 | wharf pipeline | VN-050 |
| P16 | elevation construction | VN-024 |
| P17 | square morphologies | VN-051, VN-099 |
| P18 | forest construction | VN-118 |
| P19 | field construction | VN-105 |
| P20 | orchard rows vs Poisson; furrow dashes | VN-110, VN-114 |
| P21 | building placement counts; spawnAt; tower | VN-079, VN-083 |
| P22 | palisade construction (old build) | VN-127 |
| P23 | dramatic light | VN-145 |
| P24 | naming grammar | VN-135, VN-136 |
| P25 | function assignment; two POIs | VN-085, VN-138 |
| P26 | layer order | VN-149 |
| P27 | pre-tessellated geometry | VN-071, VN-150 |
| P28 | tree crown prototypes | VN-122 |
| P29 | building glyph | VN-089, VN-093 |
| P30 | colour jitter and weighted lists | VN-089, VN-151 |
| P31 | content-aware nameplate | VN-140 |
| P32 | Bloater | VN-190 |
| P33 | grid / numbers / plate layers | VN-190 |
| P34 | polyline toolkit | VN-190 |
| P35 | measured stage order | VN-001, VN-002 |
| P36 | river in three stages; two course recipes | VN-026, VN-037, VN-038 |
| P37 | water types as height-field primitives | VN-024, VN-040, VN-047 |
| P38 | open vs closed shore handling | VN-042 |
| P39 | heart tied to the wharf | VN-050, VN-101 |
| P40 | naming inside the model | VN-017 |
| P41 | build drift; stamp outputs | VN-010, VN-012 |
| P42 | density per-cell pass | VN-056 |
| P43 | palisade construction (new build) | VN-003, VN-128 |
| P44 | Poisson tile with coordinate wrap | VN-120 |
| P45 | tracker classes; bridge = one step | VN-065 |
| P46 | water extraction cost | VN-041 |
| P47 | exact-distance carve | VN-027 |
| P48 | Enter successor reproducible | VN-007 |
| C01 | createShape vs getCloud | VN-175 |
| C02 | NG props | VN-178 |
| C03 | RNG isolation (NG save/restore; VG resets) | VN-008, VN-009 |
| C04 | NG knobs | VN-181 |
| C05 | BisectorEx | VN-165, VN-166 |
| C06 | NG content classes | VN-180 |
| C07 | NG tag space | VN-182 |
| C08 | NG build stamp; Urban Places | VN-010 |

Unreferenced raw rows: none.


## Fable review (2026-09-27) — B18

**Verdict: CONFIRMED.** Fable (lane `fable-review/main/evidence-review`) read this audit whole (192 rows, 8 gaps plus 4 caveats and 5 wording corrections) and re-checked every PARTIAL /
MISSING row, plus the COVERED rows that carry a note, against the CURRENT design (`docs/ARCHITECTURE.md` sha256 `1c23190f…`,
13 026 lines, 2026-09-27 21:45) and the fix-round record (`docs/ARCHITECTURE-VALIDATION.md` §R1–§R5). Every gap this audit raised
was real against the text it read (the pre-fix design of 2026-09-25 15:10, which the fix seats also read and never ruled INVALID), and
every one is now closed by a mechanism in the current text or staged by the owner's roadmap with its hook present; no capability of the
reference escaped the row set. The row-by-row citations (current line numbers) are in `docs/fable-review/main/evidence-review.md`
§B18. Nothing in this file is corrected: its verdicts describe the pre-fix text and remain a true record of it. The reconciler may
replace the PENDING marker with `> Fable-reviewed 2026-09-27: CONFIRMED` and set queue row B18 to REVIEWED-CONFIRMED.
