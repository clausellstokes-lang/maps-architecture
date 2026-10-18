# Repair round 7v — V12 (calibration) — lane coherence/repair-V12-r7v

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V12-r7v; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-V12-r7v`, 2026-10-02)
- P0 brief read whole (FAMILY FIX PASS NOTES and ORCHESTRATION NOTES included); resume check: no output, no LANDED
  line: fresh start: done
- P1 adjudication-r7v read (head, decision table, Part H · V12, S12's END, builders' choices, held list); the readers
  check's VF7-RDR-01 and VF7-RDR-11 read whole: done
- P2 live V12 §3.4 (l. 1082–1255) and §3.11 (l. 2013–2302) read whole; V12 §2.2's `part` field (l. 350) and item-110
  entities paragraph (l. 385–390); the base texts the new words cite (§2.7's Terms l. 2606–2648, law 1 (1)–(3)
  l. 2699–2718, §4.8 *Gates* l. 8368, §5.3's gate row l. 9938); the sweep: done
- P3 blocks built (scratch generator: 3 count-asserted substitutions on 2 live subsections, each old text found exactly
  once in its subsection and once in the volume; every other line verbatim): done
- P4 checks (dry run of `docs/validation/amendments-b/apply-blocks.py` on copies; diff; ids; scans; doc_checks): done
- P5 report, result JSON, LANDED: done

## Summary

* **Blocks:** 2 `REPLACE` blocks on `docs/volumes/V12-calibration.md` — §3.4 (VF7-RDR-01's two V12 texts) and §3.11
  (VF7-RDR-11). No retitle, no insert, no append, no base block. **Ruling requests: 0.**
* **Live file** (assemble-r7's output): `docs/volumes/V12-calibration.md` sha256 66e2ca404b1f… (the output repair-r7-V12
  recorded); each REPLACE body is the live subsection with its count-asserted substitutions.
* **Binding rulings applied:** adjudication-r7v Part H · V12 — V12-1 (VF7-RDR-01, FIX) and V12-2 (VF7-RDR-11, FIX),
  written in that file's words. Where its words differ from the issue list's, the adjudication's govern (its *How to
  read*): the metric cell writes "`part` ≥ 1" as Part H gives it (the issue list's ">="), the volume's own notation
  (V12 §2.2 l. 350, l. 385). The finding's third text (base §13.5's "towers and gates" row) is the scope unit's S12 END
  ("§13.5's half is S12"); V12 writes no base block. No other unit's Part H asks an END of V12, and no END-L touches
  V12. J150's round-8 hand-offs: V12 writes nothing for them. No review id is written into design text.
* **Words** (`wc -w` over the volume): 83 730 → 83 777 (+47, +0.06 %); by whitespace tokens 85 299 → 85 347 (+48, the
  C-locale `wc` not counting the lone "≥"); §3.4 6 522 → 6 563 (+41), §3.11 7 052 → 7 059 (+7), by tokens. Every added
  word is ruled text: V12-1 adds 41 (the cell's qualifier and parenthesis, +29; the reading rule's clause, +12) and V12-2
  a net 7 (the parenthesis naming what reads no margin, less ", the zone and a held building's strip" reworded as "and
  the zone"). No shrink source applies this pass (a qualifier added to a definition and a reader list corrected); no
  unit shrank, so no nuance audit applies.

## Issues → where fixed

| id | sev | disposition (adjudication-r7v) | where fixed | text written |
|---|---|---|---|---|
| VF7-RDR-01 | major | FIX (V12-1); END scope (S12) | §3.4: §3.4.2's *Reading rules for item 110's entities* (live l. 1128–1129) and the `wall.towerSpacing`, `wall.ungated`, `gate.count` row (live l. 1167) | (1) the metric cell: "arterial ways crossing a curtain at no gate" → "arterial ways on ground part 0 crossing a curtain at no gate (a way's `part` ≥ 1 never counted: a deck passing over a curtain is no crossing, §2.7's laws, law 1 (1), (3); §5.3's gate row)"; (2) the reading rules: after "`wall.*`, `gate.count` and `wall.ungated` read `wall` features only, never `retaining`" adds "; `wall.ungated` reads ways of `part` 0 only (§2.7's laws, law 1 (1))" |
| VF7-RDR-11 | minor | FIX (V12-2) | §3.11: the `raisedWays.structure` register row (live l. 2177) | "— the strip, the ends, the zone and a held building's strip of their terms —" → "— the strip, the ends and the zone of their terms (a span's strip and a held building's strip read no margin) —" |

Neither issue is VALID CHOICE LISTED, MERGED or INVALID; no other finding of the round is routed to V12.

**Both ends.**
* VF7-RDR-01: the metric's new qualifier agrees with its far ends — law 1 (1) ("a deck passing over a wall is no
  crossing of the gate law", base l. 2701), law 1 (3) (a ring fixed after a road deck's line there is built through its
  supports, the deck passing over it, l. 2714–2718), §4.8 *Gates* ("Main gates are where S4's and S5b's arterials cross
  the trace on ground part 0 — a deck passing over a trace is no crossing", l. 8368) and §5.3's gate row ("on ground part
  0; a deck passing over a trace is no crossing", l. 9938). The measurement input carries the field the rule reads:
  `MeasureInput`'s ways carry `part` ("0 the ground, ≥ 1 a raised arena part (§3.4); absent reads 0", V12 l. 350), so the
  references' 2-D captures, which carry none, read part 0 and are counted exactly as before — the qualifier changes no
  reference's value. The P row's other half is S12's END at base §13.5.
* VF7-RDR-11: the new parenthesis agrees with §2.7's Terms — *a span's strip* is "the deck's plan between its two piers'
  inner faces without that margin" (l. 2614–2616) and *a held building's strip* "the strip of a `vault` span … widened
  all round by the meeting wall's strips' width" (l. 2640–2641); *the strip*, *the ends* and *the zone* each read
  `stripMarginM` (l. 2613–2617, 2633–2636). V11's E-V11-1 already names only "the widened strip, zone or ends" as the
  cell's meetings, so V11 and V12 now name the same readers.

## The sweep (R7-01 (2): V12 grepped for every restatement of a text changed here)

Searched V12 whole for: `wall.ungated`, ungated, "at no gate", "crossing a curtain", "crossings 0", `stripMarginM`,
"held building", "under-deck strip", "margin cell", "part 0", "part ≥ 1", `` `part` ``. Hits and why each stands:
* **l. 1128 and l. 1167** — the two texts changed here.
* **T-V12-38** (l. 3162): "`wall.*`, `gate.count` and `wall.ungated` equal those with its retaining walls deleted" — a
  test equality, not a restatement of the definition; its fixture's viaduct runs over two streets and no curtain lies
  under a deck, so the qualifier leaves its bar unchanged. It stands.
* **l. 2177** — the text changed here; `stripMarginM` appears nowhere else in V12.
* **§1's item-110 (f) conformance list** (l. 149), **§2.2's `part` field** (l. 350) and **item-110 entities paragraph**
  (l. 385), **`raised.junctions`** (l. 1194) and **T-V12-37** (l. 3161, "a way with `part` ≠ 0" in no P row's input):
  measurement shapes of item 110 (f) that law 1 (1) keeps; none states how a deck meets a curtain. They stand.

## Observation for the adjudicator (no block, no ruling request)

The P rows run under the `MFCG`, `FTG` and `VG` presets, which resolve every raised-way family off (V12 §3.4.4's *The
owner's later rules are invisible to every parity row*; V11 §3.24.0), so a P-row town holds no road deck. The fix
still matters: `wall.ungated` is also computed under the default preset, where raised ways are on (T-V12-38's fixture
CITY, descriptive runs), so the definition must state the part-0 reading for every input. This bears only on the grade
already decided; the FIX stands as ruled.

## HAND-OFFS

None new. VF7-RDR-01's base half is the scope unit's S12 END (adjudication-r7v Part H · scope), already routed there.

## Checks

* **Dry run** (`apply-blocks.py`, unchanged, on a copy of the live V12 with a copy of the live rationale, the block file
  as landed): 2 of 2 blocks applied, audit 2/2 OK, not OK 0 (the `=== FILE` routing line reported MALFORMED and
  skipped, as the router consumes it); headings 67 → 67; fences balanced 30 → 30; title block unchanged; PENDING FABLE
  REVIEW lines 1 → 1; rationale unchanged (byte-identical); output 3 560 → 3 561 lines (the reading rule's line split in
  two), sha256 3f20cb1fbf13…. A diff of the output against the live file shows only the three ruled spans (live
  l. 1129 → out l. 1129–1130, l. 1167 → 1168, l. 2177 → 2178).
* **Ids:** no id added or removed — T-V12 59 distinct / 206 occurrences, J-V12 106 / 213, X-V12 20 / 25, before and
  after. The new pointers resolve: §2.7's laws, law 1 (1), (3) (base l. 2699–2718), §5.3's gate row (l. 9938), and the
  Terms *a span's strip*, *a held building's strip*, *the strip*, *the ends*, *the zone* (l. 2613–2641).
* **Design text scans** over the changed lines: no review, ruling or probe id; no deferral wording; no narration.
* **doc_checks** (`--doc` the volume, `--heads docs/ARCHITECTURE.md`; WARNING printed: reference corpus INCOMPLETE —
  captures, research/patreon, research/devlogs, research/ftg-docs, research/external missing — results NOT
  authoritative, PROVISIONAL; exit 1 for the unreviewed C3 runs, as in every round): live → output C1 8/0 → 8/0, C2 0 →
  0, C3 141/127 → 142/128, C4 2/0 → 2/0, S1 0 → 0, S2 119/11 → 119/11 (seven S2 lines renumbered by the added line, no
  new hit). The one new C3 run, "1 1 3 5 3", is the ruled citation "law 1 (1), (3); §5.3's gate row": generic
  numbering, not reference wording, which cannot be reordered without changing the ruled text.

=== FILE docs/volumes/V12-calibration.md ===

=== REPLACE ### 3.4 The metric suite ===
### 3.4 The metric suite

**3.4.1 Two derived features for sources that lack them.** MFCG exports no blocks and no lanes; a corpus plate may show
buildings only. So that one definition runs on every source, `plat measure` derives, from footprints alone:
* **cluster blocks** — footprints whose rings lie within `g` of each other join one cluster (`g` = 1.0 m on a metric
  input, 2 % of the median footprint's short side on a relative one); a cluster block's outline is the union of its
  footprints closed by a dilation then erosion of 3 m (metric) or 10 % of that short side (relative);
* **the derived street graph** — inside the outermost curtain (or the built area's outline where there is none), the
  complement of the cluster blocks, reduced to its straight skeleton (§3.8), spurs shorter than 8 m (metric) or 40 % of
  the median short side (relative) pruned, nodes within 2 m merged.

A metric that reads blocks or lanes on MFCG reads these, and the same metric on our side reads the same derivation from
our footprints — never our true blocks — so the comparison is like with like (`blockc.*`, `sgd.*`); our true blocks and
ways feed the rows whose reference has them (J-V12.5).

**3.4.2 The catalogue.** Where the base defines a measure the row cites it; otherwise the definition here is the one
implementation's. `m` = metric scale needed, `f` = scale-free. Every wall row reads the enclosure of V12 §2.2 (item 106):
"inside the outermost curtain" means inside the outermost enclosure, "the curtain ring's area" is the enclosure's area,
along-curtain distances run along built stretches only and never across a closure edge (a condition run's end is no
stretch end), and a "main gate" is a gate of class `land` (a water gate, a harbour-mouth chain included, never counts).

**Default rules** (a row states its own value only where it differs; the registry holds the result):
* `absFloor` — shares, ratios and rank statistics 0.02; angles 1°; lengths 2 % and areas 5 % of the reference's median;
  densities (`perHa`, `perKm`) 5 % of it; counts 0.5; Moran's I and Spearman 0.05; entropies 0.05 bits; timings 5 %.
* `sign` — `any` for Moran's I, Spearman, `z` and signed angles; `positive` for everything else (a folded angle is positive).
* Distribution bins (`output.edges`; V12 §3.5.3's KS distance runs on the binned CDFs at these edges) — areas
  log-spaced, 24 bins over the metric's range (blocks 50 – 50 000 m²; buildings 10 – 2 000 m²; plots 20 – 5 000 m²) with an
  underflow and an overflow bin; run lengths 5 m bins to 400 m with overflow; nearest-neighbour distances and widths 0.25 m
  bins to 30 m with overflow.
* `tolerance` — `geo`, `model`, `trace` and `counts`: 1e-9 relative (the same code on the same input); `render`: 0.01
  absolute; the M-1 twin comparison of T-V12-3: 0.5 % relative or one unit of the last printed digit, whichever is larger.
* `stages` — the registered StageIds (§4.1) that produce the kinds the metric reads: ways S3, S4, S5a – S5d and S8; walls,
  towers, gates, the castle, closures and enclosures S3, S4, S5a – S5d; districts and squares S3, S6 – S7b; blocks S8 – S9;
  plots S8 – S10; buildings S10 – S11; the `water`, `river` and `pier` kinds S1 and S3; the `green`, `field` and `tree`
  kinds S12a – S12b; galleries and chambers the underground stages (II.7); retaining walls S10 – S11; raised parts, their
  supports and spans S4 – S6 (viaducts at S4, elevated roads and aqueducts at the end of S6, V11 §3.24). A `model` row
  names its stages where its input differs; a table's registry `readers` expand a group name (V11 §2.1) before any
  comparison, so a metric and a run always compare StageIds.
* `costMs` — measured: `plat build` writes each row's M1-measured cost per CITY town into the registry, and V12 §6
  budgets the sum; before M1 it is the §6 row's share.
* **Centroids** are area centroids for polygons and the point itself for points, in every metric; the red-team's R4 script
  used vertex means, which T-V12-6's R4 clause absorbs within its 0.02.

**Reading rules for item 110's entities** (item 447): every way graph (`junction.*`, `street.*`, `sgd.*`, V12 §3.6's
way-distance statistics) is built per part — nodes merge only within a part, parts join only at shared ramp-foot vertices
— so a viaduct passing over a ground node makes no junction; **a way of class `aqueduct` enters no way graph** and no
way-distance statistic, and no class-specific metric reads it; `wall.*`, `gate.count` and `wall.ungated` read `wall`
features only, never `retaining`; `wall.ungated` reads ways of `part` 0 only (§2.7's laws, law 1 (1)); `bldg.*`,
the cluster blocks, the derived street graph and `fg.*` read `building`
features only, never `raisedSupport`, `span` or `retaining`; no metric reads a `span`; deck buildings are buildings, and
the siting statistics read their `onDeck`; a stepped building's `heightM` is the top of its stack.

| metric id | input | scale | definition | reference(s) | row served |
|---|---|---|---|---|---|
| `street.turn100` | geo | m | ways other than alleys resampled at 10 m arc steps; turning = Σ \|Δheading\| between steps × 100 ÷ length; per seed the length-weighted median over ways ≥ 50 m | FTG; PLAT organic presets | §13.5 street turning |
| `street.stepHist` | geo | m | histogram of \|Δheading\| per 10 m step, 1° bins over 0–45° plus overflow; the cliff clause reads it | FTG (weakness) | street turning |
| `street.entropy50` | geo | m | Shannon entropy in bits of the heading change per 50 m window, 5° bins over 0–90° | FTG (weakness) | street turning |
| `street.drift600` | model | m | §4.4's net turn over 600 m of grown streets, organic regimes | — | growth drift |
| `junction.angles` | geo | f | nodes of degree ≥ 3 after merging nodes within 2 m; each arm's direction 10 m along it; angles between angularly consecutive arms; per seed median and p5 | NG; FTG | junction arm angles |
| `junction.share4` | geo | f | degree-4 nodes ÷ nodes of degree ≥ 3 | NG; FTG | junction arm angles |
| `street.runs` | geo | m | lengths of maximal paths between nodes of degree ≠ 2, per way class; per seed median per class | FTG | street runs by class |
| `bldg.r4.60`, `.120`, `.250` | geo | m | each building's axis = its longest ring edge's direction; z = e^{4iθ}; for 1 500 buildings sampled by the metric's stream (all if fewer), R4 = \|mean z\| over buildings whose centroids lie within r of the sample's centroid, samples with ≥ 5 such buildings; per seed median | MFCG | MFCG street signature |
| `bldg.wallAlign` | geo | m | buildings inside the outermost curtain, in bands 0–40, 40–100, 100–200 m from it: the angle between the building axis and the nearest curtain segment folded into [0°, 45°]; per band the median and the share ≤ 15° | MFCG | MFCG street signature |
| `sgd.tShare` | geo | f | on the derived street graph, degree-3 nodes with two arms within 20° of straight ÷ degree-3 nodes | MFCG | MFCG street signature |
| `sgd.deadEnds` | geo | m | degree-1 nodes of the derived street graph per km of its length | MFCG | MFCG street signature |
| `blockc.perHa` | geo | m | cluster blocks inside the outermost curtain per walled hectare | MFCG | MFCG street signature |
| `blockc.lotsPer` | geo | f | footprints per cluster block; per seed median | MFCG | MFCG street signature |
| `block.area` | geo | m (f as `block.areaRel`, ÷ median footprint area) | built blocks' areas per district; distribution | NG | blocks |
| `block.countTemplate` | counts | f | built blocks per hood per template at `medium` | NG (V01 T-V1-31) | blocks |
| `block.courtShare` | geo | f | deep blocks — largest inscribed circle's radius > 1.5 × the median footprint's short side — holding an unbuilt interior component (the block less its footprints dilated by 5 % of that short side) of area ≥ 0.5 × the median footprint area that touches no block edge ÷ deep blocks | NG; MFCG | deep block interiors |
| `cut.sigma`, `cut.cornerMid`, `cut.arrival85`, `cut.fillet` | trace | f | §4.6's recorded-frame measures on S8's cut log | NG | bent-cut signature |
| `fg.recoverability` | render | f | §8.5's metric on the city band at the matched scale | MFCG | figure-ground and streetwall |
| `fg.coverWalled` | geo | f | Σ area of footprints whose centroid is inside the outermost curtain ÷ the curtain ring's area | MFCG (descriptive) | figure-ground and streetwall |
| `fg.streetwall` | geo | f | on dense frontages, the share of cluster-block outline length within 0.5 m (metric) or 2 % of the median short side (relative) of a footprint edge | MFCG | figure-ground and streetwall |
| `bldg.area` | geo | m | footprint areas (ours: residential families; references: all buildings); per seed median and p95 | FTG; MFCG (descriptive) | plots and footprints |
| `bldg.quadSide`, `bldg.worstCorner` | geo | m / f | four-vertex footprints' median side; per footprint the largest \|corner − 90°\|, per seed p95 | FTG | plots and footprints |
| `plot.area` | model | m | L3 plot areas per class and band | — | plots and footprints |
| `bldg.partyShare`, `bldg.attached` | geo | f | per footprint the share of its perimeter within 0.3 m (relative: 1 % of its short side) of another footprint's edge, per class median; the share of footprints with any | NG; FTG (descriptive) | party walls and attachment |
| `plot.spearman`, `plot.moran`, `plot.cvDistrict` | model (NG's plots: geo) | f | Spearman(prosperity, plot area); Moran's I of plot area on the shared-edge adjacency graph with unit weights; within-district CV, districts ≥ 30 plots | NG (weakness) | plot-area gradient |
| `alley.gradient` | model | f | Spearman of alley length per hectare against prosperity decile | FTG (weakness) | alleys |
| `walled.share`, `ribbon.share` | geo | f / m | buildings whose centroid is inside the outermost curtain ÷ all; extramural buildings within 100 m of an arterial ÷ extramural buildings | MFCG | walled share and ribbons |
| `district.area`, `plaza.area`, `castle.area`, `castle.compact` | geo | m / f | per district hectares (per seed median); the principal square's hectares; the castle's hectares; 4πA ÷ P² | MFCG | MFCG anchors |
| `wall.nodeSpacing` | geo | m | along-curtain distance between consecutive wall nodes — towers, gates and vertices where the curtain turns ≥ 10° — p50 | MFCG | MFCG anchors |
| `quarter.count` | geo (references: district features) / model (ours: quarter labels at the city band) | f | the count | MFCG | MFCG anchors; labels |
| `outline.r90cv`, `outline.roadRatio` | geo | f | 36 sectors of 10° about the centre; r90 = the 90th percentile of building-centroid distances in a sector (sectors ≥ 5 buildings); CV of r90 over sectors; mean r90 of sectors whose middle bearing lies within 5° of an arterial's outward bearing where it leaves the built area ÷ the other sectors' mean | FTG | outline anisotropy |
| `usemix.resOnly`, `usemix.entropy`, `usemix.liveIn` | model | f | §13.7's block-level use-mix definitions | — | block-level use mix |
| `wall.towerSpacing`, `wall.ungated`, `gate.count` | geo | m / f / f | along-curtain spacing of consecutive towers, p50; arterial ways on ground part 0 crossing a curtain at no gate (a way's `part` ≥ 1 never counted: a deck passing over a curtain is no crossing, §2.7's laws, law 1 (1), (3); §5.3's gate row); main gates of the outermost curtain | FTG; MFCG | towers and gates |
| `water.step`, `water.riverWidth` | geo | m | median vertex spacing of water outlines after dropping vertices turning < 1°; the median river width | FTG; MFCG (descriptive) | water |
| `tree.nnP1`, `tree.nnMedian`, `tree.pcf` | geo | m | nearest-neighbour distances of tree points; the pair-correlation function at 1 … 20 m (Stoyan and Stoyan's estimator, §17.1 (8)) | FTG (weakness); the sampler | tree scatter |
| `pop.perBuilding` | geo / model | f | population ÷ buildings | MFCG (weakness); FTG | population and buildings |
| `time.model`, `time.firstMap`, `time.worst` | timing | — | §12's measures in the timing phase, ÷ the calibration score ratio (§12.1), at every rung (item 119 (f)) | MFCG; FTG; NG | generation time; MFCG-worst configurations; §12's targets |
| `wait.generate`, `.regenerate`, `.openFromSF`, `.dossierChange`, `.advanceTime`, `.historyReplay`, `.export`, `.migrate`; `wait.progressMs` | timing | — | item 119's one-time waits, click to complete result — `advanceTime` the whole advance and `historyReplay` the replay with the peak's generation before it, each in total (item 119 (a2)) — on the reference hardware (§12.1), and the time from the click to the first progress frame (V12 §3.15.9) | — (ours) | item 119 (f) |
| `time.findSuggest`, `time.findGlow` | timing | — | item 120 (j)'s interaction times at the METROPOLIS cap on V09's app harness: a key in Find's box to its suggestions drawn; a chip's click to its matches' glow drawn, and a drawn week's frame (one that is not the head) drawn to its chips' re-evaluated glow drawn (from the later of M5 and V06's E6) | — (ours) | item 120 (k): §12.5's overlay budget (V12 §3.15.10) |
| `delivery.tier`, `ladder.use`, `vacancy.share`, `quay.reach`, `residue.share`, `entrance.frontage`, `hidden.share`, `wealth.*` | model | — | from the core statistics record and the report (§13.2, §5.4) | — / FTG descriptive | the C rows of §13.5 |
| `draw.*`, `label.*` | render / model | — | §8.3's census; §9.4's checks | MFCG; NG | draw style; labels |
| `variety.dispersion` | geo | f | §7.7's signature vector per town, computed from the input where the source has the kinds; standardised by the rung's pooled deviations; mean pairwise Euclidean distance over the seeds | MFCG; FTG (floors) | between-seed variety |
| `market.secondary`, `market.adjacent` | geo | f | market squares beyond the first per town; market-square pairs sharing an edge | MFCG | markets |
| `palette.paperLuma`, `.paperWarmth`, `.inkLuma`, `.inkWarmth`, `.plateChroma` | render | — | §8.2's definitions on §8.2's measurement render | item 69 (owner-set targets) | §13.4 palette bar |
| `fm.*` | counts | f | one metric per row of V02 T-V2-31's table and its plan-extent clause, as V02 states them (nine rows — family shares, path segments, blocks, towers, square towers, dormers per segment, porches, half-round porches, entrances — and the plan extent in wing widths) | FM | V02 §7.4 |
| `vg.*` | geo / counts / timing | per V07 | V07 §7's parity metrics | VG | V07 §7 |
| `siting.<spec>` | model (corpus: geo with `use`) | m / f | the correlation harness's placement statistic for one `NullModelSpec` (V12 §3.6); its bar's verdict statistic is `bar.<spec id>` | the corpus at M-CAL | T71-3; file g's bars |
| `bar.<barId>` | model | f | the verdict statistic of one registered owner bar, generated per registration, no band (V12 §2.1) | — (ours) | the register's entries (V12 §3.11; V02 §3.10.10, V06 §8, V11 §8) |
| `frame.<table>.<column>` | geo | per its target metrics | a declared frame's value for one calibratable column; `notApplicable` until its corpus run (V12 §2.1) | the corpus | the register's `corpus` entries |
| `wall.barrierShare` | geo | f | closure edge length ÷ the enclosure's perimeter; a town without a curtain is `notApplicable` | MFCG (descriptive: its shore closures); the corpus | item 106's use of natural barriers |
| `wall.condition` | model | m | per enceinte, run length by condition (`standing`, `worn`, `patched`, `breached`, `dismantled`) and by material (robust or a patch row), with each run's epoch of last change (§2.7, items 575, 114) | — (ours) | item 114 (g) |
| `grid.r4`, `grid.axis` | geo | f / deg | inside a region (for a paired bar the ruin's outline, V12 §3.6b; otherwise the enclosure), ways or galleries resampled at 10 m steps; z = e^{4iθ} per step weighted by its length ℓ; R = \|Σ ℓ z\| ÷ Σ ℓ; axis = arg(Σ ℓ z) ÷ 4 folded into [0°, 90°); fewer than 20 steps → `notApplicable` | — (ours: a ruin against the town above) | item 109 (c)'s distinctness bar |
| `ruin.blockArea` | geo (underground profile) | m | the faces of the gallery graph — every gallery in every state, nodes within 2 m merged — inside the system's outline, median area; no face → `notApplicable`; the town side: `block.area`'s built blocks inside the same outline dilated by 25 m steps (at most 100 m) until it holds ≥ 5 blocks, else `notApplicable` | — | item 109 (c)'s distinctness bar |
| `plan.rightAngle`, `plan.straight` | geo (underground profile) | f | on every chamber outline and every gallery's two wall lines (its centreline offset by half its width), vertices turning < 1° dropped: the share of the remaining vertices whose turn lies within 5° of ±90°; the share of wall length in straight runs ≥ 4 m (a run keeps within 2° of its first segment's direction) | — (a ruin against a cavern) | item 109 (i)'s structure test |
| `void.*`, `link.*`, `ladder.members` | model | — | per cavern or ruin system: present by kind, accessible through open links (directly or through linked systems, items 109 (j) (3), (3b), 113 (e)), its access state (open or LOST), buildings over it (footprints whose base lies within `DigRule.reachM` above one of its chambers or galleries); per deep void (a connected component of a system's parts of positive area whose tops lie deeper than `DigRule.reachM` below every footprint over them): whether an access reaches it; per undercity: its first void source; per derived supply link (item 105 (a)): way distance, the good's `comfortM`, within comfort; per chain instance: flow order and spread; a collective record's member count | — | V12 §2.7b's indicators: items 104 (h) (8), 105 (k), 107 (g), 108 (f), 109 (i)–(j), 113 (e) |
| `crypt.present`, `crypt.areaM2`, `crypt.rank`, `crypt.joined` | model | f / m / f / f | per building of a church class (V11's crypt column `always` or `basement`): whether it holds `Basement.crypt` (V03), per class the share; each crypt's floor area; the rank of the cathedral's (or great temple's) crypt by area, 1 wherever one stands; whether a (3b) link joins the crypt to a catacomb complex (V04's `cryptJoin`) | — | item 109 (k) (2): V11's T-V11-25, V04's T-V4-50 |
| `catacomb.count`, `catacomb.source`, `catacomb.rank` | model | f | complexes per settlement; each complex's source kind (V04's `CatacombComplex.source.kind`); whether the largest by `extentFloorM2` lies under the cemetery serving the most burials | — | item 109 (k) (3): V04's T-V4-50, V06's T-V6-40 |
| `catacomb.extentM2`, `catacomb.fill`, `catacomb.blockedBy`, `catacomb.growthM2` | model | m / f / — / m | per complex keyed by its id (its source lineage, V04 §3.5.1): `extentFloorM2`, the high-water extent over every gallery and chamber in every closure state — silted, caved-in and sealed parts included, the author-deleted area excluded (J-V4.56); its ossuary `fill` in [0, 1]; its `blockedBy` reasons; the area added at a step, with its cap `max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2)` (V04 §2.3's `CatacombRule`, read per year, J-V6.53) | — | item 109 (k) (4)–(6): V04's T-V4-51, T-V4-52; V06's T-V6-38, T-V6-39 |
| `raised.count`, `raised.generatedBelowCity`, `raised.reasonMissing`, `raised.overCap` | model | f | raised ways by kind × source; generated ways whose founding epoch's rung was below CITY — the rung of the `EpochRecord` of the epoch whose event created the way (item 244 stores none), `source` `generated` only, so a declared way never counts and a way carried down from a city epoch counts by that epoch's rung; generated ways without a recorded reason and its why rows; generated foundings made while the kind's generated, suppressed and declared ways already reach its cap (V06 §3.19.1 (1)–(2)) — the last three 0 by rule | — (ours only, descriptive and C) | item 110 (b), (f): the guards (V12 §3.7.4) |
| `raised.junctions` | geo | f | nodes of degree ≥ 3 joining a part ≥ 1 to part 0 anywhere but a ramp foot; 0 by rule | — | item 110 (f) |
| `retaining.lengthM`, `retaining.onFlatM` | model | m | retaining-wall length by source; generated wall length whose both sides lie below `terrace.slopeMin` — 0 by §13.2's T110-1, reported in the nightly statistics, never a harness row | — | item 110 (a), (f) |
| `deck.buildings`, `tier.count` | geo / model | f | buildings with `onDeck` by deck kind; per stepped building its tier count | — | item 110 (c), (d) |
| `crossing.kinds` | model | f | (J-V12.64) per way class, the crossings of a retaining wall by kind — ramp or stair — and the count of `W_STEEP_RAMP` reports (V11 §3.24.5); stages S4, S5a – S5d, S9 and the levelling | — (ours only, descriptive) | the `ways.crossing` register line (V12 §3.11); the M4-110 group's report |
| `water.needRatio` | model | f | per town at the aqueduct reason's test: the demand D, the supply S and `needRatio` (V11 §3.24.6), and whether an aqueduct is a candidate — by the base's own water-balance function over the town's recorded inputs, never a second implementation; stage S6 | — (ours only, descriptive) | the `water` and `climate` register lines; V11's T-V11-33 |
| `water.kinds`, `water.walkShare`, `water.distByBand` | model | f / f / m | the waters a site draws by kind (river, lake, coast, oasis) and source (generated, drawn, dossier); per town the share of households whose plot lies within the water-supply family's walking radius (V11) of water — a river bank, a lake or oasis shore, a spring, a well or a public fountain; per town and prosperity band the households' mean way distance to reliable water (§4.5's water term's targets) | — (ours) | item 111 (d) (V12 §3.15.1) |
| `ruin.survival` | model | f | per ruin system and persistence class (V04's `PersistenceClass`): the share of its laid elements standing — in no collapsed or filled closure state (§2.7) — beside V11 §3.23.5's share aged by V04's law at the ruin's age and cover; the underground stages (II.7) | — (ours only, descriptive) | the `under.ruin` `survival` register line; the V4-U5 panel's report |
| `shade.gap` | model | — | item 102 (g): the mean prosperity of sunlit minus shaded plots within districts holding both; descriptive — V05's island fixture and V06's drift fixture read it as their fixture bars | — | item 102 (g) |
| `bldg.grandeur` | model | f | per rung, the dwellings holding an `H` or `U` plan, a court, a tower, a turret or a gatehouse; the manor-class dwellings with their cause (a lord, a dossier record, a hand edit) | — (ours) | item 115 (f) (V12 §3.15.5) |
| `view.limitStop` | model | f | per map and viewport, the zoom-out limit's stop (§8.8), whether the whole `bounds` fits the viewport's short side there, or, where no stop fits them, whether the limit is stop 0 (J122), and the count of reachable stops beyond it (0 by rule) | — (ours) | item 116 (e) (V12 §3.15.6) |
| `season.crownColours`, `season.leafCover`, `season.iceOrder`, `season.iceSnow`, `time.reskin` | render / timing | f / f / — / f / — | at a week of the year: the distinct crown colours drawn among deciduous trees; the share of ground, street, green and roof area drawn under leaf cover; per water kind the first week it is drawn frozen; any ice or snow drawn (a count); the re-skin time of cached tiles at a season switch (§12.5) | — (ours) | item 117 (i) (V12 §3.15.7) |
| `festival.weeks`, `festival.kinds`, `festival.stage`, `festival.blocked` | render / model | — / f / — / f | the weeks a festival's decorations draw; the decoration kinds drawn, by tier; the place its staging landed on and how (named, keyed, fallback); decorations over a gate's passage or a label keep-out (0 by rule) | — (ours) | item 118 (h) (V12 §3.15.8) |
| `find.matches`, `find.leaks`, `find.held`, `find.pins`, `find.cues` | model (the overlay provider's match set and §11.2's rows) / render (pins, bubbles and cues as drawn) | f | on V09's app harness, per chip of a Find fixture's chip set at a view key: the entities Find draws against the gazetteer query's rows at that key, mismatches counted; under a player view on the knowledge canary fixture, the suggestions, counts, glows, pins, ghost pins, gap outlines and legend chips naming a withheld entity; over a step script of band and layer changes, commits — one removing a chip's last match among them —, an advance, an undo, a redo, a regenerate, a save and load and a migration, the steps whose chip set changed or whose matches differ from a fresh evaluation there, and a chip whose last match went counted unless it stays at count 0, dark; at the city band's stops, the matches with neither a pin nor a count bubble; the chips without their own second cue — each 0 by rule | — (ours) | item 120 (k) (V12 §3.15.10) |
| `resolution.changes`, `resolution.p95` | timing | — | on V09's app harness under Auto (V12 §3.15.11): over a scripted session of pans, zooms and drags with a settle after each, on the fixture loaded at its threshold, the level changes applied during a gesture and the most applied in any 10 s window (counts); Auto's rolling frame-time p95 (ms) over §12.5's reference viewports on the reference and low-end devices, against the tier's frame budget (§12.5) | — (ours) | item 121 (h): T121-2, T121-3 (V12 §3.15.11) |
| `resolution.textPx`, `resolution.ultra4k` | render / timing | f | at each level — Auto's rungs and each manual level — on a device fixture of pixel ratio 2, the pixels of the label glyphs and halos, the chrome and the overlay marks inside their boxes that differ from the same view drawn at the device's ratio, in V09's captures (0 by rule); on an ultra-tier device fixture holding a native-4K view lit at full precision over §12.5's reference viewports, a vector: the canvas memory §12.8's measurement reads ÷ the tier's 512 MB ceiling (≤ 1), and the light rungs given up (0) | — (ours) | T121-5, T121-8 (V12 §3.15.11) |
| `crisis.weeks`, `crisis.stable`, `crisis.scale`, `crisis.blocked`, `crisis.share` | render / model (DR44's standing looks and §10.2's placement) | f | on the crisis fixtures (V12 §3.15.12): per look, the weeks it draws against its condition's [`sinceWeek`, `untilWeek`) (§2.7), mismatched weeks counted, and, under a player view, any look drawn for a `none`-row condition carried beside the looks counted as a mismatched week, and each look-bearing condition's look drawn in its weeks at every key (`public`, DR44); per seed, the look's tiles in the view against a picture export at the same stop and against a second open of the document, differing tiles counted; over a rung sweep at one severity and a severity sweep (0, ¼, ½, ¾, 1) at each rung, the steps at which a look's drawn extent — its camped ground in m² at a camp place, else the share of its place's units (§10.2 (c)) — falls, and, its second count, at each rung and at severities 0, ½ and 1, each look §10.2 (c) sizes by severity (no headcount and no count given; every preview among them) whose camped ground, the ring remainder counted at §8.8's ring density, differs from its row's `scale` at that severity (linear between its two ends) by more than 5 %, or whose units differ in number from the count §10.2 (c) gives that share of its place's units — for the `disaster` look V01 §3.16 `disasterSource` (5)'s, max(k, \|`matched`\|) with k that count, or every unit of a fire order shorter than that, its shortfall reported and not counted; look marks on water, a gate's passage or a label's keep-out, and on a way's carriageway any mark save a barrier across it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d)); on a week standing several camp looks, a camp look holding outskirts land owed to a look before it in `priority` order (ties by condition id) — a face that look's place ranks while it spills onto the ring, or any outskirts face while it spills at the cap — and the camped land past `densityCap` of the outskirts' free land, in m² (§10.2 (e)) — each 0 by rule | — (ours) | item 122 (g): T122-2, T122-3, T122-5, T122-6 (V12 §3.15.12) |
| `time.crisisReskin`, `crisis.rasterShare` | timing | — / f | in §12.1's timing phase on the golden views of every family at every rung with the crisis fixtures (V12 §3.15.12): the re-skin time of the visible tiles at a change of the crisis display and at the drawn week crossing a condition's edge, against §12.5's settle bound; the looks' share of a tile's raster time, against §12.5's 20 % | — (ours) | §12.10's R12-37 (V12 §3.15.12) |
| `crisis.areaPerHead`, `crisis.coalition`, `crisis.framing`, `crisis.ring` | model (§10.2's placement, §2.9's crisis framing) / render (the ring's arcs) | f | on the force fixtures (V12 §3.15.12): per army or group with a dossier headcount h, its camped ground — its camp's faces, plus any remainder on the ring at §8.8's ring density — ÷ (h × `areaPerHeadM2`), within [0.9, 1.1]; a coalition of two armies of h heads against one army of h, the ratio of their camped ground, within [1.8, 2.2]; while a look stands, the camps outside the opening view, outside Fit's view and beyond the limit's view, and once none stands the stops by which the limit differs from item 116's and the moved views re-framed — each 0 by rule; per force too large for the frame and its margin, a remainder with no arc on the ring at the city band, and any change of the frame, the margin, the model digest or the hash — 0 | — (ours) | item 122 (h)–(i) (V12 §3.15.12) |
| `damage.nested`, `damage.breakLevel` | model (each plan element's §6.3 threshold against the building's decay level, §2.6 step 7) | f | on V03 §7's damage fixtures (V12 §3.15.13): per building at the levels 0, 0.05, …, 1 and, from M6-E, at every week of V06's decay runs, the elements damaged at a level or a week and undamaged at a higher level or a later week of the same run (0 by rule); per element, the lowest sweep level at which it shows damaged, compared across a regeneration from the same seed, a save and load, an undo and redo of an unrelated edit and a migration, differing elements counted (0) | — (ours) | item 123 (f): T123-2, T123-3 (V12 §3.15.13) |
| `weather.frameMs`, `weather.snow`, `weather.aridRain`, `weather.cover`, `weather.luma`, `weather.replay` | timing / render / model (the weather timeline's spells) | ms / f / share / f / share / f | on V09's app harness (V12 §3.15.14): the effects layer's frame time at the densest spell of each kind over §12.5's reference viewport on the reference and low-end devices, p95; over all 52 weeks of every `arid` climate row and every row whose winter does not freeze, the frames drawing a falling-snow mark and the tiles drawing lying snow (0 by rule); per `arid` row and week band, the timeline's rain-spell frequency over a simulated session clock against the row's weather column (within three standard errors), and its rain spells in the row's dry weeks (0); the label, halo, chrome and overlay pixels a spell changes (0 by rule); the view's mean relative luminance per frame through each spell's life, its largest change in any one second against §8.4 (i)'s photosensitivity limit, flashes counted (0); two timelines from one session seed, clock and set of presses, with the climate row, year position, sites, `light` mode and view hour in force at each moment and T124-9's three fixtures among the runs, spells differing in kind, start or length (0) | — (ours) | item 124 (i): T124-2 – T124-4, T124-6, T124-7, T124-9 (V12 §3.15.14) |
| `port.fallbacks` | model (the generation report) | f | on the required-keys dossier at every rung (V12 §3.15.15): the fields V08's field table lists as read that the dossier lacks, each without a report line naming the fallback taken, and the stages that end with no output — both 0 by rule | — (ours) | item 125 (e): T125-1 (V12 §3.15.15) |
| `layout.touch`, `layout.belowMedium` | render (V09's app harness: its layout and frame captures) | f | at the medium class's minimum, 600 × 480 CSS px, the tools of V09 §4.12's list whose canvas script fails to complete under touch events with `AppPrefs.touch.editFabric` on (V09 §4.12; §13.4's fallback changes only its default); over the resize script, the steps below 600 × 480 at which the map's layout is not the medium layout at its minimum, a tool is withheld or greyed, or the page does not scroll to every part — each 0 by rule | — (ours) | item 126 (e): T126-1, T126-2 (V12 §3.15.16) |
| `street.detour` | geo | m | over 200 node pairs per town drawn by the metric's stream among degree-≥ 3 nodes at least 100 m apart, the way-graph distance ÷ the straight distance; per seed median | NG (§16 M-1's IMPROVEMENTS §7.2 rows) | detour index ⟨M-1⟩ |
| `street.cyclesPerKm2` | geo | m | independent cycles of the way graph (edges − nodes + components) per km² of the built outline | NG | cycles per km² ⟨M-1⟩ |
| `plot.minWidth` | geo (NG's plots) / model (ours) | m | per plot the width of its minimum-width enclosing rectangle (rotating calipers, §17.1 (8)); distribution | NG | plot minimum width ⟨M-1⟩ |
| `fg.streetwallGap100` | geo | m | along dense frontages (as `fg.streetwall`), gaps longer than 2 m per 100 m of frontage | NG | streetwall gap ⟨M-1⟩ |
| `bldg.pairing` | geo | f | the share of footprints sharing ≥ 50 % of one edge with exactly one neighbour whose area lies within ± 25 % of theirs | NG (CONFIDENCE §6 #10) | adjacent-footprint pairing ⟨M-1⟩ |
| `draw.contrast`, `draw.hairline` | render | — | §8.2's contrast matrix and §8.3's hairline fidelity on §8.2's measurement render | — (our floors) | the M1 exit's contrast matrix and hairline fidelity |
| `ftg.ringBlock` | geo | m | areas of the faces FTG's ways close inside a ring, from ways alone; distribution | FTG (descriptive) | FTG face recovery (descriptive); plot depth, frontage and plot share withdrawn by item 49 ("the client receives none"), each a `known-defects.json` note |

**3.4.3 Metric versions.** A definition change is a major version: every baseline of that metric is re-measured through
`plat measure` at the new version and re-crossed as superseding rows, and the version change enters the next shift record
as a `baselineShift` (a gate that flips is declared, §13.5). Two versions of one metric never gate in one report: the
report reads the rows whose `metricVersion` equals the running registry's.

**3.4.4 The matrix — which reference gates which rung.**

| reference and pinned build | our setting | rungs | what gates (role as §13.5 or the volume states) | tier |
|---|---|---|---|---|
| MFCG 12710731 | the matched population (V12 §3.5.5), water `none`, parity preset `MFCG` for P rows; stress rows at `coast+river` | TOWN (size 40), CITY (80), METROPOLIS (130) | street signature, walled and ribbon shares, anchors, gates, recoverability and streetwall ⟨M-1⟩, markets ⟨M-1⟩, draw style (`ink`), labels (weakness), variety (floor); cover, footprints and time descriptive | nightly; milestone |
| FTG (server of each capture, request hash) | each capture's recorded population and water setting (§13.6 (2)), parity preset `FTG` | TOWN (BIG_TOWN), CITY (BIG_CITY); METROPOLIS none (D-31; J122) | turning, junctions, runs, footprints, outline, towers and gates, water, trees (weakness), time (weakness), variety (floor); population and wealth descriptive | nightly; milestone |
| NG 1.2.2 (itch 11441280) | the base's bent cut on the same face shapes (M0, M1); a district opened at neighbourhood LOD (M5, §13.6 (2)'s search) | the neighbourhood band | bent-cut signature, junction angles (organic), blocks and template counts, court share, party walls, Moran (weakness), hood time | M0 spike; nightly from M1; M5 |
| VG 1.6.9 (19365073) | V07's settings under the `VG` preset | THORP, HAMLET, VILLAGE | V07 §7's rows | V07's tiers from V-M4 |
| Fantasy Manor (build 890) | the free frame, `FM` preset | the building band | V02 T-V2-31 | V02's tiers from M6c |
| Dwellings (itch 17195045) | the plan rung | — | nothing: research-side notes (V03 §7) | — |
| the corpus (M-CAL) | per sample frame, the historical pack | the rungs its frames cover | corpus *target* rows gate the historical pack only; under the default they are descriptive until the pack is adopted for that frame (V12 §3.10.3 R2) | M-CAL; nightly after |

**The owner's later rules are invisible to every parity row** (item 23; J-V12.54). No measured reference builds retaining
walls, raises a way or builds on a mole, pier or deck (0 of 48 research inputs mention any,
`docs/validation/bench/v12_rev_item110_grep.out`; "terrace" there means row-house frontages, and FTG's moles and piers are
stored as edges with no recorded buildings — the FTG coverage audit's H17, H18). Item 110's families are extensions: 
V11 §3.24.0's switch table resolves them off in `presets.MFCG`, `presets.FTG` and `VG` (T-V11-21), `NG` resolving them as
`MFCG` does (V01 §3.15), and `presets.FM` resolves the stepped and deck families off, so every P row measures towns and
buildings without them; in the default preset they are on, and their metrics are ours only — descriptive or C, never a
§13.5 row. Items 111 and 113's extensions resolve off in the parity presets the same way (the oasis chance and the water
pull by §7.6's zeroing; `history.replay` false, §4.11), item 114's wall conditions are no measurement input (V12 §2.2),
and items 117, 118 and 122 are looks, item 120 a view and item 123's damage layer a drawing (no measurement input, the
model storing none): every `render` metric and panel render draws at the standalone default view — midsummer,
decorations off, Find off, crises `off`, `cvdVariant` `none` — whatever a document's view state holds, never draws item
124's weather effects and never reads item 121's Resolution setting (V12 §3.16.2 lists every feature a preset meets). V06's growth parity (a history's raised-way prevalence within
± 15 % of the one-click city's) compares ours with ours and stays V06's.
=== END ===

=== REPLACE ### 3.11 The calibration register — no provisional number dangles ===
### 3.11 The calibration register — no provisional number dangles

**Entries.** One per provisional number: every §13.7 letter (owner `base`); every §13.5 row whose fallback moves a
mechanism; §1.1's rung modifiers; every volume's calibrate-later model constant (never an application or engineering
constant, *The provisional-number lint* below) — written, with its default, its measurement (its metric ids), its due
milestone and its fallback, by the seat that lands that volume's milestone, `owner` naming the volume — from a named
register line, else from the default line below; the siting weights files g items 103–108 mark "general historical
knowledge, not corpus-witnessed" (`method: 'corpus'`, due M-CAL); the thresholds of V12 §3.6b's rules (owner `V12`, §13.7
rows by item 501); and each owner strip pick (`owner-set`).

**The default line** (J-V12.71). A calibratable column (V11's `ColumnSpec`) of a registry table (V11 §3.1) that no register
line names — this section's lines with their catch-all, V11 §8's non-g lines, V02 §3.10.10's, V06 §8's, V07's one
`rules.race.densityPower@VG` entry (V07 §3.15), or a line a volume writes in V02 §3.10.10's form (in its own §8, or beside
its table as V03 §2.4 does for `roomProgram.json`, J-V3.118) — takes its one entry from this line, so no landing seat
invents a method, a metric or a fallback: id `cal.<table>.*.<column>`; `target.column` with `rows` absent; `owner` the
document whose source file holds the column's cells when the entry is written — the source manifest's author seat for that
file (V11 §3.2.1 step 1), as its volume, or `base` for a base section's seat — and, where two documents' files hold them,
the first the table's `rowsHome` names (V11 §2.1); a document that writes the column's cells later never moves it
(J-V12.73); `method: 'corpus'`; `due` M-CAL — or, for a column whose first compiled cell lands after M-CAL's
`ReconciliationRecord` is committed, the later run that takes its layer by *The due's corpus run* below (J-V12.75);
`metric` [`frame.<table>.<column>`]; `fallback` { mechanism: "at its due corpus run the run that targets the column moves
it under V12 §3.10's rules; a column no frame's run targets closes `fixed` with 'no admissible frame'", `notAchieved: false`
}; `line: 'default'`. The seat that lands the column's first compiled cell writes it in the same change with `plat calibrate
register --defaults --milestone <id>` (the landing change's milestone in V12 §2.8's form), after its named lines' entries:
the command writes this entry for every calibratable column that holds at least one compiled cell and has no entry — a
column of an empty table (V11 §2.1: every registry row ships as its schema's empty table until its rows-home milestone)
takes none until the change that ships its first row — in table-id then column order, never touches an existing entry
except to append the moved-value or rows-added row below, is idempotent, and lists the ids it wrote or appended to in the
register report (V12 §5.2). This floor is no measurement plan: its corpus run moves no owner-stamped cell or gate and no
value below an owner-stamped minimum (V12 §3.10.3 R6), and it binds no key, law, enumeration, switch, word list or
dossier row set (V11 marks those non-calibratable). It binds, among others, volume 1's `hood.*` default rows; V11's
`raisedWays.structure.clearWidthM` and `.squareDeg` (§4.3's crossing cells); volume 3's
`roomProgram.json` columns its V03 §2.4 lines leave (PE's cells among them; J-V3.118); V04 §2.3's rule-table columns
no line below names; V05 §2.4's values, its `IslandRule` cells `accessSiting.deckGapM` and `lineClearM` among them
(V05's own, calibrate-later, never V11 rows; J-VI.17 H29); V07 §2.2's and V07 §2.2a's numeric cells other than its one `VG`
entry — the `FarmTable` village rows among them, while `territory.haPerHead`, derived as their sum, takes no entry (E-38;
V07 §3.9 (1)); and the calibratable look rows of item 117 (V11's season, leaf and leaf-cover rows, registry rows 98–101: their
densities and week bands). Volume 8's dossier row sets and volumes 9's and 10's tables take none — every column of V11 §3.1 rows 63–66
and 86–89 is `calibratable: false` (J-V11.65, J-V11.81). **A later line** for a column the default line bound — a volume
whose bars confirm the column before its corpus run writes it in V02 §3.10.10's form and registers the bars it names —
restates that one entry in place while it is `provisional` (after its corpus run only under a new major table version,
V12 §4.2): the same id, the line's `owner`, method, metric, due and fallback, `line` dropped, a cells row appended with the
column's value and the restating milestone; never a second entry.

**The due's corpus run** (J-V12.75, J-V12.78). `--milestone <id>` is required: `--defaults` without it refuses, writing
nothing and naming the flag, and a volume's short citation of the command runs with it. `<id>` is the landing change's
milestone in V12 §2.8's form (`M1`, `M2b`, `M3a`, `M3a-V2`, `M5`, `V-M0`, `V-M2u`, `V3-P1`, `V4-U3b`, `V5-P2`, `V6-E2` …); an
id that is neither one of §16's ids nor volume-qualified by V12 §2.8's rule — a bare `P1` — is refused, naming the form.
`--defaults --milestone <id>` writes each entry's first history row `{ date, value: the column's compiled cells by row key,
milestone: <id>, cells: true }` and its `due` from that milestone: `M-CAL` while no M-CAL `ReconciliationRecord` is
committed; once one is, the later run that takes the landing milestone's layer:

| the landing milestone | `due` once M-CAL's record is committed |
|---|---|
| M6-U and `V4-U0` – `V4-U5` (`V4-U3b` among them); `V-M2u` | `M-CAL/under` |
| M6-sky and `V5-P0` – `V5-P6` | `M-CAL/sky` |
| M6-E and `V6-E0` – `V6-E9` | `M-CAL/evolution` |
| M6-P and `V3-P0` – `V3-P6` (PE is built inside M2b and M3a and lands under their ids) | `M-CAL/M6-P` |
| any other milestone | `M-CAL/<that milestone's id>` |

The same substitution holds on every named line: a line's `corpus` stage or due at M-CAL, on a column whose first compiled
cell lands after M-CAL's record is committed, falls at that column's run by this table, and the seat landing the column
writes that due. A column landing before M-CAL's record stays due at M-CAL.

**A value moved by its owning seat before its due** (J-V12.77). (1) *When.* The seat that owns a calibratable column (its
entry's `owner`) whose entry carries `line: 'default'`, is `provisional` and is not yet due — no `ReconciliationRecord` of
its `due` is committed — may change the column's compiled cells in its table's source outside any run (V12 §3.7), only when
the change's golden check (§6.4's stage-isolated digests at PR tier, over the main set, the no-op pins' sets and the
known-city fixtures') finds no digest of a golden committed before the change moved by the new value — a column a
committed stage already reads may so move where no golden's digest depends on the moved cells (`terrace.siteShare`, read
from M3a by `terraceState` for the base's district-edge source, V01 §8.1, BCR-V1-42, matters only where an authored
`terrace` site primitive covers a district); a reader stage the same change lands records its first golden, or its
feature's declared shift, with the moved value. Volume 1's M5 tunings are the case (V01 §8.1): `land.spineFactor`,
`land.ringSlack`, `land.smallShare`, `terrace.askGain`, `terrace.siteShare` and `ng.plazaM2` of `hood.constants` (entries
written at M1) and S7c's `select.*` weights of `hood.templates` (written at M3a), each tuned to that volume's own acceptance
bars inside the work item that lands its reader, before M5's exit. **Held:** should the golden check find a committed
digest moved by such a tuning, the tuning is not landed — the cell keeps its landed value, the change records the hold
with `plat calibrate register --hold <entry id> --milestone <id>` (one row `{ date, value: null, milestone, held: true }`,
its only change), the register report lists the entry "held: a committed golden reads it" until a later cells row, and the
owning volume's bar reads the shipped value (V01's T-V1-50). A move that would shift a committed golden is a run — a
`fallback` or `reference` run with its declared shift (V12 §3.7.6) — never this row; the command below does not read
goldens, the golden check does. A named line's entry moves its cells by its line's method — a run, the panel rule's stated
second value — and, on a `measure` line whose owning volume states a tuning before its exit and whose bars no run may name
(every `BenchBarDef.stages` `[]`, V12 §3.7.2 (4): V03 §2.4's lines, tuned at `V3-P6`), by its owning seat inside the exit's
milestone under this clause's golden test, and by the line's stated fallback applied in the exit's change (*Milestone
exits*); each such move appends (2)'s cells row by the same command while the entry is `provisional`, and (3)'s check
covers the entry. (2) *The row.* The change that moves the value runs `plat calibrate register --defaults --milestone
<id>`, `<id>` its own milestone. For an existing default entry, or a named entry (1)'s last sentence admits — one whose
current stage is `measure` and every metric of which that stage reads is a `bar.` member whose bar's `stages` is `[]` (the
command reads the registered `BenchBarDef`s; that the owning volume states the tuning is the landing review's check) —
whose target's compiled cells differ, on the row keys its last cells row holds, from that row's `value`, the command
appends `{ date, value: the column's compiled cells by row key, milestone: <id>, cells: true }` — its only change to an
existing entry: `status`, `due`, the first row, `owner`, method, metric and fallback stay as written. For such an entry
that is not `provisional`, or whose due's record was committed before the change (a default entry's
`ReconciliationRecord`; a named entry's current stage's `MilestoneRecord`), it appends nothing and lists the entry as a
move owed to a run (`plat calibrate run`). A second run of the command appends nothing. (2′) *Rows added* (J-V12.80). A
change whose compiled cells hold row keys an entry's last cells row lacks, every row key that row holds unchanged, adds
rows: the command appends the cells row to that entry — default or named, whatever its status or due, whichever seat lands
the rows (V03's `V3-P1` band rows of `roomProgram.circulation`, whose poorest-band rows landed at M2b under owner `base`;
V11's C3 rows of a column its C1 rows opened) — and changes nothing else. Rows added after the entry left `provisional`
keep their authored values and are reported "rows added after close", a later major table version restating the entry for
them (V12 §4.2). A change that also changes a cell of a row key that row holds is a move, which (1) and (2) decide, one
cells row recording both; (1)'s owner condition and (2)'s "owed to a run" read only the changed cells of held row keys.
(3) *The check.* `plat calibrate register --check` compares, for every entry whose target is a cell or a column without
`preset` and whose history holds a cells row, its target's compiled cells with its last cells row: a changed or removed
cell of a row key that row holds fails — naming `plat calibrate register --defaults --milestone <id>` for a default entry,
or a named entry (1)'s last sentence admits, while it is `provisional` and not yet due, and `plat calibrate run`
otherwise; a compiled row key the row lacks fails naming the command, which appends it by (2′). It compares the last cells
row, not the last row of any kind: after its corpus run a default entry's later rows record metric readings and its status,
while that run's changes ship as historical packs (V12 §3.10.3 R1) and leave the column's cells as its last cells row holds
them — so a closed entry passes until someone moves its cells in place outside a run.

**Lines by column family.** A table column whose cells share one measurement is one entry (`target.column`), written by the
seat that lands the table; V11's column entries land with each content milestone and C6 at M4 audits them (V11 §8). A
line's method cell writes `CalibrationEntry.method` by name — `measure`, `panel`, `corpus` — and a line whose method is a
`reference` run writes `method: 'tune'`. **The catch-all rule** (J-V12.69): a line ending "and every other calibratable
column" (of the tables or columns it names) binds every calibratable column of those tables or columns that no other
register line names — this section's, V11 §8's non-g lines, V02 §3.10.10's, V06 §8's — each as its own entry, id
`cal.<table>.*.<column>`, with that line's method, metric and fallback; keys, laws, enumerations, switches and the dossier
row sets take none, and a column two lines bind fails the lint as two entries for one knob (V12 §2.6):

| rows (their content is the owning volume's) | method, due | the confirming measurement | when it cannot confirm |
|---|---|---|---|
| items 103–107: siting-family and signature-pair weights, coverage targets, item 105's web weights, `comfortM` and orientation factors, item 107's spacing radii, and every other calibratable column of the tables and columns items 103–107 add — registry rows 33–37 (`siting.profiles`, `.families`, `.pairs`, `.web`, `.custom`: `siting.web`'s `relaxPasses`, `relaxGain`, `splitThreshold`, `reverseShare`, `valuableSecurity` and every `siting.custom` rule cell among them), row 19 (`roster.resources`: `maxDistanceM` and every other goods column), row 17's `profile` columns (V11 §2.3's `SitingProfile`) and row 24's `coverage.rosterWeight` (V11 §2.3 – V11 §2.5, V11 §3.3 – V11 §3.8, V11 §3.13) (V11) | `measure` at M2b for the direction (the bar map's null and share bars, V12 §3.6b), then `corpus` at M-CAL for the value (the frames' `siting.*` and `link.*` rows) | `siting.<spec>` and `bar.<barId>` of the bar map's rows; `frame.*` (a column the catch-all binds names the bar map's rows of its item and its own `frame.<table>.<column>`) | a failing bar's fallback; a column no frame measures closes `fixed` at M-CAL with "no admissible frame" |
| item 106: the defensibility thresholds, `wall.barrierReachM`, the waterfront size threshold, and every other calibratable column of `walls.barriers` and `walls.waterfront` (rows 14–15, the thickness · height and tower-spacing factors among them; V11 §2.7, V11 §3.16) (V11) | `corpus` at M-CAL | `wall.barrierShare` and `walled.share` on walled frames; each column's own `frame.<table>.<column>` | as above |
| item 108: the ladder pairs and subsumption rules (provenance `sf:`, V11 §2.2); the port's ranges for unnumbered qualifiers | never entries: the first move only with the port's baseline (V12 §3.7.2 rule 2), the second are the port's derivation rules (item 20 (h)); `calibratable: false` on every `dossier.*` column (V11 §3.1) | — | — |
| item 102: `w_sun` (`prosperity.drivers`' row `sun`, V11 §3.3.5; owner V11), `sun.samples` and the `roster.classMix` prestige key `sun` (V11); V05's and V06's own shade cells by their volume's own lines where one names them (V06 §8), else by the default line | `measure` at M2b with V11's C2: T-V11-30 (`w_sun` at its default against 0 under common random numbers on B-CITY — the term alone moves no plot across two bands); then item 102 (g)'s fixtures, `measure` at `V5-P1` (V05's island, T-V5-19) and `measure` at `V6-E7` (V06's drift fixture's `shade.gap` on E7's bench, T-V6-12) — two stages at unordered rows, each read at its own exit (*Staged entries*) | `bar.T-V11-30` at M2b; the fixtures' `shade.gap` at their stages | V11 §3.3.5's stated fallback: halve `w_sun` once, then its stated floor, each followed by a re-run |

**Items 109 and 110 by column.** Every calibratable column of the underground's tables and of item 110's is one
`target.column` entry, id `cal.<table>.*.<column>` (`rows` absent), written by the seat landing the owning content
milestone — V11's C8 for item 109 (M6-U), C3b for item 110 (M3a) with the era's and the culture's item-110 factors, C1 for
`climate` (V11 §8); V04's and V02's seats for their own cells; and a base cell that a volume's base change request adds,
owner `base`, by the seat landing that request, once the cell exists (V06's E2 at M6-E for BCR-V6-26's persistence cells,
file f item 291; J-V12.66) — with the method, metric and fallback of its line; a line ending "and every other calibratable
column" binds by the catch-all rule. `retaining.settings.stateSnapCm` (row 79; file f item 245; owner `base`, whose value it
holds): the default line's entry at M3a, restated in place at `V6-E2` by V06 §8's line on `bar.T-V6-62` (J-RF2.4's
measurement), due `V6-E7` — an entry written at M3a cannot name a bar V06 registers at E2 (J-V12.82); V11 §3.24.1 cites
this line for it. `owner` is the volume whose values the cells hold, the schema's volume named in brackets. No entry of these
lines names a preset entry (V11's preset entries are `fixed:` off values, V11 §2.2) or moves an owner-stamped cell or gate
or a value below an owner-stamped minimum. A line's step is written into its entries' `due` (and a staged line's into each
stage's) in V12 §2.8's form — "at U3" as `V4-U3`, "at U3b" as `V4-U3b`, "at U4" as `V4-U4`, "at U5" as `V4-U5`, V06's E2
and E7 as `V6-E2` and `V6-E7` — while the corpus evidence rules E1 – E5 are rules, not milestones.

| table (registry row) · columns — one entry each | owner (schema) | method, due | metric | fallback |
|---|---|---|---|---|
| `s0.features`' relief and geology rows' item-109 (a) values — P(soluble), P(volcanic) by relief (row 9); `under.systems`' cavern row `mineBoost`, `mineCap`, `fissureChance`, `breachM` (row 59) | `base` (item 109 (a)'s values; V04's `params` names) | `measure` at `V4-U3` (the bar map's 109 (a) `trend` and `higherWith` rows; T-V4-55), then `panel` (V4-U5, `realism`) at `V4-U5` | `void.*` (cavern present) | V12 §3.6b's default, then *not produced*; unrated: the panel rule |
| `under.systems`' cavern `miningCellShare` (row 59) | V11 (V11 §3.23.1) | `measure` at `V4-U3` (the `higherWith` row's mining factor) | `void.*` (cavern present) | V12 §3.6b's default |
| `under.ruin` (row 58a) `chance`: `magic`, `history`, `delvingFactor`, every `blueprint` rung × relief cell | V11 (V11 §3.23.2; V04 §2.3) | `measure` at `V4-U3` (the 109 (j) (1) `rate` rows on forced-source sites confirm each draw reads its chance), then `panel` (V4-U5, `realism`) at `V4-U5`, then `corpus` possibility (E1) at M-CAL | `void.*` (ruin present) | the panel rule; a reachability gap enters `known-defects.json` |
| `under.ruin` `cultures` (`CultureRow`): `blockPitchM`, `streetCm`, `aspect`, `roomM`, `columnPitchM`, `hallShare`, `terraceRiseM`, `weight`, `monument`, and every other calibratable column of the row | V11 (V11 §3.23.4; V04 §2.3) | `measure` at `V4-U3` — T-V11-24's distinctness against the town's fabric above the ruin (`paired`; T-V4-45) — then `panel` (V4-U5) at `V4-U5` | `ruin.blockArea`, `grid.r4`, `grid.axis` | V11 §3.23.4's: the failing row's `blockPitchM` moves 25 % away from the town's median block pitch once and the bench re-runs; a second failure drops the row's weight to 0, reported to the owner as a table defect |
| `under.ruin` `survival` (the eight persistence classes) | V11 (V11 §3.23.5; V04 §2.3) | `panel` (V4-U5, `realism`) at `V4-U5`; the order is T-V11-23's compile bar | `ruin.survival` | the panel rule, every move keeping V11 §3.23.5's order |
| `under.ruin` `sourceWeight` | V11 (V11 §3.23.6; V04 §2.3) | `measure` at `V4-U4`, the step whose exit runs that bar (the 109 (i) `rate` row: T-V4-58), then `panel` (V4-U5) at `V4-U5` | `void.*` (an undercity's first void source) | the panel rule |
| `under.ruin` V04's cells: `ancientYears`, `significance`, `maxFrameShare`, `maxChambers`, `forecastFloorShare`, `depthM`, `burialByAge`, `smoothM`, `sharedAxisChance`, `ageRefYears`, `coverKeep`, `distinct`, `fadeFactor`, `magicLightChance`, `monument` (`clearM`, `tierDecay`, `ceilingClearCm`, `moundShare`), and every other calibratable column | V04 (V04 §2.3) | `measure` at `V4-U3` (T-V4-45, T-V4-68; T-V4-62 reads the span-rule line's cells), then `panel` (V4-U5) at `V4-U5` | `ruin.blockArea`, `grid.axis`, `void.*` | V04 §8's pre-decided fallbacks, else the panel rule |
| `under.openings` (row 58a) each kind's `chance` | V11 (V11 §3.23.7; V04 §2.3) | `measure` at `V4-U3b`, the step whose exit runs those bars (the bar map's 109 (j) (5) `trend` and `floor`: T-V4-49, T-V4-54), then `panel` (V4-U5) at `V4-U5` | `void.*` (accessible; deep voids sealed) | V12 §3.6b's default |
| `under.openings` `coverM` | V04 (V04 §2.3) | as the line above | `void.*` | as the line above |
| `under.dig` (row 58a): `cap`, `reachM`, `decayM`, `maxM`, `basementFactor`, every resolved `classRow` | V11 (V11 §3.23.7; V04 §2.3) | as the `under.openings` line | `void.*` (accessible; deep voids sealed) | V12 §3.6b's default, every move keeping T-V11-23's non-increasing depth factor |
| `under.dig` `sealedFloor` — the floor the `voidSealedDeep` bar reads (item 109 (j) (5)) | V11 (V11 §3.23.7) | `panel` (V4-U5) at `V4-U5` | `void.*` (deep voids sealed) | none: moving it moves the bar's threshold, so a miss is `not-achieved` (`notAchieved: true`) |
| `under.dig` `planReachM` | V04 (V04 §2.3) | as the `under.openings` line | `void.*` | V12 §3.6b's default |
| `under.catacomb` (row 58a): `count` (`churchesPer`, `cap`), the `chance` cells, `rankCap`, `growthCapShare` (per year), `growthFloorM2`, `plagueNeedFactor`, `cryptJoin` (`own`, `other`), `charnelMaxM2`, and every other calibratable column — never the owner-stamped gates (the TOWN rung, the cemetery-only sources, the cathedral's `always`) | V11 (V11 §3.23.8, J-VI.6; V04 §2.3) | `panel` (V4-U5, `realism`; its framing holds the cathedral's crypt and the largest complex) at `V4-U5`, then `corpus` possibility (E4's crypt and catacomb checks) at M-CAL | `catacomb.count`, `catacomb.extentM2`, `catacomb.growthM2`, `crypt.joined` | the panel rule; the bar map's catacomb properties are exact conformance and move no cell |
| `under.catacomb` `ossuaryReachM` | V04 (V04 §3.5.1) | as the line above | `catacomb.fill` | as the line above |
| the crypt columns of item 109 (k) (2): the crypt chance per church class (the `basement` classes' cellar rows), `cryptM2` by class and band (`roster.classes`), `crypt.rankShare` (`roster.settings`) | V11 (V11 §3.5.8, V11 §3.5.1) | as the `under.catacomb` line | `crypt.present`, `crypt.areaM2`, `crypt.rank` | as the `under.catacomb` line |
| V04's other item-109 cells (`voidDwellings`, `under.layout`'s `overlapShaftM` and `overlapShaftChance`, the fade rows); and `accessForecastMin`, `under.rule`'s base cell (registry row 57; II.7.4's `UndergroundRule`, its default written there beside `forecastSafety`'s), its entry landed at `V4-U3b`, the step of its reader P7 | V04; `accessForecastMin` `base` | the default line — `corpus` at M-CAL, or at `M-CAL/under` for a step landing after M-CAL's record — unless V04 §8 writes its own line for the column in V02 §3.10.10's form, which then restates the entry in place | `frame.<table>.<column>`, else that line's | closes `fixed` at its corpus run with "no admissible frame", else that line's |
| `terrace`: `slopeMin`, `stepMinCm`, `stepMaxCm`, `minTerraceDepthM` (`enabled` is a switch, not calibratable, and takes no entry — V11 §3.24.1); `retainingReachM`, `flatDepthM`, `coverShare` (V09 §4.20.1 (3)'s flat-ground bends); `s0.features`' relief column `terracedEdges` (row 9); and every other calibratable column | V11 (V11 §3.24.1) | `panel` (the M4 panel's M4-110 group; K2 its item) at M4, then `corpus` possibility (E1) at M-CAL | `retaining.lengthM` (and `retaining.onFlatM`, 0 by T110-1) | the panel rule, every move clamped by T-V11-32 (a)'s inequalities |
| `retaining` (row 79) by band: material weights, `batter`, `thicknessShare`, buttress `fromCm` and `spacingM`, `parapetCm`, towers per 100 m and their least step, and every other calibratable column but `settings.stateSnapCm` | V11 (V11 §3.24.1) | `panel` (the M4-110 group) at M4 | `retaining.lengthM` | the panel rule |
| `raisedWays` (row 80) rows, CITY and METROPOLIS × kind: `chance`, `cap`, `pMax`; `raisedWays.settings`: `totalCap`, `viaduct.minDropM`, `viaduct.spanCostFactor`, `viaduct.maxSpanM`, `elevated.minRiseM`, `elevated.maxSpanM`, `elevated.bandFactor`, `elevated.landmarkFactor`, `elevated.landmarkMinSignificance` (DR35's threshold), `landmarkMax`, `elevated.highGroundM`, `aqueduct.sourceReachKm`, `aqueduct.needRatioMin`, `aqueduct.minFallPerKm`, `aqueduct.gradient`, `aqueduct.capPerSizeMember`, `aqueduct.terminal`, and every other calibratable settings column — the chances and caps at or above their owner-stamped minima (J-V12.42); the rung gate is V11's schema, never a cell; no `aqueduct.dossierFactor` cell exists — the aqueduct takes no dossier factor (V11 §3.24.7 (3)) | V11 (V11 §3.24.2) | `measure` at M3a, where raised-way generation lands (the four raised-way bars; V06's growth parity reads the ways over the epochs by the `decline` lines below, never a stage of this line), then `panel` (the M4-110 group) at M4, then `corpus` possibility (E1, E4) at M-CAL | `raised.count` | V12 §3.6b's default bounded by the owner's minima — a presence bar still failing at the floor is *not produced*; unrated: *provisional — not rated*; a reachability gap enters `known-defects.json` |
| `raisedWays.structure`: `clearanceCm` (cart, foot), `parapetCm`, `channelWallCm`, `channelCm`, `deckExtraCm`, `maxPierM` by kind, `pierSpacingM` by material, `pierWidthShare`, `pierMinCm`, `material` by band, `slideMaxFactor` (file f item 244), `stripMarginM` (the under-deck strip's one margin cell, read by §4.6 S8 and by §2.7's laws — the strip, the ends and the zone of their terms (a span's strip and a held building's strip read no margin) —, shipped with item 110's rows from M3a), and every other calibratable column but the `span` block (the span-rule line's) and `clearWidthM` and `squareDeg` (§4.3's crossing cells, the default line's, `corpus` at M-CAL, as when V01 held them; J-V1.97) | V11 (V11 §3.24.2) | `panel` (the M4-110 group) at M4 | `raised.count` (a course needing a taller pier than `maxPierM` drops, reported `raised_too_tall`) | the panel rule |
| `era` (row 50) `aqueductM`, `raisedVaultM`; the culture rows' `building` block (row 71) `aqueductM`, `elevatedM`, `raisedVaultM` | V11 (V11 §3.19.1, V11 §3.20.3) | `panel` (the M4-110 group) at M4, then `corpus` possibility (E1: a frame's era and region reach its raised-way rates) at M-CAL | `raised.count` | the panel rule |
| `ways.crossing` (row 81) by way class: `rampMaxGrade`, the stair's riser, tread, landing interval and landing length, and every other calibratable column | V11 (V11 §3.24.5) | `panel` (the M4-110 group; K2's stairs and ramps) at M4 | `crossing.kinds` | the panel rule; a cart class never takes a stair (V11 §3.24.5's failure rule, the owner's words) |
| `deck` (row 82) by kind: `offer` per rung, footprint and floors by band, `frontageM`, `minPlotDepthM`, `fill`, `endClearM`, and every other calibratable column | V11 (V11 §3.24.4) | `panel` (the M4-110 group) at M4, then `corpus` possibility (E1) at M-CAL | `deck.buildings` | the panel rule |
| `deck.landmarks` (row 83): each slot's claimant chances, `minSpanM`, and every other calibratable column | V11 (V11 §3.24.4) | `panel` (the M4-110 group; K2's mole head, mid-mole and islet slots) at M4 | `deck.buildings` | the panel rule |
| `roster.specialisations` (row 84): each row's `chance`, `capShare`, `capMin` | V11 (V11 §3.24.3) | `panel` (the M4-110 group; its stepped-temple item) at M4 | `tier.count` | the panel rule |
| the stepped tiers: V11's `stepped-shrine` heights row (V11 §3.6.4); V02's stepped compositions (V02 §3.15) take V02 §3.10.10's stepped line, never this one | V11 | `panel` (the M4-110 group; the stepped-temple item) at M4 | `tier.count` | the panel rule |
| `water` (row 85) `perHeadL` | V11 (V11 §3.24.6) | `measure` at M3a — T-V11-33's bench at the start of V11's C3b (arid METROPOLIS seeds with an aqueduct candidate ≥ 0.5; temperate alluvial CITY seeds ≤ 0.2) | `water.needRatio` | V11 §3.24.6's: `perHeadL` moves by 5 litres once toward the missed side and the bench re-runs; a second miss is reported to the owner with both measurements |
| `water`: `wellsPerHa` by geology, `wellYieldM3`, `roofShare`, `captureShare` by biome; `climate` (row 43) `rainMmPerYear` by biome | V11 (V11 §3.24.6, V11 §3.17.1) | as the line above, then `corpus` possibility (E1) at M-CAL | `water.needRatio` | V11 §3.24.6's fallback moves `perHeadL` only; these columns close with its result |
| `decline` (row 46) structures block: `retaining.holdM`, `retaining.neglectAfterYears`, `retaining.stretchM`, `aqueduct.disuseAfterYears` — written at V11's C3b (M3a) | V11 (V11 §3.18; read by V06 §3.19.2, V06 §3.19.4) | `panel` (V6-E7, AB `history` on H-100) at `V6-E7`, inside M6-E | `retaining.lengthM`, `raised.count` over the epochs | the panel rule |
| the base decline table's persistence cells `raised`, `retaining` (row 46; §4.11 by file f item 291, STAGED M6-E; V11 §3.18 holds no rate) — written by the seat landing V06's E2 at M6-E | `base` | `panel` (V6-E7, AB `history` on H-100) at `V6-E7`, inside M6-E | `retaining.lengthM`, `raised.count` over the epochs | the panel rule, with V06 §8's stated second value |
| V04's span-rule constants, the cells `raisedWays.structure.span` (row 80; their values V11 §3.24.2, J-V11.97 — the base's §2.7 support step and span rule, file f item 244 from V04's request BCR-V4-45, and V04 cite the cells — `deckDepthCm`, every span's soffit, read by §2.7's laws, law 1 (2), (5), (7) —): `vaultShare` by kind (`span.vaultShare`, scaled by the era and culture `raisedVaultM`), `maxHeightCm`, `minHeadroomCm`, `maxFallCm`, `vaultCap` by rung, `deckDepthCm`, `supportFoundationCm` (J-V4.93) | V04 | `panel` (the M4-110 group) at M4, then `measure` — T-V4-62's conformance, 0 violations — at `V4-U3`, then `panel` (V4-U5, `realism`) at `V4-U5`: three stages in milestone order, the cells landing at M3a (*Staged entries*; V04 §8's row takes this order and cites this line, its home) | `raised.count` | V04 §8's pre-decided fallback, else the panel rule |

**Items 111–119 by column** (the owner items' register lines; V12 §3.15 gives each item's bars):

| table · columns — one entry each | owner (schema) | method, due | metric | fallback |
|---|---|---|---|---|
| item 111's pull and term cells: the water-pull weights by climate row (the growth field's and the crowding map's), the prosperity water term's weight, item 102's sunlight cell per climate row, the well-yield weighting and the arid walking-coverage factor (V11's item-111 rows), and every other calibratable column they add but the oasis, grove and garden rows | V11 | `measure` at M2b — T111-1 (`higherWith`) and T111-4 (`most`) — then `corpus` (an arid frame's `water.distByBand`, where one exists) at M-CAL | `bar.T111-1`, `bar.T111-4`, `water.walkShare`, `water.distByBand`; `frame.*` | V12 §3.6b's default (the weight doubles once, clamped), then *not produced* |
| item 111's oasis chance and no-other-water factor, the oasis area band, the grove and irrigated-garden rows, and the arid row's river, lake and coast chances | V11 | the default line (`corpus` at M-CAL; T111-3's rate rows at M1 confirm each draw reads its chance, and a miss there is a code defect fixed before M1's exit, moving no cell) | `frame.<table>.<column>`; `water.kinds` reported | the default line's |
| the deficiency-contrast threshold of §8.2's style check (item 112 (a); its cell in V11's style registry rows) | `base` | `measure` at M3b — T112-1 green on every shipped family's checked variants (`hatched`'s at M5) — with the game-master trial's colour findings appended as `trial` rows (V12 §3.15.2) | `bar.T112-1` | none: moving it moves the bar, so a miss is `not-achieved` (`notAchieved: true`); a failing variant is fixed in its colours, never by the threshold |
| item 113's cells: `history.epochYears`, the event-to-epoch rows, the burial threshold and its flood, silt, rebuilding and bare-rock factors, the effective peak's sizing quantile (V11's item-113 rows), and every other calibratable column they add | V11 | `measure` at `V6-E9`, where the replay lands (its fixtures pass with the cells as shipped), then `corpus` possibility (E4: a town shrunk inside its old walls, a church too large for its parish, a refounding on the old roads) at its corpus run | `bar.T113-1`, `bar.T113-3`, `bar.T113-4`, `bar.T113-6` | V12 §3.6b's default |
| item 114's cells: the need and means windows, the neglect, wear, breach, patch and rebuild rates, the patch-replacement rate (V11's item-114 rows) | V11 | `panel` (V6-E7, AB `history` on H-100, whose walls decay and recover) at `V6-E7`, then `corpus` possibility (E4: a poor town's patched circuit) at its corpus run | `wall.condition` over the epochs; `bar.T114-5`, `bar.T114-4` (their specs `T114g.sustained`, `T114g.oldestFirst`, V12 §3.15.4) | the panel rule |
| item 114's generation-time shares (§7.7's DR41 from readiness and wealth; V11's rows) | V11 | `measure` at M2b, where §7.7's DR41 lands (§13.8), on T114-7's readiness × wealth fixture grid, then `corpus` possibility (E4) at M-CAL | `wall.condition`; `bar.T114-7` | V12 §3.6b's default |

Item 115's ceiling table and item 118's decoration, staging-keyword, motif and generic-festival tables (registry rows 97 and
102–105) are enumerations (not calibratable; V11) and take no entry; item 120 adds no line — its search lexicon
(V11's labels, synonyms and groups) is a word list, and a calibratable cell its rows add takes the default line like any
column; item 116's zoom-out margin stop, item 119's comfort level, item 120's interaction budgets and every time budget
are engineering constants outside the register (*The provisional-number lint*), each provenance note naming its
confirming bar. Items 121 – 126 add no line either. The look cells of items 122, 123 and 124 — item 122's look rows'
`scale` and `lookLevel` and its settings `densityCap`, `siegeStandoffM`, `areaPerHeadM2`,
`enginesPerBesiegers` and `previewSeverity` (§10.2's `RosterTables.crisis`), item 123's threshold ranges by element kind,
its decay rates by material and its default age, item 124's climate rows' weather columns and the numbers of the
climate table's `settings.weather` block (the kinds' `lengthS` and `hours`, the site factors and `forestShareMin`; not
its two owner-stamped caps, V11 §3.25.11) —
take the default line like item 117's look rows: V12 §3.15's bars check that the drawing follows them, never their
values; item 122's `map` rows are a dossier row set and take none. Item 121's ladder, tier ceilings, 4K ceiling and Auto
loop thresholds, item 124's frame cost and item 126's medium-class minimum are engineering constants outside the
register, each provenance note naming its confirming bar (T121-2, T121-3, T121-8; T124-2; T126-2); item 125 adds no
cell (its fallbacks are the generator's own choices).

**The panel rule** (J-V12.61). Where a line reads "the panel rule": a group rated No on its question moves the line's cells
once to the owning volume's stated second value where it states one — a declared `fallback` run (V12 §3.7) — and the group
re-sits at the next sitting; where no second value is stated, the entry becomes `not-achieved` and the group's finding
reaches the owner as a table defect in the reconciliation report (V12 §5.5); an unrated group leaves the entry *provisional
— not rated*, which never fails an exit (V12 §2.6).

**The provisional-number lint** (`plat calibrate register --check`, PR tier). **Every** compiled cell whose column is
`calibratable` passes only when its provenance source is `ref:…`, `owner`, `owner-eye`, `host`, `corpus` (item 69's palette
exception, or a historical pack's cell) or `sf:⟨file⟩@⟨baseline⟩`, or an entry names it directly or by its column, or its
provenance note begins `fixed:` with its reason; everything else fails — so an `own` calibrate-later cell never dangles. A
cell no entry covers fails naming its column and `plat calibrate register --defaults --milestone <id>`; an entry carrying
`line: 'default'` whose method, due, metric or fallback differs from the default line's (its due `M-CAL`, or — only once
M-CAL's record is committed — the `M-CAL/<layer>` its first history row's milestone gives; a default entry due `M-CAL` still
`provisional` once that record is committed fails, owing its layer's run), or whose `owner` is no document whose source file
holds the column's cells, fails (a hand-edited default is a named line without its section); a default entry beside a named
entry for one column fails as two entries for one knob; an entry, or a stage of one, whose `due` is none of §16's ids, 
V12 §2.8's volume-qualified ids or a `CorpusRunId` fails, naming V12 §2.8's form (`E2`, `U5` and "the raised-way milestone"
fail); an entry whose last cells row disagrees with its target's compiled cells, or lacks a compiled row key, fails by (3)
above. Model constants the volumes keep outside tables, in code, move into a table or take a `thr.` entry. An application
or engineering constant — a UI threshold, an autosave or export limit, a time budget — that its volume confirms by its own
test or performance row under D-18 (V09's autosave limits, `raised.previewOnReleaseKm`, the deck scenes' export cap and
times; V10's T-V10-8 budget row; item 116's margin stop; item 119's comfort level; item 120's interaction budgets; item
121's ladder, ceilings and Auto loop thresholds; item 124's frame cost; item 126's medium-class minimum) is outside the
register: its provenance
note names that test, and no entry is written (J-V12.81). Every §13.7 letter has an entry; every entry's cell or column
exists and is calibratable and every metric it names exists — a catalogue id, or a family member that resolves
(`siting.<spec>` and `bar.<barId>` to a registered bar, `frame.<table>.<column>` to a calibratable column); one mechanism has
one entry and one column; every cell that encodes an OWNER RULE item's hard clause carries its `ownerRule` stamp — the check
reads the stamped-clause list V11's compiler writes; status moves only provisional → confirmed | fallback-applied |
not-achieved | owner-set | fixed (a `corpus` entry closed at its corpus run, with its reason), and confirmed → owner-set (a
later pick) — a staged entry's advance from stage to stage is no status move; a history row is appended, never removed.

**Milestone exits.** At the exit the landing seat appends to each `measure` entry due there — on a staged entry, to each
stage due there — one history row holding each metric it names as the milestone's `ParityReport` gives it (a `bar.` metric:
its bar's statistic and verdict); the entry moves to `confirmed` when every `bar.` metric it names passes and every other
metric meets the condition its line states, and otherwise its fallback opens (V12 §3.7.1 (b)) — or, for an entry whose
cells no run may name (every metric its stage reads a `bar.` member whose bar's `stages` is `[]`), its line's stated
fallback is applied by the exit's seat in the exit's change, recorded by (2)'s cells row, the entry closing
`fallback-applied`. A `frame.*` metric is read only at a `corpus` stage (M-CAL, or the later run that takes its column): at
an earlier exit it is not read and does not hold the entry back, and its history row is appended at that run; an entry
whose every metric is a `frame.*` member is due at its corpus run, and the lint refuses any other due for it (J-V12.70).
`MilestoneRecord.exitCriteria` (§13.3) gains one row per entry due at that milestone, with its status and evidence
(`result` widened to carry `not-achieved`, `owner-set`, `fixed` and `provisional-not-rated`, item 493); an entry still
`provisional` past its due milestone fails the exit — §13.7's JT ("no acceptance run treats an unset value as passed") made
mechanical — except a `panel` entry whose panel is unrated, which reads *provisional — not rated* and never fails an exit.
**Every volume's landing exits green:** a milestone of any volume that lands a registry table, or a calibratable column of
one, exits with `plat calibrate register --check` green over the cells it lands — T-V12-20 runs at PR tier from M1, so the
landing change carries its named lines' entries and the default line's (each owner's §8 exit cells carry it). The register
check needs no input to pass: with no calibratable cell compiled it passes empty.

**Staged entries** (J-V12.79). A line that names more than one stage — "`measure` at `V4-U3` …, then `panel` (V4-U5) at
`V4-U5`, then `corpus` possibility at M-CAL" — writes each of its entries with `stages`, one per stage in the line's order:
its method, its due (a `corpus` stage's a `CorpusRunId` by *The due's corpus run*), its panel on a `panel` stage,
`possibility: true` where the line says "possibility", and `metric` where the line gives the stage metrics of its own; a line
of one stage writes none. The entry's `method`, `due` and `panel` hold its current stage's: the first stage with no passing
row. A stage is read at its milestone's exit, or at its sitting for a `panel` stage, and appends its row with
`stage: { index, outcome }`: (1) a pass that leaves a non-`corpus` stage unpassed appends `pass` and advances `method`, `due`
and `panel` to the first unpassed stage, the entry staying `provisional`; (2) the pass that leaves no non-`corpus` stage
unpassed confirms the entry; (3) a failing stage applies the line's "when it cannot confirm" there — its fallback (a
`fallback` run, or the hand fallback of *Milestone exits* where no run may name the cells), the panel rule's stated second
value, or `not-achieved` — and so closes the entry (`fallback-applied` or `not-achieved`), its later stages still read at
their exits as metrics or panel rows that move no cell and no status; (4) an unrated `panel` stage appends `unrated` and
holds the entry *provisional — not rated*, never failing an exit, its later stages still read at their own exits, and a
later sitting's rated pass (V12 §3.9.1's re-offers) passing it; (5) a `corpus` stage is read at its corpus run whatever the
entry's status then is — a `frame.*` metrics row, and for a `possibility` stage that run's reachability rows (E1) and checks
(E4) — and moves cells only as V12 §3.10 lets a corpus run, into historical packs (R1), never re-opening, closing or
advancing the entry (V12 §3.10.1's closing by the run's record binds entries whose only stage is `corpus`). A staged entry
holding a non-`corpus` stage due at a milestone whose `MilestoneRecord` is committed, with no row of that stage, fails that
exit as an entry past its due.

**The order**, which the lint holds, is §16's (J122's combined order, stated there once): a stage sits at the §16 row it is
built inside — a §16 id at itself; `M3a-V2` at M3a; volume 2's `M6a` – `M6c` at M6, before M6's own exit; `V3-P*` at M6-P
(P0, P1 and P3 after M4, the rest after M6), `V4-U*` at M6-U, `V5-P*` at M6-sky, `V6-E*` at M6-E; `V-M0` after M0 and
`V-M1` – `V-M4`, `V-M2u` in their own order; volume 11's steps at their §16 ids — two stages at one row following their step
numbers (`V4-U3` before `V4-U3b` before `V4-U4`), volume 6's steps by V06 §8's *Order and dependencies* instead (E2, E3,
E5 and E6 in any order after E1, E4 after E1, E7 after E1 – E6, E8 unordered against E7, E9 after E8). A row precedes every row that
starts after it in §16's table, directly or through a chain (M-1 – M4 in their order before every other row; M6 and M6-U
after M5; M6-sky after M6-U; M-CAL after M6-sky; M-SF after M-CAL; M3c after M3a); rows no chain connects are unordered —
M5, the village, M6-E and M6-P's first rungs, which J122 runs side by side after M4; M6-E against M6, M6-U and M6-sky; M6-U
against M5 where it runs beside it with a second pair — and two stages at unordered rows are each read at their own exit,
whichever comes first (the item-102 line's island and drift stages); a `corpus` stage follows every other. The lint refuses a
`stages` list the order places the wrong way round, naming the pair (a `V4-U3` stage before an `M4` stage), a `corpus` stage
before a stage of another method, a stage whose `due` fails the due test, and a staged entry whose `method`, `due` or
`panel` is not its current stage's.
=== END ===
