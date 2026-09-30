# Rewrite — design volume V04 (the underground)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V04; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V04`, 2026-09-29 → 2026-09-30)
- P1 inputs gathered (canon unit V04: 275 STATE, 40 REFERENCE, 46 BCR pointers, 12 conflicts, 59 f items, g 113, 6 wiring gaps, 4 elegance, 4 id rulings, 59 open findings, 31 hand-offs, 4 disagreements, 52 U + 62 T edges, 62 combinations; inventory 360 ids): done
- P2 head, §0, §1: done (parts/00-head-s0-s1.md)
- P3 §1b: done (parts/01-s1b.md)
- P4 §2: done (parts/02-s2.md)
- P5 §3.1–§3.4: done (parts/03-s3-1-4.md; cloud resume 2026-09-30)
- P6 §3.5: done (parts/04-s3-5.md; parts 01/02 patched for item 113 (e) `lostAt`, `formerRiseMinCm`, arch-vault-only `gradeFaces`)
- P7 §3.6–§3.13 (edges table): done (parts/05, 06)
- P8 §4–§6: done (parts/07, 08)
- P9 §7–§8: done (parts/09, 10)
- P10 §9–§13, integration notes: done (parts/11, 12)
- P11 assemble, verify ids, references, terms, sizes: done
- P12 report (mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done

Source: `docs/volumes/V04-underground.md` (4 168 lines, 83 966 words). Output:
`docs/validation/coherence/new/volumes/V04-underground.md` (71 018 words). Working parts:
`docs/validation/coherence/work/rewrite-V04/parts/` (00–12); the mechanical tool and patch lists beside them
(`tools/mech.py`, `tools/patch.py`, `patches/`).

## 1. Sizes

| part of the volume | words before | words after | what moved |
|---|---|---|---|
| head (title, banners, PROGRESS and revision ledgers, how to read) | 1 635 | ≈ 170 | 11 banner lines and the ledgers → the one marker line (V04-NARR-1, -2) |
| §0 – §1b | ≈ 7 400 | 10 035 | §1b rebuilt as the full wiring table (W-IF-01's providers, `gradeFaces`, `ExcavationRecord`, `BuriedFormer.lay`, the dossier-change paragraph) |
| §2 | ≈ 9 500 | 7 027 | V11-owned values cited, not restated (V04-RESTATE-1, -3; RESTATEMENTS-012, -013); V04-ICONF-1's row dropped; the access-state set and `ExcavationRecord` added |
| §3 | 23 521 | 27 441 | restated base laws and V11 values → citations; critique tags out; E-03's sites cite §6.1; added: g item 113 at build depth (the lost reading, `BuriedFormer.lay`), `gradeFaces`, the L5 release, the oasis rule, §3.13's edge and combination tables (2 666 words) |
| §4 – §6 | 6 970 | 7 556 | §4.5 rebuilt with the providers (W-IF-01, V04-WGAP-5); item 113's rows; §6's round-labelled paragraph folded (V04-NARR-3); SLR6-02's switch row |
| §7 | 4 958 | 5 777 | T-V4-28, -34, -43, -44, -48, -50 – -52, -54, -58, -59, -62, -69, -73 reworded to their rulings and hand-offs; T-V4-76 – T-V4-79 added |
| §8 | 3 106 | 3 231 | J122's decided slot; item 113 and the providers priced; narration tags out |
| §9 | 7 363 | 7 809 | narration out (V04-NARR-5), E-24's marks, J-V4.122 – J-V4.127 added |
| §10 | 6 840 | 894 | 46 requests → one pointer table to file f's items (ID-BCR) |
| §11 | 330 | ≈ 110 | Q1, Q2 answered (J122) |
| §12 | 2 694 | 934 | round records out (V04-NARR-7); every reasoned assumption kept |
| §13, the integration and reconciliation notes | 7 996 | ≈ 360 | the Fix list closed; IN-V04-1 – 14 folded into the body; the round records left to the validation files |
| **total** | **83 966** | **71 018** (−15.4 %) | |

**Sources of the words removed (≈ 20 500 removed, ≈ 7 500 added):** narration ≈ 11 300 (the banners and ledgers, the
reconciliation and finalization sections, §12's and §13's round records, critique and seam tags, "amended by round n"
clauses); restatement ≈ 7 000 (§10's 46 request texts → pointers; restated base laws — the ossuary law, the capacity law,
the persistence rate, `ambient.underground`, `accessReachM`, the basement floor, `supportFoundationCm`, `vaultCap` — and
V11's cell values); duplicated mechanisms ≈ 300 (E-03's five draw restatements; V04-DUP-1's opening-pass list stated
once); verbose prose ≈ 1 900 (§11, §12, §6, §8). **Why below the 25–40 % band:** the additions the canon routes here
are new design at build depth — g item 113's V04 part (≈ 1 600 words), the edge and combination tables (≈ 2 700), four
new bars (≈ 900), the clerk's providers (≈ 550), six new decisions (≈ 800) — and §1b – §8 are dense normative text in
which every sentence carries a rule, value, case or bar the guard forbids thinning. Without the ruled additions the
volume would stand at ≈ 63 500 words (−24 %). Sections shrinking by more than half (§10, §11, §12, §13 and the notes)
lost only narration and pointer-replaced restatement; the verifier's nuance audit is the mapping table (§13 below: every
inventory id placed).

## 2. What the volume states, references and applies

* **States once** (its canonical home): its ten engines' steps and constants, its records (`AccessCause`, `RuinRecord`,
  `CatacombComplex`, the access-state set `Excavation`, `ExcavationRecord`), its rule tables' schema and own values, the
  dossier row sets, the lineage keys, the lifecycle rows of its fields, its view, marks, labels and exports, its edges and
  meeting outcomes, its bars T-V4-1 – T-V4-79 and decisions J-V4.1 – J-V4.127.
* **References** (the 40 REFERENCE ids and every other base or volume fact): §2.3's `Outfall`, §2.4's junctions, §2.5's
  `District.core`, §2.7's tunnels, chambers and `HistoryRecord`, §4.1 *The tail*, §4.11's persistence rows and replay, §6.1's
  fixed-key draws, §7.4's lifecycle rows, §7.7's DR rows, §8.2's programs, §8.4's view fields, II.7.1 – II.7.6's rules,
  §11.1's formats, §16's totals; V01 §3.7.1, §3.10.1, §3.15, §3.16; V02 §3.15, §3.17; V03 §3.7.4, §3.12; V06 §3.2, §3.18;
  V08 §2.6a; V11 §3.23, §3.24; V12 §3.6b, §3.11.
* **File f items concerning it, cited as base text (59):** 205, 207, 208, 212, 229, 238, 239, 243, 244, 245, 247, 248,
  249, 250, 252, 278, 281, 291, 306, 309, 319, 325, 330, 338, 355, 372, 386, 403, 404, 407, 413, 414, 423, 445, 452, 475,
  484, 485, 505, 526, 548, 549, 551, 552, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 568, 573, 574 — each
  cited at the section that reads it; V04 §10's pointer table maps every request to its item(s).
* **File g item 113 (the canon's V04 part), written at build depth as an addition, never a change of another
  decision.** (e) access through open links only and the LOST state — V04 §2.2 (`Excavation` with `lost`;
  `ExcavationRecord.reached`, `.lostAt`), §2.6 (lifecycle rows), §3.5.7 (g) (the physical open-link reading, the record's
  writes, the vacating and the return), §3.4 F6, §3.6 C1, §3.7 L1, §3.8, §3.10, §4.1, §4.3, §4.5, §4.6, §5.1, §5.2, §5.5,
  T-V4-78 (b)–(e), J-V4.122; (c) the buried former-town ruins derived from the former geometry at their old ground level —
  V04 §2.3 (the `former*` cells, `formerRiseMinCm` new), §2.5 (keys), §3.5.0 (the `buried` row), §3.5.5 (b)
  (`BuriedFormer.lay`: the rise, the elements, older than the town, reach, return), §3.10, §3.11, §5.2, §5.4, §5.5, §6,
  T-V4-78 (a), J-V4.123; (d) sewers reopen in the replay (V04 §3.10; J-V4.29). V04-MISSING-1 closed.
* **Items 114 and 115** were not in `docs/AMENDMENTS-2026-09-28g.md` when this lane landed (checked at its start and
  before LANDED: the file ends at item 113). Item 115 (the islands gate) has no underground part (V04 never reads the sky
  layer, V04 §1.2). Item 114 (the economy slider as a map-wide prosperity ceiling at the first generation) reaches the
  underground only through the ground prosperity field F2 and C5 inherit (J-V4.51) and needs no V04 text; cross-part
  note 14 records it for the canon.

## 3. Conflicts resolved (12)

| ruling | where it is applied |
|---|---|
| MC-11 (`Outfall` declared in the base) | V04 §2.1 reads `Outfall`/`OutfallInto` at §2.3; §1b.1's row names its home |
| V04-ICONF-1 | V04 §2.6 drops its `AccessPoint.state` row and cites §7.4's as item 555 amends it; §10's BCR-V4-21 row |
| V04-ICONF-2 | J-V4.114 is the one pricing decision; J-V4.71, J-V4.94, J-V4.104 carry "superseded by J-V4.114", their stale figures gone |
| V04-ICONF-3 | V04 §5.5's portal rule governs; T-V4-28 reworded to it; §10's BCR-V4-16 row records it for item 452 |
| V04-ICONF-4 | the stale "a catacomb reading its source church's name" gone; V04 §5.4 governs; §10's BCR-V4-18 row |
| V04-ICONF-5 | V04 §3.5.0a (5a) states once: heights from V11's `stepped-shrine` row, the ST0 retry with `clearM` halved, `W_RUIN_MONUMENT_SKIPPED`, a `TierFailure` truncating to the tiers laid in `lay.truncated`, `standing` the decay's reading only; IN-V04-2 dropped |
| V04-XCONF-1 | `showUnexcavated` out of §1b.3's `setLayer` row; view keys never undone (§1b.3's closing line) |
| V04-XCONF-2 | V04 §5.1 cites §14's keymap precedence (a plan open → the storey; else the band) |
| V04-XCONF-3 | T-V4-50 gains the elaboration-independence clause (V03's T-V3-23 (g)); V03's hand-off closed there |
| V07-XCONF-2 | the span rule's `country` reason is the base's (§2.7, item 244; J-C4); V04 §3.5.4 (d) reads it; T-V4-62's clause; §10's BCR-V4-45 row |
| CANON-C03 | V04 §11 is a decided table (J122); J121's subjects follow SettlementForge |
| CANON-C04 | INDEX §7's V04 items fixed: SLR6-02 (V04 §6's switch-edit budget), SLR6-03 (§12's hedge gone; J-V4.121 cites §7.4's `editTable` row), SCC-113 (J-V4.93 and J-V4.118 name `raisedWays.structure.span.*` and the staged forms) |

## 4. Wiring gaps closed (6)

| gap | closed at |
|---|---|
| W-DOS-10c | V04 §1b.5: the water system's row cites DR34, the age and scars row DR37 (the replay's history row) |
| W-IF-01 | V04 §1b.2: the `WhyProvider` and the `underground` `WhySectionProvider` (implementer `@plat/under`; callers V10's `why`, V09's card and panels) and `catacombOutcome`; V04 §4.5 their rows and `info.under.*` keys; T-V4-79 |
| W-HOOK-02 | V04 §1.2 names the staged records V04 builds (`Tunnel`, `UndergroundSystem`, `Gallery`, `Chamber`, `UndergroundLink`) with their base home (items 247–250); the model editor's §2.6/§2.7 name V04 |
| V04-WGAP-2 | T-V4-78 (b)–(d) (a fade seal of a last way, a reopen or new dig, the undo after a save and load, the reload of unexcavated and lost clusters); T-V4-73 (d) |
| V04-WGAP-3 | V04 §1b.1 lists `W_RUIN_SOURCE_REMOVED` among the §5.4 codes; §10's BCR-V4-41 row; cross-part note 2 |
| V04-WGAP-4 | `gradeFaces(chamberId)` homed at V04 §3.5.4 (f) (type, producer, readers; §2.6's lifecycle row), J-V4.127, T-V4-62; cross-part note 5 |

## 5. Elegance rulings applied (principle (9)), equivalence lists ticked

* **E-03 UNIFY — the fixed-key draw.** Each site cites §6.1 *Fixed-key draws* and states only its stream, key parts,
  chance, comparison moments and persistence: V04 §3.5.1 (3) (catacomb source), §3.5.7 (a) (overlap shaft), (c) (crypt
  join), (d) (dig), (e) (public opening); §3.12 keeps the exception list. ☑ the catacomb source compared again at each
  derivation against the rung's chance ("a face that failed at TOWN may form its complex when the settlement reaches
  CITY", V04 §3.5.1 (3); §3.12); ☑ the overlap shaft its own key (the pair, `shaft`) and chance row
  (`overlapShaftChance`); ☑ the crypt join's own/other split (`cryptJoin.own`, `.other`); ☑ the dig: a made access
  persists, one appears when the chance later rises (V04 §3.5.7 (d)); ☑ the public opening's candidate order kept (V04
  §3.5.2's, §3.5.0a's, then the former settlement's); ☑ §3.12's exception list kept verbatim as the pattern's exceptions.
* **E-16 UNIFY — `tint`/`vignette`/`lights`.** V04 names none of the renamed mechanisms (grep: 0 hits); its programs are
  the base's `ruinMasonry` and `unexcavated` (§8.2), so named in V04 §5.2 and §10. ☑ nothing of V04's changes meaning.
* **E-24 UNIFY — one mark for superseded or amended decisions.** "superseded by J-V4.114" on J-V4.71, J-V4.94 and
  J-V4.104; "amended by J-V4.72" on J-V4.6; "amended by J-V4.122" on J-V4.53; "amended by J-V4.123" on J-V4.62. ☑ no row
  dropped; ☑ each governing row keeps its reason.
* **E-39 KEEP APART — closure and decline states.** V04 §2.2's `Excavation` (unexcavated, accessible, lost) is the
  access-state set g item 113 (e)'s LOST joins, stated apart from the way decline ladder, the stretch condition and the
  building lifecycle (the comment on the type): it differs in scope (a cluster), values, transitions and writer (U-ACCESS).
* No unification the canon did not rule.

## 6. Id rulings, renumberings and terms

* **ID-BCR:** V04's bare `BCR-n` → `BCR-V4-n` (n kept, 1–46), listed in V04 §10. In the body a citation of an applied
  request is its file f item (e.g. `BCR-5` → item 325); another volume's applied request likewise (BCR-V2-28 → 226,
  BCR-V2-39 → 229, BCR-V3-20 → 238, BCR-V3-21 → 239, BCR-V5-26 → 253, BCR-V5-30 → 309, BCR-V6-26 → 291, BCR-V6-28 → 574,
  BCR-V7-27 → 565, BCR-V9-20 → 278, BCR-V9-22 → 372, BCR-V10-3 → 270); V01's `BCR-43` → BCR-V1-43.
* **ID-DR:** DR-V8.2 → DR30, DR-V8.3 → DR31, DR-V8.4 → DR32, DR-V8.7 → DR34, DR-V6.1 / DR-V8.6 → DR28; the history rows
  DR36 – DR39 as the determinism editor numbered them.
* **ID-WX:** other volumes' local rows cited with their volume (V06 W65, V12's X-V12-15, V09's XV-V9-4); the IN-V04-n
  notes folded, their ids kept only in this report.
* **ID-DUPDEF:** T-V4-1 – T-V4-79 and J-V4.1 – J-V4.127 each defined once, none missing (checked by script); every
  `T-V4-n` and `J-V4.n` cited exists.
* **New ids:** T-V4-76 (the edge suite), T-V4-77 (the combination suite), T-V4-78 (history underground: T113-4, T113-5),
  T-V4-79 (the clerk's providers); J-V4.122 – J-V4.127; the edge rows EU-01 – EU-22.
* **Self-references:** every V04 section cited `V04 §n` (V04-BREF-1); every `V04 §` pointer resolves to a heading or a
  numbered paragraph (checked by script).
* **Terms (G-list):** first paint → first map (13 hits, 0 left); `V4 §`, `V1-3.7.1` … → `Vnn §` (0 left); "hood
  document", "a lone neighbourhood" → standalone neighbourhood document (G-standalone); `LayerSpec.showUnexcavated` → the
  view key `showUnexcavated` (G-unexcavated); DR aliases (G-DR, 0 left); "the underground lottery" → the underground's
  strike draw (G-strike); the ruin and unexcavated styles → the base's `ruinMasonry` and `unexcavated` programs.

## 7. Open findings closed (59) — every one FIXED in the text

| finding | fixed at |
|---|---|
| VOL-V03-V04-RESTATEMENTS-005 | P2 cites §4.2 S2 for the dense core's plot share (V04 §3.3) |
| VOL-V03-V04-RESTATEMENTS-006 | P4 cites II.7.3 for the capacity law and the minimum depth (V04 §3.3); §2.4's comment cites it (part 02) |
| VOL-V03-V04-RESTATEMENTS-007 | U-FADE cites §4.11's persistence table and `underground` row (V04 §3.10) |
| VOL-V03-V04-RESTATEMENTS-008 | V04 §5.3 cites §8.4 for `ambient.underground` |
| VOL-V03-V04-RESTATEMENTS-009 | V04 §3.5.7 (c) cites II.7.6 for `accessReachM`, (d) §2.6 for the basement floor; §3.8 likewise |
| VOL-V03-V04-RESTATEMENTS-010 | V04 §3.5.0 and §6 cite item 244 for `raised.supportFoundationCm` and `vaultCap` |
| VOL-V03-V04-RESTATEMENTS-011 | V04 §3.5.1 (2) cites II.7.6's ossuary law (items 560, 564), keeping only its per-stage share and the epoch's additions |
| VOL-V03-V04-RESTATEMENTS-012 | V04 §2.3 cites V11 §3.23.8 for `growthCapShare`; §3.5.1 (6) keeps the compounding rule; §3.10 and T-V4-52 cite §3.5.1 (6) |
| VOL-V03-V04-RESTATEMENTS-013 | V04 §2.3 keeps the schema and names V11 §3.23 / §3.24 as the owner of those rows' values; §3.5's inline V11 values removed |
| VOL-V03-V04-RESTATEMENTS-014 | the base total is not restated (V04 §11 cites §16 through J122's answer) |
| V04-RESTATE-1 | as RESTATEMENTS-012 |
| V04-RESTATE-2 | as RESTATEMENTS-014 |
| V04-RESTATE-3 | as RESTATEMENTS-013 |
| V04-DUP-1 | the opening pass's list stated once at V04 §3.10 *The opening pass*; §1b.2, §3.1's T6 row, §3.11 and §4.3 cite it |
| V04-ICONF-1 | conflict ruling (§3 above) |
| V04-ICONF-2 | conflict ruling (§3 above) |
| V04-ICONF-3 | conflict ruling (§3 above) |
| V04-ICONF-4 | conflict ruling (§3 above) |
| V04-ICONF-5 | conflict ruling (§3 above) |
| V04-XCONF-1 | conflict ruling (§3 above) |
| V04-XCONF-2 | conflict ruling (§3 above) |
| V04-XCONF-3 | conflict ruling (§3 above) |
| V04-ELEG-1 | E-03 (§5 above) |
| V04-EDGE-1 | V04 §3.7 L5's release, §4.4, §1b.5's dossier-change paragraph, J-V4.124, T-V4-34's release clause (EI-V04-EDGE-1) |
| V04-EDGE-2 | V04 §3.5.7 (g)'s open-link reading with item 113 (e), J-V4.122, T-V4-78 (e) (EI-V04-EDGE-2) |
| V04-WGAP-1 | V04 §1b.5's age and scars row names DR37 and the former settlement's DR36, DR38, DR39 |
| V04-WGAP-2 | wiring (§4 above) |
| V04-WGAP-3 | wiring (§4 above) |
| V04-WGAP-4 | wiring (§4 above) |
| V04-WGAP-5 | V04 §1b.2's provider rows, §4.5's providers, T-V4-79; IN-V04-7, -8 folded |
| V04-MISSING-1 | g item 113's V04 part at build depth (§2 above) |
| V04-MISSING-2 | V04 §11 (Q1, Q2 answered, J122); §8's slot sentence; §10's BCR-V4-13 row points at item 526 with §16's totals computed once (item 568) |
| V04-TERM-1 | ID-BCR and the `V04 §n` form (§6 above) |
| V04-DEFER-1 | V04 §8 *Where it slots* writes the decided order (right after M5, beside it with a second pair; §16, INDEX §4); J-V4.46 |
| V04-NARR-1 | one marker line under the title |
| V04-NARR-2 | PROGRESS, REVISION, RECONCILIATION and SECOND-ROUND ledgers removed |
| V04-NARR-3 | §6's paragraph re-headed *Epochs and the small steps*, its rows kept |
| V04-NARR-4 | test tags (C4-, SL-, ST-, SLR-, TR-, TT-, SCC-) removed from §7 and the body (0 left, grep) |
| V04-NARR-5 | decisions in their final form (§9); E-24's marks where one supersedes or amends another |
| V04-NARR-6 | §10 is a pointer table; the amendment narration gone |
| V04-NARR-7 | IN-V04-1 – 14 folded; one CONFIRMED/PLAUSIBLE list (§12); round records left to the validation files |
| V04-BREF-1 | every self-reference `V04 §n` (§6 above) |
| SLR6-02 | V04 §6 *Edits*: the stage-2 switch's edit priced (§12.6's *re-derive* row for V01's re-derivation plus the tail's p95) |
| SLR6-03 | V04 §12's hedge gone; J-V4.121 cites §7.4's `editTable` row |
| SCC-113 | J-V4.118 and J-V4.93 name `raisedWays.structure.span.*` (V11 §3.24.2) and confirm at V12's staged forms (T-V4-62 at `'V4-U3'`, the panel M4's M4-110 group, the V4-U5 panel); §8's fallbacks table |
| V04:IN-V04-1 | V04 §2.3, §3.5.1 (6) |
| V04:IN-V04-2 | V04 §3.5.0a (5a) (ICONF-5's ruling), §3.5.4 (d) (the soffit V02's `vaultClamp` reads) |
| V04:IN-V04-3 | V04 §3.5.7 (d) (the wing key), §3.5.1 (4) (V02's footprint and basement floor) |
| V04:IN-V04-4 | V04 §3.5.4 (f) `gradeFaces`, J-V4.127 |
| V04:IN-V04-5 | V04 §3.5.4 (d) (2) |
| V04:IN-V04-6 | V04 §3.5.0a (1), §3.5.1 (3), §3.5.2 (DR30–DR32) |
| V04:IN-V04-7 | V04 §4.5 (`under/wayIn`, the `catacomb` why path), §5.2 (symbol by `cause.rule`) |
| V04:IN-V04-8 | V04 §4.5 (`catacombOutcome`, the section provider's rows, the catalogue keys), §1b.2 |
| V04:IN-V04-9 | V04 §3.5.4 (e) |
| V04:IN-V04-10 | V04 §3.5.4 (d) |
| V04:IN-V04-11 | V04 §1b.1, §1b.3, §2.6, §5.1; §10's BCR-V4-10 row |
| V04:IN-V04-12 | V04 §8 (M6-U throughout) |
| V04:IN-V04-13 | as IN-V04-11 |
| V04:IN-V04-14 | V04 §3.5.0 (the raised-way piers of item 244's support step) |

## 8. Hand-offs closed at this destination (31)

| hand-off | closed at |
|---|---|
| V02:X12 | V04 §3.5.7 (d) (the dig key carries a mutator wing's key), §3.5.1 (4) (V02's footprint and basement floor) |
| V06:X1 | V04 §3.5.1 (5)–(6) (V11's `growthCapShare` per year compounded; the derived primary; `opts`) |
| V06:X2 | V04 §3.5.7 *With a scope*, §3.10 (`under.access`; U-FADE's vacating returns households displaced, cause `void`; U-NET laid whole at the first sewers epoch) |
| V06:X14 | V04 §3.5.4 (d) (`ArchVaults.reconcile` over `EpochScope.raised`), §3.10 (the wall drops over `scope.levelled`), §3.5.5 (a) (the tombstoned walls as steps) |
| V06:X25 | V04 §1b.2, §3.5.0 *At an epoch*, §3.10 (`Foundations.apply`) |
| V06:X29 | item 573 (`CalamityRef.deaths`) read by V04 §3.5.1 (2), (5), §1b.5 |
| V06:X33 | V04 §3.10 *Access closures* (the batch in which a host leaves its `fallen_island` decoration; T-V4-73 (c)) |
| V07:FL-2 | V04 §2.2 (`'rung'`), §3.5.1 (3) (`v.parish_church`), §3.1 (the maintenance mode) |
| V07:FL-3 | the span rule's `country` reason (§2.7, item 244; J-C4) read by V04 §3.5.4 (d); T-V4-62 |
| V08:X3 | V04 §3.5.1 (2), (5); §1b.5 |
| V08:X13 | V04 §3.5.0a (1) (`site.ruinEvidence`, DR30), §3.5.2 (DR31), §3.5.1 (3) (DR32) |
| V09:XV-V9-3 | V04 §1b.1, §1b.3, §2.6, §5.1 (the view key); §10's BCR-V4-10 row |
| V09:XV-V9-4 | V04 §4.5 (`under/wayIn`; the `catacomb` why path), §5.2 (the access symbol by `cause.rule`), §4.1 (item 372's closures) |
| V09:XV-V9-8 | V04 §8 *Where it slots*: V09's AP6 lands with U3, U3b and U4, priced in V09's total and carried beside M6-U's cell by §16 |
| V09:XV-V9-14 | V04 §4.5 (an arch vault's raised way and span; listed at street level, never hidden by the band filter), §5.1 (drawn in the shallowest band) |
| V09:XV-V9-27 | V04 §3.8 (*Voids and bans*, the dwelling closure's way in), §4.1, T-V4-48 (met) |
| V10:CVR-V10-1 | V04 §4.5 (`catacombOutcome`, the `underground` section provider, the catalogue keys), T-V4-79 |
| V10:CVR-V10-10 | V04 §4.5 (rows for an arch vault, a monument, the terminal cistern, a void met by a footing; the knowledge filter on the effects list) |
| V11:X-V11-4 | V04 §2.3 (`CatacombRule.order`; the rows V11 owns cited at V11 §3.23; `growthCapShare` compounded) |
| V11:X-V11-10 | the span rule's `vaultShare` × `era.raisedVaultM` × `culture.raisedVaultM` (item 244; V04 §1.2's hook row); `CultureRow.monument`'s values V11 §3.23.4 (V04 §2.3) |
| V11:X-V11-14 | V04 §3.10: the four participants registered `stage: 'U-FADE'`; §8's register (each step names its readers) |
| V11:X-V11-15 | V04 §1b.1 (the dossier row sets not calibratable) |
| V11:X-V11-17 | J-V4.93, J-V4.118 and §8's fallbacks row name `raisedWays.structure.span.*` (V11 §3.24.2), the values stated once in §2.7 (item 244) |
| V12:X-V12-4 | V04 §7's owner's panel (the V4-U5 sitting) and the item-109 bars as V12 §3.6b's `StatBarSpec`s (T-V4-43, -44, -45, -49, -51, -54, -55, -58) |
| V12:X-V12-11 | T-V4-69 ("off" as V11 §3.24.0's switch table; registered on V12 §3.7.8's engine) |
| V12:X-V12-13 | T-V4-54 (voids, ≤ 3 per town), T-V4-43 and T-V4-58 (the specs' parameters), T-V4-51 (V12 §3.6b's step script; `CatacombComplex.id` keeps its source lineage), T-V4-44 (never reads a monument's tiers) |
| V12:X-V12-16 | V04 §8 *The register at each exit* (met) |
| V12:X-V12-15 | V04 §8: no line names a `bar.T-V4-n` metric, so no `BenchBarDef` (met) |
| V12:X-V12-17 | V04 §8 *The due steps* (the default line's due; `M-CAL/under`) (met) |
| V12:X-V12-18 | no edit needed (confirmed: §8's multi-stage lines are single entries) |
| V12:X-V12-19 | J-V4.118's span row names `raisedWays.structure.span.*` (SCC-113) |

V03's own hand-off to V04 (T-V3-23 (g)'s model-level bar) is closed by T-V4-50 (V04-XCONF-3). The original §13's
outgoing hand-off rows (V03's `AccessHostRow` rows and largest-crypt bar; V11's culture, persistence, rank, `DigRule`,
fungus, fuel and naming rows; V12's bar specs; V06's scheduling; V09's controls; V10's explanations; V08's port side; V05's
`ruin.node` line) are each cited at their home in the body (V04 §1.2, §1.3, §2.3, §3.5.0a (9), §4.5).

## 9. Disagreements (agreement.md) closed (4)

| subject | with | closed |
|---|---|---|
| `T-V3-23` | V03 | T-V4-50's elaboration-independence clause (V04-XCONF-3) |
| `PageDown`, `PageUp` | V03 | V04 §5.1 cites §14's precedence (V04-XCONF-2) |
| `AccessPoint` | determinism | V04 §2.6 cites §7.4's row as item 555 amends it (V04-ICONF-1) |

## 10. Edges and combinations (principle (11)) — every routed one defined, with its rung and its test

Every UNDEFINED or UNTESTED edge routed here is defined by a row of V04 §3.13's edge table (its outcome, where stated, and its ladder rung) and tested by T-V4-76 (one fixture per row and case, every rung and preset, the lifecycle round trip); the degenerate class (E4) by §3.13's lead (the kernel's refusal on the stage's F-class ladder, never a whole-map retry). Every combination is a row of §3.13's meeting table, tested by T-V4-77.

| edge id | section | class | was | now |
|---|---|---|---|---|
| M-V04-551-E5-data | §2.2 | E5-data | UNDE | EU-01 |
| M-V04-551-E8-lifecycle | §2.2 | E8-lifecycle | UNTE | EU-01 |
| M-V04-671-E5-data | §2.3 | E5-data | UNTE | EU-02 |
| M-V04-671-E8-lifecycle | §2.3 | E8-lifecycle | UNTE | EU-02 |
| M-V04-863-E5-data | §2.3a | E5-data | UNTE | EU-02 |
| M-V04-863-E8-lifecycle | §2.3a | E8-lifecycle | UNTE | EU-02 |
| M-V04-892-E5-data | §2.4 | E5-data | UNDE | EU-03 |
| M-V04-914-E5-data | §2.5 | E5-data | UNDE | EU-03 |
| M-V04-914-E8-lifecycle | §2.5 | E8-lifecycle | UNTE | EU-03 |
| M-V04-953-E5-data | §2.6 | E5-data | UNTE | EU-01 (T-V4-76 lifecycle round trip) |
| M-V04-953-E8-lifecycle | §2.6 | E8-lifecycle | UNTE | EU-01 (T-V4-76 lifecycle round trip) |
| M-V04-992-E1-none | §3.1 | E1-none | UNTE | EU-04 |
| M-V04-992-E2-one | §3.1 | E2-one | UNTE | EU-04 |
| M-V04-992-E3-cap | §3.1 | E3-cap | UNTE | EU-04 |
| M-V04-992-E4-degenerate | §3.1 | E4-degenerate | UNDE | EU-04 |
| M-V04-992-E5-data | §3.1 | E5-data | UNTE | EU-04 |
| M-V04-992-E6-rungs | §3.1 | E6-rungs | UNTE | EU-04 |
| M-V04-992-E7-toggles | §3.1 | E7-toggles | UNTE | EU-04 |
| M-V04-992-E8-lifecycle | §3.1 | E8-lifecycle | UNTE | EU-04 |
| M-V04-1051-E6-rungs | §3.2 | E6-rungs | UNDE | EU-05 |
| M-V04-1228-E1-none | §3.3 | E1-none | UNTE | EU-06 |
| M-V04-1228-E2-one | §3.3 | E2-one | UNTE | EU-06 |
| M-V04-1228-E3-cap | §3.3 | E3-cap | UNTE | EU-06 |
| M-V04-1228-E4-degenerate | §3.3 | E4-degenerate | UNDE | EU-06 |
| M-V04-1228-E5-data | §3.3 | E5-data | UNTE | EU-06 |
| M-V04-1228-E6-rungs | §3.3 | E6-rungs | UNTE | EU-06 |
| M-V04-1228-E8-lifecycle | §3.3 | E8-lifecycle | UNDE | EU-06 |
| M-V04-1276-E1-none | §3.4 | E1-none | UNDE | EU-07 |
| M-V04-1276-E4-degenerate | §3.4 | E4-degenerate | UNDE | EU-07 |
| M-V04-1276-E6-rungs | §3.4 | E6-rungs | UNDE | EU-07 |
| M-V04-1892-E1-none | §3.6 | E1-none | UNTE | EU-10 |
| M-V04-1892-E2-one | §3.6 | E2-one | UNTE | EU-10 |
| M-V04-1892-E4-degenerate | §3.6 | E4-degenerate | UNDE | EU-10 |
| M-V04-1892-E5-data | §3.6 | E5-data | UNTE | EU-10 |
| M-V04-1892-E6-rungs | §3.6 | E6-rungs | UNDE | EU-10 |
| M-V04-1892-E8-lifecycle | §3.6 | E8-lifecycle | UNDE | EU-10 |
| M-V04-1962-E5-data | §3.6a | E5-data | UNDE | EU-11 |
| M-V04-1981-E4-degenerate | §3.7 | E4-degenerate | UNDE | EU-12 |
| M-V04-1981-E6-rungs | §3.7 | E6-rungs | UNDE | EU-12 |
| M-V04-1981-E8-lifecycle | §3.7 | E8-lifecycle | UNDE | EU-12 |
| M-V04-2025-E1-none | §3.7a | E1-none | UNDE | EU-13 |
| M-V04-2025-E2-one | §3.7a | E2-one | UNDE | EU-13 |
| M-V04-2025-E4-degenerate | §3.7a | E4-degenerate | UNDE | EU-13 |
| M-V04-2025-E6-rungs | §3.7a | E6-rungs | UNDE | EU-13 |
| M-V04-2041-E1-none | §3.8 | E1-none | UNTE | EU-14 |
| M-V04-2041-E2-one | §3.8 | E2-one | UNTE | EU-14 |
| M-V04-2041-E4-degenerate | §3.8 | E4-degenerate | UNTE | EU-14 |
| M-V04-2041-E5-data | §3.8 | E5-data | UNTE | EU-14 |
| M-V04-2041-E6-rungs | §3.8 | E6-rungs | UNDE | EU-14 |
| M-V04-2041-E8-lifecycle | §3.8 | E8-lifecycle | UNTE | EU-14 |
| M-V04-2110-E1-none | §3.9 | E1-none | UNTE | EU-15 |
| M-V04-2110-E2-one | §3.9 | E2-one | UNTE | EU-15 |
| M-V04-2110-E5-data | §3.9 | E5-data | UNDE | EU-15 |
| M-V04-2110-E6-rungs | §3.9 | E6-rungs | UNDE | EU-15 |
| M-V04-2143-E4-degenerate | §3.10 | E4-degenerate | UNDE | EU-16 |
| M-V04-2266-E1-none | §3.11 | E1-none | UNTE | EU-04 – EU-16 (each ladder rung forced by its row) |
| M-V04-2266-E3-cap | §3.11 | E3-cap | UNTE | EU-04 – EU-16 (each ladder rung forced by its row) |
| M-V04-2266-E4-degenerate | §3.11 | E4-degenerate | UNDE | EU-04 – EU-16 (each ladder rung forced by its row) |
| M-V04-2266-E5-data | §3.11 | E5-data | UNTE | EU-04 – EU-16 (each ladder rung forced by its row) |
| M-V04-2266-E6-rungs | §3.11 | E6-rungs | UNTE | EU-04 – EU-16 (each ladder rung forced by its row) |
| M-V04-2266-E7-toggles | §3.11 | E7-toggles | UNTE | EU-04 – EU-16 (each ladder rung forced by its row) |
| M-V04-2266-E8-lifecycle | §3.11 | E8-lifecycle | UNTE | EU-04 – EU-16 (each ladder rung forced by its row) |
| M-V04-2295-E4-degenerate | §3.12 | E4-degenerate | UNDE | EU-03 |
| M-V04-2295-E5-data | §3.12 | E5-data | UNDE | EU-03 |
| M-V04-2340-E1-none | §4.1 | E1-none | UNDE | EU-17 |
| M-V04-2340-E2-one | §4.1 | E2-one | UNTE | EU-17 |
| M-V04-2340-E4-degenerate | §4.1 | E4-degenerate | UNDE | EU-17 |
| M-V04-2340-E5-data | §4.1 | E5-data | UNTE | EU-17 |
| M-V04-2340-E7-toggles | §4.1 | E7-toggles | UNTE | EU-17 |
| M-V04-2340-E8-lifecycle | §4.1 | E8-lifecycle | UNTE | EU-17 |
| M-V04-2366-E3-cap | §4.2 | E3-cap | UNTE | EU-18 |
| M-V04-2366-E4-degenerate | §4.2 | E4-degenerate | UNDE | EU-18 |
| M-V04-2366-E5-data | §4.2 | E5-data | UNDE | EU-18 |
| M-V04-2366-E8-lifecycle | §4.2 | E8-lifecycle | UNTE | EU-18 |
| M-V04-2385-E1-none | §4.3 | E1-none | UNTE | EU-19 |
| M-V04-2385-E2-one | §4.3 | E2-one | UNTE | EU-19 |
| M-V04-2385-E4-degenerate | §4.3 | E4-degenerate | UNDE | EU-19 |
| M-V04-2385-E5-data | §4.3 | E5-data | UNTE | EU-19 |
| M-V04-2385-E6-rungs | §4.3 | E6-rungs | UNDE | EU-19 |
| M-V04-2385-E7-toggles | §4.3 | E7-toggles | UNTE | EU-19 |
| M-V04-2385-E8-lifecycle | §4.3 | E8-lifecycle | UNTE | EU-19 |
| M-V04-2409-E5-data | §4.4 | E5-data | UNDE | EU-19 |
| M-V04-2409-E8-lifecycle | §4.4 | E8-lifecycle | UNTE | EU-19 |
| M-V04-2422-E1-none | §4.5 | E1-none | UNDE | EU-20 |
| M-V04-2422-E2-one | §4.5 | E2-one | UNDE | EU-20 |
| M-V04-2422-E8-lifecycle | §4.5 | E8-lifecycle | UNDE | EU-20 |
| M-V04-2441-E1-none | §4.6 | E1-none | UNTE | EU-19 |
| M-V04-2441-E2-one | §4.6 | E2-one | UNTE | EU-19 |
| M-V04-2441-E3-cap | §4.6 | E3-cap | UNTE | EU-19 |
| M-V04-2441-E5-data | §4.6 | E5-data | UNTE | EU-19 |
| M-V04-2441-E7-toggles | §4.6 | E7-toggles | UNTE | EU-19 |
| M-V04-2441-E8-lifecycle | §4.6 | E8-lifecycle | UNTE | EU-19 |
| M-V04-2467-E5-data | §4.7 | E5-data | UNDE | EU-21 |
| M-V04-2489-E1-none | §5.1 | E1-none | UNTE | EU-22 |
| M-V04-2489-E2-one | §5.1 | E2-one | UNTE | EU-22 |
| M-V04-2489-E5-data | §5.1 | E5-data | UNTE | EU-22 |
| M-V04-2489-E6-rungs | §5.1 | E6-rungs | UNTE | EU-22 |
| M-V04-2489-E7-toggles | §5.1 | E7-toggles | UNDE | EU-22 |
| M-V04-2509-E1-none | §5.2 | E1-none | UNDE | EU-22 |
| M-V04-2509-E2-one | §5.2 | E2-one | UNDE | EU-22 |
| M-V04-2509-E4-degenerate | §5.2 | E4-degenerate | UNDE | EU-22 |
| M-V04-2509-E5-data | §5.2 | E5-data | UNTE | EU-22 |
| M-V04-2509-E6-rungs | §5.2 | E6-rungs | UNDE | EU-22 |
| M-V04-2509-E7-toggles | §5.2 | E7-toggles | UNTE | EU-22 |
| M-V04-2560-E1-none | §5.3 | E1-none | UNDE | EU-22 (EU-15) |
| M-V04-2560-E2-one | §5.3 | E2-one | UNTE | EU-22 (EU-15) |
| M-V04-2560-E6-rungs | §5.3 | E6-rungs | UNDE | EU-22 (EU-15) |
| M-V04-2577-E5-data | §5.4 | E5-data | UNTE | EU-22 |
| M-V04-2577-E6-rungs | §5.4 | E6-rungs | UNDE | EU-22 |
| M-V04-2593-E4-degenerate | §5.5 | E4-degenerate | UNDE | EU-22 |
| M-V04-2593-E6-rungs | §5.5 | E6-rungs | UNDE | EU-22 |
| M-V04-2593-E7-toggles | §5.5 | E7-toggles | UNDE | EU-22 |
| EI-V04-EDGE-1 | §3.7 L5, §4.4 held pieces | inventory | UNDE | V04 §3.7 L5 release; J-V4.124; T-V4-34 |
| EI-V04-EDGE-2 | §3.5.7 (g) excavation reading | inventory | UNDE | V04 §3.5.7 (g); J-V4.122; T-V4-78 (e) |

| combination | the meeting row of V04 §3.13 (T-V4-77) |
|---|---|
| C-cliff-sewer | a cliff |
| C-cliff-cavern | a cliff |
| C-cliff-ruin | a cliff |
| C-cliff-catacomb | a cliff |
| C-cliff-undercity | a cliff |
| C-cliff-void | a cliff |
| C-cliff-access | a cliff |
| C-cliff-vault | a cliff |
| C-steep-sewer | a steep slope |
| C-steep-cavern | a steep slope |
| C-steep-ruin | a steep slope |
| C-steep-catacomb | a steep slope |
| C-steep-undercity | a steep slope |
| C-steep-void | a steep slope |
| C-steep-access | a steep slope |
| C-steep-vault | a steep slope |
| C-coast-access | the coast, a river, a moat |
| C-moat-cavern | the coast, a river, a moat |
| C-moat-ruin | the coast, a river, a moat |
| C-moat-catacomb | the coast, a river, a moat |
| C-moat-access | the coast, a river, a moat |
| C-moat-vault | the coast, a river, a moat |
| C-bridge-access | a bridge deck over water |
| C-deckplot-sewer | a deck plot |
| C-deckplot-cavern | a deck plot |
| C-deckplot-ruin | a deck plot |
| C-deckplot-catacomb | a deck plot |
| C-deckplot-undercity | a deck plot |
| C-deckplot-void | a deck plot |
| C-deckplot-access | a deck plot |
| C-deckplot-vault | a deck plot |
| C-oasis-sewer | an oasis |
| C-oasis-cavern | an oasis |
| C-oasis-ruin | an oasis |
| C-oasis-catacomb | an oasis |
| C-oasis-undercity | an oasis |
| C-oasis-void | an oasis |
| C-oasis-access | an oasis |
| C-oasis-vault | an oasis |
| C-frame-cavern | the frame |
| C-frame-ruin | the frame |
| C-frame-catacomb | the frame |
| C-frame-undercity | the frame |
| C-frame-void | the frame |
| C-frame-access | the frame |
| C-frame-vault | the frame |
| C-hood-vault | a standalone neighbourhood document |
| C-terraced-ward-sewer | V01's terraced ward |
| C-terraced-ward-cavern | V01's terraced ward |
| C-terraced-ward-ruin | V01's terraced ward |
| C-terraced-ward-undercity | V01's terraced ward |
| C-terraced-ward-access | V01's terraced ward |
| C-terraced-ward-vault | V01's terraced ward |
| C-composed-sewer | V02's composed building, its tiers |
| C-composed-cavern | V02's composed building, its tiers |
| C-composed-catacomb | V02's composed building, its tiers |
| C-composed-undercity | V02's composed building, its tiers |
| C-composed-access | V02's composed building, its tiers |
| C-tiers-access | V02's composed building, its tiers |
| C-cavern-undo | an undo of an edit on a cavern or ruin |
| C-ruin-undo | an undo of an edit on a cavern or ruin |
| C-vault-lock | a lock on an arch vault |

Named combinations: *a settlement that grows over a sealed void* (V06 owns; V04's part: the meeting row of that name,
V04 §3.5.7 (a), (d), (g), §3.5.0 *At an epoch*); *a catacomb growing into a sewer* (V04: its meeting row — the typed opening
from `LinkRule.kinds`, a builders' grille `gated`, cause `overlap`; T-V4-53, T-V4-77); *a raised way over a harbour mouth*
(the pipeline's; V04 reads the span rule, whose water reason keeps the span `open`, so no arch vault); and the owner's
*a dossier removing what an edit pinned* and *an epoch undone after a save* (V04's meeting rows; T-V4-73 (d), T-V4-78 (c)).

## 11. Owner questions and cohesion

* **Q1** — answered yes (J122): V04 §8 *Where it slots* writes the decided order (right after M5, beside it with a second
  pair; M6 and M6-U side by side after M5; §16, INDEX §4); J-V4.46 in its final form. **Q2** — answered: accepted (J122)
  at 28.25–39.25 pw; V04 §8's estimate is now 29–40.25 pw because g item 113's parts (0.5–0.75 pw) and the clerk's
  providers (0.25 pw), designed after that answer, are new design at build depth (J-V4.114); cross-part note 1 carries
  the figure to §16 and INDEX.
* **J121:** no hosting, account, name, licence, language or assistant subject is decided here (V04 §11's closing line).
* **Cohesion (every volume):** §8 agrees with §16 and INDEX §3/§4 on the milestone id (M6-U), start-after (M5, or beside
  it with a second pair), runs-beside (M6) and J122's slot; its price is its own estimate (29–40.25 pw; note 1); §11 marks
  both questions answered; §1b names every piece's producer and consumer and every received hand-off is closed here (§8
  above); one marker line, no stacked banners, PROGRESS ledgers, reconciliation or finalization records.

## 12. The dossier end to end (principle (7))

Every dossier field V04 reads is in V04 §1b.5 with its field, its §7.7 derivation row (DR6, DR7, DR9, DR10, DR16,
DR17, DR19, DR20, DR24, DR28, DR30, DR31, DR32, DR34, DR36 – DR39) and its reader; the fields it does not read are the
port's ignore-list (§7.7 item 1, V08). A dossier change reaches every underground fact through the change envelope and
§7.7 item 5's least-disruption mutation, by the paragraph closing V04 §1b.5 (a removed ruin source, a removed or closed
subterranean institution — the L5 release, J-V4.124 —, a removed sanitation record, a removed catacomb, mine or cistern
record, a changed church count, a changed calamity, a changed history), nothing underground torn down (item 11).

## 13. MAPPING TABLE — every inventory id of the volume → where it now lives (360)

`state` ids keep their meaning at the section named (in the new text, same numbering); `reference` ids became a citation of their home; `pointer` ids became §10's pointer row to the file f item that applies them; `folded` ids moved into the body. Rows whose section a ruling touched name the ruling in §3–§8 above.

| id | kind | old § | how | now |
|---|---|---|---|---|
| V04-0001 | summary | 0 | state | V04 §0 |
| V04-0002 | summary | 0 | state | V04 §0 |
| V04-0003 | summary | 0 | state | V04 §0 |
| V04-0004 | summary | 0 | state | V04 §0 |
| V04-0005 | scope | 1.1 | state | V04 §1.1 |
| V04-0006 | rule | 1.1 | state | V04 §1.1 |
| V04-0007 | hook | 1.2 | state | V04 §1.2 |
| V04-0008 | hook | 1.2 | state | V04 §1.2 |
| V04-0009 | hook | 1.2 | state | V04 §1.2 |
| V04-0010 | term | 1.2 | state | V04 §1.2 |
| V04-0011 | rule | 1.2 | state | V04 §1.2 |
| V04-0012 | term | 1.2 | state | V04 §1.2 |
| V04-0013 | scope | 1.3 | state | V04 §1.3 |
| V04-0014 | scope | 1.3 | state | V04 §1.3 |
| V04-0015 | rule | 1b | state | V04 §1b |
| V04-0016 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (model §2.3), not restating it |
| V04-0017 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (model §2.4), not restating it |
| V04-0018 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (model §2.7), not restating it |
| V04-0019 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (model §2.5), not restating it |
| V04-0020 | table | 1b.1 | state | V04 §1b.1 |
| V04-0021 | table | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (pipeline §4.7), not restating it |
| V04-0022 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (pipeline §4.5), not restating it |
| V04-0023 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (pipeline §4.1), not restating it |
| V04-0024 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (determinism §7.8), not restating it |
| V04-0025 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (rendering §8.2), not restating it |
| V04-0026 | table | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (determinism §7.7), not restating it |
| V04-0027 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (determinism §5.2), not restating it |
| V04-0028 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (model §2.7), not restating it |
| V04-0029 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (model §2.7), not restating it |
| V04-0030 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (pipeline II.7.4), not restating it |
| V04-0031 | interface | 1b.1 | state | V04 §1b.1 |
| V04-0032 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (model §2.7), not restating it |
| V04-0033 | record | 1b.1 | state | V04 §1b.1 |
| V04-0034 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (determinism §7.8), not restating it |
| V04-0035 | interface | 1b.1 | state | V04 §1b.1 |
| V04-0036 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (pipeline §4.7), not restating it |
| V04-0037 | record | 1b.1 | reference | V04 §1b.1: a row or sentence citing its home (model §2.7), not restating it |
| V04-0038 | interface | 1b.1 | state | V04 §1b.1 |
| V04-0039 | record | 1b.1 | state | V04 §1b.1 |
| V04-0040 | interface | 1b.2 | state | V04 §1b.2 |
| V04-0041 | interface | 1b.2 | state | V04 §1b.2 |
| V04-0042 | interface | 1b.2 | state | V04 §1b.2 |
| V04-0043 | interface | 1b.2 | state | V04 §1b.2 |
| V04-0044 | interface | 1b.2 | reference | V04 §1b.2: a row or sentence citing its home (V01 V01 §3.7.1), not restating it |
| V04-0045 | interface | 1b.2 | state | V04 §1b.2 |
| V04-0046 | interface | 1b.2 | state | V04 §1b.2 |
| V04-0047 | interface | 1b.2 | state | V04 §1b.2 |
| V04-0048 | rule | 1b.2 | state | V04 §1b.2 |
| V04-0049 | edit | 1b.3 | state | V04 §1b.3 |
| V04-0050 | rule | 1b.4 | state | V04 §1b.4 |
| V04-0051 | rule | 1b.5 | reference | V04 §1b.5: a row or sentence citing its home (determinism §7.7), not restating it |
| V04-0052 | rule | 1b.5 | reference | V04 §1b.5: a row or sentence citing its home (determinism §7.7), not restating it |
| V04-0053 | rule | 2.1 | reference | V04 §2.1: a row or sentence citing its home (pipeline II.7.4), not restating it |
| V04-0054 | record | 2.2 | reference | V04 §2.2: a row or sentence citing its home (model §2.3), not restating it |
| V04-0055 | record | 2.2 | reference | V04 §2.2: a row or sentence citing its home (model §2.4), not restating it |
| V04-0056 | record | 2.2 | reference | V04 §2.2: a row or sentence citing its home (model §2.7), not restating it |
| V04-0057 | record | 2.2 | reference | V04 §2.2: a row or sentence citing its home (model §2.7), not restating it |
| V04-0058 | record | 2.2 | reference | V04 §2.2: a row or sentence citing its home (model §2.7), not restating it |
| V04-0059 | record | 2.2 | reference | V04 §2.2: a row or sentence citing its home (model §2.7), not restating it |
| V04-0060 | record | 2.2 | reference | V04 §2.2: a row or sentence citing its home (pipeline II.7.4), not restating it |
| V04-0061 | record | 2.2 | reference | V04 §2.2: a row or sentence citing its home (model §2.7), not restating it |
| V04-0062 | record | 2.2 | state | V04 §2.2 |
| V04-0063 | record | 2.2 | state | V04 §2.2 |
| V04-0064 | rule | 2.3 | state | V04 §2.3 |
| V04-0065 | table | 2.3 | state | V04 §2.3 |
| V04-0066 | table | 2.3 | state | V04 §2.3 |
| V04-0067 | table | 2.3 | state | V04 §2.3 |
| V04-0068 | table | 2.3 | state | V04 §2.3 |
| V04-0069 | table | 2.3 | state | V04 §2.3 |
| V04-0070 | table | 2.3 | state | V04 §2.3 |
| V04-0071 | table | 2.3 | state | V04 §2.3 |
| V04-0072 | table | 2.3a | reference | V04 §2.3a: a row or sentence citing its home (determinism §7.7), not restating it |
| V04-0073 | table | 2.3a | reference | V04 §2.3a: a row or sentence citing its home (determinism §7.7), not restating it |
| V04-0074 | record | 2.4 | state | V04 §2.4 |
| V04-0075 | table | 2.5 | reference | V04 §2.5: a row or sentence citing its home (determinism §6.3), not restating it |
| V04-0076 | lifecycle | 2.6 | state | V04 §2.6 |
| V04-0077 | lifecycle | 2.6 | state | V04 §2.6 |
| V04-0078 | lifecycle | 2.6 | state | V04 §2.6 |
| V04-0079 | rule | 3.1 | state | V04 §3.1 |
| V04-0080 | table | 3.1 | state | V04 §3.1 |
| V04-0081 | rule | 3.1 | state | V04 §3.1 |
| V04-0082 | rule | 3.1 | state | V04 §3.1 |
| V04-0083 | rule | 3.1 | state | V04 §3.1 |
| V04-0084 | rule | 3.2 | state | V04 §3.2 |
| V04-0085 | rule | 3.2 | state | V04 §3.2 |
| V04-0086 | rule | 3.2 | state | V04 §3.2 |
| V04-0087 | mechanism | 3.2 | state | V04 §3.2 |
| V04-0088 | rule | 3.2 | state | V04 §3.2 |
| V04-0089 | rule | 3.2 | state | V04 §3.2 |
| V04-0090 | rule | 3.2 | state | V04 §3.2 |
| V04-0091 | mechanism | 3.2 | state | V04 §3.2 |
| V04-0092 | rule | 3.2 | state | V04 §3.2 |
| V04-0093 | rule | 3.2 | state | V04 §3.2 |
| V04-0094 | rule | 3.2 | state | V04 §3.2 |
| V04-0095 | rule | 3.2 | state | V04 §3.2 |
| V04-0096 | rule | 3.2 | state | V04 §3.2 |
| V04-0097 | mechanism | 3.3 | state | V04 §3.3 |
| V04-0098 | mechanism | 3.3 | state | V04 §3.3 |
| V04-0099 | rule | 3.4 | state | V04 §3.4 |
| V04-0100 | rule | 3.4 | state | V04 §3.4 |
| V04-0101 | rule | 3.4 | state | V04 §3.4 |
| V04-0102 | fallback | 3.4 | state | V04 §3.4 |
| V04-0103 | table | 3.5.0 | state | V04 §3.5.0 |
| V04-0104 | rule | 3.5.0 | state | V04 §3.5.0 |
| V04-0105 | rule | 3.5.0 | state | V04 §3.5.0 |
| V04-0106 | mechanism | 3.5.0 | state | V04 §3.5.0 |
| V04-0107 | mechanism | 3.5.0 | state | V04 §3.5.0 |
| V04-0108 | table | 3.5.0 | state | V04 §3.5.0 |
| V04-0109 | rule | 3.5.0a | state | V04 §3.5.0a |
| V04-0110 | rule | 3.5.0a | state | V04 §3.5.0a |
| V04-0111 | rule | 3.5.0a | state | V04 §3.5.0a |
| V04-0112 | rule | 3.5.0a | state | V04 §3.5.0a |
| V04-0113 | rule | 3.5.0a | state | V04 §3.5.0a |
| V04-0114 | rule | 3.5.0a | state | V04 §3.5.0a |
| V04-0115 | rule | 3.5.0a | state | V04 §3.5.0a |
| V04-0116 | rule | 3.5.0a | state | V04 §3.5.0a |
| V04-0117 | rule | 3.5.1 | state | V04 §3.5.1 |
| V04-0118 | rule | 3.5.1 | state | V04 §3.5.1 |
| V04-0119 | rule | 3.5.1 | state | V04 §3.5.1 |
| V04-0120 | rule | 3.5.1 | state | V04 §3.5.1 |
| V04-0121 | rule | 3.5.1 | state | V04 §3.5.1 |
| V04-0122 | rule | 3.5.1 | state | V04 §3.5.1 |
| V04-0123 | rule | 3.5.1 | state | V04 §3.5.1 |
| V04-0124 | rule | 3.5.1 | state | V04 §3.5.1 |
| V04-0125 | rule | 3.5.1 | state | V04 §3.5.1 |
| V04-0126 | rule | 3.5.2 | state | V04 §3.5.2 |
| V04-0127 | rule | 3.5.3 | state | V04 §3.5.3 |
| V04-0128 | rule | 3.5.3 | state | V04 §3.5.3 |
| V04-0129 | rule | 3.5.3 | state | V04 §3.5.3 |
| V04-0130 | rule | 3.5.4 | state | V04 §3.5.4 |
| V04-0131 | mechanism | 3.5.4 | state | V04 §3.5.4 |
| V04-0132 | rule | 3.5.4 | state | V04 §3.5.4 |
| V04-0133 | rule | 3.5.5 | state | V04 §3.5.5 |
| V04-0134 | rule | 3.5.6 | state | V04 §3.5.6 |
| V04-0135 | rule | 3.5.7 | state | V04 §3.5.7 |
| V04-0136 | rule | 3.5.7 | state | V04 §3.5.7 |
| V04-0137 | rule | 3.5.7 | state | V04 §3.5.7 |
| V04-0138 | rule | 3.5.7 | state | V04 §3.5.7 |
| V04-0139 | rule | 3.5.7 | state | V04 §3.5.7 |
| V04-0140 | rule | 3.5.7 | state | V04 §3.5.7 |
| V04-0141 | mechanism | 3.5.7 | state | V04 §3.5.7 |
| V04-0142 | rule | 3.5.7 | state | V04 §3.5.7 |
| V04-0143 | rule | 3.6 | state | V04 §3.6 |
| V04-0144 | rule | 3.6 | state | V04 §3.6 |
| V04-0145 | rule | 3.6 | state | V04 §3.6 |
| V04-0146 | rule | 3.6 | state | V04 §3.6 |
| V04-0147 | rule | 3.6 | state | V04 §3.6 |
| V04-0148 | rule | 3.6a | state | V04 §3.6a |
| V04-0149 | rule | 3.7 | state | V04 §3.7 |
| V04-0150 | rule | 3.7 | state | V04 §3.7 |
| V04-0151 | rule | 3.7 | state | V04 §3.7 |
| V04-0152 | rule | 3.7a | state | V04 §3.7a |
| V04-0153 | rule | 3.8 | state | V04 §3.8 |
| V04-0154 | rule | 3.8 | state | V04 §3.8 |
| V04-0155 | rule | 3.8 | state | V04 §3.8 |
| V04-0156 | table | 3.9 | state | V04 §3.9 |
| V04-0157 | rule | 3.9 | state | V04 §3.9 |
| V04-0158 | rule | 3.10 | state | V04 §3.10 |
| V04-0159 | rule | 3.10 | state | V04 §3.10 |
| V04-0160 | rule | 3.10 | state | V04 §3.10 |
| V04-0161 | rule | 3.10 | state | V04 §3.10 |
| V04-0162 | rule | 3.10 | state | V04 §3.10 |
| V04-0163 | rule | 3.10 | state | V04 §3.10 |
| V04-0164 | rule | 3.10 | state | V04 §3.10 |
| V04-0165 | table | 3.11 | state | V04 §3.11 |
| V04-0166 | rule | 3.12 | state | V04 §3.12 |
| V04-0167 | edit | 4.1 | state | V04 §4.1 |
| V04-0168 | rule | 4.1 | state | V04 §4.1 |
| V04-0169 | edit | 4.2 | state | V04 §4.2 |
| V04-0170 | table | 4.3 | state | V04 §4.3 |
| V04-0171 | rule | 4.4 | state | V04 §4.4 |
| V04-0172 | interface | 4.5 | state | V04 §4.5 |
| V04-0173 | lifecycle | 4.6 | state | V04 §4.6 |
| V04-0174 | rule | 4.7 | state | V04 §4.7 |
| V04-0175 | render | 5.1 | reference | V04 §5.1: a row or sentence citing its home (rendering §8.4), not restating it |
| V04-0176 | render | 5.2 | reference | V04 §5.2: a row or sentence citing its home (rendering §8.1), not restating it |
| V04-0177 | render | 5.2 | reference | V04 §5.2: a row or sentence citing its home (rendering §8.2), not restating it |
| V04-0178 | render | 5.3 | reference | V04 §5.3: a row or sentence citing its home (rendering §8.4), not restating it |
| V04-0179 | render | 5.4 | reference | V04 §5.4: a row or sentence citing its home (rendering §9), not restating it |
| V04-0180 | export | 5.5 | reference | V04 §5.5: a row or sentence citing its home (rendering §11.1), not restating it |
| V04-0181 | budget | 6 | state | V04 §6 |
| V04-0182 | budget | 6 | state | V04 §6 |
| V04-0183 | test | 7 | state | V04 §7 |
| V04-0184 | test | 7 | state | V04 §7 |
| V04-0185 | test | 7 | state | V04 §7 |
| V04-0186 | test | 7 | state | V04 §7 |
| V04-0187 | test | 7 | state | V04 §7 |
| V04-0188 | test | 7 | state | V04 §7 |
| V04-0189 | test | 7 | state | V04 §7 |
| V04-0190 | test | 7 | state | V04 §7 |
| V04-0191 | test | 7 | state | V04 §7 |
| V04-0192 | test | 7 | state | V04 §7 |
| V04-0193 | test | 7 | state | V04 §7 |
| V04-0194 | decision | 8 | reference | V04 §8: a row or sentence citing its home (scope §16), not restating it |
| V04-0195 | table | 8 | state | V04 §8 |
| V04-0196 | rule | 8 | state | V04 §8 |
| V04-0197 | rule | 8 | state | V04 §8 |
| V04-0198 | decision | 9 | state | V04 §9 J-V4.1 |
| V04-0199 | decision | 9 | state | V04 §9 J-V4.2 |
| V04-0200 | decision | 9 | state | V04 §9 J-V4.3 |
| V04-0201 | decision | 9 | state | V04 §9 J-V4.4 |
| V04-0202 | decision | 9 | state | V04 §9 J-V4.5 |
| V04-0203 | decision | 9 | state | V04 §9 J-V4.6 |
| V04-0204 | decision | 9 | state | V04 §9 J-V4.7 |
| V04-0205 | decision | 9 | state | V04 §9 J-V4.8 |
| V04-0206 | decision | 9 | state | V04 §9 J-V4.9 |
| V04-0207 | decision | 9 | state | V04 §9 J-V4.10 |
| V04-0208 | decision | 9 | state | V04 §9 J-V4.11 |
| V04-0209 | decision | 9 | state | V04 §9 J-V4.12 |
| V04-0210 | decision | 9 | state | V04 §9 J-V4.13 |
| V04-0211 | decision | 9 | state | V04 §9 J-V4.14 |
| V04-0212 | decision | 9 | state | V04 §9 J-V4.15 |
| V04-0213 | decision | 9 | state | V04 §9 J-V4.16 |
| V04-0214 | decision | 9 | state | V04 §9 J-V4.17 |
| V04-0215 | decision | 9 | state | V04 §9 J-V4.18 |
| V04-0216 | decision | 9 | state | V04 §9 J-V4.19 |
| V04-0217 | decision | 9 | state | V04 §9 J-V4.20 |
| V04-0218 | decision | 9 | state | V04 §9 J-V4.21 |
| V04-0219 | decision | 9 | state | V04 §9 J-V4.22 |
| V04-0220 | decision | 9 | state | V04 §9 J-V4.23 |
| V04-0221 | decision | 9 | state | V04 §9 J-V4.24 |
| V04-0222 | decision | 9 | state | V04 §9 J-V4.25 |
| V04-0223 | decision | 9 | state | V04 §9 J-V4.26 |
| V04-0224 | decision | 9 | state | V04 §9 J-V4.27 |
| V04-0225 | decision | 9 | state | V04 §9 J-V4.28 |
| V04-0226 | decision | 9 | state | V04 §9 J-V4.29 |
| V04-0227 | decision | 9 | state | V04 §9 J-V4.30 |
| V04-0228 | decision | 9 | state | V04 §9 J-V4.31 |
| V04-0229 | decision | 9 | state | V04 §9 J-V4.32 |
| V04-0230 | decision | 9 | state | V04 §9 J-V4.33 |
| V04-0231 | decision | 9 | state | V04 §9 J-V4.34 |
| V04-0232 | decision | 9 | state | V04 §9 J-V4.35 |
| V04-0233 | decision | 9 | state | V04 §9 J-V4.36 |
| V04-0234 | decision | 9 | state | V04 §9 J-V4.37 |
| V04-0235 | decision | 9 | state | V04 §9 J-V4.38 |
| V04-0236 | decision | 9 | state | V04 §9 J-V4.39 |
| V04-0237 | decision | 9 | state | V04 §9 J-V4.40 |
| V04-0238 | decision | 9 | state | V04 §9 J-V4.41 |
| V04-0239 | decision | 9 | state | V04 §9 J-V4.42 |
| V04-0240 | decision | 9 | state | V04 §9 J-V4.43 |
| V04-0241 | decision | 9 | state | V04 §9 J-V4.44 |
| V04-0242 | decision | 9 | state | V04 §9 J-V4.45 |
| V04-0243 | decision | 9 | state | V04 §9 J-V4.46 |
| V04-0244 | decision | 9 | state | V04 §9 J-V4.47 |
| V04-0245 | decision | 9 | state | V04 §9 J-V4.48 |
| V04-0246 | decision | 9 | state | V04 §9 J-V4.49 |
| V04-0247 | decision | 9 | state | V04 §9 J-V4.50 |
| V04-0248 | decision | 9 | state | V04 §9 J-V4.51 |
| V04-0249 | decision | 9 | state | V04 §9 J-V4.52 |
| V04-0250 | decision | 9 | state | V04 §9 J-V4.53 |
| V04-0251 | decision | 9 | state | V04 §9 J-V4.54 |
| V04-0252 | decision | 9 | state | V04 §9 J-V4.55 |
| V04-0253 | decision | 9 | state | V04 §9 J-V4.56 |
| V04-0254 | decision | 9 | state | V04 §9 J-V4.57 |
| V04-0255 | decision | 9 | state | V04 §9 J-V4.58 |
| V04-0256 | decision | 9 | state | V04 §9 J-V4.59 |
| V04-0257 | decision | 9 | state | V04 §9 J-V4.60 |
| V04-0258 | decision | 9 | state | V04 §9 J-V4.61 |
| V04-0259 | decision | 9 | state | V04 §9 J-V4.62 |
| V04-0260 | decision | 9 | state | V04 §9 J-V4.63 |
| V04-0261 | decision | 9 | state | V04 §9 J-V4.64 |
| V04-0262 | decision | 9 | state | V04 §9 J-V4.65 |
| V04-0263 | decision | 9 | state | V04 §9 J-V4.66 |
| V04-0264 | decision | 9 | state | V04 §9 J-V4.67 |
| V04-0265 | decision | 9 | state | V04 §9 J-V4.68 |
| V04-0266 | decision | 9 | state | V04 §9 J-V4.69 |
| V04-0267 | decision | 9 | state | V04 §9 J-V4.70 |
| V04-0268 | decision | 9 | state | V04 §9 J-V4.71 |
| V04-0269 | decision | 9 | state | V04 §9 J-V4.72 |
| V04-0270 | decision | 9 | state | V04 §9 J-V4.73 |
| V04-0271 | decision | 9 | state | V04 §9 J-V4.74 |
| V04-0272 | decision | 9 | state | V04 §9 J-V4.75 |
| V04-0273 | decision | 9 | state | V04 §9 J-V4.76 |
| V04-0274 | decision | 9 | state | V04 §9 J-V4.77 |
| V04-0275 | decision | 9 | state | V04 §9 J-V4.78 |
| V04-0276 | decision | 9 | state | V04 §9 J-V4.79 |
| V04-0277 | decision | 9 | state | V04 §9 J-V4.80 |
| V04-0278 | decision | 9 | state | V04 §9 J-V4.81 |
| V04-0279 | decision | 9 | state | V04 §9 J-V4.82 |
| V04-0280 | decision | 9 | state | V04 §9 J-V4.83 |
| V04-0281 | decision | 9 | state | V04 §9 J-V4.84 |
| V04-0282 | decision | 9 | state | V04 §9 J-V4.85 |
| V04-0283 | decision | 9 | state | V04 §9 J-V4.86 |
| V04-0284 | decision | 9 | state | V04 §9 J-V4.87 |
| V04-0285 | decision | 9 | state | V04 §9 J-V4.88 |
| V04-0286 | decision | 9 | state | V04 §9 J-V4.89 |
| V04-0287 | decision | 9 | state | V04 §9 J-V4.90 |
| V04-0288 | decision | 9 | state | V04 §9 J-V4.91 |
| V04-0289 | decision | 9 | state | V04 §9 J-V4.92 |
| V04-0290 | decision | 9 | state | V04 §9 J-V4.93 |
| V04-0291 | decision | 9 | state | V04 §9 J-V4.94 |
| V04-0292 | decision | 9 | state | V04 §9 J-V4.95 |
| V04-0293 | decision | 9 | state | V04 §9 J-V4.96 |
| V04-0294 | decision | 9 | state | V04 §9 J-V4.97 |
| V04-0295 | decision | 9 | state | V04 §9 J-V4.98 |
| V04-0296 | decision | 9 | state | V04 §9 J-V4.99 |
| V04-0297 | decision | 9 | state | V04 §9 J-V4.100 |
| V04-0298 | decision | 9 | state | V04 §9 J-V4.101 |
| V04-0299 | decision | 9 | state | V04 §9 J-V4.102 |
| V04-0300 | decision | 9 | state | V04 §9 J-V4.103 |
| V04-0301 | decision | 9 | state | V04 §9 J-V4.104 |
| V04-0302 | decision | 9 | state | V04 §9 J-V4.105 |
| V04-0303 | decision | 9 | state | V04 §9 J-V4.106 |
| V04-0304 | decision | 9 | state | V04 §9 J-V4.107 |
| V04-0305 | decision | 9 | state | V04 §9 J-V4.108 |
| V04-0306 | decision | 9 | state | V04 §9 J-V4.109 |
| V04-0307 | decision | 9 | state | V04 §9 J-V4.110 |
| V04-0308 | decision | 9 | state | V04 §9 J-V4.111 |
| V04-0309 | decision | 9 | state | V04 §9 J-V4.112 |
| V04-0310 | decision | 9 | state | V04 §9 J-V4.113 |
| V04-0311 | decision | 9 | state | V04 §9 J-V4.114 |
| V04-0312 | decision | 9 | state | V04 §9 J-V4.115 |
| V04-0313 | decision | 9 | state | V04 §9 J-V4.116 |
| V04-0314 | decision | 9 | state | V04 §9 J-V4.117 |
| V04-0315 | decision | 9 | state | V04 §9 J-V4.118 |
| V04-0316 | decision | 9 | state | V04 §9 J-V4.119 |
| V04-0317 | decision | 9 | state | V04 §9 J-V4.120 |
| V04-0318 | decision | 9 | state | V04 §9 J-V4.121 |
| V04-0319 | rule | 10 | pointer | V04 §10 pointer row BCR-V4-19 → item 551 |
| V04-0320 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-1 → item 205 (base text) |
| V04-0321 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-2 → item 208 (base text) |
| V04-0322 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-3 → item 247 (base text) |
| V04-0323 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-4 → item 212 (base text) |
| V04-0324 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-5 → item 325 (base text) |
| V04-0325 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-6 → item 574 (base text) |
| V04-0326 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-7 → item 330 (base text) |
| V04-0327 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-8 → item 355 (base text) |
| V04-0328 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-9 → item 403 (base text) |
| V04-0329 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-10 → item 278 (base text) |
| V04-0330 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-11 → item 475 (base text) |
| V04-0331 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-12 → item 505 (base text) |
| V04-0332 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-13 → item 526 (base text) |
| V04-0333 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-14 → item 386 (base text) |
| V04-0334 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-15 → item 484 (base text) |
| V04-0335 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-19 → item 551 (base text) |
| V04-0336 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-20 → item 559 (base text) |
| V04-0337 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-21 → item 555 (base text) |
| V04-0338 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-24 → item 561 (base text) |
| V04-0339 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-27 → item 552 (base text) |
| V04-0340 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-31 → item 563 (base text) |
| V04-0341 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-36 → item 564 (base text) |
| V04-0342 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-40 → item 407 (base text) |
| V04-0343 | bcr | 10 | pointer | V04 §10 pointer row BCR-V4-45 → item 291 (base text) |
| V04-0344 | owner-question | 11 | state | V04 §11 (answered: J122) |
| V04-0345 | rule | 12 | state | V04 §12 (compact list; the round records in the validation records) |
| V04-0346 | handoff | 13 | state | V04 §13 (closed; hand-offs closed at their homes, report table) |
| V04-0347 | rule | IN | folded | folded into the body at its home (V04 *Integration notes* lists where) |
| V04-0348 | rule | IN | folded | folded into the body at its home (V04 *Integration notes* lists where) |
| V04-0349 | term | 3.2 | state | V04 §3.2 |
| V04-0350 | term | 3.5.0 | state | V04 §3.5.0 |
| V04-0351 | term | 3.1 | state | V04 §3.1 |
| V04-0352 | term | 3.1 | state | V04 §3.1 |
| V04-0353 | term | 3.5.7 | state | V04 §3.5.7 |
| V04-0354 | term | 3.5.1 | state | V04 §3.5.1 |
| V04-0355 | term | 3.9 | state | V04 §3.9 |
| V04-0356 | term | 3.5.3 | state | V04 §3.5.3 |
| V04-0357 | term | 3.5.4 | state | V04 §3.5.4 |
| V04-0358 | term | 3.5.0a | state | V04 §3.5.0a |
| V04-0359 | term | 3.6 | state | V04 §3.6 |
| V04-0360 | term | 3.5.7 | state | V04 §3.5.7 |

## 14. CROSS-PART NOTES (for the assembler and the named editors)

1. **scope (§16, §13, INDEX):** M6-U's price is V04 §8's **29–40.25 pw** (was 28.25–39.25): g item 113's V04 part
   (the lost reading in U3b, 0.25 pw; the buried former settlement in U5, 0.25–0.5 pw) and the clerk's providers (U4,
   0.25 pw). §16's M6-U row, its computed totals (item 568), INDEX §4's order line and §6's Q2 line take it (Q2 stays
   "accept (J122)"). §13's takeover table reads "T-V4-1 – T-V4-79" (was – T-V4-75): T-V4-78 is T113-4 and T113-5 on the
   underground's output; T-V4-76 and T-V4-77 are the underground's part of §13.2's B-EDGE suite; T-V4-79 the clerk's
   providers. §16's M6-U runs-beside cell (M6) agrees.
2. **determinism (§5.4 `stages[].warnings` comment):** the underground's codes are V04 §1b.1's twelve — add
   `W_RUIN_SOURCE_REMOVED`, `W_RUIN_MONUMENT_SKIPPED`, `W_ARCH_VAULT_NO_DOOR`, `W_TERMINAL_CISTERN_SKIPPED`,
   `W_BURIED_FORMER_SKIPPED` to the seven listed, or cite "V04 §1b.1" in place of the list (V04-WGAP-3, item 338).
3. **model (§2.7):** `HistoryRecord.buried` lists the settlement's one `buried` system (II.7.6: one system per kind) once,
   however many burials the replay makes (each former fabric keyed by its burial epoch, V04 §2.5); the LOST state is
   V04 §2.2's access-state set `Excavation` with `ExcavationRecord` (`reached`, `lostAt`) — cite them there (E-39).
4. **pipeline (II.7.6, §4.11):** II.7.6's "through **open** links only" is V04 §3.5.7 (g)'s physical reading (J-V4.122:
   a `gated` or `secret` link and a `locked` access count; `collapsed`, `flooded`, `bricked`, a closed element and a lost
   host building do not) — a pointer "(V04 §3.5.7 (g))" after it prevents reading "open" as the link kind `open` alone;
   §4.11 (5)'s buried former settlement is laid by `BuriedFormer.lay` (V04 §3.5.5 (b)): streets, the major buildings
   (≥ `formerStoreyMinM2`), squares, gates and the wall as sealed masonry bands, at the old ground level less the rise.
5. **V03 (§3.12 (9)):** cite V04 §3.5.4 (f) for `gradeFaces` — an arch vault's open faces only, each with `onto` (a way →
   `street`/`lane`/`alley` by its class, open ground → `yard`); drop "or a bridge approach's or street vault's open arch"
   (a street or bridge vault lies wholly below its street and has no grade face) and the pre-decided fallback "until volume
   4 records its marks" (V04-WGAP-4; J-V4.127). T-V3-23 (g)'s V04 half is T-V4-50's clause.
6. **V06:** the replay calls `BuriedFormer.lay(doc, epoch, former)` inside the batch of the coarse epoch that first passes a
   former fabric's burial threshold, `former` the surface records the batch clears (read on their last live state), and
   writes the returned id into `HistoryRecord.buried`; that epoch's `under.access` gives the new elements their first
   reading; `under.fade`'s vacating of a lost void returns households displaced, cause `void` (X2, as V06 reads it).
7. **V09:** the LOST void's legend and panel line read `ExcavationRecord.lostAt` ("Once known; its way in closed in
   {year}", the year of that `seq`'s event) and the reading `lost` (V09-WGAP-1); V09's AP6 is carried beside M6-U by §16
   (XV-V9-8, V04's part closed); XV-V9-4 and XV-V9-14 are closed in V04 §4.5 and §5.1.
8. **V10:** V04 §4.5's providers (the `WhyProvider` kinds, the `underground` section rows, `catacombOutcome`'s record,
   the `info.under.*` keys) close CVR-V10-1 and CVR-V10-10; the story reads a lost cluster's `lostAt` and a former
   settlement's burial epoch.
9. **V11:** the history rows give `history.burialYears` and a former fabric's **burial factor** `b` (the product of the
   flood, silt, rebuilding and bare-rock factors that shorten or lengthen the threshold) — V04 §3.5.5 (b) divides the rise
   by it; registry row 59's `buried` row gains V04's `former*` params (`formerStoreyMinM2`, `formerWallCm`,
   `formerGateM2`, `formerMinGalleryM`, `formerRiseCmPerCentury`, `formerRiseMinCm` (new), `formerRiseMaxCm`), calibratable,
   by the default line at V4-U5. X-V11-4, -10, -14, -15, -17 closed here.
10. **V12:** T-V4-76 – T-V4-79 register (PR fixtures; the sweeps nightly); T-V4-78 runs on V06's history fixtures ("city
    to village", refounded) at the later of V4-U5 and M6-E; X-V12-4, -11, -13, -15 – -19 closed here.
11. **V07:** FL-2 and FL-3 closed (the `country` span reason is the base's, item 244, J-C4; T-V4-62); V07 §1 (5) and
    §3.16 (1) cite it and drop their fallback (V07-XCONF-2's V07 half).
12. **V08:** X3 and X13 closed (V04 §3.5.1 (2), (5); §3.5.0a (1), §3.5.1 (3), §3.5.2).
13. **V01, V02, V05:** nothing new; V04 cites V01 §3.7.1, §3.10.1, §3.15, §3.16, V02 §3.9 W6, §3.14.5 (f), §3.15, §3.17 and
    V05 §1.3, §3.5 (3), §3.16 (4)–(5) as they stand.
14. **canon (items 114, 115):** neither was filed when this lane landed; item 115 has no underground part; item 114 reaches
    the underground only through the ground prosperity field it inherits (J-V4.51) — no V04 text unless the filed item
    names one.

## 15. CONFIRMED versus PLAUSIBLE (this lane)

**CONFIRMED (executed in this lane):** the volume assembled from parts 00–12 (71 018 words); T-V4-1 – T-V4-79 and J-V4.1 – J-V4.127 each defined once, none missing, every cited id defined (script);
every `V04 §` pointer resolves to a heading or numbered paragraph (script); 0 hits of the retired terms (first paint,
`V4 §`, `Vn-x.y`, DR aliases, `LayerSpec.showUnexcavated`, "hood document", "lone neighbourhood", "lottery") and of the
critique and seam tags (grep); the 114 routed edges and 62 combinations each mapped to a §3.13 row (script: 0 unmapped);
the 360 inventory ids each mapped (script); `docs/validation/bench/doc_checks.py --doc … --heads docs/ARCHITECTURE.md`:
C1 0, C2 0, C4 0, S1 0; C3 194 three-gram runs, read — common English phrases ("a new random on the", "is byte identical
to its", "replay of the same seed and"), digit runs of section numbers and values, the marker line and file paths cited
by file and section — no reference content; S2 93, each a pointer to another volume's section (the tool resolves against
the base only). The tool warns its reference corpus is incomplete in this container (captures, research/patreon,
research/devlogs, research/ftg-docs, research/external missing): the clean-room result is to be re-run where the corpus
is whole. `docs/AMENDMENTS-2026-09-28g.md` ends at item 113 (grep at the start and before LANDED).

**PLAUSIBLE:** the price of item 113's parts and the providers (0.75–1 pw together); that the physical reading of "open
links" is the owner's meaning (J-V4.122); `formerRiseMinCm` 250 and the rise law (J-V4.123; T-V4-78 and the panel); the
shrink figures by source (≈, from section word counts).
