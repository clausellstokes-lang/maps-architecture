# Fix pass over canon-ruling.md (verify-owner D1, D2, D4, D12; verify-consistency VC-3, VC-5, VC-11, VC-13 - VC-15,
# VC-19, VC-21, VC-22, VC-27, VC-29, VC-30). Plain string replacement, each target asserted unique.
import sys
sys.path.insert(0, 'tmp')
from fx_lib import apply_plain

R = [
 # D1 times, D12 "The owner adopted"
 ("generation; owner ~00:50; J126)", "generation; owner ~00:48; J126)"),
 ("economy; owner ~00:55, replaced ~00:58; J127)", "economy; owner ~00:54, replaced ~00:55; J127)"),
 ("with prosperity; a material that is not native exists only by trade with a named settlement that has it; owner ~01:05,\nrefined ~01:10; J128).",
  "with prosperity; a material that is not native exists only by trade with a named settlement that has it; owner ~01:08,\nrefined ~01:10; J128)."),
 ("\"bundle these into the rewrite phase\" (~01:00, items 114 and 115)", "\"bundle these into the rewrite phase\" (~00:56, items 114 and 115)"),
 ("and \"bundle all this with g114-115\" (~01:12, item 116 with them). He adopted the program's recommendation on which trade\npartners count (~01:33):",
  "and \"bundle all this with g114-115\" (~01:10, item 116 with them). The owner adopted the program's recommendation on which\ntrade partners count (~01:35; `work/g116/read-owner-decision.md`):"),
 # D12 quote as sent
 ("The\nowner said \"only high magic ON THE SLIDER allows for floating islands in the initial generation\", then \"both high magic\nand high economy\".",
  "The\nowner said \"and only high magic on the slider allows for floating islands in the initial generation.\", then \"actually\nfloating islands has to have both high magic and high economy\"."),
 # VC-27
 ("Surprise me (the economy drawn as 100 × the wealth draw; no magic priority, no partner — Surprise me draws intent only and leaves the circumstances)",
  "Surprise me (the economy drawn as 100 × the wealth draw, and no other new intent; no magic priority — it matters only where the world has magic, a circumstance Surprise me leaves — and no partner, a circumstance)"),
 # VC-5, VC-21, VC-30
 ("`circumstances.magic` (the switch, S2), `intent.magicPriority` (S2, stepped at 75), `circumstances.trade` (S1 (11)), the `fissile` and `lead` toggles (S1 (10)), the materials switch (presets and tables editor);",
  "`circumstances.magic` (the switch \"No magic in this world\", S2, discrete), `intent.magicPriority` (S2, discrete: its levels split at 75, the word, and at `gate.magicMin`, the gate), `circumstances.trade` (\"Trade\", S1 (11), discrete over the declared partners), the `fissile` and `lead` requests (S1 (10), discrete), each with every §7.8 field (label, output metric, range, consuming stage, locality, continuity, anchor); the materials switch (presets and tables editor);"),
 # D4
 ("and THE VERY RICH ARE THE RICH BAND — a capped town builds no house or institution of river- or road-borne stone, sea-borne stone only from a near partner |",
  "and THE VERY RICH ARE THE RICH BAND — a town capped at `prosperous` or lower (economy 33⅓ or less on the default table) has no very rich: it builds no house or institution of river- or road-borne stone, sea-borne stone only from a near partner |"),
 # VC-3
 ("| pipeline II.6 (and S7b (5), §4.11) | V05, V06, V07 |",
  "| pipeline II.6 (and S7b (5), §4.11) (rules); V05 §3.2 (1)'s clause list, §3.2 (3)–(5) and §3.15 (4)–(5) (build) | V05 (§4.1's T1 row, §4.2's fates, §4.4's DR27 inputs cited), V06, V07 |"),
 # VC-19, VC-22
 ("| fates `held_above_ceiling`, `held_against_magic`, `held_against_economy`, `held_against_supply` (V05's island supply law, never item 116's material supply) as `EditFate { fate: 'kept', reason }` |",
  "| fates `held_above_ceiling`, `held_against_magic`, `held_against_economy`, `held_against_island_supply` (V05's island supply law) and `held_against_material_supply` (item 116: a locked element's material under a supply change) as `EditFate { fate: 'kept', reason }` |"),
 # VC-11, VC-14
 ("| roles, palettes, tiles, `lit` by covering, the Materials view's legend, exports and why; the Wealth key's closing line (\"Richest here: {band}\") | rendering §8.1, §8.2, §9.5, §11.1, §11.2 | V01, V07 (`painterly`), V09 |",
  "| roles, palettes, tiles, `lit` by covering, the Materials view's legend, exports and why; the Wealth key's closing line (\"Richest here: {band}\"; its words V09's key `legend.wealth.richest`) | rendering §8.1, §8.2, §9.5, §11.1, §11.2 | V01, V09 |\n| `painterly`'s material role values | V07 §5.1 | rendering |"),
 # VC-30
 ("\"Site\": the Economy, the Wealth level, the Trade control; \"Programme\": the Magic;",
  "\"Site\": the Economy, the Wealth level, the Trade control, the `fissile` and `lead` requests (consuming S1; outside the basic panel's count); \"Programme\": the Magic;"),
 # D2
 ("56 `islands` (`gate.magic` stamped `ownerRule: '115 (b)'`, `magicMin` and `economyMin` own)",
  "56 `islands` (the three `gate` cells own, not calibratable and unstamped: the owner fixed the two clauses, not a cell)"),
 # D2, VC-1, VC-29
 ("| `Level.intent { wealthLevel?, economyPriority?, magicPriority? }`, `Level.magic?`; the derived fixture suffixes `@economy<e>`, `@magic<m>`, `@magicLevel<word>` after `@pop×k`; §1's owner-rule list (the three rules, never their rows or thresholds; the stamps `'115 (b)'` and `'116 (n)'`) |",
  "| `Level.intent { wealthLevel?, economyPriority?, magicPriority? }`, `Level.magic?`, `Level.trade?` (declared partners, item 116); the derived fixture suffixes `@economy<e>`, `@magic<m>`, `@magicLevel<word>` chained after `@pop×k` in that order; §1's owner-rule list (the three rules, never their rows, cells or thresholds; the one stamp `'116 (n)'`) |"),
 # VC-19, VC-22 (new ids)
 ("| `held_above_ceiling`, `held_against_magic`, `held_against_economy`, `held_against_supply` | fate reasons |",
  "| `held_above_ceiling`, `held_against_magic`, `held_against_economy`, `held_against_island_supply`, `held_against_material_supply` | fate reasons |"),
 # VC-15
 ("Every id above is new in `docs/validation/coherence/new/`, `docs/volumes/` and `docs/ARCHITECTURE.md` (receipt\n`work/g114-116/tmp/id-census.txt`) but `frozen_fact_changed`, W-DOS-08's routed note reused on purpose;",
  "Every id above is new in `docs/validation/coherence/new/`, `docs/volumes/` and `docs/ARCHITECTURE.md` (receipts\n`work/g114-116/tmp/id-census.txt` and, for the ids the fix pass minted or renamed, `tmp/fx-census.txt`) but\n`frozen_fact_changed` (W-DOS-08's note, reused on purpose), `BandSet` (named in §4.5 and V11 row 6, declared here for the\nfirst time) and `skyGate` (V05 §3.2 (1)'s function, re-specified);"),
 # D4 agreement check
 ("A capped town has no very rich: it builds no house or\n  institution of river- or road-borne stone, sea-borne stone only from a near partner; its works keep their factors.",
  "A town capped at `prosperous` or lower (economy 33⅓ or\n  less on the default table) has no very rich: it builds no house or institution of river- or road-borne stone, sea-borne\n  stone only from a near partner; between 33⅓ and 50 it keeps the share f of its rich band; its works keep their factors."),
 # VC-19 agreement check
 ("II.6's island supply law (V05; `held_against_supply`) and item 116's material\n  supply, always so called where the two meet (V05, T116-23).",
  "II.6's island supply law (V05; `held_against_island_supply`) and item 116's\n  material supply (`held_against_material_supply`), always so called where the two meet (V05, T116-23)."),
]
apply_plain('canon-ruling.md', R)
print('ok')
