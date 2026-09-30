# blocks-pipeline-prosperity-change-dossier-plan — lane amendments-b/amend-pipeline-prosperity-change-dossier-plan
# (PIPELINE part; seat pipeline-prosperity-change-dossier-plan; HOME item 31; REFERENCING items 20, 22, 28, 29).
# Generated from docs/ARCHITECTURE.md (sha256 1dbfd9d4…) by scratchpad/p31/build.py. Blocks per the BLOCK PROTOCOL of
# workflows/09-amendments-b.js; text before the first "=== " line is ignored. REBUILT 2026-09-27 for item 28 (f), the
# interior ladder (the owner's message of ~00:50): the §4.11, §4.5 and §10.2 blocks carry its pipeline pointers, a §4.7
# APPEND is added, the `ConversionOp` union admits the emulation seat's kinds, and J-A28.44, J-A28.45 and a restated
# J-A31.45 are recorded.
#
# ASSEMBLER NOTE (§4.11). Item 31's home is §4.11's Survivors rule, whose stale text (subdivide on a rise, decay on a fall,
# a 10 % district cap; "only on new or transformed plots") must be gone, so this file REPLACEs §4.11. Three other pipeline
# seats share §4.11 and wrote ADDITIVE blocks, and all three sort BEFORE this file in name order, so this REPLACE CARRIES
# VERBATIM — byte for byte, sliced by the build script from their files at build time — the §4.11 APPEND block of
# blocks-pipeline-assignments.md (item 17's use step, item 18 (c), UseConversionOp), block 1 of
# blocks-pipeline-evolution-islands.md (item 8's decline hooks, DeclineOp) and the §4.11 APPEND block of
# blocks-pipeline-emulation-hidden.md (item 25's terrain and water conversions, item 30 (e)'s passage sealing, item 24's
# markets; TerrainWaterOp, HiddenOp), in that order, at the end of the subsection; their kinds are folded into the one
# `ConversionOp` union as each seat asked. Therefore, for heading §4.11 only: do NOT re-apply those three APPEND blocks
# after this REPLACE (they are already inside it; a re-application would duplicate them) — check byte identity against
# the source files first and re-slice (build.py) if a source block changed after this rebuild — and DO apply after this
# REPLACE any §4.11 block of blocks-pipeline-sewers.md (none at the time of writing). If the assembler instead applies
# every REPLACE before any APPEND per heading, the same rule holds: skip the three carried blocks, apply the others. Every
# other block in this file is ADDITIVE (APPEND TO SECTION) and survives any earlier file's REPLACE of the same heading.
# Judgment ids use the pipeline suffix range .41–.49 (J-A31.41–.49, J-A20.41, J-A22.41–.42, J-A28.41–.45, J-A29.41).

=== REPLACE ### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) ===
### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)

**The one built path: add a growth stage (GEO-27, LC-12, FTG-4, FTG-14).** `grow(doc, epochInputs)` appends an `epoch`
event to the log and runs at that log position (§7.1, §7.4) on the persisted model with the epoch sub-stream: S2 (**delta
demand** = the suffix of the sequential roster between the old and the new population, §10.2 — prefix-stable, so no
survivor's use is withdrawn by arithmetic) → S5 for the new stage, when a residual remains after the regrowth-first order
below (S5a: the boundary grown from the previous one and, if walled, its trace and gates; **S5b**, the main-road step, so each epoch can add main roads; S5c with the built-face legality
below; S5d) → S6 (districts extend over the new faces, existing districts keep their ids; the field's drivers are
re-evaluated with the new circumstances, the brush strokes kept as Δ) → S7 (the new enceinte's furniture) → S7b (allocation
of the delta demand in the regrowth-first order below — the old plan's vacancies, ruins and traces first, new faces only for
the residual) → S12a (outside sites for new outside classes; the hinterland unit builds their plots) → S8–S13 on new faces only (S10–S12b in the derivation pool, over a copy frozen as §3.3
step 1 states). S5c's proposals cross water only on a deck — a built bridge, or a `site` the proposal builds (§4.4) — so an
epoch's growth uses the crossing sites S1 and S3 left unused (§4.2 S1 (5)).
* **Built-face legality (GEO-27).** In an epoch a growth proposal may not cross a face holding footprints unless it runs
  along plot boundaries or back lanes (§4.3's `existingFabricCost` applies to S5c too, pricing a route along plot lines far
  below one through buildings) or a declared `demolish` conversion is chosen at its table cost (by building class and age),
  recorded as events. Plots cut by a new corridor are re-cut through the conversion path — buildings that still fit are
  kept, the others demolished with lifecycle events — never re-derived from scratch.
* **Survivors — the wealth ladder and the geometry floor (LC-12; owner, 2026-09-26; item 31).** Surviving plots and
  buildings keep their built state. A re-evaluated field never re-derives them and never removes an occupied building: it
  acts on them only through the explicit, recorded, rate-limited events of the **wealth ladder** — three rungs by the
  time a block has spent in its new band and by what its standing stock allows — drawn from `…/epoch=e` streams (the
  ladder's own draws on `epoch.transform`; a rung-3 re-cut's `plot.*` and `siteplan` concerns keyed by the block's and
  the new plots' lineage with the epoch component, §6.1 — no new concern). The engine that schedules the ladder is the
  owner's staged evolution stage (DEF-8, below); the base carries now the due mark, the table, the operators, the floor
  and the edit kinds, each usable by hand (§7.1) and undoable (§7.4). With no epoch nothing here runs, so the static
  baseline is unchanged (item 23): neither reference evolves — MFCG fixes granularity by ward type and FTG by lifestyle
  tier at generation, and FTG's "regenerate area" is a re-roll, which this ladder never is.
  - **The trigger — a band change past the hysteresis marks the block DUE.** After S6 re-evaluates the drivers (§4.5)
    each block's band is read again against the town's `FieldBands` with their hysteresis (0.02, §4.5): a block whose value
    has crossed a cut by more than it is marked due — `Block.due = { band, since, epochs }` (§2.5): the band it must
    meet, the epoch of the crossing and the epochs spent in that band, counted up at every later epoch — until its stock
    meets the band or the band changes again (a new mark; a flicker inside the hysteresis marks nothing). The mark is per
    block and the memory per plot (`builtBand`, below): "the neighbourhood grew poor" is the aggregate of its blocks'
    marks and its plots' records, never a district switch (J-A31.43).
  - **The rungs.** Every rung acts through operators the base already has — item 18's designation mutator (`mutate`,
    §4.7 S11), item 17's use step (below), item 30's passage choice (§4.6), S10 (7)'s join-and-split law in its
    incremental form (§4.7) — as `LadderOp` conversion events (below), so **no occupied building is demolished by a band
    change** and nothing is re-rolled (J-A31.41).
    1. **Rung 1, at every due epoch — use, occupancy and condition.** *Growing poor:* buildings are let out — `relet`
       raises a building's household count within §2.6's **capacity** (the smaller of its template row's
       `households.max`, read at the plot's `builtBand` (§10.2) — a shell built richer holds more households when let out,
       the owner's "the more rooms for more occupying families" — and what its storeys' floor area holds), the
       roster's households (the dossier's roster where one exists, §7.7) and item 17's relocation filling them (§10.3);
       the interior follows the occupants down §2.6's **interior ladder** (item 28 (f)): the plan rung re-cuts the
       programme for the new count inside the unchanged wing rings — from one household with its staff rooms to a
       lodging house, a tenement of one-family apartments off a corridor, or single rooms — when next clicked (the
       rung goes `stale`, §2.8; F-PLAN never drops a household, §5.2);
       outbuildings convert to dwellings and workshops and sheds and hovels infill the yard (`mutate` toward the field
       band's use and specialisation columns; `densify … infill` inside the manifested band's yard rows); the garden is
       built over (§4.9); the fabric's **condition** steps down — `Building.condition` `kept → worn → neglected` (§2.6:
       wear, patched roofs and, late, the roof lost through `RoofSpec.kind 'none'`; rendering classes of §8.2, never a
       shape change, item 19). *Growing rich:* renovation and extension by `mutate`'s adapt and add steps toward the
       richer template (item 18), households re-united (`relet` down to the row's built count; the interior re-cut back
       up the ladder removes what the subdivision added and restores the earlier plan where nothing else changed, §2.6),
       infill cleared and the garden reclaimed (`thin … infill`), condition restored. Use, condition and the interior
       read the field band; geometry reads the manifested band (the floor, below).
    2. **Rung 2, after the ladder table's duration in the band — tenure and yards.** The holding fragments or
       consolidates without its front changing. Growing poor, the yard becomes a back court of rear plots reached by a
       new passage (`densify … back_court`) where §4.6's passage choice allows one and the plot's manifested band's row
       carries a rear-plot or hidden share — a middle-floored plot's yard is infilled, not cut into tenements; growing
       rich, a back court is cleared and re-gardened (`thin … back_court`: its uses relocated by the use step first, the
       rear plots cleared, the passage sealed, item 30); and big houses change class keeping their shells — a mansion to a
       tenement, an inn, a workshop or a chapel — by `mutate` (item 18). Rung 2 moves plot lines only inside the yard;
       the plot's ring and its main shells stand.
    3. **Rung 3, on vacancy, ruin, a destructive circumstance event or redevelopment only — the geometry follows.** A
       vacant or ruined plot's ring is re-cut to the band: growing poor, an abandoned or ruined mansion's plot is split
       into row houses or tenements (`subdivide`), or the fallen house's plot is re-cut and rebuilt as lodgings; growing
       rich, a buyer joins two or three worn small plots and replaces their houses with one large building (`amalgamate`,
       then `rebuild` or `build`). **Redevelopment** is a composite the engine issues in order — purchase (the plots'
       uses closed or relocated by the use step under item 17's rules; a pinned assignment or a lock stops it),
       vacancy (`vacate`), then the re-cut and the new stock — so the invariant holds at every step (J-A31.47). The
       re-cut is S10 (7)'s law in its incremental form (§4.7): the due block re-cut with its neighbours fixed (§7.3: the
       block is the effective scope, with its seam exception), under the band's granularity target, fusing by S10 (7)'s
       orderings (vacant or same-owner neighbours first, then a rear plot into its front plot) and splitting by them
       (the widest frontage first, then the deepest yard), every survivor's plot byte-identical, the new plots' buildings
       by S11's mutator from the empty design. Slums arise where the stock was small and cheap to begin with, or from
       rungs 1 and 2 inside big shells; a district of mansions grows poor as tenements behind grand fronts, never as a
       cleared slum (the owner: "hard to imagine that it would be torn down into a slum if it was filled with
       mansions").
  - **Asymmetry — speed by direction and by the stock's replaceability (owner: "much easier for a poor neighborhood
    to grow rich and merge plots").** The rung durations are rows of the **ladder table** (`WealthLadderTable` in
    `@plat/tables`, §7.6, §14; our own rows, calibratable, §13.9; tendencies changeable per region and era, item 23),
    keyed by direction and by the stock's `replaceability` — a column of the template rows of the class table (§10.2), read
    at the plot's `builtBand` row: `immediate` (tents, sheds, hovels), `short` (cottages and the row houses of the
    poorer bands), `long` (the row and detached houses of the prosperous bands), `ruin_only` (manors, halls,
    institutions) (J-A31.42). Growing rich reaches rung 3 within a few epochs because it replaces cheap stock; growing
    poor stays at rungs 1 and 2 for generations, because expensive stock is not torn down, so splitting waits for
    vacancy, ruin or a destructive event. Default rows:

    | replaceability of the standing stock (at `builtBand`) | years in the band before rung 2, growing rich / poor | rung 3 growing rich: fusion after purchase and vacancy | rung 3 growing poor: splitting |
    |---|---|---|---|
    | `immediate` | 0 / 0 | in the due epoch | on vacancy, ruin, a destructive event or redevelopment |
    | `short` | 0 / 10 | after 10 years in the band | the same |
    | `long` | 10 / 20 | after 30 years in the band | the same |
    | `ruin_only` | 10 / 30 | on vacancy, ruin, a destructive event or redevelopment only | the same |

  - **Churn.** The table's **churn cap** rows bound every epoch, per kind — `geometry` (rung-3 re-cuts and rebuilds),
    `fabric` (the decline lottery's strikes, below), `use` (the use step's relocations, below) — as a share of a
    district's plots (or uses) per decade, scaled by the epoch's `years`, and a maximum per block per epoch; defaults
    0.05 / 0.10 / 0.10 per decade and 2 plots per block (the former "10 % of a district's plots per decade" is the
    `fabric` row). Candidates beyond a cap wait, in address order, so a neighbourhood changes over many epochs, never
    all at once; item 17's cap and the lottery's bound are rows of this one table (J-A31.46).
  - **The geometry floor (owner: "their floor is bounded to middle class … once a neighborhood generally gets to a
    middle class outcome, that forever remains its geometry until vacancy, ruin, fire, war, or redevelopment shifts
    things entirely. it would cycle … between rich and middle").** Each plot persists `builtBand` and
    `builtProsperity` — the band and field value its present stock was built for (§2.5; in the model digest, §6.2; never
    recomputed from the field, unlike the fields themselves, J-DET-12) — and derives, never stores, `geometryFloor =
    min(builtBand, FieldBands.middle)` by the band order: the settlement's middle band (§4.5 names it) for stock built
    at or above it, the stock's own band below it — a hovel cannot read poorer than a hovel; it can only be replaced
    upward. The plot's **manifested band** is `max(field band, geometryFloor)` and its manifested value `max(field
    value, floor value)`, the floor value being the middle band's lower cut, or `builtProsperity` when the floor is the
    built band. Every change other than a rung-3 event reads the manifested band and value for what is BUILT — S10 (2)'s
    granularity rows, S11's template geometry columns (size budget, structures, storeys, heights, frontage, court and
    garden; J-A19.43), the yard partition (§4.9), II.3's block dispatch — and the field band and value for who is there
    and how it fares — households, condition, specialisation, the room programme, labels and descriptions (J-P1 stands:
    "the rich quarter" is still a description of the field). So a mansion district that grows poor reads as
    middle-class geometry — big plots, big shells, subdivided into lodgings, yards infilled — while its occupants,
    condition and names are as poor as the field says: **the interior has no floor** (item 28 (f)) — the shell keeps its
    floor while its rooms follow its occupants down §2.6's interior ladder, to single rooms off a corridor at the
    poorest, which is where the poor live when every area is developed (the same shells, a different interior; item 30's
    back courts behind them, the cheap stock of item 27's shanty rule at the edge, §4.5); between the rich and the middle
    manifestation it cycles freely and reversibly through rungs 1 and 2 (renovation and re-unification upward,
    subdivision and infill downward) with no plot or shell change; the middle band is each settlement's own (§4.5's per-town cuts), so a town's middle and a
    metropolis's middle each bound their own districts (J-A31.43). **What writes `builtBand`** (J-A31.44): generation
    (the plot's band at S10); a rung-3 event, to the band of the new stock; the hand edits of rung 3's kind — `rebuild`,
    `demolish` then `build`, `amalgamate`, `subdivide`, a `replace` close-up (II.4) — and the authorial re-derivations
    that re-derive the stock itself: a field brush's or a `FieldBands` `setAttr`'s re-derivation and `Adjust` (§7.2,
    §7.4 — a brush is how a user designs the town, so it re-derives its scope to the current band; the floor governs
    wealth change over epochs); and a **completed upward refurbishment** — a `mutate` whose result meets a higher band's
    shape template raises `builtBand` to that band, so a renovated quarter keeps its floor (the owner's "refurbished
    housing"). Nothing else lowers it. Regenerate (keep settings) keeps it (a recorded input, §2.8); a member a split
    `resurrect`s takes it from the rung-3 event that re-cut it, not from its tombstone (§6.3); a document written before
    the attribute existed gets `builtBand` = its plot's `DerivationRecord.band` and `builtProsperity` = its recorded
    sample, exact for every document without an epoch (§7.5). The floor draws no random numbers. With no epoch the
    manifested band equals the field band everywhere.
  - **Lineage survives, so the seed survives (J-A31.48).** A fused plot continues the lineage of its largest parent by
    area (its buildings' streams continue, §6.1); a split plot's children are keyed by the parent's lineage plus the child
    index — §6.3's lineage rule for JOIN and SPLIT, beside the address by the anchor rule and `resurrect` as §6.3 states —
    so one seed with one history gives one town, and an undo returns the former plots exactly from the
    undo record's rings and records (§7.4). Every ladder event is a mutation that continues lineage; only New random
    takes fresh lineage (the owner: "It's not new rerolls its modifications and variations to the original seed").
  - **The epoch's order** (the engine's loop on the base's path). After S2's delta demand: (a) S6 re-evaluates the
    drivers and the bands and marks the due blocks; (b) the use step (item 17, below) closes, opens and relocates uses;
    (c) when the target fell, the roster's suffix leaves in reverse ordinal order — a building whose household count
    falls but not to zero takes a `relet` down (its plan rung `stale`) and `vacate` fires only when its last household
    leaves; the decline lottery (below) draws per building, deciding whose households leave first, and strikes fabric by
    its exposure (item 28 (f) with item 8; J-A28.45); (d) the
    ladder runs its rungs on the due blocks under the churn cap; (e) a dossier event that arrives with the epoch's inputs
    is applied here as a mutation at that epoch — S10b's `dossier` request and S11's mutator on the current map (§4.7,
    §7.7; item 22 (e)), never a re-roll — it remains what the seed, the ordered history and its own edits make it
    (J-A22.42); (f) siting places the delta in the regrowth-first order (below), a `relet` up in a standing shell whose
    count fell below what its occupants' band row houses coming before `reoccupy` of a vacant one (J-A28.45); (g) a
    residual grows a stage (S5); (h)
    every live placement rejection (§7.7's record, item 20) is re-checked by §7.7's lapse rule — the settlement having
    grown or declined since the rejection (the epoch's population target differs from the target recorded with it), or a
    dossier event having touched its block — and a lapsed site is eligible again from the next placement on (J-A20.41).
    Each step's events cite the epoch; the whole is one `epoch` event's fold (§7.4). A dossier event between epochs is
    applied at its own log position by the same request and mutator (§7.7).
  - **Regenerate, Adjust and the derivation record.** A transformed entity's `DerivationRecord` is updated; every other
    plot keeps its record, so "Regenerate (keep settings)" on an untouched block reproduces it byte for byte, and
    re-deriving it with the new field is the explicit `Adjust` (authorial, above). Siting across epochs places only delta
    demand, in the regrowth-first order below.
* **Test (M4).** On a town with walled, ribbon and suburb regimes, adding a stage re-rolls 0 survivors, adds ≥ 1 primary
  when its gate law asks for one, and replays from the log to the session hash. The ladder's, the floor's and the epoch order's hook tests are §13.2's
  (item 31).

**Conversions** are typed plat operations with recorded events. `ConversionOp` is defined here, once, as one union: the
base's own kinds, the ladder's (`LadderOp`, item 31, the Survivors rule above), the decline hooks' (`DeclineOp`, item 8, below),
the use step's (`UseConversionOp`, item 17, below), the terrain and water conversions' (`TerrainWaterOp`, item 25, below)
and the passage sealing's (`HiddenOp`, item 30 (e), below); §7.1's `convert` event carries it, and `build` below is §7.1's
`build` event:

```ts
type ConversionOp =
  | { op: 'wallToWay'; enceinte: Id; widthCm?: Cm } | { op: 'gateToJunction'; gate: Id; square?: boolean }
  | { op: 'outskirtToDistrict'; region: { ring: Polygon; key: PlatKey } /* the outskirt faces it covers; no stored slots, §2.2 rule 5 */ } | { op: 'demolish'; id: Id }
  | { op: 'rebuild'; building: Id; cls: BuildingClass /* the whole replacement a ruin or a redevelopment calls for (rung 3), never a designation change (§4.7 S11) */ }
  | { op: 'build'; plot: Id; cls: BuildingClass; footprint?: PolygonCm /* as §7.1's build event */ } | { op: 'carve'; kind: 'canal'|'moat'|'harbour_basin'; polygon: Polygon }
  | { op: 'abandon' | 'decay' | 'ruin' | 'robStone' | 'clear' /* removed to a footprint trace */; building: Id } | { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon }
  | LadderOp | DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp;
type LadderOp =                                                                            // item 31's rungs (Survivors, above): each a mutation with an undo record (§7.4), usable by hand (§7.1)
  | { op: 'relet'; building: Id; households: number /* rung 1: the household count the roster fills, within §2.6's capacity — the template row's households.max at the plot's builtBand (§10.2) and the shell's floor area; the plan rung re-cuts to §2.6's interior ladder when next clicked (item 28 (f)) */ }
  | { op: 'densify'; plot: Id; as: 'infill' | 'back_court' /* rung 1: sheds, hovels and a workshop in the yard, the garden built over; rung 2: rear plots in the yard reached by a new passage (§4.6, item 30) */ }
  | { op: 'thin'; plot: Id; what: 'infill' | 'back_court' /* the inverse: infill cleared and re-gardened (§4.9); a back court cleared after its uses relocate, its passage sealed */ }
  | { op: 'subdivide' | 'amalgamate'; plots: Id[] /* rung 3 only, on vacated plots: S10 (7)'s law in its incremental form — the due block re-cut with its neighbours fixed; §7.1's plot split and join are the hand forms */ };
```

**`wallToWay(enceinte)`** is `retypeEdges(ChainRef('wall', enceinte), add ('way', the new ring road), remove 'wall')`: the
wall chain becomes the spine of a `primary` way with a ring-road width, on the same edges; the wall strips' setback and
glacis lines are removed, so the strips merge into the faces beside them, their band, tower and gatehouse faces are
cleared with the rest of their finer content, and S9's `corridorUnion` re-derives the ring road's corridor there; towers
are removed; gates become junctions with a `square` option. **Clearance (GEO-38):** the new corridor needs half its width
on each side of the old wall line; where the half-band plus setback on a side is narrower, plots meeting the new corridor
are clipped along its edge — a plot keeps its id when its frontage anchor survives (O8 g), and footprints that no longer
fit are demolished with lifecycle events (cause `convert:wallToWay`).

**`carve` — a canal, moat or basin added by an edit, or an outer moat by S5a (§4.4).** The dry run decides every way's fate
and the carve's one **footprint** before any batch runs. Let `S` be the channel ⊕ its bank setback. Every way whose corridor
meets `S` takes a fate by class (J-P30), recorded as lifecycle events with cause `convert:carve`:
* **kept with a pinned deck** — every `through` and `primary` way, and any other way that is the only connection of the
  streets on its far side to a gate or the plaza. Its deck (S1 (5)'s form, perpendicular to the channel) and its
  **re-route** are solved in the dry run by §7.3's S4 local operator — between the way's nearest pinned nodes on either side
  of `S`, on S3's lattice with `existingFabricCost` (so it keeps near its old line), through the deck as a fixed graph edge;
  a way that already meets the channel within ± 10° of its normal keeps its line and only its stretch across the channel
  changes. The old stretch between the re-route's two ends is the way's **replaced stretch**. S7's rules give the deck its
  `Bridge` (events: `altered` on the way, `built` on the bridge);
* **cut** — every other `secondary`, `lane`, `alley`, `cul_de_sac`, `track` and `path`: its stretch inside the channel ⊕
  max(bank setback, 1 m) is removed, so every cut end lies at least 1 m from the channel, and a remainder that now dangles
  shorter than one block depth is pruned (events: `altered`, `demolished`); `quay` and `pier` ways are cut the same way and,
  where they met the new water at ≥ 30°, extended from the cut end to the new bank as a quay or a landing.

**Other crossings (J-I13).** A wall trace that `S` crosses has its **run** — the trace between the nearest unaffected towers
on either side of the crossing — re-traced as data in the dry run, with a water gate where the channel crosses, as §7.3
(b) 2 re-traces a run a moved river crosses. The stretches of the run's strip lines alongside it — the inner setback line,
the glacis line (or the moat's inner bank, which is water and stays) and, where the era row has one, the intervallum —
between the feet of the perpendiculars from the run's two end towers leave with the old run, and S7's operator re-cuts them
along the re-traced run from those feet (batch (3)). Every way the re-traced run's new strips — the new run ⊕ (half its band
+ its setback, and + its glacis or berm on the field side) — will meet, other than a kept way through a gate of the run
(whose corridor ends each strip, §4.8), takes the `cut` fate at the strip's boundary, as `drawWall` cuts the ways its new
strips meet (§5.2, §7.4), and every plot inside the new strips is re-derived with the rest of `R`. A locked or pinned way,
wall or finer entity, or a reservation, inside `S` or inside a new strip returns to the dry run as an F-EDIT conflict (lock
> drawn geometry; Re-derive from S3 offered for a reservation, §5.2), as for S1's water operator.

**The footprint (J-P34).** `C` is the set of L1 cells (the faces of the L1 view) that (a) the channel ⊕ (`attractCm` + bank
setback) meets; (b) border a removed stretch, a pruned remainder or a stretch the new strips' cuts remove; (c) border a kept
way's replaced stretch or are crossed by its new route; (d) where the channel crosses a wall, border the old run or the
strip-line stretches batch (1) removes with it, or meet the re-traced run ⊕ (half its band + its setback, and + its glacis
or berm on the field side) — the ground its new strips will take. The **footprint** is `R` = ⋃ `C`, exactly: every point of
the arena lies in one L1 cell, so the channel's buffer lies inside the cells (a) names, and no cell outside `C` holds a face
any batch of the carve clears, splits or re-derives. `R` is the carve's one clear region: batches (1) and (2) declare it as
`KernelTx.clearRegion`, step (4) re-derives exactly its cells, the fate report lists exactly the protected entities inside
it, and the locality checks — §3.3's clear-region confirmation, §7.3's carve row, the §13.1 and §16 M3a fixtures and the
O18 (g) / O2 (c) perturbation test — require byte identity outside it, less the seam exception at its boundary (step (4)).
By (b)–(d) no plot outside `R` loses its access (a plot's access edge lies on a kerb of a way it fronts) and batch (1)
removes no edge a kept face uses (no `E_KEPT`); inside `R`, S10 gives every plot an access edge by construction (O5 a),
and S8's deep-interior rule and F-PLOT's alley rung act as in any block. The wall-crossing fixtures are §13.1's and
§13.2's.

**The batches**, each single-level (§3.3):
1. **L1, clear region `R`.** `clearFiner` on `R`'s cells; the cut stretches, the pruned remainders and the kept ways'
   replaced stretches are removed, each through its `StretchRef` (§3.4) — a way cut in two first hands its far part to a new
   way by `retypeEdges`' `rekey` on that part's `StretchRef`; each kept way's new route is inserted whole, across the line the
   channel will take, with its deck's two bank vertices placed on it at the new bank points — carrying `deck_end`, pinned —
   and the span between them carrying the structural `deck` role beside `way`, so every kept way stays one connected chain
   through every batch; each crossed wall run is replaced by its re-traced run, with its water gate's two bank vertices
   carrying `('gate_end', gate, 0 | 1)` under a fresh `Gate` (§2.2 rule 7), the old run leaving with the stretches of its
   strip lines alongside it (each through its `StretchRef`, its ends placed by `splitThrough` at the feet of the end towers'
   perpendiculars); the ways the new strips will meet are cut at the strips' boundaries; and every other L1 edge the
   channel's banks will cross that is no way — a settlement-perimeter or other district-boundary stretch, a wall strip's
   setback or glacis line outside a re-traced run — is split at its two bank points by `splitThrough`, each carrying an
   `anchor` contact name (§2.2 rule 7: the entity of the edge's first own-level row, the smallest free ordinal — from 2 on an
   enceinte), with the stretch between them removed through its `StretchRef`; the map's `border` line is split at its bank
   points the same way but kept whole across the channel (§3.3 clear regions, rule 2; the arena's outer ring is L0 and meets
   the channel at its own level, §4.1). Those `deck_end`, `gate_end` and contact-name vertices are the carve's **prepared**
   vertices; every cut end lies ≥ 1 m from the channel, so no way is prepared except at its deck.
2. **L0, clear region `R`, `KernelTx.prepared` = the `deck_end`, `gate_end` and contact-name vertices of (1) (J-P40).** The
   channel's ring is inserted and attracts onto and promotes the prepared vertices, stripping the contact names (§3.3 rule
   3, §3.6); each deck span — the kept way's own edge between its two promoted bank vertices — now crosses the water as the
   `Bridge`'s deck (§2.2 rule 7), and no L0 edge crosses the channel, so the water body stays one L0 face. Any other contact
   with finer geometry is `E_LEVEL` or `E_KEPT` and returns to the dry run.
3. **L1.** Each kept quay or pier is extended from its cut end to the new bank (its end a Steiner vertex on the L0 bank line,
   §2.2 rule 3); S7's operator re-cuts the wall strips' setback, glacis and intervallum lines along each re-traced run from
   the feet (1) left, closing them on the new banks, and builds its towers and the water gate's `Gate` record, whose `banks`
   name its two `gate_end` vertices (§7.3's S7 row).
4. **Re-derivation of `R` (J-P43).** S6's operator, restricted to `R`'s cells, after the L0 batch: each land face of `R`
   takes the district — or the hinterland pseudo-district, or the `wall_strip` typing — of the pre-edit L1 cell that held
   the larger part of its area (ties by id). A boundary stretch removed under the water lies between its two bank anchors,
   so the L0 batch re-separates the land on either bank along the boundary that remains and no land face spans it: a canal
   across the settlement perimeter leaves the land outside it with the hinterland on both banks (0 district faces outside the
   perimeter; fixture §13.2), and a block part beside a crossed glacis line keeps its own block's typing. The same rule
   settles a boundary stretch removed on land — a cut way that carried a district boundary — by the larger part. The new
   strips (3) cut are typed `wall_strip` and take their district as S7's strips do (§4.8), and the channel's water faces
   leave the district face sets they were cut from. Then S8–S12b re-derive `R`'s cells by tree scoping (§7.3 item 2) — S8
   first, because cuts and replaced stretches merge and reshape L1 cells — with S10's step (0) for `R`'s faces beside a wall
   trace, the settlement perimeter or a shared reservation boundary (§4.7). Where a batch of the carve adds or removes a
   junction vertex on a spine that bounds `R`, the far side takes II.1 (3)'s neighbour step or its reversal; those steps and
   the `Seam` records of `R`'s districts are the carve's seam exception, the same set a district's reroll has (§7.3 item 1),
   which the locality oracle computes from the commit records. A carve therefore costs its footprint, not the town.

At S5a nothing finer than L1 exists yet and the channel meets only the arterials through the stage's gates: every way is
kept with a deck, nothing is cut, and `R` clears nothing (§4.4). Every touched entity's lifecycle records the event with its
cause.

**Coherence from one seed (owner).** Epoch N+1 is derived from epoch N's persisted state, the inputs and the seed's epoch
sub-stream `…/epoch=<n>`: the same town under different inputs has different histories, under the same inputs the same
history, and nothing that survives is re-rolled, because a survivor keeps its lineage and its derivation record (§6.3,
§7.3).

**The evolution engine is the owner's later stage (DEF-8); its hooks are concrete now.** The owner's history — growth,
regression and growth again: houses emptied and robbed for stone, plots turned to gardens, a shorter wall ring inside the
old one, ruins left standing — is expressed with the base's own records: the transformation and conversion kinds above
(`abandon`, `decay`, `ruin`, `robStone`, `plotToGarden`, `contractWall`, the ladder's `LadderOp` and the `DeclineOp` kinds
below), which a user can also apply by hand in the base (§7.1); the lifecycle history on every entity; the epoch streams; the circumstances timeline (§7.7); and the sequential
roster (a population fall selects its suffix in reverse ordinal order; the decline table's exposure lottery, below,
chooses which buildings empty). A ruined building keeps its footprint and heights and draws with the ruin program and the `none` roof kind (§2.6, §8.2); when and where the engine
applies these kinds is its own rule table over the `…/epoch=e` streams. The engine plugs in behind one interface, and the
base registers only its own path:

```ts
interface EpochInputs { years: number; populationTarget: number; circumstances: CircumstanceSlice; events: { kind: string; params: Record<string, number> }[] }
interface EvolutionStrategy { plan(doc: Document, inputs: EpochInputs, tables: TableView, rng: Stream): KernelResult<(ConversionOp | EditEvent)[]> }   // registered by name (§4.12)
// base registration: 'grow-by-stage' — the path above; the owner-staged engine registers its own strategy and reuses every event kind
```

The base builds and tests exactly one path — **add a growth stage to an existing town** — at M4 (G-P13), because it is the
same path "regenerate this area" uses.

**Uses across epochs (item 17) — the hooks now, the engine's step later.** A **use** — a shop, workshop, inn or
institution — is its own record (`Use`, §2.7), separate from the buildings that house it: a building references its
current use or none (vacant) and keeps `formerUses`, so a use can close in one building and open in another while the
building persists — vacant, re-let or converted. The base builds the hand path: the conversion kinds below, applied by a
`convert` event (§7.1) — `openUse` on a vacant plot or building (the building mutates to the designation by §4.7 S11's
operator), `closeUse` (the building stays, vacant — the first state of the decline hooks above — or converts to a named
designation), `relocateUse` (a `closeUse` here and an `openUse` there under one event, `detail.from` and `to` on the use's
lifecycle event, §2.8; `swapUse` is two relocations) and `mutate` (§4.7 S11) — each with its undo record (§7.4) and
reported to a host (§11.3). The staged engine's **use step** runs at each epoch after the roster's delta demand and before
siting, as the same events: (1) **re-score** — for every use, §4.7 S10b's solver scores its present plot and the best
alternative within its catchment (the district and its neighbours, `serviceRadiusM` of §10.2's `useRules`) against the
current field, distribution and supply graph; (2) **inertia** — a use moves only when the alternative beats the present
plot by more than the row's `inertia` and the row's `moveChance` draw falls (the `use.relocate` concern on the use's
`…/epoch=e` stream, §6.1), closes only when its catchment's demand (the households within its radius against the roster's
ratio) has been below `closeShare` for `closeAfterEpochs`, or a hard supply edge has had no provider in reach for
`starveAfterEpochs`; new demand (the roster's suffix) opens uses where the solver scores best — so markets and shops drift
toward where people live and inns toward the busiest gate, by distribution, never by a fixed order; (3) **cap** — at most
the churn cap's share of a district's uses relocates per epoch (the survivors' ladder's churn cap above carries one row
per kind — fabric transformation, use relocation; item 31); (4)
**assignments** — a host or owner assignment is a stable identity that moves with its use under the same rules unless
`pinned` (§7.7, item 20 (g)), in which case it stays and the town adapts around it; every change is reported; (5)
**traces** — a vacated building keeps its former use in `formerUses`, which a later opening prefers (a former inn reopens
as an inn first) and the naming engine may read (§10.4). Uses are visited in address order; one seed and one circumstance
timeline therefore give one history of openings, closings and moves; households and postings follow (§10.3).

**The epoch-spread mutation (item 18 (c)).** Across epochs a designation change is not applied at once: the engine issues
§4.7 S11's `MutationRecord` as a sequence of `mutate` events over the ladder's rung durations (item 31) — first occupy,
when the present design is compatible (every kept part, nothing added); then adapt; then extend (the adds); and rebuild
only the parts that cannot be adapted — the same steps and the same draws, spread in time, so a smith moving into a richer
street mutates toward the richer template over epochs.

The kinds these steps use join `ConversionOp`, defined above:

```ts
type UseConversionOp =
  | { op: 'openUse'; plot: Id; to: Designation /* §4.7 S11 */; building?: Id; assignment?: Id }
  | { op: 'closeUse'; use: Id; leave: 'vacant' | 'convert'; to?: Designation }
  | { op: 'relocateUse'; use: Id; to: Id /* the destination plot: a closeUse here and an openUse there under one event */ }
  | { op: 'mutate'; plot: Id; to: Designation; spread?: 'now' | 'epochs' /* §4.7 S11's operator; 'epochs' issues its steps over the ladder's durations */ };
```

**Decline and regrowth (owner, 2026-09-25: "growth, regression and growth where appropriate"; AM-8).** Regression is
growth read the other way: the population target falls, the roster's manifest shrinks by its suffix (§10.2), and the
fabric the suffix leaves behind steps down a ladder of states over epochs — never re-rolled, never removed by arithmetic
— until regrowth reoccupies it. The steps are scheduled by the owner's staged evolution engine (DEF-8, above); the base
carries now, stated here once: the ladders, the decline table with its exposure function, the salvage ledger, the lag
rule, the regrowth-first siting order — which binds the built `grow-by-stage` path today — and the conversion kinds, each
applicable by hand (§7.1) and undoable (§7.4). The states are §2.8's and the style classes that draw them §8.2's; §6.3
holds the identity rules, §13.2 the hook tests, §16 the price at M4.

* **The ladders** (§2.8's `Existence` value in brackets; every step is one conversion below, a lifecycle event with its
  cause). *Buildings:* occupied → vacant (`abandoned`: the use has left, the fabric stands) → derelict (`decayed`:
  roofless, `RoofSpec.kind 'none'`) → ruin (`ruined`: walls part-standing, the ruin program) → robbed or cleared
  (`cleared`: a footprint trace, its material in the ledger) → reused (`reused`: a garden, orchard or field laid over the
  trace, which persists beneath it as the old foundations, or a successor building raised on those foundations, which
  takes the trace's address, §6.3). Upward steps exist at every rung — reoccupy, repair, rebuild, reuse — and regrowth
  uses them first. *Walls and gates:* in use → neglected (`abandoned`) → breached or partly dismantled (`decayed`; the gap
  a `StretchRef`) → superseded by a shorter inner ring: `contractWall` traces and builds the new ring inside the old one
  through S5a's trace step and S7's operator, the old ring's record stays live with `Enceinte.supersededBy` naming the new
  one and its line persists as a trace — or becomes the ring road of the owner's original case by `wallToWay`. *Tunnels*
  (II.6): in use → neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or sealed (`ruined`;
  `Tunnel.closure`), never demolished by the engine. *Islands* (II.6): floating → waning → settled → fallen. *Plots:* a
  plot whose last building is cleared or reused merges into a garden, orchard or field (`plotToGarden`) or into its
  occupied neighbour (`amalgamate`; §4.7 S10), so surviving households absorb the plots beside them and the plan coarsens
  where people are few — fewer, larger plots from loss, through the same merge operator as from wealth. Fields are their
  own layer: a struck farmstead's fields stay worked, their `LandUse.owner` passing to the nearest farmstead or to the
  commons.
* **The decline table** (`DeclineTable` in `@plat/tables`: an editable, versioned rule table with provenance, §7.6; our
  own rows, calibratable, §13.9). Its rows are tendencies — weights and chance, no fixed order (AM-23):

  | row | default | what it does |
  |---|---|---|
  | persistence rate per fabric layer | `use` 1.0 · `building` 0.6 · `plotBoundary` 0.3 · `street` 0.08 · `wall` 0.05 · `underground` 0.03 · `terrainWater` 0.005 | scales how readily a layer is struck: uses go first, then buildings, then plot boundaries; street and wall lines persist longest; the underground slower still (AM-11); terrain and water slowest (AM-25's conversions are the rarest events) |
  | exposure drivers | kernels over the context vector (§2.5) with weights, §4.5's construction: extramural (the district outside the outermost enceinte, as S10b reads it) +; `terrainClass` low, damp or flood +; downwind +; near the noxious kernels of field pass 2 +; the intramural periphery (`dist.wall` small inside the enceinte, `dist.centre` and `dist.market` large) +; low `prosperity` +; the resilient core (`dist.market` and `dist.plaza` small; the attractors at churches, the precinct and the castle) − | where decline strikes first, as weights |
  | chance share | 0.25 of the exposure field (the prosperity field's is 0.15) | causes vary and chance plays a part |
  | dwell bands (years) | vacant → derelict [10, 30]; derelict → ruin [20, 60]; ruin → cleared on salvage demand only; walls one band slower, tunnels two | the lag on the way down |
  | haul radius | 250 m | how far salvage travels |
  | exemptions | a locked or pinned entity is never struck; an assigned entity only through the use-relocation rule (AM-17) | the user's fixings hold |

* **The strike lottery** (the engine's step; the exposure function and the table are the base's). For an epoch whose
  target lies below the manifest, the suffix is selected in reverse ordinal order and its uses leave (`vacate`); which
  standing fabric then steps down is drawn without replacement from a lottery over the candidates whose dwell band has
  run, weight `w = E(x) · rate(layer) · u`: `E(x) = clamp(Σ_j v_j · kernel_j(x) + ε_E(x), 0, 1)` the exposure field,
  computed per epoch on §4.5's 32 m cells from the current context vectors and prosperity field with its chance share;
  `rate` the layer's persistence row; `u` a draw from the `epoch.transform` stream keyed by the entity's lineage and the
  epoch (§6.1; no new concern); the draw bounded by the Survivors rule's churn cap per district and per epoch. An
  undefended suburb, a damp low quarter and the plot beside the tannery empty first as a tendency, the market core last,
  and a core house can still fall — a weighted tendency, not a law (J-A8.41).
* **Salvage — the material ledger.** `robStone`, `clear`, `dismantle` and `demolish` credit the town's `MaterialLedger`
  (§2.7) by the building's class-table yield (`salvageM3` per material, §10.2); `build`, `rebuild`, `reuse … build` and a
  repair (`reoccupy` from derelict) debit it by the new class's row from sources within the haul radius. The ledger is a
  flow record, never a hard constraint: a debit it cannot cover is built anyway and the shortfall is reported (J-A8.45).
  Its mark on the map: the lottery's weight for `robStone` and `clear` is multiplied by the salvage demand within the haul
  radius — the standing debits of planned building, repairs and a new stage's footprints — so cleared zones appear beside
  active building, and a ruin beyond any demand is left standing, the owner's "occasional old decrepit buildings or
  ruins".
* **Lag and memory.** Built extent follows population with a lag on the way down and none on the way up: a fall vacates
  at once and the standing stock decays by the dwell bands over later epochs; a rise is met in the epoch it arrives by
  the regrowth-first order below, without a dwell (J-A8.47). Memory is the persistence order itself: plot lines, street
  lines, wall lines and traces outlast the buildings, so the old plan is there for regrowth to refill.
* **Regrowth-first — built now, on the one path.** In `grow-by-stage` (above) S2's delta demand is placed in this order,
  and only the residual grows a stage: (1) vacant buildings reoccupied (`reoccupy`); (2) derelict ones repaired
  (`reoccupy`, a ledger debit); (3) ruins and cleared traces rebuilt or reused on their foundations (`rebuild`, `reuse …
  build`); (4) vacant plots of the old plan beyond the band's vacancy-run share (S10 (8) keeps the share; the design's own
  runs are never filled below it); (5) plots S10 cuts on the faces the old plan left unbuilt along its street lines inside
  the last boundary; (6) new faces of a new stage — S5a grows the boundary for the residual only, and an epoch whose
  residual is ≤ 0 grows no stage and adds no face. S7b allocates the delta first to (1)–(5) as each district's old-plan
  capacity and only the remainder to new faces; this replaces the rule that an epoch placed delta demand only on new or
  transformed plots (J-A8.44). **Test (M4; §13.2):** a town with 12 % of its buildings vacated, derelict or cleared by
  hand, grown by +6 % population, adds 0 new faces and refills ≥ 95 % of the delta inside the old plan, every
  vacancy-run share unchanged.
* **The prosperity field under decline.** The drivers are re-evaluated per epoch (§4.5); under decline the market,
  harbour and main-street kernels shrink with their activity (§7.7's circumstance slice), and where plots merge the
  density field falls, so the field contracts toward the survivors' core and may concentrate there — the ladder's
  amalgamations are its footprint on the plan.
* **Islands and the underground over epochs** (their laws are II.6's). Each epoch re-reads the rung from its population
  target (§1.1) and re-evaluates II.6's supply law: an island whose supported area shrinks past the hysteresis is resized
  (its rim's plots cleared with lifecycle events, cause `convert:resizeIsland`); one whose supply falls to zero — or whose
  settlement has left the CITY band (AM-13) — wanes, settles after its dwell band and falls: `fallIsland` archives its
  arena and lays a `ruin` decoration face (§2.7) over its projected outline on the ground through the carve path's
  clear-region protocol above, every entity under it demolished with that cause; regrowth re-floats a settled island
  before it raises a new one (J-A10.42). A tunnel silts, caves in and is sealed by the same lottery at the underground's
  rate, is never demolished by the engine (J-A11.41), and is reopened before a new one is dug.
* **Identity and determinism.** A vacant, derelict, ruined, cleared or reused building is a live record with its address
  and lineage (§6.3); it becomes a tombstone only by `demolish` or when a `reuse … build` successor takes its address
  (`supersede`, §2.8) (J-A8.42). Every draw above comes from `epoch.transform` or, for islands, `island.place`, keyed by
  lineage and epoch, so the same seed under the same circumstance timeline gives the same history of decline and regrowth
  and a different timeline a different one (§6.2, §7.7).
* **Emulation note.** Neither reference has time: with no epoch the static baseline is unchanged byte for byte (§13.3's
  goldens), and every rate above is a table value (AM-23).

The kinds this adds to `ConversionOp` — one list with the union above, which reads `… | DeclineOp`; §7.1's `convert` event
carries them all:

```ts
type DeclineOp =
  | { op: 'vacate' | 'reoccupy'; building: Id }                                          // occupied ⇄ vacant; reoccupy from derelict is a repair: roof restored, ledger debited
  | { op: 'reuse'; building: Id; as: 'garden'|'orchard'|'field' | { build: BuildingClass } } // a ruin or trace reused: a yard part of the plot over the persisting trace, or a successor on the old foundations (Building.predecessor, §2.6)
  | { op: 'neglect' | 'breach' | 'dismantle'; enceinte: Id; stretch?: StretchRef }        // walls and gates; the old line persists as a trace; contractWall and wallToWay above supersede a ring
  | { op: 'silt' | 'caveIn' | 'seal' | 'reopen'; tunnel: Id; stretch?: StretchRef }       // the underground's ladder (II.6); no engine plan contains demolish on a tunnel
  | { op: 'resizeIsland'; island: Id; areaHa: number; elevationCm: Cm }                    // the supply law's response: the outline re-drawn by §4.2's routine from the island's own stream; rim plots cleared, or new rim faces grown by the grow path on the island's arena
  | { op: 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }                    // waning → settled (elevation at the floor of its band, districts declined) → fallen (arena archived, a ruin face on the ground); a settled island re-floats first
  | { op: 'raiseIsland'; allocation: Id };                                                 // regrowth: a new island for a sky allocation the count law opened at this epoch, placed by SkyStrategy (II.6)
```

**Terrain and water change slowly (item 25; the engine is owner-staged, the kinds and the hand path are the base's).**
Reclamation, silting and river-course shifts are conversions on the one list — kinds `ConversionOp`'s union admits, the
slowest layer of the persistence order, never immutable — applied by hand in the base through §7.1's `convert` event and, in the staged engine, drawn at
the decline table's `terrainWater` rate by their own trigger rows (below). Each is a typed operation whose repair is an
operator the base already has (J-A25.41):

```ts
type TerrainWaterOp =
  | { op: 'reclaim'; kind: 'marsh'|'foreshore'; region: Polygon /* marsh: LandUse faces of kind 'marsh' or a damp or flood band re-typed as land; foreshore: a shallow water margin filled */ }
  | { op: 'silt'; water: Id; stretch?: StretchRef /* a reach or a basin: its width and depth profiles fall by the row's share; a basin below the harbour's draught loses its harbour use */ }
  | { op: 'shiftCourse'; water: Id; from: number; to: number /* control-knot ordinals (§2.3): the reach between them re-traced — a meander cut-off or an avulsion */ }
  | { op: 'digCanal'; polygon: Polygon /* the carve above, kind 'canal' */ };
```

* **Repair.** `reclaim` runs S1's terrain operator (§7.3 (a)) — the region's ground raised to the flood line plus the row's
  margin (`reclaim.raiseCm` 60), drained by a `drainage` ditch trace along its lowest line, its `LandUse` faces re-typed
  `meadow` or `arable` with `reclaimed: true` — and, for a foreshore, S1's water operator (§7.3 (b)) with the filled margin
  as the new shore; `silt` and `shiftCourse` are S1's water operator on the changed reach (the width and depth profiles,
  the shores as their buffer, the crossings re-sited, the kept ways re-routed, F-RIVER's re-trace confined to the reach,
  §7.3 (b) 1–2), so their footprint, fates and locality are the carve's and byte identity holds outside it; `digCanal` is
  `carve`. Every touched entity's lifecycle records the cause (`convert:reclaim` …); the record changes each kind makes
  are §2.3's.
* **Trigger rows (the engine's step; the rows are the decline table's `terrainWater` rows, §7.6).** Candidates and their
  chance per epoch, each × the layer's persistence rate (0.005) and drawn from `epoch.transform` keyed by the water body's
  or face's lineage and the epoch (§6.1; no new concern, J-A25.42): `silt` — a reach whose accumulation has fallen, or a
  basin whose harbour use has closed (the use step), 0.02 per epoch; `reclaim` — a marsh or foreshore face beside built
  land whose band's plot demand is short (S5d's shortfall record) and whose district's band is `modest` or above, 0.03
  per epoch — reclamation is bought by prosperity and pressed by demand; `shiftCourse` — a reach whose sinuosity exceeds
  `river.cutoffSinuosity` (1.8), or whose flood cells beside it exceed the row's share, 0.01 per epoch; `digCanal` only by
  demand (a `canal` row of the roster's institutions, a dossier element or a user's edit). Each fires at most once per body
  per epoch; AM-23's tendency wording holds — rates, not laws. Emulation note: neither reference has time, and both
  already let a user reshape water — MFCG's warp and FTG's water drawing — which the base keeps as §7.1's edits; nothing
  here runs without an epoch.

**Hidden plots over epochs (item 30 (e); the base carries the kinds).** A passage can be **sealed** — `sealPassage`: the
passage face's access edges are marked sealed, every plot whose only reach passes it takes exposure `sealed` (§4.6), and
its buildings enter the decline ladder as vacant (`vacate`, cause `convert:sealPassage`) — and later **reopened**
(`openPassage`: the exposure returns to `hidden` and the buildings reoccupy by the regrowth-first order); both are hand
edits in the base and the engine's kinds later. Hidden plots **arise** by densification — the ladder's `densify …
back_court` (rung 2) cuts a plot's yard into rear plots reached by a new passage where §4.6's reach weights allow one,
through S10's incremental re-cut with the neighbours fixed (§4.7 S10 (7)) — and **vanish** by `thin … back_court` (the
rear plots cleared after their uses relocate, the passage sealed and, on a rising band's re-cut, removed with the rear
row, `amalgamate` returning the land to the front plot's garden: item 31). The sealing kinds are the last the union admits
(`… | TerrainWaterOp | HiddenOp`):

```ts
type HiddenOp = { op: 'sealPassage' | 'openPassage'; passage: Id /* the L3 passage face (§2.5) */ };
```

**Markets over epochs (item 24).** A secondary market the roster's suffix adds is claimed by the epoch's S7b in the new
stage or in a due district by §4.5 S7b (3)'s rule; a market whose institution closes (the use step) keeps its square — a
plaza or a `market_green` — until a `clear` or a claim reuses it, so no market moves by wealth change alone.

=== APPEND TO SECTION ### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker ===
* **Elaboration by click — the trigger policy over the laziness contract (owner, 2026-09-26; item 28; J-A28.41,
  J-A28.42).** The contract above says what may be derived lazily; the **trigger policy** says when. It belongs to the
  viewer, not to the model: `elaborate` — `click` or `view` — is a per-user view key (§2.9); the key decides only the
  moment at which a pure rung gets derived, never its content, and the contract yields one model either way (CI: §6.5 (9)'s derived-complete
  digest, run over click orders too). `click`, the owner's choice, is the default: at city zoom the view draws the eager city LOD above —
  every footprint, MFCG's look at city zoom; a "plots only" cadastral view is a view option of §8.5, never the default —
  and derives nothing finer until asked. Clicking a neighbourhood derives its close-up (II.4) and raises the `wings` rung of
  its buildings to `current` (§2.8's elaboration record); clicking a building raises its `plan` rung to `current`,
  after `wings` when that is still absent — the rungs are ordered outline → wings → rooms → plan (§2.6), so the plan
  rung enters the lazy list above with §2.6's records, §6.1's streams and §8.5's draw. `view` derives every visible
  tile's rungs inside §12's budgets — §8.6's existing rule for `compose()`. **Saved, then stale until clicked:** a derived rung is kept
  (the elaboration cache, §2.9) and shown across zooms and sessions; a batch that changes one of its recorded inputs —
  a designation, an assignment, the band, the storeys, the wing rings, the households, a table slice it cites, or a
  dossier event of items 18, 22 or 31 — sets it `stale`; the cached result stays on view, flagged at every zoom stop
  with a change marker (§8.5), until the next click re-derives it by mutating the cached state (§7.3, item 18), never
  by a re-roll; viewing never re-derives a `current` rung. **Pre-assigned plots:** the eager content decision — a plot's use,
  class, assignment and `Lifecycle.assigned` — is taken town-wide before any building geometry, by S2, S7b, S10a and
  S10b (the allocation and placement records above); a plot the dossier or a user assigns is therefore assigned at the
  city level and, as the owner puts it, "just not generated" — its geometry follows on the click.

=== APPEND TO SECTION ### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace ===
**Dossier-backed elements at creation (item 22 (d); with §7.7; J-A22.41).** A brand-new map from an existing dossier
holds every dossier element from the start: the blueprint's assignments and the dossier-backed elements enter S2's
manifest as **fixed rows** — one (class, ordinal) each at the head of its class, present at every population and never
withdrawn by the roster's arithmetic, so prefix stability holds with them — and S7b allocates them before the roster's
free demand in each rank of its order (§4.5), S10 (3) claims them and S10b's `generation` request places them (§4.7).
The log's positions 0…k `assign` events (§7.7) record these placements as the generation run's own — they place nothing
a second time — and a replay reproduces them because the run reads the same recipe. A dossier element that arrives after
creation is a `dossier` request on the current map (§4.7 S10b, §7.7), and one that arrives with an epoch's inputs a
mutation at that epoch (§4.11).

=== APPEND TO SECTION ### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims ===
**The due mark and the dossier's rows (items 22 and 31; J-A31.45).** §4.11's geometry floor reads the middle band as the
band set above designates it — `FieldBands.middle`, where the settlement's median household falls under the roster's
wealth shares, `comfortable` under the default set (J-A27.42) — each settlement's own, so a town's middle and a
metropolis's middle each bound their own districts. An epoch's re-evaluation acts on a block only by marking it **due**
when its value crosses a cut by more than the hysteresis above (`Block.due`, §2.5); §4.11's wealth ladder does the rest,
and the "Over time" bullet reads through it — surviving plots transform by the ladder's rungs, never by a re-derivation.
S7b allocates S2's fixed dossier rows before the free demand in each rank of its order (§4.2 S2, item 22 (d)).

=== APPEND TO SECTION ### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule ===
**An alley that presents itself; back courts across epochs (items 29, 30 and 31).** For item 29's side and rear
entrances an alley "presents itself" exactly when this rule's `back_lane`, `through_alley` or `rear_plots` treatment,
or S10's alley rung and passage choice (§4.7 S10 (9)), gives the plot an access edge beyond its frontage (`Plot.access`,
§2.5); the entrance rules of §2.6 read that edge set and nothing else. Across epochs §4.11's rung 2 makes and unmakes such
interiors on standing plots: `densify … back_court` cuts a yard into rear plots reached by a new passage where the
passage choice above allows one and the plot's manifested band's row (§4.11's floor) carries a rear-plot or hidden share
— a middle-floored plot's yard is infilled instead — and `thin … back_court` clears one and seals its passage, each a
recorded event through this rule's shares, never a re-cut of the block's interior.

=== APPEND TO SECTION ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===
**Households per building (item 28 (f)).** S10b fills a residential building at generation to its template row's
`households.built` and never beyond §2.6's capacity — the one function item 31's `relet` (§4.11) and F-PLAN's never-omit
rule (§5.2) read — so the solver and the plan agree on how many households a shell holds; the plan rung records the
count among its inputs (§4.1).

=== APPEND TO SECTION ### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19) ===
**Gardens over epochs (item 31).** The yard rows read the plot's manifested band for the yard parts that exist (S11's
yard partition is geometry, bounded by §4.11's floor) and the field value for what is planted in them: rung 1's
`densify … infill` builds over the garden part and `thin … infill` re-gardens it, re-running the yard-planting row for
that plot alone (§4.11).

=== APPEND TO SECTION ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) ===
**Replaceability, households, entrances, cellars and the room programme (items 28, 29 and 31; J-A28.43, J-A29.41).**
`DesignationTemplateRow` — one per band of each `BuildingClassRow` — also carries these columns, and `RosterTables`
gains `roomProgram: RoomProgramRow[]`:

```ts
interface DesignationTemplateRow { /* … the columns above, and: */
  replaceability: 'immediate'|'short'|'long'|'ruin_only' /* item 31: read at the plot's builtBand row — how soon §4.11's wealth ladder may replace the stock */;
  households: { built: number; max: number } /* item 31: the households the design is built for, and the most it holds when let out (rung 1's relet) */;
  entrances: { side: number; rear: number; service: number; capSide: number; capRear: number; yardDoorMinM2: number } /* item 29: the probability of a side, rear or service door given an access edge beyond the frontage, their caps, and the yard or court area that recommends a yard door — §2.6's entrance rules read them */;
  cellar: { prob: number; kinds: { full: number; half: number; walkout: number }; slopeCm: Cm; rockCost: number } /* item 29 (b): the base probability §2.6's basement decision starts from, the kind weights, the fall under the footprint past which the decision turns to a half or walk-out cellar, and the rock cost that lowers the probability; the terrain gate is §2.6's */;
  programme: string /* item 28: the key of a RoomProgramRow below */ }
interface RoomProgramRow { for: { cls: BuildingClass; band: string; use?: string; era?: string } /* the designation and its band (item 19's rows) */; rooms: RoomRuleRow[] /* the programme */;
  pattern: Record<'basement'|'ground'|'upper'|'top', { weight: number; pattern: LayoutPattern }[]> /* §2.6's layout patterns, weighted per storey class */; circulation: number /* the share of a storey given to halls and corridors */;
  stair: { placement: 'by_entrance'|'rear'|'centre'|'tower'; kind: StairCore['kind'] } /* the stair core §2.6 places before any cut */; basementAccess: 'core'|'trapdoor'|'external'; furnish: { density: number; wallBias: number } /* item 28's abstract furniture by role */ }
interface RoomRuleRow { role: RoomRole /* §2.6: data-defined */; scope: 'unit'|'shared'|'service'|'circulation' /* item 28 (f): a room of one household's dwelling unit, one the households share (a kitchen, a common room), a staff room, or a corridor or stair hall — §2.6's interior ladder says which scopes a band's row allows */; count: { n: number; law: 'const'|'perHousehold'|'perStorey'|'perCapacity'|'perSubLocation' /* per household: item 31's relet; per capacity: a sub-location's */; capacity?: string; tag?: string };
  area: [number, number, number] /* m²: min, target, max */; storey: 'any'|'ground'|'upper'|'top'|'basement' /* the storey rule */; exterior: 'none'|'some'|'max' /* windows */; door: 'door'|'arch'|'open' /* the opening kind */; maxDoors?: number;
  adjacency: { kind: 'hard'|'soft'; to: 'core'|'entrance:main'|'entrance:yard'|RoomRole; via?: 'direct'|'corridor'|'under' }[]; priority: 'hard'|'soft'; hearth?: boolean;
  furnish: { density: number; wallBias: number; glyphs: string[] } }
```

The **room programme** lists the rooms a building of that class, use and band must and may have — each with its
size band in m², its storey, its openings, its adjacencies and how many — a fixed number, a number per storey, one for each household of
item 31's `relet`, or a sub-location's capacity — which §2.6's plan rung writes first and then cuts the walls
to fit (item 28), so rooms are never cut before the programme is known. The programme rows follow §2.6's **interior
ladder** (item 28 (f)): the ladder's row for the occupants' band gives the cross-class structure — how many households
the shell holds, each unit's rooms, the shared rooms, the staff rooms and their size beside the owners' rooms, the
circulation form and how large the rooms may be — and a class's programme row adds what a smithy, an inn or a chapel needs; the
`programme` row is read at the occupants' band (the field band, J-A19.43) and the `households` column at the plot's
`builtBand` (the shell's capacity, §2.6), so the interior has no floor while the shell keeps its own (§4.11).
`LayoutPattern`, `StairCore` and `RoomRole` are §2.6's, the role names our own data rows (hall, chamber, solar, parlour,
kitchen, buttery, common room, cooking place, staff chamber, corridor, stair hall, forge, shop, store, undercroft,
chapel, nave, passage …). The plan rung's `plan.program` stream draws the fractional part of a count law (§6.1), as
`plot.join` draws a join (§7.7). Households per building follow the roster's households (the dossier's roster where one
exists, §7.7) and item 17's relocation (§10.3); the `households` row and the shell's floor area bound the ladder's
`relet` through §2.6's one capacity function, which S10b's fill (§4.7), `relet` and F-PLAN (§5.2) all read; with no epoch
every building houses its row's `built` count, so the static baseline is unchanged (item 23).
Every column is data with provenance, editable and calibratable (§7.6, §13.9). The entrance and cellar rows default to
the references' behaviour — one street entrance per building, side and rear probabilities 0, a cellar by the class rows
of item 29 (b) — with our extensions as tendencies (item 23); the reference's basement share is a descriptive baseline
only (§13.5).

=== APPEND TO SECTION ## II.1 The district → neighbourhood interface ===
**Close-ups and the geometry floor (item 31).** A `refine` close-up reads the committed plots and changes no plot
record — `builtBand` included; a `replace` close-up is a model edit of the redevelopment class (II.4): the plots its
template lays take `builtBand` and `builtProsperity` from the band and value the template read, as a rung-3 event of
§4.11 does.

=== APPEND TO SECTION ## II.3 Block content dispatch, pins, local identities (stage-2 feature S2: context features) ===
The prosperity band the dispatch reads is the block's **manifested band** — the field band raised to its plots' geometry floor
(§4.11, item 31): what stands there — while a pin's probability gate reads the field band.

=== APPEND TO SECTION ## II.4 The render tier, the workflow and the close-up's persistence status (stage-2 features S5, S6) ===
**Elaboration by click at stage 2 (item 28).** Opening a district follows §4.1's trigger policy: in the viewer's `click`
mode the click derives the close-up and raises the `wings` rung of its buildings to `current` (§2.8's elaboration record); in
`view` mode the visible tiles derive within §12's budgets; either way the model is the same, and the persistence status
above is unchanged (a `refine` close-up stays derived data). When the simulator, a dossier event or an epoch changes an
input of a derived close-up or rung — its district's committed state, a building's designation, band, households or
rings — the record is marked `stale` and the cached result stays on view, flagged at every zoom stop with the change marker
(§8.5), until the user clicks; the click re-derives it by mutating the cached state (§7.3, item 18), never by a re-roll,
and viewing never re-derives a `current` rung.

=== APPEND TO SECTION ## II.5 What the base already carries for stage 2 (all base requirements in PART I) ===
The elaboration record per rung (§2.8) and the elaboration cache (§2.9), with the `elaborate` view key (§4.1) and the stale
marker (§8.5): the base's carriage of item 28's click policy, which stage 2's close-ups and stage 3's rungs share.

=== J-ROWS ===
| J-A31.41 | the three-rung wealth ladder replaces the Survivors rule (subdivide or densify on a rise, decay on a fall, 10 % per decade): use and occupancy, then tenure and yards, geometry only on vacancy, ruin, a destructive event or redevelopment; no occupied building removed by a band change; rungs act through items 17, 18 and 30's operators and S10 (7)'s law | §4.11 |
| J-A31.42 | replaceability as a column of the designation template row (class × band), read at the plot's `builtBand`: immediate, short, long, ruin_only; never keyed by material | §4.11, §10.2 |
| J-A31.43 | the geometry floor at plot granularity: `builtBand` and `builtProsperity` persisted, `geometryFloor` derived as min(builtBand, middle); the manifested band and value (max of field and floor) for everything built, the field for use, condition and labels; block-level due marks | §4.11, §2.5 |
| J-A31.44 | `builtBand` written by generation, rung-3 events, the hand edits of rung 3's kind, the authorial re-derivations (brush, `FieldBands` `setAttr`, `Adjust`) and a completed upward refurbishment; lowered by rung 3 only | §4.11, §7.2 |
| J-A31.45 | the geometry floor reads the settlement's own middle band — `FieldBands.middle` as §4.5 designates it (the median household's band; `comfortable` under item 27's default set, J-A27.42) — never a fixed reference tier or a global constant | §4.5, §4.11 |
| J-A31.46 | one churn-cap table with rows per kind (geometry, fabric, use), per district per decade and per block per epoch; the former 10 % becomes the fabric row; items 8's and 17's caps are its rows | §4.11 |
| J-A31.47 | rung 3's triggers stated generically (vacancy, ruin, a destructive circumstance event, redevelopment); redevelopment = purchase, relocation, vacancy, then the re-cut; the owner's war example kept out | §4.11 |
| J-A31.48 | a fused plot continues its largest parent's lineage by area, split children take the parent's lineage plus the child index, a resurrected member's `builtBand` comes from the re-cut event; ladder events are mutations that continue lineage (the J-DET-2 exception stated) | §4.11, §6.3 |
| J-A31.49 | `densify` re-specified at plot level (infill, back court), `thin` and `relet` added, `subdivide` and `amalgamate` confined to rung 3 on vacated plots with §7.1's split and join as their hand forms | §4.11, §7.1 |
| J-A20.41 | a live placement rejection is re-checked as the epoch's last step and lapses on growth or decline since the rejection (the population target changed) or a dossier event touching its block — the pipeline reading of §7.7's rule | §4.11, §7.7 |
| J-A22.41 | dossier-backed elements at creation enter S2's manifest as fixed rows, are allocated first by S7b, claimed by S10 (3) and placed by the generation run; the log's 0…k `assign` events record those placements | §4.2 S2, §4.5 S7b, §7.7 |
| J-A22.42 | a dossier event arriving with an epoch's inputs is applied inside the epoch after the use step and the ladder, before siting, as a mutation on the current map | §4.11, §7.7 |
| J-A28.41 | the elaboration trigger (`elaborate`: click or view) is per-viewer view state, not a document setting; click the owner's chosen default | §4.1, §2.9 |
| J-A28.42 | click semantics: a neighbourhood click derives the close-up and the wings rung, a building click the plan rung (wings first), rungs ordered, viewing never re-derives a current rung, a stale one is re-derived by mutating the cached state; eager footprints kept at city zoom (J33) | §4.1, II.4 |
| J-A28.43 | the room-programme table (`RoomProgramRow`, `RoomRuleRow`) declared in §10.2 as a roster table keyed by the template's `programme` column and read by §2.6's plan rung, which writes the programme first and cuts to it | §10.2, §2.6 |
| J-A28.44 | the interior ladder referenced from the pipeline by one pointer per place: `relet` bounded by §2.6's capacity (the `households` column at `builtBand` — the owner's last sentence read as the shell's capacity — and the storeys' floor area), the programme read at the occupants' field band, a `scope` column on `RoomRuleRow` (unit, shared, service, circulation) for the ladder's rows to name | §4.11, §10.2, §4.7 |
| J-A28.45 | a population fall relets a building down before it vacates it — `vacate` only at the last household, the lottery drawing per building — and a rise relets a standing shell up to its occupants' row before reoccupying a vacant one | §4.11 |
| J-A29.41 | the entrance probabilities and caps and the cellar rows as columns of the designation template row (class × band), read by §2.6's rules; the references' one street entrance and no side door as the default, our extensions as tendencies | §10.2, §4.7 |

=== RATIONALE-A ===
| J-A31.41 | Chose a three-rung wealth ladder as §4.11's Survivors rule — use, occupancy and condition at every due epoch; tenure and yards after a table duration; geometry only on vacancy, ruin, a destructive circumstance event or redevelopment; no occupied building removed by a band change — over the former rule (subdivide or densify when a plot's value rose past a cut, decay when it fell, at most 10 % of a district's plots per decade), because the owner's rule runs the other way (rich quarters join plots, poor quarters split them) and adds that a district of mansions grown poor is not torn down into a slum, while the former rule re-derived a survivor on a value change, which is a re-roll of what stands; the rungs act through the operators the design already has — item 18's mutator, item 17's use step, item 30's passage choice, S10 (7)'s join-and-split law — so the ladder is a schedule over one set of mechanisms, not a second fabric engine, and with no epoch nothing runs, so the static baseline is unchanged (§4.11; item 31). |
| J-A31.42 | Chose replaceability as a column of the class table's designation-template rows — per class and band, read at the plot's `builtBand` row, with the values immediate (tents, sheds, hovels), short (cottages and the poorer bands' row houses), long (the prosperous bands' houses) and ruin_only (manors, halls, institutions) — over a single class-level column or a key by construction material, because the same class differs by band (a poor row house is cheap stock, a rich one is not) and item 19 makes material a rendering attribute that may drive neither shape nor lifetime; reading it at `builtBand` ties the stock's lifetime to what was built, not to who lives there now (§4.11, §10.2; item 31). |
| J-A31.43 | Chose to persist `builtBand` and `builtProsperity` per plot, derive `geometryFloor` = min(builtBand, the settlement's middle band), and read max(field, floor) for everything built and the field itself for use, condition, specialisation and labels, at plot granularity with block-level due marks, over a district-level floor or a floor stated on the band alone, because the owner's "generally gets to a middle class outcome" is met by the aggregate of plots while a district switch would move every plot at once; the continuous companion keeps the interpolated rules (coverage, size, greenery) bounded as the bands are, honouring "a gradient and a band"; labels stay on the field (J-P1) so the description of a poor quarter in grand shells is honest (§4.11, §2.5; item 31). |
| J-A31.44 | Chose that `builtBand` is written by generation, by rung-3 events, by the hand edits of rung 3's kind, by the authorial re-derivations (a field brush's and a `FieldBands` `setAttr`'s re-derivation, and `Adjust`) and by a completed upward refurbishment, and is lowered only by a rung-3 event, over resetting it at rungs 1 and 2 or making brushes floor-bound, because a brush and `Adjust` are how a user designs a town — the static base keeps today's behaviour exactly — while the floor governs wealth change over epochs; the owner's "refurbished housing … gets to a middle class outcome" favours a renovation raising the record so that the improvement is kept (§4.11, §7.2; item 31). |
| J-A31.45 | Chose that the geometry floor reads the settlement's own middle band — `FieldBands.middle`, designated at §4.5 as the band holding the median household under the roster's wealth shares, `comfortable` under item 27's default six-band set (J-A27.42 states the designation once; this seat's first draft named the granularity table's modest row and was retired when the emulation seat computed where the median falls) — over a fixed tier of a reference's ladder or a global constant, because the cuts are per town by construction (§4.5) and the owner's rule names the middle class of that place: a metropolis's middle and a town's middle each bound their own districts (§4.5, §4.11; item 31). |
| J-A31.46 | Chose one churn-cap table with rows per kind — geometry (rung-3 re-cuts and rebuilds), fabric (the decline lottery's strikes), use (relocations) — per district per decade and per block per epoch, over the former single 10 % rule and over separate caps in items 8, 17 and 31, because three caps in three passages would be three mechanisms for one rate limit and the owner asks for change over many epochs, never all at once; the former rate becomes the fabric row (§4.11; items 8, 17, 31). |
| J-A31.47 | Chose to state rung 3's triggers generically — vacancy, ruin, a destructive circumstance event of `EpochInputs.events`, redevelopment — and to define redevelopment as purchase (the uses closed or relocated by item 17's rules; a pinned assignment or a lock stops it), vacancy, then the re-cut and the new stock, over naming the owner's hypothetical war example or letting a rising band re-cut occupied plots, because item 8's owner note keeps the war example out of the design and the invariant "no occupied building removed by a band change" must hold at every step of a redevelopment (§4.11; items 8, 31). |
| J-A31.48 | Chose that a fused plot continues its largest parent's lineage by area and a split plot's children take the parent's lineage plus the child index, a resurrected member's `builtBand` coming from the re-cut event and not from its tombstone, over fresh lineage for every successor (the J-DET-2 default) or the anchor member's lineage, because the owner's seed rule ("modifications and variations of the original seed") requires the survivors' buildings to keep their streams and the largest parent is the one most of them stand on; the address still follows §6.3's anchor rule, so ids stay stable, and only New random takes fresh lineage (§4.11, §6.3; item 31). |
| J-A31.49 | Chose to re-specify `densify` as a plot-level operation (infill, or a back court reached by a new passage), to add `thin` and `relet`, and to confine `subdivide` and `amalgamate` to rung 3 on vacated plots with §7.1's plot split and join as their hand forms, over keeping the district-level `densify` and the free `subdivide` of the former rule, because a district-level densification on a rising value contradicts the granularity rule (rich joins, poor splits) and a subdivision of an occupied plot would remove occupied buildings; every kind is a mutation with an undo record, so the engine and the hand share one path (§4.11, §7.1; item 31). |
| J-A20.41 | Chose to re-check every live placement rejection as the epoch's last step and to lapse it when the settlement has grown or declined since the rejection — the epoch's population target differs from the target recorded with it — or a dossier event touched its block, over lapsing at every epoch or never, because the owner ties the lapse to growth or decline ("if a settlement grows or declines that might be appropriate to put something there") and an epoch with an unchanged target has neither; §7.7 holds the record and the rule, §4.11 the step (§4.11, §7.7; item 20). |
| J-A22.41 | Chose that dossier-backed elements and blueprint assignments present at creation enter S2's manifest as fixed rows, are allocated by S7b before the free demand, claimed by S10 (3) and placed by the generation run, with the log's positions 0…k `assign` events recording those placements, over placing them by the events after a run that ignored them, because a brand-new map must hold every dossier element from the start (item 22 (d)) and the roster's capacity, allocation and siting must count them as demand rather than as afterthoughts; prefix stability holds because a fixed row is present at every population (§4.2, §4.5, §7.7; item 22). |
| J-A22.42 | Chose to apply a dossier event that arrives with an epoch's inputs inside that epoch — after the use step and the ladder, before siting — as a mutation of the current map, over applying it before the epoch or after it, because the epoch's own changes (closed uses, due blocks) are the state the least-disruption search should see and siting after it lets the epoch's new demand fill around the dossier's placement; continuity over path-independence holds at epochs as it does between them (§4.11, §7.7; item 22). |
| J-A28.41 | Chose the elaboration trigger (`elaborate`: click or view) as per-viewer view state rather than the document setting item 28 drafted, because it decides only when a pure rung is derived and never what, and a viewer's choice must not enter the model's inputs (§4.1's laziness contract; the Dwellings synthesis's correction 7); click is the default the owner asked for (§4.1, §2.9; item 28). |
| J-A28.42 | Chose the click semantics — a neighbourhood click derives the close-up and brings its buildings' wings rung to current, a building click brings the plan rung to current deriving wings first, the rungs ordered, viewing never re-deriving a current rung, a stale one re-derived by mutating the cached state — with eager footprints kept at city zoom, over a bare-plot city view by default or a re-derivation on every click, because the owner asks for generated content that is saved and marked when the simulator changes it, and the city view must keep the references' look (J33) (§4.1, II.4; item 28). |
| J-A28.43 | Chose to declare the room-programme table (`RoomProgramRow`, `RoomRuleRow`) in §10.2 as a roster table keyed by the designation template's `programme` column and read by §2.6's plan rung, over a per-class code path or rows nested in the template row, because the programme is content data of the same kind as the class rows — data, editable, calibratable — and the plan must write the programme first and cut the walls to it, the reference's partition-then-label order being exactly what fails (§10.2, §2.6; item 28). |
| J-A28.44 | Chose to reference the interior ladder from the pipeline by one pointer at each place it acts — rung 1's `relet` bounded by §2.6's capacity, the smaller of the template row's `households.max` read at the plot's `builtBand` (which reads the owner's "the more rooms for more occupying families the richer a building gets" as the shell's capacity: a shell built richer has more rooms to let, while the households actually housed follow the occupants' band) and the storeys' floor area; the programme read at the occupants' field band; and a `scope` column on `RoomRuleRow` naming a room as a unit's, shared, service or circulation, so the ladder's rows in §2.6 can say which scopes a band allows — over restating the ladder's rows in §4.11 or §10.2, or reading the owner's sentence on the occupants, because the rows have one home (§2.6) and the other reading contradicts the message's first clause, "more prosperity means a larger home for a smaller family" (§4.11, §10.2, §4.7; item 28 (f)). |
| J-A28.45 | Chose that a population fall removes households before buildings — a building whose count falls but not to zero takes a `relet` down and `vacate` fires only when its last household leaves, the exposure lottery drawing per building to decide whose households leave first — and that a rise relets a standing shell up to what its occupants' band row houses before `reoccupy` of a vacant one, as the first step of the regrowth-first order, over item 8's vacate-by-building alone or a per-household lottery, because under item 28 (f) a shell holds one or many households and vacating a half-emptied lodging house would remove occupied dwellings, which the ladder forbids; a rise refills a tenement before it turns a rich house into a lodging house, because the count a shell houses is its occupants' band row's, not its capacity (the evolution-islands seat proposed the rule after (f) landed) (§4.11; items 8, 28 (f), 31). |
| J-A29.41 | Chose the entrance probabilities and caps and the cellar rows as columns of the designation template row (class × band), read by §2.6's rules, with the references' one street entrance and no side door as the default and our extensions as tendencies, over a separate entrance table, because item 19 already scales every designation by band through that one row and the owner's "optional or random but limited" is a probability with a cap (§10.2, §4.7 S11; item 29). |

=== END ===
