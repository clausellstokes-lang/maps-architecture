from lib import *
t = extract(401, 516)
R = [
("Every record, field, table, interface, edit kind and derived view this volume adds, with its producer, its consumers and\nthe base hook it plugs into. \"Rendered / labelled / exported / persisted\" name the rows of V06 §5 and §2.",
 "Every record, field, table, interface, edit kind and derived view this volume adds, with its producer, its consumers and\nthe base hook it plugs into; rendering, labels, exports and persistence are V06 §5's and §2.12's rows. Each row is wired at\nboth ends (principle (7)); a cross-volume consumer named here holds the matching row in its own volume."),
("`ProductEpochContext`, the part a product's phases, participants and records placement read (seam TX-02)",
 "`ProductEpochContext`, the part a product's phases, participants and records placement read"),
("`@plat/sky` registers `sky.islands` (V05 §3.15) and `sky.clearance` (BCR-V5-28);",
 "`@plat/sky` registers `sky.islands` (V05 §3.15) and `sky.clearance` (V05 §3.15 (7), its request carried by V06 §3.2's table);"),
("V04's maintenance mode at a village rung; TR-18)", "V04's maintenance mode at a village rung)"),
("(V07 §2.1, §3.12; TV-03), each run", "(V07 §2.1, §3.12), each run"),
("under any product (V06 §3.2's scopes; TW-08); each registration carries the `stage` V06 §3.16 names (`SKY`, `S9b`, `U-FADE`, `VS1`, `VS2`, `VS8`; SCC-R2C-11)",
 "under any product (V06 §3.2's scopes); each registration carries the `stage` V06 §3.16 names (`SKY`, `S9b`, `U-FADE`, `VS1`, `VS2`, `VS8`); under the history replay each declares its `replay` mode (V06 §3.20.4)"),
("the base's lottery → `DeclineOp`", "the base's strike pool → `DeclineOp`"),
("| §4.11 *The strike lottery* |", "| §4.11 *The strike pool* |"),
("(with a stretch, or with none to lift a neglect — \"back in use\", TU-02)", "(with a stretch, or with none to lift a neglect — \"back in use\")"),
("(`retypeLand` of the village's fair field over hinterland faces, V07 §3.12 (a); TV-02)", "(`retypeLand` of the village's fair field over hinterland faces, V07 §3.12 (a))"),
("| §4.11 `ConversionOp` (item 209) |", "| §4.11 `ConversionOp` (item 209; the union declared at V06 §2.8) |"),
("(a covered way dropped to `track`, V05 §3.16 (4); TR-19)", "(a covered way dropped to `track`, V05 §3.16 (4))"),
("V08 §4.6 item 3 (`raised.suppressedFired`, V06 §3.19.3 (2); SR3-10) | §5.4 (item 339) |",
 "V08 §4.6 item 3 (`raised.suppressedFired`, V06 §3.19.3 (2)); the replay record's story (W86) | §5.4 (item 339) |"),
("(S10b's `dossier` request; at a village rung the product's `records` placement first, V07 §3.12 *Records at a village epoch* item 4; SR5-04, J-V6.125)",
 "(S10b's `dossier` request; at a village rung the product's `records` placement first, V07 §3.12 *Records at a village epoch* item 4; J-V6.125)"),
("the landmarks on high ground the raised-way pass reads", "the landmarks on high ground the raised-way pass reads"),
("the landfall members' faces included; TR-06)", "the landfall members' faces included)"),
("(V06 §3.19.3 (2); SR3-10) | item 290 |", "(V06 §3.19.3 (2)) | item 290 |"),
("a removal of a generated raised way, harbour-mouth chain, quay wall, retaining wall or deck plot (V06 §2.13, §3.19.3; ST-15)",
 "a removal of a generated raised way, harbour-mouth chain, quay wall, retaining wall or deck plot (V06 §2.13, §3.19.3)"),
("the same events (V06 §3.19.3 (3), (7); SR3-08)", "the same events (V06 §3.19.3 (3), (7))"),
("the dry run's line; V10's \"removed by you\"", "the dry run's line (V09's `info.remove.holds`); V10's \"removed by you\""),
("| item 110 (b); critique-V5 C5-52 |", "| item 110 (b) |"),
("`breach` and `ruin` on decks (ST-38);", "`breach` and `ruin` on decks;"),
("**the one reader list of every field** (TU-06 (b): the field comments point here)", "**the one reader list of every field** (V06 §2.1's field comments point here)"),
("`surfaceChanged`: `AccessPass.run` (e) (V06 §3.5.2; TR-06);", "`surfaceChanged`: `AccessPass.run` (e) (V06 §3.5.2);"),
("(V03's outside-ground row; item 263; T-V3-30; TU-06 (c))", "(V03's outside-ground row; item 263; T-V3-30)"),
("V04's arch-vault chambers laid, collapsed or deleted (critique-V4 C4-110-1–C4-110-3); U-NET's drop junctions (C4-110-7);",
 "V04's arch-vault chambers laid, collapsed or deleted; U-NET's drop junctions;"),
("| V05's clearance rule (BCR-V5-28): an island raised only where its floor fails, a listed fate | V05 (critique-V5 C5-47 (3)) |",
 "| V05's clearance rule (V05 §3.15 (7)): an island raised only where its floor fails, a listed fate | V05 §3.15 |"),
("on each solved course — its stations, pier rings and `raised_too_tall` drop (V06 §3.19 (5); TV-07)",
 "on each solved course — its stations, pier rings and `raised_too_tall` drop (V06 §3.19 (5))"),
("read by V04's buried-system builder as steps in the buried floor (ST-34);", "read by V04's buried-system builder as steps in the buried floor;"),
("| W73 | underground households at an epoch (V06 §3.18.1 (4), (6); ST-19, ST-20) |", "| W73 | underground households at an epoch (V06 §3.18.1 (4), (6)) |"),
("| W74 | `EpochScope.recut` and `EpochScope.workings` (V06 §2.1; ST-54, ST-29) |", "| W74 | `EpochScope.recut` and `EpochScope.workings` (V06 §2.1) |"),
("| W75 | `ProductDeclEpoch.rows` and `ProductEpochRows` (V06 §2.1; ST-26), and `ProductDeclEpoch.records` with its `EpochPlacement` (TV-02) | a product's registration (V07 §2.2's `epoch.rows` cell; TT-06; V07's `village.records`, V07 §2.1) |",
 "| W75 | `ProductDeclEpoch.rows` and `ProductEpochRows` (V06 §2.1), and `ProductDeclEpoch.records` with its `EpochPlacement` | a product's registration (V07 §2.2's `epoch.rows` cell; V07's `village.records`, V07 §2.1) |"),
("(V06 §3.2 row 12, §3.16's *Keys*; V07 §3.12 *Records at a village epoch*; TW-01, TW-02)", "(V06 §3.2 row 12, §3.16's *Keys*; V07 §3.12 *Records at a village epoch*)"),
("(V06 §3.5.2; TR-03);", "(V06 §3.5.2);"),
("(V06 §3.8.2; TT-01, TU-05);", "(V06 §3.8.2);"),
("| W76 | the `landfall` candidate kind and its clearance (V06 §3.5.2; ST-13, TR-05, TR-06) |", "| W76 | the `landfall` candidate kind and its clearance (V06 §3.5.2) |"),
("on item 244's support keys; TT-03)", "on item 244's support keys)"),
("| §4.11 *The strike lottery*, *Salvage*; V05 §3.16 |", "| §4.11 *The strike pool*, *Salvage*; V05 §3.16 |"),
("| W77 | `repairRetaining` and the restoration rule (V06 §2.8, §3.19.4 (6); ST-10) |", "| W77 | `repairRetaining` and the restoration rule (V06 §2.8, §3.19.4 (6)) |"),
("| W78 | a deck's condition — its host's lifecycle existence (V06 §2.12; ST-56) |", "| W78 | a deck's condition — its host's lifecycle existence (V06 §2.12) |"),
("(item 575's `Enceinte.condition`; V06 §2.12, §3.7.2–§3.7.5; TT-04, TT-05)", "(item 575's `Enceinte.condition`; V06 §2.12, §3.7.2–§3.7.5)"),
("(existence in use when every run is `standing`, else `decayed`; TU-02); §3.7.2 (3)'s dismantling",
 "(existence in use when every run is `standing`, else `decayed`); V06 §3.7.2 (3)'s dismantling"),
("excepted (V06 §3.7.6 (5); TU-01); the towers and gates drawn by their runs (TU-01);", "excepted (V06 §3.7.6 (5)); the towers and gates drawn by their runs;"),
("(T-V6-6–10, 13, 16, 18, 28, 31, 32, 40, 43, 54, and the epoch forms of T-V6-34 and T-V6-37; SCC-73)",
 "(T-V6-6 – T-V6-10, T-V6-13, T-V6-16, T-V6-18, T-V6-28, T-V6-31, T-V6-32, T-V6-40, T-V6-43, T-V6-54, T-V6-71, T-V6-72, and the epoch forms of T-V6-34 and T-V6-37)"),
("| W81 | the `field` phase's way-surface re-lay (V06 §3.2 row 4, §3.4 (9); SCC-95) |", "| W81 | the `field` phase's way-surface re-lay (V06 §3.2 row 4, §3.4 (9)) |"),
("then its class's column; SCC-31) (V02 §3.16)", "then its class's column; V02 §3.16)"),
("the chance untouched (no dossier factor: V11's round 1, SS-13; J-V8.67)", "the chance untouched (no dossier factor; J-V8.67)"),
("never a sky landmark (critique-V5 C5-52 (b))", "never a sky landmark"),
]
t = apply(t, R, strict=False)
t = strip_narr_ids(t)
# new rows after W81
NEW = """| W82 | the failing spring — `WaterBody.spring.flow` over epochs (V06 §3.12.1; item 111 (b)) | the `terrainWater` step's spring row: the span's drought conditions (`ConditionOverlay` archetype `drought`), the town's draw on the spring against its yield (V11 §3.24.6's water table), a dossier's `oasis_water` deposit turned `depleted` or `removed` (DR40); a hand `setAttr` of `flow` (T2 `ground`) | the water pull on the growth field and the prosperity water term (§4.2 S3 (6), §4.4, §4.5), both weighted by `flow` and re-read by the next phases of the same epoch; the grove and gardens it feeds (`fedBy`) withering by `retypeLand`; the decline phase's exposure (the dry term); the report (`springs`) and the chronicle (`springFailed`, `springRecovered`); V10's why rows for the water pull | §2.3 `WaterBody.spring` (item 111); §4.11 trigger rows |
| W83 | `HistoryReplay` — the replay engine at generation (V06 §3.20) | §4.11's history-first generation, after S0–S13a at the start population; `HistoryHint` (§2.7, V08) through DR36–DR39; the blueprint's history option (§4.2 S0) | the creation-prefix `epoch` events (flag `creation`), one per coarse epoch, folded by W1 like any epoch; W86; the report's `replay` section | §4.11 *History-first generation*; §6.1's replay epoch component |
| W84 | `ReplayPlan` — the coarse epochs, their spans, targets, rungs and mapped events (V06 §3.20.2–§3.20.3) | DR36's peak, DR37's events and histories, DR38's destruction and refounding; V11's event-to-epoch rows and `history.*` cells | W83's `EpochInputs` per coarse epoch (population target, week, events, circumstance slice, dossier requests); the replay record W86 | §7.7 DR36–DR39 |
| W85 | the event effect kinds — `hazard`, `condition`, `slice`, `request`, `population`, `destroy`, `refound` — and their reading of V11's event-to-epoch rows (V06 §3.20.3) | V11's event-to-epoch rows (one per SettlementForge history event type); the event's years ago and severity | `EpochInputs.events` (W5's hazard rows), `circumstances`, the dossier requests of step (e), the population target, the destruction and refounding of V06 §3.20.5; the report's `replay.unmapped` | V11 (item 113's table values) |
| W86 | the replay record — `HistoryRecord` (§2.7) written once at generation (V06 §3.20.6) | W83 at the replay's end | V10's story ("the walls were built when this was a city of twelve thousand"; "its exact size is not recorded"); the reader's history line; §7.7's history rows; the timeline bar's past range (W87); `chronicle.csv`'s replay rows; the GeoJSON document properties | §2.7 `HistoryRecord` (item 113) |
| W87 | the replayed past on the timeline (V06 §3.15.4, §3.20.6) | the creation prefix's coarse epochs (W20's index rows marked `replay`) | the timeline bar's past range (read-only: scrub and then-and-now, no fork inside it); `locate(w)` for a week in it | §2.9 `week` view key |
"""
anchor = "| §4.11 step (a) with §4.5's hysteresis; V01 §3.7.3's epoch clause; item 207 (a) |\n"
assert t.count(anchor) == 1
t = t.replace(anchor, anchor + NEW)
# dossier trace rows
R2 = [
("| the prosperity word | `wealth.label` → `intent.wealthLevel` by `tables/dossier/wealth` | DR6 | `EpochInputs.wealthLevel` (item 343) → the field's character offset |",
 "| the prosperity word | `wealth.label` → `intent.wealthLevel` by `tables/dossier/wealth`; over epochs the changed word through V08 §3.5's `wealth` diff row (response `epoch`) | DR6 | `EpochInputs.wealthLevel` (item 343) → the field's character offset |"),
("| DR28 (item 388; the coherence pass numbers it), §7.7 F5 |", "| DR28 (item 388), §7.7 F5 |"),
("| DR9, DR24, T9 (item 108; the coherence pass's numbers) |", "| DR9, DR24 (item 108's ladder rows) |"),
("| the coherence pass's row for item 105 (i) (research/sf/mapping.md row 46 as input) |", "| DR33 (item 105 (i)) |"),
("| the cathedral record (a singular anchor) and the religious-category records with their count ranges (item 108's members) | DR9, DR24 |",
 "| the cathedral record (a singular anchor) and the religious-category records with their count ranges (item 108's members) | DR9, DR24, DR32 |"),
("| DR9, DR24 (the coherence pass's row for item 109 (k)) |", "| DR9, DR24, DR32 (item 109 (k)) |"),
("| DR19, DR17 (the coherence pass's rows for item 109 (b)) |", "| DR17, DR19, DR30, DR31 (item 109 (a), (b)) |"),
("| the realm block's latitude | DR29 (V08) |", "| the realm block's latitude | DR29 |"),
("| the coherence pass's row for item 110 (b) (V08's trace) |", "| DR34 (item 110 (b)) |"),
("| the coherence pass's row for item 110 (b) |", "| DR35 (item 110 (b)) |"),
]
t = apply(t, R2)
HIST = """| the oasis's water | `site.deposits`'s `oasis_water` (its state at each epoch) | DR40 (item 111 (a)) | the failing spring's dossier case — a deposit turned `depleted` or `removed` takes the spring's `flow` down by the spring row (V06 §3.12.1); never makes a spring fail where the dossier keeps the deposit live |
| the history: the peak | `peakTier`, the high-water population; else the evidence of a higher tier (`tierHistory`'s from-tier, `populationHistory`'s maximum, `calamityHistory`'s losses, ruined or remnant records of a higher tier, a resettlement) | DR36 (item 113 (a) (1), (f)) | the replay's start and its symbolic marking (V06 §3.20.2) |
| the history: the epochs and events | `history.ageYears`; `history.events` (type, years ago, severity); `tierHistory`, `populationHistory`, `calamityHistory` | DR37 (item 113 (a) (2)) | the replay plan's spans, targets and mapped events (V06 §3.20.2–§3.20.3) |
| the history: destruction and refounding | the lifecycle's terminal death and resettlement (`destroyedByEventId`, `lifecyclePatch`); a catastrophic event; an ancient "Fall of" event on the site | DR38 (item 113 (b)) | the replay's `destroy` and `refound` epochs (V06 §3.20.5) |
| the history: burial | the ruins' ages from the replay; floods, river silt and rebuilding on top; bare rock (`site.terrain`) | DR39 (item 113 (c)) | the burial test at each coarse epoch (V06 §3.20.5 (3)) |
"""
anchor2 = "| persons | `notables[]` (staged, item 88) | DR22 | never changed by succession (V06 §3.14) |"
assert t.count(anchor2) == 1
t = t.replace(anchor2, HIST + anchor2)
save('03-s1b.md', t)
print(words(t))
