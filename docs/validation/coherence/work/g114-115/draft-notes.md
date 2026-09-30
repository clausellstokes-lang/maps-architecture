# Draft notes: owner rules 114 and 115 (the architect's decisions)

The items as they will be filed in `docs/AMENDMENTS-2026-09-28g.md` are in `items-114-115.md` in this directory. This note
records every decision, the reason for it, and the alternatives rejected. It also lists the gaps found and the notes other
units need. Each decision is the program's under J122 and can be vetoed. The judgment ids proposed here, J-A114.41 and on
and J-A115.41 and on, are for the scope part's judgment index.

Sources read whole: `read-base.md`, `read-sf.md`, `read-vols.md`, and g items 102, 107 and 113. Sections read whole:

- Base §4.2 (S0–S2).
- Base §4.5, all of it (fields, bands, S7b, and item 72's character, ranges, dials and pressure).
- Base §4.11: EpochInputs, history-first, the clock, the rung at an epoch, and the dials over epochs.
- Base II.6, all of it.
- Base §7.5.
- Base §7.7: layer 1, layer 2's records, the dossier contract items 1–16, and the derivation table.
- Base §7.8.
- Base §5.1's tiers, §5.2's rows and §5.4's report.
- Base §2.5 FieldBands, §2.9 Document and Recipe, and §14 DossierDigest and the port duties.
- Base §13.2: the island bars, T73-7 and T71.
- V05: §1b, §2.4, §2.6, §3.2, §3.3, §3.15, §4.1, §4.2 and §4.4.
- V06 §2.3 and §3.3.
- V07: §1's out-of-scope sentence, §3.2 (3), §3.12's island sentence, and §4.1's T1 row.
- V01: V1-2.6 and V1-3.10.1 steps 3–6.
- V08 §2.6's `wealth` and `magic` rows.
- V09: the T1 row and §4.9's island and bend rows.
- V10: §2.12 IntendInput, §2.13 FieldDrivers, and §3.3's lexicon rows.
- V11: §3.1's catalogue rows 6, 30, 56 and 63, and IN-V11-1 on the `ownerRule` stamp.
- V12 §1.
- `research/sf`: `dossier-model.md` §2 and §3's economicState; `dossier-generation.md` §2.2 and §3.2 steps 1 and 10; `mapping.md` rows 12, 42 and 54 and J-M1 to J-M7.
- `OWNER-DECISIONS-DELEGATED-2026-09-29.md`, all of it.

---

## Item 114: the economy slider and the prosperity ceiling

### D114-1. Which slider, hosted (J-A114.41)

**Decision.** Read the resolved `config.priorityEconomy`, 0–100, into `DossierDigest.settlement.economyPriority?`. The
port's creation half copies it into `Recipe.intent.economyPriority`.

**Reason.** This is SettlementForge's own economy slider (J121), and the resolved `config` is already the port's source.

**Rejected.**
- `_config`. It holds the raw `'random'` sentinel and is secret on every shared surface. It is the regeneration input, not the value used.
- `economicState.priorities.economy`. It is a copy of the same value. Reading two copies would give one fact two sources, and the closed-digest rule already leaves it unread.

**Clamp and absence.**
- An out-of-range number is clamped and noted `economy_clamped`.
- A missing value or a non-number is absent and noted `economy_absent`. It takes SettlementForge's own default, 50, as a map fact and stays editable. Item 20 (h): a gap is the map's to fill.

**Tier of fact.** `factTier` reads `dossier` only when the dossier supplied a value.

### D114-2. Which slider, standalone: the wealth slider re-pointed (J-A114.42)

**Decision.** T1's wealth slider IS the economy slider.
- It is relabelled "Economy", with range 0–100 and default 50.
- `Intent.wealthLevel` becomes optional. When absent it reads `economyPriority ÷ 100`.
- The advanced panel keeps the Wealth level.

**Reasons.**
1. One term per concept. The design gets one basic control. The alternative would put "wealth" and "economy" side by side as near-synonyms.
2. R15. The basic panel holds 12 controls exactly, so a new control would make 13.
3. J121. The control follows SettlementForge's own range, default and key word.
4. The owner speaks of "the economy slider" as THE slider.
5. Continuity. Economy 50 gives wealth level 0.5, the value that §13.2's B-CITY sweep, T15-1 and V05's calibration treat as the reference. So the one-click town is unchanged.

**Rejected.**
- (a) A separate 13th Economy control beside the wealth slider. It breaks R15 and confuses the two concepts.
- (b) An Economy control that sets only the ceiling. Its upper half would do nothing except item 115's gate, which makes it a poor control, and the §7.8 sweep would be flat over half the range.

**Why this does not double count.**
- On a dossier map the slider does NOT set the wealth level. The prosperity word does, through DR6.
- Standalone, the economy sets both the mean (the derived wealth level) and the top (the ceiling). Those are two different effects, and SettlementForge's sliders plausibly relate to its prosperity in the same way.

**Label.** "Economy" is the word both SettlementForge keys use. The surveys never read its wizard's UI label (N).

### D114-3. The unit of the ceiling: bands, not values (J-A114.43)

**Decision.** The ceiling binds BANDS:
- the household band shares at S2,
- the cut ceiling and the banding clamp at S6,
- band-keyed reads, which take the end-band rule,
- the district range.

The field `P` is never clamped or compressed.

**Reasons.**
1. The cuts are per-town quantiles, so a value clamp binds no band. Only the demand shares decide how much land each band holds.
2. It never flattens the distinctions between rich quarters. Their value order and distances survive.
3. A value clamp would count the economy twice on a standalone map, because the economy already moves the absolute level through the derived wealth level's character offset.
4. A compression of the upper tail would move the absolute values that `S_town` and V05's calibrated supply rows read.

**What does flatten.** Only rows read above the highest allowed band's centre take that band's row. The top band's upper half already reads that way today, through §4.5's end-band rule.

### D114-4. The ceiling's form: a continuous position with a fold (J-A114.44)

**Decision.** The ceiling is `at`, a position on the band ranks.
- The highest allowed band is ⌈at⌉.
- Its share is `f = at − ⌈at⌉ + 1`.
- The S2 fold works like this: the highest allowed band holds `f·W`, the band below holds `w_{c−1} + (1 − f)·W`, and every band above holds 0.

**Reason.** §7.8 makes the Economy a continuous control, swept for monotonicity and continuity. A stepped band table would jump at each step and fail the sweep, and its pre-decided fallback would then smoothstep it anyway. The fold is continuous at integer positions. I checked both one-sided limits: at `at` = k⁻ the band k holds W≥k; at `at` = k⁺ the band k holds w_k + W>k = W≥k.

**Rejected.**
- A stepped table plus a declared-discrete control. The control also drives the wealth level continuously, and the registry has one continuity class per control.
- Folding the whole excess into the band below. That is discontinuous at integers; I checked this.
- A rank-scaling compression of the whole distribution. It moves households below the top as well, so it is not a "ceiling".

### D114-5. The table and the default (J-A114.45)

**Decision.** The table is `BandSet.ceiling`, rows `{0, modest}` and `{50, rich}`, linear in rank.
- On the default set this is `at = 2 + 3·min(e, 50)/50`.
- Economy 50 and above means no ceiling.
- The rows are stored as §7.6 cells with provenance `own` and `ownerRule '114 (b)'`, and they are never calibrated.
- The parity presets carry `{0, top}`.

**Reasons for default = identity.**
1. Emulation first. FTG's aristocratic tier and MFCG's patriciate exist at their defaults.
2. The goldens, B-CITY and the NG, FM and VG parity runs are unchanged. This is the no-op pin, in the form of item 102 (g).
3. SettlementForge's default births reach Prosperous (41 of 155). DR6 reads Prosperous as a mean at the prosperous band, which needs richer households above it.
4. The wealth floor (D114-6) lifts Prosperous and Wealthy words to rich in any case.

**Reasons for lowest = modest.**
- `modest` is FTG's modest tier and MFCG's craftsmen.
- Below it the whole town would be poor. No reference town shows that, and V07's THORP still keeps comfortable and prosperous shares.
- It gives the slider four ceiling levels (modest, comfortable, prosperous, rich), so the owner's rule has visible reach.

**Why linear.** It is the simplest monotone continuous map between the two knots. SettlementForge's own banding of its sliders was never recorded (N), so there was none to follow.

**Rejected.**
- A rung-dependent lowest ceiling, such as "a METROPOLIS never below prosperous". It overrides the owner's rule with our realism judgment. The dossier's word already guards coherence on dossier maps, and standalone the author chose the slider.
- `comfortable` as the lowest ceiling. It leaves only three levels and makes the slider weaker.

### D114-6. The wealth floor: the dossier's word always keeps room (J-A114.46)

**Decision.** `at ≥ rank(wealthBand(w)) + 1`, capped at the top.
- `wealthBand` uses V08 §2.6's `wealth` row, the same mapping DR6's bar reads. The row used is the one with the largest value not above `w`.
- `w` is the wealth level in force.
- `FieldBands.ceiling.by` records which term set the ceiling.

**Reasons.**
1. Item 20 (h): the dossier is the truth, so a low slider must never contradict a rich word.
2. SettlementForge's prosperity is live while its sliders are birth-only, so a lived dossier can be Wealthy at slider 10.
3. "+1": the word states the typical (mean) household, and a mean at band b needs households above b. One band of room is the least that keeps a spread.

**Standalone.** With the wealth level derived as e/100, the floor never binds. I verified `wealthBand(e/100) + 1 ≤ at` for every e in [0, 100], checking each interval between the rows. It binds only where an author sets the wealth level above the Economy in the advanced panel.

### D114-7. Which bound wins (J-A114.47)

**Decision.**
- The map ceiling wins over item 72 (d‴)'s rows. Each end of the range is lowered to the highest allowed band.
- The range still holds the district's own band, because that band is never above the ceiling (J-A72.50).
- The dials stay inside the range.
- The pressure's excess is measured against the clamped range. At the highest allowed band the upper cut is 1, so no upward excess arises there and there is no runaway.
- No rung row caps a band. Band-keyed rung rows are read at the clamped band.

**Precedence.** The ceiling is a rule-table bound. It sits below locks, dossier existence, assignments and drawn geometry, and those hold with the fate `held above the prosperity ceiling`.

### D114-8. The first generation: what reads the slider and what carries it (J-A114.48)

**Reads the recorded value.**
- The creation and a whole-map regenerate from the recipe.
- T1's drag. This is an adjust with a Re-derive from S0: a re-run of the first generation, as for every early parameter.
- The history-first peak and replay.

**Carries `FieldBands.ceiling`.** Epochs, local and scoped edits, undo and redo, load, and migrate.

**Record.** `FieldBands.ceiling?: {at, by}` is model data, written with the cuts. It is derived and has no edit kind.

**Consuming stage S0.** At TOWN, II.7.1's sewer law reads the derived wealth level. The base never pinned the wealth level's consuming stage; that was a gap.

### D114-9. After the first generation (J-A114.49)

**Decision.** The economy priority is read once per creation. At each epoch, `at` = max(the recorded priority's row value, the wealth floor at the wealth level in force).
- That rule is installed in V06's prelude.
- The epoch's delta demand is folded at `at`.
- The epoch's cuts come from the folded demand.

**Consequences.**
- A lived word that rises lifts the ceiling, and a fall returns toward the founding value but never below it.
- A same-id dossier re-offer with a new slider becomes receipt F-V8-8, response `none`, reported `creation_only`.
- Standalone, T1 re-runs the first generation.
- Host mode refuses the change as `dossier-owned`.

**Reasons.**
- "the first generation" (owner).
- SettlementForge writes its sliders only at birth, while its prosperity lives ("Wealthy only after lit ticks").
- Item 11 (b): no map fact depends on the slider after creation.

**Rejected.**
- (i) The ceiling vanishes at the first epoch. It would lift with nothing changed: an economy-10 town grown by 1 % would suddenly gain a rich band.
- (ii) The ceiling follows the current slider. That contradicts "first generation", and SettlementForge never moves the slider anyway.
- (iii) A ratchet, where the ceiling only rises. It needs history state. The recompute is a pure function of the recorded inputs, and it lets a fallen word's town decline by the normal ladder.

### D114-10. History (J-A114.50)

**Decision.** History-first generation IS the first generation, so its peak and every replayed epoch sit under the creation's ceiling.

**Reason.** SettlementForge records no history of prosperity or sliders, and we invent none.

**Consequences.**
- No remnant has a band above the ceiling.
- The high-water mark sizes the extent, never a band.
- A symbolic peak follows the same rule.

### D114-11. J-M5 and row 54: narrowed, not reversed (J-A114.51)

**Decision.** `priorityEconomy` gets one named consumer: the creation half, for the ceiling and 115's clause. The other four sliders stay never-read.

**Reason.** J-M5 is about weights. A bound and a gate clause add no weight to what the institutions (DR9) or the income shares (the economy dial, DR13) already carry, and the dossier's wealth level still comes from the word. `priorityMagic` stays unread by J-M5's own reasoning, since `magicLevel` already carries it.

### D114-12. Explanations (J-A114.52)

**Decision.**
- There is no `'ceiling'` driver term. The field is not clamped, so the terms still sum to the stored value (T-V10-10). Instead `FieldDrivers.ceiling?` carries the ceiling.
- The why line is `info.ceiling`.
- The legend lists only the bands present, plus a "richest" line.
- `bend.fill.ceiling` with `button.economyUp` sets the least economy that reaches the asked band whole: 17, 34 or 50.
- The clerk's wealth words map to `economy` at ×100. Where the Economy is dossier-owned they map to `wealth` instead.

**Reason.** One term per concept: the clerk's "rich city" means the Economy control standalone, and the wealth level only where the Economy is locked.

### D114-13. Surprise me

**Decision.** Surprise me draws the Economy uniformly on [0, 100], on `intent.surprise`.

**Reason.** This is the wealth level's range ×100. SettlementForge's `_randomizePriorities` distribution is not recorded (N), so uniform is the neutral choice.

---

## Item 115: islands need high magic and a high economy

### D115-1. Which magic, hosted (J-A115.41)

**Decision.** Read `config.magicLevel`, SettlementForge's resolved word, through V08's `magic` row. High magic is `magicLevel: 'high'`, which gives `site.magic` `'high'`. `priorityMagic` stays never-read.

**Reasons.**
1. J121: follow SettlementForge's own definitions. `magicLevel` is the word its generation resolves from its magic slider and toggle, so its banding decides and we invent no threshold.
2. It already flows through the port.
3. J-V8.47 already says that only `high` "shapes the town".
4. `magicExists: false`, a toggle, would be ignored by a slider threshold. The resolved word folds it in.
5. Reading both `priorityMagic` and `magicLevel` counts the slider twice, which is J-M5's own reason.

**Uncertain.** The link from `priorityMagic` to `magicLevel` is PLAUSIBLE only (read-sf hypothesis A). The decision does not rely on it.

**Rejected.** `priorityMagic ≥ a threshold`. It needs our own cut, it adds a never-read key, and it can contradict SettlementForge's own word, for example slider 90 with `magicExists: false`.

**Absent or unmapped word.** The digest carries no `site.magic`, and the slice's magic becomes the map's own default, none (D-3). It is a map fact and editable.
- Item 20 (h): derived values are map facts.
- The old row's "else none, noted" would have made a non-statement dossier-owned.

### D115-2. Which magic, standalone (J-A115.42)

**Decision.** A new advanced-panel control, Magic: None · Low · High, default None.
- It sits beside Islands in the fantasy group.
- It is discrete.
- Its consuming stage is S2 (V11's magic-gated classes), with locality re-derive from S2.
- It emits `adjust('circumstances.magic')` on the creation slice.

**Reasons.**
- The gate needs a standalone way to reach high. Today only the clerk can set magic.
- D-3 keeps the default None, which rejects SettlementForge's default 50 → medium → low. That default would change the realism golden: lights, arcane classes, access kinds.
- R15 keeps it out of the basic panel.
- Islands, the feature it gates, already sit in the advanced panel.
- The three words are the model's and SettlementForge's resolved words, with moderate read as Low.

**Rejected.** A 0–100 Magic slider. It would need our own banding into none, low and high, and SettlementForge's default of 50 conflicts with D-3.

### D115-3. The thresholds (J-A115.43)

**Magic.** Exactly `high`.

**Economy.** At least 75, inclusive, on the 0–100 scale, read as recorded; absent reads 50.

**Reasons for 75.**
1. It must be above the default 50: all 155 census dossiers sit at 50 and are "normal".
2. It must be at or above 50, where 114's ceiling is already the top band, so an island town is never capped (D7 of read-vols).
3. It is the top quarter of the range, just as `high` is the top of SettlementForge's four magic words.

**Rejected.**
- `> 50`. That makes any above-default setting "high", which is too permissive for "high economy".
- `≥ 67` (the top third). It has no anchor in SettlementForge's vocabulary.

**Cells.** `IslandRule.gate {magic: ['high'], economyMin: 75}` on both rung rows. They are stored with `ownerRule '115 (b)'` and never calibrated.

### D115-4. The gate's form and order (J-A115.44)

**Decision.** Five clauses, in this order:
1. setting,
2. parity,
3. rung,
4. magic,
5. economy.

The supply law runs after them, unchanged.

**Why this order.**
- The author's switch comes first.
- Structure comes next: the rung.
- Then the owner's words, in his order: magic, then economy.

**The derived record.** `SkyGate {open, failed[]}` lists every failing clause, so the author sees every remedy at once. It is derived and never stored.

**The report.**
- `islands: off` when the setting or parity clause fails.
- `gated: <clauses>` otherwise.
- The old `gated: dossier magic` folds into `gated: magic`. The detail names the source.

### D115-5. The subsumed and retired rules (J-A115.45)

**Decision.**
- The dossier-only clause "magic ≠ none" is subsumed by the magic clause for every document.
- J-V5.19's refusal of the SETTING where the dossier says none is retired. The setting alone raises nothing now.
- The one contradiction left, an island in a dossier world with no magic, is refused where it is asked for: a hand declaration gets `refuse.islandsNoMagic`, reason `dossier-owned`.
- The Islands control is disabled with a reason row (`refuse.islandsDossier`) wherever a failing clause belongs to the dossier. This is §7.8's "nothing to act on" rule.
- Where the failing clause is the map's to change, the switch applies and shows `info.islandsGated` with two one-click actions.

**Reasons.**
- Item 101 R2: tools refuse only dossier facts and locks.
- The dossier-owned refusal belongs on the thing that would contradict the dossier, which is an island, not a switch.

### D115-6. After the first generation: what rises, what stands (J-A115.46)

**Decision.**

*Rising is gated.* The gate binds these, using the magic in force and the recorded economy:
- generation and re-derivations,
- the item 113 replay,
- an epoch's `raiseIsland`,
- the refloat of a SETTLED island.

*Standing is not gated.* Floating and waning islands follow the supply law and the rung. A fall from high magic to low neither wanes an island nor stops its recovery.

*Magic none wanes, in every document.* Magic `none` in force sets every island's target to 0 at the next epoch. This extends V05 §4.4's dossier law to all documents. The exception is an island held by a lock or a declaration, listed `held against its magic`.

*No draw under a closed gate.* A failed gate draws nothing, so the stream keys stay stable.

**Reasons.**
- The owner's second sentence, "floating islands has to have both high magic and high economy", reads as general, while "initial generation" marks the moment the islands arise.
- Reading (a) was rejected. It gates only generation and lets islands arise at later epochs with any magic, which contradicts "has to have both high magic".
- Reading (b) was taken: gate every rising, and never destroy a standing island through the gate. Item 22, "wane, never vanish", and J-V5.10's holding by the author stay intact.
- A settled island's refloat counts as rising, because it lifts from the ground. V05 already gates that refloat by the rung.
- Magic none wanes islands everywhere because "magic is the resource that keeps it aloft" (II.6). Keeping the standalone exemption would be inconsistent now that 115 couples magic and islands.

**The economy clause after creation.** It is effectively constant, because the priority is creation-only (D114-9).

### D115-7. The author's own islands (J-A115.47)

**Decision.**
- A T5 `sky` declaration under a failing magic or economy clause is allowed, with the fate `held against its magic` or `held against its economy`. This mirrors J-V5.10's `held against its supply`.
- The rung stays absolute.
- A dossier-stated `none` refuses the declaration.
- A locked island holds.

**Reasons.**
- Item 101 R2 and R13: everything is editable and a declaration is held.
- The owner's rule speaks of what generation allows.

### D115-8. Migration (J-A115.48)

**Decision.** The schema chain changes no behaviour: the economy reads 50 and the magic stays as stored.
- An older document replays unchanged at its own output version.
- An `upgrade` re-imposes each island the new gate no longer raises as a held declaration, listed in the diff. The user may drop it there.

**Reason.**
- §7.5's precedent: an orphaned lock re-imposes its last geometry as a drawn constraint.
- Without the re-imposition, every older standalone document with islands would lose them at upgrade, since its default magic is none and its economy reads 50.

**Rejected.** A schema step that sets the magic to high and the economy to 75. That changes lights, arcane classes and the other readers of those values, and the schema chain may not change behaviour.

### D115-9. With 114 (J-A115.49)

**Decision.** An economy the gate admits, 75 or more, is above the table's last knot at 50. So an island town's ceiling is the top band, whole, forever: the ceiling never falls below the founding's row.

**Consequences.**
- A held island in a capped town reads its carried bands at or below the ceiling.
- An institution island reads its `requirementBand` at the ceiling.
- The economy clause reads the slider, never the field or `S_town`.

### D115-10. The census effect (stated as intended)

**Fact.** Every census dossier sits at economy 50, which fails the economy clause. Of the 35 births, 32 carry medium, which reads as low and fails the magic clause.

**Consequence.** No SettlementForge dossier at default sliders gets islands at its first generation. That is the rarity the owner asks for.

**How the fixtures get islands.** Fixtures must set `high` and 75 or more.

---

## Gaps found (independent of the choices; each noted for the unit named)

1. **`EpochInputs.wealthLevel`.** The landed pipeline text lacks it (read-base C4), although DR6, §6.2 and V06 §3.3.5 cite it, and BCR-V6-9 requests it. Item 114 (e) depends on it.
   - The pipeline late seat writes it (item 114 (e) says so).
   - V06 wires it.
2. **DR7 and household band shares.** DR7 lists `wealth.label`, but no S2 or §10.2 rule shifts the household band shares by the wealth word. §4.2 S2 shifts them only by the town-level character, while V07 §3.2 (3) says "shifted by the intent's wealth level".
   - So T73-7 (the mean band within one band of the word) likely fails for Poor or Wealthy births today.
   - This is not item 114's to fix. The fold applies after whatever S2's shift is, and T114-5 bars only that the ceiling never breaks T73-7 where it passes uncapped.
   - Flag: pipeline (§4.2 S2, §10.2) and V07.
3. **`Recipe` and the `layers` field.** `Recipe` has no `layers` field, although `recipe.layers.islands` is named everywhere; presumably it is a `params` path. Items 114 and 115 do not change that path.
   - Flag: model (§2.9).
4. **`DistrictIntent.wealth` is unwired in the base.** V01's hood uses it. Item 114 makes it read `economyPriority ÷ 100` when absent, standalone (V01).
5. **V07 contradiction.** V07 §1 ("no island reaches a village rung") contradicts V07 §3.12 and V06 §3.2. Item 115's units line assigns the fix to V07.
6. **Missing message row.** V05 §3.2 (5)'s supply sentence has no V09 message row. Item 115 gives it one, `info.islandsNone`.
7. **The clerk and `QuarterInput.sky`.** V10 has no `QuarterInput.sky`, so the clerk can declare an island only through raw events. Items 114 and 115 do not need it: the dry run's fates apply to raw events too.
   - Flag V10 for its own rewrite; do not make it a new owner-rule part.
8. **The B-CITY `wealthLevel` sweep.** The sweep (§13.2, S13 l.224) sets `wealthLevel` explicitly. With the economy left at its default 50, it is unchanged. T114-3 adds the Economy sweep beside it.

## Cross-unit notes (for the late seats and the parallel editors)

- **DR numbering.** No new DR row is minted; DR6, DR7 and DR27 are extended. Item 116 (materials, drafted in parallel under `work/g116/`) may mint DR41, and items 114 and 115 claim no DR number.
- **Receipt row F-V8-8.** It is minted by V08 for a changed settlement economy priority, and the base's §7.7 item 13 only names it. If item 116 also mints an F-V8 row, V08 numbers them in filing order: 114 first.
- **Shared names.** Every name below is pinned in the items and appears nowhere else yet: a grep over the base section files, the twelve volumes and the amendments files finds each 0 times (receipt `tmp/names-check.txt`). The one collision it found, "ceiling band", is renamed (Terms, below). V05's existing piece name `skyGate` (its gate result) is kept; `SkyGate` is that result's record type.
  - Fields and types: `Intent.economyPriority`, `FieldBands.ceiling {at, by}`, `BandSet.ceiling` rows, `DossierDigest.settlement.economyPriority`, the optional `DossierDigest.site.magic?`, `IslandRule.gate {magic, economyMin}`, `SkyGate` and `SkyGateClause`, `FieldDrivers.ceiling`, `IntendInput.economy` and `IntendInput.islands`.
  - Notes, receipts and fates: `economy_absent`, `economy_clamped`, `magic_absent`, `creation_only`, F-V8-8, `held above the prosperity ceiling`, `held against its magic`, `held against its economy`.
  - Report reasons: `gated: rung|magic|economy`.
  - Messages and buttons: `info.ceiling`, `bend.fill.ceiling`, `button.economyUp`, `info.islandsGated`, `refuse.islandsDossier`, `refuse.islandsNoMagic`, `info.islandsNone`, `button.magicHigh`, `button.economyHigh`.
- **Terms.**
  - "economy priority" is the value and "Economy" is the control.
  - "prosperity ceiling" is `at` and "highest allowed band" is ⌈at⌉. The base already says "ceiling band" for item 72's range end ("the floor and ceiling bands", §2.5 `bandRange`; "the ceiling band's upper cut", §4.5 (8)), so the map-wide band takes a different name and "ceiling band" alone keeps meaning the range's end (grep receipt `tmp/names-check.txt`).
  - "economy dial" (item 72) and "economy slice" (`CircumstanceSlice.economy`) are unchanged and distinct from all of the above.
- **Tests.** T114-1 – T114-13 and T115-1 – T115-9 are §13.2's (scope). Volumes extend their own bars (V05's T-V5-1, V08's T-V8 set, and others) without new ids from these items.

## Facts relied on, with labels (from read-sf; SettlementForge's source is not in this container)

**C (confirmed):**
- The five priority sliders, 0–100, default 50, in `config` (`dossier-model.md:90`).
- `_config` is secret (`dossier-seam.md` C-8).
- `magicLevel` is derived at step 1, with vocabulary none, low, moderate→medium, high. It is medium in 152 of 155 dossiers and low in 3.
- The census was generated at the default sliders (`dossier-outputs.md:67-68`).
- Births never reach Wealthy, which comes only after lit ticks.
- No simulator writer of the sliders was found.
- A same seed keeps the same id; a new seed means a new id.

**N (not established):**
- SettlementForge's slider UI labels.
- Any banding SettlementForge applies to a slider value.
- How `magicLevel` is resolved.
- The `_randomizePriorities` distribution.
- Whether `priorityEconomy` moves prosperity.

No decision above rests on an N fact. Each N fact is named where it would otherwise matter: D114-2 (label), D114-5 (banding), D115-1 (resolution) and D114-13 (distribution).
