# Verify — design volumes V11 (the content system) and V12 (calibration), coherence pass round 0

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V11-V12-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V11-V12-r0`; started 2026-10-03 02:43 in the cloud continuation, resumed by the
continue rule from the scratch files on disk)
- P1 inputs gathered (canon routing for V11/V12, inventory findings, rewrite reports and mapping tables, edges, cross-part notes N1–N15 / M1–M14, sibling verifiers' issues): done
- P2 mechanical checks (ids, references, terms, deferral and narration, mapping table, per-item tokens): done
- P3 V11 archive → new review, unit by unit (paragraphs, table rows, code blocks, registry rows, lifecycle rows, decisions): done
- P4 V12 archive → new review, unit by unit: done
- P5 cross-unit agreement, cohesion, wiring, edges, file g items 111–114: done
- P6 report, results JSON, LANDED: done

Scratch: `/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/vv1112/`
(`canon-units.txt`, `canon-rulings.txt`, `inv-findings.txt`, `xnotes.txt`, `sibling-issues.txt`, `itemcheck.json`,
`fd-V11-body.txt`, `fd-V12-body.txt`, `rd-V11-3.1.txt`, `strictref.txt`, `findings.jsonl`, `final-issues.json`, and the
scripts that made them: `itemcheck.py`, `fdiff.py`, `rowdiff.py`, `secdiff.py`, `strictref.py`, `jret.py`, `jover.py`).

## 1. Outcome

**28 issues: 1 blocker, 7 majors, 20 minors.** By owner: V11 13 (2 majors, 11 minors), V12 7 (1 blocker, 2 majors,
4 minors), pipeline 3 (2 majors, 1 minor), model 2 minors, scope 2 minors, V04 1 major. The live files
`docs/volumes/V11-content.md` and `docs/volumes/V12-calibration.md` are the assembled ones (byte-identical to
`docs/validation/coherence/new/volumes/`).

Both volumes kept their content well: every one of the 1 050 inventory ids (647 V11, 403 V12) is mapped and its facts
traced to the new text or to the home it now cites; the 27 canon conflict rulings for the two volumes are applied; items
111 and 113 stand at build depth in V11 (§3.17.1, §3.25) and their bars, pins and register lines in V12; the integration
notes IN-V11-1 – 10 and IN-V12-1 – 4 are folded at their homes; ids are unique and every cited T-, J- and W-id resolves;
the narration, the ledgers and the retired terms are gone. The defects are:

* **File g item 114 (OWNER RULE, filed 2026-10-03 02:35 UTC, J126) is absent from both volumes** — V11 holds no
  'Built by the town' switch rows and still states the reason-keyed suppression the item withdraws; V12 holds none of
  the item's bars and still builds a test on the withdrawn suppression (VV1112-02, VV1112-04; both majors, as the
  sibling verifier rated V05's and V06's).
* **One reasoned-decision loss in V12 §9** (VV1112-01, blocker): the compression of J-V12.69 – J-V12.80 dropped a
  rejected alternative with its reason (J-V12.77) and two reasons (J-V12.78, J-V12.79) found nowhere else.
* **Producer/type mismatch for `dist/evidence.json`** (VV1112-03): V12 typed `EvidenceFile` with an `entries` block
  for V09's inspector and V10's clerk, but V11's compiler — its only writer — still writes the archive's `{status,
  lines}` shape.
* **V12's pin table restates the owner items' off forms** and its restatements disagree with V11 §3.24.0, the home
  E-20 made of every off form (VV1112-05).
* **Two base defects found through V11's rows**: the class mix's sunlit weight changed from V11's 0.15 to a new 0.3
  with no ruling (VV1112-06), and item 102's no-op form (`w_sun` 0) does not switch off §4.7 S10b's sunlit term, so the
  owner's bar "with `w_sun` = 0 … byte-identical" cannot hold (VV1112-07).
* **One rank under two names in two tables** — `UndercityRule.sourceRank` (base) and `RuinRule.sourceWeight` (V04)
  (VV1112-08), which V11 noted and the Assemble seat left unplaced.
* The minors are citation form (bare self-references resolving to base sections; list continuations against canon S7),
  two pointers to a non-existent V11 §3.17.3, registry readers and rows homes missing a reader or a writer, name forms
  (`history.<cell>`, 'calibrate-later'), and stale lists of V11's content steps and pins.

## 2. Method (sample nothing)

* **Every inventory id** (`inventory-vol-V11-V12.json`, 1 050 items) was checked against the rewrite reports' mapping
  tables (1 050 mapped, 0 missing, 0 duplicated) and token-traced: each item's code names, numbers, ids and cell names
  that stand in the archive were looked for in its mapped home section, then anywhere in V11/V12, then in the base and
  the other volumes (`itemcheck.py`). 183 items had a token missing from their mapped section; each was read: 157 are
  moves inside the volume (readers moved to the registry by E-34, wiring rows condensed to cite registry rows, BCR texts
  turned into pointer rows, narration numbers), 26 had a token gone from both volumes and every one is either now stated
  at the home it cites (base §7.6, §10.2, §8.2, §13.x; V08, V09), a retired term (`fallbackClass`,
  `aqueduct.dossierFactor`, `site.terrainType`, `NoRegressionSpec` → the inline `noRegression` spec), a ruled change
  (J-V11.8's 181, V11 §8's total with C1b and C9) — or the one CHANGED value VV1112-06.
* **Every archived unit** (2 430 V11, 720 V12 paragraphs, table rows and code blocks) was aligned to its best new unit
  and word-diffed after normalising the citation form and stripping validation ids (`fdiff.py`); the 524 + 356 units
  with a non-trivial change were read in full, the registry (§3.1, 92 rows) row by row (`rowdiff.py`), the item-110
  lifecycle pattern (§2.10), §3.24.2 and the off-form tables section by section (`secdiff.py`), and every decision row's
  "over …" and "because …" clauses scored for retention (`jret.py`, `jover.py`; V11 1 clause below 0.6, the ruled
  J-V11.92 conditional; V12 7, in J-V12.77, .78, .79 → VV1112-01).
* **References** were checked strictly (`strictref.py`): every `Vnn §x.y` against that volume's headings and numbered
  leads, every bare `§x.y` against the base, list continuations counted separately.
* **Canon routes**: the canon units V11 and V12 (conflicts, f items concerning, g parts, wiring, elegance, id rulings,
  terms, cohesion, open findings, hand-offs, agreement, edges, combinations, owner questions, shrink) — §4 below.
* **Cross-part notes** addressed to V11 (N1–N15) and V12 (M1–M14) in the base parts' and the other volumes' rewrite
  reports, the Assemble seat's unplaced list, and file g items 111–114 — §5 below.

## 3. Sizes and the shrink goal

| unit | words before (canon) | after | change | band (25–40 %) |
|---|---|---|---|---|
| V11 | 106 185 | 95 884 | −9.7 % | below; −29.6 % of prose; ≈ 9 200 words of required additions (items 111, 113, §3.26 edges, E-20's table, J122's rows, §10b hand-offs, 13 decisions, 3 tests) and 61 % table rows |
| V12 | 76 414 | 69 259 | −9.4 % | below; ≈ 13 400 words of narration out, ≈ 7 000 of required additions (§3.15 edges, item 112's §2.14, items 111/113's bars, J122's batch, E-35's table, E-20's pins, 7 tests, 8 decisions) |

Neither unit shrank by more than half, so the half rule's nuance audit is not triggered; the unit-by-unit review above
covered every archived subsection all the same. The shortfall against the band is explained by irreducible content (not
a defect). The words removed come from narration (the ledgers, the reconciliation and finalization records, §12's lane
records, V12's §10 request texts), restatement (base and other-volume facts now cited) and duplicated statements unified
by E-34/E-35/E-20 — except the decision compression VV1112-01 records.

## 4. Canon routes, checked against the text

| route | V11 | V12 |
|---|---|---|
| conflicts | DXC-05 (row 93 `base.settings`, values L0–L4 25/25/10/5/5 m, 3, 120 m), MC-11 (`TableId` §7.6's), CF-PIPE-10 (§3.15: walls, towers, toll and customs houses taxes 1; gates, bridges, roads 0.7 + 0.3), RIC-01 (`parchment` one status), V08-XCONF-9 (era from V08 §2.6's row, no tier), V09-XAGREE-1 (§4.2: four key forms, `avoid`), V11-ICONF-1 – 7, V11-XCONF-1 – 4, V12-XCONF-2 (pinning hash §7.6's), CANON-C03/C04 — all applied | SCOPE-C14, V12-ICONF-1/2, V12-XCONF-1 (J122's four sittings, §0, §3.9.1, §6, §8.3, §11), -2 (§2.10 cites §7.6), -3 (`StageId[]`, S5a – S5d, S12a – S12b), -4 (every district, J-V12.60), -5 (base §13.9 cites J122), CANON-C03/C04 — all applied |
| f items concerning (55 / 35) | cited, none restated; the §10 pointer table maps BCR-V11-1 … 31 to items and base sections; the base holds each (sampled none: each pointer's token set found in the base, `itemcheck`) | §10 maps BCR-V12-1 … 22; the same check |
| g parts | 111: §3.17.1's dry-country cells with ranges, readers (row 43), off form, T-V11-38, C1b — present (VV1112-09: S5b missing as reader); 113: §3.25's settings, burial threshold (B = clamp(100 × 0.7^nFlood × 0.8^nSilt × 0.6^[built] × 1.5^[rock], [30, 400])), 17 event-to-epoch rows over the 29 templates, T-V11-39, C9 — present; **114: absent (VV1112-02)** | 111: register lines, `item111.water` pin, T111-1/3/4 specs, T-V12-42 — present; 112: `TrialFinding`, `plat calibrate trial`, T-V12-44 — present; 113: conformance list, `exactStates`, the replay budget (V12 §6), `item113.history`, T-V12-43 — present; **114: absent (VV1112-04)** |
| wiring | DWG-03, KWG-06, W-SET-01 (row 93, W83), V11-WGAP-1 (row 50: VS8, EVO_FORT) — closed | W-IF-04/05: V12 side closed (`EvidenceFile`), producer side open at V11 (VV1112-03) |
| elegance | E-05 (registry is §3.1), E-20 (off-form table §3.24.0), E-24 (one mark: J-V11.50, .77, .90, .92, .96), E-30, E-34 (readers once; item-110 pattern row — under item 114 its suppression clause must change, VV1112-02), E-37 (`ContentUnit`), E-38 (row 41 derived) — applied | E-20 (one `NoOpPin` engine — but the table restates off forms, VV1112-05), E-24 (9 marks), E-35 (§2.11 one table — the `CalibrationEntry` row lost two consumers, VV1112-23), E-37 (`MetricUnit`), E-38 — applied |
| ids | ID-BCR, ID-WX, ID-DR (DR32, DR35), ID-DUPDEF; T-V11-0 – 40, J-V11.1 – 109, W1 – W85 unique, every cited id defined; J-SS.2/.3 cited from a critique record (VV1112-18) | ID-BCR, ID-JT (JT), ID-WX; T-V12-1 – 48, J-V12.1 – 91 unique, every cited id defined; J-RF2.4 defined in file f (part of the set) |
| terms | no retired term (G-lot, G-strike, G-unitinput, G-DR, G-panelgroup, G-fallbackclass, G-digest, G-cite short forms); S7 citation form not met for self-references and continuations (VV1112-11, VV1112-12); `history.<cell>` two names (VV1112-15) | G-lot kept only for the references' own parcels (editor's decision 1, sound: a different concept); G-M6U hits are V02's M6; 'calibrate-later' kept against V11's register form (VV1112-21); continuations (VV1112-22) |
| cohesion | §8 sums: 12.75–17.75 pw (checked); §11 answered (J122); one marker line; §1b wiring; the register-at-every-exit list stale (VV1112-13); INDEX §1's row stale (VV1112-28; price VAP-15) | §8 prices agree with INDEX §1 (6–9; M-CAL 4.75–8; 0.25–0.75 each); §11 answered (J122); one marker line; V11's steps C1b/C9 missing (VV1112-20) |
| open findings (80 / 34) | each closed in the text: RESTATE-1 … 7 (RESTATE-7's base half open at pipeline, VV1112-24), DUP-1 … 3, ICONF, XCONF, ELEG-1, EDGE-1/2, WGAP-1, MISSING-1 … 6, TERM-1, DEFER-1 … 4, NARR-1 … 18, BREF-1 … 3, HANDOFF-1, SR6-09, SR6-08, IN-V11-1 … 10 | each closed: RESTATEMENTS-011/012, RESTATE-1/2, ICONF, XCONF, ELEG-1, MISSING-1 … 7, TERM-1/2, NARR-1 … 5, BREF-1/2, HANDOFF-1, SCC-109's clause, IN-V12-1 … 4 |
| hand-offs (40 / 11) | answered at V11 §10b's second table; this volume's X-V11-1 … 17 closed at their destinations (one wrong locator, VV1112-16) | V12 §13's two tables; one closure claim false at V11 (the evidence file, VV1112-03) |
| agreement | `TableId` (MC-11), T-V6-62 (V11-XCONF-1), T-V11-18 (V12-XCONF-4) — agreed | the same |
| edges (52 U + 12 T) / (40 U + 11 T) | V11 §3.26's five rules and 21-row table define every routed edge with outcome, rung and test (T-V11-40); the 21 owned combinations each have a row | V12 §3.15's four rules and per-mechanism table cover the 51 edges (T-V12-47) and the 17 combinations (T-V12-48) |
| owner questions | Q-V11-1 answered by J122 (concealment `none` 0 for the sensitive kinds, SettlementForge's settings shown) | Q-V12-1 – 3 answered by J122 and read in the body |

## 5. Cross-part notes and the Assemble seat's unplaced items

**To V11 (N1–N15).** N1 (V04: buried slice "Old ⟨settlement⟩", burial factors read by V04 §3.5.5 (b) — closed; row 59's
`former*` params — open, VV1112-14); N2 (V05 landing classes cite V05 §2.4 — closed); N3 (`contract.occupiedShareMax` is
V06's — the base still says V11's, VV1112-26); N4 (V06 history cells and rows — closed in §3.25); N5 (V07: row 61's readers
S0, VS1–VS6; climate cells read by VS1, VS2, VS8; `v.` commonness cites V07 §2.4 — closed); N6 (V08: era without tier;
29 templates — closed); N7 (determinism: registry, pinning hash, reference cells — closed); N8 (kernel: base settings
values — closed); N9 (model: `ContentUnit`, rows 79–80, oasis rows, `stretchClass` — closed; the base names the subsets
by their old descriptions, VV1112-25); N10 (pipeline: every listed cell present; `ClassMixRow.sun`'s value, VV1112-06);
N11 (scope: `cvd.minDeltaE2000` 8, row 52 — closed); N12 (V02: X-V11-5, -9, X16, X27 closed; X-V11-7's locator wrong,
VV1112-16); N13 (V03 — closed); N14 (V09: §4.2's forms and cells — closed); N15 (V10: rows 88–89, history and climate
cells — the clerk missing as a reader of rows 43 and 92, VV1112-17).

**To V12 (M1–M14).** M1 (V04: T-V4-76 – 79, `former*` on the default line — closed); M2 (V05 — closed); M3 (V06: its
lines at `V6-E5`/`V6-E9` are V06 §8's, `V6-E0` – `V6-E9` admitted — closed); M4 (V07: E-38, T-V7-58/59 pins — closed);
M5 (pinning hash — closed); M6 (`MetricUnit` — closed); M7 (`D5PairStaged` — closed); M8 (JT; M-CAL after M6-sky —
closed); M9 (V01: T-V1-4 (e), T-V1-32 — closed); M10 (V02: no V12 action needed); M11 (V03 — closed); M12 (V09: K1/K2,
`TrialFinding[]` — closed); M13 (V10: `RuleAnswer.evidence` reads `EvidenceFile` — V12 side closed, V11's writer open,
VV1112-03); M14 (V11: item-111 and item-113 lines — closed).

**From the Assemble seat's unplaced list (assemble-r0):** "one rank, two names" (VV1112-08); "V11 'V11 §3.17.3'"
(VV1112-10); "bare self-references against canon S7: V11 19 … plus 8 sibling pointers" (VV1112-11); J-RF2.4 — defined in
file f, which the brief names part of the set, so not raised.

**Sibling verifiers' issues against V11 and V12, confirmed and not raised again here:** VAP-05 (V12 §3.7.8's
registrants), VAP-08 (T-V11-12 … -31 name their base bars), VAP-25 (C1b's exit), EL-07 (V12's population range against
its village rungs), EL-09 (`ColumnSpec.range` required for numeric columns), VAP-15 (§16 and INDEX §1 prices for V11),
V09-HIST-1 (V09's `history.defaultAgeYears`, which VV1112-15 generalises).

## 6. Issues

Each: id · severity · kind · owning unit — the defect, then the exact required change.

### VV1112-01 · blocker · NUANCE-LOST · V12

Three decision rows compressed to cite V12 §3.11 lost archived reasons and a rejected alternative that appear nowhere else in V12 (the rewrite report claims 'every alternative ("over …") and every reason ("because …") is kept'): J-V12.77 drops its amendment's second alternative and reason — a named `measure` entry whose cells no run may name takes the cells row for its seat's stated tuning and its line's hand fallback 'over forbidding V03's P6 tuning or routing its fallback through a run §3.7.2 (4) refuses, because either leaves the seat no legal move and the entry's last cells row disagreeing with the shipped cells'; J-V12.79 drops why the span-rule line's stages run M4, `V4-U3`, `V4-U5` ('since its cells land at M3a and M6-U follows M4'), its '(amended by J-V12.89)' pointing at a row about §16's ordering, not at this reason; J-V12.78 drops the second half of its bare-id reason ('and each of volume 3's steps would have opened a later run of its own') and the consequence 'the volumes' short citations need no edit, since the refusal names the flag'. Principle (9): no reasoned decision is dropped or thinned to meet the shrink goal.

**Required change.** In V12 §9: J-V12.77 ends '…, and no other field moves by the row; a named `measure` entry no run may name takes the same cells row for its owning seat's stated tuning and for its line's hand fallback in the exit's change, over forbidding V03's P6 tuning or routing its fallback through a run V12 §3.7.2 (4) refuses, because either leaves the seat no legal move and the entry's last cells row disagreeing with the shipped cells'; J-V12.79's last clause reads 'the span-rule line's stages run M4, `V4-U3`, `V4-U5`, since its cells land at M3a and M6-U follows M4'; J-V12.78's bare-id clause reads '(volume 3's and volume 5's steps are both P0 – P6, so a bare `P1` names two milestones, and each of volume 3's steps would have opened a later run of its own)' and adds 'the volumes' short citations need no edit, since the refusal names the flag'.

### VV1112-02 · major · F-MISSING · V11

File g item 114 (OWNER RULE, filed 2026-10-03 02:35 UTC, J126) names V11 — 'V11 (the switch rows and their defaults)' — and withdraws the reason-keyed suppression (item 114 (c): 'The reason-keyed suppression that held a deletion forever … is WITHDRAWN'). V11 holds neither part: no table or registry row carries the 'Built by the town' switch rows (one per kind the generator adds that no dossier record binds — raised ways split into viaducts, elevated roads and aqueducts, terrace retaining walls, deck and bridge plots, quay walls with sea gates, the harbour-mouth chain, oases, floating islands and their sky accesses, the underground's optional systems) with their defaults, and V11 §2.10's item-110 pattern row still states 'a structure the user removed stays suppressed whatever the table says (item 110 (b), (f))'. The same pattern row is also ill-formed for its exceptions: the lead says the rows after it 'state only how each differs', yet every exception row restates its whole regenerate cell (the `terrace` row's 'generated RetainingWalls re-derive' contradicts the pattern's 'KEPT and listed' if the cells merge), so the pattern's regenerate clauses apply to no table under the only consistent reading — the archive's `raisedWays` row had carried the suppression clause itself.

**Required change.** In V11: (1) add the switch table — a registry row (e.g. 94 `builtByTown`, rows home V11 §3.24.0 or a new V11 §3.27) whose rows are the item-114 kinds, each with `on` as its default (the kind's current behaviour, so a document that never touches the list is byte-identical: the item's no-op pin), its readers the stages that build the kind, `calibratable: false`, map-side (§7.6's settings layers, never the dossier), plus W row, lifecycle row and T-V11 clause (every kind the enumeration lists has a row; defaults reproduce the base); (2) in V11 §2.10 replace 'a structure the user removed stays suppressed whatever the table says (item 110 (b), (f))' by item 114 (c)'s rule: 'a deleted generated structure stays removed while the town is unchanged (a plain Regenerate, a reload) and lapses at the next change that re-reads its kind (an epoch, a New random over it, a Re-derive of its stage); it counts against no cap; a kind switched off is never built (item 114)', and state that rule in the `raisedWays` exception row (the `water` row inheriting it by 'as `raisedWays`'); (3) the lead reads 'a cell an exception row fills replaces the pattern's cell; an empty cell takes the pattern's'.

### VV1112-03 · major · WIRING · V11

The evidence file's producer and its type disagree, leaving an input unproduced. V12 §2.10 (the home of `EvidenceFile`, wiring W-IF-04/05) types `dist/evidence.json` as `{ entries: Record<CalibrationEntry.id, { method; due; against; history (its last three rows); rows }>; cells: Record<cellRef, { status; lines; entry?; ownerRule? }> }`, and V09 §4.14's cell inspector and V10 §2.13's provenance answer read each entry's method, what it is measured against, its due and its latest history from `entries`. V11 §3.2.1 step 7 — the only writer ('written by V11's compiler') — still writes the archive's shape: '`dist/evidence.json` in V12 §2.10's shape (`{ "<cell ref>": { status, lines } }` …)', with no `entries` block, no `entry` link and no `ownerRule` field, so the two readers' entry summary is produced by no one (V12's cross-part note 4 to V11: 'the compiler writes `EvidenceFile` with its `entries`').

**Required change.** V11 §3.2.1 step 7 reads '… and `dist/evidence.json` as V12 §2.10's `EvidenceFile` — `entries` (one per register entry: its method, due, what it is measured against, its last three history rows and its row count) and `cells` (per cell its status word, one plain line per cited evidence id from its run's or panel's summary, the covering entry and, for a stamped cell, `ownerRule`) — within V12 §6's 200 kB'; W25's consumed-by cell names 'the tables editor's cell inspector (V09 §4.14) and the clerk's provenance answer (V10 §2.13), through `entries` and `cells`'.

### VV1112-04 · major · F-MISSING · V12

File g item 114 (OWNER RULE, J126) names V12 — 'V12 (the bars)' — with item 114 (e)'s bars, and withdraws the reason-keyed suppression that V12 still builds on. V12 carries no item-114 bar, no register line and no `NoOpPin` for the switch list (V12 §3.6b, §3.7.8, §3.11 and §7 hold none), and its text contradicts item 114 (c): V12 §4.1's bullet '**A suppression holds** … A table release or a historical pack never re-opens a raised way the user removed. The suppression is keyed to its reason …', its test T-V12-40 ('**A suppression holds.** … leaves no raised way at that reason … the fates list names the held suppression'), V12 §1's item-110 list ('a suppression holding (§13.2's T110-3 …)') and W5's T-V12-40 entry in V12 §8.

**Required change.** In V12: (1) add item 114 (e)'s bars as V12 specs on the step runner and register lines — a kind switched off: none of it over the calibration seeds at every rung and every epoch; switched back on: it returns at the next derivation; a delete then a plain Regenerate: byte-identical and still absent; a delete then one epoch: the generator may rebuild it and the deleted one counts against no cap; a dossier-bound instance survives every switch; the switches never reach the dossier; every row at its default byte-identical to the base (a `NoOpPin` `item114.switches` in V12 §3.7.8's pin table with its base bar); an older document's suppression records migrate as plain deletions that lapse at the next change — with a T-V12 test and a §8 slot; (2) rewrite V12 §4.1's bullet as 'A deletion is for now: a table release or a historical pack applied while the town is otherwise unchanged keeps a deleted generated raised way absent (the apply is not a change that re-reads the kind); a kind switched off stays off across every release and pack (the switch is a map setting, item 114 (b))', and T-V12-40 to assert exactly that, its fates naming the deletion and the switch; (3) V12 §1's list reads '… within the cap, a deletion holding while the town is unchanged and the item-114 switches (§13.2's T110-3, T114 bars …)'.

### VV1112-05 · major · CONFLICT · V12

V12 §3.7.8's pin table restates each owner item's off form (E-20 requires 'the off values cited at their homes, never restated') and its restatements disagree with the home, V11 §3.24.0's off-form table: `item103.coverage` gives 'the coverage weight 0' where V11 §3.24.0 also zeroes `coverage.rosterWeight`; `item111.water` gives 'the oasis chance, the water pull and item 102's climate cell at their neutral values' where V11 §3.24.0 also sets every `aridChance` to 1, `wellYieldWeight` 0 and `wellCoverageFactor` 1; `item107.balance` cites 'V11 §3.7.4's off form for item 107's cells' with 'the spacing radii 0' where V11 §3.24.0 pins items 105 and 107 together by `web.off`; `item109.underground` cites V11 §3.23 where the off form is V11 §3.23.9. Rule 1 below the table and V12 §2.13's `NoOpPin.overlay` comment still read 'V11 §3.24.0 … for item 110; V11 §3.7.4 for items 105 and 107; the cells §13.2's bar names otherwise', though V11 §3.24.0 now holds every owner item's off form.

**Required change.** In V12 §3.7.8's table the off-form column reads, for every row, 'V11 §3.24.0's row for item <n>' (item 110's four pins: 'V11 §3.24.0's switch table, one row set per family'), with no paraphrase of the cells; rule 1 reads '"Off" is the item's off form — each value stated only in V11 §3.24.0's off-form table …'; V12 §2.13's `overlay` comment reads '// the family's off form, V11 §3.24.0's row for the item — copied by the build, stated nowhere here'.

### VV1112-06 · major · CHANGED · pipeline

The class mix's sunlit prestige weight changed value. The archive's only statement of it is V11 §3.3.5: '`roster.classMix` gains the prestige key `sun` … weight 0.15 at full daylight share, read by §4.7 S10b's prime-frontage draw (item 102 (d))'; the pre-coherence base had no `sun` weight. The pipeline rewrite wrote a new value into §10.2's prestige weights ('`sun` 0.3') with the index row J-A102.41 ('the class mix's sunlit term `ClassMixRow.sun` 0.3'), under WG-PIPE-11, whose ruling covers only the missing `lean_to_shelter` and `cottage` cells; no canon ruling, f item or owner text sets 0.3 (g item 102 (d) names no value). V11 §3.3.5 now states no value and cites §10.2, so the set carries 0.3 where the design had 0.15.

**Required change.** At pipeline: §10.2's prestige weights read '`sun` 0.15' (V11's archived value, item 102 (d)), and J-A102.41's index row and its rationale entry read 'the class mix's sunlit term `ClassMixRow.sun` 0.15'; V11 §3.3.5's citation of §10.2 (registry row 27) stays.

### VV1112-07 · major · CONFLICT · pipeline

Item 102's no-op form disagrees with its own mechanism. The owner's bar (g item 102 (g)): 'With `w_sun` = 0 the field and the town are byte-identical to today's (no-op pin)'; §13.2's T102-1 and V11 §3.24.0's off-form table (item 102: '`prosperity.drivers` `w_sun` 0; every climate row's `sunlight` 1', pin `item102.sun`, V12 §3.7.8) follow it. But §4.7 S10b (3)'s prestige adds 'the sunlit term `ClassMixRow.sun × (1 − shade)` … `sun` × the climate row's sunlight cell, 0 in the parity presets' — a term not scaled by `w_sun`, so with `w_sun` 0 and `ClassMixRow.sun` at its default the largest classes still take the sunnier prime frontages and the town is not byte-identical: the pin T102-1 fails at M2b, or the off form is wrong.

**Required change.** At pipeline §4.7 S10b (3): the sunlit term reads '`ClassMixRow.sun × (1 − shade)`, read only while `w_sun` > 0 (item 102 (g): `w_sun` 0 makes the town byte-identical), × the climate row's sunlight cell, 0 in the parity presets', so V11 §3.24.0's item-102 off form, T102-1 and V12's `item102.sun` pin stand as written.

### VV1112-08 · major · CONFLICT · V04

One value, two records and two names: the undercity's void-source rank (item 109 (e)) is the base's `UndercityRule.sourceRank` (II.7.5, l. 18762, 18889; registry row 59), whose values V11 §3.23.6 states once ('`UndercityRule.sourceRank`, II.7.5 — the cell V04 §2.3 reads as `RuinRule.sourceWeight`'), but V04 declares and reads a second field `RuinRule.sourceWeight` (V04 l. 673, 700, 1127, 1299, 1892, 3045; registry row 58a, `under.ruin`) for the same rank. Two cells in two tables can be edited apart, so the base's undercity source choice and V04's capacity ranking can read different ranks (V11's cross-part note 1; the Assemble seat left it unplaced).

**Required change.** At V04: drop `sourceWeight` from `RuinRule` (V04 §2.3, l. 673) and read `UndercityRule.sourceRank` (II.7.5; registry row 59) at l. 700, 1127, 1299, 1892 and in the `under.ruin` register line of l. 3045 (the line moving to row 59's cell); then V11 §3.23.6 drops 'the cell V04 §2.3 reads as `RuinRule.sourceWeight`'.

### VV1112-09 · minor · WIRING · V11

Registry row 43 (`climate`) names S3 as the water pull's reader ('S3 (the water pull `w_water`, `pullRadiusM`)') but not S5b, although the base has every S5b re-settle the one travel-cost field `T` incrementally with S3 (6)'s water pull in each new edge's cost (§4.4 S5a: 'both times the slope term and S3 (6)'s water pull … each S5b's new main roads re-settle `T` incrementally'), and S3 recomputes `T` after its L0 batch when a moat was carved. Under V11 §3.1's rule that a read is recorded under the StageId of the stage function that reads it, T-V11-1 (b)'s recorded reads tag S5b's read of `w_water` and `pullRadiusM`, which the row does not list (the same gap row 3 and rows 49–92 avoid for S4's router by naming S5b beside S4).

**Required change.** Registry row 43's readers read '… S3 and S5b (the water pull `w_water`, `pullRadiusM`: S3's field and each S5b's incremental re-settle of it, §4.4 S5a) …'; W79's consumed-by cell names 'S3's and S5b's water pull'.

### VV1112-10 · minor · BROKEN-REFERENCE · V11

Two pointers name a subsection that does not exist: V11 §2.10's climate row ('absent from a pinned set: the neutral values of V11 §3.17.3 (no oasis, no pull, `sunlight` 1)', l. 745) and V11 §3.2.1 step 4's preset check ('the off forms of items 111 and 113 (V11 §3.17.3, §3.25.1)', l. 983); V11 §3.17 holds only §3.17.1 (climate rows, with item 111's cells and their off form) and §3.17.2 (land use), and item 111's off form is V11 §3.24.0's row.

**Required change.** Both read 'V11 §3.24.0' for item 111's off form (l. 745: 'the off form of V11 §3.24.0 (no oasis, no pull, `sunlight` 1)'; l. 983: 'the off forms of items 111 and 113 (V11 §3.24.0; V11 §3.17.1, V11 §3.25.1)').

### VV1112-11 · minor · BROKEN-REFERENCE · V11

Bare self-references resolve to unrelated base sections under the set's citation rule (canon S7: a volume writes 'Vnn §x.y' everywhere, self-references included; a bare § is the base): V11 §3.26's mechanism column '(§3.1, §3.2)', '(§2.3)', '(§2.4, §3.3)', '(§3.4, §3.5)', '(§3.6)', '(§3.7)', '(§3.8)', '(§3.9, §3.10)', '(§3.11, §3.12)', '(§3.13)', '(§3.14)', '(§3.16)', '(§3.17)', '(§3.18)', '(§3.19)', '(§3.20)', '(§3.21)', '(§3.22)', '(§3.23)', '(§3.24)', '(§3.25)' (l. 4146–4166) and its combination row '§3.18's structures row' (l. 4179) mean V11's sections but read as the base's kernel §3.x and model §2.x; likewise J-V11.84 '(§2.1; §3.1's preamble; §8's readers paragraph)', J-V11.89 '(§2.2, §3.1 row 73, §3.2.1 step 4, §3.2.2, §8, …)', J-V11.91 '(§2.1, §2.2, §3.2.1 step 4, §3.2.2, T-V11-9, item 581)' and J-V11.93 '§3.5's nine class tables'.

**Required change.** Prefix each with 'V11 ' (V11 §3.1, V11 §3.2, V11 §2.3, … V11 §3.25 in V11 §3.26's first column; 'V11 §3.18's structures row'; J-V11.84 '(V11 §2.1; V11 §3.1's preamble; V11 §8's readers paragraph)'; J-V11.89 '(V11 §2.2, V11 §3.1 row 73, V11 §3.2.1 step 4, V11 §3.2.2, V11 §8, …)'; J-V11.91 '(V11 §2.1, V11 §2.2, V11 §3.2.1 step 4, V11 §3.2.2, …)'; J-V11.93 'V11 §3.5's nine class tables').

### VV1112-12 · minor · TERM · V11

V11 cites in list continuations — a volume prefix followed by bare sections ('V11 §3.3, §3.4, §3.7, §3.8, §3.12', 'V04 §2.3, §3.5.1', 'V11 §3.20.5 (sizes and rules), §3.20.6 (plan and bars)', 'V11 §3.18's structures block and §3.24.2's rows') — 151 bare continuations (102 of V11's own sections, 49 of other volumes'), several of them made by the rewrite from fully prefixed lists (archive §1: 'V11 §3.3, V11 §3.4, V11 §3.7–V11 §3.8'). Canon S7 (G-cite) gives one citation form, 'Vnn §x.y' everywhere with a bare § meaning the base, and the set's other verifiers hold continuations to it (V09-REF-1); the rewrite's own note 15 records that the checks read these as base pointers.

**Required change.** Prefix every continuation with its volume (e.g. 'V11 §3.3, V11 §3.4, V11 §3.7, V11 §3.8, V11 §3.12'; 'V04 §2.3, V04 §3.5.1'), so every bare § in V11 is a base section.

### VV1112-13 · minor · COHESION · V11

V11 §8's paragraph *The register at every exit* lists the content milestones whose exit includes `plat calibrate register --check` green as 'C1, C2, C3, C3b, C4, C5, C7, C8', but the table's C1b (item 111's rows) and C9 (item 113's rows) exits also read 'the register green (below)', and their cells are calibratable (V11 §3.17.1, §3.25: 'provisional, their entries V12 §3.11's register').

**Required change.** The paragraph reads 'Each content milestone's exit — C1, C1b, C2, C3, C3b, C4, C5, C7, C8, C9 — includes `plat calibrate register --check` green over the tables it lands'.

### VV1112-14 · minor · WIRING · V11

Registry row 59 (`undercity`, `under.systems`, `under.links`) names as its rows home only 'II.7.5, II.7.6; the two cells V11 §3.23', but the systems' `params` entries are written in V04 §2.3 (the `buried` system's `formerStoreyMinM2` 120, `formerWallCm` 150, `formerGateM2` 40, `formerMinGalleryM` 12, `formerRiseCmPerCentury` 60, `formerRiseMaxCm` 900, the `dug` system's `digGridCm`, `digMaxGrade`, `rockCost`, and the other kinds' keys, V04 l. 600–616), which V04 §3.5.5 (b) reads for the buried former settlement — the single-source home V11 §3.1's *rows home* column must name (V04's cross-part note 11 to V11: 'registry row 59 buried params carry V04 former* keys').

**Required change.** Registry row 59's rows home reads 'II.7.5, II.7.6; the systems' `params` entries V04 §2.3 (the `buried` system's `former*` keys among them, read by V04 §3.5.5 (b)); the two cells V11 §3.23'.

### VV1112-15 · minor · TERM · V11

One cell, two names: V11 §3.25.1 defines the history cells in the named row `settings` (and V11 §3.24.0 writes `history.settings.replay`, V10 cites 'V11's `history.settings` `burialYears`'), while V11's own T-V11-21 and V11 §3.1's notes write `history.replay`, and the base (§4.11: `history.burialYears`, `history.epochYears`, `history.reuseCost`, `history.symbolicQuantile`), V04 (5 × `history.burialYears`), V06 (`history.epochYears`, `history.burialYears`, `history.defaultAgeYears`, `history.symbolicQuantile`, `history.reuseCost`), V07 and V09 write the short form; no name map ties them (V11 has one for item 110's prose names, V11 §3.24.2's 'A prose name … resolves to these cells (T-V11-1 (a))').

**Required change.** V11 §3.25.1 adds, after its table: 'A prose name `history.<cell>` (`history.replay`, `history.epochYears`, `history.symbolicQuantile`, `history.defaultAgeYears`, `history.burialYears`, `history.burialFactor`, `history.burialBoundsYears`, `history.reuseCost`) resolves to the cell of `history.settings` (T-V11-1 (a)'s name map)', and T-V11-1 (a)'s name map lists them.

### VV1112-16 · minor · BROKEN-REFERENCE · V11

V11 §10b's X-V11-7 row closes the deck fallback constants at 'V02 §3.16 (2)'; V02 §3.16's item (2) is 'The row', and the stand-ins `deck.fallbackM2` and `deck.fallbackFloors' read only while V11's `deck` table is unregistered are its item (3) ('The budget and the storeys … The stand-ins (X-V11-7)'), as V02's cross-part note 12 to V11 states.

**Required change.** X-V11-7's 'closed at' cell reads 'V02 §3.16 (3)'.

### VV1112-17 · minor · WIRING · V11

Two registry rows omit the clerk as a reader of cells it reads: V10 §3.9b's water answers read the climate row's `w_water`, pull radius and `sunlight` cell (V10 l. 1794–1802, 'the climate row's `w_water` and pull radius (V11 §3.17.1)'), but registry row 43's readers name no module; V10's buried-town line reads `history.settings`' `burialYears` (V10 l. 1756), while registry row 92 lists `@plat/clerk` only for 'the rows' `says`'. V11 §3.1 makes the readers column the one statement of a table's readers (E-34) and requires a module reader outside the stage graph by its module id.

**Required change.** Registry row 43's readers add 'modules: `@plat/clerk` (V10 §3.9b's water answers: `w_water`, `pullRadiusM`, `sunlight`, the oasis chance)'; row 92's `@plat/clerk` entry reads '(V10's story lines read the rows' `says`; V10 §3.9b's buried-town line reads `burialYears`)'.

### VV1112-18 · minor · ID · V11

Two decision rows cite seam-critique decisions kept only in the validation records: J-V11.58 '… one key holding two rows cannot compile (J-SS.2)' and J-V11.59 '… the town watch builds the posts (J-SS.3)'. J-SS.2 and J-SS.3 are decisions of docs/volumes/critique/seam-settlements-r0.md (a review record), not of the set; canon S9 sends seam and critique ids out of the normative text, and principle (4) wants every cited decision id defined in the set.

**Required change.** Drop '(J-SS.2)' from J-V11.58 and '(J-SS.3)' from J-V11.59 (their reasons are stated in the rows).

### VV1112-19 · minor · CONFLICT · V11

V11 restates the item-110 pin's registrants as a partial list that disagrees with their home, V12 §3.7.8's pin table (V01's T-V1-4 (e), V02's T-V2-50, V03's T-V3-34, V04's T-V4-69, V05's T-V5-15, V06's T-V6-65, V07's T-V7-52, V11's T-V11-31, V12's K1 and K2): V11 §3.24.0 says 'T-V11-31, the no-op pin every volume's item-110 pin cites: V02's T-V2-50, V06's T-V6-65, V07's village pin', and W61 names 'the `NoOpPin`s T-V2-50, T-V4-69, T-V5-15, T-V6-65, V07's village pin (V12 §3.7.8)' — both omitting V01's T-V1-4 (e) and V03's T-V3-34 and naming V07's pin by no id.

**Required change.** V11 §3.24.0 reads '… byte-identical to the goldens without item 110 (T-V11-31, registered on V12 §3.7.8's engine with every volume's item-110 pin, its table listing them)'; W61's consumed-by cell reads 'every item-110 reader's no-op path; T-V11-31 and the other volumes' `item110.*` pins (V12 §3.7.8's table)'.

### VV1112-20 · minor · COHESION · V12

V12 names V11's content steps without the two the rewrite added. V12 §2.8's *Milestone ids* lists 'Volume 11's content steps C0 – C8 … C0 `M0`, C1 `M1`, C2 `M2b`, C3 and C3b `M3a`, C4's wall rows `M2b` …, C5 …, C6 `M4`, C7 `M4b`, C8 `M6-U`', and V12 §3.11's *Items 109 – 113 by column* gives the item-111 cells to 'C1 for `climate`'s first cells and the item-111 cells of each step that lands them (M1, M2b)' and item 113's rows to 'the seat landing the history rows … with M6-E'; V11 §8 lands item 111's rows as C1b (M1 and M2b) and item 113's as C9 (M6-E, with V06's E9).

**Required change.** V12 §2.8 reads 'Volume 11's content steps C0 – C9 … C1 `M1`, C1b `M1` and `M2b`, … C8 `M6-U`, C9 `M6-E`'; V12 §3.11 reads '… C1 for `climate`'s first cells, C1b for the item-111 cells of each step that lands them (M1, M2b), C9 for item 113's history rows (V11 §3.25; M6-E) …'.

### VV1112-21 · minor · TERM · V12

V12 keeps the shorthand 'calibrate-later' (V12 §1 l. 122, §3.7.2 l. 1557, §3.10.8 l. 1963, §3.11 l. 1994, 2158, 2172, T-V12-20 'an `own` calibrate-later cell without an entry fails', V12 §13 l. 2989) for what V11 — the glossary term's home (V11 §3.5.1) — now calls a provisional cell with its register entry (V11-DEFER-2: 'Replace "calibrate-later" by the register form … throughout'), and what V12's own register calls status `provisional`; one concept now has two names across the two volumes.

**Required change.** Replace each 'calibrate-later' in V12 by 'provisional' (e.g. 'every volume's provisional model constant', 'an `own` provisional cell without an entry fails'), the status word of V12 §2.6.

### VV1112-22 · minor · TERM · V12

V12 cites in list continuations — 85 bare sections after a volume prefix (56 of V12's own, e.g. 'V12 §2.1–§2.2, §3.4', 'V12 §3.7.2 (4), §3.7.7, §2.1'; 29 of other volumes', e.g. 'V04 §2.3, §3.5.1') — and once bare alone ('before M1 it is the §6 row's share', V12 §3.4.2 l. 1076, meaning V12 §6), though canon S7 (G-cite) writes 'Vnn §x.y' everywhere and reads a bare § as the base (the rewrite's own closing check: 'every bare §x is a base section').

**Required change.** Prefix every continuation with its volume ('V12 §2.1 – V12 §2.2, V12 §3.4'; 'V12 §3.7.2 (4), V12 §3.7.7, V12 §2.1') and read l. 1076 '… before M1 it is the V12 §6 row's share'.

### VV1112-23 · minor · WIRING · V12

E-35 made V12 §2.11 the one producer/consumer table of every record, its equivalence ticked 'every producer and consumer listed in the source … none lost', but the `CalibrationEntry` row's read cell ('`MilestoneRecord.exitCriteria`; release notes; the register report (V12 §5.2); `dist/evidence.json` (…); the docs') lost two consumers the archive's §1b row for the column-level register entries named: 'the corpus runs' target lists (3.10.5)' — M-CAL's runs take their targets from the register's `corpus` entries due there (V12 §3.11) — and 'the V4-U5 panel's confirmations' — a `panel` stage reads its entry and appends its row (V12 §3.11 *Staged entries*).

**Required change.** V12 §2.11's `CalibrationEntry` read cell adds 'the corpus runs' target lists at M-CAL and each `M-CAL/<layer>` (V12 §3.10.5, from the entries of method `corpus` due there); the panels whose `panel` stages confirm an entry (V12 §3.9, §3.11 *Staged entries*)'.

### VV1112-24 · minor · CONFLICT · pipeline

Base §10.2's *The `drain`, `underground`, `undercity`, `undergroundAccess` and `crypt` columns* restates the access probabilities V11 §3.5.1 states as 'the one statement of these values, which §10.2 and II.7.3 read' — '`undergroundAccess.prob` is … higher for breweries, bathhouses, warehouses and inns (0.15–0.30 by band), low for houses (0.02, raised with the plot's age by II.7.3's age term), 0 for a barracks, a courthouse and a temple' — a second home for V11 cells (canon S2; inventory finding V11-RESTATE-7, whose fix is base-side; V11's cross-part note 5), and a coarser one (V11 also gives the `criminal` and `underground` families 0.3 and every other family 0.05).

**Required change.** At pipeline §10.2 the sentence reads '`undergroundAccess.prob` is, per band row interpolated along the value, the chance that a surface building of the class whose basement reaches an underground element holds an access down to it (II.7.3's *Basement accesses*); its values by family are V11 §3.5.1's rows; a user adds an access to any building by item 66's edit (§7.3 item 9); …' with no numbers.

### VV1112-25 · minor · TERM · model

Base §2.1's unit-vocabulary note still names the two subsets by their old descriptions: 'Volume 11's `ColumnSpec.unit` (V11 §2.1) and volume 12's metric `Unit` (V12 §2.1) are named subsets'. Under E-37 the subsets are named `ContentUnit` (V11 §2.1) and `MetricUnit` (V12 §2.1); 'volume 12's metric `Unit`' now names a type that no longer exists (V12 types `MetricUnit`).

**Required change.** Base §2.1 reads: 'Volume 11's `ContentUnit` (the type of `ColumnSpec.unit`, V11 §2.1) and volume 12's `MetricUnit` (V12 §2.1) are named subsets of this list, each exactly its present set.'

### VV1112-26 · minor · TERM · model

Base §2.7's `Enceinte.underuseSince` comment (l. 2113) reads 'the week the ring's intramural occupied-plot share first fell below V11's contract.occupiedShareMax'; the cell is V06's (V06 §2.2's evolution table, `contract.occupiedShareMax` 0.55, registry row 60; V06 l. 484, 641), as V06's cross-part note 9 records ('contract.occupiedShareMax is V06 §2.2's (evolution.json, V11 row 60) [model's concern]').

**Required change.** Base §2.7 l. 2113 reads '… first fell below V06 §2.2's `contract.occupiedShareMax` (registry row 60) …'.

### VV1112-27 · minor · CONFLICT · scope

Two base judgment-index rows restate V11 cell values that canon S2 keeps at V11's home only ('where another unit restates a V11 cell, it cites the cell … and states no number'): J-DET-20 'New random advances an unchanged scope entity's reroll up to `reroll.maxAdvance` (default 3) times' (the base settings row, V11 §3.1, registry row 93) and J-A112.02 '… fails a legend pair below ΔE2000 8 (`cvd.minDeltaE2000` …)' (V11 §3.1, registry row 52). A later table version of either cell leaves the index stale.

**Required change.** J-DET-20 reads '… up to `reroll.maxAdvance` times (the base settings row, V11 §3.1)'; J-A112.02 reads '… fails a legend pair below the threshold cell `cvd.minDeltaE2000` (registry row 52, V11 §3.1), the contrast matrix's floor for two area fills that meet'.

### VV1112-28 · minor · COHESION · scope

INDEX.md §1's V11 row no longer matches V11 §8: its slot cell reads 'C0–C7 inside M0–M4b; C8 at M6-U; the dossier rows with the SettlementForge stage' and its scope cell lists items 103–110 only, while V11 §8 adds C1b (item 111's rows, at M1 and M2b) and C9 (item 113's rows, at M6-E with V06's E9) and V11 §3.17.1 and §3.25 hold items 111's and 113's rows (the row's price is VAP-15's).

**Required change.** INDEX §1's V11 row: scope cell '… item 110's rows, item 111's dry-country cells, item 113's history rows, naming'; slot cell 'C0–C7 inside M0–M4b (C1b at M1 and M2b); C8 at M6-U; C9 at M6-E; the dossier rows with the SettlementForge stage'.
