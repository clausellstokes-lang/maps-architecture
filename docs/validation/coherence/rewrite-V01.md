# Rewrite — design volume V01 (neighbourhoods)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V01; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V01`, 2026-09-29; continued 2026-09-30)
- P1 inputs gathered (canon unit V01, conflicts, f items concerning V01, g routing (no g 111+ part routed), hand-offs, edges, inventory): done
- P2 new text §0–§1b: done (parts 00-head, 01-scope, 02-wiring)
- P3 new text §2: done (part 03-data)
- P4 new text §3.1–§3.9: done (parts 04-gen-a, 05-gen-b, 06-gen-c)
- P5 new text §3.10–§3.17: done (parts 07-gen-d, 08-gen-e, 09-gen-f)
- P6 new text §3.18 edges: done (part 09b-edges; checked whole on the continuation, three rows added)
- P7 new text §4–§6: done (parts 10-edit, 11-render)
- P8 new text §7–§8: done (parts 12-tests, 13-plan)
- P9 new text §9–§13 and integration notes: done (parts 14-decisions, 15-tail)
- P10 assemble, verify ids and references, sizes: done
- P11 report (mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done

Source: `docs/volumes/V01-neighbourhoods.md` (4 454 lines, 93 140 words, md5 85b488b31b264b447837e4ff228d618c).
Output: `docs/validation/coherence/new/volumes/V01-neighbourhoods.md` (3 441 lines, 75 904 words). Working parts:
`docs/validation/coherence/work/rewrite-V01/parts/` (00-head … 15-tail, assembled in that order).

## Outcome

The volume keeps its title line, its one marker line and its section structure (§0–§13 and the Integration notes), with
one new subsection, **§3.18 Edges**, which defines every UNDEFINED and UNTESTED edge and every combination the edge
catalogue routes here. Every canon routing for V01 is applied: the 57 REFERENCE rows are pointers; §10's 46 request
blocks are one pointer table to the applied f items; the 12 conflicts are resolved as ruled; the 4 wiring gaps, the 15
hand-offs, the 4 agreement disagreements, the 52 open findings, the owner question and the cohesion checks are closed;
E-24 and E-29 are applied with their equivalence lists; the id rulings ID-BCR, ID-WX and ID-DR and the nine glossary
rules are applied. The narration (stacked banners, revision notes, PROGRESS and RECONCILIATION ledgers, per-lane evidence
lists, counterpart logs, the 39 cross-volume notes) is gone; the validation records keep it. §13's Fix list is closed:
no open item.

**Continuation (2026-09-30).** The lane stopped at 2026-09-29 20:10 after writing parts 00–11 and 09b. The saved parts
were checked (each ends cleanly; 09b's edge tables were complete but for three per-mechanism rows, now added); small
repairs were made to the saved parts where the whole-volume checks found them (listed under *Judgment calls* and
*Conflicts*); §7–§13 were written new (parts 12–15); the volume was assembled and verified.

## Sizes (principle (9)'s shrink goal)

| measure | before | after |
|---|---|---|
| words (whitespace tokens, the canon's count) | 93 140 | 75 904 (−18.5 %) |
| bytes | 585 123 (571.4 KB) | 463 678 (452.8 KB) |
| lines | 4 454 | 3 441 |
| the canon's goal band (25–40 %) | — | 55 884–69 855 words |

**Measured by a word-level diff:** 62 466 words kept, **30 674 removed**, **13 433 added** (a reworded span counts as
removed and added). By source (PLAUSIBLE — attributed by reading the diff and the section sizes):

* **Narration ≈ 15 000 removed (49 %):** the eight stacked banners, two revision notes and the PROGRESS ledgers at the
  head (1 894); the eleven reconciliation, counterpart-edit and continuation records after §13 (6 987); the Integration
  notes block (356, folded; a 114-word pointer paragraph kept); §12's per-lane reading lists (≈ 2 500); §13's round
  tallies (≈ 340); the 39 cross-volume notes (≈ 1 600); in-body revision marks and provenance tags (critique, seam, round
  and lane ids; "revised from"; "the first draft's") (≈ 1 300).
* **Restatement ≈ 9 300 removed (30 %):** §10's request blocks, now base text through f items (≈ 8 100); in-body
  restatements of the base and other volumes (the 57 REFERENCE rows; V11's `rampMaxGrade`, `terrace` and `clearanceCm`
  values; `character.anchorSigma`'s value; V04 §3.5.1 (8)'s frozen-complex clause; T-V1-29's budget numbers, which are
  V01 §6's; the barrier-closure seam typing, which is II.1's) (≈ 1 200).
* **Duplicated mechanisms ≈ 800 removed (3 %):** E-24's one mark on J-V1.7, J-V1.36 and J-V1.41 (their amendment
  paragraphs folded into the governing rows); E-29's door helper cited once; V01-DUP-1 – DUP-5; §3.14's two constants
  tables merged.
* **Verbose prose ≈ 5 500 removed (18 %)**, most of it re-added in the new citation form (`V1-3.8.2` → `V01 §3.8.2`,
  `BCR-n` → `item N`), which the diff counts on both sides.

**Added (13 433):** the rewording above (≈ 5 000); §3.18's edges and combinations (3 287); T-V1-55 – T-V1-58 and the
lettered clauses (T-V1-11 (d), T-V1-20 (d) and others) (≈ 900); §10's pointer table (886); wiring, agreement and hand-off
closures in §1b, §2.3, §3.13, §3.17, §4.3, §4.5 and §5.3 (the dossier rows DR29–DR34, `ContextVector`, the failure
table's test column, the three why providers, the skeleton row's `terrace`, the family ids) (≈ 2 300); §11–§13 and the
Integration notes in their new forms (≈ 1 000).

**Why the volume is outside the band (not a defect; principle (9)).** The removable sources are spent: all narration,
every restated base or other-volume fact the canon routed, and the request blocks. What remains is build-depth design
whose every sentence carries a rule, a value, a case, a bar or a reasoned decision: §3 (≈ 35 000 words) is the stage's
mechanisms with their constants and fallbacks; §1b (≈ 3 700) is the wiring table principle (7) requires; §7 (≈ 6 200)
and §9 (≈ 7 700) are the bars and the decisions, which the guard forbids thinning. The pass also had to add content
(§3.18's ≈ 3 300 words of edges, four test suites, the wiring closures), about 5 % of the original. No body section
shrank by more than half; the blocks that did (the narration records, §10 whose content is base text, §12's per-lane
lists) are accounted row by row in the mapping table, so no nuance audit is triggered by a design section.

## Judgment calls (vetoable; say "veto" to flip)

* **J-RV1-1 — the Integration notes section kept as pointers.** The brief says "keep the Integration notes"; the canon
  (ID-WX) says fold each note into the body at its home and keep the ids only in the validation records. Both hold: every
  note's content is at its home, and the section survives as one paragraph naming each J-VI decision the volume carries
  and where it lives (no IN-V01-n id in the text).
* **J-RV1-2 — list citations.** A list "V01 §a, §b" continues the named volume; a base section after a volume one is
  set off by a semicolon ("V01 §8.1; §13.3"). The one list that mixed the two was re-punctuated. Every pointer resolves
  (*Scripted checks*).
* **J-RV1-3 — four new test rows.** The edges part named T-V1-55 (the lifecycle round trip), T-V1-56 (the edge suite by
  §3.18 (e)'s rows), T-V1-57 (the rung sweep) and T-V1-58 (item 111's oasis and the map frame against stage 2); §7 defines
  them, W11 carries them inside its estimate (no price moves), and §16's M5 row should read T-V1-1 – T-V1-58 (cross-part
  note). T-V1-11 and T-V1-20 are lettered so the failure table's test column (W-TEST-01) cites clauses (d); T-V1-4,
  T-V1-21, T-V1-26 and T-V1-33 are lettered for readability, no clause changed. T-V1-37 gains the family-id clause
  (V10-XAGREE-2), T-V1-53 the hinterland deck owner (§3.18 (e)'s deck row), T-V1-9 names the `stepped` row's contour and
  ravine faces that §8.4 (10) already routed to its bar.
* **J-RV1-4 — §6's medium standalone count.** §6 read "≈ 750 buildings" where the size chip `size.medium` (V01 §3.14)
  and T-V1-20 read 700: an internal inconsistency; §6 now cites `size.medium`, the constant's home governing.
* **J-RV1-5 — seam decision ids out of §9.** J-V1.75 and J-V1.91 cited J-S23… seam decisions beside the reasons they
  record; like every other seam and round id in the body, they are process provenance and stay in the validation records
  (the ids resolve there: `docs/volumes/critique/seam-stage2-3-r*.md`).
* **J-RV1-6 — canon ids out of the design text.** "(MC-11)" and "(E-29's shared door helper)" in the saved parts now read
  "(§2.5, item 505)" and "V03 §3.7.1's one door helper"; canon ids stay in the validation records.
* **J-RV1-7 — the §7.6 citation of the `NG` kind.** §3.15 cites "§7.6" for the zeroing preset where the source read
  "§7.6 as file f items 376–377 extend it"; with file f applied the base section is the home.
* **J-RV1-8 — `V02 X24` out of the text.** §5.1.2 cited volume 2's hand-off row X24 for the stair flight and the stack
  order; hand-off rows close and leave their volumes, so it cites V02 §2.6 and the items (216, 227, 419) instead.

## File f items (68 concerning V01) — cited as base text, never restated

The result's `f_applied` lists these 68; each is cited where the volume reads it (the table at the end of this report).
Four were read but never cited in the body (216, 227, 305, 371 — wing keys, stacked and solid wings, the deck input,
`Basement.access`); they are now cited at V01 §5.1.2 (slot 12's stacks), §1.2 (volume 2's hooks row) and §3.8.2
(step 5). Item 200 (the STAGE 2 row) is read through §10's table only.

## File g items

No g item from 111 onward routes a part to V01 (canon g routing; J122's item 112 names no V01 part). Items 102–110's
neighbourhood parts were already in the volume, each base mechanism cited to its item; item 111 meets stage 2 only as a
combination (the oasis beside a district and beside a terraced ward), now defined in §3.18 (f) and tested by T-V1-58.

## Conflicts resolved (12)

| id | ruling applied | where |
|---|---|---|
| MC-11 | `TypedBoundary` and `FabricStrategyId` declared at base §2.5 (item 505); V01 cites them | V01 §1.2, §2.1 |
| V01-ICONF-1 | n = `tpl.segMin + ⌊(tpl.segSpan + 1) × u⌋`, δ = 2 × `tpl.courseDelta`; no literal repeats a cell | V01 §3.4.3, §3.14 |
| V01-ICONF-2 | `skyDistrictCount`'s formula only in §3.16 (m², ha × 10 000); §3.10.3 step 2 and §3.14 cite it | V01 §3.10.3, §3.14, §3.16 |
| V01-ICONF-3 | J-V1.41 *superseded by J-V1.98*; J-V1.36 *amended by J-V1.77* (E-24's form of the ruling's "superseded in part"); the reasons at the governing rows | V01 §9 |
| V01-ICONF-4 | the soffit bound is item 244's clearance rule (the way's held `clearanceCm` first, else V11's per class) | V01 §3.17.3 (3); T-V1-51 (c) |
| V01-ICONF-5 | the stale stack-door and "whichever lands first" clauses left with §12/§13's narration; J-V1.96, T-V1-26 and items 554, 560 govern | V01 §9, §12, §13 |
| V01-XCONF-1 | every closed cross-volume note left §10; no open wiring remained to cite | V01 §10 |
| V01-XCONF-2 | one VTT rule at §11.1 (items 447, 448): a retaining wall by `vtt.retainingMinCm`, broken over stairs and ramps; supports as cliffs; V01 cites §11.1 | V01 §5.3; T-V1-33 (b) |
| V02-XCONF-1 | V01's side: §3.17.3 (3) cites item 244's clearance rule (V02's side is V02's editor's) | V01 §3.17.3 |
| V10-XAGREE-2 | the why providers push V11's family ids (`sun`; `nuisance` for emitters and the sensitive) | V01 §4.5; T-V1-37 |
| CANON-C03 | §11 is a decisions table: Q-V1-1 answered yes (J122) | V01 §11, §8.4 (6) |
| CANON-C04 | the INDEX §7 items routed here (S23R6-07, SLR6-04) fixed | V01 §0; §10 |

## Open findings closed (52)

| finding | closed by |
|---|---|
| VOL-V01-V02-RESTATEMENTS-001, V01-RESTATE-1 | §1.2's V03 and V02 rows name `stackAccessDoor(b, a)`, `basementDoor(b)`, the church class and `PorchKindRow` and cite V03 §3.7.1–§3.7.2 and V02, no gloss |
| -002, V01-RESTATE-4 | `character.anchorSigma` cited (§4.5) without its value (§3.3.2, §3.14, T-V1-48) |
| -003, -004, V01-RESTATE-2, -3 | V11's `ways.crossing` and `terrace` keys cited without values; the `stepped.minSlope` narration gone (§3.6 (3), §3.14, J-V1.72) |
| -005, V01-RESTATE-5 | `raisedWays.structure.clearanceCm` cited without its values (§3.17.3) |
| -006, V01-DUP-3 | the barrier-closure seam typing stated once at II.1 (item 541); §3.6 (7), §3.11 (4), T-V1-1, T-V1-45 and J-V1.85 cite it |
| V01-DUP-1 | "the underground rows ship none" stated once at §3.8.2; §2.2's `hood.pins` comment cites it; §1.3's copy gone |
| V01-DUP-2 | `street_strip` cites §3.4.3's course law, keeping its own parameters |
| V01-DUP-4 | the `fabric.select` key rule stated at §3.12; §3.3.4 and §2.8 cite it |
| V01-DUP-5 | `terraceState` defined at §2.3; §3.17.1 cites it |
| V01-ICONF-1 – -5, V01-XCONF-1, -2 | as the conflicts table |
| V01-WGAP-1 | §5.3's skeleton row carries a quarter's `terrace` (item 350) and `setAttr` of `terrace` |
| V01-MISSING-1, V01-DEFER-3 | §11: Q-V1-1 answered yes (J122); §8.4 (6) reads the decision |
| V01-TERM-1 | every volume pointer in the `Vnn §x.y` form (G-cite); no `V1-n` form remains |
| V01-TERM-2 | the way state is "stair-stepped"; the row keeps `stepped`; the 8 % threshold's home is the row's cell (§3.3.2), §3.6 (8) cites it |
| V01-TERM-3 | "standalone neighbourhood document" throughout (G-standalone) |
| V01-DEFER-1 | `Sample` has one home, beside `Seam` (item 540); §1.2 cites it without the condition |
| V01-DEFER-2 | §3.17.8 states the adopted terminal rule as decided (J-VI.9) |
| V01-DEFER-4 | §3.15's switch edit cites V04 §4.3's switch row for any change, the ground-edit row inside (0, 1] (the canon's reading; V04's side is a cross-part note) |
| V01-NARR-1 | one marker line |
| V01-NARR-2 | revision notes and ledgers removed; the citations paragraph kept without pass history |
| V01-NARR-3 | §9's rows are current decisions; E-24's one mark where a decision changes another |
| V01-NARR-4 | §10 is a pointer table |
| V01-NARR-5 | the 39 cross-volume notes removed (every destination closed; no open wiring) |
| V01-NARR-6 | IN-V01-4 at §2.3, IN-V01-5 at §3.17.8, IN-V01-6 at §1b (DR26), IN-V01-9 at §3.17.3; one CONFIRMED / PLAUSIBLE pair at §12 |
| V01-BREF-1 | the clerk content cited as V01 §4.5 |
| V01-HANDOFF-1 | DR26 throughout (ID-DR) |
| V01-HANDOFF-2 | §8.2 cites §16's M5 row (item 474) and its totals computed once (item 568) |
| S23R6-07 | §0's plain words name the annex temple's way into its crypt (V03 §3.7.4) |
| SLR6-04 | notes (36) and (39) gone with the notes block |
| V01:IN-V01-1 – IN-V01-9 | each folded at its home; the Integration notes paragraph lists them by J-VI id |

## Hand-offs closed at this destination (15)

| hand-off | closed at |
|---|---|
| V02:X14 | V01 §5.1.2: the NG parity sheet keeps `fakeGablePerWing` from M6a, re-measured on `roofscape` at M6b (switched on a pass, else kept, reported); the hatch program run per roofscape facet; §7's parity paragraph cites it |
| V02:X24 | V01 §5.1.2 slot 12: stack order by `BaseWing.on` (items 227, 419), ties by wing key (item 216); `stairFlight`'s treads by `stairTreads` |
| V02:X31 | V01 §5.1.2's stair-flight hatch reads `stairTreads`; §3.17.3 (2) and §3.17.4 as written |
| V06:X11 | V01 §3.3.6: `hood.fabric` at `afterGrowth`, order 40; the district supply term read at every epoch allocation |
| V06:X16 | V01 §3.3.6 (3), §3.17.4, §3.17.7: the opened close-ups a part in `scope.raised` crosses re-derived; the terrace kind as an elevated road's endpoint (`terraceState(D).asks`); `raised.stripMarginM` |
| V06:X28 | V01 §3.3.6, §3.5.11: `EpochScope.recut` is the participant's S9b input; under a new strip only fabric and hood pins, the clearing V06's; T-V1-39 |
| V06:X40 | V01 §3.10.3 (6) (a) and §6's sky row (met; stated closed at V06) |
| V06:X45 | V01 §3.7.3's epoch clause met by V06 §3.4 (9), cited |
| V10:CVR-V10-6 | V01 §4.5: pushes named by V11's families (`sun`, `nuisance`) |
| V10:CVR-V10-13 | V01 §3.17.1: the terraced-ward kind by name (`fabric: 'stepped'`, `terrace: 'on'`) for the second fixture's ravine quarter; T-V1-54 |
| V11:X-V11-8 | V01 §2.3: `WayNamingContext.raised`; the terrace slope's unit sentence (`slopeMin` a share; V01's percent = 100 × share) read by §3.6 (8) and the `stepped` row |
| V11:X-V11-15 | (d) no change: V11 names `@plat/hood` as a reader of rows 39 and 62; V01 §1b agrees |
| V11:X-V11-16 | (a) no change: `PresetId` gains `'NG'` (V01 §3.15); `hood.constants` one `settings` row (V01 §2.2, §3.14) |
| V12:X-V12-16 | V01 §8.1: each milestone exits with `plat calibrate register --check` green over the cells it lands |
| V12:X-V12-17 | V01 §8.1 and §1b: `plat calibrate register --defaults --milestone <id>` with M1, M2b, M3a or M5 (V12 §2.8); M5's value moves with `--milestone M5` |

## Wiring gaps closed (4)

* **W-DOS-10a** — §1b's dossier trace rows cite DR30 and DR32 (with DR29, DR31, DR33, DR34) by number (item 383's numbering).
* **W-IF-03** — §4.5 states the three providers (`district.terrace`, the ward-edge wall, `district.raised`) as this
  volume's, one provider per kind; V10's owed table is V10's side (cross-part note).
* **W-TEST-01** — §3.13's failure table carries §5.2's test column: F-TEMPLATE → T-V1-9 and the template bars; F-DISPATCH →
  T-V1-11 (d), T-V1-12; F-UNIT → T-V1-20 (d); §7 defines both clauses.
* **V01-WGAP-1** — §5.3's skeleton row carries `terrace` (item 350) and `setAttr` of `terrace`.

## Elegance rulings applied

**E-24 — one mark on a superseded or amended decision.** §9's rows J-V1.7 (*amended by J-V1.40*), J-V1.36 (*amended by
J-V1.77*) and J-V1.41 (*superseded by J-V1.98*) carry one mark each; the inline amendment paragraphs are gone.
Equivalence list: ☑ no row dropped (J-V1.1 – J-V1.101 all present); ☑ the governing row keeps the reason — J-V1.98 opens
with J-V1.41's reason (item 23; the D-5 panel like with like; our rules as declared extensions), J-V1.77 carries the layer
list J-V1.36 fixed, J-V1.40 carries the S10a-hook reason.

**E-29 — one door helper.** §1.2 and §3.8.2 step 5 read `basementDoor(b)` and `stackAccessDoor(b, a)` as V03 §3.7.1's one
helper's two callers. Equivalence list: ☑ `basementDoor`'s three ordered rules, its crypt-vault clause from M6-U and null
unless access is external — read, not restated, and the null case kept (§3.8.2: no rectangle where it is null); ☑
`stackAccessDoor`'s approach-strip clearance, the non-stair wing preference and its reported fallback — V03's, cited; ☑
both pure, draw-free, of eager records, in `@plat/plots` at M3a, read by the entrance reserve (§3.8.2 step 5, §3.8.3's
digest, T-V1-26 (e), (f)).

No unification the canon did not rule was made.

## Edges and combinations (principle (11))

V01 §3.18 defines, for every mechanism of §2–§5, the outcome, the failure rung and the test: four class rules
((a) degenerate geometry through the kernel's refusal and the step's failure class; (b) every rung from THORP to the
METROPOLIS cap, and the standalone document's `contextRung`; (c) every toggle and preset; (d) save, load, undo, redo,
regenerate and migrate) and a per-mechanism table (E1 no input, E2 one item, E3 caps, E4 a mechanism's own degenerate
cases, E5 missing or contradictory data) — the catalogue's 133 UNDEFINED and 99 UNTESTED edges, each section covered by
its row or class rule (the continuation added three rows: §3.3.8's unlisted kind, §3.14's constants' range and
lifecycle, §4.3's town of one district). The 15 UNDEFINED combinations V01 owns (cliff, steep ground, coast, moat,
bridge, raised way, oasis, map frame, lock and save-and-load, each against a district or a terraced ward) are §3.18 (f)'s
rows, tested by T-V1-18, -20, -22, -45, -50, -51, -53, -55 and -58. No outcome is a crash, hang, lost data, silent wrong
result or whole-map retry.

## Agreement disagreements (4)

`BCR-V9-31` with V09 (V01-XCONF-2: §11.1's one rule, cited); `WhyPull` with V10 (V10-XAGREE-2: V11's family ids at the
producer); `FabricStrategyId` and `TypedBoundary` with model (MC-11: declared at §2.5, cited).

## Id rulings and renumberings

| ruling | applied |
|---|---|
| ID-BCR | V01's bare `BCR-n` → `BCR-V1-n` (§10's table keeps each id); the body cites the applied f item (`item N`) instead |
| ID-DR | `DR-V1.1` → DR26; the body cites DR26 and DR29–DR34 by number |
| ID-WX | no IN-V01-n id in the text (folded; the pointer paragraph cites J-VI ids); no other volume's W/X/H row cited (`V02 X24` → V02 §2.6) |
| new ids | T-V1-55 – T-V1-58 (none collides: V01's tests were T-V1-1 – T-V1-54); no decision id added or renumbered |

**Terms replaced (the nine glossary rules):** G-lot (plot), G-refview (reference viewport), G-firstmap (first map),
G-cite (`Vnn §x.y`), G-stairway (stair-stepped way; the row keeps `stepped`), G-standalone (standalone neighbourhood
document), G-unitinput (`SkyUnitInput`), G-DR (DR26–DR35), G-geojson (`retaining` per run, `raisedSupport` per support) —
0 retired forms remain (grep).

## Owner question

Q-V1-1 — answered: yes (J122); §11 is a decisions table; no J121 subject arises in this volume.

## Cohesion checks

* §8 agrees with INDEX §3/§4 and §16: M5, after M4, beside V-M1 – V-M4, M6-E and P0/P1/P3; M6 after it, M6-U after it or
  beside it with a second pair (U3 and U4 then waiting on W15); 27.25–36.25 pw (§16's M5 row; item 474); the totals
  §16's (item 568).
* §11 marks the one owner question answered (J122).
* §1b names each piece's producer and consumer; every hand-off it lists is closed at its destination.
* One marker line; no stacked banners, ledgers or reconciliation records.
* The one context vector: `DistrictContext` is named as the district-level view over §2.5's `ContextVector` (CO-11).

## Scripted checks

* **References:** every `V01 §x.y` resolves to a heading of the new volume; every `Vnn §x.y` to a heading or numbered
  paragraph of that volume as landed; every bare `§x.y` and `II.x` to the base (with the rewritten parts under
  `docs/validation/coherence/new/base/`); the residual matches are research-file sections (`code-neighbourhood.md` §2.0,
  §2.11) and line-wrapped list continuations. CONFIRMED by script.
* **Ids:** T-V1-1 – T-V1-58 each defined once in §7, every cited one defined; J-V1.1 – J-V1.101 each once in §9; every
  cited T-Vn, J-Vn, J-VI, J-A / J-P / D- / J12x and DR id exists in its home; every `item N` lies in 1–113 or 200–585.
  CONFIRMED by script.
* **Numbers:** every numeric value of the original §0–§9 appears in the new text except V11's clearance values (cited,
  RESTATE-5) and the superseded price totals of the old J-V1.26 and J-V1.51 (narration). CONFIRMED by script.
* **Retired terms and narration markers:** 0 hits for every retired form and for critique, seam, round and lane ids in
  the body; 0 canon ids in the design text. CONFIRMED by grep.
* **`docs/validation/bench/doc_checks.py`** on the new volume (heads `docs/ARCHITECTURE.md`): *WARNING: reference corpus
  INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room
  results are NOT authoritative.* C1 0, C2 0, C3 451 hits (418 unreviewed; the original volume 465 / 423 — common
  phrases and section-number runs), C4 2 (0 unreviewed), S1 0, S2 246 (the volume's own `V01 §` pointers checked against
  the base's headings; the original 129). Provisional; to be re-run on the machine that holds the corpus.

## Cross-part notes (what another unit must change; not edited here)

* **scope (§16):** the M5 row's bar list reads "V01 §7's bars at M5 (T-V1-1 – T-V1-58)" — four new suites (lifecycle,
  edges, rungs, item 111 and the frame), priced inside W11; no estimate moves.
* **V04 (§4.3, §3.10):** the switch row covers **any** change of the resolved `fabric.extensionWeight` (across 0 the
  opening places made or retired; inside (0, 1] the re-cut plots take the ground-edit row) — the canon's ruling on
  V01-DEFER-4, which V01 §3.15 cites.
* **V09:** cite §11.1's one VTT rule (retaining walls at `vtt.retainingMinCm`, broken over stairs and ramps; supports as
  cliffs) in place of BCR-V9-31 (c)'s unthresholded clause (V01-XCONF-2).
* **rendering (§11.1):** holds that one rule (items 447, 448), its threshold the VTT settings cell `vtt.retainingMinCm`.
* **V10:** §2.13 drops the family translation note (V01 pushes `sun` and `nuisance`; CVR-V10-6 met); §3.9's owed table
  lists V01 §4.5's three providers (`district.terrace`, the ward-edge wall, `district.raised`) as V01's (W-IF-03).
* **V02 (§3.17 (b)):** the soffit bound over a crossed way is item 244's clearance rule, the way's held `clearanceCm`
  first (V02-XCONF-1); X14, X24 and X31 are closed at V01 §5.1.2.
* **V05:** V01 reads the island's inputs as `SkyUnitInput` (G-unitinput) at §3.10.3 and §8.3.
* **model (§2.5):** declares `TypedBoundary`, `FabricStrategyId`, `BlockKind`, `SquareType` and `SeamRun` (MC-11, item
  505), which V01 §2.1 cites.
* **V03 (§3.7.1):** states the one door helper both door functions call (E-29); V01 cites it.
* **INDEX:** §3/§4's V01 row agrees with V01 §8.1 as written; §6 records Q-V1-1 answered yes (J122).

## CONFIRMED versus PLAUSIBLE

CONFIRMED (read on disk in this lane or its first run): the source volume whole; the canon's V01 unit, its conflicts,
id, wiring and elegance rulings, glossary and cohesion checks; `edges.md`'s V01 rows and combinations; `agreement.json`'s
15 hand-offs (the long ones read at their source volumes); the inventory's 650 V01 ids; the f items concerning V01
(titles, and texts where cited); the rewritten base §16 and INDEX §4; V11 §2.2's `ColumnSpec`; V12 §2.8 and §3.11's
`--milestone` rule; every saved part of this lane; the scripted checks above. PLAUSIBLE: the attribution of removed and
added words to sources; that the volumes whose sections V01 cites keep those section numbers through their own rewrites
(their editors renumber nothing the canon did not rule).

## File f items — where this volume cites each (68)

| f item | where this volume cites it (base text; never restated) |
|---|---|
| 200 | V01 §10 |
| 207 | V01 §2.2, V01 §3.7.3, V01 §10 |
| 210 | V01 §2.2, V01 §2.7, V01 §10 |
| 211 | V01 §1b, V01 §2.2, V01 §3.17.1, V01 §8.1, V01 §9, V01 §10 |
| 213 | V01 §3.1, V01 §3.10.3 |
| 216 | V01 §5.1.3 |
| 227 | V01 §5.1.3 |
| 238 | V01 §3.7.1, V01 §3.8.2 |
| 241 | V01 §3.8.2 |
| 242 | V01 §1b |
| 244 | V01 §1.2, V01 §1b, V01 §2.3, V01 §3.17, V01 §3.17.3, V01 §3.17.8, V01 §7 … |
| 245 | V01 §1.2, V01 §1b, V01 §2.3, V01 §2.7, V01 §3.5.12, V01 §3.17, V01 §3.17.2 … |
| 246 | V01 §1.2, V01 §1b, V01 §3.17, V01 §3.17.6 |
| 251 | V01 §3.17.7 |
| 260 | V01 §1.2, V01 §3.17.5, V01 §4.1 |
| 270 | V01 §1b, V01 §4.5 |
| 272 | V01 §1b, V01 §2.6, V01 §3.8.6, V01 §4, V01 §4.1, V01 §4.2, V01 §10 |
| 280 | V01 §1.2, V01 §3.1, V01 §3.10, V01 §10 |
| 282 | V01 §3.1 |
| 284 | V01 §3.5.9, V01 §8.2, V01 §8.4, V01 §10 |
| 285 | V01 §2.1, V01 §3.10.2, V01 §3.14, V01 §10 |
| 290 | V01 §1.2, V01 §3.17, V01 §3.17.1, V01 §3.17.3, V01 §3.17.4, V01 §3.18, V01 §10 |
| 294 | V01 §3.2, V01 §3.3.7, V01 §10 |
| 298 | V01 §3.4, V01 §3.6, V01 §10 |
| 300 | V01 §3.5.1, V01 §3.5.10, V01 §10 |
| 301 | V01 §1b, V01 §2.2, V01 §3.5.2, V01 §8.1, V01 §8.3, V01 §9, V01 §10 |
| 302 | V01 §1.2, V01 §1b, V01 §2.3, V01 §2.7, V01 §2.8, V01 §3.4.3, V01 §3.6 … |
| 303 | V01 §3.7.1, V01 §3.8.2 |
| 305 | V01 §1.2 |
| 308 | V01 §3.10.3 |
| 309 | V01 §1b, V01 §3.10.3, V01 §8.2 |
| 313 | V01 §1b, V01 §2.7, V01 §3.4.5, V01 §3.5.7, V01 §3.5.10, V01 §3.10.3, V01 §3.14 … |
| 323 | V01 §3.1, V01 §8.1, V01 §10 |
| 327 | V01 §3.13, V01 §10 |
| 340 | V01 §2.8, V01 §3.12, V01 §9, V01 §10 |
| 345 | V01 §2.8, V01 §3.12, V01 §8.1, V01 §9, V01 §10 |
| 349 | V01 §1b, V01 §2.7, V01 §3.3.1, V01 §3.10.4, V01 §3.17.1, V01 §4.1, V01 §4.2 … |
| 350 | V01 §1b, V01 §2.7, V01 §3.10.4, V01 §3.17.1, V01 §4.2, V01 §4.4, V01 §5.3 … |
| 369 | V01 §2.7, V01 §3.7.3, V01 §3.9, V01 §3.11, V01 §4.1, V01 §7, V01 §10 |
| 371 | V01 §3.8.2 |
| 373 | V01 §4.4, V01 §10 |
| 384 | V01 §1b, V01 §10 |
| 405 | V01 §5.1, V01 §10 |
| 406 | V01 §1b, V01 §5.1.1 |
| 417 | V01 §5.1.1, V01 §10 |
| 419 | V01 §1b, V01 §5.1.3 |
| 421 | V01 §3.8.5, V01 §4.1, V01 §10 |
| 422 | V01 §3.7.1, V01 §5.2.2, V01 §10 |
| 444 | V01 §3.7.1, V01 §3.7.2, V01 §3.7.4, V01 §10 |
| 448 | V01 §1.2, V01 §1b, V01 §5.3, V01 §7, V01 §8.2, V01 §10 |
| 474 | V01 §1b, V01 §6, V01 §8.2, V01 §9, V01 §10 |
| 498 | V01 §7, V01 §9, V01 §10 |
| 505 | V01 §1.2, V01 §2.1, V01 §8.3, V01 §10, V01 §12 |
| 506 | V01 §1.2, V01 §1b, V01 §3.17.1, V01 §8.1, V01 §8.3, V01 §9 |
| 523 | V01 §7, V01 §10 |
| 539 | V01 §1.2, V01 §2.4, V01 §3.11, V01 §9, V01 §10 |
| 540 | V01 §1.2, V01 §10 |
| 541 | V01 §1.2, V01 §1b, V01 §3.3.2, V01 §3.6, V01 §3.11, V01 §7, V01 §8.2 … |
| 542 | V01 §2.2, V01 §3.4.7, V01 §9, V01 §10 |
| 543 | V01 §3.4.4, V01 §3.14, V01 §7, V01 §9, V01 §10 |
| 544 | V01 §3.5.5, V01 §10 |
| 545 | V01 §3.8.6, V01 §3.9, V01 §10 |
| 554 | V01 §1.2, V01 §3.7.1, V01 §3.8.8, V01 §10 |
| 560 | V01 §3.7.1, V01 §10 |
| 568 | V01 §8.2, V01 §10 |
| 578 | V01 §3.8.2 |
| 580 | V01 §1b, V01 §3.10.3, V01 §8.2, V01 §10 |
| 584 | V01 §1.1, V01 §1b, V01 §9, V01 §10 |

## Mapping table — every inventory id of V01 (650)

482 facts stated in place, 57 restatements now pointers, 46 requests now §10's pointers to f items, 32 hook and plan rows
kept, 24 defined terms kept (one name each), 7 hand-off rows closed at their destinations, 2 history items to the
validation records. Unmapped: 0.

| inventory id | kind | old § | where it now lives |
|---|---|---|---|
| V01-0001 | summary | 0 | V01 §0 |
| V01-0002 | summary | 0 | V01 §0 |
| V01-0003 | summary | 0 | V01 §0 |
| V01-0004 | summary | 0 | V01 §0 |
| V01-0005 | summary | 0 | V01 §0 |
| V01-0006 | summary | 0 | V01 §0 |
| V01-0007 | scope | 1.1 | V01 §1.1 |
| V01-0008 | scope | 1.1 | V01 §1.1 |
| V01-0009 | scope | 1.1 | V01 §1.1 |
| V01-0010 | scope | 1.1 | V01 §1.1 |
| V01-0011 | scope | 1.1 | V01 §1.1 |
| V01-0012 | scope | 1.1 | V01 §1.1 |
| V01-0013 | scope | 1.1 | V01 §1.1 |
| V01-0014 | scope | 1.1 | V01 §1.1 |
| V01-0015 | scope | 1.1 | V01 §1.1 |
| V01-0016 | scope | 1.1 | V01 §1.1 |
| V01-0017 | scope | 1.1 | V01 §1.1 |
| V01-0018 | scope | 1.1 | V01 §1.1 |
| V01-0019 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0020 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0021 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0022 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0023 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0024 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0025 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0026 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0027 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0028 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0029 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0030 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0031 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0032 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0033 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0034 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0035 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0036 | hook | 1.2 | V01 §1.2 |
| V01-0037 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0038 | hook | 1.2 | V01 §1.2 |
| V01-0039 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0040 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0041 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0042 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0043 | hook | 1.2 | V01 §1.2 (row kept) |
| V01-0044 | hook | 1.2 | V01 §1.2 |
| V01-0045 | scope-out | 1.3 | V01 §1.3 (row kept) |
| V01-0046 | scope-out | 1.3 | V01 §1.3 (row kept) |
| V01-0047 | scope-out | 1.3 | V01 §1.3 (row kept) |
| V01-0048 | scope-out | 1.3 | V01 §1.3 (row kept) |
| V01-0049 | scope-out | 1.3 | V01 §1.3 (row kept) |
| V01-0050 | wiring | 1b | V01 §1b |
| V01-0051 | wiring | 1b | V01 §1b |
| V01-0052 | wiring | 1b | V01 §1b |
| V01-0053 | wiring | 1b | V01 §1b |
| V01-0054 | wiring | 1b | V01 §1b |
| V01-0055 | wiring | 1b | V01 §1b |
| V01-0056 | wiring | 1b | V01 §1b |
| V01-0057 | wiring | 1b | V01 §1b |
| V01-0058 | wiring | 1b | V01 §1b |
| V01-0059 | wiring | 1b | V01 §1b |
| V01-0060 | wiring | 1b | V01 §1b |
| V01-0061 | wiring | 1b | V01 §1b |
| V01-0062 | wiring | 1b | V01 §1b |
| V01-0063 | wiring | 1b | V01 §1b |
| V01-0064 | wiring | 1b | V01 §1b |
| V01-0065 | wiring | 1b | V01 §1b |
| V01-0066 | wiring | 1b | V01 §1b |
| V01-0067 | wiring | 1b | V01 §1b |
| V01-0068 | wiring | 1b | V01 §1b |
| V01-0069 | wiring | 1b | V01 §1b |
| V01-0070 | wiring | 1b | V01 §1b |
| V01-0071 | wiring | 1b | V01 §1b |
| V01-0072 | wiring | 1b | V01 §1b |
| V01-0073 | wiring | 1b | V01 §1b |
| V01-0074 | wiring | 1b | V01 §1b |
| V01-0075 | wiring | 1b | V01 §1b |
| V01-0076 | wiring | 1b | V01 §1b |
| V01-0077 | wiring | 1b | V01 §1b |
| V01-0078 | wiring | 1b | V01 §1b |
| V01-0079 | wiring | 1b | V01 §1b |
| V01-0080 | wiring | 1b | V01 §1b |
| V01-0081 | wiring | 1b | V01 §1b |
| V01-0082 | wiring | 1b | V01 §1b |
| V01-0083 | wiring | 1b | V01 §1b |
| V01-0084 | wiring | 1b | V01 §1b |
| V01-0085 | wiring | 1b | V01 §1b |
| V01-0086 | wiring | 1b | V01 §1b |
| V01-0087 | wiring | 1b | V01 §1b |
| V01-0088 | wiring | 1b | V01 §1b |
| V01-0089 | wiring | 1b | V01 §1b |
| V01-0090 | wiring | 1b | V01 §1b |
| V01-0091 | wiring | 1b | V01 §1b |
| V01-0092 | wiring | 1b | V01 §1b |
| V01-0093 | wiring | 1b | V01 §1b |
| V01-0094 | wiring | 1b | V01 §1b |
| V01-0095 | wiring | 1b | V01 §1b |
| V01-0096 | wiring | 1b | V01 §1b |
| V01-0097 | wiring | 1b | V01 §1b |
| V01-0098 | wiring | 1b | V01 §1b |
| V01-0099 | wiring | 1b | V01 §1b |
| V01-0100 | wiring | 1b | V01 §1b |
| V01-0101 | wiring | 1b | V01 §1b |
| V01-0102 | wiring | 1b | V01 §1b |
| V01-0103 | wiring | 1b | V01 §1b |
| V01-0104 | wiring | 1b | V01 §1b |
| V01-0105 | wiring | 1b | V01 §1b |
| V01-0106 | wiring | 1b | V01 §1b |
| V01-0107 | wiring | 1b | V01 §1b |
| V01-0108 | wiring | 1b | V01 §1b |
| V01-0109 | wiring | 1b | V01 §1b |
| V01-0110 | wiring | 1b | V01 §1b |
| V01-0111 | wiring | 1b | V01 §1b |
| V01-0112 | wiring | 1b | V01 §1b |
| V01-0113 | wiring | 1b | V01 §1b |
| V01-0114 | wiring | 1b | V01 §1b |
| V01-0115 | wiring | 1b | V01 §1b |
| V01-0116 | wiring | 1b | V01 §1b |
| V01-0117 | dossier | 1b | V01 §1b |
| V01-0118 | dossier | 1b | V01 §1b |
| V01-0119 | dossier | 1b | V01 §1b |
| V01-0120 | dossier | 1b | V01 §1b |
| V01-0121 | dossier | 1b | V01 §1b |
| V01-0122 | dossier | 1b | V01 §1b |
| V01-0123 | dossier | 1b | V01 §1b |
| V01-0124 | dossier | 1b | V01 §1b |
| V01-0125 | dossier | 1b | V01 §1b |
| V01-0126 | dossier | 1b | V01 §1b |
| V01-0127 | dossier | 1b | V01 §1b |
| V01-0128 | dossier | 1b | V01 §1b |
| V01-0129 | dossier | 1b | V01 §1b |
| V01-0130 | dossier | 1b | V01 §1b |
| V01-0131 | rule | 2 | V01 §2, stated as a pointer to base §2.1 |
| V01-0132 | type | 2.1 | V01 §2.1 |
| V01-0133 | type | 2.1 | V01 §2.1, stated as a pointer to base §4.2 |
| V01-0134 | type | 2.1 | V01 §2.1 |
| V01-0135 | type | 2.1 | V01 §2.1 |
| V01-0136 | type | 2.1 | V01 §2.1 |
| V01-0137 | rule | 2.2 | V01 §2.2 |
| V01-0138 | rule | 2.2 | V01 §2.2 |
| V01-0139 | record | 2.2 | V01 §2.2 |
| V01-0140 | interface | 2.2 | V01 §2.2 |
| V01-0141 | type | 2.2 | V01 §2.2 |
| V01-0142 | type | 2.2 | V01 §2.2 |
| V01-0143 | type | 2.2 | V01 §2.2 |
| V01-0144 | type | 2.2 | V01 §2.2 |
| V01-0145 | record | 2.2 | V01 §2.2, stated as a pointer to base §4.5 S7b (3) and §4.7 S9 (item 301) |
| V01-0146 | record | 2.2 | V01 §2.2 |
| V01-0147 | record | 2.2 | V01 §2.2 |
| V01-0148 | record | 2.2 | V01 §2.2 |
| V01-0149 | record | 2.2 | V01 §2.2 |
| V01-0150 | record | 2.2 | V01 §2.2 |
| V01-0151 | record | 2.2 | V01 §2.2 |
| V01-0152 | record | 2.2 | V01 §2.2, stated as a pointer to base §2.5 |
| V01-0153 | record | 2.2 | V01 §2.2, stated as a pointer to base §2.5 |
| V01-0154 | record | 2.2 | V01 §2.2, stated as a pointer to base §2.7 |
| V01-0155 | rule | 2.2 | V01 §2.2, stated as a pointer to base §2.5 |
| V01-0156 | record | 2.3 | V01 §2.3 |
| V01-0157 | record | 2.3 | V01 §2.3 |
| V01-0158 | record | 2.3 | V01 §2.3 |
| V01-0159 | record | 2.3 | V01 §2.3 |
| V01-0160 | record | 2.3 | V01 §2.3 |
| V01-0161 | record | 2.3 | V01 §2.3 |
| V01-0162 | record | 2.3 | V01 §2.3 |
| V01-0163 | record | 2.3 | V01 §2.3 |
| V01-0164 | record | 2.3 | V01 §2.3, stated as a pointer to V12 §3.4 |
| V01-0165 | interface | 2.3 | V01 §2.3 |
| V01-0166 | record | 2.3 | V01 §2.3 |
| V01-0167 | record | 2.3 | V01 §2.3 |
| V01-0168 | interface | 2.3 | V01 §2.3 |
| V01-0169 | rule | 2.3 | V01 §2.3 |
| V01-0170 | table | 2.3 | V01 §2.3 |
| V01-0171 | rule | 2.3 | V01 §2.3, stated as a pointer to V02 §3.16 |
| V01-0172 | record | 2.4 | V01 §2.4, stated as a pointer to II.1 |
| V01-0173 | rule | 2.4 | V01 §2.4 |
| V01-0174 | record | 2.4 | V01 §2.4, stated as a pointer to II.1 |
| V01-0175 | record | 2.4 | V01 §2.4, stated as a pointer to II.1 |
| V01-0176 | rule | 2.4 | V01 §2.4 |
| V01-0177 | record | 2.5 | V01 §2.5 |
| V01-0178 | rule | 2.5 | V01 §2.5 |
| V01-0179 | record | 2.6 | V01 §2.6, stated as a pointer to base §2.9 |
| V01-0180 | rule | 2.6 | V01 §2.6 |
| V01-0181 | lifecycle | 2.7 | V01 §2.7 |
| V01-0182 | lifecycle | 2.7 | V01 §2.7 |
| V01-0183 | lifecycle | 2.7 | V01 §2.7 |
| V01-0184 | lifecycle | 2.7 | V01 §2.7 |
| V01-0185 | lifecycle | 2.7 | V01 §2.7 |
| V01-0186 | lifecycle | 2.7 | V01 §2.7 |
| V01-0187 | lifecycle | 2.7 | V01 §2.7 |
| V01-0188 | lifecycle | 2.7 | V01 §2.7 |
| V01-0189 | lifecycle | 2.7 | V01 §2.7 |
| V01-0190 | lifecycle | 2.7 | V01 §2.7 |
| V01-0191 | lifecycle | 2.7 | V01 §2.7, stated as a pointer to base §7.3 |
| V01-0192 | lifecycle | 2.7 | V01 §2.7 |
| V01-0193 | lifecycle | 2.7 | V01 §2.7 |
| V01-0194 | lifecycle | 2.7 | V01 §2.7 |
| V01-0195 | rule | 2.7 | V01 §2.7 |
| V01-0196 | identity | 2.8 | V01 §2.8 |
| V01-0197 | identity | 2.8 | V01 §2.8 |
| V01-0198 | identity | 2.8 | V01 §2.8 |
| V01-0199 | identity | 2.8 | V01 §2.8 |
| V01-0200 | step | 3.1 | V01 §3.1 |
| V01-0201 | rule | 3.1 | V01 §3.1, stated as a pointer to base §4.12 |
| V01-0202 | interface | 3.1 | V01 §3.1 |
| V01-0203 | interface | 3.1 | V01 §3.1 |
| V01-0204 | rule | 3.1 | V01 §3.1 |
| V01-0205 | rule | 3.2 | V01 §3.2 |
| V01-0206 | rule | 3.2 | V01 §3.2 |
| V01-0207 | rule | 3.2 | V01 §3.2 |
| V01-0208 | rule | 3.2 | V01 §3.2 |
| V01-0209 | test | 3.2 | V01 §3.2 |
| V01-0210 | step | 3.3.1 | V01 §3.3.1 |
| V01-0211 | rule | 3.3.2 | V01 §3.3.2 |
| V01-0212 | table | 3.3.2 | V01 §3.3.2 |
| V01-0213 | rule | 3.3.2 | V01 §3.3.2 |
| V01-0214 | rule | 3.3.3 | V01 §3.3.3 |
| V01-0215 | rule | 3.3.3 | V01 §3.3.3 |
| V01-0216 | rule | 3.3.3 | V01 §3.3.3 |
| V01-0217 | table | 3.3.3 | V01 §3.3.3 |
| V01-0218 | test | 3.3.3 | V01 §3.3.3 |
| V01-0219 | rule | 3.3.4 | V01 §3.3.4 |
| V01-0220 | rule | 3.3.5 | V01 §3.3.5 |
| V01-0221 | rule | 3.3.6 | V01 §3.3.6 |
| V01-0222 | rule | 3.3.7 | V01 §3.3.7 |
| V01-0223 | rule | 3.3.7 | V01 §3.3.7, stated as a pointer to base §4.5 |
| V01-0224 | rule | 3.3.7 | V01 §3.3.7 |
| V01-0225 | rule | 3.3.7 | V01 §3.3.7 |
| V01-0226 | table | 3.3.8 | V01 §3.3.8 |
| V01-0227 | rule | 3.4 | V01 §3.4 |
| V01-0228 | rule | 3.4.1 | V01 §3.4.1 |
| V01-0229 | rule | 3.4.2 | V01 §3.4.2 |
| V01-0230 | rule | 3.4.2 | V01 §3.4.2 |
| V01-0231 | rule | 3.4.2 | V01 §3.4.2 |
| V01-0232 | rule | 3.4.2 | V01 §3.4.2 |
| V01-0233 | rule | 3.4.2 | V01 §3.4.2 |
| V01-0234 | rule | 3.4.2 | V01 §3.4.2 |
| V01-0235 | mechanism | 3.4.3 | V01 §3.4.3 |
| V01-0236 | mechanism | 3.4.3 | V01 §3.4.3 |
| V01-0237 | mechanism | 3.4.3 | V01 §3.4.3 |
| V01-0238 | mechanism | 3.4.3 | V01 §3.4.3 |
| V01-0239 | mechanism | 3.4.4 | V01 §3.4.4, stated as a pointer to II.2 |
| V01-0240 | mechanism | 3.4.4 | V01 §3.4.4 |
| V01-0241 | mechanism | 3.4.4 | V01 §3.4.4 |
| V01-0242 | mechanism | 3.4.4 | V01 §3.4.4 |
| V01-0243 | mechanism | 3.4.4 | V01 §3.4.4 |
| V01-0244 | mechanism | 3.4.5 | V01 §3.4.5 |
| V01-0245 | mechanism | 3.4.5 | V01 §3.4.5 |
| V01-0246 | mechanism | 3.4.5 | V01 §3.4.5 |
| V01-0247 | mechanism | 3.4.5 | V01 §3.4.5 |
| V01-0248 | mechanism | 3.4.6 | V01 §3.4.6 |
| V01-0249 | table | 3.4.7 | V01 §3.4.7 |
| V01-0250 | decision | 3.4.7 | V01 §3.4.7 |
| V01-0251 | rule | 3.4.8 | V01 §3.4.8 |
| V01-0252 | step | 3.5.1 | V01 §3.5.1 |
| V01-0253 | rule | 3.5.1 | V01 §3.5.1 |
| V01-0254 | rule | 3.5.1 | V01 §3.5.1 |
| V01-0255 | rule | 3.5.2 | V01 §3.5.2 |
| V01-0256 | rule | 3.5.2 | V01 §3.5.2 |
| V01-0257 | rule | 3.5.2 | V01 §3.5.2 |
| V01-0258 | rule | 3.5.3 | V01 §3.5.3 |
| V01-0259 | rule | 3.5.3 | V01 §3.5.3 |
| V01-0260 | rule | 3.5.3 | V01 §3.5.3 |
| V01-0261 | rule | 3.5.4 | V01 §3.5.4 |
| V01-0262 | rule | 3.5.5 | V01 §3.5.5 |
| V01-0263 | rule | 3.5.5 | V01 §3.5.5 |
| V01-0264 | rule | 3.5.5 | V01 §3.5.5 |
| V01-0265 | rule | 3.5.6 | V01 §3.5.6 |
| V01-0266 | rule | 3.5.6 | V01 §3.5.6 |
| V01-0267 | rule | 3.5.7 | V01 §3.5.7, stated as a pointer to base §4.9 |
| V01-0268 | rule | 3.5.8 | V01 §3.5.8 |
| V01-0269 | rule | 3.5.9 | V01 §3.5.9, stated as a pointer to base §4.2 |
| V01-0270 | test | 3.5.9 | V01 §3.5.9 |
| V01-0271 | table | 3.5.10 | V01 §3.5.10 |
| V01-0272 | table | 3.5.10 | V01 §3.5.10 |
| V01-0273 | fallback | 3.5.10 | V01 §3.5.10 |
| V01-0274 | rule | 3.5.11 | V01 §3.5.11, stated as a pointer to V06 §3.2's epoch step table |
| V01-0275 | rule | 3.5.12 | V01 §3.5.12 |
| V01-0276 | rule | 3.5.12 | V01 §3.5.12 |
| V01-0277 | rule | 3.6 | V01 §3.6 |
| V01-0278 | rule | 3.6 | V01 §3.6 |
| V01-0279 | rule | 3.6 | V01 §3.6 |
| V01-0280 | rule | 3.6 | V01 §3.6 |
| V01-0281 | rule | 3.6 | V01 §3.6, stated as a pointer to II.1 |
| V01-0282 | rule | 3.6 | V01 §3.6 |
| V01-0283 | step | 3.7.1 | V01 §3.7.1 |
| V01-0284 | rule | 3.7.1 | V01 §3.7.1 |
| V01-0285 | rule | 3.7.1 | V01 §3.7.1 |
| V01-0286 | rule | 3.7.1 | V01 §3.7.1 |
| V01-0287 | rule | 3.7.1 | V01 §3.7.1 |
| V01-0288 | rule | 3.7.2 | V01 §3.7.2 |
| V01-0289 | rule | 3.7.2 | V01 §3.7.2 |
| V01-0290 | rule | 3.7.3 | V01 §3.7.3 |
| V01-0291 | rule | 3.7.4 | V01 §3.7.4 |
| V01-0292 | rule | 3.8.1 | V01 §3.8.1, stated as a pointer to base §4.1 |
| V01-0293 | step | 3.8.2 | V01 §3.8.2 |
| V01-0294 | step | 3.8.2 | V01 §3.8.2 |
| V01-0295 | step | 3.8.2 | V01 §3.8.2, stated as a pointer to II.3 |
| V01-0296 | step | 3.8.2 | V01 §3.8.2 |
| V01-0297 | mechanism | 3.8.2 | V01 §3.8.2 |
| V01-0298 | test | 3.8.2 | V01 §3.8.2 |
| V01-0299 | table | 3.8.2 | V01 §3.8.2 |
| V01-0300 | test | 3.8.2 | V01 §3.8.2 |
| V01-0301 | mechanism | 3.8.3 | V01 §3.8.3 |
| V01-0302 | rule | 3.8.4 | V01 §3.8.4 |
| V01-0303 | rule | 3.8.5 | V01 §3.8.5, stated as a pointer to base §8.10 |
| V01-0304 | rule | 3.8.6 | V01 §3.8.6, stated as a pointer to II.4 |
| V01-0305 | rule | 3.8.7 | V01 §3.8.7, stated as a pointer to base §9.5 |
| V01-0306 | rule | 3.8.8 | V01 §3.8.8 |
| V01-0307 | rule | 3.8.8 | V01 §3.8.8 |
| V01-0308 | rule | 3.8.8 | V01 §3.8.8 |
| V01-0309 | interface | 3.8.8 | V01 §3.8.8 |
| V01-0310 | mechanism | 3.8.9 | V01 §3.8.9 |
| V01-0311 | rule | 3.9 | V01 §3.9 |
| V01-0312 | rule | 3.9 | V01 §3.9 |
| V01-0313 | rule | 3.9 | V01 §3.9 |
| V01-0314 | rule | 3.9 | V01 §3.9 |
| V01-0315 | rule | 3.10 | V01 §3.10, stated as a pointer to II.1 |
| V01-0316 | step | 3.10.1 | V01 §3.10.1 |
| V01-0317 | step | 3.10.1 | V01 §3.10.1 |
| V01-0318 | step | 3.10.1 | V01 §3.10.1 |
| V01-0319 | step | 3.10.1 | V01 §3.10.1 |
| V01-0320 | step | 3.10.1 | V01 §3.10.1 |
| V01-0321 | step | 3.10.1 | V01 §3.10.1 |
| V01-0322 | step | 3.10.1 | V01 §3.10.1 |
| V01-0323 | rule | 3.10.1 | V01 §3.10.1 |
| V01-0324 | mechanism | 3.10.2 | V01 §3.10.2 |
| V01-0325 | mechanism | 3.10.2 | V01 §3.10.2 |
| V01-0326 | step | 3.10.3 | V01 §3.10.3 |
| V01-0327 | step | 3.10.3 | V01 §3.10.3 |
| V01-0328 | step | 3.10.3 | V01 §3.10.3, stated as a pointer to base §4.2 |
| V01-0329 | step | 3.10.3 | V01 §3.10.3 |
| V01-0330 | rule | 3.10.3 | V01 §3.10.3 |
| V01-0331 | mechanism | 3.10.3 | V01 §3.10.3 |
| V01-0332 | step | 3.10.3 | V01 §3.10.3 |
| V01-0333 | rule | 3.10.3 | V01 §3.10.3 |
| V01-0334 | rule | 3.10.3 | V01 §3.10.3 |
| V01-0335 | rule | 3.10.3 | V01 §3.10.3 |
| V01-0336 | rule | 3.10.3 | V01 §3.10.3 |
| V01-0337 | rule | 3.10.3 | V01 §3.10.3 |
| V01-0338 | rule | 3.10.4 | V01 §3.10.4 |
| V01-0339 | rule | 3.11 | V01 §3.11, stated as a pointer to II.1 |
| V01-0340 | rule | 3.11 | V01 §3.11, stated as a pointer to II.1 |
| V01-0341 | rule | 3.11 | V01 §3.11, stated as a pointer to II.1 |
| V01-0342 | rule | 3.11 | V01 §3.11 |
| V01-0343 | rule | 3.11 | V01 §3.11 |
| V01-0344 | rule | 3.12 | V01 §3.12, stated as a pointer to base §6.1 |
| V01-0345 | rule | 3.12 | V01 §3.12 |
| V01-0346 | rule | 3.12 | V01 §3.12 |
| V01-0347 | fallback | 3.13 | V01 §3.13, stated as a pointer to base §5.2 |
| V01-0348 | fallback | 3.13 | V01 §3.13, stated as a pointer to base §5.2 |
| V01-0349 | rule | 3.13 | V01 §3.13, stated as a pointer to base §5 |
| V01-0350 | rule | 3.14 | V01 §3.14 |
| V01-0351 | constant | 3.14 | V01 §3.14 |
| V01-0352 | constant | 3.14 | V01 §3.14, stated as a pointer to V11's rows by key (`ways.crossing`, `terrace`, `raisedWays.structure`, `aqueduct.terminal`), values not restated |
| V01-0353 | constant | 3.14 | V01 §3.14 |
| V01-0354 | constant | 3.14 | V01 §3.14 |
| V01-0355 | constant | 3.14 | V01 §3.14 |
| V01-0356 | constant | 3.14 | V01 §3.14 |
| V01-0357 | constant | 3.14 | V01 §3.14 |
| V01-0358 | decision | 3.15 | V01 §3.15 |
| V01-0359 | rule | 3.15 | V01 §3.15, stated as a pointer to base §7.6 |
| V01-0360 | rule | 3.15 | V01 §3.15 |
| V01-0361 | rule | 3.15 | V01 §3.15 |
| V01-0362 | rule | 3.15 | V01 §3.15 |
| V01-0363 | table | 3.15 | V01 §3.15 |
| V01-0364 | interface | 3.16 | V01 §3.16 |
| V01-0365 | interface | 3.16 | V01 §3.16 |
| V01-0366 | interface | 3.16 | V01 §3.16 |
| V01-0367 | interface | 3.16 | V01 §3.16 |
| V01-0368 | rule | 3.17 | V01 §3.17, stated as a pointer to base §2.7, §4.3, §4.7 (items 244, 245, 246, 290, 302) |
| V01-0369 | rule | 3.17.1 | V01 §3.17.1 |
| V01-0370 | rule | 3.17.1 | V01 §3.17.1, stated as a pointer to base §4.7 (item 302) |
| V01-0371 | rule | 3.17.2 | V01 §3.17.2 |
| V01-0372 | rule | 3.17.3 | V01 §3.17.3 |
| V01-0373 | rule | 3.17.3 | V01 §3.17.3 |
| V01-0374 | rule | 3.17.4 | V01 §3.17.4 |
| V01-0375 | rule | 3.17.5 | V01 §3.17.5 |
| V01-0376 | rule | 3.17.6 | V01 §3.17.6 |
| V01-0377 | rule | 3.17.7 | V01 §3.17.7 |
| V01-0378 | rule | 3.17.8 | V01 §3.17.8 |
| V01-0379 | rule | 4 | V01 §4, stated as a pointer to base §7.1 |
| V01-0380 | edit | 4.1 | V01 §4.1 |
| V01-0381 | edit | 4.1 | V01 §4.1 |
| V01-0382 | edit | 4.1 | V01 §4.1 |
| V01-0383 | edit | 4.1 | V01 §4.1 |
| V01-0384 | edit | 4.1 | V01 §4.1 |
| V01-0385 | edit | 4.1 | V01 §4.1 |
| V01-0386 | rule | 4.1 | V01 §4.1 |
| V01-0387 | interface | 4.2 | V01 §4.2, stated as a pointer to base §7.1 |
| V01-0388 | rule | 4.3 | V01 §4.3, stated as a pointer to base §7.3 |
| V01-0389 | lifecycle | 4.4 | V01 §4.4, stated as a pointer to base §7.4 |
| V01-0390 | lifecycle | 4.4 | V01 §4.4, stated as a pointer to base §7.4 |
| V01-0391 | interface | 4.5 | V01 §4.5, stated as a pointer to V10 §2.13 |
| V01-0392 | interface | 4.5 | V01 §4.5 |
| V01-0393 | rule | 4.6 | V01 §4.6, stated as a pointer to base §11.3 |
| V01-0394 | rule | 5.1 | V01 §5.1, stated as a pointer to base §8.2 |
| V01-0395 | table | 5.1.1 | V01 §5.1.1 |
| V01-0396 | rule | 5.1.1 | V01 §5.1.1 |
| V01-0397 | mechanism | 5.1.2 | V01 §5.1.2 |
| V01-0398 | mechanism | 5.1.2 | V01 §5.1.2 |
| V01-0399 | mechanism | 5.1.2 | V01 §5.1.2 |
| V01-0400 | mechanism | 5.1.2 | V01 §5.1.2, stated as a pointer to V02 §2.6 |
| V01-0401 | mechanism | 5.1.2 | V01 §5.1.2 |
| V01-0402 | mechanism | 5.1.2 | V01 §5.1.2 |
| V01-0403 | mechanism | 5.1.2 | V01 §5.1.2 |
| V01-0404 | mechanism | 5.1.2 | V01 §5.1.2 |
| V01-0405 | mechanism | 5.1.2 | V01 §5.1.2 |
| V01-0406 | table | 5.1.3 | V01 §5.1.3 |
| V01-0407 | rule | 5.1.3 | V01 §5.1.3 |
| V01-0408 | rule | 5.1.4 | V01 §5.1.4, stated as a pointer to base §8.4 |
| V01-0409 | mechanism | 5.1.5 | V01 §5.1.5 |
| V01-0410 | rule | 5.1.6 | V01 §5.1.6, stated as a pointer to base §8.2 |
| V01-0411 | test | 5.1.7 | V01 §5.1.7, stated as a pointer to base §8.2 |
| V01-0412 | rule | 5.2.1 | V01 §5.2.1, stated as a pointer to base §9.5 |
| V01-0413 | rule | 5.2.2 | V01 §5.2.2, stated as a pointer to base §9 |
| V01-0414 | rule | 5.2.3 | V01 §5.2.3, stated as a pointer to base §9.3 |
| V01-0415 | table | 5.3 | V01 §5.3, stated as a pointer to base §11.1 |
| V01-0416 | table | 5.3 | V01 §5.3, stated as a pointer to base §11.1 |
| V01-0417 | budget | 6 | V01 §6 |
| V01-0418 | budget | 6 | V01 §6 |
| V01-0419 | budget | 6 | V01 §6 |
| V01-0420 | budget | 6 | V01 §6 |
| V01-0421 | budget | 6 | V01 §6 |
| V01-0422 | rule | 7 | V01 §7, stated as a pointer to base §13 |
| V01-0423 | test | 7 | V01 §7 T-V1-1 |
| V01-0424 | test | 7 | V01 §7 T-V1-3 |
| V01-0425 | test | 7 | V01 §7 T-V1-4 |
| V01-0426 | test | 7 | V01 §7 T-V1-5 |
| V01-0427 | test | 7 | V01 §7 T-V1-7 |
| V01-0428 | test | 7 | V01 §7 T-V1-8 |
| V01-0429 | test | 7 | V01 §7 T-V1-9 |
| V01-0430 | test | 7 | V01 §7 T-V1-10 |
| V01-0431 | test | 7 | V01 §7 T-V1-11 |
| V01-0432 | test | 7 | V01 §7 T-V1-12 |
| V01-0433 | test | 7 | V01 §7 T-V1-13 |
| V01-0434 | test | 7 | V01 §7 T-V1-15 |
| V01-0435 | test | 7 | V01 §7 T-V1-16 |
| V01-0436 | test | 7 | V01 §7 T-V1-18 |
| V01-0437 | test | 7 | V01 §7 T-V1-20 |
| V01-0438 | test | 7 | V01 §7 T-V1-21 |
| V01-0439 | test | 7 | V01 §7 T-V1-21 |
| V01-0440 | test | 7 | V01 §7 T-V1-22 |
| V01-0441 | test | 7 | V01 §7 T-V1-24 |
| V01-0442 | test | 7 | V01 §7 T-V1-26 |
| V01-0443 | test | 7 | V01 §7 T-V1-27 |
| V01-0444 | test | 7 | V01 §7 T-V1-29 |
| V01-0445 | test | 7 | V01 §7 T-V1-31 |
| V01-0446 | test | 7 | V01 §7 T-V1-32 |
| V01-0447 | test | 7 | V01 §7 T-V1-33 |
| V01-0448 | test | 7 | V01 §7 T-V1-34 |
| V01-0449 | test | 7 | V01 §7 T-V1-36 |
| V01-0450 | test | 7 | V01 §7 T-V1-39 |
| V01-0451 | test | 7 | V01 §7 T-V1-42 |
| V01-0452 | test | 7 | V01 §7 T-V1-45 |
| V01-0453 | test | 7 | V01 §7 T-V1-47 |
| V01-0454 | test | 7 | V01 §7 T-V1-50 |
| V01-0455 | test | 7 | V01 §7 T-V1-51 |
| V01-0456 | test | 7 | V01 §7 T-V1-53 |
| V01-0457 | rule | 7 | V01 §5.1.2 (the NG parity sheet's roof construction; V01 §7's parity paragraph cites it) |
| V01-0458 | plan | 8.1 | V01 §8.1 (row kept) |
| V01-0459 | plan | 8.1 | V01 §8.1 |
| V01-0460 | plan | 8.1 | V01 §8.1 (row kept) |
| V01-0461 | plan | 8.1 | V01 §8.1 |
| V01-0462 | plan | 8.2 | V01 §8.2 |
| V01-0463 | plan | 8.2 | V01 §8.2 |
| V01-0464 | plan | 8.2 | V01 §8.2 (row kept) |
| V01-0465 | plan | 8.3 | V01 §8.3 (row kept) |
| V01-0466 | plan | 8.4 | V01 §8.4 |
| V01-0467 | decision | 9 | V01 §9 J-V1.1 |
| V01-0468 | decision | 9 | V01 §9 J-V1.2 |
| V01-0469 | decision | 9 | V01 §9 J-V1.3 |
| V01-0470 | decision | 9 | V01 §9 J-V1.4 |
| V01-0471 | decision | 9 | V01 §9 J-V1.5 |
| V01-0472 | decision | 9 | V01 §9 J-V1.6 |
| V01-0473 | decision | 9 | V01 §9 J-V1.7 (amended by J-V1.40) |
| V01-0474 | decision | 9 | V01 §9 J-V1.8 |
| V01-0475 | decision | 9 | V01 §9 J-V1.9 |
| V01-0476 | decision | 9 | V01 §9 J-V1.10 |
| V01-0477 | decision | 9 | V01 §9 J-V1.11 |
| V01-0478 | decision | 9 | V01 §9 J-V1.12 |
| V01-0479 | decision | 9 | V01 §9 J-V1.13 |
| V01-0480 | decision | 9 | V01 §9 J-V1.14 |
| V01-0481 | decision | 9 | V01 §9 J-V1.15 |
| V01-0482 | decision | 9 | V01 §9 J-V1.16 |
| V01-0483 | decision | 9 | V01 §9 J-V1.17 |
| V01-0484 | decision | 9 | V01 §9 J-V1.18 |
| V01-0485 | decision | 9 | V01 §9 J-V1.19 |
| V01-0486 | decision | 9 | V01 §9 J-V1.20 |
| V01-0487 | decision | 9 | V01 §9 J-V1.21 |
| V01-0488 | decision | 9 | V01 §9 J-V1.22 |
| V01-0489 | decision | 9 | V01 §9 J-V1.23 |
| V01-0490 | decision | 9 | V01 §9 J-V1.24 |
| V01-0491 | decision | 9 | V01 §9 J-V1.25 |
| V01-0492 | decision | 9 | V01 §9 J-V1.26 |
| V01-0493 | decision | 9 | V01 §9 J-V1.27 |
| V01-0494 | decision | 9 | V01 §9 J-V1.28 |
| V01-0495 | decision | 9 | V01 §9 J-V1.29 |
| V01-0496 | decision | 9 | V01 §9 J-V1.30 |
| V01-0497 | decision | 9 | V01 §9 J-V1.31 |
| V01-0498 | decision | 9 | V01 §9 J-V1.32 |
| V01-0499 | decision | 9 | V01 §9 J-V1.33 |
| V01-0500 | decision | 9 | V01 §9 J-V1.34 |
| V01-0501 | decision | 9 | V01 §9 J-V1.35 |
| V01-0502 | decision | 9 | V01 §9 J-V1.36 (amended by J-V1.77) |
| V01-0503 | decision | 9 | V01 §9 J-V1.37 |
| V01-0504 | decision | 9 | V01 §9 J-V1.38 |
| V01-0505 | decision | 9 | V01 §9 J-V1.39 |
| V01-0506 | decision | 9 | V01 §9 J-V1.40 |
| V01-0507 | decision | 9 | V01 §9 J-V1.41 (superseded by J-V1.98) |
| V01-0508 | decision | 9 | V01 §9 J-V1.42 |
| V01-0509 | decision | 9 | V01 §9 J-V1.43 |
| V01-0510 | decision | 9 | V01 §9 J-V1.44 |
| V01-0511 | decision | 9 | V01 §9 J-V1.45 |
| V01-0512 | decision | 9 | V01 §9 J-V1.46 |
| V01-0513 | decision | 9 | V01 §9 J-V1.47 |
| V01-0514 | decision | 9 | V01 §9 J-V1.48 |
| V01-0515 | decision | 9 | V01 §9 J-V1.49 |
| V01-0516 | decision | 9 | V01 §9 J-V1.50 |
| V01-0517 | decision | 9 | V01 §9 J-V1.51 |
| V01-0518 | decision | 9 | V01 §9 J-V1.52 |
| V01-0519 | decision | 9 | V01 §9 J-V1.53 |
| V01-0520 | decision | 9 | V01 §9 J-V1.54 |
| V01-0521 | decision | 9 | V01 §9 J-V1.55 |
| V01-0522 | decision | 9 | V01 §9 J-V1.56 |
| V01-0523 | decision | 9 | V01 §9 J-V1.57 |
| V01-0524 | decision | 9 | V01 §9 J-V1.58 |
| V01-0525 | decision | 9 | V01 §9 J-V1.59 |
| V01-0526 | decision | 9 | V01 §9 J-V1.60 |
| V01-0527 | decision | 9 | V01 §9 J-V1.61 |
| V01-0528 | decision | 9 | V01 §9 J-V1.62 |
| V01-0529 | decision | 9 | V01 §9 J-V1.63 |
| V01-0530 | decision | 9 | V01 §9 J-V1.64 |
| V01-0531 | decision | 9 | V01 §9 J-V1.65 |
| V01-0532 | decision | 9 | V01 §9 J-V1.66 |
| V01-0533 | decision | 9 | V01 §9 J-V1.67 |
| V01-0534 | decision | 9 | V01 §9 J-V1.68 |
| V01-0535 | decision | 9 | V01 §9 J-V1.69 |
| V01-0536 | decision | 9 | V01 §9 J-V1.70 |
| V01-0537 | decision | 9 | V01 §9 J-V1.71 |
| V01-0538 | decision | 9 | V01 §9 J-V1.72 |
| V01-0539 | decision | 9 | V01 §9 J-V1.73 |
| V01-0540 | decision | 9 | V01 §9 J-V1.74 |
| V01-0541 | decision | 9 | V01 §9 J-V1.75 |
| V01-0542 | decision | 9 | V01 §9 J-V1.76 |
| V01-0543 | decision | 9 | V01 §9 J-V1.77 |
| V01-0544 | decision | 9 | V01 §9 J-V1.78 |
| V01-0545 | decision | 9 | V01 §9 J-V1.79 |
| V01-0546 | decision | 9 | V01 §9 J-V1.80 |
| V01-0547 | decision | 9 | V01 §9 J-V1.81 |
| V01-0548 | decision | 9 | V01 §9 J-V1.82 |
| V01-0549 | decision | 9 | V01 §9 J-V1.83 |
| V01-0550 | decision | 9 | V01 §9 J-V1.84 |
| V01-0551 | decision | 9 | V01 §9 J-V1.85 |
| V01-0552 | decision | 9 | V01 §9 J-V1.86 |
| V01-0553 | decision | 9 | V01 §9 J-V1.87 |
| V01-0554 | decision | 9 | V01 §9 J-V1.88 |
| V01-0555 | decision | 9 | V01 §9 J-V1.89 |
| V01-0556 | decision | 9 | V01 §9 J-V1.90 |
| V01-0557 | decision | 9 | V01 §9 J-V1.91 |
| V01-0558 | decision | 9 | V01 §9 J-V1.92 |
| V01-0559 | decision | 9 | V01 §9 J-V1.93 |
| V01-0560 | decision | 9 | V01 §9 J-V1.94 |
| V01-0561 | decision | 9 | V01 §9 J-V1.95 |
| V01-0562 | decision | 9 | V01 §9 J-V1.96 |
| V01-0563 | decision | 9 | V01 §9 J-V1.97 |
| V01-0564 | decision | 9 | V01 §9 J-V1.98 |
| V01-0565 | decision | 9 | V01 §9 J-V1.99 |
| V01-0566 | decision | 9 | V01 §9 J-V1.100 |
| V01-0567 | decision | 9 | V01 §9 J-V1.101 |
| V01-0568 | bcr | 10 | V01 §10 row BCR-V1-1 → f item 505 (base text; the request block replaced by the pointer) |
| V01-0569 | bcr | 10 | V01 §10 row BCR-V1-2 → f item 539 (base text; the request block replaced by the pointer) |
| V01-0570 | bcr | 10 | V01 §10 row BCR-V1-3 → f item 280 (base text; the request block replaced by the pointer) |
| V01-0571 | bcr | 10 | V01 §10 row BCR-V1-4 → f item 294 (base text; the request block replaced by the pointer) |
| V01-0572 | bcr | 10 | V01 §10 row BCR-V1-5 → f item 210 (base text; the request block replaced by the pointer) |
| V01-0573 | bcr | 10 | V01 §10 row BCR-V1-6 → f item 207 (base text; the request block replaced by the pointer) |
| V01-0574 | bcr | 10 | V01 §10 row BCR-V1-7 → f item 298 (base text; the request block replaced by the pointer) |
| V01-0575 | bcr | 10 | V01 §10 row BCR-V1-8 → f item 284 (base text; the request block replaced by the pointer) |
| V01-0576 | bcr | 10 | V01 §10 row BCR-V1-9 → f item 300 (base text; the request block replaced by the pointer) |
| V01-0577 | bcr | 10 | V01 §10 row BCR-V1-10 → f item 313 (base text; the request block replaced by the pointer) |
| V01-0578 | bcr | 10 | V01 §10 row BCR-V1-11 → f item 340 (base text; the request block replaced by the pointer) |
| V01-0579 | bcr | 10 | V01 §10 row BCR-V1-12 → f item 272 (base text; the request block replaced by the pointer) |
| V01-0580 | bcr | 10 | V01 §10 row BCR-V1-13 → f item 285 (base text; the request block replaced by the pointer) |
| V01-0581 | bcr | 10 | V01 §10 row BCR-V1-14 → f item 405 (base text; the request block replaced by the pointer) |
| V01-0582 | bcr | 10 | V01 §10 row BCR-V1-15 → f item 417 (base text; the request block replaced by the pointer) |
| V01-0583 | bcr | 10 | V01 §10 row BCR-V1-16 → f item 444 (base text; the request block replaced by the pointer) |
| V01-0584 | bcr | 10 | V01 §10 row BCR-V1-17 → f item 422 (base text; the request block replaced by the pointer) |
| V01-0585 | bcr | 10 | V01 §10 row BCR-V1-18 → f item 327 (base text; the request block replaced by the pointer) |
| V01-0586 | bcr | 10 | V01 §10 row BCR-V1-19 → f items 474, 568 (base text; the request block replaced by the pointer) |
| V01-0587 | bcr | 10 | V01 §10 row BCR-V1-20 → f item 542 (base text; the request block replaced by the pointer) |
| V01-0588 | bcr | 10 | V01 §10 row BCR-V1-21 → f item 498 (base text; the request block replaced by the pointer) |
| V01-0589 | bcr | 10 | V01 §10 row BCR-V1-22 → f item 544 (base text; the request block replaced by the pointer) |
| V01-0590 | bcr | 10 | V01 §10 row BCR-V1-23 → f item 545 (base text; the request block replaced by the pointer) |
| V01-0591 | bcr | 10 | V01 §10 row BCR-V1-24 → f item 523 (base text; the request block replaced by the pointer) |
| V01-0592 | bcr | 10 | V01 §10 row BCR-V1-25 → f item 373 (base text; the request block replaced by the pointer) |
| V01-0593 | bcr | 10 | V01 §10 row BCR-V1-26 → f item 323 (base text; the request block replaced by the pointer) |
| V01-0594 | bcr | 10 | V01 §10 row BCR-V1-27 → f item 200 (base text; the request block replaced by the pointer) |
| V01-0595 | bcr | 10 | V01 §10 row BCR-V1-28 → f item 540 (base text; the request block replaced by the pointer) |
| V01-0596 | bcr | 10 | V01 §10 row BCR-V1-29 → f item 384 (base text; the request block replaced by the pointer) |
| V01-0597 | bcr | 10 | V01 §10 row BCR-V1-30 → f item 541 (base text; the request block replaced by the pointer) |
| V01-0598 | bcr | 10 | V01 §10 row BCR-V1-31 → f item 345 (base text; the request block replaced by the pointer) |
| V01-0599 | bcr | 10 | V01 §10 row BCR-V1-32 → f item 301 (base text; the request block replaced by the pointer) |
| V01-0600 | bcr | 10 | V01 §10 row BCR-V1-33 → f item 369 (base text; the request block replaced by the pointer) |
| V01-0601 | bcr | 10 | V01 §10 row BCR-V1-34 → f item 421 (base text; the request block replaced by the pointer) |
| V01-0602 | bcr | 10 | V01 §10 row BCR-V1-35 → f item 349 (base text; the request block replaced by the pointer) |
| V01-0603 | bcr | 10 | V01 §10 row BCR-V1-36 → f item 560 (base text; the request block replaced by the pointer) |
| V01-0604 | bcr | 10 | V01 §10 row BCR-V1-37 → f item 554 (base text; the request block replaced by the pointer) |
| V01-0605 | bcr | 10 | V01 §10 row BCR-V1-38 → f item 543 (base text; the request block replaced by the pointer) |
| V01-0606 | bcr | 10 | V01 §10 row BCR-V1-39 → f item 290 (base text; the request block replaced by the pointer) |
| V01-0607 | bcr | 10 | V01 §10 row BCR-V1-40 → f item 448 (base text; the request block replaced by the pointer) |
| V01-0608 | bcr | 10 | V01 §10 row BCR-V1-41 → f item 211 (base text; the request block replaced by the pointer) |
| V01-0609 | bcr | 10 | V01 §10 row BCR-V1-42 → f item 302 (base text; the request block replaced by the pointer) |
| V01-0610 | bcr | 10 | V01 §10 row BCR-V1-43 → f item 245 (base text; the request block replaced by the pointer) |
| V01-0611 | bcr | 10 | V01 §10 row BCR-V1-44 → f item 350 (base text; the request block replaced by the pointer) |
| V01-0612 | bcr | 10 | V01 §10 row BCR-V1-45 → f item 580 (base text; the request block replaced by the pointer) |
| V01-0613 | bcr | 10 | V01 §10 row BCR-V1-46 → f item 584 (base text; the request block replaced by the pointer) |
| V01-0614 | handoff | 10 notes | closed at its destinations; the cross-volume note left V01 §10 (V01-XCONF-1; the note's history in the validation records) |
| V01-0615 | handoff | 10 notes | closed at its destinations; the cross-volume note left V01 §10 (V01-XCONF-1; the note's history in the validation records) |
| V01-0616 | handoff | 10 notes | closed at its destinations; the cross-volume note left V01 §10 (V01-XCONF-1; the note's history in the validation records) |
| V01-0617 | handoff | 10 notes | closed at its destinations; the cross-volume note left V01 §10 (V01-XCONF-1; the note's history in the validation records) |
| V01-0618 | handoff | 10 notes | closed at its destinations; the cross-volume note left V01 §10 (V01-XCONF-1; the note's history in the validation records) |
| V01-0619 | handoff | 10 notes | closed at its destinations; the cross-volume note left V01 §10 (V01-XCONF-1; the note's history in the validation records) |
| V01-0620 | handoff | 10 notes | closed at its destinations; the cross-volume note left V01 §10 (V01-XCONF-1; the note's history in the validation records) |
| V01-0621 | decision | 11 | V01 §11 — Q-V1-1 answered: yes (J122) |
| V01-0622 | evidence | 12 | V01 §12 (one CONFIRMED / PLAUSIBLE pair; the per-lane reading lists to the validation records) |
| V01-0623 | evidence | 13 | V01 §13 (closed; the per-round tallies to the validation records) |
| V01-0624 | decision | integration | folded: `BlockKind` at V01 §2.1–§2.2 (J-VI.1, J-VI.23); the crypt sentence at V01 §3.7.1 (J-VI.17 H33); the NG parity sheet at V01 §5.1.2 (J-VI.17 H8); J-V1.31's wording at V01 §9 |
| V01-0625 | decision | integration | folded: the reason word at V01 §2.3 `DistrictContext.raised` (J-VI.2) |
| V01-0626 | decision | integration | folded: the terminal at V01 §3.17.8 (J-VI.9); DR26 at V01 §1b (J-VI.13); bends at V01 §4 (J-VI.4); piers and soffit at V01 §3.17.3 (J-VI.27) |
| V01-0627 | term | 3.2 | V01 §3.2 (defined term) |
| V01-0628 | term | 2.3 | V01 §2.3 (defined term) |
| V01-0629 | term | 2.1 | V01 §2.1 (defined term) |
| V01-0630 | term | 2.2 | V01 §2.2 (defined term) |
| V01-0631 | term | 3.4.1 | V01 §3.4.1 (defined term) |
| V01-0632 | term | 3.4 | V01 §3.4 (defined term) |
| V01-0633 | term | 3.3.7 | V01 §3.3.7 (defined term) |
| V01-0634 | term | 2.2 | V01 §2.2 (defined term) |
| V01-0635 | term | 3.8 | V01 §3.8 (defined term) |
| V01-0636 | term | 2.5 | V01 §2.5 (defined term) |
| V01-0637 | term | 3.8.9 | V01 §3.8.9 (defined term) |
| V01-0638 | term | 3.10 | V01 §3.10 (defined term) as 'standalone neighbourhood document' (G-standalone) |
| V01-0639 | term | 3.10.1 | V01 §3.10.1 (defined term) as 'standalone neighbourhood document' (G-standalone) |
| V01-0640 | term | 2.7 | V01 §2.7 (defined term) |
| V01-0641 | term | 3.10 | V01 §3.10 (defined term) |
| V01-0642 | term | 3.15 | V01 §3.15 (defined term) |
| V01-0643 | term | 3.14 | V01 §3.14 (defined term) |
| V01-0644 | term | 2.3 | V01 §2.3 (defined term) |
| V01-0645 | term | 3.17.1 | V01 §3.17.1 (defined term) |
| V01-0646 | term | 3.17.3 | V01 §3.17.3 (defined term) |
| V01-0647 | term | 5.1 | V01 §5.1 (defined term) |
| V01-0648 | term | 1b | V01 §1b (defined term) |
| V01-0649 | term | 2.4 | V01 §2.4 (defined term) |
| V01-0650 | term | 3.8.2 | V01 §3.8.2 (defined term) |
