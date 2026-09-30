# V12 rulings (extracted from canon.json)

## shrink {"words_before": 76414, "goal_band_words_after": [45848, 57310], "narration_ranges_words": 8203, "restatement_items": 2, "bcr_blocks_to_pointers": 10}

## conflicts

### SCOPE-C14 CONFIRMED (decided subject worded as open) FIX units ['scope', 'V12']
where: D-31 vs J122
- statement_a: D-31: 'a one-month premium FTG subscription for one measured capture is the owner's option'.
- statement_b: J122 V12 Q-V12-1: 'one month of FTG's premium tier — no'.
proposed: 
RULING: D-31 records 'no premium FTG capture (J122, V12 Q-V12-1)'; METROPOLIS stays compared with MFCG size 130.
basis: J122

### V12-ICONF-1 minor FIX units ['V12']
where: V12 §3.7.6 feature switch-on item 1
- claim: The raised-way bump's records name 'the B-DOSSIER-lite towns carrying the water-system record (its factor on the aqueduct's chance, DR-V8.7)', but V11 withdrew the dossier factor (SS-13; V11 §3.24.7 (3) (b): 'the chance takes no factor from the record') and V12's own §1b dossier table says 'never a declaration' / 'V11's round 1 withdrew the chance factor'. The record's effect is the met need, cap step and bound terminal.
proposed: Reword: '... carrying the water-system record (its met need, cap step and cistern terminal, V11 §3.24.7 (3))'.
RULING: §3.7.6's raised-way bump reads 'carrying the water-system record (its met need, cap step and cistern terminal, V11 §3.24.7 (3))'.
basis: V11 SS-13

### V12-ICONF-2 minor FIX units ['V12']
where: V12 §13 fix list first paragraph
- claim: States that V06's design has the dossier's water-system record as 'a factor on the aqueduct's chance' - withdrawn by V11 (SS-13; V11 §3.24.7 (3)(b)), and contradicted by V12's own §1b dossier table and J-V12.55 ('the chance factor withdrawn').
proposed: Reword to the met-need reading, or remove with the §13 narration.
RULING: The §13 sentence leaves with the narration (the met-need reading governs).
basis: principle (5)

### V12-XCONF-1 major FIX units ['V12', 'scope']
where: V12 §0 'How it feels to the owner', §3.9.1 registered panels, §6 sitting rows, §8.3 risk 6, BCR-V12-6 (b), §11 Q-V12-2
- claim: J122 (OWNER-DECISIONS-DELEGATED, V12 Q-V12-2) decided the owner's sittings happen 'only at the gating milestones (M1 look check, M2b, M4, M5), batched, about an hour each; a missed sitting leaves the milestone provisional - not rated'. V12 §0 lists sittings at M1, M2b, M4, M5, M6 (buildings), the village milestone, after the historical reconciliation, plus shorter ones for floor plans, underground, islands and town histories, 35-45 minutes each, splittable. Owner delegation outranks the volume (principle (3)).
proposed: Apply J122 at V12's sitting schedule (§0, §3.9, §8): sittings only at M1, M2b, M4, M5, batched; the other panels folded into those sittings or run as unrated; mark Q-V12-2 answered (J122).
RULING: J122 governs V12's sittings: owner sittings only at M1 (the look check), M2b, M4 and M5, batched, about an hour each; a staged milestone's panel joins the next gating sitting (M4 or M5) when its build has landed by then, else its panel bars stay 'provisional — not rated' (§13.6 (7)); §0, §3.9.1, §6, §8.3 risk 6 and BCR-V12-6 (b) follow; Q-V12-2 marked answered (J122).
basis: owner delegation J122 > volume

### V12-XCONF-2 major FIX units ['determinism', 'V11', 'V12']
where: V12 §2.10 vs V11 §2.2 (compiled row) and §3.2.1 step 7
- claim: V12 §2.10 says 'the table content hash that pins an output version (§6.4) excludes provenance.evidence, so rewording or adding evidence never moves an output version'; V11 §2.2 puts evidence inside every compiled cell's provenance and computes the table's content hash (H128) over the canonical JSON bytes, with the recipe pinning version AND hash (§2.9) - so adding evidence moves the hash. The two volumes define the pinning hash differently (and neither says whether provenance date/note are in it; V11 calls a note change a 'patch = no output change').
proposed: Rule once at the base's home (§6.4 / §7.6): the pinning hash covers value, unit, calibratable, extension, presets and excludes provenance (or evidence alone); V11 step 7 computes it that way and V12 §2.10 cites it.
RULING: The pinning hash is defined once at §7.6 (the base home of table versioning): it covers each cell's value, unit, calibratable, extension and presets and excludes the whole provenance block (date, note, evidence); V11 §3.2.1 step 7 computes it so and V12 §2.10 cites it.
basis: base home (1); V11's 'a note change is a patch, no output change' kept

### V12-XCONF-3 minor FIX units ['V12']
where: §3.4.2 default rule 'stages' vs V11 §2.1/§3.1 (StageId registration) and base §4.1
- claim: V12's default metric `stages` name 'S5' and ranges 'S3 - S5', 'S12 - S12a' where base §4.1 registers the growth stage as four StageIds S5a-S5d (V11 expands a registry 'S5' as a group) and has no 'S12' (only S12a, S12b, S12c); V12 §3.7.2 (4)'s run scope compares a metric's stages with the tables' stageReaders (StageIds only), so an unexpanded 'S5' or a non-existent 'S12' would match nothing (PLAUSIBLE: depends on V12 expanding groups the same way).
proposed: State metric stages as registered StageIds (S5a-S5d, S12a-S12c) or adopt V11's group-expansion rule for 'S5' by citation, and drop 'S12'.
RULING: V12 §3.4.2's metric stages are registered StageIds (S5a–S5d, S12a–S12c), or 'S5' by V11's group-expansion rule cited; 'S12' is dropped.
basis: §4.1 registration

### V12-XCONF-4 minor FIX units ['V12']
where: V12 §3.6 servedShare 'district' unit vs V11 §2.3 CoverageSpec unit district
- claim: V12 says it takes each unit 'as V11 §2.3 defines it at a plot' but defines district as 'the town's districts of >= 30 households (a smaller district is no unit)'; V11 §2.3's district unit is 'the plot's district' with no household threshold (the >= 30 threshold is only T-V11-18's 105 (k) dispersal reading). The bar and the mechanism count different units for a class whose coverage unit is district (watch, healing, infrastructure, sanitation, bathhouse, apothecary...).
proposed: Decide one definition: either V11 §2.3 adds the >= 30 households rule for the district unit (and S10b scores it so), or V12 §3.6 measures all districts and keeps the >= 30 filter only for the unit: 'district' forcing of 105 (k).
RULING: V12 §3.6 measures servedShare over every district as V11 §2.3 defines the unit (the plot's district, no threshold); the ≥ 30-households filter applies only to T-V11-18's 105 (k) dispersal reading.
basis: the mechanism's unit governs its bar

### V12-XCONF-5 minor FIX units ['V12']
where: §10 BCR-V12-4 (c) item 10, §3.10.6, §4.3
- claim: BCR-V12-4's base text reads 'whose decision rule is the owner's (volume 12 Q-V12-3)', still framing Q-V12-3 as open, while J122 decided it ('only where the owner's sitting passes them - as recommended'). The base text would carry a pointer to an answered question.
proposed: Cite J122's decision (the per-frame sitting rule of V12 §3.10.6) instead of 'Q-V12-3'.
RULING: BCR-V12-4's base text cites J122's decision (V12 §3.10.6's per-frame sitting rule) instead of 'Q-V12-3'.
basis: J122

### CANON-C03 major FIX units ['scope', 'V01', 'V02', 'V03', 'V04', 'V05', 'V06', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']
where: None
- INDEX §6: 'Until the owner answers, each volume runs on its recommendation' and twenty-five open questions.
- J121/J122 answered every one.
proposed: None
RULING: INDEX §6 becomes the table of decisions (OWNER_Q); every volume's §11 likewise.
basis: J121, J122

### CANON-C04 major FIX units ['scope', 'V01', 'V04', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']
where: None
- INDEX §7: 'The fix list — deliberately left for the next amendment'.
- The owner's no-defer rule; THE BAR IS ZERO.
proposed: None
RULING: Every INDEX §7 item is routed to its unit (SEAM_OPEN) and fixed in this pass; INDEX §7 keeps the reconciliation history as a pointer to the validation records and holds no open item.
basis: owner no-defer rule

## elegance

### E-20 UNIFY Three copies of the owner-item bar convention in §13.2 (EL-01) and every 'no-op pin' bar of the owner items (102 (g), 103 (f), 105, 106, 110 (f), 111 (d), 113 (g)).
unified_form: One convention paragraph in §13.2 ('hard unless banded; tier from §13.8; from the milestone §16 names; a staged engine's bars on hook fixtures until the engine lands; every no-op pin a NoOpPin registration on V12 §3.7.8's engine reading V11 §3.24.0's off form') cited by every group.
home: §13.2 (scope) units ['scope', 'V11', 'V12']
- EQ: the owner-rules copy's registry path-test list for amendments c
- EQ: the declared-shift clause for goldens
- EQ: each item's off-form cell values (V11 §3.24.0) and its bar id
nuance: None

### E-24 UNIFY Superseded or amended decisions marked inline in many forms across the set (EL-07, SCOPE-C02, V01-ICONF-3, V04-ICONF-2, V09-ICONF-5).
unified_form: One mark on the decision row: 'superseded by X' or 'amended by X', in the Judgment-calls index and in every volume's §9.
home: the index (scope) and each volume's §9 units ['scope', 'V01', 'V02', 'V03', 'V04', 'V05', 'V06', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']
- EQ: no row dropped
- EQ: the governing row keeps the reason
nuance: None

### E-35 UNIFY V12's producers and consumers of each record stated in §1b and §2.11 (V12-ELEG-1).
unified_form: §2.11's lifecycle table with a consumers column is the one table; §1b cites it.
home: V12 §2.11 units ['V12']
- EQ: every producer and consumer listed today
nuance: None

### E-37 UNIFY Unit vocabularies: the base §2.1 units, V11's ColumnSpec.unit and V12's metric Unit (V12-TERM-2, V11-RESTATE-1).
unified_form: One unit vocabulary in §2.1, the union of all three (m, m2, ha, cm, cdeg, deg, share, weight, people, count, yr, wk, m3, lvl, perHa, perKm, ratio, bits, ms, s, luma, rb, chroma, z, none); V11 and V12 type their fields by named subsets.
home: §2.1 (model) units ['model', 'V11', 'V12']
- EQ: deg (measured metric angles) and cdeg (model angles) both kept
- EQ: count and people both kept
- EQ: each volume's subset exactly its current list
nuance: None

### E-38 UNIFY territory.haPerHead (2.3) stored beside the FarmTable village rows whose sum it restates (2.275) (V07-ELEG-2) — ruled as a conflict of two homes with two values.
unified_form: haPerHead is derived as the sum of the FarmTable village rows (2.275 ha per head); the stored 2.3 is retired; an editTable of a farm row moves A_T with it. A declared change of value (−1.1 % territory area), recorded here: a conflict resolution (principle (3) (b)), not an elegance-only change.
home: V07 §3.9 (1) units ['V07', 'V11', 'V12']
- EQ: the farm rows' values unchanged
- EQ: A_T = households × the per-head sum
- EQ: V12's register: the farm rows are the calibratable cells; haPerHead leaves the register
nuance: None

## wiring

### W-IF-04 hook-one-ended minor ['V09', 'V12']
piece: the calibration register → the tables editor's cell inspector
link: V09 §4.14's tables editor shows per cell its calibration register entry (V12 §2.6 CalibrationEntry: status, reference, due milestone, history) from `register.json` / `dist/evidence.json` — folding IN-V09-7 into the body (V01 §1b and V12 §1b name the inspector as a consumer)
RULING: WIRE: write the named link at its home (the link column), both ends

### W-IF-05 hook-one-ended minor ['V10', 'V12']
piece: the calibration register → the clerk's provenance answer
link: V10 §2.13's RuleAnswer gains the cell's register entry (status, reference, due milestone; V12 §2.6) and V10 §1b.1 lists `register.json` as an input; or V01 §1b and V12 §1b drop the claim
RULING: WIRE: write the named link at its home (the link column), both ends

## id rulings

### ID-BCR V01 and V04 number their base change requests bare 'BCR-n' (both 1–46): the same id names two requests (V03 cites 'BCR-29, BCR-30' for V04 and 'its BCR-43' for V01).
RULING: Rename into the set's one request family: V01's BCR-n → BCR-V1-n, V04's BCR-n → BCR-V4-n (the number kept). File f's citations 'V01 BCR-n' / 'V04 BCR-n' resolve by this rule and need no edit; every other citation in the set is rewritten.
renumber: [{"from": "V01 BCR-n (bare BCR-n in V01)", "to": "BCR-V1-n"}, {"from": "V04 BCR-n (bare BCR-n in V04)", "to": "BCR-V4-n"}]

### ID-JT 'J-T' (§13.7, BCR-V12-12) names the Jonckheere–Terpstra trend test inside the J- decision namespace.
RULING: Renamed 'JT (the Jonckheere–Terpstra trend test)'; the J- namespace holds decisions only.
renumber: [{"from": "J-T", "to": "JT"}]

### ID-WX Volume-local row ids W1…, X1…, H1…, FL-n, IN-Vnn-n, S-Vn-x are reused across volumes (V01 W15 and V04 W15; X1 in V02, V06, V08).
RULING: They stay volume-local and are never cited bare outside their volume: another unit writes 'V06 W75', 'V02 X20', '_integrate H12'. Inside its own volume a bare id means that volume's row. V08 numbers its §1b wiring rows W1… (V08-TERM-1) and drops the history dividers. The IN-Vnn-n integration notes are folded into the body by the rewrite (their content at its home), their ids kept only in the validation records.
renumber: []

## g parts

### g item 111 new design at build depth in every named unit; F-MISSING if absent
- "pipeline"
- "model"
- "determinism"
- "rendering"
- "scope"
- "V07"
- "V08"
- "V11"
- "V06"
- "V05"
- "V09"
- "V10"
- "V12"

### g item 112 new design at build depth in every named unit; F-MISSING if absent
- "rendering"
- "scope"
- "V09"
- "V12"

### g item 113 new design at build depth in every named unit; F-MISSING if absent
- "pipeline"
- "determinism"
- "scope"
- "model"
- "V06"
- "V08"
- "V04"
- "V07"
- "V11"
- "V09"
- "V10"
- "V12"

## owner questions
- {"unit": "V12", "question": "Q-V12-1", "subject": "one month of FTG's premium tier", "answer": "J122: no"}
- {"unit": "V12", "question": "Q-V12-2", "subject": "the owner's sittings", "answer": "J122: only at M1 (look check), M2b, M4 and M5, batched, about an hour each (V12-XCONF-1)"}
- {"unit": "V12", "question": "Q-V12-3", "subject": "historical layers as defaults", "answer": "J122: only where the owner's sitting passes them"}
[{"q": "Q-V12-1", "subject": "one month of FTG's premium tier", "answer": "J122: no"}, {"q": "Q-V12-2", "subject": "the owner's sittings", "answer": "J122: only at M1 (look check), M2b, M4 and M5, batched, about an hour each (V12-XCONF-1)"}, {"q": "Q-V12-3", "subject": "historical layers as defaults", "answer": "J122: only where the owner's sitting passes them"}]

## cohesion
- The volume's §8 build plan agrees with INDEX §3/§4 and §16: milestone id (M6 = V02's stage 3; M6-U, M6-sky, M6-E, M6-P, V-M, M-CAL, M-SF, M3c), start-after, runs-beside, price (its own estimate), and J122's slot.
- The volume's §11 marks every owner question answered (OWNER_Q) and its body reads each decision (J121 inputs; J122 decisions).
- The volume's §1b wiring table names each piece's producer and consumer in the set (principle (7)); every hand-off it lists is closed at its destination or routed here.
- One marker line; no stacked banners, PROGRESS ledgers, reconciliation or finalization records (S9).

## canon decisions
- {"id": "J-C1", "decision": "The default ink map keeps its gentle cast shadows in its own ink; only the MFCG parity preset draws none (J-A68.81 as designed).", "basis": "J122 delegation; no behaviour change"}
- {"id": "J-C2", "decision": "The `ink` plate chroma stays 20–30 (J-A69.82 as designed); `parchment`, a shipping ink-family variant at M3b, aims at the corpus median 43 (RIC-01).", "basis": "J122 delegation; keeps both statements"}
- {"id": "J-C3", "decision": "The item-72 surplus-pressure reading stands as designed.", "basis": "J122 delegation; no behaviour change"}
- {"id": "J-C4", "decision": "A raised-way span whose under-deck strip lies wholly on hinterland land-use faces stays open (reason `country`) at every rung (V07-XCONF-2).", "basis": "realism tiebreaker; one rule at the span rule's base home"}

## requests_in_f
- BCR-V12-5 -> item 381 | 7.6 The override layer and editable tables (G-P12; owner amendment 5)
- BCR-V12-22 -> item 382 | 7.6 The override layer and editable tables (G-P12; owner amendment 5)
- BCR-V12-15 -> item 447 | 11.1 Formats
- BCR-V12-17 -> item 447 | 11.1 Formats
- BCR-V12-13 -> item 488 | 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT
- BCR-V12-16 -> item 489 | 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT
- BCR-V12-7 -> item 491 | 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1
- BCR-V12-19 -> item 492 | 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1
- BCR-V12-20 -> item 493 | 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1
- BCR-V12-1 -> item 496 | 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file
- BCR-V12-2 -> item 497 | 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file
- BCR-V12-6 -> item 500 | 13.6 The owner's side-by-side protocol (D-5)
- BCR-V12-12 -> item 501 | 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)
- BCR-V12-14 -> item 502 | 13.8 CI tiers and compute budgets (SCL-18; D-34)
- BCR-V12-3 -> item 503 | 13.9 The corpus-calibration interface (staged by the owner; DEF-9)
- BCR-V12-4 -> item 504 | 13.9 The corpus-calibration interface (staged by the owner; DEF-9)
- BCR-V12-10 -> item 521 | §14 Package and module layout, key interfaces, dependency rules, extension point
- BCR-V12-9 -> item 533 | §16 Build plan — calibration and spikes first, then a viewable town, then editin
- BCR-V12-8 -> item 535 | 17.1 The clean-room chain (IMP-1; D-29)
- BCR-V12-18 -> item 536 | 17.1 The clean-room chain (IMP-1; D-29)
- BCR-V12-21 -> item 537 | 17.1 The clean-room chain (IMP-1; D-29)
- BCR-V12-11 -> item 569 | Staged by the owner's roadmap (this document defers nothing)

## bcr_pointer
- V12-0384 BCR-V12-1 -> item 496
- V12-0385 BCR-V12-2 -> item 497
- V12-0386 BCR-V12-4 -> item 504
- V12-0387 BCR-V12-5 -> item 381
- V12-0388 BCR-V12-7 -> item 491
- V12-0389 BCR-V12-10 -> item 521
- V12-0390 BCR-V12-12 -> item 501
- V12-0391 BCR-V12-13 -> item 488
- V12-0392 BCR-V12-15 -> item 447
- V12-0393 BCR-V12-18 -> item 536

## history_out []

## terms
- {"id": "G-lot", "retired": "lot, lot-driven, lot-derived, BuildingInput.lot", "term": "plot (field BuildingInput.plot)", "count": 9, "lines": [346, 1038, 1147, 1148, 1164, 1205]}
- {"id": "G-cite", "retired": "V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 …", "term": "Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y", "count": 101, "lines": [64, 293, 417, 633, 839, 840]}
- {"id": "G-DR", "retired": "DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8", "term": "DR26–DR35 (ID-DR)", "count": 14, "lines": [309, 325, 326, 327, 328, 330]}
- {"id": "G-M6U", "retired": "M6 (for the underground)", "term": "M6-U (\"M6\" is volume 2's stage 3)", "count": 3, "lines": [282, 2534, 2593]}
- {"id": "G-JT", "retired": "J-T", "term": "JT", "count": 6, "lines": [201, 280, 293, 2182, 2874, 2878]}

## agreement_disagreements
- {"subject": "T-V6-62", "with": "V11", "rulings": ["V11-XCONF-1"]}
- {"subject": "T-V11-18", "with": "V11", "rulings": ["V12-XCONF-4"]}