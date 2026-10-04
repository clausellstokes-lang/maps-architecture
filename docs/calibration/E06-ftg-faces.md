# E06 — FTG face recovery (M-1 work item W-06; D1, CONFIDENCE §6 #5)

Lane `m1/W-06`, 2026-10-04 (00:17–00:19 EDT for the recorded pass), on the owner's Mac. A research-side record:
implementer seats do not read it (`plat/CLEAN-ROOM.md` rule 2). It holds numbers, metric ids, file paths and our own
words; no district name, building label, asset key or request identifier of the reference is written here. Nothing was
written into `plat/`, no site was touched, no git command was run, no benchmark or timing was run, and no captured
program bundle was read: the inputs are the Fetch-intercepted layout payloads, read only through W-05's adapter.

**Outcome: partial, for one reason.** The tool is built, run and checked: `research/baselines/measure_ftg_faces.py`
measures `ftg.ringBlock`, the `plotShare` bound, the dividing roads, the towers against the wall vertices and the market
squares on both CITY fixtures (the 2026-09-25 one labelled, R-04) and on every plan slot bound when the pass started
(slots 0–11). Five of the row's six checks pass (CONFIRMED by execution). The sixth cannot pass yet. The row requires
that **the last pass postdate the FTG programme's close** (R-47), and programme 2 is still recording: slots 12–27 were
open when the pass ran. This record is therefore pass 1. The last pass is one command after the programme closes
(section 9), and it needs no change to the tool. W-15 must not form the `ftg.ringBlock` row from this pass.

What the pass found (each CONFIRMED by execution on the 12 plan payloads and the two fixtures):
1. **Blocks.** Inside the 73 district rings of the 14 payloads, FTG's ways close 6 025 faces. Of these, 15 are water and
   6 010 are blocks. The median block is **2 144 / 2 322 / 2 362 m²** at BIG_TOWN / BIG_CITY / METROPOLIS
   (p10 ≈ 780–870 m², p90 ≈ 3 760–3 910 m²) and 2 238 m² on the usable CITY payload. Per-capture medians run from 1 951
   to 2 696 m². The block size barely moves with the settlement's size.
2. **The `plotShare` bound.** Land inside the faces, less the drawn road and wall bands, is **0.862–0.885** of each
   sampled payload's ring land (0.889 on the R-04 fixture). That figure bounds FTG's plot share from above. Less the
   paved squares it is 0.516–0.862. The footprint cover, a floor, is 0.398–0.554. §4.5's dense-core 0.62 lies inside
   FTG's bracket.
3. **Dividing roads.** On the 1 782 sibling cuts in the samples (the last cut between two neighbouring blocks), about
   77 % lie within 15° of one of the parent's OBB axes. 52–56 % run across the long axis, and 21–25 % run along it,
   these in squarer parents (aspect p50 ≈ 1.3–1.4 against ≈ 1.7–1.9). The cut sits off the middle by a median 9–12 % of
   the long side. The two halves' area ratio has a median of 0.54–0.57. About 76–79 % of cuts end on the parent's
   longest straight side.
4. **Towers.** Every tower stands on a wall vertex (17 / 17 and 29 / 29 on the fixtures, as the probes recorded; 628 /
   628 on the slots). A wall vertex where a way meets the wall on a straight stretch almost never carries one: **24 /
   493** across the slots. Every other wall vertex nearly always does: 604 / 637. The rule "a tower where no way meets
   the vertex, or where the wall turns 2° or more" agrees with **93–96 %** of wall vertices per size. CONFIDENCE C11
   lists the tower-selection rule as open. This is a description, not a claim about FTG's code.
5. **Market squares.** Each market square's footprint is exactly one face closed by ways (ratio 1.000 on all 24
   squares). No two share a face or neighbour each other. Their centres are 263–788 m apart. BIG_TOWN has one, and the
   CITY, BIG_CITY and METROPOLIS payloads have two each (R-23: a note, no row).
6. **FTG's graph is not planar at its bridges.** On five coast-and-river payloads, 15 crossings have no node. All 15 lie
   on the water outline: a main road crossing the water edge, and a road along the bank crossing that main road. The
   walk makes each one a node (W06-D2). Any later face metric on FTG's `MeasureInput` files must do the same, or it will
   not reproduce these values (section 10).

## 1 What was built and run

| file | what it is |
|---|---|
| `research/baselines/measure_ftg_faces.py` | the W-06 tool (sha256 `630533c0…`): standard library; reads each payload through `adapters/ftg.py` (W-05's decoder, zig-zag centimetres) and measures on its `MeasureInput`; lineage `research/ftg-capture/analyse_layout.py` (its hull and minimum-area rectangle, re-written) and the two challenge probes (the twin) |
| `docs/calibration/E06-ftg-faces.json` | every number below, per payload and per FTG size, with the checks (sha256 `7726227b…`, 433 KB); per payload the sorted block areas (`blockAreasM2`, the values W-15 pools), the registry-bin histogram, per ring the walk's counts and the land totals, the raw cut values, the tower and market tables |
| `docs/calibration/results/W-06.json` | the lane's result |

`analyse_layout.py` itself was not extended in place. It decodes coordinates as unsigned varints, which doubles every
length (`_critic-ftg.md` F1). The new tool therefore reads only through the landed adapter. No `MeasureInput` file was
written: W-05b owns them. For the ten payloads whose file exists, the stored file equals a fresh adapter write (sha256,
in the JSON). For slots 8–11, which W-05b's next pass will write, the fresh in-memory output is what was measured.

Run (project root): `python3 research/baselines/measure_ftg_faces.py [--md OUT]` (about two minutes for 14 payloads;
exit 0 when checks 1, 2 and 4–6 pass); `--check` (re-measures the recorded pass's slots and requires the fresh document
to equal the JSON, then re-runs the checks); `--red` (one planted fault per check). The pass reads the slots decided
when it starts: **slots 0–11** (`plan.json` sha256 `b50adff0a381` at the pass). Slot 11 (`BIG_CITY/none/1`,
`2026-10-04T04-07-26`) was bound while the tool was being built and is in this pass.

## 2 Definitions and the decisions taken under J122 (vetoable; each with its reason)

* **W06-D1 — faces are closed by the ways and the district outline.** A ring's subgraph is the district outline plus
  every `MeasureInput` way edge inside it: FTG's road types 0, 1, 2, 10 and 13. An edge counts as inside when its
  midpoint is inside and both ends are inside or on the outline. The invisible, fence, pier, border and water-outline
  edges are not ways (the adapter drops them). The outline is split at any way node lying on it (none occurred). Every
  outline segment is itself a graph edge, typed road, main road, wall or water outline (CONFIRMED on the four payloads
  explored first). *Reason:* V12's definition says "the faces FTG's ways close inside a ring". Without the district's
  own outline, the faces along a wall or the water stay open.
* **W06-D2 — crossings without a node become nodes.** Every proper crossing among the ways near the ring and the
  outline becomes a node at the crossing point, rounded to the centimetre (≤ 0.71 cm). Both edges are split there, and
  the point becomes an outline vertex where one of the edges is the outline. There were 15 such crossings, all at
  bridges (finding 6). *Reason:* FTG has no bridge geometry (`code-ftg-client.md` §2.5.2). If the crossings are left
  as they are, the walk is not planar. If the bridge edge is dropped instead, two blocks merge into one.
* **W06-D3 — water faces are not blocks.** A face at least half water (exact scanline, below) is listed in
  `waterFaces` and kept out of `ftg.ringBlock`. There are 15 such faces in 9 payloads. Nine are harbour basins or river
  reaches the outline encloses (7 100–28 900 m²), and six are slivers of 0.3–4.5 m² at the bridges. *Reason:* a basin
  is not land that ways close.
* **W06-D4 — "the dividing road against the face OBB" is read on sibling cuts.** A sibling cut is a chain of ways
  through degree-2 nodes. Both its ends must be the stem of a T: a degree-3 node whose two other arms turn less than
  20°. It must have a different bounded block on each side. The parent is the two blocks merged, and its area is
  checked to equal theirs exactly. The tool measures the cut's angle to the parent's minimum-area-rectangle long axis
  (0–90°) and the offset of its midpoint from the middle of that axis (0 = the middle, 0.5 = an end). It also measures
  the angle to the parent's longest straight side (corners at turns of 20° or more), whether the cut ends on that side,
  and the two blocks' area ratio. *Reason:* FTG grows a road that splits a lot. Two leaf blocks whose shared road ends
  in T's at both ends are the last such split, the only one the final graph still shows whole. A cut that a later road
  abuts is not taken. 1 818 of 15 958 chains qualify across the 14 payloads.
* **W06-D5 — the land share.** The land is a ring's area less its water. The share is the part of that land outside
  every drawn way and wall band, integrated exactly on rows 0.5 m apart. The bands are round-joined (all points within
  half the band width of the centreline), with widths by type from the code reading: main road 5 m, road 2.5 m, small
  road, dirt road and trail 1.25 m, stone wall 6 m. Beside the share are the same land less the paved texture
  (number 8: the squares and quays) and the footprint cover. *Reason:* §4.5 asks for "the share of FTG's land inside
  its road-graph faces". Measured on centrelines, the faces tile the ring (share 1), so the drawn bands are the only
  meaningful subtraction.
* **W06-D6 — the programme's close and the pass.** The tool counts programme 2 as closed when no slot of it is open in
  `plan.json`, or when E02's JSON records its stop under `slotsByProgramme["2"]` (a stopped programme leaves its
  remaining slots open as the shortfall, plan §2.1b (6)). A pass covers the slots decided when it starts (W-05b's rule,
  W05b-D9).
* **W06-D7 — samples.** Per FTG size, the members are the recorded CITY family's usable member first (R-02), then the
  slots in slot order. The 2026-09-25 payload is measured as a labelled fixture and is in no sample (R-04). TOWN gets
  research-side numbers only (R-34); none of its slots had been recorded.
* **W06-D8 — markets** are the footprints of building category 14, the market category in the code reading's enum
  order. Each payload holds one or two, at 500–3 811 m² (paved and flat-roofed, `code-ftg-client.md` §0 item 4 and
  §2.1).
* **W06-D9 — holes.** A district polygon with a hole is not handled, and the faces-close check fails on it rather than
  passing silently. None occurs (0 of 73 rings).

## 3 The row's checks, with receipts (CONFIRMED, executed 2026-10-04 00:17–00:30)

| # | check | result | receipt |
|---|---|---|---|
| 1 | faces close (Euler per ring subgraph) | **PASS** | 73 of 73 rings on 14 payloads: every half-edge walk closes; 0 crossings and 0 off-node contacts after D2; 0 ways crossing the outline; one outer cycle per component; V − E + F = C on 73 / 73; 5 840 / 5 840 seeded points each in exactly one face (holes cut out); 2 floating way components (one payload) subtracted as holes |
| 2 | face areas sum to the ring area within 1 % | **PASS** | worst relative difference 1.06 × 10⁻⁶ (the two bridge points inserted into the outline, rounded to the centimetre; 2026-09-21 ring 0); the ring areas are the district polygons' own shoelace, independent of the walk |
| 3 | the last pass postdates the FTG programme's close (R-47) | **FAIL** | programme 2 OPEN: slots 12–27 open, no stop recorded in E02; this pass read through slot 11 = the last decided slot at its start |
| 4 | twin: the challenge probes and the critic's ring areas | PASS | 17 / 29 towers, all on wall vertices; 26 / 46 wall nodes; 9 / 17 untowered; along-wall spacing n 16 / 27, min 18.9 / 4.4, median 39.3 / 35.6, max 72.8 / 59.7 m; ring areas 9.6 / 8.0 / 10.1 / 4.9 ha (`_critic-ftg.md` §4 row 16) — 0 differences |
| 5 | samples equal the plan's slots in order; the 2026-09-25 payload in no sample | PASS | BIG_TOWN 4 (slots 0, 2, 4, 10), BIG_CITY 4 (1, 3, 5, 11), METROPOLIS 4 (6–9), CITY 1 (the recorded usable member), TOWN 0; each slot's request size and water equal its label |
| 6 | the scanline integrates each ring within 0.1 % | PASS | worst 6.6 × 10⁻⁵ (slot 7, ring 7) |

**Discrimination (`--red`, exit 0): 6 of 6 planted faults caught.** The faults planted were: a chord across a ring
with no node (check 1); one outline piece dropped (check 2); the closure test given a closed programme read short of
its last slot and an open programme, with the green control passing (check 3); a twin median moved 0.1 m (check 4);
two BIG_TOWN slots swapped (check 5); and a ring's scan error raised to 1 % (check 6). **Reproduction (`--check`,
exit 0).** A fresh run equals the recorded JSON in every key but the checks and the live plan hash.

**Independent verification of the walk (CONFIRMED; a scratch script, not part of the tool).** Each ring was rasterised
at 1 m with its subgraph drawn 1 px wide, and the open regions were counted by flood fill. The walk's faces against the
raster's regions of 20 m² or more were: 126 / 125 (2026-09-21), 71 / 70 (slot 4), 499 / 500 (slot 1), 962 / 964
(slot 6) and 907 / 907 (slot 7). Ring by ring, the counts differ by at most one, except in the two bridge rings of
slots 4 and 7. There they differ by two, and each of those rings holds two of W06-D3's 0.3–4.5 m² slivers, which a
1 m raster cannot resolve. The raster medians are 4–6 % smaller, the expected loss to the drawn line. That the other
± 1 differences are single-pixel artefacts (slivers merged, or narrow wedges cut) is PLAUSIBLE; they were not traced
one by one.

## 4 `ftg.ringBlock` — the measured values (descriptive; W-15 forms the row after the last pass)

Per payload. "Blocks" are the faces less the water faces. "Block land net of bands" is each block's land outside the
drawn bands. "Crossings made nodes" counts W06-D2's crossings. The bound, "less paved" and the cover are section 5's.
The R-04 fixture is shown labelled and is in no sample.

| payload | size / water | rings | faces (water) | blocks | block m² p10 / p50 / p90 | block land net of bands m² p50 | crossings made nodes (way × outline / way × way) | plotShare bound | less paved | footprint cover |
|---|---|---|---|---|---|---|---|---|---|---|
| CITY rec. 0 | CITY / coast+river | 4 | 126 (3) | 123 | 1 034 / 2 238 / 3 732 | 1 878 | 2 / 2 | 0.868 | 0.709 | 0.454 |
| CITY rec. 1 (R-04) | CITY / coast+river | 3 | 137 (1) | 136 | 1 133 / 2 517 / 4 445 | 2 249 | 0 / 0 | 0.889 | 0.681 | 0.457 |
| slot 0 | BIG_TOWN / none | 3 | 101 (0) | 101 | 614 / 2 002 / 3 702 | 1 676 | 0 / 0 | 0.869 | 0.807 | 0.516 |
| slot 1 | BIG_CITY / none | 5 | 499 (0) | 499 | 840 / 2 290 / 3 783 | 1 979 | 0 / 0 | 0.877 | 0.832 | 0.554 |
| slot 2 | BIG_TOWN / coast+river | 4 | 88 (1) | 87 | 757 / 2 237 / 3 864 | 1 939 | 0 / 0 | 0.871 | 0.626 | 0.481 |
| slot 3 | BIG_CITY / coast+river | 4 | 359 (1) | 358 | 750 / 2 387 / 3 841 | 2 081 | 0 / 0 | 0.882 | 0.744 | 0.484 |
| slot 4 | BIG_TOWN / coast+river | 4 | 71 (3) | 68 | 918 / 2 696 / 6 838 | 2 415 | 2 / 2 | 0.885 | 0.516 | 0.398 |
| slot 5 | BIG_CITY / coast+river | 4 | 398 (1) | 397 | 908 / 2 309 / 3 668 | 2 033 | 2 / 0 | 0.879 | 0.753 | 0.509 |
| slot 6 | METROPOLIS / none | 7 | 962 (0) | 962 | 863 / 2 324 / 3 701 | 2 038 | 0 / 0 | 0.880 | 0.829 | 0.535 |
| slot 7 | METROPOLIS / coast+river | 9 | 907 (3) | 904 | 905 / 2 353 / 3 804 | 2 054 | 3 / 2 | 0.883 | 0.778 | 0.510 |
| slot 8 | METROPOLIS / coast+river | 10 | 1040 (1) | 1 039 | 846 / 2 402 / 3 792 | 2 114 | 0 / 0 | 0.884 | 0.805 | 0.505 |
| slot 9 | METROPOLIS / coast+river | 8 | 812 (1) | 811 | 888 / 2 333 / 3 748 | 2 026 | 0 / 0 | 0.882 | 0.786 | 0.495 |
| slot 10 | BIG_TOWN / none | 2 | 88 (0) | 88 | 962 / 1 951 / 3 527 | 1 684 | 0 / 0 | 0.862 | 0.862 | 0.516 |
| slot 11 | BIG_CITY / none | 6 | 437 (0) | 437 | 773 / 2 325 / 3 737 | 2 035 | 0 / 0 | 0.875 | 0.775 | 0.546 |

Per FTG size, in plan order (the sample W-15 reads: the values are `samples.<size>` and each member's `blockAreasM2` in
the JSON):

| FTG size | n | estimator at n | captures in order | blocks | block m² p10 / p50 / p90 | per-capture median m² | plotShare bound (range) | less paved (range) | footprint cover (range) |
|---|---|---|---|---|---|---|---|---|---|
| BIG_TOWN | 4 | minmax | BIG_TOWN/none/0, BIG_TOWN/coast+river/0, BIG_TOWN/coast+river/1, BIG_TOWN/none/1 | 344 | 778 / 2 144 / 3 913 | 2 002 / 2 237 / 2 696 / 1 951 | 0.862–0.885 | 0.516–0.862 | 0.398–0.516 |
| BIG_CITY | 4 | minmax | BIG_CITY/none/0, BIG_CITY/coast+river/0, BIG_CITY/coast+river/1, BIG_CITY/none/1 | 1 691 | 831 / 2 322 / 3 768 | 2 290 / 2 387 / 2 309 / 2 325 | 0.875–0.882 | 0.744–0.832 | 0.484–0.554 |
| METROPOLIS | 4 | minmax | METROPOLIS/none/0, METROPOLIS/coast+river/0, METROPOLIS/coast+river/1, METROPOLIS/coast+river/2 | 3 716 | 873 / 2 362 / 3 757 | 2 324 / 2 353 / 2 402 / 2 333 | 0.880–0.884 | 0.778–0.829 | 0.495–0.535 |
| CITY | 1 | single | CITY/coast+river/0 | 123 | 1 034 / 2 238 / 3 732 | 2 238 | 0.868–0.868 | 0.709–0.709 | 0.454–0.454 |
| TOWN | 0 | no row (R-34) | — | 0 | — / — / — | — | — | — | — |

The pooled counts in the registry's 24 log bins (`metrics.m-1.json` `ftg.ringBlock`, 50–50 000 m², lower edges shown;
underflow below 50 m²: six slivers at BIG_CITY and METROPOLIS):

| FTG size | underflow | 50 | 67 | 89 | 119 | 158 | 211 | 281 | 375 | 500 | 667 | 889 | 1 186 | 1 581 | 2 108 | 2 812 | 3 749 | 5 000 | 6 668 | 8 891 | 11 857 | 15 811 | 21 085 | 28 117 | 37 495 | overflow |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| BIG_TOWN | 0 | 0 | 0 | 0 | 1 | 1 | 4 | 3 | 8 | 11 | 16 | 27 | 48 | 49 | 50 | 83 | 24 | 4 | 9 | 6 | 0 | 0 | 0 | 0 | 0 | 0 |
| BIG_CITY | 4 | 0 | 1 | 1 | 3 | 8 | 13 | 14 | 29 | 48 | 70 | 116 | 182 | 246 | 349 | 432 | 126 | 11 | 19 | 18 | 1 | 0 | 0 | 0 | 0 | 0 |
| METROPOLIS | 2 | 1 | 2 | 8 | 16 | 13 | 20 | 27 | 62 | 89 | 141 | 241 | 443 | 527 | 806 | 939 | 299 | 25 | 28 | 23 | 3 | 1 | 0 | 0 | 0 | 0 |
| CITY | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 1 | 3 | 13 | 17 | 22 | 23 | 30 | 6 | 2 | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| TOWN | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

## 5 The `plotShare` bound (D1; ARCHITECTURE §4.5; a number here, no row)

FTG's client receives no plot (item 49). The payload's field 9 holds ground-cover textures only, and its lot structure
never reaches the client (`code-ftg-client.md` §0 item 3, re-read). The share of ring land that FTG's faces hold, net
of the drawn bands, is therefore an upper bound on its plot share.

| FTG size | payloads | bound: land net of bands | less the paved squares | footprint cover (a floor) |
|---|---|---|---|---|
| BIG_TOWN | 4 | 0.862–0.885 | 0.516–0.862 | 0.398–0.516 |
| BIG_CITY | 4 | 0.875–0.882 | 0.744–0.832 | 0.484–0.554 |
| METROPOLIS | 4 | 0.880–0.884 | 0.778–0.829 | 0.495–0.535 |
| CITY (usable) | 1 | 0.868 | 0.709 | 0.454 |

The bound sits in a narrow band, 0.86–0.89 at every size (the R-04 fixture's 0.889 included). FTG's drawn bands take
11–14 % of the ring land. The paved squares are mostly the quays of the waterfront districts, which is why the
coast-and-river payloads read lowest less paved (0.516 on slot 4). §4.5's rows (dense core 0.62, gapped rings 0.55,
ribbon 0.45, PLAUSIBLE there) lie between FTG's footprint floor and its bound. The bound does not contradict them, and
it asks for no change: §4.5 makes M1 measure `plotShare` per regime on B-CITY (R-31).

## 6 Dividing roads against the face OBB (D1's notes; CONFIDENCE C8)

Pooled per FTG size over each size's sibling cuts (W06-D4). The R-04 fixture is shown labelled.

| FTG size | cuts | across the long axis (≥ 75°) | along it (< 15°) | within 15° of an OBB axis | aspect p50 across / along | offset from the middle p50 (p90) | area balance p50 | to the longest side p50 (share ≥ 75°) | ends on the longest side |
|---|---|---|---|---|---|---|---|---|---|
| BIG_TOWN | 101 | 0.525 | 0.247 | 0.772 | 1.71 / 1.27 | 0.092 (0.246) | 0.560 | 75.7° (0.505) | 0.762 |
| BIG_CITY | 497 | 0.541 | 0.227 | 0.769 | 1.94 / 1.38 | 0.108 (0.280) | 0.540 | 77.3° (0.513) | 0.783 |
| METROPOLIS | 1144 | 0.564 | 0.208 | 0.772 | 1.84 / 1.34 | 0.106 (0.262) | 0.562 | 76.4° (0.520) | 0.791 |
| CITY | 40 | 0.775 | 0.050 | 0.825 | 2.06 / 1.65 | 0.116 (0.258) | 0.567 | 84.2° (0.750) | 0.925 |
| TOWN | 0 | — | — | — | — | — | — | — | — |
| fixture R-04 (labelled) | 36 | 0.806 | 0.111 | 0.917 | 2.10 / 1.37 | 0.093 (0.213) | 0.667 | 85.4° (0.694) | 0.917 |

In words: the cut is mostly squared to the parent's OBB frame. More often it runs across the long axis. When it runs
along the long axis, the parent is nearly square, so "long" is weakly defined. The cut lands near the middle, but not
exactly at it (median offset 9–12 % of the long side), and the halves are unequal (median ratio 0.54–0.57). The two
CITY payloads from September run across the long axis more often (0.78 / 0.81 against 0.52–0.56 on the October
slots). Two causes are possible: FTG's own changes between the dates, or the size. This record does not separate them
(PLAUSIBLE either way). Plot depth and frontage stay withdrawn (item 49), because no plot is serialised.

## 7 Towers against the wall vertices (CONFIDENCE C11, "open: the tower-selection rule")

Per payload. "Way arms" counts the way edges meeting a wall vertex. The greedy spacing rule places a tower at a chain's
first vertex and then wherever the distance along the wall reaches D, read from either end. Its agreement is printed
beside the baseline that gives every vertex the commoner label.

| payload | towers on wall vertices | wall vertices | chains (closed) | chain ends towered | towered by turn 0–2 / 2–5 / 5–10 / 10–20 / 20–45 / ≥ 45° | towered by way arms 0 / 1 / 2+ | spacing m p10 / p50 / p90 (min–max) | untowered run 0 / 1 / 2 / 3+ | greedy D m, agreement (baseline) |
|---|---|---|---|---|---|---|---|---|---|
| CITY rec. 0 | 17 / 17 | 26 | 1 (0) | 2 / 2 | 5/13 / 4/4 / 3/3 / 1/2 / 2/2 / 0/0 | 13/14 / 1/6 / 3/6 | 28.9 / 38.6 / 49.6 (18.9–72.8) | 9 / 5 / 2 / 0 | 33, 0.885 (0.654) |
| CITY rec. 1 (R-04) | 29 / 29 | 46 | 2 (0) | 4 / 4 | 3/19 / 3/3 / 10/11 / 8/8 / 1/1 / 0/0 | 24/25 / 4/19 / 1/2 | 27.3 / 35.6 / 40.0 (4.4–59.7) | 14 / 9 / 4 / 0 | 23, 0.826 (0.630) |
| slot 0 | 25 / 25 | 42 | 1 (1) | 0 / 0 | 5/20 / 7/7 / 4/4 / 6/6 / 2/3 / 1/2 | 22/23 / 2/15 / 1/4 | 30.4 / 32.4 / 49.9 (29.2–115.0) | 13 / 8 / 3 / 1 | 28, 0.857 (0.595) |
| slot 1 | 66 / 66 | 130 | 1 (1) | 0 / 0 | 11/71 / 32/33 / 15/16 / 8/10 / 0/0 / 0/0 | 57/62 / 7/59 / 2/9 | 29.0 / 33.4 / 42.7 (24.8–87.4) | 26 / 22 / 14 / 4 | 29, 0.862 (0.508) |
| slot 2 | 31 / 31 | 51 | 2 (0) | 4 / 4 | 2/20 / 1/1 / 12/13 / 8/9 / 4/4 / 0/0 | 25/27 / 5/18 / 1/6 | 27.4 / 34.9 / 41.0 (0.7–59.2) | 13 / 13 / 2 / 1 | 26, 0.882 (0.608) |
| slot 3 | 40 / 40 | 59 | 2 (0) | 4 / 4 | 9/26 / 23/24 / 4/5 / 0/0 / 0/0 / 0/0 | 32/34 / 4/20 / 4/5 | 29.8 / 31.7 / 33.6 (19.6–59.8) | 20 / 17 / 1 / 0 | 26, 0.932 (0.678) |
| slot 4 | 22 / 22 | 38 | 1 (1) | 0 / 0 | 3/17 / 3/3 / 4/4 / 9/9 / 2/4 / 1/1 | 19/23 / 3/11 / 0/4 | 29.4 / 35.0 / 39.9 (25.7–64.0) | 12 / 6 / 2 / 2 | 23, 0.816 (0.579) |
| slot 5 | 49 / 49 | 82 | 2 (0) | 4 / 4 | 0/33 / 27/27 / 15/15 / 3/3 / 0/0 / 0/0 | 41/41 / 5/36 / 3/5 | 28.4 / 34.1 / 38.2 (15.4–39.2) | 20 / 22 / 4 / 1 | 31, 0.878 (0.598) |
| slot 6 | 93 / 93 | 180 | 1 (1) | 0 / 0 | 31/114 / 43/44 / 14/16 / 4/4 / 1/1 / 0/1 | 79/84 / 13/80 / 1/16 | 29.9 / 33.0 / 39.1 (24.1–71.3) | 37 / 33 / 16 / 7 | 30, 0.861 (0.517) |
| slot 7 | 74 / 74 | 133 | 2 (0) | 4 / 4 | 20/77 / 39/41 / 8/8 / 0/0 / 2/2 / 1/1 | 58/60 / 12/63 / 4/10 | 27.6 / 31.8 / 37.4 (4.5–68.0) | 27 / 36 / 5 / 4 | 29, 0.925 (0.556) |
| slot 8 | 92 / 92 | 160 | 2 (0) | 4 / 4 | 45/112 / 31/32 / 10/10 / 2/2 / 0/0 / 0/0 | 78/80 / 12/72 / 2/8 | 28.7 / 32.5 / 35.8 (12.6–64.2) | 34 / 46 / 8 / 2 | 27, 0.881 (0.575) |
| slot 9 | 57 / 57 | 105 | 2 (0) | 4 / 4 | 21/67 / 18/19 / 11/12 / 3/3 / 0/0 / 0/0 | 43/45 / 11/47 / 3/13 | 28.1 / 34.6 / 38.7 (7.1–71.7) | 22 / 22 / 7 / 4 | 26, 0.857 (0.543) |
| slot 10 | 17 / 17 | 34 | 1 (1) | 0 / 0 | 1/15 / 3/3 / 3/3 / 7/8 / 1/2 / 2/3 | 14/16 / 3/15 / 0/3 | 30.9 / 36.6 / 61.2 (28.6–73.5) | 5 / 8 / 3 / 1 | 27, 0.824 (0.500) |
| slot 11 | 62 / 62 | 116 | 1 (1) | 0 / 0 | 10/61 / 29/31 / 18/19 / 4/4 / 0/0 / 1/1 | 54/57 / 8/47 / 0/12 | 29.8 / 32.3 / 37.6 (27.7–87.6) | 28 / 18 / 13 / 3 | 28, 0.888 (0.534) |

Pooled per size: the corner-and-way table and two candidate descriptions.

| group | straight, no way meets | straight, a way meets | corner (≥ 2°) or chain end, no way meets | corner, a way meets | rule "no way meets" | rule "no way meets, or a corner" |
|---|---|---|---|---|---|---|
| BIG_TOWN | 11 / 13 | 0 / 59 | 69 / 76 | 15 / 17 | 0.855 | 0.933 |
| BIG_CITY | 24 / 25 | 6 / 166 | 160 / 169 | 27 / 27 | 0.889 | 0.959 |
| METROPOLIS | 99 / 102 | 18 / 268 | 159 / 167 | 40 / 41 | 0.881 | 0.948 |
| CITY | 4 / 4 | 1 / 9 | 9 / 10 | 3 / 3 | 0.808 | 0.923 |
| fixture R-04 (labelled) | 2 / 2 | 1 / 17 | 22 / 23 | 4 / 4 | 0.870 | 0.957 |

On every payload, the towers are a subset of the wall vertices, so the probes' finding holds on the twelve plan slots.
Where a way meets the wall on a straight stretch, the vertex is almost never towered (24 / 493 on the plan slots).
Every other wall vertex nearly always is: straight with no way 134 / 140, a corner with no way 388 / 412, a corner
with a way 82 / 85. Closed walls (slots 0, 1, 4, 6, 10, 11) have no chain ends. Open walls tower all their ends
(24 / 24 on the plan slots; 2 / 2 and 4 / 4 on the fixtures). The along-wall spacing is 32.8–35.0 m at the median per
size (p10 ≈ 29 m). This is a description of what the payloads show and does not claim FTG's code. It narrows C11's
open item for a confidence or design seat; no change is asked here.

## 8 The market squares (R-23: no row, a note)

| payload | market squares | footprint m² | ring | footprint / its face | distance apart m | same face | neighbouring faces |
|---|---|---|---|---|---|---|---|
| CITY rec. 0 | 2 | 942 / 1 168 | 0 / 0 | 1.000 / 1.000 | 264 | no | no |
| CITY rec. 1 (R-04) | 2 | 670 / 956 | 0 / 0 | 1.000 / 1.000 | 356 | no | no |
| slot 0 | 1 | 1 235 | 0 | 1.000 | — | — | — |
| slot 1 | 2 | 1 241 / 1 306 | 0 / 0 | 1.000 / 1.000 | 263 | no | no |
| slot 2 | 1 | 1 968 | 0 | 1.000 | — | — | — |
| slot 3 | 2 | 1 496 / 500 | 0 / 2 | 1.000 / 1.000 | 648 | no | no |
| slot 4 | 1 | 1 177 | 0 | 1.000 | — | — | — |
| slot 5 | 2 | 815 / 3 811 | 0 / 1 | 1.000 / 1.000 | 788 | no | no |
| slot 6 | 2 | 1 240 / 620 | 0 / 0 | 1.000 / 1.000 | 348 | no | no |
| slot 7 | 2 | 1 159 / 1 709 | 0 / 0 | 1.000 / 1.000 | 416 | no | no |
| slot 8 | 2 | 1 085 / 1 885 | 0 / 2 | 1.000 / 1.000 | 394 | no | no |
| slot 9 | 2 | 578 / 1 296 | 1 / 1 | 1.000 / 1.000 | 528 | no | no |
| slot 10 | 1 | 1 264 | 0 | 1.000 | — | — | — |
| slot 11 | 2 | 1 247 / 1 253 | 1 / 1 | 1.000 / 1.000 | 286 | no | no |

Every market square is one face of its own: its footprint equals the face the ways close round it (ratio 1.000 to four
places). No payload has two squares in one face or in neighbouring faces. That is consistent with our rule that two
market reservations never share an edge (ARCHITECTURE §13.2, T24-3); the distances are 263–788 m. The count follows the
size ladder: one at BIG_TOWN (5 600 people), two at CITY (9 500), BIG_CITY (24 500) and METROPOLIS (49 500). FTG's
second square therefore appears below our 10 000-person floor for a secondary market. That is a property of the
reference and asks for no change; our `secondaryChance` at TOWN covers the case.

## 9 What is left, and how the last pass runs (no silent deferral)

The only thing left is check 3. After programme 2 closes (slot 27 decided, or its stop recorded in E02's JSON
`slotsByProgramme["2"]`), the session or a seat runs, from the project root:

```
python3 research/baselines/measure_ftg_faces.py --md <scratch>/e06-tables.md
python3 research/baselines/measure_ftg_faces.py --check
python3 research/baselines/measure_ftg_faces.py --red
```

It then replaces the tables and numbers of sections 3–8 and the outcome with the new `--md` output and receipts, and
sets the outcome to landed if all six checks pass. Nothing in the tool changes. TOWN's two slots (26, 27) enter as
research-side numbers, and slots 24–25 join CITY (`minmax` at three usable). The re-run is a script, not a judgement, so
the session may run it as a mechanical step. W-15 depends on that pass, not on this one (R-47 (b)).

## 10 Hand-offs (each to its named owner; none is a change this lane may make)

* **W-15 (the sole writer of rows, R-47 (a)) — the `ftg.ringBlock` row's note.** The row must state W06-D2 and W06-D3:
  the faces are those of the planarized way arrangement, with water faces excluded. M1's `plat measure` re-runs every
  row on the stored `MeasureInput` files (T-V12-3), and the files still hold the node-free bridge crossings. Without
  the note, a re-run that walks faces without planarizing fails on five payloads. Role descriptive (R-34). The values
  are `samples.<size>` of this record's last pass.
* **The next design seat (wording, for the session's intake as it did DC-37 / DC-38).** V12 §3.4.2's `ftg.ringBlock`
  line reads "areas of the faces FTG's ways close inside a ring, from ways alone". It should add "with the district
  outline closing them, crossings without a node made nodes, and faces at least half water excluded" (W06-D1 … D3).
  The registry's `basis` is "stated" and needs the same words when W-01b's successor next regenerates `plan.py`'s
  catalogue. This lane may write neither file.
* **E19 (W-20's list for M1's `known-defects.json`).** FTG plot depth, frontage and plot share stay descriptive rows in
  C-0116's form (item 49, R-25). The evidence is in section 5's first paragraph.

## 11 CONFIRMED and PLAUSIBLE

CONFIRMED (executed or read): every number in sections 3–8 (one tool run, reproduced by `--check`); the six planted
faults caught; the twin; the raster count; that all 15 node-free crossings lie on the water outline (distance 0.0 m to
a water polygon's edge, scratch probe); that every outline segment is a graph edge (four payloads explored); that the
stored `MeasureInput` files equal fresh writes (10 of 10); the programme's open state (`plan.json`, E02's JSON, the
lane log).

PLAUSIBLE (reasoning only): that the sibling-cut reading isolates FTG's last split; that the ± 1 raster differences
are pixel artefacts; that the September CITY payloads' squarer cuts reflect a build or size difference; the code
reading's band widths as FTG's drawn widths (read, not measured on a render); the reading of the tower table as a
selection rule.

## 12 Self-check and housekeeping

`python3 docs/validation/bench/doc_checks.py --doc docs/calibration/E06-ftg-faces.md --heads docs/ARCHITECTURE.md` over
the full corpus (10 766 colour files, 10 300 JSON files, 958 650 corpus 3-grams, 532 lists) reported C1 0, C2 0, C4 0,
S1 0 and S2 0. C3 reported 84 hits, all unreviewed, and every one was read (85 on the text before it was rewrapped; the
parallel lanes grow the corpus between runs). They are digit runs from the tables, section numbers, our own file paths
(the stats script, the code reading) and phrases of our own records ("a subset of the wall vertices", "lie on the water
outline", "the parent's OBB"). None is a reference word list, palette, grammar or identifier. The exit status 1 is that
unreviewed count. This record is outside the design set, so no allow rows were added (E05's precedent). `df -h
/Users/cstokes`: 9.9 GiB free during the pass. The outputs are the tool (73 KB), this record and its JSON (433 KB). No
capture folder or `MeasureInput` file was made, nothing was deleted and no git command ran. Scratch work (dev passes,
the raster check, the bridge probe) is in the session scratchpad `m1w2/w06/`.
