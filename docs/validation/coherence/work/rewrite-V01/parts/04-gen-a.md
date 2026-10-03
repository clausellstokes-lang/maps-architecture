## 3 Generation

### 3.1 Where stage 2 enters the pipeline (the stage graph delta, item 280)

```
… S7b Allocation + district claims: (1) the greedy pass ─► [S7c Fabric selection — S7b's allocation hook: eager, town-wide,
       per district in lineage order; each district's fabric and its templateLandM2] ─► (1) the reconcile (capacity less the
       template land, V01 §3.3.7) ─► (2)–(7) ─► SKY (volume 5) ─► S12a …
  ─► S8 Infill (per district): the district's fabric — template seeds in its template face, then §4.6's bent cut on every face;
       context features (V01 §3.6); ring centres marked
  ─► S9 Corridors ─► S10a (i) the field-driving classes and the institutions below a block ─► [S9b Block dispatch — S10a's
       block hook: eager, per district in lineage order; Block.content, square types, void corners] ─► S10a (ii) field pass 2
       ─► S10a (iii) every other class (reads Block.content); the way-surface rule (V01 §3.7.3) at its end
  ─► S10 (0) … pool: S10 (void-corner claims; whole-block manor joins) ─► S10b ─► S11 (square centrepieces) ─► S12b (green and
       yard blocks; court greening)
  ─► S12c ─► S13a: (a) the local places' creation pass (V01 §3.7.1) ─► (b) way names with their naming context (V01 §3.7.2) and
       district names with their naming features (V01 §3.7.4) ─► (c) the local places' naming pass ─► S14
  the underground tail (volume 4), after its systems and accesses: the opening pass (V01 §3.7.1)
  lazy, per district, by §4.1's trigger policy: the refine close-up (V01 §3.8), and the outline close-up over any area (V01 §3.8.9) —
       in the derivation pool, or the generation worker when the pool is off; never in the tile worker (§8.9)
  units: a standalone neighbourhood document runs this pipeline on its own outline (V01 §3.10.1); each sky island's districts run it on
       the island's arena as a unit beside the hinterland unit, from the island's unit inputs (V01 §3.10.3); after generation
       inside the commit of a raise, a late declaration or New random on the island (V01 §3.10.3 (6))
```

**Registration.** S7c and S9b are **stage hooks**: registrations of `@plat/hood` in §4.12's `StrategyRegistry` at the two
hook points the base declares (item 323): `S7b.afterGreedy` — S7b (1) calls its hooks between its greedy pass and its
reconcile — and `S10a.afterDrivers` — S10a calls its hooks between step (i) and step (ii). A hook declares its read-set
and write-set; the host stage's declared inputs and outputs are its own united with its hooks', so §4.1's invalidation
and §7.3's scoped re-derivation see every input a hook reads, and T-V1-35 holds each hook to its declaration. Each hook
keeps its own stage id (`S7c`, `S9b`) as the stage component of its stream keys (§6.1). Both write records only (no plat
batch) and are eager (§4.1's laziness contract: their output decides content).

| hook | reads (declared inputs) | writes |
|---|---|---|
| S7c (`S7b.afterGreedy`) | S7b (1)'s greedy `Allocation` rows (in-transaction); `districts` (kind, intent, identity, seams, the `fabric` path's edited mark); `seams`; `ways` (S4 arterials, S5 secondaries: classes, trade weights); `tradeFlow`; `reservations` (S3); `terrain`; `field.pass1` and `fieldBands`; the shade sampler's pass-1 mask (item 102) — on a sky unit the island's `shadeSky` (V05 §3.11 (4)) instead; `roster.classes` (σ, families, sectors, powers, siting profiles); `powers` and `Institution.powers`; the supply edges and goods (items 103, 105; for the allocation-level links); the dossier's ladder and chain records (V01 §1b); `skyUnitInput` (a sky unit only); the tables `hood.templates` and `hood.constants` | `district.fabric`, `district.fabricParams`; `templateLand` (in-transaction to S7b's reconcile, never persisted) |
| S9b (`S10a.afterDrivers`) | `blocks` (areas, frontages, interiors, `ringCentre`); the L2 junction index; `ways` (classes, tiers); `districts` (kind, `fabric`, `fabricParams`, intent, identity, provisional band range); `reservations` (S3, S7, S7b; §4.8 forecourts) and `reservations.landing` (item 282); `allocations`, `allocations.landing` (item 213) and S10a (i)'s placements; `field.pass1` and `fieldBands`; the blocks' manifested band (in a re-derivation); item 71's class mix and the designation templates; §4.9's greenery rows; the siting families and class profiles (V11 §2.3–§2.4); the shade sampler's mask, each live island's `shadeBasis` and the unlevelled `terrain` (S1's raster with the T2 strokes; V01 §3.5.3's tie-break reads it too), from which the strips onto the ground are computed at this first read and held (V05 §3.19 (6)) — on a sky unit the island's `shadeSky` in place of the mask and the strips; the neighbouring districts' pass-1 band; the dossier's ladder records; volume 4's catacomb sources and entrances (a re-derivation); locks, pins, assignments; the tables `squares.quota`, `hood.dispatch`, `hood.squares`, `hood.constants` | `block.content`, `block.squareType`, `block.voidCorner` |

With `@plat/hood` absent (M1–M4b) neither hook exists: every district is `bent-cut` and every block `ordinary`, the
base's behaviour exactly. SKY (V05 §3.1) runs after S7b, S7c included; S7c, inside S7b, reads none of SKY's outputs (a
landing claim is a hole S8 cuts around, V01 §3.4.1). The village product registers neither hook (V07 J-V7.24): stage 2
runs at the base rungs only (V01 §3.18's rung table).

### 3.2 The provisional character χ̃ — item 72's vector before anything is placed

Item 72's character vector (§4.5 (2)) is derived from placed plots, so it exists only after S12c — too late to choose a
district's fabric (S8) or type its blocks (S9b). The allocation, however, is eager and complete at S7b (1)'s greedy
pass. **χ̃(D) is §4.5 (2)'s function evaluated with the allocation rows as the instances** (J-V1.1; §4.5, item 294) —
S7c reads it over the greedy pass's rows, every later reader over the committed rows:

* each row `(cls, band, count)` stands for `count` instances of `cls`; a household row for `count` residential instances
  of the residential family; each instance's significance is §4.5 (1)'s σ with **size = 1** (no footprint exists yet)
  and rank and patronage as §4.5 (1) reads them (the dossier's where the row carries a dossier element);
* (1) plot mix, (2) political alignment (with §4.5 (7)'s partition at the current applied standings) and (4) economic
  role are computed exactly as §4.5 (2) states over these instances;
* (3) trade position: the district's frontage is the length of every way chain on the boundary or inside its L1 faces at
  S7c (the S4 arterials and S5 secondaries, on part 0 only — V01 §2.3's parts table; each side of a chain counted once,
  for the district that owns that side), × the way's trade weight (§4.3's `TradeFlow`), over the town's largest such
  sum; `tradeBearingCdeg` as §4.5 (2);
* (5) relations: `mainRoad` the share of that frontage on `through` and `primary` ways; `anchors` from the S3 and S7b
  reservations as §4.5 (2) reads institutions, with contribution `c` = **the district's share, by count, of the anchor's
  allocation-level suppliers** — for each supply edge of the anchor's class, S7b (1)'s district supply term (item 105
  (g)) binds the anchor's allocation to the nearest district, by centroid distance, whose allocation holds the provider
  class (a sky pseudo-district at its island's land centroid's world point, V05 §3.20 (12) (b)); `c` is the share of
  those bindings that land in D. The placed vector keeps §4.5 (2)'s plot-level `c`.

χ̃ is draw-free, never stored, recomputed on demand from eager records, and equal on every host. Its **provisional
identity** is §4.5 (4)'s identity rule applied to χ̃ (the row it would take, source `emergent`, `dominant` or `plain`, or
the dossier's where the district is dossier-defined — a QUARTER ladder record included, V01 §3.5.12). Readers: S7c's
weights (V01 §3.3), S9b's square-type split (V01 §3.5.3), a replace dry run's ghost for the district it re-derives
(V01 §3.9), the fabric why provider (V01 §4.5). Every other reader — the hood-pin identity factors, the panel, the
title's subtitle — reads the placed vector S12c writes. A district whose allocation holds no instance has the zero plot
mix, no anchors and no identity row (source `plain`); its weights read every mix, sector and identity term as 0 (V01
§3.18). **Check (T-V1-2):** on B-CITY, (a) χ̃'s plot-mix shares lie within 0.08 (half the L1 distance) of the placed
vector's for ≥ 90 % of districts; (b) χ̃ over the greedy and over the reconciled allocation lie within 0.08 of each other
for ≥ 95 % of districts; *fallback* for (a): size = the class's median footprint over its median plot (§4.7 S11's
templates at the band) instead of 1, and the check repeats; for (b), V01 §3.3.7's.

### 3.3 S7c Fabric selection — the character drives the layout

#### 3.3.1 The step

For each district D, in lineage order, on the generation worker, as S7b (1)'s allocation hook:
1. If D's `fabric` path is **edited** (a `setAttr`, held as a declaration, §7.2) or set by a declaration read ahead (a
   skeleton's `quarter` with its `fabric`, §4.1, item 349): keep it, compute its `templateLandM2`, and go to the next
   district.
2. If D's kind is `hinterland`, or D lies on the underground arena (`underground`, `undercity`): `bent-cut` (the
   hinterland has its own recipe, §4.9; underground close-ups never take a replace fabric, II.1). Next. (A sky island's
   districts run this step inside their unit run, V01 §3.10.3.)
3. Build `DistrictContext(D)` (V01 §2.3) on the pre-claim template face (V01 §3.3.2) and χ̃(D) over the greedy allocation
   (V01 §3.2).
4. The **eligible set** E = `bent-cut` ∪ every `hood.templates` row whose `requires` holds on the context (V01 §3.3.2).
5. Each row r ∈ E gets its **weight** (V01 §3.3.3); `bent-cut` gets `1 − 0.5 × intent.planned`.
6. One uniform u on `fabric.select` (V01 §3.3.4) picks the row by cumulative weight in table row order.
7. Write `D.fabric = r.id` and `D.fabricParams` = r's `params` defaults (V01 §3.4.7). Per-district draws of a template's
   parameters happen in S8 on `hood.template`, not here.
8. Compute `templateLandM2(D, r)` (V01 §3.3.7) and hand it to S7b's reconcile.
9. Report (`stage2.fabric`): D, E with each weight, the choice, the land.

A town with no district S7c may lay (every district hinterland or underground) writes nothing and reports nothing; a
town of one district runs the step once. The weights of E always sum above 0: `bent-cut`'s is at least 0.5, so step 6
always picks a row.

#### 3.3.2 Eligibility (`TemplateRequirement` on `DistrictContext`)

At S7c the claims of S7b (3) are not yet cut, so the **pre-claim template face** is D's largest L1 face that is neither
a wall strip, an S3 reservation, an intramural garden (item 106 (b)) nor another district's; `templateFaceAreaM2` is its
area less the expected area of the claims the greedy allocation gives D (every claim counted against this face — the
conservative reading); `inscribedRadiusM` and `faceObb` are the pre-claim face's. S8 re-tests the requirement on the
committed template face (V01 §3.4.1), a failure there being F-TEMPLATE's under the land cap (V01 §3.3.7, V01 §3.13). Every
factor below is a `hood.constants` cell (its key in brackets; V01 §3.14).

| requirement | holds when (metres from the context) |
|---|---|
| `minFaceAreaM2Law: 'ring'` | `inscribedRadiusM ≥ 2.5 × eLo + w_tpl` [`elig.ringELo`] (one ring course with a band outside it and a centre inside it; `w_tpl` V01 §3.4.2 (b), at its band's upper end for this test) |
| `minFaceAreaM2Law: 'plaza'` | `templateFaceAreaM2 ≥ 6 ×` the plaza's area [`elig.plazaFaceMult`] (V01 §3.4.5 (a)) **and** `inscribedRadiusM ≥` the plaza's half-diagonal + `eLo` |
| `minFaceAreaM2Law: 'spine'` | `faceObb.minorM ≥ 2 × eLo + w_tpl` and `faceObb.majorM ≥ 3 × eHi` [`elig.spineEHi`] |
| `portals: n` | at least n usable portals (V01 §3.4.2 (a)) on the template face's boundary |
| `waterShare`, `wallShare` | that seam type's share of D's boundary length ≥ the value, and its longest run ≥ 3 × `eHi` [`elig.runEHi`]; `wall` counts only walled stretches — `full` and `parapet` runs, an `enceinte` closure arc (an earlier ring's curtain) among them; a closure-only arc of any other barrier kind types by its barrier and never counts (II.1's seam typing, item 541; item 106 (a), (c), (f)) |
| `noIntervallum` | the enceinte beside D has no intervallum (§4.8's era row) or the run is a `parapet` stretch |
| `landmarkSigma` | a reservation inside the template face whose class σ ≥ the value (the base's `character.anchorSigma`, §4.5, by default) |
| `bridgePortal` | a portal at a bridge's landward end lies on the template face's boundary |
| `slopeMeanPct` | `slope.meanPct ≥` the value |
| `crossingPairs` | two usable portal pairs whose chords cross inside the template face at ≥ 45° [`elig.crossAngleDeg`] (the anchors `pair:1`, `pair:2`, V01 §3.4.2 (a)) |
| `arenas` | D's arena is listed (every row lists `ground`; `sky` for all but `quay`, `wallside`, `bridgehead`) |

A district with no template face (every L1 face a wall strip, a reservation or an intramural garden, or a zero-area
face) has E = {`bent-cut`}; a requirement whose context value is absent (no water, no wall, no portal, no reservation)
fails.

#### 3.3.3 The weights (in-town)

`w_r = select.base × κ(D) × Π_terms (1 + gain × value) × (1 + plannedGain × intent.planned) × fabric.extensionWeight`,
with **`κ(D)` = `select.kind[D.kind]`**, 1 when absent — for a `sky-*` kind its ground counterpart's (V05 §2.4):
`sky-temple` reads `temple`, `sky-palace` `castle`, `sky-island` the town's richest ground kind (the kind of the ground
district with the highest pass-1 mean value, ties by address), `sky-prison` and `sky-tower` none (1) — and
`fabric.extensionWeight` is `hood.constants`' stage-2 switch (V01 §3.14, V01 §3.15; 1 in the default preset, **0 in the
`MFCG` and `FTG` parity presets**, §7.6 — so the parity presets lay every district with the bent cut, the M4 output — and
1 under `NG`, whose `ng.fabric` replaces this product by the four NG rows' `select.ngOdds`, each kept only when eligible,
every other row 0). A `stepped` row's weight is further × `min(2, slope.meanPct ÷ 8) × (1 + terrace.askGain × asks)` —
`asks` 1 when D's `terrace.asks` holds (V01 §2.3), `terrace.askGain` ours, `extension` — so a hill town's steep wards take
Terraces more often while every other row is unchanged (a terraced ward may still be organic: hill towns mix stair-lanes
with contour streets). Two terms read file g: every row with `plannedGain > 0` carries `{ of: 'shade', gain: −0.5 }` on
`shade.meanShare` — a quarter in shadow is less often laid out as a planned square, ring or main street (item 102 (a),
(d); ours, `extension`) — and the `street` row carries `{ of: 'chain', gain: 1 }`, 1 when an incompatible chain of D's
context runs `alongWay` a tier-1 way through D, so the stretched road becomes D's main street (item 104 (h) (3) as
revised). S7c never names or assigns a quarter: a quarter name arises only through item 72's identity rows past their
threshold or a dossier or author declaration (item 107 (e)), and a street's trade name through `WayNamingContext.trade`
(V01 §3.7.2). Default rows (ours, provenance `own`, calibratable; J-V1.4):

| row | base | kind factors | character terms (gain) | planned gain | requires |
|---|---|---|---|---|---|
| `bent-cut` | 1.0 | — | — | (−0.5, above) | always |
| `street` | 0.25 | market 1.5, gate 2, craft 1.2 | mainRoad 2; chain 1; shade −0.5 | 1 | spine law; portals 2 |
| `square` | 0.10 | market 3, central 2 | trade 1; shade −0.5 | 1.5 | plaza law |
| `ring` | 0.05 | — | shade −0.5 | 3 | ring law |
| `quay` | 0.8 | docks 2, riverbank 1.5 | sectors.trade 1 | 0 | spine law; waterShare 0.2 |
| `wallside` | 0.4 | gate 1.5 | shade −0.5 | 0.5 | spine law; wallShare 0.2; noIntervallum |
| `crossroads` | 0.3 | market 2, central 1.5 | trade 2; shade −0.5 | 1 | plaza law; portals 4; crossingPairs |
| `landmark` | 0.6 | temple 2, castle 1.5 | identity religious 1; shade −0.5 | 0.5 | ring law; landmarkSigma `character.anchorSigma` |
| `bridgehead` | 0.5 | riverbank 1.5 | trade 1 | 0 | plaza law; bridgePortal |
| `stepped` | 0.5 | — | — | 0 | spine law; slopeMeanPct 8 |
| `park` | 0.02 | park 40 | shade −0.5 | 1 | plaza law (green mode) |

The `stepped` row's 8 % threshold is its `slopeMeanPct` cell above, the one home §3.6 (8) cites. **Confirmation (M5,
B-CITY):** the share of districts not `bent-cut` lies in 15–35 % at CITY in the default preset (realism: most medieval
districts are organic; the named morphologies are the exceptions that make quarters legible), and S4 (b)'s classifier
(V01 §7) separates the templates at ≥ 90 %. *Pre-decided fallback:* all non-`bent-cut` bases scale by one common factor
to bring the share to 25 %, a declared shift; if the classifier fails, the failing pair's weaker row's base halves and its
seeds' distinguishing parameter (ring count floor 2; the street's control offset 0.2) is raised, and the classifier
re-runs.

#### 3.3.4 The draw

One uniform on `fabric.select`, keyed as V01 §3.12 states (the district's own lineage key with the reroll component
forced to 0): a New random on D never re-draws its fabric — "same kind, new seed" (II.4) keeps the layout kind — and
neither a declared quarter, a merge or split elsewhere, nor a Re-derive that renumbers S6's seed order moves another
district's draw. Nothing else in the town moves when one district's weights change.

#### 3.3.5 A standalone neighbourhood document's `auto` (NG's odds)

For `HoodRecipe.fabric = 'auto'` (V01 §3.10.1) the weights emulate NG 1.2.2's random-template odds among the four NG
rows: `bent-cut` 0.7, `street` 0.3, `square` 0.1, `ring` 0.1 (`select.ngOdds`; provenance `ref:NG 1.2.2 random template
weights (code)`; `code-neighbourhood.md` §2.0), each kept only when eligible, and a context row (`quay` with a water edge,
`wallside` with a wall edge) joins at its in-town weight × `auto.contextFactor` — in the default preset; under the `NG`
preset (`ng.fabric` on, V01 §3.15) only the four NG rows. The draw is on `blueprint.features` (V01 §3.10.1). `bent-cut`
is always eligible, so the draw always has a row.

#### 3.3.6 Epochs — the `hood.fabric` participant (volume 6)

`@plat/hood` registers `{ id: 'hood.fabric', step: 'afterGrowth', order: 40, stage: S9b, run }` (the order volume 6's
participant table gives it, after the underground's participants at 10–30) as volume 6's `EpochParticipant` (V06 §2.1;
§4.12's `StrategyRegistry`). A new growth stage's S5–S13 run (volume 6's step 14) carries both hooks, so a district that
stage creates gets its fabric inside its S7b and its new blocks their content inside its S10a. The participant covers
what that run does not:
(1) a district the epoch created outside S7b's hook (a face added to the hinterland and typed a district by the epoch's
growth decision) takes S7c's rule;
(2) every block in `EpochScope.recut` (V06 §2.1) — the blocks a rung-3 op of the epoch's ladder (step 11) re-cut or
redeveloped — is re-typed by S9b's rule (rungs 1–2 keep a block's content and enter no scope);
(3) the districts a raised part in the epoch's `scope.raised` crosses (V06 §3.19): their derived readings
(`DistrictContext`, the template face with the strip a hole, V01 §3.17.3 (2)) are recomputed on read and their close-up
chunks marked stale (V01 §3.8.4), so the hood pins re-derive over the **committed plot set** — the participant writes no
op for them, **no plot removal and no re-homing**: at an epoch the plots and households under a new strip are volume 6's
clearing and its commit's operator (V06 §3.19 (7)–(8); V01 §3.17.4), which run in its `raisedWays` step before this
participant, its households through the engine's ledger and `siting`;
(4) nothing else: a surviving district keeps its fabric and a standing square, green or manor block its content, as
every survivor keeps its geometry.
Its inputs are the epoch's new faces and due blocks (`EpochContext.doc`), `scope.recut` for (2) and `scope.raised` for
(3) (`EpochContext.scope()`, V06 §2.1); its outputs `setAttr` ops of `district.fabric`, `block.content` and
`block.squareType` in `EpochOps.ops`, drawn on `ctx.stream(S7c | S9b, entity)` (`epoch.transform`). An epoch with no new
face, no due block, an empty `scope.recut` and an empty `scope.raised` makes the participant write nothing. Item 102
(e)'s shade drift reaches it through the field it reads at the epoch; a newly shaded quarter's new blocks read the new
shade, its standing blocks never re-type. The epoch's undo is its one event's (§7.4's epoch row), the participant's ops
included; a saved and reloaded document replays them from the log.

#### 3.3.7 The template's land and the reconcile

`templateLandM2(D, r)`, the built land r's seeds take from D, is the sum over r's seeds on S7c's context (each factor a
`hood.constants` cell, `land.*`):
* **plaza** (carved or green): its `A` (V01 §3.4.5 (a)) at D's greedy inhabitants; a **void** plaza likewise its `A`
  (its corner claims);
* **spine** — the expected course length × `w_top`, the `secondary` class's band top (the width law's maximum,
  V01 §3.4.2 (b)); the length: a main or cross spine `land.spineFactor` × `faceObb.majorM`; a parallel spine the longest
  run of its seam type on the face (at most `faceObb.majorM`); a contour series `⌈e_fall ÷ s⌉ × faceObb.majorM`,
  `e_fall` the template face's width along `slope.fallCdeg` and `s` its `terraceSpacingM` (V01 §3.4.3), plus, when
  V01 §3.4.3's two-flank test holds on the pre-claim face, the thalweg path's length (the face's extent along its valley
  line) × the `path` class's width; a through street `faceObb.majorM` less the plaza's long side;
* **ring** — Σ_k 2π r_k × `w_top` over the expected series (V01 §3.4.4 with u at 0.5 and the spacing factor at the
  bell's mean): the rings with `r_k + eLo + w_top / 2 ≤ inscribedRadiusM − eLo`; a `landmark` row's precinct rings their
  courses' lengths × `w_top` (V01 §3.4.4 (3): each qualifying reservation's outline offset by `dBar + w_tpl / 2`), up to
  `landmark.maxRings`;
* **fan** — the row's most portals × ½ `faceObb.minorM` × the fan's class width;
* `bent-cut` — 0.

**The reconcile.** S7b (1)'s bounded reconcile (≤ 3 rounds, its own; §4.5, item 294) runs with each district's capacity
per band equal to its pass-1 built land — less the under-deck strips inside it, plus the capacity of the deck plots it
owns (V01 §3.17.4, V01 §3.17.6) — less its expected dispatch land (V01 §3.5.9) less `templateLandM2`, the template land taken
from the bands in proportion to their built-land shares in the template face. The households the reduced capacity cannot
hold move, in S7b's declared order, to the first district whose capacity holds them — households are the reconcile's
movable tail; institutions and workplaces never move for a template. A capacity the subtraction would take below 0 is 0
(the district then holds only its institutions and workplaces, its households moved). Nothing else about S7b changes.

**S8 honours the reservation.** The plaza's `A` is capped at the plaza land reserved (the reconciled inhabitants can only
lower it); a ring series ends when its laid corridor area would pass the ring land reserved × (1 + `land.ringSlack`); a
contour series ends likewise at the series land reserved × (1 + `land.ringSlack`), the one series slack; a spine is laid
by its law (its clip to the face can only shorten it). A row whose requirement fails on the committed template face (a
claim moved it) bends by F-TEMPLATE, and a substitute row is taken only when its `templateLandM2` on the committed face
is at most the land reserved, else the chain continues to `bent-cut` — keyed, never re-drawn (V01 §3.13).

**The draw is made once**, on the greedy χ̃ (J-V1.38). T-V1-12 reports the households unplaced per template class, with a
stress fixture that forces each class to 100 % of the districts in turn. *Pre-decided fallbacks:* if T-V1-12 fails, the
spine factor rises to 1.25 and the ring slack falls to 0, re-measured; if T-V1-2 (b) fails (the reconcile moved enough
households to change a district's character), the reconcile's re-homing is replaced by one re-run of S7b (1)'s greedy
pass on the reduced capacities — the same stream, the fabric choices kept.

#### 3.3.8 The kinds and their layouts (S4 (a))

Which rows suit which district kind — the kind factors of V01 §3.3.3 made explicit, and the rows T-V1-6 counts. Any
eligible row may still be drawn by the weights; the table names the rows a kind is expected to offer. A kind without a
row here (a registration's new kind) offers every eligible row at κ = 1.

| district kind | the rows it offers | note |
|---|---|---|
| market | `square`, `crossroads`, `street` | its market is its reservation (item 24); the template frames it |
| central | `square`, `crossroads` | |
| gate | `street`, `wallside` | |
| docks | `quay` | |
| riverbank | `quay` (`plotRow`: NG's planned "river bank"), `bridgehead` | NG-VC-3 |
| temple, castle | `landmark` | the ring round the precinct |
| craft, sprawl, suburb | `street` | |
| park | `park` — a green-mode plaza sized by §4.9's parks row with a fan of 2–4 paths | NG-VC-3's planned "park" |
| shanty | `bent-cut` only | informal fabric (item 70); its only row is NG's `area` |
| hinterland, underground, undercity | excluded | their own recipes (§4.9, II.7): S7c never lays them (V01 §3.3.1 step 2) |
| the sky kinds (`sky-island` and the institution rows', V05 §2.4) | excluded from T-V1-6 | an island's districts are drawn in its unit run with volume 5's `fabricHint` (V01 §3.10.3) |

