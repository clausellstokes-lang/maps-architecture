# Amendments from the compiled-code readings (2026-09-27, impact seat)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat code/_impact; queued in docs/FABLE-REVIEW-QUEUE.md.
> DESIGN INPUT — reference facts from the reader-tier code readings, restated as calibration provenance (`_critic-code.md`
> R5: logic constants may reach the design only attached to a design decision). No code, no content (words, grammars,
> palettes, word lists) and no reference class or method name appears in any editor text below; class citations live
> only in the reader-tier provenance table `research/findings/code-impact.md` §(d), keyed by the P-ids used here.

Owner directive (2026-09-27, verbatim, the only quotation in this file): "oh read them. don't hesitate. we captured it,
we read it, unless we directly copy their code line by line, that is copyright. but to read them and to understand their
logic, that is another thing entirely."

**What this file is.** Lane `code/_impact` read the six code readings (`research/findings/code-{mfcg,village,
neighbourhood,manor,dwellings,ftg-client}.md`) and the critic `_critic-code.md` (its rulings R1–R12 bind), then the design
sections each correction names. Every place where `docs/ARCHITECTURE.md` inferred a mechanism, a law or a constant that
the code shows to be different is ruled below: **ADOPT** (re-derived in our own terms — an idea or a fact, never their
code or table), **KEEP OURS** (with the reason: realism, the plot model, determinism, editing or the owner's rules) or
**CALIBRATE** (the design's default becomes a fact-sourced default with provenance). Items are **not applied** by this
seat. Numbering continues from `docs/AMENDMENTS-2026-09-25b.md` (last item 32, whose §17.1 provenance sentence this file
presupposes).

**How to apply.** In the amendments pass after this one, with
`Workflow({ scriptPath: ".../workflows/04-amendments.js", args: { amendmentsFile: "docs/AMENDMENTS-2026-09-27c.md", fableModel: "opus" } })`
(stand-in marked while Fable is unavailable). Three gates, in this order:
1. **Evidence gate (`_critic-code.md` R12).** Each item states its evidence. Items marked **CONFIRMED** rest on facts read
   on disk (and, where named, re-derived by the critic or executed against captures) and may be applied. Parts marked
   **HOLD — PLAUSIBLE** rest on a reader's inference and are applied only after Fable's retrovalidation of the reading.
2. **Build naming (R8).** Any sentence the editor writes of the form "the reference does X" names the build: MFCG itch
   12710731; VG 1.6.9 (itch 19365073); NG 1.2.2 (itch 11441280); Fantasy Manor 1.0.0 build 890; Dwellings itch 17195045;
   the FTG client of the 2026-09-25 capture. The bisector exists in two versions (straight-first in MFCG and VG,
   bend-first in NG) — never "watabou's bisector" without a build.
3. **Doc checks (§17.1 (2)).** The editor texts below were written fresh, not lifted from the readings; the readings and
   `code-impact.md` are in the C3 corpus, so an apply lane runs the three-copy method (untouched / mine / combined) and
   rewords any hit rather than allow-listing it.

Legend per item: **Section** · **Design says** · **Code does** (build, evidence grade, reading §) · **Ruling** and reason ·
**Editor change** (the exact edit) · **Scope** (BASE = stage 1; STAGED = a roadmap stage, hook text only) · **Evidence**.

---

## A. The bent cut (§4.6 S8) — the largest correction


32. **Provenance: the current generators' compiled code was read for understanding (owner directive 2026-09-27; apply in
    the pass after 09 — 09's routing is closed).** Owner: "oh read them. don't hesitate. we captured it, we read it, unless
    we directly copy their code line by line, that is copyright. but to read them and to understand their logic, that is
    another thing entirely." Program's interpretation: §17.1's clean-room chain gains one sentence of provenance — from
    2026-09-27 the captured bundles of MFCG, the Village Generator, Neighbourhood, Fantasy Manor, Dwellings and the FTG
    client were READ by reader lanes (research/findings/code-*.md) to understand their logic; no code, constant table,
    grammar, palette, wordlist or asset was copied; the reader-tier findings join the os-*.md files behind the implementer
    firewall (implementers receive the architecture and the sanitised digest only); the identifier check (C1) and the
    phrase and list checks stay in the build gate. Mechanisms the readings show to differ from the design's inferences
    are candidate amendments (docs/AMENDMENTS-2026-09-27c.md), adopted only as our own re-derivations with provenance.
    (Copied here from docs/AMENDMENTS-2026-09-25b.md by the manager, 2026-09-27, so the pass that applies this file applies it too; the owner's words stay quoted only there.)

33. **Citations, build names and the slope term's provenance (§4.6 intro "The recipe", step 1's slope term, §1.4
    "block fabric" row).**
    *Design says:* the recipe is "the measured default" calibrated on NG's profile addenda (AN-6, PF-2, BG-1); step 1's
    slope term ends "(MFCG's one elevation effect is on exactly the alleys)".
    *Code does:* the bisector's rules are now read in three builds (MFCG 12710731, VG 1.6.9, NG 1.2.2): stop test, cut
    position, start side, corner, far side, straightening, fillet and retries are all explicit (`code-neighbourhood` §2.2,
    §2.13; `code-mfcg` §2.11.3; `code-village` §3.10). MFCG's model has **no elevation field** at all (`code-mfcg` §7,
    honourable mentions) — no MFCG alley reacts to slope. [READ, CONFIRMED; critic R-M2, R-N2, R-V4]
    *Ruling:* CALIBRATE the citations; KEEP OURS for the slope term (realism: cuts that follow the fall line are the
    owner's tiebreaker, and the reference never had them). The profile measurements stay what §13.5 tests against; the
    generative defaults of steps 1–9 change as items 34–40 rule.
    *Editor change:* (a) Replace the recipe heading's parenthesis "(MN-3; `profile-neighbourhood.md` AN-6, PF-2, BG-1 — the
    measured default)" with "(MN-3; the mechanism of NG 1.2.2's plain bisector as read in its code — reader-tier, via the
    digest — restated in our metric terms; the profile's measured statistics remain the §13.5 targets; MFCG 12710731 and
    VG 1.6.9 differ where step 5 says)". (b) In step 1 replace "(MFCG's one elevation effect is on exactly the alleys)" with
    "(our own rule: no reference reacts to slope here — MFCG's model has no terrain)", provenance `own`. (c) In §1.4's
    "block fabric (lanes)" row keep the adopted text and change "NG's bent cut with the measured signature" to "NG 1.2.2's
    bent cut, its mechanism restated, with the measured signature".
    *Scope:* BASE. *Evidence:* CONFIRMED.

34. **Step 1 — the stop test (§4.6 step 1; §4.7's granularity table semantics).**
    *Design says:* "if the OBB minor extent < the band's upper bound, F is a block" — one fixed threshold per band.
    *Code does:* all three builds stop on **area** against a threshold drawn afresh at every face: minimum area × variance
    raised to a folded bell draw in [0, 1] (the absolute value of the four-uniform sum halved minus one; mean exactly 7/30,
    critic X1), so thresholds spread between the minimum and minimum × variance, crowded toward the minimum. NG's street
    minimum is the square of a per-map minimum block side, its variance 3.2–16 per map; there is no extent test.
    [READ, CONFIRMED; R-M2, R-N1, R-N2]
    *Ruling:* KEEP OURS for the quantity — the **extent** (block depth), because the plot model needs a block deep enough
    for its frontage rows (the plot model and realism: burgage depth is a length, not an area) — and **ADOPT the random
    per-face threshold**: it is what gives the references' block-size spread, which a fixed threshold cannot produce.
    *Editor change:* replace step 1's first sentence with: "**Stop test.** `obb(F)`; F is a block when its minor extent is
    below a threshold drawn for this face from `cut.stop`: `τ = e_lo · (e_hi / e_lo)^g`, where `[e_lo, e_hi]` is the
    band's block-depth range and `g` is a folded bell draw on [0, 1] (the absolute value of the sum of four uniforms, halved,
    minus one: mean 7/30, most mass near 0), so most faces stop near the band's lower depth and a minority run deeper
    (provenance `ref:NG per-face stop threshold`, re-expressed on extent; the band rows are recalibrated at M-1 under this
    reading, §13.5 blocks row)." Add `cut.stop` to §6.1's stream list (item 41).
    *Scope:* BASE. *Evidence:* CONFIRMED.

35. **Step 2 — the cut position (§4.6 step 2; the holes paragraph's "σ = 0.098"; II.2 "§4.6's slit, σ = 0.098").**
    *Design says:* `f ~ N(0.5, σ)`, σ 0.066 plain / 0.098 holed, a 3 % outlier draw U[0.15, 0.85], redraw outside
    [0.1, 0.9].
    *Code does:* plain faces — the position on the major axis is the **average of the face centroid's fractional position
    and a bell draw (mean of three uniforms)**: bounded, never clamped, centred between the middle and the centroid, sd ≈
    0.083 in the attempt's own frame. Holed faces (NG's hole-aware bisector) — a bell over [offset, 1 − offset] of the outer
    contour's box, no centroid term. The measured σ values and the 2–5 % tail are the measurement's frame and the rotated
    retries, not a drawn outlier. [READ, CONFIRMED; R-M2, R-N2; `code-neighbourhood` §2.13 row 2, §7 q23–q24;
    position check 160/162 faces, PLAUSIBLE-consistent]
    *Ruling:* ADOPT (restated): the centroid term makes cuts follow the mass of lopsided faces (plot depths balance —
    realism), and bounded support removes the redraw.
    *Editor change:* replace step 2 with: "**Position.** `f = (c + b) / 2`, where `c` is the fraction along the working
    major axis at which the face's area centroid projects and `b` is the mean of three uniform draws from `cut.t`; no
    outlier term, no clamp, no redraw (`f` stays within ±0.25 of `(0.5 + c)/2`). On a holed or annular face `f` is `b`
    rescaled to `[m, 1 − m]`, `m` = the band's lower block depth ÷ the major-axis length (capped at 0.45), with no centroid
    term (provenance `ref:NG position law`)." In the holes paragraph replace "(σ = 0.098)" by "(step 2's holed position law)";
    in II.2 replace "§4.6's slit, σ = 0.098" by "§4.6's slit and holed position law". §13.5's bent-cut row keeps σ as a
    *measured output* (item 41).
    *Scope:* BASE (II.2 wording STAGED). *Evidence:* CONFIRMED.

36. **Step 3 — the start side (§4.6 step 3; §6.1 stream list).**
    *Design says:* the two ends of the minor-axis segment are candidate starts; a coin (`cut.side`, p = 0.5; the row
    `cut.sideLongerBias` records NG's "unconfirmed 2 : 1 lean") picks one.
    *Code does:* no coin in any build: of all the boundary edges the minor-axis line crosses, the start is the one **most
    parallel to the major axis**; the cut leaves it along its inward normal. The recorded lean was this rule seen through
    merged sides. [READ, CONFIRMED; R-M2, R-N2; `code-neighbourhood` §6 row 7]
    *Ruling:* ADOPT (deterministic start; one fewer draw per cut, so no locality cost).
    *Editor change:* replace step 3's sentence "A coin (`cut.side`, p = 0.5; …) picks the start A." with "The start A is the
    candidate lying on the run whose chord is most nearly parallel to the working major axis (ties: the earlier run in
    boundary order) — a deterministic choice (provenance `ref:NG start-edge rule`, the same in MFCG 12710731 and VG 1.6.9)."
    Keep the runs (GEO-22) — ours (NG works on raw edges, which is the cause of its inexact arrivals). Delete the table row
    `cut.sideLongerBias` and the stream `cut.side` (item 41).
    *Scope:* BASE. *Evidence:* CONFIRMED.

37. **Steps 4–5 — corner first, far side from the corner, straight or bent (§4.6 steps 4 and 5; J-P16's fallback).**
    *Design says:* step 4 takes the far side hit by the perpendicular ray from A (NG's R1, "right in 66 %"), with a table
    probability `cut.farSideAlt` and a three-rung fallback (0 → 0.34 → R4); step 5 goes straight if a straight cut reaches
    within 2° of perpendicular on the mean run normal, else puts **one corner at half** the projection A–F.
    *Code does:* the corner is placed **before** the far side: at a bell fraction of the first leg's free length F, kept at
    least one offset (the square root of the minimum area; for streets the minimum block side) from both ends, and at the
    middle when F is under two offsets. The far side is then chosen **from the corner**: among runs whose perpendicular
    foot from the corner lies inside them, ahead and unobstructed, the one most perpendicular to the first leg; the second
    leg is that perpendicular. Straight versus bent differs by build: **MFCG 12710731 and VG 1.6.9** go straight when the
    first leg meets the far edge square within sin² > 0.99 (≈ 5.7°) and the halves balance; **NG 1.2.2** always builds the
    bend and flattens it when the corner's triangle is shallow — height under 2 model units or under 2 % of the chord (at a
    mid-course corner ≈ 2.3° per end). The 34 % "R1 mismatch" is the corner-first rule. [READ, CONFIRMED; critic X2, X3,
    R-M2, R-N2, R-V4; flatten edge checked on 177/178 recorded corners]
    *Ruling:* ADOPT corner-first and the far-side rule (the mechanism behind the measured statistics; the fallback ladder
    becomes unnecessary). CALIBRATE straight-versus-bent as a table row with two sourced values: default **flatten**
    (NG 1.2.2 — the base's bent-cut signature target is NG's, §13.5), `straightFirst` for the MFCG parity preset.
    *Editor change:* rewrite steps 4–5 as: "4. **Corner.** Cast the first leg from A along its run's inward normal; F = the
    free length to the first boundary hit. The corner sits at `o + (F − 2o)·b` from A, `b` the mean of three draws from
    `cut.t`, `o` the band's lower block depth (holed faces: `o/2`); at `F/2` when `F < 2o`. 5. **Far side and second leg.**
    Among the runs whose perpendicular foot from the corner falls inside the run, ahead of the first leg and with no other
    boundary between, take the one most nearly perpendicular to the first leg; the second leg is the perpendicular from the
    corner to it. **Straight or bent** (`cut.bendMode`, a table row): `flatten` (default; provenance `ref:NG flatten
    test`) — drop the corner (cut = A → foot) when the triangle A–corner–foot has height below `max(cut.flattenM, 0.02 ×
    |A–foot|)`, `cut.flattenM` = 0.7 m (ours: NG's two model units at its export scale, a PLAUSIBLE metre reading,
    recalibrated at M-1 on §13.5's bent-cut row); `straightFirst` (the MFCG parity preset; provenance `ref:MFCG square
    test`) — go straight when the first leg meets its far run within `asin(√0.99)` of square (≈ 84.3°) and step 8's checks
    pass, else bend as above. Two bends never." Delete `cut.farSideAlt`, its fallback sentences and J-P16's ladder; keep
    M0 (b)'s comparison as the check of the adopted rule. Renumber nothing (steps 4 and 5 keep their numbers).
    *Scope:* BASE. *Evidence:* CONFIRMED (the 0.7 m value itself is ours; its metre reading is HOLD — PLAUSIBLE and only
    labels the default's origin).

38. **Step 6 — fillets (§4.6 step 6, COV-NG-N19).**
    *Design says:* with constant probability 0.53 ("no predictor found") replace the corner by an arc whose tangent length
    is `r_t` × the shorter leg, `r_t ~ N(0.73, 0.10)` clipped.
    *Code does:* NG 1.2.2 (streets only) and MFCG 12710731 (its ward-group cut rounding) share one predictor: a corner
    stays sharp with probability `sin²(δ/2) + cos²(δ/2) · min(1, w/ℓ)` — δ the deflection, ℓ the shorter leg, w the minimum
    frontage (NG: minimum building side; MFCG: the district's minimum frontage); otherwise it becomes a circular arc tangent
    over the **whole shorter leg**, sampled at steps ≥ w; an arc with fewer than 3 points or leaving the face stays sharp;
    lot cuts are never filleted. The 0.73 was the measurement's leg reconstruction; expected fillets under the rule 209.9
    against 200 observed of 378. [READ, CONFIRMED; `code-neighbourhood` §2.3, §6 rows 11–13 (checked against captures);
    `code-mfcg` §2.11.2]
    *Ruling:* ADOPT (restated): sharp turns and short legs stay sharp, gentle turns on long legs curve — a legible,
    realistic rule, and the measured 53 % is its output.
    *Editor change:* replace step 6 with: "**Fillet (COV-NG-N19).** Lane and street cuts only (never lot cuts): with
    deflection δ at the corner and shorter leg ℓ, keep the corner sharp with probability `sin²(δ/2) + cos²(δ/2)·min(1,
    w/ℓ)`, `w` the band's minimum plot frontage (one draw from `cut.arc`); otherwise replace it by the circular arc tangent
    to both legs at the far end of the shorter leg (the whole shorter leg curves), sampled in equal chords of at least `w`
    and at least the lattice minimum edge; an arc of fewer than three points or one leaving the face keeps the corner sharp
    (provenance `ref:NG fillet rule`, shared by MFCG 12710731)." Delete the `r_t` row and its §6.1/§7.7 mentions if any.
    *Scope:* BASE. *Evidence:* CONFIRMED.

39. **Step 8 — the ladder's first rung and its citation (§4.6 step 8; §3.5's "Alternative cut" row; §1.3).**
    *Design says:* rung (a) "redraw `f` (≤ 2 more candidates, ≤ 3 in all; NG's ≈ 4 % 'Alternative cut')".
    *Code does:* NG's plain bisector never logs; it retries on imbalance or a missing far edge in frames **turned by 36°**
    (ten attempts), then leaves the face whole. "Alternative cut" is only the hole-aware bisector's balance message (≤ 20
    random-frame retries, then accepted). MFCG retries the same way (attempts 0–10, 36° frames) and restarts the whole city
    when a polygon cannot be cut. [READ, CONFIRMED; `code-neighbourhood` §6 rows 14–15; `code-mfcg` §2.11.3]
    *Ruling:* KEEP OURS (the bounded ladder with pre-cut, substitution and no restart is more robust — §5.1), and ADOPT the
    rotated frame for rung (a): a redraw of `f` on the same frame often fails the same way; a turned frame is a genuinely
    different cut.
    *Editor change:* rung (a) becomes "(a) re-plan in the working frame turned by 36° (≤ 2 more frames, ≤ 3 in all), each
    with its own step-2 draw (provenance `ref:NG rotated-frame retry`)". In §3.5's table row and in §1.3 replace "NG's
    'Alternative cut' / 'Trying again' retries" with "NG's silent rotated-frame retries and its hole-aware bisector's
    'Alternative cut' / 'Trying again' loops".
    *Scope:* BASE. *Evidence:* CONFIRMED.

40. **Step 9 — lane width (§4.6 step 9, COV-NG-N20; II.2's template road widths).**
    *Design says:* `w = a_district + b·(L + e·n_free)`, `e = 0.025 ×` the median cut length ("≈ 5 model units per free end").
    *Code does:* NG's width is the per-map minimum plus the per-map range times `min(1, L/axis)^p` — L the cut's own kerb-
    to-kerb length, axis the template's axis length, the exponent p drawn per map in [0.5, 2]; the drawn stroke is the
    model width × the palette's road ratio. There is **no free-end term**: drawn junction ends extend 0.3 × the crossed
    road's width past the cut, which the drawn-length fit read as a free-end effect. Restated from the seed alone, the law
    reproduces every drawn width of the eight vertex maps to rms ≤ 0.0008 model units. [READ + CHECKED, CONFIRMED;
    `code-neighbourhood` §0 #2, §6 rows 5–6; re-executed by the critic, R-N5]
    *Ruling:* CALIBRATE: remove the artefact; take the law's shape (longer cuts wider, saturating) with our metric band.
    *Editor change:* replace step 9's formula sentence with: "`w = w_lo + (w_hi − w_lo) · min(1, L / L_ref)^p` — `[w_lo,
    w_hi]` the class's metric width band (alleys 2–3 m, lanes 3–5 m), L the lane's final kerb-to-kerb length, `L_ref` the
    district's working major-axis length, `p` drawn once per district from `cut.width` log-uniformly in [0.5, 2]
    (provenance `ref:NG width law`, re-expressed in metres; the free-end term is withdrawn — it was a drawing artefact)."
    Keep "never narrower than a lower class" and the `secondary` typing rule. II.2: "template roads take fixed per-district
    widths" stays; add "(NG draws them as its per-map maximum)".
    *Scope:* BASE. *Evidence:* CONFIRMED.

41. **Consequences in the stream list and the parity rows (§6.1 stream names; §13.5 "bent-cut signature" row; §7.7 if
    it names `r_t`).**
    *Design says:* streams `cut.t`, `cut.side`, `cut.arc`, `cut.width`, `cut.farSideAlt`; §13.5's target row reads NG's
    measured start law "N(0.5, σ) … σ 0.066 / 0.098 … 53 % filleted", bars "σ within ± 0.02; corner within 0.10 of
    mid-course ≥ 80 %".
    *Code does:* as items 34–40.
    *Ruling:* CALIBRATE: the measured numbers are **outputs** of NG's mechanism and stay valid parity targets when measured
    the same way; only the generative streams change.
    *Editor change:* in §6.1 delete `cut.side` and `cut.farSideAlt`, add `cut.stop` after `cut.t`. In §13.5's bent-cut row
    prefix the reference cell with "measured outputs of NG 1.2.2's mechanism (reproduced by §4.6's restated law):" and add
    to its bars "fillet share within ± 0.05 of NG's on the same face shapes (the rule predicts 209.9 of 378 where 200 were
    observed)". No golden exists yet, so no golden shift is declared (§13.3); the M-1 calibration of the band rows reads
    the new semantics (items 34, 37).
    *Scope:* BASE. *Evidence:* CONFIRMED.

42. **"NG's 42 % discarded lot leaves" (§1.3; §4.7 S10 (10); §5.2 F-PLOT's baseline; §4.6 deep-interior calibration
    note).**
    *Design says:* NG "silently discarded" 42 % of lot leaves; "NG's ≈ 42 % discard becomes 0 by construction".
    *Code does:* NG builds a lot only when (a) one edge lies on the block boundary (frontage, tested before any setback),
    (b) it passes a shape test (area ≥ half the minimum building area, fills ≥ half its box, aspect < 3) and (c) no edge lies
    on the hood outline. Frontage-less lots are never built by design — they **are the court**, which gets the block's green
    and trees when every frontage lot is valid (or on a coin with the leafy tag). The 42 % is these three rules, not a
    failure. [READ, CONFIRMED; `code-neighbourhood` §0 #5, §6 row 21]
    *Ruling:* KEEP OURS (every plot has access by construction; interiors chosen by the deep-interior rule and item 30's
    reach) — correct the characterisation; NG's court frequency is an output of block and lot sizes, not a drawn share.
    *Editor change:* §1.3: replace "42 % silently discarded lot leaves" with "a court left wherever lots have no frontage
    (42 % of lot leaves, by construction rather than by error)". §4.7 (10): replace "NG's ≈ 42 % discard becomes 0 by
    construction" with "every plot is built with an access edge; NG's frontage-less lots (≈ 42 %, which form its courts)
    have no counterpart outside the deep-interior rule". §5.2 F-PLOT test cell: replace "NG baseline: 42 % of lot leaves
    discarded" with "NG baseline: ≈ 42 % of lot leaves frontage-less (its courts)". §4.6 deep-interior paragraph: after
    "calibrated at M-1 on NG's hollow-block frequency" add "(an output of NG's no-frontage rule on its block and lot sizes)".
    *Scope:* BASE. *Evidence:* CONFIRMED.

43. **Front-line jitter (§4.7 S11's arrangement parameters: "front-line jitter (MFCG `Offset`, NG's uneven streetwall — a
    parameter …)").**
    *Design says:* a parameter with values {0} ∪ [25 cm, max].
    *Code does:* both MFCG 12710731 (its default "Offset" processing) and NG 1.2.2 recede each lot's street side by
    intersecting the lot with the whole block outline shifted toward the block centroid by `h = u · min(√(lot area)/3, cap)`,
    skipped when `h` is below a floor: MFCG's cap 1.2 units (4.8 m) and floor 0.5 unit (2 m); NG's cap is half its maximum
    street width times a per-map factor in [0, 2]. It trims only the street-facing sides and misaligns on curved blocks (the
    creator's stated doubt). [READ, CONFIRMED; `code-mfcg` §2.11.4, §6 row 17; `code-neighbourhood` §6 row 22]
    *Ruling:* CALIBRATE the law's shape (area-scaled, uniform, floored); KEEP OURS for the construction (we move the
    footprint's front line along the frontage band, which stays exact on bent and curved frontages) and for the defaults
    (realism: a 2–5 m recession is a village look, not a streetwall).
    *Editor change:* replace the parenthesis with "front-line jitter — per plot `h = u · min(√(plot area)/3, jitter.maxM)`,
    applied only when `h ≥ jitter.minM`, measured along the frontage band's normal (provenance `ref:MFCG Offset law`);
    defaults ours by band (`jitter.maxM` 0.3–1.5 m, `jitter.minM` 0.25 m); the MFCG parity preset reads 4.8 m and 2 m".
    Keep the attraction note ({0} ∪ [25 cm, max]).
    *Scope:* BASE. *Evidence:* CONFIRMED.

44. **"NG's walled manor compound" (§2.5 PlotBound; §4.7 S11 "set-back compound" row; II.3's last sentence; §15.1 C3).**
    *Design says:* the enclosure wall and gate reproduce "NG's walled manor compound" (COV-NG-N27).
    *Code does:* NG 1.2.2 has no wall, gate or enclosure anywhere; the white stone pieces the profile read as walls are
    the large building's end pavilions and ridge strips (plus chimneys, wells, fountains, cupola tips). [READ, CONFIRMED;
    `code-neighbourhood` §0 #9, §6 row 29; screenshot crop viewed by the reader]
    *Ruling:* KEEP OURS (the wall is ours — realism: manor and inn compounds were enclosed); provenance `own` with the
    `extension` marker, so the NG parity preset switches the enclosure off.
    *Editor change:* §2.5: replace "(VIS-8; NG's walled manor compound, COV-NG-N27; FTG's fences, COV-FTG-F23)" with "(VIS-8;
    our compound enclosure — NG draws none; FTG's fences, COV-FTG-F23)". §4.7 S11 table, set-back compound row: replace
    "(NG's walled manor compound)" with "(ours; an extension the NG preset switches off)". II.3: replace "so the close-up
    draws NG's walled compound from model data (COV-NG-N27)" with "so the close-up draws a compound's enclosure from model
    data (ours; NG's manors stand unenclosed)". §15.1 C3: after "boundary treatments" add "(the enclosure is ours; NG has
    none)".
    *Scope:* BASE. *Evidence:* CONFIRMED.

## B. Walls, gates, castle, districts (§4.2 S3, §4.4, §4.5, §4.8, §5.2, §7.1)

45. **The castle repair — its target and order (§1.4 "walls, gates, castle" row; §4.8 "Compactness (F-CASTLE)"; §5.2
    F-CASTLE ladder; §7.1's `equalize` warp kernel).**
    *Design says:* "repaired in place first, in MFCG's order: equalise the claim polygon's angles toward the regular
    polygon's (≤ 20 iterations), then bloat it about its centroid in 5 % steps"; the `equalize` kernel "moves its vertices
    toward equal interior angles".
    *Code does:* MFCG 12710731 runs **bloat first** — while the citadel's nearest vertex lies within 10 units (40 m) of its
    centroid, it pushes mesh vertices radially — and **then equalises** — each pass moves every free vertex 20 % toward its
    place on the **best-fit regular polygon** (the outline's first Fourier component about the centroid), the gate pinned,
    until compactness 4πA/P² ≥ 0.75; a pass gaining under 0.001 aborts the attempt (the city restarts). Its Equalize warp
    tool is the same routine on the hovered cell without pins. [READ, CONFIRMED; `code-mfcg` §0 #8, §2.4, §2.13, §6 row 8]
    *Ruling:* ADOPT the equalise target (a regular-polygon fit is well defined; "equal angles" is not — a thin rectangle
    has equal angles and fails compactness) and CALIBRATE the order (thinness before shape). KEEP OURS for the bloat's
    mechanism (a claim scale inside the reservation, not a warp of committed geometry) and for the stall exit (next rung,
    never a restart).
    *Editor change:* §4.8: replace "in MFCG's order: equalise the claim polygon's angles toward the regular polygon's (≤ 20
    iterations), then bloat it about its centroid in 5 % steps up to its area band's top" with "in MFCG's order: first, if
    the claim's nearest boundary vertex lies within `castle.minInnerM` (40 m, MFCG's coded 10 units) of its centroid, bloat
    it about the centroid in 5 % steps until it does not or its area band's top is reached; then equalise — each pass moves
    every vertex except the town-side gate 20 % of the way to its place on the claim's best-fit regular polygon (same vertex
    count; centre, radius and phase from the ring's first Fourier component about the centroid), ≤ 20 passes, stopping at
    compactness ≥ 0.75 or when a pass gains under 0.001 (provenance `ref:MFCG castle repair`)". Mirror the order in §5.2's
    F-CASTLE ladder cell and in §1.4's row ("thinness bloat, then equalisation toward the best-fit regular polygon"). §7.1
    warp table, Equalize row: "each cell under the brush moves its vertices `strength` × 20 % toward the cell's best-fit
    regular polygon (MFCG's tool is its castle routine)".
    *Scope:* BASE. *Evidence:* CONFIRMED.

46. **The gate law's coastal factor, and the wall trace's smoothing count (§4.2 S3 (4); §4.4's trace sentence;
    §13.5 "towers and gates" row).**
    *Design says:* `N₁ = round(1 + 0.47·√A_ha)`, fitted to MFCG's 5 / 8 / 12 gates (and 18 at size 200); the trace gets
    "pinned-vertex Laplacian smoothing" (pass count unstated).
    *Code does:* MFCG's coded count is 2 + ⌊inner cells ÷ 12 × k⌋, `k` = 0.75 when the town has a coast, else 1 (all seven
    recorded automatic counts reproduce, coastal ones included: size 80 with a coast gives 7); picks repel by cyclic
    distance. The wall ring gets **three** Laplacian passes with the shore and citadel vertices pinned. [READ, CONFIRMED;
    critic R-M4; `code-mfcg` §2.4]
    *Ruling:* KEEP OURS for the area law (metric; MFCG counts mesh cells, whose size grows with the town, so its linear
    cell law and our √A law agree on the coastless sweep) and for the nested terrain-scored picks (prefix-stable);
    CALIBRATE the waterfront reduction and the pass count.
    *Editor change:* in §4.2 S3 (4) after the `N₁` formula add: "With a waterfront on the stage-1 boundary (coast or lake
    shore), `N₁ = 2 + ⌊0.75·(N_land − 2) + ½⌋`, `N_land` the land law's value (provenance `ref:MFCG gate law`, coded
    coastal factor 0.75; it reproduces MFCG's coastal counts 4 / 7 / 10 / 14 where the land law gives 5 / 8 / 12 / 18)."
    In §4.4's trace chain replace "pinned-vertex Laplacian smoothing" with "pinned-vertex Laplacian smoothing (3 passes,
    `wall.smoothPasses`, provenance `ref:MFCG wall smoothing`)". In §13.5's towers-and-gates row add "; with a coast
    4 / 7 / 10 (coded law)".
    *Scope:* BASE. *Evidence:* CONFIRMED.

47. **District growth rates (§4.5 "Grower").**
    *Design says:* seeds at features plus a density-guided remainder; a grower claims adjacent faces with `validateEdge`
    (no arterial ≥ primary, no wall, no water, no reservation boundary) and `validatePatch`; the count law
    `N_d = round(3.5·√(A_ha/10))`.
    *Code does:* MFCG keeps a shuffled subset of ⌊√(city cells)⌋ seeds (features first, padded with random cells) and grows
    them round-robin: each grower **skips its turn with probability 1 − rate** (castle, gate and bridge seeds 0.1; river-
    bank seeds 0.5; others 1), gathers unassigned neighbours across each edge with probability compatibility ×
    permeability (walls and canals 0, roads 0.9, else 1; dock and non-dock cells never mix) and absorbs one at random;
    leftovers seed new districts. [READ, CONFIRMED; critic R-M6 (parameters), `code-mfcg` §0 #4, §2.10]
    *Ruling:* ADOPT the per-kind growth rate (it keeps gate, castle and bridge districts small and lets centre districts
    spread — a realistic size variety the design lacks); KEEP OURS for arterial barriers (realism: quarters are bounded by
    main streets; our quarter tree needs them) and for the count law (metric; consistent with ⌊√cells⌋ on MFCG's sweep).
    *Editor change:* after "claims adjacent coarse faces" insert: "in round-robin turns, each grower skipping a turn with
    probability `1 − rate(kind)` — `district.growthRate` rows: gate, castle and bridgehead seeds 0.1, riverbank 0.5, every
    other kind 1 (provenance `ref:MFCG grower rates`) — and absorbing one admissible neighbour per turn, drawn from
    `district.seed`". Add to the Grower paragraph's count sentence: "(MFCG 12710731 keeps ⌊√(city cells)⌋ seeds, which this
    law matches in metric terms on its size sweep)".
    *Scope:* BASE. *Evidence:* CONFIRMED.

## C. Content, parity baselines and FTG's payload (§1.4, §2.6, §13.5)

48. **MFCG's population figure (§1.4 "content" row; §13.5 "population and buildings" row).**
    *Design says:* "population ≈ 6.12 × buildings" (a multiplier; the critic's constant in [6.12, 6.13)).
    *Code does:* the displayed population is **6 × the lot count, rounded up at the second significant figure** (it
    reproduces 856 → ~5 200 and 3 423 → ~21 000 exactly); the blueprint's override is rounded the same way; MFCG's
    "buildings" are its lots. [READ, CONFIRMED; critic R-M5]
    *Ruling:* KEEP OURS (the roster-first population, O7); CALIBRATE the descriptive text.
    *Editor change:* §1.4: replace "population ≈ 6.12 × buildings" with "population = 6 × lots, rounded up to two
    significant figures". §13.5: replace "MFCG ≈ 6.12 persons per building (a multiplier)" with "MFCG 6 persons per lot,
    rounded up to two significant figures (a multiplier)".
    *Scope:* BASE. *Evidence:* CONFIRMED.

49. **FTG's "lots" were lawn patches — withdraw every calibration on them (§1.4 "districts" and "blocks → plots" rows;
    §13.5 "blocks" and "plot-area gradient" rows).**
    *Design says:* "441 m² in every class" (FTG's block lots, a **weakness**: no gradient); "containment 53 %"; "49 % of
    buildings in no ring".
    *Code does:* payload field 9 is **ground-cover texture patches grouped by texture**; the 901 "lots" are lawn patches,
    the "plazas" road-paving patches, the "reserved natural areas" sand. FTG never sends lots or plots; plot subdivision
    and "fill dense" are server services on road-graph faces. [READ, CONFIRMED; critic P2, R-T3, binding R10; `code-ftg-
    client` §0 #3, §6 C4, C29–C30]
    *Ruling:* CALIBRATE — withdraw (R10). The weakness "no plot-area gradient" has no FTG evidence left; our own bars stand
    as C-class rules.
    *Editor change:* §1.4 "blocks → plots" row, FTG cell: replace "strips / centroid cuts / shrink-then-split; 441 m² in every
    class; no owner (`_critic-ftg.md` F17)" with "strips / centroid cuts / shrink-then-split, run server-side on road-graph
    faces; no lot or plot is sent to the client (`_critic-ftg.md` F17; the client reading)". §1.4 "districts" row: delete "49 %
    of buildings in no ring (`_critic-ftg.md` F4/F13)" and, in the discards cell, "(containment 53 %)" — both rest on F13's
    lawn-patch polygons (HOLD for the 49 % figure only: an editor who re-derives it from the district rings may restore it
    with that source). §13.5 "blocks" row: delete the clause "FTG block-lot median 441 m² in every class — **weakness** (no
    gradient)". §13.5 "plot-area gradient" row: replace "FTG 441 m² in every class; NG Moran's I" with "NG Moran's I" (FTG
    has no plot evidence).
    *Scope:* BASE. *Evidence:* CONFIRMED (the 49 % source attribution is PLAUSIBLE; its deletion is safe either way).

50. **FTG's "entrance" is its night-light anchor (§1.4 "buildings" row; §2.6's entrance default; §13.5 "entrance rule"
    and "entrances and basements" rows).**
    *Design says:* FTG puts the entrance on the outline ≈ 3 m from the road (2.99 m measured), "retained as the main door's
    default"; §13.5 makes it a P-class **target** (2–4 m); "MFCG and FTG give one entrance to each building".
    *Code does:* payload field 8.6 is the building's **light position** (where the client draws its night light; the first
    outline edge's midpoint when absent); no door is transmitted. No door concept appears among MFCG's read model classes
    (its buildings are lot plans; its Dwellings link sends no entrance) [INFERRED from the full read]. [READ, CONFIRMED;
    `code-ftg-client` §0 #4, §6 C5]
    *Ruling:* KEEP OURS — the main door on the access edge is the **owner's** rule (item 29), not a parity behaviour; the
    measured 2.99 m describes a light anchor and leaves the parity table.
    *Editor change:* §1.4 buildings row, FTG cell: replace "entrance on the outline ≈ 3 m from the road (C9; 2.99 m
    measured, §13.5)" with "a light anchor on the road-facing edge (no door is sent)"; adopted cell: replace "FTG's entrance
    rule retained as the main door's default" with "the owner's main-door rule (item 29) as the default". §13.5: the
    "entrance rule" row's reference cell becomes "— (owner rule, item 29; FTG's measured 2.99 m is a light anchor)" and its
    class P → C with bar "100 % on the access edge"; in "entrances and basements" replace "MFCG and FTG give one entrance to
    each building — the **target** above" with "neither MFCG nor FTG models a door". In §2.6, wherever the entrance default
    cites FTG as its source, change the provenance to `owner`.
    *Scope:* BASE. *Evidence:* CONFIRMED.

51. **Failure and determinism rows cite the references' retry and stream wrongly (§5.1 principle 1; §1.4 "determinism"
    and "failure policy" rows).**
    *Design says:* "VG's silent seed swap (4 of 27 attempts)"; MFCG "one MINSTD stream, retry continues the stream".
    *Code does:* VG 1.6.9 retries a failed build with **one generator step of the failed seed** (all three recorded
    failure pairs reproduce) — deterministic, not a random swap; NG 1.2.2 also regenerates the whole map at seed + 1 on any
    exception (never triggered in the corpus); MFCG's retry wraps **all nine stages** and continues one stream, which also
    has a save/restore slot and **per-cell seeds** that isolate every ward's geometry. [READ, CONFIRMED; critic R-V1, P1;
    `code-mfcg` §0 #1, #3; `code-neighbourhood` §6 row 16]
    *Ruling:* KEEP OURS (no restart path; keyed sub-streams) — correct the citations. MFCG's per-cell seeds are prior art
    for our keyed streams (provenance note only).
    *Editor change:* §5.1 (1): replace "and VG's silent seed swap (4 of 27 attempts)" with "VG's whole-build retry on the
    failed seed's next generator state (4 of 27 attempts) and NG's whole-map retry at seed + 1". §1.4 determinism row, MFCG
    cell: "one MINSTD stream with a save/restore slot and per-cell seeds for ward geometry; a retry continues the stream
    (A2)". §1.4 failure-policy row, MFCG cell: "whole-city retry of all nine stages (ST-8)".
    *Scope:* BASE. *Evidence:* CONFIRMED.

52. **Session-history and view independence — a test the references fail (§6.2 what a seed determines; §6.5 lint;
    §13.3 goldens).**
    *Design says:* sub-streams keyed by address; Enter = seed + 1; stamp tiles built at product build time.
    *Code does:* in every Haxe reference the Enter successor is the stream state the **renderer** leaves (MFCG, VG, NG);
    MFCG, VG and NG cache their tree-spacing tiles per session, so a map reached after others can differ from a fresh load
    of the same seed; Dwellings rewinds to the **clock** in houses whose rooms all take first-list roles; Fantasy Manor
    seeds from the page-load millisecond. [READ, CONFIRMED for the mechanisms; the visible divergences are PLAUSIBLE —
    `code-neighbourhood` §8 #4, `code-dwellings` C21]
    *Ruling:* KEEP OURS (already immune by construction) and add the test that proves it, since the failure is real in
    every reference.
    *Editor change:* in §13.3 add a determinism test: "**history independence** — for 20 seeds, the model digest of seed s
    generated first in a fresh process equals its digest when generated after 50 other maps and after every view toggle
    and zoom stop (render draws never touch a model stream; no cache is keyed by anything but its content)". In §6.5's
    lint list, if the clock ban is not already explicit, add "no clock or `Date` read on any generation path".
    *Scope:* BASE. *Evidence:* CONFIRMED (the test's motive; the design change itself carries no reference fact).

## D. Kernel and rendering rows (§3.1, §8.2, §8.4, §9.3, §10.4, §15.1)

53. **Build-versus-adopt rows (§3.1: Poisson-disc, marching squares, path search; §13.5 "tree scatter" row).**
    *Design says:* Bridson "k = 50 candidates, all evaluated (the references' measured variant, `_critic.md` C2)" — the
    critic C2 had it "domain-warped"; marching squares "VG's `createDeflection` hot spot avoided by construction"; path
    search "the 2017 'A\*' is a FIFO BFS".
    *Code does:* the four Haxe apps' pattern sampler draws its 50 candidates in the thin annulus **[r, 1.1 r]** (dense
    packing) on a **torus** (the "warp" is a wrap that makes the tile periodic); domain warping is only in VG's forest noise.
    VG's hot routine is a **water-repulsion steering field** for roads and the highway entrance, not shore extraction; VG's
    shores are the cell-edge staircase relaxed twice and resampled. MFCG 12710731's street search is also FIFO without a
    heuristic. [READ, CONFIRMED; critic X8; `code-village` §0 #3, C7–C8, C21; `code-mfcg` §6 rows 10, 21]
    *Ruling:* CALIBRATE the Poisson row (the annulus is a real parameter that sets packing density); KEEP OURS for marching
    squares (smoother, exact contours) with the corrected note; path search unchanged (binary-heap A\*).
    *Editor change:* Poisson row: after "all evaluated" insert "in the candidate annulus [r₀, 1.1 r₀] on a torus (`poisson.
    annulus`, provenance `ref:MFCG/VG/NG/Dwellings sampler`; Bridson's textbook [r, 2r] is the alternative value)" and
    replace "`_critic.md` C2" with "`_critic.md` C2 as corrected by the code readings (a torus wrap, not a warp)". Marching-
    squares row: replace "VG's `createDeflection` hot spot avoided by construction" with "VG's costliest terrain routine
    is a road-steering water field (§4.4 may use a distance field for that purpose); its shores are relaxed cell-edge
    staircases, which our extraction replaces". Path-search row: "(the 2017 'A\*' and MFCG 12710731's street search are FIFO
    searches, not reproduced)". §13.5 tree-scatter row: "MFCG / NG Bridson k = 50 in a [r, 1.1 r] annulus on a periodic
    tile".
    *Scope:* BASE. *Evidence:* CONFIRMED.

54. **The raised under-copy is a class-dependent front (§8.4 "Two different things (K06)"; §8.2's `raised(offset)`
    symbolisation row; §8.2 layer-order slot 11).**
    *Design says:* "a dark copy of each footprint beneath it at one constant offset … not height-dependent".
    *Code does:* MFCG's Raised (on by default) extrudes each footprint's viewer-facing edge runs by 1.2 × a **per-class
    raise** in the wall colour — houses 0.5 unit (2 m), keeps and cathedrals 1 unit (4 m), farmhouses 0.3 unit (1.2 m) —
    and draws the roof lifted by the raise; landmarks are drawn solid. [READ, CONFIRMED; `code-mfcg` §2.12, §6 row 26]
    *Ruling:* CALIBRATE: keep the construction ours (a swept under-copy is visually equivalent for the front faces) but
    make the offset a class row; realism: taller building classes show taller fronts.
    *Editor change:* §8.4: replace "at one constant offset (§8.2's symbolisation row) — ON by default in `ink`, not a shadow,
    not height-dependent" with "swept by an offset read from a class row — house 1, landmark (keep, temple, hall) 2, farm
    building 0.6 of the sheet's base offset (provenance `ref:MFCG raise ratios`) — ON by default in `ink`; not a shadow and
    not sun-dependent". §8.2's `raised(offset)` becomes `raised(offset, classRatio)`.
    *Scope:* BASE. *Evidence:* CONFIRMED.

55. **The area-label spine prefers horizontal paths (§9.3 "Area labels").**
    *Design says:* the spine is the longest path of the maximum-clearance tree; candidates: spine, central 80 %, OBB line,
    OBB arc.
    *Code does:* MFCG's curved label takes the skeleton path between the pair of outline vertices that **maximises
    distance plus horizontal separation**, uses at most its central 80 %, and retries the skeleton with 1-unit vertex jitter
    until it closes. FTG's district label has no spine (the box's long axis bent onto a fixed arc). [READ, CONFIRMED;
    `code-mfcg` §2.12, §6 row 22; `code-ftg-client` §6 C24]
    *Ruling:* KEEP OURS (hole-aware, clearance-first, no jitter retries) and ADOPT the horizontality preference as the
    first candidate (legibility floor: horizontal labels read faster).
    *Editor change:* in the candidate list insert before "the spine": "the **horizontal spine** — among the tree's
    leaf-to-leaf paths, the one maximising length plus its horizontal extent in view coordinates (evaluated over leaf pairs
    when the tree has ≤ 64 leaves, else skipped; provenance `ref:MFCG label path choice`)".
    *Scope:* BASE. *Evidence:* CONFIRMED.

56. **Naming parity row (§15.1 D1; §10.4's reference note if any).**
    *Design says:* D1 "naming (Tracery + Markov, feature-conditioned)".
    *Code does:* MFCG 12710731 builds four Markov models at start-up but its grammar never calls them; names come from a
    feature-conditioned grammar with deck selection; NG's optional-rule marker is a Bernoulli gate with deck selection and
    redraw. [READ, CONFIRMED; `code-mfcg` §0 list, §6 row 23; `code-neighbourhood` §6 row 38]
    *Ruling:* KEEP OURS (our engine's syllable and Markov generators serve user corpora, §10.4); correct the row.
    *Editor change:* §15.1 D1 capability cell: "naming (a feature-conditioned deck grammar; MFCG's Markov models are built
    but unused)".
    *Scope:* BASE. *Evidence:* CONFIRMED.

57. **The sector-look field preset and the farm-field split (§4.9 S12a field systems).**
    *Design says:* "the MFCG/VG **sector look** (Voronoi of ring seeds ∩ land cut by the OBB bisector, the recorded
    construction) as a style preset".
    *Code does:* the two differ. **VG 1.6.9**: Voronoi seeds on the highway, the shores and a ring, spacing falling from 120
    to 50 model units as density rises; cells clipped to land and to the highway's sides; right-angled bisection; lots kept
    when ≥ 0.55 rectangular and aspect ≥ 0.4; lots **claimed by greedy growth outward from the houses' centroid** until
    1 000 area units per house (× the field factor). **MFCG 12710731**: the farm belt is bounded by a two-harmonic lobed
    radius around the town; each farm cell is split recursively while its area is ≥ 400·(1 + folded draw) units² (0.64–1.28
    ha), across the box's long side at 0.5 ± 0.2, square or skewed up to ±22.5° half the time, with 8 m paths; one sub-plot
    in five gets a farmhouse. [READ, CONFIRMED; `code-village` §0 #9, C23; `code-mfcg` §2.7, §2.11.5, §6 row 20]
    *Ruling:* CALIBRATE: the preset names its two sources separately; ADOPT VG's greedy outward claim as the preset's
    selection rule (it is our demand-sized land use in miniature — realism: fields nearest the settlement are taken first).
    *Editor change:* replace the parenthesis with "(VG 1.6.9: Voronoi seeds on the main road, shores and a ring, cells
    bisected at right angles, fields claimed outward from the settlement's centre until the land-use demand is met;
    MFCG 12710731's variant: a lobed farm belt split recursively into 0.6–1.3 ha fields by square or skewed cuts with 8 m
    paths, a farmstead on one field in five — provenance `ref:VG field sectors`, `ref:MFCG farm splits`)".
    *Scope:* BASE (a style preset). *Evidence:* CONFIRMED.

## E. Staged subjects — hook text and calibration notes only (stage 2, stage 3, the plan rung, the village)

58. **Stage 2 (neighbourhoods): ring fabric, pins and greens, the `hatched` render laws, NG's scale (II.2 RingFabric;
    II.3; §8.2's layer-order note for NG; §13.5's draw-style row).**
    *Design says:* II.2 ring roads "at a radius law (a table)"; II.3 "NG's `createGreen` on 23–58 % of Normal blocks with
    no target is the failure"; pins by a probability gate per kind; §8.2 "NG's (… → trees depth-sorted → title)"; §13.5
    `hatched` "no ridge stroke"; CONFIDENCE C8 "NG has no metric".
    *Code does (NG 1.2.2):* (a) each ring road is a hexagon at one radius with a shared phase and a bell jitter per vertex,
    smoothed by three corner-cutting passes (48 vertices); spacing starts at the minimum block side plus a uniform share of
    the remaining radius and widens by a factor (1 + folded draw) per ring; an uncut centre becomes a square, a green or a
    manor at equal odds, and with neither greens nor trees the innermost ring closes into a plaza loop. (b) A court gets
    green and trees when its whole frontage ring built, or on a coin with the leafy tag — a rule, not a target-less draw.
    (c) Pins (wells, large trees, fountains) come only from empty blocks, one weighted pick each, the picked kind's weight
    divided by ten afterwards; the ordinary block's pin routine is an empty stub. (d) Trees are **not** depth-sorted:
    large-tree pins sit under the houses, block trees above everything, smaller first within a block. (e) Hatching runs
    parallel to the ridge from both gable ends (one taper per end to a random point up to mid-chord), plus two heavier ridge
    tapers of 30–50 % — filled tapers, not a ridge stroke. (f) The GeoJSON export writes 0.35 per model unit.
    [READ, CONFIRMED for (a)–(f)'s mechanisms; `code-neighbourhood` §6 rows 18–19, 24–28, 36; the metre reading of (f) is
    HOLD — PLAUSIBLE]
    *Ruling:* CALIBRATE: (a) becomes RingFabric's default ring-course construction and spacing law (provenance
    `ref:NG ring courses`); (b) the II.3 characterisation is corrected — KEEP OURS for the per-band green target; (c) ADOPT
    the weight-decay idea for pin variety (the chosen kind's weight ÷ 10); (d) and (e) correct the render notes; (f) HOLD.
    *Editor change:* II.2: after "at a radius law (a table)" add "— default: each ring a jittered hexagon smoothed by three
    corner-cutting passes, ring spacing widening outward by a per-ring factor in [1, 2); an uncut centre becomes a square,
    green or manor block at equal odds (provenance `ref:NG ring courses`)". II.3: replace "NG's `createGreen` on 23–58 % of
    Normal blocks with no target is the failure — ours has a target per band" with "NG greens a court whenever its frontage
    ring is complete, so its green share follows block and lot sizes (23–58 % of ordinary blocks) — ours has a target per
    band"; after "by a probability gate per kind and band" add "with the chosen kind's weight divided by 10 for the rest of
    the block's picks (provenance `ref:NG pin decay`)". §8.2 layer-order note: replace "trees depth-sorted" with "large-
    tree pins under buildings, block trees above them". §13.5 draw-style row: after "no ridge stroke" add "(two filled
    ridge tapers of 30–50 % per wing are part of the triangle count)". (f): no edit until Fable's pass; then II.2 may state
    NG's hood span (≈ 525 m for the medium area template) as a descriptive calibration anchor.
    *Scope:* STAGED (stage 2). *Evidence:* CONFIRMED except (f) HOLD.

59. **Stage 3 (Fantasy-Manor-class buildings): the hook's assumptions (§2.6 "The stage-3 hook and its cost contract";
    §12.7's stage-3 bullet; §2.6 `RoofSpec`).**
    *Design says:* stage 3 is "a lot-driven Fantasy-Manor-class generator (… a lot-derived path of wings, orientation fixed
    by the frontage, the lot polygon in the collision set …)"; budgets cite SCL-13.
    *Code does (Fantasy Manor 1.0.0, build 890; every class read, 51 recorded generations replayed exactly):* the model's
    whole input is **one polyline and one wing width**, so a lot-derived path plugs in directly; five layouts at equal odds
    (regular 4/5/6/8-gon rings, star-shaped 4–6-gon closed plans, arcs of 2–7 equal chords, rectangles, self-avoiding snakes
    on a 4 × 4 grid); a hip block is a separate optional record (chance 1 − width/length) whose ridge stops a quarter of
    its short side from each end — never a pyramid; the pyramids are square towers standing on blocks; about 70 % of
    "dormers" are cross-gables projecting past the eave; collisions are tested block–block, dormer–(dormer, block) and
    tower–tower only — **nothing against a wing**; one porch lottery per wing with a projecting-bay fallback, so **≈ 14 %
    of buildings have no entrance** (17–27 % of courtyard plans); the scale is fixed (800 model units span the window).
    A restatement of the model runs ≈ 0.08 ms per building warm, ≈ 0.66 ms with view geometry (reader timing).
    [READ + CHECKED, CONFIRMED; critic R-F1–R-F5; the timing is `[INFERRED]` — HOLD]
    *Ruling:* KEEP OURS on three points, each a realism or owner rule the reference breaks: the collision set gains the
    wings (no tower or block through a wing), the porch options are restricted so the main door faces the street (item 29 —
    the reference guarantees none), and the scale is metric. ADOPT the layout vocabulary as stage 3's path-shape rows and
    the block/tower distinction (already in `RoofSpec`: `hip` ≠ `pyramid`). Budgets unchanged; the timing note waits.
    *Editor change:* in §2.6's stage-3 paragraph, after "a class picker per plot from the same `ClassRules` table)" add:
    "The reference model takes one polyline and one wing width, which a lot-derived path supplies directly; its five layout
    families (regular rings of 4, 5, 6 or 8 sides; star-shaped closed plans of 4–6 corners; arcs of 2–7 equal chords;
    rectangles; grid snakes) become stage 3's path-shape rows (provenance `ref:FM layouts`); ours adds what it lacks —
    wings in the collision set, a street-facing main door on every building, metric scale". §12.7: no change now; after
    Fable's pass add "(a restated Fantasy Manor model costs ≈ 0.1 ms per building warm — the 1 ms `compose()` bound has
    headroom; SCL-13's basis were cold first-build samples)".
    *Scope:* STAGED (stage 3). *Evidence:* CONFIRMED except the timing (HOLD).

60. **The plan rung (Dwellings): baselines and the hand-off (§2.6 "Basements" emulation note; §2.6 plan rung step 5;
    §13.5 "entrances and basements" row; §15.1 G2).**
    *Design says:* Dwellings' basement share is "a descriptive baseline only"; step 5 builds a spanning tree and adds loops
    "by rule, never by chance"; G2 takes the plot and entrance directly "beyond the rasterised hand-off".
    *Code does (Dwellings 17195045):* the basement roll is **n/(n + 1)** for n storeys above ground (92/92 houses replayed),
    its outline the largest room of a throw-away coarse partition; circulation is a priced spanning tree plus **half of the
    non-redundant extra doors kept at random**, so loops exist but are uncommon; window density 0.8 on the top storey,
    0.1 less per storey below, with fixed or outline-ratio counts for some roles; entrance edges weighted toward the middle
    of long straight walls; the reference never checks that every storey got a stair; a plan wider than 11 cells arriving
    by URL is silently replaced by a random house, while NG sends widths up to 16. [READ + CHECKED, CONFIRMED; critic
    R-D1–R-D6; `code-dwellings` C3, C4, C9, C15, C29, C30, §7 gap 1]
    *Ruling:* KEEP OURS throughout (function-first plan; loops by rule; the stair bar; the direct hand-off) and CALIBRATE the
    descriptive baselines with the coded laws.
    *Editor change:* §2.6 Basements emulation note: "Dwellings' basement share (a descriptive baseline: n/(n + 1) for n
    storeys above ground, from its code, replay-confirmed) is never a gate". Step 5: append "(Dwellings keeps half of its
    non-redundant extra doors at random — a descriptive loop baseline, not our rule)". §13.5 entrances-and-basements row:
    replace "its basement share have no `baselines.json` row and are a descriptive note only" with "its basement law
    n/(n + 1) and its loop rule are descriptive notes only". §15.1 G2: append "(the reference's rasterised path drops any
    plan wider than 11 cells to a random house; ours has no such limit)".
    *Scope:* STAGED (the plan rung, item 28). *Evidence:* CONFIRMED.

61. **PART III (the village) and the VG build stamp (PART III items 1–2; §15.1 G6–G11; §13.5's build-drift sentence).**
    *Design says:* the village registers a density stage before its network and a palisade before its roads; tracker-
    steered roads; square + centrepieces, wharf and piers; §13.5 names builds 19251041 and 19365073.
    *Code does (VG 1.6.9 = build 19365073):* density is a closed per-cell formula (an elevation-band term plus a radial
    falloff from 1.5 at the centre to 0 at the view edge, tag-scaled, smoothstepped); roads advance in 5-unit steps under
    a per-type terrain weight (highway 0.5, road 1, trail 2), a water term, a target pull and a wall push, turning only past
    a rigidness gate; branches appear once no junction lies within the minimum block ÷ density; the square's rim is 12–19
    of the widest house widths; houses are frontage draws accepted with the local density; population = houses × one
    uniform draw in [3, 7]; class thresholds by house count (under 20 hamlet or roadhouse, under 200 village, under 1 000
    town); fields claimed outward to a per-house area; trees from one periodic tile; a failed build retries on the next
    generator state. The palisade point set is a jittered 10 × 10 lattice kept with probability density − 0.1.
    [READ, CONFIRMED; critic R-V1–R-V5; `code-village` §0, §7]
    *Ruling:* CALIBRATE: these are the village rung's reference observations (for the digest, attached to its own design
    decisions when the owner opens that stage); no base change. The §13.5 sentence names the version.
    *Editor change:* §13.5: "(VG changed geometry for the same seed between builds 19251041 and 19365073)" becomes
    "(… between build 19251041 and build 19365073 = VG 1.6.9)". PART III item 2: after "trackers consult it at every step"
    add "(VG 1.6.9's code confirms the order; its steering is a per-type terrain weight plus water, target and wall terms —
    reader-tier, for the village rung's calibration)". No other edit.
    *Scope:* STAGED (village). *Evidence:* CONFIRMED.

## F. The clean-room chain (§17.1)

62. **Provenance for mechanisms read in code (§17.1 (6) and (8); presupposes item 32's sentence).**
    *Design says:* provenance forms `own`, `ref:⟨reference⟩ ⟨behaviour⟩`, `owner`, …; (8) lists "the creators' stated
    ideas".
    *Code does:* — (policy item). The critic rules restatement harnesses reader-tier (R9) and logic constants admissible
    only as reference observations attached to a design decision (R5).
    *Ruling:* ADOPT a traceable provenance form that keeps class names out of the design.
    *Editor change:* (6): after the `ref:` examples add "A behaviour read in a reference's compiled code (owner directive
    2026-09-27) carries the same form with the suffix `(code)` — `ref:MFCG gate law (code)` — and its trace key is a row
    of the reader-tier provenance table `research/findings/code-impact.md` §(d), which names the build and the class; the
    design, the digest and `plat/` never carry the class." (8): append "Since 2026-09-27 also the mechanisms read in the
    references' compiled code and restated in our own terms (AMENDMENTS-2026-09-27c items 33–61); the readers' restatement
    scripts are research-side test instruments, never committed to `plat/` or shown to an implementer seat."
    *Scope:* BASE (policy). *Evidence:* — (policy; CONFIRMED that R5 and R9 exist).

---

## Ruling summary

| item | design section | ruling | scope | evidence |
|---|---|---|---|---|
| 33 | §4.6 recipe citations, slope term, §1.4 lanes row | CALIBRATE citations; KEEP OURS slope term | BASE | CONFIRMED |
| 34 | §4.6 step 1 stop test | KEEP OURS extent; ADOPT per-face random threshold | BASE | CONFIRMED |
| 35 | §4.6 step 2 position (+ holes, II.2) | ADOPT centroid-plus-bell law | BASE | CONFIRMED |
| 36 | §4.6 step 3 start | ADOPT deterministic start | BASE | CONFIRMED |
| 37 | §4.6 steps 4–5 | ADOPT corner-first far side; CALIBRATE flatten / straight-first row | BASE | CONFIRMED (0.7 m origin PLAUSIBLE) |
| 38 | §4.6 step 6 fillet | ADOPT angle-and-leg predictor, full-leg tangent | BASE | CONFIRMED |
| 39 | §4.6 step 8 ladder, §3.5, §1.3 | KEEP OURS; ADOPT rotated-frame rung (a) | BASE | CONFIRMED |
| 40 | §4.6 step 9 width | CALIBRATE: power law, no free-end term | BASE | CONFIRMED |
| 41 | §6.1 streams, §13.5 bent-cut row | CALIBRATE | BASE | CONFIRMED |
| 42 | §1.3, §4.7 (10), §5.2 F-PLOT, §4.6 interiors | KEEP OURS; correct "42 % discard" | BASE | CONFIRMED |
| 43 | §4.7 S11 front-line jitter | CALIBRATE law shape; KEEP OURS construction and defaults | BASE | CONFIRMED |
| 44 | §2.5, §4.7 S11, II.3, §15.1 C3 | KEEP OURS; provenance `own` (NG has no manor walls) | BASE | CONFIRMED |
| 45 | §1.4, §4.8, §5.2 F-CASTLE, §7.1 equalize | ADOPT regular-polygon target; CALIBRATE order | BASE | CONFIRMED |
| 46 | §4.2 S3 (4), §4.4 trace, §13.5 gates | CALIBRATE coastal factor, 3 passes; KEEP OURS law | BASE | CONFIRMED |
| 47 | §4.5 Grower | ADOPT growth rates; KEEP OURS barriers and count | BASE | CONFIRMED |
| 48 | §1.4 content, §13.5 population | CALIBRATE descriptive text | BASE | CONFIRMED |
| 49 | §1.4 two rows, §13.5 two rows | CALIBRATE: withdraw FTG lawn-patch "lots" | BASE | CONFIRMED (49 % source PLAUSIBLE) |
| 50 | §1.4, §2.6, §13.5 entrance rows | KEEP OURS (owner rule); P → C | BASE | CONFIRMED |
| 51 | §5.1 (1), §1.4 two rows | KEEP OURS; correct retry/stream citations | BASE | CONFIRMED |
| 52 | §13.3, §6.5 | KEEP OURS; add history-independence test | BASE | CONFIRMED |
| 53 | §3.1 three rows, §13.5 tree scatter | CALIBRATE annulus; KEEP OURS contours | BASE | CONFIRMED |
| 54 | §8.4, §8.2 `raised` | CALIBRATE per-class offset | BASE | CONFIRMED |
| 55 | §9.3 area labels | KEEP OURS; ADOPT horizontal-spine candidate | BASE | CONFIRMED |
| 56 | §15.1 D1 | KEEP OURS; correct row | BASE | CONFIRMED |
| 57 | §4.9 sector-look preset | CALIBRATE two sources; ADOPT outward claim | BASE | CONFIRMED |
| 58 | II.2, II.3, §8.2, §13.5 (NG) | CALIBRATE / ADOPT pin decay; (f) HOLD | STAGED | CONFIRMED; (f) PLAUSIBLE |
| 59 | §2.6 stage-3 hook, §12.7 | KEEP OURS (wings collide, street door, metric); ADOPT layout rows | STAGED | CONFIRMED; timing PLAUSIBLE |
| 60 | §2.6 plan rung, §13.5, §15.1 G2 | KEEP OURS; CALIBRATE baselines | STAGED | CONFIRMED |
| 61 | PART III, §13.5 build stamp | CALIBRATE (reference observations) | STAGED | CONFIRMED |
| 62 | §17.1 (6), (8) | ADOPT `(code)` provenance form | BASE | policy |

**Counts.** 30 items: 25 BASE (of which five — 42, 44, 48, 51, 56 — only correct a citation or a provenance), 4 STAGED
hook notes (58–61) and 1 policy item (62). By ruling (an item can carry two): ADOPT 13, KEEP OURS 18, CALIBRATE 15.
Nothing in the base's architecture changes shape: every change is a rule inside an existing stage, a table row, a test
or a citation.

63. **OWNER RULE — Clandestine institutions: a front and a hidden function (owner, 2026-09-27).** Owner: "note that for
    some assignments, some criminal like institutions or buildings have to be clandestine meaning there are certain lots
    and assignments that have two functions. A front which can be anything and a second function. the alternative is the
    hidden places as mentioned before, or being placed in the underground sewer building/network in an appropaite
    dwelling there. Think of an assasin guild in a city. It would obviosuly not parade itself as an assasin guild."
    The owner's words are the authority for this item (it is not a code-reading candidate); the consequences below are
    the program's interpretation, vetoable, built on items 12, 14, 16–19, 28–30 and the dossier contract (item 20).
    (a) CONCEALMENT IS A PROPERTY OF AN ASSIGNMENT. An institution or assignment record gains
    `concealment: 'none'|'front'|'hidden'|'underground'` (default 'none'); a dossier fact (SettlementForge may mark an
    institution clandestine and may name a preferred mode or front), otherwise chosen by the placement rules from a
    class-table column for the institution's class (a thieves' den, an assassins' house, a smugglers' store, a
    forbidden cult, a black market, a spy ring … data rows, our own). Three modes, the owner's three:
    — FRONT (dual function): the building carries two designations — `front` (a public designation the town sees:
    anything plausible — a tavern, a funeral parlour, a fencing hall, an apothecary, a warehouse, a bathhouse, a tailor)
    and `trueFunction` (the concealed one). The front is chosen from a cover table keyed by the true function (plausible
    covers per function, weighted, our own rows) unless the dossier names it; the building's CLASS, footprint, site plan,
    materials, labels and public room program are the FRONT's, so at every public zoom it reads as the front. The true
    function adds: a concealed room program (item 28: back rooms, a strongroom, a cellar or a hidden stair, placed away
    from the main entrance and reached through a service or yard door or a concealed door), an optional concealed
    entrance (item 29's `service` or `yard` role on an alley face or a passage when one presents itself), and, where
    item 12's underground layer exists and the plot lies over a sewer run, an optional concealed link down to it.
    — HIDDEN: placed on a plot whose exposure is `hidden` (item 30), typically behind a passage or in a back court, with
    or without a front.
    — UNDERGROUND: placed in item 12's underground neighbourhood, in a dwelling flush against a sewer tunnel (U1–U3), only
    where the settlement has a navigable sewer (item 14: always in cities and metropolises, rare in towns, never in
    villages); if none exists the mode falls back to front, then hidden.
    (b) PLACEMENT follows item 16's spatial-relation templates for the TRUE function (near its targets, markets, docks,
    escape routes: alleys, passages, the waterfront, a sewer outfall), constrained to plots where the FRONT is plausible
    (the front's own class rules: a tavern on a street, a warehouse at the docks); the solver's exposure row prefers
    alley, court and hidden plots for the concealed modes; prosperity bands shape which fronts and districts are used.
    (c) KNOWLEDGE, NOT GEOMETRY (as item 30): `knownTo` on the true function is `secret` by default. Public views, labels,
    descriptions, exports and the clerk show the front; the true function, its concealed rooms, doors and links appear
    only on views and answers for a viewer who holds that knowledge (a view-state switch and the clerk's reader rules,
    §9.2); a public export never carries the true function or the concealed rooms. The building is always on the map.
    (d) THE DOSSIER STAYS THE AUTHORITY (item 20): the dossier says the institution exists and is clandestine; the map
    places it and never reveals it on its own; exposure (a raid, a discovery) is a dossier change that the map applies
    as a least-disruption mutation (item 22): the front may close, the true function relocate (item 17), a passage be
    sealed (item 30). A player's map edit that deletes such a place only relocates it, as for any dossier-backed record.
    (e) MUTATION: when the front's designation changes (item 18), the true function persists and its concealed rooms are
    re-fitted; when the true function moves, the front can stay as an ordinary business.
    (f) Emulation note: no reference has concealment; FTG's secret factions and hidden societies are people-side facts,
    not places. Parity presets: concealment none.
    (g) HOMES (for the router): the concealment, front and trueFunction fields on the assignment, institution and
    building records and the cover table (§2.5, §2.6, the rule tables §7.6/§14); placement in §4.7 S10b and item 16's
    templates; the concealed rooms and doors in the plan-rung hooks (§2.6, item 28, item 29); the underground mode in
    II.7.3; knowledge and labels in §9.2 and §8 view state; the dossier and mutation rules in §7.7 and §6; exports in §11;
    §13 bars: every clandestine institution placed in one of its allowed modes, its public views and exports showing only
    the front, its concealed rooms reachable only from the concealed entrance or the front's service side, and the
    underground mode never chosen without a navigable sewer.

64. **OWNER RULE — Basement access to the sewer grid and its dwellings (owner, 2026-09-27).** Owner: "and selectively,
    some buildings that have basements have accesses to the sewer grid or a dwelling in a sewer grid where appropraite.
    higher chances if they are criminal as described above." The owner's words are the authority; the consequences are
    the program's vetoable interpretation, refining §2.6's basement paragraph and II.7.4's `AccessPoint`.
    (a) The cellar stays a cellar (item 12 and J-A12.42 stand: a cellar never becomes part of a tunnel); what it may gain
    is an ACCESS — a stair, ladder, hatch or bricked-up door down to a sewer tunnel, OR a door into an adjacent sewer
    dwelling (item 12's underground neighbourhood). (b) SELECTIVE AND APPROPRIATE: an access exists only where the
    building has a basement (item 29) and its basement ring lies over, or within a short reach of, a navigable tunnel or
    a sewer dwelling (a geometric gate on the underground arena); among those, a probability row by class × prosperity
    band (the class table's boolean `undergroundAccess` becomes a probability: breweries, bathhouses, warehouses, inns
    and old houses higher; institutions of order — a barracks, a courthouse, a temple — low or zero unless the dossier
    says otherwise), times a CONCEALMENT MULTIPLIER for item 63's clandestine institutions (a front or a hidden one:
    much higher; a table row), times the settlement's sewer existence (item 14: none in villages, rare in towns). (c) An
    access carries `knownTo` (item 30: a clandestine building's access is secret; a brewery's cellar door to the sewer is
    local), a state (open / locked / bricked / collapsed) that evolves with the network's fading (item 11), and it is
    editable. (d) It feeds the floor-plan rung (item 28: a trapdoor or stair in the basement plan) and the underground
    connection graph of item 65. (e) §13 bar: no access without a basement and a reachable tunnel or dwelling; the
    access rate by class within its row; clandestine buildings over a network carry an access at least at their row's
    rate. Staged with the sewer layer; the base carries the fields and rows.

65. **OWNER RULE — The underground layer as a family of systems, and the undercity (owner, 2026-09-27).** Owner: "one last
    thing and all of this is for the underground layer. I think the central piece is a derived sewer system as you have
    already built out. But other additions to keep in mind is catacombs (underneath cemeteries or churches for example),
    cavernous tunnels, sewer dwellings and networks, and an undercity. Those are all options that exist in the same level
    with varying degrees of connections and access between them (not always). The hardest part for me to conceptualize
    is an undercity. we already have dwellings or underbuildings that are adjacent to the sewer walls. those are more
    standoffish. But what about an undercity, what would that require? In my mind, it is still part of a sewer network
    or cavern or catacomb, but it is a large space or network where there is a collection of buildings/dwellings to be a
    microcosm of a city but of the riffraff, criminal, and less savory types or more desperate go." (Spelling normalised
    only in this copy; the owner's message is the record.) The owner's words are the authority; the consequences are the
    program's vetoable interpretation. STAGED (the underground layer comes after the city is mastered); the base carries
    the hooks.
    (a) ONE UNDERGROUND LAYER, SEVERAL SYSTEMS. The underground arena (II.7.2) holds, beside the derived SEWER network
    (the central piece, already designed): CATACOMBS (derived from cemeteries, churchyards, crypts and religious
    institutions of age: galleries and ossuary chambers under and near them, sized by the institution's age and the
    town's population history), CAVERNS (derived from geology: a karst / soluble-rock or volcanic flag on the site, S1's
    rock classes and relief; natural galleries and chambers following the rock, with water), QUARRIES and MINE VOIDS
    (derived from S1's stone resource and the town's stone building stock: the town's stone came from somewhere — old
    workings under or beside it, as under Paris), SEWER DWELLINGS AND NETWORKS (item 12's underground neighbourhoods), and
    the UNDERCITY (b). Every element keeps a depth (a depth band per gallery or chamber) so systems may pass over and
    under one another, while they are drawn and edited as one layer, as the owner asks.
    (b) THE UNDERCITY — what it requires (the owner's question). An undercity is not more sewer-front dwellings; it is a
    place with the four things that make any town a town: (1) A VOID LARGE ENOUGH TO LIVE IN: a chamber or a cluster of
    chambers from a source that explains it — a CAVERN hall, a QUARRY gallery system, a CATACOMB expanded, great CISTERNS
    or VAULTS (bridge and street vaults), or a BURIED OLD TOWN: the settlement's own earlier street level, sealed under a
    raised grade after a fire, flood or rebuilding (the evolution log supplies it: the undercity's streets ARE the old
    town's streets, under the new). (2) ITS OWN PUBLIC SPACE AND STREETS: a main chamber used as a plaza and black market,
    galleries and walkways as its streets, independent of the sewer's water channel. (3) ITS OWN INSTITUTIONS: the
    microcosm — a black market, a fence's hall, a guild seat (item 63's clandestine institutions prefer it), a tavern, a
    forbidden shrine, a fighting pit, a healer, a warren of dwellings; shanty structures, carved rooms and repurposed
    vaults, with heights capped by the ceiling. (4) LIFELINES TO THE SURFACE: food, water and air — accesses (item 64),
    air shafts that surface at wells, grates, chimneys or ruins, water from the river or a cistern, and a route to the
    outside (an outfall, a cave mouth beyond the walls). The sewer-front dwellings of item 12 become the undercity's
    outskirts (its ribbon along the tunnels); its core is the void.
    (c) EXISTENCE AND SIZE BY RULE. SIZE BOUND (owner, 2026-09-27: "i would say that the undercity is at most 1-3
    neighborhoods to keep it simple and consistent"): an undercity is ONE to THREE neighbourhoods (underground districts)
    and never more — at most one in a large town, one or two in a city, up to three in a metropolis — the count and each
    neighbourhood's size inside that bound set by population, poverty share and disorder (the same 1–3 bound the owner
    set for floating islands, item 13); item 12's ordinary sewer-front dwellings elsewhere in the network are not part of
    it and do not count against the bound, while those strung along the tunnels that lead into it are its outskirts and
    belong to its neighbourhoods. An undercity exists only in cities and metropolises (rarely a large town), only where
    a void source exists or history made one, and its population is drawn from the dossier's roster — the destitute band,
    the outlawed, the clandestine institutions — scaled by the city's population, its poverty share and its crime or
    disorder circumstance; the dossier may require one or forbid it. It grows with poverty and disorder and shrinks with
    prosperity and order, fading like the sewers (item 11): chambers flood, collapse or are sealed.
    (c′) A SHADOW, NOT A SECOND CITY (owner, 2026-09-27: "while it is called an undercity, it is simply the less than
    savory shadow and extension of the full settlement, not independent of it"). The undercity is part of THIS
    settlement's model, never a separate settlement: (1) its people are the settlement's own households and its
    institutions the settlement's own (the dossier's roster and institutions; the settlement's population totals include
    them — nobody is added by the underground); (2) each of its neighbourhoods is tied to the surface district above or
    beside it (a parent link), sits under or beside the districts that feed it (poor, dockside, market, the old core),
    joins the settlement's quarter tree for naming and labels (named as the underside of that quarter, never as a rival
    town), and follows that district's prosperity with the undercity's own lower band; (3) its economy is the surface's
    shadow — its black market trades the town's goods, its trades serve the town, its supply chains (item 16) run to the
    surface markets, docks and outfalls; (4) it has no government, walls, gates, rung or identity of its own; the
    settlement's circumstances (disorder, crime, government) drive it; (5) it grows, shrinks, floods, is sealed or cleared
    as the settlement above changes (item 31's ladder read from the surface districts it shadows).
    (d) CONNECTIONS, NOT ALWAYS: a connection graph between the systems and the surface — each link typed (open, gated,
    secret, collapsed, flooded) with `knownTo` — drawn by rule and probability, never guaranteed; a catacomb may meet the
    sewer or not; the undercity joins at least one lifeline system by definition.
    (e) THE SAME ENGINE: the underground arena reuses the surface model — faces, ways (galleries), districts, plots and
    buildings — with its own rule rows (chamber-bound plots, ceiling-capped heights, no sky); every rule stays data,
    every element is editable, the seed survives edits, and the dossier stays the authority (item 20).
    (f) Emulation note: no reference generator has an underground; these are extensions, all off in the parity presets.
    (g) HOMES (for the router): the systems, depth bands and connection graph in II.7 (a new II.7.5 undercity subsection
    and II.7.6 catacombs, caverns and quarries) and §2.7's records; the geology flag and the stone-void link in §4.2 S1
    and §2.3; the buried-old-town source in §4.11 (evolution) and §2.8; the population and institutions in §10 and item
    16's templates; layers and drawing in §8.4; exports in §11; §13 bars (an undercity only with a void source and a
    lifeline; ceiling-capped heights; every link typed and knowledge-gated).

66. **OWNER RULE — An access edit generates everything it needs (owner, 2026-09-27).** Owner: "but make it so that if a
    user edits a building to have an access to the underground, it generates all the necessary pieces". The owner's
    words are the authority; the consequences are the program's vetoable interpretation, refining items 64 and 65 and
    §7's edit kinds. STAGED with the underground layer; the base carries the edit kind and its closure rule.
    (a) ONE EDIT, ITS WHOLE CLOSURE. `addUndergroundAccess(building, target?)` is a single user edit (one event in the
    log, one undo) that the edit layer expands into the minimal set of pieces the access needs, in dependency order, as
    one transaction: (1) THE BASEMENT — if the building has none, one is derived by item 29's rules as a positive
    placement (the user's request overrides the probability, not the physics: if the terrain gate forbids a cellar — the
    flood band or the water table — the edit proposes the nearest lawful form, a half cellar on a slope or a hatch to a
    raised crawl space, or is refused with the reason, never silently); (2) THE TARGET — the named one, or by default the
    most plausible reachable underground element: the nearest navigable sewer tunnel or sewer dwelling, else a catacomb,
    cavern, quarry gallery or the undercity within reach (item 65); (3) THE CONNECTOR — when the target lies beyond the
    access reach, a dug passage is generated through the underground arena from the basement to the target (a `passage`
    gallery routed by the same kernel and cost rules as any gallery: around foundations and other cellars, above the
    water table, below the street's services, within its depth band); (4) THE SYSTEM ITSELF when none exists — a town
    without sewers or a village: the edit creates a minimal private underground (a smugglers' tunnel or a cellar passage
    of kind `dug`) leading to the most plausible outlet — another cellar, a catacomb or cave if the site has one, the
    riverbank, the shore, or beyond the walls — and the underground layer becomes present for that settlement (the
    settlement's rung rules for sewers are unchanged: this is a dug passage, not a sewer network); (5) THE ACCESS POINT
    (item 64) with its state and `knownTo` (secret by default for a clandestine building, item 63; else local); (6) THE
    PLAN — the floor-plan rung reserves the stair, ladder or hatch in the basement plan (item 28) and the building's
    plan rung is marked stale; (7) THE LINKS — the connection graph (item 65 (d)) gains the new links, typed.
    (b) SEED AND LOCALITY: every generated piece draws from the building's own lineage streams and the target's, so the
    same edit on the same seed gives the same pieces; only the pieces in the closure are new; everything else stays
    byte-identical (§7.3's locality oracle); the neighbourhood and building rungs touched are marked stale until viewed.
    (c) REVERSAL AND OWNERSHIP: the closure records which pieces it created; undo removes exactly those; deleting the
    access later removes the pieces nothing else uses (a generated connector another access now shares stays), and a
    basement the edit created reverts to the building's derived state unless the user kept it.
    (d) THE SAME FOR OTHER EDITS: the closure rule is general — any edit that implies missing prerequisites (a clandestine
    front requiring a concealed door; an undercity entrance requiring a lifeline) generates them the same way, recorded,
    undoable, seed-stable. The dossier stays the authority for institutions (item 20): the closure creates map pieces,
    never dossier facts.
    (e) §13 bars: an access edit on a building without a basement produces a lawful basement or a stated refusal; every
    generated connector is reachable end to end and lies in its depth band; undo restores the prior document byte for
    byte; a second access sharing a connector survives the first one's deletion.

67. **OWNER RULE — Transitions: buildings and plots shown mid-change, on a weekly clock (owner, 2026-09-27).** Owner: "now
    something else I want us to figure out and consider... transitions.... so hear me out, when a building gets torn down,
    ruined, being built, being expanded, Lots need to merge or separate. But depending on where things are in the process
    of being built or ruined, we should consider things being roofless or other visuals that they are in a transition
    state. note that our simulator advances by units of one week. so if it takes two weeks or a month to build a full
    house, then during that time, we should show stages of it being built. What do you think those stages should be?"
    The owner's words are the authority; the consequences are the program's vetoable interpretation, extending item 8
    (evolution), item 18 (mutation), item 31 (the ladder) and the simulation clock (S15). STAGED with evolution and the
    simulator; the base carries the records, the derivation rule and the drawing rows.
    (a) A CHANGE IS A PROJECT WITH A TIMETABLE, NOT A JUMP. Every physical change — build, extend, demolish, repair,
    convert — is a `Works` record: kind, target (building, wing, plot or plots), start week, duration in weeks, and its
    stage schedule. The drawn state at any week is DERIVED from the record (elapsed ÷ duration → stage), never stored per
    week, so any week can be shown, replayed or scrubbed, and the seed survives. Decay is a slow Works of kind `decay`
    driven by vacancy and time; fire is an instant event followed by a clearance or repair Works.
    (b) DURATIONS BY RULE: a table by class × size (storeys, footprint) × material (timber, stone, brick) × prosperity
    (labour and money) × season (masonry pauses in winter, a table row) — defaults: a hovel or shed 1–2 weeks, a small
    timber house 2–6 weeks (the owner's "two weeks or a month"), a town house 2–4 months, a stone house 4–12 months, a
    manor 1–3 years, a church a decade or more, a cathedral generations, built part by part (a finished choir in use under a
    temporary roof while the nave rises); demolition much faster than building; decay years to decades, faster for
    timber and thatch than stone. A stage shorter than one week is skipped in the drawing (a tick shows whatever stage it
    lands in).
    (c) CONSTRUCTION STAGES (fractions of the duration, a table row per class): (1) STAKED — the footprint marked out on
    the plot, materials stacked in the yard (drawn: a dashed footprint, a material pile); (2) GROUND BROKEN — the site
    cleared, the cellar pit or trench dug (bare earth, spoil heap; a cellar shown as a pit); (3) FOUNDATIONS — the
    footprint as low walls or a sill frame; (4) WALLS RISING — the walls up storey by storey with no roof, the interior
    open to view, scaffolding round the outside (drawn: wall outline and interior floor, a scaffold hatch ring; heights
    grow per storey, so shadows grow); (5) ROOF FRAMED — rafters and ridge over the walls, uncovered (drawn: roof lines
    without fill); (6) ROOFED — the covering on, scaffolding still up, the yard still a work yard; (7) FINISHED — the
    scaffold gone, the yard laid out, fences and garden; the building becomes `built` and its occupants move in.
    (d) EXTENSION: the existing building stays in use; the new wing runs stages (1)–(7) beside it; at ROOF FRAMED the old
    roof is opened where the two join; at FINISHED the joint wall is opened and the wings unite (item 18's mutation).
    (e) DEMOLITION (deliberate, fast): (1) EMPTIED — occupants gone, doors and windows taken out; (2) STRIPPED — the roof
    covering salvaged, rafters bare (roofless look begins); (3) ROOFLESS SHELL — walls standing, rubble inside;
    (4) RUBBLE — wall stubs, rubble heaps, salvage piles; (5) CLEARED — bare ground, ready for the next Works.
    (f) RUIN (unplanned, slow; item 31 rung 3 and item 8's decline hooks): (1) ABANDONED — shut up, yard overgrowing,
    roof whole; (2) DECAYING — holes in the roof, a sagging ridge (drawn: roof with gaps); (3) ROOFLESS — shell only,
    weeds and saplings inside; (4) COLLAPSED — walls fallen in places, stone taken away for reuse elsewhere (the material
    feeds other Works); (5) OVERGROWN — a grassy mound and a foundation outline, until cleared or built over. FIRE jumps
    to a charred roofless shell in one week. REPAIR runs the ruin stages backwards under scaffolding.
    (g) PLOTS IN TRANSITION: a merge or split is decided when the Works starts (ownership), but the ground shows it in
    step with the work: an old party wall or fence stands until the ground-broken or rubble stage clears it, and a new
    dividing line appears as stakes at staking and as a fence or wall at walls-rising; until then the pending boundary is
    drawn dashed. Item 31's fusion and splitting run through these same stages.
    (h) THE SAME MODEL AT EVERY ZOOM: the city view draws the stage glyph on the footprint (cheap); the neighbourhood view
    draws walls, scaffolds, roof frames and rubble; the floor-plan rung shows a building in progress as walls without
    doors or furniture, and a ruin with its fallen walls and open rooms. Heights, shadows and the 3-D export follow the
    stage. Labels and the clerk say "being built", "being demolished", "ruined since …".
    (i) RESTRAINT: the share of buildings in works at once follows the settlement's growth or decline rate (a table), so a
    steady town shows a few scaffolds, a boom town many, a declining one ruins; the parity presets show none.
    (j) Stale markers (item 28): a building whose stage changed since it was last viewed is marked, like any change.
    (k) §13 bars: the stage at week w is a pure function of the Works record and w; scrubbing weeks forward and back
    reproduces every drawing byte for byte; a Works never leaves a plot without access; merges and splits show the old
    boundary until its clearing stage; a demolished building's occupants are rehoused (item 17) before stage (1).

68. **OWNER RULE — Light: day and night, the cursor sun, point lights, gradient shadows that respect height (owner,
    2026-09-27).** Owner: "next thing, daytime vs night time view, lights such as torches or magical lights vs the sun,
    global light as the sun versus radial light sources from torches/magical lights, and shadows that correspond with
    shape and height. 1. a daytime view is the default. the global light is the cursor. every shadow moves in accordance
    with wherever the global light (the cursor) is radiating against them 2. a night time view with appropriately spaced
    and partitioned torches or magical lights. the moon is a global light but much softer than the sun. all of these does
    somewhat of the opposite, it brightens a shadow ridden area. 3. shadows are gradients affected by light sources,
    during the day time it primarily comes from the sun. During the night time it softens according to multiple light
    sources. There is not just one shade for shadow, and we consider shadows the absence of light which means that a
    torch radiates in all direction but if there is an object between multiple torches where every side is lit, it would
    have no shadow then. and light is also reflected in the dark meaning that indirect light sources also help to
    illuminate whether from a torch or the moon. 4. shadows of buildings also have to take into account the height of a
    building it may be cast on. We only see the rooftops, however, if there was a wizard tower tall and giant, a small
    hovel's shadow if the shadow is cast on the tower, does not produce one on its roof. But the tower can on the hovel
    subtracting the distance of the shadow on the ground and the height of the hovel, traveling further if appropriate
    beyond the hovel onto the ground or next building. shadows also take into account the height of their light sources
    and distance. 5. Torches have optimal distances and gradients of effectiveness as well as light gets dispersed over
    distance." (Spelling normalised only in this copy.) The owner's words are the authority; the consequences are the
    program's vetoable interpretation. It revises §8.4 (shadows, sun) and §8.2's lit and night variants.
    (a) ONE LIGHTING MODEL: LIGHT ACCUMULATED OVER A HEIGHT FIELD. Every point of the top-down view has a surface height
    (terrain; roofs with their slopes from §2.6's wings, ridges and roof kinds; walls and towers; tree crowns; decks) and a
    surface orientation. Its brightness is the SUM over light sources of (the source's intensity × its falloff with
    distance × the surface's facing toward it × VISIBILITY — whether the straight path from the point to the source, at
    the source's height, passes above everything in between) plus AMBIENT (sky by day, moon and sky at night) plus
    INDIRECT (light bounced from lit surfaces nearby) less AMBIENT OCCLUSION (narrow alleys, courts and the foot of tall
    walls receive less of the ambient). A shadow is simply the absence of one source's light, so it is a gradient, never
    one shade: soft edges from the size of the source (the sun's disc, a flame) and its distance; a spot lit from every
    side by several torches has no shadow at all; indirect light lifts every shadow a little.
    (b) HEIGHT-AWARE SHADOWS (the owner's point 4). Visibility is tested against the height field, so a shadow falls on
    whatever surface it meets at that height: a tall tower's shadow crosses a hovel's roof wherever the shadow's edge is
    still above the roof, is shortened there by the roof's height, and continues beyond onto the ground or the next
    building; a low building's shadow never climbs a taller neighbour (we see roofs only, and the ray passes below the
    tall roof); shadow length follows the light's height and distance. This REPLACES §8.4's ground-only projection as
    the lit model; the current vector projection stays as the fallback for devices without GPU lighting and for vector
    exports.
    (c′) OWNER CONFIRMATION (2026-09-27): "and the cursor moves the global light which creates different angles for every
    shadow". So the day light is RADIAL by default: it stands above the cursor's ground point at a finite height H, and
    each caster's shadow points directly away from the cursor, its direction therefore different for every building, and
    its length set by similar triangles — for a caster of height h at horizontal distance d from the cursor, the shadow
    tip lies at d · h ÷ (H − h) beyond it (a caster at or above H casts to the view's edge, capped); moving the cursor
    swings every shadow at once. H defaults to a value proportional to the view's extent so shadows stay legible at every
    zoom, and the sun-height control changes it; the near-parallel "true sun" is the same control pushed high, and the
    only mode for exports and still images. The night moon behaves the same way, softer.
    (c) DAY (the default view): the sun is a global light whose position follows the CURSOR — the cursor marks where the
    sun stands over the map and every shadow turns away from it (radiating from the cursor's point); a sun-height control
    sets how parallel the shadows are (very high: nearly parallel, realistic; lower: dramatic and radial). Without a
    cursor (first paint, touch, export, a still image) the sun takes the sheet's fixed position (upper left, 45°), and
    `path` mode (§8.4: the simulator's clock and latitude) remains an option. INTERPRETATION TO CONFIRM: the default time
    of day is day; shadows are drawn by default in the lit styles and the ink (MFCG-parity) style keeps its raised
    under-copy without cast shadows unless switched on — one switch in the style sheet.
    (d) NIGHT: the moon is a second global light, much softer and cooler, also following the cursor (its brightness by
    phase, a table row); the scene is dark by default and brightened by POINT LIGHTS: torches, lanterns, braziers,
    magical lights and lit windows. Point lights are ENTITIES placed by rule, never decoration: at gates, bridges, the
    plaza and markets, inns and taverns, temples, the castle and guard posts, along main streets at a spacing derived
    from each light's radius and height so that lit pools overlap to a target minimum brightness per street class and
    prosperity band — rich streets and magical districts well lit, poor alleys and hidden courts dark (a natural fit
    with items 30, 63 and 65), magical lights by the settlement's magic circumstance and prosperity (the floating islands
    among them); windows glow by occupancy and hour from the simulator (as the FTG client paints its server's lit set).
    Each light has a height (a wall torch about 2.5 m, a lamp post 3–4 m, a brazier 1 m, a magical orb 5–10 m), a colour
    (fire warm and flickering, magic cool and steady), an intensity and an effective radius; falloff is an inverse-square
    law with a smooth cutoff at the radius (the owner's "optimal distances and gradients of effectiveness"), so light
    fades with distance and each source casts its own soft shadows away from itself. The era row governs how much public
    lighting exists (sparse in a medieval preset, dense where magic or later eras supply it).
    (d′) UNDERGROUND LIGHT (owner, 2026-09-27: "the undercity and near dwellings underground has to have a lot of light
    sources. they don't have the sun or moon"). The underground layer has NO global light and near-zero ambient: every
    lux comes from point lights and from LIGHT SHAFTS. (1) Point lights are placed densely by rule — at every dwelling
    door and window, along walkways and galleries at a tighter spacing than any surface street, clustered in the
    undercity's market chamber and around its institutions, braziers and fire pits in the larger chambers, with a floor
    density per system (undercity and sewer-front dwellings high, sewer tunnels sparse — at junctions and access points —,
    catacombs dark except shrines and ossuary lamps, caverns dark except where lived in) and fuel or magic set by the
    settlement's circumstances (tallow and pitch, lamp oil, magical lights, and in caverns optionally a glowing fungus
    row where the magic or biome allows). (2) LIGHT SHAFTS: the lifelines of item 65 — grates, air shafts, wells and
    collapsed openings — admit a column of daylight by day (and faint moonlight by night) that falls on the floor below,
    so the undercity's brightest spots at noon are under its shafts. (3) The cursor moves no global light underground;
    optionally it becomes a hand lantern (a viewer's light that follows the cursor with a short reach), off by default.
    (4) Everything else is the same model: height-aware shadows under the ceiling, soft falloff, bounced light, and the
    dark between pools of light is part of the look.
    (e) HOW IT RUNS: this is GPU work (WebGL2, WebGPU where available): a height-and-normal buffer per view tile from the
    model's heights; the day sun or night moon evaluated per pixel every frame as the cursor moves (one directional-style
    source, soft-shadow height-field marching); the static point lights baked once per tile and zoom into a light map with
    their shadows (they do not move), culled per tile so thousands of torches cost only what is on screen; indirect light
    approximated by a blurred spill of the direct light and an ambient-occlusion term from the height field. Budgets and a
    fallback ladder in §12 (the fallback: vector ground shadows and glow sprites, today's §8.4). Exports: raster and 3-D
    exports carry the lighting; vector exports carry the fallback or a raster lighting layer.
    (f) Determinism and editing: the lighting is a pure function of the model, the light entities, the style and the view
    (cursor, time); nothing lit is stored; lights are editable entities like any other (add, move, remove, change kind).
    (g) Emulation note: MFCG draws no cast shadows (its "raised" look is an under-copy); Fantasy Manor uses a single-light
    Lambert-plus-Phong on roof facets and a swept silhouette shadow; the FTG client uses a shadow map from extruded proxies
    and window glows from the server; the parity presets reproduce those; the height-field model is our extension.
    (h) HOMES: §8.4 (the lighting model, sun and moon, shadows), §8.2 (lit and night variants, light roles), §8.10 and a
    light-entity record in §2.7 with placement rules in §4.9 or §4.7 (pins), §7 (light edits, view-state cursor sun), §12
    (budgets and fallbacks), §11 (exports), §13 (bars: a lit spot surrounded by lights has no shadow; a shadow never climbs
    a taller roof; the shadow on a lower roof is shortened by that roof's height; lighting identical for the same model,
    lights and view).

69. **OWNER RULE — Adopt the corpus's measured colour targets now (owner, 2026-09-27; a scoped exception to the corpus
    partition).** Owner: "Adopt the corpus measured color targets". The owner's words are the authority; the consequences
    are the program's vetoable interpretation. Source: the preliminary corpus look (partitioned/corpus-preview/look.md
    §1.1 and §1.3, the bands recomputed WITHOUT the 53-plate holdout; the corpus is SettlementForge's own artistic
    material, so its values may be used exactly). EXCEPTION SCOPE: only the palette bands below leave the partition; the
    plates, the texture ("hand") targets, the grain ladder, the banned-prior list and every other corpus finding stay
    walled off until the reconciliation stage; the holdout is never used.
    (a) THE TARGETS (8-bit sRGB luma and channel difference unless stated): PAPER — lightness 226–244, target 235, warmth
    R−B 20–50 pinned at 36 (the corpus paper centroid #F8E9D4); INK — the darkest 0.5 % of a rendered plate at luma ≤ 45
    ("full ink"), the ink colour a warm brown-black with warmth R−B about 20 (the corpus ink centroid #2E201A);
    PLATE CHROMA (the corpus's plate-chroma measure) 18–70, median 43.
    (b) WHERE THEY BIND: the `ink` family (the default) moves its paper to the corpus paper (warmth from 24 to 36, value
    kept inside 226–244) and its ink/label/wall role to the warm brown-black (warmth from 7 to about 20, luma ≤ 45);
    the dependent roles (road = paper, ground, court, field, building, shadow alpha) shift with them so every pair of
    §8.2's contrast matrix still passes (the existing bounded repair, re-run on the new values). CHROMA with constraint
    (the owner's tiebreaker "lean into the corpus with constraint and precision"): the `ink` family keeps MFCG's restraint
    but its role-chroma cap rises from 18 to the value that puts its rendered plate chroma in the band's LOWER range
    (target 20–30), J-R3/J-R28/J-R29 re-ruled accordingly; the `lit`, `hatched` and the reserved `parchment` and
    `painterly` families target the band's median. MFCG parity is judged by style class, not by MFCG's exact colours
    (look.md §2.2), so the parity statement stands.
    (c) THE RULER: a palette acceptance bar in §13.5 / B-ZOOM on a fixed measurement render (plate-equivalent resolution
    and framing; only the resolution-stable axes — paper luma and warmth, darkest-ink luma and warmth, plate chroma):
    every shipped family inside its targets; measured by our own measurement code written from these definitions (no
    corpus instrument is imported into the program).
    (d) PROVENANCE: each changed role value and the bar cite "owner-opened corpus palette exception, 2026-09-27" in §8.2
    and §17.1; partitioned/README.md records the exception.
    (e) HOMES: §8.2 (role values, the chroma rule, the contrast re-check), §8.3 if the family table repeats values, §13.5
    and B-ZOOM (the bar), §17.1 (provenance), J rows for the re-ruled chroma cap.

70. **OWNER RULE — Informal clusters: many shacks or tents on one unowned lot, each with its own door (owner,
    2026-09-27).** Owner: "Oh something to consider, we are drawing expansion or when the settlement is generated lots
    with very low prosperity lots, some neighborhoods simply have a lot of for example, shacks on one block no single
    individual owns it. They kind of congregate together throughout the lot if the lot itself is not already built in the
    form of a larger building, each one deserving of a door. Sometimes they're just tents. What are your thoughts of
    this? It's similar to how we have retrofitted the interior of a once prosperous to our poor by instead of all in one
    building it's now just a bunch of separated small buildings still with more people in each depending on how big the
    city or town is and how low the prosperity is of that neighborhood and the town." The owner's words are the
    authority; the consequences are the program's vetoable interpretation, extending §4.7 S11's `hovel` and `tents`
    arrangements, item 28 (f)'s interior ladder (its outdoor twin) and item 31's ladder.
    (a) TENURE: a plot gains `tenure: 'owned'|'rented'|'common'|'informal'` (default by the owner record); INFORMAL means
    no single owner — squatted or customary ground — and is the lowest bands' default for plots with no building
    standing, and for cleared, vacant or ruined ground in a declining district.
    (b) THE CLUSTER ARRANGEMENT: a new site-plan arrangement `cluster` for informal plots (and, where a band row says so,
    for a whole block treated as one informal lot): many small structures — SHACKS (timber, wattle, salvage; 6–20 m²),
    TENTS (6–15 m², roof `tent`) or LEAN-TOS against a wall, a ruin or the town wall's outer strip where the band allows —
    packed organically across the lot, not in frontage rows, leaving a web of narrow FOOTPATHS (under an alley's width)
    so that EVERY structure has its own door on a path and every path reaches one of the plot's access edges (the access
    guarantee carried down to each shack); packing leaves a minimum gap for fire and passage (a table row), denser in
    larger cities and poorer bands. Shacks versus tents versus lean-tos by a band × climate × era row (tents in the
    squalid band, in camps and in the newest edge of a shanty district; shacks where the settlement has persisted).
    (c) PEOPLE PER STRUCTURE: households per shack and persons per household rise with the city's size and the depth of
    the poverty (a table by rung × band), the outdoor twin of item 28 (f)'s interior ladder: the same dossier households,
    housed in many small structures instead of one partitioned shell.
    (d) WHERE: the lowest bands' plots with no standing building; FTG's staging rule kept as the emulation default —
    shanty clusters appear in the second half of the growth stages, outside the enceinte, where the average band is
    squalid or poor (FTG's shanty towns; MFCG's shanty toggle) — extended by our rules: vacant and cleared plots inside a
    declining district (item 31), riverbanks and marsh margins where the terrain gate allows, the lee of walls and ruins,
    and the undercity's chambers (item 65). Never on a plot whose geometry floor (item 31) is middle or above while that
    stock stands: a fallen mansion's cleared plot may take a cluster; a standing one is subdivided inside (item 28 (f)).
    (e) OVER TIME (item 67): clusters grow by accretion week by week (a shack goes up in days, a tent in hours), densify
    with poverty, burn fast, and are cleared or FORMALISED when prosperity rises — the replaceability column of item 31
    marks tents and shacks replaceable at once, so a rising district replaces a cluster with row houses quickly.
    (f) DRAWING: at the city band a cluster reads as a dense speckle of small roofs with a ground tone for the paths (never
    an empty block, never a solid mass); at district zoom each shack or tent with its door tick; labels name the cluster
    as a place (a local name), not each shack.
    (g) HOMES: `tenure` on the plot record (§2.5); the `cluster` arrangement and its packing rule in §4.7 S11 with its
    table rows; the households-per-structure row with §10 households; the shanty regime in §4.4 and S6 typing; the
    decline and formalisation paths in §4.11; drawing in §8.2/§8.5; §13 bars: every structure has a door on a footpath
    that reaches an access edge, the fire-gap minimum holds, households per structure within the row, no cluster on a
    standing middle-or-above-floored plot.

71. **OWNER RULE — Mixed classes inside a band: the gradient reaches the building mix (owner, 2026-09-27).** Owner: "Also
    note that regarding bands a prosperous neighborhood if it's not at the upper extreme may have a mix where
    appropriate to its band and the prosperity of the city they have a mix of middle class to rich man manors. Keeping
    with the idea that it is gradient. Of course, a very prosperous location may simply have all manors because that
    makes sense." The owner's words are the authority; the consequences are the program's vetoable interpretation,
    refining §4.5's field bands, §4.7 S10's granularity law and S10b's placement.
    (a) THE MIX FOLLOWS THE POSITION IN THE GRADIENT: a district's (and a block's) building-class mix is drawn from
    weights that interpolate along its prosperity value, not from its band alone — just above the prosperous band's lower
    cut most plots take middle-class houses with a few manors; toward the top of the rich band the share of manors rises
    to all manors at the extreme; the same holds at every band edge (modest houses among the poor near the modest cut,
    and so on). A table of class-mix weights per band row, interpolated along the value (as coverage, granularity and
    greenery already are).
    (b) THE CITY'S PROSPERITY SHIFTS THE MIX: the town-wide wealth level shifts the weights, so a prosperous quarter of a
    rich metropolis holds more manors than a quarter at the same relative position in a poor town; the band cuts
    themselves stay the town's own (§4.5), so "rich" is always relative to this settlement.
    (c) PLACEMENT WITHIN A MIXED BLOCK IS NOT SALT AND PEPPER: the larger classes take the prime frontages — the main
    street, a square, a park edge, a corner, the waterfront — and the smaller houses the side lanes and the backs, so a
    mixed block reads as a street of grand houses with modest ones behind (S10b's score gains a frontage-prestige term;
    item 16's spatial templates may override it). Plot granularity follows the class placed (item 31's join and split),
    so manors sit on joined plots and houses on standard ones in the same block.
    (d) The dossier's households decide who lives there (their bands), the map decides which building each gets; a manor
    that falls to the middle band keeps its shell (item 31's geometry floor) and is subdivided inside (item 28 (f)).
    (e) HOMES: the class-mix rows in §4.7 (S10b placement and the granularity law) with §4.5's interpolation rule; the
    prestige term in S10b; §13 bars: the manor share rises monotonically with the prosperity value within a band row
    and reaches all manors at the table's extreme; the town wealth level shifts it in the declared direction; mixed
    blocks place their largest classes on prime frontages.

72. **OWNER RULE — What defines a neighbourhood, and names it (owner, 2026-09-27).** Owner: "By the way, just so you know,
    prosperity can shift for a number of reasons as well as regression and expansion to a number of reasons. Eventually
    neighborhoods are going to be more or less defined by the mix of assigned lots within them and how they correlate to
    relevant political powers as well as the spatial flow of trade both to main streets and the general direction
    (paired with location of walls and gates as gates) where trade is flowing most from, in addition to the economic
    make up of a settlement that can shift, their relationship to the main roads and to the more significant institutions
    which synergizes with again the make up or contributions of assigned lots to institutions within a settlement. This
    assignment also helps to assign names to neighborhoods." The owner's words are the authority; the consequences are
    the program's vetoable interpretation, refining §4.5's district typing, §10.4's naming and item 8's evolution
    drivers. The dossier supplies the facts (item 20); SettlementForge's dossier is being surveyed (J67) so this item's
    inputs can be matched to its real fields at reconciliation.
    (a) A NEIGHBOURHOOD'S CHARACTER IS DERIVED, NOT ASSIGNED ONCE: a district's character vector is computed from (1) the
    MIX of its assigned lots (the trades, institutions and households placed there, weighted by size and rank); (2) its
    POLITICAL ALIGNMENT — how those lots correlate with the settlement's powers (factions, guilds, the church, the crown,
    the criminal network: the dossier's political facts), as shares of affiliated lots; (3) its TRADE POSITION — the
    spatial flow of trade: its place on the main streets and on the routes from the gates, weighted by the direction the
    settlement's trade mostly flows from (the dossier's trade partners and routes mapped onto the gates and main roads);
    (4) its ECONOMIC ROLE in the settlement's make-up (what share of which sector it holds); (5) its RELATIONSHIP to the
    main roads and to the significant institutions nearby, and the CONTRIBUTIONS its lots make to those institutions
    (suppliers, members, dependants). Kinds (market, docks, craft, temple, gate …) remain the emulation-first labels, now
    read off this vector.
    (b) IT SHIFTS OVER TIME: the vector is recomputed at each epoch; prosperity, expansion and regression have many causes
    (the dossier's events, the economy, politics, war, trade shifts, disaster), and a district's kind and band follow its
    vector through item 31's ladder, never by re-roll.
    (c) NAMES FOLLOW CHARACTER: the naming engine (§10.4) names a neighbourhood from its dominant vector components — its
    trade (Tanners' Row), its institution (Temple Hill), its faction (the Guildquarter), its trade direction or gate (the
    Northgate), its terrain — and keeps a name once given unless the owner or the dossier renames it or its character
    changes past a hysteresis (the old name may survive as a historical name, as real quarters keep outdated names).
    (d′) THREE KINDS OF INSTITUTION, AND HOW EACH SHAPES NEIGHBOURHOODS (owner, 2026-09-27: "And in some institutions
    that we have for settlement Forge, we had things like districts or slums. Those should define a whole neighborhood
    either changing things within our neighborhood to fit with it or generating that in mind but not completely
    occupying every single lot to the specific institution that defines that. For example, a red light district might
    still have a blacksmith or an inn or other institutions, but would also have an increased number of brothels. Now
    we're going to define institutions which basically say multiple blacksmiths or multiple alchemists or multiple
    churches as not neighborhood or districts, but something to be dispersed out across all neighborhoods and districts,
    randomly someone with more than other some may not have it at all. But what defines with the exception of those
    special cases where it is like a red light district, how we define a neighborhood is based but we currently don't
    have to defined in the settlement (like there's one red light district not two) the prosperity and lot assignment
    contributions to the neighborhood. For example, if there is a neighborhood that has three or more or a lot of
    churches or it has a grand cathedral which by itself is enough, then let's call that neighborhood the religious
    quarter. There is one that has multiple craftsman that were generated there and that's the craftsman quarters and so
    on and so forth where appropriate"). A class-table column `distribution` on every institution and building class:
    (1) DISTRICT-DEFINING — a dossier institution that IS a district (a red-light district, the slums, a foreign quarter,
    a guild district …): it claims ONE neighbourhood each (as many as the dossier lists — one red-light district, not
    two), sited where its kind belongs (a red-light district near docks, gates and inns; slums at the poorest edge), and
    shapes it without filling it: the neighbourhood's lot mix is the ordinary mix for its band with the defining trade's
    share RAISED to the class row's target (more brothels, still a smith, an inn, houses), and its band, granularity,
    greenery and lighting take the kind's row (slums: squalid band, informal clusters of item 70); when the dossier adds
    one to a settlement already drawn, an existing neighbourhood is converted toward it by least-disruption mutation
    (item 22), never re-rolled. (2) DISPERSED — ordinary institutions with many instances (smiths, alchemists, chapels
    and churches, bakers, inns): spread across all neighbourhoods by the placement solver with affinities (item 16) and
    a controlled randomness, so some neighbourhoods hold several, some one, some none — never gathered into a district
    by rule. (3) SINGULAR OR ANCHOR — one-off major institutions (a cathedral, the palace, the university, the great
    market): sited by their own rules and weighing heavily on the neighbourhood around them. IDENTITY FOR EVERY OTHER
    NEIGHBOURHOOD is EMERGENT from what landed in it and its prosperity: a table of QUARTER IDENTITIES, each a weighted
    count of class families with a threshold, a band condition and a priority — e.g. RELIGIOUS QUARTER: chapels and
    churches weight 1, a cathedral or a great temple weight 3, threshold 3 (so three churches, or one cathedral alone,
    suffice); CRAFTSMEN'S QUARTER: craft workshops weight 1, threshold by the neighbourhood's size; MERCHANTS' QUARTER:
    trading houses and warehouses with a prosperous-band condition; and so on, our own rows. The highest-priority
    identity whose threshold is met names the neighbourhood's kind (and feeds its name, (c)); a neighbourhood meeting none
    takes its dominant component of (a) or a plain residential kind by band; identities may repeat across a city (two
    craftsmen's quarters) unless their row is marked singular. Kinds from the dossier (1) always win over emergent ones.
    (d″) POWER DIALS AND VALUE, NOT VOLUME (owner, 2026-09-27: "when we have those kind of neighborhood assignments (as
    opposed to lot assignments), they will see a relatively synergetic bonus to the relative power. A craftsman quarters
    for example, will rise and fall with the power relationship dynamics of the craft guilds power. Now this applies both
    to every craftsman institution in the settlement as well as a specific craftsman's quarters, so it's two separate
    dials, and this applies to all powers and institutions in buildings. I would be very careful on how you assign these
    values because it's not just about the number of institutions for example, you will have a lot more lodging places
    just for people that live in and you will have churches and just because there's a lot more lodging doesn't mean
    that anything related to lodging is more prosperous than churches from that alone. It means that each church
    individual value is greater than the lodging and it has other things working out. And of course quarters can shift
    over time depending on their make up."). (1) EVERY institution and building class is associated with the power(s) it
    answers to (craft guilds, merchant houses, the church, the crown, the military, the criminal network … as the dossier
    names them; a table row, dossier-overridable). (2) TWO DIALS, both read from the dossier's power standings (the
    dossier owns power dynamics; the map reads them, item 20): the INSTITUTION DIAL — every institution of a power, anywhere
    in the settlement, rises and falls with that power's standing (its building's condition, upkeep, extensions, its
    plot's prosperity term); the QUARTER DIAL — a neighbourhood whose identity is tied to that power (the craftsmen's
    quarter to the craft guilds, the religious quarter to the church) gets its own synergetic term on top, so the quarter
    as a whole rises and falls with the power. Both enter the prosperity field as driver terms (§4.5) with declared
    weights, never replacing the other drivers. (3) VALUE, NOT VOLUME: identity thresholds, the character vector and the
    dials weigh each instance by its SIGNIFICANCE — a per-class value (a cathedral far above a church, a church far above
    a lodging house, a guildhall above a workshop) scaled by the instance's rank, size and patronage — never by counts
    alone; ubiquitous classes (housing, lodging, common shops) carry low significance, so many lodgings never outweigh a
    few churches or make "lodging" a prosperous power; a power's weight in a quarter is the significance-weighted share of
    its institutions there. (4) QUARTERS SHIFT OVER TIME as their make-up and the powers' standings change — recomputed at
    each epoch with hysteresis (item 31's ladder), their names following past the hysteresis ((c)).
    (d‴) THE NEIGHBOURHOOD BOUNDS ITS BUILDINGS (owner, 2026-09-27: "And I would say this neighborhood prosperities
    defines the bounds (floor, and ceiling) of what any building inside of it can be. So any amplifier specific to the
    institution regarding its prosperity let's stay with the neighborhood bounds until the neighborhood itself
    upgrades"). Each neighbourhood's prosperity value gives a BAND RANGE — a floor band and a ceiling band (a table row
    by the value: near the top of the scale the range narrows to the rich band alone, all manors; a prosperous but not
    extreme neighbourhood spans middle to rich, item 71's mix; a poor one spans squalid to modest). Every
    prosperity-driven state of a building inside it — its class for a new build or a re-designation, its condition and
    upkeep, its extensions, its occupants' band, its interior ladder rung — stays inside that range. The INSTITUTION DIAL
    of (d″) and any other building-specific amplifier moves a building WITHIN the range and is clamped at the ceiling
    (and the floor); the excess is not lost: it accumulates as upward (or downward) pressure on the neighbourhood's own
    prosperity value, so a thriving institution lifts its neighbourhood over epochs, and when the neighbourhood's band
    changes past its hysteresis the range moves and the buildings may follow. Consistency with item 31: the range governs
    what a building IS and how it is kept, not whether an existing shell survives — a mansion's shell standing in a
    neighbourhood that has fallen keeps its geometry floor, while its condition, occupants and interior are bounded by
    the neighbourhood's range (subdivided, worn); and no informal cluster or hovel is built below the floor of a
    neighbourhood whose range excludes the squalid band.
    (d4) THE ECONOMIC MAKE-UP AMPLIFIES WHAT IT RESTS ON (owner, 2026-09-27: "Oh, when I keep forgetting that regarding
    prosperity, alter tie into the economic make up of the city which we have the data for in settlementforge. If trade
    is the number one contributor to the economy for example that is an amplifier to things like markets. If it's taxes
    and toll roads then any infrastructure becomes amplified more."). A third dial beside (d″)'s two, the ECONOMY DIAL,
    read from the dossier's economic make-up (the share each sector contributes to the settlement's economy — trade,
    crafts, agriculture, taxes and tolls, mining, fishing, religion and pilgrimage, military, magic, crime …, as
    SettlementForge names them; the survey of research/sf/ maps its fields). A table associates each institution and
    building class, and each infrastructure element (markets, warehouses and quays for trade; gates, toll houses, bridges,
    roads, walls and the customs house for taxes and tolls; workshops and guildhalls for crafts; farms, mills and granaries
    for agriculture …), with the sectors it serves; each sector's MARKET SHARE of the economy sets its amplifier in proportion
    (owner, 2026-09-27: "Rather than say, the leading sectors amplify the most I would say that there's like a market
    share however, much any one controls, the market share affects their application") — a sector holding 40 % amplifies
    its classes twice as strongly as one holding 20 %, measured against a neutral even mix, with no extra bonus for
    ranking first — entering the prosperity field and the institution condition as a
    declared driver term (§4.5), significance-weighted ((d″)(3)), bounded by the neighbourhood's range ((d‴)), its excess
    flowing into the neighbourhood's pressure. It also feeds the character vector's economic component ((a)(4)) and the
    quarter identities (a trade-led city grows a merchants' quarter sooner). The make-up shifts over time as the dossier's
    economy does, and the dial follows at each epoch with hysteresis. The map reads the make-up; it never models the
    economy itself (item 20; the dossier owns it).
    (d5) SHARED BUILDINGS ARE PARTITIONED, NEVER DOUBLED (owner, 2026-09-27: "I would say that shared buildings also as
    how we consider them when they contribute to neighborhoods prosperity or receive amplification is also defined by the
    relative ranking of powers and economic makeup. Because we don't want to double up those the contribute to multiple
    powers should not get a double amplification, but a partition amplification relative to the strength of both or more
    powers they contribute to and their economy"). A building or institution that serves several powers ((d″)) or
    several sectors ((d4)) receives ONE amplification, partitioned: its weight toward each power or sector is that
    power's standing, or that sector's market share, relative to the others it serves (normalised so the weights sum to
    one), and its amplification is the weighted blend of theirs — never their sum. The same partition governs what it
    CONTRIBUTES: its significance feeds each power's weight in the quarter, each sector's presence and the neighbourhood's
    prosperity pressure in those proportions, so a guild chapel serving the craft guild and the church counts once, split
    between them by their relative strength and economy. §13 bar: a building's total amplification and contribution never
    exceed those of a single-power building of the same significance.
    (d) HOMES: the character vector and its five components in §2.5 (District.character) and §4.5 (typing), the trade-flow
    term with §4.3 routes and gates, the political term with §10 and the dossier contract §7.7, naming in §10.4 and §9,
    recomputation in §4.11; §13 bars: the vector is a pure function of the lots, the dossier's facts and the geometry;
    a district's name changes only past the hysteresis or by a rename.

## G. Owner refinement of an applied item (2026-09-27 evening) — routed with pass c as item 20

20 (h). **OWNER RULE — Derivation fills every gap; the dossier is the sole immutable truth (owner, 2026-09-27 evening).**
    Owner, on the dossier survey's finding (research/sf/dossier-model.md: institutions and power factions keyed by NAME,
    no households, no classes, no locations, trade direction only at the realm level): "whatever the dossier doesn't provide, the rest of the map code must compensate. it is one directional. only the dossier is the source of immutable truth while the rest can be constructed at whim. better if the rest of the map code coherently derives things from the dossier and in accordance with our rules."
    The owner's words are the authority for this part (it is not a code-reading candidate); the consequences below are the
    program's interpretation, vetoable, built on items 16–22 and 72 and on the dossier contract as applied by pass b.
    (i) TWO TIERS OF FACT. Every fact the map holds is either a DOSSIER FACT — a record or value the dossier supplies,
    carried by the map by its dossier key, immutable on the map, changed only by a dossier change arriving through the
    change feed (items 20 (f), 22) — or a MAP FACT — everything else: positions and geometry, plots, buildings and their
    classes, the households the dossier does not enumerate, lot assignments, prosperity values, settlement-level trade
    directions, names the dossier does not give, the character vector. Map facts are the map's own construction: they may
    be generated, regenerated, edited and replaced freely ("at whim"), subject only to (ii) and (iii). Each record states
    which tier each of its facts belongs to (a provenance marker on the record or field: dossier-owned or map-derived), so
    every reader, editor, exporter and the clerk can tell what is immutable from what is the map's own.
    (ii) DERIVE BEFORE INVENT. A map fact the dossier does not supply is DERIVED from what the dossier does supply, by
    the design's rules, before any recourse to chance: the household roster, its classes and sizes from population, wealth
    level, size tier, sector shares and the class-mix tables (items 9, 27, 71); an institution's class, size and band from
    its dossier kind, rank, wealth and membership through the designation templates (items 19, 72 (d′)–(d″)); the
    settlement-level direction of trade from the realm-level partners and routes, the terrain and the road-and-gate
    geometry (item 72's trade-flow term); positions from the placement solver over relation and supply-chain templates
    (items 16–19); district kinds and names from the character vector (item 72). §7.7 gains a DERIVATION TABLE: one row
    per map-fact family — the fact, the dossier inputs it reads, the rule or table that derives it, and where seeded chance
    enters (only where the dossier gives nothing to derive from, and then from the fact's own stream, §6). A derivation
    that would need a dossier input the dossier lacks falls back to the next row, never to a request.
    (iii) COHERENCE BARS (§13). No derived fact contradicts a dossier fact (counts, kinds, existence, membership, the
    realm-level trade facts); a dossier change re-derives exactly the dependent map facts by item 22's least-disruption
    mutation — never a re-roll; the derivation is a pure function of (seed, ordered dossier history, map edits) so the same
    inputs reproduce the same map (item 22 (c)); nothing derived ever flows back (item 20 (a)); an edit of a map fact
    never alters a dossier fact, and an edit that would (a rename of a dossier-named institution, a change of its kind) is
    refused with the reason "dossier-owned", the way item 20 (c) refuses deletions.
    (iv) THE MAP NEVER ASKS THE DOSSIER TO CHANGE. A gap in the dossier is the map's job, never a request to
    SettlementForge: the dossier port (§14) and the interim preparation plan (research/sf/PLAN.md, its candidate amendments
    from item 73) list, for every map fact, its derivation and its dossier inputs; the port may declare OPTIONAL fields it
    uses when present (a stable id, a location hint, a class) and never REQUIRED ones beyond what the dossier holds today.
    (v) IDENTITY WITHOUT DOSSIER IDS (PROPOSED, vetoable; pending the survey's mapping and its verification): where the
    dossier keys a record by name, the map binds its own stable record id to that dossier key in a binding table kept in
    the map document; a dossier rename arrives as a dossier change and re-binds, the map's records keep their ids and
    geometry; two dossier records of one name are disambiguated by the dossier's own ordering and reported.
    HOMES: §7.7 (the two tiers, the derivation table, the fallback rule), §2 (the provenance marker on records and fields,
    stated once and read by §7's edit rules, §9.2's reader, §11's exports and the clerk), §14 (the port: optional-only
    additions; the binding table), §7.3/§7.4 (edits of dossier-owned facts refused as item 20 (c) refuses deletions),
    §13 (the coherence bars; a determinism test that the derivation table is total — every map-fact family has a row and
    every row names its chance entry or "none"). *Editor change:* pass c's editors design (i)–(v) at those homes with a
    J-A20.h judgment row; the survey's plan seat aligns research/sf/PLAN.md and docs/AMENDMENTS-2026-09-27d.md to (ii) and
    (iv): every dossier gap in its mapping resolves to DERIVE, never to ASK. *Scope:* BASE for (i)–(iii) (the tiers, the
    table and the bars exist from M1, with the design's own roster as the dossier stand-in until the port connects);
    STAGED HOOK for (iv)–(v) (the port and the binding table are the SettlementForge stage's). *Evidence:* the owner's
    words above (CONFIRMED); the dossier facts they answer, research/sf/dossier-model.md (Opus survey, PENDING FABLE
    REVIEW — the mapping and its verification refine which inputs exist).


## Fable review (2026-09-27) — A-M2: items 63–72 and 20 (h) as written, for pass c's editors

Reviewer: Fable 5.1, lane fable-review/main/manager-corpus (docs/fable-review/main/manager-corpus.md; docs/PROGRESS.md
J82). Items 63–72 and §G record J54–J73 and J77 faithfully; every owner quotation stands. Three notes for the editors,
none changing an owner's word:

1. **Item 70 (d) — CORRECTION (J82).** FTG's shanty rule is a trigger (average lifestyle squalid or poor) and a staging
   (after the first half of the settlement) — research/findings/ftg-docs-params.md; it says nothing about the enceinte.
   The design already holds the extramural preference as its own extension (docs/ARCHITECTURE.md §4.5: the `shanty` kind's
   `extramural` relation row, soft, `extension: true`, weight 0.6, zero in the parity presets, J-A27.43). Write item
   70 (d)'s default as FTG's trigger and staging and the placement preference as that extension row — never "outside the
   enceinte" as FTG's own rule — so the MFCG and FTG parity presets carry no rule FTG lacks.
2. **Item 65 (c) — one existence rule.** "exists only in cities and metropolises (rarely a large town)" beside "at most
   one in a large town" should read as one rule: an undercity exists in cities and metropolises; in a large town only where
   a void source exists (rare); bounds 1 / 1–2 / ≤ 3 as written.
3. **Item 69 (a) — provenance the editor can cite.** The paper target 226–244 / 235 / warmth 36 is the corpus's HF-1
   reference cohort: holdout-free p5–p95 224.6–242.7, median 235.7, warmth median 37
   (partitioned/corpus-preview/look-data/q1.out); ink luma median 34.95 and ink warmth median 21, plate chroma median
   43.95 (q2.out). The unit is 8-bit luma (the corpus's "L" of #F6EDDE is 238.0), so "8-bit sRGB luma" is right. The
   placement of the `ink` family's plate chroma in the band's lower range (20–30) is the program's reading of "constraint"
   and is vetoable; the owner may prefer the median (43) for the default too.

Also, for the code/impact reviewer (A-code/impact owns items 33–62): the Ruling summary's counts read "ADOPT 13, KEEP OURS
18, CALIBRATE 15"; a mechanical count of the ruling column gives 13 / 16 / 15.

## Fable review (2026-09-27) — evidence gate

Reviewer: Fable 5.1, lane fable-review/main/code (`docs/fable-review/main/code.md`, checkpoint 1). Each part of items 33–62
marked HOLD — PLAUSIBLE is ruled here so the next pass applies the released parts; two editor texts are corrected; one
citation is re-sourced. Evidence was re-derived on the reader session's per-class extracts of the captured bundles (this
seat may open them) and, for item 59, by re-running the reader's timing harness.

| item, part | verdict | evidence and the wording the editor uses |
|---|---|---|
| 37 — the origin of `cut.flattenM` = 0.7 m ("NG's two model units at its export scale, a PLAUSIBLE metre reading") | **RELEASED** (labelled) | NG 1.2.2's JSON exporter sets the shared GeoJSON writer's scale to 0.35 per model unit and writes the same feature schema MFCG writes at scale 4 (= MFCG's 4 m unit, its unit system); the bundle holds no unit word. The metre reading is an inference consistent with the dimensions it yields (streets 3.5–21 m, building sides 8.75–12.25 m). Editor wording: "(ours: NG 1.2.2's two model units read as ≈ 0.7 m through its export scale — 0.35 per unit in the GeoJSON schema MFCG writes in metres — an inference, recalibrated at M-1 on §13.5's bent-cut row)". J-Fcode-2. |
| 49 — the deletion of "49 % of buildings in no ring" from §1.4's districts row | **REJECTED as a deletion; the figure stays with its true source** | the 49 % is `_critic-ftg.md` row 16 / F4: 1 426 of 2 798 buildings (51 %) lie inside the decoded district rings — a ring figure, not F13's lawn-patch lots. Editor change to item 49: in §1.4's districts row keep "49 % of buildings in no ring" and cite `_critic-ftg.md` F4 (row 16) only — delete the "F13" from that citation — and delete "(containment 53 %)" from the discards cell (row 17, the lot polygons). Everything else in item 49 stands. J-Fcode-4. |
| 58 (f) — NG's hood span ≈ 525 m as a descriptive anchor in II.2 | **RELEASED** (labelled) | the medium area template's axis is 1 500 model units (read in code; the export's "earth" is a regular 8-gon of radius 1 500) × 0.35 = 525 m under the reading above. Editor wording for II.2: "(NG 1.2.2's medium area template spans ≈ 525 m, read through its export scale of 0.35 per model unit — descriptive, an inference)". J-Fcode-2. |
| 59 — the timing note for §12.7 | **RELEASED** (as a restatement measurement) | the reader's harness (`manor/sim/bench.mjs`, reader-tier, session scratchpad) re-run 2026-09-27 on node 24.12: 77.9 µs per building for the restated model alone (200 000 plans; 10 model crashes, 1 in 20 000), 620.5 µs with view geometry, grass and paths. Editor wording for §12.7: "(a restatement of Fantasy Manor's model, run as a research test instrument, costs ≈ 0.08 ms per building warm and ≈ 0.6 ms with view geometry — the 1 ms `compose()` bound has headroom; SCL-13's basis were cold first-build samples)". Never "Fantasy Manor costs". J-Fcode-5. |

**Corrections to editor texts (apply as written here):**

* **Item 39** — the editor text must not carry NG's console messages (reference strings are citation-only in reader-tier
  files and never enter the design; J-Fcode-1). Rung (a) stands as written. In §3.5's table row and in §1.3 replace "NG's
  'Alternative cut' / 'Trying again' retries" with "NG's silent rotated-frame retries and its hole-aware bisector's two
  logged loops (a balance retry, up to 20 in random frames, then accepted; a restart when no far edge exists)".
* **Item 46** — replace "it reproduces MFCG's coastal counts 4 / 7 / 10 / 14 where the land law gives 5 / 8 / 12 / 18" with
  "the coded law counts mesh cells — 2 + ⌊0.75 × inner cells ÷ 12⌋, recorded 3 / 4 / 5 / 7 at sizes 26 / 39 / 51 / 80 — and this
  rounding of 0.75 on the land law's surplus is its metric restatement (J-Fcode-6)". The rest of item 46 stands (three
  pinned passes and the 0.75 factor re-derived in `CurtainWall`).

**Items judged on re-derived evidence (this checkpoint):** 33–48, 51–56, 58 and 62 CONFIRMED (receipts in
`docs/fable-review/main/code.md`); item 37's `flatten` default stands (J-Fcode-3). Items 50, 57 (the VG half), 59 (beyond
the timing), 60 and 61 are judged when the FTG, VG, Fantasy Manor and Dwellings rows complete (the continuation of this lane).
No editor text of items 33–62 carries a reference identifier, code, grammar, palette or word list; the two "Design says"
quotations that hold identifiers (II.3's and §3.1's) are removed by their own editor changes.

## Fable review (2026-09-27) — evidence gate, completion

Reviewer: Fable 5.1, lane fable-review/main/code (`docs/fable-review/main/code.md`, final). The items the first checkpoint left
for the remaining readings are now judged on re-derived evidence; nothing here changes the verdicts of the evidence gate above.

| item | verdict | evidence (re-derived by this seat) |
|---|---|---|
| 50 | **CONFIRMED** | the building message's field 6 is `lightPosition` and no field carries a door; the client's fallback is the midpoint of the outline's first two vertices; the editor texts stand as written |
| 57 (VG half) | **CONFIRMED** | VG 1.6.9's field pick is a greedy growth keyed on each picked lot's distance from the houses' centroid plus its nearest gap to the candidate, until houses × field factor × 1 000 area units; seeds on the highway, the shores and a 14-point ring; right-angled bisection; the 0.55 / 0.4 lot filter — "claimed outward from the settlement's centre" is this rule |
| 59 (beyond the timing) | **CONFIRMED** | collisions block–block, dormer–(dormer, block), tower–tower and nothing against a wing; one porch lottery per wing with a bay fallback and no entrance guarantee; the fixed 800-unit scale; the five layouts; the hip block's ridge inset by a quarter of its short side — never a pyramid; the 51-generation replay re-executed by this seat, identical |
| 60 | **CONFIRMED** | basement n ÷ (n + 1); the basement as the largest room of a throw-away plan at average 12; round(half) of the non-redundant extra doors removed and the rest kept as loops; storey window density 0.8 at the top and 0.1 less per storey below; entrance weights 5 / 3 / 1 / 0; the upper-storey stair connection's failure unguarded; a URL plan wider or taller than 11 cells dropped for a random house; both replays re-executed, identical |
| 61 | **CONFIRMED** | the density formula, the 5-unit trackers with their per-type weights and terms and the rigidness gate, branching at minBlock ÷ density, the 12–19-width square, frontage draws accepted with the local density, population houses × U(3, 7), the class thresholds, the greedy fields, the periodic tree tile, the one-step retry, the 10 × 10 palisade lattice kept with density − 0.1; the bundle's single version string is 1.6.9 |
| (c) ranges | **accepted as judgments (PLAUSIBLE)** | for the CONFIDENCE ruling seat; Fantasy Manor merits its own row (replay re-executed by two seats); VG's range could sit at 0.80–0.85 after this review — no change forced |

Editor texts of items 50, 57, 59, 60 and 61 carry no reference identifier, code, grammar, palette or word list. With this, every
part of items 33–62 marked HOLD — PLAUSIBLE has a verdict (RELEASED or REJECTED, above), and the next pass may apply the file
as corrected by the evidence gate.
