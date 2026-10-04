# Digest entry 5 — the junction census: T junctions against crossroads

Implementer digest, entry (5) of nine. Written research-side at M-1 (2026-10-04) for the AFTER-M-1 run item
M0-c-07a (§13.5's junction row); our own words, numbers and `baselines.json` row ids only. Provenance label:
`research:M-1/E11` (section 2, section 4 and section 10.3), FTG companions by `research:M-1/E05`, rows by
`research:M-1/E15`.

## 1 The definitions (`junction.angles`, `junction.share4`; `metricVersion` 1.0.0)

1. **Nodes.** Topological nodes of the way graph (degree other than 2). Nodes within 2 m of each other (declared on
   NG, entry 8; metric on FTG) merge into one cluster. A chain with both ends in one cluster and no longer than 4 m is
   internal and dissolves into the cluster.
2. **Arms.** Each chain leaving a cluster gives an arm whose direction runs from the cluster to the point 10 m along
   the chain (the far end if the chain is shorter).
3. **`junction.angles`.** The angles between angularly consecutive arms at every cluster of degree 3 or more; per seed
   the median and the 5th percentile.
4. **`junction.share4`.** Clusters of degree 4 ÷ clusters of degree 3 or more, after the merge.
5. **Two kinds of T, counted beside the rows.** An *end-on T* is a degree-3 cluster that holds a landing point — a
   street end snapped onto the road it stops at (entry 1, item 1). A *geometric T* is a degree-3 cluster whose largest
   arm angle is at least 160°.

## 2 NG: all junctions are Ts; the 4-way share belongs to the merge

* On the 20 `medium` formula hoods the raw graph holds **one** degree-4 node in all (a snapping artefact on one square
  hood: a fallback landing point 0.22 m declared from another street's own landing), and on the eight fixture hoods
  none. Every degree-3 junction is end-on (186, 156, 121, 101, 57, 54, 31 and 41 per fixture map after the merge), and
  96–100 % of them are geometric Ts. That raw identity of the cut tree is what §13.5 quotes as "361 / 361 T".
* The merged 4-way share arises only where the 2 m merge joins two opposite end-on Ts: on every map the merged
  degree-4 count matches the number of such pairs. Its value is therefore a property of the merge distance, not of NG's
  network; the row carries the merged value because ours is measured under the same merge (like for like), and the
  raw count stands in the row's note.

| row id | value | n | band |
|---|---|---|---|
| `ng/medium/junction.share4/all` | 0.0522 [0.0258, 0.0771] | 20 hoods | organic 0–15 %, ringed 20–45 %, american 40–80 % (§13.5's junction row) |
| `ng/medium/junction.angles/all/median` | 91.10° [90.60, 91.99] | 20 hoods | 85–95° |
| `ng/medium/junction.angles/all/p5` | 87.13° [84.54, 88.10] | 20 hoods | ≥ 30° |

Arms read 10 m out meet fillets and bends, which is why the median sits a little above 90°. The fixtures gave medians
90.8–92.9° and p5 86.0–88.5°; the formula hoods widen the p5 to 84.2–88.2° per hood.

## 3 FTG, read the same way (companions for the ringed and american presets)

The way graph only (no arm comes from a lot outline, a fence, a water outline or the map border), nodes merged within 2 m,
arms 10 m along:

| row id | value | n |
|---|---|---|
| `ftg/BIG_TOWN/junction.share4/all` | 0.25 [0.2101, 0.2987] | 10 |
| `ftg/BIG_CITY/junction.share4/all` | 0.2722 [0.2136, 0.3134] | 10 |
| `ftg/METROPOLIS/junction.share4/all` | 0.2143 [0.1817, 0.2757] | 4 |
| `ftg/BIG_TOWN/junction.angles/all/median` | 91.51° [90.28, 93.25] | 10 |
| `ftg/BIG_CITY/junction.angles/all/median` | 91.06° [90.42, 92.54] | 10 |
| `ftg/METROPOLIS/junction.angles/all/median` | 92.22° [90.98, 92.77] | 4 |

The earlier figure of 36.4 % 4-way on FTG counted every edge type (lot outlines included); among ways the share is
0.25–0.30.

## 4 What M0-c-07a judges

On the flat fixture's districts the junction row is judged by the band rule against the rows above: p5 ≥ 30°, median
85–95°, and the 4-way share per preset class. The product's census must merge within the same 2 m, read arms at 10 m
and count degree-4 clusters after the merge; a census that counts raw degree-4 nodes compares against the row's raw
companion (0 on NG), not the row.

## 5 The creator's stated idea, in our words

NG's author gave two reasons for the bent cut over a straight bisection: junctions that look grown rather than
constructed, and a recursion the eye cannot trace. Both are read in this census: all junctions are Ts because a cut
stops at the road it reaches and never crosses its parent, and the arrivals are near-perpendicular (entry 1's
arrival share 0.974 at or above 85°) without the collinear runs a straight bisection leaves.

## 6 Status

CONFIRMED by execution research-side: every number above, the twin's byte-identical reproduction of the earlier road
tables, determinism, the red tests. PLAUSIBLE: that the one raw degree-4 node is a snapping artefact rather than a
drawn crossroads (the geometry fits; the drawing order was not traced).
