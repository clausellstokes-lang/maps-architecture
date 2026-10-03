# Rewrite — design volume V03 (interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V03; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V03`; started 2026-09-29, finished in the cloud continuation 2026-10-02/03)
- P1 inputs gathered (canon unit V03: 6 conflicts, 3 elegance, 2 id rulings, 2 wiring gaps, 48 f items, 13 hand-offs, 36 open findings, edges 29 UNDEFINED + 26 UNTESTED + 6 owned combinations; inventory 513 ids; no g item 111+ part routed): done
- P2 read the volume whole (3 855 lines; re-read per section in the cloud continuation): done
- P3 new text §0–§1b (parts 00–02): done
- P4 new text §2 (parts 03–05): done
- P5 new text §3 with §3.13 edges (parts 06–09b): done
- P6 new text §4–§6 (parts 10–11): done
- P7 new text §7–§8 (parts 12–13): done
- P8 new text §9–§13 and Integration notes (parts 14–17): done
- P9 assemble, verify ids, references, terms, sizes: done
- P10 report, result file, LANDED: done

Source `docs/volumes/V03-interiors.md`; output `docs/validation/coherence/new/volumes/V03-interiors.md` (title line,
section structure 0–13 and the Integration notes kept; one marker line; new subsection §3.13). Working parts:
`docs/validation/coherence/work/rewrite-V03/parts/` (assembled in file-name order); tools `work/rewrite-V03/tools/`
(`clean.py` the mechanical tag and citation pass, `fix.py` exact-string repairs that re-assemble).

## 1 Sizes

Words by whitespace split (the canon's count): **82 788 → 66 643 (−19.5 %)**; 493.9 KB → 384.5 KB.

| chapter | before | after |
|---|---|---|
| head (banners, PROGRESS and revision ledgers) | 1 880 | 35 |
| §0 | 1 199 | 1 213 |
| §1 | 2 216 | 2 084 |
| §1b | 3 301 | 3 020 |
| §2 | 14 269 | 13 204 |
| §3 (with the new §3.13, ≈ 1 900) | 18 927 | 20 894 |
| §4 | 3 665 | 4 230 |
| §5 | 2 304 | 2 305 |
| §6 | 887 | 873 |
| §7 (with T-V3-36, T-V3-37) | 5 114 | 5 725 |
| §8 | 2 049 | 1 987 |
| §9 | 9 224 | 8 359 |
| §10 | 6 326 | 701 |
| §11 | 274 | 193 |
| §12 | 3 020 | 764 |
| §13 | 3 066 | 901 |
| Integration notes | 258 | 148 |
| reconciliation rounds 1–6 and finalization records | 4 809 | 0 |

**Sources of the ≈ 20 000 words removed** (estimated): narration ≈ 11 000 (55 %: the stacked banners and ledgers,
the round and finalization records, §12's receipts with hashes and scratchpad paths, §13's per-round lists, the
provenance tags in normative text, the "unbuilt / no golden moves" remarks, J-V3.110); restatement ≈ 7 000 (35 %:
the 33 BCR blocks now one pointer table, base declarations and values now cited — `basementDoor`'s signature, the query
shapes, the stops, the label range, the budgets, the crypt ladder's forms, the walk-out condition — the §2.5 read column
folded into §1b, the storey-less plan, the vault and `Entrance.storey` stated once); duplicated mechanisms ≈ 400 (2 %:
E-29's door run, E-28's notes, one edit table for §1b, §2.5, §4.1 and §4.3); verbose prose ≈ 1 600 (8 %). **Added**
≈ 3 900 words, all mandated: §3.13 (the edge catalogue, rules (a)–(d), 19 mechanism rows, 4 combination rows), T-V3-36
and T-V3-37, the §4.1 edit table, §4.6's `plan` and `crypt` section providers with their keys and the not-found line,
the crypt-edit dry runs and the wet-ground rule (§3.7.4), `doorRunPoint` (§3.7.1), §3.3's degenerate-run and basement-datum
rules, §5.4's lone-cluster rule, §11's and §13's tables.

**Below the band (25–40 %), not a defect:** the irreducible content is the default tables of §2.4 (≈ 8 900 words of
rows and cells), the rules of §3 (≈ 19 000 before §3.13), the bars of §7 (≈ 5 700) and the 129 reasoned decisions of §9
(≈ 8 400); the mandated additions above (≈ 3 900) and the set's self-citation form `V03 §x.y` (≈ 800 words over bare
numbers) hold the rest. No rule, case, value, bar, field, lifecycle row, test, owner rule or reason was cut. No unit
shrank by more than half (§10, §12, §13 and the head are narration or pointer chapters; their content lives at the
named homes).

**doc_checks** (`docs/validation/bench/doc_checks.py --doc <new V03> --heads docs/ARCHITECTURE.md`; PROVISIONAL — the
reference corpus is absent in the cloud checkout, so the clean-room result is not authoritative): C1 0, C2 0, C4 0, S1 0;
C3 336 (505 before; section-number runs and generic phrases); S2 78 (volume pointers `Vnn §x.y` read against the
base's headings, as in every earlier round — no base pointer unresolved).

## 2 Verification run on the assembled text

* Ids: 37 test ids T-V3-1 – T-V3-37 each defined once and every cited one defined; 129 decision rows (J-V3.1 – J-V3.130
  without J-V3.110), each defined once and every cited one defined.
* References: every `V03 §x.y` resolves to a heading or a run-in subsection of the volume; every `Vnn §x.y` resolves to a
  heading of that volume; every bare `§x.y` resolves to a heading of the rewritten base (`new/base/*`) or is a chained
  citation after a volume pointer.
* Terms: no `lot` (MC-01; `BuildingInput.plot` is §2.6's), no "floor vault(s)" as a form (G-floorvault), no "first paint"
  (G-firstmap), no `Vn §` / `Vn-x.y` citation (G-cite), no bare BCR-29/30/43/45/46 (ID-BCR).
* Narration: no review-round label, seam or critique tag, receipt, hash or scratchpad path; one marker line.
* Warning codes: `W_` only in `PlanReport.warnings` (seven codes, `W_STOREY_RUN` new); the three information ids are
  `PlanReport.notes` everywhere (E-28).
* A defect of the mechanical pass was found and repaired: `clean.py`'s self-citation rule had turned ten `aspectMax`
  cells of §2.4's role table (`2.5`) into `V03 §2.5`; restored, and every other conversion's source context audited.

## 3 Rulings applied

### 3.1 Conflicts (6)

| ruling | applied at |
|---|---|
| MC-01 — `lot` retired; `BuildingInput.plot` | no `lot` remains; V03 reads `BuildingInput` through §2.6 (its `plot` field) |
| V04-XCONF-2 — PageUp/PageDown precedence stated once in §14 | V03 §4.5 cites §14's keymap (the storey while a plan's switcher is shown, else V04's depth band); §14 (scope 07-s14 l. 472) states it |
| V04-XCONF-3 — T-V4-50 gains elaboration-independence | T-V3-23 (g) cites T-V4-50's matching clause; the hand-off is routed to V04 (cross-part note 1) |
| V09-XAGREE-2 — the crypt-edit dry runs are V03's | V03 §3.7.4 *Crypt-edit dry runs*; V03 §4.2 cites them; J-V3.130 (J-V3.47 marked *Amended by J-V3.130*); T-V3-11 (v); XV-V9-5 closed |
| V10-XAGREE-4 — the wet-ground rule | V03 §3.7.4 *On wet ground* (an `always` class the `raised` crypt; any other church no crypt, ledger slabs; J-V3.44); T-V3-23 (k); G-floorvault replaced (V03 §3.7.4, J-V3.44's wording, §13) |
| CANON-C03 — §11 a table of decisions | V03 §11: Q1 answered yes (J122); §8 written to the decided order |

### 3.2 Elegance rulings (3), with their equivalence lists

* **E-24 — one mark on an amended or superseded decision row.** V03 §9's preamble states the form; J-V3.47 carries
  *Amended by J-V3.130*. Equivalence: [x] no row dropped by E-24 (J-V3.110 left under NARR-8, a separate ruling);
  [x] the governing row keeps the reason (J-V3.130 states what changed and why; J-V3.47 keeps its text).
* **E-28 — `PlanReport.notes` split from `warnings`.** V03 §2.3: `warnings.code` W_ codes only; `notes.id`
  `shrineOneRoom` | `solidMonument` | `stackCarried`. Equivalence: [x] same producer and readers (A1 and every step's
  failure handling write; the panel, the clerk's `planReport`, the why and the `plan` section, JSON `report`, §13.7's
  soft bands, T28-1, T-V3-35 read — V03 §1b's `PlanReport` row); [x] the three conditions reported as notes, not lost
  (V03 §2.3, §2.4's `'*'` row, §3.1, §3.2 A5 (b), §3.3 S6 and H4, §3.9, §4.6's cause keys).
* **E-29 — one door-run helper.** V03 §3.7.1 *The door run* (`doorRunPoint(run, target, ok)`); `basementDoor(b)` calls it
  with the side's midpoint and the vault test, `stackAccessDoor(b, a)` with `a.ground.at` and the approach-strip test.
  Equivalence: [x] `basementDoor`'s three ordered rules (wall walk-out, tomb door, fall walk-out), its crypt-vault clause
  from M6-U, `null` unless the access is `external` — V03 §3.7.1; [x] `stackAccessDoor`'s approach-strip clearance, the
  non-stair wing preference and its reported fallback — V03 §3.7.2 (1); [x] both pure, draw-free, of eager records, in
  `@plat/plots` at M3a, read by volume 1's entrance reserve — V03 §3.7.1, §3.7.2 (1), §1b. The two door-point
  definitions are the helper's two calls exactly: a run under two modules gives nothing (no door side / no door part);
  with `ok` always true the midpoint is returned (the span fits a side of two modules or more); the nearest admissible
  point, ties toward the first vertex, as both texts stated.

No unification beyond these three was made.

### 3.3 Id rulings

* **ID-BCR:** V04's BCR-29 and BCR-30 → BCR-V4-29, BCR-V4-30 (V03 §1's volume-4 reads, §2.4's `AccessHostRow`); V01's
  BCR-43 → BCR-V1-43 (V03 §1). No bare BCR-n remains.
* **ID-DUPDEF:** no id of this volume was defined twice; each request's amendment notes fold into §10's one row.
* **New ids:** J-V3.130; T-V3-36, T-V3-37; `W_STOREY_RUN`; `doorRunPoint`; the catalogue keys `info.plan.<cause>`
  (eleven causes), `info.plan.noRoom`, `info.crypt.presence.*`, `.form.*`, `.rank.*`, `.join`, `.none.*`.
  **Removed:** J-V3.110 (NARR-8). No renumbering of an existing id.

### 3.4 Wiring gaps (2)

* **W-HOOK-02** — the plan records and `BuildingGenerator.plan` name V03 as their builder at both ends: §2.6 (base) and
  V03 §1 *Scope* and §1b *Interfaces*.
* **V03-WGAP-1** — the `crypt` section provider (and the `plan` section's keys): V03 §1b *Interfaces*, V03 §4.6
  *Sections*, T-V3-12 (c); IN-V03-1 folded.

### 3.5 Terms, f items, owner question, cohesion

* **Terms:** G-cite (147 hits → `Vnn §x.y`; self-citations `V03 §x.y`), G-floorvault (3), G-firstmap (1).
* **f items cited as base text (48):** 218, 219, 225, 226, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240,
  242, 262, 263, 270, 273, 309, 324, 329, 334, 347, 351, 352, 353, 354, 370, 374, 420, 428, 432, 436, 450, 451, 457, 482,
  483, 505, 524, 567, 568, 578, 585 — with 241 and 346 (BCR-V3-26, BCR-V3-29's companion) — each cited by its base
  section, never restated; §10 is the pointer table (34 requests → items). Spot-checked present in the rewritten base:
  `R(s)`, `partName`, `declaredRooms`, the crypt ladder, `setHearth`, `moduleCells`, the room anchor's wing-relative
  storey, `planReport`, the unit rule's shared access, the PageUp/PageDown precedence, the item-28 fallback, T28-3,
  `BuildingStorey`, M6-P, `@plat/buildings`.
* **g items 111+:** none routed to this volume.
* **Owner question:** Q1 marked answered — yes (J122); no question falls under J121.
* **Cohesion checks:** §8 agrees with §16's M6-P row and INDEX §4 (P0, P1, P3 after M4 on base buildings; P2 once
  volume 4's access records exist; the rest after M6; 17.75–24.25 pw; PE inside M2b and M3a); §11 marks the question
  answered and §8, §3.6 W2 read it; §1b names producer and consumer for every piece, every hand-off closed here or
  routed (§13); one marker line, no ledger or round record.

## 4 Open findings routed here (36) — each closed

| finding | closed at |
|---|---|
| VOL-V03-V04-RESTATEMENTS-001 (label range) | V03 §5.1 and T-V3-14 cite §9.4; no value restated |
| VOL-V03-V04-RESTATEMENTS-002 (rung budget, cache line) | V03 §6 cites §12.7, §12.8; §1's hook row carries no value |
| VOL-V03-V04-RESTATEMENTS-003, V03-RESTATE-1 (`moduleCm` 50) | V03 §2.4's `PlanGeometryRow` is the home (its comment cites §2.6 step 4 for the use) |
| VOL-V03-V04-RESTATEMENTS-004 (trapdoor fallback) | V03 §3.7.1 and §3.9 cite §2.6 step 3 |
| V03-DUP-1 (derived list) | V03 §1b *Derived pieces* is the one list; §2.1 cites it |
| V03-DUP-2 (reader lists) | V03 §1b holds every reader; §2.5 drops its read column and cites §1b (§1b gained the two `Basement.crypt` nuances, the crypt stairs' and stack doors' readers) |
| V03-DUP-3 (storey-less plan) | V03 §3.1 step 2 is the one statement; S6, A5 (b), §3.4a, §3.9 cite it |
| V03-DUP-4 (`Entrance.storey`) | V03 §3.6 *Entrance storeys* is the one rule; §2.1 and the base's comment point to it |
| V03-DUP-5 (vault, capped bays, stair-entered) | defined once in V03 §3.7.4; §3.7.1, §3.7.5, O2 and §1b cite it |
| V03-DUP-6 (edit tables) | V03 §4.1's table (tool, event, semantics, §7.4 row, undo); §1b, §2.5, §4.3 cite it |
| V03-DUP-7 (hand-off tables) | V03 §13: one table into, one out of the volume, each row with its status |
| V03-ELEG-1 | E-28 |
| V03-ELEG-2 | E-29 |
| V03-EDGE-1 | V03 §3.3 (degenerate run → `n × stair.riserCm`, `W_STOREY_RUN`; zero-cell heights row → equal split; basement datum = the lowest ground wing's `baseCm`); §3.9 row; T-V3-36 (a) |
| V03-WGAP-1 | §3.4 above |
| V03-MISSING-1, V03-DEFER-3 | V03 §11 (answered, J122); V03 §8 written to the decided order, citing §16 and INDEX §4 |
| V03-DEFER-1, V03-DEFER-4 | V03 §2.4's `'*'` rows: the specialisation key is final; J-V3.93 rewritten as final |
| V03-DEFER-2 | V03 §3.12 (9): grade faces are V04's `gradeFaces(chamberId)` (V04 §3.5.4 (f)); J-V3.98 final; §8's P2 dependency |
| V03-NARR-1 | one marker line |
| V03-NARR-2, V03-NARR-11 | ledgers and round records removed; §12 consolidated; §13 one live table; IN notes folded |
| V03-NARR-3, V03-NARR-4, V03-NARR-6 | provenance tags out of every normative row, step and bar |
| V03-NARR-5 | J-V3.84, J-V3.90 and §3.3's "V03 is unbuilt" sentences out; T-V3-34's remark out |
| V03-NARR-7 | §8's critique-recomputation sentence out |
| V03-NARR-8 | J-V3.110 removed |
| V03-NARR-9 | J-V3.111 – J-V3.129 in final form ("chose X over Y because Z"; "Also chose" for their sub-choices) |
| V03-NARR-10 | §10 one pointer row per request |
| V03-BREF-1 | no scratchpad receipt cited (§12 names the validation records) |
| V03:IN-V03-1, -2, -3 | folded (V03 §4.6, §4.2, §1); the Integration notes section keeps one pointer row each |

## 5 Edges (principle (11)) — 29 UNDEFINED, 26 UNTESTED, 6 owned combinations

All are defined in V03 §3.13 (rules (a)–(d) for the classes; table (e) per mechanism; table (f) for the combinations)
with their homes patched where the outcome is a mechanism's own: §3.3 (EI-V03-EDGE-1), §3.7.1 rule 3 (a cliff side),
§3.9 (degenerate-geometry row, `W_STOREY_RUN` row), §3.10 (no-draw cases), §4.2 (an edit on a building with no plan;
"nothing to change"), §4.6 (the not-found line), §5.4 (the lone-cluster rule). Tests: T-V3-36 (a)–(j) and T-V3-37
(a)–(g), placed in §8's phase exits, with the existing bars each row names.

| catalogue entries | outcome and rung | test |
|---|---|---|
| M-V03-445 E5 (§2.1) | §3.13 (e) row 1 | T-V3-34, T-V3-36 (b) |
| M-V03-535 E5 (§2.2) | §3.13 (e) row 2 | T-V3-9, T-V3-36 (b) |
| M-V03-1032 E1, E2, E5 (§3.1) | §3.13 (e) row 3; §3.1's storey-less plan | T-V3-1, T-V3-36 (c) |
| EI-V03-EDGE-1 (§3.3) | §3.3; §3.9 tier 2 | T-V3-36 (a) |
| M-V03-1372 E1, E2, E4 (§3.4) | §3.13 (e) row 5; (a) | T-V3-27, T-V3-36 (c), (d) |
| M-V03-1384 E1, E4, E8 (§3.4a) | §3.13 (e) row 6; (a), (d) | T-V3-29, T-V3-36 (d) |
| M-V03-1497 E4, E6 (§3.6) | §3.13 (e) row 7; (a), (b) | T-V3-6, T-V3-16, T-V3-37 (g) |
| M-V03-1636 E6 (§3.7) | §3.13 (b), (e) row 8 | T-V3-23, T-V3-37 (g) |
| M-V03-1921 E1, E2, E4, E5, E6 (§3.8) | §3.13 (e) row 9; (a), (b) | T-V3-8, T-V3-36 (e) |
| M-V03-1945 E4 (§3.9) | §3.9's degenerate-geometry row; §3.13 (a) | T-V3-17, T-V3-36 (d) |
| M-V03-1988 E1, E2 (§3.10) | §3.10's no-draw sentence | T-V3-20, T-V3-36 (h) |
| M-V03-2008 E4 (§3.11) | §3.13 (e) row 11; (a) | T-V3-9, T-V3-36 (b) |
| M-V03-2030 E1, E2, E4, E5, E8 (§3.12) | §3.13 (e) row 12; (a), (d) | T-V3-24, T-V3-32 |
| M-V03-2075 E8 (§4.1) | V03 §4.1's table; §3.13 (d) | T-V3-11 |
| M-V03-2091 E4 (§4.2) | §3.13 (a) (a refused edit bends to the nearest lawful module position) | T-V3-11, T-V3-20 |
| M-V03-2183 E4 (§4.3) | §3.13 (a) (a collapsed carried part orphaned and reported) | T-V3-9, T-V3-36 (b) |
| M-V03-2223 E1, E2, E4, E5, E6, E8 (§4.5) | §3.13 (e) row 14; (b), (d) | T-V3-36 (f) |
| M-V03-2268 E1, E2, E5, E8 (§4.6) | §3.13 (e) row 15; §4.6's not-found line | T-V3-12, T-V3-36 (j) |
| M-V03-2295 E1, E2, E4, E5, E6 (§5.1) | §3.13 (e) row 16; (a), (b) | T-V3-14 |
| M-V03-2360 E1 (§5.2) | §3.13 (e) row 17 | T-V3-36 (g) |
| M-V03-2369 E1, E2, E4, E5, E6, E7 (§5.3) | §3.13 (e) row 18; (a)–(c) | T-V3-13, T-V3-36 (g) |
| M-V03-2417 E2 (§5.4) | §3.13 (e) row 19; §5.4's lone-cluster rule | T-V3-14, T-V3-36 (i) |
| C-cliff-plan | §3.13 (f); §3.7.1 rule 3's cliff clause | T-V3-37 (a) |
| C-steep-plan | §3.13 (f) | T-V3-18, T-V3-37 (b) |
| C-coast-plan, C-moat-plan, C-oasis-plan | §3.13 (f) | T-V3-37 (c)–(e) |
| C-frame-plan | §3.13 (f) | T-V3-37 (f) |

## 6 Hand-offs

**Closed here (13):** V02 X11; V06 X3, X18; V09 XV-V9-5, XV-V9-15; V10 CVR-V10-2, CVR-V10-9; V11 X-V11-16 (d);
V12 X-V12-4, X-V12-15, X-V12-16, X-V12-17, X-V12-18 — each row of V03 §13's first table names its home.
**Out of this volume (V03-0486 – V03-0491):** V03 §13's second table; the rows already stated at their destination are
marked so; the rest are cross-part notes 1–4 below.

## 7 CROSS-PART NOTES

1. **V04 (rewrite-V04).** T-V4-50 gains V04-XCONF-3's clause — with no building elaborated, the set of crypt joins equals
   the set after elaborating every church; V03's T-V3-23 (g) cites it. V03 cites `gradeFaces(chamberId)` at V04
   §3.5.4 (f) (V03 §3.12 (9), §1b, J-V3.98, §8's P2) and the band keys at V04 §5.1 under §14's precedence.
2. **V09 (rewrite-V09).** §4.17.5 (e) words V03 §3.7.4's dry runs and cites them: `bend.crypt.largest` "stops at {share}
   of the cathedral's" (the cap `crypt.rankShare` × the principal's area, not "just short of it"), `bend.crypt.cathedral`
   the smallest lawful size (the class's smallest `cryptM2` cell), the crypt join's closing as a fate (V09-XAGREE-2);
   the church Below line drops "floor vaults (wet ground)" and cites V03 §3.7.4's wet-ground rule (V10-XAGREE-4).
   XV-V9-5 and XV-V9-15 are closed at V03 §3.7.4 and §4.2. V09's catalogue (V09 §4.9) holds the words of the keys V03
   §4.6 names: `info.plan.<cause>` for the eleven causes, `info.plan.noRoom`, and `info.crypt.presence.*`, `.form.*`,
   `.rank.*`, `.join`, `.none.row`, `.none.wet`.
3. **V10 (rewrite-V10).** §3.9a's `crypt` rows as V03 §4.6 words them (wet ground: "no crypt: ledger slabs in the
   chancel floor"; the `raised` form "a raised-choir crypt"); CVR-V10-9's list reads V03's eleven causes — `landingDoor`,
   `terraceDoor`, `terraceExit`, `seatingExit`, `walkOut`, `tombDoor`, `gradeFace`, `deckNoCellar` (not `deckRefusal`),
   `stoop`, `exposure`, `stackCarried`; CVR-V10-2 and CVR-V10-9 are closed at V03 §4.6.
4. **V05 (rewrite-V05).** `levelledGroundCm`'s reader list may name V03 §3.6's W2 outside sample (it reads the exposure
   gates, `Entrance.storey`, the walk-out and the outside digest).
5. **V01 (rewrite-V01).** `basementDoor(b)`'s rule 3 now takes no side whose sample lies across a cliff edge (V03 §3.7.1,
   §3.13 (f)); volume 1's entrance reserve reads the function's value and needs no text change. V01's rows for
   `basementDoor(b)` and `stackAccessDoor(b, a)` may cite V03 §3.7.1's `doorRunPoint` as their shared core (E-29).
6. **Scope (§13, §16, INDEX).** V03 §8 agrees with §16's M6-P row and INDEX §4 as they stand — no change asked. B-PLAN
   (§13.2) gains the edge fixtures of T-V3-36 and T-V3-37 (a wing edited below one riser per storey, a basement under
   wings of different datums, cliff, steep, coastal, moat-with-deck-bridge, oasis and frame-edge buildings, a rung sweep);
   their bars add no price. §14's keymap states the PageUp/PageDown precedence V03 §4.5 cites (present at 07-s14 l. 472).
7. **Model §2.6 (landed).** V03 now cites §2.6's declaration of `basementDoor(b)` (no restated signature), §2.6's crypt
   ladder and lift (V03 §3.7.4's `always` bullet) and §2.6 *Basements*' walk-out; §2.6's `Entrance.storey` comment and
   `Basement.crypt` comment already point to V03 §3.6 and §3.7.4. Should the base wish, *Basements* may cite V03 §3.7.4
   for the non-`always` church's wet-ground outcome (no crypt, ledger slabs); nothing else is asked.
8. **Rendering §11.1 (landed).** §11.1 points to V03 §5.3 for the plan's CityJSON, glTF and per-storey scene content, so
   V03 §5.3 stays their home (the canon's reference role for V03-0294 – V03-0298 is answered by the landed text).
   Pipeline §4.12 likewise names V03 §2.4's `workLimits.json` row as the home (V03-0146).
9. **V02.** V03 §3.6 W2 cites V02 §8.1 for `facadeBays`, `endMarginM` and `bayM` moved forward under the decided order;
   X11 is closed at V03.
10. **V06, V11, V12.** X3 and X18 (V06), X-V11-16 (d) (V11) and X-V12-4, -15, -16, -17, -18 (V12) are closed at V03
    §2.4, §2.5, §3.7.4 and §8; nothing is owed back.
11. **V07.** A village class added to V07 §2.4 takes a `composition.classFamily` row in volume 2 and, only where that
    row's programme misfits it, a programme row here (J-V3.111, J-V3.112) — a standing rule, nothing owed now.

## 8 MAPPING TABLE — every inventory id of the volume → where it now lives

Role = the canon's role for the id (`home`: stated here; `reference`: replaced by a pointer; `bcr-pointer`: §10's row;
`index-row`: a §9 row; `glossary`: a term defined at its home; `handoff`: §13; `answer-J121-J122`: §11).

| id | kind | source § | canon role | now at |
|---|---|---|---|---|
| V03-0001 | summary | 0 | home | V03 §0 |
| V03-0002 | summary | 0 | home | V03 §0 |
| V03-0003 | summary | 0 | home | V03 §0 |
| V03-0004 | summary | 0 | home | V03 §0 |
| V03-0005 | summary | 0 | home | V03 §0 |
| V03-0006 | scope | 1 | home | V03 §1 |
| V03-0007 | rule | 1 | reference | V03 §1 Scope — cites §2.6, §2.8, §2.9 (reference) |
| V03-0008 | hook | 1 | index-row | V03 §1 |
| V03-0009 | hook | 1 | index-row | V03 §1 |
| V03-0010 | hook | 1 | index-row | V03 §1 |
| V03-0011 | hook | 1 | index-row | V03 §1 |
| V03-0012 | hook | 1 | index-row | V03 §1 |
| V03-0013 | hook | 1 | index-row | V03 §1 |
| V03-0014 | hook | 1 | index-row | V03 §1 |
| V03-0015 | hook | 1 | index-row | V03 §1 |
| V03-0016 | hook | 1 | index-row | V03 §1 |
| V03-0017 | hook | 1 | index-row | V03 §1 |
| V03-0018 | hook | 1 | index-row | V03 §1 |
| V03-0019 | hook | 1 | index-row | V03 §1 |
| V03-0020 | hook | 1 | index-row | V03 §1 |
| V03-0021 | hook | 1 | index-row | V03 §1 |
| V03-0022 | hook | 1 | index-row | V03 §1 |
| V03-0023 | hook | 1 | index-row | V03 §1 |
| V03-0024 | hook | 1 | index-row | V03 §1 |
| V03-0025 | hook | 1 | index-row | V03 §1 |
| V03-0026 | hook | 1 | index-row | V03 §1 |
| V03-0027 | hook | 1 | index-row | V03 §1 |
| V03-0028 | hook | 1 | index-row | V03 §1 |
| V03-0029 | hook | 1 | index-row | V03 §1 |
| V03-0030 | hook | 1 | index-row | V03 §1 |
| V03-0031 | hook | 1 | index-row | V03 §1 |
| V03-0032 | hook | 1 | index-row | V03 §1 |
| V03-0033 | hook | 1 | index-row | V03 §1 |
| V03-0034 | hook | 1 | index-row | V03 §1 |
| V03-0035 | hook | 1 | index-row | V03 §1 |
| V03-0036 | hook | 1 | index-row | V03 §1 |
| V03-0037 | hook | 1 | index-row | V03 §1 |
| V03-0038 | hook | 1 | index-row | V03 §1 |
| V03-0039 | hook | 1 | index-row | V03 §1 |
| V03-0040 | hook | 1 | index-row | V03 §1 |
| V03-0041 | hook | 1 | index-row | V03 §1 |
| V03-0042 | hook | 1 | index-row | V03 §1 |
| V03-0043 | hook | 1 | index-row | V03 §1 |
| V03-0044 | hook | 1 | index-row | V03 §1 |
| V03-0045 | hook | 1 | index-row | V03 §1 |
| V03-0046 | hook | 1 | index-row | V03 §1 |
| V03-0047 | hook | 1 | index-row | V03 §1 |
| V03-0048 | hook | 1 | index-row | V03 §1 |
| V03-0049 | hook | 1 | index-row | V03 §1 |
| V03-0050 | hook | 1 | index-row | V03 §1 |
| V03-0051 | hook | 1 | index-row | V03 §1 |
| V03-0052 | hook | 1 | index-row | V03 §1 |
| V03-0053 | hook | 1 | home | V03 §1 |
| V03-0054 | hook | 1 | index-row | V03 §1 |
| V03-0055 | scope | 1 | index-row | V03 §1 |
| V03-0056 | rule | 1b | home | V03 §1b |
| V03-0057 | table | 1b | home | V03 §1b |
| V03-0058 | table | 1b | home | V03 §1b |
| V03-0059 | table | 1b | home | V03 §1b |
| V03-0060 | table | 1b | home | V03 §1b |
| V03-0061 | table | 1b | home | V03 §1b |
| V03-0062 | table | 1b | home | V03 §1b |
| V03-0063 | table | 1b | reference | V03 §1b Tables (`WorkLimitLaw` row) — cites §4.12 |
| V03-0064 | table | 1b | home | V03 §1b |
| V03-0065 | table | 1b | home | V03 §1b |
| V03-0066 | record | 1b | home | V03 §1b |
| V03-0067 | record | 1b | home | V03 §1b |
| V03-0068 | record | 1b | home | V03 §1b |
| V03-0069 | record | 1b | home | V03 §1b |
| V03-0070 | record | 1b | home | V03 §1b |
| V03-0071 | record | 1b | home | V03 §1b |
| V03-0072 | record | 1b | reference | V03 §1b Records (`Entrance.faces` `tunnel`) — cites V04 §1b |
| V03-0073 | record | 1b | home | V03 §1b |
| V03-0074 | record | 1b | home | V03 §1b |
| V03-0075 | record | 1b | reference | V03 §1b Records (`Entrance.storey`) — cites §2.6, rule V03 §3.6 |
| V03-0076 | record | 1b | home | V03 §1b |
| V03-0077 | record | 1b | home | V03 §1b |
| V03-0078 | record | 1b | reference | V03 §1b Records (`BaseWing.partName`) — cites §2.6, lifecycle V03 §2.5 |
| V03-0079 | interface | 1b | home | V03 §1b |
| V03-0080 | mechanism | 1b | home | V03 §1b |
| V03-0081 | mechanism | 1b | home | V03 §1b |
| V03-0082 | mechanism | 1b | home | V03 §1b |
| V03-0083 | interface | 1b | home | V03 §1b |
| V03-0084 | interface | 1b | home | V03 §1b |
| V03-0085 | mechanism | 1b | reference | V03 §1b Derived pieces (grade faces) — cites V04 `gradeFaces(chamberId)` (V04 §3.5.4 (f)) |
| V03-0086 | interface | 1b | reference | V03 §1b Derived pieces (`onDeck(b)`) — cites V02 deck gate (BCR-V2-34) |
| V03-0087 | mechanism | 1b | home | V03 §1b |
| V03-0088 | mechanism | 1b | home | V03 §1b |
| V03-0089 | mechanism | 1b | home | V03 §1b |
| V03-0090 | step | 1b | home | V03 §1b |
| V03-0091 | step | 1b | home | V03 §1b |
| V03-0092 | interface | 1b | reference | V03 §1b Interfaces (`BuildingGenerator.plan`) — cites §2.6, §14 |
| V03-0093 | interface | 1b | reference | V03 §1b Interfaces (`compose(…, 'rooms')`) — cites V02 §3.8 |
| V03-0094 | interface | 1b | home | V03 §1b |
| V03-0095 | interface | 1b | home | V03 §1b |
| V03-0096 | edit | 1b | home | V03 §1b |
| V03-0097 | rule | 1b | home | V03 §1b |
| V03-0098 | record | 1b | home | V03 §1b |
| V03-0099 | rule | 1b | reference | V03 §1b *The dossier, end to end* — cites §7.7 |
| V03-0100 | rule | 1b | reference | V03 §1b *The dossier, end to end* — cites V11 §3.13 |
| V03-0101 | rule | 1b | reference | V03 §1b *The dossier, end to end* — cites V08 §2.6a |
| V03-0102 | rule | 1b | reference | V03 §1b *The dossier, end to end* — cites §2.8 |
| V03-0103 | record | 2.1 | home | V03 §2.1 |
| V03-0104 | record | 2.1 | home | V03 §2.1 |
| V03-0105 | field | 2.1 | home | V03 §2.1 |
| V03-0106 | field | 2.1 | home | V03 §2.1 |
| V03-0107 | field | 2.1 | home | V03 §2.1 |
| V03-0108 | field | 2.1 | home | V03 §2.1 |
| V03-0109 | field | 2.1 | home | V03 §2.1 |
| V03-0110 | record | 2.1 | home | V03 §2.1 |
| V03-0111 | field | 2.1 | home | V03 §2.1 |
| V03-0112 | field | 2.1 | home | V03 §2.1 |
| V03-0113 | field | 2.1 | reference | V03 §2.1 (field declared in §2.6; its rule V03 §3.6) |
| V03-0114 | field | 2.1 | reference | V03 §2.1 (field declared in §2.6; ring, rank and entry V03 §3.7.4) |
| V03-0115 | rule | 2.1 | home | V03 §2.1 |
| V03-0116 | rule | 2.2 | home | V03 §2.2 |
| V03-0117 | rule | 2.2 | home | V03 §2.2 |
| V03-0118 | table | 2.2 | home | V03 §2.2 |
| V03-0119 | rule | 2.2 | home | V03 §2.2 |
| V03-0120 | record | 2.3 | home | V03 §2.3 `PlanReport` — warnings W_ codes only, `notes` split (E-28) |
| V03-0121 | rule | 2.3 | home | V03 §2.3 |
| V03-0122 | rule | 2.4 | home | V03 §2.4 |
| V03-0123 | rule | 2.4 | home | V03 §2.4 |
| V03-0124 | record | 2.4 | home | V03 §2.4 |
| V03-0125 | record | 2.4 | home | V03 §2.4 |
| V03-0126 | record | 2.4 | home | V03 §2.4 |
| V03-0127 | constant | 2.4 | home | V03 §2.4 |
| V03-0128 | rule | 2.4 | home | V03 §2.4 |
| V03-0129 | table | 2.4 | home | V03 §2.4 |
| V03-0130 | table | 2.4 | home | V03 §2.4 |
| V03-0131 | rule | 2.4 | home | V03 §2.4 |
| V03-0132 | table | 2.4 | home | V03 §2.4 |
| V03-0133 | rule | 2.4 | home | V03 §2.4 |
| V03-0134 | table | 2.4 | home | V03 §2.4 |
| V03-0135 | table | 2.4 | home | V03 §2.4 |
| V03-0136 | table | 2.4 | home | V03 §2.4 |
| V03-0137 | table | 2.4 | home | V03 §2.4 |
| V03-0138 | rule | 2.4 | home | V03 §2.4 |
| V03-0139 | rule | 2.4 | home | V03 §2.4 |
| V03-0140 | table | 2.4 | home | V03 §2.4 |
| V03-0141 | rule | 2.4 | home | V03 §2.4 |
| V03-0142 | table | 2.4 | home | V03 §2.4 |
| V03-0143 | table | 2.4 | home | V03 §2.4 |
| V03-0144 | table | 2.4 | home | V03 §2.4 |
| V03-0145 | table | 2.4 | home | V03 §2.4 |
| V03-0146 | constant | 2.4 | reference | V03 §2.4 work-limit row (kept: base §4.12 points here — "its workLimits.json row V03 §2.4's") |
| V03-0147 | rule | 2.4 | home | V03 §2.4 |
| V03-0148 | table | 2.4 | home | V03 §2.4 |
| V03-0149 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0150 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0151 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0152 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0153 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0154 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0155 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0156 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0157 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0158 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0159 | lifecycle | 2.5 | reference | V03 §2.5 `Entrance.storey` row (lifecycle cells kept; the field and derivation cite §2.6) |
| V03-0160 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0161 | lifecycle | 2.5 | home | V03 §2.5 row (readers: V03 §1b) |
| V03-0162 | step | 3.1 | reference | V03 §3.1 (V03's own sub-step order inside §2.6's seven steps; cites §2.6) |
| V03-0163 | rule | 3.1 | home | V03 §3.1 step 2 — *The storey-less plan*, the one statement (DUP-3) |
| V03-0164 | rule | 3.1 | home | V03 §3.1 |
| V03-0165 | mechanism | 3.2 | home | V03 §3.2 |
| V03-0166 | mechanism | 3.2 | home | V03 §3.2 |
| V03-0167 | rule | 3.2 | home | V03 §3.2 |
| V03-0168 | rule | 3.2 | home | V03 §3.2 |
| V03-0169 | mechanism | 3.2 | home | V03 §3.2 |
| V03-0170 | rule | 3.2 | home | V03 §3.2 |
| V03-0171 | rule | 3.2 | home | V03 §3.2 |
| V03-0172 | rule | 3.2 | home | V03 §3.2 |
| V03-0173 | rule | 3.2 | home | V03 §3.2 |
| V03-0174 | rule | 3.2 | home | V03 §3.2 |
| V03-0175 | rule | 3.2 | home | V03 §3.2 |
| V03-0176 | rule | 3.2 | home | V03 §3.2 |
| V03-0177 | rule | 3.2 | home | V03 §3.2 |
| V03-0178 | rule | 3.2 | home | V03 §3.2 |
| V03-0179 | rule | 3.2 | home | V03 §3.2 |
| V03-0180 | rule | 3.2 | home | V03 §3.2 |
| V03-0181 | rule | 3.2 | home | V03 §3.2 A5 (b) — cites V03 §3.1's storey-less plan |
| V03-0182 | rule | 3.2 | home | V03 §3.2 |
| V03-0183 | rule | 3.2 | home | V03 §3.2 |
| V03-0184 | rule | 3.2 | home | V03 §3.2 |
| V03-0185 | rule | 3.2 | home | V03 §3.2 |
| V03-0186 | rule | 3.3 | home | V03 §3.3 |
| V03-0187 | mechanism | 3.3 | home | V03 §3.3 |
| V03-0188 | mechanism | 3.3 | home | V03 §3.3 |
| V03-0189 | rule | 3.3 | home | V03 §3.3 |
| V03-0190 | rule | 3.3 | home | V03 §3.3 |
| V03-0191 | rule | 3.3 | home | V03 §3.3 |
| V03-0192 | fallback | 3.3 | home | V03 §3.3 |
| V03-0193 | rule | 3.3 | home | V03 §3.3 |
| V03-0194 | rule | 3.3 | home | V03 §3.3 |
| V03-0195 | rule | 3.3 | home | V03 §3.3 |
| V03-0196 | rule | 3.3 | home | V03 §3.3 S6 *The solid stack's root* — cites V03 §3.1's storey-less plan (DUP-3) |
| V03-0197 | rule | 3.3 | home | V03 §3.3 |
| V03-0198 | rule | 3.3 | home | V03 §3.3 |
| V03-0199 | rule | 3.3 | home | V03 §3.3 |
| V03-0200 | rule | 3.3 | home | V03 §3.3 |
| V03-0201 | rule | 3.3 | home | V03 §3.3 |
| V03-0202 | rule | 3.4 | home | V03 §3.4 |
| V03-0203 | mechanism | 3.4a | home | V03 §3.4a |
| V03-0204 | mechanism | 3.5 | home | V03 §3.5 |
| V03-0205 | rule | 3.5 | home | V03 §3.5 |
| V03-0206 | mechanism | 3.5 | home | V03 §3.5 |
| V03-0207 | mechanism | 3.5 | home | V03 §3.5 |
| V03-0208 | rule | 3.5 | home | V03 §3.5 |
| V03-0209 | table | 3.5 | home | V03 §3.5 |
| V03-0210 | mechanism | 3.5 | home | V03 §3.5 |
| V03-0211 | rule | 3.5 | home | V03 §3.5 |
| V03-0212 | rule | 3.6 | home | V03 §3.6 |
| V03-0213 | mechanism | 3.6 | home | V03 §3.6 |
| V03-0214 | rule | 3.6 | home | V03 §3.6 |
| V03-0215 | rule | 3.6 | home | V03 §3.6 |
| V03-0216 | rule | 3.6 | home | V03 §3.6 |
| V03-0217 | rule | 3.6 | home | V03 §3.6 |
| V03-0218 | rule | 3.6 | home | V03 §3.6 |
| V03-0219 | rule | 3.6 | home | V03 §3.6 |
| V03-0220 | rule | 3.6 | home | V03 §3.6 |
| V03-0221 | rule | 3.6 | home | V03 §3.6 |
| V03-0222 | mechanism | 3.6 | home | V03 §3.6 |
| V03-0223 | rule | 3.6 | reference | V03 §3.6 *Entrance storeys* (kept: the one rule; base §2.6 points here; DUP-4) |
| V03-0224 | rule | 3.6 | home | V03 §3.6 |
| V03-0225 | rule | 3.6 | reference | V03 §3.6 W2 — cites V02 §8.1 and V03 §11 Q1 (J122) |
| V03-0226 | rule | 3.6 | home | V03 §3.6 |
| V03-0227 | rule | 3.6 | home | V03 §3.6 |
| V03-0228 | rule | 3.7.1 | home | V03 §3.7.1 |
| V03-0229 | rule | 3.7.1 | home | V03 §3.7.1 |
| V03-0230 | rule | 3.7.1 | reference | V03 §3.7.1 — the walk-out cites §2.6 *Basements* |
| V03-0231 | interface | 3.7.1 | home | V03 §3.7.1 — signature cited to §2.6's declaration; rules here; `doorRunPoint` (E-29) |
| V03-0232 | rule | 3.7.1 | home | V03 §3.7.1 |
| V03-0233 | rule | 3.7.1 | home | V03 §3.7.1 |
| V03-0234 | rule | 3.7.2 | home | V03 §3.7.2 |
| V03-0235 | rule | 3.7.2 | home | V03 §3.7.2 |
| V03-0236 | rule | 3.7.2 | home | V03 §3.7.2 |
| V03-0237 | interface | 3.7.2 | home | V03 §3.7.2 (1) `stackAccessDoor(b, a)` — span and point by `doorRunPoint` (E-29) |
| V03-0238 | rule | 3.7.2 | home | V03 §3.7.2 |
| V03-0239 | rule | 3.7.2 | home | V03 §3.7.2 |
| V03-0240 | rule | 3.7.2 | home | V03 §3.7.2 |
| V03-0241 | rule | 3.7.2 | home | V03 §3.7.2 |
| V03-0242 | rule | 3.7.3 | home | V03 §3.7.3 |
| V03-0243 | rule | 3.7.4 | reference | V03 §3.7.4 `always` bullet — the ladder's forms and lift cite §2.6 *Basements* |
| V03-0244 | rule | 3.7.4 | home | V03 §3.7.4 |
| V03-0245 | rule | 3.7.4 | home | V03 §3.7.4 |
| V03-0246 | rule | 3.7.4 | home | V03 §3.7.4 *The vault* and *A stair-entered crypt* (DUP-5) |
| V03-0247 | rule | 3.7.4 | home | V03 §3.7.4 — author's ring; wet-ground rule (V10-XAGREE-4, G-floorvault); crypt-edit dry runs (V09-XAGREE-2, J-V3.130) |
| V03-0248 | rule | 3.7.5 | home | V03 §3.7.5 |
| V03-0249 | rule | 3.7.6 | home | V03 §3.7.6 |
| V03-0250 | rule | 3.7.6 | home | V03 §3.7.6 |
| V03-0251 | rule | 3.7.6 | home | V03 §3.7.6 |
| V03-0252 | rule | 3.7.7 | home | V03 §3.7.7 |
| V03-0253 | rule | 3.8 | home | V03 §3.8 |
| V03-0254 | rule | 3.8 | home | V03 §3.8 |
| V03-0255 | table | 3.9 | home | V03 §3.9 — storey-less row cites V03 §3.1; trapdoor row cites §2.6 step 3; rows added for `W_STOREY_RUN` and degenerate geometry |
| V03-0256 | fallback | 3.9 | home | V03 §3.9 |
| V03-0257 | table | 3.10 | home | V03 §3.10 |
| V03-0258 | rule | 3.10 | home | V03 §3.10 |
| V03-0259 | rule | 3.11 | home | V03 §3.11 |
| V03-0260 | rule | 3.12 | home | V03 §3.12 |
| V03-0261 | rule | 3.12 | home | V03 §3.12 (9) — grade faces by V04 `gradeFaces(chamberId)` (DEFER-2; the fallback removed) |
| V03-0262 | rule | 3.12 | reference | V03 §3.12 (6), (10) — cites V04 §3.5.0a |
| V03-0263 | rule | 4.1 | home | V03 §4.1 |
| V03-0264 | rule | 4.2 | home | V03 §4.2 |
| V03-0265 | edit | 4.2 | home | V03 §4.2 |
| V03-0266 | edit | 4.2 | home | V03 §4.2 |
| V03-0267 | edit | 4.2 | home | V03 §4.2 |
| V03-0268 | edit | 4.2 | home | V03 §4.2 |
| V03-0269 | edit | 4.2 | home | V03 §4.2 |
| V03-0270 | edit | 4.2 | home | V03 §4.2 |
| V03-0271 | edit | 4.2 | home | V03 §4.2 |
| V03-0272 | edit | 4.2 | home | V03 §4.2 |
| V03-0273 | edit | 4.2 | reference | V03 §4.2 (V03's side of the owners' edits kept; cites V02 §3.17, §4.6) |
| V03-0274 | rule | 4.2 | home | V03 §4.2 |
| V03-0275 | rule | 4.3 | home | V03 §4.3 |
| V03-0276 | rule | 4.3 | home | V03 §4.3 |
| V03-0277 | rule | 4.3 | home | V03 §4.3 |
| V03-0278 | rule | 4.3 | home | V03 §4.3 |
| V03-0279 | rule | 4.3 | home | V03 §4.1 table (undo column); V03 §4.3 cites it (DUP-6) |
| V03-0280 | rule | 4.4 | home | V03 §4.4 |
| V03-0281 | rule | 4.5 | home | V03 §4.5 |
| V03-0282 | rule | 4.5 | home | V03 §4.5 |
| V03-0283 | rule | 4.5 | home | V03 §4.5 switcher — PageUp/PageDown cite §14's precedence (V04-XCONF-2) |
| V03-0284 | rule | 4.5 | home | V03 §4.5 |
| V03-0285 | rule | 4.5 | home | V03 §4.5 |
| V03-0286 | interface | 4.6 | home | V03 §4.6 |
| V03-0287 | interface | 4.6 | home | V03 §4.6 — `WhyProvider` (cites §2.8, V10 §2.13); *Sections* `plan` and `crypt` added (V03-WGAP-1) |
| V03-0288 | render | 5.1 | reference | V03 §5.1 *Stops* — cites §8.8 (reference) |
| V03-0289 | render | 5.1 | home | V03 §5.1 |
| V03-0290 | render | 5.1 | home | V03 §5.1 |
| V03-0291 | render | 5.1 | home | V03 §5.1 |
| V03-0292 | render | 5.1 | home | V03 §5.1 |
| V03-0293 | export | 5.2 | home | V03 §5.2 |
| V03-0294 | export | 5.3 | reference | V03 §5.3 JSON `plan` block (kept: base §11.1 points to V03 §5.3) |
| V03-0295 | export | 5.3 | reference | V03 §5.3 `.dd2vtt` per storey (kept: §11.1's profile cited; plan specifics here) |
| V03-0296 | export | 5.3 | reference | V03 §5.3 Foundry per storey (kept: plan specifics) |
| V03-0297 | export | 5.3 | reference | V03 §5.3 CityJSON (kept: base §11.1 "as V03 §5.3 states") |
| V03-0298 | export | 5.3 | reference | V03 §5.3 glTF `interiors` (kept: base §11.1 "per V03 §5.3") |
| V03-0299 | rule | 5.4 | home | V03 §5.4 |
| V03-0300 | budget | 6 | home | V03 §6 — budgets cite §12.7, §12.8 (values not restated) |
| V03-0301 | fallback | 6 | home | V03 §6 |
| V03-0302 | test | 7 | home | V03 §7 |
| V03-0303 | test | 7 | home | V03 §7 |
| V03-0304 | test | 7 | home | V03 §7 |
| V03-0305 | test | 7 | home | V03 §7 |
| V03-0306 | test | 7 | home | V03 §7 |
| V03-0307 | test | 7 | home | V03 §7 |
| V03-0308 | test | 7 | home | V03 §7 T-V3-23 — (g) cites T-V4-50 (V04-XCONF-3); (k) wet ground added |
| V03-0309 | test | 7 | home | V03 §7 |
| V03-0310 | test | 7 | home | V03 §7 |
| V03-0311 | test | 7 | home | V03 §7 |
| V03-0312 | test | 7 | home | V03 §7 |
| V03-0313 | test | 7 | home | V03 §7 |
| V03-0314 | decision | 8 | home | V03 §8 |
| V03-0315 | table | 8 | home | V03 §8 PE row (base items cited by section) |
| V03-0316 | table | 8 | home | V03 §8 P0 row |
| V03-0317 | table | 8 | home | V03 §8 P2 row — grade faces by V04 `gradeFaces` |
| V03-0318 | decision | 8 | home | V03 §8 |
| V03-0319 | rule | 8 | home | V03 §8 |
| V03-0320 | decision | 8 | reference | V03 §8 *Where in §16's order* — §16's M6-P row is the home (reference) |
| V03-0321 | decision | 9 | home | V03 §9 row J-V3.1 |
| V03-0322 | decision | 9 | home | V03 §9 row J-V3.2 |
| V03-0323 | decision | 9 | home | V03 §9 row J-V3.3 |
| V03-0324 | decision | 9 | home | V03 §9 row J-V3.4 |
| V03-0325 | decision | 9 | home | V03 §9 row J-V3.5 |
| V03-0326 | decision | 9 | home | V03 §9 row J-V3.6 |
| V03-0327 | decision | 9 | home | V03 §9 row J-V3.7 |
| V03-0328 | decision | 9 | home | V03 §9 row J-V3.8 |
| V03-0329 | decision | 9 | home | V03 §9 row J-V3.9 |
| V03-0330 | decision | 9 | home | V03 §9 row J-V3.10 |
| V03-0331 | decision | 9 | home | V03 §9 row J-V3.11 |
| V03-0332 | decision | 9 | home | V03 §9 row J-V3.12 |
| V03-0333 | decision | 9 | home | V03 §9 row J-V3.13 |
| V03-0334 | decision | 9 | home | V03 §9 row J-V3.14 |
| V03-0335 | decision | 9 | home | V03 §9 row J-V3.15 |
| V03-0336 | decision | 9 | home | V03 §9 row J-V3.16 |
| V03-0337 | decision | 9 | home | V03 §9 row J-V3.17 |
| V03-0338 | decision | 9 | home | V03 §9 row J-V3.18 |
| V03-0339 | decision | 9 | home | V03 §9 row J-V3.19 |
| V03-0340 | decision | 9 | home | V03 §9 row J-V3.20 |
| V03-0341 | decision | 9 | home | V03 §9 row J-V3.21 |
| V03-0342 | decision | 9 | home | V03 §9 row J-V3.22 |
| V03-0343 | decision | 9 | home | V03 §9 row J-V3.23 |
| V03-0344 | decision | 9 | home | V03 §9 row J-V3.24 |
| V03-0345 | decision | 9 | home | V03 §9 row J-V3.25 |
| V03-0346 | decision | 9 | home | V03 §9 row J-V3.26 |
| V03-0347 | decision | 9 | home | V03 §9 row J-V3.27 |
| V03-0348 | decision | 9 | home | V03 §9 row J-V3.28 |
| V03-0349 | decision | 9 | home | V03 §9 row J-V3.29 |
| V03-0350 | decision | 9 | home | V03 §9 row J-V3.30 |
| V03-0351 | decision | 9 | home | V03 §9 row J-V3.31 |
| V03-0352 | decision | 9 | home | V03 §9 row J-V3.32 |
| V03-0353 | decision | 9 | home | V03 §9 row J-V3.33 |
| V03-0354 | decision | 9 | home | V03 §9 row J-V3.34 |
| V03-0355 | decision | 9 | home | V03 §9 row J-V3.35 |
| V03-0356 | decision | 9 | home | V03 §9 row J-V3.36 |
| V03-0357 | decision | 9 | home | V03 §9 row J-V3.37 |
| V03-0358 | decision | 9 | home | V03 §9 row J-V3.38 |
| V03-0359 | decision | 9 | home | V03 §9 row J-V3.39 |
| V03-0360 | decision | 9 | home | V03 §9 row J-V3.40 |
| V03-0361 | decision | 9 | home | V03 §9 row J-V3.41 |
| V03-0362 | decision | 9 | home | V03 §9 row J-V3.42 |
| V03-0363 | decision | 9 | home | V03 §9 row J-V3.43 |
| V03-0364 | decision | 9 | home | V03 §9 row J-V3.44 (G-floorvault wording) |
| V03-0365 | decision | 9 | home | V03 §9 row J-V3.45 |
| V03-0366 | decision | 9 | home | V03 §9 row J-V3.46 |
| V03-0367 | decision | 9 | home | V03 §9 row J-V3.47 (*Amended by J-V3.130*; E-24) |
| V03-0368 | decision | 9 | home | V03 §9 row J-V3.48 |
| V03-0369 | decision | 9 | home | V03 §9 row J-V3.49 |
| V03-0370 | decision | 9 | home | V03 §9 row J-V3.50 |
| V03-0371 | decision | 9 | home | V03 §9 row J-V3.51 |
| V03-0372 | decision | 9 | home | V03 §9 row J-V3.52 |
| V03-0373 | decision | 9 | home | V03 §9 row J-V3.53 |
| V03-0374 | decision | 9 | home | V03 §9 row J-V3.54 |
| V03-0375 | decision | 9 | home | V03 §9 row J-V3.55 |
| V03-0376 | decision | 9 | home | V03 §9 row J-V3.56 |
| V03-0377 | decision | 9 | home | V03 §9 row J-V3.57 |
| V03-0378 | decision | 9 | home | V03 §9 row J-V3.58 |
| V03-0379 | decision | 9 | home | V03 §9 row J-V3.59 |
| V03-0380 | decision | 9 | home | V03 §9 row J-V3.60 |
| V03-0381 | decision | 9 | home | V03 §9 row J-V3.61 |
| V03-0382 | decision | 9 | home | V03 §9 row J-V3.62 |
| V03-0383 | decision | 9 | home | V03 §9 row J-V3.63 |
| V03-0384 | decision | 9 | home | V03 §9 row J-V3.64 |
| V03-0385 | decision | 9 | home | V03 §9 row J-V3.65 |
| V03-0386 | decision | 9 | home | V03 §9 row J-V3.66 |
| V03-0387 | decision | 9 | home | V03 §9 row J-V3.67 |
| V03-0388 | decision | 9 | home | V03 §9 row J-V3.68 |
| V03-0389 | decision | 9 | home | V03 §9 row J-V3.69 |
| V03-0390 | decision | 9 | home | V03 §9 row J-V3.70 |
| V03-0391 | decision | 9 | home | V03 §9 row J-V3.71 |
| V03-0392 | decision | 9 | home | V03 §9 row J-V3.72 |
| V03-0393 | decision | 9 | home | V03 §9 row J-V3.73 |
| V03-0394 | decision | 9 | home | V03 §9 row J-V3.74 |
| V03-0395 | decision | 9 | home | V03 §9 row J-V3.75 |
| V03-0396 | decision | 9 | home | V03 §9 row J-V3.76 |
| V03-0397 | decision | 9 | home | V03 §9 row J-V3.77 |
| V03-0398 | decision | 9 | home | V03 §9 row J-V3.78 |
| V03-0399 | decision | 9 | home | V03 §9 row J-V3.79 |
| V03-0400 | decision | 9 | home | V03 §9 row J-V3.80 |
| V03-0401 | decision | 9 | home | V03 §9 row J-V3.81 |
| V03-0402 | decision | 9 | home | V03 §9 row J-V3.82 |
| V03-0403 | decision | 9 | home | V03 §9 row J-V3.83 |
| V03-0404 | decision | 9 | home | V03 §9 row J-V3.84 (narration sentence out; NARR-5) |
| V03-0405 | decision | 9 | home | V03 §9 row J-V3.85 |
| V03-0406 | decision | 9 | home | V03 §9 row J-V3.86 |
| V03-0407 | decision | 9 | home | V03 §9 row J-V3.87 |
| V03-0408 | decision | 9 | home | V03 §9 row J-V3.88 |
| V03-0409 | decision | 9 | home | V03 §9 row J-V3.89 |
| V03-0410 | decision | 9 | home | V03 §9 row J-V3.90 (narration sentence out; NARR-5) |
| V03-0411 | decision | 9 | home | V03 §9 row J-V3.91 (withdrawal remark out) |
| V03-0412 | decision | 9 | home | V03 §9 row J-V3.92 |
| V03-0413 | decision | 9 | home | V03 §9 row J-V3.93 (final: the specialisation key; DEFER-1, DEFER-4) |
| V03-0414 | decision | 9 | home | V03 §9 row J-V3.94 |
| V03-0415 | decision | 9 | home | V03 §9 row J-V3.95 |
| V03-0416 | decision | 9 | home | V03 §9 row J-V3.96 (critique tag out) |
| V03-0417 | decision | 9 | home | V03 §9 row J-V3.97 |
| V03-0418 | decision | 9 | home | V03 §9 row J-V3.98 (final: V04 `gradeFaces`; DEFER-2) |
| V03-0419 | decision | 9 | home | V03 §9 row J-V3.99 |
| V03-0420 | decision | 9 | home | V03 §9 row J-V3.100 |
| V03-0421 | decision | 9 | home | V03 §9 row J-V3.101 |
| V03-0422 | decision | 9 | home | V03 §9 row J-V3.102 |
| V03-0423 | decision | 9 | home | V03 §9 row J-V3.103 |
| V03-0424 | decision | 9 | home | V03 §9 row J-V3.104 |
| V03-0425 | decision | 9 | home | V03 §9 row J-V3.105 |
| V03-0426 | decision | 9 | home | V03 §9 row J-V3.106 |
| V03-0427 | decision | 9 | home | V03 §9 row J-V3.107 |
| V03-0428 | decision | 9 | home | V03 §9 row J-V3.108 |
| V03-0429 | decision | 9 | home | V03 §9 row J-V3.109 |
| V03-0430 | decision | 9 | home | removed — process record (NARR-8); design content in J-V3.109 and V03 §4.2's deck bend |
| V03-0431 | decision | 9 | home | V03 §9 row J-V3.111 (round labels and amendment layers folded, NARR-9) |
| V03-0432 | decision | 9 | home | V03 §9 row J-V3.112 (round labels and amendment layers folded, NARR-9) |
| V03-0433 | decision | 9 | home | V03 §9 row J-V3.113 (round labels and amendment layers folded, NARR-9) |
| V03-0434 | decision | 9 | home | V03 §9 row J-V3.114 (round labels and amendment layers folded, NARR-9) |
| V03-0435 | decision | 9 | home | V03 §9 row J-V3.115 (round labels and amendment layers folded, NARR-9) |
| V03-0436 | decision | 9 | home | V03 §9 row J-V3.116 (round labels and amendment layers folded, NARR-9) |
| V03-0437 | decision | 9 | home | V03 §9 row J-V3.117 (round labels and amendment layers folded, NARR-9) |
| V03-0438 | decision | 9 | home | V03 §9 row J-V3.118 (round labels and amendment layers folded, NARR-9) |
| V03-0439 | decision | 9 | home | V03 §9 row J-V3.119 (round labels and amendment layers folded, NARR-9) |
| V03-0440 | decision | 9 | home | V03 §9 row J-V3.120 (round labels and amendment layers folded, NARR-9) |
| V03-0441 | decision | 9 | home | V03 §9 row J-V3.121 (round labels and amendment layers folded, NARR-9) |
| V03-0442 | decision | 9 | home | V03 §9 row J-V3.122 (round labels and amendment layers folded, NARR-9) |
| V03-0443 | decision | 9 | home | V03 §9 row J-V3.123 (round labels and amendment layers folded, NARR-9) |
| V03-0444 | decision | 9 | home | V03 §9 row J-V3.124 (round labels and amendment layers folded, NARR-9) |
| V03-0445 | decision | 9 | home | V03 §9 row J-V3.125 (round labels and amendment layers folded, NARR-9) |
| V03-0446 | decision | 9 | home | V03 §9 row J-V3.126 (round labels and amendment layers folded, NARR-9) |
| V03-0447 | decision | 9 | home | V03 §9 row J-V3.127 (round labels and amendment layers folded, NARR-9) |
| V03-0448 | decision | 9 | home | V03 §9 row J-V3.128 (round labels and amendment layers folded, NARR-9) |
| V03-0449 | decision | 9 | home | V03 §9 row J-V3.129 (round labels and amendment layers folded, NARR-9) |
| V03-0450 | rule | 10 | home | V03 §10 pointer row BCR-V3-25 (base text via file f; bcr-pointer) |
| V03-0451 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-1 (base text via file f; bcr-pointer) |
| V03-0452 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-2 (base text via file f; bcr-pointer) |
| V03-0453 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-3 (base text via file f; bcr-pointer) |
| V03-0454 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-4 (base text via file f; bcr-pointer) |
| V03-0455 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-5 (base text via file f; bcr-pointer) |
| V03-0456 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-6 (base text via file f; bcr-pointer) |
| V03-0457 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-7 (base text via file f; bcr-pointer) |
| V03-0458 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-8 (base text via file f; bcr-pointer) |
| V03-0459 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-9 (base text via file f; bcr-pointer) |
| V03-0460 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-10 (base text via file f; bcr-pointer) |
| V03-0461 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-11 (base text via file f; bcr-pointer) |
| V03-0462 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-12 (base text via file f; bcr-pointer) |
| V03-0463 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-13 (base text via file f; bcr-pointer) |
| V03-0464 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-14 (base text via file f; bcr-pointer) |
| V03-0465 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-15 (base text via file f; bcr-pointer) |
| V03-0466 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-16 (base text via file f; bcr-pointer) |
| V03-0467 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-17 (base text via file f; bcr-pointer) |
| V03-0468 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-18 (base text via file f; bcr-pointer) |
| V03-0469 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-19 (base text via file f; bcr-pointer) |
| V03-0470 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-20 (base text via file f; bcr-pointer) |
| V03-0471 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-21 (base text via file f; bcr-pointer) |
| V03-0472 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-22 (base text via file f; bcr-pointer) |
| V03-0473 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-23 (base text via file f; bcr-pointer) |
| V03-0474 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-24 (base text via file f; bcr-pointer) |
| V03-0475 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-25 (base text via file f; bcr-pointer) |
| V03-0476 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-26 (base text via file f; bcr-pointer) |
| V03-0477 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-27 (base text via file f; bcr-pointer) |
| V03-0478 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-28 (base text via file f; bcr-pointer) |
| V03-0479 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-29 (base text via file f; bcr-pointer) |
| V03-0480 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-30 (base text via file f; bcr-pointer) |
| V03-0481 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-31 (base text via file f; bcr-pointer) |
| V03-0482 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-32 (base text via file f; bcr-pointer) |
| V03-0483 | bcr | 10 | bcr-pointer | V03 §10 pointer row BCR-V3-33 (base text via file f; bcr-pointer) |
| V03-0484 | owner-question | 11 | answer-J121-J122 | V03 §11 table — Q1 answered: yes (J122) |
| V03-0485 | rule | 12 | home | V03 §12 (consolidated; round receipts to the validation records) |
| V03-0486 | handoff | 13 | handoff | V03 §13 *Hand-offs from this volume* — V04 rows |
| V03-0487 | handoff | 13 | handoff | V03 §13 *Hand-offs from this volume* — V11 row (the `'*'` class-id request closed: specialisation values, J-V3.93) |
| V03-0488 | handoff | 13 | handoff | V03 §13 *Hand-offs from this volume* — V06 row |
| V03-0489 | handoff | 13 | handoff | V03 §13 *Hand-offs from this volume* — V01 row |
| V03-0490 | handoff | 13 | handoff | V03 §13 *Hand-offs from this volume* — V02 row |
| V03-0491 | handoff | 13 | handoff | V03 §13 *Hand-offs from this volume* — V09, V10 rows |
| V03-0492 | interface | IN | home | V03 §4.6 *Sections*; V03 §1b Interfaces; *Integration notes* pointer row IN-V03-1 |
| V03-0493 | rule | IN | home | V03 §4.2 (bend lead, deck bullet), V03 §1; *Integration notes* pointer rows IN-V03-2, IN-V03-3 |
| V03-0494 | term | 3.3 | glossary | V03 §3.3 (definition kept at its home) |
| V03-0495 | term | 3.3 | glossary | V03 §3.3 (definition kept at its home) |
| V03-0496 | term | 3.7.4 | glossary | V03 §3.7.4 (definition kept at its home) |
| V03-0497 | term | 3.7.1 | glossary | V03 §3.7.1 (definition kept at its home) |
| V03-0498 | term | 3.7.4 | glossary | V03 §3.7.4 (definition kept at its home) |
| V03-0499 | term | 3.7.4 | glossary | V03 §3.7.4 (definition kept at its home) |
| V03-0500 | term | 3.7.4 | glossary | V03 §3.7.4 (definition kept at its home) |
| V03-0501 | term | 3.7.1 | glossary | V03 §3.7.1 (definition kept at its home) |
| V03-0502 | term | 3.7.2 | glossary | V03 §3.7.2 (definition kept at its home) |
| V03-0503 | term | 3.3 | glossary | V03 §3.3 (definition kept at its home) |
| V03-0504 | term | 3.4a | glossary | V03 §3.4a (definition kept at its home) |
| V03-0505 | term | 3.3 | glossary | V03 §3.3 (definition kept at its home) |
| V03-0506 | term | 3.6 | glossary | V03 §3.6 (definition kept at its home) |
| V03-0507 | term | 3.6 | glossary | V03 §3.6 (definition kept at its home) |
| V03-0508 | term | 3.7.1 | glossary | V03 §3.7.1 (definition kept at its home) |
| V03-0509 | term | 3.7.2 | glossary | V03 §3.7.2 (definition kept at its home) |
| V03-0510 | term | 2.4 | glossary | V03 §2.4 (definition kept at its home) |
| V03-0511 | term | 3.2 | glossary | V03 §3.2 (definition kept at its home) |
| V03-0512 | term | 3.5 | glossary | V03 §3.5 (definition kept at its home) |
| V03-0513 | term | 3.12 | glossary | V03 §3.12 (definition kept at its home) |

