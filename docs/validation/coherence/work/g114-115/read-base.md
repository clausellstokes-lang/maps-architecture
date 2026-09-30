# READER base: prosperity, floating islands, tools and lifecycle (for g items 114 and 115)

The sources are the coherence pass's rewritten base section files, which are the text that WILL be assembled. The
abbreviations used below:

- **PIPE**: `docs/validation/coherence/new/base/pipeline/01-s4-generation-pipeline.md` (§4)
- **CONT**: `…/pipeline/02-s10-simulation-content.md` (§10)
- **II6**: `…/pipeline/09-ii6-staged-layers.md` (II.6)
- **II7**: `…/pipeline/10-ii7-sewer-layer.md` (II.7)
- **MODEL**: `…/model/01-domain-model-and-schemas.md` (§2)
- **DET6**: `…/determinism/02-s6-determinism.md` (§6)
- **EDIT**: `…/determinism/03-s7-editing.md` (§7)
- **FAIL**: `…/determinism/01-s5-failure-handling.md` (§5)
- **R8**: `…/rendering/01-s08-rendering-and-the-style-system.md` (§8)
- **R11**: `…/rendering/03-s11-export-and-interop.md` (§11)
- **R12**: `…/rendering/04-s12-performance-budgets.md` (§12)
- **S1**: `…/scope/05-s1.md` (§1)
- **S13**: `…/scope/06-s13.md` (§13)
- **S14**: `…/scope/07-s14.md` (§14)
- **DEL**: `…/scope/11-delegated.md` (D-n)
- **JUD**: `…/scope/12-judgment.md`
- **S0**: `…/scope/03-s0.md` (the §0 index)

Every path above sits under `docs/validation/coherence/new/base/`. The scope part is still being finished; I cite it only
where no other home exists. Line numbers are from the files as I read them on 2026-09-30.

A fact that comes from a live volume, not the base, is marked **[vol]**.

---

## A. PROSPERITY

### A1. The field: its formula, drivers, ε, clamp and passes (§4.5 *Fields*, PIPE 1133–1156)

- **Formula.** `P(x) = Σ_i w_i · kernel_i(x) + characterOffset(district) + ε(x)`. It is **clamped once to [0, 1]**.
- **Driver kernels.** The kernels come from a table:
  - distance decay to the plaza and to every market (the principal at the row's full weight, a secondary at the
    secondary row's weight, item 24), to main streets, to gates, to water and to the harbour (+);
  - elevation above the flood line and upwind (+);
  - low, damp, downwind and flood-prone ground (−);
  - walls (−);
  - attractors at the reserved institutions (castle, precinct, plaza);
  - the intent's **wealth gradient**, a planar ramp toward `Intent.wealthGradientCdeg` with weight
    `drivers.wealthGradient` = **0.15** (0 when no bearing is set and in the parity presets);
  - the **daylight term** and the **water term**;
  - "the three dials' driver terms and the district pressure (item 72)".
- **ε.** A low-frequency fBm drawn from the field's own sub-stream (`field.chance`, DET6 l.128), with a declared share
  of **0.15** by default.
- **Smoothing.** A Gaussian of one block width (σ ≈ 60 m at CITY). The field is stored per coarse face and as a raster
  of 32 m cells over frame + margin.
- **Two eager passes (LC-2).**
  - **Pass 1** runs at S6. It first applies the driver kernels that exist after S5, terrain and wall shade included;
    S6's typing reads this driver-only state. After typing it adds the district-type term `characterOffset(district)`,
    which completes pass 1. S8's block bands read the complete pass 1.
  - **Pass 2** runs at S10a. It adds the kernels at the noxious trades, prisons, middens and institutions that S10a (i)
    placed, and the positive landing kernel at each ground sky landing (V05 §3.10). It also ORs every live sky island's
    shade strip into the daylight mask (V05 §3.19). Everything from S10 onward reads pass 2.
- **Island-free value.** The same composition without the island strips. It is "composed at an epoch's evaluation for
  the island supply law alone and never stored" (V05 §3.15 (1)). At S7b the supply law reads pass 1, which holds no
  island bits.
- **The drivers oracle.** `ProsperityField.drivers(points): FieldDrivers` evaluates each term separately: every kernel,
  daylight, water, `characterOffset`, the brush composite, an epoch's drift, and ε as `chance`. The terms "sum, before
  the clamp, to the stored value" (PIPE 1152–1156; item 102 (f), item 101 (d)).
- **Soft terms.** One contract covers them all (PIPE 1157–1171; E-36; items 102, 103, 105, 107, 111). Each soft term
  declares its weight cell (§7.6), its kernel and its bar. At weight 0 the model is byte-identical to the model without
  the term. Soft terms are summed, never iterated, and they yield to dossier facts, assignments, pins, locks and
  declared places.
- **Density and greenery fields.** Both use the same construction with their own `FieldBands` (PIPE 1250–1251).

### A2. `characterOffset`: every writer

- **The district-type term** `characterOffset(district)` is applied after typing, as the last step of pass 1
  (PIPE 1146, 1251).
  - The slums reach the squalid band "through the kind's `characterOffset`" (PIPE 1394–1395).
  - **Gap:** no base table declares the per-kind values. `DistrictKindRow` (CONT l.102) has only `relations` and
    `affinity`.
- **The wealth level** reaches it through the intent's expansion (EDIT §7.7 layer 1, l.1401–1405):
  `wealthLevel ∈ [0, 1]` → `field.characterOffset = lerp(−0.3, +0.3)`.
  - The same expansion gives `granularity.joinMaxBonus = 2 · wealthLevel`. Its fractional part is the probability of
    one more join, drawn on `plot.join`.
  - It also gives `greenery.parkPer1000 = lerp(0.1, 0.8)`.
  - The base never states how the town-wide `field.characterOffset` parameter composes with the per-district
    `characterOffset(district)`. The reading is that they sum, but that is not written.
- **The quarter dial** adds `dial.quarterWeight × (A_p − 1)` in pass 1 (PIPE 1459–1461).
- **The pressure** adds `pressure.weight × pressure` (0.5) at the next epoch's pass 1 (PIPE 1483–1484).
- **Volume uses [vol].**
  - V01 l.1916: a standalone neighbourhood uses `characterOffset = intent.wealth − 0.5`.
  - V05 l.1332: an island field takes `characterOffset` from the island's supply `h(S_carried)`.
  - V06 l.434, 1149–1151: `EpochInputs.wealthLevel` re-runs the layer-1 expansion (`field.characterOffset`) before S6.

### A3. The daylight term (item 102) and the water term (item 111 (b)) (PIPE 1166–1167, 1173–1201)

- **Daylight.** The term is `−w_sun · shade(x)`, with `w_sun` × the climate row's sunlight cell. That cell is 1 in
  temperate and cold rows, and 0 or negative in hot arid rows.
  - Its own limit: "at full all-day shade about a tenth of a band's width; never alone moves a plot across two bands".
  - Terrain and wall shade enter in pass 1; island shade enters in pass 2. "The island supply law reads the field
    before the island term."
  - The sampler: nine equinox hour angles; one point per 32 m cell (`daylight.pointsPerCell` 1, fallback 4); the
    latitude from DR29, else the intent's, else 50°.
  - Casters: terrain, walls, gatehouses, the castle, great towers, raised ways and retaining walls in pass 1; islands
    in pass 2. At an epoch the previous epoch's buildings also cast.
- **Water.** The term is `+w_waterP · q(x)`, where `q` is S3 (6)'s proximity to reliable water and `w_waterP` is the
  climate row's prosperity water weight.

### A4. The bands: `prosperity.bands`, `FieldBands`, the middle band and the hysteresis

- **The band set** is one named, versioned table, `prosperity.bands` (`BandSet`; §7.6) (PIPE 1202–1231).
  - It is read by: granularity and the designation templates; greenery; the hidden-plot shares; **the island supply
    law (II.6)**; the ladder rows; the interior ladder; the roster's household and lifestyle rows.
  - **Six bands, in order:** `squalid`, `poor`, `modest`, `comfortable` (the middle band), `prosperous`, `rich`.
  - Their default household shares, from FTG's weights 1 / 1 / 20 / 40 / 20 / 10, are **0.011 / 0.011 / 0.217 / 0.435
    / 0.217 / 0.109**.
  - Each band maps to an FTG tier (squalid, poor, modest, comfortable, wealthy, aristocratic) and an MFCG ward class
    (slum, slum, craftsmen, craftsmen, merchant, patriciate).
  - A rule table may carry rows for some bands only. A band without a row interpolates linearly between the centres of
    the nearest rowed bands, and an end band takes the end row.
- **The `FieldBands` record** (MODEL §2.5 l.628–631) holds:
  - `field: 'prosperity'|'density'|'greenery'`
  - `cuts: number[]`: ascending, on the field's [0, 1] value
  - `hysteresis`: default **0.02**
  - `bands: string[]`: `cuts.length + 1` ids
  - `middle: string`
  - `source: 'roster-shares'|'table'|'edit'`
  - `epoch: number`
- **How the cuts are set** (PIPE 1232–1239). They are computed **once per town** at S6, so that each band's share of
  built land equals its share of the plot land the roster demands (household wealth shares × plot areas).
  - They move **only** by an explicit `setAttr` on the record (which re-derives every block whose band changes) or by
    an epoch. A field brush never moves them.
  - A block keeps its band unless its value crosses a cut by more than the hysteresis (0.02).
  - **The cuts are per-town quantiles: "rich" is relative to the settlement.** PIPE 2544–2546 (item 71 (b)) says this
    outright; V05 §3.3 [vol] is why the island supplies read absolute values.
- **The middle band** is the band holding the median household under the wealth shares. Under the defaults that is
  `comfortable` (cumulative 0.239 after modest, 0.674 after comfortable). It is recorded as `FieldBands.middle` at S6
  (J-A27.42).
- **Absolute band values** [vol, V05 §3.3]. A band's value `v(b)` is the midpoint of its two cuts; the lowest band's
  lower cut reads 0 and the top band's upper cut reads 1.

### A5. The band range `[floor, ceiling]` and `BandRangeRow` (item 72 (d‴))

- **The owner's words:** "this neighborhood prosperities defines the bounds (floor, and ceiling) of what any building
  inside of it can be" (PIPE 1422–1443).
- **The record.** `District.bandRange: [string, string]` is "the floor and ceiling bands (FieldBands.bands ids) … derived
  by S10a from its prosperity value through §10.2's bandRanges rows". It is **recomputed on load and sits outside the
  model digest** (MODEL l.590).
- **The row type.** `BandRangeRow { band: string; lower: [string, string] /* [floor, ceiling] for a district in the
  band's lower half */; upper: [string, string] }` (CONT l.348), held in `RosterTables.bandRanges` (CONT l.47).
- **Default rows** (CONT l.396–398):

  | district band | range (both halves unless noted) |
  |---|---|
  | squalid | squalid–poor |
  | poor | squalid–modest |
  | modest | poor–comfortable |
  | comfortable | modest–prosperous |
  | prosperous | comfortable–rich |
  | rich | prosperous–rich in the lower half; **rich alone** in the upper half |

- **When it is computed.**
  - S7b (1) allocates by a provisional range, read at the district's area-weighted mean **pass-1** value. It is never
    stored.
  - S10a (ii) writes `bandRange` from the area-weighted mean **pass-2** value.
  - S10a then re-homes each household S7b placed outside the written range, before (iii). The re-home ladder is:
    (a) the first district whose range admits the band and whose capacity holds it; (b) the district whose range lies
    nearest, its band read at the range's nearest end (reported as a derived band); (c) for a household that fills a
    dossier's population, its own district, housed by re-provision and never a shortfall. Otherwise the household
    meets F-SITING.
- **What the range binds.** Every prosperity-driven state of a building stays inside the range:
  - the class drawn (item 71's weights outside the range are 0, the rest renormalised);
  - the template band read (outside the range, the nearest end);
  - condition and upkeep;
  - extensions;
  - the occupants' band and the interior-ladder rung.
- **Limits on the range.** "The range always holds the district's own band" (J-A72.50). No cluster or hovel goes up
  where the range excludes squalid. Item 31's geometry floor still keeps a standing shell.

### A6. The three dials, their hysteresis and the pressure (item 72 (d″), (d4); PIPE 1444–1486, 2276–2280 of §4.11)

- **What the dials are.** Driver terms with declared weights, each clamped inside the district's range.
- **What they read.** The *applied* standings and shares (`PowerStanding.appliedStanding`, and each sector's applied
  share), which are never stored. These come from `CircumstanceSlice.powers` and `economy`.
- **Institution dial.** `A_p = N × appliedStanding_p`. An instance's term is
  `dial.institutionWeight × Σ_p w_i(p) × (A_p − 1)`. It scales the institution's attractor kernel in pass 2 and steps
  its condition by one step per `dial.conditionStep`.
  - Legitimacy multiplies the governing `A_p` (`PortRows.legitimacy`; 1 while empty).
  - A non-physical impairment lowers the institution's own term.
- **Quarter dial.** `dial.quarterWeight × (A_p − 1)` added to `characterOffset` in pass 1. At generation it applies
  only to a dossier-declared district-defining quarter; for an emergent identity, only from the next epoch.
- **Economy dial** (owner: "the market share affects their application").
  - `A_s = S × share_s`, where S is the number of sectors the slice lists, so an even mix gives every `A_s` = 1.
  - An instance's value is `A_i = Σ_s w_i(s) × A_s`, and its term is `dial.economyWeight × (A_i − 1)`.
  - The term scales its class's driver kernel **in both passes** and steps its condition. "There is no term for rank"
    (J-A72.49).
  - The same shares shift S2's town-level character (J-A72.43).
- **Trade as a driver.** The gate and main-street kernels are × (1 + `trade.kernelScale` × trade weight), with
  `trade.kernelScale` 1.0.
- **Defaults.** `dial.institutionWeight` 0.10, `dial.quarterWeight` 0.08, `dial.economyWeight` 0.10,
  `dial.conditionStep` 0.05. All are `extension` values, set to 0 in the parity presets.
- **The dials' hysteresis** (§4.11 *The dials' inputs over epochs*, PIPE ≈3411–3416). At each epoch, before S6, the
  applied standing and applied share move to the epoch's values only past **`dial.hysteresis` = 0.05** (a dial-table
  row). Both are folds over the epochs' slices.
- **The pressure** (item 72 (d‴), (8); PIPE 1479–1486).
  - At each epoch's character step, `District.pressure` becomes
    `pressure.retain × pressure + Σ σ_i × excess_i ÷ Σ σ_i`, with `pressure.retain` 0.5. Here `excess_i` is the amount
    by which the amplified value would lie above the ceiling band's upper cut (or below the floor band's lower cut).
  - The next epoch's pass 1 adds `pressure.weight` (0.5) × pressure to `characterOffset`.
  - The pressure is model data in the digest, written only by epochs. With no epoch it is 0.
- **The significance weight σ** (PIPE 1351–1358) is `row.significance × rank × size (clamped [0.5, 2]) × patronage
  (clamped [1, 2])`.

### A7. How a plot's or building's class follows its band; a rung does not cap the richest class

- **The class mix (item 71; PIPE §4.7, s47 extract ≈ PIPE 2532–2570).**
  - A residential class is drawn from `RosterTables.classMix` (`ClassMixRow`, CONT l.332–334), one row per band, read
    at the plot's **manifested** value by interpolation. The draw is keyed on `siting` by plot, and its weights are
    clamped into the district's band range.
  - **Town wealth shift:** each weight is × `max(0, 1 + wealthShift × (wealthLevel − 0.5))`, then renormalised.
    `wealthLevel` is the intent's, or with a dossier the one DR6 derives. "The cuts stay the town's own" (J-A71.42).
  - The largest class goes to the highest-prestige plot, with sun as a tiebreak.
  - Default rows (CONT l.358–363):

    | band | weights |
    |---|---|
    | squalid | hovel 0.8, row house 0.2 |
    | poor | hovel 0.3, row house 0.6, cottage 0.1 |
    | modest | row house 0.6, cottage 0.2, house 0.2 |
    | comfortable | row house 0.3, house 0.6, town house 0.1 |
    | prosperous | house 0.5, town house 0.35, manor 0.15 |
    | rich | manor 1.0 |

  - Default `wealthShift` values: manor +1.0, town house +0.5, house 0, cottage −0.2, row house −0.3, hovel −0.6.
  - The parity presets use a step at each cut, with `wealthShift` 0.
- **S10b and S11.** Every prosperity-driven read (class, template band, condition, occupants' band, mutator steps) is
  clamped into the band range (PIPE ≈2568–2570).
- **Designation templates.** One row per band. Continuous columns interpolate along the value; discrete columns switch
  at the cut (CONT l.83; §4.7 S11).
- **Manifested band and geometry floor** (§4.11, PIPE ≈3031–3068).
  - `geometryFloor = min(builtBand, FieldBands.middle)`. The manifested band is `max(field band, geometryFloor)`.
  - Geometry reads the manifested band. Occupants, condition and names read the field band.
  - `builtBand` and `builtProsperity` are persisted and never recomputed.
- **A rung does not cap the richest class.** `RungProfile` (S1 l.43–55) has no band cap. Its only band-keyed entry is
  `granularity.joinMaxDelta: Record<ProsperityBand, number>`, the "rich join max +" column: TOWN 0, CITY 0,
  METROPOLIS +1 (S1 l.63–65).
- **Shanty trigger.** A `shanty` kind is admitted only when the roster's average band is `poor` or `squalid`, after
  `shanty.afterStageShare` 0.5 (PIPE 1121–1129).

### A8. The offsets below ground (II7)

- **Underground.** `ContextVector.prosperity` is the ground raster at the frontage midpoint + `undergroundOffset`
  (**−0.25**), clamped to [0, 1] and banded by the town's `FieldBands` (II7 l.169–171; row l.335).
- **Undercity.** The parent district's field is shifted by `undercityOffset` (**−0.35**) and banded by the town's
  `FieldBands` (II7 l.444–446; row l.507).

### A9. Every place a ceiling, cap, clamp or maximum appears in these mechanics

1. `P(x)` is clamped once to [0, 1] (PIPE 1134). The brush composite is also clamped once, at the end (EDIT §7.2
   l.≈512). The underground and undercity values are clamped to [0, 1] (II7 l.171).
2. **The band range's ceiling** (item 72 (d‴)) is the only named "ceiling" in the prosperity mechanics. It is
   per-district, derived, and bounds building states rather than the field (A5).
3. The dials are clamped inside the range. The excess above the ceiling band's upper cut feeds the pressure (A6).
4. σ's size factor is clamped [0.5, 2] and its patronage factor [1, 2] (PIPE 1355–1357).
5. `wealthLevel ∈ [0, 1]`, and the character offset's range is `lerp(−0.3, +0.3)` (EDIT l.1401–1402).
6. The class-mix wealth multiplier is `max(0, …)`, floored at 0 and uncapped above (PIPE ≈2544).
7. The geometry floor is `min(builtBand, middle)`, a floor rather than a ceiling (§4.11).
8. The daylight term's own limit: about a tenth of a band's width, and never alone across two bands (PIPE 1166).
9. The rung's `joinMaxDelta` for the rich band (A7). II.6's `areaHaMax(rung)` caps an island's area (B2).
10. Absent from the base:
    - a town-wide maximum prosperity;
    - a cap on the richest band's share (the household shares come from the roster);
    - a cap on `FieldBands` cuts beyond [0, 1].

### A10. The wealth level `wealthLevel`: every consumer in the base

- **The field.** Via the expansion rows: `field.characterOffset`, `granularity.joinMaxBonus` and
  `greenery.parkPer1000` (EDIT l.1401–1405).
- **The class mix** (item 71 (b); PIPE ≈2544; CONT l.333; J-A71.42).
- **The TOWN sewer law** (§4.2 S0, PIPE 248–250; II7 l.32–35). P(sewers) = clamp(base + populationWeight ·
  (population − 1 500) ÷ 8 500 + wealthWeight · wealthLevel, 0, cap). The defaults are base 0.05, populationWeight 0.25,
  wealthWeight 0.30 and cap 0.60, drawn on `blueprint.features`.
- **DR6** (EDIT l.1746). The dossier's `wealth.label` goes to `intent.wealthLevel` by `tables/dossier/wealth`. Over
  epochs the changed word arrives as `EpochInputs.wealthLevel` (receipt F9, W-DOS-02). The bar: "the
  population-weighted mean band within one band of the wealth row's band".
- **DR8** reads `intent.wealthLevel`, and **DR27** reads `wealth.label`, which DR6 turns into the field and so into
  `S_town`.
- **The control registry.** `wealthLevel` → "median plot area and greenery share" (EDIT §7.8 l.1944). It is in the basic
  panel as "wealth level" (l.2001).
- **Tests.**
  - §13.2 runs a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (S13 l.224).
  - T15-1 runs islands at `wealthLevel` 0.5 and 1 (S13 l.377).
  - S5d's test cites the B-CITY `wealthLevel` sweep (PIPE 1029).
- **What does NOT read it.** The household band shares at S2: "Residential band shares are the roster's household
  wealth shares (shifted by the town-level character, which S2 reads from the circumstances' economy slice…)" (PIPE
  434–437; CONT l.243–245).
- **Gap:** DR7 (EDIT l.1747) lists `wealth.label` among the inputs for household bands, but no S2 or §10.2 rule shifts
  the shares by it.

### A11. The per-district intent `DistrictIntent.wealth`

- It is declared in EDIT l.1497 (0–1; absent means derived). It is settable by `setAttr` on a district (EDIT l.294,
  l.419).
- **Gap:** I found no consumer in §4 or §10. It is unwired in the base; the only use is V01's standalone
  `intent.wealth − 0.5` [vol].
- These edits can also move prosperity: T5 `quarter`'s band option, which writes a `setField(prosperity)` stroke moving
  the mean to the band's centre (EDIT l.438–439); the sky island's `field.prosperity` declared target mean (EDIT
  l.304); and the T8 brush.

---

## B. FLOATING ISLANDS

### B1. D-3 and J-A10.01 (DEL l.28–38; JUD l.433)

"Fantasy exists only as named toggles, each off by default: floating islands and their conjured rivers — a model setting
`recipe.layers.islands`, off by default, that exists only at CITY and METROPOLIS and only where prosperity supplies it,
the sky layer's view toggle showing islands and never creating them (II.6, items 10, 13 and 15; J-A10.01); … magical
lights, which exist only under the S0 circumstance `magic` (`none` by default, item 68)".

### B2. II.6 as the base states it (II6 l.7–27, 45–107)

- **Two reasons** (`SkyIsland.reason`):
  - `prosperity`: the island carries a very prosperous neighbourhood or set of neighbourhoods. By rule, where the model
    setting is on, the rung admits islands and a slot opens, S7b (5) allocates the roster's richest demand to it.
  - `institution`: one unique institution from an `IslandInstitution` row (palace, cathedral, prison), or named by an
    assignment.
- **(1) Two settings, not one.** `recipe.layers.islands ∈ {'off','on'}` is a MODEL setting, off by default under D-3,
  so the realism base's ground stays byte-identical to the realism golden. Changing it is an `adjust` that re-derives
  from S7b. The sky layer's `LayerSpec.visible` is the VIEW toggle: it creates nothing and leaves the digest unchanged
  (J-A15.41).
- **(2) The rung gate.** `RungProfile.layers.islands` is `none` at TOWN and every village rung, and `possible` at CITY
  and METROPOLIS. The rung is read at generation and, at an epoch, from that epoch's population target (J-A13.41).
  **II.6 lists no magic condition in its gate** (see B6).
- **(3) The supply.**
  - `townSupply` = `h(S_town)` of the area-weighted mean prosperity over built land. It is one scalar per town,
    recomputed per epoch, and read on the **absolute** value.
  - `carriedSupply` = `h(S_carried)` of the band values of the households carried.
  - Both are value-keyed rows: 0 up to the threshold, rising to 1.
  - "No island exists where `h(S_town) = 0`".
  - A dossier `magical_node` (state `available`, or `discovered` from the next epoch) raises `h(S_town)` by
    `node.bonus` = **0.25**, clamped to 1, and only where `h(S_town)` is already above 0.
  - An `institution` island reads the same gate (J-A10.41).
- **(4) The count.** 0–3, drawn once per town on `island.place` from three ordered slots (`SkyIsland.slot`). A
  requested or edited count is `recipe.params['islands.count']`.
  - Slot k opens with probability `chance_k · h(S_town)`, and only if slot k−1 opened. The defaults are **0.6, 0.5,
    0.35**.
  - The count depends on the seed and prosperity, never on the toggle (J-A15.42).
  - At an epoch, a slot not holding a supplied island is re-drawn at `redrawPerYear` **0.1**, converted as
    1 − (1 − p)^years.
- **(5) Size and altitude.** The supported area is `A = areaHaMax(rung) · h(S_carried) · h(S_town)`. The altitude is
  `E_min + (E_max − E_min) · h(S_town)`. S7b (5) fills from the richest band down until A's plot land is used or three
  districts' worth are allocated. `A = 0` means no allocation (J-A10.43).
- **(6) Over epochs.** The supply is re-evaluated. A shrink of more than 0.05 of the area causes a resize. `h` falling
  to 0 makes the island wane, settle and fall. Regrowth re-floats before it raises (J-A10.42).
- **(7) Editable.** The count, slot, area, altitude and state take `setAttr` and `lock`. A locked slot is never re-drawn.
- **(8) Emulation.** No reference has islands; with the setting off nothing runs.
- **Magical lights** are scaled by `h(S_carried)`: "magic is the resource that keeps it aloft" (II6 l.26–27).

### B3. S7b (5): sky pseudo-districts (PIPE 1308–1320)

- **When it runs.** When `recipe.layers.islands` is on for a rung whose row admits islands, S7b first draws the island
  count on `island.place` by II.6's count law.
- **Each open slot.** It creates a sky `Allocation` before any island exists, filled from the richest band down under
  the supply law.
  - Plot land = `A(S_carried, S_town)` × `plotShare` (V01's `hood.constants.sky.plotShare`), recomputed as households
    are added, until used or three districts' worth.
  - A slot with A = 0 gets no allocation.
- **Order.** Step (5) runs **first** among S7b's steps: (5), (6), (7), (1), (2), (4), (3).
- **What it reads.** It reads pass 1, which holds no island bits (PIPE 1150–1151).
- **SKY.** `SkyStrategy` is registered after S7b by declared I/O and places each island.

### B4. The `SkyIsland` record (MODEL l.1736–1743; the staged layers, l.1932–1934)

- The record is declared as V05 §2.1 gives it.
- **What the base reads:** `key`, `slot` (1–3), `rim`, `land`, `anchor`, `elevationCm`,
  `state` ('floating'|'waning'|'settled'|'fallen'|'removed'), `shadeBasis`, `removed`, `removedAccesses`,
  `supply` (S_town and S_carried), `districts`, `allocation`, `reason`, `institution`, `terrain`, `terrainEcho` and
  `lifecycle`.
- "An island exists **only where prosperity supplies it**".

### B5. The model setting, the rung row and the recipe's home

- **Where the name appears.** `recipe.layers.islands` is named in II6 l.10 and l.51, PIPE 1309, EDIT l.304, l.1426
  ("the recipe's feature set holds `layers.islands`") and l.1954, S13 l.373, DEL l.29 and PART III (`layers.islands =
  'none'` at village rungs, `…/pipeline/11-part-iii.md` l.47).
- **Gap:** §2.9's `interface Recipe` (MODEL l.2294–2305) has **no `layers` field** and no "feature set" field. Its
  fields are:
  - `seed`, `rung`, `tablePins`, `product?`, `hood?`, `packs`, `params: ParamDelta`, `presetId?`;
  - `intent: Intent`, `districtIntent: DistrictIntent[]`;
  - `history?`, `circumstances?: CircumstanceTimeline`, `entryMode`, `salts`.

  `islands.count` lives in `recipe.params['islands.count']`, so `layers.islands` is presumably a `params` path, but that
  is unstated.
- **The rung row.** `RungProfile.layers: { islands: 'none'|'possible'; sewers; undercity }` (S1 l.54). The column reads
  THORP, HAMLET, VILLAGE and TOWN `none`; CITY and METROPOLIS `possible` (S1 l.60–65; J-A13.01).

### B6. The magic circumstance: its values, where it is derived, and what reads it

- **The record.** `CircumstanceSlice.magic: 'none'|'low'|'high'` (item 68; "'none' by default under D-3") (EDIT
  l.1502).
- **In S0's blueprint** the circumstances hold `economy, magic: 'none'|'low'|'high'` (item 68: "'none' by default, a
  fantasy toggle under D-3; **read by §8.4's light rows**") (PIPE 220–221).
- **Persisted.** The creation slice is the first entry of `Recipe.circumstances` (EDIT l.1419–1421).
- **Base readers:**
  - the light rules (`LightRule.magic?`, PIPE ≈2430–2461);
  - `QuarterIdentityRow.magicOnly` (CONT l.345);
  - the classes' `arcane` powers ("only where the magic circumstance or a dossier arcane power admits it", CONT l.388);
  - a standalone `arcane` standing "arises only under a `magic` circumstance above `none`" (EDIT l.1461–1462);
  - II.7's magic lights and ruins (II7 l.232, 573);
  - the sky access kinds, "re-checked against `magic`" (EDIT l.304).
- **With a dossier.**
  - `DossierDigest.site.magic: string` (S14 l.244).
  - The row set `tables/dossier/magic` (S14 l.369), whose default rows V08 §2.6 writes.
  - [vol] V08 l.361 and l.952: `magicLevel` → `site.magic` → `CircumstanceSlice.magic`. J-V8.47 reads SF's `medium` as
    `low` ("D-3's realism floor keeps magic present but not shaping the town unless the dossier says `high`"; 32 of 35
    births are `medium`).
  - SF's own `magicLevel` values are none, low, moderate→`medium`, high (research/sf/dossier-model.md l.90).
- **DR27** (formerly DR-SKY, numbered by IN-V05-3) (EDIT l.1767).
  - What it derives: the islands' gate, count, reason, size, altitude and access kinds.
  - Its inputs: the population (DR23); `wealth.label` (DR6); the households' bands (DR7); the institutions (DR9, DR24);
    the ladder records; the district-defining records; `government`; **`site.magic`**; `site.deposits` (the
    `magical_node`); the custom and active chains.
  - Its chance: `island.place`. Its bar: "every bound CITY or METROPOLIS map with the setting on has its gate
    resolved…".
- **The refusal in §7.7 item 11** (EDIT l.1802–1803): "Where the dossier's `site.magic` resolves `none`, the islands
  setting is refused (DR27; V05 §4.4)."
- **Gap:** only the dossier's magic gates islands in the base, and only via DR27 and item 11. II.6's gate (1)–(2) omits
  it.
- **[vol] V05 §3.2 (1), the `skyGate`.** Islands exist only if all of these hold:
  - `recipe.layers.islands = 'on'`;
  - `RungProfile.layers.islands = 'possible'`;
  - the recipe is not a parity preset's;
  - for a dossier-bound document, magic ≠ `none`.

  It reports `islands: off`, `gated: rung` or `gated: dossier magic`. For a **standalone** document there is no magic
  gate at all.
- **[vol] V05 §4.4.** A dossier change of `site.magic` to `none` at an absorb makes every island's target 0 at the next
  epoch: they wane, never vanish.
- **[vol] V05 §3.2 (5).** The report's "Islands are on, but the city is not prosperous enough…" names the remedies "raise
  the town's wealth (T1 `intend`), or place an island by hand".

### B7. The view toggle

- `LayerSpec.visible` on `sky` "shows the islands a settlement has and never creates one". Hiding it changes no digest
  (R8 §8.4 l.831–842; EDIT §7.8 l.1955–1957; J-A15.41).
- The island states are drawn per R8 l.576–578.

### B8. Islands over epochs (§4.11, PIPE ≈3561–3573; DeclineOp PIPE ≈3595–3600)

- "Each epoch re-reads the rung from its population target … and re-evaluates II.6's supply law".
- A shrinking supply resizes the island (`resizeIsland`). A supply at zero, or a fall below the CITY band, runs
  `waneIsland` → `settleIsland` → `fallIsland`, with a landfall conversion. Regrowth runs `refloatIsland` before
  `raiseIsland`.
- Every island draw is on `island.place`, keyed by lineage and epoch.
- An author's removal is `removeIsland`: the record is kept in state `removed`, holding its slot.
- The epoch steps are called once per epoch as `IslandEpochStep` (V05 §3.15).

### B9. Tests (S13 l.368–377)

- **T10-1:** 200 CITY seeds with the setting on. A town supply below the threshold gives 0 islands, and the area is
  monotone in both supplies.
- **T13-1:** TOWN and village requests never carry a sky allocation. With the setting off, a CITY's ground digest
  equals the realism golden.
- **T15-1:** 500 CITY seeds at `wealthLevel` 0.5 and 1. The counts lie within ± 3 s.e. of the slot law, where P(0) =
  1 − 0.6 · h(S_town). A rich-band fixture observes every count 0–3. Hiding the sky layer changes no digest.
- **T8-6:** a CITY that drops below 10 000 loses its islands over their dwell spans, never in one epoch.
- The sky's own bars are V05 §7's T-V5-1 to T-V5-32.

---

## C. TOOLS AND LIFECYCLE

### C1. The standalone basic panel and T1 `intend` (EDIT §7.8 l.1998–2008; S14 l.421)

- **The basic panel holds ≤ 12 controls:** seed (with Surprise me), size rung, water setting and side, walls, castle,
  gates, features (one strip: plaza, temple, shanty town, farms, greens), planned ↔ organic, **wealth level**,
  greenery, style preset, labels.
- **T1 `intend` "is this panel, not a thirteenth control".** Its site cards are the water setting, form and
  era-and-region preset; its size is the rung. It has "**its wealth slider**" and "its walls chip (none · one ring · two
  rings)" (J-A101.77).
- **The wealth slider is `Intent.wealthLevel`.** Its range is `[0, 1]` (`wealthLevel: number /* 0–1 */`, EDIT l.1474;
  expansion l.1401). Its registry output metric is "median plot area and greenery share" (l.1944), and it is
  continuous.
  - **Gap:** the base states no default value for `wealthLevel`. The sweep and T15-1 use 0.5 as a reference point.
- **There is no economy slider in the standalone panel.** The standalone economy is "the blueprint's economy setting,
  by default an even mix, which amplifies no class" (EDIT l.1452–1453). Its sector set is §10.2's `sectors`: trade,
  taxes and tolls, crafts, agriculture, extraction, fishing, finance, religion, military, magic, crime (EDIT l.1510;
  CONT l.391).
- **There is no magic control anywhere in §7.8.** Magic is an S0 circumstance (B6) with no registry row.
- **The islands control** sits in the advanced panel, outside the basic count (EDIT l.1952–1957):
  - `recipe.layers.islands` (off / on; consuming stage S7b; locality *re-derive from S7b*; discrete);
  - `islands.count` (`auto`, 0–3; item 356);
  - at TOWN and village rungs it is disabled with the reason "islands only at CITY and METROPOLIS (II.6)".
- **T1's tool-table row** (S14 l.421):
  - gesture: "pick a site card and a size; drag the wealth slider and pick the walls chip …; the time card";
  - live feedback: "**the whole town regenerates under the hand** within §12's budget";
  - undo: "each change one undo step".
- **T1's event binding.** T1 homes `adjust` (intent, recipe, layers, islands, the sewer family, ruins, a standalone
  neighbourhood's outline) (EDIT l.415). The L0 row: "the recipe's intent at creation (… prosperity, walls …);
  afterwards the Adjust and Re-derive events of the basic panel's controls" (EDIT l.395).

### C2. What a slider change triggers

- **The event.** `{ t: 'adjust'; param; value; fromStage: StageId; fates }` (EDIT l.100).
- **Adjust** (EDIT l.150–154). Locality is promised only for parameters consumed at S10 or later, or spatially scoped. "A
  parameter consumed earlier (seed, rung, water setting and side, walls, castle option, gate count, planned ↔ organic,
  **wealth level**, the recipe's pack list) has no local operator and is offered as **Re-derive from stage k**:
  everything from Sk down re-derives with carry-over (§6.3), and the user confirms the edit-fate report first."
  - **Gap:** the base does not pin `wealthLevel`'s consuming stage. Its readers are S0 (the TOWN P(sewers)), S2 (the
    class-mix expected plot area in the land estimate), S6 (`characterOffset`), S10 (joins) and S12b.
- **The lifecycle row** (EDIT §7.4, row "regenerate / adjust / re-derive from Sk").
  - `Adjust` re-derives with the current field and sets `builtBand` in its scope; Regenerate (keep settings) keeps it.
  - The undo record covers the effective scope, O(scope).
  - On replay the scope replays and the fates are recomputed.
- **Independence** (EDIT l.1029–1032). An `adjust` makes every later live event that derived any entity dependent,
  "because every derivation reads the effective parameters". It is undoable only through its dependants, or while it
  is the latest event.
- **Budget** (R12 l.341–343). "T1 `intend`'s sliders are basic-panel controls whose change is a regeneration — within
  §12.3's model law and §12.5's first-map law".
- **Sweep contract** (EDIT l.1973–1990). 21 steps × 50 seeds at TOWN and CITY must be monotone and continuous, with the
  stated failure fallback: smoothstep, else declared discrete.

### C3. What is persisted, and what regenerate, load and migrate replay

- **The document** is a base plus an ordered log (MODEL §2.9). `model = G(outputVersion, base, log)` (DET6 §6.2
  l.216).
- **The `Recipe`** (B5 lists its fields). It is "every model-affecting input and nothing else".
- **The creation prefix** is the one read-ahead (EDIT §7.4, *Replay semantics*).
- **Seeds.** A dossier-bound seed is `H32("plat:sf-seed" ‖ dossier seed)` (S14 l.322–326).
- **Recorded inputs** (EDIT l.771–776). Regenerate (keep settings) re-derives from the recorded inputs; "re-deriving
  with the current inputs is Adjust".
- **Recorded dial inputs** (DET6 l.358–363). "The circumstance slices in the recipe and in each `EpochInputs`, an
  epoch's wealth level (`EpochInputs.wealthLevel` …), … so a load's recomputation reproduces the field".
- **Load.** `bandRange` and `CharacterVector` are recomputed on load, outside the digest. `identity`, `pressure` and
  `FieldBands` are model data in the digest (DET6 l.352–358; §6.2 l.243–244: the eager model includes `FieldBands`).
- **Migration.** The schema transforms are forward-only, and "what an older document never held and no rule derives
  stays absent" (EDIT §7.5 table, l.≈1215–1250).
  - The precedent for a new recipe field: `Intent.latitudeDeg` "read 50"; `Recipe.product` "read `town`".
  - The precedent for band data: `builtBand` and `fieldBand` from `DerivationRecord.band`.

### C4. Epochs (§4.11): what an epoch re-reads and what it carries forward

- **The path.** `grow(doc, epochInputs)` runs S2's delta demand → S5 (on a residual) → S6 → S7 → S7b (regrowth-first) →
  S12a → S8–S13 on new faces (PIPE 2918–2931).
- **The steps before S2:**
  - the rung profile and product read at the epoch's population target;
  - the dials' applied values moved past their hysteresis;
  - `TradeFlow` re-read.
- **The steps after S2:**
  - (a) S6 re-evaluates the drivers and bands, re-bands every plot's `fieldBand` and marks due blocks;
  - (b) the use step;
  - (c) the fall;
  - (d) the ladder;
  - (e) the dossier events;
  - (f) siting;
  - (g) growth;
  - (h) the rejection lapse;
  - (i) the character step (vector, identity, range, pressure);
  - (j) the Works (PIPE ≈3072–3106).
- **What the epoch carries forward, never re-derived:**
  - survivors, with `builtBand` and `builtProsperity`;
  - the brush strokes, kept as Δ and re-composited;
  - the `FieldBands` cuts, which move only "by an epoch" (PIPE 1235–1236; §2.5 `FieldBands.epoch`);
  - the pressure and identities;
  - applied standings and shares, as folds;
  - island slots holding supplied islands.
- **The islands at an epoch.** The supply is re-evaluated, the other slots re-drawn and the rung gate re-read (B8).
- **The `EpochInputs` interface** (PIPE ≈3268–3275) holds `week?`, `years`, `populationTarget`,
  `circumstances: CircumstanceSlice`, `events` and `dossier?`.
  - **Gap:** it has **no `wealthLevel` field**, although DET6 l.361 and DR6 (EDIT l.1746) cite
    `EpochInputs.wealthLevel`, and V06 BCR-V6-9 [vol] requests it.
- **Emulation.** With no epoch the static baseline is unchanged byte for byte.

### C5. The dossier port and the change envelope: what a changed config value does to an existing map

- **One way** (EDIT §7.7 item 1). The port diffs whole dossiers against `Document.dossier.carried` by binding key and
  emits dossier events.
- **What the port never reads** includes SettlementForge's "**generation sliders (`config.priority*`)**", with the
  reason "the sliders' effect already sits in the institutions and the income shares, so reading them would count it
  twice" (EDIT l.1587–1603; J-A86.71; research mapping row 54, J-M5).
  - SF's sliders are `priorityEconomy/Military/Religion/Criminal/Magic` (0–100, default 50) (research/sf/dossier-model.md
    l.90).
  - Research mapping row 12 maps `config.magicLevel` → II.6's supply law, with "none → no islands".
- **Creation** (S14 l.332–338). The population chooses the rung, the wealth word gives the wealth level, and the typed
  slices give the sector shares and power standings.
- **Change timing** (EDIT §7.7 item 6, l.1680–1683). "An element change folds at its own week as a standalone dossier
  event …; a population change or a **typed-slice change rides the epoch the cadence schedules**, in its
  `EpochInputs`."
- **F9.** A prosperity change becomes `EpochInputs.wealthLevel` at the next epoch (DR6). The receipt rows F7, F9 and F10
  are data rows (EDIT l.1839–1846).
- **Coherence** (item 11). "A dossier change re-derives exactly the dependent map facts … by … least-disruption
  mutation, never a re-roll". **The dossier-owned refusal** includes "an `adjust` … of a slice value the dossier
  supplied" (EDIT l.1795–1803).
- **Two tiers of fact** (item 9). Prosperity values, plot classes and the like are map facts. Income shares, power
  standings and the tier word are dossier facts (EDIT l.1708–1718).
- **The bridge and the doors** (R11 §11.3 l.33–54, §11.4 l.522–566):
  - `dossier.offer` in, `dossier.result` out;
  - door 1 (blueprint: seed, rung, population, intent, district intents, circumstances, assignments);
  - door 2 (events and epochs; a dossier change arrives as `doc.apply` events with `author: 'host'`);
  - no door opens the other way.

### C6. Failure ladder and streams (for the fallbacks the items must name)

- **§5.1's seven tiers** (FAIL l.100–107): 0 feasibility by construction · 1 constraint check · 2 local repair ·
  3 bounded local regeneration · 4 simpler primitive · 5 substitution · 6 documented omission.
- **Streams in play** (DET6 §6.1):
  - `blueprint.features` (l.117): S0's feature draws;
  - `intent.surprise` (l.118);
  - `field.chance` (l.128): ε;
  - `island.place` (l.152): the count, reasons and every island draw.

---

## D. Seats for items 114 and 115 in the base (facts only; the decisions are the item's)

1. **"Economy slider."**
   - The base's standalone slider is the **wealth slider** (`Intent.wealthLevel`, [0, 1], T1 `intend` / basic panel).
   - The base's "economy" is the sector-share slice, which has no slider, plus the item 72 economy dial.
   - SettlementForge's own "economy slider" is `config.priorityEconomy` (0–100, default 50), which §7.7 item 1 and J-M5
     **never read**.
   - Applying item 114 at either reading edits §7.7 item 1's never-read list or §7.8's panel and registry.
2. **"Ceiling prosperity for the entire map."** The only base ceiling is the per-district `bandRange` ceiling
   (derived, recomputed on load). The candidate homes are:
   - the field's clamp (`P` ∈ [0, 1], PIPE 1134);
   - `FieldBands` (per-town quantile cuts, so "rich" is relative);
   - the class mix's `wealthShift`;
   - `RungProfile` (no cap today);
   - a new town-wide record.
   The town-wide absolute value is `S_town` (V05 §3.3). The pressure's excess and the dials already push against the
   range ceiling.
3. **"At generation time the first generation."**
   - The base's creation-only notions are the creation prefix (`EditBase.creation`) and the timeline's first entry,
     which is the creation slice S0 reads.
   - Epochs re-read drivers, bands and the island supply, and re-draw slots.
   - `Adjust` of an early parameter re-derives from Sk (C2).
   - Brushes, T5 bands and island `field.prosperity` targets are authorial edits (A11).
4. **"High magic and high economy."**
   - The base's magic has three values, `none|low|high`. SF has four (medium read as low, V08 J-V8.47).
   - The standalone island gate reads no magic. Only a dossier's `site.magic`, via DR27 and item 11's refusal, gates
     islands.
   - II.6's gate (1)–(2) omits magic entirely. V05 §3.2's `skyGate` has the dossier-magic clause.
   - There is no magic control in §7.8.
5. **Gaps found**, each needing a home in any rewrite that leans on it:
   - `Recipe` has no `layers` field (B5);
   - `EpochInputs` has no `wealthLevel` (C4);
   - the base declares no default value for `wealthLevel` (C1);
   - `wealthLevel`'s consuming stage is unpinned (C2);
   - `DistrictIntent.wealth` is unwired (A11);
   - the per-kind `characterOffset` values have no declared table, and the town-wide `field.characterOffset` is not
     stated to compose with them (A2);
   - DR7 lists `wealth.label` without a rule that reads it (A10);
   - II.6's gate does not state the dossier-magic condition (B6).
