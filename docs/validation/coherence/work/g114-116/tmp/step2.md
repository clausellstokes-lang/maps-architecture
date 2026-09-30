114. **OWNER RULE — The economy slider sets the map's prosperity ceiling at the first generation (owner, 2026-09-30 ~00:50;
     J126).** Owner: "one thing i wanted to add, at generation time the first generation, teh economy slider determines the
     cieling prosperity for the entire map" — and, of this item and item 115 (~01:00): "bundle these into the rewrite phase";
     and, of items 114–116 (~01:12): "bundle all this with g114-115". **What SettlementForge gives (read-only, from the
     survey of its branch `fp/integration-2026-09-23` @ `5d699cc68`, `research/sf/`):** five generation sliders —
     `priorityEconomy`, `priorityMilitary`, `priorityReligion`, `priorityCriminal`, `priorityMagic` — each 0–100 with default
     50, their resolved values in `config` and their raw inputs, `'random'` sentinels intact, in `_config`, which
     SettlementForge keeps secret on every shared surface (CONFIRMED); a further copy in `economicState.priorities`
     (CONFIRMED as a key; that it always equals `config` is PLAUSIBLE only, since `resolveConfig` floors one priority); no
     survey found a writer of the sliders after birth (PLAUSIBLE that they keep their birth values); the settlement's wealth
     is one live word, `economicState.prosperity` (Subsistence … Wealthy), which births reach up to Prosperous (41) but never
     Wealthy ("Wealthy only after lit ticks") (CONFIRMED); the 152 census dossiers generated from rotated configs sit at the
     default sliders (CONFIRMED), the three sample cards' slider values are not recorded (NOT ESTABLISHED); the sliders' UI
     labels, any banding of a slider value, the roll of `_randomizePriorities` and whether `priorityEconomy` moves the
     prosperity word are not recorded (NOT ESTABLISHED). **What the design has:** the standalone wealth slider
     (`Intent.wealthLevel` ∈ [0, 1], required; T1 `intend`; the basic panel's "wealth level"; II.7.1's default 0.5); a
     dossier's wealth level from its prosperity word (DR6, V08 §2.6's `wealth` row); per-town quantile cuts (`FieldBands`,
     §4.5), so "rich" is relative to the town; item 72 (d‴)'s per-district band range, the only ceiling today;
     `config.priority*` on §7.7 item 1's never-read list (item 86; research row 54, J-M5). Program's interpretation
     (vetoable):
     **(a) THE SLIDER — one control, one value.** The **economy priority**, `Intent.economyPriority?: number` — a real in [0,
     100], SettlementForge's range, stored as given; absent reads 50, its default — declared in §7.7's `Intent` and recorded
     in `Recipe.intent` (§2.9). (1) *Hosted:* the port reads the resolved `config.priorityEconomy` into
     `DossierDigest.settlement.economyPriority?: number`, clamped to [0, 100] (noted `value_clamped`), absent where the
     dossier carries none or a non-number (noted `value_absent`); `_config` (raw sentinels, SettlementForge's secret) and
     `economicState.priorities` (a second home of the value, which the closed digest leaves unread) stay unread. The port's
     creation half writes it into `Recipe.intent.economyPriority`; a dossier without it leaves the recipe's value absent
     (50), a map fact the author may change. The economy priority the creation's absorb carried — the creation prefix's
     `dossierFacts` event — is one of the settlement's own facts, carried in `Document.dossier` and `Recipe.intent` on no
     entity (§2.8's dossier paths; §7.7 item 9): dossier-owned exactly when that absorb carried a value, and a value that
     arrives, changes or vanishes later never re-tiers it or moves it ((e)). (2) *Standalone:* T1's wealth slider IS this
     control, re-pointed and renamed — label **"Economy"** (the program's pick: the word both of SettlementForge's keys for
     it use; its own UI label is not recorded), range 0–100, step 1, default 50, continuous — so the basic panel keeps twelve
     controls (§7.8's control-surface budget, R15; J-A101.77). `Intent.wealthLevel` becomes optional. **The wealth level in
     force** — the one term every reader of the wealth level reads: layer 1's expansion, II.7.1's TOWN sewer law, item 71's
     class mix, DR8, V05's `S_town` fallback, V07's `bandShares` — is the recipe's `wealthLevel` where set, else
     `economyPriority ÷ 100` (a §7.7 layer 1 derivation row), and at an epoch the `EpochInputs.wealthLevel` installed past
     `dial.hysteresis` (V06 §3.3.5). So the Economy moves the town's overall wealth exactly as the wealth slider did — the
     one-click default is the Economy at 50 with the wealth level derived 0.5, the value II.7.1, §13.2's sweeps and T15-1
     take — and, below 50, its prosperity ceiling too. A preset or form row that sets `wealthLevel` keeps it (§7.5). Where a
     wealth level is stored (every document older than this item, where it was required; any document whose advanced Wealth
     level an author set; a dossier map, whose port fills it from the word), the Economy moves only the economy priority and
     shows `hint.wealthSeparate` — "Wealth level {w} is set separately (Advanced)."; the advanced **Wealth level** (0–1)
     shows the layer word "from the Economy" while absent and carries **Follow the Economy**, `adjust('intent.wealthLevel',
     null)` (Re-derive from S0), which clears it; on a dossier map it is filled from the word, a map fact, editable (V08
     §5.1), and it moves the town's mean, never its prosperity ceiling ((b) 2). A standalone neighbourhood's
     `HoodRecipe.intent.wealth`, absent, reads the same wealth level in force (V01); the village product's T1 slider is the
     same control (V07). **Surprise me** draws the economy priority as 100 × the wealth level's draw, in the wealth level's
     place in its draw order on `intent.surprise`, and writes no wealth level — so a surprise town's wealth is today's draw,
     and below 50 it now has a prosperity ceiling. (3) *Host frame:* where the creation's absorb supplied it, the Economy is
     dossier-owned — shown locked (`host.locked`); its `adjust` is refused `dossier-owned` (§7.7 item 11), the advanced
     Wealth level offered as the map-side alternative for the town's overall wealth; while SettlementForge's carried value
     differs from the recorded one, the lock's hint shows V08's `host.note.frozen_fact_changed` line ((e)). Absent in the
     dossier, the Economy is a map fact and editable. (4) *Registry (§7.8):* id `intent.economyPriority`; label "Economy";
     output metrics the median plot area and the top band's household share; range 0–100; default 50; consuming stage S0
     (II.7.1's TOWN sewer law reads the wealth level in force); locality *re-derive from S0*; continuous, with item 115's
     economy clause a declared owner step at 75, reported, outside the sweep (which runs with islands off); anchor §4.5.
     §7.1's early-parameter list (seed, rung, …, wealth level, the pack list) gains the Economy.
     **(b) THE PROSPERITY CEILING — a position on the band set, one table, the dossier's word lifting it.** The **prosperity
     ceiling** is a position `at` on the band set's ranks (`squalid` 0 … `rich` 5 on the default set); the **highest allowed
     band** is the band `c` at rank ⌈at⌉ — the highest band any household, plot, district or building may take — and its
     **share** `f = at − ⌈at⌉ + 1` ∈ (0, 1] is the part of the would-be mass at and above it that it keeps ((c)). Design text
     writes "prosperity ceiling", never a bare "ceiling": item 72's "ceiling band", a district range's upper end, keeps its
     meaning. (1) *The table:* `BandSet.ceiling: BandCeilingRow[]`, with `interface BandCeilingRow { economy: number /* 0–100
     */; band: string /* a band id of the set */ }`, ascending in `economy` with band ranks non-decreasing — one cell of
     `prosperity.bands` (V11 row 6), provenance `own` (the program's reading under J122, vetoable), `calibratable: false`
     ("no corpus measures a slider"), and no `ownerRule` stamp: the owner fixed that the economy slider sets the prosperity
     ceiling, not these rows, so V12 §1 lists the rule, never the rows. It is read by linear interpolation in rank and held
     at its end rows. Default rows `{ 0, 'modest' }` and `{ 50, 'rich' }`: on the default set `at = 2 + 3 · min(e, 50) ÷ 50`
     — economy 0 gives `modest` whole, 16⅔ `comfortable` whole, 33⅓ `prosperous` whole, 50 and above `rich` whole, which is
     no prosperity ceiling. *Why:* the default must be the identity — emulation first (FTG's aristocratic tier and MFCG's
     patriciate exist at their defaults) and SettlementForge's own default births reach Prosperous — so the one-click town,
     the goldens and every parity run stay as they are; the lowest row is `modest`, FTG's modest tier and MFCG's craftsmen,
     below which the whole town would be poor, which no reference town shows and no village rung's shares reach (V07's THORP
     keeps comfortable and prosperous households); linear rows make the Economy a continuous, monotone control (§7.8).
     `BandSet` is declared once, in §2.5 beside `FieldBands`: `interface BandSet { bands: { id: string; share: number /* the
     default household share */; ftgTier: string; mfcgClass: string }[] /* in rank order */; blend: 'linear'|'step' /* 'step'
     under the parity presets, item 23 */; ceiling: BandCeilingRow[] }`, the table's name and version being the registry's
     (§7.6); a pack's band set without `ceiling` rows reads the single row `{ 0, <its top band> }`, no prosperity ceiling.
     (2) *The position:* the pure function `ceilingAt(economyPriority, bandSet, liftWealth?)` (§4.5; called by S2, the epoch
     prelude and, for item 116's top means, S3, S4, S5a and S5b — every reader that runs before S6 writes the record) — the
     table's rank at the economy priority, raised by the **wealth lift** to `rank(wealthBand(w))` wherever that is higher,
     `wealthBand(w)` the band of V08 §2.6's `wealth` row whose value is the largest not above `w` (below every row, the
     lowest row's; a row whose band the set lacks skipped) — the band DR6's bar reads. `w` is never an author's value: at the
     first generation it is the dossier's own word (DR6's wealth level from `wealth.label`), after it the lived wealth ((e));
     standalone at the first generation there is no lift. So a dossier's word always keeps its own band allowed (item 20 (h):
     Wealthy keeps `rich`, Prosperous `prosperous`, Comfortable `comfortable`) and a low slider never contradicts it, while a
     word below the economy's row changes nothing. The lift is the least item 20 (h) requires — the word's own band, no
     margin above it — so the owner's rule yields only where the dossier's truth forces it. `FieldBands.ceiling.by` records
     the term that set the position, `'economy'` where both give the same. (3) *Rungs:* no rung row caps a band (§1.1);
     `RungProfile`'s band-keyed rows (`granularity.joinMaxDelta`) are read by (c) 4. (4) *Parity presets:* the `ceiling` cell
     carries `presets` entries, the single row `{ 0, <the set's top band> }`, for `MFCG`, `FTG` and `VG`, and `NG` resolves
     as `MFCG` does (§7.6); `FM`, building-scope, carries none. So under a parity preset the Economy moves only the wealth
     level, as the wealth slider did. (5) *The table at its limits* (§10.2's EP-18 list; V11's compiler, T-V11-2): an empty
     `ceiling` reads no prosperity ceiling; unsorted knots are sorted, a duplicate knot's later row winning, named in the
     report; a knot outside [0, 100] is clamped; a band the set lacks, or a band rank that falls as the economy rises, is
     refused at compile (tier 1, the table's reason row) and an edit that would write one is bent to the nearest lawful row.
     **(c) HOW IT BINDS — the band, never the value.** (1) *The fold (S2).* With `w_r` the residential household shares by
     rank after S2's town-level character shift and `W = Σ_{r ≥ c} w_r`: band `c` holds `f · W`, band `c − 1` holds `w_{c−1}
     + (1 − f) · W` (no such term when `f` = 1), every band above `c` holds 0, the rest are unchanged — continuous and
     monotone in `at`, and the identity exactly when `at ≥ r_max`, the highest rank holding a share. Every other demand row's
     households at a band at or above `c` — a workplace's lifestyle band, a hinterland class's — split the same way, `f` of
     them at `c` and the rest at `c − 1`, rounded by the roster's rule; one entity's band (an institution's) is a discrete
     read by (4). S2 reads the position from `ceilingAt`, since it runs before S6 writes the record; S5d's provisional cuts,
     at generation and at an epoch, are §4.5's folded cuts. A lower Economy therefore builds a smaller town, since poorer
     households' plots are smaller. (2) *The cuts (S6):* §4.5 computes the cuts from the folded demand; every cut at or above
     band `c`'s upper boundary reads 1, and banding reads a value into the lower of the band its cuts give and `c`. A
     fixed-cut set (a standalone neighbourhood's default cuts, J-V1.9) applies the share by one cut: every cut at or above
     band `c`'s upper boundary reads 1 and the cut between bands `c − 1` and `c` is raised to `lower_c + (1 − f) · (1 −
     lower_c)`, so band `c` keeps the top `f` of its value range — J-V1.9's cuts at `f` = 1 and the top rank, band `c` empty
     as `f → 0`. `FieldBands.middle` is designated from the folded shares. (3) *The field is untouched:* `P(x)` is neither
     clamped nor compressed; the richest quarters keep their order and their distances in the value, which the class mix's
     prestige order, `S_town` and the drivers oracle read. A value clamp was rejected — with per-town quantile cuts it binds
     no band, it flattens the top quarters to one value, and standalone it would count the economy twice, since the Economy
     already moves the absolute level through the derived wealth level; a compression of the upper tail was rejected because
     it would move directly the absolute values `S_town` and V05's calibrated supply rows read (the fold moves them only
     through the town's extent). (4) *Reads — continuous at every position:* `R(b)` is a rule table's row for band `b` — its
     own row, or, for a band it carries none for, the row §4.5's interpolation gives at `b`'s centre. Under a prosperity
     ceiling below the top, band `c`'s row is `R*_c = lerp(R(c − 1), R(c), f)` (`R(c)` where `c` is the lowest band), read as
     the end row: values up to band `c − 1`'s centre read by §4.5's rule on the rows at or below `c − 1`, values between band
     `c − 1`'s centre and band `c`'s interpolate from `R(c − 1)` to `R*_c`, values above band `c`'s centre read `R*_c`, and
     no row above `c` is read. At `f` = 1 this is §4.5's end-band rule at `c` and at the top rank today's read; as `f → 0` it
     tends to the rule at `c − 1`. An interval row — item 116's means `[lo, hi]` — is read by item 116 (f)'s one statement of
     it, whose upper end is `R*_c`'s. It holds for every table read along the value — granularity, the designation templates'
     continuous columns, greenery, the hidden-plot shares, the class mix; a read at an entity's own band (the interior ladder
     at the occupants' band, a template's discrete columns) reads that band's own row, every such band lying at or below `c`
     but a held one's ((7)). A discrete read keyed by one named band at or above `c` — one entity's lifestyle or institution
     band, a template row, an `IslandInstitution.requirementBand`, a placement criterion's `prosperityBands` filter — reads
     `c` with probability `f` and `c − 1` otherwise: one draw per entity, keyed by that entity on the concern that already
     draws for it (`roster` by the row's ordinal, `siting` for a placement, `island.place` `reason:k` for an island row),
     made only where `f` < 1, so an uncapped run draws nothing new. So "the rich quarter" means the town's richest. (5)
     *Which bound wins:* each end of a district's `bandRange` is lowered to `c` where it lies above it — the map's prosperity
     ceiling wins over item 72 (d‴)'s rows — and the range still holds the district's own band (J-A72.50), which never lies
     above `c`; the three dials stay inside the range; the pressure's `excess` is measured against the range as lowered, so
     at `c`, whose upper cut is 1, no upward excess arises. A capped town's richest quarter therefore mixes in the band below
     its richest (`[c − 1, c]`): the exclusive enclave of the `rich` row's upper half is the patriciate's, which a town
     capped below it does not have. (6) *The other terms:* item 102's daylight and item 111's water terms stay value terms
     (their bars hold a fortiori); the underground (`undergroundOffset`) and the undercity (`undercityOffset`) are banded by
     the town's `FieldBands` (II.7.3, II.7.5), so never above `c`; the shanty trigger reads the folded shares. (7)
     *Precedence* (lock > dossier existence > assignment > drawn geometry > rule tables > defaults; the prosperity ceiling is
     a rule-table bound): a locked, pinned or declared entity above it holds, `EditFate { fate: 'kept', reason:
     'held_above_ceiling' }`, listed. An author's explicit band above it is HELD, never bent: T5 `quarter`'s band (its sugar
     expansion gains, where the band lies above `c`, a `setAttr` of the district's band beside its stroke — the path §7.1's
     T5 row binds, held in `LifecycleFlags.editedPaths`), a `setAttr` of a district's band, or a `setAttr` on the
     `FieldBands` cuts that opens a band above `c`. The plots of such a district, and of a band an author's cuts opened, band
     at the declared band (the banding clamp of (2) skips them); the households S10a homes there read that band, raised from
     the fold's and listed; the rest of the town keeps the fold; a re-derivation that recomputes the cuts re-applies the
     prosperity ceiling to every cut the author did not set. The dry run confirms the fate with `info.ceiling.held` and
     `button.economyUp` ((h)). A T8 prosperity stroke moves values, which band by the town's cuts under the prosperity
     ceiling; to hold a band above it the author declares the band (T5). A dossier-backed element exists with its own class,
     built by (4)'s reads, its occupants at most `c`; an assignment's class stands, its occupants at most `c`. A seat the
     government row forces (V07's `v.manor_house`, the base's government seats, §10.2) keeps its class's own toft and
     template rows — its geometry is the seat's, as at a THORP today, where no household is rich — while its occupants' band,
     condition and upkeep read at most `c`. (8) *Dossier facts are never moved:* the population (the fold moves shares, never
     counts), the institutions, the prosperity word (it only lifts), the priority itself (read, never written).
     **(d) THE RECORD, AND WHAT READS THE SLIDER.** *The record:* `FieldBands.ceiling?: { at: number /* the position on this
     record's band ranks */; by: 'economy'|'wealth' /* 'wealth': the dossier's word or the lived wealth */ }` on the
     prosperity record (§2.5). S6 writes it with the cuts only where `at` lies below the top rank — at the top rank the
     record carries none, so every uncapped town's model digest is today's — and every epoch that rewrites the cuts rewrites
     it ((e)). It is read after S6 by S7b's provisional range, S10a's `bandRange`, every band read of S10b and S11, item
     116's top means (S7, S10, S10a, S11, II.7.2 and §4.11's builds; S3 to S5b read `ceilingAt`, (b) 2), V01's dispatch,
     V05's island reads, `ProsperityField.drivers()` (which fills `FieldDrivers.ceiling`, (h)), the why card, the Wealth
     legend, the report panel and the clerk; model data in the digest; derived, with no edit kind (§7.1's edit-target row
     names it derived; a `setAttr` naming it bends, (h)); absent is no prosperity ceiling; load recomputes it with the cuts.
     *Reads the economy priority:* the creation — standalone `generate`, T1's first map, Surprise me, a skeleton imported as
     a new document, the port's creation half, and a history-first generation's peak and replay (item 113; (f)); a whole-map
     regenerate from the recipe (Regenerate keep settings, a whole-map New random), which reads the RECORDED value, never the
     dossier's current one; T1's Economy drag, `adjust('intent.economyPriority', v)` — a Re-derive from S0 whose ghost
     regenerates the whole town under the hand and whose fates show "prosperity ceiling: {old} → {new}" (standalone, or a
     dossier map whose creation carried none); and the dry runs of these. *Carries the record, never re-reading the
     priority:* local edits and scoped regenerations (brushes, T5, placements, a scoped New random); undo and redo (each
     Economy change one undo step, the fold restored with its record); load (the replay recomputes the record from the recipe
     and the log). *Lifecycles:* `Intent.economyPriority` — created by T1, a blueprint, Surprise me or the port's creation
     half; read by `ceilingAt`, the layer 1 derivation, item 115's economy clause, the clerk and the report panel; persisted
     in `Recipe.intent`; regenerated as recorded; undone by the adjust's inverse; migrated absent → 50, the identity.
     `BandSet.ceiling` under an `editTable` — created by the edit; read by `ceilingAt`; persisted in the pack and the
     `tablePins`; re-derived from S2; undone by the edit's inverse; migrated absent → `{ 0, <top> }`; the report names the
     departure ("prosperity ceiling rows edited (owner rule 114)"); no stamp binds a user's edit (IN-V11-1).
     **(e) AFTER THE FIRST GENERATION — the founding prosperity ceiling carried, the lived wealth lifting it.** The owner's
     rule binds the first generation: the economy priority is read from its source (the dossier, T1, a blueprint) once per
     creation and recorded in `Recipe.intent.economyPriority`, and every later reader reads that recorded value. What follows
     is the program's reading (vetoable). At every epoch the position is `ceilingAt` of the recorded priority with the wealth
     lift at the **lived wealth** — `EpochInputs.wealthLevel` once it has replaced the level in force past `dial.hysteresis`
     (V06 §3.3.5): the dossier's changed word by receipt F9 through V08 §3.5's `wealth` diff row (W-DOS-02), or a standalone
     trajectory's target; BCR-V6-9's field, which the pipeline's late seat writes into §4.11's `EpochInputs` — computed in
     the epoch's prelude before S2's delta demand, which is folded at it. §4.11 states the prelude's one order: the epoch's
     slice (the magic in force, the partners), deposit states and `TradeFlow`; the lived wealth; this position; item 116's
     material supply (116 (d)); then S2's delta demand and the epoch's builds, whose materials read this position (116 (f)).
     An epoch whose position differs from the record rewrites the cuts by §4.5's rule from the whole town's residential
     demand folded at the new position, with the record, at §4.11 step (a); otherwise this item changes nothing in how an
     epoch treats the cuts. So a lived settlement whose word rises (SettlementForge's lit ticks) or a standalone history
     whose trajectory raises the wealth grows richer than its founding allowed: the occupants' field band re-bands at the
     epoch by §4.5's rule and the built geometry follows by the wealth ladder; a fall brings the position back toward the
     founding's row, never below it, survivors keeping `builtBand` and item 31's floor. *Why (the program's):* realism — a
     town's top never jumps without cause, and a prosperity ceiling that lapsed at the first epoch would give an economy-10
     town grown by 1 % a rich band at once; no survey found a writer of SettlementForge's sliders after birth (PLAUSIBLE)
     while its prosperity word lives (CONFIRMED); item 20 (h) keeps the lived word the truth. *Rejected:* the prosperity
     ceiling lapsing after the first generation (the jump above); following the slider's current value (the owner said the
     first generation); a ratchet (history state for no gain); a limit of one rank per epoch (the word is the dossier's
     truth, the ladder already paces the geometry, and an epoch runs from a week to decades). *A later slider change in the
     dossier* (a same-id re-offer): the settlement's carried fact gains `economyPriority?`, and V08 §3.5's settlement diff
     row compares it and, where it changed, writes one `frozen_fact_changed` note (W-DOS-08's note for a creation-only fact;
     class report; args `field`, `was`, `now`) — no event and no model change: every later reader reads the value recorded at
     creation, so the change re-derives nothing (§7.7 item 11 (b)); a SettlementForge generation with a new seed is a new id,
     a new map whose creation reads its slider. *A later change in the panel:* standalone, the Economy is an adjust that
     re-runs the first generation (Re-derive from S0 with carry-over); in host mode it is refused `dossier-owned` where the
     creation's absorb supplied it.
     **(f) HISTORY (item 113).** A history-first generation IS the first generation: its peak is generated under the recorded
     priority and the dossier's word at creation — SettlementForge records no history of either, so none is invented — and
     every replayed epoch carries the prosperity ceiling by (e), constant while no wealth arrives. So no remnant, ruin,
     survivor or `builtBand` lies above it at any replayed epoch; the high-water mark sizes the extent (a population), never
     a band; a symbolic peak (item 113 (f)) the same. In a destruction and refounding (item 113 (b)) both settlements are
     generated under the recorded priority, and their ruins and buried remains carry no band beyond their `builtBand`. The
     clerk's story names the prosperity ceiling where it bound ("even as a city, its richest households were only
     prosperous").
     **(g) J-M5 AND ROW 54 — narrowed, not reversed.** `config.priorityEconomy` moves from §7.7 item 1's never-read list to
     one named consumer — the port's creation half, which copies it into `Intent.economyPriority` for this item's prosperity
     ceiling and item 115's economy clause. Nothing is counted twice: a bound and a gate clause add no weight to anything the
     institutions (DR9) or the income shares (item 72's economy dial, DR13) carry — the fold bounds the top of the household
     band distribution, which neither states, and the clause decides whether islands may rise, which neither states — and on
     a dossier map the slider never sets the wealth level (the word does, DR6). Whether `priorityEconomy` moves
     SettlementForge's prosperity word is not recorded (NOT ESTABLISHED); if it does, the word sets the mean and the
     prosperity ceiling bounds the top — two moments, not one weight counted twice. `priorityMilitary`, `priorityReligion`
     and `priorityCriminal` stay never-read, and `priorityMagic` is read once at creation by item 115 (a) 1 (the program's
     correction of 2026-09-30); §7.7 item 1's list reads "its generation sliders (`config.priority*`) but `priorityEconomy`
     and `priorityMagic`, each read once at creation (items 114, 115)", and V08's J-V8.45, BCR-V8-25 and T-V8-20's ignore
     clause follow it.
     **(h) EXPLANATIONS AND WORDS** (V09's rows unless named). The why card on a plot in band `c` while the prosperity
     ceiling lies below the top shows `info.ceiling` — "The town's economy ({economy}) caps its prosperity at {band}." — or,
     where the lift set it, `info.ceiling.wealth` — "Its wealth ({word}) lifts the cap to {band}." — carried by V10's
     `FieldDrivers.ceiling?: { band: string; economyPriority: number; by: 'economy'|'wealth' }`, which `drivers()` fills from
     the record where the points' band is `c`; there is no driver term, so the terms still sum to the stored value
     (T-V10-10). The words name the highest band the model holds (band `c` may hold no household when `f · W · N` is below
     one half; the words then name `c − 1`), and the report gives ⌈at⌉ and `f` beside it. The Wealth view's key (§8.2's rule:
     a theme's key lists only the values drawn) closes, where `FieldBands.ceiling` is present, with "Richest here: {band}".
     T1's Economy shows `hint.economyRichest` — "Richest households: {band}" — below 50 only. The report panel's recipe line
     is `report.ceiling` — "Prosperity ceiling: {band} ({f}) — economy {economy}", with ", lifted by its wealth" where `by`
     is `'wealth'`. A held band ((c) 7) is confirmed with `info.ceiling.held` — "Richer than the town's economy allows
     ({band}); held as you drew it." — and `button.economyUp`, commit `event:economyTo` = `adjust('intent.economyPriority',
     n)`, `n` the least whole economy at which the asked band is reached whole (17 comfortable, 34 prosperous, 50 rich on the
     defaults), absent where the Economy is dossier-owned. A `setAttr` naming `FieldBands.ceiling` bends with
     `bend.ceiling.follows` — "The richest band follows the town's Economy." — and `button.openEconomy`. The fate rows are
     `fate.held.ceiling` and, for V05's existing `held against its supply` — the island supply law's, II.6, never item 116's
     material supply — (`reason: 'held_against_supply'`), `fate.held.supply`. The clerk (V10): `IntendInput` gains `economy?:
     number /* 0–100 */`; the lexicon's six wealth rows (penniless … opulent) take the field `economy` at their value × 100
     (8, 25, 42, 55, 72, 90); V10 §4.1's T1 encoder writes `economy` to `intent.economyPriority` (creation) or
     `adjust('intent.economyPriority')` (edit), and also as `wealth` = economy ÷ 100 to `adjust('intent.wealthLevel')` where
     a wealth level is stored, or instead of it where the Economy is dossier-owned; "why is no quarter rich?" is answered
     from `FieldBands.ceiling`.
     **(i) EDGES — outcome; rung of §5.1's ladder where it can fail; test.** (1) Economy 0: `modest` whole (97.8 % of the
     default town's households in it); tier 0, feasible by construction (T114-2). (2) 100 and (3) the default 50: no
     prosperity ceiling, no record, the identity (T114-1). (4) The knots and every fractional position: continuous by
     construction ((c) 1, 2, 4); should §7.8's sweep still fail, its fallback replaces only the layer 1 derivation row
     (`wealthLevel = economyPriority ÷ 100`) over the failing interval — the `ceiling` rows are not calibratable and no
     fallback moves them — and, failing again, the control is declared discrete at the steps its report lists (§7.8 (2))
     (T114-3). (5) A band `c` that rounds to no household (`f · W · N` below one half, e.g. economy 16.67 at TOWN): (c) 4's
     reads and (h)'s words (T114-2). (6) A dossier's word above the economy's row: lifted, `by: 'wealth'`; an author's wealth
     level above the Economy: no lift — the mean moves, the fold caps the top, and the advanced Wealth level shows
     `info.ceiling` with `button.economyUp`, `n` for the band its value names by V08's `wealth` row (T114-5). (7) A THORP and
     the village product: V07's `bandShares` folded (a THORP's `rich` is 0 already, so its fold is the identity at economy ≥
     33⅓); the forced manor keeps its seat's rows ((c) 7) (T114-9). (8) A METROPOLIS: the same table, no rung term;
     `joinMaxDelta`'s rich entry unread while `rich` is empty (T114-2). (9) The standalone neighbourhood: its fixed cuts
     share-adjusted ((c) 2); with `c` below `prosperous` its manor quota is 0 by V01's own formula (`H_top` = 0), so no manor
     block is made and F-DISPATCH never fires; where a quota still finds no household, F-DISPATCH's existing ladder (the
     block stays `ordinary`) (T114-9). (10) The underground and the undercity: never above `c`, by their banding (T114-2).
     (11) Locks, pins and declarations above the prosperity ceiling after an Economy lowered: held, their fates listed
     (T114-10). (12) An author's declared band or cut edit above it: held ((c) 7) (T114-10). (13) A custom or dossier
     institution whose class or `prosperityBands` filter asks for a band above `c`: placed and built by (c) 4, no F-SITING
     entry; a household no range admits still meets S10a's re-home ladder (tier 2) (T114-10). (14) A town at `at ≥ r_max`:
     the fold is the identity, and the model digest is the uncapped run's but for `FieldBands.ceiling` (T114-4). (15) A
     dossier missing the value or holding a non-number: 50, editable, `value_absent`; out of range: clamped, `value_clamped`
     — tier 5, substitution (T114-11). (16) A slider change after creation: (e) (T114-7). (17) Epochs, a rise, a two-band
     jump and a fall (T114-8). (18) The history replay and a refounding (T114-12). (19) An older document: reads 50, its
     stored wealth level kept, replays and upgrades with no prosperity ceiling, its Economy showing `hint.wealthSeparate`
     (T114-13). (20) An edited or pinned `ceiling` table at its limits: (b) 5 (T114-14).
     **(j) BARS (§13.2).** (T114-1) The no-op pin: at economy ≥ 50 the band shares, cuts, bands and every plot equal the
     uncapped town's and `FieldBands.ceiling` is absent; the one-click recipe writes neither `economyPriority` nor
     `wealthLevel`, and at 50 with the wealth level derived, standalone TOWN and CITY have the model digest and every stage
     digest (§6.2, §13.3) of the same town at `wealthLevel` 0.5 without this item, every other rule as filed (item 116's
     materials included) — B-CITY, the goldens, the realism golden (T13-1), every NG, FM and VG parity run — and the parity
     presets `MFCG`, `FTG`, `VG` and `NG` equal their no-prosperity-ceiling runs at every economy. (T114-2) The cap: on 50
     seeds at each of TOWN, CITY and METROPOLIS and economy 0, 10, 16.67, 25, 40 and 49, no household, plot, block, district
     band, `bandRange` end, composition row, occupants' band, underground or undercity plot lies above `c` but a held entity,
     and band `c` holds `f · W` of the households within the roster's rounding (± 1 household per band and stage). (T114-3)
     §7.8's sweep of the Economy (21 steps × 50 seeds at TOWN and CITY, METROPOLIS nightly, islands off) is monotone and
     continuous in the median plot area and continuous in the top band's household share, the class mix's manor share and the
     land share of workplaces in the top two bands, with continuity checks across the knots at 16 ↔ 17 and 33 ↔ 34. (T114-4)
     The value is kept: the drivers oracle on capped fixtures holds no prosperity-ceiling term and its terms sum to the
     stored value (T-V10-10); on a skeleton-imported document (item 101), whose drawn roads, walls and districts pin S5's
     output, economy 20 and 50 with the wealth level held equal give the same pass-1 field cell for cell — except where the
     shanty trigger's verdict differs, reported — and every pass-2 driver term but the placed institutions' and noxious
     kernels; inside band `c` the larger classes stand on the higher values (T71-1's monotone share); edge (14) holds.
     (T114-5) The lift: a fixture at Wealthy and economy 10 has the prosperity ceiling `rich`, `by: 'wealth'`; at Prosperous
     and 10, `prosperous`, `by: 'wealth'`; at Moderate and 0, `modest`, `by: 'economy'`; each of the 35 births and the 12
     after-tick dossiers, re-offered as V12's derived fixtures at `priorityEconomy` 0 and 10, has no plot above its
     prosperity ceiling, and T73-7 passes wherever it passes uncapped; standalone, economy 10 with the advanced wealth level
     0.9 keeps the prosperity ceiling at the Economy's row, `by: 'economy'`, and shows `info.ceiling`. (T114-6) Every
     district's `bandRange` lies at or below `c` and holds its own band; at economy 0 no range reaches above `modest`.
     (T114-7) A same-id re-offer that changes only `config.priorityEconomy` leaves the model digest unchanged and reports
     `frozen_fact_changed`; a migrated dossier document absorbing an offer that now carries the value keeps the Economy an
     editable map fact at 50; an offer that drops the value changes no tier; Regenerate reads the recorded value; a
     standalone Economy change re-derives from S0 and its undo restores the digest; an adjust of a dossier-supplied Economy
     is refused `dossier-owned`. (T114-8) A history whose wealth rises past a band (F9 to Wealthy; a trajectory target of
     0.95; a two-band word jump) lifts the prosperity ceiling at that epoch, the reopened band's lower cut below 1 and the
     record rewritten; the position never falls below the founding's row; no plot's `builtBand` or built geometry moves by
     more than the wealth ladder's step in an epoch; with the wealth held, 20 epochs keep the founding's prosperity ceiling.
     (T114-9) The slum card (economy 10) and the great-houses card (90) of a standalone neighbourhood hold nothing above
     their prosperity ceilings; a hood swept over economy 30–40 shows no step at 33⅓; the hood's manor blocks are 0 below
     `prosperous` with no F-DISPATCH entry; a seigneurial VILLAGE at economy 0 keeps its manor on the manor toft with no
     F-PLAN, its lord's household at `modest`; DR6's bar holds at village rungs wherever it held uncapped. (T114-10) An
     Economy lowered from 60 to 10 keeps every locked, pinned or declared building with its fate; a T5 band chip above the
     prosperity ceiling is held with `held_above_ceiling`, its plots banded as declared, and its undo restores the digest; a
     `setAttr` of the cuts reopening `rich` holds; a `prosperityBands: ['rich']` criterion places by (c) 4 with no F-SITING
     entry; a dossier institution whose class reads `rich` stands. (T114-11) The port reads `config.priorityEconomy` — and,
     for item 115, `config.priorityMagic` — and no other slider (T-V8-20's ignore clause with the three others, `_config` and
     `economicState.priorities`); absent reads 50, noted `value_absent`, editable; 140 reads 100, noted `value_clamped`.
     (T114-12) Item 113 (g)'s city-to-village fixture, run as a standalone blueprint history (item 113 (a) 1) at economy 20:
     no survivor, remnant, ruin or `builtBand` above the prosperity ceiling at any replayed epoch, the peak generated under
     it; a refounded fixture the same for both settlements; byte-stable per seed and history. (T114-13) A document written
     before this item replays byte-identically at its own output version and upgrades with no prosperity ceiling in its diff;
     its Economy shows 50 with `hint.wealthSeparate`; Follow the Economy re-derives it with the wealth level at 0.5, and its
     undo restores the digest. (T114-14) Each malformed `ceiling` table of (b) 5 is refused at compile with its reason row,
     each such edit bent, and an empty table reads no prosperity ceiling.
     **(k) THE UNITS — applied IN the coherence pass's Rewrite phase with items 115 and 116 (owner, 2026-09-30 ~01:00:
     "bundle these into the rewrite phase"; ~01:12: "bundle all this with g114-115"): the units whose rewrite had landed when
     this item was filed — the base parts model, kernel, pipeline, determinism and rendering, and the volumes V03 and V04 —
     in a late rewrite seat where they have a part; every other unit in its main rewrite. One canonical home per shared
     decision (STATES); every other unit cites it (REFERENCES); the three items' one routing is
     docs/validation/coherence/work/g114-116/routing.json with the canon's ruling of 2026-09-30.** *Base — model (§2), late
     seat:* STATES §2.5's `FieldBands.ceiling` and the `BandSet` declaration with `BandCeilingRow`; §2.8's dossier-paths list
     ("its name, tier word, population and economy priority at creation"); REFERENCES §4.5, §7.7. *Base — kernel (§3):* no
     part. *Base — pipeline (§4, §10, PART II, PART III), late seat:* STATES §4.5's prosperity ceiling whole — (b)'s table,
     defaults, parity entries and limits, `ceilingAt` and the wealth lift, (c)'s fold and demand split, the cuts with the
     fixed-cut rule, the continuous reads, the band-range rule and the enclave sentence, the precedence with the held band's
     banding and the forced seat, the record's writing rule, `drivers()` filling `FieldDrivers.ceiling`; §4.2 S0's and §4.7
     S10b (2)'s "the wealth level in force", S2's fold, S5d's folded cuts; §10.2's rows read by (c) 4 and EP-18's limits;
     II.7.1's wealth level in force ("derived from the Economy, 0.5 at its default 50"); §4.11's prosperity ceiling at each
     epoch, the cut rewrite, `EpochInputs.wealthLevel?` and the history-first and refounding sentences; REFERENCES II.7.3 and
     II.7.5 (their banding caps), PART III (V07's fold). *Base — determinism (§5, §6, §7), late seat:* STATES §7.7 layer 1
     (`Intent.economyPriority`, the optional `wealthLevel`, the wealth level in force and its derivation row, Surprise me,
     and the exception "the filled values are map facts, but the economy priority the creation's absorb supplied"), §7.7 item
     1's narrowed list with (g)'s reason, item 9's dossier facts gaining "the settlement's economy priority at creation where
     the dossier supplied one", item 11's refusal gaining "an adjust of the economy priority the dossier supplied at
     creation", the derivation table's DR6 (inputs gaining `settlement.economyPriority`; bar gaining "no plot above the
     highest allowed band but a held one"), DR7 and DR9 (inputs gaining `settlement.economyPriority`) and DR8 ("the wealth
     level in force"); §7.1's early-parameter list (the Economy), its edit-target row (`FieldBands.ceiling` derived) and the
     T5 `quarter` sugar's held band; §7.4's `regenerate / adjust / re-derive from Sk` row naming the Economy (from S0) and
     Follow the Economy, and the `quarter` row's held fate; §7.5's rows (`economyPriority` absent reads 50; a stored
     `wealthLevel` stays; `FieldBands.ceiling` absent is none; `BandSet.ceiling` absent is `{ 0, <top> }`); §7.6's `ceiling`
     cell with its parity entries; §7.8's Economy row, the basic panel's "Economy" in place of "wealth level" and the
     advanced Wealth level; §5.3's coherence row "no household, block band, plot band, `bandRange` end or occupants' band
     above the highest allowed band but a held entity" (stage-end S6, S10a, S11; each epoch); §6.2's recorded inputs (the
     recipe's economy priority); REFERENCES §4.5, V08. *Base — rendering (§8, §9, §11, §12), late seat:* STATES §8.2's Wealth
     key closing line where `FieldBands.ceiling` is present; REFERENCES V09. *Base — scope (§0, §1, §13–§17, judgment index),
     main rewrite:* STATES §13.2's T114-1 – T114-14; §14's `DossierDigest.settlement.economyPriority?`, the port's creation
     and absorb duties for it, `PortNote.kind`'s `value_absent`, `value_clamped` and `frozen_fact_changed`, and the T1 row
     ("drag the Economy slider"); §1.2's defaults (the Economy at 50, the wealth level derived 0.5); §0.2's row 114
     (principal home §4.5); the judgment index's J-A114.21, J-A114.41 – J-A114.48, J-A114.71 – J-A114.75 and J-A114.81 (the
     first digit naming the part that states the rule; titles in the canon's ruling of 2026-09-30); §16's placement (the
     Economy and the prosperity ceiling at M2b with the prosperity field and its band set, the port's reading at M-SF);
     REFERENCES §1.1 (no rung caps a band). *V01:* STATES the hood's Economy (`Recipe.intent.economyPriority`;
     `HoodRecipe.intent.wealth` absent reads the wealth level in force), the cards' values (great houses 90, slum 10), the
     shanty condition `intent.wealth ≤ 0.2` read as the wealth level in force, the manor quota at 0 below `prosperous`;
     REFERENCES §4.5 for the fixed-cut rule and the band ranges. *V02:* REFERENCES (c) 4 at §3.2 step 3 — the significance
     shift reads at most band `c`'s row — in one sentence. *V03, V04:* no part of this item (V04's underground and undercity
     are banded through II.7's `FieldBands` reads, its wealth-level rows are the dossier's explicit value or a test's; V03's
     rooms follow the occupants' band); their late seats carry item 116's parts. *V05:* STATES that its `S_town` fallback
     reads the wealth level in force; REFERENCES (c) 3–4 (`S_town` untouched; an institution island's `requirementBand` read
     by (c) 4; a held island's carried bands at most `c`) and item 115 (e). *V06:* STATES the prelude's computation of the
     position (after the wealth level, before S2's delta demand), the cut rewrite at row 4 (`field`), BCR-V6-9's field as the
     lift's input, start small and the replay under the prosperity ceiling, and its bars; REFERENCES §4.11. *V07:* STATES the
     fold on `bandShares`, the forced manor's rows, T1's Economy on the village, and DR6 at village rungs; REFERENCES §4.5.
     *V08:* STATES the adapter row `config.priorityEconomy` → `settlement.economyPriority` (range, clamp, absent), §4.6's
     rows for `value_absent` and `value_clamped` (class standing) and `frozen_fact_changed`'s args, the carried settlement
     fact's `economyPriority?` and §3.5's settlement diff row writing `frozen_fact_changed`, §2.7's lifecycle row (create:
     the adapter; read: the creation half and the diff; persist: the carried fact; regenerate and undo: none; migrate: an
     older carried fact lacks it and is filled at the next absorb with no event, the recipe keeping its creation value and
     tier), J-V8.45 and BCR-V8-25 restated, the host frame (the Economy locked where supplied, the wealth level editable),
     W-DOS-02's `wealth` diff row, which (e) reads, the census reading (the 152 generated dossiers at 50: no prosperity
     ceiling), and T-V8-20's ignore clause citing T114-5, T114-7 and T114-11. *V09:* STATES T1's Economy (label, range, step,
     default, `hint.economyRichest`, `hint.wealthSeparate`, its host lock), the advanced Wealth level (the layer word "from
     the Economy", Follow the Economy), `info.ceiling`, `info.ceiling.wealth`, `info.ceiling.held`, `bend.ceiling.follows`,
     `button.economyUp` with `event:economyTo`, `button.openEconomy`, `fate.held.ceiling`, `fate.held.supply`,
     `report.ceiling`, the Wealth view's legend line, and BCR-V9-2's cells. *V10:* STATES `IntendInput.economy`, the
     lexicon's wealth rows re-valued, §4.1's T1 encoder row, `FieldDrivers.ceiling` and the why answers. *V11:* STATES row
     6's `ceiling` cell in `bands.json` (provenance `own`, `calibratable: false`, its parity entries) and its compiler bars
     (T-V11-2); REFERENCES §4.5 for the rows. *V12:* STATES §1's owner-rule list entry (the rule, never its rows),
     `Level.intent?: { wealthLevel?: number; economyPriority?: number }`, the rule that a level setting `wealthLevel`
     explicitly keeps the economy at its default (so every existing bar, `T110b.elevated.prosperity` included, is unchanged),
     the derived fixture form `'<dossier>@economy<e>'` beside `'@pop×k'`, and the register's entries for the `ceiling` rows
     (own, not calibratable). *Scope:* BASE for (a)–(d) and (g)–(j); STAGED with evolution for (e) and (f).

115. **OWNER RULE — Floating islands at the first generation need both high magic and a high economy (owner, 2026-09-30
     ~00:55, replaced ~00:58; J127).** Owner (~00:55): "and only high magic on the slider allows for floating islands in the
     initial generation.", then (~00:58), replacing it: "actually floating islands has to have both high magic and high
     economy" — and (~01:00) "bundle these into the rewrite phase"; (~01:12, with item 116) "bundle all this with g114-115".
     High magic is read on the magic slider, as the owner said it (the program's correction of 2026-09-30,
     docs/validation/coherence/work/g114-115/program-correction.md). **What SettlementForge gives (read-only, from the same
     survey):** a magic slider `priorityMagic` (0–100, default 50) and a toggle `magicExists` among the wizard's raw settings
     (CONFIRMED); a resolved word `config.magicLevel` ∈ none, low, moderate (alias `medium`), high, which its step 1
     (`resolveConfig`) provides (CONFIRMED) — how it is resolved, from the slider, the toggle, culture or tier, is not
     recorded (NOT ESTABLISHED); `medium` in 152 of the 155 census dossiers and `low` in 3, none `high` (CONFIRMED);
     SettlementForge's own map profile reads `config.magicLevel`, `config.priorityMagic` and `config.magicExists`
     (CONFIRMED), so that the resolved `config` carries `magicExists` is PLAUSIBLE (its census city lists 23 keys without
     it); the 152 census dossiers generated without setting a slider sit at `priorityMagic` 50, the three sample cards'
     values are not recorded (NOT ESTABLISHED); the economy slider of item 114; no banding of either slider (NOT
     ESTABLISHED). **What the design has:** II.6's island rule — the model setting `recipe.layers.islands` (off by default,
     D-3), the rung gate, the supply law `h(S_town)`, `h(S_carried)` with the `magical_node` term, and no magic clause; V05
     §3.2 (1)'s `skyGate` with a parity clause and a dossier-only clause "magic not `none`"; §7.7 item 11 and J-V5.19's
     refusal of the setting where the dossier's `site.magic` is `none`, and V05 §4.4's wane of every island at a later
     dossier `none`, against V08's rule that the site is creation's (W-DOS-08); `CircumstanceSlice.magic` ∈ none, low, high
     (`none` by default) with no standalone control; V08 §2.6's `magic` row (medium → low, J-V8.47: "magic present but not
     shaping the town unless the dossier says `high`"); research row 12 ("none → no islands"; "word → a supply multiplier").
     Program's interpretation (vetoable):
     **(a) THE MAGIC THE GATE READS — the magic slider beside the map's one magic.** The gate reads two things. The **magic
     in force**: the creation slice's `CircumstanceSlice.magic` at the first generation and, at a later rising, the slice in
     force at that epoch — the one magic the lights, the magic-gated classes and the access kinds read. And the **magic
     priority**, `Intent.magicPriority?: number` — a real in [0, 100], SettlementForge's magic slider's range, stored as
     given, absent 50 — declared in §7.7's `Intent` and recorded in `Recipe.intent`, read once per creation and carried after
     it as item 114 (e) carries the economy priority; the gate reads it, and standalone the Magic control's word follows it
     ((2)); nothing else reads it. **High magic** is (b)'s reading of the two. (1) *Hosted:* "high magic" reads
     SettlementForge's magic slider, as the owner said it, with SettlementForge's own word beside it. The port reads the
     resolved `config.priorityMagic` into `DossierDigest.settlement.magicPriority?: number`, clamped to [0, 100] (noted
     `value_clamped`), absent where the dossier carries none or a non-number (noted `value_absent`, read 50), and the port's
     creation half writes it into `Recipe.intent.magicPriority` as item 114 (a) 1 writes the economy priority — one of the
     settlement's own facts, carried in `Document.dossier` on no entity, dossier-owned exactly when the creation's absorb
     carried a value. It reads SettlementForge's resolved word, `config.magicLevel`, through V08 §2.6's `magic` row into
     `site.magic` and the creation slice (none → none; low → low; moderate → low; medium → low; high → high), and where
     `config.magicExists` is false the row gives `none` whatever the word; `_config` (raw sentinels, SettlementForge's
     secret) stays unread. *Why:* the owner named the slider ("high magic on the slider"); SettlementForge's own `high`
     states that its world's magic is high whatever its slider; a world SettlementForge states without magic has none, and
     nothing floats there (item 20 (h)); and the one threshold on the slider is (b)'s. `priorityMagic` leaves §7.7 item 1's
     never-read list, read once at creation (item 114 (g)). The report names both values and their source ("magic moderate,
     slider 50 — SettlementForge"). A dossier whose `magicLevel` is absent carries no `site.magic`
     (`DossierDigest.site.magic?`, noted `value_absent`), and a word the row lacks the same (noted `unmapped_word`); the
     creation slice's magic is then the map's own, `none` under D-3, a map fact the author may change. The creation slice's
     magic word is dossier-owned exactly when the creation's absorb supplied it (§2.8's dossier paths, beside the typed
     slices; §7.7 item 9), and an `adjust` of it, or of a dossier-supplied magic priority, is refused `dossier-owned` (§7.7
     item 11's "a slice value the dossier supplied", and item 114's refusal for a priority). The site is creation's (V08
     §2.7; W-DOS-08): a later `magicLevel` or `magicExists` is compared by V08 §3.5's `site` row and a later `priorityMagic`
     by its settlement row, each writing one `frozen_fact_changed` note and moving nothing — so V05 §4.4's wane at a later
     dossier `none` is withdrawn. (2) *Standalone:* a new advanced-panel control **Magic**, mirroring SettlementForge's magic
     slider and its `magicExists`: a 0–100 slider, the magic priority (label "Magic", step 1, default 50, high at 75 or
     more), with a switch **No magic in this world**, on by default (D-3). The switch is the creation slice's magic: on,
     `none`; off, the word the slider reads — `high` at a magic priority of 75 or more, else `low` (a §7.7 layer 1 derivation
     row) — so the lights, the magic-gated classes, the access kinds and the gate read one magic. Its registry rows (§7.8):
     `intent.magicPriority` (consuming stage S2, V11 §3.5's magic-gated classes; locality *re-derive from S2*; stepped — its
     one step at 75 a declared owner step, reported, outside the sweep; anchor II.6) and `circumstances.magic`, the switch
     (the timeline's first entry; S2; *re-derive from S2*; discrete). It sits in the advanced panel's "Programme" group (V09
     §4.14 groups by consuming stage) and the Islands control links to it by `button.magicHigh`. The slider emits
     `adjust('intent.magicPriority', v)` and, where the world has magic and the word it reads changes,
     `adjust('circumstances.magic', w)` in the same `group` (one undo step); the switch emits `adjust('circumstances.magic',
     'none')`, or, turned off, the slider's word; §7.1's T1 row binds both. A word set otherwise — a level's, the clerk's, an
     older document's, a later timeline entry's — stands until the control next moves. Where the dossier supplied them both
     parts are shown locked. *This follows SettlementForge's magic slider and toggle, with one departure:* D-3 keeps a
     standalone world without magic by default (SettlementForge's default reads low), so the switch starts on and the
     one-click town is unchanged; the slider's high at 75 is (b)'s pick, fixed in the control's reading (an edited
     `gate.magicMin` moves the gate alone). Surprise me leaves the magic priority absent and the world's magic untouched:
     magic is a circumstance, and Surprise me draws intent only (item 116 (c)'s reason). The clerk's `IntendInput.magic` and
     `IntendInput.magicPriority` encode it (V10); V12's `Level.intent.magicPriority?` and `Level.magic?: 'none'|'low'|'high'`
     set a level's.
     **(b) "HIGH".** *Magic:* **high magic** holds where magic exists — the magic in force is not `none` — and either the
     magic priority is at or above **75**, inclusive, on SettlementForge's 0–100 scale (the stored value, absent 50), or the
     magic in force is the word `high`; never where magic does not exist. *Economy:* item 114's economy priority ≥ **75**,
     inclusive, on the same scale, comparing the stored value (absent 50). *Why 75 (the program's pick, vetoable), on both
     sliders:* SettlementForge records no banding of its sliders; "high" must lie above the default 50, since a default
     settlement is not high, and 75 is the upper half of the range above the default, a round, neutral cut, the same on both;
     for the economy it also lies where item 114's prosperity ceiling is already the top band (≥ 50), so an island town is
     never capped. *The cells:* `IslandRule.gate: { magic: ('low'|'high')[] /* the words that make magic high: ['high'] */;
     magicMin: number /* 75, inclusive: the magic slider's high */; economyMin: number /* 75, inclusive */ }` on both rung
     rows of `islands.json` (V05 §2.4, `IslandRule`'s declaring home). `gate.magic` carries `ownerRule: '115 (b)'` — the
     owner's "high magic"; `magicMin` and `economyMin` carry provenance `own` and `calibratable: false` ("no corpus measures
     a slider"): the owner fixed the two conjunctive clauses, the magic slider and the word high, not 75, and V12 §1 lists
     the rule. The economy clause reads the slider's value — never the field, `S_town` or item 114's prosperity ceiling; the
     magic clause reads the magic priority and the magic in force — never the deposits (the node term stays the supply
     law's). Research row 12's "none → no islands" is superseded by the magic clause, and its "word → a supply multiplier"
     stays unadopted: the clause gates, the supply law sizes. *The cells at their limits* (V11's compiler, T-V11-2): an empty
     `gate.magic` leaves the slider's reading alone, reported; a word outside low and high — `none` included, since magic
     that does not exist is never high — is refused at compile (tier 1, the table's reason row); a `magicMin` or `economyMin`
     outside [0, 100] is clamped; an author's `editTable` of either is not bound by the stamp (IN-V11-1) and is named in the
     report ("islands gate edited (owner rule 115)"), re-deriving from S7b.
     **(c) THE GATE — four clauses in order, then the supply law.** Islands rise by rule only where all hold: (1) *setting* —
     `recipe.layers.islands = 'on'`, stored as `Recipe.params['layers.islands']` ('off' | 'on', absent 'off') as
     `islands.count` is `recipe.params['islands.count']`, its `adjust` param `layers.islands`; (2) *rung* —
     `RungProfile.layers.islands = 'possible'` (CITY, METROPOLIS); (3) *magic* — high magic ((b)): the magic in force is not
     `none`, and `Intent.magicPriority ≥ gate.magicMin` or the magic in force is among `gate.magic`; (4) *economy* —
     `Intent.economyPriority ≥ gate.economyMin`. Then II.6's supply law runs as today (`h_town`, the slots, the reasons, the
     fill). V05's parity clause is dropped: the parity presets hold the setting off and zero the island chances (§7.6;
     J-V5.25), so clause (1) and the slot law already give them no island, and an author who turns the setting on under one
     has departed from the preset as by any edit (`Recipe.presetId` stays provenance only, §2.9). *The record:* `SkyGate {
     open: boolean; failed: { clause: 'setting'|'rung'|'magic'|'economy'; value?: string | number /* the magic clause: the
     magic in force */; magicPriority?: number /* the magic clause only */; source: 'map'|'dossier' }[] /* every failing
     clause, in the order above */ }`, computed by one pure function `skyGate(recipe: Recipe, rung: Rung, magic:
     CircumstanceSlice['magic'], dossierOwned: { rung: boolean; magic: boolean; magicPriority: boolean; economy: boolean }):
     SkyGate` (V05 §3.2 (1); exported by `@plat/sky`; the two priorities from `recipe.intent`), which S7b (5),
     `IslandEpochStep`, §7.8's Islands control, the report and the clerk all call; derived, never stored. A clause's source
     is `'dossier'` where no map-side change can open it — for the magic clause, a world the dossier states without magic, or
     a word and a magic priority both the dossier's. *The report:* with the setting off, nothing; with the setting on and the
     gate closed, one `GenerationReport.requestedVsBuilt` entry `{ subject: 'layers.islands', requested: 'on', built:
     SkyGate['failed'], reason: 'islands_gated' }` — §5.4's `ReportCode` gains `islands_gated`, an outcome, never a failure;
     an epoch's closed rising counts in V06's `EpochReport.islandsGated: number` with one chronicle line; V09's rows
     `report.islands.gated` — "Floating islands are on, but {clauses}." — and `report.islands.clause`, naming each value and
     its source ("magic moderate, slider 50 — SettlementForge"; "economy 50 — this town"). The old `gated: dossier magic`
     folds into the magic clause. *Subsumed and replaced:* V05 §3.2 (1)'s dossier-only clause "magic not `none`" is subsumed
     by (3) in every document; §7.7 item 11's refusal of the SETTING where the dossier states `none`, and J-V5.19, are
     replaced by (d) 4–5; II.6's missing magic clause is closed. *The count:* the gate precedes it — under a closed gate no
     slot opens by rule, and an integer `islands.count` opens none (its adjust applied, the report `islands_gated`). Forced
     slots — a creation-prefix T5 `sky` declaration, an assignment whose criteria carry `sky` — are the author's and are
     judged by (d) 4: S7b (5) runs its forced slots at every rung that admits islands whatever the setting and the gate, and
     its rule-driven slots only through the gate. With SettlementForge's census values no dossier city generated without
     setting a slider — 152 of the 155 — has islands at its first generation: its magic slider sits at 50 and its economy at
     50, and none of the 155 is `high` (CONFIRMED); the three sample cards' sliders are not recorded (NOT ESTABLISHED), so
     they meet the gate at whatever values they carry — the consequence of the owner's condition at SettlementForge's present
     values. A SettlementForge city gets islands only where its world has magic, its magic slider is at 75 or more or its
     word resolves `high`, and its economy slider is at 75 or more.
     **(d) AFTER THE FIRST GENERATION — the gate binds what rises, never what stands.** The owner's rule governs the initial
     generation: the creation, every re-derivation of it, and the history-first replay, which item 113 makes part of the
     generation (§4.11: the replay's epochs are the creation prefix). Gating every later rule-driven rising by the same
     clauses is the program's reading (vetoable): the "actually" message restated the condition without narrowing it to a
     moment, and a rising without both would contradict "has to have both". *Rejected:* later risings under today's law alone
     (a low-magic city would gain islands at its first epochs). (1) *What rises:* generation and every re-derivation through
     S7b, the history replay, an epoch's `raiseIsland` (V05 §3.15 (5)) and an epoch's refloat of a SETTLED island (V05 §3.15
     (4): a settled island is empty at its floor, and re-peopling it is a rising, which V05 already gates by the rung) each
     read the gate — the magic in force at that time and the recorded magic and economy priorities, constant after creation
     (item 114 (e)). They differ in time because they differ in kind: the magic in force is a circumstance of the timeline
     (item 68's slice, which a standalone history's `trajectory.slice.magic` may change), the two priorities creation inputs;
     on a dossier map all three are the creation's ((a) 1). A closed gate at an epoch draws nothing on `island.place` for
     that slot, and since every island draw is keyed by lineage and index no other draw moves. A start-small town (V06
     §3.3.3) fails the rung at its founding; the epoch that carries it into CITY may raise an island only through an open
     gate. At a destruction outright (item 113 (b)) every island of the old settlement falls in that epoch (`fallIsland`, its
     landfall among the ruins) — the one case where an island falls without its dwells, reported — and the refounded
     settlement's islands rise only through the gate. (2) *What stands:* a floating or waning island follows the supply law
     and the rung (II.6 (6)); magic falling from high to low, or the economy clause failing, neither wanes it nor stops a
     waning island's recovery. Magic `none` in force — which after creation arises only from a standalone timeline's slice,
     the dossier's magic being the creation's — makes every island's target 0 at the next epoch (they wane, settle and fall
     over their dwells, never vanish: magic is what keeps them aloft, II.6; V05 §4.4's law, which read only a dossier's
     `none`, now reads the magic in force), save an island a lock or a declaration holds, which stands with `EditFate { fate:
     'kept', reason: 'held_against_magic' }`. At the epoch a magic change reaches, every generated access whose kind the
     magic in force no longer admits converts to the nearest admitted kind in V05 §3.10's order (a listed fate), and an
     author's placed access holds, `held_against_magic`. (3) *A later change:* the economy is creation-only (item 114 (e)); a
     dossier's later `priorityMagic`, `magicLevel` or `magicExists` is a `frozen_fact_changed` note ((a) 1); standalone, the
     Magic — either part — is an adjust that re-runs the first generation (Re-derive from S2), whose generated islands rise
     again only through an open gate, their fates listed. (4) *The author's own islands* (item 101 R2, R13): a T5 `sky`
     declaration, a T6 placement onto an island the dry run turns into one, and a creation-prefix assignment whose criteria
     carry `sky` are judged only by the rung — absolute, `refuse.islandsRung` — and by a dossier-stated `none` — refused
     `dossier-owned` with `refuse.islandsNoMagic`, "This world has no magic; nothing floats here.", the one refusal (item 20
     (h)), reading the creation slice's magic where the dossier supplied it. With the setting off, under a parity preset, or
     under a failed magic or economy clause, the island is allowed and the setting stays as it is; a failed clause gives the
     fate `EditFate { fate: 'kept', reason: 'held_against_magic' | 'held_against_economy' }`, confirmed at the dry run beside
     V05's `held_against_supply` (J-V5.10 extended), and a locked generated island under a failed clause carries the same
     fate. A held island stands by R13 and no gate wanes it; undo is the declaration's inverse. V05 §4.2's "the gate … must
     hold" is rewritten to this. (5) *The Islands control* (§7.8), at CITY and METROPOLIS: where every failing clause is the
     map's, turning it on applies the setting and shows `info.islandsGated` — "Floating islands need high magic — 75 or more
     on the Magic — and an economy of 75 or more." — with `button.magicHigh` (commit `event:magicHigh`: the Magic control set
     to high magic in one `group` — `adjust('circumstances.magic', 'high')` where the world has no magic, and
     `adjust('intent.magicPriority', 75)` where the magic priority is below 75) and `button.economyHigh` (commit
     `event:economyHigh` = `adjust('intent.economyPriority', 75)`), each shown only for its own failing clause; where any
     failing clause is the dossier's the setting can raise nothing, so the control is disabled with its reason row —
     `refuse.islandsDossier.magic` "SettlementForge sets this world's magic to {magic}, its slider at {magicPriority};
     floating islands need high magic.", `refuse.islandsDossier.economy` "SettlementForge sets this town's economy to
     {economy}; floating islands need an economy of 75 or more.", or `refuse.islandsDossier.both` "SettlementForge sets this
     world's magic to {magic}, its slider at {magicPriority}, and its economy to {economy}; floating islands need high magic
     and an economy of 75 or more." — each carrying `button.drawIsland`, "Place an island by hand" (T5 with `sky`, held),
     unless the dossier states `none`, and `button.showWhy`. V05 §3.2 (5)'s supply sentence gets its row, `info.islandsNone`,
     with the remedies "raise the Economy, or place an island by hand". J-V5.19 becomes: "Chose to gate every rule-driven
     rising by item 115's clauses in every document, to disable the Islands control where a failing clause is the dossier's,
     and to refuse only a declared island in a world the dossier states magic-less, because the owner coupled islands to
     magic and the economy (item 115) and a floating island would contradict a magic-less dossier world (item 20 (h))." (6)
     *Presets:* no shipped preset turns islands on; a user's preset with the setting on meets the gate like any recipe. (7)
     *The view toggle* shows the islands a settlement has and creates none (J-A15.41), unchanged. (8) *Load* replays and
     recomputes the gate from the recorded inputs. (9) *Migrate:* the schema chain reads the economy and magic priorities
     absent (50) and the magic word as stored, except that a carried `site.magic` whose standing port note is `unmapped_word`
     (the old row's "else none, noted") reads absent, so its `none` becomes an editable map fact with the same value. An
     older document replays unchanged at its own output version. Its `upgrade` to a version with the gate re-imposes, at the
     upgrade's position, each island the upgraded replay no longer raises, by its state: a floating or waning island as a
     declared island — ring, anchor, altitude and kind, an institution island's institution named by its `sky` assignment —
     `held_against_magic` or `held_against_economy`, filled by V05 §4.2's relocation, its households listed in the diff and
     never promised as they stood; a settled island the same, followed by `settleIsland`; a fallen island's landfall is
     ground content the upgraded replay no longer holds, listed in the diff and not re-imposed; a removed island nothing. The
     user may drop any of them there (§7.5's orphaned-lock rule, extended to islands).
     **(e) WITH ITEM 114.** Under the default tables every economy the gate admits (≥ 75) lies above the prosperity ceiling's
     last row (50), so an island town's prosperity ceiling is the top band whole at its creation and at every epoch — it
     never falls below the founding's row — and a prosperity island carries the richest band as today. Where an edited table
     admits a capped town (the gate's `economyMin` below the economy of the `ceiling` table's last row), and for a held
     island in a capped town, the island fills from band `c` down, and an institution island reads its `requirementBand` by
     item 114 (c) 4, its supply by the law.
     **(f) EDGES — outcome; rung of §5.1's ladder where it can fail; test.** A closed gate is an outcome, reported by clause,
     never a failure. (1) The magic priority 0, 50, 74, 75 and 100 against the magic in force none, low and high, and the
     economy 0, 50, 74, 75 and 100 — the minimum, the default and either side of each threshold: open only where magic
     exists, the magic priority is ≥ 75 or the word is high, and the economy is ≥ 75 (T115-1). (2) Both clauses failing: both
     listed (T115-1). (3) A thorp, a village, a town: the rung first (T115-1). (4) A metropolis: as a city (T115-1). (5) The
     village product: never raises by rule; an island carried down from a town continues V05's steps and falls (T115-5). (6)
     The standalone neighbourhood: islands off by its recipe; the gate never runs (T115-1). (7) The undercity and the
     underground: no part — islands never touch them (J-V4.101). (8) Pins and locks: a locked island stands, its fate by (d)
     4; a locked slot is neither opened nor closed (T115-4). (9) A dossier or custom institution whose row or archetype would
     go up under a closed gate: it stands on the ground — the island moves where an institution stands, never whether it
     exists (DR27) (T115-4). (10) A dossier missing a value: the magic word `none`, editable (`value_absent`); `moderate`:
     low; an unknown word: `none`, editable (`unmapped_word`); `magicExists` false: `none` whatever the word; the magic
     priority and the economy 50, editable (`value_absent`); a priority out of range clamped (`value_clamped`) (T115-2). (11)
     A slider or word change after creation: (d) 3 (T115-3). (12) An epoch's rising under an open or a closed gate; a
     standing island and an access under a magic change (T115-3). (13) The replay and a refounding (T115-5). (14) An integer
     count or a forced slot under a closed gate (T115-6). (15) A declaration with the setting off, under a parity preset, or
     under each failed clause (T115-4). (16) An older document with islands: re-imposed on upgrade — §7.5's mapping, tier 5,
     substitution (T115-7). (17) The view toggle: T15-1's clause. (18) A declared island no site can hold: V05's F-SKY
     ladders, unchanged (T115-4). (19) An edited or pinned `gate` at its limits: (b) (T115-10).
     **(g) BARS (§13.2).** Every island bar runs with high magic by the slider — magic in the world and the magic priority
     100, whose word is `high` — an economy ≥ 75 and `wealthLevel` set explicitly at its old level: T10-1 at economy 100 and
     `wealthLevel` 0.5; T15-1 and T-V5-2 at economy 100 with `wealthLevel` 0.5 and 1; V05's P0 run and every island fixture
     (T-V5-15's goldens, T-V5-18's budgets), V06's T-V6-66 and V12's M6-sky seeds likewise; T13-1 is unchanged. (T115-1) The
     truth table: 200 CITY and 100 METROPOLIS seeds per cell, the setting on, of the magic priority {0, 50, 74, 75, 100} ×
     the magic in force {none, low, high} at economy 100, and of the economy {0, 50, 74, 75, 100} × the magic priority {50,
     100} with the magic in force `low`: islands only where the magic in force is not `none`, the magic priority is ≥ 75 or
     the word is `high`, and the economy is ≥ 75; every other cell 0 islands with one `islands_gated` entry listing every
     failing clause in order; TOWN, the village rungs and a standalone neighbourhood none whatever their magic and economy;
     the parity presets none; in the open cells T15-1's count law. (T115-2) The dossier (V12's derived fixtures): a `medium`
     city at `priorityMagic` 50 and economy 90 has 0 islands, its Islands control disabled with `refuse.islandsDossier.magic`
     and nothing requested in its report — with the setting on through a user's preset, `islands_gated` naming the magic; a
     `medium` city at `priorityMagic` 80 and economy 90 follows the supply law (the slider alone opens the magic clause);
     `high` at `priorityMagic` 50 and economy 90 follows the supply law (the word alone opens it); `high` at economy 50 is
     disabled with `refuse.islandsDossier.economy`; a city whose `magicExists` is false at `priorityMagic` 100 and economy 90
     has none, and a declared island there is refused with `refuse.islandsNoMagic`; a dossier without `magicLevel` reads
     `none`, editable, noted `value_absent`; without `priorityMagic` reads 50, noted `value_absent`; `priorityMagic` 140
     reads 100, noted `value_clamped`; `moderate` reads low; the 32 births at the default sliders carry no island, and each
     of the three sample cards meets the gate at its recorded values. (T115-3) Epochs: 200 standalone start-small towns grown
     past 10 000 raise islands only with the gate open (high magic by the slider, economy 80) and none with either clause
     failing; a standing island keeps its state through a magic change from high to low and wanes over its dwells under
     `none`, never in one epoch; a settled island refloats only through an open gate; a generated bridge of light under a
     slice's `low` converts and a placed one holds; a same-id re-offer that changes `magicLevel`, `magicExists` or
     `priorityMagic` moves no island and reports `frozen_fact_changed`. (T115-4) The author: a T5 `sky` declaration with the
     setting off, under `MFCG`, and under each failing clause stands with its fate (magic, economy, supply) and holds through
     Regenerate and epochs; a `sky` assignment in the creation prefix the same; a locked generated island stands through an
     Economy lowered below 75 with `held_against_economy`; under a dossier-stated `none` a declaration is refused
     `dossier-owned`; at TOWN `refuse.islandsRung`; each undo restores the digest. (T115-5) The replay: a city-to-village
     history (item 113 (a) 1's blueprint history, or V12's derived fixture `'<dossier>@magic100@economy90'`) with the gate
     open at its peak carries islands at its CITY epochs that wane, settle and fall over their dwells, leaving landfalls in
     the present village; with the gate closed none; a refounded fixture's old islands fall at the destruction; byte-stable
     per seed and history. (T115-6) Under a closed gate an integer `islands.count` opens no slot; each failing clause shows
     its message and only its own button; one click on each of `button.magicHigh` and `button.economyHigh` opens the gate —
     from a world without magic, `button.magicHigh` turns magic on at 75 in one undo step — and the ghost shows the supply
     law's islands. (T115-7) An older document with islands replays unchanged at its own version; its upgrade re-imposes
     every island the gate no longer raises by its state, listed in the diff; dropping one there removes it; the upgrade's
     undo restores the digest; an older dossier document whose dossier lacked `magicLevel` has, after the upgrade, an
     editable `none` and a magic priority 50. (T115-8) Every CITY the gate admits has its prosperity ceiling at the top band
     whole at creation and at every epoch of a 20-epoch history. (T115-9) The clerk: "floating islands" on a low-magic town
     ends in `info.islandsGated` with its buttons; "an opulent city of high magic with floating islands" sets the economy 90,
     the magic priority 90 with magic in the world (its word `high`) and the setting on, and islands are possible. (T115-10)
     Each `gate` cell at its limits of (b) is refused or clamped with its reason row; an empty `gate.magic` leaves the
     slider's reading alone, reported, and `gate.magic` naming `none` is refused.
     **(h) THE UNITS — applied IN the coherence pass's Rewrite phase with items 114 and 116 (owner, 2026-09-30 ~01:00:
     "bundle these into the rewrite phase"; ~01:12: "bundle all this with g114-115"): the units whose rewrite had landed when
     this item was filed — the base parts model, kernel, pipeline, determinism and rendering, and the volumes V03 and V04 —
     in a late rewrite seat where they have a part; every other unit in its main rewrite. One canonical home per shared
     decision (STATES); every other unit cites it (REFERENCES); the three items' one routing is
     docs/validation/coherence/work/g114-116/routing.json with the canon's ruling of 2026-09-30.** *Base — model (§2), late
     seat:* STATES §2.8's dossier-paths list gaining the settlement's magic priority at creation (beside item 114's economy
     priority) and "the creation slice's magic word where the dossier supplied it" beside the typed slices, and §2.9's note
     that `recipe.layers.islands` is `Recipe.params['layers.islands']`; `SkyIsland` unchanged; REFERENCES II.6, V05. *Base —
     kernel (§3):* no part. *Base — pipeline, late seat:* STATES II.6's gate — (c)'s four clauses in order, the parity clause
     dropped, the closed gate as an outcome, the forced slots, the count after the gate, citing V05 §2.4 for the cells — II.6
     (6)'s what rises and what stands, the wane under magic `none` in force, the access conversion and the destruction fall;
     S7b (5)'s wording (forced slots at every admitting rung, rule-driven slots through the gate); §4.11's islands at an
     epoch (a raise and a settled refloat read the gate; no draw under a closed gate); REFERENCES V05 §3.2 (1) for `skyGate`.
     *Base — determinism, late seat:* STATES §7.7 layer 1's `Intent.magicPriority?` and the standalone magic word's
     derivation row ((a) 2), DR27 (inputs gaining `settlement.magicPriority` and `settlement.economyPriority` beside
     `site.magic`; bar: the gate's clauses resolved and traced to those fields or to their map defaults), §7.7 item 1's list
     (with item 114 (g)), item 9's list gaining the magic priority and the creation slice's magic word, item 11 (the
     setting's refusal withdrawn; an adjust of a dossier-supplied magic priority or word refused; a declared island in a
     dossier-stated magic-less world refused `dossier-owned`), layer 2's "the recipe's feature set holds `layers.islands`"
     becoming `Recipe.params['layers.islands']`, §7.1's T1 binding row gaining "the magic priority and the creation slice's
     magic (the Magic control)", §7.4's `regenerate / adjust / re-derive from Sk` row naming the Magic (from S2) and the
     `quarter` row's held fates, §7.5's upgrade rule (d) 9, the magic priority absent 50 and the optional `site.magic`,
     §7.8's two Magic rows and the Islands control's states, §5.3's sky row gaining "no island raised or refloated by rule
     under a closed gate; under magic `none` in force every unheld island's target 0", §5.4's `ReportCode` `islands_gated`;
     §6: no part. *Base — rendering:* no part (§8.4's view toggle unchanged). *Base — scope, main rewrite:* STATES §13.2's
     T115-1 – T115-10 and the island bars' fixture rule (g); §14's `settlement.magicPriority?` and `site.magic?`; D-3's
     sentence ("floating islands … only at CITY and METROPOLIS; at the first generation — and, by the program's reading of
     item 115, at every later rising — only with high magic (the magic slider at 75 or more, or the world's magic `high`,
     never in a world without magic) and an economy of 75 or more; and only where prosperity supplies them"); §1.2's default
     (the Magic at 50, no magic in the world); §0.2's row 115 (principal home II.6); the judgment index's J-A115.41 –
     J-A115.46 and J-A115.71 – J-A115.75 (titles in the canon's ruling of 2026-09-30); §16's placement (the gate and the
     Magic control at M6-sky, the port's reading at M-SF). *V01, V02, V03, V04:* no part (a hood holds islands off). *V05
     (the principal build home):* STATES `skyGate` at depth (the record, the function, its callers, the report entry's args),
     §0's plain words (only a city whose magic is high — its Magic at 75 or more, or its world's magic high — and whose
     economy is strong gets a roll at all), the §1b wiring row, `IslandRule.gate` and its defaults (`['high']`, `magicMin`
     75, `economyMin` 75) in §2.4 with §2.6's lifecycle row, §3.2 (1), (3), (4) and (5) (the parity clause dropped; the
     forced slots; the gate before the count; the sentence split by cause), §3.15 (4) and (5), the wane under magic `none` in
     force, the access conversion, §4.1's T1 row gaining the Magic, §4.2's declaring rule and fates, §4.4's DR27 inputs and
     coherence restated (the absorb wane withdrawn), §4.5's why naming the clauses, J-V5.10 and J-V5.19 restated, §7's T-V5-1
     extended with the truth table and the fixture rule, and §8's P0 run with the gate held; REFERENCES II.6 and item 114
     (e); item 116's island parts (the landfall credit, the island buildings on the material supply) sit beside these in V05
     and leave the gate unchanged. *V06:* STATES that `sky.islands`' raise and a settled refloat read the gate,
     `EpochReport.islandsGated`, the replay's islands, the start-small crossing, that the time card is unchanged
     (`trajectory.slice.magic` is how a standalone history changes magic), and its bars; REFERENCES II.6, V05. *V07:* STATES
     §1's out-of-scope sentence rewritten — the village never raises an island by rule, and an island carried down from a
     town continues V05's steps and falls — resolving its contradiction with §3.12 and V06 §3.2. *V08:* STATES the adapter
     row `config.priorityMagic` → `settlement.magicPriority` (range, clamp, absent) beside item 114's, the `magic` row
     (moderate → low; `magicExists` false → none; an absent or unmapped word carries no `site.magic`), the carried settlement
     fact's `magicPriority?` under the settlement diff row and the carried site fact's `magic?` under W-DOS-08's `site` row
     (a later value: one `frozen_fact_changed` note), T-V8-20's ignore clause reading `priorityMagic` and `magicExists`, the
     census effect ((c)'s last sentence), DR27's inputs, the host frame's locked Magic; REFERENCES T115-2. *V09:* STATES the
     Magic control — the slider and its switch "No magic in this world", in the "Programme" group —, the Islands control's
     states and rows (`info.islandsGated`, `refuse.islandsDossier.magic`, `.economy` and `.both`, `refuse.islandsNoMagic`,
     `info.islandsNone`, `report.islands.gated`, `report.islands.clause`), the buttons `button.magicHigh`,
     `button.economyHigh` and `button.drawIsland` with their event forms, `fate.held.magic` and `fate.held.economy`, and its
     bars. *V10:* STATES `IntendInput.islands?: 'off'|'on'` (edit mode `adjust('layers.islands')`; creation mode the new
     document's `Recipe.params['layers.islands']` beside its blueprint), the lexicon row "floating islands, sky islands,
     flying islands → `islands: on`" (the words set the switch alone; the gate's message says what is missing),
     `IntendInput.magicPriority?: number` (0–100) with the magic row "magic, wizards, fantasy · high magic" taking `magic`
     `low` · `high` and `magicPriority` 50 · 90, §4.1's T1 encoder writing both to the Magic control (creation mode the new
     document's `intent.magicPriority` and creation slice; edit mode the control's two adjusts in one `group`), and the
     island's why naming the clauses. *V11:* STATES row 56's `gate` cells in `islands.json` (`gate.magic` stamped `ownerRule:
     '115 (b)'`, `magicMin` and `economyMin` own and not calibratable) with their compiler bars, and that §3.5's `magicGate`
     for classes stays `≠ 'none'` — a separate gate from the islands'. *V12:* STATES §1's owner-rule list entry,
     `Level.intent.magicPriority?` and `Level.magic`, the derived fixture forms `'<dossier>@magic<m>'` (the magic slider,
     0–100) and `'<dossier>@magicLevel<word>'` (the word) — the fixture for high magic sets `priorityMagic` 100, and,
     separately, the word `high` —, the register's entries, and M6-sky's panel seeds generated with the gate held. *Scope:*
     BASE for (a)–(c) and (e)–(g); STAGED with the sky layer (V05) and evolution (V06) for their parts of (d).
