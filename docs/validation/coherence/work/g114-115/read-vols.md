# READER vols: where owner rules 114 and 115 touch the twelve volumes

Working notes for filing OWNER RULE items 114 and 115 in `docs/AMENDMENTS-2026-09-28g.md`. This file writes no rule. It
records what the live volumes say today and what each rule makes a volume add or change. It also lists the shared
decisions the item has to pin, so that the parallel Rewrite editors apply the rules the same way.

**The rules.** These are the owner's words, typos kept (2026-09-30 ~00:50–01:00 EDT):

- **114:** "one thing i wanted to add, at generation time the first generation, teh economy slider determines the
  cieling prosperity for the entire map".
- **115:** first "and only high magic on the slider allows for floating islands in the initial generation.", then
  "actually floating islands has to have both high magic and high economy".
- Then: "bundle these into the rewrite phase".

**Sources.** The live volumes `docs/volumes/V01-…V12-*.md` as they stand on 2026-09-30. No volume rewrite has landed yet:
`docs/validation/coherence/new/` holds only `base/` and `index/`. For the base I cite the coherence files only where a
volume leans on them. `determinism/03-s7-editing.md` l.1746 is DR6 and l.1767 is DR27 (= the volumes' DR-SKY, IN-V05-3).
`pipeline/10-ii7-sewer-layer.md` l.170 is `undergroundOffset`. The sibling note `read-base.md` covers the base in depth.
The SettlementForge facts come from `research/sf/dossier-model.md` l.90–91 and `dossier-generation.md` l.250–258 and
l.380, and from `mapping.md` rows 12 and 54 and J-M5 (l.110, l.167, l.706).

**Method.** For each volume I first grepped the whole file (the hit lists are in `tmp/vols-*-hits*.txt`,
`tmp/vols-V05-gate.txt` and `tmp/vols-V05-heads.txt`). Then I read the whole subsection around every hit. Citations
take the form `Vnn §x (l.N)`; the line numbers are from the live files as read.

**What SettlementForge gives, in brief.**

- Five priority sliders `config.priorityEconomy/Military/Religion/Criminal/Magic`, each 0–100 with default 50. They
  are CONFIRMED in `dossier-model.md` l.90.
- The toggle `magicExists`.
- The resolved word `config.magicLevel` ∈ none, low, `medium`, high. `medium` appears on 32 of the 35 births.
- The output `economicState.prosperity`, a seven-step label from Subsistence to Wealthy.
- The survey records **no UI labels or "high" thresholds for the sliders**. That gap is flagged in D2 and D3 below.

---

## 0. The reading choices the volumes force (the item must pin each; each is cited per volume below)

Every choice below is a place where two volumes would otherwise diverge. Each line gives the evidence and a
recommendation. The owner's words stay the authority; the recommendation is only my advice.

- **D1: Is "ceiling" a band or a value?**
  - **The problem.** §4.5's `FieldBands` cuts are per-town quantiles set from the roster's household shares
    (`read-base.md` l.125–131). Clamping the field value alone would re-quantile the cuts, so every band would still
    exist and "rich" would still appear in a poor town.
  - **Evidence that bands are the level that matters.** Every volume that reads wealth reads BANDS:
    - V01 manor quota `rich` 0.12 (V01 §3.5.2 l.1343–1347);
    - V02 composition rows `<class>/<band>` (V02 §3.2 l.910–941);
    - V05 `S_carried = v(b)` and the island gradient per band (V05 §3.3 l.887–889, §3.11 l.1257–1262);
    - V07 `bandShares` (V07 §2.2 l.677);
    - V08's `wealth` row, which maps a label to a band (V08 §2.6 l.828–830).
  - **Recommendation.** The ceiling is a **band** of the band set, the "ceiling band". It acts in two places:
    1. At S2's household band shares: no household above it. The shares above it fold into it, and the cuts follow
       by construction.
    2. On the field's absolute value, clamped once to `[0, upper cut of the ceiling band]`. Where the ceiling band is
       the top band, that is 1, and the rule is a no-op.
- **D2: What is "the economy slider"?**
  - **Standalone today.** The standalone app has one T1 "wealth slider" = `Intent.wealthLevel` ∈ [0, 1] (V09 §4.5
    l.1566; BCR-V9-2 l.3806–3810). V07 §4.1 l.2954 and V01 §4.2 l.2618–2622 show the same slider as `intent.wealth`.
    V10's `IntendInput.wealth` is 0–1 (V10 §2.12 l.925).
  - **Dossier today.** A dossier fills `wealthLevel` from `economicState.prosperity` by DR6 (V08 §2.6 l.828).
    `config.priorityEconomy` sits on §7.7 item 1's never-read list (V08 §1b l.353; BCR-V8-25 l.3133; J-V8.45 l.2811;
    J-M5).
  - **What J121 says.** "Follow SettlementForge": SettlementForge's economy slider is `priorityEconomy` (0–100,
    default 50).
  - **The choice.**
    - **(a)** T1's slider IS the economy slider. Standalone, it is relabelled and ranged as SettlementForge's. With a
      dossier, the ceiling is read from `config.priorityEconomy`. That takes `priorityEconomy` off the never-read list
      and reverses J-M5 for that one key. J-M5's double-count objection does not apply to a cap: a cap drives no term.
    - **(b)** A new, separate economy field beside `wealthLevel`, with a second slider.
  - **Recommendation.** (a), because one term per concept holds.
  - **Either way, pin these:**
    - the field name and its home: an `Intent` field, or `CircumstanceSlice.economy`;
    - its range and default, as SettlementForge's: 0–100 and 50;
    - its label, which has to come from SettlementForge's own UI — the survey does not record it;
    - the **slider → ceiling band** table, with its rows;
    - the **"high economy"** threshold.
  - **A possible bridge.** The table could reuse V08's `wealth` label → band row: slider → a SettlementForge prosperity
    label → a band. That keeps one mapping.
- **D3: What is "high magic"?**
  - **Today.** On a dossier, `site.magic` comes from `config.magicLevel` by V08's `magic` row: none→none, low→low,
    **medium→low**, high→high (V08 §2.6 l.952–954; J-V8.47 l.2813). Standalone, `CircumstanceSlice.magic` ∈
    none | low | high is an S0 circumstance. V10 sets it (`IntendInput.magic`, V10 §2.12 l.926; lexicon l.1431 "magic,
    wizards, fantasy · high magic → low · high"). **V09 has no magic control at all**: its T1 row l.1566 lists none.
  - **Recommendation.** "High magic" = the `magic` circumstance `high`.
    - On a dossier, that is `site.magic = 'high'`, i.e. SettlementForge's `magicLevel: 'high'`. It is already read and
      mapped, so no new key is needed. Whether `magicLevel` itself buckets `priorityMagic` is SettlementForge's own
      business (PLAUSIBLE). Recording it as PLAUSIBLE avoids a clean-room issue.
    - Standalone, T1 gains the magic control ("on the slider" per the owner). Its form (a three-step chip or
      SettlementForge's 0–100 slider bucketed into none, low and high), its label and its default (`none`, D-3) must
      be pinned.
- **D4: Is 115 a gate or a trigger?**
  - **Evidence.** The owner's word is "allows". Islands keep their own switch `recipe.layers.islands`, off by default
    (D-3; V05 §3.1 l.824–826).
  - **Recommendation.** A gate. Two conjuncts join V05 §3.2 (1): magic high AND economy high. The switch, the rung and
    the parity clauses stand.
- **D5: When does the ceiling bind?** ("at generation time the first generation")
  - **Options.**
    - **(i)** Only at creation and at every re-derivation of the recipe (Re-derive, New random, a T1 `adjust` of the
      slider). Epochs are uncapped.
    - **(ii)** At creation, and after it the ceiling follows the economy value in force at every field evaluation,
      epochs included.
  - **Evidence against (i).** It lets a V06 "start small" history (§3.3.3 l.1138–1142) and an item-113 replay (a
      history generated as its past) escape the ceiling. Both are "the first generation" in the owner's sense, since
      item 113 says the replay is "part of the generation".
  - **Recommendation.** (ii). The ceiling is a function of the economy value in force:
    - the creation's slider sets it;
    - a T1 `adjust` or an `EpochInputs` economy change moves it;
    - the item-113 replay holds it at every replayed epoch. So no remnant exceeds it in prosperity; only geometry
      built under it survives.
  - **An alternative for the owner.** A hand prosperity brush may exceed the ceiling as a declared edit, with a listed
    fate. That fits "everything editable".
- **D6: Does the island gate bind after generation?** ("in the initial generation")
  - **Where islands can arise after creation:**
    - an epoch's empty-slot re-open and `raiseIsland` (V5 §3.15 (5) l.1425–1435);
    - a "start small" town that grows into a CITY (V06 §3.3.3);
    - the item-113 replay;
    - a hand T5 `sky` declaration (V5 §4.2 l.2057–2066).
  - **Recommendation.** The gate reads the magic and economy values in force whenever a RULE raises an island: at
    generation, in the replay, and at every epoch's step (5). An island already standing never vanishes by the gate.
    It follows the supply law, waning and falling as today (item 22: "they wane, never vanish").
  - **A hand declaration** where magic or economy is not high is allowed, with a fate "held against its magic / its
    economy". That mirrors J-V5.10's `held against its supply`. The exception is a bound dossier whose `site.magic` is
    `none`, which stays refused `dossier-owned` (J-V5.19).
- **D7: Must the ceiling at "high economy" admit the top band?**
  - **Why it matters.** At high economy, prosperity islands carry the richest bands (`h_carried(v(b)) > 0`, V5 §3.4 (2)
    l.922). The palace row's `requirementBand` is `rich` (V5 §2.4 l.698).
  - **Recommendation.** Pin a constraint: every economy value that passes 115's economy clause has the top band as its
    ceiling band. Otherwise an institution island's uniform `v(requirementBand)` (V5 §3.11 l.1243) would exceed the
    map's ceiling, and prosperity islands would carry "nothing".
- **D8: A term clash.** "Ceiling" already names item 72 (d‴)'s per-district band range `[floor, ceiling]` (V01 §3.5.2
  l.1343; V02 §3.2 l.940–941; `read-base.md` A5, A9).
  - **Recommendation.** Give the map-wide concept a distinct name, for example "the economy ceiling" or
    `FieldBands.ceilingBand`, and pin the rule every district's band range lies at or below the map's ceiling band.
- **D9: Parity presets and the default town.**
  - **The facts.** MFCG and FTG hold islands off (V5 §3.2 (1) l.840), so the gate is moot there. The ceiling is not
    moot: at SettlementForge's default of 50, if the ceiling band is below the top band, the default one-click town
    loses its `rich` households.
  - **What that would move:** T13-1's realism golden (V5 §3.1 l.826); V01 manor blocks; V02's `rich` rows; V07's
    VILLAGE `rich` 0.03.
  - **Pin both:**
    - the default's ceiling band (a no-op pin at the default is the emulation-first reading);
    - the parity presets' ceiling — the top band there, as item 23 treats `extension` cells, or else a declared shift.
- **D10: The dossier conflict.** DR6's totality bar reads "the population-weighted mean band within one band of the
  wealth row's band" (DR6, base 03-s7-editing.md l.1746; V08 T73-7). A low `priorityEconomy` with a high
  `prosperity` label ("Wealthy") could put the ceiling below the label's band, and the bar would fail.
  - **Recommendation.** Pin that the ceiling band is never below the band DR6 derives from the dossier's own
    `prosperity`. The dossier is truth (item 20 (h)).
- **D11: Names the parallel editors must share.** None of these exist today.
  - the gate's two new report values (candidates `gated: magic`, `gated: economy`), beside V5 §3.2's `islands: off`,
    `gated: rung` and `gated: dossier magic` (l.842–843);
  - the fate words `held against its magic` and `held against its economy`;
  - the V09 message keys: `refuse.islandsRung` exists (V09 §4.9 l.1738), so candidates are `bend.islandsMagic`,
    `bend.islandsEconomy`, `info.islandsNone`;
  - the ceiling's clerk driver term, in the `'ceiling'` entry of `FieldDrivers.terms` (V10 §2.13 l.1139);
  - the table homes: an `islands.json` gate cell, the slider→ceiling table, and the dossier row sets.
- **D12: The ceiling's no-op pin (a bar).** With the ceiling band at the top band, the field and the town are
  byte-identical to today's. This is the same form as item 102 (g)'s pin, and V12 and V05 need it.

---

## 1. V05 — the floating islands (`docs/volumes/V05-sky.md`)

### 1.1 What it says now

- **§0 (l.97–102, l.176–184)** *When there are islands.*
  - "Only cities and metropolises can have them, and only when the owner's fantasy setting for islands is switched on
    (it is off by default…). Even then it is a roll of the dice weighted by wealth: a poor city gets none, a middling
    one sometimes one, a rich one may get none, one, two or three."
  - l.183–184: "If you switch islands on and none appears, the map says why … the city is not rich enough to keep one
    aloft — and offers the two remedies: raise its wealth, or draw one yourself."
- **§1b wiring table (l.353).** The row `skyGate`:
  - fed by `recipe.layers.islands`, `RungProfile.layers.islands`, and DR-SKY's dossier `site.magic` row;
  - feeds S7b (5)'s slot draw, §7.8's control state, and the report.
  - l.356–358 list the node term and `S_town`'s producers. l.410 is DR-SKY's row.
- **§2.4 `IslandRule` (l.599–650).**
  - `rung: 'CITY'|'METROPOLIS'`; `chance: [0.6, 0.5, 0.35]`.
  - `townSupply` ⟨P0⟩ is (0.45, 0) (0.58, 0.5) (0.70, 1) on absolute field values. `carriedSupply` ⟨P0⟩ is (0.55, 0)
    (0.85, 1) (l.660–661).
  - `node.bonus` 0.25 (l.694).
  - **No gate cells.** The gate lives only in §3.2's prose.
  - `IslandInstitution.requires.magic?: ('low'|'high')[]`. The `tower` row requires "`magic` low or high" (l.701).
  - `SkyAccessRow.magic`: `hoist` none, low, high; `ropeway` none, low, high; `stair` low, high (weight 0.3 at `low`,
    0.4 at `high`); `lightBridge` high (l.714–719).
  - Institution requirement bands: palace `rich`; cathedral, prison and tower `prosperous` (l.698–701).
- **§2.6 lifecycle.** The rows for `supply` (l.772) and the node term (l.796). No row exists for any gate input.
- **§3.1 (l.824–826).** "Nothing of the sky runs on the one-click path: `recipe.layers.islands` is off by default (D-3)
  … the ground model is byte-identical to the realism golden (T13-1)."
- **§3.2 (l.837–873)** *Existence and count.*
  - (1) The gate: the setting on; rung `possible` (CITY, METROPOLIS); not a parity preset; "and, for a dossier-bound
    document, the circumstance `magic` … is not `none`". It reports `islands: off`, `gated: rung` or `gated: dossier
    magic`.
  - (3) Forced slots from declarations and assignments.
  - (4) `islands.count` `auto` or 0–3; a slot opens with probability `chance[k] · h_town`.
  - (5) The report sentence: "Islands are on, but the city is not prosperous enough to keep one aloft" / "… none rose
    this time", with its remedies "raise the town's wealth (T1 `intend`), or place an island by hand".
  - (6) Removed slots.
- **§3.3 (l.875–914)** *The two supplies.*
  - `S_town` is the mean absolute `P` over built land, "which the dials, `wealthLevel`'s character offset (§7.7 layer 1)
    and the epochs' drivers move". `S_carried` is from band values `v(b)`, with "the top band's upper cut 1".
  - `A = areaHaMax · h_carried · h_town`; `E = E_min + (E_max − E_min) · h_town`.
  - The node term acts only where the interpolated value is above 0 ("if there is no prosperity, there is no floating
    islands").
  - **Calibration ⟨P0⟩** runs "at `wealthLevel` ∈ {0, 0.25, 0.5, 0.75, 1} with the setting on", with bars on the
    median `h_town`. Its fallback is `S_town = 0.5 · field mean + 0.5 · w`.
- **§3.4 (l.916–942).** Institution candidates need `requires.magic` to admit "the recipe's `magic` circumstance", and
  `areaHaMax · h_carried(v(requirementBand)) · h_town ≥ 1.3 × areaHa`.
- **§3.5 (l.944–1034).** The fill takes "the richest eligible band" first.
- **§3.10 (3) (l.1174).** An access's kinds are "among the access rows admitted by the recipe's `magic` circumstance".
- **§3.11 (l.1241–1291).** `P_I(x) = smooth(Q(r(x)) + ε(x)) − w_sun · shadeSky(x) + brush(x)`, "clamped once to
  [0, 1]". Each carried band maps onto `[lo_j + ι, hi_j − ι]` with "the top band's upper cut 1". An institution island
  is uniform at `v(requirementBand)`.
- **§3.13 (l.1356).** "The `magic` circumstance gates no sky row" (J-V5.9).
- **§3.15 (l.1370–1467)** `IslandEpochStep`.
  - (1) A `none` rung makes the target 0. There is no magic or economy check at an epoch.
  - (5) "An empty slot re-opens with probability `(1 − (1 − redrawPerYear)^years) · chance[k] · h_town`", then
    `raiseIsland`.
  - (6) A downward rung crossing wanes every island.
- **§4.1 (l.1945).** T1 `intend`: "the islands setting (off / on) and the count (`auto`, 0–3)" →
  `adjust('layers.islands')` and `adjust('islands.count')`.
- **§4.2.**
  - Declaring (l.2057–2066): "the gate (V5 §3.2 (1)) and `h_town > 0` must hold — a declaration where the town cannot
    supply magic is allowed only with the fate `held against its supply` confirmed (J-V5.10)".
  - The accesses' `setAttr(kind)` is re-checked against `magic` (l.2071–2085).
- **§4.4 DR-SKY (l.2164–2184)**, numbered DR27 by IN-V05-3 (l.3645).
  - Its inputs are `wealth.label` (DR6 → `S_town`), `site.magic` ("the gate and the access kinds") and `site.deposits`.
  - "The setting itself is the map's declared choice, never a dossier path."
  - "where the dossier's `site.magic` resolves to `none`, turning the setting on is refused (F-EDIT `dossier-owned`) …
    a dossier change to `none` at an absorb makes every island's target 0 at the next epoch — they wane, never vanish".
- **§4.5 (l.2198).** The clerk's `why` on an island answers "with its gate, its slot's draw against `chance · h_town`,
  …".
- **§7 tests.**
  - T-V5-1 (l.2398–2400): the gate; TOWN and village rungs carry none; setting off = T13-1; MFCG/FTG none; a dossier
    whose magic is `none` refuses.
  - T-V5-2 (l.2401–2403): the count "at `wealthLevel` 0.5 and 1".
  - T-V5-3: the supply, P0.
  - T-V5-8 (l.2427): "no stair or bridge of light where `magic` is `none`".
  - T-V5-14 (l.2474): over time, T8-6.
  - T-V5-15 (l.2512): the goldens, "a CITY with a prosperity island …; a METROPOLIS with a palace island and a prison
    island".
  - T-V5-16 (l.2521–2524): a declaration where `h_town` = 0 carries `held against its supply`; "the dossier-magic
    refusal holds".
  - T-V5-18: budgets with three islands.
  - T-V5-25 (l.2608–2617): the node.
- **§9 decisions.**
  - J-V5.8: stairs and bridges of light only where the world has magic.
  - J-V5.9: lights ungated.
  - J-V5.10: "generation and epochs obey the supply law strictly while letting an author's declaration or lock hold an
    island against it … and to keep the rung gate absolute".
  - J-V5.13: empty slots redrawn at epochs.
  - J-V5.19 (l.2760): "to refuse the setting where a bound dossier's `site.magic` is `none`, and to keep the setting and
    the circumstance independent without a dossier, because … a standalone map's two toggles are the author's".
- **§10.**
  - BCR-V5-4 (l.2877–2893): II.6 rule (3) re-keyed.
  - BCR-V5-10 (l.2957–2980): the §7.8 layer control `islands.count`.
  - BCR-V5-12 (l.2992–2994): DR-SKY and "the refusal of the islands setting where the dossier's `site.magic` resolves
    `none`".
  - BCR-V5-14 (l.3016–3022): T15-1's fixture reworded to "whose built land lies wholly in the rich band".
  - BCR-V5-17: the node.
- **Integration notes.** IN-V05-1 (l.3639): "Every refusal … except the dossier-owned one (J-V5.19) … is a bend".

### 1.2 What 115 requires in V05 (V05 is the principal home of 115)

1. **§3.2 (1)'s gate gains two conjuncts**, read as D3 and D2 pin them:
   - magic `high`: on a dossier, `site.magic`; standalone, `CircumstanceSlice.magic`;
   - AND economy high: the pinned threshold on the economy value in force.
   - Two new report values (D11), and a `skyGate` result record carrying which clause failed.
   - §1b l.353's `skyGate` row adds the standalone magic circumstance and the economy value to "fed by". Today it names
     only the dossier's `site.magic`.
   - DR-SKY / DR27's inputs gain the economy source. That is either `config.priorityEconomy` or the port's economy
     digest field (D2).
   - The row's "the gate" now means magic `high`, not "not `none`".
   - DR27's totality bar gains "its magic and economy clauses resolved".
2. **J-V5.19 is replaced.** A standalone map's islands switch and magic are no longer independent: 115 couples them.
   **Recommended wording.** Keep the switch; the gate reads magic `high`.
   - A bound dossier's `none` stays refused `dossier-owned`.
   - A dossier `low` (SettlementForge `low` or `medium`) or standalone `low` or `none` is not a refusal but the gate's
     report plus a bend offer ("islands need high magic and a strong economy"), per IN-V05-1.
   - §4.4's coherence sentence and BCR-V5-12's refusal row are restated to match.
3. **§3.2 (5)'s sentence and §0 l.183–184.**
   - The "none appears" wording splits by cause: the gate names the clause that failed; the supply law keeps "not
     prosperous enough".
   - The remedies become: raise the economy (T1) to high; set magic to high (T1); draw one by hand (T5 `sky`, with its
     fate).
   - §0 l.97–102's "a middling one sometimes one" is wrong under 115 at generation: only a city whose economy is high
     gets a roll at all. Rewrite it in plain words.
4. **§3.15 at epochs (D6).** Step (5)'s re-open and `raiseIsland`, and a raise inside an item-113 replay, read the gate
   on the epoch's own magic and economy values. Step (1)'s standing islands stay under the supply law, never the gate.
   - **Pin the absorb edges.** A later magic change from `high` to `low` makes standing islands neither vanish nor wane
     by the gate. `none` on a dossier keeps §4.4's "target 0 at the next epoch" law.
   - **The lifecycle row this needs:** create at each evaluation; read by step (5); persist in the epoch report; regenerate by
     replay; undo with the epoch; migrate: older documents read the gate as satisfied for their standing islands.
5. **§4.2 declaring (l.2057).** "The gate (V5 §3.2 (1)) … must hold" now includes magic and economy. Per D6:
   - a hand declaration where either is not high is allowed with the fate `held against its magic` or `held against
     its economy` (D11), mirroring J-V5.10;
   - the rung stays absolute;
   - a dossier `site.magic` of `none` stays refused.
   - J-V5.10's text gains the two fates.
6. **Access kinds (§2.4 `SkyAccessRow.magic`, §3.10 (3), §4.2's `setAttr(kind)`, T-V5-8).**
   - At generation every island now exists under `high`, so every kind is admitted.
   - The `none` and `low` columns matter only for a held declaration (5) and after a later magic change. Keep the rows;
     state that edge.
   - Island lights (J-V5.9) are unchanged.
7. **§3.3 calibration ⟨P0⟩ and T-V5-2 and T-V5-3.**
   - The P0 levels `wealthLevel` ∈ {0 … 1} "with the setting on" measure `S_town` on every level. They must be run with
     114's ceiling in force, because the ceiling moves `S_town` at low economy.
   - The islands themselves exist only at levels that pass the economy clause.
   - T-V5-2's "at `wealthLevel` 0.5 and 1" must move to levels at and above the gate's threshold, with magic `high`.
     Otherwise it sees 0 islands at 0.5.
   - The fallback `S_town = 0.5 · field mean + 0.5 · w` names `w` = `wealthLevel`. Under D2 (a) it reads the economy
     value.
8. **Every fixture that has islands** must be generated with magic `high` and economy high: T-V5-4 … T-V5-32's "CITY
   seeds with islands", T-V5-15's two goldens, T-V5-18's three-island budgets, and the M6-sky P0 spikes (§8).
   - BCR-V5-14's T15-1 rewording ("built land wholly in the rich band") is consistent with D7. It must say the fixture
     sets magic `high` and the economy high.
9. **New bars (T-V5-1 extended).**
   - A CITY with the switch on and magic below `high` → 0 islands, reported by clause.
   - Magic `high` with economy below the threshold → 0 islands.
   - Both high → the supply law as today.
   - An epoch step (5) re-open under a failed gate draws nothing.
   - A held declaration carries its fate.
   - A dossier with `magicLevel: 'medium'` (→ `low`) gets no island at generation.
10. **The clerk's `why` (§4.5 l.2198)** names the gate's clauses: "high magic: yes/no; a strong economy: yes/no".

### 1.3 What 114 requires in V05

1. **§3.3 `S_town`** reads the field "on the absolute value … which the dials, `wealthLevel`'s character offset … move".
   Add: and which the economy ceiling caps (D1). Under D7 no island city is capped below the top band, so `S_town` at
   islands-possible levels is untouched; the P0 run must still be re-run with the ceiling (1.2 (7)).
2. **§3.11 `P_I`** "clamped once to [0, 1]", with "the top band's upper cut 1".
   - Restate it as clamped to `[0, upper cut of the ceiling band]` — one clamp, the same as the ground's.
   - The island brush and `setAttr(field.prosperity)` (§4.2 l.2029–2033) obey D5's hand-edit rule: bent to the
     ceiling with a line, or held with a fate.
   - An institution island's uniform `v(requirementBand)` is ≤ the ceiling by D7.
3. **§3.5 fill.** "The richest eligible band" is at most the ceiling band. With D7 this is automatic at generation. After
   an economy drop at an epoch, the carried households re-band like the ground's (V06), and an island whose `h_carried`
   falls wanes by the existing law.
4. **The "why" on a capped plot** is volume 10's `'ceiling'` term (see V10). V05's `drivers()` attribution (§4.5 l.2190)
   needs no change.

---

## 2. V06 — evolution (`docs/volumes/V06-evolution.md`)

### 2.1 What it says now

- **§1b.** W27 (l.434): `EpochInputs.wealthLevel` and the timeline entry's → "the field phase's layer-1 expansion
  (`field.characterOffset`)". l.498: "the prosperity word | `wealth.label` → `intent.wealthLevel` … | DR6 |
  `EpochInputs.wealthLevel` (BCR-V6-9)".
- **§2.2 (l.623).** `walls.prosperityMin` 0.40: "the town's household-weighted mean prosperity a new circuit needs".
- **§2.3 (l.689–722).** The `Trajectory` carries `wealthLevel?: { kind: 'hold' } | { kind: 'target'; target: number }`,
  default hold (l.697), and `slice?: Partial<CircumstanceSlice>` (magic among its fields). `advance` is refused on a
  dossier-bound document (J-V6.2).
- **§3.2 phase order (l.1024–1060).**
  - Row 1 `prelude`: "the slice and the wealth level installed (V6 §3.3)".
  - Row 4 `field`: S6 re-evaluates and re-bands.
  - Row 5 `afterField`: `sky.islands`.
  - The participants table (l.1055): `sky.islands` "whose conversions are **every island event an epoch can run**, at
    every rung where an island stands (TOWN's carried or declared islands included): a **raise** (`raiseIsland`, V05
    §3.15 (5) …)".
  - The feature set at an epoch (l.1076–1085): the TOWN sewer law reads "the epoch's population and wealth level".
- **§3.3 epoch inputs (l.1104–1152).**
  - §3.3.1: a dossier's wealth level is read, never invented.
  - §3.3.2 (l.1132): "the wealth level — `hold` keeps the current; `target` interpolates linearly in `f_i`".
  - §3.3.3 (l.1138–1142): **"start small"** — the document is created at the founding population and advanced; "The
    town that results is a history, not the one-click town at that size".
  - §3.3.5 (l.1149–1152): "`EpochInputs.wealthLevel` … when present and different from the level in force by more than
    `dial.hysteresis` (0.05) replaces it: layer 1's expansion rows … re-map `field.characterOffset` … before S6".
- **§3.4 (l.1196–1206).** Shade drift. Islands as casters and receivers.
- **§3.7.1 (l.1432–1437).** A new circuit needs mean prosperity ≥ `walls.prosperityMin`.
- **§3.8 (l.1599–1678).** Regrowth by band (descending); the ladder's schedule (§3.8.4); "(0) `relet` up in standing
  shells below their band row".
- **§3.19 (l.2586).** An elevated road's strength is "the mean of the prosperity field at `P1` and `P2` ×
  `landmarkFactor^n`".
- **§4.1 (l.2905–2937).** The time card in T1: "grow by a share, reach a population, decline, hold, follow the timeline",
  with a "more" pane (threat, era). **No wealth or economy control on the card.**
- **§7.** No test reads `EpochInputs.wealthLevel`. T-V6-66's sky fixture has "an island falls on built ground at year
  30".
- **J-V6.44 (l.3557).** "chose the town's wealth level as an epoch input … because a campaign's prosperity word
  changes".
- **BCR-V6-9 (l.3753–3757).** The `EpochInputs.wealthLevel` field.
- **Item 113 is not yet in V06's text.** A grep for "item 113", "high-water", `peakTier`, "symbolic" and "refound"
  across the volumes finds nothing relevant. Its replay lands in the same rewrite, so 114, 115 and 113 must be
  written together here.

### 2.2 What 114 requires in V06

1. **The ceiling over epochs (D5 (ii)).**
   - The `prelude` installs the ceiling band beside the wealth level (row 1). The field phase (row 4) applies the clamp
     and the band-share truncation.
   - BCR-V6-9 gains the economy value, or states that `wealthLevel` carries it under D2 (a). Its source is a dossier's
     economy field (V08) or a trajectory's.
   - `Trajectory` gains the economy target if D2 (b) is chosen. Under (a), `wealthLevel.target` is it.
   - §3.3.5's hysteresis rule applies to the ceiling's source too.
2. **"Start small" (§3.3.3) and the item-113 replay.** Both are "the first generation" in the owner's sense. State that
   the creation's economy value sets the ceiling at every one of their epochs unless the trajectory or the history moves
   it.
   - **The replay (a history generated as its past).** SettlementForge carries no prosperity history: `tierHistory`,
     `populationHistory` and `calamityHistory` only (item 113's survey). So the replay's economy value is held at the
     present one, and the ceiling holds at the peak epoch too.
   - **Answer to the brief's question.** The peak epoch never exceeds the present ceiling in PROSPERITY. A remnant
     (walls, oversized church, street lines) is sized by the peak's POPULATION, not by band, so it may be larger than
     today's town while every band it was built at stays ≤ the ceiling.
   - `geometryFloor` / `builtBand` (§4.11's floor rule, read by V02 §3.2 l.938) therefore never carries a band above
     the ceiling at the first generation.
   - **The edge to pin.** A symbolic peak (item 113 (f)) whose tier is higher than today's stays under the same
     ceiling. The item must say so, so that V06 and V08 agree.
3. **The wealth ladder (§3.8.4) and regrowth (§3.8 (0)).** A `relet` up and a rung-3 redevelopment "growing rich" never
   exceed the ceiling band while it holds. An economy rise at an epoch lets them move up through the normal lag.
4. **`walls.prosperityMin` 0.40 (§2.2, §3.7.1).** Under a low ceiling (a band whose upper cut is < 0.40), no new circuit
   can arise. That is realistic ("walls cost money"). State it and test it, because it is an interplay, not a bug.
5. **Tests.**
   - A history whose economy is held keeps every plot at or under the ceiling band at every epoch.
   - A trajectory economy rise lifts the ceiling after its hysteresis.
   - A "start small" town is capped like the one-click town at the same economy.
   - The replay's peak honours the present ceiling.

### 2.3 What 115 requires in V06

1. **The participant row (l.1055).** `sky.islands`'s **raise** reads the gate at the epoch (D6). Every other island
   event stays under the supply law.
   - "TOWN's carried or declared islands included" stands.
   - **An edge.** A "start small" TOWN that crosses into CITY with magic below `high` or economy below the threshold
     raises no island. With both high, step (5) may raise one. Both cases are reported.
2. **The replay (item 113).** At the replay's CITY or METROPOLIS epochs, islands rise by the supply law only if the gate
   holds on the history's (present) magic and economy. A replay whose present rung is lower (for example a city now
   a village) wanes, settles and falls any such island over its dwells (V05 §3.15 (6)). It leaves a landfall
   (`fallen_island` decoration) as a remnant of the past.
   - **Pin** whether that "former island" is wanted. The recommendation is yes: it is geometry of the history, and
     without the gate there is none.
3. **§4.1's time card, the "more" pane.** It accepts `trajectory.slice` (threat, era). It gains magic, the circumstance
   the gate reads, only if the item wants magic to move over a standalone history. Otherwise pin that magic is held.
4. **Tests.**
   - The raise is refused by the gate at an epoch.
   - A standing island is untouched by a later gate change.
   - T-V6-66's sky fixture is created with the gate held.

---

## 3. V07 — the village (`docs/volumes/V07-village.md`)

### 3.1 What it says now

- **§1 (l.309–310).** "**Out of scope, and why.** Floating islands (none reaches a village rung: §4.11 fells an island
  when the CITY band is left, and TOWN holds none)".
  - This **contradicts §3.12 (l.2715–2718)**: "An island still waning or settled when the fold gives the village
    product continues V05's steps (`sky.islands` runs at every rung, V6 §3.2 …)".
  - It also contradicts V06 l.1055's "TOWN's carried or declared islands".
- **§2.1 rung table (l.525–531).** The "layers: islands / sewers / undercity" column reads `none / never / never` at
  THORP, HAMLET and VILLAGE.
- **§2.2 (l.621, l.677).**
  - `bandShares: Record<string, number>`, "the village's household wealth shares over §4.5's band set, Σ = 1".
  - Defaults (squalid / poor / modest / comfortable / prosperous / rich):

    | rung | squalid | poor | modest | comfortable | prosperous | rich |
    |---|---|---|---|---|---|---|
    | THORP | 0.04 | 0.26 | 0.36 | 0.26 | 0.08 | 0 |
    | HAMLET | 0.05 | 0.26 | 0.34 | 0.25 | 0.08 | 0.02 |
    | VILLAGE | 0.05 | 0.25 | 0.33 | 0.25 | 0.09 | 0.03 |

    The `rich` share is "the lord's household".
- **§3.2 (3) (l.1429–1430).** "households … split over the bands by `bandShares` (shifted by the intent's wealth level,
  §4.2 S2)".
- **§3.7 (3) (l.1889–1894).** Prosperity pass 1: "The `FieldBands` for prosperity follow §4.5's rule from the village's
  `bandShares`".
- **§3.11 DR6 (l.2273–2274).** "`wealth.label` → `intent.wealthLevel` … shifts `bandShares` …; the bar (the
  population-weighted mean band within one band of the label's) holds at village rungs".
  - DR5 (l.2265–2267): Wealthy Residential is a claimed end "on the plots of highest mean prosperity".
- **§4.1 (l.2954).** T1 `intend`: "…; the size is the population; the density and wealth sliders".

### 3.2 What each rule requires in V07

- **114.**
  - The ceiling truncates `bandShares` after the wealth-level shift. The shares above the ceiling band fold into it,
    and the cuts follow (§3.2 (3), §3.7 (3)).
  - The VILLAGE row's `rich` 0.03 ("the lord's household") is capped at a low economy. The manor (DR11's seat) still
    stands, because it is a dossier or roster institution, but its household's band is ≤ the ceiling.
  - T1's "wealth slider" is the economy slider under D2 (a), with the same label as V09's.
  - DR6's bar at village rungs must hold under D10.
  - **Tests.** A village at a low economy has no household above the ceiling band. The DR6 bar holds.
- **115.**
  - Restate §1 "out of scope". The village product never raises an island: the rung gate is `none`, and 115's gate is
    moot below CITY.
  - Fix the contradiction with §3.12: an island carried down from a town continues V05's steps and falls over its
    dwells.
  - A "village over a former city" (item 113) may carry such a landfall from its replay (V06 2.3 (2)).
  - No new village rows.

---

## 4. V01 — neighbourhoods (`docs/volumes/V01-neighbourhoods.md`)

### 4.1 What it says now

- **§1b (l.464).** "every band read (S7c terms, S9b rows, surfaces, hood pins) | `wealth.label` | DR6 |
  `intent.wealthLevel` into the prosperity field".
- **§2.6 `HoodRecipe` (l.743–758).**
  - `intent: DistrictIntent /* wealth, density, planned, greenery …; absent fields derived */`.
  - `contextRung` 'TOWN'|'CITY'|'METROPOLIS', default CITY.
  - l.757: "The layers a hood document may hold are fixed by V1-3.10.1 (7) …: islands off".
- **V1-3.5.2 (l.1336–1347)**, the quotas.
  - Manors: `M = min(round(manorBlockShare(band) × N_ord), H_top)`, where `H_top` counts D's households "whose band lies
    inside D's provisional band range … and is ≥ `prosperous`".
  - `manorBlockShare`: 0 up to modest; comfortable 0.02; prosperous 0.06; rich 0.12.
  - Squares `haPer1000` by band.
- **V1-3.10.1 (l.1868–1925)**, the standalone neighbourhood.
  - "shanty 0.05 (only when `intent.wealth ≤ 0.2`)".
  - "Wealth is the slider's, never a kind: T1's 'great houses' card is any kind at `intent.wealth` 0.9 with `planned`
    0.5, its 'slum' card `shanty` at wealth 0.1".
  - S2: "The **virtual host town**: S2's roster for a town of `contextRung`'s target population with the recipe's
    intent".
  - S6 (l.1916–1920): "field pass 1 with `characterOffset = intent.wealth − 0.5` … its `FieldBands` cuts are the band
    set's **default cuts** … mapped … onto [0.1, 0.85]; the six-band default set keeps its authored row 0.12, 0.25,
    0.45, 0.62, 0.80 … a rich hood must be rich (J-V1.9)".
- **V1-4.2 (l.2618–2624).** T1 with `product: 'hood'`: "'great houses' and 'slum', which are wealth presets … and the
  wealth and density sliders … It shows no layer toggles".
- **Decisions.** J-V1.9 (l.3215): fixed default cuts. J-V1.57 (l.3263): "great houses" and "slum" as wealth presets.
- **Sky islands.** The unit run lays island districts (V1-3.10.3). It reads `SkyHandover.field` (V05). `sky-island`
  takes "the town's richest ground kind's" affinities (V11 §3.9 l.2256).

### 4.2 What each rule requires in V01

- **114.**
  1. **Standalone hood.** The hood's own slider is the map's economy slider: "the entire map" is the hood document.
     - The fixed default cuts (J-V1.9) meet the ceiling: bands above the ceiling band are empty. The clamp is at the
       ceiling band's upper cut from the fixed cut row.
     - **"Great houses" at `intent.wealth` 0.9.** That preset must also set the economy high enough that its ceiling
       admits the top band. Otherwise the ceiling contradicts the card. Pin it with D2's mapping.
     - The "slum" card at 0.1 is capped low, consistently.
     - J-V1.9's reason "a rich hood must be rich" still holds, because the rich hood's economy is high.
  2. **The virtual host town's roster** (S2) is built "with the recipe's intent", so it inherits the ceiling. State it.
  3. **Manor quotas** (V1-3.5.2) read `H_top` ≥ `prosperous` inside the band range. Under a ceiling below `prosperous`,
     manors are 0. That is correct, but it needs a test so it does not read as F-DISPATCH noise.
  4. **District band ranges.** Item 72 (d‴)'s `[floor, ceiling]` (the provisional band range, l.1343, l.1459–1465) lies
     at or below the map's ceiling band (D8). This needs one sentence in V01 and one in the base.
  5. **Term.** V01 writes `intent.wealth` (`DistrictIntent`) where the base writes `Intent.wealthLevel`. Under D2 the
     Rewrite should name the one field, or state the mapping.
- **115.** Hood documents hold islands off (V1-2.6 l.757; V1-3.10.1 (7)), so there is no change. The unit run on a sky
  island is unchanged, since the gate only decides whether an island exists.

---

## 5. V02 — buildings (`docs/volumes/V02-buildings.md`)

### 5.1 What it says now

- **§1a (l.225–226).** "The diversity ladder — per class and per prosperity band … from a hovel to a giant manor,
  interpolated along the prosperity value (item 19)".
- **§3.2 (l.894–954).**
  - Row keys `<class>/<band>` and `<templateFamily>/<band>`.
  - Step 3: "Every geometry cell … is read at the plot's **manifested** band and value (§4.11's floor rule: `max(field
    band, geometryFloor)`) … The district's band range (item 72, §4.5 (5)) clamps the value first. **The `rooms` cells …
    at the occupants' band**".
  - **Significance:** "shifted by `0.5 × bandWidth × log2(σ_use ÷ σ_class)` … clamped to at most one band's width up
    and never below the plot's own value … So a landmark custom guildhall composes one band richer" (J-V2.43, l.3558;
    T-V2-38).

### 5.2 What each rule requires in V02

- **114.**
  - The class a building composes as comes from S10b's class mix at the plot's band. Under the ceiling no plot is above
    the ceiling band, so manors and great houses vanish below a high economy. That follows with no change.
  - **Pin the significance shift.** It can raise a landmark's GEOMETRY value one band above its plot's band. At the top
    admitted band, that is above the ceiling. Recommendation: the shift is clamped at the ceiling band's upper cut,
    beside the band range's clamp ("clamps the value first"). The alternative is to state that geometry significance
    is exempt, because it is size, not wealth. **The item must say which.**
  - `geometryFloor` (a past band) is ≤ the ceiling at the first generation (V06 2.2 (2)). After an economy fall at an
    epoch, a shell built richer keeps its geometry: this is §4.11's floor, and it reads as remembered wealth.
  - **Tests.** No composition row above the ceiling band is read at the first generation. A landmark's shift is capped,
    if that is chosen.
- **115.** No change. Island palace and cathedral buildings and the rim-slab crypt (X15, X20) are as before.

---

## 6. V08 — the SettlementForge port (`docs/volumes/V08-settlementforge.md`)

### 6.1 What it says now

- **§1 item 12 (l.187–188).** "the bar that sunlight never pushes a dossier map outside its wealth row".
- **§1b (l.340–362).** The dossier facts read: "`magicLevel` → `site.magic` → `CircumstanceSlice.magic` (the `magic` row;
  II.6, item 68, item 109 (f))" (l.361). "nothing on §7.7 item 1's never-read list is read (T-V8-20's ignore clause)"
  (l.353).
- **§2.4 (l.647–660).** `requiredKeys` and `optionalKeys`. The never-read keys are "required for recognition, never
  read".
- **§2.6 row sets.**
  - `wealth` (l.828–830): "`prosperity` → `Intent.wealthLevel` and the band the T73-7 bar reads, DR6": Subsistence 0.05
    squalid; Struggling 0.2 poor; Poor 0.35 poor; Moderate 0.5 modest; Comfortable 0.65 comfortable; Prosperous 0.8
    prosperous; Wealthy 0.95 rich; else Moderate.
  - `magic` (l.952–954): "none → none; low → low; medium → low; high → high; else none, noted. `medium` — 32 of the 35
    births … reads as `low` under D-3's realism floor (J-V8.47)".
  - The deposits row (l.783): `magical_node` → "II.6's supply term".
- **§3.5 step 9 (l.1555).** "`_seed` and `_config` go no further." The resolved `config` keys are read row by row.
- **§5.1 (l.2448–2453).** The host frame: "the basic panel shows the dossier-owned intent values — the population, the
  tier word — locked … while the map facts the port derived (the wealth level, the density) stay editable (§7.7 layer
  1)".
- **Decisions.**
  - J-V8.45 (l.2811): "it is not the never-read generation sliders (`config.priority*`, §7.7 item 1), which are
    settlement-wide weights whose effect already sits in the institution list".
  - J-V8.47 (l.2813): `medium` → `low`.
- **BCR-V8-25 (l.3128–3133).** "The never-read sliders (`config.priority*`) stay unread."
- **Tests.** T-V8-20 (l.2630): "the port reads no key of §7.7 item 1's never-read list". T-V8-22 (l.2632) holds T73-7
  under `w_sun`. SF7 (l.2717) runs T73-1 – T73-7 through the bridge.

### 6.2 What each rule requires in V08 (the port side of both rules)

- **114, under D2 (a).**
  1. A new row set, e.g. `economy`: `config.priorityEconomy` (0–100) → the economy value → the ceiling band. Its
     rows are D2's pinned table. Its fallback: a missing or out-of-range value → SettlementForge's default 50, noted
     (`unmapped_word` or a new note kind).
  2. A digest field for it: `site.economy` or `settlement.economy`. Its lifecycle rows:
     - **create:** at `creation` from the first dossier ("the first generation");
     - **read:** by S2 and the field;
     - **persist:** in `CarriedFacts`;
     - **absorb:** SettlementForge's `config` is its generation input and does not move with the pulse, so a
       re-offer with the same config is `unchanged`. If a later offer differs (a regenerated dossier), carry it as a
       `port-values` change into the next epoch (the V06 2.2 (1) route), never at once;
     - **undo:** the host's;
     - **migrate:** a document without the field reads SettlementForge's default.
  3. **Remove `priorityEconomy` from the never-read list** (base §7.7 item 1). Restate J-V8.45 and BCR-V8-25 ("the
     never-read sliders … stay unread") to except it. The other four sliders stay unread; `priorityMagic` stays unread
     under D3's recommendation. T-V8-20's ignore clause is updated.
  4. **The host frame (§5.1).** Pin whether the economy value is dossier-owned: locked "Set by SettlementForge" like
     the population, or editable like the wealth level. Recommendation: locked. It is the dossier's own input, and item
     20 (h) makes the dossier truth. The ceiling derived from it is a map fact.
  5. **DR6 and T73-7 (D10).** The ceiling band is never below the `wealth` row's band for the dossier's `prosperity`.
     Add a T-V8 bar: every one of the 35 births, and the 12 after-tick dossiers, meets T73-7 under the ceiling.
- **115.**
  1. The `magic` row stands. "High magic" on a dossier is `magicLevel: 'high'` → `site.magic: 'high'` (D3). With 32 of
     35 births at `medium` → `low`, **most dossier cities get no islands.** State this as the owner's intended effect.
  2. The gate's economy clause reads the new economy field (114 (1)–(2)). DR27's inputs gain it.
  3. **Tests.** A `magicLevel: 'high'` city at a high economy may carry islands; `medium` never at generation; `none`
     refuses the setting (unchanged).
  4. **The history port for item 113.** The replay reads the present economy and magic (V06 2.2 (2), 2.3 (2)). There is
     no SettlementForge history of either, so nothing is invented.

---

## 7. V09 — the application (`docs/volumes/V09-application.md`)

### 7.1 What it says now

- **§1b's dossier-facts table (l.383–404).** The magic facts shown are "a magical node, ley lines, a magical history". No
  row for magic level or economy.
- **§4.2 (l.1417–1433).** "**Sky** (enabled at CITY and METROPOLIS when the town has islands, II.6 …). On **Sky** every
  row of V5 §4.1 takes its sky form …: T1 the islands setting and count; …".
- **§4.3 (l.1453).** `adjust` (intent, recipe, layers, islands, …) → T1 `intend` "(cards and sliders)".
- **§4.5 T1 (l.1566).** "the **Kind of place** sheet: product chips …, site cards …, size chips …, wealth slider, walls
  chip (none · one ring · two rings), style card; Surprise me; V06's time card | site, size, wealth, walls, style | …
  the rest of §7.8's basic panel …". **No magic control and no economy label.**
- **§4.9's message catalogue (l.1681–).** `refuse.islandsRung` (l.1738): "Floating islands exist only in cities and
  metropolises." with `button.cityUp` and `button.showWhy` — "§7.8's disabled control". There is **no row for V05
  §3.2 (5)'s report sentence** ("Islands are on, but …").
- **§4.14 (l.2226–2236).** The advanced panel holds every §7.8 parameter, each row showing the "layer that set it"
  ("default", "preset", …, "SettlementForge").
- **§5.4 (l.2962).** Show → **Wealth** (the thematic row keyed by `prosperity`).
- **§5.8 (l.3063–3069).** The why card's "**drivers** of its wealth as bars — the shade among them".
- **BCR-V9-2 (l.3804–3810).** T1's "wealth slider and … walls chip".
- **AP7 — Sky (l.3601).** The Sky group, handles and "Update shade now".

### 7.2 What each rule requires in V09

- **114.**
  1. **T1's slider becomes the economy slider (D2).** Its label, range (0–100 per SettlementForge) and default are
     pinned. §4.5's row, BCR-V9-2's two cells and the message catalogue's label row change.
  2. **A capped plot's why card (§5.8)** shows the ceiling as one driver bar: "The town's economy caps it at
     {band}". Its message key is D11's.
  3. **The Wealth view (§5.4)** may mark the ceiling band in its legend: "above this: none". This is optional; pin
     it or drop it.
  4. **The host frame.** The economy control is locked with `host.locked` under V08 6.2 (4).
  5. **A T5 band chip or T8 prosperity brush above the ceiling** takes the pinned hand-edit rule (D5). If it is a bend,
     it needs a message row, e.g. `bend.fill.ceiling`: "The town's economy tops out at {band}; used {band}." The
     existing `bend.fill.band` (l.1717) is the model.
- **115.**
  1. **A magic control in T1** ("on the slider", D3), with its label, form and default (`none`, D-3). It is the only
     standalone way to satisfy the gate, so it is required.
  2. **The islands switch's disabled states.** Beside `refuse.islandsRung`, add the magic and economy reasons as bends
     with actions, per IN-V09 (J-VI.4). Candidates: `bend.islandsMagic` ("Floating islands need high magic." → set
     magic high); `bend.islandsEconomy` ("Floating islands need a strong economy." → raise the economy). There is also
     V05 §3.2 (5)'s supply sentence, which is missing today (`info.islandsNone`).
  3. **§4.2's Sky switch** stays "enabled … when the town has islands". A town whose gate fails has none, so Sky stays
     disabled and the T1 bend is the route.
  4. **Surprise me** (§7.7's `intent.surprise`) rarely yields islands now. That is the owner's intent; no change.
  5. **Tests.** The switch shows the right bend per failing clause. Setting magic high and the economy high from the
     bend's buttons turns islands possible.

---

## 8. V10 — the clerk (`docs/volumes/V10-clerk.md`)

### 8.1 What it says now

- **§2.12 `IntendInput` (l.921–931).** `wealth?: number /* 0–1 */`; `magic?: 'none'|'low'|'high'`. **No islands field**,
  and `QuarterInput` (l.946–948) has **no `sky`**. So the clerk reaches V05's "floating palace over the river" (V5 §4.5
  l.2222) only through `events?: RawEvent[]`.
- **§2.13 `FieldDrivers` (l.1138–1141).** `terms: { driver: … 'daylight' … 'character', 'brush', 'epoch', 'chance';
  delta }`. "the terms sum, before the clamp, to the value the field stores" (§3.9 l.1813–1818; BCR-V10-4 l.3105–3112;
  T-V10-10).
- **§3.3 lexicon (l.1417–1431).**
  - `wealth`: penniless 0.08; struggling 0.25; humble 0.42; middling 0.55; thriving 0.72; opulent 0.9.
  - A band word on a quarter → `band`.
  - "magic, wizards, fantasy · high magic | `magic` | `low` · `high`".
  - No row for "floating islands" or "sky islands".
- **§3.4 (l.1481).** `intend`: "form, population, water, walls, wealth, era, magic".
- **§3.7 (l.1640–1647).** Creation mode reads `wealth` and `magic`. "An unspecified field stays absent: the rules and the
  auto features derive it".
- **§3.9 (l.1718, l.1724, l.1738).** A district's or plot's `prosperity` path gives `drivers`. `SkyIsland` gives "the
  island's gate, reason, strip and supply".
- **§4.1 (l.2441).** T1's encoder: `wealth` → `intent`; `magic` → `circumstances`.

### 8.2 What each rule requires in V10

- **114.**
  1. **`FieldDrivers`.** Add a `'ceiling'` term: the amount the clamp removed at the points (≤ 0). Then the terms plus
     the ceiling term equal the stored value, and T-V10-10 holds. BCR-V10-4's text and V05 §4.5's attribution
     stand. The answer "why is this quarter no richer?" reads the term and names the economy.
  2. **The lexicon's `wealth` rows** feed the economy value under D2 (a). "Opulent 0.9" must reach a top-band ceiling,
     which D2's table decides. Otherwise the clerk's "an opulent city" is capped. A clerk-set `band` above the ceiling
     on a quarter takes the hand-edit rule (D5).
  3. **Host frame.** The economy is dossier-owned there (V08 6.2 (4)): an `intend` changing it on a dossier map meets
     `dossier-owned`, as the population does.
- **115.**
  1. **`IntendInput` gains the islands switch** (`islands?: 'off'|'on'`, mapped to `adjust('layers.islands')`), with a
     lexicon row "floating islands, sky islands, flying islands → `islands: on`".
     - **Pin whether those words also set magic `high` and a high economy** (they do not say so), or whether the clerk
       explains the gate. Recommendation: words asking for islands set the switch only. Rule 4 of V10 §3.3 ("the clerk
       never asks") plus the gate's bend then tell the user what is missing, with the two one-click actions.
     - A creation-mode description "a rich magical city with floating islands" sets all three by the lexicon.
  2. **`QuarterInput` gains `sky`** (V5 §4.2's `quarter` parameter). This is a wiring fix that 115's fates need, so
     that the clerk's floating palace goes through the gate's fate (`held against its magic` or `…economy`), not a
     raw event.
  3. **The island's `why` (§3.9 l.1738)** names the gate's clauses ("high magic: no — this world's magic is low").
- **Tests.** The terms plus the ceiling term sum to the stored value. "Floating islands" on a low-magic town ends in
  the bend with its actions. A creation description with all three words yields islands possible.

---

## 9. V11 — content (`docs/volumes/V11-content.md`)

### 9.1 What it says now

- **§3.1 catalogue (l.827–935).**
  - Row 6 `prosperity.bands` (`bands.json`, `BandSet`).
  - Row 7 `prosperity.drivers` (with `w_sun`).
  - Row 30 `roster.bandRanges` (`BandRangeRow`).
  - Row 47 `wealthLadder`.
  - Row 56 `islands` (`islands.json`: "`IslandRule` and V05's rows").
  - Row 63 `dossier.*`, whose list includes `wealth` and `magic`. Their default rows are V08's.
- **§3.3.5 (l.1195–1197).** `w_sun` 0.02 is "about a tenth of a band's width … (the default band set's six bands span
  [0, 1] with a mean width ≈ 0.17)".
- **§3.5 class ladder.**
  - The magic gate (l.1348): "`magicGate` the classes marked *magic* below read `CircumstanceSlice.magic ≠ 'none'` or a
    dossier arcane power".
  - `airship_dock` "dos (high magic)" (l.1631).
  - `mage_tower`, `mages_guild` (l.1623–1624); `palace` and `cathedral` "on an institution island, V05's island siting
    applies" (l.1516, l.1530).
  - `sky_landing` and `sky_landing_top` (§3.5.13 l.1654).
- **§3.9 (l.2256).** `sky-island`, `sky-palace`, … take "each its ground counterpart's (`sky-island` the town's richest
  ground kind's …)".
- **§3.20.** `naming.island` (l.3417).

### 9.2 What each rule requires in V11

- **114.**
  1. **The slider → ceiling-band table.** It is a new registry row or a column of `bands.json` — the home is D2's
     pin. Its rows are keyed by the economy value, and it names a band of `prosperity.bands`. Its provenance is `SF` or
     `own` per J121. It is **not calibratable** (V12 §1: "Rules that are the owner's stay the owner's"), or only its
     thresholds are, if the item says so.
  2. The "high economy" threshold cell, or the band it implies.
  3. `roster.bandRanges` rows respect the ceiling (D8). No row edit, only a rule sentence.
  4. §3.3.5's "a tenth of a band's width" holds under a ceiling, since fewer bands share [0, c]. Note that `w_sun`'s
     no-op pin is unaffected.
- **115.**
  1. **`islands.json` gains the gate's cells.** For example `gate: { magic: 'high'; economyMin: <the pinned value> }`,
     with provenance `owner` (item 115) and not calibratable. The prose gate of V5 §3.2 then reads cells, and
     `editTable` on them is refused as an owner rule, or a bend (pin which).
  2. `magicGate` (l.1348) stays `≠ 'none'` for classes. 115 raises only the island gate, not the arcane classes. State
     it so the two gates are not confused.
  3. The `dossier.magic` row is V08's, unchanged. The new `dossier.economy` row is registered under row 63.

---

## 10. V12 — calibration (`docs/volumes/V12-calibration.md`)

### 10.1 What it says now

- **§1 (l.150–155).** "**Rules that are the owner's stay the owner's.** … No tuning run, no fallback and no historical
  map may move them".
- **§1b.**
  - l.309: the `T110b.*` bars read `Level.intent.wealthLevel`.
  - l.329: "`wealth.label` | DR6 (to `intent.wealthLevel`) | the elevated-road prosperity trend's dossier arm".
- **§2.7b `Level` (l.750–756).** `intent?: { wealthLevel?: number }`. **No magic and no economy.**
  `applies.requires: … 'islands'` (l.784).
- **§3.4 metric suite.**
  - `wealth.*` (l.1177): "from the core statistics record and the report … FTG descriptive".
  - `shade.gap` (l.1202): "V05's island fixture and V06's drift fixture read it".
- **§3.6b (l.1537, l.1551–1557).** `T110b.elevated.prosperity` runs `trend` over `intent.wealthLevel` 0.1, 0.3, 0.5, 0.7
  and 0.9.
- **§3.9 (l.1736).** "M6-sky | none: a descriptive set, never a gate (V05 §7) | NG 5: island close-ups".
- **§3.11 register (l.1981, l.2002, l.2081).** `islands.json`'s columns at M-CAL/sky. Item 102's `w_sun`.
- **IN-V12-3 (l.3557).** Refusals are counted as bends.

### 10.2 What each rule requires in V12

- **114.**
  1. **§1's owner-rule list** gains "the economy sets the prosperity ceiling (item 114)".
  2. **The mapping table's register entries.** They are `fixed:` notes, or the corpus stage closes them "owner's rule".
  3. **`Level.intent`** gains the economy value (and, under D2 (b), the economy separately).
  4. **The no-op pin (D12).** With the ceiling at the top band, B-CITY, the goldens and every NG, FM and VG parity run
     are byte-identical. Otherwise the default's ceiling (D9) is one declared shift naming its goldens.
  5. **`T110b.elevated.prosperity`** levels 0.1 … 0.9. With the ceiling, the high wards' prosperity is capped at low
     levels, which steepens the trend. The bar still reads "likelier with prosperity", but its expected values must be
     re-derived under the ceiling.
  6. **A new descriptive bar.** At each economy level of a sweep, the share of households above the ceiling band is 0,
     and the top band present equals the table's.
  7. **DR6's T73-7 under the ceiling** (V08 6.2 (5)).
- **115.**
  1. **`Level`** gains `magic`. `applies.requires: 'islands'` implies magic `high` and a high economy, or those are
     explicit.
  2. **The M6-sky panel seeds and V5's P0 levels** are generated with the gate held (V05 1.2 (7), (8)).
  3. **§1's owner-rule list** gains "islands only with high magic and a high economy (item 115)". The gate's cells are
     never calibrated.
  4. **A bar.** On 500 CITY seeds each, three conditions hold:
     - magic below `high` → 0 islands;
     - economy below the threshold → 0 islands;
     - both → V5's count law.
     It is conformance, V5's T-V5-1 extended; V12 registers it if it is statistical.

---

## 11. V04 — underground (`docs/volumes/V04-underground.md`)

### 11.1 What it says now

- **§1b.5 (l.509).** "wealth level (the TOWN law) | `wealth.label` → `intent.wealthLevel` | DR6, DR17 | II.7.1's law".
- **§3.4 F2 (l.1288–1291).** "the ground's field shifted by `undergroundOffset` … The prosperity sampled is the ground
  raster with its daylight-share term". The base's II.7.3 (pipeline/10-ii7-sewer-layer.md l.170) reads `undergroundOffset`
  default −0.25, "clamped to [0, 1] and banded by the town's own `FieldBands`".
- **§3.6 C5 (l.1958).** The undercity's field is "the parent's field with its daylight term" (J-V4.51).
- **§7.** T-V4-19 (l.2699): "a higher `wealthLevel` never raises `H`". T-V4-71: islands never read by the underground.
- **J-V4.101 (l.2971).** The underground never reads the sky layer, except the island church count.

### 11.2 What each rule requires in V04

- **114.**
  - The sewer-front clamp "[0, 1]" becomes the map's one clamp `[0, ceiling]`. With the −0.25 default the ground value
    minus 0.25 is already under the ceiling, so an `editTable` raising the offset above 0 is the only way to exceed it.
    State the clamp and add no bar. This is the base's II.7.3 text with a V04 pointer.
  - The undercity inherits its parent's capped field. The TOWN sewer law reads the wealth level, not the ceiling:
    unchanged.
  - The underground ruins of item 113 carry no prosperity.
- **115.** None. Islands never touch the underground (J-V4.101; V5 §1.3).

---

## 12. V03 — interiors (not named in the brief; checked)

Rooms read the occupants' band (V02 §3.2 step 3; V03 §3.x cells "poor / modest / prosperous / rich", l.602, l.1086;
J-V3.28). Under 114 no occupant is above the ceiling, so the rich room lists (parlour, counting room, chapel) simply do
not appear. **No text change.** One sentence may be added to V03's scope if the Rewrite wants the pass-through explicit.
No change for 115: the island cathedral's crypt form stands.

---

## 13. The units that must apply each rule (for the item's HOMES line)

**Item 114 (the economy ceiling).**

- **Base** (from `read-base.md`; named here only because the volumes lean on them):
  - §4.5: the field's clamp, the band shares at S2, `FieldBands`, and the district band range ≤ the map ceiling;
  - §7.7: layer 1's expansion; the economy field; DR6's bar; the never-read list without `priorityEconomy`; DR27's
    inputs;
  - §7.8: the control's label and range;
  - §4.11: epochs and the ceiling (D5);
  - §13: bars and the no-op pin;
  - the scope part: §1 or the judgment index.
- **Volumes:**
  - **V06:** ceiling over epochs, start small, the replay;
  - **V08:** the `economy` row, digest field, host lock, T73-7;
  - **V09:** T1's economy slider, the why bar, the bend row, the host lock;
  - **V10:** the `'ceiling'` driver term, lexicon, `dossier-owned`;
  - **V11:** the mapping table, the threshold cell;
  - **V12:** owner-rule list, `Level`, no-op pin, the T110b trend re-derivation, the new bar;
  - **V01:** the hood's ceiling with fixed cuts, "great houses" coherence, manor quota at the ceiling, band ranges ≤
    ceiling, the `intent.wealth` term;
  - **V02:** the significance shift at the ceiling;
  - **V07:** `bandShares` truncation, T1 slider, DR6 bar at village rungs;
  - **V05:** `S_town` and `P_I` under the ceiling, D7;
  - **V04:** one clamp sentence;
  - **V03:** none.

**Item 115 (islands need high magic and a high economy).**

- **Base:**
  - II.6 rule (1)–(2)'s gate, which today omits magic (`read-base.md` B6);
  - §7.7 item 11 and DR27's inputs and bar;
  - §7.8's islands control and its disabled states;
  - §5.2's report values;
  - §13 T-bars.
- **Volumes:**
  - **V05:** the principal home — §3.2 gate and report, §3.15 epochs, §4.2 declarations and fates, §4.4 DR-SKY and
    coherence, J-V5.19 and J-V5.10 restated, §0, §1b, §2.4/§2.6 rows, §7 tests and fixtures, §8 P0;
  - **V06:** raises at epochs, the replay, start small, the time card, T-V6-66's fixture;
  - **V08:** `site.magic = high` as the dossier's high magic, the economy source, the effect on 32 of 35 births;
  - **V09:** the T1 magic control, the islands bends and info row;
  - **V10:** `IntendInput.islands`, `QuarterInput.sky`, lexicon, gate `why`;
  - **V11:** `islands.json` gate cells, the `magicGate` distinction;
  - **V12:** `Level.magic`, the owner-rule list, fixtures and the bar;
  - **V07:** restate the out-of-scope sentence and fix its contradiction with §3.12;
  - **V01, V02, V03, V04:** none.

**Late rewrite seats.** Of these units, the base parts model, kernel, pipeline, determinism and rendering have
landed. Every volume above is still in its main rewrite.

---

## 14. Contradictions and gaps found while reading (for the Rewrite, independent of the choices above)

1. V07 §1 (l.309–310) against V07 §3.12 (l.2715–2718) and V06 §3.2 (l.1055): can an island exist at TOWN or village rungs?
   The volumes contradict each other. V06 and V07 §3.12 are right: an island in its dwell can.
2. V05 §3.2 (5)'s report sentence has no message row in V09 §4.9 and no clerk entry in V10.
3. V10 has no islands intent field and no `QuarterInput.sky`: the clerk cannot declare an island except by raw events.
4. V09 has no magic control, so standalone magic is reachable only through the clerk or a skeleton.
5. V01 uses `intent.wealth` (`DistrictIntent`) where the base and every other volume use `Intent.wealthLevel`, which
   breaks one term per concept.
6. V05 §3.15 (1) has no magic check at an epoch for standalone maps. Only a dossier's `none` at an absorb zeroes targets
   (V5 §4.4).
