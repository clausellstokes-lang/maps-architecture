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
- P11 assemble, verify ids, references, terms, tags, coverage, doc_checks: done (the assembled file became the master, the parts kept as written; re-run 2026-09-30 on the final text: one deferral-shaped "calibrate-later" replaced by the canon's register form, 18 volume prefixes split across a line wrap rejoined, §13's counts refreshed)
- P12 report (sizes, mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done

Source: `docs/volumes/V04-underground.md` (4 168 lines). Output: `docs/validation/coherence/new/volumes/V04-underground.md`
(3 335 lines; same title line and section structure, one marker line). Working parts: `docs/validation/coherence/work/rewrite-V04/parts/`
(00 … 09); the mapping script `work/rewrite-V04/mapping.py` (writes `work/rewrite-V04/mapping.md`, the table of §12 below).

## 1 Sizes and the shrink goal

| measure | before | after |
|---|---|---|
| words (`str.split`, the canon's measure) | 83 966 | 74 624 (−11.1 %; the canon's band 50 380 – 62 974) |
| bytes | 530 576 (518.1 KB) | 460 477 (449.7 KB) |
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
| -010 | V04 §3.5.0 *Foundations* (1) and V04 §6 cite §2.7 (item 244) for `raised.supportFoundationCm` and `raised.vaultCap` |
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

