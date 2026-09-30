# Over-confidence challenge — `docs/confidence/ng.md` (watabou's Neighbourhood generator)

Lane `confidence/ng-challenge-over`. Written 2026-09-25 by the adversarial reviewer (Fable seat), lens
**OVER-CONFIDENCE HUNTER**. Status: **COMPLETE**.

Target under review: `docs/confidence/ng.md` (773 lines, 32 capability rows A1–H1), claimed aggregates
functional 0.85 / visual 0.85 / algorithm_identity 0.55 / seed_exact 0.02 / effort 19 person-weeks (15–24).

The lens looks only for rows rated **higher** than the evidence allows: `[INFERRED]` treated as `[STATED]`; a
named feature mistaken for a described method; visual parity assumed from one screenshot or one draw record;
hidden constants and heuristics; robustness work the creator says took years; combinatorial interaction between
features; and content/data authoring cost (names, tables, presets). Rows rated *too low* are out of scope for
this lens (the sibling lane `confidence/ng-challenge-under` owns them) and are not adjusted here. Every
adjustment in §2 quotes or pinpoints what was checked; rows the evidence supports as rated are listed in §3
("tried to refute and could not"). The default is to refute when the cited evidence does not actually carry the
rating.

**Verdict in one line.** The assessment is the best-evidenced of the four and honest about its unknowns, but it
scores several rows as if a construction that was *written down* had been *tested* (it was not: PF-3's
forward-prediction test is still the next step, and 344 of 512 cuts are untested), rates visual parity for the
hood outline, the ring template and the manors without any screenshot having been viewed, carries `[INFERRED]`
mechanisms in its "Known" lines for lots, greens, trees and shadows, presents three conditional seed-exact numbers
under an unconditional definition, and has one factual error on the interaction surface (NG *does* offer renaming,
post 59046807). Twenty-five rows move down by 0.05–0.40; the aggregates move to **F 0.80 / V 0.80 / A 0.50 /
S 0.02 (unchanged)**, effort to **≈ 23 person-weeks (18–30)**. Eight rows resisted every attempt (§3), and two of
the assessment's PLAUSIBLE items became CONFIRMED under this review (§7).

---

## 0. Reading log (what this review rests on)

Read **in full, every line** (≈ 250 k tokens of reading in total, under the 350 k switch point):

1. `docs/confidence/ng.md` (773 lines) — the target.
2. `research/findings/_critic.md` (479) — first critic: §0, §1, C1–C15, §3, §4, §5, §6.
3. `research/findings/_critic-vg-ng.md` (227) — third seat: V1–V27, §2, S1–S29/P1–P5, §4 items 1–14, §5, §6.
4. `research/findings/profile-neighbourhood.md` (1 878) — body §0–§10, CA-1..CA-5, RA-0..RA-9, Critic-2 addendum,
   BG-1..BG-4, PF-1..PF-3.
5. `captures/neighbourhood/README-vertices.md` (128) and `captures/neighbourhood/widthfit-2026-09-25.txt` (8).

Read by **section outline (`grep -n '^#'`) plus full reads of every NG-bearing section** (the rest of each file
concerns VG, PS, 1PDG, castles, MFCG-only or FTG material and does not bear on the NG rows):

6. `research/findings/vg-ng-devlogs.md` — §0 (caveat), Part B (B1–B4), Part C, Appendix, Critic-2 addendum
   (lines 16–43, 730–1 039). Not read: Part A (VG).
7. `research/findings/watabou-extra-a.md` — §1 (chronology), §2.1–§2.6, §2.13–§2.21, §3, §4, §5, §6 (lines 1–263,
   527–851, 918–1 162). Not read: §2.7–§2.12, §2.22–§2.24 (PS, 1PDG, forest blobs, rune restyling).
8. `research/findings/watabou-extra-b.md` — §1, T1–T7, T19–T20, T23–T31, §3, §4, §5, §6 (lines 1–256, 457–489,
   525–768, 800–997). Not read: T8–T18, T21–T22, T32–T33 (PS labels, regional maps, farmlands, 1PDG).
9. `research/findings/mfcg-posts-b.md` — §2.3–§2.5, §2.13, §2.20, §2.22–§2.23, §5.
10. `research/findings/os-geometry.md` — §0.2, §1.3–§1.4, §2.1.4–§2.1.5, §3.1, §3.8, §5, Critic-2 addendum.
11. `research/findings/visual-spec.md` — §0.1, §3 (all of it), §5, §7.
12. `research/findings/_critic-os.md` — §1.1, §1.10, §4.

**Original sources opened for the spot-checks (§5), in full (body + comment thread):** Patreon
`watabou-extra/{49191011, 58808794, 59046807, 64375271, 70917627, 99067664, 101173551, 141198168, 106975409,
53106327}`, `watabou-city/100431269`; all six itch devlogs under `research/devlogs/neighbourhood/`. **Captures:**
`coverage/gen-*.calls.json` of all four 2026-09-21 NG captures (10 files, queried by script for the pin, RNG,
naming, settings, tracery and palette symbols); the grammar asset `05-04-54/coverage/network/bodies/0016-376f0102.json`
and word list `0016-573e7029.bin` (censused by script); four screenshots viewed — `05-04-54/coverage/gen-0.png`
("Goake's Green", area), `05-40-05/coverage/gen-0.png` ("Old Row", small street), `07-20-25/coverage/gen-1.png`
("Small Ward", ring), `05-38-59/coverage/gen-0.png` ("Silver Square", large square leafy). **No captured JavaScript
bundle was opened**, no PNG was pixel-measured, no new recording was made.

**Re-executed here (CONFIRMED by my own execution):** `captures/neighbourhood/seed_orbit.py` — all nine Enter-successor
transitions ON ORBIT at exactly the k values the assessment quotes (35 102 / 48 599 / 84 217 / 84 910 / 99 934 /
83 595 / 50 801 / 103 813 / 57 547), cold-load deltas 12 986 / 12 416, run time 0.14 s; the `com.watabou.utils.Random.*`
census over the ten `calls.json` files (only `new`, `float`, `save`, `restore`, `reset` ever appear; `Random.new`
is present at 4 in the three 2026-09-21T05-* captures and **absent** from the re-analysed `07-20-25` capture);
`Normal.spawnPin` versus rendered pins; the naming-engine symbol list; the grammar census (29 symbols, 261 rule
strings, 227 plain terminals; `words.txt` 360 lines); the aggregate re-computation of §4 with the assessment's own
weights.

---

## 1. Method

For each of the 32 rows I asked four questions against the evidence the row cites: (a) is each item in the
row's **Known** line actually `[SHOWN]`/`[STATED]` in the cited findings section, or is it the findings author's
`[INFERRED]` reconstruction re-labelled; (b) does the rating rest on a *method* or on a *name* (a routine's byte
size and call count, or a feature the creator announced but never described); (c) how many recorded maps,
screenshots or palettes stand behind a visual claim, and did anyone look at them; (d) does the rating price the
hidden constants, the never-exercised option surface, and the interaction between subsystems. For the numbers
that the assessment itself executed (§1.3) I re-ran the script. For at least ten rows I went to the original post,
devlog, asset or capture rather than to the findings file (§5). The default was to refute where the cited
evidence did not carry the number.

Confidence semantics are the assessment's own (§2 of `ng.md`): `F` functional, `V` visual, `A` algorithm
identity ("our derivation matches THEIR algorithm"), `S` seed-exact ("same seed → same map for that
capability").

---

## 2. Adjustments (from → to), with what was checked

### 2.1 Table

| # | row | metric | from → to | reason (short) |
|---|---|---|---|---|
| 1 | A2 RNG engine / successor seed | A | 0.90 → 0.85 | draw-helper layer (`int/bool/normal/fuzzy`) never executes in NG; the one measured noise law is not the 2017 `normal()` |
| 2 | A2 | S | 0.80 → 0.40 | the successor seed needs k, which the row itself says is unrecoverable; only the stream sequence is exact |
| 3 | A3 pipeline / failure policy | A | 0.85 → 0.70 | "no whole-map retry" is absence in 10 samples; two of the three policy tiers are `[INFERRED]` from count deficits |
| 4 | A3 | S | 0.30 → 0.10 | conditional number; every local retry's draw consumption is unknown |
| 5 | B1 hood outline | F | 0.85 → 0.75 | `createShape` body unread; the file's only construction hypothesis (`getCloud`) was wrong; multimodal silhouettes sampled at ≈ 16 maps |
| 6 | B1 | V | 0.85 → 0.70 | "the first thing a viewer reads" is known only by class; four area maps gave four classes; no screenshot viewed by the assessor |
| 7 | B2 templates as seed geometry | F | 0.85 → 0.80 | `StreetHood.build` 1 754 B + `f` unread; S-curve law from one street |
| 8 | B2 | V | 0.85 → 0.80 | "CA-3 screenshots give each morphology" = one screenshot per template |
| 9 | B3 bent bisection | F | 0.90 → 0.80 | BG-4's construction is asserted, not tested (PF-3's forward prediction is still "next"); 344/512 cuts untested; `isSmallEnough` unknown |
| 10 | B3 | V | 0.90 → 0.85 | block-size distribution measured with vertices at `medium` only |
| 11 | B3 | A | 0.55 → 0.50 | start side, gate, fillet decision, `detectStraight` tolerance, alternative cut all OPEN (PF-3) |
| 12 | B4 hole-aware bisection | F | 0.80 → 0.70 | creator: "still pretty glitchy"; UP abandoned the primitive; repair loop's test, cap and fallback unknown |
| 13 | B4 | V | 0.85 → 0.80 | two ring maps (one seed pair); post images show 3–5 rings, recordings 2–3 |
| 14 | B5 street finishing | A | 0.65 → 0.55 | fillet decision has no predictor; `semiSmooth` body unknown; a, b, free-end origin unknown; `roadTwisting` never true |
| 15 | B6 block content | F | 0.85 → 0.80 | "reproduces the census" is untested; conditioning variables guessed; template-dependent shares from 10 maps |
| 16 | B7 plaza | F | 0.85 → 0.80 | plaza size law, round/rect rule and sub-area formation unknown; 5 maps |
| 17 | B7 | V | 0.85 → 0.80 | one described screenshot per plaza kind |
| 18 | B8 ring geometry | V | 0.85 → 0.75 | two maps; H-R's five tests untested; recorded R under-samples the template |
| 19 | C1 lots / filter | F | 0.85 → 0.80 | filter semantics unknown; creator's later verdict on twisted lots: artefacts "too obvious" |
| 20 | C1 | A | 0.55 → 0.45 | all three Known items are pn `[INFERRED]`; whether lot cuts bend is unmeasured |
| 21 | C3 manors | F | 0.80 → 0.70 | `getRect/shrink/press` unread — "names and counts only" |
| 22 | C3 | V | 0.85 → 0.80 | ≈ 60 manors in screenshots nobody in the lane viewed; plot→hall fitting unknown |
| 23 | C4 greens / Poisson | A | 0.60 → 0.50 | the Known green construction is pn §3.8 `[INFERRED]` from routine names; `warp` OPEN |
| 24 | C5 trees | A | 0.50 → 0.40 | "4-way bulging" is pn §3.9's "most economical reading"; mod-4 is 99 %, not a law |
| 25 | C6 pins | F | 0.90 → 0.85 | > 90 % of `spawnPin` calls produce nothing by an unknown rule |
| 26 | C7 uneven streetwall | F | 0.75 → 0.60 | method `[NAMED-ONLY]` and doubted by its author; presence in this build unverified; jitter unmeasured |
| 27 | C7 | V | 0.80 → 0.70 | ± 10–25 % from two 2021 post images of an earlier build |
| 28 | C8 size / character knobs | F | 0.85 → 0.70 | knob → termination/width mapping unknown; 2 samples per non-medium size; the assessment's own §6 says the size sweep is what would raise C8 |
| 29 | D1 naming | A | 0.80 → 0.65 | the grammar text is captured, the interpreter is not (deck selector, weight semantics); the surname generator is syllable-based, not the "order-n Markov" of the row |
| 30 | D2 title layout | A | 0.70 → 0.55 | corner rule is pn §3.12's "obvious reading" on 14 observations |
| 31 | E2 canvas / layers | S | 0.60 → 0.40 | tree depth-sort key unknown; conditional on the model |
| 32 | E3 roads rendering | F | 0.85 → 0.75 | 6 of 7 road modes never executed |
| 33 | E3 | A | 0.55 → 0.45 | the executed path is a stroked polyline; every non-trivial road algorithm is unknown |
| 34 | E5 shadows | V | 0.90 → 0.85 | the layer-alpha model does not reproduce the measured composite (vs §7 item 7) |
| 35 | E5 | A | 0.80 → 0.70 | blend mode, height source, silhouette test, 18 % of strokes unaccounted |
| 36 | E6 unrecorded styles | F | 0.80 → 0.70 | no render of any of them; glow construction unknown |
| 37 | E6 | V | 0.70 → 0.60 | night look known from 2021–22 post images of an earlier build whose presets were since changed |
| 38 | F1 toggles / hotkeys | F | 0.95 → 0.90 | "complete interaction surface" is wrong: renaming and name reroll exist (59046807); persistence and context menu absent |
| 39 | F1 | S | 0.30 → 0.05 | Enter's successor needs k (see #2) |
| 40 | G1 export | F | 0.85 → 0.80 | no export executed; `assemble` 7 272 B unread; schema inferred |
| 41 | G1 | V | 0.85 → 0.80 | SVG fidelity unknown (sibling libraries lacked text, gradients or hatching) |
| 42 | G1 | S | 0.30 → 0.05 | conditional on the whole table |
| 43 | §4 effort | pw | 19 (15–24) → 23 (18–30) | four unbudgeted items (§4 below) |
| 44 | §3 aggregate | F / V / A | 0.85 / 0.85 / 0.55 → 0.80 / 0.80 / 0.50 | recomputed with the assessment's own weights (§4); S 0.02 stands |

### 2.2 Notes per adjustment (what was checked)

**#1–#2, A2.** The engine claim is CONFIRMED (I re-ran `seed_orbit.py`: 9/9 on orbit at the quoted k). Two
things in the row go beyond that. (i) §1.3 consequence (a) says "`float / int / bool / normal / fuzzy`
semantics (cos §1.1) apply". My census of all ten `calls.json` files finds only `Random.new`, `float`, `save`,
`restore`, `reset` — no `int`, `bool`, `normal` or `fuzzy` symbol executes in any NG sample, so the helper layer
is unobserved. The one noise law the corpus has measured — roof `k = 1 + varRoof·N` with sd(N) = 0.2357 (pn §3.6)
— is a 6-uniform composite; the 2017 `normal()` is the mean of **three** floats with sd 0.1667 (osg §3.1, cos
§1.1 row 6). A difference of two 2017 normals would give 0.2357, but that is my inference, not evidence. The
engine is theirs; the helper semantics are PLAUSIBLE. A 0.90 → 0.85. (ii) Seed-exact 0.80 "for the stream
alone": the row's capability is "engine, one stream, successor seed, save/restore". The successor seed is the
state after k draws, and §1.3 (e) itself says the count and order of those ≈ 10⁵ inlined draws "cannot be
recovered without the barred bundle". So of the row's four items only the stream sequence is reproducible; the
successor seed is not, and the save/restore checkpoint's stream position is not. S 0.80 → 0.40.

**#3–#4, A3.** §1.1 states in bold "**there is no whole-map retry loop**". The evidence (pn §7, RA-3) is that
`Hood.create` etc. ran once per generation in 10 samples, i.e. no retry *fired*. The family precedent cuts the
other way: the MFCG Styles addendum ruling says a 'bad poly' restarts the whole city, so a top-level retry that
never triggers in ten medium-class maps is exactly what a guard looks like. The "three-tier policy" the row calls
Known: tier 1 "drop slivers silently" is pn §3.2 `[INFERRED]` from a 4–16 deficit in `subdivide`; tier 3 "lots
without frontage are discarded" is pn §3.4 `[INFERRED]` (`validateOuter` "is the 'does this lot still touch a
street?' test" is the reader's guess for a 189 B routine); only tier 2 (`BisectorEx` console lines) is `[SHOWN]`,
and RA-3 says the recording "cannot show whether the retry loop has a cap ... or what the fallback is". Algorithm
identity of a *policy* whose tests are unknown is not 0.85. Seed 0.30 is a conditional number ("with no map-level
retry the divergence risk is only how many draws each local retry consumes"); RA-3 reads "Trying again" as a
restart "with fresh random parameters", so the draw cost of each retry is unknown.

**#5–#6, B1.** pn §3.1's "union of 17–30 circles" was the file's only construction hypothesis and RA-9 item 1
refuted it; what replaced it is a routine name (`createShape`, 1 170 / 1 434 B) with two sampled children
(`PolyBounds.obb`, `PolyTransform.asScale`). The silhouette evidence is pn §3.1 (four *area* maps: "D-shape —
one straight chord", "rounded lozenge", "rounded polygon with concave notches", "crescent"), CA-3 (spindle,
disc), RA-4 (lumpy lozenge, oval) — a multimodal generator sampled at ≈ 16 maps, with the straight chord
"Unknown". The assessment's §0 says the NG screenshots were not viewed ("their pixel readings are taken from pn
§3, CA-3, RA-4 and vs §3 as written"). I viewed four: "Goake's Green" has one long straight NE edge that no blob
generator produces without an explicit rule; "Old Row" is a spindle; "Small Ward" an oval; "Silver Square" a
disc. The row's own justification for V 0.85 contradicts itself: "the silhouette is the first thing a viewer
reads and only the class is known". The "any polygon" property the row leans on for stage 2 is a hedged comment
reply — "I don't know. Maybe. I can generate a 'district' of any shape this way, so..." (49191011, verified at
source) — evidence that the bisector *accepts* an arbitrary polygon, not that the outline generator does.

**#7–#8, B2.** `StreetHood.build` (1 754 B) and its ×4 helper `f` (190 B) are unread (CA-1). The "S-curve with
alternating turns at ≈ 86 mu spacing" is measured on **one** street (BG-1: "street 7172's template main
street"); "Old Row" (CA-3) shows the same class in one more map. "CA-3 screenshots give each morphology" is one
screenshot per template (Silver Square, Old Row). The identities pin the *number* of sub-areas, not how the main
street's course or the plaza's flanks are generated.

**#9–#11, B3.** The row's F 0.90 rests on "a construction that reproduces them is written down (BG-4 steps
1–9)". BG-4 closes with "This reproduces every distribution in BG-1" — an assertion by the addendum's author;
PF-3's closing section is titled "Next test (existing captures, no recording)" and describes the forward
prediction that would show it, and the assessment's own §6 item 1 lists that test as *not yet done* ("moves
B3's algorithm identity to ≈ 0.7 or sends the design to a corner-first reading"). PF-1 "Limits": "344 of 512
cuts have an open parent: every top-level cut and every hood-side cut. Only 162 cuts are tested" — the untested
two-thirds are the streets that shape the map most. The vertex captures are all `medium` (RV table), so the
leaf-size distribution that `isSmallEnough` produces is unmeasured at any other size, and the assessment's own §5
item 1 says that law "sets block count, lot count, density and therefore every statistic". A "statistically
similar structure" at 0.90 is not supported outside one size, and not inside it without the termination law.
Visual: the T-junction hierarchy, right angles and fillets are pinned (BG-1/BG-2 — I accept those), but the block
size distribution is not; 0.85. Algorithm identity: PF-3 "Still OPEN" lists the start side (91/162 — chance), the
gate's bounds, why `BisectorEx` is looser, arc-vs-sharp, and the 344 untested cuts; cvn V5 shows the one recorded
internal step (`project`) was already misread once. 0.50.

**#12–#13, B4.** Verified at source: "The new version of the algorithm is still pretty glitchy, but it works"
(70917627); "Initially I tried the 'twisted bisection' method, which is used in MFCG. This method has some issues
and here they were too obvious" (141198168). RA-3: the rejection test that fires "Alternative cut", the
alternative's generator, the cap and the fallback are unrecorded. PF-3 item 3: the ring bisector's corner spread
is 4× the plain one's, cause unknown. Functional parity with a repair loop whose three parts are unknown, in a
primitive its author never stabilised, is not 0.80. Visual: the ring recordings are two maps (R1/R2), and the
vertex capture re-used the same seeds (README-vertices: its draw log "is identical ... to `2026-09-21T07-20-25`"),
so no third ring map exists; xb T2's post images show "3–5 concentric rings", the recordings 2–3.

**#14, B5.** PF-2 (e): arc vs sharp — "No clean predictor"; BG-1: the 7171 width residuals say "part of the law
is still missing"; `semiSmooth` (795 B) is known only by its sampled child `getArc = Circle.new`; `roadTwisting`
never recorded true. One nit inside the row's Known line: pn §3.2's reading of `extend` ("pushes each endpoint
outward until it hits the next street ... run through multiple blocks") is refuted by PF-1 ("every one of the
512 non-template streets has exactly one face component on each side"); the row's own wording ("pushed out at
both ends to the next street") survives, the source it cites does not. Mechanism SHOWN, three of its five
decisions unknown: 0.55.

**#15, B6.** "A weighted choice conditioned on area and spacing reproduces the census" — no fit was made
anywhere in the corpus; pn §3.3's conditioning is "probably conditioned on block area" `[INFERRED]`; the `Empty`
share is template-dependent (RA-1: 0–3 % area, 6–8 % square, 8–9 % ring), `Green` appears once (a ring centre),
and the Manor spacing rule is stated for landmarks, not for the content class. Ten maps, four classes, unknown
conditioning: 0.80.

**#16–#17, B7.** Five square maps exist (base profile gen-0 round; Q1/Q2 rectangular; vertex 7171/7172).
`buildSquare` (2 425 B) and `buildRound` (1 669 B) are unread; the row's Must-invent list (size law, round/rect
rule, sub-area formation) is the whole template body. Visual: CA-3's one description of "Silver Square" plus vs
§3.3 item 7; I viewed Silver Square — the rotated-square plaza with the grid aligned to it is as described, but
that is one map.

**#18, B8.** RA-7 H-R is a hypothesis with five untested predictions; the two recorded maps have R = 2 and 3
while the creator's post images show 3–5 rings (xb T2, `70917627` images); the "single large building" centre is
seen only in the 2022 post image `419786/images/01.png` (vnd B2.3) — never recorded. "RA-4 gives the look
precisely" is true of two maps. (The row's "never seen" for that branch is a small factual slip the other way —
§6.)

**#19–#20, C1.** The Known line reads "the same bisector with straightness snapping produces lots; setback =
lot ∩ (block inset by the corridor); frontage test discards ≈ 42 %". In the cited source all three are
`[INFERRED]`: pn §3.2 infers "straightness snapping" from a 135 B routine's name; pn §3.4 infers the setback
formula and the frontage test from counts. BG-4 step list opens "and by the creator's statement every lot cut
(untested here)"; RV headline 4 says pairing adjacent footprints "is not done here". Verified at source: "occasionally
they spawn very weird ones which need to be filtered out" (58808794) with no filter described, and the creator's
later judgment on twisted-bisection lots along frontages (141198168). Construction SHOWN by counts, every filter
INFERRED: F 0.80, A 0.45.

**#21–#22, C3.** The row's own algorithm line says "names and counts only" (`getRect` 410 B, `shrink` 743 B,
`press` 388 B). A functional 0.80 for a compound whose plot→hall fitting rule — the very thing the owner's stage-3
hook needs — is unknown is over-stated. Visual 0.85 rests on CA-3/RA-4 prose about ≈ 60 manors across the
screenshots; the assessor viewed none. I viewed four maps: walled plots with one hall and a grove, domes or
pyramids on some — the class is right, the fitting is not evidenced.

**#23, C4.** The Known line "green = Chaikin-smoothed equal-distance inset of the block's inner boundary with
self-intersection repair" is pn §3.8 `[INFERRED] Green shape` — a chain of routine names (`Offsetter.runEq`,
`filter`, `Chaikin.render`) read as a method. cvn V15: `warp` OPEN. RA-1: an `Offsetter.(anon)` branch taken 0–2
times per map, unexplained. Which blocks get greens: unknown. The Poisson identities (k = 50, lazy, fixed tile)
are real and keep the row above 0.45.

**#24, C5.** pn §3.9: "The most economical reading is a recursive corner-bulging subdivision" `[INFERRED]`;
RA-5: 8 of 958 crowns break the mod-4 rule, so it is a tendency; the light cap, lobe layout and radius law are
"Unknown". Two ratios constrain a large space of constructions; 0.40.

**#25, C6.** My `calls.json` census: `Normal.spawnPin` 5–65 per map against `WellView.new` 0–2, `FountainView.new`
0–1, `Tree.fromPin` 0–1, `Empty.addPin` 0–4. More than 90 % of pin spawns produce nothing, by a rule pn §9 Q9
calls unknown; placement within a block is unrecorded. The rendered objects themselves are fully pinned (RA-5),
which keeps V at 0.90.

**#26–#27, C7.** Verified at source: "I have my doubts about the method I use for it" (58808794). The row says
"if present in this build" — presence in build 11441280 is unverified; `indentFronts` runs once per block, not per
lot (pn §3.4), so the mechanism is not even localised; the jitter is measurable from the vertex captures and was
not measured (RV "how to measure further"). xa §2.4's "± 10–25 % of a building depth" comes from two 2021 post
images (`58808794/images/03.png`, `59046807/images/03.png`) of a build two versions older than the recorded one.
I looked for it in "Goake's Green" and "Old Row": fronts along the main streets do step in and out, but at
screenshot resolution I cannot separate that from the perimeter-block filter's varying depths. F 0.60, V 0.70.

**#28, C8.** Non-medium sizes have two samples each (S1/S2, Q1/Q2), and CA-3 notes "`large` seed 5152 is no bigger
than `medium`"; RA-4: hood size and block size "cannot be separated, because the view rescales every map".
The knob list is one comment (70917627, verified) with no mapping; the assessment's own §6 item 2 calls the size
sweep "the single measurement that most raises C8 and B3", i.e. the row is currently unbounded. 0.70.

**#29, D1.** What is captured verbatim is the grammar *text* and the word list. The interpreter is not: my
symbol listing shows `RuleSet.process` 333, `Grammar.selectRule` 5, `DeckRuleSelector.select` 4, `Grammar.
addExternal` 1 — a deck-based rule selector and a weight processor whose semantics (`0.3?-` as a probability
gate or a relative weight; deck = without-replacement?) are unrecorded. The surname path runs `Syllables.splitWord`
6 / `pinch` 7 / `Syllables.(anon)` 171 alongside `Markov.split` 348 and `Markov.generate` 14 for at most two
names — a **syllable**-chain with a rejection loop, not the "order-n Markov surname generator" the row prices
(pn §3.11 lists `Syllables`; the row drops it). Content census: 29 symbols, 261 rule strings, 227 plain
terminals, 360 corpus words — small, but the charm of the outputs ("Goake's Green", "Meat Walk") is a writing
target, not a schema. A 0.65; the 1.0 pw stands only if the syllable model is in scope.

**#30, D2.** pn §3.12: "picks the corner with the least overlap" is `[INFERRED]`; 14 corner observations;
`layoutTitle` 737 B unread; `getCloud`, the routine the corner choice reads, was misidentified for four days
(RA-9 item 1). 0.55.

**#31, E2.** The row's own Must-invent is the tree depth-sort key (pn §9 Q14). RA-5: one tree painted before
the buildings canvas in R1, none in R2; base gen-1 a tree and a fountain. Wherever a tree overlaps a building the
paint order depends on that key, so "same map" fails for that capability even with the model given. And the
number is conditional on the model, which the definition ("same seed → same map") does not allow. 0.40.

**#32–#33, E3.** pn §1.3: `Roads.setMode → drawFull → drawSolid`, "the other modes never taken"; pn §4.1:
`roadSurface ∈ {Tiles, Cobbles}`, `roadOutlined`, `roadTwisting` never exercised; dashed "Lines" mode never
recorded. The `roadWidth` ratio is `[STATED]` (70917627: drawn width relative to "distance between buildings on
opposite side") and never checked against the corridor. Six of seven modes are prose plus post images; the one
executed path is a stroked polyline, so the algorithm-identity claim of 0.55 was carried by the trivial branch.

**#34–#35, E5.** pn §3.7 tags the layer-alpha model `[INFERRED]` ("The shadow layer is a single `Sprite` whose
`alpha = shadowAlpha`"); vs §7 item 7 measures the composite over the ground as `#7a8499 → #a19e9a`, "which is
not a clean multiply or a single alpha" — the model does not reproduce the pixels. pn §3.7 "Unknown": height
source, the 1-segment strokes (≈ 18 %), the silhouette-edge test. The quad-per-silhouette-edge and translated-crown
facts are solid and keep V at 0.85.

**#36–#37, E6.** No draw record of any non-default preset or of `details=false` exists (pn §4.1, §8). The night
look comes from 2021–22 post images (xa §3: "yellow glow bleeding from every street"), and 1.2.1 later changed
the presets ("preset colour schemes have been updated to add more contrast", 99067664, verified) and removed tree
gradients, so even the post images are of a different build.

**#38–#39, F1.** The row states "[STATED] renaming is not offered in NG (only UP got it, xb T25n)". Post
59046807 (NG 1.0.1, verified at source): "The name of a neighbourhood can be edited and rerolled." xb T25n is
about Urban Places and says nothing about NG. The same post adds "All the options (including the color theme) are
now persistent" and "All the features and options are now available via the context menu" — neither is in the
row's surface. All ten toggles are never-executed symbols (pn §1.5), and mouse-wheel rotation's interaction with
`shadowDir`, hatch direction and the title corner is unrecorded. "Complete interaction surface" is not 0.95.
Seed 0.30: Enter's successor is on the orbit *at k*, and k is unknown (#2).

**#40–#42, G1.** No export ran in any recording; `assemble` (7 272 B) is the largest unexecuted symbol and its
role is a guess (pn §9 Q17); the JSON schema is `[INFERRED]` from City Viewer renders (xa §2.17). SVG: the shared
library "supposedly" needs no per-feature updates (xa §2.16, verified in 55050649 as quoted) but at PS 1.2.0 had
"no text and no gradients", and MFCG's SVG "only feature not supported ... is hatching" (mpb §2.22) — whether
NG's SVG carries its title, dome gradients and hatch triangles is unknown, so visual parity of the export is not
0.85. Seed 0.30 is conditional on the whole table.

---

## 3. Rows tried to refute and could not

| row | metric(s) kept | what was checked |
|---|---|---|
| A1 tags / URL state | F 0.95, V 0.90, A 0.75, S 0.05 | 64375271 and 70917627 (verified) list every tag: templates area/street/square/ring, sizes small/medium/large, `leafy`, `secular` — four tag groups; `Settings.oneOf` = 4 with random tags (my census) matches four slots exactly; `Settings.resolve` 1 with URL tags (CA-1). `processTags` 2 511 B is consistent with nine tags plus shift-click descriptions (xa §2.13). Could not find a tag the vocabulary misses. |
| A2 | F 0.95 | a seeded MINSTD with save/restore is trivial; the orbit test reproduces (0.14 s). |
| B3 | S 0.01; the measured distributions themselves | BG-1/PF-2 numbers were re-run byte-identical by the addendum lane (`paths_stats.py --md` vs README); I did not re-run them but checked the README tables against the assessment's quotations (all consistent). |
| B5 | F 0.90, V 0.90 | my first candidate — `widthfit-2026-09-25.txt` shows square 7171/7172 linear fits at rms 0.800 / 0.752 against the assessment's "rms 0.005–0.025 across all four templates" — dissolved: BG-1 refits with the template-laid plaza streets excluded (rms 0.010 / 0.009), and the assessment quotes BG-1. Fillets: 201 arcs measured. |
| C2 buildings / plans / roof kinds | F 0.80, V 0.85, A 0.40 | every roof kind is in the draw records or CA-1; the row already prices the missing selection rules at A 0.40 and says so in its F justification. |
| C4, C5, C6 | F/V | greens (flat fills, k = 50 field), tree ops (6-op canvases, colour and shading laws to < 1 %), wells/fountains (RA-5 count-for-count) are pinned by draw records. |
| D1, D2 | F 0.90/0.95, V 0.90/0.95 | one line of type; a grammar engine of this size is small work (my census: 261 rule strings). |
| E1 palette schema | F 0.95, V 0.90, A 0.85, S 0.05 | 26-key schema verbatim (cvn S28), six value sets, `Type.toFloat` 15 768–20 194 re-parses, multi-colour `[STATED]` (T19, verified in 70917627: "a random colour from the list"). `loadPalette/getPalette` never ran, but the schema is the surface. |
| E2 | F 0.95, V 0.95, A 0.85 | layer order and stroke discipline hold in all 10 draw logs (pn §4.3, RA-5). |
| E4 roofs | all four | the most exactly characterised row: I re-checked the roof-noise arithmetic (0.069 / 0.3 = 0.23 = √(6/12)/3) and cvn P4 verified `varRoof 0.3` in `default.json`; `shortStroke ÷ pierce` 2.0006–2.035 (cvn S29). |
| H1 performance | F 0.90 | costs pinned (pn §5, RA-6); A 0.60 is not meaningful for a cost envelope and is left as the row's own convention. |
| G2 integrations | F 0.70, V 0.75, A 0.40 | not a clean-room capability (the targets are the reference's own products); the numbers are inert. |
| seed-exact aggregate | 0.02 | dominated by the ≈ 0.01 rows; my A2/A3/E2/F1/G1 changes do not move a judgment-weighted 0.02. |
| §1.3 orbit test | CONFIRMED | re-executed, identical. |
| §1.3 (c) `Random.new = 4` is a label phantom | now CONFIRMED (was PLAUSIBLE) | my census: the row is absent from the re-analysed `07-20-25` capture and present at 4 in the three non-re-analysed ones. |

---

## 4. Aggregates and effort

**Aggregates**, recomputed with the assessment's own weighting (B3, B4, C1, C8 double; 36 weight units):

| metric | assessment | recomputed from the assessment's rows | recomputed after §2 | carried |
|---|---|---|---|---|
| functional | 0.85 | 0.844 | 0.799 | **0.80** |
| visual | 0.85 | 0.840 | 0.815 | **0.80** |
| algorithm identity | 0.55 | 0.544 | 0.508 | **0.50** |
| seed-exact | 0.02 (judgment) | — | — | **0.02** |

**Effort 19 (15–24) → 23 (18–30) person-weeks.** The assessment's blocks are reasonable for what they name; four
things they do not name are real work:

1. **The hole-aware bisector's repair loop** (+1.5): the reference's `validate → alternative → retry → fallback`
   is unrecorded in every part (RA-3), the primitive was never stabilised by its author (70917627, 141198168), and
   the ring bisector's looser statistics (PF-3 item 3) have no known cause; a clean-room team will iterate.
2. **A size sweep and a metric before tuning** (+1.0): C8's calibration data does not exist yet (§6 item 2 of the
   assessment; only `medium` has vertices, two samples per other size); the tuning loop budgeted at 1.5 pw assumes
   targets it does not have.
3. **Six unrecorded road/style modes without a reference render** (+1.0): Cobbles, Tiles, outlined, twisting,
   dashed, night glow, `details=false` — each is a design loop against post images of an older build (§2 #32–#37).
4. **The SVG writer with text, gradients and ≈ 20 000 hatch fills per map** (+0.5): the reference's own library
   needed feature-by-feature additions (xa §2.16, mpb §2.22); "PNG/SVG writers" share 2.5 pw with the whole
   renderer in the assessment's table.

For scale: the creator went from the idea (49191011, 2021-03-25) through a version "too slow and too unstable",
a from-scratch rewrite (58808794, 2021-11-17), 1.1.0 (2022-03-28) and 1.2.0 (2022-08-24) in seventeen months
part-time, *on top of* a mature shared library (geometry kernel, Tracery, Markov, palette, export), and still
called the hole-aware variant glitchy. Nineteen person-weeks for parity plus the kernel is the optimistic edge, not
the centre.

---

## 5. Spot-checks against original sources (rows for which I went past the findings)

| row | source opened | what it settled |
|---|---|---|
| A1 | 64375271, 70917627 (bodies) | full tag vocabulary; four groups = four `oneOf` slots |
| A2 | `seed_orbit.py` re-run; 10 × `calls.json` | 9/9 orbit hits at identical k; no `int/bool/normal/fuzzy` symbol in NG |
| A3 | 70917627, 58808794 | "still pretty glitchy"; "weird ones which need to be filtered out" — no policy described |
| B1 | 49191011 (comments); 4 screenshots | "I don't know. Maybe. I can generate a 'district' of any shape" is hedged; four silhouette classes seen |
| B3 | 49191011 (body) | "just an idea, not an algorithm ... can be implemented in different ways for different results" |
| B4 | 70917627, 141198168 | glitchy; abandoned in UP |
| B7/B8 | 70917627; `07-20-25/coverage/gen-1.png`, `05-38-59/coverage/gen-0.png` | ring rule; plaza and 3-ring maps as described |
| C1/C7 | 58808794 | filter unnamed; streetwall method withheld and doubted |
| C6 | 10 × `calls.json`; devlog 419965 | `spawnPin` vs rendered pins; "pins (fountains, wells and large trees)" |
| C8 | 70917627 comment; 99067664 | the knob list; "internal settings adjusted to make streets and buildings look more like ... the city generator" (a re-tune between the post images and the recorded build) |
| D1 | grammar + word list assets; `calls.json` symbol list | 29 symbols / 261 rules / 227 terminals / 360 words; deck selector; syllable Markov |
| E4 | 101173551 | "fake" gable roofs preferred, as quoted |
| E6 | 64375271, 99067664 | night ground lighting; presets changed in 1.2.1 |
| F1 | 59046807 | **renaming and name reroll exist**; persistence; context menu |
| G1 | 59046807; 55050649 as quoted in xa §2.16 | export formats; SVG library limits |
| G2 | 100431269 (comments) | rejection quote verified |
| §1.4 | 106975409 | NG demoted from Arcana; UP's charter |

All six NG devlogs were read in full; they are teasers (vnd §0 is right) and add nothing beyond the Patreon bodies
except the hotkey list (419965).

---

## 6. Factual corrections that are not confidence adjustments (for the assessment's owner)

1. **F1:** "renaming is not offered in NG" is wrong (59046807: "The name of a neighbourhood can be edited and
   rerolled"); xb T25n concerns Urban Places. Folded into #38.
2. **§1.1 / A3:** "there is no whole-map retry loop" should read "no whole-map retry fired in 10 samples".
3. **§1.3 (a):** the helper semantics `int/bool/normal/fuzzy` are not evidenced for NG; the measured roof noise
   (sd 0.2357·var) is not the 2017 `normal()` (sd 0.1667). Folded into #1.
4. **B8:** the "single large building" centre branch is *seen* in `419786/images/01.png` (vnd B2.3 `[SHOWN]`);
   it is unrecorded, not unseen.
5. **D1:** the surname generator is syllable-based (`com.watabou.nlp.Syllables.splitWord/pinch` run every time
   `#proper#` fires), not an order-n character Markov; pn §3.11 has the symbols, the row dropped them.
6. **B5 (source, not row):** pn §3.2's "streets run through multiple blocks" reading of `extend` is refuted by
   PF-1's one-face-component-per-side result; the row's wording is compatible with either.
7. **§1.3 (c):** the `Random.new = 4` phantom can be marked CONFIRMED (absent from the re-analysed capture).
8. **§0 reading record:** the assessment's numbers for the hood outline, ring template, manors and streetwall are
   visual ratings made without viewing a screenshot; the record should say so next to those rows, not only in §0.

---

## 7. CONFIRMED vs PLAUSIBLE, and what this lane executed

* **Executed by this lane (CONFIRMED):** `captures/neighbourhood/seed_orbit.py` (identical output to §1.3);
  the `Random.*` / pin / naming / settings / palette symbol census over all ten `calls.json` files; the grammar
  and word-list census; the aggregate recomputation in §4; viewing of four screenshots (one per template).
* **CONFIRMED at the source by reading:** every `[STATED]` quotation I re-checked in the eleven Patreon bodies
  and six devlogs was found verbatim (the critic seats' 66/66 and 24/24 hold for these too); the one wrong
  `[STATED]` claim is F1's renaming line, which cites no post.
* **PLAUSIBLE (reasoning only):** that a difference of two 2017 `normal()` draws would explain the roof-noise sd
  (§2 #1); that the uneven-streetwall jitter I saw in two screenshots is the feature rather than the
  perimeter-block filter (§2 #26); every new confidence number, which is a judgment over the evidence cited
  in its row and not a measurement; the effort deltas in §4.
* **Deliberately not done:** no forward-prediction test was run (it is the assessment's own §6 item 1 and belongs
  to a measurement lane, not a review); no footprint pairing; no new recording; the sibling `under` lane's file
  was not consulted, and nothing here is adjusted upward.
