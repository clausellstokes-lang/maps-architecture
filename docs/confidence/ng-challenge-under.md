# Under-confidence challenge — `docs/confidence/ng.md` (watabou's Neighbourhood generator)

Lane `confidence/ng-challenge-under`. Written 2026-09-25 by the adversarial reviewer (Fable seat), lens
**UNDER-CONFIDENCE HUNTER**. Status: **COMPLETE**.

Target under review: `docs/confidence/ng.md` (773 lines, 32 capability rows A1–H1), claimed aggregates
functional 0.85 / visual 0.85 / algorithm_identity 0.55 / seed_exact 0.02 / effort 19 person-weeks (15–24).

The lens looks only for rows rated **lower** than the evidence warrants: a standard published algorithm that fully
covers the capability (named); recorded data already on disk that pins the behaviour (call counts, draw logs,
vertex captures, console traces, captured assets and their schema); the 2017 open-source ancestor still matching
the live class/method names; and capabilities that need only parity of OUTPUT, not of method. Rows rated *too high*
are out of scope (the sibling lane `confidence/ng-challenge-over` owns them) and are not adjusted here; where a
measurement made in this seat cuts the other way I say so, so the judge sees both arguments. Every adjustment in
§2 quotes or pinpoints what was checked; rows the evidence supports as rated are in §3 ("tried to refute and could
not"); §4 records the measurements made on data already on disk; §5 gives the aggregates and verdict; §6 the
caveats. The default is to refute when the cited evidence does not actually carry the rating — here, when the
evidence carries MORE than the rating admits.

**Headline.** Seven row metrics on seven rows move up, by 0.05–0.10, plus two aggregates (algorithm identity
0.55 → **0.60**, effort 19 → **16** person-weeks, range 13–21); functional, visual and seed-exact aggregates are
unchanged. The assessor's judgment was sound where it rested on the findings text; what it missed is (1) its own
"cheapest experiment #1" — the forward-prediction test of the bent cut on the 2026-09-25 vertex captures — was
runnable from disk in one afternoon, and it **passes the assessor's stated threshold for the plain `Bisector`**
(43/54 bounded cuts within 0.1 chord = 80 %; area template 34/40 = 85 %) while failing for the hole-aware
`BisectorEx` (43/97 = 44 %), so B3's algorithm identity moves by the assessor's own rule and B4's does not; (2)
three rows describe standard published algorithms whose identity with the recorded call structure is near-certain
(Bridson Poisson-disc with k = 50 and annulus candidates, Chaikin corner cutting, Kate Compton's Tracery — whose
class names NG's `com.watabou.tracery` package reproduces) and were scored as if the method were open; (3) two
"unaccounted" items the assessor carried forward are closed by the data already on disk — the ≈ 18 % 1-segment
shadow strokes are OpenFL's leftover pen point (4 046/4 046 equal the previous record's end vertex, §4.2), and
every `Pin` is realised as a tree, a well or a fountain (`Pin.new = Tree.new + WellView.new + FountainView.new`
exactly, §4.7). One factual correction rides along: the "2 938 B `makeCut`" black box the assessment cites is
`BisectorEx.makeCut`; the plain `Bisector.makeCut` is 2 384 B (and `subdivide` 214 B, `split` 489 B), settled by
coverage offsets (§4.3). Seed-exact does not move: nothing found here recovers draw positions.

---

## 0. Reading log (what this review rests on)

Read **in full, every line**, in this order: `docs/confidence/ng.md` (773); `research/findings/_critic.md` (478);
`_critic-vg-ng.md` (226); `_critic-os.md` (434); `profile-neighbourhood.md` (1 878: body §0–§10, CA-1..CA-5,
RA-0..RA-9, Critic-2 addendum, BG-1..BG-4, PF-1..PF-3); `vg-ng-devlogs.md` (1 038); `mfcg-posts-b.md` (766);
`os-geometry.md` (945); `watabou-extra-a.md` (1 161); `watabou-extra-b.md` (996); `visual-spec.md` (743);
`captures/neighbourhood/README-vertices.md` (128); `captures/README-labelfix-2026-09-25.md` (153);
`profiler/README.md` (vertex-record section); `captures/neighbourhood/{seed_orbit,bentcut_parent_face}.py` whole,
`bentcut_geometry.py` by outline, `widthfit-2026-09-25.txt`. ≈ 330 k tokens of reading, under the 350 k switch
point — nothing was downgraded to outline reading and no section was skimmed. Also read: the sibling files
`docs/confidence/ng-challenge-over.md` (stub, working notes only at the time), `mfcg-challenge-under.md` and
`vg-challenge-under.md` (format and the "measurement on disk" precedent; their numbers were not consulted).

**Original sources opened (data only; no JavaScript bundle at any point):** Patreon bodies
`research/patreon/watabou-extra/{49191011, 58808794, 59046807, 64375271, 70917627, 99067664, 101173551}/post.md`,
`watabou-city/100431269/post.md`, `ftg/164816716/post.md`; itch devlogs `research/devlogs/neighbourhood/{315495,
419786, 419965}*/post.md` (419965 whole); capture assets `captures/neighbourhood/2026-09-21T05-04-54/coverage/network/
bodies/0016-5c70e16a.json` (= `Assets/default.json`) and `0016-376f0102.json` (= `Assets/grammar.json`);
`coverage/gen-N.coverage.json` and `gen-N.calls.json` of `2026-09-21T05-04-54`, `07-20-25`, `05-38-59`, `05-40-05`
(function names, byte ranges and counts only — no source text); `draw/gen-{0,1}.paths.json` of the four
2026-09-25 vertex captures. That covers original sources for 22 rows (A1, A2, A3, B1, B2, B3, B4, B6, B8, C1, C4,
C5, C6, C7, D1, E1, E3, E4, E5, F1, G1, G2, H1).

**Executed in this seat (CONFIRMED):** `seed_orbit.py` re-run (9/9 on orbit, k = 35 102–103 813, 0.16 s); the
coverage-range check (§4.4); the byte-offset check (§4.3); the shadow-stroke check (§4.2); the pin census (§4.7);
identity re-derivations on the raw `calls.json` (§4.6); and the forward-prediction test (§4.1), whose script is saved
as `captures/neighbourhood/bentcut_forward.py` (stdlib; it imports `bentcut_parent_face.py` unmodified and wraps four
of its helpers) so it can be re-run: `python3 captures/neighbourhood/bentcut_forward.py [--json out] [--tol 3]`.

**Not done:** no new recording; no PNG re-measured; no palette-mode render; the 344 hood-side cuts of PF-1 remain
untested (the hood outline is not drawn, as before); adjacent footprints were not paired (CA-5's test).

**Evidence labels in this file:** **CONFIRMED** = executed here against the capture data or found verbatim at
source; **PLAUSIBLE** = reasoning. Every confidence number is a judgment (PLAUSIBLE); the facts each adjustment
rests on are labelled individually. Confidence semantics are the assessment's own (§2 of `ng.md`): `F` functional,
`V` visual, `A` algorithm identity ("our derivation matches THEIR algorithm, not merely its output"), `S` seed-exact.

---

## 1. Method and standard

For each of the 32 rows I asked, in order: (a) is there a published algorithm that fully covers the capability and
matches the recorded call structure, so that a builder reproduces the method and not only the output? (b) is there
recorded data already on disk that pins the behaviour more tightly than the row's justification admits — including
the assessor's own listed "cheapest experiments" where they run on existing files? (c) does the 2017 ancestor still
match the live class/method names in a way that bounds the method? (d) does the row's `F`/`V` score penalise an
unknown *rule* although only *output* parity is required? A cell moves only when the answer changes what a builder
would have to invent, and then by the smallest step (0.05) unless the evidence removes a whole class of unknown
(0.10). Where the cited evidence supported the rating, I say so in §3 with what I checked. The seed-exact column was
tested and left alone: nothing in this seat recovers a draw position.

---

## 2. Adjustments

### 2.1 Table

| row | capability | metric | from | to | one-line reason | evidence checked (§) |
|---|---|---|---|---|---|---|
| B3 | Street network by bent recursive bisection (plain `Bisector`) | A | 0.55 | 0.65 | the assessor's own forward-prediction test, run here, meets its stated threshold for the plain bisector (43/54 = 80 % within 0.1 chord; area 34/40 = 85 %; 94 % for measured-straight cuts); two independent STATED constructions verified at source | §4.1; 49191011 L19; 164816716 L35–39 |
| C4 | Greens, groves and the shared Poisson field | A | 0.60 | 0.70 | the field is Bridson (2007) dart-throwing with k = 50 and annulus candidates (`warp ÷ step = 50.000`, `Point.polar ≥ warp`), the smoother is Chaikin (1974) by class name and exact count identity, the inset is the 2017 offset-then-repair family — standard published algorithms, only constants open | §4.6; pn §3.8, CA-4, RA-8; osg §2.1.4 (c) |
| D1 | Naming (Tracery grammar + Markov surnames) | A | 0.80 | 0.90 | `com.watabou.tracery.{Grammar, Symbol, RuleSet, TraceryNode, Tracery, RuleSelector, DeckRuleSelector, ModsEngBasic}` are the class and mode names of Kate Compton's tracery.js; the grammar is captured verbatim (29 symbols, re-read here) and every observed title maps onto a path; the Markov surname engine is the 2017 `MarkovChain` shape | §4.6; pn §1.4, §3.11, RA-5; osg §3.8 |
| E4 | Roof rendering (fake gables, colour law, shading, hatching) | A | 0.80 | 0.85 | every op and constant is measured to < 1 %, and the "6-uniform pseudo-normal" is the sum of two 2017 `Random.normal()` draws on the CONFIRMED MINSTD engine (sd √(2/36) = 0.2357 vs 0.230 measured) — the colour law is tied to the ancestor's RNG API, not a free invention | pn §3.6; cos §1.1 row 6; ng.md §1.3 |
| E5 | Shadows (prism quads, tree shadows, layer alpha) | A | 0.80 | 0.85 | the ≈ 18 % "unaccounted" 1-segment shadow strokes (pn §9 Q10, carried in ng.md §5) are OpenFL's leftover pen point: 4 046/4 046 equal the previous record's end vertex and paint nothing; the shadow layer is now fully accounted for | §4.2 |
| C6 | Pins: wells, fountains, large trees | A | 0.45 | 0.50 | `Pin.new = Tree.new + WellView.new + FountainView.new` exactly (33 = 33+0+0; 72 = 70+1+1): every pin is realised as one of the three stated kinds; `spawnPin` is a 20-byte routine that yields a pin in 0/37 and 3/65 calls — "what suppresses the rest" (pn §9 Q9) is a probability gate, not an unknown mechanism | §4.7; 419965 (P toggle text) |
| C7 | Uneven streetwall | F | 0.75 | 0.80 | output parity needs no method: the look is SHOWN (± 10–25 % front jitter, continuous terraces) and the creator's sibling method in MFCG is STATED ("shifts the front side of every lot to make lines of facades uneven"), so a per-lot front offset reproduces it; the creator's doubt concerns his method, not the output | 58808794 L29; mpb §2.4 (61026228) |
| overall | algorithm identity | — | 0.55 | 0.60 | B3 (double-weighted) +0.10, C4 +0.10, D1 +0.10, E4/E5/C6 +0.05 under the assessor's own aggregation | §5 |
| overall | effort (person-weeks) | — | 19 (15–24) | 16 (13–21) | the measurement harness the bent-bisector line budgets ("half of it") already exists on disk and runs on a documented format; the geometry kernel and the naming engine are library-grade outside the clean-room boundary | §5 |

### 2.2 Row detail (what was checked, and what stays open)

**B3 — algorithm identity 0.55 → 0.65.**
*What the assessor said.* "the construction is theirs to the extent BG-4 states it (SHOWN), but the 2 938 B
`makeCut` still hides the start-side rule, the gate, the fillet decision and the stop law" (ng.md B3); and in §6
item 1: the forward-prediction test on the existing captures "closes or refutes 'OBB axis + midpoint corner' as the
whole construction; moves B3's algorithm identity to ≈ 0.7 or sends the design to a corner-first reading. ≈ 1 day
of scripting on files already on disk."
*What I checked.* (1) I ran that test (§4.1, CONFIRMED): for every bounded simple parent face of PF-1, take the
OBB, put a minor-axis-parallel line through the major axis at the measured crossing fraction, leave the start side
perpendicular, go straight if a straight cut would miss 90° at the far end by ≤ 2–3°, else put one corner at
t = 0.5 arriving perpendicular to the far side, and compare the predicted ends with the drawn ends snapped to the
crossed centrelines. Result for the plain `Bisector`'s templates (area + street + square, n = 54): endpoint error
< 0.1 chord in **43/54 (80 %)**, 42/51 (82 %) when the crossing lies inside the 0.35–0.65 gate, **15/16 (94 %)**
for measured-straight cuts and 28/38 (74 %) for measured-bent ones; the corner lands within 0.1 chord of the drawn
virtual corner in 23/30; the straight/bent decision agrees with the drawn cut in 42/54, best at a 2° tolerance
(122/151 over all templates at 2° against 109 at 5° and 88 at 8°), which independently confirms BG-2's "bend only
if a straight cut would miss 90° by more than ≈ 2°". The far end carries the error (eB p90 0.57 chord; eA p90
0.09), exactly BG-2's "directional construction: leaves exactly perpendicular, arrives within a few degrees". The
hit rate does not depend on the tolerance at all (86/151 at 1.5°, 2°, 3°, 5° and 8°), so the result is not tuned.
(2) The two STATED constructions were re-read at source: 49191011 L19 "we add a turn to a cut somewhere in the middle
to start and end at the right angle to the edges of the polygon" (CONFIRMED verbatim), and the FTG author's
independent three steps, 164816716 L37–39: "1. Pick an outside edge, project a splitting line inside the lot from
the outer edge (perpendicular, so right-angled) 2. Find the intersecting points … 3. If the opposite side
intersection isn't a perpendicular / right angled split, then bend the splitting line in the middle so that both lot
intersections are right angled" (CONFIRMED verbatim) — the same construction the test now reproduces numerically.
(3) The size of the black box is smaller than stated: `Bisector.makeCut` is **2 384 B**, `subdivide` **214 B**,
`split` **489 B** (coverage offsets 245923 / 245409 / 248314; the 2 938 / 504 / 1 107 B routines at 249928 /
249415 / 252873 had 0 calls in the base capture and 123 / 234 / 122 in the ring capture, i.e. they are
`BisectorEx`'s, §4.3, CONFIRMED). `calls.json` has the right bytes; pn §1.2's table took the same-named function.
*Why 0.65 and not 0.70.* The test conditions on the measured crossing fraction and on the start side (PF-3 leaves
both open; the start side is a coin flip in the data), so it verifies "given where the cut crosses, the stated
construction gives the drawn ends and corner" and says nothing about the gate's law, the fillet decision (53 %, no
predictor) or `isSmallEnough`; n = 54 is thin for street (9) and square (5); 344 hood-side cuts stay untested; and
the same test **fails** for `BisectorEx` (43/97 = 44 %, §4.1), which is B4's subject and argues for the over-lane
there, not for me. What survives is a forward model of the plain bisector's cut geometry with two open coin flips
and one open termination law — that is more than "would be re-invented against measured statistics" (ng.md §3),
which is the 0.55 wording. PLAUSIBLE judgment on CONFIRMED numbers.

**C4 — algorithm identity 0.60 → 0.70.**
*What the assessor said.* "the class of every step is SHOWN and two of them are exact identities" — and still
scored the mechanism at 0.60 with "must invent: the inset distance, the Chaikin rounds, the field's radius and tile
size, `warp`'s exact semantics, which blocks get greens".
*What I checked.* Every "must invent" item is a constant, not a method. The sampler: `warp ÷ step = 50.000`
re-derived here on the raw files (6 400/128 in `05-04-54` gen-0, 6 300/126 in `07-20-25` gen-0, all zeros in the
green-free `05-40-05` gen-1; §4.6, CONFIRMED), `Point.polar ≥ warp` in all 10 samples (RA-8) — one polar offset per
candidate is the annulus step of Bridson's *Fast Poisson Disk Sampling in Arbitrary Dimensions* (2007) with k = 50,
which the critic seats had already CONFIRMED across all three generators (cvn §4 item 2). The smoother is
`Chaikin.render` by class name with the exact identity `Chaikin.render = FillablePoly.new = getPattern = fill =
greens + groves` in 10/10 samples (pn §3.8, RA-1) — Chaikin's corner-cutting (1974) is a published algorithm whose
output is uniquely defined by the round count. The inset is `Offsetter.run = runEq = filter` once per green, i.e.
equal-distance offsetting followed by a self-intersection filter — the 2017 `Polygon.buffer` documents exactly that
contract ("raw offset, joints ignored → self-intersection resolution → keep the largest component", osg §2.1.4 (c),
verified at source by cos §3 S3), so the live `Offsetter` is its named descendant. Clipping per polygon is
`PolyBounds.containsPoint` (25 845–26 650 calls). What remains open (cvn V15: whether `warp` also warps the domain;
the radius and tile; the green probability) does not change the method class. PLAUSIBLE.

**D1 — algorithm identity 0.80 → 0.90.**
*What the assessor said.* "the mechanism is captured verbatim, only the content is ours" — yet 0.80, on the ground
that the extension syntax's semantics are read off the grammar text.
*What I checked.* The engine's class names in pn §1.4 — `Grammar`, `RuleSet`, `Symbol`, `TraceryNode`, `Tracery`,
`RuleSelector`, `DeckRuleSelector`, `ModsEngBasic` — are those of Kate Compton's tracery.js (`Grammar`, `Symbol`,
`RuleSet`, `TraceryNode`, `tracery`, the `baseEngModifiers` set with `s`, `ed`, `a`, `capitalize`, `capitalizeAll`;
`RuleSet`'s "shuffle" distribution keeps a shuffled deck, which is `DeckRuleSelector`). The grammar was re-read from
the captured asset (§4.6): 29 symbols, `district` = `["#regularHood#", "0.3?-#gateHood#", …]`, `ringHood` and `ring`
exactly as RA-5 quotes them, no `proper` symbol (so `#proper#` is the Markov path, as pn §3.11 says), CONFIRMED. The
semantics of the extensions are evidenced by outputs, not only by text: "Small Ward" through the `0.5?-` fall-through,
"Goake's Green" / "Gany's Gate" through `#proper.possessive#`, template-conditioned `Namer.square/street/ring` = 1
per template (CA-1, RA-1). The surname engine (`nlp.Markov.split/generate`, `Syllables.splitWord/pinch`) has the
2017 `MarkovChain` as its ancestor (order-1 chain with null sentinels and `weighted` sampling, osg §3.8). The
content is ours by ruling and is not an "algorithm identity" question. What stays open is only the exact weight
arithmetic of `w?-` and the `@list` resolution — a 0.10 residual, not 0.20. PLAUSIBLE.

**E4 — algorithm identity 0.80 → 0.85.**
*What I checked.* The assessor's "6-uniform pseudo-normal" (pn §3.6: k = 1 + varRoof·N with sd 0.2357 = √(6/12)/3)
is arithmetically `Random.normal() + Random.normal() − 1` of the 2017 engine (`normal()` = mean of three floats,
Irwin–Hall(3), var 1/36, cos §1.1 row 6 CONFIRMED at source): var = 2/36 → sd 0.2357, against 0.230 measured
(pn §3.6: sd 0.069 / 0.3). The tree spread (sd 0.036–0.039 at varTree 0.2, pn §3.9) fits `2·normal() − 1` (sd
0.192 → 0.038) rather than the two-draw sum (0.047) — so the two laws differ by one draw, but both are built from
the ancestor's `normal()`, whose engine A2 now CONFIRMS is the live one (§1.3 of ng.md, re-run here). That converts
"a 6-uniform pseudo-normal" from a fitted curiosity into a named primitive of the ancestor API. Everything else in
the row was already measured: `PolyCut.cut = hatchRoof`, `pierce` ≈ 8.5 per roof, `shortStroke` = 2.0006–2.035 per
pierce (cvn S29), `getDark` = `multiply(c, lerp(ambience, shadow, ≈ 0.41))` to 0.5–0.9 %. Open: the taper
profile of `shortStroke`, the hatch pitch, the exact t. PLAUSIBLE (the RNG-law identification is arithmetic on
measured spreads, not a draw census).

**E5 — algorithm identity 0.80 → 0.85.**
*What the assessor said.* "≈ 18 % 1-segment strokes unaccounted (pn §9 Q10)" is listed among the "below the fold but
real" unknowns (ng.md §5) and in E5's evidence line.
*What I checked (§4.2, CONFIRMED).* In the four 2026-09-25 `paths.json` files, every `#7a8499` stroke record with one
vertex (861 / 797 / 1 217 / 1 171 = 4 046) has that vertex equal to the last vertex of the immediately preceding
record, and none matches anything else; a `moveTo`-only subpath paints nothing in Canvas2D. They are OpenFL's
leftover pen position — the same artefact BG-3 found at the head of every road and outline stroke — emitted here as
a separate stroke. The shadow layer is therefore fully accounted for: one translated footprint per wing, one quad
fill + same-colour 1-px stroke per silhouette edge (2 168 five-vertex strokes for 2 211 fills, the difference being
the tree-crown blobs), tree crowns translated. Open: the height source and the blend mode (vs §7 item 7).

**C6 — algorithm identity 0.45 → 0.50.**
*What I checked (§4.7, CONFIRMED).* `Pin.new = Tree.new + WellView.new + FountainView.new` exactly: 33 = 33 + 0 + 0
(`05-04-54` gen-0), 72 = 70 + 1 + 1 (`07-20-25` gen-0, with `Tree.fromPin` = `WellView.fromPin` =
`FountainView.fromPin` = 1). So every pin becomes one of the three kinds the creator names ("pins (fountains, wells
and large trees)", devlog 419965, re-read whole) and nothing is silently dropped downstream. `Normal.spawnPin` is
**20 bytes** (coverage range, §4.4) and yields 0 pins in 37 calls (A0) and 3 in 65 (R1): a routine of that size is
one conditional — a probability gate on a per-block roll, which is what "suppresses the rest". Open: the gate's
probability, the kind split, placement within the block.

**C7 — functional 0.75 → 0.80.**
*What I checked.* 58808794 L29 (CONFIRMED verbatim): "One of the ideas I tested here that is not related to
bisection is uneven streetwall. I like the result a lot, although I have my doubts about the method I use for it."
The doubt is about *his method*; the *output* is fully specified by the post images (xa §2.4: fronts ± 10–25 % of a
building depth, occasional juts, no gaps) and by the creator's own STATED sibling method for the same effect in MFCG
(`Processing: Offset` "shifts the front side of every lot to make lines of facades uneven", 61026228 via mpb §2.4,
spot-checked by the first critic, cr §4 item 7). A per-lot inward offset of the street-facing edge is a
one-afternoon feature and reproduces the look. Why only +0.05: whether build 11441280 still applies it is
unverified (the vertex captures could decide it by pairing adjacent footprints and no one has), so parity of a
possibly absent feature caps `F`. `V` 0.80 stands.

---

## 3. Rows tried to refute and could not (rated as the evidence warrants)

| row | what was checked | why the rating stands |
|---|---|---|
| A1 | 64375271 L23–48 (templates, `secular`, `leafy`, mouse-wheel rotation) and 419965 whole | the vocabulary is complete, but `Settings.processTags` is 2 511 B against five observed tags and the random-tag prior is unrecorded; `A` 0.75 is right |
| A2 | `seed_orbit.py` re-run: 9/9 on orbit at k = 35 102 … 103 813, cold-load deltas 12 986 / 12 416 | CONFIRMED as claimed; nothing here raises the "stream only" 0.80 (the over-lane's question) or lowers it |
| A3 | 315495 L15–17, 70917627 L25 ("still pretty glitchy, but it works") | the three-tier policy is arithmetic; the alternative-cut validity test is unread; 0.85 stands |
| B1 | 49191011 L85 (creator: "I can generate a 'district' of any shape this way") | STATED for the arbitrary-boundary property, but `createShape` (1 170 / 1 434 B) has no ancestor and no measured silhouette statistics; `A` 0.30 stands |
| B2 | 64375271 L25–27 | the template mechanics are pinned by CA-2's identities; the main-street course law and `StreetHood.f` are open; 0.60 stands |
| B4 | the forward test on the ring bands: 43/97 (44 %) within 0.1 chord, corner 26/60, `B on far side` 73/97 (§4.1) | the plain construction does **not** reproduce the hole-aware cuts; 0.45 is, if anything, generous — this argues for the over-lane, not for me |
| B5 | BG-1 width fits (`widthfit-2026-09-25.txt` re-read: linear rms 0.005–0.039 against √L and log L 1.7–15× worse) | mechanism SHOWN, parameter origin unknown; 0.65 already credits the circular fillet and the linear law |
| B6 | 64375271 L37–41 (landmarks "at some distance from each other", "take a whole block") | weighted choice SHOWN (`ArrayExtender.weighted`, one draw per pick as in the 2017 ancestor, osg §3.2), weights unknown; 0.40 stands |
| B7 | CA-1/CA-3, `PolyBounds.circle` = 1 per square map | two branches and their primitives are named, bodies unread; 0.50 stands |
| B8 | 419786 L18 and 70917627 L19 (the fallback rule, CONFIRMED verbatim); RA-7 | H-R is a hypothesis with five untested predictions; two maps; 0.75 / 0.35 stand |
| C1 | 58808794 L26 ("occasionally they spawn very weird ones which need to be filtered out"); RV headline 4 | `validateOuter` / `validateLot` (189 / 195 B) semantics are unread and the forward test says nothing about lots; 0.55 stands |
| C2, C3 | pn §3.5, §1.1 counts; 70917627 L31–33 (house shape passed to Procgen Mansion) | vocabularies complete, every selector open; 0.40 / 0.35 stand |
| C5 | 100431269 L31 (MFCG "now drawn using the same algorithm as in Neighbourhood Generator, but with fewer details"); 99067664 L15 | the shared-algorithm statement does not describe the crown construction anywhere in the corpus; the 4:1 `bloat` identity is already credited; 0.50 stands |
| C8 | 70917627 L115 (the knob list, CONFIRMED verbatim); CA-3 size bands | knob → `isSmallEnough` mapping and the metric are open; 0.85 / 0.35 stand |
| D2 | pn §3.12; RA-0 corners | the corner score is a reading; 0.70 stands |
| E1 | `default.json` re-read: 26 keys, `colorRoof ["#7F604C"]`, `varRoof 0.3`, `shadowAlpha 0.4`, `colorShadow #7A8499`, `colorAmbience #FFFFFF` (CONFIRMED) | schema pinned; 0.85 already reflects it; the never-exercised keys keep it from 0.90 |
| E2 | vs §3.3 layer order; RA-5 | complete; 0.85 / seed 0.60 stand |
| E3 | 70917627 L43–51 (Plain / Cobbles / Tiles, Outlined, Twisting, Road width ratio, dashed lines — CONFIRMED verbatim); 59046807 L41 | four of five surfaces exist only as prose and post images; `V` 0.75 stands |
| E6 | 59046807 L37 (night preset); pn §4.1 `night.json` values | no render to match; 0.70 stands |
| F1 | 419965 whole: 5 layer toggles (T, G, P, R, S) plus style/tags/presets — the binary's `toggleChimneys` is the sixth (pn §1.5) | complete; 0.95 / 0.80 stand |
| G1 | 59046807 L39 ("PNG, SVG and JSON (for opening them in the City Viewer)") | the JSON schema is inferred from renders; `assemble` (7 272 B) never ran; 0.40 stands |
| G2 | 100431269 L61 (the rejection, CONFIRMED verbatim) | composition was never an NG capability; 0.70 / 0.40 stand |
| H1 | 101173551 L25 (O(n²) "fine for my use cases"); RA-6 | costs known, code not; 0.60 stands |
| all rows, `S` | §1.3 of ng.md re-executed; `Random.float` 4 / 9 / 7 visible calls per generation (§4.6) | the inlined `next()` hides the draw positions exactly as claimed; nothing found here recovers them |

Also considered and not moved: B3 `F`/`V` 0.90 (already the ceiling the forward test supports); C1 `F` 0.85; C5
`A` (the tree colour law's `2·normal() − 1` reading is PLAUSIBLE and adds nothing a builder needs); E1 `A`.

---

## 4. Measurements made on data already on disk

All scripts are stdlib Python; outputs quoted from the runs of 2026-09-25 in this seat.

### 4.1 Forward-prediction test of the bent cut (`captures/neighbourhood/bentcut_forward.py`) — CONFIRMED

Runs PF-3's "Next test" on the four 2026-09-25 vertex captures (seeds 7171 / 7172 × ring / area / street / square,
`medium`). It imports `bentcut_parent_face.py` unmodified and wraps its `obb`, `sides`, `cross_fracs` and
`centroid` so that, for each of the 162 bounded simple parent faces that script finds, the parent polygon (E1 and
the fillet-free E3), the OBB and the cut's own course `[e0, Pv, eN]` are captured; 151 cuts have a measured
major-axis crossing fraction `f` and are tested. Construction: the line parallel to the OBB minor axis through the
major axis at `f`; start crossing = the one nearer the drawn start (the start side is OPEN in PF-3 and is
conditioned on; the unconditioned "better of the two sides" is reported too); leave the start side exactly
perpendicular; straight along the mean of the two end normals if that misses 90° at the far end by ≤ TOL, else one
corner at t = 0.5 arriving exactly perpendicular to the far side. Errors are in units of the drawn chord.

| set | n | endpoint error < 0.1 chord | < 0.2 | < 0.1, better side | eA p50 · p90 | eB p50 · p90 | straight/bent agrees | corner < 0.1 (bent ∧ bent) |
|---|---|---|---|---|---|---|---|---|
| **plain `Bisector` (area + street + square)** | **54** | **43 (80 %)** | 47 | 45 | 0.017 · 0.091 | 0.032 · 0.571 | 42 | 23/30 |
| — area | 40 | 34 (85 %) | 35 | 35 | 0.014 · 0.065 | 0.031 · 0.525 | 32 | 20/25 |
| — street | 9 | 7 | 8 | 8 | 0.017 · 0.069 | 0.030 · 0.172 | 7 | 2/3 |
| — square | 5 | 2 | 2 | 2 | 0.056 · 0.109 | 0.550 · 0.836 | 3 | 1/2 |
| — plain, measured straight | 16 | 15 (94 %) | — | 16 | 0.009 · 0.027 | 0.011 · 0.093 | 12 | — |
| — plain, measured bent | 38 | 28 (74 %) | — | 29 | 0.027 · 0.109 | 0.041 · 0.673 | 30 | 23/30 |
| — plain, crossing inside 0.35–0.65 | 51 | 42 (82 %) | — | 43 | 0.014 · 0.069 | 0.030 · 0.550 | 39 | 22/27 |
| **`BisectorEx` (ring bands)** | **97** | **43 (44 %)** | 69 | 56 | 0.063 · 0.251 | 0.102 · 0.752 | 77 | 26/60 |
| all | 151 | 86 (57 %) | 114 | 101 | 0.041 · 0.218 | 0.072 · 0.688 | 119 | 49/90 |

Sensitivity: the endpoint hit rates are identical at TOL = 1.5°, 2°, 3°, 5° and 8° (86/151 overall, 34/40 area); the
straight/bent agreement peaks at **2°** (122/151; 118 at 1.5°, 119 at 3°, 109 at 5°, 88 at 8°). Misses (65): 20 have
a chord more than 20° off the minor axis, 20 an off-gate crossing, 20 a straight/bent disagreement; the far end is
the worse end in 52 of 65 (eA < 0.1 in 112/151, eB < 0.1 in 91/151). Reading: "OBB axis + perpendicular departure +
midpoint corner + perpendicular arrival" is a working forward model of the **plain** bisector's cut geometry given
the crossing fraction, at exactly the ≥ 80 % the assessor set; it is **not** a model of the hole-aware bisector's
cut (the ring faces are curved annular sectors whose OBB and 1°-broken sides describe them poorly, and the corridor
is carved during the cut). What the test does not decide: how `f` is drawn (the gate), which side starts, arc vs
sharp, `isSmallEnough`, and the 344 hood-side cuts. Reproduce: `python3 captures/neighbourhood/bentcut_forward.py`
(3.4 s).

### 4.2 The 1-segment shadow strokes are OpenFL's leftover pen point — CONFIRMED

`paths.json` records with `op = stroke`, `k = #7a8499`: area 7171 — 5 263 strokes, vertex-count histogram
{0: 2 234, 1: 861, 5: 2 168}; area 7172 — {0: 2 002, 1: 797, 5: 1 954}; ring 7171 — {0: 3 233, 1: 1 217, 5: 3 147,
177: 1}; ring 7172 — {0: 3 074, 1: 1 171, 5: 3 010}. For every one-vertex record the vertex equals the last vertex of
the immediately preceding record (861 / 797 / 1 217 / 1 171 = 4 046 matches, 0 matching the next record's first
vertex, 0 other). A `moveTo`-only subpath paints nothing. So pn §9 Q10 and the "≈ 18 % 1-segment strokes
unaccounted" line in ng.md E5 / §5 are closed: they are the recorder seeing OpenFL's pen position, not a shadow
primitive. The five-vertex strokes (2 168 / 1 954 / 3 147 / 3 010) are the seam-closing strokes of the quads.

### 4.3 Byte sizes of the two bisectors — CONFIRMED (coverage offsets, `gen-0.coverage.json`)

| offset | bytes | calls `05-04-54` g0 | calls `07-20-25` g0 | name | class |
|---|---|---|---|---|---|
| 245353 | 45 | 65 | 107 | `partition` | `Bisector` |
| 245409 | **214** | 2 717 | 4 205 | `subdivide` | `Bisector` |
| 245638 | 276 | 2 717 | 4 205 | `isSmallEnough` | `Bisector` |
| 245923 | **2 384** | 1 334 | 2 066 | `makeCut` | `Bisector` |
| 248314 | **489** | 1 334 | 2 066 | `split` | `Bisector` |
| 248819 | 135 | 1 269 | 2 061 | `detectStraight` | `Bisector` |
| 249355 | 49 | 0 | 2 | `partition` | `BisectorEx` |
| 249415 | 504 | 0 | 234 | `subdivide` | `BisectorEx` |
| 249928 | 2 938 | 0 | 123 | `makeCut` | `BisectorEx` |
| 252873 | 1 107 | 0 | 122 | `split` | `BisectorEx` |
| 253996 | 135 | 0 | 0 | `detectStraight` | `BisectorEx` |

The counts are RA-2's exactly (`BisectorEx.makeCut` 123 = S + TA, `subdivide` 234 = 2N, `split` 122), and RA-1's
closure `BisectorEx.(anon@251898)` lies inside 249928–252866. `calls.json` carries the right bytes
(`Bisector.makeCut … 'bytes': 2384`); pn §1.2 / §3.2 and ng.md §1, B3 and §5 item 2 quote the same-named
`BisectorEx` sizes for the plain bisector. Correction to carry: the plain bisector's black box is 2 384 B, its
recursion node 214 B, its split 489 B.

### 4.4 No block-level coverage exists for NG — CONFIRMED (negative result)

`gen-0.coverage.json` of `05-04-54`, `07-20-25` and `05-38-59`: 3 394–3 399 functions, `isBlockCoverage` true for
**0**, functions with more than one range **0**. The assessor's §6 item 6 (byte-range hit counts inside `makeCut`,
`isSmallEnough`, `createShape`, `validateOuter`) is therefore **not** answerable from the existing NG captures — it
needs a re-recording with V8 detailed coverage, as the VG lanes had. Recorded so the next reader does not re-find it.

### 4.5 `seed_orbit.py` re-run — CONFIRMED

profile 1113219554 → 2021930855 → 490351217 → 1720203006 on orbit at k = 35 102 / 48 599 / 84 217; coverage
1113232540 → … at 84 910 / 99 934 / 83 595; draw 1113244956 → … at 50 801 / 103 813 / 57 547; cold-load deltas
12 986 / 12 416. 0.16 s. ng.md §1.3 reproduces.

### 4.6 Identity re-derivations on the raw files — CONFIRMED

`05-04-54` gen-0: `PoissonPattern.step/warp/validate` 128 / 6 400 / 6 400; `Bisector.makeCut` = `PointExtender.
project` = 1 334; `Random.float` 4, `Random.new` 4 (the label phantom of the un-re-analysed base capture, as ng.md
§1.4 says), `Random.save/restore/reset` 1/1/1 (random tags). `07-20-25` gen-0 (re-analysed): 126 / 6 300 / 6 300;
`makeCut` = `project` = 2 066; `Random.float` 9, no `Random.new`, no `save/restore`, `reset` 2 (URL tags).
`05-40-05` gen-1: no `PoissonPattern.*` at all (lazy build, CA-4); `makeCut` = `project` = 199. `default.json` has
26 keys (S28); `grammar.json` has 29 symbols with `district`, `ringHood` and `ring` exactly as RA-5 quotes them and
no `proper` symbol.

### 4.7 Pin census — CONFIRMED

`05-04-54` gen-0: `Normal.spawnPin` 37, `Pin.new` 33, `Tree.new` 33, no `Tree.fromPin` / `WellView.fromPin` /
`FountainView.fromPin`. `07-20-25` gen-0: `spawnPin` 65, `Pin.new` 72, `Tree.new` 70, `Tree.fromPin` 1,
`WellView.fromPin` 1, `FountainView.fromPin` 1. `05-40-05` gen-1: `spawnPin` 5, no `Pin.new`. So `Pin.new` counts
every tree as a pin plus the wells and fountains, and `spawnPin` (20 B) yields a pin rarely (0/37, 3/65).

---

## 5. Aggregates, effort, verdict

**Aggregates**, under the assessor's own weighting (B3, B4, C1, C8 double; the rest single):

* **functional 0.85 (unchanged).** One row moves (C7 +0.05) and it is single-weighted.
* **visual 0.85 (unchanged).** No visual cell was under-rated: the default palette is pinned and the five other
  presets and four road surfaces are unrendered, as the assessor says.
* **algorithm identity 0.55 → 0.60.** B3 +0.10 at double weight, C4 +0.10, D1 +0.10, E4 / E5 / C6 +0.05. The
  assessor's own summary already puts the *architecture* at ≈ 0.85 and the *rules* at ≈ 0.35–0.45; the forward test
  moves the largest rule block (the plain cut) into the "measured forward model" class, and three rows are standard
  algorithms. 0.60 is the honest mid-point; 0.65 would need `isSmallEnough` or the gate law, which nothing here gives.
* **seed-exact 0.02 (unchanged).**

**Effort 19 → 16 person-weeks (range 13–21).** Changes to the assessor's §4 table, each with its reason:

| block | was | now | why |
|---|---|---|---|
| geometry kernel | 3.0 | 2.0 | polygon booleans / offsets / hull / OBB / robust intersection are library-grade (Clipper-class offsetting, rotating calipers) and lie outside the clean-room boundary, which bars watabou's code, not third-party OSS; the bespoke parts (`cut(gap)`, `pierce`, `stripe`, a polygon-with-holes type) are a few hundred lines whose contracts osg §2.1.4–2.1.5 spell out |
| bent bisector + hole-aware + tuning | 4.0 | 3.0 | the assessor's "half of it is the measurement harness" already exists: `profiler/paths_stats.py` (274 lines), `bentcut_geometry.py` (243), `bentcut_parent_face.py` (466), `bentcut_forward.py` (this seat) — all stdlib, all consuming the documented `paths/1` format (`profiler/README.md`), so our generator need only emit that format to be checked against the captures with the same code |
| naming engine + own grammar and corpora | 1.0 | 0.75 | the engine is a port of a permissively licensed reference implementation (tracery.js); the writing task remains |
| validation and tuning loop | 1.5 | 1.25 | the size-sweep checker is the same harness |
| everything else | 9.5 | 9.5 | unchanged |
| **total** | **19** | **≈ 16 (13–21)** | |

**Verdict.** Seven cells rise by 0.05–0.10 and two aggregates move (algorithm identity 0.55 → 0.60, effort
19 → 16). The assessment was careful and its numbers were right everywhere they rested on unknown *constants*; it
was low where (a) its own cheapest experiment was already runnable and passes for the row it targets, (b) standard
published algorithms were scored as open methods, and (c) two "unaccounted" residues were recorder artefacts or
exact count identities. The strongest single finding is also the most double-edged: the forward test **passes for
the plain bisector and fails for the hole-aware one**, so B3 goes up and B4 does not — the judge should read the
over-lane's B4 argument with §4.1 in hand.

---

## 6. Caveats and honesty

* **CONFIRMED vs PLAUSIBLE.** CONFIRMED: everything in §4 (executed here), the nine verbatim source quotations in
  §2–§3, the 26-key palette and 29-symbol grammar re-reads. PLAUSIBLE: every confidence number and the effort
  figures (judgments); the `normal() + normal() − 1` reading of the roof spread (arithmetic on measured sd, not a
  draw census); the tracery.js identification (class-name match, no source of tracery.js was opened here — it is
  named from memory of a public project, and the judge may weigh that); the reading of `spawnPin` as a probability
  gate (byte size plus yield, not code).
* **Limits of the forward test.** It conditions on the measured crossing fraction and on the drawn start side, so it
  verifies the *construction* given the *placement*, not the placement law; the plain pool is n = 54 (area 40,
  street 9, square 5), thin for the two small templates; 344 hood-side cuts are untested for the same reason as in
  PF-1; ring faces are analysed on 1°-broken sides, which penalises curved boundaries and may understate the
  hole-aware bisector — but that cuts against my lens, not for it.
* **What this lane did not do.** No re-recording (so §4.4's negative result stands: block coverage of the black boxes
  still needs a capture); no footprint pairing (C7's presence in the live build, C1's lot cuts); no palette-mode
  render (E3/E6 stay as rated); the over-lane's file was a stub when I read it, so where it lands on A2, B1, B4 and
  the effort figure is not reconciled here — the judge holds both.
* **Scripts saved:** `captures/neighbourhood/bentcut_forward.py` (new, stdlib). No existing capture script was edited.
  Scratch outputs (`forward.json`, `forward_tol3.txt`) are in the session scratchpad and are regenerated by the
  command in §4.1.

---

## 7. Resume note (second run, 2026-09-25)

The first run wrote §0–§6 and was cut off (usage limit) before landing. This run re-executed the receipts rather
than trusting them: `python3 captures/neighbourhood/bentcut_forward.py` (3.3 s) reproduces every cell of §4.1
byte-for-byte (ring 43/97, area 34/40, street 7/9, square 2/5, all 86/151; misses 65 with the 20/20/20 split;
eA < 0.1 in 112/151, eB < 0.1 in 91/151); the raw `gen-0.calls.json` of `05-04-54` and `07-20-25` and `gen-1` of
`05-40-05` give §4.3's byte sizes and counts (`Bisector.makeCut` 2 384 B at 1 334 / 2 066 / 199 calls,
`BisectorEx.makeCut` 2 938 B at 0 / 123 / 0), §4.7's pin census (33 = 33 + 0 + 0; 72 = 70 + 1 + 1 with the three
`fromPin` = 1; `spawnPin` 37 / 65 / 5 at 20 B) and §4.6's identities (`warp ÷ step` = 6 400/128 = 6 300/126 =
50.000; `makeCut = PointExtender.project` in all three; `Random.float` 4 / 9 / 7); and every `from` value in §2.1
matches the row table of `ng.md` (lines 159–179). All CONFIRMED; no number in §2–§5 changed.

Since the first run, the sibling lane landed (`docs/confidence/ng-challenge-over.md`, 08:39): it moves the
aggregates to **F 0.80 / V 0.80 / A 0.50 / S 0.02**, effort **23 (18–30)**, and its headline reason for B3 is that
"PF-3's forward-prediction test is still the next step". §4.1 of this file is that test, run: it passes the
assessor's threshold for the plain `Bisector` (B3) and fails for `BisectorEx` (B4). The two lanes therefore
disagree on B3 for a reason the judge can settle from the table in §4.1, and agree on B4 (this lane did not raise
it and says the result argues for the over-lane there). On effort the lanes pull opposite ways (16 vs 23) from the
same §4 table of `ng.md`; the difference is whether the on-disk harness and library-grade geometry count as done
work (this lane) or whether the hole-aware variant, the unrendered modes and the hood outline are under-budgeted
(over-lane) — both can be true, and the judge should net them rather than pick one.
