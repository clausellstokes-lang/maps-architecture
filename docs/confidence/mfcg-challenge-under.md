# Under-confidence challenge — `docs/confidence/mfcg.md` (watabou's Medieval Fantasy City Generator)

Lane `confidence/mfcg-challenge-under`. Written 2026-09-25 by the adversarial reviewer (Fable seat), lens
**UNDER-CONFIDENCE HUNTER**. Status: **COMPLETE**.

Target under review: `docs/confidence/mfcg.md` (749 lines, 40 capability rows), claimed aggregates
functional 0.80 / visual 0.85 / algorithm_identity 0.50 / seed_exact 0.02 / effort 42 person-weeks (32–55).

The lens looks only for rows rated **lower** than the evidence warrants: a standard published algorithm that fully
covers the capability (named); recorded data already in hand that pins the behaviour (call counts, draw logs,
console traces, captured assets and their schema); the 2017 open-source ancestor still matching the live
class/method names; and capabilities that need only parity of OUTPUT, not of method (where `functional` /
`visual` must not be dragged down by an unknown internal rule). Rows rated *too high* are out of scope for this
lens and are not adjusted here (the sibling lane `confidence/mfcg-challenge-over` landed at 08:25 and owns them;
where the two lanes pull the same cell in opposite directions I say so, so the judge sees both arguments). Every
adjustment in §2 quotes or pinpoints what was checked; rows the evidence supports as rated are in §3 ("tried to
refute and could not"); §4 records the checks made on data already on disk; §5 gives the verdict.

**Headline.** Forty-three row metrics on 25 rows move up, all by 0.05–0.15, plus four aggregates. Nothing in the
seed-exact column moves except one internal-consistency cell (E3). The assessor's numbers were sound where they
rested on unknown *constants*; they were too low in three recurring ways: (1) eleven rows describe a standard
published algorithm that is uniquely defined for its input (Delaunator, straight skeleton, Visvalingam–Whyatt,
Bridson Poisson-disc, earcut + barycentric interpolation, Tracery, HSV tint arithmetic, edge collapse, BFS on the
mesh graph), and were scored as if the method were still open; (2) six rows say "must invent" a rule that is
`[STATED]` by the creator **and** has a verified 2017 implementation **and** a live routine name that matches it —
the largest instance is the Complex/landmark building method ("largest inscribed rectangle → cut into blocks →
discard some", devlog 11802), which the Styles capture on disk shows running as `PolyBounds.lir` 3 738 times for
4 737 lots (§4); (3) three render-side rows (alleys layer, roofs, colour) were scored below what a complete draw
record plus exact 1:1 call identities already pins. Aggregates move to functional **0.83**, visual **0.87**,
algorithm identity **0.55**, seed-exact **0.02** (unchanged), effort **38** person-weeks (30–50).

---

## 0. Reading log (what this review rests on)

Read **in full, every line**:

1. `docs/confidence/mfcg.md` (749 lines) — the target.
2. `research/findings/_critic.md` (478) — first critic: coverage, C1–C15, §3 resolutions, §4 spot-checks, §6 gaps.
3. `research/findings/_critic-os.md` (434) — OS seat: 141-row constants table, C1–C18, S1–S20, §4 draw order, §6.
4. `research/findings/visual-spec.md` §0–§1 (1–284; the MFCG part; §2–§4 are VG/NG/FTG and out of scope).

Read by **section outline (`grep -n '^#'` of all 13 files) plus full reads of the sections that carry the rows I
tested** — the READING BUDGET rule was applied from file 5 onward; every unread range is named:

5. `research/findings/profile-mfcg.md` (2 255): §0–§15 and both critic addenda (1–927), EG-3 (1128–1207), EG-4
   (1208–1300), EG-7/EG-8 (1394–1471), EG2-2..EG2-4 (1522–1672), ST-2..ST-7 (1820–2098); EG-1 by grep for the
   midpoint/weighted lines (949–1073). Not read: EG-2, EG-5, EG-6, EG2-1, EG2-5..7, ST-0, ST-1, ST-8..ST-12 (their
   conclusions reached me through the assessor's §1.1 and the Styles-addendum cross-references).
6. `research/findings/os-model.md` (1 264): §4 (265–307), §5–§5.5 (309–472), §6 (473–641), §7.4 (711–742), §8.5
   (840–862), §14 (1143–1186). Not read: §0–§3, §7.1–7.3, §8.1–8.4, §8.6–8.7, §9–§13, §15 (constants verified
   row by row in `_critic-os.md` §1, read whole).
7. `research/findings/os-wards-render.md` (1 147): §3.4 (323–381), §5 (494–560), §6.3–6.7 (599–686), §9.3–9.6
   (845–956). Not read: the rest (same reason).
8. `research/findings/os-geometry.md` (945): §2.2 (417–512), §2.3 (562–587), §3.7 (742–777). Not read: the rest.
9. `research/findings/mfcg-posts-a.md`: T6, T7, T12, T13, T15. `mfcg-posts-b.md`: §2.5, §2.6, §2.8, §2.10, §2.13,
   §2.14, §2.16, §2.18. (The assessor read both files whole; I re-read only the sections bearing on candidate rows.)
10. `research/findings/mfcg-devlogs-a.md`: §2.4, §2.7–2.9, §2.12–2.13, §2.24 — the sections the assessor did NOT
    read. `mfcg-devlogs-b.md`: §2.6–2.10, §2.12–2.14, §2.18, §2.23–2.24 — likewise the assessor's unread sections.
11. `research/findings/watabou-extra-a.md`: §2.7, §2.18, §2.20. `watabou-extra-b.md`: T5, T9, T18 (assessor-unread).

**Original sources opened (grep for the load-bearing phrase, matches read in context; data only):**
`research/patreon/watabou-city/{40345972, 102377277, 101942512, 114184619, 87882877, 79147510}/post.md`,
`research/patreon/watabou-extra/{49191011, 101173551}/post.md`, itch devlogs
`{112574, 11802, 8154, 817711, 3091, 7063, 494692, 101529, 67134}*/post.md`;
`captures/mfcg/2026-09-21T05-06-58/profile/network/bodies/0015-5ba58ea2.json` (grammar, 4 401 B — guard/modifier
token counts only) and the six palette JSONs (key sets only); `captures/mfcg/2026-09-25T10-38-58/README.md` +
`steps/{014,017,019,021,023,028,044,049,054}-*.calls.json` (nine labelled counts each, read by a 25-line Python
script, §4); `captures/README-labelfix-2026-09-25.md` (MFCG rows); `reference/TownGeneratorOS/Source/com/watabou/`
`{towngenerator/building/Model.hx, CurtainWall.hx, wards/Castle.hx, geom/Graph.hx}` by `grep -n` for five one-line
facts (verification only; nothing copied). That covers original sources for 16 rows (B1, B2, B5, B6, B7, B12,
B13, B14, B15, B19, B20, C1, C2, D1, D2, D3, E1, E3, F1, G1). **No captured JavaScript bundle was opened**, no PNG
was re-measured, no recording was made, nothing was executed beyond the JSON reads.

Reading volume ≈ 370 k tokens: files 1–4 whole (≈ 150 k), then outline-plus-sections as the rule prescribes.

**Evidence labels in this file:** **CONFIRMED** = found verbatim at source or re-read from the capture data in this
seat; **PLAUSIBLE** = reasoning. Every confidence number is a judgment (PLAUSIBLE); the facts under each adjustment
are labelled individually. Confidence semantics are the assessment's own (§2 of `mfcg.md`): `F` functional, `V`
visual, `A` algorithm identity ("our derivation matches THEIR algorithm"), `S` seed-exact.

---

## 1. Method and standard

For each of the 40 rows I asked, in order: (a) is there a published algorithm that fully covers the capability
**and** is uniquely defined for its input, so that output parity follows from any correct implementation? (b) is
there recorded data already on disk (counts, draw ops, console, assets) that pins the behaviour more tightly than
the row's justification admits? (c) does the 2017 ancestor still match the live class/method names in a way that
bounds the method, and is the ancestor's rule verified (`_critic-os.md` §1/§3)? (d) does the row's `F`/`V` score
penalise an unknown *rule* although the goal is *output* parity? A cell moves only when the answer changes what a
builder would have to invent, and then by 0.05 (one unknown removed), 0.10 (a whole class of unknown removed) or
0.15 (a `[NAMED-ONLY]`/"must invent" item converted into a `[STATED]` rule with a verified implementation). Where
the cited evidence supported the rating I say so in §3 with what I checked. The seed-exact column is left alone:
under the assessment's own definition (same seed → same map) it is dominated by the five heavy stages, which this
lens cannot raise.

---

## 2. Adjustments

### 2.1 Table

| # | row | metric | from → to | reason (one line) | evidence checked |
|---|---|---|---|---|---|
| 1 | B1 patch mesh | A | 0.70 → **0.80** | Delaunator is a published library ported verbatim (`[STATED]` devlog 112574 L16; 17 method names `[SHOWN]`), DCEL is standard, the hull-cell drop is 2017 `partioning`'s rule in live form (`Cell.new = n − |hull|`), the seed count is the 2017 formula scaled; what is left (live spiral constants, relaxation, the +4) is calibration the assessor's own experiment #3 settles without any bundle | devlog 112574 L16 (CONFIRMED); profile §4.1, §7.4, EG-7; `_critic-os` §1.3 rows 22–27, S1, S17 |
| 2 | B2 junctions | F | 0.85 → **0.90** | the operation (collapse edges shorter than a threshold to their midpoint) is verified at `Model.hx:321` and its live form is `DCEL.collapseEdge` ≈ 0.5 per cell; one number (threshold, absolute or scaled) remains, and the measured collapse/cell ratio calibrates it | `Model.hx:321` grep (CONFIRMED `< 8`); profile §4.2; `_critic-os` rows 37–39, S15 |
| 3 | B2 junctions | A | 0.60 → **0.70** | same: half-edge collapse is the standard mesh operation; the 2017 rule (midpoint, one pass, skip-next, rebind) is verified line by line | as above |
| 4 | B4 domains | F | 0.70 → **0.75** | splitting the mesh at the shoreline and flood-filling connected land components is standard connected-components; the two downstream effects that matter for parity are known (`[STATED]` wall ends at the shore; `[SHOWN]` bank/docks naming) | profile §4.3, EG-5 via assessor §1.1; grammar `bankDistrict` (CONFIRMED in asset) |
| 5 | B5 walls / gates | A | 0.70 → **0.75** | every clause of the loop is either 2017-verified and live-consistent or live-measured: candidates = wall vertices touching > 1 inner cell (`CurtainWall.hx:51`), sequential pick with ring-neighbour exclusion (`:101`; live: never adjacent, nested in N), gate vertex then moved (`:109` `smoothVertex`; live: `lerpVertex` to the exact chord midpoint = the same operation at f = 0, EG-1 L68), tower on every non-gate vertex (live identity `towers + gates = 34`), sole-outer-cell split toward the outward normal (live face split at every gate lacking an outer road); only the pick's weight function is unknown. EG-7 #9's "unchanged is not supported" is about *parameters*, which are now measured — that is more identity knowledge, not less. (The over-lens cut this cell to 0.55 on the same EG-7 line; both readings are before the judge.) | `CurtainWall.hx:51/101/109`, `Castle.hx:17–19` grep (CONFIRMED); profile EG-1 L52–68, EG2-2, EG2-3, EG-7 #9; `_critic-os` rows 44–49, S12 |
| 6 | B6 citadel | A | 0.55 → **0.60** | the loop shape is pinned by 60+ traced values (all < 0.75, monotone), the operator is `[STATED]` ("equalizing its angles", 40345972 L59), the threshold is the 2017 constant, the single city-facing gate is what the 2017 reserved-vertex rule yields (`Castle.hx:17–19`; E ≤ 5 ⇒ 1 gate), the keep is the `[STATED]` rectangle method (8154 L28) with a verified 2017 slicer (`createOrthoBuilding`, row 99/S10) and a live `lir`; open are the equalize step size, the bloat trigger and the inner-castle cell choice | 40345972 L58–59, devlog 8154 L28 (CONFIRMED); `Castle.hx` grep; profile §4.4b, EG-3; `_critic-os` rows 52–58, S10 |
| 7 | B7 streets | V | 0.85 → **0.90** | the rendering is exact (casing = core + 2t in 7/7 records; `cutCorner`/`smoothRoad`/`Chaikin.render` counts; streets as negative space `[STATED]` 30234656 + `[SHOWN]` EG-4 correction 1; core-only castle street `[SHOWN]`) and the 2017 draw idiom (roads positive, streets negative, meeting at gates) is verified | profile §6.3, §10.3, EG-4; `os-wards-render` §9.3, §9.6; `_critic-os` rows 120–121 |
| 8 | B7 streets | A | 0.60 → **0.70** | same names and signatures as 2017 (`Topology`, `Graph.aStar`, `buildPath`, `tidyUpRoads`), whose internals are verified (cost = length, blocked = wall ∪ citadel − gates, street end = nearest plaza vertex, road tail = node nearest `gate.norm(1000)`, dedupe + LIFO chaining, `(prev + 3v + next)/5` smoothing with pinned ends); the live `excludePolygon/excludePoints` are the 2017 `inner`/`outer` exclusion sets generalised; and the 2017 rule "a street per gate, a road only per border gate" predicts `aStar = 2N + 1` **exactly** as measured (EG2-2), which the assessor tagged `[INFERRED split]` — it is the ancestor's arithmetic. Open: open-set discipline (C10), the third `Topology` | `Model.hx:221/231` grep (CONFIRMED: `for (gate in gates)`, `if (border.gates.contains(gate))`); `Graph.hx:27/33` grep; `os-model` §6.1–6.5; `_critic-os` rows 60–70, S6–S8, C6, C10; profile EG2-2 |
| 9 | B9 districts | F | 0.80 → **0.85** | multi-source seeded region growing with per-cell/per-edge validation is a standard technique; the seed set is effectively fixed by the type list (each named type is one prominent feature: plaza, castle, gates, bridges, docks, banks, parks, sprawl) plus the `[STATED]` "seeded around prominent city features" (85275); seed counts (`fromPatch` 12 + `fromVertex` 3 for 15 districts) ≈ one seed per district; ≈ 2.5 validations per accepted cell; hole repair `[SHOWN]`; counts per size measured; the type set is `[SHOWN]` 1:1 by the grammar | profile §4.7, §9.2, EG-3; grammar asset (CONFIRMED: 8 typed rules); 87882877 L29 (CONFIRMED) |
| 10 | B12 outskirts | F | 0.80 → **0.85** | the 2017 `filterOutskirts` is verified line by line (edge factor 1 / 0.4, vertex density 1 at a gate / 2U / 0, `minDist` over building corners normalised by frontage depth, keep iff `fuzzy(1) > minDist/p`) and the live version is the same field with earcut + barycentric interpolation (identities 7/7; EG2-4: the 14 routines run only with gates ≥ 1 — exactly the 2017 "density 1 at a gate" dependence); 0.10.0 adds the street-density knob `[STATED]`; the measurable output (ribbon density vs distance) is the calibration target | `os-model` §8.5, `os-wards-render` §3.4; `_critic-os` row 100, S11; profile §4.9, §7.4, EG2-4; 87882877 L46, devlog 3091 L14 (CONFIRMED) |
| 11 | B12 outskirts | A | 0.60 → **0.70** | same: the ancestor formula is complete and verified, and the live mechanism is `[SHOWN]`; what remains is the per-vertex density values and the street-density split | as above |
| 12 | B13 sprawl | F | 0.75 → **0.80** | the behaviour needed for output parity is `[STATED]` three times and measured once: trigger set "spread along the coast, river and roads" (67134), "only regions next to the gates get populated" (3091 L14), the placer = "a new algorithm similar to the one in Village Generator … they all are proper rectangles", sparser (37407181, posts-a T6), and EG2-4: ribbons appear only along gate roads, none at N = 0; the 2017 outskirts filter (edges on an artery get factor 1) is exactly what produces road-hugging ribbons. The mechanism stays `[NAMED-ONLY]`, so `A` is not moved. (The over-lens cut this cell; the disagreement is whether "statistically similar structure" needs the placer's rule — I say the ribbon statistics are what must match and they are pinned.) | devlogs-a §2.12; devlog 3091 L14, 7063 L12 (CONFIRMED); posts-a T6; profile EG2-4 |
| 13 | B14 plaza / temple / churches | A | 0.50 → **0.60** | the 2017 Market (statue 0.6 / fountain, offset toward the longest edge) and Cathedral (ring 40 % thickness 2+4U, else ortho(50, 0.8)) rules are verified and the live routines keep the names (`Market.createGeometry`, `Cathedral.createGeometry`); the "cloister-like plan … sometimes chosen" is `[STATED]` (3091 L15) = the 2017 ring branch; the plaza monument dot is `[SHOWN]` (EG-4, one 6×6 five-op fill); churches "each … has a small square next to it" `[STATED]` (79147510 L24); gate plazas `[STATED]` (112574 L15) | devlog 3091 L15, 112574 L15, 79147510 L24 (CONFIRMED); `_critic-os` rows 103–104; profile EG-4 |
| 14 | B15 landmarks / keep | F | 0.75 → **0.80** | the plan generator is not "must invent": the method is `[STATED]` ("take an original polygon, then try to find the largest rectangle which fits inside … cut it into smaller blocks and throw away some of them", 11802 L27; "castles … consist of rectangles", 8154 L28), its 2017 implementation is verified (`createOrthoBuilding`: frozen orthogonal axes, ratio 0.4+0.2U, leaf `minBlockSq·2^(normal·2−1)`, keep with prob `fill`), and the live build executes `PolyBounds.lir/lira` (4–12 per city in Lots mode = the landmarks) plus `Building.getPlan/getPlanSym`; the double-pass silhouette rendering (2017 `drawBuilding`) is the live `drawSolids` look | devlog 11802 L27, 8154 L28 (CONFIRMED); `os-wards-render` §5, §9.5; `_critic-os` row 99, S10; profile §4.9, §6.4; §4 below |
| 15 | B15 landmarks / keep | A | 0.40 → **0.55** | same — a `[NAMED-ONLY]` generator became a `[STATED]` rule with a verified ancestor and matching live routine names (0.15 step by the §1 standard) | as above |
| 16 | B17 farms | V | 0.85 → **0.90** | the field rendering is measured exactly (hairline t in colorGreen, ≈ 9–10 px pitch at town zoom, per-field angle, no outline, butt caps, up to 209 ops per field path), the field shapes come from a named chain (`Cutter.grid` → `splitField` ≈ 12.6/farm → `round`), and the corner rounding is `[SHOWN]` in the 3D viewer too; the stated fixes (farmhouse touching and aligned to a field edge, elongated) are `[STATED]` | visual-spec §1.6; profile §4.9, EG-4 "Also seen in G0d"; posts-a T7; devlogs-b §2.23 |
| 17 | B18 harbour / docks / piers | F | 0.85 → **0.90** | the pier law is exact (3-op casing+core, W = 1.2 ± t, 2–4 per docks ward, 19–33 per city), `DocksGrower.validatePatch` is waterfront-only, `City.addHarbour` runs once, docks naming is 1:1; what is left (pier count/spacing, harbour cell choice) is two small rules | profile §2, EG-4 correction 2, §9.2; posts-b §2.16 |
| 18 | B19 trees / forests | F | 0.85 → **0.90** | Bridson (2007) Poisson-disc with k = 50 `[SHOWN]`; the tile-stamp identity `validate = 140 × validateRect` and the crown library of 20 (`getCrown = bloat = 20`, `getTree − random = 20`) CONFIRMED on disk (§4); one 2t outline pass under per-crown fills (the stated "merged together" look without a union); the forest chain with 1:1 counts and the `[STATED]` coverage rule (114184619 L26–27) | §4 step 014; profile ST-2; 114184619 L26–28 (CONFIRMED); devlogs-b §2.9–2.10 |
| 19 | B19 trees / forests | A | 0.70 → **0.80** | same — the sampler is a named published algorithm and every routine of both pipelines is counted 1:1; the open items (tile offset, `fillLine` spacing, crown seed, inset/fractal amplitude) are constants | as above |
| 20 | B20 elevation | F | 0.50 → **0.60** | output-parity argument: the feature's semantics are `[STATED]` (alleys "affected by a 'gradient field', which emulates a presence of height difference", stronger around the castle, the coast and river banks; 67134 L18) and the creator says users "don't see the difference"; a field built from castle/coast/river distances that biases the bisector's cut direction reproduces an effect that is, by the reference's own admission, near-invisible — the assessor penalised unverifiability, which is a test-design problem, not an implementation risk | devlog 67134 L18 (CONFIRMED); posts-a T23 via assessor |
| 21 | B20 elevation | V | 0.70 → **0.80** | same argument: "same quality/style class" is trivially met when the reference's own effect is not visible to users | as above |
| 22 | C1 display modes | F | 0.85 → **0.90** | "must invent: the rectangle-composition rule of Complex" is refuted: the rule is `[STATED]` (11802 L27, verified by `_critic.md` §4 #11 and here), its 2017 implementation family is verified (`createOrthoBuilding`), and the live Complex step executes `PolyBounds.lir` 3 738× for 4 737 `Building.create` with `createRects` 510 (= blocks), `isRectangle` 4 738, `rectArea` 3 460, `getPlanFront` 3 835 — CONFIRMED on disk (§4) | §4 step 049; profile ST-7; devlog 11802 L27 (CONFIRMED); devlogs-a §2.4 |
| 23 | C1 display modes | V | 0.80 → **0.85** | the Complex look is `[SHOWN]` at 8× zoom ("each lot holds a smaller building assembled from rectangles (stepped L/T shapes), with ground between neighbours", ST-7) and in the 11802 close-ups; Lots is pixel-characterised; Block is one polygon per block | profile ST-7; devlogs-a §2.4 |
| 24 | C1 display modes | A | 0.50 → **0.65** | same — the stated method + verified ancestor + matching live routine names (0.15 step by the §1 standard) | as above |
| 25 | C2 roofs | F | 0.85 → **0.90** | the straight skeleton is a published algorithm (Aichholzer–Aurenhammer–Alberts–Gärtner 1995; the naive O(n²) wavefront the creator describes — "dehydrate … O(n²)", 101173551 L19/L25 — is the textbook event loop) and is **uniquely defined** for a simple polygon, so any correct implementation yields the same hip ridges for the same footprint; the per-roof identity `run = new = drawRoof = 9 222`, `intersect/roof = 17.1`, and `run = drawRoof = 7 139` in Gable are CONFIRMED on disk (§4); the ridge-path op law `2n + 1` is measured; Gable = the same pieces with endpoints moved | §4 steps 017/019/021; profile ST-3; 101173551 L19, L25 (CONFIRMED); devlogs-b §2.6 |
| 26 | C2 roofs | V | 0.85 → **0.90** | the draw law is exact (fill + outline + one colorDark ridge path at t; Raised offset ≈ (+0.25, +0.7) u measured) and a correct skeleton is cleaner than the creator's ("glitches in special cases") — parity of the style class is the easy direction | visual-spec §1.4; profile ST-3 |
| 27 | C2 roofs | A | 0.60 → **0.70** | the creator's own algorithm is the naive wavefront (`[STATED]`), the gable variant is "a modified algorithm to produce ridges" on clean shapes (`[STATED]` L35); both are the standard construction | 101173551 L25, L35 (CONFIRMED) |
| 28 | C3 processing (Offset) | A | 0.50 → **0.60** | the pass is identified 1:1 (`Processing = None` removes exactly `Block.indentFronts`: 493 → 0, `PolyBool.and` 4 705 → 1 134, CONFIRMED on disk §4) and its semantics are `[STATED]` ("shifts the front side of every lot to make lines of facades uneven", 61026228); one constant (the shift amount) remains | §4 step 054; profile ST-7; `_critic.md` §4 #7 |
| 29 | D1 naming | F | 0.85 → **0.90** | Tracery is a published open-source library with documented expansion semantics; the grammar's syntax extensions and every guard/modifier are captured verbatim (asset grep: 5 `UNIQUE?-`, 2 `COMPACT?-`, 2 each `CASTLE/WALLS/TEMPLE?-`, 3 `COAST?-`, 4 `.merge`, 6 `.s#`, 20 probability guards — CONFIRMED); `DeckRuleSelector` = draw-without-replacement; Markov text generation is standard; corpus sizes/shape known. Original content is authoring effort, not uncertainty | grammar asset (CONFIRMED); profile §9–§9.2, EG-4 label texts |
| 30 | D1 naming | A | 0.75 → **0.85** | same — the only open items are the `pinch` elision rule and the `UNIQUE`/`COMPACT` predicates (EG-4 narrows COMPACT: not the 0.75 test) | as above |
| 31 | D2 district labels | F | 0.85 → **0.90** | the chain is `[SHOWN]` routine by routine with 1:1 identities (`simplify = visvalingam` 7/7; `Cubic.build = 2 × districts`, `cubic = 12 × build`; one `Letter` per glyph; `PathTracker.getPos/get_tangent`; `removeOutline` per label) and every link is a named published algorithm (straight skeleton; Visvalingam–Whyatt 1993; cubic spline; arc-length text-on-path); the creator: "the new algorithm is a widely used one" (102377277 L21); size ∝ district (15–55 px glyph canvases), 27 px, ≈ 2 px halo measured | 102377277 L21 (CONFIRMED); profile §6.2–6.3, §8, ST-5; visual-spec §1.7 |
| 32 | D2 district labels | A | 0.70 → **0.80** | same; `getPath2Root` names the ridge selection as a root-path search over the skeleton; ridges are built only for Curved labels and the "equator" (largest span) for all (ST-5) | as above |
| 33 | D3 map furniture | A | 0.70 → **0.80** | the compass construction is fully `[SHOWN]` in the draw log (2 dark + 2 paper 16-segment fills, 5 hairlines, one arc, "N") and `[STATED]` procedural/rerollable (101529 L27); scale bar 5 ticks, old-style figures, unit switch `[SHOWN]` + `[STATED]` (L36); grid pitch measured; legend layout measured (36 px title, 21 px entries, 43×43 discs); pins `[SHOWN]`; only the rose grammar is open and it is our own design in any case | devlog 101529 L27, L36 (CONFIRMED); profile §8, ST-5; visual-spec §1.7 |
| 34 | E1 colour system | F | 0.90 → **0.95** | the role model (13 keys × 6 schemes) is CONFIRMED on disk; the three tint methods are measured in HSV with the arithmetic (Spectrum = hue rotation ±90° at strength 30, S/V kept; Brightness = V scale; Overlay = blend toward a hue); outline lerp k = 0.29–0.30 across 24 pairs; weathering = per-roof uniform RGB scale 0.86–1.18 (`Color.scale` 11 120 of 11 127 CONFIRMED §4); Vivid exposes the colorWall/colorLabel roles | §4 steps 028/044; palette key sets (CONFIRMED); profile §10.1, ST-6 |
| 35 | E1 colour system | A | 0.75 → **0.85** | same — HSV conversion is standard and the per-method arithmetic is measured; only the hue-sampling distribution is open | as above |
| 36 | E3 alleys layer | V | 0.80 → **0.90** | the layer is one recorded stroke (t-wide colorDark, 518 ops, under the road cores and every ward canvas), its 023 draw record is complete, the pixel diff is measured (10 194 px, ≈ 130 pieces, sprawl only); `updateRoads = 1`, `drawOutline = drawRoad + 1` CONFIRMED on disk (§4) | §4 step 023; profile ST-4 |
| 37 | E3 alleys layer | A | 0.50 → **0.65** | what is drawn, where, at what width and colour, in which layer position, and for which alleys is all `[SHOWN]`; only the model-side reason for "sprawl only" is open, and that is a B10 question, not a render one | as above |
| 38 | E3 alleys layer | S | 0.50 → **0.70** | internal consistency: E2 is scored 0.70 as "deterministic given the model" and E3 is a pure render pass of the same kind; the two must carry the same conditional number (if the judge adopts the over-lens's unconditional reading, both move down together) | assessment E2/E3 text |
| 39 | F1 warp tools | F | 0.70 → **0.80** | the eight tools are `[STATED]` with semantics (40345972 L54–59; hotkeys 494692 L41–47, CONFIRMED) and each is a textbook mesh-deformation brush: Displace/Liquify = brush-weighted vertex translation with radial falloff ("Liquify … the same as Displace but softer"), Bloat/Pinch = radial scale about the brush centre ("opposite to Bloat", 79147510 L22), Relax = Laplacian smoothing (the 2017 `smoothVertex` family already in the codebase), Rotate = global rotation, Equalize = per-cell angle regularisation (stated), Measure = readout; the data-model constraint is stated (vertices move, topology fixed); two of the kernels run in every recording as the citadel repair (`Castle.equalize`, "Bloating"); the re-derivation cascade is the per-ward reroll path that save/restore isolation supports | 40345972 L54–59, 494692 L36–47, 79147510 L22 (CONFIRMED); profile §4.4b, EG-3 save/restore |
| 40 | F1 warp tools | V | 0.75 → **0.80** | brush radius with falloff (two concentric circles) and Apply/Discard staging are `[SHOWN]` in the post images; the visual result of a warp is the re-rendered map, whose renderer is E2 (0.90) | posts-a T4; devlogs-b §2.16 + Critic addendum (C4) |
| 41 | F1 warp tools | A | 0.35 → **0.45** | same — the kernels are standard; only falloff profiles and step sizes are open | as above |
| 42 | G1 export | F | 0.80 → **0.85** | SVG parity is a renderer property (E2 F 0.95); the JSON schema's shape is `[SHOWN]` (FeatureCollection, a metadata record with `roadWidth/towerRadius/wallThickness/riverWidth/version`, per-layer features, degree units near 20°E 40°N) and the creator says it "just resembles GeoJSON" — so parity = export the same content classes, which is bounded; `export=` and one-way import are `[STATED]` (112574 L18) | devlog 112574 L18 (CONFIRMED); devlogs-b §2.14 |
| 43 | H2 performance | F | 0.85 → **0.90** | the budget is measured (≈ 19.5 ms + 7.5 µs × buildings, R² 0.974; everything else ≤ 30 ms) and "must invent: nothing"; a modern implementation of these algorithms meets 16–290 ms with margin | profile §7.1, EG-3 |
| 44 | OVERALL | functional | 0.80 → **0.83** | 17 functional cells up by 0.05, none by more; the five heavy stages (B8, B10, B11 and the B9/B13 mechanisms) still bound the aggregate | §2.1 rows above |
| 45 | OVERALL | visual | 0.85 → **0.87** | 9 visual cells up; B10/B11 (the lot texture) unchanged | as above |
| 46 | OVERALL | algorithm_identity | 0.50 → **0.55** | 17 identity cells up, including three 0.15 steps (B15, C1) — but bisection, growers, canal validation, sprawl placer and gate weights stay unpublished, so the aggregate moves one step only | as above |
| 47 | OVERALL | effort_person_weeks | 42 → **38** (30–50) | mesh/coast/walls/gates/castle/streets 10 → 8 (Delaunator, DCEL, BFS, edge collapse are library-grade and the 2017 constants remove search); trees/forests/roofs 4 → 3 (Poisson-disc and straight skeleton are library-grade); export/UI/warp/rerolls 4 → 3 (warp kernels are textbook); the districts + bisection + outskirts + sprawl block (10), rivers (4), naming + labels (3), renderer (4), farms/greens/harbour/landmarks (3) unchanged | assessment §3 breakdown; §2.1 rows 1–3, 7–8, 18–19, 25–27, 39–41 |

### 2.2 Notes on the three patterns behind the table

**Pattern 1 — uniquely-defined published algorithms scored as open methods (rows 1, 3, 8, 18–19, 25–27, 29–32,
34–35).** For a simple polygon there is exactly one straight skeleton; for a fixed point set and insertion order
Delaunator is deterministic; Visvalingam–Whyatt with a fixed tolerance is deterministic; Bridson sampling with the
recorded k = 50 differs from any other correct Poisson-disc only in the random stream. When the row's goal is
output parity (`F`, `V`), the method question is closed by the library, and when the goal is algorithm identity
(`A`) the recorded call structure (1:1 identities, per-roof `intersect` ≈ 17, `validate = 140 × validateRect`) is
the fingerprint of that library's control flow. The assessor cited the identities and still priced the method as
half-open; the cells move by 0.10 each.

**Pattern 2 — "must invent" rules that are `[STATED]` + 2017-verified + live-named (rows 5–8, 10–15, 22–24).** The
clearest case is the building plan generator. `mfcg.md` B15 says "Must invent: the live plan generator
(`getPlanSym`), the inscribed-rectangle use" and C1 says "Must invent: the rectangle-composition rule of Complex".
Devlog 11802 states the rule in one sentence (CONFIRMED at source, L27), devlog 8154 states the castle case (L28),
`_critic.md` §4 #11 had already verified the quotation, `os-wards-render.md` §5 documents the 2017 slicer that
produces exactly "rectangles with rectangular notches", and the Styles capture's step 049 shows `PolyBounds.lir`
running 3 738 times for 4 737 lots when Complex is on (§4). The assessor read ST-7 (which lists `createRects`,
`isRectangle`, `getPlanFront`, `rectArea`) but not the `lir` count, and did not read devlogs-a §2.4, which is where
the stated rule lives. The same shape recurs for the streets (2017 arithmetic predicts the measured `2N + 1`), the
outskirts filter (2017 formula complete), the gates (each clause verified or measured) and the plaza/temple
furniture (2017 constants + stated cloister plan).

**Pattern 3 — render passes scored below their own draw record (rows 25–26, 28, 34–38).** The alleys layer, the
roof line-work, the tint arithmetic, weathering and the Offset pass each have a complete recorded op sequence and
an exact count identity; what a builder must decide is at most one constant per row.

---

## 3. Rows tried and could not refute (the rating stands under this lens)

| row | metric(s) | what I checked | why the rating stands |
|---|---|---|---|
| A1 URL / blueprint | F 0.95, A 0.85, S 0.60 | profile §2, EG-3 | already at the top of the scale for what is known; S is the over-lens's business |
| A2 RNG stream | F 0.95, A 0.90, S 0.85 | EG-3 seed chain, `_critic-os` §1.1 | 34/34 orbit hits already priced; save/restore positions genuinely unknown |
| A3 pipeline / failure policy | F 0.90, A 0.85, S 0.50 | profile §3.1, §11, ST-8, EG-3 | skeleton `[STATED]` twice and already scored high |
| B3 coast field | F 0.80, V 0.80, A 0.50 | profile §4.1, §2.1; `os-geometry` §3.7; posts-b §2.16 | fBm is standard but the combination with `sea` and the 0.11.2 bay rule are `[INFERRED]`/`[NAMED-ONLY]`; the 2017 `PerlinNoise` has no callers, so the ancestor bounds nothing here |
| B5 walls / gates | F 0.90, V 0.90 | EG-1, EG2-2/3 | laws measured to the pixel and already at 0.90; wall smoothing unmeasured, so no higher |
| B6 citadel | F 0.85, V 0.85 | posts-a T12, §4.4b | inner castles "surprisingly hard … compatible with any parameter combination" is a real cost |
| B8 rivers / canals | F 0.75, V 0.80, A 0.40 | profile §4.6, §11, EG-3; devlogs-a §2.15 via assessor; posts-b §2.16 | the routing primitive is shown, but `validateCourse`, `getCanalWidth`, the course proposal and the tributary/islet logic are unknown and drive the course statistics; the 2017 snapshot has no water at all |
| B9 districts | V 0.85, A 0.45 | §4.7 | `getType` scoring, `sort`, growth order and stop are unobserved; only F moves |
| B10 ward → blocks | all | `_critic.md` C13, watabou-extra-a §2.1 (49191011 L17–21 CONFIRMED: "just an idea, not an algorithm"), ST-4 | every constant is open by ruling; the second alley type is unexplained |
| B11 block → lots | all | C13, profile §4.9 table, ST-7 | same; the output statistics are the calibration target the assessor already priced into F/V |
| B13 sprawl | V 0.80, A 0.40 | EG2-4, devlogs-a §2.12 | mechanism `[NAMED-ONLY]`; only F moves (row 12) |
| B14 plaza / temple | F 0.80, V 0.85 | §4.7, EG-5 | church placement per ward group and gate-plaza radius still open |
| B16 greens / parks | F 0.85, V 0.90, A 0.50 | §2, §10.1; posts-a T12 | `ParkGrower` predicates unobserved; flat fill exact — already 0.90 |
| B17 farms | F 0.80, A 0.45 | §4.9, EG-2 | which cells become farmland and the split rule are open; only V moves |
| B18 harbour | V 0.90, A 0.50 | EG-4 | pier count/spacing and harbour cell selection open |
| C2 roofs | S 0.02 | ST-3 | the reference's own roofs are not bit-stable between renders |
| C3 processing | F 0.80, V 0.80 | ST-7 | the offset amount is one constant but the visible gap has not been measured in world units |
| D1 naming | S 0.00 | ruling | names must differ by the clean-room ruling |
| D2 labels | V 0.85, S 0.05 | ST-5, visual-spec §1.7 | ridge score and font-size constant open; V already carries the measured halo/size |
| D3 furniture | F 0.90, V 0.90, S 0.30 | §8 | already at 0.90; compass rerolls per session |
| E2 stroke discipline | F 0.95, V 0.90, A 0.85, S 0.70 | §10.3–10.5, visual-spec §0.2, §1.3, §1.8 | at the top already; V 0.90 is right because the 1× no-HiDPI canvas and per-ward caching are choices, not laws |
| E4 district view / framing | all | 101942512 L27–37 (CONFIRMED), EG2-4 | the fit rule is `[INFERRED]`; "exactly in the same way" is stated but the border dashing and the viewport rule are not measured |
| F2 rerolls / landmarks | all | EG-3, 87882877 L48 (CONFIRMED) | sub-seed derivation unknown; the rest already 0.80 |
| F3 UI / hotkeys | all | 494692 (CONFIRMED list), ST-0 | already 0.90 |
| G2 integrations | all | posts-b §2.22 | external services; nothing to raise |
| H1 population / scale | all | `_critic.md` C1, visual-spec §0.2 | 6.12–6.13 per building already priced; "dimensions are a mess" (79147510 L71 CONFIRMED) is a reason to keep V at 0.80 |
| seed-exact column (all rows but E3) | S | EG-3, `_critic-os` §4.3 | the stream is pinned but every downstream draw order is not; the 2017 order bounds only the ancestor |

---

## 4. Checks made on data already on disk (CONFIRMED)

All read with a 25-line Python script over `captures/mfcg/2026-09-25T10-38-58/steps/<n>-*.calls.json` (label →
summed `calls`), plus two greps over captured assets and five over the 2017 source. Nothing else was executed.

| step / file | counts read | what it settles |
|---|---|---|
| `014-01-trees-on` | `PoissonPattern.fill` 3 842 = `Forester.fillArea` 3 842 = `FillablePoly.new` 3 842; `FillablePoly.validate` 782 460 = 140 × `validateRect` 5 589; `Forester.fillLine` 120; `TreesLayer.getCrown` 20 = `Bloater.bloat` 20; `getTree` 779 − `ArrayExtender.random` 759 = 20 | rows 18–19 (B19): the tile stamp and the 20-crown library are exact |
| `017-04-forests-regen` | `SkeletonBuilder.run` 13 = `District.new` 13; `drawRoof` 9 222 | rows 25–27: label ridges only, before Hip |
| `019-05-roofs-hip` | `SkeletonBuilder.run` 9 222 = `.new` 9 222 = `drawRoof` 9 222; `intersect` 157 546 (= 17.1 per roof) | rows 25–27 (C2): one skeleton per roof |
| `021-07-roofs-gable` | `run` 7 139 = `drawRoof` 7 139 | rows 25–27: Gable reuses the per-roof skeleton |
| `023-09-alleys-on` | `FormalMap.updateRoads` 1; `RoadsView.drawOutline` 7 = `drawRoad` 6 + 1; `drawFill` 6 | rows 36–38 (E3): the toggle redraws roads only and adds one stroke |
| `028-13-tint-districts-on` | `Ward.getColor` 83 = `Color.lerp` 83; `Style.getTint` 0 | rows 34–35 (E1): tints are per district at creation, outlines lerped per built-up ward |
| `044-23-weathered-roofs-on` | `Color.scale` 11 120 for `drawRoof` 11 127 | rows 34–35: weathering is one scale per roof |
| `049-27-display-complex` | `Block.createBuildings` 510 = `createRects` 510; `Building.create` 4 737 ≈ `drawRoof` 4 734; `Block.isRectangle` 4 738; `Building.getPlanFront` 3 835; `PolyCore.rectArea` 3 460; **`PolyBounds.lir` 3 738** | rows 14–15, 22–24 (B15, C1): the largest-inscribed-rectangle method of devlog 11802 is the live Complex method — the `lir` count is new information the assessment did not have |
| `054-31-processing-none` | `Block.indentFronts` absent (0); `PolyBool.and` 1 134; `Block.new` 493; `City.updateLots` 1 | row 28 (C3): Offset = `indentFronts`, exactly |
| grammar asset `0015-5ba58ea2.json` (4 401 B) | token counts: `UNIQUE?-` 5, `UNIQUE&0.5?-` 1, `COMPACT?-` 2, `CASTLE?-` 2, `WALLS?-` 2, `TEMPLE?-` 2, `COAST?-` 3, `RIVER?-` 1, `PLAZA?-` 1, `.merge` 4, `.s#` 6, `0.5?-` 7, `0.2?-` 7, `0.1?-` 6, `0.05?-` 2, `@alias` 5 | rows 29–30 (D1): the guard/modifier schema is complete and verbatim |
| six palette JSONs | identical 13-key set (`colorDark … colorWater, tintMethod, tintStrength, weathering`) | rows 34–35 (E1) |
| `Model.hx:221/231/248/321`, `CurtainWall.hx:32/51/101/109`, `Castle.hx:17–19/25–26`, `Graph.hx:27/33/46–47` (grep -n only) | `for (gate in gates)`; `if (border.gates.contains(gate))`; `< 8`; `patches.count(`; `while (entrances.length >= 3)`; `smoothVertex(gate)`; castle `reserved` = vertices touching `!p.withinCity`; `openSet.shift()` | rows 2–3, 5–6, 8 (B2, B5, B6, B7): the ancestor lines the adjustments lean on are where `_critic-os.md` says they are |

---

## 5. Verdict

**Aggregates under this lens:** functional **0.83** (was 0.80), visual **0.87** (0.85), algorithm identity
**0.55** (0.50), seed-exact **0.02** (unchanged), effort **38 person-weeks, range 30–50** (was 42, 32–55).

**What does not change.** The assessment's central claim stands: "deriving their code" fails at the five heavy
stages (twisted bisection's constants, the district growers' predicates, the canal validator, the sprawl placer,
the gate weights), and same-seed reproduction is unattainable without the source. This lens found no evidence that
raises any of those five, and the seed-exact column is untouched except for one consistency cell.

**What changes.** The assessment under-prices what the evidence base already closes: eleven rows rest on
uniquely-defined published algorithms whose recorded call structure is their fingerprint; six rows say "must
invent" a rule the creator has stated and the 2017 source implements under a live-matching name; three render rows
have complete draw records. The single most useful new fact is on disk already — `PolyBounds.lir` 3 738× in
Complex mode (§4) — and it converts the building plan generator from `[NAMED-ONLY]` into a `[STATED]` method with a
verified ancestor, which is why B15 and C1 carry the only 0.15 steps.

**Where the two challenge lanes disagree** (for the judge): B5 A (over-lens 0.55, this lens 0.75 — same EG-7 #9
line, read as "parameters differ and are measured" here versus "unchanged is not supported" there); B13 F
(over-lens down, this lens 0.80 — whether ribbon statistics or the placer's rule are what "statistically similar
structure" means); B7 A (over-lens 0.50, this lens 0.70 — the 2017 arithmetic predicting the measured `2N + 1` is
new to both sides' argument and is CONFIRMED at `Model.hx:221/231`); the seed-exact cells of E2/E3 (conditional vs
unconditional reading — this lens only asks that the two be scored on the same basis).

**Cheapest next evidence, in this lens's order:** (1) nothing new is needed for rows 14–15/22–24 — the `lir` count
should simply be written into `profile-mfcg.md` ST-7 (one line); (2) the assessor's experiment #1 (`export=svg`
of the four `seed=555001&size=40` gate runs) would move B10/B11 `F`/`V` by turning the lot statistics into
distributions, which is the only remaining lever on the functional aggregate; (3) experiment #3 (the 2017 spiral
in Python against exported cell statistics) would move B1 `S` and settle "still the 2017 spiral".

**CONFIRMED vs PLAUSIBLE.** CONFIRMED: every count in §4 (re-read from the capture JSON in this seat), every
quoted creator phrase (found at the cited post/devlog line), every 2017 source line (grep at the cited file),
and every finding-file citation (read at the section named in §0). PLAUSIBLE: every confidence number, the
aggregates, the effort figure and the three-pattern reading in §2.2. No recording was made, no bundle opened, no
pixel re-measured.
