### VOL-V11-V12-RESTATEMENTS-011 [restatements; None]
the item-110 off values listed again in NoOpPin.overlay's comment
REQUIRED: state it once at V11 §3.24.0 (switch table); every other place cites it
CLOSURE: FIX at the unit

### VOL-V11-V12-RESTATEMENTS-012 [restatements; None]
the raised-way calibration minima 0.02 (chance) and 1 (cap), also in J-V12.42, T-V12-39 and line 1879
REQUIRED: state it once at V11 row 80 (IN-V11-1); every other place cites it
CLOSURE: FIX at the unit

### V12-RESTATE-1 [restatement_findings; minor]
V12 §3.7.8 (1) says V11 §3.24.0's switch table is 'the one statement of each off form' (round 2 removed the list there, SCC-35), yet §2.13's overlay comment still lists every off value (raisedWays chance 0, terrace.enabled false, deck.offer 0, deck.landmarks chances 0, roster.specialisations chance 0).
REQUIRED: Cut the list from the comment; cite V11 §3.24.0's five row sets.
CLOSURE: FIX at the unit

### V12-RESTATE-2 [restatement_findings; minor]
The raised-way calibration minima (CITY and METROPOLIS chance 0.02, cap 1) are stated as values in both volumes (V11 only in an integration note; V12 in a rule, a decision and a test); the cells and their ColumnSpec belong to V11 row 80, so V12 should cite rather than restate (tests may keep the numbers as fixtures).
REQUIRED: Home the minima in V11 §3.24.2's raisedWays table (ColumnSpec stamp); V12 §3.7.2 (5) cites 'the owner-stamped minimum of the column'.
CLOSURE: FIX at the unit

### V12-ICONF-1 [internal_conflicts; minor]
The raised-way bump's records name 'the B-DOSSIER-lite towns carrying the water-system record (its factor on the aqueduct's chance, DR-V8.7)', but V11 withdrew the dossier factor (SS-13; V11 §3.24.7 (3) (b): 'the chance takes no factor from the record') and V12's own §1b dossier table says 'never a declaration' / 'V11's round 1 withdrew the chance factor'. The record's effect is the met need, cap step and bound terminal.
REQUIRED: Reword: '... carrying the water-system record (its met need, cap step and cistern terminal, V11 §3.24.7 (3))'.
CLOSURE: conflict ruling V12-ICONF-1

### V12-ICONF-2 [internal_conflicts; minor]
States that V06's design has the dossier's water-system record as 'a factor on the aqueduct's chance' - withdrawn by V11 (SS-13; V11 §3.24.7 (3)(b)), and contradicted by V12's own §1b dossier table and J-V12.55 ('the chance factor withdrawn').
REQUIRED: Reword to the met-need reading, or remove with the §13 narration.
CLOSURE: conflict ruling V12-ICONF-2

### V12-XCONF-1 [cross_volume_conflicts; major]
J122 (OWNER-DECISIONS-DELEGATED, V12 Q-V12-2) decided the owner's sittings happen 'only at the gating milestones (M1 look check, M2b, M4, M5), batched, about an hour each; a missed sitting leaves the milestone provisional - not rated'. V12 §0 lists sittings at M1, M2b, M4, M5, M6 (buildings), the village milestone, after the historical reconciliation, plus shorter ones for floor plans, underground, islands and town histories, 35-45 minutes each, splittable. Owner delegation outranks the volume (
REQUIRED: Apply J122 at V12's sitting schedule (§0, §3.9, §8): sittings only at M1, M2b, M4, M5, batched; the other panels folded into those sittings or run as unrated; mark Q-V12-2 answered (J122).
CLOSURE: conflict ruling V12-XCONF-1

### V12-XCONF-2 [cross_volume_conflicts; major]
V12 §2.10 says 'the table content hash that pins an output version (§6.4) excludes provenance.evidence, so rewording or adding evidence never moves an output version'; V11 §2.2 puts evidence inside every compiled cell's provenance and computes the table's content hash (H128) over the canonical JSON bytes, with the recipe pinning version AND hash (§2.9) - so adding evidence moves the hash. The two volumes define the pinning hash differently (and neither says whether provenance date/note are in it
REQUIRED: Rule once at the base's home (§6.4 / §7.6): the pinning hash covers value, unit, calibratable, extension, presets and excludes provenance (or evidence alone); V11 step 7 computes it that way and V12 §2.10 cites it.
CLOSURE: conflict ruling V12-XCONF-2

### V12-XCONF-3 [cross_volume_conflicts; minor]
V12's default metric `stages` name 'S5' and ranges 'S3 - S5', 'S12 - S12a' where base §4.1 registers the growth stage as four StageIds S5a-S5d (V11 expands a registry 'S5' as a group) and has no 'S12' (only S12a, S12b, S12c); V12 §3.7.2 (4)'s run scope compares a metric's stages with the tables' stageReaders (StageIds only), so an unexpanded 'S5' or a non-existent 'S12' would match nothing (PLAUSIBLE: depends on V12 expanding groups the same way).
REQUIRED: State metric stages as registered StageIds (S5a-S5d, S12a-S12c) or adopt V11's group-expansion rule for 'S5' by citation, and drop 'S12'.
CLOSURE: conflict ruling V12-XCONF-3

### V12-XCONF-4 [cross_volume_conflicts; minor]
V12 says it takes each unit 'as V11 §2.3 defines it at a plot' but defines district as 'the town's districts of >= 30 households (a smaller district is no unit)'; V11 §2.3's district unit is 'the plot's district' with no household threshold (the >= 30 threshold is only T-V11-18's 105 (k) dispersal reading). The bar and the mechanism count different units for a class whose coverage unit is district (watch, healing, infrastructure, sanitation, bathhouse, apothecary...).
REQUIRED: Decide one definition: either V11 §2.3 adds the >= 30 households rule for the district unit (and S10b scores it so), or V12 §3.6 measures all districts and keeps the >= 30 filter only for the unit: 'district' forcing of 105 (k).
CLOSURE: conflict ruling V12-XCONF-4

### V12-XCONF-5 [cross_volume_conflicts; minor]
BCR-V12-4's base text reads 'whose decision rule is the owner's (volume 12 Q-V12-3)', still framing Q-V12-3 as open, while J122 decided it ('only where the owner's sitting passes them - as recommended'). The base text would carry a pointer to an answered question.
REQUIRED: Cite J122's decision (the per-frame sitting rule of V12 §3.10.6) instead of 'Q-V12-3'.
CLOSURE: conflict ruling V12-XCONF-5

### V12-ELEG-1 [elegance_candidates; minor]
Producer and consumer of each record (CalibrationEntry, FramesFile, KnownCityFixture, NoOpPin, ...) are stated in both §1b and §2.11 (e.g. CalibrationEntry's writer and readers at §2.11 and at §1b); two lists to keep in step.
REQUIRED: Keep one table (§2.11 lifecycle with a consumers column) and let §1b cite it.
CLOSURE: elegance ruling (E-list)

### V12-MISSING-1 [missing_parts; minor]
J122 decided Q-V12-3 ('historical layers as defaults: only where the owner's sitting passes them - as recommended'); V12 still labels the rule 'default until ruled' and does not mark the question answered with J122 (principle (7) J122).
REQUIRED: Mark Q-V12-3 answered (J122) and drop 'default until ruled'.
CLOSURE: FIX at the unit

### V12-MISSING-2 [missing_parts; major]
J122 (OWNER-DECISIONS-DELEGATED-2026-09-29) decided the product order: after M4 four streams side by side (M5, V-M, M6-E, the plan rung's P0-P1), then M6 and M6-U after M5, then M6-sky, then M-CAL, then M-SF; M3c beside M3b; V-M0 right after M0. V12 still treats these rows as unordered pending the owner's decision - deferral wording and a stale dependency on answered questions (principle (7) J122: write the combined order into the plans).
REQUIRED: Rewrite the order rule with J122's combined order (and keep 'two stages at unordered rows' only for rows J122 leaves parallel: M5, V-M, M6-E, P0-P1).
CLOSURE: FIX at the unit

### V12-MISSING-3 [missing_parts; major]
J122 decided all three: Q-V12-1 'no'; Q-V12-2 'only at the gating milestones (M1 look check, M2b, M4, M5), batched, about an hour each; a missed sitting leaves the milestone provisional - not rated'; Q-V12-3 'only where the owner's sitting passes them - as recommended'. None is marked answered with J122, and Q-V12-2's decision differs from V12's schedule (seven main + four short sittings, ~45 minutes, splittable) - see the xconf on §0/§3.9/§6/§8.3 risk 6/BCR-V12-6 (b).
REQUIRED: Mark each answered (J122) with its decision; drop the 'until the owner answers' preamble; carry Q-V12-2's decision into §0, §3.9.1, §6's sitting rows, §8.3 risk 6 and BCR-V12-6 (b)'s sitting list.
CLOSURE: FIX at the unit

### V12-MISSING-4 [missing_parts; major]
g item 111 names V12: 'V12 (the bars)' - 111 (d): on arid seeds the share of households within walking distance of water exceeds the non-arid baseline; oases only on arid sites unless drawn or dossier-supplied; arid sites still draw rivers, lakes and coasts at the arid row's chances; the richest band's mean distance to water below the middle band's on arid seeds; with the oasis chance, water pull and (c)'s sun cell neutral, byte-identical (no-op pin). V12 carries none of these specs (no bar-map 
REQUIRED: F-MISSING: register 111 (d)'s bars on V12's harness (StatBarSpec/NullModelSpec rows with levels and counts, the no-op pin on NoOpPin, the register lines for 111's new cells, budgets, T-V12 bars).
CLOSURE: FIX at the unit

### V12-MISSING-5 [missing_parts; major]
g item 112 names V12: 'V12 (the trial's record)' - 112 (b): a game-master trial (ten to twenty SettlementForge game masters, at least two sessions of play each, before public release) whose findings enter the calibration record and the fix list; 112 (c) the trial's report exists before release. V12 has no record type, place in the release gate, or bar for it.
REQUIRED: F-MISSING: add the trial record (a record type beside ReconciliationRecord or a panel-like record, its lifecycle row, its place in the release gate, the bar 'report exists before release').
CLOSURE: FIX at the unit

### V12-MISSING-6 [missing_parts; major]
g item 113 names V12: 'V12 (the bars and the replay's budget)' - 113 (g): 'city to village' fixture shows walls and street lines beyond the present fabric and an oversized church with the dossier's present facts matching exactly; replay byte-stable per seed and history; refounded fixture reuses old roads; buried ruins only past the threshold matching former geometry; closing a void's last open link makes it LOST and reopening restores it; symbolic peak only with evidence, sized inside its tier, 
REQUIRED: F-MISSING: register 113's bars (fixture bars, byte-stability, the LOST/refound property as an exactMonotone-like step script, the no-op pin) and a §6 budget row for the history replay.
CLOSURE: FIX at the unit

### V12-MISSING-7 [missing_parts; minor]
'A bar that counted refusals of item 110 or of the sky layer counts bends (each with its line)' - normative content living only in the note (which 'supersedes any sentence of this volume that reads otherwise'); no bar in §3.6b or §7 is worded on bends.
REQUIRED: Fold into §3.6b (the indicator rule) and delete the note.
CLOSURE: FIX at the unit

### V12-TERM-1 [terminology; minor]
M4-110 is typed as a PanelGroup inside the M4 PanelSpec (panel id 'M4'), but prose in both volumes calls it a panel; PanelSpec's id list has no 'M4-110'. One concept, two names (panel vs group).
REQUIRED: Write 'the M4 panel's M4-110 group' (or 'panel M4, group M4-110') wherever a line names it.
CLOSURE: glossary (retired synonyms) / ID rulings

### V12-TERM-2 [terminology; minor]
Three unit vocabularies for one concept: V12's metric Unit ('m','m2','ha','deg','share','count','perHa','perKm','ratio','bits','ms','s','luma','rb','chroma','z','none'), V11's column unit ('m','m2','ha','cm','cdeg','share','weight','people','yr','wk','m3','lvl','none') and the base's list; e.g. 'deg' vs 'cdeg', 'count' vs 'people'. Neither cites the other.
REQUIRED: One unit vocabulary in the base (§2.1) that V11 and V12 both cite, each narrowing it by a subset where needed.
CLOSURE: elegance ruling (E-list)

### V12-NARR-1 [narration; minor]
Eight stacked 'PENDING FABLE REVIEW' banners and six REVISION/RECONCILIATION/PROGRESS ledgers (~95 lines) narrate the text's evolution; principle (8) allows one marker line and principle (5) removes narration.
REQUIRED: Replace by the close's single marker line; delete the ledgers.
CLOSURE: FIX at the unit

### V12-NARR-2 [narration; minor]
Wiring rows and type comments carry pass narration ('reconciliation round 2's continuation, SCC-R1C-2; round 4's continuation, SCC-R3C-1', 'round 5, SCC-90; round 6, SCC-98, SCC-103', 'SCC-102', 'SCC-105', 'V11's round 1, SCC-08', 'reconciliation round 3, SCC-54, SCC-68', 'V12C-09'); principle (5).
REQUIRED: Strip from all V12 normative text; keep J-V12.n pointers.
CLOSURE: FIX at the unit

### V12-NARR-3 [narration; minor]
Type comments carry pass narration (principle (5)).
REQUIRED: Strip.
CLOSURE: FIX at the unit

### V12-NARR-4 [narration; major]
About 440 lines narrate the text's evolution (per-round CONFIRMED paragraphs with other volumes' md5s, disposition paragraphs by seam id, lane times); principle (5) removes them (the validation records keep them). They carry stale or superseded facts (e.g. §13's dossier 'factor'; round-6 'M4b, M5 and the staged rows unruled').
REQUIRED: Replace §12 by the current CONFIRMED/PLAUSIBLE list and §13 by an empty fix list; fold IN-V12-3 (count bends, not refusals) into §3.6b; delete the rest.
CLOSURE: FIX at the unit

### V12-NARR-5 [narration; minor]
Decision rows carry pass narration and superseded versions (J-V12.55 still leads with 'source values generated, declared and carried' before its amendment to two values; J-V12.21, J-V12.71, J-V12.72, J-V12.74, J-V12.77, J-V12.78 carry amendments).
REQUIRED: State each decision in its current form; strip round headers and seam ids.
CLOSURE: FIX at the unit

### V12-BREF-1 [broken_references; minor]
V12's own convention (V12-0001) says '§ points into the base, V12 § into this volume', yet 30 bare § refs (15 body, 15 tail) name sections that exist only in V12 (base has no §2.13, §2.10, §3.10.1) or another volume's continuation; read by the convention they dangle.
REQUIRED: Prefix them 'V12 §' (or the owning volume) - mechanical script.
CLOSURE: FIX at the unit

### V12-BREF-2 [broken_references; minor]
Same collision in V12: bare BCR-n ids resolve to both V01's and V04's numbering.
REQUIRED: Volume-qualify each.
CLOSURE: FIX at the unit

### V12-HANDOFF-1 [handoffs_to_canon; minor]
Hand-offs left open with deferral wording: 'the next round of each may cite the ids', 'each volume's next round may write the ids in its lines', 'V4 §8's row may take that order and cite V12's line at its next round', 'SCC-113, left for V04's next lane' (also on INDEX §7's fix list: SCC-113 and SCC-109's X-V12-18 clause). Principle (10) closes every hand-off at its destination in this pass; the no-defer rule forbids 'next round'.
REQUIRED: Close each at V01, V03, V04, V05, V06, V07, V02 (write the volume-qualified ids and the staged order in their lines; V04's BCR-45/J-V4.118 name raisedWays.structure.span.*) and restate X-V12-17..19 as closed.
CLOSURE: FIX at the unit

### SCC-109's X-V12-18 clause [seam-r6-open (INDEX §7 fix list); minor]
docs/volumes/critique/seam-content-calibration-r6.md SCC-109's X-V12-18 clause
REQUIRED: X-V12-18 states that V04's rows take V12's span-rule order (SCC-113 closes V04's side).
CLOSURE: FIX at the unit

### V12:IN-V12-1 [integration-note; minor]
* **IN-V12-1 (J-VI.17 H29; volume 5's §13 item 13).** The register lists `accessSiting.deckGapM` and `lineClearM` as volume 5's `IslandRule` cells (own, calibrate-later), never as volume 11 rows.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V12:IN-V12-2 [integration-note; minor]
* **IN-V12-2 (J-VI.10).** X-V12-9 is met by volume 11's IN-V11-1 (the `ownerRule` stamps and the raised-way calibration minima) and V11 §3.24.0's FM line (`presets.FM` resolving the stepped and deck families off; V11's round 1, SCC-09).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V12:IN-V12-3 [integration-note; minor]
* **IN-V12-3 (J-VI.4).** A bar that counted refusals of item 110 or of the sky layer counts bends (each with its line).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V12:IN-V12-4 [integration-note; minor]
* **IN-V12-4 (J-VI.18, J-VI.3).** BCR-V12-15 and BCR-V12-17 are applied with BCR-V9-31 as file f item 447's one text; BCR-V12-15's closure barrier kinds are J-VI.3's six (edited in place); the metric variant also carries the span polygons (kind `span`) that text adds, which no bar of this volume nee
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit
