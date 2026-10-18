# Rewrite — design volume V04 (the underground)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V04; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V04`, started 2026-09-29; continued 2026-09-30 in the cloud checkout after the owner's two-lane pause and the 16:48 usage-limit cut)
- P1 inputs gathered (canon unit V04: 275 STATE, 40 REFERENCE, 24 BCR pointers (46 requests in file f), 12 conflicts, 59 f items, g 113, 6 wiring gaps, E-03/E-16/E-24/E-39, 4 id rulings, 5 retired terms, 59 open findings, 31 hand-offs, 4 disagreements, 52 UNDEFINED + 62 UNTESTED edges, 62 combinations; inventory 360 ids): done
- P2 head, §0, §1: done (parts/00-head-s0-s1.md)
- P3 §1b: done (parts/01-s1b.md)
- P4 §2: done (parts/02-s2.md)
- P5 §3.1–§3.4: done (parts/03-s3-1to4.md; part 02's two test citations corrected: §2.5 → T-V4-30, T-V4-79 (a); §2.3a → T-V4-38)
- P6 §3.5: done (parts/04-s3-5.md: E-03 fixed-key draws cited, V11 values cited, ICONF-5 monument path once, gradeFaces (WGAP-4), buried former settlement (g 113 (c)), lost reading (g 113 (e); EDGE-2 ruled); part 02 gains `formerMinHeadroomCm`)
- P7a §3.6–§3.10: done (parts/05-s3-6to10.md: EDGE-1 L5 release, lost state through C1/L1/U-DIG/U-FADE/access closures, DUP-1 one opening-pass list in §3.10, X-V11-14 (a) stage id)
- P7b §3.11 (failures, edges UE1–UE31, combinations UC1–UC18), §3.12 (E-03): done (parts/06-s3-11to12.md)
- P8 §4–§6: done (parts/07-s4to6.md: providers W-IF-01/WGAP-5, lost drawing, XCONF-2, ICONF-3, NARR-3, SLR6-02, RESTATEMENTS-008/010)
- P9 §7–§8: done (parts/08-s7to8.md: T-V4-76 lost, T-V4-77 buried former, T-V4-78 providers + gradeFaces, T-V4-79 edges, T-V4-80 combinations; ICONF-3, XCONF-3, V07-XCONF-2, SLR6-02 clauses; J122 order; SCC-113; X-V12-4/11/13/17; X-V11-14 (a))
- P10 §9–§13, integration notes: done (parts/09-s9.md: E-24 marks, ICONF-2 one pricing row J-V4.114, J-V4.122–J-V4.125 new, §10 pointers, §11 answered J122, §12 compact, §13 closed, IN notes indexed)
- P11 assemble, verify ids, references, terms, tags, coverage, doc_checks: done (the assembled file became the master, the parts kept as written; re-run 2026-09-30 on the final text: one deferral-shaped "calibrate-later" replaced by the canon's register form, 18 volume prefixes split across a line wrap rejoined, the span cells renamed to the rewritten base's `span.*` names, §13's counts refreshed)
- P12 report (sizes, mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done

Source: `docs/volumes/V04-underground.md` (4 168 lines). Output: `docs/validation/coherence/new/volumes/V04-underground.md`
(3 335 lines; same title line and section structure, one marker line). Working parts: `docs/validation/coherence/work/rewrite-V04/parts/`
(00 … 09); the mapping script `work/rewrite-V04/mapping.py` (writes `work/rewrite-V04/mapping.md`, the table of §12 below).

## 1 Sizes and the shrink goal

| measure | before | after |
|---|---|---|
| words (`str.split`, the canon's measure) | 83 966 | 74 624 (−11.1 %; the canon's band 50 380 – 62 974) |
| bytes | 530 576 (518.1 KB) | 460 463 (449.7 KB) |
| lines | 4 168 | 3 335 |
| sections | §0–§13, Integration notes, six reconciliation-round logs, two continuations, the finalization | §0–§13, Integration notes |

**Where the words went** (a word-level diff of each section against its old text; gross ≈ 25 800 words deleted and
≈ 16 450 inserted, of which ≈ 1 700 each way are one-for-one renames — G-cite's `V4 §` → `V04 §`, ID-BCR's `BCR-n` →
`item n` — so ≈ 24 100 words truly removed and ≈ 14 750 written):

| source | ≈ words removed | where |
|---|---|---|
| NARRATION | 11 800 (49 %) | the stacked banners, the PROGRESS, REVISION and RECONCILIATION ledgers and the REVISED/RECONCILED paragraphs of the head (V04-NARR-1, -2); the six reconciliation-round logs, the two continuations and the finalization (5 400; V04-NARR-7); §12's per-round CONFIRMED receipts (md5s, scripts, counts) and §13's per-round fix lists "holding no item" (≈ 3 250); critique and seam tags (C4-…, SL-…, ST-…, SLR…, TR-…, TT-…, RV-…) in headings, bars and decisions (V04-NARR-4); "amended by the revision / the n-th reconciliation" and "*Reconciliation round n*" openers in §9 (V04-NARR-5); the budget paragraph's round label (V04-NARR-3); §10's amendment history (V04-NARR-6); §11's open-recommendation text (V04-MISSING-2) |
| RESTATEMENT | 10 400 (43 %) | §10's 46 request texts → one pointer row each (7 032 removed, a 736-word table written; each request's text lives in its file f item); §2.2's fields the base declares once file f applies (`Tunnel`, `Chamber`, `Junction`, `wayFall`, `Outfall` read as declared, ≈ 750); §1b.2's restated interface detail (≈ 200); §2.3's values of the rows V11 owns → citations of V11 §3.23 (V04-RESTATE-3, X-V11-4); the values of VOL-V03-V04-RESTATEMENTS-005 – 014 (the dense core share, the sewer-front capacity law, `rate(underground)`, `ambient.underground`, `accessReachM`, the basement floor, `raised.supportFoundationCm`, `raised.vaultCap`, the ossuary need law `A(f)`, `growthCapShare`, the base total); the Integration notes' bodies (folded at their homes, ≈ 350) |
| DUPLICATED MECHANISMS | 700 (3 %) | E-03's five restatements of the fixed-key draw → citations of §6.1's pattern with V04 §3.12's exception list; V04-DUP-1's opening-pass commit list written three times → once (V04 §3.10 *The opening pass*); V04-ICONF-5's two monument failure paths → one (V04 §3.5.0a (5a)); V04-ICONF-2's three pricing totals → one (J-V4.114) |
| VERBOSE PROSE | 1 200 (5 %) | the head's reading note, §0, §1.3, §2.2, §3.7a, §4.3 and the long §9 rows made compact |

**Written** (≈ 14 750 words; the net growth of the sections that carry it in brackets): §3.11's edge and combination
tables UE1–UE31 and UC1–UC18 (+3 107); g item 113's underground parts — the buried former settlement V04 §3.5.5 (b), the
`lost` state and `ExcavationRecord` in V04 §2.2, §3.5.7 (g), §3.4, §3.6, §3.10, §5.2 (+1 694 in §3.5, ≈ 500 elsewhere);
T-V4-76 – T-V4-80 and the new clauses of T-V4-28, -34, -48, -50, -52, -62 and others (+1 005); J-V4.122 – J-V4.125
(+558); the clerk's providers (W-IF-01, V04-WGAP-5; +338 in §4.5); `gradeFaces` (V04-WGAP-4) and the lifecycle rows of
the new pieces (+197 in §2.6), §1b's new rows; §6's rows for the switch edit and the epoch participants (SLR6-02,
J-V4.125; +155); the citations that replace restated values; §10's pointer table, §11's decisions, §13's sibling table
and the Integration-notes map.

**Below the band — what holds it** (principle (9): not a defect; stated as the rule asks). (1) The ruled additions: the
sections of §0–§9 that grew carry ≈ 8 800 words more than before, all of it new design the canon routed here — the
largest edge catalogue of any volume (114 edges, 62 combinations) and g item 113's two underground parts at build depth.
Without them the unit would stand at 65 798 words (−21.6 %), the order of its landed siblings V02 (−20.2 %) and V03
(−20.4 %). (2) The irreducible body: §3.5's seven void-system kinds at algorithm depth (11 738 words), §9's 125
decisions each keeping its reason (E-24: no row dropped), §7's 80 bars, §2.3's rule tables with every cell's value, unit
and provenance, U-NET's steps N0–N11 (2 821) — each sentence carries a rule, a value, a case or a failure rung, and every
restatement the canon found (40 REFERENCE items, 24 BCR blocks, 14 restatement findings) is cut. (3) The verbose-prose
share is small by judgment (§9 of this report, call 7): the remaining prose states rules at build depth, and cutting it
further would thin cases, which the guard forbids. No rule, case, value, bar, record field, lifecycle row, test, owner
rule or reasoned decision was dropped: every one of the 360 inventory ids maps to a home (§12, 0 unmapped); a locator
over each inventory statement's identifiers finds every identifier the volume still owns in the text, and the
identifiers it no longer carries are request texts now at their file f items, retired seam and critique tags, or values
cited at their base or V11 home (the mapping table's cells say which).

## 2 File f and g items (cited as base text, never restated)

File f items concerning V04 (59), each cited at its base home where the volume reads it, none restated: 205, 207, 208,
212, 229, 238, 239, 243, 244, 245, 247, 248, 249, 250, 252, 278, 281, 291, 306, 309, 319, 325, 330, 338, 355, 372, 386,
403, 404, 407, 413, 414, 423, 445, 452, 475, 484, 485, 505, 526, 548, 549, 551, 552, 554, 555, 556, 557, 558, 559, 560,
561, 562, 563, 564, 565, 568, 573, 574. The 46 requests of this volume are V04 §10's pointer rows `BCR-V4-n` → item →
base home (ID-BCR; each request's text lives in its f item). Item 452 applies BCR-V4-16 as V04-ICONF-3 corrects it;
item 338 (BCR-V4-41, a stage's own warnings) carries V04 §1b.1's twelve codes, `W_RUIN_SOURCE_REMOVED` among them (V04-WGAP-3; the canon's link names item 558, which is BCR-V4-42's); item 244's span rule carries the `country` reason
(V07-XCONF-2, J-C4); item 573 carries BCR-V6-27's `CalamityRef.deaths`; item 574 carries BCR-V6-28, applied before
item 319.

**g item 113** (V04's parts, written at build depth as new design; closes V04-MISSING-1):
- **(c) buried former-town ruins** — V04 §3.5.5 (b) *The buried former settlement*: `BuriedFormer.lay` at the replay's
  burial epoch lays the former fabric older than its burial threshold (V11's `history.burialYears` and factors, read
  through DR39) at its old ground level as the `buried` system's `former` elements — galleries on former ways, `storey`
  chambers on former footprints (`formerStoreyMinM2`), wall bands on the former enceinte, gate passages; the `buried`
  params in V04 §2.3 (`formerStoreyMinM2`, `formerWallCm`, `formerGateM2`, `formerMinGalleryM`, `formerRiseMaxCm`,
  `formerMinHeadroomCm`); U-SYS's order (V04 §3.5.0); its failure row `W_BURIED_FORMER_SKIPPED` (V04 §3.11); V04 §1.1,
  §1.2, §1b.1's rows, §2.5's key, §2.6's lifecycle row; T-V4-77; J-V4.122; V06's replay calls it (V04 §13's sibling table).
- **(e) lost access** — access counts only through open links: the excavation reading `excavation(doc, cluster)` gains
  `lost` (V04 §2.2's access-state set; E-39) with one stored memory, `ExcavationRecord.reached` (V04 §2.2, §3.5.7 (g));
  a cluster whose every open path closes turns `lost` in the commit that closes it, is drawn faded like an unexcavated
  void (V04 §5.2), its dwellings empty by the vacancy rules (V04 §3.4 F6, V04 §3.6, V04 §3.10) and return at the next
  placement after a reopen, a new dig, an overlap or a collapse refinds it; U-DIG's and U-FADE's closures (V04 §3.8,
  §3.10); the clerk's `info.under.excavation.lost` (V04 §4.5); T-V4-76; J-V4.122 (J-V4.53 and J-V4.62 marked "amended by
  J-V4.122"). "Open" is read as passable (a gate, a lock, a secret door joining those who hold the key), which rules
  V04-EDGE-2 (V04 §12 records it PLAUSIBLE as the owner's meaning).
- (d) regrowth first (reopen before new runs) is cited at V04 §3.10's growth step; (a), (b), (f), (g) are the base's
  (§4.2 S0, §4.11, §7.7 DR36–DR39), cited in V04 §1.2.

## 3 Conflicts resolved (12)

| conflict | resolution in the text |
|---|---|
| MC-11 | `Outfall` is declared at the base (§2.3, item 205); V04 §1.2, §1b.1 and §2.1 read it as declared. |
| V04-ICONF-1 | `AccessPoint.state`'s lifecycle is §7.4's underground row as item 555 amends it; V04 §2.6 cites it and keeps no row of its own. |
| V04-ICONF-2 | One pricing decision: J-V4.114 with V04 §8's total 28.25–39.25 pw and U5 3–4.25 pw; J-V4.71, J-V4.94 and J-V4.104 carry "*Superseded by J-V4.114.*" and lose their stale figures. |
| V04-ICONF-3 | V04 §5.5's rule governs: VTT portals only at openings in a wall line (a `door` access, a `door` or `breach` link, an underground building's entrances, each tunnel grille); every vertical access is its shaft light plus a `plat` extension object; T-V4-28 reworded to it; item 452 carries the corrected request. |
| V04-ICONF-4 | The stale clause "a catacomb reading its source church's name" is gone (it lived in BCR-V4-18's text, now item 423's pointer row); V04 §5.4's complex-naming clause governs. |
| V04-ICONF-5 | V04 §3.5.0a (5a) states once: heights from V11's `stepped-shrine` row; an ST0-infeasible region retried once with `clearM` halved, then no monument and `W_RUIN_MONUMENT_SKIPPED`; a `TierFailure` truncates to the tiers laid, counted in `lay.truncated`; `standing` is the decay's reading only. IN-V04-2's divergent wording is dropped. |
| V04-XCONF-1 | `showUnexcavated` is a per-viewer view key (J-VI.19): V04 §1b.3 names it with `depthBand` as view keys, never edits and never undone; it is not among `setLayer`'s targets. |
| V04-XCONF-2 | V04 §5.1: PageUp and PageDown step the band "by §14's keymap precedence" (the storey switcher first while a plan is open); the precedence itself is scope's (cross-part note). |
| V04-XCONF-3 | T-V4-50 gains the clause: with no building elaborated, the set of crypt joins equals the set after elaborating every church (V03's T-V3-23 (g)). |
| V07-XCONF-2 | V04 §3.5.4 (d) reads the span rule's `country` reason (a span whose under-deck strip lies wholly on hinterland faces stays `open` at every rung; §2.7, item 244, J-C4) and never vaults it; T-V4-62 gains the clause. |
| CANON-C03 | V04 §11 is a decisions table: Q1 (M6-U after M5, beside it when a second pair of seats is free) and Q2 (28.25–39.25 pw accepted), each answered with J122; V04 §8 *Where it slots* reads the decided order. No J121 subject arises in this volume. |
| CANON-C04 | V04 §13 holds no open item; the reviews' history is in the validation records; §13 lists what the sibling units hold for this volume. |

Disagreements of agreement.md: T-V3-23 with V03 (V04-XCONF-3), PageUp/PageDown with V03 (V04-XCONF-2), `AccessPoint` with
determinism (V04-ICONF-1) — each closed above.

## 4 Elegance rulings applied, with their equivalence lists

**E-03 (UNIFY — the fixed-key existence draw; home §6.1, V04 §3.12 keeping its exception list).** Every site cites "the
fixed-key draw (§6.1)" and states only its stream, key parts, chance source, comparison moments and persistence:
V04 §3.5.1 (the catacomb source), V04 §3.5.7 (the overlap shaft, the crypt join, the dig, the public opening), V04 §3.12
*The fixed-key draws* (the exception list).
- [x] catacomb source: re-compared against CITY's chance when the rung rises — V04 §3.5.1 (3), V04 §3.12.
- [x] overlap shaft: its own key (the element pair) and chance row `links.overlapShaftChance` — V04 §3.5.7, V04 §3.12.
- [x] crypt join: the own/other chance split kept (`cryptJoin.own`, `.other`) — V04 §3.5.7, V04 §3.12.
- [x] dig: a made access persists; "one not made appears when the chance later rises above the draw" — V04 §3.5.7 (d), V04 §3.12.
- [x] public opening: its candidate order (V04 §3.5.7 (e)) kept — V04 §3.12.
- [x] §3.12's exception list kept whole as the pattern's exceptions — V04 §3.12.

**E-16 (UNIFY — one name per mechanism, §8.2).** V04 uses neither the `tint`/`vignette` post operations nor the `lights`
role (old and new text alike: its `lights` are the base's rule table 51 and the VTT scene's `lights` field). Nothing to
rename; the equivalence items (programs per mark and post operations per tile; the painterly spotlight; the two roles'
uses) do not arise in this volume.

**E-24 (UNIFY — one mark on an amended decision).** V04 §9's preamble states the mark; J-V4.46 "*Amended by J122.*",
J-V4.53 and J-V4.62 "*Amended by J-V4.122.*", J-V4.71, J-V4.94 and J-V4.104 "*Superseded by J-V4.114.*", J-V4.89 and
J-V4.107 "*Amended by J-VI.4.*".
- [x] no row dropped — J-V4.1 – J-V4.121 all kept; J-V4.122 – J-V4.125 added (125 rows).
- [x] the governing row keeps the reason — each marked row keeps its "because"; J-V4.114 carries the total's reasons.

**E-39 (KEEP APART — closure and decline states).** The access states, the way decline ladder, the wall stretch condition
and the building lifecycle stay at their homes; g item 113 (e)'s `lost` joins V04's access-state set as the excavation
reading's third value (V04 §2.2), not a new shared ladder. The separating nuance (scope per link, way, stretch or record;
values; transitions; writers) stands.

No other unification was made. V04-DUP-1, V04-ICONF-2 and V04-ICONF-5 are principle (1)'s one home inside the volume,
routed as findings, not unified mechanisms.

## 5 Id rulings, renumberings and renames

| from | to | ruling |
|---|---|---|
| `BCR-1` … `BCR-46` (V04's bare requests) | `BCR-V4-1` … `BCR-V4-46` in V04 §10's pointer rows; in the body each is cited as its applied `item n` | ID-BCR (V04-TERM-1); 0 bare `BCR-n` remain |
| `V4 §n`, `V1-x.y`, `V2 §`, `V6 §`, `V9 §` … (722) | `V04 §n`, `V01 §x.y`, `V02 §`, `V06 §`, `V09 §` … | G-cite (with V04-BREF-1: every self-reference to a §3.5.x subsection carries `V04`) |
| `DR-V8.2`, `DR-V8.3`, `DR-V8.4`, `DR-V8.7` … (8) | DR30, DR31, DR32, DR34 …; g item 113's rows DR36–DR39 as the determinism editor numbers them | ID-DR, G-DR |
| "first paint" (13) | "first map" | G-firstmap |
| "standalone neighbourhood" (1) | "standalone neighbourhood document" | G-standalone |
| `LayerSpec.showUnexcavated` (1) | the view key `showUnexcavated` | G-unexcavated, J-VI.19 |
| IN-V04-1 … IN-V04-14 | folded at their homes; the ids kept only in the Integration-notes map | ID-WX (judgment call 1) |
| critique and seam tags (C4-…, SL-…, ST-…, SLR…, TR-…, TT-…, RV-…) | removed (the critique files keep them) | V04-NARR-4 |
| "M6" for this volume | M6-U | J-VI.22 (already applied) |
| `raised.vaultShare`, `raised.vaultCap`, `raised.supportFoundationCm` (V11's prose aliases) | `span.vaultShare`, `span.vaultCap`, `span.supportFoundationCm` — the base's names at §2.7 (item 244), cells of V11 row 80's `raisedWays.structure` | principles (2), (10): the rewritten base names them so (judgment call 10) |
| — | new: T-V4-76 – T-V4-80; J-V4.122 – J-V4.125; UE1 – UE31, UC1 – UC18 (V04 §3.11's rows); `ExcavationRecord`, the `lost` value of `excavation(doc, cluster)`, `gradeFaces(chamberId)`, `BuriedFormer.lay`, the `buried` system's `former` elements and six `buried` params, `W_BURIED_FORMER_SKIPPED`, `info.under.excavation.lost`, `info.under.none`, the span reason `country` (read) | the canon's findings, edges and g item 113 |

ID-DUPDEF: no id of this volume is defined twice (T-V4-1 – 80, J-V4.1 – 125, BCR-V4-1 – 46, UE1 – 31, UC1 – 18 each once,
in its home section).

## 6 Wiring gaps, hand-offs and open findings closed

**Wiring gaps (6).**
- W-DOS-10c — V04 §1b.5's water-system row names DR34 and its age-and-scars row DR37 (with DR30 for a magical history),
  both ends written.
- W-IF-01 — V04 §1b.2 adds the `WhyProvider` and the `underground` `WhySectionProvider` rows (implementer `@plat/under`;
  callers V10's why query and V09's why card); V04 §4.5 states their rows with `info.under.*` keys — the `ruin.node`
  line, `AccessPoint.cause`, `reusedBy`, an arch vault's span reason, `Chamber.monument` tiers, the footings, `blockedBy`,
  the terminal cistern — and `catacombOutcome`; T-V4-78 bars them.
- W-HOOK-02 — V04 §1b.1's head and §2.1: V04 builds the staged `Tunnel`, `UndergroundSystem`, `Gallery`, `Chamber` and
  `UndergroundLink` records §2.7's staged block carries.
- V04-WGAP-2 — T-V4-76 (a): a U-FADE `seal` of a last access vacates in the batch, and a reopen, dig or overlap lets
  dwellings return at the next placement; T-V4-48 and T-V4-76 (b): a `bricked` last access and its undo restore
  dwellings byte-identically; T-V4-76 (c): a saved document with unexcavated and lost clusters reloads with the same reading.
- V04-WGAP-3 — `W_RUIN_SOURCE_REMOVED` is among V04 §1b.1's twelve stage-warning codes, which cite §5.4 at item 338 (BCR-V4-41 — the request the finding names; the canon's link says item 558, which carries BCR-V4-42), produced by U-SYS or the dossier phase (V04 §2.6), reported in V04 §3.11; the base's §5.4 comment is a cross-part note.
- V04-WGAP-4 — `gradeFaces(chamberId)`, a derived reading (never stored, as `ruinColumns` is): V04 §3.5.4 (f), V04
  §1b.1, V04 §2.6's row, T-V4-78 (c); V03 §3.12 (9) cites it (cross-part note).

**Hand-offs (31), each closed here:**

| hand-off | closed at |
|---|---|
| V02:X12 | V04 §3.5.7 (d): the dig draw's key carries the key of a wing V02's mutator adds (V02 §3.9 W6); the obstacle test reads V02's footprint and basement floor (V02 §3.14.5 (f)); UC15 |
| V06:X1 | V04 §2.3's `CatacombRule` row cites V11 §3.23.8 for `growthCapShare` (a share per year compounded over an epoch's span); V04 §3.5.1 (6); T-V4-52 |
| V06:X2 (closed-stated, confirmed) | V04 §3.10: `AccessPass.run(doc, scope)` over `EpochScope`; a vacated void's households returned displaced with cause `void` (J-V4.125); U-NET laid whole at the first sewers epoch |
| V06:X14 | V04 §3.5.4 (d): `ArchVaults.reconcile` over `EpochScope.raised` (lay, collapse, delete with the span); V04 §3.10: U-NET's drops over `scope.levelled`; V04 §3.5.5 (a): a `RetainingWall` tombstoned inside a `raiseGrade` region read as a step of the buried floor |
| V06:X25 | V04 §1b.2: `Foundations.apply(doc, scope, cause)` exported, `under.extend` its epoch caller; V04 §3.5.0 *Foundations*; the maintenance mode (V04 §3.10); F6's dwellings at an epoch by relocation (V04 §3.4) |
| V06:X29 (closed-stated, confirmed) | item 573 (BCR-V6-27, `CalamityRef.deaths`), cited at V04 §1.2, §1b.2, §1b.5, §3.5.1 |
| V06:X33 (closed-stated, confirmed) | V04 §3.10 *Access closures*: "an epoch's clearance restores that host" is V06 §3.5.2's member-leaving batch; item 574 applied before item 319 |
| V07:FL-2 (closed-stated, confirmed) | `CatacombComplex.blockedBy` `'rung'` (V04 §2.2); `v.parish_church` counted (V04 §3.5.1 (3), T-V4-50); the maintenance mode (V04 §3.10) |
| V07:FL-3 | V04 §3.5.4 (d) reads the `country` reason (V07-XCONF-2); T-V4-62's clause; IN-V07-2's reason is V07's to correct (cross-part note) |
| V08:X3 | V04 §3.5.1's burial growth reads `CalamityRef.deaths` (item 573) |
| V08:X13 | V04 §3.5.0a (1): `site.ruinEvidence`'s seven kinds in V04's strongest-first order, DR30, DR31's relief and mining inputs, DR32's burial faces, rank and church count as V08 §2.6a states them |
| V09:XV-V9-3 | the view key `showUnexcavated` in V04 §1b.1, §1b.3, §2.6, §5.1; item 413 carries §8.4's text |
| V09:XV-V9-4 | V04 §4.5: `under/wayIn` on a cavern or ruin cluster and the `catacomb` why path; V04 §5.2 (7): the access symbol by `cause.rule` |
| V09:XV-V9-8 (closed-stated, confirmed) | V04 §8: AP6 priced inside M6-U |
| V09:XV-V9-14 | V04 §2.2: `Chamber.span` holds the raised way and the two raised-way piers' keys bounding its span; V04 §3.5.4 (d) |
| V09:XV-V9-27 (closed-stated, confirmed) | V04 §3.8's *Voids and bans* exception and *The dwelling closure's way in*, `DugGenerators` (V04 §1b.2), V04 §4.1's `addUndergroundAccess` row, T-V4-48, J-V4.119, J-V4.120 |
| V10:CVR-V10-1 | V04 §1b.2, V04 §4.5: `catacombOutcome(doc, face)`, the `underground` section provider with V10 §3.9a's rows, one catalogue key per value of `source.kind`, `blockedBy`, `cause.rule` and the outcome; T-V4-78 |
| V10:CVR-V10-10 (closed-stated, confirmed) | V04 §4.5's rows for an arch vault (span, reason), a ruin's monument (tiers laid, standing, truncated), the terminal cistern and a void met by a footing, their knowledge rules in the effects list too |
| V11:X-V11-4 | V04 §2.3: `CatacombRule.order`; V11 §3.23's rows cited, their values not restated; V04 §3.5.1 |
| V11:X-V11-10 | V04 §1.2's V11 row: `raised.vaultShare` scaled by `era.raisedVaultM × culture.raisedVaultM`; `CultureRow.monument` V11 §3.23.4's |
| V11:X-V11-14 | V04 §3.10: the four participants register `stage: 'U-FADE'` |
| V11:X-V11-15 (closed-stated, confirmed) | V04 §1b.1: `tables/dossier/sanitation` and `subterranean` "shipped rows, not calibratable"; V04 §8's content row |
| V11:X-V11-17 | V04 §8's register row and J-V4.93 name the cells `raisedWays.structure.span.*` (V11 §3.24.2's name map); the values in §2.7 (item 244) |
| V12:X-V12-4 | V04 §7: the item-109 bars are `StatBarSpec`s of V12 §3.6b's bar map (forced-source fixture sites, `undergroundInputOf`); V04 §8: the V4-U5 `PanelSpec` (SOLO) confirmed |
| V12:X-V12-11 | T-V4-69 registers on V12 §3.7.8's engine, "off" read as V11 §3.24.0's switch table |
| V12:X-V12-13 | V04 §7: T-V4-54 reads g's voids (connected components); "± 3 s.e." and 500 seeds as the specs' parameters; T-V4-51's step script is V12 §3.6b's; `CatacombComplex.id` keeps its source lineage |
| V12:X-V12-15 | V04 §8: this volume registers no `BenchBarDef` of its own |
| V12:X-V12-16 | V04 §8 *The register at each exit* (J-V4.117): V04 writes no line of its own; its columns take V12 §3.11's named lines |
| V12:X-V12-17 | V04 §8: the due steps read the later corpus run (`M-CAL/under`); `--milestone <the step's id>` |
| V12:X-V12-18 (closed-stated, confirmed) | V04 §8's multi-stage rows are one entry each with `stages` in the line's order |
| V12:X-V12-19 (closed-stated, confirmed) | V04 §8's span row and J-V4.118 name `raisedWays.structure.span.*` beside the prose keys; the values stay at item 244 |

**Open findings routed here (59):**

| finding | closed by |
|---|---|
| VOL-V03-V04-RESTATEMENTS-005, -006 | V04 §3.3 and §2.4 cite §4.2 S2 (the dense core share) and II.7.3 (the capacity law, the minimum depth); no value restated |
| -007, -008 | V04 §3.10 cites §4.11's persistence table; V04 §5.3 cites §8.4's `ambient.underground` |
| -009 | V04 §3.5.7 (c), (d) cite II.7.6's `accessReachM` and the basement floor's home |
| -010 | V04 §3.5.0 *Foundations* (1) and V04 §6 cite §2.7 (item 244) for `span.supportFoundationCm` and `span.vaultCap` (the base's names) |
| -011 | V04 §3.5.1 (2) cites II.7.6's ossuary law (item 560) for `A(f)` |
| -012, V04-RESTATE-1 | V04 §2.3's `CatacombRule` row cites V11 §3.23.8; the cell keeps the schema and the compounding rule |
| -013, V04-RESTATE-3 | V04 §2.3's defaults table cites V11 §3.23 for the rows V11 owns and states none of their values |
| -014, V04-RESTATE-2 | V04 §8 cites §16's total (computed once, item 568) |
| V04-DUP-1 | V04 §3.10 *The opening pass* — the one list; V04 §1b.2, §3.5.7 (e), §3.8, §3.10's growth step and §4.3 cite it |
| V04-ICONF-1 – 5, V04-XCONF-1 – 3 | §3 above |
| V04-ELEG-1 | E-03, §4 above |
| V04-EDGE-1 | V04 §3.7 L5 and §1b.5: a dossier removal or close releases the L5 pieces (kept `dug`, cause `dossier`, no longer held, fading from the next epoch; J-V4.123); V04 §4.4; UE13; T-V4-34 (e) |
| V04-EDGE-2 | V04 §3.5.7 (g): "open" read as passable (J-V4.122); V04 §12 PLAUSIBLE |
| V04-WGAP-1 | V04 §1b.5's derivation-row column names DR ids (DR17, DR19, DR24, DR29–DR34, DR36–DR39) |
| V04-WGAP-2 – 4 | §6 above |
| V04-WGAP-5 | V04 §1b.2's interface rows for `catacombOutcome`, the section provider and `under/wayIn`; V04 §4.5; T-V4-78 |
| V04-MISSING-1 | §2 above (g item 113) |
| V04-MISSING-2, V04-DEFER-1 | V04 §11 answered (J122); V04 §8 *Where it slots* states the decided order |
| V04-TERM-1 | §5 above (ID-BCR, G-cite) |
| V04-NARR-1 – 7 | §1 above (NARRATION) |
| V04-BREF-1 | every self-reference to a V04 subsection carries `V04`; the reference check finds 0 unresolved |
| SLR6-02 | V04 §6 prices the underground switch's edit (the ground-edit row V04 §4.3 reads) |
| SLR6-03 | V04 §12's stale hedge left with the narration; J-V4.121 names §7.4's undo row |
| SCC-113 | J-V4.118's rows confirm at V12's staged form (panel M4's M4-110 group, T-V4-62 at V4-U3, the V4-U5 panel) and name V11's cells `raisedWays.structure.span.*` |
| V04:IN-V04-1 – 14 | folded at their homes; the Integration-notes map gives each home |

**Owner questions:** Q1 and Q2 marked answered (J122). **Cohesion:** V04 §8 agrees with INDEX §3/§4 and §16 (M6-U after
M5, beside it with a second pair; 28.25–39.25 pw; §16's total the base's); §11 answered; §1b names each piece's producer
and consumer; one marker line, no ledger or round log.

## 7 Edges (principle (11))

V04 §3.11 defines every catalogue entry routed here: the 52 UNDEFINED and 62 UNTESTED mechanism edges (31 rows UE1 – UE31,
one per mechanism section, each with its outcome by edge class E1 – E8, its §5 rung and its test) and the 62 UNDEFINED
combinations (18 rows UC1 – UC18). T-V4-79 runs one fixture per UE row that names it and T-V4-80 one per UC row at every
rung it names; the other rows name their existing test. The named combination this volume owns — "a catacomb growing into
a sewer" — is the typed opening of V04 §0 and V04 §3.5.1's growth (a meeting is a typed opening, never a merge), barred by
the growth bars. No edge's outcome is a crash, hang, lost datum, silent wrong result or whole-map retry. The two edges the
inventory raised (V04-EDGE-1, -2) are ruled by J-V4.123 and J-V4.122.

**Catalogue ids → V04 §3.11 rows** (the ids live here, not in the volume):

| V04 §3.11 row | catalogue ids (status) |
|---|---|
| UE1 (V04 §2.2) | M-V04-551: E5 (undef), E8 (untes) |
| UE2 (V04 §2.3) | M-V04-671: E5 (untes), E8 (untes) |
| UE3 (V04 §2.3a) | M-V04-863: E5 (untes), E8 (untes) |
| UE4 (V04 §2.4) | M-V04-892: E5 (undef) |
| UE5 (V04 §2.5) | M-V04-914: E5 (undef), E8 (untes) |
| UE6 (V04 §2.6) | M-V04-953: E5 (untes), E8 (untes) |
| UE7 (V04 §3.1) | M-V04-992: E1 (untes), E2 (untes), E3 (untes), E4 (undef), E5 (untes), E6 (untes), E7 (untes), E8 (untes) |
| UE8 (V04 §3.2) | M-V04-1051: E6 (undef) |
| UE9 (V04 §3.3) | M-V04-1228: E1 (untes), E2 (untes), E3 (untes), E4 (undef), E5 (untes), E6 (untes), E8 (undef) |
| UE10 (V04 §3.4) | M-V04-1276: E1 (undef), E4 (undef), E6 (undef) |
| UE11 (V04 §3.6) | M-V04-1892: E1 (untes), E2 (untes), E4 (undef), E5 (untes), E6 (undef), E8 (undef) |
| UE12 (V04 §3.6a) | M-V04-1962: E5 (undef) |
| UE13 (V04 §3.7) | M-V04-1981: E4 (undef), E6 (undef), E8 (undef) |
| UE14 (V04 §3.7a) | M-V04-2025: E1 (undef), E2 (undef), E4 (undef), E6 (undef) |
| UE15 (V04 §3.8) | M-V04-2041: E1 (untes), E2 (untes), E4 (untes), E5 (untes), E6 (undef), E8 (untes) |
| UE16 (V04 §3.9) | M-V04-2110: E1 (untes), E2 (untes), E5 (undef), E6 (undef) |
| UE17 (V04 §3.10) | M-V04-2143: E4 (undef) |
| UE18 (V04 §3.11) | M-V04-2266: E1 (untes), E3 (untes), E4 (undef), E5 (untes), E6 (untes), E7 (untes), E8 (untes) |
| UE19 (V04 §3.12) | M-V04-2295: E4 (undef), E5 (undef) |
| UE20 (V04 §4.1) | M-V04-2340: E1 (undef), E2 (untes), E4 (undef), E5 (untes), E7 (untes), E8 (untes) |
| UE21 (V04 §4.2) | M-V04-2366: E3 (untes), E4 (undef), E5 (undef), E8 (untes) |
| UE22 (V04 §4.3) | M-V04-2385: E1 (untes), E2 (untes), E4 (undef), E5 (untes), E6 (undef), E7 (untes), E8 (untes) |
| UE23 (V04 §4.4) | M-V04-2409: E5 (undef), E8 (untes) |
| UE24 (V04 §4.5) | M-V04-2422: E1 (undef), E2 (undef), E8 (undef) |
| UE25 (V04 §4.6) | M-V04-2441: E1 (untes), E2 (untes), E3 (untes), E5 (untes), E7 (untes), E8 (untes) |
| UE26 (V04 §4.7) | M-V04-2467: E5 (undef) |
| UE27 (V04 §5.1) | M-V04-2489: E1 (untes), E2 (untes), E5 (untes), E6 (untes), E7 (undef) |
| UE28 (V04 §5.2) | M-V04-2509: E1 (undef), E2 (undef), E4 (undef), E5 (untes), E6 (undef), E7 (untes) |
| UE29 (V04 §5.3) | M-V04-2560: E1 (undef), E2 (untes), E6 (undef) |
| UE30 (V04 §5.4) | M-V04-2577: E5 (untes), E6 (undef) |
| UE31 (V04 §5.5) | M-V04-2593: E4 (undef), E6 (undef), E7 (undef) |
| V04 §3.7 L5, V04 §1b.5, V04 §4.4 (J-V4.123; UE13; T-V4-34 (e)) | EI-V04-EDGE-1 (V04-EDGE-1, undefined) |
| V04 §3.5.7 (g) (J-V4.122; T-V4-76; V04 §12) | EI-V04-EDGE-2 (V04-EDGE-2, undefined) |

**Combinations → V04 §3.11 rows:**

| V04 §3.11 row | catalogue ids |
|---|---|
| UC1 | C-cliff-sewer |
| UC2 | C-cliff-cavern, C-cliff-ruin, C-cliff-void |
| UC3 | C-cliff-catacomb |
| UC4 | C-cliff-undercity, C-cliff-access, C-cliff-vault |
| UC5 | C-steep-sewer, C-steep-cavern, C-steep-ruin, C-steep-catacomb, C-steep-undercity, C-steep-void, C-steep-access, C-steep-vault |
| UC6 | C-coast-access |
| UC7 | C-moat-cavern, C-moat-ruin, C-moat-catacomb, C-moat-access, C-moat-vault |
| UC8 | C-bridge-access |
| UC9 | C-deckplot-sewer, C-deckplot-cavern, C-deckplot-ruin, C-deckplot-catacomb, C-deckplot-undercity, C-deckplot-void, C-deckplot-access, C-deckplot-vault |
| UC10 | C-oasis-sewer |
| UC11 | C-oasis-cavern, C-oasis-ruin, C-oasis-catacomb, C-oasis-undercity, C-oasis-void, C-oasis-access, C-oasis-vault |
| UC12 | C-frame-cavern, C-frame-ruin, C-frame-catacomb, C-frame-undercity, C-frame-void, C-frame-access, C-frame-vault |
| UC13 | C-hood-vault |
| UC14 | C-terraced-ward-sewer, C-terraced-ward-cavern, C-terraced-ward-ruin, C-terraced-ward-undercity, C-terraced-ward-access, C-terraced-ward-vault |
| UC15 | C-composed-sewer, C-composed-cavern, C-composed-catacomb, C-composed-undercity, C-composed-access |
| UC16 | C-tiers-access |
| UC17 | C-cavern-undo, C-ruin-undo |
| UC18 | C-vault-lock |

## 8 CROSS-PART NOTES

1. **determinism (§5.4):** the report's `warnings` comment names seven underground codes (item 338); V04 §1b.1 lists
   twelve — add `W_RUIN_SOURCE_REMOVED`, `W_RUIN_MONUMENT_SKIPPED`, `W_ARCH_VAULT_NO_DOOR`, `W_TERMINAL_CISTERN_SKIPPED`
   and `W_BURIED_FORMER_SKIPPED`, or cite V04 §1b.1 in place of the list (single source). The canon's V04-WGAP-3 link
   says "item 558"; the request is BCR-V4-41 = item 338 (item 558 carries BCR-V4-42).
2. **determinism:** §7.4's underground edit row (the `AccessPoint.state` clause, item 555), §6.1's fixed-key draw
   (E-03) and §7.7's DR36–DR39 (DR37 the age and scars, DR39 the burial) agree with V04 §2.6, §3.12 and §1b.5 as
   written; no change.
3. **scope (§13):** the take-over row "T113-4, T113-5 … | the underground layer (volume 4, M6-U) | T-V4-1 – T-V4-75" and
   the M6-U line "Volume 4's T-V4-1 – T-V4-75" read T-V4-1 – T-V4-80: T-V4-76 takes over T113-5's underground clause
   (the lost reading), T-V4-77 T113-4's (the buried former settlement), T-V4-78 the providers and grade faces, T-V4-79
   the edges, T-V4-80 the combinations.
4. **scope (§14, §16, INDEX):** §14's PageUp/PageDown precedence (the storey first while a plan is open, else the depth
   band) agrees with V04 §5.1; §16's M6-U row (after M5 or beside it with a second pair; 28.25–39.25 pw; the buried
   former settlement of item 113) agrees with V04 §8; INDEX §6 marks V04 Q1 and Q2 decided (J122).
5. **V03:** T-V3-23 (g) is closed by T-V4-50's elaboration-independence clause; V03 §3.12 (9) reads `gradeFaces(chamberId)`
   as V04 §3.5.4 (f)'s derived reading (never a stored field); V03 §4.5 cites §14's key precedence.
6. **V06:** the replay calls `BuriedFormer.lay` at a burial epoch while `@plat/under` is registered, clears the former
   fabric's surface records in that batch and writes `HistoryRecord.buried`; its ledger re-houses a lost void's households
   returned displaced with cause `void` in the same epoch (J-V4.125); V06 §6.2's per-epoch sums are the four participants'
   budgets; the participants register `stage: 'U-FADE'` (X-V11-14 (a)).
7. **V07:** V07 §1 (5) and V07 §3.16 (1) cite the span rule's `country` reason (§2.7, item 244; J-C4) and drop the village
   fallback; IN-V07-2's reason is corrected (V07-XCONF-2).
8. **V08:** V04 §3.5.0a (1) reads `site.ruinEvidence`'s seven kinds, DR30, DR31 and DR32 as V08 §2.6a states them (X13);
   V04 §3.5.1's burial growth reads `CalamityRef.deaths` (item 573; X3).
9. **V09:** the `showUnexcavated` and active-layer controls; the lost void's panel line; the catalogue keys `info.under.*`
   and `info.catacomb.*` of V04 §4.5, `info.under.excavation.lost` and `info.under.none` among them; the access symbol by
   `cause.rule` (V04 §5.2 (7)); "At street level, under {way}" for an arch vault reads `Chamber.span` (XV-V9-14).
10. **V10:** V10 §3.9a's void-cluster row gains the `lost` state ("once known", read from `ExcavationRecord`); its
    explanations run over V04 §4.5's providers (`catacombOutcome`, the `underground` section rows, `under/wayIn`).
11. **V11:** `history.burialYears` with its factors is read by V04 §3.5.5 (b) through DR39; row 59's `under.systems`
    `params` carry the `buried` row's six keys (V04 §2.3); V04 §2.3 cites V11 §3.23 for every row V11 owns and states none
    of their values (X-V11-4); the `stepped-shrine` heights row; `raisedWays.structure.span.*` named in V04 §8 (X-V11-17);
    V04 now names the span cells as the base does (`span.vaultShare`, `span.vaultCap`, `span.supportFoundationCm`), so
    V11's comments reading "V04's `raised.vaultShare`" (its W58 row, the `raisedVaultM` comment, the `raisedWays.structure`
    block's prose keys) read the `span.*` names.
12. **V12:** the `buried` params take the default register line at U3's exit (V04 §8's U3 row); T-V4-76 – T-V4-80 are
    hard conformance bars with no register line; the V4-U5 `PanelSpec` (SOLO) is confirmed (X-V12-4); T-V4-69 on V12
    §3.7.8's engine (X-V12-11).
13. **Integration notes / assemble:** V04 keeps the heading as a map (note → J-VI decision → home), each note applied at
    its home as ID-WX rules; verifiers read it as applied, not as open notes. Shrink 83 966 → 74 624 words (−11.1 %, below
    the band: the ruled additions and the build-depth body, §1); doc_checks provisional (reference corpus absent: C1 0,
    C2 0, C4 0, S1 0; C3 179 generic, S2 116 all volume-prefixed; the original's C3 232, S2 96).

## 9 Judgment calls (vetoable)

1. **The Integration notes** (brief: "keep the Integration notes"; canon ID-WX: the IN ids live only in validation
   records). Both are met as volumes 2 and 3 landed them: every note's content is written at its home, and the section is
   a short map note → J-VI decision → home. Volumes 1 and 5 dropped the ids; the assembler may drop the first column with
   no loss.
2. **"Open" read as passable** (J-V4.122; V04-EDGE-2): a gate, a lock and a secret door join the surface for those who
   hold the key or know the way; a `collapsed` or `flooded` link, a `bricked` access and every closed element break the
   path. The owner's words are "access counts only through OPEN links"; V04 §12 records the reading as PLAUSIBLE.
3. **The lost state as a derived reading plus one stored memory** (`ExcavationRecord.reached`) over a stored state per
   cluster (J-V4.122): the memory is the one fact the connection graph cannot derive.
4. **The L5 release** (J-V4.123; V04-EDGE-1): a dossier removal or close keeps the L5 pieces as `dug` elements with cause
   `dossier`, no longer held, fading from the next epoch — never torn down (item 11).
5. **The edge and combination outcomes** (J-V4.124): an oasis's spring never an outfall; a cliff crossed by a run as a
   drop, as a wall is; no access on water, a bridge deck, a cliff or a deck building (a hand one bent to the nearest lawful
   point); a locked vault held against every generator; every system clipped at its margin ring.
6. **The epoch budgets and the ledger** (J-V4.125): V06 §6.2's per-epoch sums are the participants' budgets; a lost void's
   households go back to V06's ledger as displaced with cause `void`.
7. **The shrink below the band.** Verbose-prose compaction was kept to ≈ 1 200 words: the body states rules at build
   depth, and further cuts would thin cases (principle (9)'s guard). The canon's restatement, narration and duplication
   sources are exhausted (§1).
8. **"calibrate-later"** in V04 §2.3's `terminalCisternM2` cell replaced by the register form "provisional; V12 §3.11
   register entry" — the canon's ruling of the same wording in volume 11 (V11-DEFER-2), applied to this volume's one use
   (principle (6)); the paragraph already declares its cells calibratable.
9. **`gradeFaces` as a derived reading** (V04-WGAP-4 allowed a field or a reader): derived from the chamber's outline and
   its kind's open faces, never stored, as `ruinColumns` is, so no lifecycle beyond its chamber's.
10. **The span cells' names.** V04 wrote V11's prose aliases `raised.vaultShare`, `raised.vaultCap` and
   `raised.supportFoundationCm`; the rewritten base (§2.7, item 244's span rule) names the same cells `span.vaultShare`,
   `span.vaultCap` and `span.supportFoundationCm` (V11 row 80's `raisedWays.structure`), and no other unit keeps the
   aliases. V04's six uses now read the base's names — a rename of the same cells, no value or rule changed.

## 10 Checks run (provisional where noted)

- **Ids** (`idcheck.py` over the final text): J-V4.1 – J-V4.125, T-V4-1 – T-V4-80, UE1 – UE31, UC1 – UC18, BCR-V4-1 –
  BCR-V4-46 and the fourteen map rows each defined once, in their home section, no gap, none cited undefined; every other
  volume's T-/J- id cited exists in that volume; every J-VI id in `_integrate.md`; every J-A, D-, J-C id in the base, the
  rationale, the amendments or the canon; 0 bare `BCR-n`, 0 DR aliases, 0 `V4 §` or `V1-x.y` forms, 0 critique or finding
  tags. The two `X-V12-15`/`X-V12-16` ids name their volume in the id itself.
- **References** (`refcheck.py`): every `Vnn §x` resolves to a heading of that volume (old or rewritten); every bare `§x`
  and `II.x` to the base; 0 unresolved. Three bare `§8.4`/`§2.9` citations follow a `V04` citation in the same sentence;
  V04 has no such section and the base does, so each reads as the base's. 18 volume prefixes split across a line wrap
  were rejoined.
- **Terms and narration:** 0 hits for "first paint", "standalone hood(s)", `LayerSpec.showUnexcavated`, PROGRESS,
  RECONCILED, "round n", TBD, "to be decided", "open question", scratch or owner-machine paths; the one "reconciliation"
  and one "revisions" are in the kept marker line. Every "until", "later", "pending" hit reads as time (a later epoch or
  system, "until refound") or as a provenance with its confirming step ("PLAUSIBLE until the owner's panel, V04 §8"),
  never an unresolved choice; "calibrate-later" fixed (§9, call 8).
- **Agreement with the rewritten base** (every backticked identifier of V04 checked against the old base and the
  rewritten base parts in `new/base/`): one set of names the base had renamed — the span cells, aligned (§9, call 10); the
  other hit (`ElaborationRecord.inputs`) is the same field, declared in the model rewrite. §7.4's underground edit row,
  §6.1's fixed-key draw, §7.7's DR36–DR39, §11.1's VTT underground scene, §14's key precedence, §16's M6-U row and II.7's
  lost void agree with V04 as written; §5.4's warning list and §13's T-V4 range are cross-part notes 1 and 3.
- **Coverage:** 12 conflicts, 6 wiring gaps, E-03/E-16/E-24/E-39, 4 id rulings, 5 retired terms, 59 f items (each cited),
  g item 113 (c) and (e) (written), 59 open findings, 31 hand-offs, 114 edges → UE1 – UE31 and 2 ruled edges, 62
  combinations → UC1 – UC18, 2 owner questions, 4 cohesion items — each located in the text (§2 – §7 above).
- **Clean room** (`docs/validation/bench/doc_checks.py --doc <output> --heads docs/ARCHITECTURE.md`): WARNING "reference
  corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) —
  clean-room results are NOT authoritative"; C1 0, C2 0, C4 0, S1 0; C3 179 (the original 232), each a common phrase, a
  digit run of section numbers and values, the marker line or a cited file path — no reference content; S2 116 (the
  original 96; more citations replace restated values), every one a volume-prefixed pointer the tool resolves against the
  base's headings. Provisional until re-run where the corpus is held; V04 §13 records the same.

## 11 Words by section (old → new, `str.split`)

| section | old | new | change |
|---|---|---|---|
| title, marker, reading note (old: banners, ledgers) | 1740 | 177 | -1563 |
| 0 | 1200 | 1282 | +82 |
| 1 | 13 | 13 | +0 |
| 1.1 | 595 | 614 | +19 |
| 1.2 | 1930 | 1938 | +8 |
| 1.3 | 653 | 696 | +43 |
| 1b | 65 | 75 | +10 |
| 1b.1 | 1848 | 1875 | +27 |
| 1b.2 | 1354 | 1146 | -208 |
| 1b.3 | 474 | 502 | +28 |
| 1b.4 | 612 | 681 | +69 |
| 1b.5 | 1023 | 1105 | +82 |
| 2 | 4 | 4 | +0 |
| 2.1 | 99 | 159 | +60 |
| 2.2 | 1486 | 742 | -744 |
| 2.3 | 2630 | 2560 | -70 |
| 2.3a | 413 | 544 | +131 |
| 2.4 | 297 | 338 | +41 |
| 2.5 | 796 | 903 | +107 |
| 2.6 | 1616 | 1813 | +197 |
| 3 | 3 | 3 | +0 |
| 3.1 | 1501 | 1520 | +19 |
| 3.2 | 2831 | 2821 | -10 |
| 3.3 | 813 | 870 | +57 |
| 3.4 | 917 | 975 | +58 |
| 3.5 | 10044 | 11738 | +1694 |
| 3.6 | 1202 | 1335 | +133 |
| 3.6a | 264 | 304 | +40 |
| 3.7 | 735 | 880 | +145 |
| 3.7a | 260 | 257 | -3 |
| 3.8 | 1236 | 1243 | +7 |
| 3.9 | 742 | 764 | +22 |
| 3.10 | 2075 | 2082 | +7 |
| 3.11 | 772 | 3879 | +3107 |
| 3.12 | 648 | 716 | +68 |
| 4 | 54 | 54 | +0 |
| 4.1 | 835 | 970 | +135 |
| 4.2 | 463 | 511 | +48 |
| 4.3 | 1160 | 1143 | -17 |
| 4.4 | 180 | 221 | +41 |
| 4.5 | 308 | 646 | +338 |
| 4.6 | 376 | 420 | +44 |
| 4.7 | 297 | 296 | -1 |
| 5 | 6 | 6 | +0 |
| 5.1 | 322 | 338 | +16 |
| 5.2 | 785 | 890 | +105 |
| 5.3 | 293 | 301 | +8 |
| 5.4 | 320 | 334 | +14 |
| 5.5 | 558 | 603 | +45 |
| 6 | 1196 | 1351 | +155 |
| 7 | 5056 | 6061 | +1005 |
| 8 | 3155 | 3204 | +49 |
| 9 | 7429 | 7987 | +558 |
| 10 | 7110 | 814 | -6296 |
| 11 | 335 | 75 | -260 |
| 12 | 2705 | 1051 | -1654 |
| 13 | 2072 | 473 | -1599 |
| Integration notes | 660 | 317 | -343 |
| reconciliation rounds 1–6 and continuations | 5077 | 0 | -5077 |
| integration notes — continuation | 158 | 0 | -158 |
| finalization | 165 | 0 | -165 |
| **total** | **83966** | **74620** (final text 74 624, after the register-form fix) | **-9346** |

The final text's four extra words are §2.3's register form (§9, call 8); the rejoined prefixes change no count.

## 12 MAPPING TABLE — every inventory id of the volume → where it now lives

Generated by `docs/validation/coherence/work/rewrite-V04/mapping.py` from the inventory
(`docs/validation/coherence/inventory-vol-V03-V04.json`, the 360 ids `V04-…`), the canon's role for each id and the final
text: a `home` item lives in its own section of the new text (its old section, the structure kept); a `reference` item
is cited at its canonical home, not restated; a BCR item is V04 §10's pointer row to its applied file f item; a §9 item
is its decision row (with its E-24 mark); an IN item is folded at the homes the Integration-notes map gives; thirteen
items moved or split carry their exact homes. 360 rows, 0 unmapped.

| inventory id | old § | kind | canon role | now lives |
|---|---|---|---|---|
| V04-0001 | 0 | summary | home | V04 §0 |
| V04-0002 | 0 | summary | home | V04 §0 |
| V04-0003 | 0 | summary | home | V04 §0 |
| V04-0004 | 0 | summary | home | V04 §0 |
| V04-0005 | 1.1 | scope | home | V04 §1.1 |
| V04-0006 | 1.1 | rule | home | V04 §1.1 |
| V04-0007 | 1.2 | hook | index-row | V04 §1.2 (an index row of citations) |
| V04-0008 | 1.2 | hook | index-row | V04 §1.2 (an index row of citations) |
| V04-0009 | 1.2 | hook | index-row | V04 §1.2 (an index row of citations) |
| V04-0010 | 1.2 | term | glossary | V04 §1.2 (the term defined once there) |
| V04-0011 | 1.2 | rule | home | V04 §1.2 |
| V04-0012 | 1.2 | term | glossary | V04 §1.2 (the term defined once there) |
| V04-0013 | 1.3 | scope | index-row | V04 §1.3 (the out-of-scope row; the callers named in V04 §1b.2) |
| V04-0014 | 1.3 | scope | index-row | V04 §1.3 (the plan rung row: stage 3, §2.6, item 28; V03 draws, V04 reserves) |
| V04-0015 | 1b | rule | home | V04 §1b |
| V04-0016 | 1b.1 | record | reference | V04 §1b.1 cites model §2.3 (the fact at its home, not restated) |
| V04-0017 | 1b.1 | record | reference | V04 §1b.1 cites model §2.4 (the fact at its home, not restated) |
| V04-0018 | 1b.1 | record | reference | V04 §1b.1 cites model §2.7 (the fact at its home, not restated) |
| V04-0019 | 1b.1 | record | reference | V04 §1b.1 cites model §2.5 (the fact at its home, not restated) |
| V04-0020 | 1b.1 | table | home | V04 §1b.1 |
| V04-0021 | 1b.1 | table | reference | V04 §1b.1 cites pipeline §4.7 (the fact at its home, not restated) |
| V04-0022 | 1b.1 | record | reference | V04 §1b.1 cites pipeline §4.5 (the fact at its home, not restated) |
| V04-0023 | 1b.1 | record | reference | V04 §1b.1 cites pipeline §4.1 (the fact at its home, not restated) |
| V04-0024 | 1b.1 | record | reference | V04 §1b.1 cites determinism §7.8 (the fact at its home, not restated) |
| V04-0025 | 1b.1 | record | reference | V04 §1b.1 cites rendering §8.2 (the fact at its home, not restated) |
| V04-0026 | 1b.1 | table | reference | V04 §1b.1 cites determinism §7.7 (the fact at its home, not restated) |
| V04-0027 | 1b.1 | record | reference | V04 §1b.1 (F-NET row → item 330; the stage-warning row → items 338, 558, `W_RUIN_SOURCE_REMOVED` in item 558's list, V04-WGAP-3) |
| V04-0028 | 1b.1 | record | reference | V04 §1b.1 cites model §2.7 (the fact at its home, not restated) |
| V04-0029 | 1b.1 | record | reference | V04 §1b.1 cites model §2.7 (the fact at its home, not restated) |
| V04-0030 | 1b.1 | record | reference | V04 §1b.1 cites pipeline II.7.4 (the fact at its home, not restated) |
| V04-0031 | 1b.1 | interface | home | V04 §1b.1 |
| V04-0032 | 1b.1 | record | reference | V04 §1b.1 cites model §2.7 (the fact at its home, not restated) |
| V04-0033 | 1b.1 | record | home | V04 §1b.1 |
| V04-0034 | 1b.1 | record | reference | V04 §1b.1 cites determinism §7.8 (the fact at its home, not restated) |
| V04-0035 | 1b.1 | interface | home | V04 §1b.1 |
| V04-0036 | 1b.1 | record | reference | V04 §1b.1 cites pipeline §4.7 (the fact at its home, not restated) |
| V04-0037 | 1b.1 | record | reference | V04 §1b.1 cites model §2.7 (the fact at its home, not restated) |
| V04-0038 | 1b.1 | interface | home | V04 §1b.1 |
| V04-0039 | 1b.1 | record | home | V04 §1b.1 |
| V04-0040 | 1b.2 | interface | home | V04 §1b.2 |
| V04-0041 | 1b.2 | interface | home | V04 §1b.2 |
| V04-0042 | 1b.2 | interface | home | V04 §1b.2 (the buried-system builder row); the buried floor's steps V04 §3.5.0 *Foundations* and V04 §3.5.5 (a) |
| V04-0043 | 1b.2 | interface | home | V04 §1b.2 |
| V04-0044 | 1b.2 | interface | reference | V04 §1b.2 cites V01 V01 §3.7.1 (the fact at its home, not restated) |
| V04-0045 | 1b.2 | interface | home | V04 §1b.2 |
| V04-0046 | 1b.2 | interface | home | V04 §1b.2 |
| V04-0047 | 1b.2 | interface | home | V04 §1b.2 |
| V04-0048 | 1b.2 | rule | home | V04 §1b.2 |
| V04-0049 | 1b.3 | edit | home | V04 §1b.3 |
| V04-0050 | 1b.4 | rule | home | V04 §1b.4 |
| V04-0051 | 1b.5 | rule | reference | V04 §1b.5 cites determinism §7.7 (the fact at its home, not restated) |
| V04-0052 | 1b.5 | rule | reference | V04 §1b.5 cites determinism §7.7 (the fact at its home, not restated) |
| V04-0053 | 2.1 | rule | reference | V04 §2.1 cites pipeline II.7.4 (the fact at its home, not restated) |
| V04-0054 | 2.2 | record | reference | V04 §2.2 cites model §2.3 (the fact at its home, not restated) |
| V04-0055 | 2.2 | record | reference | V04 §2.1 (`wayFall` and `Junction.arms`, `.chamber` read as the base declares them, §2.4, item 208); V04 §1b.1 row; `levelCm` in V04 §2.3 `NetworkRule` |
| V04-0056 | 2.2 | record | reference | V04 §2.1 (the `Tunnel` fields read as §2.7 declares them, item 247); V04 §1b.1 and V04 §2.6 rows |
| V04-0057 | 2.2 | record | reference | V04 §2.1 (`ChamberKind` and `Chamber.span` read as §2.7 declares them, items 247, 250); the span key V04 §3.5.4 (d) |
| V04-0058 | 2.2 | record | reference | V04 §2.2 cites model §2.7 (the fact at its home, not restated) |
| V04-0059 | 2.2 | record | reference | V04 §2.2 cites model §2.7 (the fact at its home, not restated) |
| V04-0060 | 2.2 | record | reference | V04 §2.2 cites pipeline II.7.4 (the fact at its home, not restated) |
| V04-0061 | 2.2 | record | reference | V04 §2.2 cites model §2.7 (the fact at its home, not restated) |
| V04-0062 | 2.2 | record | home | V04 §2.2 |
| V04-0063 | 2.2 | record | home | V04 §2.2 |
| V04-0064 | 2.3 | rule | home | V04 §2.3 |
| V04-0065 | 2.3 | table | home | V04 §2.3 |
| V04-0066 | 2.3 | table | home | V04 §2.3 |
| V04-0067 | 2.3 | table | home | V04 §2.3 |
| V04-0068 | 2.3 | table | home | V04 §2.3 |
| V04-0069 | 2.3 | table | home | V04 §2.3 |
| V04-0070 | 2.3 | table | home | V04 §2.3 |
| V04-0071 | 2.3 | table | home | V04 §2.3 |
| V04-0072 | 2.3a | table | reference | V04 §2.3a cites determinism §7.7 (the fact at its home, not restated) |
| V04-0073 | 2.3a | table | reference | V04 §2.3a cites determinism §7.7 (the fact at its home, not restated) |
| V04-0074 | 2.4 | record | home | V04 §2.4 |
| V04-0075 | 2.5 | table | reference | V04 §2.5 cites determinism §6.3 (the fact at its home, not restated) |
| V04-0076 | 2.6 | lifecycle | home | V04 §2.6 |
| V04-0077 | 2.6 | lifecycle | home | V04 §2.6 |
| V04-0078 | 2.6 | lifecycle | home | V04 §2.6 |
| V04-0079 | 3.1 | rule | home | V04 §3.1 |
| V04-0080 | 3.1 | table | home | V04 §3.1 |
| V04-0081 | 3.1 | rule | home | V04 §3.1 |
| V04-0082 | 3.1 | rule | home | V04 §3.1 |
| V04-0083 | 3.1 | rule | home | V04 §3.1 |
| V04-0084 | 3.2 | rule | home | V04 §3.2 |
| V04-0085 | 3.2 | rule | home | V04 §3.2 |
| V04-0086 | 3.2 | rule | home | V04 §3.2 |
| V04-0087 | 3.2 | mechanism | home | V04 §3.2 |
| V04-0088 | 3.2 | rule | home | V04 §3.2 |
| V04-0089 | 3.2 | rule | home | V04 §3.2 |
| V04-0090 | 3.2 | rule | home | V04 §3.2 |
| V04-0091 | 3.2 | mechanism | home | V04 §3.2 |
| V04-0092 | 3.2 | rule | home | V04 §3.2 |
| V04-0093 | 3.2 | rule | home | V04 §3.2 |
| V04-0094 | 3.2 | rule | home | V04 §3.2 |
| V04-0095 | 3.2 | rule | home | V04 §3.2 |
| V04-0096 | 3.2 | rule | home | V04 §3.2 |
| V04-0097 | 3.3 | mechanism | home | V04 §3.3 |
| V04-0098 | 3.3 | mechanism | home | V04 §3.3 |
| V04-0099 | 3.4 | rule | home | V04 §3.4 |
| V04-0100 | 3.4 | rule | home | V04 §3.4 |
| V04-0101 | 3.4 | rule | home | V04 §3.4 |
| V04-0102 | 3.4 | fallback | home | V04 §3.4 |
| V04-0103 | 3.5.0 | table | home | V04 §3.5.0 (the existence-order table; the raised way's record §2.7, item 244) |
| V04-0104 | 3.5.0 | rule | home | V04 §3.5.0 |
| V04-0105 | 3.5.0 | rule | home | V04 §3.5.0 |
| V04-0106 | 3.5.0 | mechanism | home | V04 §3.5.0 |
| V04-0107 | 3.5.0 | mechanism | home | V04 §3.5.0 |
| V04-0108 | 3.5.0 | table | home | V04 §3.5.0 |
| V04-0109 | 3.5.0a | rule | home | V04 §3.5.0a |
| V04-0110 | 3.5.0a | rule | home | V04 §3.5.0a |
| V04-0111 | 3.5.0a | rule | home | V04 §3.5.0a |
| V04-0112 | 3.5.0a | rule | home | V04 §3.5.0a |
| V04-0113 | 3.5.0a | rule | home | V04 §3.5.0a |
| V04-0114 | 3.5.0a | rule | home | V04 §3.5.0a |
| V04-0115 | 3.5.0a | rule | home | V04 §3.5.0a |
| V04-0116 | 3.5.0a | rule | home | V04 §3.5.0a |
| V04-0117 | 3.5.1 | rule | home | V04 §3.5.1 |
| V04-0118 | 3.5.1 | rule | home | V04 §3.5.1 (2): the rank by need, citing II.7.6's ossuary law (item 560) for `A(f)` (RESTATEMENTS-011) |
| V04-0119 | 3.5.1 | rule | home | V04 §3.5.1 |
| V04-0120 | 3.5.1 | rule | home | V04 §3.5.1 |
| V04-0121 | 3.5.1 | rule | home | V04 §3.5.1 |
| V04-0122 | 3.5.1 | rule | home | V04 §3.5.1 |
| V04-0123 | 3.5.1 | rule | home | V04 §3.5.1 |
| V04-0124 | 3.5.1 | rule | home | V04 §3.5.1 |
| V04-0125 | 3.5.1 | rule | home | V04 §3.5.1 |
| V04-0126 | 3.5.2 | rule | home | V04 §3.5.2 |
| V04-0127 | 3.5.3 | rule | home | V04 §3.5.3 |
| V04-0128 | 3.5.3 | rule | home | V04 §3.5.3 |
| V04-0129 | 3.5.3 | rule | home | V04 §3.5.3 |
| V04-0130 | 3.5.4 | rule | home | V04 §3.5.4 |
| V04-0131 | 3.5.4 | mechanism | home | V04 §3.5.4 |
| V04-0132 | 3.5.4 | rule | home | V04 §3.5.4 |
| V04-0133 | 3.5.5 | rule | home | V04 §3.5.5 |
| V04-0134 | 3.5.6 | rule | home | V04 §3.5.6 |
| V04-0135 | 3.5.7 | rule | home | V04 §3.5.7 |
| V04-0136 | 3.5.7 | rule | home | V04 §3.5.7 |
| V04-0137 | 3.5.7 | rule | home | V04 §3.5.7 |
| V04-0138 | 3.5.7 | rule | home | V04 §3.5.7 |
| V04-0139 | 3.5.7 | rule | home | V04 §3.5.7 |
| V04-0140 | 3.5.7 | rule | home | V04 §3.5.7 |
| V04-0141 | 3.5.7 | mechanism | home | V04 §3.5.7 |
| V04-0142 | 3.5.7 | rule | home | V04 §3.5.7 |
| V04-0143 | 3.6 | rule | home | V04 §3.6 |
| V04-0144 | 3.6 | rule | home | V04 §3.6 |
| V04-0145 | 3.6 | rule | home | V04 §3.6 |
| V04-0146 | 3.6 | rule | home | V04 §3.6 |
| V04-0147 | 3.6 | rule | home | V04 §3.6 |
| V04-0148 | 3.6a | rule | home | V04 §3.6a |
| V04-0149 | 3.7 | rule | home | V04 §3.7 |
| V04-0150 | 3.7 | rule | home | V04 §3.7 |
| V04-0151 | 3.7 | rule | home | V04 §3.7 |
| V04-0152 | 3.7a | rule | home | V04 §3.7a |
| V04-0153 | 3.8 | rule | home | V04 §3.8 |
| V04-0154 | 3.8 | rule | home | V04 §3.8 |
| V04-0155 | 3.8 | rule | home | V04 §3.8 |
| V04-0156 | 3.9 | table | home | V04 §3.9 |
| V04-0157 | 3.9 | rule | home | V04 §3.9 |
| V04-0158 | 3.10 | rule | home | V04 §3.10 |
| V04-0159 | 3.10 | rule | home | V04 §3.10 |
| V04-0160 | 3.10 | rule | home | V04 §3.10 |
| V04-0161 | 3.10 | rule | home | V04 §3.10 |
| V04-0162 | 3.10 | rule | home | V04 §3.10 |
| V04-0163 | 3.10 | rule | home | V04 §3.10 |
| V04-0164 | 3.10 | rule | home | V04 §3.10 |
| V04-0165 | 3.11 | table | home | V04 §3.11 |
| V04-0166 | 3.12 | rule | home | V04 §3.12 |
| V04-0167 | 4.1 | edit | home | V04 §4.1 |
| V04-0168 | 4.1 | rule | home | V04 §4.1 |
| V04-0169 | 4.2 | edit | home | V04 §4.2 |
| V04-0170 | 4.3 | table | home | V04 §4.3 |
| V04-0171 | 4.4 | rule | home | V04 §4.4 |
| V04-0172 | 4.5 | interface | home | V04 §4.5 |
| V04-0173 | 4.6 | lifecycle | home | V04 §4.6 |
| V04-0174 | 4.7 | rule | home | V04 §4.7 |
| V04-0175 | 5.1 | render | reference | V04 §5.1 cites rendering §8.4 (the fact at its home, not restated) |
| V04-0176 | 5.2 | render | reference | V04 §5.2 cites rendering §8.1 (the fact at its home, not restated) |
| V04-0177 | 5.2 | render | reference | V04 §5.2 cites rendering §8.2 (the fact at its home, not restated) |
| V04-0178 | 5.3 | render | reference | V04 §5.3 cites rendering §8.4 (the fact at its home, not restated) |
| V04-0179 | 5.4 | render | reference | V04 §5.4 cites rendering §9 (the fact at its home, not restated) |
| V04-0180 | 5.5 | export | reference | V04 §5.5 cites rendering §11.1 (the fact at its home, not restated) |
| V04-0181 | 6 | budget | home | V04 §6 |
| V04-0182 | 6 | budget | home | V04 §6 |
| V04-0183 | 7 | test | home | V04 §7 |
| V04-0184 | 7 | test | home | V04 §7 |
| V04-0185 | 7 | test | home | V04 §7 |
| V04-0186 | 7 | test | home | V04 §7 |
| V04-0187 | 7 | test | home | V04 §7 |
| V04-0188 | 7 | test | home | V04 §7 |
| V04-0189 | 7 | test | home | V04 §7 |
| V04-0190 | 7 | test | home | V04 §7 |
| V04-0191 | 7 | test | home | V04 §7 |
| V04-0192 | 7 | test | home | V04 §7 |
| V04-0193 | 7 | test | home | V04 §7 |
| V04-0194 | 8 | decision | reference | V04 §8 cites scope §16 (the fact at its home, not restated) |
| V04-0195 | 8 | table | home | V04 §8 |
| V04-0196 | 8 | rule | home | V04 §8 |
| V04-0197 | 8 | rule | home | V04 §8 |
| V04-0198 | 9 | decision | home | V04 §9 J-V4.1 |
| V04-0199 | 9 | decision | home | V04 §9 J-V4.2 |
| V04-0200 | 9 | decision | home | V04 §9 J-V4.3 |
| V04-0201 | 9 | decision | home | V04 §9 J-V4.4 |
| V04-0202 | 9 | decision | home | V04 §9 J-V4.5 |
| V04-0203 | 9 | decision | home | V04 §9 J-V4.6 |
| V04-0204 | 9 | decision | home | V04 §9 J-V4.7 |
| V04-0205 | 9 | decision | home | V04 §9 J-V4.8 |
| V04-0206 | 9 | decision | home | V04 §9 J-V4.9 |
| V04-0207 | 9 | decision | home | V04 §9 J-V4.10 |
| V04-0208 | 9 | decision | home | V04 §9 J-V4.11 |
| V04-0209 | 9 | decision | home | V04 §9 J-V4.12 |
| V04-0210 | 9 | decision | home | V04 §9 J-V4.13 |
| V04-0211 | 9 | decision | home | V04 §9 J-V4.14 |
| V04-0212 | 9 | decision | home | V04 §9 J-V4.15 |
| V04-0213 | 9 | decision | home | V04 §9 J-V4.16 |
| V04-0214 | 9 | decision | home | V04 §9 J-V4.17 |
| V04-0215 | 9 | decision | home | V04 §9 J-V4.18 |
| V04-0216 | 9 | decision | home | V04 §9 J-V4.19 |
| V04-0217 | 9 | decision | home | V04 §9 J-V4.20 |
| V04-0218 | 9 | decision | home | V04 §9 J-V4.21 |
| V04-0219 | 9 | decision | home | V04 §9 J-V4.22 |
| V04-0220 | 9 | decision | home | V04 §9 J-V4.23 |
| V04-0221 | 9 | decision | home | V04 §9 J-V4.24 |
| V04-0222 | 9 | decision | home | V04 §9 J-V4.25 |
| V04-0223 | 9 | decision | home | V04 §9 J-V4.26 |
| V04-0224 | 9 | decision | home | V04 §9 J-V4.27 |
| V04-0225 | 9 | decision | home | V04 §9 J-V4.28 |
| V04-0226 | 9 | decision | home | V04 §9 J-V4.29 |
| V04-0227 | 9 | decision | home | V04 §9 J-V4.30 |
| V04-0228 | 9 | decision | home | V04 §9 J-V4.31 |
| V04-0229 | 9 | decision | home | V04 §9 J-V4.32 |
| V04-0230 | 9 | decision | home | V04 §9 J-V4.33 |
| V04-0231 | 9 | decision | home | V04 §9 J-V4.34 |
| V04-0232 | 9 | decision | home | V04 §9 J-V4.35 |
| V04-0233 | 9 | decision | home | V04 §9 J-V4.36 |
| V04-0234 | 9 | decision | home | V04 §9 J-V4.37 |
| V04-0235 | 9 | decision | home | V04 §9 J-V4.38 |
| V04-0236 | 9 | decision | home | V04 §9 J-V4.39 |
| V04-0237 | 9 | decision | home | V04 §9 J-V4.40 |
| V04-0238 | 9 | decision | home | V04 §9 J-V4.41 |
| V04-0239 | 9 | decision | home | V04 §9 J-V4.42 |
| V04-0240 | 9 | decision | home | V04 §9 J-V4.43 |
| V04-0241 | 9 | decision | home | V04 §9 J-V4.44 |
| V04-0242 | 9 | decision | home | V04 §9 J-V4.45 |
| V04-0243 | 9 | decision | home | V04 §9 J-V4.46 (amended by J122) |
| V04-0244 | 9 | decision | home | V04 §9 J-V4.47 |
| V04-0245 | 9 | decision | home | V04 §9 J-V4.48 |
| V04-0246 | 9 | decision | home | V04 §9 J-V4.49 |
| V04-0247 | 9 | decision | home | V04 §9 J-V4.50 |
| V04-0248 | 9 | decision | home | V04 §9 J-V4.51 |
| V04-0249 | 9 | decision | home | V04 §9 J-V4.52 |
| V04-0250 | 9 | decision | home | V04 §9 J-V4.53 (amended by J-V4.122) |
| V04-0251 | 9 | decision | home | V04 §9 J-V4.54 |
| V04-0252 | 9 | decision | home | V04 §9 J-V4.55 |
| V04-0253 | 9 | decision | home | V04 §9 J-V4.56 |
| V04-0254 | 9 | decision | home | V04 §9 J-V4.57 |
| V04-0255 | 9 | decision | home | V04 §9 J-V4.58 |
| V04-0256 | 9 | decision | home | V04 §9 J-V4.59 |
| V04-0257 | 9 | decision | home | V04 §9 J-V4.60 |
| V04-0258 | 9 | decision | home | V04 §9 J-V4.61 |
| V04-0259 | 9 | decision | home | V04 §9 J-V4.62 (amended by J-V4.122) |
| V04-0260 | 9 | decision | home | V04 §9 J-V4.63 |
| V04-0261 | 9 | decision | home | V04 §9 J-V4.64 |
| V04-0262 | 9 | decision | home | V04 §9 J-V4.65 |
| V04-0263 | 9 | decision | home | V04 §9 J-V4.66 |
| V04-0264 | 9 | decision | home | V04 §9 J-V4.67 |
| V04-0265 | 9 | decision | home | V04 §9 J-V4.68 |
| V04-0266 | 9 | decision | home | V04 §9 J-V4.69 |
| V04-0267 | 9 | decision | home | V04 §9 J-V4.70 |
| V04-0268 | 9 | decision | home | V04 §9 J-V4.71 (superseded by J-V4.114) |
| V04-0269 | 9 | decision | home | V04 §9 J-V4.72 |
| V04-0270 | 9 | decision | home | V04 §9 J-V4.73 |
| V04-0271 | 9 | decision | home | V04 §9 J-V4.74 |
| V04-0272 | 9 | decision | home | V04 §9 J-V4.75 |
| V04-0273 | 9 | decision | home | V04 §9 J-V4.76 |
| V04-0274 | 9 | decision | home | V04 §9 J-V4.77 |
| V04-0275 | 9 | decision | home | V04 §9 J-V4.78 |
| V04-0276 | 9 | decision | home | V04 §9 J-V4.79 |
| V04-0277 | 9 | decision | home | V04 §9 J-V4.80 |
| V04-0278 | 9 | decision | home | V04 §9 J-V4.81 |
| V04-0279 | 9 | decision | home | V04 §9 J-V4.82 |
| V04-0280 | 9 | decision | home | V04 §9 J-V4.83 |
| V04-0281 | 9 | decision | home | V04 §9 J-V4.84 |
| V04-0282 | 9 | decision | home | V04 §9 J-V4.85 |
| V04-0283 | 9 | decision | home | V04 §9 J-V4.86 |
| V04-0284 | 9 | decision | home | V04 §9 J-V4.87 |
| V04-0285 | 9 | decision | home | V04 §9 J-V4.88 |
| V04-0286 | 9 | decision | home | V04 §9 J-V4.89 (amended by J-VI.4) |
| V04-0287 | 9 | decision | home | V04 §9 J-V4.90 |
| V04-0288 | 9 | decision | home | V04 §9 J-V4.91 |
| V04-0289 | 9 | decision | home | V04 §9 J-V4.92 |
| V04-0290 | 9 | decision | home | V04 §9 J-V4.93 |
| V04-0291 | 9 | decision | home | V04 §9 J-V4.94 (superseded by J-V4.114) |
| V04-0292 | 9 | decision | home | V04 §9 J-V4.95 |
| V04-0293 | 9 | decision | home | V04 §9 J-V4.96 |
| V04-0294 | 9 | decision | home | V04 §9 J-V4.97 |
| V04-0295 | 9 | decision | home | V04 §9 J-V4.98 |
| V04-0296 | 9 | decision | home | V04 §9 J-V4.99 |
| V04-0297 | 9 | decision | home | V04 §9 J-V4.100 |
| V04-0298 | 9 | decision | home | V04 §9 J-V4.101 |
| V04-0299 | 9 | decision | home | V04 §9 J-V4.102 |
| V04-0300 | 9 | decision | home | V04 §9 J-V4.103 |
| V04-0301 | 9 | decision | home | V04 §9 J-V4.104 (superseded by J-V4.114) |
| V04-0302 | 9 | decision | home | V04 §9 J-V4.105 |
| V04-0303 | 9 | decision | home | V04 §9 J-V4.106 |
| V04-0304 | 9 | decision | home | V04 §9 J-V4.107 (amended by J-VI.4) |
| V04-0305 | 9 | decision | home | V04 §9 J-V4.108 |
| V04-0306 | 9 | decision | home | V04 §9 J-V4.109 |
| V04-0307 | 9 | decision | home | V04 §9 J-V4.110 |
| V04-0308 | 9 | decision | home | V04 §9 J-V4.111 |
| V04-0309 | 9 | decision | home | V04 §9 J-V4.112 |
| V04-0310 | 9 | decision | home | V04 §9 J-V4.113 |
| V04-0311 | 9 | decision | home | V04 §9 J-V4.114 |
| V04-0312 | 9 | decision | home | V04 §9 J-V4.115 |
| V04-0313 | 9 | decision | home | V04 §9 J-V4.116 |
| V04-0314 | 9 | decision | home | V04 §9 J-V4.117 |
| V04-0315 | 9 | decision | home | V04 §9 J-V4.118 |
| V04-0316 | 9 | decision | home | V04 §9 J-V4.119 |
| V04-0317 | 9 | decision | home | V04 §9 J-V4.120 |
| V04-0318 | 9 | decision | home | V04 §9 J-V4.121 |
| V04-0319 | 10 | rule | home | V04 §10 (its preamble: every request applied by file f, cited by item; the request text lives in the f item) |
| V04-0320 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-1 → item 205 |
| V04-0321 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-2 → item 208 |
| V04-0322 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-3 → item 247 |
| V04-0323 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-4 → item 212 |
| V04-0324 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-5 → item 325 |
| V04-0325 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-6 → item 319 (applied after item 574) |
| V04-0326 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-7 → item 330 |
| V04-0327 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-8 → item 355 (with item 361's `drawChamber` union) |
| V04-0328 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-9 → item 403 |
| V04-0329 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-10 → item 413 |
| V04-0330 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-11 → item 475 |
| V04-0331 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-12 → item 505 |
| V04-0332 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-13 → item 526 (§16's totals, item 568) |
| V04-0333 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-14 → item 386 |
| V04-0334 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-15 → item 484; V04 §10 row BCR-V4-16 → item 452; V04 §10 row BCR-V4-17 → item 423; V04 §10 row BCR-V4-18 → item 445 |
| V04-0335 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-19 → item 551 |
| V04-0336 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-20 → item 559 |
| V04-0337 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-21 → item 555; V04 §10 row BCR-V4-22 → item 485; V04 §10 row BCR-V4-23 → item 556 |
| V04-0338 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-24 → item 561; V04 §10 row BCR-V4-25 → item 281; V04 §10 row BCR-V4-26 → item 562 |
| V04-0339 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-27 → item 552; V04 §10 row BCR-V4-28 → item 548; V04 §10 row BCR-V4-29 → item 554; V04 §10 row BCR-V4-30 → item 557 |
| V04-0340 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-31 → item 563; V04 §10 row BCR-V4-32 → item 248; V04 §10 row BCR-V4-33 → item 249; V04 §10 row BCR-V4-34 → carried in item 386's DR17 cell (V04 §1b.5 traces each); V04 §10 row BCR-V4-35 → item 404 |
| V04-0341 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-36 → items 560, 564; V04 §10 row BCR-V4-37 → item 549; V04 §10 row BCR-V4-38 → item 414; V04 §10 row BCR-V4-39 → item 306 |
| V04-0342 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-40 → item 407; V04 §10 row BCR-V4-41 → item 338; V04 §10 row BCR-V4-42 → item 558; V04 §10 row BCR-V4-43 → item 243; V04 §10 row BCR-V4-44 → carried in item 247's `Tunnel` line (`grilles`, a view) |
| V04-0343 | 10 | bcr | bcr-pointer | V04 §10 row BCR-V4-45 → items 244, 559; V04 §10 row BCR-V4-46 → item 250 |
| V04-0344 | 11 | owner-question | answer-J121-J122 | V04 §11 Q1 (answered, J122) and Q2 (answered, J122); V04 §8 *Where it slots* |
| V04-0345 | 12 | rule | home | V04 §12 (one CONFIRMED list, one PLAUSIBLE list; the round receipts to the validation records) |
| V04-0346 | 13 | handoff | handoff | V04 §13 (*What the sibling units hold for this volume*); each hand-off closed at its destination (cross-part notes) |
| V04-0347 | IN | rule | home | folded (IN-V04-1): `growthCapShare` per year compounded over the epoch's span: V04 §2.3's `CatacombRule` row, V04 §3.5.1 (6), T-V4-52; V11's rows cited, not restated: V04 §2.3 |
| V04-0348 | IN | rule | home | folded (IN-V04-2): the monument through V02's `drawTiers` and `layTiers` and its one failure path: V04 §3.5.0a (5a); an arch vault's soffit as the ceiling V02's `vaultClamp` reads: V04 §3.5.4 (d) (1) |
| V04-0349 | 3.2 | term | glossary | V04 §3.2 (the term defined once there) |
| V04-0350 | 3.5.0 | term | glossary | V04 §3.5.0 (the term defined once there) |
| V04-0351 | 3.1 | term | glossary | V04 §3.1 (the term defined once there) |
| V04-0352 | 3.1 | term | glossary | V04 §3.1 (the term defined once there) |
| V04-0353 | 3.5.7 | term | glossary | V04 §3.5.7 (the term defined once there) |
| V04-0354 | 3.5.1 | term | glossary | V04 §3.5.1 (the term defined once there) |
| V04-0355 | 3.9 | term | glossary | V04 §3.9 (the term defined once there) |
| V04-0356 | 3.5.3 | term | glossary | V04 §3.5.3 (the term defined once there) |
| V04-0357 | 3.5.4 | term | glossary | V04 §3.5.4 (the term defined once there) |
| V04-0358 | 3.5.0a | term | glossary | V04 §3.5.0a (the term defined once there) |
| V04-0359 | 3.6 | term | glossary | V04 §3.6 (the term defined once there) |
| V04-0360 | 3.5.7 | term | glossary | V04 §3.5.7 (the term defined once there) |
