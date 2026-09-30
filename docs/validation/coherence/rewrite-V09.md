# Rewrite — design volume V09 (application)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V09; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V09`, started 2026-09-30 ~20:20, cloud; stopped by an accidental interrupt at ~20:38 with
parts 00–03 saved; continued under the CONTINUE rule from part 04)
- P1 inputs gathered (canon unit V09: 918 STATE, 62 REFERENCE, 36 BCR pointers, 25 index rows, 28 conflicts, 55 f items, g
  111–113 and the dated rulings for 114–119, 8 wiring gaps, E-04/E-07/E-16/E-17/E-24/E-32/E-33, ID-BCR/-TOOL/-LAYER/-WX/-DUPDEF,
  26 hand-offs to V09 and 31 from it, 94 UNDEFINED + 67 UNTESTED edges and 25 combinations, 95 open findings): done
- P2 head, §0, §1, §1b: done (parts 00–01; item 119 lines added on continuation)
- P3 §2: done (part 02; `AppPrefs.cvdDefault` and four lifecycle rows added on continuation)
- P4 §3: done (part 03; new §3.16 edges, part 03b)
- P5 §4: done (parts 04–10; new §4.21 for items 111–119)
- P6 §5–§6: done (parts 11–12)
- P7 §7–§8: done (parts 13–14; T-V9-71 – T-V9-80, new §7.6, AP11)
- P8 §9–§13 and the Integration notes: done (parts 15–16; J-V9.126 – J-V9.136)
- P9 assemble, verify ids, references, terms, sizes: done
- P10 report (mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done

Source: `docs/volumes/V09-application.md` (4 919 lines, md5 14f78dd6c587fcb50f8351b004426570). Output:
`docs/validation/coherence/new/volumes/V09-application.md` (the same title line and section structure, one marker line;
new §3.16, §4.21 and §7.6). Working parts: `docs/validation/coherence/work/rewrite-V09/parts/` (00, 01, 02, 03, 03b, 04 … 16,
concatenated in that order); scripts beside them: `transform.py` (citation forms, DR aliases, request ids), `strip.py`
(review-round ids), `rep.py` (exact replacements), `chk.py` (retired forms), `mapping.py` and `edges-map.py` (§11 and §12
below); routing notes `routing.md`.

## 1 Sizes and the shrink goal

| measure | before | after |
|---|---|---|
| words (`str.split`, the canon's measure) | 111 610 | 105 485 (−5.5 %; the canon's band 66 966 – 83 708) |
| bytes | 690 061 (673.9 KB) | ≈ 635 800 (620.9 KB) |
| sections | §0–§13, Integration notes, twelve reconciliation, continuation and finalization records | §0–§13 with new §3.16, §4.21, §7.6; an Integration-notes map |

| section | words before | words after |
|---|---|---|
| title, banners, *How to read* | 1 224 | 355 |
| §0 | 1 359 | 1 732 |
| §1 | 2 317 | 2 598 |
| §1b | 4 074 | 4 873 |
| §2 | 9 690 | 10 768 |
| §3 (with the new §3.16, 4 421) | 8 190 | 13 014 |
| §4 (with the new §4.21, 2 773) | 31 360 | 36 697 |
| §5 | 6 588 | 7 579 |
| §6 | 2 310 | 2 464 |
| §7 (with T-V9-71 – T-V9-80, 1 058, and §7.6, 340) | 9 664 | 11 260 |
| §8 | 2 025 | 2 158 |
| §9 | 9 012 | 9 418 |
| §10 | 10 074 | 1 509 |
| §11 | 328 | 186 |
| §12 | 3 329 | 477 |
| §13 | 1 435 | 78 |
| Integration notes | 924 | 319 |
| reconciliation rounds, continuations, finalization | 7 707 | 0 |

**The four sources of the removed words** (≈ 23 400 removed, ≈ 17 300 added):
* **Narration** ≈ 13 800 — the twelve reconciliation, continuation and finalization records (7 707), §12's per-round
  paragraphs (≈ 2 850), §13's per-round dispositions (≈ 1 360), the stacked banners and revision ledgers (≈ 870), the
  Integration notes' prose (≈ 600), the review-round and critique ids and the withdrawn rows' former texts (≈ 400).
* **Restatement** ≈ 9 100 — §10.1's 36 request blocks as a pointer table to the applied file f items (≈ 8 565); the quoted
  panel lines of V10 §3.9a, V11's cell values, V04's style, the base's pricing line, the first-map law's figures, the
  history store's defaults (≈ 500).
* **Duplicated mechanisms** ≈ 200 — E-04 (the binding table's home column cites §7.1), E-24 (withdrawn rows reduced to
  their mark), E-32 (one row), J-V9.136 (six bend rows, one event form and three buttons retired for V02's set).
* **Verbose prose** ≈ 300.

**What holds the volume below the band** (principle (9): not a defect). The additions are mandated new design: items
111–119's parts at build depth (§4.21 2 773 words, with their rows in §0, §1, §1b, §2.12, §4.3, §4.5, §4.9, §4.10, §5 and
§6, ≈ 2 000 more); the edge catalogue's 186 rows (§3.16, 4 421); T-V9-71 – T-V9-80 and §7.6 (1 398); the catalogue rows those
and the edges need (1 440); the folded Integration notes and hand-offs (V06 §4.2's hand forms, the time card, the tier
controls, the cell inspector; ≈ 1 200). Without them the volume would stand ≈ 20 % below its source. The irreducible
remainder is data at build depth that no reference can replace: the message catalogue (≈ 8 000 words of rows, each a
shipped string with its buttons and codes), the test bars (≈ 11 000), the interfaces of §2 and the wiring and lifecycle
tables (≈ 15 000), and the per-tool tables of §4.3 and §4.5. No unit shrank by more than half except those whose content
moved to a pointer or a record (§10, §12, §13, the rounds), each audited below (§6's mapping and §11).

## 2 File f and g items (cited as base text, never restated)

* **File f items this volume cites as base text** (55, the canon's list): 244, 245, 246, 260, 269, 270, 277, 278, 348, 360,
  361, 362, 363, 364, 366, 368, 380, 390, 399, 402, 410, 411, 413, 447, 453, 454, 455, 458, 460, 461, 462, 463, 464, 465, 466,
  467, 468, 469, 470, 472, 473, 490, 494, 507, 514, 515, 516, 517, 530, 568, 570, 571, 572, 582, 583 — with 353, 358, 359, 367,
  372, 376, 386, 448 cited where read. V09's own requests BCR-V9-1 – BCR-V9-36 are V09 §10.1's pointer table (two superseded,
  BCR-V9-4 by J-V9.36 and BCR-V9-6 by J-V9.33); BCR-V9-3's text reads the corrected working-layer definition (V09-XCONF-1).
  The other volumes' request blocks quoted in the body (36) are rewritten as their applied items (transform stage 2).
* **File g items written here at build depth** (each an addition, never a change of another decision):
  * item 111 — T2's **Spring-fed (oasis)** toggle, its mapper, badge, history template, dossier lock, hint and why driver row (V09 §4.21.1; §4.3, §4.5, §4.9, §4.10; T-V9-71; J-V9.133);
  * item 112 — **Colour vision** in the Map group and Settings with `AppPrefs.cvdDefault`, the cue column of V09 §5.4, the chrome's colour rule, and the game-master trial's protocol and `TrialRecord` (V09 §4.21.2, §5.1, §5.4, §7.6; T-V9-72; J-V9.128);
  * item 113 — T1's **History** chip (peak and age), "What its past left", the symbolic chip and the lost void's line (V09 §4.21.3, §4.17.1, §5.7; T-V9-73; J-V9.132; V09-WGAP-1);
  * item 114 — T3's **Repair** with the **Material** chip, **Wear**, **Back in use**, the run's panel line, the legend's wall states, the VTT line (V09 §4.21.4, §4.3, §4.5, §4.9, §4.10, §5.10; T-V9-74; J-V9.134);
  * item 115 — a hand design beyond the grandeur ceiling honoured and explained (`info.grand.beyondTier`, `info.grand.dossier`) (V09 §4.21.5, §4.5; T-V9-75; J-V9.129);
  * item 116 — the view controls stop at the zoom-out limit, Fit the town, the export frame (V09 §4.21.6, §3.2, §4.13, §5.10; T-V9-76);
  * item 117 — the **Season** control with its week slider, four chips and **Follow SettlementForge**, weather and sun defaults, the export's season line (V09 §4.21.7, §4.19, §5.10; T-V9-77; J-V9.130);
  * item 118 — the festival list with its weeks, **Preview** and the switch, the standalone generic festivals, the export's festival line (V09 §4.21.8; T-V9-78);
  * item 119 — the progress view past `progress.showAfterMs`, its stage groups and wait lines, never an empty screen; the one-time-wait note of V09 §6 and the view-switch budgets (V09 §4.21.9, §5.3, §6; T-V9-79; J-V9.131).

## 3 Conflicts resolved (28)

| conflict | ruling as applied | where |
|---|---|---|
| DIC-06 | tools with their word at first use; bar groups with their number | throughout (ID-TOOL) |
| DIC-07 | toolkit layers written with their word (L0 INTENT …); bare L0–L4 a refinement level | V09 §2.3, §4.2, §4.12, §4.15, §7.2, §8.3 |
| DXC-04 | the binding's one home §7.1; V09 §4.3 keeps the screens | V09 §4.3 (E-04) |
| SCOPE-C07 | SettlementForge's assistant drives the tool API through the host seam; the built-in clerk only where configured | V09 §0, §2.10, §4.11 |
| SCOPE-C15 | PLAT the codename; the public name SettlementForge's (J121) | V09 §11 Q3 |
| V01-XCONF-2 | one VTT rule at §11.1 (files f items 447, 448) | V09 §10.1 BCR-V9-31 |
| V06-AGREE-1 | V06 cites `info.remove.holds`; the deck plot's variant row | V09 §4.9 (`info.remove.holds.deck`), §4.20.3 |
| V08-XCONF-6 | the frame's language the host's, English the source language | V09 §5.12 |
| V09-ICONF-1 | "The five classes of state" | V09 §2.1 |
| V09-ICONF-2 | one home tool per (event kind, target class or path) | V09 §4.3; T-V9-12 |
| V09-ICONF-3 | the ten keys are bends; the withdrawn paragraph gone | V09 §4.9, §4.20.5 (4); T-V9-13 |
| V09-ICONF-4 | one channel per cue: family = colour + dash; satisfaction = hollow arrowhead; impaired = half width | V09 §5.4, §4.7, §4.15 |
| V09-ICONF-5 | J-V9.40 states the four-step ladder, amended by J-V9.102 | V09 §9 |
| V09-XAGREE-1 | the tables' shape is V11 §4.2's union; V09 §2.6 maps each screen to a declared cell | V09 §2.6; V09 §10.2 |
| V09-XAGREE-2 | the crypt cap `crypt.rankShare` × the principal's area, V03 §3.7.4's dry run | V09 §4.9, §4.17.5 (e) |
| V09-XCONF-1 | BCR-V9-3's working layer: ground, an island's `PlatKey`, or the underground (its band `depthBand`) | V09 §10.1 |
| V09-XAGREE-3 | V02 §1b's bend ids the one set; V09's unmatched keys retired | V09 §4.9, §4.20.5; J-V9.136 |
| V10-XAGREE-3 | the size words' one rule is V09 §4.5's quantiles | V09 §4.5; XV-V9-33 |
| V10-XAGREE-4 | wet ground by V03 §3.7.4; "floor vaults" gone | V09 §4.17.5 |
| V09-J121-1 | §0's assistant reads SettlementForge's AI setup | V09 §0 (part 00) |
| V09-J121-2 | hosting and accounts follow SettlementForge; no simultaneous editing (J122) | V09 §1.3 |
| V09-J121-3 | which locales ship follows SettlementForge | V09 §2.9, §5.12 |
| V09-J121-4 | clerkMode and configuration from SettlementForge; the own-key card only where configured | V09 §2.10, §4.9, §4.11, §5.12 |
| V09-J122-1 | five SettlementForge users per round, credit and early access, no payments | V09 §7.3 (2) |
| V09-J121-5 | §11's three questions answered | V09 §11 |
| CANON-C02 | a standalone neighbourhood has no clock; `bend.hood.noClock` | V09 §4.9; V09 §4.21.3 (4) |
| CANON-C03 | §11 a table of decisions | V09 §11 |
| CANON-C04 | the seam-r6 items fixed (SR6-02, SR6-03, SR6-06, SCC-115) | V09 §4.11, §2.9, §7.1, §4.20 |

## 4 Elegance rulings applied, with their equivalence lists

* **E-04 (the binding).** V09 §4.3 cites §7.1's one table; its rows keep the mode, gesture, panel control and source.
  ☑ every `EditEvent` kind has a row (the base's, the volumes', V06 §4.2's hand forms, V07's village re-rolls added);
  ☑ the history kinds marked with their producer (`epoch`, `undo`, `redo`, `upgrade`, `rebase`, `closeup`, the dossier
  events); ☑ the per-target homes kept (split and merge at T5 for districts and T9 for ways and plots; delete at T10 and
  T9 for access points and galleries; instance at T6, T8, T9); ☑ T-V9-12 checks completeness over the pairs.
* **E-07 (one dry-run outcome table).** ☑ each case's offered alternative stays its own row (the button column); ☑ the
  dossier-owned and lock refusals the only refusals, with the availability gates (V09 §4.9's opening); ☑ file f item 582's
  three bends as rows (`bend.place.noSite`, `.overBudget`, `bend.vacate`); ☑ V09's `bend.*` and `refuse.*` keys map one to
  one (V09 §4.9; T-V9-15's new clause).
* **E-16 (post operations and the `lights` role).** Nothing in V09 names the post operations or the role: T12's **Lights**
  places lamps (`placeLight`) and the close-up's vignette is V01's program. ☑ program and post operation kept apart;
  ☑ the spotlight vignette the `vignette` program; ☑ the two roles' uses — not referenced here.
* **E-17 (one admission function).** ☑ each reader's band kept (the view's band for tiles and labels, the city band for
  band-less reads); ☑ V09's `admitAs` (J-V9.86) cites §9.2's admission function (V09 §2.7, §4.8).
* **E-24 (one mark on a decision row).** ☑ no row dropped (J-V9.2, .25, .67, .76 kept with "Superseded by X");
  ☑ the governing row keeps the reason (J-V9.33, .36, J-VI.4); amendments as "amended by X" on J-V9.10, .24, .31, .40, .55.
* **E-32 (one row for an unreachable clerk).** `error.clerkOffline` retired; ☑ same condition and outcome — V10's
  `refuse.clerk.offline` through the `refuse.clerk.*` family (V09 §3.14's clerk row).
* **E-33 (`ClerkHandle` everywhere).** ☑ `createClerk(mount)` returns `ClerkHandle` (V09 §2.10; no alias remains).
* No unification the canon did not rule was made. J-V9.136 retires keys by V09-XAGREE-3's conflict ruling, not by elegance.

## 5 Id rulings, renumberings and renames

* **ID-BCR**: no bare `BCR-n` remains; V01's and V04's requests are cited as their applied items; V09's own ids stay only in
  §10.1's pointer table. **ID-TOOL**: bar groups with their number (T101-1, T112-2); tools with their word. **ID-LAYER**:
  applied (above). **ID-WX**: the IN-V09-n notes folded (§6 below), their ids kept only in these records; other volumes'
  rows cited as "V02 X21", "V06 W19", "V12's X-V12-6". **ID-DUPDEF**: the census over the new text finds T-V9-1 – T-V9-80 and
  J-V9.1 – J-V9.136 each defined once and every cited one defined (the `verify.py` scan).
* **G-DR**: DR-V8.7 → DR34, DR-V8.8 → DR35 (8 hits). **G-cite**: 1 190 `Vn §` forms → `Vnn §`, 9 `V1-x.y` forms, 134
  list continuations prefixed; every line-broken `Vnn` / `§` pair rejoined; ranges prefixed at both ends.
* **Renamed or retired**: `error.clerkOffline` (E-32); `bend.tiers.flights`, `bend.stack.internalSolid`, `.removeStair`,
  `.addWing`, `.deck`, `.notStepped`, the event form `giveTiers`, `button.giveTiers`, `button.changeStairs`,
  `button.plotsOnLand` (J-V9.136); the F5 fallback value `touchL3L4` → `touchFabric` (ID-LAYER); the fixture path
  `plat/test/fixtures/known-city-2/` → `plat/tests/fixtures/known-city/K2/` (J-V12.58); §3.7's title "New random on a scope"
  (G-newrandom).
* **New ids**: T-V9-71 – T-V9-80; J-V9.126 – J-V9.136; XV-V9-32 – XV-V9-35; sections §3.16, §4.21 (4.21.1–4.21.9), §7.6;
  catalogue families `edge.*`, `legend.*`, `view.*`, `progress.*`, `report.history.*`, `parse.*`, `why.driver.*` and the
  rows named in §2 above.

## 6 Wiring gaps, hand-offs and open findings closed

* **Wiring gaps** — W-IF-04 (the cell inspector, V09 §4.14); W-EDIT-01 (E-04); W-FLD-11 (`LocalDocRecord.appVersion` read at
  open, V09 §2.11, §3.1; `error.newerApp` row); V05-WGAP-1 (the sky un-displacement, V09 §3.4); V05-WGAP-2a
  (`bend.island.keepRoom`, `bend.island.rimStop`); V06-WGAP-1a (`bend.hood.noClock`); V09-WGAP-1 (the lost void,
  V09 §4.17.1); V09-WGAP-2 (IN-V09-4 → V09 §4.20.5 (1), §3.5, §4.3; IN-V09-5 → §4.3, §4.14, §5.7; IN-V09-6 → §4.3;
  IN-V09-7 → §4.14, §7.2; IN-V09-11 → §5.10 and file f item 447). The `why.driver.<driver>` family the why card read had no
  rows: now a family row (V09 §4.9). The progress view's stage messages have the base end named (cross-part note 5).
* **Hand-offs to V09 (26)** — V06 X6 (the device settings, V09 §5.12; the time card and its preview, V09 §5.6; the grey range,
  V09 §5.6; "Open a copy from here", V09 §3.9; the link edits, V09 §4.7), X21 (the delete's dry run, V09 §4.20.3; the time
  card's raised-way badge, V09 §5.6; V06 §4.2's hand forms, V09 §4.3; the advanced panel's `raisedWays` row, V09 §4.14), X30
  (the hood gate's bend, `repairRetaining`'s form, the retaining and deck-plot remove lines), X39 and X44 (confirmed);
  V08 X12, X15–X18, X20 (confirmed in V09's text); V10 CVR-V10-4, -7, -15 … -20 (confirmed); V11 X-V11-13 (V09 §2.6, §4.7,
  §4.20), X-V11-14 (no change needed), X-V11-17 (a) (the family glyphs, V09 §5.1; the reader's cells, V09 §4.16 (3)); V12
  X-V12-6 (V09 §4.14), X-V12-8 (V09 §7.2), X-V12-10 (V09 §4.20.3 (2)), X-V12-18 (no edit).
* **Hand-offs from V09** — V09 §10.2's closure table: every XV-V9-n met at its destination (verified in the rewritten V01–V07
  and the current V08, V10 texts) or ruled there (XV-V9-1, -2 by V09-XAGREE-1 at V11 §4.2; XV-V9-5 by V09-XAGREE-2, landed in
  V03 §3.7.4); XV-V9-31 and the new XV-V9-32 – XV-V9-35 are routed to V10, V06 and V11 (§9 below).
* **Open findings routed here (95)** — each fixed in the text: the 17 VOL-V09-V10-RESTATEMENTS (V09 §1b, §2.11, §3.2, §4.7,
  §4.17, §4.20, §5.12, §6.1); V09-RESTATE-1 – -6; V09-DUP-1; V09-ICONF-1 – -5; V09-XAGREE-1 – -3; V09-XCONF-1; V09-J121-1 – -5;
  V09-J122-1; V09-EDGE-1; V09-WGAP-1, -2; V09-MISSING-1 – -3; V09-TERM-1 – -4; V09-DEFER-1, -2; V09-NARR-1 – -8;
  V09-BREF-1 – -3; V09-HANDOFF-1, -2; the eleven equivalence rows (closed by the glossary and id rulings); SR6-02, SR6-03,
  SR6-06, SCC-115; IN-V09-1 – IN-V09-16 (folded; the Integration notes' map). None is marked for the adjudicator. §13 holds
  no open item.

## 7 Edges (principle (11))

V09 §3.16 states three general rules (degenerate geometry, every rung, the lifecycle) and 85 rows: 60 over the 58
mechanisms the catalogue names (every UNDEFINED and UNTESTED class of each), row 40 for EI-V09-EDGE-1, and rows 61–85 for
the 25 combinations this volume owns, with the owner's named combinations that reach the application closed at their rows.
The new §4.21 subsections state their own edges (each item's (last) clause) with their bars. T-V9-80 is the edge suite. §12
below maps each of the 186 catalogue entries to its row.

## 8 Judgment calls (vetoable)

J-V9.126 (the English article form), J-V9.127 (the untouched empty-state town dropped, never in Recent), J-V9.128 (Colour
vision per viewer with a machine default), J-V9.129 (the grandeur line from the shell's read of the ceiling table), J-V9.130
(the week slider, four chips and a follow switch that a manual pick turns off), J-V9.131 (eleven progress groups, a volume's
stage taking its predecessor's), J-V9.132 (the History chip as a peak and an age; `history.defaultAgeYears` 300), J-V9.133
(the oasis toggle on every ground site, hidden on Sky), J-V9.134 (patch rows only on a breached run), J-V9.135 (one edge
table and suite), J-V9.136 (V02's bend set). Also: `repairRaised`, `downgradeWay` and `upgradeWay` placed on T9 as §7.1's
binding homes them, against V06 §4.2's T4 (precedence: the base's home over a volume's restatement; XV-V9-34).

## 9 CROSS-PART NOTES

1. **V10 §4.2 (3)** — a creation proposal replacing the untouched empty-state town drops it, with no Recent entry (J-V9.127;
   XV-V9-32); V10 now reads "still in the recent documents".
2. **V10 §3.3** — the size words name V09 §4.5's quantiles, never a population number (V10-XAGREE-3; XV-V9-33).
3. **V10** — the building's why answer carries a `facts` row keyed `info.grand.beyondTier` (tier `declared`) or
   `info.grand.dossier` (tier `dossier`) when its design lies above the rung's ceiling (item 115 (c); V09 §4.21.5); the
   explanations of items 111, 114, 117 and 118 are V10's; `info.under.lost`'s words are V09's (V10 §3.9a names the reading).
4. **V06 §4.2** — `downgradeWay`, `upgradeWay` and `repairRaised` are T9's by §7.1's binding (XV-V9-34); V06 names T4.
5. **Base rendering §12 (item 119)** — the progress rule should name the generation worker's stage-start messages the
   shell reads (V09 §4.21.9 (3)); V09 is the rule's consumer.
6. **Base scope §16 and INDEX** — V09's AP11 (2–2.75 pw, items 111–119) and total 21.5–31.75; T-V9-76 – T-V9-78 cite the
   milestones §16's rows for items 116–118 name.
7. **Base model §2.9** — the year position, its follow flag and the festival display need their view-key names; V09 cites
   them as "§2.9's year position and follow flag" and "§2.9's festival display".
8. **Base §8.2 and §9.5** — the wall state rows and the legend draw `legend.wall.<state>` (V09's words) with each state's
   second cue; the season and decoration rows re-skin within §12.5's budget as V09 §6.3 reads it.
9. **V11** — a `label` cell on each `walls.patchMaterials` row (XV-V9-35); the union of `siting.declared`'s key forms and
   cells at V11 §4.2 (V09-XAGREE-1); the `messages` registry row's two row types (XV-V9-31); the grandeur ceiling table
   readable by the shell (§10.2's shape, item 115).
10. **V08 §5.5** — the frame's interface language read from SettlementForge's setting on `doc.load` (V08-XCONF-6), which
    V09 §5.12 cites.
11. **V12** — the register lines for items 114–119 name V09's screen bars T-V9-71 – T-V9-79 where they test screens; the K2
    fixture path is J-V12.58's.

## 10 Checks run (provisional where noted)

* `verify.py` (scratch): T-V9-1 – T-V9-80 each defined once, none cited undefined; J-V9.1 – J-V9.136 likewise; every
  `V09 §x` resolves to a heading or a numbered paragraph head of the new text.
* `xref.py` (scratch): 1 818 `Vnn §x` citations, every one resolving to a heading or numbered paragraph head of its target
  (the rewritten V01–V07; the current V08, V10, V11, V12).
* The catalogue coverage scan: 322 keys used; every one a row, a family row of V09 §4.9, or a family whose text is another
  volume's (V10's `clerk.*`, `critique.*`, `refuse.clerk.*`, V08's `host.*`), a retired key named only in J-V9.136, or a
  constant or field name.
* `chk.py`: no bare `Vn`, no review id outside V09 §10.2's request ids, no `DR-V` alias, no retired term in design prose (the
  catalogue's UI words "Rebuild from {stage}" and "Try again" kept by V09-TERM-4's rule and named in V09 §4.9's opening).
* `docs/validation/bench/doc_checks.py` on the new text — **WARNING: reference corpus INCOMPLETE (captures, research/patreon,
  research/devlogs, research/ftg-docs, research/external absent); clean-room results are NOT authoritative**: C1 1 hit (0
  unreviewed); C2 1 hit (`#FFFFFF`, `chrome.surface`, also in the source); C3 234 hits (230 unreviewed; common English runs,
  the source had 333); C4 0; S1 0 (after fixing AP11's row); S2 353 (the checker reads `Vnn §x` volume citations as base
  pointers; the source had 430). Provisional.

## 11 MAPPING TABLE — every inventory id of the volume → where it now lives

1 111 ids (918 home, 62 reference, 36 BCR pointers, 32 hand-offs, 25 index rows, 33 glossary, 3 owner answers, 2 history-out); 0 unmapped. Generated by `work/rewrite-V09/mapping.py` from the canon's inventory extract of V09 (`inventory-vol-V09-V10.json`); a home id lives at its section of the new text unless the row names another place.

| inventory id | kind | source § | role | where it now lives |
|---|---|---|---|---|
| V09-0001 | convention | header | home | the head's *How to read this volume* (citations, words, clean room, names) |
| V09-0002 | summary | 0 | home | V09 §0 |
| V09-0003 | summary | 0 | home | V09 §0 |
| V09-0004 | summary | 0 | home | V09 §0 |
| V09-0005 | summary | 0 | home | V09 §0 |
| V09-0006 | summary | 0 | home | V09 §0 |
| V09-0007 | summary | 0 | home | V09 §0 |
| V09-0008 | summary | 0 | home | V09 §0 |
| V09-0009 | summary | 0 | home | V09 §0 |
| V09-0010 | summary | 0 | home | V09 §0 |
| V09-0011 | scope | 1.1 | home | V09 §1.1 |
| V09-0012 | scope | 1.1 | home | V09 §1.1 |
| V09-0013 | scope | 1.1 | home | V09 §1.1 |
| V09-0014 | scope | 1.1 | home | V09 §1.1 |
| V09-0015 | scope | 1.1 | home | V09 §1.1 |
| V09-0016 | scope | 1.1 | home | V09 §1.1 |
| V09-0017 | hooks | 1.2 | index-row | V09 §1.2 (kept; the base section cited) |
| V09-0018 | hooks | 1.2 | index-row | V09 §1.2 (kept; the base section cited) |
| V09-0019 | hooks | 1.2 | home | V09 §1.2 |
| V09-0020 | scope | 1.3 | index-row | V09 §1.3 (kept; the base section cited) |
| V09-0021 | scope | 1.3 | index-row | V09 §1.3 (kept; the base section cited) |
| V09-0022 | scope | 1.3 | home | V09 §1.3 |
| V09-0023 | scope | 1.3 | home | V09 §1.3 |
| V09-0024 | wiring | 1b | home | V09 §1b |
| V09-0025 | wiring | 1b | home | V09 §1b |
| V09-0026 | wiring | 1b | home | V09 §1b |
| V09-0027 | wiring | 1b | home | V09 §1b |
| V09-0028 | wiring | 1b | home | V09 §1b |
| V09-0029 | wiring | 1b | home | V09 §1b |
| V09-0030 | wiring | 1b | home | V09 §1b |
| V09-0031 | wiring | 1b | home | V09 §1b |
| V09-0032 | wiring | 1b | home | V09 §1b |
| V09-0033 | wiring | 1b | home | V09 §1b |
| V09-0034 | wiring | 1b | home | V09 §1b |
| V09-0035 | wiring | 1b | home | V09 §1b |
| V09-0036 | wiring | 1b | home | V09 §1b |
| V09-0037 | wiring | 1b | home | V09 §1b |
| V09-0038 | wiring | 1b | home | V09 §1b |
| V09-0039 | wiring | 1b | home | V09 §1b |
| V09-0040 | wiring | 1b | home | V09 §1b |
| V09-0041 | wiring | 1b | home | V09 §1b |
| V09-0042 | wiring | 1b | home | V09 §1b |
| V09-0043 | wiring | 1b | home | V09 §1b |
| V09-0044 | wiring | 1b | home | V09 §1b |
| V09-0045 | wiring | 1b | home | V09 §1b |
| V09-0046 | wiring | 1b | home | V09 §1b |
| V09-0047 | wiring | 1b | home | V09 §1b |
| V09-0048 | wiring | 1b | home | V09 §1b |
| V09-0049 | wiring | 1b | home | V09 §1b |
| V09-0050 | wiring | 1b | home | V09 §1b |
| V09-0051 | wiring | 1b | home | V09 §1b |
| V09-0052 | wiring | 1b | home | V09 §1b |
| V09-0053 | wiring | 1b | home | V09 §1b |
| V09-0054 | wiring | 1b | home | V09 §1b |
| V09-0055 | wiring | 1b | home | V09 §1b |
| V09-0056 | wiring | 1b | home | V09 §1b |
| V09-0057 | wiring | 1b | home | V09 §1b |
| V09-0058 | wiring | 1b | home | V09 §1b |
| V09-0059 | wiring | 1b | home | V09 §1b |
| V09-0060 | wiring | 1b | home | V09 §1b |
| V09-0061 | wiring | 1b | home | V09 §1b |
| V09-0062 | wiring | 1b | home | V09 §1b |
| V09-0063 | wiring | 1b | home | V09 §1b |
| V09-0064 | wiring | 1b | home | V09 §1b |
| V09-0065 | wiring | 1b | home | V09 §1b |
| V09-0066 | wiring | 1b | home | V09 §1b |
| V09-0067 | wiring | 1b | home | V09 §1b |
| V09-0068 | wiring | 1b | home | V09 §1b |
| V09-0069 | wiring | 1b | home | V09 §1b |
| V09-0070 | wiring | 1b | home | V09 §1b |
| V09-0071 | wiring | 1b | home | V09 §1b |
| V09-0072 | wiring | 1b | home | V09 §1b |
| V09-0073 | wiring | 1b | home | V09 §1b |
| V09-0074 | wiring | 1b | home | V09 §1b |
| V09-0075 | wiring | 1b | home | V09 §1b |
| V09-0076 | wiring | 1b | home | V09 §1b |
| V09-0077 | wiring | 1b | home | V09 §1b |
| V09-0078 | wiring | 1b | home | V09 §1b |
| V09-0079 | wiring | 1b | home | V09 §1b |
| V09-0080 | wiring | 1b | home | V09 §1b |
| V09-0081 | wiring | 1b | home | V09 §1b |
| V09-0082 | wiring | 1b | home | V09 §1b |
| V09-0083 | wiring | 1b | home | V09 §1b |
| V09-0084 | wiring | 1b | home | V09 §1b |
| V09-0085 | wiring | 1b | home | V09 §1b |
| V09-0086 | wiring | 1b | home | V09 §1b |
| V09-0087 | wiring | 1b | home | V09 §1b |
| V09-0088 | wiring | 1b | home | V09 §1b |
| V09-0089 | wiring | 1b | home | V09 §1b |
| V09-0090 | wiring | 1b | home | V09 §1b |
| V09-0091 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0092 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0093 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0094 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0095 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0096 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0097 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0098 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0099 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0100 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0101 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0102 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0103 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0104 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0105 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0106 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0107 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0108 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0109 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0110 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0111 | dossier-fact | 1b | index-row | V09 §1b (kept; the base section cited) |
| V09-0112 | rule | 2 | home | V09 §2 |
| V09-0113 | table | 2.1 | home | V09 §2.1 |
| V09-0114 | type | 2.2 | home | V09 §2.2 |
| V09-0115 | type | 2.2 | home | V09 §2.2 |
| V09-0116 | type | 2.2 | home | V09 §2.2 |
| V09-0117 | type | 2.2 | home | V09 §2.2 |
| V09-0118 | table-def | 2.3 | home | V09 §2.3 |
| V09-0119 | type | 2.3 | home | V09 §2.3 |
| V09-0120 | lifecycle | 2.3 | home | V09 §2.3 |
| V09-0121 | type | 2.4 | home | V09 §2.4 |
| V09-0122 | type | 2.4 | home | V09 §2.4 |
| V09-0123 | type | 2.4 | home | V09 §2.4 |
| V09-0124 | rule | 2.4 | home | V09 §2.4 |
| V09-0125 | type | 2.5 | home | V09 §2.5 |
| V09-0126 | type | 2.5 | home | V09 §2.5 |
| V09-0127 | rule | 2.5 | home | V09 §2.5 |
| V09-0128 | rule | 2.6 | reference | reference → V11 §1b (cited, never restated, at V09 §2.6) |
| V09-0129 | table | 2.6 | home | V09 §2.6 |
| V09-0130 | rule | 2.6 | reference | reference → V11 §2.4 (cited, never restated, at V09 §2.6) |
| V09-0131 | rule | 2.7 | reference | reference → V10 §1.1 (cited, never restated, at V09 §2.7) |
| V09-0132 | type | 2.7 | home | V09 §2.7 |
| V09-0133 | table | 2.7 | home | V09 §2.7 |
| V09-0134 | rule | 2.7 | home | V09 §2.7 |
| V09-0135 | type | 2.7 | home | V09 §2.7 |
| V09-0136 | rule | 2.7 | reference | reference → §2.9 (cited, never restated, at V09 §2.7) |
| V09-0137 | type | 2.8 | home | V09 §2.8 |
| V09-0138 | type | 2.8 | home | V09 §2.8 |
| V09-0139 | rule | 2.8 | home | V09 §2.8 |
| V09-0140 | type | 2.9 | home | V09 §2.9 |
| V09-0141 | type | 2.9 | home | V09 §2.9 |
| V09-0142 | rule | 2.9 | home | V09 §2.9 |
| V09-0143 | rule | 2.9 | home | V09 §2.9 |
| V09-0144 | table-def | 2.9 | home | V09 §2.9 |
| V09-0145 | rule | 2.10 | reference | reference → V10 §1b.1 (cited, never restated, at V09 §2.10) |
| V09-0146 | interface | 2.10 | home | V09 §2.10 |
| V09-0147 | interface | 2.10 | home | V09 §2.10 |
| V09-0148 | interface | 2.10 | home | V09 §2.10 |
| V09-0149 | rule | 2.10 | home | V09 §2.10 |
| V09-0150 | rule | 2.10 | reference | reference → V10 §2.2 (cited, never restated, at V09 §2.10) |
| V09-0151 | type | 2.11 | home | V09 §2.11 |
| V09-0152 | type | 2.11 | home | V09 §2.11 |
| V09-0153 | rule | 2.11 | home | V09 §2.11 |
| V09-0154 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0155 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0156 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0157 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0158 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0159 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0160 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0161 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0162 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0163 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0164 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0165 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0166 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0167 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0168 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0169 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0170 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0171 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0172 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0173 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0174 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0175 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0176 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0177 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0178 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0179 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0180 | lifecycle | 2.12 | home | V09 §2.12 |
| V09-0181 | rule | 3 | home | V09 §3 |
| V09-0182 | step | 3.1 | home | V09 §3.1 |
| V09-0183 | step | 3.1 | home | V09 §3.1 |
| V09-0184 | step | 3.2 | home | V09 §3.2 |
| V09-0185 | rule | 3.2 | home | V09 §3.2 |
| V09-0186 | table | 3.3 | home | V09 §3.3 |
| V09-0187 | rule | 3.3 | home | V09 §3.3 |
| V09-0188 | rule | 3.3 | home | V09 §3.3 |
| V09-0189 | rule | 3.3 | home | V09 §3.3 |
| V09-0190 | table | 3.4 | home | V09 §3.4 |
| V09-0191 | rule | 3.4 | home | V09 §3.4 |
| V09-0192 | rule | 3.4 | reference | reference → §14 (cited, never restated, at V09 §3.4) |
| V09-0193 | rule | 3.5 | home | V09 §3.5 |
| V09-0194 | table | 3.5 | home | V09 §3.5 |
| V09-0195 | rule | 3.5 | reference | reference → V02 §8.3 (cited, never restated, at V09 §3.5) |
| V09-0196 | rule | 3.6 | home | V09 §3.6 |
| V09-0197 | rule | 3.6 | home | V09 §3.6 |
| V09-0198 | table | 3.6 | home | V09 §3.6 |
| V09-0199 | rule | 3.7 | home | V09 §3.7 |
| V09-0200 | rule | 3.7 | home | V09 §3.7 |
| V09-0201 | step | 3.8 | home | V09 §3.8 |
| V09-0202 | step | 3.8 | home | V09 §3.8 |
| V09-0203 | step | 3.8 | home | V09 §3.8 |
| V09-0204 | rule | 3.9 | reference | reference → §7.4 (cited, never restated, at V09 §3.9) |
| V09-0205 | rule | 3.9 | home | V09 §3.9 |
| V09-0206 | rule | 3.9 | reference | reference → V06 §4.4 (cited, never restated, at V09 §3.9) |
| V09-0207 | rule | 3.9 | reference | reference → V06 §9 (cited, never restated, at V09 §3.9) |
| V09-0208 | rule | 3.9 | home | V09 §3.9 |
| V09-0209 | step | 3.10 | home | V09 §3.10 |
| V09-0210 | rule | 3.11 | reference | reference → §6.4 (cited, never restated, at V09 §3.11) |
| V09-0211 | rule | 3.12 | home | V09 §3.12 |
| V09-0212 | rule | 3.12 | home | V09 §3.12 |
| V09-0213 | rule | 3.12 | home | V09 §3.12 |
| V09-0214 | rule | 3.13 | home | V09 §3.13 |
| V09-0215 | table | 3.14 | home | V09 §3.14 |
| V09-0216 | table | 3.14 | home | V09 §3.14 |
| V09-0217 | rule | 3.15 | home | V09 §3.15 |
| V09-0218 | rule | 4.1 | home | V09 §4.1 |
| V09-0219 | rule | 4.2 | home | V09 §4.2 |
| V09-0220 | rule | 4.2 | home | V09 §4.2 |
| V09-0221 | rule | 4.2 | home | V09 §4.2 |
| V09-0222 | rule | 4.2 | home | V09 §4.2 |
| V09-0223 | rule | 4.3 | home | V09 §4.3 |
| V09-0224 | binding | 4.3 | home | V09 §4.3 |
| V09-0225 | binding | 4.3 | home | V09 §4.3 |
| V09-0226 | binding | 4.3 | home | V09 §4.3 |
| V09-0227 | binding | 4.3 | home | V09 §4.3 |
| V09-0228 | binding | 4.3 | home | V09 §4.3 |
| V09-0229 | binding | 4.3 | home | V09 §4.3 |
| V09-0230 | binding | 4.3 | home | V09 §4.3 |
| V09-0231 | binding | 4.3 | home | V09 §4.3 |
| V09-0232 | binding | 4.3 | home | V09 §4.3 |
| V09-0233 | binding | 4.3 | home | V09 §4.3 |
| V09-0234 | binding | 4.3 | home | V09 §4.3 |
| V09-0235 | binding | 4.3 | home | V09 §4.3 |
| V09-0236 | binding | 4.3 | home | V09 §4.3 |
| V09-0237 | binding | 4.3 | home | V09 §4.3 |
| V09-0238 | binding | 4.3 | home | V09 §4.3 |
| V09-0239 | binding | 4.3 | home | V09 §4.3 |
| V09-0240 | binding | 4.3 | home | V09 §4.3 |
| V09-0241 | binding | 4.3 | home | V09 §4.3 |
| V09-0242 | binding | 4.3 | home | V09 §4.3 |
| V09-0243 | binding | 4.3 | home | V09 §4.3 |
| V09-0244 | binding | 4.3 | home | V09 §4.3 |
| V09-0245 | binding | 4.3 | home | V09 §4.3 |
| V09-0246 | binding | 4.3 | home | V09 §4.3 |
| V09-0247 | binding | 4.3 | home | V09 §4.3 |
| V09-0248 | binding | 4.3 | home | V09 §4.3 |
| V09-0249 | binding | 4.3 | home | V09 §4.3 |
| V09-0250 | binding | 4.3 | home | V09 §4.3 |
| V09-0251 | binding | 4.3 | home | V09 §4.3 |
| V09-0252 | binding | 4.3 | home | V09 §4.3 |
| V09-0253 | binding | 4.3 | home | V09 §4.3 |
| V09-0254 | binding | 4.3 | home | V09 §4.3 |
| V09-0255 | binding | 4.3 | home | V09 §4.3 |
| V09-0256 | binding | 4.3 | home | V09 §4.3 |
| V09-0257 | binding | 4.3 | home | V09 §4.3 |
| V09-0258 | binding | 4.3 | home | V09 §4.3 |
| V09-0259 | binding | 4.3 | home | V09 §4.3 |
| V09-0260 | binding | 4.3 | home | V09 §4.3 |
| V09-0261 | binding | 4.3 | home | V09 §4.3 |
| V09-0262 | binding | 4.3 | home | V09 §4.3 |
| V09-0263 | binding | 4.3 | home | V09 §4.3 |
| V09-0264 | binding | 4.3 | home | V09 §4.3 |
| V09-0265 | binding | 4.3 | home | V09 §4.3 |
| V09-0266 | binding | 4.3 | home | V09 §4.3 |
| V09-0267 | binding | 4.3 | home | V09 §4.3 |
| V09-0268 | binding | 4.3 | home | V09 §4.3 |
| V09-0269 | binding | 4.3 | home | V09 §4.3 |
| V09-0270 | binding | 4.3 | home | V09 §4.3 |
| V09-0271 | binding | 4.3 | home | V09 §4.3 |
| V09-0272 | binding | 4.3 | home | V09 §4.3 |
| V09-0273 | binding | 4.3 | home | V09 §4.3 |
| V09-0274 | binding | 4.3 | home | V09 §4.3 |
| V09-0275 | binding | 4.3 | home | V09 §4.3 |
| V09-0276 | binding | 4.3 | home | V09 §4.3 |
| V09-0277 | binding | 4.3 | home | V09 §4.3 |
| V09-0278 | rule | 4.4 | home | V09 §4.4 |
| V09-0279 | rule | 4.4 | home | V09 §4.4 |
| V09-0280 | rule | 4.4 | home | V09 §4.4 |
| V09-0281 | rule | 4.5 | home | V09 §4.5 |
| V09-0282 | tool | 4.5 | home | V09 §4.5 |
| V09-0283 | tool | 4.5 | home | V09 §4.5 |
| V09-0284 | tool | 4.5 | home | V09 §4.5 |
| V09-0285 | tool | 4.5 | home | V09 §4.5 |
| V09-0286 | tool | 4.5 | home | V09 §4.5 |
| V09-0287 | tool | 4.5 | home | V09 §4.5 |
| V09-0288 | tool | 4.5 | home | V09 §4.5 |
| V09-0289 | tool | 4.5 | home | V09 §4.5 |
| V09-0290 | tool | 4.5 | home | V09 §4.5 |
| V09-0291 | tool | 4.5 | home | V09 §4.5 |
| V09-0292 | tool | 4.5 | home | V09 §4.5 |
| V09-0293 | tool | 4.5 | home | V09 §4.5 |
| V09-0294 | rule | 4.6 | home | V09 §4.6 |
| V09-0295 | rule | 4.6 | home | V09 §4.6 |
| V09-0296 | rule | 4.7 | home | V09 §4.7 |
| V09-0297 | rule | 4.7 | home | V09 §4.7 |
| V09-0298 | rule | 4.7 | home | V09 §4.7 |
| V09-0299 | rule | 4.7 | home | V09 §4.7 |
| V09-0300 | rule | 4.8 | home | V09 §4.8 |
| V09-0301 | rule | 4.8 | reference | reference → V08 §9 (cited, never restated, at V09 §4.8) |
| V09-0302 | message | 4.9 | home | V09 §4.9 |
| V09-0303 | message | 4.9 | home | V09 §4.9 |
| V09-0304 | message | 4.9 | home | V09 §4.9 |
| V09-0305 | message | 4.9 | home | V09 §4.9 |
| V09-0306 | message | 4.9 | home | V09 §4.9 |
| V09-0307 | message | 4.9 | home | V09 §4.9 |
| V09-0308 | message | 4.9 | home | V09 §4.9 |
| V09-0309 | message | 4.9 | home | V09 §4.9 |
| V09-0310 | message | 4.9 | home | V09 §4.9 |
| V09-0311 | message | 4.9 | home | V09 §4.9 |
| V09-0312 | message | 4.9 | home | V09 §4.9 |
| V09-0313 | message | 4.9 | home | V09 §4.9 |
| V09-0314 | message | 4.9 | home | V09 §4.9 |
| V09-0315 | message | 4.9 | home | V09 §4.9 |
| V09-0316 | message | 4.9 | home | V09 §4.9 |
| V09-0317 | message | 4.9 | home | V09 §4.9 |
| V09-0318 | message | 4.9 | home | V09 §4.9 |
| V09-0319 | message | 4.9 | home | V09 §4.9 |
| V09-0320 | message | 4.9 | home | V09 §4.9 |
| V09-0321 | message | 4.9 | home | V09 §4.9 |
| V09-0322 | message | 4.9 | home | V09 §4.9 |
| V09-0323 | message | 4.9 | home | V09 §4.9 |
| V09-0324 | message | 4.9 | home | V09 §4.9 |
| V09-0325 | message | 4.9 | home | V09 §4.9 |
| V09-0326 | message | 4.9 | home | V09 §4.9 |
| V09-0327 | message | 4.9 | home | V09 §4.9 |
| V09-0328 | message | 4.9 | home | V09 §4.9 |
| V09-0329 | message | 4.9 | home | V09 §4.9 |
| V09-0330 | message | 4.9 | home | V09 §4.9 |
| V09-0331 | message | 4.9 | home | V09 §4.9 |
| V09-0332 | message | 4.9 | home | V09 §4.9 |
| V09-0333 | message | 4.9 | home | V09 §4.9 |
| V09-0334 | message | 4.9 | home | V09 §4.9 |
| V09-0335 | message | 4.9 | home | V09 §4.9 |
| V09-0336 | message | 4.9 | home | V09 §4.9 |
| V09-0337 | message | 4.9 | home | V09 §4.9 |
| V09-0338 | message | 4.9 | home | V09 §4.9 |
| V09-0339 | message | 4.9 | home | V09 §4.9 |
| V09-0340 | message | 4.9 | home | V09 §4.9 |
| V09-0341 | message | 4.9 | home | V09 §4.9 |
| V09-0342 | message | 4.9 | home | V09 §4.9 |
| V09-0343 | message | 4.9 | home | V09 §4.9 |
| V09-0344 | message | 4.9 | home | V09 §4.9 |
| V09-0345 | message | 4.9 | home | V09 §4.9 |
| V09-0346 | message | 4.9 | home | V09 §4.9 |
| V09-0347 | message | 4.9 | home | V09 §4.9 |
| V09-0348 | message | 4.9 | home | V09 §4.9 |
| V09-0349 | message | 4.9 | home | V09 §4.9 |
| V09-0350 | message | 4.9 | home | V09 §4.9 |
| V09-0351 | message | 4.9 | home | V09 §4.9 |
| V09-0352 | message | 4.9 | home | V09 §4.9 |
| V09-0353 | message | 4.9 | home | V09 §4.9 |
| V09-0354 | message | 4.9 | home | V09 §4.9 |
| V09-0355 | message | 4.9 | home | V09 §4.9 |
| V09-0356 | message | 4.9 | home | V09 §4.9 |
| V09-0357 | message | 4.9 | home | V09 §4.9 |
| V09-0358 | message | 4.9 | home | V09 §4.9 |
| V09-0359 | message | 4.9 | home | V09 §4.9 |
| V09-0360 | message | 4.9 | home | V09 §4.9 |
| V09-0361 | message | 4.9 | home | retired by E-32: the unreachable clerk is `refuse.clerk.offline` (V10 §3.16; V09 §4.9's `refuse.clerk.*` family) |
| V09-0362 | message | 4.9 | home | V09 §4.9 |
| V09-0363 | message | 4.9 | home | V09 §4.9 |
| V09-0364 | message | 4.9 | home | V09 §4.9 |
| V09-0365 | message | 4.9 | home | V09 §4.9 |
| V09-0366 | message | 4.9 | home | V09 §4.9 |
| V09-0367 | message | 4.9 | home | V09 §4.9 |
| V09-0368 | message | 4.9 | home | V09 §4.9 |
| V09-0369 | message | 4.9 | home | V09 §4.9 |
| V09-0370 | message | 4.9 | home | V09 §4.9 |
| V09-0371 | message | 4.9 | home | V09 §4.9 |
| V09-0372 | message | 4.9 | home | V09 §4.9 |
| V09-0373 | message | 4.9 | home | V09 §4.9 |
| V09-0374 | message | 4.9 | home | V09 §4.9 |
| V09-0375 | message | 4.9 | home | V09 §4.9 |
| V09-0376 | message | 4.9 | home | V09 §4.9 |
| V09-0377 | message | 4.9 | home | V09 §4.9 |
| V09-0378 | message | 4.9 | home | V09 §4.9 |
| V09-0379 | message | 4.9 | home | V09 §4.9 |
| V09-0380 | message | 4.9 | home | V09 §4.9 |
| V09-0381 | message | 4.9 | home | V09 §4.9 |
| V09-0382 | message | 4.9 | home | V09 §4.9 |
| V09-0383 | message | 4.9 | home | V09 §4.9 (`bend.crypt.largest`, worded to V03 §3.7.4's rank cap; V09-XAGREE-2) |
| V09-0384 | message | 4.9 | home | V09 §4.9 |
| V09-0385 | message | 4.9 | home | V09 §4.9 |
| V09-0386 | message | 4.9 | home | V09 §4.9 |
| V09-0387 | message | 4.9 | home | V09 §4.9 |
| V09-0388 | message | 4.9 | home | V09 §4.9 |
| V09-0389 | message | 4.9 | home | V09 §4.9 |
| V09-0390 | message | 4.9 | home | V09 §4.9 |
| V09-0391 | message | 4.9 | home | V09 §4.9 |
| V09-0392 | message | 4.9 | home | V09 §4.9 |
| V09-0393 | message | 4.9 | home | V09 §4.9 |
| V09-0394 | message | 4.9 | home | V09 §4.9 |
| V09-0395 | message | 4.9 | home | V09 §4.9 |
| V09-0396 | message | 4.9 | home | V09 §4.9 |
| V09-0397 | message | 4.9 | home | V09 §4.9 |
| V09-0398 | message | 4.9 | home | V09 §4.9 |
| V09-0399 | message | 4.9 | home | V09 §4.9 |
| V09-0400 | message | 4.9 | home | V09 §4.9 |
| V09-0401 | message | 4.9 | home | V09 §4.9 |
| V09-0402 | message | 4.9 | home | V09 §4.9 |
| V09-0403 | message | 4.9 | home | V09 §4.9 |
| V09-0404 | message | 4.9 | home | V09 §4.9 |
| V09-0405 | message | 4.9 | home | V09 §4.9 |
| V09-0406 | message | 4.9 | home | V09 §4.9 |
| V09-0407 | message | 4.9 | home | V09 §4.9 |
| V09-0408 | message | 4.9 | home | V09 §4.9 |
| V09-0409 | message | 4.9 | home | V09 §4.9 |
| V09-0410 | message | 4.9 | home | V09 §4.9 |
| V09-0411 | message | 4.9 | home | V09 §4.9 |
| V09-0412 | message | 4.9 | home | V09 §4.9 |
| V09-0413 | message | 4.9 | home | V09 §4.9 |
| V09-0414 | message | 4.9 | home | V09 §4.9 |
| V09-0415 | message | 4.9 | home | V09 §4.9 |
| V09-0416 | message | 4.9 | home | V09 §4.9 |
| V09-0417 | message | 4.9 | home | V09 §4.9 |
| V09-0418 | message | 4.9 | home | V09 §4.9 |
| V09-0419 | message | 4.9 | home | V09 §4.9 |
| V09-0420 | message | 4.9 | home | V09 §4.9 |
| V09-0421 | message | 4.9 | home | V09 §4.9 |
| V09-0422 | message | 4.9 | home | V09 §4.9 |
| V09-0423 | message | 4.9 | home | V09 §4.9 |
| V09-0424 | message | 4.9 | home | V09 §4.9 |
| V09-0425 | message | 4.9 | home | V09 §4.9 |
| V09-0426 | message | 4.9 | home | V09 §4.9 |
| V09-0427 | message | 4.9 | home | V09 §4.9 |
| V09-0428 | message | 4.9 | home | V09 §4.9 |
| V09-0429 | message | 4.9 | home | V09 §4.9 |
| V09-0430 | message | 4.9 | home | V09 §4.9 |
| V09-0431 | message | 4.9 | home | V09 §4.9 |
| V09-0432 | message | 4.9 | home | V09 §4.9 |
| V09-0433 | message | 4.9 | home | V09 §4.9 |
| V09-0434 | message | 4.9 | home | retired for V02 §1b's set (J-V9.136): `bend.tiers.axial` (V09 §4.9) |
| V09-0435 | message | 4.9 | home | V09 §4.9 |
| V09-0436 | message | 4.9 | home | retired for V02 §1b's set (J-V9.136): `bend.tiers.none` / `bend.tiers.axial` (V09 §4.9) |
| V09-0437 | message | 4.9 | home | retired for V02 §1b's set (J-V9.136): `bend.tiers.internal` / `bend.tiers.none` (V09 §4.9) |
| V09-0438 | message | 4.9 | home | retired for V02 §1b's set (J-V9.136): `bend.stack.groundWing` (V09 §4.9) |
| V09-0439 | message | 4.9 | home | retired for V02 §1b's set (J-V9.136): `bend.deck.single` (V09 §4.9) |
| V09-0440 | message | 4.9 | home | retired for V02 §1b's set (J-V9.136): `bend.tiers.stepped` (V09 §4.9) |
| V09-0441 | message | 4.9 | home | V09 §4.9 |
| V09-0442 | message | 4.9 | home | V09 §4.9 |
| V09-0443 | message | 4.9 | home | V09 §4.9 |
| V09-0444 | message | 4.9 | home | V09 §4.9 |
| V09-0445 | message | 4.9 | home | V09 §4.9 |
| V09-0446 | message | 4.9 | home | V09 §4.9 |
| V09-0447 | message | 4.9 | home | V09 §4.9 |
| V09-0448 | message | 4.9 | home | V09 §4.9 |
| V09-0449 | message | 4.9 | home | V09 §4.9 |
| V09-0450 | message | 4.9 | home | V09 §4.9 |
| V09-0451 | message | 4.9 | home | V09 §4.9 |
| V09-0452 | message | 4.9 | home | V09 §4.9 |
| V09-0453 | message | 4.9 | home | V09 §4.9 |
| V09-0454 | message | 4.9 | home | V09 §4.9 |
| V09-0455 | message | 4.9 | home | V09 §4.9 |
| V09-0456 | message | 4.9 | home | V09 §4.9 |
| V09-0457 | message | 4.9 | home | V09 §4.9 |
| V09-0458 | message | 4.9 | home | V09 §4.9 |
| V09-0459 | message | 4.9 | home | V09 §4.9 |
| V09-0460 | message | 4.9 | home | V09 §4.9 |
| V09-0461 | event-form | 4.9 | home | V09 §4.9 |
| V09-0462 | event-form | 4.9 | home | V09 §4.9 |
| V09-0463 | event-form | 4.9 | home | V09 §4.9 |
| V09-0464 | event-form | 4.9 | home | V09 §4.9 |
| V09-0465 | event-form | 4.9 | home | V09 §4.9 |
| V09-0466 | event-form | 4.9 | home | V09 §4.9 |
| V09-0467 | event-form | 4.9 | home | V09 §4.9 |
| V09-0468 | event-form | 4.9 | home | V09 §4.9 |
| V09-0469 | event-form | 4.9 | home | retired with `bend.stack.notStepped` (J-V9.136): the bend makes the building stepped itself |
| V09-0470 | event-form | 4.9 | home | V09 §4.9 |
| V09-0471 | event-form | 4.9 | home | V09 §4.9 |
| V09-0472 | event-form | 4.9 | home | V09 §4.9 |
| V09-0473 | event-form | 4.9 | home | V09 §4.9 |
| V09-0474 | event-form | 4.9 | home | V09 §4.9 |
| V09-0475 | event-form | 4.9 | home | V09 §4.9 |
| V09-0476 | event-form | 4.9 | home | V09 §4.9 |
| V09-0477 | event-form | 4.9 | home | V09 §4.9 |
| V09-0478 | event-form | 4.9 | home | V09 §4.9 |
| V09-0479 | event-form | 4.9 | home | V09 §4.9 |
| V09-0480 | app-command | 4.9 | home | V09 §4.9 |
| V09-0481 | app-command | 4.9 | home | V09 §4.9 |
| V09-0482 | app-command | 4.9 | home | V09 §4.9 |
| V09-0483 | app-command | 4.9 | home | V09 §4.9 |
| V09-0484 | app-command | 4.9 | home | V09 §4.9 |
| V09-0485 | app-command | 4.9 | home | V09 §4.9 |
| V09-0486 | app-command | 4.9 | home | V09 §4.9 |
| V09-0487 | app-command | 4.9 | home | V09 §4.9 |
| V09-0488 | app-command | 4.9 | home | V09 §4.9 |
| V09-0489 | app-command | 4.9 | home | V09 §4.9 |
| V09-0490 | app-command | 4.9 | home | V09 §4.9 |
| V09-0491 | app-command | 4.9 | home | V09 §4.9 |
| V09-0492 | app-command | 4.9 | home | V09 §4.9 |
| V09-0493 | app-command | 4.9 | home | V09 §4.9 |
| V09-0494 | app-command | 4.9 | home | V09 §4.9 |
| V09-0495 | app-command | 4.9 | home | V09 §4.9 |
| V09-0496 | app-command | 4.9 | home | V09 §4.9 |
| V09-0497 | app-command | 4.9 | home | V09 §4.9 |
| V09-0498 | app-command | 4.9 | home | V09 §4.9 |
| V09-0499 | app-command | 4.9 | home | V09 §4.9 |
| V09-0500 | app-command | 4.9 | home | V09 §4.9 |
| V09-0501 | key-family | 4.9 | reference | reference → V10 §1b.1 (cited, never restated, at V09 §4.9) |
| V09-0502 | key-family | 4.9 | reference | reference → V10 §7.1 (cited, never restated, at V09 §4.9) |
| V09-0503 | key-family | 4.9 | reference | reference → V10 §1b.1 (cited, never restated, at V09 §4.9) |
| V09-0504 | key-family | 4.9 | reference | reference → V10 §9 (cited, never restated, at V09 §4.9) |
| V09-0505 | key-family | 4.9 | reference | reference → V10 §1b.1 (cited, never restated, at V09 §4.9) |
| V09-0506 | key-family | 4.9 | reference | reference → V10 §1b.1 (cited, never restated, at V09 §4.9) |
| V09-0507 | key-family | 4.9 | reference | reference → V10 §7.1 (cited, never restated, at V09 §4.9) |
| V09-0508 | key-family | 4.9 | reference | reference → V10 §1b.1 (cited, never restated, at V09 §4.9) |
| V09-0509 | key-family | 4.9 | reference | reference → V10 §7.1 (cited, never restated, at V09 §4.9) |
| V09-0510 | key-family | 4.9 | reference | reference → V10 §1b.1 (cited, never restated, at V09 §4.9) |
| V09-0511 | key-family | 4.9 | reference | reference → V10 §1b.1 (cited, never restated, at V09 §4.9) |
| V09-0512 | rule | 4.9 | home | V09 §4.9 |
| V09-0513 | table | 4.9 | home | V09 §4.9 |
| V09-0514 | rule | 4.9 | home | V09 §4.9 |
| V09-0515 | rule | 4.9 | home | V09 §4.9 |
| V09-0516 | rule | 4.9 | reference | reference → V10 §7.1 (cited, never restated, at V09 §4.9) |
| V09-0517 | history-template | 4.10 | home | V09 §4.10 |
| V09-0518 | history-template | 4.10 | home | V09 §4.10 |
| V09-0519 | history-template | 4.10 | home | V09 §4.10 |
| V09-0520 | history-template | 4.10 | home | V09 §4.10 |
| V09-0521 | history-template | 4.10 | home | V09 §4.10 |
| V09-0522 | history-template | 4.10 | home | V09 §4.10 |
| V09-0523 | history-template | 4.10 | home | V09 §4.10 |
| V09-0524 | history-template | 4.10 | home | V09 §4.10 |
| V09-0525 | history-template | 4.10 | home | V09 §4.10 |
| V09-0526 | history-template | 4.10 | home | V09 §4.10 |
| V09-0527 | history-template | 4.10 | home | V09 §4.10 |
| V09-0528 | history-template | 4.10 | home | V09 §4.10 |
| V09-0529 | history-template | 4.10 | home | V09 §4.10 |
| V09-0530 | history-template | 4.10 | home | V09 §4.10 |
| V09-0531 | history-template | 4.10 | home | V09 §4.10 |
| V09-0532 | history-template | 4.10 | home | V09 §4.10 |
| V09-0533 | history-template | 4.10 | home | V09 §4.10 |
| V09-0534 | history-template | 4.10 | home | V09 §4.10 |
| V09-0535 | history-template | 4.10 | home | V09 §4.10 |
| V09-0536 | history-template | 4.10 | home | V09 §4.10 |
| V09-0537 | history-template | 4.10 | home | V09 §4.10 |
| V09-0538 | history-template | 4.10 | home | V09 §4.10 |
| V09-0539 | history-template | 4.10 | home | V09 §4.10 |
| V09-0540 | history-template | 4.10 | home | V09 §4.10 |
| V09-0541 | history-template | 4.10 | home | V09 §4.10 |
| V09-0542 | history-template | 4.10 | home | V09 §4.10 |
| V09-0543 | history-template | 4.10 | home | V09 §4.10 |
| V09-0544 | history-template | 4.10 | home | V09 §4.10 |
| V09-0545 | history-template | 4.10 | home | V09 §4.10 |
| V09-0546 | rule | 4.10 | home | V09 §4.10 |
| V09-0547 | rule | 4.10 | home | V09 §4.10 |
| V09-0548 | rule | 4.10 | reference | reference → V08 §4.6 (cited, never restated, at V09 §4.10) |
| V09-0549 | rule | 4.10 | home | V09 §4.10 |
| V09-0550 | rule | 4.10 | home | V09 §4.10 |
| V09-0551 | rule | 4.11 | home | V09 §4.11 |
| V09-0552 | rule | 4.11 | home | V09 §4.11 |
| V09-0553 | rule | 4.11 | reference | reference → V10 §2.6 (cited, never restated, at V09 §4.11) |
| V09-0554 | rule | 4.11 | reference | reference → V10 §3.11 (cited, never restated, at V09 §4.11) |
| V09-0555 | rule | 4.11 | home | V09 §4.11 |
| V09-0556 | rule | 4.11 | home | V09 §4.11 |
| V09-0557 | rule | 4.11 | home | V09 §4.11 |
| V09-0558 | rule | 4.11 | home | V09 §4.11 |
| V09-0559 | rule | 4.11 | reference | reference → V10 §2.2 (cited, never restated, at V09 §4.11) |
| V09-0560 | decision | 4.12 | home | V09 §4.12 |
| V09-0561 | rule | 4.12 | home | V09 §4.12 |
| V09-0562 | table | 4.13 | home | V09 §4.13 |
| V09-0563 | rule | 4.14 | home | V09 §4.14 |
| V09-0564 | rule | 4.14 | reference | reference → §7.6 (cited, never restated, at V09 §4.14) |
| V09-0565 | rule | 4.15 | home | V09 §4.15 |
| V09-0566 | rule | 4.15 | home | V09 §4.15 |
| V09-0567 | rule | 4.16 | home | V09 §4.16 |
| V09-0568 | rule | 4.16 | home | V09 §4.16 |
| V09-0569 | rule | 4.17 | reference | reference →  (cited, never restated, at V09 §4.17) |
| V09-0570 | rule | 4.17.1 | reference | reference → V04 §9 (cited, never restated, at V09 §4.17.1) |
| V09-0571 | rule | 4.17.2 | home | V09 §4.17.2 |
| V09-0572 | rule | 4.17.3 | home | V09 §4.17.3 |
| V09-0573 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0574 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0575 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0576 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0577 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0578 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0579 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0580 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0581 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0582 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0583 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0584 | access-cause | 4.17.3 | home | V09 §4.17.3 |
| V09-0585 | rule | 4.17.3 | home | V09 §4.17.3 |
| V09-0586 | rule | 4.17.4 | home | V09 §4.17.4 |
| V09-0587 | rule | 4.17.4 | home | V09 §4.17.4 |
| V09-0588 | rule | 4.17.5 | home | V09 §4.17.5 |
| V09-0589 | rule | 4.17.5 | home | V09 §4.17.5 |
| V09-0590 | rule | 4.17.5 | home | V09 §4.17.5 (the crypt rows by key, V10 §3.9a; wet ground V03 §3.7.4; V10-XAGREE-4) |
| V09-0591 | rule | 4.17.5 | home | V09 §4.17.5 |
| V09-0592 | rule | 4.17.5 | reference | reference → V04 §4.3 (cited, never restated, at V09 §4.17.5) |
| V09-0593 | rule | 4.18 | home | V09 §4.18 |
| V09-0594 | rule | 4.19 | reference | reference → §2.9 (cited, never restated, at V09 §4.19) |
| V09-0595 | view-control | 4.19 | reference | reference → §9.5 (cited, never restated, at V09 §4.19) |
| V09-0596 | view-control | 4.19 | reference | reference →  (cited, never restated, at V09 §4.19) |
| V09-0597 | view-control | 4.19 | reference | reference →  (cited, never restated, at V09 §4.19) |
| V09-0598 | view-control | 4.19 | reference | reference → §4.2 (cited, never restated, at V09 §4.19) |
| V09-0599 | view-control | 4.19 | reference | reference → §8 (cited, never restated, at V09 §4.19) |
| V09-0600 | view-control | 4.19 | reference | reference → §2.9 (cited, never restated, at V09 §4.19) |
| V09-0601 | view-control | 4.19 | reference | reference →  (cited, never restated, at V09 §4.19) |
| V09-0602 | view-control | 4.19 | reference | reference →  (cited, never restated, at V09 §4.19) |
| V09-0603 | view-control | 4.19 | reference | reference →  (cited, never restated, at V09 §4.19) |
| V09-0604 | view-control | 4.19 | reference | reference → §11.3 (cited, never restated, at V09 §4.19) |
| V09-0605 | view-control | 4.19 | reference | reference →  (cited, never restated, at V09 §4.19) |
| V09-0606 | view-control | 4.19 | reference | reference →  (cited, never restated, at V09 §4.19) |
| V09-0607 | view-control | 4.19 | reference | reference → §4.5 (cited, never restated, at V09 §4.19) |
| V09-0608 | view-control | 4.19 | reference | reference → §9.5 (cited, never restated, at V09 §4.19) |
| V09-0609 | view-control | 4.19 | reference | reference →  (cited, never restated, at V09 §4.19) |
| V09-0610 | rule | 4.20 | reference | reference → §3.15 (cited, never restated, at V09 §4.20) |
| V09-0611 | toolkit-row | 4.20 | home | V09 §4.20 |
| V09-0612 | toolkit-row | 4.20 | home | V09 §4.20 |
| V09-0613 | toolkit-row | 4.20 | home | V09 §4.20 |
| V09-0614 | toolkit-row | 4.20 | home | V09 §4.20 |
| V09-0615 | toolkit-row | 4.20 | home | V09 §4.20 |
| V09-0616 | toolkit-row | 4.20 | home | V09 §4.20 |
| V09-0617 | toolkit-row | 4.20 | home | V09 §4.20 |
| V09-0618 | toolkit-row | 4.20 | home | V09 §4.20 |
| V09-0619 | toolkit-row | 4.20 | home | V09 §4.20 |
| V09-0620 | constant | 4.20 | home | V09 §4.20 |
| V09-0621 | constant | 4.20 | home | V11 §3.24.1's `terrace` table (cited in V09 §4.20; RESTATE-6) |
| V09-0622 | constant | 4.20 | home | V11 §3.24.1's `terrace` table (cited in V09 §4.20; RESTATE-6) |
| V09-0623 | constant | 4.20 | home | V11 §3.24.1's `terrace` table (cited in V09 §4.20; RESTATE-6) |
| V09-0624 | constant | 4.20 | home | V11 §3.24.1's `terrace` table (cited in V09 §4.20; RESTATE-6) |
| V09-0625 | constant | 4.20 | home | §7.1's retaining-wall dry run (cited in V09 §4.20; RESTATE-6) |
| V09-0626 | constant | 4.20 | home | V09 §4.20 |
| V09-0627 | constant | 4.20 | home | V11 §3.24.2's `raisedWays` settings (cited in V09 §4.20; RESTATE-6) |
| V09-0628 | constant | 4.20 | home | V11 §3.24.4 (cited in V09 §4.20) |
| V09-0629 | constant | 4.20 | home | §11.2's `PreviewResult.effects` (cited in V09 §4.20; RESTATE-6) |
| V09-0630 | constant | 4.20 | home | §11.1's deck-scene cap (cited in V09 §4.20, V09 §5.10) |
| V09-0631 | constant | 4.20 | home | V09 §4.20 |
| V09-0632 | rule | 4.20.1 | home | V09 §4.20.1 |
| V09-0633 | rule | 4.20.1 | home | V09 §4.20.1 (3) (the bends); the flat test §7.1 |
| V09-0634 | rule | 4.20.1 | home | V09 §4.20.1 |
| V09-0635 | rule | 4.20.2 | home | V09 §4.20.2 |
| V09-0636 | rule | 4.20.2 | home | V09 §4.20.2 |
| V09-0637 | rule | 4.20.2 | reference | reference → V05 §4.2 (cited, never restated, at V09 §4.20.2) |
| V09-0638 | rule | 4.20.2 | home | V09 §4.20.2 |
| V09-0639 | rule | 4.20.3 | home | V09 §4.20.3 |
| V09-0640 | rule | 4.20.3 | reference | reference → V06 §1b (cited, never restated, at V09 §4.20.3) |
| V09-0641 | rule | 4.20.3 | home | V09 §4.20.3 |
| V09-0642 | rule | 4.20.3 | home | V09 §4.20.3 |
| V09-0643 | rule | 4.20.4 | home | V09 §4.20.4 |
| V09-0644 | rule | 4.20.4 | home | V09 §4.20.4 |
| V09-0645 | rebuild-row | 4.20.3 | home | V09 §4.20.3 |
| V09-0646 | rebuild-row | 4.20.3 | home | V09 §4.20.3 |
| V09-0647 | rebuild-row | 4.20.3 | home | V09 §4.20.3 |
| V09-0648 | rebuild-row | 4.20.3 | home | V09 §4.20.3 |
| V09-0649 | rebuild-row | 4.20.3 | home | V09 §4.20.3 |
| V09-0650 | rebuild-row | 4.20.3 | home | V09 §4.20.3 |
| V09-0651 | rebuild-row | 4.20.3 | home | V09 §4.20.3 |
| V09-0652 | rule | 4.20.5 | reference | reference → V02 §9 (cited, never restated, at V09 §4.20.5) |
| V09-0653 | rule | 4.20.5 | home | V09 §4.20.5 (4), reworded (V09-ICONF-3) |
| V09-0654 | rule | 4.20.6 | home | V09 §4.20.6 |
| V09-0655 | rule | 4.20.6 | home | V09 §4.20.6 |
| V09-0656 | rule | 4.20.6 | home | V09 §4.20.6 |
| V09-0657 | rule | 4.20.7 | reference | reference → §11.2 (cited, never restated, at V09 §4.20.7) |
| V09-0658 | rule | 4.20.8 | reference | reference → §8.2 (cited, never restated, at V09 §4.20.8) |
| V09-0659 | rule | 4.20.9 | reference | reference → V05 §3.22 (cited, never restated, at V09 §4.20.9) |
| V09-0660 | rule | 5 | reference | reference → §8 (cited, never restated, at V09 §5) |
| V09-0661 | frame-region | 5.1 | home | V09 §5.1 |
| V09-0662 | frame-region | 5.1 | home | V09 §5.1 |
| V09-0663 | frame-region | 5.1 | home | V09 §5.1 |
| V09-0664 | frame-region | 5.1 | home | V09 §5.1 |
| V09-0665 | frame-region | 5.1 | home | V09 §5.1 |
| V09-0666 | frame-region | 5.1 | home | V09 §5.1 |
| V09-0667 | frame-region | 5.1 | home | V09 §5.1 |
| V09-0668 | rule | 5.1 | home | V09 §5.1 |
| V09-0669 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0670 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0671 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0672 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0673 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0674 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0675 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0676 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0677 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0678 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0679 | chrome-token | 5.1 | home | V09 §5.1 |
| V09-0680 | rule | 5.1 | home | V09 §5.1 |
| V09-0681 | rule | 5.2 | home | V09 §5.2 |
| V09-0682 | rule | 5.3 | home | V09 §5.3 |
| V09-0683 | rule | 5.3 | home | V09 §5.3 |
| V09-0684 | rule | 5.4 | home | V09 §5.4 |
| V09-0685 | rule | 5.4 | home | V09 §5.4 |
| V09-0686 | rule | 5.4 | home | V09 §5.4 |
| V09-0687 | rule | 5.4 | reference | reference → §5 (cited, never restated, at V09 §5.4) |
| V09-0688 | rule | 5.5 | home | V09 §5.5 |
| V09-0689 | rule | 5.6 | reference | reference → V06 §5.1 (cited, never restated, at V09 §5.6) |
| V09-0690 | rule | 5.7 | home | V09 §5.7 |
| V09-0691 | rule | 5.8 | home | V09 §5.8 |
| V09-0692 | rule | 5.9 | home | V09 §5.9 |
| V09-0693 | rule | 5.10 | home | V09 §5.10 |
| V09-0694 | export-tab | 5.10 | home | V09 §5.10 |
| V09-0695 | export-tab | 5.10 | home | V09 §5.10 |
| V09-0696 | export-tab | 5.10 | home | V09 §5.10 |
| V09-0697 | export-tab | 5.10 | home | V09 §5.10 |
| V09-0698 | export-tab | 5.10 | home | V09 §5.10 |
| V09-0699 | rule | 5.10 | home | V09 §5.10 |
| V09-0700 | rule | 5.11 | home | V09 §5.11 |
| V09-0701 | rule | 5.12 | home | V09 §5.12 |
| V09-0702 | rule | 5.13 | home | V09 §5.13 |
| V09-0703 | rule | 5.14 | home | V09 §5.14 |
| V09-0704 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0705 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0706 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0707 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0708 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0709 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0710 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0711 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0712 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0713 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0714 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0715 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0716 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0717 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0718 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0719 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0720 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0721 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0722 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0723 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0724 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0725 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0726 | drawn-exported | 5.15 | home | V09 §5.15 |
| V09-0727 | rule | 6 | home | V09 §6 |
| V09-0728 | latency | 6.1 | home | V09 §6.1 |
| V09-0729 | latency | 6.1 | home | V09 §6.1 |
| V09-0730 | latency | 6.1 | home | V09 §6.1 |
| V09-0731 | latency | 6.1 | home | V09 §6.1 |
| V09-0732 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0733 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0734 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0735 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0736 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0737 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0738 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0739 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0740 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0741 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0742 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0743 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0744 | tool-budget | 6.1 | home | V09 §6.1 (the values cited from §12.5; RESTATE-3) |
| V09-0745 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0746 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0747 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0748 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0749 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0750 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0751 | tool-budget | 6.1 | home | V09 §6.1 |
| V09-0752 | rule | 6.1 | home | V09 §6.1 |
| V09-0753 | rule | 6.2 | home | V09 §6.2 |
| V09-0754 | rule | 6.3 | home | V09 §6.3 |
| V09-0755 | rule | 6.4 | home | V09 §6.4 |
| V09-0756 | rule | 6.5 | home | V09 §6.5 |
| V09-0757 | rule | 7 | home | V09 §7 |
| V09-0758 | test | 7.1 | home | V09 §7.1 |
| V09-0759 | test | 7.1 | home | V09 §7.1 |
| V09-0760 | test | 7.1 | home | V09 §7.1 |
| V09-0761 | test | 7.1 | home | V09 §7.1 |
| V09-0762 | test | 7.1 | home | V09 §7.1 |
| V09-0763 | test | 7.1 | home | V09 §7.1 |
| V09-0764 | test | 7.1 | home | V09 §7.1 |
| V09-0765 | test | 7.1 | home | V09 §7.1 |
| V09-0766 | test | 7.1 | home | V09 §7.1 |
| V09-0767 | test | 7.1 | home | V09 §7.1 |
| V09-0768 | test | 7.1 | home | V09 §7.1 |
| V09-0769 | test | 7.1 | home | V09 §7.1 |
| V09-0770 | test | 7.1 | home | V09 §7.1 |
| V09-0771 | test | 7.1 | home | V09 §7.1 |
| V09-0772 | test | 7.1 | home | V09 §7.1 |
| V09-0773 | test | 7.1 | home | V09 §7.1 |
| V09-0774 | test | 7.1 | home | V09 §7.1 |
| V09-0775 | test | 7.1 | home | V09 §7.1 |
| V09-0776 | test | 7.1 | home | V09 §7.1 |
| V09-0777 | test | 7.1 | home | V09 §7.1 |
| V09-0778 | test | 7.1 | home | V09 §7.1 |
| V09-0779 | test | 7.1 | home | V09 §7.1 |
| V09-0780 | test | 7.1 | home | V09 §7.1 |
| V09-0781 | test | 7.1 | home | V09 §7.1 |
| V09-0782 | test | 7.1 | home | V09 §7.1 |
| V09-0783 | test | 7.1 | home | V09 §7.1 |
| V09-0784 | test | 7.1 | home | V09 §7.1 |
| V09-0785 | test | 7.1 | home | V09 §7.1 |
| V09-0786 | test | 7.1 | home | V09 §7.1 |
| V09-0787 | test | 7.1 | home | V09 §7.1 |
| V09-0788 | test | 7.1 | home | V09 §7.1 |
| V09-0789 | test | 7.1 | home | V09 §7.1 |
| V09-0790 | test | 7.1 | home | V09 §7.1 |
| V09-0791 | test | 7.1 | home | V09 §7.1 |
| V09-0792 | test | 7.1 | home | V09 §7.1 |
| V09-0793 | test | 7.1 | home | V09 §7.1 |
| V09-0794 | test | 7.1 | home | V09 §7.1 |
| V09-0795 | test | 7.1 | home | V09 §7.1 |
| V09-0796 | test | 7.1 | home | V09 §7.1 |
| V09-0797 | test | 7.1 | home | V09 §7.1 |
| V09-0798 | test | 7.1 | home | V09 §7.1 |
| V09-0799 | test | 7.1 | home | V09 §7.1 |
| V09-0800 | test | 7.1 | home | V09 §7.1 |
| V09-0801 | test | 7.1 | home | V09 §7.1 |
| V09-0802 | test | 7.1 | home | V09 §7.1 |
| V09-0803 | test | 7.1 | home | V09 §7.1 |
| V09-0804 | test | 7.1 | home | V09 §7.1 |
| V09-0805 | test | 7.1 | home | V09 §7.1 |
| V09-0806 | test | 7.1 | home | V09 §7.1 |
| V09-0807 | test | 7.1 | home | V09 §7.1 |
| V09-0808 | test | 7.1 | home | V09 §7.1 |
| V09-0809 | test | 7.1 | home | V09 §7.1 |
| V09-0810 | test | 7.1 | home | V09 §7.1 |
| V09-0811 | test | 7.1 | home | V09 §7.1 |
| V09-0812 | test | 7.1 | home | V09 §7.1 |
| V09-0813 | test | 7.1 | home | V09 §7.1 |
| V09-0814 | test | 7.1 | home | V09 §7.1 |
| V09-0815 | test | 7.1 | home | V09 §7.1 |
| V09-0816 | test | 7.1 | home | V09 §7.1 |
| V09-0817 | test | 7.1 | home | V09 §7.1 |
| V09-0818 | test | 7.1 | home | V09 §7.1 |
| V09-0819 | test | 7.1 | home | V09 §7.1 |
| V09-0820 | test | 7.1 | home | V09 §7.1 |
| V09-0821 | test | 7.1 | home | V09 §7.1 |
| V09-0822 | test | 7.1 | home | V09 §7.1 |
| V09-0823 | test | 7.1 | home | V09 §7.1 |
| V09-0824 | test | 7.1 | home | V09 §7.1 |
| V09-0825 | test | 7.1 | home | V09 §7.1 |
| V09-0826 | test | 7.1 | home | V09 §7.1 |
| V09-0827 | test | 7.1 | home | V09 §7.1 |
| V09-0828 | rule | 7.2 | home | V09 §7.2 |
| V09-0829 | rule | 7.2 | home | V09 §7.2 |
| V09-0830 | rule | 7.2 | home | V09 §7.2 |
| V09-0831 | rule | 7.3 | home | V09 §7.3 |
| V09-0832 | type | 7.3 | home | V09 §7.3 |
| V09-0833 | rule | 7.4 | home | V09 §7.4 |
| V09-0834 | rule | 7.5 | home | V09 §7.5 |
| V09-0835 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0836 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0837 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0838 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0839 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0840 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0841 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0842 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0843 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0844 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0845 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0846 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0847 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0848 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0849 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0850 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0851 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0852 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0853 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0854 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0855 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0856 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0857 | parity-row | 7.5 | home | V09 §7.5 |
| V09-0858 | rule | 8.1 | home | V09 §8.1 |
| V09-0859 | build-step | 8.1 | home | V09 §8.1 |
| V09-0860 | build-step | 8.1 | home | V09 §8.1 |
| V09-0861 | build-step | 8.1 | home | V09 §8.1 |
| V09-0862 | build-step | 8.1 | home | V09 §8.1 |
| V09-0863 | build-step | 8.1 | home | V09 §8.1 |
| V09-0864 | build-step | 8.1 | home | V09 §8.1 |
| V09-0865 | build-step | 8.1 | home | V09 §8.1 |
| V09-0866 | build-step | 8.1 | home | V09 §8.1 |
| V09-0867 | build-step | 8.1 | home | V09 §8.1 |
| V09-0868 | build-step | 8.1 | home | V09 §8.1 |
| V09-0869 | build-step | 8.1 | home | V09 §8.1 |
| V09-0870 | build-step | 8.1 | home | V09 §8.1 |
| V09-0871 | rule | 8.1 | reference | reference → §16 (cited, never restated, at V09 §8.1) |
| V09-0872 | rule | 8.2 | home | V09 §8.2 |
| V09-0873 | rule | 8.3 | home | V09 §8.3 |
| V09-0874 | decision | 9 | home | V09 §9 |
| V09-0875 | decision | 9 | home | V09 §9 |
| V09-0876 | decision | 9 | home | V09 §9 |
| V09-0877 | decision | 9 | home | V09 §9 |
| V09-0878 | decision | 9 | home | V09 §9 |
| V09-0879 | decision | 9 | home | V09 §9 |
| V09-0880 | decision | 9 | home | V09 §9 |
| V09-0881 | decision | 9 | home | V09 §9 |
| V09-0882 | decision | 9 | home | V09 §9 |
| V09-0883 | decision | 9 | home | V09 §9 |
| V09-0884 | decision | 9 | home | V09 §9 |
| V09-0885 | decision | 9 | home | V09 §9 |
| V09-0886 | decision | 9 | home | V09 §9 |
| V09-0887 | decision | 9 | home | V09 §9 |
| V09-0888 | decision | 9 | home | V09 §9 |
| V09-0889 | decision | 9 | home | V09 §9 |
| V09-0890 | decision | 9 | home | V09 §9 |
| V09-0891 | decision | 9 | home | V09 §9 |
| V09-0892 | decision | 9 | home | V09 §9 |
| V09-0893 | decision | 9 | home | V09 §9 |
| V09-0894 | decision | 9 | home | V09 §9 |
| V09-0895 | decision | 9 | home | V09 §9 |
| V09-0896 | decision | 9 | home | V09 §9 |
| V09-0897 | decision | 9 | home | V09 §9 |
| V09-0898 | decision | 9 | home | V09 §9 |
| V09-0899 | decision | 9 | home | V09 §9 |
| V09-0900 | decision | 9 | home | V09 §9 |
| V09-0901 | decision | 9 | home | V09 §9 |
| V09-0902 | decision | 9 | home | V09 §9 |
| V09-0903 | decision | 9 | home | V09 §9 |
| V09-0904 | decision | 9 | home | V09 §9 |
| V09-0905 | decision | 9 | home | V09 §9 |
| V09-0906 | decision | 9 | home | V09 §9 |
| V09-0907 | decision | 9 | home | V09 §9 |
| V09-0908 | decision | 9 | home | V09 §9 |
| V09-0909 | decision | 9 | home | V09 §9 |
| V09-0910 | decision | 9 | home | V09 §9 |
| V09-0911 | decision | 9 | home | V09 §9 |
| V09-0912 | decision | 9 | home | V09 §9 |
| V09-0913 | decision | 9 | home | V09 §9 |
| V09-0914 | decision | 9 | home | V09 §9 |
| V09-0915 | decision | 9 | home | V09 §9 |
| V09-0916 | decision | 9 | home | V09 §9 |
| V09-0917 | decision | 9 | home | V09 §9 |
| V09-0918 | decision | 9 | home | V09 §9 |
| V09-0919 | decision | 9 | home | V09 §9 |
| V09-0920 | decision | 9 | home | V09 §9 |
| V09-0921 | decision | 9 | home | V09 §9 |
| V09-0922 | decision | 9 | home | V09 §9 |
| V09-0923 | decision | 9 | home | V09 §9 |
| V09-0924 | decision | 9 | home | V09 §9 |
| V09-0925 | decision | 9 | home | V09 §9 |
| V09-0926 | decision | 9 | home | V09 §9 |
| V09-0927 | decision | 9 | home | V09 §9 |
| V09-0928 | decision | 9 | home | V09 §9 |
| V09-0929 | decision | 9 | home | V09 §9 |
| V09-0930 | decision | 9 | home | V09 §9 |
| V09-0931 | decision | 9 | home | V09 §9 |
| V09-0932 | decision | 9 | home | V09 §9 |
| V09-0933 | decision | 9 | home | V09 §9 |
| V09-0934 | decision | 9 | home | V09 §9 |
| V09-0935 | decision | 9 | home | V09 §9 |
| V09-0936 | decision | 9 | home | V09 §9 |
| V09-0937 | decision | 9 | home | V09 §9 |
| V09-0938 | decision | 9 | home | V09 §9 |
| V09-0939 | decision | 9 | home | V09 §9 |
| V09-0940 | decision | 9 | home | V09 §9 |
| V09-0941 | decision | 9 | home | V09 §9 |
| V09-0942 | decision | 9 | home | V09 §9 |
| V09-0943 | decision | 9 | home | V09 §9 |
| V09-0944 | decision | 9 | home | V09 §9 |
| V09-0945 | decision | 9 | home | V09 §9 |
| V09-0946 | decision | 9 | home | V09 §9 |
| V09-0947 | decision | 9 | home | V09 §9 |
| V09-0948 | decision | 9 | home | V09 §9 |
| V09-0949 | decision | 9 | home | V09 §9 |
| V09-0950 | decision | 9 | home | V09 §9 |
| V09-0951 | decision | 9 | home | V09 §9 |
| V09-0952 | decision | 9 | home | V09 §9 |
| V09-0953 | decision | 9 | home | V09 §9 |
| V09-0954 | decision | 9 | home | V09 §9 |
| V09-0955 | decision | 9 | home | V09 §9 |
| V09-0956 | decision | 9 | home | V09 §9 |
| V09-0957 | decision | 9 | home | V09 §9 |
| V09-0958 | decision | 9 | home | V09 §9 |
| V09-0959 | decision | 9 | home | V09 §9 |
| V09-0960 | decision | 9 | home | V09 §9 |
| V09-0961 | decision | 9 | home | V09 §9 |
| V09-0962 | decision | 9 | home | V09 §9 |
| V09-0963 | decision | 9 | home | V09 §9 |
| V09-0964 | decision | 9 | home | V09 §9 |
| V09-0965 | decision | 9 | home | V09 §9 |
| V09-0966 | decision | 9 | home | V09 §9 |
| V09-0967 | decision | 9 | home | V09 §9 |
| V09-0968 | decision | 9 | home | V09 §9 |
| V09-0969 | decision | 9 | home | V09 §9 |
| V09-0970 | decision | 9 | home | V09 §9 |
| V09-0971 | decision | 9 | home | V09 §9 |
| V09-0972 | decision | 9 | home | V09 §9 |
| V09-0973 | decision | 9 | home | V09 §9 |
| V09-0974 | decision | 9 | home | V09 §9 |
| V09-0975 | decision | 9 | home | V09 §9 |
| V09-0976 | decision | 9 | home | V09 §9 |
| V09-0977 | decision | 9 | home | V09 §9 |
| V09-0978 | decision | 9 | home | V09 §9 |
| V09-0979 | decision | 9 | home | V09 §9 |
| V09-0980 | decision | 9 | home | V09 §9 |
| V09-0981 | decision | 9 | home | V09 §9 |
| V09-0982 | decision | 9 | home | V09 §9 |
| V09-0983 | decision | 9 | home | V09 §9 |
| V09-0984 | decision | 9 | home | V09 §9 |
| V09-0985 | decision | 9 | home | V09 §9 |
| V09-0986 | decision | 9 | home | V09 §9 |
| V09-0987 | decision | 9 | home | V09 §9 |
| V09-0988 | decision | 9 | home | V09 §9 |
| V09-0989 | decision | 9 | home | V09 §9 |
| V09-0990 | decision | 9 | home | V09 §9 |
| V09-0991 | decision | 9 | home | V09 §9 |
| V09-0992 | decision | 9 | home | V09 §9 |
| V09-0993 | decision | 9 | home | V09 §9 |
| V09-0994 | decision | 9 | home | V09 §9 |
| V09-0995 | decision | 9 | home | V09 §9 |
| V09-0996 | decision | 9 | home | V09 §9 |
| V09-0997 | decision | 9 | home | V09 §9 |
| V09-0998 | decision | 9 | home | V09 §9 |
| V09-0999 | rule | 10.1 | home | V09 §10.1 |
| V09-1000 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-1 → file f item 514 (base §14) |
| V09-1001 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-2 → file f item 515 (base §14) |
| V09-1002 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-3 → file f item 277 (base §2.9) |
| V09-1003 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-4 → file f item — (superseded by J-V9.36) (base ) |
| V09-1004 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-5 → file f item 460 (base §11.2) |
| V09-1005 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-6 → file f item — (superseded by J-V9.33) (base ) |
| V09-1006 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-7 → file f item 411 (base §8.2) |
| V09-1007 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-8 → file f item 516 (base §14) |
| V09-1008 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-9 → file f item 517 (base §14) |
| V09-1009 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-10 → file f item 461 (base §11.2) |
| V09-1010 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-11 → file f item 462 (base §11.2) |
| V09-1011 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-12 → file f item 463 (base §11.2) |
| V09-1012 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-13 → file f item 360 (base §7.1) |
| V09-1013 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-14 → file f item 453 (base §11.1) |
| V09-1014 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-15 → file f item 454 (base §11.1) |
| V09-1015 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-16 → file f item 348 (base §7.1) |
| V09-1016 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-17 → file f item 494 (base §13.4) |
| V09-1017 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-18 → file f item 530 (base §16) |
| V09-1018 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-19 → file f item 269 (base §2.8) |
| V09-1019 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-20 → file f item 278, 413 (base §2.9) |
| V09-1020 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-21 → file f item 361 (base §7.1) |
| V09-1021 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-22 → file f item 372 (base §7.3) |
| V09-1022 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-23 → file f item 464 (base §11.2) |
| V09-1023 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-24 → file f item 490 (base §13.3) |
| V09-1024 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-25 → file f item 413 (base §8.4) |
| V09-1025 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-26 → file f item 362 (base §7.1) |
| V09-1026 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-27 → file f item 465 (base §11.2) |
| V09-1027 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-28 → file f item 466 (base §11.2) |
| V09-1028 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-29 → file f item 363 (base §7.1) |
| V09-1029 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-30 → file f item 246 (base §2.7) |
| V09-1030 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-31 → file f item 447, 448 (base §11.1) |
| V09-1031 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-32 → file f item 455 (base §11.1) |
| V09-1032 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-33 → file f item 364, 244 (base §7.1) |
| V09-1033 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-34 → file f item 467 (base §11.2) |
| V09-1034 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-35 → file f item 570 (base §7.1) |
| V09-1035 | bcr | 10.1 | bcr-pointer | V09 §10.1's pointer table: BCR-V9-36 → file f item 583 (base §11.2) |
| V09-1036 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1037 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1038 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1039 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1040 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1041 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1042 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1043 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1044 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1045 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1046 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1047 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1048 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1049 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1050 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1051 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1052 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1053 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1054 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1055 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1056 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1057 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1058 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1059 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1060 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1061 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1062 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1063 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1064 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1065 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1066 | xv-request | 10.2 | handoff | V09 §10.2 (closed at its destination, or routed there) |
| V09-1067 | rule | 11 | home | V09 §11 (every question answered, J121, J122) |
| V09-1068 | owner-question | 11 | answer-J121-J122 | V09 §11 (answered: J121, J122) |
| V09-1069 | owner-question | 11 | answer-J121-J122 | V09 §11 (answered: J121, J122) |
| V09-1070 | owner-question | 11 | answer-J121-J122 | V09 §11 (answered: J121, J122) |
| V09-1071 | evidence | 12 | history-out | removed (narration; V09 §12's condensed paragraphs; the validation records keep it) |
| V09-1072 | evidence | 12 | history-out | removed (narration; V09 §12's condensed paragraphs; the validation records keep it) |
| V09-1073 | fix-list | 13 | handoff | V09 §13 (none open) — the disposition in the validation records |
| V09-1074 | integration-note | IN | home | the Integration notes' map: J-VI.1/J-VI.23 → V09 §2.5, V09 §3.5; J-VI.4 → V09 §4.9, V09 §4.20; J-VI.2/J-VI.3 → V09 §2.7 |
| V09-1075 | integration-note | IN | reference | V09 §4.20.5 (1) and V09 §3.5 (folded, V09-WGAP-2) |
| V09-1076 | integration-note | IN | reference | V09 §4.14 and V09 §7.2 (folded, V09-WGAP-2; W-IF-04) |
| V09-1077 | integration-note | IN | home | the Integration notes' map: J-VI.27 → V09 §4.20.6 (6); J-VI.30 → V09 §4.9 |
| V09-1078 | note | finalization | home | J-V9.125 (V09 §9) and V09 §4.16 (3); the narration removed |
| V09-1079 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1080 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1081 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1082 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1083 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1084 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1085 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1086 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1087 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1088 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1089 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1090 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1091 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1092 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1093 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1094 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1095 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1096 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1097 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1098 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1099 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1100 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1101 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1102 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1103 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1104 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1105 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1106 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1107 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1108 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1109 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1110 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |
| V09-1111 | term | glossary | glossary | the canon's glossary; the term used in V09 as defined there |

## 12 EDGES MAP — every catalogue edge and combination → its V09 §3.16 row

186 entries (94 UNDEFINED and 67 UNTESTED edges, 25 UNDEFINED combinations); generated by `work/rewrite-V09/edges-map.py` from `edges.json`. "rule (E4)", "(E6)", "(E8)" are V09 §3.16's three general rules.

| edge | status | V09 §3.16 | test |
|---|---|---|---|
| M-V09-477-E5-data | UNDEFINED | row 3 | T-V9-80 (3) |
| M-V09-544-E5-data | UNDEFINED | row 4 | T-V9-80 (4) |
| M-V09-572-E5-data | UNTESTED | row 5 | T-V9-80 (5) |
| M-V09-598-E5-data | UNTESTED | row 6 | T-V9-80 (6) |
| M-V09-682-E5-data | UNDEFINED | row 7 | T-V9-80 (7) |
| M-V09-795-E5-data | UNTESTED | row 8 | T-V9-80 (8) |
| M-V09-876-E5-data | UNTESTED | row 9 | T-V9-80 (9) |
| M-V09-959-E6-rungs | UNTESTED | rule (E6) and row 10 | T-V9-80 (10) |
| M-V09-959-E8-lifecycle | UNDEFINED | rule (E8) and row 10 | T-V9-80 (10) |
| M-V09-980-E4-degenerate | UNDEFINED | rule (E4) and row 11 | T-V9-80 (11) |
| M-V09-980-E6-rungs | UNDEFINED | rule (E6) and row 11 | T-V9-80 (11) |
| M-V09-1001-E4-degenerate | UNDEFINED | rule (E4) and row 1 | T-V9-80 (1) |
| M-V09-1045-E1-none | UNTESTED | row 12 | T-V9-80 (12) |
| M-V09-1045-E2-one | UNTESTED | row 12 | T-V9-80 (12) |
| M-V09-1045-E4-degenerate | UNDEFINED | rule (E4) and row 12 | T-V9-80 (12) |
| M-V09-1045-E5-data | UNTESTED | row 12 | T-V9-80 (12) |
| M-V09-1087-E1-none | UNDEFINED | row 13 | T-V9-80 (13) |
| M-V09-1087-E4-degenerate | UNDEFINED | rule (E4) and row 13 | T-V9-80 (13) |
| M-V09-1087-E6-rungs | UNDEFINED | rule (E6) and row 13 | T-V9-80 (13) |
| M-V09-1143-E1-none | UNDEFINED | row 14 | T-V9-80 (14) |
| M-V09-1174-E1-none | UNDEFINED | row 15 | T-V9-80 (15) |
| M-V09-1174-E2-one | UNTESTED | row 15 | T-V9-80 (15) |
| M-V09-1174-E5-data | UNDEFINED | row 15 | T-V9-80 (15) |
| M-V09-1174-E6-rungs | UNDEFINED | rule (E6) and row 15 | T-V9-80 (15) |
| M-V09-1174-E7-toggles | UNTESTED | row 15 | T-V9-80 (15) |
| M-V09-1174-E8-lifecycle | UNTESTED | rule (E8) and row 15 | T-V9-80 (15) |
| M-V09-1195-E1-none | UNTESTED | row 16 | T-V9-80 (16) |
| M-V09-1195-E2-one | UNTESTED | row 16 | T-V9-80 (16) |
| M-V09-1195-E8-lifecycle | UNTESTED | rule (E8) and row 16 | T-V9-80 (16) |
| M-V09-1226-E1-none | UNTESTED | row 17 | T-V9-80 (17) |
| M-V09-1226-E2-one | UNTESTED | row 17 | T-V9-80 (17) |
| M-V09-1226-E5-data | UNTESTED | row 17 | T-V9-80 (17) |
| M-V09-1226-E6-rungs | UNTESTED | rule (E6) and row 17 | T-V9-80 (17) |
| M-V09-1226-E8-lifecycle | UNTESTED | rule (E8) and row 17 | T-V9-80 (17) |
| M-V09-1307-E1-none | UNTESTED | row 18 | T-V9-80 (18) |
| M-V09-1307-E2-one | UNTESTED | row 18 | T-V9-80 (18) |
| M-V09-1307-E5-data | UNDEFINED | row 18 | T-V9-80 (18) |
| M-V09-1307-E8-lifecycle | UNTESTED | rule (E8) and row 18 | T-V9-80 (18) |
| M-V09-1354-E4-degenerate | UNDEFINED | rule (E4) and row 19 | T-V9-80 (19) |
| M-V09-1354-E6-rungs | UNDEFINED | rule (E6) and row 19 | T-V9-80 (19) |
| M-V09-1374-E1-none | UNDEFINED | row 20 | T-V9-80 (20) |
| M-V09-1398-E1-none | UNTESTED | row 21 | T-V9-80 (21) |
| M-V09-1398-E2-one | UNTESTED | row 21 | T-V9-80 (21) |
| M-V09-1398-E4-degenerate | UNDEFINED | rule (E4) and row 21 | T-V9-80 (21) |
| M-V09-1398-E6-rungs | UNTESTED | rule (E6) and row 21 | T-V9-80 (21) |
| M-V09-1398-E7-toggles | UNTESTED | row 21 | T-V9-80 (21) |
| M-V09-1398-E8-lifecycle | UNTESTED | rule (E8) and row 21 | T-V9-80 (21) |
| M-V09-1444-E4-degenerate | UNDEFINED | rule (E4) and row 22 | T-V9-80 (22) |
| M-V09-1513-E1-none | UNTESTED | row 23 | T-V9-80 (23) |
| M-V09-1513-E2-one | UNTESTED | row 23 | T-V9-80 (23) |
| M-V09-1513-E5-data | UNTESTED | row 23 | T-V9-80 (23) |
| M-V09-1513-E8-lifecycle | UNTESTED | rule (E8) and row 23 | T-V9-80 (23) |
| M-V09-1549-E4-degenerate | UNDEFINED | rule (E4) and row 24 | T-V9-80 (24) |
| M-V09-1579-E1-none | UNTESTED | row 25 | T-V9-80 (25) |
| M-V09-1579-E2-one | UNTESTED | row 25 | T-V9-80 (25) |
| M-V09-1579-E4-degenerate | UNDEFINED | rule (E4) and row 25 | T-V9-80 (25) |
| M-V09-1579-E8-lifecycle | UNTESTED | rule (E8) and row 25 | T-V9-80 (25) |
| M-V09-1600-E1-none | UNDEFINED | row 26 | T-V9-80 (26) |
| M-V09-1600-E2-one | UNTESTED | row 26 | T-V9-80 (26) |
| M-V09-1600-E3-cap | UNDEFINED | row 26 | T-V9-80 (26) |
| M-V09-1600-E4-degenerate | UNDEFINED | rule (E4) and row 26 | T-V9-80 (26) |
| M-V09-1600-E5-data | UNDEFINED | row 26 | T-V9-80 (26) |
| M-V09-1600-E6-rungs | UNDEFINED | rule (E6) and row 26 | T-V9-80 (26) |
| M-V09-1600-E8-lifecycle | UNDEFINED | rule (E8) and row 26 | T-V9-80 (26) |
| M-V09-1656-E1-none | UNDEFINED | row 27 | T-V9-80 (27) |
| M-V09-1656-E5-data | UNTESTED | row 27 | T-V9-80 (27) |
| M-V09-1681-E4-degenerate | UNDEFINED | rule (E4) and row 28 | T-V9-80 (28) |
| M-V09-1978-E3-cap | UNDEFINED | row 29 | T-V9-80 (29) |
| M-V09-1978-E4-degenerate | UNDEFINED | rule (E4) and row 29 | T-V9-80 (29) |
| M-V09-1978-E6-rungs | UNDEFINED | rule (E6) and row 29 | T-V9-80 (29) |
| M-V09-2070-E1-none | UNTESTED | row 30 | T-V9-80 (30) |
| M-V09-2070-E2-one | UNTESTED | row 30 | T-V9-80 (30) |
| M-V09-2070-E3-cap | UNTESTED | row 30 | T-V9-80 (30) |
| M-V09-2070-E4-degenerate | UNDEFINED | rule (E4) and row 30 | T-V9-80 (30) |
| M-V09-2070-E5-data | UNTESTED | row 30 | T-V9-80 (30) |
| M-V09-2070-E6-rungs | UNDEFINED | rule (E6) and row 30 | T-V9-80 (30) |
| M-V09-2070-E7-toggles | UNTESTED | row 30 | T-V9-80 (30) |
| M-V09-2070-E8-lifecycle | UNTESTED | rule (E8) and row 30 | T-V9-80 (30) |
| M-V09-2178-E4-degenerate | UNDEFINED | rule (E4) and row 31 | T-V9-80 (31) |
| M-V09-2208-E6-rungs | UNDEFINED | rule (E6) and row 32 | T-V9-80 (32) |
| M-V09-2208-E8-lifecycle | UNDEFINED | rule (E8) and row 32 | T-V9-80 (32) |
| M-V09-2226-E1-none | UNTESTED | row 33 | T-V9-80 (33) |
| M-V09-2226-E2-one | UNDEFINED | row 33 | T-V9-80 (33) |
| M-V09-2226-E5-data | UNTESTED | row 33 | T-V9-80 (33) |
| M-V09-2226-E7-toggles | UNTESTED | row 33 | T-V9-80 (33) |
| M-V09-2226-E8-lifecycle | UNTESTED | rule (E8) and row 33 | T-V9-80 (33) |
| M-V09-2282-E4-degenerate | UNDEFINED | rule (E4) and row 34 | T-V9-80 (34) |
| M-V09-2311-E4-degenerate | UNDEFINED | rule (E4) and row 35 | T-V9-80 (35) |
| M-V09-2480-E2-one | UNDEFINED | row 36 | T-V9-80 (36) |
| M-V09-2522-E1-none | UNDEFINED | row 37 | T-V9-80 (37) |
| M-V09-2522-E2-one | UNDEFINED | row 37 | T-V9-80 (37) |
| M-V09-2522-E4-degenerate | UNDEFINED | rule (E4) and row 37 | T-V9-80 (37) |
| M-V09-2565-E1-none | UNDEFINED | row 38 | T-V9-80 (38) |
| M-V09-2565-E4-degenerate | UNDEFINED | rule (E4) and row 38 | T-V9-80 (38) |
| M-V09-2612-E4-degenerate | UNDEFINED | rule (E4) and row 39 | T-V9-80 (39) |
| M-V09-2612-E5-data | UNDEFINED | row 39 | T-V9-80 (39) |
| M-V09-2612-E8-lifecycle | UNDEFINED | rule (E8) and row 39 | T-V9-80 (39) |
| M-V09-2670-E4-degenerate | UNDEFINED | rule (E4) and row 41 | T-V9-80 (41) |
| M-V09-2670-E6-rungs | UNDEFINED | rule (E6) and row 41 | T-V9-80 (41) |
| M-V09-2724-E4-degenerate | UNDEFINED | rule (E4) and row 42 | T-V9-80 (42) |
| M-V09-2751-E2-one | UNDEFINED | row 43 | T-V9-80 (43) |
| M-V09-2751-E3-cap | UNDEFINED | row 43 | T-V9-80 (43) |
| M-V09-2751-E4-degenerate | UNDEFINED | rule (E4) and row 43 | T-V9-80 (43) |
| M-V09-2780-E4-degenerate | UNDEFINED | rule (E4) and row 44 | T-V9-80 (44) |
| M-V09-2780-E8-lifecycle | UNDEFINED | rule (E8) and row 44 | T-V9-80 (44) |
| M-V09-2821-E1-none | UNDEFINED | row 45 | T-V9-80 (45) |
| M-V09-2821-E8-lifecycle | UNDEFINED | rule (E8) and row 45 | T-V9-80 (45) |
| M-V09-2838-E1-none | UNDEFINED | row 46 | T-V9-80 (46) |
| M-V09-2838-E4-degenerate | UNDEFINED | rule (E4) and row 46 | T-V9-80 (46) |
| M-V09-2855-E1-none | UNDEFINED | row 47 | T-V9-80 (47) |
| M-V09-2855-E2-one | UNDEFINED | row 47 | T-V9-80 (47) |
| M-V09-2855-E4-degenerate | UNDEFINED | rule (E4) and row 47 | T-V9-80 (47) |
| M-V09-2877-E4-degenerate | UNDEFINED | rule (E4) and row 48 | T-V9-80 (48) |
| M-V09-2877-E6-rungs | UNDEFINED | rule (E6) and row 48 | T-V9-80 (48) |
| M-V09-2921-E4-degenerate | UNDEFINED | rule (E4) and row 49 | T-V9-80 (49) |
| M-V09-2921-E6-rungs | UNDEFINED | rule (E6) and row 49 | T-V9-80 (49) |
| M-V09-2930-E1-none | UNDEFINED | row 50 | T-V9-80 (50) |
| M-V09-2930-E4-degenerate | UNDEFINED | rule (E4) and row 50 | T-V9-80 (50) |
| M-V09-2960-E1-none | UNTESTED | row 51 | T-V9-80 (51) |
| M-V09-2960-E2-one | UNTESTED | row 51 | T-V9-80 (51) |
| M-V09-2960-E4-degenerate | UNDEFINED | rule (E4) and row 51 | T-V9-80 (51) |
| M-V09-2960-E5-data | UNDEFINED | row 51 | T-V9-80 (51) |
| M-V09-2960-E6-rungs | UNTESTED | rule (E6) and row 51 | T-V9-80 (51) |
| M-V09-2960-E7-toggles | UNTESTED | row 51 | T-V9-80 (51) |
| M-V09-2960-E8-lifecycle | UNTESTED | rule (E8) and row 51 | T-V9-80 (51) |
| M-V09-3008-E1-none | UNDEFINED | row 52 | T-V9-80 (52) |
| M-V09-3008-E2-one | UNDEFINED | row 52 | T-V9-80 (52) |
| M-V09-3008-E6-rungs | UNDEFINED | rule (E6) and row 52 | T-V9-80 (52) |
| M-V09-3032-E1-none | UNDEFINED | row 53 | T-V9-80 (53) |
| M-V09-3032-E2-one | UNTESTED | row 53 | T-V9-80 (53) |
| M-V09-3032-E4-degenerate | UNDEFINED | rule (E4) and row 53 | T-V9-80 (53) |
| M-V09-3032-E5-data | UNDEFINED | row 53 | T-V9-80 (53) |
| M-V09-3032-E6-rungs | UNDEFINED | rule (E6) and row 53 | T-V9-80 (53) |
| M-V09-3032-E7-toggles | UNTESTED | row 53 | T-V9-80 (53) |
| M-V09-3032-E8-lifecycle | UNTESTED | rule (E8) and row 53 | T-V9-80 (53) |
| M-V09-3063-E1-none | UNDEFINED | row 54 | T-V9-80 (54) |
| M-V09-3063-E2-one | UNDEFINED | row 54 | T-V9-80 (54) |
| M-V09-3063-E4-degenerate | UNDEFINED | rule (E4) and row 54 | T-V9-80 (54) |
| M-V09-3063-E5-data | UNDEFINED | row 54 | T-V9-80 (54) |
| M-V09-3085-E1-none | UNTESTED | row 55 | T-V9-80 (55) |
| M-V09-3085-E2-one | UNTESTED | row 55 | T-V9-80 (55) |
| M-V09-3085-E8-lifecycle | UNDEFINED | rule (E8) and row 55 | T-V9-80 (55) |
| M-V09-3102-E1-none | UNTESTED | row 56 | T-V9-80 (56) |
| M-V09-3102-E2-one | UNTESTED | row 56 | T-V9-80 (56) |
| M-V09-3102-E4-degenerate | UNDEFINED | rule (E4) and row 56 | T-V9-80 (56) |
| M-V09-3102-E6-rungs | UNDEFINED | rule (E6) and row 56 | T-V9-80 (56) |
| M-V09-3102-E7-toggles | UNTESTED | row 56 | T-V9-80 (56) |
| M-V09-3142-E1-none | UNTESTED | row 57 | T-V9-80 (57) |
| M-V09-3142-E2-one | UNTESTED | row 57 | T-V9-80 (57) |
| M-V09-3142-E5-data | UNTESTED | row 57 | T-V9-80 (57) |
| M-V09-3142-E7-toggles | UNTESTED | row 57 | T-V9-80 (57) |
| M-V09-3172-E6-rungs | UNDEFINED | rule (E6) and row 58 | T-V9-80 (58) |
| M-V09-3172-E8-lifecycle | UNDEFINED | rule (E8) and row 58 | T-V9-80 (58) |
| M-V09-3180-E6-rungs | UNDEFINED | rule (E6) and row 59 | T-V9-80 (59) |
| M-V09-3191-E1-none | UNTESTED | row 60 | T-V9-80 (60) |
| M-V09-3191-E2-one | UNTESTED | row 60 | T-V9-80 (60) |
| M-V09-3191-E4-degenerate | UNDEFINED | rule (E4) and row 60 | T-V9-80 (60) |
| M-V09-3191-E5-data | UNTESTED | row 60 | T-V9-80 (60) |
| M-V09-3191-E7-toggles | UNDEFINED | row 60 | T-V9-80 (60) |
| M-V09-3191-E8-lifecycle | UNTESTED | rule (E8) and row 60 | T-V9-80 (60) |
| EI-V09-EDGE-1 | UNDEFINED | row 40 (`bend.raised.skyAccess`) | T-V9-52 |
| C-steep-tools | UNDEFINED (combination) | row 61 | T-V9-80 (61) or the row's named bar |
| C-steep-layers | UNDEFINED (combination) | row 62 | T-V9-80 (62) or the row's named bar |
| C-moat-tools | UNDEFINED (combination) | row 63 | T-V9-80 (63) or the row's named bar |
| C-bridge-layers | UNDEFINED (combination) | row 64 | T-V9-80 (64) or the row's named bar |
| C-oasis-tools | UNDEFINED (combination) | row 65 | T-V9-80 (65) or the row's named bar |
| C-oasis-layers | UNDEFINED (combination) | row 66 | T-V9-80 (66) or the row's named bar |
| C-frame-tools | UNDEFINED (combination) | row 67 | T-V9-80 (67) or the row's named bar |
| C-frame-layers | UNDEFINED (combination) | row 68 | T-V9-80 (68) or the row's named bar |
| C-hood-layers | UNDEFINED (combination) | row 69 | T-V9-80 (69) or the row's named bar |
| C-terraced-ward-tools | UNDEFINED (combination) | row 70 | T-V9-80 (70) or the row's named bar |
| C-terraced-ward-layers | UNDEFINED (combination) | row 71 | T-V9-80 (71) or the row's named bar |
| C-composed-layers | UNDEFINED (combination) | row 72 | T-V9-80 (72) or the row's named bar |
| C-crypt-tools | UNDEFINED (combination) | row 73 | T-V9-80 (73) or the row's named bar |
| C-crypt-layers | UNDEFINED (combination) | row 74 | T-V9-80 (74) or the row's named bar |
| C-plan-layers | UNDEFINED (combination) | row 75 | T-V9-80 (75) or the row's named bar |
| C-shade-tools | UNDEFINED (combination) | row 76 | T-V9-80 (76) or the row's named bar |
| C-shade-layers | UNDEFINED (combination) | row 77 | T-V9-80 (77) or the row's named bar |
| C-skyaccess-layers | UNDEFINED (combination) | row 78 | T-V9-80 (78) or the row's named bar |
| C-landfall-tools | UNDEFINED (combination) | row 79 | T-V9-80 (79) or the row's named bar |
| C-landfall-layers | UNDEFINED (combination) | row 80 | T-V9-80 (80) or the row's named bar |
| C-history-tools | UNDEFINED (combination) | row 81 | T-V9-80 (81) or the row's named bar |
| C-history-layers | UNDEFINED (combination) | row 82 | T-V9-80 (82) or the row's named bar |
| C-dossier-tools | UNDEFINED (combination) | row 83 | T-V9-80 (83) or the row's named bar |
| C-custom-tools | UNDEFINED (combination) | row 84 | T-V9-80 (84) or the row's named bar |
| C-custom-layers | UNDEFINED (combination) | row 85 | T-V9-80 (85) or the row's named bar |
