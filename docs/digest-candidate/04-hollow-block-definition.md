# Digest entry 4 — the hollow-block frequency: the definition of `block.courtShare`

Implementer digest, entry (4) of nine. Written research-side at M-1 (2026-10-04) for the AFTER-M-1 run item
M0-c-07a (the deep block interiors row); our own words, numbers and `baselines.json` row ids only. Provenance label:
`research:M-1/E11` (section 2 and section 10.3) for NG, `research:M-1/E09` (sections 2 and 7) for MFCG, rows by
`research:M-1/E15`.

## 1 The definition (`block.courtShare`, `metricVersion` 1.0.0; scale-free)

A block's court share is the share of **deep** blocks that hold a **court**.

1. **Deep.** The block polygon's largest inscribed circle has a radius more than one and a half times the map's median footprint
   short side (the short side of each footprint's minimum-area rectangle, the median over every footprint of the map;
   computed to 1 % of that side). On NG that side is 6.7–8.7 m declared, so the radius threshold is about 10.8 m; on
   MFCG the threshold is 18.0–26.7 m by seed.
2. **Interior.** The block less every footprint dilated by 5 % of that side, rasterised at a cell no larger than half the
   dilation distance.
3. **Court.** An interior component of area at least 0.5 × the median footprint area that touches no block edge.
   Components are 4-connected; touching the edge is tested 8-connected.
4. **Only deep blocks count.** A shallow block can hold an interior pocket of court size (2 040 such blocks over
   MFCG's 40 maps); by the definition it is not a court. On NG no shallow block holds one.

**The blocks.** For NG a block is a bounded face of the drawn-centreline road graph in the registered frame (entry 1,
item 1; entry 8); land at the undrawn hood edge belongs to no block, so these are interior counts. For MFCG a block is
an intramural cluster block (entry 7, item 1): the footprint union closed at 3 m **with its holes filled**, so a court is
inside the block and not street space; a block is intramural when the area-weighted centroid of its footprints lies
inside the outermost enclosure.

## 2 The numbers

| row id | value | n | band | what it is |
|---|---|---|---|---|
| `ng/medium/block.courtShare/all` | 0.4566 [0.295, 0.5421] | 20 hoods | 0.2655–0.5963 | the type-7 median over the 20 `medium` hoods; pooled count 276 of 597 deep blocks (0.462); per template area 0.457, street 0.455, square 0.400, ring 0.479 |
| `mfcg/40/plain/block.courtShare/all` | 0.8101 [0.7452, 0.8558] | 10 seeds | 0.6707–0.9414 | 496 of 619 deep blocks pooled |
| `mfcg/80/plain/block.courtShare/all` | 0.8098 [0.7159, 0.8448] | 10 seeds | 0.6443–0.9313 | 1 852 of 2 320 |
| `mfcg/130/plain/block.courtShare/all` | 0.8143 [0.7884, 0.8508] | 10 seeds | 0.6922–0.9364 | 5 809 of 7 076 |

MFCG keeps an unbuilt interior in about four of five deep blocks at every size (0.8145 pooled over 10 015 deep blocks
of the 30 plain seeds); NG in a little under half. The fixture value for NG before the formula seeds was 0.43 (115 of
268). The seed-to-seed CV of MFCG's share is at most 0.068 on the plain families.

## 3 Like for like: the design's deep test, as applied, reads the row's population

§4.6's deep-interior rule and §2.5's `Block.depthClass` call a block `deep` when its local thickness exceeds
**0.6 × its band's plot depth** (the design amendment of 2026-10-04; the test was twice the band's plot depth before),
and §13.5's deep-interior row reads the court share over those blocks. The reference row's population is the
catalogue's (inscribed radius above 1.5 × the median short side, about 21.6 m of thickness on NG). At the re-fitted
`modest` depth (mean 36 m, entry 2) the applied test's threshold is 21.6 m, and on NG's blocks it admits 593 of the 597
deep blocks and no other block (court share 0.465 against 0.462), so the keep-test reads entry 6's shares over the
population they come from. The test before the amendment admitted 98 of the 597 at the old `modest` depth (mean 24 m; court share
0.418) and 3 at the re-fitted one, a court share over an almost empty set. The census behind the factor: at 36 m a
thickness above half the mean depth admits 597 blocks (court share 0.462), above three quarters of it 535 (0.486),
above the mean 318 (0.472) and above twice it 3 (0). M0-c-07a reads the applied test (S8's deep test); item 1's
inscribed-radius test stays the definition of the reference row.

## 4 The creators' stated ideas, in our words

MFCG's author replaced the random removal of lots (meant as undeveloped patches) with interior voids not reachable
from any street, called shared courtyards, as the more realistic layout; later the trees feature fills them. No
statement by NG's author covers its hollow blocks; they are what its perimeter rule visibly produces — buildings ring each block's
boundary and the interior stays open ground, planted or bare. The design's `court` interior (§4.6: perimeter plots
around a shared court, the donut of MFCG and the hollow block of NG) names both.

## 5 Status

CONFIRMED by execution research-side: every number above, the two implementations agreeing on the fixtures (NG's
registration sensitivity moves the share by at most 0.0625 at the ±1 px neighbours), determinism, the red tests, the
census of section 3. PLAUSIBLE: that MFCG's cluster blocks stand for its generator's blocks inside the walls (they are
footprint unions); that NG's `medium` hood is the `modest` band's comparator (entry 6).
