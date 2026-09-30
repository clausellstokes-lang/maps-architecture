# Consistency report — owner rules 114, 115 and 116, harmonized before filing

> Written by the bundle's consistency check (Opus 5.5 standing in, PENDING FABLE REVIEW), 2026-09-30.

**Inputs read whole:** `work/g114-115/items-114-115.md`, `final-notes.md`, `routing.json`, `canon-ruling.md`,
`j-rows.md`, `owner-instructions-entry.md`, `program-correction.md`; `work/g116/item-116.md`, `final-notes.md`,
`routing.json`, `canon-ruling.md`, `j-row.md`, `owner-instructions-entry.md`, `read-owner-decision.md`. **Checked in the
design:** `new/base/scope/12-judgment.md` (the J-A numbering rule), `new/base/scope/09-s16.md` (M1, M2b),
`new/base/determinism/03-s7-editing.md` (`EditFate`, the event `group`), V05 (`held against its supply`, `skyGate`),
V08 §2.4–§2.6 and T-V8-20, V09 §4.14 (the advanced panel's groups), V10's `IntendInput` and lexicon, V11's rows 6, 49 and
56, V12's derived fixture form, `research/sf/` (the magic keys), `docs/lane-events.log` l.1840–1871, and
`workflows/18-coherence.js` (`lateItems`, `lateUnits`, `lateRouting`). **Receipts** in `tmp/`: `id-census.txt` (every new
id against `new/`, `docs/volumes/`, `ARCHITECTURE.md`), `old-ids.txt` (every amended older id exists),
`magic-high-new.txt` (what reads the magic word `high`), `cap-stone.py` / `cap-stone.txt` (item 116's means under item
114's prosperity ceiling). The edits were applied by script with each target string asserted unique (`tmp/h114.py`,
`tmp/h115.py`, `tmp/h116.py`); item 116's prose was rewrapped with its words verified unchanged (`tmp/rewrap116.py`).

**Outputs:** `items-114-116.md` (the three items as they will be appended), `routing.json` (18 units),
`canon-ruling.md` (one ruling, dated 2026-09-30), `j-rows.md` (J126–J128), `owner-instructions-entry.md`,
`plain-summary.md`, this report.

---

## 1. The program's correction applied to item 115

`program-correction.md`: high magic reads the magic slider (`priorityMagic` ≥ 75) or SettlementForge's word `high`, and
never where magic does not exist (`magicLevel` `none` or `magicExists` false). Applied everywhere the final read the word
alone; everything else of item 115 kept as finalised.

| where the final read `magicLevel` 'high' alone | as filed |
|---|---|
| title paragraph, SettlementForge facts | the times fixed (§2 C13); the correction named; the census's sliders stated (152 at 50; the three sample cards NOT ESTABLISHED); `config.magicExists` PLAUSIBLE in the resolved config |
| (a) intro, (a) 1 hosted | the gate reads the **magic priority** `Intent.magicPriority` (hosted from `config.priorityMagic`: clamp `value_clamped`, absent `value_absent` → 50, dossier-owned when the creation's absorb carried it, a later value `frozen_fact_changed`) beside the **magic in force**; V08's `magic` row reads `magicExists` false as `none`; the "risk" and "vetoable alternative" sentences removed (the alternative is now the rule); `priorityMagic` leaves the never-read list |
| (a) 2 standalone control | a 0–100 **Magic** slider (default 50, high at 75) with **No magic in this world**, on by default (D-3); the world's word follows the slider while magic exists (a §7.7 layer 1 derivation row), so lights, magic classes, access kinds and the gate read one magic; registry rows `intent.magicPriority` and `circumstances.magic`; the slider's adjust carries the word in one `group`; same home and label as the final's control |
| (b) "HIGH", `IslandRule.gate` | **high magic** defined; `gate: { magic: ('low'\|'high')[]; magicMin: 75; economyMin: 75 }`; `magicMin` own, not calibratable; the 75 reasoned for both sliders |
| (b) the cells at their limits | an empty `gate.magic` leaves the slider's reading alone; `none` in `gate.magic` refused (magic that does not exist is never high) |
| (c) the gate record | clause (3) is high magic; `SkyGate.failed[].magicPriority?`; `skyGate`'s `dossierOwned.magicPriority`; a clause's dossier source defined (no map-side change can open it) |
| (c) report words, census consequence | "magic moderate, slider 50 — SettlementForge"; the census consequence restated for the slider |
| (d) 1, 3, 5, 9 | the recorded magic priority beside the recorded economy; a later `priorityMagic`, `magicLevel` or `magicExists` a note; `info.islandsGated`, `button.magicHigh` (the Magic set to high in one `group`, turning magic on where it is off) and the three dossier refusals name the slider; migration reads the magic priority absent 50 |
| (f) edges 1, 10, 11 | the truth table over slider × word × economy; `magicExists` false; the magic priority absent or out of range |
| (g) bars | the island fixture rule sets the Magic 100 with magic in the world; T115-1's two-part truth table; T115-2 with the slider cases (`medium` at 80 opens, `high` at 50 opens, `magicExists` false closes, absent 50, 140 → 100); T115-3, T115-5 (`'<dossier>@magic100@economy90'`), T115-6, T115-7, T115-9, T115-10 |
| (h) units: lexicon, content cells, fixtures | V10 `IntendInput.magicPriority?` and the magic row taking `magicPriority` 50 · 90; V11 row 56's `magicMin`; V12 `Level.intent.magicPriority?`, `'<dossier>@magic<m>'` and `'<dossier>@magicLevel<word>'` (high magic's fixture sets `priorityMagic` 100 and, separately, the word); V08's adapter row and `magic` row; model §2.8, determinism §7.7 layer 1 / items 1, 9, 11 / DR27 / §7.8, scope §14 and D-3 |
| choices list | `plain-summary.md`'s choices 13–17 replace the final's choices 9 and 12 |

## 2. Clashes between the three items, and the fix (the smallest that keeps both owners' words)

| # | clash | where | fix |
|---|---|---|---|
| C1 | Item 114 kept `priorityMagic` on the never-read list "(item 115 (a) 1)" and T114-11 said the port reads "no other slider (… the four others)"; the corrected 115 reads `priorityMagic`. | 114 (g), T114-11; the canon's item-1 row; V08's J-V8.45, BCR-V8-25, T-V8-20 | 114 (g): `priorityMagic` read once at creation by 115; §7.7 item 1 reads "but `priorityEconomy` and `priorityMagic`, each read once at creation (items 114, 115)"; T114-11 "and, for item 115, `config.priorityMagic` … the three others"; ONE T-V8-20 ignore clause for the three items. |
| C2 | Item 116's means in the highest allowed band called itself "the one exception to item 114 (c) (3)" — (c) (3) is "the field is untouched", and the read is not an exception. Item 114's final-notes proposed `lerp(hi_{c−1}, hi_c, f)` for the top means. | 116 (f); 114 (c) 4 | Executed both readings (`tmp/cap-stone.txt`): the upper ends are equal at every position because each band's `lo` is the band below's `hi`. So 116 (f) states once, at its home (model §2.6), that band c's interval row is item 114 (c) (4)'s continuous read for an interval row — upper end `R*_c`'s, lower end the band's own; V11's compile checks the rows contiguous (T116-32). 114 (c) 4 gains one pointer to it. |
| C3 | Item 116's top means was "read from `FieldBands.ceiling`", but the enceinte pick (S3, S5a) and the bridge feasibility (S4, S5b) run before S6 writes the record. | 116 (f); 114 (b) 2, (d) | The top means reads `ceilingAt` before S6 (as S2 does), the record after S6, the prelude's position at an epoch. 114 (b) 2 lists S3–S5b among `ceilingAt`'s callers; 114 (d) lists 116's readers of the record; T116-22 checks the two readings equal. |
| C4 | The owner's "stone … reserved for teh very rich" (116) meets "the economy slider determines the cieling prosperity" (114): a capped town has no rich band, so no very rich; 116 never said what that does to traded stone. | 116 (f), (o), T116-22 | Said once at 116 (f) (model §2.6): the very rich are the rich band; a town capped at `prosperous` or lower (economy 33⅓ or less) builds no house or institution of river- or road-borne stone at any rung, and of sea-borne stone only from a partner within about 17 km (TOWN), 29 km (CITY), 42 km (METROPOLIS); river-borne stone at the 30 km reference leg reaches a TOWN's very rich from economy 45 (receipt); works keep their factors. (o)'s row and T116-22 carry the clause; the canon's agreement checks cite it. |
| C5 | Item 114 holds an author's band above the prosperity ceiling (114 (c) 7), but T116-22 required "no plot's means above the top means". | T116-22, (o) | "… but a held band's (item 114 (c) (7))"; 116 (f): a held band reads its own row. |
| C6 | 116 (o)'s item-114 row said "no means above the top means … plots, institutions and works", contradicting the works factors (gate 1.2, castle 1.5) and T116-22. | 116 (o) | Restated as T116-22 reads: plots and institutions at most the top means × `rungMeans`, works at most the top means × their factors. |
| C7 | T114-1's no-op pin compared the default town with "today's town" (goldens, FM parity runs), but item 116's switch is on by default (and `FM` keeps it on), so the default town's materials change by 116, not by 114. | T114-1 | T114-1 compares against "the same town at `wealthLevel` 0.5 without this item, every other rule as filed (item 116's materials included)" — the pin tests 114's identity only. |
| C8 | T116-22 (the item-114 bar) was scheduled "nightly from M1", but item 114's prosperity ceiling lands at M2b with the prosperity field and its band set. | 116 (q) schedule | T116-22 nightly from M2b; the scope row, J-A116.01 and V12's bar-map row say so. |
| C9 | Two partial orders for the epoch prelude: 114 (e) "before S2's delta demand"; 116 (d) "after the epoch's slice, deposit states and `TradeFlow` apply and before any build". | 114 (e), 116 (d); V06 | One order stated at §4.11 (pipeline) and in 114 (e): the slice (magic in force, partners), deposit states and `TradeFlow`; the lived wealth; the prosperity ceiling's position; the material supply; then S2 and the builds. 116 (d) points to it; V06's EVO_PRELUDE builds it. |
| C10 | "Supply" named two concepts where the items meet: II.6's island supply law (V05's `held against its supply`, 114's `held_against_supply` / `fate.held.supply`) and item 116's material supply; 116 wrote "the settlement's supply" in its island sentences. | 116 (f), (i) Islands, (o), T116-23, (r) V05; 114 (h) | 116 says "material supply" wherever islands appear (and "never II.6's island supply law" once); 114 (h) glosses `fate.held.supply` as the island supply law's. |
| C11 | Late seats disagreed: 114–115's canon gave V03 and V04 no seat; 116 gave them late seats and listed the kernel as "late seat, no part" while omitting it from the landed units. | both canon rulings; 116 (r) | One list: late — model, pipeline, determinism, rendering, V03, V04; none — kernel (landed, no part); main — the rest. 114 (k) notes V03's and V04's late seats carry 116; 116 (r)'s header names the kernel among the landed units, its row "no seat". |
| C12 | Owner-message times: item 115 said "~00:54–00:56" and "bundle these into the rewrite phase" ~00:56. | 115 header, (h); J127; owner entries; canon ruling | 115 first message ~00:55, replacement ~00:58, "bundle these into the rewrite phase" ~01:00; 116 ~01:05, refined ~01:10; "bundle all this with g114-115" ~01:12; the trade decision ~01:33 — in the items, J rows, owner entries and ruling. |
| C13 | J-A ids broke the judgment index's rule ("the first digit of ⟨n⟩ names the part whose seat ruled — 0 scope, 2 model, 4 pipeline, 5–7 determinism, 8 rendering"): 114's .50–.55 and 115's .45, .47–.49 read as determinism or pipeline wrongly; 116's .41, .42, .48 (model rules) and .47 (a determinism rule) sat under 4. | 114 (k), 115 (h), 116 (r); the canon | Renumbered by the part that states the rule (table in §4); the canon ruling lists every title (the old final-notes are no longer the titles' home). |
| C14 | The `ownerRule` stamp's form: 115 `'115'`, the set `'110 (b)'`, 116 `'116 (n)'`. | 115 (b), (h) V11; V12 | `'115 (b)'`. |
| C15 | 116 minted "new volume bars … at the volume's next free id" for V02 (heavier part below), V07 (native-only village) and V08 (the fill reads only the named fields) — each already a T116 clause (T116-10, T116-3/T116-25's H-NATIVE, T116-13); V08's clause also meets 114's and 115's T-V8-20 extensions. | 116 (r) V02, V07, V08; the canon | No new ids: T-V2-25 extended with T116-10's clause; T116-3 and H-NATIVE run at the village rungs from V-M1; T-V8-20's one ignore clause extended (T116-13). |
| C16 | Registry ids: 114 and 115 name theirs (`intent.economyPriority`, `circumstances.magic`); 116's Trade control had none. Placement: 115 put the Magic in "Programme" by V09 §4.14's rule (group by consuming stage); 116 said only "the advanced panel". | 116 (p), (r) V09 | `circumstances.trade`, in the advanced panel's "Site" group (consuming stage S1) beside the Economy and the Wealth level (S0); the Magic in "Programme" (S2); the Economy on T1's basic panel (twelve controls). |
| C17 | Dossier-owned refusals had two homes: 114 and 115 put theirs in §7.7 item 11; 116 put the dossier-map partner refusal among §7.1's edit paths. | 116 (l), (r) determinism | Stated at §7.7 item 11 with the others (one list in the canon); §7.1 references it. |
| C18 | The clerk: 115 writes islands into the new document's params in creation mode and `adjust` in edit mode; 116's creation mode "proposed `adjust('circumstances.trade', …)`", an edit-mode event. | 116 (r) V10 | Creation mode writes the declared partner into the new document's creation-slice `trade` (as `magic` goes to the creation slice); edit mode proposes the `adjust`. |
| C19 | Surprise me: 114 draws the Economy; 116 draws no partner "since partners are circumstances and §7.7 layer 1 draws intent only"; the corrected 115 adds an intent (`magicPriority`). | 115 (a) 2 | Surprise me leaves the magic priority absent and the world's magic untouched — magic is a circumstance (116's reason) — so surprise towns are unchanged. |
| C20 | `gate.magic` admitting `none` would contradict "never where magic does not exist". | 115 (b) | Type `('low'\|'high')[]`; `none` refused at compile (T115-10). |
| C21 | Item 116's means rows are keyed by band id, item 114's band set is a pack's (`BandSet`); a pack with other bands had no means row. | 116 (f), T116-32 | Keyed by the band set's ids; a row-less band interpolated between its neighbours' rows at its rank, named by V11's compile. |
| C22 | The derived fixture form `'<dossier>@magic<word>'` (115) could not carry the slider the correction requires. | 115 (g), (h) V12 | `'<dossier>@magic<m>'` (the slider) and `'<dossier>@magicLevel<word>'` (the word), chained after `@pop×k` and beside 114's `@economy<e>`. |
| C23 | The routing twins listed only units with a part (114–115 omitted kernel, V03, V04; 116 omitted none but called the kernel late). | routing | One list of 18 units with `mode` main, late or none. |

## 3. Checked across the three items and the set — no clash

- **Band ids:** 114's default set (`squalid` 0 … `rich` 5), 116's means table and wealth words (the very rich = `rich`;
  richer = `prosperous`, `rich`; middling = `modest`, `comfortable`) and V11 row 6 agree; the pick reads the band the
  capped cuts give (114 (c) 2: "the lower of the band its cuts give and `c`"), with a district's range as 114 (c) 5 lowers
  it and institutions clamped at its ceiling band's `hi`.
- **Test ids:** T114-1 – T114-14, T115-1 – T115-10, T116-1 – T116-34 — 0 occurrences in `new/`, `docs/volumes/` and
  `ARCHITECTURE.md` before this bundle; every amended older id exists (`tmp/old-ids.txt`): T10-1, T13-1, T15-1, T19-3,
  T26-1, T71-1, T73-7, T8-5, T-V2-25, T-V5-1, T-V5-2, T-V5-15, T-V5-18, T-V6-16, T-V6-17, T-V6-66, T-V7-32, T-V8-20,
  T-V10-10, T-V10-17, T-V11-2, T-V11-28, CVR-V10-4. No older test is amended by two items in different ways except
  T-V8-20 (one clause, C15) and T-V11-2 (114's `ceiling` limits and 115's `gate` limits, two separate tables).
- **DR rows:** 114/115 amend DR6, DR7, DR8, DR9, DR27; 116 amends DR3, DR15 and adds DR41 (the table ends at DR40). No
  row is amended by two items but DR27's inputs (both priorities, from 114 and 115, one sentence).
- **Report codes, note kinds, fate reasons, records, fields:** `islands_gated` and 116's thirteen codes; `value_absent`,
  `value_clamped`, `frozen_fact_changed`, `partner_no_supplies` (+ existing `unmapped_word`); `held_above_ceiling`,
  `held_against_magic`, `held_against_economy`, `held_against_supply`; `BandSet`, `FieldBands.ceiling`, `SkyGate`,
  `MaterialSupply` and the rest — each once, 0 prior occurrences but `frozen_fact_changed` (W-DOS-08's, reused on purpose)
  and `BandSet` (named in §4.5 and V11 row 6, declared by 114). K19 is free (K1–K18; J-K19 is another namespace).
- **Shared units:** V05 (115's gate; 116's landfall credit and island material supply, "item 115's gate unchanged"), V08
  (adapter rows in one order), V09 (controls in one placement), V10, V11 (rows 6, 49, 56), V12 (one `Level.intent`) and
  the base parts agree on names, homes and order as the canon ruling's table states.
- **Item 115 × item 114:** every economy the gate admits (≥ 75) lies above the ceiling table's last row (50), so an
  island town is never capped; 116 then reads an island town's top means at 10 × `rungMeans`.
- **Owner words kept:** 114's "first generation" (the recorded priority), 115's "on the slider" (now read) and "both",
  116's "reserved for teh very rich" (the rich band's upper span, and none in a town capped below it), "cant … grow to have
  them" (the licence at every epoch), "bundle all this with g114-115" (one filing, one routing, one ruling).
- **Deferral wording:** none in the filed text (grep of "later", "TBD", "next round", "future" over the items finds only
  time words of the design — "a later rising", "a later epoch").

## 4. The J-A renumbering (C13)

| was | now | was | now | was | now |
|---|---|---|---|---|---|
| J-A114.41 | J-A114.71 | J-A114.50 | J-A114.21 | J-A115.47 | J-A115.73 |
| J-A114.42 | J-A114.72 | J-A114.51 | J-A114.74 | J-A115.48 | J-A115.74 |
| J-A114.43 | J-A114.73 | J-A114.52 | J-A114.47 | J-A115.49 | J-A115.75 |
| J-A114.44 | J-A114.41 | J-A114.53 | J-A114.48 | J-A115.50 | J-A115.45 |
| J-A114.45 | J-A114.42 | J-A114.54 | J-A114.75 | J-A115.51 | J-A115.46 |
| J-A114.46 | J-A114.43 | J-A114.55 | J-A114.81 | J-A116.41 | J-A116.22 |
| J-A114.47 | J-A114.44 | J-A115.41 | J-A115.41 | J-A116.42 | J-A116.23 |
| J-A114.48 | J-A114.45 | J-A115.42 | J-A115.71 | J-A116.43 | J-A116.41 |
| J-A114.49 | J-A114.46 | J-A115.43 | J-A115.42 | J-A116.44 | J-A116.42 |
| | | J-A115.44 | J-A115.43 | J-A116.45 | J-A116.43 |
| | | J-A115.45 | J-A115.72 | J-A116.46 | J-A116.44 |
| | | J-A115.46 | J-A115.44 | J-A116.47 | J-A116.71 |
| | | | | J-A116.48 | J-A116.24 |

J-A116.01, .21, .61 and .81 keep their numbers. None of the old ids was ever written into a design file (0 hits), so
nothing else moves.

## 5. Not changed, on purpose

- The two finals' reviewed decisions (every APPLIED / REJECTED of their final notes) stand; this check changed only what
  clashed between the items or the correction required.
- `held_against_supply` keeps its name (V05's existing words "held against its supply"); the gloss removes the
  ambiguity at less cost than a rename across V05, V09 and the fates.
- The standalone Magic's reading of "high" at 75 is fixed in the control; an edited `gate.magicMin` moves the gate alone
  (two concepts: the world's word, the gate's threshold; one default).
