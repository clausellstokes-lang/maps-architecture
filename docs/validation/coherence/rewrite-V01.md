# Rewrite — design volume V01 (neighbourhoods)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V01; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V01`; started 2026-09-29 on the owner's Mac, continued 2026-10-02/03 in the cloud checkout)
- P1 inputs gathered (canon unit V01, conflicts, f items concerning V01, g routing — no g 111+ part routed to V01 —, hand-offs, edges, inventory): done
- P2 new text §0–§1b (parts 00-head, 01-scope, 02-wiring): done
- P3 new text §2 (03-data): done
- P4 new text §3.1–§3.9 (04-gen-a, 05-gen-b, 06-gen-c): done
- P5 new text §3.10–§3.17 (07-gen-d, 08-gen-e, 09-gen-f): done
- P6 new text §3.18 edges (09b-edges): done (found whole on disk at the continuation; its new tests written in P8)
- P7 new text §4–§6 (10-edit, 11-render): done
- P8 new text §7–§8 (12-tests, 13-build): done (continuation)
- P9 new text §9–§13 and the Integration notes (14-decisions, 15-tail): done (continuation)
- P10 assemble, verify ids and references, sizes: done (continuation)
- P11 report, result file, LANDED: done (continuation)

**Continuation (2026-10-02).** The run stopped on 2026-09-29 at 20:10 after part 11-render; the ledger still read
"pending" for every step after P1. On disk: parts 00-head … 11-render and 09b-edges, each checked whole (09b-edges, written
after the last checkpoint, ends on its last combination row). The scratch inputs of the first machine were gone and were
regenerated under the session scratchpad (canon unit, edges, combinations, conflicts, the inventory with roles).

**Files.** Source `docs/volumes/V01-neighbourhoods.md` (md5 85b488b31b264b447837e4ff228d618c, 4 454 lines). Output
`docs/validation/coherence/new/volumes/V01-neighbourhoods.md` (3 429 lines). Working parts
`docs/validation/coherence/work/rewrite-V01/parts/` (00-head … 15-tail, assembled in order with one blank line between).

## 1 Sizes

Words counted as the canon counts them (Python `str.split`, which also splits on the narrow no-break space; `wc -w` in
brackets).

| | before | after | change |
|---|---|---|---|
| the volume | 93 140 [91 139] | 75 902 [74 383] | −17 238 (−18.5 %) |
| narration-only blocks (banners and ledgers under the title, §12's round records, §13's tallies, the reconciliation and counterpart records, the integration notes) | 12 899 | 689 | −12 210 |
| §10 (the 46 request blocks → one pointer table; the 39 cross-volume notes out) | 9 706 | 806 | −8 900 |
| §11 | 316 | 171 | −145 |
| §9 decisions | 7 874 | 7 727 | −147 |
| §7 tests | 5 829 | 6 568 | +739 |
| §3.18 edges (new) | 0 | 3 112 | +3 112 |
| the body (§0–§6, §8) | 56 516 | 56 829 | +313 |

**By the four sources** (words removed; estimates where a passage mixed sources): NARRATION ≈ 15 000 (the blocks above
12 210; the cross-volume notes 2 288; inline review tags — `V1C-…`, `seam …`, round and lane notes, "revised …", "the first
draft" — in §0–§9); RESTATEMENT ≈ 7 300 (the request blocks, 7 418 words of text file f now carries in the base, became
the 806-word pointer table; the 57 restatements of base and volume facts became citations; V11's and the base's values
cut where cited; DUP-1–DUP-5); DUPLICATED MECHANISMS ≈ 150 (E-24: J-V1.41's row reduced to its mark, its reasons at
J-V1.98; E-29 cited, not restated); VERBOSE PROSE ≈ 600 (§2.2, §2.4, §3.14's two constants tables merged into one column
table). **Added** ≈ 4 450: the edge catalogue's 133 undefined and 99 untested edges and 15 combinations (§3.18, 3 112),
four new bars and new clauses (T-V1-55 – T-V1-58; T-V1-11 (d), T-V1-20 (d), T-V1-21 (k), T-V1-26 (e)'s treads, T-V1-37's
family clause, T-V1-32's re-offered panels), the agreement and wiring fixes in the body, and the volume prefix on every
element of a reference list (G-cite: "V01 §3.2, V01 §3.3", ≈ 250).

**Below the band (25–40 %; 55 884–69 855 words), and what holds it.** Without the added content the volume shrank by
22.6 %. What remains is build-depth content of this volume's own: the record and table declarations (§2), the stage
laws and their constants with provenance (§3.1–§3.17; §3.14's column table), the wiring table and the dossier trace
(§1b), the edit, lifecycle and locality rows (§4), the paint programs, layer orders and export rows (§5), the budget
lines with fallbacks (§6), 58 bars (§7), the work items (§8) and 101 reasoned decisions (§9). Each paragraph left was
read for restatement, narration and duplication; none was thinned to reach the band (the guard). Not a defect (principle
(9)); the shrink is under half, so no nuance audit is triggered.

## 2 What the canon routed here, and where each now stands

**STATE (482 facts) and REFERENCE (57).** Every `home` fact is stated once in the new text; every `reference` is a
citation of its home (the mapping table, §8 of this report). Two homes were read against the landed base: `HoodRecipe` (V01-0179) and `DistrictContext` stay
declared here, because the landed model part (§2.9's
`Recipe.hood`, §14's `FabricStrategy.partition`) cites V01 §2.6 and V01 §2.3 for them — the two units agree (cross-part
note 8).

**Terms replaced (glossary).** G-lot (plot, `BuildingInput.plot`): 0 left. G-refview: "reference viewport". G-firstmap:
"first map". G-cite: every volume section written `Vnn §x.y`, the volume's own included, and every element of a list
prefixed (98 lists expanded; the one base reference inside such a list, `§13.3's shift record`, kept bare). G-stairway: the
way state is a "stair-stepped way" (the template row and the `shape` enum value keep `stepped`). G-standalone: "standalone
neighbourhood document" throughout (§0's plain words included). G-unitinput: `SkyUnitInput`, `skyUnitInput(doc, island)`.
G-DR: DR26–DR35 only (DR26 this volume's row; DR29–DR34 in §1b's dossier table). G-geojson: `raisedSupport` per support,
`retaining` per run (T-V1-33 words its bar in the new kinds).

**Id rulings.** ID-BCR: this volume's requests are BCR-V1-1 – BCR-V1-46 (V01 §10), every in-text citation of a request
replaced by the applied f item it became. ID-DR: DR-V1.1 → DR26 (V01 §1b's dossier table; §10's BCR-V1-29 row). ID-WX: no other
volume's bare W, X, H, IN or CVR row is cited (V02 X24 and "J-VI.17 H8/H33" rewritten as `V02 §2.6` and
`J-VI.17, _integrate H8/H33`); the IN-V01 ids leave the volume (their content at its homes).

**Renumberings.** BCR-n → BCR-V1-n (n kept). DR-V1.1 → DR26. No test or decision id changed; T-V1-55 – T-V1-58 are new.

## 3 Conflicts resolved (12)

| conflict | ruling applied | where |
|---|---|---|
| MC-11 | `TypedBoundary` and `FabricStrategyId` declared in the base (§2.5); this volume cites | V01 §2.1 |
| V01-ICONF-1 | n = `tpl.segMin` + ⌊(`tpl.segSpan` + 1) × u⌋, δ = (m3 − ½) × 2 × `tpl.courseDelta` × \|AB\|; no literal repeats a cell | V01 §3.4.3 |
| V01-ICONF-2 | `skyDistrictCount`'s formula only in V01 §3.16 (plot land in m², `districtHa` × 10 000); §3.10.3 and §3.14 cite it | V01 §3.10.3 step 2, §3.14, §3.16 |
| V01-ICONF-3 | J-V1.41 "superseded by J-V1.98"; J-V1.36 "superseded in part by J-V1.77"; reasons at the governing rows (E-24) | V01 §9 |
| V01-ICONF-4 | the soffit bound over a crossed way is item 244's clearance rule (held `clearanceCm` first, else V11's per class) | V01 §3.17.3 (3) |
| V01-ICONF-5 | the stale stack-door and "whichever lands first" clauses left with §12/§13's narration; J-V1.96, T-V1-26, items 554 and 560 govern | V01 §9, §7, §12 |
| V01-XCONF-1 | the closed cross-volume notes leave §10 — all 39 notes, each checked at its destination | V01 §10 |
| V01-XCONF-2 | one VTT rule at §11.1 (items 447, 448): a retaining wall joins `line_of_sight` where its derived step ≥ `vtt.retainingMinCm`, broken over stairs and ramps; supports as cliffs; V01 cites | V01 §5.3, T-V1-33 |
| V02-XCONF-1 | (V01 half) the soffit bound cited as item 244's rule, identically to V02 §3.17 (b) | V01 §3.17.3 (3) |
| V10-XAGREE-2 | the why providers name their pushes by V11's families — `sun`, `nuisance` | V01 §4.5; T-V1-37 |
| CANON-C03 | §11 a table of decisions: Q-V1-1 answered yes (J122) | V01 §11 |
| CANON-C04 | the INDEX §7 items routed here fixed: S23R6-07 (§0 names the annex temple's way into its crypt, V03 §3.7.4); SLR6-04 (notes (36), (39) out) | V01 §0, §10 |

Also aligned, found in this pass: §6's medium-hood line read "≈ 750 buildings" against `size.medium` 700 — now cites
`size.medium` (V01 §3.14), as T-V1-20 (a) does; J-V1.36's "no epochs in volume 6's first build" reads "no epochs" as the
body (V01 §3.10.1 (7)) and V06's J-V6.102 state.

## 4 Elegance rulings applied

**E-24 — one mark for a superseded or amended decision.** Applied in V01 §9 (its header states the form).
- [x] no row dropped: J-V1.36 and J-V1.41 keep their ids and rows, each with its one mark.
- [x] the governing row keeps the reason: J-V1.98 now opens with J-V1.41's reasons (item 23; the D-5 panel compares like with
  like; the default keeps our rules as declared extensions); J-V1.77 holds the layer list's reasons; J-V1.36 keeps its own
  surviving reasons (the owner's island limit, no church count or growth programme, an implementer must not guess) and its
  epochs clause.

**E-29 — one door helper (V03 §3.7.1) under `basementDoor(b)` and `stackAccessDoor(b, a)`.** This volume cites it and
restates neither function (§1.2's hooks row, §3.8.2 step 5, J-V1.75, J-V1.96, T-V1-26 (g)–(h)).
- [x] `basementDoor`'s three ordered rules, its crypt-vault clause from M6-U, null unless access is external — V03 §3.7.1
  (cited; the reserve "none where `basementDoor(b)` is null" and the M6-U crypt clause's one move kept, V01 §3.8.2).
- [x] `stackAccessDoor`'s approach-strip clearance, the non-stair wing preference and its reported fallback — V03 §3.7.2 (1)
  (cited).
- [x] both pure, draw-free, of eager records, in `@plat/plots` at M3a, read by V01's entrance reserve — V01 §3.8.2 step 5,
  §8.2 W6, J-V1.96.

No other unification was made.

## 5 Files f and g

**File f** — the 68 items that concern this volume are cited as base text: 200, 207, 210, 211, 213, 216, 227, 238, 241,
242, 244, 245, 246, 251, 260, 270, 272, 280, 282, 284, 285, 290, 294, 298, 300, 301, 302, 303, 305, 308, 309, 313, 323,
327, 340, 345, 349, 350, 369, 371, 373, 384, 405, 406, 417, 419, 421, 422, 444, 448, 474, 498, 505, 506, 523, 539, 540, 541,
542, 543, 544, 545, 554, 560, 568, 578, 580, 584. The 46 requests are §10's pointer rows (BCR-V1-19 to two items, 474 and
568). §8 states no total of its own: §16 computes both totals once (item 568; V01-HANDOFF-2).

**File g** — items 102–110 are integrated parts this volume carries (shade, siting, chains, closure, balance, ladder
records, the underground's surface, item 110's neighbourhood parts; §3, §5). Items 111–113 route no part to V01; the
canon's oasis combinations with a district and a terraced ward are V01 §3.18 (f)'s rows and T-V1-58.

## 6 Wiring, hand-offs, edges, owner question, cohesion

**Wiring gaps closed.** W-DOS-10a (§1b's dossier table cites DR30 and DR32 by number); W-IF-03 (V01 §4.5 names its
providers for `district.terrace`, `RetainingWall` and `district.raised`; V10's side is a cross-part note); W-TEST-01
(V01 §3.13's "tested by" column; T-V1-11 (d) and T-V1-20 (d) written); V01-WGAP-1 (V01 §5.3's skeleton row carries
`terrace` and a quarter's `terrace`).

**Hand-offs closed (15).** V02 X14 (V01 §5.1.2's NG parity sheet sentence; §7's closing line cites it); V02 X24 and X31
(V01 §5.1.2's stair-flight treads by `stairTreads`, §5.1.3's stack order; T-V1-26 (e)); V06 X11 (`hood.fabric` at
`afterGrowth`, V01 §3.3.6; the district supply term at every epoch allocation); V06 X16 and X28 (`EpochScope.recut` and
`.raised`, the crossed close-ups re-derived, no plot removal, `raised.stripMarginM`; V01 §3.3.6, §3.17.7); V06 X40 (the
`sky.islands` unit run, V01 §3.10.3 (6)); V06 X45 (the surfaces' epoch clause, V01 §3.7.3); V10 CVR-V10-6 (`sun`,
`nuisance`, V01 §4.5); V10 CVR-V10-13 (the ravine quarter declared `fabric: 'stepped'`, `terrace: 'on'`, V01 §3.17.1 (2));
V11 X-V11-8 (`WayNamingContext.raised`, the slope unit sentence, V01 §2.3, §3.6); V11 X-V11-15 and X-V11-16 (confirmed;
`PresetId` 'NG', V01 §3.15); V12 X-V12-16 (the register at every exit, V01 §8.1); V12 X-V12-17 (`--milestone <id>` on
every `--defaults` citation, V01 §8.1, W11).

**This volume's own hand-off rows (V01-0614 – V01-0620) and Fix list (V01-0623).** The 39 cross-volume notes were checked
at their destinations (V05 §3.1 "S7c included", §3.12 inner setback line, `skyDistrictCount` and `plantRimWalk` cited;
V04 `districtsAbove`, the hood line, the poorest-band cap, §4.3's switch row; V06 order 40 and "no plot removal"; V02
§5.3's hatch bullet and `PorchKindRow`; V03 `basementDoor(b)`; V11 and V12 'NG'; V12's value-move row; items 313, 505,
554 and 560 as the notes asked) and leave the volume. §13 keeps no open item.

**Edges.** 133 UNDEFINED and 99 UNTESTED edges and the 15 UNDEFINED combinations this volume owns are defined in V01 §3.18:
(a) degenerate geometry, (b) every rung THORP–METROPOLIS cap, (c) every toggle and preset, (d) save, load, undo, redo,
regenerate, migrate, (e) a row per mechanism (no input, one item, caps, missing or contradictory data) with outcome,
failure rung and test, (f) the 15 combinations (cliff, steep ground, coast, moat, bridge, raised way, oasis, frame, lock,
save and load against a district or a terraced ward). New bars: T-V1-55 (lifecycle and migration), T-V1-56 (the edge
fixtures, toggles and degenerate inputs), T-V1-57 (the rungs), T-V1-58 (the oasis and frame combinations). No edge's
outcome is a crash, hang, lost data, silent result or whole-map retry.

**Owner question.** Q-V1-1 answered yes (J122), its accepted consequence — M5's panel re-offering the MFCG and FTG
side-by-sides on the new default — wired to T-V1-32.

**Disagreements (agreement.md).** `BCR-V9-31` with V09 (V01-XCONF-2, V01 §5.3); `WhyPull` with V10 (V10-XAGREE-2,
V01 §4.5); `FabricStrategyId`, `TypedBoundary` with model (MC-11, V01 §2.1).

**Cohesion (every volume).** §8 agrees with §16 and INDEX §4 (M5 in J122's first stream after M4; 27.25–36.25 pw, §16's
stage-2 row; no total of its own); §11 answered and read in the body (J-V1.2, V01 §8.4 (6)); §1b names each piece's
producer and consumer; one marker line, no ledger, no reconciliation record. The context vector: `DistrictContext` is the
district-level view over §2.5's one vector (V01 §2.3's opening).

**Open findings (52) — each closed.** VOL-V01-V02-RESTATEMENTS-001 – -006 and V01-RESTATE-1 – -5 (citations without
values: V01 §1.2, §3.3.2, §3.14, §3.17.3, §3.6, §3.11); V01-DUP-1 (V01 §2.2's pin-row comment cites V01 §3.8.2), -2
(street_strip cites V01 §3.4.3's course law), -3 (II.1's typing cited), -4 (V01 §3.12), -5 (V01 §3.17.1 (1) cites V01 §2.3's
one definition); V01-ICONF-1 – -5, V01-XCONF-1, -2 (§3 above); V01-WGAP-1; V01-MISSING-1 and V01-DEFER-3 (V01 §11);
V01-TERM-1 – -3 (G-cite, G-stairway, G-standalone); V01-DEFER-1 (`Sample` beside `Seam`, item 540, cited without the
condition, V01 §1.2); V01-DEFER-2 (V01 §3.17.8 decided, J-VI.9); V01-DEFER-4 (V04 §4.3's switch row read as the canon
rules: any change; inside (0, 1] the ground-edit row, V01 §3.15); V01-NARR-1 – -6 (one marker line; the ledgers, review
notes, decision-row history, request process clauses, notes and round records out; IN-V01-4, -5, -6, -9 folded at
V01 §2.3, §3.17.8, §1b, §3.17.3); V01-BREF-1 (the clerk is V01 §4.5); V01-HANDOFF-1 (DR26) and -2 (§16 computes the
totals); S23R6-07 and SLR6-04 (§3 above); IN-V01-1 – -9 (folded; the Integration notes section lists the J-VI decisions
and their homes, no IN id kept).

**Integration notes.** Kept as a section (the brief) in the canon's form (S9, ID-WX): each J-VI decision with the home
section that now carries it; no note text, no IN id.

**Checks run on the output.** 58 test ids, each defined once, every `T-V1-n` cited defined; 101 decisions, every `J-V1.n`
cited defined; every `V01 §x` resolves to a heading of the new text; every `Vnn §x` to a heading (or bold section head) of
that volume; every bare `§x` to a heading of the landed base parts (research-file sections excepted); no `TBD`, no
"until the owner", no unresolved "later"; no retired term. `docs/validation/bench/doc_checks.py` was not run: its
reference corpus is absent in this checkout, so its result would be provisional only.

## 7 CROSS-PART NOTES

1. **scope §13 and §16** — the takeover table's stage-2 row and §16's M5 exit read "T-V1-1 – T-V1-54"; V01 §7 now ends at
   T-V1-58 (T-V1-55 – T-V1-58, the edge bars). §16's M5 price is unchanged (W11 absorbs the edge fixtures, PLAUSIBLE).
2. **scope §13.2 T110-7 and V12 §3.7.8** — V01's no-op pin, T-V1-4 (e), is a `NoOpPin` on V12's engine beside T-V2-50,
   T-V6-65, the village pin and T-V11-31; T110-7's list and V12's registrations may name it.
3. **scope §13.6 and V12 §3.9.1** — Q-V1-1's accepted package: M5's panel re-offers the MFCG and FTG side-by-sides on the
   new default preset beside the NG panel (T-V1-32); V12's M5 panel registration carries those specs.
4. **scope, the Judgment-calls index (E-24)** — J-S42's row: "superseded by J-V1.6" (II.2 already says so); J-A44.71's
   row: "amended by J-V1.98" (its alternative "over adding an NG parity preset" no longer holds; its `over: 'both'` stands).
5. **scope §14** — the `@plat/hood` row lists three of the five services; V01 §8.3 also places `skyDistrictCount`,
   `plantRimWalk`, `accessSymbolKind`, `TemplateFabric.levelledUnits` / `terracedEdges` (item 506) and the `hood.*`
   tables in `@plat/tables`. Either the row adds them or it cites V01 §8.3 for the full contents.
6. **V10** — W-IF-03: V10 §3.9's owed table lists V01 §4.5's providers for `district.terrace`, `RetainingWall` and
   `district.raised` as V01's (one provider per kind; a deck plot and a raised way itself stay V10's); V10-XAGREE-2: V10
   §2.13 drops its translation note — V01's pulls are `sun` and `nuisance`; T-V1-37 checks the enum.
7. **V02 and V09** — V02 §3.17 (b) cites item 244's clearance rule identically (V02-XCONF-1); V09's BCR-V9-31 (c) cites
   §11.1's one VTT rule (V01-XCONF-2).
8. **model** — `HoodRecipe` (`Recipe.hood`, §2.9) and `DistrictContext` (`FabricStrategy.partition`'s `ctx`, §14) are base-
   used types declared in V01 §2.6 and V01 §2.3; the landed model text cites V01 for both, so the units agree. Should a
   later ruling extend MC-11's principle to them, V01 §2.3 and §2.6 become citations with no change of meaning.
9. **INDEX** — no change needed for V01: §4's order and §6's Q-V1-1 row match V01 §8.1 and §11.

## 8 MAPPING TABLE — every inventory id of V01 and where it now lives

"V01 §x" is the new text's section; "now cites" names the home of a `reference` fact; "(hook / plan row)" a row of §1.2,
§1.3 or §8 the canon indexed; "(term defined here)" a glossary term this volume defines.

| inventory id | kind | source § | canon role | now lives |
|---|---|---|---|---|
| V01-0001 | summary | 0 | home | V01 §0 |
| V01-0002 | summary | 0 | home | V01 §0 |
| V01-0003 | summary | 0 | home | V01 §0 |
| V01-0004 | summary | 0 | home | V01 §0 |
| V01-0005 | summary | 0 | home | V01 §0 |
| V01-0006 | summary | 0 | home | V01 §0 |
| V01-0007 | scope | 1.1 | home | V01 §1.1 |
| V01-0008 | scope | 1.1 | home | V01 §1.1 |
| V01-0009 | scope | 1.1 | home | V01 §1.1 |
| V01-0010 | scope | 1.1 | home | V01 §1.1 |
| V01-0011 | scope | 1.1 | home | V01 §1.1 |
| V01-0012 | scope | 1.1 | home | V01 §1.1 |
| V01-0013 | scope | 1.1 | home | V01 §1.1 |
| V01-0014 | scope | 1.1 | home | V01 §1.1 |
| V01-0015 | scope | 1.1 | home | V01 §1.1 |
| V01-0016 | scope | 1.1 | home | V01 §1.1 |
| V01-0017 | scope | 1.1 | home | V01 §1.1 |
| V01-0018 | scope | 1.1 | home | V01 §1.1 |
| V01-0019 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0020 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0021 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0022 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0023 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0024 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0025 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0026 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0027 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0028 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0029 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0030 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0031 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0032 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0033 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0034 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0035 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0036 | hook | 1.2 | home | V01 §1.2 |
| V01-0037 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0038 | hook | 1.2 | home | V01 §1.2 |
| V01-0039 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0040 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0041 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0042 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0043 | hook | 1.2 | index-row | V01 §1.2 (hook / plan row) |
| V01-0044 | hook | 1.2 | home | V01 §1.2 |
| V01-0045 | scope-out | 1.3 | index-row | V01 §1.3 (hook / plan row) |
| V01-0046 | scope-out | 1.3 | index-row | V01 §1.3 (hook / plan row) |
| V01-0047 | scope-out | 1.3 | index-row | V01 §1.3 (hook / plan row) |
| V01-0048 | scope-out | 1.3 | index-row | V01 §1.3 (hook / plan row) |
| V01-0049 | scope-out | 1.3 | index-row | V01 §1.3 (hook / plan row) |
| V01-0050 | wiring | 1b | home | V01 §1b |
| V01-0051 | wiring | 1b | home | V01 §1b |
| V01-0052 | wiring | 1b | home | V01 §1b |
| V01-0053 | wiring | 1b | home | V01 §1b |
| V01-0054 | wiring | 1b | home | V01 §1b |
| V01-0055 | wiring | 1b | home | V01 §1b |
| V01-0056 | wiring | 1b | home | V01 §1b |
| V01-0057 | wiring | 1b | home | V01 §1b |
| V01-0058 | wiring | 1b | home | V01 §1b |
| V01-0059 | wiring | 1b | home | V01 §1b |
| V01-0060 | wiring | 1b | home | V01 §1b |
| V01-0061 | wiring | 1b | home | V01 §1b |
| V01-0062 | wiring | 1b | home | V01 §1b |
| V01-0063 | wiring | 1b | home | V01 §1b |
| V01-0064 | wiring | 1b | home | V01 §1b |
| V01-0065 | wiring | 1b | home | V01 §1b |
| V01-0066 | wiring | 1b | home | V01 §1b |
| V01-0067 | wiring | 1b | home | V01 §1b |
| V01-0068 | wiring | 1b | home | V01 §1b |
| V01-0069 | wiring | 1b | home | V01 §1b |
| V01-0070 | wiring | 1b | home | V01 §1b |
| V01-0071 | wiring | 1b | home | V01 §1b |
| V01-0072 | wiring | 1b | home | V01 §1b |
| V01-0073 | wiring | 1b | home | V01 §1b |
| V01-0074 | wiring | 1b | home | V01 §1b |
| V01-0075 | wiring | 1b | home | V01 §1b |
| V01-0076 | wiring | 1b | home | V01 §1b |
| V01-0077 | wiring | 1b | home | V01 §1b |
| V01-0078 | wiring | 1b | home | V01 §1b (the `skyDistrictCount` row; its one formula at V01 §3.16, V01-ICONF-2) |
| V01-0079 | wiring | 1b | home | V01 §1b |
| V01-0080 | wiring | 1b | home | V01 §1b |
| V01-0081 | wiring | 1b | home | V01 §1b |
| V01-0082 | wiring | 1b | home | V01 §1b |
| V01-0083 | wiring | 1b | home | V01 §1b |
| V01-0084 | wiring | 1b | home | V01 §1b |
| V01-0085 | wiring | 1b | home | V01 §1b |
| V01-0086 | wiring | 1b | home | V01 §1b |
| V01-0087 | wiring | 1b | home | V01 §1b |
| V01-0088 | wiring | 1b | home | V01 §1b |
| V01-0089 | wiring | 1b | home | V01 §1b |
| V01-0090 | wiring | 1b | home | V01 §1b |
| V01-0091 | wiring | 1b | home | V01 §1b |
| V01-0092 | wiring | 1b | home | V01 §1b |
| V01-0093 | wiring | 1b | home | V01 §1b |
| V01-0094 | wiring | 1b | home | V01 §1b |
| V01-0095 | wiring | 1b | home | V01 §1b |
| V01-0096 | wiring | 1b | home | V01 §1b |
| V01-0097 | wiring | 1b | home | V01 §1b |
| V01-0098 | wiring | 1b | home | V01 §1b |
| V01-0099 | wiring | 1b | home | V01 §1b |
| V01-0100 | wiring | 1b | home | V01 §1b |
| V01-0101 | wiring | 1b | home | V01 §1b |
| V01-0102 | wiring | 1b | home | V01 §1b |
| V01-0103 | wiring | 1b | home | V01 §1b |
| V01-0104 | wiring | 1b | home | V01 §1b |
| V01-0105 | wiring | 1b | home | V01 §1b |
| V01-0106 | wiring | 1b | home | V01 §1b |
| V01-0107 | wiring | 1b | home | V01 §1b |
| V01-0108 | wiring | 1b | home | V01 §1b |
| V01-0109 | wiring | 1b | home | V01 §1b |
| V01-0110 | wiring | 1b | home | V01 §1b |
| V01-0111 | wiring | 1b | home | V01 §1b |
| V01-0112 | wiring | 1b | home | V01 §1b |
| V01-0113 | wiring | 1b | home | V01 §1b |
| V01-0114 | wiring | 1b | home | V01 §1b |
| V01-0115 | wiring | 1b | home | V01 §1b |
| V01-0116 | wiring | 1b | home | V01 §1b |
| V01-0117 | dossier | 1b | home | V01 §1b |
| V01-0118 | dossier | 1b | home | V01 §1b |
| V01-0119 | dossier | 1b | home | V01 §1b |
| V01-0120 | dossier | 1b | home | V01 §1b |
| V01-0121 | dossier | 1b | home | V01 §1b |
| V01-0122 | dossier | 1b | home | V01 §1b |
| V01-0123 | dossier | 1b | home | V01 §1b |
| V01-0124 | dossier | 1b | home | V01 §1b |
| V01-0125 | dossier | 1b | home | V01 §1b |
| V01-0126 | dossier | 1b | home | V01 §1b |
| V01-0127 | dossier | 1b | home | V01 §1b |
| V01-0128 | dossier | 1b | home | V01 §1b |
| V01-0129 | dossier | 1b | home | V01 §1b dossier table (DR26, ID-DR) |
| V01-0130 | dossier | 1b | home | V01 §1b |
| V01-0131 | rule | 2 | reference | V01 §2 — now cites §2.1 |
| V01-0132 | type | 2.1 | home | V01 §2.1 |
| V01-0133 | type | 2.1 | reference | V01 §2.1 — now cites §4.2 |
| V01-0134 | type | 2.1 | home | V01 §2.1 |
| V01-0135 | type | 2.1 | home | V01 §2.1 |
| V01-0136 | type | 2.1 | home | V01 §2.1 |
| V01-0137 | rule | 2.2 | home | V01 §2.2 |
| V01-0138 | rule | 2.2 | home | V01 §2.2 |
| V01-0139 | record | 2.2 | home | V01 §2.2 |
| V01-0140 | interface | 2.2 | home | V01 §2.2 |
| V01-0141 | type | 2.2 | home | V01 §2.2 |
| V01-0142 | type | 2.2 | home | V01 §2.2 |
| V01-0143 | type | 2.2 | home | V01 §2.2 |
| V01-0144 | type | 2.2 | home | V01 §2.2 |
| V01-0145 | record | 2.2 | reference | V01 §2.2 comment citing §4.7 S9 / §4.5 S7b (3) (item 301): the base table, rows authored here |
| V01-0146 | record | 2.2 | home | V01 §2.2 |
| V01-0147 | record | 2.2 | home | V01 §2.2 |
| V01-0148 | record | 2.2 | home | V01 §2.2 |
| V01-0149 | record | 2.2 | home | V01 §2.2 |
| V01-0150 | record | 2.2 | home | V01 §2.2 |
| V01-0151 | record | 2.2 | home | V01 §2.2 |
| V01-0152 | record | 2.2 | reference | V01 §2.2 — now cites §2.5 |
| V01-0153 | record | 2.2 | reference | V01 §2.2 — now cites §2.5 |
| V01-0154 | record | 2.2 | reference | V01 §2.2 — now cites §2.7 |
| V01-0155 | rule | 2.2 | reference | V01 §2.2 — now cites §2.5 |
| V01-0156 | record | 2.3 | home | V01 §2.3 |
| V01-0157 | record | 2.3 | home | V01 §2.3 |
| V01-0158 | record | 2.3 | home | V01 §2.3 |
| V01-0159 | record | 2.3 | home | V01 §2.3 |
| V01-0160 | record | 2.3 | home | V01 §2.3 |
| V01-0161 | record | 2.3 | home | V01 §2.3 |
| V01-0162 | record | 2.3 | home | V01 §2.3 |
| V01-0163 | record | 2.3 | home | V01 §2.3 |
| V01-0164 | record | 2.3 | reference | V01 §2.3 `FabricSignature`, citing V12 §3.4 for every measure |
| V01-0165 | interface | 2.3 | home | V01 §2.3 |
| V01-0166 | record | 2.3 | home | V01 §2.3 |
| V01-0167 | record | 2.3 | home | V01 §2.3 |
| V01-0168 | interface | 2.3 | home | V01 §2.3 |
| V01-0169 | rule | 2.3 | home | V01 §2.3 |
| V01-0170 | table | 2.3 | home | V01 §2.3 |
| V01-0171 | rule | 2.3 | reference | V01 §2.3 — now cites V02 §3.16 |
| V01-0172 | record | 2.4 | reference | V01 §2.4 — now cites II.1 |
| V01-0173 | rule | 2.4 | home | V01 §2.4 |
| V01-0174 | record | 2.4 | reference | V01 §2.4 — now cites II.1 |
| V01-0175 | record | 2.4 | reference | V01 §2.4 — now cites II.1 |
| V01-0176 | rule | 2.4 | home | V01 §2.4 |
| V01-0177 | record | 2.5 | home | V01 §2.5 |
| V01-0178 | rule | 2.5 | home | V01 §2.5 |
| V01-0179 | record | 2.6 | reference | V01 §2.6 — now cites §2.9 |
| V01-0180 | rule | 2.6 | home | V01 §2.6 |
| V01-0181 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0182 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0183 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0184 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0185 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0186 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0187 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0188 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0189 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0190 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0191 | lifecycle | 2.7 | reference | V01 §2.7 — now cites §7.3 |
| V01-0192 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0193 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0194 | lifecycle | 2.7 | home | V01 §2.7 |
| V01-0195 | rule | 2.7 | home | V01 §2.7 |
| V01-0196 | identity | 2.8 | home | V01 §2.8 |
| V01-0197 | identity | 2.8 | home | V01 §2.8 |
| V01-0198 | identity | 2.8 | home | V01 §2.8 |
| V01-0199 | identity | 2.8 | home | V01 §2.8 |
| V01-0200 | step | 3.1 | home | V01 §3.1 |
| V01-0201 | rule | 3.1 | reference | V01 §3.1 — now cites §4.12 |
| V01-0202 | interface | 3.1 | home | V01 §3.1 |
| V01-0203 | interface | 3.1 | home | V01 §3.1 |
| V01-0204 | rule | 3.1 | home | V01 §3.1 |
| V01-0205 | rule | 3.2 | home | V01 §3.2 |
| V01-0206 | rule | 3.2 | home | V01 §3.2 |
| V01-0207 | rule | 3.2 | home | V01 §3.2 |
| V01-0208 | rule | 3.2 | home | V01 §3.2 |
| V01-0209 | test | 3.2 | home | V01 §3.2 |
| V01-0210 | step | 3.3.1 | home | V01 §3.3.1 |
| V01-0211 | rule | 3.3.2 | home | V01 §3.3.2 |
| V01-0212 | table | 3.3.2 | home | V01 §3.3.2 |
| V01-0213 | rule | 3.3.2 | home | V01 §3.3.2 |
| V01-0214 | rule | 3.3.3 | home | V01 §3.3.3 |
| V01-0215 | rule | 3.3.3 | home | V01 §3.3.3 |
| V01-0216 | rule | 3.3.3 | home | V01 §3.3.3 |
| V01-0217 | table | 3.3.3 | home | V01 §3.3.3 |
| V01-0218 | test | 3.3.3 | home | V01 §3.3.3 |
| V01-0219 | rule | 3.3.4 | home | V01 §3.3.4 |
| V01-0220 | rule | 3.3.5 | home | V01 §3.3.5 |
| V01-0221 | rule | 3.3.6 | home | V01 §3.3.6 |
| V01-0222 | rule | 3.3.7 | home | V01 §3.3.7 |
| V01-0223 | rule | 3.3.7 | reference | V01 §3.3.7 — now cites §4.5 |
| V01-0224 | rule | 3.3.7 | home | V01 §3.3.7 |
| V01-0225 | rule | 3.3.7 | home | V01 §3.3.7 |
| V01-0226 | table | 3.3.8 | home | V01 §3.3.8 |
| V01-0227 | rule | 3.4 | home | V01 §3.4 |
| V01-0228 | rule | 3.4.1 | home | V01 §3.4.1 |
| V01-0229 | rule | 3.4.2 | home | V01 §3.4.2 |
| V01-0230 | rule | 3.4.2 | home | V01 §3.4.2 |
| V01-0231 | rule | 3.4.2 | home | V01 §3.4.2 |
| V01-0232 | rule | 3.4.2 | home | V01 §3.4.2 |
| V01-0233 | rule | 3.4.2 | home | V01 §3.4.2 |
| V01-0234 | rule | 3.4.2 | home | V01 §3.4.2 |
| V01-0235 | mechanism | 3.4.3 | home | V01 §3.4.3 |
| V01-0236 | mechanism | 3.4.3 | home | V01 §3.4.3 |
| V01-0237 | mechanism | 3.4.3 | home | V01 §3.4.3 |
| V01-0238 | mechanism | 3.4.3 | home | V01 §3.4.3 |
| V01-0239 | mechanism | 3.4.4 | reference | V01 §3.4.4 — now cites II.2 |
| V01-0240 | mechanism | 3.4.4 | home | V01 §3.4.4 |
| V01-0241 | mechanism | 3.4.4 | home | V01 §3.4.4 |
| V01-0242 | mechanism | 3.4.4 | home | V01 §3.4.4 |
| V01-0243 | mechanism | 3.4.4 | home | V01 §3.4.4 |
| V01-0244 | mechanism | 3.4.5 | home | V01 §3.4.5 |
| V01-0245 | mechanism | 3.4.5 | home | V01 §3.4.5 |
| V01-0246 | mechanism | 3.4.5 | home | V01 §3.4.5 |
| V01-0247 | mechanism | 3.4.5 | home | V01 §3.4.5 |
| V01-0248 | mechanism | 3.4.6 | home | V01 §3.4.6 |
| V01-0249 | table | 3.4.7 | home | V01 §3.4.7 |
| V01-0250 | decision | 3.4.7 | home | V01 §3.4.7 |
| V01-0251 | rule | 3.4.8 | home | V01 §3.4.8 |
| V01-0252 | step | 3.5.1 | home | V01 §3.5.1 |
| V01-0253 | rule | 3.5.1 | home | V01 §3.5.1 |
| V01-0254 | rule | 3.5.1 | home | V01 §3.5.1 |
| V01-0255 | rule | 3.5.2 | home | V01 §3.5.2 |
| V01-0256 | rule | 3.5.2 | home | V01 §3.5.2 |
| V01-0257 | rule | 3.5.2 | home | V01 §3.5.2 |
| V01-0258 | rule | 3.5.3 | home | V01 §3.5.3 |
| V01-0259 | rule | 3.5.3 | home | V01 §3.5.3 |
| V01-0260 | rule | 3.5.3 | home | V01 §3.5.3 |
| V01-0261 | rule | 3.5.4 | home | V01 §3.5.4 |
| V01-0262 | rule | 3.5.5 | home | V01 §3.5.5 |
| V01-0263 | rule | 3.5.5 | home | V01 §3.5.5 |
| V01-0264 | rule | 3.5.5 | home | V01 §3.5.5 |
| V01-0265 | rule | 3.5.6 | home | V01 §3.5.6 |
| V01-0266 | rule | 3.5.6 | home | V01 §3.5.6 |
| V01-0267 | rule | 3.5.7 | reference | V01 §3.5.7 — now cites §4.9 |
| V01-0268 | rule | 3.5.8 | home | V01 §3.5.8 |
| V01-0269 | rule | 3.5.9 | reference | V01 §3.5.9 — now cites §4.2 |
| V01-0270 | test | 3.5.9 | home | V01 §3.5.9 |
| V01-0271 | table | 3.5.10 | home | V01 §3.5.10 |
| V01-0272 | table | 3.5.10 | home | V01 §3.5.10 |
| V01-0273 | fallback | 3.5.10 | home | V01 §3.5.10 |
| V01-0274 | rule | 3.5.11 | reference | V01 §3.5.11, citing V06 §3.2 (the participant table) |
| V01-0275 | rule | 3.5.12 | home | V01 §3.5.12 |
| V01-0276 | rule | 3.5.12 | home | V01 §3.5.12 |
| V01-0277 | rule | 3.6 | home | V01 §3.6 |
| V01-0278 | rule | 3.6 | home | V01 §3.6 |
| V01-0279 | rule | 3.6 | home | V01 §3.6 |
| V01-0280 | rule | 3.6 | home | V01 §3.6 |
| V01-0281 | rule | 3.6 | reference | V01 §3.6 — now cites II.1 |
| V01-0282 | rule | 3.6 | home | V01 §3.6 |
| V01-0283 | step | 3.7.1 | home | V01 §3.7.1 |
| V01-0284 | rule | 3.7.1 | home | V01 §3.7.1 |
| V01-0285 | rule | 3.7.1 | home | V01 §3.7.1 |
| V01-0286 | rule | 3.7.1 | home | V01 §3.7.1 |
| V01-0287 | rule | 3.7.1 | home | V01 §3.7.1 |
| V01-0288 | rule | 3.7.2 | home | V01 §3.7.2 |
| V01-0289 | rule | 3.7.2 | home | V01 §3.7.2 |
| V01-0290 | rule | 3.7.3 | home | V01 §3.7.3 |
| V01-0291 | rule | 3.7.4 | home | V01 §3.7.4 |
| V01-0292 | rule | 3.8.1 | reference | V01 §3.8.1 — now cites §4.1 |
| V01-0293 | step | 3.8.2 | home | V01 §3.8.2 |
| V01-0294 | step | 3.8.2 | home | V01 §3.8.2 |
| V01-0295 | step | 3.8.2 | reference | V01 §3.8.2 — now cites II.3 |
| V01-0296 | step | 3.8.2 | home | V01 §3.8.2 |
| V01-0297 | mechanism | 3.8.2 | home | V01 §3.8.2 |
| V01-0298 | test | 3.8.2 | home | V01 §3.8.2 |
| V01-0299 | table | 3.8.2 | home | V01 §3.8.2 |
| V01-0300 | test | 3.8.2 | home | V01 §3.8.2 |
| V01-0301 | mechanism | 3.8.3 | home | V01 §3.8.3 |
| V01-0302 | rule | 3.8.4 | home | V01 §3.8.4 |
| V01-0303 | rule | 3.8.5 | reference | V01 §3.8.5 — now cites §8.10 |
| V01-0304 | rule | 3.8.6 | reference | V01 §3.8.6 — now cites II.4 |
| V01-0305 | rule | 3.8.7 | reference | V01 §3.8.7 — now cites §9.5 |
| V01-0306 | rule | 3.8.8 | home | V01 §3.8.8 |
| V01-0307 | rule | 3.8.8 | home | V01 §3.8.8 |
| V01-0308 | rule | 3.8.8 | home | V01 §3.8.8 |
| V01-0309 | interface | 3.8.8 | home | V01 §3.8.8 |
| V01-0310 | mechanism | 3.8.9 | home | V01 §3.8.9 |
| V01-0311 | rule | 3.9 | home | V01 §3.9 |
| V01-0312 | rule | 3.9 | home | V01 §3.9 |
| V01-0313 | rule | 3.9 | home | V01 §3.9 |
| V01-0314 | rule | 3.9 | home | V01 §3.9 |
| V01-0315 | rule | 3.10 | reference | V01 §3.10 — now cites II.1 |
| V01-0316 | step | 3.10.1 | home | V01 §3.10.1 |
| V01-0317 | step | 3.10.1 | home | V01 §3.10.1 |
| V01-0318 | step | 3.10.1 | home | V01 §3.10.1 |
| V01-0319 | step | 3.10.1 | home | V01 §3.10.1 |
| V01-0320 | step | 3.10.1 | home | V01 §3.10.1 |
| V01-0321 | step | 3.10.1 | home | V01 §3.10.1 |
| V01-0322 | step | 3.10.1 | home | V01 §3.10.1 |
| V01-0323 | rule | 3.10.1 | home | V01 §3.10.1 |
| V01-0324 | mechanism | 3.10.2 | home | V01 §3.10.2 |
| V01-0325 | mechanism | 3.10.2 | home | V01 §3.10.2 |
| V01-0326 | step | 3.10.3 | home | V01 §3.10.3 (`SkyUnitInput`, G-unitinput) |
| V01-0327 | step | 3.10.3 | home | V01 §3.10.3 |
| V01-0328 | step | 3.10.3 | reference | V01 §3.10.3 — now cites §4.2 |
| V01-0329 | step | 3.10.3 | home | V01 §3.10.3 |
| V01-0330 | rule | 3.10.3 | home | V01 §3.10.3 |
| V01-0331 | mechanism | 3.10.3 | home | V01 §3.10.3 |
| V01-0332 | step | 3.10.3 | home | V01 §3.10.3 |
| V01-0333 | rule | 3.10.3 | home | V01 §3.10.3 |
| V01-0334 | rule | 3.10.3 | home | V01 §3.10.3 |
| V01-0335 | rule | 3.10.3 | home | V01 §3.10.3 |
| V01-0336 | rule | 3.10.3 | home | V01 §3.10.3 |
| V01-0337 | rule | 3.10.3 | home | V01 §3.10.3 |
| V01-0338 | rule | 3.10.4 | home | V01 §3.10.4 |
| V01-0339 | rule | 3.11 | reference | V01 §3.11 — now cites II.1 |
| V01-0340 | rule | 3.11 | reference | V01 §3.11 — now cites II.1 |
| V01-0341 | rule | 3.11 | reference | V01 §3.11 — now cites II.1 |
| V01-0342 | rule | 3.11 | home | V01 §3.11 |
| V01-0343 | rule | 3.11 | home | V01 §3.11 |
| V01-0344 | rule | 3.12 | reference | V01 §3.12 — now cites §6.1 |
| V01-0345 | rule | 3.12 | home | V01 §3.12 |
| V01-0346 | rule | 3.12 | home | V01 §3.12 |
| V01-0347 | fallback | 3.13 | reference | V01 §3.13 — now cites §5.2 |
| V01-0348 | fallback | 3.13 | reference | V01 §3.13 — now cites §5.2 |
| V01-0349 | rule | 3.13 | reference | V01 §3.13 — now cites §5 |
| V01-0350 | rule | 3.14 | home | V01 §3.14 |
| V01-0351 | constant | 3.14 | home | V01 §3.14 |
| V01-0352 | constant | 3.14 | reference | V01 §3.14 intro: V11 keys cited without values (V01-RESTATE-3) |
| V01-0353 | constant | 3.14 | home | V01 §3.14 |
| V01-0354 | constant | 3.14 | home | V01 §3.14 |
| V01-0355 | constant | 3.14 | home | V01 §3.14 |
| V01-0356 | constant | 3.14 | home | V01 §3.14 |
| V01-0357 | constant | 3.14 | home | V01 §3.14 |
| V01-0358 | decision | 3.15 | home | V01 §3.15 |
| V01-0359 | rule | 3.15 | reference | V01 §3.15 — now cites §7.6 |
| V01-0360 | rule | 3.15 | home | V01 §3.15 |
| V01-0361 | rule | 3.15 | home | V01 §3.15 |
| V01-0362 | rule | 3.15 | home | V01 §3.15 |
| V01-0363 | table | 3.15 | home | V01 §3.15 |
| V01-0364 | interface | 3.16 | home | V01 §3.16 |
| V01-0365 | interface | 3.16 | home | V01 §3.16 |
| V01-0366 | interface | 3.16 | home | V01 §3.16 |
| V01-0367 | interface | 3.16 | home | V01 §3.16 |
| V01-0368 | rule | 3.17 | reference | V01 §3.17 intro, citing the base's item-110 homes (§2.7, §3.4, §4.3, §4.6, §4.7; items 244–246, 290, 302) |
| V01-0369 | rule | 3.17.1 | home | V01 §3.17.1 |
| V01-0370 | rule | 3.17.1 | reference | V01 §3.17.1 (4), citing §4.7's district-edge source (item 302) |
| V01-0371 | rule | 3.17.2 | home | V01 §3.17.2 |
| V01-0372 | rule | 3.17.3 | home | V01 §3.17.3 |
| V01-0373 | rule | 3.17.3 | home | V01 §3.17.3 |
| V01-0374 | rule | 3.17.4 | home | V01 §3.17.4 |
| V01-0375 | rule | 3.17.5 | home | V01 §3.17.5 |
| V01-0376 | rule | 3.17.6 | home | V01 §3.17.6 |
| V01-0377 | rule | 3.17.7 | home | V01 §3.17.7 |
| V01-0378 | rule | 3.17.8 | home | V01 §3.17.8 |
| V01-0379 | rule | 4 | reference | V01 §4 — now cites §7.1 |
| V01-0380 | edit | 4.1 | home | V01 §4.1 |
| V01-0381 | edit | 4.1 | home | V01 §4.1 |
| V01-0382 | edit | 4.1 | home | V01 §4.1 |
| V01-0383 | edit | 4.1 | home | V01 §4.1 |
| V01-0384 | edit | 4.1 | home | V01 §4.1 |
| V01-0385 | edit | 4.1 | home | V01 §4.1 |
| V01-0386 | rule | 4.1 | home | V01 §4.1 |
| V01-0387 | interface | 4.2 | reference | V01 §4.2 — now cites §7.1 |
| V01-0388 | rule | 4.3 | reference | V01 §4.3 — now cites §7.3 |
| V01-0389 | lifecycle | 4.4 | reference | V01 §4.4 — now cites §7.4 |
| V01-0390 | lifecycle | 4.4 | reference | V01 §4.4 — now cites §7.4 |
| V01-0391 | interface | 4.5 | reference | V01 §4.5 — now cites §2.13 |
| V01-0392 | interface | 4.5 | home | V01 §4.5 |
| V01-0393 | rule | 4.6 | reference | V01 §4.6 — now cites §11.3 |
| V01-0394 | rule | 5.1 | reference | V01 §5.1 — now cites §8.2 |
| V01-0395 | table | 5.1.1 | home | V01 §5.1.1 |
| V01-0396 | rule | 5.1.1 | home | V01 §5.1.1 |
| V01-0397 | mechanism | 5.1.2 | home | V01 §5.1.2 |
| V01-0398 | mechanism | 5.1.2 | home | V01 §5.1.2 |
| V01-0399 | mechanism | 5.1.2 | home | V01 §5.1.2 |
| V01-0400 | mechanism | 5.1.2 | reference | V01 §5.1.2 — now cites V02 §2.6 |
| V01-0401 | mechanism | 5.1.2 | home | V01 §5.1.2 |
| V01-0402 | mechanism | 5.1.2 | home | V01 §5.1.2 |
| V01-0403 | mechanism | 5.1.2 | home | V01 §5.1.2 |
| V01-0404 | mechanism | 5.1.2 | home | V01 §5.1.2 |
| V01-0405 | mechanism | 5.1.2 | home | V01 §5.1.2 |
| V01-0406 | table | 5.1.3 | home | V01 §5.1.3 |
| V01-0407 | rule | 5.1.3 | home | V01 §5.1.3 |
| V01-0408 | rule | 5.1.4 | reference | V01 §5.1.4 — now cites §8.4 |
| V01-0409 | mechanism | 5.1.5 | home | V01 §5.1.5 |
| V01-0410 | rule | 5.1.6 | reference | V01 §5.1.6 — now cites §8.2 |
| V01-0411 | test | 5.1.7 | reference | V01 §5.1.7 — now cites §8.2 |
| V01-0412 | rule | 5.2.1 | reference | V01 §5.2.1 — now cites §9.5 |
| V01-0413 | rule | 5.2.2 | reference | V01 §5.2.2 — now cites §9 |
| V01-0414 | rule | 5.2.3 | reference | V01 §5.2.3 — now cites §9.3 |
| V01-0415 | table | 5.3 | reference | V01 §5.3 — now cites §11.1 |
| V01-0416 | table | 5.3 | reference | V01 §5.3 — now cites §11.1 |
| V01-0417 | budget | 6 | home | V01 §6 |
| V01-0418 | budget | 6 | home | V01 §6 |
| V01-0419 | budget | 6 | home | V01 §6 |
| V01-0420 | budget | 6 | home | V01 §6 |
| V01-0421 | budget | 6 | home | V01 §6 |
| V01-0422 | rule | 7 | reference | V01 §7 intro, citing §13's families and §15.2's classes |
| V01-0423 | test | 7 | home | V01 §7 |
| V01-0424 | test | 7 | home | V01 §7 |
| V01-0425 | test | 7 | home | V01 §7 |
| V01-0426 | test | 7 | home | V01 §7 |
| V01-0427 | test | 7 | home | V01 §7 |
| V01-0428 | test | 7 | home | V01 §7 |
| V01-0429 | test | 7 | home | V01 §7 |
| V01-0430 | test | 7 | home | V01 §7 |
| V01-0431 | test | 7 | home | V01 §7 |
| V01-0432 | test | 7 | home | V01 §7 |
| V01-0433 | test | 7 | home | V01 §7 |
| V01-0434 | test | 7 | home | V01 §7 |
| V01-0435 | test | 7 | home | V01 §7 |
| V01-0436 | test | 7 | home | V01 §7 |
| V01-0437 | test | 7 | home | V01 §7 |
| V01-0438 | test | 7 | home | V01 §7 |
| V01-0439 | test | 7 | home | V01 §7 |
| V01-0440 | test | 7 | home | V01 §7 |
| V01-0441 | test | 7 | home | V01 §7 |
| V01-0442 | test | 7 | home | V01 §7 |
| V01-0443 | test | 7 | home | V01 §7 |
| V01-0444 | test | 7 | home | V01 §7 |
| V01-0445 | test | 7 | home | V01 §7 |
| V01-0446 | test | 7 | home | V01 §7 |
| V01-0447 | test | 7 | home | V01 §7 |
| V01-0448 | test | 7 | home | V01 §7 |
| V01-0449 | test | 7 | home | V01 §7 |
| V01-0450 | test | 7 | home | V01 §7 |
| V01-0451 | test | 7 | home | V01 §7 |
| V01-0452 | test | 7 | home | V01 §7 |
| V01-0453 | test | 7 | home | V01 §7 |
| V01-0454 | test | 7 | home | V01 §7 |
| V01-0455 | test | 7 | home | V01 §7 |
| V01-0456 | test | 7 | home | V01 §7 |
| V01-0457 | rule | 7 | home | V01 §7 |
| V01-0458 | plan | 8.1 | index-row | V01 §8.1 (hook / plan row) |
| V01-0459 | plan | 8.1 | home | V01 §8.1 |
| V01-0460 | plan | 8.1 | index-row | V01 §8.1 (hook / plan row) |
| V01-0461 | plan | 8.1 | home | V01 §8.1 |
| V01-0462 | plan | 8.2 | home | V01 §8.2 |
| V01-0463 | plan | 8.2 | home | V01 §8.2 |
| V01-0464 | plan | 8.2 | index-row | V01 §8.2 (hook / plan row) |
| V01-0465 | plan | 8.3 | index-row | V01 §8.3 (hook / plan row) |
| V01-0466 | plan | 8.4 | home | V01 §8.4 |
| V01-0467 | decision | 9 | home | V01 §9 |
| V01-0468 | decision | 9 | home | V01 §9 |
| V01-0469 | decision | 9 | home | V01 §9 |
| V01-0470 | decision | 9 | home | V01 §9 |
| V01-0471 | decision | 9 | home | V01 §9 |
| V01-0472 | decision | 9 | home | V01 §9 |
| V01-0473 | decision | 9 | home | V01 §9 |
| V01-0474 | decision | 9 | home | V01 §9 |
| V01-0475 | decision | 9 | home | V01 §9 |
| V01-0476 | decision | 9 | home | V01 §9 |
| V01-0477 | decision | 9 | home | V01 §9 |
| V01-0478 | decision | 9 | home | V01 §9 |
| V01-0479 | decision | 9 | home | V01 §9 |
| V01-0480 | decision | 9 | home | V01 §9 |
| V01-0481 | decision | 9 | home | V01 §9 |
| V01-0482 | decision | 9 | home | V01 §9 |
| V01-0483 | decision | 9 | home | V01 §9 |
| V01-0484 | decision | 9 | home | V01 §9 |
| V01-0485 | decision | 9 | home | V01 §9 |
| V01-0486 | decision | 9 | home | V01 §9 |
| V01-0487 | decision | 9 | home | V01 §9 |
| V01-0488 | decision | 9 | home | V01 §9 |
| V01-0489 | decision | 9 | home | V01 §9 |
| V01-0490 | decision | 9 | home | V01 §9 |
| V01-0491 | decision | 9 | home | V01 §9 |
| V01-0492 | decision | 9 | home | V01 §9 |
| V01-0493 | decision | 9 | home | V01 §9 |
| V01-0494 | decision | 9 | home | V01 §9 |
| V01-0495 | decision | 9 | home | V01 §9 |
| V01-0496 | decision | 9 | home | V01 §9 |
| V01-0497 | decision | 9 | home | V01 §9 |
| V01-0498 | decision | 9 | home | V01 §9 |
| V01-0499 | decision | 9 | home | V01 §9 |
| V01-0500 | decision | 9 | home | V01 §9 |
| V01-0501 | decision | 9 | home | V01 §9 |
| V01-0502 | decision | 9 | home | V01 §9 J-V1.36, marked superseded in part by J-V1.77 (E-24) |
| V01-0503 | decision | 9 | home | V01 §9 |
| V01-0504 | decision | 9 | home | V01 §9 |
| V01-0505 | decision | 9 | home | V01 §9 |
| V01-0506 | decision | 9 | home | V01 §9 |
| V01-0507 | decision | 9 | home | V01 §9 J-V1.41, marked superseded by J-V1.98, its reasons at J-V1.98 (E-24, V01-ICONF-3) |
| V01-0508 | decision | 9 | home | V01 §9 |
| V01-0509 | decision | 9 | home | V01 §9 |
| V01-0510 | decision | 9 | home | V01 §9 |
| V01-0511 | decision | 9 | home | V01 §9 |
| V01-0512 | decision | 9 | home | V01 §9 |
| V01-0513 | decision | 9 | home | V01 §9 |
| V01-0514 | decision | 9 | home | V01 §9 |
| V01-0515 | decision | 9 | home | V01 §9 |
| V01-0516 | decision | 9 | home | V01 §9 |
| V01-0517 | decision | 9 | home | V01 §9 |
| V01-0518 | decision | 9 | home | V01 §9 |
| V01-0519 | decision | 9 | home | V01 §9 |
| V01-0520 | decision | 9 | home | V01 §9 |
| V01-0521 | decision | 9 | home | V01 §9 |
| V01-0522 | decision | 9 | home | V01 §9 |
| V01-0523 | decision | 9 | home | V01 §9 |
| V01-0524 | decision | 9 | home | V01 §9 |
| V01-0525 | decision | 9 | home | V01 §9 |
| V01-0526 | decision | 9 | home | V01 §9 |
| V01-0527 | decision | 9 | home | V01 §9 |
| V01-0528 | decision | 9 | home | V01 §9 |
| V01-0529 | decision | 9 | home | V01 §9 |
| V01-0530 | decision | 9 | home | V01 §9 |
| V01-0531 | decision | 9 | home | V01 §9 |
| V01-0532 | decision | 9 | home | V01 §9 |
| V01-0533 | decision | 9 | home | V01 §9 |
| V01-0534 | decision | 9 | home | V01 §9 |
| V01-0535 | decision | 9 | home | V01 §9 |
| V01-0536 | decision | 9 | home | V01 §9 |
| V01-0537 | decision | 9 | home | V01 §9 |
| V01-0538 | decision | 9 | home | V01 §9 |
| V01-0539 | decision | 9 | home | V01 §9 |
| V01-0540 | decision | 9 | home | V01 §9 |
| V01-0541 | decision | 9 | home | V01 §9 |
| V01-0542 | decision | 9 | home | V01 §9 |
| V01-0543 | decision | 9 | home | V01 §9 |
| V01-0544 | decision | 9 | home | V01 §9 |
| V01-0545 | decision | 9 | home | V01 §9 |
| V01-0546 | decision | 9 | home | V01 §9 |
| V01-0547 | decision | 9 | home | V01 §9 |
| V01-0548 | decision | 9 | home | V01 §9 |
| V01-0549 | decision | 9 | home | V01 §9 |
| V01-0550 | decision | 9 | home | V01 §9 |
| V01-0551 | decision | 9 | home | V01 §9 |
| V01-0552 | decision | 9 | home | V01 §9 |
| V01-0553 | decision | 9 | home | V01 §9 |
| V01-0554 | decision | 9 | home | V01 §9 J-V1.88 (the share cited from V01 §3.14) |
| V01-0555 | decision | 9 | home | V01 §9 |
| V01-0556 | decision | 9 | home | V01 §9 |
| V01-0557 | decision | 9 | home | V01 §9 |
| V01-0558 | decision | 9 | home | V01 §9 |
| V01-0559 | decision | 9 | home | V01 §9 |
| V01-0560 | decision | 9 | home | V01 §9 |
| V01-0561 | decision | 9 | home | V01 §9 |
| V01-0562 | decision | 9 | home | V01 §9 |
| V01-0563 | decision | 9 | home | V01 §9 |
| V01-0564 | decision | 9 | home | V01 §9 |
| V01-0565 | decision | 9 | home | V01 §9 |
| V01-0566 | decision | 9 | home | V01 §9 |
| V01-0567 | decision | 9 | home | V01 §9 |
| V01-0568 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-1 → item 505 (applied base text; ID-BCR) |
| V01-0569 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-2 → item 539 (applied base text; ID-BCR) |
| V01-0570 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-3 → item 280 (applied base text; ID-BCR) |
| V01-0571 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-4 → item 294 (applied base text; ID-BCR) |
| V01-0572 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-5 → item 210 (applied base text; ID-BCR) |
| V01-0573 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-6 → item 207 (applied base text; ID-BCR) |
| V01-0574 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-7 → item 298 (applied base text; ID-BCR) |
| V01-0575 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-8 → item 284 (applied base text; ID-BCR) |
| V01-0576 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-9 → item 300 (applied base text; ID-BCR) |
| V01-0577 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-10 → item 313 (applied base text; ID-BCR) |
| V01-0578 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-11 → item 340 (applied base text; ID-BCR) |
| V01-0579 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-12 → item 272 (applied base text; ID-BCR) |
| V01-0580 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-13 → item 285 (applied base text; ID-BCR) |
| V01-0581 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-14 → item 405 (applied base text; ID-BCR) |
| V01-0582 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-15 → item 417 (applied base text; ID-BCR) |
| V01-0583 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-16 → item 444 (applied base text; ID-BCR) |
| V01-0584 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-17 → item 422 (applied base text; ID-BCR) |
| V01-0585 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-18 → item 327 (applied base text; ID-BCR) |
| V01-0586 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-19 → item 474 and 568 (applied base text; ID-BCR) |
| V01-0587 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-20 → item 542 (applied base text; ID-BCR) |
| V01-0588 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-21 → item 498 (applied base text; ID-BCR) |
| V01-0589 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-22 → item 544 (applied base text; ID-BCR) |
| V01-0590 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-23 → item 545 (applied base text; ID-BCR) |
| V01-0591 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-24 → item 523 (applied base text; ID-BCR) |
| V01-0592 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-25 → item 373 (applied base text; ID-BCR) |
| V01-0593 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-26 → item 323 (applied base text; ID-BCR) |
| V01-0594 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-27 → item 200 (applied base text; ID-BCR) |
| V01-0595 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-28 → item 540 (applied base text; ID-BCR) |
| V01-0596 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-29 → item 384 (applied base text; ID-BCR) |
| V01-0597 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-30 → item 541 (applied base text; ID-BCR) |
| V01-0598 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-31 → item 345 (applied base text; ID-BCR) |
| V01-0599 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-32 → item 301 (applied base text; ID-BCR) |
| V01-0600 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-33 → item 369 (applied base text; ID-BCR) |
| V01-0601 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-34 → item 421 (applied base text; ID-BCR) |
| V01-0602 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-35 → item 349 (applied base text; ID-BCR) |
| V01-0603 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-36 → item 560 (applied base text; ID-BCR) |
| V01-0604 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-37 → item 554 (applied base text; ID-BCR) |
| V01-0605 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-38 → item 543 (applied base text; ID-BCR) |
| V01-0606 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-39 → item 290 (applied base text; ID-BCR) |
| V01-0607 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-40 → item 448 (applied base text; ID-BCR) |
| V01-0608 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-41 → item 211 (applied base text; ID-BCR) |
| V01-0609 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-42 → item 302 (applied base text; ID-BCR) |
| V01-0610 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-43 → item 245 (applied base text; ID-BCR) |
| V01-0611 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-44 → item 350 (applied base text; ID-BCR) |
| V01-0612 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-45 → item 580 (applied base text; ID-BCR) |
| V01-0613 | bcr | 10 | bcr-pointer | V01 §10 row BCR-V1-46 → item 584 (applied base text; ID-BCR) |
| V01-0614 | handoff | 10 notes | handoff | closed at its destination (checked); leaves V01 §10 (V01-NARR-5, V01-XCONF-1, SLR6-04) |
| V01-0615 | handoff | 10 notes | handoff | closed at its destination (checked); leaves V01 §10 (V01-NARR-5, V01-XCONF-1, SLR6-04) |
| V01-0616 | handoff | 10 notes | handoff | closed at its destination (checked); leaves V01 §10 (V01-NARR-5, V01-XCONF-1, SLR6-04) |
| V01-0617 | handoff | 10 notes | handoff | closed at its destination (checked); leaves V01 §10 (V01-NARR-5, V01-XCONF-1, SLR6-04) |
| V01-0618 | handoff | 10 notes | handoff | closed at its destination (checked); leaves V01 §10 (V01-NARR-5, V01-XCONF-1, SLR6-04) |
| V01-0619 | handoff | 10 notes | handoff | closed at its destination (checked); leaves V01 §10 (V01-NARR-5, V01-XCONF-1, SLR6-04) |
| V01-0620 | handoff | 10 notes | handoff | closed at its destination (checked); leaves V01 §10 (V01-NARR-5, V01-XCONF-1, SLR6-04) |
| V01-0621 | decision | 11 | home | V01 §11: Q-V1-1 answered yes (J122); the re-offered MFCG and FTG panels wired to T-V1-32 |
| V01-0622 | evidence | 12 | history-out | out to the validation records (history); V01 §12 keeps one CONFIRMED and one PLAUSIBLE paragraph |
| V01-0623 | evidence | 13 | history-out | out to the validation records (history); V01 §13 states nothing open |
| V01-0624 | decision | integration | home | folded: V01 §2.1 (`BlockKind`) and V01 §9 J-V1.31; Integration notes list J-VI.1, J-VI.23 |
| V01-0625 | decision | integration | home | folded: V01 §2.3 `DistrictContext.raised` comment; Integration notes list J-VI.2 |
| V01-0626 | decision | integration | home | folded: V01 §3.17.8 (J-VI.9) and V01 §1b (DR26, J-VI.13); Integration notes list both |
| V01-0627 | term | 3.2 | glossary | V01 §3.2 (term defined here; glossary) |
| V01-0628 | term | 2.3 | glossary | V01 §2.3 (term defined here; glossary) |
| V01-0629 | term | 2.1 | glossary | V01 §2.1 (term defined here; glossary) |
| V01-0630 | term | 2.2 | glossary | V01 §2.2 (term defined here; glossary) |
| V01-0631 | term | 3.4.1 | glossary | V01 §3.4.1 (term defined here; glossary) |
| V01-0632 | term | 3.4 | glossary | V01 §3.4 (term defined here; glossary) |
| V01-0633 | term | 3.3.7 | glossary | V01 §3.3.7 (term defined here; glossary) |
| V01-0634 | term | 2.2 | glossary | V01 §2.2 (term defined here; glossary) |
| V01-0635 | term | 3.8 | glossary | V01 §3.8 (term defined here; glossary) |
| V01-0636 | term | 2.5 | glossary | V01 §2.5 (term defined here; glossary) |
| V01-0637 | term | 3.8.9 | glossary | V01 §3.8.9 (term defined here; glossary) |
| V01-0638 | term | 3.10 | glossary | V01 §3.10 (term defined here; glossary) |
| V01-0639 | term | 3.10.1 | glossary | V01 §3.10.1 (term defined here; glossary) |
| V01-0640 | term | 2.7 | glossary | V01 §2.7 (term defined here; glossary) |
| V01-0641 | term | 3.10 | glossary | V01 §3.10 (term defined here; glossary) |
| V01-0642 | term | 3.15 | glossary | V01 §3.15 (term defined here; glossary) |
| V01-0643 | term | 3.14 | glossary | V01 §3.14 (term defined here; glossary) |
| V01-0644 | term | 2.3 | glossary | V01 §2.3 (term defined here; glossary) |
| V01-0645 | term | 3.17.1 | glossary | V01 §3.17.1 (term defined here; glossary) |
| V01-0646 | term | 3.17.3 | glossary | V01 §3.17.3 (term defined here; glossary) |
| V01-0647 | term | 5.1 | glossary | V01 §5.1 (term defined here; glossary) |
| V01-0648 | term | 1b | glossary | V01 §1b (term defined here; glossary) |
| V01-0649 | term | 2.4 | glossary | V01 §2.4 (term defined here; glossary) |
| V01-0650 | term | 3.8.2 | glossary | V01 §3.8.2 (term defined here; glossary) |
