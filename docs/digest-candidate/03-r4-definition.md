# Digest entry 3 — R4, the lot-orientation coherence of MFCG's street signature: the definition the rows carry

Implementer digest, entry (3) of nine. Written research-side at M-1 (2026-10-04) for the AFTER-M-1 run item
M0-c-07a; our own words, numbers and `baselines.json` row ids only. Provenance label: `research:M-1/E07` (sections 2,
3 and 9.5), rows by `research:M-1/E15`.

## 1 The definition (`bldg.r4.60`, `bldg.r4.120`, `bldg.r4.250`; `metricVersion` 1.0.0)

C-0018 reads R4 as the fourth-order mean resultant length of the orientations within a radius. The rows confirm that
reading and fix every open point:

1. **The axis.** Each building's axis θ points along its footprint ring's longest edge. Orientation is
   taken modulo 90°, so z = e^{4iθ} is the per-building unit vector.
2. **The sample.** 1 500 buildings per city, drawn by the metric's own seeded stream (every building when the city holds
   fewer). Three of the five fixture cities hold fewer (838, 1 299 and 1 227) and are read whole; the others are sampled
   (1 485–1 500 samples with five or more neighbours).
3. **The neighbourhood.** For each sampled building, the buildings whose **area centroids** lie within r of the sample's
   area centroid, r = 60, 120 and 250 m; a sample needs at least five such buildings.
4. **R4** = |mean z| over that neighbourhood; the city's value is the median over its samples; the row's value is the
   per-seed statistic over the family's ten seeds.
5. **Buildings.** Every exported footprint, a prism counting as a building; the earlier research script took vertex
   means where the rows use area centroids — the change moves the gates-4 fixture by at most 0.0025.

**M0's proxy.** At M0 the product has no plots, so M0-c-07a computes R4 on block minimum-area-rectangle axes and
reports it as a non-gating proxy (C-0018); the rows' definition above is what M1 compares against on plots. A grid
gives 1; uniformly random axes give about 0.

## 2 The numbers (ten plain seeds per size; p50 [p10, p90] by the type-7 estimator; bands by §13.5's band rule)

| row id | rung | value | band |
|---|---|---|---|
| `mfcg/40/plain/bldg.r4.60/all` | TOWN | 0.8543 [0.8201, 0.874] | 0.7262–0.9824 |
| `mfcg/80/plain/bldg.r4.60/all` | CITY | 0.9274 [0.9216, 0.9376] | 0.7883–1.0665 |
| `mfcg/130/plain/bldg.r4.60/all` | METROPOLIS | 0.9548 [0.9488, 0.9571] | 0.8116–1.098 |
| `mfcg/40/plain/bldg.r4.120/all` | TOWN | 0.6374 [0.5781, 0.6737] | 0.5203–0.7411 |
| `mfcg/80/plain/bldg.r4.120/all` | CITY | 0.7592 [0.7343, 0.7724] | 0.6453–0.8731 |
| `mfcg/130/plain/bldg.r4.120/all` | METROPOLIS | 0.8294 [0.803, 0.8528] | 0.705–0.9538 |
| `mfcg/40/plain/bldg.r4.250/all` | TOWN | 0.4141 [0.3346, 0.5031] | 0.3011–0.5534 |
| `mfcg/80/plain/bldg.r4.250/all` | CITY | 0.5101 [0.4298, 0.5504] | 0.3868–0.6054 |
| `mfcg/130/plain/bldg.r4.250/all` | METROPOLIS | 0.5858 [0.5576, 0.6252] | 0.4979–0.6877 |

R4 rises with size at every radius (at 60 m 0.854 → 0.927 → 0.955), inside §13.5's quoted 0.84–0.97 / 0.58–0.88 /
0.32–0.68; the quoted ranges were one size's and the per-size bands above replace them. The fixture check behind the
rows: on the four-gate fixture city R4 at 60 / 120 / 250 m is 0.840 / 0.579 / 0.318 against the earlier 0.84 / 0.58 /
0.32.

**Wall alignment, read beside R4 (the same proxy rule).** `bldg.wallAlign.median` (degrees) and
`bldg.wallAlign.share15` (the share within 15°), each a row per distance band from the curtain (0–40, 40–100,
100–200 m), read each building's axis against the nearest built curtain stretch (never a shore closure). At CITY:
median deviation 3.48 / 7.31 / 12.80°, share 0.890 / 0.683 / 0.536. On the coastal stress city the alignment through the
shore split (89.2 / 56.7 / 41.0 %) is descriptive.

## 3 The creator's stated idea, in our words

MFCG's author described its alleys as the bent-cut bisection taken over from NG, run across a whole district rather
than cell by cell, and credited the streets' landscape-like look to that bisection carrying the surrounding boundary's
orientation and curvature inward; the main roads, which spread outward from the centre, are made differently. R4
measures that inward propagation: high coherence at 60 m, decaying by 250 m as the boundary's orientation rotates across a district.
The design's P3, P4 and P5 (choosing the start run that lies most nearly along the long axis, fixing the corner first and the far
side after it, plus the near-square straight-first test the `MFCG` preset adds) are the adopted mechanisms; R4 is their keep-test.

## 4 Status

CONFIRMED by execution research-side: every number above, the fixture reproduction of the earlier figures within 0.02,
determinism over two runs, the red run. PLAUSIBLE: that the rise with size holds beyond the ten-seed families; that the
block-axis proxy at M0 tracks the building-axis definition (M0 reports it, never gates on it).
