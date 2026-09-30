# Corpus preview — THE LOOK

> PENDING FABLE REVIEW — Opus-produced (corpus-preview/look), not yet checked by a Fable seat; PARTITIONED until the reconciliation stage.

Lane `corpus-preview/look`, 2026-09-26. A read-only survey of SettlementForge's map corpus
(`~/Desktop/settlement-engine/map-corpus`). **It is not an input to any current design document.** Nothing in the
corpus was written, moved or executed; its two measurement instruments were copied into the session scratchpad and
run from there. `GENERATION-SPEC.md` and `MORPHOLOGY-PLAN.md` were not opened. No holdout plate was viewed or measured.
No plate lettering is reproduced here.

**Answer in one paragraph.** Yes, the corpus defines measurable look targets, and its instruments reproduce. There are
palette bands, an ink-darkness gate, a line-weight ratio, three texture ("hand") bands, a fabric-grain ladder and
twelve banned priors. They describe a **painted surveyor's-folio** look: warm cream paper, watercolour washes and a
wavering brown ink. **None of the five competitors draws in that medium**, so the measured distances are large, and
they show a difference of medium, not a lack of skill. MFCG scores exactly 0.00 on both paper grain and wash
variation, and Neighbourhood scores 0.00 on grain with a median of 0.0 on wash. Both are below every one of the
246–259 non-holdout plates. Every competitor's ground is about 20–40 L darker than the corpus paper centroid (L 235). For **matching** the competitors the corpus adds little, because our own captures of
them are the better target. For **exceeding** them it adds a lot: it gives the "exceed" axis a number and a working
ruler. That ruler can be fooled, though, and our design currently has none of the six hand mechanics the corpus
measures. Net effect: a small rise in confidence that we can *exceed* the look, no change for *matching* it, and a
small new risk to speed and simplicity if the painted look is pursued.

---

## §0 What was read in full, and which plates were viewed

**Read in full:** `map-corpus/README.md`; `docs/laneHF-CALIBRATION.md` (the index, all 395 lines); `docs/laneMFS1-urbanism-atlas.md`
(all 1 480 lines: Part 1 per-plate notes, §2.1–§2.10 including the 26 targets, the §2.3 bands, the §2.4 twelve banned priors,
the §2.5 delta tables and the §2.9/§2.10 correction folds); `docs/laneHFM1-receipt.md` (all 571 lines);
`docs/laneHFM1-band-exceedance.json` (all 23 rows). **Read in part:** `docs/laneHF4-receipt.md` §6 (the class table and the
scrub list) and §10; the instrument sources `HFM1-palette.py`, `MFS1-aesthetic.py`, `MFS1-grain2.py`, `HFM1-one.py`,
`HFM1-register.py` and the palette and chroma parts of `MFS1-measure.py`. **Queried:** `docs/laneHFM1-corpus-measured.csv`
(313 × 47) with Python, **with the 53 holdout rows removed** (n = 260).

The index and the atlas contain text rows about some holdout plates (for example hf12, hf31, hf56, hf59, hf61, hf73). I
read them because the brief says to read those documents in full. **No holdout plate is cited, summarised or used in
any figure below.**

**Competitor evidence:** `research/findings/visual-spec.md` (in full) and `research/findings/manor.md` §5 (rendering and
style). Screenshots viewed: MFCG `2026-09-21T05-03-24/draw/gen-0` and `05-06-58/draw/gen-2`; VG `05-04-05/draw/gen-0`;
NG `05-04-54/draw/gen-0`; FTG `05-23-58/steps/002-overview` and `006-street-level`; FM `2026-09-25T11-25-38/contact-sheet`.
Another 32 competitor frames were measured without being viewed (§1.3).

**Our design:** `docs/ARCHITECTURE.md` §8, style parts only: the §8 intro, §8.2 (roles, contrast matrix, role values,
symbolisation, paint programs, layer order, presets), §8.3 (catalogue, census), §8.4 (shadows), §8.5 (city-band
figure-ground contract) and §8.10 (decoration instances). I did not read §8.1 or §8.6–§8.9. I also searched §8 for
hand-drawing terms.

**Plates viewed: 64 non-holdout previews** (`previews/prev-*.jpg`, 1100 px), each viewed once by eye. A script checked
that none is in the §2.9.4 roster (`look-data/sample.out`). Per-plate notes are in `look-data/viewnotes.md`.

| class (index/CSV) | plates viewed | n |
|---|---|---|
| thorp | hf85, hf86, hf88, hf90, hf10 (the washout negative) | 5 |
| hamlet | hf11, hf93, hf95, hf96 | 4 |
| village | hf3, hf13, hf15 (negative: concentric), hf16, hf125, hf232, hf284 | 7 |
| town / stressor | hf20, hf23, hf24 (the washout negative), hf26, hf60, hf62, hf72, hf165, hf277, hf316, hf324, hf369, hf131 (oblique shelf) | 13 |
| city | hf4, hf30, hf33, hf40, hf133 (negative: fan), hf235, hf274, hf327 | 8 |
| metropolis | hf34, hf100 (negative: oval), hf101, hf103, hf104, hf389 | 6 |
| castle | hf55, hf110, hf111, hf345 | 4 |
| terrain and countryside | hf36, hf112, hf113, hf114, hf115, hf140, hf142 | 7 |
| lens / register | hf5, hf50, hf51 (hf277 is counted under town) | 3 |
| deliberate negatives: series, experiment, oblique | hf216 (series negative), hf300 (register negative), hf123 (oblique shelf) | 3 |
| specimen sheets | hf208, hf303, hf320, hf378 | 4 |
| **total** | | **64** |

Of the 64, **9 are negative or grammar-only references by the corpus's own labels**: hf10, hf15, hf24, hf100, hf123,
hf131, hf133, hf216 and hf300. Three more sit at the register edge: hf60, hf324 and hf369. The sample is not random. I
chose it by class to cover every band, the negatives, the lenses and the specimens. By era it is HF-1 23, HF-2 18,
HF-3 10, HF-4b 5 and HF-4c 8; it leans toward HF-1 because that is the corpus's own reference cohort. One viewed plate, **hf284**, is on the scrub list (a foreign-language scale
label). Two more, **hf86** and **hf165**, carry real-name leaks that the index records. All three were used for drawing
only.

---

## §1 Findings

### 1.1 The corpus does define measurable look targets. What they are, and how firm each is

| target family | the corpus's figure (strongest cohort, per atlas §2.3) | evidence grade | my recomputation without the holdout (n = 60 strongest-cohort plates) |
|---|---|---|---|
| **paper** | centroid `#F8E9D4`, L 226–244, warmth R−B 20–50, pinned at 36 | [M], instrument recovered and calibrated on 49 pairs | 5 of 260 plates fall below L 226; the lowest daylight plate is 221.9 (only the night lens hf197 goes lower, at 115.8) |
| **ink darkness** | darkest 0.5 % L: ≤ 45 full ink · 45–62 acceptable · > 62 under-inked; ink centroid `#2E201A` (warm brown-black) | [M] | median 34.95 (published 35.2); 35 of 260 = 13.5 % are under-inked |
| **chroma** | 18–70, median 43.3 | [M] | median 43.95 |
| **line** | stroke p25/p50/p75/p90 = 4/6/10/17 px on a 5056 px plate; p90/p25 ratio 3.1–7.2, median 4.33; "never fewer than five weights on a leaf"; relative weights wall 4–5, landmark 2.5–3.5, block silhouette 2, frontage 1, party wall 0.5, plot tick 0.4–0.6, field 0.25–0.4, ghost 0.38 with a 6-2 dash | ratio [M]; the weight table is [M] on 3 native crops, the rest [E] | ratio median 4.33 |
| **texture ("the hand")** | paper grain σ 1.30–2.96 (median 2.05); within-fill wash σ 1.83–4.39 (median 3.29); fill-tone IQR 6.1–59.3 (median ≈ 18); waver 0.5–1.5 × stroke width; width modulation ±25 %; corner overshoot at 30–60 % of joins; **wash mis-registration 2–8 px, called "the one property that, if omitted, will keep the output reading as vector art"**; 3–8 paper defects per leaf | first three [M]; the last five **[E] from native crops of about 3 plates** | grain 1.29–2.1–2.98; wash 1.82–3.28–4.24 |
| **density of marks** | grain (cells across the settlement) village 30–50, town 45–80, city 60–95, metropolis 80–120 (walk 46 → 57 → 69 → 98); thorp and hamlet **withdrawn** (the instrument counts hedges); reed clusters about 1 per 400 px², crowd dots about 1 per 250 px², paving stipple about 15 %, accent colour 1–3 % of plate area | grain [M] at n = 9/12/9/9; everything else [E], mostly from one plate each | not recomputed (the windows are hand-set) |
| **banned priors** | 12: concentric shapes, sunburst fields, default river bisection, empty blocks, oblique projection, machine regularity, **even spacing of repeated elements ("the strongest generated tell")**, thinning the ink to show a state, uniform grain, mirrored banks, clean wealth boundaries, corrupt lettering | annotations with named exemplars, [E] | — |

**CONFIRMED:** removing the 53 holdout plates moves no strongest-cohort band by more than 0.15 on any axis
(`look-data/q2.out`). The instruments reproduce: I copied `HFM1-palette.py` and `MFS1-aesthetic.py` byte-identically
(the SHA-1 hashes match) and ran them.

**Limits the corpus states about itself, and which I verified.** The atlas's own §2.10 demotes T-03…T-26 to "design
hypotheses" wherever they rest on per-plate readings. It says synthetic plates "can establish visual vocabulary …
never historical incidence". It rules that star marks are annotations, and that only the measured register-index
percentile may be cited for grading. The atlas records that the eye placed three plates at register extremes where the
pixels put none. **I found the reverse case too:**

- **hf16** (REG 92.7, the highest in my sample) is by eye largely a picture map: longhouses in three-quarter view,
  side-view conifers and a church in elevation.
- **hf131**, an oblique-shelf plate, scores 75.4.
- **hf300**, a labelled register negative drawn with crisp digital linework, scores 63.2.

The register index measures paint texture. It does not measure projection or drawing discipline. The atlas's oblique
list does not flag hf16, so it should be re-checked at native resolution.

### 1.2 What the plates look like, by eye (n = 64, previews only)

- **The target register is consistent across the strong plates.** Warm cream or aged, stained paper; watercolour fills
  with blooms and edge pooling; a thin brown line that wavers; roofs as washed masses with ridge or hip ticks and
  per-roof tone jitter; hedgerows as irregular chains of tree rounds. hf208's "without the hand / with the hand" strip
  sums up the intended difference in one image.
- **The corpus's lowest-register plates look like the competitors' class of drawing.** hf369 (REG 8.3; flat tan fills,
  uniform thin lines, sans-like capitals), hf327 (25.2), hf284 (23.0) and hf165 (solid black masses, no wash) read as
  flat vector graphics. The corpus's measured ladder puts competitor-style flat rendering at its bottom.
- **The plates break their own banned priors often.** By eye, about **23 of 64** show even spacing of repeated elements
  (towers, crenels, stamped garden and orchard grids, conifer grids, hachure combs, boat rings). About **14 of 64** have
  half-raised or elevational glyphs (windmills, ships in side view, domes, towers in three-quarter view). Nearly all
  have garbled or leaked lettering. **The value lies in the annotations of the priors, not in the plates as clean
  exemplars.** The atlas says the same.
- **Where the competitors are stronger than the corpus:** strict top-down projection, clean true lettering, and every
  block resolved at city scale. hf34's northern wards, for example, are outline-only (prior #4); MFCG draws every
  building.

### 1.3 How far the competitors are from the corpus's targets (measured with the corpus's own instruments)

I ran copies of `HFM1-palette.py` and `MFS1-aesthetic.py`, plus the chroma formula from `MFS1-measure.py`, on
**39 competitor frames**: MFCG 7, VG 8, NG 8, FTG 6, FM 10. The frames were cropped only to remove UI, VG's letterbox and
FTG's chrome. Raw rows are in `look-data/comp_measure.json`.

**Resolution control, so the numbers mean something.** I measured 10 non-holdout plates at native 5056 px (the CSV) and
again downsampled losslessly to 1500 px (`look-data/rescontrol.json`):

| axis | how it moved at 1500 px | status |
|---|---|---|
| ink L, paper L, chroma | ≤ 2.4 | stable, **usable** |
| paper grain σ | −0.1 to −0.25 | stable, **usable** |
| wash σ | −0.6 to +0.7 | **usable**, with that tolerance |
| fill-tone IQR | 19.5 → 6.4, 14.1 → 6.6 | **not comparable across resolution** |
| stroke ratio | −1.0 to +2.5 | **not comparable across resolution** |

IQR and stroke ratio are therefore not graded for the competitors.

| axis (corpus band) | corpus | **MFCG** | **VG** | **NG** | **FTG** | **FM** | **our `ink` default** (hex only, no render exists) |
|---|---|---|---|---|---|---|---|
| paper / ground L (226–244) | 235 | **197.6** | 196–232, median 205 (grass and sand, not paper) | **196.9** | 199–221 (the brightest pixels are wheat fields) | **195.2** | **238.0**: inside the band |
| paper warmth R−B (20–50, pin 36) | 36 | 20 | 24 | 21 | 32–72 (fields) | 23 | 24: in band, at the cool end |
| ink L gate (≤ 45 full; > 62 under) | 34.3 | **25–43: full** | 19–26: full | **54–65: edge or under** | **62–70: under** (no outlines; shading instead) | **47–75, median 70: under** | 37.9 as a hex; the rendered figure will be higher because of hairline antialiasing (PLAUSIBLE) |
| ink warmth R−B | 20 | 3 (neutral) | −8 (cool) | 20 | 16 | 22 | **7 (neutral)** |
| chroma (18–70, median 43) | 43.3 | **16–19: at or below the floor** | 26–43 | 22–24 | 38–43 | 24–26 | role chroma ≤ 18 CIELAB by rule; plate figure PLAUSIBLY 20–30 |
| paper grain σ (1.30–2.96) | 2.05 | **0.00** | 0.4–6.6, median 0.74 (contour texture; unstable) | **0.00** | median 0.79 | **3.29 on every frame** (its 64 × 64 noise tile) | none specified; flat paper → 0 (PLAUSIBLE) |
| wash σ (1.83–4.39) | 3.29 | **0.00** | 0.5 | **0.0** (0–1.9) | 2.4–2.6 at street level (texture tiles and lighting) | 3.0–6.4 (its 50 %-alpha roof hatching reads as "wash") | flat fills → 0 (PLAUSIBLE) |
| waver, width modulation, overshoot, mis-registration | present | absent | absent | absent | absent | absent | **absent**: 0 hits in §8 for waver, wobble, mis-registration, overshoot, foxing or blot |

**Grain (density of marks), indicative only.** I ran the `MFS1-grain2.py` kernel with windows I set by eye
(`look-data/grain_comp.out`, n = 2 usable maps):

- MFCG's town "Feygate" measures **29.5 cells across**, against the corpus town band of 45–80.
- MFCG's metropolis "Stormway" measures **67**. That sits in the corpus *city* band, not its metropolis band (80–120).
- The tier mapping between MFCG sizes and corpus tiers is unknown, and corpus populations are [E].
- **PLAUSIBLE reading:** the corpus's fabric is finer-grained than MFCG's at the same nominal tier.

**Banned priors in the competitors** (from visual-spec facts; PLAUSIBLE as verdicts):

- Even spacing (#7): MFCG's furrows at 9–10 px and its grid; NG's regular roof-hatch triangles; FTG's
  hedgerow-blob rows.
- Near-regular ring plans (#1): FM's ring and closed manors.
- MFCG's single building grey is uniform grain (#9) by construction.
- On corrupt lettering (#12), oblique projection (#5) and empty blocks (#4), the competitors do *better* than the
  corpus.

### 1.4 What this means

- The corpus's aesthetic bands are **a target for a medium none of the five competitors uses**. MFCG is a grey-buff
  monochrome print; NG is flat graphic; VG is an illustrated colour plate; FTG is a lit web map; FM is a lit roof plan.
  "Distance to the corpus" measures distance from SettlementForge's chosen folio look. It is not a quality ranking of
  the competitors.
- **On palette alone, our design's default `ink` family already sits closer to the corpus than MFCG does:** its paper is
  L 238 inside the band (MFCG's 198 is darker than every non-holdout plate except the night lens hf197), with full-ink darkness. It sits with MFCG on
  the hand axes: flat fills and exact vector paths.
- **The ruler can be fooled.** FM passes the paper-grain band and exceeds the wash median using a repeated noise tile and
  alpha hatching, which are procedural texture rather than hand. Meeting the numbers is necessary, cheap, and **not
  sufficient**.

---

## §2 What raises confidence

1. **"Exceed the competitors' look" now has a definition and a working ruler.** The instruments reproduce
   (byte-identical copies, recomputation within 0.15). Five of seven axes stay stable at screen resolution. On the
   hand axes every competitor is measurably outside the target: MFCG scores 0.00 on grain and wash and NG scores 0.00 on grain
   with a median of 0.0 on wash, while the
   lowest non-holdout plates score 0.60 on grain and 0.74 on wash. **CONFIRMED** for the measurements; the rest of this point is PLAUSIBLE.
2. **Our default palette already clears the corpus's palette targets that MFCG misses.** Paper is L 238 against 197.6,
   and warmth is inside the band. The ink hex is full-ink. This comes from the role table alone (CONFIRMED arithmetic);
   rendered values are PLAUSIBLE.
3. **Several structural look targets are already present in our §8.**
   - A two-tier block stroke: masses outlined, with party lines at ⅓ of the outline width (the corpus says ½).
   - At least five distinct weights on a leaf (wall, tower, casing hairline, outline, party line, boundary, furrow,
     grid).
   - Blue-noise stamps and ±15 % jitter for trees, orchards and hedgerows, which counter prior #7 for vegetation.
   - A `ruin` pattern, `hatch` and `contourMarks(hachure)`, and reserved `parchment` and `painterly` families that could
     carry a painted register without touching the MFCG-family default.
   - (CONFIRMED by reading §8.2, §8.5 and §8.10.)
4. **The corpus lists exactly where AI-drawn maps fail** (even spacing, concentric drift, empty blocks, projection
   leaks, corrupt lettering). It is a ready-made regression checklist, and on lettering and projection a deterministic
   generator starts ahead of the corpus by construction.

## §3 What lowers confidence

1. **It is not evidence about the competitors.** The bands come from one image model, one prompt family and one chosen
   medium. The corpus itself warns that "synthetic agreement is not corroboration" (§2.10.2). For MFCG, VG, NG, FTG and
   FM look parity, our own captures remain the target, and this lane leaves those parity estimates unchanged.
2. **Measured paint is not perceived quality, and vice versa.**
   - The eye misjudged three register-edge plates, according to HF-M1.
   - I found oblique or negative plates scoring high (hf16 92.7, hf131 75.4, hf300 63.2).
   - FM passes grain and wash with a noise tile.
   - A render graded on these bands alone could pass while looking wrong, or fail while looking right.
3. **Two of the six hand bands (tone IQR and stroke ratio) do not survive a change of resolution.** Grading screen
   renders with them needs a fixed plate-equivalent render (CONFIRMED on n = 10).
4. **Our design contains none of the six hand mechanics:** waver, width modulation, overshoot, wash mis-registration,
   a per-fill wash ramp and paper defects (CONFIRMED by search). Exceeding on this axis would be **new capability**,
   which is the owner's call, not a repair. Per-vertex waver and per-fill offsets and ramps on MFCG-scale
   metropolises (46 000 fills) would press on the speed and simplicity estimate (PLAUSIBLE).
5. **The grain ladder may pull against MFCG parity.** MFCG's town and metropolis measure below the corpus's
   same-tier bands (n = 2, eye-set windows, tier mapping unknown). Aiming at both could force a choice on fabric
   fineness (PLAUSIBLE).
6. **Most density-of-marks and hand targets beyond grain are [E], from roughly 1–3 plates each.** The thorp and hamlet
   grain rungs are withdrawn, and populations are [E].

## §4 Limits of this evidence

- **Plates:** 64 of 260 non-holdout plates; 1100 px JPEG previews; each viewed once; no native-resolution crops;
  chosen by class, not at random.
- **Competitors:** 39 frames at 1500 × 1100 (VG cropped to 1100², FTG to 1040 × 910); default styles only. FTG's
  parchment style, MFCG's alternative palettes and FM's slate or simplified views were not measured. For VG and FTG the
  "paper" readings are grass, sand or fields, not paper.
- **Our design:** no render exists. Every figure for our design is palette-level (role hex → luma and warmth). Plate
  figures are marked PLAUSIBLE.
- **Instruments:** the resolution control covers 10 plates. The grain comparison uses 2 MFCG maps with eye-set windows.
  FM's 10 frames are coverage screenshots with the building small against a large ground, so the ground dominates its
  numbers.
- **Published bands:** the corpus's published bands were derived with the holdout rows included. My recomputation
  without them is the one quoted as CONFIRMED.
- **Scope:** I did not open the historical evidence files, the `MFI1`/`MFS3` outputs or any settlement-engine file
  outside `map-corpus/`.

## §5 What the reconciliation stage will need from it

1. **An owner ruling on scope.** Do the corpus's register targets bind the default `ink` family (the MFCG-parity look),
   a separate painted family (`parchment` or `painterly`), or neither? This lane recommends nothing.
2. **A fixed measurement render** (plate-equivalent resolution and framing) before any tone-IQR or stroke-ratio grade.
   Otherwise, grade only the five resolution-stable axes.
3. **Instrument plus eye.** A Fable seat at native resolution, and an anti-gaming check: a flat render with a noise tile
   must not pass. FM is the test case.
4. **A banned-prior census on our renders:** even spacing of towers, crenels, hachure, stamps and furrows; concentric
   drift; empty blocks; uniform grain; mirrored banks.
5. **A palette cross-check** of our role table against the corpus role table. Warmth: paper 24 against 36, ink 7
   against 20. The roof and building value steps.
6. **A grain measurement of our generator's output against both** the corpus ladder and MFCG's fabric at matched tiers.
7. **A performance budget** for any hand mechanic adopted.
8. **Re-check items for the corpus owner:** hf16's projection class (a possible unflagged oblique plate); FM as a
   known false positive of the grain and wash instruments.
9. **The holdout.** Any final "indistinguishable from the corpus" claim must use the 53-plate roster, which this lane
   never viewed.

**Reproducibility:** everything is in `look-data/`.

- `measure_comp.py`, `measure_comp_lib.py`, `rescontrol.py` and `grain_comp.py` expect byte copies of
  `HFM1-palette.py` and `MFS1-aesthetic.py`, saved as `HFM1_palette_copy.py` and `MFS1_aesthetic_copy.py`, in the same
  folder. Copy them there; never run them in the corpus.
- Outputs: `comp_measure.json`, `rescontrol.json`, `grain_comp.out`, `q1.out`, `q2.out`, `sample.out` and
  `viewnotes.md`.

**CONFIRMED vs PLAUSIBLE:** these are CONFIRMED by execution: every measurement, the reproduction of the bands without
the holdout, the resolution-control result and the absence of hand mechanics in §8. Every statement about our design's
*rendered* look, the grain tier mapping, and the cost and priority judgments is PLAUSIBLE.

## Fable review (2026-09-27) — B-corpus-preview/look

**Verdict: CORRECTED** — the measurements stand; one conclusion sentence does not. Reviewer: Fable 5.1, lane
fable-review/main/manager-corpus; full record docs/fable-review/main/manager-corpus.md. Marker line and queue status are
the close seat's. Corpus-side figures are accepted on this file's quoted script output: the reviewer may not open the
corpus (standalone rule); everything below was re-derived from this lane's saved data under look-data/.

- **Re-derived from look-data/comp_measure.json (39 frames):** every §1.3 cell holds to the decimal — MFCG paper L 197.6,
  ink 25.1–42.8, chroma 16.3–18.6, grain 0.00 and wash 0.00 on 7/7; VG paper 196.2–232.0 (median 204.6), grain median
  0.74, wash 0.46–0.51; NG paper 196.9, ink 53.6–65.0, grain 0.00, wash median 0.0 (max 1.92); FTG paper 199.2–221.1, ink
  61.8–69.6, chroma 38.3–42.8, grain median 0.79, wash 2.43–3.57 (median 3.355); FM paper 195.2, ink median 69.85, grain
  3.29 on 10/10, wash 2.95–6.44 (median 4.51). q2.out's holdout-free bands (grain 1.29 / 2.10 / 2.98; wash 1.82 / 3.28 /
  4.24; ink median 34.95; chroma median 43.95; stroke ratio median 4.33), sample.out (64 plates, 0 duplicates, 0 holdout
  hits) and rescontrol.json (n = 10; hf50 IQR 19.5 → 6.4, ratio 3.5 → 2.5) hold. The design's role values are the ones
  measured here (docs/ARCHITECTURE.md §8.2: paper #F6EDDE = luma 238.0, warmth 24; ink #292522 = 37.9, 7). The design
  still has no hand mechanic (0 hits for waver, wobble, mis-registration, overshoot, foxing, blot on 2026-09-27).
- **CORRECTION to §2.1** ("on the hand axes every competitor is measurably outside the target"): false for FTG — its wash
  lies inside the band 1.83–4.39 on 6 of 6 frames (the §1.3 cell "2.4–2.6 at street level" quotes a subset of 2.43–3.57)
  and its grain inside on 2 of 6 (2.49, 2.96) — and for FM, whose grain 3.29 and wash median 4.51 sit 0.33 and 0.12 above
  the band tops. The correct statement is the one §1.4 already makes: the flat competitors (MFCG, NG, VG) are outside;
  FTG and FM reach or pass the texture bands with lit texture tiles and a repeated noise tile; the bands separate flat
  from textured, not hand from machine, so the eye check remains necessary. §2.1's confidence point stands for the flat
  competitors only. (The synthesis seat found the same in its §2.4; this review makes the correction here.)
- **Paper-band provenance (for item 69's editor):** §1.1 documents the holdout-free recomputation for the texture, ink and
  chroma axes but only a below-226 count for paper. From this lane's q1.out, the HF-1 reference cohort (n = 43,
  non-holdout) has paper luma p5 224.6, median 235.7, p95 242.7 and warmth median 37 — consistent with the published
  226–244 / 235 / 36 within 1.5 L. The all-plate non-holdout median is 242.65 (36 % of plates above 244), so the target is
  the reference cohort's, as the corpus declares. The unit is 8-bit luma (the lane's own output gives #F6EDDE = 238.0).
- grain_comp.out also holds FTG (26 cells) and VG (9.2) windows that §1.3 does not report; omitting them as not
  tier-mappable is fine, but §1.3's "n = 2 usable maps" should say the other two were measured and set aside.
