# Rewrite — design volume V05 (the sky layer)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V05; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V05`, started 2026-09-29, continued in the cloud 2026-09-30)
- P1 inputs gathered (canon unit V05: 483 STATE, 14 REFERENCE, 30 BCR pointers, 6 conflicts, 35 f items, g 111, 4 wiring gaps, E-01/E-02/E-16/E-24, ID-BCR/ID-DR, 17 hand-offs, 2 disagreements, 60 U + 48 T edges, 31 combinations, 69 open findings; inventory 544 items + 49 terms; routing in work/rewrite-V05/routing.md): done
- P2 head, §0, §1, §1b: done (parts/00-head-s0-s1.md, 01-s1b.md: §1b keeps the non-field pieces, fields wired in §2.6 — V05-DUP-3)
- P3 §2: done (parts/02-s2.md: SkyUnitInput, 'update' in both `by` (V05-ICONF-1), WGAP-3 readers, accessCount.handMax (EI-V05-EDGE-3), E-01 rows)
- P4 §3.1–§3.12: done (parts/03-s3a.md)
- P5 §3.13–§3.18: done (parts/04-s3b.md)
- P6 §3.19–§3.22 and the edges table: done (parts/05-s3c.md; new §3.23)
- P7 §4–§6: done (parts/06-s4.md, 07-s5-s6.md)
- P8 §7 tests: done (parts/08-s7.md; T-V5-33)
- P9 §8–§13, integration notes: done (parts/09-s8-s13.md)
- P10 assemble, verify ids, references, terms, sizes: done
- P11 report (mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done

Source: `docs/volumes/V05-sky.md` (3 808 lines). Output: `docs/validation/coherence/new/volumes/V05-sky.md` (same title
line and section structure, one marker line; a new §3.23). Working parts: `docs/validation/coherence/work/rewrite-V05/parts/`
(00 … 09, concatenated in order); routing state `work/rewrite-V05/routing.md`; the mapping script `work/rewrite-V05/mapping.py`.

## 1 Sizes and the shrink goal

| measure | before | after |
|---|---|---|
| words (`str.split`, the canon's measure) | 81 161 | 60 691 (−25.2 %; the canon's band 48 697 – 60 871) |
| bytes | 495 910 (484.3 KB) | ≈ 360 100 (351.7 KB) |
| sections | §0–§13, Integration notes, six reconciliation-round logs | §0–§13 with a new §3.23, Integration notes |

**Sources of the words removed** (≈ 26 600 removed, ≈ 6 250 added; estimates by section diff):

| source | ≈ words | where |
|---|---|---|
| NARRATION | 12 000 (45 %) | nine banner lines and the PROGRESS ledger (V05-NARR-1); the six reconciliation-round logs and the integration header (NARR-5); §12's round histories (NARR-4); §13's lane items and dispositions (DEFER-3); seam, critique and revision ids and "revised with" notes in the body and §9 (NARR-3, NARR-6); the frame's history parenthesis and the scratch paths (NARR-2, BREF-2) |
| RESTATEMENT | 11 000 (41 %) | §10's thirty base-change texts → a pointer table (RESTATE-6); §1.2's value-bearing hook table → an index of citations (RESTATE-1); §1b's field rows duplicated by §2.6 (DUP-3); §3.12's seven-item reconciliation with V01 (closed at V01 §3.10.3); the sampler (RESTATE-4), the rung values and L1 order (RESTATE-5), II.6's chances (finding 004), the V06/item-575 lifecycle columns (RESTATE-7), §4.3's lifecycle rows (now §7.4's), §5's slot numbers and §8.4 formulas |
| DUPLICATED MECHANISMS | 1 300 (5 %) | the shade-evaluation schedule stated once at V05 §3.19 (6) (DUP-1); the landfall's covered kinds as one table in V05 §3.16 (4) (DUP-2); the stretch-state profiles cited at §2.2 rule 5 (E-01) |
| VERBOSE PROSE | 2 300 (9 %) | §0, §1.1, §3.20, §4.2's resize and reshape, §2.6's cells, T-V5-14, the long decision rows (J-V5.11, .32, .45, .60, .62–.64, .68, .70, .77, .80, .81) |

**Added** (ruled content): §3.23's edge table (≈ 3 100: 38 mechanism rows, 22 combination rows); T-V5-33 and the new
clauses of T-V5-3 – T-V5-31 (≈ 900); g item 111's part (≈ 250); EI-V05-EDGE-1 – 4 in §3.9, §3.15, §3.16, §2.3b, §4.2 (≈ 600);
J-V5.82 – 83 (≈ 200); §10's pointer table, §11's decision, §12's two paragraphs, §13's closure, the Integration-notes map
(≈ 1 200). No rule, case, value, bar, record field, lifecycle row, test, owner rule or reasoned decision was dropped: the
token-coverage check (identifiers, numbers with units, F-SKY, T-V5 and J-V5 ids of every inventory statement) finds
532 of 544 items at ≥ 75 % and the other 12 each accounted for in the mapping table (renamed by G-unitinput, or cited at
the base or V06 home as the canon routes); every numeric constant of the old §0–§9 survives except the frame's narrated
568 m / 618–874 m (NARR-2) and the obstacle budget, 0.05 → 0.15 ms per call, which follows from EI-V05-EDGE-3's cap (27
entries at the defaults against the old 9).

## 2 File f and g items (cited as base text, never restated)

File f items concerning V05, each cited at its base home: 203, 204, 213, 244, 245, 246, 251, 252, 253, 260, 274, 282, 286,
290, 295, 296, 299, 307, 308, 309, 313, 320, 331, 356, 375, 387, 408, 415, 416, 476, 546, 547, 568, 575, 580; also cited:
322 (the rung at an epoch, V05 §3.15 (1)) and 383 (DR27). BCR-V5-23 and BCR-V5-28 are carried by volume 6 (V06 X10, V06
W66). V05 §10 is the pointer table BCR-V5-n → item → base home (V05-RESTATE-6).

**g item 111** (V05's part, written): V05 §3.8 (4) — item 111 leaves an island's water unchanged; the oasis, spring,
grove, gardens, water pull and well placement are the ground arena's; a ground oasis is water for V05 §3.7 (1), §3.10 (3)
and §3.16 (5) like any other; V05 §3.11 (4) — `P_I` carries no water term and reads `w_sun` without item 111 (c)'s climate
cell (the canon's routing: "item 111's oasis, water pull and climate cell do not apply on a sky island"); V05 §3.22 (5)
(d) — the aqueduct's source search may take an oasis's spring; V05 §3.23 (b)'s oasis × shade row; T-V5-33's item-111
clause (the no-op pin on the island). Closes V05-MISSING-1.

## 3 Conflicts resolved (6)

| conflict | resolution in the text |
|---|---|
| MC-05 | V05 §2.6's `ContextVector.arena 'sky'` row and V05 §3.11 cite §2.5 (file f item 213). |
| MC-07 | V05 §2.1 declares `rim: ChainRef`, `land: FaceRef` (no stored position) and states §2.7's staged block carries it (file f item 251). |
| CF-PIPE-06 | V05 §3.1: SKY-F runs before S12c, which gives the island's districts character and identity as the ground's (§4.5); a V05 §1b row. |
| V05-ICONF-1 | `ShadeBasis.by` and `IslandShadeStrip.evaluated.by` gain `'update'`; Update shade now writes it with the document's current epoch (V05 §2.1, §2.3a, §3.19 (6), §4.2). |
| V05-XCONF-1 | DR27 everywhere (V05 §1b, §4.4, J-V5.40 marked "amended by J-VI.13", §10); "number left to the integrator" removed. |
| CANON-C03 | V05 §11 is a decisions table: Q1 — the underground first, then the sky (J122). |

Disagreements of agreement.md: `SkyIsland` with model (MC-07) and `ContextVector` with model (MC-05) — both closed above.

## 4 Elegance rulings applied, with their equivalence lists

**E-01 (UNIFY — the stretch-state profile, home §2.2 rule 5).** V05 keeps only its writer cell: V05 §2.6's row
"`Enceinte.condition` and `RetainingWall.state` — the stretch-state profiles" and V05 §3.16 (4)'s table.
- [x] canonical form, write, read, regenerate, cut or join, undo, migrate — at §2.2 rule 5 (cited, not restated).
- [x] RetainingWall keeps `standing|decayed|ruined`, `retaining_state_knot`; V05's landfall a writer (`decayed`) — V05 §2.6, §3.16 (4).
- [x] Enceinte keeps `standing|breached|dismantled`, `wall_state_knot`, its `lifecycle` rules; V05's landfall a writer (`breached`); §8.2's `decayed` row and §11.1's per-run LineStrings — V05 §3.16 (4) (towers and gates by their run), §5.1.

**E-02 (KEEP APART — removals that hold).** V05 §3.2 (6) and §2.6 call the island form "the suppression's island form",
keep the live `removed` record (slot counted as filled, the archived arena for undo) and cite §2.8's one lift rule (file f
item 260) — the undo, or the user's own re-add serving the key (a T5 declaration when no slot is free); a cap increase
opens only new keys. The nuance that separates them is stated in J-V5.62.

**E-16 (UNIFY — one name per mechanism, §8.2).** V05 uses no `lights` role; the bridge of light's ribbon keeps role
`light` (the glyph tone) and its night glow is the `glow` sprite of its `light` marks (V05 §5.1).
- [x] programs per mark, post operations per tile — not used by V05.
- [x] the two roles' distinct uses kept (glyph tone vs glow sprite) — V05 §5.1.

**E-24 (UNIFY — one mark on an amended decision).** J-V5.40 "Amended by J-VI.13", J-V5.61 "Amended by J-VI.4",
J-V5.62 "Amended by J-VI.14".
- [x] no row dropped — J-V5.1 – J-V5.81 all kept; J-V5.82 – 83 added.
- [x] the governing row keeps the reason — each amended row keeps its "because".

No other unification was made. The restatement fixes of V05-DUP-1 – 3 are principle (1)'s (one home inside the volume),
routed as open findings, not new unified mechanisms.

## 5 Id rulings, renumberings and renames

| from | to | ruling |
|---|---|---|
| DR-SKY | DR27 | ID-DR, J-VI.13 (one legitimate mention kept in V05 §3.23: a derivation record written under the working name reads as DR27) |
| `SkyHandover`, `skyHandover(doc, island)`, "the hand-over to the unit run" | `SkyUnitInput`, `skyUnitInput(doc, island)`, "the island's unit inputs" (V05 §2.3, §3.12) | G-unitinput; `handover` kept only for `IslandInstitution.handover` |
| `V5 §n`, `V1-x.y`, `V4 §`, `V6 §`, `V2 §` | `V05 §n`, `V01 §x.y`, `V04 §`, `V06 §`, `V02 §` | G-cite (V05-TERM-1) |
| V01's BCR-39, BCR-45, BCR-10, BCR-43, BCR-26; V04's BCR-45 | their applied file f items (290 (1), 580, 313, 245, §4.12's hooks; 244) | ID-BCR (no bare BCR-n remains) |
| "reference view", "the vector pass", "a scoped re-roll" | "reference viewport", "the vector rung", "New random" | G-refview, G-vectorrung, G-newrandom |
| "T9's delete" | "V09's delete row (T10)" | XV-V9-16 (a) |
| barrier kind `cliff`, class `sheer` | barrier kind `sheer` (V11's `walls.barriers` row keyed `sheer`) | J-VI.3 (IN-V05-4 folded) |
| — | new: V05 §3.23, T-V5-33, J-V5.82, J-V5.83, `IslandRule.accessCount.handMax`, `bend.island.keepRoom`, `bend.island.rimStop`, `ShadeBasis.by` / `evaluated.by` value `'update'`, `removedSlots(doc)`'s `generated` | the canon's findings and edges |

## 6 Wiring gaps, hand-offs and open findings closed

**Wiring gaps.** W-HOOK-02 — V05 §1b's head and §2.1: V05 builds the staged `SkyIsland` records §2.7's block carries.
V05-WGAP-2a/2b — V05 §4.2 names `bend.island.keepRoom` and `bend.island.rimStop` (their lines), V05 §4.5 places them in
V10's `bend` category; the V09 and V10 rows are cross-part notes. V05-WGAP-3 — `near: 'richest'` read by V05 §3.7 (3)
(c); `IslandShadeStrip.cells` read by the report, the clerk and the CSV, `.evaluated` by the clerk and the report (V05
§2.3a); `removed.generated` read by the clerk's "removed by you" and `removedSlots(doc)` (V05 §2.1, §4.5). V05-WGAP-1 is
V09's (the canon's routing); V05 §4.2 keeps its side and names V09's hit testing.

**Hand-offs (17), each closed here:** V06:X10 (confirmed: V06 §2.1, §3.4 (8); V05 §3.15, §3.19 (7) cite); V06:X15
(`sky.clearance` at `afterGrowth` 50, V05 §3.15 (7); a fall's ruined raised parts are lifecycle entries of the epoch
event, so in `EpochScope.raised`, V05 §3.16 (4) *Inside an epoch*); V06:X26 (`Way.formerClass` written, V05 §3.16 (4)'s
way row); V06:X37 (`breached` into `condition`, V06 §3.7.5's repair, V05 §3.16 (4)); V06:X40 (confirmed: V06 §6.2 prices
at V05 §6's rows; V05 §3.15 (5)'s raise lays districts inside the epoch's commit); V06:X41 (towers and gates by their run,
V05 §3.16 (4); J-V5.79); V06:X46 (the resize row prices the tops, V05 §6; J-V5.81); V08:X8 (the slot mechanism is file f
item 260; V05 §3.2 (6)); V09:XV-V9-8 (AP7 beside P4, priced in §16's application line, V05 §8); V09:XV-V9-16 ((a) "V09's
delete row (T10)" in V05 §2.6, §4.1, §4.2; (b) V05 §4.2 names V09's bend keys); V09:XV-V9-25 (V05 §3.22 (4): each rim-strip
point moved radially to 1 m inside the `setback` line); V10:CVR-V10-14 (V05 §4.5 *The clerk's island rows*); V12:X-V12-4
(V05 §7 *Parity*: the M6-sky `PanelSpec` confirmed); V12:X-V12-11 (V05 §3.22 (9), T-V5-15: V12 §3.7.8's engine, V11
§3.24.0's switch table, V12 §3.7.6's shift); V12:X-V12-15 and X-V12-16 (no line of this volume's own; the register at P1's
and P2's exits, V05 §8; J-V5.80); V12:X-V12-17 (`--milestone V5-P1` / `V5-P2`; `M-CAL/sky` only if M6-sky lands after
M-CAL, V05 §8).

**Open findings routed here (69):**

| finding | closed by |
|---|---|
| VOL-V05-V06-RESTATEMENTS-001, V05-RESTATE-1 | V05 §1.2 an index of citations, no values |
| -002, -005, V05-RESTATE-5 | V05 §3.2 (1) cites §1.1; V05 §3.1 cites §4.1's L1 order |
| -003, V05-RESTATE-2 | V05 §3.1, §3.22 (1) cite §4.3's slot (file f item 290 (1)) |
| -004 | V05 §2.4 cites II.6 (4) for the chances and `redrawPerYear` |
| -006, V05-RESTATE-3 | `node.bonus`'s value only at V05 §2.4; base II.6 (3)'s "(0.25 …)" is a cross-part note (pipeline) |
| -007 – -009, V05-RESTATE-4 | V05 §3.19 (1) cites §4.5's model sampler |
| -010, -011, V05-RESTATE-7 | V05 §2.6 keeps V05's writer cells; V06 §2.12, §2.2 rule 5, items 245, 575 |
| -012, V05-RESTATE-6 | V05 §10 the pointer table |
| V05-DUP-1 | V05 §3.19 (6) the one schedule; §2.1, §2.6, §3.1, §3.15, §4.2 cite it |
| V05-DUP-2 | V05 §3.16 (4) one table (kind → outcome → drawing → clearance) |
| V05-DUP-3 | V05 §1b non-field pieces; every state field's wiring in V05 §2.6 |
| V05-ICONF-1, V05-XCONF-1 | §3 above |
| V05-EDGE-1 – 4 (EI-V05-EDGE-1 – 4) | V05 §3.15 (1b) lock clause; §3.16 (4)'s re-landing row; `accessCount.handMax` (§2.4, §2.3b, §4.2, §3.23; J-V5.82); §3.9 (5)'s lock clause and T-V5-31 (f) (J-V5.83) |
| V05-WGAP-1, -2, -3 | §6 above |
| V05-MISSING-1 | §2 above (g item 111) |
| V05-MISSING-2 | V05 §11 decided (J122); V05 §8 cites §16's order |
| V05-TERM-1, -2 | §5 above |
| V05-DEFER-1 | V05 §1b and §3.22 (3) (c): the callers as ruled (an epoch's raised-way pass, a new stage's S4 in an epoch, T4) |
| V05-DEFER-2 | V05 §3.1 cites the slot as ruled |
| V05-DEFER-3 | §13's intro deleted; the calibrations are V05 §8's P0 exits |
| V05-NARR-1 – 6 | §1 above |
| V05-BREF-1, V05-BREF-1.r01 | the folded note cites V05 §3.2 (3)–(4) |
| V05-BREF-2, V05-BREF-2.r02 – r18 | every scratch path removed |
| V05:IN-V05-1 – 5 | folded at their homes (Integration notes map them) |

**Owner question:** Q1 marked decided (J122).

## 7 Edges (principle (11))

V05 §3.23 defines every catalogue entry routed to V05: the 60 UNDEFINED and 48 UNTESTED mechanism edges (grouped in 38
rows, each with its outcome, its §5.1 rung and its test) and the 31 UNDEFINED combinations (22 rows; the canon's named
combination "a raised way under an island's shade" confirmed by the clearance rule and the retaining-wall × shade row).
T-V5-33 runs one fixture per row that names it; the other rows name their existing test (clauses added to T-V5-3 – T-V5-31
where they carry the case). No edge's outcome is a crash, hang, lost datum, silent wrong result or whole-map retry.

**Catalogue ids → V05 §3.23 rows** (the ids live here, not in the volume):

| §3.23 row | catalogue ids |
|---|---|
| the island record at load | M-V05-417-E5 |
| the access record | M-V05-489-E5, -E8 |
| the unit inputs | M-V05-517-E5, -E8 |
| the strip | M-V05-549-E5, -E8 |
| the rule table | M-V05-597-E5 |
| identity and lifecycle | M-V05-741-E8, -755-E5, -E8 |
| the supplies | M-V05-875-E4, -E6, -E8 |
| purpose | M-V05-916-E1, -E2, -E5, -E8 |
| the fill | M-V05-944-E3, -E4, -E6, -E8 |
| the shape | M-V05-1036-E4 |
| placement | M-V05-1048-E1, -E2, -E4, -E5 |
| the arena | M-V05-1075-E2, -E4, -E5, -E6 |
| the underside and the altitude | M-V05-1110-E1–E6, -E8 |
| access | M-V05-1165-E1–E5 |
| the island's field | M-V05-1241-E6 |
| the unit run's contract | M-V05-1293-E1–E6 |
| lights | M-V05-1347-E1, -E2, -E5 |
| names and labels | M-V05-1360-E6, -2318-E4, -E6 |
| over time | M-V05-1370-E4, -E6 |
| the landfall | M-V05-1469-E1, -E2, -E4, -E5, -E6, -E8 |
| determinism with one island | M-V05-1565-E2 |
| the strip's geometry | M-V05-1588-E4 |
| the route | M-V05-1679-E4, -E6 |
| the rim as a barrier | M-V05-1820-E4 |
| item 110 under the island | M-V05-1847-E4 |
| the declarations | M-V05-1939-E3, -E4, -E8 |
| the events | M-V05-1967-E4, -E6 |
| locality | M-V05-2135-E2, -E4 |
| the dossier | M-V05-2164-E1–E6, -E8 |
| the clerk | M-V05-2186-E1, -E2, -E4, -E8 |
| marks | M-V05-2228-E1, -E2, -E4–E8 |
| light and shadow | M-V05-2280-E1, -E4–E7 |
| exports | M-V05-2327-E1, -E2, -E4, -E7, -E8 |
| a lock against a dossier removal | EI-V05-EDGE-1 |
| a landfall on another island's landing | EI-V05-EDGE-2 |
| the most accesses | EI-V05-EDGE-3 |
| a lock under `sky.clearance` | EI-V05-EDGE-4 |
| cliff × shade; steep × shade | C-cliff-shade, C-steep-shade |
| cliff × landfall; steep × landfall | C-cliff-landfall, C-steep-landfall |
| coast × shade; harbour × shade; moat × shade | C-coast-shade, C-harbour-shade, C-moat-shade |
| coast × landfall; moat × landfall | C-coast-landfall, C-moat-landfall |
| moat × sky access | C-moat-skyaccess |
| bridge × shade; deck plot × shade | C-bridge-shade, C-deckplot-shade |
| retaining wall × shade | C-retaining-shade |
| square × landfall | C-square-landfall |
| oasis × shade | C-oasis-shade |
| frame × shade | C-frame-shade |
| frame × sky access | C-frame-skyaccess |
| frame × landfall | C-frame-landfall |
| neighbourhood fabric × sky access | C-hood-skyaccess |
| terraced ward × shade | C-terraced-ward-shade |
| terraced ward × sky access | C-terraced-ward-skyaccess |
| terraced ward × landfall | C-terraced-ward-landfall |
| composed building × shade; × landfall | C-composed-shade, C-composed-landfall |
| floor plan × landfall | C-plan-landfall |
| vault × island; × shade; × sky access | C-vault-island, C-vault-shade, C-vault-skyaccess |
| shade × lock | C-shade-lock |
| shade × undo | C-shade-undo |
| landfall × save and load | C-landfall-saveload |

## 8 Judgment calls (vetoable)

1. **Integration notes.** The brief says "keep the Integration notes"; the canon (ID-WX, S9) folds each note into the body
   and keeps the ids only in validation records. Both are met: every note's ruling is written at its home, and the section
   is kept as a short map from each J-VI ruling to those homes, with no IN id in the text.
2. **V05-0136 kept at V05 §2.4.** The canon routes the landing classes' facts as a reference to V11; V11 §3.5.13 says its
   rows are "compiled from V05 §2.4's facts", so the facts stay here as the source and V05 §2.4 now cites V11 §3.5.13's
   compiled rows (no circular reference).
3. **The hand-placed cap** (EI-V05-EDGE-3; J-V5.82): `accessCount.handMax` 6 per island, a seventh bent into a move of the
   nearest hand-placed access; lowering the cell removes nothing. The canon's example; a refusal is not lawful (item 101 R2).
4. **The lock clauses** (EI-V05-EDGE-1, -4; J-V5.83): the clearance rule's lock clause now applies at SKY-F and a ground
   edit as well as `sky.clearance` (it had one home only at the epoch); a lock holds (1b)'s re-reasoning while the
   dossier's removal still takes effect at once.
5. **Update shade now's surface top.** An `'update'` basis reads the full surface top, as an epoch's does (V05 §3.9 (4)),
   since it stands in for the next epoch's evaluation of that island; generation and a re-derivation keep the terrain.
6. **The climate cell on the island** follows the canon's g-111 routing literally (V05 §3.11 (4)).
7. **New lines** for volumes 9 and 10: the rung bend ("Floating islands need a city; this quarter is laid on the ground"),
   the hand-placed cap's line, and the clerk's "not yet in the ground's shade", "held without its institution",
   "clearance held by your lock" (V05 §3.23, §4.5).

## 9 CROSS-PART NOTES

1. **pipeline (II.6):** (3) drop `node.bonus`'s value "(0.25, clamped to 1)" — its home is V05 §2.4 (V05-RESTATE-3);
   (5) the law's altitude `E` sets `altitudeCm` above the island's `groundRefCm` (floored by V05 §3.9 (4)), `elevationCm`
   being derived as `groundRefCm + altitudeCm` — the base's "the altitude `elevationCm` = E_min + …" disagrees with V05 §2.1;
   (6) "hysteresis (0.05 of its area)" cites V05 §2.4's `hysteresis` cell. II.6 (4) stays the home of the chances and
   `redrawPerYear`.
2. **pipeline (§4.5):** S12c's coverage includes the districts on a sky island's arena (CF-PIPE-06; V05 §3.1 places SKY-F
   before S12c).
3. **determinism:** §7.4's `regenerate` scope `shade` row records `by: 'update'` (V05-ICONF-1); §5.3's clearance
   invariant exempts a locked island wherever the clearance rule runs (V05 §3.9 (5)); §5.2's F-SKY-ACCESS row reads a
   landfall's rubble as no admissible foot and runs at a landfall's re-landing (V05 §3.17).
4. **model (§2.7 staged block):** V05 §2.1's `ShadeBasis.by` gains `'update'`; `removedSlots(doc)` gains `generated`;
   `IslandRule.accessCount` gains `handMax` — the block cites V05 §2.1 – §2.4, so no text changes there.
5. **scope (§13):** the take-over row reads T-V5-1 – T-V5-33 (T-V5-33 the edge suite). §16's M6-sky row (after M6-U,
   17.25–23.25 pw) agrees with V05 §8.
6. **V01:** in a ground district laid by volume 1's template fabric, a ground landing's attach is a gate-ranked portal a
   seed or lane must reach, as on an island (V05 §3.23 (b), C-hood-skyaccess; T-V5-8). V01 §3.10.3 already carries the
   island's seven unit inputs (closing V05-0256).
7. **V04:** its catacomb candidates skip every sky-arena face and count island churches once; a `quarry` with a `source`
   is no quarry source; the vaults beneath a span a landfall ruins follow the span; V04 §3.10's closures read `members`.
8. **V06:** W64's reader list names `sky.islands`' fall as a producer of `EpochScope.raised` (X15, V05 §3.16 (4)); the
   landfall's re-landing of another island's access (V05 §3.16 (4)) leaves V06 §3.5.2's clearance unchanged.
9. **V09:** the un-displacement of sky hits and tool points under `offset` in its hit testing (V05-WGAP-1; V05 §4.2);
   `bend.*` rows for `bend.island.keepRoom` ("<island> keeps room for its <institution>; shrunk to <area> ha"),
   `bend.island.rimStop` ("<island> keeps room for its <institution>; the rim stops here"), the hand-placed cap ("An
   island takes at most {n} ways up by hand; moved {access} here", alternative "Delete one first") and the rung bend
   ("Floating islands need a city; this quarter is laid on the ground") (V05-WGAP-2a); the delete row (T10) folds an
   island's delete as `convert removeIsland`; `info.remove.holds` reads `removedSlots(doc)`.
10. **V10:** the same bend lines in the `bend` category (V05-WGAP-2b); the island rows "removed by you" ("the town had
    raised it" / "the island you drew"), "raised clear of the aqueduct", "clearance held by your lock", "held without its
    institution", "not yet in the ground's shade" (CVR-V10-14); the daylight `FieldDrivers` entry's `sources` list (V05
    §4.5).
11. **V11:** the `walls.barriers` row keyed `sheer` (J-VI.3); the `sky-*` district kinds; V11 §3.5.13's landing class rows
    (with `front`); the `carry` memberships; palette row 52 for the sky semantics; the crypt column's island form (the
    rim-slab vault); the palace and cathedral notes; the raised-way height rows; row 56 lists `accessCount.handMax` among
    `islands.json`'s cells.
12. **V12:** the register takes `accessCount.handMax` by the default line (an `own` calibratable cell landed at P1); the
    M6-sky `PanelSpec` is confirmed (X-V12-4).
13. **V02, V03:** the rim-slab crypt (the full basement form in the rim slab, the half-sunk fallback) and the X20 wording
    "under the building's lowest massing tier, inside underside tier 0 (the rim slab)".
14. **INDEX / assemble:** V05 §11's Q1 decided (J122); M6-sky after M6-U agrees with INDEX §4 and §16.

## 10 Checks run (provisional where noted)

- Retired terms (G-unitinput, G-DR, G-cite, G-refview, G-vectorrung, G-newrandom), seam and critique ids, scratch paths,
  bare `BCR-n`, `IN-V05`, PROGRESS, and the validation records' finding and catalogue ids (CF-PIPE, W-HOOK, WGAP, ICONF,
  EI-V05-EDGE, M-V05, C-…): 0 hits in the output, except one legitimate DR-SKY (a migration rule naming the alias);
  elegance ids (E-n), J-VI rows and volume rows (X-V12-n, XV-V9-n, CVR-V10-n) are cited as the base rewrites cite them.
- Every `V05 §x` reference resolves to a heading; every `T-V5-n` (1 – 33) and `J-V5.n` (1 – 83) cited is defined; every
  cross-volume label cited was found in its volume (V01, V02, V04, V06, V08 – V12).
- `docs/validation/bench/doc_checks.py --doc <output> --heads docs/ARCHITECTURE.md`: WARNING "reference corpus INCOMPLETE
  (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room results are
  NOT authoritative"; C1 0, C2 0, C4 0, S1 0; C3 254 hits (generic 3-grams: section-number runs, "on the ground"; the
  original volume 330); S2 253 (list continuations after a `V05` prefix, which the tool resolves against the base's
  headings; the original 393). Provisional until re-run on the machine that holds the corpus.

## 11 MAPPING TABLE — every inventory id of the volume → where it now lives

| inventory id | old section | canon role | now lives |
|---|---|---|---|
| V05-0001 | 0 | home | V05 §0 |
| V05-0002 | 0 | home | V05 §0 |
| V05-0003 | 0 | home | V05 §0 |
| V05-0004 | 0 | home | V05 §0 |
| V05-0005 | 0 | home | V05 §0 |
| V05-0006 | 0 | home | V05 §0 |
| V05-0007 | 0 | home | V05 §0 |
| V05-0008 | 0 | home | V05 §0 |
| V05-0009 | 0 | home | V05 §0 |
| V05-0010 | 0 | home | V05 §0 |
| V05-0011 | 0 | home | V05 §0 |
| V05-0012 | 0 | home | V05 §0 |
| V05-0013 | 1 | home | the head's *How to read* (citation form V05 §x; G-cite) |
| V05-0014 | 1 | glossary | the head's *Two kinds of tier* paragraph |
| V05-0015 | 1 | glossary | the head's *Two kinds of tier* paragraph |
| V05-0016 | 1.1 | home | V05 §1.1 |
| V05-0017 | 1.1 | home | V05 §1.1 |
| V05-0018 | 1.2 | home | V05 §1.2 |
| V05-0019 | 1.2 | reference | V05 §1.2 cites §1.1 (the rung values dropped; V05-RESTATE-1) |
| V05-0020 | 1.2 | reference | V05 §3.1 and §3.22 (1) cite §4.3's slot (file f item 290 (1)); V05-RESTATE-2, V05-DEFER-2 |
| V05-0021 | 1.3 | index-row | V05 §1.3 |
| V05-0022 | 1.3 | index-row | V05 §1.3 |
| V05-0023 | 1.3 | index-row | V05 §1.3 |
| V05-0024 | 1.3 | home | V05 §1.3 |
| V05-0025 | 1.3 | index-row | V05 §1.3 (cites §4.5 *Fields*) |
| V05-0026 | 1.3 | index-row | V05 §1.3 |
| V05-0027 | 1b | home | V05 §1b (`skyGate` row) |
| V05-0028 | 1b | home | V05 §1b |
| V05-0029 | 1b | home | V05 §1b |
| V05-0030 | 1b | home | V05 §1b |
| V05-0031 | 1b | home | V05 §1b |
| V05-0032 | 1b | home | V05 §1b |
| V05-0033 | 1b | index-row | V05 §1b (register row); V05 §8 |
| V05-0034 | 1b | home | V05 §1b |
| V05-0035 | 1b | home | V05 §1b |
| V05-0036 | 1b | home | V05 §1b (state fields → §2.6); V05 §2.1 |
| V05-0037 | 1b | home | V05 §2.6 (`key` / `nextSkyPart` row); V05 §2.1 |
| V05-0038 | 1b | home | V05 §1b |
| V05-0039 | 1b | home | V05 §1b |
| V05-0040 | 1b | home | V05 §2.6 (`terrainEcho` row) |
| V05-0041 | 1b | home | V05 §1b |
| V05-0042 | 1b | home | V05 §2.6 (rim strip and claims row) |
| V05-0043 | 1b | home | V05 §2.6 (ground landing yard row; rim strip and claims row) |
| V05-0044 | 1b | home | V05 §2.6 (`accesses` and every `SkyAccess` field row) |
| V05-0045 | 1b | home | V05 §2.6 (ground landing row) |
| V05-0046 | 1b | home | V05 §1b |
| V05-0047 | 1b | home | V05 §2.6 (`field` row) |
| V05-0048 | 1b | home | V05 §1b (`skyUnitInput` row; G-unitinput) |
| V05-0049 | 1b | home | V05 §2.6 (`altitudeCm`, `groundRefCm` row) |
| V05-0050 | 1b | home | V05 §1b (`islandShadeStrip` row); V05 §2.6 (strip rows) |
| V05-0051 | 1b | home | V05 §2.6 (`shadeBasis` row); the schedule V05 §3.19 (6) |
| V05-0052 | 1b | home | V05 §2.6 (strip fields row); V05 §2.3a `basis` |
| V05-0053 | 1b | home | V05 §1b (`islandShadeStrip` row); V05 §2.6 (strips onto an island row) |
| V05-0054 | 1b | home | V05 §1b |
| V05-0055 | 1b | home | V05 §1b |
| V05-0056 | 1b | home | V05 §1b |
| V05-0057 | 1b | home | V05 §1b (institution rows and their `handover` column) |
| V05-0058 | 1b | home | V05 §2.6 (crypt site row) |
| V05-0059 | 1b | home | V05 §1b |
| V05-0060 | 1b | home | V05 §1b |
| V05-0061 | 1b | home | V05 §1b |
| V05-0062 | 1b | home | V05 §1b |
| V05-0063 | 1b | home | V05 §1b |
| V05-0064 | 1b | index-row | V05 §2.6 (`EpochOps.demandTaken` row) |
| V05-0065 | 1b | home | V05 §1b |
| V05-0066 | 1b | home | V05 §1b |
| V05-0067 | 1b | home | V05 §1b |
| V05-0068 | 1b | home | V05 §1b |
| V05-0069 | 1b | home | V05 §1b |
| V05-0070 | 1b | home | V05 §1b |
| V05-0071 | 1b | home | V05 §2.6 (`underside` row); V05 §1b (`undersideTiers`) |
| V05-0072 | 1b | home | V05 §1b |
| V05-0073 | 1b | home | V05 §1b |
| V05-0074 | 1b | home | V05 §1b (`fallIsland` row); V05 §3.16 (4)'s table |
| V05-0075 | 1b | home | V05 §1b |
| V05-0076 | 1b | home | V05 §1b |
| V05-0077 | 1b | home | V05 §1b |
| V05-0078 | 1b | home | V05 §1b |
| V05-0079 | 1b | home | V05 §2.6 (island `RetainingWall`s row) |
| V05-0080 | 1b | home | V05 §1b |
| V05-0081 | 1b | home | V05 §1b |
| V05-0082 | 1b | index-row | V05 §1b (`levelledGroundCm` row: this volume's uses; the reader list §4.7, file f item 309) |
| V05-0083 | 1b | home | V05 §2.6 (`removed`, `removedAccesses` rows); V05 §1b (`removedSlots(doc)`) |
| V05-0084 | 1b | home | V05 §1b (DR27 row; ID-DR) |
| V05-0085 | 1b | home | V05 §1b |
| V05-0086 | 1b | home | V05 §1b |
| V05-0087 | 1b | home | V05 §1b |
| V05-0088 | 2.1 | home | V05 §2.1 |
| V05-0089 | 2.1 | home | V05 §2.1 |
| V05-0090 | 2.1 | home | V05 §2.1 |
| V05-0091 | 2.1 | home | V05 §2.1 |
| V05-0092 | 2.1 | home | V05 §2.1 |
| V05-0093 | 2.1 | home | V05 §2.1 |
| V05-0094 | 2.1 | home | V05 §2.1 |
| V05-0095 | 2.1 | home | V05 §2.1 |
| V05-0096 | 2.1 | home | V05 §2.1 |
| V05-0097 | 2.1 | home | V05 §2.1 |
| V05-0098 | 2.1 | home | V05 §2.1 |
| V05-0099 | 2.2 | home | V05 §2.2 |
| V05-0100 | 2.2 | home | V05 §2.2 |
| V05-0101 | 2.2 | home | V05 §2.2 |
| V05-0102 | 2.2 | home | V05 §2.2 |
| V05-0103 | 2.2 | home | V05 §2.2 |
| V05-0104 | 2.3 | home | V05 §2.3 (`SkyUnitInput`; G-unitinput) |
| V05-0105 | 2.3 | home | V05 §2.3 |
| V05-0106 | 2.3 | reference | V05 §2.3 cites V01 §3.10.3 (2), §3.16 |
| V05-0107 | 2.3a | home | V05 §2.3a |
| V05-0108 | 2.3a | home | V05 §2.3a |
| V05-0109 | 2.3a | home | V05 §2.3a |
| V05-0110 | 2.3b | home | V05 §2.3b |
| V05-0111 | 2.3b | home | V05 §2.3b |
| V05-0112 | 2.4 | home | V05 §2.4 |
| V05-0113 | 2.4 | reference | V05 §2.4 cites II.6 (4) (values dropped) |
| V05-0114 | 2.4 | home | V05 §2.4 |
| V05-0115 | 2.4 | home | V05 §2.4 |
| V05-0116 | 2.4 | home | V05 §2.4 |
| V05-0117 | 2.4 | home | V05 §2.4 |
| V05-0118 | 2.4 | home | V05 §2.4 |
| V05-0119 | 2.4 | home | V05 §2.4 |
| V05-0120 | 2.4 | home | V05 §2.4 |
| V05-0121 | 2.4 | home | V05 §2.4 |
| V05-0122 | 2.4 | home | V05 §2.4 |
| V05-0123 | 2.4 | home | V05 §2.4 |
| V05-0124 | 2.4 | home | V05 §2.4 |
| V05-0125 | 2.4 | home | V05 §2.4 |
| V05-0126 | 2.4 | home | V05 §2.4 |
| V05-0127 | 2.4 | home | V05 §2.4 |
| V05-0128 | 2.4 | home | V05 §2.4 |
| V05-0129 | 2.4 | home | V05 §2.4 |
| V05-0130 | 2.4 | home | V05 §2.4 |
| V05-0131 | 2.4 | home | V05 §2.4 |
| V05-0132 | 2.4 | home | V05 §2.4 |
| V05-0133 | 2.4 | home | V05 §2.4 |
| V05-0134 | 2.4 | home | V05 §2.4 |
| V05-0135 | 2.4 | home | V05 §2.4 |
| V05-0136 | 2.4 | reference | V05 §2.4 (kept: V11 §3.5.13 compiles its rows from these facts; citation added) |
| V05-0137 | 2.4 | home | V05 §2.4 |
| V05-0138 | 2.4 | home | V05 §2.4 |
| V05-0139 | 2.5 | home | V05 §2.5 |
| V05-0140 | 2.6 | home | V05 §2.6 |
| V05-0141 | 2.6 | home | V05 §2.6 |
| V05-0142 | 2.6 | home | V05 §2.6 |
| V05-0143 | 2.6 | home | V05 §2.6 |
| V05-0144 | 2.6 | home | V05 §2.6 |
| V05-0145 | 2.6 | home | V05 §2.6 |
| V05-0146 | 2.6 | home | V05 §2.6 |
| V05-0147 | 2.6 | home | V05 §2.6 |
| V05-0148 | 2.6 | home | V05 §2.6 |
| V05-0149 | 2.6 | home | V05 §2.6 |
| V05-0150 | 2.6 | home | V05 §2.6 |
| V05-0151 | 2.6 | home | V05 §2.6 |
| V05-0152 | 2.6 | home | V05 §2.6 |
| V05-0153 | 2.6 | home | V05 §2.6 |
| V05-0154 | 2.6 | home | V05 §2.6 |
| V05-0155 | 2.6 | home | V05 §2.6 |
| V05-0156 | 2.6 | home | V05 §2.6 |
| V05-0157 | 2.6 | home | V05 §2.6 |
| V05-0158 | 2.6 | home | V05 §2.6 |
| V05-0159 | 2.6 | home | V05 §2.6 |
| V05-0160 | 2.6 | reference | V05 §2.6 (`Way.formerClass` row: this volume's writer cell; V06 §2.12) |
| V05-0161 | 2.6 | reference | V05 §2.6 (stretch-state profiles row: writer cell; §2.2 rule 5, E-01) |
| V05-0162 | 2.6 | home | V05 §2.6 |
| V05-0163 | 2.6 | home | V05 §2.6 |
| V05-0164 | 2.6 | home | V05 §2.6 |
| V05-0165 | 2.6 | home | V05 §2.6 |
| V05-0166 | 2.6 | home | V05 §2.6 |
| V05-0167 | 2.6 | home | V05 §2.6 |
| V05-0168 | 2.6 | home | V05 §2.6 |
| V05-0169 | 2.6 | home | V05 §2.6 |
| V05-0170 | 3.1 | home | V05 §3.1 |
| V05-0171 | 3.1 | home | V05 §3.1 |
| V05-0172 | 3.1 | home | V05 §3.1 |
| V05-0173 | 3.1 | reference | V05 §3.1 (the unit run row cites V01 §3.10.3) |
| V05-0174 | 3.1 | home | V05 §3.1 |
| V05-0175 | 3.1 | home | V05 §3.1 |
| V05-0176 | 3.1 | reference | V05 §3.1 cites §4.1 (V05-RESTATE-5) |
| V05-0177 | 3.1 | home | V05 §3.1 |
| V05-0178 | 3.1 | home | V05 §3.1 |
| V05-0179 | 3.2 | home | V05 §3.2 |
| V05-0180 | 3.2 | home | V05 §3.2 |
| V05-0181 | 3.2 | home | V05 §3.2 |
| V05-0182 | 3.2 | home | V05 §3.2 |
| V05-0183 | 3.2 | home | V05 §3.2 |
| V05-0184 | 3.2 | home | V05 §3.2 |
| V05-0185 | 3.3 | home | V05 §3.3 |
| V05-0186 | 3.3 | home | V05 §3.3 |
| V05-0187 | 3.3 | home | V05 §3.3 |
| V05-0188 | 3.3 | home | V05 §3.3 |
| V05-0189 | 3.3 | home | V05 §3.3 |
| V05-0190 | 3.3 | home | V05 §3.3 |
| V05-0191 | 3.3 | home | V05 §3.3 |
| V05-0192 | 3.4 | home | V05 §3.4 |
| V05-0193 | 3.4 | home | V05 §3.4 |
| V05-0194 | 3.4 | home | V05 §3.4 |
| V05-0195 | 3.4 | home | V05 §3.4 |
| V05-0196 | 3.4 | home | V05 §3.4 |
| V05-0197 | 3.5 | home | V05 §3.5 |
| V05-0198 | 3.5 | home | V05 §3.5 |
| V05-0199 | 3.5 | home | V05 §3.5 |
| V05-0200 | 3.5 | home | V05 §3.5 |
| V05-0201 | 3.5 | home | V05 §3.5 |
| V05-0202 | 3.5 | home | V05 §3.5 |
| V05-0203 | 3.5 | home | V05 §3.5 |
| V05-0204 | 3.5 | home | V05 §3.5 |
| V05-0205 | 3.5 | home | V05 §3.5 |
| V05-0206 | 3.5 | home | V05 §3.5 |
| V05-0207 | 3.5 | home | V05 §3.5 |
| V05-0208 | 3.5 | home | V05 §3.5 |
| V05-0209 | 3.5 | home | V05 §3.5 |
| V05-0210 | 3.5 | home | V05 §3.5 |
| V05-0211 | 3.5 | home | V05 §3.5 |
| V05-0212 | 3.6 | home | V05 §3.6 |
| V05-0213 | 3.6 | home | V05 §3.6 |
| V05-0214 | 3.7 | home | V05 §3.7 |
| V05-0215 | 3.7 | home | V05 §3.7 |
| V05-0216 | 3.7 | home | V05 §3.7 |
| V05-0217 | 3.7 | home | V05 §3.7 |
| V05-0218 | 3.8 | home | V05 §3.8 |
| V05-0219 | 3.8 | home | V05 §3.8 |
| V05-0220 | 3.8 | home | V05 §3.8 |
| V05-0221 | 3.8 | home | V05 §3.8 |
| V05-0222 | 3.8 | home | V05 §3.8 |
| V05-0223 | 3.9 | home | V05 §3.9 |
| V05-0224 | 3.9 | home | V05 §3.9 |
| V05-0225 | 3.9 | home | V05 §3.9 |
| V05-0226 | 3.9 | home | V05 §3.9 |
| V05-0227 | 3.9 | home | V05 §3.9 |
| V05-0228 | 3.9 | home | V05 §3.9 |
| V05-0229 | 3.9 | home | V05 §3.9 |
| V05-0230 | 3.10 | home | V05 §3.10 |
| V05-0231 | 3.10 | home | V05 §3.10 |
| V05-0232 | 3.10 | home | V05 §3.10 |
| V05-0233 | 3.10 | home | V05 §3.10 |
| V05-0234 | 3.10 | home | V05 §3.10 |
| V05-0235 | 3.10 | glossary | V05 §3.10 |
| V05-0236 | 3.10 | home | V05 §3.10 |
| V05-0237 | 3.10 | home | V05 §3.10 |
| V05-0238 | 3.10 | home | V05 §3.10 |
| V05-0239 | 3.10 | home | V05 §3.10 |
| V05-0240 | 3.10 | home | V05 §3.10 |
| V05-0241 | 3.10 | home | V05 §3.10 |
| V05-0242 | 3.10 | reference | V05 §3.10 (6) cites §4.5 *Fields* (file f item 295) |
| V05-0243 | 3.10 | home | V05 §3.10 |
| V05-0244 | 3.11 | home | V05 §3.11 |
| V05-0245 | 3.11 | home | V05 §3.11 |
| V05-0246 | 3.11 | home | V05 §3.11 |
| V05-0247 | 3.11 | home | V05 §3.11 |
| V05-0248 | 3.11 | home | V05 §3.11 |
| V05-0249 | 3.11 | home | V05 §3.11 |
| V05-0250 | 3.11 | home | V05 §3.11 |
| V05-0251 | 3.11 | home | V05 §3.11 |
| V05-0252 | 3.11 | home | V05 §3.11 |
| V05-0253 | 3.12 | home | V05 §3.12 |
| V05-0254 | 3.12 | reference | V05 §3.12 cites V01 §3.10.3 (the contract kept, tested by T-V5-9) |
| V05-0255 | 3.12 | home | V05 §3.12 |
| V05-0256 | 3.12 | handoff | closed at V01 §3.10.3 (the seven inputs); V05 §3.12 cites it |
| V05-0257 | 3.13 | home | V05 §3.13 |
| V05-0258 | 3.13 | home | V05 §3.13 |
| V05-0259 | 3.14 | home | V05 §3.14 |
| V05-0260 | 3.15 | home | V05 §3.15 |
| V05-0261 | 3.15 | home | V05 §3.15 |
| V05-0262 | 3.15 | home | V05 §3.15 |
| V05-0263 | 3.15 | home | V05 §3.15 |
| V05-0264 | 3.15 | home | V05 §3.15 |
| V05-0265 | 3.15 | home | V05 §3.15 |
| V05-0266 | 3.15 | home | V05 §3.15 |
| V05-0267 | 3.15 | home | V05 §3.15 |
| V05-0268 | 3.15 | home | V05 §3.15 |
| V05-0269 | 3.15 | home | V05 §3.15 |
| V05-0270 | 3.15 | home | V05 §3.15 |
| V05-0271 | 3.15 | home | V05 §3.15 |
| V05-0272 | 3.15 | home | V05 §3.15 |
| V05-0273 | 3.16 | home | V05 §3.16 |
| V05-0274 | 3.16 | home | V05 §3.16 |
| V05-0275 | 3.16 | home | V05 §3.16 |
| V05-0276 | 3.16 | home | V05 §3.16 |
| V05-0277 | 3.16 | home | V05 §3.16 |
| V05-0278 | 3.16 | home | V05 §3.16 |
| V05-0279 | 3.16 | home | V05 §3.16 |
| V05-0280 | 3.16 | home | V05 §3.16 |
| V05-0281 | 3.16 | home | V05 §3.16 |
| V05-0282 | 3.16 | home | V05 §3.16 |
| V05-0283 | 3.16 | home | V05 §3.16 |
| V05-0284 | 3.16 | home | V05 §3.16 |
| V05-0285 | 3.16 | home | V05 §3.16 |
| V05-0286 | 3.17 | home | V05 §3.17 |
| V05-0287 | 3.17 | reference | V05 §3.17 (F-OUTLINE, base) |
| V05-0288 | 3.17 | home | V05 §3.17 |
| V05-0289 | 3.17 | home | V05 §3.17 |
| V05-0290 | 3.17 | home | V05 §3.17 |
| V05-0291 | 3.17 | home | V05 §3.17 |
| V05-0292 | 3.17 | home | V05 §3.17 |
| V05-0293 | 3.17 | home | V05 §3.17 |
| V05-0294 | 3.17 | home | V05 §3.17 |
| V05-0295 | 3.17 | home | V05 §3.17 |
| V05-0296 | 3.18 | home | V05 §3.18 |
| V05-0297 | 3.18 | home | V05 §3.18 |
| V05-0298 | 3.19 | home | V05 §3.19 |
| V05-0299 | 3.19 | home | V05 §3.19 |
| V05-0300 | 3.19 | home | V05 §3.19 |
| V05-0301 | 3.19 | home | V05 §3.19 |
| V05-0302 | 3.19 | home | V05 §3.19 |
| V05-0303 | 3.19 | home | V05 §3.19 |
| V05-0304 | 3.19 | home | V05 §3.19 |
| V05-0305 | 3.19 | home | V05 §3.19 |
| V05-0306 | 3.19 | home | V05 §3.19 |
| V05-0307 | 3.19 | home | V05 §3.19 |
| V05-0308 | 3.20 | home | V05 §3.20 |
| V05-0309 | 3.20 | home | V05 §3.20 |
| V05-0310 | 3.20 | home | V05 §3.20 |
| V05-0311 | 3.20 | home | V05 §3.20 |
| V05-0312 | 3.20 | home | V05 §3.20 |
| V05-0313 | 3.20 | home | V05 §3.20 |
| V05-0314 | 3.20 | home | V05 §3.20 |
| V05-0315 | 3.20 | home | V05 §3.20 |
| V05-0316 | 3.20 | home | V05 §3.20 |
| V05-0317 | 3.20 | home | V05 §3.20 |
| V05-0318 | 3.20 | home | V05 §3.20 |
| V05-0319 | 3.20 | home | V05 §3.20 |
| V05-0320 | 3.20 | home | V05 §3.20 |
| V05-0321 | 3.20 | home | V05 §3.20 |
| V05-0322 | 3.20 | home | V05 §3.20 |
| V05-0323 | 3.20 | home | V05 §3.20 |
| V05-0324 | 3.20 | home | V05 §3.20 |
| V05-0325 | 3.21 | home | V05 §3.21 |
| V05-0326 | 3.21 | home | V05 §3.21 |
| V05-0327 | 3.21 | home | V05 §3.21 |
| V05-0328 | 3.22 | home | V05 §3.22 |
| V05-0329 | 3.22 | home | V05 §3.22 |
| V05-0330 | 3.22 | home | V05 §3.22 |
| V05-0331 | 3.22 | home | V05 §3.22 |
| V05-0332 | 3.22 | home | V05 §3.22 |
| V05-0333 | 3.22 | home | V05 §3.22 |
| V05-0334 | 3.22 | home | V05 §3.22 |
| V05-0335 | 3.22 | home | V05 §3.22 |
| V05-0336 | 3.22 | home | V05 §3.22 |
| V05-0337 | 3.22 | home | V05 §3.22 |
| V05-0338 | 4.1 | home | V05 §4.1 |
| V05-0339 | 4.1 | home | V05 §4.1 |
| V05-0340 | 4.2 | home | V05 §4.2 |
| V05-0341 | 4.2 | home | V05 §4.2 |
| V05-0342 | 4.2 | home | V05 §4.2 |
| V05-0343 | 4.2 | home | V05 §4.2 |
| V05-0344 | 4.2 | home | V05 §4.2 |
| V05-0345 | 4.2 | home | V05 §4.2 |
| V05-0346 | 4.2 | home | V05 §4.2 |
| V05-0347 | 4.2 | home | V05 §4.2 |
| V05-0348 | 4.2 | home | V05 §4.2 |
| V05-0349 | 4.2 | home | V05 §4.2 |
| V05-0350 | 4.2 | home | V05 §4.2 |
| V05-0351 | 4.2 | home | V05 §4.2 |
| V05-0352 | 4.2 | home | V05 §4.2 |
| V05-0353 | 4.2 | home | V05 §4.2 |
| V05-0354 | 4.2 | home | V05 §4.2 |
| V05-0355 | 4.2 | home | V05 §4.2 |
| V05-0356 | 4.2 | home | V05 §4.2 |
| V05-0357 | 4.2 | home | V05 §4.2 |
| V05-0358 | 4.2 | home | V05 §4.2 |
| V05-0359 | 4.2 | home | V05 §4.2 |
| V05-0360 | 4.2 | home | V05 §4.2 |
| V05-0361 | 4.2 | home | V05 §4.2 |
| V05-0362 | 4.3 | home | V05 §4.3 |
| V05-0363 | 4.3 | home | V05 §4.3 |
| V05-0364 | 4.3 | reference | V05 §4.3 cites §7.4 (file f item 375) |
| V05-0365 | 4.4 | home | V05 §4.4 |
| V05-0366 | 4.4 | home | V05 §4.4 |
| V05-0367 | 4.4 | home | V05 §4.4 |
| V05-0368 | 4.4 | home | V05 §4.4 |
| V05-0369 | 4.5 | home | V05 §4.5 |
| V05-0370 | 4.5 | home | V05 §4.5 |
| V05-0371 | 4.5 | home | V05 §4.5 |
| V05-0372 | 5.1 | home | V05 §5.1 |
| V05-0373 | 5.1 | home | V05 §5.1 |
| V05-0374 | 5.1 | home | V05 §5.1 |
| V05-0375 | 5.2 | home | V05 §5.2 |
| V05-0376 | 5.3 | home | V05 §5.3 |
| V05-0377 | 5.3 | home | V05 §5.3 |
| V05-0378 | 5.3 | home | V05 §5.3 |
| V05-0379 | 5.3 | home | V05 §5.3 |
| V05-0380 | 5.3 | home | V05 §5.3 |
| V05-0381 | 5.3 | home | V05 §5.3 |
| V05-0382 | 5.4 | home | V05 §5.4 |
| V05-0383 | 5.5 | home | V05 §5.5 |
| V05-0384 | 5.5 | home | V05 §5.5 |
| V05-0385 | 6 | home | V05 §6 |
| V05-0386 | 6 | home | V05 §6 |
| V05-0387 | 6 | home | V05 §6 |
| V05-0388 | 7 | home | V05 §7 |
| V05-0389 | 7 | home | V05 §7 |
| V05-0390 | 7 | home | V05 §7 |
| V05-0391 | 7 | home | V05 §7 |
| V05-0392 | 7 | home | V05 §7 |
| V05-0393 | 7 | home | V05 §7 |
| V05-0394 | 7 | home | V05 §7 |
| V05-0395 | 7 | home | V05 §7 |
| V05-0396 | 7 | home | V05 §7 |
| V05-0397 | 7 | home | V05 §7 |
| V05-0398 | 7 | home | V05 §7 |
| V05-0399 | 7 | home | V05 §7 |
| V05-0400 | 7 | home | V05 §7 |
| V05-0401 | 7 | home | V05 §7 |
| V05-0402 | 7 | home | V05 §7 |
| V05-0403 | 7 | home | V05 §7 |
| V05-0404 | 7 | home | V05 §7 |
| V05-0405 | 7 | home | V05 §7 |
| V05-0406 | 7 | home | V05 §7 |
| V05-0407 | 7 | home | V05 §7 |
| V05-0408 | 7 | home | V05 §7 |
| V05-0409 | 7 | home | V05 §7 |
| V05-0410 | 7 | home | V05 §7 |
| V05-0411 | 7 | home | V05 §7 |
| V05-0412 | 7 | home | V05 §7 |
| V05-0413 | 7 | home | V05 §7 |
| V05-0414 | 7 | home | V05 §7 |
| V05-0415 | 7 | home | V05 §7 |
| V05-0416 | 7 | home | V05 §7 |
| V05-0417 | 7 | home | V05 §7 |
| V05-0418 | 7 | home | V05 §7 |
| V05-0419 | 7 | home | V05 §7 |
| V05-0420 | 8 | home | V05 §8 |
| V05-0421 | 8 | home | V05 §8 |
| V05-0422 | 8 | home | V05 §8 |
| V05-0423 | 8 | reference | V05 §8 *The register at the exits* (cites V12 §3.11) |
| V05-0424 | 9 | home | V05 §9 |
| V05-0425 | 9 | home | V05 §9 |
| V05-0426 | 9 | home | V05 §9 |
| V05-0427 | 9 | home | V05 §9 |
| V05-0428 | 9 | home | V05 §9 |
| V05-0429 | 9 | home | V05 §9 |
| V05-0430 | 9 | home | V05 §9 |
| V05-0431 | 9 | home | V05 §9 |
| V05-0432 | 9 | home | V05 §9 |
| V05-0433 | 9 | home | V05 §9 |
| V05-0434 | 9 | home | V05 §9 |
| V05-0435 | 9 | home | V05 §9 |
| V05-0436 | 9 | home | V05 §9 |
| V05-0437 | 9 | home | V05 §9 |
| V05-0438 | 9 | home | V05 §9 |
| V05-0439 | 9 | home | V05 §9 |
| V05-0440 | 9 | home | V05 §9 |
| V05-0441 | 9 | home | V05 §9 |
| V05-0442 | 9 | home | V05 §9 |
| V05-0443 | 9 | home | V05 §9 |
| V05-0444 | 9 | home | V05 §9 |
| V05-0445 | 9 | home | V05 §9 |
| V05-0446 | 9 | home | V05 §9 |
| V05-0447 | 9 | home | V05 §9 |
| V05-0448 | 9 | home | V05 §9 |
| V05-0449 | 9 | home | V05 §9 |
| V05-0450 | 9 | home | V05 §9 |
| V05-0451 | 9 | home | V05 §9 |
| V05-0452 | 9 | home | V05 §9 |
| V05-0453 | 9 | home | V05 §9 |
| V05-0454 | 9 | home | V05 §9 |
| V05-0455 | 9 | home | V05 §9 |
| V05-0456 | 9 | home | V05 §9 |
| V05-0457 | 9 | home | V05 §9 |
| V05-0458 | 9 | home | V05 §9 |
| V05-0459 | 9 | home | V05 §9 |
| V05-0460 | 9 | home | V05 §9 |
| V05-0461 | 9 | home | V05 §9 |
| V05-0462 | 9 | home | V05 §9 |
| V05-0463 | 9 | home | V05 §9 |
| V05-0464 | 9 | home | V05 §9 |
| V05-0465 | 9 | home | V05 §9 |
| V05-0466 | 9 | home | V05 §9 |
| V05-0467 | 9 | home | V05 §9 |
| V05-0468 | 9 | home | V05 §9 |
| V05-0469 | 9 | home | V05 §9 |
| V05-0470 | 9 | home | V05 §9 |
| V05-0471 | 9 | home | V05 §9 |
| V05-0472 | 9 | home | V05 §9 |
| V05-0473 | 9 | home | V05 §9 |
| V05-0474 | 9 | home | V05 §9 |
| V05-0475 | 9 | home | V05 §9 |
| V05-0476 | 9 | home | V05 §9 |
| V05-0477 | 9 | home | V05 §9 |
| V05-0478 | 9 | home | V05 §9 |
| V05-0479 | 9 | home | V05 §9 |
| V05-0480 | 9 | home | V05 §9 |
| V05-0481 | 9 | home | V05 §9 |
| V05-0482 | 9 | home | V05 §9 |
| V05-0483 | 9 | home | V05 §9 |
| V05-0484 | 9 | home | V05 §9 |
| V05-0485 | 9 | home | V05 §9 |
| V05-0486 | 9 | home | V05 §9 |
| V05-0487 | 9 | home | V05 §9 |
| V05-0488 | 9 | home | V05 §9 |
| V05-0489 | 9 | home | V05 §9 |
| V05-0490 | 9 | home | V05 §9 |
| V05-0491 | 9 | home | V05 §9 |
| V05-0492 | 9 | home | V05 §9 |
| V05-0493 | 9 | home | V05 §9 |
| V05-0494 | 9 | home | V05 §9 |
| V05-0495 | 9 | home | V05 §9 |
| V05-0496 | 9 | home | V05 §9 |
| V05-0497 | 9 | home | V05 §9 |
| V05-0498 | 9 | home | V05 §9 |
| V05-0499 | 9 | home | V05 §9 |
| V05-0500 | 9 | home | V05 §9 |
| V05-0501 | 9 | home | V05 §9 |
| V05-0502 | 9 | home | V05 §9 |
| V05-0503 | 9 | home | V05 §9 |
| V05-0504 | 9 | home | V05 §9 |
| V05-0505 | 10 | bcr-pointer | V05 §10 row BCR-V5-1 → file f item 251 → §2.7, §2.8 |
| V05-0506 | 10 | bcr-pointer | V05 §10 row BCR-V5-2 → file f item 203 → §2.2, §2.9, §6.3 |
| V05-0507 | 10 | bcr-pointer | V05 §10 row BCR-V5-3 → file f item 282 → §4.1 |
| V05-0508 | 10 | bcr-pointer | V05 §10 row BCR-V5-4 → file f item 546 → II.6, §4.9 |
| V05-0509 | 10 | bcr-pointer | V05 §10 row BCR-V5-5 → file f item 295 → §4.5 |
| V05-0510 | 10 | bcr-pointer | V05 §10 row BCR-V5-6 → file f item 213 → §2.5, §10.2 |
| V05-0511 | 10 | bcr-pointer | V05 §10 row BCR-V5-7 → file f item 320 → §4.11 |
| V05-0512 | 10 | bcr-pointer | V05 §10 row BCR-V5-8 → file f item 307 → §4.7 |
| V05-0513 | 10 | bcr-pointer | V05 §10 row BCR-V5-9 → file f item 252 → §2.7, §2.3 |
| V05-0514 | 10 | bcr-pointer | V05 §10 row BCR-V5-10 → file f item 356 → §7.1, §7.8 |
| V05-0515 | 10 | bcr-pointer | V05 §10 row BCR-V5-11 → file f item 331 → §5.2, §5.3 |
| V05-0516 | 10 | bcr-pointer | V05 §10 row BCR-V5-12 → file f item 387, 383 → §7.7 |
| V05-0517 | 10 | bcr-pointer | V05 §10 row BCR-V5-13 → file f item 415 → §8.4, §8.2, §9.1, §9.2, §11.1 |
| V05-0518 | 10 | bcr-pointer | V05 §10 row BCR-V5-14 → file f item 476 → §12.4, §13.2, §14, §16, §6.1, §6.3 |
| V05-0519 | 10 | bcr-pointer | V05 §10 row BCR-V5-15 → file f item 296 → §4.5, §8.4, §13.2 |
| V05-0520 | 10 | bcr-pointer | V05 §10 row BCR-V5-16 → file f item 308 → §4.7, §4.5, §10.2, §13.2 |
| V05-0521 | 10 | bcr-pointer | V05 §10 row BCR-V5-17 → file f item 547 → II.6 |
| V05-0522 | 10 | bcr-pointer | V05 §10 row BCR-V5-18 → file f item 408 → §8.2 |
| V05-0523 | 10 | bcr-pointer | V05 §10 row BCR-V5-19 → file f item 286 → §4.2, §2.5 |
| V05-0524 | 10 | bcr-pointer | V05 §10 row BCR-V5-20 → file f item 299 → §4.6 |
| V05-0525 | 10 | bcr-pointer | V05 §10 row BCR-V5-21 → file f item 274 → §2.9, §7.5 |
| V05-0526 | 10 | bcr-pointer | V05 §10 row BCR-V5-22 → file f item 416 → §8.4, §8.1 |
| V05-0527 | 10 | bcr-pointer | V05 §10 row BCR-V5-23 → V06 §2.1, §3.8.1 (V06 X10) |
| V05-0528 | 10 | bcr-pointer | V05 §10 row BCR-V5-24 → file f item 204 → §2.2 |
| V05-0529 | 10 | bcr-pointer | V05 §10 row BCR-V5-25 → file f item 375 → §7.4 |
| V05-0530 | 10 | bcr-pointer | V05 §10 row BCR-V5-26 → file f item 253 → §2.7 |
| V05-0531 | 10 | bcr-pointer | V05 §10 row BCR-V5-27 → file f item 245 → §2.7 |
| V05-0532 | 10 | bcr-pointer | V05 §10 row BCR-V5-28 → V06 §3.2 (V06 W66) |
| V05-0533 | 10 | bcr-pointer | V05 §10 row BCR-V5-29 → file f item 290 → §4.3 |
| V05-0534 | 10 | bcr-pointer | V05 §10 row BCR-V5-30 → file f item 309 → §4.7 S10–S11 |
| V05-0535 | 11 | answer-J121-J122 | V05 §11 (decided: J122) |
| V05-0536 | 12 | history-out | validation records; V05 §12 keeps one CONFIRMED paragraph and one PLAUSIBLE list |
| V05-0537 | 13 | handoff | V05 §13 (closed at destinations; cross-part notes) |
| V05-0538 | 13 | handoff | V05 §13 (closed at destinations; cross-part notes) |
| V05-0539 | 13 | handoff | V05 §13 (closed at destinations; cross-part notes) |
| V05-0540 | IN | home | folded: V05 §3.2 (3)–(4), §3.21 (3), §3.22 (3)–(4), §4.1, §4.2, §3.23; V05 *Integration notes* |
| V05-0541 | IN | home | folded: V05 §3.2 (6), §3.10 (1), §4.2 (E-02) |
| V05-0542 | IN | home | folded: V05 §4.4 (DR27) |
| V05-0543 | IN | home | folded: V05 §3.21 (1) (`sheer`, J-VI.3) |
| V05-0544 | RC | home | validation records (history out; every change already in the body) |
| V05-G01 | term | glossary | V05 §2.1 — term `sky island` |
| V05-G02 | term | glossary | V05 §2.1, §3.2 — term `slot` |
| V05-G03 | term | glossary | V05 §2.1 — term `sky part` |
| V05-G04 | term | glossary | V05 §2.1 — term `anchor` |
| V05-G05 | term | glossary | V05 §3.8 — term `rim` |
| V05-G06 | term | glossary | V05 §3.8; BCR-V5-24 — term `void face` |
| V05-G07 | term | glossary | V05 §3.8 — term `land face` |
| V05-G08 | term | glossary | V05 §3.10 (5) — term `rim strip` |
| V05-G09 | term | glossary | V05 §3.12; V01 V1-3.10.3 — term `rim walk` |
| V05-G10 | term | glossary | V05 §3.10 — term `landing yard` |
| V05-G11 | term | glossary | V05 §2.3, §3.10 — term `attach vertex` |
| V05-G12 | term | glossary | V05 §2.2 — term `access` |
| V05-G13 | term | glossary | V05 §2.2 — term `top / foot` |
| V05-G14 | term | glossary | V05 §2.2 — term `run` |
| V05-G15 | term | glossary | V05 §2.2 — term `unserved / ruined` |
| V05-G16 | term | glossary | V05 §3.3 — term `town supply S_town` |
| V05-G17 | term | glossary | V05 §3.3 — term `carried supply S_carried` |
| V05-G18 | term | glossary | V05 §3.3 — term `supported area A` |
| V05-G19 | term | glossary | V05 §3.3 — term `law's altitude E` |
| V05-G20 | term | glossary | V05 §3.3 — term `node term` |
| V05-G21 | term | glossary | V05 §3.4 — term `prosperity island / institution island` |
| V05-G22 | term | glossary | V05 §3.5 — term `fill` |
| V05-G23 | term | glossary | V05 §3.5 (3) — term `never carried / carried by share / split` |
| V05-G24 | term | glossary | V05 §3.5 (3) — term `coverage units` |
| V05-G25 | term | glossary | V05 §3.5 — term `handover` |
| V05-G26 | term | glossary | V05 §2.1, §3.9 — term `underside profile` |
| V05-G27 | term | glossary | V05 §1, §3.9 — term `underside tier` |
| V05-G28 | term | glossary | V05 §3.9 (2) — term `rim slab` |
| V05-G29 | term | glossary | V05 §3.9 (3) — term `ground reference groundRefCm` |
| V05-G30 | term | glossary | V05 §3.9 (3) — term `caster ceiling / caster allowance` |
| V05-G31 | term | glossary | V05 §3.9 (4) — term `surface top` |
| V05-G32 | term | glossary | V05 §3.9 (5) — term `clearance check` |
| V05-G33 | term | glossary | V05 §2.3a, §3.19 — term `shade strip` |
| V05-G34 | term | glossary | V05 §2.1 — term `shade basis` |
| V05-G35 | term | glossary | V05 §3.19 (6) — term `shade evaluation` |
| V05-G36 | term | glossary | V05 §3.11 — term `shadeSky` |
| V05-G37 | term | glossary | V05 §3.19 (7) — term `island-free value` |
| V05-G38 | term | glossary | BCR-V5-15 (base §4.5) — term `model sampler` |
| V05-G39 | term | glossary | V05 §3.20 — term `route distance skyRoute` |
| V05-G40 | term | glossary | V05 §3.7 (2) — term `admissible ground` |
| V05-G41 | term | glossary | V05 §3.11 — term `island gradient P_I` |
| V05-G42 | term | glossary | V05 §3.12 — term `fabric hint` |
| V05-G43 | term | glossary | V05 §2.3 (renamed `SkyUnitInput`, G-unitinput) — term `SkyHandover` |
| V05-G44 | term | glossary | V05 §3.1 — term `SKY / SKY-F` |
| V05-G45 | term | glossary | V05 §3.16 — term `landfall` |
| V05-G46 | term | glossary | V05 §3.16 (5); BCR-V5-9 — term `member` |
| V05-G47 | term | glossary | V05 §3.2 (6), §3.10 (1) — term `removed slot / removed ordinal` |
| V05-G48 | term | glossary | V05 §3.15 — term `wane / settle / fall / refloat / raise` |
| V05-G49 | term | glossary | J-VI.4 — term `bend` |
