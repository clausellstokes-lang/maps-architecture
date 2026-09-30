# Fix pass over items-114-116.md: every required change of verify-owner.md (D1-D12) and verify-consistency.md
# (VC-1 - VC-30) that touches the items, each target asserted to occur the stated number of times.
import sys
sys.path.insert(0, 'tmp')
from fx_lib import apply

R = [
 # ---- D1: the owner's message times by the chat's send times (lane log as the cross-check) ----
 ("(owner, 2026-09-30 ~00:50; J126).**", "(owner, 2026-09-30 ~00:48; J126).**"),
 ("of this item and item 115 (~01:00): \"bundle these into the rewrite phase\"; and, of items 114–116 (~01:12): \"bundle all this with g114-115\".",
  "of this item and item 115 (~00:56): \"bundle these into the rewrite phase\"; and, of items 114–116 (~01:10): \"bundle all this with g114-115\"."),
 ("(owner, 2026-09-30 ~01:00: \"bundle these into the rewrite phase\"; ~01:12: \"bundle all this with g114-115\")",
  "(owner, 2026-09-30 ~00:56: \"bundle these into the rewrite phase\"; ~01:10: \"bundle all this with g114-115\")", 2),
 ("(owner, 2026-09-30 ~00:55, replaced ~00:58; J127).** Owner (~00:55): \"and only high magic on the slider allows for floating islands in the initial generation.\", then (~00:58), replacing it: \"actually floating islands has to have both high magic and high economy\" — and (~01:00) \"bundle these into the rewrite phase\"; (~01:12, with item 116) \"bundle all this with g114-115\".",
  "(owner, 2026-09-30 ~00:54, replaced ~00:55; J127).** Owner (~00:54): \"and only high magic on the slider allows for floating islands in the initial generation.\", then (~00:55), replacing it: \"actually floating islands has to have both high magic and high economy\" — and (~00:56) \"bundle these into the rewrite phase\"; (~01:10, with item 116) \"bundle all this with g114-115\"."),
 ("(owner, 2026-09-30 ~01:05; refined ~01:10; filed under J122 and J128).** Owner: \"oh and material",
  "(owner, 2026-09-30 ~01:08; refined ~01:10; filed under J122 and J128).** Owner (~01:08): \"oh and material"),
 ("What do you think?\" / \"also to say that material not native",
  "What do you think?\" / (~01:10) \"also to say that material not native"),
 ("/ (~01:12) \"bundle all this with g114-115\" / (~01:33, on which partners count,",
  "/ (~01:10) \"bundle all this with g114-115\" / (~01:35, on which partners count,"),
 ("bundled with items 114 and 115 (owner, ~01:12: \"bundle all this with g114-115\")",
  "bundled with items 114 and 115 (owner, ~01:10: \"bundle all this with g114-115\")"),

 # ---- 114 (a) 4 (VC-5) ----
 ("continuous, with item 115's economy clause a declared owner step at 75, reported, outside the sweep",
  "continuous, with item 115's economy clause a declared owner step at `gate.economyMin` (75 by default), reported, outside the sweep"),

 # ---- 114 (h) (VC-11, VC-19) ----
 ("closes, where `FieldBands.ceiling` is present, with \"Richest here: {band}\".",
  "closes, where `FieldBands.ceiling` is present, with \"Richest here: {band}\" — the line §8.2's, its words V09's key `legend.wealth.richest`."),
 ("The fate rows are `fate.held.ceiling` and, for V05's existing `held against its supply` — the island supply law's, II.6, never item 116's material supply — (`reason: 'held_against_supply'`), `fate.held.supply`.",
  "The fate rows are `fate.held.ceiling` and, for V05's existing words `held against its supply` (II.6's island supply law), `fate.held.islandSupply` (`reason: 'held_against_island_supply'`)."),

 # ---- 114 (k) determinism (VC-4), V09 (VC-11, VC-19), V11 (VC-4) ----
 ("§7.6's `ceiling` cell with its parity entries;",
  "§7.6's list of the cells that carry `presets` entries gaining the `ceiling` cell, citing §4.5 for its entries;"),
 ("`fate.held.ceiling`, `fate.held.supply`, `report.ceiling`, the Wealth view's legend line, and BCR-V9-2's cells.",
  "`fate.held.ceiling`, `fate.held.islandSupply`, `report.ceiling`, the key `legend.wealth.richest` (the words of §8.2's closing line of the Wealth key, which rendering states), and BCR-V9-2's cells."),
 ("(provenance `own`, `calibratable: false`, its parity entries) and its compiler bars (T-V11-2)",
  "(provenance `own`, `calibratable: false`, its `presets` entries as §4.5 states them) and its compiler bars (T-V11-2)"),

 # ---- 115 (a) 1 (VC-23, D11) ----
 ("The report names both values and their source (\"magic moderate, slider 50 — SettlementForge\").",
  "The report names both values and their source (\"magic low, slider 50 — SettlementForge\" for a `moderate` world: the record carries the magic in force)."),
 ("`none` under D-3, a map fact the author may change.",
  "`none` under D-3, a map fact the author may change. So a dossier carrying `priorityMagic` but no `magicLevel` reads a world without magic until the author sets its magic, and its slider alone opens no island — the program's reading (vetoable; D-3; the alternative: read an absent word as `low` where `magicExists` is not false, SettlementForge's default); SettlementForge's step 1 always resolves the word, so only a malformed or older dossier meets it."),

 # ---- 115 (a) 2 (VC-21, VC-27) ----
 ("`intent.magicPriority` (consuming stage S2, V11 §3.5's magic-gated classes; locality *re-derive from S2*; stepped — its one step at 75 a declared owner step, reported, outside the sweep; anchor II.6) and `circumstances.magic`, the switch (the timeline's first entry; S2; *re-derive from S2*; discrete).",
  "`intent.magicPriority` (label \"Magic\"; output metric the magic word it reads (standalone) and the gate's magic clause; range 0–100; consuming stage S2, V11 §3.5's magic-gated classes; locality *re-derive from S2*; continuity *discrete*, its levels split at 75 (the word) and at `gate.magicMin` (the gate, 75 by default), shown as a stepped slider, reported, outside the sweep; anchor II.6) and `circumstances.magic`, the switch (label \"No magic in this world\"; output metric the magic in force; the timeline's first entry; S2; *re-derive from S2*; *discrete*, on · off; anchor II.6)."),
 ("Surprise me leaves the magic priority absent and the world's magic untouched: magic is a circumstance, and Surprise me draws intent only (item 116 (c)'s reason).",
  "Surprise me leaves the magic priority absent and the world's magic untouched: it draws the economy priority in the wealth level's place and no other new intent, and the magic priority matters only where the world has magic, a circumstance Surprise me leaves as it is (no magic by default, D-3)."),

 # ---- 115 (b) (D2) ----
 ("`gate.magic` carries `ownerRule: '115 (b)'` — the owner's \"high magic\"; `magicMin` and `economyMin` carry provenance `own` and `calibratable: false` (\"no corpus measures a slider\"): the owner fixed the two conjunctive clauses, the magic slider and the word high, not 75, and V12 §1 lists the rule.",
  "All three cells carry provenance `own`, `calibratable: false` (\"no corpus measures a slider\") and no `ownerRule` stamp. The owner fixed the two conjunctive clauses — high magic on the magic slider, and a high economy — not the word list, not 75 and no row. So V12 §1 lists the rule, never the cells, as item 114 (b) 1 does for its rows. SettlementForge's word `high` beside the slider is the program's correction (vetoable)."),
 ("an author's `editTable` of either is not bound by the stamp (IN-V11-1) and is named in the report (\"islands gate edited (owner rule 115)\"), re-deriving from S7b.",
  "an author's `editTable` of any `gate` cell is named in the report (\"islands gate edited (owner rule 115)\"), re-deriving from S7b."),

 # ---- 115 (c) (VC-23, VC-24) ----
 ("its source (\"magic moderate, slider 50 — SettlementForge\"; \"economy 50 — this town\").",
  "its source (\"magic low, slider 50 — SettlementForge\"; \"economy 50 — this town\")."),
 ("§5.4's `ReportCode` gains `islands_gated`, an outcome, never a failure;",
  "§5.4's `ReportCode` gains `islands_gated`, its row's class cell \"the island gate closed (II.6; item 115) — an outcome, never a failure\" and its landing `requestedVsBuilt`;"),

 # ---- 115 (d) 4 (VC-19), (d) 5 (VC-5) ----
 ("confirmed at the dry run beside V05's `held_against_supply` (J-V5.10 extended)",
  "confirmed at the dry run beside V05's `held_against_island_supply` (J-V5.10 extended)"),
 ("\"Floating islands need high magic — 75 or more on the Magic — and an economy of 75 or more.\"",
  "\"Floating islands need high magic — {magicMin} or more on the Magic — and an economy of {economyMin} or more.\" (args the gate's `magicMin` and `economyMin`)"),
 ("`adjust('circumstances.magic', 'high')` where the world has no magic, and `adjust('intent.magicPriority', 75)` where the magic priority is below 75)",
  "`adjust('circumstances.magic', 'high')` where the world has no magic, and `adjust('intent.magicPriority', gate.magicMin)` where the magic priority is below `gate.magicMin`)"),
 ("`event:economyHigh` = `adjust('intent.economyPriority', 75)`)",
  "`event:economyHigh` = `adjust('intent.economyPriority', gate.economyMin)`)"),
 ("\"SettlementForge sets this town's economy to {economy}; floating islands need an economy of 75 or more.\"",
  "\"SettlementForge sets this town's economy to {economy}; floating islands need an economy of {economyMin} or more.\""),
 ("and its economy to {economy}; floating islands need high magic and an economy of 75 or more.\"",
  "and its economy to {economy}; floating islands need high magic and an economy of {economyMin} or more.\""),

 # ---- 115 (f) 10 (D11) ----
 ("a priority out of range clamped (`value_clamped`) (T115-2).",
  "a priority out of range clamped (`value_clamped`); a dossier at `priorityMagic` 100 and economy 90 without `magicLevel`: closed on the magic clause, source `map`, opened by `button.magicHigh` ((a) 1) (T115-2)."),

 # ---- 115 (g) T115-2 (D11, VC-25), T115-5 (VC-1), T115-6 and T115-10 (VC-5) ----
 ("a dossier without `magicLevel` reads `none`, editable, noted `value_absent`;",
  "a dossier without `magicLevel` reads `none`, editable, noted `value_absent`, and at `priorityMagic` 100 and economy 90 it has 0 islands, its magic clause failing with source `map`, until one click on `button.magicHigh` opens it;"),
 ("each of the three sample cards meets the gate at its recorded values.",
  "each of the three sample cards meets the gate at the values its dossier carries (not recorded by the survey)."),
 ("`'<dossier>@magic100@economy90'`", "`'<dossier>@economy90@magic100'`"),
 ("from a world without magic, `button.magicHigh` turns magic on at 75 in one undo step",
  "from a world without magic, `button.magicHigh` turns magic on and sets the Magic to `gate.magicMin` in one undo step"),
 ("an empty `gate.magic` leaves the slider's reading alone, reported, and `gate.magic` naming `none` is refused.",
  "an empty `gate.magic` leaves the slider's reading alone, reported, and `gate.magic` naming `none` is refused; with `gate.magicMin` and `gate.economyMin` edited to 80, one click on `button.magicHigh` and one on `button.economyHigh` open the gate, and the messages name 80."),

 # ---- 115 (h): determinism (VC-2, VC-24), V05 (VC-3), V11 (D2), V12 (VC-1) ----
 ("§5.4's `ReportCode` `islands_gated`; §6: no part.",
  "§5.4's `ReportCode` `islands_gated` with its row (class cell \"the island gate closed — an outcome, never a failure\"; landing `requestedVsBuilt`); §6.2's recorded inputs gain the recipe's magic priority, beside item 114's economy priority."),
 ("§3.2 (1), (3), (4) and (5) (the parity clause dropped; the forced slots; the gate before the count; the sentence split by cause), §3.15 (4) and (5), the wane under magic `none` in force, the access conversion, §4.1's T1 row gaining the Magic, §4.2's declaring rule and fates, §4.4's DR27 inputs and coherence restated (the absorb wane withdrawn), §4.5's why naming the clauses,",
  "§3.2 (1)'s parity clause dropped and (3), (4) and (5) (the forced slots; the gate before the count; the sentence split by cause), §3.15 (4) and (5), the wane under magic `none` in force and the access conversion, each built as II.6 states them, §4.2's declaring rule, citing §7.4's fates, §4.4's coherence restated (the absorb wane withdrawn), citing DR27's inputs, §4.5's why naming the clauses,"),
 ("REFERENCES II.6 and item 114 (e); item 116's island parts",
  "REFERENCES II.6 (the rules), DR27 (its inputs), §7.4 (the held fates), §7.1's T1 row (the Magic, which V05 §4.1's T1 row cites) and item 114 (e); item 116's island parts"),
 ("(`gate.magic` stamped `ownerRule: '115 (b)'`, `magicMin` and `economyMin` own and not calibratable)",
  "(`gate.magic`, `magicMin` and `economyMin` own, not calibratable, unstamped)"),
 ("`'<dossier>@magicLevel<word>'` (the word) — the fixture for high magic",
  "`'<dossier>@magicLevel<word>'` (the word), chained after `'@pop×k'` and item 114's `'@economy<e>'` in the order `@economy`, `@magic`, `@magicLevel` — the fixture for high magic"),

 # ---- 116 (a) (D10) ----
 ("whether it is **native** — the owner's word: its source is the settlement's own, by **land**",
  "whether it is **native** — the owner's word; what counts as the settlement's own is the program's reading (vetoable): by **land**"),
 ("The owner's \"isolated settlement\" is, in the design, a **native-only** settlement: one no partner supplies.",
  "The owner's isolated settlements (\"isoalted settlements\") are, in the design, **native-only** settlements: ones no partner supplies."),

 # ---- 116 (c) (D9, VC-7) ----
 ("a hostile partner, or one under a suppressed economy, licenses nothing (vetoable; SettlementForge itself makes no trade link with a hostile or suppressed neighbour, J121). **From a dossier** (DR3 amended; V08 writes its rows) every neighbour SettlementForge names counts:",
  "a hostile partner, or one under a suppressed economy, licenses nothing — the program's one narrowing of the decision the owner adopted (\"every neighbour SettlementForge names counts\"; vetoable; SettlementForge itself makes no trade link with a hostile or suppressed neighbour, J121). **From a dossier** (the owner's decision of ~01:35, adopting the program's recommendation, docs/validation/coherence/work/g116/read-owner-decision.md; DR3 amended; V08 writes its rows) every neighbour SettlementForge names counts:"),
 ("`access?: AccessKey` (the neighbour's access key, V08's union; an unknown word reads `road`, noted `unmapped_word`)",
  "`access?: string` (the neighbour's access key, a word of V08 §2.6's `access` row, typed as §14 types `site.access`; an unknown word reads `road`, noted `unmapped_word`)"),
 ("**Standalone** (vetoable): the recipe's partners are",
  "**Standalone** (the owner's decision: the recipe's own partner list, native-only by default; its details below the program's, vetoable): the recipe's partners are"),

 # ---- 116 (f) (D4, VC-6, VC-16) ----
 ("**The very rich are the rich band:** a town capped below `rich` — economy below 50 on item 114's default table, with no rich band at all at 33⅓ and below — has lost the purse that pays for a traded material, so its houses and institutions take traded stone only where",
  "**The very rich are the rich band:** a capped town — economy below 50 on item 114's default table — keeps only the share f of its rich band, and at 33⅓ and below none, so its top purse is lowered and its houses and institutions take traded stone only where"),
 ("reaches the very rich from economy 45 (receipt `work/g114-116/tmp/cap-stone.txt`)",
  "reaches the very rich from an economy of about 45.3 (receipt `work/g114-116/tmp/cap-stone.txt`)"),

 # ---- 116 (i) Works (VC-20) ----
 ("`WorksRow.material` and `WorksTable.pauses.material` read a material id or its mass (`masonry`, `timber`, `earth`), an id's row winning:",
  "`WorksRow.material` and `WorksTable.pauses.material` read a key: `masonry`, `timber` or `earth` is the mass, any other key a material id (the `timber` → `boards` alias applies to stored material fields only), an id's row winning over its mass's; the base's pause rows are re-keyed by mass (`stone` → `masonry`):"),

 # ---- 116 (l), (o) (VC-22) ----
 ("holds a locked building's or structure's material and origin, its fate listed;",
  "holds a locked building's or structure's material and origin, its fate `EditFate { fate: 'kept', reason: 'held_against_material_supply' }` (V09's `fate.held.materialSupply`) listed;"),
 ("| a locked one holds, its fate listed; a pinned one re-picks |",
  "| a locked one holds, `held_against_material_supply`, listed; a pinned one re-picks |"),

 # ---- 116 (p) (VC-18, VC-21, VC-30) ----
 ("`MaterialSupply` (derived: S1 (11), S3's carriage, each epoch's prelude, load; no edit kind);",
  "`MaterialSupply` (derived: S1 (11), S3's carriage, each epoch's prelude, load; no edit kind — a `setAttr` naming `Document.derived.materialSupply` bends with `bend.material.supplyFollows`, \"The materials follow what the land, the ruins and trade supply.\", and `button.openTrade`, which opens the Trade control, on a dossier map its read-only trade panel);"),
 ("the Trade control, id `circumstances.trade` (consuming stage S1, locality *re-derive from S1 (11)*, discrete, anchor §7.7, the advanced panel's \"Site\" group, V09 §4.14's grouping by consuming stage, beside the Economy; the Magic sits in \"Programme\"); the site card's `fissile` and `lead` toggles (S1, *re-derive from S1 (10)*, discrete);",
  "the Trade control, id `circumstances.trade` (label \"Trade\"; output metric the families traded; consuming stage S1; locality *re-derive from S1 (11)*; *discrete*, its levels the declared partners; anchor §7.7; the advanced panel's \"Site\" group, V09 §4.14's grouping by consuming stage, beside the Economy; the Magic sits in \"Programme\"); the `fissile` and `lead` requests (output metric `Terrain.fissile` / `Terrain.lead`; consuming stage S1; *re-derive from S1 (10)*; *discrete*, their levels the request's words; anchor §4.2 S1 (10); rows of the advanced panel's \"Site\" group, outside the basic panel's count, their labels V09's);"),

 # ---- 116 (r) (VC-9, VC-13, VC-18, VC-20, VC-29, VC-30) ----
 ("S10's retaining pick; S10a's surface gate over V01's table; S11's building pick,",
  "S10's retaining pick; S11's building pick,"),
 ("V06's engine, V04's U-FORECAST, V01's surface table |",
  "V06's engine, V04's U-FORECAST, V01 §3.7.3's surface gate and table (S10a runs it) |"),
 ("§1's buildings row (\"item 116's supply model by default; FTG's under the FTG preset and with the switch off\");",
  "§1's buildings row (\"item 116's supply model by default; FTG's under the FTG preset and with the switch off\"); §1.2's one-click default gaining the materials switch on (item 116's supply model);"),
 ("the `earthwork` section rows at TOWN, CITY and METROPOLIS;",
  "the `earthwork` section rows at TOWN, CITY and METROPOLIS; row 48's (`works`) pause rows re-keyed by mass (`stone` → `masonry`);"),
 ("the standalone Trade control (name, route, supplies; the advanced panel's \"Site\" group, id `circumstances.trade`); the site card's `fissile` and `lead` toggles;",
  "the standalone Trade control (name, route, supplies; the advanced panel's \"Site\" group, id `circumstances.trade`); the `fissile` and `lead` rows in the same \"Site\" group;"),
 ("the catalogue keys (every new report code, `critique.K19`, `bend.material.*`, the legend words)",
  "the catalogue keys (every new report code, `critique.K19`, `bend.material.supplyFollows`, `button.openTrade`, `fate.held.materialSupply`, the legend words)"),
 ("| §1's owner-rule entry (`'116 (n)'`); bar-map rows",
  "| §1's owner-rule entry (`'116 (n)'`); `Level.trade?: TradePartner[]` (declared partners, `source: 'declared'`: the fixture's creation-slice trade) in the one `Level` declaration, for the bar-map rows' partner fixtures; bar-map rows"),
]

n = apply('items-114-116.md', R)
print('paragraphs touched:', n)
