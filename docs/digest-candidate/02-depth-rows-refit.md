# Digest entry 2 — the re-fitted plot-depth rows, the regime floor and `cut.flattenM`

Implementer digest, entry (2) of nine. Written research-side at M-1 (2026-10-04) for the AFTER-M-1 run item
M0-b-05a (the depth rows applied) and for M0-b-05b (`cut.flattenM`); our own words and numbers only. Provenance
label: `research:M-1/E12` (the fit and its ruling), with the inputs of `research:M-1/E11` (NG block extents) and
`research:M-1/E09` (MFCG block extents). No `baselines.json` row carries these cells: they reach M0 as the table
values below, provenance "M-1 2026-10-04", and the design amendment records the same numbers (§4.7's band table,
§4.4's regime table, §4.6 step 5).

## 1 What was re-fitted and how

The plot-depth rows of §4.7's band table and the dense-core floor of §4.4 were re-fitted under §4.6 step 1's per-face
stop law, read as **the blocks the recursion leaves**, not the threshold itself: each face draws τ in [e_lo, e_hi] with
g = |(u₁ + u₂ + u₃ + u₄) / 2 − 1| (τ = e_lo · (e_hi / e_lo)^g), e = max(2 d, floor), and the fitted pair is the one
whose leaves have the reference's block p10 and p90 (the minor extent of each block's minimum-area rectangle). Because
g heaps near 0 (its mean is 7/30), the law's leaves have a p90 / p10 spread of at least 1.74, and they reach the
references' spreads only when e_hi is two to four times e_lo. So **e_hi is the rarely drawn top of the range, not the
deepest block the law produces**: under the ruled `modest` range [48, 96] m, τ's own p90 is 67 m and the blocks left
have p10 / p50 / p90 of 30.2, 42.3 and 54.9 m.

As they stood, the design's rows would have left `modest` blocks of p10 / p50 / p90 21.9 / 30.5 / 38.8 m at CITY,
against NG's 27.8 / 39.0 / 57.0 m pooled — the smaller blocks the per-face reading predicted.

## 2 The cells (CITY basis, depth factor 1.00; the rung depth factors 1.10 / 1.00 / 0.95 unchanged)

| cell | old | new (M-1 2026-10-04) | block range e = 2 d | forward p10 / p50 / p90 (m) | fitted from |
|---|---|---|---|---|---|
| `poor` depth (m) | 12–20 | 16–32 | [32, 64] | 20.1 / 28.2 / 36.5 (dense core, floored [37, 64]: 22.7 / 31.6 / 40.4) | the `modest` ratios |
| `modest` depth (m) | 18–30 | 24–48 | [48, 96] | 30.2 / 42.3 / 54.9 | NG `area` template at `medium`: 5 hoods, 194 bounded built blocks, p10 / p50 / p90 30.0 / 39.7 / 54.6 m; fitted [47.6, 96.4] |
| `prosperous` depth (m) | 25–40 | 33–64 | [66, 128] | 41.3 / 57.7 / 74.6 | the `modest` ratios |
| `rich` depth (m) | 30–60 | 40–96 | [80, 192] | 51.9 / 73.1 / 97.0 | the `modest` ratios |
| dense-core floor (m) | 30–45 | 37–45 | — | — | lo end: MFCG plain, 30 seeds (10 per size 40 / 80 / 130), 20 359 intramural cluster blocks, p10 / p50 / p90 28.9 / 45.5 / 70.3 m; fitted [36.9, 350.6], the lo adopted |
| walled-rings, ribbon, suburb floors (m) | 45–70, 30–50, 40–60 | unchanged, not re-fitted | — | — | no reference block set |
| `cut.flattenM` (base) | 0.7 m | 0.7 m, confirmed | — | — | NG's 731 kept one-bend cuts |
| `cut.flattenM` (`MFCG` preset) | 8 m | 8 m, not measured | — | — | — |

The other three rows move by the `modest` fit's lo and hi ratios, 1.3222 and 1.6067 (47.6 / 36 and 96.4 / 60),
because the law shrinks every band's blocks by the same mechanism; run forward the rows keep poor < modest <
prosperous < rich at p10, p50 and p90, with and without the floor, and the floor binds the `poor` band's lo only.

**The comparator.** NG's `area` template at `medium` is the `modest` band's comparator (§13.6 (2) pairs that template
with our base bent-cut fabric). The pooled 20 hoods (608 blocks, 27.8 / 39.0 / 57.0 m) would need [39.6, 159.2],
their hi end pulled up by the tails of the ring template and the street template, which are template road layouts; the ruled range run
forward differs from the pooled p10, p50 and p90 by +2.5 m, +3.2 m and −2.1 m and within 6.2 m of every template's at either
end. **The hi end is weakly identified** (the law's spread is flat for e_hi / e_lo between 1 and 2; a hood bootstrap
gives e_hi 78–153 m around the signed 96, and 211 of 1 000 resamples have no fit at all); the lo end is firm
(42–52 m). M0-b-05a's reference run on the S8 harness confirms the hi end on real faces; the signed cell is the
start value.

**The floor.** MFCG's intramural blocks are the walled core's comparator for a block-depth minimum, and the fitted lo
end is steady (36.9 pooled; 32.9 / 34.9 / 37.9 by size; bootstrap 35.4–38.3). The fitted hi end (313–492 m by size) is
not adopted: it answers a spread (2.4 at the smallest size, 2.7 at the largest) that comes from footprint unions closed at 3 m, not from the faces the
generator made, and as a floor on every band's e_hi it would set every dense-core band's upper block area to 12–24 ha. Size
barely moves block depth: MFCG's block p50 equals CITY's at sizes 40 and 80 and is 0.98 of it at 130, and NG's `small`
hoods are 8 % deeper than its `medium` ones (hood sizes, not rungs), so the rung depth factors stand.

**Rounding.** The cells are signed at whole metres on d (even metres on e). At that step the signed pairs reproduce
their inputs' p10 / p90 within the quantile change of half a metre at each end plus three Monte Carlo standard errors:
`modest` 30.2 / 54.8 against 30.0 / 54.6; the floor pair [37, 351] 28.9 / 70.6 against 28.9 / 70.3.

## 3 `cut.flattenM` and the relative term (for M0-b-05b's calibration on NG's recorded faces)

On NG's 731 kept one-bend cuts over the 20 `medium` hoods (a junction end snapped, a free end taken at its drawn position; 323 of
1 462 ends are free), the kept bend's height is the distance from the fillet-free virtual corner to the chord between the
cut's ends. The lowest kept height is 0.59 m declared (1.68 model units); 3 of 731 lie under that threshold; applying
the 0.7 m rule leaves the one-bend share at 0.658 against the recorded 0.660. The heights show no edge at two model units (the
count per quarter model unit rises 1, 2, 3, 5, 9, 12 from 1.5 units), so the data bound the value from above (≤ 0.59 m
if every kept bend is real) and cannot locate it; 0.7 m stands. The three bends below it are filleted bends of
3–4.4° whose virtual corner is read from single leg segments (PLAUSIBLE: reading noise).

§4.6 step 5's relative term, 0.02 × |A–foot|, applied to NG's snapped chords would flatten 23 of the 731 kept
bends (the one-bend share 0.660 → 0.640; the lowest height-to-chord ratio is 0.0139); the largest factor that
flattens none is 0.013. Whether NG's own relative test reads the snapped chord cannot be settled research-side
(PLAUSIBLE that it differs). Both numbers reach M0-b-05b; the terms stand until that calibration.

## 4 Consequences the implementer should see (no cell change asked)

1. Every reader of e_hi as "the deepest block" (the upper block area e_hi², the substitution bound on faces at twice a
   band's top block area) widens with the re-fit: at CITY `modest` 0.36 → 0.92 ha, `poor` 0.16 → 0.41 ha,
   `prosperous` 0.64 → 1.64 ha, `rich` 1.44 → 3.69 ha, while the blocks the law leaves have p90 of 36–97 m. If those
   readers meant the deepest block, τ's own p90, e_lo · (e_hi / e_lo)^0.48 (`modest` 67 m, 0.45 ha), is the candidate;
   that is a design reading, routed to the design seat.
2. The reflex pre-cut and §4.6 step 8's "deeper than the band's plot depth" read the band's mean depth, which moves
   from 24 to 36 m at `modest` (poor 16 → 24, prosperous 32.5 → 48.5, rich 45 → 68).
3. The cells reach M0 as `granularity.json` (the depth rows), `regimes.json` (the floor) and `cut.json`
   (`cut.flattenM`), provenance "M-1 2026-10-04".

## 5 Status

CONFIRMED by execution research-side: every number above (the fits, the forward runs, the reproduction checks at the
signed step, the bend-height census). PLAUSIBLE: that the law's quantiles transfer from idealised rectangular start
faces to the irregular faces of NG and MFCG closely enough for a start value (the S8 harness settles it); that the `area`
template is the `modest` comparator; the two reading-noise and relative-term points above. The fifteen rulings behind
these cells were decided under the owner's delegation and are vetoable; a veto on the comparator gives `modest`
20–80 m with the pooled ratios (poor 13–53, prosperous 28–106, rich 33–159).
