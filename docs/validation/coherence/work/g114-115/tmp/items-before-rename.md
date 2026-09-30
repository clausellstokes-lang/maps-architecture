114. **OWNER RULE — The economy slider sets the map's prosperity ceiling at the first generation (owner, 2026-09-30 ~00:50;
     filed under J122 and J126).** Owner: "one thing i wanted to add, at generation time the first generation, teh economy
     slider determines the cieling prosperity for the entire map" — and, of this item and item 115: "bundle these into the
     rewrite phase". **What SettlementForge gives (CONFIRMED, read-only, from the survey of its branch
     `fp/integration-2026-09-23` @ `5d699cc68`, `research/sf/`):** five generation sliders — `priorityEconomy`,
     `priorityMilitary`, `priorityReligion`, `priorityCriminal`, `priorityMagic` — each 0–100 with default 50; their resolved
     values in `config`, their raw inputs with `'random'` sentinels in `_config` (secret on every shared surface), a copy in
     `economicState.priorities`; no simulator writes them after birth; the settlement's wealth is one live word,
     `economicState.prosperity` (Subsistence … Wealthy); all 155 census dossiers were generated at the default sliders, and
     their births reach Prosperous (41) but never Wealthy ("Wealthy only after lit ticks"). No banding of a slider value is
     recorded. **What the design has (CONFIRMED):** the standalone wealth slider (`Intent.wealthLevel` ∈ [0, 1], T1 `intend`,
     the basic panel's "wealth level"); a dossier's wealth level from its prosperity word (DR6, V08 §2.6's `wealth` row);
     per-town quantile cuts (`FieldBands`, §4.5), so "rich" is relative to the town; item 72 (d‴)'s per-district band range,
     the only ceiling today; `config.priority*` on §7.7 item 1's never-read list (item 86; research row 54, J-M5). Program's
     interpretation (vetoable):
     **(a) THE SLIDER AND ITS FIELD — one control, one field.** The **economy priority**, `Intent.economyPriority?: number`
     — 0–100, SettlementForge's range; absent reads 50, its default — declared in §7.7's `Intent` and recorded in
     `Recipe.intent` (§2.9). (1) *Hosted:* the one SettlementForge field read is the resolved `config.priorityEconomy`, into
     `DossierDigest.settlement.economyPriority?: number` — a number clamped to [0, 100] (noted `economy_clamped` when
     clamped), absent when the dossier carries none or a non-number (noted `economy_absent`); `_config` (the raw sentinel)
     and `economicState.priorities.economy` (a copy of the same value) stay unread. The port's creation half writes it into
     `Recipe.intent.economyPriority`; a dossier without it takes the rule's default 50 as a map fact. §2.8's `factTier`
     reads `dossier` for `Recipe.intent.economyPriority` exactly when the settlement's carried facts hold a value for it.
     (2) *Standalone:* T1 `intend`'s wealth slider IS this control, re-pointed and renamed — label **"Economy"** (the word
     both of SettlementForge's keys for it use), range 0–100, default 50, continuous — so the basic panel keeps twelve
     controls (R15; J-A101.77). `Intent.wealthLevel` becomes optional: absent, it reads `economyPriority ÷ 100` (a §7.7
     layer 1 derivation), so the Economy moves the town's overall wealth exactly as the wealth slider did (at 50 the 0.5 the
     base's sweeps and T15-1 take as reference) and, below 50, its ceiling too. The advanced panel keeps **Wealth level**
     (0–1), shown "from the Economy" until an author sets it; on a dossier map the port fills it from the word (a map fact,
     editable, V08 §5.1). A standalone neighbourhood's `HoodRecipe.intent.wealth`, absent, reads the same `economyPriority ÷
     100` (V01); the village product's T1 slider is the same control (V07). Surprise me draws the economy priority uniformly
     on [0, 100] on `intent.surprise` (the wealth level's range, × 100). (3) *Host frame:* where the dossier supplied it the
     Economy is dossier-owned — shown locked, "Set by SettlementForge" (`host.locked`); its `adjust` is refused `dossier-owned`
     (§7.7 item 11) with the wealth level offered as the map-side alternative; absent in the dossier, it is a map fact and
     editable. (4) *Registry (§7.8):* output metric the median plot area and the top band's household share; range 0–100;
     default 50; consuming stage S0 (II.7.1's TOWN sewer law reads the derived wealth level); locality *re-derive from S0*;
     continuous; anchor §4.5.
     **(b) THE CEILING — a position on the band set, one table, the dossier's word as its floor.** The **prosperity
     ceiling** is a position `at` on the band set's ranks (`squalid` 0 … `rich` 5 on the default set); the **ceiling band**
     is the band at rank ⌈at⌉ — the highest band any household, plot, district or building may take — and its **share**
     `f = at − ⌈at⌉ + 1` ∈ (0, 1] is how much of the would-be mass at and above that band it holds ((c) 1). (1) *The table:*
     `BandSet.ceiling: { economy: number; band: string }[]`, rows of `prosperity.bands` (§7.6 cells, provenance `own`,
     `ownerRule: '114 (b)'`, never calibrated, V12 §1), interpolated linearly in rank and held at the end rows. Default rows
     `{ 0, 'modest' }` and `{ 50, 'rich' }`: on the default set `at = 2 + 3 · min(e, 50) ÷ 50` — economy 0 gives `modest`
     whole, 16⅔ `comfortable` whole, 33⅓ `prosperous` whole, 50 and above `rich` whole, which is no ceiling. *Why:* the
     default must be the identity — emulation first (FTG's aristocratic tier and MFCG's patriciate exist at their defaults),
     and SettlementForge's own default births reach Prosperous, which DR6 reads as a mean household at the prosperous band
     with richer ones above it — so the one-click town, the goldens and every parity run stay as they are; the lowest ceiling
     is `modest`, FTG's modest tier and MFCG's craftsmen, below which the whole town would be poor, a state no reference town
     shows and no village rung's shares reach (V07's THORP keeps comfortable and prosperous households); and linear between
     the rows makes the Economy a continuous, monotone control as §7.8 demands (a stepped table would fail the sweep at each
     step and fall to its smoothstep fallback anyway).
     (2) *The wealth floor:* `at` is raised to `rank(wealthBand(w)) + 1` (capped at the top rank) wherever that is higher,
     `w` the wealth level in force (the recipe's; at an epoch (e)'s; a standalone neighbourhood's `intent.wealth`) and
     `wealthBand(w)` the band of V08 §2.6's `wealth` row whose value is the largest not above `w` (below every row, the
     lowest row's) — the band DR6's bar already reads. So a dossier's word always keeps a band of room above its mean —
     Wealthy and Prosperous give `rich`, Comfortable `prosperous`, Moderate `comfortable`, Poor and Struggling `modest` — and
     a low slider never contradicts a rich word (item 20 (h)); `FieldBands.ceiling.by` records which term set it.
     Standalone, with the wealth level derived, the floor never binds (`wealthBand(e ÷ 100) + 1 ≤ at` for every `e`); it
     binds where an author sets the wealth level above the Economy. (3) *Rungs:* no rung row caps a band; `RungProfile`'s
     band-keyed rows (`granularity.joinMaxDelta`) are read at the clamped band. (4) *Parity presets:* their band set carries
     the single row `{ 0, <its top band> }` — no ceiling (item 23) — so under `MFCG` and `FTG` the Economy moves only the
     wealth level, as the wealth slider did.
     **(c) HOW IT BINDS — the band, never the value.** (1) *The fold (S2).* With `w_r` the residential household shares by
     rank after S2's town-level character shift, `c = ⌈at⌉` and `W = Σ_{r ≥ c} w_r`: the band at `c` holds `f · W`, the band
     below it `w_{c−1} + (1 − f) · W` (no such term when `f` = 1), every band above `c` holds 0, the rest are unchanged —
     continuous and monotone in `at`, the identity at the top rank. Every other demand row's band — a workplace's lifestyle
     band, an institution's, a hinterland class's — is read at the lower of its band and the ceiling band. (2) *The cuts
     (S6):* §4.5 computes the cuts from the folded demand; every cut at or above the ceiling band's upper boundary reads 1,
     and banding reads a value into the lower of the band its cuts give and the ceiling band — so a value of 1, and the
     upper values of a fixed-cut set (a standalone neighbourhood's default cuts, J-V1.9), band at the ceiling.
     `FieldBands.middle` is designated from the folded shares. (3) *The field is untouched:* `P(x)` is neither clamped nor
     compressed. The richest quarters keep their order and their distances in the value — read by the continuous rules below
     the ceiling band's centre, the class mix's prestige order, `S_town` and the oracle — and only a value above the ceiling
     band's centre reads that band's row, exactly as the top band's upper half already reads the top row. A value clamp was
     rejected: with per-town quantile cuts it binds no band, it would flatten the top quarters to one value, and on a
     standalone map it would count the economy twice (the Economy already moves the absolute level through the derived
     wealth level's character offset); a compression of the upper tail was rejected because it would move the absolute
     values `S_town` and V05's calibrated supply rows read. (4) *Reads:* every rule table read along the value (granularity,
     designation templates, greenery, hidden plots, the class mix, the interior ladder) takes the ceiling band as the band
     set's end band — never a row above it; a read keyed by a named band above the ceiling (a class's lifestyle band, a
     template row, an `IslandInstitution.requirementBand`, a placement criterion's `prosperityBands` filter) reads the
     ceiling band, so "the rich quarter" means the town's richest. (5) *Which bound wins:* each end of a district's
     `bandRange` is lowered to the ceiling band where it lies above it — the map's ceiling wins over item 72 (d‴)'s rows —
     and the range still holds the district's own band (J-A72.50), which never lies above the ceiling; the three dials stay
     clamped inside the range; the pressure's `excess` is measured against the range as clamped, so at the ceiling band,
     whose upper cut is 1, no upward excess arises and nothing is counted twice. (6) *The other terms:* item 102's daylight
     and item 111's water terms stay value terms (their bars hold a fortiori); the underground (`undergroundOffset` −0.25)
     and the undercity (`undercityOffset` −0.35) are banded by the town's `FieldBands` and so never above the ceiling; the
     shanty trigger reads the folded shares. (7) *Precedence (lock > dossier existence > assignment > drawn geometry > rule
     tables > defaults; the ceiling is a rule-table bound):* a locked, pinned or declared entity above the ceiling holds, its
     fate `held above the prosperity ceiling`; a dossier-backed element exists with its own class, built at the ceiling
     band's row; an assignment's class stands, its occupants at or below the ceiling band. (8) *Dossier facts are never
     moved:* the population (the fold moves shares, never counts), the institutions, the prosperity word (it only lifts the
     ceiling), the priority itself (read, never written).
     **(d) THE FIRST GENERATION — what reads the slider, what carries it.** *Reads the economy priority:* the creation —
     standalone `generate`, T1's first map, Surprise me, a skeleton imported as a new document, the port's creation half,
     and a history-first generation's peak and replay (item 113, (f)); a whole-map regenerate from the recipe (Regenerate
     keep settings, a whole-map New random), which reads the RECORDED value, never the dossier's current one; T1's Economy
     drag, `adjust('intent.economyPriority', v)`, a Re-derive from S0 whose ghost regenerates the whole town under the hand
     and whose fates show "prosperity ceiling: {old} → {new}" (standalone, or a dossier map whose dossier carries none); and
     the dry runs of these. *Carries the recorded ceiling, never re-reading the priority:* epochs ((e)); local edits and
     scoped regenerations (brushes, T5, placements, a scoped New random); undo and redo (the fold restores the record; each
     Economy change one undo step); load (the replay recomputes the same record from the recipe and the log); migrate
     (absent reads 50, the identity). *The record:* `FieldBands.ceiling?: { at: number /* the position on this record's band
     ranks */; by: 'economy'|'wealth' /* the term that set it */ }` on the prosperity record (§2.5) — produced by S6 at
     generation and every re-derivation through S6, and by every epoch that writes the cuts; read by S7b's provisional range,
     S10a's `bandRange`, every band read of S10b and S11, V01's dispatch, V05's held islands, the why card, the Wealth
     legend and the report panel; model data in the digest; derived, no edit kind (a `setAttr` on it bends to "The ceiling
     follows the Economy" with the Economy offered); absent means no ceiling. `Intent.economyPriority`'s lifecycle: created
     by T1, a blueprint, Surprise me or the port's creation half; read by S2's fold, §4.5, the layer 1 derivation, item 115's
     economy clause, the clerk and the report panel; persisted in `Recipe.intent`; regenerated as recorded; undone by the
     adjust's inverse; migrated absent → 50.
     **(e) AFTER THE FIRST GENERATION — the slider once, the lived wealth after.** The owner said FIRST generation, so the
     priority is read once per creation and never again. At every epoch the position is recomputed as the higher of the
     recorded priority's row value and the wealth floor at the wealth level in force — the recipe's, replaced at an epoch by
     `EpochInputs.wealthLevel` past `dial.hysteresis` (V06 §3.3.5; the field BCR-V6-9 adds to §4.11's `EpochInputs`, which
     the pipeline's late seat writes where its landed text lacks it) — installed in the epoch's prelude before S6, the
     epoch's delta demand folded at it and the cuts the epoch writes computed from the folded demand. So a lived settlement
     whose word rises (SettlementForge's lit ticks, receipt F9) or a standalone history whose trajectory raises the wealth
     grows richer than its founding allowed, through the wealth ladder's normal lag; a fall brings the ceiling back toward,
     never below, the founding's row; survivors keep `builtBand` and item 31's floor and re-band by the ladder, never in
     one epoch. *Why:* the owner's words; SettlementForge writes its sliders only at birth while its prosperity lives; and
     item 20 (h) keeps the lived word the truth. *A later slider change in the dossier* (a same-id re-offer): carried in the
     settlement's carried facts, emitted as receipt row **F-V8-8** (arrival; response `none`) and reported `creation_only`;
     no model change, since no map fact depends on it after creation (item 11 (b)); a SettlementForge generation with a new
     seed is a new id, a new map whose creation reads its slider. *A later change in the panel:* standalone, T1's Economy is
     an adjust that re-runs the first generation (Re-derive from S0 with carry-over); in host mode it is refused
     `dossier-owned` where the dossier supplied it.
     **(f) HISTORY (item 113).** A history-first generation IS the first generation: its peak is generated under the
     recorded priority and the wealth level in force at creation — SettlementForge records no history of either, so none is
     invented — and every replayed epoch carries the ceiling by (e), constant while no wealth arrives. So the replayed peak
     honours the present ceiling: no remnant, ruin, survivor or `builtBand` lies above it at any replayed epoch; the
     high-water mark sizes the extent (a population), never a band; a symbolic peak (item 113 (f)) the same. The clerk's
     story names the ceiling where it bound ("even as a city, its richest households were only prosperous").
     **(g) J-M5 AND ROW 54 — narrowed, not reversed.** `config.priorityEconomy` moves from §7.7 item 1's never-read list to
     one named consumer — the port's creation half, which copies it into `Intent.economyPriority` for this item's ceiling and
     item 115's economy clause. Nothing is counted twice: a bound and a gate clause add no weight to anything the
     institutions (DR9) or the income shares (item 72's economy dial, DR13) already carry — the ceiling folds the top of the
     household band distribution, which neither the institution list nor the income shares state, and the clause decides
     whether islands may rise, which neither states — and on a dossier map the slider never sets the wealth level (the word
     does, DR6). `priorityMilitary`, `priorityReligion`, `priorityCriminal` and `priorityMagic` stay never-read under J-M5
     (`priorityMagic` because item 115 reads SettlementForge's resolved `magicLevel`, which already carries it); §7.7 item
     1's list reads "its generation sliders (`config.priority*`) but `priorityEconomy`, read once at creation (item 114)",
     and V08's J-V8.45, BCR-V8-25 and T-V8-20's ignore clause follow it.
     **(h) EXPLANATIONS AND WORDS.** The why card on a plot in the ceiling band while the ceiling lies below the top:
     `info.ceiling` — "The town's economy ({economy}) caps its prosperity at {band}." (set by the floor: "Its wealth ({word})
     lifts the cap to {band}.") — carried by V10's `FieldDrivers.ceiling?: { band; economyPriority; by }`, no driver term, so
     the terms still sum to the stored value (T-V10-10). A thematic legend lists only the bands the model holds and closes
     with "richest: {band}" below the top (§8.2; V09's Wealth view). The report panel's recipe line: "Prosperity ceiling:
     {band} ({f}) — economy {economy}". T5 `quarter`'s band chip above the ceiling bends to the ceiling band —
     `bend.fill.ceiling`, "The town's economy tops out at {band}; used {band}." — with `button.economyUp` (the least whole
     economy at which the asked band is reached whole, `at` ≥ its rank: 17 comfortable, 34 prosperous, 50 rich on the
     defaults; absent where the Economy is dossier-owned); a T8 prosperity brush moves values and bends nothing. The
     clerk: `IntendInput` gains `economy?: number /* 0–100 */`; the lexicon's wealth words (penniless … opulent) set
     `economy` at their value × 100 (8 … 90), and `wealth` (the wealth level) on a map whose Economy is dossier-owned; "why
     is no quarter rich?" is answered from `FieldBands.ceiling`.
     **(i) EDGES — outcome, rung of §5.1's ladder where it can fail, test.** (1) Economy 0: `modest` whole (97.8 % of the
     default town's households in it); tier 0, the fold is feasible by construction (T114-2). (2) 100, and (3) the default
     50: no ceiling, the identity (T114-1). (4) The table's knots and every fractional position: continuous — failing the
     sweep, §7.8's smoothstep then discrete fallback (T114-3). (5) A dossier's rich word under a low slider, or an author's
     wealth level above the Economy: lifted, `by: 'wealth'` (T114-5). (6) A thorp and (7) the village product: V07's
     `bandShares` folded (a THORP's `rich` 0 already), the lord's household at the ceiling band in its standing manor (T114-9).
     (8) A metropolis: the same table, no rung term; `joinMaxDelta`'s rich entry unread while `rich` is empty (T114-2). (9)
     The standalone neighbourhood: fixed cuts clamped at the ceiling; with the ceiling band below `prosperous` its manor quota
     is 0 by V01's own formula (`H_top` = 0), so no manor block is made and F-DISPATCH never fires — where a quota still finds
     no household, F-DISPATCH's existing ladder (the block stays `ordinary`) (T114-9). (10) The underground and the undercity:
     never above the ceiling by their banding (T114-2). (11) Pins, locks and declarations above the ceiling after an
     Economy lowered: held, their fate listed (T114-10). (12) A custom or dossier institution whose class or `prosperityBands`
     filter asks for a band above the ceiling: placed and built at the ceiling band, no F-SITING entry; a household no range
     admits still meets S10a's re-home ladder (tier 2) (T114-10). (13) A town whose demand holds nothing above the ceiling
     (a field with no district above it): byte-identical to its uncapped run but for `FieldBands.ceiling` (T114-4). (14) A
     dossier missing the value or out of range: 50, editable, `economy_absent`; clamped, `economy_clamped` — tier 5,
     substitution (T114-11). (15) A slider change after creation: (e) (T114-7). (16) Epochs (T114-8). (17) The history replay
     (T114-12). (18) An older document: reads 50, replays and upgrades unchanged (T114-13).
     **(j) BARS (§13.2).** (T114-1) The no-op pin: at economy ≥ 50 the band shares, cuts, bands and every plot equal the
     uncapped town's; at 50 with the wealth level derived, standalone TOWN and CITY are byte-identical to today's at
     `wealthLevel` 0.5 — B-CITY, the goldens, the realism golden (T13-1), every NG, FM and VG parity run — and the parity
     presets equal their no-ceiling runs at every economy. (T114-2) The cap: on 50 seeds at each of TOWN, CITY and
     METROPOLIS and economy 0, 10, 25, 40 and 49, no household, plot, block, district band, `bandRange` end, composition row,
     occupants' band, underground or undercity plot lies above the ceiling band, and the ceiling band holds `f · W` of the
     households within the roster's rounding (± 1 household per band and stage). (T114-3) §7.8's sweep of the Economy (21
     steps × 50 seeds at TOWN and CITY, METROPOLIS nightly) is monotone and continuous in the median plot area and the top
     band's share. (T114-4) The value is kept: a seed at economy 20 and at 50 with the wealth level held equal has the same
     field cell for cell; inside the ceiling band the larger classes stand on the higher values (T71-1's monotone share);
     edge (13) holds. (T114-5) The floor: a fixture at Wealthy and economy 10 has the ceiling `rich`, `by: 'wealth'`; one at
     Moderate and 0 `comfortable`; over the 35 births and the 12 after-tick dossiers no plot lies above its ceiling and T73-7
     fails on none where it passes uncapped. (T114-6) Every district's `bandRange` lies at or below the ceiling band and holds
     its own band. (T114-7) A same-id re-offer that changes only `config.priorityEconomy` leaves the model digest unchanged
     and reports `creation_only`; Regenerate reads the recorded value; a standalone Economy change re-derives from S0 and its
     undo restores the digest; an adjust of a dossier-supplied Economy is refused `dossier-owned`. (T114-8) A history whose
     wealth rises past a band (F9 to Wealthy; a trajectory target of 0.95) lifts the ceiling at that epoch; it never falls
     below the founding's row; no plot's band moves by more than one band in an epoch through the ceiling's change; with the
     wealth held, 20 epochs keep the founding's ceiling. (T114-9) The slum card (economy 10) and the great-houses card (90)
     of a standalone neighbourhood and a VILLAGE at economy 0 hold nothing above their ceilings; the hood's manor blocks are
     0 below `prosperous` with no F-DISPATCH entry; DR6's bar holds at village rungs where it held uncapped. (T114-10) An
     Economy lowered from 60 to 10 keeps every locked, pinned or declared building with its fate; a T5 band chip above the
     ceiling bends with `bend.fill.ceiling`; a `prosperityBands: ['rich']` criterion places in the ceiling band with no
     F-SITING entry; a dossier institution whose class reads `rich` stands, built at the ceiling band's row. (T114-11) The
     port reads `config.priorityEconomy` and no other slider (T-V8-20's ignore clause with the four others, `_config` and
     `economicState.priorities`); absent reads 50, noted and editable; 140 reads 100, noted. (T114-12) Item 113 (g)'s
     city-to-village fixture at economy 20: no survivor, remnant, ruin or `builtBand` above the ceiling at any replayed
     epoch, the peak generated under it, byte-stable per seed and history. (T114-13) A document written before this item
     replays byte-identically and upgrades with no ceiling difference in its diff.
     **(k) THE UNITS — applied IN the coherence pass's Rewrite phase (owner, 2026-09-30: "bundle these into the rewrite
     phase"): the landed base parts in a late rewrite seat each, every other unit in its main rewrite. Each shared decision
     has one canonical home (STATES); every other unit cites it (REFERENCES).** *Base — model (§2), late seat:* STATES
     `FieldBands.ceiling` (§2.5) and the `factTier` rule for `Recipe.intent.economyPriority` (§2.8); REFERENCES §4.5, §7.7.
     *Base — kernel (§3), late seat:* no part. *Base — pipeline (§4, §10, PART II, PART III), late seat:* STATES the
     prosperity ceiling whole in §4.5 — (b)'s table with its default rows and the parity row, the wealth floor, (c)'s fold,
     cuts, banding, reads, band-range rule, interplay and precedence; the fold's place in §4.2 S2's demand; §10.2's demand
     and class rows read at the clamped band (one sentence); §4.11's ceiling at each epoch and in history-first generation
     ((e), (f)), with `EpochInputs.wealthLevel`; REFERENCES II.7 (its banding already clamps) and PART III (V07's fold).
     *Base — determinism (§5, §6, §7), late seat:* STATES §7.7 layer 1 (`Intent.economyPriority`, the optional
     `wealthLevel` and its derivation, Surprise me's range), §7.7 item 1's narrowed list and its reason (g), the derivation
     table's DR6 (input `settlement.economyPriority` through the recipe; bar: no plot above the ceiling band) and DR7 (input:
     the ceiling), item 11's refusal of an adjust of a dossier-supplied economy priority, item 13's list naming F-V8-8,
     §7.4's lifecycle rows for the economy priority and `FieldBands.ceiling`, §7.5's schema rows (`economyPriority` absent
     reads 50; a stored `wealthLevel` stays; `FieldBands.ceiling` absent is none), §7.8's Economy registry row, the basic
     panel's "Economy" in place of "wealth level", the advanced Wealth level, and §6.2's recorded inputs (the recipe's
     economy priority); §5: no part. *Base — rendering (§8, §9, §11, §12), late seat:* STATES §8.2's legend rule (h);
     nothing else. *Base — scope (§0, §1, §13–§17, judgment index), main rewrite:* STATES §13.2's T114-1 – T114-13, §14's
     `DossierDigest.settlement.economyPriority` with the port's digest, creation and absorb duties and the note kinds
     `economy_absent`, `economy_clamped`, `creation_only`, the §0 index terms (economy priority, prosperity ceiling, ceiling
     band) and the judgment rows; REFERENCES §1.1 (no rung caps a band). *V01:* STATES the hood's Economy
     (`Recipe.intent.economyPriority`, `HoodRecipe.intent.wealth` derived), the cards' values (great houses 90, slum 10), the
     shanty condition as economy ≤ 20 through the derived wealth, the manor quota at 0 below `prosperous`; REFERENCES §4.5 for
     the fixed-cut clamp and the band ranges. *V02:* REFERENCES (c) 4 at §3.2 step 3 — the significance shift reads at most
     the ceiling band's row — in one sentence; states nothing. *V03:* no part. *V04:* REFERENCES (c) 6 in one pointer at F2
     and C5; states nothing. *V05:* REFERENCES (c) 3–4 (`S_town` untouched; a held institution island reads its requirement
     band at the ceiling band) and item 115 (e). *V06:* STATES the prelude's installation of the ceiling after the wealth
     level and before S6, BCR-V6-9's field as the floor's input, start small and the replay under the ceiling, and its bars;
     REFERENCES §4.11. *V07:* STATES the fold on `bandShares`, T1's Economy on the village and DR6 at village rungs;
     REFERENCES §4.5. *V08:* STATES the adapter row `config.priorityEconomy` → `settlement.economyPriority` (range, clamp,
     absent), the settlement's carried fact, receipt row F-V8-8, J-V8.45 and BCR-V8-25 restated, the host frame (Economy
     locked where supplied; the wealth level editable), the census reading (all 155 at 50, no ceiling), and its T-V8 bars.
     *V09:* STATES T1's Economy slider (label, range, default, the hint "Richest: {band}", its host lock), the advanced Wealth
     level, `info.ceiling`, `bend.fill.ceiling` with `button.economyUp`, the Wealth view's legend line, the report panel's
     line and BCR-V9-2's cells. *V10:* STATES `IntendInput.economy`, the lexicon's wealth rows re-valued, `FieldDrivers.ceiling`
     and the why answers. *V11:* STATES row 6's `ceiling` rows in `bands.json` with their `ownerRule` stamp and the parity
     presets' row. *V12:* STATES §1's owner-rule list entry, `Level.intent.economyPriority`, the rule that a level setting
     `wealthLevel` explicitly keeps the economy at its default (so every existing bar, `T110b.elevated.prosperity` included,
     is unchanged), and the register's `ownerRule` entries (never calibrated). *Scope:* BASE for (a)–(d), (g)–(j); STAGED
     with evolution for (e) and (f).

115. **OWNER RULE — Floating islands need both high magic and a high economy (owner, 2026-09-30 ~00:50–01:00; filed under
     J122 and J126).** Owner: "and only high magic on the slider allows for floating islands in the initial generation.",
     then "actually floating islands has to have both high magic and high economy" — and "bundle these into the rewrite
     phase". **What SettlementForge gives (CONFIRMED, read-only, from the same survey):** a magic slider `priorityMagic`
     (0–100, default 50) and a toggle `magicExists` among the wizard's raw settings; a resolved word `config.magicLevel` ∈
     none, low, moderate (read `medium`), high, which its step 1 (`resolveConfig`) derives — how it bands the slider is not
     recorded; `medium` in 152 of the 155 census dossiers and `low` in 3, none `high`; the economy slider of item 114; no
     banding of either slider. **What the design has (CONFIRMED):** II.6's island rule — the model setting
     `recipe.layers.islands` (off by default, D-3), the rung gate, the supply law `h(S_town)`, `h(S_carried)` with the
     `magical_node` term; V05 §3.2 (1)'s `skyGate` with its dossier-only clause "magic not `none`"; §7.7 item 11 and J-V5.19's
     refusal of the setting where the dossier's `site.magic` is `none`; `CircumstanceSlice.magic` ∈ none, low, high (`none` by
     default) with no standalone control; V08 §2.6's `magic` row (medium → low, J-V8.47: "magic present but not shaping the
     town unless the dossier says `high`"). Program's interpretation (vetoable):
     **(a) THE MAGIC THE GATE READS — SettlementForge's resolved word.** (1) *Hosted:* "high magic on the slider" is
     SettlementForge's own top word, `config.magicLevel: 'high'` — the word its generation resolves from its magic slider and
     toggle, so its own banding decides and none of ours is invented (J121) — read through V08 §2.6's `magic` row into
     `site.magic` and `CircumstanceSlice.magic` (none → none; low → low; medium → low; high → high). `priorityMagic` stays
     never-read: its effect already sits in `magicLevel`, and reading both would count it twice (J-M5's own reason). A dossier
     whose `magicLevel` is absent, or a word the row lacks, carries no `site.magic` (`DossierDigest.site.magic?`, noted
     `magic_absent` or `unmapped_word`): the slice's magic is then the map's own, `none` under D-3, a map fact the author may
     change. §2.8's `factTier` reads `dossier` for the creation slice's `magic` exactly when `site.magic` is carried. (2)
     *Standalone:* the creation slice's `CircumstanceSlice.magic`, set by a new advanced-panel control **Magic** — None · Low
     · High (the model's words, which are SettlementForge's resolved words with moderate read as Low), default None (D-3),
     discrete, consuming stage S2 (V11 §3.5's magic-gated classes), locality *re-derive from S2*, anchor II.6 — beside the
     Islands control in the advanced panel's fantasy group, so the basic panel's budget holds (R15); it emits
     `adjust('circumstances.magic', v)` on the timeline's first entry; where the dossier supplied the word it is shown locked
     and its adjust is refused `dossier-owned`. The clerk's `IntendInput.magic` already encodes it.
     **(b) "HIGH".** *Magic:* the word `high`, exactly — SettlementForge's own banding, no threshold of ours. *Economy:*
     item 114's economy priority ≥ **75**, inclusive, on SettlementForge's 0–100 slider scale, read as recorded (absent 50).
     *Why 75:* SettlementForge bands no slider; "high" must lie above the default 50 (a default settlement is not high, and
     all 155 census dossiers sit at 50); it must lie where item 114's ceiling is already the top band (≥ 50), so an island
     town is never capped; and 75 splits the range above the default in two as SettlementForge's four magic words split
     magic, so "high" names the same top quarter in both words the gate reads. *The cells:* `IslandRule.gate: { magic:
     ('none'|'low'|'high')[] /* the words that let an island rise: ['high'] */; economyMin: number /* 75, inclusive */ }` on
     both rung rows of `islands.json` (V05 §2.4), provenance `own`, `ownerRule: '115 (b)'`, never calibrated (V12 §1). The
     economy clause reads the slider value — never the field, `S_town` or item 114's ceiling; the magic clause reads the magic
     in force — never the deposits (the node term stays the supply law's).
     **(c) THE GATE AT THE FIRST GENERATION — five clauses, in order, then the supply law.** Islands may rise only where
     all hold: (1) *setting* — `recipe.layers.islands = 'on'`; (2) *parity* — the recipe is not a parity preset's (`MFCG` and
     `FTG` hold the setting off, J-V5.25); (3) *rung* — `RungProfile.layers.islands = 'possible'` (CITY, METROPOLIS); (4)
     *magic* — the magic in force is among `gate.magic`; (5) *economy* — `Intent.economyPriority ≥ gate.economyMin`. Then
     II.6's supply law runs as today (`h_town`, the slots, the reasons, the fill), its closures keeping V05 §3.2 (5)'s
     sentence. `SkyGate { open: boolean; failed: SkyGateClause[] /* every failing clause, in the order above */ }` with
     `SkyGateClause = 'setting'|'parity'|'rung'|'magic'|'economy'` is derived at S7b (5) and at each epoch's rising, never
     stored; S7b (5), `IslandEpochStep`, the Islands control's state, the report and the clerk read it. *The report:*
     `islands: off` for (1)–(2), else `gated: ` and every failing clause among rung, magic and economy in order ("gated:
     magic, economy"), the detail naming each value and its source ("magic low — SettlementForge"); the old `gated: dossier
     magic` folds into `gated: magic`. *Subsumed:* the dossier-only clause "magic not `none`" (V05 §3.2 (1)) is subsumed by
     (4) for every document; the refusal of the SETTING where the dossier states `none` (§7.7 item 11, J-V5.19) is retired —
     the setting alone raises nothing now, and the one thing that would contradict a magic-less dossier world, an island, is
     refused where it is asked for ((d) 4); II.6's missing magic clause is closed. *The count:* the gate precedes it — under a
     failed gate no slot opens by rule, an integer `islands.count` opens none (its adjust applied, the report gated), and a
     creation-prefix declaration (a forced slot) takes its island as held ((d) 4). With SettlementForge's defaults — every
     census dossier — no dossier city has islands at its first generation (economy 50 fails (5); 32 of the 35 births carry
     medium, read low, and fail (4)): a SettlementForge city gets islands only when its author sets the economy slider to 75
     or more and the magic to high, the rarity the owner asks for.
     **(d) AFTER THE FIRST GENERATION — the gate binds what rises, never what stands.** (1) *What rises:* generation and
     every re-derivation through S7b, the history replay (item 113), an epoch's `raiseIsland` (V05 §3.15 (5)) and an epoch's
     refloat of a SETTLED island (V05 §3.15 (4)) each read the gate — the magic in force at that time and the recorded
     economy priority (constant after creation, item 114 (e)); a failed gate at an epoch draws nothing on `island.place` for
     that slot and reports `gated`. A "start small" town (V06 §3.3.3) fails (3) at its founding; the epoch that carries it into
     CITY may raise an island only with the gate open. (2) *What stands:* a floating or waning island follows the supply law
     and the rung (II.6 (6)); magic falling from high to low, or the economy clause failing, neither wanes it nor stops a
     waning island's recovery; magic `none` in force — a dossier change at an absorb, or a standalone timeline's slice — makes
     every island's target 0 at the next epoch in EVERY document (they wane, settle and fall over their dwells, never
     vanish: V05 §4.4's law extended from the dossier to every document, since magic is what keeps them aloft, II.6) — but an
     island a lock or a declaration holds, which stands listed `held against its magic` (J-V5.10). (3) *A
     later change:* the economy is creation-only (item 114 (e)); a dossier's changed `magicLevel` rides the next epoch's slice
     (§7.7 item 6) and opens or closes the gate for later risings; standalone, the Magic control is an adjust that re-runs
     the first generation (Re-derive from S2), whose generated islands rise again only through an open gate, their fates
     listed. (4) *The author's own islands (item 101 R2, R13):* a T5 `sky` declaration — and a T6 placement onto an island
     that the dry run turns into one — under a failed magic or economy clause is ALLOWED, with the fate `held against its
     magic` or `held against its economy` confirmed at the dry run beside V05's `held against its supply` (J-V5.10 extended);
     the rung stays absolute (`refuse.islandsRung`); where the dossier states `none` it is refused `dossier-owned` —
     `refuse.islandsNoMagic`, "This world has no magic; nothing floats here." — the one refusal (item 20 (h)). A held island
     stands by R13 and no gate wanes it; undo is the declaration's inverse; locks hold as today. (5) *The Islands control*
     (§7.8): at CITY and METROPOLIS, where a failing clause is the map's to change, turning it on applies the setting and
     shows `info.islandsGated` — "Floating islands need high magic and an economy of 75 or more." — with `button.magicHigh`
     (`adjust` the magic to high) and `button.economyHigh` (`adjust` the economy to 75); where a failing clause is the
     dossier's, the control is disabled with its reason row `refuse.islandsDossier` — "SettlementForge sets this world's
     magic to {magic} and its economy to {economy}; floating islands need high magic and an economy of 75 or more." The
     supply sentence of V05 §3.2 (5) gets its row, `info.islandsNone`. (6) *Presets:* no shipped preset turns islands on;
     the parity presets hold the setting off; a user's preset with the setting on meets the gate like any recipe. (7) *The
     view toggle* shows the islands a settlement has and creates none (J-A15.41), unchanged. (8) *Load* replays and
     recomputes the gate from the recorded inputs. (9) *Migrate:* the schema chain reads the economy 50 and the magic as stored; an older document replays
     unchanged at its own output version; its `upgrade` to a version with the gate re-imposes each island the upgraded
     replay no longer raises as a declared island at the upgrade's position — its outline, anchor, altitude and households
     as they stood — held against its magic or economy and listed in the diff unless the user drops it there (§7.5's
     orphaned-lock rule, applied to islands).
     **(e) WITH ITEM 114.** Every economy the gate admits (≥ 75) lies above the ceiling table's last row (50), so an island
     town's ceiling is the top band whole at its creation and at every epoch (the ceiling never falls below the founding's
     row), and a prosperity island carries the richest band as today. A held island in a capped town carries bands at or
     below the ceiling band, and an institution island reads its `requirementBand` at the ceiling band (item 114 (c) 4), its
     supply by the law.
     **(f) EDGES — outcome, rung of §5.1's ladder where it can fail, test.** A closed gate is an outcome, reported by clause,
     not a failure. (1) Magic none, low and high against economy 0, 50, 74, 75 and 100 — minimum, default, and either side of
     the threshold: open only at high and ≥ 75 (T115-1). (2) Both clauses failing: both listed (T115-1). (3) A thorp, a
     village, a town: `gated: rung` first (T115-1). (4) A metropolis: as a city (T115-1). (5) The village product: never
     raises; an island carried down from a town continues V05's steps and falls (T115-5). (6) The standalone neighbourhood:
     islands off by its recipe; the gate never runs (T115-1). (7) The undercity and the underground: no part — islands never
     touch them (J-V4.101). (8) Pins and locks: a locked island stands; a locked slot is neither opened nor closed (T115-4).
     (9) A dossier or custom institution whose row or archetype would go up under a failed gate: it stands on the ground where
     it is — the island moves where an institution stands, never whether it exists (DR27) — and a T6 placement onto an island
     becomes a held declaration (T115-4). (10) A dossier missing either value: magic `none`, editable (`magic_absent`); the
     economy 50, editable (T115-2). (11) A slider change after creation: (d) 3 (T115-3). (12) An epoch rising under an open or
     a failed gate, a standing island under a magic change (T115-3). (13) The replay (T115-5). (14) An integer count or a
     forced slot under a failed gate (T115-6). (15) An older document with islands: re-imposed on upgrade — §7.5's mapping,
     tier 5 substitution (T115-7). (16) The view toggle: T15-1's clause. (17) A declared island no site can hold: V05's F-SKY
     ladders, unchanged (T115-4).
     **(g) BARS (§13.2).** (T115-1) The truth table: 200 CITY and 100 METROPOLIS seeds per cell of magic {none, low, high} ×
     economy {0, 50, 74, 75, 100} with the setting on: islands only where the magic is high and the economy ≥ 75; every other
     cell 0 islands, its report listing every failing clause in order; TOWN, village rungs and a standalone neighbourhood none
     whatever their magic and economy; the parity presets `islands: off`; in the open cells T15-1's count law. (T115-2) The
     dossier: a `medium` city at economy 90 has 0 islands (`gated: magic`) and a disabled control with
     `refuse.islandsDossier`; `high` at 50 is `gated: economy`; `high` at 90 follows the supply law; a dossier without
     `magicLevel` reads `none`, editable, noted; the 35 births at their census values carry no island. (T115-3) Epochs: 200
     standalone start-small towns grown past 10 000 raise islands only with the gate open (magic high, economy 80) and none
     with either clause failing; a standing island keeps its state through a magic change from high to low and wanes over
     its dwells at `none`, never in one epoch; a settled island refloats only through an open gate. (T115-4) The author: a
     T5 `sky` declaration under each failing clause carries its fate (magic, economy, supply) and holds through Regenerate and
     epochs; a locked generated island stands through an Economy lowered below 75, its fate listed; under a dossier-stated
     `none` a declaration is refused `dossier-owned`; at TOWN `refuse.islandsRung`; each undo restores the digest. (T115-5)
     The replay: a city-to-village history with the gate open at its peak carries islands at its CITY epochs that wane,
     settle and fall over their dwells, leaving landfalls in the present village; with the gate failing none; byte-stable
     per seed and history. (T115-6) Under a failed gate an integer `islands.count` opens no slot; each failing
     clause shows its message; one click on each of `button.magicHigh` and `button.economyHigh` opens the gate and the ghost
     shows the supply law's islands. (T115-7) An older document with islands replays unchanged at its own version; its
     upgrade re-imposes every island the gate no longer raises as a held declaration listed in the diff, dropping it there
     removes it, and the upgrade's undo restores the digest. (T115-8) Every CITY the gate admits has its ceiling at the top
     band whole at creation and at every epoch of a 20-epoch history. (T115-9) The clerk: "floating islands" on a low-magic
     town ends in `info.islandsGated` with its two actions; "an opulent city of high magic with floating islands" sets the
     economy 90, the magic high and the setting on, and islands are possible. T10-1 and T15-1 run with the gate held (magic high,
     economy 100; T15-1 at economy 75 and 100 in place of `wealthLevel` 0.5 and 1); T13-1 is unchanged.
     **(h) THE UNITS — applied IN the coherence pass's Rewrite phase (owner, 2026-09-30: "bundle these into the rewrite
     phase"): the landed base parts in a late rewrite seat each, every other unit in its main rewrite. One canonical home per
     shared decision (STATES); every other unit cites it (REFERENCES).** *Base — model (§2), late seat:* STATES the `factTier`
     rule for the creation slice's `magic` (§2.8); `SkyIsland` unchanged; REFERENCES II.6, V05. *Base — kernel (§3), late
     seat:* no part. *Base — pipeline, late seat:* STATES II.6's gate — (c)'s five clauses in order with the cells' values,
     the report reasons and the subsumed clause — II.6 (6)'s what rises and what stands with magic `none` in every document,
     S7b (5)'s wording ("the gate, II.6"), and §4.11's islands at an epoch (a raise and a settled refloat read the gate; no
     draw under a failed gate); REFERENCES V05 for `skyGate`'s build. *Base — determinism, late seat:* STATES DR27 (inputs
     `settlement.economyPriority` for the economy clause and `site.magic` for the magic clause; bar: the gate's clauses
     resolved and traced to those fields or to their map defaults), item 11 (the setting's refusal retired; a declared island
     in a dossier-stated magic-less world, and an adjust of a dossier-supplied magic, refused `dossier-owned`), §7.8's Magic
     registry row and the Islands control's states (enabled, `info.islandsGated`, disabled with `refuse.islandsDossier`),
     §7.4's rows for the declared island's fates, §7.5's upgrade rule (d) 9 and the optional `site.magic`; §5 and §6: no
     part. *Base — rendering, late seat:* no part (§8.4's view toggle unchanged). *Base — scope, main rewrite:* STATES
     §13.2's T115-1 – T115-9 and T10-1's and T15-1's restated fixtures, §14's optional `site.magic` with the note
     `magic_absent`, D-3's sentence ("floating islands … only at CITY and METROPOLIS, only with high magic and an economy of
     75 or more at their rising, and only where prosperity supplies them"), and the judgment rows. *V01:* no part (a hood
     holds islands off). *V02, V03, V04:* no part. *V05 (the principal build home):* STATES `skyGate` at depth (the record,
     the clause order cited from II.6, the report lines), §0's plain words (only a city whose magic is high and whose economy
     is strong gets a roll at all), the §1b wiring row, `IslandRule.gate` and its defaults in §2.4 with §2.6's lifecycle row,
     §3.2 (1), (4) and (5) (the gate before the count; the sentence split by cause, remedies "raise the Economy to 75, set the
     Magic to high, or place an island by hand"), §3.15 (4) and (5) (a settled refloat and a raise read the gate) and magic
     `none` in every document, §4.1's T1 row gaining the Magic control, §4.2's declaration fates, §4.4's DR-SKY inputs and
     coherence restated, §4.5's why naming the clauses, J-V5.10 and J-V5.19 restated, §7's T-V5-1 extended with the truth
     table and every island fixture (T-V5-15's goldens, T-V5-18's budgets, T-V5-2's levels moved to economy 75 and 100)
     generated with the gate held, and §8's P0 run at magic high and economy 100 with `wealthLevel` set explicitly per level
     (so its bars are unchanged); REFERENCES item 114 (e). *V06:* STATES that `sky.islands`' raise and a settled refloat read
     the gate, the replay's islands, the start-small crossing, that the time card is unchanged (`trajectory.slice.magic`, the
     tool API's, is how a standalone history changes magic), and its bars; REFERENCES II.6, V05. *V07:* STATES §1's
     out-of-scope sentence rewritten — the village never raises an island (the rung clause), and an island carried down from
     a town continues V05's steps and falls, which resolves its contradiction with §3.12 and V06 §3.2. *V08:* STATES the
     `magic` row's absent and unmapped rule, the census effect ((c)'s last sentence), DR-SKY's inputs, the host frame's
     locked Magic, and its bars. *V09:* STATES the Magic control in the advanced panel beside Islands, the Islands switch's
     states, the rows `info.islandsGated`, `refuse.islandsDossier`, `refuse.islandsNoMagic` and `info.islandsNone` with
     `button.magicHigh` and `button.economyHigh`, and its bars. *V10:* STATES `IntendInput.islands?: 'off'|'on'` (encoded
     `adjust('layers.islands')`), the lexicon row "floating islands, sky islands, flying islands → `islands: on`" (the words
     set the switch alone; the gate's message says what is missing), and the island's why naming the clauses. *V11:*
     STATES row 56's `gate` cells in `islands.json` with their `ownerRule` stamp, and that §3.5's `magicGate` for classes
     stays `≠ 'none'` — a separate gate from the islands'. *V12:* STATES §1's owner-rule list entry, `Level`'s magic, the
     register's `ownerRule` entries (never calibrated), and M6-sky's panel seeds generated with the gate held. *Scope:* BASE
     for (a)–(c), (e)–(g); STAGED with the sky layer (V05) and evolution (V06) for their parts of (d).
