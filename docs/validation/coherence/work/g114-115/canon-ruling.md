## Ruling 2026-09-30 — late owner rules 114 and 115: routing, homes and tests

**Basis.** OWNER RULE items 114 (the economy slider sets the map's prosperity ceiling at the first generation) and 115
(floating islands at the first generation need both high magic and a high economy) were filed in
`docs/AMENDMENTS-2026-09-28g.md` after this canon was built. The owner ruled (2026-09-30 ~00:56): "bundle these into the
rewrite phase". So every unit the items name applies its part IN the Rewrite phase at build depth. The units whose
rewrite had landed when the items were filed — the base parts model, kernel, pipeline, determinism and rendering, and
the volumes V03 and V04 — do so in a late rewrite seat (`coherence/rewrite-<unit>-late`) where they have a part; every
other unit does so in its main rewrite. The items are owner rules and sit at the top of this canon's precedence
(*Precedence and home rules*): where they change standing base or volume text, the item wins and the unit named below
rewrites that text. Each item's closing part ((k) of 114, (h) of 115) is the unit list; this ruling fixes the one
canonical home of every shared decision, so the parallel editors state each once and cite it everywhere else. The
routing twin is `work/g114-115/routing.json`; the settlement of the three reviews is `work/g114-115/final-notes.md`.

**Seats.** Late seats: **model, pipeline, determinism, rendering**. No part, no seat: **kernel, V03, V04** (V04's
underground and undercity are banded through II.7's `FieldBands` reads, which the pipeline caps; its wealth-level lines
are the dossier's stored level and an explicit-level test; V03's rooms follow the occupants' band). Main rewrite:
**scope, V01, V02, V05, V06, V07, V08, V09, V10, V11, V12**.

### Canonical homes of the shared decisions

| decision | home (STATES) | cited by (REFERENCES) |
|---|---|---|
| `Intent.economyPriority?` (0–100, absent 50); `wealthLevel` optional; "the wealth level in force" and its layer 1 derivation row; Surprise me's draw | determinism §7.7 layer 1 | pipeline §4.2 S0, §4.7 S10b (2), II.7.1; V01, V05, V07, V10, V12 |
| the one-click default (Economy 50, wealth level derived 0.5; Magic None) | scope §1.2 | pipeline II.7.1; determinism §7.8 |
| the Economy's and the Magic's registry rows (ids `intent.economyPriority`, `circumstances.magic`), the basic panel's "Economy", the advanced Wealth level and Follow the Economy, the Islands control's states | determinism §7.8 | V09 (screens, words), V05 §4.1, V10 |
| the prosperity ceiling whole: `ceilingAt`, the wealth lift, the fold and the demand split, the cuts and the fixed-cut rule, the continuous reads, the band-range rule, the precedence and held bands, the forced seat, the record's writing rule, the table's default rows, parity entries and limits | pipeline §4.5 | every volume that reads bands; V11 row 6 (registers the cell) |
| `BandSet` (declared), `BandCeilingRow`, `FieldBands.ceiling?` | model §2.5 | pipeline §4.5, V11 |
| the settlement's own facts gaining the economy priority at creation; the creation slice's magic word beside the typed slices; `recipe.layers.islands` = `Recipe.params['layers.islands']` | model §2.8, §2.9 | determinism §7.7 items 9, 11; V05, V10 |
| dossier ownership keyed to the creation's absorb; item 9's facts; item 11's refusals (the Economy's adjust; a declared island in a dossier-stated magic-less world; the setting's refusal withdrawn) | determinism §7.7 items 9, 11 | V08, V09, V10 |
| §7.7 item 1's never-read list narrowed ("… but `priorityEconomy`, read once at creation (item 114)") | determinism §7.7 item 1 | V08 (J-V8.45, BCR-V8-25, T-V8-20) |
| DR6, DR7, DR9 and DR27 gaining `settlement.economyPriority`; DR8's wealth level in force; DR6's and DR27's bars | determinism's derivation table | V05 §4.4, V08 |
| the epoch: the position in the prelude, the cut rewrite, `EpochInputs.wealthLevel?`, history-first and refounding | pipeline §4.11 | V06 (build), V08 (F9) |
| the island gate's clauses and order, the parity clause dropped, forced slots, the count after the gate, what rises and what stands, the wane under magic `none` in force, the access conversion, the destruction fall | pipeline II.6 (and S7b (5), §4.11) | V05, V06, V07 |
| `IslandRule.gate` cells and their defaults (`['high']`, 75) | V05 §2.4 | II.6, V11 row 56 (registers the cells and stamp) |
| `SkyGate`, `skyGate(...)` and its callers; the report entry's args | V05 §3.2 (1) | II.6, determinism §7.8, V09, V10 |
| `ReportCode` `islands_gated` | determinism §5.4 | V05, V06, V09 |
| §5.3's coherence rows (no band above the highest allowed band but a held entity; no rule-driven rising under a closed gate) | determinism §5.3 | — |
| fates `held_above_ceiling`, `held_against_magic`, `held_against_economy`, `held_against_supply` as `EditFate { fate: 'kept', reason }` | determinism §7.4 | pipeline §4.5, V05 §4.2, V09 (`fate.held.*`) |
| `DossierDigest.settlement.economyPriority?`, `site.magic?`; `PortNote.kind` gaining `value_absent`, `value_clamped`, `frozen_fact_changed` | scope §14 | V08 |
| the adapter rows (`config.priorityEconomy`; the `magic` row with `moderate → low`), the carried facts, the diff rows writing `frozen_fact_changed` (W-DOS-08), §4.6's note rows, §2.7's lifecycle rows | V08 | scope §14, determinism §7.7 |
| every V09 key of the two items (the list below) | V09 | V05, V06, V10 |
| `IntendInput.economy?`, `IntendInput.islands?`, the lexicon rows, §4.1's encoder rows, `FieldDrivers.ceiling?` | V10 | pipeline §4.5 (`drivers()` fills it), V09 |
| `EpochReport.islandsGated` | V06 | determinism §5.4 |
| `Level.intent.economyPriority?`, `Level.magic?`, the derived fixture forms `'<dossier>@economy<e>'`, `'<dossier>@magic<word>'`; §1's owner-rule list (the rules, never their rows or 75) | V12 | scope §13.2, V05, V08 |
| the Wealth key's closing line ("Richest here: {band}") | rendering §8.2 | V09 §5.4 |
| the tests T114-1 – T114-14, T115-1 – T115-10 and the island bars' fixture rule | scope §13.2 | every unit's own bars |

### Per unit — what each STATES and what it only REFERENCES

* **model (late seat).** STATES §2.5's `BandSet` declaration (`bands` with `share`, `ftgTier`, `mfcgClass`; `blend`;
  `ceiling: BandCeilingRow[]`), `BandCeilingRow`, `FieldBands.ceiling?: { at; by }`; §2.8's dossier-paths list ("its
  name, tier word, population and economy priority at creation"; "the creation slice's magic word where the dossier
  supplied it" beside the typed slices); §2.9's note that `recipe.layers.islands` is `Recipe.params['layers.islands']`.
  REFERENCES §4.5, §7.7, II.6, V05. No `factTier` rule is added (it is per entity; these facts sit on no entity).
* **kernel.** No part.
* **pipeline (late seat).** STATES §4.5's prosperity ceiling whole (the homes table's row) with `drivers()` filling
  `FieldDrivers.ceiling`; §4.2 S0's and §4.7 S10b (2)'s "the wealth level in force"; S2's fold and demand split; S5d's
  folded cuts; §10.2's rows read by 114 (c) 4 and EP-18's limits; II.7.1's "derived from the Economy, 0.5 at its
  default 50"; §4.11's epoch sentences and `EpochInputs.wealthLevel?` (BCR-V6-9's field); II.6's gate, what rises and
  what stands, the access conversion and the destruction fall; S7b (5)'s forced and rule-driven slots. REFERENCES
  II.7.3 and II.7.5 (their banding caps), PART III (V07's fold), V05 §2.4 (the cells), V05 §3.2 (1) (`skyGate`).
* **determinism (late seat).** STATES §7.7 layer 1 (the economy priority, the optional wealth level, the wealth level in
  force, Surprise me, the exception to "the filled values are map facts"), layer 2's `Recipe.params['layers.islands']`,
  items 1, 9 and 11 as the homes table gives them, the derivation table's DR6, DR7, DR8, DR9 and DR27; §7.1's
  early-parameter list, edit-target row (`FieldBands.ceiling` derived), T1 binding row (the Magic) and T5 `quarter`'s
  held-band sugar; §7.4's adjust row (the Economy from S0, Follow the Economy, the Magic from S2) and `quarter` row's
  held fates; §7.5's rows (economy absent 50; stored wealth level kept; `FieldBands.ceiling` absent none;
  `BandSet.ceiling` absent `{ 0, <top> }`; `site.magic?`; the island upgrade by state); §7.6's `ceiling` cell with its
  parity entries; §7.8's rows and states; §5.3's two rows; §5.4's `islands_gated`; §6.2's recorded inputs. REFERENCES
  §4.5, II.6, V05, V08.
* **rendering (late seat).** STATES §8.2's Wealth key closing line where `FieldBands.ceiling` is present. REFERENCES
  V09. Nothing for 115 (§8.4's view toggle unchanged).
* **scope (main rewrite).** STATES §13.2's T114-1 – T114-14, T115-1 – T115-10 and the island bars' fixture rule; §14's
  digest fields, port duties, `PortNote.kind` additions and T1 row ("drag the Economy slider"); §1.2's defaults; D-3's
  sentence (islands at the first generation — and, by the program's reading of item 115, at every later rising — only
  with high magic and an economy of 75 or more); §0.2's rows 114 (principal home §4.5) and 115 (principal home II.6);
  the judgment index's J-A114.41 – J-A114.55 and J-A115.41 – J-A115.51 (their titles are `final-notes.md` §5); §16's
  placement (the Economy and the prosperity ceiling at M2b with the prosperity field and its band set; the gate at
  M6-sky; the port's reading at M-SF). REFERENCES §1.1.
* **V01.** STATES the hood's Economy, the cards (great houses 90, slum 10), the shanty condition read as the wealth level
  in force, the manor quota at 0 below `prosperous`. REFERENCES §4.5 (the fixed-cut rule, the ranges). Nothing for 115.
* **V02.** REFERENCES 114 (c) 4 at §3.2 step 3 in one sentence. Nothing for 115.
* **V03, V04.** No part.
* **V05 (principal build home of 115).** STATES everything of 115 the homes table gives V05, §0's plain words, the §1b
  row, §2.6's lifecycle row, §3.2 (1), (3), (4), (5), §3.15 (4), (5), §4.1, §4.2's declaring rule and fates, §4.4 (DR27's
  inputs; the absorb wane withdrawn), §4.5's why, J-V5.10 and J-V5.19 (the item's pinned text), T-V5-1 extended, §8's P0
  run with the gate held; and, for 114, that its `S_town` fallback reads the wealth level in force. REFERENCES II.6,
  114 (c) 3–4, 115 (e).
* **V06.** STATES the prelude's computation of the prosperity ceiling, the cut rewrite at row 4, BCR-V6-9's field as the
  lift's input, start small and the replay under it, the gate at `sky.islands`' raise and settled refloat,
  `EpochReport.islandsGated`, the time card unchanged, its bars. REFERENCES §4.11, II.6, V05.
* **V07.** STATES the fold on `bandShares`, the forced manor's rows, T1's Economy on the village, DR6 at village rungs,
  and §1's out-of-scope sentence rewritten (resolving its contradiction with §3.12 and V06 §3.2). REFERENCES §4.5.
* **V08.** STATES the homes table's V08 rows, J-V8.45 and BCR-V8-25 restated, the host frame (Economy and Magic locked
  where supplied, the wealth level editable), the census effects, T-V8-20's ignore clause citing T114-5, T114-7, T114-11.
  REFERENCES §14, §7.7, W-DOS-02, T115-2.
* **V09.** STATES the Economy and Magic controls (the Magic in "Programme"), the Islands control's states, and every key
  of the two items. REFERENCES §7.8, V05.
* **V10.** STATES the homes table's V10 row and the why answers naming the prosperity ceiling and the gate's clauses.
  REFERENCES §4.5, V05.
* **V11.** STATES row 6's `ceiling` cell (provenance `own`, `calibratable: false`, parity entries) and row 56's `gate`
  cells (`gate.magic` stamped `ownerRule: '115'`, `economyMin` own and not calibratable) with their compiler bars
  (T-V11-2), and that §3.5's `magicGate` for classes stays `≠ 'none'`. REFERENCES §4.5, V05 §2.4.
* **V12.** STATES the homes table's V12 row, the rule that a level setting `wealthLevel` explicitly keeps the economy at
  its default, the register's entries, M6-sky's seeds with the gate held. REFERENCES §13.2, V05.

### Standing text the items replace (each unit named rewrites it; nothing else changes)

J-V5.19 (replaced by 115 (d) 5's pinned text); V05 §3.2 (1)'s parity clause (dropped) and its dossier-only clause
"magic not `none`" (subsumed); V05 §4.4's wane at a later dossier `none` (withdrawn: the site is creation's, W-DOS-08);
V05 §4.2's "the gate … must hold" (declarations judged by the rung and a dossier-stated `none` only); §7.7 item 11's
"Where the dossier's `site.magic` resolves `none`, the islands setting is refused" (withdrawn); §7.7 item 1's
"generation sliders (`config.priority*`)" (narrowed); layer 1's "the filled values are map facts" (excepted for the
economy priority the creation supplied); T1's "wealth slider" and §7.8's basic-panel "wealth level" (the Economy);
II.7.1's "default 0.5" (derived from the Economy); V07 §1's "no island reaches a village rung" (rewritten); V08 §2.6's
`magic` row's "else none, noted" (an absent or unmapped word carries no `site.magic`).

### Tests and their owning unit

| test ids | owning unit | extended by (no new ids) |
|---|---|---|
| T114-1 – T114-14 | scope (§13.2) | V01 (T114-9's hood), V06 (T114-8, T114-12), V07 (T114-9's village), V08 (T-V8-20's clause; T114-5 via V12's fixtures), V10 (T-V10-10 under the prosperity ceiling), V11 (T-V11-2's `ceiling` limits), V12 (the register and the derived fixtures) |
| T115-1 – T115-10 | scope (§13.2) | V05 (T-V5-1 extended; the fixture rule on T-V5-2, T-V5-15, T-V5-18 and P0), V06 (T-V6-66 with the gate held), V08 (T115-2), V09 (T115-6's messages), V10 (T115-9), V11 (T-V11-2's `gate` limits), V12 (M6-sky seeds) |

Every id and name the items pin is new in `docs/` and `research/` but `frozen_fact_changed`, which is W-DOS-08's routed
note, reused on purpose (receipt `work/g114-115/tmp/f-names-check.txt`); item 116 uses T116-n. Neither item mints a DR row or a receipt row (F-V8-*).

### Canon items the ruling touches

- **W-DOS-08** (V08): its `site` row and note `frozen_fact_changed` now also carry the magic word, and the settlement diff
  row writes the same note for the economy priority; the note's args are `field`, `was`, `now`; its kind joins §14's
  `PortNote.kind` union (scope).
- **W-DOS-02** (V08): its `wealth` diff row (F9 → `EpochInputs.wealthLevel`) is the lived wealth that lifts the
  prosperity ceiling after the first generation (114 (e)).
- **Item 116** (filed with these two): it reads "item 114's highest allowed band"; under 114 (c) 4 its `means.top`
  reads band `c`'s continuous row, `lerp(hi_{c−1}, hi_c, f)`, for the three items' cross-consistency check.
