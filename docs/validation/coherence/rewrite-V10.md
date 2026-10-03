# Rewrite — design volume V10 (the AI clerk)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V10; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V10`; 2026-10-03)
- P1 inputs gathered (canon unit V10: 18 conflicts, 7 elegance rulings, 5 id rulings, 10 wiring gaps, 39 f items, 2 g parts (111, 113), 21 hand-offs in, 39 open findings, edges 51 UNDEFINED + 14 UNTESTED + 8 owned combinations; inventory 805 ids): done
- P2 mechanical pass (`work/rewrite-V10/convert.py`: citation form, list continuations, retired names, narration ids, BCR → applied item): done
- P3 new text, 30 parts (`work/rewrite-V10/parts/00-head.md` … `29-s11-13.md`, assembled in file-name order), with the new V10 §3.9b and V10 §3.23: done
- P4 assemble, verify ids, references, terms, f items, sizes, doc_checks (provisional): done
- P5 report, result file, LANDED: done

**Outputs.** `docs/validation/coherence/new/volumes/V10-clerk.md` (the complete new text: the same title line, the same
section structure §0–§13 and *Integration notes*, its one marker line kept, every other banner and ledger dropped); this
report; `docs/validation/coherence/results/coherence_rewrite-V10.json`. Source `docs/volumes/V10-clerk.md`
(md5 0b58e0fcb80dd24d011fc0b4badc9e6c, 4 047 lines), unchanged. Working parts and scripts:
`docs/validation/coherence/work/rewrite-V10/` (`convert.py`, `edits/`, `parts/`, `mapping.py`, `routing.md`).

## 1. Sizes

Counted as the canon counts (whitespace-separated tokens): **84 658 → 72 685 words (−14.1 %)**; by `wc -w` 83 260 →
71 637; bytes 538 604 → 453 544 (526.0 → 442.9 KB); lines 4 047 → 3 271.

| part of the volume | before | after | source of the change |
|---|---|---|---|
| title, banners, *How to read* | 1 551 | 272 | narration: eight stacked banners, two revision notes, the PROGRESS and REVISION ledgers; one marker line; the citation convention (`Vnn §x.y`, bare `§x` the base) with ID-TOOL and ID-LAYER |
| §0 In plain words | 1 113 | 1 011 | J121's wording (the deployment's AI setup decides the provider, model and key path; SettlementForge's assistant through the host seam); one sentence each for items 111 and 113 |
| §1 Scope and hooks | 2 335 | 2 372 | hook rows for §2.7's `HistoryRecord`, §4.5's water term, §4.11, J121/J122, V12 §2.10 and V12 §4.4; restated hook prose cut to references |
| §1b Wiring | 3 858 | 4 050 | rows for `DirectBackend`, `ClerkSegment.promptTokens`' reader (W-FLD-12), `RuleAnswer.evidence` (W-IF-05), the `water` and `history` sections, DR34–DR40; owed interfaces |
| §2 Data model | 11 434 | 11 703 | typed additions (`IntendInput.history`, `GroundInput.spring`, `read_map 'past'`, `MapBrief` water and history, `RuleAnswer.evidence`, `clerk.ops.model.provider`, `encoders.ringSides`/`scopeRingSides`/`isletM2`); `ClerkSegment`; the alias and the family shim dropped; restated base rules cut to §11.2's |
| §3 without §3.9b and §3.23 | 22 046 | 22 907 | prompt rule 19 and the symbolic-number rule, the desert, oasis and history lexicon rows, the owed-provider table completed (W-IF-01/02/03), SR6-05 in the body, J121's configurations; restatements to references (the rung populations, the size words, the rank cap, V04's and V03's value lists) |
| §3.9b water and the town's past (new) | — | 917 | new design: items 111 and 113 at build depth |
| §3.23 edges and combinations (new) | — | 2 468 | new design: principle (11)'s 65 edges, the 8 owned combinations (+1), EI-V10-EDGE-1 |
| §4 Editing | 4 129 | 4 281 | the history and oasis encoders, ring sides from `clerk.content`, V11 §4.2's `avoid`, the replaced empty-state town (J-V10.116) |
| §5 – §6 | 2 745 | 2 853 | the `past`, `water` and `history` budgets; J121's pricing note; Q3's answer |
| §7 Tests | 6 408 | 7 167 | T-V10-45 – T-V10-49; 95 cases (J-V10.111); J122's staged evaluation spend |
| §8 Build plan | 1 253 | 1 355 | M3c 10.75–14.5 pw, C1 3.25–4.75 pw (items 111 and 113), totals recomputed |
| §9 Decisions | 8 079 | 8 533 | E-24's one mark (J-V10.34, .57 reduced to their mark; nine rows amended), seam and critique ids out, reasons kept; nine new rows J-V10.111 – J-V10.119 |
| §10 Base change requests | 6 337 | 1 447 | 23 quoted BCR blocks → one pointer table (ID-BCR); CVR table with each request's destination, every one met |
| §11 – §13 | 5 398 | 1 211 | §11 answered (J121/J122); §12 one CONFIRMED paragraph and the PLAUSIBLE list; §13 no open item, a hand-off table |
| *Integration notes*, twelve reconciliation ledgers, the finalization note | 7 972 | 138 | folded at their homes (J-VI.2, .4, .5, .17, .26; SR6-01, SR6-05); a pointer list |

**SIZE-1 (shrink below the 25–40 % goal).** The volume shrinks 14.1 %. Narration and quoted base text removed ≈ 18 200
words (head, §10's quotations, §11–§13's round records, the ledgers); the new design the canon routed here adds ≈ 6 300
(§3.23 2 468, §3.9b 917, five bars and six cases 759, nine decision rows ≈ 1 000, items 111 and 113's rows in §1b, §2.12,
§2.13, §3.3, §3.9, §3.9a, §4.1 and §6 ≈ 1 150); without it the shrink is 21.6 %. What holds the rest is irreducible at
the depth the brief asks: §2's typed interfaces (11 703 words — the only home of every clerk type an implementer builds),
§3's prompt rules, schemas, encoders and failure ladders stated as steps with constants, §4.1's encoder table (one row
per tool input form, each the event bytes), §7's 49 bars and 95-case evaluation, §9's 119 decision rows (ids stable,
reasons kept by E-24).

## 2. What the canon routed here, and where it is closed

* **REFERENCE (31).** Each restated fact now cites its home (mapping table: "cites …"): §7.1's binding table (V10 §1b.3),
  §14 (V10 §2.1), V09 §2.10's effective key (V10 §2.3), J-V9.81 and V08 §3.1 (V10 §2.6), V11 §3.1 rows 88–89 (V10 §2.10),
  §11.2's *Knowledge* and oracle rules (V10 §2.13), V01 §4.5 (V10 §2.13, the shim dropped), V09 §2.9's `MsgRow.buttons`
  (V10 §3.5), §4.7 and §4.5 (V10 §3.9), V04 §2.2 and V03 §3.7.4 (V10 §3.9a: the access-cause value list and the class
  crypt values no longer restated, `rankCap` named without its number), V08 §5.4 (V10 §3.17). V10 §3.9a's row words stay
  (they are this volume's catalogue rows over V04's and V03's records, CVR-V10-1, CVR-V10-2).
* **BCR pointers (23).** V10 §10.1 is one pointer table, BCR-V10-1 … BCR-V10-23 → items 468, 311, 270, 297, 469, 470,
  473, 518, 538, 531, 487, 348, 471, 519, 271, 365, 366, 367, 481, 368, 290 (6), 572, 571 (with the merged members:
  460, 463, 467, 583 on 468; 459 on 469; 461, 463, 572 on 470; 269 on 270; 570 on 368). No `BCR-V10-n` id appears outside
  V10 §10. The body cites the applied item.
* **Terms.** G-cite: every self-citation `V10 §x.y`, every other volume `Vnn §x.y`, list continuations prefixed (38 by
  script, V10-BREF-2; 0 hits of `V1 §` … `V9 §`). G-DR: DR34, DR35 (and DR36–DR40 for items 111/113) only; 0 `DR-V`.
  G-newrandom: "New random" in prose; "Try again" only as the proposal card's button label; 0 "scoped re-roll".
  G-suppress: "suppression" (item 260) in prose; 0 "kept removed". G-clerkhandle: `ClerkHandle` only (0 `ClerkHarness`).
  G-offline: `refuse.clerk.offline` only (0 `error.clerkOffline`). G-floorvault: none; V03 §3.7.4's wet-ground rule cited.
* **Conflicts (18)** — section 3.
* **File f items** cited as base text, never restated: 238, 246, 260, 270, 271, 290, 297, 311, 339, 348, 362, 365, 366,
  367, 368, 460, 461, 463, 464, 465, 466, 468, 469, 470, 471, 473, 481, 487, 516, 518, 519, 531, 538, 568, 570, 571, 572,
  582, 583 (all 39 of the canon's list; 238 and 516 newly cited at V10 §3.9a and V10 §3.3).
* **File g, written at build depth.**
  * **Item 111 (the explanations).** V10 §3.9b's `water` section (J-V10.112): rows `pull` (S3 (6)'s `w_water·q(x)` with
    the climate row's weight), `rich` (§4.5's `w_waterP·q(x)` share from `FieldDrivers`), `shade` (the climate row's
    sunlight cell ≤ 0), `oasis` (dossier with DR40, generated with `oasisChance` and `oasisNoWaterFactor`, drawn),
    `well` (S10b's yield and the tightened coverage), `failing` (V06 §4.5's decline); `GroundInput.spring` and the `lake`
    encoder's `spring: true` (V10 §2.12, V10 §4.1); `MapBrief.water.arid` and oasis lakes (V10 §2.13); the lexicon's
    desert, arid and oasis rows (V10 §3.3); §4.5's water term in the drivers (V10 §3.9); budgets (V10 §6); three cases
    (J-V10.111); T-V10-45; the no-op pin with item 111's weights at 0 (T-V10-43).
  * **Item 113 (the story told).** V10 §3.9b's `history` section (J-V10.113): rows `peak` ("built when {town} was {a
    tierWord} of {population}"), `peak.symbolic` ("its exact size is not recorded"), `epoch`, `event` (DR37), `refounded`,
    `buried`, read from §2.7's `HistoryRecord`, `Provenance.symbolic` and DR36–DR39; the `past` read and the brief's
    history line (V10 §2.12, V10 §2.13, V10 §3.3); prompt rule 19 and the symbolic-number rule (V10 §3.3, V10 §3.13);
    V10 §3.9a's lost-void and buried-former-settlement rows (`info.under.lost`, `info.under.buried`); T1's
    `history: { once; ageYears? } | 'none'` encoder (V10 §4.1); three cases (J-V10.111); T-V10-46.
* **Wiring gaps (10).** W-IF-01 — V04's providers in V10 §3.9's owed table. W-IF-02 — V07's provider row (V07 §4.5).
  W-IF-03 — V01's providers (fabric, terrace and `RetainingWall`, J-V10.117). W-IF-05 — `RuleAnswer.evidence` reading V12
  §2.10's shipped `dist/evidence.json` (V10 §1b.1, V10 §2.13, J-V10.118). W-PKG-01 — `plat clerk` in `@plat/cli` (V10 §1b.1,
  V10 §2.1). W-EDIT-01 — closed by E-04 (V10 §1b.3, V10 §3.4, T-V10-1). W-FLD-12 — `ClerkSegment.promptTokens` read by
  V10 §3.2's `length` rule (V10 §1b.1, V10 §2.3). V05-WGAP-2b — the sky's island and access bends in V10 §3.16's bends
  paragraph. V06-WGAP-1b — `bend.time.hoodAlone` (V10 §3.16; CANON-C02). V10-WGAP-1 — `encoders.isletM2`, `ringSides`,
  `scopeRingSides` in `clerk.content` (V10 §2.10) read by V10 §4.1's islet, fill and green rows.
* **Edges (principle (11)).** V10 §3.23: one mechanism table (every UNDEFINED and UNTESTED row of the edge list — 51 and
  14 — given an outcome, a rung of §5's ladder and a test, T-V10-47); a combination table (the 8 owned combinations —
  steep ground, a moat, a square, the frame, a sewer, an access, an arch vault, a custom element — and a dossier change
  while a proposal waits; T-V10-48); EI-V10-EDGE-1 (the replaced empty-state town, V10 §4.2 (3), J-V10.116, T-V10-49).
* **Hand-offs in (21)** — closed in the text:

  | hand-off | closed at |
  |---|---|
  | V06:X7 (V06's four `WhyProvider`s, the `advance` shapes) | V10 §3.9 owed V06 row (V06 §4.5's four providers), V10 §2.12 |
  | V06:X17 (the raised-way provider over epochs) | V10 §3.9's `raised` section rows (lifecycle, suppression, the ledger's candidates) |
  | V06:X30 (the hood gate's line, the bends, `repairRetaining`, remove lines) | V10 §3.16 (`bend.time.hoodAlone`), V10 §3.9 owed V06 row, V10 §4.1 |
  | V06:X48 (prompt rule 17's what-if) | V10 §3.3 rule 17, J-V10.108 (confirmed) |
  | V08:X11 (`info.raised.*`, `info.raised.suppressed`) | V10 §3.9, CVR-V10-14 (confirmed) |
  | XV-V9-6 (`deck/landmarks/<head\|mid>`) | V10 §3.9 owed V02 row, CVR-V10-8 |
  | XV-V9-7 (`createClerk(mount)` → `ClerkHandle`, `DraftItem.bent`) | V10 §2.6, V10 §2.4 (confirmed) |
  | XV-V9-8 (M3c pricing) | V10 §8 (confirmed; re-priced for items 111 and 113) |
  | XV-V9-10 (one text for item 362; T10 `hold`) | V10 §4.1, T-V10-38 (confirmed) |
  | XV-V9-11 (effects on the card) | V10 §2.6 `ProposalView`, V10 §5.4, V10 §4.4, J-V10.75 (confirmed) |
  | XV-V9-12 (retaining and terrace rows, `RaisedOutcome`) | V10 §4.1, V10 §2.13 (confirmed) |
  | XV-V9-18 (the bridge through the mount) | V10 §2.6 (alias dropped, E-33), V10 §3.17, V10 §2.3 |
  | XV-V9-19 (dispatch note, `where.locus`) | V10 §2.6, V10 §4.1 (confirmed) |
  | XV-V9-22 (`rebuildEvents(seq)`) | V10 §4.3, V10 §2.6 (confirmed) |
  | XV-V9-30 (`MsgRow.buttons`, `useTool` with `mode`) | V10 §3.5 step 3, V10 §1b.1, V10 §2.6, V10 §3.16; (g) by SR6-05's fix |
  | X-V11-3 (`WhyPull.row` with V11 §2.4's ids; `query row`/`profile`) | V10 §2.13, V10 §3.9, V10 §2.12 |
  | X-V11-14 (d) (no `clerk.*` cell calibratable; `clerk/ops.json`, `clerk/content.json`) | V10 §2.10 *Default rows*, V10 §3.3's lexicon heading |
  | X-V12-7 ("why is this value so?": the plain line first, runs behind "details", a stamped cell's owner rule, no run started) | V10 §3.9's provenance answer, `RuleAnswer.evidence`, J-V10.118 |
  | X-V12-8 (the K2 fixture path and structure list) | V10 §3.15 (`plat/tests/fixtures/known-city/K2/`, V12 §3.14's K2-4) |
  | X-V12-16 (V10's tables not calibratable) | V10 §2.10 (V11 §3.1 rows 88–89) |
  | X-V12-18 (one entry per stage) | no edit needed (confirmed) |

* **Owner questions (5)** — V10 §11 answered: Q1 follows SettlementForge's AI setup (J121); Q2 SettlementForge's
  assistant driving the tool API (J121, J122; configuration C); Q3 follows SettlementForge, a cheaper tier evaluated
  before any switch (J121, J122); Q4 M3c beside M3b (J122); Q5 the US$790–1 190 cap spent in stages (J122), written into
  V10 §7.3's schedule.
* **Agreement-matrix subjects.** `WhyPull` with V01 — V10-XAGREE-2 (V01 names `sun`, `nuisance`; the shim dropped).
  `SettlementForge` with V08, V09 and scope — SCOPE-C07 (configuration C in SettlementForge's module; the built-in clerk
  at M3c where configured). `EditEvent` with V09 and determinism — DXC-04/E-04 (§7.1's binding table). `T-V9-15` with
  V09 — V09-XAGREE-3 (V02's bend ids, worded through V09's rows). `BCR-V10-20` with V09 — item 368 with item 570 (`delete`
  at T10, read from §7.1's binding table).
* **Fix list.** The CVR rows (V10-0748 … V10-0767) are all met at their destinations (V10 §10.2's "met at" column) and the
  fix-list paragraph (V10-0781) became V10 §13's hand-off table; §13 holds no open item.
* **Open findings (39)** — each closed in the text:

  | finding | closed by |
  |---|---|
  | VOL-V09-V10-RESTATEMENTS-018 | V10 §2.12's `siting.weights` cites V09 §2.6's multipliers |
  | VOL-V09-V10-RESTATEMENTS-019 | V10 §4.1's T12 row writes the bytes of V09 §4.5's T12 row, not restated |
  | VOL-V09-V10-RESTATEMENTS-020, V10-RESTATE-1 | V10 §3.3's lexicon: "the rung's typical population" (V07 §2.1), no number |
  | VOL-V09-V10-RESTATEMENTS-021, V10-RESTATE-2 | V10 §3.9a: `rankCap` named (V04's `CatacombRule` in V11's table), no number |
  | V10-XAGREE-1 … -4, V10-J121-1 … -3 | conflict rulings (section 3) |
  | V10-ELEG-1, V10-ELEG-2 | E-32, E-33 (section 4) |
  | V10-EDGE-1 | EI-V10-EDGE-1: V10 §4.2 (3), V10 §3.23, J-V10.116, T-V10-49 |
  | V10-WGAP-1 | V10 §2.10's encoder cells, V10 §4.1 |
  | V10-MISSING-1, V10-MISSING-2 | items 111 and 113 at build depth (above) |
  | V10-TERM-1 | G-cite (above) |
  | V10-DEFER-1 | CVR-V10-12 met at V11 §3.6 and V11 §4.5; CVR-V10-13 met at V01 §3.17.1 (2); no conditional left |
  | V10-DEFER-2, SR6-05 (surfaces) | fixed in the body: the subject rule cites V09 §2.9 (V10 §3.5); restated lists → pointers; `fork` and `undo` worded by `button.openCopy` and `button.undo` (J-V10.119); the status line gone; CVR-V10-20 met |
  | V10-NARR-1 … -5 | one marker line; ledgers, revision notes and round logs removed; seam and critique ids out of normative text; superseded rows reduced to their mark; §12 one paragraph; §13 a table |
  | V10-BREF-1 | V10 §3: "every constant a `clerk.ops` or `clerk.content` cell" |
  | V10-BREF-2 | 38 list continuations prefixed by script; every bare `§x` is the base's (0 unresolved) |
  | V10-HANDOFF-1 | V10 §3.15 cites V01 §3.17.1 (2), the declaration V09 §7.2's canvas script makes |
  | V10-HANDOFF-2, V10-HANDOFF-3 | V10 §10.2: every CVR met, each with its destination section |
  | IN-V10-1 … IN-V10-5, IN-V02-3 | folded (ID-WX): V10 §3.16, V10 §2.13, V10 §2.12 and V10 §3.9, V10 §10.2, V10 §4.1; *Integration notes* lists the J-VI numbers |

## 3. Conflicts resolved (18)

| conflict | ruling applied | where |
|---|---|---|
| DIC-06 | ID-TOOL: a tool with its word at first use (T8 `fill`); bars always numbered | throughout; the head |
| DIC-07 | ID-LAYER: the commitment layers by word (L0 INTENT, L1 GROUND AND BONES …) | the head, V10 §3.4 |
| DXC-04 | E-04: one binding table at §7.1; the encoders and the tool schemas read it | V10 §1b.3, V10 §3.4, V10 §4.1, T-V10-1 |
| MC-11 | §2.1 declares `Segment` (geometric); the clerk's record renamed `ClerkSegment` (J-V10.115) | V10 §2.3, V10 §1b.1, V10 §2.14, V10 §3.2 |
| SCOPE-C07 | SettlementForge's assistant drives the tool API through the host seam (C); the built-in clerk at M3c where configured; provider, tier and key path read from the AI setup (J121, J122) | V10 §0, V10 §2.2, V10 §2.11, V10 §3.17, V10 §11 |
| SCOPE-C16 | `@plat/clerk` by item 518; `@plat/cli` (`plat clerk`) placed by W-PKG-01 | V10 §2.1, V10 §1b.1 |
| V09-XAGREE-1 | `link` writes V11 §4.2's declared cells `{bindTo?, avoid?, cut?}` only | V10 §2.12, V10 §4.1 |
| V09-XAGREE-3 | V02's bend ids (V02 §1b) worded through V09 §4.9's row per id | V10 §3.9 owed V02 row, V10 §3.16 |
| V10-XAGREE-1 | `avoid` unconditional, citing V11 §4.2 | V10 §2.12, V10 §4.1 |
| V10-XAGREE-2 | V01 names its pushes `sun` and `nuisance`; the shim dropped; CVR-V10-6 met | V10 §2.13, V10 §3.9, V10 §10.2 |
| V10-XAGREE-3 | one rule for the size words: V09 §4.5's T1 quantile, the lexicon naming it | V10 §3.3 |
| V10-XAGREE-4 | V03 §3.7.4's wet-ground rule: a raised-choir crypt for an `always` class, else no crypt and ledger slabs | V10 §3.9a |
| V10-J121-1 | the plain words follow J121: the deployment's AI setup; SettlementForge's assistant through the host seam | V10 §0 |
| V10-J121-2 | SettlementForge's configuration is C (J121, J122); A and B for the standalone product and other hosts; the notice names the setup's provider | V10 §3.17, V10 §3.20, J-V10.20 |
| V10-J121-3 | Q1–Q5 answered; J122's staging in V10 §7.3 | V10 §11, V10 §7.3 |
| CANON-C02 | a lone neighbourhood has no clock: `bend.time.hoodAlone` | V10 §3.16 |
| CANON-C03 | no question waits on the owner | V10 §11 |
| CANON-C04 | no fix item deferred | V10 §13 |

## 4. Elegance rulings applied, with their equivalence lists

**E-04 — one event → tool binding table at §7.1.** V10 §1b.3 and §4.1 cite it; V10 §3.4's tool schemas read each tool's
kinds from it; T-V10-1 checks each tool's `events` enumeration equals the kinds bound to it.
[x] every `EditEvent` kind has a row (§7.1's; the clerk adds no kind). [x] history kinds marked with their producer (the
clerk emits none; `undo` and `rebuild` are actions run by the handle). [x] V09's per-target homes kept (the encoders send
`delete` under T10, splits and joins by the target's registry kind under T9). [x] T-V9-12 checks completeness (cited).

**E-07 — one dry-run outcome table at §7.1.** V10 §3.5 step 3 and V10 §3.16 read it: a dossier-owned refusal is
`dossier`, a lock `lock`, every other refused or conflict row `rule`; every bent row reaches the model as the item's `bent`
line. [x] each case's offered alternative its own row (V10 §3.16's alternatives). [x] only a dossier fact or a lock
refuses. [x] item 582's three bends (`bend.place.noSite`, `bend.place.overBudget`, `bend.vacate`). [x] V09's `bend.*` and
`refuse.*` keys one to one (V10 §3.5 reads V09 §4.9's rows).

**E-17 — one admission function at §9.2.** V10 §1.2's hook row, V10 §2.13's reader rule and V10 §3.12's guard cite it
(the city band, whatever the zoom). [x] each reader's band kept (the clerk's: the city band). [x] `admitAs` (item 572)
and the filtered dry runs (item 470) cite it.

**E-24 — one mark on a superseded or amended decision.** V10 §9: J-V10.34 "Superseded by J-V10.80."; J-V10.57
"Superseded by J-V10.88."; J-V10.4, .20, .24, .69 amended by J-V10.114; .28 by .111; .78 by .113; .101 by .106; .102 by
.119; .106 by .110. [x] no row dropped (J-V10.1 – J-V10.119 all present). [x] the governing row keeps the reason.

**E-28 — `PlanReport.notes` for `shrineOneRoom`, `solidMonument`, `stackCarried`.** V10 §1.2's V03 hook row and V10 §3.9's
owed V03 row read the notes; CVR-V10-9 names them. [x] same producer and readers (V03's plan; the `plan` section). [x] the
three conditions reported as notes, not lost.

**E-32 — one row `refuse.clerk.offline`.** `error.clerkOffline` retired (V10 §3.16's `offline` row; V10 §3.21; V10 §3.23's
package row). [x] same condition, same user outcome.

**E-33 — `ClerkHandle` everywhere.** The alias `ClerkHarness` dropped (V10 §2.6; V10 §1b.2; T-V10-44 runs `ClerkHandle.run`).
[x] `createClerk(mount)` returns `ClerkHandle`.

**Id rulings.** ID-BCR (V10 §10 the only home of BCR ids); ID-TOOL; ID-LAYER; ID-WX (no SR-, SS-, C10-, TR-, SCC-, IN-
or XV- id in the body; the IN notes folded; V06's W-ids cited only as "V06 §4.5 (its W31, W53)", which V06's text still
defines); ID-DUPDEF (each type defined once: `ClerkHandle`, `ClerkSegment`, `RuleAnswer`, `MapBrief`); ID-DR (DR-V8.7 →
DR34, DR-V8.8 → DR35).

## 5. Renumberings and new ids

* **New sections:** V10 §3.9b (water and the town's past, items 111 and 113), V10 §3.23 (edges and combinations).
* **Renames:** `ClerkHarness` → `ClerkHandle` (E-33); `Segment` → `ClerkSegment` (J-V10.115, MC-11); `AnthropicBackend` →
  `DirectBackend` and `backend: 'anthropic'` → `'direct'` (J121, J-V10.114); `error.clerkOffline` → `refuse.clerk.offline`
  (E-32); `clerk.alt.history.fork`, `.undo` → V09's `button.openCopy`, `button.undo` (J-V10.119); the room cause
  `deckRefusal` → `deckNoCellar` (V03's name); DR-V8.7, DR-V8.8 → DR34, DR35.
* **New decisions:** J-V10.111 (six cases for items 111/113), .112 (the `water` section), .113 (the `history` section,
  the `past` read, rule 19), .114 (provider, SDK, tier and key path from the AI setup), .115 (`ClerkSegment`), .116 (the
  replaced empty-state town), .117 (`RetainingWall` to V01's provider), .118 (`RuleAnswer.evidence`), .119 (V09's shared
  history buttons).
* **New tests:** T-V10-45 (item 111), T-V10-46 (item 113), T-V10-47 (edges), T-V10-48 (combinations), T-V10-49 (the
  replaced empty-state town). Evaluation 89 → 95 cases.
* **New cells:** `clerk.ops.model.provider`; `clerk.content.encoders.ringSides`, `scopeRingSides`, `isletM2`; lexicon rows
  for desert, arid, oasis and a town's past. **New catalogue families:** `info.water.*`, `info.history.*`,
  `info.under.lost`, `info.under.buried` (V09's catalogue).
* **New typed members:** `IntendInput.history`, `GroundInput.spring`, `read_map { kind: 'past' }`, `MapBrief.water.arid`,
  `MapBrief.history`, `EntityCard.attrs[].symbolic`, `RuleAnswer.evidence`.
* **Fixture path:** the second known city at `plat/tests/fixtures/known-city/K2/` (V12 §3.14).

## 6. Checks run (2026-10-03)

* Ids: J-V10.1 – J-V10.119 each defined once, every cited one defined; T-V10-1 – T-V10-49 each defined once, every cited
  one defined; CVR-V10-1 – -20 and BCR-V10-1 – -23 each once in V10 §10.
* References: every `V10 §x.y` and every `Vnn §x.y` resolves to a heading or a numbered paragraph of the landed new texts
  of V01 – V12 (0 unresolved); bare `§x` the base's.
* Terms: section 2's sweep, 0 retired forms (raw-regex sweep over the assembled file).
* f items: all 39 cited.
* Mapping: 805 of 805 inventory ids mapped; every "V10 §x" the table names is a heading of the new text. Identifier sweep:
  of 2 049 backticked identifiers in the inventory's statements, 33 are absent from the new text — each a retired name
  (`ClerkHarness`, `ClerkHarness.run`, `AnthropicBackend`, `SUNLIGHT`, `EMITS`, `SENSITIVE`, `deckRefusal`), a value list
  now cited (`mineBreach`, `lifeline`), a literal replaced by its cell (the 32-gon ring), a restated form now cited
  (`detail.suppress` → item 260's suppression; T12's `rerollLayer` bytes → V09 §4.5), a met request's detail
  (`DeckContext.landmark`, `effectiveKey(): Knowledge`, `MsgRow.buttons?: MsgButton[]`, `critique.K1`, `info.raised.*`,
  `Record<string, number>`, `chamber`, `action?`), an md5 of a round record, or a fragment of quoted punctuation.
* `docs/validation/bench/doc_checks.py --doc …/new/volumes/V10-clerk.md` — **provisional, not authoritative** (the
  reference corpus is incomplete here: captures, research/patreon, research/devlogs, research/ftg-docs, research/external
  absent): C1 0, C2 0, C3 157 (source 239), C4 0, S1 0 (one unescaped `|` in a table cell fixed), S2 326 unreviewed
  (source 376; base pointers the script resolves against the document itself).

## 7. CROSS-PART NOTES

* **base (scope §16, item 531, item 568):** M3c's row reads 10.75–14.5 pw (items 111 and 113's V10 parts +0.75: the
  `history` section, its encoder and lexicon rows, the edge suites and six cases) and M3a's C1 3.25–4.75 pw (+0.25, the
  `water` section); the program's totals recomputed once (V10 §8: 14.25–19.5 and 14.75–20 pw).
* **base (determinism §7.1):** the binding table is the encoders' one source for each tool's kinds (E-04); the outcome
  table's refused and conflict rows are what V10's `rule` category reads (E-07). No change asked.
* **model (§2.1):** MC-11 is met by the rename `ClerkSegment` in V10; the base `Segment` keeps its meaning.
* **V09:** V09 §4.11's creation acceptance over the untouched empty-state town should read V09 §3.2 (3)'s rule — nothing
  written to the local store, the old town's blueprint kept for the session's undo — as V10 §4.2 (3) states
  (EI-V10-EDGE-1, J-V10.116); V09 §4.9's table of V10's families gains `info.water.*`, `info.history.*`,
  `info.under.lost` and `info.under.buried`, and its `clerk.alt.*` row names `clerk.alt.history.rerun` and `.rebuild`
  only, `fork` and `undo` worded by `button.openCopy` and `button.undo` (J-V10.119). V09 §7.2's canvas script for the
  second fixture's ravine quarter and V10 §3.15's transcript cite V01 §3.17.1 (2).
* **V11:** `history.settings`' `defaultAgeYears` and `burialYears`, the event-to-epoch rows and the climate rows' item-111
  cells (`w_water`, `w_waterP`, the sunlight cell, `oasisChance`, `oasisNoWaterFactor`) are read by V10 §3.9b and V10
  §4.1; registry rows 88–89 (`clerk.ops`, `clerk.content`) gain the cells `model.provider`, `encoders.ringSides`,
  `encoders.scopeRingSides`, `encoders.isletM2` and the lexicon's desert, oasis and history rows, all
  `calibratable: false`.
* **V12:** the bars T-V10-45 – T-V10-49 join V12's register of volume bars; `RuleAnswer.evidence` reads V12 §2.10's
  `EvidenceFile` entry (status, what it is measured against, due milestone, plain lines, latest history row, a stamped
  cell's owner rule, the run ids shown only behind "details").
* **V06:** the `water` section's `failing` row reads V06 §4.5's district decline after a spring or oasis fails; the
  `history` section's `epoch` rows read the replay epochs V06 runs.
* **V01:** the `RetainingWall` kind is answered by V01 §4.5's provider (J-V10.117; V01's text registers it); CVR-V10-6 and
  CVR-V10-13 are met in V01's landed text.
* **V03:** `deckNoCellar` and `PlanReport.notes` read as V03 §2.3 and V03 §4.6 state them (E-28).

## 8. Marked for the adjudicator

* **SIZE-1** — 14.1 % shrink against the 25–40 % goal; the new design routed here is ≈ 6 300 words and the rest is
  build-depth content (section 1).
* **EDGE-1** — V10 §3.23's outcomes for the previously undefined limits are this editor's rulings at the clerk's own
  level; each cites the owning unit's rule where the limit is another unit's (§7.1's outcome table, V04's ladders, V09's
  bends).
* **J-V10.116** — the replaced empty-state town follows V09 §3.2 (3)'s Surprise-me rule (no Recent record) over a
  recipe-only Recent record; V09 §4.11 is asked to read the same (section 7).
* **J-V10.111 – J-V10.119** — decisions taken within scope, each vetoable in V10 §9.

## 9. CONFIRMED versus PLAUSIBLE (this rewrite)

**CONFIRMED** (executed): the id, reference, term, f-item and identifier sweeps of section 6 over the assembled file;
the mapping table built by `work/rewrite-V10/mapping.py` over the inventory with every named section resolved; the
cross-volume names V10 reads checked in the landed texts (V01 §4.5's `RetainingWall` provider, V11's `history.settings`
and climate cells, V03 §3.7.4's crypt rank and wet-ground rule, V06's W31/W53/W72).
**PLAUSIBLE**: that V09's, V11's and V12's editors write the section 7 notes as stated (V09's families and EI-V10-EDGE-1
line, V11's registry cells, V12's bar register), since their landed texts do not yet carry them.

## 10. MAPPING TABLE — every inventory id of V10 (805) → where it now lives

| inventory id | kind | where it now lives |
|---|---|---|
| V10-0001 | convention | V10 head (*How to read this volume*: the citation form `Vnn §x.y`, bare `§x` the base, ID-TOOL and ID-LAYER) |
| V10-0002 | summary | V10 §0 |
| V10-0003 | summary | V10 §0 |
| V10-0004 | summary | V10 §0 |
| V10-0005 | summary | V10 §0 |
| V10-0006 | summary | V10 §0 (reworded by J121: the provider, model and key path read from the deployment's AI setup; SettlementForge's assistant through the host seam) |
| V10-0007 | scope | V10 §1.1 |
| V10-0008 | scope | V10 §1.1 |
| V10-0009 | scope | V10 §1.1 (`ClerkHandle`, E-33) |
| V10-0010 | hooks | V10 §1.2 |
| V10-0011 | hooks | V10 §1.2 |
| V10-0012 | hooks | V10 §1.2 (item 10's scoped New random) |
| V10-0013 | hooks | V10 §1.2 |
| V10-0014 | hooks | V10 §1.2 |
| V10-0015 | hooks | V10 §1.2 |
| V10-0016 | hooks | V10 §1.2 |
| V10-0017 | hooks | V10 §1.2 |
| V10-0018 | hooks | V10 §1.2 |
| V10-0019 | hooks | V10 §1.2 |
| V10-0020 | hooks | V10 §1.2 |
| V10-0021 | hooks | V10 §1.2 |
| V10-0022 | hooks | V10 §1.2 |
| V10-0023 | hooks | V10 §1.2 |
| V10-0024 | hooks | V10 §1.2 |
| V10-0025 | hooks | V10 §1.2 |
| V10-0026 | hooks | V10 §1.2 |
| V10-0027 | hooks | V10 §1.2 |
| V10-0028 | hooks | V10 §1.2 |
| V10-0029 | hooks | V10 §1.2 |
| V10-0030 | hooks | V10 §1.2 |
| V10-0031 | hooks | V10 §1.2 |
| V10-0032 | hooks | V10 §1.2 |
| V10-0033 | hooks | V10 §1.2 |
| V10-0034 | hooks | V10 §1.2 |
| V10-0035 | hooks | V10 §1.2 |
| V10-0036 | hooks | V10 §1.2 |
| V10-0037 | hooks | V10 §1.2 |
| V10-0038 | hooks | V10 §1.2 (V06 §2.13; the suppression of item 260) |
| V10-0039 | hooks | V10 §1.2 |
| V10-0040 | hooks | V10 §1.2 |
| V10-0041 | hooks | V10 §1.2 |
| V10-0042 | hooks | V10 §1.2 |
| V10-0043 | hooks | V10 §1.2 |
| V10-0044 | hooks | V10 §1.2 |
| V10-0045 | hooks | V10 §1.2 |
| V10-0046 | hooks | V10 §1.2 |
| V10-0047 | hooks | V10 §1.2 |
| V10-0048 | hooks | V10 §1.2 |
| V10-0049 | hooks | V10 §1.2 (V06 §4.5; the provider table at V10 §3.9) |
| V10-0050 | scope | V10 §1.3 |
| V10-0051 | rule | V10 §1b |
| V10-0052 | wiring | V10 §1b.1 |
| V10-0053 | wiring | V10 §1b.1 |
| V10-0054 | wiring | V10 §1b.1 (`ClerkSegment`, J-V10.115; MC-11) |
| V10-0055 | wiring | V10 §1b.1 |
| V10-0056 | wiring | V10 §1b.1 |
| V10-0057 | wiring | V10 §1b.1 |
| V10-0058 | wiring | V10 §1b.1 |
| V10-0059 | wiring | V10 §1b.1 |
| V10-0060 | wiring | V10 §1b.1 |
| V10-0061 | wiring | V10 §1b.1 |
| V10-0062 | wiring | V10 §1b.1 |
| V10-0063 | wiring | V10 §1b.1 |
| V10-0064 | wiring | V10 §1b.1 |
| V10-0065 | wiring | V10 §1b.1 |
| V10-0066 | wiring | V10 §1b.1 |
| V10-0067 | wiring | V10 §1b.1 |
| V10-0068 | wiring | V10 §1b.1 |
| V10-0069 | wiring | V10 §1b.1 |
| V10-0070 | wiring | V10 §1b.1 |
| V10-0071 | wiring | V10 §1b.1 |
| V10-0072 | wiring | V10 §1b.1 |
| V10-0073 | wiring | V10 §1b.1 |
| V10-0074 | wiring | V10 §1b.1 |
| V10-0075 | wiring | V10 §1b.1 |
| V10-0076 | wiring | V10 §1b.1 |
| V10-0077 | wiring | V10 §1b.1 |
| V10-0078 | wiring | V10 §1b.1 |
| V10-0079 | wiring | V10 §1b.1 |
| V10-0080 | wiring | V10 §1b.1 |
| V10-0081 | wiring | V10 §1b.1 |
| V10-0082 | wiring | V10 §1b.1 |
| V10-0083 | wiring | V10 §1b.1 |
| V10-0084 | wiring | V10 §1b.1 |
| V10-0085 | wiring | V10 §1b.1 |
| V10-0086 | wiring | V10 §1b.1 |
| V10-0087 | wiring | V10 §1b.1 |
| V10-0088 | wiring | V10 §1b.1 |
| V10-0089 | wiring | V10 §1b.1 |
| V10-0090 | wiring | V10 §1b.1 |
| V10-0091 | wiring | V10 §1b.1 |
| V10-0092 | wiring | V10 §1b.1 |
| V10-0093 | wiring | V10 §1b.1 |
| V10-0094 | wiring | V10 §1b.1 |
| V10-0095 | wiring | V10 §1b.1 |
| V10-0096 | wiring | V10 §1b.1 |
| V10-0097 | wiring | V10 §1b.1 |
| V10-0098 | wiring | V10 §1b.1 |
| V10-0099 | wiring | V10 §1b.1 |
| V10-0100 | interface | V10 §1b.2 (`ClerkHandle` only; the alias dropped, E-33) |
| V10-0101 | interface | V10 §1b.2 |
| V10-0102 | interface | V10 §1b.2 |
| V10-0103 | interface | V10 §1b.2 |
| V10-0104 | interface | V10 §1b.2 |
| V10-0105 | interface | V10 §1b.2 |
| V10-0106 | interface | V10 §1b.2 |
| V10-0107 | interface | V10 §1b.2 |
| V10-0108 | interface | V10 §1b.2 |
| V10-0109 | interface | V10 §1b.2 |
| V10-0110 | interface | V10 §1b.2 |
| V10-0111 | interface | V10 §1b.2 |
| V10-0112 | interface | V10 §1b.2 |
| V10-0113 | interface | V10 §1b.2 |
| V10-0114 | interface | V10 §1b.2 |
| V10-0115 | interface | V10 §1b.2 |
| V10-0116 | interface | V10 §1b.2 |
| V10-0117 | interface | V10 §1b.2 |
| V10-0118 | interface | V10 §1b.2 |
| V10-0119 | interface | V10 §1b.2 |
| V10-0120 | interface | V10 §1b.2 |
| V10-0121 | rule | V10 §1b.3 — cites §7.1's binding table (E-04) |
| V10-0122 | dossier-fact | V10 §1b.5 |
| V10-0123 | dossier-fact | V10 §1b.5 |
| V10-0124 | dossier-fact | V10 §1b.5 |
| V10-0125 | dossier-fact | V10 §1b.5 |
| V10-0126 | dossier-fact | V10 §1b.5 |
| V10-0127 | dossier-fact | V10 §1b.5 |
| V10-0128 | dossier-fact | V10 §1b.5 |
| V10-0129 | dossier-fact | V10 §1b.5 |
| V10-0130 | dossier-fact | V10 §1b.5 |
| V10-0131 | dossier-fact | V10 §1b.5 |
| V10-0132 | dossier-fact | V10 §1b.5 |
| V10-0133 | dossier-fact | V10 §1b.5 |
| V10-0134 | dossier-fact | V10 §1b.5 |
| V10-0135 | dossier-fact | V10 §1b.5 |
| V10-0136 | dossier-fact | V10 §1b.5 |
| V10-0137 | dossier-fact | V10 §1b.5 |
| V10-0138 | dossier-fact | V10 §1b.5 |
| V10-0139 | rule | V10 §2 |
| V10-0140 | rule | V10 §2.1 — cites §14 (item 518) and §17.4 (item 538) |
| V10-0141 | type | V10 §2.2 (`backend: 'direct' | 'host-proxy' | 'none'`, J121, J-V10.114) |
| V10-0142 | rule | V10 §2.2 |
| V10-0143 | type | V10 §2.3 (`ClerkSegment`, J-V10.115) |
| V10-0144 | rule | V10 §2.3 — cites V09 §2.10's `effectiveKey()` and View as |
| V10-0145 | rule | V10 §2.3 |
| V10-0146 | type | V10 §2.4 |
| V10-0147 | type | V10 §2.5 |
| V10-0148 | type | V10 §2.6 |
| V10-0149 | type | V10 §2.6 |
| V10-0150 | type | V10 §2.6 (`fork` and `undo` worded by `button.openCopy` and `button.undo`, J-V10.119; SR6-05) |
| V10-0151 | rule | V10 §2.6 |
| V10-0152 | dispatch | V10 §2.6 (`ClerkHandle.run`) |
| V10-0153 | dispatch | V10 §2.6 |
| V10-0154 | dispatch | V10 §2.6 |
| V10-0155 | dispatch | V10 §2.6 |
| V10-0156 | dispatch | V10 §2.6 |
| V10-0157 | dispatch | V10 §2.6 |
| V10-0158 | dispatch | V10 §2.6 |
| V10-0159 | dispatch | V10 §2.6 |
| V10-0160 | dispatch | V10 §2.6 |
| V10-0161 | dispatch | V10 §2.6 |
| V10-0162 | rule | V10 §2.6 (history buttons by V09's shared rows, J-V10.119) |
| V10-0163 | rule | V10 §2.6 *The bridge, through the mount only* — cites J-V9.81 and V08 §3.1 |
| V10-0164 | type | V10 §2.7 |
| V10-0165 | type | V10 §2.8 |
| V10-0166 | type | V10 §2.9 |
| V10-0167 | rule | V10 §2.10 |
| V10-0168 | type | V10 §2.10 |
| V10-0169 | rule | V10 §2.10 *Default rows* — cites V11 §3.1 rows 88–89 (J-V11.81, J-V11.82) |
| V10-0170 | default-row | V10 §2.10 |
| V10-0171 | default-row | V10 §2.10 |
| V10-0172 | default-row | V10 §2.10 |
| V10-0173 | default-row | V10 §2.10 |
| V10-0174 | default-row | V10 §2.10 |
| V10-0175 | default-row | V10 §2.10 |
| V10-0176 | default-row | V10 §2.10 |
| V10-0177 | default-row | V10 §2.10 |
| V10-0178 | default-row | V10 §2.10 |
| V10-0179 | default-row | V10 §2.10 |
| V10-0180 | default-row | V10 §2.10 |
| V10-0181 | default-row | V10 §2.10 |
| V10-0182 | default-row | V10 §2.10 |
| V10-0183 | default-row | V10 §2.10 |
| V10-0184 | default-row | V10 §2.10 |
| V10-0185 | default-row | V10 §2.10 |
| V10-0186 | default-row | V10 §2.10 |
| V10-0187 | default-row | V10 §2.10 |
| V10-0188 | default-row | V10 §2.10 |
| V10-0189 | default-row | V10 §2.10 |
| V10-0190 | default-row | V10 §2.10 |
| V10-0191 | default-row | V10 §2.10 |
| V10-0192 | default-row | V10 §2.10 |
| V10-0193 | default-row | V10 §2.10 |
| V10-0194 | interface | V10 §2.11 (`DirectBackend`, the provider read from `clerk.ops.model.provider`, J121, J-V10.114) |
| V10-0195 | type | V10 §2.12 |
| V10-0196 | type | V10 §2.12 |
| V10-0197 | type | V10 §2.12 |
| V10-0198 | type | V10 §2.12 |
| V10-0199 | type | V10 §2.12 |
| V10-0200 | rule | V10 §2.13 — cites §11.2's *Knowledge* rules and oracle rules |
| V10-0201 | type | V10 §2.13 (`ClerkQuery`, item 468) — cites §11.2 |
| V10-0202 | type | V10 §2.13 (`MapBrief`, item 468; its `water.arid`, oasis lakes and `history` block added for items 111 and 113) — cites §11.2 |
| V10-0203 | type | V10 §2.13 (`EntityCard`, item 468; `symbolic` on attrs) — cites §11.2 |
| V10-0204 | type | V10 §2.13 (`WhyAnswer`, items 468 and 270) — cites §11.2 |
| V10-0205 | type | V10 §2.13 (`ExplainRequest`, `Explanation`, `WhyProvider`, items 311 and 270) — cites §2.8, §4.7 |
| V10-0206 | family-map | V10 §2.13 |
| V10-0207 | family-map | V10 §2.13 |
| V10-0208 | family-map | V10 §2.13 |
| V10-0209 | family-map | V10 §2.13 |
| V10-0210 | family-map | V10 §2.13 |
| V10-0211 | family-map | V10 §2.13 |
| V10-0212 | family-map | V10 §2.13 |
| V10-0213 | family-map | V10 §2.13 |
| V10-0214 | rule | dropped (V10-XAGREE-2): V01 names its pushes `sun` and `nuisance` (V01 §4.5, CVR-V10-6 met); the family words stay at V10 §2.13 (`clerk.content.familyWords`) |
| V10-0215 | lifecycle | V10 §2.14 |
| V10-0216 | lifecycle | V10 §2.14 |
| V10-0217 | lifecycle | V10 §2.14 (`ClerkSegment`) |
| V10-0218 | lifecycle | V10 §2.14 |
| V10-0219 | lifecycle | V10 §2.14 |
| V10-0220 | lifecycle | V10 §2.14 |
| V10-0221 | lifecycle | V10 §2.14 |
| V10-0222 | lifecycle | V10 §2.14 |
| V10-0223 | lifecycle | V10 §2.14 |
| V10-0224 | lifecycle | V10 §2.14 |
| V10-0225 | lifecycle | V10 §2.14 |
| V10-0226 | lifecycle | V10 §2.14 |
| V10-0227 | lifecycle | V10 §2.14 |
| V10-0228 | lifecycle | V10 §2.14 |
| V10-0229 | lifecycle | V10 §2.14 |
| V10-0230 | rule | V10 §2.15 |
| V10-0231 | rule | V10 §3 (every constant a `clerk.ops` or `clerk.content` cell; V10-BREF-1) |
| V10-0232 | rule | V10 §3.1 |
| V10-0233 | entry | V10 §3.1 |
| V10-0234 | entry | V10 §3.1 |
| V10-0235 | entry | V10 §3.1 |
| V10-0236 | entry | V10 §3.1 |
| V10-0237 | entry | V10 §3.1 |
| V10-0238 | lexicon-row | V10 §3.3 lexicon (the value the rung's typical population, V07 §2.1; no number restated) |
| V10-0239 | lexicon-row | V10 §3.3 lexicon (the rung's typical population, V07 §2.1) |
| V10-0240 | lexicon-row | V10 §3.3 lexicon (the rung's typical population, V07 §2.1) |
| V10-0241 | lexicon-row | V10 §3.3 lexicon (the size word reads V09 §4.5's T1 quantile of the rung table; no number restated; V10-XAGREE-3) |
| V10-0242 | lexicon-row | V10 §3.3 lexicon (the size word reads V09 §4.5's T1 quantile of the rung table; no number restated; V10-XAGREE-3) |
| V10-0243 | lexicon-row | V10 §3.3 lexicon (the size word reads V09 §4.5's T1 quantile of the rung table; no number restated; V10-XAGREE-3) |
| V10-0244 | lexicon-row | V10 §3.3 lexicon (the size word reads V09 §4.5's T1 quantile of the rung table; no number restated; V10-XAGREE-3) |
| V10-0245 | lexicon-row | V10 §3.3 lexicon (the size word reads V09 §4.5's T1 quantile of the rung table; no number restated; V10-XAGREE-3) |
| V10-0246 | lexicon-row | V10 §3.3 lexicon (the size word reads V09 §4.5's T1 quantile of the rung table; no number restated; V10-XAGREE-3) |
| V10-0247 | lexicon-row | V10 §3.3 lexicon (the size word reads V09 §4.5's T1 quantile of the rung table; no number restated; V10-XAGREE-3) |
| V10-0248 | lexicon-row | V10 §3.3 lexicon (100 000 kept inside METROPOLIS's band, §1.1: no size chip carries the word, so no quantile applies) |
| V10-0249 | lexicon-row | V10 §3.3 |
| V10-0250 | lexicon-row | V10 §3.3 |
| V10-0251 | lexicon-row | V10 §3.3 |
| V10-0252 | lexicon-row | V10 §3.3 |
| V10-0253 | lexicon-row | V10 §3.3 |
| V10-0254 | lexicon-row | V10 §3.3 |
| V10-0255 | lexicon-row | V10 §3.3 |
| V10-0256 | lexicon-row | V10 §3.3 |
| V10-0257 | lexicon-row | V10 §3.3 |
| V10-0258 | lexicon-row | V10 §3.3 |
| V10-0259 | lexicon-row | V10 §3.3 |
| V10-0260 | lexicon-row | V10 §3.3 |
| V10-0261 | lexicon-row | V10 §3.3 |
| V10-0262 | lexicon-row | V10 §3.3 |
| V10-0263 | lexicon-row | V10 §3.3 |
| V10-0264 | lexicon-row | V10 §3.3 |
| V10-0265 | lexicon-row | V10 §3.3 |
| V10-0266 | lexicon-row | V10 §3.3 |
| V10-0267 | lexicon-row | V10 §3.3 |
| V10-0268 | lexicon-row | V10 §3.3 |
| V10-0269 | lexicon-row | V10 §3.3 |
| V10-0270 | lexicon-row | V10 §3.3 |
| V10-0271 | lexicon-row | V10 §3.3 |
| V10-0272 | step | V10 §3.1 |
| V10-0273 | step | V10 §3.1 |
| V10-0274 | rule | V10 §3.2 |
| V10-0275 | rule | V10 §3.2 |
| V10-0276 | rule | V10 §3.3 |
| V10-0277 | rule | V10 §3.3 |
| V10-0278 | rule | V10 §3.3 |
| V10-0279 | rule | V10 §3.4 |
| V10-0280 | rule | V10 §3.4 |
| V10-0281 | tool-description | V10 §3.4 |
| V10-0282 | tool-description | V10 §3.4 |
| V10-0283 | tool-description | V10 §3.4 |
| V10-0284 | tool-description | V10 §3.4 |
| V10-0285 | tool-description | V10 §3.4 |
| V10-0286 | tool-description | V10 §3.4 |
| V10-0287 | tool-description | V10 §3.4 |
| V10-0288 | tool-description | V10 §3.4 |
| V10-0289 | tool-description | V10 §3.4 |
| V10-0290 | tool-description | V10 §3.4 |
| V10-0291 | tool-description | V10 §3.4 |
| V10-0292 | tool-description | V10 §3.4 |
| V10-0293 | tool-description | V10 §3.4 |
| V10-0294 | tool-description | V10 §3.4 |
| V10-0295 | tool-description | V10 §3.4 |
| V10-0296 | tool-description | V10 §3.4 |
| V10-0297 | step | V10 §3.5 |
| V10-0298 | rule | V10 §3.5 |
| V10-0299 | step | V10 §3.5 |
| V10-0300 | rule | V10 §3.5 step 3 — cites V09 §2.9's `MsgRow.buttons` (J-V10.106) |
| V10-0301 | rule | V10 §3.5 |
| V10-0302 | rule | V10 §3.5 |
| V10-0303 | rule | V10 §3.6 |
| V10-0304 | step | V10 §3.7 |
| V10-0305 | rule | V10 §3.7 |
| V10-0306 | rule | V10 §3.8 |
| V10-0307 | rule | V10 §3.9 |
| V10-0308 | default-provider | V10 §3.9 |
| V10-0309 | default-provider | V10 §3.9 |
| V10-0310 | default-provider | V10 §3.9 |
| V10-0311 | default-provider | V10 §3.9 |
| V10-0312 | default-provider | V10 §3.9 |
| V10-0313 | default-provider | V10 §3.9 |
| V10-0314 | default-provider | V10 §3.9 |
| V10-0315 | default-provider | V10 §3.9 |
| V10-0316 | default-provider | V10 §3.9 |
| V10-0317 | default-provider | V10 §3.9 |
| V10-0318 | default-provider | V10 §3.9 |
| V10-0319 | owed-provider | V10 §3.9 |
| V10-0320 | owed-provider | V10 §3.9 |
| V10-0321 | owed-provider | V10 §3.9 owed V03 row (the room cause `deckNoCellar`, V03's name for the former `deckRefusal`; E-28 `PlanReport.notes`) |
| V10-0322 | owed-provider | V10 §3.9 |
| V10-0323 | owed-provider | V10 §3.9 |
| V10-0324 | owed-provider | V10 §3.9 |
| V10-0325 | owed-provider | V10 §3.9 |
| V10-0326 | rule | V10 §3.9 |
| V10-0327 | rule | V10 §3.9 |
| V10-0328 | raised-outcome | V10 §3.9 |
| V10-0329 | raised-outcome | V10 §3.9 |
| V10-0330 | raised-outcome | V10 §3.9 |
| V10-0331 | raised-outcome | V10 §3.9 |
| V10-0332 | raised-outcome | V10 §3.9 |
| V10-0333 | raised-outcome | V10 §3.9 |
| V10-0334 | raised-outcome | V10 §3.9 |
| V10-0335 | raised-outcome | V10 §3.9 |
| V10-0336 | raised-outcome | V10 §3.9 |
| V10-0337 | raised-outcome | V10 §3.9 |
| V10-0338 | rule | V10 §3.9 |
| V10-0339 | rule | V10 §3.9 *The solver's explanation* — cites §4.7 S10b (item 311) |
| V10-0340 | rule | V10 §3.9 *The field's drivers* — cites §4.5 (item 297), the water term added (item 111) |
| V10-0341 | rule | V10 §3.9a's opening — cites V04's records (V04 §2.2, V04 §2.6) and V03 §3.7.4 |
| V10-0342 | underground-row | V10 §3.9a `underground` ruin row (the clerk's words over V04's `RuinRecord`) |
| V10-0343 | underground-row | V10 §3.9a access-point row — cites `AccessCause.rule` at V04 §2.2 (the value list no longer restated) |
| V10-0344 | underground-row | V10 §3.9a link row (`LinkCause`, V04's record) |
| V10-0345 | underground-row | V10 §3.9a void-cluster row (excavation, V04's reading; the lost void, item 113 (e)) |
| V10-0346 | underground-row | V10 §3.9a no-dwellings row (item 109 (j) (4), item 113 (e)) |
| V10-0347 | underground-row | V10 §3.9a sealed deep void row (`DigRule.maxM`, V04's) |
| V10-0348 | underground-row | V10 §3.9a catacomb row (`rankCap` named, no number; V10-RESTATE-2) |
| V10-0349 | underground-row | V10 §3.9a burial-face row (`catacombOutcome`, V04 §4.5; CVR-V10-1) |
| V10-0350 | underground-row | V10 §3.9a church-class row |
| V10-0351 | crypt-row | V10 §3.9a crypt presence row — cites V03 §3.7.4 for the class values |
| V10-0352 | crypt-row | V10 §3.9a crypt area-and-form row (V02 §3.14.5, V05 §3.10) |
| V10-0353 | crypt-row | V10 §3.9a crypt rank row — cites V03 §3.7.4's rank |
| V10-0354 | crypt-row | V10 §3.9a crypt-join row (V04 §3.5.7 (c)) |
| V10-0355 | crypt-row | V10 §3.9a — split into the wet-ground row (V03 §3.7.4: a raised-choir crypt for an `always` class, else no crypt with ledger slabs; V10-XAGREE-4) and the no-crypt row |
| V10-0356 | rule | V10 §3.9a |
| V10-0357 | rule | V10 §3.10 |
| V10-0358 | critique-row | V10 §3.10 |
| V10-0359 | critique-row | V10 §3.10 |
| V10-0360 | critique-row | V10 §3.10 |
| V10-0361 | critique-row | V10 §3.10 |
| V10-0362 | critique-row | V10 §3.10 |
| V10-0363 | critique-row | V10 §3.10 |
| V10-0364 | critique-row | V10 §3.10 |
| V10-0365 | critique-row | V10 §3.10 |
| V10-0366 | critique-row | V10 §3.10 |
| V10-0367 | critique-row | V10 §3.10 |
| V10-0368 | critique-row | V10 §3.10 |
| V10-0369 | critique-row | V10 §3.10 |
| V10-0370 | critique-row | V10 §3.10 |
| V10-0371 | critique-row | V10 §3.10 |
| V10-0372 | critique-row | V10 §3.10 |
| V10-0373 | critique-row | V10 §3.10 |
| V10-0374 | critique-row | V10 §3.10 |
| V10-0375 | critique-row | V10 §3.10 |
| V10-0376 | rule | V10 §3.10 |
| V10-0377 | step | V10 §3.11 |
| V10-0378 | step | V10 §3.11 |
| V10-0379 | rule | V10 §3.11 |
| V10-0380 | rule | V10 §3.12 |
| V10-0381 | rule | V10 §3.12 |
| V10-0382 | rule | V10 §3.13 |
| V10-0383 | step | V10 §3.13 |
| V10-0384 | step | V10 §3.13 |
| V10-0385 | step | V10 §3.13 |
| V10-0386 | rule | V10 §3.14 |
| V10-0387 | rule | V10 §3.15 |
| V10-0388 | rule | V10 §3.15 |
| V10-0389 | rule | V10 §3.16 |
| V10-0390 | refusal-row | V10 §3.16 |
| V10-0391 | refusal-row | V10 §3.16 |
| V10-0392 | refusal-row | V10 §3.16 |
| V10-0393 | refusal-row | V10 §3.16 |
| V10-0394 | refusal-row | V10 §3.16 |
| V10-0395 | refusal-row | V10 §3.16 |
| V10-0396 | refusal-row | V10 §3.16 |
| V10-0397 | refusal-row | V10 §3.16 |
| V10-0398 | refusal-row | V10 §3.16 |
| V10-0399 | refusal-row | V10 §3.16 `key` row ("Your {provider} account has no credit left.", J121) |
| V10-0400 | refusal-row | V10 §3.16 |
| V10-0401 | refusal-row | V10 §3.16 |
| V10-0402 | refusal-row | V10 §3.16 |
| V10-0403 | rule | V10 §3.16 |
| V10-0404 | host-config | V10 §3.17 configuration A (`DirectBackend`, the provider of the deployment's AI setup, J121) |
| V10-0405 | host-config | V10 §3.17 |
| V10-0406 | host-config | V10 §3.17 |
| V10-0407 | rule | V10 §3.17 |
| V10-0408 | rule | V10 §3.17 |
| V10-0409 | rule | V10 §3.17 |
| V10-0410 | rule | V10 §3.17 *Door 1* — cites V08 §5.4, §11.4 |
| V10-0411 | host-projection | V10 §3.17 |
| V10-0412 | host-projection | V10 §3.17 |
| V10-0413 | host-projection | V10 §3.17 |
| V10-0414 | host-projection | V10 §3.17 |
| V10-0415 | host-projection | V10 §3.17 |
| V10-0416 | host-projection | V10 §3.17 |
| V10-0417 | rule | V10 §3.17 |
| V10-0418 | rule | V10 §3.18 |
| V10-0419 | failure-ladder | V10 §3.19 key check (the provider's models call) |
| V10-0420 | failure-ladder | V10 §3.19 |
| V10-0421 | failure-ladder | V10 §3.19 |
| V10-0422 | failure-ladder | V10 §3.19 |
| V10-0423 | failure-ladder | V10 §3.19 |
| V10-0424 | failure-ladder | V10 §3.19 |
| V10-0425 | failure-ladder | V10 §3.19 |
| V10-0426 | failure-ladder | V10 §3.19 |
| V10-0427 | failure-ladder | V10 §3.19 |
| V10-0428 | failure-ladder | V10 §3.19 |
| V10-0429 | failure-ladder | V10 §3.19 |
| V10-0430 | failure-ladder | V10 §3.19 |
| V10-0431 | failure-ladder | V10 §3.19 |
| V10-0432 | failure-ladder | V10 §3.19 |
| V10-0433 | failure-ladder | V10 §3.19 |
| V10-0434 | failure-ladder | V10 §3.19 |
| V10-0435 | failure-ladder | V10 §3.19 |
| V10-0436 | failure-ladder | V10 §3.19 |
| V10-0437 | failure-ladder | V10 §3.19 |
| V10-0438 | rule | V10 §3.19 |
| V10-0439 | rule | V10 §3.20 |
| V10-0440 | rule | V10 §3.20 data notice (the provider named from the deployment's setup, J121) |
| V10-0441 | rule | V10 §3.21 |
| V10-0442 | rule | V10 §3.22 |
| V10-0443 | rule | V10 §4.1 |
| V10-0444 | encoder-row | V10 §4.1 |
| V10-0445 | encoder-row | V10 §4.1 |
| V10-0446 | encoder-row | V10 §4.1 |
| V10-0447 | encoder-row | V10 §4.1 |
| V10-0448 | encoder-row | V10 §4.1 |
| V10-0449 | encoder-row | V10 §4.1 |
| V10-0450 | encoder-row | V10 §4.1 `islet` row (`encoders.isletM2`, `encoders.ringSides`; V10-WGAP-1) |
| V10-0451 | encoder-row | V10 §4.1 |
| V10-0452 | encoder-row | V10 §4.1 |
| V10-0453 | encoder-row | V10 §4.1 |
| V10-0454 | encoder-row | V10 §4.1 |
| V10-0455 | encoder-row | V10 §4.1 |
| V10-0456 | encoder-row | V10 §4.1 |
| V10-0457 | encoder-row | V10 §4.1 |
| V10-0458 | encoder-row | V10 §4.1 |
| V10-0459 | encoder-row | V10 §4.1 |
| V10-0460 | encoder-row | V10 §4.1 |
| V10-0461 | encoder-row | V10 §4.1 |
| V10-0462 | encoder-row | V10 §4.1 |
| V10-0463 | encoder-row | V10 §4.1 |
| V10-0464 | encoder-row | V10 §4.1 |
| V10-0465 | encoder-row | V10 §4.1 |
| V10-0466 | encoder-row | V10 §4.1 |
| V10-0467 | encoder-row | V10 §4.1 |
| V10-0468 | encoder-row | V10 §4.1 |
| V10-0469 | encoder-row | V10 §4.1 |
| V10-0470 | encoder-row | V10 §4.1 T8 `fill` row (the ring of `encoders.ringSides` sides; V10-WGAP-1) |
| V10-0471 | encoder-row | V10 §4.1 |
| V10-0472 | encoder-row | V10 §4.1 `green` row (`encoders.ringSides`; V10-WGAP-1) |
| V10-0473 | encoder-row | V10 §4.1 |
| V10-0474 | encoder-row | V10 §4.1 |
| V10-0475 | encoder-row | V10 §4.1 |
| V10-0476 | encoder-row | V10 §4.1 |
| V10-0477 | encoder-row | V10 §4.1 |
| V10-0478 | encoder-row | V10 §4.1 |
| V10-0479 | encoder-row | V10 §4.1 |
| V10-0480 | encoder-row | V10 §4.1 `link` row (`avoid` unconditional, the cell V11 §4.2 states; V10-XAGREE-1) |
| V10-0481 | encoder-row | V10 §4.1 |
| V10-0482 | encoder-row | V10 §4.1 |
| V10-0483 | encoder-row | V10 §4.1 |
| V10-0484 | encoder-row | V10 §4.1 |
| V10-0485 | encoder-row | V10 §4.1 `remove` row (the fold's suppression, item 260) |
| V10-0486 | encoder-row | V10 §4.1 |
| V10-0487 | encoder-row | V10 §4.1 |
| V10-0488 | encoder-row | V10 §4.1 |
| V10-0489 | encoder-row | V10 §4.1 `newNames` row (V09 §4.5's T11 row cited) |
| V10-0490 | encoder-row | V10 §4.1 T12 `dress` row (the bytes of V09 §4.5's T12 row cited, not restated) |
| V10-0491 | encoder-row | V10 §4.1 |
| V10-0492 | rule | V10 §4.1 |
| V10-0493 | step | V10 §4.2 |
| V10-0494 | rule | V10 §4.3 |
| V10-0495 | rule | V10 §4.4 |
| V10-0496 | rule | V10 §4.5 |
| V10-0497 | rule | V10 §5 |
| V10-0498 | map-mark | V10 §5.1 |
| V10-0499 | map-mark | V10 §5.1 |
| V10-0500 | map-mark | V10 §5.1 |
| V10-0501 | map-mark | V10 §5.1 |
| V10-0502 | rule | V10 §5.2 |
| V10-0503 | rule | V10 §5.3 |
| V10-0504 | rule | V10 §5.4 |
| V10-0505 | rule | V10 §6 |
| V10-0506 | local-budget | V10 §6.1 |
| V10-0507 | local-budget | V10 §6.1 |
| V10-0508 | local-budget | V10 §6.1 |
| V10-0509 | local-budget | V10 §6.1 |
| V10-0510 | local-budget | V10 §6.1 |
| V10-0511 | local-budget | V10 §6.1 |
| V10-0512 | local-budget | V10 §6.1 |
| V10-0513 | local-budget | V10 §6.1 |
| V10-0514 | local-budget | V10 §6.1 |
| V10-0515 | local-budget | V10 §6.1 |
| V10-0516 | local-budget | V10 §6.1 |
| V10-0517 | local-budget | V10 §6.1 |
| V10-0518 | local-budget | V10 §6.1 |
| V10-0519 | local-budget | V10 §6.1 |
| V10-0520 | local-budget | V10 §6.1 |
| V10-0521 | local-budget | V10 §6.1 |
| V10-0522 | local-budget | V10 §6.1 |
| V10-0523 | local-budget | V10 §6.1 |
| V10-0524 | local-budget | V10 §6.1 |
| V10-0525 | local-budget | V10 §6.1 |
| V10-0526 | local-budget | V10 §6.1 |
| V10-0527 | local-budget | V10 §6.1 |
| V10-0528 | local-budget | V10 §6.1 |
| V10-0529 | local-budget | V10 §6.1 |
| V10-0530 | local-budget | V10 §6.1 |
| V10-0531 | local-budget | V10 §6.1 |
| V10-0532 | rule | V10 §6.1 |
| V10-0533 | rule | V10 §6.2 |
| V10-0534 | rule | V10 §6.3 |
| V10-0535 | rule | V10 §6.4 |
| V10-0536 | cost-row | V10 §6.4 |
| V10-0537 | cost-row | V10 §6.4 |
| V10-0538 | cost-row | V10 §6.4 |
| V10-0539 | cost-row | V10 §6.4 |
| V10-0540 | cost-row | V10 §6.4 |
| V10-0541 | latency-target | V10 §6.5 |
| V10-0542 | latency-target | V10 §6.5 |
| V10-0543 | latency-target | V10 §6.5 |
| V10-0544 | latency-target | V10 §6.5 |
| V10-0545 | latency-target | V10 §6.5 |
| V10-0546 | rule | V10 §6.5 |
| V10-0547 | rule | V10 §7 |
| V10-0548 | test | V10 §7.1 T-V10-1 |
| V10-0549 | test | V10 §7.1 T-V10-2 |
| V10-0550 | test | V10 §7.1 T-V10-3 |
| V10-0551 | test | V10 §7.1 T-V10-4 |
| V10-0552 | test | V10 §7.1 T-V10-5 |
| V10-0553 | test | V10 §7.1 T-V10-6 |
| V10-0554 | test | V10 §7.1 T-V10-7 |
| V10-0555 | test | V10 §7.1 T-V10-8 |
| V10-0556 | test | V10 §7.1 T-V10-9 |
| V10-0557 | test | V10 §7.1 T-V10-10 |
| V10-0558 | test | V10 §7.1 T-V10-11 |
| V10-0559 | test | V10 §7.1 T-V10-12 |
| V10-0560 | test | V10 §7.1 T-V10-13 |
| V10-0561 | test | V10 §7.1 T-V10-14 |
| V10-0562 | test | V10 §7.1 T-V10-15 |
| V10-0563 | test | V10 §7.1 T-V10-16 |
| V10-0564 | test | V10 §7.1 T-V10-17 |
| V10-0565 | test | V10 §7.1 T-V10-18 |
| V10-0566 | test | V10 §7.1 T-V10-19 |
| V10-0567 | test | V10 §7.1 T-V10-20 |
| V10-0568 | test | V10 §7.1 T-V10-21 |
| V10-0569 | test | V10 §7.1 T-V10-22 |
| V10-0570 | test | V10 §7.1 T-V10-23 |
| V10-0571 | test | V10 §7.1 T-V10-24 |
| V10-0572 | test | V10 §7.1 T-V10-25 |
| V10-0573 | test | V10 §7.1 T-V10-26 |
| V10-0574 | test | V10 §7.1 T-V10-27 |
| V10-0575 | test | V10 §7.1 T-V10-28 |
| V10-0576 | test | V10 §7.1 T-V10-29 |
| V10-0577 | test | V10 §7.1 T-V10-30 |
| V10-0578 | test | V10 §7.1 T-V10-31 |
| V10-0579 | test | V10 §7.1 T-V10-32 |
| V10-0580 | test | V10 §7.1 T-V10-33 |
| V10-0581 | test | V10 §7.1 T-V10-34 |
| V10-0582 | test | V10 §7.1 T-V10-35 |
| V10-0583 | test | V10 §7.1 T-V10-36 |
| V10-0584 | test | V10 §7.1 T-V10-37 |
| V10-0585 | test | V10 §7.1 T-V10-38 |
| V10-0586 | test | V10 §7.1 T-V10-39 |
| V10-0587 | test | V10 §7.1 T-V10-40 |
| V10-0588 | test | V10 §7.1 T-V10-41 |
| V10-0589 | test | V10 §7.1 T-V10-42 |
| V10-0590 | test | V10 §7.1 T-V10-43 |
| V10-0591 | test | V10 §7.1 T-V10-44 |
| V10-0592 | rule | V10 §7.2 |
| V10-0593 | rule | V10 §7.3 |
| V10-0594 | eval-group | V10 §7.3 |
| V10-0595 | eval-group | V10 §7.3 |
| V10-0596 | eval-group | V10 §7.3 |
| V10-0597 | eval-group | V10 §7.3 |
| V10-0598 | eval-group | V10 §7.3 |
| V10-0599 | eval-group | V10 §7.3 |
| V10-0600 | eval-group | V10 §7.3 |
| V10-0601 | eval-group | V10 §7.3 |
| V10-0602 | eval-group | V10 §7.3 |
| V10-0603 | rule | V10 §7.3 |
| V10-0604 | rule | V10 §8 |
| V10-0605 | build-step | V10 §8 |
| V10-0606 | build-step | V10 §8 |
| V10-0607 | build-step | V10 §8 |
| V10-0608 | build-step | V10 §8 C2 (`DirectBackend`, J121) |
| V10-0609 | build-step | V10 §8 |
| V10-0610 | build-step | V10 §8 |
| V10-0611 | build-step | V10 §8 |
| V10-0612 | rule | V10 §8 |
| V10-0613 | rule | V10 §8 |
| V10-0614 | decision | V10 §9 J-V10.1 |
| V10-0615 | decision | V10 §9 J-V10.2 |
| V10-0616 | decision | V10 §9 J-V10.3 |
| V10-0617 | decision | V10 §9 J-V10.4 (amended by J-V10.114) |
| V10-0618 | decision | V10 §9 J-V10.5 |
| V10-0619 | decision | V10 §9 J-V10.6 |
| V10-0620 | decision | V10 §9 J-V10.7 |
| V10-0621 | decision | V10 §9 J-V10.8 |
| V10-0622 | decision | V10 §9 J-V10.9 |
| V10-0623 | decision | V10 §9 J-V10.10 |
| V10-0624 | decision | V10 §9 J-V10.11 |
| V10-0625 | decision | V10 §9 J-V10.12 |
| V10-0626 | decision | V10 §9 J-V10.13 |
| V10-0627 | decision | V10 §9 J-V10.14 |
| V10-0628 | decision | V10 §9 J-V10.15 |
| V10-0629 | decision | V10 §9 J-V10.16 |
| V10-0630 | decision | V10 §9 J-V10.17 |
| V10-0631 | decision | V10 §9 J-V10.18 |
| V10-0632 | decision | V10 §9 J-V10.19 |
| V10-0633 | decision | V10 §9 J-V10.20 (amended by J-V10.114) |
| V10-0634 | decision | V10 §9 J-V10.21 |
| V10-0635 | decision | V10 §9 J-V10.22 |
| V10-0636 | decision | V10 §9 J-V10.23 |
| V10-0637 | decision | V10 §9 J-V10.24 (amended by J-V10.114) |
| V10-0638 | decision | V10 §9 J-V10.25 |
| V10-0639 | decision | V10 §9 J-V10.26 |
| V10-0640 | decision | V10 §9 J-V10.27 |
| V10-0641 | decision | V10 §9 J-V10.28 (amended by J-V10.111) |
| V10-0642 | decision | V10 §9 J-V10.29 |
| V10-0643 | decision | V10 §9 J-V10.30 |
| V10-0644 | decision | V10 §9 J-V10.31 |
| V10-0645 | decision | V10 §9 J-V10.32 |
| V10-0646 | decision | V10 §9 J-V10.33 |
| V10-0647 | decision | V10 §9 J-V10.34 (superseded by J-V10.80) |
| V10-0648 | decision | V10 §9 J-V10.35 |
| V10-0649 | decision | V10 §9 J-V10.36 |
| V10-0650 | decision | V10 §9 J-V10.37 |
| V10-0651 | decision | V10 §9 J-V10.38 |
| V10-0652 | decision | V10 §9 J-V10.39 |
| V10-0653 | decision | V10 §9 J-V10.40 |
| V10-0654 | decision | V10 §9 J-V10.41 |
| V10-0655 | decision | V10 §9 J-V10.42 |
| V10-0656 | decision | V10 §9 J-V10.43 |
| V10-0657 | decision | V10 §9 J-V10.44 |
| V10-0658 | decision | V10 §9 J-V10.45 |
| V10-0659 | decision | V10 §9 J-V10.46 |
| V10-0660 | decision | V10 §9 J-V10.47 |
| V10-0661 | decision | V10 §9 J-V10.48 |
| V10-0662 | decision | V10 §9 J-V10.49 |
| V10-0663 | decision | V10 §9 J-V10.50 |
| V10-0664 | decision | V10 §9 J-V10.51 |
| V10-0665 | decision | V10 §9 J-V10.52 |
| V10-0666 | decision | V10 §9 J-V10.53 |
| V10-0667 | decision | V10 §9 J-V10.54 |
| V10-0668 | decision | V10 §9 J-V10.55 |
| V10-0669 | decision | V10 §9 J-V10.56 |
| V10-0670 | decision | V10 §9 J-V10.57 (superseded by J-V10.88) |
| V10-0671 | decision | V10 §9 J-V10.58 |
| V10-0672 | decision | V10 §9 J-V10.59 |
| V10-0673 | decision | V10 §9 J-V10.60 |
| V10-0674 | decision | V10 §9 J-V10.61 |
| V10-0675 | decision | V10 §9 J-V10.62 |
| V10-0676 | decision | V10 §9 J-V10.63 |
| V10-0677 | decision | V10 §9 J-V10.64 |
| V10-0678 | decision | V10 §9 J-V10.65 |
| V10-0679 | decision | V10 §9 J-V10.66 |
| V10-0680 | decision | V10 §9 J-V10.67 |
| V10-0681 | decision | V10 §9 J-V10.68 |
| V10-0682 | decision | V10 §9 J-V10.69 (amended by J-V10.114) |
| V10-0683 | decision | V10 §9 J-V10.70 |
| V10-0684 | decision | V10 §9 J-V10.71 |
| V10-0685 | decision | V10 §9 J-V10.72 |
| V10-0686 | decision | V10 §9 J-V10.73 |
| V10-0687 | decision | V10 §9 J-V10.74 |
| V10-0688 | decision | V10 §9 J-V10.75 |
| V10-0689 | decision | V10 §9 J-V10.76 |
| V10-0690 | decision | V10 §9 J-V10.77 |
| V10-0691 | decision | V10 §9 J-V10.78 (amended by J-V10.113) |
| V10-0692 | decision | V10 §9 J-V10.79 |
| V10-0693 | decision | V10 §9 J-V10.80 |
| V10-0694 | decision | V10 §9 J-V10.81 |
| V10-0695 | decision | V10 §9 J-V10.82 |
| V10-0696 | decision | V10 §9 J-V10.83 |
| V10-0697 | decision | V10 §9 J-V10.84 |
| V10-0698 | decision | V10 §9 J-V10.85 |
| V10-0699 | decision | V10 §9 J-V10.86 |
| V10-0700 | decision | V10 §9 J-V10.87 |
| V10-0701 | decision | V10 §9 J-V10.88 |
| V10-0702 | decision | V10 §9 J-V10.89 |
| V10-0703 | decision | V10 §9 J-V10.90 |
| V10-0704 | decision | V10 §9 J-V10.91 |
| V10-0705 | decision | V10 §9 J-V10.92 |
| V10-0706 | decision | V10 §9 J-V10.93 |
| V10-0707 | decision | V10 §9 J-V10.94 |
| V10-0708 | decision | V10 §9 J-V10.95 |
| V10-0709 | decision | V10 §9 J-V10.96 |
| V10-0710 | decision | V10 §9 J-V10.97 |
| V10-0711 | decision | V10 §9 J-V10.98 |
| V10-0712 | decision | V10 §9 J-V10.99 |
| V10-0713 | decision | V10 §9 J-V10.100 |
| V10-0714 | decision | V10 §9 J-V10.101 (amended by J-V10.106) |
| V10-0715 | decision | V10 §9 J-V10.102 (amended by J-V10.119) |
| V10-0716 | decision | V10 §9 J-V10.103 |
| V10-0717 | decision | V10 §9 J-V10.104 |
| V10-0718 | decision | V10 §9 J-V10.105 |
| V10-0719 | decision | V10 §9 J-V10.106 (amended by J-V10.110) |
| V10-0720 | decision | V10 §9 J-V10.107 |
| V10-0721 | decision | V10 §9 J-V10.108 |
| V10-0722 | decision | V10 §9 J-V10.109 |
| V10-0723 | decision | V10 §9 J-V10.110 |
| V10-0724 | bcr | V10 §10.1 BCR-V10-1 → item 468 (pointer; the base text is the applied item) |
| V10-0725 | bcr | V10 §10.1 BCR-V10-2 → item 311 (pointer; the base text is the applied item) |
| V10-0726 | bcr | V10 §10.1 BCR-V10-3 → item 270 (pointer; the base text is the applied item) |
| V10-0727 | bcr | V10 §10.1 BCR-V10-4 → item 297 (pointer; the base text is the applied item) |
| V10-0728 | bcr | V10 §10.1 BCR-V10-5 → item 469 (pointer; the base text is the applied item) |
| V10-0729 | bcr | V10 §10.1 BCR-V10-6 → item 470 (pointer; the base text is the applied item) |
| V10-0730 | bcr | V10 §10.1 BCR-V10-7 → item 473 (pointer; the base text is the applied item) |
| V10-0731 | bcr | V10 §10.1 BCR-V10-8 → item 518 (pointer; the base text is the applied item) |
| V10-0732 | bcr | V10 §10.1 BCR-V10-9 → item 538 (pointer; the base text is the applied item) |
| V10-0733 | bcr | V10 §10.1 BCR-V10-10 → item 531 (pointer; the base text is the applied item) |
| V10-0734 | bcr | V10 §10.1 BCR-V10-11 → item 487 (pointer; the base text is the applied item) |
| V10-0735 | bcr | V10 §10.1 BCR-V10-12 → item 348 (pointer; the base text is the applied item) |
| V10-0736 | bcr | V10 §10.1 BCR-V10-13 → item 471 (pointer; the base text is the applied item) |
| V10-0737 | bcr | V10 §10.1 BCR-V10-14 → item 519 (pointer; the base text is the applied item) |
| V10-0738 | bcr | V10 §10.1 BCR-V10-15 → item 271 (pointer; the base text is the applied item) |
| V10-0739 | bcr | V10 §10.1 BCR-V10-16 → item 365 (pointer; the base text is the applied item) |
| V10-0740 | bcr | V10 §10.1 BCR-V10-17 → item 366 (pointer; the base text is the applied item) |
| V10-0741 | bcr | V10 §10.1 BCR-V10-18 → item 367 (pointer; the base text is the applied item) |
| V10-0742 | bcr | V10 §10.1 BCR-V10-19 → item 481 (pointer; the base text is the applied item) |
| V10-0743 | bcr | V10 §10.1 BCR-V10-20 → item 368 (pointer; the base text is the applied item) |
| V10-0744 | bcr | V10 §10.1 BCR-V10-21 → item 290 (6) (pointer; the base text is the applied item) |
| V10-0745 | bcr | V10 §10.1 BCR-V10-22 → item 572 (pointer; the base text is the applied item) |
| V10-0746 | bcr | V10 §10.1 BCR-V10-23 → item 571 (pointer; the base text is the applied item) |
| V10-0747 | rule | V10 §10 |
| V10-0748 | cvr | V10 §10.2 CVR-V10-1, met at V04 §4.5 |
| V10-0749 | cvr | V10 §10.2 CVR-V10-2, met at V03 §4.6 |
| V10-0750 | cvr | V10 §10.2 CVR-V10-3, met at V08 §3.1, V08 §4.4 (4) |
| V10-0751 | cvr | V10 §10.2 CVR-V10-4, met at V09 §6.2, V09 §4.11, V09 §2.10, V09 §4.9 |
| V10-0752 | cvr | V10 §10.2 CVR-V10-5, met at V06 §3.15, V06 §4.5 |
| V10-0753 | cvr | V10 §10.2 CVR-V10-6, met at V01 §4.5 (V10-XAGREE-2) |
| V10-0754 | cvr | V10 §10.2 CVR-V10-7, met at §7.1, V09 §2.10, V09 §4.11, V09 §4.20 |
| V10-0755 | cvr | V10 §10.2 CVR-V10-8, met at V02 §4.5, V02 §4.6 |
| V10-0756 | cvr | V10 §10.2 CVR-V10-9, met at V03 §4.6, V03 §2.3 |
| V10-0757 | cvr | V10 §10.2 CVR-V10-10, met at V04 §4.5 |
| V10-0758 | cvr | V10 §10.2 CVR-V10-11, met at V06 §4.5 |
| V10-0759 | cvr | V10 §10.2 CVR-V10-12, met at V11 §3.6, V11 §4.5 |
| V10-0760 | cvr | V10 §10.2 CVR-V10-13, met at V01 §3.17.1 (2) (V01's `stepped` fabric, `terrace: 'on'`); V10 §3.15 cites it |
| V10-0761 | cvr | V10 §10.2 CVR-V10-14, met at V05 §4.5, V07 §4.5, V08 §4.6 |
| V10-0762 | cvr | V10 §10.2 CVR-V10-15, met at V09 §2.10, V09 §4.11, V09 §2.7 |
| V10-0763 | cvr | V10 §10.2 CVR-V10-16, met at V11 §4.2, V09 §2.6 |
| V10-0764 | cvr | V10 §10.2 CVR-V10-17, met at V09 §4.9, V09 §4.20.2 (5) |
| V10-0765 | cvr | V10 §10.2 CVR-V10-18, met at V09 §4.5's T11 and T9 rows |
| V10-0766 | cvr | V10 §10.2 CVR-V10-19, met at V09 §4.11, V09 §2.10, V09 §4.9 |
| V10-0767 | cvr | V10 §10.2 CVR-V10-20, met at V09 §2.9, V09 §4.5, V09 §4.9, V09 §4.11 |
| V10-0768 | merged-text | V10 §10.3 |
| V10-0769 | merged-text | V10 §10.3 |
| V10-0770 | merged-text | V10 §10.3 |
| V10-0771 | merged-text | V10 §10.3 |
| V10-0772 | merged-text | V10 §10.3 |
| V10-0773 | merged-text | V10 §10.3 |
| V10-0774 | owner-question | V10 §11 Q1 (answered, J121/J122) |
| V10-0775 | owner-question | V10 §11 Q2 (answered, J121/J122) |
| V10-0776 | owner-question | V10 §11 Q3 (answered, J121/J122) |
| V10-0777 | owner-question | V10 §11 Q4 (answered, J121/J122) |
| V10-0778 | owner-question | V10 §11 Q5 (answered, J121/J122) |
| V10-0779 | evidence | V10 §12 CONFIRMED paragraph (standing evidence; the per-round records left to the validation records) |
| V10-0780 | evidence | V10 §12 PLAUSIBLE list (items 111 and 113 added) |
| V10-0781 | fix-list | V10 §13 (no open item; the hand-offs table to other units) |
| V10-0782 | integration-note | folded (ID-WX): IN-V10-1 at V10 §3.16 *The dry run's bends*; IN-V10-2 at V10 §2.13 (`MapBrief.raised[].reason`); IN-V10-3 at V10 §2.12 and V10 §3.9's owed V02 row; IN-V10-4 at V10 §10.2; IN-V10-5 at V10 §4.1's terrace row; listed under *Integration notes* |
| V10-0783 | note | folded: SR6-01's view model at V10 §2.6 (`ProposalView.variations[].bends`, `lines[].actions`, `TurnView.refused`), V10 §3.5 step 4 and J-V10.110; SR6-05 fixed in the body (V10 §2.6, V10 §3.5, V10 §3.16, J-V10.107, J-V10.119) |
| V10-0784 | term | V10 §9 J-V10.86 (the internal and user-facing names) |
| V10-0785 | term | V10 §2.6 (`createClerk(mount)` returning `ClerkHandle`; "harness" retired, E-33) |
| V10-0786 | term | V10 §2.3, V10 §3.1, V10 §3.2 (defined there) |
| V10-0787 | term | V10 §2.4, V10 §3.5, V10 §3.11, V10 §3.19 (defined there) |
| V10-0788 | term | V10 §2.5, V10 §3.11 (defined there) |
| V10-0789 | term | V10 §2.13, V10 §3.3 (defined there) |
| V10-0790 | term | V10 §2.3 (defined there) |
| V10-0791 | term | V10 §2.13 (defined there) |
| V10-0792 | term | V10 §3.13 (defined there) |
| V10-0793 | term | V10 §3.13 step 4 (defined there) |
| V10-0794 | term | V10 §2.9, V10 §3.16 (defined there) |
| V10-0795 | term | V10 §3.10 (defined there) |
| V10-0796 | term | V10 §2.13, V10 §3.9 (defined there) |
| V10-0797 | term | V10 §3.9 (defined there) |
| V10-0798 | term | V10 §3.9 (defined there) |
| V10-0799 | term | V10 §3.9 (defined there) |
| V10-0800 | term | V10 §3.17 (configurations A, B, C; SettlementForge's is C, J121, J122) |
| V10-0801 | term | V10 §3.18 (defined there) |
| V10-0802 | term | V10 §2.10 (defined there) |
| V10-0803 | term | V10 §7.2, V10 §7.3 (defined there) |
| V10-0804 | term | V10 §2.7, V10 §2.8, V10 §3.15 (defined there) |
| V10-0805 | term | V10 §4.4 (§13.4's pre-decided fallback) |
