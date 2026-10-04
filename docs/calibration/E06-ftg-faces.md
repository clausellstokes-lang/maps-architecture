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

## 13 The last pass (lane `m1/W-06-final`, 2026-10-04 05:40–06:15 EDT; the pass itself 05:46–05:48)

**Outcome: landed. All six checks of the row pass, check 3 included (CONFIRMED by execution).** FTG programme 2 closed
when slot 27 was bound at 05:45 (`plan.json` sha256 `9ed325bd…`; no programme slot open; E02's JSON now reads 22 of 22
taken). The pass started after that bind and read every slot: the two CITY fixtures (the 2026-09-25 one labelled, R-04)
and slots 0–27, which is 30 payloads. W-15 may now form the `ftg.ringBlock` row from this pass (R-47 (b)). Sections 1–12
above are pass 1 (lane `m1/W-06`, slots 0–11) and stay as written. This section supersedes their numbers, and 13.4
lists the sentences of pass 1 that the full sample corrects.

What was reused and how it was re-checked (CONFIRMED): the tool, the decisions W06-D1 … D9 and pass 1's per-payload
files. A pre-pass over slots 0–26 (05:41, into the scratchpad) reproduced pass 1's 14 per-payload entries key for key,
except the flag that compares a stored `MeasureInput` file with a fresh adapter write. That flag was empty for slots
8–11 in pass 1 and is now true, because W-05b-final wrote their files at 05:04. The last pass's 29 entries for the
fixtures and slots 0–26 equal the pre-pass's, and the four FTG sizes with rows have identical samples in both. Only
TOWN changed, gaining slot 27.

### 13.1 The tool after this lane

`research/baselines/measure_ftg_faces.py` (sha256 `212e3f9d…`) received three changes and no change to any measured
number (CONFIRMED: the 29 shared entries are equal).

* **W06F-D1 (vetoable, J122) — a payload without a wall.** Slot 12 has no wall: E02 records it, and W-05b-final lists it
  as `noWall`. The `--md` table of corner and way counts multiplied an empty rule agreement and crashed. Pooled rule
  agreements now read the walled payloads only, and the greedy spacing cell prints a dash. *Reason:* a payload with no
  wall vertex has no tower rule to agree with, and its face numbers are unaffected.
* **W06F-D2 — the pass's provenance.** The JSON now carries `lane: m1/W-06-final` and `earlierPass` (pass 1's lane, its
  last slot 11 and its JSON's sha256 `7726227b…`). *Reason:* the file is replaced by the last pass (W06F-D4), and it
  must say which pass it holds.
* **W06F-D3 — a live plant for check 3.** `--red` now also feeds `run_checks` the recorded pass read one slot short
  (through 26 with 27 decided), and that plant must fail. The recorded pass must pass as the green control. *Reason:*
  pass 1 could plant the closure test only on synthetic states, because the programme was open. Now the real check path
  is exercised.

Decisions about the record:

* **W06F-D4 — the JSON is replaced, and the markdown record is appended to.** `docs/calibration/E06-ftg-faces.json`
  now holds the last pass (sha256 `290166d0…`, 743 KB). Pass 1's JSON is in the session commit `bef102c` and in
  the scratchpad (`m1w2/w06f/E06-ftg-faces.pass1.json`). *Reason:* `--check` reproduces the pass the file records, and
  W-15 must read one file. The brief asks for a new section in the record rather than a rewrite.
* **W06F-D5 — slot 27 stays in TOWN.** FTG's account list names slot 27's town a big town of 5 725 people (E02 39.3
  finding 1). Its request size key and its payload border are the town's, so check 5 places it by its label, as the
  plan does. TOWN has no row (R-34), so no row moves. The town is unlike slot 26: it has four rings against two, 88
  blocks against 44, and two wall stretches whose ends rest on the water, with a second walled part on the far bank
  (E02 39.3 finding 2). Its median block is 2 793 m², the largest of the 30 payloads.
* **W06F-D6 — slot 27 is measured from the fresh adapter output.** Its `MeasureInput` file does not exist yet, because
  W-05b-final ran before slot 27 was created. W-05b owns those files, so this lane wrote none (pass 1 measured slots
  8–11 the same way). The other 29 stored files equal fresh writes.

### 13.2 The row's checks, with receipts (executed 05:46–05:59)

| # | check | result | receipt |
|---|---|---|---|
| 1 | faces close (Euler per ring subgraph) | **PASS** | 134 of 134 rings on 30 payloads: every walk closes; 0 crossings and 0 off-node contacts after W06-D2; 0 ways crossing the outline; one outer cycle per component; V − E + F = C on 134 / 134; 10 720 / 10 720 seeded points each in exactly one face; 9 255 faces; 6 floating way components subtracted as holes |
| 2 | face areas sum to the ring area within 1 % | **PASS** | worst relative difference 1.06 × 10⁻⁶ (2026-09-21 ring 0, as in pass 1) over 134 rings |
| 3 | the last pass postdates the FTG programme's close (R-47) | **PASS** | programme 2 closed (no open slot in `plan.json` 9ed325bd…; E02 JSON 22 / 22 taken); the pass read through slot 27, the last decided slot; `--red`'s live plant (through slot 26) fails and the recorded pass passes |
| 4 | twin: the challenge probes and the critic's ring areas | PASS | 0 differences (the fixtures did not change) |
| 5 | samples equal the plan's slots in order; the 2026-09-25 payload in no sample | PASS | BIG_TOWN 10 (slots 0, 2, 4, 10, 12, 14, 16, 18, 20, 22), BIG_CITY 10 (1, 3, 5, 11, 13, 15, 17, 19, 21, 23), METROPOLIS 4 (6–9), CITY 3 (the recorded usable member, slots 24, 25), TOWN 2 (26, 27); each slot's request size and water equal its label |
| 6 | the scanline integrates each ring within 0.1 % | PASS | worst 1.20 × 10⁻⁴ (slot 27, ring 1) |

**Reproduction (`--check`, exit 0, 2 min 14 s):** a fresh run equals the recorded JSON in every key but the checks and
the live plan hash, and 6 of 6 checks pass. **Discrimination (`--red`, exit 0, 4 min 50 s):** 6 of 6 planted faults
are caught. The faults are a chord with no node (1), one outline piece dropped (2), the closure test on synthetic
states plus the live plant (3), a twin median moved 0.1 m (4), two BIG_TOWN slots swapped (5) and a ring's scan error
raised to 1 % (6). **`plan.py --check`:** SAME for `plan.json` (9ed325bd…) and `metrics.m-1.json` (8a0efa7e…). This lane
wrote neither file.

**Independent checks of the new payloads (CONFIRMED; scratchpad scripts, not part of the tool).** (a) Pass 1's 1 m
raster flood fill was re-run on slots 12, 13, 24 and 26. The walk found 97 / 343 / 157 / 44 faces and the raster
96 / 342 / 157 / 44 regions of 20 m² or more, within one per ring. The raster medians are 3–6 % smaller, as in pass 1.
(b) Every crossing that W06-D2 makes a node was located against the water polygons. On slots 5, 12, 13, 17, 20, 23 and
27 (12 crossings, slot 5's two re-checked) each lies at 0.0 cm from a water polygon's edge: a main road crossing the
water outline, or a street along the bank crossing that main road. With pass 1's probe, all 25 crossings in the 30
payloads lie on the water outline. (c) Slot 27's two towers off the wall were located (13.3 item 4).

### 13.3 What the full sample shows (each CONFIRMED by the run unless marked)

1. **Blocks.** Inside 134 rings, the ways close 9 255 faces: 28 water faces (W06-D3) and 9 227 blocks. The pooled
   median block is **2 305 / 2 347 / 2 362 / 2 438 m²** at BIG_TOWN / BIG_CITY / METROPOLIS / CITY (n 10 / 10 / 4 /
   3) and 2 594 m² at TOWN (n 2, research-side). The per-capture medians run from 1 951 to 2 793 m². Pass 1's reading
   stands: the block size barely moves with the settlement's size. The estimator is now `type7` at BIG_TOWN and
   BIG_CITY (n 10) and `minmax` at METROPOLIS and CITY.
2. **The `plotShare` bound** is **0.857–0.887** across the 28 slots and the usable CITY payload (0.889 on the R-04
   fixture). By size it is BIG_TOWN 0.862–0.885, BIG_CITY 0.873–0.886, METROPOLIS 0.880–0.884, CITY 0.868–0.882 and
   TOWN 0.857–0.887. Less the paved squares it is 0.452–0.862 (slot 27 the lowest), and the footprint cover floor is
   0.398–0.554. §4.5's dense-core 0.62 lies inside every payload's bracket (floor at most 0.554, bound at least 0.857).
   Its looser regimes' 0.55 and 0.45 cannot be compared with a whole-ring figure. §4.5 has M1 measure `plotShare` per
   regime (R-31), so no change is asked.
3. **Dividing roads.** The samples hold 2 772 sibling cuts (24 386 chains examined). By size, 0.52–0.59 run across the
   long axis and 0.18–0.23 along it, 0.75–0.79 lie within 15° of an OBB axis, the median offset from the middle is
   0.074–0.107 of the long side, the median area balance is 0.547–0.608, and 0.75–0.81 end on the parent's longest
   side. Pass 1 left one question open: the September CITY payloads ran across far more often. The October CITY slots
   now answer the size half of it. Slots 24 and 25 read 0.513 and 0.488 across, like the other October slots, against
   0.775 and 0.806 for the two September payloads, so size does not explain the gap. The September pair sits at the top
   of the October per-payload range (0.37–0.77 over the 27 slots with at least 20 cuts). Whether September's payloads
   differ at all, or are two high draws, is not settled (PLAUSIBLE either way). Whatever differed on those dates (FTG's
   code, the setting, the session) is not separated.
4. **Towers.** **1 081 of 1 083** towers on the slots stand on a wall vertex (1 127 / 1 129 with the fixtures). The two
   exceptions are both on slot 27, on nodes that only water-outline edges touch (CONFIRMED by a scratch probe). One
   stands on the sea's edge and the other on the river's edge, 11.8 m apart with land between them. They are 68 m and
   80 m from the nearest wall end and the same distances from the nearest way. That slot's two wall stretches end on
   the water at all four of their ends, and each end is towered. What the pair marks (perhaps the river's mouth) is not
   settled (PLAUSIBLE only). Across the slots, a wall vertex where a way meets the wall on a straight
   stretch is towered **37 / 859** times. Every other wall vertex nearly always is: straight with no way 225 / 241, a
   corner or chain end with no way 674 / 728, a corner with a way 145 / 150. The rule "no way meets, or a corner" agrees with
   **93–96 %** of wall vertices per size (TOWN 96 %). All chain ends are towered (48 / 48). Twelve slots have a closed
   wall (0, 1, 4, 6, 10, 11, 14, 15, 18, 19, 24, 26) and one has none (12). The pooled along-wall spacing is
   32.8–37.8 m at the median per size. This is a description, not a claim about FTG's code (C11's open item).
5. **Market squares.** All 48 market squares are each exactly one face (the footprint against its face: 0.9998–1.0002).
   No two share a face or neighbour each other, and pairs stand 170–788 m apart. There is one per BIG_TOWN and TOWN
   payload, and two per CITY, BIG_CITY and METROPOLIS payload, on every payload (R-23: a note, no row).
6. **Bridges.** There are 25 node-free crossings (14 way × outline, 11 way × way) on 10 coast-and-river payloads, all
   on the water outline (13.2 (b)). Faces at least half water number 28 on 19 payloads: 19 basins or reaches of
   1 180–28 900 m², and 9 slivers and pockets of 0.3–62 m² at the bridges.

### 13.4 Pass 1's sentences that the full sample corrects (pass 1's text is not edited)

* The opening summary's item 6 and section 10 say that **five** payloads hold node-free crossings. Pass 1's JSON shows
  **four** (CITY rec. 0 and slots 4, 5 and 7, with 4 + 4 + 2 + 5 = 15 crossings). Now there are ten payloads and 25
  crossings.
* The opening summary's item 4 and section 7 say that every tower stands on a wall vertex ("on every payload"). That
  held on pass 1's 14 payloads. Slot 27 has two towers on the water outline instead (13.3 item 4).
* Section 9 says that the last pass "needs no change to the tool". It needed one: a display fix for a payload without a
  wall (W06F-D1), plus the provenance label and the live plant. No measured number changed.

### 13.5 The last pass's tables

Per payload (30 payloads; "crossings made nodes" counts W06-D2's crossings; slot 27 measured from the fresh adapter
output, W06F-D6):

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
| slot 12 | BIG_TOWN / coast+river | 2 | 97 (2) | 95 | 1 130 / 2 509 / 3 774 | 2 235 | 1 / 1 | 0.881 | 0.752 | 0.468 |
| slot 13 | BIG_CITY / coast+river | 5 | 343 (2) | 341 | 1 086 / 2 426 / 3 877 | 2 119 | 2 / 1 | 0.882 | 0.724 | 0.519 |
| slot 14 | BIG_TOWN / none | 3 | 85 (0) | 85 | 1 072 / 2 403 / 3 937 | 2 059 | 0 / 0 | 0.880 | 0.749 | 0.514 |
| slot 15 | BIG_CITY / none | 5 | 353 (0) | 353 | 1 043 / 2 477 / 3 956 | 2 147 | 0 / 0 | 0.886 | 0.699 | 0.549 |
| slot 16 | BIG_TOWN / coast+river | 4 | 88 (1) | 87 | 668 / 2 352 / 3 838 | 2 072 | 0 / 0 | 0.877 | 0.771 | 0.468 |
| slot 17 | BIG_CITY / coast+river | 6 | 382 (1) | 381 | 925 / 2 435 / 3 748 | 2 154 | 0 / 1 | 0.885 | 0.786 | 0.469 |
| slot 18 | BIG_TOWN / none | 3 | 106 (0) | 106 | 704 / 2 169 / 3 907 | 1 802 | 0 / 0 | 0.866 | 0.741 | 0.469 |
| slot 19 | BIG_CITY / none | 5 | 385 (0) | 385 | 896 / 2 362 / 3 779 | 2 011 | 0 / 0 | 0.873 | 0.799 | 0.518 |
| slot 20 | BIG_TOWN / coast+river | 4 | 86 (2) | 84 | 553 / 2 121 / 3 874 | 1 788 | 1 / 1 | 0.869 | 0.782 | 0.458 |
| slot 21 | BIG_CITY / coast+river | 5 | 381 (1) | 380 | 884 / 2 287 / 3 847 | 1 986 | 0 / 0 | 0.881 | 0.754 | 0.459 |
| slot 22 | BIG_TOWN / coast+river | 2 | 95 (1) | 94 | 870 / 2 400 / 3 826 | 2 160 | 0 / 0 | 0.876 | 0.717 | 0.501 |
| slot 23 | BIG_CITY / coast+river | 4 | 424 (1) | 423 | 878 / 2 246 / 3 724 | 1 982 | 0 / 1 | 0.879 | 0.774 | 0.482 |
| slot 24 | CITY / none | 4 | 157 (0) | 157 | 1 060 / 2 608 / 3 904 | 2 342 | 0 / 0 | 0.877 | 0.754 | 0.532 |
| slot 25 | CITY / coast+river | 3 | 115 (1) | 114 | 1 148 / 2 445 / 4 032 | 2 179 | 0 / 0 | 0.882 | 0.718 | 0.445 |
| slot 26 | TOWN / none | 2 | 44 (0) | 44 | 1 008 / 2 328 / 3 628 | 2 008 | 0 / 0 | 0.857 | 0.857 | 0.476 |
| slot 27 | TOWN / coast+river | 4 | 89 (1) | 88 | 1 190 / 2 793 / 6 232 | 2 451 | 1 / 0 | 0.887 | 0.452 | 0.476 |

Per FTG size, in plan order (the sample W-15 reads: `samples.<size>` and each member's `blockAreasM2` in the JSON; TOWN
is research-side, R-34):

| FTG size | n | estimator at n | captures in order | blocks | block m² p10 / p50 / p90 | per-capture median m² | plotShare bound (range) | less paved (range) | footprint cover (range) |
|---|---|---|---|---|---|---|---|---|---|
| BIG_TOWN | 10 | type7 | BIG_TOWN/none/0, BIG_TOWN/coast+river/0, BIG_TOWN/coast+river/1, BIG_TOWN/none/1, BIG_TOWN/coast+river/2, BIG_TOWN/none/2, BIG_TOWN/coast+river/3, BIG_TOWN/none/3, BIG_TOWN/coast+river/4, BIG_TOWN/coast+river/5 | 895 | 788 / 2 305 / 3 888 | 2 002 / 2 237 / 2 696 / 1 951 / 2 509 / 2 403 / 2 352 / 2 169 / 2 121 / 2 400 | 0.862–0.885 | 0.516–0.862 | 0.398–0.516 |
| BIG_CITY | 10 | type7 | BIG_CITY/none/0, BIG_CITY/coast+river/0, BIG_CITY/coast+river/1, BIG_CITY/none/1, BIG_CITY/coast+river/2, BIG_CITY/none/2, BIG_CITY/coast+river/3, BIG_CITY/none/3, BIG_CITY/coast+river/4, BIG_CITY/coast+river/5 | 3 954 | 871 / 2 347 / 3 795 | 2 290 / 2 387 / 2 309 / 2 325 / 2 426 / 2 477 / 2 435 / 2 362 / 2 287 / 2 246 | 0.873–0.886 | 0.699–0.832 | 0.459–0.554 |
| METROPOLIS | 4 | minmax | METROPOLIS/none/0, METROPOLIS/coast+river/0, METROPOLIS/coast+river/1, METROPOLIS/coast+river/2 | 3 716 | 873 / 2 362 / 3 757 | 2 324 / 2 353 / 2 402 / 2 333 | 0.880–0.884 | 0.778–0.829 | 0.495–0.535 |
| CITY | 3 | minmax | CITY/coast+river/0, CITY/none/0, CITY/coast+river/2 | 394 | 1 043 / 2 438 / 3 912 | 2 238 / 2 608 / 2 445 | 0.868–0.882 | 0.709–0.754 | 0.445–0.532 |
| TOWN | 2 | no row (R-34) | TOWN/none/0, TOWN/coast+river/0 | 132 | 1 088 / 2 594 / 4 610 | 2 328 / 2 793 | 0.857–0.887 | 0.452–0.857 | 0.476–0.476 |

Pooled counts in the registry's 24 log bins (`metrics.m-1.json` `ftg.ringBlock`, 50–50 000 m², lower edges shown;
underflow below 50 m²: eight slivers at BIG_CITY and METROPOLIS):

| FTG size | underflow | 50 | 67 | 89 | 119 | 158 | 211 | 281 | 375 | 500 | 667 | 889 | 1 186 | 1 581 | 2 108 | 2 812 | 3 749 | 5 000 | 6 668 | 8 891 | 11 857 | 15 811 | 21 085 | 28 117 | 37 495 | overflow |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| BIG_TOWN | 0 | 0 | 0 | 2 | 3 | 2 | 6 | 16 | 16 | 27 | 37 | 55 | 113 | 137 | 148 | 213 | 80 | 15 | 14 | 9 | 2 | 0 | 0 | 0 | 0 | 0 |
| BIG_CITY | 6 | 0 | 2 | 5 | 5 | 10 | 31 | 34 | 59 | 105 | 146 | 257 | 467 | 563 | 809 | 1009 | 311 | 39 | 39 | 56 | 1 | 0 | 0 | 0 | 0 | 0 |
| METROPOLIS | 2 | 1 | 2 | 8 | 16 | 13 | 20 | 27 | 62 | 89 | 141 | 241 | 443 | 527 | 806 | 939 | 299 | 25 | 28 | 23 | 3 | 1 | 0 | 0 | 0 | 0 |
| CITY | 0 | 0 | 0 | 0 | 2 | 0 | 1 | 4 | 4 | 3 | 11 | 26 | 42 | 69 | 71 | 112 | 30 | 5 | 6 | 7 | 1 | 0 | 0 | 0 | 0 | 0 |
| TOWN | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 2 | 2 | 1 | 4 | 5 | 14 | 19 | 24 | 37 | 10 | 5 | 3 | 4 | 1 | 0 | 0 | 0 | 0 | 0 |

Dividing roads (sibling cuts, W06-D4), pooled per FTG size; the R-04 fixture labelled:

| FTG size | cuts | across the long axis (≥ 75°) | along it (< 15°) | within 15° of an OBB axis | aspect p50 across / along | offset from the middle p50 (p90) | area balance p50 | to the longest side p50 (share ≥ 75°) | ends on the longest side |
|---|---|---|---|---|---|---|---|---|---|
| BIG_TOWN | 285 | 0.579 | 0.182 | 0.761 | 1.80 / 1.34 | 0.107 (0.246) | 0.574 | 78.0° (0.554) | 0.810 |
| BIG_CITY | 1175 | 0.547 | 0.220 | 0.768 | 1.86 / 1.38 | 0.101 (0.271) | 0.547 | 76.0° (0.509) | 0.774 |
| METROPOLIS | 1144 | 0.564 | 0.208 | 0.772 | 1.84 / 1.34 | 0.106 (0.262) | 0.562 | 76.4° (0.520) | 0.791 |
| CITY | 120 | 0.592 | 0.200 | 0.792 | 2.02 / 1.39 | 0.103 (0.241) | 0.608 | 80.7° (0.583) | 0.750 |
| TOWN | 48 | 0.521 | 0.229 | 0.750 | 1.67 / 1.22 | 0.074 (0.217) | 0.586 | 77.6° (0.542) | 0.812 |
| fixture R-04 (labelled) | 36 | 0.806 | 0.111 | 0.917 | 2.10 / 1.37 | 0.093 (0.213) | 0.667 | 85.4° (0.694) | 0.917 |

Towers against the wall vertices, per payload (slot 12 has no wall; slot 27's towers on wall vertices are 52 of 54):

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
| slot 12 | 0 / 0 | 0 | 0 (0) | 0 / 0 | 0/0 / 0/0 / 0/0 / 0/0 / 0/0 / 0/0 | 0/0 / 0/0 / 0/0 | — / — / — (—–—) | 0 / 0 / 0 / 0 | —, — (—) |
| slot 13 | 37 / 37 | 60 | 2 (0) | 4 / 4 | 14/34 / 11/12 / 4/5 / 2/2 / 2/3 / 0/0 | 27/31 / 8/21 / 2/8 | 32.4 / 36.5 / 44.2 (10.3–69.5) | 17 / 13 / 5 / 0 | 32, 0.867 (0.617) |
| slot 14 | 23 / 23 | 44 | 1 (1) | 0 / 0 | 2/20 / 3/3 / 4/5 / 9/9 / 5/7 / 0/0 | 19/21 / 4/19 / 0/4 | 30.2 / 34.4 / 55.9 (27.6–66.7) | 8 / 11 / 2 / 2 | 27, 0.932 (0.523) |
| slot 15 | 49 / 49 | 92 | 1 (1) | 0 / 0 | 19/60 / 12/12 / 9/9 / 5/6 / 2/2 / 2/3 | 44/47 / 5/38 / 0/7 | 28.2 / 33.5 / 41.8 (26.3–103.1) | 15 / 28 / 4 / 2 | 26, 0.859 (0.533) |
| slot 16 | 16 / 16 | 30 | 1 (0) | 2 / 2 | 2/15 / 4/4 / 2/2 / 3/4 / 2/2 / 1/1 | 12/13 / 1/11 / 3/6 | 29.2 / 34.9 / 57.5 (14.1–79.0) | 4 / 9 / 1 / 1 | 30, 0.833 (0.533) |
| slot 17 | 25 / 25 | 41 | 1 (0) | 2 / 2 | 13/28 / 6/6 / 2/2 / 1/1 / 1/2 / 0/0 | 17/19 / 7/20 / 1/2 | 29.6 / 30.9 / 45.5 (22.5–68.7) | 12 / 9 / 2 / 1 | 29, 0.902 (0.610) |
| slot 18 | 22 / 22 | 46 | 1 (1) | 0 / 0 | 3/24 / 3/3 / 5/5 / 6/6 / 5/8 / 0/0 | 19/22 / 3/18 / 0/6 | 28.7 / 34.8 / 39.9 (27.8–85.5) | 5 / 13 / 2 / 2 | 27, 0.783 (0.522) |
| slot 19 | 51 / 51 | 100 | 1 (1) | 0 / 0 | 21/67 / 10/11 / 9/10 / 5/5 / 6/6 / 0/1 | 44/49 / 6/40 / 1/11 | 30.2 / 33.1 / 42.0 (26.2–96.6) | 17 / 24 / 7 / 3 | 25, 0.820 (0.510) |
| slot 20 | 14 / 14 | 33 | 1 (0) | 2 / 2 | 2/21 / 1/1 / 5/5 / 2/2 / 2/2 / 0/0 | 10/11 / 3/21 / 1/1 | 28.9 / 37.4 / 51.7 (20.6–58.3) | 2 / 4 / 6 / 1 | 32, 0.818 (0.576) |
| slot 21 | 23 / 23 | 42 | 1 (0) | 2 / 2 | 7/26 / 6/6 / 4/4 / 2/2 / 2/2 / 0/0 | 19/20 / 2/18 / 2/4 | 30.6 / 35.4 / 43.5 (7.5–66.1) | 9 / 9 / 3 / 1 | 28, 0.881 (0.548) |
| slot 22 | 18 / 18 | 37 | 1 (0) | 2 / 2 | 1/18 / 3/3 / 6/6 / 4/6 / 1/1 / 1/1 | 13/17 / 4/17 / 1/3 | 31.2 / 40.7 / 58.9 (30.9–61.9) | 5 / 6 / 5 / 1 | 28, 0.784 (0.513) |
| slot 23 | 47 / 47 | 85 | 2 (0) | 4 / 4 | 8/43 / 12/12 / 19/21 / 4/5 / 0/0 / 0/0 | 40/44 / 4/34 / 3/7 | 29.8 / 34.5 / 39.0 (6.7–72.5) | 20 / 15 / 8 / 2 | 30, 0.859 (0.553) |
| slot 24 | 36 / 36 | 76 | 1 (1) | 0 / 0 | 3/39 / 4/4 / 21/23 / 4/6 / 4/4 / 0/0 | 33/37 / 1/30 / 2/9 | 32.1 / 35.7 / 61.4 (30.1–90.0) | 9 / 17 / 8 / 2 | 28, 0.868 (0.526) |
| slot 25 | 13 / 13 | 28 | 1 (0) | 2 / 2 | 5/18 / 2/3 / 1/1 / 3/3 / 0/1 / 0/0 | 9/11 / 2/14 / 2/3 | 30.6 / 44.6 / 59.1 (11.3–66.2) | 2 / 6 / 3 / 1 | 29, 0.750 (0.536) |
| slot 26 | 27 / 27 | 49 | 1 (1) | 0 / 0 | 2/20 / 4/7 / 7/7 / 10/10 / 3/4 / 1/1 | 27/30 / 0/16 / 0/3 | 31.5 / 35.9 / 61.8 (28.5–95.4) | 10 / 13 / 3 / 1 | 28, 0.857 (0.551) |
| slot 27 | 52 / 54 | 85 | 2 (0) | 4 / 4 | 2/34 / 31/31 / 8/9 / 7/7 / 0/0 / 0/0 | 44/45 / 8/39 / 0/1 | 27.3 / 34.8 / 43.1 (18.1–51.9) | 21 / 25 / 4 / 0 | 26, 0.918 (0.612) |

The corner-and-way table, pooled per size:

| group | straight, no way meets | straight, a way meets | corner (≥ 2°) or chain end, no way meets | corner, a way meets | rule "no way meets" | rule "no way meets, or a corner" |
|---|---|---|---|---|---|---|
| BIG_TOWN | 20 / 25 | 1 / 145 | 133 / 148 | 34 / 37 | 0.845 | 0.932 |
| BIG_CITY | 94 / 102 | 18 / 347 | 281 / 302 | 56 / 56 | 0.872 | 0.942 |
| METROPOLIS | 99 / 102 | 18 / 268 | 159 / 167 | 40 / 41 | 0.881 | 0.948 |
| CITY | 12 / 12 | 1 / 58 | 43 / 50 | 10 / 10 | 0.862 | 0.938 |
| TOWN | 4 / 4 | 0 / 50 | 67 / 71 | 8 / 9 | 0.910 | 0.963 |
| fixture R-04 (labelled) | 2 / 2 | 1 / 17 | 22 / 23 | 4 / 4 | 0.870 | 0.957 |

Market squares:

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
| slot 12 | 1 | 1 897 | 0 | 1.000 | — | — | — |
| slot 13 | 2 | 1 948 / 1 312 | 0 / 3 | 1.000 / 1.000 | 428 | no | no |
| slot 14 | 1 | 805 | 0 | 1.000 | — | — | — |
| slot 15 | 2 | 1 118 / 1 537 | 0 / 0 | 1.000 / 1.000 | 263 | no | no |
| slot 16 | 1 | 995 | 0 | 1.000 | — | — | — |
| slot 17 | 2 | 868 / 1 800 | 0 / 0 | 1.000 / 1.000 | 178 | no | no |
| slot 18 | 1 | 2 937 | 0 | 1.000 | — | — | — |
| slot 19 | 2 | 2 362 / 2 378 | 0 / 0 | 1.000 / 1.000 | 194 | no | no |
| slot 20 | 1 | 1 816 | 0 | 1.000 | — | — | — |
| slot 21 | 2 | 1 424 / 2 322 | 0 / 2 | 1.000 / 1.000 | 333 | no | no |
| slot 22 | 1 | 3 018 | 0 | 1.000 | — | — | — |
| slot 23 | 2 | 2 224 / 1 800 | 0 / 0 | 1.000 / 1.000 | 390 | no | no |
| slot 24 | 2 | 1 724 / 1 773 | 0 / 0 | 1.000 / 1.000 | 170 | no | no |
| slot 25 | 2 | 769 / 1 166 | 0 / 0 | 1.000 / 1.000 | 227 | no | no |
| slot 26 | 1 | 1 082 | 0 | 1.000 | — | — | — |
| slot 27 | 1 | 1 626 | 1 | 1.000 | — | — | — |

### 13.6 Hand-offs (each to its named owner; none is a change this lane may make)

* **W-15 (the sole writer of rows, R-47 (a)).** `ftg.ringBlock` may now be formed from this pass. Its values are
  `samples.<size>` of `E06-ftg-faces.json` (sha256 `290166d0…`): BIG_TOWN and BIG_CITY at n 10 (`type7`),
  METROPOLIS at n 4 and CITY at n 3 (`minmax`), role descriptive (R-34). TOWN gets research-side numbers only. The row's
  note must state W06-D2 and W06-D3, as section 10 asked. The count behind that note is now **ten** payloads with 25
  crossings, all bridges.
* **W-05b (the owner of the `MeasureInput` files) and the session.** Slot 27 has no stored `MeasureInput` file yet
  (W06F-D6). M1's `plat measure` re-runs every row on the stored files (T-V12-3), so slot 27's file must be written
  before W-15's provenance can name it. E02 39.3 finding 1 also routes the slot's listed population to W-05b.
* **The session (slot 27's verification).** The programme-2 verifier `m1/W-02b-verifyc` landed at 06:01 with slot 27
  `confirmed` (`results/W-02b-verifyc.json`). It supports binding the slot as TOWN despite the list's label, so the
  slot this pass read is the verified one, and `plan.json` was still `9ed325bd…` when this lane landed. If slot 27 were
  ever unbound or re-labelled, `--check` would fail (the slot status is in the recorded body). The re-run is the three
  commands of section 9.
* **A confidence or design seat (C11, for the session's intake).** Add to the tower description that on one
  coast-and-river town of 28, FTG stands two towers on the water's edge, away from the wall and from any way (13.3
  item 4). Our design's water furniture puts its towers on the two banks across the water: the harbour-mouth chain,
  "a tower at each" (ARCHITECTURE's gate field `mouth`, g item 106 (e)). This pair has land between it instead, so it
  is not that furniture, and no change is asked here.
* The design seat's wording for V12 §3.4.2 and the registry's `basis` (section 10, second item) is unchanged.

### 13.7 CONFIRMED and PLAUSIBLE

CONFIRMED (executed or read): every number in 13.2, 13.3 and 13.5 (one run at 05:46–05:48, reproduced by `--check`);
the six planted faults caught; the re-check of pass 1's 14 entries; the raster count on four new slots; the 25
crossings on the water outline (pass 1's 15 by its probe, the new 10 by this lane's); the location of slot 27's two
detached towers; the programme's closed state (`plan.json`, E02's JSON, the lane log: `m1/W-02-slot27c` landed 05:51).

PLAUSIBLE (reasoning only): that the September CITY payloads' squarer cuts are draws at the top of the October range
or something particular to those dates (13.3 item 3); what slot 27's water-edge tower pair marks; and, as in
pass 1, that the sibling-cut reading isolates FTG's last split, the code reading's band widths, and the tower table
read as a selection rule.

### 13.8 Self-check and housekeeping

`python3 docs/validation/bench/doc_checks.py --doc docs/calibration/E06-ftg-faces.md --heads docs/ARCHITECTURE.md` was
run on the whole record with this section, over the full corpus (10 907 colour files, 10 441 JSON files, 962 689 corpus
3-grams, 546 lists, with our own outputs left out by the corpus rule). It reported C1 0, C2 0, C4 0, S1 0 and S2 0. C3
reported 191 hits on the final text, all unreviewed, and every one was read (pass 1 reported 84 on its own text). They
are digit runs from the tables (turn bins, histogram counts, spacing triples), our own file paths (the stats script, the
code reading), our own record phrases ("vetoable, each with its reason", "CONFIRMED (executed or read)") and phrases of
this record ("lie on the water outline", "a subset of the wall vertices", "run across the long axis", "two towers on the
water outline", "size does not explain the"). None is a reference word list, palette, grammar or identifier. The exit
status 1 is that unreviewed count. The record is outside the design set, so no allow rows were added (pass 1's and
E05's precedent). Free space was 11 GiB throughout (`df -h /Users/cstokes`). The outputs are the tool (sha256
`212e3f9d…`), this section (lines 344 onward, pass 1's 342 lines unchanged, CONFIRMED by `diff` against pass 1's copy),
the JSON (sha256 `290166d0…`) and the result `results/W-06-final.json`. No `MeasureInput` file, capture folder or
`plan.json` write was made, nothing in `plat/` was touched, no git command that changes state ran (status, log and
diff only), no site or bundle was read, and no
benchmark or timing was run. Scratch work (the pre-pass, raster, bridge and tower probes, pass 1's copies) is in the
session scratchpad `m1w2/w06f/`.
