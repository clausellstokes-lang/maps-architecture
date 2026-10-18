# Inventory — design volumes V01 (neighbourhoods) and V02 (buildings) (coherence/inventory-vol-V01-V02)

PROGRESS
- working store: docs/validation/coherence/work/vol-V01-V02/ (items.jsonl, findings.jsonl, add.py, build.py, render_md.py, bcrmap.json); this file and inventory-vol-V01-V02.json are generated from it
- source V01: docs/volumes/V01-neighbourhoods.md (4454 lines, 93140 words, md5 85b488b3)
- source V02: docs/volumes/V02-buildings.md (4829 lines, 103630 words, md5 1373d188)
- [x] V01 read whole and inventoried (§0-§13, cross-volume notes (1)-(39), integration notes and their continuation, reconciliation rounds 1-6 with continuations and counterpart edits)
- [x] V02 read whole and inventoried (§0-§13 with X1-X33, integration notes, reconciliation rounds 1-5 with continuations, finalization)
- [x] cross-reference census and resolution (script: scratchpad refs.py; manual review of every mechanical miss)
- [x] restatements, internal conflicts, wiring gaps, elegance, g-item and J121/J122 routing
- [x] generated .json and .md; results file; LANDED

## Summary

1191 inventory items (1144 facts, 47 defined terms): V01 650, V02 541. 65 findings (5 major, 60 minor); 11 restatements of facts owned by the base or another volume; 9 internal conflicts; 2 broken references. Both source files were unchanged from the start of the lane to the end (md5 checked by build.py); nothing in the volumes was edited.

The majors: V01-XCONF-2 — V01 admits a retaining wall to the .dd2vtt line_of_sight only when its derived step is >= vtt.retainingMinCm (150 cm), broken over stair/ramp intervals; V09 BCR-V9-31 (c) says 'in the ground scene retaining walls and the raised supports' footprints join line_o; V01-MISSING-1 — Q-V1-1 is still posed as an open owner question with a recommendation; docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md decides it ('yes', J122). The volume must mark it answered with its J122 decision (principle (7) J122), and §8.4 risk 6 and J-V1.2's '(Q-V1-1)' ; V02-MISSING-1 — Q-V2-1 is posed as open with a recommendation; docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md decides it ('not now', J122) — and it concerns SettlementForge's boundary (J121 applies: the map reads SettlementForge's own product decision). The text also keeps a co; V01-NARR-6 — About 500 lines record per-lane evidence reading lists, seam-issue disposition tables, counterpart-edit logs and fix-list tallies: narration of how the text evolved (principle (5)); the validation records (critique/*.md, seam-*.md, _integrate.md, lane-events.l; V02-NARR-9 — The volume ends with some 330 lines of per-round edit logs (issue tables, backups and md5s, doc_checks deltas 'C3 626 → 642 unreviewed', 'the markers re-verified', 'PENDING FABLE REVIEW' lines, 'formerly PLAUSIBLE'): pure narration duplicated from docs/lane-ev.

Every section, volume, id, test, BCR, f/g item and seam reference resolves (after reading each mechanical miss in context); the two broken references are V01's pointer to V1-4.6 for the clerk (it is V1-4.5) and V02's 26 receipt paths that exist only in a session scratchpad outside the project. Own ids are complete and unique: J-V1.1-101, T-V1-1-54, BCR-1-46, J-V2.1-108, T-V2-1-53, BCR-V2-01-42, X1-X33. Every BCR maps to file f items that exist (bcr_to_file_f in the JSON).

Word counts and narration (the shrink goal's NARRATION source; inventory only):

| volume | words | narration ranges (lines: words) | narration words | share |
|---|---|---|---|---|
| V01 | 93140 | 3-169: 1982 (banners and PROGRESS/revision/reconciliation ledgers); 3920-4124: 3148 (§12 CONFIRMED/PLAUSIBLE round records); 4125-4153: 410 (§13 fix list and per-round hand-offs); 4154-4454: 7343 (integration notes, reconciliation rounds 1-6 and counterpart-edit records) | 12883 | 0.138 |
| V02 | 103630 | 3-111: 1420 (banners and revision/fold/reconciliation ledgers); 4181-4338: 2252 (§12 CONFIRMED/PLAUSIBLE round records); 4339-4413: 1143 (§13 per-round fix-list paragraphs); 4452-4466: 188 (§13 base-change lane edit records); 4467-4497: 430 (integration notes); 4498-4829: 7264 (reconciliation rounds 1-5 and finalization records) | 12697 | 0.123 |

Beyond these ranges narration also sits inside normative text (revision layers in decisions, BCR extension histories, "Landed" rows in V02's X table, V01's cross-volume notes (1)-(39)) — see the NARR findings.

## Item counts by kind

| kind | V01 | V02 |
|---|---|---|
| bcr | 46 | 44 |
| budget | 5 | 6 |
| constant | 7 | 2 |
| decision | 107 | 110 |
| dossier | 14 | 4 |
| edit | 6 | 0 |
| evidence | 2 | 6 |
| fallback | 3 | 3 |
| handoff | 7 | 33 |
| hook | 26 | 6 |
| identity | 4 | 1 |
| interface | 13 | 12 |
| lifecycle | 16 | 9 |
| mechanism | 30 | 52 |
| plan | 9 | 9 |
| record | 27 | 16 |
| rule | 132 | 74 |
| scope | 12 | 3 |
| scope-out | 5 | 3 |
| step | 20 | 1 |
| summary | 6 | 4 |
| table | 13 | 23 |
| term | 24 | 23 |
| test | 40 | 24 |
| type | 9 | 4 |
| wiring | 67 | 69 |

Each item in the JSON carries id, kind, section, owner (this volume, the base section it should cite, or another volume), statement with values, reads (produced by) and used_by (consumers, hooks, tests), keys, and for identifier keys the base sections and volumes that also name them (outside_mentions).

## Restatements (facts owned elsewhere, stated with their values here)

| item | canonical home | fact |
|---|---|---|
| V01-0073 | V03 3.7.1, 3.7.2; V02 §2.3 | glosses of stackAccessDoor, basementDoor, the church class and PorchKindRow columns and ship milestone in the §1.2 hooks table |
| V01-0214 | base §4.5 (S6 character anchors) | character.anchorSigma value 5 in the landmarkSigma row |
| V01-0280 | V11 ways.crossing (rampMaxGrade) | lane, alley and cul-de-sac 12 %, path 15 % |
| V01-0352 | V11 terrace row; V11 ways.crossing | terrace.slopeMin 0.15, terrace.stepMinCm 60 cm, rampMaxGrade 12 % / 15 % in the §3.14 constants rows that say "read, never restated" |
| V01-0374 | V11 raisedWays.structure | clearanceCm cart classes 450 cm, foot classes 250 cm |
| V01-0277 | II.1 (BCR-30 (b)) | barrier-closure seam typing (shore to water, cliff and gorge to cliff, marsh to marsh, enceinte to wall, sheer never), also stated in V1-3.11 (4) |
| V02-0083 | base §2.2 LatticeSpec / §3.2 | minEdge 25 cm, attractCm 26 cm in the §1c hooks row |
| V02-0168 | base §2.2 LatticeSpec | minEdge (25 cm) in M13 |
| V02-0281 | base §1.1; §12.5 | buildings per rung (TOWN 1 200-1 500, CITY 4 500-6 000, METROPOLIS 12 000-15 000, 30 000-36 000 at the 120 000 cap), rung populations, first-map times |
| V02-0292 | V11 §3.6.4 HeightsRow | towerStoreys 5-8 at towerStoreyCm 600; a church west tower 3-5 x 450 in T-V2-7 |
| V02-0276 | V01 §7 (NG parity sheet sentence; IN-V01-3) | the NG parity-sheet sentence (fakeGablePerWing from M6a, roofscape at M6b when the bars pass), stated again in V2 §5.3 and X14 |

## Missing parts (2)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-MISSING-1 | major | §11 Q-V1-1 | Q-V1-1 is still posed as an open owner question with a recommendation; docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md decides it ('yes', J122). The volume must mark it answered with its J122 decision (principle (7) J122), and §8.4 risk 6 and J-V1.2's '(Q-V1-1)' cite the decision. | Rewrite §11 as 'Q-V1-1 answered: yes (J122)'. |
| V02-MISSING-1 | major | §11 Q-V2-1 | Q-V2-1 is posed as open with a recommendation; docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md decides it ('not now', J122) — and it concerns SettlementForge's boundary (J121 applies: the map reads SettlementForge's own product decision). The text also keeps a conditional future plan ('if SettlementForge later describes buildings, add one optional typed slice ...'). | Mark Q-V2-1 answered 'not now' (J122; J121: follows SettlementForge's decisions); drop the conditional future plan or state it as the port's rule (the port reads no shape field). |

## Cross-part conflicts (3)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-XCONF-1 | minor | §10 cross-volume note (31) | Note (31) states V11's table registry has no row for way.surface or squares.quota and f item 301's milestone should read M2b; both are now closed (V11 registry rows 90-91 carry them; f item 301 reads 'BASE (M2b) for (a)'s S7b half'), so the note is stale and contradicts its destinations. | Remove the closed hand-off text (also notes (21), (28), (30), (32), (35) '...should carry', (36), (37)): keep only open wiring, cited. |
| V01-XCONF-2 | major | V1-5.3 VTT row and BCR-40 (f 448) vs V09 BCR-V9-31 (c) (f 447 lane) | V01 admits a retaining wall to the .dd2vtt line_of_sight only when its derived step is >= vtt.retainingMinCm (150 cm), broken over stair/ramp intervals; V09 BCR-V9-31 (c) says 'in the ground scene retaining walls and the raised supports' footprints join line_of_sight as cliffs do' with no threshold. V01's reconciliation round 1 logged it ('keeps BCR-40's threshold until that lane rules'); no ruling is recorded. One export behaviour, two rules. | Canon rules one rule at §11.1 (V01's threshold is the more specific; V09 cites it) and closes the hand-off. |
| V02-XCONF-1 | minor | V02 §3.17 (b) vs V01 IN-V01-9 and V1-3.17.3 (3) | V02 says 'the least soffit over a crossed way is volume 11's raisedWays.structure.clearanceCm, which volume 1 reads'; V01's IN-V01-9 (J-VI.27) rules the soffit bound is f item 244's clearance rule (the held clearanceCm, else V11's per class). The two volumes state the source of the one soffit bound differently (the held per-way value is absent in V02 and in V1-3.17.3). | Canon: one home (f item 244's clearance rule in the base), cited identically by V01 and V02. |

## Internal conflicts (9)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-ICONF-1 | minor | §3.4.3 spine course vs §3.14 tpl.segMin/tpl.segSpan | §3.4.3 writes n = 3 + floor(5u) (3-7 segments, literal 5), while §3.14 homes it as tpl.segMin 3 and tpl.segSpan 4; the formula's multiplier (5) is not the span column (4), and the text never states n in terms of the two keys (nor δ's 0.3 in terms of tpl.courseDelta 0.15), so the cells' reading is ambiguous. | Write n = segMin + floor((segSpan+1) u) (or state span as count) and δ with tpl.courseDelta, in §3.4.3. |
| V01-ICONF-2 | minor | §3.10.3 step 2 vs §3.16 skyDistrictCount; §3.14 row | skyDistrictCount is written three ways: §3.10.3 step 2 'ceil(allocated plot land / (sky.plotShare x context.districtHa))' and §3.14 'ceil(land / (sky.plotShare x districtHa))' mix m² and ha with no conversion, while §3.16 has the x 10 000 (plotLandM2 in m², districtHa in ha). Only §3.16 is dimensionally right, and §3.16 says the formula must never be copied. | State the formula only in §3.16; §3.10.3 and §3.14 cite skyDistrictCount. |
| V01-ICONF-3 | minor | §9 J-V1.41 vs J-V1.98 and V1-3.15 | J-V1.41 still reads 'add an NG preset column to every stage-2 table' (patched only by 'the first sentence's column reads entries'), which contradicts J-V1.98 and V1-3.15 ('entries on hood.constants alone; never on another hood.* table'). J-V1.36's list (catacomb 'from its own cemetery ground'; 'caverns and ruins by relief') is superseded by J-V1.77. | Elegance: merge J-V1.41 into J-V1.98 and J-V1.36 into J-V1.77 (one decision each), keeping the reasons. |
| V01-ICONF-4 | minor | V1-3.17.3 (3) vs IN-V01-9 | V1-3.17.3 (3) states the soffit bound as the crossed class's clearanceCm from V11 raisedWays.structure, while IN-V01-9 rules it is f item 244's clearance rule (the held clearanceCm, else V11's per class): the held per-way value is missing from V1-3.17.3's text. | Write V1-3.17.3 (3) to cite f item 244's clearance rule (held value first). |
| V01-ICONF-5 | minor | §12 round-2 continuation PLAUSIBLE clause | 'that the footprint side nearest ground.at is the face volume 3's head takes (J-V1.96; T-V1-26's stack-door clause measures it from M6-P)' contradicts the current J-V1.96 (reserve at V03's stackAccessDoor(b,a)) and T-V1-26 (stack-door clause from M5 on eager records); also §13's 'V04's access kinds and catacomb entrance, BCR-36 and BCR-37, are satisfied by whichever lands first' contradicts f items 554 and 560 (merged texts govern). | Remove the stale clauses with the narration. |
| V02-ICONF-1 | minor | §3.10.5 classFamily ownership | V02 hosts the composition.classFamily table in composition.json and states 'volume 7 keeps this table as the one source of the village classes' composition keys (J-V7.82)': the table's canonical home is stated as another volume's while its rows are written here (single source ambiguous). | Canon: one home (V02 §3.10.5 as the table, V07 citing it, or V07 as the rows' authority with V02 citing) and one statement of ownership. |
| V02-ICONF-2 | minor | §8.3 effort paragraphs and §8.5 effort | The volume's effort is stated as a running history of totals (17.25-24.75; +3.25-4.75 fold; +1.75-2.5 second revision -> 22.25-32; +0.25-0.5 round 1 -> 22.5-32.5; 'M6 18-27 pw (18.25-27.5 with it)'; 'M3a's part 2-2.75 pw'; 'BCR-V2-37 restated'), several superseded numbers side by side; the one current total a reader and §16 need is ambiguous without arithmetic (and the per-milestone rows of §8.3 and §8.5 must be summed to reach it). | State the current totals once (volume 22.5-32.5 pw; M6 18.25-27.5; M3a-V2 2-2.75; spikes 2.25) with the per-milestone table as the breakdown; move the history to the validation records; hand the line to §16 via BCR-V2-37. |
| V02-ICONF-3 | minor | §8.4 R5 fallback 'before the step is refused (reported)' | R5's fallback ends with 'a failure halves the step at most once more before the step is refused (reported)': a warp step refused on a building's validation contradicts the no-refusal rule (item 101 R2; J-V2.79: refusals only for a lock or a dossier fact) and §5's ladder (no rung may be a plain refusal without a defined bend); the edge outcome (what the warp does to that building) is undefined. | Define the outcome as a bend (e.g. the warp's step held at the last lawful fraction for that building, named) or cite §7.4's warp ladder rung that governs it. |
| V02-ICONF-4 | minor | §8.3 line 3464 vs §8.3 line 3467 and BCR-V2-37 | Round 1's 0.25–0.5 pw is said to fall 'inside M6a–M6c and M3a-V2', yet the milestone arithmetic puts all of it in M6 (18.25–27.5) and keeps M3a's part at 2–2.75 pw, and BCR-V2-37 says '+ 0.25–0.5 pw inside M6'; the hole sentence moved to M3a (J-V2.104) likewise stays 'inside M3a-V2's 2–2.75 pw'. | State one placement of round 1's increment. |

## Broken references (2)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-BREF-1 | minor | §1.3 'The clerk's prompts and model' bullet | Cites 'V1-4.6' for what the clerk reads and proposes; V1-4.6 is 'Hosts and shared documents' — the clerk content is V1-4.5. | Change to V1-4.5. |
| V02-BREF-1 | minor | §3.10.3 medians and stepped receipts; header backups | V02 cites 26 receipt and backup paths under 'scratchpad/volumes/…' (header lines 42–107, §3.10.3 lines 1696–1735, §12 and the reconciliation sections) as evidence; none exists under the project root. All 26 exist only in one session's ephemeral scratchpad (/private/tmp/claude-502/…/c0d81c15-…/scratchpad/volumes/), so the CONFIRMED claims they back (the stepped Monte-Carlo, the fort/burial-ground medians, the quote checks) cannot be re-executed from the repository. | Move the receipts that back live CONFIRMED claims (medians.py, medians_new.py, stepped_receipt.py/.out, quote-check.txt) into the project (e.g. research/ or docs/validation/) and cite those paths; drop backup and doc_checks-delta citations with the narration. |

## Deferral wording (7)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-DEFER-1 | minor | §1.2 row II.1 | 'Sample (declared by RV-pc-6's pending block, or by BCR-28)' and BCR-28's 'If RV-pc-6's block lands first, this request is satisfied by it' leave the declaration of type Sample with two alternative homes; f item 540 carries BCR-28 as BASE (M1) but repeats the same either/or ('or is met there by RV-pc-6's block if that lands first'). | Rule one home (f item 540's §2.5/II.1 declaration beside Seam, M1) and cite it from §1.2 and BCR-28 without the condition. |
| V01-DEFER-2 | minor | §3.17.8 last sentences | 'Recommended to the integrator (vetoable; V1-10's note): the terminal is a conduit_house where the roster or dossier holds one, else a fountain Pin' leaves the terminal-form choice as a recommendation, not a decision; 'or the base's basin kind, when it adds one' is conditional future wording. Under J122 every remaining choice is decided. IN-V01-5 (J-VI.9) adopted it, yet V1-3.17.8 and cross-volume note (15) still present it as 'recommended and vetoable'. | State the adopted rule in V1-3.17.8 as decided (cite J-VI.9); drop the recommendation wording and note (15). |
| V01-DEFER-3 | minor | §8.4 risk 6 | 'Q-V1-1 asks the owner to confirm' leaves an owner question open; under J122 every remaining owner question is decided in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md. | Mark Q-V1-1 answered with its J122 decision and cite it here. |
| V01-DEFER-4 | minor | §10 cross-volume note (39) | Note (39) leaves an open alternative to V04 ('V04 may widen the row to any change ... or leave the inside case to the ground-edit row; either reading agrees'): an agreement seam between V01 J-V1.101 (every change of fabric.extensionWeight re-derives from S2) and V04 §4.3's switch row ('across 0') left unresolved. | Canon rules one reading at V04 §4.3 (the switch row covers any change; inside (0,1] the ground-edit row applies) and V01 cites it. |
| V02-DEFER-1 | minor | §8.1 'unless the owner answers volume 3's Q1 yes' | V02's build order is written conditionally on an owner question ('unless the owner answers volume 3's Q1 yes, in which case ...'; also M6b's 'at M6b or, under volume 3's Q1, first'); docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md decides V03 Q1 'yes' (J122): the plan rung's P0-P3 run on base wings after M4, so facadeBays, endMarginM and bayM are built first. The conditional wording leaves the build order unresolved in the text. | Write the decided order (facadeBays first, before V03's P0-P3 after M4; cite J122) in §8.1, §8.3 M6b and §16/INDEX. |
| V02-DEFER-2 | minor | §9 J-V2.71 and J-V2.32 | J-V2.71 keeps open-ended future wording ('a later owner rule may add raised decks, and DeckContext.kind would take one more value'); J-V2.32 keeps the conditional '— unless the owner answers volume 3's Q1 yes' although J122 decided V03 Q1 'yes'. | Drop the 'later owner rule' clause; rewrite J-V2.32 with the decided order (J122). |
| V02-DEFER-3 | minor | §13 X27, X28, X7 | Conditional/deferral wording in hand-offs: X27's fallback 'until SCC-11 lands V11's arena plot row' (while X32 and round 1 say V11's arena row is read); X28 'a bridge's mid-span slot where V9C-58 (7) is adopted' (adoption undecided in the text); X7 'T-V2-36's crypt part waits (V2 §8.4 R8)'. | Resolve SCC-11/V9C-58 (7) status and state the rule without 'until'/'where adopted'/'waits'. |

## Wiring gaps (2)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-WGAP-1 | minor | §5.3 skeleton row vs §4.1/§4.4 terrace edit | The skeleton-file export row lists 'a quarter's fabric (BCR-35)' but not a quarter's terrace (BCR-44) nor setAttr(D.terrace), although §4.2 says 'a skeleton's quarter carries fabric (BCR-35) and terrace (BCR-44)' and §4.4 has the quarter-with-terrace row: the export side of District.terrace to the skeleton is missing (JSON lists terrace). | Add terrace (and setAttr(D.terrace)) to the skeleton export row. |
| V02-WGAP-1 | minor | §5.3 FM look hatch pitch; stepStones sizes; stairFlight tread-line inset | Literal style values with no stated table home: the FM look's 'fixed paper pitch (0.9 px at 1x, our value)', stepStones 'stones 0.5-0.8 m at 1 m pitch', stairFlight lines 'stopping short of each side by a tenth of the flight's width' and '⅓ of the building outline weight'. Item 23 / V01 §3.14's rule is that style values are §8.2 style-sheet cells; V02 names no sheet cell for these. | Name each as a §8.2 style-sheet cell (or a §8.10 row cell) with its value there. |

## Internal duplications (5)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-DUP-1 | minor | §2.2 HoodPlace/HoodPinRow comments | 'the underground rows are volume 4's, which ships none (V04 §1.3, J-V4.97), so an underground close-up draws no hood pins' stated in §1.3, §2.2 hood.pins comment and likely V1-3.8.2 (internal duplication). | State once (V1-3.8.2) and cite. |
| V01-DUP-2 | minor | §3.10.2 street_strip vs §3.4.3 main spine | street_strip restates the spine course law (n = 3 + floor(5u), (n-1)/n, 4 - floor(n/2) passes) already stated in V1-3.4.3 while also citing it ('V1-3.4.3's course'). | Cite V1-3.4.3; keep only the strip-specific parameters. |
| V01-DUP-3 | minor | §3.6 (7) and §3.11 (4); also §1.2 g item 106 row | The barrier-closure seam typing (shore to water, cliff/gorge to cliff, marsh to marsh, enceinte to wall, sheer never) is stated in full twice inside V01 (and its home is II.1 via BCR-30 (b)). | State once at the BCR-30 home (II.1) and cite from both. |
| V01-DUP-4 | minor | §3.3.4 and §3.12 fabric.select | fabric.select key rule (lineage key with reroll forced to 0; merge/split inherits anchor key; edit-minted by event seq) stated in full twice (and again in §2.8). | Keep in §3.12 (concerns) and cite. |
| V01-DUP-5 | minor | §3.17.1 (1) vs §2.3 TerraceState and §3.3.3 | terraceState's definition (declared / relief row / S1 site primitive under siteShare; walls threshold; eager at S6's end, never from District.fabric) is stated in full in V1-2.3 and again in V1-3.17.1 (1); the stepped weight factor again in 3.17.1 (2). | Keep the definition in V1-2.3; 3.17.1 cites it. |

## Restatement findings (10)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-RESTATE-1 | minor | §1.2 rows V03 and V02 | The hooks table glosses other volumes' definitions (stackAccessDoor: '@plat/plots, built at M3a: the point, a pure function of eager records'; basementDoor 'the outside door of an external basement'; church-class 'a class whose crypt column is always or basement'; PorchKindRow columns and ship milestone) instead of citing them; restated again in §1b entrance-reserve row and V01-3.8.2. | Cite V03 3.7.1/3.7.2 and V02 §2.3 only. |
| V01-RESTATE-2 | minor | §3.6 (3) | Restates V11's ways.crossing rampMaxGrade values ('lane, alley and cul-de-sac 12 %, path 15 %') while claiming 'one threshold, stated once' — the values' home is V11 (item 110 (a) way-class rule). | Cite V11's row without the values. |
| V01-RESTATE-3 | minor | §3.14 constants table rows 'terrace thresholds' and 'stepped threshold' | Row says V11's terrace row is 'read, never restated' but gives its values (terrace.slopeMin 0.15, terrace.stepMinCm 60 cm) and V11's rampMaxGrade values (12 %, 15 %); also narration 'stepped.minSlope leaves hood.constants'. | Cite V11's keys without values; drop the narration. |
| V01-RESTATE-4 | minor | §3.3.2 landmarkSigma row | The landmarkSigma row gives its default as 'character.anchorSigma, 5, by default': the key is the base's (§4.5 S6 character anchors, 'σ ≥ character.anchorSigma, 5'), so the value 5 restates a base constant beside its citation. | Cite character.anchorSigma (base §4.5) without the value. |
| V01-RESTATE-5 | minor | §3.17.3 (3) | Restates V11 raisedWays.structure clearanceCm values ('cart classes 450 cm, foot classes 250 cm') while citing V11 as their home. | Cite V11 without values. |
| V02-RESTATE-1 | minor | §1c row §3.2-§3.4 | Restates the kernel constants' values ('minEdge 25 cm, attractCm 26 cm'), whose home is §2.2 LatticeSpec (kernel inventory KERNEL restatements). | Cite §2.2 / §3.2 without values. |
| V02-RESTATE-2 | minor | §3.5 M13 | Restates minEdge's value ('minEdge (25 cm)') whose home is §2.2 LatticeSpec / §3.2. | Cite minEdge without the value. |
| V02-RESTATE-3 | minor | §5.3 NG parity sheet bullet vs V01 §7 | The NG parity sheet sentence ('from M6a keeps fakeGablePerWing; at M6b re-measured on roofscape, switched when bars pass, else kept, reported') is stated in full in V02 §5.3, V02 X14 and V01 §7 and IN-V01-3 ('the one sentence volume 1's V1-7 and X14 share'): one fact, three statements. | State once (V01 §7, the NG bars' owner) and cite from V02. |
| V02-RESTATE-4 | minor | §6 opening paragraph and §6.1 rung table | Restates §1.1's building counts per rung (TOWN 1 200-1 500, CITY 4 500-6 000, METROPOLIS 12 000-15 000, 30 000-36 000 at the 120 000 cap) and rung target populations (5 000, 20 000, 50 000), and §12.5's first-map times (124-145 ms, 0.33-0.42 s, 0.86-1.05 s, ≈ 2.3 s) whose homes are the base. | Cite §1.1 and §12.5 for the counts and times; keep only V02's added costs. |
| V02-RESTATE-5 | minor | T-V2-7 cathedral fixture | The bar restates V11 HeightsRow values ('towerStoreys 5-8 storeys at towerStoreyCm 600'; 'a church's single west tower 3-5 x 450'), whose home is V11 §3.6.4 (V02 §3.10.6 says it reads them unchanged). | Phrase the bar as 'the church and cathedral HeightsRow's towerStoreys and towerStoreyCm (V11 §3.6.4)'. |

## Terminology (6)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-TERM-1 | minor | V01 line 33 Citations | Volume-internal section citation form is 'V1-n' (e.g. V1-3.8.7) while principle (1) prescribes 'V04 §3.2' form for volume references; other volumes cite this one as 'V01 §x' or 'V1-x' inconsistently (see census). | Canon: one citation form for volume sections across the set. |
| V01-TERM-2 | minor | §3.3.3 stepped row (slopeMeanPct 8) and §3.6 (3) stepped ways (slopeP95 > rampMaxGrade) | 'stepped' names two different things: the Terraces template row (eligible at slope.meanPct >= 8, weight x min(2, slope.meanPct / 8), §3.6 (8)'s [8 %, 100 x terrace.slopeMin) band) and a way state (slopeP95 above V11's ways.crossing rampMaxGrade; the header's 'stepped threshold is rampMaxGrade', J-V1.72). The 8 % row threshold is a literal in the table and §3.6 (8), not a named hood.constants cell; the two are easily read as one threshold. | Name the way state and the row distinctly (e.g. 'stair-stepped way' vs 'stepped row'), and give the 8 % row threshold one home (the TemplateRow cell) cited by §3.6 (8). |
| V02-TERM-1 | minor | V02 line 20 References | V02 cites itself as 'V2 §n' and siblings as 'volume k', while V01 cites itself as 'V1-n' and others as 'V05 §x' / 'V2 §x' / 'V02 §x' (mixed): one volume-citation form is needed across the set (principle (4) cross-references). | Canon: one citation form (e.g. 'V02 §3.5'). |
| V02-TERM-2 | minor | §9 decision ids order | Decision ids run J-V2.1-76, then J-V2.79-87, then J-V2.77-78, then J-V2.88-108 (J-V2.77 and J-V2.78 sit after J-V2.87), so the table is not in id order; ids are unique. | Reorder the table by id. |
| V02-TERM-3 | minor | §7.2 T-V2-36 vs BCR-V2-28 / J-V2.108 | After the finalization keyed the raised lift on 'the ground wings over the basement's ring', T-V2-36's first clause still reads 'their seed wings' ground storey lifted by crypt.clearCm' and 'its seed wings raised by cellar.depthCm ÷ 2'. For a derived crypt the two sets coincide (line 1316), so the test is right for its cathedral fixtures, but it names the lift's subject by the superseded term. | Word T-V2-36's clause as 'the ground wings over the crypt's ring'. |
| V01-TERM-3 | minor | V1-3.10.1 and 17 other places | One concept, the document whose Recipe.product is 'hood', is called 'standalone neighbourhood' (13), 'standalone neighbourhood document' (7), 'standalone hood(s)' (5) and 'lone neighbourhood document' (J-V1.36), plus 'hood document' inside those phrases. | Name it once ('standalone neighbourhood document') and use it throughout. |

## Ambiguous text (1)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V02-AMBIG-1 | minor | §3.13 F-COMPOSE (4) | The sentence of rung (4) is garbled: an inserted clause ('a porch meeting one of the building's own other wings (V2C-69) takes (2)'s ladder, narrowed first to the free part of its side,') splits 'returns the identity composition' from its defining parenthesis '(composed wings and towers one to one, no dormer, no porch, no room)', so the parenthesis reads as if it described the porch ladder. | Rewrite as two sentences: the porch-meets-own-wing case under (2); (4) with its identity-composition definition intact. |

## Elegance candidates (1)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V02-ELEG-1 | minor | §3.7 facadeBays valley reach and §5.2 step 2 valley extension | One quantity, the plan reach of a valley where X's ridge meets Y's roof, is defined twice: facadeBays' integer e = floor((X.ridgeCm - Y.eaveCm) x Y.halfSpanCm / Y.riseCm) and roofscape's float e = (X.ridgeCm - Y.eaveCm) / Y.slope. Candidate: one definition (valleyReach) with its two arithmetic modes (integer for bays, float64 for drawing); nuance to keep: the integer form is byte-identical on every host (T-V2-13), the float form is view data. | Canon: state valleyReach once and cite it from both. |

## Hand-offs to the canon (2)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-HANDOFF-1 | minor | §1b dossier table last-but-one row | 'DR-V1.1 (new, BCR-29; the coherence pass numbers it)': a derivation row left for this pass to number; the canon must assign its id in the base's derivation table (§7.7) and V01 cite it. IN-V01-6 (J-VI.13) and f item 383 number it DR26, but V01's §1b row, BCR-29 and every citation still read 'DR-V1.1' and 'the coherence pass numbers it'. | Replace DR-V1.1 by DR26 throughout V01 (and the base §7.7 row when f item 384 is applied). |
| V01-HANDOFF-2 | minor | §8.2 last paragraph | '§16's total rises by 13.25-18.25 pw, computed once with every volume's lines by the coherence pass (file f item 568)' and 'Other volumes re-price their own lines; the coherence pass sums them' hand the §16 sum to this pass. | Canon: sum every volume's re-priced lines into §16 and INDEX.md's plan once (item 568); V01 cites the result. |

## Narration (15)

| id | sev | where | claim | hint |
|---|---|---|---|---|
| V01-NARR-1 | minor | V01 lines 3-17 | Eight stacked 'PENDING FABLE REVIEW' banner lines (one per lane: V1-neighbourhoods, revise-V1, reconcile-V01-r1..r6); principle (8) allows one marker line per volume, the close's. | Replace by the close's single marker line. |
| V01-NARR-2 | minor | V01 lines 19-31 and 38-169 | Revision notes ('REVISED 2026-09-28 ... against critique V01.md', 'REVISED AGAIN 2026-09-29') and nine PROGRESS / REVISION / RECONCILIATION ledgers (about 130 lines) narrate how the text evolved (principle (5)); the validation records (critique/V01.md, seam-*.md, lane-events.log) keep it. | Remove; keep only the citations paragraph (line 33-36) reworded without the pass history. |
| V01-NARR-3 | minor | §9 J-V1.7, J-V1.18, J-V1.36, J-V1.41, J-V1.96 (also J-V1.75, J-V1.90, J-V1.97-J-V1.101 headers) | Decision rows carry revision narration ('revised: ...', 'revised from ...', 'revised by J-V1.77', '*Amended at reconciliation round 4's continuation*', '*Reconciliation round 2's continuation (seam ...)*', '*Revised at ... the first choice had read ...*'), keeping superseded choices beside current ones. | Rewrite each as its current decision; move history to the validation records. |
| V01-NARR-4 | minor | §10 BCR-45 and BCR-46 closing sentences; BCR-19 (d); BCR-29; BCR-28 | BCRs carry process narration ('File f carries it as a new item in the base-change lane (cross-volume note (28))'; 'File f carries it as item 584 ...'; 'the coherence pass assigns the final number'; 'found in passing, file f's round-4 note'); BCR-28 keeps a conditional ('If RV-pc-6's block lands first, this request is satisfied by it'). | Once f is applied, §10 is history: replace V01 §10 by a pointer to the applied base sections (the requests become restatement after application) or at least drop the process clauses. |
| V01-NARR-5 | minor | §10 cross-volume notes (1)-(39) | Thirty-nine cross-volume notes (about 110 lines) are hand-off and process narration ('applied, V05 §3.1 now reads so', 'Landed by volume 5's round-5 lane while this lane ran (its 12:38 log note)', 'the first round's 10 corrected in the second', 'logged for volumes/reconcile-V04-r6 while both lanes ran'); most are closed at their destinations. | After the canon verifies each destination (agreement matrix), drop the block; open ones become citations at their homes. |
| V01-NARR-6 | major | V01 §12 lines 3947-4123; §13; 'Integration notes' and nine 'Reconciliation round' / 'Counterpart edits' sections (lines 4154-4454) | About 500 lines record per-lane evidence reading lists, seam-issue disposition tables, counterpart-edit logs and fix-list tallies: narration of how the text evolved (principle (5)); the validation records (critique/*.md, seam-*.md, _integrate.md, lane-events.log) hold them. Integration notes IN-V01-4, -5, -6, -9 carry normative rulings that are not yet folded into the sections they govern. | Fold IN-V01-4 (reason word derivation) into V1-2.3's raised comment, IN-V01-5 into V1-3.17.8, IN-V01-6 into §1b/BCR-29 (DR26), IN-V01-9 into V1-3.17.3; keep one CONFIRMED/PLAUSIBLE paragraph; drop the rest. |
| V02-NARR-1 | minor | V02 lines 3-11, 49-51, 90, 103 | Nine stacked 'PENDING FABLE REVIEW' banner lines (V2-buildings, revise-V2, reconcile r1-r5, the item-110 fold, second revision); principle (8) allows one marker line per volume. | Replace by the close's single marker line. |
| V02-NARR-2 | minor | V02 lines 13-111 | Revision and reconciliation ledgers (revision of 2026-09-28, ITEM 110 FOLD ledger with doc_checks counts, second revision, reconciliation rounds 1-5 with backups and receipts, about 95 lines) narrate how the text evolved (principle (5)); in-text markers '(second revision)', '(item 110 fold)', '(reconciliation round n)' and issue ids are spread through the body. | Remove the ledgers and the in-body revision markers; the validation records keep them. |
| V02-NARR-3 | minor | §9 J-V2.3, -13, -18, -22, -32, -35, -52, -56, -61, -68, -72, -73, -75, -76, -99 and every J-V2.79-J-V2.108 header | Decision rows carry revision narration and superseded choices ('*Amended by the revision*', '*Reconciliation round n*', '*Second revision (V2C-..)*', J-V2.35's 'so the fallback is history', J-V2.56's three-round history); J-V2.73 and J-V2.76 are struck-through superseded decisions kept in the table; J-V2.58 is a process decision (folding in its own lane) with no design content. | Rewrite each decision as its current choice; drop the struck J-V2.73 and J-V2.76 (their content lives in J-V2.79) and the process-only J-V2.58, moving history to the validation records. |
| V02-NARR-4 | minor | §10 BCR-V2-13, -15, -21, -26, -28, -33, -39 extensions and §11's per-round paragraphs | BCRs carry 'Extended by reconciliation round n', 'Restated by the second revision', 'Absorbed (reconciliation round 2)', 'Build note' histories, and §11 four per-round 'raised no owner question' paragraphs: narration; once f is applied the requests are history/restatement of the base. | After f is applied replace V02 §10 by a pointer to the applied base sections; keep §11 as one answered question. |
| V02-NARR-5 | minor | §12 (lines 4181-4337) | §12 is a per-revision evidence log: its census claims are stale against the live text (the latest reads 'J-V2.1 – J-V2.87, T-V2-1 – T-V2-51, X1 – X29' while the file defines J-V2.108, T-V2-53 and X33) and its first PLAUSIBLE line gives 'the effort of V2 §8 (17.25–24.75 pw before the item 110 fold, 20.5–29.5 pw with it)' while §8.3/§8.5 now state 22.5–32.5 pw; 'formerly PLAUSIBLE (reconciliation round 5 ...)' is edit history. | Replace §12 by one current CONFIRMED/PLAUSIBLE list with one census line over the live file. |
| V02-NARR-6 | minor | §13 Fix list and the two 'base-change lane's edits' paragraphs | §13 is almost entirely round-by-round narration ('fixed all 21 seam issues', 'told the split', 'Outside this file ... logged'); its round-1 sentence 'item 226 should split its label so BCR-V2-28's half raise ... lands with the base's basement gate, not at M6-U' is superseded by the round-2 paragraph (f item 226 labels it BASE M2b), so the section now carries both the request and its resolution. | Keep only the X table as the volume's hand-off list; delete the per-round paragraphs. |
| V02-NARR-7 | minor | §13 X3, X5, X13, X26, X30-X33 'Landed'/'applied' rows | Nine X rows record items that have landed or been applied ('Landed:', 'landed; none needed', 'applied by volume 3's reconciliation round 2'): these are history in a hand-off table, and X31/X32 carry no hand-off at all ('stand as written', 'is what V02 reads'). | Drop landed rows or fold their surviving rule into the owning section. |
| V02-NARR-8 | minor | Integration notes header and reconciliation headers | 'PENDING FABLE REVIEW — written by opus standing in for the Fable seat' markers and 'Each note supersedes any sentence of this volume that reads otherwise' leave the reader to apply the supersession; IN-V02-2 (a)/(b), IN-V02-1 are edited in place so their notes restate the text. | Apply every IN note in place and remove the notes; retire the review markers when the retrovalidation closes. |
| V02-NARR-9 | major | lines 4498-4829 (reconciliation rounds 1-5, continuations, finalization; about 330 lines) | The volume ends with some 330 lines of per-round edit logs (issue tables, backups and md5s, doc_checks deltas 'C3 626 → 642 unreviewed', 'the markers re-verified', 'PENDING FABLE REVIEW' lines, 'formerly PLAUSIBLE'): pure narration duplicated from docs/lane-events.log and the seam files, including superseded intermediate texts (S23R2-03's 'where no ground wing reaches storey 0' and 'its door by volume 3's tomb-door rule', both replaced by later rounds). | Delete the reconciliation and finalization sections (the seam files and lane-events.log hold the history); largest single shrink in V02. |

## Reference census

| volume | kind:status counts |
|---|---|
| V01 | bcr:ok 456, decision:ok 316, f-item:ok 70, f-item:unresolved 3, file:ok 41, g-item:ok 182, integration:ok 13, judgment:ok 66, seam/critique:ok 633, section:external 26, section:ok 2800, section:unresolved 80, test:ok 243 |
| V02 | bcr:ok 568, bcr:unresolved 1, decision:ok 373, f-item:ok 50, f-item:unresolved 1, file:external 5, file:ok 70, file:unresolved 28, g-item:ok 201, integration:ok 13, judgment:ok 75, seam/critique:ok 778, section:external 17, section:ok 1951, section:unresolved 52, test:ok 381 |

Every §x.y and II.x reference, V0n §x / Vn §x / volume n §x / V1-x.y / V0n x.y volume reference, BCR-n / BCR-Vn-m, J-Vn.m, T-Vn-m, Jnnn (docs/PROGRESS.md), J-VI.n (_integrate.md), other J-ids, IN-V0n-m, seam and critique ids (S23…, SCC…, ST-, SR…, VnC-, Cn-, SS-, CVR-, X-Vn-), file f items, g items and file paths in both volumes was extracted by script (scratchpad refs.py) and resolved: base refs against ARCHITECTURE.md's headings, volume refs against each volume's numbered headings and bold sub-numbers, own ids against their definition rows, other ids by presence in the target file, f items 200-585 and g items 102-113 against the item lists, paths on disk.

165 section refs failed the mechanical qualifier: every one was read in context and resolves — 131 are own-volume or other-volume pointers whose qualifier sits earlier in the sentence or on the previous line (e.g. 'V2' at a line end, 'V04 §3.3's P7 … §3.7a's T8', 'V05 §3.20 (1)'), 30 sit in V02's header ledgers as own shorthand, 1 is a pattern placeholder ('§3.1x'), 1 cites the critique's §11.6; the 4 'f item' hits are 'of item 109/102/106/110' (g items, resolved); 'BCR-14' in V02 is V01's BCR-14 by its sentence; 'plat/bench/fm-parity/' is a planned code path, not a document; 26 'scratchpad/volumes/…' paths exist only in a session scratchpad (finding V02-BREF-1). Own ids: J-V1.1-101, T-V1-1-54, BCR-1-46, J-V2.1-108, T-V2-1-53, BCR-V2-01-42 each defined exactly once with no gap; every cited own id is defined; X1-X33 all present. Deep qualifiers (rule n, step n, (n)) were checked where a finding depends on them (V1-4.6 vs V1-4.5).

## g items and owner decisions

g items 102-110 are carried by the two volumes as their owners named (V01 §1.2 g-item rows and V1-3.17 item 110 parts; V02 §3.14, §3.15-§3.17). g items 111-113 (added 2026-09-29, applied by the coherence pass) name neither V01 nor V02 among their homes: 111 names V07, V08, V11, V06, V05, V09, V10, V12; 112 names base §8, §9, §13, V09, V12; 113 names V06, V08, V04, V07, V11, V09, V10, V12. Touch points for the lane applying them (not findings here): 112 (a)'s second cue applies to every style family that encodes meaning in colour, which includes V01's hatched family and V02's FM look if they carry any colour-coded category; 113 (a) (3)'s 'roofless and ruined buildings' and 'a church too big' read V02's massing and V06's decay rows. J121/J122: Q-V1-1 ('yes') and Q-V2-1 ('not now') are decided in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md but not marked answered (findings V01-MISSING-1, V02-MISSING-1); V03 Q1 ('yes') still conditions V02 §8.1 and J-V2.32 (V02-DEFER-1, -2).

## CONFIRMED versus PLAUSIBLE

CONFIRMED (read or executed in this lane): both volumes read completely; the reference census executed by script with every miss read in context; own-id completeness and uniqueness by script; the f-item map of all 88 BCRs; the scratchpad receipts' location (all 26 exist only under a session scratchpad); J122 answers read in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md; character.anchorSigma at base §4.5; f item 540's either/or; V1-4.5 versus V1-4.6 headings. PLAUSIBLE: the severity grading, the elegance and shrink suggestions, and the reading that T-V2-36's "seed wings" equal the ground wings over a derived crypt's ring.
