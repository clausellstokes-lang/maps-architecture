# Over-confidence challenge — `docs/confidence/mfcg.md` (watabou's Medieval Fantasy City Generator)

Lane `confidence/mfcg-challenge-over`. Written 2026-09-25 by the adversarial reviewer (Fable seat), lens
**OVER-CONFIDENCE HUNTER**. Status: **COMPLETE**.

Target under review: `docs/confidence/mfcg.md` (749 lines, 40 capability rows), claimed aggregates
functional 0.80 / visual 0.85 / algorithm_identity 0.50 / seed_exact 0.02 / effort 42 person-weeks (32–55).

The lens looks only for rows rated **higher** than the evidence allows: `[INFERRED]` treated as `[STATED]`; a
named feature mistaken for a described method; visual parity assumed from one screenshot or one draw record;
hidden constants and heuristics; robustness work the creator says took years; combinatorial interaction between
features; and content/data authoring cost (names, tables, presets). Rows rated *too low* are out of scope for
this lens (the sibling lane `confidence/mfcg-challenge-under` owns them) and are not adjusted here. Every
adjustment in §2 quotes or pinpoints what was checked; rows the evidence supports as rated are listed in §3
("tried to refute and could not"). The default was to refute where the cited evidence does not carry the
number.

**Verdict in one line.** The assessment's evidence base is as strong as it says — the counts, laws, colours and
seed chain all check out at source — but it prices the *skeleton* of five heavy stages as if it were the
*algorithm*, scores the wall and the lot texture at the top of the visual scale while admitting their shape rules
are unmeasured, carries two 2017 claims (`min(1, 40/n)` wall smoothing, the 2017 gate loop) that the profile's own
addendum rules "not supported", treats one `[NAMED-ONLY]` stage (sprawl) as 0.75 functional, and budgets ten
weeks for the bisection/district/outskirts/sprawl stack that the creator has been stabilising since 2021 and
that still restarts 3 of 16 cities in the 2026 build. Nineteen numbers on fourteen rows move down by 0.05–0.15,
four seed-exact cells that describe the reference reproducing itself (or a render pass "given the model") are
cut to the unconditional value, and the aggregates move to **functional 0.75 / visual 0.78 / algorithm identity
0.50 (stands) / seed-exact 0.02 (stands)**, effort to **≈ 55 person-weeks (42–72)**.

---

## 0. Reading log (what this review rests on)

Read **in full, every line**:

1. `docs/confidence/mfcg.md` (749 lines) — the target.
2. `research/findings/_critic.md` (478) — first critic: coverage, C1–C15, §3, §4 spot-checks, §6 gaps.
3. `research/findings/_critic-os.md` (434) — OS seat: 141-row constants table, C1–C18, S1–S20, §4 draw order.

Read by **section outline (`grep -n '^#'` of all 13 files) plus full reads of the cited sections**:

4. `research/findings/profile-mfcg.md` (2 255): §0–§4.9 (20–319), §6–§9 intro (381–530), §9.2–§15 and both
   critic addenda (598–930), EG-3/EG-4/EG-5 (1128–1352), EG-7 (1394–1437), EG2-2/EG2-3/EG2-4 (1522–1673),
   ST-0…ST-9 (1763–2158) — ≈ 1 720 of 2 255 lines. Not read: §5 class inventory, §9.1 grammar verbatim, EG-1/EG-2
   counting detail, EG-6/EG-8, EG2-1/EG2-5…7, ST-10…12.
5. `research/findings/mfcg-posts-a.md`: T3, T6–T8, T12–T13, T20–T21.
6. `research/findings/mfcg-posts-b.md`: §2.2–2.9, §2.13–2.19, §6 open questions.
7. `research/findings/mfcg-devlogs-a.md`: §2.12–2.15, §2.17, External-sources addendum E1–E2.
8. `research/findings/mfcg-devlogs-b.md`: §2.2, §2.21–2.24, Critic addendum.
9. `research/findings/os-model.md`: §14 (2017 vs live). `os-wards-render.md`, `os-geometry.md`: not opened
   directly — every 2017 constant the assessment cites was checked through `_critic-os.md` §1–§4 (read in full).
10. `research/findings/watabou-extra-a.md`: §2.1 (the bent-cut method post). `watabou-extra-b.md`: T1, T3–T6.
11. `research/findings/visual-spec.md`: §0.2, §1.4–1.8.

**Original sources opened (§4):** `research/patreon/watabou-city/{87882877, 40345972, 61026228, 114184619,
109852547, 37407181, 79147510, 98918904, 100431269, 41711473, 47063541}/post.md`,
`research/patreon/watabou-extra/{49191011, 101173551}/post.md`,
`research/devlogs/medieval-fantasy-city-generator/{85275, 67134, 7063, 112574, 3091}*/post.md` (grep for the
quoted phrases, matches read in context); `captures/mfcg/2026-09-21T05-03-24/coverage/gen-0.calls.json` and
`captures/mfcg/2026-09-21T11-25-32/coverage/gen-0.calls.json` (every `utils.Random.*` row listed by a 6-line
Python read of the JSON); `captures/mfcg/2026-09-25T10-38-58/README.md` (bad-poly lines);
`captures/README-labelfix-2026-09-25.md` (MFCG rows). **No captured JavaScript bundle was opened**, no PNG was
re-measured, no new recording was made, nothing was executed beyond the JSON listing.

Reading volume ≈ 300 k tokens, under the 350 k switch point; the switch to outline-plus-sections was applied
from file 4 onward as the READING BUDGET rule prescribes, and every unread range is named above.

---

## 1. Method

For each of the 40 rows I asked, against the evidence the row cites: (a) is each item on the row's **Known**
line actually `[SHOWN]`/`[STATED]`, or an inference re-labelled; (b) does the number rest on a described
*method* or on a *name*; (c) how many recordings, sizes or images stand behind a visual claim, and do they show
the shape rule or only the rendering of it; (d) does the number price the hidden constants, the creator's own
robustness history, and the interaction between subsystems (district-wide merged polygons × bent bisection,
inner castle × every flag, warp × downstream re-derivation). Confidence semantics are the assessment's own (§2
of `mfcg.md`): `F` functional, `V` visual, `A` algorithm identity ("our derivation matches THEIR algorithm"),
`S` seed-exact ("same seed → same map").

---

## 2. Adjustments (from → to), with what was checked

| # | row | metric | from → to | reason (short) |
|---|---|---|---|---|
| 1 | A2 RNG stream | A | 0.90 → 0.80 | only `Random.{float, save, restore, reset}` execute live; the helper set and the save/restore bracket positions are 2017-only or unknown |
| 2 | B1 patch mesh | V | 0.85 → 0.75 | the "cell size gradient" is the 2017 spiral's property; live spiral, `+4` placement and relaxation unverified, the cross-check never run |
| 3 | B3 coast | F | 0.80 → 0.75 | combination of the 6-octave field with `sea` is `[INFERRED]`; 0.11.2 bay rework is a name |
| 3 | B3 coast | V | 0.80 → 0.70 | bay shape is the visible signature; no capture characterises it; creator calls the pre-0.11.2 system "dated and primitive" |
| 4 | B5 wall / gates | V | 0.90 → 0.80 | wall smoothing never measured; the 2017 formula carried forward cannot even explain the one observation offered for it |
| 4 | B5 wall / gates | A | 0.70 → 0.55 | EG-7 #9 rules "unchanged is not supported" for the gate loop; weights, auto-count, smoothing, Maximum mode all open |
| 5 | B6 citadel | F | 0.85 → 0.75 | creator: inner castles "surprisingly hard … compatible with any parameter combination"; equalize step, bloat trigger, keep plan, cell choice unknown |
| 5 | B6 citadel | V | 0.85 → 0.80 | creator "not entirely happy about how they look"; keep plan generator unknown |
| 6 | B7 streets | A | 0.60 → 0.50 | Critic-2: "same name, same signature; internals unverified"; open set, cost, third Topology, far end all open |
| 7 | B8 rivers | F | 0.75 → 0.65 | acceptance, width law, source/sink, tributaries/islets and the 0.11.2 rework unknown; 70 % restart rate unexplained |
| 8 | B10 ward → blocks | F | 0.80 → 0.70 | the cut rule is "just an idea, not an algorithm"; five years of creator stabilisation, still restarting cities in 2026 |
| 8 | B10 ward → blocks | V | 0.80 → 0.70 | same; the second alley type is unexplained |
| 9 | B11 block → lots | F | 0.80 → 0.70 | C13 OPEN on every constant; "weird" lots filtered, rect-null crash, `Failed to make a cut` still logged |
| 9 | B11 block → lots | V | 0.85 → 0.75 | the assessment itself calls B11 "the one risk" to the visual verdict, then scores it joint-highest of the stages |
| 10 | B12 outskirts | A | 0.60 → 0.50 | what is interpolated and the decision rule are `[INFERRED]`; the 0.10.0 street-density knob is a different, undescribed mechanism |
| 11 | B13 sprawl | F | 0.75 → 0.60 | mechanism `[NAMED-ONLY]`; "experimental … sometimes weird results"; dominates the building count at size 80 |
| 11 | B13 sprawl | V | 0.80 → 0.70 | the ribbons in the evidence are B12's filter (present at `shantytown=0`); what sprawl adds has no described rule |
| 12 | F1 warp tools | F | 0.70 → 0.60 | never executed; the re-derivation cascade meets the concave-polygon failure class the creator names |
| 13 | A1 blueprint | S | 0.60 → 0.05 | the cited evidence (byte-identical G0c/G0d reloads) is the reference reproducing *itself* |
| 13 | E2 stroke discipline | S | 0.70 → 0.03 | "given the model" is not the column's definition; even the reference's re-renders are not bit-stable |
| 13 | E3 alleys layer | S | 0.50 → 0.02 | a render pass over sprawl alleys cannot beat B10/B13's 0.02 |
| 13 | G1 export | S | 0.50 → 0.05 | never executed; our schema is our own by ruling; same-seed export needs a same-seed map |
| 14 | overall | F | 0.80 → 0.75 | rows 3, 5, 7–9, 11, 12 |
| 14 | overall | V | 0.85 → 0.78 | rows 2–5, 8, 9, 11; "the one risk" is in fact six rows with unmeasured shape rules |
| 14 | overall | effort | 42 → 55 (42–72) | the ten-week line for districts + bisection + outskirts + sprawl prices none of the creator's 2021–2026 stabilisation history; rivers and skeleton roofs likewise |

Per-row detail follows. "Checked" names the file and section or the source id actually opened for the claim.

### 2.1 A2 — algorithm identity 0.90 → 0.80

*Rated on:* "the recurrence is pinned by 34/34 orbit hits and the checkpointing by counts; `float/normal/int/
bool/fuzzy` definitions verified (_critic-os §1.1)".
*Checked:* `captures/mfcg/2026-09-21T05-03-24/coverage/gen-0.calls.json` and `…T11-25-32/coverage/gen-0.calls.json`
— the complete set of `com.watabou.utils.Random.*` rows is `float` 62 / 69, `restore` 33 / 46, `save` 3 / 3,
`reset` 2 / 2. No `normal`, `int`, `bool`, `fuzzy` label exists in the live census (profile §6.5 lists the same
four). `_critic-os.md` §1.1 rows 5–9 verify those helpers **in the 2017 source only**. `_critic-os.md` §1.10 row
130: `ArrayExtender.weighted` "has no pipeline callers" in 2017, yet the live build draws one `weighted` per gate
(EG2-2). The assessment's own "Must invent" line concedes the save/restore bracket positions are unknown.
*Why it matters:* the stream recurrence is certain (I do not touch S = 0.85 "for the stream alone"), but
"algorithm identity" for this row also covers how draws are shaped and where checkpoints sit, and that half is
2017 inheritance plus counts. 0.80. A side observation for the under-lane and the architect: `Random.float`
runs 62–69 times per city while EG-3 measures the main stream advancing 585 steps — so either the recorded
label misses inlined draws or other routines step the generator; the assessment's "geometry runs inside
save/restore windows" reading is `[INFERRED]` and this count gap is unexplained.

### 2.2 B1 — visual 0.85 → 0.75

*Rated on:* "cell size gradient (dense regular centre, coarser rim) is the ancestor's signature and the live
counts are consistent with it".
*Checked:* profile §4.1 "**Unknown:** the exact spiral constants in 0.11.x … and how `+4` points are placed";
§13 row 1 and Critic-2 addendum item 2 give the cross-check numbers and the test — never run (§5 item 3 of the
assessment lists it as future work). `mfcg-posts-a.md` T3: "**Unknown:** how the mesh is seeded (Poisson-disc?
jittered polar grid? Lloyd relaxation count?)" — the only live mesh image is 2020 (40345972/09). 87882877 L29
(opened): the 0.10.0 merge "makes cells almost invisible", so the mesh's signature reaches the map only through
wall, road and district shapes — exactly where the radial density matters and is unmeasured. The counts that
*are* pinned (`8·size + 4`, `n − |hull|`, hull 21–29) constrain the point total, not its radial distribution.
*Why it matters:* "consistent with" a gradient is not evidence of one; 0.75 leaves room for the very plausible
retention of the 2017 loop without paying for it as if shown.

### 2.3 B3 — functional 0.80 → 0.75, visual 0.80 → 0.70

*Rated on:* per-cell 6-octave sampling `[SHOWN]`; "a per-cell noise-plus-gradient classifier with the same
invariants is straightforward"; "the shoreline's wiggle scale must match by eye".
*Checked:* profile §4.1: the `sea` angle "**presumably** supplies a directional gradient that the noise
perturbs" `[INFERRED]`; whether cells are split at the shoreline or classified whole is on the assessment's own
must-invent list. 109852547 L15 (opened): "bays are generated differently now and they're a bit more diverse …
'headlands' (inverted bays) no longer happen" — no method; `mfcg-posts-b.md` §6 q13. 61026228 via posts-b §2.16:
the creator's Jan-2022 verdict on the shipped river/coast system is "pretty dated and primitive even comparing
to Village Generator", a user's "bays always seem unusually narrow". `mfcg-posts-a.md` T8: the noise-based
shoreline was announced in 2020 with "no islands or landlocked lakes" but "not announced as shipped anywhere in
this slice". Screenshots with a coast: seven, at three sizes, none analysed for bay geometry.
*Why it matters:* the invariants (single sea, no lakes, `sea` direction, wall ends at shore) are cheap, so F
stays high at 0.75; the *shape distribution of bays* — the only thing a viewer judges — has no measured target
and a rework of unknown content in 0.11.2, so V 0.70.

### 2.4 B5 — visual 0.90 → 0.80, algorithm identity 0.70 → 0.55

*Rated on:* "the laws are measured to the pixel"; "2017 loop shape plus measured live deviations"; wall
smoothing "asserted retained `[INFERRED, not measured]`".
*Checked:* profile §4.4 states "Ancestor behaviour retained: … smoothed with `smoothFactor = min(1, 40/|patches|)`"
with no `[SHOWN]` tag; §12.3 lists the gate algorithm under "survived unchanged"; **EG-7 #9 rules on exactly
this: "Only partly … 'Unchanged' is not supported."** 87882877 L45 (opened): "Things like the coast, city walls
etc are much better smoothed now"; 38048182 via posts-a T13: 0.7.6 "fewer unrealistic 'sawtooths'"; posts-b
§2.7: "The creator never names the method." Arithmetic check of the one observation offered for the 2017 rule
— profile §10.6 "The wall is noticeably rounder here [size 39] than Feygate's [size 25] — consistent with the
`smoothFactor = min(1, 40/|patches|)` rule": under that rule both sizes give `f = 1` (`_critic-os.md` §1.5 row
40: saturates for n ≤ 40), so the rule predicts *no* difference between the two; the observation is evidence
*against* the carried-over formula, not for it. Also `_critic-os.md` C2: even in 2017 gates were smoothed twice,
not pinned. Weighted-pick weights, the auto-count rule (a fit over five sizes), Maximum mode and the gate-plaza
radius are all on the must-invent list.
*Why it matters:* the tower/gate/passage laws *are* pixel-exact (V does not fall below 0.80), but the wall
polygon's own shape — the largest single stroke on every map — has an unknown smoother that changed twice after
the ancestor. A = 0.55: loop shape plausible, everything numeric open, and the file's own addendum withdrew
"unchanged".

### 2.5 B6 — functional 0.85 → 0.75, visual 0.85 → 0.80

*Rated on:* placement modes, the 0.75 gate and its repair operators, single gate, keep look.
*Checked:* 40345972 L24 (opened): "to implement inner castles as a real option **compatible with any parameter
combination** turned out to be **surprisingly hard**. I'm not entirely happy about how they look … Probably it
would be easier and more correct to implement inner castles as a separate class of objects". L57–59: Equalize =
"equalizing its angles", Bloat = "make individual cells … larger" — operation names, no step rule; the
observed increments (profile §4.4b) fit *some* contraction, which is the assessment's own `[INFERRED]`. Bloat
trigger `[UNKNOWN]` (Critic addendum item 2). Keep: `getPlanSym` unobserved, `lir` placement `[INFERRED]`
(§6.4). 40345972 via posts-a T12: greens are "placed in front of an inner castle to create some space" — a
cross-feature layout rule with no stated predicate. 41711473 L57 (opened): the castle "always occupies one cell"
— the cell-choice rule for `urban_castle=1` is nowhere.
*Why it matters:* the lens item "combinatorial interaction" is stated by the creator in his own words for this
exact feature; F 0.75. V 0.80 because the keep plan (the largest dark solid on the map) has no generator
described and the creator is "not entirely happy" with the inner-castle look we would be matching.

### 2.6 B7 — algorithm identity 0.60 → 0.50

*Rated on:* "same names and signatures as 2017, internals unverified".
*Checked:* profile Critic-2 addendum item 1: the 2017 `aStar` is a FIFO breadth-first search; "whether the
live open set is FIFO or priority-ordered is OPEN from call counts alone, and 'unchanged' in §12.2 should read
'same name, same signature; internals unverified'"; the FIFO-meander claim "is neither supported nor refuted".
`_critic-os.md` C10, §6 item 3: only a black-box test could tell. The row's must-invent list is the whole
search: open-set discipline, cost function, the third `Topology`, the road's far-end rule; the `2N + 1` split is
`[INFERRED]` (EG2-2). `mfcg-posts-b.md` §6 q5: main-road construction "never described".
*Why it matters:* names and a count identity are structure; 0.60 for "our derivation matches theirs" prices
the 2017 BFS as if it were shown live. 0.50.

### 2.7 B8 — functional 0.75 → 0.65

*Rated on:* "a mesh-edge path with validation and a widening ribbon reproduces the feature set".
*Checked:* profile §4.6: `validateCourse`, `getCanalWidth`, source/sink choice are names with counts;
tributaries and islets are `[SHOWN]` only in creator images (`mfcg-devlogs-b.md` §2.21: 817711/01 two
tributaries, 780847/01 mid-river island; posts-b §2.16: 109852547/04, 114184619/02–03) and appear in **no**
recording (`drawBridge` 1–8, `drawMouth` ≤ 1, nothing for a confluence); 0.11.2 is "almost entirely a
river/coast release" of unknown content; 67134 L38 (opened): 0.6.0 made the river "more likely to run through
the city" — a tuned probability with no rule; the assessment's §4 item 3 concedes the 70 % restart rate is one
"we … cannot yet explain". Creator (61026228, posts-b §2.16): the shipped system is "dated and primitive" and
the general problem needs "a prototype, maybe even more than one".
*Why it matters:* the two modes, the search-and-test shape and the rendering are pinned, so 0.65 not lower; but
"reproduces the feature set" skips the bank coupling (`bankDistrict`), tributaries, islets, the width law and
a course rule that produces the reference's failure statistics. The assessment's own algorithm identity 0.40 is
consistent with 0.65, not 0.75.

### 2.8 B10 and B11 — functional 0.80 → 0.70 (both), visual 0.80 → 0.70 (B10), 0.85 → 0.75 (B11)

*Rated on:* "T-junction-dominant curved alleys are reproducible from the stated idea"; "the measurable outputs …
give a tight calibration target"; "this is the signature texture and it is well characterised at the pixel
level".
*Checked:* 49191011 L21 (opened): "**it's just an idea, not an algorithm or mathematical definition. It can be
implemented in different ways for different results.**" `watabou-extra-a.md` §2.1 UNKNOWN list: bend position,
endpoint edges, stop predicate, width law, reject filter — all; and the creator on his own two iterations: "I
can't really put my finger on what exactly is better here", i.e. the look is sensitive to unstated choices.
87882877 L35 (opened): "The most problematic is the twisted bisection itself. The idea … is simple enough, but
my implementation of it is not." 98918904 L25–27 (opened): freezes gone, crashes "very occasionally", "The most
common glitch looks like an empty area on a map … I know this will be **hard to fix**". 61026228 L29 (opened):
"Occasionally it produces weirdly looking shapes"; L80–82: the `rect`-null crash. `captures/mfcg/2026-09-25T10-38-58/README.md`
L133: "bad poly" restarts appear in the default-style baseline too; ST-8: 3 of 16 cities restarted on
`*** CRITICAL: A bad poly was provided for besecting`; `Bisector.hx:281 Failed to make a cut` 2–3 per capture.
Timeline: March 2021 "too slow and too unstable" for MFCG (extra-a §2.1) → 0.9.0 Jan 2022 → 0.10.0 alpha 2023 →
0.10.1 → holes in NG 1.2.0 (extra-b T1: "still pretty glitchy, but it works") → 2026 restarts. `_critic.md` C13:
OPEN; §6 item 4: "remain unknown after all sources". 100431269 L15 (opened): "two types of alleys which are
quite different from each other" — never explained. The assessment's §3 verdict names B11 "the one risk" and its
§4 ranks the cut rule the #1 unknown, yet B11 carries V 0.85, the joint-highest stage score.
*Why it matters:* "well characterised at the pixel level" is true of the *output* (segment histogram, lots per
block, shared hairlines) and says nothing about whether a clean-room construction lands in the same class —
the creator's own history says the class boundary is narrow and the failure modes are structural. F 0.70 for
both (a different, more robust construction can still hit the statistics, but at cost); V 0.70 / 0.75.

### 2.9 B12 — algorithm identity 0.60 → 0.50

*Rated on:* "mechanism `[SHOWN]` with a verified ancestor".
*Checked:* profile §4.9 and EG2-4: what is `[SHOWN]` is `earcut` once per extramural group and a barycentric
interpolation per building; that the interpolated quantity is a density/keep probability is `[INFERRED]` ("this
is the direct descendant of 2017's `filterOutskirts`"). 87882877 L46 (opened): 0.10.0 "decreases the density of
**streets** there, while keeping the density of buildings along those streets relatively high" — a street-level
knob that a per-building filter cannot express; `mfcg-posts-b.md` §2.6 marks the two-knob reading `[INFERRED]`,
§6 q6 open. 37407181 L23 (opened): the "proper rectangles" extramural placer is 2020; its survival in 0.11.x is
unverified (visual-spec §1.4 sees 96 % 5–8-segment footprints map-wide). The "verified ancestor" values
(1 / `2U` / 0, `fuzzy(1) > minDist/p`) are 2017's and the live build shows `fuzzy` nowhere (§2.1 above).
*Why it matters:* one of the two mechanisms is shown at the "interpolate something over triangles" level; the
other is a sentence. 0.50.

### 2.10 B13 — functional 0.75 → 0.60, visual 0.80 → 0.70

*Rated on:* trigger, extent, naming, "what it looks like"; algorithm identity already 0.40 "`[NAMED-ONLY]`".
*Checked:* 7063 L12 (opened): "It's kind of experimental feature and **sometimes it produces weird results**";
67134 L38 (opened): "shantytowns tend to spread along the coast, river and roads" — the only rule ever stated;
EG-2: `City.buildShantyTowns` once per city plus `City.d` and one closure — no sub-routine names. EG-3: buildings
grow ≈ size^2.9 "because shantytown and sprawl dominate the large ones". EG2-4: "Extramural building ribbons
appear only along gate roads" in runs with `shantytown=0` — so the ribbon look the row cites (posts-b §2.6,
EG2-4) belongs to B12's filter; what `shantytown=1` adds (the fans MILK TOWN, WEST CITY, TIMBER RING in EG-5)
has no described placement, density or block-construction rule. `mfcg-devlogs-a.md` §2.12's distance-field
sampling is `[INFERRED]`.
*Why it matters:* this is the lens's "named feature mistaken for a described method": a stage that can supply
most of a large city's buildings is scored 0.75 functional on a flag, a naming rule and one sentence. F 0.60,
V 0.70 (the look is shown in six images, the rule that produces it in none).

### 2.11 F1 — functional 0.70 → 0.60

*Rated on:* "unrecorded, but the semantics are stated and standard".
*Checked:* ST-9: `onWarp`, two `bloat`s, the second `equalize` never executed in 45 samples. 40345972 L57–59
(opened): tool definitions are one line each. The assessment's own must-invent line: "kernels and the
re-derivation cascade". The cascade's input class is what breaks the bisection: 87882877 L35 (opened) "for
complex concave shapes it often produces far from perfect results and such defects as collapsed or intersecting
edges can easily break it completely"; the creator's "too much distortion may cause glitches" (posts-a T4).
*Why it matters:* eight tools with brush falloff and staged commit are standard; re-deriving districts, blocks,
lots, rivers and labels from moved mesh vertices without entering the failure class is the work, and none of it
is observed. 0.60.

### 2.12 The seed-exact column on render/framework rows — A1 0.60 → 0.05, E2 0.70 → 0.03, E3 0.50 → 0.02, G1 0.50 → 0.05

*Rated on (A1):* "URL-seeded loads reproduce (byte-identical screenshots G0c/G0d), Enter chains do not even in
the reference". *Checked:* EG-3 "Same URL, same pixels. G0c and G0d … byte-identical" — that is the **reference
reproducing itself**, evidence that seed-exactness is possible in principle, not that a clean-room build would
achieve it; under the column's definition ("same seed → same map") A1 cannot exceed the mesh row's 0.15 and,
downstream of B10/B11, sits at the aggregate 0.02–0.05.
*Rated on (E2):* "deterministic given the model (the only stochastic render step is crown picking)". *Checked:*
the §2 definition is unconditional; and even conditionally, ST-3 shows same-city Gable re-renders differ in
`addGables` and skeleton internals ("not bit-stable between renders"), ST-2 shows crowns re-picked per render
from the un-reset stream. E3 "a pure render pass" over sprawl alleys (ST-4) inherits B10/B13. G1: `onExport`
never executed (ST-9); "Must invent: our own schema"; a same-seed export identical to theirs presupposes a
same-seed map.
*Same pattern, not renumbered here, recommended relabel "conditional on the model":* A3 0.50, D3 0.30 (the
compass "rolled per session" is irrelevant to our reproduction), E4 0.30, F3 0.30, H1 0.30. The aggregate 0.02
is unaffected either way; the per-row cells mislead an architect deciding which parts are "seed-reproducible".

### 2.13 Overall — functional 0.80 → 0.75, visual 0.85 → 0.78, effort 42 → 55 (42–72)

*Functional:* the rows above (B3, B6, B8, B10, B11, B13, F1) are among the heaviest in building count and map
area; a 0.05 aggregate move is conservative.
*Visual:* the §3 verdict's "the lot texture (B11) is the one risk" is contradicted by the assessment's own rows:
B3 (bay shapes), B5 (wall polygon smoothing), B9 (district borders "shaped by the landscape", 85275 L24 opened —
rule unknown), B10 (alley pattern), B13 (sprawl fans) and B17 (which cells become fields) all list their shape
rule under "must invent". Palette, widths, casing, fonts and layer order — the parts that *are* pixel-exact —
carry the style class but not the quality class; 0.78.
*Effort:* the breakdown gives 10 weeks to "districts + ward groups + twisted bisection + outskirts + sprawl
(the calibration loop against exported geometry is most of it)". Checked against the creator's record: the bent
cut alone ran from a March-2021 prototype "too slow and too unstable" for MFCG, through a purpose-built harness
(NG), to 0.9.0, the 0.10.0 refactor ("took much time"), 0.10.1, NG 1.2.0 holes, and still restarts 3 of 16
cities in 2026 (§2.8 above); the calibration loop the line depends on needs a geometry export that §5 item 1
lists as *not yet obtained* ("verify it still works … first"). Rivers at 4 weeks price a validator whose 70 %
failure rate is unexplained and a 0.11.2 rework of unknown content; roofs/trees at 4 weeks price a straight
skeleton the creator says "glitches in special cases and I hate dealing with special cases" (101173551 L25
opened) run on 46 000 footprints with a gable variant that "works well only with 'clean' shapes" (L35) yet is
applied to 99.8 % of roofs (ST-3). Adding ~8 weeks to the bisection stack, ~2 to rivers and ~3 to roofs/trees
gives ≈ 55, range 42–72. PLAUSIBLE (judgment); the inputs are CONFIRMED at source.

---

## 3. Rows I tried to refute and could not (with what was checked)

| row | metric(s) kept | what was checked, and why the number holds |
|---|---|---|
| A1 | F 0.95, V 0.90, A 0.85 | keys read from 25+ recorded hrefs (§2, EG-7 #6); 47063541 L26, L66 opened (size in wards, min 5 max 200); `gates=N` exact (EG2-2). Caveat noted, not priced: the live Roads/Text/Outline tabs were never driven (ST-9, `createRoadsTab` never executed) — their controls are known from 2021–2024 text, which is enough for "same option surface". |
| A2 | F 0.95, S 0.85 (stream alone) | 34/34 Lehmer transitions (EG-3), `Random.reset` count independent of attempts, cold-load clock arithmetic — all `[SHOWN]`. |
| A3 | F 0.90, A 0.85 | nine stage names printed with file:line (§1); ST-8 correction applied. Tag nit: the "tiered policy" is profile §11's *design lesson* (reader inference over stated messages), quoted as `[STATED]`; the number survives because the messages themselves are stated and the tiering is a plain reading of them. |
| B2 | F 0.85, V 0.80, A 0.60 | `DCEL.collapseEdge` 1 per 2 cells (§4.2); 2017 threshold 8 verified (`_critic-os` row 37); the row already prices the unknown live threshold. |
| B4 | F 0.70, V 0.80, A 0.50 | already scored as inferred; EG-7 #4 correction (face splits belong to gates) applied. |
| B9 | F 0.80, V 0.85, A 0.45 | 85275 L24 opened ("grown … seeded around prominent city features … borders shaped by the landscape … more diverse in size"); grower/validator names and 2.5 validations per accepted cell (§4.7). V 0.85 holds because in the default style (tints off, ST-0) districts reach the viewer through labels (D2, pinned) and counts (measured), not through border geometry. |
| B14 | F 0.80, V 0.85, A 0.50 | 79147510 L24, L28 opened (churches "each … has a small square next to it"; "much fewer secondary plazas"); 112574 L15 opened (gate plazas). Small solids on light squares are reproducible from the images. |
| B15 | F 0.75, V 0.85, A 0.40 | keep plans shown in many images (posts-b §2.17, devlogs-b §2.22); 2017 slicer verified (`_critic-os` row 99). |
| B16 | F 0.85, V 0.90, A 0.50 | `drawGreen = fill #a59f93` exact (§2); flat fill is the whole visual. |
| B17 | F 0.80, V 0.85, A 0.45 | `Cutter.grid` + `splitField` ≈ 12.6/farm + `round` + `stripe` (§4.9); furrow law measured (visual-spec §1.6); patchwork shown in ≥ 8 images across eras. Noted, not priced: which cells become farmland is unknown and 47063541 L68 (opened) makes farm density an aesthetic knob. |
| B18 | F 0.85, V 0.90, A 0.50 | pier law `1.2 ± t` exact in every record with water (EG-4); `DocksGrower.validatePatch` coast-only (§4.7). |
| B19 | F 0.85, V 0.85, A 0.70 | ST-2: `validate = 140 × validateRect` in 14/14 steps, crown library of 20, forest chain routine by routine, layer order; 114184619 L26–28 opened. One capture, but 14 tree steps and 13 forest steps on ≥ 6 cities; the identity is at routine level, which is what A measures. |
| B20 | F 0.50, V 0.70, A 0.20 | 67134 L18 opened; already scored low. |
| C1 | F 0.85, V 0.80, A 0.50 | ST-7: Complex = `createRects` per lot with `getPlanFront`/`isRectangle`; Block and Hidden shown; 100431269 L29 opened. |
| C2 | F 0.85, V 0.85, A 0.60 | ST-3 identities (`run = drawRoof`, ridge ops = 2 × footprint + 1, `addGables` 99.8 %); 101173551 L25, L35 opened. A 0.60 survives because a straight skeleton is a defined object; the creator's O(n²) event loop is the generic construction. Noted: the gable end-edge rule is `[INFERRED]` (extra-b T4). |
| C3 | F 0.80, V 0.80, A 0.50 | ST-7: Processing = None removes exactly `Block.indentFronts`; 61026228 L34–37 opened. |
| D1 | F 0.85, V 0.85, A 0.75, S 0.00 | grammar asset verbatim (§9.1 not re-read; §9.2 mapping checked); `.merge`/`pinch` and UNIQUE/COMPACT predicates are on the must-invent list already. Authoring cost: the assets are 4.4 KB + ≈ 8 KB of corpora — days, not weeks; the 3-week naming + labels line is adequate. |
| D2 | F 0.85, V 0.85, A 0.70 | chain pinned by 1:1 counts (`simplify = visvalingam`, `Cubic 12/segment`, one `Letter` per glyph); ST-5 Legend/Straight; 102377277 quote via devlogs-b addendum. Ridge-selection score open, already listed. |
| D3 | F 0.90, V 0.90, A 0.70 | everything visible and measured (visual-spec §1.7, §8). |
| E1 | F 0.90, V 0.90, A 0.75 | ST-6: three tint methods read from the colours themselves (hue rotation / V scale / blend), outline lerp k = 0.29–0.30 over 24 pairs, weathering = per-roof RGB scale — `[SHOWN arithmetic]`, not one screenshot. |
| E2 | F 0.95, V 0.90, A 0.85 | `casing = core + 2t` in all nine draw records (§10.3, EG-4, visual-spec §0.2); layer order from complete logs. |
| E3 | F 0.80, V 0.80, A 0.50 | ST-4 pixel diff; 100431269 L15, L21 opened. |
| E4 | F 0.80, V 0.80, A 0.40 | EG2-4 refit scales 1.34/1.17/1.00 measured; fit rule already "must invent". |
| F2 | F 0.80, V 0.80, A 0.60 | save/restore isolation shown (EG-3); 87882877 (churches "don't tend to disappear after rerolling a ward") shows the reroll scope; contract already `[INFERRED]`-priced. |
| F3 | F 0.90, V 0.85, A 0.70 | ST-0 control-by-control; 7063 L18 opened (Enter = same size group). |
| G1 | F 0.80, V 0.85, A 0.40 | 112574 L18 opened (`export=` values); schema drift already priced. |
| G2 | F 0.60, V 0.70, A 0.30 | external services; already low. |
| H1 | F 0.85, V 0.80, A 0.60 | `_critic.md` C1 interval [6.12, 6.13); 79147510 L71 opened ("Dimensions are a mess in all my generators"); scale measured (visual-spec §1.7). |
| H2 | F 0.85 | Stopwatch figures and the R² 0.974 fit (EG-3). |
| overall A | 0.50 | the five heavy stages are unpublished heuristics (correct); the pinned stages (RNG, Delaunator/DCEL, skeleton chain, tile-stamped trees, tint maths, casing) are pinned. The row cuts above (B5, B7, B12) lower the average by ≈ 0.02, inside the rounding. |
| overall S | 0.02 | cannot be lowered meaningfully; the clean-room naming rule alone forces names to differ. |

---

## 4. Original-source spot-checks (≥ 10 rows)

| # | source opened | phrase found (line) | row(s) | effect |
|---|---|---|---|---|
| 1 | `watabou-extra/49191011/post.md` | "just an idea, not an algorithm or mathematical definition. It can be implemented in different ways for different results" (L21) | B10, B11 | supports §2.8 |
| 2 | `watabou-city/87882877/post.md` | "The most problematic is the twisted bisection itself … my im[plementation of it is not]" (L35); "much better smoothed" (L45); "decreases the density of streets … keeping the density of buildings along those streets" (L46); "makes cells almost invisible" (L29) | B10, B11, B5, B12, B1 | supports §2.2, §2.4, §2.8, §2.9 |
| 3 | `watabou-city/98918904/post.md` | crashes "very occasionally" (L26); empty-area glitch "hard to fix" (L27) | B10, B11 | supports §2.8 |
| 4 | `watabou-city/61026228/post.md` | "Occasionally it produces weirdly looking shape[s]" (L29); Offset "shifts the front side of every lot" (L35); `rect` null crash (L80–82) | B11, C3 | supports §2.8; C3 holds |
| 5 | `watabou-city/40345972/post.md` | "surprisingly hard … not entirely happy about how they look … separate class of objects" (L24); Relax/Bloat/Equalize definitions (L57–59) | B6, F1 | supports §2.5, §2.11 |
| 6 | `watabou-city/41711473/post.md` | "it always occupies one cell of the mesh" (L57); Voronoi lots "crashes the generator occasionall[y]" (L25) | B6, C3 | B6 cell-choice rule absent |
| 7 | `watabou-city/109852547/post.md` | "bays are generated differently now … a bit more diverse … headlands … no longer happen" (L15) | B3, B8 | supports §2.3, §2.7 |
| 8 | `watabou-city/37407181/post.md` | "new algorithm similar to the one in Village Generator … proper rectangles" (L23); height-maps not exported (L46) | B12, B20 | supports §2.9; B20 holds |
| 9 | `watabou-city/79147510/post.md` | churches "each of them has a small square next to it" (L24); "Much fewer secondary plazas" (L28); "Dimensions are a mess" (L71); Pinch (L22) | B14, H1, F1 | B14/H1 hold |
| 10 | `watabou-city/100431269/post.md` | "two types of alleys which are quite different" (L15); alleys "don't look exactly like major roads" (L21); Hidden mode, fields always created (L29–30) | B10, E3, C1, B17 | supports §2.8; E3/C1 hold |
| 11 | `watabou-city/114184619/post.md` | "stylized Voronoi diagrams" (L15); "fill all available space" (L26); roads "under" (L27); "edges look too straight" (L28) | B19, B1 | B19 holds |
| 12 | `watabou-city/47063541/post.md` | size "in wards" (L26); Default/Maximum/Number roads (L27); "minimum size is 5 and the maximum is 200" (L66); farms "just doesn't look interesting" (L68) | A1, B5, B17 | A1 holds; B5 "Maximum" mode is a name |
| 13 | `watabou-extra/101173551/post.md` | own algorithm, O(n²), "glitches in special cases and I hate dealing with special cases" (L25); gable variant "works well only with 'clean' shapes" (L35) | C2, D2, effort | C2 holds; feeds §2.13 |
| 14 | devlogs `85275` (L24), `67134` (L18, L38), `7063` (L12, L18), `112574` (L15–18), `3091` (L14–17) | districts "grown … seeded around prominent city features"; elevation "gradient field"; shantytowns "spread along the coast, river and roads", "sometimes … weird results"; gate plazas, Delaunator, `gates`/`export` keys; outskirts "only regions next to the gates" | B9, B20, B13, B14, B5, G1, B12 | supports §2.10; B9/B20/G1 hold |
| 15 | `captures/mfcg/2026-09-21T05-03-24/coverage/gen-0.calls.json`, `…T11-25-32/coverage/gen-0.calls.json` | `utils.Random.*` rows = `float` 62/69, `restore` 33/46, `save` 3/3, `reset` 2/2 — nothing else | A2 | supports §2.1 |
| 16 | `captures/mfcg/2026-09-25T10-38-58/README.md` L133; `captures/README-labelfix-2026-09-25.md` L21, L103, L112 | "bad poly" in the default baseline; 348 phantom `CloseButton.new`/`DropDownButton.new` calls; totals unaffected | B10/B11; §1 caveat | supports §2.8; the assessment's caveat is correctly stated |

All 16 checks SUPPORTED the findings files' quotations (no misquotation found); every adjustment above rests on
what those sources say, not on a transcription error.

---

## 5. Nits and internal inconsistencies (no rating change)

1. **Count drift on the seed-point law:** §1.1 says "11/11 builds", B1 says "13/13 builds", profile §0 says
   "all 7 recorded builds" (later extended by EG-7 and EG2-4 to G0/G1c/N0/N1/N9). Any of 11–13 is defensible;
   pick one and cite the run list.
2. **"8 agreeing screenshots" for `sea` (A1, B3) vs "6" (§1.1):** profile §2.1 has five, EG-5 adds Lowford and
   Mistfire Church (seven); eight is not in the read record.
3. **Profile §10.6's smoothing inference is arithmetically empty** (§2.4 above): `min(1, 40/n)` saturates at
   both n = 25 and n = 39. The assessment inherits the sentence via "`min(1, 40/n)` (= 1 for all shipped sizes)"
   without noticing that this makes the formula unable to produce the size-dependent rounding it is offered as
   explaining — and that live sizes reach 200, where the 2017 formula would give f = 0.2.
4. **`[STATED]` on the tiered failure policy (A3)** is the profile reader's classification of stated messages;
   harmless here, but the tag should be `[STATED messages; INFERRED tiering]`.
5. **`Random.float` 62–69 calls vs a 585-step stream advance (EG-3)** is a gap the assessment does not mention;
   it bears on how much of A2's "checkpoint discipline" is actually observed (§2.1).
6. **B12's "VG-like rectangle placer"** on the must-invent list is a 2020 feature (37407181); visual-spec §1.4's
   map-wide 5–8-segment footprints suggest it may no longer exist in Lots mode. Not an over-rating — a possibly
   stale work item.
7. **The label-fix caveat is applied correctly** (§1 binding corrections); the class-level rows it affects
   (`CloseButton.new`, `DropDownButton.new`, `Alleys`→`Castle`) are not load-bearing for any number here.

---

## 6. CONFIRMED vs PLAUSIBLE

* **CONFIRMED (read at source in this seat):** every quotation in §2 and §4 was found in the named `post.md` at
  the cited line; the `utils.Random.*` executed set was listed from two `calls.json` files; EG-7 #9's "'Unchanged'
  is not supported", ST-8's three restarts, ST-3's non-bit-stable re-renders, ST-2's per-render crown re-pick,
  EG2-4's ribbons at `shantytown=0`, `_critic-os.md` rows 40/130 and C2/C10, and `_critic.md` C13/§6-4 were read
  in the findings files themselves; the `min(1, 40/n)` saturation argument is arithmetic on a verified constant.
* **PLAUSIBLE (judgment):** every "to" number, the aggregate moves, and the effort range. Nothing was executed
  beyond a six-line JSON listing; no bundle, PNG or recording was opened or re-measured.
* **Scope not covered:** rows rated too low (the under-lane); the `_critic-ftg.md`/`_critic-vg-ng.md` files and
  the non-MFCG findings, which the target correctly excludes; the unread ranges of the findings files named in §0.
