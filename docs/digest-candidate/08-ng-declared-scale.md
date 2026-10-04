# Digest entry 8 — NG's declared scale of 0.35 m for each model unit

Implementer digest, entry (8) of nine. Written research-side at M-1 (2026-10-04) for every NG row an AFTER-M-1 item
reads in metres (M0-b-05a, M0-b-05b, M0-c-07a, M0-c-07b) and for `ng-faces.json`; our own words, numbers and
`baselines.json` row ids only. Provenance label: `research:M-1/E11` (section 2 and section 10.2), `research:M-1/E10`
(section 3 and 9.6), the ruling of `research:M-1/rulings-1` (R-01), rows by `research:M-1/E15`.

## 1 The declaration

NG's output carries no unit. A **model unit** is one canvas pixel over the map's paint scale (0.56–1.11 on the
recorded hoods). Every NG number that needs metres is converted at **0.35 m per model unit**, the design's own
inference in §4.6 step 5 (`cut.flattenM` = 0.7 m = two model units), as a **declared** scale with provenance `own`.
No scale was measured: the input stays truthful (its header's scale is `declared`, with the unit in metres per model
unit, 0.35 ÷ the map's paint scale per pixel), every metre row carries scale `metric` with the note "declared 0.35 m
per model unit (own)", and every such value is labelled declared in M-1's records. The constant is re-examined at M5
against the owner's NG panel counts.

**Plausibility.** At 0.35 m the median footprint short side of NG's hoods is 20.3–20.8 model units = 7.1–7.3 m on the
fixtures (6.7–8.7 m across the 20 `medium` formula hoods), an ordinary town-house frontage; the median footprint area
is 586–605 model units². Both are type-7 medians over every footprint of a map.

## 2 The rows that rest on the constant

| quantity | the constant in model units at 0.35 m | rows |
|---|---|---|
| the 2 m node merge and the 10 m arm of the junction census | 5.71 and 28.6 units | `ng/medium/junction.*` (entry 5) |
| the 100 m minimum pair distance of `street.detour`; `street.cyclesPerKm2` | 285.7 units; per declared km² | `ng/medium/street.detour/all`, `ng/medium/street.cyclesPerKm2/all` |
| `plot.minWidth`'s 0.25 m bins | 0.714 units | `ng/medium/plot.minWidth/*` |
| the 2 m gap and 100 m frontage unit of `fg.streetwallGap100` | 5.71 and 285.7 units | `ng/medium/fg.streetwallGap100/all` |
| `block.area`'s log bins, 50–50 000 m² | — | `ng/medium/block.area/*` (the target row M0-b-05b reads) |
| `cut.length`'s 5 m bins to 400 m | 14.3 units per bin | `ng/medium/cut.length/*` |
| `cut.flattenM` 0.7 m | 2 units | entry 2 |
| the depth rows and the court radius threshold (1.5 × the median short side, about 10.8 m) | — | entries 2, 4, 6 |
| `ng-faces.json`: hood outlines and face rings in integer centimetres, block areas in cm², cut lengths in cm | cm = px ÷ paint scale × 35, rounded half to even | the face-record file (M0-b-05b, M0-c-07b) |

Scale-free rows (σ, the corner, arrival and fillet shares, the court share, the party-wall and attachment shares, the
4-way share, the relative block areas and the relative minor extents) need no scale; `block.areaRel` crosses
beside `block.area` as a descriptive companion in median-footprint-area units on 24 log-spaced bins over 0.5–500 plus
underflow and overflow.

## 3 Representative values at the declared scale (20 `medium` hoods)

| row id | value |
|---|---|
| `ng/medium/block.area/all` | 608 built blocks over 20 hoods; per-seed medians 1 121–3 925 m²; `spreadKS.p90` 0.819 over the 40 within-template seed pairs (per template: area 0.327, street 1.000, square 0.703, ring 0.819) |
| `ng/medium/cut.length/all` | p10 / p50 / p90 37 / 55 / 89 m over 379 bounded cuts; per template area 43 / 57 / 87, ring 35 / 54 / 90 m |
| `ng/medium/street.cyclesPerKm2/all` | 197.9 [81.4, 331.2] cycles per declared km² (the built outline a convex hull of every drawn road and footprint vertex) |
| `ng/medium/fg.streetwallGap100/all` | 2.45 [2.01, 2.85] gaps over 2 m per 100 m of frontage |
| block minor extents, `area` template at `medium` | p10 / p50 / p90 30.0 / 39.7 / 54.6 m (entry 2's input) |

**For M0-b-05b's distribution clauses.** At NG's sample the KS ceiling (1.25 × `spreadKS.p90`) is at least 1 on the
`all`, `ring` and `street` subsets of `block.area` and on the `all`, `street` and `square` subsets of `cut.length`, so
those clauses cannot fail; the subsets with power are `block.area` on the `area` (ceiling 0.41) and `square` (0.88)
templates and `cut.length` on `area` (0.30) and `ring` (0.62). The face-record file's block areas hold every leaf of a
face, while the `block.area` row holds built blocks only; the two populations differ by about 7 % (35 unbuilt leaves of
489).

## 4 The frame the numbers were measured in

NG paints its roads and its footprints on separate canvases composited afterwards, and the pixel frames of the two
layers differ by an integer offset (up to about 30 px). M-1 located both layers in each hood's screenshot and moved the
footprints into the road frame (0–2 footprints crossed by a centreline per map after registration, against 88–484
before); every footprint-to-road measure (built blocks, the court share, frontage gaps) rests on that step, and the
face-record file sits in the registered road frame. Precision is about ± 1 px; built-block counts are identical at the
four ± 1 px neighbours and the court share moves by at most 0.0625.

## 5 Status

CONFIRMED by execution research-side: every number above; the registration offsets and crossing counts; determinism;
the red tests. PLAUSIBLE: that 0.35 m per model unit is the right declared constant (its check is the frontage width
above; the ruling that adopted it is vetoable, and a veto would make every NG metre row `notApplicable` on a relative
input and the face-record file undeliverable); that the layer offset comes from content-sized canvases composited
later (the fit confirms the offsets; the compositing step was not observed).
