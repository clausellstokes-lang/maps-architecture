# Inventory — design volumes V11 (content) and V12 (calibration) (coherence/inventory-vol-V11-V12)

PROGRESS
- working store: docs/validation/coherence/work/vol-V11-V12/ (items.jsonl, findings.jsonl, terms.py, add.py, build.py, render_md.py)
- sources: docs/volumes/V11-content.md (5411 lines, 106185 words, md5 0b37bab0), docs/volumes/V12-calibration.md (3566 lines, 76414 words, md5 0cada4c8)
- [x] V11 read whole and inventoried: V11-0001..0647
- [x] V12 read whole and inventoried: V12-0001..0403
- [x] cross-reference census and resolution (scripts)
- [x] restatements, internal conflicts, wiring gaps, elegance, edges
- [x] generate .json and .md; results file; LANDED

## Outcome

1050 normative items (V11 647, V12 403), 113 defined terms, 12 restatements, 85 findings (14 major). No cited id or section dangles; the reference problems are form problems (bare own-section §, bare BCR-n). The largest gaps: g items 111-113 are absent from both volumes (F-MISSING, 5 findings), the J122 owner decisions are not recorded (V11 Q-V11-1; V12 Q-V12-1..3, sittings, staged order), and V12 §2.10 says evidence is outside the content hash while V11 hashes it.

CONFIRMED: every item, count, id census and section census was produced from the whole text of both volumes (read in full, md5 0b37bab0 and 0cada4c8) and by executed scripts; the cross-volume conflicts were checked against the named lines of the other volume or decision file. PLAUSIBLE: the two EDGE findings, V11-ICONF-4 (class-count scope) and the severity grading, which rest on reading rather than execution.

| category | V11 | V12 | total |
|---|---|---|---|
| missing parts | 6 | 7 | 13 |
| cross volume conflicts | 4 | 5 | 9 |
| internal conflicts | 7 | 2 | 9 |
| internal duplications | 3 | 0 | 3 |
| restatement findings | 7 | 2 | 9 |
| broken references | 3 | 2 | 5 |
| wiring gaps | 1 | 0 | 1 |
| edges observed | 2 | 0 | 2 |
| elegance candidates | 1 | 1 | 2 |
| terminology | 1 | 2 | 3 |
| deferral wording | 4 | 0 | 4 |
| handoffs to canon | 1 | 1 | 2 |
| narration | 18 | 5 | 23 |
| restatement entries (cross-part facts) | 10 | 2 | 12 |
| terms | 61 | 52 | 113 |

Shrink estimate (narration outside the normative text): V11 12624 words in lines 3-108, lines 4825-5020, lines 5064-5411; V12 8203 words in lines 3-105, lines 3123-3297, lines 3313-3544; plus inline pass markers in normative text (V11: reconciliation round n 137, round n's continuation 54, SCC- 433, SR 190, SS- 135, V11C- 82; V12: reconciliation round n 160, round n's continuation 49, SCC- 404, SS- 4, V12C- 35).

## Missing parts (F-MISSING for g items 111+; J122 decisions not recorded; content only in notes)

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-MISSING-1 | major | V11-0642 | §11 Q-V11-1 (and §3.11 kinds rows slave_market, slave_market_district, §3.14 concealment rows) | J122 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md) decided Q-V11-1: 'keep, concealed by default in player views, shown as SettlementForge's own settings show them'. V11 still carries it as an open question with a recommendation, not marked answered with J122; and the decision's 'concealed by default in player views' differs from V11's text, which draws the slave market as a VISIBLE market hall (only trafficking and kidnapping concealed) and says nothing of following SettlementForge's own settings. | Mark Q-V11-1 answered (J122) and make the four sensitive kinds concealed by default in player views (concealment rows for slave_market and slave_market_district; the knowledge setting following SettlementForge's own settings), at V11 §3.11/§3.14 with the owner rule as authority. |
| V11-MISSING-2 (F-MISSING) | major |  | V11 (whole; §3.3.5, §3.17, §3.24.6) | g item 111 (from item 111 onward, applied by every unit it names) names V11: 'the oasis chance, grove and garden rows, the water-pull weights and the sunlight cell per climate row'. V11 has none of them: no oasis chance or grove/garden rows, no water-pull weights (growth field, prosperity water term, well placement by yield), and item 102's w_sun is one global weight (§3.3.5, 0.02) with no per-climate cell (111 (c): hot arid rows zero or toward shade; neutral values give a no-op pin). | F-MISSING: write V11's part of item 111 at build depth (rows, constants, the per-climate sun cell with its temperate value = 0.02, the no-op pin, register entries, lifecycle rows, tests). |
| V11-MISSING-3 (F-MISSING) | major |  | V11 (whole; §3.18, §3.23, §3.24.1) | g item 113 names V11: 'event-to-epoch rows, burial thresholds' (history-first generation: the event-to-epoch mapping's content rows, the replay's coarse-epoch default 'decades', the burial threshold 'a century by default, shortened by floods, river silt and rebuilding, lengthened on bare rock', the symbolic peak's representative value 'the range's lower quartile'). V11 has none of these rows. | F-MISSING: write V11's part of item 113 (the event-to-epoch table rows, the burial-threshold table with its modifiers, the symbolic-peak sizing cell, their registry rows, readers, lifecycle and tests). |
| V11-MISSING-4 | minor | V11-0645, V11-0646 | Integration notes IN-V11-1, IN-V11-2, IN-V11-3 | Normative content lives only in the integration notes ('each note supersedes any sentence of this volume that reads otherwise'): IN-V11-1's ownerRule stamping is absent from §3.2.1 (compile steps) and its calibration minima (chance 0.02, cap 1) from §3.24.2's rows; IN-V11-2's wingRole words 'the seating', 'a gate passage' are absent from §3.20.1's building.wingRole row; IN-V11-3's 'vaults' naming slice appears in neither §3.20.1 nor registry row 68's naming.* list, so a slice V04 relies on has no GrammarDef home (T-V11-1 (a) would flag it). | Fold each note into its home section (§3.2.1 step 4/7, §3.24.2, §3.20.1 and registry row 68 gaining naming.vaults) and delete the notes. |
| V11-MISSING-5 | minor | V11-0277, V11-0310, V11-0503 | §3.5.1 commonness bullet, §3.2.1 step 5a, T-V11-4 (INDEX §7 fix list: SR6-09 (a), seam-settlements-r6) | Open on the INDEX fix list: the v. rows' commonness is produced by a V07 script while V11's lifecycle row says the compile recomputes it; step 5a and §3.5.1 compute it only for town-and-city rows (J-SR6.6 chose the compiler as the one producer). A cell with two producers. | §3.5.1 adds 'for a v. row, V07 §2.4's rule (roster share at VILLAGE's default target, rounded 0.01, never below 0.01)'; step 5a compiles it; T-V11-4 reads 'on a town-and-city or v. row compiled, never stated'. |
| V11-MISSING-6 | minor | V11-0278, V12-0095 | V11 §3.2.1 (compile steps) vs V12 §2.10 / X-V12-9 | V12 §2.10 says 'V11's compiler stamps ownerRule from the owner-rule rows (X-V12-9)' and writes status into dist/evidence.json ({status, lines} per cell, 'owner' for a stamped cell); V11 §3.2.1 step 7 writes dist/evidence.json as 'one line per cited evidence id' and no compile step stamps ownerRule (only integration note IN-V11-1 says so). The producer V12 relies on is missing at its home. | V11 §3.2.1 gains the ownerRule stamp (step 4 or 5a) and step 7's evidence.json shape {cell: {status, lines}} reading the register; cite V12 §2.10. |
| V12-MISSING-1 | minor | V12-0183 | §3.10.6 'The decision (Q-V12-3, default until ruled)' and §3.10.3 R1 | J122 decided Q-V12-3 ('historical layers as defaults: only where the owner's sitting passes them - as recommended'); V12 still labels the rule 'default until ruled' and does not mark the question answered with J122 (principle (7) J122). | Mark Q-V12-3 answered (J122) and drop 'default until ruled'. |
| V12-MISSING-2 | major | V12-0232 | V12 §3.11 Staged entries order ('M4b, M5 and the staged rows ... are unordered among themselves until the owner's product order fixes them (_integrate's product-order questions)'); also §8's build plan (to verify) | J122 (OWNER-DECISIONS-DELEGATED-2026-09-29) decided the product order: after M4 four streams side by side (M5, V-M, M6-E, the plan rung's P0-P1), then M6 and M6-U after M5, then M6-sky, then M-CAL, then M-SF; M3c beside M3b; V-M0 right after M0. V12 still treats these rows as unordered pending the owner's decision - deferral wording and a stale dependency on answered questions (principle (7) J122: write the combined order into the plans). | Rewrite the order rule with J122's combined order (and keep 'two stages at unordered rows' only for rows J122 leaves parallel: M5, V-M, M6-E, P0-P1). |
| V12-MISSING-3 | major | V12-0400 | V12 §11 (Q-V12-1, Q-V12-2, Q-V12-3) and §11's preamble 'Until the owner answers, the design runs on the recommendation marked default' | J122 decided all three: Q-V12-1 'no'; Q-V12-2 'only at the gating milestones (M1 look check, M2b, M4, M5), batched, about an hour each; a missed sitting leaves the milestone provisional - not rated'; Q-V12-3 'only where the owner's sitting passes them - as recommended'. None is marked answered with J122, and Q-V12-2's decision differs from V12's schedule (seven main + four short sittings, ~45 minutes, splittable) - see the xconf on §0/§3.9/§6/§8.3 risk 6/BCR-V12-6 (b). | Mark each answered (J122) with its decision; drop the 'until the owner answers' preamble; carry Q-V12-2's decision into §0, §3.9.1, §6's sitting rows, §8.3 risk 6 and BCR-V12-6 (b)'s sitting list. |
| V12-MISSING-4 (F-MISSING) | major |  | V12 (whole; §3.6b bar map, §3.11, §6, §7) | g item 111 names V12: 'V12 (the bars)' - 111 (d): on arid seeds the share of households within walking distance of water exceeds the non-arid baseline; oases only on arid sites unless drawn or dossier-supplied; arid sites still draw rivers, lakes and coasts at the arid row's chances; the richest band's mean distance to water below the middle band's on arid seeds; with the oasis chance, water pull and (c)'s sun cell neutral, byte-identical (no-op pin). V12 carries none of these specs (no bar-map rows, register lines, budgets or T-V12 bars). | F-MISSING: register 111 (d)'s bars on V12's harness (StatBarSpec/NullModelSpec rows with levels and counts, the no-op pin on NoOpPin, the register lines for 111's new cells, budgets, T-V12 bars). |
| V12-MISSING-5 (F-MISSING) | major |  | V12 (whole; §3.9, §5.5, §8) | g item 112 names V12: 'V12 (the trial's record)' - 112 (b): a game-master trial (ten to twenty SettlementForge game masters, at least two sessions of play each, before public release) whose findings enter the calibration record and the fix list; 112 (c) the trial's report exists before release. V12 has no record type, place in the release gate, or bar for it. | F-MISSING: add the trial record (a record type beside ReconciliationRecord or a panel-like record, its lifecycle row, its place in the release gate, the bar 'report exists before release'). |
| V12-MISSING-6 (F-MISSING) | major |  | V12 (whole; §3.6b, §6, §7) | g item 113 names V12: 'V12 (the bars and the replay's budget)' - 113 (g): 'city to village' fixture shows walls and street lines beyond the present fabric and an oversized church with the dossier's present facts matching exactly; replay byte-stable per seed and history; refounded fixture reuses old roads; buried ruins only past the threshold matching former geometry; closing a void's last open link makes it LOST and reopening restores it; symbolic peak only with evidence, sized inside its tier, marked symbolic; history replay off byte-identical (no-op pin); and the replay's generation budget. V12 has none. | F-MISSING: register 113's bars (fixture bars, byte-stability, the LOST/refound property as an exactMonotone-like step script, the no-op pin) and a §6 budget row for the history replay. |
| V12-MISSING-7 | minor | V12-0403 | Integration note IN-V12-3 | 'A bar that counted refusals of item 110 or of the sky layer counts bends (each with its line)' - normative content living only in the note (which 'supersedes any sentence of this volume that reads otherwise'); no bar in §3.6b or §7 is worded on bends. | Fold into §3.6b (the indicator rule) and delete the note. |

## Conflicts between volumes or with decision files

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-XCONF-1 | minor | V11-0469, V12-0209, V12-0227 | §3.24.1 retaining.settings paragraph | V11 §3.24.1 says stateSnapCm's register entry is 'V12's retaining line until V12 gives it the line X-V11-17 (f) proposes', but V12 §3.11 excludes stateSnapCm from the retaining line ('every other calibratable column but settings.stateSnapCm') and gives it the default line's entry at M3a, restated in place at V6-E2 by V06 §8's line on bar.T-V6-62, due V6-E7 (J-V12.82). V11's statement is stale and conditional ('until'). | V11 §3.24.1 cites V12 §3.11 (default line at M3a, V06 §8's line from V6-E2); drop 'until'. |
| V11-XCONF-2 | minor | V11-0261 | §3.1 registry row 87 (INDEX §7 fix list: SR6-08 of seam-surfaces-r6) | Row 87 types every messages/<locale>.json as MsgRow, while V09 §2.9 Locales (J-V9.121) types non-English files as {key; text} only (buttons, tone, codes read from en.json); open on the INDEX fix list (V09 XV-V9-31). | Row 87's row type 'MsgRow for en.json; {key; text} for every other locale file'; loader refuses a locale file carrying buttons, tone or codes; T-V11-1 follows. |
| V12-XCONF-1 | major | V12-0005, V12-0172, V12-0300, V12-0254, V12-0387, V12-0400 | V12 §0 'How it feels to the owner', §3.9.1 registered panels, §6 sitting rows, §8.3 risk 6, BCR-V12-6 (b), §11 Q-V12-2 | J122 (OWNER-DECISIONS-DELEGATED, V12 Q-V12-2) decided the owner's sittings happen 'only at the gating milestones (M1 look check, M2b, M4, M5), batched, about an hour each; a missed sitting leaves the milestone provisional - not rated'. V12 §0 lists sittings at M1, M2b, M4, M5, M6 (buildings), the village milestone, after the historical reconciliation, plus shorter ones for floor plans, underground, islands and town histories, 35-45 minutes each, splittable. Owner delegation outranks the volume (principle (3)). | Apply J122 at V12's sitting schedule (§0, §3.9, §8): sittings only at M1, M2b, M4, M5, batched; the other panels folded into those sittings or run as unrated; mark Q-V12-2 answered (J122). |
| V12-XCONF-2 | major | V12-0095, V11-0126, V11-0278 | V12 §2.10 vs V11 §2.2 (compiled row) and §3.2.1 step 7 | V12 §2.10 says 'the table content hash that pins an output version (§6.4) excludes provenance.evidence, so rewording or adding evidence never moves an output version'; V11 §2.2 puts evidence inside every compiled cell's provenance and computes the table's content hash (H128) over the canonical JSON bytes, with the recipe pinning version AND hash (§2.9) - so adding evidence moves the hash. The two volumes define the pinning hash differently (and neither says whether provenance date/note are in it; V11 calls a note change a 'patch = no output change'). | Rule once at the base's home (§6.4 / §7.6): the pinning hash covers value, unit, calibratable, extension, presets and excludes provenance (or evidence alone); V11 step 7 computes it that way and V12 §2.10 cites it. |
| V12-XCONF-3 | minor | V12-0114 | §3.4.2 default rule 'stages' vs V11 §2.1/§3.1 (StageId registration) and base §4.1 | V12's default metric `stages` name 'S5' and ranges 'S3 - S5', 'S12 - S12a' where base §4.1 registers the growth stage as four StageIds S5a-S5d (V11 expands a registry 'S5' as a group) and has no 'S12' (only S12a, S12b, S12c); V12 §3.7.2 (4)'s run scope compares a metric's stages with the tables' stageReaders (StageIds only), so an unexpanded 'S5' or a non-existent 'S12' would match nothing (PLAUSIBLE: depends on V12 expanding groups the same way). | State metric stages as registered StageIds (S5a-S5d, S12a-S12c) or adopt V11's group-expansion rule for 'S5' by citation, and drop 'S12'. |
| V12-XCONF-4 | minor | V12-0144, V11-0133 | V12 §3.6 servedShare 'district' unit vs V11 §2.3 CoverageSpec unit district | V12 says it takes each unit 'as V11 §2.3 defines it at a plot' but defines district as 'the town's districts of >= 30 households (a smaller district is no unit)'; V11 §2.3's district unit is 'the plot's district' with no household threshold (the >= 30 threshold is only T-V11-18's 105 (k) dispersal reading). The bar and the mechanism count different units for a class whose coverage unit is district (watch, healing, infrastructure, sanitation, bathhouse, apothecary...). | Decide one definition: either V11 §2.3 adds the >= 30 households rule for the district unit (and S10b scores it so), or V12 §3.6 measures all districts and keeps the >= 30 filter only for the unit: 'district' forcing of 105 (k). |
| V12-XCONF-5 | minor | V12-0386, V12-0183 | §10 BCR-V12-4 (c) item 10, §3.10.6, §4.3 | BCR-V12-4's base text reads 'whose decision rule is the owner's (volume 12 Q-V12-3)', still framing Q-V12-3 as open, while J122 decided it ('only where the owner's sitting passes them - as recommended'). The base text would carry a pointer to an answered question. | Cite J122's decision (the per-frame sitting rule of V12 §3.10.6) instead of 'Q-V12-3'. |
| V11-XCONF-3 | minor | V11-0465, V12-0208 | V11 §3.24.1 last paragraph ('own, calibrate-later at M3a') vs V12 §3.11 register line 21 (panel M4-110 at M4, then corpus E1 at M-CAL) | V11 dates the three bend cells' calibration 'at M3a' while V12's register line (the single home of calibration method and due) calibrates retainingReachM, flatDepthM, coverShare by the M4-110 panel at M4; read literally the two volumes name different milestones. | V11 says 'written at M3a; calibrated by V12 §3.11's terrace line' (cite, do not restate the due). |
| V11-XCONF-4 | minor | V11-0517, V12-0274 | V11 §8 C0 row exit cell ('plat calibrate register --check runs in CI from here', C0 lands at M0 (b)) vs V12 T-V12-20 ('tier PR from M1') and V12 §3.11 ('T-V12-20 runs at PR tier from M1'); V12 §8 W2 builds the command at M1 | V11 has the register lint in CI from C0 (M0), before V12's W2 builds the command and before V12's tier starts. | Cite V12: 'register --check joins CI at M1 (V12 T-V12-20)'; C0's exit drops the clause. |

## Internal conflicts

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-ICONF-1 | minor | V11-0240, V11-0256, V11-0257 | §3.1 rows 62 and 80 (and 81 by reference) | Readers lists contain conditional clauses left open: row 62 'should T-V11-1 (b) record those reads under S8, the row lists S8 in that change'; row 80 'should T-V11-1 (b)'s recorded reads tag an epoch stage's S5b as EVO_GROWTH, this row lists EVO_GROWTH in that change, J-V11.92'; row 81 'the same pre-decided move'. The normative readers set is not determined by the text (a readers entry is the invalidation map of §7.6), which is ambiguous normative text bordering on deferral wording. | Decide the StageId under which an epoch stage's S5b and the seed pass's reads are recorded (per V06 §3.2 / §4.1 registration), and write the determinate readers list. |
| V11-ICONF-2 | minor | V11-0359 | §3.7.2 produces list | 'lumber camp logs 0.9, bark 0.1' and later 'lumber camp logs' (no shares) are both in the produces list: a duplicated entry that reads as two different produces sets for one class. | Delete the second 'lumber camp logs' entry. |
| V11-ICONF-3 | minor | V11-0276, V11-0339, V11-0414 | §3.13.3 first sentence vs §3.2.1 step 5 and §3.5.14 | §3.13.3 says the compiler emits generic-<f> 'for every profile family f', while §3.2.1 step 5 and §3.5.14 say one per NON-ALIAS family (aliases civic, defence resolve to their target's generic class; 45 generic classes). | Word §3.13.3 as 'for every non-alias profile family'. |
| V11-ICONF-4 | minor | V11-0497 | §6 resolveSiting row | 'resolveSiting (~230 classes ...)' while §3.5.14 counts 181 authored + 45 generic + 2 sky = 228 plus V07's village classes, which step 6 compiles and T-V11-3/-4/-5 run over; the budget's class count omits the v. rows the derivation also iterates (PLAUSIBLE: depends on whether resolveSiting derives v. rows). | State the count as read from REGISTRY (as the compile row does) or include V07's v. rows. |
| V11-ICONF-5 | minor | V11-0339, V11-0527 | §9 J-V11.8 vs §3.5.14 | J-V11.8 says '≈ 179 authored town and city classes', while §3.5.14 counts 181 (fort and lighthouse added) and BCR-V11-11 says '≈ 180'; J-V11.94 says 'a town roster holds ≈ 180 classes'. | Make J-V11.8 read 181 (or '≈ 180' consistently) and cite §3.5.14's count. |
| V11-ICONF-6 | minor | V11-0643 | §12 revision paragraph (line 4841-4843) vs §3.1, §3.5.14, §1b | §12 states '86 registry catalogue rows (1-85 and 58a)', 'the class count (179 authored)' and wiring 'W1 - W66' as CONFIRMED by script, while the live text has 92 rows, 181 classes and W1-W78. | Remove with the narration or correct to the live counts. |
| V11-ICONF-7 | minor | V11-0402 | §3.12 mages_guild row (INDEX §7 fix list: SR6-09 (d)) | 'the tower's record binds the guild's hall' is ambiguous (tower becomes the hall, or a new hall takes the tower's key); V08 §3.5.1 (c)'s first case and V06's convert read it as re-designation in place. Open on the INDEX fix list. | Cell reads 'the wizard's tower becomes the guild's hall (re-designated in place; V08 §3.5.1 (c)'s first case)'. |
| V12-ICONF-1 | minor | V12-0167 | V12 §3.7.6 feature switch-on item 1 | The raised-way bump's records name 'the B-DOSSIER-lite towns carrying the water-system record (its factor on the aqueduct's chance, DR-V8.7)', but V11 withdrew the dossier factor (SS-13; V11 §3.24.7 (3) (b): 'the chance takes no factor from the record') and V12's own §1b dossier table says 'never a declaration' / 'V11's round 1 withdrew the chance factor'. The record's effect is the met need, cap step and bound terminal. | Reword: '... carrying the water-system record (its met need, cap step and cistern terminal, V11 §3.24.7 (3))'. |
| V12-ICONF-2 | minor | V12-0402, V12-0167 | V12 §13 fix list first paragraph | States that V06's design has the dossier's water-system record as 'a factor on the aqueduct's chance' - withdrawn by V11 (SS-13; V11 §3.24.7 (3)(b)), and contradicted by V12's own §1b dossier table and J-V12.55 ('the chance factor withdrawn'). | Reword to the met-need reading, or remove with the §13 narration. |

## Internal duplications

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-DUP-1 | minor | V11-0289, V11-0314 | §3.3.2 last sentence and §3.5.2 'T-V11-5's reading, stated once' | The T-V11-5 rule (a compiled profile fails only when it emits and is sensitive to one nuisance both at level 2 or more) is stated in §3.3.2 and again in §3.5.2, whose bullet claims to state it once. | Keep one statement (§3.3.2) and reference it from §3.5.2. |
| V11-DUP-2 | minor | V11-0135, V11-0276, V11-0314 | §2.3 (J-V11.25 paragraph), §3.2.1 step 5a, §3.5.2 last profile-delta bullet | The singular->neutral / district-defining->cluster competition override is stated three times in V11. | State it once (§2.3) and cite it from step 5a and §3.5.2. |
| V11-DUP-3 | minor | V11-0111, V11-0280, V11-0486 | §2.1 ColumnSpec.range comment, §3.2.3 (a), §4.1 | The clamp-and-one-line-note / F-EDIT refusal rule appears three times in V11 (and is a base rule, item 101 R2, §7.1 dry run). | One statement (§4.1, citing §7.1 and item 101 R2); the other two reference it. |

## Restatements (a fact of another home stated with its value)

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-RESTATE-1 | minor | V11-0108 | §2 line 320-323 | The unit list restates the base's units (§2.1) with additions (share, weight, people, yr, wk, m3, lvl, cdeg); it cites the base but re-lists; the new units (lvl, weight as score unit) need one home. | Cite §2.1 for the base units; state only V11's added units (weight, lvl) here, or move the full enumeration into §2.1 by BCR. |
| V11-RESTATE-2 | minor | V11-0111, V11-0126 | §2.1 ColumnSpec.range comment; §2.2 compiled row | The clamp-on-edit rule (item 101 R2, F-EDIT) and the compiled cell shape {value, unit, provenance {source, date, note, evidence?}, ...} are base facts (§7.1/§7.6, §5.2) restated in V11's type comments. | Cite §7.6 (cell shape) and §7.1 / item 101 R2 (clamp) instead of restating. |
| V11-RESTATE-3 | minor | V11-0175 | §2.10 village-keys row migrate cell | The migration defaults of the three bend cells are given as '15 m, 12 m, 0.8 (V09's constants)', restating V09's values; §3.24.1 writes the rows' values (check they agree) - two statements of one fact. | Cite §3.24.1's TOWN row values (the one home) rather than restating numbers attributed to V09. |
| V11-RESTATE-4 | minor | V11-0283 | §3.2.6 | The clean-room list-hit rule ('five or more words of one reference list on one line or in one column fails the PR unless an allow row ... is reviewed') restates base §17.1 (5)'s scan definition (ARCHITECTURE lines ~15016-15066). | Cite §17.1 (5) for the scan and its hit rule; keep only the content-specific points (P-id on ref rows, SF words not a reference list). |
| V11-RESTATE-5 | minor | V11-0332 | §3.5.8 Village rows bullet | Says V07's village crypt cells are 'cited, not restated' but restates them (v.parish_church basement, 0.1, cryptM2 20/25/35/45; v.chapel never) - values agree with V07 line 1055 today, but a second statement of V07-owned values. | Replace the values by a pointer to V07 §2.4 / §3.x's crypt cells. |
| V11-RESTATE-6 | minor | V11-0450 | §3.23 preamble 'V04's defaults table carries the same values as these rows until its next revision makes it cite them (X-V11-4)' | V04's defaults table restates V11 §3.23's values (two homes for one fact) and the text leaves the fix 'until its next revision' - a hand-off (X-V11-4) not yet closed at its destination and deferral-shaped wording. | Close X-V11-4 in this pass: V04's defaults table cites V11 §3.23 for these cells (verify at V04's inventory), and drop the 'until' clause here. |
| V11-RESTATE-7 | minor | V11-0308 | V11 §3.5.1 undergroundAccess.prob rows vs base §10.2 prose (ARCHITECTURE.md lines ~11632-11645) | The base's §10.2 prose states the undergroundAccess.prob defaults (higher for breweries, bathhouses, warehouses, inns, 0.15-0.30 by band; houses 0.02 raised by the age term; 0 for barracks, courthouse, temple) and V11 §3.5.1 writes the same values as table rows: two homes for one set of values. | Base §10.2 cites V11 §3.5.1's rows (the table is V11's), dropping its numbers. |
| V12-RESTATE-1 | minor | V12-0103, V12-0170 | V12 §2.13 NoOpPin.overlay comment (line 962-964) vs V12 §3.7.8 (1) and V11 §3.24.0 | V12 §3.7.8 (1) says V11 §3.24.0's switch table is 'the one statement of each off form' (round 2 removed the list there, SCC-35), yet §2.13's overlay comment still lists every off value (raisedWays chance 0, terrace.enabled false, deck.offer 0, deck.landmarks chances 0, roster.specialisations chance 0). | Cut the list from the comment; cite V11 §3.24.0's five row sets. |
| V12-RESTATE-2 | minor | V12-0163, V12-0342, V12-0293, V11-0645 | V12 §3.7.2 (5) (line 1606), §3.7.x floorsHeld (line 1879), J-V12.42, T-V12-39, V12 §13 BCR text (line 3032) vs V11 IN-V11-1 (line 5047) | The raised-way calibration minima (CITY and METROPOLIS chance 0.02, cap 1) are stated as values in both volumes (V11 only in an integration note; V12 in a rule, a decision and a test); the cells and their ColumnSpec belong to V11 row 80, so V12 should cite rather than restate (tests may keep the numbers as fixtures). | Home the minima in V11 §3.24.2's raisedWays table (ColumnSpec stamp); V12 §3.7.2 (5) cites 'the owner-stamped minimum of the column'. |

## Broken or ambiguous references

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-BREF-1 | minor | V11-0357, V11-0359 | §3.7.1 goods row 'herbs' (site 'land · meadow, garden') and §3.7.2 land-use provider list | 'garden' is not a LandUse.kind (§2.7 lists arable, strip_field, meadow, pasture, commons, orchard, vineyard, coppice, wildwood, quarry, claypit, mine, lumber, fishery, saltpan, marsh, reserve; V11 §3.17.2 writes one row per kind and has no garden); §3.7.2 names only meadow as the herbs provider. The herbs site cell points at a land use no stage produces (a dangling input of S10b's provider rasters / S2's need propagation). | Drop 'garden' from herbs' site (meadow only), or name the Greenery 'garden' as a provider by a stated rule. |
| V11-BREF-2 | minor |  | V11 throughout (census: scratchpad selfbare.json) | V11 cites its own sections with a bare § 197 times whose target exists only in V11, not in the base (80 in the body incl. the ledger lines 46-49, 117 in the §10b-§13 tables; e.g. line 46 '§3.11', '§3.12'), beside 'V11 §' elsewhere; V11 states no citation rule, and V12's (and the base's) convention reads a bare § as the base, so these refs resolve only by guessing the volume. | Qualify every own-section ref as 'V11 §n' (script: rewrite bare § whose target is absent from the base) and state the convention once in the header. |
| V12-BREF-1 | minor | V12-0001 | V12 body and tail (census: scratchpad selfbare.json; e.g. lines 1686 '§2.13', 1856 '§2.10', 1997 and 2208 '§3.10.1', 2113 '§3.5.8, §3.5.1') | V12's own convention (V12-0001) says '§ points into the base, V12 § into this volume', yet 30 bare § refs (15 body, 15 tail) name sections that exist only in V12 (base has no §2.13, §2.10, §3.10.1) or another volume's continuation; read by the convention they dangle. | Prefix them 'V12 §' (or the owning volume) - mechanical script. |
| V11-BREF-3 | minor |  | V11 citations of bare BCR-n (BCR-1, -3, -4, -6, -8, -12, -14, -31, -32, -36, -45, -46) | Bare 'BCR-n' ids are defined twice (V01 and V04 both number their base change requests BCR-1...), so a bare 'BCR-45' in V11 (e.g. §3.24.2, §12 'the seat landing BCR-45') is ambiguous; V11 writes 'V04 BCR-45' in some places and bare 'BCR-45' in others. | Cite volume-qualified ids ('BCR-V4-45' / 'V04 BCR-45') everywhere; one id form per concept. |
| V12-BREF-2 | minor |  | V12 citations of bare BCR-n (BCR-13, -21, -42, -45, -46) | Same collision in V12: bare BCR-n ids resolve to both V01's and V04's numbering. | Volume-qualify each. |

## Wiring gaps

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-WGAP-1 | minor | V11-0231, V11-0047 | §3.1 registry row 50 (era) readers vs §1b W19 | W19 lists 'V07 pump date' among EraRow's consumers and V07's VS8 reads the era row's pump date (V07 ~line 2138-2146), but registry row 50's readers list (S3, S5, S7, S11, S12a, S12b, S4, S6, EVO_RAISED, U-SYS) omits V07's village stage; the reader check (compile step 6) would refuse a read by an unlisted stage. The two reader lists for one table disagree. | Add V07's reading stage (VS8) to row 50's readers; derive W19's consumer list from row 50 instead of restating it. |

## Undefined edges

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-EDGE-1 | major | V11-0482, V11-0167 | V11 §3.24.5 'The rule' and 'The pre-decided failure for a cart class' | A crossing is a ramp (step over run <= rampMaxGrade, or a switchback within minTerraceDepthM), else a stair when the class has one; a cart class takes a ramp 'up to 1.5 x rampMaxGrade' (W_STEEP_RAMP), 'never a stair and never a gap'. The case where a cart class's crossing needs more than 1.5 x rampMaxGrade and no switchback fits (e.g. a 4 m step, stepMaxCm 400, on a through way at 0.08 with a short run) has no stated outcome (reroute, lower the step, lengthen the ramp past the terrace, or refuse). PLAUSIBLE: reasoning from the text. | Define the outcome beyond 1.5 x (e.g. the levelling lowers the step at that crossing, or the ramp lengthens along the wall) and test it in T-V11-32. |
| V11-EDGE-2 | minor | V11-0129, V11-0130 | V11 §2.3 CoverageSpec {per, target} | Satisfaction clamp(2 - n / target, 0, 1) and the households radius sqrt(per x a_res / pi) are undefined for target = 0 or per = 0 (and a_res = 0 in a district with no residential plots); no range for per/target is stated in the schema comment. PLAUSIBLE. | State ranges (target > 0, per > 0) in the ColumnSpec and the a_res = 0 case (unit empty -> satisfaction 1 or term skipped). |

## Elegance candidates

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-ELEG-1 | minor | V11-0029..V11-0106, V11-0169..V11-0190, V11-0203..V11-0265 | §1b wiring table (W1-W78), §2.10 lifecycle table, §3.1 registry rows' readers | The readers of each table are stated three times (W row consumers, §2.10 lifecycle 'read' cell, §3.1 registry readers), and the three already drift (W19 vs row 50, finding wgap V11 1). The item-110 lifecycle rows (terrace, retaining, raisedWays, ways.crossing, deck, deck.landmarks, roster.specialisations, water) repeat one create/read/regenerate/migrate pattern row by row. | Make §3.1's readers the single source; generate §1b and §2.10's read cells from it (or cite the row number), and state the item-110 lifecycle once as a pattern with per-table exceptions. Shrinks V11 without losing nuance. |
| V12-ELEG-1 | minor | V12-0012..V12-0057, V12-0098..V12-0101 | V12 §1b wiring table (rows 1-46) and §2.11 record lifecycle table | Producer and consumer of each record (CalibrationEntry, FramesFile, KnownCityFixture, NoOpPin, ...) are stated in both §1b and §2.11 (e.g. CalibrationEntry's writer and readers at §2.11 and at §1b); two lists to keep in step. | Keep one table (§2.11 lifecycle with a consumers column) and let §1b cite it. |

## Terminology

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-TERM-1 | minor |  | V11 §1b and throughout | Volume citations use two forms: 'V06 §3.9.9', 'V04 §2.3' beside 'V6 §3.16', 'V5 §3.21', 'V9 §2.6', 'V4 §2.3a', 'V2 §5.4', 'V1-3.15' (V01's internal form); principle (1) prescribes 'V04 §3.2'. | Canon: one citation form 'V0n §x.y' across the set; rewrite the short forms. |
| V12-TERM-1 | minor | V12-0208, V12-0173, V11-0465 | V12 §3.11 register lines 'panel (M4-110)', V11 §3.24.1 and J-V11.75 'M4-110's panel', vs V12 §2.6 CalibrationEntry.panel {id, group: 'M4-110'} and §3.9.1 ('six SOLO items inside the M4 sitting') | M4-110 is typed as a PanelGroup inside the M4 PanelSpec (panel id 'M4'), but prose in both volumes calls it a panel; PanelSpec's id list has no 'M4-110'. One concept, two names (panel vs group). | Write 'the M4 panel's M4-110 group' (or 'panel M4, group M4-110') wherever a line names it. |
| V12-TERM-2 | minor | V12-0062, V11-0110, V11-0108 | V12 §2.1 'type Unit' (line 354) vs V11 §2.1 ColumnSpec.unit (line 334) and base §2.1 units | Three unit vocabularies for one concept: V12's metric Unit ('m','m2','ha','deg','share','count','perHa','perKm','ratio','bits','ms','s','luma','rb','chroma','z','none'), V11's column unit ('m','m2','ha','cm','cdeg','share','weight','people','yr','wk','m3','lvl','none') and the base's list; e.g. 'deg' vs 'cdeg', 'count' vs 'people'. Neither cites the other. | One unit vocabulary in the base (§2.1) that V11 and V12 both cite, each narrowing it by a subset where needed. |

## Deferral wording and standing-rule breaches

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-DEFER-1 | minor |  | V11 line 19 | Revision note says 'V11 §13 lists what is deliberately left for later' - deferral wording against principle (6) and the no-defer rule; check §13 content. | Remove with the revision note; §13 must hold no open item. |
| V11-DEFER-2 | minor | V11-0311, V11-0329, V11-0426, V11-0429, V11-0441 | §3.5.8 crypt rows, §3.17.1 rain, §3.18 structures block, §3.20.3 culture block, §3.23 and §3.24 rows (passim) | The cell provenance shorthand 'calibrate-later' (and 'calibrate-later at M1 with its fallback' for detourFactor, §3.5.1) reads as deferral wording against principle (6); the values are set and each is a provisional number with a V12 register entry, so the text should say that instead. | Replace 'calibrate-later' by the register form ('provisional; V12 §3.11 register entry') throughout V11. |
| V11-DEFER-3 | minor | V11-0547 | §9 J-V11.28 | The decision records that the 280 kind rows were written from 'the V08 lane's export in the session scratchpad' - a source outside /Users/cstokes/Desktop/Maps (STANDALONE rule, principle (6)); the build source is the committed manifest (registry row 77), which the decision says replaces it. | Cite research/sf and the committed catalogue manifest as the source; drop the scratchpad reference. |
| V11-DEFER-4 | major | V11-0644 | §13 Fix list (lines 5022-5034) | The fix list keeps three open items under the heading 'What is deliberately left for later' (F-V11-1 ladder lessers, F-V11-2 vocabularies, F-V11-3 other volumes restating V11 rows) - the bar allows no open fix-list item and principle (6) forbids 'later' as an unresolved choice. F-V11-2 is a design decision (vocabularies authored at build under §3.20.6), F-V11-1 is closed by T-V11-2's build failure, F-V11-3 is an open single-source hand-off (X-V11-4, X-V11-11). | Close each: restate F-V11-1 and F-V11-2 as decisions (J rows), fix F-V11-3 at V04 and V06 (they cite V11 §3.18/§3.23/§3.24.2), and empty the fix list. |

## Hand-offs left open

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-HANDOFF-1 | minor | V11-0635, V11-0641 | §10b X-V11-1 ('the rest ride its next revision') and X-V11-17 ('No edit is made in their texts by this round; each is a companion for its owner's next round'; (c) the indefinite-article form proposed for 'V09's and V08's next rounds') | Hand-offs left open at their destinations with deferral wording; principle (10) requires every hand-off closed at its destination in this pass; the no-defer rule forbids 'next revision/round'. | Close each hand-off at V08, V09, V07, V04, V12 and f (verify at their inventories) and replace the deferral wording with the closed state. |
| V12-HANDOFF-1 | minor | V12-0398, V12-0399 | §10 cross-volume notes X-V12-17, X-V12-18, X-V12-19 | Hand-offs left open with deferral wording: 'the next round of each may cite the ids', 'each volume's next round may write the ids in its lines', 'V4 §8's row may take that order and cite V12's line at its next round', 'SCC-113, left for V04's next lane' (also on INDEX §7's fix list: SCC-113 and SCC-109's X-V12-18 clause). Principle (10) closes every hand-off at its destination in this pass; the no-defer rule forbids 'next round'. | Close each at V01, V03, V04, V05, V06, V07, V02 (write the volume-qualified ids and the staged order in their lines; V04's BCR-45/J-V4.118 name raisedWays.structure.span.*) and restate X-V12-17..19 as closed. |

## Narration

| id | sev | items | where | claim | fix |
|---|---|---|---|---|---|
| V11-NARR-1 | minor |  | V11 lines 3-12 | Ten stacked 'PENDING FABLE REVIEW' banner lines (one per lane: V11-content, revise-V11, reconcile-V11-r1..r6 and two continuations); principle (8) allows one marker line per volume, the close's. | Replace by the close's single marker line. |
| V11-NARR-2 | minor |  | V11 lines 14-108 | Revision note (lines 14-19, naming a scratchpad pre-revision copy) and seven PROGRESS / REVISION / RECONCILIATION ledgers (about 90 lines) narrate how the text evolved (principle (5)); the validation records (critique/V11.md, seam-*.md, lane-events.log) keep it. | Remove; the volume opens at its title and the close's marker line. |
| V11-NARR-3 | minor | V11-0090, V11-0091, V11-0092, V11-0093, V11-0094, V11-0095, V11-0096, V11-0097, V11-0098, V11-0099, V11-0100, V11-0101, V11-0102, V11-0103, V11-0104, V11-0105, V11-0106 | §1b rows W62-W78 | Wiring rows carry pass narration ('reconciliation round 1, SS-01', 'reconciliation round 4, SCC-75', 'round 2's continuation, SCC-R1C-1', 'round 6, SR5-03', 'the class count corrected') - principle (5); the validation records keep it. | Strip the parenthesised pass references; keep the section citations. |
| V11-NARR-4 | minor |  | V11 body text passim (e.g. §2.1 lines 339, 349-355, 371, 374; §2.2 lines 395, 407, 411, 415; §2.3 line 488, 504, 508) | Normative text carries pass narration in parentheses: 'reconciliation round 3's continuation, SCC-R2C-9', 'SR3-07', 'SCC-77, SCC-R3C-15', 'reconciliation round 6, seam-settlements-r5 SR5-03', 'V11C-22', 'V11C-07', 'V11C-44 (3)' - principle (5); a decision id (J-V11.n) may stay as the rationale pointer, the seam/critique ids go to the validation records. | Strip seam/critique issue ids and round references from normative text throughout V11; keep J-V11.n pointers. |
| V11-NARR-5 | minor |  | §2.8b line 659; §2.8c header line 672 and line 699, 720 | Critique ids and round narration in headings and normative text ('V4C-63', 'owner ~23:30 ... V11C-33 – V11C-45', 'reconciliation round 6, SCC-104'); principle (5). | Keep the owner-rule citation (item 110) and drop critique ids and round references. |
| V11-NARR-6 | minor | V11-0175, V11-0217 | §2.10 rows (lines 787-810) and §3.1 row 24 | Lifecycle rows and catalogue status cells carry narration ('the terrace's three bend cells (reconciliation round 1)', 'the pre-round-1 reading', 'reconciliation round 2, SCC-34', 'written here (RV-pc-5)'); principle (5). | Remove the round/issue references from the lifecycle table and the status cells. |
| V11-NARR-7 | minor | V11-0240, V11-0241, V11-0250, V11-0256, V11-0261, V11-0263, V11-0264, V11-0265 | §3.1 rows 62, 63, 73, 80, 87, 90, 91 and the count paragraph (lines 955-972) | Catalogue cells and the count paragraph carry pass narration ('listed here before', 'reconciliation round 4's continuation, SCC-R3C-7, V01's note (33)', 'outside this round's brief', 'SR3-07', 'SCC-77', 'seam-surfaces-r5 SR5-04', 'SCC-06', 'SCC-44'); principle (5). | Remove the pass references; keep sections and J-ids. |
| V11-NARR-8 | minor | V11-0310 | §3.5.1 commonness bullet | '(V9 §4.16 (3) as seam-settlements-r6 SR6-03 scopes it; SR6-09 (b), applied by the finalization)' - pass narration inside a normative rule. | Cite V09 §4.16 (3) only. |
| V11-NARR-9 | minor | V11-0339 | §3.5.14 count sentence | 'item 110's fort and lighthouse among them, which the count of 179 predated; reconciliation round 6' - narration inside the count. | State the count (181 = 167 table rows + 2 cluster structures + 12 clandestine) without its history. |
| V11-NARR-10 | minor | V11-0357 | §3.7.1 preamble | 'yarn is deleted - spinning was household work' is a disposition of an earlier text, not a rule; principle (5). | Drop the sentence (the weaver's supply of wool already records the choice) or state the rule positively ('no yarn good; spinning is household work'). |
| V11-NARR-11 | minor | V11-0376 | §3.11 pseudo-class and routing paragraphs | '(SR1-02, SR1-07)', 'SS-36', 'V11C-14', 'reconciliation round 6, SR5-11's class', 'SR4-01', 'reconciliation round 5, SR4-02', 'V7C-07', 'the former columns are dropped, V11C-13, V11C-28', 'SCC-06' - pass narration in normative text. | Strip issue ids and 'former columns dropped' disposition. |
| V11-NARR-12 | minor | V11-0408 | §3.13.2 table rows exotic-tower, industrial-workshop, mercantile-market | '(SR1-19)', '(reconciliation round 6, SR5-11 (a))', 'SS-03', 'SS-09' in table cells; principle (5). | Strip. |
| V11-NARR-13 | minor | V11-0445, V11-0449 | §3.21.1 closing paragraph; §3.22 | 'SR3-01', 'reconciliation round 4, SR3-03', '(SS-05)', '(SS-03)', '(SS-02)', '(SR1-02) (SR1-21)' - pass narration. | Strip. |
| V11-NARR-14 | minor | V11-0464, V11-0465, V11-0470, V11-0471 | §3.24.0 last sentence, §3.24.1 enabled paragraph, §3.24.2 rung-gate bullet | 'SCC-25', 'SCC-51', 'SCC-09', 'reconciliation round 3, SCC-67', 'IN-V11-2, XV-V9-13', 'SCC-19', 'V12's 23:27 note (4)', 'reconciliation round 3's continuation, SCC-R2C-10' - narration in normative text. | Strip. |
| V11-NARR-15 | minor | V11-0481 | §3.24.4 bridgeMid row | 'V09's BCR-V9-30 slot; the constant moves here' - disposition narration; also check V09 no longer states minSpanM 40 (single source). | State minSpanM here; confirm V09 cites it. |
| V11-NARR-16 | minor | V11-0497, V11-0499, V11-0500, V11-0502, V11-0503, V11-0505, V11-0508, V11-0510, V11-0512, V11-0513, V11-0515, V11-0517, V11-0519 | §6 compile row; §7.1 T-V11-0, T-V11-1, T-V11-3, T-V11-4, T-V11-9, T-V11-37; §7.2 T-V11-13, T-V11-17, T-V11-18, T-V11-19, T-V11-21, T-V11-35; §8 C0 and 'The register at every exit' | Test and budget rows carry pass narration ('92 at this revision (90 before reconciliation round 4's continuation, SCC-R3C-4; 86 before round 2's continuation, SCC-R1C-3)', 'SR1-08', 'SCC-R2C-2', 'SCC-104', 'reconciliation round 6, SR5-03', 'reconciliation round 1', 'SCC-66', 'SS-07', 'SS-26', 'SCC-13', 'SCC-08'); principle (5). | Strip from every test, budget and plan row. |
| V11-NARR-17 | minor | V11-0567, V11-0569, V11-0589, V11-0596 | §9 J-V11.48, J-V11.50, J-V11.58-J-V11.96 (from J-V11.70 each headed '*Reconciliation round n ...*') | Decision rows carry their pass history ('Reconciliation round 2.', '(SCC-44; SCC-06's shape)', 'revised by reconciliation round 1 (SS-13 ...)', 'Amended (round 4's continuation, SCC-R3C-15; J-V11.91)', 'a lane-events note of 07:20 handed this to V07's round-4 lane'); the decision ids and their reasons stay, the round headers and seam ids belong in the validation records (principle (5)); J-V11.77's amended text should be restated as the one current decision. | Strip round headers and seam ids; fold J-V11.77's amendment into one current statement. |
| V11-NARR-18 | major |  | V11 §12 (lines 4825-5020), 'Reconciliation round 1..6' and continuations (lines 5064-5405), 'Finalization' (5407-5411) | About 590 lines (roughly a ninth of the volume) narrate how the text evolved: per-round CONFIRMED/PLAUSIBLE paragraphs, disposition tables by seam id, backup md5s and scratchpad paths, doc_checks counts, lane-event times. Principle (5) removes them (the validation records keep them); they also carry STALE facts that contradict the live text (§12: '86 registry catalogue rows (1-85 and 58a)', 'the class count (179 authored)', 'W1 - W66'), and cite scratchpad paths outside the project. | Replace §12 by a short CONFIRMED/PLAUSIBLE statement of the current design (the PLAUSIBLE list above), and delete the reconciliation and finalization sections (their dispositions are in docs/volumes/critique/*). |
| V12-NARR-1 | minor |  | V12 lines 3-105 | Eight stacked 'PENDING FABLE REVIEW' banners and six REVISION/RECONCILIATION/PROGRESS ledgers (~95 lines) narrate the text's evolution; principle (8) allows one marker line and principle (5) removes narration. | Replace by the close's single marker line; delete the ledgers. |
| V12-NARR-2 | minor | V12-0025, V12-0032, V12-0038, V12-0051, V12-0052, V12-0064, V12-0065, V12-0066 | §1b rows (register row, ReconciliationRecord row, column-level entries row, crossing.kinds row, metric families row), §2.1 (lines 379, 399, 405) | Wiring rows and type comments carry pass narration ('reconciliation round 2's continuation, SCC-R1C-2; round 4's continuation, SCC-R3C-1', 'round 5, SCC-90; round 6, SCC-98, SCC-103', 'SCC-102', 'SCC-105', 'V11's round 1, SCC-08', 'reconciliation round 3, SCC-54, SCC-68', 'V12C-09'); principle (5). | Strip from all V12 normative text; keep J-V12.n pointers. |
| V12-NARR-3 | minor | V12-0074, V12-0082 | §2.2 'Runs merged on read (reconciliation round 3, SCC-61 ...)', §2.6 CalibrationEntry comments ('reconciliation round 3, SCC-60', 'round 4's continuation, SCC-R3C-6', 'reconciliation round 4, SCC-82', 'reconciliation round 6, SCC-105', 'round 6, SCC-102', 'seam SCC-112', 'V12C-40', 'V12C-25') | Type comments carry pass narration (principle (5)). | Strip. |
| V12-NARR-4 | major |  | V12 §12 (lines 3123-3297), §13's reconciliation paragraphs (3313-3544), Integration notes and Finalization (3546-3566) | About 440 lines narrate the text's evolution (per-round CONFIRMED paragraphs with other volumes' md5s, disposition paragraphs by seam id, lane times); principle (5) removes them (the validation records keep them). They carry stale or superseded facts (e.g. §13's dossier 'factor'; round-6 'M4b, M5 and the staged rows unruled'). | Replace §12 by the current CONFIRMED/PLAUSIBLE list and §13 by an empty fix list; fold IN-V12-3 (count bends, not refusals) into §3.6b; delete the rest. |
| V12-NARR-5 | minor | V12-0310, V12-0311, V12-0321, V12-0355 | §9 J-V12.10, J-V12.11, J-V12.21, J-V12.55, J-V12.59-J-V12.83 ('*Reconciliation round n ...*' headers, 'Amended at ...', 'Note at reconciliation round 5') | Decision rows carry pass narration and superseded versions (J-V12.55 still leads with 'source values generated, declared and carried' before its amendment to two values; J-V12.21, J-V12.71, J-V12.72, J-V12.74, J-V12.77, J-V12.78 carry amendments). | State each decision in its current form; strip round headers and seam ids. |

## Restatement entries

| item | canonical home | fact |
|---|---|---|
| V11-0108 | base §2.1 (units) | the unit list m, m2, ha, cm, cdeg, share, weight, people, yr, wk, m3, lvl with its additions |
| V11-0111 | base §7.1 (item 101 R2), §5.2 F-EDIT | clamp-to-bound on an out-of-range edit with the one-line message; also V11-0280, V11-0486 |
| V11-0126 | base §7.6 (cells) | the compiled cell shape {value, unit, provenance {source, date, note, evidence?}} |
| V11-0123 | base §7.6 (resolution order) | preset resolution: own entry, else 0 or off for an extension cell, else the default |
| V11-0175 | V11 §3.24.1 rows (from V09 §4.20.1 (3)) | the bend cells 15 m, 12 m, 0.8 given as V09's constants in the lifecycle migrate cell |
| V11-0283 | base §17.1 (5) | the list-hit rule (five or more words of one reference list on a line or column fails unless an allow row is reviewed) |
| V11-0332 | V07 §2.4 (J-V7.64) | v.parish_church crypt cells (cellar chance 0.1, cryptM2 20/25/35/45) and v.chapel never, while saying cited not restated |
| V11-0308 | V11 §3.5.1 (restated in base §10.2 prose) | undergroundAccess.prob defaults (0.15-0.30 lodging and works families, 0.02 housing, 0 barracks, courthouse, temple) |
| V11-0450 | V11 §3.23 (restated in V04's defaults table) | the underground content rows' values, carried in V04 until its next revision (X-V11-4) |
| V11-0465 | V12 §3.11 register line 21 | the bend cells' calibration milestone, stated as M3a (V12: panel M4-110 at M4) |
| V12-0103 | V11 §3.24.0 (switch table) | the item-110 off values listed again in NoOpPin.overlay's comment |
| V12-0163 | V11 row 80 (IN-V11-1) | the raised-way calibration minima 0.02 (chance) and 1 (cap), also in J-V12.42, T-V12-39 and line 1879 |

## Reference census

- V11 section refs: volume-prefixed:ok 1459; bare:in base and own (read as base by convention) 491; bare:own only 308; bare:base 500; bare:neither (continuation of a volume ref) 31; V1-x form:ok 66
- V11 bare own-only refs after continuation resolution: bare|body 80; cont-own|body 57; cont-other|body 18; bare|tail 117; cont-own|tail 19; cont-other|tail 17
- V11 id definitions: T 38, J 96, BCR 31, X 17, W 78, IN 10, Q 1
- V12 section refs: bare:in base and own (read as base by convention) 201; volume-prefixed:ok 931; bare:own only 71; bare:base 373; V1-x form:ok 19; bare:neither (continuation of a volume ref) 46
- V12 bare own-only refs after continuation resolution: cont-own|body 35; bare|body 15; cont-other|body 1; bare|tail 15; cont-other|tail 1; cont-own|tail 4
- V12 id definitions: T 41, J 83, BCR 22, X 19, W 0, IN 4, Q 3
- Every T-V11-n, T-V12-n, J-V11.n, J-V12.n, BCR-V11-n, BCR-V12-n, X-V11-n, X-V12-n, W-n, IN-V11-n, IN-V12-n, Q-V11-n, Q-V12-n, J-VI.n, Jnnn, file f item (200-585) and base T/D id cited in either volume resolves to a definition (0 dangling). Every BCR-V11-1..31 and BCR-V12-1..22 is carried by file f (docs/AMENDMENTS-2026-09-28f.md; 386 f items, 200-585). Bare BCR-n ids are defined by both V01 and V04, so bare citations are ambiguous (BREF).
- Volume-prefixed section refs all resolve (V11 1459, V12 931; V1-x form 66 and 19). Five refs the script left unresolved were read in context and resolve: V11 line 4929 V06 §3.9.6-§3.9.11 and §3.19.2-§3.19.5, line 5004 V09 §5.7, V12 line 3215 V11 §3.16; two continuation false positives (V11 lines 4864, 5127) are V11 §3.22 and §3.6.1. Bare § refs whose target exists only in the volume itself (V11 308, V12 71; after continuation resolution 197 and 30 stand bare) are reported as BREF; bare refs whose target exists in both the base and the volume (V11 491, V12 201) read as base by V12's stated convention and are ambiguous in V11, which states none.

## Routing notes

- g items: g items 102-110 are carried by V11 (rows, registry 78-85, §3.23, §3.24) and V12 (bars, register lines, no-op pins, switch-on) as their owners named. g items 111-113 (docs/AMENDMENTS-2026-09-28g.md, applied by every unit they name) are absent from both volumes: F-MISSING raised for V11 (111: oasis chance, grove and garden rows, water-pull weights, sun cell per climate; 113: event-to-epoch rows, burial thresholds) and for V12 (111: arid water-reach and oasis bars; 112: the game-master trial record; 113: the bars and the replay budget). 112 names no V11 part.
- J121/J122: docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md (J122) decided Q-V11-1 (keep, concealed by default in player views, shown as SettlementForge's own settings show them), Q-V12-1 (no), Q-V12-2 (sittings only at M1, M2b, M4, M5, batched, about an hour each) and Q-V12-3 (only where the owner's sitting passes them), and the combined build order. Neither volume records these answers: MISSING and XCONF findings list each place (V11 §11 and §3.11/§3.14 rows; V12 §0, §3.9.1, §3.10.6, §3.11 staged order, §6, §8.3, §11, BCR-V12-4, BCR-V12-6). J121 (hosting, accounts, languages follow SettlementForge): no V11 or V12 statement contradicts it; V11 row 87 locales is on the INDEX fix list (XCONF).

## Terms (113)

| term | vol | defined at | definition | note |
|---|---|---|---|---|
| TableId | V11 | §2.1 | dotted, stable, never-reused table name (roster.classes, siting.families, dossier.kinds, era) |  |
| TableSchema | V11 | §2.1 | one registry entry typing a table: identity, file, key, columns, rows home, readers, slice kinds, totality rules, parity behaviour |  |
| ColumnSpec | V11 | §2.1 | one column: name, settings-form row, type, unit, range, calibratable flag, parity resolution, packPatchable | unit vocabulary differs from V12 Unit (TERM finding) |
| TotalityRule | V11 | §2.1 | a completeness rule the compiler checks over a table (every required key present) |  |
| SliceKind | V11 | §2.1 | how a stage reads a table: row, weights, bracket, thresholds, match |  |
| settings form | V11 | §2.1 (ColumnSpec.row) | a table whose named rows hold scalar settings (e.g. retaining.settings, raisedWays.settings) |  |
| REGISTRY | V11 | §3.1 | the typed catalogue of the 92 table rows (1-91 and 58a) in @plat/tables | §12 still says 86 rows (ICONF) |
| empty-table rule | V11 | §2.1, §2.10 | every registry row exists from C0; a row whose rows-home milestone has not landed ships its schema's empty table |  |
| PresetId | V11 | §2.2 | MFCG \| FTG \| VG \| FM \| NG |  |
| PresetEntry | V11 | §2.2 | a cell's per-preset value |  |
| SourceFile / SourceRow / SourceCell | V11 | §2.2 | the authoring source format; a bare value inherits the file's or row's provenance |  |
| ProvenanceSpec | V11 | §2.2 | the per-cell provenance string, §17.1 (6)'s grammar as BCR-V11-21 extends it (own, owner, corpus, ref:..., architecture <date>) |  |
| source manifest | V11 | §3.2.1 step 1 | src/manifest.json: each source file's path, author seat, last-change date, and the stageIds |  |
| stageIds / stageReaders | V11 | §3.2.1 steps 6-7 | the registered stage ids and the compiled readers of each table |  |
| reader check | V11 | §3.2.1 step 6 | the compiler refuses a table read by a stage outside its readers |  |
| recorded-read suite | V11 | §7.1 T-V11-1 (b) | the test recording which stage actually reads which table |  |
| override chain | V11 | §3.2.4 (loader) | the loader's order: shipped default, preset entry, pack, user edits |  |
| SitingProfile | V11 | §2.3 | a class's siting profile: family, emits, sensitive, needs, coverage, clientele and related cells |  |
| profile family | V11 | §3.4 | one of 45 inherited siting families a class names exactly once |  |
| Nuisance / Lvl | V11 | §2.3 | the nuisance kinds a class emits or is sensitive to; the ordinal level 0-3 |  |
| Need / NeedSpec | V11 | §2.3 | a site need (runningWater, road, gate, harbour, market ...) marked hard or soft |  |
| Clientele | V11 | §2.3 | V06 §3.9.9's six clienteles plus residential |  |
| CoverageSpec | V11 | §2.3 | {unit, per, target, weight}: how many members of a class a unit should hold | EDGE: target/per 0 undefined |
| coverage unit | V11 | §2.3 | district, walk disc, households disc, parish cell or settlement, evaluated at a plot | V12 servedShare district differs (XCONF) |
| parish partition | V11 | §2.3 | Voronoi cells of the counted churches over residential land, derived per read |  |
| RelationFamilyRow | V11 | §2.4 | a family-level relation rule (cluster, spread, avoid, near ...) from which fam/ rows derive |  |
| SignaturePairRow | V11 | §2.4 | a pair rule between two classes or families that marks a town's signature |  |
| why id | V11 | §2.4 | the stable row id a placement's explanation (WhyPull.row) carries |  |
| ResourceRow (goods) | V11 | §2.5, §3.7 | the goods table: demand, maxDistanceM, orientation and supply-web columns (51 goods) |  |
| web off form | V11 | §3.7.4 | the supply web's parity-neutral off values |  |
| LadderStepRow | V11 | §2.6 | a dossier ladder step (COUNT, QUARTER, GUILD, SIZE) with its member range |  |
| WallBarrierRow / arcKind | V11 | §2.7 | natural-barrier thresholds (sheer, cliff, steep) and the arc kind V10 reads |  |
| WaterfrontThreatRow | V11 | §2.7 | the waterfront size threshold rows for walling |  |
| EraRow | V11 | §2.8, §3.19.1 | the era table (moat, towers, fuel, pump date, aqueductM, raisedVaultM ...) | row 50 readers omit V07 VS8 (WGAP) |
| ClimateRow | V11 | §2.8, §3.17.1 | climate rows (rainMmPerYear and the greenery and fuel inputs) | g 111 sun cell per climate absent (F-MISSING) |
| TemplateFamilyRow / template family | V11 | §2.8, §3.6 | one of 35 template families: footprint and plot budgets by band, yard parts |  |
| generic class | V11 | §3.5.14, §3.13.3 | generic-<f>, one per non-alias profile family (45) | §3.13.3 says every family (ICONF) |
| pseudo-class | V11 | §3.11 (W35) | a dossier routing target that is not a building class (@absent:<class>, @seat) |  |
| feature class | V11 | §1b W38 | wall, wallInner, open:square, open:green, gate, harbour as siting targets |  |
| dossier.kinds | V11 | §3.11 | 280 dossier kind rows mapping a kind to a class, pseudo-class or family |  |
| dossier.ladders | V11 | §3.12 | 92 ladder rows (COUNT, QUARTER, GUILD, SIZE) |  |
| dossier.keywords | V11 | §3.13.2 | 207 plain keyword rows (keyword to family weight) |  |
| v.<id> namespace | V11 | §2.9, §3.22 | the village class keys of V07 inside roster.classes |  |
| villageForm | V11 | §3.22 | the column naming the v. class that plays a town class at village rungs |  |
| display cells | V11 | §3.1, W77 | label, icon?, synonyms, commonness on class rows; label and icon on families, goods, district kinds, style sheets |  |
| commonness | V11 | §3.5.1 | a class's computed commonness | producer disputed with V07 (INDEX SR6-09 (a)) |
| burial face | V11 | §3.6.1 | the churchyard part of the church and cathedral families (burial for cloister and burial-ground) |  |
| document-only table | V11 | §2, §4.2 | siting.declared and siting.linkEdits, rows written only by the document's edits |  |
| calibrate-later | V11 | §3.5.1 and passim | provenance shorthand: our own value that V12's register confirms later | reads as deferral wording (DEFER) |
| switch table | V11 | §3.24.0 | the named off form of each item-110 row set (terrace.enabled, raisedWays chances, deck.offer, deck.landmarks chances, roster.specialisations chances) |  |
| TerraceRow | V11 | §2.8c, §3.24.1 | terrace thresholds by rung and the three flat-ground bend cells |  |
| RetainingProfileRow / RetainingSettings | V11 | §2.8c, §3.24.1 | retaining wall profile by band; settings row with stateSnapCm |  |
| RaisedWayRow / RaisedWaySettings / RaisedWayStructure / RaisedKind | V11 | §2.8c, §3.24.2 | raised-way chances and caps by rung and kind; generator settings; structure (clearance, piers, span block) |  |
| WayCrossingRow | V11 | §2.8c, §3.24.5 | per way class: carts, rampMaxGrade, switchback, stair dimensions | cart beyond 1.5x undefined (EDGE) |
| W_STEEP_RAMP | V11 | §3.24.5 | the report when a cart class ramp exceeds rampMaxGrade (up to 1.5x) |  |
| DeckRow / DeckLandmarkRow / DeckKind / deckOk | V11 | §2.8c, §3.24.4, §3.2.1 step 5a | deck plot offer by kind; landmark slot chances; the compiled deckOk flag |  |
| CultureSpecialisationRow | V11 | §2.8c, §3.24.3 | roster.specialisations: a culture's specialised uses and chances |  |
| WaterNeedRow | V11 | §2.8c, §3.24.6 | water need per use for the aqueduct reason |  |
| GoodWordRow | V11 | §2.8, §3.13.5 | tokenised good-word rows resolving dossier goods lists |  |
| GovernmentRow.villageSeat / ArchetypeVillageCell | V11 | §2.8, §3.21.1 | the seat binding at village rungs; an archetype's village reading |  |
| ownerRule stamp / calibration minimum | V11 | IN-V11-1 (only there) | the compiler stamps cells of owner-rule rows; CITY and METROPOLIS raised-way chance 0.02 and cap 1 | normative content only in the note (MISSING) |
| MetricDef / METRICS | V12 | §2.1 | a catalogue metric: id, semver version, input, scale, unit, stages, cost |  |
| MetricId | V12 | §2.1 | dotted, stable, never-reused metric id |  |
| MetricInput | V12 | §2.1 | geo, model, render, timing, trace or counts |  |
| Unit (metric) | V12 | §2.1 | the metric unit vocabulary (m, m2, ha, deg, share, count, perHa ...) | third unit vocabulary (TERM) |
| bar.<barId> | V12 | §2.1, §3.4.2 | metric family: a registered bar's statistic |  |
| frame.<table>.<column> | V12 | §2.1, §3.4.2 | metric family: a declared frame's value for one calibratable column (read only at M-CAL) |  |
| PresetArm | V12 | §2.1 | 'default' \| PresetId, the preset a bench or run arm uses |  |
| BenchBarDef | V12 | §2.1 | a bench bar's registration: towns, settings, stages | stages [] means no run may name it |
| MeasureInput / MeasureFeature | V12 | §2.2 | the measurement profile shared by our output, references and corpus maps |  |
| built stretch | V12 | §2.2 | a maximal run of joined retaining features measured as one |  |
| enclosure | V12 | §2.2, BCR-V12-15 | an enceinte's enclosed polygon feature (item 106) |  |
| BaselinesFile / ReferencePin | V12 | §2.3 | the pinned reference baselines and the reference each pins |  |
| CrossingRecord | V12 | §2.3 | the record of a firewall crossing (§17.1) |  |
| SeedFamily / seedOf | V12 | §2.4 | seeds derived by H32 from structured labels, with a rehash on collision |  |
| collision domain | V12 | §2.4 | the seed set a new seed must not equal (else rehash by priority) |  |
| CalibrationRun | V12 | §2.5 | a pre-registered, held-out reference, fallback or corpus run |  |
| GuardSet / TOWN guard | V12 | §2.5 | the guard settings a run carries (the TOWN guard for raised-way rows) |  |
| CellRef | V12 | §2.5 | a reference to one table cell |  |
| calibration minimum / possibility floor | V12 | §2.5, §3.7.2 (5), §3.10.4 | owner-stamped lower bound; possibility evidence lifts 0 to 0.02 or lowers 1 to 0.98 | values restated from V11 (RESTATE) |
| CalibrationEntry | V12 | §2.6 | one register row per provisional number: id, target, owner, metric[], method, due, fallback, status, line?, panel?, stages?, history |  |
| entry status | V12 | §2.6 | provisional, confirmed, fallback-applied, not-achieved, owner-set, fixed |  |
| provisional - not rated | V12 | §2.6 | the reading of a panel entry whose sitting did not rate it |  |
| default line | V12 | §3.11 | the register line covering every unnamed calibratable column (plat calibrate register --defaults) |  |
| cells row | V12 | §2.6 | a typed history row recording a column's compiled cells |  |
| held | V12 | §3.11 (J-V12.77) | the outcome of a tuning that would move a committed golden (--hold) |  |
| staged entry | V12 | §2.6, §3.11 | an entry whose line has several stages in order | order vs J122 build order (MISSING) |
| catch-all rule | V12 | §3.11 | a line ending 'and every other calibratable column' binds every unnamed column of its tables |  |
| panel rule | V12 | §3.11 | how a panel entry moves on a rated pass or fail |  |
| register --check / --defaults / --hold | V12 | §3.11, T-V12-20 | the provisional-number lint; the default-line writer; the hold recorder | V11 C0 runs it from M0 (XCONF) |
| NullModelSpec / NullPass | V12 | §2.7 | a correlation bar's null model: rank, pooledExact, margin, holm |  |
| StatSpec / ClassSelector | V12 | §2.7 | the statistic and the classes it is computed over |  |
| StatBarSpec / Rule | V12 | §2.7b | a tendency bar: most, floor, rate, presence, trend, higherWith, exactMonotone, exactBound, paired, twoSample, noRegression |  |
| Indicator / Quantity / Step / Level | V12 | §2.7b | what a tendency rule counts, the model quantity, the step between levels, a sweep level |  |
| PairedMeasure | V12 | §2.7b | ruin plan vs town above: block area ratio, grid order, axis |  |
| effective instances | V12 | §2.7b, §3.6b | the instance count a most rule needs (minEffective 100) |  |
| confirmation stage | V12 | §3.6b | a failing statistical bar is suspect and re-runs once on a fresh family at twice the towns; only a second failure fails |  |
| deep void | V12 | §3.4.2 | a connected part of an underground system whose tops lie deeper than DigRule.reachM below every footprint over it |  |
| PanelSpec / PanelGroup / PanelRender / AnswersFile | V12 | §2.8 | one sitting's registration, its groups, render and answers | PanelSpec ids include M6, V-M4 etc. vs J122 sittings (XCONF) |
| sitting | V12 | §0, §3.9 | an owner rating session at a gate | J122: only M1, M2b, M4, M5 |
| SOLO / AB / DW | V12 | §2.8 | PanelGroup reference kinds: SOLO a group of our images alone (pass on ceil(2n/3) Yes), AB two recipes of ours side by side, DW Dwellings plan images |  |
| M4-110 | V12 | §3.9.1 | the SOLO group of six item-110 items inside the M4 sitting | called a panel elsewhere (TERM) |
| CorpusMapMeta / SampleFrame / FramesFile | V12 | §2.9 | corpus map metadata; a declared sample frame; the frames file |  |
| EvidenceClass | V12 | §2.9 | record, plate, surveyed map, frame measure: what a corpus item can prove |  |
| CorpusRunId | V12 | §2.9 | 'M-CAL' or 'M-CAL/<layer>' |  |
| ReconciliationRecord | V12 | §2.9 | the committed record of a corpus run's decisions per frame |  |
| historical pack | V12 | §3.10.3 R1 | historical:<frame>: where every corpus change lands, never a shipped default |  |
| R1-R6 / E1-E5 / A1-A5 | V12 | §3.10.3, §3.10.4, §3.10.6 | corpus rules, evidence rules, acceptance rules of M-CAL |  |
| ownerRule | V12 | §2.10, §3.10.3 R6 | the stamp marking a cell that implements an owner rule; never an E1 or E4 target |  |
| KnownCityFixture / StructureCheck / StructureResult | V12 | §2.12 | the known-city fixtures K1 and K2 and their structure checks |  |
| NoOpPin | V12 | §2.13 | a family's off overlay and the golden suites registered on it | overlay comment restates V11 values (RESTATE) |
| switch-on bump | V12 | §3.7.6 | the release that switches an item-110 family on, with shift records |  |
| notApplicable | V12 | §3.4.2, §3.6 | the reading of a metric or bar with no instances in scope |  |

Items (V11-0001..0647, V12-0001..0403, each with kind, section, owner, statement, reads, used by and keys) are in inventory-vol-V11-V12.json.
