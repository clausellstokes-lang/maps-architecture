# Digest entry 6 — the deep-interior default shares, fitted at M-1

Implementer digest, entry (6) of nine. Written research-side at M-1 (2026-10-04) for the AFTER-M-1 run item
M0-c-07a (the fitted default shares of §4.6's deep-interior rule as cells); our own words and numbers only.
Provenance label: `research:M-1/E12` (section 14's text and section 12's table), the inputs of `research:M-1/E11`
(section 10.3) and `research:M-1/E09` (section 7). The cells reach M0 as `interior.json`, provenance "M-1 2026-10-04";
the design amendment (§4.6, "Default shares") records the same numbers.

## 1 The rule that was calibrated

§4.6's deep-interior rule gives each `deep` block of a band one of four interiors by target shares: `court` (perimeter
plots around a shared court), `back_lane` (a lane spine through the middle), `through_alley` (an alley spine joining
two opposite frontages), `rear_plots` (a second row of plots reached through the front row). M-1 measured one share
per reference — the share of deep blocks holding a court (entry 4) — and moved the court cells by it; the other three
cells of each row keep their design proportions.

## 2 The method

1. The `modest` band's court cell is NG's `block.courtShare` over the 20 `medium` hoods: the type-7 median of the 20
   per-hood shares, **0.457** (the pooled count is 276 of 597, 0.462; the `area` template alone 0.457). NG's `medium`
   hood is the design's default-fabric comparator, `modest` the central band, and its default 0.45 sat nearest the
   measurement.
2. The other bands' court cells all move by one ratio, 0.457 / 0.45 = **1.0148**, capped at 1 (no cell reaches the
   cap).
3. Each band's `back_lane`, `through_alley` and `rear_plots` are renormalised to 1 − court in their design proportions.
4. Rows are published at three decimals by largest-remainder rounding, so each row sums to 1 exactly and equal design
   cells stay equal (`prosperous` back lane = rear plots = 0.146).

## 3 The cells

| band | old shares | new shares (M-1 2026-10-04) |
|---|---|---|
| `poor` | court 0.35, lane 0.25, alley 0.30, rear 0.10 | court 0.355, lane 0.248, alley 0.298, rear 0.099 |
| `modest` | court 0.45, lane 0.30, alley 0.15, rear 0.10 | court 0.457, lane 0.296, alley 0.148, rear 0.099 |
| `prosperous` | court 0.65, lane 0.15, alley 0.05, rear 0.15 | court 0.659, lane 0.146, alley 0.049, rear 0.146 |
| `rich` | court 0.75, lane 0.10, alley 0, rear 0.15 | court 0.761, lane 0.096, alley 0.000, rear 0.143 |
| `MFCG` preset | (no entry) | court 0.813, lane 0.000, alley 0.000, rear 0.187 |

**The `MFCG` preset's row.** MFCG's inner-plot removal leaves an unbuilt interior in **0.8135** of its deep cluster
blocks (the type-7 median over the 30 usable plain seeds; 8 157 of 10 015 pooled; 0.810–0.814 by size). The remainder
is rear plots because MFCG either keeps a deep block's inner plots or removes them, and inserts no lane or alley
spine; a row with lanes would be shares MFCG never draws. §7.6's list of rows carrying `presets` entries gains the
deep-interior shares (the `MFCG` entry above; `FTG` reads the default), and the `NG` parity preset reads the default
row for these cells (0.457 at `modest`) rather than resolving through the `MFCG` entry — both routed to the design seat.

## 4 Like for like: which blocks the keep-test reads

§13.5's keep-test is the court share per class. The shares above were measured over the reference's deep population
(inscribed radius above 1.5 × the median footprint short side; entry 4). The design's own deep test (local thickness
above twice the band's plot depth) admits 98 of NG's 597 deep blocks at the old `modest` depth (court share 0.418)
and 3 at the re-fitted one (entry 2), while the reference's population is every block of thickness above 21.6 m (an
inscribed radius of about 10.8 m), so the keep-test's population must be the reference's for the shares to be judged
on the blocks they were measured on. The design correction is routed; M0-c-07a reads the reference's definition meanwhile.

## 5 Status

CONFIRMED by execution research-side: the medians and counts, every published row summing to 1 at three decimals, the
alternative estimators (the count ratio 0.462, the `area` template's 0.457) within 0.006 of the chosen one. PLAUSIBLE:
that NG's `medium` hood stands for the `modest` band; that MFCG's cluster blocks stand for its generator's blocks
inside the walls. The rulings behind the cells were decided under the owner's delegation and are vetoable; a veto on
the remainder rule gives the `MFCG` row 0.813 / 0.102 / 0.051 / 0.034.
