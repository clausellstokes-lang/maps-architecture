# Fix pass over consistency-report.md: the rows the verifications changed (verify-owner D1, D2; verify-consistency
# VC-1, VC-16, VC-19, VC-22, VC-23, VC-27), each target asserted unique.
import sys
sys.path.insert(0, 'tmp')
from fx_lib import apply_plain

R = [
 ("**Outputs:** `items-114-116.md` (the three items as they will be appended), `routing.json` (18 units),\n`canon-ruling.md` (one ruling, dated 2026-09-30), `j-rows.md` (J126–J128), `owner-instructions-entry.md`,\n`plain-summary.md`, this report.",
  "**Outputs:** `items-114-116.md` (the three items as they will be appended), `routing.json` (18 units),\n`canon-ruling.md` (one ruling, dated 2026-09-30), `j-rows.md` (J126–J128), `owner-instructions-entry.md`,\n`plain-summary.md`, this report.\n\n**Verified** by `verify-owner.md` and `verify-consistency.md`; every required change is settled in `fix-notes.md`, and the\nrows below are updated where the fixes changed them."),
 ("| (b) \"HIGH\", `IslandRule.gate` | **high magic** defined; `gate: { magic: ('low'\\|'high')[]; magicMin: 75; economyMin: 75 }`; `magicMin` own, not calibratable; the 75 reasoned for both sliders |",
  "| (b) \"HIGH\", `IslandRule.gate` | **high magic** defined; `gate: { magic: ('low'\\|'high')[]; magicMin: 75; economyMin: 75 }`; the three cells own, not calibratable and unstamped (fix-notes D2); the 75 reasoned for both sliders |"),
 ("| (c) report words, census consequence | \"magic moderate, slider 50 — SettlementForge\";",
  "| (c) report words, census consequence | \"magic low, slider 50 — SettlementForge\" (the record carries the magic in force; fix-notes VC-23);"),
 ("T115-5 (`'<dossier>@magic100@economy90'`)", "T115-5 (`'<dossier>@economy90@magic100'`, the suffixes in V12's order)"),
 ("river-borne stone at the 30 km reference leg reaches a TOWN's very rich from economy 45 (receipt);",
  "river-borne stone at the 30 km reference leg reaches a TOWN's very rich from an economy of about 45.3 (receipt);"),
 ("114 (h) glosses `fate.held.supply` as the island supply law's. |",
  "the island fate ids renamed `held_against_island_supply` / `fate.held.islandSupply` after verification (fix-notes VC-19), and item 116's locked-element fate is `held_against_material_supply` / `fate.held.materialSupply` (VC-22). |"),
 ("| C12 | Owner-message times: item 115 said \"~00:54–00:56\" and \"bundle these into the rewrite phase\" ~00:56. | 115 header, (h); J127; owner entries; canon ruling | 115 first message ~00:55, replacement ~00:58, \"bundle these into the rewrite phase\" ~01:00; 116 ~01:05, refined ~01:10; \"bundle all this with g114-115\" ~01:12; the trade decision ~01:33 — in the items, J rows, owner entries and ruling. |",
  "| C12 | Owner-message times differed between the drafts and the program's list. | 115 header, (h); J127; owner entries; canon ruling | Settled after verification (fix-notes D1): the chat's send times are the source (the transcript's queue stamps, receipt `tmp/vo-chat-times.txt`) and the lane log the cross-check — 114 ~00:48; 115 ~00:54, replaced ~00:55; \"bundle these into the rewrite phase\" ~00:56; 116 ~01:08, refined ~01:10; \"bundle all this with g114-115\" ~01:10; the trade decision ~01:35 — in the items, J rows, owner entries and ruling. The program's list (~00:50 … ~01:33) put three messages after the lane-log lines that record them. |"),
 ("| C14 | The `ownerRule` stamp's form: 115 `'115'`, the set `'110 (b)'`, 116 `'116 (n)'`. | 115 (b), (h) V11; V12 | `'115 (b)'`. |",
  "| C14 | The `ownerRule` stamp's form: 115 `'115'`, the set `'110 (b)'`, 116 `'116 (n)'`. | 115 (b), (h) V11; V12 | First `'115 (b)'`; withdrawn after verification (fix-notes D2): the owner fixed the two clauses, not a cell, so 115's three `gate` cells carry no stamp; 116's `'116 (n)'` stays. |"),
 ("| C19 | Surprise me: 114 draws the Economy; 116 draws no partner \"since partners are circumstances and §7.7 layer 1 draws intent only\"; the corrected 115 adds an intent (`magicPriority`). | 115 (a) 2 | Surprise me leaves the magic priority absent and the world's magic untouched — magic is a circumstance (116's reason) — so surprise towns are unchanged. |",
  "| C19 | Surprise me: 114 draws the Economy; 116 draws no partner \"since partners are circumstances and §7.7 layer 1 draws intent only\"; the corrected 115 adds an intent (`magicPriority`). | 115 (a) 2 | Surprise me draws the economy priority in the wealth level's place and no other new intent; it leaves the magic priority absent and the world's magic untouched — the priority matters only where the world has magic, a circumstance Surprise me leaves (fix-notes VC-27). |"),
 ("`held_above_ceiling`,\n  `held_against_magic`, `held_against_economy`, `held_against_supply`;",
  "`held_above_ceiling`,\n  `held_against_magic`, `held_against_economy`, `held_against_island_supply`, `held_against_material_supply`;"),
 ("116's \"reserved for teh very rich\" (the rich band's upper span, and none in a town capped below it)",
  "116's \"reserved for teh very rich\" (the rich band's upper span; none in a town capped at `prosperous` or lower)"),
 ("- `held_against_supply` keeps its name (V05's existing words \"held against its supply\"); the gloss removes the\n  ambiguity at less cost than a rename across V05, V09 and the fates.",
  "- `held_against_supply` first kept its name; after verification it is renamed `held_against_island_supply` (and\n  `fate.held.supply` `fate.held.islandSupply`): both ids were new, so the rename costs nothing and replaces the gloss\n  (fix-notes VC-19). V05's words \"held against its supply\" stay."),
]
apply_plain('consistency-report.md', R)
print('ok')
