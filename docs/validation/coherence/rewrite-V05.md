# Rewrite — design volume V05 (the sky layer)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V05; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V05`, 2026-09-29 – 2026-09-30)
- P1 inputs gathered (canon unit V05: 6 conflicts, 4 elegance, 2 id rulings, 4 wiring gaps, 35 f items, g 111 part, 17 hand-offs, 60 U + 48 T edges, 31 combinations, 69 open findings, 544 inventory ids); volume read whole: done
- P2 head, §0, §1, §1b: done
- P3 §2: done
- P4 §3.1–§3.12: done
- P5 §3.13–§3.18: done
- P6 §3.19–§3.22 and §3.23 (edges): done
- P7 §4–§6: done
- P8 §7 tests: done
- P9 §8–§13, integration notes: done
- P10 assemble, verify ids, references, terms, sizes: done
- P11 report (mapping table, elegance, conflicts, renumberings, cross-part notes), result file, LANDED: done

Source: `docs/volumes/V05-sky.md`. Output: `docs/validation/coherence/new/volumes/V05-sky.md` (the same title line, the same
section structure §0–§13 with §3.23 added, the volume's first marker line kept). Working parts:
`docs/validation/coherence/work/rewrite-V05/parts/` (14 files); routing: `work/rewrite-V05/routing.md`.

## Sizes

| | words (wc) | bytes |
|---|---|---|
| before | 79 756 (the canon's count 81 161) | 495 910 |
| after | 62 987 | 384 276 |
| change | −16 769 (−21.0 %) | −22.5 % |

Per section (words before → after): header, eight stacked banners and the PROGRESS ledger → one marker line; §0 1 667 →
1 605; §1 3 678 → 2 185; §1b 3 377 → 2 194; §2 9 043 → 8 798; §3 20 163 → 21 940 (with the new §3.23, 3 090); §4 5 679
→ 5 647 (with the bend table); §5 2 486 → 2 417; §6 1 605 → 1 609; §7 5 500 → 6 660 (with T-V5-33 – T-V5-37 and four new
clauses); §8 1 708 → 1 607; §9 6 842 → 7 251 (with J-V5.82 – J-V5.86); §10 7 543 → 629; §11 99 → 94; §12 2 792 → 456; §13
2 721 → 740; integration notes 283 → 196; the seven reconciliation-round records 4 475 → 0.

**Words removed by source** (≈ 23 100 removed, ≈ 6 300 added as routed new design): NARRATION ≈ 10 400 (45 %: the
banners and PROGRESS ledger, the seven reconciliation-round records, §12's round histories with lanes, md5s and landing
times, §13's per-round cross-lane items and "landed" notes, the decision rows' revision provenance, the seam, critique
and round ids through the body, the scratchpad receipt paths, the disc-sized-frame parenthesis); RESTATEMENT ≈ 9 900
(43 %: V05 §10's thirty quoted base texts turned into one pointer table, 6 900; §1.2's value-bearing hook table turned
into an index of citations; §1b's field rows folded into §2.6's one table; the lifecycle rows of other units' fields cut
to this volume's writer cell; the model sampler, the island rule's defaults, the ground's L1 writer order, the rung
gate's values, the lift rule, the DR27 row, the event and `ConversionOp` types and §7.4's rows cited at their base
homes; volume 1's run steps cited at V01 §3.10.3); DUPLICATED MECHANISMS ≈ 900 (4 %: the landfall's covered kinds in one
table, the shade evaluations in one schedule, the stretch-state profile cited once at §2.2 rule 5); VERBOSE PROSE ≈ 1 900
(8 %).

**Below the band (−21.0 % against 25–40 %).** The irreducible content: the design body §2–§9 is dense normative text
(records, rules, rows, bars) with little narration left once the tags are gone, and the pass adds ≈ 6 300 words of routed
new design — §3.23's edge rules, the none/one/cap table and the twenty combinations; T-V5-33 – T-V5-37 and the new
clauses of T-V5-8, T-V5-14, T-V5-16 and T-V5-31; J-V5.82 – J-V5.86; the bend-key table (V05-WGAP-2); the lock rule for a
dossier removal (V05-EDGE-1), the landfall over another island's access (V05-EDGE-2), the obstacle list's size
(V05-EDGE-3); item 111's part (V05-MISSING-1); the `near: 'richest'` term (V05-WGAP-3). Without those additions the cut is
≈ −28.9 %. No section shrank by more than half except §10, §12, §13 and the round records, whose removed words are
restatement and narration only (the mapping table below names where every one of their facts lives).

## Rulings applied

### Elegance rulings (with their equivalence lists)

* **E-01** (UNIFY; home §2.2 rule 5) — the stretch-state profile. Applied: V05 §2.6's `Enceinte.condition` and
  `RetainingWall.state` rows give only this volume's writer cell (the landfall) and cite §2.2 rule 5 for the rest; V05
  §3.16's table names both as stretch-state profiles. Equivalence: [x] canonical form — §2.2 rule 5 (the landfall writes
  knots at each covered length's end; a run already `dismantled` kept, V05 §3.16's table); [x] write — near knot new,
  far knot former (§2.2 rule 5; "a knot at each end", V05 §3.16); [x] read — `sampleProfile` (§2.2 rule 5; V05 §2.6 cites);
  [x] regenerate — carried by lattice point, a generated retaining wall keyed by lineage stays `decayed` through a
  re-derivation until V06 §3.19.4 (6)'s restoration (V05 §2.6's `RetainingWall.state` row, §3.16's table); [x] cut or join
  — §2.2 rule 5; [x] undo — the `fallIsland` undo restores the prior profile and `lifecycle` (V05 §2.6, §3.16 (8)); [x]
  migrate — §2.2 rule 5 (absent = `standing`); [x] RetainingWall keeps its values, knot role, the landfall as writer
  (`decayed`), its readers (V06 §3.19.4, the renderer, the export, the clerk) — V05 §2.6, §3.16, §4.5, §5.1, §5.5; [x]
  Enceinte keeps its values, knot role, the landfall as writer (`breached`), the `lifecycle` rule (`decayed` while any run
  is not `standing`), §8.2's gap glyph, §11.1's per-run LineStrings — V05 §2.6, §3.16's table, §5.1.
* **E-02** (KEEP APART) — the island's removal keeps its record form (a live `SkyIsland` in state `removed`, `removed`,
  `removedAccesses`, `removedSlots(doc)`), never `detail.suppress`; the one lift rule is stated once at §2.8 and cited at
  V05 §3.2 (6), §2.6, §4.2. The separating nuance kept: the removal holds a count-law slot counted as filled and an
  archived arena part with its households for undo (V05 §3.2 (6), §4.2; J-V5.62).
* **E-16** (UNIFY; home §8.2) — `wash`/`edgeFade` for the post operations and `glow` for the role `lights`. No occurrence
  in V05 (grep: no post-op `tint`, `vignette` or role `lights`); V05's role `light` (the bridge of light's ribbon, V05
  §5.1) is the distinct glyph-tone role E-16 keeps. Equivalence: [x] programs per mark, post operations once per tile — not
  touched; [x] the two roles' distinct uses kept (`light` used, `glow` not).
* **E-24** (UNIFY; one mark on the decision row) — J-V5.40 *Superseded by J-VI.13* (DR27), its reason kept in the row;
  J-V5.61's inline "superseding …" parenthesis removed (J-VI.4 governs, cited). Equivalence: [x] no row dropped (J-V5.1 –
  J-V5.81 all present, J-V5.82 – .86 added); [x] the governing row keeps the reason (J-VI.13 in `_integrate.md`; J-V5.40's
  own reason kept).

### Conflicts resolved (6)

* **MC-05** (FIX-BY-F) — `ContextVector.arena` `'sky'` is §2.5's (f item 213); V05 §3.11 reads it as stated; V05 §2.6's
  `arena 'sky'` row cites §2.5.
* **MC-07** (FIX-BY-F) — `SkyIsland.rim: ChainRef` and `land: FaceRef` (f item 251); V05 §2.1 declares them, no stored
  position; §2.6's migrate cell converts a base `outline`.
* **CF-PIPE-06** (FIX) — S12c covers the districts on a sky island's arena (SKY-F before S12c): V05 §3.1's S12c row cites
  §4.5.
* **V05-ICONF-1** (FIX) — `ShadeBasis.by` and `IslandShadeStrip.evaluated.by` gain `'update'`; Update shade now writes
  `update` and the document's current epoch (V05 §2.1, §2.3a, §3.19 (6) (d), §4.2; T-V5-21 (b)).
* **V05-XCONF-1** (FIX) — DR27 everywhere (§1b, §4.4, J-V5.40 marked superseded, §10's BCR-V5-12 row "387 (383)", §13);
  "the integrator gives it the next free number" removed.
* **CANON-C03** (FIX) — V05 §11 is the table of decisions (Q1: the underground first, J122); §8 cites §16's order.

### Id rulings and renumberings

* **ID-DR** — DR-SKY → DR27 (15 places); no alias kept.
* **ID-BCR** — V01's bare `BCR-39`, `BCR-45`, `BCR-26`, `BCR-10 (c)`, `BCR-43` → cited as their base homes (§4.3's slot,
  item 580, §4.9's rim-walk row, §4.7) or as `BCR-V1-26`; V04's `BCR-45` → `BCR-V4-45`.
* **New ids** (collision-checked against the set's census): T-V5-33 – T-V5-37; J-V5.82 – J-V5.86; the bend keys
  `bend.island.gate`, `.fourth`, `.count`, `.altitude`, `.claimFloor`, `.rimStop`, `bend.access.kind`, `.last`, `.foot`,
  `bend.raised.hoist`, `bend.wall.drop`; the `ShadeBasis.by` / `evaluated.by` value `update`; V05 §3.23. No id removed; no
  id renumbered beyond ID-DR.

### Terms replaced (the canon's glossary)

G-cite (every `V5 §`, `V1 §`, `V2 §`, `V4 §`, `V6 §`, `V9 §` and `V1-x.y` → `Vnn §x.y`, self-references `V05 §`); G-unitinput
(`SkyHandover`/`skyHandover`/"the hand-over to the unit run" → `SkyUnitInput`/`skyUnitInput`/"the unit inputs";
`handover` kept for the reservation passing); G-DR (DR-SKY → DR27); G-refview ("reference view" → "reference
viewport", T-V5-11); G-vectorrung ("the vector pass" → "the vector rung", V05 §5.3 (3)); G-newrandom ("scoped re-roll" →
"New random on the other island", T-V5-29). "T9's delete" → "T10's delete (volume 9's delete row)" (XV-V9-16 (a)).

### File f items cited as base text (35, plus 383)

203, 204, 213, 244, 245, 246, 251, 252, 253, 260, 274, 282, 286, 290, 295, 296, 299, 307, 308, 309, 313, 320, 331, 356,
375, 383, 387, 408, 415, 416, 476, 546, 547, 568, 575, 580 — each by the base section it lands in (V05 §10's table maps
the thirty requests); no f item's text restated.

### File g item 111 — the part written (new design at build depth)

"An island's own water, unchanged": V05 §3.8 (4) (no oasis, no ground-yield well, the conjured river or spring pond the
island's only water; an oasis on the ground is no river for the conjured-river rule), §3.11 (no water term in `P_I`;
`w_sun` as item 111 (c)'s cell sets it), §3.7 (1) (a ground oasis is `water` in the class raster), §3.22 (5) (d) (an
oasis's spring among the aqueduct's ground sources), §1.1 item 23, §1.3, J-V5.85, T-V5-37 (the no-op clause), §3.23 (c)
and (g).

### Wiring gaps closed

* **W-HOOK-02** — §2.7 names V05 as `SkyIsland`'s and `SkyAccess`'s building volume; V05 §2.1 states it declares them
  (both ends).
* **V05-WGAP-1** — V05's side of the un-displacement stated (V05 §4.2, T-V5-16); V09's hit-testing side routed (cross-part
  note).
* **V05-WGAP-2a / -2b** — V05 §4.2's bend table names every island bend's key and line, the two claim-floor lines as
  `bend.island.claimFloor` and `bend.island.rimStop`; V09's rows and V10's category routed (cross-part notes).
* **V05-WGAP-3** — `IslandInstitution.near 'richest'` read by V05 §3.7 (3) (c) (T-V5-5); `IslandShadeStrip.cells` read by
  the clerk and the CSV (the ≥ 1-sample area); `.evaluated` by the clerk and T-V5-21 (b); `SkyIsland.removed.generated` by
  `removedSlots(doc)`, which words the hold for volume 9's card and the clerk.
* Every field's producer and readers in V05 §2.6, every other piece in V05 §1b (DUP-3).

### Open findings closed (69)

| finding | closure |
|---|---|
| VOL-V05-V06-RESTATEMENTS-001, -002, V05-RESTATE-1 | §1.2 is an index of citations; the rung values cited at §1.1 (V05 §3.2 (1)) |
| RESTATEMENTS-003, V05-RESTATE-2 | the raised-way slot cited as §4.3's (f item 290 (1)) at V05 §3.1, §3.22 (1), (3) (c) |
| RESTATEMENTS-004 | `IslandRule.chance` and `redrawPerYear` comments and the dynamics row cite II.6 (4) with no value |
| RESTATEMENTS-005, V05-RESTATE-5 | the L1 writer order cited at §4.1 (V05 §3.1); the rung values at §1.1 |
| RESTATEMENTS-006, V05-RESTATE-3 | `node.bonus`'s value has its one home at V05 §2.4 (comment says so); the base's literal is the pipeline editor's (cross-part note) |
| RESTATEMENTS-007, -008, -009, V05-RESTATE-4 | V05 §3.19 (1) cites §4.5's sampler; only the strip's use kept |
| RESTATEMENTS-010, -011, V05-RESTATE-7 | V05 §2.6's `formerClass` and `condition` rows keep only the landfall's writer cell, citing V06 §2.12, §2.7, §2.2 rule 5 |
| RESTATEMENTS-012, V05-RESTATE-6 | V05 §10 is the pointer table |
| V05-DUP-1 | the shade evaluations stated once, V05 §3.19 (6), cited at §2.1, §2.3a, §2.6, §3.1, §3.15, §4.2 |
| V05-DUP-2 | V05 §3.16's one table (kind, outcome, drawn by, cleared by); cited at §1b, §2.6, §4.5, §5.1, §5.5, §3.22 (8) |
| V05-DUP-3 | V05 §2.6 one table per field (readers merged from §1b); §1b non-field pieces only |
| V05-ICONF-1, V05-XCONF-1 | conflicts above |
| V05-EDGE-1 | V05 §3.15 (1b) *Under a lock*; J-V5.82; T-V5-14 |
| V05-EDGE-2 | V05 §3.16 (3); J-V5.83; T-V5-14; §4.3's `fallIsland` row; §6's `fallIsland` row |
| V05-EDGE-3 | V05 §2.3b's size rule; J-V5.84; §6's obstacles row; T-V5-8 |
| V05-EDGE-4 | T-V5-31 (f); F-SKY-CLEAR's lock rung (V05 §3.17) |
| V05-WGAP-1, -2, -3 | wiring gaps above |
| V05-MISSING-1 | g item 111's part above |
| V05-MISSING-2 | V05 §11's decision table; §8 cites §16's order (after M6-U) |
| V05-TERM-1, V05-TERM-2 | G-cite and G-unitinput applied throughout |
| V05-DEFER-1, -2 | the callers of `skyAccessObstacles` stated as ruled (the epoch's raised-way pass and a new stage's S4, and T4); the slot cited as §4.3's (V05 §1b, §3.1, §3.22 (3) (c)) |
| V05-DEFER-3 | §13's intro sentence deleted; the ⟨P0⟩ calibrations are §8's exits |
| V05-NARR-1 – -6 | one marker line; PROGRESS, §12's round histories, §13's round items, the round records and every seam, critique and round id removed; the disc-frame parenthesis removed; decision rows stripped |
| V05-BREF-1 (and .r01) | the IN-V05-1 row now reads V05 §3.2 (3)–(4) |
| V05-BREF-2 (and .r02 – .r18) | every scratchpad path removed |
| V05:IN-V05-1 – -5 | folded into the body at their homes; the Integration notes table names each home |

### Hand-offs closed (17)

V06:X10 (V05 §1b, §3.15; closed at V06), V06:X15 (its second clause written at V05 §3.15; the first at V06 §3.2), V06:X26
(V05 §3.16's way row), V06:X37 (V05 §3.16's wall row, V06 §3.7.5), V06:X40 (V05 §3.15 (5); V06 §3.2), V06:X41 (V05
§3.16's wall row: no tower or gate state), V06:X46 (V05 §6's resize row prices the yard tops, J-V5.81), V08:X8 (§2.8's one
lift rule; V05 §3.2 (6)), V09:XV-V9-8 (V05 §8: AP7 beside P4, priced in §16's row), V09:XV-V9-16 ((a) "T10's delete" at V05
§2.6, §4.1, §4.2; (b) the bend keys, V05 §4.2), V09:XV-V9-25 (the inward geometry at V05 §3.22 (4)), V10:CVR-V10-14 (V05
§4.5's island lines), V12:X-V12-4 (M6-sky's `PanelSpec`, V05 §7's parity paragraph), V12:X-V12-11 (T-V5-15's `NoOpPin`),
V12:X-V12-15 (no register line of V05's own; no `BenchBarDef` owed), V12:X-V12-16 (V05 §8's register at P1 and P2), V12:X-V12-17
(`--milestone V5-P1` / `V5-P2`; due `M-CAL/sky`).

### Edges and combinations

60 UNDEFINED and 48 UNTESTED edges of the catalogue's 40 V05 mechanisms, and its 31 owned combinations (with the named
combination "a raised way under an island's shade"), are defined in V05 §3.23 (a)–(g) with their rungs and tests
(T-V5-33 – T-V5-36, with T-V5-14, T-V5-21, T-V5-31 and T-V5-37); the four observed edges V05-EDGE-1 – -4 as above. Per class:
E1 none, E2 one and E3 cap — §3.23 (d)'s table (every mechanism of §2–§5); E4 degenerate — §3.23 (a), §5.1's general
rule; E5 data — §3.23 (e); E6 rungs — §3.23 (b); E7 toggles — §3.23 (c); E8 lifecycle — §3.23 (f) with V05 §2.6.

## CROSS-PART NOTES

1. pipeline II.6 (3): the base still writes node.bonus's value "(0.25, clamped to 1)"; its one home is V05 §2.4's IslandRule.node (V05-RESTATE-3, VOL-V05-V06-RESTATEMENTS-006) — II.6 (3) should read "by the rule's node.bonus (V05 §2.4), clamped to 1".
2. V09 (V05-WGAP-1, V05-WGAP-2a): add the eleven bend rows of V05 §4.2's table with their lines — bend.island.gate, bend.island.fourth, bend.island.count, bend.island.altitude, bend.island.claimFloor, bend.island.rimStop, bend.access.kind, bend.access.last (alternative "Place a different access"), bend.access.foot, bend.raised.hoist, bend.wall.drop — beside its five island rows; and state in its hit testing the un-displacement of sky hits and tool points under offset (the world point less elevation × offsetPerMetre, then the anchor), citing V05 §4.2. XV-V9-8, XV-V9-16 and XV-V9-25 are closed at V05 §8, §4.1–§4.2 and §3.22 (4).
3. V10 (V05-WGAP-2b): the bend category gains rows for the same eleven keys; the island why lines gain "held without its institution" (J-V5.82); CVR-V10-14's V05 part is closed at V05 §4.5.
4. V06: mark X10, X15, X26, X37, X40, X41 and X46 closed; X15's second clause (a fall's ruined raised parts committed in the epoch's lifecycle, so in EpochScope.raised) is written at V05 §3.15; V06 §3.4 (8)'s "no mask for an island raised this epoch" is cited by V05 §3.15.
5. determinism §7.7: the DR27 row is cited by V05 §4.4, which keeps only what each input feeds; §7.7's row stays the home (f item 387, ID-DR).
6. V12: X-V12-4, -11, -15, -16 and -17 are closed at V05 §7 (M6-sky's PanelSpec, T-V5-15's NoOpPin) and §8 (--milestone V5-P1 / V5-P2, due M-CAL/sky); no BenchBarDef is owed by V05.
7. scope §13.2 and INDEX: the range of V05's bars reads T-V5-1 – T-V5-37 (T102-2's island clause by T-V5-19 – T-V5-21); §16's M6-sky row (after M6-U, P0 beside M5, 17.25–23.25 pw) agrees with V05 §8; AP7 stays in §16's application-screens row.
8. V01: nothing owed — V01 §3.10.3 already reads skyUnitInput; V05 cites V01's J-V1.36 (islands off in a standalone neighbourhood document) at V05 §3.23 (b).
9. V11 §3.5.13 compiles the landing classes from V05 §2.4's facts (cited there); the walls.barriers row keyed sheer is the rim's (J-VI.3, V05 §3.21 (1)).
10. Shrink −21.0 % by wc (79 756 → 62 987), below the 25–40 % band: dense normative body plus ≈ 6 300 words of routed new design (§3.23 edges, T-V5-33 – T-V5-37, J-V5.82 – J-V5.86, the bend table, item 111's part, EDGE-1/-2/-3 rules); without them ≈ −28.9 %.
11. E-01, E-02, E-16, E-24 applied with equivalence lists ticked; ID-DR and ID-BCR applied; new ids T-V5-33 – T-V5-37, J-V5.82 – J-V5.86, eleven bend keys, the 'update' value of ShadeBasis.by; §13 empty.

## MAPPING TABLE (544 inventory ids, 0 unmapped)

| inventory id | kind | old § | where it now lives |
|---|---|---|---|
| V05-0001 | summary | 0 | V05 §0 |
| V05-0002 | summary | 0 | V05 §0 |
| V05-0003 | summary | 0 | V05 §0 |
| V05-0004 | summary | 0 | V05 §0 |
| V05-0005 | summary | 0 | V05 §0 |
| V05-0006 | summary | 0 | V05 §0 |
| V05-0007 | summary | 0 | V05 §0 |
| V05-0008 | summary | 0 | V05 §0 |
| V05-0009 | summary | 0 | V05 §0 |
| V05-0010 | summary | 0 | V05 §0 |
| V05-0011 | summary | 0 | V05 §0 |
| V05-0012 | summary | 0 | V05 §0 |
| V05-0013 | convention | 1 | V05 §1 *Pointers* (the set's citation form, G-cite) |
| V05-0014 | term | 1 | V05 §1 *Pointers* (two kinds of tier) |
| V05-0015 | term | 1 | V05 §1 *Pointers* (raised-way piers) |
| V05-0016 | scope | 1.1 | V05 §1.1 |
| V05-0017 | decision | 1.1 | V05 §1.1 |
| V05-0018 | hooktable | 1.2 | V05 §1.2 |
| V05-0019 | restated-fact | 1.2 | V05 §1.2 → pointer to scope §1.1 |
| V05-0020 | restated-fact | 1.2 | V05 §1.2 → pointer to V01 |
| V05-0021 | scope | 1.3 | V05 §1.3 |
| V05-0022 | scope | 1.3 | V05 §1.3 |
| V05-0023 | scope | 1.3 | V05 §1.3 |
| V05-0024 | rule | 1.3 | V05 §1.3 |
| V05-0025 | scope | 1.3 | V05 §1.3 |
| V05-0026 | scope | 1.3 | V05 §1.3 |
| V05-0027 | wiring | 1b | V05 §1b |
| V05-0028 | wiring | 1b | V05 §1b |
| V05-0029 | wiring | 1b | V05 §1b |
| V05-0030 | wiring | 1b | V05 §1b |
| V05-0031 | wiring | 1b | V05 §1b |
| V05-0032 | wiring | 1b | V05 §1b |
| V05-0033 | wiring | 1b | V05 §1b |
| V05-0034 | wiring | 1b | V05 §1b |
| V05-0035 | wiring | 1b | V05 §1b |
| V05-0036 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0037 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0038 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0039 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0040 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0041 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0042 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0043 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0044 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0045 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0046 | wiring | 1b | V05 §1b |
| V05-0047 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0048 | wiring | 1b | V05 §1b (`skyUnitInput` row; G-unitinput) |
| V05-0049 | wiring | 1b | V05 §1b |
| V05-0050 | wiring | 1b | V05 §1b (the strip row) |
| V05-0051 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0052 | wiring | 1b | V05 §1b |
| V05-0053 | wiring | 1b | V05 §1b |
| V05-0054 | wiring | 1b | V05 §1b |
| V05-0055 | wiring | 1b | V05 §1b |
| V05-0056 | wiring | 1b | V05 §1b |
| V05-0057 | wiring | 1b | V05 §1b |
| V05-0058 | wiring | 1b | V05 §1b |
| V05-0059 | wiring | 1b | V05 §1b |
| V05-0060 | wiring | 1b | V05 §1b |
| V05-0061 | wiring | 1b | V05 §1b |
| V05-0062 | wiring | 1b | V05 §1b |
| V05-0063 | wiring | 1b | V05 §1b |
| V05-0064 | wiring | 1b | V05 §1b |
| V05-0065 | wiring | 1b | V05 §1b |
| V05-0066 | wiring | 1b | V05 §1b |
| V05-0067 | wiring | 1b | V05 §1b |
| V05-0068 | wiring | 1b | V05 §1b |
| V05-0069 | wiring | 1b | V05 §1b |
| V05-0070 | wiring | 1b | V05 §1b |
| V05-0071 | wiring | 1b | V05 §2.6 (`underside` row) and §1b (`undersideTiers`) |
| V05-0072 | wiring | 1b | V05 §1b |
| V05-0073 | wiring | 1b | V05 §1b |
| V05-0074 | wiring | 1b | V05 §1b (`fallIsland` row), §2.6 (`members`, writer rows), §3.16 |
| V05-0075 | wiring | 1b | V05 §1b (the caster ceiling row), §3.22 (1) |
| V05-0076 | wiring | 1b | V05 §1b |
| V05-0077 | wiring | 1b | V05 §1b |
| V05-0078 | wiring | 1b | V05 §1b (the admissibility transform row), §3.22 (3) (a) |
| V05-0079 | wiring | 1b | V05 §2.6 (its field row; §1b wires the non-field pieces, DUP-3) |
| V05-0080 | wiring | 1b | V05 §1b |
| V05-0081 | wiring | 1b | V05 §1b (the strip row), §3.19 (3), §2.3a |
| V05-0082 | wiring | 1b | V05 §1b |
| V05-0083 | wiring | 1b | V05 §2.6 (`removed`, `removedAccesses` rows), §1b (`removedSlots`) |
| V05-0084 | wiring | 1b | V05 §1b (DR27 row; ID-DR) |
| V05-0085 | wiring | 1b | V05 §1b |
| V05-0086 | wiring | 1b | V05 §1b |
| V05-0087 | wiring | 1b | V05 §1b |
| V05-0088 | record | 2.1 | V05 §2.1 |
| V05-0089 | rule | 2.1 | V05 §2.1 |
| V05-0090 | rule | 2.1 | V05 §2.1 |
| V05-0091 | derived | 2.1 | V05 §2.1 |
| V05-0092 | rule | 2.1 | V05 §2.1 |
| V05-0093 | rule | 2.1 | V05 §2.1 |
| V05-0094 | record | 2.1 | V05 §2.1 |
| V05-0095 | record | 2.1 | V05 §2.1 |
| V05-0096 | rule | 2.1 | V05 §2.1 |
| V05-0097 | interface | 2.1 | V05 §2.1 |
| V05-0098 | record | 2.1 | V05 §2.1 |
| V05-0099 | record | 2.2 | V05 §2.2 |
| V05-0100 | rule | 2.2 | V05 §2.2 |
| V05-0101 | derived | 2.2 | V05 §2.2 |
| V05-0102 | constant | 2.2 | V05 §2.2 |
| V05-0103 | rule | 2.2 | V05 §2.2 |
| V05-0104 | interface | 2.3 | V05 §2.3 |
| V05-0105 | mechanism | 2.3 | V05 §2.3 |
| V05-0106 | rule | 2.3 | V05 §2.3 → pointer to V01 V01 §3.10.3 |
| V05-0107 | interface | 2.3a | V05 §2.3a |
| V05-0108 | rule | 2.3a | V05 §2.3a |
| V05-0109 | rule | 2.3a | V05 §2.3a |
| V05-0110 | interface | 2.3b | V05 §2.3b |
| V05-0111 | rule | 2.3b | V05 §2.3b |
| V05-0112 | record | 2.4 | V05 §2.4 |
| V05-0113 | restated-fact | 2.4 | V05 §2.4 → pointer to pipeline II.6 |
| V05-0114 | record | 2.4 | V05 §2.4 |
| V05-0115 | record | 2.4 | V05 §2.4 |
| V05-0116 | record | 2.4 | V05 §2.4 |
| V05-0117 | rule | 2.4 | V05 §2.4 |
| V05-0118 | constant | 2.4 | V05 §2.4 |
| V05-0119 | constant | 2.4 | V05 §2.4 |
| V05-0120 | constant | 2.4 | V05 §2.4 |
| V05-0121 | constant | 2.4 | V05 §2.4 |
| V05-0122 | constant | 2.4 | V05 §2.4 |
| V05-0123 | constant | 2.4 | V05 §2.4 |
| V05-0124 | constant | 2.4 | V05 §2.4 |
| V05-0125 | constant | 2.4 | V05 §2.4 |
| V05-0126 | constant | 2.4 | V05 §2.4 |
| V05-0127 | constant | 2.4 | V05 §2.4 |
| V05-0128 | constant | 2.4 | V05 §2.4 |
| V05-0129 | constant | 2.4 | V05 §2.4 |
| V05-0130 | constant | 2.4 | V05 §2.4 |
| V05-0131 | constant | 2.4 | V05 §2.4 |
| V05-0132 | table | 2.4 | V05 §2.4 |
| V05-0133 | rule | 2.4 | V05 §2.4 |
| V05-0134 | rule | 2.4 | V05 §2.4 |
| V05-0135 | table | 2.4 | V05 §2.4 |
| V05-0136 | rule | 2.4 | V05 §2.4 → pointer to V11 |
| V05-0137 | rule | 2.4 | V05 §2.4 |
| V05-0138 | rule | 2.4 | V05 §2.4 |
| V05-0139 | table | 2.5 | V05 §2.5 |
| V05-0140 | lifecycle | 2.6 | V05 §2.6 |
| V05-0141 | lifecycle | 2.6 | V05 §2.6 |
| V05-0142 | lifecycle | 2.6 | V05 §2.6 |
| V05-0143 | lifecycle | 2.6 | V05 §2.6 |
| V05-0144 | lifecycle | 2.6 | V05 §2.6 |
| V05-0145 | lifecycle | 2.6 | V05 §2.6 |
| V05-0146 | lifecycle | 2.6 | V05 §2.6 |
| V05-0147 | lifecycle | 2.6 | V05 §2.6 |
| V05-0148 | lifecycle | 2.6 | V05 §2.6 |
| V05-0149 | lifecycle | 2.6 | V05 §2.6 |
| V05-0150 | lifecycle | 2.6 | V05 §2.6 |
| V05-0151 | lifecycle | 2.6 | V05 §2.6 |
| V05-0152 | lifecycle | 2.6 | V05 §2.6 |
| V05-0153 | lifecycle | 2.6 | V05 §2.6 |
| V05-0154 | lifecycle | 2.6 | V05 §2.6 |
| V05-0155 | lifecycle | 2.6 | V05 §2.6 |
| V05-0156 | lifecycle | 2.6 | V05 §2.6 |
| V05-0157 | lifecycle | 2.6 | V05 §2.6 |
| V05-0158 | lifecycle | 2.6 | V05 §2.6 |
| V05-0159 | lifecycle | 2.6 | V05 §2.6 |
| V05-0160 | lifecycle | 2.6 | V05 §2.6 → pointer to V06 V06 §1b |
| V05-0161 | lifecycle | 2.6 | V05 §2.6 → pointer to model §2.7 |
| V05-0162 | lifecycle | 2.6 | V05 §2.6 |
| V05-0163 | lifecycle | 2.6 | V05 §2.6 |
| V05-0164 | lifecycle | 2.6 | V05 §2.6 |
| V05-0165 | lifecycle | 2.6 | V05 §2.6 |
| V05-0166 | lifecycle | 2.6 | V05 §2.6 |
| V05-0167 | lifecycle | 2.6 | V05 §2.6 |
| V05-0168 | lifecycle | 2.6 | V05 §2.6 |
| V05-0169 | lifecycle | 2.6 | V05 §2.6 |
| V05-0170 | step | 3.1 | V05 §3.1 |
| V05-0171 | step | 3.1 | V05 §3.1 |
| V05-0172 | step | 3.1 | V05 §3.1 |
| V05-0173 | step | 3.1 | V05 §3.1 → pointer to V01 |
| V05-0174 | step | 3.1 | V05 §3.1 |
| V05-0175 | rule | 3.1 | V05 §3.1 |
| V05-0176 | rule | 3.1 | V05 §3.1 → pointer to pipeline §4.1 |
| V05-0177 | rule | 3.1 | V05 §3.1 |
| V05-0178 | rule | 3.1 | V05 §3.1 |
| V05-0179 | rule | 3.2 | V05 §3.2 |
| V05-0180 | rule | 3.2 | V05 §3.2 |
| V05-0181 | rule | 3.2 | V05 §3.2 |
| V05-0182 | rule | 3.2 | V05 §3.2 |
| V05-0183 | rule | 3.2 | V05 §3.2 |
| V05-0184 | rule | 3.2 | V05 §3.2 |
| V05-0185 | rule | 3.3 | V05 §3.3 |
| V05-0186 | rule | 3.3 | V05 §3.3 |
| V05-0187 | rule | 3.3 | V05 §3.3 |
| V05-0188 | rule | 3.3 | V05 §3.3 |
| V05-0189 | rule | 3.3 | V05 §3.3 |
| V05-0190 | calibration | 3.3 | V05 §3.3 |
| V05-0191 | fallback | 3.3 | V05 §3.3 |
| V05-0192 | rule | 3.4 | V05 §3.4 |
| V05-0193 | rule | 3.4 | V05 §3.4 |
| V05-0194 | rule | 3.4 | V05 §3.4 |
| V05-0195 | rule | 3.4 | V05 §3.4 |
| V05-0196 | rule | 3.4 | V05 §3.4 |
| V05-0197 | rule | 3.5 | V05 §3.5 |
| V05-0198 | rule | 3.5 | V05 §3.5 |
| V05-0199 | rule | 3.5 | V05 §3.5 |
| V05-0200 | rule | 3.5 | V05 §3.5 |
| V05-0201 | rule | 3.5 | V05 §3.5 |
| V05-0202 | rule | 3.5 | V05 §3.5 |
| V05-0203 | rule | 3.5 | V05 §3.5 |
| V05-0204 | rule | 3.5 | V05 §3.5 |
| V05-0205 | rule | 3.5 | V05 §3.5 |
| V05-0206 | rule | 3.5 | V05 §3.5 |
| V05-0207 | rule | 3.5 | V05 §3.5 |
| V05-0208 | rule | 3.5 | V05 §3.5 |
| V05-0209 | rule | 3.5 | V05 §3.5 |
| V05-0210 | rule | 3.5 | V05 §3.5 |
| V05-0211 | rule | 3.5 | V05 §3.5 |
| V05-0212 | rule | 3.6 | V05 §3.6 |
| V05-0213 | rule | 3.6 | V05 §3.6 |
| V05-0214 | rule | 3.7 | V05 §3.7 |
| V05-0215 | rule | 3.7 | V05 §3.7 |
| V05-0216 | rule | 3.7 | V05 §3.7 |
| V05-0217 | rule | 3.7 | V05 §3.7 |
| V05-0218 | rule | 3.8 | V05 §3.8 |
| V05-0219 | rule | 3.8 | V05 §3.8 |
| V05-0220 | rule | 3.8 | V05 §3.8 |
| V05-0221 | rule | 3.8 | V05 §3.8 |
| V05-0222 | rule | 3.8 | V05 §3.8 |
| V05-0223 | rule | 3.9 | V05 §3.9 |
| V05-0224 | interface | 3.9 | V05 §3.9 |
| V05-0225 | rule | 3.9 | V05 §3.9 |
| V05-0226 | rule | 3.9 | V05 §3.9 |
| V05-0227 | rule | 3.9 | V05 §3.9 |
| V05-0228 | rule | 3.9 | V05 §3.9 |
| V05-0229 | calibration | 3.9 | V05 §3.9 |
| V05-0230 | rule | 3.10 | V05 §3.10 |
| V05-0231 | rule | 3.10 | V05 §3.10 |
| V05-0232 | rule | 3.10 | V05 §3.10 |
| V05-0233 | rule | 3.10 | V05 §3.10 |
| V05-0234 | rule | 3.10 | V05 §3.10 |
| V05-0235 | term | 3.10 | V05 §3.10 |
| V05-0236 | rule | 3.10 | V05 §3.10 |
| V05-0237 | rule | 3.10 | V05 §3.10 |
| V05-0238 | rule | 3.10 | V05 §3.10 |
| V05-0239 | rule | 3.10 | V05 §3.10 |
| V05-0240 | rule | 3.10 | V05 §3.10 |
| V05-0241 | rule | 3.10 | V05 §3.10 |
| V05-0242 | rule | 3.10 | V05 §3.10 → pointer to pipeline §4.5 |
| V05-0243 | rule | 3.10 | V05 §3.10 |
| V05-0244 | rule | 3.11 | V05 §3.11 |
| V05-0245 | mechanism | 3.11 | V05 §3.11 |
| V05-0246 | rule | 3.11 | V05 §3.11 |
| V05-0247 | rule | 3.11 | V05 §3.11 |
| V05-0248 | rule | 3.11 | V05 §3.11 |
| V05-0249 | rule | 3.11 | V05 §3.11 |
| V05-0250 | rule | 3.11 | V05 §3.11 |
| V05-0251 | rule | 3.11 | V05 §3.11 |
| V05-0252 | rule | 3.11 | V05 §3.11 |
| V05-0253 | rule | 3.12 | V05 §3.12 |
| V05-0254 | rule | 3.12 | V05 §3.12 → pointer to V01 V01 §3.10.3 |
| V05-0255 | rule | 3.12 | V05 §3.12 |
| V05-0256 | handoff | 3.12 | V05 §3.12 *The unit run's contract* (the seven inputs, read by V01 §3.10.3) |
| V05-0257 | table | 3.13 | V05 §3.13 |
| V05-0258 | rule | 3.13 | V05 §3.13 |
| V05-0259 | rule | 3.14 | V05 §3.14 |
| V05-0260 | interface | 3.15 | V05 §3.15 |
| V05-0261 | interface | 3.15 | V05 §3.15 |
| V05-0262 | rule | 3.15 | V05 §3.15 |
| V05-0263 | rule | 3.15 | V05 §3.15 |
| V05-0264 | rule | 3.15 | V05 §3.15 |
| V05-0265 | rule | 3.15 | V05 §3.15 |
| V05-0266 | rule | 3.15 | V05 §3.15 |
| V05-0267 | rule | 3.15 | V05 §3.15 |
| V05-0268 | rule | 3.15 | V05 §3.15 |
| V05-0269 | rule | 3.15 | V05 §3.15 |
| V05-0270 | rule | 3.15 | V05 §3.15 |
| V05-0271 | rule | 3.15 | V05 §3.15 |
| V05-0272 | rule | 3.15 | V05 §3.15 |
| V05-0273 | rule | 3.16 | V05 §3.16 |
| V05-0274 | rule | 3.16 | V05 §3.16 |
| V05-0275 | rule | 3.16 | V05 §3.16 |
| V05-0276 | rule | 3.16 | V05 §3.16 |
| V05-0277 | rule | 3.16 | V05 §3.16 |
| V05-0278 | rule | 3.16 | V05 §3.16 |
| V05-0279 | rule | 3.16 | V05 §3.16 |
| V05-0280 | rule | 3.16 | V05 §3.16 |
| V05-0281 | rule | 3.16 | V05 §3.16 |
| V05-0282 | rule | 3.16 | V05 §3.16 |
| V05-0283 | rule | 3.16 | V05 §3.16 |
| V05-0284 | rule | 3.16 | V05 §3.16 |
| V05-0285 | rule | 3.16 | V05 §3.16 |
| V05-0286 | table | 3.17 | V05 §3.17 |
| V05-0287 | table | 3.17 | V05 §3.17 → pointer to determinism §5.2 |
| V05-0288 | table | 3.17 | V05 §3.17 |
| V05-0289 | table | 3.17 | V05 §3.17 |
| V05-0290 | table | 3.17 | V05 §3.17 |
| V05-0291 | table | 3.17 | V05 §3.17 |
| V05-0292 | table | 3.17 | V05 §3.17 |
| V05-0293 | table | 3.17 | V05 §3.17 |
| V05-0294 | table | 3.17 | V05 §3.17 |
| V05-0295 | table | 3.17 | V05 §3.17 |
| V05-0296 | table | 3.18 | V05 §3.18 |
| V05-0297 | rule | 3.18 | V05 §3.18 |
| V05-0298 | rule | 3.19 | V05 §3.19 |
| V05-0299 | rule | 3.19 | V05 §3.19 |
| V05-0300 | rule | 3.19 | V05 §3.19 |
| V05-0301 | rule | 3.19 | V05 §3.19 |
| V05-0302 | rule | 3.19 | V05 §3.19 |
| V05-0303 | rule | 3.19 | V05 §3.19 |
| V05-0304 | rule | 3.19 | V05 §3.19 |
| V05-0305 | rule | 3.19 | V05 §3.19 |
| V05-0306 | rule | 3.19 | V05 §3.19 |
| V05-0307 | derivation | 3.19 | V05 §3.19 |
| V05-0308 | rule | 3.20 | V05 §3.20 |
| V05-0309 | interface | 3.20 | V05 §3.20 |
| V05-0310 | rule | 3.20 | V05 §3.20 |
| V05-0311 | rule | 3.20 | V05 §3.20 |
| V05-0312 | rule | 3.20 | V05 §3.20 |
| V05-0313 | rule | 3.20 | V05 §3.20 |
| V05-0314 | rule | 3.20 | V05 §3.20 |
| V05-0315 | rule | 3.20 | V05 §3.20 |
| V05-0316 | rule | 3.20 | V05 §3.20 |
| V05-0317 | rule | 3.20 | V05 §3.20 |
| V05-0318 | rule | 3.20 | V05 §3.20 |
| V05-0319 | rule | 3.20 | V05 §3.20 |
| V05-0320 | rule | 3.20 | V05 §3.20 |
| V05-0321 | rule | 3.20 | V05 §3.20 |
| V05-0322 | rule | 3.20 | V05 §3.20 |
| V05-0323 | rule | 3.20 | V05 §3.20 |
| V05-0324 | rule | 3.20 | V05 §3.20 |
| V05-0325 | rule | 3.21 | V05 §3.21 |
| V05-0326 | rule | 3.21 | V05 §3.21 |
| V05-0327 | rule | 3.21 | V05 §3.21 |
| V05-0328 | rule | 3.22 | V05 §3.22 |
| V05-0329 | rule | 3.22 | V05 §3.22 |
| V05-0330 | rule | 3.22 | V05 §3.22 |
| V05-0331 | rule | 3.22 | V05 §3.22 |
| V05-0332 | rule | 3.22 | V05 §3.22 |
| V05-0333 | rule | 3.22 | V05 §3.22 |
| V05-0334 | rule | 3.22 | V05 §3.22 |
| V05-0335 | rule | 3.22 | V05 §3.22 |
| V05-0336 | rule | 3.22 | V05 §3.22 |
| V05-0337 | rule | 3.22 | V05 §3.22 |
| V05-0338 | table | 4.1 | V05 §4.1 |
| V05-0339 | rule | 4.1 | V05 §4.1 |
| V05-0340 | interface | 4.2 | V05 §4.2 |
| V05-0341 | interface | 4.2 | V05 §4.2 |
| V05-0342 | rule | 4.2 | V05 §4.2 |
| V05-0343 | rule | 4.2 | V05 §4.2 |
| V05-0344 | rule | 4.2 | V05 §4.2 |
| V05-0345 | rule | 4.2 | V05 §4.2 |
| V05-0346 | rule | 4.2 | V05 §4.2 |
| V05-0347 | rule | 4.2 | V05 §4.2 |
| V05-0348 | rule | 4.2 | V05 §4.2 |
| V05-0349 | rule | 4.2 | V05 §4.2 |
| V05-0350 | rule | 4.2 | V05 §4.2 |
| V05-0351 | rule | 4.2 | V05 §4.2 |
| V05-0352 | rule | 4.2 | V05 §4.2 |
| V05-0353 | rule | 4.2 | V05 §4.2 |
| V05-0354 | rule | 4.2 | V05 §4.2 |
| V05-0355 | rule | 4.2 | V05 §4.2 |
| V05-0356 | rule | 4.2 | V05 §4.2 |
| V05-0357 | rule | 4.2 | V05 §4.2 |
| V05-0358 | rule | 4.2 | V05 §4.2 |
| V05-0359 | rule | 4.2 | V05 §4.2 |
| V05-0360 | rule | 4.2 | V05 §4.2 |
| V05-0361 | rule | 4.2 | V05 §4.2 |
| V05-0362 | table | 4.3 | V05 §4.3 |
| V05-0363 | rule | 4.3 | V05 §4.3 |
| V05-0364 | lifecycle | 4.3 | V05 §4.3 → pointer to determinism §7.4 |
| V05-0365 | dossier | 4.4 | §7.7's DR27 row (base, f item 387), cited at V05 §4.4 with what each input feeds |
| V05-0366 | rule | 4.4 | V05 §4.4 (DR27) and J-V5.40 (superseded by J-VI.13) |
| V05-0367 | rule | 4.4 | V05 §4.4 |
| V05-0368 | rule | 4.4 | V05 §4.4 |
| V05-0369 | interface | 4.5 | V05 §4.5 |
| V05-0370 | rule | 4.5 | V05 §4.5 |
| V05-0371 | rule | 4.5 | V05 §4.5 |
| V05-0372 | table | 5.1 | V05 §5.1 |
| V05-0373 | rule | 5.1 | V05 §5.1 |
| V05-0374 | table | 5.1 | V05 §5.1 |
| V05-0375 | rule | 5.2 | V05 §5.2 |
| V05-0376 | rule | 5.3 | V05 §5.3 |
| V05-0377 | rule | 5.3 | V05 §5.3 |
| V05-0378 | rule | 5.3 | V05 §5.3 |
| V05-0379 | rule | 5.3 | V05 §5.3 |
| V05-0380 | rule | 5.3 | V05 §5.3 |
| V05-0381 | rule | 5.3 | V05 §5.3 |
| V05-0382 | rule | 5.4 | V05 §5.4 |
| V05-0383 | table | 5.5 | V05 §5.5 |
| V05-0384 | rule | 5.5 | V05 §5.5 |
| V05-0385 | budget | 6 | V05 §6 |
| V05-0386 | budget | 6 | V05 §6 |
| V05-0387 | fallback | 6 | V05 §6 |
| V05-0388 | test | 7 | V05 §7 |
| V05-0389 | test | 7 | V05 §7 |
| V05-0390 | test | 7 | V05 §7 |
| V05-0391 | test | 7 | V05 §7 |
| V05-0392 | test | 7 | V05 §7 |
| V05-0393 | test | 7 | V05 §7 |
| V05-0394 | test | 7 | V05 §7 |
| V05-0395 | test | 7 | V05 §7 |
| V05-0396 | test | 7 | V05 §7 |
| V05-0397 | test | 7 | V05 §7 |
| V05-0398 | test | 7 | V05 §7 |
| V05-0399 | test | 7 | V05 §7 |
| V05-0400 | test | 7 | V05 §7 |
| V05-0401 | test | 7 | V05 §7 |
| V05-0402 | test | 7 | V05 §7 |
| V05-0403 | test | 7 | V05 §7 |
| V05-0404 | test | 7 | V05 §7 |
| V05-0405 | test | 7 | V05 §7 |
| V05-0406 | test | 7 | V05 §7 |
| V05-0407 | test | 7 | V05 §7 |
| V05-0408 | test | 7 | V05 §7 |
| V05-0409 | test | 7 | V05 §7 |
| V05-0410 | test | 7 | V05 §7 |
| V05-0411 | test | 7 | V05 §7 |
| V05-0412 | test | 7 | V05 §7 |
| V05-0413 | test | 7 | V05 §7 |
| V05-0414 | test | 7 | V05 §7 |
| V05-0415 | test | 7 | V05 §7 |
| V05-0416 | test | 7 | V05 §7 |
| V05-0417 | test | 7 | V05 §7 |
| V05-0418 | test | 7 | V05 §7 |
| V05-0419 | rule | 7 | V05 §7 |
| V05-0420 | plan | 8 | V05 §8 |
| V05-0421 | plan | 8 | V05 §8 |
| V05-0422 | plan | 8 | V05 §8 |
| V05-0423 | rule | 8 | V05 §8 → pointer to V12 V12 §9 |
| V05-0424 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0425 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0426 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0427 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0428 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0429 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0430 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0431 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0432 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0433 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0434 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0435 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0436 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0437 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0438 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0439 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0440 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0441 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0442 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0443 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0444 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0445 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0446 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0447 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0448 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0449 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0450 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0451 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0452 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0453 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0454 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0455 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0456 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0457 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0458 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0459 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0460 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0461 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0462 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0463 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0464 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0465 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0466 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0467 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0468 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0469 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0470 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0471 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0472 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0473 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0474 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0475 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0476 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0477 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0478 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0479 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0480 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0481 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0482 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0483 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0484 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0485 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0486 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0487 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0488 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0489 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0490 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0491 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0492 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0493 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0494 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0495 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0496 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0497 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0498 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0499 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0500 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0501 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0502 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0503 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0504 | decision | 9 | V05 §9 (same row id, narration stripped) |
| V05-0505 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0506 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0507 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0508 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0509 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0510 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0511 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0512 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0513 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0514 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0515 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0516 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0517 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0518 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0519 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0520 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0521 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0522 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0523 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0524 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0525 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0526 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0527 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0528 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0529 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0530 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0531 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0532 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0533 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0534 | bcr | 10 | V05 §10 table row (the request applied to the base; f item) |
| V05-0535 | question | 11 | V05 §11 (Q1 decided, J122) |
| V05-0536 | status | 12 | V05 §12 (compressed; the round history out to the validation records, S9) |
| V05-0537 | handoff | 13 | V05 §13 hand-off table (items 1–9 closed at their units; item 1 is V05 §8's exits; item 9 is V05 §10) |
| V05-0538 | handoff | 13 | V05 §13 hand-off table (items 10–17) |
| V05-0539 | handoff | 13 | V05 §13 hand-off table (items 18–34, landed; the open item 28 is the V09/V10 rows) |
| V05-0540 | decision | IN | Integration notes row IN-V05-1 → V05 §4.2 bend table |
| V05-0541 | decision | IN | Integration notes row IN-V05-2 → V05 §3.2 (6), §2.1 |
| V05-0542 | decision | IN | Integration notes row IN-V05-3 → V05 §4.4 |
| V05-0543 | decision | IN | Integration notes rows IN-V05-4, -5 → V05 §3.21 (1), §13 |
| V05-0544 | record | RC | removed — reconciliation-round records (narration, S9); the validation records keep them |
