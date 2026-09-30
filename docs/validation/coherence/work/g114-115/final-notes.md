# Final notes: owner rules 114 and 115 (the finaliser's settlement of the three reviews)

The filed text is `items-114-115.md` in this directory (rewritten from the 01:55 draft, whose copy is
`tmp/items-draft-0155.md`). This note settles every required change of `review-rules.md` (R1–R21),
`review-edges.md` (E1–E29) and `review-wiring.md` (W1–W26): each is APPLIED (with where), APPLIED AS MODIFIED (with
what differs and why), or REJECTED (with the reason, checked against the design files). It then lists the judgments
(the ids the scope part's index takes), the names the items pin, the choices the program made for the owner, and the
cross-item notes.

Every claim a reviewer made about the design was re-checked in the files before it was settled. Receipts:
`tmp/f-v07-manor.txt` (V07's manor), `tmp/f-sf-magic.txt` (every SettlementForge magic key in the survey), and the
design files read whole at the sections named below (base `new/base/**`, the landed `new/volumes/V03`, `V04`, the live
volumes, `docs/validation/coherence/wiring.md`, `canon.md`, `docs/lane-events.log`, `workflows/18-coherence.js`).

---

## 1. Facts re-checked that changed the settlement

1. **Which units have landed** (`docs/lane-events.log` l.1867–1868; `workflows/18-coherence.js` l.37–43, 115–128):
   model, kernel, pipeline, determinism and rendering (2026-09-29), V03 and V04 (2026-09-30 01:34–01:35). Scope is NOT
   landed ("rewrite-scope ledger corrected (no LANDED, P4b open)", 00:50). The workflow's late seat exists for any unit
   in `lateUnits`, base or volume.
2. **V04 needs no text.** Its F2 and C5 (new/volumes/V04 l.1162–1165, l.1863) read the context vector "of II.7.3" and
   the undercity field "as II.7.5 states"; II.7.3 (pipeline/10 l.170–171) bands by "the town's own `FieldBands`", so the
   prosperity ceiling reaches the underground through the pipeline's text. Its two wealth-level lines are a dossier trace
   row (`wealth.label` → `intent.wealthLevel`, l.389: the port stores the level explicitly) and T-V4-19 (l.2662: a test that
   sets `wealthLevel` explicitly). Both stay true. So V04 has no part and no late seat.
3. **`factTier` cannot carry the settlement's facts** (model l.1990, l.2243–2244): it is per entity, and "the settlement's
   own facts … and the typed circumstance slices are carried in `Document.dossier` and `Recipe.circumstances` and read
   there, on no entity". W1 is right.
4. **The site is creation's, and the canon already routes its later change** (`wiring.md` l.68, W-DOS-08; `canon.md`
   l.2787): V08 §2.7's "the site is creation's" plus a `site` diff row that writes one `frozen_fact_changed` note (class
   report). V05 §4.4's "a dossier change to `none` at an absorb makes every island's target 0" contradicts that standing
   rule. This settles R5 and W2 (below) and replaces the draft's receipt row F-V8-8 and note `creation_only`.
5. **§8.2's legend rule is general** (rendering/01 l.520–522 "a theme's legend key lists only the values drawn"; V09
   l.2974 "listing only the values drawn (§8.2)"). So E23's worry that capped towns' legends change uncapped ones does
   not arise; only the closing line is new.
6. **II.7.1 already states a default wealth level 0.5** (pipeline/10 l.35–36), contrary to read-base C1 and R21/E29's
   "the base states no default". The one-click default is still pinned (Economy 50, wealth level derived 0.5), and
   II.7.1's sentence is rewired.
7. **§4.5's four-row tables carry no `comfortable` row** (pipeline/01 l.1210–1218: "interpolated between modest and
   prosperous"), and a row-less band reads "the linear interpolation along the value between the nearest rowed bands'
   centres" (l.1219–1223). E1's continuous-read rule is built on that rule (value-based), not on E1's rank midpoint, so
   the read is continuous at the top rank too.
8. **The parity presets zero the island chances** (§7.6, determinism/03 l.1324–1329: "set every `extension` cell's
   chance or weight to 0 and its option off (… the island and sewer rules …)"). V05's parity clause is therefore
   redundant twice over; W10's first option (drop it) is taken.
9. **Receipt rows are per change kind that does something** (determinism/03 l.1529, l.1836–1846). A creation-only fact
   whose later change moves nothing has no receipt row in the design; W-DOS-08's note is the design's form for it.
10. **`ReportCode` is closed** (determinism/01 l.270) and `Diff.built` is `unknown` (l.262): `islands_gated` with
    `built: SkyGate['failed']` fits without a new field.
11. **DR36 and DR37** (determinism/03 l.1776–1777) derive the peak's extent and the replay's epochs and events, never a
    band; the ceiling reaches the replay's bands through DR6 and DR7.
12. **The +1 margin of the draft's floor is not needed for T73-7.** On the default shares (0.011, 0.011, 0.217, 0.435,
    0.217, 0.109) the population-weighted mean band is 3.163 uncapped; at a prosperity ceiling of `prosperous` it is
    3.054 (a Prosperous word, band 4: within 0.946), at `comfortable` 2.728 (Comfortable: 0.272), at `modest` 1.967
    (Moderate: 0.033). Every word that passes T73-7 uncapped still passes with the lift at the word's own band. So the
    lift is the word's own band (R18 taken further, below).
13. **V07's manor** (`tmp/f-v07-manor.txt`: l.710 "toft (rich: the manor)", l.936 the compound, l.1955 "rich →
    `v.yeoman_house` (the manor comes only by …)", l.2329–2333 the forced seat at every village rung): E22 holds.
14. **V09's key families** (V09 grep): `hint.*`, `info.*`, `bend.*`, `refuse.*`, `button.*`, `host.*`, `fate.*`,
    `report.*` (`report.moved.<kind>`, `report.dossier.<state>`) exist; `legend.*` does not, and V09 writes legend lines
    inline (l.2327, l.2343, l.2984). The legend line is therefore pinned as words, not as a key.
15. **V12's derived fixture form** exists (`Level.dossier`, V12 l.753: `'<dossier>@pop×k'`); the `@economy<e>` and
    `@magic<word>` forms extend it.

---

## 2. review-rules.md (R1–R21)

| id | disposition | where / why |
|---|---|---|
| R1 | APPLIED | 114 (e) leads with the owner's scope, marks the carry as the program's reading, gives the realism reason and the rejections; "read once … never again" and "no map fact depends on it" replaced by "every later reader reads that recorded value … re-derives nothing". |
| R2 | APPLIED | 114 (b) 2: `w` is never an author's value — the dossier's word at the first generation, the lived wealth after; (a) 3 "the map-side alternative for the town's overall wealth"; (i) 6 and T114-5 carry the standalone economy-10/wealth-0.9 bar. |
| R3 | APPLIED AS MODIFIED | 114 (c) 7: an author's declared band (T5's band via a new `setAttr` of the district's band in its sugar expansion, a district band `setAttr`, a cut edit) is HELD; the key is `info.ceiling.held` (one family with `info.ceiling`, `info.ceiling.wealth`) instead of `info.fill.ceiling`, since T5 is `quarter`, not `fill`. The mechanism (the district's band as an edited path; the clamp skipping it; households re-banded and listed) is pinned so the pipeline and determinism editors agree. An assignment's class stands with occupants capped (unchanged from the draft): the author asked for a class, not a band. |
| R4 | APPLIED | 115 title "at the first generation"; (d) opens with the owner's scope and the program's extension with its reason and rejection; D-3's sentence in the scope part names the extension as the program's reading. |
| R5 | APPLIED AS MODIFIED | One rule is pinned with its reason, but not R5's: the gate reads the magic IN FORCE and the RECORDED economy. On a dossier map both are the creation's (the site is creation's, W-DOS-08; the economy is creation-only, 114), so the asymmetry R5 found disappears there. Standalone they differ because they differ in kind — magic is a circumstance of the timeline (item 68's slice, `trajectory.slice.magic`), the economy priority a creation input (114). R5's rule (both at creation) would let an island rise at an epoch whose magic is low, against "has to have both high magic". Stated in 115 (d) 1. |
| R6 | APPLIED AS MODIFIED | Ownership is keyed to the creation's absorb (114 (a) 1; with W1 and E5). A later value is W-DOS-08's `frozen_fact_changed` note (args `field`, `was`, `now`) and the locked control's hint shows that note's line while the carried value differs — instead of a new `host.economyAtCreation` key: one note for every creation-only fact. |
| R7 | APPLIED | 114 (k) determinism: layer 1's exception, item 9's list, item 11's refusal; 115 (h): item 9's list gains the creation slice's magic word (the adjust refusal already covers "a slice value the dossier supplied"). |
| R8 | APPLIED AS MODIFIED (option B) | The N fact is relabelled (resolution not recorded); the double-count reason is deleted. The gate reads SettlementForge's resolved word because the map has one magic (the lights, classes and access kinds read the same slice), the word folds the toggle in, and a slider banding would be ours (J121). The risk is stated ("an author who sets the magic slider to its top may still get no island; the report names the source") and option A is named as the vetoable alternative. Option A was not taken: it would give the map two magics (the gate's and the slice's) or change the slice's magic from SettlementForge's own word, and its 75 on the magic slider would be a second invented banding. |
| R9 | APPLIED | 115 (b): "75 is the program's pick … a round, neutral cut … SettlementForge records no banding". |
| R10 | APPLIED | 114 (b) 1: the ceiling rows `own`, `calibratable: false`, no stamp, V12 lists the rule; 115 (b): `gate.magic` stamped `ownerRule: '115'` (the owner's word "high"), `economyMin` own and not calibratable. |
| R11 | APPLIED AS MODIFIED | J-V5.19's replacement text is pinned (115 (d) 5); the Islands control is disabled where any failing clause is the dossier's (the setting can raise nothing there, §7.8's rule), with three variants (E20) and `button.drawIsland`; a declaration is judged by the rung and a dossier-stated `none` only, and with the setting off it stands with the setting unchanged (R11's pin); T115-2 reworded. The mixed case: disabled, the row naming the dossier's clauses; the map's buttons are NOT offered there (R11 asked for them) because fixing a map clause cannot open a gate a dossier clause keeps closed. |
| R12 | APPLIED | 114 header: 152 generated at the defaults (C), three sample cards N, the priorities' copy P, no writer after birth P; 115 (c)'s census conclusion rests on the magic clause (none of 155 `high`, C); 114 (g) gains the N sentence on `priorityEconomy` and the prosperity word. |
| R13 | APPLIED | 114 (a) 2 (label is the program's pick); 115 (a) 2 (the departure from SettlementForge's magic slider and toggle, stated). |
| R14 | APPLIED | 115 (b): research row 12 superseded (none → no islands) and its multiplier unadopted. |
| R15 | APPLIED AS MODIFIED | The units' header names the landed units (base five, V03, V04); V04 has NO part (fact 2 above), so no late seat — against R15's "V04's late seat carries 114's one pointer". |
| R16 | APPLIED | 114 (i) 15. |
| R17 | APPLIED | 114 (d): written only below the top rank; with E13's tie rule in (b) 2. |
| R18 | APPLIED, then taken further | The +1 margin is DROPPED: the lift keeps the dossier word's own band and no more (fact 12: T73-7 needs no margin on the default shares). The owner's rule yields only as far as item 20 (h) forces. Stated in 114 (b) 2 and T114-5's fixtures (Prosperous at 10 → `prosperous`; Moderate at 0 → `modest`, `by: 'economy'`). |
| R19 | APPLIED | 115 (c): "the consequence of the owner's condition at SettlementForge's present values". |
| R20 | APPLIED | "fantasy group" removed (the Magic sits in "Programme", W18); "(R15; J-A101.77)" reads "§7.8's control-surface budget, R15". |
| R21 | APPLIED | 114 (a) 2 pins the one-click default (Economy 50, wealth level derived 0.5); scope §1.2 states it; II.7.1's "default 0.5" is rewired (fact 6). |

## 3. review-edges.md (E1–E29)

| id | disposition | where / why |
|---|---|---|
| E1 | APPLIED AS MODIFIED | 114 (c) 4: `R*_c = lerp(R(c − 1), R(c), f)` read as the end row, with `R(b)` for a row-less band defined by §4.5's own interpolation at the band's centre (fact 7) rather than E1's rank midpoint, which would step at the top rank. Discrete named-band reads use the probability `f`, drawn only where `f` < 1 so uncapped runs draw nothing new. Demand rows (counts) are split deterministically by `f` instead of drawn (114 (c) 1): a count needs no draw. Reads at an entity's own band (the interior ladder, discrete template columns) read that band's row: band `c`'s mass tends to 0 with `f`, so the expectation is continuous. T114-3 gains the knot checks and the two metrics. |
| E2 | APPLIED | 114 (i) 4: the fallback replaces only the layer 1 derivation row; the rows are not calibratable (R10 removed the stamp, so the reason is `calibratable: false`). |
| E3 | APPLIED | 114 (c) 2: the fixed-cut share rule; T114-9's 30–40 sweep; V01 keeps `intent.wealth ≤ 0.2` read as the wealth level in force. |
| E4 | APPLIED | 114 (a) 2: `hint.wealthSeparate`, Follow the Economy (`adjust('intent.wealthLevel', null)`), the clerk's fan-out ((h)), Surprise me writing no wealth level; T114-13. Surprise me draws the economy as 100 × the wealth level's draw (not "uniform") so today's surprise towns keep their wealth. |
| E5 | APPLIED | 114 (a) 1 and 115 (a) 1: keyed to the creation's absorb; T114-7's migrated-document and dropped-value cases. |
| E6 | APPLIED AS MODIFIED | 114 (e): an epoch whose position differs rewrites the cuts from the whole town's folded demand with the record; otherwise the item changes nothing in how an epoch treats cuts; the field band re-bands at the epoch and geometry follows the ladder (the sentence corrected); T114-8 reworded with a two-band fixture. The ONE-RANK-PER-EPOCH LIMIT IS REJECTED: the lived word is the dossier's truth (item 20 (h)), the wealth ladder already paces the built geometry, and an epoch runs from a week (a campaign) to decades (the replay), so a per-epoch rank limit would pace wealth by epoch length, not by time. |
| E7 | APPLIED AS MODIFIED | `BandSet` declared once in §2.5 (model) with only the fields §4.5's table already names (bands with share, FTG tier, MFCG class; the blend) plus `ceiling`; E7's `id`, `version` and `middleRule` are left to the registry (§7.6) and to §4.5's median rule, since inventing them would add names no text uses. A pack without `ceiling` reads no prosperity ceiling. |
| E8 | APPLIED | 114 (c) 7 (cut edits held; re-derivations re-apply the ceiling to cuts the author did not set), 114 (d) (the `editTable` lifecycle of `BandSet.ceiling`), 115 (b) (the gate cells' edits), 115 (e) (an edited table admitting a capped town); T114-10, T114-14, T115-10. |
| E9 | APPLIED AS MODIFIED | A declaration with the setting off is ALLOWED with the setting unchanged (R11's pin), not bent to switch the setting on: a declared island is the author's own, and switching rule-driven islands on as a side effect would add islands nobody asked for. `refuse.islandsParity` is REJECTED: the parity clause is dropped (W10) and a declaration under a parity preset is an edit like any other. A creation-prefix `sky` assignment is a forced slot (APPLIED); a locked generated island under a failed clause carries `held_against_magic` / `held_against_economy` (APPLIED). S7b (5) runs forced slots whatever the setting (115 (c)). |
| E10 | APPLIED | 115 (d) 9 by state, with the relocation fill stated honestly and the old `unmapped_word` `none` read absent; T115-7. |
| E11 | APPLIED | The header names V03 and V04 as landed; V04 has no part (fact 2). |
| E12 | REJECTED (the consequence stated) | E12's enclave rule (`[c, c]` with probability `f`) is discontinuous at every knot from the other side: at `at = k` a district in band k's upper half would read `[k, k]`, at `at = k + ε` it reads band k's own row lowered to `[k − 1, k + 1]`. The draft's clamp is continuous; its consequence is stated in 114 (c) 5 with the realism reason: an exclusive enclave is the patriciate's (the `rich` row), which a town capped below it does not have. T114-6 carries a range bar at economy 0. |
| E13 | APPLIED | 114 (d) (written only below the top rank); 114 (b) 2 (`by` reads `economy` on a tie). |
| E14 | APPLIED | T114-4 restated around the drivers oracle and a skeleton-pinned document; (c) 3's "directly"; (c) 1's "a lower Economy builds a smaller town". |
| E15 | APPLIED | 114 (c) 1 and (i) 14: the identity exactly when `at ≥ r_max`. |
| E16 | APPLIED AS MODIFIED | With the dossier's magic creation-only (W2), the refusal reads the creation slice's dossier-owned magic; a later SettlementForge word is a `frozen_fact_changed` note and moves nothing, so the carried word and the magic in force never differ in effect. |
| E17 | APPLIED | 114 (a) (a real, stored as given, step 1, compared as stored), (h) (words name the highest band held; the report gives ⌈at⌉ and `f`), (i) 5, T114-2 at 16.67. |
| E18 | APPLIED | 114 (f) (both settlements under the recorded priority); 115 (d) 1 (islands fall at a destruction outright, reported); T114-12, T115-5. |
| E19 | APPLIED | 115 (d) 2 (the access conversion at an epoch; a placed access held); T115-3. |
| E20 | APPLIED AS MODIFIED | Three dossier variants with `button.drawIsland` (unless the dossier states `none`); buttons only for a failing clause the map owns, and only on the enabled state; `hint.economyRichest` below 50. The parity reason row is REJECTED (E9, W10). |
| E21 | APPLIED | `moderate → low` in the row (115 (a) 1), T115-2. |
| E22 | APPLIED | 114 (c) 7: a government-forced seat keeps its class's toft and template rows, its occupants capped; T114-9's seigneurial VILLAGE at economy 0. |
| E23 | APPLIED AS MODIFIED | The home stays §8.2 (the thematic key's rule; §9.5 shows each active row's key); the rule adds only the closing line where `FieldBands.ceiling` is present (fact 5). |
| E24 | APPLIED | 114 header (the priorities' copy P), 115 header (resolution N); decisions rest on established grounds. |
| E25 | APPLIED | 114 (a) 4: the island clause is a declared owner step at 75 outside the sweep (islands off); two output metrics, as `wealthLevel`'s row already has two (§7.8 l.1944). |
| E26 | APPLIED | T114-5 on V12's derived fixtures at `priorityEconomy` 0 and 10. |
| E27 | APPLIED | "prosperity ceiling" always; "wealth floor" renamed "wealth lift". |
| E28 | APPLIED | 114 (c) 1: S5d's provisional cuts are the folded cuts. |
| E29 | APPLIED | 115 (d) 1's reason for gating a settled refloat; 114 (a) 2's one-click default. |

## 4. review-wiring.md (W1–W26)

| id | disposition | where / why |
|---|---|---|
| W1 | APPLIED | No `factTier` rule: the economy priority joins §2.8's settlement facts, the magic word the typed slices' side (model); item 9 and item 11 (determinism). |
| W2 | APPLIED AS MODIFIED (option A through the canon's route) | Creation-only magic, as V08 already rules; the later change is W-DOS-08's `site` diff row and `frozen_fact_changed` note (already routed to V08 by the canon), NOT a new receipt row F-V8-9. V05 §4.4's absorb wane is withdrawn; magic `none` in force after creation comes only from a standalone timeline slice. |
| W3 | APPLIED AS MODIFIED | V08's part: the settlement diff row comparing `economyPriority` (writing `frozen_fact_changed`), §2.7's lifecycle row with its migrate cell, §4.6's rows for `value_absent` and `value_clamped` (standing), W-DOS-02's `wealth` row cited. F-V8-8 is NOT minted (fact 9): a change that moves nothing has no receipt row; W-DOS-08's note is its form. The draft's `economy_absent`, `economy_clamped`, `magic_absent` become the two generic kinds `value_absent` and `value_clamped` (one concept, one term: an absent or out-of-range dossier value filled by the map), and `creation_only` becomes W-DOS-08's `frozen_fact_changed`. |
| W4 | APPLIED | 115 (c): `requestedVsBuilt` entry with `ReportCode` `islands_gated` and `built: SkyGate['failed']`; `EpochReport.islandsGated`; V09's `report.islands.gated`, `report.islands.clause`. |
| W5 | APPLIED AS MODIFIED | `SkyGate.failed` carries clause, value and source; one pure `skyGate(...)` with a pinned signature. Source is `'map'|'dossier'` only: the `'preset'` source goes with the parity clause (W10), and a rung's source is the dossier's where its population chose it. |
| W6 | APPLIED | "The wealth level in force" defined once (114 (a) 2) and rewired at §4.2 S0, II.7.1 (now STATES), §4.7 S10b (2), DR8, V05's fallback, V07; Surprise me writes no wealth level. V04 and V12 need no rewiring (V04: fact 2; V12's levels set the level explicitly). |
| W7 | APPLIED | `ceilingAt(...)` pure, called by S2 and the epoch prelude; S6 records it. |
| W8 | APPLIED | 114 (e): the cut rewrite at §4.11 step (a); T114-8's reopened cut. |
| W9 | APPLIED | Homes: the ceiling rows §4.5 (V11 registers the cell); the gate cells V05 §2.4 (II.6 names the clauses, V11 registers); DR27's inputs the derivation table; the report entry V05 §3.2 (1) with §5.4's code; the port bars §13.2, V08 extending T-V8-20's clause only. |
| W10 | APPLIED | Parity entries for `MFCG`, `FTG`, `VG`, `NG` by `MFCG`, `FM` none (114 (b) 4); clause (2) dropped (115 (c); fact 8). |
| W11 | APPLIED | `Recipe.params['layers.islands']`, one `adjust` spelling `layers.islands`, V10's creation mode writing the new document's params. |
| W12 | APPLIED | §7.1's T1 binding row (Magic), edit-target row (`FieldBands.ceiling` derived), early-parameter list (Economy); §7.4 redirected to the adjust row and the `quarter` row's fates; registry ids `intent.economyPriority` and `circumstances.magic`. |
| W13 | APPLIED | Fates as `EditFate { fate: 'kept', reason: … }` with V09's `fate.held.*` rows (ceiling, magic, economy, supply). |
| W14 | APPLIED AS MODIFIED | Keys pinned: `info.ceiling.wealth`, `bend.ceiling.follows` with `button.openEconomy`, `hint.economyRichest` (a hint, V09's family for a control's readout, not `info.economy.richest`), `report.ceiling`, `report.islands.gated`, `report.islands.clause`, the three event forms. Not keyed: the legend line (V09 writes legend lines inline, fact 14) and the layer word "from the Economy" (V09 §4.14's layer words are words) — their words are pinned. `host.economyAtCreation` is replaced by W-DOS-08's note (R6). |
| W15 | APPLIED AS MODIFIED | DR6, DR7, DR9 and DR27 gain `settlement.economyPriority`; DR7's "the ceiling" becomes the field. DR36 and DR37 are REJECTED (fact 11): they derive an extent and epochs, never a band. |
| W16 | APPLIED | §5.3's coherence row (114) and the sky row's addition (115). |
| W17 | APPLIED | 114 (b) 5 and 115 (b)'s limits, with the lift skipping a `wealth` row whose band the set lacks; homes EP-18 and V11's compiler. |
| W18 | APPLIED | The Magic sits in "Programme" (consuming stage S2), linked by `button.magicHigh`. |
| W19 | APPLIED | `Level.intent.economyPriority`, `Level.magic`. |
| W20 | APPLIED | Scope: §0.2 rows, §14's T1 row, §1.2's defaults, J ids pinned (§5 below), §16 placement (M2b, M6-sky, M-SF). |
| W21 | REJECTED | V04 has no part (fact 2): its wealth-level lines are a dossier trace (the stored level) and an explicit-level test, both still true, and its banding reads II.7's text. |
| W22 | APPLIED | Lexicon field `economy`; V10 §4.1's encoder row with the fan-out to `wealth`. |
| W23 | APPLIED | `drivers()` fills `FieldDrivers.ceiling` (pipeline). |
| W24 | APPLIED | T114-4 (merged with E14). |
| W25 | APPLIED | T114-1 compares the model and stage digests; the one-click recipe writes neither field. |
| W26 | APPLIED | One fixture rule for every island bar (115 (g)); the history fixture named (item 113 (a) 1's blueprint history, or V12's derived form). |

---

## 5. The judgments (the scope part's judgment index takes these ids; each is the program's under J122, vetoable)

**Item 114**
- J-A114.41 — the hosted slider is `config.priorityEconomy`, resolved; `_config` and `economicState.priorities` unread; clamp and absence noted.
- J-A114.42 — standalone, T1's wealth slider becomes the Economy (0–100, default 50); `wealthLevel` optional; "the wealth level in force" one term.
- J-A114.43 — a stored wealth level keeps priority; Follow the Economy; Surprise me draws the economy as 100 × the wealth level's draw.
- J-A114.44 — the prosperity ceiling binds bands, never the value (no clamp, no compression).
- J-A114.45 — a continuous position with its share: the fold, the demand split, the fixed-cut rule and the continuous reads.
- J-A114.46 — the table `{0, modest}`, `{50, rich}`, linear, identity at 50 and above; own, not calibratable, unstamped.
- J-A114.47 — the wealth lift: the dossier word's own band and no margin; never an author's value.
- J-A114.48 — the map's prosperity ceiling lowers item 72's ranges; a capped town's richest quarter is mixed.
- J-A114.49 — precedence: author-declared bands and cut edits held; a government-forced seat keeps its class's rows.
- J-A114.50 — the record `FieldBands.ceiling`, written only below the top rank.
- J-A114.51 — the first generation reads the priority once and records it; dossier ownership keyed to the creation's absorb.
- J-A114.52 — after it: the founding row carried, the lived wealth lifting, the cuts rewritten on change; no rank limit.
- J-A114.53 — history, symbolic peaks and refounding under the recorded priority.
- J-A114.54 — J-M5 narrowed to one consumer; the other four sliders unread.
- J-A114.55 — the explanations and words (why card, hint, legend line, report line, held-band confirmation, clerk).

**Item 115**
- J-A115.41 — the gate reads the map's one magic; hosted, SettlementForge's resolved word; `priorityMagic` unread, the risk stated.
- J-A115.42 — the standalone Magic control (None · Low · High, default None, "Programme" group).
- J-A115.43 — "high" is the word `high` and an economy of 75 or more (the program's pick).
- J-A115.44 — four clauses in order; the parity clause dropped; `SkyGate`, `skyGate(...)` and the `islands_gated` report.
- J-A115.45 — J-V5.19 replaced: the Islands control disabled where a dossier clause fails; the setting's refusal withdrawn.
- J-A115.46 — rising gated, standing not; the magic in force and the recorded economy; a settled refloat is a rising.
- J-A115.47 — the dossier's magic is creation's (W-DOS-08): V05 §4.4's absorb wane withdrawn.
- J-A115.48 — the author's own islands judged by the rung and a dossier-stated `none` only; held fates.
- J-A115.49 — migration by island state on upgrade.
- J-A115.50 — with item 114: an island town is never capped under the default tables; edited tables stated.
- J-A115.51 — at a destruction outright the old settlement's islands fall with it.

## 6. Names the items pin (each new — none occurs in `docs/` or `research/` outside this work folder, receipt `tmp/f-names-check.txt` — but W-DOS-08's `frozen_fact_changed`, reused on purpose)

Fields and types: `Intent.economyPriority?`, `DossierDigest.settlement.economyPriority?`, `DossierDigest.site.magic?`
(made optional), `BandSet` (declared) with `BandSet.ceiling: BandCeilingRow[]`, `FieldBands.ceiling?: { at; by }`,
`ceilingAt(...)`, `IslandRule.gate: { magic; economyMin }`, `SkyGate`, `skyGate(...)`, `FieldDrivers.ceiling?`,
`IntendInput.economy?`, `IntendInput.islands?`, `EpochReport.islandsGated`, `Level.intent.economyPriority?`, `Level.magic?`,
the carried settlement fact's `economyPriority?`, `Recipe.params['layers.islands']` (the path, made explicit).
Registry ids: `intent.economyPriority`, `circumstances.magic`.
Terms: economy priority; the Economy (the control); the Magic (the control); prosperity ceiling (`at`); highest allowed
band (`c`); share (`f`); wealth lift; lived wealth; the wealth level in force; the magic in force.
Report and notes: `ReportCode` `islands_gated`; `PortNote` kinds `value_absent`, `value_clamped` (and W-DOS-08's
`frozen_fact_changed`, placed in §14's union with its args `field`, `was`, `now`).
Fate reasons: `held_above_ceiling`, `held_against_magic`, `held_against_economy`, `held_against_supply` (V05's existing
fate, encoded).
V09 keys: `info.ceiling`, `info.ceiling.wealth`, `info.ceiling.held`, `bend.ceiling.follows`, `hint.economyRichest`,
`hint.wealthSeparate`, `report.ceiling`, `button.economyUp`, `button.openEconomy`, `info.islandsGated`,
`refuse.islandsDossier.magic`, `refuse.islandsDossier.economy`, `refuse.islandsDossier.both`, `refuse.islandsNoMagic`,
`info.islandsNone`, `report.islands.gated`, `report.islands.clause`, `button.magicHigh`, `button.economyHigh`,
`button.drawIsland`, `fate.held.ceiling`, `fate.held.magic`, `fate.held.economy`, `fate.held.supply`; event forms
`event:economyTo`, `event:magicHigh`, `event:economyHigh`.
Tests: T114-1 – T114-14 and T115-1 – T115-10 (§13.2, scope); V12's derived fixture forms `'<dossier>@economy<e>'` and
`'<dossier>@magic<word>'`.
Draft names never filed: `economy_absent`, `economy_clamped`, `magic_absent`, `creation_only`, F-V8-8, `bend.fill.ceiling`,
"wealth floor", the plain `refuse.islandsDossier`, the `'parity'` gate clause.

## 7. Choices the program made on the owner's behalf (all vetoable)

1. SettlementForge's economy slider (hosted) is its resolved `priorityEconomy`; standalone, the existing wealth slider
   becomes the Economy slider (0–100, default 50) instead of adding a thirteenth control.
2. The prosperity ceiling caps bands (which households, houses and districts may be rich), never the prosperity values.
3. The table: economy 0 → at most `modest`; 16⅔ → `comfortable`; 33⅓ → `prosperous`; 50 and above → no ceiling (the
   default town unchanged); linear in between.
4. A SettlementForge prosperity word keeps its own band allowed whatever the slider (no margin above it).
5. After the first generation the founding ceiling stays, and lived wealth (SettlementForge's later word, or a
   standalone history's wealth target) may raise it, never lower it below the founding.
6. An author's own drawn band, cut edit, lock or declaration above the ceiling holds, with a listed fate.
7. A capped town's richest quarter mixes in the band below (no exclusive enclave below the top band).
8. A lord's manor keeps its full form in a poor village; its household is capped.
9. "High magic" is SettlementForge's own word `high`; the magic slider itself is not read (the risk stated, the
   alternative named).
10. "High economy" is 75 or more on the 0–100 slider.
11. The gate binds every rule-driven rising, not only the first generation; islands already standing are never removed
    by it.
12. Standalone maps get a Magic control (None · Low · High, default None) in the advanced panel.
13. A dossier's magic and economy are fixed at the map's creation; later SettlementForge changes are reported, not
    applied.
14. A hand-drawn island is allowed without high magic or a high economy (held, listed), refused only where the dossier
    says the world has no magic.
15. The Islands switch is disabled, with a reason and a "place an island by hand" button, where SettlementForge's own
    values close the gate.
16. Older documents keep their islands on upgrade as held islands the user may drop.
17. The parity presets' separate island clause is dropped (their zeroed chances already keep islands out).
18. At a destruction outright, the old settlement's islands fall with it.

## 8. Cross-item and cross-unit notes

- **Item 116** (`work/g116/item-116.md` l.182–196) reads "item 114's highest allowed band" and "`means.top` is the `hi`
  of item 114's highest allowed band". Under 114 (c) 4 band `c`'s row is `R*_c = lerp(R(c − 1), R(c), f)`, so for
  continuity 116's `means.top` should read the `hi` of `R*_c` — `lerp(hi_{c−1}, hi_c, f)` — and its band-keyed
  `means` table should read by 114 (c) 4. For the three items' cross-consistency check before filing.
- 116 claims DR41; 114 and 115 claim no DR number and mint no receipt row.
- W-DOS-08 (V08, routed by the canon) now carries two further facts: the settlement's economy priority (via the
  settlement diff row) and the magic word (via the `site` row); its note `frozen_fact_changed` gets the args `field`,
  `was`, `now` and a place in §14's `PortNote.kind` union (scope).
- W-DOS-02 (V08's `wealth` diff row, F9 → `EpochInputs.wealthLevel`) is the lived wealth's source for 114 (e).
- The pre-existing gap that no S2 rule shifts the household shares by the wealth word (read-base A10; DR7) is not
  item 114's; the fold applies after whatever S2's shift is, and T114-5 bars only that the prosperity ceiling never
  breaks T73-7 where it passed uncapped.
