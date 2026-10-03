from lib import *
t = extract(399, 509)
t = strip_narr_ids(t)
t = strip_narr_more(t); t = strip_narr_tail(t)
R = [
("Every piece this volume adds, what feeds it, what it feeds, the base hook it plugs into and the dossier facts it reads\n(the owner's rule of 2026-09-28: nothing orphaned, nothing dangling). Pointers follow the convention stated under the\ntitle.",
 "Every piece this volume adds, what feeds it, what it feeds, the base hook it plugs into and the dossier facts it reads\n(nothing orphaned, nothing dangling; principle (7))."),
("| W1 | `ProductDecl('village')` (V07 §2.1) | `@plat/village`'s registration at load | `LadderRouter.route`; the product's stage set (V07 §3.0); the replay of a village creation (§2.9); the port's consultation of `LadderRouter` (V08 §3.10; item 202); the epoch runner's phase overrides (V07 §3.12) | `StrategyRegistry.products` (item 202) | DR23 (the rung) |",
 "| W1 | `ProductDecl('village')` (V07 §2.1) | `@plat/village`'s registration at load | `LadderRouter.route`; the product's stage set (V07 §3.0); the replay of a village creation (§2.9); the port's consultation of `LadderRouter` (V08 §3.10; item 202); the epoch runner's phase overrides (V07 §3.12); history-first generation at village rungs (V07 §3.12a) | `StrategyRegistry.products` (§4.12; item 202) | DR23 (the rung) |"),
("the replay of a village creation (§2.9)", "the replay of a village creation (§2.9)"),
("(V07 §2.4; J-V7.101), and each row's `commonness` by the roster-share rule (J-V7.133) | the roster tables (V11 cites them and compiles them by its own rules, T-V7-56); `rules.presence`; the V-M2 seat's commonness script |",
 "(V07 §2.4; J-V7.101), and each row's `commonness` (J-V7.133) | the roster tables (V11 cites them and compiles them by its own rules, T-V7-56); `rules.presence`; V11's compiler, the one producer of every `v.` row's `commonness` (V11 §3.2.1 step 5a) |"),
("| W26 | `declareEnd` and `drawWay.walk` (V07 §4.2) | T5 and T4 on the three surfaces |",
 "| W26 | `declareEnd` and `drawWay.walk` (V07 §4.2) | T5 `quarter` and T4 `road` on the three surfaces |"),
("volume 6's `EvolveOp` member (item 209, absorbing item 209)", "V06's `EvolveOp` member, one op with V06's fallow ladder (§2.8, item 209)"),
("| W22 | outlying farmsteads (V07 §3.9 (5)): `D_o` of the dwellings `D` (V07 §3.2 (3)) | W11's approaches; W20; S2's `H_f`, `H_o` | the hinterland unit's S10b (the outlying households); DR7's count (`D_v + D_o`); labels |",
 "| W22 | outlying farmsteads (V07 §3.9 (5)): `N_o` of the dwellings `N` (V07 §3.2 (3)) | W11's approaches; W20; S2's `H_f`, `H_o` | the hinterland unit's S10b (the outlying households); DR7's count (`N_v + N_o`); labels |"),
("S2's dwelling count `D`; S1's water", "S2's dwelling count `N`; S1's water"),
("| §2.5 data-defined yard parts;", "| §2.5's data-defined yard parts;"),
("V04's footing reach; deriveBase's levelled ground | item 110 (a) (V07 §2.7's record); item 506 |",
 "V04's footing reach (V04 §3.5.4); deriveBase's levelled ground | item 110 (a) (§2.7's record, item 245); item 506 |"),
("| item 110 (b) (V07 §3.4's parts); item 290 |", "| item 110 (b) (§3.4's ground parts from 1; §2.7's record, item 244); item 290 |"),
("V11's specialisation rows (X17) with this volume's village cells", "V11 §3.24.3's specialisation rows with this volume's village cell"),
("| §10.2 `DesignationTemplateRow.composition` (V02's BCR) |", "| §10.2 `DesignationTemplateRow.composition` (item 426) |"),
("V07 §2.2's `VG` column and V07 §2.2a's cells; V11 §2.2's rule (V11 W68);", "V07 §2.2's `VG` column and V07 §2.2a's cells; V11 §2.2's rule;"),
("V07's floor-vault fold", "V03's wet-ground rule (no crypt; ledger slabs in the chancel floor, V03 §3.7.4)"),
("V07 §2.6's basement draw (V02, V03), V03's floor-vault fold;", "V07 §2.6's basement draw (V02, V03), V03's wet-ground rule (no crypt; ledger slabs in the chancel floor, V03 §3.7.4);"),
("| file g item 102 (a)–(c) (the sampler; `shade = 1 − D`) | DR-V8.1's latitude", "| item 102 (a)–(c) (the sampler; `shade = 1 − D`; §4.5) | DR29's latitude"),
("| item 102 (a)–(c) (the sampler; `shade = 1 − D`) | DR-V8.1's latitude", "| item 102 (a)–(c) (the sampler; `shade = 1 − D`; §4.5) | DR29's latitude"),
("(TV-02's V06 companion; item 202)", "(item 202)"),
("V06 §3.2's participant table (TV-03's V06 companion)", "V06 §3.2's participant table"),
]
for o, n in R:
    if o in t:
        t = t.replace(o, n)
    else:
        print('MISS', o[:90])
# W40: withdrawn placeholder removed (NARR-5); its one normative clause lives in V07 §2.4's supply paragraph
t = re.sub(r'\n\| W40 \|[^\n]*', '', t)
# T8 / T9 / T11 tool words at first use (ID-TOOL)
t = t.replace("the families' `retaining_wall` role and `retaining.wall` program (W62)", "the base's `retaining` program (§8.2) in its painterly form `retaining.wall` (W62)")
t = t.replace("V07 §3.12's infill; T8's brush;", "V07 §3.12's infill; T8 `fill`'s density brush;")
t = t.replace("V07 §3.12's land-use turn; T9 and T11 |", "V07 §3.12's land-use turn; T9 `shape` and T11 `name` |")
# new rows (g items 111 and 113; W-IF-02; W-FLD-08 named on W7)
t = t.replace("VS8's ends, the spotlight (V07 §5.1), labels, exports, the clerk | `StageDecl` (§4.1); entity registry (item 267) | DR1 (site), DR7 (the dwellings in `R_s`) |",
 "VS8's ends, the spotlight (V07 §5.1), labels, exports, the clerk; `formSource` and `roadsSource` → the village `WhyProvider` (W76) and the panel's plan card (V07 §4.5) | `StageDecl` (§4.1); entity registry (item 267) | DR1 (site), DR7 (the dwellings in `R_s`) |")
newrows = """| W74 | the village water pull and the oasis village (item 111; V07 §3.2 (4a), V07 §3.3) | S1's water bodies with the oasis (`WaterBody.spring`, §2.3) and its well-yield raster (§4.2 S1 (10)); S3 (6)'s proximity `q(x)` computed by VS1 over the territory lattice; the climate row's `w_water`, pull radius and oasis rows (V11) | VS1's heart score; VS2's water factor; §4.5's prosperity water term at village rungs (pass 1, W14); VS8's wells by yield (W25); the hinterland unit's oasis gardens and grove (S12a, S12b; V07 §3.9); the clerk's why rows (W76) | §4.2 S0, S1 (2), (10), S3 (1), (6); §4.5 | `site.deposits`' `oasis_water` → DR40 (an oasis exists, item 20); `site.terrain` (arid) → DR1 |
| W75 | a village over a former town and refounding at village rungs (item 113; V07 §3.12a) | §4.11's history-first generation (the peak, the replay's coarse epochs, refounding) run by V06's replay engine; V08's history reading (`peakTier`, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle); V11's event-to-epoch rows, `history.reuseCost` and `history.burialYears`; the base product's geometry at the fold | the village's stages at the first epoch the fold gives `village` (V07 §3.12's hand-off down); VS1's heart and VS4's tracker over the former fabric's costs; VS3's palisade over a former wall line; VS6's slot race favouring old foundations; the remnants as V06's decline states and II.7.6's buried former settlement (V04); the replay record → the clerk's story (V10) | §4.11 *History-first generation*; II.7.6 | the history fields → DR36–DR39 (the peak, the replay's events, destruction and refounding, the burial threshold); a symbolic peak's facts carry provenance `symbolic` (§2.8) |
| W76 | the village `WhyProvider` (V07 §4.5) | `VillagePlan` (with `formSource`, `roadsSource`), `VillageEnd`, `VillageField`, the cells each answer cites | the clerk's and the panel's "why" answers (`info.village.*` keys; V10 §3.9's owed table); V10's provider-completeness test | the entity registry's explainer per kind (§2.8, item 270) | the facts each answer traces (DR rows of W7, W24, W20, W74, W75) |
"""
t = t.replace("\n\n**The dossier facts this volume reads, traced**", "\n" + newrows.rstrip('\n') + "\n\n**The dossier facts this volume reads, traced**")
t = t.replace("`terrain` → DR1 → W4, W5, W6;", "`terrain` → DR1 → W4, W5, W6; `oasis_water` → DR40 → W74; the history (`peakTier`, `tierHistory`, `populationHistory`,\n`calamityHistory`, the lifecycle) → DR36–DR39 → W75;")
t = norm_d5(t)
# W70 compacted (V07-DUP-1): the calls live in V07 §2.1, the cases in V07 §3.12
i = t.index('| W70 |'); j = t.index('\n', i)
row = t[i:j]
cells = row.split(' | ')
trace = cells[-1]
w70 = ("| W70 | `village.records` — the product's records placement (`ProductDecl('village').records`, stage `S10b`; its calls V07 §2.1 "
       "*The records placement*, its cases V07 §3.12 *Records at a village epoch*; J-V7.125) | the engine's `dossier` step at a village epoch "
       "(V06 §3.2 row 12); on an absorb without an epoch the base's *One path* placement and §7.7 item 2's removal (item 202; J-V7.128); the "
       "dossier event's `seq` (the key); V07 §3.6 (4a), (4b), V06 §3.9.6's claim-sized rule, V07 §3.10's pin-record rule, V08 §3.5.1 (c), (d) | "
       "the fair field ((a)), a hall's claim, building and use ((b)), a claim-sized join or W73's outside plot ((c)), the market rank ((d)), a "
       "forced pin (W25), a REPLACEMENT greater (item 4); on `remove` the tombstones, unbindings and cleared rank that paragraph lists; a declined "
       "record → S10b's `dossier` request | V06 §2.1's `ProductDeclEpoch.records` and `EpochPlacement` (item 202) | " + trace)
t = t[:i] + w70 + t[j:]
save('03-s1b.md', t)
print('ok')
