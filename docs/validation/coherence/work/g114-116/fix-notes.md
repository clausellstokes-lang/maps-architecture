# Fix notes — the bundle of owner rules 114, 115 and 116 after its two verifications

> Fix seat (Opus 5.5 standing in, PENDING FABLE REVIEW), 2026-09-30. Settles every required change of
> `verify-owner.md` (D1–D12) and `verify-consistency.md` (VC-1 – VC-30) in the merged files. None is rejected; five are
> applied in a form other than the one the verifier wrote (D7, D9, VC-18, VC-22, VC-30), each for the reason in its row,
> and where a verifier offered alternatives the row names the one taken.

**Read whole:** `verify-owner.md`, `verify-consistency.md`, and the whole of each merged file: `items-114-116.md` (the three
items), `routing.json` (18 units, unrolled in `tmp/fx-routing-read.txt`), `canon-ruling.md`, `j-rows.md`,
`owner-instructions-entry.md`, `plain-summary.md`, `consistency-report.md`. **Sources and design:**
`work/g114-115/program-correction.md`, `work/g116/read-owner-decision.md`, `docs/lane-events.log` l.1836–1871,
`tmp/vo-chat-times.txt`, `tmp/cap-stone.txt`, and the design passages each fix leans on. These are
`new/base/determinism/03-s7-editing.md` (§7.1's home-tool table l.413–418; §7.6's `ownerRule` l.1285–1295; §7.8's registry
fields l.1943–1950 and budget l.1998–2008; `CircumstanceSlice` l.1499–1506), `01-s5-failure-handling.md` (§5.4's code
table l.268–285), `new/base/pipeline/01-s4-generation-pipeline.md` (the Works pauses l.3668–3674, `WorksTable`
l.3750–3757), `new/base/scope/05-s1.md` §1.2 and `07-s14.md` (`site.access: string`, l.244). In the volumes: V05 (the words
"held against its supply", l.859, 1456, 2058, 2751), V07 §5.1 (`painterly`, l.3084), V08 §2.6's `access` row (l.769–772),
V09 (T1's sheet l.1566; §4.14 l.2226), V11 row 48 `works` (l.909), and V12 §2.10 (`ownerRule`, l.880–892), `Level`
(l.751–756) and the register rule (l.2162).

**Receipts** (in `tmp/`): `fx-backup/` (every merged file as it stood before this pass); `fx_lib.py` (paragraph-aware
replacement: every target asserted to occur exactly the stated number of times, and only the paragraphs a change touched
rewrapped at the file's width of 125); `fx-items.py`, `fx-routing.py`, `fx-canon.py`, `fx-jrows.py`, `fx-owner.py` and
`fx-report.py` (every edit, target by target); `fx-census.txt` (every id this pass mints or renames: 0 occurrences in `new/`,
`docs/volumes/`, `ARCHITECTURE.md` or any other doc). A word diff of the items against `fx-backup/` shows 131 changed runs,
each one of the edits below and nothing else.

---

## Verify-owner (owner words and the correction)

| # | settled | where |
|---|---|---|
| D1 times | APPLIED. The chat's send times are the source and the lane log the cross-check: 114 ~00:48; 115 ~00:54, replaced ~00:55; "bundle these" ~00:56; 116 ~01:08, refined ~01:10; "bundle all this" ~01:10; the trade decision ~01:35. Checked first-hand in the lane log, which the program's list cites as its own source: l.1842, stamped 00:56, already records 115's replacement and "bundle these" (the list said ~00:58 and ~01:00); l.1850, stamped 01:10, records "bundle all this" (the list said ~01:12); l.1842 cites the interrupt at 00:54:07. Every time the chat receipt gives fits every lane-log line. Item 116's head gives each quotation its own time. | items l.1, 3–4, (k) and (h) heads, 115 head, 116 head, (r) head; owner entry; canon *Basis*; J126–J128; report C12 |
| D2 stamp | APPLIED. `gate.magic` loses `ownerRule: '115 (b)'`. All three `gate` cells are own, not calibratable and unstamped. 115 (b) now says the owner fixed the two conjunctive clauses (high magic on the slider, a high economy), not the word list, 75 or any row, and that SettlementForge's word beside the slider is the program's correction. The register rule (V12 l.2162) stamps a cell that "encodes an OWNER RULE item's hard clause"; no `gate` cell does, since the conjunction lives in II.6's rule. The one stamp left is `'116 (n)'`. The limits sentence no longer says "not bound by the stamp". | 115 (b), (h) V11; routing V11 part/states, V12 part/shared; canon V11 and V12 rows; report C14 and §1 |
| D3 veto | APPLIED. J127's veto list opens with "read the magic slider alone (drop SettlementForge's word `high` as an alternative)". The plain summary lists "`high` is 75 or more" and "SettlementForge's word also counts" as choices, never the owner's slider. | J127; plain summary |
| D4 very rich | APPLIED, merged with VC-6 in one wording. "No very rich" and "no river- or road-borne stone" now hold only for a town capped at `prosperous` or lower (economy 33⅓ or less); between 33⅓ and 50 the town keeps the share f of its rich band. The owner entry says "sea-borne only from a near partner". J126 reads "the purse that pays for river- or road-borne stone". Checked against `tmp/cap-stone.txt`. | 116 (f); canon means row and agreement check; owner entry; J126; J128 |
| D5 owner entry | APPLIED. Each rule bullet gives the owner's words, then "by the program's reading (vetoable, J122)" before the program's part. 116's bullet reads "the owner's rule as the program reads it". | owner entry |
| D6 plain summary | APPLIED. Each rule gives "You said: …" first, then "I chose (vetoable): …". "Step by step" became "smooth between". "At the first generation" is restored in 115. The claim "never appear without magic" now separates rule-driven rising from hand placement. 116's title drops the ruins, the very-rich example is given, and the ~01:35 decision is the owner's. The partnerless-town sentence is replaced by the ruins' exception. | plain summary |
| D7 choices | APPLIED in substance, reworded to fit the 450-word limit the program sets for the summary. Choice 5: the prosperity ceiling holds and later wealth may lift it. Choice 10: "Surprise me" draws only the Economy, with no claim that towns "look as before". Choice 16: the Magic slider drives the world's magic, and the "No magic" switch is on by default. Choice 31: the ruins, a partnerless town's only way beyond its land. Choice 38: TOWN only, "a town's walls use sea-borne stone at most". Choice 42: "structures may change kind … buildings only texture and colour, as you ruled". The city and metropolis wall shares stay in item 116 (f) and are not repeated. | plain summary |
| D8 consequences | APPLIED. At SettlementForge's default sliders no city gets islands. Most SettlementForge maps start native-only, and a stand-alone map needs a partner the owner adds. | plain summary |
| D9 attribution | APPLIED. (c)'s dossier paragraph is the owner's decision of ~01:35, adopting the program's recommendation, and cites `read-owner-decision.md`. The stand-alone list is the owner's decision, with its details the program's. The hostile or suppressed exclusion is "the program's one narrowing of the decision the owner adopted". Changed from the verifier's text: the verifier quoted "every neighbour SettlementForge names" as the owner's words. The owner wrote "its your recomendation", so the phrase is quoted as the adopted decision's. | 116 (c); owner entry ~01:35 bullet; J128 |
| D10 native | APPLIED. What counts as "native" (by land or by ruins) is marked the program's reading. The quotation keeps the owner's spelling: isolated settlements ("isoalted settlements"). | 116 (a); J128 |
| D11 absent word | APPLIED, choosing the verifier's first option. A dossier with `priorityMagic` but no `magicLevel` reads a world without magic, a map fact, until the author sets it, so the slider alone opens no island (source `map`; `button.magicHigh` opens it in one click). Marked the program's reading (vetoable). The alternative (read the absent word as `low`) is named and offered in J127's veto list. Reason: 115 (a) 1 already fills an absent word from the map's magic (D-3), and T115-7 and (d) 9 rest on that rule. The design's "magic in force" `none` is what "magic does not exist" means to every other reader. SettlementForge's step 1 always resolves the word, so only malformed or older dossiers meet the case. | 115 (a) 1, (f) 10, T115-2; J127; plain summary |
| D12 quotations | APPLIED. The canon quotes the 115 messages as sent, in lower case. "He adopted" becomes "The owner adopted". J128 quotes both 116 messages whole. | canon *Basis* and correction; J128 |

## Verify-consistency (ids, homes, routing)

| # | settled | where |
|---|---|---|
| VC-1 | APPLIED: `'<dossier>@economy90@magic100'`. 115 (h) V12 states the order `@economy`, `@magic`, `@magicLevel` after `'@pop×k'`. | T115-5; 115 (h) V12; routing V12; report §1 |
| VC-2 | APPLIED: "§6.2's recorded inputs gain the recipe's magic priority, beside item 114's economy priority". | 115 (h) determinism |
| VC-3 | APPLIED. II.6 holds the rules. V05 builds §3.2 (1)'s clause list, §3.2 (3)–(5) and §3.15 (4)–(5) "as II.6 states them". §4.2 cites §7.4's fates, §4.4 cites DR27's inputs, and §4.1's T1 row cites §7.1's. | 115 (h) V05; routing V05 part, states, references; canon island-gate row |
| VC-4 | APPLIED. The `ceiling` cell's `presets` entries are stated at §4.5 only. §7.6 lists the cell and cites §4.5, and V11 registers the cell "with its `presets` entries as §4.5 states them". | 114 (k) determinism, V11; routing determinism, V11 |
| VC-5 | APPLIED. The buttons commit `gate.magicMin` / `gate.economyMin`, the messages take `{magicMin}` / `{economyMin}`, and 114 (a) 4's step is at `gate.economyMin` (75 by default). T115-6 and T115-10 test cells edited to 80. The control's own word stays at 75, as 115 (a) 2 already rules. | 114 (a) 4; 115 (d) 5, T115-6, T115-10; routing V09, determinism; canon registry row |
| VC-6 | APPLIED with D4 (one wording). | J126, J128, owner entry |
| VC-7 | APPLIED, first option: `access?: string`, a word of V08 §2.6's `access` row, typed as §14 types `site.access`. No new type is declared. | 116 (c) |
| VC-8 | APPLIED: V08 §2.5 cites §14 for the digest additions and declares none. | routing V08 |
| VC-9 | APPLIED: S10a's surface gate moves from pipeline STATES to REFERENCES ("S10a runs V01 §3.7.3's gate"). V01 remains its home. | 116 (r) pipeline; routing pipeline part, states, references |
| VC-10 | APPLIED: V06 builds §4.11's order and does not restate it. | routing V06 |
| VC-11 | APPLIED: rendering §8.2 holds the rule, and its words are V09's key `legend.wealth.richest`. | 114 (h), (k) V09; routing rendering, V09; canon rendering row |
| VC-12 | APPLIED: the placement sentence leaves determinism's "stated once here" paragraph, and determinism cites V09 (§4.14). | routing determinism |
| VC-13 | APPLIED, first option: §1.2's one-click default gains "the materials switch on (item 116's supply model)". The canon row already said so. | 116 (r) scope; routing scope part, states |
| VC-14 | APPLIED: the row "`painterly`'s material role values, home V07 §5.1, cited by rendering" is restored (V07 l.3084), and V07 is struck from rendering's citing list. | canon |
| VC-15 | APPLIED: `frozen_fact_changed`, `BandSet` and `skyGate` are named as existing ids, and `tmp/fx-census.txt` is cited. | canon new-ids paragraph |
| VC-16 | APPLIED: "from an economy of about 45.3" (the receipt's 45.3; at 45 the top means is 8.35 < 8.46). | 116 (f); report C4 |
| VC-17 | APPLIED: the cap is "modest" at 0, "comfortable" to 16, "prosperous" to 33, none from 50, smooth between. The consequence reads "Economy 33 or less". The "Surprise me" wording is corrected. | plain summary |
| VC-18 | APPLIED, with a named button: `bend.material.supplyFollows` ("The materials follow what the land, the ruins and trade supply.") with `button.openTrade`, which opens the Trade control, or on a dossier map its read-only trade panel. This follows item 114's `bend.ceiling.follows` with `button.openEconomy`. The verifier said only "the Trade control's button", so the key is minted here (0 prior uses). | 116 (p), (r) V09; routing V09; J128 |
| VC-19 | APPLIED: `held_against_island_supply` and `fate.held.islandSupply` (both new ids, 0 prior uses; V05's words stay). The gloss is removed. | 114 (h), (k) V09; 115 (d) 4; routing determinism, V09; canon fates, new ids, agreement check; report C10, §3, §5 |
| VC-20 | APPLIED: a Works key `masonry`, `timber` or `earth` is the mass; any other key is a material id; the `timber` → `boards` alias applies to stored material fields only. The base's pause rows are re-keyed by mass (`stone` → `masonry`) in V11 row 48 `works`, the table's home. | 116 (i) Works, (r) V11; routing V11 |
| VC-21 | APPLIED: every registry row carries §7.8's full field set. `intent.magicPriority` is *discrete*, its levels split at 75 (the word) and at `gate.magicMin` (the gate), shown as a stepped slider. `circumstances.magic` is labelled "No magic in this world", with the magic in force as its metric and anchor II.6. `circumstances.trade` is labelled "Trade", with the families traded as its metric and the declared partners as its levels. `fissile` / `lead` have `Terrain.fissile` / `.lead` as metrics and anchor §4.2 S1 (10). "Stepped" is gone. | 115 (a) 2; 116 (p); routing determinism; canon registry row |
| VC-22 | APPLIED, with a different id: `held_against_material_supply` and `fate.held.materialSupply`, not `held_against_materials`. This keeps one term per concept ("material supply") and mirrors VC-19's `held_against_island_supply`. (0 prior uses.) | 116 (l), (o); routing determinism, V09; canon fates, new ids; J128 |
| VC-23 | APPLIED, first option: the examples read "magic low, slider 50 — SettlementForge", because the record carries the magic in force. No raw-word field is added. | 115 (a) 1, (c); routing V09; report §1 |
| VC-24 | APPLIED: §5.4's row `islands_gated`, with class cell "the island gate closed (II.6; item 115) — an outcome, never a failure" and landing `requestedVsBuilt`. | 115 (c), (h) determinism; routing determinism |
| VC-25 | APPLIED: the three sample cards meet the gate "at the values their dossiers carry (not recorded by the survey)". | T115-2; J127; routing V08 |
| VC-26 | APPLIED: "prosperity ceiling" in J126 (twice) and in the owner entry (twice). | J126; owner entry |
| VC-27 | APPLIED: Surprise me draws the economy priority in the wealth level's place and no other new intent. The magic priority matters only where the world has magic, a circumstance Surprise me leaves. 116 (c)'s own reason for partners was right and is kept. | 115 (a) 2; canon layer-1 row; report C19 |
| VC-28 | APPLIED, first option: "T1 binding row (Magic)". §7.1's T1 row (`adjust (intent, …)`, l.415) already covers the Economy, an intent; the Magic's creation-slice word is the circumstance it gains. | routing determinism |
| VC-29 | APPLIED: `Level.trade?: TradePartner[]` (declared partners, `source: 'declared'`, the fixture's creation-slice trade) joins the one `Level` declaration (V12 l.751–756 has no such field). | 116 (r) V12; routing V12; canon V12 row |
| VC-30 | APPLIED, simplified: the `fissile` and `lead` requests are rows of the advanced panel's "Site" group (consuming S1), outside the basic panel's count. The site card (T1's water setting and side, V09 l.1566; §7.8 l.2004) does not carry them. Placing them on the card would have widened a basic control. After generation the terrain row's `setAttr` edits them, as it edits `geology`. | 116 (p), (r) V09; routing V09; canon placement row |

## For the program (filing, outside the bundle)

- The workflow's `lateRouting` default is still `work/g114-115/routing.json` (`workflows/18-coherence.js` l.43). The lane
  log's l.1850 names `work/g114-116-routing.json`, which does not exist. The run must pass `lateItems: '114-116'`,
  `lateRouting: 'docs/validation/coherence/work/g114-116/routing.json'` and
  `lateUnits: ['model', 'pipeline', 'determinism', 'rendering', 'V03', 'V04']`. The kernel is landed with no part (`none`)
  and takes no seat.
- The owner times differ from the program's own list (D1). If the program writes these times anywhere outside the
  bundle, it takes them from here.
- `plain-summary.md` is 443 words (`wc -w`). It is the summary returned to the program.
