# Fix pass over routing.json (verify-owner D2; verify-consistency VC-1 - VC-30 where they touch the routing).
# Each change names the unit and field, and asserts its target occurs exactly once there.
import json

P = 'routing.json'
D = json.load(open(P, encoding='utf-8'))
U = {e['unit']: e for e in D}

def part(unit, old, new):
    e = U[unit]
    assert e['part'].count(old) == 1, (unit, 'part', old[:80], e['part'].count(old))
    e['part'] = e['part'].replace(old, new)

def item(unit, field, old, new):
    lst = U[unit][field]
    hits = [i for i, s in enumerate(lst) if s == old]
    assert len(hits) == 1, (unit, field, old[:80])
    if new is None:
        del lst[hits[0]]
    else:
        lst[hits[0]] = new

def add(unit, field, new):
    assert new not in U[unit][field]
    U[unit][field].append(new)

# ---- pipeline (VC-9) ----
part('pipeline', "S10's retaining pick; S10a's surface gate over V01's table; S11's building pick,",
     "S10's retaining pick; S11's building pick,")
part('pipeline', "II.7's S7b stone-stock forecast.",
     "II.7's S7b stone-stock forecast. S10a runs V01 §3.7.3's surface gate over its table, which V01 states (cited here, not stated).")
item('pipeline', 'states', "116: §4.8 S7 structures; §4.7 S10 retaining, S10a surfaces, S11 buildings, institutions, covering, tents, host buildings",
     "116: §4.8 S7 structures; §4.7 S10 retaining, S11 buildings, institutions, covering, tents, host buildings")
item('pipeline', 'references', "V01 §3.7.3 (surface table)", "V01 §3.7.3 (the surface gate and its table; S10a runs it)")

# ---- determinism (VC-4, VC-5, VC-12, VC-19, VC-21, VC-22, VC-24, VC-28, VC-30) ----
part('determinism', "held_against_supply (V05's island supply law) }", "held_against_island_supply (V05's island supply law) }")
part('determinism', "§7.6: the ceiling cell with its parity entries.",
     "§7.6: the ceiling cell listed among the cells that carry presets entries, citing §4.5 for them.")
part('determinism', "continuous, the step at 75 declared)", "continuous, item 115's step at gate.economyMin (75 by default) declared)")
part('determinism', "§7.8: the Magic's two rows — intent.magicPriority (S2, re-derive from S2, stepped at 75, declared) and circumstances.magic (the switch; S2; discrete) — and the Islands control's states.",
     "§7.8: the Magic's two rows with every registry field — intent.magicPriority (label 'Magic'; metric the magic word it reads and the gate's magic clause; 0–100; S2; re-derive from S2; discrete, its levels split at 75 and at gate.magicMin, shown stepped; anchor II.6) and circumstances.magic (label 'No magic in this world'; metric the magic in force; S2; re-derive from S2; discrete; anchor II.6) — and the Islands control's states.")
part('determinism', "§5.4's ReportCode islands_gated.",
     "§5.4's ReportCode islands_gated with its row (class cell: the island gate closed, an outcome, never a failure; landing requestedVsBuilt).")
part('determinism', "§7.4 the lifecycle rows;",
     "§7.4 the lifecycle rows and the fate held_against_material_supply (a locked element's material held under a supply change; V09's fate.held.materialSupply);")
part('determinism', "§7.8 the Trade control (id circumstances.trade, S1, re-derive from S1 (11), discrete), the fissile and lead toggles, the switch through the presets and the tables editor.",
     "§7.8 the Trade control (id circumstances.trade; label 'Trade'; metric the families traded; S1; re-derive from S1 (11); discrete over the declared partners; anchor §7.7), the fissile and lead requests (metric Terrain.fissile / Terrain.lead; S1; re-derive from S1 (10); discrete; anchor §4.2 S1 (10)), the switch through the presets and the tables editor.")
part('determinism', "circumstances.trade (the Trade control), the fissile and lead toggles, the materials switch; the advanced panel groups them by consuming stage (V09 §4.14): Site — Economy, Wealth level, Trade; Programme — Magic.",
     "circumstances.trade (the Trade control), the fissile and lead requests, the materials switch — their placement V09's (§4.14).")
item('determinism', 'states', "114+115+116: §7.1 early-parameter list, edit-target row, T1 binding row (Economy, Magic), T5 quarter held band, material edit paths",
     "114+115+116: §7.1 early-parameter list, edit-target row, T1 binding row (Magic), T5 quarter held band, material edit paths")
item('determinism', 'states', "114+115+116: §7.4 adjust and quarter rows; fate reasons; lifecycle rows",
     "114+115+116: §7.4 adjust and quarter rows; fate reasons (held_above_ceiling, held_against_magic, held_against_economy, held_against_island_supply, held_against_material_supply); lifecycle rows")
item('determinism', 'states', "114+116: §7.6 ceiling cell parity entries; the materials switch, presets, regional shift retired, licence exception",
     "114+116: §7.6 the ceiling cell listed among the cells with presets entries (the entries §4.5's); the materials switch, presets, regional shift retired, licence exception")
item('determinism', 'states', "114+115+116: §7.8 registry rows (intent.economyPriority, circumstances.magic, intent.magicPriority, circumstances.trade, fissile, lead, the switch), basic panel Economy, advanced Wealth level, Islands control states",
     "114+115+116: §7.8 registry rows, each with every §7.8 field (intent.economyPriority, circumstances.magic, intent.magicPriority, circumstances.trade, fissile, lead, the switch), basic panel Economy, advanced Wealth level, Islands control states")
item('determinism', 'states', "115+116: §5.4 ReportCode islands_gated and the thirteen material codes; §5.2 F-MATERIAL",
     "115+116: §5.4 ReportCode islands_gated and the thirteen material codes, each with its class cell and landing; §5.2 F-MATERIAL")
item('determinism', 'references', "V09 (controls)", "V09 (the controls and their placement, §4.14)")

# ---- rendering (VC-11) ----
part('rendering', "closes with 'Richest here: {band}', naming the highest band the model holds; uncapped maps unchanged.",
     "closes with 'Richest here: {band}', naming the highest band the model holds (its words V09's key legend.wealth.richest); uncapped maps unchanged.")
item('rendering', 'references', "V09 §5.4 (the Wealth view), V09 (the Materials view)",
     "V09 §5.4 (the Wealth view; the closing line's words, legend.wealth.richest), V09 (the Materials view)")

# ---- scope (VC-13) ----
part('scope', "§1's buildings row;", "§1's buildings row; §1.2's one-click default gaining the materials switch on (item 116's supply model);")
item('scope', 'states', "114+115: §1.2 defaults (Economy 50, wealth level 0.5, Magic 50 with no magic)",
     "114+115+116: §1.2 defaults (Economy 50, wealth level 0.5, Magic 50 with no magic; the materials switch on)")

# ---- V05 (VC-3) ----
part('V05', "§3.2 (1), (3), (4), (5); §3.15 (4) and (5) (a settled refloat and a raise read the gate), the wane under magic none in force, the access conversion; §4.1's T1 row gaining the Magic; §4.2's declaring rule and held fates; §4.4's DR27 inputs (site.magic, settlement.magicPriority, settlement.economyPriority) and coherence with the absorb wane withdrawn;",
     "§3.2 (1)'s parity clause dropped and (3), (4), (5), §3.15 (4) and (5) (a settled refloat and a raise read the gate), the wane under magic none in force and the access conversion, each built as II.6 states them; §4.1's T1 row citing §7.1's (the Magic); §4.2's declaring rule, citing §7.4's held fates; §4.4's coherence with the absorb wane withdrawn, citing DR27's inputs (site.magic, settlement.magicPriority, settlement.economyPriority);")
item('V05', 'states', "115: §3.2 (1), (3), (4), (5)",
     "115: §3.2 (3)–(5) and §3.15 (4)–(5) — forced slots, the count after the gate, the raise and the settled refloat, the wane under magic none, the access conversion — built as II.6 states them (the parity clause dropped from §3.2 (1))")
item('V05', 'states', "115: §3.15 (4), (5); wane under magic none; access conversion", None)
item('V05', 'states', "115: §4.1 T1 row with the Magic; §4.2 declaring rule and held fates", "115: §4.2 declaring rule")
item('V05', 'states', "115: §4.4 DR27 inputs and coherence (absorb wane withdrawn); §4.5 why", "115: §4.4 coherence (absorb wane withdrawn); §4.5 why")
item('V05', 'references', "II.6 (clauses)", "II.6 (the gate's rules: clauses, parity clause dropped, forced slots, count, what rises and stands, wane, access conversion)")
add('V05', 'references', "DR27 (determinism: its inputs)")
add('V05', 'references', "§7.4 (the held fates)")
add('V05', 'references', "§7.1's T1 row (the Magic)")

# ---- V06 (VC-10) ----
part('V06', "Shared: EVO_PRELUDE's steps in §4.11's one order — the slice, deposits and TradeFlow; the lived wealth; the prosperity ceiling's position (114); the material supply (116); then the participants.",
     "Shared: EVO_PRELUDE builds its steps in §4.11's one order (cited there, not restated here), then runs the participants.")
item('V06', 'states', "shared: EVO_PRELUDE order", "shared: EVO_PRELUDE built in §4.11's order")

# ---- V08 (VC-8, VC-25) ----
part('V08', "the three sample cards meet the gate at their recorded values)",
     "the three sample cards meet the gate at the values their dossiers carry (not recorded by the survey))")
part('V08', "§2.5's digest additions (settlement.economyPriority?, settlement.magicPriority?, site.magic? optional, economy.partners[].exports?/resources?/access?);",
     "§2.5 citing §14 for the three items' digest additions (no declaration here);")

# ---- V09 (VC-5, VC-11, VC-18, VC-19, VC-22, VC-23, VC-30) ----
part('V09', "fate.held.supply (V05's island supply law)", "fate.held.islandSupply (V05's island supply law)")
part('V09', "the Wealth view's legend line 'Richest here: {band}';",
     "the key legend.wealth.richest ('Richest here: {band}': the words of §8.2's closing line of the Wealth key);")
part('V09', "('Floating islands need high magic — 75 or more on the Magic — and an economy of 75 or more.')",
     "('Floating islands need high magic — {magicMin} or more on the Magic — and an economy of {economyMin} or more.', its args the gate's cells)")
part('V09', "(button.magicHigh = event:magicHigh, the Magic set to high magic in one group; button.economyHigh = event:economyHigh)",
     "(button.magicHigh = event:magicHigh, the Magic set to high magic in one group, the priority to gate.magicMin; button.economyHigh = event:economyHigh, the economy to gate.economyMin)")
part('V09', "report.islands.clause ('magic moderate, slider 50 — SettlementForge')",
     "report.islands.clause ('magic low, slider 50 — SettlementForge')")
part('V09', "the site card's fissile and lead toggles;", "the fissile and lead rows in the advanced panel's 'Site' group;")
part('V09', "the catalogue keys (every new report code, critique.K19, bend.material.*, the legend words).",
     "the catalogue keys (every new report code, critique.K19, bend.material.supplyFollows with button.openTrade, fate.held.materialSupply, the legend words).")
part('V09', "the Trade control under 'Site' (S1),", "the Trade control and the fissile and lead requests under 'Site' (S1),")
item('V09', 'states', "114+115: fate.held.ceiling, fate.held.supply, fate.held.magic, fate.held.economy",
     "114+115+116: fate.held.ceiling, fate.held.islandSupply, fate.held.magic, fate.held.economy, fate.held.materialSupply")
item('V09', 'states', "114: Wealth view legend line; BCR-V9-2 cells",
     "114: legend.wealth.richest (the words of §8.2's Wealth-key line); BCR-V9-2 cells")
item('V09', 'states', "116: Trade control ('Site' group); fissile and lead toggles; dossier trade panel",
     "116: Trade control and the fissile and lead rows ('Site' group); dossier trade panel")
item('V09', 'states', "116: paint's two targets; §4.3 bindings; catalogue keys",
     "116: paint's two targets; §4.3 bindings; catalogue keys (bend.material.supplyFollows, button.openTrade)")
item('V09', 'references', "§8.2 (legend rule)", "§8.2 (legend rule; the Wealth key's closing line)")

# ---- V11 (D2, VC-4, VC-20) ----
part('V11', "presets entries MFCG, FTG, VG; NG by MFCG; FM none", "presets entries as §4.5 states them")
part('V11', "gate.magic ['high'] (low/high only) stamped ownerRule '115 (b)', magicMin 75 and economyMin 75 own and calibratable false",
     "gate.magic ['high'] (low/high only), magicMin 75 and economyMin 75 — all three own, calibratable false and unstamped (the owner fixed the two clauses, not a cell)")
part('V11', "the earthwork section rows at TOWN, CITY, METROPOLIS;",
     "the earthwork section rows at TOWN, CITY, METROPOLIS; row 48 works' pause rows re-keyed by mass (stone → masonry);")
part('V11', "the two owner-rule stamps are '115 (b)' (gate.magic) and '116 (n)' (materials.supply.enabled), 114's rows unstamped.",
     "the one owner-rule stamp is '116 (n)' (materials.supply.enabled); 114's rows and 115's gate cells unstamped.")
item('V11', 'states', "114: row 6 ceiling cell (own, not calibratable, parity entries)",
     "114: row 6 ceiling cell (own, not calibratable; presets entries as §4.5 states them)")
item('V11', 'states', "115: row 56 gate cells (gate.magic stamped '115 (b)'; magicMin, economyMin own)",
     "115: row 56 gate cells (gate.magic, magicMin, economyMin: own, not calibratable, unstamped)")
item('V11', 'states', "116: earthwork rows; §2.8c retired fields; pierSpacingM by mass; §3.20 naming words",
     "116: earthwork rows; §2.8c retired fields; pierSpacingM by mass; row 48 pause rows by mass; §3.20 naming words")
item('V11', 'references', "§4.5 (the ceiling rows' values)", "§4.5 (the ceiling rows' values and presets entries)")

# ---- V12 (D2, VC-1, VC-29) ----
part('V12', "§1's owner-rule list gains the rule (islands need high magic — on the magic slider or SettlementForge's word — and a high economy), never 75;",
     "§1's owner-rule list gains the rule (floating islands at the first generation need both high magic on the magic slider and a high economy), never its cells or thresholds;")
part('V12', "T115-5's '<dossier>@magic100@economy90'", "T115-5's '<dossier>@economy90@magic100'")
part('V12', "the register's entries (gate.magic owner rule '115 (b)'; magicMin and economyMin own);",
     "the register's entries (the three gate cells own, not calibratable);")
part('V12', "Item 116. §1's owner-rule entry '116 (n)';",
     "Item 116. §1's owner-rule entry '116 (n)'; Level.trade?: TradePartner[] (declared partners, source 'declared': the fixture's creation-slice trade) for the bar-map rows' partner fixtures;")
part('V12', "Shared: Level.intent { wealthLevel?, economyPriority?, magicPriority? } and Level.magic? in one declaration;",
     "Shared: Level.intent { wealthLevel?, economyPriority?, magicPriority? }, Level.magic? and Level.trade? in one declaration;")
part('V12', "§1's owner-rule list holds the three rules.",
     "§1's owner-rule list holds the three rules, never their rows or cells; the one stamp is '116 (n)'.")
item('V12', 'states', "114+115: Level.intent { wealthLevel?, economyPriority?, magicPriority? }, Level.magic?",
     "114+115+116: Level.intent { wealthLevel?, economyPriority?, magicPriority? }, Level.magic?, Level.trade?")

s = json.dumps(D, indent=1, ensure_ascii=False)
open(P, 'w', encoding='utf-8').write(s)
print('ok', len(D))
