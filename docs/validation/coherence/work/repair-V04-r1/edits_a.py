# V04 repair r1 — edits, part a: the head, V04 §1, V04 §1b, V04 §2. Each (issue ids, old, new, count); old must occur
# exactly `count` times in the text as it stands.
EDITS = []
def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))

# ---- the head: the reading note (VV34-17)
S('VV34-17',
"`Vnn §n` is a design volume's section, this one included (`V04 §3.2`); `item n` is an amendment item — items 1–113 the\n"
"owner's, items 200 and above file f's, each the applied text of a volume's base change request (V04 §10 lists this\n"
"volume's); `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated. Decisions\n"
"are `J-V4.n` (V04 §9), tests `T-V4-n` (V04 §7).",
"`Vnn §n` is a design volume's section, this one included (`V04 §3.2`); `item n` is an amendment item — items 1–120 the\n"
"owner's rules (item 112 the program's, under J122), items 200 and above file f's, each the applied text of a volume's\n"
"base change request (V04 §10 lists this volume's); `J-VI.n` is a volumes-integration decision\n"
"(`docs/volumes/_integrate.md`), cited and never restated. Decisions are `J-V4.n` (V04 §9), tests `T-V4-n` (V04 §7).")

# ---- §1.2: the hook bars by number (VAP-02; canon ID-TOOL); items 119 and 120's base sides (VV34-02, G120-V04)
S('VAP-02',
"| the hook tests T11-1, T12-1, T14-1, T63–T66 | §13.2 | kept and run on generated output; V04 §7 adds T-V4-n |",
"| the hook tests T11-1, T12-1, T14-1, T63-4, T64-1 – T64-3, T65-1 – T65-8, T66-1 – T66-4 and T66-6, and the owner items' bars T109-1 – T109-6, T113-4 and T113-5 | §13.2 (the underground layer's take-over row) | kept and run on generated output, each V04 §7 test naming the bar and the clause it takes; V04 §7 adds T-V4-n |")
S('VV34-02 G120-V04',
"| item 113's base side: history-first generation and the replay, the buried former settlement, access through open links only | g item 113 at §4.2 S0, §4.11, §7.7, II.7.6 | V04 §3.5.5 (the buried former settlement), V04 §3.5.7 (the lost reading), V04 §3.10 (the reading at an epoch) |\n",
"| item 113's base side: history-first generation and the replay, the buried former settlement, access through open links only | g item 113 at §4.2 S0, §4.11, §7.7, II.7.6 | V04 §3.5.5 (the buried former settlement), V04 §3.5.7 (the lost reading), V04 §3.10 (the reading at an epoch) |\n"
"| item 119's base side: §12's laws as the targets, the ten-second comfort level of total time for a one-time wait, the measured-gain and progress rules, the interaction budgets kept | g item 119 at §12.1, §12.10's R12-31 – R12-34; V11 §3.25.8's `perf.qualitySpend` rows | V04 §6 *The comfort level*; T-V4-32 (b) |\n"
"| item 120's base side: the per-viewer view key `find` (its chips and the Show gaps switch), the veil, halo, outline, pin and count-bubble rows, the gazetteer's match listing by class, area and layer under knowledge admission, a picture export drawing Find, the overlay's budget; V09's Find panel and its `live.find` provider | g item 120 at §2.9, §8.2, §11.1, §11.2, §12.5; V09 | V04 §5.1 *Find on Below* (`underFindPlaces`); V04 §5.5; T-V4-81 |\n")

# ---- §1.2: public ground's readers (VAL-08)
S('VAL-08',
"(V04 §3.5.4 (e)), a buried town's squares (V04 §3.5.5) and `OpeningRow`'s `collapsed_shaft` row.",
"(V04 §3.5.4 (e)), a buried town's squares (V04 §3.5.5) and `UnderOpeningRow`'s `collapsed_shaft` row.")

# ---- §1.3: Find out of scope but its Below part (G120-V04); the charnel vault below TOWN (VAL-09)
S('G120-V04',
"* **The controls** for `showUnexcavated` and for the active layer are V09's; this volume names the view key and what it\n"
"  draws.\n",
"* **The controls** for `showUnexcavated` and for the active layer are V09's; this volume names the view key and what it\n"
"  draws.\n"
"* **Find** (g item 120) — its panel, type-ahead, chip grid, results list, phone sheet and `live.find` provider are V09's;\n"
"  the veil, halo, outline, pin and count-bubble rows rendering's (§8.2); the matches §11.2's gazetteer listing. This volume\n"
"  states only where a match lies Below and how it reads across the depth bands (V04 §5.1 *Find on Below*).\n")
S('VAL-09',
"under a place that once stood at TOWN or above (V04 §3.5.5), and the arch vaults and terminal cistern, which follow their\n"
"  raised way at every rung; the dug passage exists at every rung.",
"under a place that once stood at TOWN or above (V04 §3.5.5), and the arch vaults and terminal cistern, which follow their\n"
"  raised way at every rung; the dug passage and a dossier catacomb record's charnel vault (V04 §3.5.1 (10)) exist at every\n"
"  rung.")

# ---- §1b.1: the rule tables' row (VAL-05, VAL-08); Find's reading (G120-V04)
S('VAL-05 VAL-08',
"| `NetworkRule` (`tables/under/network.json`), `UndergroundFadeRule` (`fade.json`), `UnderLayoutRule` (`layout.json`), `RuinRule`, `OpeningRow`, `DigRule`, `CatacombRule` (`ruin.json`, `openings.json`, `dig.json`, `catacomb.json`) | shipped defaults (V04 §2.3; the rows V11 owns from V11 §3.23); `editTable` (§7.6) | U-NET N1–N12 and U-FORECAST; U-FADE (V04 §3.10); U-CITY C2–C3, U-LINK L1, the light placement's lived scope (V04 §3.9), S7b (6)–(7), F0, C1, F6, P7, §8.4 (b)'s shaft, glTF, VTT, the symbol size;",
"| `NetworkRule` (`tables/under/network.json`), `UndergroundFadeRule` (`fade.json`), `UnderLayoutRule` (`layout.json`), `RuinRule`, `UnderOpeningRow`, `DigRule`, `CatacombRule` (`ruin.json`, `openings.json`, `dig.json`, `catacomb.json`) | shipped defaults (V04 §2.3; the rows V11 owns from V11 §3.23); `editTable` (§7.6) | U-NET N1–N12 and U-FORECAST; U-FADE (V04 §3.10); U-CITY C2–C3, U-LINK L1, the light placement's lived scope (V04 §3.9), F0, C1, F6, P7 (`voidDwellings`, S7b (6)'s void part; S7b (6)–(7)'s cap `forecastSafety` and P7's floor `accessForecastMin` are II.7.4's `UndergroundRule` cells, read there), §8.4 (b)'s shaft, glTF, VTT, the symbol size;")
S('G120-V04',
"| the buried former settlement (the `buried` system's elements keyed `former`, V04 §3.5.5 (b)) | `BuriedFormer.lay` at the replay's burial epoch | U-ACCESS (its access by item 109 (j)), U-CITY C1 (the rank of a `buried` source), S14, S13a (its name), the exports, `HistoryRecord.buried` (V06 writes the id), V10 (the story) | II.7.6 (item 113 (c)); §2.7 `HistoryRecord` |\n",
"| the buried former settlement (the `buried` system's elements keyed `former`, V04 §3.5.5 (b)) | `BuriedFormer.lay` at the replay's burial epoch | U-ACCESS (its access by item 109 (j)), U-CITY C1 (the rank of a `buried` source), S14, S13a (its name), the exports, `HistoryRecord.buried` (V06 writes the id), V10 (the story) | II.7.6 (item 113 (c)); §2.7 `HistoryRecord` |\n"
"| `underFindPlaces(doc, ids)` (derived, never stored; V04 §5.1 *Find on Below*): each matched underground entity's part, depth bands, glow shapes and plan anchor | the underground records and their bands (§8.4), read at each commit that rebuilds Find's index | V09's `live.find` (the glow in the band shown, the ghost pins, **Go there**'s band, the area lift) and its panel's Below count, drawn by §8.2's Find rows; T-V4-81 | §2.9's view key `find` (g item 120) |\n")

# ---- §1b.2: Find's reading has its caller (G120-V04)
S('G120-V04',
"| `catacombOutcome(doc, face)` (read-only, V04 §4.5) | U-SYS, over the candidate pass's derived per-face record | the `underground` section on a burial face; V09's cemetery panel |\n",
"| `catacombOutcome(doc, face)` (read-only, V04 §4.5) | U-SYS, over the candidate pass's derived per-face record | the `underground` section on a burial face; V09's cemetery panel |\n"
"| `underFindPlaces(doc, ids)` (V04 §5.1 *Find on Below*) | `@plat/under` | V09's `live.find` overlay provider (g item 120), for the ids §11.2's gazetteer match listing gives on underground parts, after each commit that rebuilds Find's index |\n")

# ---- §1b.5: the burial factors' home (VV34-06)
S('VV34-06',
"`BuriedFormer.lay` at the replay's burial epoch (V04 §3.5.5 (b)); `history.burialYears` and its factors (V11) |",
"`BuriedFormer.lay` at the replay's burial epoch (V04 §3.5.5 (b)); `history.burialYears` and its factors (V11 §3.25.2) |")

# ---- §2.3: forecastSafety and accessForecastMin live at II.7.4 (VAL-05)
S('VAL-05',
"  lights: { litReachM: number /* 60: a run or system within this of a plot is lived and lit (V04 §3.9) */ };\n"
"  forecastSafety: number /* 0.85: S7b (6)–(7) cap each allocation at this × the forecast capacity */;\n"
"  crowdCap: number /* 2: households an underground cell may hold when the tail absorbs a surplus below (V04 §3.4 F0) */;\n"
"  voidDwellings: { maxHouseholds: number /* 8 per cluster */; share: number /* 0.05 of the poorest band's households */ };\n"
"  accessForecastMin: number /* 0.5: P7's access chance at which a void counts for S7b (V04 §3.3) */;\n",
"  lights: { litReachM: number /* 60: a run or system within this of a plot is lived and lit (V04 §3.9) */ };\n"
"  // S7b (6)–(7)'s cap forecastSafety and P7's floor accessForecastMin are II.7.4's UndergroundRule cells (V04 §3.3 reads them)\n"
"  crowdCap: number /* 2: households an underground cell may hold when the tail absorbs a surplus below (V04 §3.4 F0) */;\n"
"  voidDwellings: { maxHouseholds: number /* 8 per cluster */; share: number /* 0.05 of the poorest band's households */ };\n")

# ---- §2.3: the underground opening row renamed (VAL-08)
S('VAL-08',
"interface OpeningRow { kind: 'sinkhole'|'mouth'|'skylight'|'collapsed_shaft'|'ruin_entrance'; chance: number; coverM?: number }   // tables/under/openings.json",
"interface UnderOpeningRow { kind: 'sinkhole'|'mouth'|'skylight'|'collapsed_shaft'|'ruin_entrance'; chance: number; coverM?: number }   // tables/under/openings.json")
S('VAL-08',
"| `OpeningRow` | chances V11 §3.23.7; the candidates (our own):",
"| `UnderOpeningRow` | chances V11 §3.23.7; the candidates (our own):")

# ---- §2.3: the NetworkRule's bridge class (VEW-01)
S('VEW-01',
"| `classes.historical` | main: `through`, `primary`, `quay`, `bridge`; drain: `secondary`, `lane` | medieval mains ran under the principal streets (the vaulted sewer of 1370s Paris ran under a principal street to the river) |\n"
"| `classes.navigable` | main: `through`, `primary`, `secondary`, `quay`, `bridge`, `lane`; drain: `alley`, `cul_de_sac`, `track`, `path` | the fantasy network |\n"
"| `classCost` | through 0.8 · primary 0.9 · quay 0.9 · secondary 1.0 · bridge 1.0 · lane 1.3 · cul_de_sac 1.6 · alley 2.0 · track 2.5 · path 3.0 · pier ∞ · ford ∞ | flows prefer the main streets |\n",
"| `classes.historical` | main: `through`, `primary`, `quay`; drain: `secondary`, `lane` | medieval mains ran under the principal streets (the vaulted sewer of 1370s Paris ran under a principal street to the river) |\n"
"| `classes.navigable` | main: `through`, `primary`, `secondary`, `quay`, `lane`; drain: `alley`, `cul_de_sac`, `track`, `path` | the fantasy network |\n"
"| `classCost` | through 0.8 · primary 0.9 · quay 0.9 · secondary 1.0 · lane 1.3 · cul_de_sac 1.6 · alley 2.0 · track 2.5 · path 3.0 · pier ∞ · ford ∞ · bridge ∞ · aqueduct ∞ | flows prefer the main streets; a way over water and an aqueduct's channel never carry a sewer (V04 §3.2 N3) |\n")

# ---- §2.4: the graph's banks (VEW-01)
S('VEW-01',
"  nodes: { id: number; at: PointCm; groundCm: Cm; kind: 'junction'|'bend'|'culvert'|'outfall'; ref: Id | number /* way junction, hydro cell */ }[];\n",
"  nodes: { id: number; at: PointCm; groundCm: Cm; kind: 'junction'|'bend'|'culvert'|'outfall'; ref: Id | number /* way junction, hydro cell */;\n"
"           bank: number /* N3's bank: its connected component once the stretches over water are left out, numbered by its lowest node */ }[];\n")

# ---- §2.6: Find's reading's lifecycle row (G120-V04)
S('G120-V04',
"| the view key `showUnexcavated` (J-VI.19) | V09's per-viewer control | S14 | the viewer's view state, never the document | view only | not an event (a view key) | absent: `false` |\n",
"| the view key `showUnexcavated` (J-VI.19) | V09's per-viewer control | S14 | the viewer's view state, never the document | view only | not an event (a view key) | absent: `false` |\n"
"| `underFindPlaces` (Find on Below; g item 120) | derived on read for V09's `live.find` (V04 §5.1) | `live.find`, the Find panel's Below count | never: a view (the chips are §2.9's view key `find`, kept in view pins) | recomputed at each commit that rebuilds Find's index | follows its records | — |\n")
