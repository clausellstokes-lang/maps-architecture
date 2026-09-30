# Fix pass over j-rows.md (verify-owner D1, D3, D4, D9, D10, D11, D12; verify-consistency VC-5, VC-6, VC-19, VC-22,
# VC-24, VC-25, VC-26). Each target asserted unique.
import sys
sys.path.insert(0, 'tmp')
from fx_lib import apply_plain

M1 = ("\"oh and material for buildings is determined by terrain, resoucres, and trade. paired with prosperity. Think about "
      "it. if you are in a river nearby a forrest for timber but no quarry, then most building material is going to be wood "
      "based. That is not to say that they can't have stone buildings, that would come from trade and be reserved for teh "
      "very rich as they are exotic and expensive to transport. Pairing all of this with neighborhood prosperity, if a town "
      "has both a quarry and timber, the richer areas will have buidlings mostly made out of the more expensive material "
      "stone, the middling areas will have buildings mixed btween wood and stone or individual buildings that is a "
      "combination of the two. Expand this to all relevant pieces. What do you think?\"")

R = [
 # ---- J126 ----
 ("| J126 | Owner (2026-09-30 ~00:50):", "| J126 | Owner (2026-09-30 ~00:48):"),
 ("entire map\"; then (~01:00) \"bundle these into the rewrite phase\" and (~01:12) \"bundle all this with g114-115\". Filed as OWNER RULE item 114",
  "entire map\"; then (~00:56) \"bundle these into the rewrite phase\" and (~01:10) \"bundle all this with g114-115\". Filed as OWNER RULE item 114"),
 ("50 and above → `rich` = none, linear), lifted", "50 and above → `rich` = none, linear; own, not calibratable, unstamped), lifted"),
 ("an author's drawn bands above it held; (d)", "an author's drawn bands above it held (`held_above_ceiling`); (d)"),
 ("(e) after the first generation the founding ceiling carried,", "(e) after the first generation the founding prosperity ceiling carried,"),
 ("(h)–(j) explanations, edges and bars T114-1 – T114-14", "(h)–(j) explanations (the Wealth key's closing line, its words V09's `legend.wealth.richest`), edges and bars T114-1 – T114-14"),
 ("the three items' cross-consistency in docs/validation/coherence/work/g114-116/consistency-report.md. (Opus 5.5 manager, pending Fable review, A-M2) | the owner's words set the rule;",
  "the three items' cross-consistency in docs/validation/coherence/work/g114-116/consistency-report.md, its verification settled in docs/validation/coherence/work/g114-116/fix-notes.md. (Opus 5.5 manager, pending Fable review, A-M2) | the owner's words set the rule;"),
 ("visibly removes the rich — and with them, by item 116, the very rich who alone pay for traded stone |",
  "visibly removes the rich — and with them, by item 116, the purse that pays for river- or road-borne stone |"),
 ("or let the ceiling follow the slider after creation |", "or let the prosperity ceiling follow the slider after creation |"),

 # ---- J127 ----
 ("| J127 | Owner (2026-09-30 ~00:55): \"and only high magic on the slider allows for floating islands in the initial generation.\"; then (~00:58), replacing it, \"actually floating islands has to have both high magic and high economy\"; then (~01:00) \"bundle these into the rewrite phase\" and (~01:12) \"bundle all this with g114-115\".",
  "| J127 | Owner (2026-09-30 ~00:54): \"and only high magic on the slider allows for floating islands in the initial generation.\"; then (~00:55), replacing it, \"actually floating islands has to have both high magic and high economy\"; then (~00:56) \"bundle these into the rewrite phase\" and (~01:10) \"bundle all this with g114-115\"."),
 ("moderate and medium read low, `magicExists` false reads none — creation-only",
  "moderate and medium read low, `magicExists` false reads none, an absent word none until the author sets it — creation-only"),
 ("(b) HIGH MAGIC holds where magic exists and the magic priority is 75 or more or the word is `high`, never in a world without magic; a high economy is 75 or more (both thresholds the program's pick);",
  "(b) HIGH MAGIC holds where magic exists and the magic priority is at or above `gate.magicMin` or the word is `high`, never in a world without magic; a high economy is at or above `gate.economyMin`; both 75 by default (the program's pick), the three `gate` cells own and unstamped (the owner fixed the two clauses, not a cell);"),
 ("one `skyGate` function and an `islands_gated` report entry;", "one `skyGate` function and an `islands_gated` report entry (an outcome, never a failure);"),
 ("the Islands switch disabled with a reason where SettlementForge's own values close the gate;",
  "the Islands control disabled with a reason where SettlementForge's own values close the gate, its buttons committing the gate's thresholds;"),
 ("the three sample cards meet the gate at their unrecorded values.", "the three sample cards meet the gate at the values their dossiers carry (not recorded by the survey)."),
 ("ROUTING: as J126; V05 is the principal build home.", "ROUTING: as J126; V05 is the principal build home, II.6 the rules' home."),
 ("vetoable: owner may read SettlementForge's word alone (the final's reading), pick other thresholds, start standalone worlds with magic, or gate only the first generation |",
  "vetoable: owner may read the magic slider alone (drop SettlementForge's word `high` as an alternative), read SettlementForge's word alone (the final's reading), pick other thresholds, start standalone worlds with magic, read a dossier's missing magic word as low, or gate only the first generation |"),

 # ---- J128 ----
 ("| J128 | Owner (2026-09-30 ~01:05): \"oh and material for buildings is determined by terrain, resoucres, and trade. paired with prosperity. … if a town has both a quarry and timber, the richer areas will have buidlings mostly made out of the more expensive material stone, the middling areas will have buildings mixed btween wood and stone or individual buildings that is a combination of the two. Expand this to all relevant pieces.\"; refined ~01:10: \"material not native requires trade which means isoalted settlements cant have non nattive materials or grow to have them until and unless they trade specifcially with another settlement that has that material.\"; ~01:12 \"bundle all this with g114-115\"; ~01:33, on which partners count, the program's recommendation adopted:",
  "| J128 | Owner (2026-09-30 ~01:08): " + M1 + "; then (~01:10) \"also to say that material not native requires trade which means isoalted settlements cant have non nattive materials or grow to have them until and unless they trade specifcially with another settlement that has that material.\"; (~01:10) \"bundle all this with g114-115\"; (~01:35), on which partners count, the program's recommendation adopted:"),
 ("(b) NATIVE by land over the creation arena", "(b) NATIVE (the owner's word; what counts as the settlement's own is the program's reading) by land over the creation arena"),
 ("(c) TRADED only through a named partner whose records show the family (`TradePartner.supplies`, filled by DR3 from the dossier; a standalone declared partner a licence only, outside TradeFlow, through the Trade control `circumstances.trade`; hostile and derived partners none;",
  "(c) TRADED only through a named partner whose records show the family — by the owner's decision of ~01:35 every neighbour SettlementForge names counts, a settlement with no named neighbour is native-only, and a standalone map has its recipe's own partner list, empty by default (`TradePartner.supplies`, filled by DR3 from the dossier; a standalone declared partner a licence only, outside TradeFlow, through the Trade control `circumstances.trade`; a hostile or suppressed partner none, the program's one narrowing of that decision, and derived partners none;"),
 ("— so a town capped below `rich` has no very rich and builds no house or institution of river- or road-borne stone;",
  "— so a town capped at `prosperous` or lower (an economy of 33⅓ or less on the default table) has no very rich and builds no house or institution of river- or road-borne stone, and of sea-borne stone only from a near partner;"),
 ("(l) edits win on their element while growth never adds a material the settlement cannot have;",
  "(l) edits win on their element while growth never adds a material the settlement cannot have, a locked element holding under a supply change (`held_against_material_supply`);"),
 ("(o)–(q) edges, wiring (F-MATERIAL, report codes, DR41, DR3 and DR15 amended, K19)",
  "(o)–(q) edges, wiring (F-MATERIAL, report codes, DR41, DR3 and DR15 amended, K19, `bend.material.supplyFollows`)"),
 ("harmonized with items 114 and 115 in docs/validation/coherence/work/g114-116/consistency-report.md.",
  "harmonized with items 114 and 115 in docs/validation/coherence/work/g114-116/consistency-report.md and verified, settled in docs/validation/coherence/work/g114-116/fix-notes.md."),
 ("vetoable: every interpretation in item 116, notably the arena as \"nearby\", institutions bounded by their neighbourhood, the works purse, the history replay's partners,",
  "vetoable: every interpretation in item 116, notably the arena as \"nearby\", the ruins as a native source, a hostile or suppressed neighbour excluded, institutions bounded by their neighbourhood, the works purse, a structure's kind (never its material's look) following the supply, the history replay's partners,"),
]
apply_plain('j-rows.md', R)
print('ok')
