---
name: derived-graph-twin-sensitivity
description: "The MFCG derived-street-graph raster twin's dead-end row is set by its spur threshold and raster step at first order (E14, W-14, 2026-10-04); the digest entry must carry step / spur / merge / thinning, and T-V12-3 will not hold on sgd.* for a differently built skeleton"
metadata:
  node_type: memory
  type: project
  originSessionId: 35f80c37-a71f-4b8a-aa2a-ae5f9064cf55
  modified: 2026-10-04T07:49:08.312Z
---

Measured 2026-10-04 by lane `m1/W-14` (spike S-V12-2; `docs/calibration/E14-spike-derived-graph.md`, tool
`research/baselines/spike_derived_graph.py`), on the five 2026-09-25 MFCG fixtures against the declared twin of V12
§3.4.1 (R-22: raster medial axis at 0.5 m, spur 8 m, merge 2 m, `derived_graph.py`):

- `sgd.deadEnds` (degree-1 nodes per km) rises 107–233 % at spur 6 m, falls 23–33 % at spur 10 m, rises 18–39 % at a
  0.25 m step. The thinning's corner branches cluster between 6 and 10 m, so the row counts the pruning parameter as much
  as the map (6–12 seed-to-seed SDs for a 2 m lower spur).
- `sgd.tShare` moves 4–17 % under step 0.25 m or spur 6 m, < 1 % under spur 10 m.
- `blockc.perHa` and `blockc.lotsPer` are exactly invariant (union-find + centroid test, raster-free); faces, planarity
  and the Euler identities hold under every variant.
- The ruling itself stands on the pre-decided CV rule only (V12 §8.3 (2): CV > 0.3 → descriptive): all 12 plain D11
  rows stay TARGET (largest CV 0.2547, `sgd.deadEnds` at TOWN). Nothing from W-14 enters E19.

**How to apply:** W-17's digest entry for R-20 (7) and M0-c-07a's note must state the five parameters (raster step;
spur threshold measured on the Douglas-Peucker-simplified line at the step, to a fixed point and once more after the
merge; 2 m single-linkage merge with internal edges ≤ 4 m removed; eight-direction sequential thinning) — "like with
like" (R-22, J-V12.5). Expect the product's skeleton to miss T-V12-3's 0.5 % on `sgd.deadEnds` (PLAUSIBLE): plan §9's
pre-decided outcome is a `baselineShift` at M1 (J-V12.1), not a re-tuned row. Whether parameter sensitivity should enter
the descriptive rule is a V12 §8.3 (2) amendment, the owner's under J122 (E14 F1). The tool caches one JSON per
(variant, fixture) in the lane scratch directory and re-measures only what is missing; the whole set took well under an
hour at nice 19 beside four build seats. See [[maps-project-state]].
