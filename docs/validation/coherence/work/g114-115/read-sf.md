# Reader sf — SettlementForge's economy and magic sliders, for owner rules 114 and 115

Working note of the g114-115 seat (reader `sf`), 2026-09-30. It reports facts and their homes; it decides nothing. The
item writers decide.

**Where the facts come from.** SettlementForge's source is not in this container. It is on the owner's machine at
`/Users/cstokes/Desktop/settlement-engine`. Every SettlementForge fact below is relayed from the surveys in `research/sf/`.
They read and executed branch `fp/integration-2026-09-23` @ `5d699cc68` (`research/sf/dossier-model.md:7`,
`research/sf/dossier-generation.md:175-190`). The cited file:line of a SettlementForge source file (for example
`settlementSlice.js:871–882`) is the survey's own citation.

**Labels.** **C**: confirmed by a survey's reading, execution or census. **P**: plausible, an inference, marked as mine
or as the survey's. **N**: not established by any survey. The surveys never read that fact, and nothing in this
repository states it.

Files read in full for this note: `research/sf/dossier-model.md`, `research/sf/dossier-generation.md`,
`research/sf/mapping.md`. Read by whole section:
- `research/sf/mapping-verify.md` §0, method, §B and the V1 and V50 entries.
- `research/sf/dossier-seam.md` §2, §3, §4 (lines 149–292) and C-8 (398–414).
- `research/sf/dossier-outputs.md` §1.2, §3.1, §3.4, §3.5.
- `research/sf/PLAN.md` §2.6's ignore list (262–290).
- `docs/volumes/V08-settlementforge.md`: §0, §1, §1b, §2.1, §2.4–§2.6, §3.2–§3.6, §3.9–§3.11, J-V8.45/.47 and BCR-V8-25, plus a whole-file search (§7 below).
- The coherence base's `determinism/03-s7-editing.md`: §7.7 item 1, layer 1, items 9–12 and the derivation table.
- `scope/07-s14.md`: `DossierDigest` and the port duties.
- `pipeline/01-s4-generation-pipeline.md` S0 circumstances; `pipeline/09-ii6-staged-layers.md`, the island rule.
- `docs/volumes/V05-sky.md` §3.2–§3.4 and §4.4.
- `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md` (whole) and `docs/PROGRESS.md:180-181` (J121, J122).

Grep receipts are in `tmp/`: `sf-grep1.txt`, `gen-grep.txt`, `mapping-grep.txt`, `verify-grep.txt`, `magic-all.txt`,
`v08-grep.txt`, `v08-config.txt`, `v08-regen.txt`, `outputs-grep.txt` and `other-slider.txt`.

---

## 1. The five priority sliders: what they are, where they live

| fact | label | source |
|---|---|---|
| The wizard's raw settings include **five priority sliders**, `priorityEconomy`, `priorityMilitary`, `priorityReligion`, `priorityCriminal` and `priorityMagic`, beside `magicExists`, `settType`, `tradeRouteAccess`, `terrainOverride`, `culture`, `monsterThreat`, the stress choices, `customName`, `faith` and the resource choices. | C | `dossier-generation.md:249-254` (SF `resolveConfig.js`, `resolveResources.js`) |
| **Range 0–100, default 50** (all five). | C | `dossier-model.md:90` ("`priorityEconomy/Military/Religion/Criminal/Magic` (0–100, default 50)") |
| The store adds **`_randomizePriorities`** to the config it passes, beside the four toggle maps and `_importedNeighbor`. So SettlementForge can roll the sliders. | C (the key); P (that it rolls the five values) | `dossier-generation.md:255-256` (SF `settlementSlice.js:871–882`) |
| **UI labels** of the sliders (the words beside them, any low / high captions) | **N** | no survey read SF's wizard component. `dossier-model.md:27-43` and `dossier-generation.md:103-155` list what was read, and no UI file is among them |
| **Any banding SettlementForge applies to a slider value** (cuts turning 0–100 into words) | **N** for the five priorities | none of the surveys states a cut. The only banded magic word is `magicLevel` (§2) |
| **Resolved home 1: `config`.** The resolved snapshot carries all five `priority*` values: 23 keys in the working-tree city, 30 on the branch. | C | `dossier-model.md:90`; `dossier-outputs.md:93` (30 keys, 138/138) |
| **Raw home: `_config`**, the raw user inputs with the `'random'` sentinels intact. It is the regeneration input: "Regeneration reads `_config`, never `config`, so emergent facts never re-enter as user intent". | C | `dossier-model.md:90`; `dossier-generation.md:257-260` (SF `assembleSettlement.js:110–122`; `DERIVED_CONFIG_KEYS`, `settlementSlice.js:177`) |
| **Resolved home 2: `economicState.priorities{economy, military, religion, magic, criminal}`.** Whether it always equals `config.priority*` is not stated. `resolveConfig` "floors a plagued town's military priority", so at least one resolved value can differ from the raw one. | C (the key); P (which copy holds the floored value) | `dossier-model.md:138`; `dossier-generation.md:380` |
| **`_config` is secret** on every shared or gallery surface of SettlementForge. The resolved `config` is not on the denylist; the denylist tokens include `seed` and `_config`. | C | `dossier-seam.md:402-406` (C-8; SF `publicSafe.js`) |
| The 155 census dossiers were generated **without setting any slider**. Their configs are `{settType, culture, terrainOverride, tradeRouteAccess, monsterThreat}`, rotated, so every census slider sits at its default. The three sample cards are the exception: they carry "real wizard dials that appear in no other sample". | C | `dossier-outputs.md:67-68`; `:44` |
| No simulator writer of `config.priority*` or `config.magicLevel` was reported. The world pulse's live fields are population, tier, the food-security stock fields, the disaster score, the factions' live state and relationship types. The `config` writers after birth that were found are all different keys: tier shifts (`config.tier/settType`), resource dynamics (`config.nearbyResources*`, `resourceEdits`) and events (authored records). | C (the lists); P (that the sliders therefore stay at their birth values in lived dossiers) | `dossier-model.md:53`; `dossier-generation.md:746`, `:750`, `:314-320` |

## 2. Magic: `magicExists`, `magicLevel`, `noMagic`, `priorityMagic`

| fact | label | source |
|---|---|---|
| `magicExists` is a raw wizard setting. | C | `dossier-generation.md:252` |
| `magicLevel` is a **derived** resolved key. It is written into `config` beside `tier`, `terrainType`, `stressTypes` and `latentPantheon`. | C | `dossier-generation.md:257-258` |
| Step 1 `resolveConfig` **provides** `magicLevel` and `noMagic` (plus tier, population, terrain, culture, threat…). Its role reads "decides … magic". | C | `dossier-generation.md:380` |
| `magicLevel` vocabulary: `none`, `low`, `moderate`→`medium` (an alias), `high`. It was read in SF's own config-space script. | C | `dossier-model.md:90` |
| Census: `magicLevel` is **`medium` in 152 of 155** generated dossiers and **`low` in 3**. `none` and `high` exist in the vocabulary but appear in no census dossier. V08's own census: medium in 32 of the 35 births, low 3. | C | `mapping.md:110` (row 12); `V08-settlementforge.md:953-954`, `:3205` |
| **How `magicLevel` is resolved** (from `priorityMagic` bands? from `magicExists`? from culture or tier?) | **N** | no survey quotes `resolveConfig`'s magic branch |
| (P, mine) The three `low` dossiers lie inside the 35 "births". The 120-dossier soak is all `medium` (155 − 35 = 120; 152 − 32 = 120). The 35 births are the 18-town tier set, 3 sample cards, 12 culture towns, a neighbour town and a custom-content town. **Hypothesis A:** the 3 `low` are the 3 sample cards, the only configs with real wizard dials. Then `magicLevel` follows a wizard input, plausibly `priorityMagic` banded with 50 → `medium` (and `magicExists` false → `none`). **Hypothesis B:** the 3 are culture towns whose culture resolves low. The census cannot separate the two. | P / N | `dossier-outputs.md:44`, `:67-68`; `mapping.md:33` |
| `noMagic` is a pipeline context value from `resolveConfig`. No survey lists it as a stored dossier key. | C (context) / N (stored) | `dossier-generation.md:380`; `dossier-model.md:48`, `:90` |
| Generation's immutable "world law", `buildGenerationContext` (branch), "decides eligibility once — does magic function, may maritime-only institutions appear — from config, tier, route, terrain, culture and content profile; no randomness". | C | `dossier-generation.md:441-443` |
| SettlementForge's own derived map profile reads `config.magicLevel`, `config.priorityMagic` and `config.magicExists`. This is a derived read; our port never reads it. | C | `dossier-seam.md:176-178`; base `03-s7-editing.md:1586` |
| Branch config key `_magicTradeOnly`. | C (the key); N (its meaning) | `dossier-model.md:97` |

## 3. What SettlementForge's generation does with the sliders (the outputs they move)

| output | what the surveys show | label | source |
|---|---|---|---|
| **Institutions** | Every catalogue definition and every instance carries **`priorityCategory`**: "the institution's generation-priority bucket (adventuring, crafts, criminal, defense, economy, entertainment, exotic, government, infrastructure, magic, military, religion)". Census over the births: economy 433, crafts 410, infrastructure 155, government 147, religion 107, military 101, criminal 71, entertainment 60, adventuring 47, magic 26, exotic 8, defense 1, absent 2. That the sliders weight the institution rolls by this bucket is the surveys' reading (J-M5). The step that rolls institutions, `assembleInstitutions`, was read by header and metadata only. | C (the field); P (the weighting) | `dossier-model.md:112-113`; `V08-settlementforge.md:683-684`; `docs/volumes/critique/V08.md:658-660`; `dossier-generation.md:119-123`, `:384` |
| **Income shares** | `incomeSources[] {source, percentage, desc, weight, priorityNote}` carries a **`priorityNote`**. That the priorities move the weights is P. | C (the field); P | `dossier-model.md:138` |
| **Effective strengths** | `economicState.compound {criminalEffective, militaryEffective, economyOutput, religionInfluence, magicInfluence, raw{…}, inst{33 has*}}` looks like the priorities (raw) combined with the roster (inst). `src/generators/priorityHelpers.js:56-57` computes `hasWalls` and `hasGates`, the compound's inst flags. | C (fields, file); P (the formula) | `dossier-model.md:138`; `mapping-verify.md:272` (V19) |
| **The priorities themselves** | stored as `economicState.priorities` (§1) | C | `dossier-model.md:138` |
| **Prosperity** (`economicState.prosperity`) | Set by `generateEconomy` ("prosperity band") and re-derived on the final roster by `economyReconcilePass`. **Whether `priorityEconomy` moves it: N.** At the default slider (every census dossier) birth prosperity spans **Struggling 11, Poor 42, Moderate 25, Comfortable 36, Prosperous 41; Wealthy 0**. "Wealthy only after lit ticks". So at the default economy slider SettlementForge's own births top out at **Prosperous**. (P, mine: consistent with a birth ceiling below Wealthy at slider 50; the value at slider 100 is N.) Per tier (120-dossier soak): metropolis Prosperous 10, Poor 6, Comfortable 3, Moderate 1; city Prosperous 8, Poor 5, Comfortable 4, Struggling 2; town Comfortable 7, Poor 6, Prosperous 5, Moderate 1. | C (the census); N (the slider's effect) | `dossier-generation.md:389`, `:393`; `mapping.md:155` (row 42); `mapping-verify.md:276` (V23); `dossier-outputs.md:155` |
| **economicViability** | `{viable, issues[], warnings[], dependencies[], suggestions[], plotHooks[], summary, metrics{foodBalance{…, magicFoodOffset}, tradeAccess, …}}`. It is a generation-time snapshot verdict. Whether the sliders move it: N. | C (shape) / N | `dossier-model.md:144`, `:56` |
| **Magical institutions and services** | Catalogue category `Magic` (204 records in the census); branch definition key **`magicLicense`**, plausibly the world law's gate on magical kinds; the services bucket `magic`; the pseudo-provider `(arcane underground)`. | C (fields); P (the gate) | `dossier-model.md:112`, `:121`, `:143`; `mapping.md:139` (row 31), `:166` (row 53) |
| Other magic-shaped outputs | power category `magic` (46 powers); NPC role category `magic`; food security `magicTradeChannel` and `magicSupplement`; `defenseProfile.scores.magical`, `magicDependency`, `traditions{hasArcane, hasArcaneGuild, hasDivine, hasDruid, hasAlchemy}`, `institutions.magicDef[]`; `isolationSupport.status` `magic_supported` or `magic_dependent` and the path `magical_transit` (real, 0 of 155 seen); the chain status `magically_sustained` (10 chains); chain notes `magicNote` and `magicRecovery`; income rows Spellcasting Services (42 dossiers) and Arcane Industry (12), with `Magical ley lines` named by the line's income data but absent from the 35 births; the history event type `magical`; the deposit `magical_node`; the Mages' Quarter by the name test `Wizard\|Mage\|Magic`; derived causal `magical_stability`, capacity `magical`, threat `arcane_instability` | C | `dossier-model.md:101`, `:125`, `:140`, `:142`, `:160`, `:180`, `:182`, `:190`, `:97`; `mapping.md:174` (row 56), `:159` (row 46), `:322` (T13), `:197` (row 69), `:254` (T5); `mapping-verify.md:275` (V22); `V08-settlementforge.md:836-838` |
| Neighbour | An imported neighbour's `neighborRelationship` carries `economicStrength 0.65` and `militaryStrength 0.5`. Whether these read the neighbour's priorities: N. | C / N | `dossier-outputs.md:166` |

## 4. Dossier fields that already say how rich the place is (what rule 114 must agree with)

**SettlementForge's side.**
- `economicState.prosperity`, the one settlement-wide wealth word on a seven-step ladder: Subsistence (internal, "remapped to Struggling/Poor before emission"), Struggling, Poor, Moderate, Comfortable, Prosperous, Wealthy. It is sometimes stored as an object with `tier` (C). Sources: `dossier-model.md:91`; `dossier-generation.md:431-432`, `:749`; `mapping-verify.md:276`.
- Prosperity is **dossier-live, not frozen**. It steps one band a year under the lit preset (Comfortable → Prosperous → Wealthy; the upswing, generosity and entrepôt movers), and no event handler writes it (C). Sources: `dossier-generation.md:749`, `:849-850`; `mapping-verify.md:389-391` (V53).
- No per-district or per-household wealth is stored. SettlementForge's district `wealth` (destitute…opulent) is derived on read, "category baseline ± settlement prosperity", and is never an input for us (C). Sources: `dossier-model.md:91`, `:105`, `:192`; `mapping.md:126` (row 23).
- Also rich-shaped, and all never-read or unmapped today: `incomeSources[]` (read, as sector shares), `publicLegitimacy.breakdown.prosperity`, `compound.economyOutput`, `economicViability`, `situationDesc`, `economicComplexity`, `treasury.coin` (dark), `isEntrepot` (read) and the impairment type `wealth` (C). Sources: `dossier-model.md:92`, `:138`, `:144`; `mapping.md:156`, `:158`, `:167`.

**Our side (where the design already reads wealth).**
- `DossierDigest.wealth.label`, "the dossier's seven-step prosperity word". It is the one wealth field of the digest. Source: `scope/07-s14.md:247`.
- V08 §2.6 `wealth` row (`tables/dossier/wealth`) → `Intent.wealthLevel` and a band:
  - Subsistence 0.05 squalid; Struggling 0.2 poor; Poor 0.35 poor; Moderate 0.5 modest;
  - Comfortable 0.65 comfortable; Prosperous 0.8 prosperous; Wealthy 0.95 rich; else Moderate.
  - Sources: `V08-settlementforge.md:828-830`; research T12, `mapping.md:306-307`.
- DR6: the prosperity field and each plot's band. It reads `wealth.label` → `intent.wealthLevel`, and over epochs the changed word as `EpochInputs.wealthLevel` (F9). **Its bar: "the population-weighted mean band within one band of the wealth row's band".** Source: `determinism/03-s7-editing.md:1746`. DR29 repeats the bar with the sun term on (`:1769`); T73-7 and T-V8-22 test it.
- Layer 1: `wealthLevel ∈ [0, 1]` → `field.characterOffset = lerp(−0.3, +0.3)`, the join bonus and `greenery.parkPer1000`; item 71's class mix reads `wealthLevel`. For a dossier map the port fills `wealthLevel` from the prosperity word. It is a map fact and stays editable. Sources: `determinism/03-s7-editing.md:1401-1404`, `:1412-1413`, `:1474`; `V08-settlementforge.md:2450-2452` (host mode locks population and tier word only; "the map facts the port derived (the wealth level, the density) stay editable").
- Our standalone control is already called the **wealth slider**: `T1 intend` "drag the wealth slider". Sources: `scope/07-s14.md:421`; `determinism/03-s7-editing.md:2006`. The owner's "economy slider" is SettlementForge's `priorityEconomy`, a different control.
- The islands' supplies read the field's absolute value (`S_town`, `S_carried`). So any ceiling on the field also caps `h_town`. Sources: `V05-sky.md:875-904`; `pipeline/09-ii6-staged-layers.md:59-72`.

**Consequences the item must reconcile** (P, mine; facts cited).
1. A ceiling derived from `priorityEconomy` that falls below the band of `wealth.label` would break DR6's bar and item 20 (h) (iii). The dossier's word is the truth; the slider is a generation input. So wherever the two disagree, the ceiling has to give way to the label.
2. SettlementForge's own births at the default slider reach Prosperous (41 of 155) and never Wealthy (§3). A default-slider ceiling at the `prosperous` band (value 0.8) agrees with every census birth; one at `comfortable` would contradict 41 of them.
3. Prosperity is live: the lit preset lifts cities to Wealthy within a year. "At generation time the first generation" therefore reads naturally as a creation-time bound, not a cap on later epochs. Otherwise a lived Wealthy label would meet a birth ceiling under it (`dossier-generation.md:849-850`).

## 5. Dossier fields that already say how magical the place is (what rule 115 must agree with)

- `config.magicLevel` → `DossierDigest.site.magic` (`scope/07-s14.md:244`) through V08 §2.6's **`magic` row**. Source: `V08-settlementforge.md:952-954`.
  - The row: `none` → `none`; `low` → `low`; **`medium` → `low`**; `high` → `high`; else `none`, noted.
  - J-V8.47 (`V08-settlementforge.md:2813`): medium reads as low "because 32 of the 35 births carry `medium` and D-3's realism floor keeps magic present but not shaping the town unless the dossier says `high`".
  - So on our side **`high` is already the one value that "shapes the town"**. Rule 115's "high magic" meets an existing word. It is `site.magic = 'high'`, which the census never shows.
- The circumstance: `magic: 'none'|'low'|'high'`, "'none' by default, a fantasy toggle under D-3". Source: `pipeline/01-s4-generation-pipeline.md:220-221`. `CircumstanceSlice.magic` is read by II.6, item 68's lights and item 109 (f) (`V08-settlementforge.md:361`).
- **The islands' present gate:** `recipe.layers.islands = 'on'`; the rung CITY or METROPOLIS; not a parity preset; and, for a dossier-bound document, the `magic` circumstance **is not `none`**.
  - Sources: V05 §3.2 (1), `V05-sky.md:839-843`; `skyGate`, `:353`.
  - Base `determinism/03-s7-editing.md:1802-1803`: "Where the dossier's `site.magic` resolves `none`, the islands setting is refused (DR27; V05 §4.4)".
  - DR27's inputs list `wealth.label` (DR6) and `site.magic` (`:1767`). DR-SKY is at `V05-sky.md:2168-2185`.
  - **Rule 115 turns this gate at creation from `≠ none` into `= high` AND a high economy.** Every current dossier is `medium`, which maps to `low` and passes today; under the new gate it would yield no island at birth.
- The **node term**: a `magical_node` deposit in `site.deposits`, `available` (or `discovered` from the next epoch), adds `node.bonus` (0.25) to `h_town`, and only where `h_town > 0`. Sources: `V05-sky.md:891-903`; `pipeline/09-ii6-staged-layers.md:68-72`; the deposit row, `V08-settlementforge.md:783-785`.
  - It is the second dossier statement of magic on the site.
  - It is also ruin evidence (`node`), as are `Magical ley lines` (`leyLines`) and a `magical` history event (`magicalHistory`). Source: `V08-settlementforge.md:1014-1016`.
- `magical_transit` isolation path → a `teleport_circle` use; J-V8.48. Sources: `V08-settlementforge.md:967-971`, `:2814`.
- The `magic` power category → `Faction.kind` `arcane`. Source: `V08-settlementforge.md:851`.
- The `magic` income sector (Spellcasting Services, Arcane Industry, Magical ley lines). Source: `V08-settlementforge.md:836-838`.
- The `magically_sustained` chain status → `sustained`. Source: `V08-settlementforge.md:975`.
- The island institution rows' `requires.magic` (`'low'|'high'`), for example `tower` "`magic` low or high". Sources: `V05-sky.md:644`, `:701`.
- The access rows' `magic` cell: no stair or bridge of light where `magic` is `none`. Sources: `V05-sky.md:649`, `:2427`.

## 6. Mapping rows 12 and 54, J-M5, the never-read list, and whether the reasoning holds for a ceiling and a gate

- **Row 12:** `config.magicLevel` → "II.6's island supply law (item 10: magic is a supplied resource); none → no islands", with "word → a supply multiplier". Tier D. Source: `mapping.md:110`. The design took the gate half; V05 §3.2 reads `none` as the gate, and no supply multiplier by magic level was adopted (§5).
- **Row 54:** `economicViability`, `economicComplexity`, `situationDesc`, `institutionalServices[]`, `treasury.coin` and **the `config.priority*` sliders** → "none: the sliders are SF's generation inputs whose effect already sits in the institutions and the income shares — reading both would count them twice". Ignored. Source: `mapping.md:167`.
- **J-M5:** "SF's `config.priority*` sliders are not read | over: reading them as a character vector | because: their effect is already in the institutions and the income shares; reading both counts it twice". Source: `mapping.md:706`.
  - The plan adopted it (`PLAN.md:281`) and it became candidate amendment 86 (`docs/AMENDMENTS-2026-09-27d.md:444`, `:449`, `:453-454`).
  - The verify lane never checked row 54's slider claim against source. V25 checked only the row's name joins (`mapping-verify.md:278`).
- **The base's never-read list**, §7.7 item 1 (item 86; J-A86.71), `determinism/03-s7-editing.md:1584-1604`. It names:
  - "its generation sliders (`config.priority*`)";
  - "`_config` (raw inputs; the resolved `config` is read)";
  - "the host's own verdicts (… `economicViability`)".
  - Its reason: "the sliders' effect already sits in the institutions and the income shares, so reading them would count it twice" (`:1602-1603`).
  - The adapter drops these keys into `DossierDigest.ignored` with an `ignored_key` note (`scope/07-s14.md:263`, `:329-330`; `V08-settlementforge.md:1502-1503`, `:1543`). §3.5 step 9: "`_seed` and `_config` go no further" (`V08-settlementforge.md:1555`).
  - An offer whose only differences are keys on the list returns `unchanged` (`V08-settlementforge.md:1423-1425`).
- **V08 repeats it:**
  - "nothing on §7.7 item 1's never-read list is read (T-V8-20's ignore clause)" (`:353`);
  - J-V8.45 keeps `priorityCategory` apart from "the never-read generation sliders (`config.priority*`, §7.7 item 1), which are settlement-wide weights whose effect already sits in the institution list" (`:2811`);
  - BCR-V8-25: "The never-read sliders (`config.priority*`) stay unread" (`:3132-3133`);
  - mapping row 8's "`_config` only for the raw culture word" (`mapping.md:101`) is already overruled by §7.7 item 1.

**Does J-M5's reasoning hold for a CEILING and a GATE?** (P, the reader's analysis.)
- J-M5 is about **weights**. Reading `priorityEconomy` as an extra amplifier of economic classes, beside the institutions and income shares it already shaped, would count its effect twice. That reasoning still holds, and the three other sliders stay never-read for it.
- A **ceiling** (an upper bound on prosperity at creation) and a **gate** (a yes or no on islands) add no weight to anything. They constrain an outcome the institutions and income shares do not express: our field's top, and the islands' existence. Neither the institutions nor the prosperity word state that bound. So J-M5's double-count argument does not reach them.
- What does reach them is item 20 (h) (iii), coherence. A bound read from a slider must never contradict a dossier fact the slider already produced: the prosperity word (DR6's bar, §4) and the `magicLevel` word (§5).
- The owner's words are the authority over the program's J-M5. The item therefore narrows §7.7 item 1 rather than J-M5's reasoning. `config.priorityEconomy`, and `config.priorityMagic` only if the item reads the slider rather than `magicLevel`, come off the never-read list for these bound uses only, with a stated reason.
- `_config` stays never-read. It holds raw sentinels (`'random'`), and SettlementForge itself keeps it secret (§1).

## 7. `docs/volumes/V08-settlementforge.md`, searched whole

Receipts: `tmp/v08-grep.txt` (87 hits for priorit, slider, economy, magic, prosper, ceiling, island, ignore-list, ignored, wealth), `tmp/v08-config.txt` (26 `config` / `_config` hits) and `tmp/v08-regen.txt`.
- **priority / slider:**
  - `:190`, the political role `priorityCategory`, item 103;
  - `:683-684`, `DossierInstitution.role` = `priorityCategory`;
  - `:2811`, J-V8.45: sliders never read;
  - `:3132-3133`, BCR-V8-25: "The never-read sliders (`config.priority*`) stay unread".
  - No passage reads `priorityEconomy` or `priorityMagic`. The word "slider" appears only through §7.8's controls.
- **config / _config:**
  - `:361`, `magicLevel` → `site.magic`;
  - `:647-654`, `requiredKeys` include `_config`, `config` and `economicViability`, "several of them on §7.7 item 1's never-read list: required for recognition, never read";
  - `:1555`, `_seed` and `_config` go no further;
  - the resource keys `config.nearbyResources*` (`:1532`, via deposits) and `nearbyResourceDefinitions` (`:283`).
- **economy:**
  - `economy.chains`, `.dependencies` and `.goods` (`:304`, `:355-357`, `:700-707`, `:1535-1539`, `:1597`);
  - the income shares into the economy slice (`:1575`);
  - epochs read the end state of the economy slice (`:1755-1756`; J-V8.25 `:2791`);
  - the `sectors` row (`:831-841`).
  - No reading of `priorityEconomy`, `economicState.priorities`, `compound` or `economicViability`.
- **magic:**
  - the `magic` row (`:952-954`), J-V8.47 (`:2813`) and the census (`:3205`);
  - the `magical_node` deposit (`:783-785`), the ruin evidence (`:697`, `:1014-1016`, `:1028`, `:1973`, `:1991`);
  - `magical_transit` (`:968`; J-V8.48 `:2814`), `magically_sustained` (`:975`);
  - the custom library's `magical?: boolean` (`:1235`, `:1265`);
  - the `magic` income sector (`:836-837`), the power category `magic` → `arcane` (`:851`).
  - No magic reading gates islands; that is V05's and the base's.
- **prosperity / wealth:**
  - the `wealth` row (`:828-830`);
  - item 102's bar, "sunlight never pushes a dossier map outside its wealth row" (`:188`);
  - host mode keeps the wealth level editable (`:2450-2452`);
  - thematic rows keyed by `prosperity` (`:3052`).
- **ceiling:** no hit.
- **island:** the slot mechanism shared with islands (`:2244`; X8 `:3446`; IN-V08-2 `:3480-3483`). Nothing on the island gate.
- **ignore-list:** `optionalKeys` `read: false` → `ignored_key` (`:617`, `:660`, `:1502-1503`); never-read keys dropped (`:1543`); `ignored_key` stays in the host's report only (J-V8.102 `:2868`); the ignore clause is T-V8-20 (`:353`); unknown keys (`:2641`, T-V8-31).

V08 has no seat for either rule today. The creation half (§3.3 `:1443-1449`), `digest` step 6 (`:1528-1545`) and the `magic` and `wealth` rows are where the port side of 114 and 115 would land.

## 8. A re-generation in SettlementForge with new slider values: a new dossier, or a change to the same one?

**Facts.**
1. SettlementForge emits **no change event and no change stream**. Every change reaches a consumer as a **whole new dossier** (C).
   - Sources: `dossier-generation.md:56-61`, `:904-909`; branch `:1032-1035`; `mapping.md:595-598`.
   - Our port diffs each whole dossier against its carried facts (`determinism/03-s7-editing.md:1567-1576`).
2. Whether the whole dossier is "the same settlement" is decided by its **`id`** (C):
   - `s_` + 16 hex, a hash of `_seed`;
   - stable across reload, a **same-seed** regeneration and section rerolls;
   - **a new seed is a new `id`**;
   - normalize stamps an `id` only when it is absent.
   - Sources: `dossier-model.md:64`, `:207`; `mapping-verify.md:113-125` (V1, SF `normalizeSettlement.js:63-79`, `:190-192`), `:374` (V50).
3. SettlementForge's regeneration paths (C, with one N):
   - (a) The store's `generateSettlement` passes `seedOverride || eng.generateSeed()`, so a **fresh seed unless one is passed**, and records `lastSeed`. Source: `dossier-generation.md:242-243` (SF `settlementSlice.js:886,974`). On the branch it moved to `store/settlementGenerateAction.js` (`generateSettlementAction(set, get, seedOverride, …)`), "its post-pipeline body was not re-read" (`:462-464`).
   - (b) A **full reroll from `_config` with the same seed** keeps the authored overlays. The regeneration modes `nudge`, `rebalance` and `reforge` hold "hard anchors `_seed, id, name, tier`" (`dossier-generation.md:552-554`; `mapping-verify.md:120-121`, SF `regenerationMode.js:52`). "Whether the store's full-reroll path applies these modes was not traced (searched)" — **N** (`dossier-generation.md:553-554`).
   - (c) Section rerolls (`npcs`, `history`) mint a fresh **section** seed, return it as `_regenSeed`, keep the settlement `id` and are draft only (`dossier-generation.md:485-487`, `:548-551`).
   - (d) Edit mode (branch, built) re-derives with the DM's facts pinned (`settlementRederiveAction` → `dmLayer.rederive`). `dmLayer` keeps "`worldFacts` by config key" (design text) (`dossier-generation.md:625`, `:682-683`). Whether the priority sliders are editable world facts is **N**; `edit/fieldDeclarations.js`' 19 rows were not enumerated (`dossier-model.md:174`).
   - (e) Regeneration is a **draft** operation. A canon settlement changes through events and decrees, and only canon campaign members tick (`dossier-generation.md:535-537`, `:548`, `:614-621`, `:701-704`).
   - **Which path SettlementForge's wizard takes when a user changes a slider on an existing settlement and generates again (same seed or a new one): N.**
4. **What our port does today** (C, design text):
   - **Same `id`** → an absorb: the content change, "a full reroll included — is processed as dossier changes by least disruption, reported over budget when it is" (J-M11, `mapping.md:537-544`, `:712`; F21 `:643`; `PLAN.md:274`, `:350`). Details:
     - institutions that vanish → `remove` with fate `vanished` (`V08-settlementforge.md:1567`);
     - notables re-bound by equal name and role (`:1570`, `:1985-1988`; J-V8.76);
     - B12 reports the absorb as over budget (`:1922`).
   - **New `id`** → "a new dossier and a new map" (key law, `determinism/03-s7-editing.md:1812`; J-M11). The host's `MapRecord.settlementKey` is immutable (`V08-settlementforge.md:401`). A new-id dossier offered against an old record is refused `E_OTHER_SETTLEMENT` → held; "this row catches a host bug" (`:1566`, `:1916`).
   - The prosperity word's change on a same-id absorb is F9 → the next epoch's `wealthLevel` (`:1746`). A slider change on a same-id absorb is **invisible to the port today**: the sliders are never read, not carried, and a dossier differing only in never-read keys returns `unchanged` (`V08-settlementforge.md:1423-1425`).
5. **For the item** (P, the reader's). "At generation time the first generation" meets two SettlementForge facts:
   - a new-seed generation is a new `id`, hence a new map whose creation reads the new sliders;
   - a same-seed regeneration is the same `id`, processed as changes.
   - The item must say whether a same-`id` dossier whose `config.priorityEconomy` changed re-sets the ceiling. That would make the slider a carried fact with a diff row and an F-row: epoch or none.
   - It must also say whether the value is read at creation only. Then it is stored in the document, not re-read.
   - The owner's "first generation" reads most naturally as the creation half only. Wiring it both ways then needs one carried fact (the creation-time slider value) or a recipe field, so replay never needs the host.
   - Either way the edge "same save, new seed" is the host's: a new `id` means a new map, and the old record is a host matter (B15).

## 9. What the item must pin, from the SettlementForge side (the reader's list; each is a decision for the writers)

1. **The reading of "high magic".**
   - (a) `config.magicLevel === 'high'`, which is `site.magic === 'high'` through the existing `magic` row. It is SettlementForge's own resolved word, J121-consistent, and needs no threshold of ours.
   - (b) `config.priorityMagic` above a cut.
   - (a) fits the owner's "high magic" and V08's word set. (b) fits the word "slider" literally. The link between the two is **N** (§2, hypotheses A and B).
   - Whichever it is, one home, one term: J-V8.47's `medium` → `low` stays and only `high` qualifies. No census dossier is `high`, so a test fixture must set it.
2. **The reading of "high economy" and "the economy slider".**
   - The home is `config.priorityEconomy`, the resolved value, 0–100, default 50. `_config` stays never-read. `economicState.priorities.economy` is a second copy; name one.
   - SettlementForge has no resolved economy word (no `economyLevel` in any survey). So "high" needs a cut. J121 prefers SettlementForge's own banding, which is **N**.
   - If the item adopts hypothesis A (magic banded from its slider), the same cuts serve both sliders: one banding, one term.
3. **The ceiling's unit and its floor.** A band of our six (`squalid`…`rich`) or a value on the field.
   - Its lower limit must be the `wealth.label` row's band, or the label's band plus one, under DR6's ±1 bar (§4).
   - Its default at slider 50 must admit Prosperous: SettlementForge's own births reach it and never Wealthy.
   - It also caps `S_town` and `h_town` (V05 §3.3), so rules 114 and 115 interact through the field.
4. **Creation only, or carried.** See §8 (5). Both need lifecycle rows: create (the port's creation half), read (S0's intent or the island gate), persist (a recipe or carried fact), regenerate, undo (dossier events are never undo targets), migrate (older documents without the field).
5. **Absent inputs.** Standalone maps have no SettlementForge slider; our own control is the **wealth slider** (`wealthLevel`), a different term. A hand-made or older-line dossier may lack `priorityEconomy` or `magicLevel`. The fallback needs a rung of §5's ladder: the SettlementForge default 50 is the emulation-first value for a missing slider, and `magicLevel` missing reads `none` by the `magic` row's "else".
6. **The never-read list edit.** §7.7 item 1 (`determinism/03-s7-editing.md:1587-1588`, `:1602-1603`), the `DossierDigest` fields (`scope/07-s14.md:244-247`), V08 §2.4's `keyList` and J-V8.45's and BCR-V8-25's "stay unread" sentences (`V08-settlementforge.md:2811`, `:3132-3133`) all change together. `priorityMilitary`, `priorityReligion` and `priorityCriminal` stay never-read under J-M5.
7. **The island gate text** at every home: V05 §3.2 (1) (`V05-sky.md:839-843`), `skyGate` (`:353`), DR-SKY / DR27 (`:2168`; `determinism/03-s7-editing.md:1767`, `:1802-1803`), II.6 (1)–(3) (`pipeline/09-ii6-staged-layers.md:45-72`). A new report reason beside `gated: dossier magic` is needed for the economy half.
