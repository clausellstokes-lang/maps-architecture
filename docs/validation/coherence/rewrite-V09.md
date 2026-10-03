# Rewrite — design volume V09 (the application)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V09; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V09`; started 2026-10-03 in the cloud continuation — no V09 rewrite file existed on disk)
- P1 inputs gathered (canon unit V09: 28 conflicts, 7 elegance, 5 id rulings, 8 wiring gaps, 55 f items, 3 g parts (111, 112, 113), 26 hand-offs in, 95 open findings, edges 94 UNDEFINED + 67 UNTESTED + 25 owned combinations; inventory 1 111 ids): done
- P2 new text §0–§2 (parts 00–05): done
- P3 new text §3 with the new §3.16 edges (parts 06–08): done
- P4 new text §4 (parts 09–16b, with the new §4.21 for g items 111 and 113): done
- P5 new text §5–§8 (parts 17–21, with the new §7.6 for g item 112 (b)): done
- P6 new text §9–§13 and the Integration notes (parts 22–23): done
- P7 assemble, verify ids, references, terms, sizes: done
- P8 report, result file, LANDED: done

**Outputs.** `docs/validation/coherence/new/volumes/V09-application.md` (the complete new text: the same title line, the
same section structure §0–§13 and *Integration notes*, its one marker line kept, every other banner and ledger dropped);
this report; `docs/validation/coherence/results/coherence_rewrite-V09.json`. Working parts:
`docs/validation/coherence/work/rewrite-V09/parts/` (assembled in file-name order). Source `docs/volumes/V09-application.md`
(md5 14f78dd6c587fcb50f8351b004426570, 4 919 lines), unchanged.

## 1. Sizes

Counted as the canon counts (whitespace-separated tokens): **111 610 → 90 664 words (−18.8 %)**; bytes 690 061 → 552 209
(673.9 → 539.3 KB); lines 4 919 → 4 121.

| part of the volume | before | after | source of the change |
|---|---|---|---|
| title, banners, citation note | 1 224 | 220 | narration (banner lines, pass history) |
| §0 – §2 | 17 440 | 18 152 | restatements to references (V10's and V11's facts, base rows); J121/J122's readings (§0, §1.3, §2.2, §2.10); new rows for items 111–113, the colour-vision key, the cell inspector, `appVersion`'s reader |
| §3 without §3.16 | 8 190 | 8 409 | narration ids out; the sky un-displacement (V05-WGAP-1), the newer-application route (W-FLD-11) |
| §3.16 edges and combinations (new) | — | 3 548 | new design: principle (11)'s 161 edges, EI-V09-EDGE-1 and the 25 owned combinations |
| §4 without §4.21 | 31 360 | 31 297 | E-04 (the binding table's pairs now §7.1's; §4.3 keeps screens and gestures), IN notes folded, V02's bend id set, article rule |
| §4.21 items 111 and 113 (new) | — | 986 | new design: the oasis, the History chip, a past's lines |
| §5 – §6 | 8 898 | 9 753 | the second cues and the colour-vision selector (item 112 (a)), one channel per link cue, the lost void |
| §7 without §7.6 | 9 664 | 10 361 | eight new bars (T-V9-71 – T-V9-78), the K-lists cited from V12 §3.14, J122's participants |
| §7.6 the game-master trial (new) | — | 287 | new design: item 112 (b) |
| §8 build plan | 2 025 | 1 624 | the itemised pricing replaced by §16's line (item 530); M6-U, M6-sky named |
| §9 decisions | 9 012 | 4 395 | E-24's one mark (no former text kept), critique and seam ids out, reasons kept; nine new rows |
| §10 base change requests | 10 074 | 590 | 36 quoted request blocks → one pointer table (ID-BCR) |
| §11 – §13, *Integration notes*, reconciliation and finalization ledgers | 13 959 | 1 042 | narration (round ledgers, receipts, "Met"/"Was" histories); §11 answered (J121/J122); §13 a closed hand-off table |

Share of the ≈ 27 900 words removed, by source: **narration ≈ 66 %** (the ledgers, the old §10.2 and §12's round
histories, banners, critique and seam ids), **restatement ≈ 30 %** (§10's quotations, §4.3's binding pairs now §7.1's, the
itemised pricing, V10's and V11's facts), **duplicated mechanisms ≈ 2 %** (E-04, E-07, E-32, E-33), **verbose prose ≈ 2 %**.
Nothing was removed from content: no rule, case, value, bar, record field, lifecycle row, test, owner rule or reasoned
decision.

**Above the band (66 966 – 83 708), and why.** The new design the canon routed here is ≈ 7 600 words: §3.16 (3 548), §4.21
(986), §7.6 (287), the eight new bars (≈ 900), the nine new decisions (≈ 550), and the new wiring, catalogue and
second-cue rows (≈ 1 300). Without it the volume is ≈ 83 000 words, inside the band. The rest is irreducible content: the
message catalogue (§4.9, ≈ 7 200 words of rows every screen renders), the data model (§2, ≈ 10 000), the tool table and
item 110's screens (≈ 12 000), the tests (≈ 10 400) and §1b's wiring (≈ 4 000, principle (7)). **Marked for the
adjudicator** (SIZE-1).

## 2. What the canon routed here, and where it is closed

* **REFERENCE (62).** Each restated fact now cites its home (mapping table: "cites …"). V10's harness, drawer and why
  facts cite V10 §1b.1, §2.2, §2.6, §3.11 and §7.1; V11's siting facts V11 §1b and §2.4; the base's §2.9, §6.4, §7.4,
  §7.6, §9.5, §8 and §14 facts their sections; V04's and V08's their sections.
* **BCR pointers (36).** V09 §10 is one pointer table, BCR-V9-1 … BCR-V9-36 → items 514; 458 and 515; 277; —
  (superseded by J-V9.36); 460; — (superseded by J-V9.33); 411; 516; 517; 461; 462; 463; 360; 453; 454; 348; 494; 530;
  269; 278; 361; 372; 464; 490; 413; 362; 465; 466; 363; 246; 447; 455; 244 and 364; 467; 570; 583. No `BCR-V9-n` id
  appears outside §10.
* **Terms.** G-cite: every self-citation `V09 §x.y`, every other volume `Vnn §x.y` (0 hits of `V9 §`, `V1-`, `V2 §`,
  `V4 §`, `V5 §`, `V6 §`). G-firstmap 0. G-DR: DR34, DR35 only. G-M6U: T-V9-33 – T-V9-38 and AP6 at M6-U; AP7 at M6-sky
  (with V05's P4). G-newrandom: "New random" in prose; "Try again" only as the catalogue label (`button.tryAgain`, the
  drawer's retry). G-suppress: suppression in prose (T-V9-53 retitled "a suppression holds"; the import rows by key).
  G-rederive: Re-derive; `button.rederive` "Re-derive from {stage}". G-bend: 0 `refuse.raised|aqueduct|retaining|stack`.
  G-unexcavated: the view key `showUnexcavated`. G-clerkhandle: `ClerkHandle` only. G-offline: `refuse.clerk.offline`
  only. G-floorvault: none; V03 §3.7.4's wet-ground rule cited.
* **Conflicts (28)** — section 3.
* **File f items** cited as base text, never restated: 244, 245, 246, 260, 269, 270, 277, 278, 348, 360, 361, 362, 363,
  364, 366, 368, 380, 390, 399, 402, 410, 411, 413, 447, 453, 454, 455, 458, 460, 461, 462, 463, 464, 465, 466, 467, 468,
  469, 470, 472, 473, 490, 494, 507, 514, 515, 516, 517, 530, 568, 570, 571, 572, 582, 583 (all 55 of the canon's list).
* **File g, written at build depth.** Item 111: T2's Oasis chip on `drawWater`'s lake points form with `spring: true`,
  its binding screen, history template, why-card water bar, Delete and its effects, `hint.oasis`, `disabled.skyWater`,
  `refuse.dossierOwned` for a dossier oasis (V09 §4.21.1, V09 §4.3, V09 §4.9, V09 §4.10; T-V9-71; J-V9.128). Item 112: the
  colour-vision selector writing the per-viewer view key `cvdVariant` in Settings and the Dress panel, the second cue per
  thematic view, one channel per link cue (V09 §5.4, V09 §5.12; T-V9-77; J-V9.127, J-V9.130); the game-master trial —
  recruitment through SettlementForge's community, the sessions, the report, `GmTrialRecord` holding V12's `TrialFinding`s
  (V09 §7.6; T-V9-78; J-V9.131). Item 113: the History chip writing `adjust('blueprint.history', …)` as a Re-derive,
  absent on a neighbourhood document, locked in host mode (V09 §4.21.2; J-V9.129); a past's lines and `chip.symbolic`
  (V09 §4.21.3); the lost void's panel line `info.under.lost`, its faded "once known" drawing and legend row (V09 §4.17.3;
  J-V9.132; V09-WGAP-1); T-V9-72.
* **Wiring gaps (8).** W-IF-04 — V09 §4.14's cell inspector reads `register.json` and `dist/evidence.json` (V12 §2.6), both
  ends in V09 §1b. W-EDIT-01 — closed by E-04 (§7.1's one binding table; V09 §4.3 cites it). W-FLD-11 —
  `LocalDocRecord.appVersion` read at open: a newer application's record opens read-only (V09 §2.11, V09 §3.1 (3) (c),
  `info.newerApp`; J-V9.126). V05-WGAP-1 — V09 §3.4's points on the Sky layer un-displaced by elevation × `offsetPerMetre`
  (J-V9.134; T-V9-75). V05-WGAP-2a — V05's island and access bend family rows in V09 §4.9, texts V05 §4.2's.
  V06-WGAP-1a — `bend.time.hoodAlone` (V09 §4.9; CANON-C02). V09-WGAP-1 — above. V09-WGAP-2 — IN-V09-4, -5, -6, -7, -11
  folded at their homes (V09 §2.5's `shrineInset`, V09 §4.20.5's tier controls, V09 §4.14's inspector and packs, V09
  §5.10's deck scenes); the notes dropped.
* **Edges (principle (11)).** V09 §3.16: rules (a) – (d) for degenerate geometry, rungs, toggles and presets, and the
  lifecycle; table (e) for every other limit of the 61 mechanisms the edge list names (all 94 UNDEFINED and 67 UNTESTED
  rows given an outcome, a rung and a test, T-V9-74 running each); (f) EI-V09-EDGE-1 (`bend.raised.hoist`, V09 §4.20.2 (6),
  T-V9-52); (g) the 25 owned combinations, T-V9-76.
* **Hand-offs in (26)** — closed in the text, listed in V09 §13 with their homes. **Hand-offs out** (XV-V9-1 … -31) — V09
  §13 lists each destination; all are closed in the destinations' texts (V02 – V07 as landed in this pass, V08 and V10 as
  their current texts state them) except XV-V9-1 and XV-V9-2, routed to V11 §4.2 (cross-part note).
* **Owner questions (3)** — V09 §11 answered: Q1 follows SettlementForge's staging (J121), Q2 J122, Q3 follows
  SettlementForge (J121).
* **Fix list.** V09 §13 holds no open item.

## 3. Conflicts resolved (28)

| conflict | ruling applied | where |
|---|---|---|
| DIC-06 | ID-TOOL: a tool with its word at first use (T8 `fill`); bars always numbered | throughout; V09 §4.2, V09 §4.5 |
| DIC-07 | ID-LAYER: the commitment layers by word (L0 INTENT … L4 FINISH) | V09 §2.3's `ToolLayer` comment, V09 §4.2, V09 §7.2 |
| DXC-04 | E-04: one binding table at §7.1; V09 §4.3 keeps screens and gestures | V09 §4.3, T-V9-12 |
| SCOPE-C07 | SettlementForge's assistant drives the tool API in its module; the built-in clerk where configured (J121, J122) | V09 §0, V09 §1.3, V09 §2.2's `clerkMode`, V09 §4.11 |
| SCOPE-C15 | PLAT the codename; the public name follows SettlementForge | V09 §11 Q3 |
| V01-XCONF-2 | the VTT rule for raised parts and closures as §11.1 (item 447) states it | V09 §5.10 |
| V06-AGREE-1 | `info.remove.holds` with its deck-plot variant | V09 §4.9, V09 §4.20.3 |
| V08-XCONF-6 | the frame's language is the host's; English the catalogue's source language | V09 §2.9 *Locales*, V09 §5.12 |
| V09-ICONF-1 | "The five classes of state" | V09 §2.1 |
| V09-ICONF-2 | one home tool per (event kind, target class or path) | V09 §4.3, T-V9-12 |
| V09-ICONF-3 | the ten keys are bends, stated once; leftover text deleted | V09 §4.9, V09 §4.20.5, T-V9-13 |
| V09-ICONF-4 | one channel per link cue | V09 §5.4 (J-V9.127), cited from V09 §4.15 |
| V09-ICONF-5 | J-V9.40 amended by J-V9.102 | V09 §9 |
| V09-XAGREE-1 | V11 §4.2 states the tables' union; V09 §2.6 maps each screen to a cell | V09 §2.6; routed to V11 (cross-part note) |
| V09-XAGREE-2 | V03 §3.7.4's crypt-edit dry runs; `bend.crypt.largest` "stops at {share} of the cathedral's" | V09 §4.9, V09 §4.17.5 (e) |
| V09-XCONF-1 | item 277's `workingLayer` text: ground, an island's `PlatKey`, or the underground (band = `depthBand`) | V09 §10 |
| V09-XAGREE-3 | V02's 27 bend ids are the one set; V09's unproduced keys retired | V09 §4.9, V09 §4.20.5, T-V9-13, T-V9-59 |
| V10-XAGREE-3 | the size words' one home: T1's quantile rule | V09 §4.5's T1 row |
| V10-XAGREE-4 | V03 §3.7.4's wet-ground rule; "floor vaults" dropped | V09 §4.17.5 |
| V09-J121-1 | the assistant reads SettlementForge's AI setup as an input | V09 §0 |
| V09-J121-2 | hosting and accounts follow SettlementForge (J121); simultaneous editing J122 | V09 §1.3 |
| V09-J121-3 | which locales ship follows SettlementForge; the locale file the carrier | V09 §2.9, V09 §5.12 |
| V09-J121-4 | the key card only where the configuration asks; SettlementForge's assistant through the host path | V09 §2.10, V09 §4.11 |
| V09-J122-1 | five SettlementForge users per round, credit and early access, no payments | V09 §7.3 (2) |
| V09-J121-5 | Q1–Q3 answered | V09 §11 |
| CANON-C02 | a standalone neighbourhood has no clock; `bend.time.hoodAlone` | V09 §4.9, V09 §4.21.2 |
| CANON-C03 | no question waits on the owner | V09 §11 |
| CANON-C04 | no fix list deferred | V09 §13 |

## 4. Elegance rulings applied, with their equivalence lists

**E-04 — one event → tool binding table at §7.1** (home: determinism §7.1). V09 §4.3 is retitled "The tool binding's
screens" and lists, per §7.1 tool row, the modes and gestures and the other places a user reaches the pair.
[x] every `EditEvent` kind has a row (§7.1's; T-V9-12 walks it). [x] history kinds marked with their producer (V09 §4.3's
producer row). [x] V09's per-target homes kept (split and merge at T5 for districts, T9 for ways and plots; delete at T10,
T9 for access points and galleries; instance at T6, T8, T9). [x] T-V9-12 checks completeness over the pairs.

**E-07 — one dry-run outcome table at §7.1.** V09 §3.3 cites it for which causes refuse and which bend. [x] each case's
alternative its own row (V09 §4.9's `bend.*` rows). [x] only a dossier fact or a lock refuses. [x] item 582's three bends
(`bend.place.noSite`, `bend.place.overBudget`, and the occupied join or split). [x] `bend.*` and `refuse.*` keys one to
one with §7.1's rows.

**E-16 — one name per mechanism (`tint`, `vignette` programs; `wash`, `edgeFade` post operations; `glow`).** V09 names no
post operation and no light role; its "vignette" is V01's `closeup.vignette` framing field, untouched by the ruling.
[x] programs per mark, post operations per tile (not restated). [x] the painterly spotlight is the `vignette` program
(not restated). [x] the two roles' uses (not named in V09).

**E-17 — one admission function at §9.2.** V09 §2.7's band-less read rule and V09 §4.8's View as cite §9.2's admission.
[x] each reader's band kept (the view's band; the city band when band-less). [x] `admitAs` (J-V9.86) cites it.

**E-24 — one mark on a superseded or amended decision.** V09 §9: J-V9.2, .25, .67, .76, .117 read "superseded by …"; J-V9.10,
.24, .31, .35, .40, .55 read "amended by …". [x] no row dropped. [x] the governing row keeps the reason.

**E-32 — one row `refuse.clerk.offline`.** `error.clerkOffline` retired (V09 §3.14, V09 §4.9; T-V9-15 checks no such row).
[x] same condition, same user outcome.

**E-33 — `ClerkHandle` everywhere.** `ClerkHarness` gone (V09 §2.10). [x] `createClerk(mount)` returns `ClerkHandle`.

**Id rulings.** ID-BCR (V09 §10 the only home of BCR ids); ID-TOOL; ID-LAYER; ID-WX (no volume-local id cited bare: no
V9C-, SR-, SS-, XV- or IN- id outside V09 §13's hand-off table; IN notes folded); ID-DUPDEF (each type defined once:
`ClerkHandle`, `WhyCardModel`, `MsgRow`, `GmTrialRecord`, `HistoryRow`).

## 5. Renumberings and new ids

* **New sections:** V09 §3.16 (edges), V09 §4.21 (items 111 and 113 in the editor), V09 §7.6 (the game-master trial).
  V09 §4.3 retitled; V09 §3.7 "New random on a scope"; V09 §2.1 "The five classes of state".
* **New decisions:** J-V9.126 (a newer application's record read-only), .127 (one channel per link cue), .128 (the oasis
  form), .129 (the History chip), .130 (`cvdVariant`), .131 (the trial), .132 (the lost void), .133 (the draft's own
  degenerate rules), .134 (points on a lifted island).
* **New tests:** T-V9-71 (oasis), T-V9-72 (a past and a lost void), T-V9-73 (boot and bundle), T-V9-74 (edges), T-V9-75
  (lifted island), T-V9-76 (combinations), T-V9-77 (colour vision), T-V9-78 (the trial).
* **Catalogue keys added:** `info.newerApp`, `info.reroll.nothing`, `info.restore.full`, `empty.list`, `hint.oasis`,
  `disabled.skyWater`, `bend.time.hoodAlone`, V05's island and access bend family, V02's 27 bend ids, `button.rederive`.
  **Retired:** `error.clerkOffline` (E-32), `button.rebuildFrom` (→ `button.rederive`), `bend.tiers.flights`,
  `bend.stack.internalSolid`, `.removeStair`, `.addWing`, `.deck`, `.notStepped`, `button.giveTiers` and the `giveTiers`
  event form (V09-XAGREE-3).
* **Fixture path:** `plat/test/fixtures/known-city-2/` → `plat/tests/fixtures/known-city/K2/` (V12 §3.14; X-V12-8).

## 6. Checks run (2026-10-03)

* Ids: J-V9.1 – J-V9.134 each defined once, none missing, every cited one defined; T-V9-1 – T-V9-78 each defined once,
  every cited one defined.
* References: every `V09 §x.y` resolves to a heading of the new text; every `Vnn §x.y` into V01 – V07 resolves against
  their landed new texts, into V08 and V10 – V12 against their current texts (0 unresolved).
* Terms: section 2's sweep, 0 retired forms in prose. Articles: 0 "a {" or "an {" before a slot in an `en` text.
* f items: all 55 cited.
* `docs/validation/bench/doc_checks.py --doc …/new/volumes/V09-application.md` — **provisional, not authoritative** (the
  reference corpus is incomplete here: captures, research/patreon, research/devlogs, research/ftg-docs, research/external
  absent): C1 0, C2 1 (the same `#ffffff` hit as the source), C3 209 (source 325), C4 0, S1 0, S2 447 unreviewed (source
  558; base pointers the script resolves against the document itself).

## 7. CROSS-PART NOTES

* **V11 (XV-V9-1, XV-V9-2; V09-XAGREE-1):** V11 §4.2 should state the `cls:` key form (a roster class no dossier record
  binds) beside `uid:`, `cat:` and `use:`, the kind keys admitting `profile`, `familyWeights`, `quarter`, `place` and
  `split`, `use:` admitting `place`, `pin`, `split` and `specialisation`, `familyWeights` values on V09 §2.6's ladder (0,
  0.5, 1, 2, 3), and `siting.linkEdits`' `avoid?: Id[]` cell with the three meanings (`bindTo` keeps, `avoid` cuts one
  supplier, `cut` alone stops the good). V09 §2.6 is written against that union.
* **V12 (X-V12-8, item 112 (b)):** V09 §7.2 cites V12 §3.14's K1 and K2 lists and folder; V09 §7.6's `GmTrialRecord`
  holds `findings: TrialFinding[]` (V12 §2.14) with `trial`, `build`, `from`, `to`, participants with sessions (`tools`,
  `cvdVariant`, the form's hash); its report `plat/goldens/ux/release/gm-trial.md` beside the record.
* **V10:** V09 §4.9's `bend.time.hoodAlone` is the canvas's row of CANON-C02's bend; V10's bend category words the same
  line. The `refuse.clerk.offline` row's text stays V10 §3.16's (E-32). The size words' quantiles are V09 §4.5's T1 rule
  (V10-XAGREE-3).
* **V05:** V09 §3.4 un-displaces lifted-island points (J-V9.134) by V05 §4.2's elevation × `offsetPerMetre`; V09 §4.9 carries
  V05's island and access bend family, texts V05's.
* **V06:** the History chip writes `adjust('blueprint.history', …)` (V09 §4.21.2); a neighbourhood document has no chip.
* **V04:** V09 §4.17.3 draws the lost void with `info.under.lost` and the "once known" label at every key `knownTo` admits.
* **base (determinism §7.1):** V09 §3.16 (a)'s draft rules (J-V9.133) run before the authoring boundary; nothing in §7.1
  changes.

## 8. Marked for the adjudicator

* **SIZE-1** — above the band by ≈ 7 000 words; the new design the canon routed here is ≈ 7 600 (section 1).
* **EDGE-1** — V09 §3.16's outcomes for the previously undefined limits are this editor's rulings at the application's
  own level (J-V9.133); each cites the owner's rule where the limit is another unit's.

## 9. CONFIRMED versus PLAUSIBLE (this rewrite)

**CONFIRMED** (executed): the id, reference, term, article and f-item sweeps of section 6 over the assembled file; the
identifier and quotation sweeps behind the mapping table (every backticked identifier and quoted catalogue text of the
inventory's home facts found in the new text; the 54 absent ones are each a retired key or event form (section 5), a
text rephrased by the article rule or a retired term, a rejected alternative or former name dropped from a decision, or a
status mark).
**PLAUSIBLE**: that V11's editor writes XV-V9-1 and XV-V9-2 as section 7 states; that V12's landed §2.14 keeps
`TrialFinding` as read in its working parts.

## 10. MAPPING TABLE — every inventory id of V09 (1 111) → where it now lives

| inventory id | where it now lives |
|---|---|
| V09-0001 | V09 head (the conventions paragraph) |
| V09-0002 | V09 §0 |
| V09-0003 | V09 §0 |
| V09-0004 | V09 §0 |
| V09-0005 | V09 §0 |
| V09-0006 | V09 §0 |
| V09-0007 | V09 §0 |
| V09-0008 | V09 §0 |
| V09-0009 | V09 §0 |
| V09-0010 | V09 §0 |
| V09-0011 | V09 §1.1 |
| V09-0012 | V09 §1.1 |
| V09-0013 | V09 §1.1 |
| V09-0014 | V09 §1.1 |
| V09-0015 | V09 §1.1 |
| V09-0016 | V09 §1.1 |
| V09-0017 | V09 §1.2 |
| V09-0018 | V09 §1.2 |
| V09-0019 | V09 §1.2 |
| V09-0020 | V09 §1.3 |
| V09-0021 | V09 §1.3 |
| V09-0022 | V09 §1.3 |
| V09-0023 | V09 §1.3 |
| V09-0024 | V09 §1b |
| V09-0025 | V09 §1b |
| V09-0026 | V09 §1b |
| V09-0027 | V09 §1b |
| V09-0028 | V09 §1b |
| V09-0029 | V09 §1b |
| V09-0030 | V09 §1b |
| V09-0031 | V09 §1b |
| V09-0032 | V09 §1b |
| V09-0033 | V09 §1b |
| V09-0034 | V09 §1b |
| V09-0035 | V09 §1b |
| V09-0036 | V09 §1b |
| V09-0037 | V09 §1b |
| V09-0038 | V09 §1b |
| V09-0039 | V09 §1b |
| V09-0040 | V09 §1b |
| V09-0041 | V09 §1b |
| V09-0042 | V09 §1b |
| V09-0043 | V09 §1b |
| V09-0044 | V09 §1b |
| V09-0045 | V09 §1b |
| V09-0046 | V09 §1b |
| V09-0047 | V09 §1b |
| V09-0048 | V09 §1b |
| V09-0049 | V09 §1b |
| V09-0050 | V09 §1b |
| V09-0051 | V09 §1b |
| V09-0052 | V09 §1b |
| V09-0053 | V09 §1b |
| V09-0054 | V09 §1b |
| V09-0055 | V09 §1b |
| V09-0056 | V09 §1b |
| V09-0057 | V09 §1b |
| V09-0058 | V09 §1b |
| V09-0059 | V09 §1b |
| V09-0060 | V09 §1b |
| V09-0061 | V09 §1b |
| V09-0062 | V09 §1b |
| V09-0063 | V09 §1b |
| V09-0064 | V09 §1b |
| V09-0065 | V09 §1b |
| V09-0066 | V09 §1b |
| V09-0067 | V09 §1b |
| V09-0068 | V09 §1b |
| V09-0069 | V09 §1b |
| V09-0070 | V09 §1b |
| V09-0071 | V09 §1b |
| V09-0072 | V09 §1b |
| V09-0073 | V09 §1b |
| V09-0074 | V09 §1b |
| V09-0075 | V09 §1b |
| V09-0076 | V09 §1b |
| V09-0077 | V09 §1b |
| V09-0078 | V09 §1b |
| V09-0079 | V09 §1b |
| V09-0080 | V09 §1b |
| V09-0081 | V09 §1b |
| V09-0082 | V09 §1b |
| V09-0083 | V09 §1b |
| V09-0084 | V09 §1b |
| V09-0085 | V09 §1b |
| V09-0086 | V09 §1b |
| V09-0087 | V09 §1b |
| V09-0088 | V09 §1b |
| V09-0089 | V09 §1b |
| V09-0090 | V09 §1b |
| V09-0091 | V09 §1b |
| V09-0092 | V09 §1b |
| V09-0093 | V09 §1b |
| V09-0094 | V09 §1b |
| V09-0095 | V09 §1b |
| V09-0096 | V09 §1b |
| V09-0097 | V09 §1b |
| V09-0098 | V09 §1b |
| V09-0099 | V09 §1b |
| V09-0100 | V09 §1b |
| V09-0101 | V09 §1b |
| V09-0102 | V09 §1b |
| V09-0103 | V09 §1b |
| V09-0104 | V09 §1b |
| V09-0105 | V09 §1b |
| V09-0106 | V09 §1b |
| V09-0107 | V09 §1b |
| V09-0108 | V09 §1b |
| V09-0109 | V09 §1b |
| V09-0110 | V09 §1b |
| V09-0111 | V09 §1b |
| V09-0112 | V09 §2 |
| V09-0113 | V09 §2.1 |
| V09-0114 | V09 §2.2 |
| V09-0115 | V09 §2.2 |
| V09-0116 | V09 §2.2 |
| V09-0117 | V09 §2.2 |
| V09-0118 | V09 §2.3 |
| V09-0119 | V09 §2.3 |
| V09-0120 | V09 §2.3 |
| V09-0121 | V09 §2.4 |
| V09-0122 | V09 §2.4 |
| V09-0123 | V09 §2.4 |
| V09-0124 | V09 §2.4 |
| V09-0125 | V09 §2.5 |
| V09-0126 | V09 §2.5 |
| V09-0127 | V09 §2.5 |
| V09-0128 | V09 §2.6, cites V11 §1b |
| V09-0129 | V09 §2.6 |
| V09-0130 | V09 §2.6, cites V11 §2.4 |
| V09-0131 | V09 §2.7, cites V10 §1.1 |
| V09-0132 | V09 §2.7 |
| V09-0133 | V09 §2.7 |
| V09-0134 | V09 §2.7 |
| V09-0135 | V09 §2.7 |
| V09-0136 | V09 §2.7, cites §2.9 |
| V09-0137 | V09 §2.8 |
| V09-0138 | V09 §2.8 |
| V09-0139 | V09 §2.8 |
| V09-0140 | V09 §2.9 |
| V09-0141 | V09 §2.9 |
| V09-0142 | V09 §2.9 |
| V09-0143 | V09 §2.9 |
| V09-0144 | V09 §2.9 |
| V09-0145 | V09 §2.10, cites V10 §1b.1 |
| V09-0146 | V09 §2.10 |
| V09-0147 | V09 §2.10 |
| V09-0148 | V09 §2.10 |
| V09-0149 | V09 §2.10 |
| V09-0150 | V09 §2.10, cites V10 §2.2 |
| V09-0151 | V09 §2.11 |
| V09-0152 | V09 §2.11 |
| V09-0153 | V09 §2.11 |
| V09-0154 | V09 §2.12 |
| V09-0155 | V09 §2.12 |
| V09-0156 | V09 §2.12 |
| V09-0157 | V09 §2.12 |
| V09-0158 | V09 §2.12 |
| V09-0159 | V09 §2.12 |
| V09-0160 | V09 §2.12 |
| V09-0161 | V09 §2.12 |
| V09-0162 | V09 §2.12 |
| V09-0163 | V09 §2.12 |
| V09-0164 | V09 §2.12 |
| V09-0165 | V09 §2.12 |
| V09-0166 | V09 §2.12 |
| V09-0167 | V09 §2.12 |
| V09-0168 | V09 §2.12 |
| V09-0169 | V09 §2.12 |
| V09-0170 | V09 §2.12 |
| V09-0171 | V09 §2.12 |
| V09-0172 | V09 §2.12 |
| V09-0173 | V09 §2.12 |
| V09-0174 | V09 §2.12 |
| V09-0175 | V09 §2.12 |
| V09-0176 | V09 §2.12 |
| V09-0177 | V09 §2.12 |
| V09-0178 | V09 §2.12 |
| V09-0179 | V09 §2.12 |
| V09-0180 | V09 §2.12 |
| V09-0181 | V09 §3 |
| V09-0182 | V09 §3.1 |
| V09-0183 | V09 §3.1 |
| V09-0184 | V09 §3.2 |
| V09-0185 | V09 §3.2 |
| V09-0186 | V09 §3.3 |
| V09-0187 | V09 §3.3 |
| V09-0188 | V09 §3.3 |
| V09-0189 | V09 §3.3 |
| V09-0190 | V09 §3.4 |
| V09-0191 | V09 §3.4 |
| V09-0192 | V09 §3.4, cites §14 |
| V09-0193 | V09 §3.5 |
| V09-0194 | V09 §3.5 |
| V09-0195 | V09 §3.5, cites V02 §8.3 |
| V09-0196 | V09 §3.6 |
| V09-0197 | V09 §3.6 |
| V09-0198 | V09 §3.6 |
| V09-0199 | V09 §3.7 |
| V09-0200 | V09 §3.7 |
| V09-0201 | V09 §3.8 |
| V09-0202 | V09 §3.8 |
| V09-0203 | V09 §3.8 |
| V09-0204 | V09 §3.9, cites §7.4 |
| V09-0205 | V09 §3.9 |
| V09-0206 | V09 §3.9, cites V06 §4.4 |
| V09-0207 | V09 §3.9, cites V06 §9 |
| V09-0208 | V09 §3.9 |
| V09-0209 | V09 §3.10 |
| V09-0210 | V09 §3.11, cites §6.4 |
| V09-0211 | V09 §3.12 |
| V09-0212 | V09 §3.12 |
| V09-0213 | V09 §3.12 |
| V09-0214 | V09 §3.13 |
| V09-0215 | V09 §3.14 |
| V09-0216 | V09 §3.14 |
| V09-0217 | V09 §3.15 |
| V09-0218 | V09 §4.1 |
| V09-0219 | V09 §4.2 |
| V09-0220 | V09 §4.2 |
| V09-0221 | V09 §4.2 |
| V09-0222 | V09 §4.2 |
| V09-0223 | V09 §4.3 |
| V09-0224 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0225 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0226 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0227 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0228 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0229 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0230 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0231 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0232 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0233 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0234 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0235 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0236 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0237 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0238 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0239 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0240 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0241 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0242 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0243 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0244 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0245 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0246 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0247 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0248 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0249 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0250 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0251 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0252 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0253 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0254 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0255 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0256 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0257 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0258 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0259 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0260 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0261 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0262 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0263 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0264 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0265 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0266 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0267 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0268 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0269 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0270 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0271 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0272 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0273 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0274 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0275 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0276 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0277 | V09 §4.3 (screens and gestures; the pair §7.1's binding table, E-04) |
| V09-0278 | V09 §4.4 |
| V09-0279 | V09 §4.4 |
| V09-0280 | V09 §4.4 |
| V09-0281 | V09 §4.5 |
| V09-0282 | V09 §4.5 |
| V09-0283 | V09 §4.5 |
| V09-0284 | V09 §4.5 |
| V09-0285 | V09 §4.5 |
| V09-0286 | V09 §4.5 |
| V09-0287 | V09 §4.5 |
| V09-0288 | V09 §4.5 |
| V09-0289 | V09 §4.5 |
| V09-0290 | V09 §4.5 |
| V09-0291 | V09 §4.5 |
| V09-0292 | V09 §4.5 |
| V09-0293 | V09 §4.5 |
| V09-0294 | V09 §4.6 |
| V09-0295 | V09 §4.6 |
| V09-0296 | V09 §4.7 |
| V09-0297 | V09 §4.7 |
| V09-0298 | V09 §4.7 |
| V09-0299 | V09 §4.7 |
| V09-0300 | V09 §4.8 |
| V09-0301 | V09 §4.8, cites V08 §9 |
| V09-0302 | V09 §4.9 |
| V09-0303 | V09 §4.9 |
| V09-0304 | V09 §4.9 |
| V09-0305 | V09 §4.9 |
| V09-0306 | V09 §4.9 |
| V09-0307 | V09 §4.9 |
| V09-0308 | V09 §4.9 |
| V09-0309 | V09 §4.9 |
| V09-0310 | V09 §4.9 |
| V09-0311 | V09 §4.9 |
| V09-0312 | V09 §4.9 |
| V09-0313 | V09 §4.9 |
| V09-0314 | V09 §4.9 |
| V09-0315 | V09 §4.9 |
| V09-0316 | V09 §4.9 |
| V09-0317 | V09 §4.9 |
| V09-0318 | V09 §4.9 |
| V09-0319 | V09 §4.9 |
| V09-0320 | V09 §4.9 |
| V09-0321 | V09 §4.9 |
| V09-0322 | V09 §4.9 |
| V09-0323 | V09 §4.9 |
| V09-0324 | V09 §4.9 |
| V09-0325 | V09 §4.9 |
| V09-0326 | V09 §4.9 |
| V09-0327 | V09 §4.9 |
| V09-0328 | V09 §4.9 |
| V09-0329 | V09 §4.9 |
| V09-0330 | V09 §4.9 |
| V09-0331 | V09 §4.9 |
| V09-0332 | V09 §4.9 (`refuse.kept` with `button.rederive`, G-rederive) |
| V09-0333 | V09 §4.9 |
| V09-0334 | V09 §4.9 |
| V09-0335 | V09 §4.9 |
| V09-0336 | V09 §4.9 |
| V09-0337 | V09 §4.9 |
| V09-0338 | V09 §4.9 |
| V09-0339 | V09 §4.9 |
| V09-0340 | V09 §4.9 |
| V09-0341 | V09 §4.9 |
| V09-0342 | V09 §4.9 |
| V09-0343 | V09 §4.9 |
| V09-0344 | V09 §4.9 |
| V09-0345 | V09 §4.9 |
| V09-0346 | V09 §4.9 |
| V09-0347 | V09 §4.9 |
| V09-0348 | V09 §4.9 |
| V09-0349 | V09 §4.9 |
| V09-0350 | V09 §4.9 |
| V09-0351 | V09 §4.9 |
| V09-0352 | V09 §4.9 |
| V09-0353 | V09 §4.9 |
| V09-0354 | V09 §4.9 |
| V09-0355 | V09 §4.9 |
| V09-0356 | V09 §4.9 |
| V09-0357 | V09 §4.9 |
| V09-0358 | V09 §4.9 |
| V09-0359 | V09 §4.9 |
| V09-0360 | V09 §4.9 |
| V09-0361 | V09 §4.9 (`refuse.clerk.offline`, its text V10 §3.16; `error.clerkOffline` retired, E-32) |
| V09-0362 | V09 §4.9 |
| V09-0363 | V09 §4.9 |
| V09-0364 | V09 §4.9 |
| V09-0365 | V09 §4.9 |
| V09-0366 | V09 §4.9 |
| V09-0367 | V09 §4.9 |
| V09-0368 | V09 §4.9 |
| V09-0369 | V09 §4.9 |
| V09-0370 | V09 §4.9 |
| V09-0371 | V09 §4.9 |
| V09-0372 | V09 §4.9 |
| V09-0373 | V09 §4.9 |
| V09-0374 | V09 §4.9 |
| V09-0375 | V09 §4.9 |
| V09-0376 | V09 §4.9 |
| V09-0377 | V09 §4.9 |
| V09-0378 | V09 §4.9 |
| V09-0379 | V09 §4.9 |
| V09-0380 | V09 §4.9 |
| V09-0381 | V09 §4.9 |
| V09-0382 | V09 §4.9 |
| V09-0383 | V09 §4.9 |
| V09-0384 | V09 §4.9 |
| V09-0385 | V09 §4.9 |
| V09-0386 | V09 §4.9 |
| V09-0387 | V09 §4.9 |
| V09-0388 | V09 §4.9 |
| V09-0389 | V09 §4.9 |
| V09-0390 | V09 §4.9 |
| V09-0391 | V09 §4.9 (`info.under.deep`; the former name dropped) |
| V09-0392 | V09 §4.9 (`info.under.sealed`; the former name dropped) |
| V09-0393 | V09 §4.9 |
| V09-0394 | V09 §4.9 |
| V09-0395 | V09 §4.9 |
| V09-0396 | V09 §4.9 |
| V09-0397 | V09 §4.9 |
| V09-0398 | V09 §4.9 |
| V09-0399 | V09 §4.9 |
| V09-0400 | V09 §4.9 |
| V09-0401 | V09 §4.9 |
| V09-0402 | V09 §4.9 |
| V09-0403 | V09 §4.9 |
| V09-0404 | V09 §4.9 |
| V09-0405 | V09 §4.9 |
| V09-0406 | V09 §4.9 (`info.copy.condensed`, its text V06 §3.15.5's) |
| V09-0407 | V09 §4.9 |
| V09-0408 | V09 §4.9 |
| V09-0409 | V09 §4.9 |
| V09-0410 | V09 §4.9 |
| V09-0411 | V09 §4.9 |
| V09-0412 | V09 §4.9 |
| V09-0413 | V09 §4.9 |
| V09-0414 | V09 §4.9 |
| V09-0415 | V09 §4.9 |
| V09-0416 | V09 §4.9 |
| V09-0417 | V09 §4.9 |
| V09-0418 | V09 §4.9 |
| V09-0419 | V09 §4.9 |
| V09-0420 | V09 §4.9 |
| V09-0421 | V09 §4.9 |
| V09-0422 | V09 §4.9 |
| V09-0423 | V09 §4.9 |
| V09-0424 | V09 §4.9 (V05's island and access bend family, text V05 §4.2's) |
| V09-0425 | V09 §4.9 (V05's island and access bend family, text V05 §4.2's) |
| V09-0426 | V09 §4.9 (V05's island and access bend family, text V05 §4.2's) |
| V09-0427 | V09 §4.9 (V05's island and access bend family, text V05 §4.2's) |
| V09-0428 | V09 §4.9 (V05's island and access bend family, text V05 §4.2's) |
| V09-0429 | V09 §4.9 |
| V09-0430 | V09 §4.9 |
| V09-0431 | V09 §4.9 |
| V09-0432 | V09 §4.9 |
| V09-0433 | V09 §4.9 |
| V09-0434 | V09 §4.9 (V02's bend id set replaces this key, V09-XAGREE-3) |
| V09-0435 | V09 §4.9 (V02's bend id set replaces this key, V09-XAGREE-3) |
| V09-0436 | V09 §4.9 (V02's bend id set replaces this key, V09-XAGREE-3) |
| V09-0437 | V09 §4.9 (V02's bend id set replaces this key, V09-XAGREE-3) |
| V09-0438 | V09 §4.9 (V02's bend id set replaces this key, V09-XAGREE-3) |
| V09-0439 | V09 §4.9 (V02's bend id set replaces this key, V09-XAGREE-3) |
| V09-0440 | V09 §4.9 (V02's bend id set replaces this key, V09-XAGREE-3) |
| V09-0441 | V09 §4.9 |
| V09-0442 | V09 §4.9 |
| V09-0443 | V09 §4.9 |
| V09-0444 | V09 §4.9 |
| V09-0445 | V09 §4.9 |
| V09-0446 | V09 §4.9 |
| V09-0447 | V09 §4.9 |
| V09-0448 | V09 §4.9 |
| V09-0449 | V09 §4.9 |
| V09-0450 | V09 §4.9 |
| V09-0451 | V09 §4.9 |
| V09-0452 | V09 §4.9 |
| V09-0453 | V09 §4.9 |
| V09-0454 | V09 §4.9 |
| V09-0455 | V09 §4.9 |
| V09-0456 | V09 §4.9 |
| V09-0457 | V09 §4.9 |
| V09-0458 | V09 §4.9 |
| V09-0459 | V09 §4.9 |
| V09-0460 | V09 §4.9 |
| V09-0461 | V09 §4.9 |
| V09-0462 | V09 §4.9 |
| V09-0463 | V09 §4.9 |
| V09-0464 | V09 §4.9 |
| V09-0465 | V09 §4.9 |
| V09-0466 | V09 §4.9 |
| V09-0467 | V09 §4.9 |
| V09-0468 | V09 §4.9 |
| V09-0469 | V09 §4.9 (the `giveTiers` form retired; V02's bend row, V09-XAGREE-3) |
| V09-0470 | V09 §4.9 |
| V09-0471 | V09 §4.9 |
| V09-0472 | V09 §4.9 |
| V09-0473 | V09 §4.9 |
| V09-0474 | V09 §4.9 |
| V09-0475 | V09 §4.9 |
| V09-0476 | V09 §4.9 |
| V09-0477 | V09 §4.9 |
| V09-0478 | V09 §4.9 |
| V09-0479 | V09 §4.9 |
| V09-0480 | V09 §4.9 |
| V09-0481 | V09 §4.9 |
| V09-0482 | V09 §4.9 |
| V09-0483 | V09 §4.9 |
| V09-0484 | V09 §4.9 |
| V09-0485 | V09 §4.9 |
| V09-0486 | V09 §4.9 |
| V09-0487 | V09 §4.9 |
| V09-0488 | V09 §4.9 |
| V09-0489 | V09 §4.9 |
| V09-0490 | V09 §4.9 |
| V09-0491 | V09 §4.9 |
| V09-0492 | V09 §4.9 |
| V09-0493 | V09 §4.9 |
| V09-0494 | V09 §4.9 |
| V09-0495 | V09 §4.9 |
| V09-0496 | V09 §4.9 |
| V09-0497 | V09 §4.9 |
| V09-0498 | V09 §4.9 |
| V09-0499 | V09 §4.9 |
| V09-0500 | V09 §4.9 |
| V09-0501 | V09 §4.9, cites V10 §1b.1 |
| V09-0502 | V09 §4.9, cites V10 §7.1 |
| V09-0503 | V09 §4.9, cites V10 §1b.1 |
| V09-0504 | V09 §4.9, cites V10 §9 |
| V09-0505 | V09 §4.9, cites V10 §1b.1 |
| V09-0506 | V09 §4.9, cites V10 §1b.1 |
| V09-0507 | V09 §4.9, cites V10 §7.1 |
| V09-0508 | V09 §4.9, cites V10 §1b.1 |
| V09-0509 | V09 §4.9, cites V10 §7.1 |
| V09-0510 | V09 §4.9, cites V10 §1b.1 |
| V09-0511 | V09 §4.9, cites V10 §1b.1 |
| V09-0512 | V09 §4.9 |
| V09-0513 | V09 §4.9 |
| V09-0514 | V09 §4.9 |
| V09-0515 | V09 §4.9 |
| V09-0516 | V09 §4.9, cites V10 §7.1 |
| V09-0517 | V09 §4.10 |
| V09-0518 | V09 §4.10 |
| V09-0519 | V09 §4.10 |
| V09-0520 | V09 §4.10 |
| V09-0521 | V09 §4.10 |
| V09-0522 | V09 §4.10 |
| V09-0523 | V09 §4.10 |
| V09-0524 | V09 §4.10 |
| V09-0525 | V09 §4.10 |
| V09-0526 | V09 §4.10 |
| V09-0527 | V09 §4.10 |
| V09-0528 | V09 §4.10 |
| V09-0529 | V09 §4.10 |
| V09-0530 | V09 §4.10 |
| V09-0531 | V09 §4.10 |
| V09-0532 | V09 §4.10 |
| V09-0533 | V09 §4.10 |
| V09-0534 | V09 §4.10 |
| V09-0535 | V09 §4.10 |
| V09-0536 | V09 §4.10 |
| V09-0537 | V09 §4.10 |
| V09-0538 | V09 §4.10 |
| V09-0539 | V09 §4.10 |
| V09-0540 | V09 §4.10 |
| V09-0541 | V09 §4.10 |
| V09-0542 | V09 §4.10 |
| V09-0543 | V09 §4.10 |
| V09-0544 | V09 §4.10 |
| V09-0545 | V09 §4.10 |
| V09-0546 | V09 §4.10 |
| V09-0547 | V09 §4.10 |
| V09-0548 | V09 §4.10, cites V08 §4.6 |
| V09-0549 | V09 §4.10 |
| V09-0550 | V09 §4.10 |
| V09-0551 | V09 §4.11 |
| V09-0552 | V09 §4.11 |
| V09-0553 | V09 §4.11, cites V10 §2.6 |
| V09-0554 | V09 §4.11, cites V10 §3.11 |
| V09-0555 | V09 §4.11 |
| V09-0556 | V09 §4.11 |
| V09-0557 | V09 §4.11 |
| V09-0558 | V09 §4.11 |
| V09-0559 | V09 §4.11, cites V10 §2.2 |
| V09-0560 | V09 §9 (J-V9.9) |
| V09-0561 | V09 §4.12 |
| V09-0562 | V09 §4.13 |
| V09-0563 | V09 §4.14 |
| V09-0564 | V09 §4.14, cites §7.6 |
| V09-0565 | V09 §4.15 |
| V09-0566 | V09 §4.15 |
| V09-0567 | V09 §4.16 |
| V09-0568 | V09 §4.16 |
| V09-0569 | V09 §4.17, cites its home |
| V09-0570 | V09 §4.17.1, cites V04 §9 |
| V09-0571 | V09 §4.17.2 |
| V09-0572 | V09 §4.17.3 |
| V09-0573 | V09 §4.17.3 |
| V09-0574 | V09 §4.17.3 |
| V09-0575 | V09 §4.17.3 |
| V09-0576 | V09 §4.17.3 |
| V09-0577 | V09 §4.17.3 |
| V09-0578 | V09 §4.17.3 |
| V09-0579 | V09 §4.17.3 |
| V09-0580 | V09 §4.17.3 |
| V09-0581 | V09 §4.17.3 |
| V09-0582 | V09 §4.17.3 |
| V09-0583 | V09 §4.17.3 |
| V09-0584 | V09 §4.17.3 |
| V09-0585 | V09 §4.17.3 |
| V09-0586 | V09 §4.17.4 |
| V09-0587 | V09 §4.17.4 |
| V09-0588 | V09 §4.17.5 |
| V09-0589 | V09 §4.17.5 |
| V09-0590 | V09 §4.17.5 |
| V09-0591 | V09 §4.17.5 |
| V09-0592 | V09 §4.17.5, cites V04 §4.3 |
| V09-0593 | V09 §4.18 |
| V09-0594 | V09 §4.19, cites §2.9 |
| V09-0595 | V09 §4.19, cites §9.5 |
| V09-0596 | V09 §4.19, cites its home |
| V09-0597 | V09 §4.19, cites its home |
| V09-0598 | V09 §4.19, cites §4.2 |
| V09-0599 | V09 §4.19, cites §8 |
| V09-0600 | V09 §4.19, cites §2.9 |
| V09-0601 | V09 §4.19, cites its home |
| V09-0602 | V09 §4.19, cites its home |
| V09-0603 | V09 §4.19, cites its home |
| V09-0604 | V09 §4.19, cites §11.3 |
| V09-0605 | V09 §4.19, cites its home |
| V09-0606 | V09 §4.19, cites its home |
| V09-0607 | V09 §4.19, cites §4.5 |
| V09-0608 | V09 §4.19, cites §9.5 |
| V09-0609 | V09 §4.19, cites its home |
| V09-0610 | V09 §4.20, cites §3.15 |
| V09-0611 | V09 §4.20 |
| V09-0612 | V09 §4.20 |
| V09-0613 | V09 §4.20 |
| V09-0614 | V09 §4.20 |
| V09-0615 | V09 §4.20 |
| V09-0616 | V09 §4.20 |
| V09-0617 | V09 §4.20 |
| V09-0618 | V09 §4.20 |
| V09-0619 | V09 §4.20 |
| V09-0620 | V09 §4.20 |
| V09-0621 | V09 §4.20 |
| V09-0622 | V09 §4.20 |
| V09-0623 | V09 §4.20 |
| V09-0624 | V09 §4.20 |
| V09-0625 | V09 §4.20 |
| V09-0626 | V09 §4.20 |
| V09-0627 | V09 §4.20 |
| V09-0628 | V09 §4.20 |
| V09-0629 | V09 §4.20 |
| V09-0630 | V09 §4.20 |
| V09-0631 | V09 §4.20 |
| V09-0632 | V09 §4.20.1 |
| V09-0633 | V09 §4.20.1 |
| V09-0634 | V09 §4.20.1 |
| V09-0635 | V09 §4.20.2 |
| V09-0636 | V09 §4.20.2 |
| V09-0637 | V09 §4.20.2, cites V05 §4.2 |
| V09-0638 | V09 §4.20.2 |
| V09-0639 | V09 §4.20.3 |
| V09-0640 | V09 §4.20.3, cites V06 §1b |
| V09-0641 | V09 §4.20.3 |
| V09-0642 | V09 §4.20.3 |
| V09-0643 | V09 §4.20.4 |
| V09-0644 | V09 §4.20.4 |
| V09-0645 | V09 §4.20.3 |
| V09-0646 | V09 §4.20.3 |
| V09-0647 | V09 §4.20.3 |
| V09-0648 | V09 §4.20.3 |
| V09-0649 | V09 §4.20.3 |
| V09-0650 | V09 §4.20.3 |
| V09-0651 | V09 §4.20.3 |
| V09-0652 | V09 §4.20.5, cites V02 §9 |
| V09-0653 | V09 §4.20.5 |
| V09-0654 | V09 §4.20.6 |
| V09-0655 | V09 §4.20.6 |
| V09-0656 | V09 §4.20.6 |
| V09-0657 | V09 §4.20.7, cites §11.2 |
| V09-0658 | V09 §4.20.8, cites §8.2 |
| V09-0659 | V09 §4.20.9, cites V05 §3.22 |
| V09-0660 | V09 §5, cites §8 |
| V09-0661 | V09 §5.1 |
| V09-0662 | V09 §5.1 |
| V09-0663 | V09 §5.1 |
| V09-0664 | V09 §5.1 |
| V09-0665 | V09 §5.1 |
| V09-0666 | V09 §5.1 |
| V09-0667 | V09 §5.1 |
| V09-0668 | V09 §5.1 |
| V09-0669 | V09 §5.1 |
| V09-0670 | V09 §5.1 |
| V09-0671 | V09 §5.1 |
| V09-0672 | V09 §5.1 |
| V09-0673 | V09 §5.1 |
| V09-0674 | V09 §5.1 |
| V09-0675 | V09 §5.1 |
| V09-0676 | V09 §5.1 |
| V09-0677 | V09 §5.1 |
| V09-0678 | V09 §5.1 |
| V09-0679 | V09 §5.1 |
| V09-0680 | V09 §5.1 |
| V09-0681 | V09 §5.2 |
| V09-0682 | V09 §5.3 |
| V09-0683 | V09 §5.3 |
| V09-0684 | V09 §5.4 |
| V09-0685 | V09 §5.4 |
| V09-0686 | V09 §5.4 |
| V09-0687 | V09 §5.4, cites §5 |
| V09-0688 | V09 §5.5 |
| V09-0689 | V09 §5.6, cites V06 §5.1 |
| V09-0690 | V09 §5.7 |
| V09-0691 | V09 §5.8 |
| V09-0692 | V09 §5.9 |
| V09-0693 | V09 §5.10 |
| V09-0694 | V09 §5.10 |
| V09-0695 | V09 §5.10 |
| V09-0696 | V09 §5.10 |
| V09-0697 | V09 §5.10 |
| V09-0698 | V09 §5.10 |
| V09-0699 | V09 §5.10 |
| V09-0700 | V09 §5.11 |
| V09-0701 | V09 §5.12 |
| V09-0702 | V09 §5.13 |
| V09-0703 | V09 §5.14 |
| V09-0704 | V09 §5.15 |
| V09-0705 | V09 §5.15 |
| V09-0706 | V09 §5.15 |
| V09-0707 | V09 §5.15 |
| V09-0708 | V09 §5.15 |
| V09-0709 | V09 §5.15 |
| V09-0710 | V09 §5.15 |
| V09-0711 | V09 §5.15 |
| V09-0712 | V09 §5.15 |
| V09-0713 | V09 §5.15 |
| V09-0714 | V09 §5.15 |
| V09-0715 | V09 §5.15 |
| V09-0716 | V09 §5.15 |
| V09-0717 | V09 §5.15 |
| V09-0718 | V09 §5.15 |
| V09-0719 | V09 §5.15 |
| V09-0720 | V09 §5.15 |
| V09-0721 | V09 §5.15 |
| V09-0722 | V09 §5.15 |
| V09-0723 | V09 §5.15 |
| V09-0724 | V09 §5.15 |
| V09-0725 | V09 §5.15 |
| V09-0726 | V09 §5.15 |
| V09-0727 | V09 §6 |
| V09-0728 | V09 §6.1 |
| V09-0729 | V09 §6.1 |
| V09-0730 | V09 §6.1 |
| V09-0731 | V09 §6.1 |
| V09-0732 | V09 §6.1 |
| V09-0733 | V09 §6.1 |
| V09-0734 | V09 §6.1 |
| V09-0735 | V09 §6.1 |
| V09-0736 | V09 §6.1 |
| V09-0737 | V09 §6.1 |
| V09-0738 | V09 §6.1 |
| V09-0739 | V09 §6.1 |
| V09-0740 | V09 §6.1 |
| V09-0741 | V09 §6.1 |
| V09-0742 | V09 §6.1 |
| V09-0743 | V09 §6.1 |
| V09-0744 | V09 §6.1 |
| V09-0745 | V09 §6.1 |
| V09-0746 | V09 §6.1 |
| V09-0747 | V09 §6.1 |
| V09-0748 | V09 §6.1 |
| V09-0749 | V09 §6.1 |
| V09-0750 | V09 §6.1 |
| V09-0751 | V09 §6.1 |
| V09-0752 | V09 §6.1 |
| V09-0753 | V09 §6.2 |
| V09-0754 | V09 §6.3 |
| V09-0755 | V09 §6.4 |
| V09-0756 | V09 §6.5 |
| V09-0757 | V09 §7 |
| V09-0758 | V09 §7.1 (T-V9-1) |
| V09-0759 | V09 §7.1 (T-V9-2) |
| V09-0760 | V09 §7.1 (T-V9-3) |
| V09-0761 | V09 §7.1 (T-V9-4) |
| V09-0762 | V09 §7.1 (T-V9-5) |
| V09-0763 | V09 §7.1 (T-V9-6) |
| V09-0764 | V09 §7.1 (T-V9-7) |
| V09-0765 | V09 §7.1 (T-V9-8) |
| V09-0766 | V09 §7.1 (T-V9-9) |
| V09-0767 | V09 §7.1 (T-V9-10) |
| V09-0768 | V09 §7.1 (T-V9-11) |
| V09-0769 | V09 §7.1 (T-V9-12) |
| V09-0770 | V09 §7.1 (T-V9-13, V02's bend ids) |
| V09-0771 | V09 §7.1 (T-V9-14) |
| V09-0772 | V09 §7.1 (T-V9-15) |
| V09-0773 | V09 §7.1 (T-V9-16) |
| V09-0774 | V09 §7.1 (T-V9-17) |
| V09-0775 | V09 §7.1 (T-V9-18) |
| V09-0776 | V09 §7.1 (T-V9-19) |
| V09-0777 | V09 §7.1 (T-V9-20) |
| V09-0778 | V09 §7.1 (T-V9-21) |
| V09-0779 | V09 §7.1 (T-V9-22) |
| V09-0780 | V09 §7.1 (T-V9-23) |
| V09-0781 | V09 §7.1 (T-V9-24) |
| V09-0782 | V09 §7.1 (T-V9-25) |
| V09-0783 | V09 §7.1 (T-V9-26) |
| V09-0784 | V09 §7.1 (T-V9-27) |
| V09-0785 | V09 §7.1 (T-V9-28) |
| V09-0786 | V09 §7.1 (T-V9-29) |
| V09-0787 | V09 §7.1 (T-V9-30) |
| V09-0788 | V09 §7.1 (T-V9-31) |
| V09-0789 | V09 §7.1 (T-V9-32) |
| V09-0790 | V09 §7.1 (T-V9-33) |
| V09-0791 | V09 §7.1 (T-V9-34) |
| V09-0792 | V09 §7.1 (T-V9-35) |
| V09-0793 | V09 §7.1 (T-V9-36) |
| V09-0794 | V09 §7.1 (T-V9-37) |
| V09-0795 | V09 §7.1 (T-V9-38) |
| V09-0796 | V09 §7.1 (T-V9-39) |
| V09-0797 | V09 §7.1 (T-V9-40) |
| V09-0798 | V09 §7.1 (T-V9-41) |
| V09-0799 | V09 §7.1 (T-V9-42) |
| V09-0800 | V09 §7.1 (T-V9-43) |
| V09-0801 | V09 §7.1 (T-V9-44) |
| V09-0802 | V09 §7.1 (T-V9-45) |
| V09-0803 | V09 §7.1 (T-V9-46) |
| V09-0804 | V09 §7.1 (T-V9-47) |
| V09-0805 | V09 §7.1 (T-V9-48) |
| V09-0806 | V09 §7.1 (T-V9-49) |
| V09-0807 | V09 §7.1 (T-V9-50) |
| V09-0808 | V09 §7.1 (T-V9-51) |
| V09-0809 | V09 §7.1 (T-V9-52) |
| V09-0810 | V09 §7.1 (T-V9-53) |
| V09-0811 | V09 §7.1 (T-V9-54) |
| V09-0812 | V09 §7.1 (T-V9-55) |
| V09-0813 | V09 §7.1 (T-V9-56) |
| V09-0814 | V09 §7.1 (T-V9-57) |
| V09-0815 | V09 §7.1 (T-V9-58) |
| V09-0816 | V09 §7.1 (T-V9-59) |
| V09-0817 | V09 §7.1 (T-V9-60) |
| V09-0818 | V09 §7.1 (T-V9-61) |
| V09-0819 | V09 §7.1 (T-V9-62) |
| V09-0820 | V09 §7.1 (T-V9-63) |
| V09-0821 | V09 §7.1 (T-V9-64) |
| V09-0822 | V09 §7.1 (T-V9-65) |
| V09-0823 | V09 §7.1 (T-V9-66) |
| V09-0824 | V09 §7.1 (T-V9-67) |
| V09-0825 | V09 §7.1 (T-V9-68) |
| V09-0826 | V09 §7.1 (T-V9-69) |
| V09-0827 | V09 §7.1 (T-V9-70) |
| V09-0828 | V09 §7.2 |
| V09-0829 | V09 §7.2 |
| V09-0830 | V09 §7.2 |
| V09-0831 | V09 §7.3 |
| V09-0832 | V09 §7.3 |
| V09-0833 | V09 §7.4 |
| V09-0834 | V09 §7.5 |
| V09-0835 | V09 §7.5 |
| V09-0836 | V09 §7.5 |
| V09-0837 | V09 §7.5 |
| V09-0838 | V09 §7.5 |
| V09-0839 | V09 §7.5 |
| V09-0840 | V09 §7.5 |
| V09-0841 | V09 §7.5 |
| V09-0842 | V09 §7.5 |
| V09-0843 | V09 §7.5 |
| V09-0844 | V09 §7.5 |
| V09-0845 | V09 §7.5 |
| V09-0846 | V09 §7.5 |
| V09-0847 | V09 §7.5 |
| V09-0848 | V09 §7.5 |
| V09-0849 | V09 §7.5 |
| V09-0850 | V09 §7.5 |
| V09-0851 | V09 §7.5 |
| V09-0852 | V09 §7.5 |
| V09-0853 | V09 §7.5 |
| V09-0854 | V09 §7.5 |
| V09-0855 | V09 §7.5 |
| V09-0856 | V09 §7.5 |
| V09-0857 | V09 §7.5 |
| V09-0858 | V09 §8.1 |
| V09-0859 | V09 §8.1 |
| V09-0860 | V09 §8.1 |
| V09-0861 | V09 §8.1 |
| V09-0862 | V09 §8.1 |
| V09-0863 | V09 §8.1 |
| V09-0864 | V09 §8.1 |
| V09-0865 | V09 §8.1 |
| V09-0866 | V09 §8.1 |
| V09-0867 | V09 §8.1 |
| V09-0868 | V09 §8.1 |
| V09-0869 | V09 §8.1 |
| V09-0870 | V09 §8.1 |
| V09-0871 | V09 §8.1, cites §16 |
| V09-0872 | V09 §8.2 |
| V09-0873 | V09 §8.3 |
| V09-0874 | V09 §9 (J-V9.1) |
| V09-0875 | V09 §9 (J-V9.2) |
| V09-0876 | V09 §9 (J-V9.3) |
| V09-0877 | V09 §9 (J-V9.4) |
| V09-0878 | V09 §9 (J-V9.5) |
| V09-0879 | V09 §9 (J-V9.6) |
| V09-0880 | V09 §9 (J-V9.7) |
| V09-0881 | V09 §9 (J-V9.8) |
| V09-0882 | V09 §9 (J-V9.9) |
| V09-0883 | V09 §9 (J-V9.10) |
| V09-0884 | V09 §9 (J-V9.11) |
| V09-0885 | V09 §9 (J-V9.12) |
| V09-0886 | V09 §9 (J-V9.13) |
| V09-0887 | V09 §9 (J-V9.14) |
| V09-0888 | V09 §9 (J-V9.15) |
| V09-0889 | V09 §9 (J-V9.16) |
| V09-0890 | V09 §9 (J-V9.17) |
| V09-0891 | V09 §9 (J-V9.18) |
| V09-0892 | V09 §9 (J-V9.19) |
| V09-0893 | V09 §9 (J-V9.20) |
| V09-0894 | V09 §9 (J-V9.21) |
| V09-0895 | V09 §9 (J-V9.22) |
| V09-0896 | V09 §9 (J-V9.23) |
| V09-0897 | V09 §9 (J-V9.24) |
| V09-0898 | V09 §9 (J-V9.25) |
| V09-0899 | V09 §9 (J-V9.26) |
| V09-0900 | V09 §9 (J-V9.27) |
| V09-0901 | V09 §9 (J-V9.28) |
| V09-0902 | V09 §9 (J-V9.29) |
| V09-0903 | V09 §9 (J-V9.30) |
| V09-0904 | V09 §9 (J-V9.31) |
| V09-0905 | V09 §9 (J-V9.32) |
| V09-0906 | V09 §9 (J-V9.33) |
| V09-0907 | V09 §9 (J-V9.34) |
| V09-0908 | V09 §9 (J-V9.35) |
| V09-0909 | V09 §9 (J-V9.36) |
| V09-0910 | V09 §9 (J-V9.37) |
| V09-0911 | V09 §9 (J-V9.38) |
| V09-0912 | V09 §9 (J-V9.39) |
| V09-0913 | V09 §9 (J-V9.40) |
| V09-0914 | V09 §9 (J-V9.41) |
| V09-0915 | V09 §9 (J-V9.42) |
| V09-0916 | V09 §9 (J-V9.43) |
| V09-0917 | V09 §9 (J-V9.44) |
| V09-0918 | V09 §9 (J-V9.45) |
| V09-0919 | V09 §9 (J-V9.46) |
| V09-0920 | V09 §9 (J-V9.47) |
| V09-0921 | V09 §9 (J-V9.48) |
| V09-0922 | V09 §9 (J-V9.49) |
| V09-0923 | V09 §9 (J-V9.50) |
| V09-0924 | V09 §9 (J-V9.51) |
| V09-0925 | V09 §9 (J-V9.52) |
| V09-0926 | V09 §9 (J-V9.53) |
| V09-0927 | V09 §9 (J-V9.54) |
| V09-0928 | V09 §9 (J-V9.55) |
| V09-0929 | V09 §9 (J-V9.56) |
| V09-0930 | V09 §9 (J-V9.57) |
| V09-0931 | V09 §9 (J-V9.58) |
| V09-0932 | V09 §9 (J-V9.59) |
| V09-0933 | V09 §9 (J-V9.60) |
| V09-0934 | V09 §9 (J-V9.61) |
| V09-0935 | V09 §9 (J-V9.62) |
| V09-0936 | V09 §9 (J-V9.63) |
| V09-0937 | V09 §9 (J-V9.64) |
| V09-0938 | V09 §9 (J-V9.65) |
| V09-0939 | V09 §9 (J-V9.66) |
| V09-0940 | V09 §9 (J-V9.67) |
| V09-0941 | V09 §9 (J-V9.68) |
| V09-0942 | V09 §9 (J-V9.69) |
| V09-0943 | V09 §9 (J-V9.70) |
| V09-0944 | V09 §9 (J-V9.71) |
| V09-0945 | V09 §9 (J-V9.72) |
| V09-0946 | V09 §9 (J-V9.73) |
| V09-0947 | V09 §9 (J-V9.74) |
| V09-0948 | V09 §9 (J-V9.75) |
| V09-0949 | V09 §9 (J-V9.76) |
| V09-0950 | V09 §9 (J-V9.77) |
| V09-0951 | V09 §9 (J-V9.78) |
| V09-0952 | V09 §9 (J-V9.79) |
| V09-0953 | V09 §9 (J-V9.80) |
| V09-0954 | V09 §9 (J-V9.81) |
| V09-0955 | V09 §9 (J-V9.82) |
| V09-0956 | V09 §9 (J-V9.83) |
| V09-0957 | V09 §9 (J-V9.84) |
| V09-0958 | V09 §9 (J-V9.85) |
| V09-0959 | V09 §9 (J-V9.86) |
| V09-0960 | V09 §9 (J-V9.87) |
| V09-0961 | V09 §9 (J-V9.88) |
| V09-0962 | V09 §9 (J-V9.89) |
| V09-0963 | V09 §9 (J-V9.90) |
| V09-0964 | V09 §9 (J-V9.91) |
| V09-0965 | V09 §9 (J-V9.92) |
| V09-0966 | V09 §9 (J-V9.93) |
| V09-0967 | V09 §9 (J-V9.94) |
| V09-0968 | V09 §9 (J-V9.95) |
| V09-0969 | V09 §9 (J-V9.96) |
| V09-0970 | V09 §9 (J-V9.97) |
| V09-0971 | V09 §9 (J-V9.98) |
| V09-0972 | V09 §9 (J-V9.99) |
| V09-0973 | V09 §9 (J-V9.100) |
| V09-0974 | V09 §9 (J-V9.101) |
| V09-0975 | V09 §9 (J-V9.102) |
| V09-0976 | V09 §9 (J-V9.103) |
| V09-0977 | V09 §9 (J-V9.104) |
| V09-0978 | V09 §9 (J-V9.105) |
| V09-0979 | V09 §9 (J-V9.106) |
| V09-0980 | V09 §9 (J-V9.107) |
| V09-0981 | V09 §9 (J-V9.108) |
| V09-0982 | V09 §9 (J-V9.109) |
| V09-0983 | V09 §9 (J-V9.110) |
| V09-0984 | V09 §9 (J-V9.111) |
| V09-0985 | V09 §9 (J-V9.112) |
| V09-0986 | V09 §9 (J-V9.113) |
| V09-0987 | V09 §9 (J-V9.114) |
| V09-0988 | V09 §9 (J-V9.115) |
| V09-0989 | V09 §9 (J-V9.116) |
| V09-0990 | V09 §9 (J-V9.117) |
| V09-0991 | V09 §9 (J-V9.118) |
| V09-0992 | V09 §9 (J-V9.119) |
| V09-0993 | V09 §9 (J-V9.120) |
| V09-0994 | V09 §9 (J-V9.121) |
| V09-0995 | V09 §9 (J-V9.122) |
| V09-0996 | V09 §9 (J-V9.123) |
| V09-0997 | V09 §9 (J-V9.124) |
| V09-0998 | V09 §9 (J-V9.125) |
| V09-0999 | V09 §10 (the pointer table's lead: the text is the base's, file f) |
| V09-1000 | V09 §10 (BCR-V9-1 → item 514) |
| V09-1001 | V09 §10 (BCR-V9-2 → items 458, 515) |
| V09-1002 | V09 §10 (BCR-V9-3 → item 277) |
| V09-1003 | V09 §10 (BCR-V9-4 → — (superseded by J-V9.36)) |
| V09-1004 | V09 §10 (BCR-V9-5 → item 460) |
| V09-1005 | V09 §10 (BCR-V9-6 → — (superseded by J-V9.33)) |
| V09-1006 | V09 §10 (BCR-V9-7 → item 411) |
| V09-1007 | V09 §10 (BCR-V9-8 → item 516) |
| V09-1008 | V09 §10 (BCR-V9-9 → item 517) |
| V09-1009 | V09 §10 (BCR-V9-10 → item 461) |
| V09-1010 | V09 §10 (BCR-V9-11 → item 462) |
| V09-1011 | V09 §10 (BCR-V9-12 → item 463) |
| V09-1012 | V09 §10 (BCR-V9-13 → item 360) |
| V09-1013 | V09 §10 (BCR-V9-14 → item 453) |
| V09-1014 | V09 §10 (BCR-V9-15 → item 454) |
| V09-1015 | V09 §10 (BCR-V9-16 → item 348) |
| V09-1016 | V09 §10 (BCR-V9-17 → item 494) |
| V09-1017 | V09 §10 (BCR-V9-18 → item 530) |
| V09-1018 | V09 §10 (BCR-V9-19 → item 269) |
| V09-1019 | V09 §10 (BCR-V9-20 → item 278) |
| V09-1020 | V09 §10 (BCR-V9-21 → item 361) |
| V09-1021 | V09 §10 (BCR-V9-22 → item 372) |
| V09-1022 | V09 §10 (BCR-V9-23 → item 464) |
| V09-1023 | V09 §10 (BCR-V9-24 → item 490) |
| V09-1024 | V09 §10 (BCR-V9-25 → item 413) |
| V09-1025 | V09 §10 (BCR-V9-26 → item 362) |
| V09-1026 | V09 §10 (BCR-V9-27 → item 465) |
| V09-1027 | V09 §10 (BCR-V9-28 → item 466) |
| V09-1028 | V09 §10 (BCR-V9-29 → item 363) |
| V09-1029 | V09 §10 (BCR-V9-30 → item 246) |
| V09-1030 | V09 §10 (BCR-V9-31 → item 447) |
| V09-1031 | V09 §10 (BCR-V9-32 → item 455) |
| V09-1032 | V09 §10 (BCR-V9-33 → items 244, 364) |
| V09-1033 | V09 §10 (BCR-V9-34 → item 467) |
| V09-1034 | V09 §10 (BCR-V9-35 → item 570) |
| V09-1035 | V09 §10 (BCR-V9-36 → item 583) |
| V09-1036 | V09 §13 (XV-V9-1, routed to V11 §4.2; cross-part note) |
| V09-1037 | V09 §13 (XV-V9-2, routed to V11 §4.2; cross-part note) |
| V09-1038 | V09 §13 (XV-V9-3, closed at its destination) |
| V09-1039 | V09 §13 (XV-V9-4, closed at its destination) |
| V09-1040 | V09 §13 (XV-V9-5, closed at its destination) |
| V09-1041 | V09 §13 (XV-V9-6, closed at its destination) |
| V09-1042 | V09 §13 (XV-V9-7, closed at its destination) |
| V09-1043 | V09 §13 (XV-V9-8, closed at its destination) |
| V09-1044 | V09 §13 (XV-V9-9, closed at its destination) |
| V09-1045 | V09 §13 (XV-V9-10, closed at its destination) |
| V09-1046 | V09 §13 (XV-V9-11, closed at its destination) |
| V09-1047 | V09 §13 (XV-V9-12, closed at its destination) |
| V09-1048 | V09 §13 (XV-V9-13, closed at its destination) |
| V09-1049 | V09 §13 (XV-V9-14, closed at its destination) |
| V09-1050 | V09 §13 (XV-V9-15, closed at its destination) |
| V09-1051 | V09 §13 (XV-V9-16, closed at its destination) |
| V09-1052 | V09 §13 (XV-V9-17, closed at its destination) |
| V09-1053 | V09 §13 (XV-V9-18, closed at its destination) |
| V09-1054 | V09 §13 (XV-V9-19, closed at its destination) |
| V09-1055 | V09 §13 (XV-V9-20, closed at its destination) |
| V09-1056 | V09 §13 (XV-V9-21, closed at its destination) |
| V09-1057 | V09 §13 (XV-V9-22, closed at its destination) |
| V09-1058 | V09 §13 (XV-V9-23, closed at its destination) |
| V09-1059 | V09 §13 (XV-V9-24, closed at its destination) |
| V09-1060 | V09 §13 (XV-V9-25, closed at its destination) |
| V09-1061 | V09 §13 (XV-V9-26, closed at its destination) |
| V09-1062 | V09 §13 (XV-V9-27, closed at its destination) |
| V09-1063 | V09 §13 (XV-V9-28, closed at its destination) |
| V09-1064 | V09 §13 (XV-V9-29, closed at its destination) |
| V09-1065 | V09 §13 (XV-V9-30, closed at its destination) |
| V09-1066 | V09 §13 (XV-V9-31, closed at its destination) |
| V09-1067 | V09 §11 |
| V09-1068 | V09 §11 (answered: J121, J122) |
| V09-1069 | V09 §11 (answered: J121, J122) |
| V09-1070 | V09 §11 (answered: J121, J122) |
| V09-1071 | dropped as history; V09 §12 states the evidence anew |
| V09-1072 | dropped as history; V09 §12 states the evidence anew |
| V09-1073 | V09 §13 (no open item; the four other-mechanism fixes are J-V9.38, .39, .53, .36 in V09 §9) |
| V09-1074 | V09 §3.5, V09 §4.9, V09 §4.20.9 (IN-V09-1, -2 folded; J-VI.4 bends) |
| V09-1075 | V09 §IN, cites V02 §8.3 |
| V09-1076 | V09 §IN, cites V12 §IN |
| V09-1077 | V09 §4.20.6, V09 §3.5 (IN-V09-13, -14 folded) |
| V09-1078 | V09 §4.16 (3), V09 §9 (J-V9.125) |
| V09-1079 | V09 §1.1 (the term's home) |
| V09-1080 | V09 §2.2 (the term's home) |
| V09-1081 | V09 §4.2 (the term's home) |
| V09-1082 | V09 §4.2 (the term's home) |
| V09-1083 | V09 §2.4 (the term's home) |
| V09-1084 | V09 §3.3 (the term's home) |
| V09-1085 | V09 §2.5 (the term's home) |
| V09-1086 | V09 §3.3 (the term's home) |
| V09-1087 | V09 §2.9 (the term's home) |
| V09-1088 | V09 §5.5 (the term's home) |
| V09-1089 | V09 §4.20.7 (the term's home) |
| V09-1090 | V09 §4.20.8 (the term's home) |
| V09-1091 | V09 §3.6 (the term's home) |
| V09-1092 | V09 §3.7 (the term's home) |
| V09-1093 | V09 §2.8 (the term's home) |
| V09-1094 | V09 §3.8 (the term's home) |
| V09-1095 | V09 §3.2 (the term's home) |
| V09-1096 | V09 §2.10 (the term's home) |
| V09-1097 | V09 §2.7 (the term's home) |
| V09-1098 | V09 §2.7 (the term's home) |
| V09-1099 | V09 §3.15 (the term's home) |
| V09-1100 | V09 §5.4 (the term's home) |
| V09-1101 | V09 §4.17.2 (the term's home) |
| V09-1102 | V09 §4.17.4 (the term's home) |
| V09-1103 | V09 §4.20.3 (the term's home) |
| V09-1104 | V09 §2.10 (the term's home) |
| V09-1105 | V09 §4.10 (the term's home) |
| V09-1106 | V09 §3.14 (the term's home) |
| V09-1107 | V09 §2.11 (the term's home) |
| V09-1108 | V09 §4.16 (the term's home) |
| V09-1109 | V09 §3.12 (the term's home) |
| V09-1110 | V09 §7.3 (the term's home) |
| V09-1111 | V09 §7.2 (the term's home) |
