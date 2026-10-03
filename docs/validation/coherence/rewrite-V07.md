# Rewrite — design volume V07 (the village product)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V07; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V07`, 2026-10-02/03, cloud continuation; the lane had no STARTED line before this run)
- P1 inputs gathered (canon unit V07, 13 conflicts, 45 f items, g items 111 and 113 with the landed base texts, 26 hand-offs, 82 open edges, the inventory's 333 V07 items): done
- P2 citation pass (G-cite, S7) by script: `work/rewrite-V07/convert.py`, `convert2.py` → `converted2.md`: done
- P3 new text by part, `work/rewrite-V07/parts/00-head.md` … `22-notes.md` (scripted edits in `work/rewrite-V07/edits/`, hand-written parts 00–02, 15, 21, 22): done
- P4 assembly `work/rewrite-V07/assemble.sh` (+ `post.py`) → `docs/validation/coherence/new/volumes/V07-village.md`: done
- P5 sweeps (narration ids, retired terms, ids, self-references, cross-volume row prefixes, doc_checks): done
- P6 this report, the results file, LANDED: done

Source: `docs/volumes/V07-village.md` (4 520 lines). Output: `docs/validation/coherence/new/volumes/V07-village.md` (3 732
lines). Same title line; one marker line; the section structure kept (§0–§13 and *Integration notes*), with two
subsections added (V07 §3.12a for item 113, V07 §3.17 for the edges).

## 1 Sizes and the shrink goal

| measure | before | after | change |
|---|---|---|---|
| words (the canon's count, whitespace tokens) | 104 422 | 91 368 | −12.5 % |
| words (`wc -w`) | 102 339 | 89 537 | −12.5 % |

Removed, by source (approximate, the canon's count):
* **Narration** ≈ 15 400 — the stacked banners, PROGRESS and eight lane ledgers and the reading record (2 371 → 191 in the
  head); the reconciliation rounds 1–6, their continuations and the finalization appendix (8 785 → 0); §12's per-lane
  reading records (3 047 → ≈ 700, now one CONFIRMED and one PLAUSIBLE list); §13's round history (808 → ≈ 210, the list
  closed); the integration notes (434 → a 216-word pointer table); 397 seam and critique ids and their round phrases in
  the body (≈ 1 300).
* **Restatement** ≈ 6 100 — §10's 38 request texts (5 627 → ≈ 690, a pointer table to the applied items); §1's
  cross-volume dependency list rewritten as facts cited at their homes; §4.2's restated `EditEvent` forms (§7.1);
  V07-DUP-1's third and fourth statements of the records placement (W70 and §3.12 now cite V07 §2.1); V07-DUP-2's
  restated pin and decoration values (cited as `rules.pins` / `rules.manor` cells); the toll-bridge rule's village column
  (cited at V08 §2.6b (3), E-31); the church-family list (V11 §3.5.1); the street rate (V06 §3.5.2).
* **Duplicated mechanisms** ≈ 150 — the reference cell (§7.6, E-30), the stored `haPerHead` (E-38).
* **Verbose prose** ≈ 200.

Added ≈ 8 600 (mandated, new design at build depth): V07 §3.17's edge table (≈ 1 840; 82 open edges), V07 §3.12a (item
113, ≈ 1 120), V07 §3.2 (4a) (item 111, ≈ 520), T-V7-58 – T-V7-65 and the base-bars paragraph (≈ 1 100), the
`WhyProvider` rows (≈ 430), J-V7.134 – J-V7.142 (≈ 650), W74 – W76 and the trace additions (≈ 380), the new cells
(≈ 200), §8's J122 slot and costs (≈ 500), §1's hooks and facts (≈ 600), the rest in small clauses.

**Why the unit shrinks less than the band (25–40 %).** The volume is the build-depth home of a whole product — its own
stage set (VS1–VS8), two tables (`village.json`'s 60-odd typed cells, 25 class rows with presence laws, profiles and
supply rows), 76 wiring rows, 65 tests and 142 decisions — and every one of those is content the guard protects; the
narration and restatement it carried are gone (≈ 21 500 words), and the pass's own mandated additions (≈ 8 600) offset
part of that. No rule, case, value, bar, record field, lifecycle row, test or reasoned decision was thinned to meet the
goal. The unit shrinks by less than half, so no nuance audit is required by the half rule.

## 2 Decisions taken by this editor (each for the adjudicator to confirm)

1. **`ProductDecl`'s type stays at V07 §2.1.** The canon's V07-RESTATE-1 and VOL-V07-V08-RESTATEMENTS-001 ask to lift the
   interface into §4.12. File f item 202 names "V07 §2.1's type", and the landed base (pipeline §4.12 "(`ProductDecl`,
   V07 §2.1)", scope §14's `StrategyRegistry.products` comment, PART III) cites V07 §2.1; no base section declares it.
   Lifting it here would leave the base's citations dangling. One home is kept (V07 §2.1), every other unit cites it — the
   single-source aim is met. *Marked for the adjudicator:* confirm, or route the lift to the base editors and V07 then
   cites §4.12.
2. **The integration notes** are folded into the body at their homes (S9, ID-WX) and the section keeps a seven-row
   pointer table (the brief's "keep the Integration notes"); the IN-V07-n ids stay resolvable for `_integrate.md` and the
   validation records.
3. **V07-WGAP-2:** `density.bandWeight` is wired as the elevation band's weight in VS2's sum (default 1: no output
   change); `network.slack` and `network.emptyDensity` are deleted (read by no step: no output change; J-V7.139);
   `network.trailMinShare` is named in VS4 step 6.
4. **V07-WGAP-1:** the prose constants become cells — `palisade.denseDialFrom` (1.4), `palisade.pullM` (10 m),
   `palisade.section` (40 cm; 4 m and 3 m; 120 cm), `formRules.organicDialFrom` (0.75), `formRules.districtDensity` (1.5),
   `rules.perimeter.closeM` (20 m) — values unchanged; (9v) reads the polyfocal rule (V07-ICONF-4).
5. **V07-BREF-1:** `v.smithy` gains `K spread 200`, the spacing its COUNT reading already used (J-V7.142).
6. **SR6-08 (commonness):** V11's compiler is cited as the one producer of the `v.` rows' `commonness` (V11 §3.2.1 step
   5a); the roster-share definition stays in V07 §2.4 as the village rows' own rule (a cross-part note asks V11 to cite it).
7. **The edges' outcomes** in V07 §3.17 that were not stated before are defined there (e.g. an empty lasso makes an end
   anchored on its point with no plots; `island` with `roads: through` resolves to `isolated`, reported) — each the
   nearest lawful reading of existing rules, tested by T-V7-61 – T-V7-65.
8. **Item 111 at village rungs** reads its arid water through village cells `rules.aridWater` (multipliers on V07's VG
   water shares) rather than the base's absolute arid chances (J-V7.138), and scales the settlement's sun terms by the
   climate cell but not the hinterland's suitability (J-V7.134).
9. **Item 113 at village rungs** adds the data key `history.former` and the cells `rules.refound` (V07 §2.2a: heart 0.6,
   reach 200 m, follow weight 0.8, snap 15 m, foundation boost 2 — `own`, calibratable) — new design at build depth
   (J-V7.135 – J-V7.137); the refounded village reopens former ways by the decline ladder's `reopenWay` (item 268), the
   village's existing regrowth-first op.

## 3 Conflicts resolved (13)

| conflict | ruling applied | where |
|---|---|---|
| DIC-06 (ID-TOOL) | tools written with their word at first use (T8 `fill`, T9 `shape`, T10 `hold`, T11 `name`, T4 `road`, T5 `quarter`); mapping tables by row-set names | V07 §1b, §3.9, §3.11 |
| MC-11 | `Rung` (§1.1) and `TableId` (§7.6) are the base's types; V07 declares neither | V07 §2 intro |
| V02-ICONF-1 | `composition.classFamily`'s home is V02 §3.10.5; V07 cites it, read first; `templateFamily` for budget rows only | V07 §1's facts (3), §2.4, J-V7.82 |
| V07-ICONF-1 | `neighbourTracks` gloss "4 from about 227 people" | V07 §2.2 (law and table row) |
| V07-ICONF-2 | the centrepiece pond is the uncarved pond, never "the village pond" | V07 §3.6 (5) |
| V07-ICONF-3 | the ends cap gloss "6 from about 563 people" | V07 §3.10 |
| V07-ICONF-4 | (9v) spaced by the polyfocal rule, the 250 m floor at epochs | V07 §3.12 (9v) |
| V07-ICONF-5 | the stale "pending" sentences left with §12/§13's narration | V07 §12, §13 |
| V07-XCONF-1 | Q1 decided (a), J122; V-M0 right after M0 on M0's inputs, beside M1; V-M1 after M4 beside M5 | V07 §8 *Where it slots*, §11 |
| V07-XCONF-2 | §2.7's span rule (`country`, J-C4) cited; the fallback and IN-V07-2's stale reason gone | V07 §1's facts (1), §3.5a (7), §3.16 (1) |
| CANON-C01 | as V07-XCONF-1 | V07 §8 |
| CANON-C03 | §11 a table of the decision | V07 §11 |
| CANON-C04 | INDEX §7's V07 items closed here (TX-04, SR6-04 (b)–(c), SR6-08) | V07 §6, §12, §13, §2.4 |

## 4 File f items cited as base text (45) and the g items' parts

f items, each cited at its base home (V07 §10's pointer table; body citations by item number): 201, 202, 209, 214, 215,
244, 245, 255, 267, 268, 276, 279, 283, 287, 290, 292, 310, 312, 314, 315, 316, 317, 322, 326, 344, 357, 377, 378, 413, 418,
424, 430, 431, 432 (with 430), 436, 495, 505, 506, 516, 527, 528, 565, 568 (V07 §8: totals computed once), 576, 577, 579.
None is restated; V07 §10's request texts are removed.

* **g item 111** — the village crowding map's water pull and oasis villages: V07 §3.1 step 1 (arid shares, the oasis draw),
  V07 §3.2 (4a) (the oasis at village rungs, `water.proximity`, the heart's pull, the climate cell), V07 §3.3 (`p(x)`, the
  sun term's climate cell), V07 §3.7 (3) (the water term), V07 §3.9 (4) (gardens and grove), V07 §3.10 (wells by yield and
  coverage factor), V07 §3.11 DR1, V07 §2.2a (`heart.pull`, `aridWater`), V07 §3.15 (neutral under `VG`), V07 §1b W74,
  T-V7-58 (a `NoOpPin`), J-V7.134, J-V7.138.
* **g item 113** — a village over a former town and refounding at village rungs: V07 §3.12a (1)–(4), `history.former`,
  `rules.refound`, V07 §1b W75, V07 §4.5's remnant rows, V07 §5.4 (`symbolic` in exports), V07 §6's replay cost, T-V7-59 (a
  `NoOpPin`), J-V7.135 – J-V7.137, V07 §8 (with M6-E).

## 5 Wiring gaps closed

| gap | closure |
|---|---|
| W-IF-02 | the village `WhyProvider` (`VillagePlan`, `VillageField`, `VillageEnd`) as rows with `info.village.*` keys (V07 §4.5), its §1b row W76, its bar T-V7-60 |
| W-FLD-08 | `formSource` and `roadsSource` read by the village `WhyProvider` and the panel's plan card (V07 §2.3, W7, V07 §4.5) |
| V07-WGAP-1 | the six prose constants are cells (§2 item 4 above); T-V7-44's scan covers items 111 and 113 |
| V07-WGAP-2 | §2 item 3 above |

## 6 Elegance rulings applied (equivalence lists ticked)

* **E-01** (the stretch-state profile, §2.2 rule 5): V07 cites it for the palisade's graded stretches, the house-platform
  walls' decay and a former town's walls (V07 §1, §3.8a (9), §3.12a (2)). ☑ canonical form, writers, carry, undo and
  migrate are §2.2 rule 5's; ☑ RetainingWall's writers include V07's house-platform walls through V06's pool (V07 §3.12
  *Decline*); ☑ Enceinte's values and decline as V06 states — V07 restates no profile rule.
* **E-24** (one mark): every amended or superseded J-V7 row now states its final choice with one mark "— amended by X" /
  "— superseded in part by X" (J-V7.7, .10, .19, .20, .30, .42, .45, .82). ☑ no row dropped; ☑ the governing rows
  (J-V7.47, .53, .55, .61, .62, .71, .101, .115, .141) keep their reasons.
* **E-30** (the reference cell, §7.6): V07 §2.2a cites §7.6's form. ☑ the compile check (a missing row fails the build) is
  §7.6's and T-V7-44 runs it; ☑ `editTable`'s inverse and undo row are §7.6's; ☑ V07's references to V11 §3.6.1,
  §3.24.1 and §3.24.4 stand in the one form (`claimArea.cloister.footprintM2`, the four `terrace` cells, the deck depth read
  by kind).
* **E-31** (the toll-bridge watercourse at V08 §2.6b (3) with a rung column): V07 §3.1 step 1 and DR1 cite it, keeping only
  what V07's stages do (S0's type and topology, V07 §3.2 (2) step 2's bearings, VS4's bridge). ☑ geometry at village rungs
  (the course between the two frame arcs, topology raised to `through`) — at V08's column, with V07's stage steps here;
  ☑ coastal dry site an estuary — V08's column; ☑ failure → `toll_bridge_dry` (desert without `oasis_water` and no river
  drawn; relief that cannot carry the brook; a fixed `isolated`/`none` word) — V08's column, V07's outcome (the toll house
  at an entry, else on the heart's approach) kept here; T-V7-13's clause reads it. Cross-part note 2 lists the village
  column's clauses for V08.
* **E-38** (`haPerHead` derived): ☑ the farm rows' values unchanged (V07 §3.9 (1)); ☑ `A_T = a_h · P ÷ usableShare` with
  `a_h` their sum, 2.275 ha per head (V07 §3.2 (1); the frame figures 1.1 / 5.7 / 19.9 km²); ☑ V12's register: the farm
  rows are the calibratable cells, `haPerHead` leaves the register (cross-part note 6). A declared −1.1 % territory area
  (J-V7.141).
* **E-39** (keep apart) is respected: the palisade's stretch states, the ways' decline ladder and the building
  lifecycle stay separate mechanisms.

## 7 Id rulings and renumberings

* **ID-BCR:** V07's requests are `BCR-V7-n` in V07 §10's table only; the body cites the applied items.
* **ID-TOOL:** tools with their words (§3 above).
* **ID-WX:** other volumes' rows are written with their volume (`V06 X43`, `_integrate H30`); bare W/T/J ids are V07's.
* **ID-DR:** `DR-V8.1` → DR29 (W42); DR36–DR40 cited for items 111 and 113.
* **ID-DUPDEF:** one definition per id: T-V7-1 – T-V7-65, J-V7.1 – J-V7.142, W1 – W76 (W40 deleted) each defined once
  (checked by script).
* **New ids:** T-V7-58 – T-V7-65; J-V7.134 – J-V7.142; W74 – W76; V07 §3.12a; V07 §3.17. **Deleted:** W40 (a withdrawn
  placeholder; its clause stands at V07 §2.1). **Renumbered:** V07 §1's cross-volume list (1)–(14) → *Cross-volume facts*
  (1)–(8) by volume (inbound citations: cross-part notes 3 and 4).

## 8 Terms replaced

G-firstmap (9 → 0), G-cite (every self-reference `V07 §x`, every other volume `Vnn §x`; the old pointer convention
removed), G-dwell (`D`, `D_b`, `D_v`, `D_o` → `N`, `N_b`, `N_v`, `N_o`; `D(x)` stays the daylight share), G-DR (DR29),
G-digest (`site.deposits`), G-portpath (none left), G-floorvault (→ "no crypt; ledger slabs in the chancel floor (V03
§3.7.4)"), and the research files' section numbers written "section n" so a bare § is always the base.

## 9 Hand-offs closed (26) and the owner question

V02:X13 (V07 §2.4, J-V7.82), V02:X26 (V07 §2.4, §3.10a), V06:X4 (V07 §2.1's `phases`; the clamp is V06 §3.1 (4)'s),
V06:X22 (V07 §1's facts (5), §3.12 *Item 110's state*), V06:X27 (V07 §2.1 `rows`, §2.2 `epoch.rows`), V06:X32 (V07 §2.2,
§3.12), V06:X34 (items 268 and 209 cited), V06:X36 (V07 §3.12 *Village siting*), V06:X43 (V07 §2.1, §3.12, §3.14), V08:X7
(V07 §3.1 step 1), V08:X14 (V07 §3.11 burial records), V08:X22 (V07 §3.10, §3.11), V08:X23 (V07 §3.12 *Records* item 4,
T-V7-13), V09:XV-V9-9 (V07 §5.1 `LayerSpec.showCircuit`), V10:CVR-V10-14 (V07 §4.5's village words), V11:X-V11-2 (V07 §3.4,
§2.4), V11:X-V11-8 (V07 §2.2a's `terrace.slopeMin` a share), V11:X-V11-14 (V07 §2.1, §3.12), V11:X-V11-15 (V07 §3.15, §8),
V11:X-V11-17 (V07 §2.4, T-V7-56), V12:X-V12-2 (T-V7-29, §7's parity metrics), V12:X-V12-11 (T-V7-52 and the base-bars
paragraph), V12:X-V12-14 (§7's base-bars paragraph), V12:X-V12-15 (V07 §8's register paragraph), V12:X-V12-16 (every V07
§8 exit), V12:X-V12-17 (`--defaults --milestone <V-M0 … V-M4, V-M2u>`). Q1: decided (a), J122 (V07 §11, §8).

## 10 Edges (82) and open findings (54)

**Edges.** The 38 UNDEFINED and 44 UNTESTED edges of edges.md's V07 list are closed by V07 §3.17's table (outcome, failure
class on the ladder, test) with §5.1 (9)'s one degenerate-geometry rule, and by T-V7-61 (none and one), T-V7-62
(degenerate), T-V7-63 (save, load, undo, redo, regenerate, migrate), T-V7-64 (data), T-V7-65 (rungs and caps). No
combination owned by V07 was UNDEFINED; the four combinations V07 meets are named at their homes (V07 §3.17's last
paragraph).

**Open findings** (canon → V07), each FIXED in the text unless marked:

| finding | disposition |
|---|---|
| VOL-V07-V08-RESTATEMENTS-001, V07-RESTATE-1 | one home kept at V07 §2.1 (item 202 names it; the base cites it) — **marked for the adjudicator** (§2 item 1) |
| -002 | V07 §2.1 cites §1.1 and item 202 in one sentence |
| -003, V07-RESTATE-2 | V07 §2.2's persistence row cites V11 §3.5.1's tag as the list's home; T-V7-44 checks the keys |
| -004 | `villageForm` cited at §10.2 (items 430, 432) in V07 §2.7 |
| -005, V07-RESTATE-4 | V07 §3.12 cites V06 §3.5.2's street rate, no number |
| -006 | V07 §4.2 cites §7.1's forms (item 357) |
| -007, V07-RESTATE-3 | V07 §10 is a pointer table |
| V07-DUP-1 | the calls stated once at V07 §2.1; V07 §3.12 and W70 cite |
| V07-DUP-2 | values in V07 §2.2a; placement in V07 §3.9, §3.10; V07 §2.4, §3.9 (3) and (6) cite |
| V07-ICONF-1 – -5, V07-XCONF-1, -2 | §3 above |
| V07-ELEG-1 | E-30 |
| V07-ELEG-2 | E-38 |
| V07-ELEG-3 | IN-V07-3, -4, -5 folded (V07 §3.1 step 1, §3.4 step 5, §5.1, §4) |
| V07-WGAP-1, -2 | §5 above |
| V07-TERM-1 | G-cite |
| V07-TERM-2 | G-dwell |
| V07-TERM-3 | ID-WX |
| V07-TERM-4 | mapping tables by row-set names (`government`, `conditions`) or by description |
| V07-DEFER-1 | the fallbacks of the old dependencies (1) and (6) deleted; V04 §2.2, §3.5.1 and V06 §3.19.2 cited |
| V07-DEFER-2 | V07 §5.1 draws item 110's marks by §8.2's programs `retaining`, `raisedWay`, `way.stair`, `ruin`; no role left conditional |
| V07-DEFER-3 | FL-1 closed (row D5 alone); FL-4 closed (ids replaced or removed) |
| V07-DEFER-4 | TX-04, SR6-04 (b)–(c), SR6-08 closed (rows below) |
| V07-NARR-1 – -10 | the banners, ledgers, reading list, dependency history, W40, the "23:23 note" sentence, decision-row histories, §10's preamble, the appendix and §12's lane records removed |
| V07-BREF-1 | `v.smithy` `K spread 200` (J-V7.142) |
| TX-04 | V07 §6 prices `village.density` at a base-product epoch (≤ 6 ms), for V06 §6.2's row to cite |
| SR6-04 (b)–(c) | the round-6 sentences left with the narration |
| SR6-08 | V11's compiler cited as `commonness`'s producer (V07 §2.4, W18, J-V7.133) |
| IN-V07-1 – -7 | folded; the pointer table (§2 item 2) |

**V07's own Fix list:** FL-1 – FL-4 closed in V07 §13; §13 keeps no open item.

## 11 Closing checks

* Narration ids in the new text: 0 (the marker line and FL-4's description excepted). Retired terms: 0.
* Every `V07 §x` resolves to a heading; every numbered paragraph cited (`V07 §3.2 (4a)`, `V07 §3.12 (9v)`, `V07 §3.12a (3)`
  …) exists; every T-V7, J-V7 and W id cited is defined once.
* Every cell a new rule reads is in V07 §2.2a's interface and defaults (`heart.pull`, `aridWater`, `refound`, `perimeter`,
  the new `formRules` and `palisade` cells).
* `docs/validation/bench/doc_checks.py` on the new text: C1 0, C2 0, C4 1 (reviewed), C3 343 corpus 3-gram hits (old text
  503) — **provisional**: the reference corpus is absent in the cloud checkout, so the clean-room result is NOT
  authoritative; S2 pointer hits resolve against the base's headings, not the volume's (run with `--heads
  docs/ARCHITECTURE.md` at assembly).

## 12 Cross-part notes

1. **scope (§16, INDEX §3/§4):** V07 §8 carries J122's slot exactly as §16's staged table and INDEX §3's dependency graph
   state it (V-M0 after M0 on M0's kernel, M0 (b)'s tables and its own fixtures, beside M1; V-M1 – V-M4 after M4 beside
   M5, M6-E and M6-P's first rungs; V-M3's epoch clauses with M6-E's E2–E4; V-M2u after M6-U's tail). The village line
   stays 26.5–36.5 pw with V-M0 and V-M2u: items 110, 111 and 113 at village rungs are priced inside V-M1–V-M3's ranges.
   V-M0's register check runs once M1's lint (T-V12-20) is in.
2. **V08 (E-31):** V08 §2.6b (3)'s rule must carry the village column V07 now cites: a flowing type drawn or given keeps
   its type; unless the realm block fixes the course's line, the course's entry and exit bearings lie on the two frame
   arcs the through road's two entries divide (V07 §3.2 (2) step 2 draws them); the topology is raised to `through`
   unless a dossier access word fixes it (`isolated`, `none`); on a `coastal` site the forced water is an `estuary` at the
   brook's width class, its exit the sea side; it fails on a desert without `oasis_water` and with no river drawn (at
   village rungs the shares of `rules.aridWater`), on relief that cannot carry the brook, and on a fixed `isolated` or
   `none` word — V07 keeps the outcome (the toll house at an entry, else on the heart's approach, `toll_bridge_dry`).
   V07 §3.11 DR1 also defers to V08 §2.6 for whether a dossier desert without `oasis_water` may draw an oasis (DR40).
3. **V04:** the new V04 text cites "V07 §1 (5)" and "V07 FL-3" (V04 l. 3359); they now read "V07 §1's facts (1)" and V07
   §13's FL-3 (closed).
4. **V06:** V06's text cites "V07 §1 (10)" (claim-sized classes) — now "V07 §1's facts (5)"; V06 §6.2's row cites V07 §6's
   `village.density` bound at a base-product epoch (TX-04); a failing spring or oasis weakening its pull (item 111 (b)) is
   V06's rule, which V07 §3.2 (4a) cites; the replay at village rungs runs through V07 §3.12a (1).
5. **V11:** (a) `village.json` loses `territory.haPerHead` (E-38), `network.slack` and `network.emptyDensity` (J-V7.139),
   and gains `palisade.denseDialFrom`, `palisade.pullM`, `palisade.section`, `rules.formRules.organicDialFrom`,
   `rules.formRules.districtDensity`, `rules.perimeter.closeM`, `rules.heart.pull`, `rules.aridWater` and `rules.refound`
   — registry row 61's readers gain S0 (`aridWater`) and VS3/VS4/VS6 (`refound`); (b) V11 §3.2.1 step 5a's `v.`-row
   `commonness` case cites V07 §2.4's roster-share rule (SR6-08); (c) V11's climate rows carry the oasis chance and
   no-other-water factor, `w_water`, the pull radius, `w_waterP`, the coverage factor and the sunlight cell V07 reads at
   village rungs; `history.reuseCost`, `history.burialYears`, `history.epochYears` as V07 §3.12a reads them.
6. **V12:** E-38 — the farm rows are the calibratable cells and `haPerHead` leaves the register; the new `village.json`
   cells take the default line at V-M0 (owner `V07`); T-V7-58 and T-V7-59 are `NoOpPin`s on V12 §3.7.8 beside T-V7-52.
7. **V10, V09:** V07 §4.5's `WhyProvider` rows answer V10 §3.9's owed row for `VillagePlan`, `VillageField`,
   `VillageEnd`; their `says` keys `info.village.*` enter V09's catalogue.
8. **determinism / pipeline / rendering:** V07 cites §5.1 (9)–(10), §7.6's reference cell, §7.7's DR36–DR40, §4.11
   *History-first generation*, §4.2 S0/S1/S3 (6) and §4.5's item-111 terms, §8.2's programs `retaining`, `raisedWay`,
   `way.stair`, `ruin` and §8.4's `LayerSpec.showCircuit` (item 413) as the landed texts state them; the pipeline's
   "(`ProductDecl`, V07 §2.1)" stays true (§2 item 1).

## 13 Mapping table — every inventory id of V07 → where it lives now

| inventory id | kind | canon role | where it lives now |
|---|---|---|---|
| V07-0001 | summary | home | V07 §0 |
| V07-0002 | summary | home | V07 §0 |
| V07-0003 | summary | home | V07 §0 |
| V07-0004 | summary | home | V07 §0 |
| V07-0005 | summary | home | V07 §0 |
| V07-0006 | summary | home | V07 §0 |
| V07-0007 | summary | home | V07 §0 |
| V07-0008 | rule | reference | V07's head, *Citations* (the provenance-form sentence, §17.1 (6) cited); the reading list removed as narration |
| V07-0009 | scope | home | V07 §1 |
| V07-0010 | scope | home | V07 §1 |
| V07-0011 | interface | reference | V07 §1 *Base hooks consumed* (a cited list; item 111's and item 113's hooks added) |
| V07-0012 | interface | reference | V07 §1 *Item 110's base side* (cited: §2.7, §2.2 rule 5, §3.4, §4.3, §4.6, §4.7, §5.3, §7.1) |
| V07-0013 | scope | home | V07 §1 |
| V07-0014 | handoff | handoff | V07 §1 *Cross-volume facts* (1) (fallback removed; V04 §2.2, §3.5.1, §3.10 cited) |
| V07-0015 | handoff | handoff | V07 §1 *Cross-volume facts* (2), (3) |
| V07-0016 | handoff | handoff | V07 §1 *Cross-volume facts* (1), (2), (5), (7) (fallbacks removed; §2.7's span rule with `country`, J-C4) |
| V07-0017 | handoff | handoff | V07 §1 *Cross-volume facts* (2), (3), (4), (5), (6), (8) (landing history removed) |
| V07-0018 | handoff | handoff | V07 §1 *Cross-volume facts* (5) and V07 §8 *Where it slots* (V-M3's epoch clauses with M6-E) |
| V07-0019 | wiring | home | V07 §1b W1 |
| V07-0020 | wiring | home | V07 §1b W2 |
| V07-0021 | wiring | home | V07 §1b W3 |
| V07-0022 | wiring | home | V07 §1b W4 |
| V07-0023 | wiring | home | V07 §1b W5 |
| V07-0024 | wiring | home | V07 §1b W6 |
| V07-0025 | wiring | home | V07 §1b W7 |
| V07-0026 | wiring | home | V07 §1b W8 |
| V07-0027 | wiring | home | V07 §1b W9 |
| V07-0028 | wiring | home | V07 §1b W10 |
| V07-0029 | wiring | home | V07 §1b W11 |
| V07-0030 | wiring | home | V07 §1b W12 |
| V07-0031 | wiring | home | V07 §1b W13 |
| V07-0032 | wiring | home | V07 §1b W14 |
| V07-0033 | wiring | home | V07 §1b W15 |
| V07-0034 | wiring | home | V07 §1b W16 |
| V07-0035 | wiring | home | V07 §1b W17 |
| V07-0036 | wiring | home | V07 §1b W18 |
| V07-0037 | wiring | home | V07 §1b W19 |
| V07-0038 | wiring | home | V07 §1b W20 |
| V07-0039 | wiring | home | V07 §1b W21 |
| V07-0040 | wiring | home | V07 §1b W22 |
| V07-0041 | wiring | home | V07 §1b W23 |
| V07-0042 | wiring | home | V07 §1b W24 |
| V07-0043 | wiring | home | V07 §1b W25 |
| V07-0044 | wiring | home | V07 §1b W26 |
| V07-0045 | wiring | home | V07 §1b W27 |
| V07-0046 | wiring | home | V07 §1b W28 |
| V07-0047 | wiring | home | V07 §1b W29 |
| V07-0048 | wiring | home | V07 §1b W30 |
| V07-0049 | wiring | home | V07 §1b W31 |
| V07-0050 | wiring | home | V07 §1b W32 |
| V07-0051 | wiring | home | V07 §1b W33 |
| V07-0052 | wiring | home | V07 §1b W34 |
| V07-0053 | wiring | home | V07 §1b W35 |
| V07-0054 | wiring | home | V07 §1b W36 |
| V07-0055 | wiring | home | V07 §1b W37 |
| V07-0056 | wiring | home | V07 §1b W38 |
| V07-0057 | wiring | home | V07 §1b W39 |
| V07-0058 | withdrawn | home | removed: a withdrawn placeholder row (NARR-5); its clause stands at V07 §2.1 |
| V07-0059 | wiring | home | V07 §1b W41 |
| V07-0060 | wiring | home | V07 §1b W42 |
| V07-0061 | wiring | home | V07 §1b W43 |
| V07-0062 | wiring | home | V07 §1b W44 |
| V07-0063 | wiring | home | V07 §1b W45 |
| V07-0064 | wiring | home | V07 §1b W46 |
| V07-0065 | wiring | home | V07 §1b W47 |
| V07-0066 | wiring | home | V07 §1b W48 |
| V07-0067 | wiring | home | V07 §1b W49 |
| V07-0068 | wiring | home | V07 §1b W50 |
| V07-0069 | wiring | home | V07 §1b W51 |
| V07-0070 | wiring | home | V07 §1b W52 |
| V07-0071 | wiring | home | V07 §1b W53 |
| V07-0072 | wiring | home | V07 §1b W54 |
| V07-0073 | wiring | home | V07 §1b W55 |
| V07-0074 | wiring | home | V07 §1b W56 |
| V07-0075 | wiring | home | V07 §1b W57 |
| V07-0076 | wiring | home | V07 §1b W58 |
| V07-0077 | wiring | home | V07 §1b W59 |
| V07-0078 | wiring | home | V07 §1b W60 |
| V07-0079 | wiring | home | V07 §1b W61 |
| V07-0080 | wiring | home | V07 §1b W62 |
| V07-0081 | wiring | home | V07 §1b W63 |
| V07-0082 | wiring | home | V07 §1b W64 |
| V07-0083 | wiring | home | V07 §1b W65 |
| V07-0084 | wiring | home | V07 §1b W66 |
| V07-0085 | wiring | home | V07 §1b W67 |
| V07-0086 | wiring | home | V07 §1b W68 |
| V07-0087 | wiring | home | V07 §1b W69 |
| V07-0088 | wiring | home | V07 §1b W70 (compacted: calls at V07 §2.1 *The records placement*, cases at V07 §3.12 *Records at a village epoch*) |
| V07-0089 | wiring | home | V07 §1b W71 |
| V07-0090 | wiring | home | V07 §1b W72 |
| V07-0091 | wiring | home | V07 §1b W73 |
| V07-0092 | trace | home | V07 §1b dossier trace |
| V07-0093 | rule | home | V07 §2 |
| V07-0094 | table | home | V07 §2.1 |
| V07-0095 | rule | home | V07 §2.1 |
| V07-0096 | rule | reference-owner-rule | V07 §2.1 (item 105 (h) and V11 §3.7.4 cited; the former W40 clause) |
| V07-0097 | rule | home | V07 §2.1 |
| V07-0098 | rule | home | V07 §2.1 |
| V07-0099 | rule | home | V07 §2.1 |
| V07-0100 | record | reference | V07 §2.1 (`ProductDecl`'s type kept at its home: item 202 names V07 §2.1's type and the base cites it) |
| V07-0101 | rule | reference | V07 §2.1 (one sentence citing §1.1, item 202, item 276 and §2.9) |
| V07-0102 | mechanism | home | V07 §2.1 |
| V07-0103 | record | home | V07 §2.2 |
| V07-0104 | record | home | V07 §2.2 |
| V07-0105 | rule | home | V07 §2.2 |
| V07-0106 | rule | home | V07 §2.2 |
| V07-0107 | table | home | V07 §2.2 |
| V07-0108 | table | home | V07 §2.2 |
| V07-0109 | table | home | V07 §2.2 |
| V07-0110 | table | home | V07 §2.2 |
| V07-0111 | table | home | V07 §2.2 |
| V07-0112 | rule | home | V07 §2.2 |
| V07-0113 | mechanism | home | V07 §2.2a |
| V07-0114 | record | home | V07 §2.2a |
| V07-0115 | table | home | V07 §2.2a |
| V07-0116 | table | home | V07 §2.2a |
| V07-0117 | table | home | V07 §2.2a |
| V07-0118 | table | home | V07 §2.2a |
| V07-0119 | table | home | V07 §2.2a |
| V07-0120 | rule | reference | V07 §2.2a *The reference trace* (row D5 alone; FL-1) |
| V07-0121 | record | home | V07 §2.3 |
| V07-0122 | record | home | V07 §2.3 |
| V07-0123 | rule | reference | V07 §2.3 *Base records read with village values* (homes §2.5, §2.7 cited) |
| V07-0124 | rule | home | V07 §2.3 |
| V07-0125 | rule | home | V07 §2.3 |
| V07-0126 | rule | home | V07 §2.3 |
| V07-0127 | rule | home | V07 §2.4 |
| V07-0128 | rule | home | V07 §2.4 |
| V07-0129 | table | home | V07 §2.4 |
| V07-0130 | table | home | V07 §2.4 |
| V07-0131 | table | home | V07 §2.4 |
| V07-0132 | table | home | V07 §2.4 |
| V07-0133 | table | home | V07 §2.4 |
| V07-0134 | table | home | V07 §2.4 |
| V07-0135 | table | home | V07 §2.4 |
| V07-0136 | table | home | V07 §2.4 |
| V07-0137 | table | home | V07 §2.4 |
| V07-0138 | table | home | V07 §2.4 |
| V07-0139 | rule | home | V07 §2.4 |
| V07-0140 | rule | home | V07 §2.4 |
| V07-0141 | mechanism | home | V07 §2.4 |
| V07-0142 | rule | home | V07 §2.4 |
| V07-0143 | rule | home | V07 §2.4 |
| V07-0144 | rule | home | V07 §2.4 |
| V07-0145 | rule | home | V07 §2.4 |
| V07-0146 | rule | home | V07 §2.4 |
| V07-0147 | rule | home | V07 §2.4 |
| V07-0148 | rule | home | V07 §2.4 |
| V07-0149 | rule | home | V07 §2.4 |
| V07-0150 | table | home | V07 §2.4 |
| V07-0151 | rule | home | V07 §2.4 |
| V07-0152 | table | home | V07 §2.4 |
| V07-0153 | table | home | V07 §2.4 |
| V07-0154 | rule | home | V07 §2.5 |
| V07-0155 | rule | home | V07 §2.5 |
| V07-0156 | lifecycle | home | V07 §2.6 |
| V07-0157 | lifecycle | home | V07 §2.6 |
| V07-0158 | lifecycle | home | V07 §2.6 |
| V07-0159 | lifecycle | home | V07 §2.6 |
| V07-0160 | lifecycle | home | V07 §2.6 |
| V07-0161 | lifecycle | home | V07 §2.6 |
| V07-0162 | lifecycle | home | V07 §2.6 |
| V07-0163 | lifecycle | home | V07 §2.6 |
| V07-0164 | record | home | V07 §2.7 |
| V07-0165 | record | home | V07 §2.7 |
| V07-0166 | record | home | V07 §2.7 |
| V07-0167 | record | home | V07 §2.7 |
| V07-0168 | record | reference | V07 §2.7 (cites §10.2, items 430 and 432) |
| V07-0169 | mechanism | home | V07 §3.0 |
| V07-0170 | mechanism | home | V07 §3.0 |
| V07-0171 | rule | home | V07 §3.0 |
| V07-0172 | rule | home | V07 §3.0 |
| V07-0173 | table | home | V07 §3.0 |
| V07-0174 | rule | home | V07 §3.0 |
| V07-0175 | term | glossary | V07 §3.1 |
| V07-0176 | mechanism | home | V07 §3.1 |
| V07-0177 | rule | home | V07 §3.1 |
| V07-0178 | rule | home | V07 §3.2 (1) |
| V07-0179 | mechanism | home | V07 §3.2 (2) |
| V07-0180 | mechanism | home | V07 §3.2 (2) |
| V07-0181 | mechanism | home | V07 §3.2 (3) |
| V07-0182 | rule | home | V07 §3.2 (3) |
| V07-0183 | mechanism | home | V07 §3.2 (4) |
| V07-0184 | mechanism | home | V07 §3.2 (4) |
| V07-0185 | mechanism | home | V07 §3.2 (5) |
| V07-0186 | mechanism | home | V07 §3.2 (6) |
| V07-0187 | mechanism | home | V07 §3.2 (7) |
| V07-0188 | mechanism | home | V07 §3.2 (8) |
| V07-0189 | mechanism | home | V07 §3.3 |
| V07-0190 | rule | home | V07 §3.3 |
| V07-0191 | mechanism | home | V07 §3.4 |
| V07-0192 | mechanism | home | V07 §3.4 |
| V07-0193 | rule | home | V07 §3.4 |
| V07-0194 | rule | home | V07 §3.4 |
| V07-0195 | mechanism | home | V07 §3.5 |
| V07-0196 | mechanism | home | V07 §3.5 |
| V07-0197 | mechanism | home | V07 §3.5 |
| V07-0198 | mechanism | home | V07 §3.5 |
| V07-0199 | rule | home | V07 §3.5 |
| V07-0200 | rule | home | V07 §3.5 |
| V07-0201 | rule | home | V07 §3.5 |
| V07-0202 | rule | home | V07 §3.5a |
| V07-0203 | mechanism | home | V07 §3.5a (3) |
| V07-0204 | rule | home | V07 §3.5a (4)-(6) |
| V07-0205 | rule | home | V07 §3.5a (7)-(9) |
| V07-0206 | rule | home | V07 §3.5a (10)-(11) |
| V07-0207 | mechanism | home | V07 §3.6 |
| V07-0208 | rule | home | V07 §3.6 (4) |
| V07-0209 | mechanism | home | V07 §3.6 (4a) |
| V07-0210 | mechanism | home | V07 §3.6 (4b) |
| V07-0211 | rule | home | V07 §3.6 (5)-(7) |
| V07-0212 | mechanism | home | V07 §3.7 |
| V07-0213 | mechanism | home | V07 §3.8 |
| V07-0214 | mechanism | home | V07 §3.8 |
| V07-0215 | mechanism | home | V07 §3.8 |
| V07-0216 | mechanism | home | V07 §3.8 |
| V07-0217 | mechanism | home | V07 §3.8 |
| V07-0218 | rule | home | V07 §3.8 |
| V07-0219 | rule | home | V07 §3.8 |
| V07-0220 | mechanism | home | V07 §3.8a (1)-(2) |
| V07-0221 | rule | home | V07 §3.8a (3)-(9) |
| V07-0222 | rule | home | V07 §3.9 (1) |
| V07-0223 | mechanism | home | V07 §3.9 (2) |
| V07-0224 | mechanism | home | V07 §3.9 (3) |
| V07-0225 | rule | home | V07 §3.9 (4)-(6) |
| V07-0226 | mechanism | home | V07 §3.10 |
| V07-0227 | mechanism | home | V07 §3.10 |
| V07-0228 | rule | home | V07 §3.10 |
| V07-0229 | mechanism | home | V07 §3.10 |
| V07-0230 | rule | home | V07 §3.10 |
| V07-0231 | rule | home | V07 §3.10 |
| V07-0232 | mechanism | home | V07 §3.10a |
| V07-0233 | rule | home | V07 §3.11 |
| V07-0234 | rule | home | V07 §3.11 |
| V07-0235 | rule | home | V07 §3.11 DR1 |
| V07-0236 | rule | home | V07 §3.11 DR2 |
| V07-0237 | rule | home | V07 §3.11 DR3-DR6 |
| V07-0238 | rule | home | V07 §3.11 DR7 |
| V07-0239 | rule | home | V07 §3.11 DR9/DR24 |
| V07-0240 | rule | home | V07 §3.11 burial |
| V07-0241 | rule | home | V07 §3.11 DR11-DR19 |
| V07-0242 | rule | home | V07 §3.11 landmarks |
| V07-0243 | rule | home | V07 §3.11 item 108 |
| V07-0244 | rule | home | V07 §3.11 chains |
| V07-0245 | rule | home | V07 §3.11 absorb |
| V07-0246 | rule | home | V07 §3.11 palisade REPLACEMENT |
| V07-0247 | mechanism | home | V07 §3.12 |
| V07-0248 | mechanism | home | V07 §3.12 *Village siting* |
| V07-0249 | mechanism | home | V07 §3.12 *Markets, halls and the fair over epochs* |
| V07-0250 | mechanism | home | V07 §3.12 *Markets, halls and the fair over epochs* |
| V07-0251 | mechanism | home | V07 §3.12 *Records at a village epoch* |
| V07-0252 | mechanism | home | V07 §3.12 *Records at a village epoch* |
| V07-0253 | mechanism | home | V07 §3.12 *Pins over epochs* |
| V07-0254 | mechanism | home | V07 §3.12 *Decline and desertion* |
| V07-0255 | mechanism | home | V07 §3.12 *Decline and desertion* |
| V07-0256 | mechanism | home | V07 §3.12 *The hand-off up* |
| V07-0257 | mechanism | home | V07 §3.12 *The hand-off down* |
| V07-0258 | rule | home | V07 §3.12 *Item 110's state*, *Item 102 over epochs*, *Items 105–108 over epochs* |
| V07-0259 | table | home | V07 §3.13 |
| V07-0260 | table | home | V07 §3.13 |
| V07-0261 | rule | home | V07 §3.14 |
| V07-0262 | rule | home | V07 §3.14 |
| V07-0263 | rule | home | V07 §3.14 |
| V07-0264 | rule | home | V07 §3.15 |
| V07-0265 | rule | home | V07 §3.15 |
| V07-0266 | rule | home | V07 §3.16 (1) |
| V07-0267 | rule | home | V07 §3.16 (2)-(4) |
| V07-0268 | rule | home | V07 §3.16 (5)-(8) |
| V07-0269 | rule | home | V07 §4 |
| V07-0270 | table | home | V07 §4.1 |
| V07-0271 | table | home | V07 §4.1 |
| V07-0272 | rule | home | V07 §4.1 |
| V07-0273 | record | reference | V07 §4.2 (the forms cited at §7.1, item 357; the village meaning kept) |
| V07-0274 | table | home | V07 §4.3 |
| V07-0275 | table | home | V07 §4.4 |
| V07-0276 | rule | home | V07 §4.5 |
| V07-0277 | rule | home | V07 §5.1 |
| V07-0278 | rule | home | V07 §5.1 |
| V07-0279 | rule | home | V07 §5.1 |
| V07-0280 | rule | home | V07 §5.1 |
| V07-0281 | rule | home | V07 §5.1 |
| V07-0282 | rule | home | V07 §5.2 |
| V07-0283 | rule | home | V07 §5.3 |
| V07-0284 | rule | home | V07 §5.4 |
| V07-0285 | rule | home | V07 §6 |
| V07-0286 | rule | home | V07 §6 |
| V07-0287 | test | home | V07 §7 |
| V07-0288 | test | home | V07 §7 |
| V07-0289 | test | home | V07 §7 |
| V07-0290 | test | home | V07 §7 |
| V07-0291 | test | home | V07 §7 |
| V07-0292 | test | home | V07 §7 |
| V07-0293 | test | home | V07 §7 |
| V07-0294 | test | home | V07 §7 |
| V07-0295 | test | home | V07 §7 |
| V07-0296 | test | home | V07 §7 |
| V07-0297 | test | home | V07 §7 |
| V07-0298 | test | home | V07 §7 |
| V07-0299 | test | home | V07 §7 |
| V07-0300 | test | home | V07 §7 |
| V07-0301 | test | home | V07 §7 |
| V07-0302 | test | home | V07 §7 |
| V07-0303 | rule | home | V07 §7 |
| V07-0304 | plan | home | V07 §8 |
| V07-0305 | plan | home | V07 §8 |
| V07-0306 | plan | home | V07 §8 |
| V07-0307 | plan | home | V07 §8 |
| V07-0308 | plan | home | V07 §8 |
| V07-0309 | plan | home | V07 §8 |
| V07-0310 | plan | home | V07 §8 |
| V07-0311 | plan | home | V07 §8 |
| V07-0312 | decision | home | V07 §9 |
| V07-0313 | decision | home | V07 §9 |
| V07-0314 | decision | home | V07 §9 |
| V07-0315 | decision | home | V07 §9 |
| V07-0316 | decision | home | V07 §9 |
| V07-0317 | decision | home | V07 §9 |
| V07-0318 | decision | home | V07 §9 |
| V07-0319 | decision | home | V07 §9 |
| V07-0320 | decision | home | V07 §9 |
| V07-0321 | decision | home | V07 §9 |
| V07-0322 | decision | home | V07 §9 |
| V07-0323 | decision | home | V07 §9 |
| V07-0324 | decision | home | V07 §9 |
| V07-0325 | bcr | bcr-pointer | V07 §10 pointer table (the request applied at its base home; text removed as restatement) |
| V07-0326 | bcr | bcr-pointer | V07 §10 pointer table (the request applied at its base home; text removed as restatement) |
| V07-0327 | bcr | bcr-pointer | V07 §10 pointer table (the request applied at its base home; text removed as restatement) |
| V07-0328 | bcr | bcr-pointer | V07 §10 pointer table (the request applied at its base home; text removed as restatement) |
| V07-0329 | bcr | bcr-pointer | V07 §10 pointer table (the request applied at its base home; text removed as restatement) |
| V07-0330 | bcr | bcr-pointer | V07 §10 pointer table (the request applied at its base home; text removed as restatement) |
| V07-0331 | bcr | bcr-pointer | V07 §10 pointer table (the request applied at its base home; text removed as restatement) |
| V07-0332 | question | answer-J121-J122 | V07 §11 (decided (a), J122) and V07 §8 *Where it slots* |
| V07-0333 | note | home | V07 *Integration notes* (pointer table) and the body homes it names |
